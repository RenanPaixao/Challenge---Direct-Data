import { Button, Center } from '@chakra-ui/react'
import { Banner } from '../components/Banner/Banner.tsx'
import { FaPlus } from 'react-icons/fa6'
import { useNavigate } from 'react-router'

export const Home = () => {
  const navigate = useNavigate()
  return <Center flexDirection={'column'}>
    <Banner />
    <Button alignSelf={'end'} onClick={() => navigate('sign-up')} mt={8} size={'lg'} rightIcon={<FaPlus />}>Novo Aluno</Button>
  </Center>
}
