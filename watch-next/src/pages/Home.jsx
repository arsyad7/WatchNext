import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getMovies } from '../store/actions/actionMovie';
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from '../components/Navbar';

let currentPage = 1

export default function Home() {
    const dispatch = useDispatch();
    const { movies } = useSelector(state => state.movieReducer);
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        dispatch(getMovies(currentPage))
    }, [dispatch])

    function fetchMoreData() {
        currentPage === 500 ? setHasMore(false) : currentPage++
        dispatch(getMovies(currentPage))
    }

    return (
        <div>
            <Navbar />
            <div className="container py-5">
                <InfiniteScroll
                    dataLength={movies.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                >
                    <div className="row p-0 align-items-center">
                    {
                        movies.map((e, i) => {
                            return (
                                    <div key={i} className="card m-3 shadow p-0" style={{ width: '18rem', height: '35rem' }}>
                                        <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500${e.poster_path}`} style={{ width: '100%', objectFit: 'cover' }} alt="" />
                                        <div>
                                            <div className="card-body" style={{ flexDirection: 'row'}}>
                                                <h5>{e.title}</h5>
                                                <p>Rating: <b>{e.vote_average}</b></p>
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
