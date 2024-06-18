const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deeplink: { type: String, required: true },
  image: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  impressions: { type: Number, default: 0 },
});

module.exports = mongoose.model('Ad', AdSchema);
