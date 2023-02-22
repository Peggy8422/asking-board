import React from 'react';
import AuthForm, { AuthInput } from '../components/AuthForm';
import { Box } from '@chakra-ui/react';

const LoginPage = () => {
  return (
    <Box w={'100%'} h={'100vh'} bg={'brand.400'}>
      <AuthForm isOnRegist={false}>
        <AuthInput label='帳號' placeholder='請輸入帳號' />
        <AuthInput label='密碼' placeholder='請輸入密碼' />
      </AuthForm>
    </Box>
  )
};

export default LoginPage;
