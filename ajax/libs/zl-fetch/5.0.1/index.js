/* globals fetch */
import createRequestOptions, { isFormData } from './createRequestOptions.js'
import { handleError, handleResponse } from './handleResponse.js'

/**
 * Main zlFetch Function
 * @param {string} url - endpoint
 * @param {object} options - zlFetch options
 * @param {string} options.method - HTTP method
 * @param {object} options.headers - HTTP headers
 * @param {object} options.body - Body content
 * @param {string} options.auth - Authentication information
 * @param {string} options.debug - Logs the request options for debugging
 * @param {string} options.returnError - Returns the error instead of rejecting it
 * @param {string} options.customResponseParser - Use a custome response parser
 */
export default function zlFetch(url, options) {
  return fetchInstance({ url, ...options })
}

// Create Shorthand methods
const methods = ['get', 'post', 'put', 'patch', 'delete']

for (const method of methods) {
  zlFetch[method] = function (url, options) {
    return fetchInstance({ url, method, ...options })
  }
}

// Creates an instance of zlFetch to be used later
export function createZlFetch(baseURL, options) {
  const fn = function (...args) {
    const { url, newOptions } = normalize(args)
    return fetchInstance({ url, ...options, ...newOptions })
  }

  // Create Shorthand methods
  const methods = ['get', 'post', 'put', 'patch', 'delete']

  for (const method of methods) {
    fn[method] = function (...args) {
      const { url, newOptions } = normalize(args)
      return fetchInstance({ url, method, ...options, ...newOptions })
    }
  }

  // Normalize the URL and options
  // Allows user to use the created zlFetch item without passing in further URLs.
  // Naming can be improved, but can't think of a better name for now
  function normalize(args = []) {
    const [arg1, arg2] = args

    // This means no options are given. So we simply use the baseURL as the URL
    if (!arg1) return { url: baseURL }

    // If the firs argument is an object, it means there are options but the user didn't pass in a URL.
    if (typeof arg1 === 'object') return { url: baseURL, newOptions: arg1 }

    // The leftover possibility is that the first argument is a string.
    // In this case we need to make a new URL with this argument.
    const url = makeURL(baseURL, arg1)

    // Wwe need to check whether the second argument is an object or not. If arg2 is undefined, then we simply return the URL since there are no options
    if (!arg2) return { url }

    // The only possibility left is that arg2 is an object, which means there are new options.
    return { url, newOptions: arg2 }
  }

  return fn
}

// Joins the baseURL and endpoint.
// Uses a simple string concatenation instead of path.join so it works in the browser.
function makeURL(baseURL, url) {
  if (baseURL.endsWith('/') && url.startsWith('/')) {
    url = url.slice(1)
  }

  if (!baseURL.endsWith('/') && !url.startsWith('/')) {
    url = '/' + url
  }

  return baseURL + url
}

// ========================
// Internal Functions
// ========================
async function fetchInstance(options) {
  const fetch = await getFetch()
  const requestOptions = createRequestOptions({ ...options, fetch })

  // Remove options that are not native to a fetch request
  delete requestOptions.fetch
  delete requestOptions.auth
  delete requestOptions.debug
  delete requestOptions.returnError

  // Performs the fetch request
  return fetch
    .fetch(requestOptions.url, requestOptions)
    .then(response => handleResponse(response, options))
    .then(response => {
      if (!options.debug) return response
      return { ...response, debug: debugHeaders(requestOptions) }
    })
    .catch(handleError)
}

// Normalizes between Browser and Node Fetch
export async function getFetch() {
  if (typeof fetch === 'undefined' || typeof window === 'undefined') {
    const f = await import('node-fetch')
    return {
      fetch: f.default,
      Headers: f.Headers,
    }
  } else {
    return {
      fetch: window.fetch.bind(window),
      Headers: window.Headers,
    }
  }
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
