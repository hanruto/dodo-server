const leavedMessage = require('./leaved-message.controller'),
  { checkRoles } = require('../../tools/acl')

module.exports = router => {
  router
    .get('/leaved-messages', leavedMessage.list)
    .post('/leaved-messages', checkRoles('user'), leavedMessage.create)
    .delete('/leaved-messages/:id', checkRoles('admin'), leavedMessage.delete)
}
