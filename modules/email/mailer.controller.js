const nodemailer = require('nodemailer')

const mailerConfig = {
  from: '"小寒的博客" <1256790127@qq.com>',
  qqMailSecret: 'ijapuuxntwazhibc'
}

const transporter = nodemailer.createTransport({
  service: 'qq',
  port: 465,
  secureConnection: true,
  auth: {
    user: '1256790127@qq.com',
    pass: mailerConfig.qqMailSecret
  }
})

module.exports = {
  async send(opt) {
    const { to, html, subject = '小寒的博客 - dodoblog' } = opt
    const from = mailerConfig.from
    let mailOptions = { from, to, subject, html }
    return await transporter.sendMail(mailOptions)
  }
}
