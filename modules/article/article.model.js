const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
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
    comment: {
        type: [String]
    }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' }, });

module.exports = mongoose.model('article', ArticleSchema);
