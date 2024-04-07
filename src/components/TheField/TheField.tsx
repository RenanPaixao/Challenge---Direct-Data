import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputProps } from '@chakra-ui/react'
import { FieldInputProps, useField } from 'formik'
import { DatePicker } from '../DatePicker/DatePicker.tsx'

type ChakraAndFormikInputProps = InputProps & Omit<FieldInputProps<never>, 'value' | 'onBlur' | 'onChange'>
interface IProps extends ChakraAndFormikInputProps{
  label: string
  type: string
  mask?: string | string[] | RegExp
  helpMessage?: string
}

export const TheField = ({ label, type, name, helpMessage, ...rest }: IProps) => {
  const [field, meta] = useField(name)

  return <FormControl
    key={name}
    isInvalid={meta.touched && !!meta.error}
    h={'100%'} // Keep alignment when error message appears
  >
    <FormLabel htmlFor={name}>{label}</FormLabel>
    {type === 'date' ?
      <DatePicker
        aria-label={name}
        {...field}
        {...rest} /> :
      <Input
        aria-label={name}
        {...field}
        {...rest}
      />}
    {
      !meta.error && <FormHelperText display={'flex'}>{helpMessage}</FormHelperText>
    }
    <FormErrorMessage>{meta.error}</FormErrorMessage>
  </FormControl>
}
