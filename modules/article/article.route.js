const article = require('./article.controller')
const { checkIpIsInWhiteList, checkRoles } = require('../../tools/acl')

/**
 * getTags
 * @discription 获取所有标签
 * 
 * deleteTag
 * @discription 删除某个标签
 * @param tagId 删除的标签id
 *
 * comment
 * @discription 评论博客（废弃）同 POST /leaved-messages
 * 
 * deleteComment
 * @discription 删除评论（废弃）同 DELETE /leaved-messages/:id
 * 
 * addViewCount
 * @description 增加一次阅读
 * @param id 博客id
 * 
 * list
 * @description 获取列表
 * @query page 页数
 * @query perPage 每页的数量
 * @query tags? 标签
 * @query sort? 排序
 * 
 * read
 * @description 获取博客
 * @param id 博客id
 * 
 * create 
 * @description 创建博客
 * @body tags tag数组
 * @body 其他body请参考 article.model.js
 * 
 * update
 * @description 更新博客 参数同create
 * @param id 博客id
 * 
 * delete
 * @description 删除博客
 * @param id 博客id
 */
module.exports = router => {
  router
    .get('/articles/tags', article.getTags)
    .delete('/articles/tags/:tagId', checkRoles('admin'), article.deleteTag)
    .get('/articles', article.list)
    .get('/articles/:id', article.read)
    .post('/articles', checkRoles('admin'), article.create)
    .put('/articles/:id', checkRoles('admin'), article.update)
    .delete('/articles/:id', checkRoles('admin'), article.delete)
    .post('/articles/:id/view-count', checkIpIsInWhiteList, article.addViewCount)
}
