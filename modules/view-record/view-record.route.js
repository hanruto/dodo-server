const viewRecord = require('./view-record.controller'),
  { checkRoles } = require('../../tools/acl')

module.exports = router => {
  router
    .post('/view-records', viewRecord.create)
    .get('/view-records/:siteName/count', viewRecord.count)
    .get('/view-records/analysis', checkRoles('admin'), viewRecord.analyze)
    .get('/view-records', checkRoles('admin'), viewRecord.list)
}
