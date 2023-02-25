import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';


//Only for user related pages
const Layout = () => {
  return (
    <Box width={'100%'} height={'100vh'} overflowX={'hidden'}>
      <Header />
      <Grid templateColumns={'repeat(5, 1fr)'} h={'100vh'}>
        <GridItem colSpan={1} position={'relative'}>
          <Sidebar userName='Peggy' isOnUserPages={true} />
        </GridItem>
        <GridItem colSpan={3} pt={'30px'} px={5} mt={'92px'}>
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
            px={5}
            mt={'92px'}
            borderLeft={'4px'}
            borderLeftColor={'brand.gray_2'}
            bg={'white'}
          >
            <Heading as={'h1'} size={'lg'} color={'brand.500'} mb={5}>最新問題</Heading>
          </Box>
          
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Layout;
