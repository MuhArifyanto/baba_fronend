# Buku Tamu Digital

Sistem Informasi Buku Tamu Digital ini adalah aplikasi berbasis web yang dirancang untuk mengelola data kunjungan tamu secara digital, aman, dan efisien. Sistem ini memisahkan hak akses antara tiga pengguna utama: **Tamu (User)**, **Admin**, dan **Teknisi (Pegawai/Tuan Rumah)**.

---

## 1. Hak Akses & Cara Login

Sistem ini memiliki beberapa portal login yang dibedakan berdasarkan jenis pengguna:

### A. Pengguna: Tamu (User)
Tamu adalah pengguna umum yang ingin melakukan kunjungan, membuat janji temu, atau melihat riwayat kunjungan mereka.

* **URL Login**: `/masuk/` (atau klik tombol **Masuk** di halaman utama)
* **Cara Login**:
  1. Buka halaman utama aplikasi.
  2. Pilih menu **Masuk** atau **Login**.
  3. Masukkan **Email / Username** dan **Password** yang telah didaftarkan.
  4. Tersedia juga opsi login cepat menggunakan **Google SSO** (Single Sign-On).
* **Contoh Akun Default** (jika ada data testing):
  * **Username**: `user`
  * **Password**: `user123` (atau sesuai password yang Anda daftarkan)
  *(Catatan: Anda dapat melakukan pendaftaran baru melalui menu `/daftar/` apabila belum memiliki akun)*

### B. Pengguna: Admin
Admin adalah pengelola sistem yang memiliki akses penuh ke dasbor statistik, manajemen kalender, verifikasi kunjungan, pengaturan instansi, dan manajemen akun pengguna.

* **URL Login**: `/admin-portal/login/`
* **Cara Login**:
  1. Arahkan browser Anda ke alamat `/admin-portal/login/`.
  2. Masukkan kredensial administrator.
* **Contoh Akun Default**:
  * **Username**: `admin`
  * **Password**: `admin123` 

### C. Pengguna: Teknisi (Pegawai / Tuan Rumah)
Teknisi atau Pegawai bertugas untuk menyetujui, menolak, atau menerima kunjungan yang ditujukan ke departemen/bidang mereka, serta membalas pesan chat dari tamu. Pegawai biasanya masuk melalui portal manajemen/admin dengan hak akses terbatas.

* **URL Login**: `/admin-portal/login/` (Menggunakan portal manajemen yang sama dengan Admin namun dengan peran/akses spesifik).
* **Cara Login**:
  1. Akses halaman `/admin-portal/login/`.
  2. Masukkan username/email dan password Pegawai.
* **Contoh Akun Default**:
  * **Username**: `teknisi`
  * **Password**: `teknisi123`
  *(Catatan: Akun pegawai dapat dibuat dan dikelola oleh Admin melalui menu Manajemen Pengguna di Admin Portal)*

---

## 2. Sistem Kerja (Workflow) Kunjungan

Bagaimana sistem ini berjalan dari awal hingga selesai? Berikut adalah alur kerjanya:

1. **Registrasi / Login Tamu**
   Tamu baru wajib mendaftar terlebih dahulu di `/daftar/` (termasuk melewati verifikasi Captcha) atau login menggunakan akun Google. Jika sudah punya akun, tamu cukup login.
2. **Pengajuan Kunjungan (Booking)**
   * Setelah masuk ke Dasbor Tamu, tamu memilih menu **Buat Kunjungan Baru**.
   * Tamu memilih **Tanggal**, **Tujuan (Departemen/Pegawai/Teknisi)**, dan mengisi **Tujuan Kunjungan**.
   * Sistem akan mengecek kuota harian pada kalender (termasuk mengecek apakah hari libur atau kuota sudah penuh).
3. **Verifikasi Kunjungan oleh Admin / Teknisi**
   * Kunjungan yang dibuat akan berstatus `Pending`.
   * Admin atau Teknisi yang bersangkutan akan menerima notifikasi.
   * Melalui Admin Portal, status kunjungan dapat diubah menjadi `In Progress` (Disetujui/Sedang Berjalan), `Completed` (Selesai), atau `Cancelled` (Ditolak/Batal).
4. **Cetak Kartu Kunjungan**
   Setelah disetujui, tamu dapat mengunduh atau mencetak Kartu Kunjungan (PDF/Cetak langsung) sebagai tanda bukti (ID Card) kunjungan.
5. **Fitur Chat Real-time**
   Tamu dapat berkomunikasi secara langsung dengan Admin/Teknisi melalui fitur chat bawaan aplikasi sebelum atau selama masa kunjungan.
6. **Audit & Laporan**
   Admin dapat melihat semua log riwayat di menu Audit Log, mencetak rekapitulasi data kunjungan per bulan/tahun, serta mengunduh laporan dalam format Excel atau PDF.

---

## 3. Menjalankan Frontend secara Lokal

Karena ini adalah repositori Frontend berbasis Vite dan React, berikut cara menjalankannya:

1. Install dependensi:
   ```bash
   npm install
   ```
2. Jalankan development server:
   ```bash
   npm run dev
   ```
3. Build untuk production:
   ```bash
   npm run build
   ```
