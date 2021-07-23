import { useContext} from 'react'
import {Typography } from '@material-ui/core'
import { GlobalContext } from '../context/GlobalContext'
import MovieGrid from '../component/MovieGrid'

const BookmarkList: React.VFC = () => {

  const { bookmarks } = useContext(GlobalContext)

  return (
    <div>
      <Typography variant="h4">Bookmarks</Typography>
      <MovieGrid movies={ bookmarks} />
    </div>
  )
}

export default BookmarkList
