import React from 'react'
import { createContext, useReducer, useEffect  } from 'react'
import AppReducers from './AppReducers'
import { IMovie } from '../interfaces/IMovie'

// TODO - add data persistence with localstorage temporarily
const initialState = {
  bookmarks: localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')) : [],
  completed: localStorage.getItem('completed') ? JSON.parse(localStorage.getItem('completed')) : []
}

// global state which will be accessible from anywhere
export const GlobalContext = createContext(initialState)

type Props = {
  children: React.ReactNode
}

// QUESTION: Anything needed here?
// global provider to access actions to manipulate state to be wrapped around entire appBar
// // children is the whole app itself
export const GlobalProvider: React.VFC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducers, initialState)

  // everytime the state updates (add/remove), the localstorage is updated
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
    localStorage.setItem('completed', JSON.stringify(state.completed))
  }, [state])

  // actions to be - add bookmark, remove bookmark
  const removeBookmark = (id: string): void => {
    dispatch({ type: "REMOVE_BOOKMARK", payload: id })
  }

  const addBookmark = (movie: IMovie): void => {
    dispatch({ type: "ADD_BOOKMARK", payload: movie })
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