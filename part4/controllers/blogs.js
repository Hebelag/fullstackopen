const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.title) {
    return response.status(400).json({
      error: 'title is missing!',
    })
  }
  if (!blog.url) {
    return response.status(400).json({
      error: 'url is missing!',
    })
  }

  const result = await blog.save()
  response.status(201).json(result)

})

blogsRouter.delete('/:id', async (request,response) => {
  const id = request.params.id
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