import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registRequest, registParams } from "../../api/auth";

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
        state.email = action.payload.email;
      })
      .addCase(regist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.email = '';
        state.message = action.payload;
      })
  }
})
 
//非同步處理：註冊，也是action creator
export const regist = createAsyncThunk('auth/regist', async (user: registParams, thunkAPI) => {
  try {
    const { success, data } = await registRequest(user)
    if(success) {
      return data.user;
    }
  } catch (error: any) {
    console.log(error); 
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// 基本的action creator
export const {reset} = authSlice.actions;
export default authSlice.reducer;