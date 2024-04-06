import { Button, Center } from '@chakra-ui/react'
import { TheBanner } from '../components/TheBanner/TheBanner.tsx'
import { FaPlus } from 'react-icons/fa6'
import { useNavigate } from 'react-router'
import { SubscriptionsDataTable } from '../components/SubscriptionsDataTable/SubscriptionsDataTable.tsx'

export const AllStudents = () => {
  const navigate = useNavigate()
  return <Center flexDirection={'column'}>
    <TheBanner />
    <Button alignSelf={'end'} mb={4} onClick={() => navigate('/sign-up')} mt={8} size={'lg'} rightIcon={<FaPlus />}>Novo Aluno</Button>
    <SubscriptionsDataTable />
  </Center>
}
