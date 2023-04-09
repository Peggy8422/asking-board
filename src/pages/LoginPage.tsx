//工具
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as ReactLink, useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { login, reset } from '../features/auth/authSlice';

//元件
import AuthForm, { AuthInput } from '../components/AuthForm';
import { Box, Tooltip, Circle } from '@chakra-ui/react';
import { AdminIcon } from '../assets/icons';

const LoginPage = () => {
  const { email, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );
  const [formData, setFormData] = useState({
    email: email || '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const currentUser = searchParams.get('user')!;

  const token = localStorage.getItem('token')! || searchParams.get('token')!;

  //處理google登入
  useEffect(() => {
    if (currentUser && token) {
      localStorage.setItem('currentUser', currentUser);
      localStorage.setItem('token', token);
      Swal.fire({
        position: 'top',
        title: '登入成功',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });
      navigate('/front/home');
    } 
  }, [currentUser, token, navigate])

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
      navigate('/front/home');
    }

    if (token) {
      navigate('/front/home');
    }

  }, [isError, isSuccess, navigate, dispatch, token])

  const handleLoginClicked = () => {
    dispatch(login(formData) as any); //發送登入請求
  }

  return (
    <Box w={'100%'} h={'100vh'} bg={'brand.400'}>
      <AuthForm isOnRegist={false} onClickLogin={handleLoginClicked} isUser={true} isLoading={isLoading} >
        <AuthInput
          label="Email(帳號)"
          type="email"
          value={email || formData.email}
          onChange={(e) => {
            setFormData({...formData, email: e!.target.value});
          }}
          placeholder="請輸入Email"
          isError={isError}
          errorMsg={message || ''}
        />
        <AuthInput
          label="密碼"
          type="password"
          value={formData.password}
          onChange={(e) => {
            setFormData({...formData, password: e!.target.value});
          }}
          placeholder="請輸入密碼"
          isError={isError}
          errorMsg={message || ''}
        />
      </AuthForm>
      <Tooltip label={'前往管理者登入'} placement={'top'}>
        <Circle
          as={ReactLink}
          to={'/admin_login'}
          size={'35px'}
          bg={'whiteAlpha.800'}
          cursor={'pointer'}
          boxShadow={'md'}
          position={'fixed'}
          bottom={'5%'}
          right={'5%'}
          onClick={() => {
            dispatch(reset());
          }}
        >
          <AdminIcon />
        </Circle>
      </Tooltip>
    </Box>
  );
};

export default LoginPage;
