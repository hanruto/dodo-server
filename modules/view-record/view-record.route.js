const viewRecord = require('./view-record.controller'),
  { checkRoles } = require('../../tools/acl')

/**
 * create
 * @discription 创建浏览记录
 * @body siteName 站点
 * @body info 备注
 * 
 * count
 * @discription 统计总数
 *
 * analyze
 * @discription 计算uv, pv
 * @query start 开始日期
 * @query end 结束日期
 * 
 * list
 * @discription 获取列表
 * @query offset 开始的index
 * @query limit 结束的index
 */

module.exports = router => {
  router
    .post('/view-records', viewRecord.create)
    .get('/view-records/:siteName/count', viewRecord.count)
    .get('/view-records/analysis', checkRoles('admin'), viewRecord.analyze)
    .get('/view-records', checkRoles('admin'), viewRecord.list)
}
