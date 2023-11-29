import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const currentUser = JSON.parse(localStorage.getItem("userLogin"));

const cartSlice = createSlice({
    name: "auth",
    initialState: {
        cart: currentUser?.cart || []
    },
    reducers: {
        saveCart: (state, action) => {
            state.cart = action.payload
        }
    }
});
export const { saveCart } = cartSlice.actions;
export default cartSlice.reducer;