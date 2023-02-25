import React from 'react';
import { Card, CardBody, CardFooter, Box, Flex, Heading, Text, Avatar, Tag, TagLeftIcon, TagLabel, Badge } from '@chakra-ui/react';
import { HandIcon, HeartIcon, CommentIcon, ThumbsUpIcon } from '../../assets/icons';

interface CardProps {
  avatar: string;
  userName: string;
  account: string;
  identity: string;
  followersCount: number;
  followingsCount: number;
  questionsCount: number;
  repliesCount: number;
  QLikedCount: number;
  RLikedCount: number;
}

const AllUsersCard: React.FC<CardProps> = (props) => {
  return (
    <Card w={'30%'} minW={'350px'} overflow={'hidden'} borderRadius={'2xl'} boxShadow={'lg'}>
      <CardBody>
        <Flex align={'start'} justify={'center'} gap={3}>
          <Avatar size={'lg'} name={props.userName} src={props.avatar} />
          <Box>
            <Heading as={'h4'} size={'md'} color={'brand.500'}>{props.userName}</Heading>
            <Text color={'brand.gray_3'} fontWeight={'semibold'}>@{props.account}</Text>
          </Box>
          <Tag 
            size={'lg'} 
            borderRadius={'full'}
            bg={props.identity === '學生' ? 'brand.400' : 'brand.500'}
            color={'white'}
          >{props.identity}</Tag>
        </Flex>
        <Flex justify={'center'} mt={2}>
          <Badge bg={'transparent'} color={'brand.gray_3'}>{props.followersCount}個追蹤者  |  {props.followingsCount}個追蹤中</Badge>
        </Flex>
      </CardBody>
      <CardFooter bg={'brand.300'} p={2}>
        <Box>
          <Tag size={'md'} bg={'transparent'}>
            <TagLeftIcon as={HandIcon} width={'3'} />
            <TagLabel color={'white'} fontWeight={'500'} letterSpacing={'1px'}>提問：{props.questionsCount}則</TagLabel>
          </Tag>
          <Tag size={'md'} bg={'transparent'}>
            <TagLeftIcon as={CommentIcon} width={'3'} />
            <TagLabel color={'white'} fontWeight={'500'}
            letterSpacing={'1px'}>回答：{props.repliesCount}則</TagLabel>
          </Tag>
        </Box>
        <Box>
          <Tag size={'md'} bg={'transparent'}>
            <TagLeftIcon as={HeartIcon} fill={'white'} width={'3'} />
            <TagLabel color={'white'} fontWeight={'500'} letterSpacing={'1px'}>所有提問收到{props.QLikedCount}個收藏</TagLabel>
          </Tag>
          <Tag size={'md'} bg={'transparent'}>
            <TagLeftIcon as={ThumbsUpIcon} />
            <TagLabel color={'white'} fontWeight={'500'} letterSpacing={'1px'}>所有回答收到{props.RLikedCount}個喜歡</TagLabel>
          </Tag>
        </Box>
      </CardFooter>
    </Card>
  );
};

export default AllUsersCard;
