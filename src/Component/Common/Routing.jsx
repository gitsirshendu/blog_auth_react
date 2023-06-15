import React from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Home from '../../Pages/Home'
import Register from '../../Pages/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from '../../Pages/Login'
import AboutUs from '../../Pages/AboutUs'
import Blog from '../../Pages/Blog'
import Article from '../../Pages/Article'
import NoPageFound from '../../Pages/NoPageFound'

const Routing = () => {
  function PrivateRoute({ children }) {
    let token = localStorage.getItem('token') || sessionStorage.getItem('token')
    return token !== null && token !== '' && token !== undefined ? (
      children
    ) : (
      <Navigate to='/login' />
    )
  }

  const PublicRoutes = [
    {
      Path: '/login',
      Element: <Login />
    },
    {
      Path: '/register',
      Element: <Register />
    }
  ]

  const PrivateRoutes = [
    {
      Path: '/',
      Element: <Home />
    },
    {
      Path: '*',
      Element: <NoPageFound/>
    },
    {
      Path: '/about',
      Element: <AboutUs />
    },
    {
      Path: '/blog',
      Element: <Blog />
    },
    {
      Path: '/article/:id',
      Element: <Article />
    }
  ]

  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          {/* <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/blog' element={<Blog />} /> */}
          {
            PublicRoutes?.map((route) => {
              return (
                <Route path={route.Path} element={route.Element} />
              )
            })
          }
          {
            PrivateRoutes?.map((route)=>{
              return (
                <Route path={route.Path} element={<PrivateRoute>{route.Element}</PrivateRoute>} />
              )
            })
          }
        </Routes>
      </Router>
    </>
  )
}

export default Routing
