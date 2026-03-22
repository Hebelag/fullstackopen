const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const Blog = require('../models/blog')

const api = supertest(app)

/*
title: String,
  author: String,
  url: String,
  likes: Number,
*/



beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
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

test('a valid blog can be added (api route test) ', async () => {
  const newBlog = {
    title: 'Monster Energy Black',
    author: 'Monster',
    url: 'https://monster.energy/black',
    likes: 1337
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length +1)

  const title = blogsAtEnd.map(r => r.title)

  assert(title.includes('Monster Energy Black'))
})

test('if likes not present, default to 0', async () => {
  const newBlog = {
    title: 'Monster Energy Gray',
    author: 'Monster',
    url: 'https://monster.energy/gray'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const like = response.body.map(r => r.likes)
  assert(like.includes('0'))
})

test('if title is missing, return 400', async () => {
  const newBlog = {
    author: 'Monster',
    url: 'https://monster.energy/gray',
    likes: 1738
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('if url is missing, return 400', async () => {
  const newBlog = {
    title: 'Monster Energy Gray',
    author: 'Monster',
    likes: 1738
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('add and delete a post, returning 204', async () => {
  const newBlog = {
    title: 'Monster Energy Yellow',
    author: 'Monster',
    url: 'https://monster.energy/yellow',
    likes: 12345
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const id = response.body.map(r => r.id)[response.body.length - 1]

  await api
    .delete(`/api/blogs/${id}`)
    .expect(204)

  const deleteResponse = await api.get('/api/blogs')
  assert.strictEqual(deleteResponse.body.length,helper.initialBlogs.length)
})

test.only('add and update post from 12345 likes to 12347 likes', async () => {
  const newBlog = {
    title: 'Monster Energy Green',
    author: 'Monster',
    url: 'https://monster.energy/green',
    likes: 12345
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const id = response.body.map(r => r.id)[response.body.length - 1]

  const newLikes = { likes: 12347 }

  await api
    .put(`/api/blogs/${id}`)
    .send(newLikes)
    .expect(201)

  const putResponse = await api.get('/api/blogs')
  const likes = putResponse.body.map(r => r.likes)[putResponse.body.length - 1]

  assert.strictEqual(likes, '12347')

})

