import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class UserModel {
  static async getById (id) {
    return await prisma.user.findFirst({
      where: {
        id
      }
    })
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
}
