import cors from 'cors'
import express, { json } from 'express'

import createAuthRouter from './routes/auth.js'
import createCommentsRouter from './routes/comments.js'
import createTweetRouter from './routes/tweets.js'
import createUserRouter from './routes/users.js'

import CommentModel from './models/sqlite/comments.js'
import TweetModel from './models/sqlite/tweets.js'
import UserModel from './models/sqlite/users.js'

const app = express()
app.use(json())
app.use(cors())
app.disable('x-powered-by')

// await connectToMongo()
app.use('/tweets', createTweetRouter(TweetModel))
app.use('/users', createUserRouter(UserModel))
app.use('/comments', createCommentsRouter(CommentModel))
app.use('/auth', createAuthRouter(UserModel))

export default app
