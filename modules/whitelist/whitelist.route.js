const whitelistController = require('./whitelist.controller')

module.exports = router => {
  router
    .get('/whitelist', whitelistController.list)
    .post('/whitelist', whitelistController.add)
    .delete('/whitelist', whitelistController.remove)
}
