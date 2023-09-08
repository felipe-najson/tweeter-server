import { Router } from 'express'
import { CommentsController } from '../controllers/comments.js'

export const commentsRouter = Router()

commentsRouter.get('/:id', CommentsController.getByPostId)
commentsRouter.post('/', CommentsController.create)
commentsRouter.delete('/:id', CommentsController.delete)
