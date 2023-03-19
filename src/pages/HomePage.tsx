//工具
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userGetAllQuestions } from '../api/questionRelated';

//元件
import {
  Box,
  Flex,
  Heading,
  Button,
  ButtonGroup,
  Select,
  SkeletonText,
} from '@chakra-ui/react';
import JuniorSubjectTabs from '../components/user/JuniorSubjectTabs';

//card元件
import HomePostCard from '../components/user/HomePostCard';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [activeSubjectTab, setActiveSubjectTab] = useState('全部');
  const [activeGrade, setActiveGrade] = useState('國中全年級');
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]); //科目有選擇時要用filter改
  const navigate = useNavigate();

  const token = localStorage.getItem('token')!;

  useEffect(() => {
    setIsLoading(true);
    const getAllQuestions = async () => {
      const data = await userGetAllQuestions(token);
      setQuestions(data);
      setIsLoading(false);
    };
    if (!token) {
      navigate('/login');
    }

    getAllQuestions();
  }, [token, navigate]);

  const handleSubjectClicked = async (subject: string) => {
    setIsLoading(true);
    let data = await userGetAllQuestions(token, activeCategory, subject);
    if (activeGrade !== '國中全年級') {
      data = await userGetAllQuestions(token, activeGrade, subject);
    }
    if (subject === '') {
      setQuestions(data);
    } else {
      setQuestions(data.filter((q: any) => q.subject === subject));
    }
    setIsLoading(false);
  };

  return (
    <Box w={'100%'}>
      <Flex align={'start'} justify={'space-between'} bg={'white'}>
        <Box>
          <Heading as={'h1'} size={'lg'} color={'brand.500'} mb={5}>
            {activeCategory === '全部' && '所有問題'}
            {activeCategory === '國中' && '國中問題'}
            {activeCategory === '其他' && '其他問題'}
          </Heading>
          {activeCategory === '國中' && (
            <Select
              w={'unset'}
              size={'sm'}
              color={'brand.500'}
              borderColor={'brand.500'}
              borderRadius={'full'}
              display={'inline'}
              value={activeGrade}
              onChange={async (e) => {
                setIsLoading(true);
                let selectedOp = e.target.value; 
                if (selectedOp === '國中全年級') {
                  selectedOp = '國中';
                }
                setActiveGrade(selectedOp);
                let data = await userGetAllQuestions(token, selectedOp, activeSubjectTab);
                if (activeSubjectTab === '全部') {
                  data = await userGetAllQuestions(token, selectedOp);
                }
                setQuestions(data);
                setIsLoading(false);
              }}
            >
              <option value="國中全年級">國中全年級</option>
              <option value="國中一年級">國中一年級</option>
              <option value="國中二年級">國中二年級</option>
              <option value="國中三年級">國中三年級</option>
            </Select>
          )}
        </Box>
        {activeCategory === '國中' && (
          <JuniorSubjectTabs
            activeTab={activeSubjectTab}
            setActiveTab={setActiveSubjectTab}
            onSubjectClicked={handleSubjectClicked}
          />
        )}
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
                    const data = await userGetAllQuestions(token);
                    setQuestions(data);
                  } else if (item === '國中' && activeSubjectTab !== '全部') {
                    const data = await userGetAllQuestions(
                      token,
                      item,
                      activeSubjectTab,
                    );
                    setQuestions(data);
                  } else {
                    const data = await userGetAllQuestions(token, item);
                    setQuestions(data);
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
        px={5}
        mr={-3}
        left={-4}
        h={activeCategory === '國中' ? '65vh' : '73vh'}
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
          questions.length === 0 ?
          <Heading
            color={'brand.300'}
            size={'lg'}
          >目前尚無相關資料</Heading>
          :
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
                avatar={q.User.avatar}
                userName={q.User.name}
                account={q.User.account}
                identity={q.User.role}
                category={q.grade + q.subject}
                title={q.title}
                image={q.Images.url}
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

export default HomePage;
