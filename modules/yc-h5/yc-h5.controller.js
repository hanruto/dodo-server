const mailer = require('../email/mailer.controller'),
  dayjs = require('dayjs'),
  mongoose = require('mongoose'),
  sentryErrorModel = mongoose.model('sentry-error'),
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
    const { url, dateCreated: happendAt, events } = ctx.request.body
    const errorDetail = ctx.request.body
    const errorInfo = { url, happendAt, events, errorDetail }
    const error = await sentryErrorModel.create(errorInfo)
    const query = { created: { $gte: Date.now() - config.statisticInterval } }
    const count = await sentryErrorModel.count(query)
    const isNeedWarning = count >= config.warningLine
    const isNeedSend = Date.now() - lastSendTime >= config.sendInterval

    console.log(count, lastSendTime, isNeedWarning, isNeedSend)

    if (isNeedWarning && isNeedSend) {
      sendMailToMe()
    }

    ctx.body = {
      success: true,
      data: { ...error, count, lastSendTime },
      message: isNeedWarning && isNeedSend ? '错误保存并且邮件发送成功' : '错误保存成功'
    }
  },

  countSentryError: async ctx => {
    const isAll = ctx.request.query.all
    const query = { created: { $gte: Date.now() - config.statisticInterval } }
    const count = await sentryErrorModel.count(isAll ? {} : query)

    ctx.body = {
      success: true,
      data: { count },
      message: '查询成功'
    }
  },

  getSentryError: async ctx => {
    const isAll = ctx.request.query.all
    const query = { created: { $gte: Date.now() - config.statisticInterval } }
    const count = await sentryErrorModel.find(isAll ? {} : query)

    ctx.body = {
      success: true,
      data: { count },
      message: '查询成功'
    }
  }
}
