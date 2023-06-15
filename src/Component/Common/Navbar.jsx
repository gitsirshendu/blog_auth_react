import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { checkToken, logoutUser } from '../../Redux/authSlice'

const Navbar = () => {
    const dispatch = useDispatch()
    let { Logouttoggle } = useSelector((state) => state.Auth)
    const userName = localStorage.getItem('name')

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    useEffect(()=>{
        dispatch(checkToken())
    },[Logouttoggle])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                {
                    userName ?
                        <>
                            <Link className="navbar-brand" to="/">{userName}</Link>
                        </>
                        :
                        <>
                            <Link className="navbar-brand" to="/">Guest!</Link>
                        </>
                }

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav mr-auto my-2 my-lg-0 navbar-nav-scroll" style={{ maxHeight: '100px' }}>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/blog">Blog</Link>
                        </li>

                        {
                            Logouttoggle ?
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login" onClick={handleLogout}>Hi {userName} (Logout)</Link>
                                    </li>
                                </>
                                :
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                </>


                        }
                    </ul>

                </div>
            </nav>
        </>
    )
}

export default Navbar