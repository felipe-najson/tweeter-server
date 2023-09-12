import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class UserModel {
  static async getById (id) {
    try {
      return await prisma.user.findFirst({
        where: {
          id
        },
        include: {
          tweets: true,
          followedBy: true,
          following: true
        }
      })
    } catch {
      return null
    }
  }

  static async getByUsername (username) {
    try {
      return await prisma.user.findFirst({
        where: {
          username
        }
      })
    } catch {
      return null
    }
  }

  static async create (user) {
    return await prisma.user.create({
      data: {
        ...user,
        birthDate: new Date(user.birthDate)
      }
    })
  }

  static async delete (id) {
    return await prisma.user.delete({
      where: {
        id
      }
    })
  }

  static async followUser (id, userFollowingId) {
    await prisma.user.update({
      where: {
        id: userFollowingId
      },
      data: {
        followedBy: {
          connect: {
            id
          }
        }
      }
    })

    return await prisma.user.update({
      where: {
        id
      },
      data: {
        following: {
          connect: {
            id: userFollowingId
          }
        }
      }
    })
  }

  static async unfollowUser (id, userFollowingId) {
    await prisma.user.update({
      where: {
        id: userFollowingId
      },
      data: {
        followedBy: {
          disconnect: {
            id
          }
        }
      }
    })

    return await prisma.user.update({
      where: {
        id
      },
      data: {
        following: {
          disconnect: {
            id: userFollowingId
          }
        }
      }
    })
  }
}
