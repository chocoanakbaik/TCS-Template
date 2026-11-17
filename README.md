# TCS Template

Koleksi template digital gratis dari The Choco Studios. Website menggunakan Next.js App Router dan dirender statis saat build.

## Fitur

- Katalog statis dengan sembilan kategori.
- Pencarian dan filter kategori serta tingkat kesulitan.
- Alur penyesuaian tepat lima pertanyaan untuk setiap template.
- Generator spreadsheet XLSX dengan rumus Excel aktif.
- Generator dokumen Markdown dan TXT.
- Nama instansi atau proyek dimasukkan ke file hasil.
- Pembuatan file di browser menggunakan SheetJS dan FileSaver.
- Tidak menggunakan backend, API, database, Google Drive, atau akun pengguna.

## Struktur utama

- src/data/categories/ — sembilan berkas JSON kategori.
- src/data/index.ts — penggabungan seluruh data kategori.
- src/data/schema.ts — tipe data katalog dan generator.
- src/lib/template-generator.ts — generator XLSX, Markdown, dan TXT.
- src/components/catalog-client.tsx — katalog, filter, formulir lima langkah, dan modal unduhan.
- src/app/page.tsx — halaman katalog statis.
- src/app/globals.css — sistem desain responsif.

## Menjalankan proyek

Gunakan Node.js 20.9 atau lebih baru.

Instal dependensi: npm install
Mode pengembangan: npm run dev
Build static export: npm run build

Hasil static export berada di folder out. Vercel membangun dan menerbitkan proyek melalui integrasi Git.

## Menambahkan template

Tambahkan satu objek ke berkas JSON kategori yang sesuai. Setiap template wajib memiliki tepat lima pertanyaan dan salah satu struktur konten berikut:

- sheets: worksheet dengan columns, rows, formulaCells, dan columnWidths.
- sections: bagian Markdown dengan heading, body, dan/atau bullets.

Gunakan token {{entityName}}, {{ownerName}}, {{period}}, {{scope}}, dan {{notes}} untuk memasukkan jawaban formulir ke dalam file.

formulaCells memakai alamat sel Excel A1 dan formula tanpa tanda sama dengan. Generator menyimpan formula dan nilai cache; aplikasi spreadsheet menghitung ulang saat file dibuka.

## Privasi

Jawaban formulir diproses di browser. File disusun di memori browser lalu disimpan melalui dialog unduhan perangkat pengguna. Tidak ada permintaan ke server untuk membuat file.

Dikembangkan oleh The Choco Studios (TCS).
