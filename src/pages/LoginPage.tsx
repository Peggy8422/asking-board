import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import AuthForm, { AuthInput } from '../components/AuthForm';
import { Box, Tooltip, Circle } from '@chakra-ui/react';
import { AdminIcon } from '../assets/icons';

const LoginPage = () => {
  return (
    <Box w={'100%'} h={'100vh'} bg={'brand.400'}>
      <AuthForm isOnRegist={false} isUser={true}>
        <AuthInput label='帳號' type='text' placeholder='請輸入帳號' />
        <AuthInput label='密碼' type='password' placeholder='請輸入密碼' />
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
  )
};

export default LoginPage;
