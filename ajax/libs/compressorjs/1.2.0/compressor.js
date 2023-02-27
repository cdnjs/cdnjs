/*!
 * Compressor.js v1.2.0
 * https://fengyuanchen.github.io/compressorjs
 *
 * Copyright 2018-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2023-02-25T11:35:56.625Z
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Compressor = factory());
})(this, (function () { 'use strict';

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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
    return _extends.apply(this, arguments);
  }

  var canvasToBlob = {exports: {}};

  /*
   * JavaScript Canvas to Blob
   * https://github.com/blueimp/JavaScript-Canvas-to-Blob
   *
   * Copyright 2012, Sebastian Tschan
   * https://blueimp.net
   *
   * Licensed under the MIT license:
   * https://opensource.org/licenses/MIT
   *
   * Based on stackoverflow user Stoive's code snippet:
   * http://stackoverflow.com/q/4998908
   */
  (function (module) {
  if (typeof window === 'undefined') {
    return;
  }
    (function (window) {

      var CanvasPrototype = window.HTMLCanvasElement && window.HTMLCanvasElement.prototype;
      var hasBlobConstructor = window.Blob && function () {
        try {
          return Boolean(new Blob());
        } catch (e) {
          return false;
        }
      }();
      var hasArrayBufferViewSupport = hasBlobConstructor && window.Uint8Array && function () {
        try {
          return new Blob([new Uint8Array(100)]).size === 100;
        } catch (e) {
          return false;
        }
      }();
      var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
      var dataURIPattern = /^data:((.*?)(;charset=.*?)?)(;base64)?,/;
      var dataURLtoBlob = (hasBlobConstructor || BlobBuilder) && window.atob && window.ArrayBuffer && window.Uint8Array && function (dataURI) {
        var matches, mediaType, isBase64, dataString, byteString, arrayBuffer, intArray, i, bb;
        // Parse the dataURI components as per RFC 2397
        matches = dataURI.match(dataURIPattern);
        if (!matches) {
          throw new Error('invalid data URI');
        }
        // Default to text/plain;charset=US-ASCII
        mediaType = matches[2] ? matches[1] : 'text/plain' + (matches[3] || ';charset=US-ASCII');
        isBase64 = !!matches[4];
        dataString = dataURI.slice(matches[0].length);
        if (isBase64) {
          // Convert base64 to raw binary data held in a string:
          byteString = atob(dataString);
        } else {
          // Convert base64/URLEncoded data component to raw binary:
          byteString = decodeURIComponent(dataString);
        }
        // Write the bytes of the string to an ArrayBuffer:
        arrayBuffer = new ArrayBuffer(byteString.length);
        intArray = new Uint8Array(arrayBuffer);
        for (i = 0; i < byteString.length; i += 1) {
          intArray[i] = byteString.charCodeAt(i);
        }
        // Write the ArrayBuffer (or ArrayBufferView) to a blob:
        if (hasBlobConstructor) {
          return new Blob([hasArrayBufferViewSupport ? intArray : arrayBuffer], {
            type: mediaType
          });
        }
        bb = new BlobBuilder();
        bb.append(arrayBuffer);
        return bb.getBlob(mediaType);
      };
      if (window.HTMLCanvasElement && !CanvasPrototype.toBlob) {
        if (CanvasPrototype.mozGetAsFile) {
          CanvasPrototype.toBlob = function (callback, type, quality) {
            var self = this;
            setTimeout(function () {
              if (quality && CanvasPrototype.toDataURL && dataURLtoBlob) {
                callback(dataURLtoBlob(self.toDataURL(type, quality)));
              } else {
                callback(self.mozGetAsFile('blob', type));
              }
            });
          };
        } else if (CanvasPrototype.toDataURL && dataURLtoBlob) {
          if (CanvasPrototype.msToBlob) {
            CanvasPrototype.toBlob = function (callback, type, quality) {
              var self = this;
              setTimeout(function () {
                if ((type && type !== 'image/png' || quality) && CanvasPrototype.toDataURL && dataURLtoBlob) {
                  callback(dataURLtoBlob(self.toDataURL(type, quality)));
                } else {
                  callback(self.msToBlob(type));
                }
              });
            };
          } else {
            CanvasPrototype.toBlob = function (callback, type, quality) {
              var self = this;
              setTimeout(function () {
                callback(dataURLtoBlob(self.toDataURL(type, quality)));
              });
            };
          }
        }
      }
      if (module.exports) {
        module.exports = dataURLtoBlob;
      } else {
        window.dataURLtoBlob = dataURLtoBlob;
      }
    })(window);
  })(canvasToBlob);
  var toBlob = canvasToBlob.exports;

  var isBlob = value => {
    if (typeof Blob === 'undefined') {
      return false;
    }
    return value instanceof Blob || Object.prototype.toString.call(value) === '[object Blob]';
  };

  var DEFAULTS = {
    /**
     * Indicates if output the original image instead of the compressed one
     * when the size of the compressed image is greater than the original one's
     * @type {boolean}
     */
    strict: true,
    /**
     * Indicates if read the image's Exif Orientation information,
     * and then rotate or flip the image automatically.
     * @type {boolean}
     */
    checkOrientation: true,
    /**
     * Indicates if retain the image's Exif information after compressed.
     * @type {boolean}
    */
    retainExif: false,
    /**
     * The max width of the output image.
     * @type {number}
     */
    maxWidth: Infinity,
    /**
     * The max height of the output image.
     * @type {number}
     */
    maxHeight: Infinity,
    /**
     * The min width of the output image.
     * @type {number}
     */
    minWidth: 0,
    /**
     * The min height of the output image.
     * @type {number}
     */
    minHeight: 0,
    /**
     * The width of the output image.
     * If not specified, the natural width of the source image will be used.
     * @type {number}
     */
    width: undefined,
    /**
     * The height of the output image.
     * If not specified, the natural height of the source image will be used.
     * @type {number}
     */
    height: undefined,
    /**
     * Sets how the size of the image should be resized to the container
     * specified by the `width` and `height` options.
     * @type {string}
     */
    resize: 'none',
    /**
     * The quality of the output image.
     * It must be a number between `0` and `1`,
     * and only available for `image/jpeg` and `image/webp` images.
     * Check out {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob canvas.toBlob}.
     * @type {number}
     */
    quality: 0.8,
    /**
     * The mime type of the output image.
     * By default, the original mime type of the source image file will be used.
     * @type {string}
     */
    mimeType: 'auto',
    /**
     * Files whose file type is included in this list,
     * and whose file size exceeds the `convertSize` value will be converted to JPEGs.
     * @type {string｜Array}
     */
    convertTypes: ['image/png'],
    /**
     * PNG files over this size (5 MB by default) will be converted to JPEGs.
     * To disable this, just set the value to `Infinity`.
     * @type {number}
     */
    convertSize: 5000000,
    /**
     * The hook function to execute before draw the image into the canvas for compression.
     * @type {Function}
     * @param {CanvasRenderingContext2D} context - The 2d rendering context of the canvas.
     * @param {HTMLCanvasElement} canvas - The canvas for compression.
     * @example
     * function (context, canvas) {
     *   context.fillStyle = '#fff';
     * }
     */
    beforeDraw: null,
    /**
     * The hook function to execute after drew the image into the canvas for compression.
     * @type {Function}
     * @param {CanvasRenderingContext2D} context - The 2d rendering context of the canvas.
     * @param {HTMLCanvasElement} canvas - The canvas for compression.
     * @example
     * function (context, canvas) {
     *   context.filter = 'grayscale(100%)';
     * }
     */
    drew: null,
    /**
     * The hook function to execute when success to compress the image.
     * @type {Function}
     * @param {File} file - The compressed image File object.
     * @example
     * function (file) {
     *   console.log(file);
     * }
     */
    success: null,
    /**
     * The hook function to execute when fail to compress the image.
     * @type {Function}
     * @param {Error} err - An Error object.
     * @example
     * function (err) {
     *   console.log(err.message);
     * }
     */
    error: null
  };

  const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
  const WINDOW = IS_BROWSER ? window : {};

  /**
   * Check if the given value is a positive number.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a positive number, else `false`.
   */
  const isPositiveNumber = value => value > 0 && value < Infinity;
  const {
    slice
  } = Array.prototype;

  /**
   * Convert array-like or iterable object to an array.
   * @param {*} value - The value to convert.
   * @returns {Array} Returns a new array.
   */
  function toArray(value) {
    return Array.from ? Array.from(value) : slice.call(value);
  }
  const REGEXP_IMAGE_TYPE = /^image\/.+$/;

  /**
   * Check if the given value is a mime type of image.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given is a mime type of image, else `false`.
   */
  function isImageType(value) {
    return REGEXP_IMAGE_TYPE.test(value);
  }

  /**
   * Convert image type to extension.
   * @param {string} value - The image type to convert.
   * @returns {boolean} Returns the image extension.
   */
  function imageTypeToExtension(value) {
    let extension = isImageType(value) ? value.substr(6) : '';
    if (extension === 'jpeg') {
      extension = 'jpg';
    }
    return `.${extension}`;
  }
  const {
    fromCharCode
  } = String;

  /**
   * Get string from char code in data view.
   * @param {DataView} dataView - The data view for read.
   * @param {number} start - The start index.
   * @param {number} length - The read length.
   * @returns {string} The read result.
   */
  function getStringFromCharCode(dataView, start, length) {
    let str = '';
    let i;
    length += start;
    for (i = start; i < length; i += 1) {
      str += fromCharCode(dataView.getUint8(i));
    }
    return str;
  }
  const {
    btoa
  } = WINDOW;

  /**
   * Transform array buffer to Data URL.
   * @param {ArrayBuffer} arrayBuffer - The array buffer to transform.
   * @param {string} mimeType - The mime type of the Data URL.
   * @returns {string} The result Data URL.
   */
  function arrayBufferToDataURL(arrayBuffer, mimeType) {
    const chunks = [];
    const chunkSize = 8192;
    let uint8 = new Uint8Array(arrayBuffer);
    while (uint8.length > 0) {
      // XXX: Babel's `toConsumableArray` helper will throw error in IE or Safari 9
      // eslint-disable-next-line prefer-spread
      chunks.push(fromCharCode.apply(null, toArray(uint8.subarray(0, chunkSize))));
      uint8 = uint8.subarray(chunkSize);
    }
    return `data:${mimeType};base64,${btoa(chunks.join(''))}`;
  }

  /**
   * Get orientation value from given array buffer.
   * @param {ArrayBuffer} arrayBuffer - The array buffer to read.
   * @returns {number} The read orientation value.
   */
  function resetAndGetOrientation(arrayBuffer) {
    const dataView = new DataView(arrayBuffer);
    let orientation;

    // Ignores range error when the image does not have correct Exif information
    try {
      let littleEndian;
      let app1Start;
      let ifdStart;

      // Only handle JPEG image (start by 0xFFD8)
      if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
        const length = dataView.byteLength;
        let offset = 2;
        while (offset + 1 < length) {
          if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
            app1Start = offset;
            break;
          }
          offset += 1;
        }
      }
      if (app1Start) {
        const exifIDCode = app1Start + 4;
        const tiffOffset = app1Start + 10;
        if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
          const endianness = dataView.getUint16(tiffOffset);
          littleEndian = endianness === 0x4949;
          if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
            if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
              const firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
              if (firstIFDOffset >= 0x00000008) {
                ifdStart = tiffOffset + firstIFDOffset;
              }
            }
          }
        }
      }
      if (ifdStart) {
        const length = dataView.getUint16(ifdStart, littleEndian);
        let offset;
        let i;
        for (i = 0; i < length; i += 1) {
          offset = ifdStart + i * 12 + 2;
          if (dataView.getUint16(offset, littleEndian) === 0x0112 /* Orientation */) {
            // 8 is the offset of the current tag's value
            offset += 8;

            // Get the original orientation value
            orientation = dataView.getUint16(offset, littleEndian);

            // Override the orientation with its default value
            dataView.setUint16(offset, 1, littleEndian);
            break;
          }
        }
      }
    } catch (e) {
      orientation = 1;
    }
    return orientation;
  }

  /**
   * Parse Exif Orientation value.
   * @param {number} orientation - The orientation to parse.
   * @returns {Object} The parsed result.
   */
  function parseOrientation(orientation) {
    let rotate = 0;
    let scaleX = 1;
    let scaleY = 1;
    switch (orientation) {
      // Flip horizontal
      case 2:
        scaleX = -1;
        break;

      // Rotate left 180°
      case 3:
        rotate = -180;
        break;

      // Flip vertical
      case 4:
        scaleY = -1;
        break;

      // Flip vertical and rotate right 90°
      case 5:
        rotate = 90;
        scaleY = -1;
        break;

      // Rotate right 90°
      case 6:
        rotate = 90;
        break;

      // Flip horizontal and rotate right 90°
      case 7:
        rotate = 90;
        scaleX = -1;
        break;

      // Rotate left 90°
      case 8:
        rotate = -90;
        break;
    }
    return {
      rotate,
      scaleX,
      scaleY
    };
  }
  const REGEXP_DECIMALS = /\.\d*(?:0|9){12}\d*$/;

  /**
   * Normalize decimal number.
   * Check out {@link https://0.30000000000000004.com/}
   * @param {number} value - The value to normalize.
   * @param {number} [times=100000000000] - The times for normalizing.
   * @returns {number} Returns the normalized number.
   */
  function normalizeDecimalNumber(value) {
    let times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100000000000;
    return REGEXP_DECIMALS.test(value) ? Math.round(value * times) / times : value;
  }

  /**
   * Get the max sizes in a rectangle under the given aspect ratio.
   * @param {Object} data - The original sizes.
   * @param {string} [type='contain'] - The adjust type.
   * @returns {Object} The result sizes.
   */
  function getAdjustedSizes(_ref) {
    let {
      aspectRatio,
      height,
      width
    } = _ref;
    let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
    const isValidWidth = isPositiveNumber(width);
    const isValidHeight = isPositiveNumber(height);
    if (isValidWidth && isValidHeight) {
      const adjustedWidth = height * aspectRatio;
      if ((type === 'contain' || type === 'none') && adjustedWidth > width || type === 'cover' && adjustedWidth < width) {
        height = width / aspectRatio;
      } else {
        width = height * aspectRatio;
      }
    } else if (isValidWidth) {
      height = width / aspectRatio;
    } else if (isValidHeight) {
      width = height * aspectRatio;
    }
    return {
      width,
      height
    };
  }

  /**
   * Get Exif information from the given array buffer.
   * @param {ArrayBuffer} arrayBuffer - The array buffer to read.
   * @returns {Array} The read Exif information.
   */
  function getExif(arrayBuffer) {
    const array = toArray(new Uint8Array(arrayBuffer));
    const {
      length
    } = array;
    const segments = [];
    let start = 0;
    while (start + 3 < length) {
      const value = array[start];
      const next = array[start + 1];

      // SOS (Start of Scan)
      if (value === 0xFF && next === 0xDA) {
        break;
      }

      // SOI (Start of Image)
      if (value === 0xFF && next === 0xD8) {
        start += 2;
      } else {
        const offset = array[start + 2] * 256 + array[start + 3];
        const end = start + offset + 2;
        const segment = array.slice(start, end);
        segments.push(segment);
        start = end;
      }
    }
    return segments.reduce((exifArray, current) => {
      if (current[0] === 0xFF && current[1] === 0xE1) {
        return exifArray.concat(current);
      }
      return exifArray;
    }, []);
  }

  /**
   * Insert Exif information into the given array buffer.
   * @param {ArrayBuffer} arrayBuffer - The array buffer to transform.
   * @param {Array} exifArray - The Exif information to insert.
   * @returns {ArrayBuffer} The transformed array buffer.
   */
  function insertExif(arrayBuffer, exifArray) {
    const array = toArray(new Uint8Array(arrayBuffer));
    if (array[2] !== 0xFF || array[3] !== 0xE0) {
      return arrayBuffer;
    }
    const app0Length = array[4] * 256 + array[5];
    const newArrayBuffer = [0xFF, 0xD8].concat(exifArray, array.slice(4 + app0Length));
    return new Uint8Array(newArrayBuffer);
  }

  const {
    ArrayBuffer: ArrayBuffer$1,
    FileReader
  } = WINDOW;
  const URL = WINDOW.URL || WINDOW.webkitURL;
  const REGEXP_EXTENSION = /\.\w+$/;
  const AnotherCompressor = WINDOW.Compressor;

  /**
   * Creates a new image compressor.
   * @class
   */
  class Compressor {
    /**
     * The constructor of Compressor.
     * @param {File|Blob} file - The target image file for compressing.
     * @param {Object} [options] - The options for compressing.
     */
    constructor(file, options) {
      this.file = file;
      this.exif = [];
      this.image = new Image();
      this.options = {
        ...DEFAULTS,
        ...options
      };
      this.aborted = false;
      this.result = null;
      this.init();
    }
    init() {
      const {
        file,
        options
      } = this;
      if (!isBlob(file)) {
        this.fail(new Error('The first argument must be a File or Blob object.'));
        return;
      }
      const mimeType = file.type;
      if (!isImageType(mimeType)) {
        this.fail(new Error('The first argument must be an image File or Blob object.'));
        return;
      }
      if (!URL || !FileReader) {
        this.fail(new Error('The current browser does not support image compression.'));
        return;
      }
      if (!ArrayBuffer$1) {
        options.checkOrientation = false;
        options.retainExif = false;
      }
      const isJPEGImage = mimeType === 'image/jpeg';
      const checkOrientation = isJPEGImage && options.checkOrientation;
      const retainExif = isJPEGImage && options.retainExif;
      if (URL && !checkOrientation && !retainExif) {
        this.load({
          url: URL.createObjectURL(file)
        });
      } else {
        const reader = new FileReader();
        this.reader = reader;
        reader.onload = _ref => {
          let {
            target
          } = _ref;
          const {
            result
          } = target;
          const data = {};
          let orientation = 1;
          if (checkOrientation) {
            // Reset the orientation value to its default value 1
            // as some iOS browsers will render image with its orientation
            orientation = resetAndGetOrientation(result);
            if (orientation > 1) {
              _extends(data, parseOrientation(orientation));
            }
          }
          if (retainExif) {
            this.exif = getExif(result);
          }
          if (checkOrientation || retainExif) {
            if (!URL

            // Generate a new URL with the default orientation value 1.
            || orientation > 1) {
              data.url = arrayBufferToDataURL(result, mimeType);
            } else {
              data.url = URL.createObjectURL(file);
            }
          } else {
            data.url = result;
          }
          this.load(data);
        };
        reader.onabort = () => {
          this.fail(new Error('Aborted to read the image with FileReader.'));
        };
        reader.onerror = () => {
          this.fail(new Error('Failed to read the image with FileReader.'));
        };
        reader.onloadend = () => {
          this.reader = null;
        };
        if (checkOrientation || retainExif) {
          reader.readAsArrayBuffer(file);
        } else {
          reader.readAsDataURL(file);
        }
      }
    }
    load(data) {
      const {
        file,
        image
      } = this;
      image.onload = () => {
        this.draw({
          ...data,
          naturalWidth: image.naturalWidth,
          naturalHeight: image.naturalHeight
        });
      };
      image.onabort = () => {
        this.fail(new Error('Aborted to load the image.'));
      };
      image.onerror = () => {
        this.fail(new Error('Failed to load the image.'));
      };

      // Match all browsers that use WebKit as the layout engine in iOS devices,
      // such as Safari for iOS, Chrome for iOS, and in-app browsers.
      if (WINDOW.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(WINDOW.navigator.userAgent)) {
        // Fix the `The operation is insecure` error (#57)
        image.crossOrigin = 'anonymous';
      }
      image.alt = file.name;
      image.src = data.url;
    }
    draw(_ref2) {
      let {
        naturalWidth,
        naturalHeight,
        rotate = 0,
        scaleX = 1,
        scaleY = 1
      } = _ref2;
      const {
        file,
        image,
        options
      } = this;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const is90DegreesRotated = Math.abs(rotate) % 180 === 90;
      const resizable = (options.resize === 'contain' || options.resize === 'cover') && isPositiveNumber(options.width) && isPositiveNumber(options.height);
      let maxWidth = Math.max(options.maxWidth, 0) || Infinity;
      let maxHeight = Math.max(options.maxHeight, 0) || Infinity;
      let minWidth = Math.max(options.minWidth, 0) || 0;
      let minHeight = Math.max(options.minHeight, 0) || 0;
      let aspectRatio = naturalWidth / naturalHeight;
      let {
        width,
        height
      } = options;
      if (is90DegreesRotated) {
        [maxWidth, maxHeight] = [maxHeight, maxWidth];
        [minWidth, minHeight] = [minHeight, minWidth];
        [width, height] = [height, width];
      }
      if (resizable) {
        aspectRatio = width / height;
      }
      ({
        width: maxWidth,
        height: maxHeight
      } = getAdjustedSizes({
        aspectRatio,
        width: maxWidth,
        height: maxHeight
      }, 'contain'));
      ({
        width: minWidth,
        height: minHeight
      } = getAdjustedSizes({
        aspectRatio,
        width: minWidth,
        height: minHeight
      }, 'cover'));
      if (resizable) {
        ({
          width,
          height
        } = getAdjustedSizes({
          aspectRatio,
          width,
          height
        }, options.resize));
      } else {
        ({
          width = naturalWidth,
          height = naturalHeight
        } = getAdjustedSizes({
          aspectRatio,
          width,
          height
        }));
      }
      width = Math.floor(normalizeDecimalNumber(Math.min(Math.max(width, minWidth), maxWidth)));
      height = Math.floor(normalizeDecimalNumber(Math.min(Math.max(height, minHeight), maxHeight)));
      const destX = -width / 2;
      const destY = -height / 2;
      const destWidth = width;
      const destHeight = height;
      const params = [];
      if (resizable) {
        let srcX = 0;
        let srcY = 0;
        let srcWidth = naturalWidth;
        let srcHeight = naturalHeight;
        ({
          width: srcWidth,
          height: srcHeight
        } = getAdjustedSizes({
          aspectRatio,
          width: naturalWidth,
          height: naturalHeight
        }, {
          contain: 'cover',
          cover: 'contain'
        }[options.resize]));
        srcX = (naturalWidth - srcWidth) / 2;
        srcY = (naturalHeight - srcHeight) / 2;
        params.push(srcX, srcY, srcWidth, srcHeight);
      }
      params.push(destX, destY, destWidth, destHeight);
      if (is90DegreesRotated) {
        [width, height] = [height, width];
      }
      canvas.width = width;
      canvas.height = height;
      if (!isImageType(options.mimeType)) {
        options.mimeType = file.type;
      }
      let fillStyle = 'transparent';

      // Converts PNG files over the `convertSize` to JPEGs.
      if (file.size > options.convertSize && options.convertTypes.indexOf(options.mimeType) >= 0) {
        options.mimeType = 'image/jpeg';
      }
      const isJPEGImage = options.mimeType === 'image/jpeg';
      if (isJPEGImage) {
        fillStyle = '#fff';
      }

      // Override the default fill color (#000, black)
      context.fillStyle = fillStyle;
      context.fillRect(0, 0, width, height);
      if (options.beforeDraw) {
        options.beforeDraw.call(this, context, canvas);
      }
      if (this.aborted) {
        return;
      }
      context.save();
      context.translate(width / 2, height / 2);
      context.rotate(rotate * Math.PI / 180);
      context.scale(scaleX, scaleY);
      context.drawImage(image, ...params);
      context.restore();
      if (options.drew) {
        options.drew.call(this, context, canvas);
      }
      if (this.aborted) {
        return;
      }
      const callback = blob => {
        if (!this.aborted) {
          const done = result => this.done({
            naturalWidth,
            naturalHeight,
            result
          });
          if (blob && isJPEGImage && options.retainExif && this.exif && this.exif.length > 0) {
            const next = arrayBuffer => done(toBlob(arrayBufferToDataURL(insertExif(arrayBuffer, this.exif), options.mimeType)));
            if (blob.arrayBuffer) {
              blob.arrayBuffer().then(next).catch(() => {
                this.fail(new Error('Failed to read the compressed image with Blob.arrayBuffer().'));
              });
            } else {
              const reader = new FileReader();
              this.reader = reader;
              reader.onload = _ref3 => {
                let {
                  target
                } = _ref3;
                next(target.result);
              };
              reader.onabort = () => {
                this.fail(new Error('Aborted to read the compressed image with FileReader.'));
              };
              reader.onerror = () => {
                this.fail(new Error('Failed to read the compressed image with FileReader.'));
              };
              reader.onloadend = () => {
                this.reader = null;
              };
              reader.readAsArrayBuffer(blob);
            }
          } else {
            done(blob);
          }
        }
      };
      if (canvas.toBlob) {
        canvas.toBlob(callback, options.mimeType, options.quality);
      } else {
        callback(toBlob(canvas.toDataURL(options.mimeType, options.quality)));
      }
    }
    done(_ref4) {
      let {
        naturalWidth,
        naturalHeight,
        result
      } = _ref4;
      const {
        file,
        image,
        options
      } = this;
      if (URL && image.src.indexOf('blob:') === 0) {
        URL.revokeObjectURL(image.src);
      }
      if (result) {
        // Returns original file if the result is greater than it and without size related options
        if (options.strict && !options.retainExif && result.size > file.size && options.mimeType === file.type && !(options.width > naturalWidth || options.height > naturalHeight || options.minWidth > naturalWidth || options.minHeight > naturalHeight || options.maxWidth < naturalWidth || options.maxHeight < naturalHeight)) {
          result = file;
        } else {
          const date = new Date();
          result.lastModified = date.getTime();
          result.lastModifiedDate = date;
          result.name = file.name;

          // Convert the extension to match its type
          if (result.name && result.type !== file.type) {
            result.name = result.name.replace(REGEXP_EXTENSION, imageTypeToExtension(result.type));
          }
        }
      } else {
        // Returns original file if the result is null in some cases.
        result = file;
      }
      this.result = result;
      if (options.success) {
        options.success.call(this, result);
      }
    }
    fail(err) {
      const {
        options
      } = this;
      if (options.error) {
        options.error.call(this, err);
      } else {
        throw err;
      }
    }
    abort() {
      if (!this.aborted) {
        this.aborted = true;
        if (this.reader) {
          this.reader.abort();
        } else if (!this.image.complete) {
          this.image.onload = null;
          this.image.onabort();
        } else {
          this.fail(new Error('The compression process has been aborted.'));
        }
      }
    }

    /**
     * Get the no conflict compressor class.
     * @returns {Compressor} The compressor class.
     */
    static noConflict() {
      window.Compressor = AnotherCompressor;
      return Compressor;
    }

    /**
     * Change the default options.
     * @param {Object} options - The new default options.
     */
    static setDefaults(options) {
      _extends(DEFAULTS, options);
    }
  }

  return Compressor;

}));
