import mongoose from 'mongoose'

const MONGO_URL =
  `${process.env.MONGO_URL}/tweeter?retryWrites=true&w=majority`
const MONGO_TEST =
  `${process.env.MONGO_URL}/test?retryWrites=true&w=majority`
mongoose.Promise = Promise

export const connectToMongo = () => mongoose.connect(MONGO_URL).then(() => {
  console.log('Connected to TweeterDB')
}).catch((err) => {
  console.log('Error connecting to MongoDB:', err.message)
})

export const connectToMongoTest = () => mongoose.connect(MONGO_TEST).then(() => {
  console.log('Connected to TestDB')
}).catch((err) => {
  console.log('Error connecting to MongoDB:', err.message)
})
