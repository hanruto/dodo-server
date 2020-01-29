const fs = require('fs')
const path = require('path')
let whitelist = require('./whitelist.json')

module.exports = {
  list(ctx) {
    const { type } = ctx.query
    const data = whitelist.filter(item => item.type === type)
    ctx.body = { success: true, data }
  },

  async add(ctx) {
    const { type, value } = ctx.request.body
    whitelist = whitelist.concat([{ type, value }])
    ctx.body = { success: true }
    fs.writeFileSync(path.resolve('./modules/whitelist/whitelist.json'), JSON.stringify(whitelist))
  },

  async remove(ctx) {
    const { type, value } = ctx.request.query
    whitelist = whitelist.filter(item => {
      return item.type !== type || item.value.toString() !== value.toString()
    })
    ctx.body = { success: true }
    fs.writeFileSync(path.resolve('./modules/whitelist/whitelist.json'), JSON.stringify(whitelist))
  },

  get(type) {
    return whitelist.filter(item => item.type === type).map(item => item.value)
  },
}