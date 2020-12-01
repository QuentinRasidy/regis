const mongoose = require('mongoose');

const saveSchema = mongoose.Schema(
  {
    //_id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
      //unique: true,
    },
    position: {
      type: Array,
      required: true,
    },
    mainVideoSource: {
      type: String,
      required: true,
    },
    shareSelection: {
      type: String,
      //required: true,
    },
    allInputOutput: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model('Save', saveSchema);
