const admin = require('./admin.controller'),
    { checkRole } = require('../../tools/acl'),
    { router } = require('../../config/koa');

router.get('/admins', checkRole('admin'), admin.list)
    .post('/admins', checkRole('superuser'), admin.create)
    .put('/admins/:id', checkRole('superuser'), admin.update)
    .delete('/admins/:id', checkRole('superuser'), admin.delete)
    .post('/login', admin.login)
    .get('/signout', admin.signout);
