import { MenuItem } from "@/types/small-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MenuItem[] = [];

export const counterSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<MenuItem[]>) => {
      return action.payload;
    },
    addProduct: (state, action: PayloadAction<MenuItem>) => {
      console.log({ state, action });
      return [...state, action.payload];
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      console.log({ state, action });
      const newProducts = state.filter(
        (product) => product._id !== action.payload
      );
      console.log({ newProducts });

      return newProducts;
    },
  },
});

export const { addProduct, setProducts, deleteProduct } = counterSlice.actions;

export default counterSlice.reducer;
