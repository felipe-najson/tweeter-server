import cors from 'cors'
import express, { json } from 'express'
import { tweetsRouter } from './routes/tweets.js'
import { usersRouter } from './routes/users.js'
import { connectToMongo } from './startup/db.js'

const app = express()
app.use(json())
app.use(cors())
app.disable('x-powered-by')

await connectToMongo()
app.use('/tweets', tweetsRouter)
app.use('/users', usersRouter)

export default app
