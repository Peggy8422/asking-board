import axios from 'axios';

// const baseURL = process.env.REACT_APP_API_BASEURL;
const baseURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_BASEURL : 'https://t7gnwvvq9h.execute-api.ap-northeast-1.amazonaws.com/api/v1';

//取得特定使用者的追蹤者
export const getUserFollowers = async (token: string, id: number) => {
  try {
    const res = await axios.get(`${baseURL}/users/${id}/followers`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

//取得特定使用者的追蹤中
export const getUserFollowings = async (token: string, id: number) => {
  try {
    const res = await axios.get(`${baseURL}/users/${id}/followings`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

//追蹤特定使用者
export const postFollowedUser = async (token: string, id: number) => {
  try {
    const { status } = await axios({
      method: 'POST',
      url: `${baseURL}/followships/${id}`,
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return status;
  } catch (error) {
    console.log(error);
  }
} 

//取消追蹤特定使用者
export const deleteFollowedUser = async (token: string, id: number) => {
  try {
    const { status } = await axios.delete(`${baseURL}/followships/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return status;
  } catch (error) {
    console.log(error);
  }
}