//工具
import React, { useState } from 'react';
import { postNewQuestion, QuestionFormData } from '../../api/questionRelated';
import Swal from 'sweetalert2';

//元件
import {
  Text,
  Button,
  Badge,
  Box,
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

const subjects = [
  '國文',
  '英文',
  '數學',
  '生物',
  '理化',
  '地科',
  '地理',
  '歷史',
  '公民',
  '其他',
];

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
  const [tempImages, setTempImages] = useState<string[] | any[]>([]);
  const [isError, setIsError] = useState(false);

  const token = localStorage.getItem('token')!;

  //上傳問題照片(們)
  const handlePicsUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    const uploadList: any[] = [];

    //讀取每個blob物件用非同步處理
    const readFileAsync = (file: File) =>
      new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = (evt) => resolve(evt.target!.result);
        fileReader.readAsDataURL(file);
      });

    for (let i = 0; i < files.length; i++) {
      uploadList.push(await readFileAsync(files[i]));
    }
    //設定預覽圖
    if (uploadList.length < 5) {
      setTempImages([...tempImages, ...uploadList]);
      //設定要上傳的圖檔
      if (files) {
        console.log(files);
        setFormData((prevData) => ({
          ...prevData,
          images: [...prevData.images, ...files],
        }));
        console.log(formData.images);
      }
    }
  };

  //提交新增問題
  const handleNewQuestionSubmit = async () => {
    if (formData.title.length === 0 || formData.description.length === 0) {
      setIsError(true);
      return;
    }

    if (formData.grade === '') {
      Swal.fire({
        position: 'top',
        title: '請選擇年級範圍！',
        timer: 1000,
        icon: 'warning',
        showConfirmButton: false,
      });
      return;
    }
    if (formData.subject === '') {
      Swal.fire({
        position: 'top',
        title: '請選擇科目範圍！',
        timer: 1000,
        icon: 'warning',
        showConfirmButton: false,
      });
      return;
    }

    const status = await postNewQuestion(token, formData);
    if (status === 200) {
      Swal.fire({
        position: 'top',
        title: '送出提問成功！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });
      props.onClose();
    } else {
      Swal.fire({
        position: 'top',
        title: '提問失敗！',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
    }
  };

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
        <ModalCloseButton
          color={'brand.gray_3'}
          onClick={() => {
            setFormData({
              title: '',
              description: '',
              isAnonymous: false,
              grade: '',
              subject: '',
              images: [],
            });
            setTempImages([]);
          }}
        />
        <ModalBody>
          <FormControl
            display={'flex'}
            alignItems={'baseline'}
            isInvalid={formData.title.length > 50 || isError}
          >
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
            <Box w={'100%'}>
              <Input
                isRequired
                type={'text'}
                borderBottomWidth={'2px'}
                borderBottomColor={'brand.500'}
                variant={'flushed'}
                placeholder={'此題目關於...'}
                value={formData.title}
                onChange={(e) => {
                  setIsError(false);
                  setFormData({ ...formData, title: e.target.value });
                }}
              />
              <FormErrorMessage>
                {isError ? '此欄位不可空白!' : '題目不可超過50字!'}
              </FormErrorMessage>
            </Box>
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
                onChange={(e) => {
                  setFormData({ ...formData, grade: e.target.value });
                }}
              >
                <option value="國中一年級">國中一年級</option>
                <option value="國中二年級">國中二年級</option>
                <option value="國中三年級">國中三年級</option>
                <option value="其他">其他</option>
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
                onChange={(e) => {
                  setFormData({ ...formData, subject: e.target.value });
                }}
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
              <Switch
                id="isAnonymous"
                colorScheme={'green'}
                isChecked={formData.isAnonymous}
                onChange={() => {
                  setFormData({
                    ...formData,
                    isAnonymous: !formData.isAnonymous,
                  });
                }}
              />
            </FormControl>
          </Flex>
          <FormControl
            display={'flex'}
            mt={5}
            gap={2}
            isInvalid={formData.description.length > 500 || isError}
          >
            <Avatar
              name={props.currentUserName}
              src={props.currentUserAvatar}
            />
            <Box w={'100%'}>
              <Textarea
                isRequired
                placeholder="我想問..."
                size={'lg'}
                border={'none'}
                resize={'none'}
                rows={10}
                value={formData.description}
                onChange={(e) => {
                  setIsError(false);
                  setFormData({ ...formData, description: e.target.value });
                }}
              />
              <FormErrorMessage>
                {isError ? '此欄位不可空白!' : '內文不可超過500字!'}
              </FormErrorMessage>
            </Box>
          </FormControl>
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
            <Input
              type={'file'}
              id={'add-photos'}
              display={'none'}
              multiple
              onChange={handlePicsUpload}
            />
          </FormLabel>
          <Badge mt={-2} fontSize={'sm'} colorScheme={'green'}>
            可新增與問題相關照片(至多5張)
          </Badge>
          <Flex wrap={'wrap'} gap={2} p={2}>
            {tempImages.map((img, idx) => (
              <Image
                key={idx}
                boxSize={'150px'}
                src={img}
                fallbackSrc="https://via.placeholder.com/150x100"
              />
            ))}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            size={'sm'}
            colorScheme="green"
            onClick={handleNewQuestionSubmit}
          >
            回覆
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AskingModal;
