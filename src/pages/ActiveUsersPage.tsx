import React, { useState } from 'react';
import { Box, Flex, Heading, Button, ButtonGroup } from '@chakra-ui/react';

//card元件
import ActiveUsersCard from '../components/user/ActiveUsersCard';

const ActiveUsersPage = () => {
  const [activeTab, setActiveTab] = useState('最多追蹤者');
  
  return (
    <Box w={'100%'}>
      <Flex align={'start'} bg={'white'} gap={3}>
        <Heading as={'h1'} size={'lg'} color={'brand.500'} mb={5}>
          活躍用戶
        </Heading>
        <ButtonGroup
          size="sm"
          variant="outline"
          color={'brand.400'}
          colorScheme={'green'}
        >
          {['最多追蹤者', '最常回答', '回答讚數最多'].map((item, index) => {
            return (
              <Button
                key={index}
                borderRadius={'full'}
                bg={activeTab === item ? 'brand.400' : ''}
                color={activeTab === item ? 'white' : 'brand.400'}
                colorScheme={'green'}
                variant={activeTab === item ? 'solid' : 'outline'}
                boxShadow={'md'}
                onClick={() => setActiveTab(item)}
              >
                {item}
              </Button>
            );
          })}
        </ButtonGroup>
      </Flex>
      <Flex
        align={'start'}
        wrap={'wrap'}
        position={'relative'}
        pb={5}
        mt={2}
        px={5}
        mr={-3}
        left={-4}
        h={'73vh'}
        gap={5}
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
        {/* map所有問題的卡片 */}
        <ActiveUsersCard 
          avatar='123'
          userName='我是很長的使用者名稱我是很長的使用者名稱'
          account='test_user1'
          identity='老師'
          statistic={123}
          discription='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque venenatis a mauris in ullamcorper. Sed pulvinar augue eget turpis iaculis, quis semper erat vestibulum. Curabitur fermentum vehicula risus ut auctor. Integer volutpat, neque id tempor aliquet, dolor odio fringilla enim, ut tincidunt lorem leo eget nibh. Suspendisse interdum lacus erat, eu tristique felis tristique sed. Curabitur in tellus eget neque vestibulum vestibulum. Maecenas porta orci quis felis sagittis, sed placerat erat eleifend.'
          isFollowed={true}
        />
        <ActiveUsersCard 
          avatar='123'
          userName='我是很長的使用者名稱我是很長的使用者名稱'
          account='test_user1'
          identity='老師'
          statistic={123}
          discription='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque venenatis a mauris in ullamcorper. Sed pulvinar augue eget turpis iaculis, quis semper erat vestibulum. Curabitur fermentum vehicula risus ut auctor. Integer volutpat, neque id tempor aliquet, dolor odio fringilla enim, ut tincidunt lorem leo eget nibh. Suspendisse interdum lacus erat, eu tristique felis tristique sed. Curabitur in tellus eget neque vestibulum vestibulum. Maecenas porta orci quis felis sagittis, sed placerat erat eleifend.'
          isFollowed={true}
        />
        <ActiveUsersCard 
          avatar='123'
          userName='我是很長的使用者名稱我是很長的使用者名稱'
          account='test_user1'
          identity='老師'
          statistic={123}
          discription='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque venenatis a mauris in ullamcorper. Sed pulvinar augue eget turpis iaculis, quis semper erat vestibulum. Curabitur fermentum vehicula risus ut auctor. Integer volutpat, neque id tempor aliquet, dolor odio fringilla enim, ut tincidunt lorem leo eget nibh. Suspendisse interdum lacus erat, eu tristique felis tristique sed. Curabitur in tellus eget neque vestibulum vestibulum. Maecenas porta orci quis felis sagittis, sed placerat erat eleifend.'
          isFollowed={true}
        />
        
      </Flex>
    </Box>
  );
};

export default ActiveUsersPage;
