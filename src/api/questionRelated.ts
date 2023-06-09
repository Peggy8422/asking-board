import axios from 'axios';

// const baseURL = process.env.REACT_APP_API_BASEURL;
const baseURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_BASEURL : 'https://t7gnwvvq9h.execute-api.ap-northeast-1.amazonaws.com/api/v1';

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

//查看特定問題的回答(id: 問題的id)
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

//取得熱門問題
export const getHotIssues = async (token: string, grade = '') => {
  try {
    const res = await axios.get(`${baseURL}/questions/popular?grade=${grade}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

//回覆特定問題(id: 問題的id)
export const postQuestionReply = async (token: string, id: number, reply: {}) => {
  try {
    const { data } = await axios.post(`${baseURL}/questions/${id}/replies`, reply, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    
    return data.status;
  } catch (error) {
    console.log(error);
  }
}

//收藏特定問題
export const postLikedQuestion = async (token: string, id: number) => {
  try {
    const { status } = await axios({
      method: 'POST',
      url: `${baseURL}/questions/${id}/like`,
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    return status;
  } catch (error) {
    console.log(error);
  }
}

//取消收藏特定問題
export const deleteLikedQuestion = async (token: string, id: number) => {
  try {
    const { status } = await axios({
      method: 'DELETE',
      url: `${baseURL}/questions/${id}/like`,
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    return status;
  } catch (error) {
    console.log(error);
  }
}

//對特定回答按讚
export const postLikedReply = async (token: string, id: number) => {
  try {
    const { status } = await axios({
      method: 'POST',
      url: `${baseURL}/replies/${id}/like`,
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return status;
  } catch (error) {
    console.log(error);
  }
}

//對特定問題取消讚
export const deleteLikedReply = async (token: string, id: number) => {
  try {
    const { status } = await axios({
      method: 'DELETE',
      url: `${baseURL}/replies/${id}/like`,
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return status;
  } catch (error) {
    console.log(error);
  }
}

//新增提問
export interface QuestionFormData {
  title: string;
  description: string;
  isAnonymous: boolean;
  grade: string;
  subject: string;
  image: File | string;
}

export const postNewQuestion = async (token: string, formData: QuestionFormData) => {
  try {
    const { status } = await axios.post(`${baseURL}/questions`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
    });

    return status;
  } catch (error) {
    console.log(error);
  }
}

//編輯提問
export const editQuestion = async (token: string, id: number, formData: QuestionFormData) => {
  try {
    const { status } = await axios.put(`${baseURL}/questions/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
    });

    return status;
  } catch (error) {
    console.log(error);
  }
}

//刪除自己的回答
export const deleteUserReply = async (token: string, id: number) => {
  try {
    const { status } = await axios.delete(`${baseURL}/replies/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return status;
  } catch (error) {
    console.log(error);
  }
}