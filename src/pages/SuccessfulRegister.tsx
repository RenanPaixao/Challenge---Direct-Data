import { Center, Heading, Image, Text } from '@chakra-ui/react'
import BoxersImage from '../assets/images/boxers.svg'

export const SuccessfulRegister = () => {
  return <Center pt={8}>
    <Center flexDirection={'column'} backgroundColor={'var(--chakra-colors-purple-400)'} color={'white'} p={2} pt={0} pb={10} borderRadius={8}>
      <Image boxSize={[300, 400, 450, null, null, 600]} src={BoxersImage} alt="Boxers" />

      <Heading as={'h1'} size={'lg'} mb={4}>
        Seu cadastro foi realizado com sucesso!
      </Heading>
      <Text maxW={'70%'} color={'var(--chakra-colors-white-700)'} fontSize={'md'}>
        Agora você já pode fechar essa aba e aguardar que adicionaremos você ao grupo no WhatsApp.
      </Text>
    </Center>
  </Center>
}
