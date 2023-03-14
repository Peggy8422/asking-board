import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASEURL;

//管理者取得所有問題
export const getAllQuestions = async (token: string) => {
  try {
    const res = await axios.get(`${baseURL}/admin/questions`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

//管理者取得所有使用者資料
export const getAllUsers = async (token: string) => {
  try {
    const res = await axios.get(`${baseURL}/admin/users`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}