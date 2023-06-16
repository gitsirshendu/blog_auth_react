import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../API/apiURL"

const initialState = {
    articlesByCategory: [],
    articlesByCategoryStatus: 'idle'
}

export const getArticlesByCategory = createAsyncThunk('Blog/Category/Articles', async (id) => {
    try {
        const response = await axiosInstance.get(`category/post/${id}`)
        // console.log(response?.data);
        return response?.data
    } catch (err) {
        return err
    }
})

export const blogByCategorySlice = createSlice({
    name: 'blog by category',
    initialState,
    reducer: {},
    extraReducers: {
        [getArticlesByCategory.pending]: (state) => {
            state.articlesByCategoryStatus = 'loading'
        },
        [getArticlesByCategory.fulfilled]: (state, { payload }) => {
            if (payload.status == 'success') {
                state.articlesByCategory = payload
                state.articlesByCategoryStatus = payload.status
            }
        },
        [getArticlesByCategory.rejected]: (state) => {
            state.articlesByCategoryStatus = 'failed'
        }
    }
})