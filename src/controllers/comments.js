import { CommentModel } from '../models/sqlite/comments.js'
import { validateComment } from '../schemas/comment.js'

export class CommentsController {
  static async getByPostId (req, res) {
    const { id } = req.params
    const comments = await CommentModel.getById(id)

    if (comments.length !== 0) return res.json(comments)
    res.status(404).json({ message: 'Comments not found for this post' })
  }

  static async create (req, res) {
    const result = validateComment(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newComment = await CommentModel.create(result.data)
    res.status(201).json(newComment)
  }

  static async delete (req, res) {
    const { id } = req.params
    const deletedTweet = await CommentModel.delete(id)

    if (deletedTweet) return res.json(deletedTweet)
    res.status(404).json({ message: 'Tweet not found' })
  }
}
