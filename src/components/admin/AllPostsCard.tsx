import React from 'react';
import { Box, Flex, Image, Text, Heading, Avatar, Tag, Badge } from '@chakra-ui/react';
import { HeartIcon, CrossIcon } from '../../assets/icons';

interface CardProps {
  firstImg: string;
  title: string;
  content: string;
  avatar: string;
  account: string;
  createdAt: string;
  likedCount: number;
}

const AllPostsCard: React.FC<CardProps> = (props) => {
  return (
    <Flex borderRadius={'lg'} boxShadow={'md'} p={5} pt={8} pr={6} position={'relative'}>
      <Image boxSize={'200px'} h={'150px'} objectFit={'cover'} src={props.firstImg} alt={''} />
      <Box ml={5}>
        <Flex justify={'space-between'}>
          <Heading as={'h6'} size={'lg'} color={'brand.500'}>{props.title}</Heading>
          <Flex direction={'column'} justify={'end'}>
            <Flex gap={2}>
              <Avatar size={'sm'} name={props.account} src={props.avatar} />
              <Text color={'brand.gray_3'} fontWeight={'medium'}>@{props.account}</Text>
              <Text color={'brand.500'} >發佈於：{props.createdAt}</Text>
            </Flex>
            <Badge 
              display={'flex'} 
              alignItems={'center'}
              justifyContent={'end'} 
              bg={'transparent'} 
              color={'brand.gray_3'}
              fontSize={'sm'}
            >
              <HeartIcon width={'20px'} viewBox="0 0 15 10"/>
              {props.likedCount}個收藏
            </Badge>
          </Flex>
        </Flex>
        <Text>{props.content}</Text>
      </Box>
      <Box position={'absolute'} right={'0px'} top={'5px'} cursor={'pointer'}>
        <CrossIcon width={'50px'}/>
      </Box>
    </Flex>

  );
};

export default AllPostsCard;
