import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const RESULTS_PER_PAGE = 3
export default class TweetModel {
  static async getAll (userId, query) {
    const { bookmarked, following, page } = query

    const results = await prisma.tweet.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: RESULTS_PER_PAGE,
      skip: RESULTS_PER_PAGE * (page - 1),
      where: {
        ...(bookmarked
          ? {
              bookmarks: {
                some: {
                  id: userId
                }
              }
            }
          : {}),
        ...(following
          ? {
              OR: [{
                user: {
                  followedBy: {
                    some: {
                      id: userId
                    }
                  }
                }
              },
              { user: { id: userId } }]
            }
          : {})
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true
          }
        },
        likes: true,
        bookmarks: true,
        retweets: true
      }

    })

    return {
      results,
      next: results.length >= 1 ? Number(page) + 1 : null,
      count: results.length
    }
  }

  static async getBookmarked (userId) {
    return await prisma.tweet.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        bookmarks: {
          some: {
            id: userId
          }
        }
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true
          }
        },
        likes: true,
        bookmarks: true,
        retweets: true
      }
    })
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

  static async delete (id) {
    return await prisma.tweet.delete({
      where: {
        id
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

  static async bookmarkTweet (bookmark) {
    return await prisma.tweet.update({
      where: {
        id: bookmark.tweetId
      },
      data: {
        bookmarks: {
          connect: {
            id: bookmark.userId
          }
        }
      }
    })
  }

  static async removeBookmark (bookmark) {
    return prisma.tweet.update({
      where: {
        id: bookmark.tweetId
      },
      data: {
        bookmarks: {
          disconnect: {
            id: bookmark.userId
          }
        }
      }
    })
  }

  static async retweet (retweet) {
    return await prisma.tweet.update({
      where: {
        id: retweet.tweetId
      },
      data: {
        retweets: {
          connect: {
            id: retweet.userId
          }
        }
      }
    })
  }

  static async removeRetweet (retweet) {
    return await prisma.tweet.update({
      where: {
        id: retweet.tweetId
      },
      data: {
        retweets: {
          disconnect: {
            id: retweet.userId
          }
        }
      }
    })
  }
}
