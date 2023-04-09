import axios from 'axios';

// const baseURL = process.env.REACT_APP_API_BASEURL;
const baseURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_BASEURL : 'https://asking-board.fly.dev/api/v1';

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
};

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
};

//管理者刪除特定問題
export const deleteQuestion = async (questionId: number, token: string) => {
  try {
    const { status } = await axios.delete(
      `${baseURL}/admin/questions/${questionId}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );
    if (status === 200) {
      return { success: true };
    }
  } catch (error) {
    console.log(error);
  }
};
