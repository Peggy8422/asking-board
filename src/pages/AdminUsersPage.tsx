import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';

//card元件
import AllUsersCard from '../components/admin/AllUsersCard';

const AdminUsersPage = () => {
  return (
    <Box width={'100%'} height={'100vh'} overflowX={'hidden'}>
      <Header />
      <Grid templateColumns={'repeat(5, 1fr)'} h={'100vh'}>
        <GridItem colSpan={1} position={'relative'}>
          <Sidebar userName='管理員' isOnUserPages={false} />
        </GridItem>
        <GridItem colSpan={4} pt={'30px'} px={5} mt={'92px'}>
          <Heading as={'h1'} size={'lg'} color={'brand.500'} mb={5}>所有用戶</Heading>
          {/* map所有用戶的card */}
          <AllUsersCard 
            avatar='123'
            userName='莊珮琪'
            account='peggy_test'
            identity='學生'
            followersCount={251}
            followingsCount={10}
            questionsCount={23}
            repliesCount={300}
            QLikedCount={500}
            RLikedCount={45}
          />
        </GridItem>
        
      </Grid>
    </Box>
  );
};

export default AdminUsersPage;
