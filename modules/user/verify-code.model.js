const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const VerifyCodeSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unqiue: true
    },
    code: {
      type: String,
      required: true
    }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

module.exports = mongoose.model('verify-code', VerifyCodeSchema)
