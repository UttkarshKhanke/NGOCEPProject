const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  const msg = new Contact(req.body);
  await msg.save();
  res.json(msg);
});

router.put("/:id", async (req, res) => {
  const { status } = req.body;
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json({ contact });
});

router.get("/", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

module.exports = router;