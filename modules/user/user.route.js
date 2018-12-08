const UserProxy = require('./user.controller'),
  { router } = require('../../config/koa')

router.get('/users/:path', UserProxy)

