/*!
 * Cropper v0.8.0
 * https://github.com/fengyuanchen/cropper
 *
 * Copyright 2014-2015 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2015-02-19T06:49:29.144Z
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node / CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals.
    factory(jQuery);
  }
})(function ($) {

  'use strict';

  var $window = $(window),
      $document = $(document),
      location = window.location,

      // Constants
      STRING_DIRECTIVE = 'directive',
      CROPPER_NAMESPACE = '.cropper',

      // RegExps
      REGEXP_DIRECTIVES = /^(e|n|w|s|ne|nw|sw|se|all|crop|move|zoom)$/,
      // REGEXP_OPTIONS = /^(x|y|width|height|rotate)$/,
      // REGEXP_PROPERTIES = /^(naturalWidth|naturalHeight|width|height|aspectRatio|ratio|rotate)$/,

      // Classes
      CLASS_MODAL = 'cropper-modal',
      CLASS_HIDE = 'cropper-hide',
      CLASS_HIDDEN = 'cropper-hidden',
      CLASS_INVISIBLE = 'cropper-invisible',
      CLASS_MOVE = 'cropper-move',
      CLASS_CROP = 'cropper-crop',
      CLASS_DISABLED = 'cropper-disabled',
      CLASS_BG = 'cropper-bg',

      // Events
      EVENT_MOUSE_DOWN = 'mousedown touchstart',
      EVENT_MOUSE_MOVE = 'mousemove touchmove',
      EVENT_MOUSE_UP = 'mouseup mouseleave touchend touchleave touchcancel',
      EVENT_WHEEL = 'wheel mousewheel DOMMouseScroll',
      EVENT_DBLCLICK = 'dblclick',
      EVENT_RESIZE = 'resize' + CROPPER_NAMESPACE, // Bind to window with namespace
      EVENT_BUILD = 'build' + CROPPER_NAMESPACE,
      EVENT_BUILT = 'built' + CROPPER_NAMESPACE,
      EVENT_DRAG_START = 'dragstart' + CROPPER_NAMESPACE,
      EVENT_DRAG_MOVE = 'dragmove' + CROPPER_NAMESPACE,
      EVENT_DRAG_END = 'dragend' + CROPPER_NAMESPACE,

      // Supports
      support = {
        canvas: $.isFunction($('<canvas>')[0].getContext)
      },

      // Others
      round = Math.round,
      sqrt = Math.sqrt,
      min = Math.min,
      max = Math.max,
      abs = Math.abs,
      sin = Math.sin,
      cos = Math.cos,
      num = parseFloat,

      // Prototype
      prototype = {};

  function isNumber(n) {
    return typeof n === 'number';
  }

  function isString(n) {
    return typeof n === 'string';
  }

  function isUndefined(n) {
    return typeof n === 'undefined';
  }

  function toArray(obj, offset) {
    var args = [];

    if (isNumber(offset)) { // It's necessary for IE8
      args.push(offset);
    }

    return args.slice.apply(obj, args);
  }

  // Custom proxy to avoid jQuery's guid
  function proxy(fn, context) {
    var args = toArray(arguments, 2);

    return function () {
      return fn.apply(context, args.concat(toArray(arguments)));
    };
  }

  function isCrossOriginURL(url) {
    var parts = url.match(/^(https?:)\/\/([^\:\/\?#]+):?(\d*)/i);

    if (parts && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port)) {
      return true;
    }

    return false;
  }

  function addTimestamp(url) {
    var timestamp = 'timestamp=' + (new Date()).getTime();

    return (url + (url.indexOf('?') === -1 ? '?' : '&') + timestamp);
  }

  function getRotateValue(degree) {
    return degree ? 'rotate(' + degree + 'deg)' : 'none';
  }

  function getRotatedSizes(data) {
    var deg = abs(data.degree) % 180,
        arc = (deg > 90 ? (180 - deg) : deg) * Math.PI / 180;

    return {
      width: data.width * cos(arc) + data.height * sin(arc),
      height: data.width * sin(arc) + data.height * cos(arc)
    };
  }

  function getSourceCanvas(image, data) {
    var canvas = $('<canvas>')[0],
        context = canvas.getContext('2d'),
        width = data.naturalWidth,
        height = data.naturalHeight,
        rotate = data.rotate,
        rotated = getRotatedSizes({
          width: width,
          height: height,
          degree: rotate
        });

    if (rotate) {
      canvas.width = rotated.width;
      canvas.height = rotated.height;
      context.save();
      context.translate(rotated.width / 2, rotated.height / 2);
      context.rotate(rotate * Math.PI / 180);
      context.drawImage(image, -width / 2, -height / 2, width, height);
      context.restore();
    } else {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(image, 0, 0, width, height);
    }

    return canvas;
  }

  function Cropper(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Cropper.DEFAULTS, $.isPlainObject(options) && options);

    this.ready = false;
    this.built = false;
    this.cropped = false;
    this.disabled = false;

    this.load();
  }

  prototype.load = function () {
    var _this = this,
        options = this.options,
        $this = this.$element,
        crossOrigin = '',
        buildEvent,
        $clone,
        url;

    if ($this.is('img')) {
      url = $this.prop('src');
    } else if ($this.is('canvas') && support.canvas) {
      url = $this[0].toDataURL();
    }

    if (!url) {
      return;
    }

    buildEvent = $.Event(EVENT_BUILD);
    $this.one(EVENT_BUILD, options.build).trigger(buildEvent); // Only trigger once

    if (buildEvent.isDefaultPrevented()) {
      return;
    }

    if (options.checkImageOrigin) {
      if (isCrossOriginURL(url)) {
        crossOrigin = ' crossOrigin'; // crossOrigin="anonymous"
        url = addTimestamp(url); // Bust cache (#148)
      }
    }

    this.$clone = ($clone = $('<img' + crossOrigin + ' src="' + url + '">'));

    $clone.one('load', function () {
      var naturalWidth = this.naturalWidth || $clone.width(),
          naturalHeight = this.naturalHeight || $clone.height();

      _this.image = {
        naturalWidth: naturalWidth,
        naturalHeight: naturalHeight,
        aspectRatio: naturalWidth / naturalHeight,
        rotate: 0
      };

      _this.url = url;
      _this.ready = true;
      _this.build();
    });

    // Hide and insert into the document
    $clone.addClass(CLASS_HIDE).prependTo('body');
  };

  prototype.build = function () {
    var $this = this.$element,
        options = this.options,
        $cropper,
        $cropBox;

    if (!this.ready) {
      return;
    }

    if (this.built) {
      this.unbuild();
    }

    // Create cropper elements
    this.$cropper = $cropper = $(Cropper.TEMPLATE);

    // Hide the original image
    $this.addClass(CLASS_HIDDEN);

    // Show and prepend the clone iamge to the cropper
    this.$clone.removeClass(CLASS_HIDE).prependTo($cropper);

    this.$container = $this.parent();
    this.$container.append($cropper);

    this.$canvas = $cropper.find('.cropper-canvas');
    this.$cropBox = $cropBox = $cropper.find('.cropper-cropbox');
    this.$viewer = $cropper.find('.cropper-viewer');

    this.addListeners();
    this.initPreview();

    // Format aspect ratio
    options.aspectRatio = abs(num(options.aspectRatio)) || NaN; // 0 -> NaN, 'auto' -> NaN

    if (options.autoCrop) {
      this.cropped = true;
      options.modal && this.$canvas.addClass(CLASS_MODAL);
    } else {
      $cropBox.addClass(CLASS_HIDDEN);
    }

    options.background && $cropper.addClass(CLASS_BG);
    !options.highlight && $cropBox.find('.cropper-face').addClass(CLASS_INVISIBLE);
    !options.guides && $cropBox.find('.cropper-dashed').addClass(CLASS_HIDDEN);
    !options.movable && $cropBox.find('.cropper-face').data(STRING_DIRECTIVE, 'move');
    !options.resizable && $cropBox.find('.cropper-line, .cropper-point').addClass(CLASS_HIDDEN);
    this.setDragMode(options.dragCrop ? 'crop' : 'move');

    this.built = true;
    this.render();
    $this.one(EVENT_BUILT, options.built).trigger(EVENT_BUILT); // Only trigger once
  };

  prototype.unbuild = function () {
    if (!this.built) {
      return;
    }

    this.built = false;
    this.removeListeners();

    this.$preview.empty();
    this.$preview = null;

    this.$cropBox = null;
    this.$canvas = null;
    this.$container = null;

    this.$cropper.remove();
    this.$cropper = null;
  };

  $.extend(prototype, {
    render: function () {
      this.initContainer();
      this.initImage();
      this.initCropBox();
    },

    initContainer: function () {
      var $this = this.$element,
          $container = this.$container,
          $cropper = this.$cropper,
          options = this.options;

      $cropper.addClass(CLASS_HIDDEN);
      $this.removeClass(CLASS_HIDDEN);

      $cropper.css((this.container = {
        width: max($container.width(), num(options.minContainerWidth) || 350),
        height: max($container.height(), num(options.minContainerHeight) || 150)
      }));

      $this.addClass(CLASS_HIDDEN);
      $cropper.removeClass(CLASS_HIDDEN);
    },

    initImage: function () {
      var container = this.container,
          image = this.image,
          aspectRatio = image.aspectRatio,
          containerWidth = container.width,
          containerHeight = container.height,
          width = image.naturalWidth,
          height = image.naturalHeight,
          left = 0,
          top = 0;

      if (containerHeight * aspectRatio > containerWidth) {
        width = containerWidth;
        height = width / aspectRatio;
        top = (containerHeight - height) / 2;
      } else {
        height = containerHeight;
        width = height * aspectRatio;
        left = (containerWidth - width) / 2;
      }

      $.extend(image, {
        width: width,
        height: height,
        left: left,
        top: top
      });

      this.defaultImage = $.extend({}, image);
      this.renderImage();
    },

    renderImage: function (changed) {
      var options = this.options,
          image = this.image,
          width = image.width,
          height = image.height,
          rotate = image.rotate,
          rotated;

      if (rotate) {
        rotated = getRotatedSizes({
          width: width,
          height: height,
          degree: rotate
        });
      }

      $.extend(image, {
        rotatedWidth: rotated ? rotated.width : image.width,
        rotatedHeight: rotated ? rotated.height : image.height,
        rotatedLeft: rotated ? (image.left - (rotated.width - width) / 2) : image.left,
        rotatedTop: rotated ? (image.top - (rotated.height - height) / 2) : image.top
      });

      this.$clone.css({
        width: width,
        height: height,
        marginLeft: image.left,
        marginTop: image.top,
        transform: getRotateValue(rotate)
      });

      if (changed) {
        this.preview();
        $.isFunction(options.crop) && options.crop.call(this.$element, this.getData());
      }
    },

    initCropBox: function () {
      var options = this.options,
          container = this.container,
          image = this.image,
          aspectRatio = options.aspectRatio,
          containerWidth = container.width,
          containerHeight = container.height,
          minCropBoxWidth = abs(num(options.minCropBoxWidth)) || 0,
          minCropBoxHeight = abs(num(options.minCropBoxHeight)) || 0,
          autoCropArea = abs(num(options.autoCropArea)) || 0.8,
          cropBox = {
            width: image.width,
            height: image.height,
            minWidth: minCropBoxWidth,
            minHeight: minCropBoxHeight,
            maxWidth: containerWidth,
            maxHeight: containerHeight
          };

      if (aspectRatio) {
        if (containerHeight * aspectRatio > containerWidth) {
          cropBox.height = cropBox.width / aspectRatio;
          cropBox.maxHeight = containerWidth / aspectRatio;
        } else {
          cropBox.width = image.height * aspectRatio;
          cropBox.maxWidth = containerHeight * aspectRatio;
        }

        if (minCropBoxWidth) {
          cropBox.minHeight = cropBox.minWidth / aspectRatio;
        } else if (minCropBoxHeight) {
          cropBox.minWidth = cropBox.minHeight * aspectRatio;
        }
      }

      // The "minWidth" must be less than "maxWidth", and the "minHeight" too.
      cropBox.minWidth = min(cropBox.maxWidth, cropBox.minWidth);
      cropBox.minHeight = min(cropBox.maxHeight, cropBox.minHeight);

      // The width of auto crop area must large than "minWidth", and the height too. (#164)
      cropBox.width = max(cropBox.minWidth, cropBox.width * autoCropArea);
      cropBox.height = max(cropBox.minHeight, cropBox.height * autoCropArea);
      cropBox.left = (containerWidth - cropBox.width) / 2;
      cropBox.top = (containerHeight - cropBox.height) / 2;

      cropBox.oldLeft = cropBox.left;
      cropBox.oldTop = cropBox.top;

      this.defaultCropBox = $.extend({}, cropBox);
      this.cropBox = cropBox;

      if (this.cropped) {
        this.renderCropBox();
      }
    },

    renderCropBox: function () {
      var options = this.options,
          container = this.container,
          $cropBox = this.$cropBox,
          cropBox = this.cropBox;

      if (cropBox.width > cropBox.maxWidth) {
        cropBox.width = cropBox.maxWidth;
        cropBox.left = cropBox.oldLeft;
      } else if (cropBox.width < cropBox.minWidth) {
        cropBox.width = cropBox.minWidth;
        cropBox.left = cropBox.oldLeft;
      }

      if (cropBox.height > cropBox.maxHeight) {
        cropBox.height = cropBox.maxHeight;
        cropBox.top = cropBox.oldTop;
      } else if (cropBox.height < cropBox.minHeight) {
        cropBox.height = cropBox.minHeight;
        cropBox.top = cropBox.oldTop;
      }

      cropBox.left = min(max(cropBox.left, 0), container.width - cropBox.width);
      cropBox.top = min(max(cropBox.top, 0), container.height - cropBox.height);

      cropBox.oldLeft = cropBox.left;
      cropBox.oldTop = cropBox.top;

      if (options.movable) {
        $cropBox.find('.cropper-face').data(STRING_DIRECTIVE, (cropBox.width === container.width && cropBox.height === container.height) ? 'move' : 'all');
      }

      $cropBox.css({
        width: cropBox.width,
        height: cropBox.height,
        left: cropBox.left,
        top: cropBox.top
      });

      if (!this.disabled) {
        this.preview();
        $.isFunction(options.crop) && options.crop.call(this.$element, this.getData());
      }
    }
  });

  prototype.initPreview = function () {
    var url = this.url;

    this.$preview = $(this.options.preview);
    this.$viewer.html('<img src="' + url + '">');

    // Override img element styles
    // Add `display:block` to avoid margin top issue (Occur only when margin-top <= -height)
    this.$preview.each(function () {
      var $this = $(this);

      $this.data({
        width: $this.width(),
        height: $this.height()
      }).html('<img src="' + url + '" style="display:block;width:100%;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;">');
    });
  };

  prototype.preview = function () {
    var image = this.image,
        cropBox = this.cropBox,
        width = image.width,
        height = image.height,
        left = cropBox.left - image.left,
        top = cropBox.top - image.top,
        rotate = image.rotate;

    if (!this.cropped || this.disabled) {
      return;
    }

    this.$viewer.find('img').css({
      width: width,
      height: height,
      marginLeft: -left,
      marginTop: -top,
      transform: getRotateValue(rotate)
    });

    this.$preview.each(function () {
      var $this = $(this),
          data = $this.data(),
          ratio = data.width / cropBox.width,
          newWidth = data.width,
          newHeight = cropBox.height * ratio;

      if (newHeight > data.height) {
        ratio = data.height / cropBox.height,
        newWidth = cropBox.width * ratio;
        newHeight = data.height;
      }

      $this.width(newWidth).height(newHeight).find('img').css({
        width: width * ratio,
        height: height * ratio,
        marginLeft: -left * ratio,
        marginTop: -top * ratio,
        transform: getRotateValue(rotate)
      });
    });
  };

  prototype.addListeners = function () {
    var options = this.options;

    this.$element.on(EVENT_DRAG_START, options.dragstart).on(EVENT_DRAG_MOVE, options.dragmove).on(EVENT_DRAG_END, options.dragend);
    this.$cropper.on(EVENT_MOUSE_DOWN, $.proxy(this.dragstart, this)).on(EVENT_DBLCLICK, $.proxy(this.dblclick, this));

    if (options.zoomable && options.mouseWheelZoom) {
      this.$cropper.on(EVENT_WHEEL, $.proxy(this.wheel, this));
    }

    if (options.global) {
      $document.on(EVENT_MOUSE_MOVE, (this._dragmove = proxy(this.dragmove, this))).on(EVENT_MOUSE_UP, (this._dragend = proxy(this.dragend, this)));
    } else {
      this.$cropper.on(EVENT_MOUSE_MOVE, $.proxy(this.dragmove, this)).on(EVENT_MOUSE_UP, $.proxy(this.dragend, this));
    }

    options.responsive && $window.on(EVENT_RESIZE, (this._resize = proxy(this.resize, this)));
  };

  prototype.removeListeners = function () {
    var options = this.options;

    this.$element.off(EVENT_DRAG_START, options.dragstart).off(EVENT_DRAG_MOVE, options.dragmove).off(EVENT_DRAG_END, options.dragend);
    this.$cropper.off(EVENT_MOUSE_DOWN, this.dragstart).off(EVENT_DBLCLICK, this.dblclick);

    if (options.zoomable && options.mouseWheelZoom) {
      this.$cropper.off(EVENT_WHEEL, this.wheel);
    }

    if (options.global) {
      $document.off(EVENT_MOUSE_MOVE, this._dragmove).off(EVENT_MOUSE_UP, this._dragend);
    } else {
      this.$cropper.off(EVENT_MOUSE_MOVE, this.dragmove).off(EVENT_MOUSE_UP, this.dragend);
    }

    options.responsive && $window.off(EVENT_RESIZE, this._resize);
  };

  $.extend(prototype, {
    resize: function () {
      var $container = this.$container,
          container = this.container;

      if (this.disabled) {
        return;
      }

      if ($container.width() !== container.width || $container.height() !== container.height) {
        clearTimeout(this.resizing);
        this.resizing = setTimeout($.proxy(function () {
          var imageData = this.getImageData(),
              cropBoxData = this.getCropBoxData();

          this.render();
          this.setImageData(imageData);
          this.setCropBoxData(cropBoxData);
        }, this), 200);
      }
    },

    dblclick: function () {
      if (this.disabled) {
        return;
      }

      if (this.$canvas.hasClass(CLASS_CROP)) {
        this.setDragMode('move');
      } else {
        this.setDragMode('crop');
      }
    },

    wheel: function (event) {
      var e = event.originalEvent,
          delta = 1;

      if (this.disabled) {
        return;
      }

      event.preventDefault();

      if (e.deltaY) {
        delta = e.deltaY > 0 ? 1 : -1;
      } else if (e.wheelDelta) {
        delta = -e.wheelDelta / 120;
      } else if (e.detail) {
        delta = e.detail > 0 ? 1 : -1;
      }

      this.zoom(delta * 0.1);
    },

    dragstart: function (event) {
      var options = this.options,
          originalEvent = event.originalEvent,
          touches = originalEvent && originalEvent.touches,
          e = event,
          directive,
          dragStartEvent,
          touchesLength;

      if (this.disabled) {
        return;
      }

      if (touches) {
        touchesLength = touches.length;

        if (touchesLength > 1) {
          if (options.zoomable && options.touchDragZoom && touchesLength === 2) {
            e = touches[1];
            this.startX2 = e.pageX;
            this.startY2 = e.pageY;
            directive = 'zoom';
          } else {
            return;
          }
        }

        e = touches[0];
      }

      directive = directive || $(e.target).data(STRING_DIRECTIVE);

      if (REGEXP_DIRECTIVES.test(directive)) {
        event.preventDefault();

        dragStartEvent = $.Event(EVENT_DRAG_START);
        this.$element.trigger(dragStartEvent);

        if (dragStartEvent.isDefaultPrevented()) {
          return;
        }

        this.directive = directive;
        this.cropping = false;
        this.startX = e.pageX;
        this.startY = e.pageY;

        if (directive === 'crop') {
          this.cropping = true;
          this.$canvas.addClass(CLASS_MODAL);
        }
      }
    },

    dragmove: function (event) {
      var options = this.options,
          originalEvent = event.originalEvent,
          touches = originalEvent && originalEvent.touches,
          e = event,
          dragMoveEvent,
          touchesLength;

      if (this.disabled) {
        return;
      }

      if (touches) {
        touchesLength = touches.length;

        if (touchesLength > 1) {
          if (options.zoomable && options.touchDragZoom && touchesLength === 2) {
            e = touches[1];
            this.endX2 = e.pageX;
            this.endY2 = e.pageY;
          } else {
            return;
          }
        }

        e = touches[0];
      }

      if (this.directive) {
        event.preventDefault();

        dragMoveEvent = $.Event(EVENT_DRAG_MOVE);
        this.$element.trigger(dragMoveEvent);

        if (dragMoveEvent.isDefaultPrevented()) {
          return;
        }

        this.endX = e.pageX;
        this.endY = e.pageY;

        this.change();
      }
    },

    dragend: function (event) {
      var dragEndEvent;

      if (this.disabled) {
        return;
      }

      if (this.directive) {
        event.preventDefault();

        dragEndEvent = $.Event(EVENT_DRAG_END);
        this.$element.trigger(dragEndEvent);

        if (dragEndEvent.isDefaultPrevented()) {
          return;
        }

        if (this.cropping) {
          this.cropping = false;
          this.$canvas.toggleClass(CLASS_MODAL, this.cropped && this.options.modal);
        }

        this.directive = '';
      }
    }
  });

  $.extend(prototype, {
    reset: function () {
      if (!this.cropped || this.disabled) {
        return;
      }

      this.image = $.extend({}, this.defaultImage);
      this.renderImage();

      this.cropBox = $.extend({}, this.defaultCropBox);
      this.renderCropBox();
    },

    clear: function () {
      var cropBox = this.cropBox;

      if (!this.cropped || this.disabled) {
        return;
      }

      this.cropped = false;
      cropBox.left = 0;
      cropBox.top = 0;
      cropBox.width = 0;
      cropBox.height = 0;
      this.renderCropBox();

      this.$canvas.removeClass(CLASS_MODAL);
      this.$cropBox.addClass(CLASS_HIDDEN);
    },

    destroy: function () {
      var $this = this.$element;

      if (!this.ready) {
        this.$clone.off('load').remove();
      }

      this.unbuild();
      $this.removeClass(CLASS_HIDDEN).removeData('cropper');
    },

    replace: function (url) {
      var _this = this,
          $this = this.$element,
          canvas,
          context;

      if (!this.disabled && url && url !== this.url && url !== $this.attr('src')) {
        if ($this.is('img')) {
          $this.attr('src', url);
          this.load();
        } else if ($this.is('canvas') && support.canvas) {
          canvas = $this[0];
          context = canvas.getContext('2d');

          $('<img src="' + url + '"">').one('load', function () {
            canvas.width = this.width;
            canvas.height = this.height;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(this, 0, 0);
            _this.load();
          });
        }
      }
    },

    enable: function () {
      if (this.built) {
        this.disabled = false;
        this.$cropper.removeClass(CLASS_DISABLED);
      }
    },

    disable: function () {
      if (this.built) {
        this.disabled = true;
        this.$cropper.addClass(CLASS_DISABLED);
      }
    },

    move: function (offsetX, offsetY) {
      var image = this.image;

      if (!this.disabled && isNumber(offsetX) && isNumber(offsetY)) {
        image.left += offsetX
        image.top += offsetY;
        this.renderImage(true);
      }
    },

    zoom: function (delta) {
      var image = this.image,
          width,
          height;

      delta = num(delta);

      if (delta && this.built && !this.disabled && this.options.zoomable) {
        delta = delta <= -1 ? 1 / (1 - delta) : delta <= 1 ? (1 + delta) : delta;
        width = image.width * delta;
        height = image.height * delta;
        image.left -= (width - image.width) / 2;
        image.top -= (height - image.height) / 2;
        image.width = width;
        image.height = height;
        this.renderImage(true);
        this.setDragMode('move');
      }
    },

    rotate: function (degree) {
      var image = this.image;

      degree = num(degree) || 0;

      if (degree !== 0 && this.built && !this.disabled && this.options.rotatable) {
        image.rotate = (image.rotate + degree) % 360;
        this.renderImage(true);
      }
    },

    getData: function (rounded) {
      var cropBox = this.cropBox,
          image = this.image,
          rotate = image.rotate,
          ratio,
          data;

      if (this.built && this.cropped) {
        data = {
          x: cropBox.left - (rotate ? image.rotatedLeft : image.left),
          y: cropBox.top - (rotate ? image.rotatedTop : image.top),
          width: cropBox.width,
          height: cropBox.height
        };

        ratio = image.width / image.naturalWidth;

        $.each(data, function (i, n) {
          n = n / ratio;
          data[i] = rounded ? round(n) : n;
        });

        data.rotate = rotate;
      } else {
        data = {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          rotate: rotate
        }
      }

      return data;
    },

    getImageData: function (all) {
      var image = this.image,
          data = {};

      if (this.built) {
        $.extend(data, all ? image : {
          left: image.left,
          top: image.top,
          width: image.width,
          height: image.height
        });
      }

      return data;
    },

    setImageData: function (data) {
      var image = this.image;

      if (this.built && !this.disabled && $.isPlainObject(data)) {
        if (isNumber(data.left)) {
          image.left = data.left;
        }

        if (isNumber(data.top)) {
          image.top = data.top;
        }

        if (isNumber(data.width)) {
          image.width = data.width;
          image.height = image.width / image.aspectRatio;
        } else if (isNumber(data.height)) {
          image.height = data.height;
          image.width = image.height * image.aspectRatio;
        }

        this.renderImage(true);
      }
    },

    getCropBoxData: function () {
      var data = {},
          cropBox;

      if (this.cropped) {
        cropBox = this.cropBox;
        data = {
          left: cropBox.left,
          top: cropBox.top,
          width: cropBox.width,
          height: cropBox.height
        };
      }

      return data;
    },

    setCropBoxData: function (data) {
      var cropBox = this.cropBox,
          aspectRatio = this.options.aspectRatio;

      if (this.cropped && !this.disabled && $.isPlainObject(data)) {

        if (isNumber(data.left)) {
          cropBox.left = data.left;
        }

        if (isNumber(data.top)) {
          cropBox.top = data.top;
        }

        if (aspectRatio) {
          if (isNumber(data.width)) {
            cropBox.width = data.width;
            cropBox.height = cropBox.width / aspectRatio;
          } else if (isNumber(data.height)) {
            cropBox.height = data.height;
            cropBox.width = cropBox.height * aspectRatio;
          }
        } else {
          if (isNumber(data.width)) {
            cropBox.width = data.width;
          }

          if (isNumber(data.height)) {
            cropBox.height = data.height;
          }
        }

        this.renderCropBox();
      }
    },

    getDataURL: function (options, type, quality) {
      var originalWidth,
          originalHeight,
          canvasWidth,
          canvasHeight,
          scaledWidth,
          scaledHeight,
          scaled,
          canvas,
          context,
          data,
          dataURL;

      if (this.cropped && support.canvas) {
        data = this.getData();
        originalWidth = data.width;
        originalHeight = data.height;
        scaled = $.isPlainObject(options);

        if (scaled) {
          scaledWidth = options.width || originalWidth;
          scaledHeight = options.height || originalHeight;
        } else {
          quality = type;
          type = options;
        }

        canvasWidth = scaled ? scaledWidth : originalWidth;
        canvasHeight = scaled ? scaledHeight : originalHeight;

        canvas = $('<canvas>')[0]; // document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        context = canvas.getContext('2d');

        if (type === 'image/jpeg') {
          context.fillStyle = '#fff';
          context.fillRect(0, 0, canvasWidth, canvasHeight);
        }

        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
        context.drawImage.apply(context, (function () {
          var source = getSourceCanvas(this.$clone[0], this.image),
              sourceWidth = source.width,
              sourceHeight = source.height,
              args = [source],
              srcX = data.x, // source canvas
              srcY = data.y,
              srcWidth,
              srcHeight,
              dstX, // destination canvas
              dstY,
              dstWidth,
              dstHeight,
              scaledRatio;

          if (srcX <= -originalWidth || srcX > sourceWidth) {
            srcX = srcWidth = dstX = dstWidth = 0;
          } else if (srcX <= 0) {
            dstX = -srcX;
            srcX = 0;
            srcWidth = dstWidth = min(sourceWidth, originalWidth + srcX);
          } else if (srcX <= sourceWidth) {
            dstX = 0;
            srcWidth = dstWidth = min(originalWidth, sourceWidth - srcX);
          }

          if (srcWidth <= 0 || srcY <= -originalHeight || srcY > sourceHeight) {
            srcY = srcHeight = dstY = dstHeight = 0;
          } else if (srcY <= 0) {
            dstY = -srcY;
            srcY = 0;
            srcHeight = dstHeight = min(sourceHeight, originalHeight + srcY);
          } else if (srcY <= sourceHeight) {
            dstY = 0;
            srcHeight = dstHeight = min(originalHeight, sourceHeight - srcY);
          }

          args.push(srcX, srcY, srcWidth, srcHeight);

          // Scale dstination sizes
          if (scaled) {
            scaledRatio = originalWidth / scaledWidth;
            dstX /= scaledRatio;
            dstY /= scaledRatio;
            dstWidth /= scaledRatio;
            dstHeight /= scaledRatio;
          }

          // Avoid "IndexSizeError" in IE and Firefox
          if (dstWidth > 0 && dstHeight > 0) {
            args.push(dstX, dstY, dstWidth, dstHeight);
          }

          return args;
        }).call(this));

        dataURL = canvas.toDataURL.apply(canvas, (function () {
          var args = [];

          if (isString(type)) {
            args.push(type);
          }

          if (isNumber(quality)) {
            args.push(quality);
          }

          return args;
        }).call(this));
      }

      return dataURL || '';
    },

    setAspectRatio: function (aspectRatio) {
      var options = this.options;

      if (!this.disabled && !isUndefined(aspectRatio)) {
        options.aspectRatio = abs(num(aspectRatio)) || NaN; // 0 -> NaN

        if (this.built) {
          this.initCropBox();
        }
      }
    },

    setDragMode: function (mode) {
      var $canvas = this.$canvas,
          cropable = false,
          movable = false;

      if (!this.ready || this.disabled) {
        return;
      }

      switch (mode) {
        case 'crop':
          if (this.options.dragCrop) {
            cropable = true;
            $canvas.data(STRING_DIRECTIVE, mode);
          } else {
            movable = true;
          }

          break;

        case 'move':
          movable = true;
          $canvas.data(STRING_DIRECTIVE, mode);

          break;

        default:
          $canvas.removeData(STRING_DIRECTIVE);
      }

      $canvas.toggleClass(CLASS_CROP, cropable).toggleClass(CLASS_MOVE, movable);
    }
  });

  prototype.change = function () {
    var directive = this.directive,
        image = this.image,
        container = this.container,
        maxWidth = container.width,
        maxHeight = container.height,
        cropBox = this.cropBox,
        width = cropBox.width,
        height = cropBox.height,
        left = cropBox.left,
        top = cropBox.top,
        right = left + width,
        bottom = top + height,
        renderable = true,
        aspectRatio = this.options.aspectRatio,
        range = {
          x: this.endX - this.startX,
          y: this.endY - this.startY
        },
        offset;

    if (aspectRatio) {
      range.X = range.y * aspectRatio;
      range.Y = range.x / aspectRatio;
    }

    switch (directive) {
      // Move cropBox
      case 'all':
        left += range.x;
        top += range.y;
        break;

      // Resize cropBox
      case 'e':
        if (range.x >= 0 && (right >= maxWidth || aspectRatio && (top <= 0 || bottom >= maxHeight))) {
          renderable = false;
          break;
        }

        width += range.x;

        if (aspectRatio) {
          height = width / aspectRatio;
          top -= range.Y / 2;
        }

        if (width < 0) {
          directive = 'w';
          width = 0;
        }

        break;

      case 'n':
        if (range.y <= 0 && (top <= 0 || aspectRatio && (left <= 0 || right >= maxWidth))) {
          renderable = false;
          break;
        }

        height -= range.y;
        top += range.y;

        if (aspectRatio) {
          width = height * aspectRatio;
          left += range.X / 2;
        }

        if (height < 0) {
          directive = 's';
          height = 0;
        }

        break;

      case 'w':
        if (range.x <= 0 && (left <= 0 || aspectRatio && (top <= 0 || bottom >= maxHeight))) {
          renderable = false;
          break;
        }

        width -= range.x;
        left += range.x;

        if (aspectRatio) {
          height = width / aspectRatio;
          top += range.Y / 2;
        }

        if (width < 0) {
          directive = 'e';
          width = 0;
        }

        break;

      case 's':
        if (range.y >= 0 && (bottom >= maxHeight || aspectRatio && (left <= 0 || right >= maxWidth))) {
          renderable = false;
          break;
        }

        height += range.y;

        if (aspectRatio) {
          width = height * aspectRatio;
          left -= range.X / 2;
        }

        if (height < 0) {
          directive = 'n';
          height = 0;
        }

        break;

      case 'ne':
        if (aspectRatio) {
          if (range.y <= 0 && (top <= 0 || right >= maxWidth)) {
            renderable = false;
            break;
          }

          height -= range.y;
          top += range.y;
          width = height * aspectRatio;
        } else {
          if (range.x >= 0) {
            if (right < maxWidth) {
              width += range.x;
            } else if (range.y <= 0 && top <= 0) {
              renderable = false;
            }
          } else {
            width += range.x;
          }

          if (range.y <= 0) {
            if (top > 0) {
              height -= range.y;
              top += range.y;
            }
          } else {
            height -= range.y;
            top += range.y;
          }
        }

        if (width < 0 && height < 0) {
          directive = 'sw';
          height = 0;
          width = 0;
        } else if (width < 0) {
          directive = 'nw';
          width = 0;
        } else if (height < 0) {
          directive = 'se';
          height = 0;
        }

        break;

      case 'nw':
        if (aspectRatio) {
          if (range.y <= 0 && (top <= 0 || left <= 0)) {
            renderable = false;
            break;
          }

          height -= range.y;
          top += range.y;
          width = height * aspectRatio;
          left += range.X;
        } else {
          if (range.x <= 0) {
            if (left > 0) {
              width -= range.x;
              left += range.x;
            } else if (range.y <= 0 && top <= 0) {
              renderable = false;
            }
          } else {
            width -= range.x;
            left += range.x;
          }

          if (range.y <= 0) {
            if (top > 0) {
              height -= range.y;
              top += range.y;
            }
          } else {
            height -= range.y;
            top += range.y;
          }
        }

        if (width < 0 && height < 0) {
          directive = 'se';
          height = 0;
          width = 0;
        } else if (width < 0) {
          directive = 'ne';
          width = 0;
        } else if (height < 0) {
          directive = 'sw';
          height = 0;
        }

        break;

      case 'sw':
        if (aspectRatio) {
          if (range.x <= 0 && (left <= 0 || bottom >= maxHeight)) {
            renderable = false;
            break;
          }

          width -= range.x;
          left += range.x;
          height = width / aspectRatio;
        } else {
          if (range.x <= 0) {
            if (left > 0) {
              width -= range.x;
              left += range.x;
            } else if (range.y >= 0 && bottom >= maxHeight) {
              renderable = false;
            }
          } else {
            width -= range.x;
            left += range.x;
          }

          if (range.y >= 0) {
            if (bottom < maxHeight) {
              height += range.y;
            }
          } else {
            height += range.y;
          }
        }

        if (width < 0 && height < 0) {
          directive = 'ne';
          height = 0;
          width = 0;
        } else if (width < 0) {
          directive = 'se';
          width = 0;
        } else if (height < 0) {
          directive = 'nw';
          height = 0;
        }

        break;

      case 'se':
        if (aspectRatio) {
          if (range.x >= 0 && (right >= maxWidth || bottom >= maxHeight)) {
            renderable = false;
            break;
          }

          width += range.x;
          height = width / aspectRatio;
        } else {
          if (range.x >= 0) {
            if (right < maxWidth) {
              width += range.x;
            } else if (range.y >= 0 && bottom >= maxHeight) {
              renderable = false;
            }
          } else {
            width += range.x;
          }

          if (range.y >= 0) {
            if (bottom < maxHeight) {
              height += range.y;
            }
          } else {
            height += range.y;
          }
        }

        if (width < 0 && height < 0) {
          directive = 'nw';
          height = 0;
          width = 0;
        } else if (width < 0) {
          directive = 'sw';
          width = 0;
        } else if (height < 0) {
          directive = 'ne';
          height = 0;
        }

        break;

      // Move image
      case 'move':
        image.left += range.x;
        image.top += range.y;
        this.renderImage(true);
        renderable = false;
        break;

      // Scale image
      case 'zoom':
        this.zoom(function (x, y, x1, y1, x2, y2) {
          return (sqrt(x2 * x2 + y2 * y2) - sqrt(x1 * x1 + y1 * y1)) / sqrt(x * x + y * y);
        }(
          image.width,
          image.height,
          abs(this.startX - this.startX2),
          abs(this.startY - this.startY2),
          abs(this.endX - this.endX2),
          abs(this.endY - this.endY2)
        ));

        this.endX2 = this.startX2;
        this.endY2 = this.startY2;
        renderable = false;
        break;

      // Crop image
      case 'crop':
        if (range.x && range.y) {
          offset = this.$cropper.offset();
          left = this.startX - offset.left;
          top = this.startY - offset.top;
          width = cropBox.minWidth;
          height = cropBox.minHeight;

          if (range.x > 0) {
            if (range.y > 0) {
              directive = 'se';
            } else {
              directive = 'ne';
              top -= height;
            }
          } else {
            if (range.y > 0) {
              directive = 'sw';
              left -= width;
            } else {
              directive = 'nw';
              left -= width;
              top -= height;
            }
          }

          // Show the cropBox if is hidden
          if (!this.cropped) {
            this.cropped = true;
            this.$cropBox.removeClass(CLASS_HIDDEN);
          }
        }

        break;

      // No default
    }

    if (renderable) {
      cropBox.width = width;
      cropBox.height = height;
      cropBox.left = left;
      cropBox.top = top;
      this.directive = directive;

      this.renderCropBox();
    }

    // Override
    this.startX = this.endX;
    this.startY = this.endY;
  };

  $.extend(Cropper.prototype, prototype);

  Cropper.DEFAULTS = {
    // Defines the aspect ratio of the crop box
    // Type: Number
    aspectRatio: NaN,

    // Defines the percentage of automatic cropping area when initializes
    // Type: Number (Must large than 0 and less than 1)
    autoCropArea: 0.8, // 80%

    // Outputs the cropping results.
    // Type: Function
    crop: null,

    // Add extra containers for previewing
    // Type: String (jQuery selector)
    preview: '',

    // Toggles
    global: true, // Bind the main events to the document (Only allow one global cropper per page)
    responsive: true, // Rebuild when resize the window
    checkImageOrigin: true, // Check if the target image is cross origin

    modal: true, // Show the black modal
    guides: true, // Show the dashed lines for guiding
    highlight: true, // Show the white modal to highlight the crop box
    background: true, // Show the grid background

    autoCrop: true, // Enable to crop the image automatically when initialize
    dragCrop: true, // Enable to create new crop box by dragging over the image
    movable: true, // Enable to move the crop box
    resizable: true, // Enable to resize the crop box
    rotatable: true, // Enable to rotate the image
    zoomable: true, // Enable to zoom the image
    touchDragZoom: true, // Enable to zoom the image by wheeling mouse
    mouseWheelZoom: true, // Enable to zoom the image by dragging touch

    // Dimensions
    minCropBoxWidth: 0,
    minCropBoxHeight: 0,
    minContainerWidth: 300,
    minContainerHeight: 150,

    // Events
    build: null, // Function
    built: null, // Function
    dragstart: null, // Function
    dragmove: null, // Function
    dragend: null // Function
  };

  Cropper.setDefaults = function (options) {
    $.extend(Cropper.DEFAULTS, options);
  };

  // Use the string compressor: Strmin (https://github.com/fengyuanchen/strmin)
  Cropper.TEMPLATE = (function (source, words) {
    words = words.split(',');
    return source.replace(/\d+/g, function (i) {
      return words[i];
    });
  })('<0 6="5-container"><0 6="5-canvas"></0><0 6="5-cropbox"><1 6="5-viewer"></1><1 6="5-8 8-h"></1><1 6="5-8 8-v"></1><1 6="5-face" 3-2="all"></1><1 6="5-7 7-e" 3-2="e"></1><1 6="5-7 7-n" 3-2="n"></1><1 6="5-7 7-w" 3-2="w"></1><1 6="5-7 7-s" 3-2="s"></1><1 6="5-4 4-e" 3-2="e"></1><1 6="5-4 4-n" 3-2="n"></1><1 6="5-4 4-w" 3-2="w"></1><1 6="5-4 4-s" 3-2="s"></1><1 6="5-4 4-ne" 3-2="ne"></1><1 6="5-4 4-nw" 3-2="nw"></1><1 6="5-4 4-sw" 3-2="sw"></1><1 6="5-4 4-se" 3-2="se"></1></0></0>','div,span,directive,data,point,cropper,class,line,dashed');

  /* Template source:
  <div class="cropper-container">
    <div class="cropper-canvas"></div>
    <div class="cropper-cropbox">
      <span class="cropper-viewer"></span>
      <span class="cropper-dashed dashed-h"></span>
      <span class="cropper-dashed dashed-v"></span>
      <span class="cropper-face" data-directive="all"></span>
      <span class="cropper-line line-e" data-directive="e"></span>
      <span class="cropper-line line-n" data-directive="n"></span>
      <span class="cropper-line line-w" data-directive="w"></span>
      <span class="cropper-line line-s" data-directive="s"></span>
      <span class="cropper-point point-e" data-directive="e"></span>
      <span class="cropper-point point-n" data-directive="n"></span>
      <span class="cropper-point point-w" data-directive="w"></span>
      <span class="cropper-point point-s" data-directive="s"></span>
      <span class="cropper-point point-ne" data-directive="ne"></span>
      <span class="cropper-point point-nw" data-directive="nw"></span>
      <span class="cropper-point point-sw" data-directive="sw"></span>
      <span class="cropper-point point-se" data-directive="se"></span>
    </div>
  </div>
  */

  // Save the other cropper
  Cropper.other = $.fn.cropper;

  // Register as jQuery plugin
  $.fn.cropper = function (options) {
    var args = toArray(arguments, 1),
        result;

    this.each(function () {
      var $this = $(this),
          data = $this.data('cropper'),
          fn;

      if (!data) {
        $this.data('cropper', (data = new Cropper(this, options)));
      }

      if (typeof options === 'string' && $.isFunction((fn = data[options]))) {
        result = fn.apply(data, args);
      }
    });

    return !isUndefined(result) ? result : this;
  };

  $.fn.cropper.Constructor = Cropper;
  $.fn.cropper.setDefaults = Cropper.setDefaults;

  // No conflict
  $.fn.cropper.noConflict = function () {
    $.fn.cropper = Cropper.other;
    return this;
  };

});
