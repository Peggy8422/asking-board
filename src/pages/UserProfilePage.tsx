import React from 'react';
import {
  Box,
  Heading,
  Text,
  Tag,
  Badge,
  Button,
  Flex,
  Avatar,
  Divider,
  Image,
} from '@chakra-ui/react';
import { RightArrowIcon, EditIcon } from '../assets/icons';
import LatestPostCard from '../components/user/LatestPostCard';

const UserProfilePage = () => {
  return (
    <Box w={'100%'}>
      {/* 封面照 */}
      <Image
        m={-5}
        mt={-8}
        w={'108%'}
        maxW={'unset'}
        h={'30vh'}
        src={'https://picsum.photos/2000/800'}
        objectFit={'cover'}
      />
      <Flex
        position={'relative'}
        align={'end'}
        gap={3}
        transform={'translateY(-35%)'}
      >
        {/* 個人大頭貼 */}
        <Avatar
          size={'2xl'}
          name={'Temp'}
          src={''}
          border={'4px'}
          color={'white'}
        />
        <Box>
          <Flex align={'center'} gap={2}>
            <Heading as={'h2'} size={'lg'} color={'brand.500'}>
              User_test
            </Heading>
            <Tag
              size={'md'}
              borderRadius={'full'}
              bg={'brand.400'}
              color={'white'}
            >
              學生
            </Tag>
          </Flex>
          <Text color={'brand.gray_3'}>@userName</Text>
        </Box>
        <Badge
          position={'absolute'}
          right={0}
          fontSize={'md'}
          bg={'transparent'}
          color={'brand.500'}
        >
          {123}個追蹤者 | {321}個追蹤中
        </Badge>
      </Flex>
      <Text m={3} mt={-3}>
        自我介紹：Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque venenatis a mauris in ullamcorper. Sed pulvinar augue eget
        turpis iaculis, quis semper erat vestibulum. Curabitur fermentum
        vehicula risus ut auctor. Integer volutpat, neque id tempor aliquet,
        dolor odio fringilla enim, ut tincidunt lorem leo eget nibh.
      </Text>
      <Flex justify={'end'}>
        <Button size={'sm'} leftIcon={<EditIcon />} bg={'brand.400'} colorScheme={'green'}>編輯個人資料</Button>
      </Flex>
      
      <Divider mt={3} borderColor={'brand.300'} />
      <Box
        position={'relative'}
        h={'31vh'}
        pb={5}
        mt={3}
        px={3}
        mr={-3}
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
        {/* 區塊1：所有提問 */}
        <Box mb={6}>
          <Flex align={'center'} justify={'space-between'}>
            <Heading as={'h3'} size={'md'} color={'brand.500'}>
              所有提問
            </Heading>
            <Button
              size={'lg'}
              rightIcon={<RightArrowIcon />}
              variant={'ghost'}
              colorScheme={'green'}
              color={'brand.500'}
            >
              查看更多
            </Button>
          </Flex>
          <Flex gap={2}>
            {/* 排版用 */}
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
        {/* 區塊2：收藏的提問 */}
        <Box mb={6}>
          <Flex align={'center'} justify={'space-between'}>
            <Heading as={'h3'} size={'md'} color={'brand.500'}>
              收藏的提問
            </Heading>
            <Button
              size={'lg'}
              rightIcon={<RightArrowIcon />}
              variant={'ghost'}
              colorScheme={'green'}
              color={'brand.500'}
            >
              查看更多
            </Button>
          </Flex>
          <Flex gap={2}>
            {/* 排版用 */}
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
        {/* 區塊3：回答過的提問 */}
        <Box mb={6}>
          <Flex align={'center'} justify={'space-between'}>
            <Heading as={'h3'} size={'md'} color={'brand.500'}>
              回答過的提問
            </Heading>
            <Button
              size={'lg'}
              rightIcon={<RightArrowIcon />}
              variant={'ghost'}
              colorScheme={'green'}
              color={'brand.500'}
            >
              查看更多
            </Button>
          </Flex>
          <Flex gap={2}>
            {/* 排版用 */}
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
      </Box>
    </Box>
  );
};

export default UserProfilePage;
