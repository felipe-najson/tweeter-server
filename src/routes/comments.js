import { Router } from 'express'
import { CommentsController } from '../controllers/comments.js'
import checkAuth from '../middlewares/auth.js'

export const commentsRouter = Router()

commentsRouter.get('/:id', checkAuth, CommentsController.getByPostId)
commentsRouter.post('/', checkAuth, CommentsController.create)
commentsRouter.delete('/:id', checkAuth, CommentsController.delete)
