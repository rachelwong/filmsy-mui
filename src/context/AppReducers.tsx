// modify state here
import { IMovie } from '../interfaces/IMovie'
import { IContext } from '../context/GlobalContext'

type ACTIONTYPES =
  | { type: "ADD_BOOKMARK"; payload: IMovie }
  | { type: "REMOVE_BOOKMARK"; payload: number }

export default (state: IContext, action: ACTIONTYPES) => {
  switch (action.type) {
    case "ADD_BOOKMARK":
      return {
        ...state,
        bookmarks: [action.payload, ...state.bookmarks]
      }
    case "REMOVE_BOOKMARK":
      return {
        ...state,
        bookmarks: state.bookmarks.filter((bookmark: IMovie) => bookmark.id !== action.payload)
      }
    default:
      return state;
  }
}