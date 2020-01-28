const commentController = require('./comment.controller')

module.exports = router => {
  router
    .get('/comments', commentController.getComments)
    .post('/comments', commentController.comment)
    .delete('/comments/:id', commentController.deleteComments)
}
