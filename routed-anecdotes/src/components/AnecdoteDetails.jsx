import { useNavigate, useParams } from "react-router-dom"

const AnecdoteDetails = ({anecdote, deleteAnecdote}) => {
  const id = useParams().id
  console.log(anecdote)
  const navigate = useNavigate()

  if (!anecdote){
    return null
  }

  const handleDelete = (e) => {
    if (window.confirm(`Delete anecdote ${anecdote.content}?`)){
      e.preventDefault()
      deleteAnecdote(id)
      console.log("Anecdote should be deleted")
      navigate('/')
    }
  }

  return (
    <li className="anecdote">
      <span>{anecdote.content}</span>
      <button onClick={handleDelete}>delete anecdote</button>
    </li>
  )

}

export default AnecdoteDetails