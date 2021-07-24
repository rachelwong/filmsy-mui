import React from 'react'
import { Typography, Grid, Paper, Button, Box} from '@material-ui/core'
import MovieCard from './MovieCard'
import { makeStyles } from '@material-ui/core/styles'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { IMovie } from '../interfaces/IMovie'


type Props = {
  movies: Array<IMovie>
}
const MovieGrid: React.VFC<Props> = ({ movies }) => {

  const useStyles = makeStyles((theme) => {
    return {
      root: {
        marginTop: theme.spacing(2)
      },
      errorRoot: {
        padding: theme.spacing(15),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }
    }
  })

  const classes = useStyles()

  return (
    <>
      <Grid container spacing={2} className={classes.root}>
        {movies.length === 0 ?
          (
            <Paper className={ classes.errorRoot}>
              <Typography variant="h5" align="center">Time to add some movies!</Typography>
              <Box>
                <Button href="/add" variant="contained" color="secondary" disableElevation startIcon={ <PlaylistAddIcon/>} >Bookmark Movies</Button>
              </Box>
            </Paper>
          ) :
          (movies.map((movie, idx) => (
              <Grid item container xs={3} key={idx} >
                <MovieCard movie={movie} />
              </Grid>
            )))
        }
      </Grid>
    </>
  )
}

export default MovieGrid
