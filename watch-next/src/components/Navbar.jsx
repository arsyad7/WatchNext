import React from 'react'
import { Link } from "react-router-dom";

export default function Navbar() {
    function handleSignOut() {
        localStorage.clear()
    }

    return (
        <nav className="navbar navbar-light bg-blue">
            <div className="container">
                <Link className="navbar-brand mt-3" to="Home">
                    <h2 style={{ color: 'white' }}>WatchNext</h2>
                </Link>
                {
                    localStorage.getItem("username") 
                    ? <p className="navbar-brand mt-3 mr-5" style={{ color: 'white', justifyContent: 'center', alignItems: 'center'}}>Hello, {localStorage.getItem("username")}!!!</p>
                    : null
                }
                <form className="d-flex">
                    {
                        localStorage.getItem("access_token")
                        ? 
                            <>
                                <Link className="navbar-brand mt-3" to="Watchlists">
                                    <p style={{ color: 'white', justifyContent: 'center', alignItems: 'center'}}>WatchLists</p>
                                </Link>
                                <Link className="navbar-brand mt-3" to="Login" onClick={handleSignOut}>
                                    <p style={{ color: 'white', justifyContent: 'center', alignItems: 'center'}}>Sign Out</p>
                                </Link>
                            </>
                        : <Link className="navbar-brand mt-3" to="Login">
                            <p style={{ color: 'white', justifyContent: 'center', alignItems: 'center'}}>Sign In</p>
                        </Link>
                    }
                </form>
            </div>
        </nav>
    )
}
