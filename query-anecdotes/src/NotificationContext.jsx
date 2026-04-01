import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  state = action.payload
  return state
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  const showNotification = (message, seconds) => {
    console.log("show notif fired")
    notificationDispatch({payload: message})

    setTimeout(() => {
      notificationDispatch({payload: ''})
    }, seconds * 1000)
  }

  return (
    <NotificationContext.Provider value={{notification, showNotification}}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext