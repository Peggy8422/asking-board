import React, { useState } from 'react';
import { AuthInput, AuthSelect } from '../components/AuthForm';
import { Box, Heading, FormControl, Button } from '@chakra-ui/react';

const SettingsPage = () => {
  const userData = JSON.parse(localStorage.getItem('currentUser')!);
  const [formData, setFormData] = useState({
    email: userData.email,
    role: userData.role,
    password: '',
    confirmPassword: '',
  });

  

  return (
    <Box w={'100%'}>
      <Heading as={'h1'} size={'lg'} color={'brand.500'} mb={5}>
        帳戶設定
      </Heading>
      <FormControl w={'80%'} position={'relative'}>
        <AuthInput
          label="Email(帳號)"
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
        <AuthSelect
          label="身分"
          type=""
          value={formData.role}
          onChange={(e) => {
            setFormData({ ...formData, role: e!.target.value });
          }}
          placeholder="請選擇身分"
        />
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
