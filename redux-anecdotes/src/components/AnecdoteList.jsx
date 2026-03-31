import { useDispatch, useSelector } from "react-redux"
import { upvoteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const filtered = useSelector(state => {
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
    const chosenAnecdote = sortedAnecdotes.filter((an) => an.id === id)[0]
    dispatch(createNotification(`You voted: '${chosenAnecdote.content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
    console.log('vote', id)
  }

  const sortedAnecdotes = filtered.toSorted((a,b) => b.votes - a.votes)

  return (
    <div>
      {
        sortedAnecdotes.map(anecdote => (
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