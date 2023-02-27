import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Box, Flex, Grid, GridItem, Heading, Container } from '@chakra-ui/react';

//card元件
import LatestPostCard from '../components/user/LatestPostCard';

//Only for user related pages
const Layout = () => {
  return (
    <Box width={'100%'} height={'100vh'} overflow={'hidden'}>
      <Header />
      <Container maxW={'container.xl'}> 
        <Grid templateColumns={'repeat(5, 1fr)'} h={'100vh'}>
          <GridItem colSpan={1} position={'relative'}>
            <Sidebar userName="Peggy" isOnUserPages={true} />
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
                <LatestPostCard
                  avatar="123"
                  userName="莊珮琪"
                  account="peggy_test"
                  identity="學生"
                  category="國中一年級數學"
                  title="關於XXXXX解法?......擠到第二行會變怎樣"
                  createdAt="5秒前"
                />
                {/* test scroll用 */}
                <LatestPostCard
                  avatar="123"
                  userName="莊珮琪"
                  account="peggy_test"
                  identity="學生"
                  category="國中一年級數學"
                  title="關於XXXXX解法?......擠到第二行會變怎樣"
                  createdAt="5秒前"
                />
                <LatestPostCard
                  avatar="123"
                  userName="莊珮琪"
                  account="peggy_test"
                  identity="學生"
                  category="國中一年級數學"
                  title="關於XXXXX解法?......擠到第二行會變怎樣"
                  createdAt="5秒前"
                />
                <LatestPostCard
                  avatar="123"
                  userName="莊珮琪"
                  account="peggy_test"
                  identity="學生"
                  category="國中一年級數學"
                  title="關於XXXXX解法?......擠到第二行會變怎樣"
                  createdAt="5秒前"
                />
                <LatestPostCard
                  avatar="123"
                  userName="莊珮琪"
                  account="peggy_test"
                  identity="學生"
                  category="國中一年級數學"
                  title="關於XXXXX解法?......擠到第二行會變怎樣"
                  createdAt="5秒前"
                />
                <LatestPostCard
                  avatar="123"
                  userName="莊珮琪"
                  account="peggy_test"
                  identity="學生"
                  category="國中一年級數學"
                  title="關於XXXXX解法?......擠到第二行會變怎樣"
                  createdAt="5秒前"
                />
              </Flex>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Layout;
