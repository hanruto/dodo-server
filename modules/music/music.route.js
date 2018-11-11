const musicProxy = require('./music.controller'),
  { router } = require('../../config/koa')

router.get('/musics/:path', musicProxy)

