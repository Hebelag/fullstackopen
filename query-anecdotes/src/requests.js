const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok){
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}

export const getAnecdoteById = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`)
  if (!response.ok){
    throw new Error(`Failed to fetch anecdote with id:${id}`)
  }
  return response.json()
}

export const createAnecdote = async (newAnecdote) => {

  if (newAnecdote.content.length < 5){
    throw new Error('Anecdote too short!')
  }

  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newAnecdote)
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok){
    throw new Error('Failed to create new anecdote')
  }

  return await response.json()
}

export const upvoteAnecdote = async (id) => {
  const anecdoteToUpvote = await getAnecdoteById(id)

  const options = {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({...anecdoteToUpvote, votes: anecdoteToUpvote.votes + 1})
  }

  const response = await fetch(`${baseUrl}/${id}`,options)

  if(!response.ok){
    throw new Error(`Failed to upvote anecdote with id ${id}`)
  }

  const data = await response.json()


  return data
}