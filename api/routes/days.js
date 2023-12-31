const express = require("express");
const mongoose = require("mongoose");
const Day = require("../models/day");

const router = express.Router();

router.get("/", (req, res, next) => {
  Day.find()
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

router.get("/holidays", (req, res, next) => {
  Day.find()
    .where("isHoliday").equals(true)
    .sort("year")
    .sort("month")
    .sort("day")
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

router.post("/", (req, res, next) => {
  const day = new Day({
    _id: new mongoose.Types.ObjectId(),
    dateTime: req.body.dateTime,
    year: req.body.year,
    month: req.body.month,
    day: req.body.day,
    monthName: req.body.monthName,
    dayName: req.body.dayName,
    isHoliday: req.body.isHoliday,
  });
  day
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

router.post("/getWorkingDays", (req, res, next) => {
  const initialDate = req.body.initialDate;
  const finalDate = req.body.finalDate;
  const nonWorkingDays = req.body.nonWorkingDays;

  Day.countDocuments()
    .where("date").gte(initialDate).lte(finalDate)
    .where("isHoliday").equals(false)
    .where("dayName").nin([...nonWorkingDays])
    .sort("year")
    .sort("month")
    .sort("day")
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        workingDays: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Day.find({ _id: id })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Day.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

/**
 * @param {String} s
 * @return {Number}
 */
function getNumber(s) {
  var number = Number(s);
  console.log(number);
  return number;
}

module.exports = router;
