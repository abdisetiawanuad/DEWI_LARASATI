// Mengimpor modul jsonwebtoken untuk menangani token JWT
const jwt = require("jsonwebtoken");
// Mengimpor konfigurasi lingkungan dari file .env
require("dotenv").config();

/**
 * Middleware untuk mengautentikasi token JWT.
 * Memeriksa apakah token ada di header 'Authorization', memverifikasi token,
 * dan menambahkan informasi pengguna ke objek request.
 */
const authenticateToken = (req, res, next) => {
  // Mendapatkan header 'Authorization' dari request
  const authHeader = req.headers["authorization"];
  // Memisahkan token dari header, jika ada
  const token = authHeader && authHeader.split(" ")[1];
  // Jika token tidak ada, kirim status 401 (Unauthorized)
  if (!token) return res.sendStatus(401);

  // Memverifikasi token menggunakan secret yang disimpan di .env
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // Jika terjadi error saat verifikasi, kirim status 403 (Forbidden)
    if (err) {
      return res.status(403).json({ msg: "Anda tidak bisa mengakses ini!" });
    }
    // Menambahkan informasi pengguna ke objek request
    req.user = user;
    // Melanjutkan ke middleware berikutnya
    next();
  });
};

/**
 * Middleware untuk mengautorisasi peran tertentu.
 * Memeriksa apakah peran pengguna sesuai dengan peran yang diizinkan.
 * @param {string} role - Peran yang diizinkan untuk mengakses route.
 */
const authorizeRole = (role) => {
  return (req, res, next) => {
    // Jika peran pengguna tidak sesuai, kirim status 403 (Forbidden)
    if (req.user.role !== role) {
      return res
        .status(403)
        .json({ msg: "Anda Tidak Punya HAK untuk Mengakses ini" });
    }
    // Melanjutkan ke middleware berikutnya
    next();
  };
};

// Mengekspor fungsi middleware authenticateToken dan authorizeRole
module.exports = { authenticateToken, authorizeRole };
