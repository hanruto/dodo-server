const article = require('./article.controller'),
    Router = require('koa-router'),
    router = new Router();

router.get('/articles', article.list)
    .get('/articles/:id', article.read)
    .post('/articles', article.create)
    .put('/articles/:id', article.update)
    .delete('/articles/:id', article.delete);

module.exports = router.routes();
