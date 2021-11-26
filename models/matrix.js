const mongoose = require('mongoose');

const matrixSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    inputs: {
        type: Array,
        required: true,
    },
    outputs: {
        type: Array,
        required: true,
    }
  },
);

module.exports = mongoose.model('matrix', matrixSchema, 'matrix');
