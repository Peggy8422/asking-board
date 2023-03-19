import React, { useState } from 'react';
import { Box, Flex, Heading, Button, ButtonGroup } from '@chakra-ui/react';

//card元件
import HomePostCard from '../components/user/HomePostCard';

/*--- 要刪掉的 ---*/ 
//test用的假字資料
const testWords='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque venenatis a mauris in ullamcorper. Sed pulvinar augue eget turpis iaculis, quis semper erat vestibulum. Curabitur fermentum vehicula risus ut auctor. Integer volutpat, neque id tempor aliquet, dolor odio fringilla enim, ut tincidunt lorem leo eget nibh. Suspendisse interdum lacus erat, eu tristique felis tristique sed. Curabitur in tellus eget neque vestibulum vestibulum. Maecenas porta orci quis felis sagittis, sed placerat erat eleifend. Nam ultrices congue turpis dictum porttitor. Quisque vulputate sem quis auctor faucibus. Nulla et mauris lectus.Integer ante erat, vulputate quis metus eu, ornare ultricies eros. In magna mauris, sodales vitae risus ut, bibendum maximus ante. Vivamus vel massa non est interdum viverra a vel quam. Nulla facilisis a eros et luctus. Nulla vehicula bibendum interdum. Suspendisse bibendum elit ornare lectus auctor suscipit. Aliquam posuere, ex vitae luctus efficitur, sapien nulla fermentum ex, vitae elementum justo ligula id dolor. Vestibulum elementum convallis urna, ac congue dolor. Vivamus porttitor, metus non porttitor aliquam, sapien urna dictum nulla, at pulvinar felis dolor eu tellus.'


const HotIssuePage = () => {
  const [activeCategory, setActiveCategory] = useState('國中');

  return (
    <Box w={'100%'}>
      <Flex align={'start'} justify={'space-between'} bg={'white'}>
        <Heading as={'h1'} size={'lg'} color={'brand.500'} mb={5}>
          熱門問題：{activeCategory}
        </Heading>
        <ButtonGroup
          size="sm"
          isAttached
          variant="outline"
          color={'brand.gray_1'}
          colorScheme={'gray'}
        >
          {['全部', '國中', '其他'].map((item, index) => {
            return (
              <Button
                mx={'1px'}
                key={index}
                color={activeCategory === item ? 'brand.500' : 'brand.gray_1'}
                colorScheme={activeCategory === item ? 'green' : 'gray'}
              >
                {item}
              </Button>
            );
          })}
        </ButtonGroup>
      </Flex>
      <Flex
        position={'relative'}
        pb={5}
        mt={2}
        px={5}
        mr={-3}
        left={-4}
        h={activeCategory === '國中' ? '65vh' : '73vh'}
        direction={'column'}
        rowGap={5}
        overflowY={'scroll'}
        sx={{
          '::-webkit-scrollbar': {
            'width': '6px',
            'background-color': 'transparent',
          },
          '::-webkit-scrollbar-thumb': {
            'width': '6px',
            'border': 'none',
            'border-radius': '3px',
            'background-color': 'var(--chakra-colors-brand-300)',
          }
        }}
      >
        {/* map所有問題的卡片 */}
        <HomePostCard
          id={4}
          avatar="123"
          userName="我要測試如果名稱超長會怎樣我要測試如果名稱超長會怎樣"
          account="peggy_test"
          identity="學生"
          category="國中一年級數學"
          title="關於XXXXX解法?......擠到第二行會變怎樣"
          image=''
          content={testWords}
          createdAt="5秒前"
          likedCount={123}
          isLiked={false}
        />
        <HomePostCard
          id={4}
          avatar="123"
          userName="我要測試如果名稱超長會怎樣"
          account="peggy_test"
          identity="學生"
          category="國中一年級數學"
          title="關於XXXXX解法?......擠到第二行會變怎樣"
          image=''
          content={testWords}
          createdAt="5秒前"
          likedCount={123}
          isLiked={true}
        />
      </Flex>
    </Box>
  );
};

export default HotIssuePage;
