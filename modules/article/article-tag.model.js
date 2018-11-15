const mongoose = require('mongoose'),
  Schema = mongoose.Schema


const ArticleTagSchema = new Schema({
  value: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' }, })


module.exports = mongoose.model('article-tag', ArticleTagSchema)