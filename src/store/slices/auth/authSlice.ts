import { createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
  user: any;
  role: string;
}

const initialState: InitialStateProps = {
  user: "",
  role: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    logout: (state) => {
      state.user = "";
      state.role = "";
    },
  },
});

export const { setAuth, setRole, logout } = authSlice.actions;
