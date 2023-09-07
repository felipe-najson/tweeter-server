import { UserModel } from '../models/sqlite/users.js'
import { validateUser } from '../schemas/user.js'

export class UserController {
  static async getById (req, res) {
    const { id } = req.params
    const user = await UserModel.getById(id)

    if (!user || user.length === 0) { res.status(404).json({ message: 'User not found' }) }

    return res.json(user)
  }

  static async create (req, res) {
    const result = validateUser(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newUser = await UserModel.create(result.data)
    res.status(201).json(newUser)
  }

  static async delete (req, res) {
    const { id } = req.params
    const deletedTweet = await UserModel.delete(id)

    if (deletedTweet) return res.json(deletedTweet)
    res.status(404).json({ message: 'Tweet not found' })
  }
}
