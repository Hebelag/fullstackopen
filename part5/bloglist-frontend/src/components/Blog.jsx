import { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [infoVisible, setInfoVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => {setInfoVisible(!infoVisible)}}>{infoVisible ? 'hide':'view'}</button>
      {infoVisible &&
    <div>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick={() => addLike({ ...blog, likes: blog.likes + 1 })}>like</button></p>
      {blog.user &&
        <p>{blog.user.username}</p>

      }
      {(blog.user && blog.user.username === user.username) && <button onClick={() => deleteBlog(blog)}>delete</button>}


    </div>}
    </div>
  )
}

export default Blog