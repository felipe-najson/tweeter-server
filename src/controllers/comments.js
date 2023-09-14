import { validateComment } from '../schemas/comment.js'

export default class CommentsController {
  constructor (commentModel) {
    this.commentModel = commentModel
  }

  getByPostId = async (req, res) => {
    const { id } = req.params
    const comments = await this.commentModel.getById(id)

    if (comments.length !== 0) return res.json(comments)
    res.status(404).json({ message: 'Comments not found for this post' })
  }

  create = async (req, res) => {
    const result = validateComment(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newComment = await this.commentModel.create(result.data)
    res.status(201).json(newComment)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const deletedTweet = await this.commentModel.delete(id)

    if (deletedTweet) return res.json(deletedTweet)
    res.status(404).json({ message: 'Tweet not found' })
  }
}
