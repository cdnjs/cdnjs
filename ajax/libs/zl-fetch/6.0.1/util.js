/**
 * Converts Form Data into an object
 * @param {FormData} formData
 * @returns Object
 */
export function toObject(formData) {
  const obj = {}
  for (const data of formData) {
    obj[data[0]] = data[1].trim()
  }
  return obj
}

/**
 * Converts object into a query string
 * @param {Object} object
 * @returns
 */
export function toQueryString(object) {
  const searchParams = new URLSearchParams(object)
  return searchParams.toString()
}
