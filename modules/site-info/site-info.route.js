const siteInfo = require('./site-info.controller'),
  { router } = require('../../config/koa')

router.post('/site-infos', siteInfo.create)
  .get('/site-infos/:siteName/count', siteInfo.count)
  .get('/site-infos/:siteName', siteInfo.list)
