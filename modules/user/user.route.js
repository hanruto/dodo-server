const userController = require('./user.controller'),
  { checkRoles } = require('../../tools/acl')


/**
 * checkEmailAndSendCode
 * @discription 发送验证码
 * @body email 邮箱地址
 * 
 * login
 * @discription 登录
 * @body username
 * @body password 
 * 
 * signUp
 * @description 注册
 * @body email
 * @body code
 * @body password
 * @body confirmPassword
 * @body username
 * 
 * list
 * description 列表
 * @query page
 * @query perPage
 * 
 * getInfo
 * description 查自己的信息
 * 
 * remove
 * description 管理员删除用户
 * @param id 用户id
 */

module.exports = router => {
  router
    .post('/users/sign-up/check', userController.checkEmailAndSendCode)
    .post('/users/login', userController.login)
    .post('/users', userController.signUp)
    .get('/users', checkRoles('admin'), userController.list)
    .get('/users/info', checkRoles('user'), userController.getInfo)
    .delete('/users/:id', checkRoles('superuser'), userController.remove)
}
