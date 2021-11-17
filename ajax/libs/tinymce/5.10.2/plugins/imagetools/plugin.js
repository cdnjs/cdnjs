/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.10.2 (2021-11-17)
 */
(function () {
    'use strict';

    var Cell = function (initial) {
      var value = initial;
      var get = function () {
        return value;
      };
      var set = function (v) {
        value = v;
      };
      return {
        get: get,
        set: set
      };
    };

    var global$5 = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var global$4 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var typeOf = function (x) {
      var t = typeof x;
      if (x === null) {
        return 'null';
      } else if (t === 'object' && (Array.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'Array')) {
        return 'array';
      } else if (t === 'object' && (String.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'String')) {
        return 'string';
      } else {
        return t;
      }
    };
    var isType = function (type) {
      return function (value) {
        return typeOf(value) === type;
      };
    };
    var isSimpleType = function (type) {
      return function (value) {
        return typeof value === type;
      };
    };
    var isArray = isType('array');
    var isNullable = function (a) {
      return a === null || a === undefined;
    };
    var isNonNullable = function (a) {
      return !isNullable(a);
    };
    var isFunction = isSimpleType('function');

    var noop = function () {
    };
    var constant = function (value) {
      return function () {
        return value;
      };
    };
    var identity = function (x) {
      return x;
    };
    var never = constant(false);
    var always = constant(true);

    var none = function () {
      return NONE;
    };
    var NONE = function () {
      var call = function (thunk) {
        return thunk();
      };
      var id = identity;
      var me = {
        fold: function (n, _s) {
          return n();
        },
        isSome: never,
        isNone: always,
        getOr: id,
        getOrThunk: call,
        getOrDie: function (msg) {
          throw new Error(msg || 'error: getOrDie called on none.');
        },
        getOrNull: constant(null),
        getOrUndefined: constant(undefined),
        or: id,
        orThunk: call,
        map: none,
        each: noop,
        bind: none,
        exists: never,
        forall: always,
        filter: function () {
          return none();
        },
        toArray: function () {
          return [];
        },
        toString: constant('none()')
      };
      return me;
    }();
    var some = function (a) {
      var constant_a = constant(a);
      var self = function () {
        return me;
      };
      var bind = function (f) {
        return f(a);
      };
      var me = {
        fold: function (n, s) {
          return s(a);
        },
        isSome: always,
        isNone: never,
        getOr: constant_a,
        getOrThunk: constant_a,
        getOrDie: constant_a,
        getOrNull: constant_a,
        getOrUndefined: constant_a,
        or: self,
        orThunk: self,
        map: function (f) {
          return some(f(a));
        },
        each: function (f) {
          f(a);
        },
        bind: bind,
        exists: bind,
        forall: bind,
        filter: function (f) {
          return f(a) ? me : NONE;
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
    var Optional = {
      some: some,
      none: none,
      from: from
    };

    var exports$1 = {}, module = { exports: exports$1 };
    (function (define, exports, module, require) {
      (function (global, factory) {
        typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.EphoxContactWrapper = factory());
      }(this, function () {
        var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
        var promise = { exports: {} };
        (function (module) {
          (function (root) {
            var setTimeoutFunc = setTimeout;
            function noop() {
            }
            function bind(fn, thisArg) {
              return function () {
                fn.apply(thisArg, arguments);
              };
            }
            function Promise(fn) {
              if (typeof this !== 'object')
                throw new TypeError('Promises must be constructed via new');
              if (typeof fn !== 'function')
                throw new TypeError('not a function');
              this._state = 0;
              this._handled = false;
              this._value = undefined;
              this._deferreds = [];
              doResolve(fn, this);
            }
            function handle(self, deferred) {
              while (self._state === 3) {
                self = self._value;
              }
              if (self._state === 0) {
                self._deferreds.push(deferred);
                return;
              }
              self._handled = true;
              Promise._immediateFn(function () {
                var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
                if (cb === null) {
                  (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
                  return;
                }
                var ret;
                try {
                  ret = cb(self._value);
                } catch (e) {
                  reject(deferred.promise, e);
                  return;
                }
                resolve(deferred.promise, ret);
              });
            }
            function resolve(self, newValue) {
              try {
                if (newValue === self)
                  throw new TypeError('A promise cannot be resolved with itself.');
                if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
                  var then = newValue.then;
                  if (newValue instanceof Promise) {
                    self._state = 3;
                    self._value = newValue;
                    finale(self);
                    return;
                  } else if (typeof then === 'function') {
                    doResolve(bind(then, newValue), self);
                    return;
                  }
                }
                self._state = 1;
                self._value = newValue;
                finale(self);
              } catch (e) {
                reject(self, e);
              }
            }
            function reject(self, newValue) {
              self._state = 2;
              self._value = newValue;
              finale(self);
            }
            function finale(self) {
              if (self._state === 2 && self._deferreds.length === 0) {
                Promise._immediateFn(function () {
                  if (!self._handled) {
                    Promise._unhandledRejectionFn(self._value);
                  }
                });
              }
              for (var i = 0, len = self._deferreds.length; i < len; i++) {
                handle(self, self._deferreds[i]);
              }
              self._deferreds = null;
            }
            function Handler(onFulfilled, onRejected, promise) {
              this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
              this.onRejected = typeof onRejected === 'function' ? onRejected : null;
              this.promise = promise;
            }
            function doResolve(fn, self) {
              var done = false;
              try {
                fn(function (value) {
                  if (done)
                    return;
                  done = true;
                  resolve(self, value);
                }, function (reason) {
                  if (done)
                    return;
                  done = true;
                  reject(self, reason);
                });
              } catch (ex) {
                if (done)
                  return;
                done = true;
                reject(self, ex);
              }
            }
            Promise.prototype['catch'] = function (onRejected) {
              return this.then(null, onRejected);
            };
            Promise.prototype.then = function (onFulfilled, onRejected) {
              var prom = new this.constructor(noop);
              handle(this, new Handler(onFulfilled, onRejected, prom));
              return prom;
            };
            Promise.all = function (arr) {
              var args = Array.prototype.slice.call(arr);
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
            Promise._immediateFn = typeof setImmediate === 'function' ? function (fn) {
              setImmediate(fn);
            } : function (fn) {
              setTimeoutFunc(fn, 0);
            };
            Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
              if (typeof console !== 'undefined' && console) {
                console.warn('Possible Unhandled Promise Rejection:', err);
              }
            };
            Promise._setImmediateFn = function _setImmediateFn(fn) {
              Promise._immediateFn = fn;
            };
            Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
              Promise._unhandledRejectionFn = fn;
            };
            if (module.exports) {
              module.exports = Promise;
            } else if (!root.Promise) {
              root.Promise = Promise;
            }
          }(commonjsGlobal));
        }(promise));
        var promisePolyfill = promise.exports;
        var Global = function () {
          if (typeof window !== 'undefined') {
            return window;
          } else {
            return Function('return this;')();
          }
        }();
        var promisePolyfill_1 = { boltExport: Global.Promise || promisePolyfill };
        return promisePolyfill_1;
      }));
    }(undefined, exports$1, module));
    var Promise$1 = module.exports.boltExport;

    var create$1 = function (width, height) {
      return resize(document.createElement('canvas'), width, height);
    };
    var clone = function (canvas) {
      var tCanvas = create$1(canvas.width, canvas.height);
      var ctx = get2dContext(tCanvas);
      ctx.drawImage(canvas, 0, 0);
      return tCanvas;
    };
    var get2dContext = function (canvas) {
      return canvas.getContext('2d');
    };
    var resize = function (canvas, width, height) {
      canvas.width = width;
      canvas.height = height;
      return canvas;
    };

    var getWidth = function (image) {
      return image.naturalWidth || image.width;
    };
    var getHeight = function (image) {
      return image.naturalHeight || image.height;
    };

    var imageToBlob$2 = function (image) {
      var src = image.src;
      if (src.indexOf('data:') === 0) {
        return dataUriToBlob(src);
      }
      return anyUriToBlob(src);
    };
    var blobToImage$1 = function (blob) {
      return new Promise$1(function (resolve, reject) {
        var blobUrl = URL.createObjectURL(blob);
        var image = new Image();
        var removeListeners = function () {
          image.removeEventListener('load', loaded);
          image.removeEventListener('error', error);
        };
        var loaded = function () {
          removeListeners();
          resolve(image);
        };
        var error = function () {
          removeListeners();
          reject('Unable to load data of type ' + blob.type + ': ' + blobUrl);
        };
        image.addEventListener('load', loaded);
        image.addEventListener('error', error);
        image.src = blobUrl;
        if (image.complete) {
          setTimeout(loaded, 0);
        }
      });
    };
    var anyUriToBlob = function (url) {
      return new Promise$1(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
          if (this.status === 200) {
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
    };
    var dataUriToBlobSync = function (uri) {
      var data = uri.split(',');
      var matches = /data:([^;]+)/.exec(data[0]);
      if (!matches) {
        return Optional.none();
      }
      var mimetype = matches[1];
      var base64 = data[1];
      var sliceSize = 1024;
      var byteCharacters = atob(base64);
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
        byteArrays[sliceIndex] = new Uint8Array(bytes);
      }
      return Optional.some(new Blob(byteArrays, { type: mimetype }));
    };
    var dataUriToBlob = function (uri) {
      return new Promise$1(function (resolve, reject) {
        dataUriToBlobSync(uri).fold(function () {
          reject('uri is not base64: ' + uri);
        }, resolve);
      });
    };
    var canvasToBlob = function (canvas, type, quality) {
      type = type || 'image/png';
      if (isFunction(HTMLCanvasElement.prototype.toBlob)) {
        return new Promise$1(function (resolve, reject) {
          canvas.toBlob(function (blob) {
            if (blob) {
              resolve(blob);
            } else {
              reject();
            }
          }, type, quality);
        });
      } else {
        return dataUriToBlob(canvas.toDataURL(type, quality));
      }
    };
    var canvasToDataURL = function (canvas, type, quality) {
      type = type || 'image/png';
      return canvas.toDataURL(type, quality);
    };
    var blobToCanvas = function (blob) {
      return blobToImage$1(blob).then(function (image) {
        revokeImageUrl(image);
        var canvas = create$1(getWidth(image), getHeight(image));
        var context = get2dContext(canvas);
        context.drawImage(image, 0, 0);
        return canvas;
      });
    };
    var blobToDataUri = function (blob) {
      return new Promise$1(function (resolve) {
        var reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });
    };
    var revokeImageUrl = function (image) {
      URL.revokeObjectURL(image.src);
    };

    var blobToImage = function (blob) {
      return blobToImage$1(blob);
    };
    var imageToBlob$1 = function (image) {
      return imageToBlob$2(image);
    };

    var nativeIndexOf = Array.prototype.indexOf;
    var rawIndexOf = function (ts, t) {
      return nativeIndexOf.call(ts, t);
    };
    var contains = function (xs, x) {
      return rawIndexOf(xs, x) > -1;
    };
    var each$1 = function (xs, f) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        f(x, i);
      }
    };
    var filter = function (xs, pred) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          r.push(x);
        }
      }
      return r;
    };
    var foldl = function (xs, f, acc) {
      each$1(xs, function (x, i) {
        acc = f(acc, x, i);
      });
      return acc;
    };
    var findUntil = function (xs, pred, until) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          return Optional.some(x);
        } else if (until(x, i)) {
          break;
        }
      }
      return Optional.none();
    };
    var find = function (xs, pred) {
      return findUntil(xs, pred, never);
    };
    var forall = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; ++i) {
        var x = xs[i];
        if (pred(x, i) !== true) {
          return false;
        }
      }
      return true;
    };

    var keys = Object.keys;
    var each = function (obj, f) {
      var props = keys(obj);
      for (var k = 0, len = props.length; k < len; k++) {
        var i = props[k];
        var x = obj[i];
        f(x, i);
      }
    };

    var generate = function (cases) {
      if (!isArray(cases)) {
        throw new Error('cases must be an array');
      }
      if (cases.length === 0) {
        throw new Error('there must be at least one case');
      }
      var constructors = [];
      var adt = {};
      each$1(cases, function (acase, count) {
        var keys$1 = keys(acase);
        if (keys$1.length !== 1) {
          throw new Error('one and only one name per case');
        }
        var key = keys$1[0];
        var value = acase[key];
        if (adt[key] !== undefined) {
          throw new Error('duplicate key detected:' + key);
        } else if (key === 'cata') {
          throw new Error('cannot have a case named cata (sorry)');
        } else if (!isArray(value)) {
          throw new Error('case arguments must be an array');
        }
        constructors.push(key);
        adt[key] = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var argLength = args.length;
          if (argLength !== value.length) {
            throw new Error('Wrong number of arguments to case ' + key + '. Expected ' + value.length + ' (' + value + '), got ' + argLength);
          }
          var match = function (branches) {
            var branchKeys = keys(branches);
            if (constructors.length !== branchKeys.length) {
              throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
            }
            var allReqd = forall(constructors, function (reqKey) {
              return contains(branchKeys, reqKey);
            });
            if (!allReqd) {
              throw new Error('Not all branches were specified when using match. Specified: ' + branchKeys.join(', ') + '\nRequired: ' + constructors.join(', '));
            }
            return branches[key].apply(null, args);
          };
          return {
            fold: function () {
              var foldArgs = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                foldArgs[_i] = arguments[_i];
              }
              if (foldArgs.length !== cases.length) {
                throw new Error('Wrong number of arguments to fold. Expected ' + cases.length + ', got ' + foldArgs.length);
              }
              var target = foldArgs[count];
              return target.apply(null, args);
            },
            match: match,
            log: function (label) {
              console.log(label, {
                constructors: constructors,
                constructor: key,
                params: args
              });
            }
          };
        };
      });
      return adt;
    };
    var Adt = { generate: generate };

    Adt.generate([
      {
        bothErrors: [
          'error1',
          'error2'
        ]
      },
      {
        firstError: [
          'error1',
          'value2'
        ]
      },
      {
        secondError: [
          'value1',
          'error2'
        ]
      },
      {
        bothValues: [
          'value1',
          'value2'
        ]
      }
    ]);

    var create = function (getCanvas, blob, uri) {
      var initialType = blob.type;
      var getType = constant(initialType);
      var toBlob = function () {
        return Promise$1.resolve(blob);
      };
      var toDataURL = constant(uri);
      var toBase64 = function () {
        return uri.split(',')[1];
      };
      var toAdjustedBlob = function (type, quality) {
        return getCanvas.then(function (canvas) {
          return canvasToBlob(canvas, type, quality);
        });
      };
      var toAdjustedDataURL = function (type, quality) {
        return getCanvas.then(function (canvas) {
          return canvasToDataURL(canvas, type, quality);
        });
      };
      var toAdjustedBase64 = function (type, quality) {
        return toAdjustedDataURL(type, quality).then(function (dataurl) {
          return dataurl.split(',')[1];
        });
      };
      var toCanvas = function () {
        return getCanvas.then(clone);
      };
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
    };
    var fromBlob = function (blob) {
      return blobToDataUri(blob).then(function (uri) {
        return create(blobToCanvas(blob), blob, uri);
      });
    };
    var fromCanvas = function (canvas, type) {
      return canvasToBlob(canvas, type).then(function (blob) {
        return create(Promise$1.resolve(canvas), blob, canvas.toDataURL());
      });
    };

    var ceilWithPrecision = function (num, precision) {
      if (precision === void 0) {
        precision = 2;
      }
      var mul = Math.pow(10, precision);
      var upper = Math.round(num * mul);
      return Math.ceil(upper / mul);
    };
    var rotate$2 = function (ir, angle) {
      return ir.toCanvas().then(function (canvas) {
        return applyRotate(canvas, ir.getType(), angle);
      });
    };
    var applyRotate = function (image, type, angle) {
      var degrees = angle < 0 ? 360 + angle : angle;
      var rad = degrees * Math.PI / 180;
      var width = image.width;
      var height = image.height;
      var sin = Math.sin(rad);
      var cos = Math.cos(rad);
      var newWidth = ceilWithPrecision(Math.abs(width * cos) + Math.abs(height * sin));
      var newHeight = ceilWithPrecision(Math.abs(width * sin) + Math.abs(height * cos));
      var canvas = create$1(newWidth, newHeight);
      var context = get2dContext(canvas);
      context.translate(newWidth / 2, newHeight / 2);
      context.rotate(rad);
      context.drawImage(image, -width / 2, -height / 2);
      return fromCanvas(canvas, type);
    };
    var flip$2 = function (ir, axis) {
      return ir.toCanvas().then(function (canvas) {
        return applyFlip(canvas, ir.getType(), axis);
      });
    };
    var applyFlip = function (image, type, axis) {
      var canvas = create$1(image.width, image.height);
      var context = get2dContext(canvas);
      if (axis === 'v') {
        context.scale(1, -1);
        context.drawImage(image, 0, -canvas.height);
      } else {
        context.scale(-1, 1);
        context.drawImage(image, -canvas.width, 0);
      }
      return fromCanvas(canvas, type);
    };

    var flip$1 = function (ir, axis) {
      return flip$2(ir, axis);
    };
    var rotate$1 = function (ir, angle) {
      return rotate$2(ir, angle);
    };

    var sendRequest = function (url, headers, withCredentials) {
      if (withCredentials === void 0) {
        withCredentials = false;
      }
      return new Promise$1(function (resolve) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            resolve({
              status: xhr.status,
              blob: xhr.response
            });
          }
        };
        xhr.open('GET', url, true);
        xhr.withCredentials = withCredentials;
        each(headers, function (value, key) {
          xhr.setRequestHeader(key, value);
        });
        xhr.responseType = 'blob';
        xhr.send();
      });
    };
    var readBlobText = function (blob) {
      return new Promise$1(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.onerror = function (e) {
          reject(e);
        };
        reader.readAsText(blob);
      });
    };
    var parseJson = function (text) {
      try {
        return Optional.some(JSON.parse(text));
      } catch (ex) {
        return Optional.none();
      }
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
        type: 'not_found',
        message: 'Failed to load image.'
      },
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
    var traverseJson = function (json, path) {
      var value = foldl(path, function (result, key) {
        return isNonNullable(result) ? result[key] : undefined;
      }, json);
      return Optional.from(value);
    };
    var isServiceErrorCode = function (code, blob) {
      return (blob === null || blob === void 0 ? void 0 : blob.type) === 'application/json' && (code === 400 || code === 403 || code === 404 || code === 500);
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
      return Promise$1.reject(message);
    };
    var getServiceErrorMsg = function (type) {
      return find(friendlyServiceErrors, function (error) {
        return error.type === type;
      }).fold(constant('Unknown service error'), function (error) {
        return error.message;
      });
    };
    var getServiceError = function (text) {
      var serviceError = parseJson(text);
      var errorMsg = serviceError.bind(function (err) {
        return traverseJson(err, [
          'error',
          'type'
        ]).map(getServiceErrorMsg);
      }).getOr('Invalid JSON in service error message');
      return 'ImageProxy Service error: ' + errorMsg;
    };
    var handleServiceError = function (blob) {
      return readBlobText(blob).then(function (text) {
        var serviceError = getServiceError(text);
        return Promise$1.reject(serviceError);
      });
    };
    var handleServiceErrorResponse = function (status, blob) {
      return isServiceErrorCode(status, blob) ? handleServiceError(blob) : handleHttpError(status);
    };

    var appendApiKey = function (url, apiKey) {
      var separator = url.indexOf('?') === -1 ? '?' : '&';
      if (/[?&]apiKey=/.test(url)) {
        return url;
      } else {
        return url + separator + 'apiKey=' + encodeURIComponent(apiKey);
      }
    };
    var isError = function (status) {
      return status < 200 || status >= 300;
    };
    var requestServiceBlob = function (url, apiKey) {
      var headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'tiny-api-key': apiKey
      };
      return sendRequest(appendApiKey(url, apiKey), headers).then(function (result) {
        return isError(result.status) ? handleServiceErrorResponse(result.status, result.blob) : Promise$1.resolve(result.blob);
      });
    };
    var requestBlob = function (url, withCredentials) {
      return sendRequest(url, {}, withCredentials).then(function (result) {
        return isError(result.status) ? handleHttpError(result.status) : Promise$1.resolve(result.blob);
      });
    };
    var getUrl = function (url, apiKey, withCredentials) {
      if (withCredentials === void 0) {
        withCredentials = false;
      }
      return apiKey ? requestServiceBlob(url, apiKey) : requestBlob(url, withCredentials);
    };

    var blobToImageResult = function (blob) {
      return fromBlob(blob);
    };

    var ELEMENT = 1;

    var fromHtml = function (html, scope) {
      var doc = scope || document;
      var div = doc.createElement('div');
      div.innerHTML = html;
      if (!div.hasChildNodes() || div.childNodes.length > 1) {
        console.error('HTML does not have a single root node', html);
        throw new Error('HTML must have a single root node');
      }
      return fromDom(div.childNodes[0]);
    };
    var fromTag = function (tag, scope) {
      var doc = scope || document;
      var node = doc.createElement(tag);
      return fromDom(node);
    };
    var fromText = function (text, scope) {
      var doc = scope || document;
      var node = doc.createTextNode(text);
      return fromDom(node);
    };
    var fromDom = function (node) {
      if (node === null || node === undefined) {
        throw new Error('Node cannot be null or undefined');
      }
      return { dom: node };
    };
    var fromPoint = function (docElm, x, y) {
      return Optional.from(docElm.dom.elementFromPoint(x, y)).map(fromDom);
    };
    var SugarElement = {
      fromHtml: fromHtml,
      fromTag: fromTag,
      fromText: fromText,
      fromDom: fromDom,
      fromPoint: fromPoint
    };

    var is = function (element, selector) {
      var dom = element.dom;
      if (dom.nodeType !== ELEMENT) {
        return false;
      } else {
        var elem = dom;
        if (elem.matches !== undefined) {
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
      }
    };

    typeof window !== 'undefined' ? window : Function('return this;')();

    var child$1 = function (scope, predicate) {
      var pred = function (node) {
        return predicate(SugarElement.fromDom(node));
      };
      var result = find(scope.dom.childNodes, pred);
      return result.map(SugarElement.fromDom);
    };

    var child = function (scope, selector) {
      return child$1(scope, function (e) {
        return is(e, selector);
      });
    };

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.Delay');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.Promise');

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.URI');

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
    var getFetchImage = function (editor) {
      return Optional.from(editor.getParam('imagetools_fetch_image', null, 'function'));
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

    var getImageSize = function (img) {
      var width, height;
      var isPxValue = function (value) {
        return /^[0-9\.]+px$/.test(value);
      };
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
    };
    var setImageSize = function (img, size) {
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
          img.setAttribute('width', String(size.w));
          img.setAttribute('height', String(size.h));
        }
      }
    };
    var getNaturalImageSize = function (img) {
      return {
        w: img.naturalWidth,
        h: img.naturalHeight
      };
    };

    var count = 0;
    var getFigureImg = function (elem) {
      return child(SugarElement.fromDom(elem), 'img');
    };
    var isFigure = function (editor, elem) {
      return editor.dom.is(elem, 'figure');
    };
    var isImage = function (editor, imgNode) {
      return editor.dom.is(imgNode, 'img:not([data-mce-object],[data-mce-placeholder])');
    };
    var getEditableImage = function (editor, node) {
      var isEditable = function (imgNode) {
        return isImage(editor, imgNode) && (isLocalImage(editor, imgNode) || isCorsImage(editor, imgNode) || isNonNullable(getProxyUrl(editor)));
      };
      if (isFigure(editor, node)) {
        return getFigureImg(node).bind(function (img) {
          return isEditable(img.dom) ? Optional.some(img.dom) : Optional.none();
        });
      } else {
        return isEditable(node) ? Optional.some(node) : Optional.none();
      }
    };
    var displayError = function (editor, error) {
      editor.notificationManager.open({
        text: error,
        type: 'error'
      });
    };
    var getSelectedImage = function (editor) {
      var elem = editor.selection.getNode();
      var figureElm = editor.dom.getParent(elem, 'figure.image');
      if (figureElm !== null && isFigure(editor, figureElm)) {
        return getFigureImg(figureElm);
      } else if (isImage(editor, elem)) {
        return Optional.some(SugarElement.fromDom(elem));
      } else {
        return Optional.none();
      }
    };
    var extractFilename = function (editor, url, group) {
      var m = url.match(/(?:\/|^)(([^\/\?]+)\.(?:[a-z0-9.]+))(?:\?|$)/i);
      return isNonNullable(m) ? editor.dom.encode(m[group]) : null;
    };
    var createId = function () {
      return 'imagetools' + count++;
    };
    var isLocalImage = function (editor, img) {
      var url = img.src;
      return url.indexOf('data:') === 0 || url.indexOf('blob:') === 0 || new global$1(url).host === editor.documentBaseURI.host;
    };
    var isCorsImage = function (editor, img) {
      return global$4.inArray(getCorsHosts(editor), new global$1(img.src).host) !== -1;
    };
    var isCorsWithCredentialsImage = function (editor, img) {
      return global$4.inArray(getCredentialsHosts(editor), new global$1(img.src).host) !== -1;
    };
    var defaultFetchImage = function (editor, img) {
      if (isCorsImage(editor, img)) {
        return getUrl(img.src, null, isCorsWithCredentialsImage(editor, img));
      }
      if (!isLocalImage(editor, img)) {
        var proxyUrl = getProxyUrl(editor);
        var src = proxyUrl + (proxyUrl.indexOf('?') === -1 ? '?' : '&') + 'url=' + encodeURIComponent(img.src);
        var apiKey = getApiKey(editor);
        return getUrl(src, apiKey, false);
      }
      return imageToBlob$1(img);
    };
    var imageToBlob = function (editor, img) {
      return getFetchImage(editor).fold(function () {
        return defaultFetchImage(editor, img);
      }, function (customFetchImage) {
        return customFetchImage(img);
      });
    };
    var findBlob = function (editor, img) {
      var blobInfo = editor.editorUpload.blobCache.getByUri(img.src);
      if (blobInfo) {
        return global$2.resolve(blobInfo.blob());
      }
      return imageToBlob(editor, img);
    };
    var startTimedUpload = function (editor, imageUploadTimerState) {
      var imageUploadTimer = global$3.setEditorTimeout(editor, function () {
        editor.editorUpload.uploadImagesAuto();
      }, getUploadTimeout(editor));
      imageUploadTimerState.set(imageUploadTimer);
    };
    var cancelTimedUpload = function (imageUploadTimerState) {
      global$3.clearTimeout(imageUploadTimerState.get());
    };
    var updateSelectedImage = function (editor, origBlob, ir, uploadImmediately, imageUploadTimerState, selectedImage, size) {
      return ir.toBlob().then(function (blob) {
        var uri, name, filename, blobInfo;
        var blobCache = editor.editorUpload.blobCache;
        uri = selectedImage.src;
        var useFilename = origBlob.type === blob.type;
        if (shouldReuseFilename(editor)) {
          blobInfo = blobCache.getByUri(uri);
          if (isNonNullable(blobInfo)) {
            uri = blobInfo.uri();
            name = blobInfo.name();
            filename = blobInfo.filename();
          } else {
            name = extractFilename(editor, uri, 2);
            filename = extractFilename(editor, uri, 1);
          }
        }
        blobInfo = blobCache.create({
          id: createId(),
          blob: blob,
          base64: ir.toBase64(),
          uri: uri,
          name: name,
          filename: useFilename ? filename : undefined
        });
        blobCache.add(blobInfo);
        editor.undoManager.transact(function () {
          var imageLoadedHandler = function () {
            editor.$(selectedImage).off('load', imageLoadedHandler);
            editor.nodeChanged();
            if (uploadImmediately) {
              editor.editorUpload.uploadImagesAuto();
            } else {
              cancelTimedUpload(imageUploadTimerState);
              startTimedUpload(editor, imageUploadTimerState);
            }
          };
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
            return findBlob(editor, img.dom);
          }).then(function (blob) {
            return blobToImageResult(blob).then(fn).then(function (imageResult) {
              return updateSelectedImage(editor, blob, imageResult, false, imageUploadTimerState, img.dom, size);
            });
          }).catch(function (error) {
            displayError(editor, error);
          });
        });
      };
    };
    var rotate = function (editor, imageUploadTimerState, angle) {
      return function () {
        var imgOpt = getSelectedImage(editor);
        var flippedSize = imgOpt.map(function (img) {
          var size = getImageSize(img.dom);
          return size ? {
            w: size.h,
            h: size.w
          } : null;
        }).getOrNull();
        return selectedImageOperation(editor, imageUploadTimerState, function (imageResult) {
          return rotate$1(imageResult, angle);
        }, flippedSize)();
      };
    };
    var flip = function (editor, imageUploadTimerState, axis) {
      return function () {
        return selectedImageOperation(editor, imageUploadTimerState, function (imageResult) {
          return flip$1(imageResult, axis);
        })();
      };
    };
    var handleDialogBlob = function (editor, imageUploadTimerState, img, originalSize, blob) {
      return blobToImage(blob).then(function (newImage) {
        var newSize = getNaturalImageSize(newImage);
        if (originalSize.w !== newSize.w || originalSize.h !== newSize.h) {
          if (getImageSize(img)) {
            setImageSize(img, newSize);
          }
        }
        URL.revokeObjectURL(newImage.src);
        return blob;
      }).then(blobToImageResult).then(function (imageResult) {
        return updateSelectedImage(editor, blob, imageResult, true, imageUploadTimerState, img);
      });
    };

    var saveState = 'save-state';
    var disable = 'disable';
    var enable = 'enable';

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
                  handleDialogBlob(editor, imageUploadTimerState, originalImg.dom, originalSize, blob);
                });
              });
              api.close();
            },
            onCancel: noop,
            onAction: function (api, details) {
              switch (details.name) {
              case saveState:
                if (details.value) {
                  api.enable('save');
                } else {
                  api.disable('save');
                }
                break;
              case disable:
                api.disable('save');
                api.disable('cancel');
                break;
              case enable:
                api.enable('cancel');
                break;
              }
            }
          };
        };
        var originalImgOpt = getSelectedImage(editor);
        var originalSizeOpt = originalImgOpt.map(function (origImg) {
          return getNaturalImageSize(origImg.dom);
        });
        originalImgOpt.each(function (img) {
          getEditableImage(editor, img.dom).each(function (_) {
            findBlob(editor, img.dom).then(function (blob) {
              var state = createState(blob);
              editor.windowManager.open(getLoadedSpec(state));
            });
          });
        });
      };
    };

    var register$2 = function (editor, imageUploadTimerState) {
      global$4.each({
        mceImageRotateLeft: rotate(editor, imageUploadTimerState, -90),
        mceImageRotateRight: rotate(editor, imageUploadTimerState, 90),
        mceImageFlipVertical: flip(editor, imageUploadTimerState, 'v'),
        mceImageFlipHorizontal: flip(editor, imageUploadTimerState, 'h'),
        mceEditImage: makeOpen(editor, imageUploadTimerState)
      }, function (fn, cmd) {
        editor.addCommand(cmd, fn);
      });
    };

    var setup = function (editor, imageUploadTimerState, lastSelectedImageState) {
      editor.on('NodeChange', function (e) {
        var lastSelectedImage = lastSelectedImageState.get();
        var selectedImage = getEditableImage(editor, e.element);
        if (lastSelectedImage && !selectedImage.exists(function (img) {
            return lastSelectedImage.src === img.src;
          })) {
          cancelTimedUpload(imageUploadTimerState);
          editor.editorUpload.uploadImagesAuto();
          lastSelectedImageState.set(null);
        }
        selectedImage.each(lastSelectedImageState.set);
      });
    };

    var register$1 = function (editor) {
      var changeHandlers = [];
      var cmd = function (command) {
        return function () {
          return editor.execCommand(command);
        };
      };
      var isEditableImage = function () {
        return getSelectedImage(editor).exists(function (element) {
          return getEditableImage(editor, element.dom).isSome();
        });
      };
      var onSetup = function (api) {
        var handler = function (isEditableImage) {
          return api.setDisabled(!isEditableImage);
        };
        handler(isEditableImage());
        changeHandlers = changeHandlers.concat([handler]);
        return function () {
          changeHandlers = filter(changeHandlers, function (h) {
            return h !== handler;
          });
        };
      };
      editor.on('NodeChange', function () {
        var isEditable = isEditableImage();
        each$1(changeHandlers, function (handler) {
          return handler(isEditable);
        });
      });
      editor.ui.registry.addButton('rotateleft', {
        tooltip: 'Rotate counterclockwise',
        icon: 'rotate-left',
        onAction: cmd('mceImageRotateLeft'),
        onSetup: onSetup
      });
      editor.ui.registry.addButton('rotateright', {
        tooltip: 'Rotate clockwise',
        icon: 'rotate-right',
        onAction: cmd('mceImageRotateRight'),
        onSetup: onSetup
      });
      editor.ui.registry.addButton('flipv', {
        tooltip: 'Flip vertically',
        icon: 'flip-vertically',
        onAction: cmd('mceImageFlipVertical'),
        onSetup: onSetup
      });
      editor.ui.registry.addButton('fliph', {
        tooltip: 'Flip horizontally',
        icon: 'flip-horizontally',
        onAction: cmd('mceImageFlipHorizontal'),
        onSetup: onSetup
      });
      editor.ui.registry.addButton('editimage', {
        tooltip: 'Edit image',
        icon: 'edit-image',
        onAction: cmd('mceEditImage'),
        onSetup: onSetup
      });
      editor.ui.registry.addButton('imageoptions', {
        tooltip: 'Image options',
        icon: 'image',
        onAction: cmd('mceImage')
      });
      editor.ui.registry.addContextMenu('imagetools', {
        update: function (element) {
          return getEditableImage(editor, element).map(function (_) {
            return {
              text: 'Edit image',
              icon: 'edit-image',
              onAction: cmd('mceEditImage')
            };
          }).toArray();
        }
      });
    };

    var register = function (editor) {
      editor.ui.registry.addContextToolbar('imagetools', {
        items: getToolbarItems(editor),
        predicate: function (elem) {
          return getEditableImage(editor, elem).isSome();
        },
        position: 'node',
        scope: 'node'
      });
    };

    function Plugin () {
      global$5.add('imagetools', function (editor) {
        var imageUploadTimerState = Cell(0);
        var lastSelectedImageState = Cell(null);
        register$2(editor, imageUploadTimerState);
        register$1(editor);
        register(editor);
        setup(editor, imageUploadTimerState, lastSelectedImageState);
      });
    }

    Plugin();

}());
