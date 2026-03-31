import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anec',
  initialState: [],
  reducers: 
  {
    upvoteAnecdoteInStore(state,action){
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

const {setAnecdotes, createAnecdote, upvoteAnecdoteInStore} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))

  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    await anecdoteService.upvoteAnecdote(id)
    dispatch(upvoteAnecdoteInStore(id))

  }
}

export default anecdoteSlice.reducer
