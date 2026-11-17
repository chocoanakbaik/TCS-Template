'use client';

import { useEffect, useMemo, useState } from 'react';
import { generateTemplateFile } from '@/lib/template-generator';
import type { CategoryId, Quality, TemplateAnswers, TemplateDefinition, TemplateQuestion } from '@/data/schema';

type Props = { templates: TemplateDefinition[] };
type DownloadResult = { filename:string; templateName:string };

const categories:Array<{id:CategoryId|'semua';label:string}>=[
  {id:'semua',label:'Semua kategori'},{id:'bisnis',label:'Bisnis & keuangan'},
  {id:'operasional',label:'Operasional'},{id:'produktivitas',label:'Produktivitas'},
  {id:'pendidikan',label:'Pendidikan'},{id:'sdm',label:'SDM'},{id:'proyek',label:'Proyek'},
  {id:'konten',label:'Konten'},{id:'dokumen',label:'Dokumen'},{id:'developer',label:'Developer'},
];
const qualities:Array<{id:Quality|'semua';label:string}>=[
  {id:'semua',label:'Semua'},{id:'standar',label:'Standar'},
  {id:'baik',label:'Baik'},{id:'unggulan',label:'Unggulan'},
];
const qualityLabel:Record<Quality,string>={standar:'Standar',baik:'Baik',unggulan:'Unggulan'};
const formatLabel=(format:string)=>format.toUpperCase();

export function CatalogClient({templates}:Props) {
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState<CategoryId|'semua'>('semua');
  const [quality,setQuality]=useState<Quality|'semua'>('semua');
  const [activeTemplate,setActiveTemplate]=useState<TemplateDefinition|null>(null);
  const [answers,setAnswers]=useState<TemplateAnswers>({});
  const [step,setStep]=useState(0);
  const [formError,setFormError]=useState('');
  const [isGenerating,setIsGenerating]=useState(false);
  const [downloadResult,setDownloadResult]=useState<DownloadResult|null>(null);
  const [menuOpen,setMenuOpen]=useState(false);

  const filteredTemplates=useMemo(()=>{
    const term=query.trim().toLocaleLowerCase('id');
    return templates.filter((template)=>{
      const categoryMatch=category==='semua'||template.category===category;
      const qualityMatch=quality==='semua'||template.quality===quality;
      const searchable=[template.name,template.categoryLabel,template.description,...template.tags].join(' ').toLocaleLowerCase('id');
      return categoryMatch&&qualityMatch&&(!term||searchable.includes(term));
    });
  },[templates,query,category,quality]);

  useEffect(()=>{
    if(!activeTemplate&&!downloadResult) return;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    function onKeyDown(event:KeyboardEvent) {
      if(event.key==='Escape') {
        setActiveTemplate(null);setDownloadResult(null);setFormError('');
      }
    }
    document.addEventListener('keydown',onKeyDown);
    return ()=>{
      document.body.style.overflow=previousOverflow;
      document.removeEventListener('keydown',onKeyDown);
    };
  },[activeTemplate,downloadResult]);

  function openTemplate(template:TemplateDefinition) {
    if(template.questions.length!==5) {setFormError('Template belum dikonfigurasi dengan lima pertanyaan.');return;}
    setAnswers({});setStep(0);setFormError('');setDownloadResult(null);setActiveTemplate(template);
  }
  function closeWizard() {
    if(isGenerating) return;
    setActiveTemplate(null);setFormError('');
  }
  function updateAnswer(question:TemplateQuestion,value:string) {
    setAnswers((current)=>({...current,[question.id]:value}));setFormError('');
  }
  async function handleNext() {
    if(!activeTemplate) return;
    const question=activeTemplate.questions[step];
    if(question.required&&!(answers[question.id]??'').trim()) {
      setFormError('Bagian ini wajib diisi sebelum melanjutkan.');return;
    }
    if(step<activeTemplate.questions.length-1) {
      setStep((current)=>current+1);setFormError('');return;
    }
    setIsGenerating(true);setFormError('');
    try {
      const filename=generateTemplateFile(activeTemplate,answers);
      setDownloadResult({filename,templateName:activeTemplate.name});
      setActiveTemplate(null);
    } catch(error) {
      setFormError(error instanceof Error?error.message:'File gagal dibuat. Silakan coba kembali.');
    } finally {setIsGenerating(false);}
  }

  const activeQuestion=activeTemplate?.questions[step];
  const progress=activeTemplate?((step+1)/activeTemplate.questions.length)*100:0;

  return <>
    <a className="skip-link" href="#main-content">Lewati ke konten utama</a>
    <header className="site-header">
      <div className="container header-inner">
        <a className="wordmark" href="#" aria-label="TCS Template, halaman utama">
          <span className="wordmark-main">TCS</span><span className="wordmark-divider" aria-hidden="true"/><span className="wordmark-sub">TEMPLATE</span>
        </a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen?'Tutup navigasi':'Buka navigasi'} onClick={()=>setMenuOpen((v)=>!v)}><span/><span/></button>
        <nav className={'main-nav'+(menuOpen?' is-open':'')} id="primary-navigation" aria-label="Navigasi utama">
          <a href="#catalog" onClick={()=>setMenuOpen(false)}>Katalog</a>
          <a href="#how-it-works" onClick={()=>setMenuOpen(false)}>Cara kerja</a>
          <a href="#about" onClick={()=>setMenuOpen(false)}>Tentang</a>
          <a className="nav-support" href="https://saweria.co/thechocostudios" target="_blank" rel="noopener noreferrer">Dukung kami <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>

    <main id="main-content">
      <section className="hero-section">
        <div className="container hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">THE CHOCO STUDIOS · DIGITAL TEMPLATES</p>
            <h1>Template yang mengikuti <span>cara Anda bekerja.</span></h1>
            <p className="hero-description">Koleksi perangkat kerja digital yang dapat disesuaikan dengan kebutuhan nyata. Pilih template, jawab lima pertanyaan, lalu unduh file yang dibuat langsung di browser.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#catalog">Temukan template <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#how-it-works">Pelajari cara kerja <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className="hero-visual" aria-label="Pratinjau koleksi template">
            <div className="visual-orbit orbit-one"/><div className="visual-orbit orbit-two"/>
            <div className="preview-window">
              <div className="preview-topbar"><div className="preview-dots"><i/><i/><i/></div><span>WORKSPACE / PREVIEW</span><span className="preview-status">READY</span></div>
              <div className="preview-content">
                <div className="preview-heading"><div><span className="preview-label">YOUR WORK, ORGANIZED</span><strong>Workspace overview</strong></div><span className="preview-date">TCS / 001</span></div>
                <div className="preview-metrics">
                  <div className="metric-card metric-dark"><span>COLLECTION</span><strong>09</strong><small>Categories</small></div>
                  <div className="metric-card metric-light"><span>FORMAT</span><strong>02</strong><small>XLSX & MD</small></div>
                  <div className="metric-card metric-sage"><span>ACCESS</span><strong>FREE</strong><small>For everyone</small></div>
                </div>
                <div className="preview-list">
                  <div className="preview-list-head"><span>AVAILABLE TEMPLATES</span><span>FORMAT</span></div>
                  <div className="preview-row"><span className="row-icon icon-sage">F</span><span>Financial Tracker</span><b>XLSX</b></div>
                  <div className="preview-row"><span className="row-icon icon-sand">P</span><span>Project Brief</span><b>MD</b></div>
                  <div className="preview-row"><span className="row-icon icon-lilac">D</span><span>Developer README Kit</span><b>MD</b></div>
                </div>
              </div>
            </div>
            <div className="floating-note note-top"><span className="note-mark">✳</span><span>Built around<br/>your workflow</span></div>
            <div className="floating-note note-bottom"><span className="note-number">05</span><span>Questions<br/>then download</span></div>
          </div>
        </div>
        <div className="container hero-bottom"><span>AN ORGANIZED START FOR EVERY KIND OF WORK</span><div className="hero-bottom-line"/><span className="hero-bottom-index">TCS / 001</span></div>
      </section>

      <section className="catalog-section section-space" id="catalog">
        <div className="container">
          <div className="section-heading catalog-heading">
            <div><p className="eyebrow">TEMPLATE COLLECTION</p><h2>Mulai dari kebutuhan Anda.</h2><p className="section-description">Pilih perangkat kerja berdasarkan bidang dan kualitas template. Seluruh file dibuat sesuai jawaban Anda dan dapat diunduh gratis.</p></div>
            <div className="catalog-count"><strong>{filteredTemplates.length.toString().padStart(2,'0')}</strong><span>template tersedia</span></div>
          </div>
          <div className="catalog-toolbar">
            <label className="search-box" htmlFor="template-search"><span className="search-icon" aria-hidden="true">⌕</span>
              <input id="template-search" type="search" placeholder="Cari template atau kebutuhan..." autoComplete="off" value={query} onChange={(e)=>setQuery(e.target.value)}/>
              <kbd>/</kbd>
            </label>
            <span className="toolbar-note">FILTER KATALOG</span>
          </div>
          <div className="filter-block">
            <span className="filter-label">Bidang</span>
            <div className="category-filter" role="group" aria-label="Filter kategori">
              {categories.map((item)=><button className={'filter-chip'+(category===item.id?' is-active':'')} type="button" key={item.id} aria-pressed={category===item.id} onClick={()=>setCategory(item.id)}>{item.label}</button>)}
            </div>
          </div>
          <div className="filter-block quality-block">
            <span className="filter-label">Kualitas template</span>
            <div className="quality-filter" role="group" aria-label="Filter kualitas template">
              {qualities.map((item)=><button className={'quality-chip'+(quality===item.id?' is-active':'')} type="button" key={item.id} aria-pressed={quality===item.id} onClick={()=>setQuality(item.id)}>{item.label}</button>)}
            </div>
          </div>
          {filteredTemplates.length>0?(
            <div className="template-grid" aria-live="polite">
              {filteredTemplates.map((template,index)=><article className="template-card" key={template.id} style={{animationDelay:Math.min(index*45,270)+'ms'}}>
                <div className="card-topline"><span className="card-category">{template.categoryLabel}</span><span className="card-format">{formatLabel(template.format)}</span></div>
                <div className="card-symbol" aria-hidden="true">{template.symbol}</div>
                <h3>{template.name}</h3><p>{template.description}</p>
                <div className="card-meta"><span className={'quality-badge quality-'+template.quality}>{qualityLabel[template.quality]}</span><span className="question-count">5 pertanyaan</span></div>
                <div className="card-bottom"><span className="card-status"><i/>GRATIS</span><button className="card-action" type="button" onClick={()=>openTemplate(template)}>Sesuaikan & unduh <span aria-hidden="true">→</span></button></div>
              </article>)}
            </div>
          ):(
            <div className="empty-state"><span className="empty-symbol">⌕</span><h3>Template tidak ditemukan.</h3><p>Coba kata kunci lain atau ubah filter kategori dan kualitas template.</p>
              <button className="button button-secondary" type="button" onClick={()=>{setQuery('');setCategory('semua');setQuality('semua');}}>Reset filter</button>
            </div>
          )}
        </div>
      </section>

      <section className="workflow-section section-space" id="how-it-works">
        <div className="container">
          <div className="section-heading workflow-heading">
            <div><p className="eyebrow">A BETTER STARTING POINT</p><h2>Dari kebutuhan menjadi file siap pakai.</h2></div>
            <p className="section-description">Tidak perlu akun, server, atau penyimpanan cloud. Seluruh proses penyesuaian dan pembuatan file dilakukan langsung pada browser Anda.</p>
          </div>
          <div className="steps-grid">
            <article className="step-card"><div className="step-illustration illustration-select"><div className="illus-sheet"><i/><i/><i/><i/></div><span className="illus-cursor">↖</span></div><span className="step-number">01</span><h3>Pilih template</h3><p>Temukan template berdasarkan bidang dan kualitas template yang sesuai.</p></article>
            <article className="step-card"><div className="step-illustration illustration-specify"><div className="illus-question">05</div><div className="illus-choice"/><div className="illus-choice short"/></div><span className="step-number">02</span><h3>Sesuaikan kebutuhan</h3><p>Jawab lima pertanyaan untuk memasukkan identitas dan konteks penggunaan.</p></article>
            <article className="step-card"><div className="step-illustration illustration-review"><div className="illus-check">↓</div><div className="illus-lines"><i/><i/><i/></div></div><span className="step-number">03</span><h3>Unduh file</h3><p>File XLSX atau Markdown dirakit langsung di browser, tanpa layanan backend.</p></article>
          </div>
        </div>
      </section>

      <section className="about-section section-space" id="about">
        <div className="container about-layout">
          <div className="about-side"><span className="about-index">TCS<br/>/ TEMPLATE</span></div>
          <div className="about-copy"><p className="eyebrow">THE CHOCO STUDIOS</p><h2>Perangkat kerja digital yang terbuka untuk semua.</h2>
            <p>TCS Template adalah koleksi template digital dari The Choco Studios untuk membantu individu, bisnis, organisasi, dan berbagai bidang pekerjaan menyusun aktivitas dengan lebih teratur.</p>
            <p>Setiap file dapat disesuaikan dan diunduh secara gratis. TCS mengembangkan koleksi ini secara bertahap dengan fokus pada kegunaan, struktur yang jelas, dan kemudahan penggunaan.</p>
          </div>
        </div>
      </section>

      <section className="principles-section">
        <div className="container principles-layout">
          <div><p className="eyebrow">SIMPLE BY DESIGN</p><h2>Fokus pada pekerjaan.<br/>Bukan pada kerumitan.</h2></div>
          <div className="principle-list">
            <article><div><h3>Mandiri</h3><p>Template dapat dibuat dan digunakan di perangkat Anda tanpa akun TCS atau proses unggah ke server.</p></div></article>
            <article><div><h3>Fleksibel</h3><p>Isi file menyesuaikan nama instansi, proyek, periode, dan kebutuhan yang Anda masukkan.</p></div></article>
            <article><div><h3>Transparan</h3><p>Format file, pertanyaan, rumus, dan isi dokumen ditentukan dengan jelas sebelum file diunduh.</p></div></article>
          </div>
        </div>
      </section>

      <section className="privacy-section section-space">
        <div className="container privacy-card"><div className="privacy-icon" aria-hidden="true">◎</div><div><p className="eyebrow">YOUR INPUT STAYS YOURS</p><h2>Jawaban Anda tetap di perangkat sendiri.</h2><p>Nama instansi, proyek, dan jawaban formulir hanya digunakan untuk merakit file pada browser. Tidak ada API, database, Google Drive, atau pengiriman jawaban ke server TCS.</p></div></div>
      </section>
    </main>

    <footer className="site-footer">
      <div className="container footer-main">
        <a className="wordmark footer-wordmark" href="#" aria-label="TCS Template, kembali ke atas"><span className="wordmark-main">TCS</span><span className="wordmark-divider"/><span className="wordmark-sub">TEMPLATE</span></a>
        <p>Practical templates for everyday work.</p><a className="footer-top" href="#">Kembali ke atas <span aria-hidden="true">↑</span></a>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} THE CHOCO STUDIOS. ALL RIGHTS RESERVED.</span></div>
    </footer>

    {activeTemplate&&activeQuestion&&(
      <div className="modal-backdrop" onMouseDown={(e)=>{if(e.target===e.currentTarget)closeWizard();}}>
        <section className="wizard-dialog" role="dialog" aria-modal="true" aria-labelledby="wizard-title">
          <div className="wizard-top"><a className="wordmark wizard-wordmark" href="#" aria-label="TCS Template"><span className="wordmark-main">TCS</span><span className="wordmark-divider"/><span className="wordmark-sub">TEMPLATE</span></a><button className="icon-button" type="button" onClick={closeWizard} aria-label="Tutup formulir" disabled={isGenerating}>×</button></div>
          <div className="wizard-progress-wrap"><div className="wizard-progress-copy"><span>PERTANYAAN {String(step+1).padStart(2,'0')}</span><span>{String(step+1).padStart(2,'0')} / 05</span></div><div className="wizard-progress-track"><span style={{width:progress+'%'}}/></div></div>
          <div className="wizard-body">
            <div className="wizard-template-label">{activeTemplate.name} / {formatLabel(activeTemplate.format)}</div>
            <h2 id="wizard-title">{step===0?'Mulai dengan identitas penggunaan.':step===4?'Lengkapi catatan terakhir.':'Sesuaikan kebutuhan Anda.'}</h2>
            <p className="wizard-description">Jawab pertanyaan berikut. Informasi yang Anda masukkan akan digunakan untuk menyesuaikan isi file.</p>
            <div className="question-area">
              <label className="question-label" htmlFor={'answer-'+activeQuestion.id}>{activeQuestion.label}{activeQuestion.required?<span aria-hidden="true"> *</span>:null}</label>
              {activeQuestion.type==='select'?(
                <select id={'answer-'+activeQuestion.id} className="question-input" value={answers[activeQuestion.id]??''} onChange={(e)=>updateAnswer(activeQuestion,e.target.value)} required={activeQuestion.required}>
                  <option value="">Pilih salah satu</option>{(activeQuestion.options??[]).map((option)=><option key={option} value={option}>{option}</option>)}
                </select>
              ):activeQuestion.type==='textarea'?(
                <textarea id={'answer-'+activeQuestion.id} className="question-input question-textarea" value={answers[activeQuestion.id]??''} onChange={(e)=>updateAnswer(activeQuestion,e.target.value)} placeholder={activeQuestion.placeholder} rows={4}/>
              ):(
                <input id={'answer-'+activeQuestion.id} className="question-input" type="text" maxLength={120} value={answers[activeQuestion.id]??''} onChange={(e)=>updateAnswer(activeQuestion,e.target.value)} placeholder={activeQuestion.placeholder} required={activeQuestion.required} autoComplete="off"/>
              )}
              {activeQuestion.hint?<p className="question-hint">{activeQuestion.hint}</p>:null}
              {!activeQuestion.required?<p className="question-hint">Pertanyaan opsional. Anda dapat melewatinya.</p>:null}
              {formError?<p className="form-error" role="alert">{formError}</p>:null}
            </div>
          </div>
          <div className="wizard-footer">
            <button className="button button-quiet" type="button" onClick={()=>{setStep((current)=>Math.max(0,current-1));setFormError('');}} disabled={step===0||isGenerating}>Kembali</button>
            <button className="button button-primary" type="button" onClick={handleNext} disabled={isGenerating}>{isGenerating?'Membuat file...':step===4?'Unduh Template':'Lanjutkan'} <span aria-hidden="true">{step===4?'↓':'→'}</span></button>
          </div>
        </section>
      </div>
    )}

    {downloadResult&&(
      <div className="modal-backdrop success-backdrop">
        <section className="success-dialog" role="dialog" aria-modal="true" aria-labelledby="success-title">
          <div className="success-icon" aria-hidden="true">✓</div><p className="eyebrow">DOWNLOAD READY</p>
          <h2 id="success-title">Template berhasil dibuat.</h2>
          <p>File <strong>{downloadResult.filename}</strong> telah dirakit di browser dan proses unduhan sudah dimulai.</p>
          <p className="success-template-name">{downloadResult.templateName} · Gratis</p>
          <div className="success-actions"><a className="button button-coffee" href="https://saweria.co/thechocostudios" target="_blank" rel="noopener noreferrer">Traktir Kopi <span aria-hidden="true">↗</span></a><button className="button button-quiet" type="button" onClick={()=>setDownloadResult(null)}>Selesai</button></div>
        </section>
      </div>
    )}
  </>;
}
