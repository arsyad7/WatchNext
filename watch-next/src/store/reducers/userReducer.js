import { SET_USER, SET_WATCHLISTS } from '../keys';

const initialState = {
    currentUser: {},
    watchLists: []
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, currentUser: action.payload}
        case SET_WATCHLISTS:
            return { ...state, watchLists: action.payload}
        default:
            return state;
    }
}