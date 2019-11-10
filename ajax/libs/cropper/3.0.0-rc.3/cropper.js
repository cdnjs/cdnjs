/*!
 * Cropper v3.0.0-rc.3
 * https://github.com/fengyuanchen/cropper
 *
 * Copyright (c) 2017 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2017-07-07T13:00:47.346Z
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

var DEFAULTS = {
  // Define the view mode of the cropper
  viewMode: 0, // 0, 1, 2, 3

  // Define the dragging mode of the cropper
  dragMode: 'crop', // 'crop', 'move' or 'none'

  // Define the aspect ratio of the crop box
  aspectRatio: NaN,

  // An object with the previous cropping result data
  data: null,

  // A selector for adding extra containers to preview
  preview: '',

  // Re-render the cropper when resize the window
  responsive: true,

  // Restore the cropped area after resize the window
  restore: true,

  // Check if the current image is a cross-origin image
  checkCrossOrigin: true,

  // Check the current image's Exif Orientation information
  checkOrientation: true,

  // Show the black modal
  modal: true,

  // Show the dashed lines for guiding
  guides: true,

  // Show the center indicator for guiding
  center: true,

  // Show the white modal to highlight the crop box
  highlight: true,

  // Show the grid background
  background: true,

  // Enable to crop the image automatically when initialize
  autoCrop: true,

  // Define the percentage of automatic cropping area when initializes
  autoCropArea: 0.8,

  // Enable to move the image
  movable: true,

  // Enable to rotate the image
  rotatable: true,

  // Enable to scale the image
  scalable: true,

  // Enable to zoom the image
  zoomable: true,

  // Enable to zoom the image by dragging touch
  zoomOnTouch: true,

  // Enable to zoom the image by wheeling mouse
  zoomOnWheel: true,

  // Define zoom ratio when zoom the image by wheeling mouse
  wheelZoomRatio: 0.1,

  // Enable to move the crop box
  cropBoxMovable: true,

  // Enable to resize the crop box
  cropBoxResizable: true,

  // Toggle drag mode between "crop" and "move" when click twice on the cropper
  toggleDragModeOnDblclick: true,

  // Size limitation
  minCanvasWidth: 0,
  minCanvasHeight: 0,
  minCropBoxWidth: 0,
  minCropBoxHeight: 0,
  minContainerWidth: 200,
  minContainerHeight: 100,

  // Shortcuts of events
  ready: null,
  cropstart: null,
  cropmove: null,
  cropend: null,
  crop: null,
  zoom: null
};

var TEMPLATE = '<div class="cropper-container">' + '<div class="cropper-wrap-box">' + '<div class="cropper-canvas"></div>' + '</div>' + '<div class="cropper-drag-box"></div>' + '<div class="cropper-crop-box">' + '<span class="cropper-view-box"></span>' + '<span class="cropper-dashed dashed-h"></span>' + '<span class="cropper-dashed dashed-v"></span>' + '<span class="cropper-center"></span>' + '<span class="cropper-face"></span>' + '<span class="cropper-line line-e" data-action="e"></span>' + '<span class="cropper-line line-n" data-action="n"></span>' + '<span class="cropper-line line-w" data-action="w"></span>' + '<span class="cropper-line line-s" data-action="s"></span>' + '<span class="cropper-point point-e" data-action="e"></span>' + '<span class="cropper-point point-n" data-action="n"></span>' + '<span class="cropper-point point-w" data-action="w"></span>' + '<span class="cropper-point point-s" data-action="s"></span>' + '<span class="cropper-point point-ne" data-action="ne"></span>' + '<span class="cropper-point point-nw" data-action="nw"></span>' + '<span class="cropper-point point-sw" data-action="sw"></span>' + '<span class="cropper-point point-se" data-action="se"></span>' + '</div>' + '</div>';

var REGEXP_DATA_URL_HEAD = /^data:.*,/;
var REGEXP_USERAGENT = /(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i;
var navigator = typeof window !== 'undefined' ? window.navigator : null;
var IS_SAFARI_OR_UIWEBVIEW = navigator && REGEXP_USERAGENT.test(navigator.userAgent);
var fromCharCode = String.fromCharCode;

function isNumber(n) {
  return typeof n === 'number' && !isNaN(n);
}

function isUndefined(n) {
  return typeof n === 'undefined';
}

function toArray(obj, offset) {
  var args = [];

  // This is necessary for IE8
  if (isNumber(offset)) {
    args.push(offset);
  }

  return args.slice.apply(obj, args);
}

// Custom proxy to avoid jQuery's guid
function proxy(fn, context) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args2 = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args2[_key2] = arguments[_key2];
    }

    return fn.apply(context, args.concat(toArray(args2)));
  };
}

function objectKeys(obj) {
  var keys = [];

  $.each(obj, function (key) {
    keys.push(key);
  });

  return keys;
}

function isCrossOriginURL(url) {
  var parts = url.match(/^(https?:)\/\/([^:/?#]+):?(\d*)/i);

  return parts && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port);
}

function addTimestamp(url) {
  var timestamp = 'timestamp=' + new Date().getTime();

  return url + (url.indexOf('?') === -1 ? '?' : '&') + timestamp;
}

function getImageSize(image, callback) {
  // Modern browsers (ignore Safari, #120 & #509)
  if (image.naturalWidth && !IS_SAFARI_OR_UIWEBVIEW) {
    callback(image.naturalWidth, image.naturalHeight);
    return;
  }

  // IE8: Don't use `new Image()` here (#319)
  var newImage = document.createElement('img');

  newImage.onload = function load() {
    callback(this.width, this.height);
  };

  newImage.src = image.src;
}

function getTransform(options) {
  var transforms = [];
  var translateX = options.translateX;
  var translateY = options.translateY;
  var rotate = options.rotate;
  var scaleX = options.scaleX;
  var scaleY = options.scaleY;

  if (isNumber(translateX) && translateX !== 0) {
    transforms.push('translateX(' + translateX + 'px)');
  }

  if (isNumber(translateY) && translateY !== 0) {
    transforms.push('translateY(' + translateY + 'px)');
  }

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

function getRotatedSizes(data, isReversed) {
  var deg = Math.abs(data.degree) % 180;
  var arc = (deg > 90 ? 180 - deg : deg) * Math.PI / 180;
  var sinArc = Math.sin(arc);
  var cosArc = Math.cos(arc);
  var width = data.width;
  var height = data.height;
  var aspectRatio = data.aspectRatio;
  var newWidth = void 0;
  var newHeight = void 0;

  if (!isReversed) {
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

function getSourceCanvas(image, data, options) {
  var canvas = $('<canvas>')[0];
  var context = canvas.getContext('2d');
  var dstX = 0;
  var dstY = 0;
  var dstWidth = data.naturalWidth;
  var dstHeight = data.naturalHeight;
  var rotate = data.rotate;
  var scaleX = data.scaleX;
  var scaleY = data.scaleY;
  var scalable = isNumber(scaleX) && isNumber(scaleY) && (scaleX !== 1 || scaleY !== 1);
  var rotatable = isNumber(rotate) && rotate !== 0;
  var advanced = rotatable || scalable;
  var canvasWidth = dstWidth * Math.abs(scaleX || 1);
  var canvasHeight = dstHeight * Math.abs(scaleY || 1);
  var translateX = void 0;
  var translateY = void 0;
  var rotated = void 0;

  if (scalable) {
    translateX = canvasWidth / 2;
    translateY = canvasHeight / 2;
  }

  if (rotatable) {
    rotated = getRotatedSizes({
      width: canvasWidth,
      height: canvasHeight,
      degree: rotate
    });

    canvasWidth = rotated.width;
    canvasHeight = rotated.height;
    translateX = canvasWidth / 2;
    translateY = canvasHeight / 2;
  }

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  if (options.fillColor) {
    context.fillStyle = options.fillColor;
    context.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  if (advanced) {
    dstX = -dstWidth / 2;
    dstY = -dstHeight / 2;

    context.save();
    context.translate(translateX, translateY);
  }

  // Rotate should come first before scale as in the "getTransform" function
  if (rotatable) {
    context.rotate(rotate * Math.PI / 180);
  }

  if (scalable) {
    context.scale(scaleX, scaleY);
  }

  context.imageSmoothingEnabled = !!options.imageSmoothingEnabled;

  if (options.imageSmoothingQuality) {
    context.imageSmoothingQuality = options.imageSmoothingQuality;
  }

  context.drawImage(image, Math.floor(dstX), Math.floor(dstY), Math.floor(dstWidth), Math.floor(dstHeight));

  if (advanced) {
    context.restore();
  }

  return canvas;
}

function getStringFromCharCode(dataView, start, length) {
  var str = '';
  var i = void 0;

  for (i = start, length += start; i < length; i++) {
    str += fromCharCode(dataView.getUint8(i));
  }

  return str;
}

function getOrientation(arrayBuffer) {
  var dataView = new DataView(arrayBuffer);
  var length = dataView.byteLength;
  var orientation = void 0;
  var exifIDCode = void 0;
  var tiffOffset = void 0;
  var firstIFDOffset = void 0;
  var littleEndian = void 0;
  var endianness = void 0;
  var app1Start = void 0;
  var ifdStart = void 0;
  var offset = void 0;
  var i = void 0;

  // Only handle JPEG image (start by 0xFFD8)
  if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
    offset = 2;

    while (offset < length) {
      if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
        app1Start = offset;
        break;
      }

      offset++;
    }
  }

  if (app1Start) {
    exifIDCode = app1Start + 4;
    tiffOffset = app1Start + 10;

    if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
      endianness = dataView.getUint16(tiffOffset);
      littleEndian = endianness === 0x4949;

      if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
          if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
            firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);

            if (firstIFDOffset >= 0x00000008) {
              ifdStart = tiffOffset + firstIFDOffset;
            }
          }
        }
    }
  }

  if (ifdStart) {
    length = dataView.getUint16(ifdStart, littleEndian);

    for (i = 0; i < length; i++) {
      offset = ifdStart + i * 12 + 2;

      if (dataView.getUint16(offset, littleEndian) === 0x0112 /* Orientation */) {
          // 8 is the offset of the current tag's value
          offset += 8;

          // Get the original orientation value
          orientation = dataView.getUint16(offset, littleEndian);

          // Override the orientation with its default value for Safari (#120)
          if (IS_SAFARI_OR_UIWEBVIEW) {
            dataView.setUint16(offset, 1, littleEndian);
          }

          break;
        }
    }
  }

  return orientation;
}

function dataURLToArrayBuffer(dataURL) {
  var base64 = dataURL.replace(REGEXP_DATA_URL_HEAD, '');
  var binary = atob(base64);
  var length = binary.length;
  var arrayBuffer = new ArrayBuffer(length);
  var dataView = new Uint8Array(arrayBuffer);
  var i = void 0;

  for (i = 0; i < length; i++) {
    dataView[i] = binary.charCodeAt(i);
  }

  return arrayBuffer;
}

// Only available for JPEG image
function arrayBufferToDataURL(arrayBuffer) {
  var dataView = new Uint8Array(arrayBuffer);
  var length = dataView.length;
  var base64 = '';
  var i = void 0;

  for (i = 0; i < length; i++) {
    base64 += fromCharCode(dataView[i]);
  }

  return 'data:image/jpeg;base64,' + btoa(base64);
}

var render$1 = {
  render: function render() {
    var self = this;

    self.initContainer();
    self.initCanvas();
    self.initCropBox();

    self.renderCanvas();

    if (self.cropped) {
      self.renderCropBox();
    }
  },
  initContainer: function initContainer() {
    var self = this;
    var options = self.options;
    var $this = self.$element;
    var $container = self.$container;
    var $cropper = self.$cropper;
    var hidden = 'cropper-hidden';

    $cropper.addClass(hidden);
    $this.removeClass(hidden);

    $cropper.css(self.container = {
      width: Math.max($container.width(), Number(options.minContainerWidth) || 200),
      height: Math.max($container.height(), Number(options.minContainerHeight) || 100)
    });

    $this.addClass(hidden);
    $cropper.removeClass(hidden);
  },


  // Canvas (image wrapper)
  initCanvas: function initCanvas() {
    var self = this;
    var viewMode = self.options.viewMode;
    var container = self.container;
    var containerWidth = container.width;
    var containerHeight = container.height;
    var image = self.image;
    var imageNaturalWidth = image.naturalWidth;
    var imageNaturalHeight = image.naturalHeight;
    var is90Degree = Math.abs(image.rotate) % 180 === 90;
    var naturalWidth = is90Degree ? imageNaturalHeight : imageNaturalWidth;
    var naturalHeight = is90Degree ? imageNaturalWidth : imageNaturalHeight;
    var aspectRatio = naturalWidth / naturalHeight;
    var canvasWidth = containerWidth;
    var canvasHeight = containerHeight;

    if (containerHeight * aspectRatio > containerWidth) {
      if (viewMode === 3) {
        canvasWidth = containerHeight * aspectRatio;
      } else {
        canvasHeight = containerWidth / aspectRatio;
      }
    } else if (viewMode === 3) {
      canvasHeight = containerWidth / aspectRatio;
    } else {
      canvasWidth = containerHeight * aspectRatio;
    }

    var canvas = {
      naturalWidth: naturalWidth,
      naturalHeight: naturalHeight,
      aspectRatio: aspectRatio,
      width: canvasWidth,
      height: canvasHeight
    };

    canvas.oldLeft = canvas.left = (containerWidth - canvasWidth) / 2;
    canvas.oldTop = canvas.top = (containerHeight - canvasHeight) / 2;

    self.canvas = canvas;
    self.limited = viewMode === 1 || viewMode === 2;
    self.limitCanvas(true, true);
    self.initialImage = $.extend({}, image);
    self.initialCanvas = $.extend({}, canvas);
  },
  limitCanvas: function limitCanvas(isSizeLimited, isPositionLimited) {
    var self = this;
    var options = self.options;
    var viewMode = options.viewMode;
    var container = self.container;
    var containerWidth = container.width;
    var containerHeight = container.height;
    var canvas = self.canvas;
    var aspectRatio = canvas.aspectRatio;
    var cropBox = self.cropBox;
    var cropped = self.cropped && cropBox;

    if (isSizeLimited) {
      var minCanvasWidth = Number(options.minCanvasWidth) || 0;
      var minCanvasHeight = Number(options.minCanvasHeight) || 0;

      if (viewMode) {
        if (viewMode > 1) {
          minCanvasWidth = Math.max(minCanvasWidth, containerWidth);
          minCanvasHeight = Math.max(minCanvasHeight, containerHeight);

          if (viewMode === 3) {
            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
              minCanvasWidth = minCanvasHeight * aspectRatio;
            } else {
              minCanvasHeight = minCanvasWidth / aspectRatio;
            }
          }
        } else if (minCanvasWidth) {
          minCanvasWidth = Math.max(minCanvasWidth, cropped ? cropBox.width : 0);
        } else if (minCanvasHeight) {
          minCanvasHeight = Math.max(minCanvasHeight, cropped ? cropBox.height : 0);
        } else if (cropped) {
          minCanvasWidth = cropBox.width;
          minCanvasHeight = cropBox.height;

          if (minCanvasHeight * aspectRatio > minCanvasWidth) {
            minCanvasWidth = minCanvasHeight * aspectRatio;
          } else {
            minCanvasHeight = minCanvasWidth / aspectRatio;
          }
        }
      }

      if (minCanvasWidth && minCanvasHeight) {
        if (minCanvasHeight * aspectRatio > minCanvasWidth) {
          minCanvasHeight = minCanvasWidth / aspectRatio;
        } else {
          minCanvasWidth = minCanvasHeight * aspectRatio;
        }
      } else if (minCanvasWidth) {
        minCanvasHeight = minCanvasWidth / aspectRatio;
      } else if (minCanvasHeight) {
        minCanvasWidth = minCanvasHeight * aspectRatio;
      }

      canvas.minWidth = minCanvasWidth;
      canvas.minHeight = minCanvasHeight;
      canvas.maxWidth = Infinity;
      canvas.maxHeight = Infinity;
    }

    if (isPositionLimited) {
      if (viewMode) {
        var newCanvasLeft = containerWidth - canvas.width;
        var newCanvasTop = containerHeight - canvas.height;

        canvas.minLeft = Math.min(0, newCanvasLeft);
        canvas.minTop = Math.min(0, newCanvasTop);
        canvas.maxLeft = Math.max(0, newCanvasLeft);
        canvas.maxTop = Math.max(0, newCanvasTop);

        if (cropped && self.limited) {
          canvas.minLeft = Math.min(cropBox.left, cropBox.left + cropBox.width - canvas.width);
          canvas.minTop = Math.min(cropBox.top, cropBox.top + cropBox.height - canvas.height);
          canvas.maxLeft = cropBox.left;
          canvas.maxTop = cropBox.top;

          if (viewMode === 2) {
            if (canvas.width >= containerWidth) {
              canvas.minLeft = Math.min(0, newCanvasLeft);
              canvas.maxLeft = Math.max(0, newCanvasLeft);
            }

            if (canvas.height >= containerHeight) {
              canvas.minTop = Math.min(0, newCanvasTop);
              canvas.maxTop = Math.max(0, newCanvasTop);
            }
          }
        }
      } else {
        canvas.minLeft = -canvas.width;
        canvas.minTop = -canvas.height;
        canvas.maxLeft = containerWidth;
        canvas.maxTop = containerHeight;
      }
    }
  },
  renderCanvas: function renderCanvas(isChanged) {
    var self = this;
    var canvas = self.canvas;
    var image = self.image;
    var rotate = image.rotate;
    var naturalWidth = image.naturalWidth;
    var naturalHeight = image.naturalHeight;

    if (self.rotated) {
      self.rotated = false;

      // Computes rotated sizes with image sizes
      var rotated = getRotatedSizes({
        width: image.width,
        height: image.height,
        degree: rotate
      });
      var aspectRatio = rotated.width / rotated.height;
      var isSquareImage = image.aspectRatio === 1;

      if (isSquareImage || aspectRatio !== canvas.aspectRatio) {
        canvas.left -= (rotated.width - canvas.width) / 2;
        canvas.top -= (rotated.height - canvas.height) / 2;
        canvas.width = rotated.width;
        canvas.height = rotated.height;
        canvas.aspectRatio = aspectRatio;
        canvas.naturalWidth = naturalWidth;
        canvas.naturalHeight = naturalHeight;

        // Computes rotated sizes with natural image sizes
        if (isSquareImage && rotate % 90 || rotate % 180) {
          var rotated2 = getRotatedSizes({
            width: naturalWidth,
            height: naturalHeight,
            degree: rotate
          });

          canvas.naturalWidth = rotated2.width;
          canvas.naturalHeight = rotated2.height;
        }

        self.limitCanvas(true, false);
      }
    }

    if (canvas.width > canvas.maxWidth || canvas.width < canvas.minWidth) {
      canvas.left = canvas.oldLeft;
    }

    if (canvas.height > canvas.maxHeight || canvas.height < canvas.minHeight) {
      canvas.top = canvas.oldTop;
    }

    canvas.width = Math.min(Math.max(canvas.width, canvas.minWidth), canvas.maxWidth);
    canvas.height = Math.min(Math.max(canvas.height, canvas.minHeight), canvas.maxHeight);

    self.limitCanvas(false, true);

    canvas.oldLeft = canvas.left = Math.min(Math.max(canvas.left, canvas.minLeft), canvas.maxLeft);
    canvas.oldTop = canvas.top = Math.min(Math.max(canvas.top, canvas.minTop), canvas.maxTop);

    self.$canvas.css({
      width: canvas.width,
      height: canvas.height,
      transform: getTransform({
        translateX: canvas.left,
        translateY: canvas.top
      })
    });

    self.renderImage();

    if (self.cropped && self.limited) {
      self.limitCropBox(true, true);
    }

    if (isChanged) {
      self.output();
    }
  },
  renderImage: function renderImage(isChanged) {
    var self = this;
    var canvas = self.canvas;
    var image = self.image;
    var reversed = void 0;

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

    self.$clone.css({
      width: image.width,
      height: image.height,
      transform: getTransform($.extend({
        translateX: image.left,
        translateY: image.top
      }, image))
    });

    if (isChanged) {
      self.output();
    }
  },
  initCropBox: function initCropBox() {
    var self = this;
    var options = self.options;
    var canvas = self.canvas;
    var aspectRatio = options.aspectRatio;
    var autoCropArea = Number(options.autoCropArea) || 0.8;
    var cropBox = {
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

    self.cropBox = cropBox;
    self.limitCropBox(true, true);

    // Initialize auto crop area
    cropBox.width = Math.min(Math.max(cropBox.width, cropBox.minWidth), cropBox.maxWidth);
    cropBox.height = Math.min(Math.max(cropBox.height, cropBox.minHeight), cropBox.maxHeight);

    // The width of auto crop area must large than "minWidth", and the height too. (#164)
    cropBox.width = Math.max(cropBox.minWidth, cropBox.width * autoCropArea);
    cropBox.height = Math.max(cropBox.minHeight, cropBox.height * autoCropArea);
    cropBox.oldLeft = cropBox.left = canvas.left + (canvas.width - cropBox.width) / 2;
    cropBox.oldTop = cropBox.top = canvas.top + (canvas.height - cropBox.height) / 2;

    self.initialCropBox = $.extend({}, cropBox);
  },
  limitCropBox: function limitCropBox(isSizeLimited, isPositionLimited) {
    var self = this;
    var options = self.options;
    var aspectRatio = options.aspectRatio;
    var container = self.container;
    var containerWidth = container.width;
    var containerHeight = container.height;
    var canvas = self.canvas;
    var cropBox = self.cropBox;
    var limited = self.limited;

    if (isSizeLimited) {
      var minCropBoxWidth = Number(options.minCropBoxWidth) || 0;
      var minCropBoxHeight = Number(options.minCropBoxHeight) || 0;
      var maxCropBoxWidth = Math.min(containerWidth, limited ? canvas.width : containerWidth);
      var maxCropBoxHeight = Math.min(containerHeight, limited ? canvas.height : containerHeight);

      // The min/maxCropBoxWidth/Height must be less than containerWidth/Height
      minCropBoxWidth = Math.min(minCropBoxWidth, containerWidth);
      minCropBoxHeight = Math.min(minCropBoxHeight, containerHeight);

      if (aspectRatio) {
        if (minCropBoxWidth && minCropBoxHeight) {
          if (minCropBoxHeight * aspectRatio > minCropBoxWidth) {
            minCropBoxHeight = minCropBoxWidth / aspectRatio;
          } else {
            minCropBoxWidth = minCropBoxHeight * aspectRatio;
          }
        } else if (minCropBoxWidth) {
          minCropBoxHeight = minCropBoxWidth / aspectRatio;
        } else if (minCropBoxHeight) {
          minCropBoxWidth = minCropBoxHeight * aspectRatio;
        }

        if (maxCropBoxHeight * aspectRatio > maxCropBoxWidth) {
          maxCropBoxHeight = maxCropBoxWidth / aspectRatio;
        } else {
          maxCropBoxWidth = maxCropBoxHeight * aspectRatio;
        }
      }

      // The minWidth/Height must be less than maxWidth/Height
      cropBox.minWidth = Math.min(minCropBoxWidth, maxCropBoxWidth);
      cropBox.minHeight = Math.min(minCropBoxHeight, maxCropBoxHeight);
      cropBox.maxWidth = maxCropBoxWidth;
      cropBox.maxHeight = maxCropBoxHeight;
    }

    if (isPositionLimited) {
      if (limited) {
        cropBox.minLeft = Math.max(0, canvas.left);
        cropBox.minTop = Math.max(0, canvas.top);
        cropBox.maxLeft = Math.min(containerWidth, canvas.left + canvas.width) - cropBox.width;
        cropBox.maxTop = Math.min(containerHeight, canvas.top + canvas.height) - cropBox.height;
      } else {
        cropBox.minLeft = 0;
        cropBox.minTop = 0;
        cropBox.maxLeft = containerWidth - cropBox.width;
        cropBox.maxTop = containerHeight - cropBox.height;
      }
    }
  },
  renderCropBox: function renderCropBox() {
    var self = this;
    var options = self.options;
    var container = self.container;
    var containerWidth = container.width;
    var containerHeight = container.height;
    var cropBox = self.cropBox;

    if (cropBox.width > cropBox.maxWidth || cropBox.width < cropBox.minWidth) {
      cropBox.left = cropBox.oldLeft;
    }

    if (cropBox.height > cropBox.maxHeight || cropBox.height < cropBox.minHeight) {
      cropBox.top = cropBox.oldTop;
    }

    cropBox.width = Math.min(Math.max(cropBox.width, cropBox.minWidth), cropBox.maxWidth);
    cropBox.height = Math.min(Math.max(cropBox.height, cropBox.minHeight), cropBox.maxHeight);

    self.limitCropBox(false, true);

    cropBox.oldLeft = cropBox.left = Math.min(Math.max(cropBox.left, cropBox.minLeft), cropBox.maxLeft);
    cropBox.oldTop = cropBox.top = Math.min(Math.max(cropBox.top, cropBox.minTop), cropBox.maxTop);

    if (options.movable && options.cropBoxMovable) {
      // Turn to move the canvas when the crop box is equal to the container
      self.$face.data('action', cropBox.width === containerWidth && cropBox.height === containerHeight ? 'move' : 'all');
    }

    self.$cropBox.css({
      width: cropBox.width,
      height: cropBox.height,
      transform: getTransform({
        translateX: cropBox.left,
        translateY: cropBox.top
      })
    });

    if (self.cropped && self.limited) {
      self.limitCanvas(true, true);
    }

    if (!self.disabled) {
      self.output();
    }
  },
  output: function output() {
    var self = this;

    self.preview();

    if (self.completed) {
      self.trigger('crop', self.getData());
    }
  }
};

var DATA_PREVIEW = 'preview';

var preview$1 = {
  initPreview: function initPreview() {
    var self = this;
    var crossOrigin = self.crossOrigin;
    var url = crossOrigin ? self.crossOriginUrl : self.url;
    var image = document.createElement('img');

    if (crossOrigin) {
      image.crossOrigin = crossOrigin;
    }

    image.src = url;

    var $clone2 = $(image);

    self.$preview = $(self.options.preview);
    self.$clone2 = $clone2;
    self.$viewBox.html($clone2);
    self.$preview.each(function (i, element) {
      var $this = $(element);
      var img = document.createElement('img');

      // Save the original size for recover
      $this.data(DATA_PREVIEW, {
        width: $this.width(),
        height: $this.height(),
        html: $this.html()
      });

      if (crossOrigin) {
        img.crossOrigin = crossOrigin;
      }

      img.src = url;

      /**
       * Override img element styles
       * Add `display:block` to avoid margin top issue
       * Add `height:auto` to override `height` attribute on IE8
       * (Occur only when margin-top <= -height)
       */
      img.style.cssText = 'display:block;' + 'width:100%;' + 'height:auto;' + 'min-width:0!important;' + 'min-height:0!important;' + 'max-width:none!important;' + 'max-height:none!important;' + 'image-orientation:0deg!important;"';

      $this.html(img);
    });
  },
  resetPreview: function resetPreview() {
    this.$preview.each(function (i, element) {
      var $this = $(element);
      var data = $this.data(DATA_PREVIEW);

      $this.css({
        width: data.width,
        height: data.height
      }).html(data.html).removeData(DATA_PREVIEW);
    });
  },
  preview: function preview() {
    var self = this;
    var image = self.image;
    var canvas = self.canvas;
    var cropBox = self.cropBox;
    var cropBoxWidth = cropBox.width;
    var cropBoxHeight = cropBox.height;
    var width = image.width;
    var height = image.height;
    var left = cropBox.left - canvas.left - image.left;
    var top = cropBox.top - canvas.top - image.top;

    if (!self.cropped || self.disabled) {
      return;
    }

    self.$clone2.css({
      width: width,
      height: height,
      transform: getTransform($.extend({
        translateX: -left,
        translateY: -top
      }, image))
    });

    self.$preview.each(function (i, element) {
      var $this = $(element);
      var data = $this.data(DATA_PREVIEW);
      var originalWidth = data.width;
      var originalHeight = data.height;
      var newWidth = originalWidth;
      var newHeight = originalHeight;
      var ratio = 1;

      if (cropBoxWidth) {
        ratio = originalWidth / cropBoxWidth;
        newHeight = cropBoxHeight * ratio;
      }

      if (cropBoxHeight && newHeight > originalHeight) {
        ratio = originalHeight / cropBoxHeight;
        newWidth = cropBoxWidth * ratio;
        newHeight = originalHeight;
      }

      $this.css({
        width: newWidth,
        height: newHeight
      }).find('img').css({
        width: width * ratio,
        height: height * ratio,
        transform: getTransform($.extend({
          translateX: -left * ratio,
          translateY: -top * ratio
        }, image))
      });
    });
  }
};

// Globals
var PointerEvent = typeof window !== 'undefined' ? window.PointerEvent : null;

// Events
var EVENT_POINTER_DOWN = PointerEvent ? 'pointerdown' : 'touchstart mousedown';
var EVENT_POINTER_MOVE = PointerEvent ? 'pointermove' : 'touchmove mousemove';
var EVENT_POINTER_UP = PointerEvent ? ' pointerup pointercancel' : 'touchend touchcancel mouseup';
var EVENT_WHEEL = 'wheel mousewheel DOMMouseScroll';
var EVENT_DBLCLICK = 'dblclick';
var EVENT_RESIZE = 'resize';
var EVENT_CROP_START = 'cropstart';
var EVENT_CROP_MOVE = 'cropmove';
var EVENT_CROP_END = 'cropend';
var EVENT_CROP = 'crop';
var EVENT_ZOOM = 'zoom';

var events = {
  bind: function bind() {
    var self = this;
    var options = self.options;
    var $this = self.$element;
    var $cropper = self.$cropper;

    if ($.isFunction(options.cropstart)) {
      $this.on(EVENT_CROP_START, options.cropstart);
    }

    if ($.isFunction(options.cropmove)) {
      $this.on(EVENT_CROP_MOVE, options.cropmove);
    }

    if ($.isFunction(options.cropend)) {
      $this.on(EVENT_CROP_END, options.cropend);
    }

    if ($.isFunction(options.crop)) {
      $this.on(EVENT_CROP, options.crop);
    }

    if ($.isFunction(options.zoom)) {
      $this.on(EVENT_ZOOM, options.zoom);
    }

    $cropper.on(EVENT_POINTER_DOWN, proxy(self.cropStart, this));

    if (options.zoomable && options.zoomOnWheel) {
      $cropper.on(EVENT_WHEEL, proxy(self.wheel, this));
    }

    if (options.toggleDragModeOnDblclick) {
      $cropper.on(EVENT_DBLCLICK, proxy(self.dblclick, this));
    }

    $(document).on(EVENT_POINTER_MOVE, self.onCropMove = proxy(self.cropMove, this)).on(EVENT_POINTER_UP, self.onCropEnd = proxy(self.cropEnd, this));

    if (options.responsive) {
      $(window).on(EVENT_RESIZE, self.onResize = proxy(self.resize, this));
    }
  },
  unbind: function unbind() {
    var self = this;
    var options = self.options;
    var $this = self.$element;
    var $cropper = self.$cropper;

    if ($.isFunction(options.cropstart)) {
      $this.off(EVENT_CROP_START, options.cropstart);
    }

    if ($.isFunction(options.cropmove)) {
      $this.off(EVENT_CROP_MOVE, options.cropmove);
    }

    if ($.isFunction(options.cropend)) {
      $this.off(EVENT_CROP_END, options.cropend);
    }

    if ($.isFunction(options.crop)) {
      $this.off(EVENT_CROP, options.crop);
    }

    if ($.isFunction(options.zoom)) {
      $this.off(EVENT_ZOOM, options.zoom);
    }

    $cropper.off(EVENT_POINTER_DOWN, self.cropStart);

    if (options.zoomable && options.zoomOnWheel) {
      $cropper.off(EVENT_WHEEL, self.wheel);
    }

    if (options.toggleDragModeOnDblclick) {
      $cropper.off(EVENT_DBLCLICK, self.dblclick);
    }

    $(document).off(EVENT_POINTER_MOVE, self.onCropMove).off(EVENT_POINTER_UP, self.onCropEnd);

    if (options.responsive) {
      $(window).off(EVENT_RESIZE, self.onResize);
    }
  }
};

var REGEXP_ACTIONS = /^(e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/;

function getPointer(_ref, endOnly) {
  var pageX = _ref.pageX,
      pageY = _ref.pageY;

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

var handlers = {
  resize: function resize() {
    var self = this;
    var options = self.options;
    var $container = self.$container;
    var container = self.container;
    var minContainerWidth = Number(options.minContainerWidth) || 200;
    var minContainerHeight = Number(options.minContainerHeight) || 100;

    if (self.disabled || container.width === minContainerWidth || container.height === minContainerHeight) {
      return;
    }

    var ratio = $container.width() / container.width;

    // Resize when width changed or height changed
    if (ratio !== 1 || $container.height() !== container.height) {
      (function () {
        var canvasData = void 0;
        var cropBoxData = void 0;

        if (options.restore) {
          canvasData = self.getCanvasData();
          cropBoxData = self.getCropBoxData();
        }

        self.render();

        if (options.restore) {
          self.setCanvasData($.each(canvasData, function (i, n) {
            canvasData[i] = n * ratio;
          }));
          self.setCropBoxData($.each(cropBoxData, function (i, n) {
            cropBoxData[i] = n * ratio;
          }));
        }
      })();
    }
  },
  dblclick: function dblclick() {
    var self = this;

    if (self.disabled || self.options.dragMode === 'none') {
      return;
    }

    self.setDragMode(self.$dragBox.hasClass('cropper-crop') ? 'move' : 'crop');
  },
  wheel: function wheel(event) {
    var self = this;
    var e = event.originalEvent || event;
    var ratio = Number(self.options.wheelZoomRatio) || 0.1;

    if (self.disabled) {
      return;
    }

    event.preventDefault();

    // Limit wheel speed to prevent zoom too fast
    if (self.wheeling) {
      return;
    }

    self.wheeling = true;

    setTimeout(function () {
      self.wheeling = false;
    }, 50);

    var delta = 1;

    if (e.deltaY) {
      delta = e.deltaY > 0 ? 1 : -1;
    } else if (e.wheelDelta) {
      delta = -e.wheelDelta / 120;
    } else if (e.detail) {
      delta = e.detail > 0 ? 1 : -1;
    }

    self.zoom(-delta * ratio, event);
  },
  cropStart: function cropStart(e) {
    var self = this;

    if (self.disabled) {
      return;
    }

    var options = self.options;
    var pointers = self.pointers;
    var originalEvent = e.originalEvent;
    var action = void 0;

    if (originalEvent && originalEvent.changedTouches) {
      // Handle touch event
      $.each(originalEvent.changedTouches, function (i, touch) {
        pointers[touch.identifier] = getPointer(touch);
      });
    } else {
      // Handle mouse event and pointer event
      pointers[originalEvent && originalEvent.pointerId || 0] = getPointer(originalEvent || e);
    }

    if (objectKeys(pointers).length > 1 && options.zoomable && options.zoomOnTouch) {
      action = 'zoom';
    } else {
      action = $(e.target).data('action');
    }

    if (!REGEXP_ACTIONS.test(action)) {
      return;
    }

    if (self.trigger('cropstart', {
      originalEvent: originalEvent,
      action: action
    }).isDefaultPrevented()) {
      return;
    }

    e.preventDefault();

    self.action = action;
    self.cropping = false;

    if (action === 'crop') {
      self.cropping = true;
      self.$dragBox.addClass('cropper-modal');
    }
  },
  cropMove: function cropMove(e) {
    var self = this;
    var action = self.action;

    if (self.disabled || !action) {
      return;
    }

    var pointers = self.pointers;
    var originalEvent = e.originalEvent;

    e.preventDefault();

    if (self.trigger('cropmove', {
      originalEvent: originalEvent,
      action: action
    }).isDefaultPrevented()) {
      return;
    }

    if (originalEvent && originalEvent.changedTouches) {
      $.each(originalEvent.changedTouches, function (i, touch) {
        $.extend(pointers[touch.identifier], getPointer(touch, true));
      });
    } else {
      $.extend(pointers[originalEvent && originalEvent.pointerId || 0], getPointer(originalEvent || e, true));
    }

    self.change(e);
  },
  cropEnd: function cropEnd(e) {
    var self = this;

    if (self.disabled) {
      return;
    }

    var action = self.action;
    var pointers = self.pointers;
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

    e.preventDefault();

    if (!objectKeys(pointers).length) {
      self.action = '';
    }

    if (self.cropping) {
      self.cropping = false;
      self.$dragBox.toggleClass('cropper-modal', self.cropped && self.options.modal);
    }

    self.trigger('cropend', {
      originalEvent: originalEvent,
      action: action
    });
  }
};

// Actions
var ACTION_EAST = 'e';
var ACTION_WEST = 'w';
var ACTION_SOUTH = 's';
var ACTION_NORTH = 'n';
var ACTION_SOUTH_EAST = 'se';
var ACTION_SOUTH_WEST = 'sw';
var ACTION_NORTH_EAST = 'ne';
var ACTION_NORTH_WEST = 'nw';

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

var change$1 = {
  change: function change(e) {
    var self = this;
    var options = self.options;
    var pointers = self.pointers;
    var pointer = pointers[objectKeys(pointers)[0]];
    var container = self.container;
    var canvas = self.canvas;
    var cropBox = self.cropBox;
    var action = self.action;
    var aspectRatio = options.aspectRatio;
    var width = cropBox.width;
    var height = cropBox.height;
    var left = cropBox.left;
    var top = cropBox.top;
    var right = left + width;
    var bottom = top + height;
    var minLeft = 0;
    var minTop = 0;
    var maxWidth = container.width;
    var maxHeight = container.height;
    var renderable = true;
    var offset = void 0;

    // Locking aspect ratio in "free mode" by holding shift key (#259)
    if (!aspectRatio && e.shiftKey) {
      aspectRatio = width && height ? width / height : 1;
    }

    if (self.limited) {
      minLeft = cropBox.minLeft;
      minTop = cropBox.minTop;
      maxWidth = minLeft + Math.min(container.width, canvas.width, canvas.left + canvas.width);
      maxHeight = minTop + Math.min(container.height, canvas.height, canvas.top + canvas.height);
    }

    var range = {
      x: pointer.endX - pointer.startX,
      y: pointer.endY - pointer.startY
    };

    if (aspectRatio) {
      range.X = range.y * aspectRatio;
      range.Y = range.x / aspectRatio;
    }

    switch (action) {
      // Move crop box
      case 'all':
        left += range.x;
        top += range.y;
        break;

      // Resize crop box
      case ACTION_EAST:
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
          action = ACTION_WEST;
          width = 0;
        }

        break;

      case ACTION_NORTH:
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
          action = ACTION_SOUTH;
          height = 0;
        }

        break;

      case ACTION_WEST:
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
          action = ACTION_EAST;
          width = 0;
        }

        break;

      case ACTION_SOUTH:
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
          action = ACTION_NORTH;
          height = 0;
        }

        break;

      case ACTION_NORTH_EAST:
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
          action = ACTION_SOUTH_WEST;
          height = 0;
          width = 0;
        } else if (width < 0) {
          action = ACTION_NORTH_WEST;
          width = 0;
        } else if (height < 0) {
          action = ACTION_SOUTH_EAST;
          height = 0;
        }

        break;

      case ACTION_NORTH_WEST:
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
          action = ACTION_SOUTH_EAST;
          height = 0;
          width = 0;
        } else if (width < 0) {
          action = ACTION_NORTH_EAST;
          width = 0;
        } else if (height < 0) {
          action = ACTION_SOUTH_WEST;
          height = 0;
        }

        break;

      case ACTION_SOUTH_WEST:
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
          action = ACTION_NORTH_EAST;
          height = 0;
          width = 0;
        } else if (width < 0) {
          action = ACTION_SOUTH_EAST;
          width = 0;
        } else if (height < 0) {
          action = ACTION_NORTH_WEST;
          height = 0;
        }

        break;

      case ACTION_SOUTH_EAST:
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
          action = ACTION_NORTH_WEST;
          height = 0;
          width = 0;
        } else if (width < 0) {
          action = ACTION_SOUTH_WEST;
          width = 0;
        } else if (height < 0) {
          action = ACTION_NORTH_EAST;
          height = 0;
        }

        break;

      // Move canvas
      case 'move':
        self.move(range.x, range.y);
        renderable = false;
        break;

      // Zoom canvas
      case 'zoom':
        self.zoom(getMaxZoomRatio(pointers), e.originalEvent);
        renderable = false;
        break;

      // Create crop box
      case 'crop':
        if (!range.x || !range.y) {
          renderable = false;
          break;
        }

        offset = self.$cropper.offset();
        left = pointer.startX - offset.left;
        top = pointer.startY - offset.top;
        width = cropBox.minWidth;
        height = cropBox.minHeight;

        if (range.x > 0) {
          action = range.y > 0 ? ACTION_SOUTH_EAST : ACTION_NORTH_EAST;
        } else if (range.x < 0) {
          left -= width;
          action = range.y > 0 ? ACTION_SOUTH_WEST : ACTION_NORTH_WEST;
        }

        if (range.y < 0) {
          top -= height;
        }

        // Show the crop box if is hidden
        if (!self.cropped) {
          self.$cropBox.removeClass('cropper-hidden');
          self.cropped = true;

          if (self.limited) {
            self.limitCropBox(true, true);
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
      self.action = action;
      self.renderCropBox();
    }

    // Override
    $.each(pointers, function (i, p) {
      p.startX = p.endX;
      p.startY = p.endY;
    });
  }
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















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function getPointersCenter(pointers) {
  var pageX = 0;
  var pageY = 0;
  var count = 0;

  $.each(pointers, function (i, _ref) {
    var startX = _ref.startX,
        startY = _ref.startY;

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

var methods = {
  // Show the crop box manually
  crop: function crop() {
    var self = this;

    if (!self.ready || self.disabled) {
      return;
    }

    if (!self.cropped) {
      self.cropped = true;
      self.limitCropBox(true, true);

      if (self.options.modal) {
        self.$dragBox.addClass('cropper-modal');
      }

      self.$cropBox.removeClass('cropper-hidden');
    }

    self.setCropBoxData(self.initialCropBox);
  },


  // Reset the image and crop box to their initial states
  reset: function reset() {
    var self = this;

    if (!self.ready || self.disabled) {
      return;
    }

    self.image = $.extend({}, self.initialImage);
    self.canvas = $.extend({}, self.initialCanvas);
    self.cropBox = $.extend({}, self.initialCropBox);

    self.renderCanvas();

    if (self.cropped) {
      self.renderCropBox();
    }
  },


  // Clear the crop box
  clear: function clear() {
    var self = this;

    if (!self.cropped || self.disabled) {
      return;
    }

    $.extend(self.cropBox, {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    });

    self.cropped = false;
    self.renderCropBox();

    self.limitCanvas(true, true);

    // Render canvas after crop box rendered
    self.renderCanvas();

    self.$dragBox.removeClass('cropper-modal');
    self.$cropBox.addClass('cropper-hidden');
  },


  /**
   * Replace the image's src and rebuild the cropper
   *
   * @param {String} url
   * @param {Boolean} onlyColorChanged (optional)
   */
  replace: function replace(url, onlyColorChanged) {
    var self = this;

    if (!self.disabled && url) {
      if (self.isImg) {
        self.$element.attr('src', url);
      }

      if (onlyColorChanged) {
        self.url = url;
        self.$clone.attr('src', url);

        if (self.ready) {
          self.$preview.find('img').add(self.$clone2).attr('src', url);
        }
      } else {
        if (self.isImg) {
          self.replaced = true;
        }

        // Clear previous data
        self.options.data = null;
        self.load(url);
      }
    }
  },


  // Enable (unfreeze) the cropper
  enable: function enable() {
    var self = this;

    if (self.ready) {
      self.disabled = false;
      self.$cropper.removeClass('cropper-disabled');
    }
  },


  // Disable (freeze) the cropper
  disable: function disable() {
    var self = this;

    if (self.ready) {
      self.disabled = true;
      self.$cropper.addClass('cropper-disabled');
    }
  },


  // Destroy the cropper and remove the instance from the image
  destroy: function destroy() {
    var self = this;
    var $this = self.$element;

    if (self.loaded) {
      if (self.isImg && self.replaced) {
        $this.attr('src', self.originalUrl);
      }

      self.unbuild();
      $this.removeClass('cropper-hidden');
    } else if (self.isImg) {
      $this.off('load', self.start);
    } else if (self.$clone) {
      self.$clone.remove();
    }

    $this.removeData('cropper');
  },


  /**
   * Move the canvas with relative offsets
   *
   * @param {Number} offsetX
   * @param {Number} offsetY (optional)
   */
  move: function move(offsetX, offsetY) {
    var self = this;
    var canvas = self.canvas;

    self.moveTo(isUndefined(offsetX) ? offsetX : canvas.left + Number(offsetX), isUndefined(offsetY) ? offsetY : canvas.top + Number(offsetY));
  },


  /**
   * Move the canvas to an absolute point
   *
   * @param {Number} x
   * @param {Number} y (optional)
   */
  moveTo: function moveTo(x, y) {
    var self = this;
    var canvas = self.canvas;
    var changed = false;

    // If "y" is not present, its default value is "x"
    if (isUndefined(y)) {
      y = x;
    }

    x = Number(x);
    y = Number(y);

    if (self.ready && !self.disabled && self.options.movable) {
      if (isNumber(x)) {
        canvas.left = x;
        changed = true;
      }

      if (isNumber(y)) {
        canvas.top = y;
        changed = true;
      }

      if (changed) {
        self.renderCanvas(true);
      }
    }
  },


  /**
   * Zoom the canvas with a relative ratio
   *
   * @param {Number} ratio
   * @param {jQuery Event} _event (private)
   */
  zoom: function zoom(ratio, _event) {
    var self = this;
    var canvas = self.canvas;

    ratio = Number(ratio);

    if (ratio < 0) {
      ratio = 1 / (1 - ratio);
    } else {
      ratio = 1 + ratio;
    }

    self.zoomTo(canvas.width * ratio / canvas.naturalWidth, _event);
  },


  /**
   * Zoom the canvas to an absolute ratio
   *
   * @param {Number} ratio
   * @param {jQuery Event} _event (private)
   */
  zoomTo: function zoomTo(ratio, _event) {
    var self = this;
    var options = self.options;
    var pointers = self.pointers;
    var canvas = self.canvas;
    var width = canvas.width;
    var height = canvas.height;
    var naturalWidth = canvas.naturalWidth;
    var naturalHeight = canvas.naturalHeight;

    ratio = Number(ratio);

    if (ratio >= 0 && self.ready && !self.disabled && options.zoomable) {
      var newWidth = naturalWidth * ratio;
      var newHeight = naturalHeight * ratio;
      var originalEvent = void 0;

      if (_event) {
        originalEvent = _event.originalEvent;
      }

      if (self.trigger('zoom', {
        originalEvent: originalEvent,
        oldRatio: width / naturalWidth,
        ratio: newWidth / naturalWidth
      }).isDefaultPrevented()) {
        return;
      }

      if (originalEvent) {
        var offset = self.$cropper.offset();
        var center = pointers && objectKeys(pointers).length ? getPointersCenter(pointers) : {
          pageX: _event.pageX || originalEvent.pageX || 0,
          pageY: _event.pageY || originalEvent.pageY || 0
        };

        // Zoom from the triggering point of the event
        canvas.left -= (newWidth - width) * ((center.pageX - offset.left - canvas.left) / width);
        canvas.top -= (newHeight - height) * ((center.pageY - offset.top - canvas.top) / height);
      } else {
        // Zoom from the center of the canvas
        canvas.left -= (newWidth - width) / 2;
        canvas.top -= (newHeight - height) / 2;
      }

      canvas.width = newWidth;
      canvas.height = newHeight;
      self.renderCanvas(true);
    }
  },


  /**
   * Rotate the canvas with a relative degree
   *
   * @param {Number} degree
   */
  rotate: function rotate(degree) {
    var self = this;

    self.rotateTo((self.image.rotate || 0) + Number(degree));
  },


  /**
   * Rotate the canvas to an absolute degree
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#rotate()
   *
   * @param {Number} degree
   */
  rotateTo: function rotateTo(degree) {
    var self = this;

    degree = Number(degree);

    if (isNumber(degree) && self.ready && !self.disabled && self.options.rotatable) {
      self.image.rotate = degree % 360;
      self.rotated = true;
      self.renderCanvas(true);
    }
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
    var image = self.image;
    var changed = false;

    // If "scaleY" is not present, its default value is "scaleX"
    if (isUndefined(scaleY)) {
      scaleY = scaleX;
    }

    scaleX = Number(scaleX);
    scaleY = Number(scaleY);

    if (self.ready && !self.disabled && self.options.scalable) {
      if (isNumber(scaleX)) {
        image.scaleX = scaleX;
        changed = true;
      }

      if (isNumber(scaleY)) {
        image.scaleY = scaleY;
        changed = true;
      }

      if (changed) {
        self.renderImage(true);
      }
    }
  },


  /**
   * Scale the abscissa of the image
   *
   * @param {Number} scaleX
   */
  scaleX: function scaleX(_scaleX) {
    var self = this;
    var scaleY = self.image.scaleY;

    self.scale(_scaleX, isNumber(scaleY) ? scaleY : 1);
  },


  /**
   * Scale the ordinate of the image
   *
   * @param {Number} scaleY
   */
  scaleY: function scaleY(_scaleY) {
    var self = this;
    var scaleX = self.image.scaleX;

    self.scale(isNumber(scaleX) ? scaleX : 1, _scaleY);
  },


  /**
   * Get the cropped area position and size data (base on the original image)
   *
   * @param {Boolean} isRounded (optional)
   * @return {Object} data
   */
  getData: function getData(isRounded) {
    var self = this;
    var options = self.options;
    var image = self.image;
    var canvas = self.canvas;
    var cropBox = self.cropBox;
    var ratio = void 0;
    var data = void 0;

    if (self.ready && self.cropped) {
      data = {
        x: cropBox.left - canvas.left,
        y: cropBox.top - canvas.top,
        width: cropBox.width,
        height: cropBox.height
      };

      ratio = image.width / image.naturalWidth;

      $.each(data, function (i, n) {
        n /= ratio;
        data[i] = isRounded ? Math.round(n) : n;
      });
    } else {
      data = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    }

    if (options.rotatable) {
      data.rotate = image.rotate || 0;
    }

    if (options.scalable) {
      data.scaleX = image.scaleX || 1;
      data.scaleY = image.scaleY || 1;
    }

    return data;
  },


  /**
   * Set the cropped area position and size with new data
   *
   * @param {Object} data
   */
  setData: function setData(data) {
    var self = this;
    var options = self.options;
    var image = self.image;
    var canvas = self.canvas;
    var cropBoxData = {};
    var rotated = void 0;
    var isScaled = void 0;
    var ratio = void 0;

    if ($.isFunction(data)) {
      data = data.call(self.element);
    }

    if (self.ready && !self.disabled && $.isPlainObject(data)) {
      if (options.rotatable) {
        if (isNumber(data.rotate) && data.rotate !== image.rotate) {
          image.rotate = data.rotate;
          self.rotated = rotated = true;
        }
      }

      if (options.scalable) {
        if (isNumber(data.scaleX) && data.scaleX !== image.scaleX) {
          image.scaleX = data.scaleX;
          isScaled = true;
        }

        if (isNumber(data.scaleY) && data.scaleY !== image.scaleY) {
          image.scaleY = data.scaleY;
          isScaled = true;
        }
      }

      if (rotated) {
        self.renderCanvas();
      } else if (isScaled) {
        self.renderImage();
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

      self.setCropBoxData(cropBoxData);
    }
  },


  /**
   * Get the container size data
   *
   * @return {Object} data
   */
  getContainerData: function getContainerData() {
    return this.ready ? this.container : {};
  },


  /**
   * Get the image position and size data
   *
   * @return {Object} data
   */
  getImageData: function getImageData() {
    return this.loaded ? this.image : {};
  },


  /**
   * Get the canvas position and size data
   *
   * @return {Object} data
   */
  getCanvasData: function getCanvasData() {
    var self = this;
    var canvas = self.canvas;
    var data = {};

    if (self.ready) {
      $.each(['left', 'top', 'width', 'height', 'naturalWidth', 'naturalHeight'], function (i, n) {
        data[n] = canvas[n];
      });
    }

    return data;
  },


  /**
   * Set the canvas position and size with new data
   *
   * @param {Object} data
   */
  setCanvasData: function setCanvasData(data) {
    var self = this;
    var canvas = self.canvas;
    var aspectRatio = canvas.aspectRatio;

    if ($.isFunction(data)) {
      data = data.call(self.$element);
    }

    if (self.ready && !self.disabled && $.isPlainObject(data)) {
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

      self.renderCanvas(true);
    }
  },


  /**
   * Get the crop box position and size data
   *
   * @return {Object} data
   */
  getCropBoxData: function getCropBoxData() {
    var self = this;
    var cropBox = self.cropBox;

    return self.ready && self.cropped ? {
      left: cropBox.left,
      top: cropBox.top,
      width: cropBox.width,
      height: cropBox.height
    } : {};
  },


  /**
   * Set the crop box position and size with new data
   *
   * @param {Object} data
   */
  setCropBoxData: function setCropBoxData(data) {
    var self = this;
    var cropBox = self.cropBox;
    var aspectRatio = self.options.aspectRatio;
    var widthChanged = void 0;
    var heightChanged = void 0;

    if ($.isFunction(data)) {
      data = data.call(self.$element);
    }

    if (self.ready && self.cropped && !self.disabled && $.isPlainObject(data)) {
      if (isNumber(data.left)) {
        cropBox.left = data.left;
      }

      if (isNumber(data.top)) {
        cropBox.top = data.top;
      }

      if (isNumber(data.width) && data.width !== cropBox.width) {
        widthChanged = true;
        cropBox.width = data.width;
      }

      if (isNumber(data.height) && data.height !== cropBox.height) {
        heightChanged = true;
        cropBox.height = data.height;
      }

      if (aspectRatio) {
        if (widthChanged) {
          cropBox.height = cropBox.width / aspectRatio;
        } else if (heightChanged) {
          cropBox.width = cropBox.height * aspectRatio;
        }
      }

      self.renderCropBox();
    }
  },


  /**
   * Get a canvas drawn the cropped image
   *
   * @param {Object} options (optional)
   * @return {HTMLCanvasElement} canvas
   */
  getCroppedCanvas: function getCroppedCanvas(options) {
    var self = this;

    if (!self.ready || !window.HTMLCanvasElement) {
      return null;
    }

    if (!$.isPlainObject(options)) {
      options = {};
    }

    if (!self.cropped) {
      return getSourceCanvas(self.$clone[0], self.image, options);
    }

    var data = self.getData();
    var originalWidth = data.width;
    var originalHeight = data.height;
    var aspectRatio = originalWidth / originalHeight;
    var scaledWidth = void 0;
    var scaledHeight = void 0;
    var scaledRatio = void 0;

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

    // The canvas element will use `Math.Math.floor` on a float number, so Math.floor first
    var canvasWidth = Math.floor(scaledWidth || originalWidth);
    var canvasHeight = Math.floor(scaledHeight || originalHeight);

    var canvas = $('<canvas>')[0];
    var context = canvas.getContext('2d');

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    if (options.fillColor) {
      context.fillStyle = options.fillColor;
      context.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
    var parameters = function () {
      var source = getSourceCanvas(self.$clone[0], self.image, options);
      var sourceWidth = source.width;
      var sourceHeight = source.height;
      var canvasData = self.canvas;
      var params = [source];

      // Source canvas
      var srcX = data.x + canvasData.naturalWidth * (Math.abs(data.scaleX || 1) - 1) / 2;
      var srcY = data.y + canvasData.naturalHeight * (Math.abs(data.scaleY || 1) - 1) / 2;
      var srcWidth = void 0;
      var srcHeight = void 0;

      // Destination canvas
      var dstX = void 0;
      var dstY = void 0;
      var dstWidth = void 0;
      var dstHeight = void 0;

      if (srcX <= -originalWidth || srcX > sourceWidth) {
        srcX = srcWidth = dstX = dstWidth = 0;
      } else if (srcX <= 0) {
        dstX = -srcX;
        srcX = 0;
        srcWidth = dstWidth = Math.min(sourceWidth, originalWidth + srcX);
      } else if (srcX <= sourceWidth) {
        dstX = 0;
        srcWidth = dstWidth = Math.min(originalWidth, sourceWidth - srcX);
      }

      if (srcWidth <= 0 || srcY <= -originalHeight || srcY > sourceHeight) {
        srcY = srcHeight = dstY = dstHeight = 0;
      } else if (srcY <= 0) {
        dstY = -srcY;
        srcY = 0;
        srcHeight = dstHeight = Math.min(sourceHeight, originalHeight + srcY);
      } else if (srcY <= sourceHeight) {
        dstY = 0;
        srcHeight = dstHeight = Math.min(originalHeight, sourceHeight - srcY);
      }

      // All the numerical parameters should be integer for `drawImage` (#476)
      params.push(Math.floor(srcX), Math.floor(srcY), Math.floor(srcWidth), Math.floor(srcHeight));

      // Scale destination sizes
      if (scaledRatio) {
        dstX *= scaledRatio;
        dstY *= scaledRatio;
        dstWidth *= scaledRatio;
        dstHeight *= scaledRatio;
      }

      // Avoid "IndexSizeError" in IE and Firefox
      if (dstWidth > 0 && dstHeight > 0) {
        params.push(Math.floor(dstX), Math.floor(dstY), Math.floor(dstWidth), Math.floor(dstHeight));
      }

      return params;
    }();

    context.imageSmoothingEnabled = !!options.imageSmoothingEnabled;

    if (options.imageSmoothingQuality) {
      context.imageSmoothingQuality = options.imageSmoothingQuality;
    }

    context.drawImage.apply(context, toConsumableArray(parameters));

    return canvas;
  },


  /**
   * Change the aspect ratio of the crop box
   *
   * @param {Number} aspectRatio
   */
  setAspectRatio: function setAspectRatio(aspectRatio) {
    var self = this;
    var options = self.options;

    if (!self.disabled && !isUndefined(aspectRatio)) {
      // 0 -> NaN
      options.aspectRatio = Math.max(0, aspectRatio) || NaN;

      if (self.ready) {
        self.initCropBox();

        if (self.cropped) {
          self.renderCropBox();
        }
      }
    }
  },


  /**
   * Change the drag mode
   *
   * @param {String} mode (optional)
   */
  setDragMode: function setDragMode(mode) {
    var self = this;
    var options = self.options;
    var croppable = void 0;
    var movable = void 0;

    if (self.loaded && !self.disabled) {
      croppable = mode === 'crop';
      movable = options.movable && mode === 'move';
      mode = croppable || movable ? mode : 'none';

      self.$dragBox.data('action', mode).toggleClass('cropper-crop', croppable).toggleClass('cropper-move', movable);

      if (!options.cropBoxMovable) {
        // Sync drag mode to crop box when it is not movable(#300)
        self.$face.data('action', mode).toggleClass('cropper-crop', croppable).toggleClass('cropper-move', movable);
      }
    }
  }
};

var CLASS_HIDDEN = 'cropper-hidden';
var REGEXP_DATA_URL = /^data:/;
var REGEXP_DATA_URL_JPEG = /^data:image\/jpeg;base64,/;

var Cropper = function () {
  function Cropper(element, options) {
    classCallCheck(this, Cropper);

    var self = this;

    self.$element = $(element);
    self.options = $.extend({}, DEFAULTS, $.isPlainObject(options) && options);
    self.loaded = false;
    self.ready = false;
    self.completed = false;
    self.rotated = false;
    self.cropped = false;
    self.disabled = false;
    self.replaced = false;
    self.limited = false;
    self.wheeling = false;
    self.isImg = false;
    self.originalUrl = '';
    self.canvas = null;
    self.cropBox = null;
    self.pointers = {};
    self.init();
  }

  createClass(Cropper, [{
    key: 'init',
    value: function init() {
      var self = this;
      var $this = self.$element;
      var url = void 0;

      if ($this.is('img')) {
        self.isImg = true;

        // Should use `$.fn.attr` here. e.g.: "img/picture.jpg"
        self.originalUrl = url = $this.attr('src');

        // Stop when it's a blank image
        if (!url) {
          return;
        }

        // Should use `$.fn.prop` here. e.g.: "http://example.com/img/picture.jpg"
        url = $this.prop('src');
      } else if ($this.is('canvas') && window.HTMLCanvasElement) {
        url = $this[0].toDataURL();
      }

      self.load(url);
    }

    // A shortcut for triggering custom events

  }, {
    key: 'trigger',
    value: function trigger(type, data) {
      var e = $.Event(type, data);

      this.$element.trigger(e);

      return e;
    }
  }, {
    key: 'load',
    value: function load(url) {
      var self = this;
      var options = self.options;
      var $this = self.$element;

      if (!url) {
        return;
      }

      self.url = url;
      self.image = {};

      if (!options.checkOrientation || !window.ArrayBuffer) {
        self.clone();
        return;
      }

      // XMLHttpRequest disallows to open a Data URL in some browsers like IE11 and Safari
      if (REGEXP_DATA_URL.test(url)) {
        if (REGEXP_DATA_URL_JPEG.test(url)) {
          self.read(dataURLToArrayBuffer(url));
        } else {
          self.clone();
        }
        return;
      }

      var xhr = new XMLHttpRequest();

      xhr.onerror = xhr.onabort = $.proxy(function () {
        self.clone();
      }, this);

      xhr.onload = function load() {
        self.read(this.response);
      };

      if (options.checkCrossOrigin && isCrossOriginURL(url) && $this.prop('crossOrigin')) {
        url = addTimestamp(url);
      }

      xhr.open('get', url);
      xhr.responseType = 'arraybuffer';
      xhr.withCredentials = $this.prop('crossOrigin') === 'use-credentials';
      xhr.send();
    }
  }, {
    key: 'read',
    value: function read(arrayBuffer) {
      var self = this;
      var options = self.options;
      var orientation = getOrientation(arrayBuffer);
      var image = self.image;
      var rotate = 0;
      var scaleX = 1;
      var scaleY = 1;

      if (orientation > 1) {
        self.url = arrayBufferToDataURL(arrayBuffer);

        switch (orientation) {

          // flip horizontal
          case 2:
            scaleX = -1;
            break;

          // rotate left 180°
          case 3:
            rotate = -180;
            break;

          // flip vertical
          case 4:
            scaleY = -1;
            break;

          // flip vertical + rotate right 90°
          case 5:
            rotate = 90;
            scaleY = -1;
            break;

          // rotate right 90°
          case 6:
            rotate = 90;
            break;

          // flip horizontal + rotate right 90°
          case 7:
            rotate = 90;
            scaleX = -1;
            break;

          // rotate left 90°
          case 8:
            rotate = -90;
            break;
        }
      }

      if (options.rotatable) {
        image.rotate = rotate;
      }

      if (options.scalable) {
        image.scaleX = scaleX;
        image.scaleY = scaleY;
      }

      self.clone();
    }
  }, {
    key: 'clone',
    value: function clone() {
      var self = this;
      var options = self.options;
      var $this = self.$element;
      var url = self.url;
      var crossOrigin = '';
      var crossOriginUrl = void 0;

      if (options.checkCrossOrigin && isCrossOriginURL(url)) {
        crossOrigin = $this.prop('crossOrigin');

        if (crossOrigin) {
          crossOriginUrl = url;
        } else {
          crossOrigin = 'anonymous';

          // Bust cache (#148) when there is not a "crossOrigin" property
          crossOriginUrl = addTimestamp(url);
        }
      }

      self.crossOrigin = crossOrigin;
      self.crossOriginUrl = crossOriginUrl;

      var image = document.createElement('img');

      if (crossOrigin) {
        image.crossOrigin = crossOrigin;
      }

      image.src = crossOriginUrl || url;

      var $clone = $(image);

      self.$clone = $clone;

      if (self.isImg) {
        if ($this[0].complete) {
          self.start();
        } else {
          $this.one('load', $.proxy(self.start, this));
        }
      } else {
        $clone.one('load', $.proxy(self.start, this)).one('error', $.proxy(self.stop, this)).addClass('cropper-hide').insertAfter($this);
      }
    }
  }, {
    key: 'start',
    value: function start() {
      var self = this;
      var $clone = self.$clone;
      var $image = self.$element;

      if (!self.isImg) {
        $clone.off('error', self.stop);
        $image = $clone;
      }

      getImageSize($image[0], function (naturalWidth, naturalHeight) {
        $.extend(self.image, {
          naturalWidth: naturalWidth,
          naturalHeight: naturalHeight,
          aspectRatio: naturalWidth / naturalHeight
        });

        self.loaded = true;
        self.build();
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      var self = this;

      self.$clone.remove();
      self.$clone = null;
    }
  }, {
    key: 'build',
    value: function build() {
      var self = this;
      var options = self.options;
      var $this = self.$element;
      var $clone = self.$clone;
      var $cropper = void 0;
      var $cropBox = void 0;
      var $face = void 0;

      if (!self.loaded) {
        return;
      }

      // Unbuild first when replace
      if (self.ready) {
        self.unbuild();
      }

      // Create cropper elements
      self.$container = $this.parent();
      self.$cropper = $cropper = $(TEMPLATE);
      self.$canvas = $cropper.find('.cropper-canvas').append($clone);
      self.$dragBox = $cropper.find('.cropper-drag-box');
      self.$cropBox = $cropBox = $cropper.find('.cropper-crop-box');
      self.$viewBox = $cropper.find('.cropper-view-box');
      self.$face = $face = $cropBox.find('.cropper-face');

      // Hide the original image
      $this.addClass(CLASS_HIDDEN).after($cropper);

      // Show the clone image if is hidden
      if (!self.isImg) {
        $clone.removeClass('cropper-hide');
      }

      self.initPreview();
      self.bind();

      options.aspectRatio = Math.max(0, options.aspectRatio) || NaN;
      options.viewMode = Math.max(0, Math.min(3, Math.round(options.viewMode))) || 0;

      self.cropped = options.autoCrop;

      if (options.autoCrop) {
        if (options.modal) {
          self.$dragBox.addClass('cropper-modal');
        }
      } else {
        $cropBox.addClass(CLASS_HIDDEN);
      }

      if (!options.guides) {
        $cropBox.find('.cropper-dashed').addClass(CLASS_HIDDEN);
      }

      if (!options.center) {
        $cropBox.find('.cropper-center').addClass(CLASS_HIDDEN);
      }

      if (options.cropBoxMovable) {
        $face.addClass('cropper-move').data('action', 'all');
      }

      if (!options.highlight) {
        $face.addClass('cropper-invisible');
      }

      if (options.background) {
        $cropper.addClass('cropper-bg');
      }

      if (!options.cropBoxResizable) {
        $cropBox.find('.cropper-line, .cropper-point').addClass(CLASS_HIDDEN);
      }

      self.setDragMode(options.dragMode);
      self.render();
      self.ready = true;
      self.setData(options.data);

      // Trigger the ready event asynchronously to keep `data('cropper')` is defined
      self.completing = setTimeout(function () {
        if ($.isFunction(options.ready)) {
          $this.one('ready', options.ready);
        }

        self.trigger('ready');
        self.trigger('crop', self.getData());
        self.completed = true;
      }, 0);
    }
  }, {
    key: 'unbuild',
    value: function unbuild() {
      var self = this;

      if (!self.ready) {
        return;
      }

      if (!self.completed) {
        clearTimeout(self.completing);
      }

      self.ready = false;
      self.completed = false;
      self.initialImage = null;

      // Clear `initialCanvas` is necessary when replace
      self.initialCanvas = null;
      self.initialCropBox = null;
      self.container = null;
      self.canvas = null;

      // Clear `cropBox` is necessary when replace
      self.cropBox = null;
      self.unbind();

      self.resetPreview();
      self.$preview = null;

      self.$viewBox = null;
      self.$cropBox = null;
      self.$dragBox = null;
      self.$canvas = null;
      self.$container = null;

      self.$cropper.remove();
      self.$cropper = null;
    }
  }], [{
    key: 'setDefaults',
    value: function setDefaults(options) {
      $.extend(DEFAULTS, $.isPlainObject(options) && options);
    }
  }]);
  return Cropper;
}();

$.extend(Cropper.prototype, render$1);
$.extend(Cropper.prototype, preview$1);
$.extend(Cropper.prototype, events);
$.extend(Cropper.prototype, handlers);
$.extend(Cropper.prototype, change$1);
$.extend(Cropper.prototype, methods);

var NAMESPACE = 'cropper';
var OtherCropper = $.fn.cropper;

$.fn.cropper = function jQueryCropper(option) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var result = void 0;

  this.each(function (i, element) {
    var $this = $(element);
    var data = $this.data(NAMESPACE);

    if (!data) {
      if (/destroy/.test(option)) {
        return;
      }

      var options = $.extend({}, $this.data(), $.isPlainObject(option) && option);
      $this.data(NAMESPACE, data = new Cropper(element, options));
    }

    if (typeof option === 'string') {
      var fn = data[option];

      if ($.isFunction(fn)) {
        result = fn.apply(data, args);
      }
    }
  });

  return typeof result !== 'undefined' ? result : this;
};

$.fn.cropper.Constructor = Cropper;
$.fn.cropper.setDefaults = Cropper.setDefaults;

// No conflict
$.fn.cropper.noConflict = function noConflict() {
  $.fn.cropper = OtherCropper;
  return this;
};

})));
