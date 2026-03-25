import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')

  const loginFormRef = useRef()
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addLike = async (newBlog) => {
    const returnedBlog = await blogService.update(newBlog.id, {...newBlog, userId: newBlog.user.id})
    setBlogs(blogs.map(blog => {
      return blog.id === returnedBlog.data.id ? {...blog, likes: returnedBlog.data.likes} : blog
    }))
  }

  const addBlog = async event => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0
    }

    const returnedBlog = await blogService.create(blogObject)
    
    setBlogs(blogs.concat(returnedBlog))
    setNotification(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  const sortBlogsByLikes = () => {
    const sortedBlogs = [...blogs]
    sortedBlogs.sort((a,b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }

  const deleteBlog = async (blogD) => {
    console.log(blogD)
    const deleteAccepted = confirm(`Remove blog ${blogD.title} by ${blogD.user.username}`)
    if (!deleteAccepted){
      return
    }
    await blogService.deleteBlog(blogD.id)
    setBlogs(blogs.filter((blog) => blog.id !== blogD.id))
    setNotification(`blog ${blogD.title} by ${blogD.user.username} removed`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)

  }

  const handleLogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(`${user.name} successfully logged in!`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch {
      setNotification('wrong username or password')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login' ref={loginFormRef}>
        <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({target}) => setUsername(target.value)}
            handlePasswordChange={({target}) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />

      </Togglable>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm
          newBlogAuthor={newBlogAuthor}
          newBlogTitle={newBlogTitle}
          newBlogUrl={newBlogUrl}
          handleAddBlog={addBlog}
          handleAuthorChange={({target}) => {setNewBlogAuthor(target.value)}}
          handleTitleChange={({target}) => {setNewBlogTitle(target.value)}}
          handleUrlChange={({target}) => {setNewBlogUrl(target.value)}}
        />
      </Togglable>
    )
  }

  return (
    <div>
      <Notification message={notification} />

      {!user && loginForm()}
      {user && (
      <div>
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          
        </div>
        {blogForm()}
        <h2>blogs</h2>
        <button onClick={sortBlogsByLikes}>Sort by Likes</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} user={user} />
        )}

      </div>
    )}
    </div>
  )
}

export default App