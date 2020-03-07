const robotChatController = require('./robot-chat.controller')
const { checkIpIsInWhiteList } = require('../../tools/acl')

module.exports = router => {
  router
    .get('/robot-chats', robotChatController.getChats)
    .get('/robot-chats/key/:key', robotChatController.getChatByKey)
    .get('/robot-chats/:id', robotChatController.getChatById)
    .post('/robot-chats/:id', robotChatController.updateChat)
    .post('/robot-chats/:id/view', checkIpIsInWhiteList, robotChatController.addViewCount)
    .post('/robot-chats', robotChatController.createChat)
    .delete('/robot-chats/drop', robotChatController.drop)
    .delete('/robot-chats/:id', robotChatController.deleteChat)
}
