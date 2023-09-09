import { UserModel } from '../models/sqlite/users.js'

export class UserController {
  static async getById (req, res) {
    const { id } = req.params
    const user = await UserModel.getById(id)

    if (!user || user.length === 0) { return res.status(404).json({ message: 'User not found' }) }

    return res.json(user)
  }

  static async delete (req, res) {
    const { id } = req.params
    const deletedTweet = await UserModel.delete(id)

    if (deletedTweet) return res.json(deletedTweet)
    res.status(404).json({ message: 'Tweet not found' })
  }
}
