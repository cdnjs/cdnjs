/* Zepto v1.0 - polyfill zepto detect event ajax form fx - zeptojs.com/license */

;(function(undefined){
  if (String.prototype.trim === undefined) // fix for iOS 3.2
    String.prototype.trim = function(){ return this.replace(/^\s+|\s+$/g, '') }

  // For iOS 3.x
  // from https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/reduce
  if (Array.prototype.reduce === undefined)
    Array.prototype.reduce = function(fun){
      if(this === void 0 || this === null) throw new TypeError()
      var t = Object(this), len = t.length >>> 0, k = 0, accumulator
      if(typeof fun != 'function') throw new TypeError()
      if(len == 0 && arguments.length == 1) throw new TypeError()

      if(arguments.length >= 2)
       accumulator = arguments[1]
      else
        do{
          if(k in t){
            accumulator = t[k++]
            break
          }
          if(++k >= len) throw new TypeError()
        } while (true)

      while (k < len){
        if(k in t) accumulator = fun.call(undefined, accumulator, t[k], k, t)
        k++
      }
      return accumulator
    }

})()





var Zepto = (function() {
  var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,
    document = window.document,
    elementDisplay = {}, classCache = {},
    getComputedStyle = document.defaultView.getComputedStyle,
    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    rootNodeRE = /^(?:body|html)$/i,

    // special attributes that should be get/set via method calls
    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
    table = document.createElement('table'),
    tableRow = document.createElement('tr'),
    containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
    readyRE = /complete|loaded|interactive/,
    classSelectorRE = /^\.([\w-]+)$/,
    idSelectorRE = /^#([\w-]*)$/,
    tagSelectorRE = /^[\w-]+$/,
    class2type = {},
    toString = class2type.toString,
    zepto = {},
    camelize, uniq,
    tempParent = document.createElement('div')

  zepto.matches = function(element, selector) {
    if (!element || element.nodeType !== 1) return false
    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
                          element.oMatchesSelector || element.matchesSelector
    if (matchesSelector) return matchesSelector.call(element, selector)
    // fall back to performing a selector:
    var match, parent = element.parentNode, temp = !parent
    if (temp) (parent = tempParent).appendChild(element)
    match = ~zepto.qsa(parent, selector).indexOf(element)
    temp && tempParent.removeChild(element)
    return match
  }

  function type(obj) {
    return obj == null ? String(obj) :
      class2type[toString.call(obj)] || "object"
  }

  function isFunction(value) { return type(value) == "function" }
  function isWindow(obj)     { return obj != null && obj == obj.window }
  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
  function isObject(obj)     { return type(obj) == "object" }
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && obj.__proto__ == Object.prototype
  }
  function isArray(value) { return value instanceof Array }
  function likeArray(obj) { return typeof obj.length == 'number' }

  function compact(array) { return filter.call(array, function(item){ return item != null }) }
  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
  function dasherize(str) {
    return str.replace(/::/g, '/')
           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
           .replace(/_/g, '-')
           .toLowerCase()
  }
  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

  function classRE(name) {
    return name in classCache ?
      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
  }

  function maybeAddPx(name, value) {
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
  }

  function defaultDisplay(nodeName) {
    var element, display
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName)
      document.body.appendChild(element)
      display = getComputedStyle(element, '').getPropertyValue("display")
      element.parentNode.removeChild(element)
      display == "none" && (display = "block")
      elementDisplay[nodeName] = display
    }
    return elementDisplay[nodeName]
  }

  function children(element) {
    return 'children' in element ?
      slice.call(element.children) :
      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overriden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function(html, name, properties) {
    if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
    if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
    if (!(name in containers)) name = '*'

    var nodes, dom, container = containers[name]
    container.innerHTML = '' + html
    dom = $.each(slice.call(container.childNodes), function(){
      container.removeChild(this)
    })
    if (isPlainObject(properties)) {
      nodes = $(dom)
      $.each(properties, function(key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
        else nodes.attr(key, value)
      })
    }
    return dom
  }

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. Note that `__proto__` is not supported on Internet
  // Explorer. This method can be overriden in plugins.
  zepto.Z = function(dom, selector) {
    dom = dom || []
    dom.__proto__ = $.fn
    dom.selector = selector || ''
    return dom
  }

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overriden in plugins.
  zepto.isZ = function(object) {
    return object instanceof zepto.Z
  }

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overriden in plugins.
  zepto.init = function(selector, context) {
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z()
    // If a function is given, call it when the DOM is ready
    else if (isFunction(selector)) return $(document).ready(selector)
    // If a Zepto collection is given, juts return it
    else if (zepto.isZ(selector)) return selector
    else {
      var dom
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector)
      // Wrap DOM nodes. If a plain object is given, duplicate it.
      else if (isObject(selector))
        dom = [isPlainObject(selector) ? $.extend({}, selector) : selector], selector = null
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
      // create a new Zepto collection from the nodes found
      return zepto.Z(dom, selector)
    }
  }

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function(selector, context){
    return zepto.init(selector, context)
  }

  function extend(target, source, deep) {
    for (key in source)
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {}
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = []
        extend(target[key], source[key], deep)
      }
      else if (source[key] !== undefined) target[key] = source[key]
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function(target){
    var deep, args = slice.call(arguments, 1)
    if (typeof target == 'boolean') {
      deep = target
      target = args.shift()
    }
    args.forEach(function(arg){ extend(target, arg, deep) })
    return target
  }

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overriden in plugins.
  zepto.qsa = function(element, selector){
    var found
    return (isDocument(element) && idSelectorRE.test(selector)) ?
      ( (found = element.getElementById(RegExp.$1)) ? [found] : [] ) :
      (element.nodeType !== 1 && element.nodeType !== 9) ? [] :
      slice.call(
        classSelectorRE.test(selector) ? element.getElementsByClassName(RegExp.$1) :
        tagSelectorRE.test(selector) ? element.getElementsByTagName(selector) :
        element.querySelectorAll(selector)
      )
  }

  function filtered(nodes, selector) {
    return selector === undefined ? $(nodes) : $(nodes).filter(selector)
  }

  $.contains = function(parent, node) {
    return parent !== node && parent.contains(node)
  }

  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg
  }

  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
  }

  // access className property while respecting SVGAnimatedString
  function className(node, value){
    var klass = node.className,
        svg   = klass && klass.baseVal !== undefined

    if (value === undefined) return svg ? klass.baseVal : klass
    svg ? (klass.baseVal = value) : (node.className = value)
  }

  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    var num
    try {
      return value ?
        value == "true" ||
        ( value == "false" ? false :
          value == "null" ? null :
          !isNaN(num = Number(value)) ? num :
          /^[\[\{]/.test(value) ? $.parseJSON(value) :
          value )
        : value
    } catch(e) {
      return value
    }
  }

  $.type = type
  $.isFunction = isFunction
  $.isWindow = isWindow
  $.isArray = isArray
  $.isPlainObject = isPlainObject

  $.isEmptyObject = function(obj) {
    var name
    for (name in obj) return false
    return true
  }

  $.inArray = function(elem, array, i){
    return emptyArray.indexOf.call(array, elem, i)
  }

  $.camelCase = camelize
  $.trim = function(str) { return str.trim() }

  // plugin compatibility
  $.uuid = 0
  $.support = { }
  $.expr = { }

  $.map = function(elements, callback){
    var value, values = [], i, key
    if (likeArray(elements))
      for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i)
        if (value != null) values.push(value)
      }
    else
      for (key in elements) {
        value = callback(elements[key], key)
        if (value != null) values.push(value)
      }
    return flatten(values)
  }

  $.each = function(elements, callback){
    var i, key
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++)
        if (callback.call(elements[i], i, elements[i]) === false) return elements
    } else {
      for (key in elements)
        if (callback.call(elements[key], key, elements[key]) === false) return elements
    }

    return elements
  }

  $.grep = function(elements, callback){
    return filter.call(elements, callback)
  }

  if (window.JSON) $.parseJSON = JSON.parse

  // Populate the class2type map
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase()
  })

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {
    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    indexOf: emptyArray.indexOf,
    concat: emptyArray.concat,

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function(fn){
      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
    },
    slice: function(){
      return $(slice.apply(this, arguments))
    },

    ready: function(callback){
      if (readyRE.test(document.readyState)) callback($)
      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
      return this
    },
    get: function(idx){
      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
    },
    toArray: function(){ return this.get() },
    size: function(){
      return this.length
    },
    remove: function(){
      return this.each(function(){
        if (this.parentNode != null)
          this.parentNode.removeChild(this)
      })
    },
    each: function(callback){
      emptyArray.every.call(this, function(el, idx){
        return callback.call(el, idx, el) !== false
      })
      return this
    },
    filter: function(selector){
      if (isFunction(selector)) return this.not(this.not(selector))
      return $(filter.call(this, function(element){
        return zepto.matches(element, selector)
      }))
    },
    add: function(selector,context){
      return $(uniq(this.concat($(selector,context))))
    },
    is: function(selector){
      return this.length > 0 && zepto.matches(this[0], selector)
    },
    not: function(selector){
      var nodes=[]
      if (isFunction(selector) && selector.call !== undefined)
        this.each(function(idx){
          if (!selector.call(this,idx)) nodes.push(this)
        })
      else {
        var excludes = typeof selector == 'string' ? this.filter(selector) :
          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
        this.forEach(function(el){
          if (excludes.indexOf(el) < 0) nodes.push(el)
        })
      }
      return $(nodes)
    },
    has: function(selector){
      return this.filter(function(){
        return isObject(selector) ?
          $.contains(this, selector) :
          $(this).find(selector).size()
      })
    },
    eq: function(idx){
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
    },
    first: function(){
      var el = this[0]
      return el && !isObject(el) ? el : $(el)
    },
    last: function(){
      var el = this[this.length - 1]
      return el && !isObject(el) ? el : $(el)
    },
    find: function(selector){
      var result, $this = this
      if (typeof selector == 'object')
        result = $(selector).filter(function(){
          var node = this
          return emptyArray.some.call($this, function(parent){
            return $.contains(parent, node)
          })
        })
      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
      else result = this.map(function(){ return zepto.qsa(this, selector) })
      return result
    },
    closest: function(selector, context){
      var node = this[0], collection = false
      if (typeof selector == 'object') collection = $(selector)
      while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
        node = node !== context && !isDocument(node) && node.parentNode
      return $(node)
    },
    parents: function(selector){
      var ancestors = [], nodes = this
      while (nodes.length > 0)
        nodes = $.map(nodes, function(node){
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node)
            return node
          }
        })
      return filtered(ancestors, selector)
    },
    parent: function(selector){
      return filtered(uniq(this.pluck('parentNode')), selector)
    },
    children: function(selector){
      return filtered(this.map(function(){ return children(this) }), selector)
    },
    contents: function() {
      return this.map(function() { return slice.call(this.childNodes) })
    },
    siblings: function(selector){
      return filtered(this.map(function(i, el){
        return filter.call(children(el.parentNode), function(child){ return child!==el })
      }), selector)
    },
    empty: function(){
      return this.each(function(){ this.innerHTML = '' })
    },
    // `pluck` is borrowed from Prototype.js
    pluck: function(property){
      return $.map(this, function(el){ return el[property] })
    },
    show: function(){
      return this.each(function(){
        this.style.display == "none" && (this.style.display = null)
        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
          this.style.display = defaultDisplay(this.nodeName)
      })
    },
    replaceWith: function(newContent){
      return this.before(newContent).remove()
    },
    wrap: function(structure){
      var func = isFunction(structure)
      if (this[0] && !func)
        var dom   = $(structure).get(0),
            clone = dom.parentNode || this.length > 1

      return this.each(function(index){
        $(this).wrapAll(
          func ? structure.call(this, index) :
            clone ? dom.cloneNode(true) : dom
        )
      })
    },
    wrapAll: function(structure){
      if (this[0]) {
        $(this[0]).before(structure = $(structure))
        var children
        // drill down to the inmost element
        while ((children = structure.children()).length) structure = children.first()
        $(structure).append(this)
      }
      return this
    },
    wrapInner: function(structure){
      var func = isFunction(structure)
      return this.each(function(index){
        var self = $(this), contents = self.contents(),
            dom  = func ? structure.call(this, index) : structure
        contents.length ? contents.wrapAll(dom) : self.append(dom)
      })
    },
    unwrap: function(){
      this.parent().each(function(){
        $(this).replaceWith($(this).children())
      })
      return this
    },
    clone: function(){
      return this.map(function(){ return this.cloneNode(true) })
    },
    hide: function(){
      return this.css("display", "none")
    },
    toggle: function(setting){
      return this.each(function(){
        var el = $(this)
        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
      })
    },
    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
    html: function(html){
      return html === undefined ?
        (this.length > 0 ? this[0].innerHTML : null) :
        this.each(function(idx){
          var originHtml = this.innerHTML
          $(this).empty().append( funcArg(this, html, idx, originHtml) )
        })
    },
    text: function(text){
      return text === undefined ?
        (this.length > 0 ? this[0].textContent : null) :
        this.each(function(){ this.textContent = text })
    },
    attr: function(name, value){
      var result
      return (typeof name == 'string' && value === undefined) ?
        (this.length == 0 || this[0].nodeType !== 1 ? undefined :
          (name == 'value' && this[0].nodeName == 'INPUT') ? this.val() :
          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
        ) :
        this.each(function(idx){
          if (this.nodeType !== 1) return
          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
        })
    },
    removeAttr: function(name){
      return this.each(function(){ this.nodeType === 1 && setAttribute(this, name) })
    },
    prop: function(name, value){
      return (value === undefined) ?
        (this[0] && this[0][name]) :
        this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name])
        })
    },
    data: function(name, value){
      var data = this.attr('data-' + dasherize(name), value)
      return data !== null ? deserializeValue(data) : undefined
    },
    val: function(value){
      return (value === undefined) ?
        (this[0] && (this[0].multiple ?
           $(this[0]).find('option').filter(function(o){ return this.selected }).pluck('value') :
           this[0].value)
        ) :
        this.each(function(idx){
          this.value = funcArg(this, value, idx, this.value)
        })
    },
    offset: function(coordinates){
      if (coordinates) return this.each(function(index){
        var $this = $(this),
            coords = funcArg(this, coordinates, index, $this.offset()),
            parentOffset = $this.offsetParent().offset(),
            props = {
              top:  coords.top  - parentOffset.top,
              left: coords.left - parentOffset.left
            }

        if ($this.css('position') == 'static') props['position'] = 'relative'
        $this.css(props)
      })
      if (this.length==0) return null
      var obj = this[0].getBoundingClientRect()
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      }
    },
    css: function(property, value){
      if (arguments.length < 2 && typeof property == 'string')
        return this[0] && (this[0].style[camelize(property)] || getComputedStyle(this[0], '').getPropertyValue(property))

      var css = ''
      if (type(property) == 'string') {
        if (!value && value !== 0)
          this.each(function(){ this.style.removeProperty(dasherize(property)) })
        else
          css = dasherize(property) + ":" + maybeAddPx(property, value)
      } else {
        for (key in property)
          if (!property[key] && property[key] !== 0)
            this.each(function(){ this.style.removeProperty(dasherize(key)) })
          else
            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
      }

      return this.each(function(){ this.style.cssText += ';' + css })
    },
    index: function(element){
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
    },
    hasClass: function(name){
      return emptyArray.some.call(this, function(el){
        return this.test(className(el))
      }, classRE(name))
    },
    addClass: function(name){
      return this.each(function(idx){
        classList = []
        var cls = className(this), newName = funcArg(this, name, idx, cls)
        newName.split(/\s+/g).forEach(function(klass){
          if (!$(this).hasClass(klass)) classList.push(klass)
        }, this)
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
      })
    },
    removeClass: function(name){
      return this.each(function(idx){
        if (name === undefined) return className(this, '')
        classList = className(this)
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
          classList = classList.replace(classRE(klass), " ")
        })
        className(this, classList.trim())
      })
    },
    toggleClass: function(name, when){
      return this.each(function(idx){
        var $this = $(this), names = funcArg(this, name, idx, className(this))
        names.split(/\s+/g).forEach(function(klass){
          (when === undefined ? !$this.hasClass(klass) : when) ?
            $this.addClass(klass) : $this.removeClass(klass)
        })
      })
    },
    scrollTop: function(){
      if (!this.length) return
      return ('scrollTop' in this[0]) ? this[0].scrollTop : this[0].scrollY
    },
    position: function() {
      if (!this.length) return

      var elem = this[0],
        // Get *real* offsetParent
        offsetParent = this.offsetParent(),
        // Get correct offsets
        offset       = this.offset(),
        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

      // Add offsetParent borders
      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

      // Subtract the two offsets
      return {
        top:  offset.top  - parentOffset.top,
        left: offset.left - parentOffset.left
      }
    },
    offsetParent: function() {
      return this.map(function(){
        var parent = this.offsetParent || document.body
        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
          parent = parent.offsetParent
        return parent
      })
    }
  }

  // for now
  $.fn.detach = $.fn.remove

  // Generate the `width` and `height` functions
  ;['width', 'height'].forEach(function(dimension){
    $.fn[dimension] = function(value){
      var offset, el = this[0],
        Dimension = dimension.replace(/./, function(m){ return m[0].toUpperCase() })
      if (value === undefined) return isWindow(el) ? el['inner' + Dimension] :
        isDocument(el) ? el.documentElement['offset' + Dimension] :
        (offset = this.offset()) && offset[dimension]
      else return this.each(function(idx){
        el = $(this)
        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
      })
    }
  })

  function traverseNode(node, fun) {
    fun(node)
    for (var key in node.childNodes) traverseNode(node.childNodes[key], fun)
  }

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2 //=> prepend, append

    $.fn[operator] = function(){
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      var argType, nodes = $.map(arguments, function(arg) {
            argType = type(arg)
            return argType == "object" || argType == "array" || arg == null ?
              arg : zepto.fragment(arg)
          }),
          parent, copyByClone = this.length > 1
      if (nodes.length < 1) return this

      return this.each(function(_, target){
        parent = inside ? target : target.parentNode

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling :
                 operatorIndex == 1 ? target.firstChild :
                 operatorIndex == 2 ? target :
                 null

        nodes.forEach(function(node){
          if (copyByClone) node = node.cloneNode(true)
          else if (!parent) return $(node).remove()

          traverseNode(parent.insertBefore(node, target), function(el){
            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
               (!el.type || el.type === 'text/javascript') && !el.src)
              window['eval'].call(window, el.innerHTML)
          })
        })
      })
    }

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
      $(html)[operator](this)
      return this
    }
  })

  zepto.Z.prototype = $.fn

  // Export internal API functions in the `$.zepto` namespace
  zepto.uniq = uniq
  zepto.deserializeValue = deserializeValue
  $.zepto = zepto

  return $
})()


window.Zepto = Zepto
'$' in window || (window.$ = Zepto)





;(function($){
  function detect(ua){
    var os = this.os = {}, browser = this.browser = {},
      webkit = ua.match(/WebKit\/([\d.]+)/),
      android = ua.match(/(Android)\s+([\d.]+)/),
      ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
      iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
      webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
      touchpad = webos && ua.match(/TouchPad/),
      kindle = ua.match(/Kindle\/([\d.]+)/),
      silk = ua.match(/Silk\/([\d._]+)/),
      blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
      bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
      rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
      playbook = ua.match(/PlayBook/),
      chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
      firefox = ua.match(/Firefox\/([\d.]+)/)

    // Todo: clean this up with a better OS/browser seperation:
    // - discern (more) between multiple browsers on android
    // - decide if kindle fire in silk mode is android or not
    // - Firefox on Android doesn't specify the Android version
    // - possibly devide in os, device and browser hashes

    if (browser.webkit = !!webkit) browser.version = webkit[1]

    if (android) os.android = true, os.version = android[2]
    if (iphone) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
    if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
    if (webos) os.webos = true, os.version = webos[2]
    if (touchpad) os.touchpad = true
    if (blackberry) os.blackberry = true, os.version = blackberry[2]
    if (bb10) os.bb10 = true, os.version = bb10[2]
    if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2]
    if (playbook) browser.playbook = true
    if (kindle) os.kindle = true, os.version = kindle[1]
    if (silk) browser.silk = true, browser.version = silk[1]
    if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
    if (chrome) browser.chrome = true, browser.version = chrome[1]
    if (firefox) browser.firefox = true, browser.version = firefox[1]

    os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) || (firefox && ua.match(/Tablet/)))
    os.phone  = !!(!os.tablet && (android || iphone || webos || blackberry || bb10 ||
      (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) || (firefox && ua.match(/Mobile/))))
  }

  detect.call($, navigator.userAgent)
  // make available to unit tests
  $.__detect = detect

})(Zepto)





;(function($){
  var $$ = $.zepto.qsa, handlers = {}, _zid = 1, specialEvents={},
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

  function zid(element) {
    return element._zid || (element._zid = _zid++)
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event)
    if (event.ns) var matcher = matcherFor(event.ns)
    return (handlers[zid(element)] || []).filter(function(handler) {
      return handler
        && (!event.e  || handler.e == event.e)
        && (!event.ns || matcher.test(handler.ns))
        && (!fn       || zid(handler.fn) === zid(fn))
        && (!selector || handler.sel == selector)
    })
  }
  function parse(event) {
    var parts = ('' + event).split('.')
    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
  }

  function eachEvent(events, fn, iterator){
    if ($.type(events) != "string") $.each(events, iterator)
    else events.split(/\s/).forEach(function(type){ iterator(type, fn) })
  }

  function eventCapture(handler, captureSetting) {
    return handler.del &&
      (handler.e == 'focus' || handler.e == 'blur') ||
      !!captureSetting
  }

  function realEvent(type) {
    return hover[type] || type
  }

  function add(element, events, fn, selector, getDelegate, capture){
    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
    eachEvent(events, fn, function(event, fn){
      var handler   = parse(event)
      handler.fn    = fn
      handler.sel   = selector
      // emulate mouseenter, mouseleave
      if (handler.e in hover) fn = function(e){
        var related = e.relatedTarget
        if (!related || (related !== this && !$.contains(this, related)))
          return handler.fn.apply(this, arguments)
      }
      handler.del   = getDelegate && getDelegate(fn, event)
      var callback  = handler.del || fn
      handler.proxy = function (e) {
        var result = callback.apply(element, [e].concat(e.data))
        if (result === false) e.preventDefault(), e.stopPropagation()
        return result
      }
      handler.i = set.length
      set.push(handler)
      element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
    })
  }
  function remove(element, events, fn, selector, capture){
    var id = zid(element)
    eachEvent(events || '', fn, function(event, fn){
      findHandlers(element, event, fn, selector).forEach(function(handler){
        delete handlers[id][handler.i]
        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
    })
  }

  $.event = { add: add, remove: remove }

  $.proxy = function(fn, context) {
    if ($.isFunction(fn)) {
      var proxyFn = function(){ return fn.apply(context, arguments) }
      proxyFn._zid = zid(fn)
      return proxyFn
    } else if (typeof context == 'string') {
      return $.proxy(fn[context], fn)
    } else {
      throw new TypeError("expected function")
    }
  }

  $.fn.bind = function(event, callback){
    return this.each(function(){
      add(this, event, callback)
    })
  }
  $.fn.unbind = function(event, callback){
    return this.each(function(){
      remove(this, event, callback)
    })
  }
  $.fn.one = function(event, callback){
    return this.each(function(i, element){
      add(this, event, callback, null, function(fn, type){
        return function(){
          var result = fn.apply(element, arguments)
          remove(element, type, fn)
          return result
        }
      })
    })
  }

  var returnTrue = function(){return true},
      returnFalse = function(){return false},
      ignoreProperties = /^([A-Z]|layer[XY]$)/,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      }
  function createProxy(event) {
    var key, proxy = { originalEvent: event }
    for (key in event)
      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

    $.each(eventMethods, function(name, predicate) {
      proxy[name] = function(){
        this[predicate] = returnTrue
        return event[name].apply(event, arguments)
      }
      proxy[predicate] = returnFalse
    })
    return proxy
  }

  // emulates the 'defaultPrevented' property for browsers that have none
  function fix(event) {
    if (!('defaultPrevented' in event)) {
      event.defaultPrevented = false
      var prevent = event.preventDefault
      event.preventDefault = function() {
        this.defaultPrevented = true
        prevent.call(this)
      }
    }
  }

  $.fn.delegate = function(selector, event, callback){
    return this.each(function(i, element){
      add(element, event, callback, selector, function(fn){
        return function(e){
          var evt, match = $(e.target).closest(selector, element).get(0)
          if (match) {
            evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
            return fn.apply(match, [evt].concat([].slice.call(arguments, 1)))
          }
        }
      })
    })
  }
  $.fn.undelegate = function(selector, event, callback){
    return this.each(function(){
      remove(this, event, callback, selector)
    })
  }

  $.fn.live = function(event, callback){
    $(document.body).delegate(this.selector, event, callback)
    return this
  }
  $.fn.die = function(event, callback){
    $(document.body).undelegate(this.selector, event, callback)
    return this
  }

  $.fn.on = function(event, selector, callback){
    return !selector || $.isFunction(selector) ?
      this.bind(event, selector || callback) : this.delegate(selector, event, callback)
  }
  $.fn.off = function(event, selector, callback){
    return !selector || $.isFunction(selector) ?
      this.unbind(event, selector || callback) : this.undelegate(selector, event, callback)
  }

  $.fn.trigger = function(event, data){
    if (typeof event == 'string' || $.isPlainObject(event)) event = $.Event(event)
    fix(event)
    event.data = data
    return this.each(function(){
      // items in the collection might not be DOM elements
      // (todo: possibly support events on plain old objects)
      if('dispatchEvent' in this) this.dispatchEvent(event)
    })
  }

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  $.fn.triggerHandler = function(event, data){
    var e, result
    this.each(function(i, element){
      e = createProxy(typeof event == 'string' ? $.Event(event) : event)
      e.data = data
      e.target = element
      $.each(findHandlers(element, event.type || event), function(i, handler){
        result = handler.proxy(e)
        if (e.isImmediatePropagationStopped()) return false
      })
    })
    return result
  }

  // shortcut methods for `.bind(event, fn)` for each event type
  ;('focusin focusout load resize scroll unload click dblclick '+
  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
    $.fn[event] = function(callback) {
      return callback ?
        this.bind(event, callback) :
        this.trigger(event)
    }
  })

  ;['focus', 'blur'].forEach(function(name) {
    $.fn[name] = function(callback) {
      if (callback) this.bind(name, callback)
      else this.each(function(){
        try { this[name]() }
        catch(e) {}
      })
      return this
    }
  })

  $.Event = function(type, props) {
    if (typeof type != 'string') props = type, type = props.type
    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
    event.initEvent(type, bubbles, true, null, null, null, null, null, null, null, null, null, null, null, null)
    event.isDefaultPrevented = function(){ return this.defaultPrevented }
    return event
  }

})(Zepto)





;(function($){
  var jsonpID = 0,
      document = window.document,
      key,
      name,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json',
      htmlType = 'text/html',
      blankRE = /^\s*$/

  // trigger a custom event and return false if it was cancelled
  function triggerAndReturn(context, eventName, data) {
    var event = $.Event(eventName)
    $(context).trigger(event, data)
    return !event.defaultPrevented
  }

  // trigger an Ajax "global" event
  function triggerGlobal(settings, context, eventName, data) {
    if (settings.global) return triggerAndReturn(context || document, eventName, data)
  }

  // Number of active Ajax requests
  $.active = 0

  function ajaxStart(settings) {
    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
  }
  function ajaxStop(settings) {
    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
  }

  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
  function ajaxBeforeSend(xhr, settings) {
    var context = settings.context
    if (settings.beforeSend.call(context, xhr, settings) === false ||
        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
      return false

    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
  }
  function ajaxSuccess(data, xhr, settings) {
    var context = settings.context, status = 'success'
    settings.success.call(context, data, status, xhr)
    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
    ajaxComplete(status, xhr, settings)
  }
  // type: "timeout", "error", "abort", "parsererror"
  function ajaxError(error, type, xhr, settings) {
    var context = settings.context
    settings.error.call(context, xhr, type, error)
    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error])
    ajaxComplete(type, xhr, settings)
  }
  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
  function ajaxComplete(status, xhr, settings) {
    var context = settings.context
    settings.complete.call(context, xhr, status)
    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
    ajaxStop(settings)
  }

  // Empty function, used as default callback
  function empty() {}

  $.ajaxJSONP = function(options){
    if (!('type' in options)) return $.ajax(options)

    var callbackName = 'jsonp' + (++jsonpID),
      script = document.createElement('script'),
      cleanup = function() {
        clearTimeout(abortTimeout)
        $(script).remove()
        delete window[callbackName]
      },
      abort = function(type){
        cleanup()
        // In case of manual abort or timeout, keep an empty function as callback
        // so that the SCRIPT tag that eventually loads won't result in an error.
        if (!type || type == 'timeout') window[callbackName] = empty
        ajaxError(null, type || 'abort', xhr, options)
      },
      xhr = { abort: abort }, abortTimeout

    if (ajaxBeforeSend(xhr, options) === false) {
      abort('abort')
      return false
    }

    window[callbackName] = function(data){
      cleanup()
      ajaxSuccess(data, xhr, options)
    }

    script.onerror = function() { abort('error') }

    script.src = options.url.replace(/=\?/, '=' + callbackName)
    $('head').append(script)

    if (options.timeout > 0) abortTimeout = setTimeout(function(){
      abort('timeout')
    }, options.timeout)

    return xhr
  }

  $.ajaxSettings = {
    // Default type of request
    type: 'GET',
    // Callback that is executed before request
    beforeSend: empty,
    // Callback that is executed if the request succeeds
    success: empty,
    // Callback that is executed the the server drops error
    error: empty,
    // Callback that is executed on request complete (both: error and success)
    complete: empty,
    // The context for the callbacks
    context: null,
    // Whether to trigger "global" Ajax events
    global: true,
    // Transport
    xhr: function () {
      return new window.XMLHttpRequest()
    },
    // MIME types mapping
    accepts: {
      script: 'text/javascript, application/javascript',
      json:   jsonType,
      xml:    'application/xml, text/xml',
      html:   htmlType,
      text:   'text/plain'
    },
    // Whether the request is to another domain
    crossDomain: false,
    // Default timeout
    timeout: 0,
    // Whether data should be serialized to string
    processData: true,
    // Whether the browser should be allowed to cache GET responses
    cache: true,
  }

  function mimeToDataType(mime) {
    if (mime) mime = mime.split(';', 2)[0]
    return mime && ( mime == htmlType ? 'html' :
      mime == jsonType ? 'json' :
      scriptTypeRE.test(mime) ? 'script' :
      xmlTypeRE.test(mime) && 'xml' ) || 'text'
  }

  function appendQuery(url, query) {
    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
  }

  // serialize payload and append it to the URL for GET requests
  function serializeData(options) {
    if (options.processData && options.data && $.type(options.data) != "string")
      options.data = $.param(options.data, options.traditional)
    if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
      options.url = appendQuery(options.url, options.data)
  }

  $.ajax = function(options){
    var settings = $.extend({}, options || {})
    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

    ajaxStart(settings)

    if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
      RegExp.$2 != window.location.host

    if (!settings.url) settings.url = window.location.toString()
    serializeData(settings)
    if (settings.cache === false) settings.url = appendQuery(settings.url, '_=' + Date.now())

    var dataType = settings.dataType, hasPlaceholder = /=\?/.test(settings.url)
    if (dataType == 'jsonp' || hasPlaceholder) {
      if (!hasPlaceholder) settings.url = appendQuery(settings.url, 'callback=?')
      return $.ajaxJSONP(settings)
    }

    var mime = settings.accepts[dataType],
        baseHeaders = { },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = settings.xhr(), abortTimeout

    if (!settings.crossDomain) baseHeaders['X-Requested-With'] = 'XMLHttpRequest'
    if (mime) {
      baseHeaders['Accept'] = mime
      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
      xhr.overrideMimeType && xhr.overrideMimeType(mime)
    }
    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
      baseHeaders['Content-Type'] = (settings.contentType || 'application/x-www-form-urlencoded')
    settings.headers = $.extend(baseHeaders, settings.headers || {})

    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = empty;
        clearTimeout(abortTimeout)
        var result, error = false
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
          dataType = dataType || mimeToDataType(xhr.getResponseHeader('content-type'))
          result = xhr.responseText

          try {
            // http://perfectionkills.com/global-eval-what-are-the-options/
            if (dataType == 'script')    (1,eval)(result)
            else if (dataType == 'xml')  result = xhr.responseXML
            else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
          } catch (e) { error = e }

          if (error) ajaxError(error, 'parsererror', xhr, settings)
          else ajaxSuccess(result, xhr, settings)
        } else {
          ajaxError(null, xhr.status ? 'error' : 'abort', xhr, settings)
        }
      }
    }

    var async = 'async' in settings ? settings.async : true
    xhr.open(settings.type, settings.url, async)

    for (name in settings.headers) xhr.setRequestHeader(name, settings.headers[name])

    if (ajaxBeforeSend(xhr, settings) === false) {
      xhr.abort()
      return false
    }

    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
        xhr.onreadystatechange = empty
        xhr.abort()
        ajaxError(null, 'timeout', xhr, settings)
      }, settings.timeout)

    // avoid sending empty string (#319)
    xhr.send(settings.data ? settings.data : null)
    return xhr
  }

  // handle optional data/success arguments
  function parseArguments(url, data, success, dataType) {
    var hasData = !$.isFunction(data)
    return {
      url:      url,
      data:     hasData  ? data : undefined,
      success:  !hasData ? data : $.isFunction(success) ? success : undefined,
      dataType: hasData  ? dataType || success : success
    }
  }

  $.get = function(url, data, success, dataType){
    return $.ajax(parseArguments.apply(null, arguments))
  }

  $.post = function(url, data, success, dataType){
    var options = parseArguments.apply(null, arguments)
    options.type = 'POST'
    return $.ajax(options)
  }

  $.getJSON = function(url, data, success){
    var options = parseArguments.apply(null, arguments)
    options.dataType = 'json'
    return $.ajax(options)
  }

  $.fn.load = function(url, data, success){
    if (!this.length) return this
    var self = this, parts = url.split(/\s/), selector,
        options = parseArguments(url, data, success),
        callback = options.success
    if (parts.length > 1) options.url = parts[0], selector = parts[1]
    options.success = function(response){
      self.html(selector ?
        $('<div>').html(response.replace(rscript, "")).find(selector)
        : response)
      callback && callback.apply(self, arguments)
    }
    $.ajax(options)
    return this
  }

  var escape = encodeURIComponent

  function serialize(params, obj, traditional, scope){
    var type, array = $.isArray(obj)
    $.each(obj, function(key, value) {
      type = $.type(value)
      if (scope) key = traditional ? scope : scope + '[' + (array ? '' : key) + ']'
      // handle data in serializeArray() format
      if (!scope && array) params.add(value.name, value.value)
      // recurse into nested objects
      else if (type == "array" || (!traditional && type == "object"))
        serialize(params, value, traditional, key)
      else params.add(key, value)
    })
  }

  $.param = function(obj, traditional){
    var params = []
    params.add = function(k, v){ this.push(escape(k) + '=' + escape(v)) }
    serialize(params, obj, traditional)
    return params.join('&').replace(/%20/g, '+')
  }
})(Zepto)





;(function ($) {
  $.fn.serializeArray = function () {
    var result = [], el
    $( Array.prototype.slice.call(this.get(0).elements) ).each(function () {
      el = $(this)
      var type = el.attr('type')
      if (this.nodeName.toLowerCase() != 'fieldset' &&
        !this.disabled && type != 'submit' && type != 'reset' && type != 'button' &&
        ((type != 'radio' && type != 'checkbox') || this.checked))
        result.push({
          name: el.attr('name'),
          value: el.val()
        })
    })
    return result
  }

  $.fn.serialize = function () {
    var result = []
    this.serializeArray().forEach(function (elm) {
      result.push( encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value) )
    })
    return result.join('&')
  }

  $.fn.submit = function (callback) {
    if (callback) this.bind('submit', callback)
    else if (this.length) {
      var event = $.Event('submit')
      this.eq(0).trigger(event)
      if (!event.defaultPrevented) this.get(0).submit()
    }
    return this
  }

})(Zepto)





;(function($, undefined){
  var prefix = '', eventPrefix, endEventName, endAnimationName,
    vendors = { Webkit: 'webkit', Moz: '', O: 'o', ms: 'MS' },
    document = window.document, testEl = document.createElement('div'),
    supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
    transform,
    transitionProperty, transitionDuration, transitionTiming,
    animationName, animationDuration, animationTiming,
    cssReset = {}

  function dasherize(str) { return downcase(str.replace(/([a-z])([A-Z])/, '$1-$2')) }
  function downcase(str) { return str.toLowerCase() }
  function normalizeEvent(name) { return eventPrefix ? eventPrefix + name : downcase(name) }

  $.each(vendors, function(vendor, event){
    if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
      prefix = '-' + downcase(vendor) + '-'
      eventPrefix = event
      return false
    }
  })

  transform = prefix + 'transform'
  cssReset[transitionProperty = prefix + 'transition-property'] =
  cssReset[transitionDuration = prefix + 'transition-duration'] =
  cssReset[transitionTiming   = prefix + 'transition-timing-function'] =
  cssReset[animationName      = prefix + 'animation-name'] =
  cssReset[animationDuration  = prefix + 'animation-duration'] =
  cssReset[animationTiming    = prefix + 'animation-timing-function'] = ''

  $.fx = {
    off: (eventPrefix === undefined && testEl.style.transitionProperty === undefined),
    speeds: { _default: 400, fast: 200, slow: 600 },
    cssPrefix: prefix,
    transitionEnd: normalizeEvent('TransitionEnd'),
    animationEnd: normalizeEvent('AnimationEnd')
  }

  $.fn.animate = function(properties, duration, ease, callback){
    if ($.isPlainObject(duration))
      ease = duration.easing, callback = duration.complete, duration = duration.duration
    if (duration) duration = (typeof duration == 'number' ? duration :
                    ($.fx.speeds[duration] || $.fx.speeds._default)) / 1000
    return this.anim(properties, duration, ease, callback)
  }

  $.fn.anim = function(properties, duration, ease, callback){
    var key, cssValues = {}, cssProperties, transforms = '',
        that = this, wrappedCallback, endEvent = $.fx.transitionEnd

    if (duration === undefined) duration = 0.4
    if ($.fx.off) duration = 0

    if (typeof properties == 'string') {
      // keyframe animation
      cssValues[animationName] = properties
      cssValues[animationDuration] = duration + 's'
      cssValues[animationTiming] = (ease || 'linear')
      endEvent = $.fx.animationEnd
    } else {
      cssProperties = []
      // CSS transitions
      for (key in properties)
        if (supportedTransforms.test(key)) transforms += key + '(' + properties[key] + ') '
        else cssValues[key] = properties[key], cssProperties.push(dasherize(key))

      if (transforms) cssValues[transform] = transforms, cssProperties.push(transform)
      if (duration > 0 && typeof properties === 'object') {
        cssValues[transitionProperty] = cssProperties.join(', ')
        cssValues[transitionDuration] = duration + 's'
        cssValues[transitionTiming] = (ease || 'linear')
      }
    }

    wrappedCallback = function(event){
      if (typeof event !== 'undefined') {
        if (event.target !== event.currentTarget) return // makes sure the event didn't bubble from "below"
        $(event.target).unbind(endEvent, wrappedCallback)
      }
      $(this).css(cssReset)
      callback && callback.call(this)
    }
    if (duration > 0) this.bind(endEvent, wrappedCallback)

    // trigger page reflow so new elements can animate
    this.size() && this.get(0).clientLeft

    this.css(cssValues)

    if (duration <= 0) setTimeout(function() {
      that.each(function(){ wrappedCallback.call(this) })
    }, 0)

    return this
  }

  testEl = null
})(Zepto)

/*

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

// lib/handlebars/browser-prefix.js
var Handlebars = {};

(function(Handlebars, undefined) {
;
// lib/handlebars/base.js

Handlebars.VERSION = "1.0.0";
Handlebars.COMPILER_REVISION = 4;

Handlebars.REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '>= 1.0.0'
};

Handlebars.helpers  = {};
Handlebars.partials = {};

var toString = Object.prototype.toString,
    functionType = '[object Function]',
    objectType = '[object Object]';

Handlebars.registerHelper = function(name, fn, inverse) {
  if (toString.call(name) === objectType) {
    if (inverse || fn) { throw new Handlebars.Exception('Arg not supported with multiple helpers'); }
    Handlebars.Utils.extend(this.helpers, name);
  } else {
    if (inverse) { fn.not = inverse; }
    this.helpers[name] = fn;
  }
};

Handlebars.registerPartial = function(name, str) {
  if (toString.call(name) === objectType) {
    Handlebars.Utils.extend(this.partials,  name);
  } else {
    this.partials[name] = str;
  }
};

Handlebars.registerHelper('helperMissing', function(arg) {
  if(arguments.length === 2) {
    return undefined;
  } else {
    throw new Error("Missing helper: '" + arg + "'");
  }
});

Handlebars.registerHelper('blockHelperMissing', function(context, options) {
  var inverse = options.inverse || function() {}, fn = options.fn;

  var type = toString.call(context);

  if(type === functionType) { context = context.call(this); }

  if(context === true) {
    return fn(this);
  } else if(context === false || context == null) {
    return inverse(this);
  } else if(type === "[object Array]") {
    if(context.length > 0) {
      return Handlebars.helpers.each(context, options);
    } else {
      return inverse(this);
    }
  } else {
    return fn(context);
  }
});

Handlebars.K = function() {};

Handlebars.createFrame = Object.create || function(object) {
  Handlebars.K.prototype = object;
  var obj = new Handlebars.K();
  Handlebars.K.prototype = null;
  return obj;
};

Handlebars.logger = {
  DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, level: 3,

  methodMap: {0: 'debug', 1: 'info', 2: 'warn', 3: 'error'},

  // can be overridden in the host environment
  log: function(level, obj) {
    if (Handlebars.logger.level <= level) {
      var method = Handlebars.logger.methodMap[level];
      if (typeof console !== 'undefined' && console[method]) {
        console[method].call(console, obj);
      }
    }
  }
};

Handlebars.log = function(level, obj) { Handlebars.logger.log(level, obj); };

Handlebars.registerHelper('each', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var i = 0, ret = "", data;

  var type = toString.call(context);
  if(type === functionType) { context = context.call(this); }

  if (options.data) {
    data = Handlebars.createFrame(options.data);
  }

  if(context && typeof context === 'object') {
    if(context instanceof Array){
      for(var j = context.length; i<j; i++) {
        if (data) { data.index = i; }
        ret = ret + fn(context[i], { data: data });
      }
    } else {
      for(var key in context) {
        if(context.hasOwnProperty(key)) {
          if(data) { data.key = key; }
          ret = ret + fn(context[key], {data: data});
          i++;
        }
      }
    }
  }

  if(i === 0){
    ret = inverse(this);
  }

  return ret;
});

Handlebars.registerHelper('if', function(conditional, options) {
  var type = toString.call(conditional);
  if(type === functionType) { conditional = conditional.call(this); }

  if(!conditional || Handlebars.Utils.isEmpty(conditional)) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

Handlebars.registerHelper('unless', function(conditional, options) {
  return Handlebars.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn});
});

Handlebars.registerHelper('with', function(context, options) {
  var type = toString.call(context);
  if(type === functionType) { context = context.call(this); }

  if (!Handlebars.Utils.isEmpty(context)) return options.fn(context);
});

Handlebars.registerHelper('log', function(context, options) {
  var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
  Handlebars.log(level, context);
});
;
// lib/handlebars/utils.js

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

Handlebars.Exception = function(message) {
  var tmp = Error.prototype.constructor.apply(this, arguments);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }
};
Handlebars.Exception.prototype = new Error();

// Build out our basic SafeString type
Handlebars.SafeString = function(string) {
  this.string = string;
};
Handlebars.SafeString.prototype.toString = function() {
  return this.string.toString();
};

var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;

var escapeChar = function(chr) {
  return escape[chr] || "&amp;";
};

Handlebars.Utils = {
  extend: function(obj, value) {
    for(var key in value) {
      if(value.hasOwnProperty(key)) {
        obj[key] = value[key];
      }
    }
  },

  escapeExpression: function(string) {
    // don't escape SafeStrings, since they're already safe
    if (string instanceof Handlebars.SafeString) {
      return string.toString();
    } else if (string == null || string === false) {
      return "";
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = string.toString();

    if(!possible.test(string)) { return string; }
    return string.replace(badChars, escapeChar);
  },

  isEmpty: function(value) {
    if (!value && value !== 0) {
      return true;
    } else if(toString.call(value) === "[object Array]" && value.length === 0) {
      return true;
    } else {
      return false;
    }
  }
};
;
// lib/handlebars/runtime.js

Handlebars.VM = {
  template: function(templateSpec) {
    // Just add water
    var container = {
      escapeExpression: Handlebars.Utils.escapeExpression,
      invokePartial: Handlebars.VM.invokePartial,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          programWrapper = Handlebars.VM.program(i, fn, data);
        } else if (!programWrapper) {
          programWrapper = this.programs[i] = Handlebars.VM.program(i, fn);
        }
        return programWrapper;
      },
      merge: function(param, common) {
        var ret = param || common;

        if (param && common) {
          ret = {};
          Handlebars.Utils.extend(ret, common);
          Handlebars.Utils.extend(ret, param);
        }
        return ret;
      },
      programWithDepth: Handlebars.VM.programWithDepth,
      noop: Handlebars.VM.noop,
      compilerInfo: null
    };

    return function(context, options) {
      options = options || {};
      var result = templateSpec.call(container, Handlebars, context, options.helpers, options.partials, options.data);

      var compilerInfo = container.compilerInfo || [],
          compilerRevision = compilerInfo[0] || 1,
          currentRevision = Handlebars.COMPILER_REVISION;

      if (compilerRevision !== currentRevision) {
        if (compilerRevision < currentRevision) {
          var runtimeVersions = Handlebars.REVISION_CHANGES[currentRevision],
              compilerVersions = Handlebars.REVISION_CHANGES[compilerRevision];
          throw "Template was precompiled with an older version of Handlebars than the current runtime. "+
                "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").";
        } else {
          // Use the embedded version info since the runtime doesn't know about this revision yet
          throw "Template was precompiled with a newer version of Handlebars than the current runtime. "+
                "Please update your runtime to a newer version ("+compilerInfo[1]+").";
        }
      }

      return result;
    };
  },

  programWithDepth: function(i, fn, data /*, $depth */) {
    var args = Array.prototype.slice.call(arguments, 3);

    var program = function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
    program.program = i;
    program.depth = args.length;
    return program;
  },
  program: function(i, fn, data) {
    var program = function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
    program.program = i;
    program.depth = 0;
    return program;
  },
  noop: function() { return ""; },
  invokePartial: function(partial, name, context, helpers, partials, data) {
    var options = { helpers: helpers, partials: partials, data: data };

    if(partial === undefined) {
      throw new Handlebars.Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    } else if (!Handlebars.compile) {
      throw new Handlebars.Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    } else {
      partials[name] = Handlebars.compile(partial, {data: data !== undefined});
      return partials[name](context, options);
    }
  }
};

Handlebars.template = Handlebars.VM.template;
;
// lib/handlebars/browser-suffix.js
})(Handlebars);
;

//     Underscore.js 1.4.4
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      concat           = ArrayProto.concat,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.4.4';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? null : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See: https://bugs.webkit.org/show_bug.cgi?id=80797
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value || _.identity);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    each(input, function(value) {
      if (_.isArray(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(concat.apply(ArrayProto, arguments));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(args, "" + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    var args = slice.call(arguments, 2);
    return function() {
      return func.apply(context, args.concat(slice.call(arguments)));
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function() {
      previous = new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] == null) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent, but `Object`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                               _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
        return false;
      }
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(n);
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);

//     Backbone.js 1.0.0

//     (c) 2010-2013 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `exports`
  // on the server).
  var root = this;

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create local references to array methods we'll want to use later.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both the browser and the server.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.0.0';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = root.jQuery || root.Zepto || root.ender || root.$;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }

      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeners = this._listeners;
      if (!listeners) return this;
      var deleteListener = !name && !callback;
      if (typeof name === 'object') callback = this;
      if (obj) (listeners = {})[obj._listenerId] = obj;
      for (var id in listeners) {
        listeners[id].off(name, callback, this);
        if (deleteListener) delete this._listeners[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
      listeners[id] = obj;
      if (typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var defaults;
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId('c');
    this.attributes = {};
    _.extend(this, _.pick(options, modelOptions));
    if (options.parse) attrs = this.parse(attrs, options) || {};
    if (defaults = _.result(this, 'defaults')) {
      attrs = _.defaults({}, attrs, defaults);
    }
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // A list of options to be attached directly to the model, if provided.
  var modelOptions = ['url', 'urlRoot', 'collection'];

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = true;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      // If we're not waiting and attributes exist, save acts as `set(attr).save(null, opts)`.
      if (attrs && (!options || !options.wait) && !this.set(attrs, options)) return false;

      options = _.extend({validate: true}, options);

      // Do not persist invalid models.
      if (!this._validate(attrs, options)) return false;

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }
      wrapError(this, options);

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return this.id == null;
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend(options || {}, { validate: true }));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options || {}, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model.
  var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  _.each(modelMethods, function(method) {
    Model.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  });

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analagous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.url) this.url = options.url;
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, merge: false, remove: false};

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      return this.set(models, _.defaults(options || {}, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      models = _.isArray(models) ? models.slice() : [models];
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model);
      }
      return this;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      options = _.defaults(options || {}, setOptions);
      if (options.parse) models = this.parse(models, options);
      if (!_.isArray(models)) models = models ? [models] : [];
      var i, l, model, attrs, existing, sort;
      var at = options.at;
      var sortable = this.comparator && (at == null) && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        if (!(model = this._prepareModel(models[i], options))) continue;

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(model)) {
          if (options.remove) modelMap[existing.cid] = true;
          if (options.merge) {
            existing.set(model.attributes, options);
            if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
          }

        // This is a new model, push it to the `toAdd` list.
        } else if (options.add) {
          toAdd.push(model);

          // Listen to added models' events, and index models for lookup by
          // `id` and by `cid`.
          model.on('all', this._onModelEvent, this);
          this._byId[model.cid] = model;
          if (model.id != null) this._byId[model.id] = model;
        }
      }

      // Remove nonexistent models if appropriate.
      if (options.remove) {
        for (i = 0, l = this.length; i < l; ++i) {
          if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
        }
        if (toRemove.length) this.remove(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (toAdd.length) {
        if (sortable) sort = true;
        this.length += toAdd.length;
        if (at != null) {
          splice.apply(this.models, [at, 0].concat(toAdd));
        } else {
          push.apply(this.models, toAdd);
        }
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      if (options.silent) return this;

      // Trigger `add` events.
      for (i = 0, l = toAdd.length; i < l; i++) {
        (model = toAdd[i]).trigger('add', model, this, options);
      }

      // Trigger `sort` if the collection was sorted.
      if (sort) this.trigger('sort', this, options);
      return this;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i]);
      }
      options.previousModels = this.models;
      this._reset();
      this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: this.length}, options));
      return model;
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: 0}, options));
      return model;
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function(begin, end) {
      return this.models.slice(begin, end);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj.id != null ? obj.id : obj.cid || obj];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      if (_.isEmpty(attrs)) return first ? void 0 : [];
      return this[first ? 'find' : 'filter'](function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Figure out the smallest index at which a model should be inserted so as
    // to maintain order.
    sortedIndex: function(model, value, context) {
      value || (value = this.comparator);
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _.sortedIndex(this.models, model, iterator, context);
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(resp) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) {
        if (!attrs.collection) attrs.collection = this;
        return attrs;
      }
      options || (options = {});
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model._validate(attrs, options)) {
        this.trigger('invalid', this, attrs, options);
        return false;
      }
      return model;
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'indexOf', 'shuffle', 'lastIndexOf',
    'isEmpty', 'chain'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this._configure(options || {});
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be prefered to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
      return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // Performs the initial configuration of a View with a set of options.
    // Keys with special meaning *(e.g. model, collection, id, className)* are
    // attached directly to the view.  See `viewOptions` for an exhaustive
    // list.
    _configure: function(options) {
      if (this.options) options = _.extend({}, _.result(this, 'options'), options);
      _.extend(this, _.pick(options, viewOptions));
      this.options = options;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    // that still has ActiveX enabled by default, override jQuery to use that
    // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if (params.type === 'PATCH' && window.ActiveXObject &&
          !(window.external && window.external.msActiveXFilteringEnabled)) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        callback && callback.apply(router, args);
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
      });
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional){
                     return optional ? match : '([^\/]+)';
                   })
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param) {
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = this.location.pathname;
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.substr(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({}, {root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;
      var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;

      // If we've started off with a route from a `pushState`-enabled browser,
      // but we're currently in a browser that doesn't support it...
      if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
        this.fragment = this.getFragment(null, true);
        this.location.replace(this.root + this.location.search + '#' + this.fragment);
        // Return immediately as browser will do redirect to new url
        return true;

      // Or if we've started out with a hash-based route, but we're currently
      // in a browser where it could be `pushState`-based instead...
      } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
        this.fragment = this.getHash().replace(routeStripper, '');
        this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(this.getHash());
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragmentOverride) {
      var fragment = this.fragment = this.getFragment(fragmentOverride);
      var matched = _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
      return matched;
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: options};
      fragment = this.getFragment(fragment || '');
      if (this.fragment === fragment) return;
      this.fragment = fragment;
      var url = this.root + fragment;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function (model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error(model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

}).call(this);

/*
Copyright (c) 2011-2013 @WalmartLabs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
*/

;;
(function() {

/*global cloneInheritVars, createInheritVars, resetInheritVars, createRegistryWrapper, getValue, inheritVars, createErrorMessage */

//support zepto.forEach on jQuery
if (!$.fn.forEach) {
  $.fn.forEach = function(iterator, context) {
    $.fn.each.call(this, function(index) {
      iterator.call(context || this, this, index);
    });
  };
}

var viewNameAttributeName = 'data-view-name',
    viewCidAttributeName = 'data-view-cid',
    viewHelperAttributeName = 'data-view-helper';

//view instances
var viewsIndexedByCid = {};

if (!Handlebars.templates) {
  Handlebars.templates = {};
}

var Thorax = this.Thorax = {
  templatePathPrefix: '',
  //view classes
  Views: {},
  //certain error prone pieces of code (on Android only it seems)
  //are wrapped in a try catch block, then trigger this handler in
  //the catch, with the name of the function or event that was
  //trying to be executed. Override this with a custom handler
  //to debug / log / etc
  onException: function(name, err) {
    throw err;
  },
  //deprecated, here to ensure existing projects aren't mucked with
  templates: Handlebars.templates
};

Thorax.View = Backbone.View.extend({
  constructor: function() {
    var response = Backbone.View.apply(this, arguments);
    _.each(inheritVars, function(obj) {
      if (obj.ctor) {
        obj.ctor.call(this, response);
      }
    }, this);
    return response;
  },
  _configure: function(options) {
    var self = this;

    this._referenceCount = 0;

    this._objectOptionsByCid = {};
    this._boundDataObjectsByCid = {};

    // Setup object event tracking
    _.each(inheritVars, function(obj) {
      self[obj.name] = [];
    });

    viewsIndexedByCid[this.cid] = this;
    this.children = {};
    this._renderCount = 0;

    //this.options is removed in Thorax.View, we merge passed
    //properties directly with the view and template context
    _.extend(this, options || {});

    // Setup helpers
    bindHelpers.call(this);

    _.each(inheritVars, function(obj) {
      if (obj.configure) {
        obj.configure.call(this);
      }
    }, this);

    this.trigger('configure');
  },

  setElement : function() {
    var response = Backbone.View.prototype.setElement.apply(this, arguments);
    this.name && this.$el.attr(viewNameAttributeName, this.name);
    this.$el.attr(viewCidAttributeName, this.cid);
    return response;
  },

  _addChild: function(view) {
    if (this.children[view.cid]) {
      return view;
    }
    view.retain();
    this.children[view.cid] = view;
    // _helperOptions is used to detect if is HelperView
    // we do not want to remove child in this case as
    // we are adding the HelperView to the declaring view
    // (whatever view used the view helper in it's template)
    // but it's parent will not equal the declaring view
    // in the case of a nested helper, which will cause an error.
    // In either case it's not necessary to ever call
    // _removeChild on a HelperView as _addChild should only
    // be called when a HelperView is created.
    if (view.parent && view.parent !== this && !view._helperOptions) {
      view.parent._removeChild(view);
    }
    view.parent = this;
    this.trigger('child', view);
    return view;
  },

  _removeChild: function(view) {
    delete this.children[view.cid];
    view.parent = null;
    view.release();
    return view;
  },

  _destroy: function(options) {
    _.each(this._boundDataObjectsByCid, this.unbindDataObject, this);
    this.trigger('destroyed');
    delete viewsIndexedByCid[this.cid];

    _.each(this.children, function(child) {
      this._removeChild(child);
    }, this);

    if (this.el) {
      this.undelegateEvents();
      this.remove();  // Will call stopListening()
      this.off();     // Kills off remaining events
    }

    // Absolute worst case scenario, kill off some known fields to minimize the impact
    // of being retained.
    this.el = this.$el = undefined;
    this.parent = undefined;
    this.model = this.collection = this._collection = undefined;
    this._helperOptions = undefined;
  },

  render: function(output) {
    // NOP for destroyed views
    if (!this.el) {
      return;
    }

    if (this._rendering) {
      // Nested rendering of the same view instances can lead to some very nasty issues with
      // the root render process overwriting any updated data that may have been output in the child
      // execution. If in a situation where you need to rerender in response to an event that is
      // triggered sync in the rendering lifecycle it's recommended to defer the subsequent render
      // or refactor so that all preconditions are known prior to exec.
      throw new Error(createErrorMessage('nested-render'));
    }

    this._previousHelpers = _.filter(this.children, function(child) {
      return child._helperOptions;
    });

    var children = {};
    _.each(this.children, function(child, key) {
      if (!child._helperOptions) {
        children[key] = child;
      }
    });
    this.children = children;

    this.trigger('before:rendered');
    this._rendering = true;

    try {
      if (_.isUndefined(output) || (!_.isElement(output) && !Thorax.Util.is$(output) && !(output && output.el) && !_.isString(output) && !_.isFunction(output))) {
        // try one more time to assign the template, if we don't
        // yet have one we must raise
        assignTemplate.call(this, 'template', {
          required: true
        });
        output = this.renderTemplate(this.template);
      } else if (_.isFunction(output)) {
        output = this.renderTemplate(output);
      }

      // Destroy any helpers that may be lingering
      _.each(this._previousHelpers, function(child) {
        this._removeChild(child);
      }, this);
      this._previousHelpers = undefined;

      //accept a view, string, Handlebars.SafeString or DOM element
      this.html((output && output.el) || (output && output.string) || output);

      ++this._renderCount;
      this.trigger('rendered');
    } finally {
      this._rendering = false;
    }

    return output;
  },

  context: function() {
    return _.extend({}, (this.model && this.model.attributes) || {});
  },

  _getContext: function() {
    return _.extend({}, this, getValue(this, 'context') || {});
  },

  // Private variables in handlebars / options.data in template helpers
  _getData: function(data) {
    return {
      view: this,
      cid: _.uniqueId('t'),
      yield: function() {
        // fn is seeded by template helper passing context to data
        return data.fn && data.fn(data);
      }
    };
  },

  renderTemplate: function(file, context, ignoreErrors) {
    var template;
    context = context || this._getContext();
    if (_.isFunction(file)) {
      template = file;
    } else {
      template = Thorax.Util.getTemplate(file, ignoreErrors);
    }
    if (!template) {
      return '';
    } else {
      return template(context, {
        helpers: this.helpers,
        data: this._getData(context)
      });
    }
  },

  ensureRendered: function() {
    !this._renderCount && this.render();
  },
  shouldRender: function(flag) {
    // Render if flag is truthy or if we have already rendered and flag is undefined/null
    return flag || (flag == null && this._renderCount);
  },
  conditionalRender: function(flag) {
    if (this.shouldRender(flag)) {
      this.render();
    }
  },

  appendTo: function(el) {
    this.ensureRendered();
    $(el).append(this.el);
    this.trigger('ready', {target: this});
  },

  html: function(html) {
    if (_.isUndefined(html)) {
      return this.el.innerHTML;
    } else {
      // Event for IE element fixes
      this.trigger('before:append');
      var element = this._replaceHTML(html);
      this.trigger('append');
      return element;
    }
  },

  release: function() {
    --this._referenceCount;
    if (this._referenceCount <= 0) {
      this._destroy();
    }
  },

  retain: function(owner) {
    ++this._referenceCount;
    if (owner) {
      // Not using listenTo helper as we want to run once the owner is destroyed
      this.listenTo(owner, 'destroyed', owner.release);
    }
  },

  _replaceHTML: function(html) {
    this.el.innerHTML = "";
    return this.$el.append(html);
  },

  _anchorClick: function(event) {
    var target = $(event.currentTarget),
        href = target.attr('href');
    // Route anything that starts with # or / (excluding //domain urls)
    if (href && (href[0] === '#' || (href[0] === '/' && href[1] !== '/'))) {
      Backbone.history.navigate(href, {
        trigger: true
      });
      return false;
    }
    return true;
  }
});

Thorax.View.extend = function() {
  createInheritVars(this);

  var child = Backbone.View.extend.apply(this, arguments);
  child.__parent__ = this;

  resetInheritVars(child);

  return child;
};

createRegistryWrapper(Thorax.View, Thorax.Views);

function bindHelpers() {
  if (this.helpers) {
    _.each(this.helpers, function(helper, name) {
      var view = this;
      this.helpers[name] = function() {
        var args = _.toArray(arguments),
            options = _.last(args);
        options.context = this;
        return helper.apply(view, args);
      };
    }, this);
  }
}

//$(selector).view() helper
$.fn.view = function(options) {
  options = _.defaults(options || {}, {
    helper: true
  });
  var selector = '[' + viewCidAttributeName + ']';
  if (!options.helper) {
    selector += ':not([' + viewHelperAttributeName + '])';
  }
  var el = $(this).closest(selector);
  return (el && viewsIndexedByCid[el.attr(viewCidAttributeName)]) || false;
};

;;
/*global createRegistryWrapper:true, cloneEvents: true */
function createErrorMessage(code) {
  return 'Error "' + code + '". For more information visit http://thoraxjs.org/error-codes.html' + '#' + code;
}

function createRegistryWrapper(klass, hash) {
  var $super = klass.extend;
  klass.extend = function() {
    var child = $super.apply(this, arguments);
    if (child.prototype.name) {
      hash[child.prototype.name] = child;
    }
    return child;
  };
}

function registryGet(object, type, name, ignoreErrors) {
  var target = object[type],
      value;
  if (_.indexOf(name, '.') >= 0) {
    var bits = name.split(/\./);
    name = bits.pop();
    _.each(bits, function(key) {
      target = target[key];
    });
  }
  target && (value = target[name]);
  if (!value && !ignoreErrors) {
    throw new Error(type + ': ' + name + ' does not exist.');
  } else {
    return value;
  }
}

function assignView(attributeName, options) {
  var ViewClass;
  // if attribute is the name of view to fetch
  if (_.isString(this[attributeName])) {
    ViewClass = Thorax.Util.getViewClass(this[attributeName], true);
  // else try and fetch the view based on the name
  } else if (this.name && !_.isFunction(this[attributeName])) {
    ViewClass = Thorax.Util.getViewClass(this.name + (options.extension || ''), true);
  }
  // if we found something, assign it
  if (ViewClass && !_.isFunction(this[attributeName])) {
    this[attributeName] = ViewClass;
  }
  // if nothing was found and it's required, throw
  if (options.required && !_.isFunction(this[attributeName])) {
    throw new Error('View ' + (this.name || this.cid) + ' requires: ' + attributeName);
  }
}

function assignTemplate(attributeName, options) {
  var template;
  // if attribute is the name of template to fetch
  if (_.isString(this[attributeName])) {
    template = Thorax.Util.getTemplate(this[attributeName], true);
  // else try and fetch the template based on the name
  } else if (this.name && !_.isFunction(this[attributeName])) {
    template = Thorax.Util.getTemplate(this.name + (options.extension || ''), true);
  }
  // CollectionView and LayoutView have a defaultTemplate that may be used if none
  // was found, regular views must have a template if render() is called
  if (!template && attributeName === 'template' && this._defaultTemplate) {
    template = this._defaultTemplate;
  }
  // if we found something, assign it
  if (template && !_.isFunction(this[attributeName])) {
    this[attributeName] = template;
  }
  // if nothing was found and it's required, throw
  if (options.required && !_.isFunction(this[attributeName])) {
    throw new Error('View ' + (this.name || this.cid) + ' requires: ' + attributeName);
  }
}

// getValue is used instead of _.result because we
// need an extra scope parameter, and will minify
// better than _.result
function getValue(object, prop, scope) {
  if (!(object && object[prop])) {
    return null;
  }
  return _.isFunction(object[prop])
    ? object[prop].call(scope || object)
    : object[prop];
}

var inheritVars = {};
function createInheritVars(self) {
  // Ensure that we have our static event objects
  _.each(inheritVars, function(obj) {
    if (!self[obj.name]) {
      self[obj.name] = [];
    }
  });
}
function resetInheritVars(self) {
  // Ensure that we have our static event objects
  _.each(inheritVars, function(obj) {
    self[obj.name] = [];
  });
}
function walkInheritTree(source, fieldName, isStatic, callback) {
  var tree = [];
  if (_.has(source, fieldName)) {
    tree.push(source);
  }
  var iterate = source;
  if (isStatic) {
    while (iterate = iterate.__parent__) {
      if (_.has(iterate, fieldName)) {
        tree.push(iterate);
      }
    }
  } else {
    iterate = iterate.constructor;
    while (iterate) {
      if (iterate.prototype && _.has(iterate.prototype, fieldName)) {
        tree.push(iterate.prototype);
      }
      iterate = iterate.__super__ && iterate.__super__.constructor;
    }
  }

  var i = tree.length;
  while (i--) {
    _.each(getValue(tree[i], fieldName, source), callback);
  }
}

function objectEvents(target, eventName, callback, context) {
  if (_.isObject(callback)) {
    var spec = inheritVars[eventName];
    if (spec && spec.event) {
      if (target && target.listenTo && target[eventName] && target[eventName].cid) {
        addEvents(target, callback, context, eventName);
      } else {
        addEvents(target['_' + eventName + 'Events'], callback, context);
      }
      return true;
    }
  }
}
// internal listenTo function will error on destroyed
// race condition
function listenTo(object, target, eventName, callback, context) {
  // getEventCallback will resolve if it is a string or a method
  // and return a method
  var callbackMethod = getEventCallback(callback, object),
      destroyedCount = 0;

  function eventHandler() {
    if (object.el) {
      callbackMethod.apply(context, arguments);
    } else {
      // If our event handler is removed by destroy while another event is processing then we
      // we might see one latent event percolate through due to caching in the event loop. If we
      // see multiple events this is a concern and a sign that something was not cleaned properly.
      if (destroyedCount) {
        throw new Error('destroyed-event:' + object.name + ':' + eventName);
      }
      destroyedCount++;
    }
  }
  eventHandler._callback = callbackMethod._callback || callbackMethod;
  eventHandler._thoraxBind = true;
  object.listenTo(target, eventName, eventHandler);
}

function addEvents(target, source, context, listenToObject) {
  function addEvent(callback, eventName) {
    if (listenToObject) {
      listenTo(target, target[listenToObject], eventName, callback, context || target);
    } else {
      target.push([eventName, callback, context]);
    }
  }

  _.each(source, function(callback, eventName) {
    if (_.isArray(callback)) {
      _.each(callback, function(cb) {
        addEvent(cb, eventName);
      });
    } else {
      addEvent(callback, eventName);
    }
  });
}

function getOptionsData(options) {
  if (!options || !options.data) {
    throw new Error(createErrorMessage('handlebars-no-data'));
  }
  return options.data;
}

// In helpers "tagName" or "tag" may be specified, as well
// as "class" or "className". Normalize to "tagName" and
// "className" to match the property names used by Backbone
// jQuery, etc. Special case for "className" in
// Thorax.Util.tag: will be rewritten as "class" in
// generated HTML.
function normalizeHTMLAttributeOptions(options) {
  if (options.tag) {
    options.tagName = options.tag;
    delete options.tag;
  }
  if (options['class']) {
    options.className = options['class'];
    delete options['class'];
  }
}

Thorax.Util = {
  getViewInstance: function(name, attributes) {
    var ViewClass = Thorax.Util.getViewClass(name, true);
    return ViewClass ? new ViewClass(attributes || {}) : name;
  },

  getViewClass: function(name, ignoreErrors) {
    if (_.isString(name)) {
      return registryGet(Thorax, 'Views', name, ignoreErrors);
    } else if (_.isFunction(name)) {
      return name;
    } else {
      return false;
    }
  },

  getTemplate: function(file, ignoreErrors) {
    //append the template path prefix if it is missing
    var pathPrefix = Thorax.templatePathPrefix,
        template;
    if (pathPrefix && file.substr(0, pathPrefix.length) !== pathPrefix) {
      file = pathPrefix + file;
    }

    // Without extension
    file = file.replace(/\.handlebars$/, '');
    template = Handlebars.templates[file];
    if (!template) {
      // With extension
      file = file + '.handlebars';
      template = Handlebars.templates[file];
    }

    if (!template && !ignoreErrors) {
      throw new Error('templates: ' + file + ' does not exist.');
    }
    return template;
  },

  //'selector' is not present in $('<p></p>')
  //TODO: investigage a better detection method
  is$: function(obj) {
    return _.isObject(obj) && ('length' in obj);
  },
  expandToken: function(input, scope) {
    if (input && input.indexOf && input.indexOf('{{') >= 0) {
      var re = /(?:\{?[^{]+)|(?:\{\{([^}]+)\}\})/g,
          match,
          ret = [];
      function deref(token, scope) {
        if (token.match(/^("|')/) && token.match(/("|')$/)) {
          return token.replace(/(^("|')|('|")$)/g, '');
        }
        var segments = token.split('.'),
            len = segments.length;
        for (var i = 0; scope && i < len; i++) {
          if (segments[i] !== 'this') {
            scope = scope[segments[i]];
          }
        }
        return scope;
      }
      while (match = re.exec(input)) {
        if (match[1]) {
          var params = match[1].split(/\s+/);
          if (params.length > 1) {
            var helper = params.shift();
            params = _.map(params, function(param) { return deref(param, scope); });
            if (Handlebars.helpers[helper]) {
              ret.push(Handlebars.helpers[helper].apply(scope, params));
            } else {
              // If the helper is not defined do nothing
              ret.push(match[0]);
            }
          } else {
            ret.push(deref(params[0], scope));
          }
        } else {
          ret.push(match[0]);
        }
      }
      input = ret.join('');
    }
    return input;
  },
  tag: function(attributes, content, scope) {
    var htmlAttributes = _.omit(attributes, 'tagName'),
        tag = attributes.tagName || 'div';
    return '<' + tag + ' ' + _.map(htmlAttributes, function(value, key) {
      if (_.isUndefined(value) || key === 'expand-tokens') {
        return '';
      }
      var formattedValue = value;
      if (scope) {
        formattedValue = Thorax.Util.expandToken(value, scope);
      }
      return (key === 'className' ? 'class' : key) + '="' + Handlebars.Utils.escapeExpression(formattedValue) + '"';
    }).join(' ') + '>' + (_.isUndefined(content) ? '' : content) + '</' + tag + '>';
  }
};

;;
Thorax.Mixins = {};

_.extend(Thorax.View, {
  mixin: function(name) {
    Thorax.Mixins[name](this);
  },
  registerMixin: function(name, callback, methods) {
    Thorax.Mixins[name] = function(obj) {
      var isInstance = !!obj.cid;
      if (methods) {
        _.extend(isInstance ? obj : obj.prototype, methods);
      }
      if (isInstance) {
        callback.call(obj);
      } else {
        obj.on('configure', callback);
      }
    };
  }
});

Thorax.View.prototype.mixin = function(name) {
  Thorax.Mixins[name](this);
};

;;
/*global createInheritVars, inheritVars, listenTo, objectEvents, walkInheritTree */
// Save a copy of the _on method to call as a $super method
var _on = Thorax.View.prototype.on;

inheritVars.event = {
  name: '_events',

  configure: function() {
    var self = this;
    walkInheritTree(this.constructor, '_events', true, function(event) {
      self.on.apply(self, event);
    });
    walkInheritTree(this, 'events', false, function(handler, eventName) {
      self.on(eventName, handler, self);
    });
  }
};

_.extend(Thorax.View, {
  on: function(eventName, callback) {
    createInheritVars(this);

    if (objectEvents(this, eventName, callback)) {
      return this;
    }

    //accept on({"rendered": handler})
    if (_.isObject(eventName)) {
      _.each(eventName, function(value, key) {
        this.on(key, value);
      }, this);
    } else {
      //accept on({"rendered": [handler, handler]})
      if (_.isArray(callback)) {
        _.each(callback, function(cb) {
          this._events.push([eventName, cb]);
        }, this);
      //accept on("rendered", handler)
      } else {
        this._events.push([eventName, callback]);
      }
    }
    return this;
  }
});

_.extend(Thorax.View.prototype, {
  on: function(eventName, callback, context) {
    if (objectEvents(this, eventName, callback, context)) {
      return this;
    }

    if (_.isObject(eventName) && arguments.length < 3) {
      //accept on({"rendered": callback})
      _.each(eventName, function(value, key) {
        this.on(key, value, callback || this);    // callback is context in this form of the call
      }, this);
    } else {
      //accept on("rendered", callback, context)
      //accept on("click a", callback, context)
      _.each((_.isArray(callback) ? callback : [callback]), function(callback) {
        var params = eventParamsFromEventItem.call(this, eventName, callback, context || this);
        if (params.type === 'DOM' && !this._eventsDelegated) {
          //will call _addEvent during delegateEvents()
          if (!this._eventsToDelegate) {
            this._eventsToDelegate = [];
          }
          this._eventsToDelegate.push(params);
        } else {
          this._addEvent(params);
        }
      }, this);
    }
    return this;
  },
  delegateEvents: function(events) {
    this.undelegateEvents();
    if (events) {
      if (_.isFunction(events)) {
        events = events.call(this);
      }
      this._eventsToDelegate = [];
      this.on(events);
    }
    this._eventsToDelegate && _.each(this._eventsToDelegate, this._addEvent, this);
    this._eventsDelegated = true;
  },
  //params may contain:
  //- name
  //- originalName
  //- selector
  //- type "view" || "DOM"
  //- handler
  _addEvent: function(params) {
    // If this is recursvie due to listenTo delegate below then pass through to super class
    if (params.handler._thoraxBind) {
      return _on.call(this, params.name, params.handler, params.context || this);
    }

    var boundHandler = bindEventHandler.call(this, params.type + '-event:', params);

    if (params.type === 'view') {
      // If we have our context set to an outside view then listen rather than directly bind so
      // we can cleanup properly.
      if (params.context && params.context !== this && params.context instanceof Thorax.View) {
        listenTo(params.context, this, params.name, boundHandler, params.context);
      } else {
        _on.call(this, params.name, boundHandler, params.context || this);
      }
    } else {
      if (!params.nested) {
        boundHandler = containHandlerToCurentView(boundHandler, this.cid);
      }

      var name = params.name + '.delegateEvents' + this.cid;
      if (params.selector) {
        this.$el.on(name, params.selector, boundHandler);
      } else {
        this.$el.on(name, boundHandler);
      }
    }
  }
});

Thorax.View.prototype.bind = Thorax.View.prototype.on;

// When view is ready trigger ready event on all
// children that are present, then register an
// event that will trigger ready on new children
// when they are added
Thorax.View.on('ready', function(options) {
  if (!this._isReady) {
    this._isReady = true;
    function triggerReadyOnChild(child) {
      child._isReady || child.trigger('ready', options);
    }
    _.each(this.children, triggerReadyOnChild);
    this.on('child', triggerReadyOnChild);
  }
});

var eventSplitter = /^(nested\s+)?(\S+)(?:\s+(.+))?/;

var domEvents = [],
    domEventRegexp;
function pushDomEvents(events) {
  domEvents.push.apply(domEvents, events);
  domEventRegexp = new RegExp('^(nested\\s+)?(' + domEvents.join('|') + ')(?:\\s|$)');
}
pushDomEvents([
  'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout',
  'touchstart', 'touchend', 'touchmove',
  'click', 'dblclick',
  'keyup', 'keydown', 'keypress',
  'submit', 'change',
  'focus', 'blur'
]);

function containHandlerToCurentView(handler, cid) {
  return function(event) {
    var view = $(event.target).view({helper: false});
    if (view && view.cid === cid) {
      event.originalContext = this;
      handler(event);
    }
  };
}

function bindEventHandler(eventName, params) {
  eventName += params.originalName;

  var callback = params.handler,
      method = _.isFunction(callback) ? callback : this[callback];
  if (!method) {
    throw new Error('Event "' + callback + '" does not exist ' + (this.name || this.cid) + ':' + eventName);
  }

  var context = params.context || this;
  function ret() {
    try {
      method.apply(context, arguments);
    } catch (e) {
      Thorax.onException('thorax-exception: ' + (context.name || context.cid) + ':' + eventName, e);
    }
  }
  // Backbone will delegate to _callback in off calls so we should still be able to support
  // calling off on specific handlers.
  ret._callback = method;
  ret._thoraxBind = true;
  return ret;
}

function eventParamsFromEventItem(name, handler, context) {
  var params = {
    originalName: name,
    handler: _.isString(handler) ? this[handler] : handler
  };
  if (name.match(domEventRegexp)) {
    var match = eventSplitter.exec(name);
    params.nested = !!match[1];
    params.name = match[2];
    params.type = 'DOM';
    params.selector = match[3];
  } else {
    params.name = name;
    params.type = 'view';
  }
  params.context = context;
  return params;
}

;;
/*global getOptionsData, normalizeHTMLAttributeOptions, viewHelperAttributeName */
var viewPlaceholderAttributeName = 'data-view-tmp',
    viewTemplateOverrides = {};

// Will be shared by HelperView and CollectionHelperView
var helperViewPrototype = {
  _ensureElement: function() {
    Thorax.View.prototype._ensureElement.apply(this, arguments);
    this.$el.attr(viewHelperAttributeName, this._helperName);
  },
  _getContext: function() {
    return this.parent._getContext.apply(this.parent, arguments);
  }
};

Thorax.HelperView = Thorax.View.extend(helperViewPrototype);

// Ensure nested inline helpers will always have this.parent
// set to the view containing the template
function getParent(parent) {
  // The `view` helper is a special case as it embeds
  // a view instead of creating a new one
  while (parent._helperName && parent._helperName !== 'view') {
    parent = parent.parent;
  }
  return parent;
}

Handlebars.registerViewHelper = function(name, ViewClass, callback) {
  if (arguments.length === 2) {
    if (ViewClass.factory) {
      callback = ViewClass.callback;
    } else {
      callback = ViewClass;
      ViewClass = Thorax.HelperView;
    }
  }

  var viewOptionWhiteList = ViewClass.attributeWhiteList;

  Handlebars.registerHelper(name, function() {
    var args = _.toArray(arguments),
        options = args.pop(),
        declaringView = getOptionsData(options).view,
        expandTokens = options.hash['expand-tokens'];

    if (expandTokens) {
      delete options.hash['expand-tokens'];
      _.each(options.hash, function(value, key) {
        options.hash[key] = Thorax.Util.expandToken(value, this);
      }, this);
    }

    var viewOptions = {
      inverse: options.inverse,
      options: options.hash,
      declaringView: declaringView,
      parent: getParent(declaringView),
      _helperName: name,
      _helperOptions: {
        options: cloneHelperOptions(options),
        args: _.clone(args)
      }
    };


    normalizeHTMLAttributeOptions(options.hash);
    var htmlAttributes = _.clone(options.hash);
    if (viewOptionWhiteList) {
      _.each(viewOptionWhiteList, function(dest, source) {
        delete htmlAttributes[source];
        if (!_.isUndefined(options.hash[source])) {
          viewOptions[dest] = options.hash[source];
        }
      });
    }
    if(htmlAttributes.tagName) {
      viewOptions.tagName = htmlAttributes.tagName;
    }
    viewOptions.attributes = function() {
      var attrs = (ViewClass.prototype && ViewClass.prototype.attributes) || {};
      if (_.isFunction(attrs)) {
        attrs = attrs.apply(this, arguments);
      }
      _.extend(attrs, _.omit(htmlAttributes, ['tagName']));
      // backbone wants "class"
      if (attrs.className) {
        attrs['class'] = attrs.className;
        delete attrs.className;
      }
      return attrs;
    };

    if (options.fn) {
      // Only assign if present, allow helper view class to
      // declare template
      viewOptions.template = options.fn;
    } else if (ViewClass && ViewClass.prototype && !ViewClass.prototype.template) {
      // ViewClass may also be an instance or object with factory method
      // so need to do this check
      viewOptions.template = Handlebars.VM.noop;
    }

    // Check to see if we have an existing instance that we can reuse
    var instance = _.find(declaringView._previousHelpers, function(child) {
      return compareHelperOptions(viewOptions, child);
    });

    // Create the instance if we don't already have one
    if (!instance) {
      if (ViewClass.factory) {
        instance = ViewClass.factory(args, viewOptions);
        if (!instance) {
          return '';
        }

        instance._helperName = viewOptions._helperName;
        instance._helperOptions = viewOptions._helperOptions;
      } else {
        instance = new ViewClass(viewOptions);
      }
      if (!instance.el) {
        // ViewClass.factory may return existing objects which may have been destroyed
        throw new Error('insert-destroyed-factory');
      }

      // Remove any possible entry in previous helpers in case this is a cached value returned from
      // slightly different data that does not qualify for the previous helpers direct reuse.
      // (i.e. when using an array that is modified between renders)
      declaringView._previousHelpers = _.without(declaringView._previousHelpers, instance);

      args.push(instance);
      declaringView._addChild(instance);
      declaringView.trigger.apply(declaringView, ['helper', name].concat(args));
      declaringView.trigger.apply(declaringView, ['helper:' + name].concat(args));

      callback && callback.apply(this, args);
    } else {
      if (!instance.el) {
        throw new Error('insert-destroyed');
      }

      declaringView._previousHelpers = _.without(declaringView._previousHelpers, instance);
      declaringView.children[instance.cid] = instance;
    }

    htmlAttributes[viewPlaceholderAttributeName] = instance.cid;
    if (ViewClass.modifyHTMLAttributes) {
      ViewClass.modifyHTMLAttributes(htmlAttributes, instance);
    }
    return new Handlebars.SafeString(Thorax.Util.tag(htmlAttributes, '', expandTokens ? this : null));
  });
  var helper = Handlebars.helpers[name];
  return helper;
};

Thorax.View.on('append', function(scope, callback) {
  (scope || this.$el).find('[' + viewPlaceholderAttributeName + ']').forEach(function(el) {
    var placeholderId = el.getAttribute(viewPlaceholderAttributeName),
        view = this.children[placeholderId];
    if (view) {
      //see if the view helper declared an override for the view
      //if not, ensure the view has been rendered at least once
      if (viewTemplateOverrides[placeholderId]) {
        view.render(viewTemplateOverrides[placeholderId]);
        delete viewTemplateOverrides[placeholderId];
      } else {
        view.ensureRendered();
      }
      $(el).replaceWith(view.el);
      callback && callback(view.el);
    }
  }, this);
});


/**
 * Clones the helper options, dropping items that are known to change
 * between rendering cycles as appropriate.
 */
function cloneHelperOptions(options) {
  var ret = _.pick(options, 'fn', 'inverse', 'hash', 'data');
  ret.data = _.omit(options.data, 'cid', 'view', 'yield');
  return ret;
}

/**
 * Checks for basic equality between two sets of parameters for a helper view.
 *
 * Checked fields include:
 *  - _helperName
 *  - All args
 *  - Hash
 *  - Data
 *  - Function and Invert (id based if possible)
 *
 * This method allows us to determine if the inputs to a given view are the same. If they
 * are then we make the assumption that the rendering will be the same (or the child view will
 * otherwise rerendering it by monitoring it's parameters as necessary) and reuse the view on
 * rerender of the parent view.
 */
function compareHelperOptions(a, b) {
  function compareValues(a, b) {
    return _.every(a, function(value, key) {
      return b[key] === value;
    });
  }

  if (a._helperName !== b._helperName) {
    return false;
  }

  a = a._helperOptions;
  b = b._helperOptions;

  // Implements a first level depth comparison
  return a.args.length === b.args.length
      && compareValues(a.args, b.args)
      && _.isEqual(_.keys(a.options), _.keys(b.options))
      && _.every(a.options, function(value, key) {
          if (key === 'data' || key === 'hash') {
            return compareValues(a.options[key], b.options[key]);
          } else if (key === 'fn' || key === 'inverse') {
            if (b.options[key] === value) {
              return true;
            }

            var other = b.options[key] || {};
            return value && _.has(value, 'program') && !value.depth && other.program === value.program;
          }
          return b.options[key] === value;
        });
}

;;
/*global getValue, inheritVars, walkInheritTree */

function dataObject(type, spec) {
  spec = inheritVars[type] = _.defaults({
    name: '_' + type + 'Events',
    event: true
  }, spec);

  // Add a callback in the view constructor
  spec.ctor = function() {
    if (this[type]) {
      // Need to null this.model/collection so setModel/Collection will
      // not treat it as the old model/collection and immediately return
      var object = this[type];
      this[type] = null;
      this[spec.set](object);
    }
  };

  function setObject(dataObject, options) {
    var old = this[type],
        $el = getValue(this, spec.$el);

    if (dataObject === old) {
      return this;
    }
    if (old) {
      this.unbindDataObject(old);
    }

    if (dataObject) {
      this[type] = dataObject;

      if (spec.loading) {
        spec.loading.call(this);
      }

      this.bindDataObject(type, dataObject, _.extend({}, this.options, options));
      $el && $el.attr(spec.cidAttrName, dataObject.cid);
      dataObject.trigger('set', dataObject, old);
    } else {
      this[type] = false;
      if (spec.change) {
        spec.change.call(this, false);
      }
      $el && $el.removeAttr(spec.cidAttrName);
    }
    this.trigger('change:data-object', type, dataObject, old);
    return this;
  }

  Thorax.View.prototype[spec.set] = setObject;
}

_.extend(Thorax.View.prototype, {
  getObjectOptions: function(dataObject) {
    return dataObject && this._objectOptionsByCid[dataObject.cid];
  },

  bindDataObject: function(type, dataObject, options) {
    if (this._boundDataObjectsByCid[dataObject.cid]) {
      return false;
    }
    this._boundDataObjectsByCid[dataObject.cid] = dataObject;

    var options = this._modifyDataObjectOptions(dataObject, _.extend({}, inheritVars[type].defaultOptions, options));
    this._objectOptionsByCid[dataObject.cid] = options;

    bindEvents.call(this, type, dataObject, this.constructor);
    bindEvents.call(this, type, dataObject, this);

    var spec = inheritVars[type];
    spec.bindCallback && spec.bindCallback.call(this, dataObject, options);

    if (dataObject.shouldFetch && dataObject.shouldFetch(options)) {
      loadObject(dataObject, options);
    } else if (inheritVars[type].change) {
      // want to trigger built in rendering without triggering event on model
      inheritVars[type].change.call(this, dataObject, options);
    }

    return true;
  },

  unbindDataObject: function (dataObject) {
    if (!this._boundDataObjectsByCid[dataObject.cid]) {
      return false;
    }
    delete this._boundDataObjectsByCid[dataObject.cid];
    this.stopListening(dataObject);
    delete this._objectOptionsByCid[dataObject.cid];
    return true;
  },

  _modifyDataObjectOptions: function(dataObject, options) {
    return options;
  }
});

function bindEvents(type, target, source) {
  var context = this;
  walkInheritTree(source, '_' + type + 'Events', true, function(event) {
    listenTo(context, target, event[0], event[1], event[2] || context);
  });
}

function loadObject(dataObject, options) {
  if (dataObject.load) {
    dataObject.load(function() {
      options && options.success && options.success(dataObject);
    }, options);
  } else {
    dataObject.fetch(options);
  }
}

function getEventCallback(callback, context) {
  if (_.isFunction(callback)) {
    return callback;
  } else {
    return context[callback];
  }
}

;;
/*global createRegistryWrapper, dataObject, getValue, inheritVars */
var modelCidAttributeName = 'data-model-cid';

Thorax.Model = Backbone.Model.extend({
  isEmpty: function() {
    return !this.isPopulated();
  },
  isPopulated: function() {
    // We are populated if we have attributes set
    var attributes = _.clone(this.attributes),
        defaults = getValue(this, 'defaults') || {};
    for (var default_key in defaults) {
      if (attributes[default_key] != defaults[default_key]) {
        return true;
      }
      delete attributes[default_key];
    }
    var keys = _.keys(attributes);
    return keys.length > 1 || (keys.length === 1 && keys[0] !== this.idAttribute);
  },
  shouldFetch: function(options) {
    // url() will throw if model has no `urlRoot` and no `collection`
    // or has `collection` and `collection` has no `url`
    var url;
    try {
      url = getValue(this, 'url');
    } catch(e) {
      url = false;
    }
    return options.fetch && !!url && !this.isPopulated();
  }
});

Thorax.Models = {};
createRegistryWrapper(Thorax.Model, Thorax.Models);

dataObject('model', {
  set: 'setModel',
  defaultOptions: {
    render: undefined,    // Default to deferred rendering
    fetch: true,
    success: false,
    invalid: true
  },
  change: onModelChange,
  $el: '$el',
  cidAttrName: modelCidAttributeName
});

function onModelChange(model, options) {
  if (options && options.serializing) {
    return;
  }

  var modelOptions = this.getObjectOptions(model) || {};
  // !modelOptions will be true when setModel(false) is called
  this.conditionalRender(modelOptions.render);
}

Thorax.View.on({
  model: {
    invalid: function(model, errors) {
      if (this.getObjectOptions(model).invalid) {
        this.trigger('invalid', errors, model);
      }
    },
    error: function(model, resp, options) {
      this.trigger('error', resp, model);
    },
    change: function(model, options) {
      // Indirect refernece to allow for overrides
      inheritVars.model.change.call(this, model, options);
    }
  }
});

$.fn.model = function(view) {
  var $this = $(this),
      modelElement = $this.closest('[' + modelCidAttributeName + ']'),
      modelCid = modelElement && modelElement.attr(modelCidAttributeName);
  if (modelCid) {
    var view = view || $this.view();
    if (view && view.model && view.model.cid === modelCid) {
      return view.model || false;
    }
    var collection = $this.collection(view);
    if (collection) {
      return collection.get(modelCid);
    }
  }
  return false;
};

;;
/*global assignView, assignTemplate, createRegistryWrapper, dataObject, getEventCallback, getValue, modelCidAttributeName, viewCidAttributeName */
var _fetch = Backbone.Collection.prototype.fetch,
    _set = Backbone.Collection.prototype.set,
    _replaceHTML = Thorax.View.prototype._replaceHTML,
    collectionCidAttributeName = 'data-collection-cid',
    collectionEmptyAttributeName = 'data-collection-empty',
    collectionElementAttributeName = 'data-collection-element',
    ELEMENT_NODE_TYPE = 1;

Thorax.Collection = Backbone.Collection.extend({
  model: Thorax.Model || Backbone.Model,
  initialize: function() {
    this.cid = _.uniqueId('collection');
    return Backbone.Collection.prototype.initialize.apply(this, arguments);
  },
  isEmpty: function() {
    if (this.length > 0) {
      return false;
    } else {
      return this.length === 0 && this.isPopulated();
    }
  },
  isPopulated: function() {
    return this._fetched || this.length > 0 || (!this.length && !getValue(this, 'url'));
  },
  shouldFetch: function(options) {
    return options.fetch && !!getValue(this, 'url') && !this.isPopulated();
  },
  fetch: function(options) {
    options = options || {};
    var success = options.success;
    options.success = function(collection, response) {
      collection._fetched = true;
      success && success(collection, response);
    };
    return _fetch.apply(this, arguments);
  },
  set: function(models, options) {
    this._fetched = !!models;
    return _set.call(this, models, options);
  }
});

_.extend(Thorax.View.prototype, {
  getCollectionViews: function(collection) {
    return _.filter(this.children, function(child) {
      if (!(child instanceof Thorax.CollectionView)) {
        return false;
      }

      return !collection || (child.collection === collection);
    });
  },
  updateFilter: function(collection) {
    _.invoke(this.getCollectionViews(collection), 'updateFilter');
  }
});

Thorax.Collections = {};
createRegistryWrapper(Thorax.Collection, Thorax.Collections);

dataObject('collection', {
  set: 'setCollection',
  bindCallback: onSetCollection,
  defaultOptions: {
    render: undefined,    // Default to deferred rendering
    fetch: true,
    success: false,
    invalid: true,
    change: true          // Wether or not to re-render on model:change
  },
  change: onCollectionReset,
  $el: 'getCollectionElement',
  cidAttrName: collectionCidAttributeName
});

Thorax.CollectionView = Thorax.View.extend({
  _defaultTemplate: Handlebars.VM.noop,
  _collectionSelector: '[' + collectionElementAttributeName + ']',

  // preserve collection element if it was not created with {{collection}} helper
  _replaceHTML: function(html) {
    if (this.collection && this.getObjectOptions(this.collection) && this._renderCount) {
      var element;
      var oldCollectionElement = this.getCollectionElement();
      element = _replaceHTML.call(this, html);
      if (!oldCollectionElement.attr('data-view-cid')) {
        this.getCollectionElement().replaceWith(oldCollectionElement);
      }
    } else {
      return _replaceHTML.call(this, html);
    }
  },

  render: function() {
    var shouldRender = this.shouldRender();

    Thorax.View.prototype.render.apply(this, arguments);
    if (!shouldRender) {
      this.renderCollection();
    }
  },

  //appendItem(model [,index])
  //appendItem(html_string, index)
  //appendItem(view, index)
  appendItem: function(model, index, options) {
    //empty item
    if (!model) {
      return;
    }
    var itemView,
        $el = this.getCollectionElement();
    options = _.defaults(options || {}, {
      filter: true
    });
    //if index argument is a view
    index && index.el && (index = $el.children().indexOf(index.el) + 1);
    //if argument is a view, or html string
    if (model.el || _.isString(model)) {
      itemView = model;
      model = false;
    } else {
      index = index || this.collection.indexOf(model) || 0;
      itemView = this.renderItem(model, index);
    }

    if (itemView) {
      if (itemView.cid) {
        itemView.ensureRendered();
        this._addChild(itemView);
      }

      //if the renderer's output wasn't contained in a tag, wrap it in a div
      //plain text, or a mixture of top level text nodes and element nodes
      //will get wrapped
      if (_.isString(itemView) && !itemView.match(/^\s*</m)) {
        itemView = '<div>' + itemView + '</div>';
      }
      var itemElement = itemView.$el || $($.trim(itemView)).filter(function() {
        //filter out top level whitespace nodes
        return this.nodeType === ELEMENT_NODE_TYPE;
      });

      if (model) {
        itemElement.attr(modelCidAttributeName, model.cid);
      }
      var previousModel = index > 0 ? this.collection.at(index - 1) : false;
      if (!previousModel) {
        $el.prepend(itemElement);
      } else {
        //use last() as appendItem can accept multiple nodes from a template
        var last = $el.children('[' + modelCidAttributeName + '="' + previousModel.cid + '"]').last();
        last.after(itemElement);
      }

      this.trigger('append', null, function(el) {
        el.setAttribute(modelCidAttributeName, model.cid);
      });

      if (!options.silent) {
        this.trigger('rendered:item', this, this.collection, model, itemElement, index);
      }
      if (options.filter) {
        applyItemVisiblityFilter.call(this, model);
      }
    }
    return itemView;
  },

  // updateItem only useful if there is no item view, otherwise
  // itemView.render() provides the same functionality
  updateItem: function(model) {
    var $el = this.getCollectionElement(),
        viewEl = $el.find('[' + modelCidAttributeName + '="' + model.cid + '"]');

    // NOP For views
    if (viewEl.attr(viewCidAttributeName)) {
      return;
    }

    this.removeItem(viewEl);
    this.appendItem(model);
  },

  removeItem: function(model) {
    var viewEl = model;
    if (model.cid) {
      var $el = this.getCollectionElement();
      viewEl = $el.find('[' + modelCidAttributeName + '="' + model.cid + '"]');
    }
    if (!viewEl.length) {
      return false;
    }
    viewEl.remove();
    var viewCid = viewEl.attr(viewCidAttributeName),
        child = this.children[viewCid];
    if (child) {
      this._removeChild(child);
    }
    return true;
  },

  renderCollection: function() {
    if (this.collection) {
      if (this.collection.isEmpty()) {
        handleChangeFromNotEmptyToEmpty.call(this);
      } else {
        handleChangeFromEmptyToNotEmpty.call(this);
        this.collection.forEach(function(item, i) {
          this.appendItem(item, i);
        }, this);
      }
      this.trigger('rendered:collection', this, this.collection);
    } else {
      handleChangeFromNotEmptyToEmpty.call(this);
    }
  },
  emptyClass: 'empty',
  renderEmpty: function() {
    if (!this.emptyView) {
      assignView.call(this, 'emptyView', {
        extension: '-empty'
      });
    }
    if (!this.emptyTemplate && !this.emptyView) {
      assignTemplate.call(this, 'emptyTemplate', {
        extension: '-empty',
        required: false
      });
    }
    if (this.emptyView) {
      var viewOptions = {};
      if (this.emptyTemplate) {
        viewOptions.template = this.emptyTemplate;
      }
      var view = Thorax.Util.getViewInstance(this.emptyView, viewOptions);
      view.ensureRendered();
      return view;
    } else {
      return this.emptyTemplate && this.renderTemplate(this.emptyTemplate);
    }
  },
  renderItem: function(model, i) {
    if (!this.itemView) {
      assignView.call(this, 'itemView', {
        extension: '-item',
        required: false
      });
    }
    if (!this.itemTemplate && !this.itemView) {
      assignTemplate.call(this, 'itemTemplate', {
        extension: '-item',
        // only require an itemTemplate if an itemView
        // is not present
        required: !this.itemView
      });
    }
    if (this.itemView) {
      var viewOptions = {
        model: model
      };
      if (this.itemTemplate) {
        viewOptions.template = this.itemTemplate;
      }
      return Thorax.Util.getViewInstance(this.itemView, viewOptions);
    } else {
      return this.renderTemplate(this.itemTemplate, this.itemContext(model, i));
    }
  },
  itemContext: function(model /*, i */) {
    return model.attributes;
  },
  appendEmpty: function() {
    var $el = this.getCollectionElement();
    $el.empty();
    var emptyContent = this.renderEmpty();
    emptyContent && this.appendItem(emptyContent, 0, {
      silent: true,
      filter: false
    });
    this.trigger('rendered:empty', this, this.collection);
  },
  getCollectionElement: function() {
    var element = this.$(this._collectionSelector);
    return element.length === 0 ? this.$el : element;
  },

  updateFilter: function() {
    applyVisibilityFilter.call(this);
  }
});

Thorax.CollectionView.on({
  collection: {
    reset: onCollectionReset,
    sort: onCollectionReset,
    change: function(model) {
      var options = this.getObjectOptions(this.collection);
      if (options && options.change) {
        this.updateItem(model);
      }
      applyItemVisiblityFilter.call(this, model);
    },
    add: function(model) {
      var $el = this.getCollectionElement();
      this.collection.length === 1 && $el.length && handleChangeFromEmptyToNotEmpty.call(this);
      if ($el.length) {
        var index = this.collection.indexOf(model);
        this.appendItem(model, index);
      }
    },
    remove: function(model) {
      var $el = this.getCollectionElement();
      this.removeItem(model);
      this.collection.length === 0 && $el.length && handleChangeFromNotEmptyToEmpty.call(this);
    }
  }
});

Thorax.View.on({
  collection: {
    invalid: function(collection, message) {
      if (this.getObjectOptions(collection).invalid) {
        this.trigger('invalid', message, collection);
      }
    },
    error: function(collection, resp, options) {
      this.trigger('error', resp, collection);
    }
  }
});

function onCollectionReset(collection) {
  // Undefined to force conditional render
  var options = this.getObjectOptions(collection) || undefined;
  if (this.shouldRender(options && options.render)) {
    this.renderCollection && this.renderCollection();
  }
}

// Even if the view is not a CollectionView
// ensureRendered() to provide similar behavior
// to a model
function onSetCollection(collection) {
  // Undefined to force conditional render
  var options = this.getObjectOptions(collection) || undefined;
  if (this.shouldRender(options && options.render)) {
    // Ensure that something is there if we are going to render the collection.
    this.ensureRendered();
  }
}

function applyVisibilityFilter() {
  if (this.itemFilter) {
    this.collection.forEach(applyItemVisiblityFilter, this);
  }
}

function applyItemVisiblityFilter(model) {
  var $el = this.getCollectionElement();
  this.itemFilter && $el.find('[' + modelCidAttributeName + '="' + model.cid + '"]')[itemShouldBeVisible.call(this, model) ? 'show' : 'hide']();
}

function itemShouldBeVisible(model) {
  return this.itemFilter(model, this.collection.indexOf(model));
}

function handleChangeFromEmptyToNotEmpty() {
  var $el = this.getCollectionElement();
  this.emptyClass && $el.removeClass(this.emptyClass);
  $el.removeAttr(collectionEmptyAttributeName);
  $el.empty();
}

function handleChangeFromNotEmptyToEmpty() {
  var $el = this.getCollectionElement();
  this.emptyClass && $el.addClass(this.emptyClass);
  $el.attr(collectionEmptyAttributeName, true);
  this.appendEmpty();
}

//$(selector).collection() helper
$.fn.collection = function(view) {
  if (view && view.collection) {
    return view.collection;
  }
  var $this = $(this),
      collectionElement = $this.closest('[' + collectionCidAttributeName + ']'),
      collectionCid = collectionElement && collectionElement.attr(collectionCidAttributeName);
  if (collectionCid) {
    view = $this.view();
    if (view) {
      return view.collection;
    }
  }
  return false;
};

;;
/*global inheritVars */

inheritVars.model.defaultOptions.populate = true;

var oldModelChange = inheritVars.model.change;
inheritVars.model.change = function(model, options) {
  this._isChanging = true;
  oldModelChange.apply(this, arguments);
  this._isChanging = false;

  if (options && options.serializing) {
    return;
  }

  var populate = populateOptions(this);
  if (this._renderCount && populate) {
    this.populate(!populate.context && this.model.attributes, populate);
  }
};

_.extend(Thorax.View.prototype, {
  //serializes a form present in the view, returning the serialized data
  //as an object
  //pass {set:false} to not update this.model if present
  //can pass options, callback or event in any order
  serialize: function() {
    var callback, options, event;
    //ignore undefined arguments in case event was null
    for (var i = 0; i < arguments.length; ++i) {
      if (_.isFunction(arguments[i])) {
        callback = arguments[i];
      } else if (_.isObject(arguments[i])) {
        if ('stopPropagation' in arguments[i] && 'preventDefault' in arguments[i]) {
          event = arguments[i];
        } else {
          options = arguments[i];
        }
      }
    }

    if (event && !this._preventDuplicateSubmission(event)) {
      return;
    }

    options = _.extend({
      set: true,
      validate: true,
      children: true
    }, options || {});

    var attributes = options.attributes || {};

    //callback has context of element
    var view = this;
    var errors = [];
    eachNamedInput(this, options, function(element) {
      var value = view._getInputValue(element, options, errors);
      if (!_.isUndefined(value)) {
        objectAndKeyFromAttributesAndName(attributes, element.name, {mode: 'serialize'}, function(object, key) {
          if (!object[key]) {
            object[key] = value;
          } else if (_.isArray(object[key])) {
            object[key].push(value);
          } else {
            object[key] = [object[key], value];
          }
        });
      }
    });

    if (!options._silent) {
      this.trigger('serialize', attributes, options);
    }

    if (options.validate) {
      var validateInputErrors = this.validateInput(attributes);
      if (validateInputErrors && validateInputErrors.length) {
        errors = errors.concat(validateInputErrors);
      }
      this.trigger('validate', attributes, errors, options);
      if (errors.length) {
        this.trigger('invalid', errors);
        return;
      }
    }

    if (options.set && this.model) {
      if (!this.model.set(attributes, {silent: options.silent, serializing: true})) {
        return false;
      }
    }

    callback && callback.call(this, attributes, _.bind(resetSubmitState, this));
    return attributes;
  },

  _preventDuplicateSubmission: function(event, callback) {
    event.preventDefault();

    var form = $(event.target);
    if ((event.target.tagName || '').toLowerCase() !== 'form') {
      // Handle non-submit events by gating on the form
      form = $(event.target).closest('form');
    }

    if (!form.attr('data-submit-wait')) {
      form.attr('data-submit-wait', 'true');
      if (callback) {
        callback.call(this, event);
      }
      return true;
    } else {
      return false;
    }
  },

  //populate a form from the passed attributes or this.model if present
  populate: function(attributes, options) {
    options = _.extend({
      children: true
    }, options || {});

    var value,
        attributes = attributes || this._getContext();

    //callback has context of element
    eachNamedInput(this, options, function(element) {
      objectAndKeyFromAttributesAndName(attributes, element.name, {mode: 'populate'}, function(object, key) {
        value = object && object[key];

        if (!_.isUndefined(value)) {
          //will only execute if we have a name that matches the structure in attributes
          var isBinary = element.type === 'checkbox' || element.type === 'radio';
          if (isBinary && _.isBoolean(value)) {
            element.checked = value;
          } else if (isBinary) {
            element.checked = value == element.value;
          } else {
            element.value = value;
          }
        }
      });
    });

    ++this._populateCount;
    if (!options._silent) {
      this.trigger('populate', attributes);
    }
  },

  //perform form validation, implemented by child class
  validateInput: function(/* attributes, options, errors */) {},

  _getInputValue: function(input /* , options, errors */) {
    if (input.type === 'checkbox' || input.type === 'radio') {
      if (input.checked) {
        return input.getAttribute('value') || true;
      }
    } else if (input.multiple === true) {
      var values = [];
      $('option', input).each(function() {
        if (this.selected) {
          values.push(this.value);
        }
      });
      return values;
    } else {
      return input.value;
    }
  },

  _populateCount: 0
});

// Keeping state in the views
Thorax.View.on({
  'before:rendered': function() {
    // Do not store previous options if we have not rendered or if we have changed the associated
    // model since the last render
    if (!this._renderCount || (this.model && this.model.cid) !== this._formModelCid) {
      return;
    }

    var modelOptions = this.getObjectOptions(this.model);
    // When we have previously populated and rendered the view, reuse the user data
    this.previousFormData = filterObject(
      this.serialize(_.extend({ set: false, validate: false, _silent: true }, modelOptions)),
      function(value) { return value !== '' && value != null; }
    );
  },
  rendered: function() {
    var populate = populateOptions(this);

    if (populate && !this._isChanging && !this._populateCount) {
      this.populate(!populate.context && this.model.attributes, populate);
    }
    if (this.previousFormData) {
      this.populate(this.previousFormData, _.extend({_silent: true}, populate));
    }

    this._formModelCid = this.model && this.model.cid;
    this.previousFormData = null;
  }
});

function filterObject(object, callback) {
  _.each(object, function (value, key) {
    if (_.isObject(value)) {
      return filterObject(value, callback);
    }
    if (callback(value, key, object) === false) {
      delete object[key];
    }
  });
  return object;
}

Thorax.View.on({
  invalid: onErrorOrInvalidData,
  error: onErrorOrInvalidData,
  deactivated: function() {
    if (this.$el) {
      resetSubmitState.call(this);
    }
  }
});

function onErrorOrInvalidData () {
  resetSubmitState.call(this);

  // If we errored with a model we want to reset the content but leave the UI
  // intact. If the user updates the data and serializes any overwritten data
  // will be restored.
  if (this.model && this.model.previousAttributes) {
    this.model.set(this.model.previousAttributes(), {
      silent: true
    });
  }
}

function eachNamedInput(view, options, iterator) {
  var i = 0;

  $('select,input,textarea', options.root || view.el).each(function() {
    if (!options.children) {
      if (view !== $(this).view({helper: false})) {
        return;
      }
    }
    if (this.type !== 'button' && this.type !== 'cancel' && this.type !== 'submit' && this.name) {
      iterator(this, i);
      ++i;
    }
  });
}

//calls a callback with the correct object fragment and key from a compound name
function objectAndKeyFromAttributesAndName(attributes, name, options, callback) {
  var key,
      object = attributes,
      keys = name.split('['),
      mode = options.mode;

  for (var i = 0; i < keys.length - 1; ++i) {
    key = keys[i].replace(']', '');
    if (!object[key]) {
      if (mode === 'serialize') {
        object[key] = {};
      } else {
        return callback(undefined, key);
      }
    }
    object = object[key];
  }
  key = keys[keys.length - 1].replace(']', '');
  callback(object, key);
}

function resetSubmitState() {
  this.$('form').removeAttr('data-submit-wait');
}

function populateOptions(view) {
  var modelOptions = view.getObjectOptions(view.model) || {};
  return modelOptions.populate === true ? {} : modelOptions.populate;
}

;;
/*global getOptionsData, normalizeHTMLAttributeOptions, createErrorMessage */
var layoutCidAttributeName = 'data-layout-cid';

Thorax.LayoutView = Thorax.View.extend({
  _defaultTemplate: Handlebars.VM.noop,
  render: function() {
    var response = Thorax.View.prototype.render.apply(this, arguments);
    if (this.template === Handlebars.VM.noop) {
      // if there is no template setView will append to this.$el
      ensureLayoutCid.call(this);
    } else {
      // if a template was specified is must declare a layout-element
      ensureLayoutViewsTargetElement.call(this);
    }
    return response;
  },
  setView: function(view, options) {
    options = _.extend({
      scroll: true
    }, options || {});
    if (_.isString(view)) {
      view = new (Thorax.Util.registryGet(Thorax, 'Views', view, false))();
    }
    this.ensureRendered();
    var oldView = this._view, append, remove, complete;
    if (view === oldView) {
      return false;
    }
    this.trigger('change:view:start', view, oldView, options);

    remove = _.bind(function() {
      if (oldView) {
        oldView.$el && oldView.$el.remove();
        triggerLifecycleEvent.call(oldView, 'deactivated', options);
        this._removeChild(oldView);
      }
    }, this);

    append = _.bind(function() {
      if (view) {
        view.ensureRendered();
        triggerLifecycleEvent.call(this, 'activated', options);
        view.trigger('activated', options);
        this._view = view;
        var targetElement = getLayoutViewsTargetElement.call(this);
        this._view.appendTo(targetElement);
        this._addChild(view);
      } else {
        this._view = undefined;
      }
    }, this);

    complete = _.bind(function() {
      this.trigger('change:view:end', view, oldView, options);
    }, this);

    if (!options.transition) {
      remove();
      append();
      complete();
    } else {
      options.transition(view, oldView, append, remove, complete);
    }

    return view;
  },

  getView: function() {
    return this._view;
  }
});

Handlebars.registerHelper('layout-element', function(options) {
  var view = getOptionsData(options).view;
  // duck type check for LayoutView
  if (!view.getView) {
    throw new Error(createErrorMessage('layout-element-helper'));
  }
  options.hash[layoutCidAttributeName] = view.cid;
  normalizeHTMLAttributeOptions(options.hash);
  return new Handlebars.SafeString(Thorax.Util.tag.call(this, options.hash, '', this));
});

function triggerLifecycleEvent(eventName, options) {
  options = options || {};
  options.target = this;
  this.trigger(eventName, options);
  _.each(this.children, function(child) {
    child.trigger(eventName, options);
  });
}

function ensureLayoutCid() {
  ++this._renderCount;
  //set the layoutCidAttributeName on this.$el if there was no template
  this.$el.attr(layoutCidAttributeName, this.cid);
}

function ensureLayoutViewsTargetElement() {
  if (!this.$('[' + layoutCidAttributeName + '="' + this.cid + '"]')[0]) {
    throw new Error('No layout element found in ' + (this.name || this.cid));
  }
}

function getLayoutViewsTargetElement() {
  return this.$('[' + layoutCidAttributeName + '="' + this.cid + '"]')[0] || this.el[0] || this.el;
}

;;
/* global createErrorMessage */

Thorax.CollectionHelperView = Thorax.CollectionView.extend({
  // Forward render events to the parent
  events: {
    'rendered:item': forwardRenderEvent('rendered:item'),
    'rendered:collection': forwardRenderEvent('rendered:collection'),
    'rendered:empty': forwardRenderEvent('rendered:empty')
  },

  // Thorax.CollectionView allows a collectionSelector
  // to be specified, disallow in a collection helper
  // as it will cause problems when neseted
  getCollectionElement: function() {
    return this.$el;
  },

  constructor: function(options) {
    // need to fetch templates if template name was passed
    if (options.options['item-template']) {
      options.itemTemplate = Thorax.Util.getTemplate(options.options['item-template']);
    }
    if (options.options['empty-template']) {
      options.emptyTemplate = Thorax.Util.getTemplate(options.options['empty-template']);
    }

    // Handlebars.VM.noop is passed in the handlebars options object as
    // a default for fn and inverse, if a block was present. Need to
    // check to ensure we don't pick the empty / null block up.
    if (!options.itemTemplate && options.template && options.template !== Handlebars.VM.noop) {
      options.itemTemplate = options.template;
      options.template = Handlebars.VM.noop;
    }
    if (!options.emptyTemplate && options.inverse && options.inverse !== Handlebars.VM.noop) {
      options.emptyTemplate = options.inverse;
      options.inverse = Handlebars.VM.noop;
    }

    var shouldBindItemContext = _.isFunction(options.itemContext),
        shouldBindItemFilter = _.isFunction(options.itemFilter);

    var response = Thorax.HelperView.call(this, options);
    
    if (shouldBindItemContext) {
      this.itemContext = _.bind(this.itemContext, this.parent);
    } else if (_.isString(this.itemContext)) {
      this.itemContext = _.bind(this.parent[this.itemContext], this.parent);
    }

    if (shouldBindItemFilter) {
      this.itemFilter = _.bind(this.itemFilter, this.parent);
    } else if (_.isString(this.itemFilter)) {
      this.itemFilter = _.bind(this.parent[this.itemFilter], this.parent);
    }

    if (this.parent.name) {
      if (!this.emptyView && !this.parent.renderEmpty) {
        this.emptyView = Thorax.Util.getViewClass(this.parent.name + '-empty', true);
      }
      if (!this.emptyTemplate && !this.parent.renderEmpty) {
        this.emptyTemplate = Thorax.Util.getTemplate(this.parent.name + '-empty', true);
      }
      if (!this.itemView && !this.parent.renderItem) {
        this.itemView = Thorax.Util.getViewClass(this.parent.name + '-item', true);
      }
      if (!this.itemTemplate && !this.parent.renderItem) {
        // item template must be present if an itemView is not
        this.itemTemplate = Thorax.Util.getTemplate(this.parent.name + '-item', !!this.itemView);
      }
    }

    return response;
  },
  setAsPrimaryCollectionHelper: function() {
    _.each(forwardableProperties, function(propertyName) {
      forwardMissingProperty.call(this, propertyName);
    }, this);

    var self = this;
    _.each(['itemFilter', 'itemContext', 'renderItem', 'renderEmpty'], function(propertyName) {
      if (self.parent[propertyName]) {
        self[propertyName] = function() {
          return self.parent[propertyName].apply(self.parent, arguments);
        };
      }
    });
  }
});

_.extend(Thorax.CollectionHelperView.prototype, helperViewPrototype);


Thorax.CollectionHelperView.attributeWhiteList = {
  'item-context': 'itemContext',
  'item-filter': 'itemFilter',
  'item-template': 'itemTemplate',
  'empty-template': 'emptyTemplate',
  'item-view': 'itemView',
  'empty-view': 'emptyView',
  'empty-class': 'emptyClass'
};

function forwardRenderEvent(eventName) {
  return function() {
    var args = _.toArray(arguments);
    args.unshift(eventName);
    this.parent.trigger.apply(this.parent, args);
  };
}

var forwardableProperties = [
  'itemTemplate',
  'itemView',
  'emptyTemplate',
  'emptyView'
];

function forwardMissingProperty(propertyName) {
  var parent = getParent(this);
  if (!this[propertyName]) {
    var prop = parent[propertyName];
    if (prop){
      this[propertyName] = prop;
    }
  }
}

Handlebars.registerViewHelper('collection', Thorax.CollectionHelperView, function(collection, view) {
  if (arguments.length === 1) {
    view = collection;
    collection = view.parent.collection;
    collection && view.setAsPrimaryCollectionHelper();
    view.$el.attr(collectionElementAttributeName, 'true');
    // propagate future changes to the parent's collection object
    // to the helper view
    view.listenTo(view.parent, 'change:data-object', function(type, dataObject) {
      if (type === 'collection') {
        view.setAsPrimaryCollectionHelper();
        view.setCollection(dataObject);
      }
    });
  }
  collection && view.setCollection(collection);
});

Handlebars.registerHelper('collection-element', function(options) {
  if (!getOptionsData(options).view.renderCollection) {
    throw new Error(createErrorMessage('collection-element-helper'));
  }
  var hash = options.hash;
  normalizeHTMLAttributeOptions(hash);
  hash.tagName = hash.tagName || 'div';
  hash[collectionElementAttributeName] = true;
  return new Handlebars.SafeString(Thorax.Util.tag.call(this, hash, '', this));
});

;;
Handlebars.registerHelper('empty', function(dataObject, options) {
  if (arguments.length === 1) {
    options = dataObject;
  }
  var view = getOptionsData(options).view;
  if (arguments.length === 1) {
    dataObject = view.model;
  }
  // listeners for the empty helper rather than listeners
  // that are themselves empty
  if (!view._emptyListeners) {
    view._emptyListeners = {};
  }
  // duck type check for collection
  if (dataObject && !view._emptyListeners[dataObject.cid] && dataObject.models && ('length' in dataObject)) {
    view._emptyListeners[dataObject.cid] = true;
    view.listenTo(dataObject, 'remove', function() {
      if (dataObject.length === 0) {
        view.render();
      }
    });
    view.listenTo(dataObject, 'add', function() {
      if (dataObject.length === 1) {
        view.render();
      }
    });
    view.listenTo(dataObject, 'reset', function() {
      view.render();
    });
  }
  return !dataObject || dataObject.isEmpty() ? options.fn(this) : options.inverse(this);
});

;;
Handlebars.registerHelper('template', function(name, options) {
  var context = _.extend({fn: options && options.fn}, this, options ? options.hash : {});
  var output = getOptionsData(options).view.renderTemplate(name, context);
  return new Handlebars.SafeString(output);
});

Handlebars.registerHelper('yield', function(options) {
  return getOptionsData(options).yield && options.data.yield();
});

;;
Handlebars.registerHelper('url', function(url) {
  var fragment;
  if (arguments.length > 2) {
    fragment = _.map(_.head(arguments, arguments.length - 1), encodeURIComponent).join('/');
  } else {
    var options = arguments[1],
        hash = (options && options.hash) || options;
    if (hash && hash['expand-tokens']) {
      fragment = Thorax.Util.expandToken(url, this);
    } else {
      fragment = url;
    }
  }
  if (Backbone.history._hasPushState) {
    var root = Backbone.history.options.root;
    if (root === '/' && fragment.substr(0, 1) === '/') {
      return fragment;
    } else {
      return root + fragment;
    }
  } else {
    return '#' + fragment;
  }
});

;;
/*global viewTemplateOverrides, createErrorMessage */
Handlebars.registerViewHelper('view', {
  factory: function(args, options) {
    var View = args.length >= 1 ? args[0] : Thorax.View;
    return Thorax.Util.getViewInstance(View, options.options);
  },
  // ensure generated placeholder tag in template
  // will match tag of view instance
  modifyHTMLAttributes: function(htmlAttributes, instance) {
    htmlAttributes.tagName = instance.el.tagName.toLowerCase();
  },
  callback: function(view) {
    var instance = arguments[arguments.length-1],
        options = instance._helperOptions.options,
        placeholderId = instance.cid;
    // view will be the argument passed to the helper, if it was
    // a string, a new instance was created on the fly, ok to pass
    // hash arguments, otherwise need to throw as templates should
    // not introduce side effects to existing view instances
    if (!_.isString(view) && options.hash && _.keys(options.hash).length > 0) {
      throw new Error(createErrorMessage('view-helper-hash-args'));
    }
    if (options.fn) {
      viewTemplateOverrides[placeholderId] = options.fn;
    }
  }
});

;;
/* global createErrorMessage */

var callMethodAttributeName = 'data-call-method',
    triggerEventAttributeName = 'data-trigger-event';

Handlebars.registerHelper('button', function(method, options) {
  if (arguments.length === 1) {
    options = method;
    method = options.hash.method;
  }
  var hash = options.hash,
      expandTokens = hash['expand-tokens'];
  delete hash['expand-tokens'];
  if (!method && !options.hash.trigger) {
    throw new Error(createErrorMessage('button-trigger'));
  }
  normalizeHTMLAttributeOptions(hash);
  hash.tagName = hash.tagName || 'button';
  hash.trigger && (hash[triggerEventAttributeName] = hash.trigger);
  delete hash.trigger;
  method && (hash[callMethodAttributeName] = method);
  return new Handlebars.SafeString(Thorax.Util.tag(hash, options.fn ? options.fn(this) : '', expandTokens ? this : null));
});

Handlebars.registerHelper('link', function() {
  var args = _.toArray(arguments),
      options = args.pop(),
      hash = options.hash,
      // url is an array that will be passed to the url helper
      url = args.length === 0 ? [hash.href] : args,
      expandTokens = hash['expand-tokens'];
  delete hash['expand-tokens'];
  if (!url[0] && url[0] !== '') {
    throw new Error(createErrorMessage('link-href'));
  }
  normalizeHTMLAttributeOptions(hash);
  url.push(options);
  hash.href = Handlebars.helpers.url.apply(this, url);
  hash.tagName = hash.tagName || 'a';
  hash.trigger && (hash[triggerEventAttributeName] = options.hash.trigger);
  delete hash.trigger;
  hash[callMethodAttributeName] = '_anchorClick';
  return new Handlebars.SafeString(Thorax.Util.tag(hash, options.fn ? options.fn(this) : '', expandTokens ? this : null));
});

var clickSelector = '[' + callMethodAttributeName + '], [' + triggerEventAttributeName + ']';

function handleClick(event) {
  var $this = $(this),
      view = $this.view({helper: false}),
      methodName = $this.attr(callMethodAttributeName),
      eventName = $this.attr(triggerEventAttributeName),
      methodResponse = false;
  methodName && (methodResponse = view[methodName].call(view, event));
  eventName && view.trigger(eventName, event);
  this.tagName === 'A' && methodResponse === false && event.preventDefault();
}

var lastClickHandlerEventName;

function registerClickHandler() {
  unregisterClickHandler();
  lastClickHandlerEventName = Thorax._fastClickEventName || 'click';
  $(document).on(lastClickHandlerEventName, clickSelector, handleClick);
}

function unregisterClickHandler() {
  lastClickHandlerEventName && $(document).off(lastClickHandlerEventName, clickSelector, handleClick);
}

$(document).ready(function() {
  if (!Thorax._fastClickEventName) {
    registerClickHandler();
  }
});

;;
var elementPlaceholderAttributeName = 'data-element-tmp';

Handlebars.registerHelper('element', function(element, options) {
  normalizeHTMLAttributeOptions(options.hash);
  var cid = _.uniqueId('element'),
      declaringView = getOptionsData(options).view;
  options.hash[elementPlaceholderAttributeName] = cid;
  declaringView._elementsByCid || (declaringView._elementsByCid = {});
  declaringView._elementsByCid[cid] = element;
  return new Handlebars.SafeString(Thorax.Util.tag(options.hash));
});

Thorax.View.on('append', function(scope, callback) {
  (scope || this.$el).find('[' + elementPlaceholderAttributeName + ']').forEach(function(el) {
    var $el = $(el),
        cid = $el.attr(elementPlaceholderAttributeName),
        element = this._elementsByCid[cid];
    // A callback function may be specified as the value
    if (_.isFunction(element)) {
      element = element.call(this);
    }
    $el.replaceWith(element);
    callback && callback(element);
  }, this);
});

;;
/* global createErrorMessage */

Handlebars.registerHelper('super', function(options) {
  var declaringView = getOptionsData(options).view,
      parent = declaringView.constructor && declaringView.constructor.__super__;
  if (parent) {
    var template = parent.template;
    if (!template) {
      if (!parent.name) {
        throw new Error(createErrorMessage('super-parent'));
      }
      template = parent.name;
    }
    if (_.isString(template)) {
      template = Thorax.Util.getTemplate(template, false);
    }
    return new Handlebars.SafeString(template(this, options));
  } else {
    return '';
  }
});

;;
/*global collectionOptionNames, inheritVars, createErrorMessage */

var loadStart = 'load:start',
    loadEnd = 'load:end',
    rootObject;

Thorax.setRootObject = function(obj) {
  rootObject = obj;
};

Thorax.loadHandler = function(start, end, context) {
  var loadCounter = _.uniqueId('load');
  return function(message, background, object) {
    var self = context || this;
    self._loadInfo = self._loadInfo || {};
    var loadInfo = self._loadInfo[loadCounter];

    function startLoadTimeout() {

      // If the timeout has been set already but has not triggered yet do nothing
      // Otherwise set a new timeout (either initial or for going from background to
      // non-background loading)
      if (loadInfo.timeout && !loadInfo.run) {
        return;
      }

      var loadingTimeout = self._loadingTimeoutDuration !== undefined ?
        self._loadingTimeoutDuration : Thorax.View.prototype._loadingTimeoutDuration;
      loadInfo.timeout = setTimeout(function() {
          try {
            // We have a slight race condtion in here where the end event may have occurred
            // but the end timeout has not executed. Rather than killing a cumulative timeout
            // immediately we'll protect from that case here
            if (loadInfo.events.length) {
              loadInfo.run = true;
              start.call(self, loadInfo.message, loadInfo.background, loadInfo);
            }
          } catch (e) {
            Thorax.onException('loadStart', e);
          }
        }, loadingTimeout * 1000);
    }

    if (!loadInfo) {
      loadInfo = self._loadInfo[loadCounter] = _.extend({
        isLoading: function() {
          return loadInfo.events.length;
        },

        cid: loadCounter,
        events: [],
        timeout: 0,
        message: message,
        background: !!background
      }, Backbone.Events);
      startLoadTimeout();
    } else {
      clearTimeout(loadInfo.endTimeout);

      loadInfo.message = message;
      if (!background && loadInfo.background) {
        loadInfo.background = false;
        startLoadTimeout();
      }
    }

    // Prevent binds to the same object multiple times as this can cause very bad things
    // to happen for the load;load;end;end execution flow.
    if (_.indexOf(loadInfo.events, object) >= 0) {
      return;
    }

    loadInfo.events.push(object);

    object.on(loadEnd, function endCallback() {
      var loadingEndTimeout = self._loadingTimeoutEndDuration;
      if (loadingEndTimeout === void 0) {
        // If we are running on a non-view object pull the default timeout
        loadingEndTimeout = Thorax.View.prototype._loadingTimeoutEndDuration;
      }

      var events = loadInfo.events,
          index = _.indexOf(events, object);
      if (index >= 0 && !object.isLoading()) {
        events.splice(index, 1);

        if (_.indexOf(events, object) < 0) {
          // Last callback for this particlar object, remove the bind
          object.off(loadEnd, endCallback);
        }
      }

      if (!events.length) {
        clearTimeout(loadInfo.endTimeout);
        loadInfo.endTimeout = setTimeout(function() {
          try {
            if (!events.length) {
              if (loadInfo.run) {
                // Emit the end behavior, but only if there is a paired start
                end && end.call(self, loadInfo.background, loadInfo);
                loadInfo.trigger(loadEnd, loadInfo);
              }

              // If stopping make sure we don't run a start
              clearTimeout(loadInfo.timeout);
              loadInfo = self._loadInfo[loadCounter] = undefined;
            }
          } catch (e) {
            Thorax.onException('loadEnd', e);
          }
        }, loadingEndTimeout * 1000);
      }
    });
  };
};

/**
 * Helper method for propagating load:start events to other objects.
 *
 * Forwards load:start events that occur on `source` to `dest`.
 */
Thorax.forwardLoadEvents = function(source, dest, once) {
  function load(message, backgound, object) {
    if (once) {
      source.off(loadStart, load);
    }
    dest.trigger(loadStart, message, backgound, object);
  }
  source.on(loadStart, load);
  return {
    off: function() {
      source.off(loadStart, load);
    }
  };
};

//
// Data load event generation
//

/**
 * Mixing for generating load:start and load:end events.
 */
Thorax.mixinLoadable = function(target, useParent) {
  _.extend(target, {
    //loading config
    _loadingClassName: 'loading',
    _loadingTimeoutDuration: 0.33,
    _loadingTimeoutEndDuration: 0.10,

    // Propagates loading view parameters to the AJAX layer
    onLoadStart: function(message, background, object) {
      var that = useParent ? this.parent : this;

      // Protect against race conditions
      if (!that || !that.el) {
        return;
      }

      if (!that.nonBlockingLoad && !background && rootObject && rootObject !== this) {
        rootObject.trigger(loadStart, message, background, object);
      }
      that._isLoading = true;
      $(that.el).addClass(that._loadingClassName);
      // used by loading helpers
      that.trigger('change:load-state', 'start', background);
    },
    onLoadEnd: function(/* background, object */) {
      var that = useParent ? this.parent : this;

      // Protect against race conditions
      if (!that || !that.el) {
        return;
      }

      that._isLoading = false;
      $(that.el).removeClass(that._loadingClassName);
      // used by loading helper
      that.trigger('change:load-state', 'end');
    }
  });
};

Thorax.mixinLoadableEvents = function(target, useParent) {
  _.extend(target, {
    _loadCount: 0,

    isLoading: function() {
      return this._loadCount > 0;
    },

    loadStart: function(message, background) {
      this._loadCount++;

      var that = useParent ? this.parent : this;
      that.trigger(loadStart, message, background, that);
    },
    loadEnd: function() {
      this._loadCount--;

      var that = useParent ? this.parent : this;
      that.trigger(loadEnd, that);
    }
  });
};

Thorax.mixinLoadable(Thorax.View.prototype);
Thorax.mixinLoadableEvents(Thorax.View.prototype);


if (Thorax.HelperView) {
  Thorax.mixinLoadable(Thorax.HelperView.prototype, true);
  Thorax.mixinLoadableEvents(Thorax.HelperView.prototype, true);
}

if (Thorax.CollectionHelperView) {
  Thorax.mixinLoadable(Thorax.CollectionHelperView.prototype, true);
  Thorax.mixinLoadableEvents(Thorax.CollectionHelperView.prototype, true);
}

Thorax.sync = function(method, dataObj, options) {
  var self = this,
      complete = options.complete;

  options.complete = function() {
    self._request = undefined;
    self._aborted = false;

    complete && complete.apply(this, arguments);
  };
  this._request = Backbone.sync.apply(this, arguments);

  return this._request;
};

function bindToRoute(callback, failback) {
  var fragment = Backbone.history.getFragment(),
      routeChanged = false;

  function routeHandler() {
    if (fragment === Backbone.history.getFragment()) {
      return;
    }
    routeChanged = true;
    res.cancel();
    failback && failback();
  }

  Backbone.history.on('route', routeHandler);

  function finalizer() {
    Backbone.history.off('route', routeHandler);
    if (!routeChanged) {
      callback.apply(this, arguments);
    }
  }

  var res = _.bind(finalizer, this);
  res.cancel = function() {
    Backbone.history.off('route', routeHandler);
  };

  return res;
}

function loadData(callback, failback, options) {
  if (this.isPopulated()) {
    // Defer here to maintain async callback behavior for all loading cases
    return _.defer(callback, this);
  }

  if (arguments.length === 2 && !_.isFunction(failback) && _.isObject(failback)) {
    options = failback;
    failback = false;
  }

  var self = this,
      routeChanged = false,
      successCallback = bindToRoute(_.bind(callback, self), function() {
        routeChanged = true;
        if (self._request) {
          self._aborted = true;
          self._request.abort();
        }
        failback && failback.call(self, false);
      });

  this.fetch(_.defaults({
    success: successCallback,
    error: function() {
      successCallback.cancel();
      if (!routeChanged && failback) {
        failback.apply(self, [true].concat(_.toArray(arguments)));
      }
    }
  }, options));
}

function fetchQueue(options, $super) {
  if (options.resetQueue) {
    // WARN: Should ensure that loaders are protected from out of band data
    //    when using this option
    this.fetchQueue = undefined;
  } else if (this.fetchQueue) {
    // concurrent set/reset fetch events are not advised
    var reset = (this.fetchQueue[0] || {}).reset;
    if (reset !== options.reset) {
      // fetch with concurrent set & reset not allowed
      throw new Error(createErrorMessage('mixed-fetch'));
    }
  }

  if (!this.fetchQueue) {
    // Kick off the request
    this.fetchQueue = [options];
    options = _.defaults({
      success: flushQueue(this, this.fetchQueue, 'success'),
      error: flushQueue(this, this.fetchQueue, 'error'),
      complete: flushQueue(this, this.fetchQueue, 'complete')
    }, options);

    // Handle callers that do not pass in a super class and wish to implement their own
    // fetch behavior
    if ($super) {
      $super.call(this, options);
    }
    return options;
  } else {
    // Currently fetching. Queue and process once complete
    this.fetchQueue.push(options);
  }
}

function flushQueue(self, fetchQueue, handler) {
  return function() {
    var args = arguments;

    // Flush the queue. Executes any callback handlers that
    // may have been passed in the fetch options.
    _.each(fetchQueue, function(options) {
      if (options[handler]) {
        options[handler].apply(this, args);
      }
    }, this);

    // Reset the queue if we are still the active request
    if (self.fetchQueue === fetchQueue) {
      self.fetchQueue = undefined;
    }
  };
}

var klasses = [];
Thorax.Model && klasses.push(Thorax.Model);
Thorax.Collection && klasses.push(Thorax.Collection);

_.each(klasses, function(DataClass) {
  var $fetch = DataClass.prototype.fetch;
  Thorax.mixinLoadableEvents(DataClass.prototype, false);
  _.extend(DataClass.prototype, {
    sync: Thorax.sync,

    fetch: function(options) {
      options = options || {};
      if (DataClass === Thorax.Collection) {
        if (!_.find(['reset', 'remove', 'add', 'update'], function(key) { return !_.isUndefined(options[key]); })) {
          // use backbone < 1.0 behavior to allow triggering of reset events
          options.reset = true;
        }
      }

      if (!options.loadTriggered) {
        var self = this;

        function endWrapper(method) {
          var $super = options[method];
          options[method] = function() {
            self.loadEnd();
            $super && $super.apply(this, arguments);
          };
        }

        endWrapper('success');
        endWrapper('error');
        self.loadStart(undefined, options.background);
      }

      return fetchQueue.call(this, options || {}, $fetch);
    },

    load: function(callback, failback, options) {
      if (arguments.length === 2 && !_.isFunction(failback)) {
        options = failback;
        failback = false;
      }

      options = options || {};
      if (!options.background && !this.isPopulated() && rootObject) {
        // Make sure that the global scope sees the proper load events here
        // if we are loading in standalone mode
        if (this.isLoading()) {
          // trigger directly because load:start has already been triggered
          rootObject.trigger(loadStart, options.message, options.background, this);
        } else {
          Thorax.forwardLoadEvents(this, rootObject, true);
        }
      }

      loadData.call(this, callback, failback, options);
    }
  });
});

Thorax.Util.bindToRoute = bindToRoute;

// Propagates loading view parameters to the AJAX layer
Thorax.View.prototype._modifyDataObjectOptions = function(dataObject, options) {
  options.ignoreErrors = this.ignoreFetchError;
  options.background = this.nonBlockingLoad;
  return options;
};

// Thorax.CollectionHelperView inherits from CollectionView
// not HelperView so need to set it manually
Thorax.HelperView.prototype._modifyDataObjectOptions = Thorax.CollectionHelperView.prototype._modifyDataObjectOptions = function(dataObject, options) {
  options.ignoreErrors = this.parent.ignoreFetchError;
  options.background = this.parent.nonBlockingLoad;
  return options;
};

inheritVars.collection.loading = function() {
  var loadingView = this.loadingView,
      loadingTemplate = this.loadingTemplate,
      loadingPlacement = this.loadingPlacement;
  //add "loading-view" and "loading-template" options to collection helper
  if (loadingView || loadingTemplate) {
    var callback = Thorax.loadHandler(_.bind(function() {
      var item;
      if (this.collection.length === 0) {
        this.$el.empty();
      }
      if (loadingView) {
        var instance = Thorax.Util.getViewInstance(loadingView);
        this._addChild(instance);
        if (loadingTemplate) {
          instance.render(loadingTemplate);
        } else {
          instance.render();
        }
        item = instance;
      } else {
        item = this.renderTemplate(loadingTemplate);
      }
      var index = loadingPlacement
        ? loadingPlacement.call(this)
        : this.collection.length
      ;
      this.appendItem(item, index);
      this.$el.children().eq(index).attr('data-loading-element', this.collection.cid);
    }, this), _.bind(function() {
      this.$el.find('[data-loading-element="' + this.collection.cid + '"]').remove();
    }, this),
    this.collection);

    this.listenTo(this.collection, 'load:start', callback);
  }
};

if (Thorax.CollectionHelperView) {
  _.extend(Thorax.CollectionHelperView.attributeWhiteList, {
    'loading-template': 'loadingTemplate',
    'loading-view': 'loadingView',
    'loading-placement': 'loadingPlacement'
  });
}

Thorax.View.on({
  'load:start': Thorax.loadHandler(
      function(message, background, object) {
        this.onLoadStart(message, background, object);
      },
      function(background, object) {
        this.onLoadEnd(object);
      }),

  collection: {
    'load:start': function(message, background, object) {
      this.trigger(loadStart, message, background, object);
    }
  },
  model: {
    'load:start': function(message, background, object) {
      this.trigger(loadStart, message, background, object);
    }
  }
});

;;
Handlebars.registerHelper('loading', function(options) {
  var view = getOptionsData(options).view;
  view.off('change:load-state', onLoadStateChange, view);
  view.on('change:load-state', onLoadStateChange, view);
  return view._isLoading ? options.fn(this) : options.inverse(this);
});

function onLoadStateChange() {
  this.render();
}
;;
/*global pushDomEvents */
var isiOS = navigator.userAgent.match(/(iPhone|iPod|iPad)/i),
    isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1 ? 1 : 0,
    minimumScrollYOffset = isAndroid ? 1 : 0;

Thorax.Util.scrollTo = function(x, y) {
  y = y || minimumScrollYOffset;
  function _scrollTo() {
    window.scrollTo(x, y);
  }
  if (isiOS) {
    // a defer is required for ios
    _.defer(_scrollTo);
  } else {
    _scrollTo();
  }
  return [x, y];
};

Thorax.LayoutView.on('change:view:end', function(newView, oldView, options) {
  options && options.scroll && Thorax.Util.scrollTo(0, 0);
});

Thorax.Util.scrollToTop = function() {
  // android will use height of 1 because of minimumScrollYOffset in scrollTo()
  return this.scrollTo(0, 0);
};

pushDomEvents([
  'singleTap', 'doubleTap', 'longTap',
  'swipe',
  'swipeUp', 'swipeDown',
  'swipeLeft', 'swipeRight'
]);

//built in dom events
Thorax.View.on({
  'submit form': function(/* event */) {
    // Hide any virtual keyboards that may be lingering around
    var focused = $(':focus')[0];
    focused && focused.blur();
  }
});

;;
/*global isAndroid */

// This doesn't work on HTC devices with Android 4.0.
// Not much can be done about it as it seems to be a browser bug
// (it doesn't update visual styling while you hold your finger on the screen)
$.fn.tapHoldAndEnd = function(selector, callbackStart, callbackEnd) {
  return this.each(function() {
    var tapHoldStart,
        timer,
        target;

    function clearTapTimer(event) {
      clearTimeout(timer);

      if (tapHoldStart && target) {
        callbackEnd(target);
      }

      target = undefined;
      tapHoldStart = false;
    }

    $(this).on('touchstart', selector, function(event) {
        clearTapTimer();

        target = event.currentTarget;
        timer = setTimeout(function() {
          tapHoldStart = true;
          callbackStart(target);
        }, 50);
      })
      .on('touchmove touchend', clearTapTimer);

    $(document).on('touchcancel', clearTapTimer);
  });
};

//only enable on android
var useNativeHighlight = !isAndroid;
Thorax.configureTapHighlight = function(useNative, highlightClass) {
  useNativeHighlight = useNative;
  highlightClass = highlightClass || 'tap-highlight';

  if (!useNative) {
    function _tapHighlightStart(target) {
      var tagName = target && target.tagName.toLowerCase();

      // User input controls may be visually part of a larger group. For these cases
      // we want to give priority to any parent that may provide a focus operation.
      if (tagName === 'input' || tagName === 'select' || tagName === 'textarea') {
        target = $(target).closest('[data-tappable=true]')[0] || target;
      }

      if (target) {
        $(target).addClass(highlightClass);
        return false;
      }
    }
    function _tapHighlightEnd() {
      $('.' + highlightClass).removeClass(highlightClass);
    }
    $(document.body).tapHoldAndEnd(
          '[data-tappable=true], a, input, button, select, textarea',
          _tapHighlightStart,
          _tapHighlightEnd);
  }
};

var NATIVE_TAPPABLE = {
  'A': true,
  'INPUT': true,
  'BUTTON': true,
  'SELECT': true,
  'TEXTAREA': true
};

// Out here so we do not retain a scope
function NOP(){}

function fixupTapHighlight() {
  _.each(this._domEvents || [], function(bind) {
    var components = bind.split(' '),
        selector = components.slice(1).join(' ') || undefined;  // Needed to make zepto happy

    if (components[0] === 'click') {
      // !selector case is for root click handlers on the view, i.e. 'click'
      $(selector || this.el, selector && this.el).forEach(function(el) {
        var $el = $(el).attr('data-tappable', true);

        if (useNativeHighlight && !NATIVE_TAPPABLE[el.tagName]) {
          // Add an explicit NOP bind to allow tap-highlight support
          $el.on('click', NOP);
        }
      });
    }
  }, this);
}

Thorax.View.on({
  'rendered': fixupTapHighlight,
  'rendered:collection': fixupTapHighlight,
  'rendered:item': fixupTapHighlight,
  'rendered:empty': fixupTapHighlight
});

var _addEvent = Thorax.View.prototype._addEvent;
Thorax.View.prototype._addEvent = function(params) {
  this._domEvents = this._domEvents || [];
  if (params.type === "DOM") {
    this._domEvents.push(params.originalName);
  }
  return _addEvent.call(this, params);
};

;;


})();

//@ sourceMappingURL=thorax-mobile.js.map

