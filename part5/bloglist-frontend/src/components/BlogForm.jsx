
const BlogForm = ({
  handleAddBlog,
  handleAuthorChange,
  handleTitleChange,
  handleUrlChange,
  newBlogAuthor,
  newBlogTitle,
  newBlogUrl,

}) => {

  return (
    <form onSubmit={handleAddBlog}>
      <input value={newBlogTitle} onChange={handleTitleChange} />
      <input value={newBlogAuthor} onChange={handleAuthorChange} />
      <input value={newBlogUrl} onChange={handleUrlChange} />
      <button type="submit">add blog</button>
    </form>

  )
}

export default BlogForm
