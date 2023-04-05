//工具
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { getUserFollowers, getUserFollowings } from '../api/followRelated';

//元件
import {
  Box,
  Flex,
  Heading,
  Button,
  ButtonGroup,
  Spinner,
} from '@chakra-ui/react';
import { GoBackIcon } from '../assets/icons';

//card元件
import ActiveUsersCard from '../components/user/ActiveUsersCard';

const FollowPage = () => {
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState('追蹤者');
  const [usersData, setUsersData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  //你的追蹤中資料
  const [yourFollowings, setYourFollowings] = useState<any[]>([]);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = localStorage.getItem('token')!;

  //他人的名字和id
  const otherUserName = state.userName;
  const otherUserId = Number(searchParams.get('userId'));
  //你的id
  const currentUserId = JSON.parse(localStorage.getItem('currentUser')!).id;

  useEffect(() => {
    if (state.active === '追蹤中') {
      setActiveTab('追蹤中');
    } else return;
  }, [state.active]);

  //切換追蹤者/追蹤中的Tab
  const handleActiveTabClick = (activeTab: string) => {
    setActiveTab(activeTab);
    getUserFollowData(activeTab === '追蹤者');
  }

  const getUserFollowData = useCallback(async (condition: boolean) => {
    setIsLoading(true);
    let data;
    if (state.isOnOthersPage) {
      if (condition) {
        data = await getUserFollowers(token, otherUserId);
      } else {
        data = await getUserFollowings(token, otherUserId);
      }
    } else {
      if (condition) {
        data = await getUserFollowers(token, currentUserId);
      } else {
        data = await getUserFollowings(token, currentUserId);
        setYourFollowings(data);
      }
    }
    setUsersData(data);
    setIsLoading(false);
  }, [state.isOnOthersPage, token, currentUserId, otherUserId])

  useEffect(() => {    
    getUserFollowData(state.active === '追蹤者');
  }, [getUserFollowData, state.active]);

  return (
    <Box w={'100%'}>
      <Flex align={'baseline'} gap={3}>
        <GoBackIcon onClick={() => navigate(-1)} />
        <Heading as={'h1'} size={'lg'} color={'brand.500'} mb={5}>
          {(state.isOnOthersPage ? otherUserName : '你')}的
          {activeTab}
        </Heading>
        <ButtonGroup
          size="sm"
          variant="outline"
          color={'brand.400'}
          colorScheme={'green'}
        >
          {['追蹤者', '追蹤中'].map((item, index) => {
            return (
              <Button
                key={index}
                borderRadius={'full'}
                color={activeTab === item ? 'white' : 'brand.400'}
                variant={activeTab === item ? 'solid' : 'outline'}
                boxShadow={'md'}
                onClick={() => {handleActiveTabClick(item)}}
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
          usersData.length === 0 ?
          <Heading color={'brand.300'}
          size={'lg'}>尚無追蹤者/追蹤中資料</Heading>
          :
          usersData.map((user: any) => (
            <ActiveUsersCard
              key={user.id}
              id={user.id}
              avatar={user.avatar}
              userName={user.name}
              account={user.account}
              identity={user.role}
              discription={user.introduction}
              isFollowed={!state.isOnOthersPage && activeTab === '追蹤中' ? true : user.isFollowed}
              prevData={yourFollowings}
              setPrevData={setUsersData}
            />
          ))
        )}
      </Flex>
    </Box>
  );
};

export default FollowPage;
