
const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const ViewRecordSchema = new Schema({
  siteName: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' }, })

module.exports = mongoose.model('view-record', ViewRecordSchema)
