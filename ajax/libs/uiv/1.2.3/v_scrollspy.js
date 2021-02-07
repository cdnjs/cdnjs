// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
function assign (target, varArgs) {
  var arguments$1 = arguments;

  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  var to = Object(target);
  for (var index = 1; index < arguments.length; index++) {
    var nextSource = arguments$1[index];
    if (nextSource !== null && nextSource !== undefined) {
      for (var nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        /* istanbul ignore else */
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to
}

function nodeListToArray (nodeList) {
  return Array.prototype.slice.call(nodeList || [])
}

var EVENTS = {
  MOUSE_ENTER: 'mouseenter',
  MOUSE_LEAVE: 'mouseleave',
  MOUSE_DOWN: 'mousedown',
  MOUSE_UP: 'mouseup',
  FOCUS: 'focus',
  BLUR: 'blur',
  CLICK: 'click',
  INPUT: 'input',
  KEY_DOWN: 'keydown',
  KEY_UP: 'keyup',
  KEY_PRESS: 'keypress',
  RESIZE: 'resize',
  SCROLL: 'scroll',
  TOUCH_START: 'touchstart',
  TOUCH_END: 'touchend'
};

function getViewportSize () {
  /* istanbul ignore next */
  var width = Math.max(document.documentElement.clientWidth, window.innerWidth) || 0;
  /* istanbul ignore next */
  var height = Math.max(document.documentElement.clientHeight, window.innerHeight) || 0;
  return { width: width, height: height }
}

function on (element, event, handler) {
  /* istanbul ignore next */
  element.addEventListener(event, handler);
}

function off (element, event, handler) {
  /* istanbul ignore next */
  element.removeEventListener(event, handler);
}

function isElement (el) {
  return el && el.nodeType === Node.ELEMENT_NODE
}

function ensureElementMatchesFunction () {
  /* istanbul ignore next */
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s);
        var i = matches.length;
        // eslint-disable-next-line no-empty
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1
      };
  }
}

function addClass (el, className) {
  if (!isElement(el)) {
    return
  }
  if (el.className) {
    var classes = el.className.split(' ');
    if (classes.indexOf(className) < 0) {
      classes.push(className);
      el.className = classes.join(' ');
    }
  } else {
    el.className = className;
  }
}

function removeClass (el, className) {
  if (!isElement(el)) {
    return
  }
  if (el.className) {
    var classes = el.className.split(' ');
    var newClasses = [];
    for (var i = 0, l = classes.length; i < l; i++) {
      if (classes[i] !== className) {
        newClasses.push(classes[i]);
      }
    }
    el.className = newClasses.join(' ');
  }
}

function getClosest (el, selector) {
  ensureElementMatchesFunction();
  var parent;
  var _el = el;
  while (_el) {
    parent = _el.parentElement;
    if (parent && parent.matches(selector)) {
      return parent
    }
    _el = parent;
  }
  return null
}

function getParents (el, selector, until) {
  if ( until === void 0 ) until = null;

  ensureElementMatchesFunction();
  var parents = [];
  var parent = el.parentElement;
  while (parent) {
    if (parent.matches(selector)) {
      parents.push(parent);
    } else if (until && (until === parent || parent.matches(until))) {
      break
    }
    parent = parent.parentElement;
  }
  return parents
}

function ScrollSpy (element, target, options) {
  if ( target === void 0 ) target = 'body';
  if ( options === void 0 ) options = {};

  this.el = element;
  this.opts = assign({}, ScrollSpy.DEFAULTS, options);
  this.opts.target = target;
  if (target === 'body') {
    this.scrollElement = window;
  } else {
    this.scrollElement = document.querySelector(("[id=" + target + "]"));
  }
  this.selector = 'li > a';
  this.offsets = [];
  this.targets = [];
  this.activeTarget = null;
  this.scrollHeight = 0;
  if (this.scrollElement) {
    this.refresh();
    this.process();
  }
}

ScrollSpy.DEFAULTS = {
  offset: 10,
  callback: function (ele) { return 0; }
};

ScrollSpy.prototype.getScrollHeight = function () {
  return this.scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
};

ScrollSpy.prototype.refresh = function () {
  var this$1 = this;

  this.offsets = [];
  this.targets = [];
  this.scrollHeight = this.getScrollHeight();
  var list = nodeListToArray(this.el.querySelectorAll(this.selector));
  var isWindow = this.scrollElement === window;
  list
    .map(function (ele) {
      var href = ele.getAttribute('href');
      if (/^#./.test(href)) {
        var rootEl = isWindow ? document : this$1.scrollElement;
        var hrefEl = rootEl.querySelector(("[id='" + (href.slice(1)) + "']"));
        var offset = isWindow ? hrefEl.getBoundingClientRect().top : hrefEl.offsetTop;
        return [offset, href]
      } else {
        return null
      }
    })
    .filter(function (item) { return item; })
    .sort(function (a, b) { return a[0] - b[0]; })
    .forEach(function (item) {
      this$1.offsets.push(item[0]);
      this$1.targets.push(item[1]);
    });
  // console.log(this.offsets, this.targets)
};

ScrollSpy.prototype.process = function () {
  var isWindow = this.scrollElement === window;
  var scrollTop = (isWindow ? window.pageYOffset : this.scrollElement.scrollTop) + this.opts.offset;
  var scrollHeight = this.getScrollHeight();
  var scrollElementHeight = isWindow ? getViewportSize().height : this.scrollElement.getBoundingClientRect().height;
  var maxScroll = this.opts.offset + scrollHeight - scrollElementHeight;
  var offsets = this.offsets;
  var targets = this.targets;
  var activeTarget = this.activeTarget;
  var i;
  if (this.scrollHeight !== scrollHeight) {
    this.refresh();
  }
  if (scrollTop >= maxScroll) {
    return activeTarget !== (i = targets[targets.length - 1]) && this.activate(i)
  }
  if (activeTarget && scrollTop < offsets[0]) {
    this.activeTarget = null;
    return this.clear()
  }
  for (i = offsets.length; i--;) {
    activeTarget !== targets[i] &&
    scrollTop >= offsets[i] &&
    (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) &&
    this.activate(targets[i]);
  }
};

ScrollSpy.prototype.activate = function (target) {
  this.activeTarget = target;
  this.clear();
  var selector = this.selector +
    '[data-target="' + target + '"],' +
    this.selector + '[href="' + target + '"]';
  var activeCallback = this.opts.callback;
  var active = nodeListToArray(this.el.querySelectorAll(selector));
  active.forEach(function (ele) {
    getParents(ele, 'li')
      .forEach(function (item) {
        addClass(item, 'active');
        activeCallback(item);
      });
    if (getParents(ele, '.dropdown-menu').length) {
      addClass(getClosest(ele, 'li.dropdown'), 'active');
    }
  });
};

ScrollSpy.prototype.clear = function () {
  var this$1 = this;

  var list = nodeListToArray(this.el.querySelectorAll(this.selector));
  list.forEach(function (ele) {
    getParents(ele, '.active', this$1.opts.target).forEach(function (item) {
      removeClass(item, 'active');
    });
  });
};

var INSTANCE = '_uiv_scrollspy_instance';
var events = [EVENTS.RESIZE, EVENTS.SCROLL];

var bind = function (el, binding) {
  // console.log('bind')
  unbind(el);
};

var inserted = function (el, binding) {
  // console.log('inserted')
  var scrollSpy = new ScrollSpy(el, binding.arg, binding.value);
  if (scrollSpy.scrollElement) {
    scrollSpy.handler = function () {
      scrollSpy.process();
    };
    events.forEach(function (event) {
      on(scrollSpy.scrollElement, event, scrollSpy.handler);
    });
  }
  el[INSTANCE] = scrollSpy;
};

var unbind = function (el) {
  // console.log('unbind')
  var instance = el[INSTANCE];
  if (instance && instance.scrollElement) {
    events.forEach(function (event) {
      off(instance.scrollElement, event, instance.handler);
    });
    delete el[INSTANCE];
  }
};

var update = function (el, binding) {
  // console.log('update')
  var isArgUpdated = binding.arg !== binding.oldArg;
  var isValueUpdated = binding.value !== binding.oldValue;
  if (isArgUpdated || isValueUpdated) {
    bind(el);
    inserted(el, binding);
  }
};

var scrollspy = { bind: bind, unbind: unbind, update: update, inserted: inserted };

export default scrollspy;
//# sourceMappingURL=v_scrollspy.js.map
