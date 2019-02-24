const musicProxy = require('./music.controller')

module.exports = router => {
  router.get('/musics/:path', musicProxy)
}
