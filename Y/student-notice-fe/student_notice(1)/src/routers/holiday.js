const express = require("express");

const holidays = require("../models/holiday");
const router = new express.Router();

router.get("/getholiday", async (req, res) => {
  try {
    const holiday = await holidays.find({});
    res.send(holiday);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/holiday", async (req, res) => {
  const holiday = new holidays({
    ...req.body,
  });

  try {
    await holiday.save();
    res.status(201).send(holiday);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/holiday/:id", async (req, res) => {
  try {
    const holiday = await holidays.findByIdAndDelete(req.params.id);
    if (!holiday) {
      return res.status(404).send();
    }
    res.send(holiday);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;

