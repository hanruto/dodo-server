const article = require('./article.controller'),
  { router } = require('../../config/koa'),
  { checkRole } = require('../../tools/acl')

router
  // 标签
  .get('/articles/tags', article.getTags)
  .delete('/articles/tags/:tagId', checkRole('admin'), article.deleteTag)

  // 评论
  .put('/articles/:id/comment', article.comment)
  .delete('/articles/:id/comment/:commentId', checkRole('admin'), article.deleteComment)

  // 阅读
  .put('/articles/:id/view-count', article.addViewCount)

  // 文章管理
  .get('/articles', article.list)
  .get('/articles/:id', article.read)
  .post('/articles', checkRole('admin'), article.create)
  .put('/articles/:id', checkRole('admin'), article.update)
  .delete('/articles/:id', checkRole('admin'), article.delete)