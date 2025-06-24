import statuses from 'statuses'
import { handleChunkedStream } from './handleResponse'

/**
 * Converts Form Data into a plain JavaScript object
 * @param {FormData} formData - The FormData object to convert
 * @returns {Object} A plain JavaScript object with form data key-value pairs
 * @example
 * const formData = new FormData()
 * formData.append('name', 'John')
 * formData.append('email', 'john@example.com')
 * const obj = toObject(formData)
 * // Returns: { name: 'John', email: 'john@example.com' }
 */
export function toObject(formData) {
  const obj = {}
  for (const data of formData) {
    obj[data[0]] = data[1].trim()
  }
  return obj
}

/**
 * Converts a plain JavaScript object into a URL query string
 * @param {Object} object - The object to convert to query string
 * @returns {string} A URL-encoded query string
 * @example
 * const obj = { name: 'John', age: '30' }
 * const queryString = toQueryString(obj)
 * // Returns: 'name=John&age=30'
 */
export function toQueryString(object) {
  const searchParams = new URLSearchParams(object)
  return searchParams.toString()
}

// When rejecting API errors, use this to make them easier to read.
// Also doubles up as a way to standardize error messages and status codes.

/**
 * Standardizes and formats error objects for API rejections
 * @param {Object} error - The error object to format
 * @param {number} error.status - HTTP status code
 * @param {string} [error.statusText] - HTTP status text
 * @param {*} [error.body] - Response body if available
 * @param {string} [error.message] - Error message if available
 * @returns {Promise<never>} A rejected promise with a standardized error object
 * @example
 * reject({ status: 404, statusText: 'Not Found', body: { message: 'Resource not found' } })
 * // Returns: Promise.reject({ status: 404, statusText: 'Not Found', body: { message: 'Resource not found' } })
 */
export function reject(error) {
  const err = {
    status: error.status,
    statusText: error.statusText || statuses(error.status),
  }

  if (error.body) err.body = error.body
  if (error.message) err.message = error.message

  return Promise.reject(err)
}

/**
 * Reads and processes a response stream
 * @param {Response} response - The fetch Response object to read
 * @returns {Promise<any>} A promise that resolves with the processed stream data
 * @see {@link handleChunkedStream} for implementation details
 */
export function readStream(response) {
  return handleChunkedStream(response)
}