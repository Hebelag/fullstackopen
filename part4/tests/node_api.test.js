const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

/*
title: String,
  author: String,
  url: String,
  likes: Number,
*/
const initialBlogs = [
  {
    title: 'Monster Energy White',
    author: 'Monster',
    url: 'https://monster.energy/white',
    likes: 666
  },
  {
    title: 'Monster Energy Pink',
    author: 'Monster',
    url: 'https://monster.energy/pink',
    likes: 666
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogposts are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogposts are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(e => e.author)
  assert.strictEqual(contents.includes('Monster'), true)
})

after(async () => {
  await mongoose.connection.close()
})