import { TweetModel } from '../models/sqlite/tweets.js'
import { validateTweet } from '../schemas/tweets.js'

export class TweetController {
  static async getAll (_req, res) {
    const tweets = await (await TweetModel.getAll()).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
    res.json(tweets)
  }

  static async getById (req, res) {
    const { id } = req.params
    const tweets = await TweetModel.getById(id)

    if (tweets.length !== 0) return res.json(tweets)
    res.status(404).json({ message: 'Tweets not found for this user' })
  }

  static async create (req, res) {
    const result = validateTweet(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newTweet = await TweetModel.create(result.data)
    res.status(201).json(newTweet)
  }

  static async delete (req, res) {
    const { id } = req.params
    const deletedTweet = await TweetModel.delete(id)

    if (deletedTweet) return res.json(deletedTweet)
    res.status(404).json({ message: 'Tweet not found' })
  }
}
