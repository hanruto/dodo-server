const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const ErrorStatisticSchema = new Schema(
  {
    eventId: { type: Number },
    project: { type: String },
    url: { type: String },
    events: { type: Array },
    errorDetail: { type: String },
    message: { type: String }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

module.exports = mongoose.model('sentry-error', ErrorStatisticSchema)
