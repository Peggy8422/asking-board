//工具
import React from 'react';
import { useDispatch } from 'react-redux';
import { reset } from '../features/auth/authSlice';
import { Link as ReactLink } from 'react-router-dom';
//googleAuth 測試
import { aTagUrlForGoogle } from '../api/auth';

//元件
import { 
  FormControl,
  FormErrorMessage, 
  Input,
  Text,
  Box,
  Button,
  Link,
  Flex,
  Select,
  useColorModeValue
} from '@chakra-ui/react';
import { Logo } from '../assets/images';
import { GoogleIcon } from '../assets/icons';

interface AuthFormProps {
  isUser: boolean;
  isOnRegist: boolean;
  children: React.ReactNode;
  onClickLogin?: () => void;
  onClickRegist?: () => void;
  isLoading: boolean;
}

interface InputProps {
  label: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e?: {target: {value: string}}) => void;
  isError?: boolean;
  errorMsg?: string;
  isDisabled?: boolean;
}

export const AuthInput: React.FC<InputProps> = (props) => {
  return (
    <FormControl py={2} isInvalid={props.isError}>
      <Text 
        color={'brand.500'} 
        fontSize={'xs'} 
        fontWeight={'semibold'} 
      >{props.label}</Text>
      <Input
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        borderBottomWidth={'2px'} 
        borderBottomColor={'brand.500'}
        variant={'flushed'} 
        placeholder={props.placeholder}
        _placeholder={{fontSize: 'sm'}}
        isDisabled={props.isDisabled!}
      />
      <FormErrorMessage>{props.errorMsg}</FormErrorMessage>
    </FormControl>
  );
};


export const AuthSelect: React.FC<InputProps> = (props) => {
  return (
    <FormControl py={2} isInvalid={props.isError}>
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
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      >
        <option value='學生'>學生</option>
        <option value='老師'>老師</option>
      </Select>
      <FormErrorMessage>{props.errorMsg}</FormErrorMessage>
    </FormControl>
  );
};


const AuthForm: React.FC<AuthFormProps> = (props) => {
  const dispatch = useDispatch();

  //樣式顏色
  //背景色切換
  const bgColor = useColorModeValue('white', 'gray.900')

  return (
    <Box
      position={'relative'}
      w={{base: '95%', md:'50%'}}
      maxW={'500px'}
      borderRadius={'xl'}
      bg={bgColor}
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
          isLoading={props.isLoading}
          bg={'brand.500'}
          colorScheme={'green'}
          size={'md'}
          w={'100%'}
          my={3}
          onClick={props.isOnRegist? props.onClickRegist : props.onClickLogin}
        >{props.isOnRegist ? '註冊' : '登入'}</Button>
        {props.isUser && <Button
          as={ReactLink}
          to={aTagUrlForGoogle}
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
            onClick={() => {
              dispatch(reset());
            }}
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
