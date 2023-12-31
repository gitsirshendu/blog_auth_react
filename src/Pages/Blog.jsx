import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Sidebar from '../Component/Core/Blog/Sidebar'
import { getBlogArticles } from '../Redux/blogSlice'

const Blog = () => {
    const dispatch = useDispatch()
    const { articles, status } = useSelector((state) => state?.Blog)

    useEffect(() => {
        dispatch(getBlogArticles())
    }, [])

    const recordsToDisplay = process.env.REACT_APP_RECORDS_TO_DISPLAY
    const [loadMoreRecords, setLoadMoreRecords] = useState(recordsToDisplay)
    const handleLoadmore = () => {
        setLoadMoreRecords(loadMoreRecords + recordsToDisplay)
    }

    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-9">
                        {
                            articles !== null && articles !== undefined && articles !== '' && status === 'success' ? (
                                <>
                                    {
                                        articles?.slice(0, loadMoreRecords).map((item, index) => {
                                            return (
                                                <>
                                                    <div className="row border pt-3 pb-3 mb-3" key={index + 1}>
                                                        <div className='col-4'>
                                                            <div className="card">
                                                                <img src={`https://backendapinodejsraju.herokuapp.com/uploads/${item.image}`} className="card-img-top" alt={item.title} />
                                                            </div>
                                                        </div>
                                                        <div className='col-8'>

                                                            <h5 className="card-title">{item.title}</h5>
                                                            <p className='card-text' dangerouslySetInnerHTML={{
                                                                __html: item?.postText.slice(0, 250)
                                                            }}>

                                                            </p>
                                                            <Link to={`/article/${item._id}`} className="btn btn-primary">View details</Link>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                    {
                                        loadMoreRecords < articles?.length && (
                                            <>
                                                <div className='text-center'>
                                                    <button className="btn btn-primary" onClick={handleLoadmore}>Load more</button>
                                                </div>
                                            </>
                                        )
                                    }
                                </>
                            ) : (
                                <>
                                    {
                                        status === 'loading' && <p>Loading...</p>
                                    }
                                </>
                            )
                        }

                    </div>
                    <div className="col-3">
                        <Sidebar />
                    </div>
                </div>
            </div>


        </>
    )
}

export default Blog
