import { Movie } from '@/models/Movie.model';

export const movieService = {
    getMovies(): Promise<Array<Movie>> {
        return fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.VUE_APP_API_KEY}`)
            .then((res) => res.json())
            .then((res) => res.results);
    },
    searchMovies(query: String) : Promise<Array<Movie>>{
        return fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.VUE_APP_API_KEY}`)
        .then((res) => res.json())
        .then((res) => res.results);
    },
    getMovie(id: string) {
        return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.VUE_APP_API_KEY}`)
        .then((res) => res.json())
        .then((res) => res);
    },
    getCast(movieId: number){
        return fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.VUE_APP_API_KEY}`)
        .then((res) => res.json())
        .then((res) => res);
    }
}