const request = require('request')


const toQuertString = (opt) => {
  try {
    return Object.entries(opt).reduce((result, [key, value], index) => {
      if (index === 0) {
        return result += `?${key}=${value}`
      } else {
        return result += `&${key}=${value}`
      }
    }, '')
  } catch (err) {
    return ''
  }
}

const NetEaseRequest = async (ctx) => {
  const basicUrl = 'https://api.bzqll.com/music/netease'
  const key = 579621905
  const id = 3778678
  const params = toQuertString({ ...{ key, id }, ...ctx.query })
  const originUrl = ctx.request.url.replace(/\?.*$/, '')
  const url = originUrl.replace('/api/musics', basicUrl) + params
  
  const data = await new Promise(
    (resolve) => request(url, (error, response, body) => {
      let data
      try {
        data = JSON.parse(body)
        if(data.result){
          data = data.data
        }
      } catch (err) {
        data = body
      }
      resolve(data)
    })
  )

  ctx.body = { success: true, data }
}

module.exports = NetEaseRequest