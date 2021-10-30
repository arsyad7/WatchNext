import { SET_MOVIES } from '../keys';

const initialState = {
    movies: []
}

export function movieReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MOVIES:
            return { ...state, movies: action.payload}
        default:
            return state;
    }
}