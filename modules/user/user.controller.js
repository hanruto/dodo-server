const axios = require('axios')

const UserProxyRequest = async (ctx) => {
  const basicUrl = 'https://authapi.justdodo.cn/api'
  const vf = ctx.request.headers.vf
  const originUrl = ctx.request.url.replace(/\?.*$/, '')
  const url = originUrl.replace('/api/users', basicUrl)

  const result = await axios.get(url, { params: ctx.query, headers: { vf } })
  if (result.data) {
    ctx.body = result.data
  } else {
    ctx.body = {success: false, msg: '请求出错'}
  }
}

module.exports = UserProxyRequest
