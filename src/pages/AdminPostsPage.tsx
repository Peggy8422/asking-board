import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Box, Grid, GridItem, Heading, Container } from '@chakra-ui/react';

//card元件
import AllPostsCard from '../components/admin/AllPostsCard';


const AdminPostsPage = () => {
  return (
    <Box width={'100%'} height={'100vh'} overflowX={'hidden'}>
      <Header />
      <Container maxW={'container.xl'}>
        <Grid templateColumns={'repeat(5, 1fr)'} h={'100vh'}>
          <GridItem colSpan={1} position={'relative'}>
            <Sidebar userName='管理員' isOnUserPages={false} />
          </GridItem>
          <GridItem colSpan={4} pt={'30px'} px={5} mt={'92px'}>
            <Heading as={'h1'} size={'lg'} color={'brand.500'} mb={5}>所有問題</Heading>
            {/* map所有問題的card */}
            <AllPostsCard 
              firstImg='https://picsum.photos/300'
              title='關於XXXXX解法?'
              content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu semper lorem. Proin pretium aliquam est, nec commodo tellus euismod sit amet....'
              avatar='123'
              account='peggy_test'
              createdAt='數秒前'
              likedCount={500}
            />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminPostsPage;
