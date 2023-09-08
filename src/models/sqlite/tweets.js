import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class TweetModel {
  static async getAll () {
    const tweets = await prisma.tweet.findMany({
      include: {
        user: true,
        comments: {
          include: {
            user: true
          }
        }
      }
    })
    return tweets
  }

  static async getById (userId) {
    return await prisma.tweet.findFirst({
      where: {
        userId
      },
      include: {
        user: true,
        comments: true
      }
    })
  }

  static async create (tweet) {
    return await prisma.tweet.create({
      data: {
        ...tweet
      }
    })
  }

  static async delete (id) {
  }
}
