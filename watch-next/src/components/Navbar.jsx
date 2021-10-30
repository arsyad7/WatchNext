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
                <form className="d-flex">
                    {/* <button className="btn btn-outline-success" type="submit">Sign Out</button> */}
                    {/* <button className="btn btn-outline-success" type="submit">Sign In</button> */}
                    {
                        localStorage.getItem("access_token")
                        ? <Link className="navbar-brand mt-3" to="Login" onClick={handleSignOut}>
                            <p style={{ color: 'white', justifyContent: 'center', alignItems: 'center'}}>Sign Out</p>
                        </Link>
                        : <Link className="navbar-brand mt-3" to="Login">
                            <p style={{ color: 'white', justifyContent: 'center', alignItems: 'center'}}>Sign In</p>
                        </Link>
                    }
                </form>
            </div>
        </nav>
    )
}
