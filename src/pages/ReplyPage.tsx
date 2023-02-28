import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Tag,
  Avatar,
  Textarea,
  Button,
  Divider
} from '@chakra-ui/react';
import {
  GoBackIcon,
  HeartIcon,
  HeartOutlineIcon,
  CommentIcon,
} from '../assets/icons';

//test假內容
import { testWords } from './HomePage';

//card元件
import ReplyCard from '../components/user/ReplyCard';

interface ReplyProps {
  title: string;
  category: string;
  likedCount: number;
  isLiked: boolean;
  avatar: string;
  userName: string;
  account: string;
  identity: string;
  createdAt: string;
  content: string;
  replyCount: number;
}

const ReplyPage: React.FC<ReplyProps> = (props) => {
  return (
    <Box w={'100%'}>
      {/* 標頭資訊們 */}
      <Box bg={'white'}>
        <Flex align={'start'} justify={'space-between'}>
          <Flex align={'baseline'} gap={3}>
            <GoBackIcon />
            <Heading as={'h1'} size={'lg'} color={'brand.500'} mb={5}>
              {props.title}
            </Heading>
            <Tag
              size={'md'}
              variant={'outline'}
              color={'brand.500'}
              colorScheme={'green'}
              bg={'white'}
              borderColor={'brand.400'}
            >
              {props.category}
            </Tag>
          </Flex>
          <Flex align={'center'} gap={2}>
            <Text color={'brand.gray_3'}>{props.likedCount}個收藏</Text>
            {props.isLiked ? (
              <HeartIcon fill="#FF4752" />
            ) : (
              <HeartOutlineIcon width={'30px'} />
            )}
          </Flex>
        </Flex>
        <Flex align={'start'} justify={'space-between'}>
          <Flex gap={2}>
            <Text color={'brand.500'} fontSize={'lg'} fontWeight={'bold'}>
              提問者：
            </Text>
            <Avatar name={props.userName} src={props.avatar} />
            <Box>
              <Flex align={'start'} gap={2}>
                <Text
                  color={'brand.500'}
                  fontWeight={'semibold'}
                  overflow={'hidden'}
                  whiteSpace={'nowrap'}
                  textOverflow={'ellipsis'}
                >
                  {props.userName}
                </Text>
                <Tag
                  size={'sm'}
                  borderRadius={'full'}
                  bg={props.identity === '學生' ? 'brand.400' : 'brand.500'}
                  color={'white'}
                >
                  {props.identity}
                </Tag>
              </Flex>
              <Text
                fontSize={'sm'}
                fontWeight={'medium'}
                color={'brand.gray_3'}
              >
                @{props.account}
              </Text>
            </Box>
          </Flex>
          <Text color={'brand.500'}>發佈於：{props.createdAt}</Text>
        </Flex>
      </Box>
      <Box
        position={'relative'}
        pb={5}
        mt={2}
        mx={-5}
        // mr={-3}
        // left={-4}
        // right={-4}
        h={'70vh'}
        overflowY={'scroll'}
        overflowX={'hidden'}
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
        <Text mx={5} mt={5}>
          {props.content}
        </Text>
        <Flex mt={5} py={2} pl={2} bg={'brand.gray_2'} align={'center'}>
          <CommentIcon fill="#707070" />
          <Text color={'brand.gray_3'} fontWeight={'semibold'}>
            所有回答：{props.replyCount}
          </Text>
        </Flex>
        {/* 回答的Form */}
        <Box>
          <Heading as={'h5'} size={'md'} mx={5} my={3} color={'brand.500'}>
            我要回答：
          </Heading>
          <Textarea
            w={'95%'}
            mx={5}
            bg={'brand.gray_2'}
            placeholder="我的看法是..."
            size={'lg'}
            border={'none'}
            resize={'none'}
            rows={10}
            borderRadius={'xl'}
          />
          <Flex p={2} pr={5} justify={'end'}>
            <Button size={'sm'} bg={'brand.500'} colorScheme={'green'}>
              回覆
            </Button>
          </Flex>
        </Box>
        <Divider />
        <ReplyCard 
          avatar='123'
          userName='Test'
          account='user_test'
          identity='老師'
          content={testWords}
          createdAt='5秒前'
          likedCount={500}
          isLiked={true}
        />
        <ReplyCard 
          avatar='123'
          userName='Test'
          account='user_test'
          identity='老師'
          content={testWords}
          createdAt='5秒前'
          likedCount={500}
          isLiked={true}
        />
      </Box>
    </Box>
  );
};

export default ReplyPage;
