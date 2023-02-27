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
        <Badge fontSize={'md'} variant={'solid'} colorScheme={'green'} >追蹤者：{props.statistic}位</Badge>
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
