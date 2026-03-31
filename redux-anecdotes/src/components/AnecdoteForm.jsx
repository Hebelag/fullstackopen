import { appendAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from "../reducers/notificationReducer"
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = async (event) => {
    event.preventDefault()
    const text = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(appendAnecdote(text))
    dispatch(showNotification(`You created '${text}'`,5))
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