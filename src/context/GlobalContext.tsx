import React from 'react'
import { createContext, useReducer, useEffect  } from 'react'
import AppReducers from './AppReducers'
import { IMovie } from '../interfaces/IMovie'

// shape of global context
export interface IContext {
  bookmarks: IMovie[];
  completed: IMovie[];
  removeBookmark: (id: number) => void;
  addBookmark: (movie: IMovie) => void;
}

// this only gets run once
// const initialState = {
//   bookmarks: localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')) : [],
//   completed: localStorage.getItem('completed') ? JSON.parse(localStorage.getItem('completed')) : []
// }

// converted to function to prevent stale state
const getInitialState = () => {

  // initialising a variable for the localstorage means it doesn't need to be called multiple times at the of ternary evaluation
  // previous localStorage.getItem() ? localStorage.getItem() : [] <-- called twice, could be a very small race condition here
  const fetchBookmarks = localStorage.getItem('bookmarks')
  const fetchCompleted = localStorage.getItem('completed')

  // create dummy methods so that methods can be a part of the type annotation when passing into global provider
  const removeBookmark = () => null
  const addBookmark = () => null

  const initialState: IContext = {
    bookmarks: fetchBookmarks ? JSON.parse(fetchBookmarks) : [],
    completed: fetchCompleted ? JSON.parse(fetchCompleted) : [],
    removeBookmark,
    addBookmark
  }
  return initialState
}


// global state which will be accessible from anywhere
export const GlobalContext = createContext<IContext>(getInitialState())

// global provider to access actions to manipulate state to be wrapped around entire appBar
// // children is the whole app itself
export const GlobalProvider = ({ children }: {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(AppReducers, getInitialState())

  // everytime the state updates (add/remove), the localstorage is updated
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
    localStorage.setItem('completed', JSON.stringify(state.completed))
  }, [state])

  // actions to be - add bookmark, remove bookmark
  const removeBookmark = (id: number): void => {
    dispatch({ type: "REMOVE_BOOKMARK", payload: id })
  }

  const addBookmark = (movie: IMovie): void => {
    dispatch({ type: "ADD_BOOKMARK", payload: movie })
  }

  // value argumment is what's available to be passed down to/accessed by the whole app
  return (
    <GlobalContext.Provider value={{
      bookmarks: state.bookmarks,
      completed: state.completed,
      removeBookmark,
      addBookmark
    }}>
      {children }
    </GlobalContext.Provider>
  )
}