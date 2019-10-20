const mailer = require('../email/mailer.controller'),
  dayjs = require('dayjs')

module.exports = {
  catchYCH5SentryError: async ctx => {
    const html = `
      <h3>严重警告</h3>
      <div><label>from: </label> sentry</div>
      <div><label>time: </label> ${dayjs(Date.now()).format('YYYY-mm-DD HH:MM:SS')}</div>
      <div><label>content: </label>您的网站 primary_school_mobile_h5 在短时间内发生了过多的错误，请及时检查处理</div>
    `

    const data = { to: '1256790127@qq.com', html }

    mailer.send(data)
    ctx.body = { success: true, data, message: '回复成功' }
  }
}
