import { Router } from 'express'
import { UserController } from '../controllers/users.js'
import checkAuth from '../middlewares/auth.js'

export const usersRouter = Router()

usersRouter.get('/:id', checkAuth, UserController.getById)
usersRouter.put('/follow', checkAuth, UserController.followUser)
