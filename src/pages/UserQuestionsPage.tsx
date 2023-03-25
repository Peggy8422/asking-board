//工具
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
  getOtherUsersInfo,
  getUserAllQuestions,
  getUserLikedQuestions,
  getUserAllReplies,
} from '../api/userRelated';

//元件
import { Box, Flex, Heading, SkeletonText } from '@chakra-ui/react';
import { GoBackIcon } from '../assets/icons';

//card元件
import HomePostCard from '../components/user/HomePostCard';

const UserQuestionsPage = () => {
  const [otherUserName, setOtherUserName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const [searchParams] = useSearchParams();

  const token = localStorage.getItem('token')!;
  //使用者id
  const currentUserId = JSON.parse(localStorage.getItem('currentUser')!).id;
  const otherUserId = Number(searchParams.get('userId'));

  //取得其他使用者的名稱
  useEffect(() => {
    if (state.isOnOthersPage) {
      const getOtherUsersName = async () => {
        const data = await getOtherUsersInfo(token, otherUserId);
        setOtherUserName(data.name);
      };

      getOtherUsersName();
    } else return;
  }, [token, otherUserId, state]);

  //取得問題相關資料
  useEffect(() => {
    setIsLoading(true);
    let data;
    const getQuestionsData = async () => {
      switch (pathname) {
        case '/front/user/all_questions/': {
          if (state.isOnOthersPage) {
            data = await getUserAllQuestions(token, otherUserId);
          } else {
            data = await getUserAllQuestions(token, currentUserId);
          }
          setQuestions(data);
          setIsLoading(false);
          break;
        }
        case '/front/user/liked_questions/': {
          if (state.isOnOthersPage) {
            data = await getUserLikedQuestions(token, otherUserId);
          } else {
            data = await getUserLikedQuestions(token, currentUserId);
          }
          setQuestions(data.map((item: any) => item.Question));
          setIsLoading(false);
          break;
        }
        case '/front/user/replied_questions/': {
          if (state.isOnOthersPage) {
            data = await getUserAllReplies(token, otherUserId);
          } else {
            data = await getUserAllReplies(token, currentUserId);
          }
          const set = new Set()
          setQuestions(data.filter((item: any) => !set.has(item.questionId) ? set.add(item.questionId) : false).map((item: any) => item.Question));
          setIsLoading(false);
          break;
        }
        default: {
          setIsLoading(false);
          break;
        }
      }
    }

    getQuestionsData();
  }, [pathname, state.isOnOthersPage, currentUserId, otherUserId, token])

  return (
    <Box w={'100%'}>
      <Flex align={'baseline'} gap={3}>
        <GoBackIcon onClick={() => navigate(-1)} />
        <Heading as={'h1'} size={'lg'} color={'brand.500'} mb={5}>
          {pathname === '/front/user/all_questions/' &&
            (state.isOnOthersPage ? otherUserName : '你') + ' 的所有提問'}
          {pathname === '/front/user/liked_questions/' &&
            (state.isOnOthersPage ? otherUserName : '你') + ' 收藏的提問'}
          {pathname === '/front/user/replied_questions/' &&
            (state.isOnOthersPage ? otherUserName : '你') + ' 回答過的提問'}
        </Heading>
      </Flex>
      <Flex
        position={'relative'}
        pb={5}
        mt={2}
        px={5}
        mr={-3}
        left={-4}
        h={'73vh'}
        direction={'column'}
        rowGap={5}
        overflowY={'scroll'}
        sx={{
          '::-webkit-scrollbar': {
            width: '6px',
            'background-color': 'transparent',
          },
          '::-webkit-scrollbar-thumb': {
            width: '6px',
            border: 'none',
            'border-radius': '3px',
            'background-color': 'var(--chakra-colors-brand-300)',
          },
        }}
      >
        {/* map所有問題的卡片 */}
        {
          questions.map((q: any) =>
            isLoading ? (
              <Box key={q.id} padding="6" boxShadow="lg" bg="white">
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="2"
                />
              </Box>
            ) : (
              <HomePostCard
                key={q.id}
                id={q.id}
                userId={q.User.id}
                avatar={q.User.avatar}
                userName={q.User.name}
                account={q.User.account}
                identity={q.User.role}
                category={q.grade + q.subject}
                title={q.title}
                image={''}
                content={q.description}
                createdAt={q.createdAt}
                likedCount={q.likeCount}
                isLiked={q.isLiked}
              />
            ),
          )
        }
      </Flex>
    </Box>
  );
};

export default UserQuestionsPage;
