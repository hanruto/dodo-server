const music = require('./music.controller'),
  { router } = require('../../config/koa')

router.get('/musics', music.list)
  .get('/musics/:id/lyric', music.getLyrics)

