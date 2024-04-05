import { DateTime } from 'luxon'

/**
 * Format an ISO  date to 'dd/MM/yyyy'
 * @param date
 */
export function formatDate(date: string): string {
  return DateTime.fromISO(date).toFormat('dd/MM/yyyy')
}
