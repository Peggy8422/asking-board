//工具
import React, { useState } from 'react';
import {
  postLikedQuestion,
  deleteLikedQuestion,
} from '../../api/questionRelated';

//元件
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
  userId: number;
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
  const [isLikedLocal, setIsLikedLocal] = useState(props.isLiked);
  const [likedCountLocal, setLikedCountLocal] = useState(props.likedCount);

  const token = localStorage.getItem('token')!;
  const currentUserId = JSON.parse(localStorage.getItem('currentUser')!).id;

  //按收藏
  const handleLikePost = async () => {
    const status = await postLikedQuestion(token, props.id);
    if (status === 200) {
      setIsLikedLocal(true);
      setLikedCountLocal(likedCountLocal + 1);
    } else return;
  };

  //取消收藏
  const handleLikeDelete = async () => {
    const status = await deleteLikedQuestion(token, props.id);
    if (status === 200) {
      setIsLikedLocal(false);
      setLikedCountLocal(likedCountLocal - 1);
    } else return;
  };

  return (
    <Card h={'40vh'} boxShadow={'lg'} borderRadius={'2xl'} p={2}>
      <CardBody overflow={'hidden'}>
        <Flex align={'start'} justify={'space-between'}>
          <Flex gap={3}>
            <Link
              to={
                props.userId === currentUserId
                  ? '/front/profile'
                  : `/front/profile_others/?userId=${props.userId}`
              }
            >
              <Avatar name={props.userName} src={props.avatar} />
            </Link>
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
                {likedCountLocal}個收藏
              </Text>
            </Box>
            <Box cursor={'pointer'}>
              {isLikedLocal ? (
                <HeartIcon
                  fill="#FF4752"
                  width={'37px'}
                  onClick={handleLikeDelete}
                />
              ) : (
                <HeartOutlineIcon onClick={handleLikePost} />
              )}
            </Box>
          </Flex>
        </Flex>
        <Link to={`/front/reply/?reply_to=${props.id}`}>
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
