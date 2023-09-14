import { validateLike, validateBookmark, validateRetweet } from '../schemas/actions.js'
import { validateTweet } from '../schemas/tweets.js'
export default class TweetController {
  constructor (tweetModel) {
    this.tweetModel = tweetModel
  }

  get = async (req, res) => {
    const tweets = await this.tweetModel.getAll(req.userId, req.query)
    res.json(tweets)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const tweets = await this.tweetModel.getById(id)

    if (tweets && tweets.length !== 0) return res.json(tweets)
    res.status(404).json({ message: 'Invalid tweet id' })
  }

  create = async (req, res) => {
    const userId = req.userId
    const result = validateTweet(req.body)
    if (!result.success) { return res.status(400).json({ error: JSON.parse(result.error.message) }) }

    const newTweet = await this.tweetModel.create({ userId, ...result.data })
    res.status(201).json(newTweet)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const deletedTweet = await this.tweetModel.delete(id)

    if (deletedTweet) return res.json(deletedTweet)
    res.status(404).json({ message: 'Tweet not found' })
  }

  like = async (req, res) => {
    const userId = req.userId
    const result = validateLike(req.body)
    if (!result.success) { return res.status(400).json({ error: JSON.parse(result.error.message) }) }

    const tweet = await this.tweetModel.getById(result.data.tweetId)
    if (!tweet || tweet.length === 0) { return res.status(404).json({ message: 'Tweet not found' }) }

    if (result.data.isLiked) {
      const updatedTweet = await this.tweetModel.removeLike({ userId, ...result.data })
      return res.json(updatedTweet)
    }

    const updatedTweet = await this.tweetModel.addLike({ userId, ...result.data })
    res.json(updatedTweet)
  }

  bookmark = async (req, res) => {
    const userId = req.userId
    const result = validateBookmark(req.body)
    if (!result.success) { return res.status(400).json({ error: JSON.parse(result.error.message) }) }

    const tweet = await this.tweetModel.getById(result.data.tweetId)
    if (!tweet || tweet.length === 0) { return res.status(404).json({ message: 'Tweet not found' }) }

    if (result.data.isBookmarked) {
      const updatedTweet = await this.tweetModel.removeBookmark({ userId, ...result.data })
      return res.json(updatedTweet)
    }

    const updatedTweet = await this.tweetModel.bookmarkTweet({ userId, ...result.data })
    res.json(updatedTweet)
  }

  retweet = async (req, res) => {
    const userId = req.userId
    const result = validateRetweet(req.body)
    if (!result.success) { return res.status(400).json({ error: JSON.parse(result.error.message) }) }

    const tweet = await this.tweetModel.getById(result.data.tweetId)
    if (!tweet || tweet.length === 0) { return res.status(404).json({ message: 'Tweet not found' }) }

    if (result.data.isRetweeted) {
      const updatedTweet = await this.tweetModel.removeRetweet({ userId, ...result.data })
      return res.json(updatedTweet)
    }

    const updatedTweet = await this.tweetModel.retweet({ userId, ...result.data })
    res.json(updatedTweet)
  }
}
