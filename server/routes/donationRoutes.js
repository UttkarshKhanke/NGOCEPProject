const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");

// CREATE
router.post("/", async (req, res) => {
  const donation = new Donation(req.body);
  await donation.save();
  res.json(donation);
});

// GET ALL
router.get("/", async (req, res) => {
  const data = await Donation.find();
  res.json(data);
});

router.put("/approve/:id", async (req, res) => {
  const donation = await Donation.findByIdAndUpdate(
    req.params.id,
    { status: "approved" },
    { new: true }
  );

  res.json(donation);
});

module.exports = router;