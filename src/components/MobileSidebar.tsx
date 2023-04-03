import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as ReactLink, NavLink as ReactNavLink } from 'react-router-dom';
import { logoutAct, reset, clearEmail } from '../features/auth/authSlice';
import { SidebarProps, UserNavProps } from './Sidebar';

//元件
import { Box, Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import {
  HomeIcon,
  HotIcon,
  UsersIcon,
  SettingIcon,
  HandIcon,
  LogoutIcon,
} from '../assets/icons';
import AskingModal from './user/AskingModal';

//使用者
const UserMobileNavList: React.FC<UserNavProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ReactNavLink to="/front/home">
        {({ isActive }) => (
          <IconButton
            color={isActive ? 'brand.500' : 'brand.gray_1'}
            colorScheme={'green'}
            variant={'ghost'}
            aria-label="home"
            icon={
              <HomeIcon
                width={'20px'}
                fill={isActive ? '#137547' : '#C4C4C4'}
              />
            }
          />
        )}
      </ReactNavLink>
      <ReactNavLink to={'/front/hot_issue'}>
        {({ isActive }) => (
          <IconButton
            color={isActive ? 'brand.500' : 'brand.gray_1'}
            colorScheme={'green'}
            variant={'ghost'}
            aria-label="hot issue"
            icon={
              <HotIcon width={'20px'} fill={isActive ? '#137547' : '#C4C4C4'} />
            }
          />
        )}
      </ReactNavLink>
      <ReactNavLink to={'/front/active_users'}>
        {({ isActive }) => (
          <IconButton
            color={isActive ? 'brand.500' : 'brand.gray_1'}
            colorScheme={'green'}
            variant={'ghost'}
            aria-label="active users"
            icon={
              <UsersIcon
                width={'20px'}
                fill={isActive ? '#137547' : '#C4C4C4'}
              />
            }
          />
        )}
      </ReactNavLink>
      <ReactNavLink to={'/front/settings'}>
        {({ isActive }) => (
          <IconButton
            color={isActive ? 'brand.500' : 'brand.gray_1'}
            colorScheme={'green'}
            variant={'ghost'}
            aria-label="account setting"
            icon={
              <SettingIcon
                width={'20px'}
                fill={isActive ? '#137547' : '#C4C4C4'}
              />
            }
          />
        )}
      </ReactNavLink>
      <IconButton
        position={'absolute'}
        right={'0'}
        bottom={'125%'}
        bg={'brand.500'}
        colorScheme={'green'}
        boxShadow={'md'}
        onClick={onOpen}
        aria-label="ask question"
        icon={<HandIcon width={'20px'} />}
      />
      {/* 發問的modal */}
      <AskingModal
        isOpen={isOpen}
        onClose={onClose}
        currentUserAvatar={props.userAvatar}
        currentUserName={props.userName}
        isOnEdit={false}
      />
    </>
  );
};

//管理者
const AdminMobileNavList = () => {
  return (
    <>
      <ReactNavLink to={'/admin_home'}>
        {({ isActive }) => (
          <IconButton
            color={isActive ? 'brand.500' : 'brand.gray_1'}
            colorScheme={'green'}
            variant={'ghost'}
            aria-label="admin home"
            icon={
              <HomeIcon
                width={'20px'}
                fill={isActive ? '#137547' : '#C4C4C4'}
              />
            }
          />
        )}
      </ReactNavLink>
      <ReactNavLink to={'/admin_users'}>
        {({ isActive }) => (
          <IconButton
            color={isActive ? 'brand.500' : 'brand.gray_1'}
            colorScheme={'green'}
            variant={'ghost'}
            aria-label="active users"
            icon={
              <UsersIcon
                width={'20px'}
                fill={isActive ? '#137547' : '#C4C4C4'}
              />
            }
          />
        )}
      </ReactNavLink>
    </>
  );
};

const MobileSidebar: React.FC<SidebarProps> = (props) => {
  const dispatch = useDispatch();

  return (
    <Box
      w={'100%'}
      px={5}
      position={'absolute'}
      bottom={0}
      zIndex={2}
      bg={'white'}
      boxShadow={'dark-lg'}
    >
      <Flex
        w={'100%'}
        gap={3}
        justifyContent={'space-between'}
        position={'relative'}
      >
        {props.isOnUserPages ? (
          <UserMobileNavList
            userAvatar={props.userAvatar}
            userName={props.userName}
          />
        ) : (
          <AdminMobileNavList />
        )}
        <IconButton
          as={ReactLink}
          to={props.isOnUserPages ? '/login' : '/admin_login'}
          color={'brand.400'}
          colorScheme={'green'}
          variant={'ghost'}
          aria-label="log out"
          icon={<LogoutIcon width={'20px'} />}
          onClick={() => {
            dispatch(logoutAct() as any);
            dispatch(reset());
            dispatch(clearEmail());
          }}
        />
      </Flex>
    </Box>
  );
};

export default MobileSidebar;
