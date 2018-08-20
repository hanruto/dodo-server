const Koa = require('koa'),
    path = require('path'),
    glob = require('glob');

const initLog = app => {
    app.use(async (ctx, next) => {
        await next();
        const rt = ctx.response.get('X-Response-Time');
        console.log(`${ctx.method} ${ctx.url} - ${rt}`);
    });
}

const initRoute = app => {
    const filesPattern = path.resolve('./modules/*/*.route.js');
    const files = glob.sync(filesPattern);
    files.forEach(file => app.use(require(file)));
    console.log('routers all have been loaded');
}

exports.init = () => {
    const app = new Koa();
    initLog(app);
    initRoute(app);
    return app;
}
