import React, { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import AuthForm, { AuthInput } from '../components/AuthForm';
import { Box, Tooltip, Circle } from '@chakra-ui/react';
import { AdminIcon } from '../assets/icons';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  return (
    <Box w={'100%'} h={'100vh'} bg={'brand.400'}>
      <AuthForm isOnRegist={false} onClickLogin={() => {}} isUser={true}>
        <AuthInput
          label="Email(帳號)"
          type="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({...formData, email: e!.target.value});
          }}
          placeholder="請輸入Email"
        />
        <AuthInput
          label="密碼"
          type="password"
          value={formData.password}
          onChange={(e) => {
            setFormData({...formData, password: e!.target.value});
          }}
          placeholder="請輸入密碼"
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
        >
          <AdminIcon />
        </Circle>
      </Tooltip>
    </Box>
  );
};

export default LoginPage;
