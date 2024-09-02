import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./productsReducer";
import categoriesReducer from "./categoriesReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
});

export default rootReducer;
