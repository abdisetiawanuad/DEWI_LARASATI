const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRole } = require("../middleware/auth");
const Nilai = require("../models/Nilai");

// Input Nilai
router.post("/nilai", authenticateToken, async (req, res) => {
  const { siswaId, nilai } = req.body;
  try {
    const newNilai = await Nilai.create({
      siswaId,
      guruId: req.user.userId,
      nilai,
    });
    res.status(201).json(newNilai);
  } catch (error) {
    res.status(500).json({ error: "Failed to input nilai" });
  }
});

// Edit Nilai
router.put(
  "/nilai/:id",
  authenticateToken,
  authorizeRole("guru"),
  async (req, res) => {
    const { nilai } = req.body;
    try {
      const [updated] = await Nilai.update(
        { nilai },
        { where: { id: req.params.id } }
      );

      if (updated) {
        const updatedNilai = await Nilai.findOne({
          where: { id: req.params.id },
        });
        res.status(200).json(updatedNilai);
      } else {
        res.status(404).json({ error: "Nilai not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to edit nilai" });
    }
  }
);

// Delete Nilai
router.delete(
  "/nilai/:id",
  authenticateToken,
  authorizeRole("guru"),
  async (req, res) => {
    try {
      await Nilai.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Nilai deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete nilai" });
    }
  }
);

// View Nilai
router.get("/nilai", authenticateToken, async (req, res) => {
  try {
    const nilai = await Nilai.findAll();
    res.status(200).json(nilai);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve nilai" });
  }
});

module.exports = router;
