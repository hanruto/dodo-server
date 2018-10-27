const leavedMessage = require('./leaved-message.controller'),
    { router } = require('../../config/koa')

router.get('/leaved-messages', leavedMessage.list)
    .post('/leaved-messages', leavedMessage.create)
    .delete('/leaved-messages/:id', leavedMessage.delete)
