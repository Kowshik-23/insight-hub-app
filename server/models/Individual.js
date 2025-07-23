// server/models/Individual.js
const mongoose = require('mongoose');

const IndividualSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Individual', IndividualSchema);