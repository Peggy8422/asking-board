import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Box, Flex, Button, Text } from '@chakra-ui/react';
import { Logo } from '../assets/images';
import { AdminIcon } from '../assets/icons';

const LandingPanel = () => {
  return (
    <Box zIndex={2}>
      <Flex align={'center'} gap={3}>
        <Logo width={'50px'} />
        <Text color={'brand.500'} fontSize={{base: '3xl', md: '5xl'}} fontWeight={'bold'} >Asking Board</Text>
      </Flex>
      <Text color={'brand.500'} fontSize={'medium'} fontWeight={'semibold'}>學科問答、線上解惑，知識分享交流的最佳平台</Text>
      <Flex mt={'10'} mb={'3'} gap={3}>
        <Button
          as={ReactLink}
          to={'/login'}
          bg={'brand.500'}
          colorScheme={'green'}
          size={'md'}
          px={'50px'}
        >
          登入會員  
        </Button>
        <Button
          as={ReactLink}
          to={'/regist'}
          bg={'white'}
          color={'brand.500'}
          colorScheme={'green'}
          size={'md'}
          px={'50px'}
          variant={'outline'}
        >
          註冊帳號  
        </Button>
      </Flex>
      <Button
        as={ReactLink}
        to={'/admin_login'}
        color={'brand.500'}
        colorScheme={'green'}
        variant={'link'}
        leftIcon={<AdminIcon />}
      >
        後台管理者登入
      </Button>
    </Box>
  );
};

export default LandingPanel;
