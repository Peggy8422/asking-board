//工具
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { userGetAllQuestions } from '../api/questionRelated';
//元件
import { Box, Flex, Heading, SkeletonText } from '@chakra-ui/react';
import { GoBackIcon } from '../assets/icons';
import HomePostCard from '../components/user/HomePostCard';

const SearchResultPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const token = localStorage.getItem('token')!;

  useEffect(() => {
    setIsLoading(true);
    const getSearchResults = async () => {
      const data = await userGetAllQuestions(token, state.grade, '', state.keyword);
      setSearchResults(data);
      setIsLoading(false);
    }

    getSearchResults();
  }, [token, state.grade, state.keyword]);

  return (
    <Box w={'100%'}>
      <Flex align={'baseline'} gap={3}>
        <GoBackIcon onClick={() => navigate(-1)} />
        <Heading as={'h1'} size={'lg'} color={'brand.500'} mb={5}>
          你的搜尋結果如下：
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
        {
          searchResults.length === 0 ?
          <Heading
            color={'brand.300'}
            size={'lg'}
          >無相關搜尋結果</Heading>
          :
          searchResults.map((q: any) =>
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
                image={q.Image}
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
  )
};

export default SearchResultPage;
