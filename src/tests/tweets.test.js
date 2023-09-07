import app from './app.js'
import request from 'supertest'

describe('GET /tweets', () => {
  test('should return 200 OK', async () => {
    const response = await request(app).get('/tweets').send()
    expect(response.status).toBe(200)
  })

  test('should return an array of tweets', async () => {
    const response = await request(app).get('/tweets').send()
    expect(response.body).toBeInstanceOf(Array)
  })
}
)

describe('POST /tweets', () => {
  const tweet = {
    content: 'This is a tweet',
    date: '2021-01-01',
    userId: '21678362178',
    likes: 0
  }

  test('should return 201 Created', async () => {
    const response = await request(app).post('/tweets').send(tweet)
    expect(response.status).toBe(201)
  })

  test('should return tweet with ID', async () => {
    const response = await request(app).post('/tweets').send(tweet)
    expect(response.body._id).toBeDefined()
  })
}
)

describe('GET /tweet/:id', () => {
  test('should return 200 OK', async () => {
    const response = await request(app).get('/tweets/1').send()
    expect(response.status).toBe(200)
  })
})

describe('DELETE /tweet/:id', () => {
  test('should return 200 ok and the removed tweet', async () => {
    const response = await request(app).delete('/tweets/1').send()
    expect(response.statusCode).toBe(200)
    expect(response.body).toBe(Object)
  })
})
