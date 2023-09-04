import mongoose from 'mongoose'

const tweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  date: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  }
})

export const model = mongoose.model('tweets', tweetSchema)

export class TweetModel {
  static async getAll () {
    return await model.find({}).limit(30)
  }

  static async getById (userId) {
    return await model.find({ userId })
  }

  static async create (tweet) {
    return await model.create(tweet)
  }

  static async delete (id) {
    return await model.findByIdAndDelete(id)
  }
}
