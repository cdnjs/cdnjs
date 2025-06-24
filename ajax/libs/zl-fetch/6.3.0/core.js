import createRequestOptions from './createRequestOptions.js'
import { handleError, handleResponse } from './handleResponse.js'

/**
 * Main Fetch Function
 * @param {string} url - The endpoint URL to fetch from
 * @param {object} [options] - zlFetch options
 * @param {string} [options.method='GET'] - HTTP method (GET, POST, PUT, PATCH, DELETE)
 * @param {object} [options.query] - Query parameters object (alternative to queries)
 * @param {object} [options.queries] - Query parameters object (alternative to query)
 * @param {object} [options.params] - Query parameters object (alternative to query/queries)
 * @param {object} [options.param] - Query parameters object (alternative to query/queries/params)
 * @param {object} [options.headers] - HTTP headers to send with the request
 * @param {object|string|FormData} [options.body] - Request body. Can be an object (JSON), string (form-urlencoded), or FormData
 * @param {string|object} [options.auth] - Authentication information. String for Bearer token, object for Basic auth
 * @param {boolean} [options.debug=false] - When true, includes debug information in the response
 * @param {boolean} [options.returnError=false] - When true, returns error object instead of rejecting
 * @param {boolean} [options.customResponseParser=false] - When true, returns raw response without parsing
 * @returns {Promise<object>} A promise that resolves to the response object containing:
 *   - {object} headers - Response headers
 *   - {*} body - Parsed response body (JSON, text, or blob)
 *   - {number} status - HTTP status code
 *   - {string} statusText - HTTP status text
 *   - {Response} response - Original fetch Response object
 *   - {object} [debug] - Debug information (only if debug option is true)
 *   - {object} [error] - Error object (only if returnError is true)
 *   - {function} abort - Aborts the request
 * @throws {Error} When the request fails and returnError is false
 */

export function coreFetch(url, options = {}) {
  const abortController = options.controller || new AbortController()
  const signal = options.signal || abortController.signal
  const instance = fetchInstance({ url, ...options, abortController, signal })
  instance.abort = () => abortController.abort()

  return instance
}
// ========================
// Internal Functions
// ========================
async function fetchInstance(options) {
  const requestOptions = createRequestOptions(options)

  // Remove options that are not native to a fetch request
  delete requestOptions.fetch
  delete requestOptions.queries
  delete requestOptions.query
  delete requestOptions.params
  delete requestOptions.param
  delete requestOptions.auth
  delete requestOptions.debug
  delete requestOptions.returnError

  // Performs the fetch request
  return fetch(requestOptions.url, requestOptions)
    .then(response => handleResponse(response, options))
    .then(response => {
      if (options.signal) return response
      return response
    })
    .then(response => {
      if (!options.debug) return response
      return { ...response, debug: debugHeaders(requestOptions) }
    })
    .catch(handleError)
}

function debugHeaders(requestOptions) {
  const clone = Object.assign({}, requestOptions)
  const headers = {}
  for (const [header, value] of clone.headers) {
    headers[header] = value
  }
  clone.headers = headers
  return clone
}

// so it will be captured by ts

/**
 * @param {string} url - endpoint
 * @param {object} [options] - zlFetch options
 * @param {object} [options.query] - query Object
 * @param {object} [options.queries] - query Object
 * @param {object} [options.params] - query Object
 * @param {object} [options.param] - query Object
 * @param {object} [options.headers] - HTTP headers
 * @param {string} [options.auth] - Authentication information
 * @param {string} [options.debug] - Logs the request options for debugging
 * @param {string} [options.returnError] - Returns the error instead of rejecting it
 * @param {string} [options.customResponseParser] - Use a custome response parser
 */
coreFetch.get = function (url, options) {
  return coreFetch(url, {
    ...options,
    method: 'get'
  })
}

/**
 * @param {string} url - endpoint
 * @param {object} [options] - zlFetch options
 * @param {object} [options.query] - query Object
 * @param {object} [options.queries] - query Object
 * @param {object} [options.params] - query Object
 * @param {object} [options.param] - query Object
 * @param {object} [options.headers] - HTTP headers
 * @param {object} [options.body] - Body content
 * @param {string} [options.auth] - Authentication information
 * @param {string} [options.debug] - Logs the request options for debugging
 * @param {string} [options.returnError] - Returns the error instead of rejecting it
 * @param {string} [options.customResponseParser] - Use a custome response parser
 */
coreFetch.post = function (url, options) {
  return coreFetch(url, {
    ...options,
    method: 'post'
  })
}

/**
 * @param {string} url - endpoint
 * @param {object} [options] - zlFetch options
 * @param {object} [options.query] - query Object
 * @param {object} [options.queries] - query Object
 * @param {object} [options.params] - query Object
 * @param {object} [options.param] - query Object
 * @param {object} [options.headers] - HTTP headers
 * @param {object} [options.body] - Body content
 * @param {string} [options.auth] - Authentication information
 * @param {string} [options.debug] - Logs the request options for debugging
 * @param {string} [options.returnError] - Returns the error instead of rejecting it
 * @param {string} [options.customResponseParser] - Use a custome response parser
 */
coreFetch.put = function (url, options) {
  return coreFetch(url, {
    ...options,
    method: 'put'
  })
}

/**
 * @param {string} url - endpoint
 * @param {object} [options] - zlFetch options
 * @param {object} [options.query] - query Object
 * @param {object} [options.queries] - query Object
 * @param {object} [options.params] - query Object
 * @param {object} [options.param] - query Object
 * @param {object} [options.headers] - HTTP headers
 * @param {object} [options.body] - Body content
 * @param {string} [options.auth] - Authentication information
 * @param {string} [options.debug] - Logs the request options for debugging
 * @param {string} [options.returnError] - Returns the error instead of rejecting it
 * @param {string} [options.customResponseParser] - Use a custome response parser
 */
coreFetch.patch = function (url, options) {
  return coreFetch(url, {
    ...options,
    method: 'patch'
  })
}

/**
 * @param {string} url - endpoint
 * @param {object} [options] - zlFetch options
 * @param {object} [options.query] - query Object
 * @param {object} [options.queries] - query Object
 * @param {object} [options.params] - query Object
 * @param {object} [options.param] - query Object
 * @param {object} [options.headers] - HTTP headers
 * @param {string} [options.auth] - Authentication information
 * @param {string} [options.debug] - Logs the request options for debugging
 * @param {string} [options.returnError] - Returns the error instead of rejecting it
 * @param {string} [options.customResponseParser] - Use a custome response parser
 */
coreFetch.delete = function (url, options) {
  return coreFetch(url, {
    ...options,
    method: 'delete'
  })
}
