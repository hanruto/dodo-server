const mongoose = require('mongoose'),
  Record = mongoose.model('view-record'),
  dayjs = require('dayjs')

module.exports = {
  async create(ctx) {
    const info = Object.assign(ctx.request.body)
    await Record.create({
      ...info,
      ...{ ip: ctx.request.headers['x-forward-for'] }
    })

    ctx.body = { success: true }
  },

  async count(ctx) {
    const count = await Record.count({ siteName: ctx.params.siteName })
    ctx.body = { success: true, data: count }
  },

  async list(ctx) {
    const { offset = 0, limit = 20 } = ctx.query

    const getCount = Record.count()

    const today = new Date()
    const todayStartTime = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const getDayCount = Record.count({ created: { $gt: todayStartTime } })

    const getList = Record.find()
      .sort('-created')
      .skip(Number(offset))
      .limit(Number(limit))

    const [count, dayCount, list] = await Promise.all([getCount, getDayCount, getList])

    ctx.body = { success: true, data: { list, count, offset, limit, dayCount } }
  },

  async analyze(ctx) {
    const end = (ctx.query.end || Date.now()).valueOf()
    const start = (ctx.query.start || end - 30 * 24 * 3600 * 1000).valueOf()
    const analysis = await Record.find()

    let result = {}
    let current = start

    while (current < end) {
      const label = dayjs(current).format('YYYY-MM-DD')
      result[label] = 0
      current = current + 24 * 3600 * 1000
    }

    const endLabel = dayjs(end).format('YYYY-MM-DD')
    result[endLabel] = 0

    analysis.forEach(item => {
      const day = dayjs(item.created).format('YYYY-MM-DD')
      if (result[day] !== undefined) result[day]++
    })

    const data = Object.keys(result).map(date => ({
      date,
      viewCount: result[date]
    }))

    console.log(data)
    ctx.body = { success: true, data }
  }
}
