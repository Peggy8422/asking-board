import React from 'react';
import AuthForm, { AuthInput } from '../components/AuthForm';
import { Box } from '@chakra-ui/react';

const AdminLoginPage = () => {
  return (
    <Box w={'100%'} h={'100vh'} bg={'brand.400'}>
      <AuthForm isUser={false} isOnRegist={false}>
        <AuthInput label='Email' type='email' placeholder='請輸入Email' />
        <AuthInput label='密碼' type='password' placeholder='請輸入密碼' />
      </AuthForm>
    </Box>
  );
};

export default AdminLoginPage;
