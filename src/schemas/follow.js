import z from 'zod'

const followSchema = z.object({
  userFollowingId: z.string(),
  isFollowed: z.boolean()
})

export function validateFollow (input) {
  return followSchema.safeParse(input)
}
