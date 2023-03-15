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
    addUser: (state: User[], { payload }) => {
      return [payload, ...state] as any;
    },
    editUser: (state: any, { payload }) => {
      const user = state.find((user) => user.id == payload.id);
      const changedUser = payload;
      const index = state.indexOf(user as User);
      state[index] = changedUser;
      return state;
    },
    deleteUser: (state: any, { payload }) => {
      return state.filter((s) => !payload.ids.includes(s.id + ""));
    },
  },
});

export const { initializeUsers, addUser, editUser, deleteUser } =
  userSlice.actions;

export default userSlice.reducer;
