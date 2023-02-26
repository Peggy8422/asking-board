import React from 'react';
import { Card, CardBody, Heading, Text, Avatar, Box, Flex, Tag } from '@chakra-ui/react';

interface CardProps {
  avatar: string;
  userName: string;
  account: string;
  identity: string;
  category: string;
  title: string;
  createdAt: string;
}

const LatestPostCard: React.FC<CardProps> = (props) => {
  return (
    <Card borderRadius={'xl'} boxShadow={'lg'} cursor={'pointer'}>
      <CardBody p={4} >
        <Flex gap={1}>
          <Avatar size={'sm'} name={props.userName} src={props.avatar} />
          <Box>
            <Flex align={'start'} gap={1}>
              <Text 
                color={'brand.500'}
                fontWeight={'semibold'}
                overflow={'hidden'}
                whiteSpace={'nowrap'}
                textOverflow={'ellipsis'}
              >{props.userName}</Text>
              <Tag 
                size={'sm'} 
                borderRadius={'full'}
                bg={props.identity === '學生' ? 'brand.400' : 'brand.500'}
                color={'white'}
              >
                {props.identity}
              </Tag>
              <Tag
                size={'sm'}
                variant={'outline'}
                color={'brand.500'}
                colorScheme={'green'}
                bg={'white'}
                borderColor={'brand.400'}
              >
                {props.category}
              </Tag>
            </Flex>
            <Text fontSize={'sm'} fontWeight={'medium'} color={'brand.gray_3'}>@{props.account}</Text>
          </Box>
        </Flex>
        <Heading
          as={'h5'}
          size={'md'}
          color={'brand.500'}
          overflow={'hidden'}
          whiteSpace={'nowrap'}
          textOverflow={'ellipsis'}
        >
          {props.title}
        </Heading>
        <Text fontSize={'sm'} color={'brand.gray_3'} textAlign={'right'}>{props.createdAt}</Text>
      </CardBody>
    </Card>
  );
};

export default LatestPostCard;
