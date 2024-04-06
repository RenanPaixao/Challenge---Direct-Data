import { IMaskInput } from 'react-imask'
import { FieldConfig } from '../components/AboutYouForm/types'
import { TheField } from '../components/TheField/TheField.tsx'
import { isCPF } from 'brazilian-values'
import { FORM_MESSAGES } from './constants.ts'
import { subscribeService } from '../services/subscribeService/subscribeService.ts'
import { TestContext, ValidationError } from 'yup'
import { AxiosError } from 'axios'

const {  INVALID_CPF, CPF_ALREADY_REGISTERED } = FORM_MESSAGES

/**
 * Tests if a CPF is valid in a YUP validation.
 * @param value
 * @param ctx
 */
export function testCPFFormat(value: string, ctx: TestContext<any>): boolean | ValidationError {
  if (!isCPF(value)) {
    return ctx.createError({ message: INVALID_CPF })
  }

  return true
}

/**
 * Tests if a CPF is valid in a YUP validation.
 * @param value
 * @param ctx
 */
export async function testCPFIsAlreadyRegistered(value: string, ctx: TestContext<any>): Promise<boolean | ValidationError> {
  const cpf = value.replace(/\D/g, '')
  const isValid = isCPF(cpf)

  if(!isValid) {
    return true
  }

  try {
    const data = await subscribeService.getByCpf(cpf)

    if(data) {
      return ctx.createError({ message: CPF_ALREADY_REGISTERED })
    }
  }catch(e) {
    if(e instanceof AxiosError && e.code === 'ERR_BAD_REQUEST') {
      return true
    }

    console.error(e)
  }

  return true
}

/**
 * Test the format of a CPF and if it is already registered.
 * @param value
 * @param ctx
 */
export async function testCPF(value: string, ctx: any) {
  const isValid = testCPFFormat(value, ctx)

  if(isValid instanceof Error) {
    return isValid
  }

  const cpf = value.replace(/\D/g, '')
  await testCPFIsAlreadyRegistered(cpf, ctx)
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
