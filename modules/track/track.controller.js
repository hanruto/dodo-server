const mongoose = require('mongoose'),
  trackModel = mongoose.model('track'),
  dayjs = require('dayjs'),
  _ = require('lodash'),
  whitelistController = require('../whitelist/whitelist.controller')

function findExcludeWhiteList(query) {
  const ipWhitelist = whitelistController.get('ip')
  return trackModel.find({ ...query, ip: { $nin: [...ipWhitelist, null] } })
}

function countExcludeWhiteList(query) {
  const ipWhitelist = whitelistController.get('ip')
  return trackModel.count({ ...query, ip: { $nin: [...ipWhitelist, null] } })
}

module.exports = {
  async create(ctx) {
    const ip = ctx.request.headers['x-forward-for']
      || ctx.headers['x-real-ip']
      || ctx.socket.remoteAddress
    const info = { ...ctx.request.body, ip }
    const track = new trackModel(info)
    const ipWhitelist = whitelistController.get('ip')

    if (ipWhitelist.includes(ip)) {
      return ctx.body = { success: true, message: 'ip is in the whitelist' }
    }

    const data = await track.save()
    ctx.body = { success: true, data }
  },

  async list(ctx) {
    const ipWhitelist = whitelistController.get('ip')
    const { limit = 100, skip = 0, ...query } = ctx.query
    query.ip = { $nin: ipWhitelist }
    const tracks = await findExcludeWhiteList(query)
      .skip(Number(skip))
      .limit(Number(limit))
      .sort('-created')

    const total = await countExcludeWhiteList(query)

    ctx.body = { success: true, data: { list: tracks, total } }
  },

  async analyzePvAndUv(ctx) {
    const today = new Date()
    const todayStartTime = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const getPvDayCount = countExcludeWhiteList({ type: 'route-change', created: { $gt: todayStartTime } })
    const getPvCount = countExcludeWhiteList({ type: 'route-change' })
    const getUvIp = findExcludeWhiteList({ type: 'route-change' }).distinct('ip')
    const getUvDayIp = findExcludeWhiteList({ type: 'route-change', created: { $gt: todayStartTime } }).distinct('ip')
    const [pvCount, pvDayCount, { length: uvCount }, { length: uvDayCount }] = await Promise.all([getPvCount, getPvDayCount, getUvIp, getUvDayIp])

    ctx.body = { success: true, data: { pvCount, pvDayCount, uvCount, uvDayCount } }
  },

  async analyze(ctx) {
    const duration = ctx.query.duration || 7
    const end = (ctx.query.end || Date.now()).valueOf()
    const start = (ctx.query.start || end - duration * 24 * 3600 * 1000).valueOf()
    const analysis = await findExcludeWhiteList({ type: 'route-change' })

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
