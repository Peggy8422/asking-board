import { extendTheme } from '@chakra-ui/react';

//加入客製化品牌主題顏色
const theme = extendTheme({
  colors: {
    brand: {
      300: '#5BBA6F',
      400: '#3FA34D',
      500: '#137547'
    }
  }
  
});

export default theme;