import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <input value={newBlogTitle} onChange={e => setNewBlogTitle(e.target.value)} />
      <input value={newBlogAuthor} onChange={e => setNewBlogAuthor(e.target.value)} />
      <input value={newBlogUrl} onChange={e => setNewBlogUrl(e.target.value)} />

      <button type="submit">save</button>
    </form>
  )

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
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}

      </div>
    )}
    </div>
  )
}

export default App