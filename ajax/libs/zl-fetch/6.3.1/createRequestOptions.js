export default function createRequestOptions(options = {}) {
  const opts = Object.assign({}, options)

  // Note: headers get mutated after setHeaders is called.
  // This is why we get the content type here to know what the user originally set.

  const headers = new Headers(options.headers)
  const userContentType = headers.get('content-type')

  opts.url = setUrl(opts)
  opts.method = setMethod(opts)
  opts.headers = setHeaders(opts)

  // If Content Type is set explicitly, we expect the user to pass in the appropriate data. So we don't treat the body
  opts.body = !userContentType ? setBody(opts) : opts.body
  return opts
}

/**
 * Appends queries to URL
 * @param {Object} opts
 */
function setUrl(options) {
  const { url, queries, query, params, param } = options

  // Merge queries, query, and params — treat them as the same item
  // So users don't have to remember singular or plural forms
  const q = Object.assign({}, queries, query, params, param)

  if (isEmptyObject(q)) return options.url

  const searchParams = new URLSearchParams(q)
  return `${url}?${searchParams.toString()}`
}

function isEmptyObject(obj) {
  return (
    obj && // 👈 null and undefined check
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  )
}

function setMethod(options) {
  // Method set to GET by default unless otherwise specified
  const method = (options.method || 'get').toUpperCase()
  return method
}

// ========================
// Set Headers
// We set the headers depending on the request body and method
// ========================
function setHeaders(options) {
  let headers = new Headers(options.headers)
  headers = contentTypeHeader(options, headers)
  headers = authHeader(options, headers)

  return headers
}

function contentTypeHeader(options, headers) {
  // For preflight requests, we don't want to set headers.
  // This allows requests to remain simple.
  if (options.method === 'options') return headers

  // For GET requests, we also don't want to set headers.
  // This allows requests to remain simple.
  if (options.method === 'get') return headers

  // If a content type is aleady set, we return the content type as is.
  // This allows users to set their own content type.
  if (headers.get('content-type')) return headers

  // If the body is a string, we assume it's a query string.
  // So we set headers to Content-Type: application/x-www-form-urlencoded.
  if (typeof options.body === 'string') {
    headers.set('content-type', 'application/x-www-form-urlencoded')
    return headers
  }

  // If the body is an object and not FormData, we set it to `application/json`. Checking for FormData is important here because Form Data requires another content type.
  if (typeof options.body === 'object' && !isFormData(options.body)) {
    headers.set('content-type', 'application/json')
    return headers
  }

  // What's left here is FormData.
  // We don't set the content type here because fetch will set it automatically.
  return headers
}

// Sets the auth headers as necessary
function authHeader(options, headers) {
  // If no auth options, means we don't have to set Authorization headers
  const { auth } = options
  if (!auth) return headers

  // Set Bearer authentication when user passes in a string into auth
  if (typeof auth === 'string') {
    headers.set('Authorization', `Bearer ${auth}`)
    return headers
  }

  // Set Basic Authentication headers when user passes in username and password into auth.
  const btoa = getBtoa()

  // Password field can be empty for implicit grant
  const { username, password = '' } = auth

  if (!username) {
    throw new Error(
      'Username required to create Authorization Header for a Basic Authentication'
    )
  }

  const encodedValue = btoa(`${username}:${password}`)
  headers.set('Authorization', `Basic ${encodedValue}`)
  return headers
}

// Gets Btoa for creating basic auth.
export function getBtoa() {
  if (typeof window !== 'undefined' && window.btoa) {
    return window.btoa
  }

  return function (string) {
    return Buffer.from(string).toString('base64')
  }
}

// ========================
// Set Body
// ========================
function setBody(options) {
  // Return empty body for preflight requests
  const method = options.method
  if (['get', 'head', 'options'].includes(method)) return

  // If the body is form data, we return it as it is because users will have to set it up appropriately themselves.
  if (isFormData(options.body)) return options.body

  // If the body is a string, we assume it's a query string.
  // We ask users to use toQueryString to convert an object to a query string as they send in the request.
  if (typeof options.body === 'string') return options.body

  // If it's an object, we convert it to JSON
  if (typeof options.body === 'object') {
    return JSON.stringify(options.body)
  }

  // If the above conditions don't trigger, we return the body as is.
  // One example that will reach here is FormData
  return options.body
}

// Checks if body is FormData
// Only works on browsers.
// Returns false in Node because Node doesn't have FormData.
export function isFormData(body) {
  if (typeof window === 'undefined') return false
  return body instanceof FormData
}
