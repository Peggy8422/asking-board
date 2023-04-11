//工具
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { adminLogin, reset } from '../features/auth/authSlice';
//元件
import AuthForm, { AuthInput } from '../components/AuthForm';
import { Box, useColorModeValue } from '@chakra-ui/react';

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //樣式顏色
  //背景色切換
  const bgColor = useColorModeValue('brand.400', 'gray.700')

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );

  const token = localStorage.getItem('token')!

  useEffect(() => {
    if (isError) {
      Swal.fire({
        position: 'top',
        title: '登入失敗',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
    }

    if (isSuccess) {
      Swal.fire({
        position: 'top',
        title: '登入成功',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });
      dispatch(reset());
      navigate('/admin_home');
    }

    if (token && user?.role === 'admin') {
      navigate('/admin_home');
    }

  }, [isError, isSuccess, dispatch, navigate, user?.role, token])

  const handleAdminLoginClicked = () => {
    dispatch(adminLogin(formData) as any); //發送登入請求
  }

  return (
    <Box w={'100%'} h={'100vh'} bg={bgColor}>
      <AuthForm isUser={false} isOnRegist={false} onClickLogin={handleAdminLoginClicked} isLoading={isLoading} >
        <AuthInput
          label="Email(帳號)"
          type="email"
          value={formData.email}
          placeholder="請輸入Email"
          onChange={(e) => {
            setFormData({ ...formData, email: e!.target.value });
          }}
          isError={isError}
          errorMsg={message || ''}
        />
        <AuthInput
          label="密碼"
          type="password"
          value={formData.password}
          placeholder="請輸入密碼"
          onChange={(e) => {
            setFormData({ ...formData, password: e!.target.value });
          }}
          isError={isError}
          errorMsg={message || ''}
        />
      </AuthForm>
    </Box>
  );
};

export default AdminLoginPage;
