const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String, default: '🌸' },
  text: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  product: { type: String },
  date: { type: String },
  isApproved: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Auto-set date before saving
commentSchema.pre('save', function(next) {
  if (!this.date) {
    const today = new Date();
    this.date = today.toISOString().split('T')[0];
  }
  next();
});

module.exports = mongoose.model('Comment', commentSchema);