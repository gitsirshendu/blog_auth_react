import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../API/apiURL";

const initialState = {
    searchedArticles: [],
    searchedStatus: 'idle'
}

export const findArticles = createAsyncThunk('Blog/Search', async (txt) => {
    // console.log(txt);
    try {
        const response = await axiosInstance.get(`search/${txt}`)
        return response
    } catch (err) {
        return err
    }
})

export const blogSearchSlice = createSlice({
    name: 'blog',
    initialState,
    reducer: {},
    extraReducers: {
        [findArticles.pending]: (state) => {
            state.searchedStatus = 'loading'
            state.searchedArticles = null
        },
        [findArticles.fulfilled]: (state, { payload }) => {
            state.searchedStatus = 'success'
            state.searchedArticles = payload?.data
        },
        [findArticles.rejected]: (state) => {
            state.searchedStatus = 'failed'
            state.searchedArticles = null
        }
    }
})