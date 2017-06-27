(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Zooming = factory());
}(this, (function () { 'use strict';

// webkit prefix
var prefix = 'WebkitAppearance' in document.documentElement.style ? '-webkit-' : '';

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

var checkTrans = function checkTrans(transitionProp, transformProp) {
  return function setStyle(el, styles, remember) {
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

var preloadImage = function preloadImage(url) {
  return new Image().src = url;
};

var divide = function divide(denominator) {
  return function (numerator) {
    return numerator / denominator;
  };
};

var half = divide(2);

var getWindowCenter = function getWindowCenter() {
  return {
    x: half(window.innerWidth),
    y: half(window.innerHeight)
  };
};

var options = {
  defaultZoomable: 'img[data-action="zoom"]',
  enableGrab: true,
  preloadImage: true,
  transitionDuration: 0.4,
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0, 1)',
  bgColor: 'rgb(255, 255, 255)',
  bgOpacity: 1,
  scaleBase: 1.0,
  scaleExtra: 0.5,
  scrollThreshold: 40,
  onOpen: null,
  onClose: null,
  onRelease: null,
  onBeforeOpen: null,
  onBeforeClose: null,
  onBeforeGrab: null,
  onBeforeRelease: null
};

var _this = undefined;

// elements
var body = document.body;
var overlay = document.createElement('div');
var target = void 0;
var parent = void 0;

// state
var shown = false; // image is open
var lock = false; // image is in transform
var released = true; // mouse/finger is not pressing down
var multitouch = false;
var lastScrollPosition = null;
var translate = void 0;
var scale = void 0;
var srcThumbnail = void 0;
var pressTimer = void 0;
var dynamicScaleExtra = void 0;

// style
var style = {
  close: null,
  open: null
};

var PRESS_DELAY = 200;
var TOUCH_SCALE_FACTOR = 2;
var GRAB_EVENT_TYPES = ['mousedown', 'mousemove', 'mouseup', 'touchstart', 'touchmove', 'touchend'];

// Helpers ---------------------------------------------------------------------

var trans = sniffTransition(overlay);
var transformCssProp = trans.transformCssProp;
var transEndEvent = trans.transEndEvent;
var setStyleHelper = checkTrans(trans.transitionProp, trans.transformProp);

var setStyle$1 = function setStyle$1(el, styles, remember) {
  return setStyleHelper(el, styles, remember);
};

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
  var targetHalfWidth = half(rect.width);
  var targetHalfHeight = half(rect.height);
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
  return scaleBase + Math.min(scaleHorizontally, scaleVertically);
};

var processTouches = function processTouches(touches, cb) {
  var total = touches.length;
  var firstTouch = touches[0];

  var i = touches.length;
  var xs = 0,
      ys = 0;

  // keep track of the min and max of touch positions

  var min = { x: firstTouch.clientX, y: firstTouch.clientY };
  var max = { x: firstTouch.clientX, y: firstTouch.clientY };

  multitouch = total > 1;

  while (i--) {
    var t = touches[i];
    var _ref = [t.clientX, t.clientY],
        x = _ref[0],
        y = _ref[1];

    xs += x;
    ys += y;

    if (multitouch) {
      if (x < min.x) min.x = x;else if (x > max.x) max.x = x;

      if (y < min.y) min.y = y;else if (y > max.y) max.y = y;
    }
  }

  if (multitouch) {
    // change scaleExtra dynamically
    var distX = max.x - min.x,
        distY = max.y - min.y;


    if (distX > distY) {
      dynamicScaleExtra = distX / window.innerWidth * TOUCH_SCALE_FACTOR;
    } else {
      dynamicScaleExtra = distY / window.innerHeight * TOUCH_SCALE_FACTOR;
    }
  }

  cb(xs / total, ys / total);
};

// Event handler ---------------------------------------------------------------

var eventHandler = {

  scroll: function scroll() {
    var scrollTop = window.pageYOffset || (document.documentElement || body.parentNode || body).scrollTop;

    if (lastScrollPosition === null) lastScrollPosition = scrollTop;

    var deltaY = lastScrollPosition - scrollTop;

    if (Math.abs(deltaY) >= options.scrollThreshold) {
      lastScrollPosition = null;
      api.close();
    }
  },

  keydown: function keydown(e) {
    var code = e.key || e.code;
    if (code === 'Escape' || e.keyCode === 27) api.close();
  },

  mousedown: function mousedown(e) {
    e.preventDefault();

    pressTimer = setTimeout(function () {
      api.grab(e.clientX, e.clientY, true);
    }, PRESS_DELAY);
  },

  mousemove: function mousemove(e) {
    if (released) return;
    api.grab(e.clientX, e.clientY);
  },

  mouseup: function mouseup() {
    clearTimeout(pressTimer);
  },

  touchstart: function touchstart(e) {
    e.preventDefault();

    pressTimer = setTimeout(function () {
      processTouches(e.touches, function (x, y) {
        return api.grab(x, y, true);
      });
    }, PRESS_DELAY);
  },

  touchmove: function touchmove(e) {
    if (released) return;
    processTouches(e.touches, function (x, y) {
      return api.grab(x, y);
    });
  },

  touchend: function touchend(e) {
    if (e.targetTouches.length > 0) return;
    clearTimeout(pressTimer);

    if (released) {
      api.close();
    } else {
      api.release();
    }
  }
};

// API -------------------------------------------------------------------------

var api = {

  listen: function listen(el) {
    if (typeof el === 'string') {
      var els = document.querySelectorAll(el),
          i = els.length;

      while (i--) {
        api.listen(els[i]);
      }

      return _this;
    }

    if (el.tagName !== 'IMG') return;

    el.style.cursor = prefix + 'zoom-in';

    el.addEventListener('click', function (e) {
      e.preventDefault();

      if (shown) {
        if (released) {
          api.close();
        } else {
          api.release();
        }
      } else {
        api.open(el);
      }
    });

    if (options.preloadImage && el.hasAttribute('data-original')) {
      preloadImage(el.getAttribute('data-original'));
    }

    return _this;
  },

  config: function config(opts) {
    if (!opts) return options;

    for (var key in opts) {
      options[key] = opts[key];
    }

    setStyle$1(overlay, {
      backgroundColor: options.bgColor,
      transition: 'opacity\n        ' + options.transitionDuration + 's\n        ' + options.transitionTimingFunction
    });

    return _this;
  },

  open: function open(el) {
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : options.onOpen;

    if (shown || lock) return;

    target = typeof el === 'string' ? document.querySelector(el) : el;

    if (target.tagName !== 'IMG') return;

    // onBeforeOpen event
    if (options.onBeforeOpen) options.onBeforeOpen(target);

    shown = true;
    lock = true;
    parent = target.parentNode;

    var rect = target.getBoundingClientRect();
    translate = calculateTranslate(rect);
    scale = calculateScale(rect, options.scaleBase);

    // force layout update
    target.offsetWidth;

    style.open = {
      position: 'relative',
      zIndex: 999,
      cursor: '' + prefix + (options.enableGrab ? 'grab' : 'zoom-out'),
      transition: transformCssProp + '\n        ' + options.transitionDuration + 's\n        ' + options.transitionTimingFunction,
      transform: 'translate(' + translate.x + 'px, ' + translate.y + 'px) scale(' + scale + ')'
    };

    // trigger transition
    style.close = setStyle$1(target, style.open, true);

    parent.appendChild(overlay);
    setTimeout(function () {
      return overlay.style.opacity = options.bgOpacity;
    }, 30);

    document.addEventListener('scroll', eventHandler.scroll);
    document.addEventListener('keydown', eventHandler.keydown);

    target.addEventListener(transEndEvent, function onEnd() {
      target.removeEventListener(transEndEvent, onEnd);

      if (options.enableGrab) toggleListeners(target, GRAB_EVENT_TYPES, eventHandler, true);

      lock = false;

      // upgrade source if possible
      if (target.hasAttribute('data-original')) {
        srcThumbnail = target.getAttribute('src');
        target.setAttribute('src', target.getAttribute('data-original'));
      }

      if (cb) cb(target);
    });

    return _this;
  },

  close: function close() {
    var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : options.onClose;

    if (!shown || lock) return;
    lock = true;

    // onBeforeClose event
    if (options.onBeforeClose) options.onBeforeClose(target);

    // force layout update
    target.offsetWidth;

    overlay.style.opacity = 0;
    setStyle$1(target, { transform: 'none' });

    document.removeEventListener('scroll', eventHandler.scroll);
    document.removeEventListener('keydown', eventHandler.keydown);

    target.addEventListener(transEndEvent, function onEnd() {
      target.removeEventListener(transEndEvent, onEnd);

      if (options.enableGrab) toggleListeners(target, GRAB_EVENT_TYPES, eventHandler, false);

      shown = false;
      lock = false;

      // downgrade source if possible
      if (target.hasAttribute('data-original')) {
        target.setAttribute('src', srcThumbnail);
      }

      setStyle$1(target, style.close);
      parent.removeChild(overlay);

      if (cb) cb(target);
    });

    return _this;
  },

  grab: function grab(x, y, start, cb) {
    if (!shown || lock) return;
    released = false;

    // onBeforeGrab event
    if (options.onBeforeGrab) options.onBeforeGrab(target);

    var windowCenter = getWindowCenter();
    var dx = windowCenter.x - x,
        dy = windowCenter.y - y;

    var scaleExtra = multitouch ? dynamicScaleExtra : options.scaleExtra;
    var transform = target.style.transform.replace(/translate\(.*?\)/i, 'translate(' + (translate.x + dx) + 'px, ' + (translate.y + dy) + 'px)').replace(/scale\([0-9|\.]*\)/i, 'scale(' + (scale + scaleExtra) + ')');

    setStyle$1(target, {
      cursor: 'move',
      transition: transformCssProp + ' ' + (start ? options.transitionDuration + 's ' + options.transitionTimingFunction : 'ease'),
      transform: transform
    });

    target.addEventListener(transEndEvent, function onEnd() {
      target.removeEventListener(transEndEvent, onEnd);
      if (cb) cb(target);
    });
  },

  release: function release() {
    var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : options.onRelease;

    if (!shown || lock) return;
    lock = true;

    // onBeforeRelease event
    if (options.onBeforeRelease) options.onBeforeRelease(target);

    setStyle$1(target, style.open);

    target.addEventListener(transEndEvent, function onEnd() {
      target.removeEventListener(transEndEvent, onEnd);

      lock = false;
      released = true;

      if (cb) cb(target);
    });

    return _this;
  }
};

// Init ------------------------------------------------------------------------

overlay.setAttribute('id', 'zoom-overlay');
setStyle$1(overlay, {
  zIndex: 998,
  backgroundColor: options.bgColor,
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0,
  transition: 'opacity\n    ' + options.transitionDuration + 's\n    ' + options.transitionTimingFunction
});

overlay.addEventListener('click', function () {
  return api.close();
});
document.addEventListener('DOMContentLoaded', function () {
  return api.listen(options.defaultZoomable);
});

return api;

})));
//# sourceMappingURL=zooming.js.map
