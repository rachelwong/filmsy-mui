import React from 'react'
import Search from '../component/Search'
import MovieGrid from '../component/MovieGrid'
import { IMovie } from '../interfaces/IMovie'

// similar to other components by defining separate types and interfaces
// no need to define type as "Function" but use arrow function and return type
// good to use type or interface when there's a lot of props for better readability
// alternative syntax
const Add = ({ fetchMovies, movies }: { fetchMovies: () => void, movies: IMovie[]}) => {
  return (
    <>
      <Search fetchMovies={fetchMovies} />
      <MovieGrid movies={ movies }/>
    </>
  )
}

export default Add
