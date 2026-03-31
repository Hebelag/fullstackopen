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

export default {getAll, createAnecdote}