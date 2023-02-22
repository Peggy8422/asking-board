import React from 'react';
import AuthForm, { AuthInput } from '../components/AuthForm';
import { Box } from '@chakra-ui/react';

const RegistPage = () => {
  return (
    <Box w={'100%'} h={'125vh'} bg={'brand.400'}>
      <AuthForm isOnRegist={true}>
        <AuthInput label='帳號' placeholder='請輸入帳號' />
        <AuthInput label='暱稱' placeholder='請輸入暱稱' />
        <AuthInput label='Email' placeholder='請輸入Email' />
        <AuthInput label='密碼設定' placeholder='請設定密碼' />
        <AuthInput label='確認密碼' placeholder='請再次確認密碼' />
        {/* 身分select */}
      </AuthForm>
    </Box>
  );
};

export default RegistPage;
