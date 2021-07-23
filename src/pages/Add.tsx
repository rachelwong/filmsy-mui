import React from 'react'
import Search from '../component/Search'
import MovieGrid from '../component/MovieGrid'
import { IMovie } from '../interfaces/IMovie'

type Props = {
  fetchMovies: Function,
  movies: Array<IMovie>
}

const Add: React.VFC<Props> = ({ fetchMovies, movies }) => {
  return (
    <>
      <Search fetchMovies={fetchMovies} />
      <MovieGrid movies={ movies }/>
    </>
  )
}

export default Add
