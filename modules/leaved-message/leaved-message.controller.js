const mongoose = require('mongoose'),
  LeavedMessage = mongoose.model('leaved-message')

module.exports = {
  async list(ctx) {
    const { perPage = 15, page = 1, ...rest } = ctx.query
    const getData = LeavedMessage.find(rest)
      .sort('-created')
      .skip((Number(page) - 1) * Number(perPage))
      .limit(Number(perPage))
      .populate('author')

    const getCount = LeavedMessage.count(rest)
    const [list, count] = await Promise.all([getData, getCount])
    ctx.body = { success: true, data: { list, perPage, page, count }, }
  },

  async create(ctx) {
    const info = Object.assign(ctx.request.body)
    const message = await LeavedMessage.create(info)
    ctx.body = { success: true, data: message, message: '保存成功' }
  },

  async delete(ctx) {
    await LeavedMessage.deleteOne({ _id: ctx.params.id })
    ctx.body = { success: true }
  },
}