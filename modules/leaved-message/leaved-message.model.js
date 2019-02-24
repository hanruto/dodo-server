const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const LeavedMessageSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'user',
      required: true
    },
    blog: {
      type: Schema.ObjectId,
      ref: 'article',
      require: true
    },
    message: {
      type: String,
      required: 'true'
    },
    type: {
      type: Number,
      enum: [0, 1], // 0 留言板，1 文章
      default: 0
    }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

module.exports = mongoose.model('leaved-message', LeavedMessageSchema)
