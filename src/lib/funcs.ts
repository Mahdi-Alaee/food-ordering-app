import { Category, MenuItem } from "@/types/small-types";
import { Action, ActionFromReducer, Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

export const getItems = async (url: string) => {
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return data;
    } else return null;
  } catch (err) {
    return null;
  }
};

export const loadItems = async (
  url: string,
  dispatch: ThunkDispatch<
    {
      products: MenuItem[];
      categories: Category[];
    },
    undefined,
    UnknownAction
  > &
    Dispatch<UnknownAction>,
    action: Function
) => {
  const items = (await getItems(url)) as MenuItem[];
    dispatch(action(items));
};
