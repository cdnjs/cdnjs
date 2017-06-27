/*!
  * =============================================================
  * Ender: open module JavaScript framework (https://ender.no.de)
  * Build: ender null
  * =============================================================
  */

/*!
  * Ender: open module JavaScript framework (client-lib)
  * copyright Dustin Diaz & Jacob Thornton 2011 (@ded @fat)
  * http://ender.no.de
  * License MIT
  */
!function (context) {

  // a global object for node.js module compatiblity
  // ============================================

  context['global'] = context

  // Implements simple module system
  // losely based on CommonJS Modules spec v1.1.1
  // ============================================

  var modules = {}
    , old = context.$

  function require (identifier) {
    // modules can be required from ender's build system, or found on the window
    var module = modules[identifier] || window[identifier]
    if (!module) throw new Error("Requested module '" + identifier + "' has not been defined.")
    return module
  }

  function provide (name, what) {
    return (modules[name] = what)
  }

  context['provide'] = provide
  context['require'] = require

  function aug(o, o2) {
    for (var k in o2) k != 'noConflict' && k != '_VERSION' && (o[k] = o2[k])
    return o
  }

  function boosh(s, r, els) {
    // string || node || nodelist || window
    if (typeof s == 'string' || s.nodeName || (s.length && 'item' in s) || s == window) {
      els = ender._select(s, r)
      els.selector = s
    } else els = isFinite(s.length) ? s : [s]
    return aug(els, boosh)
  }

  function ender(s, r) {
    return boosh(s, r)
  }

  aug(ender, {
      _VERSION: '0.3.6'
    , fn: boosh // for easy compat to jQuery plugins
    , ender: function (o, chain) {
        aug(chain ? boosh : ender, o)
      }
    , _select: function (s, r) {
        return (r || document).querySelectorAll(s)
      }
  })

  aug(boosh, {
    forEach: function (fn, scope, i) {
      // opt out of native forEach so we can intentionally call our own scope
      // defaulting to the current item and be able to return self
      for (i = 0, l = this.length; i < l; ++i) i in this && fn.call(scope || this[i], this[i], i, this)
      // return self for chaining
      return this
    },
    $: ender // handy reference to self
  })

  ender.noConflict = function () {
    context.$ = old
    return this
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = ender
  // use subscript notation as extern for Closure compilation
  context['ender'] = context['$'] = context['ender'] || ender

}(this);

!function () {

  var module = { exports: {} }, exports = module.exports;

  /*!
    * Bonzo: DOM Utility (c) Dustin Diaz 2011
    * https://github.com/ded/bonzo
    * License MIT
    */
  !function (name, definition) {
    if (typeof module != 'undefined') module.exports = definition()
    else if (typeof define == 'function' && define.amd) define(name, definition)
    else this[name] = definition()
  }('bonzo', function() {
    var context = this
      , win = window
      , doc = win.document
      , html = doc.documentElement
      , parentNode = 'parentNode'
      , query = null
      , specialAttributes = /^checked|value|selected$/
      , specialTags = /select|fieldset|table|tbody|tfoot|td|tr|colgroup/i
      , table = [ '<table>', '</table>', 1 ]
      , td = [ '<table><tbody><tr>', '</tr></tbody></table>', 3 ]
      , option = [ '<select>', '</select>', 1 ]
      , tagMap = {
          thead: table, tbody: table, tfoot: table, colgroup: table, caption: table
          , tr: [ '<table><tbody>', '</tbody></table>', 2 ]
          , th: td , td: td
          , col: [ '<table><colgroup>', '</colgroup></table>', 2 ]
          , fieldset: [ '<form>', '</form>', 1 ]
          , legend: [ '<form><fieldset>', '</fieldset></form>', 2 ]
          , option: option
          , optgroup: option }
      , stateAttributes = /^checked|selected$/
      , ie = /msie/i.test(navigator.userAgent)
      , hasClass, addClass, removeClass
      , uidMap = {}
      , uuids = 0
      , digit = /^-?[\d\.]+$/
      , dattr = /^data-(.+)$/
      , px = 'px'
      , setAttribute = 'setAttribute'
      , getAttribute = 'getAttribute'
      , byTag = 'getElementsByTagName'
      , features = function() {
          var e = doc.createElement('p')
          e.innerHTML = '<a href="#x">x</a><table style="float:left;"></table>'
          return {
            hrefExtended: e[byTag]('a')[0][getAttribute]('href') != '#x' // IE < 8
          , autoTbody: e[byTag]('tbody').length !== 0 // IE < 8
          , computedStyle: doc.defaultView && doc.defaultView.getComputedStyle
          , cssFloat: e[byTag]('table')[0].style.styleFloat ? 'styleFloat' : 'cssFloat'
          , transform: function () {
              var props = ['webkitTransform', 'MozTransform', 'OTransform', 'msTransform', 'Transform'], i
              for (i = 0; i < props.length; i++) {
                if (props[i] in e.style) return props[i]
              }
            }()
          , classList: 'classList' in e
          }
        }()
      , trimReplace = /(^\s*|\s*$)/g
      , unitless = { lineHeight: 1, zoom: 1, zIndex: 1, opacity: 1 }
      , trim = String.prototype.trim ?
          function (s) {
            return s.trim()
          } :
          function (s) {
            return s.replace(trimReplace, '')
          }
  
    function classReg(c) {
      return new RegExp("(^|\\s+)" + c + "(\\s+|$)")
    }
  
    function each(ar, fn, scope) {
      for (var i = 0, l = ar.length; i < l; i++) fn.call(scope || ar[i], ar[i], i, ar)
      return ar
    }
  
    function deepEach(ar, fn, scope) {
      for (var i = 0, l = ar.length; i < l; i++) {
        if (isNode(ar[i])) {
          deepEach(ar[i].childNodes, fn, scope)
          fn.call(scope || ar[i], ar[i], i, ar)
        }
      }
      return ar
    }
  
    function camelize(s) {
      return s.replace(/-(.)/g, function (m, m1) {
        return m1.toUpperCase()
      })
    }
  
    function decamelize(s) {
      return s ? s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() : s
    }
  
    function data(el) {
      el[getAttribute]('data-node-uid') || el[setAttribute]('data-node-uid', ++uuids)
      uid = el[getAttribute]('data-node-uid')
      return uidMap[uid] || (uidMap[uid] = {})
    }
  
    function clearData(el) {
      uid = el[getAttribute]('data-node-uid')
      uid && (delete uidMap[uid])
    }
  
    function dataValue(d) {
      try {
        return d === 'true' ? true : d === 'false' ? false : d === 'null' ? null : !isNaN(d) ? parseFloat(d) : d;
      } catch(e) {}
      return undefined
    }
  
    function isNode(node) {
      return node && node.nodeName && node.nodeType == 1
    }
  
    function some(ar, fn, scope, i) {
      for (i = 0, j = ar.length; i < j; ++i) if (fn.call(scope, ar[i], i, ar)) return true
      return false
    }
  
    function styleProperty(p) {
        (p == 'transform' && (p = features.transform)) ||
          (/^transform-?[Oo]rigin$/.test(p) && (p = features.transform + "Origin")) ||
          (p == 'float' && (p = features.cssFloat))
        return p ? camelize(p) : null
    }
  
    var getStyle = features.computedStyle ?
      function (el, property) {
        var value = null
          , computed = doc.defaultView.getComputedStyle(el, '')
        computed && (value = computed[property])
        return el.style[property] || value
      } :
  
      (ie && html.currentStyle) ?
  
      function (el, property) {
        if (property == 'opacity') {
          var val = 100
          try {
            val = el.filters['DXImageTransform.Microsoft.Alpha'].opacity
          } catch (e1) {
            try {
              val = el.filters('alpha').opacity
            } catch (e2) {}
          }
          return val / 100
        }
        var value = el.currentStyle ? el.currentStyle[property] : null
        return el.style[property] || value
      } :
  
      function (el, property) {
        return el.style[property]
      }
  
    // this insert method is intense
    function insert(target, host, fn) {
      var i = 0, self = host || this, r = []
        // target nodes could be a css selector if it's a string and a selector engine is present
        // otherwise, just use target
        , nodes = query && typeof target == 'string' && target.charAt(0) != '<' ? query(target) : target
      // normalize each node in case it's still a string and we need to create nodes on the fly
      each(normalize(nodes), function (t) {
        each(self, function (el) {
          var n = !el[parentNode] || (el[parentNode] && !el[parentNode][parentNode]) ?
            function () {
              var c = el.cloneNode(true)
              // check for existence of an event cloner
              // preferably https://github.com/fat/bean
              // otherwise Bonzo won't do this for you
              self.$ && self.cloneEvents && self.$(c).cloneEvents(el)
              return c
            }() : el
          fn(t, n)
          r[i] = n
          i++
        })
      }, this)
      each(r, function (e, i) {
        self[i] = e
      })
      self.length = i
      return self
    }
  
    function xy(el, x, y) {
      var $el = bonzo(el)
        , style = $el.css('position')
        , offset = $el.offset()
        , rel = 'relative'
        , isRel = style == rel
        , delta = [parseInt($el.css('left'), 10), parseInt($el.css('top'), 10)]
  
      if (style == 'static') {
        $el.css('position', rel)
        style = rel
      }
  
      isNaN(delta[0]) && (delta[0] = isRel ? 0 : el.offsetLeft)
      isNaN(delta[1]) && (delta[1] = isRel ? 0 : el.offsetTop)
  
      x != null && (el.style.left = x - offset.left + delta[0] + px)
      y != null && (el.style.top = y - offset.top + delta[1] + px)
  
    }
  
    // classList support for class management
    // altho to be fair, the api sucks because it won't accept multiple classes at once,
    // so we have to iterate. bullshit
    if (features.classList) {
      hasClass = function (el, c) {
        return some(c.toString().split(' '), function (c) {
          return el.classList.contains(c)
        })
      }
      addClass = function (el, c) {
        each(c.toString().split(' '), function (c) {
          el.classList.add(c)
        })
      }
      removeClass = function (el, c) { el.classList.remove(c) }
    }
    else {
      hasClass = function (el, c) { return classReg(c).test(el.className) }
      addClass = function (el, c) { el.className = trim(el.className + ' ' + c) }
      removeClass = function (el, c) { el.className = trim(el.className.replace(classReg(c), ' ')) }
    }
  
  
    // this allows method calling for setting values
    // example:
    // bonzo(elements).css('color', function (el) {
    //   return el.getAttribute('data-original-color')
    // })
    function setter(el, v) {
      return typeof v == 'function' ? v(el) : v
    }
  
    function Bonzo(elements) {
      this.length = 0
      if (elements) {
        elements = typeof elements !== 'string' &&
          !elements.nodeType &&
          typeof elements.length !== 'undefined' ?
            elements :
            [elements]
        this.length = elements.length
        for (var i = 0; i < elements.length; i++) {
          this[i] = elements[i]
        }
      }
    }
  
    Bonzo.prototype = {
  
        // indexr method, because jQueriers want this method
        get: function (index) {
          return this[index] || null
        }
  
        // itetators
      , each: function (fn, scope) {
          return each(this, fn, scope)
        }
  
      , deepEach: function (fn, scope) {
          return deepEach(this, fn, scope)
        }
  
      , map: function (fn, reject) {
          var m = [], n, i
          for (i = 0; i < this.length; i++) {
            n = fn.call(this, this[i], i)
            reject ? (reject(n) && m.push(n)) : m.push(n)
          }
          return m
        }
  
      // text and html inserters!
      , html: function (h, text) {
          var method = text ?
            html.textContent === undefined ?
              'innerText' :
              'textContent' :
            'innerHTML', m;
          function append(el) {
            each(normalize(h), function (node) {
              el.appendChild(node)
            })
          }
          return typeof h !== 'undefined' ?
              this.empty().each(function (el) {
                !text && (m = el.tagName.match(specialTags)) ?
                  append(el, m[0]) :
                  !function() {
                    try { (el[method] = h) }
                    catch(e) { append(el) }
                  }();
              }) :
            this[0] ? this[0][method] : ''
        }
  
      , text: function (text) {
          return this.html(text, 1)
        }
  
        // more related insertion methods
      , append: function (node) {
          return this.each(function (el) {
            each(normalize(node), function (i) {
              el.appendChild(i)
            })
          })
        }
  
      , prepend: function (node) {
          return this.each(function (el) {
            var first = el.firstChild
            each(normalize(node), function (i) {
              el.insertBefore(i, first)
            })
          })
        }
  
      , appendTo: function (target, host) {
          return insert.call(this, target, host, function (t, el) {
            t.appendChild(el)
          })
        }
  
      , prependTo: function (target, host) {
          return insert.call(this, target, host, function (t, el) {
            t.insertBefore(el, t.firstChild)
          })
        }
  
      , before: function (node) {
          return this.each(function (el) {
            each(bonzo.create(node), function (i) {
              el[parentNode].insertBefore(i, el)
            })
          })
        }
  
      , after: function (node) {
          return this.each(function (el) {
            each(bonzo.create(node), function (i) {
              el[parentNode].insertBefore(i, el.nextSibling)
            })
          })
        }
  
      , insertBefore: function (target, host) {
          return insert.call(this, target, host, function (t, el) {
            t[parentNode].insertBefore(el, t)
          })
        }
  
      , insertAfter: function (target, host) {
          return insert.call(this, target, host, function (t, el) {
            var sibling = t.nextSibling
            if (sibling) {
              t[parentNode].insertBefore(el, sibling);
            }
            else {
              t[parentNode].appendChild(el)
            }
          })
        }
  
      , replaceWith: function(html) {
          this.deepEach(clearData)
  
          return this.each(function (el) {
            el.parentNode.replaceChild(bonzo.create(html)[0], el)
          })
        }
  
        // class management
      , addClass: function (c) {
          return this.each(function (el) {
            hasClass(el, setter(el, c)) || addClass(el, setter(el, c))
          })
        }
  
      , removeClass: function (c) {
          return this.each(function (el) {
            hasClass(el, setter(el, c)) && removeClass(el, setter(el, c))
          })
        }
  
      , hasClass: function (c) {
          return some(this, function (el) {
            return hasClass(el, c)
          })
        }
  
      , toggleClass: function (c, condition) {
          return this.each(function (el) {
            typeof condition !== 'undefined' ?
              condition ? addClass(el, c) : removeClass(el, c) :
              hasClass(el, c) ? removeClass(el, c) : addClass(el, c)
          })
        }
  
        // display togglers
      , show: function (type) {
          return this.each(function (el) {
            el.style.display = type || ''
          })
        }
  
      , hide: function () {
          return this.each(function (el) {
            el.style.display = 'none'
          })
        }
  
      , toggle: function (callback, type) {
          this.each(function (el) {
            el.style.display = (el.offsetWidth || el.offsetHeight) ? 'none' : type || ''
          })
          callback && callback()
          return this
        }
  
        // DOM Walkers & getters
      , first: function () {
          return bonzo(this.length ? this[0] : [])
        }
  
      , last: function () {
          return bonzo(this.length ? this[this.length - 1] : [])
        }
  
      , next: function () {
          return this.related('nextSibling')
        }
  
      , previous: function () {
          return this.related('previousSibling')
        }
  
      , parent: function() {
        return this.related('parentNode')
      }
  
      , related: function (method) {
          return this.map(
            function (el) {
              el = el[method]
              while (el && el.nodeType !== 1) {
                el = el[method]
              }
              return el || 0
            },
            function (el) {
              return el
            }
          )
        }
  
        // meh. use with care. the ones in Bean are better
      , focus: function () {
          return this.length > 0 ? this[0].focus() : null
        }
  
      , blur: function () {
          return this.each(function (el) {
            el.blur()
          })
        }
  
        // style getter setter & related methods
      , css: function (o, v, p) {
          // is this a request for just getting a style?
          if (v === undefined && typeof o == 'string') {
            // repurpose 'v'
            v = this[0]
            if (!v) {
              return null
            }
            if (v === doc || v === win) {
              p = (v === doc) ? bonzo.doc() : bonzo.viewport()
              return o == 'width' ? p.width : o == 'height' ? p.height : ''
            }
            return (o = styleProperty(o)) ? getStyle(v, o) : null
          }
          var iter = o
          if (typeof o == 'string') {
            iter = {}
            iter[o] = v
          }
  
          if (ie && iter.opacity) {
            // oh this 'ol gamut
            iter.filter = 'alpha(opacity=' + (iter.opacity * 100) + ')'
            // give it layout
            iter.zoom = o.zoom || 1;
            delete iter.opacity;
          }
  
          function fn(el, p, v) {
            for (var k in iter) {
              if (iter.hasOwnProperty(k)) {
                v = iter[k];
                // change "5" to "5px" - unless you're line-height, which is allowed
                (p = styleProperty(k)) && digit.test(v) && !(p in unitless) && (v += px)
                el.style[p] = setter(el, v)
              }
            }
          }
          return this.each(fn)
        }
  
      , offset: function (x, y) {
          if (typeof x == 'number' || typeof y == 'number') {
            return this.each(function (el) {
              xy(el, x, y)
            })
          }
          if (!this[0]) return {
              top: 0
            , left: 0
            , height: 0
            , width: 0
          }
          var el = this[0]
            , width = el.offsetWidth
            , height = el.offsetHeight
            , top = el.offsetTop
            , left = el.offsetLeft
          while (el = el.offsetParent) {
            top = top + el.offsetTop
            left = left + el.offsetLeft
          }
  
          return {
              top: top
            , left: left
            , height: height
            , width: width
          }
        }
  
      , dim: function () {
          var el = this[0]
            , orig = !el.offsetWidth && !el.offsetHeight ?
               // el isn't visible, can't be measured properly, so fix that
               function (t, s) {
                  s = {
                      position: el.style.position || ''
                    , visibility: el.style.visibility || ''
                    , display: el.style.display || ''
                  }
                  t.first().css({
                      position: 'absolute'
                    , visibility: 'hidden'
                    , display: 'block'
                  })
                  return s
                }(this) : null
            , width = el.offsetWidth
            , height = el.offsetHeight
  
          orig && this.first().css(orig)
          return {
              height: height
            , width: width
          }
        }
  
        // attributes are hard. go shopping
      , attr: function (k, v) {
          var el = this[0]
          if (typeof k != 'string' && !(k instanceof String)) {
            for (var n in k) {
              k.hasOwnProperty(n) && this.attr(n, k[n])
            }
            return this
          }
          return typeof v == 'undefined' ?
            specialAttributes.test(k) ?
              stateAttributes.test(k) && typeof el[k] == 'string' ?
                true : el[k] : (k == 'href' || k =='src') && features.hrefExtended ?
                  el[getAttribute](k, 2) : el[getAttribute](k) :
            this.each(function (el) {
              specialAttributes.test(k) ? (el[k] = setter(el, v)) : el[setAttribute](k, setter(el, v))
            })
        }
  
      , removeAttr: function (k) {
          return this.each(function (el) {
            stateAttributes.test(k) ? (el[k] = false) : el.removeAttribute(k)
          })
        }
  
      , val: function (s) {
          return (typeof s == 'string') ? this.attr('value', s) : this[0].value
        }
  
        // use with care and knowledge. this data() method uses data attributes on the DOM nodes
        // to do this differently costs a lot more code. c'est la vie
      , data: function (k, v) {
          var el = this[0], uid, o, m
          if (typeof v === 'undefined') {
            o = data(el)
            if (typeof k === 'undefined') {
              each(el.attributes, function(a) {
                (m = (''+a.name).match(dattr)) && (o[camelize(m[1])] = dataValue(a.value))
              })
              return o
            } else {
              return typeof o[k] === 'undefined' ?
                (o[k] = dataValue(this.attr('data-' + decamelize(k)))) : o[k]
            }
          } else {
            return this.each(function (el) { data(el)[k] = v })
          }
        }
  
        // DOM detachment & related
      , remove: function () {
          this.deepEach(clearData)
  
          return this.each(function (el) {
            el[parentNode] && el[parentNode].removeChild(el)
          })
        }
  
      , empty: function () {
          return this.each(function (el) {
            deepEach(el.childNodes, clearData)
  
            while (el.firstChild) {
              el.removeChild(el.firstChild)
            }
          })
        }
  
      , detach: function () {
          return this.map(function (el) {
            return el[parentNode].removeChild(el)
          })
        }
  
        // who uses a mouse anyway? oh right.
      , scrollTop: function (y) {
          return scroll.call(this, null, y, 'y')
        }
  
      , scrollLeft: function (x) {
          return scroll.call(this, x, null, 'x')
        }
  
    }
  
    function normalize(node) {
      return typeof node == 'string' ? bonzo.create(node) : isNode(node) ? [node] : node // assume [nodes]
    }
  
    function scroll(x, y, type) {
      var el = this[0]
      if (x == null && y == null) {
        return (isBody(el) ? getWindowScroll() : { x: el.scrollLeft, y: el.scrollTop })[type]
      }
      if (isBody(el)) {
        win.scrollTo(x, y)
      } else {
        x != null && (el.scrollLeft = x)
        y != null && (el.scrollTop = y)
      }
      return this
    }
  
    function isBody(element) {
      return element === win || (/^(?:body|html)$/i).test(element.tagName)
    }
  
    function getWindowScroll() {
      return { x: win.pageXOffset || html.scrollLeft, y: win.pageYOffset || html.scrollTop }
    }
  
    function bonzo(els, host) {
      return new Bonzo(els, host)
    }
  
    bonzo.setQueryEngine = function (q) {
      query = q;
      delete bonzo.setQueryEngine
    }
  
    bonzo.aug = function (o, target) {
      // for those standalone bonzo users. this love is for you.
      for (var k in o) {
        o.hasOwnProperty(k) && ((target || Bonzo.prototype)[k] = o[k])
      }
    }
  
    bonzo.create = function (node) {
      // hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
      return typeof node == 'string' && node !== '' ?
        function () {
          var tag = /^\s*<([^\s>]+)/.exec(node)
            , el = doc.createElement('div')
            , els = []
            , p = tag ? tagMap[tag[1].toLowerCase()] : null
            , dep = p ? p[2] + 1 : 1
            , pn = parentNode
            , tb = features.autoTbody && p && p[0] == '<table>' && !(/<tbody/i).test(node)
  
          el.innerHTML = p ? (p[0] + node + p[1]) : node
          while (dep--) el = el.firstChild
          do {
            // tbody special case for IE<8, creates tbody on any empty table
            // we don't want it if we're just after a <thead>, <caption>, etc.
            if ((!tag || el.nodeType == 1) && (!tb || el.tagName.toLowerCase() != 'tbody')) {
              els.push(el)
            }
          } while (el = el.nextSibling)
          // IE < 9 gives us a parentNode which messes up insert() check for cloning
          // `dep` > 1 can also cause problems with the insert() check (must do this last)
          each(els, function(el) { el[pn] && el[pn].removeChild(el) })
          return els
  
        }() : isNode(node) ? [node.cloneNode(true)] : []
    }
  
    bonzo.doc = function () {
      var vp = bonzo.viewport()
      return {
          width: Math.max(doc.body.scrollWidth, html.scrollWidth, vp.width)
        , height: Math.max(doc.body.scrollHeight, html.scrollHeight, vp.height)
      }
    }
  
    bonzo.firstChild = function (el) {
      for (var c = el.childNodes, i = 0, j = (c && c.length) || 0, e; i < j; i++) {
        if (c[i].nodeType === 1) e = c[j = i]
      }
      return e
    }
  
    bonzo.viewport = function () {
      return {
          width: ie ? html.clientWidth : self.innerWidth
        , height: ie ? html.clientHeight : self.innerHeight
      }
    }
  
    bonzo.isAncestor = 'compareDocumentPosition' in html ?
      function (container, element) {
        return (container.compareDocumentPosition(element) & 16) == 16
      } : 'contains' in html ?
      function (container, element) {
        return container !== element && container.contains(element);
      } :
      function (container, element) {
        while (element = element[parentNode]) {
          if (element === container) {
            return true
          }
        }
        return false
      }
  
    return bonzo
  })
  

  provide("bonzo", module.exports);

  !function ($) {
  
    var b = require('bonzo')
    b.setQueryEngine($)
    $.ender(b)
    $.ender(b(), true)
    $.ender({
      create: function (node) {
        return $(b.create(node))
      }
    })
  
    $.id = function (id) {
      return $([document.getElementById(id)])
    }
  
    function indexOf(ar, val) {
      for (var i = 0; i < ar.length; i++) if (ar[i] === val) return i
      return -1
    }
  
    function uniq(ar) {
      var r = [], i = 0, j = 0, k, item, inIt
      for (; item = ar[i]; ++i) {
        inIt = false
        for (k = 0; k < r.length; ++k) {
          if (r[k] === item) {
            inIt = true; break
          }
        }
        if (!inIt) r[j++] = item
      }
      return r
    }
  
    $.ender({
      parents: function (selector, closest) {
        var collection = $(selector), j, k, p, r = []
        for (j = 0, k = this.length; j < k; j++) {
          p = this[j]
          while (p = p.parentNode) {
            if (~indexOf(collection, p)) {
              r.push(p)
              if (closest) break;
            }
          }
        }
        return $(uniq(r))
      }
  
    , parent: function() {
        return $(uniq(b(this).parent()))
      }
  
    , closest: function (selector) {
        return this.parents(selector, true)
      }
  
    , first: function () {
        return $(this.length ? this[0] : this)
      }
  
    , last: function () {
        return $(this.length ? this[this.length - 1] : [])
      }
  
    , next: function () {
        return $(b(this).next())
      }
  
    , previous: function () {
        return $(b(this).previous())
      }
  
    , appendTo: function (t) {
        return b(this.selector).appendTo(t, this)
      }
  
    , prependTo: function (t) {
        return b(this.selector).prependTo(t, this)
      }
  
    , insertAfter: function (t) {
        return b(this.selector).insertAfter(t, this)
      }
  
    , insertBefore: function (t) {
        return b(this.selector).insertBefore(t, this)
      }
  
    , siblings: function () {
        var i, l, p, r = []
        for (i = 0, l = this.length; i < l; i++) {
          p = this[i]
          while (p = p.previousSibling) p.nodeType == 1 && r.push(p)
          p = this[i]
          while (p = p.nextSibling) p.nodeType == 1 && r.push(p)
        }
        return $(r)
      }
  
    , children: function () {
        var i, el, r = []
        for (i = 0, l = this.length; i < l; i++) {
          if (!(el = b.firstChild(this[i]))) continue;
          r.push(el)
          while (el = el.nextSibling) el.nodeType == 1 && r.push(el)
        }
        return $(uniq(r))
      }
  
    , height: function (v) {
        return dimension(v, this, 'height')
      }
  
    , width: function (v) {
        return dimension(v, this, 'width')
      }
    }, true)
  
    function dimension(v, self, which) {
      return v ?
        self.css(which, v) :
        function (r) {
          if (!self[0]) return 0
          r = parseInt(self.css(which), 10);
          return isNaN(r) ? self[0]['offset' + which.replace(/^\w/, function (m) {return m.toUpperCase()})] : r
        }()
    }
  
  }(ender);
  

}();

!function () {

  var module = { exports: {} }, exports = module.exports;

  !function (name, definition) {
    if (typeof define == 'function') define(definition)
    else if (typeof module != 'undefined') module.exports = definition()
    else this[name] = this['domReady'] = definition()
  }('domready', function (ready) {
  
    var fns = [], fn, f = false
      , doc = document
      , testEl = doc.documentElement
      , hack = testEl.doScroll
      , domContentLoaded = 'DOMContentLoaded'
      , addEventListener = 'addEventListener'
      , onreadystatechange = 'onreadystatechange'
      , loaded = /^loade|c/.test(doc.readyState)
  
    function flush(f) {
      loaded = 1
      while (f = fns.shift()) f()
    }
  
    doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
      doc.removeEventListener(domContentLoaded, fn, f)
      flush()
    }, f)
  
  
    hack && doc.attachEvent(onreadystatechange, (fn = function () {
      if (/^c/.test(doc.readyState)) {
        doc.detachEvent(onreadystatechange, fn)
        flush()
      }
    }))
  
    return (ready = hack ?
      function (fn) {
        self != top ?
          loaded ? fn() : fns.push(fn) :
          function () {
            try {
              testEl.doScroll('left')
            } catch (e) {
              return setTimeout(function() { ready(fn) }, 50)
            }
            fn()
          }()
      } :
      function (fn) {
        loaded ? fn() : fns.push(fn)
      })
  })

  provide("domready", module.exports);

  !function ($) {
    var ready = require('domready')
    $.ender({domReady: ready})
    $.ender({
      ready: function (f) {
        ready(f)
        return this
      }
    }, true)
  }(ender);

}();

!function () {

  var module = { exports: {} }, exports = module.exports;

  /*!
    * Qwery - A Blazing Fast query selector engine
    * https://github.com/ded/qwery
    * copyright Dustin Diaz & Jacob Thornton 2011
    * MIT License
    */
  
  !function (name, definition) {
    if (typeof module != 'undefined') module.exports = definition()
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
    else this[name] = definition()
  }('qwery', function () {
    var doc = document
      , html = doc.documentElement
      , byClass = 'getElementsByClassName'
      , byTag = 'getElementsByTagName'
      , qSA = 'querySelectorAll'
  
      // OOOOOOOOOOOOH HERE COME THE ESSSXXSSPRESSSIONSSSSSSSS!!!!!
      , id = /#([\w\-]+)/
      , clas = /\.[\w\-]+/g
      , idOnly = /^#([\w\-]+)$/
      , classOnly = /^\.([\w\-]+)$/
      , tagOnly = /^([\w\-]+)$/
      , tagAndOrClass = /^([\w]+)?\.([\w\-]+)$/
      , splittable = /(^|,)\s*[>~+]/
      , normalizr = /^\s+|\s*([,\s\+\~>]|$)\s*/g
      , splitters = /[\s\>\+\~]/
      , splittersMore = /(?![\s\w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^'"]*\]|[\s\w\+\-]*\))/
      , specialChars = /([.*+?\^=!:${}()|\[\]\/\\])/g
      , simple = /^(\*|[a-z0-9]+)?(?:([\.\#]+[\w\-\.#]+)?)/
      , attr = /\[([\w\-]+)(?:([\|\^\$\*\~]?\=)['"]?([ \w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^]+)["']?)?\]/
      , pseudo = /:([\w\-]+)(\(['"]?([\s\w\+\-]+)['"]?\))?/
        // check if we can pass a selector to a non-CSS3 compatible qSA.
        // *not* suitable for validating a selector, it's too lose; it's the users' responsibility to pass valid selectors
        // this regex must be kept in sync with the one in tests.js
      , css2 = /^(([\w\-]*[#\.]?[\w\-]+|\*)?(\[[\w\-]+([\~\|]?=['"][ \w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^]+["'])?\])?(\:(link|visited|active|hover))?([\s>+~\.,]|(?:$)))+$/
      , easy = new RegExp(idOnly.source + '|' + tagOnly.source + '|' + classOnly.source)
      , dividers = new RegExp('(' + splitters.source + ')' + splittersMore.source, 'g')
      , tokenizr = new RegExp(splitters.source + splittersMore.source)
      , chunker = new RegExp(simple.source + '(' + attr.source + ')?' + '(' + pseudo.source + ')?')
      , walker = {
          ' ': function (node) {
            return node && node !== html && node.parentNode
          }
        , '>': function (node, contestant) {
            return node && node.parentNode == contestant.parentNode && node.parentNode
          }
        , '~': function (node) {
            return node && node.previousSibling
          }
        , '+': function (node, contestant, p1, p2) {
            if (!node) return false
            return (p1 = previous(node)) && (p2 = previous(contestant)) && p1 == p2 && p1
          }
        }
  
    function cache() {
      this.c = {}
    }
    cache.prototype = {
      g: function (k) {
        return this.c[k] || undefined
      }
    , s: function (k, v, r) {
        v = r ? new RegExp(v) : v
        return (this.c[k] = v)
      }
    }
  
    var classCache = new cache()
      , cleanCache = new cache()
      , attrCache = new cache()
      , tokenCache = new cache()
  
    function classRegex(c) {
      return classCache.g(c) || classCache.s(c, '(^|\\s+)' + c + '(\\s+|$)', 1)
    }
  
    // not quite as fast as inline loops in older browsers so don't use liberally
    function each(a, fn) {
      var i = 0, l = a.length
      for (; i < l; i++) fn.call(null, a[i])
    }
  
    function flatten(ar) {
      for (var r = [], i = 0, l = ar.length; i < l; ++i) arrayLike(ar[i]) ? (r = r.concat(ar[i])) : (r[r.length] = ar[i])
      return r
    }
  
    function arrayify(ar) {
      var i = 0, l = ar.length, r = []
      for (; i < l; i++) r[i] = ar[i]
      return r
    }
  
    function previous(n) {
      while (n = n.previousSibling) if (n.nodeType == 1) break;
      return n
    }
  
    function q(query) {
      return query.match(chunker)
    }
  
    // called using `this` as element and arguments from regex group results.
    // given => div.hello[title="world"]:foo('bar')
    // div.hello[title="world"]:foo('bar'), div, .hello, [title="world"], title, =, world, :foo('bar'), foo, ('bar'), bar]
    function interpret(whole, tag, idsAndClasses, wholeAttribute, attribute, qualifier, value, wholePseudo, pseudo, wholePseudoVal, pseudoVal) {
      var i, m, k, o, classes
      if (this.nodeType !== 1) return false
      if (tag && tag !== '*' && this.tagName && this.tagName.toLowerCase() !== tag) return false
      if (idsAndClasses && (m = idsAndClasses.match(id)) && m[1] !== this.id) return false
      if (idsAndClasses && (classes = idsAndClasses.match(clas))) {
        for (i = classes.length; i--;) {
          if (!classRegex(classes[i].slice(1)).test(this.className)) return false
        }
      }
      if (pseudo && qwery.pseudos[pseudo] && !qwery.pseudos[pseudo](this, pseudoVal)) {
        return false
      }
      if (wholeAttribute && !value) { // select is just for existance of attrib
        o = this.attributes
        for (k in o) {
          if (Object.prototype.hasOwnProperty.call(o, k) && (o[k].name || k) == attribute) {
            return this
          }
        }
      }
      if (wholeAttribute && !checkAttr(qualifier, getAttr(this, attribute) || '', value)) {
        // select is for attrib equality
        return false
      }
      return this
    }
  
    function clean(s) {
      return cleanCache.g(s) || cleanCache.s(s, s.replace(specialChars, '\\$1'))
    }
  
    function checkAttr(qualify, actual, val) {
      switch (qualify) {
      case '=':
        return actual == val
      case '^=':
        return actual.match(attrCache.g('^=' + val) || attrCache.s('^=' + val, '^' + clean(val), 1))
      case '$=':
        return actual.match(attrCache.g('$=' + val) || attrCache.s('$=' + val, clean(val) + '$', 1))
      case '*=':
        return actual.match(attrCache.g(val) || attrCache.s(val, clean(val), 1))
      case '~=':
        return actual.match(attrCache.g('~=' + val) || attrCache.s('~=' + val, '(?:^|\\s+)' + clean(val) + '(?:\\s+|$)', 1))
      case '|=':
        return actual.match(attrCache.g('|=' + val) || attrCache.s('|=' + val, '^' + clean(val) + '(-|$)', 1))
      }
      return 0
    }
  
    // given a selector, first check for simple cases then collect all base candidate matches and filter
    function _qwery(selector, _root) {
      var r = [], ret = [], i, l, m, token, tag, els, intr, item, root = _root
        , tokens = tokenCache.g(selector) || tokenCache.s(selector, selector.split(tokenizr))
        , dividedTokens = selector.match(dividers)
  
      if (!tokens.length) return r
  
      token = (tokens = tokens.slice(0)).pop() // copy cached tokens, take the last one
      if (tokens.length && (m = tokens[tokens.length - 1].match(idOnly))) root = byId(_root, m[1])
      if (!root) return r
  
      intr = q(token)
      // collect base candidates to filter
      els = root !== _root && root.nodeType !== 9 && dividedTokens && /^[+~]$/.test(dividedTokens[dividedTokens.length - 1]) ?
        function (r) {
          while (root = root.nextSibling) {
            root.nodeType == 1 && (intr[1] ? intr[1] == root.tagName.toLowerCase() : 1) && (r[r.length] = root)
          }
          return r
        }([]) :
        root[byTag](intr[1] || '*')
      // filter elements according to the right-most part of the selector
      for (i = 0, l = els.length; i < l; i++) {
        if (item = interpret.apply(els[i], intr)) r[r.length] = item
      }
      if (!tokens.length) return r
  
      // filter further according to the rest of the selector (the left side)
      each(r, function(e) { if (ancestorMatch(e, tokens, dividedTokens)) ret[ret.length] = e })
      return ret
    }
  
    // compare element to a selector
    function is(el, selector, root) {
      if (isNode(selector)) return el == selector
      if (arrayLike(selector)) return !!~flatten(selector).indexOf(el) // if selector is an array, is el a member?
  
      var selectors = selector.split(','), tokens, dividedTokens
      while (selector = selectors.pop()) {
        tokens = tokenCache.g(selector) || tokenCache.s(selector, selector.split(tokenizr))
        dividedTokens = selector.match(dividers)
        tokens = tokens.slice(0) // copy array
        if (interpret.apply(el, q(tokens.pop())) && (!tokens.length || ancestorMatch(el, tokens, dividedTokens, root))) {
          return true
        }
      }
      return false
    }
  
    // given elements matching the right-most part of a selector, filter out any that don't match the rest
    function ancestorMatch(el, tokens, dividedTokens, root) {
      var cand
      // recursively work backwards through the tokens and up the dom, covering all options
      function crawl(e, i, p) {
        while (p = walker[dividedTokens[i]](p, e)) {
          if (isNode(p) && (interpret.apply(p, q(tokens[i])))) {
            if (i) {
              if (cand = crawl(p, i - 1, p)) return cand
            } else return p
          }
        }
      }
      return (cand = crawl(el, tokens.length - 1, el)) && (!root || isAncestor(cand, root))
    }
  
    function isNode(el, t) {
      return el && typeof el === 'object' && (t = el.nodeType) && (t == 1 || t == 9)
    }
  
    function uniq(ar) {
      var a = [], i, j
      o: for (i = 0; i < ar.length; ++i) {
        for (j = 0; j < a.length; ++j) if (a[j] == ar[i]) continue o
        a[a.length] = ar[i]
      }
      return a
    }
  
    function arrayLike(o) {
      return (typeof o === 'object' && isFinite(o.length))
    }
  
    function normalizeRoot(root) {
      if (!root) return doc
      if (typeof root == 'string') return qwery(root)[0]
      if (!root.nodeType && arrayLike(root)) return root[0]
      return root
    }
  
    function byId(root, id, el) {
      // if doc, query on it, else query the parent doc or if a detached fragment rewrite the query and run on the fragment
      return root.nodeType === 9 ? root.getElementById(id) :
        root.ownerDocument &&
          (((el = root.ownerDocument.getElementById(id)) && isAncestor(el, root) && el) ||
            (!isAncestor(root, root.ownerDocument) && select('[id="' + id + '"]', root)[0]))
    }
  
    function qwery(selector, _root) {
      var m, el, root = normalizeRoot(_root)
  
      // easy, fast cases that we can dispatch with simple DOM calls
      if (!root || !selector) return []
      if (selector === window || isNode(selector)) {
        return !_root || (selector !== window && isNode(root) && isAncestor(selector, root)) ? [selector] : []
      }
      if (selector && arrayLike(selector)) return flatten(selector)
      if (m = selector.match(easy)) {
        if (m[1]) return (el = byId(root, m[1])) ? [el] : []
        if (m[2]) return arrayify(root[byTag](m[2]))
        if (supportsCSS3 && m[3]) return arrayify(root[byClass](m[3]))
      }
  
      return select(selector, root)
    }
  
    // where the root is not document and a relationship selector is first we have to
    // do some awkward adjustments to get it to work, even with qSA
    function collectSelector(root, collector) {
      return function(s) {
        var oid, nid
        if (splittable.test(s)) {
          if (root.nodeType !== 9) {
           // make sure the el has an id, rewrite the query, set root to doc and run it
           if (!(nid = oid = root.getAttribute('id'))) root.setAttribute('id', nid = '__qwerymeupscotty')
           s = '[id="' + nid + '"]' + s // avoid byId and allow us to match context element
           collector(root.parentNode || root, s, true)
           oid || root.removeAttribute('id')
          }
          return;
        }
        s.length && collector(root, s, false)
      }
    }
  
    var isAncestor = 'compareDocumentPosition' in html ?
      function (element, container) {
        return (container.compareDocumentPosition(element) & 16) == 16
      } : 'contains' in html ?
      function (element, container) {
        container = container.nodeType === 9 || container == window ? html : container
        return container !== element && container.contains(element)
      } :
      function (element, container) {
        while (element = element.parentNode) if (element === container) return 1
        return 0
      }
    , getAttr = function() {
        // detect buggy IE src/href getAttribute() call
        var e = doc.createElement('p')
        return ((e.innerHTML = '<a href="#x">x</a>') && e.firstChild.getAttribute('href') != '#x') ?
          function(e, a) {
            return a === 'class' ? e.className : (a === 'href' || a === 'src') ?
              e.getAttribute(a, 2) : e.getAttribute(a)
          } :
          function(e, a) { return e.getAttribute(a) }
     }()
      // does native qSA support CSS3 level selectors
    , supportsCSS3 = function () {
        if (doc[byClass] && doc.querySelector && doc[qSA]) {
          try {
            var p = doc.createElement('p')
            p.innerHTML = '<a/>'
            return p[qSA](':nth-of-type(1)').length
          } catch (e) { }
        }
        return false
      }()
      // native support for CSS3 selectors
    , selectCSS3 = function (selector, root) {
        var result = [], ss, e
        try {
          if (root.nodeType === 9 || !splittable.test(selector)) {
            // most work is done right here, defer to qSA
            return arrayify(root[qSA](selector))
          }
          // special case where we need the services of `collectSelector()`
          each(ss = selector.split(','), collectSelector(root, function(ctx, s) {
            e = ctx[qSA](s)
            if (e.length == 1) result[result.length] = e.item(0)
            else if (e.length) result = result.concat(arrayify(e))
          }))
          return ss.length > 1 && result.length > 1 ? uniq(result) : result
        } catch(ex) { }
        return selectNonNative(selector, root)
      }
      // native support for CSS2 selectors only
    , selectCSS2qSA = function (selector, root) {
        var i, r, l, ss, result = []
        selector = selector.replace(normalizr, '$1')
        // safe to pass whole selector to qSA
        if (!splittable.test(selector) && css2.test(selector)) return arrayify(root[qSA](selector))
        each(ss = selector.split(','), collectSelector(root, function(ctx, s, rewrite) {
          // use native qSA if selector is compatile, otherwise use _qwery()
          r = css2.test(s) ? ctx[qSA](s) : _qwery(s, ctx)
          for (i = 0, l = r.length; i < l; i++) {
            if (ctx.nodeType === 9 || rewrite || isAncestor(r[i], root)) result[result.length] = r[i]
          }
        }))
        return ss.length > 1 && result.length > 1 ? uniq(result) : result
      }
      // no native selector support
    , selectNonNative = function (selector, root) {
        var result = [], items, m, i, l, r, ss
        selector = selector.replace(normalizr, '$1')
        if (m = selector.match(tagAndOrClass)) {
          r = classRegex(m[2])
          items = root[byTag](m[1] || '*')
          for (i = 0, l = items.length; i < l; i++) {
            if (r.test(items[i].className)) result[result.length] = items[i]
          }
          return result
        }
        // more complex selector, get `_qwery()` to do the work for us
        each(ss = selector.split(','), collectSelector(root, function(ctx, s, rewrite) {
          r = _qwery(s, ctx)
          for (i = 0, l = r.length; i < l; i++) {
            if (ctx.nodeType === 9 || rewrite || isAncestor(r[i], root)) result[result.length] = r[i]
          }
        }))
        return ss.length > 1 && result.length > 1 ? uniq(result) : result
      }
    , select = function () {
        var q = qwery.nonStandardEngine ? selectNonNative : supportsCSS3 ? selectCSS3 : doc[qSA] ? selectCSS2qSA : selectNonNative
        return q.apply(q, arguments)
      }
  
    qwery.uniq = uniq
    qwery.is = is
    qwery.pseudos = {}
    qwery.nonStandardEngine = false
  
    return qwery
  })
  

  provide("qwery", module.exports);

  !function (doc, $) {
    var q = require('qwery')
  
    $.pseudos = q.pseudos
  
    $._select = function (s, r) {
      // detect if sibling module 'bonzo' is available at run-time
      // rather than load-time since technically it's not a dependency and
      // can be loaded in any order
      // hence the lazy function re-definition
      return ($._select = (function(b) {
        try {
          b = require('bonzo')
          return function (s, r) {
            return /^\s*</.test(s) ? b.create(s, r) : q(s, r)
          }
        } catch (e) { }
        return q
      })())(s, r)
    }
  
    $.ender({
      find: function (s) {
        var r = [], i, l, j, k, els
        for (i = 0, l = this.length; i < l; i++) {
          els = q(s, this[i])
          for (j = 0, k = els.length; j < k; j++) r.push(els[j])
        }
        return $(q.uniq(r))
      }
      , and: function (s) {
        var plus = $(s)
        for (var i = this.length, j = 0, l = this.length + plus.length; i < l; i++, j++) {
          this[i] = plus[j]
        }
        return this
      }
      , is: function(s, r) {
        var i, l
        for (i = 0, l = this.length; i < l; i++) {
          if (q.is(this[i], s, r)) {
            return true
          }
        }
        return false
      }
    }, true)
  }(document, ender);
  

}();

!function () {

  var module = { exports: {} }, exports = module.exports;

  /*!
    * bean.js - copyright Jacob Thornton 2011
    * https://github.com/fat/bean
    * MIT License
    * special thanks to:
    * dean edwards: http://dean.edwards.name/
    * dperini: https://github.com/dperini/nwevents
    * the entire mootools team: github.com/mootools/mootools-core
    */
  !function (name, context, definition) {
    if (typeof module !== 'undefined') module.exports = definition(name, context);
    else if (typeof define === 'function' && typeof define.amd  === 'object') define(definition);
    else context[name] = definition(name, context);
  }('bean', this, function (name, context) {
    var win = window
      , old = context[name]
      , overOut = /over|out/
      , namespaceRegex = /[^\.]*(?=\..*)\.|.*/
      , nameRegex = /\..*/
      , addEvent = 'addEventListener'
      , attachEvent = 'attachEvent'
      , removeEvent = 'removeEventListener'
      , detachEvent = 'detachEvent'
      , doc = document || {}
      , root = doc.documentElement || {}
      , W3C_MODEL = root[addEvent]
      , eventSupport = W3C_MODEL ? addEvent : attachEvent
      , slice = Array.prototype.slice
      , mouseTypeRegex = /click|mouse(?!(.*wheel|scroll))|menu|drag|drop/i
      , mouseWheelTypeRegex = /mouse.*(wheel|scroll)/i
      , textTypeRegex = /^text/i
      , touchTypeRegex = /^touch|^gesture/i
      , ONE = { one: 1 } // singleton for quick matching making add() do one()
  
      , nativeEvents = (function (hash, events, i) {
          for (i = 0; i < events.length; i++)
            hash[events[i]] = 1
          return hash
        })({}, (
            'click dblclick mouseup mousedown contextmenu ' +                  // mouse buttons
            'mousewheel mousemultiwheel DOMMouseScroll ' +                     // mouse wheel
            'mouseover mouseout mousemove selectstart selectend ' +            // mouse movement
            'keydown keypress keyup ' +                                        // keyboard
            'orientationchange ' +                                             // mobile
            'focus blur change reset select submit ' +                         // form elements
            'load unload beforeunload resize move DOMContentLoaded readystatechange ' + // window
            'error abort scroll ' +                                            // misc
            (W3C_MODEL ? // element.fireEvent('onXYZ'... is not forgiving if we try to fire an event
                         // that doesn't actually exist, so make sure we only do these on newer browsers
              'show ' +                                                          // mouse buttons
              'input invalid ' +                                                 // form elements
              'touchstart touchmove touchend touchcancel ' +                     // touch
              'gesturestart gesturechange gestureend ' +                         // gesture
              'message readystatechange pageshow pagehide popstate ' +           // window
              'hashchange offline online ' +                                     // window
              'afterprint beforeprint ' +                                        // printing
              'dragstart dragenter dragover dragleave drag drop dragend ' +      // dnd
              'loadstart progress suspend emptied stalled loadmetadata ' +       // media
              'loadeddata canplay canplaythrough playing waiting seeking ' +     // media
              'seeked ended durationchange timeupdate play pause ratechange ' +  // media
              'volumechange cuechange ' +                                        // media
              'checking noupdate downloading cached updateready obsolete ' +     // appcache
              '' : '')
          ).split(' ')
        )
  
      , customEvents = (function () {
          function isDescendant(parent, node) {
            while ((node = node.parentNode) !== null) {
              if (node === parent) return true
            }
            return false
          }
  
          function check(event) {
            var related = event.relatedTarget
            if (!related) return related === null
            return (related !== this && related.prefix !== 'xul' && !/document/.test(this.toString()) && !isDescendant(this, related))
          }
  
          return {
              mouseenter: { base: 'mouseover', condition: check }
            , mouseleave: { base: 'mouseout', condition: check }
            , mousewheel: { base: /Firefox/.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel' }
          }
        })()
  
      , fixEvent = (function () {
          var commonProps = 'altKey attrChange attrName bubbles cancelable ctrlKey currentTarget detail eventPhase getModifierState isTrusted metaKey relatedNode relatedTarget shiftKey srcElement target timeStamp type view which'.split(' ')
            , mouseProps = commonProps.concat('button buttons clientX clientY dataTransfer fromElement offsetX offsetY pageX pageY screenX screenY toElement'.split(' '))
            , mouseWheelProps = mouseProps.concat('wheelDelta wheelDeltaX wheelDeltaY wheelDeltaZ axis'.split(' ')) // 'axis' is FF specific
            , keyProps = commonProps.concat('char charCode key keyCode keyIdentifier keyLocation'.split(' '))
            , textProps = commonProps.concat(['data'])
            , touchProps = commonProps.concat('touches targetTouches changedTouches scale rotation'.split(' '))
            , preventDefault = 'preventDefault'
            , createPreventDefault = function (event) {
                return function () {
                  if (event[preventDefault])
                    event[preventDefault]()
                  else
                    event.returnValue = false
                }
              }
            , stopPropagation = 'stopPropagation'
            , createStopPropagation = function (event) {
                return function () {
                  if (event[stopPropagation])
                    event[stopPropagation]()
                  else
                    event.cancelBubble = true
                }
              }
            , createStop = function (synEvent) {
                return function () {
                  synEvent[preventDefault]()
                  synEvent[stopPropagation]()
                  synEvent.stopped = true
                }
              }
            , copyProps = function (event, result, props) {
                var i, p
                for (i = props.length; i--;) {
                  p = props[i]
                  if (!(p in result) && p in event) result[p] = event[p]
                }
              }
  
          return function (event, isNative) {
            var result = { originalEvent: event, isNative: isNative }
            if (!event)
              return result
  
            var props
              , type = event.type
              , target = event.target || event.srcElement
  
            result[preventDefault] = createPreventDefault(event)
            result[stopPropagation] = createStopPropagation(event)
            result.stop = createStop(result)
            result.target = target && target.nodeType === 3 ? target.parentNode : target
  
            if (isNative) { // we only need basic augmentation on custom events, the rest is too expensive
              if (type.indexOf('key') !== -1) {
                props = keyProps
                result.keyCode = event.which || event.keyCode
              } else if (mouseTypeRegex.test(type)) {
                props = mouseProps
                result.rightClick = event.which === 3 || event.button === 2
                result.pos = { x: 0, y: 0 }
                if (event.pageX || event.pageY) {
                  result.clientX = event.pageX
                  result.clientY = event.pageY
                } else if (event.clientX || event.clientY) {
                  result.clientX = event.clientX + doc.body.scrollLeft + root.scrollLeft
                  result.clientY = event.clientY + doc.body.scrollTop + root.scrollTop
                }
                if (overOut.test(type))
                  result.relatedTarget = event.relatedTarget || event[(type === 'mouseover' ? 'from' : 'to') + 'Element']
              } else if (touchTypeRegex.test(type)) {
                props = touchProps
              } else if (mouseWheelTypeRegex.test(type)) {
                props = mouseWheelProps
              } else if (textTypeRegex.test(type)) {
                props = textProps
              }
              copyProps(event, result, props || commonProps)
            }
            return result
          }
        })()
  
        // if we're in old IE we can't do onpropertychange on doc or win so we use doc.documentElement for both
      , targetElement = function (element, isNative) {
          return !W3C_MODEL && !isNative && (element === doc || element === win) ? root : element
        }
  
        // we use one of these per listener, of any type
      , RegEntry = (function () {
          function entry(element, type, handler, original, namespaces) {
            this.element = element
            this.type = type
            this.handler = handler
            this.original = original
            this.namespaces = namespaces
            this.custom = customEvents[type]
            this.isNative = nativeEvents[type] && element[eventSupport]
            this.eventType = W3C_MODEL || this.isNative ? type : 'propertychange'
            this.customType = !W3C_MODEL && !this.isNative && type
            this.target = targetElement(element, this.isNative)
            this.eventSupport = this.target[eventSupport]
          }
  
          entry.prototype = {
              // given a list of namespaces, is our entry in any of them?
              inNamespaces: function (checkNamespaces) {
                var i, j
                if (!checkNamespaces)
                  return true
                if (!this.namespaces)
                  return false
                for (i = checkNamespaces.length; i--;) {
                  for (j = this.namespaces.length; j--;) {
                    if (checkNamespaces[i] === this.namespaces[j])
                      return true
                  }
                }
                return false
              }
  
              // match by element, original fn (opt), handler fn (opt)
            , matches: function (checkElement, checkOriginal, checkHandler) {
                return this.element === checkElement &&
                  (!checkOriginal || this.original === checkOriginal) &&
                  (!checkHandler || this.handler === checkHandler)
              }
          }
  
          return entry
        })()
  
      , registry = (function () {
          // our map stores arrays by event type, just because it's better than storing
          // everything in a single array. uses '$' as a prefix for the keys for safety
          var map = {}
  
            // generic functional search of our registry for matching listeners,
            // `fn` returns false to break out of the loop
            , forAll = function (element, type, original, handler, fn) {
                if (!type || type === '*') {
                  // search the whole registry
                  for (var t in map) {
                    if (t.charAt(0) === '$')
                      forAll(element, t.substr(1), original, handler, fn)
                  }
                } else {
                  var i = 0, l, list = map['$' + type], all = element === '*'
                  if (!list)
                    return
                  for (l = list.length; i < l; i++) {
                    if (all || list[i].matches(element, original, handler))
                      if (!fn(list[i], list, i, type))
                        return
                  }
                }
              }
  
            , has = function (element, type, original) {
                // we're not using forAll here simply because it's a bit slower and this
                // needs to be fast
                var i, list = map['$' + type]
                if (list) {
                  for (i = list.length; i--;) {
                    if (list[i].matches(element, original, null))
                      return true
                  }
                }
                return false
              }
  
            , get = function (element, type, original) {
                var entries = []
                forAll(element, type, original, null, function (entry) { return entries.push(entry) })
                return entries
              }
  
            , put = function (entry) {
                (map['$' + entry.type] || (map['$' + entry.type] = [])).push(entry)
                return entry
              }
  
            , del = function (entry) {
                forAll(entry.element, entry.type, null, entry.handler, function (entry, list, i) {
                  list.splice(i, 1)
                  if (list.length === 0)
                    delete map['$' + entry.type]
                  return false
                })
              }
  
              // dump all entries, used for onunload
            , entries = function () {
                var t, entries = []
                for (t in map) {
                  if (t.charAt(0) === '$')
                    entries = entries.concat(map[t])
                }
                return entries
              }
  
          return { has: has, get: get, put: put, del: del, entries: entries }
        })()
  
        // add and remove listeners to DOM elements
      , listener = W3C_MODEL ? function (element, type, fn, add) {
          element[add ? addEvent : removeEvent](type, fn, false)
        } : function (element, type, fn, add, custom) {
          if (custom && add && element['_on' + custom] === null)
            element['_on' + custom] = 0
          element[add ? attachEvent : detachEvent]('on' + type, fn)
        }
  
      , nativeHandler = function (element, fn, args) {
          return function (event) {
            event = fixEvent(event || ((this.ownerDocument || this.document || this).parentWindow || win).event, true)
            return fn.apply(element, [event].concat(args))
          }
        }
  
      , customHandler = function (element, fn, type, condition, args, isNative) {
          return function (event) {
            if (condition ? condition.apply(this, arguments) : W3C_MODEL ? true : event && event.propertyName === '_on' + type || !event) {
              if (event)
                event = fixEvent(event || ((this.ownerDocument || this.document || this).parentWindow || win).event, isNative)
              fn.apply(element, event && (!args || args.length === 0) ? arguments : slice.call(arguments, event ? 0 : 1).concat(args))
            }
          }
        }
  
      , once = function (rm, element, type, fn, originalFn) {
          // wrap the handler in a handler that does a remove as well
          return function () {
            rm(element, type, originalFn)
            fn.apply(this, arguments)
          }
        }
  
      , removeListener = function (element, orgType, handler, namespaces) {
          var i, l, entry
            , type = (orgType && orgType.replace(nameRegex, ''))
            , handlers = registry.get(element, type, handler)
  
          for (i = 0, l = handlers.length; i < l; i++) {
            if (handlers[i].inNamespaces(namespaces)) {
              if ((entry = handlers[i]).eventSupport)
                listener(entry.target, entry.eventType, entry.handler, false, entry.type)
              // TODO: this is problematic, we have a registry.get() and registry.del() that
              // both do registry searches so we waste cycles doing this. Needs to be rolled into
              // a single registry.forAll(fn) that removes while finding, but the catch is that
              // we'll be splicing the arrays that we're iterating over. Needs extra tests to
              // make sure we don't screw it up. @rvagg
              registry.del(entry)
            }
          }
        }
  
      , addListener = function (element, orgType, fn, originalFn, args) {
          var entry
            , type = orgType.replace(nameRegex, '')
            , namespaces = orgType.replace(namespaceRegex, '').split('.')
  
          if (registry.has(element, type, fn))
            return element // no dupe
          if (type === 'unload')
            fn = once(removeListener, element, type, fn, originalFn) // self clean-up
          if (customEvents[type]) {
            if (customEvents[type].condition)
              fn = customHandler(element, fn, type, customEvents[type].condition, true)
            type = customEvents[type].base || type
          }
          entry = registry.put(new RegEntry(element, type, fn, originalFn, namespaces[0] && namespaces))
          entry.handler = entry.isNative ?
            nativeHandler(element, entry.handler, args) :
            customHandler(element, entry.handler, type, false, args, false)
          if (entry.eventSupport)
            listener(entry.target, entry.eventType, entry.handler, true, entry.customType)
        }
  
      , del = function (selector, fn, $) {
          return function (e) {
            var target, i, array = typeof selector === 'string' ? $(selector, this) : selector
            for (target = e.target; target && target !== this; target = target.parentNode) {
              for (i = array.length; i--;) {
                if (array[i] === target) {
                  return fn.apply(target, arguments)
                }
              }
            }
          }
        }
  
      , remove = function (element, typeSpec, fn) {
          var k, m, type, namespaces, i
            , rm = removeListener
            , isString = typeSpec && typeof typeSpec === 'string'
  
          if (isString && typeSpec.indexOf(' ') > 0) {
            // remove(el, 't1 t2 t3', fn) or remove(el, 't1 t2 t3')
            typeSpec = typeSpec.split(' ')
            for (i = typeSpec.length; i--;)
              remove(element, typeSpec[i], fn)
            return element
          }
          type = isString && typeSpec.replace(nameRegex, '')
          if (type && customEvents[type])
            type = customEvents[type].type
          if (!typeSpec || isString) {
            // remove(el) or remove(el, t1.ns) or remove(el, .ns) or remove(el, .ns1.ns2.ns3)
            if (namespaces = isString && typeSpec.replace(namespaceRegex, ''))
              namespaces = namespaces.split('.')
            rm(element, type, fn, namespaces)
          } else if (typeof typeSpec === 'function') {
            // remove(el, fn)
            rm(element, null, typeSpec)
          } else {
            // remove(el, { t1: fn1, t2, fn2 })
            for (k in typeSpec) {
              if (typeSpec.hasOwnProperty(k))
                remove(element, k, typeSpec[k])
            }
          }
          return element
        }
  
      , add = function (element, events, fn, delfn, $) {
          var type, types, i, args
            , originalFn = fn
            , isDel = fn && typeof fn === 'string'
  
          if (events && !fn && typeof events === 'object') {
            for (type in events) {
              if (events.hasOwnProperty(type))
                add.apply(this, [ element, type, events[type] ])
            }
          } else {
            args = arguments.length > 3 ? slice.call(arguments, 3) : []
            types = (isDel ? fn : events).split(' ')
            isDel && (fn = del(events, (originalFn = delfn), $)) && (args = slice.call(args, 1))
            // special case for one()
            this === ONE && (fn = once(remove, element, events, fn, originalFn))
            for (i = types.length; i--;) addListener(element, types[i], fn, originalFn, args)
          }
          return element
        }
  
      , one = function () {
          return add.apply(ONE, arguments)
        }
  
      , fireListener = W3C_MODEL ? function (isNative, type, element) {
          var evt = doc.createEvent(isNative ? 'HTMLEvents' : 'UIEvents')
          evt[isNative ? 'initEvent' : 'initUIEvent'](type, true, true, win, 1)
          element.dispatchEvent(evt)
        } : function (isNative, type, element) {
          element = targetElement(element, isNative)
          // if not-native then we're using onpropertychange so we just increment a custom property
          isNative ? element.fireEvent('on' + type, doc.createEventObject()) : element['_on' + type]++
        }
  
      , fire = function (element, type, args) {
          var i, j, l, names, handlers
            , types = type.split(' ')
  
          for (i = types.length; i--;) {
            type = types[i].replace(nameRegex, '')
            if (names = types[i].replace(namespaceRegex, ''))
              names = names.split('.')
            if (!names && !args && element[eventSupport]) {
              fireListener(nativeEvents[type], type, element)
            } else {
              // non-native event, either because of a namespace, arguments or a non DOM element
              // iterate over all listeners and manually 'fire'
              handlers = registry.get(element, type)
              args = [false].concat(args)
              for (j = 0, l = handlers.length; j < l; j++) {
                if (handlers[j].inNamespaces(names))
                  handlers[j].handler.apply(element, args)
              }
            }
          }
          return element
        }
  
      , clone = function (element, from, type) {
          var i = 0
            , handlers = registry.get(from, type)
            , l = handlers.length
  
          for (;i < l; i++)
            handlers[i].original && add(element, handlers[i].type, handlers[i].original)
          return element
        }
  
      , bean = {
            add: add
          , one: one
          , remove: remove
          , clone: clone
          , fire: fire
          , noConflict: function () {
              context[name] = old
              return this
            }
        }
  
    if (win[attachEvent]) {
      // for IE, clean up on unload to avoid leaks
      var cleanup = function () {
        var i, entries = registry.entries()
        for (i in entries) {
          if (entries[i].type && entries[i].type !== 'unload')
            remove(entries[i].element, entries[i].type)
        }
        win[detachEvent]('onunload', cleanup)
        win.CollectGarbage && win.CollectGarbage()
      }
      win[attachEvent]('onunload', cleanup)
    }
  
    return bean
  })
  

  provide("bean", module.exports);

  !function ($) {
    var b = require('bean')
      , integrate = function (method, type, method2) {
          var _args = type ? [type] : []
          return function () {
            for (var args, i = 0, l = this.length; i < l; i++) {
              args = [this[i]].concat(_args, Array.prototype.slice.call(arguments, 0))
              args.length == 4 && args.push($)
              !arguments.length && method == 'add' && type && (method = 'fire')
              b[method].apply(this, args)
            }
            return this
          }
        }
      , add = integrate('add')
      , remove = integrate('remove')
      , fire = integrate('fire')
  
      , methods = {
            on: add
          , addListener: add
          , bind: add
          , listen: add
          , delegate: add
  
          , one: integrate('one')
  
          , off: remove
          , unbind: remove
          , unlisten: remove
          , removeListener: remove
          , undelegate: remove
  
          , emit: fire
          , trigger: fire
  
          , cloneEvents: integrate('clone')
  
          , hover: function (enter, leave, i) { // i for internal
              for (i = this.length; i--;) {
                b.add.call(this, this[i], 'mouseenter', enter)
                b.add.call(this, this[i], 'mouseleave', leave)
              }
              return this
            }
        }
  
      , shortcuts = [
            'blur', 'change', 'click', 'dblclick', 'error', 'focus', 'focusin'
          , 'focusout', 'keydown', 'keypress', 'keyup', 'load', 'mousedown'
          , 'mouseenter', 'mouseleave', 'mouseout', 'mouseover', 'mouseup', 'mousemove'
          , 'resize', 'scroll', 'select', 'submit', 'unload'
        ]
  
    for (var i = shortcuts.length; i--;) {
      methods[shortcuts[i]] = integrate('add', shortcuts[i])
    }
  
    $.ender(methods, true)
  }(ender)
  

}();

!function () {

  var module = { exports: {} }, exports = module.exports;

  /*!
    * Reqwest! A general purpose XHR connection manager
    * (c) Dustin Diaz 2011
    * https://github.com/ded/reqwest
    * license MIT
    */
  !function (name, definition) {
    if (typeof define == 'function') define(definition)
    else if (typeof module != 'undefined') module.exports = definition()
    else this[name] = definition()
  }('reqwest', function () {
  
    var context = this
      , win = window
      , doc = document
      , old = context.reqwest
      , twoHundo = /^20\d$/
      , byTag = 'getElementsByTagName'
      , readyState = 'readyState'
      , contentType = 'Content-Type'
      , requestedWith = 'X-Requested-With'
      , head = doc[byTag]('head')[0]
      , uniqid = 0
      , lastValue // data stored by the most recent JSONP callback
      , xmlHttpRequest = 'XMLHttpRequest'
      , defaultHeaders = {
            contentType: 'application/x-www-form-urlencoded'
          , accept: {
                '*':  'text/javascript, text/html, application/xml, text/xml, */*'
              , xml:  'application/xml, text/xml'
              , html: 'text/html'
              , text: 'text/plain'
              , json: 'application/json, text/javascript'
              , js:   'application/javascript, text/javascript'
            }
          , requestedWith: xmlHttpRequest
        }
      , xhr = (xmlHttpRequest in win) ?
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
      headers.Accept = headers.Accept || defaultHeaders.accept[o.type] || defaultHeaders.accept['*']
      // breaks cross-origin requests with legacy browsers
      if (!o.crossOrigin && !headers[requestedWith]) headers[requestedWith] = defaultHeaders.requestedWith
      if (!headers[contentType]) headers[contentType] = o.contentType || defaultHeaders.contentType
      for (var h in headers) {
        headers.hasOwnProperty(h) && http.setRequestHeader(h, headers[h])
      }
    }
  
    function generalCallback(data) {
      lastValue = data
    }
  
    function urlappend(url, s) {
      return url + (/\?/.test(url) ? '&' : '?') + s
    }
  
    function handleJsonp(o, fn, err, url) {
      var reqId = uniqid++
        , cbkey = o.jsonpCallback || 'callback' // the 'callback' key
        , cbval = o.jsonpCallbackName || ('reqwest_' + reqId) // the 'callback' value
        , cbreg = new RegExp('(' + cbkey + ')=(.+)(&|$)')
        , match = url.match(cbreg)
        , script = doc.createElement('script')
        , loaded = 0
  
      if (match) {
        if (match[2] === '?') {
          url = url.replace(cbreg, '$1=' + cbval + '$3') // wildcard callback func name
        } else {
          cbval = match[2] // provided callback func name
        }
      } else {
        url = urlappend(url, cbkey + '=' + cbval) // no callback details, add 'em
      }
  
      win[cbval] = generalCallback
  
      script.type = 'text/javascript'
      script.src = url
      script.async = true
      if (typeof script.onreadystatechange !== 'undefined') {
          // need this for IE due to out-of-order onreadystatechange(), binding script
          // execution to an event listener gives us control over when the script
          // is executed. See http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
          script.event = 'onclick'
          script.htmlFor = script.id = '_reqwest_' + reqId
      }
  
      script.onload = script.onreadystatechange = function () {
        if ((script[readyState] && script[readyState] !== 'complete' && script[readyState] !== 'loaded') || loaded) {
          return false
        }
        script.onload = script.onreadystatechange = null
        script.onclick && script.onclick()
        // Call the user callback with the last value stored and clean up values and scripts.
        o.success && o.success(lastValue)
        lastValue = undefined
        head.removeChild(script)
        loaded = 1
      }
  
      // Add the script to the DOM head
      head.appendChild(script)
    }
  
    function getRequest(o, fn, err) {
      var method = (o.method || 'GET').toUpperCase()
        , url = typeof o === 'string' ? o : o.url
        // convert non-string objects to query-string form unless o.processData is false
        , data = (o.processData !== false && o.data && typeof o.data !== 'string')
          ? reqwest.toQueryString(o.data)
          : (o.data || null);
  
      // if we're working on a GET request and we have data then we should append
      // query string to end of URL and not post data
      (o.type == 'jsonp' || method == 'GET')
        && data
        && (url = urlappend(url, data))
        && (data = null)
  
      if (o.type == 'jsonp') return handleJsonp(o, fn, err, url)
  
      var http = xhr()
      http.open(method, url, true)
      setHeaders(http, o)
      http.onreadystatechange = handleReadyState(http, fn, err)
      o.before && o.before(http)
      http.send(data)
      return http
    }
  
    function Reqwest(o, fn) {
      this.o = o
      this.fn = fn
      init.apply(this, arguments)
    }
  
    function setType(url) {
      var m = url.match(/\.(json|jsonp|html|xml)(\?|$)/)
      return m ? m[1] : 'js'
    }
  
    function init(o, fn) {
      this.url = typeof o == 'string' ? o : o.url
      this.timeout = null
      var type = o.type || setType(this.url)
        , self = this
      fn = fn || function () {}
  
      if (o.timeout) {
        this.timeout = setTimeout(function () {
          self.abort()
        }, o.timeout)
      }
  
      function complete(resp) {
        o.timeout && clearTimeout(self.timeout)
        self.timeout = null
        o.complete && o.complete(resp)
      }
  
      function success(resp) {
        var r = resp.responseText
        if (r) {
          switch (type) {
          case 'json':
            try {
              resp = win.JSON ? win.JSON.parse(r) : eval('(' + r + ')')
            } catch(err) {
              return error(resp, 'Could not parse JSON in response', err)
            }
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
  
      function error(resp, msg, t) {
        o.error && o.error(resp, msg, t)
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
  
    // normalize newline variants according to spec -> CRLF
    function normalize(s) {
      return s ? s.replace(/\r?\n/g, '\r\n') : ''
    }
  
    var isArray = typeof Array.isArray == 'function' ? Array.isArray : function(a) {
      return a instanceof Array
    }
  
    function serial(el, cb) {
      var n = el.name
        , t = el.tagName.toLowerCase()
        , optCb = function(o) {
            // IE gives value="" even where there is no value attribute
            // 'specified' ref: http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-862529273
            if (o && !o.disabled)
              cb(n, normalize(o.attributes.value && o.attributes.value.specified ? o.value : o.text))
          }
  
      // don't serialize elements that are disabled or without a name
      if (el.disabled || !n) return;
  
      switch (t) {
      case 'input':
        if (!/reset|button|image|file/i.test(el.type)) {
          var ch = /checkbox/i.test(el.type)
            , ra = /radio/i.test(el.type)
            , val = el.value;
          // WebKit gives us "" instead of "on" if a checkbox has no value, so correct it here
          (!(ch || ra) || el.checked) && cb(n, normalize(ch && val === '' ? 'on' : val))
        }
        break;
      case 'textarea':
        cb(n, normalize(el.value))
        break;
      case 'select':
        if (el.type.toLowerCase() === 'select-one') {
          optCb(el.selectedIndex >= 0 ? el.options[el.selectedIndex] : null)
        } else {
          for (var i = 0; el.length && i < el.length; i++) {
            el.options[i].selected && optCb(el.options[i])
          }
        }
        break;
      }
    }
  
    // collect up all form elements found from the passed argument elements all
    // the way down to child elements; pass a '<form>' or form fields.
    // called with 'this'=callback to use for serial() on each element
    function eachFormElement() {
      var cb = this
        , e, i, j
        , serializeSubtags = function(e, tags) {
          for (var i = 0; i < tags.length; i++) {
            var fa = e[byTag](tags[i])
            for (j = 0; j < fa.length; j++) serial(fa[j], cb)
          }
        }
  
      for (i = 0; i < arguments.length; i++) {
        e = arguments[i]
        if (/input|select|textarea/i.test(e.tagName)) serial(e, cb)
        serializeSubtags(e, [ 'input', 'select', 'textarea' ])
      }
    }
  
    // standard query string style serialization
    function serializeQueryString() {
      return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments))
    }
  
    // { 'name': 'value', ... } style serialization
    function serializeHash() {
      var hash = {}
      eachFormElement.apply(function (name, value) {
        if (name in hash) {
          hash[name] && !isArray(hash[name]) && (hash[name] = [hash[name]])
          hash[name].push(value)
        } else hash[name] = value
      }, arguments)
      return hash
    }
  
    // [ { name: 'name', value: 'value' }, ... ] style serialization
    reqwest.serializeArray = function () {
      var arr = []
      eachFormElement.apply(function(name, value) {
        arr.push({name: name, value: value})
      }, arguments)
      return arr
    }
  
    reqwest.serialize = function () {
      if (arguments.length === 0) return ''
      var opt, fn
        , args = Array.prototype.slice.call(arguments, 0)
  
      opt = args.pop()
      opt && opt.nodeType && args.push(opt) && (opt = null)
      opt && (opt = opt.type)
  
      if (opt == 'map') fn = serializeHash
      else if (opt == 'array') fn = reqwest.serializeArray
      else fn = serializeQueryString
  
      return fn.apply(null, args)
    }
  
    reqwest.toQueryString = function (o) {
      var qs = '', i
        , enc = encodeURIComponent
        , push = function (k, v) {
            qs += enc(k) + '=' + enc(v) + '&'
          }
  
      if (isArray(o)) {
        for (i = 0; o && i < o.length; i++) push(o[i].name, o[i].value)
      } else {
        for (var k in o) {
          if (!Object.hasOwnProperty.call(o, k)) continue;
          var v = o[k]
          if (isArray(v)) {
            for (i = 0; i < v.length; i++) push(k, v[i])
          } else push(k, o[k])
        }
      }
  
      // spaces should be + according to spec
      return qs.replace(/&$/, '').replace(/%20/g,'+')
    }
  
    // jQuery and Zepto compatibility, differences can be remapped here so you can call
    // .ajax.compat(options, callback)
    reqwest.compat = function (o, fn) {
      if (o) {
        o.type && (o.method = o.type) && delete o.type
        o.dataType && (o.type = o.dataType)
        o.jsonpCallback && (o.jsonpCallbackName = o.jsonpCallback) && delete o.jsonpCallback
        o.jsonp && (o.jsonpCallback = o.jsonp)
      }
      return new Reqwest(o, fn)
    }
  
    reqwest.noConflict = function () {
      context.reqwest = old
      return this
    }
  
    return reqwest
  })
  

  provide("reqwest", module.exports);

  !function ($) {
    var r = require('reqwest')
      , integrate = function(method) {
        return function() {
          var args = (this && this.length > 0 ? this : []).concat(Array.prototype.slice.call(arguments, 0))
          return r[method].apply(null, args)
        }
      }
      , s = integrate('serialize')
      , sa = integrate('serializeArray')
  
    $.ender({
        ajax: r
      , serialize: s
      , serializeArray: sa
      , toQueryString: r.toQueryString
    })
  
    $.ender({
        serialize: s
      , serializeArray: sa
    }, true)
  }(ender);
  

}();/*
Syntax highlighting with language autodetection.
http://softwaremaniacs.org/soft/highlight/
*/

var hljs = new function() {

  /* Utility functions */

  function escape(value) {
    return value.replace(/&/gm, '&amp;').replace(/</gm, '&lt;');
  }

  function langRe(language, value, global) {
    return RegExp(
      value,
      'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : '')
    );
  }

  function findCode(pre) {
    for (var i = 0; i < pre.childNodes.length; i++) {
      var node = pre.childNodes[i];
      if (node.nodeName == 'CODE')
        return node;
      if (!(node.nodeType == 3 && node.nodeValue.match(/\s+/)))
        break;
    }
  }

  function blockText(block, ignoreNewLines) {
    var result = '';
    for (var i = 0; i < block.childNodes.length; i++)
      if (block.childNodes[i].nodeType == 3) {
        var chunk = block.childNodes[i].nodeValue;
        if (ignoreNewLines)
          chunk = chunk.replace(/\n/g, '');
        result += chunk;
      } else if (block.childNodes[i].nodeName == 'BR')
        result += '\n';
      else
        result += blockText(block.childNodes[i]);
    // Thank you, MSIE...
    if (/MSIE [678]/.test(navigator.userAgent))
      result = result.replace(/\r/g, '\n');
    return result;
  }

  function blockLanguage(block) {
    var classes = block.className.split(/\s+/)
    classes = classes.concat(block.parentNode.className.split(/\s+/));
    for (var i = 0; i < classes.length; i++) {
      var class_ = classes[i].replace(/^language-/, '');
      if (languages[class_] || class_ == 'no-highlight') {
        return class_;
      }
    }
  }

  /* Stream merging */

  function nodeStream(node) {
    var result = [];
    (function (node, offset) {
      for (var i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].nodeType == 3)
          offset += node.childNodes[i].nodeValue.length;
        else if (node.childNodes[i].nodeName == 'BR')
          offset += 1
        else {
          result.push({
            event: 'start',
            offset: offset,
            node: node.childNodes[i]
          });
          offset = arguments.callee(node.childNodes[i], offset)
          result.push({
            event: 'stop',
            offset: offset,
            node: node.childNodes[i]
          });
        }
      }
      return offset;
    })(node, 0);
    return result;
  }

  function mergeStreams(stream1, stream2, value) {
    var processed = 0;
    var result = '';
    var nodeStack = [];

    function selectStream() {
      if (stream1.length && stream2.length) {
        if (stream1[0].offset != stream2[0].offset)
          return (stream1[0].offset < stream2[0].offset) ? stream1 : stream2;
        else {
          /*
          To avoid starting the stream just before it should stop the order is
          ensured that stream1 always starts first and closes last:

          if (event1 == 'start' && event2 == 'start')
            return stream1;
          if (event1 == 'start' && event2 == 'stop')
            return stream2;
          if (event1 == 'stop' && event2 == 'start')
            return stream1;
          if (event1 == 'stop' && event2 == 'stop')
            return stream2;

          ... which is collapsed to:
          */
          return stream2[0].event == 'start' ? stream1 : stream2;
        }
      } else {
        return stream1.length ? stream1 : stream2;
      }
    }

    function open(node) {
      var result = '<' + node.nodeName.toLowerCase();
      for (var i = 0; i < node.attributes.length; i++) {
        var attribute = node.attributes[i];
        result += ' ' + attribute.nodeName.toLowerCase();
        if (attribute.nodeValue != undefined && attribute.nodeValue != false && attribute.nodeValue != null) {
          result += '="' + escape(attribute.nodeValue) + '"';
        }
      }
      return result + '>';
    }

    while (stream1.length || stream2.length) {
      var current = selectStream().splice(0, 1)[0];
      result += escape(value.substr(processed, current.offset - processed));
      processed = current.offset;
      if ( current.event == 'start') {
        result += open(current.node);
        nodeStack.push(current.node);
      } else if (current.event == 'stop') {
        var i = nodeStack.length;
        do {
          i--;
          var node = nodeStack[i];
          result += ('</' + node.nodeName.toLowerCase() + '>');
        } while (node != current.node);
        nodeStack.splice(i, 1);
        while (i < nodeStack.length) {
          result += open(nodeStack[i]);
          i++;
        }
      }
    }
    result += value.substr(processed);
    return result;
  }

  /* Initialization */

  function compileModes() {

    function compileMode(mode, language, is_default) {
      if (mode.compiled)
        return;

      if (!is_default) {
        mode.beginRe = langRe(language, mode.begin ? mode.begin : '\\B|\\b');
        if (!mode.end && !mode.endsWithParent)
          mode.end = '\\B|\\b'
        if (mode.end)
          mode.endRe = langRe(language, mode.end);
      }
      if (mode.illegal)
        mode.illegalRe = langRe(language, mode.illegal);
      if (mode.relevance == undefined)
        mode.relevance = 1;
      if (mode.keywords)
        mode.lexemsRe = langRe(language, mode.lexems || hljs.IDENT_RE, true);
      for (var key in mode.keywords) {
        if (!mode.keywords.hasOwnProperty(key))
          continue;
        if (mode.keywords[key] instanceof Object)
          mode.keywordGroups = mode.keywords;
        else
          mode.keywordGroups = {'keyword': mode.keywords};
        break;
      }
      if (!mode.contains) {
        mode.contains = [];
      }
      // compiled flag is set before compiling submodes to avoid self-recursion
      // (see lisp where quoted_list contains quoted_list)
      mode.compiled = true;
      for (var i = 0; i < mode.contains.length; i++) {
        compileMode(mode.contains[i], language, false);
      }
      if (mode.starts) {
        compileMode(mode.starts, language, false);
      }
    }

    for (var i in languages) {
      if (!languages.hasOwnProperty(i))
        continue;
      compileMode(languages[i].defaultMode, languages[i], true);
    }
  }

  /*
  Core highlighting function. Accepts a language name and a string with the
  code to highlight. Returns an object with the following properties:

  - relevance (int)
  - keyword_count (int)
  - value (an HTML string with highlighting markup)

  */
  function highlight(language_name, value) {
    if (!compileModes.called) {
      compileModes();
      compileModes.called = true;
    }

    function subMode(lexem, mode) {
      for (var i = 0; i < mode.contains.length; i++) {
        if (mode.contains[i].beginRe.test(lexem)) {
          return mode.contains[i];
        }
      }
    }

    function endOfMode(mode_index, lexem) {
      if (modes[mode_index].end && modes[mode_index].endRe.test(lexem))
        return 1;
      if (modes[mode_index].endsWithParent) {
        var level = endOfMode(mode_index - 1, lexem);
        return level ? level + 1 : 0;
      }
      return 0;
    }

    function isIllegal(lexem, mode) {
      return mode.illegalRe && mode.illegalRe.test(lexem);
    }

    function compileTerminators(mode, language) {
      var terminators = [];

      for (var i = 0; i < mode.contains.length; i++) {
        terminators.push(mode.contains[i].begin);
      }

      var index = modes.length - 1;
      do {
        if (modes[index].end) {
          terminators.push(modes[index].end);
        }
        index--;
      } while (modes[index + 1].endsWithParent);

      if (mode.illegal) {
        terminators.push(mode.illegal);
      }

      return langRe(language, '(' + terminators.join('|') + ')', true);
    }

    function eatModeChunk(value, index) {
      var mode = modes[modes.length - 1];
      if (!mode.terminators) {
        mode.terminators = compileTerminators(mode, language);
      }
      mode.terminators.lastIndex = index;
      var match = mode.terminators.exec(value);
      if (match)
        return [value.substr(index, match.index - index), match[0], false];
      else
        return [value.substr(index), '', true];
    }

    function keywordMatch(mode, match) {
      var match_str = language.case_insensitive ? match[0].toLowerCase() : match[0]
      for (var className in mode.keywordGroups) {
        if (!mode.keywordGroups.hasOwnProperty(className))
          continue;
        var value = mode.keywordGroups[className].hasOwnProperty(match_str);
        if (value)
          return [className, value];
      }
      return false;
    }

    function processKeywords(buffer, mode) {
      if (!mode.keywords)
        return escape(buffer);
      var result = '';
      var last_index = 0;
      mode.lexemsRe.lastIndex = 0;
      var match = mode.lexemsRe.exec(buffer);
      while (match) {
        result += escape(buffer.substr(last_index, match.index - last_index));
        var keyword_match = keywordMatch(mode, match);
        if (keyword_match) {
          keyword_count += keyword_match[1];
          result += '<span class="'+ keyword_match[0] +'">' + escape(match[0]) + '</span>';
        } else {
          result += escape(match[0]);
        }
        last_index = mode.lexemsRe.lastIndex;
        match = mode.lexemsRe.exec(buffer);
      }
      result += escape(buffer.substr(last_index, buffer.length - last_index));
      return result;
    }

    function processBuffer(buffer, mode) {
      if (mode.subLanguage && languages[mode.subLanguage]) {
        var result = highlight(mode.subLanguage, buffer);
        keyword_count += result.keyword_count;
        return result.value;
      } else {
        return processKeywords(buffer, mode);
      }
    }

    function startNewMode(mode, lexem) {
      var markup = mode.className?'<span class="' + mode.className + '">':'';
      if (mode.returnBegin) {
        result += markup;
        mode.buffer = '';
      } else if (mode.excludeBegin) {
        result += escape(lexem) + markup;
        mode.buffer = '';
      } else {
        result += markup;
        mode.buffer = lexem;
      }
      modes.push(mode);
      relevance += mode.relevance;
    }

    function processModeInfo(buffer, lexem, end) {
      var current_mode = modes[modes.length - 1];
      if (end) {
        result += processBuffer(current_mode.buffer + buffer, current_mode);
        return false;
      }

      var new_mode = subMode(lexem, current_mode);
      if (new_mode) {
        result += processBuffer(current_mode.buffer + buffer, current_mode);
        startNewMode(new_mode, lexem);
        return new_mode.returnBegin;
      }

      var end_level = endOfMode(modes.length - 1, lexem);
      if (end_level) {
        var markup = current_mode.className?'</span>':'';
        if (current_mode.returnEnd) {
          result += processBuffer(current_mode.buffer + buffer, current_mode) + markup;
        } else if (current_mode.excludeEnd) {
          result += processBuffer(current_mode.buffer + buffer, current_mode) + markup + escape(lexem);
        } else {
          result += processBuffer(current_mode.buffer + buffer + lexem, current_mode) + markup;
        }
        while (end_level > 1) {
          markup = modes[modes.length - 2].className?'</span>':'';
          result += markup;
          end_level--;
          modes.length--;
        }
        var last_ended_mode = modes[modes.length - 1];
        modes.length--;
        modes[modes.length - 1].buffer = '';
        if (last_ended_mode.starts) {
          startNewMode(last_ended_mode.starts, '');
        }
        return current_mode.returnEnd;
      }

      if (isIllegal(lexem, current_mode))
        throw 'Illegal';
    }

    var language = languages[language_name];
    var modes = [language.defaultMode];
    var relevance = 0;
    var keyword_count = 0;
    var result = '';
    try {
      var index = 0;
      language.defaultMode.buffer = '';
      do {
        var mode_info = eatModeChunk(value, index);
        var return_lexem = processModeInfo(mode_info[0], mode_info[1], mode_info[2]);
        index += mode_info[0].length;
        if (!return_lexem) {
          index += mode_info[1].length;
        }
      } while (!mode_info[2]);
      if(modes.length > 1)
        throw 'Illegal';
      return {
        relevance: relevance,
        keyword_count: keyword_count,
        value: result
      }
    } catch (e) {
      if (e == 'Illegal') {
        return {
          relevance: 0,
          keyword_count: 0,
          value: escape(value)
        }
      } else {
        throw e;
      }
    }
  }

  /*
  Highlighting with language detection. Accepts a string with the code to
  highlight. Returns an object with the following properties:

  - language (detected language)
  - relevance (int)
  - keyword_count (int)
  - value (an HTML string with highlighting markup)
  - second_best (object with the same structure for second-best heuristically
    detected language, may be absent)

  */
  function highlightAuto(text) {
    var result = {
      keyword_count: 0,
      relevance: 0,
      value: escape(text)
    };
    var second_best = result;
    for (var key in languages) {
      if (!languages.hasOwnProperty(key))
        continue;
      var current = highlight(key, text);
      current.language = key;
      if (current.keyword_count + current.relevance > second_best.keyword_count + second_best.relevance) {
        second_best = current;
      }
      if (current.keyword_count + current.relevance > result.keyword_count + result.relevance) {
        second_best = result;
        result = current;
      }
    }
    if (second_best.language) {
      result.second_best = second_best;
    }
    return result;
  }

  /*
  Post-processing of the highlighted markup:

  - replace TABs with something more useful
  - replace real line-breaks with '<br>' for non-pre containers

  */
  function fixMarkup(value, tabReplace, useBR) {
    if (tabReplace) {
      value = value.replace(/^((<[^>]+>|\t)+)/gm, function(match, p1, offset, s) {
        return p1.replace(/\t/g, tabReplace);
      })
    }
    if (useBR) {
      value = value.replace(/\n/g, '<br>');
    }
    return value;
  }

  /*
  Applies highlighting to a DOM node containing code. Accepts a DOM node and
  two optional parameters for fixMarkup.
  */
  function highlightBlock(block, tabReplace, useBR) {
    var text = blockText(block, useBR);
    var language = blockLanguage(block);
    if (language == 'no-highlight')
        return;
    if (language) {
      var result = highlight(language, text);
    } else {
      var result = highlightAuto(text);
      language = result.language;
    }
    var original = nodeStream(block);
    if (original.length) {
      var pre = document.createElement('pre');
      pre.innerHTML = result.value;
      result.value = mergeStreams(original, nodeStream(pre), text);
    }
    result.value = fixMarkup(result.value, tabReplace, useBR);

    var class_name = block.className;
    if (!class_name.match('(\\s|^)(language-)?' + language + '(\\s|$)')) {
      class_name = class_name ? (class_name + ' ' + language) : language;
    }
    if (/MSIE [678]/.test(navigator.userAgent) && block.tagName == 'CODE' && block.parentNode.tagName == 'PRE') {
      // This is for backwards compatibility only. IE needs this strange
      // hack becasue it cannot just cleanly replace <code> block contents.
      var pre = block.parentNode;
      var container = document.createElement('div');
      container.innerHTML = '<pre><code>' + result.value + '</code></pre>';
      block = container.firstChild.firstChild;
      container.firstChild.className = pre.className;
      pre.parentNode.replaceChild(container.firstChild, pre);
    } else {
      block.innerHTML = result.value;
    }
    block.className = class_name;
    block.result = {
      language: language,
      kw: result.keyword_count,
      re: result.relevance
    };
    if (result.second_best) {
      block.second_best = {
        language: result.second_best.language,
        kw: result.second_best.keyword_count,
        re: result.second_best.relevance
      };
    }
  }

  /*
  Applies highlighting to all <pre><code>..</code></pre> blocks on a page.
  */
  function initHighlighting() {
    if (initHighlighting.called)
      return;
    initHighlighting.called = true;
    var pres = document.getElementsByTagName('pre');
    for (var i = 0; i < pres.length; i++) {
      var code = findCode(pres[i]);
      if (code)
        highlightBlock(code, hljs.tabReplace);
    }
  }

  /*
  Attaches highlighting to the page load event.
  */
  function initHighlightingOnLoad() {
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', initHighlighting, false);
      window.addEventListener('load', initHighlighting, false);
    } else if (window.attachEvent)
      window.attachEvent('onload', initHighlighting);
    else
      window.onload = initHighlighting;
  }

  var languages = {}; // a shortcut to avoid writing "this." everywhere

  /* Interface definition */

  this.LANGUAGES = languages;
  this.highlight = highlight;
  this.highlightAuto = highlightAuto;
  this.fixMarkup = fixMarkup;
  this.highlightBlock = highlightBlock;
  this.initHighlighting = initHighlighting;
  this.initHighlightingOnLoad = initHighlightingOnLoad;

  // Common regexps
  this.IDENT_RE = '[a-zA-Z][a-zA-Z0-9_]*';
  this.UNDERSCORE_IDENT_RE = '[a-zA-Z_][a-zA-Z0-9_]*';
  this.NUMBER_RE = '\\b\\d+(\\.\\d+)?';
  this.C_NUMBER_RE = '\\b(0x[A-Za-z0-9]+|\\d+(\\.\\d+)?)';
  this.RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';

  // Common modes
  this.BACKSLASH_ESCAPE = {
    begin: '\\\\.', relevance: 0
  };
  this.APOS_STRING_MODE = {
    className: 'string',
    begin: '\'', end: '\'',
    illegal: '\\n',
    contains: [this.BACKSLASH_ESCAPE],
    relevance: 0
  };
  this.QUOTE_STRING_MODE = {
    className: 'string',
    begin: '"', end: '"',
    illegal: '\\n',
    contains: [this.BACKSLASH_ESCAPE],
    relevance: 0
  };
  this.C_LINE_COMMENT_MODE = {
    className: 'comment',
    begin: '//', end: '$'
  };
  this.C_BLOCK_COMMENT_MODE = {
    className: 'comment',
    begin: '/\\*', end: '\\*/'
  };
  this.HASH_COMMENT_MODE = {
    className: 'comment',
    begin: '#', end: '$'
  };
  this.NUMBER_MODE = {
    className: 'number',
    begin: this.NUMBER_RE,
    relevance: 0
  };
  this.C_NUMBER_MODE = {
    className: 'number',
    begin: this.C_NUMBER_RE,
    relevance: 0
  };

  // Utility functions
  this.inherit = function(parent, obj) {
    var result = {}
    for (var key in parent)
      result[key] = parent[key];
    if (obj)
      for (var key in obj)
        result[key] = obj[key];
    return result;
  }
}();
/*
Language: HTML, XML
*/

hljs.LANGUAGES.xml = function(){
  var XML_IDENT_RE = '[A-Za-z0-9\\._:-]+';
  var TAG_INTERNALS = {
    endsWithParent: true,
    contains: [
      {
        className: 'attribute',
        begin: XML_IDENT_RE,
        relevance: 0
      },
      {
        begin: '="', returnBegin: true, end: '"',
        contains: [{
            className: 'value',
            begin: '"', endsWithParent: true
        }]
      },
      {
        begin: '=\'', returnBegin: true, end: '\'',
        contains: [{
          className: 'value',
          begin: '\'', endsWithParent: true
        }]
      },
      {
        begin: '=',
        contains: [{
          className: 'value',
          begin: '[^\\s/>]+'
        }]
      }
    ]
  };
  return {
    case_insensitive: true,
    defaultMode: {
      contains: [
        {
          className: 'pi',
          begin: '<\\?', end: '\\?>',
          relevance: 10
        },
        {
          className: 'doctype',
          begin: '<!DOCTYPE', end: '>',
          relevance: 10,
          contains: [{begin: '\\[', end: '\\]'}]
        },
        {
          className: 'comment',
          begin: '<!--', end: '-->',
          relevance: 10
        },
        {
          className: 'cdata',
          begin: '<\\!\\[CDATA\\[', end: '\\]\\]>',
          relevance: 10
        },
        {
          className: 'tag',
          begin: '<style', end: '>',
          keywords: {'title': {'style': 1}},
          contains: [TAG_INTERNALS],
          starts: {
            className: 'css',
            end: '</style>', returnEnd: true,
            subLanguage: 'css'
          }
        },
        {
          className: 'tag',
          begin: '<script', end: '>',
          keywords: {'title': {'script': 1}},
          contains: [TAG_INTERNALS],
          starts: {
            className: 'javascript',
            end: '</script>', returnEnd: true,
            subLanguage: 'javascript'
          }
        },
        {
          className: 'vbscript',
          begin: '<%', end: '%>',
          subLanguage: 'vbscript'
        },
        {
          className: 'tag',
          begin: '</?', end: '/?>',
          contains: [
            {
              className: 'title', begin: '[^ />]+'
            },
            TAG_INTERNALS
          ]
        }
      ]
    }
  };
}();
/*
Language: Apache
Author: Ruslan Keba <rukeba@gmail.com>
Website: http://rukeba.com/
Description: language definition for Apache configuration files (httpd.conf & .htaccess)
Version: 1.1
Date: 2008-12-27
*/

hljs.LANGUAGES.apache = function(){
  var NUMBER = {className: 'number', begin: '[\\$%]\\d+'};
  var CBRACKET = {
    className: 'cbracket',
    begin: '[\\$%]\\{', end: '\\}'
  };
  CBRACKET.contains = [CBRACKET, NUMBER];
  return {
    case_insensitive: true,
    defaultMode: {
      keywords: {
        'keyword': {
          'acceptfilter': 1,
          'acceptmutex': 1,
          'acceptpathinfo': 1,
          'accessfilename': 1,
          'action': 1,
          'addalt': 1,
          'addaltbyencoding': 1,
          'addaltbytype': 1,
          'addcharset': 1,
          'adddefaultcharset': 1,
          'adddescription': 1,
          'addencoding': 1,
          'addhandler': 1,
          'addicon': 1,
          'addiconbyencoding': 1,
          'addiconbytype': 1,
          'addinputfilter': 1,
          'addlanguage': 1,
          'addmoduleinfo': 1,
          'addoutputfilter': 1,
          'addoutputfilterbytype': 1,
          'addtype': 1,
          'alias': 1,
          'aliasmatch': 1,
          'allow': 1,
          'allowconnect': 1,
          'allowencodedslashes': 1,
          'allowoverride': 1,
          'anonymous': 1,
          'anonymous_logemail': 1,
          'anonymous_mustgiveemail': 1,
          'anonymous_nouserid': 1,
          'anonymous_verifyemail': 1,
          'authbasicauthoritative': 1,
          'authbasicprovider': 1,
          'authdbduserpwquery': 1,
          'authdbduserrealmquery': 1,
          'authdbmgroupfile': 1,
          'authdbmtype': 1,
          'authdbmuserfile': 1,
          'authdefaultauthoritative': 1,
          'authdigestalgorithm': 1,
          'authdigestdomain': 1,
          'authdigestnccheck': 1,
          'authdigestnonceformat': 1,
          'authdigestnoncelifetime': 1,
          'authdigestprovider': 1,
          'authdigestqop': 1,
          'authdigestshmemsize': 1,
          'authgroupfile': 1,
          'authldapbinddn': 1,
          'authldapbindpassword': 1,
          'authldapcharsetconfig': 1,
          'authldapcomparednonserver': 1,
          'authldapdereferencealiases': 1,
          'authldapgroupattribute': 1,
          'authldapgroupattributeisdn': 1,
          'authldapremoteuserattribute': 1,
          'authldapremoteuserisdn': 1,
          'authldapurl': 1,
          'authname': 1,
          'authnprovideralias': 1,
          'authtype': 1,
          'authuserfile': 1,
          'authzdbmauthoritative': 1,
          'authzdbmtype': 1,
          'authzdefaultauthoritative': 1,
          'authzgroupfileauthoritative': 1,
          'authzldapauthoritative': 1,
          'authzownerauthoritative': 1,
          'authzuserauthoritative': 1,
          'balancermember': 1,
          'browsermatch': 1,
          'browsermatchnocase': 1,
          'bufferedlogs': 1,
          'cachedefaultexpire': 1,
          'cachedirlength': 1,
          'cachedirlevels': 1,
          'cachedisable': 1,
          'cacheenable': 1,
          'cachefile': 1,
          'cacheignorecachecontrol': 1,
          'cacheignoreheaders': 1,
          'cacheignorenolastmod': 1,
          'cacheignorequerystring': 1,
          'cachelastmodifiedfactor': 1,
          'cachemaxexpire': 1,
          'cachemaxfilesize': 1,
          'cacheminfilesize': 1,
          'cachenegotiateddocs': 1,
          'cacheroot': 1,
          'cachestorenostore': 1,
          'cachestoreprivate': 1,
          'cgimapextension': 1,
          'charsetdefault': 1,
          'charsetoptions': 1,
          'charsetsourceenc': 1,
          'checkcaseonly': 1,
          'checkspelling': 1,
          'chrootdir': 1,
          'contentdigest': 1,
          'cookiedomain': 1,
          'cookieexpires': 1,
          'cookielog': 1,
          'cookiename': 1,
          'cookiestyle': 1,
          'cookietracking': 1,
          'coredumpdirectory': 1,
          'customlog': 1,
          'dav': 1,
          'davdepthinfinity': 1,
          'davgenericlockdb': 1,
          'davlockdb': 1,
          'davmintimeout': 1,
          'dbdexptime': 1,
          'dbdkeep': 1,
          'dbdmax': 1,
          'dbdmin': 1,
          'dbdparams': 1,
          'dbdpersist': 1,
          'dbdpreparesql': 1,
          'dbdriver': 1,
          'defaulticon': 1,
          'defaultlanguage': 1,
          'defaulttype': 1,
          'deflatebuffersize': 1,
          'deflatecompressionlevel': 1,
          'deflatefilternote': 1,
          'deflatememlevel': 1,
          'deflatewindowsize': 1,
          'deny': 1,
          'directoryindex': 1,
          'directorymatch': 1,
          'directoryslash': 1,
          'documentroot': 1,
          'dumpioinput': 1,
          'dumpiologlevel': 1,
          'dumpiooutput': 1,
          'enableexceptionhook': 1,
          'enablemmap': 1,
          'enablesendfile': 1,
          'errordocument': 1,
          'errorlog': 1,
          'example': 1,
          'expiresactive': 1,
          'expiresbytype': 1,
          'expiresdefault': 1,
          'extendedstatus': 1,
          'extfilterdefine': 1,
          'extfilteroptions': 1,
          'fileetag': 1,
          'filterchain': 1,
          'filterdeclare': 1,
          'filterprotocol': 1,
          'filterprovider': 1,
          'filtertrace': 1,
          'forcelanguagepriority': 1,
          'forcetype': 1,
          'forensiclog': 1,
          'gracefulshutdowntimeout': 1,
          'group': 1,
          'header': 1,
          'headername': 1,
          'hostnamelookups': 1,
          'identitycheck': 1,
          'identitychecktimeout': 1,
          'imapbase': 1,
          'imapdefault': 1,
          'imapmenu': 1,
          'include': 1,
          'indexheadinsert': 1,
          'indexignore': 1,
          'indexoptions': 1,
          'indexorderdefault': 1,
          'indexstylesheet': 1,
          'isapiappendlogtoerrors': 1,
          'isapiappendlogtoquery': 1,
          'isapicachefile': 1,
          'isapifakeasync': 1,
          'isapilognotsupported': 1,
          'isapireadaheadbuffer': 1,
          'keepalive': 1,
          'keepalivetimeout': 1,
          'languagepriority': 1,
          'ldapcacheentries': 1,
          'ldapcachettl': 1,
          'ldapconnectiontimeout': 1,
          'ldapopcacheentries': 1,
          'ldapopcachettl': 1,
          'ldapsharedcachefile': 1,
          'ldapsharedcachesize': 1,
          'ldaptrustedclientcert': 1,
          'ldaptrustedglobalcert': 1,
          'ldaptrustedmode': 1,
          'ldapverifyservercert': 1,
          'limitinternalrecursion': 1,
          'limitrequestbody': 1,
          'limitrequestfields': 1,
          'limitrequestfieldsize': 1,
          'limitrequestline': 1,
          'limitxmlrequestbody': 1,
          'listen': 1,
          'listenbacklog': 1,
          'loadfile': 1,
          'loadmodule': 1,
          'lockfile': 1,
          'logformat': 1,
          'loglevel': 1,
          'maxclients': 1,
          'maxkeepaliverequests': 1,
          'maxmemfree': 1,
          'maxrequestsperchild': 1,
          'maxrequestsperthread': 1,
          'maxspareservers': 1,
          'maxsparethreads': 1,
          'maxthreads': 1,
          'mcachemaxobjectcount': 1,
          'mcachemaxobjectsize': 1,
          'mcachemaxstreamingbuffer': 1,
          'mcacheminobjectsize': 1,
          'mcacheremovalalgorithm': 1,
          'mcachesize': 1,
          'metadir': 1,
          'metafiles': 1,
          'metasuffix': 1,
          'mimemagicfile': 1,
          'minspareservers': 1,
          'minsparethreads': 1,
          'mmapfile': 1,
          'mod_gzip_on': 1,
          'mod_gzip_add_header_count': 1,
          'mod_gzip_keep_workfiles': 1,
          'mod_gzip_dechunk': 1,
          'mod_gzip_min_http': 1,
          'mod_gzip_minimum_file_size': 1,
          'mod_gzip_maximum_file_size': 1,
          'mod_gzip_maximum_inmem_size': 1,
          'mod_gzip_temp_dir': 1,
          'mod_gzip_item_include': 1,
          'mod_gzip_item_exclude': 1,
          'mod_gzip_command_version': 1,
          'mod_gzip_can_negotiate': 1,
          'mod_gzip_handle_methods': 1,
          'mod_gzip_static_suffix': 1,
          'mod_gzip_send_vary': 1,
          'mod_gzip_update_static': 1,
          'modmimeusepathinfo': 1,
          'multiviewsmatch': 1,
          'namevirtualhost': 1,
          'noproxy': 1,
          'nwssltrustedcerts': 1,
          'nwsslupgradeable': 1,
          'options': 1,
          'order': 1,
          'passenv': 1,
          'pidfile': 1,
          'protocolecho': 1,
          'proxybadheader': 1,
          'proxyblock': 1,
          'proxydomain': 1,
          'proxyerroroverride': 1,
          'proxyftpdircharset': 1,
          'proxyiobuffersize': 1,
          'proxymaxforwards': 1,
          'proxypass': 1,
          'proxypassinterpolateenv': 1,
          'proxypassmatch': 1,
          'proxypassreverse': 1,
          'proxypassreversecookiedomain': 1,
          'proxypassreversecookiepath': 1,
          'proxypreservehost': 1,
          'proxyreceivebuffersize': 1,
          'proxyremote': 1,
          'proxyremotematch': 1,
          'proxyrequests': 1,
          'proxyset': 1,
          'proxystatus': 1,
          'proxytimeout': 1,
          'proxyvia': 1,
          'readmename': 1,
          'receivebuffersize': 1,
          'redirect': 1,
          'redirectmatch': 1,
          'redirectpermanent': 1,
          'redirecttemp': 1,
          'removecharset': 1,
          'removeencoding': 1,
          'removehandler': 1,
          'removeinputfilter': 1,
          'removelanguage': 1,
          'removeoutputfilter': 1,
          'removetype': 1,
          'requestheader': 1,
          'require': 2,
          'rewritebase': 1,
          'rewritecond': 10,
          'rewriteengine': 1,
          'rewritelock': 1,
          'rewritelog': 1,
          'rewriteloglevel': 1,
          'rewritemap': 1,
          'rewriteoptions': 1,
          'rewriterule': 10,
          'rlimitcpu': 1,
          'rlimitmem': 1,
          'rlimitnproc': 1,
          'satisfy': 1,
          'scoreboardfile': 1,
          'script': 1,
          'scriptalias': 1,
          'scriptaliasmatch': 1,
          'scriptinterpretersource': 1,
          'scriptlog': 1,
          'scriptlogbuffer': 1,
          'scriptloglength': 1,
          'scriptsock': 1,
          'securelisten': 1,
          'seerequesttail': 1,
          'sendbuffersize': 1,
          'serveradmin': 1,
          'serveralias': 1,
          'serverlimit': 1,
          'servername': 1,
          'serverpath': 1,
          'serverroot': 1,
          'serversignature': 1,
          'servertokens': 1,
          'setenv': 1,
          'setenvif': 1,
          'setenvifnocase': 1,
          'sethandler': 1,
          'setinputfilter': 1,
          'setoutputfilter': 1,
          'ssienableaccess': 1,
          'ssiendtag': 1,
          'ssierrormsg': 1,
          'ssistarttag': 1,
          'ssitimeformat': 1,
          'ssiundefinedecho': 1,
          'sslcacertificatefile': 1,
          'sslcacertificatepath': 1,
          'sslcadnrequestfile': 1,
          'sslcadnrequestpath': 1,
          'sslcarevocationfile': 1,
          'sslcarevocationpath': 1,
          'sslcertificatechainfile': 1,
          'sslcertificatefile': 1,
          'sslcertificatekeyfile': 1,
          'sslciphersuite': 1,
          'sslcryptodevice': 1,
          'sslengine': 1,
          'sslhonorciperorder': 1,
          'sslmutex': 1,
          'ssloptions': 1,
          'sslpassphrasedialog': 1,
          'sslprotocol': 1,
          'sslproxycacertificatefile': 1,
          'sslproxycacertificatepath': 1,
          'sslproxycarevocationfile': 1,
          'sslproxycarevocationpath': 1,
          'sslproxyciphersuite': 1,
          'sslproxyengine': 1,
          'sslproxymachinecertificatefile': 1,
          'sslproxymachinecertificatepath': 1,
          'sslproxyprotocol': 1,
          'sslproxyverify': 1,
          'sslproxyverifydepth': 1,
          'sslrandomseed': 1,
          'sslrequire': 1,
          'sslrequiressl': 1,
          'sslsessioncache': 1,
          'sslsessioncachetimeout': 1,
          'sslusername': 1,
          'sslverifyclient': 1,
          'sslverifydepth': 1,
          'startservers': 1,
          'startthreads': 1,
          'substitute': 1,
          'suexecusergroup': 1,
          'threadlimit': 1,
          'threadsperchild': 1,
          'threadstacksize': 1,
          'timeout': 1,
          'traceenable': 1,
          'transferlog': 1,
          'typesconfig': 1,
          'unsetenv': 1,
          'usecanonicalname': 1,
          'usecanonicalphysicalport': 1,
          'user': 1,
          'userdir': 1,
          'virtualdocumentroot': 1,
          'virtualdocumentrootip': 1,
          'virtualscriptalias': 1,
          'virtualscriptaliasip': 1,
          'win32disableacceptex': 1,
          'xbithack': 1
        },
        'literal': {'on': 1, 'off': 1}
      },
      contains: [
        hljs.HASH_COMMENT_MODE,
        {className: 'sqbracket', begin: '\\s\\[', end: '\\]$'},
        CBRACKET,
        NUMBER,
        {className: 'tag', begin: '</?', end: '>'},
        hljs.QUOTE_STRING_MODE
      ]
    }
  };
}();
/*
Language: Bash
Author: vah <vahtenberg@gmail.com>
*/

hljs.LANGUAGES.bash = function(){
  var BASH_LITERAL = {'true' : 1, 'false' : 1};
  var VAR1 = {
    className: 'variable',
    begin: '\\$([a-zA-Z0-9_]+)\\b'
  };
  var VAR2 = {
    className: 'variable',
    begin: '\\$\\{(([^}])|(\\\\}))+\\}',
    contains: [hljs.C_NUMBER_MODE]
  };
  var STRING = {
    className: 'string',
    begin: '"', end: '"',
    illegal: '\\n',
    contains: [hljs.BACKSLASH_ESCAPE, VAR1, VAR2],
    relevance: 0
  };
  var TEST_CONDITION = {
    className: 'test_condition',
    begin: '', end: '',
    contains: [STRING, VAR1, VAR2, hljs.C_NUMBER_MODE],
    keywords: {
      'literal': BASH_LITERAL
    },
    relevance: 0
  };

  return {
    defaultMode: {
      keywords: {
        'keyword': {'if' : 1, 'then' : 1, 'else' : 1, 'fi' : 1, 'for' : 1, 'break' : 1, 'continue' : 1, 'while' : 1, 'in' : 1, 'do' : 1, 'done' : 1, 'echo' : 1, 'exit' : 1, 'return' : 1, 'set' : 1, 'declare' : 1},
        'literal': BASH_LITERAL
      },
      contains: [
        {
          className: 'shebang',
          begin: '(#!\\/bin\\/bash)|(#!\\/bin\\/sh)',
          relevance: 10
        },
        hljs.HASH_COMMENT_MODE,
        hljs.C_NUMBER_MODE,
        STRING,
        VAR1,
        VAR2,
        hljs.inherit(TEST_CONDITION, {begin: '\\[ ', end: ' \\]', relevance: 0}),
        hljs.inherit(TEST_CONDITION, {begin: '\\[\\[ ', end: ' \\]\\]'})
      ]
    }
  };
}();
/*
Language: CMake
Description: CMake is an open-source cross-platform system for build automation.
Author: Igor Kalnitsky <igor.kalnitsky@gmail.com>
Website: http://kalnitsky.org.ua/
*/

hljs.LANGUAGES.cmake = {
  case_insensitive: true,
  defaultMode: {
    keywords: {
    'add_custom_command': 2, 'add_custom_target': 2, 'add_definitions': 2, 'add_dependencies': 2, 'add_executable': 2, 'add_library': 2, 'add_subdirectory': 2, 'add_executable': 2, 'add_library': 2, 'add_subdirectory': 2, 'add_test': 2, 'aux_source_directory': 2, 'break': 1, 'build_command': 2, 'cmake_minimum_required': 3, 'cmake_policy': 3, 'configure_file': 1, 'create_test_sourcelist': 1, 'define_property': 1, 'else': 1, 'elseif': 1, 'enable_language': 2, 'enable_testing': 2, 'endforeach': 1, 'endfunction': 1, 'endif': 1, 'endmacro': 1, 'endwhile': 1, 'execute_process': 2, 'export': 1, 'find_file': 1, 'find_library': 2, 'find_package': 2, 'find_path': 1, 'find_program': 1, 'fltk_wrap_ui': 2, 'foreach': 1, 'function': 1, 'get_cmake_property': 3, 'get_directory_property': 1, 'get_filename_component': 1, 'get_property': 1, 'get_source_file_property': 1, 'get_target_property': 1, 'get_test_property': 1, 'if': 1, 'include': 1, 'include_directories': 2, 'include_external_msproject': 1, 'include_regular_expression': 2, 'install': 1, 'link_directories': 1, 'load_cache': 1, 'load_command': 1, 'macro': 1, 'mark_as_advanced': 1, 'message': 1, 'option': 1, 'output_required_files': 1, 'project': 1, 'qt_wrap_cpp': 2, 'qt_wrap_ui': 2, 'remove_definitions': 2, 'return': 1, 'separate_arguments': 1, 'set': 1, 'set_directory_properties': 1, 'set_property': 1, 'set_source_files_properties': 1, 'set_target_properties': 1, 'set_tests_properties': 1, 'site_name': 1, 'source_group': 1, 'string': 1, 'target_link_libraries': 2, 'try_compile': 2, 'try_run': 2, 'unset': 1, 'variable_watch': 2, 'while': 1, 'build_name': 1, 'exec_program': 1, 'export_library_dependencies': 1, 'install_files': 1, 'install_programs': 1, 'install_targets': 1, 'link_libraries': 1, 'make_directory': 1, 'remove': 1, 'subdir_depends': 1, 'subdirs': 1, 'use_mangled_mesa': 1, 'utility_source': 1, 'variable_requires': 1, 'write_file': 1 },

    contains: [
      {
        className: 'envvar',
        begin: '\\${', end: '}'
      },
      hljs.HASH_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE
    ]
  }
};
/*
Language: CoffeeScript
Author: Dmytrii Nagirniak (@dnagir)
*/

hljs.LANGUAGES.coffee = function() {
  var keywords = {
    'keyword': {
      // JS keywords
      'in': 1, 'if': 1, 'for': 1, 'while': 1, 'finally': 1,
      'new': 1, 'do': 1, 'return': 1, 'else': 1, 
      'break': 1, 'catch': 1, 'instanceof': 1, 'throw': 1, 
      'try': 1, 'this': 1, 'switch': 1, 'continue': 1, 'typeof': 1, 
      'delete': 1, 'return': 1, 'debugger': 1,
      'class': 1, 'extends': 1, 'super': 1,
      // Coffee
      'then': 1, 'unless': 1, 'until': 1, 'loop': 2, 'of': 2, 'by': 1, 'when': 2,
      'and': 1, 'or': 1, 'is': 1, 'isnt': 2, 'not': 1
    },
    'literal': {
      // JS
      'true': 1, 'false': 1, 'null': 1, 'undefined': 1,
      // Coffee
      'yes': 1, 'no': 1, 'on': 1, 'off': 1
    },
    'reserved': {
      'case': 1, 'default': 1, 'function': 1, 'var': 1, 'void': 1, 'with': 1,
      'const': 1, 'let': 1, 'enum': 1, 'export': 1, 'import': 1, 'native': 1,
      '__hasProp': 1 , '__extends': 1 , '__slice': 1 , '__bind': 1 , '__indexOf': 1
    }
  };

  var String1 = {
    className: 'string',
    begin: "'", end: "'",
    relevance: 0
  };


  var SUBST = {
    className: 'subst',
    begin: '#\\{', end: '}',
    keywords: keywords,
    contains: [hljs.C_NUMBER_MODE ]
  };

  var String2 = {
    className: 'string',
    begin: '"', end: '"',
    relevance: 0,
    contains: [hljs.BACKSLASH_ESCAPE, SUBST]
  };

  var Arrow = {
    className: 'function',
    begin: '(->|=>)', end: hljs.IMMEIDATE_RE,
    relevance: 10
  };
  var FormalArgs = {
    className: 'params',
    begin: "\\(",
    end: '\\)',
    // TODO: Do not use recursive keywords and contains here as it should be on formal args ONLY
    keywords: keywords,
    contains: [hljs.C_NUMBER_MODE, String1, String2]
  };
  var CommentSharpMultiline = {
    className: 'comment',
    begin: '###',
    end: '###',
    relevance: 5
  };
  
  return {
    defaultMode: {
      keywords: keywords,
      contains: [
        CommentSharpMultiline,
        hljs.C_NUMBER_MODE,
        hljs.HASH_COMMENT_MODE,
        String1, String2,
        FormalArgs,
        Arrow
      ]
    }
  };
}();/*
Language: C++
*/

hljs.LANGUAGES.cpp = function(){
  var CPP_KEYWORDS = {
    'keyword': {
      'false': 1, 'int': 1, 'float': 1, 'while': 1, 'private': 1, 'char': 1,
      'catch': 1, 'export': 1, 'virtual': 1, 'operator': 2, 'sizeof': 2,
      'dynamic_cast': 2, 'typedef': 2, 'const_cast': 2, 'const': 1,
      'struct': 1, 'for': 1, 'static_cast': 2, 'union': 1, 'namespace': 1,
      'unsigned': 1, 'long': 1, 'throw': 1, 'volatile': 2, 'static': 1,
      'protected': 1, 'bool': 1, 'template': 1, 'mutable': 1, 'if': 1,
      'public': 1, 'friend': 2, 'do': 1, 'return': 1, 'goto': 1, 'auto': 1,
      'void': 2, 'enum': 1, 'else': 1, 'break': 1, 'new': 1, 'extern': 1,
      'using': 1, 'true': 1, 'class': 1, 'asm': 1, 'case': 1, 'typeid': 1,
      'short': 1, 'reinterpret_cast': 2, 'default': 1, 'double': 1,
      'register': 1, 'explicit': 1, 'signed': 1, 'typename': 1, 'try': 1,
      'this': 1, 'switch': 1, 'continue': 1, 'wchar_t': 1, 'inline': 1,
      'delete': 1, 'alignof': 1, 'char16_t': 1, 'char32_t': 1, 'constexpr': 1,
      'decltype': 1, 'noexcept': 1, 'nullptr': 1, 'static_assert': 1,
      'thread_local': 1
    },
    'built_in': {
      'std': 1, 'string': 1, 'cin': 1, 'cout': 1, 'cerr': 1, 'clog': 1,
      'stringstream': 1, 'istringstream': 1, 'ostringstream': 1, 'auto_ptr': 1,
      'deque': 1, 'list': 1, 'queue': 1, 'stack': 1, 'vector': 1, 'map': 1,
      'set': 1, 'bitset': 1, 'multiset': 1, 'multimap': 1, 'unordered_set': 1,
      'unordered_map': 1, 'unordered_multiset': 1, 'unordered_multimap': 1,
      'array': 1, 'shared_ptr': 1
    }
  };
  var STL_CONTAINER = {
    className: 'stl_container',
    begin: '\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<', end: '>',
    keywords: CPP_KEYWORDS,
    relevance: 10
  };
  STL_CONTAINER.contains = [STL_CONTAINER];
  return {
    defaultMode: {
      keywords: CPP_KEYWORDS,
      illegal: '</',
      contains: [
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        hljs.QUOTE_STRING_MODE,
        {
          className: 'string',
          begin: '\'', end: '[^\\\\]\'',
          illegal: '[^\\\\][^\']'
        },
        hljs.C_NUMBER_MODE,
        {
          className: 'preprocessor',
          begin: '#', end: '$'
        },
        STL_CONTAINER
      ]
    }
  };
}();
/*
Language: C#
Author: Jason Diamond <jason@diamond.name>
*/

hljs.LANGUAGES.cs  = {
  defaultMode: {
    keywords: {
        // Normal keywords.
        'abstract': 1, 'as': 1, 'base': 1, 'bool': 1, 'break': 1, 'byte': 1, 'case': 1, 'catch': 1, 'char': 1, 'checked': 1, 'class': 1, 'const': 1, 'continue': 1, 'decimal': 1, 'default': 1, 'delegate': 1, 'do': 1, 'do': 1, 'double': 1, 'else': 1, 'enum': 1, 'event': 1, 'explicit': 1, 'extern': 1, 'false': 1, 'finally': 1, 'fixed': 1, 'float': 1, 'for': 1, 'foreach': 1, 'goto': 1, 'if': 1, 'implicit': 1, 'in': 1, 'int': 1, 'interface': 1, 'internal': 1, 'is': 1, 'lock': 1, 'long': 1, 'namespace': 1, 'new': 1, 'null': 1, 'object': 1, 'operator': 1, 'out': 1, 'override': 1, 'params': 1, 'private': 1, 'protected': 1, 'public': 1, 'readonly': 1, 'ref': 1, 'return': 1, 'sbyte': 1, 'sealed': 1, 'short': 1, 'sizeof': 1, 'stackalloc': 1, 'static': 1, 'string': 1, 'struct': 1, 'switch': 1, 'this': 1, 'throw': 1, 'true': 1, 'try': 1, 'typeof': 1, 'uint': 1, 'ulong': 1, 'unchecked': 1, 'unsafe': 1, 'ushort': 1, 'using': 1, 'virtual': 1, 'volatile': 1, 'void': 1, 'while': 1,
        // Contextual keywords.
        'ascending': 1, 'descending': 1, 'from': 1, 'get': 1, 'group': 1, 'into': 1, 'join': 1, 'let': 1, 'orderby': 1, 'partial': 1, 'select': 1, 'set': 1, 'value': 1, 'var': 1, 'where': 1, 'yield': 1
    },
    contains: [
      {
        className: 'comment',
        begin: '///', end: '$', returnBegin: true,
        contains: [
          {
            className: 'xmlDocTag',
            begin: '///|<!--|-->'
          },
          {
            className: 'xmlDocTag',
            begin: '</?', end: '>'
          }
        ]
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'string',
        begin: '@"', end: '"',
        contains: [{begin: '""'}]
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE
    ]
  }
};
/*
Language: CSS
*/

hljs.LANGUAGES.css = function() {
  var FUNCTION = {
    className: 'function',
    begin: hljs.IDENT_RE + '\\(', end: '\\)',
    contains: [{
        endsWithParent: true, excludeEnd: true,
        contains: [hljs.NUMBER_MODE, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
    }]
  };
  return {
    case_insensitive: true,
    defaultMode: {
      illegal: '[=/|\']',
      contains: [
        hljs.C_BLOCK_COMMENT_MODE,
        {
          className: 'id', begin: '\\#[A-Za-z0-9_-]+'
        },
        {
          className: 'class', begin: '\\.[A-Za-z0-9_-]+',
          relevance: 0
        },
        {
          className: 'attr_selector',
          begin: '\\[', end: '\\]',
          illegal: '$'
        },
        {
          className: 'pseudo',
          begin: ':(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\"\\\']+'
        },
        {
          className: 'at_rule',
          begin: '@(font-face|page)',
          lexems: '[a-z-]+',
          keywords: {'font-face': 1, 'page': 1}
        },
        {
          className: 'at_rule',
          begin: '@', end: '[{;]', // at_rule eating first "{" is a good thing
                                   // because it doesn't let it to be parsed as
                                   // a rule set but instead drops parser into
                                   // the defaultMode which is how it should be.
          excludeEnd: true,
          keywords: {'import': 1, 'page': 1, 'media': 1, 'charset': 1},
          contains: [
            FUNCTION,
            hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE,
            hljs.NUMBER_MODE
          ]
        },
        {
          className: 'tag', begin: hljs.IDENT_RE,
          relevance: 0
        },
        {
          className: 'rules',
          begin: '{', end: '}',
          illegal: '[^\\s]',
          relevance: 0,
          contains: [
            hljs.C_BLOCK_COMMENT_MODE,
            {
              className: 'rule',
              begin: '[^\\s]', returnBegin: true, end: ';', endsWithParent: true,
              contains: [
                {
                  className: 'attribute',
                  begin: '[A-Z\\_\\.\\-]+', end: ':',
                  excludeEnd: true,
                  illegal: '[^\\s]',
                  starts: {
                    className: 'value',
                    endsWithParent: true, excludeEnd: true,
                    contains: [
                      FUNCTION,
                      hljs.NUMBER_MODE,
                      hljs.QUOTE_STRING_MODE,
                      hljs.APOS_STRING_MODE,
                      hljs.C_BLOCK_COMMENT_MODE,
                      {
                        className: 'hexcolor', begin: '\\#[0-9A-F]+'
                      },
                      {
                        className: 'important', begin: '!important'
                      }
                    ]
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  };
}();
/*
Language: Diff
Description: Unified and context diff
Author: Vasily Polovnyov <vast@whiteants.net>
*/

hljs.LANGUAGES.diff = {
  case_insensitive: true,
  defaultMode: {
    contains: [
      {
        className: 'chunk',
        begin: '^\\@\\@ +\\-\\d+,\\d+ +\\+\\d+,\\d+ +\\@\\@$',
        relevance: 10
      },
      {
        className: 'chunk',
        begin: '^\\*\\*\\* +\\d+,\\d+ +\\*\\*\\*\\*$',
        relevance: 10
      },
      {
        className: 'chunk',
        begin: '^\\-\\-\\- +\\d+,\\d+ +\\-\\-\\-\\-$',
        relevance: 10
      },
      {
        className: 'header',
        begin: 'Index: ', end: '$'
      },
      {
        className: 'header',
        begin: '=====', end: '=====$'
      },
      {
        className: 'header',
        begin: '^\\-\\-\\-', end: '$'
      },
      {
        className: 'header',
        begin: '^\\*{3} ', end: '$'
      },
      {
        className: 'header',
        begin: '^\\+\\+\\+', end: '$'
      },
      {
        className: 'header',
        begin: '\\*{5}', end: '\\*{5}$'
      },
      {
        className: 'addition',
        begin: '^\\+', end: '$'
      },
      {
        className: 'deletion',
        begin: '^\\-', end: '$'
      },
      {
        className: 'change',
        begin: '^\\!', end: '$'
      }
    ]
  }
};
/*
Language: Django
Requires: xml.js
*/

hljs.LANGUAGES.django = function() {

  function allowsDjangoSyntax(mode, parent) {
    return (
      parent == undefined || // defaultMode
      (!mode.className && parent.className == 'tag') || // tag_internal
      mode.className == 'value' // value
    );
  }

  function copy(mode, parent) {
    var result = {};
    for (var key in mode) {
      if (key != 'contains') {
        result[key] = mode[key];
      };
      var contains = [];
      for (var i = 0; mode.contains && i < mode.contains.length; i++) {
        contains.push(copy(mode.contains[i], mode));
      }
      if (allowsDjangoSyntax(mode, parent)) {
        contains = DJANGO_CONTAINS.concat(contains);
      }
      if (contains.length) {
        result.contains = contains;
      }
    }
    return result;
  }

  var FILTER = {
    className: 'filter',
    begin: '\\|[A-Za-z]+\\:?', excludeEnd: true,
    keywords: {'truncatewords': 1, 'removetags': 1, 'linebreaksbr': 1, 'yesno': 1, 'get_digit': 1, 'timesince': 1, 'random': 1, 'striptags': 1, 'filesizeformat': 1, 'escape': 1, 'linebreaks': 1, 'length_is': 1, 'ljust': 1, 'rjust': 1, 'cut': 1, 'urlize': 1, 'fix_ampersands': 1, 'title': 1, 'floatformat': 1, 'capfirst': 1, 'pprint': 1, 'divisibleby': 1, 'add': 1, 'make_list': 1, 'unordered_list': 1, 'urlencode': 1, 'timeuntil': 1, 'urlizetrunc': 1, 'wordcount': 1, 'stringformat': 1, 'linenumbers': 1, 'slice': 1, 'date': 1, 'dictsort': 1, 'dictsortreversed': 1, 'default_if_none': 1, 'pluralize': 1, 'lower': 1, 'join': 1, 'center': 1, 'default': 1, 'truncatewords_html': 1, 'upper': 1, 'length': 1, 'phone2numeric': 1, 'wordwrap': 1, 'time': 1, 'addslashes': 1, 'slugify': 1, 'first': 1},
    contains: [
      {className: 'argument', begin: '"', end: '"'}
    ]
  };

  var DJANGO_CONTAINS = [
    {
      className: 'template_comment',
      begin: '{%\\s*comment\\s*%}', end: '{%\\s*endcomment\\s*%}'
    },
    {
      className: 'template_comment',
      begin: '{#', end: '#}'
    },
    {
      className: 'template_tag',
      begin: '{%', end: '%}',
      keywords: {'comment': 1, 'endcomment': 1, 'load': 1, 'templatetag': 1, 'ifchanged': 1, 'endifchanged': 1, 'if': 1, 'endif': 1, 'firstof': 1, 'for': 1, 'endfor': 1, 'in': 1, 'ifnotequal': 1, 'endifnotequal': 1, 'widthratio': 1, 'extends': 1, 'include': 1, 'spaceless': 1, 'endspaceless': 1, 'regroup': 1, 'by': 1, 'as': 1, 'ifequal': 1, 'endifequal': 1, 'ssi': 1, 'now': 1, 'with': 1, 'cycle': 1, 'url': 1, 'filter': 1, 'endfilter': 1, 'debug': 1, 'block': 1, 'endblock': 1, 'else': 1},
      contains: [FILTER]
    },
    {
      className: 'variable',
      begin: '{{', end: '}}',
      contains: [FILTER]
    }
  ];

  return {
    case_insensitive: true,
    defaultMode: copy(hljs.LANGUAGES.xml.defaultMode)
  };

}();
/*
Language: DOS .bat
Author: Alexander Makarov (http://rmcreative.ru/)
*/

hljs.LANGUAGES.dos = {
  case_insensitive: true,
  defaultMode: {
    keywords: {
      'flow': {'if':1, 'else':1, 'goto':1, 'for':1, 'in':1, 'do':1, 'call':1, 'exit':1, 'not':1, 'exist':1, 'errorlevel':1, 'defined':1, 'equ':1, 'neq':1, 'lss':1, 'leq':1, 'gtr':1, 'geq':1},
      'keyword':{'shift':1, 'cd':1, 'dir':1, 'echo':1, 'setlocal':1, 'endlocal':1, 'set':1, 'pause':1, 'copy':1},
      'stream':{'prn':1, 'nul':1, 'lpt3':1, 'lpt2':1, 'lpt1':1, 'con':1, 'com4':1, 'com3':1, 'com2':1, 'com1':1, 'aux':1},
      'winutils':{'ping':1, 'net':1, 'ipconfig':1, 'taskkill':1, 'xcopy':1, 'ren':1, 'del':1}
    },
    contains: [
      {
        className: 'envvar', begin: '%[^ ]+?%'
      },
      {
        className: 'number', begin: '\\b\\d+',
        relevance: 0
      },
      {
        className: 'comment',
        begin: '@?rem', end: '$'
      }
    ]
  }
};
/*
 Language: Erlang REPL
 Author: Sergey Ignatov <sergey@ignatov.spb.su>
 */

hljs.LANGUAGES.erlang_repl = {
  defaultMode: {
    keywords: {
      'special_functions':{
        'spawn':10,
        'spawn_link':10,
        'self':2
      },
      'reserved':{
        'after':1,
        'and':1,
        'andalso':5,
        'band':1,
        'begin':1,
        'bnot':1,
        'bor':1,
        'bsl':1,
        'bsr':1,
        'bxor':1,
        'case':1,
        'catch':0,
        'cond':1,
        'div':1,
        'end':1,
        'fun':0,
        'if':0,
        'let':1,
        'not':0,
        'of':1,
        'or':1,
        'orelse':5,
        'query':1,
        'receive':0,
        'rem':1,
        'try':0,
        'when':1,
        'xor':1
      }
    },
    contains: [
      {
        className: 'input_number', begin: '^[0-9]+> ',
        relevance: 10
      },
      {
        className: 'comment',
        begin: '%', end: '$'
      },
      hljs.NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'constant', begin: '\\?(::)?([A-Z]\\w*(::)?)+'
      },
      {
        className: 'arrow', begin: '->'
      },
      {
        className: 'ok', begin: 'ok'
      },
      {
        className: 'exclamation_mark', begin: '!'
      },
      {
        className: 'function_or_atom',
        begin: '(\\b[a-z\'][a-zA-Z0-9_\']*:[a-z\'][a-zA-Z0-9_\']*)|(\\b[a-z\'][a-zA-Z0-9_\']*)',
        relevance: 0
      },
      {
        className: 'variable',
        begin: '[A-Z][a-zA-Z0-9_\']*',
        relevance: 0
      }
    ]
  }
};
/*
Language: Erlang
Description: Erlang is a general-purpose functional language, with strict evaluation, single assignment, and dynamic typing.
Author: Nikolay Zakharov <nikolay.desh@gmail.com>, Dmitry Kovega <arhibot@gmail.com>
*/

hljs.LANGUAGES.erlang = function(){
  var BASIC_ATOM_RE = '[a-z\'][a-zA-Z0-9_\']*';
  var FUNCTION_NAME_RE = '(' + BASIC_ATOM_RE + ':' + BASIC_ATOM_RE + '|' + BASIC_ATOM_RE + ')';
  var ERLANG_RESERVED = {
    'keyword': {
        'after': 1,
        'and': 1,
        'andalso': 10,
        'band': 1,
        'begin': 1,
        'bnot': 1,
        'bor': 1,
        'bsl': 1,
        'bzr': 1,
        'bxor': 1,
        'case': 1,
        'catch': 1,
        'cond': 1,
        'div': 1,
        'end': 1,
        'fun': 1,
        'let': 1,
        'not': 1,
        'of': 1,
        'orelse': 10,
        'query': 1,
        'receive': 1,
        'rem': 1,
        'try': 1,
        'when': 1,
        'xor': 1
    },
    'literal': {'false': 1, 'true': 1}
  };

  var COMMENT = {
    className: 'comment',
    begin: '%', end: '$',
    relevance: 0
  };
  var NAMED_FUN = {
    begin: 'fun\\s+' + BASIC_ATOM_RE + '/\\d+'
  };
  var FUNCTION_CALL = {
    begin: FUNCTION_NAME_RE + '\\(', end: '\\)',
    returnBegin: true,
    relevance: 0,
    contains: [
      {
        className: 'function_name', begin: FUNCTION_NAME_RE,
        relevance: 0
      },
      {
        begin: '\\(', end: '\\)', endsWithParent: true,
        returnEnd: true,
        relevance: 0
        // "contains" defined later
      }
    ]
  };
  var TUPLE = {
    className: 'tuple',
    begin: '{', end: '}',
    relevance: 0
    // "contains" defined later
  };
  var VAR1 = {
    className: 'variable',
    begin: '\\b_([A-Z][A-Za-z0-9_]*)?',
    relevance: 0
  };
  var VAR2 = {
    className: 'variable',
    begin: '[A-Z][a-zA-Z0-9_]*',
    relevance: 0
  };
  var RECORD_ACCESS = {
    begin: '#', end: '}',
    illegal: '.',
    relevance: 0,
    returnBegin: true,
    contains: [
      {
        className: 'record_name',
        begin: '#' + hljs.UNDERSCORE_IDENT_RE,
        relevance: 0
      },
      {
        begin: '{', endsWithParent: true,
        relevance: 0
        // "contains" defined later
      }
    ]
  };

  var BLOCK_STATEMENTS = {
    keywords: ERLANG_RESERVED,
    begin: '(fun|receive|if|try|case)', end: 'end'
  };
  BLOCK_STATEMENTS.contains = [
    COMMENT,
    NAMED_FUN,
    hljs.inherit(hljs.APOS_STRING_MODE, {className: ''}),
    BLOCK_STATEMENTS,
    FUNCTION_CALL,
    hljs.QUOTE_STRING_MODE,
    hljs.C_NUMBER_MODE,
    TUPLE,
    VAR1, VAR2,
    RECORD_ACCESS
  ];

  var BASIC_MODES = [
    COMMENT,
    NAMED_FUN,
    BLOCK_STATEMENTS,
    FUNCTION_CALL,
    hljs.QUOTE_STRING_MODE,
    hljs.C_NUMBER_MODE,
    TUPLE,
    VAR1, VAR2,
    RECORD_ACCESS
  ];
  FUNCTION_CALL.contains[1].contains = BASIC_MODES;
  TUPLE.contains = BASIC_MODES;
  RECORD_ACCESS.contains[1].contains = BASIC_MODES;

  var PARAMS = {
    className: 'params',
    begin: '\\(', end: '\\)',
    endsWithParent: true,
    contains: BASIC_MODES
  };
  return {
    defaultMode: {
      keywords: ERLANG_RESERVED,
      illegal: '(</|\\*=|\\+=|-=|/=|/\\*|\\*/|\\(\\*|\\*\\))',
      contains: [
        {
          className: 'function',
          begin: '^' + BASIC_ATOM_RE + '\\(', end: ';|\\.',
          returnBegin: true,
          contains: [
            PARAMS,
            {
              className: 'title', begin: BASIC_ATOM_RE
            },
            {
              keywords: ERLANG_RESERVED,
              begin: '->', endsWithParent: true,
              contains: BASIC_MODES
            }
          ]
        },
        COMMENT,
        {
          className: 'pp',
          begin: '^-', end: '\\.',
          relevance: 0,
          excludeEnd: true,
          returnBegin: true,
          lexems: '-' + hljs.IDENT_RE,
          keywords: {
            '-module':1,
            '-record':1,
            '-undef':1,
            '-export':1,
            '-ifdef':1,
            '-ifndef':1,
            '-author':1,
            '-copyright':1,
            '-doc':1,
            '-vsn':1,
            '-import': 1,
            '-include': 1,
            '-include_lib': 1,
            '-compile': 1,
            '-define': 1,
            '-else': 1,
            '-endif': 1,
            '-file': 1,
            '-behaviour': 1,
            '-behavior': 1
          },
          contains: [PARAMS]
        },
        hljs.C_NUMBER_MODE,
        hljs.QUOTE_STRING_MODE,
        RECORD_ACCESS,
        VAR1, VAR2,
        TUPLE
      ]
    }
  };
}();
/*
Language: Go
Author: Stephan Kountso aka StepLg <steplg@gmail.com>
Description: Google go language (golang). For info about language see http://golang.org/
*/

hljs.LANGUAGES.go = function(){
  var GO_KEYWORDS = {
    'keyword': {
       'break' : 1, 'default' : 1, 'func' : 1, 'interface' : 1, 'select' : 1,
       'case' : 1, 'map' : 1, 'struct' : 1, 'chan' : 1,
       'else' : 1, 'goto' : 1, 'package' : 1, 'switch' : 1, 'const' : 1,
       'fallthrough' : 1, 'if' : 1, 'range' : 1, 'type' : 1, 'continue' : 1,
       'for' : 1, 'import' : 1, 'return' : 1, 'var' : 1, 'go': 1, 'defer' : 1
    },
    'constant': {
       'true': 1, 'false': 1, 'iota': 1, 'nil': 1
    },
    'typename': {
       'bool': 1, 'byte': 1, 'complex64': 1, 'complex128': 1, 'float32': 1,
       'float64': 1, 'int8': 1, 'int16': 1, 'int32': 1, 'int64': 1, 'string': 1,
       'uint8': 1, 'uint16': 1, 'uint32': 1, 'uint64': 1, 'int': 1, 'uint': 1,
       'uintptr': 1
   },
    'built_in': {
       'append': 1, 'cap': 1, 'close': 1, 'complex': 1, 'copy': 1, 'imag': 1,
       'len': 1, 'make': 1, 'new': 1, 'panic': 1, 'print': 1, 'println': 1,
       'real': 1, 'recover': 1
    }
  };
  return {
    defaultMode: {
      keywords: GO_KEYWORDS,
      illegal: '</',
      contains: [
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        hljs.QUOTE_STRING_MODE,
        {
          className: 'string',
          begin: '\'', end: '[^\\\\]\'',
          relevance: 0
        },
        {
          className: 'string',
          begin: '`', end: '[^\\\\]`'
        },
        {
          className: 'number',
          begin: '[^a-zA-Z_0-9](\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s)(\\+|\\-)?\\d+)?',
          relevance: 0
        },
        hljs.C_NUMBER_MODE
      ]
    }
  };
}();

/*
Language: Haskell
Author: Jeremy Hull <sourdrums@gmail.com>
*/

hljs.LANGUAGES.haskell = function(){
  var LABEL = {
    className: 'label',
    begin: '\\b[A-Z][\\w\']*',
    relevance: 0
  };
  var CONTAINER = {
    className: 'container',
    begin: '\\(', end: '\\)',
    contains: [
      {className: 'label', begin: '\\b[A-Z][\\w\\(\\)\\.\']*'},
      {className: 'title', begin: '[_a-z][\\w\']*'}
    ]
  };

  return {
    defaultMode: {
      keywords: {
        'keyword': {
          'let': 1, 'in': 1, 'if': 1, 'then': 1, 'else': 1, 'case': 1, 'of': 1,
          'where': 1, 'do': 1, 'module': 1, 'import': 1, 'hiding': 1,
          'qualified': 1, 'type': 1, 'data': 1, 'newtype': 1, 'deriving': 1,
          'class': 1, 'instance': 1, 'null': 1, 'not': 1, 'as': 1
        }
      },
      contains: [
        {
          className: 'comment',
          begin: '--', end: '$'
        },
        {
          className: 'comment',
          begin: '{-', end: '-}'
        },
        {
          className: 'string',
          begin: '\\s+\'', end: '\'',
          contains: [hljs.BACKSLASH_ESCAPE],
          relevance: 0
        },
        hljs.QUOTE_STRING_MODE,
        {
          className: 'import',
          begin: '\\bimport', end: '$',
          keywords: {'import': 1, 'qualified': 1, 'as': 1, 'hiding': 1},
          contains: [CONTAINER]
        },
        {
          className: 'module',
          begin: '\\bmodule', end: 'where',
          keywords: {'module': 1, 'where': 1},
          contains: [CONTAINER]
        },
        {
          className: 'class',
          begin: '\\b(class|instance|data|(new)?type)', end: '(where|$)',
          keywords: {'class': 1, 'where': 1, 'instance': 1,'data': 1,'type': 1,'newtype': 1, 'deriving': 1},
          contains: [LABEL]
        },
        hljs.C_NUMBER_MODE,
        {
          className: 'shebang',
          begin: '#!\\/usr\\/bin\\/env\ runhaskell', end: '$'
        },
        LABEL,
        {
          className: 'title', begin: '^[_a-z][\\w\']*'
        }
      ]
    }
  };
}();
/*
Language: Ini
*/

hljs.LANGUAGES.ini = {
  case_insensitive: true,
  defaultMode: {
    illegal: '[^\\s]',
    contains: [
      {
        className: 'comment',
        begin: ';', end: '$'
      },
      {
        className: 'title',
        begin: '^\\[', end: '\\]'
      },
      {
        className: 'setting',
        begin: '^[a-z0-9_\\[\\]]+[ \\t]*=[ \\t]*', end: '$',
        contains: [
          {
            className: 'value',
            endsWithParent: true,
            keywords: {'on': 1, 'off': 1, 'true': 1, 'false': 1, 'yes': 1, 'no': 1},
            contains: [hljs.QUOTE_STRING_MODE, hljs.NUMBER_MODE]
          }
        ]
      }
    ]
  }
};
/*
Language: Java
Author: Vsevolod Solovyov <vsevolod.solovyov@gmail.com>
*/

hljs.LANGUAGES.java  = {
  defaultMode: {
    keywords: {'false': 1, 'synchronized': 1, 'int': 1, 'abstract': 1, 'float': 1, 'private': 1, 'char': 1, 'interface': 1, 'boolean': 1, 'static': 1, 'null': 1, 'if': 1, 'const': 1, 'for': 1, 'true': 1, 'while': 1, 'long': 1, 'throw': 1, 'strictfp': 1, 'finally': 1, 'protected': 1, 'extends': 1, 'import': 1, 'native': 1, 'final': 1, 'implements': 1, 'return': 1, 'void': 1, 'enum': 1, 'else': 1, 'break': 1, 'transient': 1, 'new': 1, 'catch': 1, 'instanceof': 1, 'byte': 1, 'super': 1, 'class': 1, 'volatile': 1, 'case': 1, 'assert': 1, 'short': 1, 'package': 1, 'default': 1, 'double': 1, 'public': 1, 'try': 1, 'this': 1, 'switch': 1, 'continue': 1, 'throws': 1},
    contains: [
      {
        className: 'javadoc',
        begin: '/\\*\\*', end: '\\*/',
        contains: [{
          className: 'javadoctag', begin: '@[A-Za-z]+'
        }],
        relevance: 10
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'class',
        begin: '(class |interface )', end: '{',
        keywords: {'class': 1, 'interface': 1},
        illegal: ':',
        contains: [
          {
            begin: '(implements|extends)',
            keywords: {'extends': 1, 'implements': 1},
            relevance: 10
          },
          {
            className: 'title',
            begin: hljs.UNDERSCORE_IDENT_RE
          }
        ]
      },
      hljs.C_NUMBER_MODE,
      {
        className: 'annotation', begin: '@[A-Za-z]+'
      }
    ]
  }
};
/*
Language: Javascript
*/

hljs.LANGUAGES.javascript = {
  defaultMode: {
    keywords: {
      'keyword': {'in': 1, 'if': 1, 'for': 1, 'while': 1, 'finally': 1, 'var': 1, 'new': 1, 'function': 1, 'do': 1, 'return': 1, 'void': 1, 'else': 1, 'break': 1, 'catch': 1, 'instanceof': 1, 'with': 1, 'throw': 1, 'case': 1, 'default': 1, 'try': 1, 'this': 1, 'switch': 1, 'continue': 1, 'typeof': 1, 'delete': 1},
      'literal': {'true': 1, 'false': 1, 'null': 1}
    },
    contains: [
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      { // regexp container
        begin: '(' + hljs.RE_STARTERS_RE + '|case|return|throw)\\s*',
        keywords: {'return': 1, 'throw': 1, 'case': 1},
        contains: [
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          {
            className: 'regexp',
            begin: '/', end: '/[gim]*',
            contains: [{begin: '\\\\/'}]
          }
        ],
        relevance: 0
      },
      {
        className: 'function',
        begin: '\\bfunction\\b', end: '{',
        keywords: {'function': 1},
        contains: [
          {
            className: 'title', begin: '[A-Za-z$_][0-9A-Za-z$_]*'
          },
          {
            className: 'params',
            begin: '\\(', end: '\\)',
            contains: [
              hljs.APOS_STRING_MODE,
              hljs.QUOTE_STRING_MODE,
              hljs.C_LINE_COMMENT_MODE,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          }
        ]
      }
    ]
  }
};
/*
Language: Lisp
Description: Generic lisp syntax
Author: Vasily Polovnyov <vast@whiteants.net>
*/

hljs.LANGUAGES.lisp = function(){
  var LISP_IDENT_RE = '[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#]*';
  var LISP_SIMPLE_NUMBER_RE = '(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s)(\\+|\\-)?\\d+)?';
  var LITERAL = {
    className: 'literal',
    begin: '\\b(t{1}|nil)\\b'
  };
  var NUMBER1 = {
    className: 'number', begin: LISP_SIMPLE_NUMBER_RE
  };
  var NUMBER2 = {
    className: 'number', begin: '#b[0-1]+(/[0-1]+)?'
  };
  var NUMBER3 = {
    className: 'number', begin: '#o[0-7]+(/[0-7]+)?'
  };
  var NUMBER4 = {
    className: 'number', begin: '#x[0-9a-f]+(/[0-9a-f]+)?'
  };
  var NUMBER5 = {
    className: 'number', begin: '#c\\(' + LISP_SIMPLE_NUMBER_RE + ' +' + LISP_SIMPLE_NUMBER_RE, end: '\\)'
  };
  var STRING = {
    className: 'string',
    begin: '"', end: '"',
    contains: [hljs.BACKSLASH_ESCAPE],
    relevance: 0
  };
  var COMMENT = {
    className: 'comment',
    begin: ';', end: '$'
  };
  var VARIABLE = {
    className: 'variable',
    begin: '\\*', end: '\\*'
  };
  var KEYWORD = {
    className: 'keyword',
    begin: '[:&]' + LISP_IDENT_RE
  };
  var QUOTED_LIST = {
    begin: '\\(', end: '\\)'
  };
  QUOTED_LIST.contains = [QUOTED_LIST, LITERAL, NUMBER1, NUMBER2, NUMBER3, NUMBER4, NUMBER5, STRING];
  var QUOTED1 = {
    className: 'quoted',
    begin: '[\'`]\\(', end: '\\)',
    contains: [NUMBER1, NUMBER2, NUMBER3, NUMBER4, NUMBER5, STRING, VARIABLE, KEYWORD, QUOTED_LIST]
  };
  var QUOTED2 = {
    className: 'quoted',
    begin: '\\(quote ', end: '\\)',
    keywords: {'title': {'quote': 1}},
    contains: [NUMBER1, NUMBER2, NUMBER3, NUMBER4, NUMBER5, STRING, VARIABLE, KEYWORD, QUOTED_LIST]
  };
  var LIST = {
    className: 'list',
    begin: '\\(', end: '\\)'
  };
  var BODY = {
    className: 'body',
    endsWithParent: true, excludeEnd: true
  };
  LIST.contains = [{className: 'title', begin: LISP_IDENT_RE}, BODY];
  BODY.contains = [QUOTED1, QUOTED2, LIST, LITERAL, NUMBER1, NUMBER2, NUMBER3, NUMBER4, NUMBER5, STRING, COMMENT, VARIABLE, KEYWORD];

  return {
    case_insensitive: true,
    defaultMode: {
      illegal: '[^\\s]',
      contains: [
        LITERAL,
        NUMBER1, NUMBER2, NUMBER3, NUMBER4, NUMBER5,
        STRING,
        COMMENT,
        QUOTED1, QUOTED2,
        LIST
      ]
    }
  };
}();
/*
Language: Lua
Author: Andrew Fedorov <dmmdrs@mail.ru>
*/

hljs.LANGUAGES.lua = function() {
  var OPENING_LONG_BRACKET = '\\[=*\\[';
  var CLOSING_LONG_BRACKET = '\\]=*\\]';
  var LONG_BRACKETS = {
    begin: OPENING_LONG_BRACKET, end: CLOSING_LONG_BRACKET
  };
  LONG_BRACKETS.contains = [LONG_BRACKETS];
  var COMMENT1 = {
    className: 'comment',
    begin: '--(?!' + OPENING_LONG_BRACKET + ')', end: '$'
  };
  var COMMENT2 = {
    className: 'comment',
    begin: '--' + OPENING_LONG_BRACKET, end: CLOSING_LONG_BRACKET,
    contains: [LONG_BRACKETS],
    relevance: 10
  };
  return {
    defaultMode: {
      lexems: hljs.UNDERSCORE_IDENT_RE,
      keywords: {
        'keyword': {
          'and': 1, 'break': 1, 'do': 1, 'else': 1, 'elseif': 1, 'end': 1,
          'false': 1, 'for': 1, 'if': 1, 'in': 1, 'local': 1, 'nil': 1,
          'not': 1, 'or': 1, 'repeat': 1, 'return': 1, 'then': 1, 'true': 1,
          'until': 1, 'while': 1
        },
        'built_in': {
          '_G': 1, '_VERSION': 1, 'assert': 1, 'collectgarbage': 1, 'dofile': 1,
          'error': 1, 'getfenv': 1, 'getmetatable': 1, 'ipairs': 1, 'load': 1,
          'loadfile': 1, 'loadstring': 1, 'module': 1, 'next': 1, 'pairs': 1,
          'pcall': 1, 'print': 1, 'rawequal': 1, 'rawget': 1, 'rawset': 1,
          'require': 1, 'select': 1, 'setfenv': 1, 'setmetatable': 1,
          'tonumber': 1, 'tostring': 1, 'type': 1, 'unpack': 1, 'xpcall': 1,
          'coroutine': 1, 'debug': 1, 'io': 1, 'math': 1, 'os': 1, 'package': 1,
          'string': 1, 'table': 1
        }
      },
      contains: [
        COMMENT1, COMMENT2,
        {
          className: 'function',
          begin: '\\bfunction\\b', end: '\\)',
          keywords: {'function': 1},
          contains: [
            {
              className: 'title',
              begin: '([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*'
            },
            {
              className: 'params',
              begin: '\\(', endsWithParent: true,
              contains: [COMMENT1, COMMENT2]
            },
            COMMENT1, COMMENT2
          ]
        },
        hljs.C_NUMBER_MODE,
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        {
          className: 'string',
          begin: OPENING_LONG_BRACKET, end: CLOSING_LONG_BRACKET,
          contains: [LONG_BRACKETS],
          relevance: 10
        }
      ]
    }
  };
}();
/*
Language: Objective C
Author: Valerii Hiora <valerii.hiora@gmail.com>
*/

hljs.LANGUAGES.objectivec = function(){
  var OBJC_KEYWORDS = {
    'keyword': {
      'false': 1, 'int': 1, 'float': 1, 'while': 1, 'private': 1, 'char': 1,
      'catch': 1, 'export': 1, 'sizeof': 2, 'typedef': 2, 'const': 1,
      'struct': 1, 'for': 1, 'union': 1, 'unsigned': 1, 'long': 1,
      'volatile': 2, 'static': 1, 'protected': 1, 'bool': 1, 'mutable': 1,
      'if': 1, 'public': 1, 'do': 1, 'return': 1, 'goto': 1, 'void': 2,
      'enum': 1, 'else': 1, 'break': 1, 'extern': 1, 'true': 1, 'class': 1,
      'asm': 1, 'case': 1, 'short': 1, 'default': 1, 'double': 1, 'throw': 1,
      'register': 1, 'explicit': 1, 'signed': 1, 'typename': 1, 'try': 1,
      'this': 1, 'switch': 1, 'continue': 1, 'wchar_t': 1, 'inline': 1,
      'readonly': 1, 'assign': 1, 'property': 1, 'protocol': 10, 'self': 1,
      'synchronized': 1, 'end': 1, 'synthesize': 50, 'id': 1, 'optional': 1,
      'required': 1, 'implementation': 10, 'nonatomic': 1,'interface': 1,
      'super': 1, 'unichar': 1, 'finally': 2, 'dynamic': 2, 'nil': 1
    },
    'built_in': {
      'YES': 5, 'NO': 5, 'NULL': 1, 'IBOutlet': 50, 'IBAction': 50,
      'NSString': 50, 'NSDictionary': 50, 'CGRect': 50, 'CGPoint': 50,
      'NSRange': 50, 'release': 1, 'retain': 1, 'autorelease': 50,
      'UIButton': 50, 'UILabel': 50, 'UITextView': 50, 'UIWebView': 50,
      'MKMapView': 50, 'UISegmentedControl': 50, 'NSObject': 50,
      'UITableViewDelegate': 50, 'UITableViewDataSource': 50, 'NSThread': 50,
      'UIActivityIndicator': 50, 'UITabbar': 50, 'UIToolBar': 50,
      'UIBarButtonItem': 50, 'UIImageView': 50, 'NSAutoreleasePool': 50,
      'UITableView': 50, 'BOOL': 1, 'NSInteger': 20, 'CGFloat': 20,
      'NSException': 50, 'NSLog': 50, 'NSMutableString': 50,
      'NSMutableArray': 50, 'NSMutableDictionary': 50, 'NSURL': 50
    }
  };
  return {
    defaultMode: {
      keywords: OBJC_KEYWORDS,
      illegal: '</',
      contains: [
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        hljs.C_NUMBER_MODE,
        hljs.QUOTE_STRING_MODE,
        {
          className: 'string',
          begin: '\'',
          end: '[^\\\\]\'',
          illegal: '[^\\\\][^\']'
        },

        {
          className: 'preprocessor',
          begin: '#import',
          end: '$',
          contains: [
          {
            className: 'title',
            begin: '\"',
            end: '\"'
          },
          {
            className: 'title',
            begin: '<',
            end: '>'
          }
          ]
        },
        {
          className: 'preprocessor',
          begin: '#',
          end: '$'
        },
        {
          className: 'class',
          begin: 'interface|class|protocol|implementation',
          end: '({|$)',
          keywords: {
            'interface': 1,
            'class': 1,
            'protocol': 5,
            'implementation': 5
          },
          contains: [{
            className: 'id',
            begin: hljs.UNDERSCORE_IDENT_RE
          }
          ]
        }
      ]
    }
  };
}();
/*
Language: Nginx
Author: Peter Leonov <gojpeg@yandex.ru>
*/

hljs.LANGUAGES.nginx = function() {
  var VAR1 = {
    className: 'variable',
    begin: '\\$\\d+'
  };
  var VAR2 = {
    className: 'variable',
    begin: '\\${', end: '}'
  };
  var VAR3 = {
    className: 'variable',
    begin: '[\\$\\@]' + hljs.UNDERSCORE_IDENT_RE
  };

  return {
    defaultMode: {
      contains: [
        hljs.HASH_COMMENT_MODE,
        { // directive
          begin: hljs.UNDERSCORE_IDENT_RE, end: ';|{', returnEnd: true,
          keywords: {
            accept_mutex: 1, accept_mutex_delay: 1, access_log: 1,
            add_after_body: 1, add_before_body: 1, add_header: 1,
            addition_types: 1, alias: 1, allow: 1, ancient_browser: 1,
            ancient_browser: 1, ancient_browser_value: 1, ancient_browser_value: 1,
            auth_basic: 1, auth_basic_user_file: 1, autoindex: 1,
            autoindex_exact_size: 1, autoindex_localtime: 1, 'break': 1,
            charset: 1, charset: 1, charset_map: 1, charset_map: 1,
            charset_types: 1, charset_types: 1, client_body_buffer_size: 1,
            client_body_in_file_only: 1, client_body_in_single_buffer: 1,
            client_body_temp_path: 1, client_body_timeout: 1,
            client_header_buffer_size: 1, client_header_timeout: 1,
            client_max_body_size: 1, connection_pool_size: 1, connections: 1,
            create_full_put_path: 1, daemon: 1, dav_access: 1, dav_methods: 1,
            debug_connection: 1, debug_points: 1, default_type: 1, deny: 1,
            directio: 1, directio_alignment: 1, echo: 1, echo_after_body: 1,
            echo_before_body: 1, echo_blocking_sleep: 1, echo_duplicate: 1,
            echo_end: 1, echo_exec: 1, echo_flush: 1, echo_foreach_split: 1,
            echo_location: 1, echo_location_async: 1, echo_read_request_body: 1,
            echo_request_body: 1, echo_reset_timer: 1, echo_sleep: 1,
            echo_subrequest: 1, echo_subrequest_async: 1, empty_gif: 1,
            empty_gif: 1, env: 1, error_log: 1, error_log: 1, error_page: 1,
            events: 1, expires: 1, fastcgi_bind: 1, fastcgi_buffer_size: 1,
            fastcgi_buffers: 1, fastcgi_busy_buffers_size: 1, fastcgi_cache: 1,
            fastcgi_cache_key: 1, fastcgi_cache_methods: 1,
            fastcgi_cache_min_uses: 1, fastcgi_cache_path: 1,
            fastcgi_cache_use_stale: 1, fastcgi_cache_valid: 1,
            fastcgi_catch_stderr: 1, fastcgi_connect_timeout: 1,
            fastcgi_hide_header: 1, fastcgi_ignore_client_abort: 1,
            fastcgi_ignore_headers: 1, fastcgi_index: 1,
            fastcgi_intercept_errors: 1, fastcgi_max_temp_file_size: 1,
            fastcgi_next_upstream: 1, fastcgi_param: 1, fastcgi_pass: 1,
            fastcgi_pass_header: 1, fastcgi_pass_request_body: 1,
            fastcgi_pass_request_headers: 1, fastcgi_read_timeout: 1,
            fastcgi_send_lowat: 1, fastcgi_send_timeout: 1,
            fastcgi_split_path_info: 1, fastcgi_store: 1, fastcgi_store_access: 1,
            fastcgi_temp_file_write_size: 1, fastcgi_temp_path: 1,
            fastcgi_upstream_fail_timeout: 1, fastcgi_upstream_max_fails: 1,
            flv: 1, geo: 1, geo: 1, geoip_city: 1, geoip_country: 1, gzip: 1,
            gzip_buffers: 1, gzip_comp_level: 1, gzip_disable: 1, gzip_hash: 1,
            gzip_http_version: 1, gzip_min_length: 1, gzip_no_buffer: 1,
            gzip_proxied: 1, gzip_static: 1, gzip_types: 1, gzip_vary: 1,
            gzip_window: 1, http: 1, 'if': 1, if_modified_since: 1,
            ignore_invalid_headers: 1, image_filter: 1, image_filter_buffer: 1,
            image_filter_jpeg_quality: 1, image_filter_transparency: 1, include: 1,
            index: 1, internal: 1, ip_hash: 1, js: 1, js_load: 1, js_require: 1,
            js_utf8: 1, keepalive_requests: 1, keepalive_timeout: 1,
            kqueue_changes: 1, kqueue_events: 1, large_client_header_buffers: 1,
            limit_conn: 1, limit_conn_log_level: 1, limit_except: 1, limit_rate: 1,
            limit_rate_after: 1, limit_req: 1, limit_req_log_level: 1,
            limit_req_zone: 1, limit_zone: 1, lingering_time: 1,
            lingering_timeout: 1, listen: 1, location: 1, lock_file: 1,
            log_format: 1, log_not_found: 1, log_subrequest: 1, map: 1,
            map_hash_bucket_size: 1, map_hash_max_size: 1, master_process: 1,
            memcached_bind: 1, memcached_buffer_size: 1,
            memcached_connect_timeout: 1, memcached_next_upstream: 1,
            memcached_pass: 1, memcached_read_timeout: 1,
            memcached_send_timeout: 1, memcached_upstream_fail_timeout: 1,
            memcached_upstream_max_fails: 1, merge_slashes: 1, min_delete_depth: 1,
            modern_browser: 1, modern_browser: 1, modern_browser_value: 1,
            modern_browser_value: 1, more_clear_headers: 1,
            more_clear_input_headers: 1, more_set_headers: 1,
            more_set_input_headers: 1, msie_padding: 1, msie_refresh: 1,
            multi_accept: 1, open_file_cache: 1, open_file_cache_errors: 1,
            open_file_cache_events: 1, open_file_cache_min_uses: 1,
            open_file_cache_retest: 1, open_file_cache_valid: 1,
            open_log_file_cache: 1, optimize_server_names: 1, output_buffers: 1,
            override_charset: 1, override_charset: 1, perl: 1, perl_modules: 1,
            perl_require: 1, perl_set: 1, pid: 1, port_in_redirect: 1,
            post_action: 1, postpone_gzipping: 1, postpone_output: 1,
            proxy_bind: 1, proxy_buffer_size: 1, proxy_buffering: 1,
            proxy_buffers: 1, proxy_busy_buffers_size: 1, proxy_cache: 1,
            proxy_cache_key: 1, proxy_cache_methods: 1, proxy_cache_min_uses: 1,
            proxy_cache_path: 1, proxy_cache_use_stale: 1, proxy_cache_valid: 1,
            proxy_connect_timeout: 1, proxy_headers_hash_bucket_size: 1,
            proxy_headers_hash_max_size: 1, proxy_hide_header: 1,
            proxy_ignore_client_abort: 1, proxy_ignore_headers: 1,
            proxy_intercept_errors: 1, proxy_max_temp_file_size: 1,
            proxy_method: 1, proxy_next_upstream: 1, proxy_pass: 1,
            proxy_pass_header: 1, proxy_pass_request_body: 1,
            proxy_pass_request_headers: 1, proxy_read_timeout: 1,
            proxy_redirect: 1, proxy_send_lowat: 1, proxy_send_timeout: 1,
            proxy_set_body: 1, proxy_set_header: 1, proxy_store: 1,
            proxy_store_access: 1, proxy_temp_file_write_size: 1,
            proxy_temp_path: 1, proxy_upstream_fail_timeout: 1,
            proxy_upstream_max_fails: 1, push_authorized_channels_only: 1,
            push_channel_group: 1, push_max_channel_id_length: 1,
            push_max_channel_subscribers: 1, push_max_message_buffer_length: 1,
            push_max_reserved_memory: 1, push_message_buffer_length: 1,
            push_message_timeout: 1, push_min_message_buffer_length: 1,
            push_min_message_recipients: 1, push_publisher: 1,
            push_store_messages: 1, push_subscriber: 1,
            push_subscriber_concurrency: 1, random_index: 1, read_ahead: 1,
            real_ip_header: 1, recursive_error_pages: 1, request_pool_size: 1,
            reset_timedout_connection: 1, resolver: 1, resolver_timeout: 1,
            'return': 1, rewrite: 1, rewrite_log: 1, root: 1, satisfy: 1,
            satisfy_any: 1, send_lowat: 1, send_timeout: 1, sendfile: 1,
            sendfile_max_chunk: 1, server: 1, server: 1, server_name: 1,
            server_name_in_redirect: 1, server_names_hash_bucket_size: 1,
            server_names_hash_max_size: 1, server_tokens: 1, 'set': 1,
            set_real_ip_from: 1, source_charset: 1, source_charset: 1, ssi: 1,
            ssi_ignore_recycled_buffers: 1, ssi_min_file_chunk: 1,
            ssi_silent_errors: 1, ssi_types: 1, ssi_value_length: 1, ssl: 1,
            ssl_certificate: 1, ssl_certificate_key: 1, ssl_ciphers: 1,
            ssl_client_certificate: 1, ssl_crl: 1, ssl_dhparam: 1,
            ssl_prefer_server_ciphers: 1, ssl_protocols: 1, ssl_session_cache: 1,
            ssl_session_timeout: 1, ssl_verify_client: 1, ssl_verify_depth: 1,
            sub_filter: 1, sub_filter_once: 1, sub_filter_types: 1, tcp_nodelay: 1,
            tcp_nopush: 1, timer_resolution: 1, try_files: 1, types: 1,
            types_hash_bucket_size: 1, types_hash_max_size: 1,
            underscores_in_headers: 1, uninitialized_variable_warn: 1, upstream: 1,
            use: 1, user: 1, userid: 1, userid: 1, userid_domain: 1,
            userid_domain: 1, userid_expires: 1, userid_expires: 1, userid_mark: 1,
            userid_name: 1, userid_name: 1, userid_p3p: 1, userid_p3p: 1,
            userid_path: 1, userid_path: 1, userid_service: 1, userid_service: 1,
            valid_referers: 1, variables_hash_bucket_size: 1,
            variables_hash_max_size: 1, worker_connections: 1,
            worker_cpu_affinity: 1, worker_priority: 1, worker_processes: 1,
            worker_rlimit_core: 1, worker_rlimit_nofile: 1,
            worker_rlimit_sigpending: 1, working_directory: 1, xml_entities: 1,
            xslt_stylesheet: 1, xslt_types: 1
          },
          relevance: 0,
          contains: [
            hljs.HASH_COMMENT_MODE,
            {
              begin: '\\s', end: '[;{]', returnBegin: true, returnEnd: true,
              lexems: '[a-z/]+',
              keywords: {
                'built_in': {
                  'on': 1, 'off': 1, 'yes': 1, 'no': 1, 'true': 1, 'false': 1,
                  'none': 1, 'blocked': 1, 'debug': 1, 'info': 1, 'notice': 1,
                  'warn': 1, 'error': 1, 'crit': 1, 'select': 1, 'permanent': 1,
                  'redirect': 1, 'kqueue': 1, 'rtsig': 1, 'epoll': 1, 'poll': 1,
                  '/dev/poll': 1
                }
              },
              relevance: 0,
              contains: [
                hljs.HASH_COMMENT_MODE,
                {
                  className: 'string',
                  begin: '"', end: '"',
                  contains: [hljs.BACKSLASH_ESCAPE, VAR1, VAR2, VAR3],
                  relevance: 0
                },
                {
                  className: 'string',
                  begin: "'", end: "'",
                  contains: [hljs.BACKSLASH_ESCAPE, VAR1, VAR2, VAR3],
                  relevance: 0
                },
                {
                  className: 'string',
                  begin: '([a-z]+):/', end: '[;\\s]', returnEnd: true
                },
                {
                  className: 'regexp',
                  begin: "\\s\\^", end: "\\s|{|;", returnEnd: true,
                  contains: [hljs.BACKSLASH_ESCAPE, VAR1, VAR2, VAR3]
                },
                // regexp locations (~, ~*)
                {
                  className: 'regexp',
                  begin: "~\\*?\\s+", end: "\\s|{|;", returnEnd: true,
                  contains: [hljs.BACKSLASH_ESCAPE, VAR1, VAR2, VAR3]
                },
                // *.example.com
                {
                  className: 'regexp',
                  begin: "\\*(\\.[a-z\\-]+)+",
                  contains: [hljs.BACKSLASH_ESCAPE, VAR1, VAR2, VAR3]
                },
                // sub.example.*
                {
                  className: 'regexp',
                  begin: "([a-z\\-]+\\.)+\\*",
                  contains: [hljs.BACKSLASH_ESCAPE, VAR1, VAR2, VAR3]
                },
                // IP
                {
                  className: 'number',
                  begin: '\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b'
                },
                // units
                {
                  className: 'number',
                  begin: '\\s\\d+[kKmMgGdshdwy]*\\b',
                  relevance: 0
                },
                VAR1, VAR2, VAR3
              ]
            }
          ]
        }
      ]
    }
  }
}();
/*
Language: Perl
Author: Peter Leonov <gojpeg@yandex.ru>
*/

hljs.LANGUAGES.perl = function(){
  var PERL_KEYWORDS = {'getpwent': 1, 'getservent': 1, 'quotemeta': 1, 'msgrcv': 1, 'scalar': 1, 'kill': 1, 'dbmclose': 1, 'undef': 1, 'lc': 1, 'ma': 1, 'syswrite': 1, 'tr': 1, 'send': 1, 'umask': 1, 'sysopen': 1, 'shmwrite': 1, 'vec': 1, 'qx': 1, 'utime': 1, 'local': 1, 'oct': 1, 'semctl': 1, 'localtime': 1, 'readpipe': 1, 'do': 1, 'return': 1, 'format': 1, 'read': 1, 'sprintf': 1, 'dbmopen': 1, 'pop': 1, 'getpgrp': 1, 'not': 1, 'getpwnam': 1, 'rewinddir': 1, 'qq': 1, 'fileno': 1, 'qw': 1, 'endprotoent': 1, 'wait': 1, 'sethostent': 1, 'bless': 1, 's': 1, 'opendir': 1, 'continue': 1, 'each': 1, 'sleep': 1, 'endgrent': 1, 'shutdown': 1, 'dump': 1, 'chomp': 1, 'connect': 1, 'getsockname': 1, 'die': 1, 'socketpair': 1, 'close': 1, 'flock': 1, 'exists': 1, 'index': 1, 'shmget': 1, 'sub': 1, 'for': 1, 'endpwent': 1, 'redo': 1, 'lstat': 1, 'msgctl': 1, 'setpgrp': 1, 'abs': 1, 'exit': 1, 'select': 1, 'print': 1, 'ref': 1, 'gethostbyaddr': 1, 'unshift': 1, 'fcntl': 1, 'syscall': 1, 'goto': 1, 'getnetbyaddr': 1, 'join': 1, 'gmtime': 1, 'symlink': 1, 'semget': 1, 'splice': 1, 'x': 1, 'getpeername': 1, 'recv': 1, 'log': 1, 'setsockopt': 1, 'cos': 1, 'last': 1, 'reverse': 1, 'gethostbyname': 1, 'getgrnam': 1, 'study': 1, 'formline': 1, 'endhostent': 1, 'times': 1, 'chop': 1, 'length': 1, 'gethostent': 1, 'getnetent': 1, 'pack': 1, 'getprotoent': 1, 'getservbyname': 1, 'rand': 1, 'mkdir': 1, 'pos': 1, 'chmod': 1, 'y': 1, 'substr': 1, 'endnetent': 1, 'printf': 1, 'next': 1, 'open': 1, 'msgsnd': 1, 'readdir': 1, 'use': 1, 'unlink': 1, 'getsockopt': 1, 'getpriority': 1, 'rindex': 1, 'wantarray': 1, 'hex': 1, 'system': 1, 'getservbyport': 1, 'endservent': 1, 'int': 1, 'chr': 1, 'untie': 1, 'rmdir': 1, 'prototype': 1, 'tell': 1, 'listen': 1, 'fork': 1, 'shmread': 1, 'ucfirst': 1, 'setprotoent': 1, 'else': 1, 'sysseek': 1, 'link': 1, 'getgrgid': 1, 'shmctl': 1, 'waitpid': 1, 'unpack': 1, 'getnetbyname': 1, 'reset': 1, 'chdir': 1, 'grep': 1, 'split': 1, 'require': 1, 'caller': 1, 'lcfirst': 1, 'until': 1, 'warn': 1, 'while': 1, 'values': 1, 'shift': 1, 'telldir': 1, 'getpwuid': 1, 'my': 1, 'getprotobynumber': 1, 'delete': 1, 'and': 1, 'sort': 1, 'uc': 1, 'defined': 1, 'srand': 1, 'accept': 1, 'package': 1, 'seekdir': 1, 'getprotobyname': 1, 'semop': 1, 'our': 1, 'rename': 1, 'seek': 1, 'if': 1, 'q': 1, 'chroot': 1, 'sysread': 1, 'setpwent': 1, 'no': 1, 'crypt': 1, 'getc': 1, 'chown': 1, 'sqrt': 1, 'write': 1, 'setnetent': 1, 'setpriority': 1, 'foreach': 1, 'tie': 1, 'sin': 1, 'msgget': 1, 'map': 1, 'stat': 1, 'getlogin': 1, 'unless': 1, 'elsif': 1, 'truncate': 1, 'exec': 1, 'keys': 1, 'glob': 1, 'tied': 1, 'closedir': 1, 'ioctl': 1, 'socket': 1, 'readlink': 1, 'eval': 1, 'xor': 1, 'readline': 1, 'binmode': 1, 'setservent': 1, 'eof': 1, 'ord': 1, 'bind': 1, 'alarm': 1, 'pipe': 1, 'atan2': 1, 'getgrent': 1, 'exp': 1, 'time': 1, 'push': 1, 'setgrent': 1, 'gt': 1, 'lt': 1, 'or': 1, 'ne': 1, 'm': 1};
  var SUBST = {
    className: 'subst',
    begin: '[$@]\\{', end: '\}',
    keywords: PERL_KEYWORDS,
    relevance: 10
  };
  var VAR1 = {
    className: 'variable',
    begin: '\\$\\d'
  };
  var VAR2 = {
    className: 'variable',
    begin: '[\\$\\%\\@\\*](\\^\\w\\b|#\\w+(\\:\\:\\w+)*|[^\\s\\w{]|{\\w+}|\\w+(\\:\\:\\w*)*)'
  };
  var STRING_CONTAINS = [hljs.BACKSLASH_ESCAPE, SUBST, VAR1, VAR2];
  var METHOD = {
    begin: '->',
    contains: [
      {begin: hljs.IDENT_RE},
      {begin: '{', end: '}'}
    ]
  };
  var PERL_DEFAULT_CONTAINS = [
    VAR1, VAR2,
    hljs.HASH_COMMENT_MODE,
    {
      className: 'comment',
      begin: '^(__END__|__DATA__)', end: '\\n$',
      relevance: 5
    },
    METHOD,
    {
      className: 'string',
      begin: 'q[qwxr]?\\s*\\(', end: '\\)',
      contains: STRING_CONTAINS,
      relevance: 5
    },
    {
      className: 'string',
      begin: 'q[qwxr]?\\s*\\[', end: '\\]',
      contains: STRING_CONTAINS,
      relevance: 5
    },
    {
      className: 'string',
      begin: 'q[qwxr]?\\s*\\{', end: '\\}',
      contains: STRING_CONTAINS,
      relevance: 5
    },
    {
      className: 'string',
      begin: 'q[qwxr]?\\s*\\|', end: '\\|',
      contains: STRING_CONTAINS,
      relevance: 5
    },
    {
      className: 'string',
      begin: 'q[qwxr]?\\s*\\<', end: '\\>',
      contains: STRING_CONTAINS,
      relevance: 5
    },
    {
      className: 'string',
      begin: 'qw\\s+q', end: 'q',
      contains: STRING_CONTAINS,
      relevance: 5
    },
    {
      className: 'string',
      begin: '\'', end: '\'',
      contains: [hljs.BACKSLASH_ESCAPE],
      relevance: 0
    },
    {
      className: 'string',
      begin: '"', end: '"',
      contains: STRING_CONTAINS,
      relevance: 0
    },
    {
      className: 'string',
      begin: '`', end: '`',
      contains: [hljs.BACKSLASH_ESCAPE]
    },
    {
      className: 'string',
      begin: '{\\w+}',
      relevance: 0
    },
    {
      className: 'string',
      begin: '\-?\\w+\\s*\\=\\>',
      relevance: 0
    },
    {
      className: 'number',
      begin: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b',
      relevance: 0
    },
    {
      className: 'regexp',
      begin: '(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*',
      relevance: 10
    },
    {
      className: 'regexp',
      begin: '(m|qr)?/', end: '/[a-z]*',
      contains: [hljs.BACKSLASH_ESCAPE],
      relevance: 0 // allows empty "//" which is a common comment delimiter in other languages
    },
    {
      className: 'sub',
      begin: '\\bsub\\b', end: '(\\s*\\(.*?\\))?[;{]',
      keywords: {'sub':1},
      relevance: 5
    },
    {
      className: 'operator',
      begin: '-\\w\\b',
      relevance: 0
    },
    {
      className: 'pod',
      begin: '\\=\\w', end: '\\=cut'
    }
  ];
  SUBST.contains = PERL_DEFAULT_CONTAINS;
  METHOD.contains[1].contains = PERL_DEFAULT_CONTAINS;

  return {
    defaultMode: {
      keywords: PERL_KEYWORDS,
      contains: PERL_DEFAULT_CONTAINS
    }
  };
}();
/*
Language: PHP
Author: Victor Karamzin <Victor.Karamzin@enterra-inc.com>
*/

hljs.LANGUAGES.php = {
  case_insensitive: true,
  defaultMode: {
    keywords: {
      'and': 1, 'include_once': 1, 'list': 1, 'abstract': 1, 'global': 1,
      'private': 1, 'echo': 1, 'interface': 1, 'as': 1, 'static': 1,
      'endswitch': 1, 'array': 1, 'null': 1, 'if': 1, 'endwhile': 1, 'or': 1,
      'const': 1, 'for': 1, 'endforeach': 1, 'self': 1, 'var': 1, 'while': 1,
      'isset': 1, 'public': 1, 'protected': 1, 'exit': 1, 'foreach': 1,
      'throw': 1, 'elseif': 1, 'extends': 1, 'include': 1, '__FILE__': 1,
      'empty': 1, 'require_once': 1, 'function': 1, 'do': 1, 'xor': 1,
      'return': 1, 'implements': 1, 'parent': 1, 'clone': 1, 'use': 1,
      '__CLASS__': 1, '__LINE__': 1, 'else': 1, 'break': 1, 'print': 1,
      'eval': 1, 'new': 1, 'catch': 1, '__METHOD__': 1, 'class': 1, 'case': 1,
      'exception': 1, 'php_user_filter': 1, 'default': 1, 'die': 1,
      'require': 1, '__FUNCTION__': 1, 'enddeclare': 1, 'final': 1, 'try': 1,
      'this': 1, 'switch': 1, 'continue': 1, 'endfor': 1, 'endif': 1,
      'declare': 1, 'unset': 1, 'true': 1, 'false': 1, 'namespace': 1
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.HASH_COMMENT_MODE,
      {
        className: 'comment',
        begin: '/\\*', end: '\\*/',
        contains: [{
            className: 'phpdoc',
            begin: '\\s@[A-Za-z]+',
            relevance: 10
        }]
      },
      hljs.C_NUMBER_MODE,
      hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null}),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}),
      {
        className: 'variable',
        begin: '\\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*'
      },
      {
        className: 'preprocessor',
        begin: '<\\?php',
        relevance: 10
      },
      {
        className: 'preprocessor',
        begin: '\\?>'
      }
    ]
  }
};
/*
Language: Python
*/

hljs.LANGUAGES.python = function() {
  var STR1 = {
    className: 'string',
    begin: '(u|b)?r?\'\'\'', end: '\'\'\'',
    relevance: 10
  };
  var STR2 = {
    className: 'string',
    begin: '(u|b)?r?"""', end: '"""',
    relevance: 10
  };
  var STR3 = {
    className: 'string',
    begin: '(u|r|ur|b|br)\'', end: '\'',
    contains: [hljs.BACKSLASH_ESCAPE],
    relevance: 10
  };
  var STR4 = {
    className: 'string',
    begin: '(u|r|ur|b|br)"', end: '"',
    contains: [hljs.BACKSLASH_ESCAPE],
    relevance: 10
  };
  var TITLE = {
    className: 'title', begin: hljs.UNDERSCORE_IDENT_RE
  };
  var PARAMS = {
    className: 'params',
    begin: '\\(', end: '\\)',
    contains: [STR1, STR2, STR3, STR4, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
  };

  return {
    defaultMode: {
      keywords: {
        'keyword': {'and': 1, 'elif': 1, 'is': 1, 'global': 1, 'as': 1, 'in': 1, 'if': 1, 'from': 1, 'raise': 1, 'for': 1, 'except': 1, 'finally': 1, 'print': 1, 'import': 1, 'pass': 1, 'return': 1, 'exec': 1, 'else': 1, 'break': 1, 'not': 1, 'with': 1, 'class': 1, 'assert': 1, 'yield': 1, 'try': 1, 'while': 1, 'continue': 1, 'del': 1, 'or': 1, 'def': 1, 'lambda': 1, 'nonlocal': 10},
        'built_in': {'None': 1, 'True': 1, 'False': 1, 'Ellipsis': 1, 'NotImplemented': 1}
      },
      illegal: '(</|->|\\?)',
      contains: [
        hljs.HASH_COMMENT_MODE,
        STR1, STR2, STR3, STR4, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE,
        {
          className: 'function',
          begin: '\\bdef ', end: ':',
          illegal: '$',
          keywords: {'def': 1},
          contains: [TITLE, PARAMS],
          relevance: 10
        },
        {
          className: 'class',
          begin: '\\bclass ', end: ':',
          illegal: '[${]',
          keywords: {'class': 1},
          contains: [TITLE, PARAMS],
          relevance: 10
        },
        hljs.C_NUMBER_MODE,
        {
          className: 'decorator',
          begin: '@', end: '$'
        }
      ]
    }
  };
}();
/*
Language: Ruby
Author: Anton Kovalyov <anton@kovalyov.net>
Contributors: Peter Leonov <gojpeg@yandex.ru>, Vasily Polovnyov <vast@whiteants.net>, Loren Segal <lsegal@soen.ca>
*/

hljs.LANGUAGES.ruby = function(){
  var RUBY_IDENT_RE = '[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?';
  var RUBY_METHOD_RE = '[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?';
  var RUBY_KEYWORDS = {
    'keyword': {'and': 1, 'false': 1, 'then': 1, 'defined': 1, 'module': 1, 'in': 1, 'return': 1, 'redo': 1, 'if': 1, 'BEGIN': 1, 'retry': 1, 'end': 1, 'for': 1, 'true': 1, 'self': 1, 'when': 1, 'next': 1, 'until': 1, 'do': 1, 'begin': 1, 'unless': 1, 'END': 1, 'rescue': 1, 'nil': 1, 'else': 1, 'break': 1, 'undef': 1, 'not': 1, 'super': 1, 'class': 1, 'case': 1, 'require': 1, 'yield': 1, 'alias': 1, 'while': 1, 'ensure': 1, 'elsif': 1, 'or': 1, 'def': 1},
    'keymethods': {'__id__': 1, '__send__': 1, 'abort': 1, 'abs': 1, 'all?': 1, 'allocate': 1, 'ancestors': 1, 'any?': 1, 'arity': 1, 'assoc': 1, 'at': 1, 'at_exit': 1, 'autoload': 1, 'autoload?': 1, 'between?': 1, 'binding': 1, 'binmode': 1, 'block_given?': 1, 'call': 1, 'callcc': 1, 'caller': 1, 'capitalize': 1, 'capitalize!': 1, 'casecmp': 1, 'catch': 1, 'ceil': 1, 'center': 1, 'chomp': 1, 'chomp!': 1, 'chop': 1, 'chop!': 1, 'chr': 1, 'class': 1, 'class_eval': 1, 'class_variable_defined?': 1, 'class_variables': 1, 'clear': 1, 'clone': 1, 'close': 1, 'close_read': 1, 'close_write': 1, 'closed?': 1, 'coerce': 1, 'collect': 1, 'collect!': 1, 'compact': 1, 'compact!': 1, 'concat': 1, 'const_defined?': 1, 'const_get': 1, 'const_missing': 1, 'const_set': 1, 'constants': 1, 'count': 1, 'crypt': 1, 'default': 1, 'default_proc': 1, 'delete': 1, 'delete!': 1, 'delete_at': 1, 'delete_if': 1, 'detect': 1, 'display': 1, 'div': 1, 'divmod': 1, 'downcase': 1, 'downcase!': 1, 'downto': 1, 'dump': 1, 'dup': 1, 'each': 1, 'each_byte': 1, 'each_index': 1, 'each_key': 1, 'each_line': 1, 'each_pair': 1, 'each_value': 1, 'each_with_index': 1, 'empty?': 1, 'entries': 1, 'eof': 1, 'eof?': 1, 'eql?': 1, 'equal?': 1, 'eval': 1, 'exec': 1, 'exit': 1, 'exit!': 1, 'extend': 1, 'fail': 1, 'fcntl': 1, 'fetch': 1, 'fileno': 1, 'fill': 1, 'find': 1, 'find_all': 1, 'first': 1, 'flatten': 1, 'flatten!': 1, 'floor': 1, 'flush': 1, 'for_fd': 1, 'foreach': 1, 'fork': 1, 'format': 1, 'freeze': 1, 'frozen?': 1, 'fsync': 1, 'getc': 1, 'gets': 1, 'global_variables': 1, 'grep': 1, 'gsub': 1, 'gsub!': 1, 'has_key?': 1, 'has_value?': 1, 'hash': 1, 'hex': 1, 'id': 1, 'include': 1, 'include?': 1, 'included_modules': 1, 'index': 1, 'indexes': 1, 'indices': 1, 'induced_from': 1, 'inject': 1, 'insert': 1, 'inspect': 1, 'instance_eval': 1, 'instance_method': 1, 'instance_methods': 1, 'instance_of?': 1, 'instance_variable_defined?': 1, 'instance_variable_get': 1, 'instance_variable_set': 1, 'instance_variables': 1, 'integer?': 1, 'intern': 1, 'invert': 1, 'ioctl': 1, 'is_a?': 1, 'isatty': 1, 'iterator?': 1, 'join': 1, 'key?': 1, 'keys': 1, 'kind_of?': 1, 'lambda': 1, 'last': 1, 'length': 1, 'lineno': 1, 'ljust': 1, 'load': 1, 'local_variables': 1, 'loop': 1, 'lstrip': 1, 'lstrip!': 1, 'map': 1, 'map!': 1, 'match': 1, 'max': 1, 'member?': 1, 'merge': 1, 'merge!': 1, 'method': 1, 'method_defined?': 1, 'method_missing': 1, 'methods': 1, 'min': 1, 'module_eval': 1, 'modulo': 1, 'name': 1, 'nesting': 1, 'new': 1, 'next': 1, 'next!': 1, 'nil?': 1, 'nitems': 1, 'nonzero?': 1, 'object_id': 1, 'oct': 1, 'open': 1, 'pack': 1, 'partition': 1, 'pid': 1, 'pipe': 1, 'pop': 1, 'popen': 1, 'pos': 1, 'prec': 1, 'prec_f': 1, 'prec_i': 1, 'print': 1, 'printf': 1, 'private_class_method': 1, 'private_instance_methods': 1, 'private_method_defined?': 1, 'private_methods': 1, 'proc': 1, 'protected_instance_methods': 1, 'protected_method_defined?': 1, 'protected_methods': 1, 'public_class_method': 1, 'public_instance_methods': 1, 'public_method_defined?': 1, 'public_methods': 1, 'push': 1, 'putc': 1, 'puts': 1, 'quo': 1, 'raise': 1, 'rand': 1, 'rassoc': 1, 'read': 1, 'read_nonblock': 1, 'readchar': 1, 'readline': 1, 'readlines': 1, 'readpartial': 1, 'rehash': 1, 'reject': 1, 'reject!': 1, 'remainder': 1, 'reopen': 1, 'replace': 1, 'require': 1, 'respond_to?': 1, 'reverse': 1, 'reverse!': 1, 'reverse_each': 1, 'rewind': 1, 'rindex': 1, 'rjust': 1, 'round': 1, 'rstrip': 1, 'rstrip!': 1, 'scan': 1, 'seek': 1, 'select': 1, 'send': 1, 'set_trace_func': 1, 'shift': 1, 'singleton_method_added': 1, 'singleton_methods': 1, 'size': 1, 'sleep': 1, 'slice': 1, 'slice!': 1, 'sort': 1, 'sort!': 1, 'sort_by': 1, 'split': 1, 'sprintf': 1, 'squeeze': 1, 'squeeze!': 1, 'srand': 1, 'stat': 1, 'step': 1, 'store': 1, 'strip': 1, 'strip!': 1, 'sub': 1, 'sub!': 1, 'succ': 1, 'succ!': 1, 'sum': 1, 'superclass': 1, 'swapcase': 1, 'swapcase!': 1, 'sync': 1, 'syscall': 1, 'sysopen': 1, 'sysread': 1, 'sysseek': 1, 'system': 1, 'syswrite': 1, 'taint': 1, 'tainted?': 1, 'tell': 1, 'test': 1, 'throw': 1, 'times': 1, 'to_a': 1, 'to_ary': 1, 'to_f': 1, 'to_hash': 1, 'to_i': 1, 'to_int': 1, 'to_io': 1, 'to_proc': 1, 'to_s': 1, 'to_str': 1, 'to_sym': 1, 'tr': 1, 'tr!': 1, 'tr_s': 1, 'tr_s!': 1, 'trace_var': 1, 'transpose': 1, 'trap': 1, 'truncate': 1, 'tty?': 1, 'type': 1, 'ungetc': 1, 'uniq': 1, 'uniq!': 1, 'unpack': 1, 'unshift': 1, 'untaint': 1, 'untrace_var': 1, 'upcase': 1, 'upcase!': 1, 'update': 1, 'upto': 1, 'value?': 1, 'values': 1, 'values_at': 1, 'warn': 1, 'write': 1, 'write_nonblock': 1, 'zero?': 1, 'zip': 1}
  };
  var YARDOCTAG = {
    className: 'yardoctag',
    begin: '@[A-Za-z]+'
  };
  var COMMENT1 = {
    className: 'comment',
    begin: '#', end: '$',
    contains: [YARDOCTAG]
  };
  var COMMENT2 = {
    className: 'comment',
    begin: '^\\=begin', end: '^\\=end',
    contains: [YARDOCTAG],
    relevance: 10
  };
  var COMMENT3 = {
    className: 'comment',
    begin: '^__END__', end: '\\n$'
  };
  var SUBST = {
    className: 'subst',
    begin: '#\\{', end: '}',
    lexems: RUBY_IDENT_RE,
    keywords: RUBY_KEYWORDS
  };
  var STR_CONTAINS = [hljs.BACKSLASH_ESCAPE, SUBST];
  var STR1 = {
    className: 'string',
    begin: '\'', end: '\'',
    contains: STR_CONTAINS,
    relevance: 0
  };
  var STR2 = {
    className: 'string',
    begin: '"', end: '"',
    contains: STR_CONTAINS,
    relevance: 0
  };
  var STR3 = {
    className: 'string',
    begin: '%[qw]?\\(', end: '\\)',
    contains: STR_CONTAINS,
    relevance: 10
  };
  var STR4 = {
    className: 'string',
    begin: '%[qw]?\\[', end: '\\]',
    contains: STR_CONTAINS,
    relevance: 10
  };
  var STR5 = {
    className: 'string',
    begin: '%[qw]?{', end: '}',
    contains: STR_CONTAINS,
    relevance: 10
  };
  var STR6 = {
    className: 'string',
    begin: '%[qw]?<', end: '>',
    contains: STR_CONTAINS,
    relevance: 10
  };
  var STR7 = {
    className: 'string',
    begin: '%[qw]?/', end: '/',
    contains: STR_CONTAINS,
    relevance: 10
  };
  var STR8 = {
    className: 'string',
    begin: '%[qw]?%', end: '%',
    contains: STR_CONTAINS,
    relevance: 10
  };
  var STR9 = {
    className: 'string',
    begin: '%[qw]?-', end: '-',
    contains: STR_CONTAINS,
    relevance: 10
  };
  var STR10 = {
    className: 'string',
    begin: '%[qw]?\\|', end: '\\|',
    contains: STR_CONTAINS,
    relevance: 10
  };
  var FUNCTION = {
    className: 'function',
    begin: '\\bdef\\s+', end: ' |$|;',
    lexems: RUBY_IDENT_RE,
    keywords: RUBY_KEYWORDS,
    contains: [
      {
        className: 'title',
        begin: RUBY_METHOD_RE,
        lexems: RUBY_IDENT_RE,
        keywords: RUBY_KEYWORDS
      },
      {
        className: 'params',
        begin: '\\(', end: '\\)',
        lexems: RUBY_IDENT_RE,
        keywords: RUBY_KEYWORDS
      },
      COMMENT1, COMMENT2, COMMENT3
    ]
  };
  var IDENTIFIER = {
    className: 'identifier',
    begin: RUBY_IDENT_RE,
    lexems: RUBY_IDENT_RE,
    keywords: RUBY_KEYWORDS,
    relevance: 0
  };

  var RUBY_DEFAULT_CONTAINS = [
    COMMENT1, COMMENT2, COMMENT3,
    STR1, STR2, STR3, STR4, STR5, STR6, STR7, STR8, STR9, STR10,
    {
      className: 'class',
      begin: '\\b(class|module)\\b', end: '$|;',
      keywords: {'class': 1, 'module': 1},
      contains: [
        {
          className: 'title',
          begin: '[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?',
          relevance: 0
        },
        {
          className: 'inheritance',
          begin: '<\\s*',
          contains: [{
            className: 'parent',
            begin: '(' + hljs.IDENT_RE + '::)?' + hljs.IDENT_RE
          }]
        },
        COMMENT1, COMMENT2, COMMENT3
      ]
    },
    FUNCTION,
    {
      className: 'constant',
      begin: '(::)?([A-Z]\\w*(::)?)+',
      relevance: 0
    },
    {
      className: 'symbol',
      begin: ':',
      contains: [STR1, STR2, STR3, STR4, STR5, STR6, STR7, STR8, STR9, STR10, IDENTIFIER],
      relevance: 0
    },
    {
      className: 'number',
      begin: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b',
      relevance: 0
    },
    {
      className: 'number',
      begin: '\\?\\w'
    },
    {
      className: 'variable',
      begin: '(\\$\\W)|((\\$|\\@\\@?)(\\w+))'
    },
    IDENTIFIER,
    { // regexp container
      begin: '(' + hljs.RE_STARTERS_RE + ')\\s*',
      contains: [
        COMMENT1, COMMENT2, COMMENT3,
        {
          className: 'regexp',
          begin: '/', end: '/[a-z]*',
          illegal: '\\n',
          contains: [hljs.BACKSLASH_ESCAPE]
        }
      ],
      relevance: 0
    }
  ];
  SUBST.contains = RUBY_DEFAULT_CONTAINS;
  FUNCTION.contains[1].contains = RUBY_DEFAULT_CONTAINS;

  return {
    defaultMode: {
      lexems: RUBY_IDENT_RE,
      keywords: RUBY_KEYWORDS,
      contains: RUBY_DEFAULT_CONTAINS
    }
  };
}();
/*
Language: Scala
Author: Jan Berkel <jan.berkel@gmail.com>
*/

hljs.LANGUAGES.scala = function() {
  var ANNOTATION = {
    className: 'annotation', begin: '@[A-Za-z]+'
  };
  var STRING = {
    className: 'string',
    begin: 'u?r?"""', end: '"""',
    relevance: 10
  };
  return {
    defaultMode: {
      keywords: { 'type': 1, 'yield': 1, 'lazy': 1, 'override': 1, 'def': 1, 'with': 1, 'val':1, 'var': 1, 'false': 1, 'true': 1, 'sealed': 1, 'abstract': 1, 'private': 1, 'trait': 1,  'object': 1, 'null': 1, 'if': 1, 'for': 1, 'while': 1, 'throw': 1, 'finally': 1, 'protected': 1, 'extends': 1, 'import': 1, 'final': 1, 'return': 1, 'else': 1, 'break': 1, 'new': 1, 'catch': 1, 'super': 1, 'class': 1, 'case': 1,'package': 1, 'default': 1, 'try': 1, 'this': 1, 'match': 1, 'continue': 1, 'throws': 1},
      contains: [
        {
          className: 'javadoc',
          begin: '/\\*\\*', end: '\\*/',
          contains: [{
            className: 'javadoctag',
            begin: '@[A-Za-z]+'
          }],
          relevance: 10
        },
        hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE,
        hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, STRING,
        {
          className: 'class',
          begin: '((case )?class |object |trait )', end: '({|$)',
          illegal: ':',
          keywords: {'case' : 1, 'class': 1, 'trait': 1, 'object': 1},
          contains: [
            {
              begin: '(extends|with)',
              keywords: {'extends': 1, 'with': 1},
              relevance: 10
            },
            {
              className: 'title',
              begin: hljs.UNDERSCORE_IDENT_RE
            },
            {
              className: 'params',
              begin: '\\(', end: '\\)',
              contains: [
                hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, STRING,
                ANNOTATION
              ]
            }
          ]
        },
        hljs.C_NUMBER_MODE,
        ANNOTATION
      ]
    }
  };
}();
/*
Language: Smalltalk
Author: Vladimir Gubarkov <xonixx@gmail.com>
*/

hljs.LANGUAGES.smalltalk = function() {
  var VAR_IDENT_RE = '[a-z][a-zA-Z0-9_]*';
  var CHAR = {
    className: 'char',
    begin: '\\$.{1}'
  };
  var SYMBOL = {
    className: 'symbol',
    begin: '#' + hljs.UNDERSCORE_IDENT_RE
  };
  return {
    defaultMode: {
      keywords: {'self': 1, 'super': 1, 'nil': 1, 'true': 1, 'false': 1, 'thisContext': 1}, // only 6
      contains: [
        {
          className: 'comment',
          begin: '"', end: '"',
          relevance: 0
        },
        hljs.APOS_STRING_MODE,
        {
          className: 'class',
          begin: '\\b[A-Z][A-Za-z0-9_]*',
          relevance: 0
        },
        {
          className: 'method',
          begin: VAR_IDENT_RE + ':'
        },
        hljs.C_NUMBER_MODE,
        SYMBOL,
        CHAR,
        {
          className: 'localvars',
          begin: '\\|\\s*((' + VAR_IDENT_RE + ')\\s*)+\\|'
        },
        {
          className: 'array',
          begin: '\\#\\(', end: '\\)',
          contains: [
            hljs.APOS_STRING_MODE,
            CHAR,
            hljs.C_NUMBER_MODE,
            SYMBOL
          ]
        }
      ]
    }
  };
}();
/*
Language: SQL
*/

hljs.LANGUAGES.sql = {
  case_insensitive: true,
  defaultMode: {
    illegal: '[^\\s]',
    contains: [
      {
        className: 'operator',
        begin: '(begin|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma)\\b', end: ';|$',
        keywords: {
          'keyword': {
            'all': 1, 'partial': 1, 'global': 1, 'month': 1,
            'current_timestamp': 1, 'using': 1, 'go': 1, 'revoke': 1,
            'smallint': 1, 'indicator': 1, 'end-exec': 1, 'disconnect': 1,
            'zone': 1, 'with': 1, 'character': 1, 'assertion': 1, 'to': 1,
            'add': 1, 'current_user': 1, 'usage': 1, 'input': 1, 'local': 1,
            'alter': 1, 'match': 1, 'collate': 1, 'real': 1, 'then': 1,
            'rollback': 1, 'get': 1, 'read': 1, 'timestamp': 1,
            'session_user': 1, 'not': 1, 'integer': 1, 'bit': 1, 'unique': 1,
            'day': 1, 'minute': 1, 'desc': 1, 'insert': 1, 'execute': 1,
            'like': 1, 'ilike': 2, 'level': 1, 'decimal': 1, 'drop': 1,
            'continue': 1, 'isolation': 1, 'found': 1, 'where': 1,
            'constraints': 1, 'domain': 1, 'right': 1, 'national': 1, 'some': 1,
            'module': 1, 'transaction': 1, 'relative': 1, 'second': 1,
            'connect': 1, 'escape': 1, 'close': 1, 'system_user': 1, 'for': 1,
            'deferred': 1, 'section': 1, 'cast': 1, 'current': 1, 'sqlstate': 1,
            'allocate': 1, 'intersect': 1, 'deallocate': 1, 'numeric': 1,
            'public': 1, 'preserve': 1, 'full': 1, 'goto': 1, 'initially': 1,
            'asc': 1, 'no': 1, 'key': 1, 'output': 1, 'collation': 1, 'group': 1,
            'by': 1, 'union': 1, 'session': 1, 'both': 1, 'last': 1,
            'language': 1, 'constraint': 1, 'column': 1, 'of': 1, 'space': 1,
            'foreign': 1, 'deferrable': 1, 'prior': 1, 'connection': 1,
            'unknown': 1, 'action': 1, 'commit': 1, 'view': 1, 'or': 1,
            'first': 1, 'into': 1, 'float': 1, 'year': 1, 'primary': 1,
            'cascaded': 1, 'except': 1, 'restrict': 1, 'set': 1, 'references': 1,
            'names': 1, 'table': 1, 'outer': 1, 'open': 1, 'select': 1,
            'size': 1, 'are': 1, 'rows': 1, 'from': 1, 'prepare': 1,
            'distinct': 1, 'leading': 1, 'create': 1, 'only': 1, 'next': 1,
            'inner': 1, 'authorization': 1, 'schema': 1, 'corresponding': 1,
            'option': 1, 'declare': 1, 'precision': 1, 'immediate': 1, 'else': 1,
            'timezone_minute': 1, 'external': 1, 'varying': 1, 'translation': 1,
            'true': 1, 'case': 1, 'exception': 1, 'join': 1, 'hour': 1,
            'default': 1, 'double': 1, 'scroll': 1, 'value': 1, 'cursor': 1,
            'descriptor': 1, 'values': 1, 'dec': 1, 'fetch': 1, 'procedure': 1,
            'delete': 1, 'and': 1, 'false': 1, 'int': 1, 'is': 1, 'describe': 1,
            'char': 1, 'as': 1, 'at': 1, 'in': 1, 'varchar': 1, 'null': 1,
            'trailing': 1, 'any': 1, 'absolute': 1, 'current_time': 1, 'end': 1,
            'grant': 1, 'privileges': 1, 'when': 1, 'cross': 1, 'check': 1,
            'write': 1, 'current_date': 1, 'pad': 1, 'begin': 1, 'temporary': 1,
            'exec': 1, 'time': 1, 'update': 1, 'catalog': 1, 'user': 1, 'sql': 1,
            'date': 1, 'on': 1, 'identity': 1, 'timezone_hour': 1, 'natural': 1,
            'whenever': 1, 'interval': 1, 'work': 1, 'order': 1, 'cascade': 1,
            'diagnostics': 1, 'nchar': 1, 'having': 1, 'left': 1, 'call': 1,
            'do': 1, 'handler': 1, 'load': 1, 'replace': 1, 'truncate': 1,
            'start': 1, 'lock': 1, 'show': 1, 'pragma': 1},
          'aggregate': {'count': 1, 'sum': 1, 'min': 1, 'max': 1, 'avg': 1}
        },
        contains: [
          {
            className: 'string',
            begin: '\'', end: '\'',
            contains: [hljs.BACKSLASH_ESCAPE, {begin: '\'\''}],
            relevance: 0
          },
          {
            className: 'string',
            begin: '"', end: '"',
            contains: [hljs.BACKSLASH_ESCAPE, {begin: '""'}],
            relevance: 0
          },
          {
            className: 'string',
            begin: '`', end: '`',
            contains: [hljs.BACKSLASH_ESCAPE]
          },
          hljs.C_NUMBER_MODE,
          {begin: '\\n'}
        ]
      },
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'comment',
        begin: '--', end: '$'
      }
    ]
  }
};
/**
 * marked - A markdown parser (https://github.com/chjj/marked)
 * Copyright (c) 2011-2012, Christopher Jeffrey. (MIT Licensed)
 */

;(function() {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^ {4,}[^\n]*(?:\n {4,}[^\n]*|\n)*(?:\n+|$)/,
  gfm_code: /^ *``` *(\w+)? *\n([^\0]+?)\s*``` *(?:\n+|$)/,
  hr: /^( *[\-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  lheading: /^([^\n]+)\n *(=|-){3,} *\n*/,
  blockquote: /^( *>[^\n]+(\n[^\n]+)*)+\n*/,
  list: /^( *)([*+-]|\d+\.) [^\0]+?(?:\n{2,}(?! )|\s*$)(?!\1bullet)\n*/,
  html: /^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,
  def: /^ *\[([^\]]+)\]: *([^\s]+)(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  paragraph: /^([^\n]+\n?(?!body))+\n*/,
  text: /^[^\n]+/
};

block.list = (function() {
  var list = block.list.source;

  list = list
    .replace('bullet', /(?:[*+-](?!(?: *[-*]){2,})|\d+\.)/.source);

  return new RegExp(list);
})();

block.html = (function() {
  var html = block.html.source;

  html = html
    .replace('comment', /<!--[^\0]*?-->/.source)
    .replace('closed', /<(?!elements)(\w+)[^\0]+?<\/\1>/.source)
    .replace('closing', /<\w+(?!:\/|@)\b(?:"[^"]*"|'[^']*'|[^>])*>/.source)
    .replace('elements', elements());

  return new RegExp(html);
})();

block.paragraph = (function() {
  var paragraph = block.paragraph.source
    , body = [];

  (function push(rule) {
    rule = block[rule] ? block[rule].source : rule;
    body.push(rule.replace(/(^|[^\[])\^/g, '$1'));
    return push;
  })
  ('gfm_code')
  ('hr')
  ('heading')
  ('lheading')
  ('blockquote')
  ('<(?!' + elements() + ')\\w+')
  ('def');

  return new
    RegExp(paragraph.replace('body', body.join('|')));
})();

/**
 * Block Lexer
 */

block.lexer = function(str) {
  var tokens = [];

  tokens.links = {};

  str = str
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ');

  return block.token(str, tokens, true);
};

block.token = function(str, tokens, top) {
  var str = str.replace(/^ +$/gm, '')
    , loose
    , cap
    , item
    , space
    , i
    , l;

  while (str) {
    // newline
    if (cap = block.newline.exec(str)) {
      str = str.substring(cap[0].length);
      if (cap[0].length > 1) {
        tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = block.code.exec(str)) {
      str = str.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      tokens.push({
        type: 'code',
        text: cap.replace(/\n+$/, '')
      });
      continue;
    }

    // gfm_code
    if (cap = block.gfm_code.exec(str)) {
      str = str.substring(cap[0].length);
      tokens.push({
        type: 'code',
        lang: cap[1],
        text: cap[2]
      });
      continue;
    }

    // heading
    if (cap = block.heading.exec(str)) {
      str = str.substring(cap[0].length);
      tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // lheading
    if (cap = block.lheading.exec(str)) {
      str = str.substring(cap[0].length);
      tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // hr
    if (cap = block.hr.exec(str)) {
      str = str.substring(cap[0].length);
      tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = block.blockquote.exec(str)) {
      str = str.substring(cap[0].length);
      tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      block.token(cap, tokens, top);

      tokens.push({
        type: 'blockquote_end'
      });
      continue;
    }

    // list
    if (cap = block.list.exec(str)) {
      str = str.substring(cap[0].length);

      tokens.push({
        type: 'list_start',
        ordered: isFinite(cap[2])
      });

      loose = /\n *\n *(?:[*+-]|\d+\.)/.test(cap[0]);

      // Get each top-level item.
      cap = cap[0].match(
        /^( *)([*+-]|\d+\.)[^\n]*(?:\n(?!\1(?:[*+-]|\d+\.))[^\n]*)*/gm
      );

      i = 0;
      l = cap.length;

      for (; i < l; i++) {
        // Remove the list item's bullet
        // so it is seen as the next token.
        item = cap[i].replace(/^ *([*+-]|\d+\.) */, '');

        // Outdent whatever the
        // list item contains. Hacky.
        space = /\n( +)/.exec(item);
        if (space) {
          space = new RegExp('^' + space[1], 'gm');
          item = item.replace(space, '');
        }

        tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        block.token(item, tokens);

        tokens.push({
          type: 'list_item_end'
        });
      }

      tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = block.html.exec(str)) {
      str = str.substring(cap[0].length);
      tokens.push({
        type: 'html',
        text: cap[0]
      });
      continue;
    }

    // def
    if (top && (cap = block.def.exec(str))) {
      str = str.substring(cap[0].length);
      tokens.links[cap[1].toLowerCase()] = {
        href: cap[2],
        title: cap[3]
      };
      continue;
    }

    // top-level paragraph
    if (top && (cap = block.paragraph.exec(str))) {
      str = str.substring(cap[0].length);
      tokens.push({
        type: 'paragraph',
        text: cap[0]
      });
      continue;
    }

    // text
    if (cap = block.text.exec(str)) {
      // Top-level should never reach here.
      str = str.substring(cap[0].length);
      tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }
  }

  return tokens;
};

/**
 * Inline Processing
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  gfm_autolink: /^(\w+:\/\/[^\s]+[^.,:;"')\]\s])/,
  tag: /^<!--[^\0]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^>])*>/,
  link: /^!?\[((?:\[[^\]]*\]|[^\[\]]|\[|\](?=[^[\]]*\]))*)\]\(([^\)]*)\)/,
  reflink: /^!?\[((?:\[[^\]]*\]|[^\[\]]|\[|\](?=[^[\]]*\]))*)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([^\0]+?)__(?!_)|^\*\*([^\0]+?)\*\*(?!\*)/,
  em: /^\b_([^\0]+?)_\b|^\*((?:\*\*|[^\0])+?)\*(?!\*)/,
  code: /^(`+)([^\0]*?[^`])\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  text: /^[^\0]+?(?=[\\<!\[_*`]|\w+:\/\/| {2,}\n|$)/
};

/**
 * Inline Lexer
 */

inline.lexer = function(str) {
  var out = ''
    , links = tokens.links
    , link
    , text
    , href
    , cap;

  while (str) {
    // escape
    if (cap = inline.escape.exec(str)) {
      str = str.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = inline.autolink.exec(str)) {
      str = str.substring(cap[0].length);
      if (cap[2] === '@') {
        text = cap[1][6] === ':'
          ? mangle(cap[1].substring(7))
          : mangle(cap[1]);
        href = mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += '<a href="'
        + href
        + '">'
        + text
        + '</a>';
      continue;
    }

    // gfm_autolink
    if (cap = inline.gfm_autolink.exec(str)) {
      str = str.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      out += '<a href="'
        + href
        + '">'
        + text
        + '</a>';
      continue;
    }

    // tag
    if (cap = inline.tag.exec(str)) {
      str = str.substring(cap[0].length);
      out += cap[0];
      continue;
    }

    // link
    if (cap = inline.link.exec(str)) {
      str = str.substring(cap[0].length);
      text = /^\s*<?([^\s]*?)>?(?:\s+"([^\n]+)")?\s*$/.exec(cap[2]);
      if (!text) {
        out += cap[0][0];
        str = cap[0].substring(1) + str;
        continue;
      }
      out += outputLink(cap, {
        href: text[1],
        title: text[2]
      });
      continue;
    }

    // reflink, nolink
    if ((cap = inline.reflink.exec(str))
        || (cap = inline.nolink.exec(str))) {
      str = str.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0][0];
        str = cap[0].substring(1) + str;
        continue;
      }
      out += outputLink(cap, link);
      continue;
    }

    // strong
    if (cap = inline.strong.exec(str)) {
      str = str.substring(cap[0].length);
      out += '<strong>'
        + inline.lexer(cap[2] || cap[1])
        + '</strong>';
      continue;
    }

    // em
    if (cap = inline.em.exec(str)) {
      str = str.substring(cap[0].length);
      out += '<em>'
        + inline.lexer(cap[2] || cap[1])
        + '</em>';
      continue;
    }

    // code
    if (cap = inline.code.exec(str)) {
      str = str.substring(cap[0].length);
      out += '<code>'
        + escape(cap[2], true)
        + '</code>';
      continue;
    }

    // br
    if (cap = inline.br.exec(str)) {
      str = str.substring(cap[0].length);
      out += '<br>';
      continue;
    }

    // text
    if (cap = inline.text.exec(str)) {
      str = str.substring(cap[0].length);
      out += escape(cap[0]);
      continue;
    }
  }

  return out;
};

var outputLink = function(cap, link) {
  if (cap[0][0] !== '!') {
    return '<a href="'
      + escape(link.href)
      + '"'
      + (link.title
      ? ' title="'
      + escape(link.title)
      + '"'
      : '')
      + '>'
      + inline.lexer(cap[1])
      + '</a>';
  } else {
    return '<img src="'
      + escape(link.href)
      + '" alt="'
      + escape(cap[1])
      + '"'
      + (link.title
      ? ' title="'
      + escape(link.title)
      + '"'
      : '')
      + '>';
  }
};

/**
 * Parsing
 */

var tokens
  , token;

var next = function() {
  return token = tokens.pop();
};

var tok = function() {
  switch (token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return '<hr>';
    }
    case 'heading': {
      return '<h'
        + token.depth
        + '>'
        + inline.lexer(token.text)
        + '</h'
        + token.depth
        + '>';
    }
    case 'code': {
      return '<pre><code'
        + (token.lang
        ? ' class="'
        + token.lang
        + '"'
        : '')
        + '>'
        + (token.escaped
        ? token.text
        : escape(token.text, true))
        + '</code></pre>';
    }
    case 'blockquote_start': {
      var body = [];

      while (next().type !== 'blockquote_end') {
        body.push(tok());
      }

      return '<blockquote>'
        + body.join('')
        + '</blockquote>';
    }
    case 'list_start': {
      var type = token.ordered ? 'ol' : 'ul'
        , body = [];

      while (next().type !== 'list_end') {
        body.push(tok());
      }

      return '<'
        + type
        + '>'
        + body.join('')
        + '</'
        + type
        + '>';
    }
    case 'list_item_start': {
      var body = [];

      while (next().type !== 'list_item_end') {
        body.push(token.type === 'text'
          ? parseText()
          : tok());
      }

      return '<li>'
        + body.join(' ')
        + '</li>';
    }
    case 'loose_item_start': {
      var body = [];

      while (next().type !== 'list_item_end') {
        body.push(tok());
      }

      return '<li>'
        + body.join(' ')
        + '</li>';
    }
    case 'html': {
      return inline.lexer(token.text);
    }
    case 'paragraph': {
      return '<p>'
        + inline.lexer(token.text)
        + '</p>';
    }
    case 'text': {
      return '<p>'
        + parseText()
        + '</p>';
    }
  }
};

var parseText = function() {
  var body = [ token.text ]
    , top;

  while ((top = tokens[tokens.length-1])
         && top.type === 'text') {
    body.push(next().text);
  }

  return inline.lexer(body.join('\n'));
};

var parse = function(src) {
  tokens = src.reverse();

  var out = [];
  while (next()) {
    out.push(tok());
  }

  tokens = null;
  token = null;

  return out.join('\n');
};

/**
 * Helpers
 */

var escape = function(html, dbl) {
  return html
    .replace(!dbl
      ? /&(?!#?\w+;)/g
      : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

var mangle = function(str) {
  var out = ''
    , ch
    , i = 0
    , l = str.length;

  for (; i < l; i++) {
    ch = str.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

function elements() {
  var elements = '(?:'
    + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
    + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
    + '|span|br|wbr|ins|del|img)\\b';

  return elements;
}

/**
 * Expose
 */

var marked = function(str) {
  return parse(block.lexer(str));
};

marked.parser = parse;
marked.lexer = block.lexer;

marked.parse = marked;

if (typeof module !== 'undefined') {
  module.exports = marked;
} else {
  this.marked = marked;
}

}).call(this);
(function() {
  var decode64, keyStr;

  window.DocumentUp = (function() {

    function DocumentUp() {}

    DocumentUp.template = function(locals) {
      return "<nav id=\"nav\">\n  <header>\n    <a href=\"#\" id=\"logo\">" + locals.name + "</a>\n  </header>\n  <ul id=\"sections\">\n  </ul>\n</nav>\n<div id=\"content\">\n  <div id=\"loader\">\n    Loading documentation...\n  </div>\n</div>";
    };

    DocumentUp.defaults = {
      color: "#369",
      twitter: null,
      issues: true,
      travis: false
    };

    DocumentUp.document = function(options) {
      var key, repo, value, _base, _ref;
      var _this = this;
      this.options = options;
      if ("string" === typeof this.options) {
        repo = this.options;
        this.options = {
          repo: repo
        };
      }
      if (!this.options || !this.options.repo || !/\//.test(this.options.repo)) {
        throw new Error("Repository required with format: username/repository");
      }
      _ref = this.defaults;
      for (key in _ref) {
        value = _ref[key];
        if (!this.options[key]) this.options[key] = value;
      }
      (_base = this.options).name || (_base.name = this.options.repo.replace(/.+\//, ""));
      $.domReady(function() {
        var $nav, extra, iframe, twitter, _i, _len, _ref2, _results;
        $("title").text(_this.options.name);
        $("body").html(_this.template(_this.options));
        $("head").append("<style type=\"text/css\">\n  a {color: " + _this.options.color + "}\n</style>");
        $nav = $("#nav");
        $nav.append("<div id=\"github\" class=\"extra\">\n  <a href=\"https://github.com/" + _this.options.repo + "\">Source on Github</a>\n</div>");
        if (_this.options.issues) {
          $nav.append("<div id=\"github-issues\" class=\"extra\">\n  <a href=\"https://github.com/" + _this.options.repo + "/issues\">Issues</a>\n</div>");
        }
        if (_this.options.travis) {
          $nav.append("<div id=\"travis\" class=\"extra\">\n  <a href=\"http://travis-ci.org/" + _this.options.repo + "\">\n    <img src=\"https://secure.travis-ci.org/" + _this.options.repo + ".png\">\n  </a>\n</div>");
        }
        if (_this.options.twitter) {
          if (!(_this.options.twitter instanceof Array)) {
            _this.options.twitter = [_this.options.twitter];
          }
          _ref2 = _this.options.twitter;
          _results = [];
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            twitter = _ref2[_i];
            twitter = twitter.replace("@", "");
            extra = $("<div class='extra twitter'>");
            iframe = $('<iframe allowtransparency="true" frameborder="0" scrolling="no" style="width:162px; height:20px;">');
            iframe.attr("src", "https://platform.twitter.com/widgets/follow_button.html?screen_name=" + twitter + "&show_count=false");
            extra.append(iframe);
            _results.push($nav.append(extra));
          }
          return _results;
        }
      });
      return this.getReadme(function(err, html) {
        _this.html = html;
        if (err) throw err;
        return $.domReady(function() {
          return _this.renderContent();
        });
      });
    };

    DocumentUp.getReadme = function(callback) {
      var html, using_cache;
      var _this = this;
      using_cache = false;
      if (html = localStorage.getItem("cached_content")) {
        callback(null, html);
        this.usingCache = true;
      }
      return $.ajax({
        url: "https://api.github.com/repos/" + this.options.repo + "/git/trees/master?callback=?",
        type: "jsonp",
        success: function(resp) {
          var last_sha, obj, readme_sha, _i, _len, _ref;
          _ref = resp.data.tree;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            obj = _ref[_i];
            if (/readme/i.test(obj.path)) readme_sha = obj.sha;
          }
          last_sha = localStorage.getItem("readme_sha");
          if (readme_sha !== last_sha) {
            return $.ajax({
              url: "https://api.github.com/repos/" + _this.options.repo + "/git/blobs/" + readme_sha + "?callback=?",
              type: "jsonp",
              success: function(resp) {
                html = marked(decode64(resp.data.content));
                localStorage.setItem("cached_content", html);
                localStorage.setItem("readme_sha", readme_sha);
                if (!_this.usingCache) return callback(null, html);
                return $.domReady(function() {
                  var refresh_link;
                  var _this = this;
                  refresh_link = $("<a id='refresh' href='#'>There's a new version of the documentation<br>Click here or refresh to see it.</a>");
                  $("body").append(refresh_link);
                  return refresh_link.bind("click", function(event) {
                    event.preventDefault();
                    callback(null, html);
                    return refresh_link.remove();
                  });
                });
              }
            });
          }
        }
      });
    };

    DocumentUp.renderContent = function() {
      var $content, $sections, current_section, current_subsection;
      $content = $("#content");
      $content.html(this.html);
      current_section = 0;
      current_subsection = 0;
      $sections = $("#sections");
      $sections.empty();
      $("h2, h3").each(function(el) {
        var $subsection, section_id;
        if (el.tagName === "H2") {
          current_subsection = 0;
          current_section++;
          el.id = section_id = "section-" + current_section;
          return $sections.append("<li id=\"for-" + section_id + "\">\n  <a href=\"#" + section_id + "\">" + el.textContent + "</a>\n</li>");
        } else if (el.tagName === "H3") {
          current_subsection++;
          el.id = section_id = "section-" + current_section + "-" + current_subsection;
          $subsection = $("#for-section-" + current_section + " ul");
          if (!$subsection.length) {
            $("#for-section-" + current_section).append("<ul></ul>");
            $subsection = $("#for-section-" + current_section + " ul");
          }
          return $subsection.append("<li id=\"for-" + section_id + "\">\n  <a href=\"#" + section_id + "\">" + el.textContent + "</a>\n</li>");
        }
      });
      return $("pre code").each(function(el) {
        return hljs.highlightBlock(el, "  ");
      });
    };

    return DocumentUp;

  })();

  decode64 = function(input) {
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4, i, output;
    output = "";
    chr1 = void 0;
    chr2 = void 0;
    chr3 = "";
    enc1 = void 0;
    enc2 = void 0;
    enc3 = void 0;
    enc4 = "";
    i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (true) {
      enc1 = keyStr.indexOf(input.charAt(i++));
      enc2 = keyStr.indexOf(input.charAt(i++));
      enc3 = keyStr.indexOf(input.charAt(i++));
      enc4 = keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 !== 64) output = output + String.fromCharCode(chr2);
      if (enc4 !== 64) output = output + String.fromCharCode(chr3);
      chr1 = chr2 = chr3 = "";
      enc1 = enc2 = enc3 = enc4 = "";
      if (!(i < input.length)) break;
    }
    return unescape(output);
  };

  keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";

}).call(this);
var style_tag = document.createElement("style");
style_tag.type = "text/css"
style_tag.innerHTML = 'html,body,div,span,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,code,del,dfn,em,img,q,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline}table{border-collapse:separate;border-spacing:0}caption,th,td{text-align:left;font-weight:normal}table,td,th{vertical-align:middle}blockquote:before,blockquote:after,q:before,q:after{content:""}blockquote,q{quotes:"" ""}a img{border:none}body{margin:10px}pre code{display:block;padding:.5em;color:#000;background:#f8f8ff;padding:20px;border:1px solid #ccc;overflow-y:auto}pre .comment,pre .template_comment,pre .diff .header,pre .javadoc{color:#998;font-style:italic}pre .keyword,pre .css .rule .keyword,pre .winutils,pre .javascript .title,pre .lisp .title,pre .subst{color:#000;font-weight:bold}pre .number,pre .hexcolor{color:#40a070}pre .string,pre .tag .value,pre .phpdoc,pre .tex .formula{color:#d14}pre .title,pre .id{color:#900;font-weight:bold}pre .javascript .title,pre .lisp .title,pre .subst{font-weight:normal}pre .class .title,pre .haskell .label,pre .tex .command{color:#458;font-weight:bold}pre .tag,pre .tag .title,pre .rules .property,pre .django .tag .keyword{color:#000080;font-weight:normal}pre .attribute,pre .variable,pre .instancevar,pre .lisp .body{color:#008080}pre .regexp{color:#009926}pre .class{color:#458;font-weight:bold}pre .symbol,pre .ruby .symbol .string,pre .ruby .symbol .keyword,pre .ruby .symbol .keymethods,pre .lisp .keyword,pre .tex .special,pre .input_number{color:#990073}pre .builtin,pre .built_in,pre .lisp .title{color:#0086b3}pre .preprocessor,pre .pi,pre .doctype,pre .shebang,pre .cdata{color:#999;font-weight:bold}pre .deletion{background:#fdd}pre .addition{background:#dfd}pre .diff .change{background:#0086b3}pre .chunk{color:#aaa}pre .tex .formula{opacity:.5;filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=50)}@font-face{font-family:"Droid Sans Mono";src:url("data:font/woff;charset=utf-8;base64,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") format("woff");font-weight:normal;font-style:normal}@font-face{font-family:"League Gothic";src:url("data:font/woff;charset=utf-8;base64,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") format("woff");font-weight:normal;font-style:normal}html{height:100%}body{font:18px/1.4em "Minion Pro",Times,"Times New Roman",serif;font-size-adjust:none;font-style:normal;font-variant:normal;font-weight:normal}h1,h2,h3,h4,header,nav,#loader{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif}header{border-bottom:1px solid #ccc;}header #logo{color:#333;font-size:18px;font-weight:bold;padding:10px 15px;line-height:1.2em;text-decoration:none}#nav{position:fixed;top:0;left:0;width:250px;height:100%;background:rgba(0,0,0,0.10);border-right:1px solid rgba(0,0,0,0.20);-webkit-box-shadow:rgba(0,0,0,0.10) -1px 0 3px 0 inset;-moz-box-shadow:rgba(0,0,0,0.10) -1px 0 3px 0 inset;box-shadow:rgba(0,0,0,0.10) -1px 0 3px 0 inset;text-shadow:rgba(255,255,255,0.70) 0 1px 0;overflow-x:hidden;overflow-y:auto;}#nav a{display:block;font-weight:bold;text-decoration:none}#nav #sections{margin-bottom:5px;border-bottom:1px solid #ccc;background:#f1f1f1;-webkit-box-shadow:rgba(0,0,0,0.15) 0 0 5px;-moz-box-shadow:rgba(0,0,0,0.15) 0 0 5px;box-shadow:rgba(0,0,0,0.15) 0 0 5px;}#nav #sections > li{border-bottom:1px solid rgba(0,0,0,0.05);border-top:1px solid rgba(255,255,255,0.50);}#nav #sections > li > a{padding:5px 15px;color:#555;font-size:14px;}#nav #sections > li > a:hover{background:rgba(0,0,0,0.05)}#nav #sections > li:last-child{border-bottom:1px solid rgba(255,255,255,0.50)}#nav #sections ul{margin-bottom:6px;}#nav #sections ul li a{padding:1px 25px;font-size:13px;}#nav #sections ul li a:hover{background:rgba(0,0,0,0.05)}#nav .extra{padding:5px 15px;min-height:1.4em;}#nav .extra a{color:#555;font-size:14px}#nav #travis img{margin-top:10px;display:block}#content{margin:0 40px 0 290px;padding:30px 0 20px;position:relative;min-height:100px;max-width:688px;}#content #loader{color:#888;width:300px;height:24px;line-height:24px;position:absolute;top:30px;left:30px;background:url("data:image/gif;base64,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") no-repeat center left;padding-left:32px;font-size:18px}#refresh{z-index:3;position:fixed;display:block;top:0;left:50%;width:320px;margin-left:-160px;font-family:"Helvetica Neue","Helvetica",arial,sans-serif;line-height:1.4em;padding:10px;color:#fff;text-shadow:rgba(0,0,0,0.30) 0 1px 1px;font-weight:bold;font-size:13px;text-decoration:none;text-align:center;background:#666;-moz-border-radius-bottomleft:5px;-webkit-border-bottom-left-radius:5px;border-bottom-left-radius:5px;-moz-border-radius-bottomright:5px;-webkit-border-bottom-right-radius:5px;border-bottom-right-radius:5px;}#content p{padding:0 0 .8125em 0;color:#111;font-weight:300}#content p img{float:left;margin:.5em .8125em .8125em 0;padding:0}#content h1,#content h2,#content h3,#content h4,#content h5,#content h6{font-weight:normal;color:#333;line-height:1.2em}#content h1{font-size:2.125em;margin-bottom:.765em}#content h2{font-size:1.7em;margin:.855em 0}#content h3{font-size:1.3em;margin:.956em 0}#content h4{font-size:1.1em;margin:1.161em 0}#content h5,#content h6{font-size:1em;font-weight:bold;margin:1.238em 0}#content ul{list-style-position:outside}#content li ul,#content li ol{margin:0 1.625em}#content ul,#content ol{margin:0 0 1.625em 1em}#content dl{margin:0 0 1.625em 0}#content dl dt{font-weight:bold}#content dl dd{margin-left:1.625em}#content a{text-decoration:none}#content a:hover{text-decoration:underline}#content table{margin-bottom:1.625em;border-collapse:collapse}#content th{font-weight:bold}#content tr,#content th,#content td{margin:0;padding:0 1.625em 0 1em;height:26px}#content tfoot{font-style:italic}#content caption{text-align:center;font-family:Georgia,serif}#content abbr,#content acronym{border-bottom:1px dotted #000}#content address{margin-top:1.625em;font-style:italic}#content del{color:#000}#content blockquote{padding:1em 1em 1.625em 1em;font-family:georgia,serif;font-style:italic}#content blockquote:before{content:"\201C";font-size:3em;margin-left:-.625em;font-family:georgia,serif;color:#aaa;line-height:0}#content blockquote > p{padding:0;margin:0}#content strong{font-weight:bold}#content em,#content dfn{font-style:italic}#content dfn{font-weight:bold}#content pre,#content code{margin:0 0 1.625em;white-space:pre}#content pre,#content code,#content tt{font:.8em "Droid Sans Mono",Monaco,monospace;line-height:1.5}#content code{background:#f8f8ff;padding:1px 2px;border:1px solid #ddd}#content pre code{padding:10px 12px}#content tt{display:block;margin:1.625em 0}#content hr{margin-bottom:1.625em}'
document.getElementsByTagName('head')[0].appendChild(style_tag);