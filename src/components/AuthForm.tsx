import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { 
  FormControl, 
  Input,
  Text,
  Box,
  Button,
  Link,
  Flex,
  Select
} from '@chakra-ui/react';
import { Logo } from '../assets/images';
import { GoogleIcon } from '../assets/icons';

interface AuthFormProps {
  isUser: boolean;
  isOnRegist: boolean;
  children: React.ReactNode;
}

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
}

export const AuthInput: React.FC<InputProps> = (props) => {
  return (
    <Box py={2}>
      <Text 
        color={'brand.500'} 
        fontSize={'xs'} 
        fontWeight={'semibold'} 
      >{props.label}</Text>
      <Input
        type={props.type}
        borderBottomWidth={'2px'} 
        borderBottomColor={'brand.500'}
        variant={'flushed'} 
        placeholder={props.placeholder}
        _placeholder={{fontSize: 'sm'}}
      />
    </Box>
  );
};


export const AuthSelect: React.FC<InputProps> = (props) => {
  return (
    <Box py={2}>
      <Text 
        color={'brand.500'} 
        fontSize={'xs'} 
        fontWeight={'semibold'} 
      >{props.label}</Text>
      <Select
        // color={'gray.500'} 
        fontSize={'sm'} 
        borderBottomWidth={'2px'} 
        borderBottomColor={'brand.500'}
        variant={'flushed'} 
        placeholder={props.placeholder}
      >
        <option value='student'>學生</option>
        <option value='teacher'>老師</option>
      </Select>
    </Box>
  );
};


const AuthForm: React.FC<AuthFormProps> = (props) => {
  return (
    <Box
      position={'relative'}
      w={'50%'}
      maxW={'500px'}
      borderRadius={'xl'}
      bg={'white'}
      mx={'auto'}
      py={'10'}
      top={'10vh'}
    >
      <FormControl w={'80%'} mx={'auto'}>
        <Box textAlign={'center'}>
          <Logo style={{display: 'inline-block'}}/>
          <Text 
            color={'brand.500'} 
            fontSize={'md'} 
            fontWeight={'medium'} 
          >Asking Board</Text>
          <Text
            fontSize={'2xl'} 
            fontWeight={'bold'} 
            color={'brand.500'}
          >
            {props.isUser ? 
              (props.isOnRegist ? '註冊帳號' : '登入會員') 
              : 
              '後台登入'
            }
          </Text>
        </Box>
        {props.children}
        <Button 
          bg={'brand.500'}
          colorScheme={'green'}
          size={'md'}
          w={'100%'}
          my={3}
        >{props.isOnRegist ? '註冊' : '登入'}</Button>
        {props.isUser && <Button
          bg={'white'}
          color={'brand.500'}
          colorScheme={'green'}
          size={'md'}
          w={'100%'}
          variant={'outline'}
          leftIcon={<GoogleIcon />}
        >以Google登入/註冊</Button>}
        <Flex justify={'flex-end'} gap={2} mt={2}>
          <Text 
            color={'brand.300'}
            fontWeight={'semibold'}
          > {props.isUser ? 
              (props.isOnRegist ? '已有會員?' : '還不是會員?') 
              :
              '一般會員登入:'
            }</Text>
          <Link 
            color={'brand.500'} 
            fontWeight={'semibold'}
            as={ReactLink} 
            to={props.isUser ? (props.isOnRegist ? '/login' : '/regist') : '/login'}
          > {props.isUser ? 
              (props.isOnRegist ? '立即登入' : '立即註冊')
              :
              '返回前台'
            }</Link>
        </Flex>
      </FormControl>
    </Box>
  );
};

export default AuthForm;
