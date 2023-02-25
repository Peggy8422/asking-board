import React from 'react';
import { Card, CardBody, Heading, Text, Avatar, Box, Flex, Tag, Badge } from '@chakra-ui/react';

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
    <Card>
      <CardBody>
        <Flex>
          <Avatar name={props.userName} src={props.avatar} />
          <Box>
            <Flex>
              <Text>{props.userName}</Text>
              <Tag 
                size={'sm'} 
                borderRadius={'full'}
                bg={props.identity === '學生' ? 'brand.400' : 'brand.500'}
                color={'white'}
              >{props.identity}</Tag>
            </Flex>
          </Box>
        </Flex>
        <Heading></Heading>
      </CardBody>
    </Card>
  );
};

export default LatestPostCard;
