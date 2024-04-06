import { Center, Flex, Heading, Image } from '@chakra-ui/react'
import Punch from '../../assets/images/punch.webp'

export const TheBanner = () => {
  return <Center as={'nav'} bg={'var(--chakra-colors-purple-500)'} color={'white'} p={8} borderRadius={8} w={'100%'}>
    <Flex alignItems={'center'} gap={8}>
      <Image width={100} src={Punch} alt='Punch' />
      <Heading as={'h1'}>D&D ACADEMIA</Heading>
    </Flex>
  </Center>
}
