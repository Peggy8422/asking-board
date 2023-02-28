import React from 'react';
import { Box, Flex, Text, Avatar, Tag, IconButton } from '@chakra-ui/react';
import { ThumbsUpIcon, ArrowUpIcon, ArrowDownIcon } from '../../assets/icons';

interface CardProps {
  avatar: string;
  userName: string;
  account: string;
  identity: string;
  content: string;
  createdAt: string;
  likedCount: number;
  isLiked: boolean;
}

const ReplyCard: React.FC<CardProps> = (props) => {
  return (
    <Box p={5} borderBottom={'1px'} borderBottomColor={'brand.300'}>
      <Flex justify={'space-between'}>
        <Flex gap={3}>
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
            <Text fontSize={'sm'} fontWeight={'medium'} color={'brand.gray_3'}>
              @{props.account}
            </Text>
          </Box>
        </Flex>
        <Flex gap={3}>
          <Text fontSize={'sm'} color={'brand.500'}>發佈於：{props.createdAt}</Text>
          <Flex direction={'column'} align={'center'}>
            <IconButton isDisabled={props.isLiked}  size={'xs'} variant={'ghost'} aria-label='Liked this answer' icon={<ArrowUpIcon fill={props.isLiked ? '#C4C4C4' : '#137547'} />} />
            <Flex align={'center'} gap={2}>
              <ThumbsUpIcon fill={'#137547'} width={'20px'} />
              <Text fontSize={'md'} fontWeight={'bold'} color={'brand.500'}>{props.likedCount}</Text>
            </Flex>
            <IconButton isDisabled={!props.isLiked} size={'xs'} variant={'ghost'} aria-label='Liked this answer' icon={<ArrowDownIcon fill={props.isLiked ? '#137547' : '#C4C4C4'} />} />
          </Flex>
        </Flex>
      </Flex>
      {/* 內文 */}
      <Text>{props.content}</Text>
    </Box>
  );
};

export default ReplyCard;
