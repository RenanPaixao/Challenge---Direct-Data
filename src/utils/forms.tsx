import { FormikErrors, FormikTouched } from 'formik'
import { IMaskInput } from 'react-imask'
import { FieldConfig } from '../components/AboutYouForm/types'
import { TheField } from '../components/TheField/TheField.tsx'

/**
 * Check if a field has an error.
 *
 * @param name - The name of the field.
 * @param touched - The object with all touched fields.
 * @param errors - The object with all errors.
 */
export function hasFormikError<T>(name: keyof T, touched: FormikTouched<T>, errors: FormikErrors<T>): boolean {
  return !!touched[name] && !!errors[name]
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
