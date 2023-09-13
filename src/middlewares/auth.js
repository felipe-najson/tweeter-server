import { verifyToken } from '../helpers/jwt.js'

const checkAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const user = verifyToken(token)
    req.userId = user.id
    next()
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

export default checkAuth
