const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.ObjectId,
        required: true
    },
    tags: {
        type: [String]
    }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

module.exports = mongoose.model('article', ArticleSchema);
