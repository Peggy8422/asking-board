//工具
import React, { useState, useEffect } from 'react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { userGetAllQuestions } from '../api/questionRelated';

//元件
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

interface SearchProps {
  isDisabled: boolean;
  filterOption: string | string[];
  setFilterOption: React.Dispatch<React.SetStateAction<string | string[]>>;
}
const SearchFilterMenu: React.FC<SearchProps> = ({isDisabled, filterOption, setFilterOption}) => {

  return (
    <Menu closeOnSelect={true} >
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<FilterIcon />}
        variant='ghost'
        borderRadius={'xl'}
        disabled={isDisabled}
      />
      {!isDisabled && <MenuList>
        <MenuOptionGroup value={filterOption} title={'搜尋範圍'} type={'radio'} onChange={(value) => {setFilterOption(value);}}>
          <MenuItemOption value={''}>全部</MenuItemOption>
          <MenuItemOption value={'國中'}>國中</MenuItemOption>
          <MenuItemOption value={'其他'}>其他</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>}
    </Menu>
  );
};

interface HeaderProps {
  isAdmin: boolean;
}

const Header: React.FC<HeaderProps> = ({isAdmin}) => {
  const { user, isAvatarChanged } = useSelector((state: any) => state.auth);
  const [userAvatar, setUserAvatar] = useState(user.avatar);
  const [filterOption, setFilterOption] = useState<string | string[]>('');
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  //提交搜尋關鍵字
  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate('/front/search_results', {
        state: {
          grade: filterOption,
          keyword,
        }
      });
    } else return;
  }
  
  useEffect(() => {
    if (isAvatarChanged) {
      const currentAvatar = JSON.parse(localStorage.getItem('currentUser')!).avatar;
      setUserAvatar(currentAvatar);
    }
  }, [user.avatar, isAvatarChanged])

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
          <Input isDisabled={isAdmin}
            type={'text'} 
            placeholder={'請輸入關鍵字'} 
            borderRadius={'20px'}
            bg={'gray.50'}
            value={keyword}
            onChange={(e) => {setKeyword(e.target.value);}}
            // keyDown事件
            onKeyDown={handleEnterKeyDown}
          />
          <InputRightElement
            cursor={'pointer'}
            mr={'5px'}
            children={<SearchFilterMenu isDisabled={isAdmin} filterOption={filterOption} setFilterOption={setFilterOption} />}
          />
        </InputGroup>
        <Flex align={'center'} gap={3}>
          <BellIcon />
          <Avatar as={ReactLink} to={isAdmin ? '' : '/front/profile'} name={'user name'} src={userAvatar} cursor={isAdmin ? 'not-allowed' : 'pointer'}  />
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;


