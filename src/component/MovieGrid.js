import React from 'react'
import { Typography, Grid} from '@material-ui/core'
import MovieCard from './MovieCard'
import { makeStyles } from '@material-ui/core/styles'

const MovieGrid = ({ movies }) => {

  const useStyles = makeStyles((theme) => {
    return {
      root: {
        marginTop: theme.spacing(2)
      }
    }
  })

  const classes = useStyles()

  return (
    <>
      <Grid container spacing={2} className={classes.root}>
        {movies.length === 0 ?
          (<Typography variant="h5" align="center">Time to add some movies!</Typography>) :
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
