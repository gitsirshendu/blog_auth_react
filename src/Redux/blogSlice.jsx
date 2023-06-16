import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../API/apiURL";

const initialState = {
    articles: [],
    status: 'idle'
}

export const getBlogArticles = createAsyncThunk('Blog/List', async () => {
    try {
        const response = await axiosInstance.get('allBlog')
        return response?.data
    } catch (err) {
        toast.error(err)
    }
})

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducer: {},
    extraReducers: {
        [getBlogArticles.pending]: (state) => {
            state.status = 'loading'
            state.articles = null
        },
        [getBlogArticles.fulfilled]: (state, { payload }) => {
            state.status = 'success'
            state.articles = payload?.data
        },
        [getBlogArticles.rejected]: (state) => {
            state.status = 'failed'
            state.articles = null
        }
    }
})