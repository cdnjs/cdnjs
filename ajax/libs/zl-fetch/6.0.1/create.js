import { coreFetch } from './core.js'

// Creates an instance of zlFetch to be used later
export function create(baseURL, options) {
  const fn = function (...args) {
    const { url, newOptions } = normalize(args)
    return coreFetch(url, { ...options, ...newOptions })
  }

  // Create Shorthand methods
  const methods = ['get', 'post', 'put', 'patch', 'delete']

  for (const method of methods) {
    fn[method] = function (...args) {
      const { url, newOptions } = normalize(args)
      return coreFetch(url, { ...options, ...newOptions, method })
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
