const childProcess = require('child_process'),
    Router = require('koa-router'),
    { app } = require('../config/koa')

const router = new Router()
router.post('/deploy/:projectName', (ctx, next) => {
    const { projextName } = ctx.params
    childProcess.exec(`sh ${projextName}.deploy.sh`)
    next()
})

app.use(router.routes())
