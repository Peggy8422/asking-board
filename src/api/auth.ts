import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASEURL;

//API請求的函式(跟使用者動作的函式不同)
//登入：使用者/管理者登入
interface loginParams {
  email: string;
  password: string;
}

export const loginRequest = async ({ email, password }: loginParams, role: string) => {
  try { 
    const { data } = await axios.post(`${baseURL}/v1/${role}/login`, {
      email,
      password
    });
    const { token, status } = data;
    
    if(token) { //有拿到token就自己寫成功定義+data
      return { success: true, ...data };
    }

    return status; //沒token直接回傳失敗狀態
  } catch (error) {
    console.log(error);
    return { success: false }
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
    const { status, data } = await axios.post(`${baseURL}/v1/users`, {
      name,
      email,
      password,
      confirmPassword,
      role
    });
    if (status === 200) {
      return { success: true, ...data };
    }

  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.message
      return { success: false, errorMessage }
    }
    throw new Error('different error than axios');
  }
}



