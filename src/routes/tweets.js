import { Router } from 'express'
import { TweetController } from '../controllers/tweets.js'
import checkAuth from '../middlewares/auth.js'

export const tweetsRouter = Router()

tweetsRouter.get('/', checkAuth, TweetController.get)
tweetsRouter.get('/:id', checkAuth, TweetController.getById)
tweetsRouter.post('/', checkAuth, TweetController.create)
tweetsRouter.put('/like', checkAuth, TweetController.like)
tweetsRouter.put('/bookmark', checkAuth, TweetController.bookmark)
tweetsRouter.put('/retweet', checkAuth, TweetController.retweet)
