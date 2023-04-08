import axios from "axios";

// const baseURL = process.env.REACT_APP_API_BASEURL;
const baseURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_BASEURL : 'https://t7gnwvvq9h.execute-api.ap-northeast-1.amazonaws.com/api/v1';

//API請求的函式(跟使用者動作的函式不同)
//登入：使用者/管理者登入
export interface loginParams {
  email: string;
  password: string;
}

export const loginRequest = async ({ email, password }: loginParams, role: string) => {
  try { 
    const { data } = await axios.post(`${baseURL}/${role}/login`, {
      email,
      password
    });
    const { token } = data;
    
    if(token) { 
      return data;
    }

  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.message
      return errorMessage;
    }
    throw new Error('different error than axios');
  }
}

//註冊：使用者註冊
export interface registParams {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export const registRequest = async ({
  name,
  email,
  password,
  confirmPassword,
  role
}: registParams) => {
  try { 
    const { status, data } = await axios.post(`${baseURL}/users`, {
      name,
      email,
      password,
      confirmPassword,
      role
    });
    if (status === 200) {
      console.log(data);
      return data;
    }

  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.message
      return errorMessage;
    }
    throw new Error('different error than axios');
  }
}

//登出：不需發API請求但放在此統一定義
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
}


//前台使用者透過google帳號註冊登入
//發取得google登入選擇帳戶頁面的請求
export const googleAuthRequest = async () => {
  try {
    const {status, data} = await axios.get(`${baseURL}/auth/google/callback`, {
      timeout: 10000,
    });

    if (status === 200) {
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.message
      return errorMessage;
    }
    throw new Error('different error than axios');
  }
}

export const aTagUrlForGoogle = `${baseURL}/auth/google`;