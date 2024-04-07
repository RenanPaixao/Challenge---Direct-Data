import { DateTime } from 'luxon'

/**
 * Format an ISO or JS date to 'dd/MM/yyyy'
 * @param date
 */
export function formatDate(date: string | Date): string {
  if(date instanceof Date) {
    return DateTime.fromJSDate(date).toFormat('dd/MM/yyyy')
  }

  return DateTime.fromISO(date).toFormat('dd/MM/yyyy')
}

/**
 * Check if the birthDate is greater than 18 years.
 * @param birthDate
 */
export function isGreaterThan18(birthDate: string) {
  return DateTime.now().diff(DateTime.fromISO(birthDate), 'years').years > 18
}
