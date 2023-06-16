import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../../Redux/categorySlice'
import { Link, useNavigate } from 'react-router-dom'
import { getLatestArticles } from '../../../Redux/latestBlogSlice'

const Sidebar = () => {
    const dispatch = useDispatch()
    const { category, status } = useSelector((state) => state.Category)
    const { latestArticles, latestArticlesStatus } = useSelector((state) => state.LatestArticles)
    const [searchText, setSearchText] = useState('')

    const searchTxt = (e) => {
        setSearchText(e.target.value)
    }

    const navigate = useNavigate()
    const searchArticles = (e) => {
        e.preventDefault()
        navigate(`/blog/search/${searchText}`)
    }

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getLatestArticles())
    }, [])

    return (
        <>
            <div className="card">
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => searchTxt(e)} />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={searchArticles}>Find</button>
                </form>
            </div>
            {/* Blog Categories */}
            <div className="card mt-3">
                <div className="card-header">
                    Categories
                </div>
                <ul className="list-group list-group-flush">
                    {
                        status === 'success' && category?.data !== null && category?.data !== undefined && category?.data !== '' ? (
                            <>
                                {
                                    category?.data.map((item, index) => {
                                        return (
                                            <>
                                                <li className="list-group-item" key={index + 1}><Link to={`/blog/category/${item._id}`}>{item.category}</Link></li>
                                            </>
                                        )
                                    })
                                }
                            </>
                        ) : (
                            <>
                                {
                                    status === 'loading' && <p className='pl-3 pt-3'>Loading...</p>
                                }
                            </>
                        )
                    }
                </ul>
            </div>
            {/* Latest Articles */}
            <div className="card mt-3">
                <div className="card-header">
                    Latest Articles
                </div>
                <ul className="list-group list-group-flush">
                    {
                        latestArticlesStatus === 'success' ? (
                            <>
                                {
                                    latestArticles?.data.map((latestPost, index) => {
                                        return (
                                            <>
                                                <li className="list-group-item" key={index + 1}><Link to={`/article/${latestPost._id}`}>{latestPost.title}</Link></li>
                                            </>
                                        )
                                    })
                                }
                            </>
                        ) : (
                            <>
                                {
                                    latestArticlesStatus === 'loading' && <p className='pl-3 pt-3'>Loading...</p>
                                }
                            </>
                        )
                    }
                </ul>
            </div>
        </>
    )
}

export default Sidebar
