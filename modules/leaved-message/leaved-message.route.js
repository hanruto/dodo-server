const leavedMessage = require('./leaved-message.controller'),
  { router } = require('../../config/koa'),
  { checkRole } = require('../../tools/acl')

router.get('/leaved-messages', checkRole('admin'), leavedMessage.list)
  .post('/leaved-messages', checkRole('admin'), leavedMessage.create)
  .delete('/leaved-messages/:id', checkRole('admin'), leavedMessage.delete)
