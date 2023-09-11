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
        },
        likes: true
      }
    })
    return tweets
  }

  static async getById (id) {
    return await prisma.tweet.findFirst({
      where: {
        id
      },
      include: {
        user: true,
        comments: true,
        likes: true
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

  static async addLike (like) {
    return await prisma.tweet.update({
      where: {
        id: like.tweetId
      },
      data: {
        likes: {
          connect: {
            id: like.userId
          }
        }
      }
    })
  }

  static async removeLike (like) {
    return await prisma.tweet.update({
      where: {
        id: like.tweetId
      },
      data: {
        likes: {
          disconnect: {
            id: like.userId
          }
        }
      }
    })
  }

  static async delete (id) {
    return await prisma.tweet.delete({
      where: {
        id
      }
    })
  }
}
