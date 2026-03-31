import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from "../reducers/notificationReducer"
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = async (event) => {
    event.preventDefault()
    const text = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createNotification(`You created '${text}'`))
    const newAnecdote = await anecdoteService.createAnecdote(text)
    dispatch(createAnecdote(newAnecdote))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote'/>
        </div>
        <button type='submit'>create</button>
      </form>

    </div>
    
  )
}

export default AnecdoteForm