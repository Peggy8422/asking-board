//工具
import React, { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { postFollowedUser, deleteFollowedUser } from '../../api/followRelated';

//元件
import {
  Card,
  CardBody,
  CardFooter,
  Avatar,
  Flex,
  Box,
  Text,
  Tag,
  Badge,
  Button,
} from '@chakra-ui/react';
import { CheckedIcon, AddIcon } from '../../assets/icons';

interface CardProps {
  id: number;
  avatar: string;
  userName: string;
  account: string;
  identity: string;
  statistic?: number;
  discription: string;
  isFollowed: boolean;
  activeTab?: string;
  prevData?: any[];
  setPrevData?: React.Dispatch<React.SetStateAction<any[]>>;
}

const ActiveUsersCard: React.FC<CardProps> = (props) => {
  const [isFollowedLocal, setIsFollowedLocal] = useState(props.isFollowed);

  const token = localStorage.getItem('token')!;
  const currentUserId = JSON.parse(localStorage.getItem('currentUser')!).id;

  //追蹤
  const handleFollowedClick = async () => {
    const status = await postFollowedUser(token, props.id);
    if (status === 200) {
      setIsFollowedLocal(true);
    } else return;
  }
  //取消追蹤
  const handleUnFollowedClick = async () => {
    const status = await deleteFollowedUser(token, props.id);
    if (status === 200) {
      setIsFollowedLocal(false);
      if (props.prevData?.length !== 0) {
        props.setPrevData!(prevData => [...prevData].filter((item: any) => item.id !== props.id));
      }
    } else return;
  }

  return (
    <Card borderRadius={'2xl'} w={{base: '100%', md: '45%'}} boxShadow={'lg'}>
      <CardBody>
        <Flex w={'100%'} wrap={'nowrap'} gap={2}>
          <Avatar
            as={ReactLink}
            to={
              props.id === currentUserId
                ? '/front/profile'
                : `/front/profile_others/?userId=${props.id}`
            }
            size={{base: 'md', md: 'lg'}}
            name={props.userName}
            src={props.avatar}
          />
          <Box flexGrow={1}>
            <Flex align={'start'} gap={2}>
              <Text
                w={'120px'}
                color={'brand.500'}
                fontWeight={'semibold'}
                noOfLines={1}
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
              w={'80%'}
              fontSize={'md'}
              fontWeight={'medium'}
              color={'brand.gray_3'}
              overflow={'hidden'}
              whiteSpace={'nowrap'}
              textOverflow={'ellipsis'}
            >
              @{props.account}
            </Text>
          </Box>
        </Flex>
        <Text mt={2} noOfLines={3}>
          {props.discription}
        </Text>
      </CardBody>
      <CardFooter
        justify={props.activeTab ? 'space-between' : 'flex-end'}
        p={3}
        pt={0}
      >
        {props.activeTab && (
          <Badge fontSize={'md'} variant={'subtle'} colorScheme={'green'}>
            {props.activeTab === '最多追蹤者' && '追蹤者：'}
            {props.activeTab === '最常回答' && '回答數：'}
            {props.activeTab === '回答讚數最多' && '回答讚數：'}
            {props.statistic}
            {props.activeTab === '最多追蹤者' && '位'}
            {props.activeTab === '最常回答' && '則'}
            {props.activeTab === '回答讚數最多' && '讚'}
          </Badge>
        )}
        {isFollowedLocal ? (
          <Button
            size={'xs'}
            borderRadius={'full'}
            rightIcon={<CheckedIcon />}
            color={'brand.500'}
            colorScheme={'green'}
            variant={'outline'}
            isDisabled={props.id === currentUserId}
            onClick={handleUnFollowedClick}
          >
            已追蹤
          </Button>
        ) : (
          <Button
            size={'xs'}
            borderRadius={'full'}
            rightIcon={<AddIcon />}
            color={'brand.gray_3'}
            colorScheme={'gray'}
            borderColor={'brand.gray_3'}
            variant={'outline'}
            isDisabled={props.id === currentUserId}
            onClick={handleFollowedClick}
          >
            追蹤
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ActiveUsersCard;
