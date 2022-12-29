import { handleError, handleResponse } from './handleResponse.js'

/* globals fetch */
import createRequestOptions from './createRequestOptions.js'

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
  const fn = function (url, newOptions) {
    url = makeURL(baseURL, url)
    return fetchInstance({ url, ...options, ...newOptions })
  }

  // Create Shorthand methods
  const methods = ['get', 'post', 'put', 'patch', 'delete']

  for (const method of methods) {
    fn[method] = function (url, newOptions) {
      url = makeURL(baseURL, url)
      return fetchInstance({ url, method, ...options, ...newOptions })
    }
  }

  return fn
}

// Joins the baseURL and endpoint.
// Uses a simple string concatenation instead of path.join
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
