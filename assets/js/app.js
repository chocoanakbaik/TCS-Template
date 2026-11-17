(() => {
  "use strict";

  const templates = [
    {
      id: "business-management", name: "Business Management", category: "business", categoryLabel: "Bisnis & keuangan", symbol: "BM", format: "XLSX",
      description: "Kelola gambaran usaha, aktivitas operasional, pemasukan, dan pengeluaran dalam satu struktur.",
      tags: ["bisnis", "usaha", "keuangan", "operasional", "laporan", "umkm"],
      purposes: ["Memantau kondisi usaha secara menyeluruh", "Mengelola pemasukan dan pengeluaran", "Menyusun laporan usaha berkala", "Membantu pengambilan keputusan operasional", "Lainnya"],
      questions: [
        { id: "business_type", label: "Jenis usaha atau organisasi Anda?", options: ["Perdagangan / retail", "Kuliner / makanan dan minuman", "Jasa profesional", "Produksi / manufaktur", "Kreatif / digital", "Lainnya"] },
        { id: "business_scale", label: "Seberapa besar aktivitas yang akan dicatat?", options: ["Usaha mandiri", "Tim kecil (2–5 orang)", "Tim menengah (6–20 orang)", "Lebih dari 20 orang"] },
        { id: "business_reports", label: "Ringkasan apa yang paling dibutuhkan?", type: "multi", options: ["Arus kas", "Laba dan rugi", "Penjualan", "Biaya operasional", "Ringkasan bulanan"] }
      ],
      related: ["financial-tracker", "sales-tracker"]
    },
    {
      id: "financial-tracker", name: "Financial Tracker", category: "business", categoryLabel: "Bisnis & keuangan", symbol: "FT", format: "XLSX",
      description: "Catat arus kas, transaksi, biaya, dan ringkasan keuangan dengan format yang teratur.",
      tags: ["keuangan", "finance", "arus kas", "transaksi", "pengeluaran", "pemasukan"],
      purposes: ["Mencatat pemasukan dan pengeluaran", "Memantau arus kas", "Menyusun laporan keuangan", "Mengelola biaya operasional", "Lainnya"],
      questions: [
        { id: "tracking_period", label: "Seberapa sering pencatatan dilakukan?", options: ["Harian", "Mingguan", "Bulanan", "Tidak tetap"] },
        { id: "currency", label: "Mata uang yang digunakan?", options: ["Rupiah (IDR)", "US Dollar (USD)", "Mata uang lain", "Lebih dari satu mata uang"] },
        { id: "report_period", label: "Periode ringkasan yang dibutuhkan?", options: ["Mingguan", "Bulanan", "Triwulanan", "Tahunan", "Semua periode"] }
      ],
      related: ["business-management", "personal-budget"]
    },
    {
      id: "personal-budget", name: "Personal Budget", category: "business", categoryLabel: "Keuangan pribadi", symbol: "PB", format: "XLSX",
      description: "Atur anggaran pribadi, pengeluaran rutin, target tabungan, dan evaluasi keuangan.",
      tags: ["pribadi", "budget", "anggaran", "tabungan", "keuangan", "pengeluaran"],
      purposes: ["Mengendalikan pengeluaran bulanan", "Mencapai target tabungan", "Mencatat transaksi pribadi", "Mengelola beberapa sumber pemasukan", "Lainnya"],
      questions: [
        { id: "budget_scope", label: "Anggaran ini digunakan untuk siapa?", options: ["Individu", "Pasangan", "Keluarga", "Lainnya"] },
        { id: "income_type", label: "Bagaimana pola pemasukan Anda?", options: ["Tetap setiap bulan", "Tidak tetap / freelance", "Lebih dari satu sumber", "Belum memiliki pemasukan rutin"] },
        { id: "budget_detail", label: "Komponen apa yang ingin dipantau?", type: "multi", options: ["Kebutuhan pokok", "Tagihan rutin", "Tabungan", "Dana darurat", "Hiburan", "Utang dan cicilan"] }
      ],
      related: ["financial-tracker", "daily-planner"]
    },
    {
      id: "inventory-management", name: "Inventory Management", category: "operations", categoryLabel: "Operasional", symbol: "IM", format: "XLSX",
      description: "Pantau stok barang, mutasi persediaan, pemasok, dan batas minimum stok.",
      tags: ["inventaris", "stok", "barang", "gudang", "persediaan", "retail"],
      purposes: ["Mencatat stok masuk dan keluar", "Memantau persediaan barang", "Mengelola beberapa lokasi penyimpanan", "Mengetahui stok minimum", "Lainnya"],
      questions: [
        { id: "inventory_type", label: "Jenis barang yang dikelola?", options: ["Produk siap jual", "Bahan baku", "Peralatan / aset", "Produk digital", "Campuran beberapa jenis"] },
        { id: "inventory_scale", label: "Perkiraan jumlah item?", options: ["Di bawah 50 item", "50–200 item", "201–1.000 item", "Lebih dari 1.000 item"] },
        { id: "inventory_location", label: "Berapa lokasi stok yang dikelola?", options: ["Satu lokasi", "2–5 lokasi", "Lebih dari 5 lokasi"] }
      ],
      related: ["sales-tracker", "business-management"]
    },
    {
      id: "sales-tracker", name: "Sales Tracker", category: "operations", categoryLabel: "Operasional", symbol: "ST", format: "XLSX",
      description: "Rekam transaksi penjualan, produk terjual, omzet, dan ringkasan performa.",
      tags: ["penjualan", "sales", "transaksi", "omzet", "kasir", "retail"],
      purposes: ["Mencatat transaksi penjualan", "Memantau omzet dan target", "Membandingkan performa produk", "Membuat ringkasan penjualan", "Lainnya"],
      questions: [
        { id: "sales_channel", label: "Melalui kanal apa penjualan dilakukan?", type: "multi", options: ["Toko fisik", "Marketplace", "Media sosial", "Website sendiri", "Penjualan langsung"] },
        { id: "sales_volume", label: "Berapa transaksi yang dicatat?", options: ["Di bawah 20 per hari", "20–100 per hari", "101–500 per hari", "Lebih dari 500 per hari"] },
        { id: "sales_summary", label: "Ringkasan yang paling dibutuhkan?", options: ["Harian", "Mingguan", "Bulanan", "Per produk", "Semua ringkasan"] }
      ],
      related: ["inventory-management", "business-management"]
    },
    {
      id: "daily-planner", name: "Daily Planner", category: "productivity", categoryLabel: "Produktivitas", symbol: "DP", format: "XLSX / PDF",
      description: "Susun agenda, prioritas, daftar tugas, dan evaluasi aktivitas harian.",
      tags: ["planner", "harian", "agenda", "produktivitas", "tugas", "jadwal"],
      purposes: ["Mengatur agenda harian", "Mengelola prioritas tugas", "Membangun rutinitas", "Mengevaluasi produktivitas", "Lainnya"],
      questions: [
        { id: "planner_style", label: "Bagaimana pola aktivitas Anda?", options: ["Jadwal terstruktur per jam", "Daftar tugas fleksibel", "Campuran jadwal dan tugas", "Rutinitas berulang"] },
        { id: "planner_period", label: "Periode perencanaan?", options: ["Harian", "Harian dan mingguan", "Bulanan"] },
        { id: "planner_focus", label: "Fokus utama yang ingin diatur?", options: ["Pekerjaan", "Belajar", "Kehidupan pribadi", "Campuran semuanya"] }
      ],
      related: ["project-tracker", "study-planner"]
    },
    {
      id: "study-planner", name: "Study Planner", category: "education", categoryLabel: "Pendidikan", symbol: "SP", format: "XLSX / PDF",
      description: "Atur jadwal belajar, materi, target akademik, dan pemantauan progres.",
      tags: ["pendidikan", "belajar", "siswa", "mahasiswa", "akademik", "jadwal"],
      purposes: ["Menyusun jadwal belajar", "Mempersiapkan ujian", "Memantau tugas dan tenggat", "Mencatat progres materi", "Lainnya"],
      questions: [
        { id: "education_level", label: "Untuk jenjang pendidikan apa?", options: ["Sekolah dasar / menengah", "SMA / SMK", "Perguruan tinggi", "Belajar mandiri / kursus", "Lainnya"] },
        { id: "study_subjects", label: "Berapa mata pelajaran atau topik?", options: ["1–3 topik", "4–6 topik", "7–10 topik", "Lebih dari 10 topik"] },
        { id: "study_period", label: "Periode perencanaan?", options: ["Mingguan", "Bulanan", "Per semester", "Menjelang ujian"] }
      ],
      related: ["daily-planner", "project-tracker"]
    },
    {
      id: "employee-management", name: "Employee Management", category: "people", categoryLabel: "SDM", symbol: "EM", format: "XLSX",
      description: "Susun data karyawan, kehadiran, pembagian peran, dan administrasi tim.",
      tags: ["sdm", "hr", "karyawan", "pegawai", "kehadiran", "tim"],
      purposes: ["Mengelola data karyawan", "Mencatat kehadiran", "Menyusun jadwal kerja", "Memantau pembagian peran", "Lainnya"],
      questions: [
        { id: "employee_count", label: "Berapa jumlah anggota tim?", options: ["1–5 orang", "6–20 orang", "21–50 orang", "Lebih dari 50 orang"] },
        { id: "employee_type", label: "Bagaimana status anggota tim?", options: ["Tetap", "Kontrak", "Paruh waktu / freelance", "Campuran"] },
        { id: "employee_features", label: "Informasi apa yang dibutuhkan?", type: "multi", options: ["Data dasar karyawan", "Kehadiran", "Jadwal kerja", "Cuti dan izin", "Pembagian tugas"] }
      ],
      related: ["project-tracker", "business-management"]
    },
    {
      id: "project-tracker", name: "Project Tracker", category: "projects", categoryLabel: "Manajemen proyek", symbol: "PT", format: "XLSX",
      description: "Pantau daftar pekerjaan, penanggung jawab, tenggat, prioritas, dan progres proyek.",
      tags: ["proyek", "project", "task", "timeline", "progress", "pekerjaan"],
      purposes: ["Memantau progres proyek", "Membagi tugas dalam tim", "Mengelola tenggat dan prioritas", "Mencatat beberapa proyek sekaligus", "Lainnya"],
      questions: [
        { id: "project_count", label: "Berapa proyek yang dikelola?", options: ["Satu proyek", "2–5 proyek", "6–10 proyek", "Lebih dari 10 proyek"] },
        { id: "project_team", label: "Siapa yang akan menggunakan tracker?", options: ["Individu", "Tim kecil (2–5 orang)", "Tim (6–15 orang)", "Lebih dari 15 orang"] },
        { id: "project_detail", label: "Komponen yang paling dibutuhkan?", type: "multi", options: ["Status tugas", "Tenggat waktu", "Prioritas", "Penanggung jawab", "Timeline", "Ringkasan progres"] }
      ],
      related: ["daily-planner", "employee-management"]
    },
    {
      id: "content-planner", name: "Content Planner", category: "content", categoryLabel: "Konten & media sosial", symbol: "CP", format: "XLSX",
      description: "Rencanakan kalender konten, kanal publikasi, ide, dan jadwal produksi.",
      tags: ["konten", "media sosial", "content", "kalender", "marketing", "publikasi"],
      purposes: ["Menyusun kalender konten", "Mengatur jadwal publikasi", "Mengelola ide konten", "Memantau performa konten", "Lainnya"],
      questions: [
        { id: "content_platform", label: "Platform yang digunakan?", type: "multi", options: ["Instagram", "TikTok", "YouTube", "Facebook", "LinkedIn", "Website / blog", "Lainnya"] },
        { id: "content_frequency", label: "Seberapa sering konten diterbitkan?", options: ["Setiap hari", "3–5 kali seminggu", "1–2 kali seminggu", "Tidak tetap"] },
        { id: "content_team", label: "Siapa yang mengelola konten?", options: ["Individu", "Tim 2–3 orang", "Tim 4 orang atau lebih", "Agensi / beberapa klien"] }
      ],
      related: ["daily-planner", "project-tracker"]
    },
    {
      id: "document-kit", name: "Business Document Kit", category: "documents", categoryLabel: "Dokumen bisnis", symbol: "DK", format: "DOCX / PDF",
      description: "Kumpulan kerangka dokumen usaha seperti invoice, penawaran, dan surat bisnis.",
      tags: ["dokumen", "invoice", "quotation", "surat", "bisnis", "administrasi"],
      purposes: ["Membuat invoice dan tagihan", "Menyusun penawaran harga", "Menyiapkan surat bisnis", "Merapikan administrasi usaha", "Lainnya"],
      questions: [
        { id: "document_type", label: "Dokumen apa yang paling dibutuhkan?", type: "multi", options: ["Invoice", "Kuitansi", "Penawaran harga", "Purchase order", "Surat resmi", "Laporan kegiatan"] },
        { id: "document_branding", label: "Apakah dokumen memakai identitas usaha?", options: ["Ya, sudah memiliki identitas", "Belum, perlu ruang identitas", "Tidak diperlukan"] },
        { id: "document_language", label: "Bahasa dokumen?", options: ["Bahasa Indonesia", "Bahasa Inggris", "Bilingual"] }
      ],
      related: ["business-management", "financial-tracker"]
    },
    {
      id: "developer-documentation", name: "Developer Documentation Kit", category: "developer", categoryLabel: "Developer tools", symbol: "DD", format: "MD",
      description: "Kerangka README, changelog, laporan bug, issue, dan dokumentasi proyek.",
      tags: ["developer", "github", "readme", "dokumentasi", "kode", "software"],
      purposes: ["Mendokumentasikan repository", "Mengelola laporan bug dan issue", "Mencatat perubahan versi", "Menyiapkan panduan kontribusi", "Lainnya"],
      questions: [
        { id: "developer_project", label: "Jenis proyek yang dikelola?", options: ["Website / aplikasi web", "Aplikasi desktop", "Aplikasi mobile", "Library / package", "Tool / automation", "Lainnya"] },
        { id: "developer_stack", label: "Format dokumentasi yang dibutuhkan?", type: "multi", options: ["README", "Changelog", "Bug report", "Issue template", "Pull request template", "Contribution guide"] },
        { id: "developer_audience", label: "Siapa pembaca utama dokumentasi?", options: ["Pengguna akhir", "Kontributor", "Developer internal", "Publik / open-source"] }
      ],
      related: ["project-tracker", "document-kit"]
    }
  ];

  const generalFields = [
    "Bisnis dan usaha",
    "Pekerjaan profesional",
    "Pendidikan",
    "Organisasi dan komunitas",
    "Kebutuhan pribadi",
    "Kreator dan media sosial",
    "Pengembangan digital",
    "Lainnya"
  ];

  const elements = {
    grid: document.getElementById("template-grid"),
    count: document.getElementById("visible-count"),
    search: document.getElementById("template-search"),
    filters: document.getElementById("category-filter"),
    empty: document.getElementById("empty-state"),
    reset: document.getElementById("reset-filter"),
    backdrop: document.getElementById("wizard-backdrop"),
    dialog: document.getElementById("wizard-dialog"),
    close: document.getElementById("close-wizard"),
    questionArea: document.getElementById("wizard-question-area"),
    title: document.getElementById("wizard-title"),
    description: document.getElementById("wizard-description"),
    templateLabel: document.getElementById("wizard-template-label"),
    stepLabel: document.getElementById("wizard-step-label"),
    progressCount: document.getElementById("wizard-progress-count"),
    progressBar: document.getElementById("wizard-progress-bar"),
    back: document.getElementById("wizard-back"),
    next: document.getElementById("wizard-next"),
    error: document.getElementById("form-error"),
    footer: document.getElementById("wizard-footer"),
    toast: document.getElementById("toast")
  };

  let activeCategory = "all";
  let activeTemplate = null;
  let questions = [];
  let answers = {};
  let currentStep = 0;
  let returnFocus = null;
  let toastTimer = null;
  let resultMode = false;

  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);

  function renderCards() {
    const query = elements.search.value.trim().toLocaleLowerCase("id");
    const filtered = templates.filter((item) => {
      const categoryMatches = activeCategory === "all" || item.category === activeCategory;
      const searchable = [item.name, item.categoryLabel, item.description, ...item.tags].join(" ").toLocaleLowerCase("id");
      return categoryMatches && (!query || searchable.includes(query));
    });

    elements.count.textContent = String(filtered.length).padStart(2, "0");
    elements.empty.hidden = filtered.length !== 0;
    elements.grid.hidden = filtered.length === 0;
    elements.grid.innerHTML = filtered.map((item, index) => `
      <article class="template-card" style="animation-delay:${Math.min(index * 45, 270)}ms">
        <div class="card-topline">
          <span class="card-category">${escapeHTML(item.categoryLabel)}</span>
          <span class="card-format">${escapeHTML(item.format)}</span>
        </div>
        <div class="card-symbol" aria-hidden="true">${escapeHTML(item.symbol)}</div>
        <h3>${escapeHTML(item.name)}</h3>
        <p>${escapeHTML(item.description)}</p>
        <div class="card-bottom">
          <span class="card-status"><i></i> DALAM PENYUSUNAN</span>
          <button class="card-action" type="button" data-template-id="${escapeHTML(item.id)}" aria-label="Sesuaikan kebutuhan untuk ${escapeHTML(item.name)}">Sesuaikan kebutuhan <span aria-hidden="true">→</span></button>
        </div>
      </article>
    `).join("");
  }

  function buildQuestions(template) {
    return [
      {
        id: "field",
        label: "Template ini akan digunakan di bidang apa?",
        options: generalFields,
        required: true,
        hint: "Pilih bidang yang paling menggambarkan konteks penggunaan Anda."
      },
      {
        id: "purpose",
        label: "Apa keperluan utama Anda menggunakan template ini?",
        options: template.purposes,
        required: true,
        hint: "Pilih tujuan yang paling dekat. Pilih “Lainnya” untuk menulis kebutuhan sendiri."
      },
      ...template.questions.map((question) => ({ ...question, required: false }))
    ];
  }

  function openWizard(templateId, trigger) {
    activeTemplate = templates.find((item) => item.id === templateId);
    if (!activeTemplate) return;
    questions = buildQuestions(activeTemplate);
    answers = {};
    currentStep = 0;
    resultMode = false;
    returnFocus = trigger || document.activeElement;
    elements.backdrop.hidden = false;
    document.body.classList.add("modal-open");
    renderWizardStep();
    window.setTimeout(() => elements.dialog.focus(), 20);
  }

  function closeWizard() {
    elements.backdrop.hidden = true;
    document.body.classList.remove("modal-open");
    activeTemplate = null;
    resultMode = false;
    if (returnFocus && typeof returnFocus.focus === "function") returnFocus.focus();
  }

  function getSelectedValues(question) {
    const value = answers[question.id];
    if (question.type === "multi") return Array.isArray(value) ? value : [];
    return value ? [value] : [];
  }

  function customValue(question) {
    return answers[`${question.id}__custom`] || "";
  }

  function renderWizardStep() {
    const question = questions[currentStep];
    const total = questions.length;
    elements.templateLabel.textContent = `${activeTemplate.name} / ${activeTemplate.format}`;
    elements.title.textContent = currentStep === 0
      ? "Kenali konteks penggunaannya."
      : currentStep === 1
        ? "Tentukan hasil yang dibutuhkan."
        : "Rinci preferensi penggunaan.";
    elements.description.textContent = question.hint || "Pilih jawaban yang paling sesuai dengan kebutuhan Anda.";
    elements.stepLabel.textContent = `PERTANYAAN ${String(currentStep + 1).padStart(2, "0")}`;
    elements.progressCount.textContent = `${String(currentStep + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    elements.progressBar.style.width = `${((currentStep + 1) / total) * 100}%`;
    elements.back.disabled = currentStep === 0;
    elements.back.textContent = "Kembali";
    elements.next.removeAttribute("data-finish");
    elements.next.textContent = currentStep === total - 1 ? "Lihat rekomendasi →" : "Lanjutkan →";
    elements.error.hidden = true;

    const selected = getSelectedValues(question);
    const inputType = question.type === "multi" ? "checkbox" : "radio";
    const name = `answer-${question.id}`;
    const optionsMarkup = question.options.map((option, index) => {
      const checked = selected.includes(option);
      return `<label class="question-option">
        <input type="${inputType}" name="${name}" value="${escapeHTML(option)}" ${checked ? "checked" : ""}>
        <span>${escapeHTML(option)}</span>
      </label>`;
    }).join("");
    const hasOther = selected.includes("Lainnya");
    elements.questionArea.innerHTML = `
      <span class="question-label" id="current-question-label">${escapeHTML(question.label)}${question.required ? ' <span aria-hidden="true">*</span>' : ""}</span>
      <div class="question-options" role="group" aria-labelledby="current-question-label">${optionsMarkup}</div>
      <input class="custom-answer" id="custom-answer" type="text" maxlength="160" placeholder="Tuliskan bidang atau kebutuhan lainnya..." value="${escapeHTML(customValue(question))}" ${hasOther ? "" : "hidden"} aria-label="Keterangan lainnya">
      ${question.required ? '<p class="question-hint">Pertanyaan bertanda * wajib diisi.</p>' : '<p class="question-hint">Pertanyaan tambahan bersifat opsional. Anda dapat melewatinya.</p>'}
    `;

    elements.questionArea.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach((input) => {
      input.addEventListener("change", () => {
        const current = questions[currentStep];
        if (current.type === "multi") {
          const values = [...elements.questionArea.querySelectorAll('input[type="checkbox"]:checked')].map((node) => node.value);
          answers[current.id] = values;
        } else {
          answers[current.id] = input.value;
        }
        const otherSelected = getSelectedValues(current).includes("Lainnya");
        const custom = document.getElementById("custom-answer");
        if (custom) {
          custom.hidden = !otherSelected;
          if (otherSelected) custom.focus();
        }
        elements.error.hidden = true;
      });
    });
    const customInput = document.getElementById("custom-answer");
    customInput.addEventListener("input", () => {
      answers[`${question.id}__custom`] = customInput.value.trim();
      elements.error.hidden = true;
    });
  }

  function answerFor(question) {
    const selected = getSelectedValues(question);
    return selected.map((value) => {
      if (value === "Lainnya" && customValue(question).trim()) return `Lainnya: ${customValue(question).trim()}`;
      return value;
    });
  }

  function validateCurrentStep() {
    const question = questions[currentStep];
    const values = getSelectedValues(question);
    if (question.required && values.length === 0) {
      elements.error.textContent = "Silakan pilih salah satu jawaban untuk melanjutkan.";
      elements.error.hidden = false;
      return false;
    }
    if (values.includes("Lainnya") && !customValue(question).trim()) {
      elements.error.textContent = "Tuliskan keterangan untuk pilihan lainnya.";
      elements.error.hidden = false;
      document.getElementById("custom-answer")?.focus();
      return false;
    }
    return true;
  }

  function nextStep() {
    if (!validateCurrentStep()) return;
    if (currentStep < questions.length - 1) {
      currentStep += 1;
      renderWizardStep();
      elements.dialog.scrollTop = 0;
      return;
    }
    renderResult();
  }

  function previousStep() {
    if (resultMode) {
      resultMode = false;
      currentStep = questions.length - 1;
      renderWizardStep();
      return;
    }
    if (currentStep > 0) {
      currentStep -= 1;
      renderWizardStep();
    }
  }

  function formatAnswer(question) {
    const values = answerFor(question);
    return values.length ? values.join(", ") : "Tidak ditentukan";
  }

  function makeSpecificationText() {
    const lines = [
      "TCS TEMPLATE — RINGKASAN SPESIFIKASI",
      "====================================",
      `Template: ${activeTemplate.name}`,
      `Kategori: ${activeTemplate.categoryLabel}`,
      `Format rencana: ${activeTemplate.format}`,
      "",
      "KEBUTUHAN PENGGUNA",
      "------------------",
      ...questions.map((question) => `${question.label}\n${formatAnswer(question)}`),
      "",
      "CATATAN",
      "-------",
      "Dokumen ini merupakan ringkasan kebutuhan, bukan file template final.",
      "File template akan tersedia setelah proses penyusunan dan pemeriksaan kualitas TCS.",
      "",
      "Dikembangkan oleh The Choco Studios"
    ];
    return lines.join("\n");
  }

  function renderResult() {
    resultMode = true;
    const summary = questions.map((question) => `
      <div class="result-item">
        <small>${escapeHTML(question.label)}</small>
        <strong>${escapeHTML(formatAnswer(question))}</strong>
      </div>
    `).join("");
    const related = activeTemplate.related
      .map((id) => templates.find((item) => item.id === id))
      .filter(Boolean);
    const relatedText = related.length
      ? related.map((item) => `${item.name} (${item.format})`).join(" · ")
      : "Belum ada template pendamping.";
    elements.stepLabel.textContent = "HASIL SPESIFIKASI";
    elements.progressCount.textContent = "SELESAI";
    elements.progressBar.style.width = "100%";
    elements.templateLabel.textContent = `${activeTemplate.name} / RINGKASAN KEBUTUHAN`;
    elements.title.textContent = "Spesifikasi Anda sudah tersusun.";
    elements.description.textContent = "Berikut ringkasan kebutuhan berdasarkan jawaban yang Anda berikan. Periksa kembali sebelum menggunakannya sebagai acuan.";
    elements.questionArea.innerHTML = `
      <div class="result-summary">${summary}</div>
      <div class="result-recommendation">
        <p class="eyebrow">REKOMENDASI UTAMA</p>
        <h3>${escapeHTML(activeTemplate.name)}</h3>
        <p>${escapeHTML(activeTemplate.description)} Format rencana: ${escapeHTML(activeTemplate.format)}.</p>
      </div>
      <p class="result-related"><strong>Template terkait:</strong> ${escapeHTML(relatedText)}</p>
      <div class="result-note"><span aria-hidden="true">ⓘ</span><span>Ini adalah dokumen spesifikasi kebutuhan, bukan file template yang siap diunduh. File template akan dirilis setelah disiapkan dan diperiksa oleh TCS.</span></div>
      <div class="result-actions">
        <button class="button button-primary" type="button" id="copy-spec">Salin spesifikasi</button>
        <button class="button button-secondary" type="button" id="download-spec">Unduh spesifikasi .txt</button>
      </div>
    `;
    elements.back.disabled = false;
    elements.back.textContent = "Ubah jawaban";
    elements.next.textContent = "Selesai";
    elements.next.setAttribute("data-finish", "true");
    document.getElementById("copy-spec").addEventListener("click", copySpecification);
    document.getElementById("download-spec").addEventListener("click", downloadSpecification);
    elements.dialog.scrollTop = 0;
  }

  function copySpecification() {
    const text = makeSpecificationText();
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => showToast("Spesifikasi berhasil disalin.")).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    let copied = false;
    try { copied = document.execCommand("copy"); } catch (_) { copied = false; }
    textarea.remove();
    showToast(copied ? "Spesifikasi berhasil disalin." : "Penyalinan otomatis tidak tersedia di browser ini.");
  }

  function downloadSpecification() {
    const blob = new Blob(["\uFEFF", makeSpecificationText()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `TCS-Template-Spesifikasi-${activeTemplate.id}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("Dokumen spesifikasi berhasil dibuat.");
  }

  function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 2600);
  }

  elements.grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-template-id]");
    if (button) openWizard(button.dataset.templateId, button);
  });

  elements.search.addEventListener("input", renderCards);
  elements.filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    elements.filters.querySelectorAll("[data-category]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    renderCards();
  });

  elements.reset.addEventListener("click", () => {
    activeCategory = "all";
    elements.search.value = "";
    elements.filters.querySelectorAll("[data-category]").forEach((button) => {
      const active = button.dataset.category === "all";
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    renderCards();
  });

  elements.close.addEventListener("click", closeWizard);
  elements.back.addEventListener("click", previousStep);
  elements.next.addEventListener("click", () => {
    if (resultMode) {
      closeWizard();
      return;
    }
    nextStep();
  });

  elements.backdrop.addEventListener("click", (event) => {
    if (event.target === elements.backdrop) closeWizard();
  });

  document.addEventListener("keydown", (event) => {
    if (!elements.backdrop.hidden && event.key === "Escape") {
      closeWizard();
      return;
    }
    if (!elements.backdrop.hidden && event.key === "Tab") {
      const focusable = [...elements.dialog.querySelectorAll('button:not(:disabled), input:not([hidden]), [href], [tabindex]:not([tabindex="-1"])')]
        .filter((node) => !node.hasAttribute("hidden") && node.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    if (event.key === "/" && elements.backdrop.hidden && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
      event.preventDefault();
      elements.search.focus();
    }
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("primary-navigation");
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    menuToggle.setAttribute("aria-label", expanded ? "Buka navigasi" : "Tutup navigasi");
    navigation.classList.toggle("is-open", !expanded);
  });
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Buka navigasi");
      navigation.classList.remove("is-open");
    });
  });

  const year = document.getElementById("current-year");
  year.textContent = String(new Date().getFullYear());

  renderCards();
})();