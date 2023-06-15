import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../Redux/authSlice'

const Register = () => {

    const { loading, redirectAfterReg } = useSelector((state) => state.Auth)
    

    //     alpha@gmail.com
    // 12345678

    const initialValues = {
        name: '',
        mobile: '',
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
            case 'name':
                errorMsg = 'Name shound not be empty'
                break;
            case 'mobile':
                errorMsg = 'Mobile shound not be empty'
                break;
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

        if (user.name === '') error.name = 'Enter your name'

        if (user.mobile === '') error.phone = 'Enter your mobile'

        if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email)) error.email = 'Invalid email address'

        if (user.password === '') error.password = 'Enter password'

        return error
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitData = async (e) => {
        e.preventDefault()
        setPostError(validateData())

        let formData = new FormData()
        if (Object.keys(postError).length === 0) {
            formData.append('name', user.name)
            formData.append('mobile', user.mobile)
            formData.append('email', user.email)
            formData.append('password', user.password)

            dispatch(registerUser(formData))
        }
    }

    const redirectUser = () => {
        let name = localStorage.getItem('name')
        let isInRegisterPage = window.location.pathname.toLowerCase() === '/register'
        if (name !== '' && name !== null && name !== undefined) {
            isInRegisterPage && navigate(redirectAfterReg)
        }
    }

    useEffect(() => {
        redirectUser()
    }, [redirectAfterReg])

    // if(loading) return <p>Submitting data...</p>

    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className='col-lg-3'></div>
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                Registration Form
                            </div>
                            <div className="card-body">
                                <form method='post'>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" className="form-control" name='name' value={user.name} onChange={(e) => postData(e)} />
                                        <small className="form-text text-danger">{postError.name}</small>
                                    </div>
                                    <div className="form-group">
                                        <label>Mobile</label>
                                        <input type="text" className="form-control" name='mobile' onChange={(e) => postData(e)} />
                                        <small className="form-text text-danger">{postError.mobile}</small>
                                    </div>

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
                                    <button type="submit" onClick={submitData} className="btn btn-primary">Register Now</button>
                                    <p className='mt-2 font-weight-bold'>Already registered? <span className='font-weight-normal'><Link to="/login">click here</Link> to login</span></p>
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

export default Register
