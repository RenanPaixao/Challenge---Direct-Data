/**
 * Parse string number like monetary values to number
 * @param value
 */
export function parseStringNumberToNumber(value: string) {
  return Number(value.replace(/,/g, '.'))
}
