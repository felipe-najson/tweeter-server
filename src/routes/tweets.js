import { Router } from 'express'
import TweetController from '../controllers/tweets.js'
import checkAuth from '../middlewares/auth.js'

const createTweetRouter = (tweetModel) => {
  const tweetsRouter = Router()
  const tweetController = new TweetController(tweetModel)

  tweetsRouter.get('/', checkAuth, tweetController.get)
  tweetsRouter.get('/:id', checkAuth, tweetController.getById)
  tweetsRouter.post('/', checkAuth, tweetController.create)
  tweetsRouter.put('/like', checkAuth, tweetController.like)
  tweetsRouter.put('/bookmark', checkAuth, tweetController.bookmark)
  tweetsRouter.put('/retweet', checkAuth, tweetController.retweet)

  return tweetsRouter
}

export default createTweetRouter
