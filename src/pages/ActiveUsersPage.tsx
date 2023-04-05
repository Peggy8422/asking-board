//工具
import React, { useState, useEffect } from 'react';
import {
  getMostFollowerUsers,
  getMostReplyUsers,
  getMostLikedUsers,
} from '../api/userRelated';

//元件
import {
  Box,
  Flex,
  Heading,
  Button,
  ButtonGroup,
  Spinner,
} from '@chakra-ui/react';

//card元件
import ActiveUsersCard from '../components/user/ActiveUsersCard';

const ActiveUsersPage = () => {
  const [activeTab, setActiveTab] = useState('最多追蹤者');
  const [isLoading, setIsLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);

  const token = localStorage.getItem('token')!;

  useEffect(() => {
    setIsLoading(true);
    const getMostInitData = async () => {
      const data = await getMostFollowerUsers(token);
      setUsersData(data);
      setIsLoading(false);
    };

    getMostInitData();
  }, [token]);

  return (
    <Box w={'100%'}>
      <Flex align={'start'} bg={'white'} gap={3}>
        <Heading as={'h1'} size={'lg'} color={'brand.500'} mb={5}>
          活躍用戶
        </Heading>
        <ButtonGroup
          size="sm"
          variant="outline"
          color={'brand.400'}
          colorScheme={'green'}
        >
          {['最多追蹤者', '最常回答', '回答讚數最多'].map((item, index) => {
            return (
              <Button
                key={index}
                borderRadius={'full'}
                // backgroundColor={activeTab === item ? 'brand.400' : ''}
                color={activeTab === item ? 'white' : 'brand.400'}
                variant={activeTab === item ? 'solid' : 'outline'}
                boxShadow={'md'}
                onClick={async () => {
                  setIsLoading(true);
                  setActiveTab(item);
                  let data;
                  switch(item) {
                    case '最多追蹤者': {
                      data = await getMostFollowerUsers(token);
                      setUsersData(data);
                      setIsLoading(false);
                      break;
                    }
                    case '最常回答': {
                      data = await getMostReplyUsers(token);
                      setUsersData(data);
                      setIsLoading(false);
                      break;
                    }
                    case '回答讚數最多': {
                      data = await getMostLikedUsers(token);
                      setUsersData(data);
                      setIsLoading(false);
                      break;
                    }
                    default: {
                      break;
                    }
                  }
                }}
              >
                {item}
              </Button>
            );
          })}
        </ButtonGroup>
      </Flex>
      <Flex
        align={'start'}
        alignContent={'flex-start'}
        wrap={'wrap'}
        position={'relative'}
        pb={5}
        mt={2}
        px={5}
        mr={-3}
        left={-4}
        h={'73vh'}
        gap={5}
        overflowY={'scroll'}
        sx={{
          '::-webkit-scrollbar': {
            width: '6px',
            backgroundColor: 'transparent',
          },
          '::-webkit-scrollbar-thumb': {
            width: '6px',
            border: 'none',
            borderRadius: '3px',
            backgroundColor: 'var(--chakra-colors-brand-300)',
          },
        }}
      >
        {/* map所有使用者的卡片 */}
        {isLoading ? (
          <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="gray.200"
            color="brand.300"
            size="xl"
            position={'absolute'}
            top={'40%'}
            left={'50%'}
          />
        ) : (
          usersData.map((user: any) => 
            <ActiveUsersCard
            key={user.id}
            id={user.id}
            avatar={user.avatar}
            userName={user.name}
            account={user.account}
            identity={user.role}
            statistic={user.followerCount || user.likedCount || user.replyCount}
            discription={user.introduction}
            isFollowed={user.isFollowed}
            activeTab={activeTab}
          />
          )
        )}
      </Flex>
    </Box>
  );
};

export default ActiveUsersPage;
