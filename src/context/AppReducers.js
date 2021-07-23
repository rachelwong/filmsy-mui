// modify state here

export default (state, action) => {
  switch (action.type) {
    case "ADD_BOOKMARK":
      return {
        ...state,
        bookmarks: [action.payload, ...state.bookmarks]
      }
    case "REMOVE_BOOKMARK":
      return {
        ...state,
        bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== action.payload)
      }
    default:
      return state;
  }
}