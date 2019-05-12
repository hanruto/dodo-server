const mongoose = require('mongoose'),
  LeavedMessage = mongoose.model('leaved-message'),
  mailer = require('../email/mailer.controller')

exports.list = async ctx => {
  const { perPage = 15, page = 1, ...rest } = ctx.query
  const getData = LeavedMessage.find(rest)
    .sort('-created')
    .skip((Number(page) - 1) * Number(perPage))
    .limit(Number(perPage))
    .populate('user', ['username', 'email'])
    .populate('blog', ['title'])

  const getCount = LeavedMessage.count(rest)
  const [list, count] = await Promise.all([getData, getCount])
  ctx.body = { success: true, data: { list, perPage, page, count } }
}

exports.create = async ctx => {
  const comment = Object.assign(ctx.request.body)
  comment.user = ctx.state.user._id
  comment.type = 1
  const leavedMessage = await LeavedMessage.create(comment)

  if (leavedMessage.type === 2) {
    const repliedMessage = await LeavedMessage.findOne({ _id: leavedMessage.reply })
      .populate('user', ['email', 'username'])
      .populate('blog', ['_id', 'title'])

    const { email, username } = repliedMessage.user
    const { _id: blogId, title } = repliedMessage.blog
    const html = `
    <h3>嗨，${username}</h3>
    <p>小寒刚刚在博客 <a target="new" href="https://www.dodoblog.cn/blog?id=${blogId}">${title}</a> 中对您的评论进行了回复，快去查看吧。</p>
    `
    mailer.send({ to: email, html })
  }

  ctx.body = { success: true, data: leavedMessage, message: '保存成功' }
}

exports.delete = async ctx => {
  await LeavedMessage.deleteOne({ _id: ctx.params.id })
  ctx.body = { success: true }
}

exports.reply = async ctx => {
  const comment = Object.assign(ctx.request.body)
  comment.type = 2

  const leavedMessage = await LeavedMessage.create(comment)

  const repliedMessage = await LeavedMessage.findOne({ _id: leavedMessage.reply })
    .populate('user', ['email', 'username'])
    .populate('blog', ['_id', 'title'])

  const { email, username } = repliedMessage.user
  const { _id: blogId, title } = repliedMessage.blog

  const html = `
    <h3>嗨，${username}</h3>
    <p>小寒刚刚在博客 <a target="new" href="https://www.dodoblog.cn/blog?id=${blogId}">${title}</a> 中对您的评论进行了回复，快去查看吧。</p>
    `
  mailer.send({ to: email, html })

  ctx.body = { success: true, data: leavedMessage, message: '回复成功' }
}
