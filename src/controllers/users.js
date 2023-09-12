import { UserModel } from '../models/sqlite/users.js'
import { validateFollow } from '../schemas/follow.js'

export class UserController {
  static async getById (req, res) {
    const { id } = req.params
    const user = await UserModel.getById(id)

    if (!user || user.length === 0) { return res.status(404).json({ message: 'User not found' }) }

    return res.json(user)
  }

  static async followUser (req, res) {
    const result = validateFollow(req.body)
    if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

    const { id } = req.params
    const user = await UserModel.getById(id)
    if (!user || user.length === 0) { return res.status(404).json({ message: 'User not found' }) }

    const userFollowing = await UserModel.getById(result.data.userFollowingId)
    if (!userFollowing || userFollowing.length === 0) { return res.status(404).json({ message: 'Following user not found' }) }

    if (result.data.isFollowed) {
      const updatedUser = await UserModel.unfollowUser(id, result.data.userFollowingId)
      return res.json(updatedUser)
    }

    const updatedUser = await UserModel.followUser(id, result.data.userFollowingId)
    return res.json(updatedUser)
  }

  static async delete (req, res) {
    const { id } = req.params
    const deletedTweet = await UserModel.delete(id)

    if (deletedTweet) return res.json(deletedTweet)
    res.status(404).json({ message: 'Tweet not found' })
  }
}
