import { useDispatch, useSelector } from "react-redux"
import { upvoteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.anecFilter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter((anecdote) => {
      return anecdote.content.toLowerCase().includes(state.anecFilter.toLowerCase())
    })
  })
  const dispatch = useDispatch()

  const vote = id => {
    dispatch(upvoteAnecdote(id))
    console.log('vote', id)
  }

  return (
    <div>
      {
        anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
        )
      )
      }

    </div>
  )
}

export default AnecdoteList