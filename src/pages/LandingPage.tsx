import React from 'react';
import LandingPanel from "../components/LandingPanel";
import { Container, Box } from '@chakra-ui/react';
import { QuestionIllus, TeacherIllus } from '../assets/images';


const LandingPage = () => {
  return (
    <Box w={'100%'} h={'100vh'} overflowY={'hidden'}>
      <Container maxW={'container.lg'} h={'100vh'} py={'40'} position={'relative'}>
        <LandingPanel />
        <Box position={'absolute'} top={'32'} right={'20%'} width={'10vw'} zIndex={-1}>
          <QuestionIllus width={'100%'}/>
        </Box>
        <Box position={'absolute'} bottom={'-20'} right={'0'} width={'40vw'}>
          <TeacherIllus width={'100%'}/>
        </Box>
      </Container>
    </Box>
  )
};

export default LandingPage;
