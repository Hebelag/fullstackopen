const bcrypt = require('bcrypt')
const { before, describe, beforeEach, test, after } = require('node:test')
const helper = require('./test_helper')
const User = require('../models/user')
const assert = require('node:assert')
const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const api = supertest(app)

before(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI)
  }
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash(helper.initialUsers[0].password, 10)
    const user = new User({ username: helper.initialUsers[0].username, name: helper.initialUsers[0].name, passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: helper.initialUsers[0].username,
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('password is too short and should throw 400', async () => {
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'sal',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    assert(result.body.error.includes('password is too short!'))
  })
})

after(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})