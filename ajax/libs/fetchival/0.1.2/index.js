;(function (window) {

  function getURL (args) {
    return args.filter(function (arg) {
      return !(arg instanceof Object)
    }).join('/')
  }

  function getOptions (args) {
    return args.filter(function (arg) {
      return arg instanceof Object
    })[0]
  }

  function getQuery (params) {
    var arr = Object.keys(params).map(function (k) {
      return [k, encodeURIComponent(params[k])].join('=')
    })
    return ['?'].concat(arr).join('&')
  }

  function _fetch (method, args, data, params) {
    var opts = getOptions(args) || { mode: fetchival.mode }
    var url = getURL(args)

    opts.method = method
    opts.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    if (params) {
      url += getQuery(params)
    }

    if (data) {
      opts.body = JSON.stringify(data)
    }

    return fetchival.fetch(url, opts)
      .then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        }
        var err = new Error(response.statusText)
        err.response = response
        throw err
      })
  }

  function fetchival () {
    var slice = Array.prototype.slice
    var args = slice.call(arguments)

    var _ = function () {
      return fetchival.apply(this, args.concat(slice.call(arguments)))
    }

    _.get = function (params) {
      return _fetch('GET', args, null, params)
    }

    _.post = function (data) {
      return _fetch('POST', args, data)
    }

    _.put = function (data) {
      return _fetch('PUT', args, data)
    }

    _.patch = function (data) {
      return _fetch('PATCH', args, data)
    }

    _.delete = function () {
      return _fetch('DELETE', args)
    }

    return _
  }

  // Expose fetch so that other polyfills can be used
  // Bind fetch to window to avoid TypeError: Illegal invocation
  fetchival.fetch = typeof fetch !== 'undefined' ? fetch.bind(window) : null

  // Support CommonJS, AMD & browser
  if (typeof exports === 'object')
    module.exports = fetchival
  else if (typeof define === 'function' && define.amd)
    define(function() { return fetchival })
  else
    window.fetchival = fetchival

})(typeof window != 'undefined' ? window : undefined);