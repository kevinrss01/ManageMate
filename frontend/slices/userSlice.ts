import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export interface UserState {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
}

const initialState: UserState = {
  firstName: "",
  lastName: "",
  email: "",
};

export interface StorageState {
  availableStorage: number;
  usedStorage: number;
}

const initialStorage: StorageState = {
  availableStorage: 20971520,
  usedStorage: 0,
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

export const storageSlice = createSlice({
  name: "storage",
  initialState: initialStorage,
  reducers: {
    updateStorage: (state, action: PayloadAction<StorageState>) => {
      state.availableStorage = action.payload.availableStorage;
      state.usedStorage = action.payload.usedStorage;
    },
    remove: (state) => {
      //
    },
  },
});

// Action creators are generated for each case reducer function
export const { update, remove } = userSlice.actions;
export const { updateStorage, remove: removeStorage } = storageSlice.actions;
export const selectUser = (state: RootState) => state.user;
export const selectStorage = (state: RootState) => state.storage;

export default userSlice.reducer;
export const storageReducer = storageSlice.reducer;
