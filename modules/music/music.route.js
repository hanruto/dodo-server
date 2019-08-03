const musicProxy = require('./music.controller')

/**
 * 接口由第三方提供，请参考 https://www.bzqll.com/2019/04/318.html
 */

module.exports = router => {
  router.get('/musics/:path', musicProxy)
  router.get('/musics/:path/:path', musicProxy)
}
