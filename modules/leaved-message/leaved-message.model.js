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
    reply: {
      ref: 'leaved-message',
      type: Schema.ObjectId
    },
    type: {
      type: Number,
      enum: [0, 1, 2, 3, 4], // 0: 普通评论, 1: 管理员回复
      default: 0
    }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

module.exports = mongoose.model('leaved-message', LeavedMessageSchema)
