import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axiosInstance'

const initialState={
    products:[],
    product:{},
    loading:false,
    error:null
}

export const allProducts =createAsyncThunk('product/allProducts',async (_, {rejectWithValue}) => {
    try {
        const response=await axiosInstance.get('/api/products')
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const singleProduct=createAsyncThunk('product/singleProduct', async (id, {rejectWithValue}) => {
    try {
        const response=await axiosInstance.get(`/api/products/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const addProduct =createAsyncThunk('product/addProduct',async (productData,{rejectWithValue}) => {
    try {
        const response =await axiosInstance.post('/api/products')
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const updateProduct=createAsyncThunk('product/updateProduct', async ({id,productData},{rejectWithValue}) => {
     try {
        const response=await axiosInstance.put(`/api/products/${id}`, productData)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const deleteProduct=createAsyncThunk('product/deleteProduct', async (id, {rejectWithValue}) => {
    try {
       await axiosInstance.delete(`/api/products/${id}`)
        return id
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

const productSlice =createSlice({
    name:'product',
    initialState,
    reducers:{
        clearError:(state)=>{
            state.error=null
        },
        reset:(state)=>{
            state.products=[],
            state.error=null,
            state.loading=false
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(allProducts.pending, (state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(allProducts.fulfilled, (state,action)=>{
            state.loading=false;
            state.products=action.payload;
            state.error=null
        })
        .addCase(allProducts.rejected, (state,action)=>{
            state.loading=false;
            state.products=[],
            state.error=action.payload
        })
        .addCase(singleProduct.pending, (state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(singleProduct.fulfilled, (state,action)=>{
            state.loading=false;
            state.product=action.payload;
            state.error=null
        })
        .addCase(singleProduct.rejected, (state,action)=>{
            state.loading=false;
            state.product={},
            state.error=action.payload
        })
    }
})

export const {clearError, reset}=productSlice.actions
export default productSlice.reducer