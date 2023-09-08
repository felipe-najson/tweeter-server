import z from 'zod'

const commentSchema = z.object({
  content: z
    .string({
      invalid_type_error: 'Comment title must be a string',
      required_error: 'Comment title is required.'
    })
    .max(280)
    .min(1),
  userId: z.string(),
  tweetId: z.string()
})

export function validateComment (input) {
  return commentSchema.safeParse(input)
}
