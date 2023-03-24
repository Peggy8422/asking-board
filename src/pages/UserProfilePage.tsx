//工具
import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getCurrentUserInfo, getOtherUsersInfo } from '../api/userRelated';

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
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import { RightArrowIcon, EditIcon } from '../assets/icons';
//card元件
import LatestPostCard from '../components/user/LatestPostCard';
import EditProfileModal from '../components/user/EditProfileModal';

//test words
const introTest = '';

const initUserInfo = {
  id: 0,
  name: '',
  role: '',
  avatar: '',
  introduction: '',
  questionCount: 0,
  replyCount: 0,
  questionLikedCount: 0,
  replyLikedCount: 0,
  followerCount: 0,
  followingCount: 0,
  account: '',
};

const UserProfilePage = () => {
  const [userInfo, setUserInfo] = useState(initUserInfo);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchParams] = useSearchParams();
  let location = useLocation();
  console.log(location.pathname)

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
      }
    };

    getUserInfo();
  }, [token, location.pathname, currentUserId, otherUserId]);

  return (
    <Box w={'100%'}>
      {/* 封面照 */}
      <Image
        m={-5}
        mt={-8}
        w={'108%'}
        maxW={'unset'}
        h={'30vh'}
        src={'https://picsum.photos/2000/800'}
        objectFit={'cover'}
      />
      <Flex
        position={'relative'}
        align={'end'}
        gap={3}
        transform={'translateY(-35%)'}
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
          {userInfo?.followerCount || 0}個追蹤者 | {userInfo?.followingCount || 0}個追蹤中
        </Badge>
      </Flex>
      <Text m={3} mt={-3}>
        {userInfo?.introduction || ''}
      </Text>
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
          currentUserAvatar={userInfo?.avatar || ''}
          currentUserCover={'123'}
          currentUserName={userInfo?.name || ''}
          currentUserIntro={userInfo?.introduction || ''}
        />
      </Flex>

      <Divider mt={3} borderColor={'brand.300'} />
      <Box
        position={'relative'}
        h={'31vh'}
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
            <LatestPostCard
              id={0}
              avatar="123"
              userName="莊珮琪"
              account="peggy_test"
              identity="學生"
              category="國中一年級數學"
              title="關於XXXXX解法?......擠到第二行會變怎樣"
              createdAt="5秒前"
            />
            <LatestPostCard
              id={0}
              avatar="123"
              userName="莊珮琪"
              account="peggy_test"
              identity="學生"
              category="國中一年級數學"
              title="關於XXXXX解法?......擠到第二行會變怎樣"
              createdAt="5秒前"
            />
            <LatestPostCard
              id={0}
              avatar="123"
              userName="莊珮琪"
              account="peggy_test"
              identity="學生"
              category="國中一年級數學"
              title="關於XXXXX解法?......擠到第二行會變怎樣"
              createdAt="5秒前"
            />
          </Flex>
        </Box>
        {/* 區塊2：收藏的提問 */}
        <Box mb={6}>
          <Flex align={'center'} justify={'space-between'}>
            <Heading as={'h3'} size={'md'} color={'brand.500'}>
              收藏的提問：{3}則
            </Heading>
            <Button
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
            <LatestPostCard
              id={0}
              avatar="123"
              userName="莊珮琪"
              account="peggy_test"
              identity="學生"
              category="國中一年級數學"
              title="關於XXXXX解法?......擠到第二行會變怎樣"
              createdAt="5秒前"
            />
            <LatestPostCard
              id={0}
              avatar="123"
              userName="莊珮琪"
              account="peggy_test"
              identity="學生"
              category="國中一年級數學"
              title="關於XXXXX解法?......擠到第二行會變怎樣"
              createdAt="5秒前"
            />
            <LatestPostCard
              id={0}
              avatar="123"
              userName="莊珮琪"
              account="peggy_test"
              identity="學生"
              category="國中一年級數學"
              title="關於XXXXX解法?......擠到第二行會變怎樣"
              createdAt="5秒前"
            />
          </Flex>
        </Box>
        {/* 區塊3：回答過的提問 */}
        <Box mb={6}>
          <Flex align={'center'} justify={'space-between'}>
            <Heading as={'h3'} size={'md'} color={'brand.500'}>
              回答過的提問：{4}則
            </Heading>
            <Button
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
            <LatestPostCard
              id={0}
              avatar="123"
              userName="莊珮琪"
              account="peggy_test"
              identity="學生"
              category="國中一年級數學"
              title="關於XXXXX解法?......擠到第二行會變怎樣"
              createdAt="5秒前"
            />
            <LatestPostCard
              id={0}
              avatar="123"
              userName="莊珮琪"
              account="peggy_test"
              identity="學生"
              category="國中一年級數學"
              title="關於XXXXX解法?......擠到第二行會變怎樣"
              createdAt="5秒前"
            />
            <LatestPostCard
              id={0}
              avatar="123"
              userName="莊珮琪"
              account="peggy_test"
              identity="學生"
              category="國中一年級數學"
              title="關於XXXXX解法?......擠到第二行會變怎樣"
              createdAt="5秒前"
            />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfilePage;
