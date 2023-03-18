import React from 'react';
import { Card, CardBody, CardFooter, Avatar, Flex, Box, Text, Tag, Badge, Button } from '@chakra-ui/react';
import { CheckedIcon, AddIcon } from '../../assets/icons';

interface CardProps {
  avatar: string;
  userName: string;
  account: string;
  identity: string;
  statistic: number;
  discription: string;
  isFollowed: boolean;
  activeTab: string;
}

const ActiveUsersCard: React.FC<CardProps> = (props) => {
  return (
    <Card borderRadius={'2xl'} w={'45%'} boxShadow={'lg'}>
      <CardBody>
        <Flex wrap={'wrap'} gap={2}>
          <Avatar size={'lg'} name={props.userName} src={props.avatar} />
          <Box>
            <Flex align={'start'} gap={2}>
              <Text
                w={'90px'}
                color={'brand.500'}
                fontWeight={'semibold'}
                noOfLines={2}
              >{props.userName}</Text>
              <Tag
                size={'sm'} 
                borderRadius={'full'}
                bg={props.identity === '學生' ? 'brand.400' : 'brand.500'}
                color={'white'}
              >{props.identity}</Tag>
            </Flex>
            <Text
              fontSize={'md'}
              fontWeight={'medium'}
              color={'brand.gray_3'}
            >@{props.account}</Text>
             
          </Box>
        </Flex>
        <Text mt={2} noOfLines={3}>{props.discription}</Text>
      </CardBody>
      <CardFooter justify={'space-between'} p={3} pt={0}>
        <Badge fontSize={'md'} variant={'subtle'} colorScheme={'green'} >
          {props.activeTab === '最多追蹤者' && '追蹤者：'}
          {props.activeTab === '最常回答' && '回答數：'}
          {props.activeTab === '回答讚數最多' && '回答讚數：'}
          {props.statistic}
          {props.activeTab === '最多追蹤者' && '位'}
          {props.activeTab === '最常回答' && '則'}
          {props.activeTab === '回答讚數最多' && '讚'}
        </Badge>
        { props.isFollowed?
          (<Button
            size={'xs'}
            borderRadius={'full'}
            rightIcon={<AddIcon />}
            color={'brand.gray_3'}
            colorScheme={'gray'}
            borderColor={'brand.gray_3'}
            variant={'outline'}
          >
            追蹤
          </Button>)
          :
          (<Button
            size={'xs'}
            borderRadius={'full'}
            rightIcon={<CheckedIcon />}
            color={'brand.500'}
            colorScheme={'green'}
            variant={'outline'}
          >
            已追蹤
          </Button>)
        }
      </CardFooter>
    </Card>
  );
};

export default ActiveUsersCard;
