const mongoose = require('mongoose');

const cameraSchema = mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    ip: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model('Camera', cameraSchema);
