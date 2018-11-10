const mongoose = require('mongoose'),
  crypto = require('crypto'),
  Schema = mongoose.Schema

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
  },
  role: {
    type: String,
    default: 'admin'
  }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' }, })

const encrytion = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha1').toString('base64')
}

AdminSchema.pre('save', function (next) {
  this.salt = crypto.randomBytes(16).toString('base64')
  this.password = encrytion(this.password, this.salt)
  next()
})

AdminSchema.methods = {
  validatePassword(password) {
    return this.password === encrytion(password, this.salt)
  }
}

module.exports = mongoose.model('admin', AdminSchema)
