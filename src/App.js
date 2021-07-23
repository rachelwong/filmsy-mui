import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './component/Layout'
import { CssBaseline } from '@material-ui/core'
import BookmarkList from './pages/BookmarkList'
import Details from './pages/Details'
import Add from './pages/Add'
import { useState, useEffect } from 'react'
import axios from 'axios'
function App() {

  const [query, setQuery] = useState("") // search movies query
  const [movies, setMovies] = useState([]) // matching movies

  const fetchMovies = (searchString) => {
    setQuery(searchString);

    // make Api call to movieDB to get list of movies matching query params
    const getMovies = async () => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=falses&query=${query}`)
      setMovies(data.results)
    }
    getMovies()
  }

  useEffect(() => {
    const getPopularMovies = async () => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
      setMovies(data.results)
    }
    getPopularMovies()
  }, [])
  return (
    <div className="App">
      <Layout>
        <Router>
          <Switch>
            <Route path="/" exact>
              <BookmarkList />
            </Route>
            <Route path="/movie/:id">
              <Details />
            </Route>
            <Route path="/add">
              <Add fetchMovies={fetchMovies} movies={ movies } />
            </Route>
          </Switch>
        </Router>
      </Layout>
      <CssBaseline />
    </div>
  );
}

export default App;