//工具
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userGetAllQuestions } from '../api/questionRelated';
//元件
import { Box, Flex, Heading } from '@chakra-ui/react';
import { GoBackIcon } from '../assets/icons';
import HomePostCard from '../components/user/HomePostCard';

const SearchResultPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token')!;

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

      </Flex>
    </Box>
  )
};

export default SearchResultPage;
