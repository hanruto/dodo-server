const mongoose = require('mongoose'),
  SiteInfo = mongoose.model('view-record')

module.exports = {
  async create(ctx) {
    const info = Object.assign(ctx.request.body)
    await SiteInfo.create({
      ...info,
      ...{ ip: ctx.request.headers['x-forward-for'] }
    })

    ctx.body = { success: true }
  },

  async count(ctx) {
    const count = await SiteInfo.count({ siteName: ctx.params.siteName })
    ctx.body = { success: true, data: count }
  },

  async list(ctx) {
    const { offset = 0, limit = 20 } = ctx.query
    const getCount = SiteInfo.count()
    const getList = SiteInfo.find({ siteName: ctx.params.siteName })
      .sort('-created')
      .skip(Number(offset))
      .limit(Number(limit))

    const [count, list] = await Promise.all([getCount, getList])


    ctx.body = { success: true, data: { list, count, offset, limit } }
  },
}