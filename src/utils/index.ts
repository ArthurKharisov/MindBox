/**
 * Функция для глубокого клонирования списка
 * @param list список
 */
export function deepClone<T = unknown>(list: T[]): T[] | undefined {
  try {
    const jsonList = JSON.stringify(list)
    return JSON.parse(jsonList);
  } catch (e) {
    console.error(e)
  }
}
