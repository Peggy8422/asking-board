import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASEURL;

//修改當前使用者帳戶資訊
export interface formData {
  email: string;
  role: string;
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
}
export const accountSettings = async (token: string, formData: formData) => {
  try {
    const { status, data } = await axios.put(`${baseURL}/users/account`, 
    formData,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    });
    if (status === 200) {
      return data;
    }

  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessageData = error.response?.data
      return errorMessageData;
    }
    throw new Error('different error than axios');
  }
}