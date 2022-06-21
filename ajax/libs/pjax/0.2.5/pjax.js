(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Pjax = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var clone = require("./lib/clone.js")
var executeScripts = require("./lib/execute-scripts.js")
var forEachEls = require("./lib/foreach-els.js")
var switches = require("./lib/switches")
var newUid = require("./lib/uniqueid.js")

var on = require("./lib/events/on.js")
var trigger = require("./lib/events/trigger.js")

var contains = require("./lib/util/contains.js")
var noop = require("./lib/util/noop")

var Pjax = function(options) {
    this.state = {
      numPendingSwitches: 0,
      href: null,
      options: null
    }

    var parseOptions = require("./lib/proto/parse-options.js")
    parseOptions.call(this,options)
    this.log("Pjax options", this.options)

    if (this.options.scrollRestoration && "scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }

    this.maxUid = this.lastUid = newUid()

    this.parseDOM(document)

    on(window, "popstate", function(st) {
      if (st.state) {
        var opt = clone(this.options)
        opt.url = st.state.url
        opt.title = st.state.title
        opt.history = false
        opt.requestOptions = {}
        opt.scrollPos = st.state.scrollPos
        if (st.state.uid < this.lastUid) {
          opt.backward = true
        }
        else {
          opt.forward = true
        }
        this.lastUid = st.state.uid

        // @todo implement history cache here, based on uid
        this.loadUrl(st.state.url, opt)
      }
    }.bind(this))
  }

Pjax.switches = switches

Pjax.prototype = {
  log: require("./lib/proto/log.js"),

  getElements: function(el) {
    return el.querySelectorAll(this.options.elements)
  },

  parseDOM: function(el) {
    var parseElement = require("./lib/proto/parse-element")
    forEachEls(this.getElements(el), parseElement, this)
  },

  refresh: function(el) {
    this.parseDOM(el || document)
  },

  reload: function() {
    window.location.reload()
  },

  attachLink: require("./lib/proto/attach-link.js"),

  attachForm: require("./lib/proto/attach-form.js"),

  forEachSelectors: function(cb, context, DOMcontext) {
    return require("./lib/foreach-selectors.js").bind(this)(this.options.selectors, cb, context, DOMcontext)
  },

  switchSelectors: function(selectors, fromEl, toEl, options) {
    return require("./lib/switches-selectors.js").bind(this)(this.options.switches, this.options.switchesOptions, selectors, fromEl, toEl, options)
  },

  latestChance: function(href) {
    window.location = href
  },

  onSwitch: function() {
    trigger(window, "resize scroll")

    this.state.numPendingSwitches--

    // debounce calls, so we only run this once after all switches are finished.
    if (this.state.numPendingSwitches === 0) {
      this.afterAllSwitches()
    }
  },

  loadContent: function(html, options) {
    var tmpEl = document.implementation.createHTMLDocument("pjax")

    // parse HTML attributes to copy them
    // since we are forced to use documentElement.innerHTML (outerHTML can't be used for <html>)
    var htmlRegex = /<html[^>]+>/gi
    var htmlAttribsRegex = /\s?[a-z:]+(?:\=(?:\'|\")[^\'\">]+(?:\'|\"))*/gi
    var matches = html.match(htmlRegex)
    if (matches && matches.length) {
      matches = matches[0].match(htmlAttribsRegex)
      if (matches.length) {
        matches.shift()
        matches.forEach(function(htmlAttrib) {
          var attr = htmlAttrib.trim().split("=")
          if (attr.length === 1) {
            tmpEl.documentElement.setAttribute(attr[0], true)
          }
          else {
            tmpEl.documentElement.setAttribute(attr[0], attr[1].slice(1, -1))
          }
        })
      }
    }

    tmpEl.documentElement.innerHTML = html
    this.log("load content", tmpEl.documentElement.attributes, tmpEl.documentElement.innerHTML.length)

    // Clear out any focused controls before inserting new page contents.
    if (document.activeElement && contains(this.options.selectors, document.activeElement)) {
      try {
        document.activeElement.blur()
      } catch (e) { }
    }

    this.switchSelectors(this.options.selectors, tmpEl, document, options)
  },

  abortRequest: require("./lib/abort-request.js"),

  doRequest: require("./lib/send-request.js"),

  loadUrl: function(href, options) {
    this.log("load href", href, options)

    // Abort any previous request
    this.abortRequest(this.request)

    trigger(document, "pjax:send", options)

    // Do the request
    options.requestOptions.timeout = this.options.timeout
    this.request = this.doRequest(href, options.requestOptions, function(html, request) {
      // Fail if unable to load HTML via AJAX
      if (html === false) {
        trigger(document, "pjax:complete pjax:error", options)

        return
      }

      // push scroll position to history
      var currentState = window.history.state || {}
      window.history.replaceState({
          url: currentState.url || window.location.href,
          title: currentState.title || document.title,
          uid: currentState.uid || newUid(),
          scrollPos: [document.documentElement.scrollLeft || document.body.scrollLeft,
            document.documentElement.scrollTop || document.body.scrollTop]
        },
        document.title, window.location)

      var oldHref = href
      if (request.responseURL) {
        if (href !== request.responseURL) {
          href = request.responseURL
        }
      }
      else if (request.getResponseHeader("X-PJAX-URL")) {
        href = request.getResponseHeader("X-PJAX-URL")
      }
      else if (request.getResponseHeader("X-XHR-Redirected-To")) {
        href = request.getResponseHeader("X-XHR-Redirected-To")
      }

      // Add back the hash if it was removed
      var a = document.createElement("a")
      a.href = oldHref
      var oldHash = a.hash
      a.href = href
      if (oldHash && !a.hash) {
        a.hash = oldHash
        href = a.href
      }

      this.state.href = href
      this.state.options = clone(options)

      try {
        this.loadContent(html, options)
      }
      catch (e) {
        if (!this.options.debug) {
          if (console && console.error) {
            console.error("Pjax switch fail: ", e)
          }
          return this.latestChance(href)
        }
        else {
          throw e
        }
      }
    }.bind(this))
  },

  afterAllSwitches: function() {
    // FF bug: Won’t autofocus fields that are inserted via JS.
    // This behavior is incorrect. So if theres no current focus, autofocus
    // the last field.
    //
    // http://www.w3.org/html/wg/drafts/html/master/forms.html
    var autofocusEl = Array.prototype.slice.call(document.querySelectorAll("[autofocus]")).pop()
    if (autofocusEl && document.activeElement !== autofocusEl) {
      autofocusEl.focus()
    }

    // execute scripts when DOM have been completely updated
    this.options.selectors.forEach(function(selector) {
      forEachEls(document.querySelectorAll(selector), function(el) {
        executeScripts(el)
      })
    })

    var state = this.state

    if (state.options.history) {
      if (!window.history.state) {
        this.lastUid = this.maxUid = newUid()
        window.history.replaceState({
            url: window.location.href,
            title: document.title,
            uid: this.maxUid,
            scrollPos: [0, 0]
          },
          document.title)
      }

      // Update browser history
      this.lastUid = this.maxUid = newUid()

      window.history.pushState({
          url: state.href,
          title: state.options.title,
          uid: this.maxUid,
          scrollPos: [0, 0]
        },
        state.options.title,
        state.href)
    }

    this.forEachSelectors(function(el) {
      this.parseDOM(el)
    }, this)

    // Fire Events
    trigger(document,"pjax:complete pjax:success", state.options)

    if (typeof state.options.analytics === "function") {
      state.options.analytics()
    }

    if (state.options.history) {
      // First parse url and check for hash to override scroll
      var a = document.createElement("a")
      a.href = this.state.href
      if (a.hash) {
        var name = a.hash.slice(1)
        name = decodeURIComponent(name)

        var curtop = 0
        var target = document.getElementById(name) || document.getElementsByName(name)[0]
        if (target) {
          // http://stackoverflow.com/questions/8111094/cross-browser-javascript-function-to-find-actual-position-of-an-element-in-page
          if (target.offsetParent) {
            do {
              curtop += target.offsetTop

              target = target.offsetParent
            } while (target)
          }
        }
        window.scrollTo(0, curtop)
      }
      else if (state.options.scrollTo !== false) {
        // Scroll page to top on new page load
        if (state.options.scrollTo.length > 1) {
          window.scrollTo(state.options.scrollTo[0], state.options.scrollTo[1])
        }
        else {
          window.scrollTo(0, state.options.scrollTo)
        }
      }
    }
    else if (state.options.scrollRestoration && state.options.scrollPos) {
      window.scrollTo(state.options.scrollPos[0], state.options.scrollPos[1])
    }

    this.state = {
      numPendingSwitches: 0,
      href: null,
      options: null
    }
  }
}

Pjax.isSupported = require("./lib/is-supported.js")

// arguably could do `if( require("./lib/is-supported.js")()) {` but that might be a little to simple
if (Pjax.isSupported()) {
  module.exports = Pjax
}
// if there isn’t required browser functions, returning stupid api
else {
  var stupidPjax = noop
  for (var key in Pjax.prototype) {
    if (Pjax.prototype.hasOwnProperty(key) && typeof Pjax.prototype[key] === "function") {
      stupidPjax[key] = noop
    }
  }

  module.exports = stupidPjax
}

},{"./lib/abort-request.js":2,"./lib/clone.js":3,"./lib/events/on.js":5,"./lib/events/trigger.js":6,"./lib/execute-scripts.js":7,"./lib/foreach-els.js":8,"./lib/foreach-selectors.js":9,"./lib/is-supported.js":10,"./lib/proto/attach-form.js":11,"./lib/proto/attach-link.js":12,"./lib/proto/log.js":13,"./lib/proto/parse-element":14,"./lib/proto/parse-options.js":15,"./lib/send-request.js":16,"./lib/switches":18,"./lib/switches-selectors.js":17,"./lib/uniqueid.js":19,"./lib/util/contains.js":20,"./lib/util/noop":21}],2:[function(require,module,exports){
var noop = require("./util/noop")

module.exports = function(request) {
  if (request && request.readyState < 4) {
    request.onreadystatechange = noop
    request.abort()
  }
}

},{"./util/noop":21}],3:[function(require,module,exports){
module.exports = function(obj) {
  if (null === obj || "object" !== typeof obj) {
    return obj
  }
  var copy = obj.constructor()
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) {
      copy[attr] = obj[attr]
    }
  }
  return copy
}

},{}],4:[function(require,module,exports){
module.exports = function(el) {
  var code = (el.text || el.textContent || el.innerHTML || "")
  var src = (el.src || "")
  var parent = el.parentNode || document.querySelector("head") || document.documentElement
  var script = document.createElement("script")

  if (code.match("document.write")) {
    if (console && console.log) {
      console.log("Script contains document.write. Can’t be executed correctly. Code skipped ", el)
    }
    return false
  }

  script.type = "text/javascript"

  if (src !== "") {
    script.src = src
    script.async = false // force synchronous loading of peripheral JS
  }

  if (code !== "") {
    try {
      script.appendChild(document.createTextNode(code))
    }
    catch (e) {
      // old IEs have funky script nodes
      script.text = code
    }
  }

  // execute
  parent.appendChild(script)
  // avoid pollution only in head or body tags
  if (["head", "body"].indexOf(parent.tagName.toLowerCase()) > 0) {
    parent.removeChild(script)
  }

  return true
}

},{}],5:[function(require,module,exports){
var forEachEls = require("../foreach-els")

module.exports = function(els, events, listener, useCapture) {
  events = (typeof events === "string" ? events.split(" ") : events)

  events.forEach(function(e) {
    forEachEls(els, function(el) {
      el.addEventListener(e, listener, useCapture)
    })
  })
}

},{"../foreach-els":8}],6:[function(require,module,exports){
var forEachEls = require("../foreach-els")

module.exports = function(els, events, opts) {
  events = (typeof events === "string" ? events.split(" ") : events)

  events.forEach(function(e) {
    var event
    event = document.createEvent("HTMLEvents")
    event.initEvent(e, true, true)
    event.eventName = e
    if (opts) {
      Object.keys(opts).forEach(function(key) {
        event[key] = opts[key]
      })
    }

    forEachEls(els, function(el) {
      var domFix = false
      if (!el.parentNode && el !== document && el !== window) {
        // THANK YOU IE (9/10/11)
        // dispatchEvent doesn't work if the element is not in the DOM
        domFix = true
        document.body.appendChild(el)
      }
      el.dispatchEvent(event)
      if (domFix) {
        el.parentNode.removeChild(el)
      }
    })
  })
}

},{"../foreach-els":8}],7:[function(require,module,exports){
var forEachEls = require("./foreach-els")
var evalScript = require("./eval-script")
// Finds and executes scripts (used for newly added elements)
// Needed since innerHTML does not run scripts
module.exports = function(el) {
  if (el.tagName.toLowerCase() === "script") {
    evalScript(el)
  }

  forEachEls(el.querySelectorAll("script"), function(script) {
    if (!script.type || script.type.toLowerCase() === "text/javascript") {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      evalScript(script)
    }
  })
}

},{"./eval-script":4,"./foreach-els":8}],8:[function(require,module,exports){
/* global HTMLCollection: true */

module.exports = function(els, fn, context) {
  if (els instanceof HTMLCollection || els instanceof NodeList || els instanceof Array) {
    return Array.prototype.forEach.call(els, fn, context)
  }
  // assume simple DOM element
  return fn.call(context, els)
}

},{}],9:[function(require,module,exports){
var forEachEls = require("./foreach-els")

module.exports = function(selectors, cb, context, DOMcontext) {
  DOMcontext = DOMcontext || document
  selectors.forEach(function(selector) {
    forEachEls(DOMcontext.querySelectorAll(selector), cb, context)
  })
}

},{"./foreach-els":8}],10:[function(require,module,exports){
module.exports = function() {
  // Borrowed wholesale from https://github.com/defunkt/jquery-pjax
  return window.history &&
    window.history.pushState &&
    window.history.replaceState &&
    // pushState isn’t reliable on iOS until 5.
    !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/)
}

},{}],11:[function(require,module,exports){
var on = require("../events/on")
var clone = require("../clone")

var attrClick = "data-pjax-click-state"

var formAction = function(el, event) {
  // Since loadUrl modifies options and we may add our own modifications below,
  // clone it so the changes don't persist
  var options = clone(this.options)

  // Initialize requestOptions
  options.requestOptions = {
    requestUrl: el.getAttribute("action") || window.location.href,
    requestMethod: el.getAttribute("method") || "GET"
  }

  // create a testable virtual link of the form action
  var virtLinkElement = document.createElement("a")
  virtLinkElement.setAttribute("href", options.requestOptions.requestUrl)

  // Ignore external links.
  if (virtLinkElement.protocol !== window.location.protocol || virtLinkElement.host !== window.location.host) {
    el.setAttribute(attrClick, "external")
    return
  }

  // Ignore click if we are on an anchor on the same page
  if (virtLinkElement.pathname === window.location.pathname && virtLinkElement.hash.length > 0) {
    el.setAttribute(attrClick, "anchor-present")
    return
  }

  // Ignore empty anchor "foo.html#"
  if (virtLinkElement.href === window.location.href.split("#")[0] + "#") {
    el.setAttribute(attrClick, "anchor-empty")
    return
  }

  // if declared as a full reload, just normally submit the form
  if (options.currentUrlFullReload) {
    el.setAttribute(attrClick, "reload")
    return
  }

  event.preventDefault()

  var paramObject = []
  for (var elementKey in el.elements) {
    var element = el.elements[elementKey]
    // jscs:disable disallowImplicitTypeConversion
    if (!!element.name && element.attributes !== undefined && element.tagName.toLowerCase() !== "button") {
      // jscs:enable disallowImplicitTypeConversion
      if ((element.attributes.type !== "checkbox" && element.attributes.type !== "radio") || element.checked) {
        paramObject.push({name: encodeURIComponent(element.name), value: encodeURIComponent(element.value)})
      }
    }
  }

  // Creating a getString
  var paramsString = (paramObject.map(function(value) {return value.name + "=" + value.value})).join("&")

  options.requestOptions.requestPayload = paramObject
  options.requestOptions.requestPayloadString = paramsString

  el.setAttribute(attrClick, "submit")

  options.triggerElement = el
  this.loadUrl(virtLinkElement.href, options)
}

var isDefaultPrevented = function(event) {
  return event.defaultPrevented || event.returnValue === false
}

module.exports = function(el) {
  var that = this

  on(el, "submit", function(event) {
    if (isDefaultPrevented(event)) {
      return
    }

    formAction.call(that, el, event)
  })

  on(el, "keyup", function(event) {
    if (isDefaultPrevented(event)) {
      return
    }

    if (event.keyCode === 13) {
      formAction.call(that, el, event)
    }
  }.bind(this))
}

},{"../clone":3,"../events/on":5}],12:[function(require,module,exports){
var on = require("../events/on")
var clone = require("../clone")

var attrClick = "data-pjax-click-state"
var attrKey = "data-pjax-keyup-state"

var linkAction = function(el, event) {
  // Since loadUrl modifies options and we may add our own modifications below,
  // clone it so the changes don't persist
  var options = clone(this.options)

  // Initialize requestOptions since loadUrl expects it to be an object
  options.requestOptions = {}

  // Don’t break browser special behavior on links (like page in new window)
  if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    el.setAttribute(attrClick, "modifier")
    return
  }

  // we do test on href now to prevent unexpected behavior if for some reason
  // user have href that can be dynamically updated

  // Ignore external links.
  if (el.protocol !== window.location.protocol || el.host !== window.location.host) {
    el.setAttribute(attrClick, "external")
    return
  }

  // Ignore click if we are on an anchor on the same page
  if (el.pathname === window.location.pathname && el.hash.length > 0) {
    el.setAttribute(attrClick, "anchor-present")
    return
  }

  // Ignore anchors on the same page (keep native behavior)
  if (el.hash && el.href.replace(el.hash, "") === window.location.href.replace(location.hash, "")) {
    el.setAttribute(attrClick, "anchor")
    return
  }

  // Ignore empty anchor "foo.html#"
  if (el.href === window.location.href.split("#")[0] + "#") {
    el.setAttribute(attrClick, "anchor-empty")
    return
  }

  event.preventDefault()

  // don’t do "nothing" if user try to reload the page by clicking the same link twice
  if (
    this.options.currentUrlFullReload &&
    el.href === window.location.href.split("#")[0]
  ) {
    el.setAttribute(attrClick, "reload")
    this.reload()
    return
  }

  el.setAttribute(attrClick, "load")

  options.triggerElement = el
  this.loadUrl(el.href, options)
}

var isDefaultPrevented = function(event) {
  return event.defaultPrevented || event.returnValue === false
}

module.exports = function(el) {
  var that = this

  on(el, "click", function(event) {
    if (isDefaultPrevented(event)) {
      return
    }

    linkAction.call(that, el, event)
  })

  on(el, "keyup", function(event) {
    if (isDefaultPrevented(event)) {
      return
    }

    // Don’t break browser special behavior on links (like page in new window)
    if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      el.setAttribute(attrKey, "modifier")
      return
    }

    if (event.keyCode === 13) {
      linkAction.call(that, el, event)
    }
  }.bind(this))
}

},{"../clone":3,"../events/on":5}],13:[function(require,module,exports){
module.exports = function() {
  if (this.options.debug && console) {
    if (typeof console.log === "function") {
      console.log.apply(console, arguments)
    }
    // IE is weird
    else if (console.log) {
      console.log(arguments)
    }
  }
}

},{}],14:[function(require,module,exports){
module.exports = function(el) {
  switch (el.tagName.toLowerCase()) {
    case "a":
      // only attach link if el does not already have link attached
      if (!el.hasAttribute("data-pjax-click-state")) {
        this.attachLink(el)
      }
      break

    case "form":
      // only attach link if el does not already have link attached
      if (!el.hasAttribute("data-pjax-click-state")) {
        this.attachForm(el)
      }
      break

    default:
      throw "Pjax can only be applied on <a> or <form> submit"
  }
}

},{}],15:[function(require,module,exports){
/* global _gaq: true, ga: true */

var defaultSwitches = require("../switches")

module.exports = function(options) {
  options = options || {}
  options.elements = options.elements || "a[href], form[action]"
  options.selectors = options.selectors || ["title", ".js-Pjax"]
  options.switches = options.switches || {}
  options.switchesOptions = options.switchesOptions || {}
  options.history = options.history || true
  options.analytics = (typeof options.analytics === "function" || options.analytics === false) ?
    options.analytics :
    function() {
      if (window._gaq) {
        _gaq.push(["_trackPageview"])
      }
      if (window.ga) {
        ga("send", "pageview", {page: location.pathname, title: document.title})
      }
    }
  options.scrollTo = (typeof options.scrollTo === "undefined") ? 0 : options.scrollTo
  options.scrollRestoration = (typeof options.scrollRestoration !== "undefined") ? options.scrollRestoration : true
  options.cacheBust = (typeof options.cacheBust === "undefined") ? true : options.cacheBust
  options.debug = options.debug || false
  options.timeout = options.timeout || 0
  options.currentUrlFullReload = (typeof options.currentUrlFullReload === "undefined") ? false : options.currentUrlFullReload

  // We can’t replace body.outerHTML or head.outerHTML.
  // It creates a bug where a new body or head are created in the DOM.
  // If you set head.outerHTML, a new body tag is appended, so the DOM has 2 body nodes, and vice versa
  if (!options.switches.head) {
    options.switches.head = defaultSwitches.switchElementsAlt
  }
  if (!options.switches.body) {
    options.switches.body = defaultSwitches.switchElementsAlt
  }

  this.options = options
}

},{"../switches":18}],16:[function(require,module,exports){
module.exports = function(location, options, callback) {
  options = options || {}
  var requestMethod = options.requestMethod || "GET"
  var requestPayload = options.requestPayloadString || null
  var request = new XMLHttpRequest()

  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        callback(request.responseText, request)
      }
      else {
        callback(null, request)
      }
    }
  }

  request.onerror = function(e) {
    console.log(e)
    callback(null, request)
  }

  request.ontimeout = function() {
    callback(null, request)
  }

  // Add a timestamp as part of the query string if cache busting is enabled
  if (this.options.cacheBust) {
    location += (!/[?&]/.test(location) ? "?" : "&") + new Date().getTime()
  }

  request.open(requestMethod.toUpperCase(), location, true)
  request.timeout = options.timeout
  request.setRequestHeader("X-Requested-With", "XMLHttpRequest")
  request.setRequestHeader("X-PJAX", "true")

  // Add the request payload if available
  if (options.requestPayloadString !== undefined && options.requestPayloadString !== "") {
    // Send the proper header information along with the request
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  }

  request.send(requestPayload)

  return request
}

},{}],17:[function(require,module,exports){
var forEachEls = require("./foreach-els")

var defaultSwitches = require("./switches")

module.exports = function(switches, switchesOptions, selectors, fromEl, toEl, options) {
  var switchesQueue = []

  selectors.forEach(function(selector) {
    var newEls = fromEl.querySelectorAll(selector)
    var oldEls = toEl.querySelectorAll(selector)
    if (this.log) {
      this.log("Pjax switch", selector, newEls, oldEls)
    }
    if (newEls.length !== oldEls.length) {
      throw "DOM doesn’t look the same on new loaded page: ’" + selector + "’ - new " + newEls.length + ", old " + oldEls.length
    }

    forEachEls(newEls, function(newEl, i) {
      var oldEl = oldEls[i]
      if (this.log) {
        this.log("newEl", newEl, "oldEl", oldEl)
      }

      var callback = (switches[selector]) ?
        switches[selector].bind(this, oldEl, newEl, options, switchesOptions[selector]) :
        defaultSwitches.outerHTML.bind(this, oldEl, newEl, options)

      switchesQueue.push(callback)
    }, this)
  }, this)

  this.state.numPendingSwitches = switchesQueue.length

  switchesQueue.forEach(function(queuedSwitch) {
    queuedSwitch()
  })
}

},{"./foreach-els":8,"./switches":18}],18:[function(require,module,exports){
var on = require("./events/on.js")

module.exports = {
  outerHTML: function(oldEl, newEl) {
    oldEl.outerHTML = newEl.outerHTML
    this.onSwitch()
  },

  innerHTML: function(oldEl, newEl) {
    oldEl.innerHTML = newEl.innerHTML
    oldEl.className = newEl.className
    this.onSwitch()
  },

  switchElementsAlt: function(oldEl, newEl) {
    oldEl.innerHTML = newEl.innerHTML

    // Copy attributes from the new element to the old one
    if (newEl.hasAttributes()) {
      var attrs = newEl.attributes
      for (var i = 0; i < attrs.length; i++) {
        oldEl.attributes.setNamedItem(attrs[i].cloneNode())
      }
    }

    this.onSwitch()
  },

  sideBySide: function(oldEl, newEl, options, switchOptions) {
    var forEach = Array.prototype.forEach
    var elsToRemove = []
    var elsToAdd = []
    var fragToAppend = document.createDocumentFragment()
    var animationEventNames = "animationend webkitAnimationEnd MSAnimationEnd oanimationend"
    var animatedElsNumber = 0
    var sexyAnimationEnd = function(e) {
          if (e.target !== e.currentTarget) {
            // end triggered by an animation on a child
            return
          }

          animatedElsNumber--
          if (animatedElsNumber <= 0 && elsToRemove) {
            elsToRemove.forEach(function(el) {
              // browsing quickly can make the el
              // already removed by last page update ?
              if (el.parentNode) {
                el.parentNode.removeChild(el)
              }
            })

            elsToAdd.forEach(function(el) {
              el.className = el.className.replace(el.getAttribute("data-pjax-classes"), "")
              el.removeAttribute("data-pjax-classes")
            })

            elsToAdd = null // free memory
            elsToRemove = null // free memory

            // this is to trigger some repaint (example: picturefill)
            this.onSwitch()
          }
        }.bind(this)

    switchOptions = switchOptions || {}

    forEach.call(oldEl.childNodes, function(el) {
      elsToRemove.push(el)
      if (el.classList && !el.classList.contains("js-Pjax-remove")) {
        // for fast switch, clean element that just have been added, & not cleaned yet.
        if (el.hasAttribute("data-pjax-classes")) {
          el.className = el.className.replace(el.getAttribute("data-pjax-classes"), "")
          el.removeAttribute("data-pjax-classes")
        }
        el.classList.add("js-Pjax-remove")
        if (switchOptions.callbacks && switchOptions.callbacks.removeElement) {
          switchOptions.callbacks.removeElement(el)
        }
        if (switchOptions.classNames) {
          el.className += " " + switchOptions.classNames.remove + " " + (options.backward ? switchOptions.classNames.backward : switchOptions.classNames.forward)
        }
        animatedElsNumber++
        on(el, animationEventNames, sexyAnimationEnd, true)
      }
    })

    forEach.call(newEl.childNodes, function(el) {
      if (el.classList) {
        var addClasses = ""
        if (switchOptions.classNames) {
          addClasses = " js-Pjax-add " + switchOptions.classNames.add + " " + (options.backward ? switchOptions.classNames.forward : switchOptions.classNames.backward)
        }
        if (switchOptions.callbacks && switchOptions.callbacks.addElement) {
          switchOptions.callbacks.addElement(el)
        }
        el.className += addClasses
        el.setAttribute("data-pjax-classes", addClasses)
        elsToAdd.push(el)
        fragToAppend.appendChild(el)
        animatedElsNumber++
        on(el, animationEventNames, sexyAnimationEnd, true)
      }
    })

    // pass all className of the parent
    oldEl.className = newEl.className
    oldEl.appendChild(fragToAppend)
  }
}

},{"./events/on.js":5}],19:[function(require,module,exports){
module.exports = (function() {
  var counter = 0
  return function() {
    var id = ("pjax" + (new Date().getTime())) + "_" + counter
    counter++
    return id
  }
})()

},{}],20:[function(require,module,exports){
module.exports = function contains(doc, selectors, el) {
  for (var i = 0; i < selectors.length; i++) {
    var selectedEls = doc.querySelectorAll(selectors[i])
    for (var j = 0; j < selectedEls.length; j++) {
      if (selectedEls[j].contains(el)) {
        return true
      }
    }
  }

  return false
}

},{}],21:[function(require,module,exports){
module.exports = function() {}

},{}]},{},[1])(1)
});