import { Link } from "react-router-dom"

const Anecdote = ( {anecdote} ) => {
  return(
  <li key={anecdote.id}>
    <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
  </li>)
}

export default Anecdote