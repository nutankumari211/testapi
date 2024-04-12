const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now } // Include updatedAt field with default value
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
