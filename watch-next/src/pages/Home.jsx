import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getMovies } from '../store/actions/actionMovie';
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import { addToWatchlist } from '../store/actions/actionUser';
import SearchBar from '../components/SearchBar';

let currentPage = 1

export default function Home() {
    const dispatch = useDispatch();
    const { movies } = useSelector(state => state.movieReducer);
    const [hasMore, setHasMore] = useState(true);
    const [search, setSearch] = useState("");
    const [foundMovies, setFoundMovies] = useState([]);

    useEffect(() => {
        dispatch(getMovies(currentPage))
    }, [dispatch])

    function fetchMoreData() {
        currentPage === 500 ? setHasMore(false) : currentPage++
        dispatch(getMovies(currentPage))
    }

    function handleAddToWatchlist(data) {
        if(!localStorage.getItem("access_token")) {
            swal("Error!!", "Login First!!", "error");
        } else {
            const payload = {
                title: data.title,
                imgUrl: data.poster_path,
                rating: data.vote_average,
                MovieId: data.id
            }

            dispatch(addToWatchlist(payload))
                .then( () => {
                    swal("Added!!", "Added to your watchlist", "success");
                })
                .catch(err => console.log(err.response.data))
        }
    }

    useEffect(() => {
        if (search !== "") {
            const newMovies = movies.filter(e => e.title.toLowerCase().startsWith(search.toLowerCase()));
            if (newMovies.length === 0) {
                swal("Error!!", "Movie Not Found!!", "error")
                setSearch("")
            }
            setFoundMovies(newMovies)
        } else {
            setFoundMovies([])
        }
    }, [search, movies])
    
    return (
        <div>
            <Navbar />
            <div className="container py-5">
            <SearchBar search={search} setSearch={setSearch} />
                <InfiniteScroll
                    dataLength={movies.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                >
                    <div className="row p-3 align-items-center">
                        {
                            foundMovies.length !== 0 
                            ? foundMovies.map((e, i) => {
                                return (
                                        <div key={i} className="card m-3 shadow p-0" style={{ width: '18rem', height: '36rem' }}>
                                            <div>
                                                <Link to={`/detail/${e.id}`}>
                                                    <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500${e.poster_path}`} style={{ width: '100%', objectFit: 'cover' }} alt="" />
                                                </Link>
                                            </div>
                                            <div>
                                                <div className="card-body" style={{ flexDirection: 'row'}}>
                                                    <h5 style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.title}</h5>
                                                    <p>Rating: <b>{e.vote_average}</b></p>
                                                    <div className="d-flex flex-column-reverse">
                                                        <button type="button" className="btn btn-outline-dark"
                                                            onClick={() => handleAddToWatchlist(e)}
                                                        >add to watchlist</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                )
                            }) 
                            : movies.map((e, i) => {
                                return (
                                        <div key={i} className="card m-3 shadow p-0" style={{ width: '18rem', height: '36rem' }}>
                                            <div>
                                                <Link to={`/detail/${e.id}`}>
                                                    <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500${e.poster_path}`} style={{ width: '100%', objectFit: 'cover' }} alt="" />
                                                </Link>
                                            </div>
                                            <div>
                                                <div className="card-body" style={{ flexDirection: 'row'}}>
                                                    <h5 style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.title}</h5>
                                                    <p>Rating: <b>{e.vote_average}</b></p>
                                                    <div className="d-flex flex-column-reverse">
                                                        <button type="button" className="btn btn-outline-dark"
                                                            onClick={() => handleAddToWatchlist(e)}
                                                        >add to watchlist</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                )
                            })
                        }
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    )
}
