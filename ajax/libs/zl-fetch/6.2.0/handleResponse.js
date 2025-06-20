import { parseSSE } from '@splendidlabz/utils';

/**
 * Handles the response from a fetch request and parses it according to content type
 * @param {Response} response - The fetch Response object
 * @param {Object} [options] - Configuration options
 * @param {Function} [options.customResponseParser] - Custom function to parse the response
 * @returns {Promise<Object>|Response} Returns either a parsed response object or the raw response if customResponseParser is used
 */
export function handleResponse(response, options) {
  // Lets user use custom response parser because some people want to do so.
  // See https://github.com/zellwk/zl-fetch/issues/2
  if (options?.customResponseParser) return response
  const type = getResponseType(response)
  return parseResponse(response, { ...options, type })
}

/**
 * Formats fetch errors into a standardized zlFetch error format
 * @param {Error} error - The error object from the fetch request
 * @returns {Promise<Object>} Returns a rejected promise with the formatted error
 */
export function handleError(error) {
  if (error.message === 'Failed to fetch') {
    /* eslint-disable */
    return Promise.reject({ error })
    /* eslint-enable */
  }
  return Promise.reject(error)
}

// ========================
// Internal Functions
// ========================
/**
 * Determines the type of response based on content-type and other headers
 * @param {Response} response - The fetch Response object
 * @returns {string|null} Returns the response type ('json', 'text', 'blob', 'formData', 'sse', 'chunked', 'stream') or null for 204 No Content
 * @throws {Error} Throws an error if the content-type is not supported
 */
function getResponseType(response) {
  const contentType = response.headers.get('content-type')
  const contentLength = response.headers.get('content-length')
  const transferEncoding = response.headers.get('Transfer-Encoding')

  if (!contentType) return null // Handles 204 No Content

  // Streaming response types
  if (contentType === 'text/event-stream') return 'sse'
  if (transferEncoding === 'chunked') return 'chunked'
  if (!contentLength) return 'stream'

  if (contentType.includes('json')) return 'json'
  if (contentType.includes('text')) return 'text'
  if (contentType.includes('blob')) return 'blob'
  if (contentType.includes('x-www-form-urlencoded')) return 'formData'

  // Need to check for FormData, Blob and ArrayBuffer content types
  throw new Error(`zlFetch does not support content-type ${contentType} yet`)
}

/**
 * Parses the response body according to its content type
 * @param {Response} response - The fetch Response object
 * @param {Object} options - Configuration options
 * @param {string} options.type - The type of response to parse
 * @returns {Promise<Object>} Returns a promise that resolves to the parsed response
 */
async function parseResponse(response, options) {
  // Parse formData into JavaScript object
  if (options.type === 'formData') {
    let body = await response.text()
    const query = new URLSearchParams(body)
    body = Object.fromEntries(query)
    return createOutput({ response, body, options })
  }

  if (options.type === 'stream') {
    const body = response.body
    return createOutput({ response, body, options })
  }

  if (options.type === 'sse') {
    const body = handleSSEStream(response) 
    return createOutput({ response, body, options })
  }

  if (options.type === 'chunked') {
    const body = handleChunkedStream(response)
    return createOutput({ response, body, options })
  }

  const body = await response[options.type]()
  return createOutput({ response, body, options })
}

/**
 * Creates a standardized output object for fetch responses
 * @param {Object} params - The parameters object
 * @param {Response} params.response - The fetch Response object
 * @param {*} params.body - The parsed response body
 * @param {Object} params.options - Configuration options
 * @param {boolean} [params.options.returnError=false] - If true, returns both success and error in a single object
 * @returns {Promise<Object>} Returns a promise that resolves to a standardized response object
 */
function createOutput({ response, body, options }) {
  const headers = getHeaders(response)
  const returnValue = {
    body,
    headers,
    response,
    status: response.status,
    statusText: response.statusText,
  }

  // Resolves if successful response
  // Rejects if unsuccessful response
  if (!options.returnError) {
    return response.ok
      ? Promise.resolve(returnValue)
      : Promise.reject(returnValue)
  }

  // Returns both successful and unsuccessful response
  if (options.returnError) {
    let data
    let error

    if (response.ok) {
      data = returnValue
      error = null
    } else {
      data = null
      error = returnValue
    }

    return Promise.resolve({
      response: data,
      error,
    })
  }
}

/**
 * Extracts headers from the response object
 * @param {Response} response - The fetch Response object
 * @returns {Object} Returns an object containing all response headers
 */
function getHeaders(response) {
  return response.headers.entries
    ? getBrowserFetchHeaders(response)
    : getNodeFetchHeaders(response)
}

/**
 * Extracts headers from a browser fetch response
 * @param {Response} response - The fetch Response object
 * @returns {Object} Returns an object containing all response headers
 */
function getBrowserFetchHeaders(response) {
  const headers = {}
  for (const [header, value] of response.headers.entries()) {
    headers[header] = value
  }
  return headers
}

/**
 * Extracts headers from a Node.js fetch response
 * @param {Response} response - The fetch Response object
 * @returns {Object} Returns an object containing all response headers
 */
function getNodeFetchHeaders(response) {
  const headers = {}
  const h = response.headers._headers
  for (const header in h) {
    headers[header] = h[header].join('')
  }
  return headers
}

/**
 * Handles Server-Sent Events (SSE) stream responses
 * @param {Response} response - The fetch Response object
 * @returns {ReadableStream} Returns a ReadableStream that emits parsed SSE messages
 */
function handleSSEStream(response) {
  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  return new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          // Decode the chunk and add to buffer
          buffer += decoder.decode(value, { stream: true })
          // Process complete messages
          const messages = buffer.split('\n\n')
          buffer = messages.pop() // Keep the last incomplete message in buffer

          for (const message of messages) {
            if (message.trim() === '') continue

            const parsedMessage = parseSSE(message)
            if (parsedMessage) controller.enqueue(parsedMessage)
          }
        }
      } catch (error) {
        controller.error(error)
      } finally {
        controller.close()
      }
    }
  })
}

/**
 * Handles chunked stream responses
 * @param {Response} response - The fetch Response object
 * @returns {ReadableStream} Returns a ReadableStream that emits parsed chunks
 */
export function handleChunkedStream(response) {
  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  return new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          // Decode the chunk
          let chunk = typeof value === 'string' ? value : decoder.decode(value, { stream: true })
          
          chunk = chunk.trim()
          try {
            chunk = JSON.parse(chunk)
          } catch (error) {
            // Do nothing
          }
          controller.enqueue(chunk)
        }
      } catch (error) {
        controller.error(error)
      } finally {
        controller.close()
      }
    }
  })
}

