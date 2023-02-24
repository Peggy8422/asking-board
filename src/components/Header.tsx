import React from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Flex,
  Avatar 
} from '@chakra-ui/react';
import { Logo } from '../assets/images';
import { SearchIcon, FilterIcon, BellIcon } from '../assets/icons';

const Header = () => {
  return (
    <Box 
      width={'100%'}
      boxShadow={'md'}
      bg={'white'} 
    >
      <Container maxW={'container.xl'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Flex align={'center'} gap={2}>
          <Logo width={'40px'} />
          <Heading 
            as={'h5'}
            size={'lg'}
            color={'brand.500'}
          >Asking Board</Heading>
        </Flex>
        <InputGroup width={'50%'}>
          <InputLeftElement
            ml={'5px'}
            pointerEvents={'none'}
            children={<SearchIcon />}
          />
          <Input 
            type={'text'} 
            placeholder={'請輸入關鍵字'} 
            borderRadius={'20px'}
            bg={'gray.50'}
          />
          <InputRightElement
            cursor={'pointer'}
            mr={'5px'}
            children={<FilterIcon />}
          />
        </InputGroup>
        <Flex align={'center'} gap={3}>
          <BellIcon />
          <Avatar name={'user name'} />
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;


