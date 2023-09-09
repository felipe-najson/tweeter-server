import z from 'zod'

const userSchema = z.object({
  username: z.string().min(3).max(20),
  name: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8).max(20),
  birthDate: z.string(),
  description: z.string().max(280).default(''),
  image: z.string().url().default('https://randomuser.me/api/portraits/men/30.jpg')
})

export function validateUser (input) {
  return userSchema.safeParse(input)
}
