const Koa = require('koa'),
    bodyParser = require('koa-bodyparser'),
    path = require('path'),
    Router = require('koa-router'),
    glob = require('glob');

const app = new Koa();
const router = new Router();

router.prefix('/api/v1')
// 单例模式，全局公用同一个app和router
exports.app = app;
exports.router = router;

const initMiddleware = () => {
    app.use(bodyParser())
}

const initLog = () => {
    app.use(async (ctx, next) => {
        await next();
        console.log(`${ctx.method} ${ctx.url}`);
    });
}

const initRoutes = () => {
    const filesPattern = path.resolve('./modules/*/*.route.js');
    const files = glob.sync(filesPattern);
    // load all router
    files.forEach(file => require(file));

    app.use(router.routes());
    console.log('routers all have been loaded');
}

exports.init = () => {
    initMiddleware();
    initLog();
    initRoutes();
}
