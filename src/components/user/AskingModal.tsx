//工具
import React, { useState } from 'react';
import { postNewQuestion, QuestionFormData } from '../../api/questionRelated';

//元件
import {
  Text,
  Button,
  Badge,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Switch,
  Avatar,
  Textarea,
  Divider,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { HandIcon, PhotosIcon } from '../../assets/icons';

const subjects = ['國文', '英文', '數學', '生物', '理化', '地科', '地理', '歷史', '公民', '其他'];

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserAvatar: string;
  currentUserName: string;
}

const AskingModal: React.FC<ModalProps> = (props) => {
  const [formData, setFormData] = useState<QuestionFormData>({
    title: '',
    description: '',
    isAnonymous: false,
    grade: '',
    subject: '',
    images: [],
  });
  const [tempImages, setTempImages] = useState([]);


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
          gap={1}
          color={'brand.500'}
          borderBottom={'1px'}
          borderBottomColor={'brand.gray_1'}
        >
          <HandIcon fill={'#137547'} width={'20px'} />
          提問
        </ModalHeader>
        <ModalCloseButton color={'brand.gray_3'} />
        <ModalBody>
          <FormControl display={'flex'} alignItems={'center'}>
            {/* 標題 */}
            <FormLabel
              w={'60px'}
              m={0}
              p={0}
              color={'brand.500'}
              fontSize={'md'}
              fontWeight={'semibold'}
            >
              標題：
            </FormLabel>
            <Input
              isRequired
              type={'text'}
              borderBottomWidth={'2px'}
              borderBottomColor={'brand.500'}
              variant={'flushed'}
              placeholder={'此題目關於...'}
              value={formData.title}
            />
            <FormErrorMessage>題目不可超過50字!</FormErrorMessage>
            <FormHelperText position={'absolute'} right={0} fontSize={'xs'}>
              {formData.title.length}/50
            </FormHelperText>
          </FormControl>
          <Flex mt={4} justify={'space-between'} gap={3}>
            {/* 分類選擇 */}
            <FormControl display={'flex'} alignItems={'center'} flex={2}>
              <FormLabel
                color={'brand.500'}
                fontSize={'md'}
                fontWeight={'semibold'}
              >
                提問年級範圍：
              </FormLabel>
              <Select
                w={'unset'}
                size={'sm'}
                color={'brand.500'}
                borderColor={'brand.500'}
                borderRadius={'full'}
                display={'inline'}
                placeholder={'請選擇年級範圍'}
                value={formData.grade}
              >
                <option value="junior_first">國中一年級</option>
                <option value="junior_second">國中二年級</option>
                <option value="junior_third">國中三年級</option>
                <option value="others">其他</option>
              </Select>
            </FormControl>
            <FormControl display={'flex'} alignItems={'center'} flex={2}>
              <FormLabel
                color={'brand.500'}
                fontSize={'md'}
                fontWeight={'semibold'}
              >
                提問科目：
              </FormLabel>
              <Select
                w={'unset'}
                size={'sm'}
                color={'brand.500'}
                borderColor={'brand.500'}
                borderRadius={'full'}
                display={'inline'}
                placeholder={'請選擇相關科目'}
                value={formData.subject}
              >
                {subjects.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl display={'flex'} alignItems={'center'} flex={1}>
              <FormLabel
                color={'brand.500'}
                fontSize={'md'}
                fontWeight={'semibold'}
                htmlFor="isAnonymous"
              >
                匿名提問：
              </FormLabel>
              <Switch id="isAnonymous" colorScheme={'green'} isChecked={formData.isAnonymous} />
            </FormControl>
          </Flex>
          <Flex mt={5} gap={2}>
            <Avatar
              name={props.currentUserName}
              src={props.currentUserAvatar}
            />
            <Textarea
              isRequired
              placeholder="我想問..."
              size={'lg'}
              border={'none'}
              resize={'none'}
              rows={10}
            />
          </Flex>
          <Divider my={5} borderColor={'brand.300'} />
          <FormLabel
            display={'inline-flex'}
            alignItems={'center'}
            gap={2}
            htmlFor={'add-photos'}
            color={'brand.500'}
            cursor={'pointer'}
          >
            <PhotosIcon />
            <Text fontWeight={'semibold'}>新增</Text>
            <Input type={'file'} id={'add-photos'} display={'none'} />
          </FormLabel>
          <Badge mt={-2} fontSize={'sm'} colorScheme={'green'}>
            可新增與問題相關照片(至多5張)
          </Badge>
          <Flex wrap={'wrap'} gap={2} p={2}>
            {tempImages.map(img => <Image boxSize={'150px'} src={img} fallbackSrc="https://via.placeholder.com/150x100" />)}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button size={'sm'} colorScheme="green" onClick={props.onClose}>
            {/*這個click事件應該還要提交表單資料*/}
            回覆
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AskingModal;
