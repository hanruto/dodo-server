const mongoose = require('mongoose'),
  Comment = mongoose.model('comment')

module.exports = {
  async comment(ctx) {
    const info = ctx.request.body
    const comment = new Comment(info)
    await comment.save()

    ctx.body = { success: true }
  },

  async getComments(ctx) {
    const { page, perPage, ...query } = ctx.query
    const skip = (page - 1) * perPage
    const limit = Number(perPage)
    const comments = await Comment
      .find(query)
      .limit(limit)
      .skip(skip)
      .sort('-created')
      .populate('blogId')
    const total = await Comment.count(query)

    ctx.body = { success: true, data: { list: comments, total } }
  },

  async deleteComments(ctx) {
    const id = ctx.params.id
    await Comment.findByIdAndRemove(id)

    ctx.body = { success: true }
  },
}
