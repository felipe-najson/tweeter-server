import { Router } from 'express'
import AuthController from '../controllers/auth.js'
import checkAuth from '../middlewares/auth.js'

const createAuthRouter = (userModel) => {
  const authRouter = Router()
  const authController = new AuthController(userModel)

  authRouter.post('/login', authController.login)
  authRouter.post('/register', authController.register)
  authRouter.get('/', checkAuth, authController.getAuthenticatedUser)

  return authRouter
}

export default createAuthRouter
