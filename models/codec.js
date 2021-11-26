const mongoose = require('mongoose');

const codecSchema = mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  inputLabels: {
    type: Array,
  },
}, );

module.exports = mongoose.model('Codec', codecSchema, 'codec');