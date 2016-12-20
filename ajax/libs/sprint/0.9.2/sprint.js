/*
 * Sprint JavaScript Library v0.9.2
 * http://sprintjs.com
 *
 * Copyright (c) 2014, 2015 Benjamin De Cock
 * Released under the MIT license
 * http://sprintjs.com/license
 */

var Sprint;

(function() {
  "use strict";

  var addEventListeners = function(listeners, el) {
    var sprintClone = Sprint(el)
    var events = Object.keys(listeners)
    var eventsLen = events.length

    for (var i = 0; i < eventsLen; i++) {
      var event = events[i]
      var handlers = listeners[event]
      var handlersLen = handlers.length

      for (var j = 0; j < handlersLen; j++) {
        sprintClone.on(event, handlers[j])
      }
    }
  }

  var addPx = (function() {
    var noPx = [
      "animation-iteration-count",
      "column-count",
      "flex-grow",
      "flex-shrink",
      "font-weight",
      "line-height",
      "opacity",
      "order",
      "orphans",
      "widows",
      "z-index"
    ]
    return function addPx(cssProperty, value) {
      if (inArray(cssProperty, noPx)) return value
      var stringValue = typeof value == "string" ? value : value.toString()
      if (value && !/\D/.test(stringValue)) {
        stringValue += "px"
      }
      return stringValue
    }
  }())

  var createDOM = function(HTMLString) {
    var tmp = document.createElement("div")
    var tag = /[\w:-]+/.exec(HTMLString)[0]
    var inMap = wrapMap[tag]
    var validHTML = HTMLString.trim()
    if (inMap) {
      validHTML = inMap.intro + validHTML + inMap.outro
    }
    tmp.insertAdjacentHTML("afterbegin", validHTML)
    var node = tmp.lastChild
    if (inMap) {
      var i = inMap.outro.match(/</g).length
      while (i--) {
        node = node.lastChild
      }
    }
    // prevent tmp to be node's parentNode
    tmp.textContent = ""
    return node
  }

  var domMethods = {
    afterbegin: function(el) {
      this.insertBefore(el, this.firstChild)
    },
    afterend: function(el) {
      var parent = this.parentElement
      parent && parent.insertBefore(el, this.nextSibling)
    },
    beforebegin: function(el) {
      var parent = this.parentElement
      parent && parent.insertBefore(el, this)
    },
    beforeend: function(el) {
      this.appendChild(el)
    }
  }

  var duplicateEventListeners = function(el, clone) {
    // Element nodes only
    if (el.nodeType > 1) return

    // Duplicate event listeners for the parent element...
    var listeners = getEvents(el)
    listeners && addEventListeners(listeners, clone)

    // ... and its descendants.
    var descendants = selectElements("*", el)
    var descendantsLen = descendants.length

    // cloneDescendants is defined later to avoid calling selectElements() if not needed
    var cloneDescendants

    for (var i = 0; i < descendantsLen; i++) {
      var listeners = getEvents(descendants[i])
      if (!listeners) continue
      if (!cloneDescendants) {
        cloneDescendants = selectElements("*", clone)
      }
      addEventListeners(listeners, cloneDescendants[i])
    }
  }

  var findAncestors = function(startAtParent, limitToParent, limitToFirstMatch, selector, context) {
    var dom = []
    var self = this
    this.each(function() {
      var prt = startAtParent ? this.parentElement : this
      while (prt) {
        if (context && context == prt) break
        if (!selector || self.is(selector, prt)) {
          dom.push(prt)
          if (limitToFirstMatch) break
        }
        if (limitToParent) break
        prt = prt.parentElement
      }
    })
    return Sprint(removeDuplicates(dom))
  }

  var getEventFromNamespace = function(event) {
    return splitNamespaces(event)[0]
  }

  var getEvents = function(domElement) {
    return domElement.sprintEventListeners
  }

  var getEventsToRemove = function(domElement, event) {
    /*
     * Returns an array with the sprintEventListeners events matching potentially
     * incomplete event names passed to .off().
     * Example: .off("click.myPlugin") and .off("click.simple") would both remove a
     * "click.myPlugin.simple" event.
     */
    return Object.keys(getEvents(domElement)).filter(function(prop) {
      return splitNamespaces(event).every(function(name) {
        return inArray(name, splitNamespaces(prop))
      })
    })
  }

  var getSetDimension = function(obj, prop, value) {
    // get
    if (value == null) {
      var el = obj.get(0)
      if (!el || el.nodeType > 1) return
      var capitalizedProp = prop[0].toUpperCase() + prop.substring(1)
      // dimension of HTML document
      if (el == document) {
        var offset = root["offset" + capitalizedProp]
        var inner = window["inner" + capitalizedProp]
        return offset > inner ? offset : inner
      }
      // dimension of viewport
      if (el == window) {
        return window["inner" + capitalizedProp]
      }
      // dimension of element
      return el.getBoundingClientRect()[prop]
    }

    // set
    var isFunction = typeof value == "function"
    var stringValue = isFunction ? "" : addPx(prop, value)
    return obj.each(function(index) {
      if (this == document || this == window || this.nodeType > 1) return
      if (isFunction) {
        stringValue = addPx(prop, value.call(this, index, Sprint(this)[prop]()))
      }
      this.style[prop] = stringValue
    })
  }

  var insertHTML = function(position, args) {
    var argsLen = args.length
    var contents = args

    // reverse argument list for afterbegin and afterend
    if (argsLen > 1 && position.indexOf("after") > -1) {
      contents = []
      var i = argsLen
      while (i--) {
        contents.push(args[i])
      }
    }

    for (var i = 0; i < argsLen; i++) {
      var content = contents[i]
      if (typeof content == "string" || typeof content == "number") {
        this.each(function() {
          this.insertAdjacentHTML(position, content)
        })
      }
      else if (typeof content == "function") {
        this.each(function(index) {
          var callbackValue = content.call(this, index, this.innerHTML)
          insertHTML.call(Sprint(this), position, [callbackValue])
        })
      }
      else {
        var isSprintObj = content instanceof Init
        var clonedElements = []
        var elementsToInsert = (function() {
          if (isSprintObj) {
            return content.get()
          }
          if (Array.isArray(content)) {
            return sanitize(content, true, true)
          }
          // DOM node
          if (content.nodeType) {
            return [content]
          }
          // getElementsByTagName, getElementsByClassName, querySelectorAll
          return toArray(content)
        }())
        var elementsToInsertLen = elementsToInsert.length

        this.each(function(index) {
          /*
           * The fragment serves multiple purposes:
           * 1) It significantly boosts perf when multiple elements are added.
           * 2) It avoids the need for elementsToInsert.reverse() for afterbegin and afterend
           * 3) It removes an element from its original position before adding it back, which is
           * especially useful for elements not part of the DOM tree. That means it's important even
           * when elementsToInsertLen == 1.
           */
          var fragment = document.createDocumentFragment()
          for (var i = 0; i < elementsToInsertLen; i++) {
            var element = elementsToInsert[i]
            var elementToInsert
            if (index) {
              elementToInsert = element.cloneNode(true)
              duplicateEventListeners(element, elementToInsert)
            }
            else {
              elementToInsert = element
            }
            fragment.appendChild(elementToInsert)
            clonedElements.push(elementToInsert)
          }
          domMethods[position].call(this, fragment)
        })

        if (isSprintObj) {
          content.dom = clonedElements
          content.length = clonedElements.length
        }
        if (i < argsLen-1) continue
        return clonedElements
      }
    }
  }

  var inArray = function(el, arr) {
    var i = arr.length
    while (i--) {
      if (arr[i] === el) return true
    }
    return false
  }

  var isNamespaced = function(event) {
    return /\./.test(event)
  }

  var manipulateClass = function(method, className, bool) {
    if (className == null) {
      if (method == "add") {
        return this
      }
      return this.removeAttr("class")
    }

    var isString
    var classNames
    var classNamesLen

    if (typeof className == "string") {
      isString = true
      classNames = className.trim().split(" ")
      classNamesLen = classNames.length
    }

    return this.each(function(i, el) {
      if (this.nodeType > 1) return
      if (!isString) {
        // className is a function
        var callbackValue = className.call(el, i, el.className)
        if (!callbackValue) return
        classNames = callbackValue.trim().split(" ")
        classNamesLen = classNames.length
      }
      for (var j = 0; j < classNamesLen; j++) {
        var name = classNames[j]
        if (!name) continue
        bool == null
          ? el.classList[method](name)
          : el.classList.toggle(name, bool)
      }
    })
  }

  var matches = (function() {
    var names = [
      "mozMatchesSelector",
      "webkitMatchesSelector",
      "msMatchesSelector",
      "matches"
    ]
    var i = names.length
    while (i--) {
      var name = names[i]
      if (!Element.prototype[name]) continue
      return name
    }
  }())

  var removeDuplicates = function(arr) {
    var clean = []
    var cleanLen = 0
    var arrLen = arr.length

    for (var i = 0; i < arrLen; i++) {
      var el = arr[i]
      var duplicate = false

      for (var j = 0; j < cleanLen; j++) {
        if (el !== clean[j]) continue
        duplicate = true
        break
      }

      if (duplicate) continue
      clean[cleanLen++] = el
    }

    return clean
  }

  var removeEvent = (function() {
    var isHandlerShared = function(el, event, registeredHandler) {
      var similarEventsHandlers = Object.keys(getEvents(el)).filter(function(prop) {
        return getEventFromNamespace(event) === getEventFromNamespace(prop)
      }).map(function(ev) {
        return getEvents(el)[ev]
      }).reduce(function(a, b) {
        return a.concat(b)
      }).filter(function(handler) {
        return handler === registeredHandler
      })
      if (similarEventsHandlers.length < 2) return false
      return true
    }
    var removeListener = function(el, event, namedHandler) {
      return function(registeredHandler) {
        if (namedHandler && namedHandler !== registeredHandler) return
        el.removeEventListener(event, registeredHandler)
        if (!isNamespaced(event) || isHandlerShared(el, event, registeredHandler)) return
        el.removeEventListener(getEventFromNamespace(event), registeredHandler)
      }
    }
    var clearRegisteredHandlers = function(registeredHandlers, namedHandler) {
      return registeredHandlers.filter(function(handler) {
        return namedHandler && namedHandler !== handler
      })
    }
    return function(el, namedHandler) {
      return function(event) {
        getEvents(el)[event].forEach(removeListener(el, event, namedHandler))
        getEvents(el)[event] = clearRegisteredHandlers(getEvents(el)[event], namedHandler)
      }
    }
  }())

  var removeMatchedEvents = function(el, namedHandler) {
    return function(event) {
      getEventsToRemove(el, event).forEach(removeEvent(el, namedHandler))
    }
  }

  var root = document.documentElement

  var sanitize = function(arr, flattenObjects, requireDomNodes) {
    /*
     * Remove null's from array. Optionally, flatten Sprint objects and convert strings and numbers
     * to DOM text nodes.
     */
    var arrLen = arr.length
    var i = arrLen

    // Check if arr needs to be sanitized first (significant perf boost for the most common case)
    while (i--) {
      // arr needs to be sanitized
      if ( (!arr[i] && arr[i] !== 0)
        || (flattenObjects && arr[i] instanceof Init)
        || (requireDomNodes && (typeof arr[i] == "string" || typeof arr[i] == "number"))
      ) {
        var sanitized = []
        for (var j = 0; j < arrLen; j++) {
          var el = arr[j]
          if (!el && el !== 0) continue
          if (flattenObjects && el instanceof Init) {
            for (var k = 0; k < el.length; k++) {
              sanitized.push(el.get(k))
            }
            continue
          }
          if (requireDomNodes && (typeof el == "string" || typeof el == "number")) {
            sanitized.push(document.createTextNode(el))
            continue
          }
          sanitized.push(el)
        }
        return sanitized
      }
    }

    // arr didn't need to be sanitized, return it
    return arr
  }

  var scroll = (function() {
    var scrollRoot
    return function(sprintObj, method, value) {
      // define scroll root element on first run
      if (!scrollRoot) {
        var initialScrollPos = root.scrollTop
        root.scrollTop = initialScrollPos + 1
        var updatedScrollPos = root.scrollTop
        root.scrollTop = initialScrollPos
        scrollRoot = updatedScrollPos > initialScrollPos
          ? root // spec-compliant browsers (like FF34 and IE11)
          : document.body // naughty boys (like Chrome 39 and Safari 8)
      }

      // get scroll position
      if (value == null) {
        var el = sprintObj.get(0)
        if (!el) return
        if (el == window || el == document) {
          el = scrollRoot
        }
        return el[method]
      }

      // set scroll position
      return sprintObj.each(function() {
        var el = this
        if (el == window || el == document) {
          el = scrollRoot
        }
        el[method] = value
      })
    }
  }())

  var selectAdjacentSiblings = function(sprintObj, direction, selector, until) {
    var dom = []
    var prop = direction + "ElementSibling"
    sprintObj.each(function() {
      var el = this
      while (el = el[prop]) {
        if (until && sprintObj.is(until, el)) break
        if (selector && !sprintObj.is(selector, el)) continue
        dom.push(el)
      }
    })
    return Sprint(removeDuplicates(dom))
  }

  var selectImmediateAdjacentSibling = function(sprintObj, direction, selector) {
    var prop = direction + "ElementSibling"
    return sprintObj.map(function() {
      var el = this[prop]
      if (!el || (selector && !sprintObj.is(selector, el))) return
      return el
    }, false)
  }

  var selectElements = function(selector, context) {
    context = context || document
    // class, id, tag name or universal selector
    if (/^[\#.]?[\w-]+$/.test(selector)) {
      var firstChar = selector[0]
      if (firstChar == ".") {
        return toArray(context.getElementsByClassName(selector.slice(1)))
      }
      if (firstChar == "#") {
        var el = context.getElementById(selector.slice(1))
        return el ? [el] : []
      }
      if (selector == "body") {
        return [document.body]
      }
      return toArray(context.getElementsByTagName(selector))
    }
    return toArray(context.querySelectorAll(selector))
  }

  var splitNamespaces = function(event) {
    return sanitize(event.split("."))
  }

  var toArray = function(obj) {
    var arr = []
    var i = obj.length
    while (i--) {
      arr[i] = obj[i]
    }
    return arr
  }

  var wrap = (function() {
    var callback = function(wrappingElement, variant) {
      var wrap = Sprint(wrappingElement).clone(true).get(0)
      var innerWrap = wrap
      if (!wrap || this.nodeType > 1) return
      while (innerWrap.firstChild) {
        innerWrap = innerWrap.firstChild
      }
      if (variant == "inner") {
        while (this.firstChild) {
          innerWrap.appendChild(this.firstChild)
        }
        this.appendChild(wrap)
      }
      else {
        var el = variant == "all" ? this.get(0) : this
        var prt = el.parentNode
        var next = el.nextSibling
        variant == "all"
          ? this.each(function() { innerWrap.appendChild(this) })
          : innerWrap.appendChild(el)
        prt.insertBefore(wrap, next)
      }
    }
    return function(wrappingElement, variant) {
      if (typeof wrappingElement == "function") {
        this.each(function(i) {
          Sprint(this)[variant == "inner" ? "wrapInner" : "wrap"](wrappingElement.call(this, i))
        })
      }
      else {
        variant == "all"
          ? callback.call(this, wrappingElement, variant)
          : this.each(function() { callback.call(this, wrappingElement, variant) })
      }
      return this
    }
  }())

  var wrapMap = {
    legend: {
      intro: "<fieldset>",
      outro: "</fieldset>"
    },
    area: {
      intro: "<map>",
      outro: "</map>"
    },
    param: {
      intro: "<object>",
      outro: "</object>"
    },
    thead: {
      intro: "<table>",
      outro: "</table>"
    },
    tr: {
      intro: "<table><tbody>",
      outro: "</tbody></table>"
    },
    col: {
      intro: "<table><tbody></tbody><colgroup>",
      outro: "</colgroup></table>"
    },
    td: {
      intro: "<table><tbody><tr>",
      outro: "</tr></tbody></table>"
    }
  };
  // elements needing a construct already defined by other elements
  ["tbody", "tfoot", "colgroup", "caption"].forEach(function(tag) {
    wrapMap[tag] = wrapMap.thead
  })
  wrapMap.th = wrapMap.td

  // constructor

  var Init = function(selector, context) {
    if (typeof selector == "string") {
      // create DOM element
      if (selector[0] == "<") {
        this.dom = [createDOM(selector)]
      }
      // select DOM elements
      else {
        this.dom = context && context instanceof Init
          ? context.find(selector).get()
          : selectElements(selector, context)
      }
    }
    else if (Array.isArray(selector)) {
      this.dom = sanitize(selector)
    }
    else if (
      selector instanceof NodeList ||
      selector instanceof HTMLCollection
    ) {
      this.dom = toArray(selector)
    }
    else if (selector instanceof Init) {
      return selector
    }
    else if (typeof selector == "function") {
      return this.ready(selector)
    }
    else {
      // assume DOM node
      this.dom = selector ? [selector] : []
    }
    this.length = this.dom.length
  }

  Init.prototype = {
    add: function(selector) {
      var dom = this.get()
      var objToAdd = Sprint(selector)
      var domToAdd = objToAdd.get()
      for (var i = 0; i < objToAdd.length; i++) {
        dom.push(domToAdd[i])
      }
      return Sprint(removeDuplicates(dom))
    },
    addClass: function(className) {
      return manipulateClass.call(this, "add", className)
    },
    after: function() {
      insertHTML.call(this, "afterend", arguments)
      return this
    },
    append: function() {
      insertHTML.call(this, "beforeend", arguments)
      return this
    },
    appendTo: function(target) {
      return Sprint(insertHTML.call(Sprint(target), "beforeend", [this]))
    },
    attr: function(name, value) {
      var isFunc = typeof value == "function"
      if (typeof value == "string" || typeof value == "number" || isFunc) {
        return this.each(function(i) {
          if (this.nodeType > 1) return
          this.setAttribute(
            name, isFunc ? value.call(this, i, this.getAttribute(name)) : value
          )
        })
      }
      if (typeof name == "object") {
        var attrNames = Object.keys(name)
        var attrNamesLen = attrNames.length
        return this.each(function() {
          if (this.nodeType > 1) return
          for (var i = 0; i < attrNamesLen; i++) {
            var attribute = attrNames[i]
            this.setAttribute(attribute, name[attribute])
          }
        })
      }
      var el = this.get(0)
      if (!el || el.nodeType > 1) return
      var attrValue = el.getAttribute(name)
      if (attrValue == null) {
        return undefined
      }
      if (!attrValue) {
        return name
      }
      return attrValue
    },
    before: function() {
      insertHTML.call(this, "beforebegin", arguments)
      return this
    },
    children: function(selector) {
      var dom = []
      var self = this
      this.each(function() {
        if (this.nodeType > 1) return
        var nodes = this.children
        var nodesLen = nodes.length
        for (var i = 0; i < nodesLen; i++) {
          var node = nodes[i]
          if (!selector || self.is(selector, node)) {
            dom.push(node)
          }
        }
      })
      return Sprint(dom)
    },
    clone: function(withEvents) {
      return this.map(function() {
        if (!this) return
        var clone = this.cloneNode(true)
        withEvents && duplicateEventListeners(this, clone)
        return clone
      }, false)
    },
    closest: function(selector, context) {
      return findAncestors.call(this, false, false, true, selector, context)
    },
    css: function(property, value) {
      var valueType = typeof value
      var isString = valueType == "string"

      // set
      if (isString || valueType == "number") {
        var isRelativeValue = isString && /=/.test(value)
        if (isRelativeValue) {
          var relativeValue = parseInt(value[0] + value.slice(2))
        }
        return this.each(function() {
          if (this.nodeType > 1) return
          if (isRelativeValue) {
            var current = parseInt(getComputedStyle(this).getPropertyValue(property))
            var result = current + relativeValue
          }
          this.style[property] = addPx(property, isRelativeValue ? result : value)
        })
      }
      // set
      if (valueType == "function") {
        return this.each(function(index) {
          if (this.nodeType > 1) return
          var oldValue = getComputedStyle(this).getPropertyValue(property)
          this.style[property] = value.call(this, index, oldValue)
        })
      }
      // read
      if (typeof property == "string") {
        var el = this.get(0)
        if (!el || el.nodeType > 1) return
        return getComputedStyle(el).getPropertyValue(property)
      }
      // read
      if (Array.isArray(property)) {
        var el = this.get(0)
        if (!el || el.nodeType > 1) return
        var o = {}
        var styles = getComputedStyle(el)
        var propertyLen = property.length
        for (var i = 0; i < propertyLen; i++) {
          var prop = property[i]
          o[prop] = styles.getPropertyValue(prop)
        }
        return o
      }
      // set
      var properties = Object.keys(property)
      var propertiesLen = properties.length
      return this.each(function() {
        if (this.nodeType > 1) return
        for (var i = 0; i < propertiesLen; i++) {
          var prop = properties[i]
          this.style[prop] = addPx(prop, property[prop])
        }
      })
    },
    detach: function() {
      return this.map(function() {
        var parent = this.parentElement
        if (!parent) return
        parent.removeChild(this)
        return this
      }, false)
    },
    each: function(callback) {
      // callback(index, element) where element == this
      var dom = this.dom
      var len = this.length
      for (var i = 0; i < len; i++) {
        var node = dom[i]
        callback.call(node, i, node)
      }
      return this
    },
    empty: function() {
      return this.each(function() {
        this.innerHTML = ""
      })
    },
    eq: function(index) {
      return Sprint(this.get(index))
    },
    filter: function(selector) {
      var isFunc = typeof selector == "function"
      var self = this
      return this.map(function(i) {
        if ( this.nodeType > 1
          || (!isFunc && !self.is(selector, this))
          || (isFunc && !selector.call(this, i, this))
        ) return
        return this
      }, false)
    },
    find: function(selector) {
      // .find(selector)
      if (typeof selector == "string") {
        var dom = []
        this.each(function() {
          if (this.nodeType > 1) return
          var elements = selectElements(selector, this)
          var elementsLen = elements.length
          for (var i = 0; i < elementsLen; i++) {
            dom.push(elements[i])
          }
        })
        return Sprint(removeDuplicates(dom))
      }

      // .find(element)
      var elementsToFind = selector.nodeType ? [selector] : selector.get()
      var elementsToFindLen = elementsToFind.length
      var elementsFound = []
      var elementsFoundLen = 0

      for (var i = 0; i < this.length; i++) {
        var el = this.get(i)
        if (el.nodeType > 1) continue
        // check if each element in `this` contains the elements to find
        for (var j = 0; j < elementsToFindLen; j++) {
          var elementToFind = elementsToFind[j]
          if (!el.contains(elementToFind)) continue
          elementsFound[elementsFoundLen++] = elementToFind
          if (elementsFoundLen < elementsToFindLen) continue
          // everything has been found, return results
          return Sprint(elementsFound)
        }
      }

      // some elements in elementsToFind weren't descendants of `this`
      return Sprint(elementsFound)
    },
    first: function() {
      return this.eq(0)
    },
    get: function(index) {
      if (index == null) {
        return this.dom
      }
      if (index < 0) {
        index += this.length
      }
      return this.dom[index]
    },
    has: function(selector) {
      // .has(selector)
      if (typeof selector == "string") {
        return this.map(function() {
          if (this.nodeType > 1 || !selectElements(selector, this)[0]) return
          return this
        }, false)
      }

      // .has(contained)
      var result = []
      var i = this.length
      while (i--) {
        var el = this.get(i)
        if (!el.contains(selector)) continue
        result.push(el)
        break
      }
      return Sprint(result)
    },
    hasClass: function(name) {
      var i = this.length
      while (i--) {
        var el = this.get(i)
        if (el.nodeType > 1) return
        if (el.classList.contains(name)) {
          return true
        }
      }
      return false
    },
    height: function(value) {
      return getSetDimension(this, "height", value)
    },
    html: function(htmlString) {
      if (htmlString == null) {
        var el = this.get(0)
        if (!el) return
        return el.innerHTML
      }
      if (typeof htmlString == "function") {
        return this.each(function(i) {
          var content = htmlString.call(this, i, this.innerHTML)
          Sprint(this).html(content)
        })
      }
      return this.each(function() {
        this.innerHTML = htmlString
      })
    },
    index: function(el) {
      if (!this.length) return
      var toFind
      var sprintElements
      if (!el) {
        toFind = this.get(0)
        sprintElements = this.first().parent().children()
      }
      else if (typeof el == "string") {
        toFind = this.get(0)
        sprintElements = Sprint(el)
      }
      else {
        toFind = el instanceof Init ? el.get(0) : el
        sprintElements = this
      }
      var elements = sprintElements.get()
      var i = elements.length
      while (i--) {
        if (elements[i] == toFind) {
          return i
        }
      }
      return -1
    },
    insertAfter: function(target) {
      Sprint(target).after(this)
      return this
    },
    insertBefore: function(target) {
      Sprint(target).before(this)
      return this
    },
    is: function(selector, element) {
      // element is undocumented, internal-use only.
      // It gives better perfs as it prevents the creation of many objects in internal methods.
      var set = element ? [element] : this.get()
      var setLen = set.length

      if (typeof selector == "string") {
        for (var i = 0; i < setLen; i++) {
          var el = set[i]
          if (el.nodeType > 1) continue
          if (el[matches](selector)) {
            return true
          }
        }
        return false
      }
      if (typeof selector == "object") {
        // Sprint object or DOM element(s)
        var obj
        if (selector instanceof Init) {
          obj = selector.get()
        }
        else {
          obj = selector.length ? selector : [selector]
        }
        var objLen = obj.length
        for (var i = 0; i < setLen; i++) {
          for (var j = 0; j < objLen; j++) {
            if (set[i] === obj[j]) {
              return true
            }
          }
        }
        return false
      }
      if (typeof selector == "function") {
        for (var i = 0; i < setLen; i++) {
          if (selector.call(this, i, this)) {
            return true
          }
        }
        return false
      }
    },
    last: function() {
      return this.eq(-1)
    },
    map: function(callback, flattenArrays) {
      /*
       * flattenArrays (bool, true by default) is for internal usage only (although it might be
       * interesting to document it publicly).
       * Many methods rely on map(), thus being able to avoid the unnecessary Array.isArray() check
       * on each element is a significant perf boost.
       */
      if (flattenArrays == null) {
        flattenArrays = true
      }

      var dom = this.get()
      var len = this.length
      var values = []

      for (var i = 0; i < len; i++) {
        var el = dom[i]
        var val = callback.call(el, i, el)

        if (flattenArrays && Array.isArray(val)) {
          var valLen = val.length
          for (var j = 0; j < valLen; j++) {
            values.push(val[j])
          }
          continue
        }

        values.push(val)
      }

      return Sprint(values)
    },
    next: function(selector) {
      return selectImmediateAdjacentSibling(this, "next", selector)
    },
    nextAll: function(selector) {
      return selectAdjacentSiblings(this, "next", selector)
    },
    nextUntil: function(selector, filter) {
      return selectAdjacentSiblings(this, "next", filter, selector)
    },
    not: function(selector) {
      var isFunc = typeof selector == "function"
      var self = this
      return this.map(function(i) {
        if (isFunc) {
          if (selector.call(this, i, this)) return
        }
        else {
          if (self.is(selector, this)) return
        }
        return this
      }, false)
    },
    off: function(events, handler) {
      if (typeof events == "object") {
        Object.keys(events).forEach(function(event) {
          this.off(event, events[event])
        }, this)
        return this
      }
      if (events) {
        events = events.trim().split(" ")
      }
      return this.each(function() {
        if (!getEvents(this)) return
        if (events) {
          events.forEach(removeMatchedEvents(this, handler))
          return
        }
        Object.keys(getEvents(this)).forEach(removeEvent(this))
      })
    },
    offset: function(coordinates) {
      if (!coordinates) {
        var el = this.get(0)
        if (!el || el.nodeType > 1) return
        var pos = el.getBoundingClientRect()
        return {
          top: pos.top,
          left: pos.left
        }
      }
      if (typeof coordinates == "object") {
        return this.each(function() {
          if (this.nodeType > 1) return
          var $this = Sprint(this)
          $this.css("position") == "static"
            ? $this.css("position", "relative")
            : $this.css({
              top: 0,
              left: 0
            })
          var pos = $this.offset()
          $this.css({
            top: coordinates.top - pos.top + "px",
            left: coordinates.left - pos.left + "px"
          })
        })
      }
      if (typeof coordinates == "function") {
        return this.each(function(i) {
          var $this = Sprint(this)
          var posObj = coordinates.call(this, i, $this.offset())
          $this.offset(posObj)
        })
      }
    },
    offsetParent: function() {
      var dom = []
      this.each(function() {
        if (this.nodeType > 1) return
        var prt = this
        while (prt != root) {
          prt = prt.parentNode
          var pos = getComputedStyle(prt).getPropertyValue("position")
          if (!pos) break
          if (pos != "static") {
            dom.push(prt)
            return
          }
        }
        dom.push(root)
      })
      return Sprint(dom)
    },
    on: function(events, handler) {
      // .on(events, handler)
      if (handler) {
        var eventsArr = events.trim().split(" ")

        return this.each(function() {
          if (!getEvents(this)) {
            this.sprintEventListeners = {}
          }
          eventsArr.forEach(function(event) {
            if (!getEvents(this)[event]) {
              getEvents(this)[event] = []
            }
            getEvents(this)[event].push(handler)

            // Ensure we add both the standard event (eg: "click") and the full event
            // (eg: "click.foo") in order to be able to trigger them manually and programmatically.
            this.addEventListener(event, handler)
            if (!isNamespaced(event)) return
            this.addEventListener(getEventFromNamespace(event), handler)
          }, this)
        })
      }

      // .on({ event: handler })
      Object.keys(events).forEach(function(event) {
        this.on(event, events[event])
      }, this)
      return this
    },
    parent: function(selector) {
      return findAncestors.call(this, true, true, false, selector)
    },
    parents: function(selector) {
      /* Differences with jQuery:
       * 1. $("html").parent() and $("html").parents() return an empty set.
       * 2. The returned set won't be in reverse order.
       */
      return findAncestors.call(this, true, false, false, selector)
    },
    position: function() {
      var pos = {
        first: this.offset(),
        prt: this.parent().offset()
      }
      if (!pos.first) return
      return {
        top: pos.first.top - pos.prt.top,
        left: pos.first.left - pos.prt.left
      }
    },
    prop: function(propertyName, value) {
      if (typeof propertyName == "object") {
        var props = Object.keys(propertyName)
        var propsLen = props.length
        return this.each(function() {
          for (var i = 0; i < propsLen; i++) {
            var prop = props[i]
            this[prop] = propertyName[prop]
          }
        })
      }
      if (value == null) {
        var el = this.get(0)
        if (!el) return
        return el[propertyName]
      }
      var isFunc = typeof value == "function"
      return this.each(function(i) {
        this[propertyName] = isFunc ? value.call(this, i, this[propertyName]) : value
      })
    },
    prepend: function() {
      insertHTML.call(this, "afterbegin", arguments)
      return this
    },
    prependTo: function(target) {
      return Sprint(insertHTML.call(Sprint(target), "afterbegin", [this]))
    },
    prev: function(selector) {
      return selectImmediateAdjacentSibling(this, "previous", selector)
    },
    prevAll: function(selector) {
      return selectAdjacentSiblings(this, "previous", selector)
    },
    prevUntil: function(selector, filter) {
      return selectAdjacentSiblings(this, "previous", filter, selector)
    },
    ready: function(handler) {
      this.dom = [document]
      this.length = 1
      return this.on("DOMContentLoaded", handler)
    },
    remove: function(selector) {
      var self = this
      return this.each(function() {
        var parent = this.parentElement
        if (!parent) return
        if (!selector || self.is(selector, this)) {
          parent.removeChild(this)
        }
      })
    },
    removeAttr: function(attributeName) {
      if (attributeName) {
        var attributes = attributeName.trim().split(" ")
        var attributesLen = attributes.length
        this.each(function() {
          if (this.nodeType > 1) return
          for (var i = 0; i < attributesLen; i++) {
            this.removeAttribute(attributes[i])
          }
        })
      }
      return this
    },
    removeClass: function(className) {
      return manipulateClass.call(this, "remove", className)
    },
    removeProp: function(propertyName) {
      return this.each(function() {
        this[propertyName] = undefined
      })
    },
    replaceAll: function(target) {
      Sprint(target).replaceWith(this)
      return this
    },
    replaceWith: function(newContent) {
      if (typeof newContent == "function") {
        return this.each(function(i) {
          Sprint(this).replaceWith(newContent.call(this, i, this))
        })
      }
      return this.before(newContent).remove()
    },
    scrollLeft: function(value) {
      return scroll(this, "scrollLeft", value)
    },
    scrollTop: function(value) {
      return scroll(this, "scrollTop", value)
    },
    siblings: function(selector) {
      var siblings = []
      var self = this
      this.each(function(i, el) {
        Sprint(this).parent().children().each(function() {
          if (this == el || (selector && !self.is(selector, this))) return
          siblings.push(this)
        })
      })
      return Sprint(siblings)
    },
    size: function() {
      return this.length
    },
    slice: function(start, end) {
      var dom = this.get()
      var range = []
      var i = start >= 0 ? start : start + this.length
      var l = this.length
      if (end < 0) {
        l += end
      }
      else if (end >= 0) {
        l = end > this.length ? this.length : end
      }
      for (; i < l; i++) {
        range.push(dom[i])
      }
      return Sprint(range)
    },
    text: function(content) {
      if (content == null) {
        var textContents = []
        this.each(function() {
          textContents.push(this.textContent)
        })
        return textContents.join("")
      }
      var isFunc = typeof content == "function"
      return this.each(function(i) {
        this.textContent = isFunc ? content.call(this, i, this.textContent) : content
      })
    },
    toggleClass: function(className, bool) {
      return manipulateClass.call(this, "toggle", className, bool)
    },
    trigger: function(event) {
      // IE polyfill
      if (!window.CustomEvent || typeof window.CustomEvent !== "function") {
        var CustomEvent = function(event, params) {
          var evt
          params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
          }
          evt = document.createEvent("CustomEvent")
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
          return evt
        }
        CustomEvent.prototype = window.Event.prototype
        window.CustomEvent = CustomEvent
      }
      return this.each(function() {
        getEventsToRemove(this, event).forEach(function(matchedEvent) {
          this.dispatchEvent(new CustomEvent(matchedEvent, {
            bubbles: true,
            cancelable: true
          }))
        }, this)
      })
    },
    unwrap: function() {
      this.parent().each(function() {
        if (this == document.body || this == root) return
        Sprint(this).replaceWith(this.childNodes)
      })
      return this
    },
    val: function(value) {
      if (value == null) {
        var el = this.get(0)
        if (!el) return
        if (el.multiple) {
          var values = []
          this.first().children(":checked").each(function() {
            values.push(this.value)
          })
          return values
        }
        return el.value
      }
      if (Array.isArray(value)) {
        var self = this
        return this.each(function() {
          if (this.multiple) {
            self.children().each(function() {
              this.selected = inArray(this.value, value)
            })
            return
          }
          this.checked = inArray(this.value, value)
        })
      }
      if (typeof value == "function") {
        return this.each(function(i) {
          Sprint(this).val(value.call(this, i, this.value))
        })
      }
      return this.each(function() {
        this.value = value
      })
    },
    width: function(value) {
      return getSetDimension(this, "width", value)
    },
    wrap: function(wrappingElement) {
      return wrap.call(this, wrappingElement)
    },
    wrapAll: function(wrappingElement) {
      return wrap.call(this, wrappingElement, "all")
    },
    wrapInner: function(wrappingElement) {
      return wrap.call(this, wrappingElement, "inner")
    }
  }

  // public

  Sprint = function(selector, context) {
    return new Init(selector, context)
  }

  if (window.$ == null) {
    window.$ = Sprint
  }
}());
