(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Zooming = factory());
}(this, (function () { 'use strict';

var webkitPrefix = 'WebkitAppearance' in document.documentElement.style ? '-webkit-' : '';

var cursor = {
  default: 'auto',
  zoomIn: webkitPrefix + 'zoom-in',
  zoomOut: webkitPrefix + 'zoom-out',
  grab: webkitPrefix + 'grab',
  move: 'move'
};

function loadImage(src, cb) {
  if (!src) return;

  var img = new Image();
  img.onload = function () {
    if (cb) cb(img);
  };

  img.src = src;
}

function getOriginalSource(el) {
  if (el.hasAttribute('data-original')) {
    return el.getAttribute('data-original');
  } else if (el.parentNode.tagName === 'A') {
    return el.parentNode.getAttribute('href');
  }

  return null;
}

function setStyle(el, styles, remember) {
  checkTrans(styles);

  var s = el.style;
  var original = {};

  for (var key in styles) {
    if (remember) original[key] = s[key] || '';
    s[key] = styles[key];
  }

  return original;
}

function bindAll(_this, that) {
  var methods = Object.getOwnPropertyNames(Object.getPrototypeOf(_this));

  methods.forEach(function (method) {
    _this[method] = _this[method].bind(that);
  });
}

var trans = sniffTransition(document.createElement('div'));
var transformCssProp = trans.transformCssProp;
var transEndEvent = trans.transEndEvent;

function checkTrans(styles) {
  var transitionProp = trans.transitionProp;
  var transformProp = trans.transformProp;

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
}

function sniffTransition(el) {
  var ret = {};
  var trans = ['webkitTransition', 'transition', 'mozTransition'];
  var tform = ['webkitTransform', 'transform', 'mozTransform'];
  var end = {
    transition: 'transitionend',
    mozTransition: 'transitionend',
    webkitTransition: 'webkitTransitionEnd'
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
 *   preloadImage: false,
 *   transitionDuration: 0.4,
 *   transitionTimingFunction: 'cubic-bezier(0.4, 0, 0, 1)',
 *   bgColor: 'rgb(255, 255, 255)',
 *   bgOpacity: 1,
 *   scaleBase: 1.0,
 *   scaleExtra: 0.5,
 *   scrollThreshold: 40,
 *   zIndex: 998,
 *   customSize: null,
 *   onOpen: null,
 *   onClose: null,
 *   onRelease: null,
 *   onBeforeOpen: null,
 *   onBeforeClose: null,
 *   onBeforeGrab: null,
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
   * Preload zoomable images.
   * @type {boolean}
   */
  preloadImage: false,

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
   * The z-index that the overlay will be added with.
   * @type {number}
   */
  zIndex: 998,

  /**
   * Scale (zoom in) to given width and height. Ignore scaleBase if set.
   * @type {Object}
   * @example
   * customSize: { width: 800, height: 400 }
   */
  customSize: null,

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
   * A callback function that will be called before release.
   * @type {Function}
   */
  onBeforeRelease: null
};

var PRESS_DELAY = 200;
var MULTITOUCH_SCALE_FACTOR = 2;

var handler = {
  init: function init(instance) {
    bindAll(this, instance);
  },
  click: function click(e) {
    e.preventDefault();

    if (isPressingMetaKey(e)) {
      return window.open(this.target.srcOriginal || e.currentTarget.src, '_blank');
    } else {
      if (this.shown) {
        if (this.released) this.close();else this.release();
      } else {
        this.open(e.currentTarget);
      }
    }
  },
  scroll: function scroll() {
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;

    if (this.lastScrollPosition === null) {
      this.lastScrollPosition = scrollTop;
    }

    var deltaY = this.lastScrollPosition - scrollTop;

    if (Math.abs(deltaY) >= this.options.scrollThreshold) {
      this.lastScrollPosition = null;
      this.close();
    }
  },
  keydown: function keydown(e) {
    if (isEscape(e)) {
      if (this.released) {
        this.close();
      } else {
        this.release(this.close);
      }
    }
  },
  mousedown: function mousedown(e) {
    var _this = this;

    if (!isLeftButton(e) || isPressingMetaKey(e)) return;
    e.preventDefault();

    this.pressTimer = setTimeout(function () {
      _this.grab(e.clientX, e.clientY);
    }, PRESS_DELAY);
  },
  mousemove: function mousemove(e) {
    if (this.released) return;
    this.move(e.clientX, e.clientY);
  },
  mouseup: function mouseup(e) {
    if (!isLeftButton(e) || isPressingMetaKey(e)) return;
    clearTimeout(this.pressTimer);

    if (this.released) {
      this.close();
    } else {
      this.release();
    }
  },
  touchstart: function touchstart(e) {
    var _this2 = this;

    e.preventDefault();

    this.pressTimer = setTimeout(function () {
      processTouches(e.touches, _this2.options.scaleExtra, _this2.grab.bind(_this2));
    }, PRESS_DELAY);
  },
  touchmove: function touchmove(e) {
    if (this.released) return;

    processTouches(e.touches, this.options.scaleExtra, this.move.bind(this));
  },
  touchend: function touchend(e) {
    if (isTouching(e)) return;
    clearTimeout(this.pressTimer);

    if (this.released) {
      this.close();
    } else {
      this.release();
    }
  }
};

function isLeftButton(event) {
  return event.button === 0;
}

function isPressingMetaKey(event) {
  return event.metaKey || event.ctrlKey;
}

function isEscape(event) {
  var code = event.key || event.code;
  return code === 'Escape' || event.keyCode === 27;
}

function isTouching(event) {
  return event.targetTouches.length > 0;
}

function processTouches(touches, currScaleExtra, cb) {
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

    if (multitouch) {
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
  }

  if (multitouch) {
    // change scaleExtra dynamically
    var distX = max.x - min.x,
        distY = max.y - min.y;


    if (distX > distY) {
      scaleExtra = distX / window.innerWidth * MULTITOUCH_SCALE_FACTOR;
    } else {
      scaleExtra = distY / window.innerHeight * MULTITOUCH_SCALE_FACTOR;
    }
  }

  cb(xs / total, ys / total, scaleExtra);
}

var overlay = {
  init: function init(instance) {
    this.el = document.createElement('div');
    this.el.addEventListener('click', instance.close);
    this.instance = instance;
    this.parent = document.body;

    setStyle(this.el, {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0
    });

    this.updateStyle(instance.options);
  },
  updateStyle: function updateStyle(options) {
    setStyle(this.el, {
      zIndex: options.zIndex,
      backgroundColor: options.bgColor,
      transition: 'opacity\n        ' + options.transitionDuration + 's\n        ' + options.transitionTimingFunction
    });
  },
  create: function create() {
    this.parent.appendChild(this.el);
  },
  destroy: function destroy() {
    this.parent.removeChild(this.el);
  },
  show: function show() {
    var _this = this;

    setTimeout(function () {
      return _this.el.style.opacity = _this.instance.options.bgOpacity;
    }, 30);
  },
  hide: function hide() {
    this.el.style.opacity = 0;
  }
};

var target = {
  init: function init(el, instance) {
    this.el = el;
    this.instance = instance;
    this.srcThumbnail = this.el.getAttribute('src');
    this.srcOriginal = getOriginalSource(this.el);
    this.rect = el.getBoundingClientRect();
    this.translate = null;
    this.scale = null;
    this.styleOpen = null;
    this.styleClose = null;
  },
  zoomIn: function zoomIn() {
    var options = this.instance.options;

    this.translate = calculateTranslate(this.rect);
    this.scale = calculateScale(this.rect, options.scaleBase, options.customSize);

    // force layout update
    this.el.offsetWidth;

    this.styleOpen = {
      position: 'relative',
      zIndex: options.zIndex + 1,
      cursor: options.enableGrab ? cursor.grab : cursor.zoomOut,
      transition: transformCssProp + '\n        ' + options.transitionDuration + 's\n        ' + options.transitionTimingFunction,
      transform: 'translate(' + this.translate.x + 'px, ' + this.translate.y + 'px)\n        scale(' + this.scale.x + ',' + this.scale.y + ')',
      width: this.rect.width + 'px',
      height: this.rect.height + 'px'
    };

    // trigger transition
    this.styleClose = setStyle(this.el, this.styleOpen, true);
  },
  zoomOut: function zoomOut() {
    // force layout update
    this.el.offsetWidth;

    setStyle(this.el, { transform: 'none' });
  },
  grab: function grab(x, y, scaleExtra) {
    var windowCenter = getWindowCenter();
    var dx = windowCenter.x - x,
        dy = windowCenter.y - y;


    setStyle(this.el, {
      cursor: cursor.move,
      transform: 'translate(\n        ' + (this.translate.x + dx) + 'px, ' + (this.translate.y + dy) + 'px)\n        scale(' + (this.scale.x + scaleExtra) + ',' + (this.scale.y + scaleExtra) + ')'
    });
  },
  move: function move(x, y, scaleExtra) {
    var windowCenter = getWindowCenter();
    var dx = windowCenter.x - x,
        dy = windowCenter.y - y;


    setStyle(this.el, {
      transition: transformCssProp,
      transform: 'translate(\n        ' + (this.translate.x + dx) + 'px, ' + (this.translate.y + dy) + 'px)\n        scale(' + (this.scale.x + scaleExtra) + ',' + (this.scale.y + scaleExtra) + ')'
    });
  },
  restoreCloseStyle: function restoreCloseStyle() {
    setStyle(this.el, this.styleClose);
  },
  restoreOpenStyle: function restoreOpenStyle() {
    setStyle(this.el, this.styleOpen);
  },
  upgradeSource: function upgradeSource() {
    var _this = this;

    if (!this.srcOriginal) return;

    var parentNode = this.el.parentNode;
    var temp = this.el.cloneNode(false);

    // force compute the hi-res image in DOM to prevent
    // image flickering while updating src
    temp.setAttribute('src', this.srcOriginal);
    temp.style.position = 'fixed';
    temp.style.visibility = 'hidden';
    parentNode.appendChild(temp);

    setTimeout(function () {
      _this.el.setAttribute('src', _this.srcOriginal);
      parentNode.removeChild(temp);
    }, 100);
  },
  downgradeSource: function downgradeSource() {
    if (!this.srcOriginal) return;

    this.el.setAttribute('src', this.srcThumbnail);
  }
};

function calculateTranslate(rect) {
  var windowCenter = getWindowCenter();
  var targetCenter = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };

  // The vector to translate image to the window center
  return {
    x: windowCenter.x - targetCenter.x,
    y: windowCenter.y - targetCenter.y
  };
}

function calculateScale(rect, scaleBase, customSize) {
  if (customSize) {
    return {
      x: customSize.width / rect.width,
      y: customSize.height / rect.height
    };
  } else {
    var targetHalfWidth = rect.width / 2;
    var targetHalfHeight = rect.height / 2;
    var windowCenter = getWindowCenter();

    // The distance between target edge and window edge
    var targetEdgeToWindowEdge = {
      x: windowCenter.x - targetHalfWidth,
      y: windowCenter.y - targetHalfHeight
    };

    var scaleHorizontally = targetEdgeToWindowEdge.x / targetHalfWidth;
    var scaleVertically = targetEdgeToWindowEdge.y / targetHalfHeight;

    // The additional scale is based on the smaller value of
    // scaling horizontally and scaling vertically
    var scale = scaleBase + Math.min(scaleHorizontally, scaleVertically);

    return {
      x: scale,
      y: scale
    };
  }
}

function getWindowCenter() {
  var windowWidth = Math.min(document.documentElement.clientWidth, window.innerWidth);
  var windowHeight = Math.min(document.documentElement.clientHeight, window.innerHeight);

  return {
    x: windowWidth / 2,
    y: windowHeight / 2
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Zooming instance.
 */

var Zooming$1 = function () {
  /**
   * @param {Object} [options] Update default options if provided.
   */
  function Zooming(options) {
    classCallCheck(this, Zooming);

    // elements
    this.target = Object.create(target);
    this.overlay = Object.create(overlay);
    this.eventHandler = Object.create(handler);
    this.body = document.body;

    // state
    this.shown = false;
    this.lock = false;
    this.released = true;
    this.lastScrollPosition = null;
    this.pressTimer = null;

    // init
    this.options = _extends({}, OPTIONS, options);
    this.overlay.init(this);
    this.eventHandler.init(this);
    this.listen(this.options.defaultZoomable);
  }

  /**
   * Make element(s) zoomable.
   * @param  {string|Element} el A css selector or an Element.
   * @return {this}
   */


  createClass(Zooming, [{
    key: 'listen',
    value: function listen(el) {
      if (typeof el === 'string') {
        var els = document.querySelectorAll(el);
        var i = els.length;

        while (i--) {
          this.listen(els[i]);
        }

        return this;
      }

      if (el.tagName !== 'IMG') return;

      el.style.cursor = cursor.zoomIn;
      el.addEventListener('click', this.eventHandler.click, { passive: false });

      if (this.options.preloadImage) {
        loadImage(getOriginalSource(el));
      }

      return this;
    }

    /**
     * Update options.
     * @param  {Object} options An Object that contains this.options.
     * @return {this}
     */

  }, {
    key: 'config',
    value: function config(options) {
      if (!options) return this.options;

      _extends(this.options, options);
      this.overlay.updateStyle(this.options);

      return this;
    }

    /**
     * Open (zoom in) the Element.
     * @param  {Element} el The Element to open.
     * @param  {Function} [cb=this.options.onOpen] A callback function that will
     * be called when a target is opened and transition has ended. It will get
     * the target element as the argument.
     * @return {this}
     */

  }, {
    key: 'open',
    value: function open(el) {
      var _this = this;

      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.options.onOpen;

      if (this.shown || this.lock) return;

      var target$$1 = typeof el === 'string' ? document.querySelector(el) : el;

      if (target$$1.tagName !== 'IMG') return;

      if (this.options.onBeforeOpen) this.options.onBeforeOpen(target$$1);

      this.target.init(target$$1, this);

      if (!this.options.preloadImage) {
        loadImage(this.target.srcOriginal);
      }

      this.shown = true;
      this.lock = true;

      this.target.zoomIn();
      this.overlay.create();
      this.overlay.show();

      document.addEventListener('scroll', this.eventHandler.scroll);
      document.addEventListener('keydown', this.eventHandler.keydown);

      var onEnd = function onEnd() {
        target$$1.removeEventListener(transEndEvent, onEnd);

        _this.lock = false;

        _this.target.upgradeSource();

        if (_this.options.enableGrab) {
          toggleGrabListeners(document, _this.eventHandler, true);
        }

        if (cb) cb(target$$1);
      };

      target$$1.addEventListener(transEndEvent, onEnd);

      return this;
    }

    /**
     * Close (zoom out) the Element currently opened.
     * @param  {Function} [cb=this.options.onClose] A callback function that will
     * be called when a target is closed and transition has ended. It will get
     * the target element as the argument.
     * @return {this}
     */

  }, {
    key: 'close',
    value: function close() {
      var _this2 = this;

      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.onClose;

      if (!this.shown || this.lock) return;

      var target$$1 = this.target.el;

      if (this.options.onBeforeClose) this.options.onBeforeClose(target$$1);

      this.lock = true;
      this.body.style.cursor = cursor.default;
      this.overlay.hide();
      this.target.zoomOut();

      document.removeEventListener('scroll', this.eventHandler.scroll);
      document.removeEventListener('keydown', this.eventHandler.keydown);

      var onEnd = function onEnd() {
        target$$1.removeEventListener(transEndEvent, onEnd);

        _this2.shown = false;
        _this2.lock = false;

        _this2.target.downgradeSource();

        if (_this2.options.enableGrab) {
          toggleGrabListeners(document, _this2.eventHandler, false);
        }

        _this2.target.restoreCloseStyle();
        _this2.overlay.destroy();

        if (cb) cb(target$$1);
      };

      target$$1.addEventListener(transEndEvent, onEnd);

      return this;
    }

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

  }, {
    key: 'grab',
    value: function grab(x, y) {
      var scaleExtra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.options.scaleExtra;
      var cb = arguments[3];

      if (!this.shown || this.lock) return;

      var target$$1 = this.target.el;

      if (this.options.onBeforeGrab) this.options.onBeforeGrab(target$$1);

      this.released = false;
      this.target.grab(x, y, scaleExtra);

      var onEnd = function onEnd() {
        target$$1.removeEventListener(transEndEvent, onEnd);
        if (cb) cb(target$$1);
      };

      target$$1.addEventListener(transEndEvent, onEnd);
    }

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

  }, {
    key: 'move',
    value: function move(x, y) {
      var scaleExtra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.options.scaleExtra;
      var cb = arguments[3];

      if (!this.shown || this.lock) return;

      this.released = false;
      this.body.style.cursor = cursor.move;
      this.target.move(x, y, scaleExtra);

      var target$$1 = this.target.el;

      var onEnd = function onEnd() {
        target$$1.removeEventListener(transEndEvent, onEnd);
        if (cb) cb(target$$1);
      };

      target$$1.addEventListener(transEndEvent, onEnd);
    }

    /**
     * Release the Element currently grabbed.
     * @param  {Function} [cb=this.options.onRelease] A callback function that
     * will be called when a target is released and transition has ended. It
     * will get the target element as the argument.
     * @return {this}
     */

  }, {
    key: 'release',
    value: function release() {
      var _this3 = this;

      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.onRelease;

      if (!this.shown || this.lock) return;

      var target$$1 = this.target.el;

      if (this.options.onBeforeRelease) this.options.onBeforeRelease(target$$1);

      this.lock = true;
      this.body.style.cursor = cursor.default;
      this.target.restoreOpenStyle();

      var onEnd = function onEnd() {
        target$$1.removeEventListener(transEndEvent, onEnd);

        _this3.lock = false;
        _this3.released = true;

        if (cb) cb(target$$1);
      };

      target$$1.addEventListener(transEndEvent, onEnd);

      return this;
    }
  }]);
  return Zooming;
}();

function toggleGrabListeners(el, handler$$1, add) {
  var types = ['mousedown', 'mousemove', 'mouseup', 'touchstart', 'touchmove', 'touchend'];

  types.forEach(function (type) {
    if (add) {
      el.addEventListener(type, handler$$1[type], { passive: false });
    } else {
      el.removeEventListener(type, handler$$1[type], { passive: false });
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  new Zooming$1();
});

return Zooming$1;

})));
//# sourceMappingURL=zooming.js.map
