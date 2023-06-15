import React, { useEffect } from 'react'
import Sidebar from '../Component/Core/Blog/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getArticle } from '../Redux/articleSlice'

const Article = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { article, articleStatus } = useSelector((state) => state.Article)

    useEffect(() => {
        dispatch(getArticle(id))
    }, [id])
    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div class="col-9">
                        {
                            articleStatus === 'loading' ? (
                                <>
                                    <p>Loading...</p>
                                </>
                            ) : (
                                <>
                                    <div class="card">
                                        {/* <img src="..." class="card-img-top" alt="..." /> */}
                                        <div class="card-body">
                                            <h1 class="card-title">{article?.data?.title}</h1>
                                            <p className='card-text' dangerouslySetInnerHTML={{
                                                __html: article?.data?.postText
                                            }}>

                                            </p>
                                        </div>
                                    </div>
                                </>
                            )
                        }


                    </div>
                    <div class="col-3">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Article
