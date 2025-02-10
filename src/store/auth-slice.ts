import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userRole: string | null;
  userId: number | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  userRole: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);

      const decodedToken: any = jwtDecode(action.payload.accessToken);

      state.userRole = decodedToken.role;
      state.userId = decodedToken.user_id;
    },
    clearToken: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.userRole = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    loadTokenFromStorage: (state) => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken) {
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        const decodedToken: any = jwtDecode(accessToken);

        state.userRole = decodedToken.role;
      }
    },
  },
});

export const { setTokens, clearToken, loadTokenFromStorage } =
  authSlice.actions;
export default authSlice.reducer;
