import { UserModel } from '../models/sqlite/users.js'
import { validateUser } from '../schemas/user.js'
import { compare, encrypt } from '../helpers/bycrpt.js'
import { signToken } from '../helpers/jwt.js'

export class AuthController {
  static async login (req, res) {
    const { username, password } = req.body
    const user = await UserModel.getByUsername(username)

    if (!user) return res.status(404).json({ message: 'User not found' })

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) return res.status(400).json({ message: 'Invalid password' })

    const token = signToken(user)
    res.json({ token })
  }

  static async register (req, res) {
    const result = validateUser(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const user = await UserModel.getByUsername(result.data.username)
    if (user) return res.status(400).json({ message: 'Username already exists' })

    const hashedPassword = await encrypt(result.data.password)
    const newUser = await UserModel.create({ ...result.data, password: hashedPassword })
    res.status(201).json(newUser)
  }
}
