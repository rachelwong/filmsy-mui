import React from 'react'
import { Paper, TextField} from '@material-ui/core'

const Search = ({ fetchMovies }: {fetchMovies: (searchString: string) => void}) => {

  return (
    <Paper>
      <TextField onChange={ (e) => fetchMovies(e.target.value) } fullWidth id="search-movies" label="Find movies" type="search" variant="outlined" />
    </Paper>
  )
}

export default Search
