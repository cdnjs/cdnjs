/*
 * Sprint JavaScript Library v0.5.3
 * http://sprintjs.com
 *
 * Copyright (c) 2014, 2015 Benjamin De Cock
 * Released under the MIT license
 * http://sprintjs.com/license
 */

var Sprint;

(function() {
  "use strict"

  var d = document
  var domMethods = {
    afterbegin: function(el) {
      this.insertBefore(el, this.firstChild)
    },
    afterend: function(el) {
      this.parentNode.insertBefore(el, this.nextSibling)
    },
    beforebegin: function(el) {
      this.parentNode.insertBefore(el, this)
    },
    beforeend: function(el) {
      this.appendChild(el)
    }
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
  })()
  var noPx = [
    "animation-delay",
    "animation-duration",
    "animation-iteration-count",
    "column-count",
    "flex-grow",
    "flex-shrink",
    "font-weight",
    "line-height",
    "opacity",
    "order",
    "orphans",
    "transition",
    "transition-delay",
    "transition-duration",
    "widows",
    "z-index"
  ]
  var root = d.documentElement

  function addEventListeners(listeners, el) {
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

  function addPx(cssProperty, value) {
    var i = noPx.length
    while (i--) {
      if (noPx[i] == cssProperty) {
        return value
      }
    }
    var stringValue = typeof value == "string" ? value : value.toString()
    if (value && !/\D/.test(stringValue)) {
      stringValue += "px"
    }
    return stringValue
  }

  function duplicateEventListeners(el, clone) {
    // Ignore text nodes
    if (el.nodeType == 3) return

    // Duplicate event listeners for the parent element...
    var listeners = el.sprintEventListeners
    listeners && addEventListeners(listeners, clone)

    // ... and its descendants.
    var descendants = selectElements("*", el)
    var descendantsLen = descendants.length

    // cloneDescendants is defined later to avoid calling selectElements() if not needed
    var cloneDescendants

    for (var i = 0; i < descendantsLen; i++) {
      var listeners = descendants[i].sprintEventListeners
      if (!listeners) continue
      if (!cloneDescendants) {
        cloneDescendants = selectElements("*", clone)
      }
      addEventListeners(listeners, cloneDescendants[i])
    }
  }

  function findAncestors(startAtParent, limitToParent, limitToFirstMatch, selector, context) {
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

  function findDomElements(elementsToFind, returnParent) {
    elementsToFind = elementsToFind instanceof Init ? elementsToFind.get() : [elementsToFind]
    var elementsToFindLen = elementsToFind.length
    var dom = []

    for (var i = 0; i < this.length; i++) {
      var descendants = selectElements("*", this.get(i))
      var descendantsLen = descendants.length
      for (var j = 0; j < descendantsLen; j++) {
        for (var k = 0; k < elementsToFindLen; k++) {
          if (descendants[j] == elementsToFind[k]) {
            var returnedElement = returnParent ? this.get(i) : elementsToFind[k]
            if (elementsToFindLen < 2) {
              return Sprint(returnedElement)
            }
            dom.push(returnedElement)
          }
        }
      }
    }
    return Sprint(removeDuplicates(dom))
  }

  function getSetDimension(obj, prop, value) {
    // get
    if (value == null) {
      var el = obj.get(0)
      if (!el) return
      var capitalizedProp = prop[0].toUpperCase() + prop.substring(1)
      // dimension of HTML document
      if (el == d) {
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
      if (this == d || this == window) return
      if (isFunction) {
        stringValue = addPx(prop, value.call(this, index, Sprint(this)[prop]()))
      }
      this.style[prop] = stringValue
    })
  }

  function insertHTML(position, args) {
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
      if (typeof content == "string") {
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
          // [node1, node2]
          if (Array.isArray(content)) {
            return content
          }
          // Existing DOM node, createTextNode(), createElement()
          if (content.nodeType) {
            return [content]
          }
          // getElementsByTagName, getElementsByClassName, querySelectorAll
          return toArray(content)
        })()
        var elementsToInsertLen = elementsToInsert.length

        if (elementsToInsertLen > 1 && position.indexOf("after") > -1) {
          elementsToInsert.reverse()
        }

        this.each(function(index) {
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
            domMethods[position].call(this, elementToInsert)
            clonedElements.push(elementToInsert)
          }
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

  function manipulateClass(method, className, bool) {
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

  function removeDuplicates(arr) {
    var cleanDom = []
    var cleanDomLen = 0
    var arrLen = arr.length

    for (var i = 0; i < arrLen; i++) {
      var el = arr[i]
      var duplicate = false

      for (var j = 0; j < cleanDomLen; j++) {
        if (el !== cleanDom[j]) continue
        duplicate = true
        break
      }

      if (duplicate) continue
      cleanDom[cleanDomLen++] = el
    }
    return cleanDom
  }

  function selectAdjacentSiblings(position, selector) {
    var dom = []
    var self = this
    this.each(function() {
      var el = this[position + "ElementSibling"]
      if (!el) return
      if (!selector || self.is(selector, el)) {
        dom.push(el)
      }
    })
    return Sprint(dom)
  }

  function selectElements(selector, context) {
    context = context || d
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
        return [d.body]
      }
      return toArray(context.getElementsByTagName(selector))
    }
    return toArray(context.querySelectorAll(selector))
  }

  function toArray(obj) {
    var arr = []
    var i = obj.length
    while (i--) {
      arr[i] = obj[i]
    }
    return arr
  }

  function wrap(wrappingElement, variant) {
    if (typeof wrappingElement == "function") {
      this.each(function(i) {
        Sprint(this)[variant == "inner" ? "wrapInner" : "wrap"](wrappingElement.call(this, i))
      })
    }
    else {
      variant == "all" ? callback.call(this) : this.each(callback)
    }
    function callback() {
      var wrap = Sprint(wrappingElement).clone(true).get(0)
      var innerWrap = wrap
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
    return this
  }

  // constructor

  function Init(selector, context) {
    switch (typeof selector) {
      case "string":
        if (selector[0] == "<") {
          var tmp = d.createElement("div")
          tmp.innerHTML = selector.trim()
          // cloneNode prevents the div to be listed as a parent of nodes not in the DOM
          this.dom = [tmp.firstChild.cloneNode(true)]
        }
        else {
          if (context && context instanceof Init) {
            this.dom = context.find(selector).get()
          }
          else {
            this.dom = selectElements(selector, context)
          }
        }
        this.length = this.dom.length
        break
      case "function":
        this.dom = [d]
        this.length = 1
        this.on("DOMContentLoaded", selector)
        break
      default:
        if (selector instanceof Init) {
          return selector
        }
        if (Array.isArray(selector)) {
          this.dom = selector
        }
        else if (
          selector instanceof NodeList ||
          selector instanceof HTMLCollection
        ) {
          this.dom = toArray(selector)
        }
        else {
          this.dom = [selector]
        }
        this.length = this.dom.length
    }
  }

  Init.prototype = {
    add: function(selector) {
      var added = Sprint(selector)
      var dom = added.get()
      this.each(function() {
        dom.push(this)
      })
      added.length = dom.length
      return added
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
          this.setAttribute(
            name, isFunc ? value.call(this, i, this.getAttribute(name)) : value
          )
        })
      }
      if (typeof name == "object") {
        var attrNames = Object.keys(name)
        var attrNamesLen = attrNames.length
        return this.each(function() {
          for (var i = 0; i < attrNamesLen; i++) {
            var attribute = attrNames[i]
            this.setAttribute(attribute, name[attribute])
          }
        })
      }
      var el = this.get(0)
      if (!el) return
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
      var cloned = []
      this.each(function() {
        var clone = this.cloneNode(true)
        withEvents && duplicateEventListeners(this, clone)
        cloned.push(clone)
      })
      return Sprint(cloned)
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
          var oldValue = getComputedStyle(this).getPropertyValue(property)
          this.style[property] = value.call(this, index, oldValue)
        })
      }
      // read
      if (typeof property == "string") {
        var el = this.get(0)
        if (!el) return
        return getComputedStyle(el).getPropertyValue(property)
      }
      // read
      if (Array.isArray(property)) {
        var o = {}
        var styles = getComputedStyle(this.get(0))
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
        for (var i = 0; i < propertiesLen; i++) {
          var prop = properties[i]
          this.style[prop] = addPx(prop, property[prop])
        }
      })
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
      var dom = []
      switch (typeof selector) {
        case "string":
          var self = this
          this.each(function() {
            self.is(selector, this) && dom.push(this)
          })
          break
        case "function":
          this.each(function(index, el) {
            selector.call(this, index, el) && dom.push(this)
          })
          break
        default:
          return this
      }
      return Sprint(dom)
    },
    find: function(selector) {
      // .find(selector)
      if (typeof selector == "string") {
        var dom = []
        this.each(function() {
          var elements = selectElements(selector, this)
          var elementsLen = elements.length
          for (var i = 0; i < elementsLen; i++) {
            dom.push(elements[i])
          }
        })
        return Sprint(removeDuplicates(dom))
      }

      // .find(element)
      return findDomElements.call(this, selector)
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
        var dom = []
        this.each(function() {
          selectElements(selector, this)[0] && dom.push(this)
        })
        return Sprint(dom)
      }

      // .has(contained)
      return findDomElements.call(this, selector, true)
    },
    hasClass: function(name) {
      var i = this.length
      while (i--) {
        if (this.get(i).classList.contains(name)) {
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
      if (typeof htmlString == "string") {
        return this.each(function() {
          this.innerHTML = htmlString
        })
      }
      if (typeof htmlString == "function") {
        return this.each(function(i) {
          var content = htmlString.call(this, i, this.innerHTML)
          Sprint(this).html(content)
        })
      }
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
          if (set[i][matches](selector)) {
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
    map: function(callback) {
      var values = []
      this.each(function(i) {
        var val = callback.call(this, i, this)
        if (Array.isArray(val)) {
          var len = val.length
          for (var j = 0; j < len; j++) {
            values.push(val[j])
          }
        }
        else {
          val == null || values.push(val)
        }
      })
      return Sprint(values)
    },
    next: function(selector) {
      return selectAdjacentSiblings.call(this, "next", selector)
    },
    not: function(selector) {
      var isFunc = typeof selector == "function"
      var filtered = []
      var self = this
      this.each(function(i) {
        if (isFunc) {
          if (selector.call(this, i, this)) return
        }
        else {
          if (self.is(selector, this)) return
        }
        filtered.push(this)
      })
      return Sprint(filtered)
    },
    off: function(type, callback) {
      switch (arguments.length) {
        // .off()
        case 0:
          return this.each(function() {
            if (!this.sprintEventListeners) return
            var events = Object.keys(this.sprintEventListeners)
            var eventsLen = events.length

            for (var i = 0; i < eventsLen; i++) {
              var event = events[i]
              var handlers = this.sprintEventListeners[event]
              var handlersLen = handlers.length

              for (var j = 0; j < handlersLen; j++) {
                this.removeEventListener(event, handlers[j])
              }
            }
            this.sprintEventListeners = {}
          })

        // .off(event)
        case 1:
          return this.each(function() {
            if (!this.sprintEventListeners) return
            var handlers = this.sprintEventListeners[type]
            var handlersLen = handlers.length

            for (var i = 0; i < handlersLen; i++) {
              this.removeEventListener(type, handlers[i])
            }
            this.sprintEventListeners[type] = []
          })

        // .off(event, handler)
        case 2:
          return this.each(function() {
            if (!this.sprintEventListeners) return
            var updatedSprintEventListeners = []
            var handlers = this.sprintEventListeners[type]
            var handlersLen = handlers.length

            for (var i = 0; i < handlersLen; i++) {
              var handler = handlers[i]
              callback != handler && updatedSprintEventListeners.push(handler)
            }

            this.removeEventListener(type, callback)
            this.sprintEventListeners[type] = updatedSprintEventListeners
          })
      }
    },
    offset: function(coordinates) {
      if (!coordinates) {
        var el = this.get(0)
        if (!el) return
        var pos = el.getBoundingClientRect()
        return {
          top: pos.top,
          left: pos.left
        }
      }
      if (typeof coordinates == "object") {
        return this.each(function() {
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
    on: function(type, callback) {
      return this.each(function() {
        if (!this.sprintEventListeners) {
          this.sprintEventListeners = {}
        }
        if (!this.sprintEventListeners[type]) {
          this.sprintEventListeners[type] = []
        }
        this.sprintEventListeners[type].push(callback)
        this.addEventListener(type, callback)
      })
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
      return selectAdjacentSiblings.call(this, "previous", selector)
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
    unwrap: function() {
      var parents = []
      var parentsLen = 0

      this.each(function() {
        var parent = this.parentElement
        if (!parent || parent == d.body || parent == root) return

        var i = parentsLen
        while (i--) {
          if (parent == parents[i]) return
        }
        parents[parentsLen++] = parent
      })

      var i = parentsLen
      while (i--) {
        var parent = Sprint(parents[i])
        parent.before(parent.children()).remove()
      }

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
      if (typeof value == "string") {
        return this.each(function() {
          this.value = value
        })
      }
      if (Array.isArray(value)) {
        var self = this
        return this.each(function() {
          if (this.multiple) {
            self.children().each(function() {
              selectMatchedValues(this, "selected")
            })
            return
          }
          selectMatchedValues(this, "checked")
        })
      }
      if (typeof value == "function") {
        return this.each(function(i) {
          Sprint(this).val(value.call(this, i, this.value))
        })
      }
      function selectMatchedValues(domEl, attr) {
        domEl[attr] = value.indexOf(domEl.value) < 0 ? false : true
      }
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
})();
