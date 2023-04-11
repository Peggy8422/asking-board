import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

//加入客製化品牌主題顏色
const theme = extendTheme({
  colors: {
    brand: {
      300: '#5BBA6F',
      400: '#3FA34D',
      500: '#137547',
      gray_1: '#C4C4C4',
      gray_2: '#F8F8F8',
      gray_3: '#707070'
    }
  } as ThemeConfig,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  } as ThemeConfig,
  
});

export default theme;