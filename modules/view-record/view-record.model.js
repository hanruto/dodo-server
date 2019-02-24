const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const ViewRecordSchema = new Schema(
  {
    siteName: {
      type: String,
      required: true
    },
    ip: {
      type: String
    },
    info: {
      type: Object
    }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

module.exports = mongoose.model('view-record', ViewRecordSchema)
