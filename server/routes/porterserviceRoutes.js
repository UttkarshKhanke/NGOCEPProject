const express = require("express");
const router = express.Router();
const PorterService = require("../models/Porterservice");

// POST
router.post("/", async (req, res) => {
  try {
    const porter = new PorterService(req.body);
    await porter.save();
    res.status(201).json(porter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create porter request" });
  }
});

// GET
router.get("/", async (req, res) => {
  try {
    const data = await PorterService.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch data" });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    const item = await PorterService.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });

    item.status = req.body.status || item.status;
    await item.save();

    res.json({ item });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;