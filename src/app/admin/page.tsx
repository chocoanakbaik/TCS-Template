"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

type Order = { id:string; slug:string; buyer_email:string; amount_cents:number; currency:string; status:string; created_at:string; paid_at?:string|null; payment_id?:string|null };
type Review = { id:string; slug:string; rating:number; review_text:string; display_name?:string|null; status:string; created_at:string };
type Overview = { stats:{total_orders:number;paid_orders:number;pending_orders:number;gross_paid_cents:number;total_reviews:number;pending_reviews:number};orders:Order[];reviews:Review[];events:Array<{webhook_id:string;event_type:string;event_timestamp?:string|null;received_at:string;processed_at?:string|null;processing_error?:string|null}>;templates:Array<{slug:string;name:string;product_id:string;price_cents:number;active:boolean}> };
type Webhook = {id:string;url:string;description?:string;disabled:boolean;filter_types:string[];is_tcs_endpoint?:boolean};

const money=(cents:number)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(cents/100);
const date=(value:string)=>new Intl.DateTimeFormat("id-ID",{dateStyle:"medium",timeStyle:"short"}).format(new Date(value));
const badge=(status:string)=>status==="paid"?"Paid":status==="pending"?"Menunggu":status==="processing"?"Diproses":status==="failed"?"Gagal":status==="refunded"?"Refund":status==="disputed"?"Dispute":status==="approved"?"Disetujui":status==="rejected"?"Ditolak":status;

export default function AdminPage(){
  const [authenticated,setAuthenticated]=useState(false);
  const [checking,setChecking]=useState(true);
  const [password,setPassword]=useState("");
  const [overview,setOverview]=useState<Overview|null>(null);
  const [webhooks,setWebhooks]=useState<Webhook[]>([]);
  const [environment,setEnvironment]=useState("test_mode");
  const [endpointUrl,setEndpointUrl]=useState("");
  const [signingKey,setSigningKey]=useState("");
  const [notice,setNotice]=useState("");
  const [error,setError]=useState("");
  const [busy,setBusy]=useState(false);

  const request=useCallback(async(url:string,init?:RequestInit)=>{
    const response=await fetch(url,{...init,headers:{"content-type":"application/json",...(init?.headers??{})},cache:"no-store"});
    const data=await response.json().catch(()=>({}));
    if(!response.ok) throw new Error(data.error||"Permintaan gagal diproses.");
    return data;
  },[]);

  const load=useCallback(async()=>{
    setBusy(true);setError("");
    try{
      const [data,hookData]=await Promise.all([request("/api/admin/overview"),request("/api/admin/webhooks")]);
      setOverview(data as Overview);
      setWebhooks(hookData.webhooks??[]);
      setEnvironment(hookData.environment??"test_mode");
      setEndpointUrl(hookData.endpoint_url??"");
    }catch(e){setError(e instanceof Error?e.message:"Gagal memuat data panel.");}
    finally{setBusy(false);}
  },[request]);

  useEffect(()=>{
    let active=true;
    request("/api/admin/session").then((data)=>{if(!active)return;setAuthenticated(Boolean(data.authenticated));setChecking(false);if(data.authenticated)void load();})
      .catch(()=>{if(active)setChecking(false);});
    return()=>{active=false;};
  },[request,load]);

  async function login(event:FormEvent){
    event.preventDefault();setBusy(true);setError("");
    try{
      await request("/api/admin/login",{method:"POST",body:JSON.stringify({password})});
      setPassword("");setAuthenticated(true);setNotice("Akses admin berhasil dibuka.");await load();
    }catch(e){setError(e instanceof Error?e.message:"Login gagal.");}
    finally{setBusy(false);}
  }
  async function logout(){
    await request("/api/admin/logout",{method:"POST"}).catch(()=>null);
    setAuthenticated(false);setOverview(null);setWebhooks([]);setSigningKey("");
  }
  async function syncWebhook(){
    setBusy(true);setError("");setNotice("");setSigningKey("");
    try{
      const data=await request("/api/admin/webhooks",{method:"POST",body:"{}"});
      setNotice(data.message??"Webhook berhasil disinkronkan.");
      if(data.signing_key)setSigningKey(data.signing_key);
      await load();
    }catch(e){setError(e instanceof Error?e.message:"Sinkronisasi webhook gagal.");}
    finally{setBusy(false);}
  }
  async function moderate(reviewId:string,status:"approved"|"rejected"){
    setBusy(true);setError("");
    try{
      await request("/api/admin/reviews",{method:"PATCH",body:JSON.stringify({review_id:reviewId,status})});
      setNotice("Status ulasan diperbarui.");await load();
    }catch(e){setError(e instanceof Error?e.message:"Ulasan gagal diperbarui.");}
    finally{setBusy(false);}
  }
  const s=overview?.stats;

  const styles={
    page:{minHeight:"100vh",background:"#f4f5f1",color:"#20261f",fontFamily:"Arial,Helvetica,sans-serif",padding:"32px 20px 64px"} as const,
    shell:{maxWidth:1180,margin:"0 auto"} as const,
    header:{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,marginBottom:34,flexWrap:"wrap" as const} as const,
    brand:{fontSize:14,fontWeight:800,letterSpacing:".16em",color:"#35473a"} as const,
    muted:{color:"#718075",fontSize:13} as const,
    card:{background:"#fff",border:"1px solid #e2e7df",borderRadius:16,padding:22,boxShadow:"0 10px 30px rgba(35,48,37,.035)"} as const,
    button:{border:0,borderRadius:9,padding:"11px 16px",fontWeight:700,cursor:"pointer",background:"#344a39",color:"#fff"} as const,
    secondary:{border:"1px solid #d9e0d7",borderRadius:9,padding:"10px 14px",fontWeight:700,cursor:"pointer",background:"#fff",color:"#344a39"} as const,
    input:{width:"100%",padding:"13px 14px",border:"1px solid #dbe1d8",borderRadius:9,fontSize:15,outlineColor:"#697f6c"} as const,
    table:{width:"100%",borderCollapse:"collapse" as const,fontSize:13,minWidth:680} as const,
    th:{textAlign:"left" as const,color:"#758077",fontSize:11,letterSpacing:".1em",padding:"12px 10px",borderBottom:"1px solid #e7ebe5"} as const,
    td:{padding:"14px 10px",borderBottom:"1px solid #edf0eb",verticalAlign:"top" as const} as const,
    pill:{display:"inline-block",borderRadius:30,background:"#eef2ec",padding:"5px 9px",fontSize:11,fontWeight:700,color:"#425744"} as const,
  };

  if(checking)return <main style={styles.page}><div style={styles.shell}>Memeriksa sesi admin…</div></main>;
  if(!authenticated)return <main style={{...styles.page,display:"grid",placeItems:"center"}}><section style={{...styles.card,width:"min(100%,420px)",padding:32}}>
    <p style={styles.brand}>THE CHOCO STUDIOS / TCS TEMPLATE</p><h1 style={{fontSize:28,margin:"18px 0 8px"}}>Panel Admin</h1>
    <p style={{...styles.muted,marginBottom:25}}>Masuk untuk mengelola webhook Dodo Payments, transaksi, dan ulasan pembeli.</p>
    <form onSubmit={login}><label htmlFor="admin-password" style={{display:"block",fontSize:13,fontWeight:700,marginBottom:8}}>Kata sandi admin</label>
      <input id="admin-password" type="password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password" required style={styles.input}/>
      {error&&<p role="alert" style={{color:"#a33b32",fontSize:13,marginTop:12}}>{error}</p>}
      <button type="submit" disabled={busy} style={{...styles.button,width:"100%",marginTop:18,opacity:busy?.65:1}}>{busy?"Memeriksa…":"Masuk ke panel"}</button>
    </form>
    <p style={{...styles.muted,marginTop:24}}>Akses terbatas untuk pengelola TCS Template.</p>
  </section></main>;

  return <main style={styles.page}><div style={styles.shell}>
    <header style={styles.header}><div><div style={styles.brand}>THE CHOCO STUDIOS / TCS TEMPLATE</div><h1 style={{fontSize:30,margin:"9px 0 6px"}}>Panel Admin</h1><div style={styles.muted}>Pengelolaan pembayaran, webhook, dan ulasan pembeli.</div></div>
      <div style={{display:"flex",gap:9,alignItems:"center",flexWrap:"wrap"}}><span style={styles.pill}>{environment==="live_mode"?"LIVE MODE":"TEST MODE"}</span><button style={styles.secondary} onClick={()=>void load()} disabled={busy}>Perbarui data</button><button style={styles.secondary} onClick={()=>void logout()}>Keluar</button></div>
    </header>
    {error&&<div role="alert" style={{...styles.card,borderColor:"#e9c6c1",color:"#9a3b32",marginBottom:18}}>{error}</div>}
    {notice&&<div role="status" style={{...styles.card,borderColor:"#d7e2d6",color:"#38533d",marginBottom:18}}>{notice}</div>}
    {s&&<section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:14,marginBottom:18}}>
      {[["Total pesanan",String(s.total_orders)],["Pembayaran berhasil",String(s.paid_orders)],["Menunggu pembayaran",String(s.pending_orders)],["Pendapatan kotor",money(s.gross_paid_cents)],["Total ulasan",String(s.total_reviews)],["Ulasan menunggu",String(s.pending_reviews)]].map(([label,value])=><article key={label} style={styles.card}><div style={{...styles.muted,marginBottom:12}}>{label}</div><strong style={{fontSize:26}}>{value}</strong></article>)}
    </section>}
    <section style={{...styles.card,marginBottom:18}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:14,flexWrap:"wrap"}}>
        <div><h2 style={{fontSize:19,margin:"0 0 7px"}}>Webhook Dodo Payments</h2><p style={styles.muted}>Endpoint penerima event pembayaran, refund, dan dispute. Pengaturan endpoint dilakukan dari panel ini.</p></div>
        <button style={styles.button} onClick={()=>void syncWebhook()} disabled={busy}>{busy?"Memproses…":"Sinkronkan webhook"}</button>
      </div>
      <div style={{background:"#f5f7f3",borderRadius:10,padding:13,marginTop:15,overflowWrap:"anywhere"}}><div style={{...styles.muted,marginBottom:5}}>URL endpoint</div><code style={{fontSize:13}}>{endpointUrl||"Belum tersedia"}</code></div>
      <div style={{overflowX:"auto",marginTop:16}}><table style={styles.table}><thead><tr><th style={styles.th}>WEBHOOK ID</th><th style={styles.th}>ENDPOINT</th><th style={styles.th}>STATUS</th><th style={styles.th}>EVENT</th></tr></thead><tbody>
        {webhooks.length?webhooks.map(h=><tr key={h.id}><td style={styles.td}><code>{h.id}</code></td><td style={styles.td}><span style={{overflowWrap:"anywhere"}}>{h.url}</span>{h.is_tcs_endpoint&&<div style={{...styles.muted,marginTop:4}}>Endpoint TCS Template</div>}</td><td style={styles.td}><span style={styles.pill}>{h.disabled?"Nonaktif":"Aktif"}</span></td><td style={styles.td}>{(h.filter_types??[]).join(", ")||"Tidak ada filter"}</td></tr>):<tr><td style={styles.td} colSpan={4}>Belum ada endpoint yang terdaftar.</td></tr>}
      </tbody></table></div>
      {signingKey&&<div style={{marginTop:18,padding:14,border:"1px solid #e8d7a9",borderRadius:10,background:"#fffaf0"}}><strong>Signing key endpoint baru</strong><p style={styles.muted}>Salin nilai ini ke environment <code>DODO_PAYMENTS_WEBHOOK_KEY</code> di Vercel. Nilai hanya ditampilkan pada sesi ini.</p><input readOnly value={signingKey} style={styles.input} onFocus={e=>e.currentTarget.select()}/></div>}
    </section>
    <section style={{...styles.card,marginBottom:18}}>
      <h2 style={{fontSize:19,margin:"0 0 7px"}}>Riwayat penerimaan webhook</h2>
      <p style={styles.muted}>Event yang diterima endpoint TCS Template dan hasil pemrosesannya.</p>
      <div style={{overflowX:"auto",marginTop:12}}><table style={styles.table}><thead><tr><th style={styles.th}>WAKTU</th><th style={styles.th}>EVENT ID</th><th style={styles.th}>TIPE EVENT</th><th style={styles.th}>HASIL</th></tr></thead><tbody>
        {(overview?.events??[]).length?(overview?.events??[]).map(event=><tr key={event.webhook_id}><td style={styles.td}>{date(event.received_at)}</td><td style={styles.td}><code>{event.webhook_id}</code></td><td style={styles.td}>{event.event_type}</td><td style={styles.td}><span style={styles.pill}>{event.processed_at?"Diproses":event.processing_error?"Perlu perhatian":"Diterima"}</span>{event.processing_error&&<div style={{color:"#a33b32",fontSize:12,marginTop:5}}>{event.processing_error}</div>}</td></tr>):<tr><td style={styles.td} colSpan={4}>Belum ada event webhook yang diterima.</td></tr>}
      </tbody></table></div>
    </section>
    <section style={{...styles.card,marginBottom:18}}>
      <h2 style={{fontSize:19,margin:"0 0 14px"}}>Transaksi terbaru</h2><div style={{overflowX:"auto"}}><table style={styles.table}><thead><tr><th style={styles.th}>TANGGAL</th><th style={styles.th}>PRODUK</th><th style={styles.th}>PEMBELI</th><th style={styles.th}>NILAI</th><th style={styles.th}>STATUS</th><th style={styles.th}>PAYMENT ID</th></tr></thead><tbody>
        {(overview?.orders??[]).length?(overview?.orders??[]).map(o=><tr key={o.id}><td style={styles.td}>{date(o.created_at)}</td><td style={styles.td}>{overview?.templates.find(t=>t.slug===o.slug)?.name??o.slug}</td><td style={styles.td}>{o.buyer_email}</td><td style={styles.td}>{money(o.amount_cents)}</td><td style={styles.td}><span style={styles.pill}>{badge(o.status)}</span></td><td style={styles.td}><code>{o.payment_id??"—"}</code></td></tr>):<tr><td style={styles.td} colSpan={6}>Belum ada transaksi.</td></tr>}
      </tbody></table></div>
    </section>
    <section style={{...styles.card,marginBottom:18}}>
      <h2 style={{fontSize:19,margin:"0 0 14px"}}>Ulasan pembeli terverifikasi</h2><div style={{display:"grid",gap:12}}>
        {(overview?.reviews??[]).length?(overview?.reviews??[]).map(review=><article key={review.id} style={{border:"1px solid #e8ece6",borderRadius:12,padding:15}}>
          <div style={{display:"flex",justifyContent:"space-between",gap:10,flexWrap:"wrap"}}><div><strong>{overview?.templates.find(t=>t.slug===review.slug)?.name??review.slug}</strong><div style={styles.muted}>{review.display_name||"Pembeli terverifikasi"} · {"★".repeat(review.rating)} · {date(review.created_at)}</div></div><span style={styles.pill}>{badge(review.status)}</span></div>
          <p style={{fontSize:14,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{review.review_text}</p>
          {review.status==="pending"&&<div style={{display:"flex",gap:8}}><button style={styles.button} onClick={()=>void moderate(review.id,"approved")} disabled={busy}>Setujui</button><button style={styles.secondary} onClick={()=>void moderate(review.id,"rejected")} disabled={busy}>Tolak</button></div>}
        </article>):<p style={styles.muted}>Belum ada ulasan pembeli.</p>}
      </div>
    </section>
    <div style={{...styles.muted,textAlign:"center",padding:12}}>TCS Template Admin · The Choco Studios · Semua waktu mengikuti waktu perangkat.</div>
  </div></main>;
}
