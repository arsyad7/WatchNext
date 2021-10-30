import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import Navbar from '../components/Navbar';

export default function Watchlist() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/watchlists', {
            headers: {
                access_token: localStorage.getItem("access_token")
            }
        })
            .then( ({ data }) => {
                setMovies(data)
            })
            .catch(err => console.log(err))
    }, [])

    function handleRemove(id) {
        axios.delete(`http://localhost:3000/watchlists/${id}`, {
            headers: {
                access_token: localStorage.getItem("access_token")
            }
        })
            .then(() => {
                const newMovies = movies.filter(e =>  e.id !== +id)
                setMovies(newMovies)
                swal(
                    "Removed!",
                    "Movie has been removed from your watchlist",
                    "success"
                );
            })
            .catch(err => console.log(err))
    }

    if (movies.length === 0) {
        return (
            <>
                <Navbar />
                <div className="d-flex align-items-center justify-content-center" style={{ height: '500px'}}>
                    <h2 style={{ color: 'white'}}>You dont have any watchlist...</h2>
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <div className="row p-0 align-items-center">
                {
                    movies.map((e, i) => {
                        return (
                            <div key={i} className="card m-3 shadow p-0" style={{ width: '18rem', height: '36rem' }}>
                                <div>
                                    <Link to={`/detail/${e.MovieId}`}>
                                        <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500${e.imgUrl}`} style={{ width: '100%', objectFit: 'cover' }} alt="" />
                                    </Link>
                                </div>
                                <div>
                                    <div className="card-body" style={{ flexDirection: 'row'}}>
                                        <h5 style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.title}</h5>
                                        <p>Rating: <b>{e.rating}</b></p>
                                        <div className="d-flex flex-column-reverse">
                                            <button type="button" className="btn btn-outline-dark"
                                                onClick={() => handleRemove(e.id)}
                                            >remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </>
    )
}
