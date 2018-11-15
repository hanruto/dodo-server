const article = require('./article.controller'),
  { router } = require('../../config/koa'),
  { checkRole } = require('../../tools/acl')

router
  // 标签
  .get('/articles/tags', article.getTags)
  .delete('/articles/tags/:tagId', article.deleteTag)

  // 评论
  .put('/articles/:id/comment', article.comment)
  .delete('/articles/:id/comment/:commentId', checkRole('admin'), article.deleteComment)

  // 文章管理
  .get('/articles', article.list)
  .post('/articles', checkRole('admin'), article.create)
  .get('/articles/:id', article.read)
  .put('/articles/:id', article.update)
  .delete('/articles/:id', checkRole('admin'), article.delete)