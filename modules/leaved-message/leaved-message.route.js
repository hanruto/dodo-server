const leavedMessage = require('./leaved-message.controller'),
  { checkRole } = require('../../tools/acl')

module.exports = router => {
  router
    .get('/leaved-messages', leavedMessage.list)
    .post('/leaved-messages', leavedMessage.create)
    .delete('/leaved-messages/:id', checkRole('admin'), leavedMessage.delete)
}
