import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import AuthForm, { AuthInput, AuthSelect } from '../components/AuthForm';
import { Box, Tooltip, Circle } from '@chakra-ui/react';
import { AdminIcon } from '../assets/icons';

const RegistPage = () => {
  return (
    <Box w={'100%'} h={'140vh'} bg={'brand.400'}>
      <AuthForm isOnRegist={true} isUser={true}>
        <AuthInput label='帳號' type='text' placeholder='請輸入帳號' />
        <AuthInput label='暱稱' type='text' placeholder='請輸入暱稱' />
        <AuthInput label='Email' type='email' placeholder='請輸入Email' />
        <AuthInput label='密碼設定' type='password' placeholder='請設定密碼' />
        <AuthInput label='確認密碼' type='password' placeholder='請再次確認密碼' />
        {/* 身分select */}
        <AuthSelect label='身分' type='' placeholder='請選擇身分' />
      </AuthForm>
      <Tooltip label={'前往管理者登入'} placement={'top'} >
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
