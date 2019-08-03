const leavedMessage = require('./leaved-message.controller'),
  { checkRoles } = require('../../tools/acl')

/**
 * list
 * @discription 获取留言
 * @query perPage 每页多少跳
 * @query page 第几页
 * 
 * create
 * @discription 创建留言
 * @body blog 博客_id
 * @body message 留言内容
 *
 * delete
 * @discription 删除留言
 * @param _id 留言id
 * 
 * reply
 * @discription 回复留言
 * @body reply 回复的留言_id
 * @body blog 博客id
 * @body message 回复内容
 */

module.exports = router => {
  router
    .get('/leaved-messages', leavedMessage.list)
    .post('/leaved-messages', checkRoles('user'), leavedMessage.create)
    .delete('/leaved-messages/:id', checkRoles('admin'), leavedMessage.delete)
    .post('/leaved-messages/reply', checkRoles('admin'), leavedMessage.reply)
}
