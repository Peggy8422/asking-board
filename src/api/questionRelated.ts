import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASEURL;

//首頁取得所有問題
export const userGetAllQuestions = async (
  token: string,
  grade = '',
  subject = '',
  keyword = '',
) => {
  try {
    const res = await axios.get(
      `${baseURL}/questions?grade=${grade}&subject=${subject}&keyword=${keyword}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//查看特定問題詳細內容
export const getQuestionDetail = async (token: string, id: number) => {
  try {
    const res = await axios.get(`${baseURL}/questions/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//查看特定問題的回答
export const getQuestionReplies = async (token: string, id: number) => {
  try {
    const res = await axios.get(`${baseURL}/questions/${id}/replies`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
