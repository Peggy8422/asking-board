//工具
import React, { useState } from 'react';
import { accountSettings, formData } from '../api/userRelated';
import Swal from 'sweetalert2';
// import jwtDecode from 'jwt-decode';
//元件
import { AuthInput, AuthSelect } from '../components/AuthForm';
import { Box, Heading, FormControl, Button, Divider, Tag } from '@chakra-ui/react';

interface errorMsg {
  email?: string;
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface errorDataType {
  status: boolean;
  message: string | errorMsg;
}

const SettingsPage = () => {
  let userData = JSON.parse(localStorage.getItem('currentUser')!);
  const [formData, setFormData] = useState<formData>({
    email: userData.email,
    role: userData.role,
  });
  const [errorData, setErrorData] = useState<errorDataType>({
    status: false,
    message: '' || {
      email: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
    }
  });
  const token = localStorage.getItem('token')!;


  const handleAccountSettings = async () => {

    const data = await accountSettings(token, formData);

    if (data.status === 'success') {
      Swal.fire({
        position: "top",
        title: "設定成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
      setErrorData({
        status: false,
        message: ''
      });
      setFormData((prevData): formData => {return {
        email: prevData.email,
        role: prevData.role
      }});
      userData = {...userData, email: formData.email, role: formData.role};
      localStorage.setItem('currentUser', JSON.stringify(userData));

    } else if (data.status === 'error') {
      Swal.fire({
        position: "top",
        title: "設定失敗！",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      console.log(data.message);
      setErrorData({
        status: true,
        message: data.message,
      });
    }
  }

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
          isError={(typeof errorData.message !== 'string' && errorData.message.email)? errorData.status : false}
          errorMsg={(typeof errorData.message !== 'string' && errorData.message.email) || ''}
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
        <Divider backgroundColor={'brand.500'} my={3}/>
        <Tag colorScheme={'green'}>↓若需修改密碼請填入，無則無須理會</Tag>
        <AuthInput
          label="舊密碼"
          type="password"
          value={typeof formData.password === 'undefined'? '' : formData.password!}
          onChange={(e) => {
            setFormData({ ...formData, password: e!.target.value });
          }}
          placeholder="請輸入舊密碼"
          isError={(typeof errorData.message !== 'string' && errorData.message.password)? errorData.status : false}
          errorMsg={(typeof errorData.message !== 'string' && errorData.message.password) || ''}
        />
        <AuthInput
          label="新密碼設定"
          type="password"
          value={typeof formData.newPassword === 'undefined'? '' : formData.newPassword!}
          onChange={(e) => {
            setFormData({ ...formData, newPassword: e!.target.value });
          }}
          placeholder="請設定新密碼"
          isError={(typeof errorData.message !== 'string' && errorData.message.newPassword)? errorData.status : false}
          errorMsg={(typeof errorData.message !== 'string' && errorData.message.newPassword) || ''}
        />
        <AuthInput
          label="確認新密碼"
          type="password"
          value={typeof formData.confirmPassword === 'undefined'? '' : formData.confirmPassword!}
          onChange={(e) => {
            setFormData({ ...formData, confirmPassword: e!.target.value });
          }}
          placeholder="請再次確認新密碼"
          isError={(typeof errorData.message !== 'string' && errorData.message.confirmPassword)? errorData.status : false}
          errorMsg={(typeof errorData.message !== 'string' && errorData.message.confirmPassword) || ''}
        />
        <Button
          size={'sm'}
          bg={'brand.500'}
          color={'white'}
          colorScheme={'green'}
          position={'absolute'}
          right={0}
          mt={3}
          onClick={handleAccountSettings}
        >
          儲存
        </Button>
      </FormControl>
    </Box>
  );
};

export default SettingsPage;
