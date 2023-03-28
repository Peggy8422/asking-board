//工具
import React, { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { postLikedReply, deleteLikedReply } from '../../api/questionRelated';

//元件
import { Box, Flex, Text, Avatar, Tag, IconButton } from '@chakra-ui/react';
import { ThumbsUpIcon, ArrowUpIcon, ArrowDownIcon } from '../../assets/icons';

interface CardProps {
  id: number;
  userId: number;
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
  const [isLikedLocal, setIsLikedLocal] = useState(props.isLiked);
  const [likedCountLocal, setLikedCountLocal] = useState(props.likedCount);

  const token = localStorage.getItem('token')!;
  const currentUserId = JSON.parse(localStorage.getItem('currentUser')!).id;

  //按讚
  const handleLikePost = async () => {
    const status = await postLikedReply(token, props.id);
    if (status === 200) {
      setIsLikedLocal(true);
      setLikedCountLocal(likedCountLocal + 1);
    } else return;
  };

  //取消按讚
  const handleLikeDelete = async () => {
    const status = await deleteLikedReply(token, props.id);
    if (status === 200) {
      setIsLikedLocal(false);
      setLikedCountLocal(likedCountLocal - 1);
    } else return;
  };

  return (
    <Box p={5} borderBottom={'1px'} borderBottomColor={'brand.300'}>
      <Flex justify={'space-between'}>
        <Flex gap={3}>
          <Avatar
            as={ReactLink}
            to={
              props.userId === currentUserId
                ? '/front/profile'
                : `/front/profile_others/?userId=${props.userId}`
            }
            name={props.userName}
            src={props.avatar}
          />
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
          <Text fontSize={'sm'} color={'brand.500'}>
            發佈於：{props.createdAt}
          </Text>
          <Flex direction={'column'} align={'center'}>
            <IconButton
              isDisabled={isLikedLocal}
              size={'xs'}
              variant={'ghost'}
              aria-label="Liked this answer"
              icon={<ArrowUpIcon fill={isLikedLocal ? '#C4C4C4' : '#137547'} />}
              onClick={handleLikePost}
            />
            <Flex align={'center'} gap={2}>
              <ThumbsUpIcon fill={'#137547'} width={'20px'} />
              <Text fontSize={'md'} fontWeight={'bold'} color={'brand.500'}>
                {likedCountLocal}
              </Text>
            </Flex>
            <IconButton
              isDisabled={!isLikedLocal}
              size={'xs'}
              variant={'ghost'}
              aria-label="Liked this answer"
              icon={
                <ArrowDownIcon fill={isLikedLocal ? '#137547' : '#C4C4C4'} />
              }
              onClick={handleLikeDelete}
            />
          </Flex>
        </Flex>
      </Flex>
      {/* 內文 */}
      <Text>{props.content}</Text>
    </Box>
  );
};

export default ReplyCard;
