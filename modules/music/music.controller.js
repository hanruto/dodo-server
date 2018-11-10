const request = require('request')

const basicUrl = 'https://api.bzqll.com/music/netease'
const key = 579621905

module.exports = {
  async list(ctx) {
    const result = await new Promise(
      (resolve) =>
        request(`${basicUrl}/songList?key=${key}&id=3778678&limit=10&offset=0`, function (error, response, body) {
          if (!error) {
            const data = JSON.parse(body).data
            resolve(data)
          }
        }))

    ctx.body = { success: true, data: result }
  },

  async getLyrics(ctx) {
    const id = ctx.params.id

    const result = await new Promise(
      (resolve) =>
        request(`${basicUrl}/lrc?key=${key}&id=${id}`, function (error, response, body) {
          if (!error) {
            resolve(body)
          }
        }))

    ctx.body = { success: true, data: {lyric: result} }
  }
}