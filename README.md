# Mini Technical Test Fullstack

Aplikasi fullstack sederhana yang terdiri dari:
- **Frontend (React):** Menyajikan antarmuka pengguna.
- **Backend (NestJS):** API untuk mengelola data.
- **Database (PostgreSQL):** Menyimpan data todo.

## **Cara Menjalankan**
1. Pastikan **Docker** dan **Docker Compose** sudah terinstal.
2. Buat file `.env` di folder `apps/api` dengan format berikut:
   ```dotenv
   DB_CONNECTION=pgsql
   DB_HOST=postgres
   DB_PORT=5432
   DB_DATABASE=mini_technical_test_fullstack
   DB_USERNAME=postgres
   DB_PASSWORD=12345
   ```
3. Jalankan perintah berikut di root folder proyek:
   ```bash
   docker-compose up --build
   ```
4. Akses aplikasi:
   - **Frontend (Web):** `http://localhost:3000`
   - **Backend (API):** `http://localhost:3001`

## **Keputusan Teknis**
1. **Frontend menggunakan React dan Nginx:**
   - React digunakan untuk membangun antarmuka pengguna.
   - Nginx digunakan untuk menyajikan file statis hasil build React.
2. **Backend menggunakan NestJS:**
   - NestJS dipilih karena modularitasnya yang baik untuk membangun API.
   - Docker digunakan untuk menjalankan backend dengan Node.js runtime.
3. **Database menggunakan PostgreSQL:**
   - PostgreSQL dipilih karena mendukung relasi data yang kompleks.
   - Database dikelola menggunakan Docker untuk mempermudah setup.

## **Versi Node.js**
- Node.js versi `18.x` digunakan untuk membangun dan menjalankan aplikasi.