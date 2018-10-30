const article = require('./article.controller'),
    { router } = require('../../config/koa')

router.get('/articles', article.list)
    .get('/articles/tags', article.getTags)
    .post('/articles', article.create)
    .get('/articles/:id', article.read)
    .put('/articles/:id', article.update)
    .delete('/articles/:id', article.delete)
    .put('/articles/:id/comment', article.comment)
    .delete('/articles/:id/comment/:commentId', article.deleteComment)
