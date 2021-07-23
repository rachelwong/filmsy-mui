import React from 'react'
import { Card, CardActionArea, CardMedia, Typography, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from "react-router-dom"

const MovieCard = ({ movie }) => {
  const { title, poster_path, genre_ids, id} = movie
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
    </Card>
  )
}

export default MovieCard
