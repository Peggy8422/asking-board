//工具
import React, { useEffect, useState } from 'react';
import {
  Link as ReactLink,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import {
  getOtherUsersInfo,
  getUserAllQuestions,
  getUserLikedQuestions,
  getUserAllReplies,
} from '../api/userRelated';

//元件
import {
  Box,
  Heading,
  Text,
  Tag,
  Badge,
  Button,
  Flex,
  Avatar,
  Divider,
  useDisclosure,
} from '@chakra-ui/react';
import { RightArrowIcon, EditIcon } from '../assets/icons';
//card元件
import LatestPostCard from '../components/user/LatestPostCard';
import EditProfileModal from '../components/user/EditProfileModal';

const initUserInfo = {
  id: 0,
  name: '',
  role: '',
  avatar: '',
  introduction: '',
  questionCount: 0,
  replyCount: 0,
  likeQuestionCount: 0,
  followerCount: 0,
  followingCount: 0,
  account: '',
};

interface ProfileProps {
  isOnOthersPage: boolean;
}

const UserProfilePage: React.FC<ProfileProps> = ({ isOnOthersPage }) => {
  const [userInfo, setUserInfo] = useState(initUserInfo);
  //使用者的問題相關資料
  const [userAllQs, setUserAllQs] = useState([]);
  const [userLikedQs, setUserLikedQs] = useState([]);
  const [userRepliedQs, setUserRepliedQs] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchParams] = useSearchParams();
  let location = useLocation();

  const token = localStorage.getItem('token')!;
  //使用者id
  const currentUserId = JSON.parse(localStorage.getItem('currentUser')!).id;
  const otherUserId = Number(searchParams.get('userId'));

  useEffect(() => {
    let data;
    const getUserInfo = async () => {
      if (location.pathname === '/front/profile') {
        data = await getOtherUsersInfo(token, currentUserId);
        setUserInfo(data);
      } else if (location.pathname === '/front/profile_others/') {
        data = await getOtherUsersInfo(token, otherUserId);
        setUserInfo(data);
      } else return;
    };

    getUserInfo();
  }, [token, location.pathname, currentUserId, otherUserId, isOpen]);

  //下半部資料
  useEffect(() => {
    let dataOne, dataTwo, dataThree;
    const getUserQsRelated = async () => {
      if (location.pathname === '/front/profile') {
        dataOne = await getUserAllQuestions(token, currentUserId);
        dataTwo = await getUserLikedQuestions(token, currentUserId);
        dataThree = await getUserAllReplies(token, currentUserId);
      } else if (location.pathname === '/front/profile_others/') {
        dataOne = await getUserAllQuestions(token, otherUserId);
        dataTwo = await getUserLikedQuestions(token, otherUserId);
        dataThree = await getUserAllReplies(token, otherUserId);
      } else return;
      setUserAllQs(dataOne.slice(0, 3));
      setUserLikedQs(dataTwo.map((item: any) => item.Question).slice(0, 3));
      const set = new Set();
      setUserRepliedQs(
        dataThree
          .filter((item: any) =>
            !set.has(item.questionId) ? set.add(item.questionId) : false,
          )
          .map((item: any) => item.Question)
          .slice(0, 3),
      );
    };

    getUserQsRelated();
  }, [token, location.pathname, currentUserId, otherUserId]);

  return (
    <Box w={'100%'}>
      <Flex
        position={'relative'}
        align={'end'}
        gap={3}
      >
        {/* 個人大頭貼 */}
        <Avatar
          size={'2xl'}
          name={'Temp'}
          src={userInfo?.avatar || ''}
          border={'4px'}
          color={'white'}
        />
        <Box>
          <Flex align={'center'} gap={2}>
            <Heading as={'h2'} size={'lg'} color={'brand.500'}>
              {userInfo?.name || ''}
            </Heading>
            <Tag
              size={'md'}
              borderRadius={'full'}
              bg={'brand.400'}
              color={'white'}
            >
              {userInfo?.role || ''}
            </Tag>
          </Flex>
          <Text color={'brand.gray_3'}>@{userInfo?.account || ''}</Text>
        </Box>
        <Badge
          position={'absolute'}
          right={0}
          fontSize={'md'}
          bg={'transparent'}
          color={'brand.500'}
        >
          <ReactLink
            to={`/front/user/follow/?userId=${otherUserId}`}
            state={{ isOnOthersPage, active: '追蹤者', userName: userInfo.name }}
          >
            {userInfo?.followerCount || 0}個追蹤者
          </ReactLink>
          {' '}|{' '}
          <ReactLink
            to={`/front/user/follow/?userId=${otherUserId}`}
            state={{ isOnOthersPage, active: '追蹤中', userName: userInfo.name }}
          >
            {userInfo?.followingCount || 0}個追蹤中
          </ReactLink>
        </Badge>
      </Flex>
      <Text m={3}>
        {userInfo?.introduction || ''}
      </Text>
      {!isOnOthersPage && (
        <Flex justify={'end'}>
          <Button
            size={'sm'}
            leftIcon={<EditIcon />}
            bg={'brand.400'}
            colorScheme={'green'}
            onClick={onOpen}
          >
            編輯個人資料
          </Button>
          <EditProfileModal
            isOpen={isOpen}
            onClose={onClose}
            currentUserAvatar={userInfo.avatar}
            currentUserName={userInfo.name}
            currentUserIntro={userInfo.introduction}
          />
        </Flex>
      )}

      <Divider mt={3} borderColor={'brand.300'} />
      <Box
        position={'relative'}
        h={isOnOthersPage ? '56vh' : '50vh'}
        pb={5}
        mt={3}
        px={3}
        mr={-3}
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
        {/* 區塊1：所有提問 */}
        <Box mb={6}>
          <Flex align={'center'} justify={'space-between'}>
            <Heading as={'h3'} size={'md'} color={'brand.500'}>
              所有提問：{userInfo?.questionCount || 0}則
            </Heading>
            <Button
              as={ReactLink}
              to={`/front/user/all_questions/?userId=${otherUserId}`}
              state={{ isOnOthersPage }}
              size={'lg'}
              rightIcon={<RightArrowIcon />}
              variant={'ghost'}
              colorScheme={'green'}
              color={'brand.500'}
            >
              查看更多
            </Button>
          </Flex>
          <Flex gap={2}>
            {/* 排版用 */}
            {userAllQs.map((q: any) => (
              <LatestPostCard
                key={q.id}
                id={q.id}
                avatar={q.User.avatar}
                userName={q.User.name}
                account={q.User.account}
                identity={q.User.role}
                category={q.grade + q.subject}
                title={q.title}
                createdAt={q.createdAt}
              />
            ))}
          </Flex>
        </Box>
        {/* 區塊2：收藏的提問 */}
        <Box mb={6}>
          <Flex align={'center'} justify={'space-between'}>
            <Heading as={'h3'} size={'md'} color={'brand.500'}>
              收藏的提問：{userInfo?.likeQuestionCount}則
            </Heading>
            <Button
              as={ReactLink}
              to={`/front/user/liked_questions/?userId=${otherUserId}`}
              state={{ isOnOthersPage }}
              size={'lg'}
              rightIcon={<RightArrowIcon />}
              variant={'ghost'}
              colorScheme={'green'}
              color={'brand.500'}
            >
              查看更多
            </Button>
          </Flex>
          <Flex gap={2}>
            {/* 排版用 */}
            {userLikedQs.map((q: any) => (
              <LatestPostCard
                key={q.id}
                id={q.id}
                avatar={q.User.avatar}
                userName={q.User.name}
                account={q.User.account}
                identity={q.User.role}
                category={q.grade + q.subject}
                title={q.title}
                createdAt={q.createdAt}
              />
            ))}
          </Flex>
        </Box>
        {/* 區塊3：回答過的提問 */}
        <Box mb={6}>
          <Flex align={'center'} justify={'space-between'}>
            <Heading as={'h3'} size={'md'} color={'brand.500'}>
              回答過的提問：{userInfo?.replyCount}則
            </Heading>
            <Button
              as={ReactLink}
              to={`/front/user/replied_questions/?userId=${otherUserId}`}
              state={{ isOnOthersPage }}
              size={'lg'}
              rightIcon={<RightArrowIcon />}
              variant={'ghost'}
              colorScheme={'green'}
              color={'brand.500'}
            >
              查看更多
            </Button>
          </Flex>
          <Flex gap={2}>
            {/* 排版用 */}
            {userRepliedQs.map((q: any) => (
              <LatestPostCard
                key={q.id}
                id={q.id}
                avatar={q.User.avatar}
                userName={q.User.name}
                account={q.User.account}
                identity={q.User.role}
                category={q.grade + q.subject}
                title={q.title}
                createdAt={q.createdAt}
              />
            ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfilePage;
