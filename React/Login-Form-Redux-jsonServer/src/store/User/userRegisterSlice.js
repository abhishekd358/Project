import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const userRegisterFetch = createAsyncThunk(
    // from this type we going to register or add user to our JSON DATABASE
    'user/userRegisterFetch', // pass the user action type
    async (formData) => { // when we call post method or get method on server or api we get return JSON
        const response = await axios.post('http://localhost:3000/users', formData)
        console.log(response)
        return response.data
    })


const initialState = {  //inital state basically we storing user name , email and password
    name:'',
    email:'',
    password:'',
    status: 'idle',
    error: null
}

console.log("states",initialState)
// crate slice

export const userRegisterSlice = createSlice({
    name:'user',
    initialState,

    reducers:{
        // wile user try to register we take user  name and email and password from user and store in initial state , onchange function 
        captureName(state, action){
            state.name = action.payload  // and we get name that user inputed in filled by action payload
        },
        captureEmail(state, action){
            state.email = action.payload  // and we get name that user inputed in filled by action payload
        },
        capturePassword(state, action){
            state.password = action.payload  // and we get name that user inputed in filled by action payload
        },
        clearFields(state){
            state.name = '',
            state.email='',
            state.password =''
        }
    },


    // when the our axios call /api call fails then what we do 
    extraReducers: (builder)=>
        builder
            .addCase(userRegisterFetch.pending, (state)=>{
                state.status = 'loading'
            })
            .addCase(userRegisterFetch.fulfilled, (state, action)=>{
                state.status ="success"
                // store the new user info
                state.name = action.payload.name
                state.email = action.payload.email
                state.password = action.payload.password
            })
            .addCase(userRegisterFetch.rejected, (state, action)=>{
                state.status = 'failed'
                state.error = action.error.message
            })
})

export const {captureName, captureEmail, capturePassword, clearFields} = userRegisterSlice.actions;
export default userRegisterSlice.reducer;