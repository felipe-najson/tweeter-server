import { Router } from 'express'
import checkAuth from '../middlewares/auth.js'
import CommentsController from '../controllers/comments.js'

const createCommentsRouter = (commentsModel) => {
  const commentsRouter = Router()
  const commentsController = new CommentsController(commentsModel)

  commentsRouter.get('/:id', checkAuth, commentsController.getByPostId)
  commentsRouter.post('/', checkAuth, commentsController.create)
  commentsRouter.delete('/:id', checkAuth, commentsController.delete)

  return commentsRouter
}

export default createCommentsRouter
