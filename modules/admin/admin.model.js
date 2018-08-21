const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String
    },
    status: {
        type: Number,
        default: 1
    }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' }, });

module.exports = mongoose.model('admin', AdminSchema);
