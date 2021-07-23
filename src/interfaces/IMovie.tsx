// from API Call https://developers.themoviedb.org/3/movies/get-movie-details
export interface IMovie {
  belong_to_collection: {},
  genres: Array<{id: number, name: string }>,
  id: number,
  title: string,
  tagline: string | null,
  production_companies: Array<{ name: string, id: number, logo_path: string | null }>,
  release_date: string,
  poster_path: string | null,
  popularity: number,
  homepage: string | null,
  belongs_to_collection: {name: string, id: number, poster_path: string} | null
}

export interface ParamTypes {
  id: number | null
}