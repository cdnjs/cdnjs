/*
 * Sprint JavaScript Library v0.0.0
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
    beforebegin: function(el) {
      this.parentNode.insertBefore(el, this) 
    },
    beforeend: function(el) {
      this.appendChild(el) 
    }
  }
  var matchSelector = "matches"
  if (!Element.prototype.matches) {
    matchSelector = Element.prototype.mozMatchesSelector
                  ? "mozMatchesSelector"
                  : "msMatchesSelector"
  }
  // When Firefox 34 is out, replace this implementation with:
  // var matchSelector = Element.prototype.matches ? "matches" : "msMatchesSelector"


  function addEventListeners(listeners, el) {
    var sprintClone = Sprint(el)
    Object.keys(listeners).forEach(function(key) {
      listeners[key].forEach(function(callback) {
        sprintClone.on(key, callback)
      })
    })
  }

  function duplicateEventListeners(el, clone) {
    // createTextNode()
    if (el.nodeType == 3) return

    // Duplicate event listeners for the parent element...
    var listeners = el.sprintEventListeners 
    listeners && addEventListeners(listeners, clone)

    // ... and its descendants.
    // cloneDescendants is defined later to avoid calling selectElements() if not needed
    var cloneDescendants
    selectElements("*", el).forEach(function(child, i) {
      var listeners = child.sprintEventListeners
      if (listeners) {
        if (!cloneDescendants) {
          cloneDescendants = selectElements("*", clone)
        }
        addEventListeners(listeners, cloneDescendants[i])
      }
    })
  }

  function findDomElements(elementsToFind, returnParent) {
    elementsToFind = elementsToFind instanceof Init
                   ? elementsToFind.get()
                   : [elementsToFind]
    var elementsToFindLength = elementsToFind.length
    var dom = []
    var i = -1
    var l = this.length
    while (++i < l) {
      var descendants = selectElements("*", this.get(i))
      var j = -1
      var descendantsLength = descendants.length
      while (++j < descendantsLength) {
        var k = -1
        while (++k < elementsToFindLength) {
          if (descendants[j] == elementsToFind[k]) {
            var returnedElement = returnParent ? this.get(i) : elementsToFind[k]
            if (elementsToFindLength < 2) {
              return Sprint(returnedElement)
            }
            dom.push(returnedElement)
          }
        }
      }
    }
    return Sprint(dom)
  }

  function insertHTML(position, args) {
    var i = -1
    var l = args.length
    while (++i < l) {
      var content = args[i]
      if (typeof content == "string") {
        this.each(function() {
          this.insertAdjacentHTML(position, content)
        })
      }
      else if (typeof content == "function") {
        this.each(function(index) {
          var callbackValue = content.call(this, index, this.innerHTML)
          insertHTML.call(Sprint(this), position, callbackValue)
        })
      }
      else {
        var isSprintObj = content instanceof Init
        var clonedElements = []
        var elementsToInsert = (function() {
          if (isSprintObj) {
            return content.get()
          }
          // [element1, element2]
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
        position == "afterbegin" && elementsToInsert.reverse()

        this.each(function(index, self) {
          elementsToInsert.forEach(function(el) {
            var elementToInsert = el
            if (index > 0) {
              elementToInsert = el.cloneNode(true) 
              duplicateEventListeners(el, elementToInsert)
            }
            domMethods[position].call(self, elementToInsert)
            clonedElements.push(elementToInsert)
          })
        })
        if (isSprintObj) {
          content.dom = clonedElements
          content.length = clonedElements.length
        }
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
    if (typeof className == "string") {
      isString = true
      classNames = className.trim().split(" ")
    }

    return this.each(function(i, el) {
      if (!isString) {
        // className is a function
        var callbackValue = className.call(el, i, el.className)
        if (!callbackValue) return
        classNames = callbackValue.trim().split(" ")
      }
      classNames.forEach(function(name) {
        if (!name) return
        bool == null
          ? el.classList[method](name)
          : el.classList.toggle(name, bool)
      })
    })
  }

  function pxNeeded(cssProperty) {
    var ignored = [
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
    var i = ignored.length
    while (i--) {
      if (ignored[i] == cssProperty) {
        return false
      }
    }
    return true
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

  function setValueUnit(value) {
    var stringValue = typeof value == "string" ? value : value.toString()
    if (value && !stringValue.match(/\D/)) {
      stringValue += "px"
    }
    return stringValue
  }

  function toArray(obj) {
    var arr = []
    var i = obj.length
    while (i--) {
      arr[i] = obj[i]
    }
    return arr
  }

  // constructor

  function Init(selector, context) {
    switch (typeof selector) {
      case "string":
        if (selector[0] == "<") {
          var tmp = d.createElement("div")
          tmp.innerHTML = selector.trim()
          this.dom = [tmp.firstChild]
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
    append: function() {
      insertHTML.call(this, "beforeend", arguments)
      return this
    },
    appendTo: function(target) {
      return Sprint(insertHTML.call(Sprint(target), "beforeend", [this]))
    },
    attr: function(name, value) {
      var stringValue = typeof value == "string"
      if (stringValue || typeof value == "function") {
        return this.each(function(i) {
          this.setAttribute(
            name, stringValue ? value : value.call(this, i, this.getAttribute(name))
          )
        })
      }
      if (typeof name == "object") {
        var attributeNames = Object.keys(name)
        return this.each(function(i, el) {
          attributeNames.forEach(function(attribute) {
            el.setAttribute(attribute, name[attribute])
          })
        })
      }
      return this.get(0).getAttribute(name)
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
        var i = -1
        var l = nodes.length
        while (++i < l) {
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
      var dom = []
      var self = this
      var root = context || d.documentElement
      this.each(function() {
        var prt = this
        while (prt != root) {
          if (self.is(selector, prt)) {
            dom.push(prt)
            break
          }
          else {
            prt = prt.parentNode
          }
        }
      })
      return Sprint(dom)
    },
    css: function(property, value) {
      // set (string or function)
      if (value != null) {
        var isFunc = typeof value == "function"
        return this.each(function(index) {
          if (isFunc) {
            var style = Sprint(this).css(property)
          }
          this.style[property] = isFunc ? value(index, style) : setValueUnit(value)
        })
      }
      // read
      if (typeof property == "string") {
        return getComputedStyle(this.get(0)).getPropertyValue(property)
      }
      // read
      if (Array.isArray(property)) {
        var o = {}
        var styles = getComputedStyle(this.get(0))
        property.forEach(function(prop) {
          o[prop] = styles.getPropertyValue(prop) 
        })
        return o
      }
      // set (property is an object)
      var properties = Object.keys(property)
      return this.each(function(i, el) {
        properties.forEach(function(prop) {
          el.style[prop] = setValueUnit(property[prop])
        })
      })
    },
    each: function(callback) {
      // callback(index, element) where element == this
      var i = -1
      var l = this.length
      var dom = this.dom
      while (++i < l) {
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
          selectElements(selector, this).forEach(function(el) {
            dom.push(el)
          })
        })
        return Sprint(dom)
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
      var classFound = false
      this.each(function() {
        if (!classFound && this.classList.contains(name)) {
          classFound = true
        }
      })
      return classFound
    },
    height: function(value) {
      // read
      if (value == null) {
        var el = this.get(0)
        switch (el) {
          // height of HTML document
          case d:
            var offset = d.documentElement.offsetHeight
            var inner = window.innerHeight
            return offset > inner ? offset : inner
          // height of the viewport
          case window:
            return window.innerHeight
          // height of an element
          default:
            return el.getBoundingClientRect().height 
        }
      }

      // set
      var isFunction = typeof value == "function"
      var stringValue = isFunction ? "" : setValueUnit(value)
      return this.each(function(index) {
        if (isFunction) {
          stringValue = setValueUnit(value.call(this, index, Sprint(this).height()))
        }
        this.style.height = stringValue
      })
    },
    html: function(htmlString) {
      if (htmlString == null) {
        return this.get(0).innerHTML
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
      var i = -1
      var l = elements.length
      while (++i < l) {
        if (elements[i] === toFind) {
          return i
        }
      }
      return -1
    },
    is: function(selector, element) {
      // element is undocumented, internal-use only.
      // It gives better perfs as it prevents the creation of many objects in internal methods.

      var set = element ? [element] : this.get()
      var i = -1
      var l = set.length

      if (typeof selector == "string") {
        while (++i < l) {
          if (set[i][matchSelector](selector)) {
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
        var objLength = obj.length
        while (++i < l) {
          var j = -1
          while (++j < objLength) {
            if (set[i] === obj[j]) {
              return true
            }
          }
        }
        return false
      }
      if (typeof selector == "function") {
        while (++i < l) {
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
          val.forEach(function(el) {
            val == null || values.push(el)
          })
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
          this.each(function(i, el) {
            if (!this.sprintEventListeners) return
            Object.keys(this.sprintEventListeners).forEach(function(key) {
              el.sprintEventListeners[key].forEach(function(callbackReference) {
                el.removeEventListener(key, callbackReference) 
              })
            }) 
            this.sprintEventListeners = {}
          })
          break

        // .off("click")
        case 1:
          this.each(function(i, el) {
            if (!this.sprintEventListeners) return
            this.sprintEventListeners[type].forEach(function(callbackReference) {
              el.removeEventListener(type, callbackReference) 
            }) 
            this.sprintEventListeners[type] = []
          })
          break

        // .off("click", handler)
        case 2:
          this.each(function() {
            if (!this.sprintEventListeners) return
            var updatedSprintEventListeners = []
            this.sprintEventListeners[type].forEach(function(callbackReference) {
              callback != callbackReference && updatedSprintEventListeners.push(callbackReference)
            }) 
            this.removeEventListener(type, callback) 
            this.sprintEventListeners[type] = updatedSprintEventListeners
          })
          break
      }
      return this
    },
    on: function(type, callback) {
      return this.each(function() {
        var callbackReference = callback
        if (!this.sprintEventListeners) {
          this.sprintEventListeners = {}
        }
        if (!this.sprintEventListeners[type]) {
          this.sprintEventListeners[type] = []
        }
        this.sprintEventListeners[type].push(callbackReference)
        this.addEventListener(type, callbackReference)
      })
    },
    parent: function(selector) {
      var dom = []
      var self = this
      this.each(function() {
        var prt = this.parentNode
        if (!prt) return
        if (!selector || self.is(selector, prt)) {
          dom.push(prt)
        }
      })
      return Sprint(dom)
    },
    position: function() {
      var bounding = {
        first: getBounding(this.get(0)),
        prt: getBounding(this.first().parent().get(0))
      }
      function getBounding(el) {
        return el == d.body ? { top: 0, left: 0 } : el.getBoundingClientRect()
      }
      return {
        top: bounding.first.top - bounding.prt.top,
        left: bounding.first.left - bounding.prt.left
      }
    },
    prepend: function() {
      insertHTML.call(this, "afterbegin", arguments)
      return this
    },
    prev: function(selector) {
      return selectAdjacentSiblings.call(this, "previous", selector)
    },
    remove: function(selector) {
      var self = this
      return this.each(function() {
        if (!selector || self.is(selector, this)) {
          this.parentNode.removeChild(this)
        }
      })
    },
    removeAttr: function(attributeName) {
      if (attributeName) {
        var attributes = attributeName.trim().split(" ")
        this.each(function(i, el) {
          attributes.forEach(function(attr) {
            el.removeAttribute(attr)
          })
        })
      }
      return this
    },
    removeClass: function(className) {
      return manipulateClass.call(this, "remove", className)
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
    val: function(value) {
      if (value == null) {
        var el = this.get(0)
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
    wrap: function(element) {
      if (typeof element == "function") {
        this.each(function(i) {
          Sprint(this).wrap(element.call(this, i))
        })
      }
      else {
        var outerWrap = Sprint(element).get(0)
        var outerWrapHTML = typeof element == "string" ? element : outerWrap.outerHTML
        var nestedElements = outerWrapHTML.match(/</g).length > 2

        this.each(function() {
          var clone = outerWrap.cloneNode(true)
          var prt = this.parentNode
          var next = this.nextSibling
          var elementPrt

          if (nestedElements) {
            // find most inner child
            var innerWrap = clone.firstChild
            while (innerWrap.firstChild) {
              innerWrap = innerWrap.firstChild
            }
            elementPrt = innerWrap
          }
          else {
            elementPrt = clone
          }

          duplicateEventListeners(outerWrap, clone)
          elementPrt.appendChild(this)
          prt.insertBefore(clone, next)
        })
      }
      return this
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
