import { IMaskInput } from 'react-imask'
import { FieldConfig } from '../components/AboutYouForm/types'
import { TheField } from '../components/TheField/TheField.tsx'
import { isCPF } from 'brazilian-values'
import { FORM_MESSAGES } from './constants.ts'
import { subscribeService } from '../services/subscribeService/subscribeService.ts'
import { TestContext, ValidationError } from 'yup'
import { AxiosError } from 'axios'
import * as Yup from 'yup'
import { isGreaterThan18 } from './date.ts'

const {  INVALID_CPF, CPF_ALREADY_REGISTERED, REQUIRED } = FORM_MESSAGES

export const yupBuilders = {
  requiredBasedOnBirthdate: {
    is: (value: string) => {
      return isGreaterThan18(value)
    },
    then: (schema: Yup.StringSchema<any>) => schema,
    otherwise: (schema: Yup.StringSchema<any>) => schema.required(REQUIRED)
  },
  cpfRequiredBasedOnBirthdate: {
    is: (value: string) => {
      return isGreaterThan18(value)
    },
    then: (schema: Yup.StringSchema<any>) => schema,
    otherwise: (schema: Yup.StringSchema<any>) => schema.required(REQUIRED).test(testCPFFormat)
  }
}

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
 */
export async function checkCPFIsAlreadyRegistered(value: string): Promise<true | {message: string}> {
  const cpf = value.replace(/\D/g, '')

  try {
    const data = await subscribeService.getByCpf(cpf)

    if(data) {
      return { message: CPF_ALREADY_REGISTERED }
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
