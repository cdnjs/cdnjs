/*!
  * Bonzo: DOM Utility (c) Dustin Diaz 2011
  * https://github.com/ded/bonzo
  * License MIT
  */
!function (name, definition){
  if (typeof define == 'function') define(definition)
  else if (typeof module != 'undefined') module.exports = definition()
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
    , table = 'table'
    , tagMap = { thead: table, tbody: table, tfoot: table, tr: 'tbody', th: 'tr', td: 'tr', fieldset: 'form', option: 'select' }
    , stateAttributes = /^checked|selected$/
    , ie = /msie/i.test(navigator.userAgent)
    , uidList = []
    , uuids = 0
    , digit = /^-?[\d\.]+$/
    , px = 'px'
      // commonly used methods
    , setAttribute = 'setAttribute'
    , getAttribute = 'getAttribute'
    , trimReplace = /(^\s*|\s*$)/g
    , unitless = { lineHeight: 1, zoom: 1, zIndex: 1, opacity: 1 }
    , transform = function () {
        var props = ['webkitTransform', 'MozTransform', 'OTransform', 'msTransform', 'Transform'], i
        for (i = 0; i < props.length; i++) {
          if (props[i] in doc.createElement('a').style) {
            return props[i]
          }
        }
      }()
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

  function camelize(s) {
    return s.replace(/-(.)/g, function (m, m1) {
      return m1.toUpperCase()
    })
  }

  function is(node) {
    return node && node.nodeName && node.nodeType == 1
  }

  function some(ar, fn, scope, i) {
    for (i = 0, j = ar.length; i < j; ++i) {
      if (fn.call(scope, ar[i], i, ar)) {
        return true
      }
    }
    return false
  }

  var getStyle = doc.defaultView && doc.defaultView.getComputedStyle ?
    function (el, property) {
      property = property == 'transform' ? transform : property
      property = property == 'transform-origin' ? transform + "Origin" : property
      var value = null
      if (property == 'float') {
        property = 'cssFloat'
      }
      var computed = doc.defaultView.getComputedStyle(el, '')
      computed && (value = computed[camelize(property)])
      return el.style[property] || value
    } : (ie && html.currentStyle) ?

    function (el, property) {
      property = camelize(property)
      property = property == 'float' ? 'styleFloat' : property

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
      return el.style[camelize(property)]
    }

  function insert(target, host, fn) {
    var i = 0, self = host || this, r = []
      , nodes = query && typeof target == 'string' && target.charAt(0) != '<' ? function (n) {
          return (n = query(target)) && (n.selected = 1) && n
        }() : target
    each(normalize(nodes), function (t) {
      each(self, function (el) {
        var n = !el[parentNode] || (el[parentNode] && !el[parentNode][parentNode]) ?
                  function () {
                    var c = el.cloneNode(true)
                    self.$ && self.cloneEvents && self.$(c).cloneEvents(el)
                    return c;
                  }() :
                  el
        fn(t, n)
        r[i] = n
        i++
      });
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

  function hasClass(el, c) {
    return classReg(c).test(el.className)
  }
  function addClass(el, c) {
    el.className = trim(el.className + ' ' + c)
  }
  function removeClass(el, c) {
    el.className = trim(el.className.replace(classReg(c), ' '))
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

      get: function (index) {
        return this[index]
      }

    , each: function (fn, scope) {
        return each(this, fn, scope)
      }

    , map: function (fn, reject) {
        var m = [], n, i
        for (i = 0; i < this.length; i++) {
          n = fn.call(this, this[i], i)
          reject ? (reject(n) && m.push(n)) : m.push(n)
        }
        return m
      }

    , first: function () {
        return bonzo(this[0])
      }

    , last: function () {
        return bonzo(this[this.length - 1])
      }

    , html: function (h, text) {
        var method = text ?
          html.textContent === null ?
            'innerText' :
            'textContent' :
          'innerHTML', m;
        function append(el) {
          while (el.firstChild) el.removeChild(el.firstChild)
          each(normalize(h), function (node) {
            el.appendChild(node)
          })
        }
        return typeof h !== 'undefined' ?
            this.each(function (el) {
              (m = el.tagName.match(specialTags)) ?
                append(el, m[0]) :
                (el[method] = h)
            }) :
          this[0] ? this[0][method] : ''
      }

    , text: function (text) {
        return this.html(text, 1)
      }

    , addClass: function (c) {
        return this.each(function (el) {
          hasClass(el, c) || addClass(el, c)
        })
      }

    , removeClass: function (c) {
        return this.each(function (el) {
          hasClass(el, c) && removeClass(el, c)
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

    , show: function (type) {
        return this.each(function (el) {
          el.style.display = type || ''
        })
      }

    , hide: function (elements) {
        return this.each(function (el) {
          el.style.display = 'none'
        })
      }

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

    , next: function () {
        return this.related('nextSibling')
      }

    , previous: function () {
        return this.related('previousSibling')
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

    , css: function (o, v, p) {
        // is this a request for just getting a style?
        if (v === undefined && typeof o == 'string') {
          // repurpose 'v'
          v = this[0];
          if (!v) {
            return null
          }
          if (v == doc || v == win) {
            p = (v == doc) ? bonzo.doc() : bonzo.viewport()
            return o == 'width' ? p.width : o == 'height' ? p.height : ''
          }
          return getStyle(v, o)
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

        if (v = iter['float']) {
          // float is a reserved style word. w3 uses cssFloat, ie uses styleFloat
          ie ? (iter.styleFloat = v) : (iter.cssFloat = v);
          delete iter['float'];
        }

        function fn(el, p, v) {
          for (var k in iter) {
            if (iter.hasOwnProperty(k)) {
              v = iter[k];
              // change "5" to "5px" - unless you're line-height, which is allowed
              (p = camelize(k)) && digit.test(v) && !(p in unitless) && (v += px)
              p = p == 'transform' ? transform : p
              p = p == 'transformOrigin' ? transform + 'Origin' : p
              el.style[p] = v
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
              true : el[k] : el[getAttribute](k) :
          this.each(function (el) {
            k == 'value' ? (el.value = v) : el[setAttribute](k, v)
          })
      }

    , val: function (s) {
        return (typeof s == 'string') ? this.attr('value', s) : this[0].value
      }

    , removeAttr: function (k) {
        return this.each(function (el) {
          el.removeAttribute(k)
        })
      }

    , data: function (k, v) {
        var el = this[0]
        if (typeof v === 'undefined') {
          el[getAttribute]('data-node-uid') || el[setAttribute]('data-node-uid', ++uuids)
          var uid = el[getAttribute]('data-node-uid')
          uidList[uid] || (uidList[uid] = {})
          return uidList[uid][k]
        } else {
          return this.each(function (el) {
            el[getAttribute]('data-node-uid') || el[setAttribute]('data-node-uid', ++uuids)
            var uid = el[getAttribute]('data-node-uid')
              , o = uidList[uid] || (uidList[uid] = {})
            o[k] = v
          })
        }
      }

    , remove: function () {
        return this.each(function (el) {
          el[parentNode] && el[parentNode].removeChild(el)
        })
      }

    , empty: function () {
        return this.each(function (el) {
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

    , scrollTop: function (y) {
        return scroll.call(this, null, y, 'y')
      }

    , scrollLeft: function (x) {
        return scroll.call(this, x, null, 'x')
      }

    , toggle: function(callback) {
        this.each(function (el) {
          el.style.display = (el.offsetWidth || el.offsetHeight) ? 'none' : 'block'
        })
        callback && callback()
        return this
      }
  }

  function normalize(node) {
    return typeof node == 'string' ? bonzo.create(node) : is(node) ? [node] : node // assume [nodes]
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
    for (var k in o) {
      o.hasOwnProperty(k) && ((target || Bonzo.prototype)[k] = o[k])
    }
  }

  bonzo.create = function (node) {
    return typeof node == 'string' ?
      function () {
        var tag = /^<([^\s>]+)/.exec(node)
          , el = doc.createElement(tag && tagMap[tag[1].toLowerCase()] || 'div'), els = []
        el.innerHTML = node
        var nodes = el.childNodes
        el = el.firstChild
        els.push(el)
        while (el = el.nextSibling) (el.nodeType == 1) && els.push(el)
        return els

      }() : is(node) ? [node.cloneNode(true)] : []
  }

  bonzo.doc = function () {
    var vp = this.viewport()
    return {
        width: Math.max(doc.body.scrollWidth, html.scrollWidth, vp.width)
      , height: Math.max(doc.body.scrollHeight, html.scrollHeight, vp.height)
    }
  }

  bonzo.firstChild = function (el) {
    for (var c = el.childNodes, i = 0, j = (c && c.length) || 0, e; i < j; i++) {
      if (c[i].nodeType === 1) {
        e = c[j = i]
      }
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

  var old = context.bonzo
  bonzo.noConflict = function () {
    context.bonzo = old
    return this
  }

  return bonzo
})
