import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../API/apiURL";

const initialState = {
    latestArticles: [],
    latestArticlesStatus: 'idle'
}

export const getLatestArticles = createAsyncThunk('Blog/Latest Articles', async () => {
    try {
        const response = await axiosInstance.get('letest-post')
        return response?.data
    } catch (err) {
        toast.error(err)
    }
})

export const latestBlogSlice = createSlice({
    name: 'latest blog',
    initialState,
    reducer: {},
    extraReducers: {
        [getLatestArticles.pending]: (state) => {
            state.latestArticlesStatus = 'loading'
            state.latestArticles = null
        },
        [getLatestArticles.fulfilled]: (state, { payload }) => {
            state.latestArticlesStatus = 'success'
            state.latestArticles = payload
        },
        [getLatestArticles.rejected]: (state) => {
            state.latestArticlesStatus = 'failed'
            state.latestArticles = null
        }
    }
})