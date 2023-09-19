const mongoose = require("mongoose");

const corseSchema  = new mongoose.Schema({
    course: { type: String, required: true },
    duration: { type: String, required: true },
  });

  const Course = mongoose.model("Course", corseSchema);

module.exports= Course;
  