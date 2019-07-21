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

    const getPvCount = Record.count()

    const today = new Date()
    const todayStartTime = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    const getPvDayCount = Record.count({ created: { $gt: todayStartTime } })
    const getUvIpArr = Record.distinct('ip')
    const getDayUvIpArr = Record.find({ created: { $gt: todayStartTime } }).distinct('ip')

    const getList = Record.find()
      .sort('-created')
      .skip(Number(offset))
      .limit(Number(limit))

    const [
      pvCount,
      dayPvCount,
      { length: uvCount },
      { length: dayUvCount },
      list
    ] = await Promise.all([getPvCount, getPvDayCount, getUvIpArr, getDayUvIpArr, getList])

    ctx.body = { success: true, data: { list, pvCount, offset, limit, dayPvCount, uvCount, dayUvCount } }
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

    ctx.body = { success: true, data }
  }
}
