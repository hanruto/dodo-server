const article = require('./article.controller'),
  { router } = require('../../config/koa'),
  { checkRole } = require('../../tools/acl')

router.get('/articles', article.list)
  .get('/articles/tags', article.getTags)
  .post('/articles', checkRole('admin'), article.create)
  .get('/articles/:id', article.read)
  .put('/articles/:id', article.update)
  .delete('/articles/:id', checkRole('admin'), article.delete)
  .put('/articles/:id/comment', article.comment)
  .delete('/articles/:id/comment/:commentId', checkRole('admin'),article.deleteComment)
