/*
 * JavaScript Load Image Fetch
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2017, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define, module, require */

;(function(factory) {
  'use strict'
  if (typeof define === 'function' && define.amd) {
    // Register as an anonymous AMD module:
    define(['./load-image', './load-image-meta'], factory)
  } else if (typeof module === 'object' && module.exports) {
    factory(require('./load-image'), require('./load-image-meta'))
  } else {
    // Browser globals:
    factory(window.loadImage)
  }
})(function(loadImage) {
  'use strict'

  if (typeof fetch !== 'undefined' && typeof Request !== 'undefined') {
    loadImage.fetchBlob = function(url, callback, options) {
      if (loadImage.hasMetaOption(options)) {
        fetch(new Request(url, options))
          .then(function(response) {
            return response.blob()
          })
          .then(callback)
          .catch(function(err) {
            console.log(err) // eslint-disable-line no-console
            callback()
          })
      } else {
        callback()
      }
    }
  } else if (
    // Check for XHR2 support:
    typeof XMLHttpRequest !== 'undefined' &&
    typeof ProgressEvent !== 'undefined'
  ) {
    loadImage.fetchBlob = function(url, callback, options) {
      if (loadImage.hasMetaOption(options)) {
        // eslint-disable-next-line no-param-reassign
        options = options || {}
        var req = new XMLHttpRequest()
        req.open(options.method || 'GET', url)
        if (options.headers) {
          Object.keys(options.headers).forEach(function(key) {
            req.setRequestHeader(key, options.headers[key])
          })
        }
        req.withCredentials = options.credentials === 'include'
        req.responseType = 'blob'
        req.onload = function() {
          callback(req.response)
        }
        req.onerror = req.onabort = req.ontimeout = function(e) {
          console.log(e) // eslint-disable-line no-console
          callback()
        }
        req.send(options.body)
      } else {
        callback()
      }
    }
  }
})
