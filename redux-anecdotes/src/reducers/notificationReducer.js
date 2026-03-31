import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'render here notification...',
  reducers: {
    createNotification(state,action){
      state = action.payload
      return state
    },
    removeNotification(state, action){
      state = ''
      return state
    }
  }

}
)

const { createNotification } = notificationSlice.actions

export const showNotification = (text, delay) => {
  const delayInMilliseconds = delay * 1000
  return async (dispatch) => {
    dispatch(createNotification(text))
    setTimeout(() => {
      dispatch(removeNotification())
    }, delayInMilliseconds)
  }
}

export const {removeNotification} = notificationSlice.actions
export default notificationSlice.reducer