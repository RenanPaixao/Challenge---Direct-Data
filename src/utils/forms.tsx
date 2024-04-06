import { IMaskInput } from 'react-imask'
import { FieldConfig } from '../components/AboutYouForm/types'
import { TheField } from '../components/TheField/TheField.tsx'
import { isCPF } from 'brazilian-values'
import { FORM_MESSAGES } from './constants.ts'

const {  INVALID_CPF } = FORM_MESSAGES

/**
 * Tests if a CPF is valid in a YUP validation.
 * @param value
 * @param ctx
 */
export function testCPF(value: string, ctx: any) {
  if (!isCPF(value)) {
    return ctx.createError({ message: INVALID_CPF })
  }

  return true
}

/**
 * Render inputs based on the input configs, with all props needed .
 * @param configs
 */
export function renderInputsBaseOnConfigs(configs: FieldConfig[]) {
  return configs.map(({ name, mask, ...rest }) => {
    return <TheField
      as={mask ? IMaskInput : undefined}
      key={name}
      mask={mask as string}
      name={name}
      {...rest}
    />
  })
}
