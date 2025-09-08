import { configureStore } from '@reduxjs/toolkit'
import userRegisterReducer from './User/userRegisterSlice'

// here we create a store
export const store = configureStore({
    reducer:{
        user: userRegisterReducer
    }
})
