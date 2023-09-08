import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class CommentModel {
  static async getAll (tweetId) {
    const tweets = await prisma.tweet.findMany({
      where: {
        tweetId
      }
    })
    return tweets
  }

  static async getById (tweetId) {
    return await prisma.tweet.findFirst({
      where: {
        tweetId
      },
      include: {
        user: true,
        comments: true
      }
    })
  }

  static async create (comment) {
    return await prisma.comment.create({
      data: {
        content: comment.content,
        userId: comment.userId,
        tweetId: comment.tweetId
      }
    })
  }

  static async delete (commentId) {
    return await prisma.comment.delete({
      where: {
        id: commentId
      }
    })
  }
}
