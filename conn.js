const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/patientinfo")
  .then(() => {
    console.log(`connection successful`);
  })
  .catch((e) => {
    console.log(`connection error: ${e.message}`);
  });