//工具
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  getQuestionDetail,
  getQuestionReplies,
  postQuestionReply,
} from '../api/questionRelated';
import Swal from 'sweetalert2';

//元件
import {
  Box,
  Flex,
  Heading,
  Text,
  Tag,
  Avatar,
  Textarea,
  Button,
  Divider,
  SkeletonText,
} from '@chakra-ui/react';
import {
  GoBackIcon,
  HeartIcon,
  HeartOutlineIcon,
  CommentIcon,
} from '../assets/icons';

//card元件
import ReplyCard from '../components/user/ReplyCard';

const initQuestionData = {
  id: 0,
  title: '',
  description: '',
  isAnonymous: false,
  grade: '',
  subject: '',
  createdAt: '',
  replyCount: 0,
  likeCount: 0,
  isLiked: 0,
  User: {
    id: 0,
    name: '',
    avatar: '',
    role: '',
    account: '',
  },
  Images: [],
};

const ReplyPage = () => {
  const [questionData, setQuestionData] = useState(initQuestionData);
  const [repliesData, setRepliesData] = useState([]);
  const [reply, setReply] = useState({
    comment: '',
    images: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const questionId = Number(searchParams.get('reply_to'));

  const token = localStorage.getItem('token')!;

  const handleReplyPosted = async () => {
    const status = await postQuestionReply(token, questionId, reply);
    console.log(status);
    if (status === 'success') {
      Swal.fire({
        position: 'top',
        title: '成功送出回答',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });
      setReply({
        comment: '',
        images: [],
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    console.log(questionId);
    const getQuestion = async () => {
      const data = await getQuestionDetail(token, questionId);
      const replies = await getQuestionReplies(token, questionId);
      setQuestionData(data);
      setRepliesData(replies);
      setIsLoading(false);
    };
    if (!token) return;
    getQuestion();
  }, [token, questionId]);

  return (
    <Box w={'100%'}>
      {/* 標頭資訊們 */}
      <Box bg={'white'}>
        <Flex align={'start'} justify={'space-between'}>
          <Flex align={'baseline'} gap={3}>
            <GoBackIcon onClick={() => navigate(-1)} />
            <Heading as={'h1'} size={'lg'} color={'brand.500'} mb={5}>
              {questionData.title}
            </Heading>
            <Tag
              size={'md'}
              variant={'outline'}
              color={'brand.500'}
              colorScheme={'green'}
              bg={'white'}
              borderColor={'brand.400'}
            >
              {questionData.grade + questionData.subject}
            </Tag>
          </Flex>
          <Flex align={'center'} gap={2}>
            <Text color={'brand.gray_3'}>{questionData.likeCount}個收藏</Text>
            {questionData.isLiked ? (
              <HeartIcon fill="#FF4752" />
            ) : (
              <HeartOutlineIcon width={'30px'} />
            )}
          </Flex>
        </Flex>
        <Flex align={'start'} justify={'space-between'}>
          <Flex gap={2}>
            <Text color={'brand.500'} fontSize={'lg'} fontWeight={'bold'}>
              提問者：
            </Text>
            <Link to={questionData.User.name === '匿名' ? `/front/reply/?reply_to=${questionId}` : `/front/profile_others/?userId=${questionData.User.id}`} >
              <Avatar
                name={questionData.User.name}
                src={questionData.User.avatar}
              />
            </Link>
            <Box>
              <Flex align={'start'} gap={2}>
                <Text
                  color={'brand.500'}
                  fontWeight={'semibold'}
                  overflow={'hidden'}
                  whiteSpace={'nowrap'}
                  textOverflow={'ellipsis'}
                >
                  {questionData.User.name}
                </Text>
                <Tag
                  size={'sm'}
                  borderRadius={'full'}
                  bg={
                    questionData.User.role === '學生'
                      ? 'brand.400'
                      : 'brand.500'
                  }
                  color={'white'}
                >
                  {questionData.User.role}
                </Tag>
              </Flex>
              <Text
                fontSize={'sm'}
                fontWeight={'medium'}
                color={'brand.gray_3'}
              >
                @{questionData.User.account}
              </Text>
            </Box>
          </Flex>
          <Text color={'brand.500'}>發佈於：{questionData.createdAt}</Text>
        </Flex>
      </Box>
      {isLoading ? (
        <SkeletonText mt="4" noOfLines={15} spacing="5" skeletonHeight="3" />
      ) : (
        <Box
          position={'relative'}
          pb={5}
          mt={2}
          mx={-5}
          h={'70vh'}
          overflowY={'scroll'}
          overflowX={'hidden'}
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
          <Text mx={5} mt={5}>
            {questionData.description}
          </Text>
          <Flex mt={5} py={2} pl={2} bg={'brand.gray_2'} align={'center'}>
            <CommentIcon fill="#707070" />
            <Text color={'brand.gray_3'} fontWeight={'semibold'}>
              所有回答：{questionData.replyCount}
            </Text>
          </Flex>
          {/* 回答的Form */}
          <Box>
            <Heading as={'h5'} size={'md'} mx={5} my={3} color={'brand.500'}>
              我要回答：
            </Heading>
            <Textarea
              w={'95%'}
              mx={5}
              bg={'brand.gray_2'}
              placeholder="我的看法是..."
              size={'lg'}
              border={'none'}
              resize={'none'}
              rows={10}
              borderRadius={'xl'}
              value={reply.comment}
              onChange={(e) => setReply({ ...reply, comment: e.target.value })}
            />
            <Flex p={2} pr={5} justify={'end'}>
              <Button
                size={'sm'}
                bg={'brand.500'}
                colorScheme={'green'}
                onClick={handleReplyPosted}
              >
                回覆
              </Button>
            </Flex>
          </Box>
          <Divider />
          {/* map問題的回答 */}
          {repliesData.map((r: any) => (
            <ReplyCard
              key={r.id}
              avatar={r.User.avatar}
              userName={r.User.name}
              account={r.User.account}
              identity={r.User.role}
              content={r.comment}
              createdAt={r.createdAt}
              likedCount={r.likeCount}
              isLiked={r.isLiked}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ReplyPage;
