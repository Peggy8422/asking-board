//工具
import React, { useState, useEffect} from 'react';
import { getHotIssues } from '../api/questionRelated';

//元件
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  ButtonGroup,
  SkeletonText,
} from '@chakra-ui/react';

//card元件
import HomePostCard from '../components/user/HomePostCard';

const HotIssuePage = () => {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [questionsData, setQuestionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem('token')!;

  useEffect(() => {
    setIsLoading(true);
    const getQuestions = async () => {
      const data = await getHotIssues(token);
      setQuestionsData(data);
      setIsLoading(false);
    };
    getQuestions();
  }, [token]);

  return (
    <Box w={'100%'}>
      <Flex align={'start'} justify={'space-between'} bg={'white'}>
        <Heading as={'h1'} size={'lg'} color={'brand.500'} mb={5}>
          熱門問題：<Text display={'inline-block'} fontSize={{base: 'md', md: '2xl'}}>{activeCategory}</Text>
        </Heading>
        <ButtonGroup
          size="sm"
          isAttached
          variant="outline"
          color={'brand.gray_1'}
          colorScheme={'gray'}
        >
          {['全部', '國中', '其他'].map((item, index) => {
            return (
              <Button
                mx={'1px'}
                key={index}
                color={activeCategory === item ? 'brand.500' : 'brand.gray_1'}
                colorScheme={activeCategory === item ? 'green' : 'gray'}
                onClick={async () => {
                  setIsLoading(true);
                  setActiveCategory(item);
                  if (item === '全部') {
                    const data = await getHotIssues(token);
                    setQuestionsData(data);
                  } else {
                    const data = await getHotIssues(token, item);
                    setQuestionsData(data);
                  }
                  setIsLoading(false);
                }}
              >
                {item}
              </Button>
            );
          })}
        </ButtonGroup>
      </Flex>
      <Flex
        position={'relative'}
        pb={5}
        mt={2}
        px={{base: 2, md: 5}}
        mr={{base: 0, md: -3}}
        left={{base: 0 ,md: -4}}
        h={'63vh'}
        direction={'column'}
        rowGap={5}
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
        {/* map所有問題的卡片 */}

        {questionsData.map((q: any) =>
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
              image={q.image}
              content={q.description}
              createdAt={q.createdAt}
              likedCount={q.likeCount}
              isLiked={q.isLiked}
            />
          )
        )}
      </Flex>
    </Box>
  );
};

export default HotIssuePage;
