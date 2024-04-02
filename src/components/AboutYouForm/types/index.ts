export interface FieldConfig<t> {
  name: keyof t,
  type: string,
  label: string
}
