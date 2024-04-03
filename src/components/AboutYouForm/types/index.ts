export interface FieldConfig<t> {
  name: keyof t,
  type: string,
  label: string
  mask?: string | string[]
  helpMessage?: string,
  'data-testid'?: string
}
