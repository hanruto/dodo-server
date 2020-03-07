const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const RobotChatSchema = new Schema({
  title: {
    type: String,
    required: '请填写标题'
  },
  content: {
    type: String,
    required: '请填写内容'
  },
  key: {
    type: String,
    required: '请填写索引',
    unique: true,
  },
  viewCount: {
    type: Number,
    default: 0
  },
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' }, })

module.exports = mongoose.model('robot-chat', RobotChatSchema)
