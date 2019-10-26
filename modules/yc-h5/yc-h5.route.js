const ycH5Controller = require('./yc-h5.controller')

module.exports = router => {
  router
    .post('/yc-h5/sentry-error', ycH5Controller.catchYCH5SentryError)
    .get('/yc-h5/sentry-error', ycH5Controller.getSentryError)
    .get('/yc-h5/sentry-error/count', ycH5Controller.countSentryError)
}
