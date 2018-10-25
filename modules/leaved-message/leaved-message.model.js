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
    }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' }, })

module.exports = mongoose.model('leaved-message', LeavedMessageSchema)
