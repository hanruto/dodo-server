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
    const query = ctx.query
    const comments = await Comment.find(query).sort('-created')

    ctx.body = { success: true, data: comments }
  },
}
