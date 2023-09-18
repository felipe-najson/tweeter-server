import { validateUser } from '../schemas/user.js'
import { compare, encrypt } from '../helpers/bycrpt.js'
import { signToken } from '../helpers/jwt.js'

export default class AuthController {
  constructor (userModel) {
    this.userModel = userModel
  }

  login = async (req, res) => {
    const { username, password } = req.body
    const user = await this.userModel.getByUsername(username)

    if (!user) return res.status(404).json({ message: 'User not found' })

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) return res.status(400).json({ message: 'Invalid password' })

    const token = signToken({ id: user.id, username: user.username })
    res.json({ token })
  }

  register = async (req, res) => {
    const result = validateUser(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const user = await this.userModel.getByUsername(result.data.username)
    if (user) return res.status(400).json({ message: 'Username already exists' })

    const hashedPassword = await encrypt(result.data.password)
    const newUser = await this.userModel.create({ ...result.data, password: hashedPassword })
    res.status(201).json(newUser)
  }

  getAuthenticatedUser = async (req, res) => {
    const id = req.userId
    const user = await this.userModel.getById(id)

    if (!user || user.length === 0) { return res.status(404).json({ message: 'User not found' }) }

    return res.json(user)
  }
}
