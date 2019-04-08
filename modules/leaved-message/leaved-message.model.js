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
      enum: [1, 2, 3, 4], // 1: 普通评论, 2: 管理员回复
      default: 1
    }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

module.exports = mongoose.model('leaved-message', LeavedMessageSchema)
