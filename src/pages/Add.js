import React, { useState} from 'react'
import Search from '../component/Search'
import MovieGrid from '../component/MovieCard'

const Add = ({ fetchMovies }) => {


  return (
    <div>
      <Search fetchMovies={ fetchMovies } />
      <MovieGrid/>
    </div>
  )
}

export default Add
