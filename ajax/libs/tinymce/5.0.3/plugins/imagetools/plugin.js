/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.3 (2019-03-19)
 */
(function () {
var imagetools = (function (domGlobals) {
    'use strict';

    var Cell = function (initial) {
      var value = initial;
      var get = function () {
        return value;
      };
      var set = function (v) {
        value = v;
      };
      var clone = function () {
        return Cell(get());
      };
      return {
        get: get,
        set: set,
        clone: clone
      };
    };

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    function create(width, height) {
      return resize(domGlobals.document.createElement('canvas'), width, height);
    }
    function clone(canvas) {
      var tCanvas, ctx;
      tCanvas = create(canvas.width, canvas.height);
      ctx = get2dContext(tCanvas);
      ctx.drawImage(canvas, 0, 0);
      return tCanvas;
    }
    function get2dContext(canvas) {
      return canvas.getContext('2d');
    }
    function get3dContext(canvas) {
      var gl = null;
      try {
        gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      } catch (e) {
      }
      if (!gl) {
        gl = null;
      }
      return gl;
    }
    function resize(canvas, width, height) {
      canvas.width = width;
      canvas.height = height;
      return canvas;
    }
    var Canvas = {
      create: create,
      clone: clone,
      resize: resize,
      get2dContext: get2dContext,
      get3dContext: get3dContext
    };

    function getWidth(image) {
      return image.naturalWidth || image.width;
    }
    function getHeight(image) {
      return image.naturalHeight || image.height;
    }
    var ImageSize = {
      getWidth: getWidth,
      getHeight: getHeight
    };

    var promise = function () {
      var Promise = function (fn) {
        if (typeof this !== 'object')
          throw new TypeError('Promises must be constructed via new');
        if (typeof fn !== 'function')
          throw new TypeError('not a function');
        this._state = null;
        this._value = null;
        this._deferreds = [];
        doResolve(fn, bind(resolve, this), bind(reject, this));
      };
      var asap = Promise.immediateFn || typeof window.setImmediate === 'function' && window.setImmediate || function (fn) {
        domGlobals.setTimeout(fn, 1);
      };
      function bind(fn, thisArg) {
        return function () {
          fn.apply(thisArg, arguments);
        };
      }
      var isArray = Array.isArray || function (value) {
        return Object.prototype.toString.call(value) === '[object Array]';
      };
      function handle(deferred) {
        var me = this;
        if (this._state === null) {
          this._deferreds.push(deferred);
          return;
        }
        asap(function () {
          var cb = me._state ? deferred.onFulfilled : deferred.onRejected;
          if (cb === null) {
            (me._state ? deferred.resolve : deferred.reject)(me._value);
            return;
          }
          var ret;
          try {
            ret = cb(me._value);
          } catch (e) {
            deferred.reject(e);
            return;
          }
          deferred.resolve(ret);
        });
      }
      function resolve(newValue) {
        try {
          if (newValue === this)
            throw new TypeError('A promise cannot be resolved with itself.');
          if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then;
            if (typeof then === 'function') {
              doResolve(bind(then, newValue), bind(resolve, this), bind(reject, this));
              return;
            }
          }
          this._state = true;
          this._value = newValue;
          finale.call(this);
        } catch (e) {
          reject.call(this, e);
        }
      }
      function reject(newValue) {
        this._state = false;
        this._value = newValue;
        finale.call(this);
      }
      function finale() {
        for (var i = 0, len = this._deferreds.length; i < len; i++) {
          handle.call(this, this._deferreds[i]);
        }
        this._deferreds = null;
      }
      function Handler(onFulfilled, onRejected, resolve, reject) {
        this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
        this.onRejected = typeof onRejected === 'function' ? onRejected : null;
        this.resolve = resolve;
        this.reject = reject;
      }
      function doResolve(fn, onFulfilled, onRejected) {
        var done = false;
        try {
          fn(function (value) {
            if (done)
              return;
            done = true;
            onFulfilled(value);
          }, function (reason) {
            if (done)
              return;
            done = true;
            onRejected(reason);
          });
        } catch (ex) {
          if (done)
            return;
          done = true;
          onRejected(ex);
        }
      }
      Promise.prototype['catch'] = function (onRejected) {
        return this.then(null, onRejected);
      };
      Promise.prototype.then = function (onFulfilled, onRejected) {
        var me = this;
        return new Promise(function (resolve, reject) {
          handle.call(me, new Handler(onFulfilled, onRejected, resolve, reject));
        });
      };
      Promise.all = function () {
        var args = Array.prototype.slice.call(arguments.length === 1 && isArray(arguments[0]) ? arguments[0] : arguments);
        return new Promise(function (resolve, reject) {
          if (args.length === 0)
            return resolve([]);
          var remaining = args.length;
          function res(i, val) {
            try {
              if (val && (typeof val === 'object' || typeof val === 'function')) {
                var then = val.then;
                if (typeof then === 'function') {
                  then.call(val, function (val) {
                    res(i, val);
                  }, reject);
                  return;
                }
              }
              args[i] = val;
              if (--remaining === 0) {
                resolve(args);
              }
            } catch (ex) {
              reject(ex);
            }
          }
          for (var i = 0; i < args.length; i++) {
            res(i, args[i]);
          }
        });
      };
      Promise.resolve = function (value) {
        if (value && typeof value === 'object' && value.constructor === Promise) {
          return value;
        }
        return new Promise(function (resolve) {
          resolve(value);
        });
      };
      Promise.reject = function (value) {
        return new Promise(function (resolve, reject) {
          reject(value);
        });
      };
      Promise.race = function (values) {
        return new Promise(function (resolve, reject) {
          for (var i = 0, len = values.length; i < len; i++) {
            values[i].then(resolve, reject);
          }
        });
      };
      return Promise;
    };
    var Promise = window.Promise ? window.Promise : promise();

    var compose = function (fa, fb) {
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return fa(fb.apply(null, args));
      };
    };
    var constant = function (value) {
      return function () {
        return value;
      };
    };
    var never = constant(false);
    var always = constant(true);

    var never$1 = never;
    var always$1 = always;
    var none = function () {
      return NONE;
    };
    var NONE = function () {
      var eq = function (o) {
        return o.isNone();
      };
      var call = function (thunk) {
        return thunk();
      };
      var id = function (n) {
        return n;
      };
      var noop = function () {
      };
      var nul = function () {
        return null;
      };
      var undef = function () {
        return undefined;
      };
      var me = {
        fold: function (n, s) {
          return n();
        },
        is: never$1,
        isSome: never$1,
        isNone: always$1,
        getOr: id,
        getOrThunk: call,
        getOrDie: function (msg) {
          throw new Error(msg || 'error: getOrDie called on none.');
        },
        getOrNull: nul,
        getOrUndefined: undef,
        or: id,
        orThunk: call,
        map: none,
        ap: none,
        each: noop,
        bind: none,
        flatten: none,
        exists: never$1,
        forall: always$1,
        filter: none,
        equals: eq,
        equals_: eq,
        toArray: function () {
          return [];
        },
        toString: constant('none()')
      };
      if (Object.freeze)
        Object.freeze(me);
      return me;
    }();
    var some = function (a) {
      var constant_a = function () {
        return a;
      };
      var self = function () {
        return me;
      };
      var map = function (f) {
        return some(f(a));
      };
      var bind = function (f) {
        return f(a);
      };
      var me = {
        fold: function (n, s) {
          return s(a);
        },
        is: function (v) {
          return a === v;
        },
        isSome: always$1,
        isNone: never$1,
        getOr: constant_a,
        getOrThunk: constant_a,
        getOrDie: constant_a,
        getOrNull: constant_a,
        getOrUndefined: constant_a,
        or: self,
        orThunk: self,
        map: map,
        ap: function (optfab) {
          return optfab.fold(none, function (fab) {
            return some(fab(a));
          });
        },
        each: function (f) {
          f(a);
        },
        bind: bind,
        flatten: constant_a,
        exists: bind,
        forall: bind,
        filter: function (f) {
          return f(a) ? me : NONE;
        },
        equals: function (o) {
          return o.is(a);
        },
        equals_: function (o, elementEq) {
          return o.fold(never$1, function (b) {
            return elementEq(a, b);
          });
        },
        toArray: function () {
          return [a];
        },
        toString: function () {
          return 'some(' + a + ')';
        }
      };
      return me;
    };
    var from = function (value) {
      return value === null || value === undefined ? NONE : some(value);
    };
    var Option = {
      some: some,
      none: none,
      from: from
    };

    var Global = typeof domGlobals.window !== 'undefined' ? domGlobals.window : Function('return this;')();

    var path = function (parts, scope) {
      var o = scope !== undefined && scope !== null ? scope : Global;
      for (var i = 0; i < parts.length && o !== undefined && o !== null; ++i)
        o = o[parts[i]];
      return o;
    };
    var resolve = function (p, scope) {
      var parts = p.split('.');
      return path(parts, scope);
    };

    var unsafe = function (name, scope) {
      return resolve(name, scope);
    };
    var getOrDie = function (name, scope) {
      var actual = unsafe(name, scope);
      if (actual === undefined || actual === null)
        throw name + ' not available on this browser';
      return actual;
    };
    var Global$1 = { getOrDie: getOrDie };

    function Blob (parts, properties) {
      var f = Global$1.getOrDie('Blob');
      return new f(parts, properties);
    }

    function FileReader () {
      var f = Global$1.getOrDie('FileReader');
      return new f();
    }

    function Uint8Array (arr) {
      var f = Global$1.getOrDie('Uint8Array');
      return new f(arr);
    }

    var requestAnimationFrame = function (callback) {
      var f = Global$1.getOrDie('requestAnimationFrame');
      f(callback);
    };
    var atob = function (base64) {
      var f = Global$1.getOrDie('atob');
      return f(base64);
    };
    var Window = {
      atob: atob,
      requestAnimationFrame: requestAnimationFrame
    };

    function imageToBlob(image) {
      var src = image.src;
      if (src.indexOf('data:') === 0) {
        return dataUriToBlob(src);
      }
      return anyUriToBlob(src);
    }
    function blobToImage(blob) {
      return new Promise(function (resolve, reject) {
        var blobUrl = domGlobals.URL.createObjectURL(blob);
        var image = new domGlobals.Image();
        var removeListeners = function () {
          image.removeEventListener('load', loaded);
          image.removeEventListener('error', error);
        };
        function loaded() {
          removeListeners();
          resolve(image);
        }
        function error() {
          removeListeners();
          reject('Unable to load data of type ' + blob.type + ': ' + blobUrl);
        }
        image.addEventListener('load', loaded);
        image.addEventListener('error', error);
        image.src = blobUrl;
        if (image.complete) {
          loaded();
        }
      });
    }
    function anyUriToBlob(url) {
      return new Promise(function (resolve, reject) {
        var xhr = new domGlobals.XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
          if (this.status == 200) {
            resolve(this.response);
          }
        };
        xhr.onerror = function () {
          var _this = this;
          var corsError = function () {
            var obj = new Error('No access to download image');
            obj.code = 18;
            obj.name = 'SecurityError';
            return obj;
          };
          var genericError = function () {
            return new Error('Error ' + _this.status + ' downloading image');
          };
          reject(this.status === 0 ? corsError() : genericError());
        };
        xhr.send();
      });
    }
    function dataUriToBlobSync(uri) {
      var data = uri.split(',');
      var matches = /data:([^;]+)/.exec(data[0]);
      if (!matches)
        return Option.none();
      var mimetype = matches[1];
      var base64 = data[1];
      var sliceSize = 1024;
      var byteCharacters = Window.atob(base64);
      var bytesLength = byteCharacters.length;
      var slicesCount = Math.ceil(bytesLength / sliceSize);
      var byteArrays = new Array(slicesCount);
      for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);
        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
          bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = Uint8Array(bytes);
      }
      return Option.some(Blob(byteArrays, { type: mimetype }));
    }
    function dataUriToBlob(uri) {
      return new Promise(function (resolve, reject) {
        dataUriToBlobSync(uri).fold(function () {
          reject('uri is not base64: ' + uri);
        }, resolve);
      });
    }
    function uriToBlob(url) {
      if (url.indexOf('blob:') === 0) {
        return anyUriToBlob(url);
      }
      if (url.indexOf('data:') === 0) {
        return dataUriToBlob(url);
      }
      return null;
    }
    function canvasToBlob(canvas, type, quality) {
      type = type || 'image/png';
      if (domGlobals.HTMLCanvasElement.prototype.toBlob) {
        return new Promise(function (resolve) {
          canvas.toBlob(function (blob) {
            resolve(blob);
          }, type, quality);
        });
      } else {
        return dataUriToBlob(canvas.toDataURL(type, quality));
      }
    }
    function canvasToDataURL(getCanvas, type, quality) {
      type = type || 'image/png';
      return getCanvas.then(function (canvas) {
        return canvas.toDataURL(type, quality);
      });
    }
    function blobToCanvas(blob) {
      return blobToImage(blob).then(function (image) {
        revokeImageUrl(image);
        var context, canvas;
        canvas = Canvas.create(ImageSize.getWidth(image), ImageSize.getHeight(image));
        context = Canvas.get2dContext(canvas);
        context.drawImage(image, 0, 0);
        return canvas;
      });
    }
    function blobToDataUri(blob) {
      return new Promise(function (resolve) {
        var reader = FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });
    }
    function blobToArrayBuffer(blob) {
      return new Promise(function (resolve) {
        var reader = FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        };
        reader.readAsArrayBuffer(blob);
      });
    }
    function blobToBase64(blob) {
      return blobToDataUri(blob).then(function (dataUri) {
        return dataUri.split(',')[1];
      });
    }
    function revokeImageUrl(image) {
      domGlobals.URL.revokeObjectURL(image.src);
    }
    var Conversions = {
      blobToImage: blobToImage,
      imageToBlob: imageToBlob,
      blobToArrayBuffer: blobToArrayBuffer,
      blobToDataUri: blobToDataUri,
      blobToBase64: blobToBase64,
      dataUriToBlobSync: dataUriToBlobSync,
      canvasToBlob: canvasToBlob,
      canvasToDataURL: canvasToDataURL,
      blobToCanvas: blobToCanvas,
      uriToBlob: uriToBlob
    };

    var blobToImage$1 = function (image) {
      return Conversions.blobToImage(image);
    };
    var imageToBlob$1 = function (blob) {
      return Conversions.imageToBlob(blob);
    };
    var blobToDataUri$1 = function (blob) {
      return Conversions.blobToDataUri(blob);
    };
    var blobToBase64$1 = function (blob) {
      return Conversions.blobToBase64(blob);
    };
    var dataUriToBlobSync$1 = function (uri) {
      return Conversions.dataUriToBlobSync(uri);
    };
    var uriToBlob$1 = function (uri) {
      return Option.from(Conversions.uriToBlob(uri));
    };
    var BlobConversions = {
      blobToImage: blobToImage$1,
      imageToBlob: imageToBlob$1,
      blobToDataUri: blobToDataUri$1,
      blobToBase64: blobToBase64$1,
      dataUriToBlobSync: dataUriToBlobSync$1,
      uriToBlob: uriToBlob$1
    };

    function create$1(getCanvas, blob, uri) {
      var initialType = blob.type;
      var getType = constant(initialType);
      function toBlob() {
        return Promise.resolve(blob);
      }
      function toDataURL() {
        return uri;
      }
      function toBase64() {
        return uri.split(',')[1];
      }
      function toAdjustedBlob(type, quality) {
        return getCanvas.then(function (canvas) {
          return Conversions.canvasToBlob(canvas, type, quality);
        });
      }
      function toAdjustedDataURL(type, quality) {
        return getCanvas.then(function (canvas) {
          return Conversions.canvasToDataURL(canvas, type, quality);
        });
      }
      function toAdjustedBase64(type, quality) {
        return toAdjustedDataURL(type, quality).then(function (dataurl) {
          return dataurl.split(',')[1];
        });
      }
      function toCanvas() {
        return getCanvas.then(Canvas.clone);
      }
      return {
        getType: getType,
        toBlob: toBlob,
        toDataURL: toDataURL,
        toBase64: toBase64,
        toAdjustedBlob: toAdjustedBlob,
        toAdjustedDataURL: toAdjustedDataURL,
        toAdjustedBase64: toAdjustedBase64,
        toCanvas: toCanvas
      };
    }
    function fromBlob(blob) {
      return Conversions.blobToDataUri(blob).then(function (uri) {
        return create$1(Conversions.blobToCanvas(blob), blob, uri);
      });
    }
    function fromCanvas(canvas, type) {
      return Conversions.canvasToBlob(canvas, type).then(function (blob) {
        return create$1(Promise.resolve(canvas), blob, canvas.toDataURL());
      });
    }
    function fromImage(image) {
      return Conversions.imageToBlob(image).then(function (blob) {
        return fromBlob(blob);
      });
    }
    var fromBlobAndUrlSync = function (blob, url) {
      return create$1(Conversions.blobToCanvas(blob), blob, url);
    };
    var ImageResult = {
      fromBlob: fromBlob,
      fromCanvas: fromCanvas,
      fromImage: fromImage,
      fromBlobAndUrlSync: fromBlobAndUrlSync
    };

    function clamp(value, min, max) {
      value = parseFloat(value);
      if (value > max) {
        value = max;
      } else if (value < min) {
        value = min;
      }
      return value;
    }
    function identity() {
      return [
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ];
    }
    var DELTA_INDEX = [
      0,
      0.01,
      0.02,
      0.04,
      0.05,
      0.06,
      0.07,
      0.08,
      0.1,
      0.11,
      0.12,
      0.14,
      0.15,
      0.16,
      0.17,
      0.18,
      0.2,
      0.21,
      0.22,
      0.24,
      0.25,
      0.27,
      0.28,
      0.3,
      0.32,
      0.34,
      0.36,
      0.38,
      0.4,
      0.42,
      0.44,
      0.46,
      0.48,
      0.5,
      0.53,
      0.56,
      0.59,
      0.62,
      0.65,
      0.68,
      0.71,
      0.74,
      0.77,
      0.8,
      0.83,
      0.86,
      0.89,
      0.92,
      0.95,
      0.98,
      1,
      1.06,
      1.12,
      1.18,
      1.24,
      1.3,
      1.36,
      1.42,
      1.48,
      1.54,
      1.6,
      1.66,
      1.72,
      1.78,
      1.84,
      1.9,
      1.96,
      2,
      2.12,
      2.25,
      2.37,
      2.5,
      2.62,
      2.75,
      2.87,
      3,
      3.2,
      3.4,
      3.6,
      3.8,
      4,
      4.3,
      4.7,
      4.9,
      5,
      5.5,
      6,
      6.5,
      6.8,
      7,
      7.3,
      7.5,
      7.8,
      8,
      8.4,
      8.7,
      9,
      9.4,
      9.6,
      9.8,
      10
    ];
    function multiply(matrix1, matrix2) {
      var i, j, k, val, col = [], out = new Array(10);
      for (i = 0; i < 5; i++) {
        for (j = 0; j < 5; j++) {
          col[j] = matrix2[j + i * 5];
        }
        for (j = 0; j < 5; j++) {
          val = 0;
          for (k = 0; k < 5; k++) {
            val += matrix1[j + k * 5] * col[k];
          }
          out[j + i * 5] = val;
        }
      }
      return out;
    }
    function adjust(matrix, adjustValue) {
      adjustValue = clamp(adjustValue, 0, 1);
      return matrix.map(function (value, index) {
        if (index % 6 === 0) {
          value = 1 - (1 - value) * adjustValue;
        } else {
          value *= adjustValue;
        }
        return clamp(value, 0, 1);
      });
    }
    function adjustContrast(matrix, value) {
      var x;
      value = clamp(value, -1, 1);
      value *= 100;
      if (value < 0) {
        x = 127 + value / 100 * 127;
      } else {
        x = value % 1;
        if (x === 0) {
          x = DELTA_INDEX[value];
        } else {
          x = DELTA_INDEX[Math.floor(value)] * (1 - x) + DELTA_INDEX[Math.floor(value) + 1] * x;
        }
        x = x * 127 + 127;
      }
      return multiply(matrix, [
        x / 127,
        0,
        0,
        0,
        0.5 * (127 - x),
        0,
        x / 127,
        0,
        0,
        0.5 * (127 - x),
        0,
        0,
        x / 127,
        0,
        0.5 * (127 - x),
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ]);
    }
    function adjustSaturation(matrix, value) {
      var x, lumR, lumG, lumB;
      value = clamp(value, -1, 1);
      x = 1 + (value > 0 ? 3 * value : value);
      lumR = 0.3086;
      lumG = 0.6094;
      lumB = 0.082;
      return multiply(matrix, [
        lumR * (1 - x) + x,
        lumG * (1 - x),
        lumB * (1 - x),
        0,
        0,
        lumR * (1 - x),
        lumG * (1 - x) + x,
        lumB * (1 - x),
        0,
        0,
        lumR * (1 - x),
        lumG * (1 - x),
        lumB * (1 - x) + x,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ]);
    }
    function adjustHue(matrix, angle) {
      var cosVal, sinVal, lumR, lumG, lumB;
      angle = clamp(angle, -180, 180) / 180 * Math.PI;
      cosVal = Math.cos(angle);
      sinVal = Math.sin(angle);
      lumR = 0.213;
      lumG = 0.715;
      lumB = 0.072;
      return multiply(matrix, [
        lumR + cosVal * (1 - lumR) + sinVal * -lumR,
        lumG + cosVal * -lumG + sinVal * -lumG,
        lumB + cosVal * -lumB + sinVal * (1 - lumB),
        0,
        0,
        lumR + cosVal * -lumR + sinVal * 0.143,
        lumG + cosVal * (1 - lumG) + sinVal * 0.14,
        lumB + cosVal * -lumB + sinVal * -0.283,
        0,
        0,
        lumR + cosVal * -lumR + sinVal * -(1 - lumR),
        lumG + cosVal * -lumG + sinVal * lumG,
        lumB + cosVal * (1 - lumB) + sinVal * lumB,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ]);
    }
    function adjustBrightness(matrix, value) {
      value = clamp(255 * value, -255, 255);
      return multiply(matrix, [
        1,
        0,
        0,
        0,
        value,
        0,
        1,
        0,
        0,
        value,
        0,
        0,
        1,
        0,
        value,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ]);
    }
    function adjustColors(matrix, adjustR, adjustG, adjustB) {
      adjustR = clamp(adjustR, 0, 2);
      adjustG = clamp(adjustG, 0, 2);
      adjustB = clamp(adjustB, 0, 2);
      return multiply(matrix, [
        adjustR,
        0,
        0,
        0,
        0,
        0,
        adjustG,
        0,
        0,
        0,
        0,
        0,
        adjustB,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ]);
    }
    function adjustSepia(matrix, value) {
      value = clamp(value, 0, 1);
      return multiply(matrix, adjust([
        0.393,
        0.769,
        0.189,
        0,
        0,
        0.349,
        0.686,
        0.168,
        0,
        0,
        0.272,
        0.534,
        0.131,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ], value));
    }
    function adjustGrayscale(matrix, value) {
      value = clamp(value, 0, 1);
      return multiply(matrix, adjust([
        0.33,
        0.34,
        0.33,
        0,
        0,
        0.33,
        0.34,
        0.33,
        0,
        0,
        0.33,
        0.34,
        0.33,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ], value));
    }
    var ColorMatrix = {
      identity: identity,
      adjust: adjust,
      multiply: multiply,
      adjustContrast: adjustContrast,
      adjustBrightness: adjustBrightness,
      adjustSaturation: adjustSaturation,
      adjustHue: adjustHue,
      adjustColors: adjustColors,
      adjustSepia: adjustSepia,
      adjustGrayscale: adjustGrayscale
    };

    function colorFilter(ir, matrix) {
      return ir.toCanvas().then(function (canvas) {
        return applyColorFilter(canvas, ir.getType(), matrix);
      });
    }
    function applyColorFilter(canvas, type, matrix) {
      var context = Canvas.get2dContext(canvas);
      var pixels;
      function applyMatrix(pixels, m) {
        var d = pixels.data, r, g, b, a, i, m0 = m[0], m1 = m[1], m2 = m[2], m3 = m[3], m4 = m[4], m5 = m[5], m6 = m[6], m7 = m[7], m8 = m[8], m9 = m[9], m10 = m[10], m11 = m[11], m12 = m[12], m13 = m[13], m14 = m[14], m15 = m[15], m16 = m[16], m17 = m[17], m18 = m[18], m19 = m[19];
        for (i = 0; i < d.length; i += 4) {
          r = d[i];
          g = d[i + 1];
          b = d[i + 2];
          a = d[i + 3];
          d[i] = r * m0 + g * m1 + b * m2 + a * m3 + m4;
          d[i + 1] = r * m5 + g * m6 + b * m7 + a * m8 + m9;
          d[i + 2] = r * m10 + g * m11 + b * m12 + a * m13 + m14;
          d[i + 3] = r * m15 + g * m16 + b * m17 + a * m18 + m19;
        }
        return pixels;
      }
      pixels = applyMatrix(context.getImageData(0, 0, canvas.width, canvas.height), matrix);
      context.putImageData(pixels, 0, 0);
      return ImageResult.fromCanvas(canvas, type);
    }
    function convoluteFilter(ir, matrix) {
      return ir.toCanvas().then(function (canvas) {
        return applyConvoluteFilter(canvas, ir.getType(), matrix);
      });
    }
    function applyConvoluteFilter(canvas, type, matrix) {
      var context = Canvas.get2dContext(canvas);
      var pixelsIn, pixelsOut;
      function applyMatrix(pixelsIn, pixelsOut, matrix) {
        var rgba, drgba, side, halfSide, x, y, r, g, b, cx, cy, scx, scy, offset, wt, w, h;
        function clamp(value, min, max) {
          if (value > max) {
            value = max;
          } else if (value < min) {
            value = min;
          }
          return value;
        }
        side = Math.round(Math.sqrt(matrix.length));
        halfSide = Math.floor(side / 2);
        rgba = pixelsIn.data;
        drgba = pixelsOut.data;
        w = pixelsIn.width;
        h = pixelsIn.height;
        for (y = 0; y < h; y++) {
          for (x = 0; x < w; x++) {
            r = g = b = 0;
            for (cy = 0; cy < side; cy++) {
              for (cx = 0; cx < side; cx++) {
                scx = clamp(x + cx - halfSide, 0, w - 1);
                scy = clamp(y + cy - halfSide, 0, h - 1);
                offset = (scy * w + scx) * 4;
                wt = matrix[cy * side + cx];
                r += rgba[offset] * wt;
                g += rgba[offset + 1] * wt;
                b += rgba[offset + 2] * wt;
              }
            }
            offset = (y * w + x) * 4;
            drgba[offset] = clamp(r, 0, 255);
            drgba[offset + 1] = clamp(g, 0, 255);
            drgba[offset + 2] = clamp(b, 0, 255);
          }
        }
        return pixelsOut;
      }
      pixelsIn = context.getImageData(0, 0, canvas.width, canvas.height);
      pixelsOut = context.getImageData(0, 0, canvas.width, canvas.height);
      pixelsOut = applyMatrix(pixelsIn, pixelsOut, matrix);
      context.putImageData(pixelsOut, 0, 0);
      return ImageResult.fromCanvas(canvas, type);
    }
    function functionColorFilter(colorFn) {
      var filterImpl = function (canvas, type, value) {
        var context = Canvas.get2dContext(canvas);
        var pixels, i, lookup = new Array(256);
        function applyLookup(pixels, lookup) {
          var d = pixels.data, i;
          for (i = 0; i < d.length; i += 4) {
            d[i] = lookup[d[i]];
            d[i + 1] = lookup[d[i + 1]];
            d[i + 2] = lookup[d[i + 2]];
          }
          return pixels;
        }
        for (i = 0; i < lookup.length; i++) {
          lookup[i] = colorFn(i, value);
        }
        pixels = applyLookup(context.getImageData(0, 0, canvas.width, canvas.height), lookup);
        context.putImageData(pixels, 0, 0);
        return ImageResult.fromCanvas(canvas, type);
      };
      return function (ir, value) {
        return ir.toCanvas().then(function (canvas) {
          return filterImpl(canvas, ir.getType(), value);
        });
      };
    }
    function complexAdjustableColorFilter(matrixAdjustFn) {
      return function (ir, adjust) {
        return colorFilter(ir, matrixAdjustFn(ColorMatrix.identity(), adjust));
      };
    }
    function basicColorFilter(matrix) {
      return function (ir) {
        return colorFilter(ir, matrix);
      };
    }
    function basicConvolutionFilter(kernel) {
      return function (ir) {
        return convoluteFilter(ir, kernel);
      };
    }
    var Filters = {
      invert: basicColorFilter([
        -1,
        0,
        0,
        0,
        255,
        0,
        -1,
        0,
        0,
        255,
        0,
        0,
        -1,
        0,
        255,
        0,
        0,
        0,
        1,
        0
      ]),
      brightness: complexAdjustableColorFilter(ColorMatrix.adjustBrightness),
      hue: complexAdjustableColorFilter(ColorMatrix.adjustHue),
      saturate: complexAdjustableColorFilter(ColorMatrix.adjustSaturation),
      contrast: complexAdjustableColorFilter(ColorMatrix.adjustContrast),
      grayscale: complexAdjustableColorFilter(ColorMatrix.adjustGrayscale),
      sepia: complexAdjustableColorFilter(ColorMatrix.adjustSepia),
      colorize: function (ir, adjustR, adjustG, adjustB) {
        return colorFilter(ir, ColorMatrix.adjustColors(ColorMatrix.identity(), adjustR, adjustG, adjustB));
      },
      sharpen: basicConvolutionFilter([
        0,
        -1,
        0,
        -1,
        5,
        -1,
        0,
        -1,
        0
      ]),
      emboss: basicConvolutionFilter([
        -2,
        -1,
        0,
        -1,
        1,
        1,
        0,
        1,
        2
      ]),
      gamma: functionColorFilter(function (color, value) {
        return Math.pow(color / 255, 1 - value) * 255;
      }),
      exposure: functionColorFilter(function (color, value) {
        return 255 * (1 - Math.exp(-(color / 255) * value));
      }),
      colorFilter: colorFilter,
      convoluteFilter: convoluteFilter
    };

    function scale(image, dW, dH) {
      var sW = ImageSize.getWidth(image);
      var sH = ImageSize.getHeight(image);
      var wRatio = dW / sW;
      var hRatio = dH / sH;
      var scaleCapped = false;
      if (wRatio < 0.5 || wRatio > 2) {
        wRatio = wRatio < 0.5 ? 0.5 : 2;
        scaleCapped = true;
      }
      if (hRatio < 0.5 || hRatio > 2) {
        hRatio = hRatio < 0.5 ? 0.5 : 2;
        scaleCapped = true;
      }
      var scaled = _scale(image, wRatio, hRatio);
      return !scaleCapped ? scaled : scaled.then(function (tCanvas) {
        return scale(tCanvas, dW, dH);
      });
    }
    function _scale(image, wRatio, hRatio) {
      return new Promise(function (resolve) {
        var sW = ImageSize.getWidth(image);
        var sH = ImageSize.getHeight(image);
        var dW = Math.floor(sW * wRatio);
        var dH = Math.floor(sH * hRatio);
        var canvas = Canvas.create(dW, dH);
        var context = Canvas.get2dContext(canvas);
        context.drawImage(image, 0, 0, sW, sH, 0, 0, dW, dH);
        resolve(canvas);
      });
    }
    var ImageResizerCanvas = { scale: scale };

    function rotate(ir, angle) {
      return ir.toCanvas().then(function (canvas) {
        return applyRotate(canvas, ir.getType(), angle);
      });
    }
    function applyRotate(image, type, angle) {
      var canvas = Canvas.create(image.width, image.height);
      var context = Canvas.get2dContext(canvas);
      var translateX = 0, translateY = 0;
      angle = angle < 0 ? 360 + angle : angle;
      if (angle == 90 || angle == 270) {
        Canvas.resize(canvas, canvas.height, canvas.width);
      }
      if (angle == 90 || angle == 180) {
        translateX = canvas.width;
      }
      if (angle == 270 || angle == 180) {
        translateY = canvas.height;
      }
      context.translate(translateX, translateY);
      context.rotate(angle * Math.PI / 180);
      context.drawImage(image, 0, 0);
      return ImageResult.fromCanvas(canvas, type);
    }
    function flip(ir, axis) {
      return ir.toCanvas().then(function (canvas) {
        return applyFlip(canvas, ir.getType(), axis);
      });
    }
    function applyFlip(image, type, axis) {
      var canvas = Canvas.create(image.width, image.height);
      var context = Canvas.get2dContext(canvas);
      if (axis == 'v') {
        context.scale(1, -1);
        context.drawImage(image, 0, -canvas.height);
      } else {
        context.scale(-1, 1);
        context.drawImage(image, -canvas.width, 0);
      }
      return ImageResult.fromCanvas(canvas, type);
    }
    function crop(ir, x, y, w, h) {
      return ir.toCanvas().then(function (canvas) {
        return applyCrop(canvas, ir.getType(), x, y, w, h);
      });
    }
    function applyCrop(image, type, x, y, w, h) {
      var canvas = Canvas.create(w, h);
      var context = Canvas.get2dContext(canvas);
      context.drawImage(image, -x, -y);
      return ImageResult.fromCanvas(canvas, type);
    }
    function resize$1(ir, w, h) {
      return ir.toCanvas().then(function (canvas) {
        return ImageResizerCanvas.scale(canvas, w, h).then(function (newCanvas) {
          return ImageResult.fromCanvas(newCanvas, ir.getType());
        });
      });
    }
    var ImageTools = {
      rotate: rotate,
      flip: flip,
      crop: crop,
      resize: resize$1
    };

    var BinaryReader = function () {
      function BinaryReader(ar) {
        this.littleEndian = false;
        this._dv = new DataView(ar);
      }
      BinaryReader.prototype.readByteAt = function (idx) {
        return this._dv.getUint8(idx);
      };
      BinaryReader.prototype.read = function (idx, size) {
        if (idx + size > this.length()) {
          return null;
        }
        var mv = this.littleEndian ? 0 : -8 * (size - 1);
        for (var i = 0, sum = 0; i < size; i++) {
          sum |= this.readByteAt(idx + i) << Math.abs(mv + i * 8);
        }
        return sum;
      };
      BinaryReader.prototype.BYTE = function (idx) {
        return this.read(idx, 1);
      };
      BinaryReader.prototype.SHORT = function (idx) {
        return this.read(idx, 2);
      };
      BinaryReader.prototype.LONG = function (idx) {
        return this.read(idx, 4);
      };
      BinaryReader.prototype.SLONG = function (idx) {
        var num = this.read(idx, 4);
        return num > 2147483647 ? num - 4294967296 : num;
      };
      BinaryReader.prototype.CHAR = function (idx) {
        return String.fromCharCode(this.read(idx, 1));
      };
      BinaryReader.prototype.STRING = function (idx, count) {
        return this.asArray('CHAR', idx, count).join('');
      };
      BinaryReader.prototype.SEGMENT = function (idx, size) {
        var ar = this._dv.buffer;
        switch (arguments.length) {
        case 2:
          return ar.slice(idx, idx + size);
        case 1:
          return ar.slice(idx);
        default:
          return ar;
        }
      };
      BinaryReader.prototype.asArray = function (type, idx, count) {
        var values = [];
        for (var i = 0; i < count; i++) {
          values[i] = this[type](idx + i);
        }
        return values;
      };
      BinaryReader.prototype.length = function () {
        return this._dv ? this._dv.byteLength : 0;
      };
      return BinaryReader;
    }();

    var tags = {
      tiff: {
        274: 'Orientation',
        270: 'ImageDescription',
        271: 'Make',
        272: 'Model',
        305: 'Software',
        34665: 'ExifIFDPointer',
        34853: 'GPSInfoIFDPointer'
      },
      exif: {
        36864: 'ExifVersion',
        40961: 'ColorSpace',
        40962: 'PixelXDimension',
        40963: 'PixelYDimension',
        36867: 'DateTimeOriginal',
        33434: 'ExposureTime',
        33437: 'FNumber',
        34855: 'ISOSpeedRatings',
        37377: 'ShutterSpeedValue',
        37378: 'ApertureValue',
        37383: 'MeteringMode',
        37384: 'LightSource',
        37385: 'Flash',
        37386: 'FocalLength',
        41986: 'ExposureMode',
        41987: 'WhiteBalance',
        41990: 'SceneCaptureType',
        41988: 'DigitalZoomRatio',
        41992: 'Contrast',
        41993: 'Saturation',
        41994: 'Sharpness'
      },
      gps: {
        0: 'GPSVersionID',
        1: 'GPSLatitudeRef',
        2: 'GPSLatitude',
        3: 'GPSLongitudeRef',
        4: 'GPSLongitude'
      },
      thumb: {
        513: 'JPEGInterchangeFormat',
        514: 'JPEGInterchangeFormatLength'
      }
    };
    var tagDescs = {
      'ColorSpace': {
        1: 'sRGB',
        0: 'Uncalibrated'
      },
      'MeteringMode': {
        0: 'Unknown',
        1: 'Average',
        2: 'CenterWeightedAverage',
        3: 'Spot',
        4: 'MultiSpot',
        5: 'Pattern',
        6: 'Partial',
        255: 'Other'
      },
      'LightSource': {
        1: 'Daylight',
        2: 'Fliorescent',
        3: 'Tungsten',
        4: 'Flash',
        9: 'Fine weather',
        10: 'Cloudy weather',
        11: 'Shade',
        12: 'Daylight fluorescent (D 5700 - 7100K)',
        13: 'Day white fluorescent (N 4600 -5400K)',
        14: 'Cool white fluorescent (W 3900 - 4500K)',
        15: 'White fluorescent (WW 3200 - 3700K)',
        17: 'Standard light A',
        18: 'Standard light B',
        19: 'Standard light C',
        20: 'D55',
        21: 'D65',
        22: 'D75',
        23: 'D50',
        24: 'ISO studio tungsten',
        255: 'Other'
      },
      'Flash': {
        0: 'Flash did not fire',
        1: 'Flash fired',
        5: 'Strobe return light not detected',
        7: 'Strobe return light detected',
        9: 'Flash fired, compulsory flash mode',
        13: 'Flash fired, compulsory flash mode, return light not detected',
        15: 'Flash fired, compulsory flash mode, return light detected',
        16: 'Flash did not fire, compulsory flash mode',
        24: 'Flash did not fire, auto mode',
        25: 'Flash fired, auto mode',
        29: 'Flash fired, auto mode, return light not detected',
        31: 'Flash fired, auto mode, return light detected',
        32: 'No flash function',
        65: 'Flash fired, red-eye reduction mode',
        69: 'Flash fired, red-eye reduction mode, return light not detected',
        71: 'Flash fired, red-eye reduction mode, return light detected',
        73: 'Flash fired, compulsory flash mode, red-eye reduction mode',
        77: 'Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected',
        79: 'Flash fired, compulsory flash mode, red-eye reduction mode, return light detected',
        89: 'Flash fired, auto mode, red-eye reduction mode',
        93: 'Flash fired, auto mode, return light not detected, red-eye reduction mode',
        95: 'Flash fired, auto mode, return light detected, red-eye reduction mode'
      },
      'ExposureMode': {
        0: 'Auto exposure',
        1: 'Manual exposure',
        2: 'Auto bracket'
      },
      'WhiteBalance': {
        0: 'Auto white balance',
        1: 'Manual white balance'
      },
      'SceneCaptureType': {
        0: 'Standard',
        1: 'Landscape',
        2: 'Portrait',
        3: 'Night scene'
      },
      'Contrast': {
        0: 'Normal',
        1: 'Soft',
        2: 'Hard'
      },
      'Saturation': {
        0: 'Normal',
        1: 'Low saturation',
        2: 'High saturation'
      },
      'Sharpness': {
        0: 'Normal',
        1: 'Soft',
        2: 'Hard'
      },
      'GPSLatitudeRef': {
        N: 'North latitude',
        S: 'South latitude'
      },
      'GPSLongitudeRef': {
        E: 'East longitude',
        W: 'West longitude'
      }
    };
    var ExifReader = function () {
      function ExifReader(ar) {
        this._offsets = {
          tiffHeader: 10,
          IFD0: null,
          IFD1: null,
          exifIFD: null,
          gpsIFD: null
        };
        this._tiffTags = {};
        var self = this;
        self._reader = new BinaryReader(ar);
        self._idx = self._offsets.tiffHeader;
        if (self.SHORT(0) !== 65505 || self.STRING(4, 5).toUpperCase() !== 'EXIF\0') {
          throw new Error('Exif data cannot be read or not available.');
        }
        self._reader.littleEndian = self.SHORT(self._idx) == 18761;
        if (self.SHORT(self._idx += 2) !== 42) {
          throw new Error('Invalid Exif data.');
        }
        self._offsets.IFD0 = self._offsets.tiffHeader + self.LONG(self._idx += 2);
        self._tiffTags = self.extractTags(self._offsets.IFD0, tags.tiff);
        if ('ExifIFDPointer' in self._tiffTags) {
          self._offsets.exifIFD = self._offsets.tiffHeader + self._tiffTags.ExifIFDPointer;
          delete self._tiffTags.ExifIFDPointer;
        }
        if ('GPSInfoIFDPointer' in self._tiffTags) {
          self._offsets.gpsIFD = self._offsets.tiffHeader + self._tiffTags.GPSInfoIFDPointer;
          delete self._tiffTags.GPSInfoIFDPointer;
        }
        var IFD1Offset = self.LONG(self._offsets.IFD0 + self.SHORT(self._offsets.IFD0) * 12 + 2);
        if (IFD1Offset) {
          self._offsets.IFD1 = self._offsets.tiffHeader + IFD1Offset;
        }
      }
      ExifReader.prototype.BYTE = function (idx) {
        return this._reader.BYTE(idx);
      };
      ExifReader.prototype.SHORT = function (idx) {
        return this._reader.SHORT(idx);
      };
      ExifReader.prototype.LONG = function (idx) {
        return this._reader.LONG(idx);
      };
      ExifReader.prototype.SLONG = function (idx) {
        return this._reader.SLONG(idx);
      };
      ExifReader.prototype.CHAR = function (idx) {
        return this._reader.CHAR(idx);
      };
      ExifReader.prototype.STRING = function (idx, count) {
        return this._reader.STRING(idx, count);
      };
      ExifReader.prototype.SEGMENT = function (idx, size) {
        return this._reader.SEGMENT(idx, size);
      };
      ExifReader.prototype.asArray = function (type, idx, count) {
        var values = [];
        for (var i = 0; i < count; i++) {
          values[i] = this[type](idx + i);
        }
        return values;
      };
      ExifReader.prototype.length = function () {
        return this._reader.length();
      };
      ExifReader.prototype.UNDEFINED = function () {
        return this.BYTE.apply(this, arguments);
      };
      ExifReader.prototype.RATIONAL = function (idx) {
        return this.LONG(idx) / this.LONG(idx + 4);
      };
      ExifReader.prototype.SRATIONAL = function (idx) {
        return this.SLONG(idx) / this.SLONG(idx + 4);
      };
      ExifReader.prototype.ASCII = function (idx) {
        return this.CHAR(idx);
      };
      ExifReader.prototype.TIFF = function () {
        return this._tiffTags;
      };
      ExifReader.prototype.EXIF = function () {
        var self = this;
        var Exif = null;
        if (self._offsets.exifIFD) {
          try {
            Exif = self.extractTags(self._offsets.exifIFD, tags.exif);
          } catch (ex) {
            return null;
          }
          if (Exif.ExifVersion && Array.isArray(Exif.ExifVersion)) {
            for (var i = 0, exifVersion = ''; i < Exif.ExifVersion.length; i++) {
              exifVersion += String.fromCharCode(Exif.ExifVersion[i]);
            }
            Exif.ExifVersion = exifVersion;
          }
        }
        return Exif;
      };
      ExifReader.prototype.GPS = function () {
        var self = this;
        var GPS = null;
        if (self._offsets.gpsIFD) {
          try {
            GPS = self.extractTags(self._offsets.gpsIFD, tags.gps);
          } catch (ex) {
            return null;
          }
          if (GPS.GPSVersionID && Array.isArray(GPS.GPSVersionID)) {
            GPS.GPSVersionID = GPS.GPSVersionID.join('.');
          }
        }
        return GPS;
      };
      ExifReader.prototype.thumb = function () {
        var self = this;
        if (self._offsets.IFD1) {
          try {
            var IFD1Tags = self.extractTags(self._offsets.IFD1, tags.thumb);
            if ('JPEGInterchangeFormat' in IFD1Tags) {
              return self.SEGMENT(self._offsets.tiffHeader + IFD1Tags.JPEGInterchangeFormat, IFD1Tags.JPEGInterchangeFormatLength);
            }
          } catch (ex) {
          }
        }
        return null;
      };
      ExifReader.prototype.extractTags = function (IFD_offset, tags2extract) {
        var self = this;
        var length, i, tag, type, count, size, offset, value, values = [], hash = {};
        var types = {
          1: 'BYTE',
          7: 'UNDEFINED',
          2: 'ASCII',
          3: 'SHORT',
          4: 'LONG',
          5: 'RATIONAL',
          9: 'SLONG',
          10: 'SRATIONAL'
        };
        var sizes = {
          'BYTE': 1,
          'UNDEFINED': 1,
          'ASCII': 1,
          'SHORT': 2,
          'LONG': 4,
          'RATIONAL': 8,
          'SLONG': 4,
          'SRATIONAL': 8
        };
        length = self.SHORT(IFD_offset);
        for (i = 0; i < length; i++) {
          values = [];
          offset = IFD_offset + 2 + i * 12;
          tag = tags2extract[self.SHORT(offset)];
          if (tag === undefined) {
            continue;
          }
          type = types[self.SHORT(offset += 2)];
          count = self.LONG(offset += 2);
          size = sizes[type];
          if (!size) {
            throw new Error('Invalid Exif data.');
          }
          offset += 4;
          if (size * count > 4) {
            offset = self.LONG(offset) + self._offsets.tiffHeader;
          }
          if (offset + size * count >= self.length()) {
            throw new Error('Invalid Exif data.');
          }
          if (type === 'ASCII') {
            hash[tag] = self.STRING(offset, count).replace(/\0$/, '').trim();
            continue;
          } else {
            values = self.asArray(type, offset, count);
            value = count == 1 ? values[0] : values;
            if (tagDescs.hasOwnProperty(tag) && typeof value != 'object') {
              hash[tag] = tagDescs[tag][value];
            } else {
              hash[tag] = value;
            }
          }
        }
        return hash;
      };
      return ExifReader;
    }();

    var extractFrom = function (blob) {
      return Conversions.blobToArrayBuffer(blob).then(function (ar) {
        try {
          var br = new BinaryReader(ar);
          if (br.SHORT(0) === 65496) {
            var headers = extractHeaders(br);
            var app1 = headers.filter(function (header) {
              return header.name === 'APP1';
            });
            var meta = {};
            if (app1.length) {
              var exifReader = new ExifReader(app1[0].segment);
              meta = {
                tiff: exifReader.TIFF(),
                exif: exifReader.EXIF(),
                gps: exifReader.GPS(),
                thumb: exifReader.thumb()
              };
            } else {
              return Promise.reject('Headers did not include required information');
            }
            meta.rawHeaders = headers;
            return meta;
          }
          return Promise.reject('Image was not a jpeg');
        } catch (ex) {
          return Promise.reject('Unsupported format or not an image: ' + blob.type + ' (Exception: ' + ex.message + ')');
        }
      });
    };
    var extractHeaders = function (br) {
      var headers = [], idx, marker, length = 0;
      idx = 2;
      while (idx <= br.length()) {
        marker = br.SHORT(idx);
        if (marker >= 65488 && marker <= 65495) {
          idx += 2;
          continue;
        }
        if (marker === 65498 || marker === 65497) {
          break;
        }
        length = br.SHORT(idx + 2) + 2;
        if (marker >= 65505 && marker <= 65519) {
          headers.push({
            hex: marker,
            name: 'APP' + (marker & 15),
            start: idx,
            length: length,
            segment: br.SEGMENT(idx, length)
          });
        }
        idx += length;
      }
      return headers;
    };
    var JPEGMeta = { extractFrom: extractFrom };

    var invert = function (ir) {
      return Filters.invert(ir);
    };
    var sharpen = function (ir) {
      return Filters.sharpen(ir);
    };
    var emboss = function (ir) {
      return Filters.emboss(ir);
    };
    var gamma = function (ir, value) {
      return Filters.gamma(ir, value);
    };
    var exposure = function (ir, value) {
      return Filters.exposure(ir, value);
    };
    var colorize = function (ir, adjustR, adjustG, adjustB) {
      return Filters.colorize(ir, adjustR, adjustG, adjustB);
    };
    var brightness = function (ir, adjust) {
      return Filters.brightness(ir, adjust);
    };
    var hue = function (ir, adjust) {
      return Filters.hue(ir, adjust);
    };
    var saturate = function (ir, adjust) {
      return Filters.saturate(ir, adjust);
    };
    var contrast = function (ir, adjust) {
      return Filters.contrast(ir, adjust);
    };
    var grayscale = function (ir, adjust) {
      return Filters.grayscale(ir, adjust);
    };
    var sepia = function (ir, adjust) {
      return Filters.sepia(ir, adjust);
    };
    var flip$1 = function (ir, axis) {
      return ImageTools.flip(ir, axis);
    };
    var crop$1 = function (ir, x, y, w, h) {
      return ImageTools.crop(ir, x, y, w, h);
    };
    var resize$2 = function (ir, w, h) {
      return ImageTools.resize(ir, w, h);
    };
    var rotate$1 = function (ir, angle) {
      return ImageTools.rotate(ir, angle);
    };
    var exifRotate = function (ir) {
      var ROTATE_90 = 6;
      var ROTATE_180 = 3;
      var ROTATE_270 = 8;
      var checkRotation = function (data) {
        var orientation = data.tiff.Orientation;
        switch (orientation) {
        case ROTATE_90:
          return rotate$1(ir, 90);
        case ROTATE_180:
          return rotate$1(ir, 180);
        case ROTATE_270:
          return rotate$1(ir, 270);
        default:
          return ir;
        }
      };
      var notJpeg = function () {
        return ir;
      };
      return ir.toBlob().then(JPEGMeta.extractFrom).then(checkRotation, notJpeg);
    };
    var ImageTransformations = {
      invert: invert,
      sharpen: sharpen,
      emboss: emboss,
      brightness: brightness,
      hue: hue,
      saturate: saturate,
      contrast: contrast,
      grayscale: grayscale,
      sepia: sepia,
      colorize: colorize,
      gamma: gamma,
      exposure: exposure,
      flip: flip$1,
      crop: crop$1,
      resize: resize$2,
      rotate: rotate$1,
      exifRotate: exifRotate
    };

    var blobToImageResult = function (blob) {
      return ImageResult.fromBlob(blob);
    };
    var fromBlobAndUrlSync$1 = function (blob, uri) {
      return ImageResult.fromBlobAndUrlSync(blob, uri);
    };
    var imageToImageResult = function (image) {
      return ImageResult.fromImage(image);
    };
    var imageResultToBlob = function (ir, type, quality) {
      if (type === undefined && quality === undefined) {
        return imageResultToOriginalBlob(ir);
      } else {
        return ir.toAdjustedBlob(type, quality);
      }
    };
    var imageResultToOriginalBlob = function (ir) {
      return ir.toBlob();
    };
    var imageResultToDataURL = function (ir) {
      return ir.toDataURL();
    };
    var ResultConversions = {
      blobToImageResult: blobToImageResult,
      fromBlobAndUrlSync: fromBlobAndUrlSync$1,
      imageToImageResult: imageToImageResult,
      imageResultToBlob: imageResultToBlob,
      imageResultToOriginalBlob: imageResultToOriginalBlob,
      imageResultToDataURL: imageResultToDataURL
    };

    var url = function () {
      return Global$1.getOrDie('URL');
    };
    var createObjectURL = function (blob) {
      return url().createObjectURL(blob);
    };
    var revokeObjectURL = function (u) {
      url().revokeObjectURL(u);
    };
    var URL = {
      createObjectURL: createObjectURL,
      revokeObjectURL: revokeObjectURL
    };

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.Delay');

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.Promise');

    var global$4 = tinymce.util.Tools.resolve('tinymce.util.URI');

    var getToolbarItems = function (editor) {
      return editor.getParam('imagetools_toolbar', 'rotateleft rotateright flipv fliph editimage imageoptions');
    };
    var getProxyUrl = function (editor) {
      return editor.getParam('imagetools_proxy');
    };
    var getCorsHosts = function (editor) {
      return editor.getParam('imagetools_cors_hosts', [], 'string[]');
    };
    var getCredentialsHosts = function (editor) {
      return editor.getParam('imagetools_credentials_hosts', [], 'string[]');
    };
    var getApiKey = function (editor) {
      return editor.getParam('api_key', editor.getParam('imagetools_api_key', '', 'string'), 'string');
    };
    var getUploadTimeout = function (editor) {
      return editor.getParam('images_upload_timeout', 30000, 'number');
    };
    var shouldReuseFilename = function (editor) {
      return editor.getParam('images_reuse_filename', false, 'boolean');
    };

    function getImageSize(img) {
      var width, height;
      function isPxValue(value) {
        return /^[0-9\.]+px$/.test(value);
      }
      width = img.style.width;
      height = img.style.height;
      if (width || height) {
        if (isPxValue(width) && isPxValue(height)) {
          return {
            w: parseInt(width, 10),
            h: parseInt(height, 10)
          };
        }
        return null;
      }
      width = img.width;
      height = img.height;
      if (width && height) {
        return {
          w: parseInt(width, 10),
          h: parseInt(height, 10)
        };
      }
      return null;
    }
    function setImageSize(img, size) {
      var width, height;
      if (size) {
        width = img.style.width;
        height = img.style.height;
        if (width || height) {
          img.style.width = size.w + 'px';
          img.style.height = size.h + 'px';
          img.removeAttribute('data-mce-style');
        }
        width = img.width;
        height = img.height;
        if (width || height) {
          img.setAttribute('width', size.w);
          img.setAttribute('height', size.h);
        }
      }
    }
    function getNaturalImageSize(img) {
      return {
        w: img.naturalWidth,
        h: img.naturalHeight
      };
    }
    var ImageSize$1 = {
      getImageSize: getImageSize,
      setImageSize: setImageSize,
      getNaturalImageSize: getNaturalImageSize
    };

    var typeOf = function (x) {
      if (x === null)
        return 'null';
      var t = typeof x;
      if (t === 'object' && Array.prototype.isPrototypeOf(x))
        return 'array';
      if (t === 'object' && String.prototype.isPrototypeOf(x))
        return 'string';
      return t;
    };
    var isType = function (type) {
      return function (value) {
        return typeOf(value) === type;
      };
    };
    var isFunction = isType('function');

    var find = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i, xs)) {
          return Option.some(x);
        }
      }
      return Option.none();
    };
    var slice = Array.prototype.slice;
    var from$1 = isFunction(Array.from) ? Array.from : function (x) {
      return slice.call(x);
    };

    function XMLHttpRequest () {
      var f = Global$1.getOrDie('XMLHttpRequest');
      return new f();
    }

    var isValue = function (obj) {
      return obj !== null && obj !== undefined;
    };
    var traverse = function (json, path) {
      var value;
      value = path.reduce(function (result, key) {
        return isValue(result) ? result[key] : undefined;
      }, json);
      return isValue(value) ? value : null;
    };
    var requestUrlAsBlob = function (url, headers, withCredentials) {
      return new global$3(function (resolve) {
        var xhr;
        xhr = XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            resolve({
              status: xhr.status,
              blob: this.response
            });
          }
        };
        xhr.open('GET', url, true);
        xhr.withCredentials = withCredentials;
        global$1.each(headers, function (value, key) {
          xhr.setRequestHeader(key, value);
        });
        xhr.responseType = 'blob';
        xhr.send();
      });
    };
    var readBlob = function (blob) {
      return new global$3(function (resolve) {
        var fr = FileReader();
        fr.onload = function (e) {
          var data = e.target;
          resolve(data.result);
        };
        fr.readAsText(blob);
      });
    };
    var parseJson = function (text) {
      var json;
      try {
        json = JSON.parse(text);
      } catch (ex) {
      }
      return json;
    };
    var Utils = {
      traverse: traverse,
      readBlob: readBlob,
      requestUrlAsBlob: requestUrlAsBlob,
      parseJson: parseJson
    };

    var friendlyHttpErrors = [
      {
        code: 404,
        message: 'Could not find Image Proxy'
      },
      {
        code: 403,
        message: 'Rejected request'
      },
      {
        code: 0,
        message: 'Incorrect Image Proxy URL'
      }
    ];
    var friendlyServiceErrors = [
      {
        type: 'key_missing',
        message: 'The request did not include an api key.'
      },
      {
        type: 'key_not_found',
        message: 'The provided api key could not be found.'
      },
      {
        type: 'domain_not_trusted',
        message: 'The api key is not valid for the request origins.'
      }
    ];
    var isServiceErrorCode = function (code) {
      return code === 400 || code === 403 || code === 500;
    };
    var getHttpErrorMsg = function (status) {
      var message = find(friendlyHttpErrors, function (error) {
        return status === error.code;
      }).fold(constant('Unknown ImageProxy error'), function (error) {
        return error.message;
      });
      return 'ImageProxy HTTP error: ' + message;
    };
    var handleHttpError = function (status) {
      var message = getHttpErrorMsg(status);
      return global$3.reject(message);
    };
    var getServiceErrorMsg = function (type) {
      return find(friendlyServiceErrors, function (error) {
        return error.type === type;
      }).fold(constant('Unknown service error'), function (error) {
        return error.message;
      });
    };
    var getServiceError = function (text) {
      var serviceError = Utils.parseJson(text);
      var errorType = Utils.traverse(serviceError, [
        'error',
        'type'
      ]);
      var errorMsg = errorType ? getServiceErrorMsg(errorType) : 'Invalid JSON in service error message';
      return 'ImageProxy Service error: ' + errorMsg;
    };
    var handleServiceError = function (status, blob) {
      return Utils.readBlob(blob).then(function (text) {
        var serviceError = getServiceError(text);
        return global$3.reject(serviceError);
      });
    };
    var handleServiceErrorResponse = function (status, blob) {
      return isServiceErrorCode(status) ? handleServiceError(status, blob) : handleHttpError(status);
    };
    var Errors = {
      handleServiceErrorResponse: handleServiceErrorResponse,
      handleHttpError: handleHttpError,
      getHttpErrorMsg: getHttpErrorMsg,
      getServiceErrorMsg: getServiceErrorMsg
    };

    var appendApiKey = function (url, apiKey) {
      var separator = url.indexOf('?') === -1 ? '?' : '&';
      if (/[?&]apiKey=/.test(url) || !apiKey) {
        return url;
      } else {
        return url + separator + 'apiKey=' + encodeURIComponent(apiKey);
      }
    };
    var requestServiceBlob = function (url, apiKey) {
      var headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'tiny-api-key': apiKey
      };
      return Utils.requestUrlAsBlob(appendApiKey(url, apiKey), headers, false).then(function (result) {
        return result.status < 200 || result.status >= 300 ? Errors.handleServiceErrorResponse(result.status, result.blob) : global$3.resolve(result.blob);
      });
    };
    function requestBlob(url, withCredentials) {
      return Utils.requestUrlAsBlob(url, {}, withCredentials).then(function (result) {
        return result.status < 200 || result.status >= 300 ? Errors.handleHttpError(result.status) : global$3.resolve(result.blob);
      });
    }
    var getUrl = function (url, apiKey, withCredentials) {
      return apiKey ? requestServiceBlob(url, apiKey) : requestBlob(url, withCredentials);
    };

    var node = function () {
      var f = Global$1.getOrDie('Node');
      return f;
    };
    var compareDocumentPosition = function (a, b, match) {
      return (a.compareDocumentPosition(b) & match) !== 0;
    };
    var documentPositionPreceding = function (a, b) {
      return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_PRECEDING);
    };
    var documentPositionContainedBy = function (a, b) {
      return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_CONTAINED_BY);
    };
    var Node = {
      documentPositionPreceding: documentPositionPreceding,
      documentPositionContainedBy: documentPositionContainedBy
    };

    var cached = function (f) {
      var called = false;
      var r;
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (!called) {
          called = true;
          r = f.apply(null, args);
        }
        return r;
      };
    };

    var firstMatch = function (regexes, s) {
      for (var i = 0; i < regexes.length; i++) {
        var x = regexes[i];
        if (x.test(s))
          return x;
      }
      return undefined;
    };
    var find$1 = function (regexes, agent) {
      var r = firstMatch(regexes, agent);
      if (!r)
        return {
          major: 0,
          minor: 0
        };
      var group = function (i) {
        return Number(agent.replace(r, '$' + i));
      };
      return nu(group(1), group(2));
    };
    var detect = function (versionRegexes, agent) {
      var cleanedAgent = String(agent).toLowerCase();
      if (versionRegexes.length === 0)
        return unknown();
      return find$1(versionRegexes, cleanedAgent);
    };
    var unknown = function () {
      return nu(0, 0);
    };
    var nu = function (major, minor) {
      return {
        major: major,
        minor: minor
      };
    };
    var Version = {
      nu: nu,
      detect: detect,
      unknown: unknown
    };

    var edge = 'Edge';
    var chrome = 'Chrome';
    var ie = 'IE';
    var opera = 'Opera';
    var firefox = 'Firefox';
    var safari = 'Safari';
    var isBrowser = function (name, current) {
      return function () {
        return current === name;
      };
    };
    var unknown$1 = function () {
      return nu$1({
        current: undefined,
        version: Version.unknown()
      });
    };
    var nu$1 = function (info) {
      var current = info.current;
      var version = info.version;
      return {
        current: current,
        version: version,
        isEdge: isBrowser(edge, current),
        isChrome: isBrowser(chrome, current),
        isIE: isBrowser(ie, current),
        isOpera: isBrowser(opera, current),
        isFirefox: isBrowser(firefox, current),
        isSafari: isBrowser(safari, current)
      };
    };
    var Browser = {
      unknown: unknown$1,
      nu: nu$1,
      edge: constant(edge),
      chrome: constant(chrome),
      ie: constant(ie),
      opera: constant(opera),
      firefox: constant(firefox),
      safari: constant(safari)
    };

    var windows = 'Windows';
    var ios = 'iOS';
    var android = 'Android';
    var linux = 'Linux';
    var osx = 'OSX';
    var solaris = 'Solaris';
    var freebsd = 'FreeBSD';
    var isOS = function (name, current) {
      return function () {
        return current === name;
      };
    };
    var unknown$2 = function () {
      return nu$2({
        current: undefined,
        version: Version.unknown()
      });
    };
    var nu$2 = function (info) {
      var current = info.current;
      var version = info.version;
      return {
        current: current,
        version: version,
        isWindows: isOS(windows, current),
        isiOS: isOS(ios, current),
        isAndroid: isOS(android, current),
        isOSX: isOS(osx, current),
        isLinux: isOS(linux, current),
        isSolaris: isOS(solaris, current),
        isFreeBSD: isOS(freebsd, current)
      };
    };
    var OperatingSystem = {
      unknown: unknown$2,
      nu: nu$2,
      windows: constant(windows),
      ios: constant(ios),
      android: constant(android),
      linux: constant(linux),
      osx: constant(osx),
      solaris: constant(solaris),
      freebsd: constant(freebsd)
    };

    var DeviceType = function (os, browser, userAgent) {
      var isiPad = os.isiOS() && /ipad/i.test(userAgent) === true;
      var isiPhone = os.isiOS() && !isiPad;
      var isAndroid3 = os.isAndroid() && os.version.major === 3;
      var isAndroid4 = os.isAndroid() && os.version.major === 4;
      var isTablet = isiPad || isAndroid3 || isAndroid4 && /mobile/i.test(userAgent) === true;
      var isTouch = os.isiOS() || os.isAndroid();
      var isPhone = isTouch && !isTablet;
      var iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false;
      return {
        isiPad: constant(isiPad),
        isiPhone: constant(isiPhone),
        isTablet: constant(isTablet),
        isPhone: constant(isPhone),
        isTouch: constant(isTouch),
        isAndroid: os.isAndroid,
        isiOS: os.isiOS,
        isWebView: constant(iOSwebview)
      };
    };

    var detect$1 = function (candidates, userAgent) {
      var agent = String(userAgent).toLowerCase();
      return find(candidates, function (candidate) {
        return candidate.search(agent);
      });
    };
    var detectBrowser = function (browsers, userAgent) {
      return detect$1(browsers, userAgent).map(function (browser) {
        var version = Version.detect(browser.versionRegexes, userAgent);
        return {
          current: browser.name,
          version: version
        };
      });
    };
    var detectOs = function (oses, userAgent) {
      return detect$1(oses, userAgent).map(function (os) {
        var version = Version.detect(os.versionRegexes, userAgent);
        return {
          current: os.name,
          version: version
        };
      });
    };
    var UaString = {
      detectBrowser: detectBrowser,
      detectOs: detectOs
    };

    var contains = function (str, substr) {
      return str.indexOf(substr) !== -1;
    };

    var normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;
    var checkContains = function (target) {
      return function (uastring) {
        return contains(uastring, target);
      };
    };
    var browsers = [
      {
        name: 'Edge',
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: function (uastring) {
          var monstrosity = contains(uastring, 'edge/') && contains(uastring, 'chrome') && contains(uastring, 'safari') && contains(uastring, 'applewebkit');
          return monstrosity;
        }
      },
      {
        name: 'Chrome',
        versionRegexes: [
          /.*?chrome\/([0-9]+)\.([0-9]+).*/,
          normalVersionRegex
        ],
        search: function (uastring) {
          return contains(uastring, 'chrome') && !contains(uastring, 'chromeframe');
        }
      },
      {
        name: 'IE',
        versionRegexes: [
          /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
          /.*?rv:([0-9]+)\.([0-9]+).*/
        ],
        search: function (uastring) {
          return contains(uastring, 'msie') || contains(uastring, 'trident');
        }
      },
      {
        name: 'Opera',
        versionRegexes: [
          normalVersionRegex,
          /.*?opera\/([0-9]+)\.([0-9]+).*/
        ],
        search: checkContains('opera')
      },
      {
        name: 'Firefox',
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search: checkContains('firefox')
      },
      {
        name: 'Safari',
        versionRegexes: [
          normalVersionRegex,
          /.*?cpu os ([0-9]+)_([0-9]+).*/
        ],
        search: function (uastring) {
          return (contains(uastring, 'safari') || contains(uastring, 'mobile/')) && contains(uastring, 'applewebkit');
        }
      }
    ];
    var oses = [
      {
        name: 'Windows',
        search: checkContains('win'),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name: 'iOS',
        search: function (uastring) {
          return contains(uastring, 'iphone') || contains(uastring, 'ipad');
        },
        versionRegexes: [
          /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
          /.*cpu os ([0-9]+)_([0-9]+).*/,
          /.*cpu iphone os ([0-9]+)_([0-9]+).*/
        ]
      },
      {
        name: 'Android',
        search: checkContains('android'),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name: 'OSX',
        search: checkContains('os x'),
        versionRegexes: [/.*?os\ x\ ?([0-9]+)_([0-9]+).*/]
      },
      {
        name: 'Linux',
        search: checkContains('linux'),
        versionRegexes: []
      },
      {
        name: 'Solaris',
        search: checkContains('sunos'),
        versionRegexes: []
      },
      {
        name: 'FreeBSD',
        search: checkContains('freebsd'),
        versionRegexes: []
      }
    ];
    var PlatformInfo = {
      browsers: constant(browsers),
      oses: constant(oses)
    };

    var detect$2 = function (userAgent) {
      var browsers = PlatformInfo.browsers();
      var oses = PlatformInfo.oses();
      var browser = UaString.detectBrowser(browsers, userAgent).fold(Browser.unknown, Browser.nu);
      var os = UaString.detectOs(oses, userAgent).fold(OperatingSystem.unknown, OperatingSystem.nu);
      var deviceType = DeviceType(os, browser, userAgent);
      return {
        browser: browser,
        os: os,
        deviceType: deviceType
      };
    };
    var PlatformDetection = { detect: detect$2 };

    var detect$3 = cached(function () {
      var userAgent = domGlobals.navigator.userAgent;
      return PlatformDetection.detect(userAgent);
    });
    var PlatformDetection$1 = { detect: detect$3 };

    var fromHtml = function (html, scope) {
      var doc = scope || domGlobals.document;
      var div = doc.createElement('div');
      div.innerHTML = html;
      if (!div.hasChildNodes() || div.childNodes.length > 1) {
        domGlobals.console.error('HTML does not have a single root node', html);
        throw new Error('HTML must have a single root node');
      }
      return fromDom(div.childNodes[0]);
    };
    var fromTag = function (tag, scope) {
      var doc = scope || domGlobals.document;
      var node = doc.createElement(tag);
      return fromDom(node);
    };
    var fromText = function (text, scope) {
      var doc = scope || domGlobals.document;
      var node = doc.createTextNode(text);
      return fromDom(node);
    };
    var fromDom = function (node) {
      if (node === null || node === undefined) {
        throw new Error('Node cannot be null or undefined');
      }
      return { dom: constant(node) };
    };
    var fromPoint = function (docElm, x, y) {
      var doc = docElm.dom();
      return Option.from(doc.elementFromPoint(x, y)).map(fromDom);
    };
    var Element = {
      fromHtml: fromHtml,
      fromTag: fromTag,
      fromText: fromText,
      fromDom: fromDom,
      fromPoint: fromPoint
    };

    var ATTRIBUTE = domGlobals.Node.ATTRIBUTE_NODE;
    var CDATA_SECTION = domGlobals.Node.CDATA_SECTION_NODE;
    var COMMENT = domGlobals.Node.COMMENT_NODE;
    var DOCUMENT = domGlobals.Node.DOCUMENT_NODE;
    var DOCUMENT_TYPE = domGlobals.Node.DOCUMENT_TYPE_NODE;
    var DOCUMENT_FRAGMENT = domGlobals.Node.DOCUMENT_FRAGMENT_NODE;
    var ELEMENT = domGlobals.Node.ELEMENT_NODE;
    var TEXT = domGlobals.Node.TEXT_NODE;
    var PROCESSING_INSTRUCTION = domGlobals.Node.PROCESSING_INSTRUCTION_NODE;
    var ENTITY_REFERENCE = domGlobals.Node.ENTITY_REFERENCE_NODE;
    var ENTITY = domGlobals.Node.ENTITY_NODE;
    var NOTATION = domGlobals.Node.NOTATION_NODE;

    var ELEMENT$1 = ELEMENT;
    var is = function (element, selector) {
      var elem = element.dom();
      if (elem.nodeType !== ELEMENT$1) {
        return false;
      } else if (elem.matches !== undefined) {
        return elem.matches(selector);
      } else if (elem.msMatchesSelector !== undefined) {
        return elem.msMatchesSelector(selector);
      } else if (elem.webkitMatchesSelector !== undefined) {
        return elem.webkitMatchesSelector(selector);
      } else if (elem.mozMatchesSelector !== undefined) {
        return elem.mozMatchesSelector(selector);
      } else {
        throw new Error('Browser lacks native selectors');
      }
    };

    var regularContains = function (e1, e2) {
      var d1 = e1.dom();
      var d2 = e2.dom();
      return d1 === d2 ? false : d1.contains(d2);
    };
    var ieContains = function (e1, e2) {
      return Node.documentPositionContainedBy(e1.dom(), e2.dom());
    };
    var browser = PlatformDetection$1.detect().browser;
    var contains$1 = browser.isIE() ? ieContains : regularContains;

    var child = function (scope, predicate) {
      var result = find(scope.dom().childNodes, compose(predicate, Element.fromDom));
      return result.map(Element.fromDom);
    };

    var child$1 = function (scope, selector) {
      return child(scope, function (e) {
        return is(e, selector);
      });
    };

    var count = 0;
    var getFigureImg = function (elem) {
      return child$1(Element.fromDom(elem), 'img');
    };
    var isFigure = function (editor, elem) {
      return editor.dom.is(elem, 'figure');
    };
    var getEditableImage = function (editor, elem) {
      var isImage = function (imgNode) {
        return editor.dom.is(imgNode, 'img:not([data-mce-object],[data-mce-placeholder])');
      };
      var isEditable = function (imgNode) {
        return isImage(imgNode) && (isLocalImage(editor, imgNode) || isCorsImage(editor, imgNode) || editor.settings.imagetools_proxy);
      };
      if (isFigure(editor, elem)) {
        var imgOpt = getFigureImg(elem);
        return imgOpt.map(function (img) {
          return isEditable(img.dom()) ? Option.some(img.dom()) : Option.none();
        });
      }
      return isEditable(elem) ? Option.some(elem) : Option.none();
    };
    var displayError = function (editor, error) {
      editor.notificationManager.open({
        text: error,
        type: 'error'
      });
    };
    var getSelectedImage = function (editor) {
      var elem = editor.selection.getNode();
      if (isFigure(editor, elem)) {
        return getFigureImg(elem);
      } else {
        return Option.some(Element.fromDom(elem));
      }
    };
    var extractFilename = function (editor, url) {
      var m = url.match(/\/([^\/\?]+)?\.(?:jpeg|jpg|png|gif)(?:\?|$)/i);
      if (m) {
        return editor.dom.encode(m[1]);
      }
      return null;
    };
    var createId = function () {
      return 'imagetools' + count++;
    };
    var isLocalImage = function (editor, img) {
      var url = img.src;
      return url.indexOf('data:') === 0 || url.indexOf('blob:') === 0 || new global$4(url).host === editor.documentBaseURI.host;
    };
    var isCorsImage = function (editor, img) {
      return global$1.inArray(getCorsHosts(editor), new global$4(img.src).host) !== -1;
    };
    var isCorsWithCredentialsImage = function (editor, img) {
      return global$1.inArray(getCredentialsHosts(editor), new global$4(img.src).host) !== -1;
    };
    var imageToBlob$2 = function (editor, img) {
      var src = img.src, apiKey;
      if (isCorsImage(editor, img)) {
        return getUrl(img.src, null, isCorsWithCredentialsImage(editor, img));
      }
      if (!isLocalImage(editor, img)) {
        src = getProxyUrl(editor);
        src += (src.indexOf('?') === -1 ? '?' : '&') + 'url=' + encodeURIComponent(img.src);
        apiKey = getApiKey(editor);
        return getUrl(src, apiKey, false);
      }
      return BlobConversions.imageToBlob(img);
    };
    var findBlob = function (editor, img) {
      var blobInfo;
      blobInfo = editor.editorUpload.blobCache.getByUri(img.src);
      if (blobInfo) {
        return global$3.resolve(blobInfo.blob());
      }
      return imageToBlob$2(editor, img);
    };
    var startTimedUpload = function (editor, imageUploadTimerState) {
      var imageUploadTimer = global$2.setEditorTimeout(editor, function () {
        editor.editorUpload.uploadImagesAuto();
      }, getUploadTimeout(editor));
      imageUploadTimerState.set(imageUploadTimer);
    };
    var cancelTimedUpload = function (imageUploadTimerState) {
      global$2.clearTimeout(imageUploadTimerState.get());
    };
    var updateSelectedImage = function (editor, ir, uploadImmediately, imageUploadTimerState, selectedImage, size) {
      return ir.toBlob().then(function (blob) {
        var uri, name, blobCache, blobInfo;
        blobCache = editor.editorUpload.blobCache;
        uri = selectedImage.src;
        if (shouldReuseFilename(editor)) {
          blobInfo = blobCache.getByUri(uri);
          if (blobInfo) {
            uri = blobInfo.uri();
            name = blobInfo.name();
          } else {
            name = extractFilename(editor, uri);
          }
        }
        blobInfo = blobCache.create({
          id: createId(),
          blob: blob,
          base64: ir.toBase64(),
          uri: uri,
          name: name
        });
        blobCache.add(blobInfo);
        editor.undoManager.transact(function () {
          function imageLoadedHandler() {
            editor.$(selectedImage).off('load', imageLoadedHandler);
            editor.nodeChanged();
            if (uploadImmediately) {
              editor.editorUpload.uploadImagesAuto();
            } else {
              cancelTimedUpload(imageUploadTimerState);
              startTimedUpload(editor, imageUploadTimerState);
            }
          }
          editor.$(selectedImage).on('load', imageLoadedHandler);
          if (size) {
            editor.$(selectedImage).attr({
              width: size.w,
              height: size.h
            });
          }
          editor.$(selectedImage).attr({ src: blobInfo.blobUri() }).removeAttr('data-mce-src');
        });
        return blobInfo;
      });
    };
    var selectedImageOperation = function (editor, imageUploadTimerState, fn, size) {
      return function () {
        var imgOpt = getSelectedImage(editor);
        return imgOpt.fold(function () {
          displayError(editor, 'Could not find selected image');
        }, function (img) {
          return editor._scanForImages().then(function () {
            return findBlob(editor, img.dom());
          }).then(ResultConversions.blobToImageResult).then(fn).then(function (imageResult) {
            return updateSelectedImage(editor, imageResult, false, imageUploadTimerState, img.dom(), size);
          }, function (error) {
            displayError(editor, error);
          });
        });
      };
    };
    var rotate$2 = function (editor, imageUploadTimerState, angle) {
      return function () {
        var imgOpt = getSelectedImage(editor);
        var flippedSize = imgOpt.fold(function () {
          return null;
        }, function (img) {
          var size = ImageSize$1.getImageSize(img.dom());
          return size ? {
            w: size.h,
            h: size.w
          } : null;
        });
        return selectedImageOperation(editor, imageUploadTimerState, function (imageResult) {
          return ImageTransformations.rotate(imageResult, angle);
        }, flippedSize)();
      };
    };
    var flip$2 = function (editor, imageUploadTimerState, axis) {
      return function () {
        return selectedImageOperation(editor, imageUploadTimerState, function (imageResult) {
          return ImageTransformations.flip(imageResult, axis);
        })();
      };
    };
    var handleDialogBlob = function (editor, imageUploadTimerState, img, originalSize, blob) {
      return new global$3(function (resolve) {
        BlobConversions.blobToImage(blob).then(function (newImage) {
          var newSize = ImageSize$1.getNaturalImageSize(newImage);
          if (originalSize.w !== newSize.w || originalSize.h !== newSize.h) {
            if (ImageSize$1.getImageSize(img)) {
              ImageSize$1.setImageSize(img, newSize);
            }
          }
          URL.revokeObjectURL(newImage.src);
          return blob;
        }).then(ResultConversions.blobToImageResult).then(function (imageResult) {
          return updateSelectedImage(editor, imageResult, true, imageUploadTimerState, img);
        }, function () {
        });
      });
    };
    var Actions = {
      rotate: rotate$2,
      flip: flip$2,
      getEditableImage: getEditableImage,
      cancelTimedUpload: cancelTimedUpload,
      findBlob: findBlob,
      getSelectedImage: getSelectedImage,
      handleDialogBlob: handleDialogBlob
    };

    var saveState = constant('save-state');
    var disable = constant('disable');
    var enable = constant('enable');

    var createState = function (blob) {
      return {
        blob: blob,
        url: URL.createObjectURL(blob)
      };
    };
    var makeOpen = function (editor, imageUploadTimerState) {
      return function () {
        var getLoadedSpec = function (currentState) {
          return {
            title: 'Edit Image',
            size: 'large',
            body: {
              type: 'panel',
              items: [{
                  type: 'imagetools',
                  name: 'imagetools',
                  label: 'Edit Image',
                  currentState: currentState
                }]
            },
            buttons: [
              {
                type: 'cancel',
                name: 'cancel',
                text: 'Cancel'
              },
              {
                type: 'submit',
                name: 'save',
                text: 'Save',
                primary: true,
                disabled: true
              }
            ],
            onSubmit: function (api) {
              var blob = api.getData().imagetools.blob;
              originalImgOpt.each(function (originalImg) {
                originalSizeOpt.each(function (originalSize) {
                  Actions.handleDialogBlob(editor, imageUploadTimerState, originalImg.dom(), originalSize, blob);
                });
              });
              api.close();
            },
            onCancel: function () {
            },
            onAction: function (api, details) {
              switch (details.name) {
              case saveState():
                if (details.value) {
                  api.enable('save');
                } else {
                  api.disable('save');
                }
                break;
              case disable():
                api.disable('save');
                api.disable('cancel');
                break;
              case enable():
                api.enable('cancel');
                break;
              }
            }
          };
        };
        var originalImgOpt = Actions.getSelectedImage(editor);
        var originalSizeOpt = originalImgOpt.map(function (origImg) {
          return ImageSize$1.getNaturalImageSize(origImg.dom());
        });
        var imgOpt = Actions.getSelectedImage(editor);
        imgOpt.each(function (img) {
          Actions.getEditableImage(editor, img.dom()).each(function (_) {
            Actions.findBlob(editor, img.dom()).then(function (blob) {
              var state = createState(blob);
              editor.windowManager.open(getLoadedSpec(state));
            });
          });
        });
      };
    };
    var Dialog = { makeOpen: makeOpen };

    var register = function (editor, imageUploadTimerState) {
      global$1.each({
        mceImageRotateLeft: Actions.rotate(editor, imageUploadTimerState, -90),
        mceImageRotateRight: Actions.rotate(editor, imageUploadTimerState, 90),
        mceImageFlipVertical: Actions.flip(editor, imageUploadTimerState, 'v'),
        mceImageFlipHorizontal: Actions.flip(editor, imageUploadTimerState, 'h'),
        mceEditImage: Dialog.makeOpen(editor, imageUploadTimerState)
      }, function (fn, cmd) {
        editor.addCommand(cmd, fn);
      });
    };
    var Commands = { register: register };

    var setup = function (editor, imageUploadTimerState, lastSelectedImageState) {
      editor.on('NodeChange', function (e) {
        var lastSelectedImage = lastSelectedImageState.get();
        if (lastSelectedImage && lastSelectedImage.src !== e.element.src) {
          Actions.cancelTimedUpload(imageUploadTimerState);
          editor.editorUpload.uploadImagesAuto();
          lastSelectedImageState.set(null);
        }
        Actions.getEditableImage(editor, e.element).each(lastSelectedImageState.set);
      });
    };
    var UploadSelectedImage = { setup: setup };

    var register$1 = function (editor) {
      var cmd = function (command) {
        return function () {
          return editor.execCommand(command);
        };
      };
      editor.ui.registry.addButton('rotateleft', {
        tooltip: 'Rotate counterclockwise',
        icon: 'rotate-left',
        onAction: cmd('mceImageRotateLeft')
      });
      editor.ui.registry.addButton('rotateright', {
        tooltip: 'Rotate clockwise',
        icon: 'rotate-right',
        onAction: cmd('mceImageRotateRight')
      });
      editor.ui.registry.addButton('flipv', {
        tooltip: 'Flip vertically',
        icon: 'flip-vertically',
        onAction: cmd('mceImageFlipVertical')
      });
      editor.ui.registry.addButton('fliph', {
        tooltip: 'Flip horizontally',
        icon: 'flip-horizontally',
        onAction: cmd('mceImageFlipHorizontal')
      });
      editor.ui.registry.addButton('editimage', {
        tooltip: 'Edit image',
        icon: 'edit-image',
        onAction: cmd('mceEditImage'),
        onSetup: function (buttonApi) {
          var setDisabled = function () {
            var elementOpt = Actions.getSelectedImage(editor);
            elementOpt.each(function (element) {
              var disabled = Actions.getEditableImage(editor, element.dom()).isNone();
              buttonApi.setDisabled(disabled);
            });
          };
          editor.on('NodeChange', setDisabled);
          return function () {
            editor.off('NodeChange', setDisabled);
          };
        }
      });
      editor.ui.registry.addButton('imageoptions', {
        tooltip: 'Image options',
        icon: 'image-options',
        onAction: cmd('mceImage')
      });
      editor.ui.registry.addContextMenu('imagetools', {
        update: function (element) {
          return Actions.getEditableImage(editor, element).fold(function () {
            return [];
          }, function (_) {
            return [{
                text: 'Edit image',
                icon: 'edit-image',
                onAction: cmd('mceEditImage')
              }];
          });
        }
      });
    };
    var Buttons = { register: register$1 };

    var register$2 = function (editor) {
      editor.ui.registry.addContextToolbar('imagetools', {
        items: getToolbarItems(editor),
        predicate: function (elem) {
          return Actions.getEditableImage(editor, elem).isSome();
        },
        position: 'node',
        scope: 'node'
      });
    };
    var ContextToolbar = { register: register$2 };

    global.add('imagetools', function (editor) {
      var imageUploadTimerState = Cell(0);
      var lastSelectedImageState = Cell(null);
      Commands.register(editor, imageUploadTimerState);
      Buttons.register(editor);
      ContextToolbar.register(editor);
      UploadSelectedImage.setup(editor, imageUploadTimerState, lastSelectedImageState);
    });
    function Plugin () {
    }

    return Plugin;

}(window));
})();
