import axios from 'axios';
import { SET_MOVIES } from "../keys";

export function setMovies(data) {
    return {
        type: SET_MOVIES,
        payload: data
    }
}

export function getMovies(page) {
    return function (dispatch, getState) {
        const { movieReducer } = getState()

        axios.get(`http://localhost:3000/movies?page=${page}`)
            .then(({ data }) => {
                dispatch(setMovies(movieReducer.movies.concat(data.results)))
            })
            .catch(err => console.log(err))
    }
}