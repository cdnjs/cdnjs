/*!
 * Viewer.js v0.5.0
 * https://github.com/fengyuanchen/viewerjs
 *
 * Copyright (c) 2015-2016 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2016-07-22T08:46:05.003Z
 */

(function (global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = global.document ? factory(global, true) : function (window) {
      if (!window.document) {
        throw new Error('Viewer requires a window with a document');
      }

      return factory(window);
    };
  } else {
    factory(global);
  }
})(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {

  'use strict';

  var document = window.document;
  var Event = window.Event;

  // Constants
  var NAMESPACE = 'viewer';

  // Classes
  var CLASS_FIXED = NAMESPACE + '-fixed';
  var CLASS_OPEN = NAMESPACE + '-open';
  var CLASS_SHOW = NAMESPACE + '-show';
  var CLASS_HIDE = NAMESPACE + '-hide';
  var CLASS_HIDE_XS_DOWN = 'viewer-hide-xs-down';
  var CLASS_HIDE_SM_DOWN = 'viewer-hide-sm-down';
  var CLASS_HIDE_MD_DOWN = 'viewer-hide-md-down';
  var CLASS_FADE = NAMESPACE + '-fade';
  var CLASS_IN = NAMESPACE + '-in';
  var CLASS_MOVE = NAMESPACE + '-move';
  var CLASS_ACTIVE = NAMESPACE + '-active';
  var CLASS_INVISIBLE = NAMESPACE + '-invisible';
  var CLASS_TRANSITION = NAMESPACE + '-transition';
  var CLASS_FULLSCREEN = NAMESPACE + '-fullscreen';
  var CLASS_FULLSCREEN_EXIT = NAMESPACE + '-fullscreen-exit';
  var CLASS_CLOSE = NAMESPACE + '-close';

  // Events
  var EVENT_MOUSEDOWN = 'mousedown touchstart pointerdown MSPointerDown';
  var EVENT_MOUSEMOVE = 'mousemove touchmove pointermove MSPointerMove';
  var EVENT_MOUSEUP = 'mouseup touchend touchcancel pointerup pointercancel MSPointerUp MSPointerCancel';
  var EVENT_WHEEL = 'wheel mousewheel DOMMouseScroll';
  var EVENT_TRANSITIONEND = 'transitionend';
  var EVENT_LOAD = 'load';
  var EVENT_KEYDOWN = 'keydown';
  var EVENT_CLICK = 'click';
  var EVENT_RESIZE = 'resize';
  var EVENT_READY = 'ready';
  var EVENT_SHOW = 'show';
  var EVENT_SHOWN = 'shown';
  var EVENT_HIDE = 'hide';
  var EVENT_HIDDEN = 'hidden';
  var EVENT_VIEW = 'view';
  var EVENT_VIEWED = 'viewed';

  // RegExps
  var REGEXP_SUFFIX = /^(width|height|left|top|marginLeft|marginTop)$/;
  var REGEXP_HYPHENATE = /([a-z\d])([A-Z])/g;
  var REGEXP_TRIM = /^\s+(.*)\s+$/;
  var REGEXP_SPACES = /\s+/;

  // Supports
  var SUPPORT_TRANSITION = typeof document.createElement(NAMESPACE).style.transition !== 'undefined';

  // Maths
  var min = Math.min;
  var max = Math.max;
  var abs = Math.abs;
  var sqrt = Math.sqrt;
  var round = Math.round;

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
    return typeof obj === 'object' && obj !== null;
  }

  function isPlainObject(obj) {
    var constructor;
    var prototype;

    if (!isObject(obj)) {
      return false;
    }

    try {
      constructor = obj.constructor;
      prototype = constructor.prototype;

      return constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
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

  function toArray(obj, offset) {
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
    } else {
      each(arr, function (n, i) {
        if (n === value) {
          index = i;
          return false;
        }
      });
    }

    return index;
  }

  function trim(str) {
    if (isString(str)) {
      str = str.trim ? str.trim() : str.replace(REGEXP_TRIM, '1');
    }

    return str;
  }

  function each(obj, callback) {
    var length;
    var i;

    if (obj && isFunction(callback)) {
      if (isArray(obj) || isNumber(obj.length)/* array-like */) {
        for (i = 0, length = obj.length; i < length; i++) {
          if (callback.call(obj, obj[i], i, obj) === false) {
            break;
          }
        }
      } else if (isObject(obj)) {
        for (i in obj) {
          if (obj.hasOwnProperty(i)) {
            if (callback.call(obj, obj[i], i, obj) === false) {
              break;
            }
          }
        }
      }
    }

    return obj;
  }

  function extend(obj) {
    var args;

    if (arguments.length > 1) {
      args = toArray(arguments);

      if (Object.assign) {
        return Object.assign.apply(Object, args);
      }

      args.shift();

      each(args, function (arg) {
        each(arg, function (prop, i) {
          obj[i] = prop;
        });
      });
    }

    return obj;
  }

  function proxy(fn, context) {
    var args = toArray(arguments, 2);

    return function () {
      return fn.apply(context, args.concat(toArray(arguments)));
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
    return window.getComputedStyle ?
      window.getComputedStyle(element, null) :
      element.currentStyle;
  }

  function hasClass(element, value) {
    return element.classList ?
      element.classList.contains(value) :
      element.className.indexOf(value) > -1;
  }

  function addClass(element, value) {
    var className;

    if (!value) {
      return;
    }

    if (isNumber(element.length)) {
      return each(element, function (elem) {
        addClass(elem, value);
      });
    }

    if (element.classList) {
      return element.classList.add(value);
    }

    className = trim(element.className);

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
      return each(element, function (elem) {
        removeClass(elem, value);
      });
    }

    if (element.classList) {
      return element.classList.remove(value);
    }

    if (element.className.indexOf(value) >= 0) {
      element.className = element.className.replace(value, '');
    }
  }

  function toggleClass(element, value, added) {
    if (isNumber(element.length)) {
      return each(element, function (elem) {
        toggleClass(elem, value, added);
      });
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
      delete element.dataset[name];
    } else {
      element.removeAttribute('data-' + hyphenate(name));
    }
  }

  function addListener(element, type, handler, once) {
    var types = trim(type).split(REGEXP_SPACES);
    var originalHandler = handler;

    if (types.length > 1) {
      return each(types, function (type) {
        addListener(element, type, handler);
      });
    }

    if (once) {
      handler = function () {
        removeListener(element, type, handler);

        return originalHandler.apply(element, arguments);
      };
    }

    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    }
  }

  function removeListener(element, type, handler) {
    var types = trim(type).split(REGEXP_SPACES);

    if (types.length > 1) {
      return each(types, function (type) {
        removeListener(element, type, handler);
      });
    }

    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler);
    }
  }

  function dispatchEvent(element, type, data) {
    var event;

    if (element.dispatchEvent) {

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
      } else {
        // IE9-11
        if (isUndefined(data)) {
          event = document.createEvent('Event');
          event.initEvent(type, true, true);
        } else {
          event = document.createEvent('CustomEvent');
          event.initCustomEvent(type, true, true, data);
        }
      }

      // IE9+
      return element.dispatchEvent(event);
    } else if (element.fireEvent) {

      // IE6-10 (native events only)
      return element.fireEvent('on' + type);
    }
  }

  function preventDefault(e) {
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
  }

  function getEvent(event) {
    var e = event || window.event;
    var doc;

    // Fix target property (IE8)
    if (!e.target) {
      e.target = e.srcElement || document;
    }

    if (!isNumber(e.pageX)) {
      doc = document.documentElement;
      e.pageX = e.clientX + (window.scrollX || doc && doc.scrollLeft || 0) - (doc && doc.clientLeft || 0);
      e.pageY = e.clientY + (window.scrollY || doc && doc.scrollTop || 0) - (doc && doc.clientTop || 0);
    }

    return e;
  }

  function getOffset(element) {
    var doc = document.documentElement;
    var box = element.getBoundingClientRect();

    return {
      left: box.left + (window.scrollX || doc && doc.scrollLeft || 0) - (doc && doc.clientLeft || 0),
      top: box.top + (window.scrollY || doc && doc.scrollTop || 0) - (doc && doc.clientTop || 0)
    };
  }

  function getTouchesCenter(touches) {
    var length = touches.length;
    var pageX = 0;
    var pageY = 0;

    if (length) {
      each(touches, function (touch) {
        pageX += touch.pageX;
        pageY += touch.pageY;
      });

      pageX /= length;
      pageY /= length;
    }

    return {
      pageX: pageX,
      pageY: pageY
    };
  }

  function getByTag(element, tagName) {
    return element.getElementsByTagName(tagName);
  }

  function getByClass(element, className) {
    return element.getElementsByClassName ?
      element.getElementsByClassName(className) :
      element.querySelectorAll('.' + className);
  }

  function appendChild(element, elem) {
    if (elem.length) {
      return each(elem, function (el) {
        appendChild(element, el);
      });
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
    return isString(url) ? url.replace(/^.*\//, '').replace(/[\?&#].*$/, '') : '';
  }

  function getImageSize(image, callback) {
    var newImage;

    // Modern browsers
    if (image.naturalWidth) {
      return callback(image.naturalWidth, image.naturalHeight);
    }

    // IE8: Don't use `new Image()` here
    newImage = document.createElement('img');

    newImage.onload = function () {
      callback(this.width, this.height);
    };

    newImage.src = image.src;
  }

  function getTransform(data) {
    var transforms = [];
    var rotate = data.rotate;
    var scaleX = data.scaleX;
    var scaleY = data.scaleY;

    // Rotate should come first before scale
    if (isNumber(rotate)) {
      transforms.push('rotate(' + rotate + 'deg)');
    }

    if (isNumber(scaleX)) {
      transforms.push('scaleX(' + scaleX + ')');
    }

    if (isNumber(scaleY)) {
      transforms.push('scaleY(' + scaleY + ')');
    }

    return transforms.length ? transforms.join(' ') : 'none';
  }

  function getResponsiveClass(option) {
    switch (option) {
      case 2:
        return CLASS_HIDE_XS_DOWN;

      case 3:
        return CLASS_HIDE_SM_DOWN;

      case 4:
        return CLASS_HIDE_MD_DOWN;
    }
  }

  function Viewer(element, options) {
    var _this = this;

    _this.element = element;
    _this.options = extend({}, Viewer.DEFAULTS, isPlainObject(options) && options);
    _this.isImg = false;
    _this.isBuilt = false;
    _this.isShown = false;
    _this.isViewed = false;
    _this.isFulled = false;
    _this.isPlayed = false;
    _this.wheeling = false;
    _this.playing = false;
    _this.fading = false;
    _this.tooltiping = false;
    _this.transitioning = false;
    _this.action = false;
    _this.target = false;
    _this.timeout = false;
    _this.index = 0;
    _this.length = 0;
    _this.init();
  }

  Viewer.prototype = {
    constructor: Viewer,

    init: function () {
      var _this = this;
      var options = _this.options;
      var element = _this.element;
      var isImg = element.tagName.toLowerCase() === 'img';
      var images = isImg ? [element] : getByTag(element, 'img');
      var length = images.length;
      var ready = proxy(_this.ready, _this);

      if (getData(element, NAMESPACE)) {
        return;
      }

      setData(element, NAMESPACE, _this);

      if (!length) {
        return;
      }

      if (isFunction(options.ready)) {
        addListener(element, EVENT_READY, options.ready, true);
      }

      // Override `transition` option if it is not supported
      if (!SUPPORT_TRANSITION) {
        options.transition = false;
      }

      _this.isImg = isImg;
      _this.length = length;
      _this.count = 0;
      _this.images = images;
      _this.body = document.body;
      _this.scrollbarWidth = window.innerWidth - document.body.clientWidth;

      if (options.inline) {
        addListener(element, EVENT_READY, function () {
          _this.view();
        }, true);

        each(images, function (image) {
          if (image.complete) {
            ready();
          } else {
            addListener(image, EVENT_LOAD, ready, true);
          }
        });
      } else {
        addListener(element, EVENT_CLICK, (_this._start = proxy(_this.start, _this)));
      }
    },

    ready: function () {
      var _this = this;

      _this.count++;

      if (_this.count === _this.length) {
        _this.build();
      }
    },

    build: function () {
      var _this = this;
      var options = _this.options;
      var element = _this.element;
      var template;
      var parent;
      var viewer;
      var button;
      var toolbar;
      var navbar;
      var title;
      var rotate;

      if (_this.isBuilt) {
        return;
      }

      template = document.createElement('div');
      template.innerHTML = Viewer.TEMPLATE;

      _this.parent = parent = element.parentNode;
      _this.viewer = viewer = getByClass(template, 'viewer-container')[0];
      _this.canvas = getByClass(viewer, 'viewer-canvas')[0];
      _this.footer = getByClass(viewer, 'viewer-footer')[0];
      _this.title = title = getByClass(viewer, 'viewer-title')[0];
      _this.toolbar = toolbar = getByClass(viewer, 'viewer-toolbar')[0];
      _this.navbar = navbar = getByClass(viewer, 'viewer-navbar')[0];
      _this.button = button = getByClass(viewer, 'viewer-button')[0];
      _this.tooltipBox = getByClass(viewer, 'viewer-tooltip')[0];
      _this.player = getByClass(viewer, 'viewer-player')[0];
      _this.list = getByClass(viewer, 'viewer-list')[0];

      addClass(title, !options.title ? CLASS_HIDE : getResponsiveClass(options.title));
      addClass(toolbar, !options.toolbar ? CLASS_HIDE : getResponsiveClass(options.toolbar));
      addClass(navbar, !options.navbar ? CLASS_HIDE : getResponsiveClass(options.navbar));
      toggleClass(button, CLASS_HIDE, !options.button);

      toggleClass(toolbar.querySelector('.viewer-one-to-one'), CLASS_INVISIBLE, !options.zoomable);
      toggleClass(toolbar.querySelectorAll('li[class*="zoom"]'), CLASS_INVISIBLE, !options.zoomable);
      toggleClass(toolbar.querySelectorAll('li[class*="flip"]'), CLASS_INVISIBLE, !options.scalable);

      if (!options.rotatable) {
        rotate = toolbar.querySelectorAll('li[class*="rotate"]');
        addClass(rotate, CLASS_INVISIBLE);
        appendChild(toolbar, rotate);
      }

      if (options.inline) {
        addClass(button, CLASS_FULLSCREEN);
        setStyle(viewer, {
          zIndex: options.zIndexInline
        });

        if (getStyle(parent).position === 'static') {
          setStyle(parent, {
            position: 'relative'
          });
        }
      } else {
        addClass(button, CLASS_CLOSE);
        addClass(viewer, CLASS_FIXED);
        addClass(viewer, CLASS_FADE);
        addClass(viewer, CLASS_HIDE);

        setStyle(viewer, {
          zIndex: options.zIndex
        });
      }

      // Inserts the viewer after to the current element
      parent.insertBefore(viewer, element.nextSibling);

      if (options.inline) {
        _this.render();
        _this.bind();
        _this.isShown = true;
      }

      _this.isBuilt = true;

      dispatchEvent(element, EVENT_READY);
    },

    unbuild: function () {
      var _this = this;

      if (!_this.isBuilt) {
        return;
      }

      _this.isBuilt = false;
      removeChild(_this.viewer);
    },

    bind: function () {
      var _this = this;
      var options = _this.options;
      var element = _this.element;
      var viewer = _this.viewer;

      if (isFunction(options.view)) {
        addListener(element, EVENT_VIEW, options.view);
      }

      if (isFunction(options.viewed)) {
        addListener(element, EVENT_VIEWED, options.viewed);
      }

      addListener(viewer, EVENT_CLICK, (_this._click = proxy(_this.click, _this)));
      addListener(viewer, EVENT_WHEEL, (_this._wheel = proxy(_this.wheel, _this)));
      addListener(_this.canvas, EVENT_MOUSEDOWN, (_this._mousedown = proxy(_this.mousedown, _this)));
      addListener(document, EVENT_MOUSEMOVE, (_this._mousemove = proxy(_this.mousemove, _this)));
      addListener(document, EVENT_MOUSEUP, (_this._mouseup = proxy(_this.mouseup, _this)));
      addListener(document, EVENT_KEYDOWN, (_this._keydown = proxy(_this.keydown, _this)));
      addListener(window, EVENT_RESIZE, (_this._resize = proxy(_this.resize, _this)));
    },

    unbind: function () {
      var _this = this;
      var options = _this.options;
      var element = _this.element;
      var viewer = _this.viewer;

      if (isFunction(options.view)) {
        removeListener(element, EVENT_VIEW, options.view);
      }

      if (isFunction(options.viewed)) {
        removeListener(element, EVENT_VIEWED, options.viewed);
      }

      removeListener(viewer, EVENT_CLICK, _this._click);
      removeListener(viewer, EVENT_WHEEL, _this._wheel);
      removeListener(_this.canvas, EVENT_MOUSEDOWN, _this._mousedown);
      removeListener(document, EVENT_MOUSEMOVE, _this._mousemove);
      removeListener(document, EVENT_MOUSEUP, _this._mouseup);
      removeListener(document, EVENT_KEYDOWN, _this._keydown);
      removeListener(window, EVENT_RESIZE, _this._resize);
    },

    render: function () {
      var _this = this;

      _this.initContainer();
      _this.initViewer();
      _this.initList();
      _this.renderViewer();
    },

    initContainer: function () {
      var _this = this;

      _this.containerData = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    },

    initViewer: function () {
      var _this = this;
      var options = _this.options;
      var parent = _this.parent;
      var viewerData;

      if (options.inline) {
        _this.parentData = viewerData = {
          width: max(parent.offsetWidth, options.minWidth),
          height: max(parent.offsetHeight, options.minHeight)
        };
      }

      if (_this.isFulled || !viewerData) {
        viewerData = _this.containerData;
      }

      _this.viewerData = extend({}, viewerData);
    },

    renderViewer: function () {
      var _this = this;

      if (_this.options.inline && !_this.isFulled) {
        setStyle(_this.viewer, _this.viewerData);
      }
    },

    initList: function () {
      var _this = this;
      var options = _this.options;
      var element = _this.element;
      var list = _this.list;
      var items = [];

      each(_this.images, function (image, i) {
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

        items.push(
          '<li>' +
            '<img' +
              ' src="' + src + '"' +
              ' data-action="view"' +
              ' data-index="' +  i + '"' +
              ' data-original-url="' +  (url || src) + '"' +
              ' alt="' +  alt + '"' +
            '>' +
          '</li>'
        );
      });

      list.innerHTML = items.join('');

      each(getByTag(list, 'img'), function (image) {
        setData(image, 'filled', true);
        addListener(image, EVENT_LOAD, proxy(_this.loadImage, _this), true);
      });

      _this.items = getByTag(list, 'li');

      if (options.transition) {
        addListener(element, EVENT_VIEWED, function () {
          addClass(list, CLASS_TRANSITION);
        }, true);
      }
    },

    renderList: function (index) {
      var _this = this;
      var i = index || _this.index;
      var width = _this.items[i].offsetWidth || 30;
      var outerWidth = width + 1; // 1 pixel of `margin-left` width

      // Place the active item in the center of the screen
      setStyle(_this.list, {
        width: outerWidth * _this.length,
        marginLeft: (_this.viewerData.width - width) / 2 - outerWidth * i
      });
    },

    resetList: function () {
      var _this = this;

      empty(_this.list);
      removeClass(_this.list, CLASS_TRANSITION);
      setStyle({
        marginLeft: 0
      });
    },

    initImage: function (callback) {
      var _this = this;
      var options = _this.options;
      var image = _this.image;
      var viewerData = _this.viewerData;
      var footerHeight = _this.footer.offsetHeight;
      var viewerWidth = viewerData.width;
      var viewerHeight = max(viewerData.height - footerHeight, footerHeight);
      var oldImageData = _this.imageData || {};

      getImageSize(image, function (naturalWidth, naturalHeight) {
        var aspectRatio = naturalWidth / naturalHeight;
        var width = viewerWidth;
        var height = viewerHeight;
        var initialImageData;
        var imageData;

        if (viewerHeight * aspectRatio > viewerWidth) {
          height = viewerWidth / aspectRatio;
        } else {
          width = viewerHeight * aspectRatio;
        }

        width = min(width * 0.9, naturalWidth);
        height = min(height * 0.9, naturalHeight);

        imageData = {
          naturalWidth: naturalWidth,
          naturalHeight: naturalHeight,
          aspectRatio: aspectRatio,
          ratio: width / naturalWidth,
          width: width,
          height: height,
          left: (viewerWidth - width) / 2,
          top: (viewerHeight - height) / 2
        };

        initialImageData = extend({}, imageData);

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

        _this.imageData = imageData;
        _this.initialImageData = initialImageData;

        if (isFunction(callback)) {
          callback();
        }
      });
    },

    renderImage: function (callback) {
      var _this = this;
      var image = _this.image;
      var imageData = _this.imageData;
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
        if (_this.transitioning) {
          addListener(image, EVENT_TRANSITIONEND, callback, true);
        } else {
          callback();
        }
      }
    },

    resetImage: function () {
      var _this = this;

      // this.image only defined after viewed
      if (_this.image) {
        removeChild(_this.image);
        _this.image = null;
      }
    },

    start: function (event) {
      var _this = this;
      var e = getEvent(event);
      var target = e.target;

      if (target.tagName.toLowerCase() === 'img') {
        _this.target = target;
        _this.show();
      }
    },

    click: function (event) {
      var _this = this;
      var e = getEvent(event);
      var target = e.target;
      var action = getData(target, 'action');
      var imageData = _this.imageData;

      switch (action) {
        case 'mix':
          if (_this.isPlayed) {
            _this.stop();
          } else {
            if (_this.options.inline) {
              if (_this.isFulled) {
                _this.exit();
              } else {
                _this.full();
              }
            } else {
              _this.hide();
            }
          }

          break;

        case 'view':
          _this.view(getData(target, 'index'));
          break;

        case 'zoom-in':
          _this.zoom(0.1, true);
          break;

        case 'zoom-out':
          _this.zoom(-0.1, true);
          break;

        case 'one-to-one':
          _this.toggle();
          break;

        case 'reset':
          _this.reset();
          break;

        case 'prev':
          _this.prev();
          break;

        case 'play':
          _this.play();
          break;

        case 'next':
          _this.next();
          break;

        case 'rotate-left':
          _this.rotate(-90);
          break;

        case 'rotate-right':
          _this.rotate(90);
          break;

        case 'flip-horizontal':
          _this.scaleX(-imageData.scaleX || -1);
          break;

        case 'flip-vertical':
          _this.scaleY(-imageData.scaleY || -1);
          break;

        default:
          if (_this.isPlayed) {
            _this.stop();
          }
      }
    },

    load: function () {
      var _this = this;
      var options = _this.options;
      var image = _this.image;
      var index = _this.index;
      var viewerData = _this.viewerData;

      if (_this.timeout) {
        clearTimeout(_this.timeout);
        _this.timeout = false;
      }

      removeClass(image, CLASS_INVISIBLE);

      image.style.cssText = (
        'width:0;' +
        'height:0;' +
        'margin-left:' + viewerData.width / 2 + 'px;' +
        'margin-top:' + viewerData.height / 2 + 'px;' +
        'max-width:none!important;' +
        'visibility:visible;'
      );

      _this.initImage(function () {
        toggleClass(image, CLASS_TRANSITION, options.transition);
        toggleClass(image, CLASS_MOVE, options.movable);

        _this.renderImage(function () {
          _this.isViewed = true;
          dispatchEvent(_this.element, EVENT_VIEWED, {
            originalImage: _this.images[index],
            index: index,
            image: image
          });
        });
      });
    },

    loadImage: function (event) {
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
        } else {
          if (filled) {
            height = parentWidth / aspectRatio;
          } else {
            width = parentHeight * aspectRatio;
          }
        }

        setStyle(image, {
          width: width,
          height: height,
          marginLeft: (parentWidth - width) / 2,
          marginTop: (parentHeight - height) / 2
        });
      });
    },

    resize: function () {
      var _this = this;

      _this.initContainer();
      _this.initViewer();
      _this.renderViewer();
      _this.renderList();

      if (_this.isViewed) {
        _this.initImage(function () {
          _this.renderImage();
        });
      }

      if (_this.isPlayed) {
        each(getByTag(_this.player, 'img'), function (image) {
          addListener(image, EVENT_LOAD, proxy(_this.loadImage, _this), true);
          dispatchEvent(image, EVENT_LOAD);
        });
      }
    },

    wheel: function (event) {
      var _this = this;
      var e = getEvent(event);
      var ratio = Number(_this.options.zoomRatio) || 0.1;
      var delta = 1;

      if (!_this.isViewed) {
        return;
      }

      preventDefault(e);

      // Limit wheel speed to prevent zoom too fast
      if (_this.wheeling) {
        return;
      }

      _this.wheeling = true;

      setTimeout(function () {
        _this.wheeling = false;
      }, 50);

      if (e.deltaY) {
        delta = e.deltaY > 0 ? 1 : -1;
      } else if (e.wheelDelta) {
        delta = -e.wheelDelta / 120;
      } else if (e.detail) {
        delta = e.detail > 0 ? 1 : -1;
      }

      _this.zoom(-delta * ratio, true, e);
    },

    keydown: function (event) {
      var _this = this;
      var e = getEvent(event);
      var options = _this.options;
      var key = e.keyCode || e.which || e.charCode;

      if (!_this.isFulled || !options.keyboard) {
        return;
      }

      switch (key) {

        // (Key: Esc)
        case 27:
          if (_this.isPlayed) {
            _this.stop();
          } else {
            if (options.inline) {
              if (_this.isFulled) {
                _this.exit();
              }
            } else {
              _this.hide();
            }
          }

          break;

        // (Key: Space)
        case 32:
          if (_this.isPlayed) {
            _this.stop();
          }

          break;

        // View previous (Key: ←)
        case 37:
          _this.prev();
          break;

        // Zoom in (Key: ↑)
        case 38:

          // Prevent scroll on Firefox
          preventDefault(e);

          _this.zoom(options.zoomRatio, true);
          break;

        // View next (Key: →)
        case 39:
          _this.next();
          break;

        // Zoom out (Key: ↓)
        case 40:

          // Prevent scroll on Firefox
          preventDefault(e);

          _this.zoom(-options.zoomRatio, true);
          break;

        // Zoom out to initial size (Key: Ctrl + 0)
        case 48:
          // Go to next

        // Zoom in to natural size (Key: Ctrl + 1)
        case 49:
          if (e.ctrlKey || e.shiftKey) {
            preventDefault(e);
            _this.toggle();
          }

          break;

        // No default
      }
    },

    mousedown: function (event) {
      var _this = this;
      var options = _this.options;
      var e = getEvent(event);
      var action = options.movable ? 'move' : false;
      var touches = e.touches;
      var touchesLength;
      var touch;

      if (!_this.isViewed) {
        return;
      }

      if (touches) {
        touchesLength = touches.length;

        if (touchesLength > 1) {
          if (options.zoomable && touchesLength === 2) {
            touch = touches[1];
            _this.startX2 = touch.pageX;
            _this.startY2 = touch.pageY;
            action = 'zoom';
          } else {
            return;
          }
        } else {
          if (_this.isSwitchable()) {
            action = 'switch';
          }
        }

        touch = touches[0];
      }

      if (action) {
        preventDefault(e);
        _this.action = action;
        _this.startX = touch ? touch.pageX : e.pageX;
        _this.startY = touch ? touch.pageY : e.pageY;
      }
    },

    mousemove: function (event) {
      var _this = this;
      var options = _this.options;
      var e = getEvent(event);
      var action = _this.action;
      var image = _this.image;
      var touches = e.touches;
      var touchesLength;
      var touch;

      if (!_this.isViewed) {
        return;
      }

      if (touches) {
        touchesLength = touches.length;

        if (touchesLength > 1) {
          if (options.zoomable && touchesLength === 2) {
            touch = touches[1];
            _this.endX2 = touch.pageX;
            _this.endY2 = touch.pageY;
          } else {
            return;
          }
        }

        touch = touches[0];
      }

      if (action) {
        preventDefault(e);

        if (action === 'move' && options.transition && hasClass(image, CLASS_TRANSITION)) {
          removeClass(image, CLASS_TRANSITION);
        }

        _this.endX = touch ? touch.pageX : e.pageX;
        _this.endY = touch ? touch.pageY : e.pageY;

        _this.change(e);
      }
    },

    mouseup: function (event) {
      var _this = this;
      var e = getEvent(event);
      var action = _this.action;

      if (action) {
        preventDefault(e);

        if (action === 'move' && _this.options.transition) {
          addClass(_this.image, CLASS_TRANSITION);
        }

        _this.action = false;
      }
    },

    // Show the viewer (only available in modal mode)
    show: function () {
      var _this = this;
      var options = _this.options;
      var element = _this.element;
      var viewer;

      if (options.inline || _this.transitioning) {
        return _this;
      }

      if (!_this.isBuilt) {
        _this.build();
      }

      viewer = _this.viewer;

      if (isFunction(options.show)) {
        addListener(element, EVENT_SHOW, options.show, true);
      }

      if (dispatchEvent(element, EVENT_SHOW) === false) {
        return _this;
      }

      _this.open();
      removeClass(viewer, CLASS_HIDE);

      addListener(element, EVENT_SHOWN, function () {
        _this.view(_this.target ? inArray(_this.target, toArray(_this.images)) : _this.index);
        _this.target = false;
      }, true);

      if (options.transition) {
        _this.transitioning = true;
        addClass(viewer, CLASS_TRANSITION);
        forceReflow(viewer);
        addListener(viewer, EVENT_TRANSITIONEND, proxy(_this.shown, _this), true);
        addClass(viewer, CLASS_IN);
      } else {
        addClass(viewer, CLASS_IN);
        _this.shown();
      }

      return _this;
    },

    // Hide the viewer (only available in modal mode)
    hide: function () {
      var _this = this;
      var options = _this.options;
      var element = _this.element;
      var viewer = _this.viewer;

      if (options.inline || _this.transitioning || !_this.isShown) {
        return _this;
      }

      if (isFunction(options.hide)) {
        addListener(element, EVENT_HIDE, options.hide, true);
      }

      if (dispatchEvent(element, EVENT_HIDE) === false) {
        return _this;
      }

      if (_this.isViewed && options.transition) {
        _this.transitioning = true;
        addListener(_this.image, EVENT_TRANSITIONEND, function () {
          addListener(viewer, EVENT_TRANSITIONEND, proxy(_this.hidden, _this), true);
          removeClass(viewer, CLASS_IN);
        }, true);
        _this.zoomTo(0, false, false, true);
      } else {
        removeClass(viewer, CLASS_IN);
        _this.hidden();
      }

      return _this;
    },

    /**
     * View one of the images with image's index
     *
     * @param {Number} index
     */
    view: function (index) {
      var _this = this;
      var element = _this.element;
      var title = _this.title;
      var canvas = _this.canvas;
      var image;
      var item;
      var img;
      var url;
      var alt;

      index = Number(index) || 0;

      if (!_this.isShown || _this.isPlayed || index < 0 || index >= _this.length ||
        _this.isViewed && index === _this.index) {
        return _this;
      }

      item = _this.items[index];
      img = getByTag(item, 'img')[0];
      url = getData(img, 'originalUrl');
      alt = img.getAttribute('alt');

      image = document.createElement('img');
      image.src = url;
      image.alt = alt;

      if (dispatchEvent(element, EVENT_VIEW, {
        originalImage: _this.images[index],
        index: index,
        image: image
      }) === false) {
        return _this;
      }

      _this.image = image;

      if (_this.isViewed) {
        removeClass(_this.items[_this.index], CLASS_ACTIVE);
      }

      addClass(item, CLASS_ACTIVE);

      _this.isViewed = false;
      _this.index = index;
      _this.imageData = null;

      addClass(image, CLASS_INVISIBLE);
      empty(canvas);
      appendChild(canvas, image);

      // Center current item
      _this.renderList();

      // Clear title
      empty(title);

      // Generate title after viewed
      addListener(element, EVENT_VIEWED, function () {
        var imageData = _this.imageData;
        var width = imageData.naturalWidth;
        var height = imageData.naturalHeight;

        setText(title, alt + ' (' + width + ' × ' + height + ')');
      }, true);

      if (image.complete) {
        _this.load();
      } else {
        addListener(image, EVENT_LOAD, proxy(_this.load, _this), true);

        if (_this.timeout) {
          clearTimeout(_this.timeout);
        }

        // Make the image visible if it fails to load within 1s
        _this.timeout = setTimeout(function () {
          removeClass(image, CLASS_INVISIBLE);
          _this.timeout = false;
        }, 1000);
      }

      return _this;
    },

    // View the previous image
    prev: function () {
      var _this = this;

      _this.view(max(_this.index - 1, 0));

      return _this;
    },

    // View the next image
    next: function () {
      var _this = this;

      _this.view(min(_this.index + 1, _this.length - 1));

      return _this;
    },

    /**
     * Move the image with relative offsets
     *
     * @param {Number} offsetX
     * @param {Number} offsetY (optional)
     */
    move: function (offsetX, offsetY) {
      var _this = this;
      var imageData = _this.imageData;

      _this.moveTo(
        isUndefined(offsetX) ? offsetX : imageData.left + Number(offsetX),
        isUndefined(offsetY) ? offsetY : imageData.top + Number(offsetY)
      );

      return _this;
    },

    /**
     * Move the image to an absolute point
     *
     * @param {Number} x
     * @param {Number} y (optional)
     */
    moveTo: function (x, y) {
      var _this = this;
      var imageData = _this.imageData;
      var changed = false;

      // If "y" is not present, its default value is "x"
      if (isUndefined(y)) {
        y = x;
      }

      x = Number(x);
      y = Number(y);

      if (_this.isViewed && !_this.isPlayed && _this.options.movable) {
        if (isNumber(x)) {
          imageData.left = x;
          changed = true;
        }

        if (isNumber(y)) {
          imageData.top = y;
          changed = true;
        }

        if (changed) {
          _this.renderImage();
        }
      }

      return _this;
    },

    /**
     * Zoom the image with a relative ratio
     *
     * @param {Number} ratio
     * @param {Boolean} hasTooltip (optional)
     * @param {Event} _originalEvent (private)
     */
    zoom: function (ratio, hasTooltip, _originalEvent) {
      var _this = this;
      var imageData = _this.imageData;

      ratio = Number(ratio);

      if (ratio < 0) {
        ratio =  1 / (1 - ratio);
      } else {
        ratio = 1 + ratio;
      }

      _this.zoomTo(imageData.width * ratio / imageData.naturalWidth, hasTooltip, _originalEvent);

      return _this;
    },

    /**
     * Zoom the image to an absolute ratio
     *
     * @param {Number} ratio
     * @param {Boolean} hasTooltip (optional)
     * @param {Event} _originalEvent (private)
     * @param {Boolean} _zoomable (private)
     */
    zoomTo: function (ratio, hasTooltip, _originalEvent, _zoomable) {
      var _this = this;
      var options = _this.options;
      var minZoomRatio = 0.01;
      var maxZoomRatio = 100;
      var imageData = _this.imageData;
      var newWidth;
      var newHeight;
      var offset;
      var center;

      ratio = max(0, ratio);

      if (isNumber(ratio) && _this.isViewed && !_this.isPlayed && (_zoomable || options.zoomable)) {
        if (!_zoomable) {
          minZoomRatio = max(minZoomRatio, options.minZoomRatio);
          maxZoomRatio = min(maxZoomRatio, options.maxZoomRatio);
          ratio = min(max(ratio, minZoomRatio), maxZoomRatio);
        }

        if (ratio > 0.95 && ratio < 1.05) {
          ratio = 1;
        }

        newWidth = imageData.naturalWidth * ratio;
        newHeight = imageData.naturalHeight * ratio;

        if (_originalEvent) {
          offset = getOffset(_this.viewer);
          center = _originalEvent.touches ? getTouchesCenter(_originalEvent.touches) : {
            pageX: _originalEvent.pageX,
            pageY: _originalEvent.pageY
          };

          // Zoom from the triggering point of the event
          imageData.left -= (newWidth - imageData.width) * (
            ((center.pageX - offset.left) - imageData.left) / imageData.width
          );
          imageData.top -= (newHeight - imageData.height) * (
            ((center.pageY - offset.top) - imageData.top) / imageData.height
          );
        } else {

          // Zoom from the center of the image
          imageData.left -= (newWidth - imageData.width) / 2;
          imageData.top -= (newHeight - imageData.height) / 2;
        }

        imageData.width = newWidth;
        imageData.height = newHeight;
        imageData.ratio = ratio;
        _this.renderImage();

        if (hasTooltip) {
          _this.tooltip();
        }
      }

      return _this;
    },

    /**
     * Rotate the image with a relative degree
     *
     * @param {Number} degree
     */
    rotate: function (degree) {
      var _this = this;

      _this.rotateTo((_this.imageData.rotate || 0) + Number(degree));

      return _this;
    },

    /**
     * Rotate the image to an absolute degree
     * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#rotate()
     *
     * @param {Number} degree
     */
    rotateTo: function (degree) {
      var _this = this;
      var imageData = _this.imageData;

      degree = Number(degree);

      if (isNumber(degree) && _this.isViewed && !_this.isPlayed && _this.options.rotatable) {
        imageData.rotate = degree;
        _this.renderImage();
      }

      return _this;
    },

    /**
     * Scale the image
     * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#scale()
     *
     * @param {Number} scaleX
     * @param {Number} scaleY (optional)
     */
    scale: function (scaleX, scaleY) {
      var _this = this;
      var imageData = _this.imageData;
      var changed = false;

      // If "scaleY" is not present, its default value is "scaleX"
      if (isUndefined(scaleY)) {
        scaleY = scaleX;
      }

      scaleX = Number(scaleX);
      scaleY = Number(scaleY);

      if (_this.isViewed && !_this.isPlayed && _this.options.scalable) {
        if (isNumber(scaleX)) {
          imageData.scaleX = scaleX;
          changed = true;
        }

        if (isNumber(scaleY)) {
          imageData.scaleY = scaleY;
          changed = true;
        }

        if (changed) {
          _this.renderImage();
        }
      }

      return _this;
    },

    /**
     * Scale the abscissa of the image
     *
     * @param {Number} scaleX
     */
    scaleX: function (scaleX) {
      var _this = this;

      _this.scale(scaleX, _this.imageData.scaleY);

      return _this;
    },

    /**
     * Scale the ordinate of the image
     *
     * @param {Number} scaleY
     */
    scaleY: function (scaleY) {
      var _this = this;

      _this.scale(_this.imageData.scaleX, scaleY);

      return _this;
    },

    // Play the images
    play: function () {
      var _this = this;
      var options = _this.options;
      var player = _this.player;
      var load = proxy(_this.loadImage, _this);
      var list = [];
      var total = 0;
      var index = 0;
      var playing;

      if (!_this.isShown || _this.isPlayed) {
        return _this;
      }

      if (options.fullscreen) {
        _this.requestFullscreen();
      }

      _this.isPlayed = true;
      addClass(player, CLASS_SHOW);

      each(_this.items, function (item, i) {
        var img = getByTag(item, 'img')[0];
        var image = document.createElement('img');

        image.src = getData(img, 'originalUrl');
        image.alt = img.getAttribute('alt');
        total++;

        addClass(image, CLASS_FADE);
        toggleClass(image, CLASS_TRANSITION, options.transition);

        if (hasClass(item, CLASS_ACTIVE)) {
          addClass(image, CLASS_IN);
          index = i;
        }

        list.push(image);
        addListener(image, EVENT_LOAD, load, true);
        appendChild(player, image);
      });

      if (isNumber(options.interval) && options.interval > 0) {
        playing = function () {
          _this.playing = setTimeout(function () {
            removeClass(list[index], CLASS_IN);
            index++;
            index = index < total ? index : 0;
            addClass(list[index], CLASS_IN);

            playing();
          }, options.interval);
        };

        if (total > 1) {
          playing();
        }
      }

      return _this;
    },

    // Stop play
    stop: function () {
      var _this = this;
      var player = _this.player;

      if (!_this.isPlayed) {
        return _this;
      }

      if (_this.options.fullscreen) {
        _this.exitFullscreen();
      }

      _this.isPlayed = false;
      clearTimeout(_this.playing);
      removeClass(player, CLASS_SHOW);
      empty(player);

      return _this;
    },

    // Enter modal mode (only available in inline mode)
    full: function () {
      var _this = this;
      var options = _this.options;
      var viewer = _this.viewer;
      var image = _this.image;
      var list = _this.list;

      if (!_this.isShown || _this.isPlayed || _this.isFulled || !options.inline) {
        return _this;
      }

      _this.isFulled = true;
      _this.open();
      addClass(_this.button, CLASS_FULLSCREEN_EXIT);

      if (options.transition) {
        removeClass(image, CLASS_TRANSITION);
        removeClass(list, CLASS_TRANSITION);
      }

      addClass(viewer, CLASS_FIXED);
      viewer.setAttribute('style', '');
      setStyle(viewer, {
        zIndex: options.zIndex
      });

      _this.initContainer();
      _this.viewerData = extend({}, _this.containerData);
      _this.renderList();
      _this.initImage(function () {
        _this.renderImage(function () {
          if (options.transition) {
            setTimeout(function () {
              addClass(image, CLASS_TRANSITION);
              addClass(list, CLASS_TRANSITION);
            }, 0);
          }
        });
      });

      return _this;
    },

    // Exit modal mode (only available in inline mode)
    exit: function () {
      var _this = this;
      var options = _this.options;
      var viewer = _this.viewer;
      var image = _this.image;
      var list = _this.list;

      if (!_this.isFulled) {
        return _this;
      }

      _this.isFulled = false;
      _this.close();
      removeClass(_this.button, CLASS_FULLSCREEN_EXIT);

      if (options.transition) {
        removeClass(image, CLASS_TRANSITION);
        removeClass(list, CLASS_TRANSITION);
      }

      removeClass(viewer, CLASS_FIXED);
      setStyle(viewer, {
        zIndex: options.zIndexInline
      });

      _this.viewerData = extend({}, _this.parentData);
      _this.renderViewer();
      _this.renderList();
      _this.initImage(function () {
        _this.renderImage(function () {
          if (options.transition) {
            setTimeout(function () {
              addClass(image, CLASS_TRANSITION);
              addClass(list, CLASS_TRANSITION);
            }, 0);
          }
        });
      });

      return _this;
    },

    // Show the current ratio of the image with percentage
    tooltip: function () {
      var _this = this;
      var options = _this.options;
      var tooltipBox = _this.tooltipBox;
      var imageData = _this.imageData;

      if (!_this.isViewed || _this.isPlayed || !options.tooltip) {
        return _this;
      }

      setText(tooltipBox, round(imageData.ratio * 100) + '%');

      if (!_this.tooltiping) {
        if (options.transition) {
          if (_this.fading) {
            dispatchEvent(tooltipBox, EVENT_TRANSITIONEND);
          }

          addClass(tooltipBox, CLASS_SHOW);
          addClass(tooltipBox, CLASS_FADE);
          addClass(tooltipBox, CLASS_TRANSITION);
          forceReflow(tooltipBox);
          addClass(tooltipBox, CLASS_IN);
        } else {
          addClass(tooltipBox, CLASS_SHOW);
        }
      } else {
        clearTimeout(_this.tooltiping);
      }

      _this.tooltiping = setTimeout(function () {
        if (options.transition) {
          addListener(tooltipBox, EVENT_TRANSITIONEND, function () {
            removeClass(tooltipBox, CLASS_SHOW);
            removeClass(tooltipBox, CLASS_FADE);
            removeClass(tooltipBox, CLASS_TRANSITION);
            _this.fading = false;
          }, true);

          removeClass(tooltipBox, CLASS_IN);
          _this.fading = true;
        } else {
          removeClass(tooltipBox, CLASS_SHOW);
        }

        _this.tooltiping = false;
      }, 1000);

      return _this;
    },

    // Toggle the image size between its natural size and initial size
    toggle: function () {
      var _this = this;

      if (_this.imageData.ratio === 1) {
        _this.zoomTo(_this.initialImageData.ratio, true);
      } else {
        _this.zoomTo(1, true);
      }

      return _this;
    },

    // Reset the image to its initial state
    reset: function () {
      var _this = this;

      if (_this.isViewed && !_this.isPlayed) {
        _this.imageData = extend({}, _this.initialImageData);
        _this.renderImage();
      }

      return _this;
    },

    // Update viewer when images changed
    update: function () {
      var _this = this;
      var indexes = [];
      var index;

      // Destroy viewer if the target image was deleted
      if (_this.isImg && !_this.element.parentNode) {
        return _this.destroy();
      }

      _this.length = _this.images.length;

      if (_this.isBuilt) {
        each(_this.items, function (item, i) {
          var img = getByTag(item, 'img')[0];
          var image = _this.images[i];

          if (image) {
            if (image.src !== img.src) {
              indexes.push(i);
            }
          } else {
            indexes.push(i);
          }
        });

        setStyle(_this.list, {
          width: 'auto'
        });

        _this.initList();

        if (_this.isShown) {
          if (_this.length) {
            if (_this.isViewed) {
              index = inArray(_this.index, indexes);

              if (index >= 0) {
                _this.isViewed = false;
                _this.view(max(_this.index - (index + 1), 0));
              } else {
                addClass(_this.items[_this.index], CLASS_ACTIVE);
              }
            }
          } else {
            _this.image = null;
            _this.isViewed = false;
            _this.index = 0;
            _this.imageData = null;
            empty(_this.canvas);
            empty(_this.title);
          }
        }
      }

      return _this;
    },

    // Destroy the viewer
    destroy: function () {
      var _this = this;
      var element = _this.element;

      if (_this.options.inline) {
        _this.unbind();
      } else {
        if (_this.isShown) {
          _this.unbind();
        }

        removeListener(element, EVENT_CLICK, _this._start);
      }

      _this.unbuild();
      removeData(element, NAMESPACE);

      return _this;
    },

    open: function () {
      var body = this.body;

      addClass(body, CLASS_OPEN);
      body.style.paddingRight = this.scrollbarWidth + 'px';
    },

    close: function () {
      var body = this.body;

      removeClass(body, CLASS_OPEN);
      body.style.paddingRight = 0;
    },

    shown: function () {
      var _this = this;
      var options = _this.options;
      var element = _this.element;

      _this.transitioning = false;
      _this.isFulled = true;
      _this.isShown = true;
      _this.isVisible = true;
      _this.render();
      _this.bind();

      if (isFunction(options.shown)) {
        addListener(element, EVENT_SHOWN, options.shown, true);
      }

      dispatchEvent(element, EVENT_SHOWN);
    },

    hidden: function () {
      var _this = this;
      var options = _this.options;
      var element = _this.element;

      _this.transitioning = false;
      _this.isViewed = false;
      _this.isFulled = false;
      _this.isShown = false;
      _this.isVisible = false;
      _this.unbind();
      _this.close();
      addClass(_this.viewer, CLASS_HIDE);
      _this.resetList();
      _this.resetImage();

      if (isFunction(options.hidden)) {
        addListener(element, EVENT_HIDDEN, options.hidden, true);
      }

      dispatchEvent(element, EVENT_HIDDEN);
    },

    requestFullscreen: function () {
      var _this = this;
      var documentElement = document.documentElement;

      if (_this.isFulled && !document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {

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

    exitFullscreen: function () {
      var _this = this;

      if (_this.isFulled) {
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

    change: function (originalEvent) {
      var _this = this;
      var offsetX = _this.endX - _this.startX;
      var offsetY = _this.endY - _this.startY;

      switch (_this.action) {

        // Move the current image
        case 'move':
          _this.move(offsetX, offsetY);
          break;

        // Zoom the current image
        case 'zoom':
          _this.zoom(function (x1, y1, x2, y2) {
            var z1 = sqrt(x1 * x1 + y1 * y1);
            var z2 = sqrt(x2 * x2 + y2 * y2);

            return (z2 - z1) / z1;
          }(
            abs(_this.startX - _this.startX2),
            abs(_this.startY - _this.startY2),
            abs(_this.endX - _this.endX2),
            abs(_this.endY - _this.endY2)
          ), false, originalEvent);

          _this.startX2 = _this.endX2;
          _this.startY2 = _this.endY2;
          break;

        case 'switch':
          _this.action = 'switched';

          if (abs(offsetX) > abs(offsetY)) {
            if (offsetX > 1) {
              _this.prev();
            } else if (offsetX < -1) {
              _this.next();
            }
          }

          break;

        // No default
      }

      // Override
      _this.startX = _this.endX;
      _this.startY = _this.endY;
    },

    isSwitchable: function () {
      var _this = this;
      var imageData = _this.imageData;
      var viewerData = _this.viewerData;

      return imageData.left >= 0 && imageData.top >= 0 &&
        imageData.width <= viewerData.width &&
        imageData.height <= viewerData.height;
    }
  };

  Viewer.DEFAULTS = {

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
    build: null,
    built: null,
    show: null,
    shown: null,
    hide: null,
    hidden: null,
    view: null,
    viewed: null
  };

  Viewer.TEMPLATE = (
    '<div class="viewer-container">' +
      '<div class="viewer-canvas"></div>' +
      '<div class="viewer-footer">' +
        '<div class="viewer-title"></div>' +
        '<ul class="viewer-toolbar">' +
          '<li class="viewer-zoom-in" data-action="zoom-in"></li>' +
          '<li class="viewer-zoom-out" data-action="zoom-out"></li>' +
          '<li class="viewer-one-to-one" data-action="one-to-one"></li>' +
          '<li class="viewer-reset" data-action="reset"></li>' +
          '<li class="viewer-prev" data-action="prev"></li>' +
          '<li class="viewer-play" data-action="play"></li>' +
          '<li class="viewer-next" data-action="next"></li>' +
          '<li class="viewer-rotate-left" data-action="rotate-left"></li>' +
          '<li class="viewer-rotate-right" data-action="rotate-right"></li>' +
          '<li class="viewer-flip-horizontal" data-action="flip-horizontal"></li>' +
          '<li class="viewer-flip-vertical" data-action="flip-vertical"></li>' +
        '</ul>' +
        '<div class="viewer-navbar">' +
          '<ul class="viewer-list"></ul>' +
        '</div>' +
      '</div>' +
      '<div class="viewer-tooltip"></div>' +
      '<div class="viewer-button" data-action="mix"></div>' +
      '<div class="viewer-player"></div>' +
    '</div>'
  );

  var _Viewer = window.Viewer;

  Viewer.noConflict = function () {
    window.Viewer = _Viewer;
    return Viewer;
  };

  Viewer.setDefaults = function (options) {
    extend(Viewer.DEFAULTS, options);
  };

  if (typeof define === 'function' && define.amd) {
    define('viewer', [], function () {
      return Viewer;
    });
  }

  if (!noGlobal) {
    window.Viewer = Viewer;
  }

  return Viewer;

});
