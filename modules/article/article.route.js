const article = require('./article.controller'),
    { router } = require('../../config/koa');

router.get('/articles', article.list)
    .post('/articles', article.create)
    .get('/articles/:id', article.read)
    .put('/articles/:id', article.update)
    .delete('/articles/:id', article.delete);

