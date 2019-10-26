const mailer = require('../email/mailer.controller'),
  dayjs = require('dayjs'),
  mongoose = require('mongoose'),
  errorStatisticModel = mongoose.model('sentry-error'),
  config = require('./yc-h5.config')

let lastSendTime = null

function sendMailToMe() {
  const html = `
    <h3>严重警告</h3><br/>
    <div><label><b>from: </b></label> sentry</div>
    <div><label><b>time: </b></label> ${dayjs(Date.now()).format('YYYY-mm-DD HH:MM:ss')}</div>
    <div><label><b>content: </b></label> 您的网站在短时间内发生了过多的错误，请及时处理</div>
  `
  const data = { to: '1256790127@qq.com', html }

  lastSendTime = Date.now()
  mailer.send(data)
}

// 每小时超过20条会报错，30分钟发一次

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
