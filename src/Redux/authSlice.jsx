import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../API/apiURL'
import { toast } from 'react-toastify'

const initialState = {
    loading: false,
    user: {},
    redirectTo: null,
    Logouttoggle: false,
    userName: false,
    redirectAfterReg: null
}

export const registerUser = createAsyncThunk('user/register', async (user) => {
    try {
        const response = await axiosInstance.post("register", user)
        return response?.data
    } catch (err) {
        return err?.response?.data
    }
})

export const loginUser = createAsyncThunk('user/login', async (user) => {
    try {
        const response = await axiosInstance.post("login", user)
        return response?.data
    } catch (err) {
        return err?.response?.data
    }
})


export const authSlice = createSlice({
    name: 'user account',
    initialState,
    reducers: {
        redirectAfterRegPage: (state, action) => {
            state.redirectAfterReg = action.payload
        },

        redirectToPage: (state, { payload }) => {
            state.redirectTo = payload
        },

        checkToken: (state, { payload }) => {
            let token = localStorage.getItem('token')
            if (token !== '' && token !== null && token !== undefined) {
                state.Logouttoggle = true
            }
        },
        logoutUser: (state, { payload }) => {
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            toast.success('Logout Successfully', {
                position: toast.POSITION.TOP_CENTER
            })
            state.Logouttoggle = false
        }
    },
    extraReducers: {
        //Registration Process
        [registerUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [registerUser.fulfilled]: (state, { payload }) => {

            if (payload.success) {
                state.loading = false
                localStorage.setItem('name', payload.data.name)
                state.redirectAfterReg = '/login'
                toast.success('Registered Successfully', {
                    position: toast.POSITION.TOP_CENTER
                })
            } else {
                toast.error(payload.msg, {
                    position: toast.POSITION.TOP_CENTER
                })
            }


        },
        [registerUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        //Login Process
        [loginUser.pending]: (state) => {
            state.loading = true
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            try {
                if (payload.status == 200) {
                    state.loading = false
                    localStorage.setItem('token', payload?.token)
                    localStorage.setItem('name', payload?.user.name)
                    state.Logouttoggle = true
                    state.redirectTo = '/'
                    toast.success(`Hi ${payload?.user.name}, ${payload?.message}`, {
                        position: toast.POSITION.TOP_CENTER
                    })
                } else if (payload.status == 400) {
                    toast.error(payload.message, {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
            } catch (err) {
                toast.error(err)
            }

        },
        [loginUser.rejected]: (state, { payload }) => {
            state.loading = false
        }
    }
})

export const { redirectAfterRegPage, redirectToPage, checkToken, logoutUser } = authSlice.actions