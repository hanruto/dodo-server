const admin = require('./admin.controller'),
  { checkRoles } = require('../../tools/acl')

/**
 * list
 * @discription 管理员列表
 * 
 * create
 * @discription 创建管理员
 * @body 参考model
 *
 * update
 * @discription 更新管理员信息
 * @param id 博客id
 * @body 参考modal
 * 
 * login
 * @discription 登录
 * @body username
 * @body password 
 * 
 * signout
 * @description 登出
 */
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
