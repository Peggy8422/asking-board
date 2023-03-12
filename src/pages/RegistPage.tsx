import React, { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
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

  return (
    <Box w={'100%'} h={'140vh'} bg={'brand.400'}>
      <AuthForm isOnRegist={true} isUser={true} onClickRegist={() => {}}>
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
