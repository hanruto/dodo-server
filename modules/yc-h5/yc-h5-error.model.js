const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const ErrorStatisticSchema = new Schema(
  {
    projectName: { type: String },
    url: { type: String },
    happendAt: { type: Date },
    events: { type: Array }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

module.exports = mongoose.model('error-statistic', ErrorStatisticSchema)
