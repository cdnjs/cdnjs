/*!
  * Reqwest! A general purpose XHR connection manager
  * copyright Dustin Diaz 2011
  * https://github.com/ded/reqwest
  * license MIT
  */
!function (context, win) {

  var twoHundo = /^20\d$/
    , doc = document
    , byTag = 'getElementsByTagName'
    , readyState = 'readyState'
    , contentType = 'Content-Type'
    , head = doc[byTag]('head')[0]
    , uniqid = 0
    , lastValue // data stored by the most recent JSONP callback
    , xhr = ('XMLHttpRequest' in win) ?
        function () {
          return new XMLHttpRequest()
        } :
        function () {
          return new ActiveXObject('Microsoft.XMLHTTP')
        }

  function handleReadyState(o, success, error) {
    return function () {
      if (o && o[readyState] == 4) {
        if (twoHundo.test(o.status)) {
          success(o)
        } else {
          error(o)
        }
      }
    }
  }

  function setHeaders(http, o) {
    var headers = o.headers || {}
    headers.Accept = headers.Accept || 'text/javascript, text/html, application/xml, text/xml, */*'

    // breaks cross-origin requests with legacy browsers
    if (!o.crossOrigin) {
      headers['X-Requested-With'] = headers['X-Requested-With'] || 'XMLHttpRequest'
    }
    headers[contentType] = headers[contentType] || 'application/x-www-form-urlencoded'
    for (var h in headers) {
      headers.hasOwnProperty(h) && http.setRequestHeader(h, headers[h], false)
    }
  }

  function getCallbackName(o) {
    var callbackVar = o.jsonpCallback || "callback"
    if (o.url.slice(-(callbackVar.length + 2)) == (callbackVar + "=?")) {
      // Generate a guaranteed unique callback name
      var callbackName = "reqwest_" + uniqid++

      // Replace the ? in the URL with the generated name
      o.url = o.url.substr(0, o.url.length - 1) + callbackName
      return callbackName
    } else {
      // Find the supplied callback name
      var regex = new RegExp(callbackVar + "=([\\w]+)")
      return o.url.match(regex)[1]
    }
  }

  // Store the data returned by the most recent callback
  function generalCallback(data) {
    lastValue = data
  }

  function getRequest(o, fn, err) {
    if (o.type == 'jsonp') {
      var script = doc.createElement('script')
        , loaded = 0

      // Add the global callback
      win[getCallbackName(o)] = generalCallback

      // Setup our script element
      script.type = 'text/javascript'
      script.src = o.url
      script.async = true

      script.onload = script.onreadystatechange = function () {
        if ((script[readyState] && script[readyState] !== "complete" && script[readyState] !== "loaded") || loaded) {
          return false
        }
        script.onload = script.onreadystatechange = null
        // Call the user callback with the last value stored
        // and clean up values and scripts.
        o.success && o.success(lastValue)
        lastValue = undefined
        head.removeChild(script)
        loaded = 1
      }

      // Add the script to the DOM head
      head.appendChild(script)
    } else {
      var http = xhr()
      http.open(o.method || 'GET', typeof o == 'string' ? o : o.url, true)
      setHeaders(http, o)
      http.onreadystatechange = handleReadyState(http, fn, err)
      o.before && o.before(http)
      http.send(o.data || null)
      return http
    }
  }

  function Reqwest(o, fn) {
    this.o = o
    this.fn = fn
    init.apply(this, arguments)
  }

  function setType(url) {
    if (/\.json$/.test(url)) {
      return 'json'
    }
    if (/\.jsonp$/.test(url)) {
      return 'jsonp'
    }
    if (/\.js$/.test(url)) {
      return 'js'
    }
    if (/\.html?$/.test(url)) {
      return 'html'
    }
    if (/\.xml$/.test(url)) {
      return 'xml'
    }
    return 'js'
  }

  function init(o, fn) {
    this.url = typeof o == 'string' ? o : o.url
    this.timeout = null
    var type = o.type || setType(this.url), self = this
    fn = fn || function () {}

    if (o.timeout) {
      this.timeout = setTimeout(function () {
        self.abort()
        error()
      }, o.timeout)
    }

    function complete(resp) {
      o.complete && o.complete(resp)
    }

    function success(resp) {
      o.timeout && clearTimeout(self.timeout) && (self.timeout = null)
      var r = resp.responseText

      if (r) {
        switch (type) {
        case 'json':
          resp = win.JSON ? win.JSON.parse(r) : eval('(' + r + ')')
          break;
        case 'js':
          resp = eval(r)
          break;
        case 'html':
          resp = r
          break;
        }
      }

      fn(resp)
      o.success && o.success(resp)
      complete(resp)
    }

    function error(resp) {
      o.error && o.error(resp)
      complete(resp)
    }

    this.request = getRequest(o, success, error)
  }

  Reqwest.prototype = {
    abort: function () {
      this.request.abort()
    }

  , retry: function () {
      init.call(this, this.o, this.fn)
    }
  }

  function reqwest(o, fn) {
    return new Reqwest(o, fn)
  }

  function enc(v) {
    return encodeURIComponent(v)
  }

  function serial(el) {
    var n = el.name
    // don't serialize elements that are disabled or without a name
    if (el.disabled || !n) {
      return ''
    }
    n = enc(n)
    switch (el.tagName.toLowerCase()) {
    case 'input':
      switch (el.type) {
      // silly wabbit
      case 'reset':
      case 'button':
      case 'image':
      case 'file':
        return ''
      case 'checkbox':
      case 'radio':
        return el.checked ? n + '=' + (el.value ? enc(el.value) : true) + '&' : ''
      default: // text hidden password submit
        return n + '=' + (el.value ? enc(el.value) : '') + '&'
      }
      break;
    case 'textarea':
      return n + '=' + enc(el.value) + '&'
    case 'select':
      // @todo refactor beyond basic single selected value case
      return n + '=' + enc(el.options[el.selectedIndex].value) + '&'
    }
    return ''
  }

  reqwest.serialize = function (form) {
    var fields = [form[byTag]('input')
      , form[byTag]('select')
      , form[byTag]('textarea')]
      , serialized = [], i, j

    for (i = 0, l = fields.length; i < l; ++i) {
      for (j = 0, l2 = fields[i].length; j < l2; ++j) {
        serialized.push(serial(fields[i][j]))
      }
    }
    return serialized.join('').replace(/&$/, '')
  }

  reqwest.serializeArray = function (f) {
    for (var pairs = this.serialize(f).split('&'), i = 0, l = pairs.length, r = [], o; i < l; i++) {
      pairs[i] && (o = pairs[i].split('=')) && r.push({name: o[0], value: o[1]})
    }
    return r
  }

  var old = context.reqwest
  reqwest.noConflict = function () {
    context.reqwest = old
    return this
  }

  // defined as extern for Closure Compilation
  if (typeof module !== 'undefined') module.exports = reqwest; else context['reqwest'] = reqwest

}(this, window)
