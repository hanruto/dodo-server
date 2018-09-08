const Koa = require('koa'),
    bodyParser = require('koa-bodyparser'),
    path = require('path'),
    Router = require('koa-router'),
    cors = require('koa-cors'),
    session = require('koa-session'),
    glob = require('glob')

const app = new Koa()
const router = new Router()

app.keys = ['secret']
router.prefix('/api/v1')
// 单例模式，全局公用同一个app和router
exports.app = app
exports.router = router

const initMiddleware = () => {
    app.use(cors({ credentials: true }))
    app.use(session({
        key: 'koa-server',
        maxAge: 1000 * 60 * 60 * 24 * 7
    }, app))
    app.use(bodyParser())
}

const initLog = () => {
    app.use(async (ctx, next) => {
        const start = Date.now()
        await next()
        const ms = Date.now() - start
        console.log(`${ctx.method} ${ctx.status} ${ctx.url} - ${ms} ms`)
    })
}

const initDeploy = () => {
    require('../deploy')
}

const initPassport = () => {
    const files = glob.sync(path.resolve('./modules/*/*.passport.js'))
    files.forEach(file => require(file))
}

const initRoutes = () => {
    const files = glob.sync(path.resolve('./modules/*/*.route.js'))
    files.forEach(file => require(file))
    app.use(router.routes())
        .use(router.allowedMethods())
    console.log('routers all have been loaded')
}

const initErrorHandler = () => {
    app.use(async (ctx, next) => {
        try {
            await next()
        } catch (err) {
            console.log(JSON.stringify(err))
            let message,
                status

            if (err.name === 'ValidationError') {
                message = err.errors.content.message
                status = 200
            } else {
                message = err.message
                status = 200
            }

            ctx.response.status = status
            ctx.response.body = {
                success: false,
                code: err.code,
                message: message
            }
        }
    })
}

app.on('error', function (err) {
    console.log('logging error ', err.message)
    console.log(err)
})

exports.init = () => {
    initLog()
    initErrorHandler()
    initMiddleware()
    initPassport()
    initRoutes()
    initDeploy()
}
