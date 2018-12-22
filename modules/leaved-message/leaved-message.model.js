const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const LeavedMessageSchema = new Schema({
  nickname: {
    type: String,
    required: '请填写名字'
  },
  message: {
    type: String,
    required: '请填写内容'
  },
  type: {
    type: Number,
    enum: [0, 1], // 0 留言板，1 文章
    default: 0,
  }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' }, })

module.exports = mongoose.model('leaved-message', LeavedMessageSchema)
