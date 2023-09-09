import jwt from 'jsonwebtoken'

export const signToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '2h' })
}

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}
