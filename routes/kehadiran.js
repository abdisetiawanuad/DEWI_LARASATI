const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRole } = require("../middleware/auth");
const Kehadiran = require("../models/Kehadiran");

// Input Kehadiran
router.post(
  "/kehadiran",
  authenticateToken,
  authorizeRole("guru"),
  async (req, res) => {
    const { siswaId, tanggal, status } = req.body;
    try {
      const newKehadiran = await Kehadiran.create({ siswaId, tanggal, status });
      res.status(201).json(newKehadiran);
    } catch (error) {
      res.status(500).json({ error: "Failed to input kehadiran" });
    }
  }
);

// Edit Kehadiran
router.put(
  "/kehadiran/:id",
  authenticateToken,
  authorizeRole("guru"),
  async (req, res) => {
    const { status } = req.body;
    try {
      const updatedKehadiran = await Kehadiran.update(
        { status },
        { where: { id: req.params.id } }
      );
      res.status(200).json(updatedKehadiran);
    } catch (error) {
      res.status(500).json({ error: "Failed to edit kehadiran" });
    }
  }
);

// Delete Kehadiran
router.delete(
  "/kehadiran/:id",
  authenticateToken,
  authorizeRole("guru"),
  async (req, res) => {
    try {
      await Kehadiran.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Kehadiran deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete kehadiran" });
    }
  }
);

// View Kehadiran
router.get("/kehadiran", authenticateToken, async (req, res) => {
  try {
    const kehadiran = await Kehadiran.findAll();
    res.status(200).json(kehadiran);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve kehadiran" });
  }
});

module.exports = router;
