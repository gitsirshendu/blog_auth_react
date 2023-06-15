import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../Redux/authSlice'


const Login = () => {

    const { redirectTo, loading } = useSelector((state) => state.Auth)

    const initialValues = {
        email: '',
        password: ''
    }
    const [user, setUser] = useState(initialValues)
    const [postError, setPostError] = useState({})
    let name, value
    const postData = (e) => {
        name = e.target.name
        value = e.target.value

        let errorMsg = ''
        switch (name) {
            case 'email':
                errorMsg = 'Email shound not be empty'
                break;
            case 'password':
                errorMsg = 'Password shound not be empty'
                break;
            default:
                errorMsg = ''
        }

        if (value.length === 0) {
            setPostError({ ...postError, [name]: errorMsg })
            setUser({ ...user, [name]: '' })
        } else {
            setPostError({ ...postError, [name]: '' })
            setUser({ ...user, [name]: value })
        }
    }

    const validateData = () => {
        let error = {}

        if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email)) error.email = 'Invalid email address'

        if (user.password === '') error.password = 'Enter password'

        return error
    }

    const dispatch = useDispatch()

    const submitData = async (e) => {
        e.preventDefault()
        setPostError(validateData())

        // let formData = new FormData()
        if (Object.keys(postError).length === 0) {

            // formData.append('email', user.email)
            // formData.append('password', user.password)

            let data = {
                "email": user.email,
                "password": user.password,
            }

            dispatch(loginUser(data))
        }
    }

    const navigate = useNavigate()
    const redirectUser = () => {
        let token = localStorage.getItem('token')
        let isInLoginPage = window.location.pathname.toLowerCase() === '/login'

        if (token !== null && token !== '' && token !== undefined) {
            isInLoginPage && navigate('/')
        }
    }

    useEffect(() => {
        redirectUser()
    }, [redirectTo])

    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className='col-lg-3'></div>
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                Login Form
                            </div>
                            <div className="card-body">
                                <form method='post'>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" className="form-control" name='email' onChange={(e) => postData(e)} />
                                        <small className="form-text text-danger">{postError.email}</small>
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" name='password' onChange={(e) => postData(e)} />
                                        <small className="form-text text-danger">{postError.password}</small>
                                    </div>
                                    <button type="submit" onClick={submitData} className="btn btn-primary">Login</button>
                                    <p className='mt-2 font-weight-bold'>Yet not registered? <span className='font-weight-normal'><Link to="/register">click here</Link> to register</span></p>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3'></div>
                </div>
            </div>
        </>
    )
}

export default Login
