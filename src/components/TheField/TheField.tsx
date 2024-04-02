import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { FieldInputProps, useField } from 'formik'

interface IProps extends Omit<FieldInputProps<never>, 'value' | 'onBlur' | 'onChange'>{
  label: string
  type: string
}

export const TheField = ({ label, name, ...rest }: IProps) => {
  const [field, meta] = useField(name)
  return <FormControl key={name} isInvalid={meta.touched && !!meta.error}>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <Input
      aria-label={name}
      {...field}
      {...rest}
    />
    <FormErrorMessage>{meta.error}</FormErrorMessage>
  </FormControl>
}
