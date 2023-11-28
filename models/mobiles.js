const mongoose = require('mongoose');

const mobilesSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },

  brand:{
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,

  },

  price:{
    type: Number,
    required: true,
    min: 0,
    max: 1300,
  },
});

module.exports = mongoose.model('mobile', mobilesSchema);
