const robotChatController = require('./robot-chat.controller')

module.exports = router => {
  router
    .get('/robot-chat', robotChatController.getChat)
    .post('/robot-chat', robotChatController.updateChat)
}
