import { TweetModel } from '../models/sqlite/tweets.js'
import { validateLike, validateBookmark, validateRetweet } from '../schemas/actions.js'
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

    if (tweets && tweets.length !== 0) return res.json(tweets)
    res.status(404).json({ message: 'Invalid tweet id' })
  }

  static async create (req, res) {
    const userId = req.userId
    const result = validateTweet(req.body)
    if (!result.success) { return res.status(400).json({ error: JSON.parse(result.error.message) }) }

    const newTweet = await TweetModel.create({ userId, ...result.data })
    res.status(201).json(newTweet)
  }

  static async delete (req, res) {
    const { id } = req.params
    const deletedTweet = await TweetModel.delete(id)

    if (deletedTweet) return res.json(deletedTweet)
    res.status(404).json({ message: 'Tweet not found' })
  }

  static async like (req, res) {
    const userId = req.userId
    const result = validateLike(req.body)
    if (!result.success) { return res.status(400).json({ error: JSON.parse(result.error.message) }) }

    const tweet = await TweetModel.getById(result.data.tweetId)
    if (!tweet || tweet.length === 0) { return res.status(404).json({ message: 'Tweet not found' }) }

    if (result.data.isLiked) {
      const updatedTweet = await TweetModel.removeLike({ userId, ...result.data })
      return res.json(updatedTweet)
    }

    const updatedTweet = await TweetModel.addLike({ userId, ...result.data })
    res.json(updatedTweet)
  }

  static async bookmark (req, res) {
    const userId = req.userId
    const result = validateBookmark(req.body)
    if (!result.success) { return res.status(400).json({ error: JSON.parse(result.error.message) }) }

    const tweet = await TweetModel.getById(result.data.tweetId)
    if (!tweet || tweet.length === 0) { return res.status(404).json({ message: 'Tweet not found' }) }

    if (result.data.isBookmarked) {
      const updatedTweet = await TweetModel.removeBookmark({ userId, ...result.data })
      return res.json(updatedTweet)
    }

    const updatedTweet = await TweetModel.bookmarkTweet({ userId, ...result.data })
    res.json(updatedTweet)
  }

  static async retweet (req, res) {
    const userId = req.userId
    const result = validateRetweet(req.body)
    if (!result.success) { return res.status(400).json({ error: JSON.parse(result.error.message) }) }

    const tweet = await TweetModel.getById(result.data.tweetId)
    if (!tweet || tweet.length === 0) { return res.status(404).json({ message: 'Tweet not found' }) }

    if (result.data.isRetweeted) {
      const updatedTweet = await TweetModel.removeRetweet({ userId, ...result.data })
      return res.json(updatedTweet)
    }

    const updatedTweet = await TweetModel.retweet({ userId, ...result.data })
    res.json(updatedTweet)
  }
}
