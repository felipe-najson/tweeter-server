import z from 'zod'

const userSchema = z.object({
  username: z.string().min(3).max(20),
  name: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8).max(20),
  birthDate: z.string(),
  description: z.string().max(280).default(''),
  image: z.string().url().default('https://randomuser.me/api/portraits/men/30.jpg'),
  background: z.string().url().default('https://images.unsplash.com/photo-1683009427619-a1a11b799e05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80')
})

export function validateUser (input) {
  return userSchema.safeParse(input)
}
