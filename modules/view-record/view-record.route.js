const viewRecord = require('./view-record.controller'),
  { checkRole } = require('../../tools/acl')

module.exports = router => {
  router
    .post('/view-records', viewRecord.create)
    .get('/view-records/:siteName/count', viewRecord.count)
    .get('/view-records', checkRole('admin'), viewRecord.list)
}
