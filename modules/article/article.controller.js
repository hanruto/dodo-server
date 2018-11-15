const mongoose = require('mongoose'),
  Article = mongoose.model('article'),
  ArticleTag = mongoose.model('article-tag')


module.exports = {
  async list(ctx) {
    const { perPage = 15, page = 1 } = ctx.query
    const getData = Article.find()
      .sort('-created')
      .skip((page - 1) * perPage)
      .limit(Number(perPage))
      // .populate('tags')
      // .populate('author')
      

    const getCount = Article.count()
    const [list, count] = await Promise.all([getData, getCount])
    ctx.body = { success: true, data: { list, perPage, page, count }, }
  },

  async read(ctx) {
    const article = await Article.findById(ctx.params.id)
      .populate('author')
      .populate('tags')

    ctx.body = { success: true, data: article }
  },

  async create(ctx) {
    const articleContent = ctx.request.body

    const tags = articleContent.tags || []

    const gettedTags = await Promise.all(tags.map(tag => {
      let _id = tag._id
      if (_id) return tag

      return ArticleTag.findOne(tag)
        .then(findTag => {
          return findTag || ArticleTag.create(tag)
        })
    }))

    articleContent.tags = gettedTags.map(tag => tag._id)
    const article = await Article.create(Object.assign(articleContent, { author: ctx.state.user._id }))
    ctx.body = { success: true, data: article, message: '保存成功' }
  },

  async update(ctx) {
    const article = await Article.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true })
    ctx.body = { success: true, data: article }
  },

  async delete(ctx) {
    await Article.deleteOne({ _id: ctx.params.id })
    ctx.body = { success: true }
  },

  async comment(ctx) {
    const comment = ctx.request.body

    const article = await Article.findById({ _id: ctx.params.id })

    article.comments.push(comment)
    const updatedArticle = await article.save()
      .catch(err => { throw new Error(err) })

    ctx.body = { success: true, data: updatedArticle }
  },

  async deleteComment(ctx) {
    const { id, commentId } = ctx.params
    const article = await Article.findById({ _id: id })
    article.comments = article.comments.filter(comment => comment._id.toString() !== commentId)

    const updatedArticle = await article.save()

    ctx.body = { success: true, data: updatedArticle }
  },

  async getTags(ctx) {
    const tags = await ArticleTag.find()
    ctx.body = { success: true, data: tags }
  }
}