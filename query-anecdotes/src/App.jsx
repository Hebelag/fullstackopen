import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, upvoteAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useContext(NotificationContext)

  const handleVoteMutation = useMutation({
    mutationFn: upvoteAnecdote,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['anecdotes']})
  })

  const handleVote = (anecdote) => {
    handleVoteMutation.mutate(anecdote.id)
    showNotification(`You voted '${anecdote.content}'`,5)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading){
    return <div>loading data...</div>
  }

  if (result.error){
    return <div>Error fetching anecdotes from server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
