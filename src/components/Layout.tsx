//工具
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearEmail } from '../features/auth/authSlice';
import { userGetAllQuestions } from '../api/questionRelated';
import { useModalContext } from '../context/ModalOpenContext';

//元件
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileSidebar from './MobileSidebar';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Container,
  Hide,
  Show,
  useColorModeValue
} from '@chakra-ui/react';

//card元件
import LatestPostCard from '../components/user/LatestPostCard';

//Only for user related pages
const Layout = () => {
  const [latestQuestions, setLatestQuestions] = useState([]);
  const token = localStorage.getItem('token')!;
  const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  const {isModalClosed} = useModalContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //邊線顏色切換
  const borderColor = useColorModeValue('brand.gray_2', 'gray.700');

  useEffect(() => {
    if (!token || currentUser.role === 'admin') {
      dispatch(clearEmail());
      navigate('/login');
      return;
    }
    const getLatestQuestions = async () => {
      const data = await userGetAllQuestions(token);
      setLatestQuestions(data.slice(0, 10));
    };

    getLatestQuestions();
  }, [token, navigate, dispatch, currentUser?.role, isModalClosed]);

  return (
    <Box
      width={'100%'}
      height={'100vh'}
      position={'relative'}
      overflow={'hidden'}
    >
      <Header isAdmin={false} />
      <Container maxW={'container.xl'}>
        <Grid
          templateColumns={{ base: 'repeat(6, 1fr)', md: 'repeat(5, 1fr)' }}
          h={'100vh'}
        >
          <Hide below={'sm'}>
            <GridItem colSpan={[0, 1, 1, 1]} position={'relative'}>
              <Sidebar
                userAvatar={currentUser?.avatar}
                userName={currentUser?.name}
                isOnUserPages={true}
              />
            </GridItem>
          </Hide>
          <GridItem colSpan={[6, 5, 4, 3]} pt={'30px'} px={5} mt={'92px'}>
            {/* 前台User相關頁面 */}
            <Outlet />
          </GridItem>
          <Hide below={'lg'}>
            <GridItem colSpan={1} position={'relative'}>
              <Box
                w={'100%'}
                minWidth={'200px'}
                top={'0'}
                bottom={'0'}
                position={'absolute'}
                pt={'30px'}
                // px={5}
                mt={'92px'}
                borderLeft={'4px'}
                borderLeftColor={borderColor}
                overflow={'hidden'}
              >
                <Heading
                  as={'h1'}
                  size={'lg'}
                  color={'brand.500'}
                  ml={5}
                  mb={5}
                  position={'sticky'}
                >
                  最新問題
                </Heading>
                {/* map最新問題卡片 */}
                <Flex
                  boxSizing={'content-box'}
                  px={2}
                  pb={5}
                  h={'73vh'}
                  direction={'column'}
                  rowGap={5}
                  overflowY={'scroll'}
                >
                  {latestQuestions?.map((q: any) => (
                    <LatestPostCard
                      key={q.id || ''}
                      id={q.id || 0}
                      avatar={q.User.avatar || ''}
                      userName={q.User.name || ''}
                      account={q.User.account || ''}
                      identity={q.User.role || ''}
                      category={q.grade + q.subject || ''}
                      title={q.title || ''}
                      createdAt={q.createdAt || ''}
                    />
                  ))}
                </Flex>
              </Box>
            </GridItem>
          </Hide>
        </Grid>
      </Container>
      <Show below='sm'>
        <MobileSidebar
          userAvatar={currentUser?.avatar}
          userName={currentUser?.name}
          isOnUserPages={true}
        />
      </Show>
    </Box>
  );
};

export default Layout;
