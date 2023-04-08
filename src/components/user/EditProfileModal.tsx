//工具
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleAvatarChanged } from '../../features/auth/authSlice';
import { getUserProfile, putUserProfile, ProfileFormData } from '../../api/userRelated';
import Swal from 'sweetalert2';

//元件
import {
  Box,
  Button,
  IconButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Avatar,
  Text,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { EditIcon, CameraIcon } from '../../assets/icons';

interface PopoverProps {
  photoType: string;
  setTempAvatar: React.Dispatch<React.SetStateAction<string>>;
  setAvatar: React.Dispatch<React.SetStateAction<string | File | undefined>>;
}
const ChangePhotoPopover: React.FC<PopoverProps> = (props) => {
  //上傳頭貼照片
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const file = e.target.files![0];
    const fileMaxSize = 1024;
    const fileSize = file.size / fileMaxSize;

    //限制檔案大小
    if (fileSize > fileMaxSize) {
      Swal.fire({
        position: 'top',
        title: '檔案大小勿超過1M！',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
      return;
    }

    //檔案讀取完成時就調用onload
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        props.setTempAvatar(fileReader.result as string);
        console.log('完成預覽頭貼設定')
      } else {
        console.log('失敗!')
      };
    };
    //當onload時取出照片的base64資料，會生成一個暫時的URL可以預覽圖片
    fileReader.readAsDataURL(file);
    if (file) {
      props.setAvatar(file);
    } else {
      props.setAvatar('noChange');
    }
    
  };

  return (
    <PopoverContent width={'fit-content'}>
      <PopoverArrow />
      <PopoverHeader border={'none'} mb={2}></PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
        <Button
          size={'sm'}
          variant={'outline'}
          colorScheme={'green'}
          onClick={() => {
            props.setTempAvatar('https://i.imgur.com/NCBjuk5.png');
            props.setAvatar('');
          }}
        >
          使用系統預設
        </Button>
        <Button
          ml={5}
          size={'sm'}
          colorScheme={'green'}
          as={'label'}
          cursor={'pointer'}
          htmlFor={`change-${props.photoType}`}
        >
          上傳照片
          <Input
            type={'file'}
            id={`change-${props.photoType}`}
            display={'none'}
            onChange={handleAvatarUpload}
          />
        </Button>
      </PopoverBody>
    </PopoverContent>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserAvatar: string;
  currentUserName: string;
  currentUserIntro: string;
}

const EditProfileModal: React.FC<ModalProps> = (props) => {
  const [avatar, setAvatar] = useState<string | File>();
  const [userInfo, setUserInfo] = useState<ProfileFormData>({
    avatar: '',
    name: props.currentUserName,
    introduction: props.currentUserIntro,
  });
  //上傳後預覽的頭貼
  const [tempAvatar, setTempAvatar] = useState(props.currentUserAvatar);

  const dispatch = useDispatch();

  const token = localStorage.getItem('token')!;
  const currentUser = JSON.parse(localStorage.getItem('currentUser')!);

  //儲存修改
  const handleChangeOnSave = async () => {
    const data = await putUserProfile(token, { ...userInfo, avatar: avatar! });
    if (data.status === 'success') {
      Swal.fire({
        position: 'top',
        title: '設定成功！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });
      localStorage.setItem('currentUser', JSON.stringify({...currentUser, avatar: data.user.avatar}));
      dispatch(toggleAvatarChanged());    
    } else return;
    props.onClose();
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const userData = await getUserProfile(token);
      setUserInfo({
        avatar: userData.avatar,
        name: userData.name,
        introduction: userData.introduction
      });
      setTempAvatar(userData.avatar);
    }
    if (props.isOpen) {
      getUserInfo();
    } else return;
  }, [token, props.isOpen])

  return (
    <Modal
      size={{base: 'full', md: '3xl'}}
      closeOnOverlayClick={false}
      scrollBehavior={'inside'}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent>
        <ModalHeader
          pb={2}
          display={'flex'}
          alignItems={'center'}
          color={'brand.500'}
          borderBottom={'1px'}
          borderBottomColor={'brand.gray_1'}
        >
          <EditIcon fill={'#137547'} width={'30px'} />
          編輯個人資料
        </ModalHeader>
        <ModalCloseButton color={'brand.gray_3'} onClick={() => {
          setUserInfo({...userInfo, name: props.currentUserName, introduction: props.currentUserIntro});
          setTempAvatar(props.currentUserAvatar);
        }} />
        {/* 頭貼 */}
        <Box w={'150px'} position={'relative'} m={6}>
          <Avatar
            size={'2xl'}
            border={'4px'}
            color={'white'}
            src={tempAvatar}
          />
          <Popover>
            <PopoverTrigger>
              <IconButton
                aria-label="Change avavtar"
                icon={<CameraIcon fill={'white'} />}
                position={'absolute'}
                bottom={1}
                right={4}
                borderRadius={'full'}
                bg={'brand.gray_3'}
                colorScheme={'green'}
              />
            </PopoverTrigger>
            <ChangePhotoPopover
              photoType="avatar"
              setTempAvatar={setTempAvatar}
              setAvatar={setAvatar}
            />
          </Popover>
        </Box>
        <ModalBody zIndex={-1}>
          <FormControl
            display={'flex'}
            alignItems={'baseline'}
            isInvalid={userInfo.name.length > 20 || userInfo.name.length === 0}
          >
            {/* 暱稱 */}
            <FormLabel
              w={'60px'}
              m={0}
              p={0}
              color={'brand.500'}
              fontSize={'md'}
              fontWeight={'semibold'}
            >
              暱稱：
            </FormLabel>
            <Box w={'100%'}>
              <Input
                type={'text'}
                borderBottomWidth={'2px'}
                borderBottomColor={'brand.500'}
                variant={'flushed'}
                // defaultValue={props.currentUserName}
                value={userInfo.name}
                placeholder={'請輸入你的暱稱...'}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, name: e.target.value });
                }}
              />
              <FormErrorMessage>
                {userInfo.name.length === 0
                  ? '暱稱不可空白!'
                  : '暱稱不可超過20字!'}
              </FormErrorMessage>
            </Box>
            <FormHelperText position={'absolute'} right={0} fontSize={'xs'}>
              {userInfo.name.length}/20
            </FormHelperText>
          </FormControl>
          <FormControl mt={5}>
            <Text color={'brand.500'} fontSize={'md'} fontWeight={'semibold'}>
              自我介紹：
            </Text>
            <Textarea
              value={userInfo.introduction}
              placeholder="關於我..."
              size={'lg'}
              border={'none'}
              resize={'none'}
              rows={10}
              borderRadius={0}
              borderBottom={'2px'}
              borderBottomColor={'brand.500'}
              onChange={(e) => {
                setUserInfo({ ...userInfo, introduction: e.target.value });
              }}
            />
            <FormErrorMessage>自我介紹不可超過150字!</FormErrorMessage>
            <FormHelperText position={'absolute'} right={0} fontSize={'xs'}>
              {userInfo.introduction.length}/150
            </FormHelperText>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            size={'sm'}
            bg={'brand.500'}
            colorScheme={'green'}
            mr={3}
            onClick={handleChangeOnSave}
          >
            儲存
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProfileModal;
