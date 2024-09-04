import { Category } from "@/types/small-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Category[] = [];

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (_state, action: PayloadAction<Category[]>) => {
      return action.payload.reverse();
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      return [action.payload, ...state];
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      const newCategorys = state.filter(
        (category) => category._id !== action.payload
      );

      return newCategorys;
    },
  },
});

export const { addCategory, deleteCategory, setCategories } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
