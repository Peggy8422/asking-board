import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registRequest, registParams, loginRequest, loginParams, logout, googleAuthRequest } from "../../api/auth";

export interface initStateType {
  user: unknown;
  isLocalAccount: boolean;
  email: string;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isGoogleLoading: boolean;
  message: unknown;
  isAvatarChanged: boolean;
}

//從localStorage取得存取的使用者資料&單獨email資料(為了註冊後導轉登入頁直接帶入email欄位)
const user = JSON.parse(localStorage.getItem('currentUser')!);
const email = user?.email;

const initialState = {
  user: user || null,
  isLocalAccount: true,
  email: email || '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  isGoogleLoading: false,
  message: '',
  isAvatarChanged: false,
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
    },
    clearEmail: (state) => {
      state.email = '';
    },
    toggleAvatarChanged: (state) => {
      state.isAvatarChanged = true;
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
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.email = '';
        state.message = action.payload;
      })
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.email = '';
        state.message = action.payload;
        
      })
      .addCase(logoutAct.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(googleLogin.pending, (state) => {
        state.isGoogleLoading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isGoogleLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(googleLogin.rejected, (state) => {
        state.isGoogleLoading = false;
        state.isError = true;
        state.user = null;
        state.email = '';
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
    localStorage.setItem('currentUser', JSON.stringify(data.user));
    return data.user;
  }

  return thunkAPI.rejectWithValue(data); //errormessage
})

//非同步處理：登出，也是action creator
export const logoutAct = createAsyncThunk('auth/logoutAct', async () => {
  logout();
})

//非同步處理：管理者登入，也是action creator
export const adminLogin = createAsyncThunk('auth/adminLogin', async (user: loginParams, thunkAPI) => {
  const data = await loginRequest(user, 'admin');
  if (data.status === "success") {
    localStorage.setItem('token', data.token);
    localStorage.setItem('currentUser', JSON.stringify(data.admin));
    return data.admin;
  }

  return thunkAPI.rejectWithValue(data); //errormessage
})

//非同步處理：使用google登入
export const googleLogin = createAsyncThunk('auth/googleLogin', async () => {
  const data = await googleAuthRequest();
  if (data.status === 'success') {
    localStorage.setItem('token', data.token);
    localStorage.setItem('currentUser', JSON.stringify(data.user));
    return data.user;
  }

})

// 基本的action creator
export const {reset, clearEmail, toggleAvatarChanged} = authSlice.actions;
export default authSlice.reducer;