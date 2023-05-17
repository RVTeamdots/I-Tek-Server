const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agencySchema = new Schema({
  agencyName: { type: String, required: true,  },
  agencyImage: { type: String,},
  status: { type: Number, default: 1 },
  dateCreated: { type: Date, default: Date.now },
});

const Agency = mongoose.model('agency', agencySchema);
module.exports = Agency;