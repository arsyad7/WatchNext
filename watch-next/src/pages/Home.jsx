import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { getMovies } from '../store/actions/actionMovie';
import InfiniteScroll from 'react-infinite-scroll-component';

let currentPage = 1

export default function Home() {
    const dispatch = useDispatch();
    const { movies } = useSelector(state => state.movieReducer);
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        dispatch(getMovies(currentPage))
    }, [dispatch])

    function fetchMoreData() {
        currentPage++
        dispatch(getMovies(currentPage))
    }

    return (
        <div>
            <h1>INI HOME</h1>
            {/* <p>{JSON.stringify(movies)}</p> */}
            <InfiniteScroll
                dataLength={movies.length}
                next={fetchMoreData}
                hasMore={hasMore}
            >
                {
                    movies.map(e => {
                        return <p>{JSON.stringify(e)}</p>
                    })
                }
            </InfiniteScroll>
        </div>
    )
}
