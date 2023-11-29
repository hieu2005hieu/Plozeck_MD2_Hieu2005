import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./redux-toolkit/cartSlice";
const rootReducer = combineReducers({
    cartSlice
});
const store = configureStore({
    reducer: rootReducer,
});
export default store;