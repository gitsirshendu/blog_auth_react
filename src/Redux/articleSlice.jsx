import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../API/apiURL"
import { toast } from "react-toastify"

const initialState = {
    article: {},
    articleStatus: 'idle'
}

export const getArticle = createAsyncThunk('Blog/Article', async (id) => {
    try {
        const response = await axiosInstance.get(`blogdetails/${id}`)
        return response?.data
    } catch (err) {
        toast.error(err)
    }

})

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducer: {},
    extraReducers: {
        [getArticle.pending]: (state) => {
            state.articleStatus = 'loading'
            state.article = null
        },
        [getArticle.fulfilled]: (state, { payload }) => {
            state.articleStatus = 'success'
            state.article = payload
        },
        [getArticle.rejected]: (state) => {
            state.articleStatus = 'failed'
            state.article = null
        }
    }
})