const axios = require('axios')

const NetEaseRequest = async (ctx) => {
  const basicUrl = 'https://api.bzqll.com/music/netease'
  const key = 579621905
  const id = 3778678
  const params = { ...{ key, id }, ...ctx.query }
  const originUrl = ctx.request.url.replace(/\?.*$/, '')
  const url = originUrl.replace('/api/musics', basicUrl)

  const res = await axios.get(url, { params })

  if (res.data) {
    if (typeof (res.data) === 'string') {
      ctx.body = { data: res.data, success: true }
    } else {
      ctx.body = { data: res.data.data, success: true }
    }
  } else {
    ctx.body = { success: false, msg: '请求出错' }
  }
}

module.exports = NetEaseRequest