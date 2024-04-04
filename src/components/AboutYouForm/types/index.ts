export interface FieldConfig {
  name: string,
  type: string,
  label: string
  mask?: string | string[] | NumberConstructor
  helpMessage?: string,
  'data-testid'?: string
}
