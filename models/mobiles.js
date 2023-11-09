const mongoose = require('mongoose');

const mobilesSchema = new mongoose.Schema({
  productName: String,
  brand: String,
  price: Number,
});

module.exports = mongoose.model('mobile', mobilesSchema);
