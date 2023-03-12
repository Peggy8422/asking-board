import { createSlice } from "@reduxjs/toolkit";

interface initStateType {
  user: unknown;
  email: string;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
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
  extraReducers: () => {}
})


export const {reset} = authSlice.actions;
export default authSlice.reducer;