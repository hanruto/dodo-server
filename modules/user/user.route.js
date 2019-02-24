const userController = require('./user.controller'),
  { checkRole } = require('../../tools/acl'),
  passport = require('koa-passport')

module.exports = router => {
  router
    .post('/users/sign-up/check', userController.checkEmailAndSendCode)
    .post('/users/login', userController.login)
    .post('/users', userController.signUp)
    .get('/users', checkRole('admin'), userController.list)
    .get('/users/info', passport.authenticate('jwt', { session: false }), userController.getInfo)
}
