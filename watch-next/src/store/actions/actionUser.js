import axios from 'axios';
import { SET_USER, SET_WATCHLISTS } from '../keys';

export function setUser(data) {
    return {
        type: SET_USER,
        payload: data
    }
}

export function setWatchlists(data) {
    return {
        type: SET_WATCHLISTS,
        payload: data
    }
}

export function login(payload) {
    return function () {
        return axios.post('http://localhost:3000/users/login', payload)
    }
}

export function register(payload) {
    return function () {
        return axios.post('http://localhost:3000/users/register', payload)
    }
}

export function addToWatchlist(payload) {
    return function () {
        return axios.post('http://localhost:3000/watchlists', payload, {
            headers: {
                access_token: localStorage.getItem("access_token")
            }
        })
    }
}