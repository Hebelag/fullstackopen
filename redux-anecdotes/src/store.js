import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: anecdoteReducer,
    filter: filterReducer
  }
})

export default store