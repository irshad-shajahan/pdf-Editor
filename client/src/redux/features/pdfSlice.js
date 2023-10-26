/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit'

export const pdfSlice = createSlice({
    name:'pdf',
    initialState:{
        file:null
    },
    reducers:{
        setPdf:(state, action)=>{
            state.file = action.payload
        }
    }
})

export const {setPdf} = pdfSlice.actions