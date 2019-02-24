const article = require('./article.controller'),
  { checkRoles } = require('../../tools/acl')

module.exports = router => {
  router
    // 标签
    .get('/articles/tags', article.getTags)
    .delete('/articles/tags/:tagId', checkRoles('admin'), article.deleteTag)

    // 评论
    .put('/articles/:id/comment', article.comment)
    .delete('/articles/:id/comment/:commentId', checkRoles('admin'), article.deleteComment)

    // 阅读
    .put('/articles/:id/view-count', article.addViewCount)

    // 文章管理
    .get('/articles', article.list)
    .get('/articles/:id', article.read)
    .post('/articles', checkRoles('admin'), article.create)
    .put('/articles/:id', checkRoles('admin'), article.update)
    .delete('/articles/:id', checkRoles('admin'), article.delete)
}
