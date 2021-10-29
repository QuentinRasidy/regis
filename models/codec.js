const mongoose = require('mongoose');

const codecSchema = mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    ip: {
      type: String,
      required: true,
    },
    name: {
        type: String,
        required: true,
    },
  },
);

module.exports = mongoose.model('Codec', codecSchema);
