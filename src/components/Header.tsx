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
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  IconButton
} from '@chakra-ui/react';
import { Logo } from '../assets/images';
import { SearchIcon, FilterIcon, BellIcon } from '../assets/icons';

const SearchFilterMenu = () => {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<FilterIcon />}
        variant='ghost'
        borderRadius={'xl'}
      />
      <MenuList>
        <MenuOptionGroup defaultValue={'all'} title={'搜尋範圍'} type={'radio'}>
          <MenuItemOption value={'all'}>全部</MenuItemOption>
          <MenuItemOption value={'juniorHigh'}>國中</MenuItemOption>
          <MenuItemOption value={'other'}>其他</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

const Header = () => {
  return (
    <Box 
      position={'fixed'}
      width={'100%'}
      boxShadow={'md'}
      bg={'white'} 
      zIndex={2}
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
            children={<SearchFilterMenu />}
          />
        </InputGroup>
        <Flex align={'center'} gap={3}>
          <BellIcon />
          <Avatar name={'user name'} src={''} cursor={'pointer'} />
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;


