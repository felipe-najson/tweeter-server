import z from 'zod'

const bookmarkSchema = z.object({
  tweetId: z.string(),
  isBookmarked: z.boolean()
})

export function validateBookmark (input) {
  return bookmarkSchema.safeParse(input)
}

const retweetSchema = z.object({
  tweetId: z.string(),
  isRetweeted: z.boolean()
})

export function validateRetweet (input) {
  return retweetSchema.safeParse(input)
}

const likeSchema = z.object({
  tweetId: z.string(),
  isLiked: z.boolean()
})

export function validateLike (input) {
  return likeSchema.safeParse(input)
}

const followSchema = z.object({
  userFollowingId: z.string(),
  isFollowed: z.boolean()
})

export function validateFollow (input) {
  return followSchema.safeParse(input)
}
