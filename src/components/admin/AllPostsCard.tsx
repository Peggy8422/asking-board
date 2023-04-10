import React from 'react';
import { Box, Flex, Image, Text, Heading, Avatar, Tag, Badge } from '@chakra-ui/react';
import { HeartIcon, CrossIcon } from '../../assets/icons';

interface CardProps {
  Q_Id: number;
  firstImg: string;
  title: string;
  content: string;
  avatar: string;
  account: string;
  createdAt: string;
  likedCount: number;
  category: string;
  onDelete: (id: number) => Promise<void>;
}

const AllPostsCard: React.FC<CardProps> = (props) => {
  return (
    <Flex borderRadius={'lg'} boxShadow={'md'} p={5} pt={8} pr={6} gap={2} position={'relative'} wrap={{base: 'wrap', md: 'nowrap'}}>
      <Image boxSize={{base: '150px', md: '200px'}} h={{base: '113px', md: '150px'}} objectFit={'cover'} src={props.firstImg} alt={''} />
      <Box ml={{base: 0, md: 5}} w={'full'}>
        <Flex justify={'space-between'} wrap={{base: 'wrap', md: 'nowrap'}}>
          <Heading as={'h6'} size={{base: 'md', md: 'lg'}} color={'brand.500'}>{props.title}</Heading>
          <Flex direction={'column'} justify={'end'}>
            <Flex gap={2}>
              <Avatar size={'sm'} name={props.account} src={props.avatar} />
              <Text color={'brand.gray_3'} fontWeight={'medium'}>@{props.account}</Text>
              <Text color={'brand.500'} fontSize={{base: 'sm', md: 'md'}}>發佈於：{props.createdAt}</Text>
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
        <Text fontSize={{base: 'sm', md: 'md'}}>{props.content}</Text>
      </Box>
      <Box position={'absolute'} right={'0px'} top={'5px'} cursor={'pointer'} onClick={() => props.onDelete?.(props.Q_Id)}>
        <CrossIcon width={'50px'}/>
      </Box>
      <Tag colorScheme={'green'} position={'absolute'} right={'15px'} bottom={'15px'} >{props.category}</Tag>
    </Flex>

  );
};

export default AllPostsCard;
