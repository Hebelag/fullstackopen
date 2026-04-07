import Anecdote from "./Anecdote"

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(an => <Anecdote anecdote={an}/>)}
    </ul>
  </div>
)

export default AnecdoteList
