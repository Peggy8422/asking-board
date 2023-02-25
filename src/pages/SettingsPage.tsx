import React from 'react';
import { AuthInput, AuthSelect } from '../components/AuthForm';
import { Box, Heading, FormControl, Button } from '@chakra-ui/react';


const SettingsPage = () => {
  return (
    <Box w={'100%'}>
      <Heading as={'h1'} size={'lg'} color={'brand.500'} mb={5}>帳戶設定</Heading>
      <FormControl w={'80%'} position={'relative'}>
        <AuthInput label='帳號' type='text' placeholder='請輸入帳號' />
        <AuthInput label='暱稱' type='text' placeholder='請輸入暱稱' />
        <AuthInput label='Email' type='email' placeholder='請輸入Email' />
        <AuthInput label='密碼設定' type='password' placeholder='請設定密碼' />
        <AuthInput label='確認密碼' type='password' placeholder='請再次確認密碼' />
        {/* 身分select */}
        <AuthSelect label='身分' type='' placeholder='請選擇身分' />
        <Button
          size={'sm'}
          bg={'brand.500'}
          color={'white'}
          colorScheme={'green'}
          position={'absolute'}
          right={0}
          mt={3}
        >
          儲存
        </Button>
      </FormControl>
    </Box>
  );
};

export default SettingsPage;
