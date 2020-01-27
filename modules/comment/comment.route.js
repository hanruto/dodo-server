const commentController = require('./comment.controller')

module.exports = router => {
  router
    // 标签
    .get('/comments', commentController.getComments)
    .post('/comments', commentController.comment)
}
