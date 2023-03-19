//工具
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllQuestions, deleteQuestion } from '../api/adminRelated';
import Swal from 'sweetalert2';
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
  SkeletonText,
} from '@chakra-ui/react';

//card元件
import AllPostsCard from '../components/admin/AllPostsCard';

const AdminPostsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token')!;
  const navigate = useNavigate();

  //刪除特定問題
  const handleQuestionDeleted = async (id: number) => {
    const { success } = (await deleteQuestion(id, token)) as {
      success: boolean;
    };
    if (success) {
      Swal.fire({
        position: 'top',
        title: '刪除成功',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });
      setQuestions([...questions].filter((q: any) => q.id !== id));
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const getQuestions = async () => {
      const data = await getAllQuestions(token!);
      setQuestions(data);
      setIsLoading(false);
    };
    if (!token) {
      navigate('/admin_login');
      return;
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
              {questions.map((q: any) =>
                isLoading ? (
                  <Box key={q.id} padding="6" boxShadow="lg" bg="white">
                    <SkeletonText
                      mt="4"
                      noOfLines={4}
                      spacing="4"
                      skeletonHeight="2"
                    />
                  </Box>
                ) : (
                  <AllPostsCard
                    key={q.id}
                    Q_Id={q.id}
                    firstImg={''}
                    title={q.title}
                    content={q.description}
                    avatar={q.User.avatar}
                    account={q.User.account}
                    createdAt={q.createdAt}
                    likedCount={q.likeCount}
                    category={q.grade + q.subject}
                    onDelete={handleQuestionDeleted}
                  />
                ),
              )}
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminPostsPage;
