//工具
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link as ReactLink } from 'react-router-dom';
import { regist, reset } from '../features/auth/authSlice';
//元件
import AuthForm, { AuthInput, AuthSelect } from '../components/AuthForm';
import { Box, Tooltip, Circle } from '@chakra-ui/react';
import { AdminIcon } from '../assets/icons';

const RegistPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '', //學生或老師身分
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    if(isSuccess || user) {
      navigate('/login')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleRegistClicked = () => {
    if(formData.password !== formData.confirmPassword) {
      Swal.fire({
        position: "top",
        title: "請輸入兩次相同密碼!",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
    } else {
      dispatch(regist(formData) as any);
    }
  }

  return (
    <Box w={'100%'} h={'140vh'} bg={'brand.400'}>
      <AuthForm isOnRegist={true} isUser={true} onClickRegist={handleRegistClicked} isLoading={isLoading}>
        <AuthInput
          label="暱稱"
          type="text"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e!.target.value });
          }}
          placeholder="請輸入暱稱"
        />
        <AuthInput
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e!.target.value });
          }}
          placeholder="請輸入Email"
        />
        <AuthInput
          label="密碼設定"
          type="password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e!.target.value });
          }}
          placeholder="請設定密碼"
        />
        <AuthInput
          label="確認密碼"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => {
            setFormData({ ...formData, confirmPassword: e!.target.value });
          }}
          placeholder="請再次確認密碼"
        />
        {/* 身分select */}
        <AuthSelect label="身分" type="" value={formData.role} onChange={(e) => {
            setFormData({ ...formData, role: e!.target.value });
          }} placeholder="請選擇身分" />
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
        >
          <AdminIcon />
        </Circle>
      </Tooltip>
    </Box>
  );
};

export default RegistPage;
