const Blog = require('../models/blog')
const User = require('../models/user')

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
const initialUsers = [
  {
    username:'OnceHuman',
    name:'Manibus',
    password: 'electriceel'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'tempUser',
    url: 'https://temp.db',
    likes: 0 })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}