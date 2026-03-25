import { useState } from 'react'
const BlogForm = ({
  handleAddBlog
}) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0
    }
    handleAddBlog(blogObject)

  }

  return (
    <form onSubmit={addBlog}>
      <label>
        title
        <input value={newBlogTitle} onChange={(e) => setNewBlogTitle(e.target.value)} />
      </label>
      <label>
        author
        <input value={newBlogAuthor} onChange={(e) => setNewBlogAuthor(e.target.value)} />
      </label>
      <label>
        url
        <input value={newBlogUrl} onChange={(e) => setNewBlogUrl(e.target.value)} />
      </label>
      <button type="submit">add blog</button>
    </form>

  )
}

export default BlogForm
