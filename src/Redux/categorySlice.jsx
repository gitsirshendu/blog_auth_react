import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../API/apiURL"
import { toast } from "react-toastify"

const initialState = {
    category: [],
    status: 'idle'
}

export const getCategories = createAsyncThunk('Blog/Categories', async () => {
    try {
        const response = await axiosInstance.get('showallcategory')
        return response?.data
    } catch (err) {
        toast.error(err)
    }

})

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: {
        [getCategories.pending]: (state) => {
            state.status = 'loading'
            state.category = null
        },
        [getCategories.fulfilled]: (state, { payload }) => {
            state.status = 'success'
            state.category = payload
        },
        [getCategories.rejected]: (state) => {
            state.status = 'failed'
        }
    }
})