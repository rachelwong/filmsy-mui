import React, { useState} from 'react'
import Search from '../component/Search'
import MovieGrid from '../component/MovieGrid'

const Add = ({ fetchMovies, movies  }) => {
  return (
    <>
      <Search fetchMovies={fetchMovies} />
      <MovieGrid movies={ movies }/>
    </>
  )
}

export default Add
