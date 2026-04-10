const express = require("express");
const router = express.Router();

const OurWork = require("../models/ourWork");

// CREATE
router.post("/", async (req, res) => {
  const work = new OurWork(req.body);
  await work.save();
  res.json(work);
});

// GET
router.get("/", async (req, res) => {
  const data = await OurWork.find();
  res.json(data);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await OurWork.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// UPDATE STATUS
// UPDATE WORK (general)
router.put("/:id", async (req, res) => {
  try {
    const work = await OurWork.findByIdAndUpdate(
      req.params.id,
      req.body,       // updated fields
      { new: true }   // return the updated document
    );
    if (!work) return res.status(404).json({ message: "Work not found" });

    res.json({ message: "Work updated", work });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating work" });
  }
});

module.exports = router;