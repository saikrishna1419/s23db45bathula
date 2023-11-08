const mongoose = require('mongoose');

const mobileSchema = new mongoose.Schema({
  mobile_name: String,
  mobile_model: String,
  mobile_price: Number,
});

module.exports = mongoose.model('mobile', mobileSchema);
