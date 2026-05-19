const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'read', 'replied'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  repliedAt: Date,
  replyMessage: String
});

module.exports = mongoose.model('Contact', contactSchema);