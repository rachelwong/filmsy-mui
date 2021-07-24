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

* everything that needs to be passed from the global context to the provider needs to be declared at the initialisation point of the global context. That includes, any methods (actions to modify state) must be initialised within the initial state, even if it is just as dummy methods.
* initial state could best be initialised in a function to prevent stale state, as is the example using localStorage as this may set up a small race condition situation
* Generics! Helper methods! Utilities! (creating new types, defining new types ) --> to come back to! :brain:
