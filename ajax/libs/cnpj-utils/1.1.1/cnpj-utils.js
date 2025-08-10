/**
 * cnpj-utils v1.1.1
 *
 * @author Julio L. Muller.
 * @license MIT - 2020-2022
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.cnpjUtils = factory());
})(this, (function () { 'use strict';

  function _typeof$1(obj) {
    "@babel/helpers - typeof";

    return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof$1(obj);
  }

  function getAugmentedNamespace(n) {
  	if (n.__esModule) return n;
  	var a = Object.defineProperty({}, '__esModule', {value: true});
  	Object.keys(n).forEach(function (k) {
  		var d = Object.getOwnPropertyDescriptor(n, k);
  		Object.defineProperty(a, k, d.get ? d : {
  			enumerable: true,
  			get: function () {
  				return n[k];
  			}
  		});
  	});
  	return a;
  }

  /**
   * num-only v1.1.1
   *
   * @author Julio L. Muller.
   * @license MIT - 2020-2022
   */

  function numOnly$3(target) {
    return String(target).replace(/\D/g, '');
  }

  var index_cjs$3 = numOnly$3;

  var cjs$2 = {};

  /**
   * Copyright (C) 2017-present by Andrea Giammarchi - @WebReflection
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */


  var _ref$1 = '',
      replace$1 = _ref$1.replace; // escape

  var es$1 = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g;
  var ca$1 = /[&<>'"]/g;
  var esca$1 = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  };

  var pe$1 = function pe(m) {
    return esca$1[m];
  };
  /**
   * Safely escape HTML entities such as `&`, `<`, `>`, `"`, and `'`.
   * @param {string} es the input to safely escape
   * @returns {string} the escaped input, and it **throws** an error if
   *  the input type is unexpected, except for boolean and numbers,
   *  converted as string.
   */


  var escape$1 = function escape(es) {
    return replace$1.call(es, ca$1, pe$1);
  };

  cjs$2.escape = escape$1; // unescape


  var unes$1 = {
    '&amp;': '&',
    '&#38;': '&',
    '&lt;': '<',
    '&#60;': '<',
    '&gt;': '>',
    '&#62;': '>',
    '&apos;': "'",
    '&#39;': "'",
    '&quot;': '"',
    '&#34;': '"'
  };

  var cape$1 = function cape(m) {
    return unes$1[m];
  };
  /**
   * Safely unescape previously escaped entities such as `&`, `<`, `>`, `"`,
   * and `'`.
   * @param {string} un a previously escaped string
   * @returns {string} the unescaped input, and it **throws** an error if
   *  the input type is unexpected, except for boolean and numbers,
   *  converted as string.
   */


  var unescape$1 = function unescape(un) {
    return replace$1.call(un, es$1, cape$1);
  };

  cjs$2.unescape = unescape$1;

  var isMergeableObject = function isMergeableObject(value) {
    return isNonNullObject(value) && !isSpecial(value);
  };

  function isNonNullObject(value) {
    return !!value && _typeof$1(value) === 'object';
  }

  function isSpecial(value) {
    var stringValue = Object.prototype.toString.call(value);
    return stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value);
  } // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25


  var canUseSymbol = typeof Symbol === 'function' && Symbol["for"];
  var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol["for"]('react.element') : 0xeac7;

  function isReactElement(value) {
    return value.$$typeof === REACT_ELEMENT_TYPE;
  }

  function emptyTarget(val) {
    return Array.isArray(val) ? [] : {};
  }

  function cloneUnlessOtherwiseSpecified(value, options) {
    return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
  }

  function defaultArrayMerge(target, source, options) {
    return target.concat(source).map(function (element) {
      return cloneUnlessOtherwiseSpecified(element, options);
    });
  }

  function getMergeFunction(key, options) {
    if (!options.customMerge) {
      return deepmerge;
    }

    var customMerge = options.customMerge(key);
    return typeof customMerge === 'function' ? customMerge : deepmerge;
  }

  function getEnumerableOwnPropertySymbols(target) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
      return target.propertyIsEnumerable(symbol);
    }) : [];
  }

  function getKeys(target) {
    return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
  }

  function propertyIsOnObject(object, property) {
    try {
      return property in object;
    } catch (_) {
      return false;
    }
  } // Protects from prototype poisoning and unexpected merging up the prototype chain.


  function propertyIsUnsafe(target, key) {
    return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
    && !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
    && Object.propertyIsEnumerable.call(target, key)); // and also unsafe if they're nonenumerable.
  }

  function mergeObject(target, source, options) {
    var destination = {};

    if (options.isMergeableObject(target)) {
      getKeys(target).forEach(function (key) {
        destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
      });
    }

    getKeys(source).forEach(function (key) {
      if (propertyIsUnsafe(target, key)) {
        return;
      }

      if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
        destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
      } else {
        destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
      }
    });
    return destination;
  }

  function deepmerge(target, source, options) {
    options = options || {};
    options.arrayMerge = options.arrayMerge || defaultArrayMerge;
    options.isMergeableObject = options.isMergeableObject || isMergeableObject; // cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
    // implementations can use it. The caller may not replace it.

    options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

    if (!sourceAndTargetTypesMatch) {
      return cloneUnlessOtherwiseSpecified(source, options);
    } else if (sourceIsArray) {
      return options.arrayMerge(target, source, options);
    } else {
      return mergeObject(target, source, options);
    }
  }

  deepmerge.all = function deepmergeAll(array, options) {
    if (!Array.isArray(array)) {
      throw new Error('first argument should be an array');
    }

    return array.reduce(function (prev, next) {
      return deepmerge(prev, next, options);
    }, {});
  };

  var deepmerge_1 = deepmerge;
  var cjs$1 = deepmerge_1;

  var numOnly$2 = index_cjs$3;
  var htmlEscaper$1 = cjs$2;
  var mergeDeep$1 = cjs$1;

  function _interopDefaultLegacy$3(e) {
    return e && _typeof$1(e) === 'object' && 'default' in e ? e : {
      'default': e
    };
  }

  var numOnly__default$2 = /*#__PURE__*/_interopDefaultLegacy$3(numOnly$2);

  var mergeDeep__default$1 = /*#__PURE__*/_interopDefaultLegacy$3(mergeDeep$1);

  var defaultOptions$2 = {
    delimiters: {
      dot: '.',
      slash: '/',
      dash: '-'
    },
    hiddenRange: {
      start: 5,
      end: 13
    },
    onFail: function onFail(value) {
      return value;
    },
    hiddenKey: '*',
    hidden: false,
    escape: false
  };
  /**
   * Merge custom options to the default ones.
   */

  function mergeOptions$2(customOptions) {
    if (customOptions === void 0) {
      customOptions = {};
    }

    var options = mergeDeep__default$1['default'](defaultOptions$2, customOptions);

    if (options.hidden) {
      if (isNaN(options.hiddenRange.start) || options.hiddenRange.start < 0 || options.hiddenRange.start > 13) {
        throw new TypeError('Option "hiddenRange.start" must be a number between 0 and 13.');
      }

      if (isNaN(options.hiddenRange.end) || options.hiddenRange.end < 0 || options.hiddenRange.end > 13) {
        throw new TypeError('Option "hiddenRange.end" must be a number between 0 and 13.');
      }

      if (options.hiddenRange.start > options.hiddenRange.end) {
        var aux = options.hiddenRange.start;
        options.hiddenRange.start = options.hiddenRange.end;
        options.hiddenRange.end = aux;
      }
    }

    if (typeof options.onFail !== 'function') {
      throw new TypeError('The option "onFail" must be a callback function.');
    }

    return options;
  }
  /**
   * Validate a given CNPJ char sequence.
   */


  function cnpjFmt$1(cnpjString, options) {
    var CNPJ_LENGTH = 14;
    var cnpjArray = numOnly__default$2['default'](cnpjString).split('');
    var customOptions = mergeOptions$2(options);

    if (cnpjArray.length !== CNPJ_LENGTH) {
      var error = new Error("Parameter \"" + cnpjString + "\" does not contain " + CNPJ_LENGTH + " digits.");
      return customOptions.onFail(cnpjString, error);
    }

    if (customOptions.hidden) {
      for (var i = customOptions.hiddenRange.start; i <= customOptions.hiddenRange.end; i++) {
        cnpjArray[i] = customOptions.hiddenKey;
      }
    }

    cnpjArray.splice(12, 0, customOptions.delimiters.dash);
    cnpjArray.splice(8, 0, customOptions.delimiters.slash);
    cnpjArray.splice(5, 0, customOptions.delimiters.dot);
    cnpjArray.splice(2, 0, customOptions.delimiters.dot);
    var cnpjPretty = cnpjArray.join('');

    if (customOptions.escape) {
      return htmlEscaper$1.escape(cnpjPretty);
    }

    return cnpjPretty;
  }

  var index_cjs$2 = cnpjFmt$1;

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };

  function __extends(d, b) {
      if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  function __rest(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                  t[p[i]] = s[p[i]];
          }
      return t;
  }

  function __decorate(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
  }

  function __param(paramIndex, decorator) {
      return function (target, key) { decorator(target, key, paramIndex); }
  }

  function __metadata(metadataKey, metadataValue) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
  }

  function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }

  function __generator(thisArg, body) {
      var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [op[0] & 2, t.value];
              switch (op[0]) {
                  case 0: case 1: t = op; break;
                  case 4: _.label++; return { value: op[1], done: false };
                  case 5: _.label++; y = op[1]; op = [0]; continue;
                  case 7: op = _.ops.pop(); _.trys.pop(); continue;
                  default:
                      if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                      if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                      if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                      if (t[2]) _.ops.pop();
                      _.trys.pop(); continue;
              }
              op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
      }
  }

  var __createBinding = Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  });

  function __exportStar(m, o) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
  }

  function __values(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
          next: function () {
              if (o && i >= o.length) o = void 0;
              return { value: o && o[i++], done: !o };
          }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }

  function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      }
      catch (error) { e = { error: error }; }
      finally {
          try {
              if (r && !r.done && (m = i["return"])) m.call(i);
          }
          finally { if (e) throw e.error; }
      }
      return ar;
  }

  /** @deprecated */
  function __spread() {
      for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read(arguments[i]));
      return ar;
  }

  /** @deprecated */
  function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
      return r;
  }

  function __spreadArray(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
              if (!ar) ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
          }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
  }

  function __await(v) {
      return this instanceof __await ? (this.v = v, this) : new __await(v);
  }

  function __asyncGenerator(thisArg, _arguments, generator) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var g = generator.apply(thisArg, _arguments || []), i, q = [];
      return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
      function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
      function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
      function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
      function fulfill(value) { resume("next", value); }
      function reject(value) { resume("throw", value); }
      function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
  }

  function __asyncDelegator(o) {
      var i, p;
      return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
      function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
  }

  function __asyncValues(o) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var m = o[Symbol.asyncIterator], i;
      return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
      function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
      function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
  }

  function __makeTemplateObject(cooked, raw) {
      if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
      return cooked;
  }
  var __setModuleDefault = Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  };

  function __importStar(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  }

  function __importDefault(mod) {
      return (mod && mod.__esModule) ? mod : { default: mod };
  }

  function __classPrivateFieldGet(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  }

  function __classPrivateFieldSet(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
  }

  var _tslib = /*#__PURE__*/Object.freeze({
    __proto__: null,
    __extends: __extends,
    get __assign () { return __assign; },
    __rest: __rest,
    __decorate: __decorate,
    __param: __param,
    __metadata: __metadata,
    __awaiter: __awaiter,
    __generator: __generator,
    __createBinding: __createBinding,
    __exportStar: __exportStar,
    __values: __values,
    __read: __read,
    __spread: __spread,
    __spreadArrays: __spreadArrays,
    __spreadArray: __spreadArray,
    __await: __await,
    __asyncGenerator: __asyncGenerator,
    __asyncDelegator: __asyncDelegator,
    __asyncValues: __asyncValues,
    __makeTemplateObject: __makeTemplateObject,
    __importStar: __importStar,
    __importDefault: __importDefault,
    __classPrivateFieldGet: __classPrivateFieldGet,
    __classPrivateFieldSet: __classPrivateFieldSet
  });

  var require$$4 = /*@__PURE__*/getAugmentedNamespace(_tslib);

  var require$$0 = index_cjs$3;
  var require$$2 = cjs$1;
  var tslib = require$$4;

  function _interopDefaultLegacy$2(e) {
    return e && _typeof$1(e) === 'object' && 'default' in e ? e : {
      'default': e
    };
  }

  var require$$0__default = /*#__PURE__*/_interopDefaultLegacy$2(require$$0);

  var require$$2__default = /*#__PURE__*/_interopDefaultLegacy$2(require$$2);

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var cjs = {};
  /**
   * Copyright (C) 2017-present by Andrea Giammarchi - @WebReflection
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */

  var _ref = '',
      replace = _ref.replace; // escape

  var es = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g;
  var ca = /[&<>'"]/g;
  var esca = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  };

  var pe = function pe(m) {
    return esca[m];
  };
  /**
   * Safely escape HTML entities such as `&`, `<`, `>`, `"`, and `'`.
   * @param {string} es the input to safely escape
   * @returns {string} the escaped input, and it **throws** an error if
   *  the input type is unexpected, except for boolean and numbers,
   *  converted as string.
   */


  var escape = function escape(es) {
    return replace.call(es, ca, pe);
  };

  cjs.escape = escape; // unescape

  var unes = {
    '&amp;': '&',
    '&#38;': '&',
    '&lt;': '<',
    '&#60;': '<',
    '&gt;': '>',
    '&#62;': '>',
    '&apos;': "'",
    '&#39;': "'",
    '&quot;': '"',
    '&#34;': '"'
  };

  var cape = function cape(m) {
    return unes[m];
  };
  /**
   * Safely unescape previously escaped entities such as `&`, `<`, `>`, `"`,
   * and `'`.
   * @param {string} un a previously escaped string
   * @returns {string} the unescaped input, and it **throws** an error if
   *  the input type is unexpected, except for boolean and numbers,
   *  converted as string.
   */


  var unescape = function unescape(un) {
    return replace.call(un, es, cape);
  };

  cjs.unescape = unescape;
  var numOnly$1 = require$$0__default['default'];
  var htmlEscaper = cjs;
  var mergeDeep = require$$2__default['default'];

  function _interopDefaultLegacy$1$1(e) {
    return e && _typeof(e) === 'object' && 'default' in e ? e : {
      'default': e
    };
  }

  var numOnly__default$1 = /*#__PURE__*/_interopDefaultLegacy$1$1(numOnly$1);

  var mergeDeep__default = /*#__PURE__*/_interopDefaultLegacy$1$1(mergeDeep);

  var defaultOptions$1 = {
    delimiters: {
      dot: '.',
      slash: '/',
      dash: '-'
    },
    hiddenRange: {
      start: 5,
      end: 13
    },
    onFail: function onFail(value) {
      return value;
    },
    hiddenKey: '*',
    hidden: false,
    escape: false
  };
  /**
   * Merge custom options to the default ones.
   */

  function mergeOptions$1(customOptions) {
    if (customOptions === void 0) {
      customOptions = {};
    }

    var options = mergeDeep__default['default'](defaultOptions$1, customOptions);

    if (options.hidden) {
      if (isNaN(options.hiddenRange.start) || options.hiddenRange.start < 0 || options.hiddenRange.start > 13) {
        throw new TypeError('Option "hiddenRange.start" must be a number between 0 and 13.');
      }

      if (isNaN(options.hiddenRange.end) || options.hiddenRange.end < 0 || options.hiddenRange.end > 13) {
        throw new TypeError('Option "hiddenRange.end" must be a number between 0 and 13.');
      }

      if (options.hiddenRange.start > options.hiddenRange.end) {
        var aux = options.hiddenRange.start;
        options.hiddenRange.start = options.hiddenRange.end;
        options.hiddenRange.end = aux;
      }
    }

    if (typeof options.onFail !== 'function') {
      throw new TypeError('The option "onFail" must be a callback function.');
    }

    return options;
  }
  /**
   * Validate a given CNPJ char sequence.
   */


  function cnpjFmt(cnpjString, options) {
    var CNPJ_LENGTH = 14;
    var cnpjArray = numOnly__default$1['default'](cnpjString).split('');
    var customOptions = mergeOptions$1(options);

    if (cnpjArray.length !== CNPJ_LENGTH) {
      var error = new Error("Parameter \"" + cnpjString + "\" does not contain " + CNPJ_LENGTH + " digits.");
      return customOptions.onFail(cnpjString, error);
    }

    if (customOptions.hidden) {
      for (var i = customOptions.hiddenRange.start; i <= customOptions.hiddenRange.end; i++) {
        cnpjArray[i] = customOptions.hiddenKey;
      }
    }

    cnpjArray.splice(12, 0, customOptions.delimiters.dash);
    cnpjArray.splice(8, 0, customOptions.delimiters.slash);
    cnpjArray.splice(5, 0, customOptions.delimiters.dot);
    cnpjArray.splice(2, 0, customOptions.delimiters.dot);
    var cnpjPretty = cnpjArray.join('');

    if (customOptions.escape) {
      return htmlEscaper.escape(cnpjPretty);
    }

    return cnpjPretty;
  }

  var index_cjs$1 = cnpjFmt;
  var defaultOptions = {
    format: false,
    prefix: ''
  };
  /**
   * Merge custom options to the default ones.
   */

  function mergeOptions(customOptions) {
    if (customOptions === void 0) {
      customOptions = {};
    }

    return require$$2__default['default'](defaultOptions, customOptions);
  }
  /**
   * Calculate the verifier digit based on CNPJ base numeric sequence.
   */


  function calculateDigit(cnpjSequence) {
    var index = 2;

    var sum = tslib.__spreadArray([], cnpjSequence).reverse().reduce(function (previousResult, number) {
      var result = previousResult + number * index;
      index = index === 9 ? 2 : index + 1;
      return result;
    }, 0);

    var remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }
  /**
   * Generate an array of random numbers (as string) between 0 and  9.
   */


  function numberGenerator(length) {
    var numericSequence = [];

    while (numericSequence.length < length) {
      var random = Math.random() * 10;
      var integer = Math.floor(random);
      numericSequence.push(integer);
    }

    return numericSequence;
  }
  /**
   * Generate a valid CNPJ (Brazilian company ID) numeric sequence.
   */


  function cnpjGen$1(options) {
    var userOptions = mergeOptions(options);
    var baseSequence = require$$0__default['default'](userOptions.prefix);
    var prefixLength = baseSequence.length;

    if (prefixLength < 0 || prefixLength > 12) {
      throw new Error('Option "prefix" must be a string containing between 1 and 12 digits.');
    }

    if (prefixLength > 8 && baseSequence.slice(8) === '0000') {
      throw new Error('The branch ID (characters 8 to 11) cannot be "0000".');
    }

    var branchID = [0, 0, 0, Math.ceil(Math.random() * 9)];
    var cnpjSequence = baseSequence.split('').map(Number).concat(numberGenerator(8 - prefixLength)).concat(branchID.slice(0, 12 - prefixLength));
    cnpjSequence.push(calculateDigit(cnpjSequence));
    cnpjSequence.push(calculateDigit(cnpjSequence));
    return userOptions.format ? index_cjs$1(cnpjSequence.join('')) : cnpjSequence.join('');
  }

  var index_cjs_1 = cnpjGen$1;

  var cnpjGen = index_cjs_1;
  var numOnly = index_cjs$3;

  function _interopDefaultLegacy$1(e) {
    return e && _typeof$1(e) === 'object' && 'default' in e ? e : {
      'default': e
    };
  }

  var cnpjGen__default = /*#__PURE__*/_interopDefaultLegacy$1(cnpjGen);

  var numOnly__default = /*#__PURE__*/_interopDefaultLegacy$1(numOnly);
  /**
   * Validate a given CNPJ (Brazilian company ID) char sequence.
   *
   */


  function cnpjVal(cnpjString) {
    var CNPJ_LENGTH = 14;
    var cnpjDigits = numOnly__default['default'](cnpjString);

    if (cnpjDigits.length !== CNPJ_LENGTH) {
      return false;
    }

    return cnpjDigits === cnpjGen__default['default']({
      prefix: cnpjDigits.slice(0, 12)
    });
  }

  var index_cjs = cnpjVal;

  var format = index_cjs$2;
  var generate = index_cjs_1;
  var isValid = index_cjs;
  var module = { format: format, generate: generate, isValid: isValid };

  return module;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY25wai11dGlscy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2h0bWwtZXNjYXBlci9janMvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZGVlcG1lcmdlL2Rpc3QvY2pzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BsYWN1c3NvZnQvY25wai1nZW4vYnVpbGQvaW5kZXguY2pzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogQ29weXJpZ2h0IChDKSAyMDE3LXByZXNlbnQgYnkgQW5kcmVhIEdpYW1tYXJjaGkgLSBAV2ViUmVmbGVjdGlvblxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuY29uc3Qge3JlcGxhY2V9ID0gJyc7XG5cbi8vIGVzY2FwZVxuY29uc3QgZXMgPSAvJig/OmFtcHwjMzh8bHR8IzYwfGd0fCM2MnxhcG9zfCMzOXxxdW90fCMzNCk7L2c7XG5jb25zdCBjYSA9IC9bJjw+J1wiXS9nO1xuXG5jb25zdCBlc2NhID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgXCInXCI6ICcmIzM5OycsXG4gICdcIic6ICcmcXVvdDsnXG59O1xuY29uc3QgcGUgPSBtID0+IGVzY2FbbV07XG5cbi8qKlxuICogU2FmZWx5IGVzY2FwZSBIVE1MIGVudGl0aWVzIHN1Y2ggYXMgYCZgLCBgPGAsIGA+YCwgYFwiYCwgYW5kIGAnYC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBlcyB0aGUgaW5wdXQgdG8gc2FmZWx5IGVzY2FwZVxuICogQHJldHVybnMge3N0cmluZ30gdGhlIGVzY2FwZWQgaW5wdXQsIGFuZCBpdCAqKnRocm93cyoqIGFuIGVycm9yIGlmXG4gKiAgdGhlIGlucHV0IHR5cGUgaXMgdW5leHBlY3RlZCwgZXhjZXB0IGZvciBib29sZWFuIGFuZCBudW1iZXJzLFxuICogIGNvbnZlcnRlZCBhcyBzdHJpbmcuXG4gKi9cbmNvbnN0IGVzY2FwZSA9IGVzID0+IHJlcGxhY2UuY2FsbChlcywgY2EsIHBlKTtcbmV4cG9ydHMuZXNjYXBlID0gZXNjYXBlO1xuXG5cbi8vIHVuZXNjYXBlXG5jb25zdCB1bmVzID0ge1xuICAnJmFtcDsnOiAnJicsXG4gICcmIzM4Oyc6ICcmJyxcbiAgJyZsdDsnOiAnPCcsXG4gICcmIzYwOyc6ICc8JyxcbiAgJyZndDsnOiAnPicsXG4gICcmIzYyOyc6ICc+JyxcbiAgJyZhcG9zOyc6IFwiJ1wiLFxuICAnJiMzOTsnOiBcIidcIixcbiAgJyZxdW90Oyc6ICdcIicsXG4gICcmIzM0Oyc6ICdcIidcbn07XG5jb25zdCBjYXBlID0gbSA9PiB1bmVzW21dO1xuXG4vKipcbiAqIFNhZmVseSB1bmVzY2FwZSBwcmV2aW91c2x5IGVzY2FwZWQgZW50aXRpZXMgc3VjaCBhcyBgJmAsIGA8YCwgYD5gLCBgXCJgLFxuICogYW5kIGAnYC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB1biBhIHByZXZpb3VzbHkgZXNjYXBlZCBzdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSB1bmVzY2FwZWQgaW5wdXQsIGFuZCBpdCAqKnRocm93cyoqIGFuIGVycm9yIGlmXG4gKiAgdGhlIGlucHV0IHR5cGUgaXMgdW5leHBlY3RlZCwgZXhjZXB0IGZvciBib29sZWFuIGFuZCBudW1iZXJzLFxuICogIGNvbnZlcnRlZCBhcyBzdHJpbmcuXG4gKi9cbmNvbnN0IHVuZXNjYXBlID0gdW4gPT4gcmVwbGFjZS5jYWxsKHVuLCBlcywgY2FwZSk7XG5leHBvcnRzLnVuZXNjYXBlID0gdW5lc2NhcGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc01lcmdlYWJsZU9iamVjdCA9IGZ1bmN0aW9uIGlzTWVyZ2VhYmxlT2JqZWN0KHZhbHVlKSB7XG5cdHJldHVybiBpc05vbk51bGxPYmplY3QodmFsdWUpXG5cdFx0JiYgIWlzU3BlY2lhbCh2YWx1ZSlcbn07XG5cbmZ1bmN0aW9uIGlzTm9uTnVsbE9iamVjdCh2YWx1ZSkge1xuXHRyZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnXG59XG5cbmZ1bmN0aW9uIGlzU3BlY2lhbCh2YWx1ZSkge1xuXHR2YXIgc3RyaW5nVmFsdWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuXG5cdHJldHVybiBzdHJpbmdWYWx1ZSA9PT0gJ1tvYmplY3QgUmVnRXhwXSdcblx0XHR8fCBzdHJpbmdWYWx1ZSA9PT0gJ1tvYmplY3QgRGF0ZV0nXG5cdFx0fHwgaXNSZWFjdEVsZW1lbnQodmFsdWUpXG59XG5cbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvYmxvYi9iNWFjOTYzZmI3OTFkMTI5OGU3ZjM5NjIzNjM4M2JjOTU1ZjkxNmMxL3NyYy9pc29tb3JwaGljL2NsYXNzaWMvZWxlbWVudC9SZWFjdEVsZW1lbnQuanMjTDIxLUwyNVxudmFyIGNhblVzZVN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSBjYW5Vc2VTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgOiAweGVhYzc7XG5cbmZ1bmN0aW9uIGlzUmVhY3RFbGVtZW50KHZhbHVlKSB7XG5cdHJldHVybiB2YWx1ZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFXG59XG5cbmZ1bmN0aW9uIGVtcHR5VGFyZ2V0KHZhbCkge1xuXHRyZXR1cm4gQXJyYXkuaXNBcnJheSh2YWwpID8gW10gOiB7fVxufVxuXG5mdW5jdGlvbiBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZCh2YWx1ZSwgb3B0aW9ucykge1xuXHRyZXR1cm4gKG9wdGlvbnMuY2xvbmUgIT09IGZhbHNlICYmIG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3QodmFsdWUpKVxuXHRcdD8gZGVlcG1lcmdlKGVtcHR5VGFyZ2V0KHZhbHVlKSwgdmFsdWUsIG9wdGlvbnMpXG5cdFx0OiB2YWx1ZVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0QXJyYXlNZXJnZSh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuXHRyZXR1cm4gdGFyZ2V0LmNvbmNhdChzb3VyY2UpLm1hcChmdW5jdGlvbihlbGVtZW50KSB7XG5cdFx0cmV0dXJuIGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKGVsZW1lbnQsIG9wdGlvbnMpXG5cdH0pXG59XG5cbmZ1bmN0aW9uIGdldE1lcmdlRnVuY3Rpb24oa2V5LCBvcHRpb25zKSB7XG5cdGlmICghb3B0aW9ucy5jdXN0b21NZXJnZSkge1xuXHRcdHJldHVybiBkZWVwbWVyZ2Vcblx0fVxuXHR2YXIgY3VzdG9tTWVyZ2UgPSBvcHRpb25zLmN1c3RvbU1lcmdlKGtleSk7XG5cdHJldHVybiB0eXBlb2YgY3VzdG9tTWVyZ2UgPT09ICdmdW5jdGlvbicgPyBjdXN0b21NZXJnZSA6IGRlZXBtZXJnZVxufVxuXG5mdW5jdGlvbiBnZXRFbnVtZXJhYmxlT3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkge1xuXHRyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sc1xuXHRcdD8gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpLmZpbHRlcihmdW5jdGlvbihzeW1ib2wpIHtcblx0XHRcdHJldHVybiB0YXJnZXQucHJvcGVydHlJc0VudW1lcmFibGUoc3ltYm9sKVxuXHRcdH0pXG5cdFx0OiBbXVxufVxuXG5mdW5jdGlvbiBnZXRLZXlzKHRhcmdldCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXModGFyZ2V0KS5jb25jYXQoZ2V0RW51bWVyYWJsZU93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKVxufVxuXG5mdW5jdGlvbiBwcm9wZXJ0eUlzT25PYmplY3Qob2JqZWN0LCBwcm9wZXJ0eSkge1xuXHR0cnkge1xuXHRcdHJldHVybiBwcm9wZXJ0eSBpbiBvYmplY3Rcblx0fSBjYXRjaChfKSB7XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cbn1cblxuLy8gUHJvdGVjdHMgZnJvbSBwcm90b3R5cGUgcG9pc29uaW5nIGFuZCB1bmV4cGVjdGVkIG1lcmdpbmcgdXAgdGhlIHByb3RvdHlwZSBjaGFpbi5cbmZ1bmN0aW9uIHByb3BlcnR5SXNVbnNhZmUodGFyZ2V0LCBrZXkpIHtcblx0cmV0dXJuIHByb3BlcnR5SXNPbk9iamVjdCh0YXJnZXQsIGtleSkgLy8gUHJvcGVydGllcyBhcmUgc2FmZSB0byBtZXJnZSBpZiB0aGV5IGRvbid0IGV4aXN0IGluIHRoZSB0YXJnZXQgeWV0LFxuXHRcdCYmICEoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwodGFyZ2V0LCBrZXkpIC8vIHVuc2FmZSBpZiB0aGV5IGV4aXN0IHVwIHRoZSBwcm90b3R5cGUgY2hhaW4sXG5cdFx0XHQmJiBPYmplY3QucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh0YXJnZXQsIGtleSkpIC8vIGFuZCBhbHNvIHVuc2FmZSBpZiB0aGV5J3JlIG5vbmVudW1lcmFibGUuXG59XG5cbmZ1bmN0aW9uIG1lcmdlT2JqZWN0KHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG5cdHZhciBkZXN0aW5hdGlvbiA9IHt9O1xuXHRpZiAob3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdCh0YXJnZXQpKSB7XG5cdFx0Z2V0S2V5cyh0YXJnZXQpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG5cdFx0XHRkZXN0aW5hdGlvbltrZXldID0gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQodGFyZ2V0W2tleV0sIG9wdGlvbnMpO1xuXHRcdH0pO1xuXHR9XG5cdGdldEtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuXHRcdGlmIChwcm9wZXJ0eUlzVW5zYWZlKHRhcmdldCwga2V5KSkge1xuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXG5cdFx0aWYgKHByb3BlcnR5SXNPbk9iamVjdCh0YXJnZXQsIGtleSkgJiYgb3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdChzb3VyY2Vba2V5XSkpIHtcblx0XHRcdGRlc3RpbmF0aW9uW2tleV0gPSBnZXRNZXJnZUZ1bmN0aW9uKGtleSwgb3B0aW9ucykodGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldLCBvcHRpb25zKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVzdGluYXRpb25ba2V5XSA9IGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKHNvdXJjZVtrZXldLCBvcHRpb25zKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gZGVzdGluYXRpb25cbn1cblxuZnVuY3Rpb24gZGVlcG1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHRvcHRpb25zLmFycmF5TWVyZ2UgPSBvcHRpb25zLmFycmF5TWVyZ2UgfHwgZGVmYXVsdEFycmF5TWVyZ2U7XG5cdG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3QgPSBvcHRpb25zLmlzTWVyZ2VhYmxlT2JqZWN0IHx8IGlzTWVyZ2VhYmxlT2JqZWN0O1xuXHQvLyBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZCBpcyBhZGRlZCB0byBgb3B0aW9uc2Agc28gdGhhdCBjdXN0b20gYXJyYXlNZXJnZSgpXG5cdC8vIGltcGxlbWVudGF0aW9ucyBjYW4gdXNlIGl0LiBUaGUgY2FsbGVyIG1heSBub3QgcmVwbGFjZSBpdC5cblx0b3B0aW9ucy5jbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZCA9IGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkO1xuXG5cdHZhciBzb3VyY2VJc0FycmF5ID0gQXJyYXkuaXNBcnJheShzb3VyY2UpO1xuXHR2YXIgdGFyZ2V0SXNBcnJheSA9IEFycmF5LmlzQXJyYXkodGFyZ2V0KTtcblx0dmFyIHNvdXJjZUFuZFRhcmdldFR5cGVzTWF0Y2ggPSBzb3VyY2VJc0FycmF5ID09PSB0YXJnZXRJc0FycmF5O1xuXG5cdGlmICghc291cmNlQW5kVGFyZ2V0VHlwZXNNYXRjaCkge1xuXHRcdHJldHVybiBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZChzb3VyY2UsIG9wdGlvbnMpXG5cdH0gZWxzZSBpZiAoc291cmNlSXNBcnJheSkge1xuXHRcdHJldHVybiBvcHRpb25zLmFycmF5TWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpXG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIG1lcmdlT2JqZWN0KHRhcmdldCwgc291cmNlLCBvcHRpb25zKVxuXHR9XG59XG5cbmRlZXBtZXJnZS5hbGwgPSBmdW5jdGlvbiBkZWVwbWVyZ2VBbGwoYXJyYXksIG9wdGlvbnMpIHtcblx0aWYgKCFBcnJheS5pc0FycmF5KGFycmF5KSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignZmlyc3QgYXJndW1lbnQgc2hvdWxkIGJlIGFuIGFycmF5Jylcblx0fVxuXG5cdHJldHVybiBhcnJheS5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgbmV4dCkge1xuXHRcdHJldHVybiBkZWVwbWVyZ2UocHJldiwgbmV4dCwgb3B0aW9ucylcblx0fSwge30pXG59O1xuXG52YXIgZGVlcG1lcmdlXzEgPSBkZWVwbWVyZ2U7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVlcG1lcmdlXzE7XG4iLCIvKipcbiAqIExhY3VzU29mdCA6OiBjbnBqLWdlbiB2MS4xLjBcbiAqXG4gKiBAYXV0aG9yIEp1bGlvIEwuIE11bGxlci5cbiAqIEBsaWNlbnNlIE1JVCAtIDIwMjFcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciByZXF1aXJlJCQwID0gcmVxdWlyZSgnbnVtLW9ubHknKTtcbnZhciByZXF1aXJlJCQyID0gcmVxdWlyZSgnZGVlcG1lcmdlJyk7XG52YXIgdHNsaWIgPSByZXF1aXJlKCd0c2xpYicpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcERlZmF1bHRMZWdhY3kgKGUpIHsgcmV0dXJuIGUgJiYgdHlwZW9mIGUgPT09ICdvYmplY3QnICYmICdkZWZhdWx0JyBpbiBlID8gZSA6IHsgJ2RlZmF1bHQnOiBlIH07IH1cblxudmFyIHJlcXVpcmUkJDBfX2RlZmF1bHQgPSAvKiNfX1BVUkVfXyovX2ludGVyb3BEZWZhdWx0TGVnYWN5KHJlcXVpcmUkJDApO1xudmFyIHJlcXVpcmUkJDJfX2RlZmF1bHQgPSAvKiNfX1BVUkVfXyovX2ludGVyb3BEZWZhdWx0TGVnYWN5KHJlcXVpcmUkJDIpO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7XG4gICAgX3R5cGVvZiA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgX3R5cGVvZiA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG52YXIgY2pzID0ge307XG5cbi8qKlxuICogQ29weXJpZ2h0IChDKSAyMDE3LXByZXNlbnQgYnkgQW5kcmVhIEdpYW1tYXJjaGkgLSBAV2ViUmVmbGVjdGlvblxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuXG52YXIgX3JlZiA9ICcnLFxuICAgIHJlcGxhY2UgPSBfcmVmLnJlcGxhY2U7IC8vIGVzY2FwZVxuXG52YXIgZXMgPSAvJig/OmFtcHwjMzh8bHR8IzYwfGd0fCM2MnxhcG9zfCMzOXxxdW90fCMzNCk7L2c7XG52YXIgY2EgPSAvWyY8PidcIl0vZztcbnZhciBlc2NhID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgXCInXCI6ICcmIzM5OycsXG4gICdcIic6ICcmcXVvdDsnXG59O1xuXG52YXIgcGUgPSBmdW5jdGlvbiBwZShtKSB7XG4gIHJldHVybiBlc2NhW21dO1xufTtcbi8qKlxuICogU2FmZWx5IGVzY2FwZSBIVE1MIGVudGl0aWVzIHN1Y2ggYXMgYCZgLCBgPGAsIGA+YCwgYFwiYCwgYW5kIGAnYC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBlcyB0aGUgaW5wdXQgdG8gc2FmZWx5IGVzY2FwZVxuICogQHJldHVybnMge3N0cmluZ30gdGhlIGVzY2FwZWQgaW5wdXQsIGFuZCBpdCAqKnRocm93cyoqIGFuIGVycm9yIGlmXG4gKiAgdGhlIGlucHV0IHR5cGUgaXMgdW5leHBlY3RlZCwgZXhjZXB0IGZvciBib29sZWFuIGFuZCBudW1iZXJzLFxuICogIGNvbnZlcnRlZCBhcyBzdHJpbmcuXG4gKi9cblxuXG52YXIgZXNjYXBlID0gZnVuY3Rpb24gZXNjYXBlKGVzKSB7XG4gIHJldHVybiByZXBsYWNlLmNhbGwoZXMsIGNhLCBwZSk7XG59O1xuXG5janMuZXNjYXBlID0gZXNjYXBlOyAvLyB1bmVzY2FwZVxuXG5cbnZhciB1bmVzID0ge1xuICAnJmFtcDsnOiAnJicsXG4gICcmIzM4Oyc6ICcmJyxcbiAgJyZsdDsnOiAnPCcsXG4gICcmIzYwOyc6ICc8JyxcbiAgJyZndDsnOiAnPicsXG4gICcmIzYyOyc6ICc+JyxcbiAgJyZhcG9zOyc6IFwiJ1wiLFxuICAnJiMzOTsnOiBcIidcIixcbiAgJyZxdW90Oyc6ICdcIicsXG4gICcmIzM0Oyc6ICdcIidcbn07XG5cbnZhciBjYXBlID0gZnVuY3Rpb24gY2FwZShtKSB7XG4gIHJldHVybiB1bmVzW21dO1xufTtcbi8qKlxuICogU2FmZWx5IHVuZXNjYXBlIHByZXZpb3VzbHkgZXNjYXBlZCBlbnRpdGllcyBzdWNoIGFzIGAmYCwgYDxgLCBgPmAsIGBcImAsXG4gKiBhbmQgYCdgLlxuICogQHBhcmFtIHtzdHJpbmd9IHVuIGEgcHJldmlvdXNseSBlc2NhcGVkIHN0cmluZ1xuICogQHJldHVybnMge3N0cmluZ30gdGhlIHVuZXNjYXBlZCBpbnB1dCwgYW5kIGl0ICoqdGhyb3dzKiogYW4gZXJyb3IgaWZcbiAqICB0aGUgaW5wdXQgdHlwZSBpcyB1bmV4cGVjdGVkLCBleGNlcHQgZm9yIGJvb2xlYW4gYW5kIG51bWJlcnMsXG4gKiAgY29udmVydGVkIGFzIHN0cmluZy5cbiAqL1xuXG5cbnZhciB1bmVzY2FwZSA9IGZ1bmN0aW9uIHVuZXNjYXBlKHVuKSB7XG4gIHJldHVybiByZXBsYWNlLmNhbGwodW4sIGVzLCBjYXBlKTtcbn07XG5cbmNqcy51bmVzY2FwZSA9IHVuZXNjYXBlO1xuXG52YXIgbnVtT25seSA9IHJlcXVpcmUkJDBfX2RlZmF1bHRbJ2RlZmF1bHQnXTtcbnZhciBodG1sRXNjYXBlciA9IGNqcztcbnZhciBtZXJnZURlZXAgPSByZXF1aXJlJCQyX19kZWZhdWx0WydkZWZhdWx0J107XG5cbmZ1bmN0aW9uIF9pbnRlcm9wRGVmYXVsdExlZ2FjeSQxKGUpIHtcbiAgcmV0dXJuIGUgJiYgX3R5cGVvZihlKSA9PT0gJ29iamVjdCcgJiYgJ2RlZmF1bHQnIGluIGUgPyBlIDoge1xuICAgICdkZWZhdWx0JzogZVxuICB9O1xufVxuXG52YXIgbnVtT25seV9fZGVmYXVsdCA9IC8qI19fUFVSRV9fKi9faW50ZXJvcERlZmF1bHRMZWdhY3kkMShudW1Pbmx5KTtcblxudmFyIG1lcmdlRGVlcF9fZGVmYXVsdCA9IC8qI19fUFVSRV9fKi9faW50ZXJvcERlZmF1bHRMZWdhY3kkMShtZXJnZURlZXApO1xuXG52YXIgZGVmYXVsdE9wdGlvbnMkMSA9IHtcbiAgZGVsaW1pdGVyczoge1xuICAgIGRvdDogJy4nLFxuICAgIHNsYXNoOiAnLycsXG4gICAgZGFzaDogJy0nXG4gIH0sXG4gIGhpZGRlblJhbmdlOiB7XG4gICAgc3RhcnQ6IDUsXG4gICAgZW5kOiAxM1xuICB9LFxuICBvbkZhaWw6IGZ1bmN0aW9uIG9uRmFpbCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgaGlkZGVuS2V5OiAnKicsXG4gIGhpZGRlbjogZmFsc2UsXG4gIGVzY2FwZTogZmFsc2Vcbn07XG4vKipcclxuICogTWVyZ2UgY3VzdG9tIG9wdGlvbnMgdG8gdGhlIGRlZmF1bHQgb25lcy5cclxuICovXG5cbmZ1bmN0aW9uIG1lcmdlT3B0aW9ucyQxKGN1c3RvbU9wdGlvbnMpIHtcbiAgaWYgKGN1c3RvbU9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgIGN1c3RvbU9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIHZhciBvcHRpb25zID0gbWVyZ2VEZWVwX19kZWZhdWx0WydkZWZhdWx0J10oZGVmYXVsdE9wdGlvbnMkMSwgY3VzdG9tT3B0aW9ucyk7XG5cbiAgaWYgKG9wdGlvbnMuaGlkZGVuKSB7XG4gICAgaWYgKGlzTmFOKG9wdGlvbnMuaGlkZGVuUmFuZ2Uuc3RhcnQpIHx8IG9wdGlvbnMuaGlkZGVuUmFuZ2Uuc3RhcnQgPCAwIHx8IG9wdGlvbnMuaGlkZGVuUmFuZ2Uuc3RhcnQgPiAxMykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT3B0aW9uIFwiaGlkZGVuUmFuZ2Uuc3RhcnRcIiBtdXN0IGJlIGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgMTMuJyk7XG4gICAgfVxuXG4gICAgaWYgKGlzTmFOKG9wdGlvbnMuaGlkZGVuUmFuZ2UuZW5kKSB8fCBvcHRpb25zLmhpZGRlblJhbmdlLmVuZCA8IDAgfHwgb3B0aW9ucy5oaWRkZW5SYW5nZS5lbmQgPiAxMykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT3B0aW9uIFwiaGlkZGVuUmFuZ2UuZW5kXCIgbXVzdCBiZSBhIG51bWJlciBiZXR3ZWVuIDAgYW5kIDEzLicpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmhpZGRlblJhbmdlLnN0YXJ0ID4gb3B0aW9ucy5oaWRkZW5SYW5nZS5lbmQpIHtcbiAgICAgIHZhciBhdXggPSBvcHRpb25zLmhpZGRlblJhbmdlLnN0YXJ0O1xuICAgICAgb3B0aW9ucy5oaWRkZW5SYW5nZS5zdGFydCA9IG9wdGlvbnMuaGlkZGVuUmFuZ2UuZW5kO1xuICAgICAgb3B0aW9ucy5oaWRkZW5SYW5nZS5lbmQgPSBhdXg7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLm9uRmFpbCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBvcHRpb24gXCJvbkZhaWxcIiBtdXN0IGJlIGEgY2FsbGJhY2sgZnVuY3Rpb24uJyk7XG4gIH1cblxuICByZXR1cm4gb3B0aW9ucztcbn1cbi8qKlxyXG4gKiBWYWxpZGF0ZSBhIGdpdmVuIENOUEogY2hhciBzZXF1ZW5jZS5cclxuICovXG5cblxuZnVuY3Rpb24gY25wakZtdChjbnBqU3RyaW5nLCBvcHRpb25zKSB7XG4gIHZhciBDTlBKX0xFTkdUSCA9IDE0O1xuICB2YXIgY25wakFycmF5ID0gbnVtT25seV9fZGVmYXVsdFsnZGVmYXVsdCddKGNucGpTdHJpbmcpLnNwbGl0KCcnKTtcbiAgdmFyIGN1c3RvbU9wdGlvbnMgPSBtZXJnZU9wdGlvbnMkMShvcHRpb25zKTtcblxuICBpZiAoY25wakFycmF5Lmxlbmd0aCAhPT0gQ05QSl9MRU5HVEgpIHtcbiAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoXCJQYXJhbWV0ZXIgXFxcIlwiICsgY25walN0cmluZyArIFwiXFxcIiBkb2VzIG5vdCBjb250YWluIFwiICsgQ05QSl9MRU5HVEggKyBcIiBkaWdpdHMuXCIpO1xuICAgIHJldHVybiBjdXN0b21PcHRpb25zLm9uRmFpbChjbnBqU3RyaW5nLCBlcnJvcik7XG4gIH1cblxuICBpZiAoY3VzdG9tT3B0aW9ucy5oaWRkZW4pIHtcbiAgICBmb3IgKHZhciBpID0gY3VzdG9tT3B0aW9ucy5oaWRkZW5SYW5nZS5zdGFydDsgaSA8PSBjdXN0b21PcHRpb25zLmhpZGRlblJhbmdlLmVuZDsgaSsrKSB7XG4gICAgICBjbnBqQXJyYXlbaV0gPSBjdXN0b21PcHRpb25zLmhpZGRlbktleTtcbiAgICB9XG4gIH1cblxuICBjbnBqQXJyYXkuc3BsaWNlKDEyLCAwLCBjdXN0b21PcHRpb25zLmRlbGltaXRlcnMuZGFzaCk7XG4gIGNucGpBcnJheS5zcGxpY2UoOCwgMCwgY3VzdG9tT3B0aW9ucy5kZWxpbWl0ZXJzLnNsYXNoKTtcbiAgY25wakFycmF5LnNwbGljZSg1LCAwLCBjdXN0b21PcHRpb25zLmRlbGltaXRlcnMuZG90KTtcbiAgY25wakFycmF5LnNwbGljZSgyLCAwLCBjdXN0b21PcHRpb25zLmRlbGltaXRlcnMuZG90KTtcbiAgdmFyIGNucGpQcmV0dHkgPSBjbnBqQXJyYXkuam9pbignJyk7XG5cbiAgaWYgKGN1c3RvbU9wdGlvbnMuZXNjYXBlKSB7XG4gICAgcmV0dXJuIGh0bWxFc2NhcGVyLmVzY2FwZShjbnBqUHJldHR5KTtcbiAgfVxuXG4gIHJldHVybiBjbnBqUHJldHR5O1xufVxuXG52YXIgaW5kZXhfY2pzID0gY25wakZtdDtcblxudmFyIGRlZmF1bHRPcHRpb25zID0ge1xyXG4gICAgZm9ybWF0OiBmYWxzZSxcclxuICAgIHByZWZpeDogJycsXHJcbn07XHJcbi8qKlxyXG4gKiBNZXJnZSBjdXN0b20gb3B0aW9ucyB0byB0aGUgZGVmYXVsdCBvbmVzLlxyXG4gKi9cclxuZnVuY3Rpb24gbWVyZ2VPcHRpb25zKGN1c3RvbU9wdGlvbnMpIHtcclxuICAgIGlmIChjdXN0b21PcHRpb25zID09PSB2b2lkIDApIHsgY3VzdG9tT3B0aW9ucyA9IHt9OyB9XHJcbiAgICByZXR1cm4gcmVxdWlyZSQkMl9fZGVmYXVsdFsnZGVmYXVsdCddKGRlZmF1bHRPcHRpb25zLCBjdXN0b21PcHRpb25zKTtcclxufVxuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSB2ZXJpZmllciBkaWdpdCBiYXNlZCBvbiBDTlBKIGJhc2UgbnVtZXJpYyBzZXF1ZW5jZS5cclxuICovXHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZURpZ2l0KGNucGpTZXF1ZW5jZSkge1xyXG4gICAgdmFyIGluZGV4ID0gMjtcclxuICAgIHZhciBzdW0gPSB0c2xpYi5fX3NwcmVhZEFycmF5KFtdLCBjbnBqU2VxdWVuY2UpLnJldmVyc2UoKS5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzUmVzdWx0LCBudW1iZXIpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gcHJldmlvdXNSZXN1bHQgKyBudW1iZXIgKiBpbmRleDtcclxuICAgICAgICBpbmRleCA9IGluZGV4ID09PSA5ID8gMiA6IGluZGV4ICsgMTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSwgMCk7XHJcbiAgICB2YXIgcmVtYWluZGVyID0gc3VtICUgMTE7XHJcbiAgICByZXR1cm4gcmVtYWluZGVyIDwgMiA/IDAgOiAxMSAtIHJlbWFpbmRlcjtcclxufVxuXG4vKipcclxuICogR2VuZXJhdGUgYW4gYXJyYXkgb2YgcmFuZG9tIG51bWJlcnMgKGFzIHN0cmluZykgYmV0d2VlbiAwIGFuZCAgOS5cclxuICovXHJcbmZ1bmN0aW9uIG51bWJlckdlbmVyYXRvcihsZW5ndGgpIHtcclxuICAgIHZhciBudW1lcmljU2VxdWVuY2UgPSBbXTtcclxuICAgIHdoaWxlIChudW1lcmljU2VxdWVuY2UubGVuZ3RoIDwgbGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIHJhbmRvbSA9IE1hdGgucmFuZG9tKCkgKiAxMDtcclxuICAgICAgICB2YXIgaW50ZWdlciA9IE1hdGguZmxvb3IocmFuZG9tKTtcclxuICAgICAgICBudW1lcmljU2VxdWVuY2UucHVzaChpbnRlZ2VyKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudW1lcmljU2VxdWVuY2U7XHJcbn1cblxuLyoqXHJcbiAqIEdlbmVyYXRlIGEgdmFsaWQgQ05QSiAoQnJhemlsaWFuIGNvbXBhbnkgSUQpIG51bWVyaWMgc2VxdWVuY2UuXHJcbiAqL1xyXG5mdW5jdGlvbiBjbnBqR2VuKG9wdGlvbnMpIHtcclxuICAgIHZhciB1c2VyT3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhvcHRpb25zKTtcclxuICAgIHZhciBiYXNlU2VxdWVuY2UgPSByZXF1aXJlJCQwX19kZWZhdWx0WydkZWZhdWx0J10odXNlck9wdGlvbnMucHJlZml4KTtcclxuICAgIHZhciBwcmVmaXhMZW5ndGggPSBiYXNlU2VxdWVuY2UubGVuZ3RoO1xyXG4gICAgaWYgKHByZWZpeExlbmd0aCA8IDAgfHwgcHJlZml4TGVuZ3RoID4gMTIpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09wdGlvbiBcInByZWZpeFwiIG11c3QgYmUgYSBzdHJpbmcgY29udGFpbmluZyBiZXR3ZWVuIDEgYW5kIDEyIGRpZ2l0cy4nKTtcclxuICAgIH1cclxuICAgIGlmIChwcmVmaXhMZW5ndGggPiA4ICYmIGJhc2VTZXF1ZW5jZS5zbGljZSg4KSA9PT0gJzAwMDAnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgYnJhbmNoIElEIChjaGFyYWN0ZXJzIDggdG8gMTEpIGNhbm5vdCBiZSBcIjAwMDBcIi4nKTtcclxuICAgIH1cclxuICAgIHZhciBicmFuY2hJRCA9IFswLCAwLCAwLCBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDkpXTtcclxuICAgIHZhciBjbnBqU2VxdWVuY2UgPSBiYXNlU2VxdWVuY2VcclxuICAgICAgICAuc3BsaXQoJycpXHJcbiAgICAgICAgLm1hcChOdW1iZXIpXHJcbiAgICAgICAgLmNvbmNhdChudW1iZXJHZW5lcmF0b3IoOCAtIHByZWZpeExlbmd0aCkpXHJcbiAgICAgICAgLmNvbmNhdChicmFuY2hJRC5zbGljZSgwLCAxMiAtIHByZWZpeExlbmd0aCkpO1xyXG4gICAgY25walNlcXVlbmNlLnB1c2goY2FsY3VsYXRlRGlnaXQoY25walNlcXVlbmNlKSk7XHJcbiAgICBjbnBqU2VxdWVuY2UucHVzaChjYWxjdWxhdGVEaWdpdChjbnBqU2VxdWVuY2UpKTtcclxuICAgIHJldHVybiB1c2VyT3B0aW9ucy5mb3JtYXRcclxuICAgICAgICA/IGluZGV4X2NqcyhjbnBqU2VxdWVuY2Uuam9pbignJykpXHJcbiAgICAgICAgOiBjbnBqU2VxdWVuY2Uuam9pbignJyk7XHJcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbnBqR2VuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhVzVrWlhndVkycHpMbXB6SWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOXViMlJsWDIxdlpIVnNaWE12YUhSdGJDMWxjMk5oY0dWeUwyTnFjeTlwYm1SbGVDNXFjeUpkTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJbmRYTmxJSE4wY21samRDYzdYRzR2S2lwY2JpQXFJRU52Y0hseWFXZG9kQ0FvUXlrZ01qQXhOeTF3Y21WelpXNTBJR0o1SUVGdVpISmxZU0JIYVdGdGJXRnlZMmhwSUMwZ1FGZGxZbEpsWm14bFkzUnBiMjVjYmlBcVhHNGdLaUJRWlhKdGFYTnphVzl1SUdseklHaGxjbVZpZVNCbmNtRnVkR1ZrTENCbWNtVmxJRzltSUdOb1lYSm5aU3dnZEc4Z1lXNTVJSEJsY25OdmJpQnZZblJoYVc1cGJtY2dZU0JqYjNCNVhHNGdLaUJ2WmlCMGFHbHpJSE52Wm5SM1lYSmxJR0Z1WkNCaGMzTnZZMmxoZEdWa0lHUnZZM1Z0Wlc1MFlYUnBiMjRnWm1sc1pYTWdLSFJvWlNCY0lsTnZablIzWVhKbFhDSXBMQ0IwYnlCa1pXRnNYRzRnS2lCcGJpQjBhR1VnVTI5bWRIZGhjbVVnZDJsMGFHOTFkQ0J5WlhOMGNtbGpkR2x2Yml3Z2FXNWpiSFZrYVc1bklIZHBkR2h2ZFhRZ2JHbHRhWFJoZEdsdmJpQjBhR1VnY21sbmFIUnpYRzRnS2lCMGJ5QjFjMlVzSUdOdmNIa3NJRzF2WkdsbWVTd2diV1Z5WjJVc0lIQjFZbXhwYzJnc0lHUnBjM1J5YVdKMWRHVXNJSE4xWW14cFkyVnVjMlVzSUdGdVpDOXZjaUJ6Wld4c1hHNGdLaUJqYjNCcFpYTWdiMllnZEdobElGTnZablIzWVhKbExDQmhibVFnZEc4Z2NHVnliV2wwSUhCbGNuTnZibk1nZEc4Z2QyaHZiU0IwYUdVZ1UyOW1kSGRoY21VZ2FYTmNiaUFxSUdaMWNtNXBjMmhsWkNCMGJ5QmtieUJ6Ynl3Z2MzVmlhbVZqZENCMGJ5QjBhR1VnWm05c2JHOTNhVzVuSUdOdmJtUnBkR2x2Ym5NNlhHNGdLbHh1SUNvZ1ZHaGxJR0ZpYjNabElHTnZjSGx5YVdkb2RDQnViM1JwWTJVZ1lXNWtJSFJvYVhNZ2NHVnliV2x6YzJsdmJpQnViM1JwWTJVZ2MyaGhiR3dnWW1VZ2FXNWpiSFZrWldRZ2FXNWNiaUFxSUdGc2JDQmpiM0JwWlhNZ2IzSWdjM1ZpYzNSaGJuUnBZV3dnY0c5eWRHbHZibk1nYjJZZ2RHaGxJRk52Wm5SM1lYSmxMbHh1SUNwY2JpQXFJRlJJUlNCVFQwWlVWMEZTUlNCSlV5QlFVazlXU1VSRlJDQmNJa0ZUSUVsVFhDSXNJRmRKVkVoUFZWUWdWMEZTVWtGT1ZGa2dUMFlnUVU1WklFdEpUa1FzSUVWWVVGSkZVMU1nVDFKY2JpQXFJRWxOVUV4SlJVUXNJRWxPUTB4VlJFbE9SeUJDVlZRZ1RrOVVJRXhKVFVsVVJVUWdWRThnVkVoRklGZEJVbEpCVGxSSlJWTWdUMFlnVFVWU1EwaEJUbFJCUWtsTVNWUlpMRnh1SUNvZ1JrbFVUa1ZUVXlCR1QxSWdRU0JRUVZKVVNVTlZURUZTSUZCVlVsQlBVMFVnUVU1RUlFNVBUa2xPUmxKSlRrZEZUVVZPVkM0Z1NVNGdUazhnUlZaRlRsUWdVMGhCVEV3Z1ZFaEZYRzRnS2lCQlZWUklUMUpUSUU5U0lFTlBVRmxTU1VkSVZDQklUMHhFUlZKVElFSkZJRXhKUVVKTVJTQkdUMUlnUVU1WklFTk1RVWxOTENCRVFVMUJSMFZUSUU5U0lFOVVTRVZTWEc0Z0tpQk1TVUZDU1V4SlZGa3NJRmRJUlZSSVJWSWdTVTRnUVU0Z1FVTlVTVTlPSUU5R0lFTlBUbFJTUVVOVUxDQlVUMUpVSUU5U0lFOVVTRVZTVjBsVFJTd2dRVkpKVTBsT1J5QkdVazlOTEZ4dUlDb2dUMVZVSUU5R0lFOVNJRWxPSUVOUFRrNUZRMVJKVDA0Z1YwbFVTQ0JVU0VVZ1UwOUdWRmRCVWtVZ1QxSWdWRWhGSUZWVFJTQlBVaUJQVkVoRlVpQkVSVUZNU1U1SFV5QkpUbHh1SUNvZ1ZFaEZJRk5QUmxSWFFWSkZMbHh1SUNvdlhHNWNibU52Ym5OMElIdHlaWEJzWVdObGZTQTlJQ2NuTzF4dVhHNHZMeUJsYzJOaGNHVmNibU52Ym5OMElHVnpJRDBnTHlZb1B6cGhiWEI4SXpNNGZHeDBmQ00yTUh4bmRId2pOako4WVhCdmMzd2pNemw4Y1hWdmRId2pNelFwT3k5bk8xeHVZMjl1YzNRZ1kyRWdQU0F2V3lZOFBpZGNJbDB2Wnp0Y2JseHVZMjl1YzNRZ1pYTmpZU0E5SUh0Y2JpQWdKeVluT2lBbkptRnRjRHNuTEZ4dUlDQW5QQ2M2SUNjbWJIUTdKeXhjYmlBZ0p6NG5PaUFuSm1kME95Y3NYRzRnSUZ3aUoxd2lPaUFuSmlNek9Uc25MRnh1SUNBblhDSW5PaUFuSm5GMWIzUTdKMXh1ZlR0Y2JtTnZibk4wSUhCbElEMGdiU0E5UGlCbGMyTmhXMjFkTzF4dVhHNHZLaXBjYmlBcUlGTmhabVZzZVNCbGMyTmhjR1VnU0ZSTlRDQmxiblJwZEdsbGN5QnpkV05vSUdGeklHQW1ZQ3dnWUR4Z0xDQmdQbUFzSUdCY0ltQXNJR0Z1WkNCZ0oyQXVYRzRnS2lCQWNHRnlZVzBnZTNOMGNtbHVaMzBnWlhNZ2RHaGxJR2x1Y0hWMElIUnZJSE5oWm1Wc2VTQmxjMk5oY0dWY2JpQXFJRUJ5WlhSMWNtNXpJSHR6ZEhKcGJtZDlJSFJvWlNCbGMyTmhjR1ZrSUdsdWNIVjBMQ0JoYm1RZ2FYUWdLaXAwYUhKdmQzTXFLaUJoYmlCbGNuSnZjaUJwWmx4dUlDb2dJSFJvWlNCcGJuQjFkQ0IwZVhCbElHbHpJSFZ1Wlhod1pXTjBaV1FzSUdWNFkyVndkQ0JtYjNJZ1ltOXZiR1ZoYmlCaGJtUWdiblZ0WW1WeWN5eGNiaUFxSUNCamIyNTJaWEowWldRZ1lYTWdjM1J5YVc1bkxseHVJQ292WEc1amIyNXpkQ0JsYzJOaGNHVWdQU0JsY3lBOVBpQnlaWEJzWVdObExtTmhiR3dvWlhNc0lHTmhMQ0J3WlNrN1hHNWxlSEJ2Y25SekxtVnpZMkZ3WlNBOUlHVnpZMkZ3WlR0Y2JseHVYRzR2THlCMWJtVnpZMkZ3WlZ4dVkyOXVjM1FnZFc1bGN5QTlJSHRjYmlBZ0p5WmhiWEE3SnpvZ0p5WW5MRnh1SUNBbkppTXpPRHNuT2lBbkppY3NYRzRnSUNjbWJIUTdKem9nSnp3bkxGeHVJQ0FuSmlNMk1Ec25PaUFuUENjc1hHNGdJQ2NtWjNRN0p6b2dKejRuTEZ4dUlDQW5KaU0yTWpzbk9pQW5QaWNzWEc0Z0lDY21ZWEJ2Y3pzbk9pQmNJaWRjSWl4Y2JpQWdKeVlqTXprN0p6b2dYQ0luWENJc1hHNGdJQ2NtY1hWdmREc25PaUFuWENJbkxGeHVJQ0FuSmlNek5Ec25PaUFuWENJblhHNTlPMXh1WTI5dWMzUWdZMkZ3WlNBOUlHMGdQVDRnZFc1bGMxdHRYVHRjYmx4dUx5b3FYRzRnS2lCVFlXWmxiSGtnZFc1bGMyTmhjR1VnY0hKbGRtbHZkWE5zZVNCbGMyTmhjR1ZrSUdWdWRHbDBhV1Z6SUhOMVkyZ2dZWE1nWUNaZ0xDQmdQR0FzSUdBK1lDd2dZRndpWUN4Y2JpQXFJR0Z1WkNCZ0oyQXVYRzRnS2lCQWNHRnlZVzBnZTNOMGNtbHVaMzBnZFc0Z1lTQndjbVYyYVc5MWMyeDVJR1Z6WTJGd1pXUWdjM1J5YVc1blhHNGdLaUJBY21WMGRYSnVjeUI3YzNSeWFXNW5mU0IwYUdVZ2RXNWxjMk5oY0dWa0lHbHVjSFYwTENCaGJtUWdhWFFnS2lwMGFISnZkM01xS2lCaGJpQmxjbkp2Y2lCcFpseHVJQ29nSUhSb1pTQnBibkIxZENCMGVYQmxJR2x6SUhWdVpYaHdaV04wWldRc0lHVjRZMlZ3ZENCbWIzSWdZbTl2YkdWaGJpQmhibVFnYm5WdFltVnljeXhjYmlBcUlDQmpiMjUyWlhKMFpXUWdZWE1nYzNSeWFXNW5MbHh1SUNvdlhHNWpiMjV6ZENCMWJtVnpZMkZ3WlNBOUlIVnVJRDArSUhKbGNHeGhZMlV1WTJGc2JDaDFiaXdnWlhNc0lHTmhjR1VwTzF4dVpYaHdiM0owY3k1MWJtVnpZMkZ3WlNBOUlIVnVaWE5qWVhCbE8xeHVJbDBzSW01aGJXVnpJanBiSW5KbGNHeGhZMlVpTENKbGN5SXNJbU5oSWl3aVpYTmpZU0lzSW5CbElpd2liU0lzSW1WelkyRndaU0lzSW1OaGJHd2lMQ0oxYm1Weklpd2lZMkZ3WlNJc0luVnVaWE5qWVhCbElpd2lkVzRpWFN3aWJXRndjR2x1WjNNaU9pSTdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096dEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN08wRkJSVUVzVjBGQmEwSXNSVUZCYkVJN1FVRkJRU3hKUVVGUFFTeFBRVUZRTEZGQlFVOUJMRTlCUVZBN08wRkJSMEVzU1VGQlRVTXNSVUZCUlN4SFFVRkhMR2RFUVVGWU8wRkJRMEVzU1VGQlRVTXNSVUZCUlN4SFFVRkhMRlZCUVZnN1FVRkZRU3hKUVVGTlF5eEpRVUZKTEVkQlFVYzdRVUZEV0N4UFFVRkxMRTlCUkUwN1FVRkZXQ3hQUVVGTExFMUJSazA3UVVGSFdDeFBRVUZMTEUxQlNFMDdRVUZKV0N4UFFVRkxMRTlCU2swN1FVRkxXQ3hQUVVGTE8wRkJURTBzUTBGQllqczdRVUZQUVN4SlFVRk5ReXhGUVVGRkxFZEJRVWNzVTBGQlRFRXNSVUZCU3l4RFFVRkJReXhEUVVGRE8wRkJRVUVzVTBGQlNVWXNTVUZCU1N4RFFVRkRSU3hEUVVGRUxFTkJRVkk3UVVGQlFTeERRVUZhTzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3T3p0QlFVTkJMRWxCUVUxRExFMUJRVTBzUjBGQlJ5eFRRVUZVUVN4TlFVRlRMRU5CUVVGTUxFVkJRVVU3UVVGQlFTeFRRVUZKUkN4UFFVRlBMRU5CUVVOUExFbEJRVklzUTBGQllVNHNSVUZCWWl4RlFVRnBRa01zUlVGQmFrSXNSVUZCY1VKRkxFVkJRWEpDTEVOQlFVbzdRVUZCUVN4RFFVRnFRanM3WVVGRGFVSkZPenM3UVVGSmFrSXNTVUZCVFVVc1NVRkJTU3hIUVVGSE8wRkJRMWdzVjBGQlV5eEhRVVJGTzBGQlJWZ3NWMEZCVXl4SFFVWkZPMEZCUjFnc1ZVRkJVU3hIUVVoSE8wRkJTVmdzVjBGQlV5eEhRVXBGTzBGQlMxZ3NWVUZCVVN4SFFVeEhPMEZCVFZnc1YwRkJVeXhIUVU1Rk8wRkJUMWdzV1VGQlZTeEhRVkJETzBGQlVWZ3NWMEZCVXl4SFFWSkZPMEZCVTFnc1dVRkJWU3hIUVZSRE8wRkJWVmdzVjBGQlV6dEJRVlpGTEVOQlFXSTdPMEZCV1VFc1NVRkJUVU1zU1VGQlNTeEhRVUZITEZOQlFWQkJMRWxCUVU4c1EwRkJRVW9zUTBGQlF6dEJRVUZCTEZOQlFVbEhMRWxCUVVrc1EwRkJRMGdzUTBGQlJDeERRVUZTTzBGQlFVRXNRMEZCWkR0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPenRCUVVOQkxFbEJRVTFMTEZGQlFWRXNSMEZCUnl4VFFVRllRU3hSUVVGWExFTkJRVUZETEVWQlFVVTdRVUZCUVN4VFFVRkpXQ3hQUVVGUExFTkJRVU5QTEVsQlFWSXNRMEZCWVVrc1JVRkJZaXhGUVVGcFFsWXNSVUZCYWtJc1JVRkJjVUpSTEVsQlFYSkNMRU5CUVVvN1FVRkJRU3hEUVVGdVFqczdaVUZEYlVKRE96czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3lKOVxuIl0sIm5hbWVzIjpbInJlcGxhY2UiLCJlcyIsImNhIiwiZXNjYSIsInBlIiwibSIsImVzY2FwZSIsImNhbGwiLCJ1bmVzIiwiY2FwZSIsInVuZXNjYXBlIiwidW4iLCJpc01lcmdlYWJsZU9iamVjdCIsInZhbHVlIiwiaXNOb25OdWxsT2JqZWN0IiwiaXNTcGVjaWFsIiwiX3R5cGVvZiIsInN0cmluZ1ZhbHVlIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJpc1JlYWN0RWxlbWVudCIsImNhblVzZVN5bWJvbCIsIlN5bWJvbCIsIlJFQUNUX0VMRU1FTlRfVFlQRSIsIiQkdHlwZW9mIiwiZW1wdHlUYXJnZXQiLCJ2YWwiLCJBcnJheSIsImlzQXJyYXkiLCJjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZCIsIm9wdGlvbnMiLCJjbG9uZSIsImRlZXBtZXJnZSIsImRlZmF1bHRBcnJheU1lcmdlIiwidGFyZ2V0Iiwic291cmNlIiwiY29uY2F0IiwibWFwIiwiZWxlbWVudCIsImdldE1lcmdlRnVuY3Rpb24iLCJrZXkiLCJjdXN0b21NZXJnZSIsImdldEVudW1lcmFibGVPd25Qcm9wZXJ0eVN5bWJvbHMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJmaWx0ZXIiLCJzeW1ib2wiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsImdldEtleXMiLCJrZXlzIiwicHJvcGVydHlJc09uT2JqZWN0Iiwib2JqZWN0IiwicHJvcGVydHkiLCJfIiwicHJvcGVydHlJc1Vuc2FmZSIsImhhc093blByb3BlcnR5IiwibWVyZ2VPYmplY3QiLCJkZXN0aW5hdGlvbiIsImZvckVhY2giLCJhcnJheU1lcmdlIiwic291cmNlSXNBcnJheSIsInRhcmdldElzQXJyYXkiLCJzb3VyY2VBbmRUYXJnZXRUeXBlc01hdGNoIiwiYWxsIiwiZGVlcG1lcmdlQWxsIiwiYXJyYXkiLCJFcnJvciIsInJlZHVjZSIsInByZXYiLCJuZXh0IiwiZGVlcG1lcmdlXzEiLCJjanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7RUFFQSxhQUFrQixFQUFsQjtFQUFBLElBQU9BLFNBQVAsVUFBT0EsT0FBUDs7RUFHQSxJQUFNQyxJQUFFLEdBQUcsZ0RBQVg7RUFDQSxJQUFNQyxJQUFFLEdBQUcsVUFBWDtFQUVBLElBQU1DLE1BQUksR0FBRztFQUNYLE9BQUssT0FETTtFQUVYLE9BQUssTUFGTTtFQUdYLE9BQUssTUFITTtFQUlYLE9BQUssT0FKTTtFQUtYLE9BQUs7RUFMTSxDQUFiOztFQU9BLElBQU1DLElBQUUsR0FBRyxTQUFMQSxFQUFLLENBQUFDLENBQUM7RUFBQSxTQUFJRixNQUFJLENBQUNFLENBQUQsQ0FBUjtFQUFBLENBQVo7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0VBQ0EsSUFBTUMsUUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBQUwsRUFBRTtFQUFBLFNBQUlELFNBQU8sQ0FBQ08sSUFBUixDQUFhTixFQUFiLEVBQWlCQyxJQUFqQixFQUFxQkUsSUFBckIsQ0FBSjtFQUFBLENBQWpCOztpQkFDaUJFOzs7RUFJakIsSUFBTUUsTUFBSSxHQUFHO0VBQ1gsV0FBUyxHQURFO0VBRVgsV0FBUyxHQUZFO0VBR1gsVUFBUSxHQUhHO0VBSVgsV0FBUyxHQUpFO0VBS1gsVUFBUSxHQUxHO0VBTVgsV0FBUyxHQU5FO0VBT1gsWUFBVSxH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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VDN0hqQjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7RUFFQTtFQUFBOztFQUdBO0VBQ0E7Ozs7OztNQUVBcEU7O0VBT0E7O0VBQUE7RUFFQTtFQUNBOzs7RUFHQTtFQUNBO0VBQ0EsQ0FGQTs7O0VBR0E7Ozs7Ozs7RUFLQTs7R0FBQTs7Ozs7Ozs7RUFBQTs7RUFZQTs7RUFBQTtFQUVBO0VBQ0E7OztFQUdBO0VBQ0E7RUFDQSxDQUZBO0VBR0E7OztFQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
