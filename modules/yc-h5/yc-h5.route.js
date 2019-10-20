const ycH5Controller = require('./yc-h5.controller')

module.exports = router => {
  router.get('/ych5/sentry-error', ycH5Controller.catchYCH5SentryError)
}
