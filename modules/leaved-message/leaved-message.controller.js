const mongoose = require('mongoose'),
  LeavedMessage = mongoose.model('leaved-message')

module.exports = {
  async list(ctx) {
    const { perPage = 15, page = 1, ...rest } = ctx.query
    const getData = LeavedMessage.find(rest)
      .sort('-created')
      .skip((Number(page) - 1) * Number(perPage))
      .limit(Number(perPage))
      .populate('user', ['username', 'email'])

    const getCount = LeavedMessage.count(rest)
    const [list, count] = await Promise.all([getData, getCount])
    ctx.body = { success: true, data: { list, perPage, page, count } }
  },

  async create(ctx) {
    const comment = Object.assign(ctx.request.body)
    comment.type = 1 // 博客留言
    comment.user = ctx.state.user._id
    const leavedMessage = await LeavedMessage.create(comment)
    ctx.body = { success: true, data: leavedMessage, message: '保存成功' }
  },

  async delete(ctx) {
    await LeavedMessage.deleteOne({ _id: ctx.params.id })
    ctx.body = { success: true }
  }
}
