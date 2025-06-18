import statuses from 'statuses'

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

// When rejecting API errors, use this to make them easier to read.
// Also doubles up as a way to standardize error messages and status codes.
export function reject(error) {
  const err = {
    status: error.status,
    statusText: error.statusText || statuses(error.status),
  }

  if (error.body) err.body = error.body
  if (error.message) err.message = error.message

  return Promise.reject(err)
}
