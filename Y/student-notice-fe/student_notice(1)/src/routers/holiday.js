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

// router.patch("/holidays/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["subject", "marks", "status"];
//   const isValidOperation = updates.every(update => {
//     return allowedUpdates.includes(update);
//   });

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid ipdates!" });
//   }
//   try {
//     const result = await results.findById(req.params.id);
//     updates.forEach(update => (result[update] = req.body[update]));
//     await result.save();
//     // const result = await results.findByIdAndUpdate(req.params.id, req.body, {
//     //   new: true,
//     //   runValidators: true,
//     // });
//     if (result) {
//       return res.status(404).send();
//     }
//     res.send(result);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// router.delete("/results/:id", async (req, res) => {
//   try {
//     const result = await results.findByIdAndDelete(req.params.id);
//     if (result) {
//       return res.status(404).send();
//     }
//     res.send(result);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

// router.get("/holidays/:id", async (req, res) => {
//   const _id = req.params.id;
//   console.log(_id);
//   try {
//     const result = await results.findOne({ owner: _id });

//     if (!result) {
//       return res.status(404).send();
//     }

//     res.send(result);
//   } catch (e) {
//     res.status(500).send();
//   }
// });
