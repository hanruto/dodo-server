const mongoose = require('mongoose'),
  mailer = require('../email/mailer.controller.js'),
  verifyCodeModel = mongoose.model('verify-code'),
  userModel = mongoose.model('user'),
  _ = require('lodash'),
  jwt = require('jsonwebtoken')

const VerifyCodeEmailTemplate = `
<h3>你好</h3>
<p>欢迎注册dodoblog，验证码是 <i>{{code}}</i></p>
`

exports.checkEmailAndSendCode = async ctx => {
  const { email } = ctx.request.body

  const user = await userModel.findOne({ email })
  if (user) {
    return (ctx.body = { success: false, message: '用户名已存在' })
  }

  const code = ((1 + Math.random()) * 100000000).toString().substr(1, 8)
  await verifyCodeModel.remove({ email })
  await verifyCodeModel.create({ email, code })
  await mailer.send({ to: email, html: VerifyCodeEmailTemplate.replace(/{{code}}/, code) })
  ctx.body = { success: true }
}

exports.signUp = async ctx => {
  const { email, code, password, confirmPassword, username } = ctx.request.body

  // 核对验证码
  const codeInfo = await verifyCodeModel.findOne({ email })
  if (codeInfo.code !== code.toString()) {
    return (ctx.body = { success: false, message: '验证码错误' })
  }

  // 判断密码
  if (password !== confirmPassword) {
    return (ctx.body = { success: false, message: '两次密码不一致' })
  }

  // 保存用户
  await userModel.remove({ email })
  const user = await userModel.create({ email, password, username })
  ctx.body = { success: true, data: _.omit(user.toObject(), ['password', 'salt']) }
}

exports.logout = async () => {}

exports.login = async ctx => {
  const { email, password } = ctx.request.body
  const user = await userModel.findOne({ email })
  if (!user) {
    return (ctx.body = { success: false, message: '用户名或密码错误' })
  }

  const isCorrect = await user.validatePassword(password)

  if (!isCorrect) {
    return (ctx.body = { success: false, message: '用户名或密码错误' })
  }

  const payload = { id: user.id }
  const token = jwt.sign(payload, 'dodo-xiaoHan')

  ctx.body = {
    success: true,
    data: { user: _.omit(user.toObject(), ['password', 'salt']), token }
  }
}

exports.list = async ctx => {
  const users = await userModel.find()
  ctx.body = { success: true, users }
}

exports.getInfo = ctx => {
  const user = ctx.state.user

  ctx.body = {
    success: true,
    data: _.omit(user.toObject(), ['password', 'salt'])
  }
}
