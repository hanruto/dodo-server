const childProcess = require('child_process'),
    Router = require('koa-router'),
    { app } = require('../config/koa')

const router = new Router()
router.post('/api/deploy/:projectName', (ctx) => {
    const { projectName } = ctx.params
    childProcess.exec(`sh /project/${projectName}/deploy.sh`)
    ctx.body = '部署成功'
})

app.use(router.routes())
    .use(router.allowedMethods())
