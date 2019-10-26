const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const ErrorStatisticSchema = new Schema(
  {
    projectName: { type: String },
    url: { type: String },
    happendAt: { type: Date },
    events: { type: Array },
    errorDetail: { type: Object }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

module.exports = mongoose.model('sentry-error', ErrorStatisticSchema)
