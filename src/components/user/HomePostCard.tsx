import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  Heading,
  Text,
  Avatar,
  Box,
  Flex,
  Tag,
  Image,
} from '@chakra-ui/react';
import { HeartIcon, HeartOutlineIcon } from '../../assets/icons';

interface CardProps {
  id: number;
  avatar: string;
  userName: string;
  account: string;
  identity: string;
  category: string;
  title: string;
  image: string; //有上傳圖片的話會顯示第一張當預覽
  content: string;
  createdAt: string;
  likedCount: number;
  isLiked: boolean;
}

const HomePostCard: React.FC<CardProps> = (props) => {
  return (
    <Card h={'40vh'} boxShadow={'lg'} borderRadius={'2xl'} p={2}>
      <CardBody overflow={'hidden'}>
        <Flex align={'start'} justify={'space-between'}>
          <Flex gap={3}>
            <Avatar name={props.userName} src={props.avatar} />
            <Box>
              <Flex gap={3}>
                <Text
                  // w={'200px'}
                  color={'brand.500'}
                  fontSize={'lg'}
                  fontWeight={'semibold'}
                  overflow={'hidden'}
                  whiteSpace={'nowrap'}
                  textOverflow={'ellipsis'}
                >
                  {props.userName}
                </Text>
                <Tag
                  size={'md'}
                  borderRadius={'full'}
                  bg={props.identity === '學生' ? 'brand.400' : 'brand.500'}
                  color={'white'}
                >
                  {props.identity}
                </Tag>
              </Flex>
              <Text
                fontSize={'md'}
                fontWeight={'medium'}
                color={'brand.gray_3'}
              >
                @{props.account}
              </Text>
            </Box>
          </Flex>
          <Flex gap={2}>
            <Box textAlign={'right'}>
              <Text color={'brand.500'} fontWeight={'medium'}>
                發佈於：{props.createdAt}
              </Text>
              <Text
                fontSize={'sm'}
                fontWeight={'semibold'}
                color={'brand.gray_3'}
              >
                {props.likedCount}個收藏
              </Text>
            </Box>
            <Box cursor={'pointer'}>
              {props.isLiked ? (
                <HeartIcon fill="#FF4752" width={'37px'} />
              ) : (
                <HeartOutlineIcon />
              )}
            </Box>
          </Flex>
        </Flex>
        <Flex justify={'space-between'} mt={5}>
          <Heading as={'h2'} fontSize={'2xl'} color={'brand.500'}>
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
        <Link to={`/front/reply/?reply_to=${props.id}`}>
          {props.image && <Image mt={3} src={props.image} />}
          <Text mt={3} noOfLines={3}>
            {props.content}
          </Text>
        </Link>
      </CardBody>
    </Card>
  );
};

export default HomePostCard;
