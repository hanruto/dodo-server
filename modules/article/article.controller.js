const mongoose = require('mongoose'),
  Article = mongoose.model('article'),
  ArticleTag = mongoose.model('article-tag'),
  LeavedMessage = mongoose.model('leaved-message')

const getTagIds = async tags => {
  if (!tags) return null

  const gettedTags = await Promise.all(
    tags.map(tag => {
      let _id = tag._id
      if (_id) return tag

      return ArticleTag.findOne(tag).then(findTag => findTag || ArticleTag.create(tag))
    })
  )

  return gettedTags.map(tag => tag._id)
}

module.exports = {
  async list(ctx) {
    const { perPage = 15, page = 1, tags, sort, type } = ctx.query

    const query = {}
    if (tags) query.tags = { $in: tags }
    if (type) query.type = type

    const getData = Article.find(query)
      .select('-content')
      .sort(sort || '-created')
      .skip((page - 1) * perPage)
      .limit(Number(perPage))

    const getCount = Article.count(query)
    const [list, count] = await Promise.all([getData, getCount])
    ctx.body = { success: true, data: { list, perPage, page, count } }
  },

  async read(ctx) {
    const article = await Article.findById(ctx.params.id)
      .populate('author', ['nickname', 'email', 'username'])
      .populate('tags')

    ctx.body = { success: true, data: article }
  },

  async create(ctx) {
    const articleContent = ctx.request.body
    articleContent.tags = await getTagIds(articleContent.tags)
    const article = await Article.create(Object.assign(articleContent, { author: ctx.state.user._id }))
    ctx.body = { success: true, data: article, message: '保存成功' }
  },

  async update(ctx) {
    const articleContent = ctx.request.body
    articleContent.tags = await getTagIds(articleContent.tags)
    const article = await Article.findByIdAndUpdate(ctx.params.id, articleContent, { new: true })
    ctx.body = { success: true, data: article, message: '修改成功' }
  },

  async delete(ctx) {
    await Article.deleteOne({ _id: ctx.params.id })
    ctx.body = { success: true }
  },

  async comment(ctx) {
    const comment = ctx.request.body
    const leavedMessage = await LeavedMessage.create(comment)
    ctx.body = { success: true, data: leavedMessage }
  },

  async getTags(ctx) {
    const tags = await ArticleTag.find()
    ctx.body = { success: true, data: tags }
  },

  async getComments(ctx) {
    const { id } = ctx.params
    console.log(id)
  },

  async deleteTag(ctx) {
    const { tagId } = ctx.params
    await ArticleTag.remove({ _id: tagId })
    ctx.body = { success: true }
  },
}
