import { validateFollow } from '../schemas/actions.js'

export default class UserController {
  constructor (userModel) {
    this.userModel = userModel
  }

  getById = async (req, res) => {
    const { id } = req.params
    const user = await this.userModel.getById(id)

    if (!user || user.length === 0) { return res.status(404).json({ message: 'User not found' }) }

    return res.json(user)
  }

  followUser = async (req, res) => {
    const id = req.userId
    const result = validateFollow(req.body)
    if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

    const userFollowing = await this.userModel.getById(result.data.userFollowingId)
    if (!userFollowing || userFollowing.length === 0) { return res.status(404).json({ message: 'Following user not found' }) }

    if (result.data.isFollowed) {
      const updatedUser = await this.userModel.unfollowUser(id, result.data.userFollowingId)
      return res.json(updatedUser)
    }

    const updatedUser = await this.userModel.followUser(id, result.data.userFollowingId)
    return res.json(updatedUser)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const deletedTweet = await this.userModel.delete(id)

    if (deletedTweet) return res.json(deletedTweet)
    res.status(404).json({ message: 'Tweet not found' })
  }
}
