import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './component/Layout'
import { CssBaseline } from '@material-ui/core'
import BookmarkList from './pages/BookmarkList'
import Details from './pages/Details'
import Add from './pages/Add'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {GlobalProvider} from './context/GlobalContext'
import { IMovie } from './interfaces/IMovie'

function App() {

  const [query, setQuery] = useState<string>("") // search movies query
  const [movies, setMovies] = useState<IMovie[]>([]) // matching movies

  // not returning data so it's a void. but promise because it's async
  const getPopularMovies = async (): Promise<void> => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
    setMovies(data.results)
  }

  const fetchMovies = (searchString : string):void => {
    setQuery(searchString);

    // make Api call to movieDB to get list of movies matching query params
    const getSearchedMovies = async (): Promise<void> => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=falses&query=${query}`)
      setMovies(data.results)
    }
    if (query) {
      getSearchedMovies()
    } else {
      getPopularMovies()
    }
  }

  useEffect(() => {
    getPopularMovies()
  }, [])

  return (
    <GlobalProvider>
      <Layout>
        <Router>
          <Switch>
            <Route path="/" exact>
              <BookmarkList />
            </Route>
            <Route exact path="/movie/:id">
              <Details/>
            </Route>
            <Route exact path="/add">
              <Add fetchMovies={fetchMovies} movies={ movies } />
            </Route>
          </Switch>
        </Router>
      </Layout>
      <CssBaseline />
    </GlobalProvider>
  );
}

export default App;
