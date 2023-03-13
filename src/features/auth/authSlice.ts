import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registRequest, registParams, loginRequest, loginParams, logout } from "../../api/auth";

export interface initStateType {
  user: unknown;
  email: string;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: unknown;
}

//從localStorage取得存取的使用者資料&單獨email資料(為了註冊後導轉登入頁直接帶入email欄位)
const user = JSON.parse(localStorage.getItem('user')!);
const email = JSON.parse(localStorage.getItem('email')!);

const initialState = {
  user: user || null,
  email: email || '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
} as initStateType;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(regist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(regist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.email = action.payload.email || '';
      })
      .addCase(regist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.email = '';
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        console.log(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.email = '';
        state.message = action.payload;
      })
      .addCase(logoutAct.fulfilled, (state) => {
        state.user = null;
      })
  }
})
 
//非同步處理：註冊，也是action creator
export const regist = createAsyncThunk('auth/regist', async (user: registParams, thunkAPI) => {
  const data = await registRequest(user);
  if (data.status === "success") {
    return data.user;
  }

  return thunkAPI.rejectWithValue(data); //errormessage
})

//非同步處理：註冊，也是action creator
export const login = createAsyncThunk('auth/login', async (user: loginParams, thunkAPI) => {
  const data = await loginRequest(user, 'users');
  if (data.status === "success") {
    localStorage.setItem('token', data.token);
    return data.user;
  }

  return thunkAPI.rejectWithValue(data); //errormessage
})

//非同步處理：登出，也是action creator
export const logoutAct = createAsyncThunk('auth/logoutAct', async () => {
  logout();
})

// 基本的action creator
export const {reset} = authSlice.actions;
export default authSlice.reducer;