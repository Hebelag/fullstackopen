import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anec',
  initialState: [],
  reducers: 
  {
    upvoteAnecdote(state,action){
      const anecdoteId = action.payload
      const anecdoteToUpvote = state.find(a => a.id === anecdoteId)
      const changedAnecdote = {...anecdoteToUpvote, votes: anecdoteToUpvote.votes + 1}
      return state.map(anecdote => (anecdote.id !== anecdoteId ? anecdote : changedAnecdote))
    },
    createAnecdote(state,action){
      state.push(action.payload)
    },
    setAnecdotes(state,action){
      return action.payload
    }
  }
})

export const { upvoteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
