# TCS Template

**Koleksi template digital dari The Choco Studios.**

TCS Template adalah katalog dan penyesuai kebutuhan untuk template kerja lintas bidang. Pengunjung dapat memilih template, menjelaskan konteks penggunaan, lalu menyalin atau mengunduh ringkasan spesifikasi sebagai acuan penyusunan.

## Status proyek

Website katalog dan alur spesifikasi tersedia. File template aktual akan ditambahkan ke katalog setelah setiap paket selesai disusun dan diuji. Tombol pada katalog saat ini mengarahkan pengguna ke proses spesifikasi, bukan mengklaim bahwa file unduhan sudah tersedia.

## Fitur

- Katalog template lintas bidang dengan pencarian dan filter kategori.
- Formulir bertahap untuk setiap template.
- Pertanyaan umum yang selalu meminta bidang dan tujuan penggunaan.
- Pertanyaan tambahan yang disesuaikan dengan jenis template.
- Ringkasan kebutuhan yang dapat disalin atau diunduh sebagai TXT.
- Rekomendasi template pendamping.
- Tampilan responsif untuk desktop, tablet, dan ponsel.
- Aksesibilitas dasar, navigasi keyboard, dan dukungan reduced motion.
- Pemrosesan formulir di browser tanpa API, database, akun, analytics, atau pengiriman data ke server.

## Struktur

```text
TCS-Template/
├── index.html
├── 404.html
├── robots.txt
├── vercel.json
└── assets/
    ├── css/
    │   └── styles.css
    └── js/
        └── app.js
```

## Menjalankan secara lokal

Tidak ada proses build atau instalasi dependency.

1. Unduh atau clone repository.
2. Buka `index.html` melalui browser, atau jalankan static file server sederhana dari folder proyek.
3. Untuk menguji perilaku pencarian, filter, dan formulir pada browser, gunakan alamat localhost agar Clipboard API tersedia.

## Ketergantungan

Tidak ada library runtime pihak ketiga, API eksternal, atau layanan backend. Website menggunakan HTML, CSS, dan JavaScript browser standar. Font menggunakan system font stack.

## Privasi

Jawaban formulir diproses di browser. Tidak ada endpoint pengumpulan data, penyimpanan jawaban ke server, cookie, atau integrasi analytics pada implementasi ini. Ringkasan hanya dibuat saat pengguna memilih untuk menyalin atau mengunduhnya.

## Pengembangan

Saat menambahkan template:

1. Tambahkan definisi template pada array `templates` di `assets/js/app.js`.
2. Sediakan bidang, tujuan, format rencana, pertanyaan tambahan, dan template terkait.
3. Buat file template sebenarnya dan uji formula, validasi, kompatibilitas, serta petunjuk penggunaannya.
4. Ubah status katalog dari “Dalam penyusunan” setelah file final tersedia.
5. Jangan menampilkan tombol unduh untuk file yang belum dirilis.

## Penerbit

**The Choco Studios (TCS)**  
Independent template collection.
