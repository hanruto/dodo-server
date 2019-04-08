const mongoose = require('mongoose'),
  LeavedMessage = mongoose.model('leaved-message')

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
  comment.type = 1 // 博客留言
  comment.user = ctx.state.user._id
  const leavedMessage = await LeavedMessage.create(comment)
  ctx.body = { success: true, data: leavedMessage, message: '保存成功' }
}

exports.delete = async ctx => {
  await LeavedMessage.deleteOne({ _id: ctx.params.id })
  ctx.body = { success: true }
}

exports.reply = async ctx => {
  ctx.body = { success: true }
}
