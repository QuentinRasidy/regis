const mongoose = require('mongoose');

const demoSchema = mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
      unique: true,
    },
    scene: {
      type: Array,
      required: true,
    },
  },
);

module.exports = mongoose.model('Demo', demoSchema);
