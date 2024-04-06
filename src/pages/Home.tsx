import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import '../assets/styles/add-background-on-root.css'
import Punch from '../assets/images/punch.webp'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
export const Home = () => {
  const navigate = useNavigate()

  // We need to use an imperative approach to change the body class on this page and not affect other pages.
  useEffect(() => {
    document.body.className = 'home-body'

    return () => {
      document.body.className = ''
    }
  }, [])

  return <Flex w={'80%'} color={'white'} p={12} h={'100vh'} alignItems={'center'}>
    <Box fontFamily={'Inter, sans-serif'} w={['80%', null, '60%']} flexDirection={'column'} ml={[0, null, 32]}>
      <Text fontSize={'4rem'} fontWeight={700} >Aulas de boxe todos os dias!</Text>
      <Text fontSize={'1rem'} fontWeight={200} fontFamily={'Inter, sans-serif '}>*Exceto domingos e feriados!</Text>
      <Button colorScheme={'gray'} size={'lg'} p={8} mt={10} onClick={() => navigate('sign-up')}>
        Comece agora!
        <Image width={50} src={Punch} alt='Punch' />
      </Button>
    </Box>
  </Flex>
}
