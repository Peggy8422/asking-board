import React, { useState } from 'react';
import AuthForm, { AuthInput } from '../components/AuthForm';
import { Box } from '@chakra-ui/react';

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  return (
    <Box w={'100%'} h={'100vh'} bg={'brand.400'}>
      <AuthForm isUser={false} isOnRegist={false} onClickLogin={() => {}}>
        <AuthInput
          label="Email(帳號)"
          type="email"
          value={formData.email}
          placeholder="請輸入Email"
          onChange={(e) => {
            setFormData({ ...formData, email: e!.target.value });
          }}
        />
        <AuthInput
          label="密碼"
          type="password"
          value={formData.password}
          placeholder="請輸入密碼"
          onChange={(e) => {
            setFormData({ ...formData, password: e!.target.value });
          }}
        />
      </AuthForm>
    </Box>
  );
};

export default AdminLoginPage;
