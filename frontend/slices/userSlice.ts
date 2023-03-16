import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export interface UserState {
  firstName: string;
  lastName: string;
  email: string;
}

const initialState: UserState = {
  firstName: "",
  lastName: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<UserState>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
    remove: (state) => {
      //
    },
  },
});

// Action creators are generated for each case reducer function
export const { update, remove } = userSlice.actions;

export const selectValue = (state: RootState) => state.user;

export default userSlice.reducer;
