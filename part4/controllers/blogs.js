const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title) {
    return response.status(400).json({
      error: 'title is missing!',
    })
  }
  if (!body.url) {
    return response.status(400).json({
      error: 'url is missing!',
    })
  }

  const user = request.user

  const blog = new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (request,response) => {
  const user = request.user
  const id = request.params.id
  const blogToDelete = await Blog.findById(id)

  if (blogToDelete.user.toString() !== user.id.toString()){
    return response.status(401).json({ error: 'not authorized to delete this blog' })
  }

  await Blog.findByIdAndDelete(id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (req,res) => {
  const id = req.params.id
  const { likes } = req.body

  const blog = await Blog.findById(id)

  if (!blog) {
    return res.status(404).end()
  }

  blog.likes = likes

  const updatedBlog = await blog.save()

  res.status(201).json(updatedBlog)
})

module.exports = blogsRouter