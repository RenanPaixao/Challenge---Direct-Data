import { Box, Button, Center } from '@chakra-ui/react'
import { AboutYouForm } from '../components/AboutYouForm/AboutYouForm.tsx'

export const SignUp = () => {
  return <Center>
    <AboutYouForm>
      {/*TODO: Create form footer component and let it inside forms*/}
      <Box pt={8}>
        <Button type={'submit'} cursor={'pointer'}>
          Avançar
        </Button>
      </Box>
    </AboutYouForm>
  </Center>
}
