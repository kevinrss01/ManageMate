import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { UserState, StorageState } from "@/interfaces/Interfaces";

const initialState: UserState = {
  firstName: "",
  lastName: "",
  email: "",
  totalUserStorage: 0,
};

const initialStorage: StorageState = {
  availableStorage: 0,
  usedStorage: 0,
  files: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<UserState>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.totalUserStorage = action.payload.totalUserStorage;
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
      state.files = action.payload.files;
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
