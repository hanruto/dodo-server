const mailer = require('../email/mailer.controller'),
  dayjs = require('dayjs'),
  mongoose = require('mongoose'),
  errorStatisticModel = mongoose.model('error-statistic'),
  config = require('./yc-h5.config')

let lastSendTime = null

function sendMailToMe() {
  const html = `
    <h3>严重警告</h3>
    <div><label>from: </label> sentry</div>
    <div><label>time: </label> ${dayjs(Date.now()).format('YYYY-mm-DD HH:MM:ss')}</div>
    <div><label>content: </label> <br/>您的网站 primary_school_mobile_h5 在短时间内发生了过多的错误，请及时检查处理</div>
  `
  const data = { to: '1256790127@qq.com', html }

  lastSendTime = Date.now()
  mailer.send(data)
}

module.exports = {
  catchYCH5SentryError: async ctx => {
    console.log(ctx.request.body)
    const { url, dateCreated: happendAt, events } = ctx.request.body

    if (config.whiteList.includes(url)) {
      ctx.body = { success: true, message: '错误url处于白名单中' }
    }

    const errorInfo = { url, happendAt, events }
    const error = await errorStatisticModel.create(errorInfo)
    const query = { created: { $gte: Date.now() - config.statisticInterval } }
    const count = await errorStatisticModel.count(query)
    const isNeedWarning = count >= config.warningLine
    const isNeedSend = Date.now() - lastSendTime >= config.sendInterval

    console.log(count, lastSendTime, isNeedWarning, isNeedSend)

    if (isNeedWarning && isNeedSend) {
      sendMailToMe()
    }

    ctx.body = { success: true, data: error, message: '发送成功' }
  }
}
