const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");

// GET top donors (calculated on the fly)
router.get("/", async (req, res) => {
  try {
    // Aggregate donations by phone, summing amount, only approved donations
    const topDonors = await Donation.aggregate([
      { $match: { status: "approved" } },
      {
        $group: {
          _id: "$phone",          // group by phone
          name: { $first: "$name" },
          totalAmount: { $sum: "$amount" }
        }
      },
      { $sort: { totalAmount: -1 } }, // highest donors first
      { $limit: 10 }                  // top 10 donors
    ]);

    res.json(topDonors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch top donors" });
  }
});

module.exports = router;