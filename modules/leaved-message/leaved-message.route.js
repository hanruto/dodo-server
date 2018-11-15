const leavedMessage = require('./leaved-message.controller'),
  { router } = require('../../config/koa'),
  { checkRole } = require('../../tools/acl')

router.get('/leaved-messages', leavedMessage.list)
  .post('/leaved-messages', leavedMessage.create)
  .delete('/leaved-messages/:id', checkRole('admin'), leavedMessage.delete)
