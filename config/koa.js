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
    app.use(async (ctx, next) => {
        ctx.set("Access-Control-Allow-Origin", "http://localhost:8082");
        ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
        ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
        ctx.set("Access-Control-Allow-Credentials", true);
        ctx.set("Access-Control-Max-Age", 300);
        ctx.set("Access-Control-Expose-Headers", "myData");
        await next();
    })
    app.use(bodyParser())
}

const initLog = () => {
    app.use(async (ctx, next) => {
        await next();
        console.log(`${ctx.method} ${ctx.url}`);
    });
}

const initPassport = () => {
    const files = glob.sync(path.resolve('./modules/*/*.passport.js'));
    files.forEach(file => require(file));
}

const initRoutes = () => {
    const files = glob.sync(path.resolve('./modules/*/*.route.js'));
    // load all router
    files.forEach(file => require(file));

    app.use(router.routes());
    console.log('routers all have been loaded');
}

const initErrorHandler = () => {
    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            console.error(JSON.stringify(err))
            ctx.response.status = err.resStatus || 500;
            ctx.response.body = {
                code: err.code,
                message: err.message
            };
        }
    });
}

app.on('error', function (err) {
    console.log('logging error ', err.message);
    console.log(err);
});

exports.init = () => {
    initMiddleware();
    initLog();
    // initPassport();
    initErrorHandler();
    initRoutes();
}
