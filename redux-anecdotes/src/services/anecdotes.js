const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok){
    throw new Error('Error getting anecdotes from server')
  }

  const data = response.json()
  return data
}

const createAnecdote = async (content) => {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({content, votes: 0})
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok){
    throw new Error('Error creating new anecdote')
  }

  return await response.json()
}

const getById = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`)

  if (!response.ok){
    throw new Error('Error getting anecdotes from server')
  }

  const data = response.json()
  return data
}

const upvoteAnecdote = async (id) => {
  const anecdoteToUpvote = await getById(id)
  console.log(anecdoteToUpvote)
  const options = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      ...anecdoteToUpvote,
      votes: anecdoteToUpvote.votes + 1
    })
  }
  const response = await fetch(`${baseUrl}/${id}`,options)

  if (!response.ok){
    console.log(response.statusText)
    throw new Error('Error upvoting anecdote on server')
  }

  const data = response.json()
  return data

}

export default {getAll, createAnecdote, upvoteAnecdote}