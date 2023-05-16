import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { extractErrorMessage } from '../../utils'

import signinService from './signinService'

const initialState = {
    isLoading: false,
    isLoggedIn: false
  }

  export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
      return await signinService.login(user)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  })

  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false
          state.isLoggedIn = true
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false
          state.isLoggedIn = false
        })
    },
  })
  
  export default authSlice.reducer