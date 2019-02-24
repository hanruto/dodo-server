const userController = require('./user.controller'),
  { checkRoles } = require('../../tools/acl')

module.exports = router => {
  router
    .post('/users/sign-up/check', userController.checkEmailAndSendCode)
    .post('/users/login', userController.login)
    .post('/users', userController.signUp)
    .get('/users', checkRoles('admin'), userController.list)
    .get('/users/info', checkRoles('user'), userController.getInfo)
}
