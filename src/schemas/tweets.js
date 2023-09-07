import z from 'zod'

const tweetSchema = z.object({
  content: z
    .string({
      invalid_type_error: 'Tweet title must be a string',
      required_error: 'Tweet title is required.'
    })
    .max(280)
    .min(1),
  userId: z.string(),
  likes: z.number().default(0)
})

export function validateTweet (input) {
  return tweetSchema.safeParse(input)
}

export function validatePartialTweet (input) {
  return tweetSchema.partial().safeParse(input)
}
