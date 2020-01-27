const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: '请填写标题'
  },
  content: {
    type: String,
    required: '请填写内容'
  },
  author: {
    type: Schema.ObjectId,
    required: '没有作者',
    ref: 'admin'
  },
  tags: {
    type: [{
      type: Schema.ObjectId,
      ref: 'article-tag'
    }],
  },
  type: {
    type: Number,
    enum: [1, 2, 3],  // 1. 公开博客 2. 私密博客 3. 其他
    default: 1
  },
  public: {
    type: Boolean,
    default: true
  },
  hot: {
    type: Number,
    default: 0
  },
  viewCount: {
    type: Number,
    default: 0
  },
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' }, })

module.exports = mongoose.model('article', ArticleSchema)
