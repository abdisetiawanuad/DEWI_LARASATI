const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRole } = require("../middleware/auth");
const Jadwal = require("../models/Jadwal");

// Input Jadwal
router.post(
  "/jadwal",
  // Middleware untuk autentikasi token JWT
  authenticateToken,
  // Middleware untuk otorisasi peran admin
  authorizeRole("admin"),
  async (req, res) => {
    const { mataPelajaran, waktu } = req.body;
    try {
      // Membuat jadwal baru di database
      const newJadwal = await Jadwal.create({ mataPelajaran, waktu });
      // Mengirimkan respons dengan status 201 (Created) dan data jadwal baru
      res.status(201).json(newJadwal);
    } catch (error) {
      // Mengirimkan respons dengan status 500 (Internal Server Error) jika terjadi kesalahan
      res.status(500).json({ error: "Failed to input jadwal" });
    }
  }
);

// Edit Jadwal
router.put(
  "/jadwal/:id",
  // Middleware untuk autentikasi token JWT
  authenticateToken,
  // Middleware untuk otorisasi peran admin
  authorizeRole("admin"),
  async (req, res) => {
    const { mataPelajaran, waktu } = req.body;
    try {
      // Memperbarui jadwal berdasarkan ID
      const [updated] = await Jadwal.update(
        { mataPelajaran, waktu },
        { where: { id: req.params.id } }
      );

      if (updated) {
        // Mengambil jadwal yang diperbarui dan mengirimkan respons dengan status 200 (OK)
        const updatedJadwal = await Jadwal.findOne({
          where: { id: req.params.id },
        });
        res.status(200).json(updatedJadwal);
      } else {
        // Mengirimkan respons dengan status 404 (Not Found) jika jadwal tidak ditemukan
        res.status(404).json({ error: "Jadwal not found" });
      }
    } catch (error) {
      // Mengirimkan respons dengan status 500 (Internal Server Error) jika terjadi kesalahan
      res.status(500).json({ error: "Failed to edit jadwal" });
    }
  }
);

// Delete Jadwal
router.delete(
  "/jadwal/:id",
  // Middleware untuk autentikasi token JWT
  authenticateToken,
  // Middleware untuk otorisasi peran admin
  authorizeRole("admin"),
  async (req, res) => {
    try {
      // Menghapus jadwal berdasarkan ID
      await Jadwal.destroy({ where: { id: req.params.id } });
      // Mengirimkan respons dengan status 200 (OK) setelah berhasil dihapus
      res.status(200).json({ message: "Jadwal deleted successfully" });
    } catch (error) {
      // Mengirimkan respons dengan status 500 (Internal Server Error) jika terjadi kesalahan
      res.status(500).json({ error: "Failed to delete jadwal" });
    }
  }
);

// View Jadwal
router.get("/jadwal", authenticateToken, async (req, res) => {
  try {
    // Mengambil semua jadwal dari database
    const jadwal = await Jadwal.findAll();
    // Mengirimkan respons dengan status 200 (OK) dan data jadwal
    res.status(200).json(jadwal);
  } catch (error) {
    // Mengirimkan respons dengan status 500 (Internal Server Error) jika terjadi kesalahan
    res.status(500).json({ error: "Failed to retrieve jadwal" });
  }
});

module.exports = router;
