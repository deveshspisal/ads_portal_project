const mongoose = require('mongoose');

const ClickSchema = new mongoose.Schema({
  adId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ad' },
  clickedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Click', ClickSchema);
