/*!
 * Cropper v0.9.3
 * https://github.com/fengyuanchen/cropper
 *
 * Copyright (c) 2014-2015 Fengyuan Chen and contributors
 * Released under the MIT license
 *
 * Date: 2015-05-10T07:25:08.257Z
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
      CROPPER_NAMESPACE = '.cropper',
      CROPPER_PREVIEW = 'preview' + CROPPER_NAMESPACE,

      // RegExps
      REGEXP_DRAG_TYPES = /^(e|n|w|s|ne|nw|sw|se|all|crop|move|zoom)$/,

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
      EVENT_ZOOM_IN = 'zoomin' + CROPPER_NAMESPACE,
      EVENT_ZOOM_OUT = 'zoomout' + CROPPER_NAMESPACE,

      // Supports
      SUPPORT_CANVAS = $.isFunction($('<canvas>')[0].getContext),

      // Others
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
    return typeof n === 'number' && !isNaN(n);
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

    return parts && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port);
  }

  function addTimestamp(url) {
    var timestamp = 'timestamp=' + (new Date()).getTime();

    return (url + (url.indexOf('?') === -1 ? '?' : '&') + timestamp);
  }

  function getRotateValue(degree) {
    return degree ? 'rotate(' + degree + 'deg)' : 'none';
  }

  function getRotatedSizes(data, reverse) {
    var deg = abs(data.degree) % 180,
        arc = (deg > 90 ? (180 - deg) : deg) * Math.PI / 180,
        sinArc = sin(arc),
        cosArc = cos(arc),
        width = data.width,
        height = data.height,
        aspectRatio = data.aspectRatio,
        newWidth,
        newHeight;

    if (!reverse) {
      newWidth = width * cosArc + height * sinArc;
      newHeight = width * sinArc + height * cosArc;
    } else {
      newWidth = width / (cosArc + sinArc / aspectRatio);
      newHeight = newWidth / aspectRatio;
    }

    return {
      width: newWidth,
      height: newHeight
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
    this.rotated = false;
    this.cropped = false;
    this.disabled = false;
    this.canvas = null;
    this.cropBox = null;

    this.load();
  }

  prototype.load = function (url) {
    var options = this.options,
        $this = this.$element,
        crossOrigin,
        bustCacheUrl,
        buildEvent,
        $clone;

    if (!url) {
      if ($this.is('img')) {
        if (!$this.attr('src')) {
          return;
        }

        url = $this.prop('src');
      } else if ($this.is('canvas') && SUPPORT_CANVAS) {
        url = $this[0].toDataURL();
      }
    }

    if (!url) {
      return;
    }

    buildEvent = $.Event(EVENT_BUILD);
    $this.one(EVENT_BUILD, options.build).trigger(buildEvent); // Only trigger once

    if (buildEvent.isDefaultPrevented()) {
      return;
    }

    if (options.checkImageOrigin && isCrossOriginURL(url)) {
      crossOrigin = 'anonymous';

      if (!$this.prop('crossOrigin')) { // Only when there was not a "crossOrigin" property
        bustCacheUrl = addTimestamp(url); // Bust cache (#148)
      }
    }

    this.$clone = $clone = $('<img>');

    $clone.one('load', $.proxy(function () {
      var naturalWidth = $clone.prop('naturalWidth') || $clone.width(),
          naturalHeight = $clone.prop('naturalHeight') || $clone.height();

      this.image = {
        naturalWidth: naturalWidth,
        naturalHeight: naturalHeight,
        aspectRatio: naturalWidth / naturalHeight,
        rotate: 0
      };

      this.url = url;
      this.ready = true;
      this.build();
    }, this)).one('error', function () {
      $clone.remove();
    }).attr({
      crossOrigin: crossOrigin, // "crossOrigin" must before "src" (#271)
      src: bustCacheUrl || url
    });

    // Hide and insert into the document
    $clone.addClass(CLASS_HIDE).insertAfter($this);
  };

  prototype.build = function () {
    var $this = this.$element,
        $clone = this.$clone,
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

    // Show the clone iamge
    $clone.removeClass(CLASS_HIDE);

    this.$container = $this.parent().append($cropper);
    this.$canvas = $cropper.find('.cropper-canvas').append($clone);
    this.$dragBox = $cropper.find('.cropper-drag-box');
    this.$cropBox = $cropBox = $cropper.find('.cropper-crop-box');
    this.$viewBox = $cropper.find('.cropper-view-box');

    this.addListeners();
    this.initPreview();

    // Format aspect ratio
    options.aspectRatio = num(options.aspectRatio) || NaN; // 0 -> NaN

    if (options.autoCrop) {
      this.cropped = true;

      if (options.modal) {
        this.$dragBox.addClass(CLASS_MODAL);
      }
    } else {
      $cropBox.addClass(CLASS_HIDDEN);
    }

    if (options.background) {
      $cropper.addClass(CLASS_BG);
    }

    if (!options.highlight) {
      $cropBox.find('.cropper-face').addClass(CLASS_INVISIBLE);
    }

    if (!options.guides) {
      $cropBox.find('.cropper-dashed').addClass(CLASS_HIDDEN);
    }

    if (!options.movable) {
      $cropBox.find('.cropper-face').data('drag', 'move');
    }

    if (!options.resizable) {
      $cropBox.find('.cropper-line, .cropper-point').addClass(CLASS_HIDDEN);
    }

    this.setDragMode(options.dragCrop ? 'crop' : 'move');

    this.built = true;
    this.render();
    this.setData(options.data);
    $this.one(EVENT_BUILT, options.built).trigger(EVENT_BUILT); // Only trigger once
  };

  prototype.unbuild = function () {
    if (!this.built) {
      return;
    }

    this.built = false;
    this.initialImage = null;
    this.initialCanvas = null; // This is necessary when replace
    this.initialCropBox = null;
    this.container = null;
    this.canvas = null;
    this.cropBox = null; // This is necessary when replace
    this.removeListeners();

    this.resetPreview();
    this.$preview = null;

    this.$viewBox = null;
    this.$cropBox = null;
    this.$dragBox = null;
    this.$canvas = null;
    this.$container = null;

    this.$cropper.remove();
    this.$cropper = null;
  };

  $.extend(prototype, {
    render: function () {
      this.initContainer();
      this.initCanvas();
      this.initCropBox();

      this.renderCanvas();

      if (this.cropped) {
        this.renderCropBox();
      }
    },

    initContainer: function () {
      var $this = this.$element,
          $container = this.$container,
          $cropper = this.$cropper,
          options = this.options;

      $cropper.addClass(CLASS_HIDDEN);
      $this.removeClass(CLASS_HIDDEN);

      $cropper.css((this.container = {
        width: max($container.width(), num(options.minContainerWidth) || 200),
        height: max($container.height(), num(options.minContainerHeight) || 100)
      }));

      $this.addClass(CLASS_HIDDEN);
      $cropper.removeClass(CLASS_HIDDEN);
    },

    // image box (wrapper)
    initCanvas: function () {
      var container = this.container,
          containerWidth = container.width,
          containerHeight = container.height,
          image = this.image,
          aspectRatio = image.aspectRatio,
          canvas = {
            aspectRatio: aspectRatio,
            width: containerWidth,
            height: containerHeight
          };

      if (containerHeight * aspectRatio > containerWidth) {
        canvas.height = containerWidth / aspectRatio;
      } else {
        canvas.width = containerHeight * aspectRatio;
      }

      canvas.oldLeft = canvas.left = (containerWidth - canvas.width) / 2;
      canvas.oldTop = canvas.top = (containerHeight - canvas.height) / 2;

      this.canvas = canvas;
      this.limitCanvas(true, true);
      this.initialImage = $.extend({}, image);
      this.initialCanvas = $.extend({}, canvas);
    },

    limitCanvas: function (size, position) {
      var options = this.options,
          strict = options.strict,
          container = this.container,
          containerWidth = container.width,
          containerHeight = container.height,
          canvas = this.canvas,
          aspectRatio = canvas.aspectRatio,
          cropBox = this.cropBox,
          cropped = this.cropped && cropBox,
          initialCanvas = this.initialCanvas || canvas,
          initialCanvasWidth = initialCanvas.width,
          initialCanvasHeight = initialCanvas.height,
          minCanvasWidth,
          minCanvasHeight;

      if (size) {
        minCanvasWidth = num(options.minCanvasWidth) || 0;
        minCanvasHeight = num(options.minCanvasHeight) || 0;

        if (minCanvasWidth) {
          if (strict) {
            minCanvasWidth = max(cropped ? cropBox.width : initialCanvasWidth, minCanvasWidth);
          }

          minCanvasHeight = minCanvasWidth / aspectRatio;
        } else if (minCanvasHeight) {
          if (strict) {
            minCanvasHeight = max(cropped ? cropBox.height : initialCanvasHeight, minCanvasHeight);
          }

          minCanvasWidth = minCanvasHeight * aspectRatio;
        } else if (strict) {
          if (cropped) {
            minCanvasWidth = cropBox.width;
            minCanvasHeight = cropBox.height;

            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
              minCanvasWidth = minCanvasHeight * aspectRatio;
            } else {
              minCanvasHeight = minCanvasWidth / aspectRatio;
            }
          } else {
            minCanvasWidth = initialCanvasWidth;
            minCanvasHeight = initialCanvasHeight;
          }
        }

        $.extend(canvas, {
          minWidth: minCanvasWidth,
          minHeight: minCanvasHeight,
          maxWidth: Infinity,
          maxHeight: Infinity
        });
      }

      if (position) {
        if (strict) {
          if (cropped) {
            canvas.minLeft = min(cropBox.left, (cropBox.left + cropBox.width) - canvas.width);
            canvas.minTop = min(cropBox.top, (cropBox.top + cropBox.height) - canvas.height);
            canvas.maxLeft = cropBox.left;
            canvas.maxTop = cropBox.top;
          } else {
            canvas.minLeft = min(0, containerWidth - canvas.width);
            canvas.minTop = min(0, containerHeight - canvas.height);
            canvas.maxLeft = max(0, containerWidth - canvas.width);
            canvas.maxTop = max(0, containerHeight - canvas.height);
          }
        } else {
          canvas.minLeft = -canvas.width;
          canvas.minTop = -canvas.height;
          canvas.maxLeft = containerWidth;
          canvas.maxTop = containerHeight;
        }
      }
    },

    renderCanvas: function (changed) {
      var options = this.options,
          canvas = this.canvas,
          image = this.image,
          aspectRatio,
          rotated;

      if (this.rotated) {
        this.rotated = false;

        // Computes rotatation sizes with image sizes
        rotated = getRotatedSizes({
          width: image.width,
          height: image.height,
          degree: image.rotate
        });

        aspectRatio = rotated.width / rotated.height;

        if (aspectRatio !== canvas.aspectRatio) {
          canvas.left -= (rotated.width - canvas.width) / 2;
          canvas.top -= (rotated.height - canvas.height) / 2;
          canvas.width = rotated.width;
          canvas.height = rotated.height;
          canvas.aspectRatio = aspectRatio;
          this.limitCanvas(true, false);
        }
      }

      if (canvas.width > canvas.maxWidth || canvas.width < canvas.minWidth) {
        canvas.left = canvas.oldLeft;
      }

      if (canvas.height > canvas.maxHeight || canvas.height < canvas.minHeight) {
        canvas.top = canvas.oldTop;
      }

      canvas.width = min(max(canvas.width, canvas.minWidth), canvas.maxWidth);
      canvas.height = min(max(canvas.height, canvas.minHeight), canvas.maxHeight);

      this.limitCanvas(false, true);

      canvas.oldLeft = canvas.left = min(max(canvas.left, canvas.minLeft), canvas.maxLeft);
      canvas.oldTop = canvas.top = min(max(canvas.top, canvas.minTop), canvas.maxTop);

      this.$canvas.css({
        width: canvas.width,
        height: canvas.height,
        left: canvas.left,
        top: canvas.top
      });

      this.renderImage();

      if (this.cropped && options.strict) {
        this.limitCropBox(true, true);
      }

      if (changed) {
        this.output();
      }
    },

    renderImage: function () {
      var canvas = this.canvas,
          image = this.image,
          reversed;

      if (image.rotate) {
        reversed = getRotatedSizes({
          width: canvas.width,
          height: canvas.height,
          degree: image.rotate,
          aspectRatio: image.aspectRatio
        }, true);
      }

      $.extend(image, reversed ? {
        width: reversed.width,
        height: reversed.height,
        left: (canvas.width - reversed.width) / 2,
        top: (canvas.height - reversed.height) / 2
      } : {
        width: canvas.width,
        height: canvas.height,
        left: 0,
        top: 0
      });

      this.$clone.css({
        width: image.width,
        height: image.height,
        marginLeft: image.left,
        marginTop: image.top,
        transform: getRotateValue(image.rotate)
      });
    },

    initCropBox: function () {
      var options = this.options,
          canvas = this.canvas,
          aspectRatio = options.aspectRatio,
          autoCropArea = num(options.autoCropArea) || 0.8,
          cropBox = {
            width: canvas.width,
            height: canvas.height
          };

      if (aspectRatio) {
        if (canvas.height * aspectRatio > canvas.width) {
          cropBox.height = cropBox.width / aspectRatio;
        } else {
          cropBox.width = cropBox.height * aspectRatio;
        }
      }

      this.cropBox = cropBox;
      this.limitCropBox(true, true);

      // Initialize auto crop area
      cropBox.width = min(max(cropBox.width, cropBox.minWidth), cropBox.maxWidth);
      cropBox.height = min(max(cropBox.height, cropBox.minHeight), cropBox.maxHeight);

      // The width of auto crop area must large than "minWidth", and the height too. (#164)
      cropBox.width = max(cropBox.minWidth, cropBox.width * autoCropArea);
      cropBox.height = max(cropBox.minHeight, cropBox.height * autoCropArea);
      cropBox.oldLeft = cropBox.left = canvas.left + (canvas.width - cropBox.width) / 2;
      cropBox.oldTop = cropBox.top = canvas.top + (canvas.height - cropBox.height) / 2;

      this.initialCropBox = $.extend({}, cropBox);
    },

    limitCropBox: function (size, position) {
      var options = this.options,
          strict = options.strict,
          container = this.container,
          containerWidth = container.width,
          containerHeight = container.height,
          canvas = this.canvas,
          cropBox = this.cropBox,
          aspectRatio = options.aspectRatio,
          minCropBoxWidth,
          minCropBoxHeight;

      if (size) {
        minCropBoxWidth = num(options.minCropBoxWidth) || 0;
        minCropBoxHeight = num(options.minCropBoxHeight) || 0;

        // min/maxCropBoxWidth/Height must less than conatiner width/height
        cropBox.minWidth = min(containerWidth, minCropBoxWidth);
        cropBox.minHeight = min(containerHeight, minCropBoxHeight);
        cropBox.maxWidth = min(containerWidth, strict ? canvas.width : containerWidth);
        cropBox.maxHeight = min(containerHeight, strict ? canvas.height : containerHeight);

        if (aspectRatio) {
          // compare crop box size with container first
          if (cropBox.maxHeight * aspectRatio > cropBox.maxWidth) {
            cropBox.minHeight = cropBox.minWidth / aspectRatio;
            cropBox.maxHeight = cropBox.maxWidth / aspectRatio;
          } else {
            cropBox.minWidth = cropBox.minHeight * aspectRatio;
            cropBox.maxWidth = cropBox.maxHeight * aspectRatio;
          }
        }

        // The "minWidth" must be less than "maxWidth", and the "minHeight" too.
        cropBox.minWidth = min(cropBox.maxWidth, cropBox.minWidth);
        cropBox.minHeight = min(cropBox.maxHeight, cropBox.minHeight);
      }

      if (position) {
        if (strict) {
          cropBox.minLeft = max(0, canvas.left);
          cropBox.minTop = max(0, canvas.top);
          cropBox.maxLeft = min(containerWidth, canvas.left + canvas.width) - cropBox.width;
          cropBox.maxTop = min(containerHeight, canvas.top + canvas.height) - cropBox.height;
        } else {
          cropBox.minLeft = 0;
          cropBox.minTop = 0;
          cropBox.maxLeft = containerWidth - cropBox.width;
          cropBox.maxTop = containerHeight - cropBox.height;
        }
      }
    },

    renderCropBox: function () {
      var options = this.options,
          container = this.container,
          containerWidth = container.width,
          containerHeight = container.height,
          $cropBox = this.$cropBox,
          cropBox = this.cropBox;

      if (cropBox.width > cropBox.maxWidth || cropBox.width < cropBox.minWidth) {
        cropBox.left = cropBox.oldLeft;
      }

      if (cropBox.height > cropBox.maxHeight || cropBox.height < cropBox.minHeight) {
        cropBox.top = cropBox.oldTop;
      }

      cropBox.width = min(max(cropBox.width, cropBox.minWidth), cropBox.maxWidth);
      cropBox.height = min(max(cropBox.height, cropBox.minHeight), cropBox.maxHeight);

      this.limitCropBox(false, true);

      cropBox.oldLeft = cropBox.left = min(max(cropBox.left, cropBox.minLeft), cropBox.maxLeft);
      cropBox.oldTop = cropBox.top = min(max(cropBox.top, cropBox.minTop), cropBox.maxTop);

      if (options.movable) {
        $cropBox.find('.cropper-face').data('drag', (cropBox.width === containerWidth && cropBox.height === containerHeight) ? 'move' : 'all');
      }

      $cropBox.css({
        width: cropBox.width,
        height: cropBox.height,
        left: cropBox.left,
        top: cropBox.top
      });

      if (this.cropped && options.strict) {
        this.limitCanvas(true, true);
      }

      if (!this.disabled) {
        this.output();
      }
    },

    output: function () {
      var options = this.options;

      this.preview();

      if (options.crop) {
        options.crop.call(this.$element, this.getData());
      }
    }
  });

  prototype.initPreview = function () {
    var url = this.url;

    this.$preview = $(this.options.preview);
    this.$viewBox.html('<img src="' + url + '">');

    // Override img element styles
    // Add `display:block` to avoid margin top issue (Occur only when margin-top <= -height)
    this.$preview.each(function () {
      var $this = $(this);

      $this.data(CROPPER_PREVIEW, {
        width: $this.width(),
        height: $this.height(),
        original: $this.html()
      }).html('<img src="' + url + '" style="display:block;width:100%;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation: 0deg!important">');
    });
  };

  prototype.resetPreview = function () {
    this.$preview.each(function () {
      var $this = $(this);

      $this.html($this.data(CROPPER_PREVIEW).original).removeData(CROPPER_PREVIEW);
    });
  };

  prototype.preview = function () {
    var image = this.image,
        canvas = this.canvas,
        cropBox = this.cropBox,
        width = image.width,
        height = image.height,
        left = cropBox.left - canvas.left - image.left,
        top = cropBox.top - canvas.top - image.top,
        rotate = image.rotate;

    if (!this.cropped || this.disabled) {
      return;
    }

    this.$viewBox.find('img').css({
      width: width,
      height: height,
      marginLeft: -left,
      marginTop: -top,
      transform: getRotateValue(rotate)
    });

    this.$preview.each(function () {
      var $this = $(this),
          data = $this.data(CROPPER_PREVIEW),
          ratio = data.width / cropBox.width,
          newWidth = data.width,
          newHeight = cropBox.height * ratio;

      if (newHeight > data.height) {
        ratio = data.height / cropBox.height;
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

    this.$element.on(EVENT_DRAG_START, options.dragstart).on(EVENT_DRAG_MOVE, options.dragmove).on(EVENT_DRAG_END, options.dragend).on(EVENT_ZOOM_IN, options.zoomin).on(EVENT_ZOOM_OUT, options.zoomout);
    this.$cropper.on(EVENT_MOUSE_DOWN, $.proxy(this.dragstart, this)).on(EVENT_DBLCLICK, $.proxy(this.dblclick, this));

    if (options.zoomable && options.mouseWheelZoom) {
      this.$cropper.on(EVENT_WHEEL, $.proxy(this.wheel, this));
    }

    $document.on(EVENT_MOUSE_MOVE, (this._dragmove = proxy(this.dragmove, this))).on(EVENT_MOUSE_UP, (this._dragend = proxy(this.dragend, this)));

    if (options.responsive) {
      $window.on(EVENT_RESIZE, (this._resize = proxy(this.resize, this)));
    }
  };

  prototype.removeListeners = function () {
    var options = this.options;

    this.$element.off(EVENT_DRAG_START, options.dragstart).off(EVENT_DRAG_MOVE, options.dragmove).off(EVENT_DRAG_END, options.dragend).off(EVENT_ZOOM_IN, options.zoomin).off(EVENT_ZOOM_OUT, options.zoomout);
    this.$cropper.off(EVENT_MOUSE_DOWN, this.dragstart).off(EVENT_DBLCLICK, this.dblclick);

    if (options.zoomable && options.mouseWheelZoom) {
      this.$cropper.off(EVENT_WHEEL, this.wheel);
    }

    $document.off(EVENT_MOUSE_MOVE, this._dragmove).off(EVENT_MOUSE_UP, this._dragend);

    if (options.responsive) {
      $window.off(EVENT_RESIZE, this._resize);
    }
  };

  $.extend(prototype, {
    resize: function () {
      var $container = this.$container,
          container = this.container,
          canvasData,
          cropBoxData,
          ratio;

      if (this.disabled) {
        return;
      }

      ratio = $container.width() / container.width;

      if (ratio !== 1 || $container.height() !== container.height) {
        canvasData = this.getCanvasData();
        cropBoxData = this.getCropBoxData();

        this.render();
        this.setCanvasData($.each(canvasData, function (i, n) {
          canvasData[i] = n * ratio;
        }));
        this.setCropBoxData($.each(cropBoxData, function (i, n) {
          cropBoxData[i] = n * ratio;
        }));
      }
    },

    dblclick: function () {
      if (this.disabled) {
        return;
      }

      if (this.$dragBox.hasClass(CLASS_CROP)) {
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

      this.zoom(-delta * 0.1);
    },

    dragstart: function (event) {
      var options = this.options,
          originalEvent = event.originalEvent,
          touches = originalEvent && originalEvent.touches,
          e = event,
          dragType,
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
            dragType = 'zoom';
          } else {
            return;
          }
        }

        e = touches[0];
      }

      dragType = dragType || $(e.target).data('drag');

      if (REGEXP_DRAG_TYPES.test(dragType)) {
        event.preventDefault();

        dragStartEvent = $.Event(EVENT_DRAG_START, {
          originalEvent: originalEvent,
          dragType: dragType
        });

        this.$element.trigger(dragStartEvent);

        if (dragStartEvent.isDefaultPrevented()) {
          return;
        }

        this.dragType = dragType;
        this.cropping = false;
        this.startX = e.pageX;
        this.startY = e.pageY;

        if (dragType === 'crop') {
          this.cropping = true;
          this.$dragBox.addClass(CLASS_MODAL);
        }
      }
    },

    dragmove: function (event) {
      var options = this.options,
          originalEvent = event.originalEvent,
          touches = originalEvent && originalEvent.touches,
          e = event,
          dragType = this.dragType,
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

      if (dragType) {
        event.preventDefault();

        dragMoveEvent = $.Event(EVENT_DRAG_MOVE, {
          originalEvent: originalEvent,
          dragType: dragType
        });

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
      var dragType = this.dragType,
          dragEndEvent;

      if (this.disabled) {
        return;
      }

      if (dragType) {
        event.preventDefault();

        dragEndEvent = $.Event(EVENT_DRAG_END, {
          originalEvent: event.originalEvent,
          dragType: dragType
        });

        this.$element.trigger(dragEndEvent);

        if (dragEndEvent.isDefaultPrevented()) {
          return;
        }

        if (this.cropping) {
          this.cropping = false;
          this.$dragBox.toggleClass(CLASS_MODAL, this.cropped && this.options.modal);
        }

        this.dragType = '';
      }
    }
  });

  $.extend(prototype, {
    crop: function () {
      if (!this.built || this.disabled) {
        return;
      }

      if (!this.cropped) {
        this.cropped = true;
        this.limitCropBox(true, true);

        if (this.options.modal) {
          this.$dragBox.addClass(CLASS_MODAL);
        }

        this.$cropBox.removeClass(CLASS_HIDDEN);
      }

      this.setCropBoxData(this.initialCropBox);
    },

    reset: function () {
      if (!this.built || this.disabled) {
        return;
      }

      this.image = $.extend({}, this.initialImage);
      this.canvas = $.extend({}, this.initialCanvas);
      this.cropBox = $.extend({}, this.initialCropBox); // required for strict mode

      this.renderCanvas();

      if (this.cropped) {
        this.renderCropBox();
      }
    },

    clear: function () {
      if (!this.cropped || this.disabled) {
        return;
      }

      $.extend(this.cropBox, {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      });

      this.cropped = false;
      this.renderCropBox();

      this.limitCanvas();
      this.renderCanvas(); // Render canvas after render crop box

      this.$dragBox.removeClass(CLASS_MODAL);
      this.$cropBox.addClass(CLASS_HIDDEN);
    },

    destroy: function () {
      var $this = this.$element;

      if (this.ready) {
        this.unbuild();
        $this.removeClass(CLASS_HIDDEN);
      } else if (this.$clone) {
        this.$clone.remove();
      }

      $this.removeData('cropper');
    },

    replace: function (url) {
      if (!this.disabled && url) {
        this.load(url);
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
      var canvas = this.canvas;

      if (this.built && !this.disabled && isNumber(offsetX) && isNumber(offsetY)) {
        canvas.left += offsetX;
        canvas.top += offsetY;
        this.renderCanvas(true);
      }
    },

    zoom: function (delta) {
      var canvas = this.canvas,
          zoomEvent,
          width,
          height;

      delta = num(delta);

      if (delta && this.built && !this.disabled && this.options.zoomable) {
        zoomEvent = delta > 0 ? $.Event(EVENT_ZOOM_IN) : $.Event(EVENT_ZOOM_OUT);
        this.$element.trigger(zoomEvent);

        if (zoomEvent.isDefaultPrevented()) {
          return;
        }

        delta = delta <= -1 ? 1 / (1 - delta) : delta <= 1 ? (1 + delta) : delta;
        width = canvas.width * delta;
        height = canvas.height * delta;
        canvas.left -= (width - canvas.width) / 2;
        canvas.top -= (height - canvas.height) / 2;
        canvas.width = width;
        canvas.height = height;
        this.renderCanvas(true);
        this.setDragMode('move');
      }
    },

    rotate: function (degree) {
      var image = this.image;

      degree = num(degree);

      if (degree && this.built && !this.disabled && this.options.rotatable) {
        image.rotate = (image.rotate + degree) % 360;
        this.rotated = true;
        this.renderCanvas(true);
      }
    },

    getData: function () {
      var cropBox = this.cropBox,
          canvas = this.canvas,
          image = this.image,
          ratio,
          data;

      if (this.built && this.cropped) {
        data = {
          x: cropBox.left - canvas.left,
          y: cropBox.top - canvas.top,
          width: cropBox.width,
          height: cropBox.height
        };

        ratio = image.width / image.naturalWidth;

        $.each(data, function (i, n) {
          n = n / ratio;
          data[i] = n;
        });

      } else {
        data = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      }

      data.rotate = this.ready ? image.rotate : 0;

      return data;
    },

    setData: function (data) {
      var image = this.image,
          canvas = this.canvas,
          cropBoxData = {},
          ratio;

      if (this.built && !this.disabled && $.isPlainObject(data)) {
        if (isNumber(data.rotate) && data.rotate !== image.rotate && this.options.rotatable) {
          image.rotate = data.rotate;
          this.rotated = true;
          this.renderCanvas(true);
        }

        ratio = image.width / image.naturalWidth;

        if (isNumber(data.x)) {
          cropBoxData.left = data.x * ratio + canvas.left;
        }

        if (isNumber(data.y)) {
          cropBoxData.top = data.y * ratio + canvas.top;
        }

        if (isNumber(data.width)) {
          cropBoxData.width = data.width * ratio;
        }

        if (isNumber(data.height)) {
          cropBoxData.height = data.height * ratio;
        }

        this.setCropBoxData(cropBoxData);
      }
    },

    getContainerData: function () {
      return this.built ? this.container : {};
    },

    getImageData: function () {
      return this.ready ? this.image : {};
    },

    getCanvasData: function () {
      var canvas = this.canvas,
          data;

      if (this.built) {
        data = {
          left: canvas.left,
          top: canvas.top,
          width: canvas.width,
          height: canvas.height
        };
      }

      return data || {};
    },

    setCanvasData: function (data) {
      var canvas = this.canvas,
          aspectRatio = canvas.aspectRatio;

      if (this.built && !this.disabled && $.isPlainObject(data)) {
        if (isNumber(data.left)) {
          canvas.left = data.left;
        }

        if (isNumber(data.top)) {
          canvas.top = data.top;
        }

        if (isNumber(data.width)) {
          canvas.width = data.width;
          canvas.height = data.width / aspectRatio;
        } else if (isNumber(data.height)) {
          canvas.height = data.height;
          canvas.width = data.height * aspectRatio;
        }

        this.renderCanvas(true);
      }
    },

    getCropBoxData: function () {
      var cropBox = this.cropBox,
          data;

      if (this.built && this.cropped) {
        data = {
          left: cropBox.left,
          top: cropBox.top,
          width: cropBox.width,
          height: cropBox.height
        };
      }

      return data || {};
    },

    setCropBoxData: function (data) {
      var cropBox = this.cropBox,
          aspectRatio = this.options.aspectRatio;

      if (this.built && this.cropped && !this.disabled && $.isPlainObject(data)) {

        if (isNumber(data.left)) {
          cropBox.left = data.left;
        }

        if (isNumber(data.top)) {
          cropBox.top = data.top;
        }

        if (isNumber(data.width)) {
          cropBox.width = data.width;
        }

        if (isNumber(data.height)) {
          cropBox.height = data.height;
        }

        if (aspectRatio) {
          if (isNumber(data.width)) {
            cropBox.height = cropBox.width / aspectRatio;
          } else if (isNumber(data.height)) {
            cropBox.width = cropBox.height * aspectRatio;
          }
        }

        this.renderCropBox();
      }
    },

    getCroppedCanvas: function (options) {
      var originalWidth,
          originalHeight,
          canvasWidth,
          canvasHeight,
          scaledWidth,
          scaledHeight,
          scaledRatio,
          aspectRatio,
          canvas,
          context,
          data;

      if (!this.built || !this.cropped || !SUPPORT_CANVAS) {
        return;
      }

      if (!$.isPlainObject(options)) {
        options = {};
      }

      data = this.getData();
      originalWidth = data.width;
      originalHeight = data.height;
      aspectRatio = originalWidth / originalHeight;

      if ($.isPlainObject(options)) {
        scaledWidth = options.width;
        scaledHeight = options.height;

        if (scaledWidth) {
          scaledHeight = scaledWidth / aspectRatio;
          scaledRatio = scaledWidth / originalWidth;
        } else if (scaledHeight) {
          scaledWidth = scaledHeight * aspectRatio;
          scaledRatio = scaledHeight / originalHeight;
        }
      }

      canvasWidth = scaledWidth || originalWidth;
      canvasHeight = scaledHeight || originalHeight;

      canvas = $('<canvas>')[0];
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      context = canvas.getContext('2d');

      if (options.fillColor) {
        context.fillStyle = options.fillColor;
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
            dstHeight;

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

        // Scale destination sizes
        if (scaledRatio) {
          dstX *= scaledRatio;
          dstY *= scaledRatio;
          dstWidth *= scaledRatio;
          dstHeight *= scaledRatio;
        }

        // Avoid "IndexSizeError" in IE and Firefox
        if (dstWidth > 0 && dstHeight > 0) {
          args.push(dstX, dstY, dstWidth, dstHeight);
        }

        return args;
      }).call(this));

      return canvas;
    },

    setAspectRatio: function (aspectRatio) {
      var options = this.options;

      if (!this.disabled && !isUndefined(aspectRatio)) {
        options.aspectRatio = num(aspectRatio) || NaN; // 0 -> NaN

        if (this.built) {
          this.initCropBox();

          if (this.cropped) {
            this.renderCropBox();
          }
        }
      }
    },

    setDragMode: function (mode) {
      var $dragBox = this.$dragBox,
          cropable = false,
          movable = false;

      if (!this.ready || this.disabled) {
        return;
      }

      switch (mode) {
        case 'crop':
          if (this.options.dragCrop) {
            cropable = true;
            $dragBox.data('drag', mode);
          } else {
            movable = true;
          }

          break;

        case 'move':
          movable = true;
          $dragBox.data('drag', mode);

          break;

        default:
          $dragBox.removeData('drag');
      }

      $dragBox.toggleClass(CLASS_CROP, cropable).toggleClass(CLASS_MOVE, movable);
    }
  });

  prototype.change = function () {
    var dragType = this.dragType,
        options = this.options,
        canvas = this.canvas,
        container = this.container,
        cropBox = this.cropBox,
        width = cropBox.width,
        height = cropBox.height,
        left = cropBox.left,
        top = cropBox.top,
        right = left + width,
        bottom = top + height,
        minLeft = 0,
        minTop = 0,
        maxWidth = container.width,
        maxHeight = container.height,
        renderable = true,
        aspectRatio = options.aspectRatio,
        range = {
          x: this.endX - this.startX,
          y: this.endY - this.startY
        },
        offset;

    if (options.strict) {
      minLeft = cropBox.minLeft;
      minTop = cropBox.minTop;
      maxWidth = minLeft + min(container.width, canvas.width);
      maxHeight = minTop + min(container.height, canvas.height);
    }

    if (aspectRatio) {
      range.X = range.y * aspectRatio;
      range.Y = range.x / aspectRatio;
    }

    switch (dragType) {
      // Move cropBox
      case 'all':
        left += range.x;
        top += range.y;
        break;

      // Resize cropBox
      case 'e':
        if (range.x >= 0 && (right >= maxWidth || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
          renderable = false;
          break;
        }

        width += range.x;

        if (aspectRatio) {
          height = width / aspectRatio;
          top -= range.Y / 2;
        }

        if (width < 0) {
          dragType = 'w';
          width = 0;
        }

        break;

      case 'n':
        if (range.y <= 0 && (top <= minTop || aspectRatio && (left <= minLeft || right >= maxWidth))) {
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
          dragType = 's';
          height = 0;
        }

        break;

      case 'w':
        if (range.x <= 0 && (left <= minLeft || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
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
          dragType = 'e';
          width = 0;
        }

        break;

      case 's':
        if (range.y >= 0 && (bottom >= maxHeight || aspectRatio && (left <= minLeft || right >= maxWidth))) {
          renderable = false;
          break;
        }

        height += range.y;

        if (aspectRatio) {
          width = height * aspectRatio;
          left -= range.X / 2;
        }

        if (height < 0) {
          dragType = 'n';
          height = 0;
        }

        break;

      case 'ne':
        if (aspectRatio) {
          if (range.y <= 0 && (top <= minTop || right >= maxWidth)) {
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
            } else if (range.y <= 0 && top <= minTop) {
              renderable = false;
            }
          } else {
            width += range.x;
          }

          if (range.y <= 0) {
            if (top > minTop) {
              height -= range.y;
              top += range.y;
            }
          } else {
            height -= range.y;
            top += range.y;
          }
        }

        if (width < 0 && height < 0) {
          dragType = 'sw';
          height = 0;
          width = 0;
        } else if (width < 0) {
          dragType = 'nw';
          width = 0;
        } else if (height < 0) {
          dragType = 'se';
          height = 0;
        }

        break;

      case 'nw':
        if (aspectRatio) {
          if (range.y <= 0 && (top <= minTop || left <= minLeft)) {
            renderable = false;
            break;
          }

          height -= range.y;
          top += range.y;
          width = height * aspectRatio;
          left += range.X;
        } else {
          if (range.x <= 0) {
            if (left > minLeft) {
              width -= range.x;
              left += range.x;
            } else if (range.y <= 0 && top <= minTop) {
              renderable = false;
            }
          } else {
            width -= range.x;
            left += range.x;
          }

          if (range.y <= 0) {
            if (top > minTop) {
              height -= range.y;
              top += range.y;
            }
          } else {
            height -= range.y;
            top += range.y;
          }
        }

        if (width < 0 && height < 0) {
          dragType = 'se';
          height = 0;
          width = 0;
        } else if (width < 0) {
          dragType = 'ne';
          width = 0;
        } else if (height < 0) {
          dragType = 'sw';
          height = 0;
        }

        break;

      case 'sw':
        if (aspectRatio) {
          if (range.x <= 0 && (left <= minLeft || bottom >= maxHeight)) {
            renderable = false;
            break;
          }

          width -= range.x;
          left += range.x;
          height = width / aspectRatio;
        } else {
          if (range.x <= 0) {
            if (left > minLeft) {
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
          dragType = 'ne';
          height = 0;
          width = 0;
        } else if (width < 0) {
          dragType = 'se';
          width = 0;
        } else if (height < 0) {
          dragType = 'nw';
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
          dragType = 'nw';
          height = 0;
          width = 0;
        } else if (width < 0) {
          dragType = 'sw';
          width = 0;
        } else if (height < 0) {
          dragType = 'ne';
          height = 0;
        }

        break;

      // Move image
      case 'move':
        canvas.left += range.x;
        canvas.top += range.y;
        this.renderCanvas(true);
        renderable = false;
        break;

      // Scale image
      case 'zoom':
        this.zoom(function (x1, y1, x2, y2) {
          var z1 = sqrt(x1 * x1 + y1 * y1),
              z2 = sqrt(x2 * x2 + y2 * y2);

          return (z2 - z1) / z1;
        }(
          abs(this.startX - this.startX2),
          abs(this.startY - this.startY2),
          abs(this.endX - this.endX2),
          abs(this.endY - this.endY2)
        ));

        this.startX2 = this.endX2;
        this.startY2 = this.endY2;
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
              dragType = 'se';
            } else {
              dragType = 'ne';
              top -= height;
            }
          } else {
            if (range.y > 0) {
              dragType = 'sw';
              left -= width;
            } else {
              dragType = 'nw';
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
      this.dragType = dragType;

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

    // Previous/latest crop data
    // Type: Object
    data: null,

    // Add extra containers for previewing
    // Type: String (jQuery selector)
    preview: '',

    // Toggles
    strict: true, // strict mode, the image cannot zoom out less than the container
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
    minCanvasWidth: 0,
    minCanvasHeight: 0,
    minCropBoxWidth: 0,
    minCropBoxHeight: 0,
    minContainerWidth: 200,
    minContainerHeight: 100,

    // Events
    build: null, // Function
    built: null, // Function
    dragstart: null, // Function
    dragmove: null, // Function
    dragend: null, // Function
    zoomin: null, // Function
    zoomout: null // Function
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
  })('<0 6="5-container"><0 6="5-canvas"></0><0 6="5-2-9" 3-2="move"></0><0 6="5-crop-9"><1 6="5-view-9"></1><1 6="5-8 8-h"></1><1 6="5-8 8-v"></1><1 6="5-face" 3-2="all"></1><1 6="5-7 7-e" 3-2="e"></1><1 6="5-7 7-n" 3-2="n"></1><1 6="5-7 7-w" 3-2="w"></1><1 6="5-7 7-s" 3-2="s"></1><1 6="5-4 4-e" 3-2="e"></1><1 6="5-4 4-n" 3-2="n"></1><1 6="5-4 4-w" 3-2="w"></1><1 6="5-4 4-s" 3-2="s"></1><1 6="5-4 4-ne" 3-2="ne"></1><1 6="5-4 4-nw" 3-2="nw"></1><1 6="5-4 4-sw" 3-2="sw"></1><1 6="5-4 4-se" 3-2="se"></1></0></0>', 'div,span,drag,data,point,cropper,class,line,dashed,box');

  /* Template source:
  <div class="cropper-container">
    <div class="cropper-canvas"></div>
    <div class="cropper-drag-box" data-drag="move"></div>
    <div class="cropper-crop-box">
      <span class="cropper-view-box"></span>
      <span class="cropper-dashed dashed-h"></span>
      <span class="cropper-dashed dashed-v"></span>
      <span class="cropper-face" data-drag="all"></span>
      <span class="cropper-line line-e" data-drag="e"></span>
      <span class="cropper-line line-n" data-drag="n"></span>
      <span class="cropper-line line-w" data-drag="w"></span>
      <span class="cropper-line line-s" data-drag="s"></span>
      <span class="cropper-point point-e" data-drag="e"></span>
      <span class="cropper-point point-n" data-drag="n"></span>
      <span class="cropper-point point-w" data-drag="w"></span>
      <span class="cropper-point point-s" data-drag="s"></span>
      <span class="cropper-point point-ne" data-drag="ne"></span>
      <span class="cropper-point point-nw" data-drag="nw"></span>
      <span class="cropper-point point-sw" data-drag="sw"></span>
      <span class="cropper-point point-se" data-drag="se"></span>
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

    return isUndefined(result) ? this : result;
  };

  $.fn.cropper.Constructor = Cropper;
  $.fn.cropper.setDefaults = Cropper.setDefaults;

  // No conflict
  $.fn.cropper.noConflict = function () {
    $.fn.cropper = Cropper.other;
    return this;
  };

});
