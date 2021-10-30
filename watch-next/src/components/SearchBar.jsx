import React from 'react'

export default function SearchBar({ search, setSearch }) {
    return (
        <div className="input-group rounded">
            <input style={{}} type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
            aria-describedby="search-addon" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
    )
}
