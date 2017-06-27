(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Zooming = factory());
}(this, (function () { 'use strict';

var body = document.body;
var docElm = document.documentElement;
var webkitPrefix = 'WebkitAppearance' in document.documentElement.style ? '-webkit-' : '';

var divide = function divide(denominator) {
  return function (numerator) {
    return numerator / denominator;
  };
};

var half = divide(2);

var loadImage = function loadImage(url, cb) {
  var img = new Image();
  img.onload = function () {
    if (cb) cb(img);
  };
  img.src = url;
};

var scrollTop = function scrollTop() {
  return window.pageYOffset || (docElm || body.parentNode || body).scrollTop;
};

var getWindowCenter = function getWindowCenter() {
  var docWidth = docElm.clientWidth || body.clientWidth;
  var docHeight = docElm.clientHeight || body.clientHeight;

  return {
    x: half(docWidth),
    y: half(docHeight)
  };
};

var toggleListeners = function toggleListeners(el, types, handler) {
  var add = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  types.forEach(function (t) {
    if (add) {
      el.addEventListener(t, handler[t]);
    } else {
      el.removeEventListener(t, handler[t]);
    }
  });
};

var sniffTransition = function sniffTransition(el) {
  var ret = {};
  var trans = ['webkitTransition', 'transition', 'mozTransition'];
  var tform = ['webkitTransform', 'transform', 'mozTransform'];
  var end = {
    'transition': 'transitionend',
    'mozTransition': 'transitionend',
    'webkitTransition': 'webkitTransitionEnd'
  };

  trans.some(function (prop) {
    if (el.style[prop] !== undefined) {
      ret.transitionProp = prop;
      ret.transEndEvent = end[prop];
      return true;
    }
  });

  tform.some(function (prop) {
    if (el.style[prop] !== undefined) {
      ret.transformProp = prop;
      ret.transformCssProp = prop.replace(/(.*)Transform/, '-$1-transform');
      return true;
    }
  });

  return ret;
};

var trans = sniffTransition(document.createElement('div'));
var transitionProp = trans.transitionProp;
var transformProp = trans.transformProp;
var transformCssProp = trans.transformCssProp;
var transEndEvent = trans.transEndEvent;

var setStyle = function setStyle(el, styles, remember) {
  var value = void 0;
  if (styles.transition) {
    value = styles.transition;
    delete styles.transition;
    styles[transitionProp] = value;
  }
  if (styles.transform) {
    value = styles.transform;
    delete styles.transform;
    styles[transformProp] = value;
  }

  var s = el.style;
  var original = {};

  for (var key in styles) {
    if (remember) original[key] = s[key] || '';
    s[key] = styles[key];
  }

  return original;
};

function Style(options) {
  return {
    target: {
      close: null,
      open: null
    },
    overlay: {
      init: {
        zIndex: 998,
        backgroundColor: options.bgColor,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        transition: 'opacity\n          ' + options.transitionDuration + 's\n          ' + options.transitionTimingFunction
      }
    },
    cursor: {
      default: 'auto',
      zoomIn: webkitPrefix + 'zoom-in',
      zoomOut: webkitPrefix + 'zoom-out',
      grab: webkitPrefix + 'grab',
      move: 'move'
    }
  };
}

/**
 * A list of options.
 *
 * @type {Object}
 * @example
 * // Default options
 * var options = {
 *   defaultZoomable: 'img[data-action="zoom"]',
 *   enableGrab: true,
 *   preloadImage: true,
 *   transitionDuration: 0.4,
 *   transitionTimingFunction: 'cubic-bezier(0.4, 0, 0, 1)',
 *   bgColor: 'rgb(255, 255, 255)',
 *   bgOpacity: 1,
 *   scaleBase: 1.0,
 *   scaleExtra: 0.5,
 *   scrollThreshold: 40,
 *   onOpen: null,
 *   onClose: null,
 *   onRelease: null,
 *   onBeforeOpen: null,
 *   onBeforeClose: null,
 *   onBeforeGrab: null,
 *   onBeforeMove: null,
 *   onBeforeRelease: null
 * }
 */
var OPTIONS = {
  /**
   * Zoomable elements by default. It can be a css selector or an element.
   * @type {string|Element}
   */
  defaultZoomable: 'img[data-action="zoom"]',

  /**
   * To be able to grab and drag the image for extra zoom-in.
   * @type {boolean}
   */
  enableGrab: true,

  /**
   * Preload images with attribute "data-original".
   * @type {boolean}
   */
  preloadImage: true,

  /**
   * Transition duration in seconds.
   * @type {number}
   */
  transitionDuration: 0.4,

  /**
   * Transition timing function.
   * @type {string}
   */
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0, 1)',

  /**
   * Overlay background color.
   * @type {string}
   */
  bgColor: 'rgb(255, 255, 255)',

  /**
   * Overlay background opacity.
   * @type {number}
   */
  bgOpacity: 1,

  /**
   * The base scale factor for zooming. By default scale to fit the window.
   * @type {number}
   */
  scaleBase: 1.0,

  /**
   * The extra scale factor when grabbing the image.
   * @type {number}
   */
  scaleExtra: 0.5,

  /**
   * How much scrolling it takes before closing out.
   * @type {number}
   */
  scrollThreshold: 40,

  /**
   * A callback function that will be called when a target is opened and
   * transition has ended. It will get the target element as the argument.
   * @type {Function}
   */
  onOpen: null,

  /**
   * Same as above, except fired when closed.
   * @type {Function}
   */
  onClose: null,

  /**
   * Same as above, except fired when released.
   * @type {Function}
   */
  onRelease: null,

  /**
   * A callback function that will be called before open.
   * @type {Function}
   */
  onBeforeOpen: null,

  /**
   * A callback function that will be called before close.
   * @type {Function}
   */
  onBeforeClose: null,

  /**
   * A callback function that will be called before grab.
   * @type {Function}
   */
  onBeforeGrab: null,

  /**
   * A callback function that will be called before move.
   * @type {Function}
   */
  onBeforeMove: null,

  /**
   * A callback function that will be called before release.
   * @type {Function}
   */
  onBeforeRelease: null
};

var PRESS_DELAY = 200;
var EVENT_TYPES_GRAB = ['mousedown', 'mousemove', 'mouseup', 'touchstart', 'touchmove', 'touchend'];
var TOUCH_SCALE_FACTOR = 2;

var processTouches = function processTouches(touches, currScaleExtra, cb) {
  var total = touches.length;
  var firstTouch = touches[0];
  var multitouch = total > 1;

  var scaleExtra = currScaleExtra;
  var i = touches.length;
  var xs = 0,
      ys = 0;

  // keep track of the min and max of touch positions

  var min = { x: firstTouch.clientX, y: firstTouch.clientY };
  var max = { x: firstTouch.clientX, y: firstTouch.clientY };

  while (i--) {
    var t = touches[i];
    var _ref = [t.clientX, t.clientY],
        x = _ref[0],
        y = _ref[1];

    xs += x;
    ys += y;

    if (!multitouch) continue;

    if (x < min.x) {
      min.x = x;
    } else if (x > max.x) {
      max.x = x;
    }

    if (y < min.y) {
      min.y = y;
    } else if (y > max.y) {
      max.y = y;
    }
  }

  if (multitouch) {
    // change scaleExtra dynamically
    var distX = max.x - min.x,
        distY = max.y - min.y;


    if (distX > distY) {
      scaleExtra = distX / window.innerWidth * TOUCH_SCALE_FACTOR;
    } else {
      scaleExtra = distY / window.innerHeight * TOUCH_SCALE_FACTOR;
    }
  }

  cb(xs / total, ys / total, scaleExtra);
};

function EventHandler(instance) {

  var handler = {

    click: function click(e) {
      e.preventDefault();

      if (instance.shown) {
        if (instance.released) instance.close();else instance.release();
      } else {
        instance.open(e.currentTarget);
      }
    },

    scroll: function scroll() {
      var st = scrollTop();

      if (instance.lastScrollPosition === null) {
        instance.lastScrollPosition = st;
      }

      var deltaY = instance.lastScrollPosition - st;

      if (Math.abs(deltaY) >= instance.options.scrollThreshold) {
        instance.lastScrollPosition = null;
        instance.close();
      }
    },

    keydown: function keydown(e) {
      var code = e.key || e.code;
      if (code === 'Escape' || e.keyCode === 27) {
        if (instance.released) instance.close();else instance.release(function () {
          return instance.close();
        });
      }
    },

    mousedown: function mousedown(e) {
      if (e.button !== 0) return;
      e.preventDefault();

      instance.pressTimer = setTimeout(function () {
        instance.grab(e.clientX, e.clientY);
      }, PRESS_DELAY);
    },

    mousemove: function mousemove(e) {
      if (instance.released) return;
      instance.move(e.clientX, e.clientY);
    },

    mouseup: function mouseup(e) {
      if (e.button !== 0) return;
      clearTimeout(instance.pressTimer);

      if (instance.released) instance.close();else instance.release();
    },

    touchstart: function touchstart(e) {
      e.preventDefault();

      instance.pressTimer = setTimeout(function () {
        processTouches(e.touches, instance.options.scaleExtra, function (x, y, scaleExtra) {
          instance.grab(x, y, scaleExtra);
        });
      }, PRESS_DELAY);
    },

    touchmove: function touchmove(e) {
      if (instance.released) return;

      processTouches(e.touches, instance.options.scaleExtra, function (x, y, scaleExtra) {
        instance.move(x, y, scaleExtra);
      });
    },

    touchend: function touchend(e) {
      if (e.targetTouches.length > 0) return;
      clearTimeout(instance.pressTimer);

      if (instance.released) instance.close();else instance.release();
    }
  };

  for (var fn in handler) {
    handler[fn] = handler[fn].bind(instance);
  }

  return handler;
}

var calculateTranslate = function calculateTranslate(rect) {
  var windowCenter = getWindowCenter();
  var targetCenter = {
    x: rect.left + half(rect.width),
    y: rect.top + half(rect.height)
  };

  // The vector to translate image to the window center
  return {
    x: windowCenter.x - targetCenter.x,
    y: windowCenter.y - targetCenter.y
  };
};

var calculateScale = function calculateScale(rect, scaleBase) {
  var windowCenter = getWindowCenter();
  var targetHalfWidth = half(rect.width);
  var targetHalfHeight = half(rect.height);

  // The distance between target edge and window edge
  var targetEdgeToWindowEdge = {
    x: windowCenter.x - targetHalfWidth,
    y: windowCenter.y - targetHalfHeight
  };

  var scaleHorizontally = targetEdgeToWindowEdge.x / targetHalfWidth;
  var scaleVertically = targetEdgeToWindowEdge.y / targetHalfHeight;

  // The additional scale is based on the smaller value of
  // scaling horizontally and scaling vertically
  return scaleBase + Math.min(scaleHorizontally, scaleVertically);
};

/**
 * Zooming instance.
 * @param {Object} [options] Update default options if provided.
 */
function Zooming(options) {
  var _this = this;

  // elements
  this.body = document.body;
  this.overlay = document.createElement('div');
  this.target = null;
  this.parent = null;

  // state
  this.shown = false; // target is open
  this.lock = false; // target is in transform
  this.released = true; // mouse/finger is not pressing down
  this.lastScrollPosition = null;
  this.translate = null;
  this.scale = null;
  this.srcThumbnail = null;
  this.pressTimer = null;

  this.options = Object.assign({}, OPTIONS);
  if (options) this.config(options);
  this.style = new Style(this.options);
  this.eventHandler = new EventHandler(this);

  // init overlay
  setStyle(this.overlay, this.style.overlay.init);
  this.overlay.addEventListener('click', function () {
    return _this.close();
  });
}

Zooming.prototype = {

  /**
   * Make element(s) zoomable.
   * @param  {string|Element} el A css selector or an Element.
   * @return {this}
   */
  listen: function listen(el) {
    if (typeof el === 'string') {
      var els = document.querySelectorAll(el),
          i = els.length;

      while (i--) {
        this.listen(els[i]);
      }

      return this;
    }

    if (el.tagName !== 'IMG') return;

    el.style.cursor = this.style.cursor.zoomIn;

    el.addEventListener('click', this.eventHandler.click);

    if (this.options.preloadImage && el.hasAttribute('data-original')) {
      loadImage(el.getAttribute('data-original'));
    }

    return this;
  },

  /**
   * Open (zoom in) the Element.
   * @param  {Element} el The Element to open.
   * @param  {Function} [cb=this.options.onOpen] A callback function that will
   * be called when a target is opened and transition has ended. It will get
   * the target element as the argument.
   * @return {this}
   */
  open: function open(el) {
    var _this2 = this;

    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.options.onOpen;

    if (this.shown || this.lock) return;

    this.target = typeof el === 'string' ? document.querySelector(el) : el;

    if (this.target.tagName !== 'IMG') return;

    // onBeforeOpen event
    if (this.options.onBeforeOpen) this.options.onBeforeOpen(this.target);

    this.shown = true;
    this.lock = true;
    this.parent = this.target.parentNode;

    // load hi-res image if preloadImage option is disabled
    if (!this.options.preloadImage && this.target.hasAttribute('data-original')) {
      loadImage(this.target.getAttribute('data-original'));
    }

    var rect = this.target.getBoundingClientRect();
    this.translate = calculateTranslate(rect);
    this.scale = calculateScale(rect, this.options.scaleBase);

    // force layout update
    this.target.offsetWidth;

    this.style.target.open = {
      position: 'relative',
      zIndex: 999,
      cursor: this.options.enableGrab ? this.style.cursor.grab : this.style.cursor.zoomOut,
      transition: transformCssProp + '\n        ' + this.options.transitionDuration + 's\n        ' + this.options.transitionTimingFunction,
      transform: 'translate(' + this.translate.x + 'px, ' + this.translate.y + 'px)\n        scale(' + this.scale + ')'
    };

    // trigger transition
    this.style.target.close = setStyle(this.target, this.style.target.open, true);

    // insert this.overlay
    this.parent.appendChild(this.overlay);
    setTimeout(function () {
      return _this2.overlay.style.opacity = _this2.options.bgOpacity;
    }, 30);

    document.addEventListener('scroll', this.eventHandler.scroll);
    document.addEventListener('keydown', this.eventHandler.keydown);

    var onEnd = function onEnd() {
      _this2.target.removeEventListener(transEndEvent, onEnd);

      _this2.lock = false;

      if (_this2.options.enableGrab) {
        toggleListeners(document, EVENT_TYPES_GRAB, _this2.eventHandler, true);
      }

      if (_this2.target.hasAttribute('data-original')) {
        (function () {
          _this2.srcThumbnail = _this2.target.getAttribute('src');
          var dataOriginal = _this2.target.getAttribute('data-original');
          var temp = _this2.target.cloneNode(false);

          // force compute the hi-res image in DOM to prevent
          // image flickering while updating src
          temp.setAttribute('src', dataOriginal);
          temp.style.position = 'fixed';
          temp.style.visibility = 'hidden';
          _this2.body.appendChild(temp);

          setTimeout(function () {
            _this2.target.setAttribute('src', dataOriginal);
            _this2.body.removeChild(temp);
          }, 10);
        })();
      }

      if (cb) cb(_this2.target);
    };

    this.target.addEventListener(transEndEvent, onEnd);

    return this;
  },

  /**
   * Close (zoom out) the Element currently opened.
   * @param  {Function} [cb=this.options.onClose] A callback function that will
   * be called when a target is closed and transition has ended. It will get
   * the target element as the argument.
   * @return {this}
   */
  close: function close() {
    var _this3 = this;

    var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.onClose;

    if (!this.shown || this.lock) return;

    // onBeforeClose event
    if (this.options.onBeforeClose) this.options.onBeforeClose(this.target);

    this.lock = true;

    // force layout update
    this.target.offsetWidth;

    this.body.style.cursor = this.style.cursor.default;
    this.overlay.style.opacity = 0;
    setStyle(this.target, { transform: 'none' });

    document.removeEventListener('scroll', this.eventHandler.scroll);
    document.removeEventListener('keydown', this.eventHandler.keydown);

    var onEnd = function onEnd() {
      _this3.target.removeEventListener(transEndEvent, onEnd);

      _this3.shown = false;
      _this3.lock = false;

      if (_this3.options.enableGrab) {
        toggleListeners(document, EVENT_TYPES_GRAB, _this3.eventHandler, false);
      }

      if (_this3.target.hasAttribute('data-original')) {
        // downgrade source
        _this3.target.setAttribute('src', _this3.srcThumbnail);
      }

      // trigger transition
      setStyle(_this3.target, _this3.style.target.close);

      // remove overlay
      _this3.parent.removeChild(_this3.overlay);

      if (cb) cb(_this3.target);
    };

    this.target.addEventListener(transEndEvent, onEnd);

    return this;
  },

  /**
   * Grab the Element currently opened given a position and apply extra zoom-in.
   * @param  {number}   x The X-axis of where the press happened.
   * @param  {number}   y The Y-axis of where the press happened.
   * @param  {number}   scaleExtra Extra zoom-in to apply.
   * @param  {Function} [cb=this.options.scaleExtra] A callback function that
   * will be called when a target is grabbed and transition has ended. It
   * will get the target element as the argument.
   * @return {this}
   */
  grab: function grab(x, y) {
    var _this4 = this;

    var scaleExtra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.options.scaleExtra;
    var cb = arguments[3];

    if (!this.shown || this.lock) return;

    // onBeforeGrab event
    if (this.options.onBeforeGrab) this.options.onBeforeGrab(this.target);

    this.released = false;

    var windowCenter = getWindowCenter();
    var dx = windowCenter.x - x,
        dy = windowCenter.y - y;


    setStyle(this.target, {
      cursor: this.style.cursor.move,
      transform: 'translate(\n        ' + (this.translate.x + dx) + 'px, ' + (this.translate.y + dy) + 'px)\n        scale(' + (this.scale + scaleExtra) + ')'
    });

    var onEnd = function onEnd() {
      _this4.target.removeEventListener(transEndEvent, onEnd);
      if (cb) cb(_this4.target);
    };

    this.target.addEventListener(transEndEvent, onEnd);
  },

  /**
   * Move the Element currently grabbed given a position and apply extra zoom-in.
   * @param  {number}   x The X-axis of where the press happened.
   * @param  {number}   y The Y-axis of where the press happened.
   * @param  {number}   scaleExtra Extra zoom-in to apply.
   * @param  {Function} [cb=this.options.scaleExtra] A callback function that
   * will be called when a target is moved and transition has ended. It will
   * get the target element as the argument.
   * @return {this}
   */
  move: function move(x, y) {
    var _this5 = this;

    var scaleExtra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.options.scaleExtra;
    var cb = arguments[3];

    if (!this.shown || this.lock) return;

    // onBeforeMove event
    if (this.options.onBeforeMove) this.options.onBeforeMove(this.target);

    this.released = false;

    var windowCenter = getWindowCenter();
    var dx = windowCenter.x - x,
        dy = windowCenter.y - y;


    setStyle(this.target, {
      transition: transformCssProp,
      transform: 'translate(\n        ' + (this.translate.x + dx) + 'px, ' + (this.translate.y + dy) + 'px)\n        scale(' + (this.scale + scaleExtra) + ')'
    });

    this.body.style.cursor = this.style.cursor.move;

    var onEnd = function onEnd() {
      _this5.target.removeEventListener(transEndEvent, onEnd);
      if (cb) cb(_this5.target);
    };

    this.target.addEventListener(transEndEvent, onEnd);
  },

  /**
   * Release the Element currently grabbed.
   * @param  {Function} [cb=this.options.onRelease] A callback function that
   * will be called when a target is released and transition has ended. It
   * will get the target element as the argument.
   * @return {this}
   */
  release: function release() {
    var _this6 = this;

    var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.onRelease;

    if (!this.shown || this.lock) return;

    // onBeforeRelease event
    if (this.options.onBeforeRelease) this.options.onBeforeRelease(this.target);

    this.lock = true;

    setStyle(this.target, this.style.target.open);
    this.body.style.cursor = this.style.cursor.default;

    var onEnd = function onEnd() {
      _this6.target.removeEventListener(transEndEvent, onEnd);

      _this6.lock = false;
      _this6.released = true;

      if (cb) cb(_this6.target);
    };

    this.target.addEventListener(transEndEvent, onEnd);

    return this;
  },

  /**
   * Update options.
   * @param  {Object} options An Object that contains this.options.
   * @return {this}
   */
  config: function config(options) {
    if (!options) return this.options;

    for (var key in options) {
      this.options[key] = options[key];
    }

    setStyle(this.overlay, {
      backgroundColor: this.options.bgColor,
      transition: 'opacity\n        ' + this.options.transitionDuration + 's\n        ' + this.options.transitionTimingFunction
    });

    return this;
  }
};

document.addEventListener('DOMContentLoaded', function () {
  new Zooming().listen(OPTIONS.defaultZoomable);
});

return Zooming;

})));
//# sourceMappingURL=zooming.js.map
