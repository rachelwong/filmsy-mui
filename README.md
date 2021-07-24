### Filmsy bookmarker x Material UI

> Bookmark and display films drawn from the MovieDB using Context API

![working screenshot](/src/movie_screenshot.gif)

:construction: Working version can be viewed at https://codesandbox.io/s/irz1r :construction:

### Learning Notes

Learnt from mentor Andrew Chou:

* annotation: the practice of setting up types versus as setting a value. Giving enough information to typescript to make inferences.
* No need to annotate everything but specificity helps typescript to understand what's going on (i.e. no need to annotate component being a functional component, this could be inferred by typescript unless in special cases). Defining the argument types and return type (more lenient) is generally sufficient:

```javascript
  const Add = ({ fetchMovies, movies }: { fetchMovies: () => void, movies: IMovie[]}) => {
    return (
      <div>some random jsx goes here</div>
    )
  }
```

* everything that needs to be passed from the global context to the provider needs to be declared at the initialisation point of the global context. That includes, any methods (actions to modify state) must be initialised within the initial state, even if it is just as dummy methods. These methods could just return null.
* Need to create an interface for the Global Context itself

```javascript
  export interface IContext {
    bookmarks: IMovie[];
    completed: IMovie[];
    removeBookmark: (id: string) => void;
    addBookmark: (movie: IMovie) => void;
  }
```

The action methods are

* initial state could best be initialised in a function to prevent stale state, as is the example using localStorage as this may set up a small race condition situation
* Generics! Helper methods! Utilities! (creating new types, defining new types ) --> to come back to! :brain:
* Pick what you need from docs, don't read everything.
* Async functions return type is a Promise, but they don't actually HAVE to return a value.

```javascript
  const getPopularMovies = async (): Promise<void> => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
      setMovies(data.results)
  }
```