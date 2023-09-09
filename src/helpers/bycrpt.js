import bcrypt from 'bcrypt'

export const encrypt = async (plainPassword) =>
  await bcrypt.hash(plainPassword, 10)

export const compare = async (plainPassword, hash) =>
  await bcrypt.compare(plainPassword, hash)
