'use client';

import { useEffect } from 'react';

const translations = {"Lewati ke konten utama":{"en":"Skip to main content","zh":"跳转到主要内容"},"Cara kerja":{"en":"How it works","zh":"使用方式"},"Dukung kami":{"en":"Support us","zh":"支持我们"},"THE CHOCO STUDIOS · DIGITAL TEMPLATES":{"en":"THE CHOCO STUDIOS · DIGITAL TEMPLATES","zh":"THE CHOCO STUDIOS · 数字模板"},"Template yang mengikuti":{"en":"Templates that follow","zh":"贴合您的"},"cara Anda bekerja.":{"en":"the way you work.","zh":"工作方式。"},"Koleksi perangkat kerja digital yang dapat disesuaikan dengan kebutuhan nyata. Pilih template, jawab lima pertanyaan, lalu unduh file yang dibuat langsung di browser.":{"en":"A collection of digital work tools that adapt to real needs. Choose a template, answer five questions, and download a file generated directly in your browser.","zh":"一套可根据实际需求调整的数字工作工具。选择模板、回答五个问题，然后下载直接在浏览器中生成的文件。"},"Temukan template":{"en":"Find templates","zh":"查找模板"},"Pelajari cara kerja":{"en":"Learn how it works","zh":"了解使用方式"},"WORKSPACE / PREVIEW":{"en":"WORKSPACE / PREVIEW","zh":"工作区 / 预览"},"YOUR WORK, ORGANIZED":{"en":"YOUR WORK, ORGANIZED","zh":"让工作井然有序"},"Workspace overview":{"en":"Workspace overview","zh":"工作区概览"},"For everyone":{"en":"For everyone","zh":"适用于每个人"},"AVAILABLE TEMPLATES":{"en":"AVAILABLE TEMPLATES","zh":"可用模板"},"Financial Tracker":{"en":"Financial Tracker","zh":"财务追踪表"},"Project Brief":{"en":"Project Brief","zh":"项目简报"},"Developer README Kit":{"en":"Developer README Kit","zh":"开发者 README 工具包"},"Built around":{"en":"Built around","zh":"围绕您的流程"},"your workflow":{"en":"your workflow","zh":"构建"},"then download":{"en":"then download","zh":"并下载"},"AN ORGANIZED START FOR EVERY KIND OF WORK":{"en":"AN ORGANIZED START FOR EVERY KIND OF WORK","zh":"为各种工作提供有序起点"},"TEMPLATE COLLECTION":{"en":"TEMPLATE COLLECTION","zh":"模板集合"},"Mulai dari kebutuhan Anda.":{"en":"Start with what you need.","zh":"从您的需求开始。"},"Pilih perangkat kerja berdasarkan bidang dan kualitas template. Seluruh file dibuat sesuai jawaban Anda dan dapat diunduh gratis.":{"en":"Choose a work tool by category and template quality. Every file is generated from your answers and can be downloaded for free.","zh":"根据类别和模板质量选择工作工具。所有文件都会根据您的回答生成，并可免费下载。"},"template tersedia":{"en":"templates available","zh":"个模板可用"},"FILTER KATALOG":{"en":"CATALOGUE FILTERS","zh":"目录筛选"},"Kualitas template":{"en":"Template quality","zh":"模板质量"},"5 pertanyaan":{"en":"5 questions","zh":"5 个问题"},"Sesuaikan & unduh":{"en":"Customize & download","zh":"自定义并下载"},"Template tidak ditemukan.":{"en":"No templates found.","zh":"未找到模板。"},"Coba kata kunci lain atau ubah filter kategori dan kualitas template.":{"en":"Try another keyword or change the category and quality filters.","zh":"请尝试其他关键词，或更改类别与质量筛选条件。"},"Reset filter":{"en":"Reset filters","zh":"重置筛选"},"A BETTER STARTING POINT":{"en":"A BETTER STARTING POINT","zh":"更好的起点"},"Dari kebutuhan menjadi file siap pakai.":{"en":"From a need to a ready-to-use file.","zh":"从需求到可用文件。"},"Tidak perlu akun, server, atau penyimpanan cloud. Seluruh proses penyesuaian dan pembuatan file dilakukan langsung pada browser Anda.":{"en":"No account, server, or cloud storage is required. Customization and file generation happen directly in your browser.","zh":"无需账户、服务器或云存储。所有自定义与文件生成过程都直接在您的浏览器中完成。"},"Pilih template":{"en":"Choose a template","zh":"选择模板"},"Temukan template berdasarkan bidang dan kualitas template yang sesuai.":{"en":"Find a template that matches your field and quality requirements.","zh":"根据您的领域和质量需求查找合适的模板。"},"Sesuaikan kebutuhan":{"en":"Customize your needs","zh":"自定义需求"},"Jawab lima pertanyaan untuk memasukkan identitas dan konteks penggunaan.":{"en":"Answer five questions to add your identity and usage context.","zh":"回答五个问题，以添加您的身份和使用场景。"},"Unduh file":{"en":"Download the file","zh":"下载文件"},"File XLSX atau Markdown dirakit langsung di browser, tanpa layanan backend.":{"en":"XLSX or Markdown files are assembled directly in your browser, without a backend service.","zh":"XLSX 或 Markdown 文件直接在浏览器中生成，无需后端服务。"},"/ TEMPLATE":{"en":"/ TEMPLATE","zh":"/ 模板"},"Perangkat kerja digital yang terbuka untuk semua.":{"en":"Digital work tools open to everyone.","zh":"人人都可使用的数字工作工具。"},"TCS Template adalah koleksi template digital dari The Choco Studios untuk membantu individu, bisnis, organisasi, dan berbagai bidang pekerjaan menyusun aktivitas dengan lebih teratur.":{"en":"TCS Template is a collection of digital templates by The Choco Studios, helping individuals, businesses, organizations, and different professions organize their work.","zh":"TCS Template 是 The Choco Studios 提供的数字模板集合，帮助个人、企业、组织及不同专业领域更有条理地安排工作。"},"Setiap file dapat disesuaikan dan diunduh secara gratis. TCS mengembangkan koleksi ini secara bertahap dengan fokus pada kegunaan, struktur yang jelas, dan kemudahan penggunaan.":{"en":"Every file can be customized and downloaded for free. TCS develops this collection incrementally, focusing on usefulness, clear structure, and ease of use.","zh":"每个文件都可以自定义并免费下载。TCS 持续扩展此模板集合，重点关注实用性、清晰结构与易用性。"},"SIMPLE BY DESIGN":{"en":"SIMPLE BY DESIGN","zh":"以简约为设计原则"},"Fokus pada pekerjaan.":{"en":"Focus on the work.","zh":"专注于工作。"},"Bukan pada kerumitan.":{"en":"Not the complexity.","zh":"而非复杂性。"},"Template dapat dibuat dan digunakan di perangkat Anda tanpa akun TCS atau proses unggah ke server.":{"en":"Templates can be created and used on your device without a TCS account or uploading anything to a server.","zh":"无需 TCS 账户或上传至服务器，即可在您的设备上创建和使用模板。"},"Isi file menyesuaikan nama instansi, proyek, periode, dan kebutuhan yang Anda masukkan.":{"en":"File contents adapt to the organization, project, period, and requirements you provide.","zh":"文件内容会根据您提供的机构、项目、期间及需求进行调整。"},"Format file, pertanyaan, rumus, dan isi dokumen ditentukan dengan jelas sebelum file diunduh.":{"en":"File formats, questions, formulas, and document contents are clearly defined before download.","zh":"文件格式、问题、公式与文档内容在下载前均有明确说明。"},"YOUR INPUT STAYS YOURS":{"en":"YOUR INPUT STAYS YOURS","zh":"您的输入始终由您掌控"},"Jawaban Anda tetap di perangkat sendiri.":{"en":"Your answers stay on your device.","zh":"您的回答保留在自己的设备上。"},"Nama instansi, proyek, dan jawaban formulir hanya digunakan untuk merakit file pada browser. Tidak ada API, database, Google Drive, atau pengiriman jawaban ke server TCS.":{"en":"Organization names, project details, and form answers are used only to assemble files in your browser. No API, database, Google Drive, or answer submission to TCS servers is involved.","zh":"机构名称、项目详情和表单答案仅用于在浏览器中生成文件。不会使用 API、数据库、Google Drive，也不会将答案发送至 TCS 服务器。"},"Practical templates for everyday work.":{"en":"Practical templates for everyday work.","zh":"适用于日常工作的实用模板。"},"Kembali ke atas":{"en":"Back to top","zh":"返回顶部"},"ALL RIGHTS RESERVED.":{"en":"ALL RIGHTS RESERVED.","zh":"保留所有权利。"},"Jawab pertanyaan berikut. Informasi yang Anda masukkan akan digunakan untuk menyesuaikan isi file.":{"en":"Answer the following questions. Your answers will be used to customize the file contents.","zh":"请回答以下问题。您输入的信息将用于自定义文件内容。"},"Pilih salah satu":{"en":"Choose one","zh":"请选择一项"},"Pertanyaan opsional. Anda dapat melewatinya.":{"en":"Optional question. You may skip it.","zh":"此问题为选答。您可以跳过。"},"DOWNLOAD READY":{"en":"DOWNLOAD READY","zh":"下载已就绪"},"Template berhasil dibuat.":{"en":"Template created successfully.","zh":"模板已成功创建。"},"telah dirakit di browser dan proses unduhan sudah dimulai.":{"en":"has been assembled in your browser and the download has started.","zh":"已在浏览器中生成，下载已开始。"},"Traktir Kopi":{"en":"Buy us a coffee","zh":"请我们喝杯咖啡"},"Semua kategori":{"en":"All categories","zh":"全部类别"},"Bisnis & keuangan":{"en":"Business & finance","zh":"商业与财务"},"Operasional":{"en":"Operations","zh":"运营"},"Produktivitas":{"en":"Productivity","zh":"效率"},"Pendidikan":{"en":"Education","zh":"教育"},"SDM":{"en":"Human resources","zh":"人力资源"},"Proyek":{"en":"Projects","zh":"项目"},"Konten":{"en":"Content","zh":"内容"},"Dokumen":{"en":"Documents","zh":"文档"},"Developer":{"en":"Developer","zh":"开发者"},"Semua":{"en":"All","zh":"全部"},"Standar":{"en":"Standard","zh":"标准"},"Baik":{"en":"Good","zh":"良好"},"Unggulan":{"en":"Featured","zh":"精选"},"BANNER HORIZONTAL":{"en":"HORIZONTAL BANNER","zh":"横幅广告"},"Banner horizontal":{"en":"Horizontal banner","zh":"横幅广告"},"Slot untuk materi iklan berukuran memanjang.":{"en":"Placement for a wide advertising creative.","zh":"用于展示横向广告素材的位置。"},"Display banner":{"en":"Display banner","zh":"展示广告"},"Slot iklan di antara kelompok template.":{"en":"Ad placement between template groups.","zh":"模板组之间的广告位置。"},"Konten promosi":{"en":"Promotional content","zh":"推广内容"},"Area iklan native yang mengikuti lebar konten halaman.":{"en":"Native ad area that follows the page content width.","zh":"随页面内容宽度调整的原生广告区域。"},"Cari template atau kebutuhan...":{"en":"Search templates or needs...","zh":"搜索模板或需求..."},"Filter kategori":{"en":"Filter by category","zh":"按类别筛选"},"Filter kualitas template":{"en":"Filter by template quality","zh":"按模板质量筛选"},"Template belum dikonfigurasi dengan lima pertanyaan.":{"en":"This template has not been configured with five questions.","zh":"此模板尚未配置五个问题。"},"File gagal dibuat. Silakan coba kembali.":{"en":"The file could not be created. Please try again.","zh":"无法创建文件，请重试。"},"Membuat file...":{"en":"Creating file...","zh":"正在创建文件..."},"Unduh Template":{"en":"Download template","zh":"下载模板"},"Lanjutkan":{"en":"Continue","zh":"继续"},"Escape":{"en":"Escape","zh":"退出"},"Nama instansi atau proyek":{"en":"Organization or project name","zh":"机构或项目名称"},"Nama instansi":{"en":"Organization name","zh":"机构名称"},"Nama proyek":{"en":"Project name","zh":"项目名称"},"Periode":{"en":"Period","zh":"期间"},"Catatan":{"en":"Notes","zh":"备注"},"Pilih kategori":{"en":"Choose a category","zh":"选择类别"},"Pilih kualitas":{"en":"Choose quality","zh":"选择质量"},"RUANG IKLAN":{"en":"AD SPACE","zh":"广告位"},"Pilih bahasa":{"en":"Choose language","zh":"选择语言"},"Pencarian":{"en":"Search","zh":"搜索"},"Template":{"en":"Template","zh":"模板"},"Daftar template":{"en":"Template list","zh":"模板列表"}};

export function LanguageSelector() {
  useEffect(() => {
    const storageKey = 'tcs-template-language-v1';
    const originalText = new WeakMap<Text, string>();
    const lastText = new WeakMap<Text, string>();
    const originalAttrs = new WeakMap<Element, Record<string, string>>();
    const lastAttrs = new WeakMap<Element, Record<string, string>>();
    let language: 'id' | 'en' | 'zh' = 'id';
    const normalize = (value: string) => value.replace(/\s+/g, ' ').trim();
    const cleanDisplay = (value: string) => value.replace(/\s*[·•]\s*/g, ' ').replace(/\s+[—–]\s+/g, ', ').replace(/\s+/g, ' ').trim();
    const excluded = (node: Text) => {
      const parent = node.parentElement;
      return !parent || !!parent.closest('script,style,noscript,textarea,input,select,option,code,pre,svg,[data-no-translate],#tcs-language-selector');
    };
    const translateNode = (node: Text) => {
      const current = node.nodeValue ?? '';
      if (lastText.has(node) && lastText.get(node) !== current) originalText.set(node, current);
      if (!originalText.has(node)) originalText.set(node, current);
      const original = originalText.get(node) ?? current;
      const translated = language === 'id' ? normalize(original) : translations[normalize(original)]?.[language] ?? normalize(original);
      const leading = original.match(/^\s*/)?.[0] ?? '';
      const trailing = original.match(/\s*$/)?.[0] ?? '';
      node.nodeValue = leading + cleanDisplay(translated) + trailing;
      lastText.set(node, node.nodeValue);
    };
    const translateAttribute = (element: Element, name: string) => {
      const current = element.getAttribute(name);
      if (current === null) return;
      const source = originalAttrs.get(element) ?? {};
      const applied = lastAttrs.get(element) ?? {};
      if (Object.hasOwn(applied, name) && applied[name] !== current) source[name] = current;
      if (!Object.hasOwn(source, name)) source[name] = current;
      originalAttrs.set(element, source);
      const raw = source[name];
      const translated = language === 'id' ? raw : translations[normalize(raw)]?.[language] ?? raw;
      element.setAttribute(name, cleanDisplay(translated));
      applied[name] = element.getAttribute(name) ?? '';
      lastAttrs.set(element, applied);
    };
    const scan = (root: ParentNode = document.body) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        if (node.nodeType === Node.TEXT_NODE && !excluded(node as Text)) translateNode(node as Text);
        node = walker.nextNode();
      }
      if (root instanceof Element && root.matches('[placeholder],[aria-label],[title],[alt]')) {
        ['placeholder','aria-label','title','alt'].forEach((name) => translateAttribute(root, name));
      }
      root.querySelectorAll?.('[placeholder],[aria-label],[title],[alt]').forEach((element) => {
        ['placeholder','aria-label','title','alt'].forEach((name) => translateAttribute(element, name));
      });
    };
    const setLanguage = (code: string) => {
      language = code === 'en' || code === 'zh' ? code : 'id';
      try { localStorage.setItem(storageKey, language); } catch {}
      document.documentElement.lang = language === 'zh' ? 'zh-CN' : language;
      const toggle = document.getElementById('tcs-template-language-toggle');
      const menu = document.getElementById('tcs-template-language-menu');
      if (toggle) {
        toggle.textContent = ({ id: 'Bahasa', en: 'Language', zh: '语言' })[language];
        toggle.setAttribute('aria-label', ({ id: 'Ganti bahasa', en: 'Change language', zh: '切换语言' })[language]);
      }
      if (menu) menu.setAttribute('aria-label', ({ id: 'Pilih bahasa', en: 'Choose language', zh: '选择语言' })[language]);
      control.querySelectorAll<HTMLButtonElement>('[data-language]').forEach((option) => {
        option.setAttribute('aria-pressed', String(option.dataset.language === language));
      });
      scan();
      document.title = language === 'id' ? 'TCS Template: Template yang mengikuti cara Anda bekerja' : language === 'en' ? 'TCS Template: Templates for your workflow' : 'TCS Template: 贴合您工作流程的模板';
    };
    const control = document.createElement('div');
    control.id = 'tcs-language-selector';
    control.innerHTML = '<button class="tcs-template-language-toggle" id="tcs-template-language-toggle" type="button" aria-label="Ganti bahasa" aria-controls="tcs-template-language-menu" aria-expanded="false">Bahasa</button><div class="tcs-template-language-menu" id="tcs-template-language-menu" role="group" aria-label="Pilih bahasa" hidden><button class="tcs-template-language-option" type="button" data-language="id" aria-pressed="true">Indonesia</button><button class="tcs-template-language-option" type="button" data-language="en" aria-pressed="false">English</button><button class="tcs-template-language-option" type="button" data-language="zh" aria-pressed="false">Mandarin</button></div>';
    const style = document.createElement('style');
    style.textContent = '#tcs-language-selector{position:fixed;top:13px;right:16px;z-index:99999;display:inline-flex}#tcs-language-selector .tcs-template-language-toggle{min-height:38px;padding:0 13px;border:1px solid #dfe4da;border-radius:9px;background:#fff;color:#344e40;font:600 11px/1.2 system-ui,sans-serif;cursor:pointer}#tcs-language-selector .tcs-template-language-toggle:hover,#tcs-language-selector .tcs-template-language-toggle[aria-expanded="true"]{border-color:#9eafa1;background:#f6f8f4}#tcs-language-selector .tcs-template-language-menu{position:absolute;top:calc(100% + 7px);right:0;display:grid;min-width:142px;gap:2px;padding:5px;border:1px solid #dfe4da;border-radius:9px;background:#fff;box-shadow:0 8px 24px rgba(29,43,33,.12)}#tcs-language-selector .tcs-template-language-menu[hidden]{display:none!important}#tcs-language-selector .tcs-template-language-option{min-height:35px;padding:8px 10px;border:0;border-radius:6px;background:transparent;color:#344e40;font:500 11px/1.2 system-ui,sans-serif;text-align:left;cursor:pointer}#tcs-language-selector .tcs-template-language-option:hover,#tcs-language-selector .tcs-template-language-option[aria-pressed="true"]{background:#eef2ec;color:#244638}#tcs-language-selector .tcs-template-language-option[aria-pressed="true"]{font-weight:700}@media(max-width:640px){#tcs-language-selector{top:8px;right:8px}}';
    document.head.append(style);
    document.body.append(control);
    const toggle = control.querySelector<HTMLButtonElement>('#tcs-template-language-toggle');
    const menu = control.querySelector<HTMLDivElement>('#tcs-template-language-menu');
    const closeMenu = (restoreFocus: boolean) => {
      if (!toggle || !menu) return;
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      if (restoreFocus) toggle.focus();
    };
    toggle?.addEventListener('click', () => {
      if (!toggle || !menu) return;
      const opening = menu.hidden;
      menu.hidden = !opening;
      toggle.setAttribute('aria-expanded', String(opening));
    });
    control.querySelectorAll<HTMLButtonElement>('[data-language]').forEach((option) => {
      option.addEventListener('click', () => {
        setLanguage(option.dataset.language ?? 'id');
        closeMenu(true);
      });
    });
    document.addEventListener('pointerdown', (event) => {
      if (menu && !control.contains(event.target as Node) && !menu.hidden) closeMenu(false);
    }, true);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu && !menu.hidden) closeMenu(true);
    });
    let saved = 'id';
    try { const stored = localStorage.getItem(storageKey); if (stored === 'en' || stored === 'zh' || stored === 'id') saved = stored; } catch {}
    setLanguage(saved);
    const observer = new MutationObserver((records) => records.forEach((record) => {
      if (record.type === 'characterData' && record.target.nodeType === Node.TEXT_NODE && !excluded(record.target as Text)) translateNode(record.target as Text);
      if (record.type === 'attributes' && record.target instanceof Element) translateAttribute(record.target, record.attributeName ?? '');
      record.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && !excluded(node as Text)) {
          if (!originalText.has(node as Text)) originalText.set(node as Text, node.nodeValue ?? '');
          translateNode(node as Text);
        } else if (node instanceof Element) scan(node);
      });
    }));
    observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['placeholder','aria-label','title','alt'] });
    return () => { observer.disconnect(); control.remove(); style.remove(); };
  }, []);
  return null;
}
