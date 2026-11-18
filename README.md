# TCS Template

TCS Template adalah katalog perangkat kerja digital dari The Choco Studios. Koleksi ini berisi template gratis dan template premium yang dapat disesuaikan dengan kebutuhan pengguna.

## Fitur

- Katalog 225 template pada sembilan kategori.
- Pencarian dan filter kategori serta kualitas template.
- Formulir penyesuaian lima pertanyaan.
- Generator spreadsheet XLSX dengan rumus Excel aktif.
- Generator dokumen Markdown dan TXT.
- Tujuh template premium dengan checkout Dodo Payments.
- Guest checkout tanpa akun pembeli.
- Verifikasi pembayaran melalui webhook Dodo Payments.
- Riwayat transaksi dan moderasi ulasan pembeli melalui panel admin.
- Template premium disimpan pada backend dan hanya diberikan setelah pembayaran terverifikasi.

## Klasifikasi kualitas

Kualitas merupakan penilaian internal TCS terhadap kelengkapan struktur, cakupan penggunaan, contoh isi, dan otomatisasi template. Klasifikasi ini bukan tingkat kesulitan maupun rating pengguna.

- **Standar:** struktur inti untuk kebutuhan sederhana.
- **Baik:** isi lebih lengkap atau memiliki fungsi tambahan yang membantu penggunaan.
- **Unggulan:** struktur menyeluruh dan/atau otomatisasi yang lebih lengkap.

## Struktur utama

- `src/data/categories/` — data template gratis.
- `src/data/paid-products.ts` — metadata katalog produk premium tanpa isi template.
- `src/data/schema.ts` — tipe data katalog dan generator.
- `src/lib/template-generator.ts` — generator XLSX, Markdown, dan TXT.
- `src/app/api/` — checkout, verifikasi order, webhook, dan API panel admin.
- `src/app/admin/` — panel admin TCS Template.
- `src/app/pembelian/selesai/` — halaman verifikasi pembayaran dan unduhan.

## Menjalankan proyek

Gunakan Node.js 20.9 atau lebih baru.

```bash
npm install
npm run dev
npm run build
```

Deploy production menggunakan integrasi Git Vercel. Proyek menggunakan Next.js server runtime agar Route Handler untuk checkout dan webhook dapat berjalan.

## Environment variables

Atur variabel berikut pada environment Vercel:

- `DODO_PAYMENTS_API_KEY` — API key Dodo Payments.
- `DODO_PAYMENTS_WEBHOOK_KEY` — signing key endpoint webhook Dodo.
- `DODO_PAYMENTS_ENVIRONMENT` — `test_mode` atau `live_mode`.
- `TCS_TEMPLATE_DATA_URL` — URL Supabase Edge Function privat.
- `TCS_TEMPLATE_INTERNAL_TOKEN` — token komunikasi internal backend.
- `TCS_TEMPLATE_ADMIN_PASSWORD` — kata sandi panel admin.
- `TCS_TEMPLATE_SESSION_SECRET` — rahasia untuk menandatangani sesi admin.

Jangan masukkan nilai rahasia ke source code atau variabel `NEXT_PUBLIC_*`.

## Alur pembelian

1. Pembeli memilih template premium dan mengisi lima pertanyaan serta email.
2. Server membuat order dan Checkout Session Dodo Payments.
3. Dodo mengirim webhook ke `/api/webhooks/dodo`.
4. Server memverifikasi tanda tangan, mengambil detail pembayaran dari API Dodo, lalu mencocokkan produk, nilai, mata uang, dan order.
5. Halaman hasil pembelian menunggu status lunas pada database. Data template premium hanya diberikan setelah hak pembelian tervalidasi.
6. Pembeli dapat mengunduh file dan mengirim ulasan yang terikat ke order tersebut.

Status pada parameter redirect Dodo tidak dianggap sebagai bukti pembayaran. Webhook yang tervalidasi menjadi sumber perubahan status transaksi.

## Panel admin

Panel admin tersedia di `/admin`. Panel ini dilindungi kata sandi dan sesi cookie HTTP-only. Fitur panel mencakup ringkasan transaksi, daftar webhook Dodo, sinkronisasi endpoint dan event, serta moderasi ulasan pembeli.

## Privasi

Template gratis dibuat langsung di browser. Untuk template premium, email pembeli dan jawaban penyesuaian disimpan pada backend TCS untuk mengaitkan order, memverifikasi pembayaran, dan menyediakan hasil pembelian. Data transaksi dipisahkan menggunakan tabel khusus TCS Template.

## Menambahkan template gratis

Tambahkan objek pada berkas JSON kategori yang sesuai. Setiap template harus memiliki tepat lima pertanyaan serta salah satu struktur konten berikut:

- `sheets`: worksheet dengan `columns`, `rows`, `formulaCells`, dan `columnWidths`.
- `sections`: bagian Markdown dengan heading, body, dan/atau bullets.

Gunakan token `{{entityName}}`, `{{ownerName}}`, `{{period}}`, `{{scope}}`, dan `{{notes}}` untuk memasukkan jawaban formulir ke dalam file.

Dikembangkan oleh The Choco Studios (TCS).
