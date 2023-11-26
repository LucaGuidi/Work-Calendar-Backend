const mongoose = require("mongoose");

const daySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: { type: Number, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  day: { type: Number, required: true },
  monthName: { type: String, required: true },
  dayName: { type: String, required: true },
  isHoliday: { type: Boolean, required: true },
  temp: String
});

module.exports = mongoose.model("Day", daySchema);
