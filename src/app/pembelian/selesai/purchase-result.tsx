"use client";

import { useCallback, useEffect, useState } from "react";
import { generateTemplateFile } from "@/lib/template-generator";
import type { TemplateAnswers, TemplateDefinition } from "@/data/schema";

type OrderInfo = { id:string; slug:string; buyer_email:string; amount_cents:number; currency:string; status:string; created_at:string; paid_at?:string|null };
type PurchaseData = { order:OrderInfo; template?:TemplateDefinition; answers?:TemplateAnswers; review?:{id:string;status:string;rating:number;review_text:string}|null };
const money=(cents:number)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(cents/100);

export default function PurchaseResult({orderId,token}:{orderId:string;token:string}){
  const [data,setData]=useState<PurchaseData|null>(null);
  const [loading,setLoading]=useState(true);
  const [message,setMessage]=useState("Memverifikasi pembayaran dari Dodo Payments…");
  const [downloaded,setDownloaded]=useState(false);
  const [rating,setRating]=useState(5);
  const [reviewText,setReviewText]=useState("");
  const [displayName,setDisplayName]=useState("");
  const [reviewMessage,setReviewMessage]=useState("");
  const [savingReview,setSavingReview]=useState(false);
  const [error,setError]=useState("");

  const check=useCallback(async()=>{
    if(!orderId||!token){setError("Tautan order tidak lengkap.");setLoading(false);return;}
    setError("");
    try{
      const response=await fetch("/api/order?order_id="+encodeURIComponent(orderId)+"&token="+encodeURIComponent(token),{cache:"no-store"});
      const result=await response.json();
      if(!response.ok)throw new Error(result.error||"Order tidak ditemukan.");
      setData(result);
      if(result.order.status==="paid"){setMessage("Pembayaran telah diverifikasi. File siap diunduh.");return true;}
      if(result.order.status==="failed"||result.order.status==="cancelled"){setMessage("Pembayaran belum berhasil. Tidak ada biaya yang dikonfirmasi sebagai pembayaran berhasil.");return true;}
      if(result.order.status==="refunded"||result.order.status==="disputed"){setMessage("Status pembayaran berubah dan akses unduhan dinonaktifkan.");return true;}
      setMessage("Pembayaran sedang diproses. Halaman ini akan memeriksa status kembali.");
      return false;
    }catch(e){setError(e instanceof Error?e.message:"Gagal memverifikasi order.");return true;}
  },[orderId,token]);

  useEffect(()=>{
    let cancelled=false;
    const run=async()=>{
      setLoading(true);
      for(let attempt=0;attempt<15&&!cancelled;attempt++){
        const done=await check();
        if(done||cancelled)break;
        await new Promise(resolve=>setTimeout(resolve,2500));
      }
      if(!cancelled)setLoading(false);
    };
    void run();
    return()=>{cancelled=true;};
  },[check]);

  function download(){
    if(!data?.template||!data.answers||data.order.status!=="paid")return;
    try{
      generateTemplateFile(data.template,data.answers);
      setDownloaded(true);
    }catch(e){setError(e instanceof Error?e.message:"File gagal dibuat.");}
  }

  async function submitReview(){
    setSavingReview(true);setReviewMessage("");
    try{
      const response=await fetch("/api/reviews",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({
        order_id:orderId,token,rating,review_text:reviewText,display_name:displayName
      })});
      const result=await response.json();
      if(!response.ok)throw new Error(result.error||"Ulasan gagal dikirim.");
      setReviewMessage("Ulasan diterima dan menunggu moderasi TCS.");
      setData(current=>current?{...current,review:{id:result.review.id,status:"pending",rating,review_text:reviewText}}:current);
    }catch(e){setReviewMessage(e instanceof Error?e.message:"Ulasan gagal dikirim.");}
    finally{setSavingReview(false);}
  }

  return <main style={{minHeight:"100vh",background:"#f4f5f1",color:"#20261f",fontFamily:"Arial,Helvetica,sans-serif",display:"grid",placeItems:"center",padding:"30px 18px"}}>
    <section style={{width:"min(100%,620px)",background:"#fff",border:"1px solid #e1e7df",borderRadius:18,padding:"34px 28px",boxShadow:"0 16px 45px rgba(35,48,37,.06)"}}>
      <div style={{fontSize:12,fontWeight:800,letterSpacing:".15em",color:"#526b56"}}>THE CHOCO STUDIOS / TCS TEMPLATE</div>
      <h1 style={{fontSize:28,margin:"18px 0 8px"}}>{data?.order.status==="paid"?"Pembayaran terverifikasi": "Status pembayaran"}</h1>
      <p style={{color:"#657267",lineHeight:1.65}}>{message}</p>
      {loading&&<div style={{height:5,background:"#e8ece6",borderRadius:20,overflow:"hidden",margin:"20px 0"}}><div style={{height:"100%",width:"55%",background:"#506b54",borderRadius:20}}/></div>}
      {error&&<div role="alert" style={{background:"#fff1ef",color:"#923b32",padding:12,borderRadius:9,marginTop:14,fontSize:13}}>{error}</div>}
      {data?.order&&<div style={{background:"#f5f7f3",padding:16,borderRadius:11,marginTop:18}}>
        <div style={{fontSize:12,color:"#748077"}}>ORDER ID</div><code style={{fontSize:12,overflowWrap:"anywhere"}}>{data.order.id}</code>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginTop:16}}>
          <div><div style={{fontSize:12,color:"#748077"}}>NILAI ORDER</div><strong>{money(data.order.amount_cents)}</strong></div>
          <div><div style={{fontSize:12,color:"#748077"}}>STATUS</div><strong style={{textTransform:"capitalize"}}>{data.order.status}</strong></div>
        </div>
        <div style={{marginTop:14}}><div style={{fontSize:12,color:"#748077"}}>EMAIL PEMBELI</div><strong>{data.order.buyer_email}</strong></div>
      </div>}
      {data?.order.status==="paid"&&<div style={{marginTop:22}}>
        <button type="button" onClick={download} style={{border:0,borderRadius:10,padding:"14px 18px",background:"#344a39",color:"#fff",fontWeight:700,cursor:"pointer",width:"100%"}}>Unduh template berbayar</button>
        <p style={{fontSize:12,color:"#718075",lineHeight:1.5,marginTop:9}}>File dibuat setelah server memverifikasi pembayaran yang diterima melalui webhook Dodo Payments.</p>
      </div>}
      {data?.order.status==="paid"&&data.review&&<div style={{marginTop:22,borderTop:"1px solid #e8ece6",paddingTop:18}}>
        <strong>Ulasan sudah dikirim</strong><p style={{color:"#718075",fontSize:13}}>Status ulasan: {data.review.status==="pending"?"Menunggu moderasi":data.review.status}</p>
      </div>}
      {data?.order.status==="paid"&&!data.review&&<div style={{marginTop:22,borderTop:"1px solid #e8ece6",paddingTop:18}}>
        <h2 style={{fontSize:19,margin:"0 0 8px"}}>Beri ulasan pembelian</h2><p style={{fontSize:13,color:"#718075"}}>Ulasan ini ditautkan ke order terverifikasi dan akan ditinjau sebelum ditampilkan.</p>
        <label style={{display:"block",fontSize:13,fontWeight:700,margin:"15px 0 7px"}}>Rating</label>
        <select value={rating} onChange={e=>setRating(Number(e.target.value))} style={{width:"100%",padding:11,border:"1px solid #dbe1d8",borderRadius:8}}>{[5,4,3,2,1].map(x=><option value={x} key={x}>{x} / 5</option>)}</select>
        <label style={{display:"block",fontSize:13,fontWeight:700,margin:"15px 0 7px"}}>Nama tampilan (opsional)</label>
        <input value={displayName} onChange={e=>setDisplayName(e.target.value)} maxLength={80} placeholder="Nama yang ingin ditampilkan" style={{width:"100%",padding:11,border:"1px solid #dbe1d8",borderRadius:8}}/>
        <label style={{display:"block",fontSize:13,fontWeight:700,margin:"15px 0 7px"}}>Ulasan</label>
        <textarea value={reviewText} onChange={e=>setReviewText(e.target.value)} minLength={5} maxLength={1200} rows={4} placeholder="Bagikan pengalaman menggunakan template ini." style={{width:"100%",padding:11,border:"1px solid #dbe1d8",borderRadius:8,resize:"vertical"}}/>
        <button type="button" disabled={savingReview||reviewText.trim().length<5} onClick={()=>void submitReview()} style={{border:0,borderRadius:9,padding:"12px 16px",background:"#344a39",color:"#fff",fontWeight:700,cursor:"pointer",marginTop:12}}>{savingReview?"Mengirim…":"Kirim ulasan"}</button>
        {reviewMessage&&<p role="status" style={{fontSize:13,color:"#526b56",marginTop:10}}>{reviewMessage}</p>}
      </div>}
      {!loading&&data?.order.status!=="paid"&&<button onClick={()=>void check()} type="button" style={{border:"1px solid #d9e0d7",borderRadius:9,padding:"11px 15px",background:"#fff",color:"#344a39",fontWeight:700,cursor:"pointer",marginTop:18}}>Periksa kembali status</button>}
      <div style={{marginTop:24,paddingTop:16,borderTop:"1px solid #edf0eb"}}><a href="/katalog" style={{color:"#526b56",fontSize:13,textDecoration:"none"}}>← Kembali ke katalog</a></div>
    </section>
  </main>;
}
