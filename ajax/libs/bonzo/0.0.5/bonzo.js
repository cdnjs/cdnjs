/*!
  * bonzo.js - copyright @dedfat 2011
  * https://github.com/ded/bonzo
  * Follow our software http://twitter.com/dedfat
  * MIT License
  */
!function (context) {

  var doc = document,
      html = (doc.compatMode == 'CSS1Compat') ?
        doc.documentElement :
        doc.body,
      specialAttributes = /^checked|value|selected$/,
      stateAttributes = /^checked|selected$/,
      ie = /msie/.test(navigator.userAgent);

  function classReg(c) {
    return new RegExp("(^|\\s+)" + c + "(\\s+|$)");
  }

  function each(ar, fn) {
    for (i = 0, len = ar.length; i < len; i++) {
      fn(ar[i]);
    }
  }

  function trim(s) {
    return s.replace(/(^\s*|\s*$)/g, '');
  }

  function camelize(s) {
    return s.replace(/-(.)/g, function (m, m1) {
      return m1.toUpperCase();
    });
  }

  function is(node) {
    return node && node.nodeName && node.nodeType == 1;
  }

  function some(ar, fn, scope) {
    for (var i = 0, j = ar.length; i < j; ++i) {
      if (fn.call(scope, ar[i], i, ar)) {
        return true;
      }
    }
    return false;
  }

  function _bonzo(elements) {
    this.elements = elements && Object.prototype.hasOwnProperty.call(elements, 'length') ? elements : [elements];
  }

  _bonzo.prototype = {

    each: function (fn) {
      for (var i = 0; i  < this.elements.length; i++) {
        fn.call(this, this.elements[i]);
      }
      return this;
    },

    map: function (fn, include) {
      var m = [], n;
      for (var i = 0; i < this.elements.length; i++) {
        n = fn.call(this, this.elements[i]);
        include ? (include(n) && m.push(n)) : m.push(n);
      }
      return m;
    },

    first: function () {
      this.elements = [this.elements[0]];
      return this;
    },

    last: function () {
      this.elements = [this.elements[this.elements.length - 1]];
      return this;
    },

    html: function (html) {
      return typeof html == 'string' ?
        this.each(function (el) {
          el.innerHTML = html;
        }) :
        this.elements[0].innerHTML;
    },

    addClass: function (c) {
      return this.each(function (el) {
        this.hasClass(el, c) || (el.className = trim(el.className + ' ' + c));
      });
    },

    removeClass: function (c) {
      return this.each(function (el) {
        this.hasClass(el, c) && (el.className = trim(el.className.replace(classReg(c), ' ')));
      });
    },

    hasClass: function (el, c) {
      return typeof c == 'undefined' ?
        some(this.elements, function (i) {
          return classReg(el).test(i.className);
        }) :
        classReg(c).test(el.className);
    },

    show: function (elements) {
      return this.each(function (el) {
        el.style.display = '';
      });
    },

    hide: function (elements) {
      return this.each(function (el) {
        el.style.display = 'none';
      });
    },

    append: function (node) {
      return this.each(function (el) {
        each(bonzo.create(node), function (i) {
          el.appendChild(i);
        });
      });
    },

    prepend: function (node) {
      return this.each(function (el) {
        var first = el.firstChild;
        each(bonzo.create(node), function (i) {
          el.insertBefore(i, first);
        });
      });
    },

    appendTo: function (target) {
      return this.each(function (el) {
        target.appendChild(el);
      });
    },

    next: function () {
      return this.related('nextSibling');
    },

    previous: function () {
      return this.related('previousSibling');
    },

    related: function (method) {
      this.elements = this.map(
        function (el) {
          el = el[method];
          while (el && el.nodeType !== 1) {
            el = el[method];
          }
          return el || 0;
        },
        function (el) {
          return el;
        }
      );
      return this;
    },

    prependTo: function (target) {
      return this.each(function (el) {
        target.insertBefore(el, bonzo.firstChild(target));
      });
    },

    before: function (node) {
      return this.each(function (el) {
        each(bonzo.create(node), function (i) {
          el.parentNode.insertBefore(i, el);
        });
      });
    },

    after: function (node) {
      return this.each(function (el) {
        each(bonzo.create(node), function (i) {
          el.parentNode.insertBefore(i, el.nextSibling);
        });
      });
    },

    css: function (o, v) {
      var fn = typeof o == 'string' ?
        function (el) {
          el.style[camelize(o)] = v;
        } :
        function (el) {
          for (var k in o) {
            o.hasOwnProperty(k) && (el.style[camelize(k)] = o[k]);
          }
        };
      return this.each(fn);
    },

    offset: function () {
      var el = this.elements[0];
      var width = el.offsetWidth;
      var height = el.offsetHeight;
      var top = el.offsetTop;
      var left = el.offsetLeft;
      while (el = el.offsetParent) {
        top = top + el.offsetTop;
        left = left + el.offsetLeft;
      }

      return {
        top: top,
        left: left,
        height: height,
        width: width
      };
    },

    attr: function (k, v) {
      var el = this.elements[0];
      return typeof v == 'undefined' ?
        specialAttributes.test(k) ?
          stateAttributes.test(k) && typeof el[k] == 'string' ?
            true : el[k] : el.getAttribute(k) :
        this.each(function (el) {
          el.setAttribute(k, v);
        });
    },

    remove: function () {
      return this.each(function (el) {
        el.parentNode.removeChild(el);
      });
    },

    empty: function () {
      return this.each(function (el) {
        while (el.firstChild) {
          el.removeChild(el.firstChild);
        }
      });
    },

    detach: function () {
      return this.map(function (el) {
        return el.parentNode.removeChild(el);
      });
    },

    scrollTop: function (y) {
      return scroll.call(this, null, y, 'y');
    },

    scrollLeft: function (x) {
      return scroll.call(this, x, null, 'x');
    }

  };

  function scroll(x, y, type) {
    var el = this.elements[0];
    if (x == null && y == null) {
      return (isBody(el) ? getWindowScroll() : { x: el.scrollLeft, y: el.scrollTop })[type];
    }
    if (isBody(el)) {
      window.scrollTo(x, y);
    } else {
      x != null && (el.scrollLeft = x);
      y != null && (el.scrollTop = y);
    }
    return this;
  }

  function isBody(element) {
    return element === window || (/^(?:body|html)$/i).test(element.tagName);
  }

  function getWindowScroll() {
    return { x: window.pageXOffset || html.scrollLeft, y: window.pageYOffset || html.scrollTop };
  }

  function bonzo(els) {
    return new _bonzo(els);
  }

  bonzo.aug = function (o, target) {
    for (var k in o) {
      o.hasOwnProperty(k) && ((target || _bonzo.prototype)[k] = o[k]);
    }
  };

  bonzo.create = function (node) {
    return typeof node == 'string' ?
      function () {
        var el = doc.createElement('div'), els = [];
        el.innerHTML = node;
        var nodes = el.childNodes;
        el = el.firstChild;
        els.push(el);
        while (el = el.nextSibling) {
          (el.nodeType == 1) && els.push(el);
        }
        return els;

      }() : is(node) ? [node.cloneNode(true)] : [];
  };

  bonzo.doc = function () {
    var w = html.scrollWidth,
        h = html.scrollHeight,
        vp = this.viewport();
    return {
      width: Math.max(w, vp.width),
      height: Math.max(h, vp.height)
    };
  };

  bonzo.firstChild = function (el) {
    for (var c = el.childNodes, i = 0, j = (c && c.length) || 0, e; i < j; i++) {
      if (c[i].nodeType === 1) {
        e = c[j = i];
      }
    }
    return e;
  };

  bonzo.viewport = function () {
    var h = self.innerHeight,
        w = self.innerWidth;
    ie && (h = html.clientHeight) && (w = html.clientWidth);
    return {
      width: w,
      height: h
    };
  };

  bonzo.contains = 'compareDocumentPosition' in html ?
    function (container, element) {
      return (container.compareDocumentPosition(element) & 16) == 16;
    } : 'contains' in html ?
    function (container, element) {
      return container !== element && container.contains(element);
    } :
    function (container, element) {
      while (element = element.parentNode) {
        if (element === container) {
          return true;
        }
      }
      return false;
    };

  var old = context.bonzo;
  bonzo.noConflict = function () {
    context.bonzo = old;
    return this;
  };
  context.bonzo = bonzo;

}(this);