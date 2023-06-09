//工具
import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../api/adminRelated';
import { useNavigate } from 'react-router-dom';
//元件
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileSidebar from '../components/MobileSidebar';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Container,
  Spinner,
  Show,
  Hide,
} from '@chakra-ui/react';

//card元件
import AllUsersCard from '../components/admin/AllUsersCard';

const AdminUsersPage = () => {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const getUsers = async () => {
      const data = await getAllUsers(token!);
      setUsersData(data);
      setIsLoading(false);
    };
    if (!token) {
      navigate('/admin_login');
      return;
    }
    getUsers();
  }, [token, navigate]);

  return (
    <Box width={'100%'} height={'100vh'} overflowX={'hidden'}>
      <Header isAdmin={true} />
      <Container maxW={'container.xl'}>
        <Grid templateColumns={'repeat(5, 1fr)'} h={'100vh'}>
          <Hide below={'sm'}>
            <GridItem colSpan={[0, 1]} position={'relative'}>
              <Sidebar userAvatar="" userName="管理員" isOnUserPages={false}  />
            </GridItem>
          </Hide>
          <GridItem colSpan={[5, 4]} pt={'30px'} px={5} mt={'92px'}>
            <Heading as={'h1'} size={'lg'} color={'brand.500'} mb={5}>
              所有用戶
            </Heading>
            <Flex
              position={'relative'}
              pb={5}
              mt={2}
              px={5}
              mr={-3}
              left={-4}
              h={'73vh'}
              gap={5}
              wrap={'wrap'}
              overflowY={'scroll'}
              sx={{
                '::-webkit-scrollbar': {
                  width: '6px',
                  backgroundColor: 'transparent',
                },
                '::-webkit-scrollbar-thumb': {
                  width: '6px',
                  border: 'none',
                  borderRadius: '3px',
                  backgroundColor: 'var(--chakra-colors-brand-300)',
                },
              }}
            >
              {/* map所有用戶的card */}
              {isLoading ? (
                <Spinner
                  thickness="5px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="brand.300"
                  size="xl"
                  position={'absolute'}
                  top={'40%'}
                  left={'50%'}
                />
              ) : (
                usersData.map((user: any) => (
                  <AllUsersCard
                    key={user.id}
                    avatar={user.avatar}
                    userName={user.name}
                    account={user.account}
                    identity={user.role}
                    followersCount={user.followerCount}
                    followingsCount={user.followingCount}
                    questionsCount={user.questionCount}
                    repliesCount={user.replyCount}
                    QLikedCount={user.questionLikedCount}
                    RLikedCount={user.replyLikedCount}
                  />
                ))
              )}
            </Flex>
          </GridItem>
        </Grid>
      </Container>
      <Show below="sm">
        <MobileSidebar userAvatar="" userName="管理員" isOnUserPages={false} />
      </Show>
    </Box>
  );
};

export default AdminUsersPage;
