import { Router } from 'express'
import checkAuth from '../middlewares/auth.js'
import UserController from '../controllers/users.js'

const createUserRouter = (userModel) => {
  const usersRouter = Router()
  const userController = new UserController(userModel)

  usersRouter.get('/', checkAuth, userController.get)
  usersRouter.get('/:id', checkAuth, userController.getById)
  usersRouter.put('/follow', checkAuth, userController.followUser)

  return usersRouter
}

export default createUserRouter
