/*!
 * Viewer v0.6.0
 * https://github.com/fengyuanchen/viewer
 *
 * Copyright (c) 2014-2017 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2017-10-07T09:53:36.889Z
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

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

var _window = window;
var PointerEvent = _window.PointerEvent;


var NAMESPACE = 'viewer';

// Actions
var ACTION_MOVE = 'move';
var ACTION_SWITCH = 'switch';
var ACTION_ZOOM = 'zoom';

// Classes
var CLASS_ACTIVE = NAMESPACE + '-active';
var CLASS_CLOSE = NAMESPACE + '-close';
var CLASS_FADE = NAMESPACE + '-fade';
var CLASS_FIXED = NAMESPACE + '-fixed';
var CLASS_FULLSCREEN = NAMESPACE + '-fullscreen';
var CLASS_FULLSCREEN_EXIT = NAMESPACE + '-fullscreen-exit';
var CLASS_HIDE = NAMESPACE + '-hide';
var CLASS_HIDE_MD_DOWN = NAMESPACE + '-hide-md-down';
var CLASS_HIDE_SM_DOWN = NAMESPACE + '-hide-sm-down';
var CLASS_HIDE_XS_DOWN = NAMESPACE + '-hide-xs-down';
var CLASS_IN = NAMESPACE + '-in';
var CLASS_INVISIBLE = NAMESPACE + '-invisible';
var CLASS_MOVE = NAMESPACE + '-move';
var CLASS_OPEN = NAMESPACE + '-open';
var CLASS_SHOW = NAMESPACE + '-show';
var CLASS_TRANSITION = NAMESPACE + '-transition';

// Events
var EVENT_READY = 'ready';
var EVENT_SHOW = 'show';
var EVENT_SHOWN = 'shown';
var EVENT_HIDE = 'hide';
var EVENT_HIDDEN = 'hidden';
var EVENT_VIEW = 'view';
var EVENT_VIEWED = 'viewed';
var EVENT_CLICK = 'click';
var EVENT_DRAG_START = 'dragstart';
var EVENT_KEY_DOWN = 'keydown';
var EVENT_LOAD = 'load';
var EVENT_POINTER_DOWN = PointerEvent ? 'pointerdown' : 'touchstart mousedown';
var EVENT_POINTER_MOVE = PointerEvent ? 'pointermove' : 'mousemove touchmove';
var EVENT_POINTER_UP = PointerEvent ? 'pointerup pointercancel' : 'touchend touchcancel mouseup';
var EVENT_RESIZE = 'resize';
var EVENT_TRANSITIONEND = 'transitionend';
var EVENT_WHEEL = 'wheel mousewheel DOMMouseScroll';

/**
 * Check if the given value is a string.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a string, else `false`.
 */
function isString(value) {
  return typeof value === 'string';
}

/**
 * Check if the given value is not a number.
 */
var isNaN = Number.isNaN || window.isNaN;

/**
 * Check if the given value is a number.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a number, else `false`.
 */
function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Check if the given value is undefined.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is undefined, else `false`.
 */
function isUndefined(value) {
  return typeof value === 'undefined';
}

/**
 * Takes a function and returns a new one that will always have a particular context.
 * Custom proxy to avoid jQuery's guid.
 * @param {Function} fn - The target function.
 * @param {Object} context - The new context for the function.
 * @returns {boolean} The new function.
 */
function proxy(fn, context) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args2 = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args2[_key2] = arguments[_key2];
    }

    return fn.apply(context, args.concat(args2));
  };
}

/**
 * Get the own enumerable properties of a given object.
 * @param {Object} obj - The target object.
 * @returns {Array} All the own enumerable properties of the given object.
 */
var objectKeys = Object.keys || function objectKeys(obj) {
  var keys = [];

  $.each(obj, function (key) {
    keys.push(key);
  });

  return keys;
};

/**
 * Get transform values from an object.
 * @param {Object} obj - The target object.
 * @returns {string} A string contains transform values.
 */
function getTransformValues(_ref) {
  var rotate = _ref.rotate,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY;

  var values = [];

  if (isNumber(rotate) && rotate !== 0) {
    values.push('rotate(' + rotate + 'deg)');
  }

  if (isNumber(scaleX) && scaleX !== 1) {
    values.push('scaleX(' + scaleX + ')');
  }

  if (isNumber(scaleY) && scaleY !== 1) {
    values.push('scaleY(' + scaleY + ')');
  }

  return values.length > 0 ? values.join(' ') : 'none';
}

/**
 * Get an image name from an image url.
 * @param {string} url - The target url.
 * @example
 * // picture.jpg
 * getImageNameFromURL('http://domain.com/path/to/picture.jpg?size=1280×960')
 * @returns {string} A string contains the image name.
 */
function getImageNameFromURL(url) {
  return isString(url) ? url.replace(/^.*\//, '').replace(/[?&#].*$/, '') : '';
}

/**
 * Get an image's natural sizes.
 * @param {string} image - The target image.
 * @param {Function} callback - The callback function.
 */
function getImageNaturalSizes(image, callback) {
  // Modern browsers and IE9+
  if (image.naturalWidth) {
    callback(image.naturalWidth, image.naturalHeight);
    return;
  }

  // IE8 (Don't use `new Image()` here)
  var newImage = document.createElement('img');

  newImage.onload = function () {
    callback(newImage.width, newImage.height);
  };

  newImage.src = image.src;
}

/**
 * Get the related class name of a responsive type number.
 * @param {string} type - The responsive type.
 * @returns {string} The related class name.
 */
function getResponsiveClass(type) {
  switch (type) {
    case 2:
      return CLASS_HIDE_XS_DOWN;

    case 3:
      return CLASS_HIDE_SM_DOWN;

    case 4:
      return CLASS_HIDE_MD_DOWN;

    default:
      return '';
  }
}

/**
 * Get the max ratio of a group of pointers.
 * @param {string} pointers - The target pointers.
 * @returns {number} The result ratio.
 */
function getMaxZoomRatio(pointers) {
  var pointers2 = $.extend({}, pointers);
  var ratios = [];

  $.each(pointers, function (pointerId, pointer) {
    delete pointers2[pointerId];

    $.each(pointers2, function (pointerId2, pointer2) {
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

/**
 * Get a pointer from an event object.
 * @param {Object} event - The target event object.
 * @param {boolean} endOnly - Indicates if only returns the end point coordinate or not.
 * @returns {Object} The result pointer contains start and/or end point coordinates.
 */
function getPointer(_ref2, endOnly) {
  var pageX = _ref2.pageX,
      pageY = _ref2.pageY;

  var end = {
    endX: pageX,
    endY: pageY
  };

  if (endOnly) {
    return end;
  }

  return $.extend({
    startX: pageX,
    startY: pageY
  }, end);
}

/**
 * Get the center point coordinate of a group of pointers.
 * @param {Object} pointers - The target pointers.
 * @returns {Object} The center point coordinate.
 */
function getPointersCenter(pointers) {
  var pageX = 0;
  var pageY = 0;
  var count = 0;

  $.each(pointers, function (pointerId, _ref3) {
    var startX = _ref3.startX,
        startY = _ref3.startY;

    pageX += startX;
    pageY += startY;
    count += 1;
  });

  pageX /= count;
  pageY /= count;

  return {
    pageX: pageX,
    pageY: pageY
  };
}

var render = {
  render: function render() {
    this.initContainer();
    this.initViewer();
    this.initList();
    this.renderViewer();
  },
  initContainer: function initContainer() {
    var $window = $(window);

    this.container = {
      width: $window.innerWidth(),
      height: $window.innerHeight()
    };
  },
  initViewer: function initViewer() {
    var options = this.options,
        $parent = this.$parent;

    var viewer = void 0;

    if (options.inline) {
      viewer = {
        width: Math.max($parent.width(), options.minWidth),
        height: Math.max($parent.height(), options.minHeight)
      };
      this.parent = viewer;
    }

    if (this.fulled || !viewer) {
      viewer = this.container;
    }

    this.viewer = $.extend({}, viewer);
  },
  renderViewer: function renderViewer() {
    if (this.options.inline && !this.fulled) {
      this.$viewer.css(this.viewer);
    }
  },
  initList: function initList() {
    var $element = this.$element,
        options = this.options,
        $list = this.$list;

    var list = [];

    this.$images.each(function (i, image) {
      var alt = image.alt || getImageNameFromURL(image);
      var src = image.src;
      var url = options.url;


      if (!src) {
        return;
      }

      if (isString(url)) {
        url = image.getAttribute(url);
      } else if ($.isFunction(url)) {
        url = url.call(image, image);
      }

      list.push('<li>' + '<img' + (' src="' + src + '"') + ' data-action="view"' + (' data-index="' + i + '"') + (' data-original-url="' + (url || src) + '"') + (' alt="' + alt + '"') + '>' + '</li>');
    });

    $list.html(list.join('')).find('img').one(EVENT_LOAD, {
      filled: true
    }, $.proxy(this.loadImage, this));

    this.$items = $list.children();

    if (options.transition) {
      $element.one(EVENT_VIEWED, function () {
        $list.addClass(CLASS_TRANSITION);
      });
    }
  },
  renderList: function renderList(index) {
    var i = index || this.index;
    var width = this.$items.eq(i).width();

    // 1 pixel of `margin-left` width
    var outerWidth = width + 1;

    // Place the active item in the center of the screen
    this.$list.css({
      width: outerWidth * this.length,
      marginLeft: (this.viewer.width - width) / 2 - outerWidth * i
    });
  },
  resetList: function resetList() {
    this.$list.empty().removeClass(CLASS_TRANSITION).css('margin-left', 0);
  },
  initImage: function initImage(callback) {
    var _this = this;

    var options = this.options,
        $image = this.$image,
        viewer = this.viewer;

    var footerHeight = this.$footer.height();
    var viewerWidth = viewer.width;
    var viewerHeight = Math.max(viewer.height - footerHeight, footerHeight);
    var oldImage = this.image || {};

    getImageNaturalSizes($image[0], function (naturalWidth, naturalHeight) {
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

      var image = {
        naturalWidth: naturalWidth,
        naturalHeight: naturalHeight,
        aspectRatio: aspectRatio,
        ratio: width / naturalWidth,
        width: width,
        height: height,
        left: (viewerWidth - width) / 2,
        top: (viewerHeight - height) / 2
      };
      var initialImage = $.extend({}, image);

      if (options.rotatable) {
        image.rotate = oldImage.rotate || 0;
        initialImage.rotate = 0;
      }

      if (options.scalable) {
        image.scaleX = oldImage.scaleX || 1;
        image.scaleY = oldImage.scaleY || 1;
        initialImage.scaleX = 1;
        initialImage.scaleY = 1;
      }

      _this.image = image;
      _this.initialImage = initialImage;

      if ($.isFunction(callback)) {
        callback();
      }
    });
  },
  renderImage: function renderImage(callback) {
    var image = this.image,
        $image = this.$image;


    $image.css({
      width: image.width,
      height: image.height,
      marginLeft: image.left,
      marginTop: image.top,
      transform: getTransformValues(image)
    });

    if ($.isFunction(callback)) {
      if (this.transitioning) {
        $image.one(EVENT_TRANSITIONEND, callback);
      } else {
        callback();
      }
    }
  },
  resetImage: function resetImage() {
    if (this.$image) {
      this.$image.remove();
      this.$image = null;
    }
  }
};

var events = {
  bind: function bind() {
    var $element = this.$element,
        options = this.options;


    if ($.isFunction(options.view)) {
      $element.on(EVENT_VIEW, options.view);
    }

    if ($.isFunction(options.viewed)) {
      $element.on(EVENT_VIEWED, options.viewed);
    }

    this.$viewer.on(EVENT_CLICK, $.proxy(this.click, this)).on(EVENT_WHEEL, $.proxy(this.wheel, this)).on(EVENT_DRAG_START, $.proxy(this.dragstart, this));

    this.$canvas.on(EVENT_POINTER_DOWN, $.proxy(this.pointerdown, this));

    $(document).on(EVENT_POINTER_MOVE, this.onPointerMove = proxy(this.pointermove, this)).on(EVENT_POINTER_UP, this.onPointerUp = proxy(this.pointerup, this)).on(EVENT_KEY_DOWN, this.onKeyDown = proxy(this.keydown, this));

    $(window).on(EVENT_RESIZE, this.onResize = proxy(this.resize, this));
  },
  unbind: function unbind() {
    var $element = this.$element,
        options = this.options;


    if ($.isFunction(options.view)) {
      $element.off(EVENT_VIEW, options.view);
    }

    if ($.isFunction(options.viewed)) {
      $element.off(EVENT_VIEWED, options.viewed);
    }

    this.$viewer.off(EVENT_CLICK, this.click).off(EVENT_WHEEL, this.wheel).off(EVENT_DRAG_START, this.dragstart);

    this.$canvas.off(EVENT_POINTER_DOWN, this.pointerdown);

    $(document).off(EVENT_POINTER_MOVE, this.onPointerMove).off(EVENT_POINTER_UP, this.onPointerUp).off(EVENT_KEY_DOWN, this.onKeyDown);

    $(window).off(EVENT_RESIZE, this.onResize);
  }
};

var handlers = {
  click: function click(e) {
    var $target = $(e.target);
    var action = $target.data('action');
    var image = this.image;


    switch (action) {
      case 'mix':
        if (this.played) {
          this.stop();
        } else if (this.options.inline) {
          if (this.fulled) {
            this.exit();
          } else {
            this.full();
          }
        } else {
          this.hide();
        }

        break;

      case 'view':
        this.view($target.data('index'));
        break;

      case 'zoom-in':
        this.zoom(0.1, true);
        break;

      case 'zoom-out':
        this.zoom(-0.1, true);
        break;

      case 'one-to-one':
        this.toggle();
        break;

      case 'reset':
        this.reset();
        break;

      case 'prev':
        this.prev();
        break;

      case 'play':
        this.play();
        break;

      case 'next':
        this.next();
        break;

      case 'rotate-left':
        this.rotate(-90);
        break;

      case 'rotate-right':
        this.rotate(90);
        break;

      case 'flip-horizontal':
        this.scaleX(-image.scaleX || -1);
        break;

      case 'flip-vertical':
        this.scaleY(-image.scaleY || -1);
        break;

      default:
        if (this.played) {
          this.stop();
        }
    }
  },
  dragstart: function dragstart(e) {
    if ($(e.target).is('img')) {
      e.preventDefault();
    }
  },
  keydown: function keydown(e) {
    var options = this.options;


    if (!this.fulled || !options.keyboard) {
      return;
    }

    switch (e.which) {
      // (Key: Esc)
      case 27:
        if (this.played) {
          this.stop();
        } else if (options.inline) {
          if (this.fulled) {
            this.exit();
          }
        } else {
          this.hide();
        }

        break;

      // (Key: Space)
      case 32:
        if (this.played) {
          this.stop();
        }

        break;

      // View previous (Key: ←)
      case 37:
        this.prev();
        break;

      // Zoom in (Key: ↑)
      case 38:
        // Prevent scroll on Firefox
        e.preventDefault();

        this.zoom(options.zoomRatio, true);
        break;

      // View next (Key: →)
      case 39:
        this.next();
        break;

      // Zoom out (Key: ↓)
      case 40:
        // Prevent scroll on Firefox
        e.preventDefault();

        this.zoom(-options.zoomRatio, true);
        break;

      // 48: Zoom out to initial size (Key: Ctrl + 0)
      // 49: Zoom in to natural size (Key: Ctrl + 1)
      case 48:
      case 49:
        if (e.ctrlKey || e.shiftKey) {
          e.preventDefault();
          this.toggle();
        }

        break;

      default:
    }
  },
  load: function load() {
    var _this = this;

    var options = this.options,
        viewer = this.viewer,
        $image = this.$image;


    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = false;
    }

    if (!$image) {
      return;
    }

    $image.removeClass(CLASS_INVISIBLE).css('cssText', '' + ('width:0;' + 'height:0;' + 'margin-left:') + viewer.width / 2 + 'px;' + ('margin-top:' + viewer.height / 2 + 'px;') + 'max-width:none!important;' + 'visibility:visible;');

    this.initImage(function () {
      $image.toggleClass(CLASS_TRANSITION, options.transition).toggleClass(CLASS_MOVE, options.movable);

      _this.renderImage(function () {
        _this.viewed = true;
        _this.trigger(EVENT_VIEWED);
      });
    });
  },
  loadImage: function loadImage(e) {
    var image = e.target;
    var $image = $(image);
    var $parent = $image.parent();
    var parentWidth = $parent.width();
    var parentHeight = $parent.height();
    var filled = e.data && e.data.filled;

    getImageNaturalSizes(image, function (naturalWidth, naturalHeight) {
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

      $image.css({
        width: width,
        height: height,
        marginLeft: (parentWidth - width) / 2,
        marginTop: (parentHeight - height) / 2
      });
    });
  },
  pointerdown: function pointerdown(e) {
    if (!this.viewed || this.transitioning) {
      return;
    }

    var options = this.options,
        pointers = this.pointers;
    var originalEvent = e.originalEvent;


    if (originalEvent && originalEvent.changedTouches) {
      $.each(originalEvent.changedTouches, function (i, touch) {
        pointers[touch.identifier] = getPointer(touch);
      });
    } else {
      pointers[originalEvent && originalEvent.pointerId || 0] = getPointer(originalEvent || e);
    }

    var action = options.movable ? ACTION_MOVE : false;

    if (objectKeys(pointers).length > 1) {
      action = ACTION_ZOOM;
    } else if ((e.pointerType === 'touch' || e.type === 'touchmove') && this.isSwitchable()) {
      action = ACTION_SWITCH;
    }

    this.action = action;
  },
  pointermove: function pointermove(e) {
    var $image = this.$image,
        action = this.action,
        pointers = this.pointers;


    if (!this.viewed || !action) {
      return;
    }

    e.preventDefault();

    var originalEvent = e.originalEvent;


    if (originalEvent && originalEvent.changedTouches) {
      $.each(originalEvent.changedTouches, function (i, touch) {
        $.extend(pointers[touch.identifier], getPointer(touch, true));
      });
    } else {
      $.extend(pointers[originalEvent && originalEvent.pointerId || 0], getPointer(e, true));
    }

    if (action === ACTION_MOVE && this.options.transition && $image.hasClass(CLASS_TRANSITION)) {
      $image.removeClass(CLASS_TRANSITION);
    }

    this.change(e);
  },
  pointerup: function pointerup(e) {
    if (!this.viewed) {
      return;
    }

    var action = this.action,
        pointers = this.pointers;
    var originalEvent = e.originalEvent;


    if (originalEvent && originalEvent.changedTouches) {
      $.each(originalEvent.changedTouches, function (i, touch) {
        delete pointers[touch.identifier];
      });
    } else {
      delete pointers[originalEvent && originalEvent.pointerId || 0];
    }

    if (!action) {
      return;
    }

    if (action === ACTION_MOVE && this.options.transition) {
      this.$image.addClass(CLASS_TRANSITION);
    }

    this.action = false;
  },
  resize: function resize() {
    var _this2 = this;

    this.initContainer();
    this.initViewer();
    this.renderViewer();
    this.renderList();

    if (this.viewed) {
      this.initImage(function () {
        _this2.renderImage();
      });
    }

    if (this.played) {
      if (this.options.fullscreen && this.fulled && !document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        this.stop();
        return;
      }

      this.$player.find('img').one(EVENT_LOAD, $.proxy(this.loadImage, this)).trigger(EVENT_LOAD);
    }
  },
  start: function start(_ref) {
    var target = _ref.target;

    if ($(target).is('img')) {
      this.target = target;
      this.show();
    }
  },
  wheel: function wheel(e) {
    var _this3 = this;

    if (!this.viewed) {
      return;
    }

    e.preventDefault();

    // Limit wheel speed to prevent zoom too fast
    if (this.wheeling) {
      return;
    }

    this.wheeling = true;

    setTimeout(function () {
      _this3.wheeling = false;
    }, 50);

    var originalEvent = e.originalEvent || e;
    var delta = 1;

    if (originalEvent.deltaY) {
      delta = originalEvent.deltaY > 0 ? 1 : -1;
    } else if (originalEvent.wheelDelta) {
      delta = -originalEvent.wheelDelta / 120;
    } else if (originalEvent.detail) {
      delta = originalEvent.detail > 0 ? 1 : -1;
    }

    this.zoom(-delta * (Number(this.options.zoomRatio) || 0.1), true, e);
  }
};

var methods = {
  /**
   * Show the viewer (only available in modal mode).
   */
  show: function show() {
    var _this = this;

    var $element = this.$element,
        options = this.options;


    if (options.inline || this.transitioning) {
      return;
    }

    if (!this.ready) {
      this.build();
    }

    var $viewer = this.$viewer;


    if ($.isFunction(options.show)) {
      $element.one(EVENT_SHOW, options.show);
    }

    if (this.trigger(EVENT_SHOW).isDefaultPrevented()) {
      return;
    }

    this.$body.addClass(CLASS_OPEN);
    $viewer.removeClass(CLASS_HIDE);
    $element.one(EVENT_SHOWN, function () {
      _this.view(_this.target ? _this.$images.index(_this.target) : _this.index);
      _this.target = false;
    });

    if (options.transition) {
      this.transitioning = true;
      $viewer.addClass(CLASS_TRANSITION);

      // Force reflow to enable CSS3 transition
      // eslint-disable-next-line
      $viewer[0].offsetWidth;
      $viewer.one(EVENT_TRANSITIONEND, $.proxy(this.shown, this)).addClass(CLASS_IN);
    } else {
      $viewer.addClass(CLASS_IN);
      this.shown();
    }
  },


  /**
   * Hide the viewer (only available in modal mode).
   */
  hide: function hide() {
    var _this2 = this;

    var options = this.options,
        $viewer = this.$viewer;


    if (options.inline || this.transitioning || !this.visible) {
      return;
    }

    if ($.isFunction(options.hide)) {
      this.$element.one(EVENT_HIDE, options.hide);
    }

    if (this.trigger(EVENT_HIDE).isDefaultPrevented()) {
      return;
    }

    if (this.viewed && options.transition) {
      this.transitioning = true;
      this.$image.one(EVENT_TRANSITIONEND, function () {
        $viewer.one(EVENT_TRANSITIONEND, $.proxy(_this2.hidden, _this2)).removeClass(CLASS_IN);
      });
      this.zoomTo(0, false, false, true);
    } else {
      $viewer.removeClass(CLASS_IN);
      this.hidden();
    }
  },


  /**
   * View one of the images with image's index.
   * @param {number} index - The image index.
   */
  view: function view(index) {
    var _this3 = this;

    index = Number(index) || 0;

    if (!this.visible || this.played || index < 0 || index >= this.length || this.viewed && index === this.index) {
      return;
    }

    if (this.trigger(EVENT_VIEW).isDefaultPrevented()) {
      return;
    }

    var $item = this.$items.eq(index);
    var $img = $item.find('img');
    var alt = $img.attr('alt');
    var $image = $('<img src="' + $img.data('originalUrl') + '" alt="' + alt + '">');

    this.$image = $image;
    this.$items.eq(this.index).removeClass(CLASS_ACTIVE);
    $item.addClass(CLASS_ACTIVE);
    this.viewed = false;
    this.index = index;
    this.image = null;
    this.$canvas.html($image.addClass(CLASS_INVISIBLE));

    // Center current item
    this.renderList();

    var $title = this.$title;

    // Clear title

    $title.empty();

    // Generate title after viewed
    this.$element.one(EVENT_VIEWED, function () {
      var _image = _this3.image,
          naturalWidth = _image.naturalWidth,
          naturalHeight = _image.naturalHeight;


      $title.html(alt + ' (' + naturalWidth + ' &times; ' + naturalHeight + ')');
    });

    if ($image[0].complete) {
      this.load();
    } else {
      $image.one(EVENT_LOAD, $.proxy(this.load, this));

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      // Make the image visible if it fails to load within 1s
      this.timeout = setTimeout(function () {
        $image.removeClass(CLASS_INVISIBLE);
        _this3.timeout = false;
      }, 1000);
    }
  },


  /**
   * View the previous image.
   */
  prev: function prev() {
    this.view(Math.max(this.index - 1, 0));
  },


  /**
   * View the next image.
   */
  next: function next() {
    this.view(Math.min(this.index + 1, this.length - 1));
  },


  /**
   * Move the image with relative offsets.
   * @param {number} offsetX - The relative offset distance on the x-axis.
   * @param {number} offsetY - The relative offset distance on the y-axis.
   */
  move: function move(offsetX, offsetY) {
    var _image2 = this.image,
        left = _image2.left,
        top = _image2.top;


    this.moveTo(isUndefined(offsetX) ? offsetX : left + Number(offsetX), isUndefined(offsetY) ? offsetY : top + Number(offsetY));
  },


  /**
   * Move the image to an absolute point.
   * @param {number} x - The x-axis coordinate.
   * @param {number} [y=x] - The y-axis coordinate.
   */
  moveTo: function moveTo(x) {
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;

    if (!this.viewed || this.played || !this.options.movable) {
      return;
    }

    var image = this.image;

    var changed = false;

    x = Number(x);
    y = Number(y);

    if (isNumber(x)) {
      image.left = x;
      changed = true;
    }

    if (isNumber(y)) {
      image.top = y;
      changed = true;
    }

    if (changed) {
      this.renderImage();
    }
  },


  /**
   * Zoom the image with a relative ratio.
   * @param {number} ratio - The target ratio.
   * @param {boolean} [hasTooltip] - Indicates if it has a tooltip or not.
   * @param {Event} [_event] - The related event if any.
   */
  zoom: function zoom(ratio) {
    var hasTooltip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var _event = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var image = this.image;


    ratio = Number(ratio);

    if (ratio < 0) {
      ratio = 1 / (1 - ratio);
    } else {
      ratio = 1 + ratio;
    }

    this.zoomTo(image.width * ratio / image.naturalWidth, hasTooltip, _event);
  },


  /**
   * Zoom the image to an absolute ratio.
   * @param {number} ratio - The target ratio.
   * @param {boolean} [hasTooltip] - Indicates if it has a tooltip or not.
   * @param {Event} [_event] - The related event if any.
   * @param {Event} [_zoomable] - Indicates if the current zoom is available or not.
   */
  zoomTo: function zoomTo(ratio) {
    var hasTooltip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var _event = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var _zoomable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var options = this.options,
        image = this.image,
        pointers = this.pointers;


    ratio = Math.max(0, ratio);

    if (isNumber(ratio) && this.viewed && !this.played && (_zoomable || options.zoomable)) {
      if (!_zoomable) {
        var minZoomRatio = Math.max(0.01, options.minZoomRatio);
        var maxZoomRatio = Math.min(100, options.maxZoomRatio);

        ratio = Math.min(Math.max(ratio, minZoomRatio), maxZoomRatio);
      }

      if (_event && ratio > 0.95 && ratio < 1.05) {
        ratio = 1;
      }

      var newWidth = image.naturalWidth * ratio;
      var newHeight = image.naturalHeight * ratio;

      if (_event && _event.originalEvent) {
        var offset = this.$viewer.offset();
        var center = pointers && objectKeys(pointers).length > 0 ? getPointersCenter(pointers) : {
          pageX: _event.pageX || _event.originalEvent.pageX || 0,
          pageY: _event.pageY || _event.originalEvent.pageY || 0
        };

        // Zoom from the triggering point of the event
        image.left -= (newWidth - image.width) * ((center.pageX - offset.left - image.left) / image.width);
        image.top -= (newHeight - image.height) * ((center.pageY - offset.top - image.top) / image.height);
      } else {
        // Zoom from the center of the image
        image.left -= (newWidth - image.width) / 2;
        image.top -= (newHeight - image.height) / 2;
      }

      image.width = newWidth;
      image.height = newHeight;
      image.ratio = ratio;
      this.renderImage();

      if (hasTooltip) {
        this.tooltip();
      }
    }
  },


  /**
   * Rotate the image with a relative degree.
   * @param {number} degree - The rotate degree.
   */
  rotate: function rotate(degree) {
    this.rotateTo((this.image.rotate || 0) + Number(degree));
  },


  /**
   * Rotate the image to an absolute degree.
   * @param {number} degree - The rotate degree.
   */
  rotateTo: function rotateTo(degree) {
    var image = this.image;


    degree = Number(degree);

    if (isNumber(degree) && this.viewed && !this.played && this.options.rotatable) {
      image.rotate = degree;
      this.renderImage();
    }
  },


  /**
   * Scale the image on the x-axis.
   * @param {number} scaleX - The scale ratio on the x-axis.
   */
  scaleX: function scaleX(_scaleX) {
    this.scale(_scaleX, this.image.scaleY);
  },


  /**
   * Scale the image on the y-axis.
   * @param {number} scaleY - The scale ratio on the y-axis.
   */
  scaleY: function scaleY(_scaleY) {
    this.scale(this.image.scaleX, _scaleY);
  },


  /**
   * Scale the image.
   * @param {number} scaleX - The scale ratio on the x-axis.
   * @param {number} [scaleY=scaleX] - The scale ratio on the y-axis.
   */
  scale: function scale(scaleX) {
    var scaleY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : scaleX;

    if (!this.viewed || this.played || !this.options.scalable) {
      return;
    }

    var image = this.image;

    var changed = false;

    scaleX = Number(scaleX);
    scaleY = Number(scaleY);

    if (isNumber(scaleX)) {
      image.scaleX = scaleX;
      changed = true;
    }

    if (isNumber(scaleY)) {
      image.scaleY = scaleY;
      changed = true;
    }

    if (changed) {
      this.renderImage();
    }
  },


  /**
   * Play the images.
   */
  play: function play() {
    var _this4 = this;

    if (!this.visible || this.played) {
      return;
    }

    var options = this.options,
        $items = this.$items,
        $player = this.$player;


    if (options.fullscreen) {
      this.requestFullscreen();
    }

    this.played = true;
    $player.addClass(CLASS_SHOW);

    var list = [];
    var index = 0;

    $items.each(function (i, item) {
      var $item = $(item);
      var $img = $item.find('img');
      var $image = $('<img src="' + $img.data('originalUrl') + '" alt="' + $img.attr('alt') + '">');

      $image.addClass(CLASS_FADE).toggleClass(CLASS_TRANSITION, options.transition);

      if ($item.hasClass(CLASS_ACTIVE)) {
        $image.addClass(CLASS_IN);
        index = i;
      }

      list.push($image);
      $image.one(EVENT_LOAD, {
        filled: false
      }, $.proxy(_this4.loadImage, _this4));
      $player.append($image);
    });

    if (isNumber(options.interval) && options.interval > 0) {
      var length = $items.length;

      var playing = function playing() {
        _this4.playing = setTimeout(function () {
          list[index].removeClass(CLASS_IN);
          index += 1;
          index = index < length ? index : 0;
          list[index].addClass(CLASS_IN);
          playing();
        }, options.interval);
      };

      if (length > 1) {
        playing();
      }
    }
  },


  /**
   * Stop play.
   */
  stop: function stop() {
    if (!this.played) {
      return;
    }

    if (this.options.fullscreen) {
      this.exitFullscreen();
    }

    this.played = false;
    clearTimeout(this.playing);
    this.$player.removeClass(CLASS_SHOW).empty();
  },


  /**
   * Enter modal mode (only available in inline mode).
   */
  full: function full() {
    var _this5 = this;

    var options = this.options,
        $image = this.$image,
        $list = this.$list;


    if (!this.visible || this.played || this.fulled || !options.inline) {
      return;
    }

    this.fulled = true;
    this.$body.addClass(CLASS_OPEN);
    this.$button.addClass(CLASS_FULLSCREEN_EXIT);

    if (options.transition) {
      $image.removeClass(CLASS_TRANSITION);
      $list.removeClass(CLASS_TRANSITION);
    }

    this.$viewer.addClass(CLASS_FIXED).removeAttr('style').css('z-index', options.zIndex);
    this.initContainer();
    this.viewer = $.extend({}, this.container);
    this.renderList();
    this.initImage(function () {
      _this5.renderImage(function () {
        if (options.transition) {
          setTimeout(function () {
            $image.addClass(CLASS_TRANSITION);
            $list.addClass(CLASS_TRANSITION);
          }, 0);
        }
      });
    });
  },


  /**
   * Exit modal mode (only available in inline mode).
   */
  exit: function exit() {
    var _this6 = this;

    if (!this.fulled) {
      return;
    }

    var options = this.options,
        $image = this.$image,
        $list = this.$list;


    this.fulled = false;
    this.$body.removeClass(CLASS_OPEN);
    this.$button.removeClass(CLASS_FULLSCREEN_EXIT);

    if (options.transition) {
      $image.removeClass(CLASS_TRANSITION);
      $list.removeClass(CLASS_TRANSITION);
    }

    this.$viewer.removeClass(CLASS_FIXED).css('z-index', options.zIndexInline);
    this.viewer = $.extend({}, this.parent);
    this.renderViewer();
    this.renderList();
    this.initImage(function () {
      _this6.renderImage(function () {
        if (options.transition) {
          setTimeout(function () {
            $image.addClass(CLASS_TRANSITION);
            $list.addClass(CLASS_TRANSITION);
          }, 0);
        }
      });
    });
  },


  /**
   * Show the current ratio of the image with percentage.
   */
  tooltip: function tooltip() {
    var _this7 = this;

    var options = this.options,
        $tooltip = this.$tooltip,
        image = this.image;

    var classes = [CLASS_SHOW, CLASS_FADE, CLASS_TRANSITION].join(' ');

    if (!this.viewed || this.played || !options.tooltip) {
      return;
    }

    $tooltip.text(Math.round(image.ratio * 100) + '%');

    if (!this.tooltiping) {
      if (options.transition) {
        if (this.fading) {
          $tooltip.trigger(EVENT_TRANSITIONEND);
        }

        $tooltip.addClass(classes);

        // Force reflow to enable CSS3 transition
        // eslint-disable-next-line
        $tooltip[0].offsetWidth;
        $tooltip.addClass(CLASS_IN);
      } else {
        $tooltip.addClass(CLASS_SHOW);
      }
    } else {
      clearTimeout(this.tooltiping);
    }

    this.tooltiping = setTimeout(function () {
      if (options.transition) {
        $tooltip.one(EVENT_TRANSITIONEND, function () {
          $tooltip.removeClass(classes);
          _this7.fading = false;
        }).removeClass(CLASS_IN);

        _this7.fading = true;
      } else {
        $tooltip.removeClass(CLASS_SHOW);
      }

      _this7.tooltiping = false;
    }, 1000);
  },


  /**
   * Toggle the image size between its natural size and initial size.
   */
  toggle: function toggle() {
    if (this.image.ratio === 1) {
      this.zoomTo(this.initialImage.ratio, true);
    } else {
      this.zoomTo(1, true);
    }
  },


  /**
   * Reset the image to its initial state.
   */
  reset: function reset() {
    if (this.viewed && !this.played) {
      this.image = $.extend({}, this.initialImage);
      this.renderImage();
    }
  },


  /**
   * Update viewer when images changed.
   */
  update: function update() {
    var $element = this.$element;
    var $images = this.$images;


    if (this.isImg) {
      // Destroy viewer if the target image was deleted
      if (!$element.parent().length) {
        this.destroy();
        return;
      }
    } else {
      $images = $element.find('img');
      this.$images = $images;
      this.length = $images.length;
    }

    if (this.ready) {
      var indexes = [];
      var index = void 0;

      $.each(this.$items, function (i, item) {
        var img = $(item).find('img')[0];
        var image = $images[i];

        if (image) {
          if (image.src !== img.src) {
            indexes.push(i);
          }
        } else {
          indexes.push(i);
        }
      });

      this.$list.width('auto');
      this.initList();

      if (this.visible) {
        if (this.length) {
          if (this.viewed) {
            index = $.inArray(this.index, indexes);

            if (index >= 0) {
              this.viewed = false;
              this.view(Math.max(this.index - (index + 1), 0));
            } else {
              this.$items.eq(this.index).addClass(CLASS_ACTIVE);
            }
          }
        } else {
          this.$image = null;
          this.viewed = false;
          this.index = 0;
          this.image = null;
          this.$canvas.empty();
          this.$title.empty();
        }
      }
    }
  },


  /**
   * Destroy the viewer instance.
   */
  destroy: function destroy() {
    var $element = this.$element;


    if (this.options.inline) {
      this.unbind();
    } else {
      if (this.visible) {
        this.unbind();
      }

      $element.off(EVENT_CLICK, this.start);
    }

    this.unbuild();
    $element.removeData(NAMESPACE);
  }
};

var _window$1 = window;
var document$1 = _window$1.document;


var others = {
  // A shortcut for triggering custom events
  trigger: function trigger(type, data) {
    var e = $.Event(type, data);

    this.$element.trigger(e);

    return e;
  },
  shown: function shown() {
    var options = this.options;


    this.transitioning = false;
    this.fulled = true;
    this.visible = true;
    this.render();
    this.bind();

    if ($.isFunction(options.shown)) {
      this.$element.one(EVENT_SHOWN, options.shown);
    }

    this.trigger(EVENT_SHOWN);
  },
  hidden: function hidden() {
    var options = this.options;


    this.transitioning = false;
    this.viewed = false;
    this.fulled = false;
    this.visible = false;
    this.unbind();
    this.$body.removeClass(CLASS_OPEN);
    this.$viewer.addClass(CLASS_HIDE);
    this.resetList();
    this.resetImage();

    if ($.isFunction(options.hidden)) {
      this.$element.one(EVENT_HIDDEN, options.hidden);
    }

    this.trigger(EVENT_HIDDEN);
  },
  requestFullscreen: function requestFullscreen() {
    if (this.fulled && !document$1.fullscreenElement && !document$1.mozFullScreenElement && !document$1.webkitFullscreenElement && !document$1.msFullscreenElement) {
      var documentElement = document$1.documentElement;


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
    if (this.fulled) {
      if (document$1.exitFullscreen) {
        document$1.exitFullscreen();
      } else if (document$1.msExitFullscreen) {
        document$1.msExitFullscreen();
      } else if (document$1.mozCancelFullScreen) {
        document$1.mozCancelFullScreen();
      } else if (document$1.webkitExitFullscreen) {
        document$1.webkitExitFullscreen();
      }
    }
  },
  change: function change(event) {
    var pointers = this.pointers;

    var pointer = pointers[Object.keys(pointers)[0]];
    var offsetX = pointer.endX - pointer.startX;
    var offsetY = pointer.endY - pointer.startY;

    switch (this.action) {
      // Move the current image
      case ACTION_MOVE:
        this.move(offsetX, offsetY);
        break;

      // Zoom the current image
      case ACTION_ZOOM:
        this.zoom(getMaxZoomRatio(pointers), false, event);

        this.startX2 = this.endX2;
        this.startY2 = this.endY2;
        break;

      case ACTION_SWITCH:
        this.action = 'switched';

        if (Math.abs(offsetX) > Math.abs(offsetY)) {
          if (offsetX > 1) {
            this.prev();
          } else if (offsetX < -1) {
            this.next();
          }
        }

        break;

      default:
    }

    // Override
    $.each(pointers, function (i, p) {
      p.startX = p.endX;
      p.startY = p.endY;
    });
  },
  isSwitchable: function isSwitchable() {
    var image = this.image,
        viewer = this.viewer;


    return image.left >= 0 && image.top >= 0 && image.width <= viewer.width && image.height <= viewer.height;
  }
};

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Viewer = function () {
  /**
   * Start the new Viewer.
   * @param {Element} element - The target element for viewing.
   * @param {Object} [options={}] - The configuration options.
   */
  function Viewer(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Viewer);

    if (!element || element.nodeType !== 1) {
      throw new Error('The first argument is required and must be an element.');
    }

    this.element = element;
    this.$element = $(element);
    this.options = $.extend({}, DEFAULTS, $.isPlainObject(options) && options);
    this.action = '';
    this.target = null;
    this.timeout = null;
    this.index = 0;
    this.length = 0;
    this.ready = false;
    this.fading = false;
    this.fulled = false;
    this.isImg = false;
    this.played = false;
    this.playing = false;
    this.tooltiping = false;
    this.transitioning = false;
    this.viewed = false;
    this.visible = false;
    this.wheeling = false;
    this.pointers = {};
    this.init();
  }

  _createClass(Viewer, [{
    key: 'init',
    value: function init() {
      var _this = this;

      var $element = this.$element,
          options = this.options;

      var isImg = $element.is('img');
      var $images = isImg ? $element : $element.find('img');
      var length = $images.length;


      if (!length) {
        return;
      }

      // Override `transition` option if it is not supported
      if (typeof document.createElement(NAMESPACE).style.transition === 'undefined') {
        options.transition = false;
      }

      this.isImg = isImg;
      this.length = length;
      this.count = 0;
      this.$images = $images;
      this.$body = $('body');

      if (options.inline) {
        $element.one(EVENT_READY, function () {
          _this.view();
        });

        $images.each(function (i, image) {
          if (image.complete) {
            _this.progress();
          } else {
            $(image).one(EVENT_LOAD, $.proxy(_this.progress, _this));
          }
        });
      } else {
        $element.on(EVENT_CLICK, $.proxy(this.start, this));
      }
    }
  }, {
    key: 'progress',
    value: function progress() {
      this.count += 1;

      if (this.count === this.length) {
        this.build();
      }
    }
  }, {
    key: 'build',
    value: function build() {
      var $element = this.$element,
          options = this.options;


      if (this.ready) {
        return;
      }

      var $parent = $element.parent();
      var $viewer = $(TEMPLATE);
      var $button = $viewer.find('.' + NAMESPACE + '-button');
      var $navbar = $viewer.find('.' + NAMESPACE + '-navbar');
      var $title = $viewer.find('.' + NAMESPACE + '-title');
      var $toolbar = $viewer.find('.' + NAMESPACE + '-toolbar');

      this.$parent = $parent;
      this.$viewer = $viewer;
      this.$button = $button;
      this.$navbar = $navbar;
      this.$title = $title;
      this.$toolbar = $toolbar;
      this.$canvas = $viewer.find('.' + NAMESPACE + '-canvas');
      this.$footer = $viewer.find('.' + NAMESPACE + '-footer');
      this.$list = $viewer.find('.' + NAMESPACE + '-list');
      this.$player = $viewer.find('.' + NAMESPACE + '-player');
      this.$tooltip = $viewer.find('.' + NAMESPACE + '-tooltip');

      $title.addClass(!options.title ? CLASS_HIDE : getResponsiveClass(options.title));
      $toolbar.addClass(!options.toolbar ? CLASS_HIDE : getResponsiveClass(options.toolbar));
      $toolbar.find('li[class*=zoom]').toggleClass(CLASS_INVISIBLE, !options.zoomable);
      $toolbar.find('li[class*=flip]').toggleClass(CLASS_INVISIBLE, !options.scalable);

      if (!options.rotatable) {
        $toolbar.find('li[class*=rotate]').addClass(CLASS_INVISIBLE).appendTo($toolbar);
      }

      $navbar.addClass(!options.navbar ? CLASS_HIDE : getResponsiveClass(options.navbar));
      $button.toggleClass(CLASS_HIDE, !options.button);

      if (options.inline) {
        $button.addClass(CLASS_FULLSCREEN);
        $viewer.css('z-index', options.zIndexInline);

        if ($parent.css('position') === 'static') {
          $parent.css('position', 'relative');
        }

        $element.after($viewer);
      } else {
        $button.addClass(CLASS_CLOSE);
        $viewer.css('z-index', options.zIndex).addClass([CLASS_FIXED, CLASS_FADE, CLASS_HIDE].join(' ')).appendTo('body');
      }

      if (options.inline) {
        this.render();
        this.bind();
        this.visible = true;
      }

      this.ready = true;

      if ($.isFunction(options.ready)) {
        $element.one(EVENT_READY, options.ready);
      }

      this.trigger(EVENT_READY);
    }
  }, {
    key: 'unbuild',
    value: function unbuild() {
      if (!this.ready) {
        return;
      }

      this.ready = false;
      this.$viewer.remove();
    }

    /**
     * Change the default options.
     * @static
     * @param {Object} options - The new default options.
     */

  }], [{
    key: 'setDefaults',
    value: function setDefaults(options) {
      $.extend(DEFAULTS, options);
    }
  }]);

  return Viewer;
}();

$.extend(Viewer.prototype, render, events, handlers, methods, others);

var AnotherViewer = $.fn.viewer;

$.fn.viewer = function jQueryViewer(option) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var result = void 0;

  this.each(function (i, element) {
    var $element = $(element);
    var data = $element.data(NAMESPACE);

    if (!data) {
      if (/destroy/.test(option)) {
        return;
      }

      var options = $.extend({}, $element.data(), $.isPlainObject(option) && option);

      data = new Viewer(element, options);
      $element.data(NAMESPACE, data);
    }

    if (isString(option)) {
      var fn = data[option];

      if ($.isFunction(fn)) {
        result = fn.apply(data, args);
      }
    }
  });

  return isUndefined(result) ? this : result;
};

$.fn.viewer.Constructor = Viewer;
$.fn.viewer.setDefaults = Viewer.setDefaults;
$.fn.viewer.noConflict = function noConflict() {
  $.fn.viewer = AnotherViewer;
  return this;
};

})));
