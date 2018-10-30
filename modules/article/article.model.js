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
        type: [String]
    },
    type: {
        type: Number,
        enum: [1, 2, 3],  // 1. tech 2. life 3. original
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
    comments: {
        default: [],
        type: [{
            nickname: {type: String, required: true, created: Date.now()},
            content: {type: String, required: true, created: Date.now()},
        }]
    }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' }, })

module.exports = mongoose.model('article', ArticleSchema)
