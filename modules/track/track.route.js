const trackController = require('./track.controller')

module.exports = router => {
  router
    .get('/tracks', trackController.list)
    .get('/tracks/pv-uv', trackController.analyzePvAndUv)
    .get('/tracks/analysis', trackController.analyze)
    .post('/tracks', trackController.create)
}
