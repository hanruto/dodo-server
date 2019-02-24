const admin = require('./admin.controller'),
  { checkRoles } = require('../../tools/acl')

module.exports = router => {
  router
    .get('/admins', checkRoles('admin'), admin.list)
    .post('/admins', checkRoles('superuser'), admin.create)
    .put('/admins/:id', checkRoles('superuser'), admin.update)
    .delete('/admins/:id', checkRoles('superuser'), admin.delete)
    .get('/admins/info', admin.getInfo)
    .post('/login', admin.login)
    .get('/signout', admin.signout)
}
