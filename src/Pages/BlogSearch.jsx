import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Sidebar from '../Component/Core/Blog/Sidebar'
import { findArticles } from '../Redux/blogSearchSlice'

const BlogSearch = () => {
    const dispatch = useDispatch()
    const { srctxt } = useParams()
    const { searchedArticles, searchedStatus } = useSelector((state) => state?.SearchBlog)

    useEffect(() => {
        console.log(srctxt);
        dispatch(findArticles(srctxt))
    }, [srctxt])

    console.log(searchedArticles);

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
                            searchedArticles !== null && searchedArticles !== undefined && searchedArticles !== '' ? (
                                <>
                                    {
                                        searchedArticles?.slice(0, loadMoreRecords).map((item, index) => {
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
                                        loadMoreRecords < searchedArticles?.length && (
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

                                        searchedStatus === 'loading' && <p>Loading...</p>

                                    }
                                </>
                            )
                        }
                        {
                            searchedArticles?.length === 0 && <p>No matching records found!</p>
                        }
                        {/* Repeater Begin */}



                        {/* Repeater End */}

                    </div>
                    <div className="col-3">
                        <Sidebar />
                    </div>
                </div>
            </div>


        </>
    )
}

export default BlogSearch
