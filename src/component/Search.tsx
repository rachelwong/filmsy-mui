import React from 'react'
import { Paper, TextField} from '@material-ui/core'

type Props = {
  fetchMovies: Function
}

const Search: React.VFC<Props> = ({ fetchMovies }) => {

  return (
    <Paper>
      <TextField onChange={ (e) => fetchMovies(e.target.value) } fullWidth id="search-movies" label="Find movies" type="search" variant="outlined" />
    </Paper>
  )
}

export default Search
