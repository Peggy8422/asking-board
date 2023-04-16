//工具
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as ReactLink, NavLink as ReactNavLink } from 'react-router-dom';
import { logoutAct, reset, clearEmail } from '../features/auth/authSlice';
import { useModalContext } from '../context/ModalOpenContext'; 
//元件
import {
  Box,
  Container,
  Button,
  Text,
  Flex,
  Hide,
  Show,
  useDisclosure,
  useColorModeValue
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

export interface SidebarProps {
  isOnUserPages: boolean;
  userName: string;
  userAvatar: string;
}

export interface UserNavProps {
  userName: string;
  userAvatar: string;
}
//用戶頁面Nav
const UserNavList: React.FC<UserNavProps> = ({ userName, userAvatar }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setIsModalClosed } = useModalContext();

  return (
    <Flex direction={'column'} align={'start'} gap={2} my={'5'}>
      <ReactNavLink to={'/front/home'}>
        {({ isActive }) => (
          <Button
            leftIcon={
              <HomeIcon
                width={'20px'}
                fill={isActive ? '#137547' : '#C4C4C4'}
              />
            }
            color={isActive ? 'brand.500' : 'brand.gray_1'}
            colorScheme={'green'}
            variant={'ghost'}
          >
            <Hide below={'md'}>首頁</Hide>
          </Button>
        )}
      </ReactNavLink>
      <ReactNavLink to={'/front/hot_issue'}>
        {({ isActive }) => (
          <Button
            leftIcon={
              <HotIcon width={'20px'} fill={isActive ? '#137547' : '#C4C4C4'} />
            }
            color={isActive ? 'brand.500' : 'brand.gray_1'}
            colorScheme={'green'}
            variant={'ghost'}
          >
            <Hide below={'md'}>熱門問題</Hide>
          </Button>
        )}
      </ReactNavLink>
      <ReactNavLink to={'/front/active_users'}>
        {({ isActive }) => (
          <Button
            leftIcon={
              <UsersIcon
                width={'20px'}
                fill={isActive ? '#137547' : '#C4C4C4'}
              />
            }
            color={isActive ? 'brand.500' : 'brand.gray_1'}
            colorScheme={'green'}
            variant={'ghost'}
          >
            <Hide below={'md'}>活躍用戶</Hide>
          </Button>
        )}
      </ReactNavLink>
      <ReactNavLink to={'/front/settings'}>
        {({ isActive }) => (
          <Button
            leftIcon={
              <SettingIcon
                width={'20px'}
                fill={isActive ? '#137547' : '#C4C4C4'}
              />
            }
            color={isActive ? 'brand.500' : 'brand.gray_1'}
            colorScheme={'green'}
            variant={'ghost'}
          >
            <Hide below={'md'}>帳戶設定</Hide>
          </Button>
        )}
      </ReactNavLink>

      <Button
        leftIcon={<HandIcon width={'20px'} />}
        bg={'brand.500'}
        color={'white'}
        colorScheme={'green'}
        onClick={() => {
          onOpen();
          setIsModalClosed(false);
        }}
      >
        <Hide below={'md'}>我要發問</Hide>
      </Button>
      {/* 發問的modal */}
      <AskingModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setIsModalClosed(true); 
        }}
        currentUserAvatar={userAvatar}
        currentUserName={userName}
        isOnEdit={false}
      />
    </Flex>
  );
};

//管理者頁面Nav
const AdminNavList = () => {
  return (
    <Flex direction={'column'} align={'start'} gap={2} my={'5'}>
      <ReactNavLink to={'/admin_home'}>
        {({ isActive }) => (
          <Button
            leftIcon={
              <HomeIcon
                width={'20px'}
                fill={isActive ? '#137547' : '#C4C4C4'}
              />
            }
            color={isActive ? 'brand.500' : 'brand.gray_1'}
            colorScheme={'green'}
            variant={'ghost'}
          >
            <Hide below={'md'}>問題列表</Hide>
          </Button>
        )}
      </ReactNavLink>
      <ReactNavLink to={'/admin_users'}>
        {({ isActive }) => (
          <Button
            leftIcon={<UsersIcon width={'20px'} fill={isActive ? '#137547' : '#C4C4C4'} />}
            color={isActive ? 'brand.500' : 'brand.gray_1'}
            colorScheme={'green'}
            variant={'ghost'}
          >
            <Hide below={'md'}>用戶列表</Hide>
          </Button>
        )}
      </ReactNavLink>
    </Flex>
  );
};

const Sidebar: React.FC<SidebarProps> = (props) => {
  // const naviagte = useNavigate();
  const dispatch = useDispatch();
  //邊線顏色切換
  const borderColor = useColorModeValue('brand.gray_2', 'gray.700');

  return (
    <Box
      w={'100%'}
      minWidth={{lg:'200px'}}
      top={'0'}
      bottom={'0'}
      position={'absolute'}
      pt={'50px'}
      mt={'92px'}
      borderRight={'4px'}
      borderRightColor={borderColor}
    >
      <Container width={'80%'}>
        <Text
          ml={'15px'}
          fontSize={'lg'}
          fontWeight={'bold'}
          color={'brand.500'}
        >
          Hi<Show below={'md'}>!</Show><Hide below={'md'}>, {props.userName}</Hide>
        </Text>
        {props.isOnUserPages ? (
          <UserNavList
            userAvatar={props.userAvatar}
            userName={props.userName}
          />
        ) : (
          <AdminNavList />
        )}
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
          right={{base: '5%', md: 'unset'}}
          onClick={() => {
            dispatch(logoutAct() as any);
            dispatch(reset());
            dispatch(clearEmail());
          }}
        >
          <Hide below={'md'}>登出</Hide>
        </Button>
      </Container>
    </Box>
  );
};

export default Sidebar;
