const mongoose = require('mongoose'),
  trackModel = mongoose.model('track'),
  dayjs = require('dayjs'),
  _ = require('lodash')

module.exports = {
  async create(ctx) {
    const ip = ctx.headers['x-forwarded-for']
      || ctx.headers['x-real-ip']
      || ctx.socket.remoteAddress
    const info = { ...ctx.request.body, ip }
    const track = new trackModel(info)
    await track.save()

    ctx.body = { success: true }
  },

  async list(ctx) {
    const { limit = 100, skip = 0, ...query } = ctx.query
    const tracks = await trackModel
      .find(query)
      .skip(Number(skip))
      .limit(Number(limit))
      .sort('-created')

    const total = await trackModel
      .count(query)

    ctx.body = { success: true, data: { list: tracks, total } }
  },

  async analyzePvAndUv(ctx) {
    const today = new Date()
    const todayStartTime = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const getPvDayCount = trackModel.count({ type: 'route-change', created: { $gt: todayStartTime } })
    const getPvCount = trackModel.count({ type: 'route-change' })
    const getUvIp = trackModel.find({ type: 'route-change' }).distinct('ip')
    const getUvDayIp = trackModel.find({ type: 'route-change', created: { $gt: todayStartTime } }).distinct('ip')
    const [pvCount, pvDayCount, { length: uvCount }, { length: uvDayCount }] = await Promise.all([getPvCount, getPvDayCount, getUvIp, getUvDayIp])

    ctx.body = { success: true, data: { pvCount, pvDayCount, uvCount, uvDayCount } }
  },

  async analyze(ctx) {
    const duration = ctx.query.duration || 7
    const end = (ctx.query.end || Date.now()).valueOf()
    const start = (ctx.query.start || end - duration * 24 * 3600 * 1000).valueOf()
    const analysis = await trackModel.find({ type: 'route-change' })

    let result = {}
    let current = start

    while (current < end) {
      const label = dayjs(current).format('YYYY-MM-DD')
      result[label] = []
      current = current + 24 * 3600 * 1000
    }

    const endLabel = dayjs(end).format('YYYY-MM-DD')
    result[endLabel] = []

    analysis.forEach(item => {
      const day = dayjs(item.created).format('YYYY-MM-DD')
      if (result[day] !== undefined) result[day].push(item.ip)
    })

    const data = Object.keys(result).map(date => ({
      date,
      pv: result[date].length,
      uv: _.union(result[date]).length,
    }))

    ctx.body = { success: true, data }
  },
}
