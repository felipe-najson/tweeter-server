import { Router } from 'express'
import { TweetController } from '../controllers/tweets.js'

export const tweetsRouter = Router()

tweetsRouter.get('/', TweetController.getAll)
tweetsRouter.get('/:id', TweetController.getById)
tweetsRouter.post('/', TweetController.create)
tweetsRouter.put('/like', TweetController.addLike)
