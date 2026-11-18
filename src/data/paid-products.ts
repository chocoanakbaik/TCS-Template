import type { TemplateDefinition } from "./schema";

export type PaidProduct = {
  slug: string;
  productId: string;
  priceCents: number;
  template: Omit<TemplateDefinition, "sheets" | "sections">;
};

export const paidProducts: PaidProduct[] = [
  {
    "slug": "jadwal-shift-operasional-24-7",
    "productId": "pdt_0NsCEp2kjVS6VNWGK6oyu",
    "priceCents": 100,
    "template": {
      "id": "jadwal-shift-operasional-24-7",
      "name": "Jadwal Shift Operasional 24/7 & Kecukupan Personel",
      "category": "operasional",
      "categoryLabel": "Operasional",
      "symbol": "S24",
      "format": "xlsx",
      "quality": "baik",
      "description": "Susun cakupan shift pagi, sore, malam, kebutuhan personel minimum, jumlah petugas aktual, dan kekurangan tenaga per shift.",
      "tags": [
        "shift 24/7",
        "roster",
        "jadwal kerja",
        "staffing",
        "coverage"
      ],
      "questions": [
        {
          "id": "entityName",
          "label": "Nama perusahaan atau unit operasional",
          "type": "text",
          "required": true,
          "placeholder": "Nama fasilitas, gudang, atau unit kerja"
        },
        {
          "id": "ownerName",
          "label": "Penanggung jawab operasional",
          "type": "text",
          "required": false,
          "placeholder": "Nama PIC"
        },
        {
          "id": "period",
          "label": "Periode pengendalian",
          "type": "select",
          "required": true,
          "options": [
            "Mingguan",
            "Dua mingguan",
            "Bulanan"
          ]
        },
        {
          "id": "scope",
          "label": "Ruang lingkup operasional",
          "type": "select",
          "required": true,
          "options": [
            "Operasional 24 jam",
            "Gudang",
            "Pusat layanan",
            "Keamanan"
          ]
        },
        {
          "id": "notes",
          "label": "Catatan dan ketentuan khusus",
          "type": "textarea",
          "required": false,
          "placeholder": "Asumsi atau catatan operasional"
        }
      ]
    }
  },
  {
    "slug": "protokol-penanganan-keluhan-pelanggan",
    "productId": "pdt_0NsCEZOg9m0TpJXdiOy1G",
    "priceCents": 100,
    "template": {
      "id": "protokol-penanganan-keluhan-pelanggan",
      "name": "Protokol Penanganan Keluhan Pelanggan & Eskalasi SLA",
      "category": "operasional",
      "categoryLabel": "Operasional",
      "symbol": "KPL",
      "format": "md",
      "quality": "baik",
      "description": "Standarkan pencatatan keluhan, klasifikasi urgensi, batas respons, investigasi, solusi, konfirmasi pelanggan, dan penutupan kasus.",
      "tags": [
        "keluhan pelanggan",
        "complaint handling",
        "SLA",
        "eskalasi",
        "customer service"
      ],
      "questions": [
        {
          "id": "entityName",
          "label": "Nama perusahaan atau unit operasional",
          "type": "text",
          "required": true,
          "placeholder": "Nama fasilitas, gudang, atau unit kerja"
        },
        {
          "id": "ownerName",
          "label": "Penanggung jawab operasional",
          "type": "text",
          "required": false,
          "placeholder": "Nama PIC"
        },
        {
          "id": "period",
          "label": "Periode pengendalian",
          "type": "select",
          "required": true,
          "options": [
            "Berlaku mulai tanggal penetapan",
            "Review mingguan",
            "Review bulanan"
          ]
        },
        {
          "id": "scope",
          "label": "Ruang lingkup operasional",
          "type": "select",
          "required": true,
          "options": [
            "Toko atau outlet",
            "Layanan purnajual",
            "Pengiriman",
            "Layanan digital"
          ]
        },
        {
          "id": "notes",
          "label": "Catatan dan ketentuan khusus",
          "type": "textarea",
          "required": false,
          "placeholder": "Asumsi atau catatan operasional"
        }
      ]
    }
  },
  {
    "slug": "analisis-aging-piutang",
    "productId": "pdt_0NsCEKKD6QvPuTnU0RycD",
    "priceCents": 100,
    "template": {
      "id": "analisis-aging-piutang",
      "name": "Analisis Aging Piutang 0–30 / 31–60 / 61–90 / >90 Hari",
      "category": "bisnis",
      "categoryLabel": "Bisnis & keuangan",
      "symbol": "AGE",
      "format": "xlsx",
      "quality": "baik",
      "description": "Kelompokkan saldo piutang berdasarkan umur keterlambatan, nilai tiap bucket, dan indikator tagihan yang perlu diprioritaskan.",
      "tags": [
        "aging piutang",
        "piutang usaha",
        "penagihan",
        "kolektibilitas",
        "receivable aging"
      ],
      "questions": [
        {
          "id": "entityName",
          "label": "Nama perusahaan atau unit penjualan",
          "type": "text",
          "required": true,
          "placeholder": "Nama usaha atau instansi"
        },
        {
          "id": "ownerName",
          "label": "Manajer piutang",
          "type": "text",
          "required": false,
          "placeholder": "Nama penanggung jawab"
        },
        {
          "id": "period",
          "label": "Periode analisis",
          "type": "select",
          "required": true,
          "options": [
            "Tanggal laporan",
            "Mingguan",
            "Bulanan"
          ]
        },
        {
          "id": "scope",
          "label": "Ruang lingkup penggunaan",
          "type": "select",
          "required": true,
          "options": [
            "Seluruh pelanggan",
            "Pelanggan korporat",
            "Pelanggan grosir",
            "Pelanggan proyek"
          ]
        },
        {
          "id": "notes",
          "label": "Catatan dan asumsi tambahan",
          "type": "textarea",
          "required": false,
          "placeholder": "Tuliskan asumsi atau kebutuhan tambahan."
        }
      ]
    }
  },
  {
    "slug": "analisis-roi-pemasaran-per-kanal",
    "productId": "pdt_0NsCE6Ipmaus4CvossdWZ",
    "priceCents": 96,
    "template": {
      "id": "analisis-roi-pemasaran-per-kanal",
      "name": "Analisis CPL, CAC & ROAS per Kanal Pemasaran",
      "category": "bisnis",
      "categoryLabel": "Bisnis & keuangan",
      "symbol": "MKT",
      "format": "xlsx",
      "quality": "baik",
      "description": "Bandingkan biaya iklan, leads, pelanggan baru, pendapatan teratribusi, cost per lead, customer acquisition cost, dan ROAS.",
      "tags": [
        "marketing ROI",
        "CPL",
        "CAC",
        "ROAS",
        "iklan",
        "akuisisi pelanggan"
      ],
      "questions": [
        {
          "id": "entityName",
          "label": "Nama brand atau unit bisnis",
          "type": "text",
          "required": true,
          "placeholder": "Nama usaha atau instansi"
        },
        {
          "id": "ownerName",
          "label": "Manajer pemasaran",
          "type": "text",
          "required": false,
          "placeholder": "Nama penanggung jawab"
        },
        {
          "id": "period",
          "label": "Periode analisis",
          "type": "select",
          "required": true,
          "options": [
            "Mingguan",
            "Bulanan",
            "Per kampanye"
          ]
        },
        {
          "id": "scope",
          "label": "Ruang lingkup penggunaan",
          "type": "select",
          "required": true,
          "options": [
            "Meta Ads",
            "Google Ads",
            "TikTok Ads",
            "Marketplace atau afiliasi"
          ]
        },
        {
          "id": "notes",
          "label": "Catatan dan asumsi tambahan",
          "type": "textarea",
          "required": false,
          "placeholder": "Tuliskan asumsi atau kebutuhan tambahan."
        }
      ]
    }
  },
  {
    "slug": "kebijakan-kredit-penjualan",
    "productId": "pdt_0NsCDsAQYKj1essY8jlNo",
    "priceCents": 100,
    "template": {
      "id": "kebijakan-kredit-penjualan",
      "name": "Kebijakan Kredit Penjualan & Prosedur Penagihan",
      "category": "bisnis",
      "categoryLabel": "Bisnis & keuangan",
      "symbol": "KRD",
      "format": "md",
      "quality": "baik",
      "description": "Dokumen kerja untuk menetapkan syarat kredit pelanggan, batas otorisasi, bukti transaksi, dan tahapan penagihan yang konsisten.",
      "tags": [
        "kebijakan kredit",
        "piutang",
        "penagihan",
        "credit control",
        "SOP"
      ],
      "questions": [
        {
          "id": "entityName",
          "label": "Nama perusahaan atau unit usaha",
          "type": "text",
          "required": true,
          "placeholder": "Nama usaha atau instansi"
        },
        {
          "id": "ownerName",
          "label": "Pemilik kebijakan atau kepala keuangan",
          "type": "text",
          "required": false,
          "placeholder": "Nama penanggung jawab"
        },
        {
          "id": "period",
          "label": "Periode analisis",
          "type": "select",
          "required": true,
          "options": [
            "Berlaku mulai tanggal penetapan",
            "Peninjauan triwulanan",
            "Peninjauan tahunan"
          ]
        },
        {
          "id": "scope",
          "label": "Ruang lingkup penggunaan",
          "type": "select",
          "required": true,
          "options": [
            "Penjualan B2B",
            "Pelanggan grosir",
            "Penjualan proyek",
            "Pelanggan berulang"
          ]
        },
        {
          "id": "notes",
          "label": "Catatan dan asumsi tambahan",
          "type": "textarea",
          "required": false,
          "placeholder": "Tuliskan asumsi atau kebutuhan tambahan."
        }
      ]
    }
  },
  {
    "slug": "kalkulator-burn-rate-runway",
    "productId": "pdt_0NsCDeitomMWwaadsmKS7",
    "priceCents": 115,
    "template": {
      "id": "kalkulator-burn-rate-runway",
      "name": "Kalkulator Burn Rate & Cash Runway",
      "category": "bisnis",
      "categoryLabel": "Bisnis & keuangan",
      "symbol": "BRR",
      "format": "xlsx",
      "quality": "unggulan",
      "description": "Hitung net burn historis, rata-rata burn bulanan, estimasi runway kas, dan indikator jika sisa runway di bawah ambang tiga bulan.",
      "tags": [
        "burn rate",
        "runway",
        "cash runway",
        "startup finance",
        "cash burn"
      ],
      "questions": [
        {
          "id": "entityName",
          "label": "Nama startup atau perusahaan",
          "type": "text",
          "required": true,
          "placeholder": "Nama usaha atau instansi"
        },
        {
          "id": "ownerName",
          "label": "Founder atau finance lead",
          "type": "text",
          "required": false,
          "placeholder": "Nama penanggung jawab"
        },
        {
          "id": "period",
          "label": "Periode analisis",
          "type": "select",
          "required": true,
          "options": [
            "Tiga bulan terakhir",
            "Enam bulan terakhir",
            "Bulanan"
          ]
        },
        {
          "id": "scope",
          "label": "Ruang lingkup penggunaan",
          "type": "select",
          "required": true,
          "options": [
            "Operasional startup",
            "Pra-pendanaan",
            "Pasca-pendanaan",
            "Evaluasi efisiensi"
          ]
        },
        {
          "id": "notes",
          "label": "Catatan dan asumsi tambahan",
          "type": "textarea",
          "required": false,
          "placeholder": "Tuliskan asumsi atau kebutuhan tambahan."
        }
      ]
    }
  },
  {
    "slug": "kalkulator-bep-unit-rupiah",
    "productId": "pdt_0NsCDO0HeHP6KzEM3OLAj",
    "priceCents": 110,
    "template": {
      "id": "kalkulator-bep-unit-rupiah",
      "name": "Kalkulator Break-Even Point (BEP) Unit & Rupiah",
      "category": "bisnis",
      "categoryLabel": "Bisnis & keuangan",
      "symbol": "BEP",
      "format": "xlsx",
      "quality": "unggulan",
      "description": "Hitung margin kontribusi per unit, jumlah unit impas, omzet impas, margin of safety, dan indikator apakah target penjualan melewati BEP.",
      "tags": [
        "BEP",
        "break even point",
        "titik impas",
        "margin kontribusi",
        "margin of safety"
      ],
      "questions": [
        {
          "id": "entityName",
          "label": "Nama produk atau lini usaha",
          "type": "text",
          "required": true,
          "placeholder": "Nama usaha atau instansi"
        },
        {
          "id": "ownerName",
          "label": "Pemilik usaha atau analis",
          "type": "text",
          "required": false,
          "placeholder": "Nama penanggung jawab"
        },
        {
          "id": "period",
          "label": "Periode analisis",
          "type": "select",
          "required": true,
          "options": [
            "Per produk",
            "Bulanan",
            "Per skenario"
          ]
        },
        {
          "id": "scope",
          "label": "Ruang lingkup penggunaan",
          "type": "select",
          "required": true,
          "options": [
            "Satu produk",
            "Paket produk",
            "Lini layanan",
            "Keseluruhan usaha"
          ]
        },
        {
          "id": "notes",
          "label": "Catatan dan asumsi tambahan",
          "type": "textarea",
          "required": false,
          "placeholder": "Tuliskan asumsi atau kebutuhan tambahan."
        }
      ]
    }
  }
] as PaidProduct[];
