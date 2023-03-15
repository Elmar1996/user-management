import { createSlice } from "@reduxjs/toolkit";

export type User = {
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
};

export const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    initializeUsers: (_state: User[], { payload }) => {
      return payload;
    },
    addUser: (state:User[], {payload}) => {
      return [...state, payload] as any
    },
    editUser: (state:any, {payload}) => {
      const user = state.find((user) => user.id == payload.id);
      const changedUser = payload;
      const index = state.indexOf(user as User);
      state[index] = changedUser;
      return state;
    },
    deleteUser: (state:any, {payload}) => {
      return state.filter(s => s.id != payload.id);
    },
    
    // deleteuser: (state: any, { payload }) => {
    //   return state.filter((user) => user.id !== payload);
    // },

  
  },
});

export const {
  initializeUsers,
  addUser,
  editUser,
  deleteUser
} = userSlice.actions;

export default userSlice.reducer;
