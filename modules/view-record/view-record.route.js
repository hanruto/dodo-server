const viewRecord = require('./view-record.controller'),
  { router } = require('../../config/koa')

router.post('/view-records', viewRecord.create)
  .get('/view-records/:siteName/count', viewRecord.count)
  .get('/view-records/:siteName', viewRecord.list)
