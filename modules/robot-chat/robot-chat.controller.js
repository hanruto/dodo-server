const fs = require('fs')
const path = require('path')

let chat = null
const filePath = path.resolve('./modules/robot-chat/chat.txt')

module.exports = {
  async getChat(ctx) {
    chat = fs.readFileSync(filePath).toString()
    ctx.body = { success: true, data: chat }
  },

  async updateChat(ctx) {
    const { data } = ctx.request.body
    chat = data
    fs.writeFileSync(filePath, chat)
    ctx.body = { success: true, data: chat }
  },
}
