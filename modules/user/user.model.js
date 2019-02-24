const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt')

const emailReg = /^[\w.-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/
const phoneReg = /^1[3|4|5|8]\d{9}$/
const passwordReg = /[0-9a-zA-Z]{8,16}/
const saltRounds = 10
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: '请填写用户名',
      unique: true,
      max: 3
    },
    email: {
      type: String,
      required: '请填写邮箱',
      unique: true,
      validate: {
        validator: v => emailReg.test(v),
        message: props => `${props.value} is not a valid email!`
      }
    },
    phone: {
      type: String,
      sparse: true,
      validate: {
        validator: v => phoneReg.test(v),
        message: props => `${props.value} is not a valid phone!`
      }
    },
    wx: {
      type: String
    },
    salt: {
      type: String
    },
    password: {
      type: String,
      required: true,
      max: 16,
      min: 8,
      validate: {
        validator: v => passwordReg.test(v),
        message: '请输入由数字或者字母构成的8-16位的密码'
      }
    }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

UserSchema.pre('save', function(next) {
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(this.password, salt)
  this.password = hash
  this.salt = salt
  next()
})

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.hashSync(password, this.salt) === this.password
}

module.exports = mongoose.model('user', UserSchema)
