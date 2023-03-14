//工具
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllQuestions } from '../api/adminRelated';
//元件
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
import AllPostsCard from '../components/admin/AllPostsCard';

const AdminPostsPage = () => {
  const [questions, setQuestions] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const getQuestions = async () => {
      const data = await getAllQuestions(token!);
      setQuestions(data);
    };
    if (!token) {
      navigate('/admin_login');
    }
    getQuestions();
  }, [token, navigate]);

  return (
    <Box width={'100%'} height={'100vh'} overflowX={'hidden'}>
      <Header />
      <Container maxW={'container.xl'}>
        <Grid templateColumns={'repeat(5, 1fr)'} h={'100vh'}>
          <GridItem colSpan={1} position={'relative'}>
            <Sidebar userName="管理員" isOnUserPages={false} />
          </GridItem>
          <GridItem colSpan={4} pt={'30px'} px={5} mt={'92px'}>
            <Heading as={'h1'} size={'lg'} color={'brand.500'} mb={5}>
              所有問題
            </Heading>
            <Flex
              position={'relative'}
              pb={5}
              mt={2}
              px={5}
              mr={-3}
              left={-4}
              h={'73vh'}
              direction={'column'}
              rowGap={5}
              overflowY={'scroll'}
              sx={{
                '::-webkit-scrollbar': {
                  width: '6px',
                  'background-color': 'transparent',
                },
                '::-webkit-scrollbar-thumb': {
                  width: '6px',
                  border: 'none',
                  'border-radius': '3px',
                  'background-color': 'var(--chakra-colors-brand-300)',
                },
              }}
            >
              {/* map所有問題的card */}
              {questions.map((q: any) => (
                <AllPostsCard
                  key={q.id}
                  firstImg={''}
                  title={q.title}
                  content={q.description}
                  avatar={q.User.id}
                  account="peggy_test"
                  createdAt={q.createdAt}
                  likedCount={q.likeCount}
                  category={q.grade + q.subject}
                />
              ))}
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminPostsPage;
