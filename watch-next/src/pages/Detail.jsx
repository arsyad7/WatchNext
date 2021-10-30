import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';

export default function Detail() {
    const { id } = useParams();
    const history = useHistory();
    const [movie, setMovie] = useState(null);
    const [genres, setGenres] = useState("initialState")

    useEffect(() => {
        axios.get(`http://localhost:3000/movies/${id}`)
            .then( ({ data }) => {
                setMovie(data);

                let newGenres = []
                for (let i = 0; i < data.genres.length; i++) {
                    newGenres.push(data.genres[i].name)
                }
                setGenres(newGenres.join(", "))
            })
            .catch(err => console.log(err))
    }, [id])

    if (!movie) {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ height: '500px'}}>
                <h2 style={{ color: 'white'}}>Loading...</h2>
            </div>
        )
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10 mt-5 card p-0">
                        <div className="row">
                            <div className="col-5">
                                <img style={{ width: '100%'}} src={`https://image.tmdb.org/t/p/w400${movie?.poster_path}`} alt="" />
                            </div>
                            <div className="col-7 p-4">
                                <div className="mt-5" style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <h2>{movie?.title} ({movie?.release_date.split("-")[0]})</h2>
                                    <p>{movie?.release_date} | {genres} | {movie?.runtime}m</p>
                                    <h4>Overview</h4>
                                    <p>{movie?.overview}</p>
                                    <h5>Status: <b>{movie?.status}</b></h5>
                                    <h5>Rating: <b>{movie?.vote_average}</b></h5>
                                    <p></p>
                                </div>
                                <div className="d-flex flex-column-reverse mt-5">
                                    <button type="button" className="btn btn-outline-dark" onClick={() => {
                                        history.goBack()
                                    }}>Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        </div>
    )
}
