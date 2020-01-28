const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const TrackSchema = new Schema({
  key: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  info: {
    type: Object,
    default: 1,  // 1: 博客 2: 留言
  },
  ip: {
    type: String,
    required: true,
  },
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' }, })

module.exports = mongoose.model('track', TrackSchema)
