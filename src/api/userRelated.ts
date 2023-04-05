import axios from 'axios';

// const baseURL = process.env.REACT_APP_API_BASEURL;
const baseURL = 'https://t7gnwvvq9h.execute-api.ap-northeast-1.amazonaws.com/api/v1';

//修改個人資料相關
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
    const { status, data } = await axios.put(
      `${baseURL}/users/account`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    );
    if (status === 200) {
      return data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessageData = error.response?.data;
      return errorMessageData;
    }
    throw new Error('different error than axios');
  }
};

//修改當前使用者頭貼、暱稱、自介
export interface ProfileFormData {
  avatar: string | File;
  name: string;
  introduction: string;
}
export const putUserProfile = async (
  token: string,
  { avatar, name, introduction }: ProfileFormData,
) => {
  try {
    const { data } = await axios.put(`${baseURL}/users`, {
      avatar,
      name,
      introduction,
    }, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
//在EditModal一渲染時先取使用者資料
export const getUserProfile = async (token: string) => {
  try {
    const { data } = await axios.get(`${baseURL}/users`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return data.currentUser;
  } catch (error) {
    console.log(error);
  }
}

//活躍用戶頁面相關
//取得最多追蹤者的用戶
export const getMostFollowerUsers = async (token: string) => {
  try {
    const { data } = await axios.get(`${baseURL}/users/most_followers`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

//取得回覆(回答數)最多的用戶
export const getMostReplyUsers = async (token: string) => {
  try {
    const { data } = await axios.get(`${baseURL}/users/most_replies`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

//取得收到最多讚的用戶
export const getMostLikedUsers = async (token: string) => {
  try {
    const { data } = await axios.get(`${baseURL}/users/most_liked`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

//個人資料頁面相關
//取得當前使用者個人資料(含自我介紹)，修改個人資料用
export const getCurrentUserInfo = async (token: string) => {
  try {
    const { status, data } = await axios.get(`${baseURL}/users`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (status === 200) {
      return data.currentUser;
    }
  } catch (error) {
    console.log(error);
  }
};

//取得用戶個人資料，[從頭貼點過去]
export const getOtherUsersInfo = async (token: string, id: number) => {
  try {
    const { status, data } = await axios.get(`${baseURL}/users/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (status === 200) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

//取得特定用戶的所有提問
export const getUserAllQuestions = async (token: string, id: number) => {
  try {
    const { status, data } = await axios.get(
      `${baseURL}/users/${id}/questions`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );
    if (status === 200) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

//取得特定用戶收藏的問題
export const getUserLikedQuestions = async (token: string, id: number) => {
  try {
    const { status, data } = await axios.get(`${baseURL}/users/${id}/likes`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (status === 200) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

//取得特定用戶所有發過的回答
export const getUserAllReplies = async (token: string, id: number) => {
  try {
    const { status, data } = await axios.get(`${baseURL}/users/${id}/replies`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (status === 200) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
