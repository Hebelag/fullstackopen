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
      console.log("removal is fired")
      state = ''
      return state
    }
  }

}
)

export const {createNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer