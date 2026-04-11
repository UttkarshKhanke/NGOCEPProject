const express = require("express");
const router = express.Router();
const Dropoff = require("../models/Dropoff");

// POST /api/dropoff - create a new drop-off
router.post("/", async (req, res) => {
  try {
    const dropoff = new Dropoff(req.body); // use all fields sent from frontend
    await dropoff.save();
    res.status(201).json(dropoff);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create drop-off" });
  }
});

// GET /api/dropoff - optional, list all drop-offs
router.get("/", async (req, res) => {
  try {
    const dropoffs = await Dropoff.find().sort({ createdAt: -1 });
    res.json(dropoffs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch drop-offs" });
  }
});

// PUT /api/dropoff/:id
router.put("/:id", async (req, res) => {
  const dropoff = await Dropoff.findById(req.params.id);
  if (!dropoff) return res.status(404).json({ message: "Not found" });

  dropoff.status = req.body.status || dropoff.status;
  await dropoff.save();

  res.json({ dropoff });
});

module.exports = router;