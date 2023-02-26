import React from 'react';
import { Flex, Button } from '@chakra-ui/react';

interface TabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const JuniorSubjectTabs: React.FC<TabsProps> = (props) => {
  return (
    <Flex wrap={'wrap'} w={'60%'} gap={2}>
      {[
        '全部',
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
      ].map((item, index) => {
        return <Button 
          key={index}
          size={'sm'}
          borderRadius={'full'}
          bg={props.activeTab === item ? 'brand.400' : ''}
          color={props.activeTab === item ? 'white' : 'brand.400'}
          colorScheme={'green'}
          variant={props.activeTab === item ? 'solid' : 'outline'}
          boxShadow={'md'}
          onClick={() => {
            props.setActiveTab(item)
          }}
        >
          {item}
        </Button>
      })}
    </Flex>
  );
};

export default JuniorSubjectTabs;
