/**
 * Session storage persistence handlers.
 * @param key
 * @param value
 */
export function persistOnSessionStorage<T>(key: string, value: T) {
  sessionStorage.setItem(key, JSON.stringify(value))
}

/**
 * Retrieve data from session storage.
 * @param key
 */
export function retrieveFromSessionStorage(key: string) {
  const item = sessionStorage.getItem(key)
  return item ? JSON.parse(item) : null
}
