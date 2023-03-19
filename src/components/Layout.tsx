//工具
import React, { useEffect, useState } from 'react';
import { userGetAllQuestions } from '../api/questionRelated';

//元件
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Container,
} from '@chakra-ui/react';

//card元件
import LatestPostCard from '../components/user/LatestPostCard';

//Only for user related pages
const Layout = () => {
  const [latestQuestions, setLatestQuestions] = useState([]);
  const token = localStorage.getItem('token')!;
  const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  const navigate = useNavigate();

  useEffect(() => {
    const getLatestQuestions = async () => {
      const data = await userGetAllQuestions(token);
      setLatestQuestions(data.slice(0, 10));
    };
    if (!token || !currentUser) {
      navigate('/login');
      return;
    };

    getLatestQuestions();
  }, [token, navigate, currentUser]);

  return (
    <Box width={'100%'} height={'100vh'} overflow={'hidden'}>
      <Header />
      <Container maxW={'container.xl'}>
        <Grid templateColumns={'repeat(5, 1fr)'} h={'100vh'}>
          <GridItem colSpan={1} position={'relative'}>
            <Sidebar userName={currentUser?.name} isOnUserPages={true} />
          </GridItem>
          <GridItem colSpan={3} pt={'30px'} px={5} mt={'92px'}>
            {/* 前台User相關頁面 */}
            <Outlet />
          </GridItem>
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
              borderLeftColor={'brand.gray_2'}
              bg={'white'}
              overflow={'hidden'}
            >
              <Heading
                as={'h1'}
                size={'lg'}
                bg={'white'}
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
                {latestQuestions.map((q: any) => (
                  <LatestPostCard
                    key={q.id || ''}
                    avatar={q.User.avatar || ''}
                    userName={q.User.name || ''}
                    account={q.User.account || ''}
                    identity={q.User.role || ''}
                    category={(q.grade + q.subject) || ''}
                    title={q.title || ''}
                    createdAt={q.createdAt || ''}
                  />
                ))}
              </Flex>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Layout;
