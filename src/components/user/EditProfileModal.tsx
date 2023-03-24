import React from 'react';
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
  Image,
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
}
const ChangePhotoPopover: React.FC<PopoverProps> = (props) => {
  return (
    <PopoverContent width={'fit-content'}>
      <PopoverArrow />
      <PopoverHeader border={'none'} mb={2}></PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
        <Button size={'sm'} variant={'outline'} colorScheme={'green'}>
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
          />
        </Button>
      </PopoverBody>
    </PopoverContent>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserCover: string;
  currentUserAvatar: string;
  currentUserName: string;
  currentUserIntro: string;
}

const EditProfileModal: React.FC<ModalProps> = (props) => {
  return (
    <Modal
      size={'3xl'}
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
        <ModalCloseButton color={'brand.gray_3'} />
        {/* 封面照 */}
        <Image
          h={'35vh'}
          bg={'brand.gray_1'}
          src={props.currentUserCover}
          objectFit={'cover'}
        />
        <Popover>
          <PopoverTrigger>
            <Button
              size={'sm'}
              position={'absolute'}
              right={'10px'}
              top={'27vh'}
              leftIcon={<CameraIcon />}
              bg={'white'}
              color={'brand.400'}
            >
              編輯封面照
            </Button>
          </PopoverTrigger>
          <ChangePhotoPopover photoType='cover' />
        </Popover>
        {/* 頭貼 */}
        <Box
          w={'150px'}
          position={'relative'}
          ml={6}
          transform={'translateY(-50%)'}
        >
          <Avatar
            size={'2xl'}
            border={'4px'}
            color={'white'}
            src={props.currentUserAvatar}
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
            <ChangePhotoPopover photoType="avatar" />
          </Popover>
        </Box>
        <ModalBody mt={-10} zIndex={-1}>
          <FormControl display={'flex'} alignItems={'center'}>
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
            <Input
              type={'text'}
              borderBottomWidth={'2px'}
              borderBottomColor={'brand.500'}
              variant={'flushed'}
              value={props.currentUserName}
              placeholder={'請輸入你的暱稱...'}
            />
            <FormHelperText position={'absolute'} right={0} fontSize={'xs'}>
              0/50
            </FormHelperText>
          </FormControl>
          <Box mt={5}>
            <Text color={'brand.500'} fontSize={'md'} fontWeight={'semibold'}>
              自我介紹：
            </Text>
            <Textarea
              value={props.currentUserIntro}
              placeholder="關於我..."
              size={'lg'}
              border={'none'}
              resize={'none'}
              rows={10}
              borderRadius={0}
              borderBottom={'2px'}
              borderBottomColor={'brand.500'}
            />
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            size={'sm'}
            bg={'brand.500'}
            colorScheme={'green'}
            mr={3}
            onClick={props.onClose}
          >
            儲存
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProfileModal;
