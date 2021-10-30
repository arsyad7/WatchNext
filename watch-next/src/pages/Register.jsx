import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux'
import Navbar from '../components/Navbar';
import { register } from '../store/actions/actionUser';

export default function AddAdmin() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);

    function handleRegister(e) {
        e.preventDefault();

        dispatch(register({ email, password, username }))
            .then( () => {
                history.goBack();
            })
            .catch(err => {
                setError(err.response.data.message[0])
            })
    }

    return (
        <>
            <Navbar />
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4 mt-5 card">
                        <div className="p-3">
                            <h1><b>Register</b></h1><hr />
                            <form onSubmit={handleRegister}>
                                {
                                    error ? <p style={{ color: 'red'}}>{error}</p> : null
                                }
                                <div className="form-group mt-4">
                                    <label htmlFor="exampleInputEmail1"><b>Username</b></label>
                                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" placeholder="Enter username" />
                                </div>
                                <div className="form-group mt-4">
                                    <label htmlFor="exampleInputEmail1"><b>Email address</b></label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter email" />
                                </div>
                                <div className="form-group mt-4">
                                    <label htmlFor="exampleInputPassword1"><b>Password</b></label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                </div>
                                <div className="text-center mt-5">
                                    <button type="submit" className="btn btn-outline-dark w-100">Submit</button>
                                </div><hr />
                            </form>
                        </div>
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
        </>
    )
}
