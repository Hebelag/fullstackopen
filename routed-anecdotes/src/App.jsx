import { useState } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import AnecdoteDetails from './components/AnecdoteDetails'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, setNotification] = useState('')
  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(an => an.id === Number(match.params.id)) : null 

  const addAnecdote = (anecdote) => {
    setAnecdotes(anecdotes.concat({ ...anecdote, id: Math.round(Math.random() * 10000) }))
    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification('')
    },2000)
  }

  const deleteAnecdote = (id) => {
    setAnecdotes(anecdotes.filter((n => n.id !== Number(id))))
  }

  return (
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <span>{notification}</span>
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/create" element={<CreateNew addAnecdote={addAnecdote} />} />
          <Route path="/about" element={<About />} />
          <Route path="/anecdotes/:id" element={<AnecdoteDetails anecdote={anecdote} deleteAnecdote={deleteAnecdote}/>}/>
        </Routes>
        <Footer />
      </div>
  )
}

export default App
