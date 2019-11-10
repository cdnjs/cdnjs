/*!
 * Viewer.js v0.7.1
 * https://github.com/fengyuanchen/viewerjs
 *
 * Copyright (c) 2017 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2017-05-14T07:05:32.049Z
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Viewer = factory());
}(this, (function () { 'use strict';

var DEFAULTS = {
  // Enable inline mode
  inline: false,

  // Show the button on the top-right of the viewer
  button: true,

  // Show the navbar
  navbar: true,

  // Show the title
  title: true,

  // Show the toolbar
  toolbar: true,

  // Show the tooltip with image ratio (percentage) when zoom in or zoom out
  tooltip: true,

  // Enable to move the image
  movable: true,

  // Enable to zoom the image
  zoomable: true,

  // Enable to rotate the image
  rotatable: true,

  // Enable to scale the image
  scalable: true,

  // Enable CSS3 Transition for some special elements
  transition: true,

  // Enable to request fullscreen when play
  fullscreen: true,

  // Enable keyboard support
  keyboard: true,

  // Define interval of each image when playing
  interval: 5000,

  // Min width of the viewer in inline mode
  minWidth: 200,

  // Min height of the viewer in inline mode
  minHeight: 100,

  // Define the ratio when zoom the image by wheeling mouse
  zoomRatio: 0.1,

  // Define the min ratio of the image when zoom out
  minZoomRatio: 0.01,

  // Define the max ratio of the image when zoom in
  maxZoomRatio: 100,

  // Define the CSS `z-index` value of viewer in modal mode.
  zIndex: 2015,

  // Define the CSS `z-index` value of viewer in inline mode.
  zIndexInline: 0,

  // Define where to get the original image URL for viewing
  // Type: String (an image attribute) or Function (should return an image URL)
  url: 'src',

  // Event shortcuts
  ready: null,
  show: null,
  shown: null,
  hide: null,
  hidden: null,
  view: null,
  viewed: null
};

var TEMPLATE = '<div class="viewer-container">' + '<div class="viewer-canvas"></div>' + '<div class="viewer-footer">' + '<div class="viewer-title"></div>' + '<ul class="viewer-toolbar">' + '<li role="button" class="viewer-zoom-in" data-action="zoom-in"></li>' + '<li role="button" class="viewer-zoom-out" data-action="zoom-out"></li>' + '<li role="button" class="viewer-one-to-one" data-action="one-to-one"></li>' + '<li role="button" class="viewer-reset" data-action="reset"></li>' + '<li role="button" class="viewer-prev" data-action="prev"></li>' + '<li role="button" class="viewer-play" data-action="play"></li>' + '<li role="button" class="viewer-next" data-action="next"></li>' + '<li role="button" class="viewer-rotate-left" data-action="rotate-left"></li>' + '<li role="button" class="viewer-rotate-right" data-action="rotate-right"></li>' + '<li role="button" class="viewer-flip-horizontal" data-action="flip-horizontal"></li>' + '<li role="button" class="viewer-flip-vertical" data-action="flip-vertical"></li>' + '</ul>' + '<div class="viewer-navbar">' + '<ul class="viewer-list"></ul>' + '</div>' + '</div>' + '<div class="viewer-tooltip"></div>' + '<div role="button" class="viewer-button" data-action="mix"></div>' + '<div class="viewer-player"></div>' + '</div>';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











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







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

// RegExps
var REGEXP_HYPHENATE = /([a-z\d])([A-Z])/g;
var REGEXP_SPACES = /\s+/;
var REGEXP_SUFFIX = /^(width|height|left|top|marginLeft|marginTop)$/;
var REGEXP_TRIM = /^\s+(.*)\s+$/;

// Utilities
var objectProto = Object.prototype;
var toString = objectProto.toString;
var hasOwnProperty = objectProto.hasOwnProperty;
var slice = Array.prototype.slice;

function typeOf(obj) {
  return toString.call(obj).slice(8, -1).toLowerCase();
}

function isString(str) {
  return typeof str === 'string';
}

function isNumber(num) {
  return typeof num === 'number' && !isNaN(num);
}

function isUndefined(obj) {
  return typeof obj === 'undefined';
}

function isObject(obj) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null;
}

function isPlainObject(obj) {
  if (!isObject(obj)) {
    return false;
  }

  try {
    var _constructor = obj.constructor;
    var prototype = _constructor.prototype;

    return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
  } catch (e) {
    return false;
  }
}

function isFunction(fn) {
  return typeOf(fn) === 'function';
}

function isArray(arr) {
  return Array.isArray ? Array.isArray(arr) : typeOf(arr) === 'array';
}

function toArray$$1(obj, offset) {
  offset = offset >= 0 ? offset : 0;

  if (Array.from) {
    return Array.from(obj).slice(offset);
  }

  return slice.call(obj, offset);
}

function inArray(value, arr) {
  var index = -1;

  if (arr.indexOf) {
    return arr.indexOf(value);
  }

  arr.forEach(function (n, i) {
    if (n === value) {
      index = i;
    }
  });

  return index;
}

function trim(str) {
  if (isString(str)) {
    str = str.trim ? str.trim() : str.replace(REGEXP_TRIM, '1');
  }

  return str;
}

function each(obj, callback) {
  if (obj && isFunction(callback)) {
    var i = void 0;

    if (isArray(obj) || isNumber(obj.length) /* array-like */) {
        var length = obj.length;

        for (i = 0; i < length; i++) {
          if (callback.call(obj, obj[i], i, obj) === false) {
            break;
          }
        }
      } else if (isObject(obj)) {
      Object.keys(obj).forEach(function (key) {
        callback.call(obj, obj[key], key, obj);
      });
    }
  }

  return obj;
}

function extend(obj) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (isObject(obj) && args.length > 0) {
    if (Object.assign) {
      return Object.assign.apply(Object, [obj].concat(args));
    }

    args.forEach(function (arg) {
      if (isObject(arg)) {
        Object.keys(arg).forEach(function (key) {
          obj[key] = arg[key];
        });
      }
    });
  }

  return obj;
}

function proxy(fn, context) {
  for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  return function () {
    for (var _len3 = arguments.length, args2 = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args2[_key3] = arguments[_key3];
    }

    return fn.apply(context, args.concat(args2));
  };
}

function setStyle(element, styles) {
  var style = element.style;

  each(styles, function (value, property) {
    if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
      value += 'px';
    }

    style[property] = value;
  });
}

function getStyle(element) {
  return window.getComputedStyle ? window.getComputedStyle(element, null) : element.currentStyle;
}

function hasClass(element, value) {
  return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
}

function addClass(element, value) {
  if (!value) {
    return;
  }

  if (isNumber(element.length)) {
    each(element, function (elem) {
      addClass(elem, value);
    });
    return;
  }

  if (element.classList) {
    element.classList.add(value);
    return;
  }

  var className = trim(element.className);

  if (!className) {
    element.className = value;
  } else if (className.indexOf(value) < 0) {
    element.className = className + ' ' + value;
  }
}

function removeClass(element, value) {
  if (!value) {
    return;
  }

  if (isNumber(element.length)) {
    each(element, function (elem) {
      removeClass(elem, value);
    });
    return;
  }

  if (element.classList) {
    element.classList.remove(value);
    return;
  }

  if (element.className.indexOf(value) >= 0) {
    element.className = element.className.replace(value, '');
  }
}

function toggleClass(element, value, added) {
  if (!value) {
    return;
  }

  if (isNumber(element.length)) {
    each(element, function (elem) {
      toggleClass(elem, value, added);
    });
    return;
  }

  // IE10-11 doesn't support the second parameter of `classList.toggle`
  if (added) {
    addClass(element, value);
  } else {
    removeClass(element, value);
  }
}

function hyphenate(str) {
  return str.replace(REGEXP_HYPHENATE, '$1-$2').toLowerCase();
}

function getData(element, name) {
  if (isObject(element[name])) {
    return element[name];
  } else if (element.dataset) {
    return element.dataset[name];
  }

  return element.getAttribute('data-' + hyphenate(name));
}

function setData(element, name, data) {
  if (isObject(data)) {
    element[name] = data;
  } else if (element.dataset) {
    element.dataset[name] = data;
  } else {
    element.setAttribute('data-' + hyphenate(name), data);
  }
}

function removeData(element, name) {
  if (isObject(element[name])) {
    delete element[name];
  } else if (element.dataset) {
    // #128 Safari not allows to delete dataset property
    try {
      delete element.dataset[name];
    } catch (e) {
      element.dataset[name] = null;
    }
  } else {
    element.removeAttribute('data-' + hyphenate(name));
  }
}

function removeListener(element, type, handler) {
  var types = trim(type).split(REGEXP_SPACES);

  if (types.length > 1) {
    each(types, function (t) {
      removeListener(element, t, handler);
    });
    return;
  }

  if (element.removeEventListener) {
    element.removeEventListener(type, handler, false);
  } else if (element.detachEvent) {
    element.detachEvent('on' + type, handler);
  }
}

function addListener(element, type, _handler, once) {
  var types = trim(type).split(REGEXP_SPACES);
  var originalHandler = _handler;

  if (types.length > 1) {
    each(types, function (t) {
      addListener(element, t, _handler);
    });
    return;
  }

  if (once) {
    _handler = function handler() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      removeListener(element, type, _handler);

      return originalHandler.apply(element, args);
    };
  }

  if (element.addEventListener) {
    element.addEventListener(type, _handler, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + type, _handler);
  }
}

function dispatchEvent(element, type, data) {
  if (element.dispatchEvent) {
    var event = void 0;

    // Event and CustomEvent on IE9-11 are global objects, not constructors
    if (isFunction(Event) && isFunction(CustomEvent)) {
      if (isUndefined(data)) {
        event = new Event(type, {
          bubbles: true,
          cancelable: true
        });
      } else {
        event = new CustomEvent(type, {
          detail: data,
          bubbles: true,
          cancelable: true
        });
      }
    } else if (isUndefined(data)) {
      event = document.createEvent('Event');
      event.initEvent(type, true, true);
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(type, true, true, data);
    }

    // IE9+
    return element.dispatchEvent(event);
  } else if (element.fireEvent) {
    // IE6-10 (native events only)
    return element.fireEvent('on' + type);
  }

  return true;
}

function getEvent(event) {
  var e = event || window.event;

  // Fix target property (IE8)
  if (!e.target) {
    e.target = e.srcElement || document;
  }

  if (!isNumber(e.pageX) && isNumber(e.clientX)) {
    var eventDoc = event.target.ownerDocument || document;
    var doc = eventDoc.documentElement;
    var body = eventDoc.body;

    e.pageX = e.clientX + ((doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0));
    e.pageY = e.clientY + ((doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0));
  }

  return e;
}

function getOffset(element) {
  var doc = document.documentElement;
  var box = element.getBoundingClientRect();

  return {
    left: box.left + ((window.scrollX || doc && doc.scrollLeft || 0) - (doc && doc.clientLeft || 0)),
    top: box.top + ((window.scrollY || doc && doc.scrollTop || 0) - (doc && doc.clientTop || 0))
  };
}

function getByTag(element, tagName) {
  return element.getElementsByTagName(tagName);
}

function getByClass(element, className) {
  return element.getElementsByClassName ? element.getElementsByClassName(className) : element.querySelectorAll('.' + className);
}



function appendChild(element, elem) {
  if (elem.length) {
    each(elem, function (el) {
      appendChild(element, el);
    });
    return;
  }

  element.appendChild(elem);
}

function removeChild(element) {
  if (element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function setText(element, text) {
  if (!isUndefined(element.textContent)) {
    element.textContent = text;
  } else {
    element.innerText = text;
  }
}

// Force reflow to enable CSS3 transition
function forceReflow(element) {
  return element.offsetWidth;
}

// e.g.: http://domain.com/path/to/picture.jpg?size=1280×960 -> picture.jpg
function getImageName(url) {
  return isString(url) ? url.replace(/^.*\//, '').replace(/[?&#].*$/, '') : '';
}

function getImageSize(image, callback) {
  // Modern browsers
  if (image.naturalWidth) {
    callback(image.naturalWidth, image.naturalHeight);
    return;
  }

  var newImage = document.createElement('img');

  newImage.onload = function load() {
    callback(this.width, this.height);
  };

  newImage.src = image.src;
}

function getTransform(data) {
  var transforms = [];
  var rotate = data.rotate;
  var scaleX = data.scaleX;
  var scaleY = data.scaleY;

  // Rotate should come first before scale to match orientation transform
  if (isNumber(rotate) && rotate !== 0) {
    transforms.push('rotate(' + rotate + 'deg)');
  }

  if (isNumber(scaleX) && scaleX !== 1) {
    transforms.push('scaleX(' + scaleX + ')');
  }

  if (isNumber(scaleY) && scaleY !== 1) {
    transforms.push('scaleY(' + scaleY + ')');
  }

  return transforms.length ? transforms.join(' ') : 'none';
}

function getResponsiveClass(option) {
  switch (option) {
    case 2:
      return 'viewer-hide-xs-down';

    case 3:
      return 'viewer-hide-sm-down';

    case 4:
      return 'viewer-hide-md-down';
  }

  return '';
}

function getPointer(pointer, endOnly) {
  var end = {
    endX: pointer.pageX,
    endY: pointer.pageY
  };

  if (endOnly) {
    return end;
  }

  return extend({
    startX: pointer.pageX,
    startY: pointer.pageY
  }, end);
}

function getMaxZoomRatio(pointers) {
  var pointers2 = extend({}, pointers);
  var ratios = [];

  each(pointers, function (pointer, pointerId) {
    delete pointers2[pointerId];

    each(pointers2, function (pointer2) {
      var x1 = Math.abs(pointer.startX - pointer2.startX);
      var y1 = Math.abs(pointer.startY - pointer2.startY);
      var x2 = Math.abs(pointer.endX - pointer2.endX);
      var y2 = Math.abs(pointer.endY - pointer2.endY);
      var z1 = Math.sqrt(x1 * x1 + y1 * y1);
      var z2 = Math.sqrt(x2 * x2 + y2 * y2);
      var ratio = (z2 - z1) / z1;

      ratios.push(ratio);
    });
  });

  ratios.sort(function (a, b) {
    return Math.abs(a) < Math.abs(b);
  });

  return ratios[0];
}

function getPointersCenter(pointers) {
  var pageX = 0;
  var pageY = 0;
  var count = 0;

  each(pointers, function (pointer) {
    pageX += pointer.startX;
    pageY += pointer.startY;
    count += 1;
  });

  pageX /= count;
  pageY /= count;

  return {
    pageX: pageX,
    pageY: pageY
  };
}

var render$1 = {
  render: function render() {
    var self = this;

    self.initContainer();
    self.initViewer();
    self.initList();
    self.renderViewer();
  },
  initContainer: function initContainer() {
    var self = this;

    self.containerData = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  initViewer: function initViewer() {
    var self = this;
    var options = self.options;
    var parent = self.parent;
    var viewerData = void 0;

    if (options.inline) {
      self.parentData = viewerData = {
        width: Math.max(parent.offsetWidth, options.minWidth),
        height: Math.max(parent.offsetHeight, options.minHeight)
      };
    }

    if (self.fulled || !viewerData) {
      viewerData = self.containerData;
    }

    self.viewerData = extend({}, viewerData);
  },
  renderViewer: function renderViewer() {
    var self = this;

    if (self.options.inline && !self.fulled) {
      setStyle(self.viewer, self.viewerData);
    }
  },
  initList: function initList() {
    var self = this;
    var options = self.options;
    var element = self.element;
    var list = self.list;
    var items = [];

    each(self.images, function (image, i) {
      var src = image.src;
      var alt = image.alt || getImageName(src);
      var url = options.url;

      if (!src) {
        return;
      }

      if (isString(url)) {
        url = image.getAttribute(url);
      } else if (isFunction(url)) {
        url = url.call(image, image);
      }

      items.push('<li>' + '<img' + (' src="' + src + '"') + ' role="button"' + ' data-action="view"' + (' data-index="' + i + '"') + (' data-original-url="' + (url || src) + '"') + (' alt="' + alt + '"') + '>' + '</li>');
    });

    list.innerHTML = items.join('');

    each(getByTag(list, 'img'), function (image) {
      setData(image, 'filled', true);
      addListener(image, 'load', proxy(self.loadImage, self), true);
    });

    self.items = getByTag(list, 'li');

    if (options.transition) {
      addListener(element, 'viewed', function () {
        addClass(list, 'viewer-transition');
      }, true);
    }
  },
  renderList: function renderList(index) {
    var self = this;
    var i = index || self.index;
    var width = self.items[i].offsetWidth || 30;
    var outerWidth = width + 1; // 1 pixel of `margin-left` width

    // Place the active item in the center of the screen
    setStyle(self.list, {
      width: outerWidth * self.length,
      marginLeft: (self.viewerData.width - width) / 2 - outerWidth * i
    });
  },
  resetList: function resetList() {
    var self = this;

    empty(self.list);
    removeClass(self.list, 'viewer-transition');
    setStyle({
      marginLeft: 0
    });
  },
  initImage: function initImage(callback) {
    var self = this;
    var options = self.options;
    var image = self.image;
    var viewerData = self.viewerData;
    var footerHeight = self.footer.offsetHeight;
    var viewerWidth = viewerData.width;
    var viewerHeight = Math.max(viewerData.height - footerHeight, footerHeight);
    var oldImageData = self.imageData || {};

    getImageSize(image, function (naturalWidth, naturalHeight) {
      var aspectRatio = naturalWidth / naturalHeight;
      var width = viewerWidth;
      var height = viewerHeight;

      if (viewerHeight * aspectRatio > viewerWidth) {
        height = viewerWidth / aspectRatio;
      } else {
        width = viewerHeight * aspectRatio;
      }

      width = Math.min(width * 0.9, naturalWidth);
      height = Math.min(height * 0.9, naturalHeight);

      var imageData = {
        naturalWidth: naturalWidth,
        naturalHeight: naturalHeight,
        aspectRatio: aspectRatio,
        ratio: width / naturalWidth,
        width: width,
        height: height,
        left: (viewerWidth - width) / 2,
        top: (viewerHeight - height) / 2
      };
      var initialImageData = extend({}, imageData);

      if (options.rotatable) {
        imageData.rotate = oldImageData.rotate || 0;
        initialImageData.rotate = 0;
      }

      if (options.scalable) {
        imageData.scaleX = oldImageData.scaleX || 1;
        imageData.scaleY = oldImageData.scaleY || 1;
        initialImageData.scaleX = 1;
        initialImageData.scaleY = 1;
      }

      self.imageData = imageData;
      self.initialImageData = initialImageData;

      if (isFunction(callback)) {
        callback();
      }
    });
  },
  renderImage: function renderImage(callback) {
    var self = this;
    var image = self.image;
    var imageData = self.imageData;
    var transform = getTransform(imageData);

    setStyle(image, {
      width: imageData.width,
      height: imageData.height,
      marginLeft: imageData.left,
      marginTop: imageData.top,
      WebkitTransform: transform,
      msTransform: transform,
      transform: transform
    });

    if (isFunction(callback)) {
      if (self.transitioning) {
        addListener(image, 'transitionend', callback, true);
      } else {
        callback();
      }
    }
  },
  resetImage: function resetImage() {
    var self = this;

    // this.image only defined after viewed
    if (self.image) {
      removeChild(self.image);
      self.image = null;
    }
  }
};

// Events
var PointerEvent = typeof window !== 'undefined' ? window.PointerEvent : null;
var EVENT_POINTER_DOWN = PointerEvent ? 'pointerdown' : 'touchstart mousedown';
var EVENT_POINTER_MOVE = PointerEvent ? 'pointermove' : 'mousemove touchmove';
var EVENT_POINTER_UP = PointerEvent ? 'pointerup pointercancel' : 'touchend touchcancel mouseup';
var EVENT_WHEEL = 'wheel mousewheel DOMMouseScroll';
var EVENT_KEY_DOWN = 'keydown';
var EVENT_DRAGS_TART = 'dragstart';
var EVENT_CLICK = 'click';
var EVENT_RESIZE = 'resize';
var EVENT_VIEW = 'view';
var EVENT_VIEWED = 'viewed';

var events = {
  bind: function bind() {
    var self = this;
    var options = self.options;
    var element = self.element;
    var viewer = self.viewer;

    if (isFunction(options.view)) {
      addListener(element, EVENT_VIEW, options.view);
    }

    if (isFunction(options.viewed)) {
      addListener(element, EVENT_VIEWED, options.viewed);
    }

    addListener(viewer, EVENT_CLICK, self.onClick = proxy(self.click, self));
    addListener(viewer, EVENT_WHEEL, self.onWheel = proxy(self.wheel, self));
    addListener(viewer, EVENT_DRAGS_TART, self.onDragstart = proxy(self.dragstart, self));
    addListener(self.canvas, EVENT_POINTER_DOWN, self.onPointerdown = proxy(self.pointerdown, self));
    addListener(document, EVENT_POINTER_MOVE, self.onPointermove = proxy(self.pointermove, self));
    addListener(document, EVENT_POINTER_UP, self.onPointerup = proxy(self.pointerup, self));
    addListener(document, EVENT_KEY_DOWN, self.onKeydown = proxy(self.keydown, self));
    addListener(window, EVENT_RESIZE, self.onResize = proxy(self.resize, self));
  },
  unbind: function unbind() {
    var self = this;
    var options = self.options;
    var element = self.element;
    var viewer = self.viewer;

    if (isFunction(options.view)) {
      removeListener(element, EVENT_VIEW, options.view);
    }

    if (isFunction(options.viewed)) {
      removeListener(element, EVENT_VIEWED, options.viewed);
    }

    removeListener(viewer, EVENT_CLICK, self.onClick);
    removeListener(viewer, EVENT_WHEEL, self.onWheel);
    removeListener(viewer, EVENT_DRAGS_TART, self.onDragstart);
    removeListener(self.canvas, EVENT_POINTER_DOWN, self.onPointerdown);
    removeListener(document, EVENT_POINTER_MOVE, self.onPointermove);
    removeListener(document, EVENT_POINTER_UP, self.onPointerup);
    removeListener(document, EVENT_KEY_DOWN, self.onKeydown);
    removeListener(window, EVENT_RESIZE, self.onResize);
  }
};

var handlers = {
  start: function start(event) {
    var self = this;
    var e = getEvent(event);
    var target = e.target;

    if (target.tagName.toLowerCase() === 'img') {
      self.target = target;
      self.show();
    }
  },
  click: function click(event) {
    var self = this;
    var e = getEvent(event);
    var target = e.target;
    var action = getData(target, 'action');
    var imageData = self.imageData;

    switch (action) {
      case 'mix':
        if (self.played) {
          self.stop();
        } else if (self.options.inline) {
          if (self.fulled) {
            self.exit();
          } else {
            self.full();
          }
        } else {
          self.hide();
        }

        break;

      case 'view':
        self.view(getData(target, 'index'));
        break;

      case 'zoom-in':
        self.zoom(0.1, true);
        break;

      case 'zoom-out':
        self.zoom(-0.1, true);
        break;

      case 'one-to-one':
        self.toggle();
        break;

      case 'reset':
        self.reset();
        break;

      case 'prev':
        self.prev();
        break;

      case 'play':
        self.play();
        break;

      case 'next':
        self.next();
        break;

      case 'rotate-left':
        self.rotate(-90);
        break;

      case 'rotate-right':
        self.rotate(90);
        break;

      case 'flip-horizontal':
        self.scaleX(-imageData.scaleX || -1);
        break;

      case 'flip-vertical':
        self.scaleY(-imageData.scaleY || -1);
        break;

      default:
        if (self.played) {
          self.stop();
        }
    }
  },
  load: function load() {
    var self = this;
    var options = self.options;
    var image = self.image;
    var index = self.index;
    var viewerData = self.viewerData;

    if (self.timeout) {
      clearTimeout(self.timeout);
      self.timeout = false;
    }

    removeClass(image, 'viewer-invisible');

    image.style.cssText = 'width:0;' + 'height:0;' + ('margin-left:' + viewerData.width / 2 + 'px;') + ('margin-top:' + viewerData.height / 2 + 'px;') + 'max-width:none!important;' + 'visibility:visible;';

    self.initImage(function () {
      toggleClass(image, 'viewer-transition', options.transition);
      toggleClass(image, 'viewer-move', options.movable);

      self.renderImage(function () {
        self.viewed = true;
        dispatchEvent(self.element, 'viewed', {
          originalImage: self.images[index],
          index: index,
          image: image
        });
      });
    });
  },
  loadImage: function loadImage(event) {
    var e = getEvent(event);
    var image = e.target;
    var parent = image.parentNode;
    var parentWidth = parent.offsetWidth || 30;
    var parentHeight = parent.offsetHeight || 50;
    var filled = !!getData(image, 'filled');

    getImageSize(image, function (naturalWidth, naturalHeight) {
      var aspectRatio = naturalWidth / naturalHeight;
      var width = parentWidth;
      var height = parentHeight;

      if (parentHeight * aspectRatio > parentWidth) {
        if (filled) {
          width = parentHeight * aspectRatio;
        } else {
          height = parentWidth / aspectRatio;
        }
      } else if (filled) {
        height = parentWidth / aspectRatio;
      } else {
        width = parentHeight * aspectRatio;
      }

      setStyle(image, {
        width: width,
        height: height,
        marginLeft: (parentWidth - width) / 2,
        marginTop: (parentHeight - height) / 2
      });
    });
  },
  resize: function resize() {
    var self = this;

    self.initContainer();
    self.initViewer();
    self.renderViewer();
    self.renderList();

    if (self.viewed) {
      self.initImage(function () {
        self.renderImage();
      });
    }

    if (self.played) {
      each(getByTag(self.player, 'img'), function (image) {
        addListener(image, 'load', proxy(self.loadImage, self), true);
        dispatchEvent(image, 'load');
      });
    }
  },
  wheel: function wheel(event) {
    var self = this;
    var e = getEvent(event);

    if (!self.viewed) {
      return;
    }

    e.preventDefault();

    // Limit wheel speed to prevent zoom too fast
    if (self.wheeling) {
      return;
    }

    self.wheeling = true;

    setTimeout(function () {
      self.wheeling = false;
    }, 50);

    var ratio = Number(self.options.zoomRatio) || 0.1;
    var delta = 1;

    if (e.deltaY) {
      delta = e.deltaY > 0 ? 1 : -1;
    } else if (e.wheelDelta) {
      delta = -e.wheelDelta / 120;
    } else if (e.detail) {
      delta = e.detail > 0 ? 1 : -1;
    }

    self.zoom(-delta * ratio, true, e);
  },
  keydown: function keydown(event) {
    var self = this;
    var e = getEvent(event);
    var options = self.options;
    var key = e.keyCode || e.which || e.charCode;

    if (!self.fulled || !options.keyboard) {
      return;
    }

    switch (key) {

      // (Key: Esc)
      case 27:
        if (self.played) {
          self.stop();
        } else if (options.inline) {
          if (self.fulled) {
            self.exit();
          }
        } else {
          self.hide();
        }

        break;

      // (Key: Space)
      case 32:
        if (self.played) {
          self.stop();
        }

        break;

      // View previous (Key: ←)
      case 37:
        self.prev();
        break;

      // Zoom in (Key: ↑)
      case 38:

        // Prevent scroll on Firefox
        e.preventDefault();

        self.zoom(options.zoomRatio, true);
        break;

      // View next (Key: →)
      case 39:
        self.next();
        break;

      // Zoom out (Key: ↓)
      case 40:

        // Prevent scroll on Firefox
        e.preventDefault();

        self.zoom(-options.zoomRatio, true);
        break;

      // Zoom out to initial size (Key: Ctrl + 0)
      case 48:
      // Fall through

      // Zoom in to natural size (Key: Ctrl + 1)
      // eslint-disable-next-line
      case 49:
        if (e.ctrlKey || e.shiftKey) {
          e.preventDefault();
          self.toggle();
        }

        break;

      // No default
    }
  },
  dragstart: function dragstart(e) {
    if (e.target.tagName.toLowerCase() === 'img') {
      e.preventDefault();
    }
  },
  pointerdown: function pointerdown(event) {
    var self = this;
    var options = self.options;
    var pointers = self.pointers;
    var e = getEvent(event);

    if (!self.viewed) {
      return;
    }

    if (e.changedTouches) {
      each(e.changedTouches, function (touch) {
        pointers[touch.identifier] = getPointer(touch);
      });
    } else {
      pointers[e.pointerId || 0] = getPointer(e);
    }

    var action = options.movable ? 'move' : false;

    if (Object.keys(pointers).length > 1) {
      action = 'zoom';
    } else if ((e.pointerType === 'touch' || e.type === 'touchmove') && self.isSwitchable()) {
      action = 'switch';
    }

    self.action = action;
  },
  pointermove: function pointermove(event) {
    var self = this;
    var options = self.options;
    var pointers = self.pointers;
    var e = getEvent(event);
    var action = self.action;
    var image = self.image;

    if (!self.viewed || !action) {
      return;
    }

    e.preventDefault();

    if (e.changedTouches) {
      each(e.changedTouches, function (touch) {
        extend(pointers[touch.identifier], getPointer(touch, true));
      });
    } else {
      extend(pointers[e.pointerId || 0], getPointer(e, true));
    }

    if (action === 'move' && options.transition && hasClass(image, 'viewer-transition')) {
      removeClass(image, 'viewer-transition');
    }

    self.change(e);
  },
  pointerup: function pointerup(event) {
    var self = this;
    var pointers = self.pointers;
    var e = getEvent(event);
    var action = self.action;

    if (!self.viewed) {
      return;
    }

    if (e.changedTouches) {
      each(e.changedTouches, function (touch) {
        delete pointers[touch.identifier];
      });
    } else {
      delete pointers[e.pointerId || 0];
    }

    if (!action) {
      return;
    }

    if (action === 'move' && self.options.transition) {
      addClass(self.image, 'viewer-transition');
    }

    self.action = false;
  }
};

var methods = {
  // Show the viewer (only available in modal mode)
  show: function show() {
    var self = this;
    var options = self.options;
    var element = self.element;

    if (options.inline || self.transitioning) {
      return self;
    }

    if (!self.ready) {
      self.build();
    }

    if (isFunction(options.show)) {
      addListener(element, 'show', options.show, true);
    }

    if (dispatchEvent(element, 'show') === false) {
      return self;
    }

    self.open();

    var viewer = self.viewer;

    removeClass(viewer, 'viewer-hide');
    addListener(element, 'shown', function () {
      self.view(self.target ? inArray(self.target, toArray$$1(self.images)) : self.index);
      self.target = false;
    }, true);

    if (options.transition) {
      self.transitioning = true;
      addClass(viewer, 'viewer-transition');
      forceReflow(viewer);
      addListener(viewer, 'transitionend', proxy(self.shown, self), true);
      addClass(viewer, 'viewer-in');
    } else {
      addClass(viewer, 'viewer-in');
      self.shown();
    }

    return self;
  },


  // Hide the viewer (only available in modal mode)
  hide: function hide() {
    var self = this;
    var options = self.options;
    var element = self.element;
    var viewer = self.viewer;

    if (options.inline || self.transitioning || !self.visible) {
      return self;
    }

    if (isFunction(options.hide)) {
      addListener(element, 'hide', options.hide, true);
    }

    if (dispatchEvent(element, 'hide') === false) {
      return self;
    }

    if (self.viewed && options.transition) {
      self.transitioning = true;
      addListener(self.image, 'transitionend', function () {
        addListener(viewer, 'transitionend', proxy(self.hidden, self), true);
        removeClass(viewer, 'viewer-in');
      }, true);
      self.zoomTo(0, false, false, true);
    } else {
      removeClass(viewer, 'viewer-in');
      self.hidden();
    }

    return self;
  },


  /**
   * View one of the images with image's index
   *
   * @param {Number} index
   */
  view: function view(index) {
    var self = this;
    var element = self.element;
    var title = self.title;
    var canvas = self.canvas;

    index = Number(index) || 0;

    if (!self.ready || !self.visible || self.played || index < 0 || index >= self.length || self.viewed && index === self.index) {
      return self;
    }

    var item = self.items[index];
    var img = getByTag(item, 'img')[0];
    var url = getData(img, 'originalUrl');
    var alt = img.getAttribute('alt');
    var image = document.createElement('img');

    image.src = url;
    image.alt = alt;

    if (dispatchEvent(element, 'view', {
      originalImage: self.images[index],
      index: index,
      image: image
    }) === false) {
      return self;
    }

    self.image = image;

    if (self.viewed) {
      removeClass(self.items[self.index], 'viewer-active');
    }

    addClass(item, 'viewer-active');

    self.viewed = false;
    self.index = index;
    self.imageData = null;

    addClass(image, 'viewer-invisible');
    empty(canvas);
    appendChild(canvas, image);

    // Center current item
    self.renderList();

    // Clear title
    empty(title);

    // Generate title after viewed
    addListener(element, 'viewed', function () {
      var imageData = self.imageData;

      setText(title, alt + ' (' + imageData.naturalWidth + ' \xD7 ' + imageData.naturalHeight + ')');
    }, true);

    if (image.complete) {
      self.load();
    } else {
      addListener(image, 'load', proxy(self.load, self), true);

      if (self.timeout) {
        clearTimeout(self.timeout);
      }

      // Make the image visible if it fails to load within 1s
      self.timeout = setTimeout(function () {
        removeClass(image, 'viewer-invisible');
        self.timeout = false;
      }, 1000);
    }

    return self;
  },


  // View the previous image
  prev: function prev() {
    var self = this;

    self.view(Math.max(self.index - 1, 0));

    return self;
  },


  // View the next image
  next: function next() {
    var self = this;

    self.view(Math.min(self.index + 1, self.length - 1));

    return self;
  },


  /**
   * Move the image with relative offsets
   *
   * @param {Number} offsetX
   * @param {Number} offsetY (optional)
   */
  move: function move(offsetX, offsetY) {
    var self = this;
    var imageData = self.imageData;

    self.moveTo(isUndefined(offsetX) ? offsetX : imageData.left + Number(offsetX), isUndefined(offsetY) ? offsetY : imageData.top + Number(offsetY));

    return self;
  },


  /**
   * Move the image to an absolute point
   *
   * @param {Number} x
   * @param {Number} y (optional)
   */
  moveTo: function moveTo(x, y) {
    var self = this;
    var imageData = self.imageData;

    // If "y" is not present, its default value is "x"
    if (isUndefined(y)) {
      y = x;
    }

    x = Number(x);
    y = Number(y);

    if (self.viewed && !self.played && self.options.movable) {
      var changed = false;

      if (isNumber(x)) {
        imageData.left = x;
        changed = true;
      }

      if (isNumber(y)) {
        imageData.top = y;
        changed = true;
      }

      if (changed) {
        self.renderImage();
      }
    }

    return self;
  },


  /**
   * Zoom the image with a relative ratio
   *
   * @param {Number} ratio
   * @param {Boolean} hasTooltip (optional)
   * @param {Event} _originalEvent (private)
   */
  zoom: function zoom(ratio, hasTooltip, _originalEvent) {
    var self = this;
    var imageData = self.imageData;

    ratio = Number(ratio);

    if (ratio < 0) {
      ratio = 1 / (1 - ratio);
    } else {
      ratio = 1 + ratio;
    }

    self.zoomTo(imageData.width * ratio / imageData.naturalWidth, hasTooltip, _originalEvent);

    return self;
  },


  /**
   * Zoom the image to an absolute ratio
   *
   * @param {Number} ratio
   * @param {Boolean} hasTooltip (optional)
   * @param {Event} _originalEvent (private)
   * @param {Boolean} _zoomable (private)
   */
  zoomTo: function zoomTo(ratio, hasTooltip, _originalEvent, _zoomable) {
    var self = this;
    var options = self.options;
    var pointers = self.pointers;
    var imageData = self.imageData;

    ratio = Math.max(0, ratio);

    if (isNumber(ratio) && self.viewed && !self.played && (_zoomable || options.zoomable)) {
      if (!_zoomable) {
        var minZoomRatio = Math.max(0.01, options.minZoomRatio);
        var maxZoomRatio = Math.min(100, options.maxZoomRatio);

        ratio = Math.min(Math.max(ratio, minZoomRatio), maxZoomRatio);
      }

      if (ratio > 0.95 && ratio < 1.05) {
        ratio = 1;
      }

      var newWidth = imageData.naturalWidth * ratio;
      var newHeight = imageData.naturalHeight * ratio;

      if (_originalEvent) {
        var offset = getOffset(self.viewer);
        var center = pointers && Object.keys(pointers).length ? getPointersCenter(pointers) : {
          pageX: _originalEvent.pageX,
          pageY: _originalEvent.pageY
        };

        // Zoom from the triggering point of the event
        imageData.left -= (newWidth - imageData.width) * ((center.pageX - offset.left - imageData.left) / imageData.width);
        imageData.top -= (newHeight - imageData.height) * ((center.pageY - offset.top - imageData.top) / imageData.height);
      } else {
        // Zoom from the center of the image
        imageData.left -= (newWidth - imageData.width) / 2;
        imageData.top -= (newHeight - imageData.height) / 2;
      }

      imageData.width = newWidth;
      imageData.height = newHeight;
      imageData.ratio = ratio;
      self.renderImage();

      if (hasTooltip) {
        self.tooltip();
      }
    }

    return self;
  },


  /**
   * Rotate the image with a relative degree
   *
   * @param {Number} degree
   */
  rotate: function rotate(degree) {
    var self = this;

    self.rotateTo((self.imageData.rotate || 0) + Number(degree));

    return self;
  },


  /**
   * Rotate the image to an absolute degree
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#rotate()
   *
   * @param {Number} degree
   */
  rotateTo: function rotateTo(degree) {
    var self = this;
    var imageData = self.imageData;

    degree = Number(degree);

    if (isNumber(degree) && self.viewed && !self.played && self.options.rotatable) {
      imageData.rotate = degree;
      self.renderImage();
    }

    return self;
  },


  /**
   * Scale the image
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#scale()
   *
   * @param {Number} scaleX
   * @param {Number} scaleY (optional)
   */
  scale: function scale(scaleX, scaleY) {
    var self = this;
    var imageData = self.imageData;

    // If "scaleY" is not present, its default value is "scaleX"
    if (isUndefined(scaleY)) {
      scaleY = scaleX;
    }

    scaleX = Number(scaleX);
    scaleY = Number(scaleY);

    if (self.viewed && !self.played && self.options.scalable) {
      var changed = false;

      if (isNumber(scaleX)) {
        imageData.scaleX = scaleX;
        changed = true;
      }

      if (isNumber(scaleY)) {
        imageData.scaleY = scaleY;
        changed = true;
      }

      if (changed) {
        self.renderImage();
      }
    }

    return self;
  },


  /**
   * Scale the abscissa of the image
   *
   * @param {Number} scaleX
   */
  scaleX: function scaleX(_scaleX) {
    var self = this;

    self.scale(_scaleX, self.imageData.scaleY);

    return self;
  },


  /**
   * Scale the ordinate of the image
   *
   * @param {Number} scaleY
   */
  scaleY: function scaleY(_scaleY) {
    var self = this;

    self.scale(self.imageData.scaleX, _scaleY);

    return self;
  },


  // Play the images
  play: function play() {
    var self = this;
    var options = self.options;
    var player = self.player;
    var load = proxy(self.loadImage, self);
    var list = [];
    var total = 0;
    var index = 0;

    if (!self.visible || self.played) {
      return self;
    }

    if (options.fullscreen) {
      self.requestFullscreen();
    }

    self.played = true;
    addClass(player, 'viewer-show');

    each(self.items, function (item, i) {
      var img = getByTag(item, 'img')[0];
      var image = document.createElement('img');

      image.src = getData(img, 'originalUrl');
      image.alt = img.getAttribute('alt');
      total++;

      addClass(image, 'viewer-fade');
      toggleClass(image, 'viewer-transition', options.transition);

      if (hasClass(item, 'viewer-active')) {
        addClass(image, 'viewer-in');
        index = i;
      }

      list.push(image);
      addListener(image, 'load', load, true);
      appendChild(player, image);
    });

    if (isNumber(options.interval) && options.interval > 0) {
      (function () {
        var playing = function playing() {
          self.playing = setTimeout(function () {
            removeClass(list[index], 'viewer-in');
            index++;
            index = index < total ? index : 0;
            addClass(list[index], 'viewer-in');

            playing();
          }, options.interval);
        };

        if (total > 1) {
          playing();
        }
      })();
    }

    return self;
  },


  // Stop play
  stop: function stop() {
    var self = this;
    var player = self.player;

    if (!self.played) {
      return self;
    }

    if (self.options.fullscreen) {
      self.exitFullscreen();
    }

    self.played = false;
    clearTimeout(self.playing);
    removeClass(player, 'viewer-show');
    empty(player);

    return self;
  },


  // Enter modal mode (only available in inline mode)
  full: function full() {
    var self = this;
    var options = self.options;
    var viewer = self.viewer;
    var image = self.image;
    var list = self.list;

    if (!self.visible || self.played || self.fulled || !options.inline) {
      return self;
    }

    self.fulled = true;
    self.open();
    addClass(self.button, 'viewer-fullscreen-exit');

    if (options.transition) {
      removeClass(image, 'viewer-transition');
      removeClass(list, 'viewer-transition');
    }

    addClass(viewer, 'viewer-fixed');
    viewer.setAttribute('style', '');
    setStyle(viewer, {
      zIndex: options.zIndex
    });

    self.initContainer();
    self.viewerData = extend({}, self.containerData);
    self.renderList();
    self.initImage(function () {
      self.renderImage(function () {
        if (options.transition) {
          setTimeout(function () {
            addClass(image, 'viewer-transition');
            addClass(list, 'viewer-transition');
          }, 0);
        }
      });
    });

    return self;
  },


  // Exit modal mode (only available in inline mode)
  exit: function exit() {
    var self = this;
    var options = self.options;
    var viewer = self.viewer;
    var image = self.image;
    var list = self.list;

    if (!self.fulled) {
      return self;
    }

    self.fulled = false;
    self.close();
    removeClass(self.button, 'viewer-fullscreen-exit');

    if (options.transition) {
      removeClass(image, 'viewer-transition');
      removeClass(list, 'viewer-transition');
    }

    removeClass(viewer, 'viewer-fixed');
    setStyle(viewer, {
      zIndex: options.zIndexInline
    });

    self.viewerData = extend({}, self.parentData);
    self.renderViewer();
    self.renderList();
    self.initImage(function () {
      self.renderImage(function () {
        if (options.transition) {
          setTimeout(function () {
            addClass(image, 'viewer-transition');
            addClass(list, 'viewer-transition');
          }, 0);
        }
      });
    });

    return self;
  },


  // Show the current ratio of the image with percentage
  tooltip: function tooltip() {
    var self = this;
    var options = self.options;
    var tooltipBox = self.tooltipBox;
    var imageData = self.imageData;

    if (!self.viewed || self.played || !options.tooltip) {
      return self;
    }

    setText(tooltipBox, Math.round(imageData.ratio * 100) + '%');

    if (!self.tooltiping) {
      if (options.transition) {
        if (self.fading) {
          dispatchEvent(tooltipBox, 'transitionend');
        }

        addClass(tooltipBox, 'viewer-show');
        addClass(tooltipBox, 'viewer-fade');
        addClass(tooltipBox, 'viewer-transition');
        forceReflow(tooltipBox);
        addClass(tooltipBox, 'viewer-in');
      } else {
        addClass(tooltipBox, 'viewer-show');
      }
    } else {
      clearTimeout(self.tooltiping);
    }

    self.tooltiping = setTimeout(function () {
      if (options.transition) {
        addListener(tooltipBox, 'transitionend', function () {
          removeClass(tooltipBox, 'viewer-show');
          removeClass(tooltipBox, 'viewer-fade');
          removeClass(tooltipBox, 'viewer-transition');
          self.fading = false;
        }, true);

        removeClass(tooltipBox, 'viewer-in');
        self.fading = true;
      } else {
        removeClass(tooltipBox, 'viewer-show');
      }

      self.tooltiping = false;
    }, 1000);

    return self;
  },


  // Toggle the image size between its natural size and initial size
  toggle: function toggle() {
    var self = this;

    if (self.imageData.ratio === 1) {
      self.zoomTo(self.initialImageData.ratio, true);
    } else {
      self.zoomTo(1, true);
    }

    return self;
  },


  // Reset the image to its initial state
  reset: function reset() {
    var self = this;

    if (self.viewed && !self.played) {
      self.imageData = extend({}, self.initialImageData);
      self.renderImage();
    }

    return self;
  },


  // Update viewer when images changed
  update: function update() {
    var self = this;
    var indexes = [];

    // Destroy viewer if the target image was deleted
    if (self.isImg && !self.element.parentNode) {
      return self.destroy();
    }

    self.length = self.images.length;

    if (self.ready) {
      each(self.items, function (item, i) {
        var img = getByTag(item, 'img')[0];
        var image = self.images[i];

        if (image) {
          if (image.src !== img.src) {
            indexes.push(i);
          }
        } else {
          indexes.push(i);
        }
      });

      setStyle(self.list, {
        width: 'auto'
      });

      self.initList();

      if (self.visible) {
        if (self.length) {
          if (self.viewed) {
            var index = inArray(self.index, indexes);

            if (index >= 0) {
              self.viewed = false;
              self.view(Math.max(self.index - (index + 1), 0));
            } else {
              addClass(self.items[self.index], 'viewer-active');
            }
          }
        } else {
          self.image = null;
          self.viewed = false;
          self.index = 0;
          self.imageData = null;
          empty(self.canvas);
          empty(self.title);
        }
      }
    }

    return self;
  },


  // Destroy the viewer
  destroy: function destroy() {
    var self = this;
    var element = self.element;

    if (self.options.inline) {
      self.unbind();
    } else {
      if (self.visible) {
        self.unbind();
      }

      removeListener(element, 'click', self.onStart);
    }

    self.unbuild();
    removeData(element, 'viewer');

    return self;
  }
};

var others = {
  open: function open() {
    var body = this.body;

    addClass(body, 'viewer-open');
    body.style.paddingRight = this.scrollbarWidth + 'px';
  },
  close: function close() {
    var body = this.body;

    removeClass(body, 'viewer-open');
    body.style.paddingRight = 0;
  },
  shown: function shown() {
    var self = this;
    var options = self.options;
    var element = self.element;

    self.transitioning = false;
    self.fulled = true;
    self.visible = true;
    self.render();
    self.bind();

    if (isFunction(options.shown)) {
      addListener(element, 'shown', options.shown, true);
    }

    dispatchEvent(element, 'shown');
  },
  hidden: function hidden() {
    var self = this;
    var options = self.options;
    var element = self.element;

    self.transitioning = false;
    self.viewed = false;
    self.fulled = false;
    self.visible = false;
    self.unbind();
    self.close();
    addClass(self.viewer, 'viewer-hide');
    self.resetList();
    self.resetImage();

    if (isFunction(options.hidden)) {
      addListener(element, 'hidden', options.hidden, true);
    }

    dispatchEvent(element, 'hidden');
  },
  requestFullscreen: function requestFullscreen() {
    var self = this;
    var documentElement = document.documentElement;

    if (self.fulled && !document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (documentElement.requestFullscreen) {
        documentElement.requestFullscreen();
      } else if (documentElement.msRequestFullscreen) {
        documentElement.msRequestFullscreen();
      } else if (documentElement.mozRequestFullScreen) {
        documentElement.mozRequestFullScreen();
      } else if (documentElement.webkitRequestFullscreen) {
        documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    }
  },
  exitFullscreen: function exitFullscreen() {
    var self = this;

    if (self.fulled) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  },
  change: function change(e) {
    var self = this;
    var pointers = self.pointers;
    var pointer = pointers[Object.keys(pointers)[0]];
    var offsetX = pointer.endX - pointer.startX;
    var offsetY = pointer.endY - pointer.startY;

    switch (self.action) {

      // Move the current image
      case 'move':
        self.move(offsetX, offsetY);
        break;

      // Zoom the current image
      case 'zoom':
        self.zoom(getMaxZoomRatio(pointers), false, e);
        break;

      case 'switch':
        self.action = 'switched';

        if (Math.abs(offsetX) > Math.abs(offsetY)) {
          if (offsetX > 1) {
            self.prev();
          } else if (offsetX < -1) {
            self.next();
          }
        }

        break;

      // No default
    }

    // Override
    each(pointers, function (p) {
      p.startX = p.endX;
      p.startY = p.endY;
    });
  },
  isSwitchable: function isSwitchable() {
    var self = this;
    var imageData = self.imageData;
    var viewerData = self.viewerData;

    return self.length > 1 && imageData.left >= 0 && imageData.top >= 0 && imageData.width <= viewerData.width && imageData.height <= viewerData.height;
  }
};

var SUPPORT_TRANSITION = typeof document.createElement('viewer').style.transition !== 'undefined';
var AnotherViewer = void 0;

var Viewer = function () {
  function Viewer(element, options) {
    classCallCheck(this, Viewer);

    var self = this;

    self.element = element;
    self.options = extend({}, DEFAULTS, isPlainObject(options) && options);
    self.isImg = false;
    self.ready = false;
    self.visible = false;
    self.viewed = false;
    self.fulled = false;
    self.played = false;
    self.wheeling = false;
    self.playing = false;
    self.fading = false;
    self.tooltiping = false;
    self.transitioning = false;
    self.action = false;
    self.target = false;
    self.timeout = false;
    self.index = 0;
    self.length = 0;
    self.pointers = {};
    self.init();
  }

  createClass(Viewer, [{
    key: 'init',
    value: function init() {
      var self = this;
      var options = self.options;
      var element = self.element;

      if (getData(element, 'viewer')) {
        return;
      }

      setData(element, 'viewer', self);

      var isImg = element.tagName.toLowerCase() === 'img';
      var images = isImg ? [element] : getByTag(element, 'img');
      var length = images.length;

      if (!length) {
        return;
      }

      if (isFunction(options.ready)) {
        addListener(element, 'ready', options.ready, true);
      }

      // Override `transition` option if it is not supported
      if (!SUPPORT_TRANSITION) {
        options.transition = false;
      }

      self.isImg = isImg;
      self.length = length;
      self.count = 0;
      self.images = images;
      self.body = document.body;
      self.scrollbarWidth = window.innerWidth - document.body.clientWidth;

      if (options.inline) {
        (function () {
          var progress = proxy(self.progress, self);

          addListener(element, 'ready', function () {
            self.view();
          }, true);

          each(images, function (image) {
            if (image.complete) {
              progress();
            } else {
              addListener(image, 'load', progress, true);
            }
          });
        })();
      } else {
        addListener(element, 'click', self.onStart = proxy(self.start, self));
      }
    }
  }, {
    key: 'progress',
    value: function progress() {
      var self = this;

      self.count++;

      if (self.count === self.length) {
        self.build();
      }
    }
  }, {
    key: 'build',
    value: function build() {
      var self = this;
      var options = self.options;
      var element = self.element;

      if (self.ready) {
        return;
      }

      var template = document.createElement('div');
      var parent = void 0;
      var viewer = void 0;
      var button = void 0;
      var toolbar = void 0;
      var navbar = void 0;
      var title = void 0;

      template.innerHTML = TEMPLATE;

      self.parent = parent = element.parentNode;
      self.viewer = viewer = getByClass(template, 'viewer-container')[0];
      self.canvas = getByClass(viewer, 'viewer-canvas')[0];
      self.footer = getByClass(viewer, 'viewer-footer')[0];
      self.title = title = getByClass(viewer, 'viewer-title')[0];
      self.toolbar = toolbar = getByClass(viewer, 'viewer-toolbar')[0];
      self.navbar = navbar = getByClass(viewer, 'viewer-navbar')[0];
      self.button = button = getByClass(viewer, 'viewer-button')[0];
      self.tooltipBox = getByClass(viewer, 'viewer-tooltip')[0];
      self.player = getByClass(viewer, 'viewer-player')[0];
      self.list = getByClass(viewer, 'viewer-list')[0];

      addClass(title, !options.title ? 'viewer-hide' : getResponsiveClass(options.title));
      addClass(toolbar, !options.toolbar ? 'viewer-hide' : getResponsiveClass(options.toolbar));
      addClass(navbar, !options.navbar ? 'viewer-hide' : getResponsiveClass(options.navbar));
      toggleClass(button, 'viewer-hide', !options.button);

      toggleClass(toolbar.querySelector('.viewer-one-to-one'), 'viewer-invisible', !options.zoomable);
      toggleClass(toolbar.querySelectorAll('li[class*="zoom"]'), 'viewer-invisible', !options.zoomable);
      toggleClass(toolbar.querySelectorAll('li[class*="flip"]'), 'viewer-invisible', !options.scalable);

      if (!options.rotatable) {
        var rotates = toolbar.querySelectorAll('li[class*="rotate"]');

        addClass(rotates, 'viewer-invisible');
        appendChild(toolbar, rotates);
      }

      if (options.inline) {
        addClass(button, 'viewer-fullscreen');
        setStyle(viewer, {
          zIndex: options.zIndexInline
        });

        if (getStyle(parent).position === 'static') {
          setStyle(parent, {
            position: 'relative'
          });
        }

        parent.insertBefore(viewer, element.nextSibling);
      } else {
        addClass(button, 'viewer-close');
        addClass(viewer, 'viewer-fixed');
        addClass(viewer, 'viewer-fade');
        addClass(viewer, 'viewer-hide');

        setStyle(viewer, {
          zIndex: options.zIndex
        });

        document.body.appendChild(viewer);
      }

      if (options.inline) {
        self.render();
        self.bind();
        self.visible = true;
      }

      self.ready = true;

      dispatchEvent(element, 'ready');
    }
  }, {
    key: 'unbuild',
    value: function unbuild() {
      var self = this;

      if (!self.ready) {
        return;
      }

      self.ready = false;
      removeChild(self.viewer);
    }
  }], [{
    key: 'noConflict',
    value: function noConflict() {
      window.Viewer = AnotherViewer;
      return Viewer;
    }
  }, {
    key: 'setDefaults',
    value: function setDefaults(options) {
      extend(DEFAULTS, isPlainObject(options) && options);
    }
  }]);
  return Viewer;
}();

extend(Viewer.prototype, render$1);
extend(Viewer.prototype, events);
extend(Viewer.prototype, handlers);
extend(Viewer.prototype, methods);
extend(Viewer.prototype, others);

if (typeof window !== 'undefined') {
  AnotherViewer = window.Viewer;
  window.Viewer = Viewer;
}

return Viewer;

})));
