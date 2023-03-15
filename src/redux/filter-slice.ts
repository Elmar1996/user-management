import { createSlice } from "@reduxjs/toolkit";

export type Filter = {
  name: string;
  username: string;
  phone: string;
  email: string;
};



export const filterSlice = createSlice({
  name: "filters",
  initialState: {name:"",username:"",phone:"",email:""},
  reducers: {
    filterUsers: (state: any, { payload }) => {
      return {...state, ...payload} ;
    },
  },
});

export const { filterUsers } =
  filterSlice.actions;

export default filterSlice.reducer;
