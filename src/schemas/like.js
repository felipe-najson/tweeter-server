import z from 'zod'

const likeSchema = z.object({
  tweetId: z.string(),
  userId: z.string(),
  isLiked: z.boolean()
})

export function validateLike (input) {
  return likeSchema.safeParse(input)
}
