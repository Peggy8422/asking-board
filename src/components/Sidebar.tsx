import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import {
  Box,
  Container,
  Button,
  Text,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HomeIcon,
  HotIcon,
  UsersIcon,
  SettingIcon,
  HandIcon,
  LogoutIcon,
} from '../assets/icons';
import AskingModal from './user/AskingModal';

interface SidebarProps {
  isOnUserPages: boolean;
  userName: string;
}

//用戶頁面Nav
const UserNavList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex direction={'column'} align={'start'} gap={2} my={'5'}>
      <Button
        leftIcon={<HomeIcon width={'20px'} fill={'#137547'} />}
        color={'brand.500'}
        colorScheme={'green'}
        variant={'ghost'}
      >
        首頁
      </Button>
      <Button
        leftIcon={<HotIcon width={'20px'} />}
        color={'brand.gray_1'}
        colorScheme={'green'}
        variant={'ghost'}
      >
        熱門問題
      </Button>
      <Button
        leftIcon={<UsersIcon width={'20px'} />}
        color={'brand.gray_1'}
        colorScheme={'green'}
        variant={'ghost'}
      >
        活躍用戶
      </Button>
      <Button
        leftIcon={<SettingIcon width={'20px'} />}
        color={'brand.gray_1'}
        colorScheme={'green'}
        variant={'ghost'}
      >
        帳戶設定
      </Button>
      <Button
        leftIcon={<HandIcon width={'20px'} />}
        bg={'brand.500'}
        colorScheme={'green'}
        onClick={onOpen}
      >
        我要發問
      </Button>
      {/* 發問的modal */}
      <AskingModal 
        isOpen={isOpen}
        onClose={onClose}
        currentUserAvatar={'your avatar'}
        currentUserName={'your name'}
      />
    </Flex>
  );
};

//管理者頁面Nav
const AdminNavList = () => {
  return (
    <Flex direction={'column'} align={'start'} gap={2} my={'5'}>
      <Button
        leftIcon={<HomeIcon width={'20px'} fill={'#137547'} />}
        color={'brand.500'}
        colorScheme={'green'}
        variant={'ghost'}
      >
        問題列表
      </Button>
      <Button
        leftIcon={<UsersIcon width={'20px'} />}
        color={'brand.gray_1'}
        colorScheme={'green'}
        variant={'ghost'}
      >
        用戶列表
      </Button>
    </Flex>
  );
};

const Sidebar: React.FC<SidebarProps> = (props) => {
  return (
    <Box
      w={'100%'}
      minWidth={'200px'}
      top={'0'}
      bottom={'0'}
      position={'absolute'}
      pt={'50px'}
      mt={'92px'}
      borderRight={'4px'}
      borderRightColor={'brand.gray_2'}
      bg={'white'}
    >
      <Container width={'80%'}>
        <Text
          ml={'15px'}
          fontSize={'lg'}
          fontWeight={'bold'}
          color={'brand.500'}
        >
          Hi, {props.userName}
        </Text>
        {props.isOnUserPages ? <UserNavList /> : <AdminNavList />}
        <Button
          as={ReactLink}
          to={props.isOnUserPages ? '/login' : '/admin_login'}
          rightIcon={<LogoutIcon width={'20px'} />}
          color={'brand.400'}
          colorScheme={'green'}
          variant={'ghost'}
          size={'lg'}
          position={'absolute'}
          bottom={'5%'}
        >
          登出
        </Button>
      </Container>
    </Box>
  );
};

export default Sidebar;
