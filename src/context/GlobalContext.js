import { createContext, useReducer } from 'react'
import AppReducers from './AppReducers'

// TODO - add data persistence
const initialState = {
  bookmarks: [],
  completed: []
}

// global state which will be accessible from anywhere
export const GlobalContext = createContext(initialState)

// global provider to access actions to manipulate state to be wrapped around entire appBar
// // children is the whole app itself
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducers, initialState)

  // actions to be - add bookmark, remove bookmark
  const removeBookmark = id => {
    console.log("REMOVE BOOKMARK", id)
    dispatch({ type: "REMOVE_BOOKMARK", action: id })
  }

  const addBookmark = movie => {
    console.log("ADD BOOKMARK", movie)
    dispatch({ type: "ADD_BOOKMARK", action: movie })
  }

  // value argumment is what's available to be passed down to/accessed by the whole app
  return (
    <GlobalContext.Provider value={{
      bookmarks: state.bookmarks,
      completed: state.completd,
      removeBookmark,
      addBookmark
    }}>
      {children }
    </GlobalContext.Provider>
  )
}