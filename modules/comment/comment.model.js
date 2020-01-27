const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const CommentSchema = new Schema({
  blogId: {
    type: String,
  },
  type: {
    type: Number,
    default: 1,  // 1: 博客 2: 留言
  },
  content: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' }, })

module.exports = mongoose.model('comment', CommentSchema)
