import { Center, Heading, Image, Text } from '@chakra-ui/react'
import BoxersImage from '../assets/images/boxers.svg'

export const SuccessfulRegister = () => {
  return <Center>
    <Center flexDirection={'column'} backgroundColor={'var(--chakra-colors-purple-400)'} color={'white'} p={10} borderRadius={8}>
      <Image boxSize={[400, 500, 600]} src={BoxersImage} alt="Boxers" />

      <Heading as={'h1'} size={'lg'} mb={8}>
        Seu cadastro foi realizado com sucesso!
      </Heading>
      <Text maxW={'70%'} color={'var(--chakra-colors-white-700)'} fontSize={'md'}>
        Agora você já pode fechar essa aba e aguardar que adicionaremos você ao grupo no WhatsApp.
      </Text>
    </Center>
  </Center>
}
