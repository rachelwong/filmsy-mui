import React, { useContext} from 'react'
import { Card, CardActionArea, CardMedia, CardActions, Button, Grid } from '@material-ui/core'
import { Link } from "react-router-dom"
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import { GlobalContext } from '../context/GlobalContext'
import BackspaceIcon from '@material-ui/icons/Backspace';
import { IMovie } from '../interfaces/IMovie'

type Props = {
  movie: IMovie
}
const MovieCard: React.VFC<Props> = ({ movie }) => {

  const { title, poster_path, id } = movie
  const { addBookmark, removeBookmark, bookmarks } = useContext(GlobalContext)

  // flag to track if movie already bookmarked
  const bookmarkedMovie = bookmarks.find((bookmark: IMovie) => bookmark.id === movie.id)

  return (
    <Card >
      <CardActionArea disableRipple>
        <Link to={`/movie/${id}`} >
          <CardMedia
            component="img"
            alt={ title }
            height="540"
            image={`http://image.tmdb.org/t/p/w500/${poster_path}`}
            title={title}
          />
        </Link>
      </CardActionArea>
      <CardActions>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={ 6} >
            <Button
              size="small"
              color="primary"
              disableFocusRipple
              startIcon={<ArtTrackIcon />}>
              Details
            </Button>
          </Grid>
          <Grid item xs={6} >
            {bookmarkedMovie ? (
              <Button
                size="small"
                color="primary"
                disableFocusRipple
                startIcon={<BackspaceIcon />}
                onClick={() => removeBookmark(movie.id)}>
                Un-Bookmark
              </Button>
              ) : (
              <Button
                size="small"
                color="primary"
                disableFocusRipple
                startIcon={<BookmarkBorderIcon />}
                onClick={() => addBookmark(movie)}>
                Bookmark
              </Button>
            )}
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}

export default MovieCard
