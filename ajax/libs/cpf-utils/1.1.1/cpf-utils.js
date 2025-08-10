/**
 * cpf-utils v1.1.1
 *
 * @author Julio L. Muller.
 * @license MIT - 2020-2022
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.cpfUtils = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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

  var cjs$1 = {};

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

  cjs$1.escape = escape; // unescape


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

  cjs$1.unescape = unescape;

  var isMergeableObject = function isMergeableObject(value) {
    return isNonNullObject(value) && !isSpecial(value);
  };

  function isNonNullObject(value) {
    return !!value && _typeof(value) === 'object';
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
  var cjs = deepmerge_1;

  var numOnly$2 = index_cjs$3;
  var htmlEscaper = cjs$1;
  var mergeDeep$1 = cjs;

  function _interopDefaultLegacy$3(e) {
    return e && _typeof(e) === 'object' && 'default' in e ? e : {
      'default': e
    };
  }

  var numOnly__default$2 = /*#__PURE__*/_interopDefaultLegacy$3(numOnly$2);

  var mergeDeep__default$1 = /*#__PURE__*/_interopDefaultLegacy$3(mergeDeep$1);

  var defaultOptions$1 = {
    delimiters: {
      dot: '.',
      dash: '-'
    },
    hiddenRange: {
      start: 3,
      end: 10
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

    var options = mergeDeep__default$1['default'](defaultOptions$1, customOptions);

    if (options.hidden) {
      if (isNaN(options.hiddenRange.start) || options.hiddenRange.start < 0 || options.hiddenRange.start > 10) {
        throw new TypeError('Option "hiddenRange.start" must be a number between 0 and 10.');
      }

      if (isNaN(options.hiddenRange.end) || options.hiddenRange.end < 0 || options.hiddenRange.end > 10) {
        throw new TypeError('Option "hiddenRange.end" must be a number between 0 and 10.');
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
   * Validate a given CPF char sequence.
   */


  function cpfFmt$1(cpfString, options) {
    var CPF_LENGTH = 11;
    var cpfArray = numOnly__default$2['default'](cpfString).split('');
    var customOptions = mergeOptions$1(options);

    if (cpfArray.length !== CPF_LENGTH) {
      var error = new Error("Parameter \"" + cpfString + "\" does not contain " + CPF_LENGTH + " digits.");
      return customOptions.onFail(cpfString, error);
    }

    if (customOptions.hidden) {
      for (var i = customOptions.hiddenRange.start; i <= customOptions.hiddenRange.end; i++) {
        cpfArray[i] = customOptions.hiddenKey;
      }
    }

    cpfArray.splice(9, 0, customOptions.delimiters.dash); // eslint-disable-line no-magic-numbers

    cpfArray.splice(6, 0, customOptions.delimiters.dot); // eslint-disable-line no-magic-numbers

    cpfArray.splice(3, 0, customOptions.delimiters.dot); // eslint-disable-line no-magic-numbers

    var cpfPretty = cpfArray.join('');

    if (customOptions.escape) {
      return htmlEscaper.escape(cpfPretty);
    }

    return cpfPretty;
  }

  var index_cjs$2 = cpfFmt$1;

  var numOnly$1 = index_cjs$3;
  var cpfFmt = index_cjs$2;
  var mergeDeep = cjs;

  function _interopDefaultLegacy$2(e) {
    return e && _typeof(e) === 'object' && 'default' in e ? e : {
      'default': e
    };
  }

  var numOnly__default$1 = /*#__PURE__*/_interopDefaultLegacy$2(numOnly$1);

  var cpfFmt__default = /*#__PURE__*/_interopDefaultLegacy$2(cpfFmt);

  var mergeDeep__default = /*#__PURE__*/_interopDefaultLegacy$2(mergeDeep);

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

    return mergeDeep__default['default'](defaultOptions, customOptions);
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
   * Generate a valid CPF (Brazilian ID document) numeric sequence.
   */


  function cpfGen$1(options) {
    var userOptions = mergeOptions(options);
    var baseSequence = numOnly__default$1['default'](userOptions.prefix);
    var prefixLength = baseSequence.length;

    if (prefixLength < 0 || prefixLength > 9) {
      throw new Error('Option "prefix" must be a string containing between 1 and 9 digits.');
    }

    var cpfSequence = baseSequence.split('').map(Number).concat(numberGenerator(9 - prefixLength));
    [9, 10].forEach(function (nextNumIndex) {
      var factor = nextNumIndex + 1;
      var sum = 0;

      for (var n = 0; n < nextNumIndex; n++, factor--) {
        sum += cpfSequence[n] * factor;
      }

      var remainder = 11 - sum % 11;
      cpfSequence.push(remainder > 9 ? 0 : remainder);
    });
    return userOptions.format ? cpfFmt__default['default'](cpfSequence.join('')) : cpfSequence.join('');
  }

  var index_cjs$1 = cpfGen$1;

  var cpfGen = index_cjs$1;
  var numOnly = index_cjs$3;

  function _interopDefaultLegacy$1(e) {
    return e && _typeof(e) === 'object' && 'default' in e ? e : {
      'default': e
    };
  }

  var cpfGen__default = /*#__PURE__*/_interopDefaultLegacy$1(cpfGen);

  var numOnly__default = /*#__PURE__*/_interopDefaultLegacy$1(numOnly);
  /**
   * Validate a given CPF (Brazilian ID document) char sequence.
   */


  function cpfVal(cpfString) {
    var CPF_LENGTH = 11;
    var cpfDigits = numOnly__default['default'](cpfString);

    if (cpfDigits.length !== CPF_LENGTH) {
      return false;
    }

    return cpfDigits === cpfGen__default['default']({
      prefix: cpfDigits.substring(0, 9)
    });
  }

  var index_cjs = cpfVal;

  var format = index_cjs$2;
  var generate = index_cjs$1;
  var isValid = index_cjs;
  var module = { format: format, generate: generate, isValid: isValid };

  return module;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BmLXV0aWxzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvaHRtbC1lc2NhcGVyL2Nqcy9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kZWVwbWVyZ2UvZGlzdC9janMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTctcHJlc2VudCBieSBBbmRyZWEgR2lhbW1hcmNoaSAtIEBXZWJSZWZsZWN0aW9uXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5jb25zdCB7cmVwbGFjZX0gPSAnJztcblxuLy8gZXNjYXBlXG5jb25zdCBlcyA9IC8mKD86YW1wfCMzOHxsdHwjNjB8Z3R8IzYyfGFwb3N8IzM5fHF1b3R8IzM0KTsvZztcbmNvbnN0IGNhID0gL1smPD4nXCJdL2c7XG5cbmNvbnN0IGVzY2EgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICBcIidcIjogJyYjMzk7JyxcbiAgJ1wiJzogJyZxdW90Oydcbn07XG5jb25zdCBwZSA9IG0gPT4gZXNjYVttXTtcblxuLyoqXG4gKiBTYWZlbHkgZXNjYXBlIEhUTUwgZW50aXRpZXMgc3VjaCBhcyBgJmAsIGA8YCwgYD5gLCBgXCJgLCBhbmQgYCdgLlxuICogQHBhcmFtIHtzdHJpbmd9IGVzIHRoZSBpbnB1dCB0byBzYWZlbHkgZXNjYXBlXG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgZXNjYXBlZCBpbnB1dCwgYW5kIGl0ICoqdGhyb3dzKiogYW4gZXJyb3IgaWZcbiAqICB0aGUgaW5wdXQgdHlwZSBpcyB1bmV4cGVjdGVkLCBleGNlcHQgZm9yIGJvb2xlYW4gYW5kIG51bWJlcnMsXG4gKiAgY29udmVydGVkIGFzIHN0cmluZy5cbiAqL1xuY29uc3QgZXNjYXBlID0gZXMgPT4gcmVwbGFjZS5jYWxsKGVzLCBjYSwgcGUpO1xuZXhwb3J0cy5lc2NhcGUgPSBlc2NhcGU7XG5cblxuLy8gdW5lc2NhcGVcbmNvbnN0IHVuZXMgPSB7XG4gICcmYW1wOyc6ICcmJyxcbiAgJyYjMzg7JzogJyYnLFxuICAnJmx0Oyc6ICc8JyxcbiAgJyYjNjA7JzogJzwnLFxuICAnJmd0Oyc6ICc+JyxcbiAgJyYjNjI7JzogJz4nLFxuICAnJmFwb3M7JzogXCInXCIsXG4gICcmIzM5Oyc6IFwiJ1wiLFxuICAnJnF1b3Q7JzogJ1wiJyxcbiAgJyYjMzQ7JzogJ1wiJ1xufTtcbmNvbnN0IGNhcGUgPSBtID0+IHVuZXNbbV07XG5cbi8qKlxuICogU2FmZWx5IHVuZXNjYXBlIHByZXZpb3VzbHkgZXNjYXBlZCBlbnRpdGllcyBzdWNoIGFzIGAmYCwgYDxgLCBgPmAsIGBcImAsXG4gKiBhbmQgYCdgLlxuICogQHBhcmFtIHtzdHJpbmd9IHVuIGEgcHJldmlvdXNseSBlc2NhcGVkIHN0cmluZ1xuICogQHJldHVybnMge3N0cmluZ30gdGhlIHVuZXNjYXBlZCBpbnB1dCwgYW5kIGl0ICoqdGhyb3dzKiogYW4gZXJyb3IgaWZcbiAqICB0aGUgaW5wdXQgdHlwZSBpcyB1bmV4cGVjdGVkLCBleGNlcHQgZm9yIGJvb2xlYW4gYW5kIG51bWJlcnMsXG4gKiAgY29udmVydGVkIGFzIHN0cmluZy5cbiAqL1xuY29uc3QgdW5lc2NhcGUgPSB1biA9PiByZXBsYWNlLmNhbGwodW4sIGVzLCBjYXBlKTtcbmV4cG9ydHMudW5lc2NhcGUgPSB1bmVzY2FwZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzTWVyZ2VhYmxlT2JqZWN0ID0gZnVuY3Rpb24gaXNNZXJnZWFibGVPYmplY3QodmFsdWUpIHtcblx0cmV0dXJuIGlzTm9uTnVsbE9iamVjdCh2YWx1ZSlcblx0XHQmJiAhaXNTcGVjaWFsKHZhbHVlKVxufTtcblxuZnVuY3Rpb24gaXNOb25OdWxsT2JqZWN0KHZhbHVlKSB7XG5cdHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCdcbn1cblxuZnVuY3Rpb24gaXNTcGVjaWFsKHZhbHVlKSB7XG5cdHZhciBzdHJpbmdWYWx1ZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG5cblx0cmV0dXJuIHN0cmluZ1ZhbHVlID09PSAnW29iamVjdCBSZWdFeHBdJ1xuXHRcdHx8IHN0cmluZ1ZhbHVlID09PSAnW29iamVjdCBEYXRlXSdcblx0XHR8fCBpc1JlYWN0RWxlbWVudCh2YWx1ZSlcbn1cblxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9ibG9iL2I1YWM5NjNmYjc5MWQxMjk4ZTdmMzk2MjM2MzgzYmM5NTVmOTE2YzEvc3JjL2lzb21vcnBoaWMvY2xhc3NpYy9lbGVtZW50L1JlYWN0RWxlbWVudC5qcyNMMjEtTDI1XG52YXIgY2FuVXNlU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuZm9yO1xudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGNhblVzZVN5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcblxuZnVuY3Rpb24gaXNSZWFjdEVsZW1lbnQodmFsdWUpIHtcblx0cmV0dXJuIHZhbHVlLiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEVcbn1cblxuZnVuY3Rpb24gZW1wdHlUYXJnZXQodmFsKSB7XG5cdHJldHVybiBBcnJheS5pc0FycmF5KHZhbCkgPyBbXSA6IHt9XG59XG5cbmZ1bmN0aW9uIGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKHZhbHVlLCBvcHRpb25zKSB7XG5cdHJldHVybiAob3B0aW9ucy5jbG9uZSAhPT0gZmFsc2UgJiYgb3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdCh2YWx1ZSkpXG5cdFx0PyBkZWVwbWVyZ2UoZW1wdHlUYXJnZXQodmFsdWUpLCB2YWx1ZSwgb3B0aW9ucylcblx0XHQ6IHZhbHVlXG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRBcnJheU1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG5cdHJldHVybiB0YXJnZXQuY29uY2F0KHNvdXJjZSkubWFwKGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0XHRyZXR1cm4gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQoZWxlbWVudCwgb3B0aW9ucylcblx0fSlcbn1cblxuZnVuY3Rpb24gZ2V0TWVyZ2VGdW5jdGlvbihrZXksIG9wdGlvbnMpIHtcblx0aWYgKCFvcHRpb25zLmN1c3RvbU1lcmdlKSB7XG5cdFx0cmV0dXJuIGRlZXBtZXJnZVxuXHR9XG5cdHZhciBjdXN0b21NZXJnZSA9IG9wdGlvbnMuY3VzdG9tTWVyZ2Uoa2V5KTtcblx0cmV0dXJuIHR5cGVvZiBjdXN0b21NZXJnZSA9PT0gJ2Z1bmN0aW9uJyA/IGN1c3RvbU1lcmdlIDogZGVlcG1lcmdlXG59XG5cbmZ1bmN0aW9uIGdldEVudW1lcmFibGVPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSB7XG5cdHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzXG5cdFx0PyBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkuZmlsdGVyKGZ1bmN0aW9uKHN5bWJvbCkge1xuXHRcdFx0cmV0dXJuIHRhcmdldC5wcm9wZXJ0eUlzRW51bWVyYWJsZShzeW1ib2wpXG5cdFx0fSlcblx0XHQ6IFtdXG59XG5cbmZ1bmN0aW9uIGdldEtleXModGFyZ2V0KSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyh0YXJnZXQpLmNvbmNhdChnZXRFbnVtZXJhYmxlT3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpXG59XG5cbmZ1bmN0aW9uIHByb3BlcnR5SXNPbk9iamVjdChvYmplY3QsIHByb3BlcnR5KSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHByb3BlcnR5IGluIG9iamVjdFxuXHR9IGNhdGNoKF8pIHtcblx0XHRyZXR1cm4gZmFsc2Vcblx0fVxufVxuXG4vLyBQcm90ZWN0cyBmcm9tIHByb3RvdHlwZSBwb2lzb25pbmcgYW5kIHVuZXhwZWN0ZWQgbWVyZ2luZyB1cCB0aGUgcHJvdG90eXBlIGNoYWluLlxuZnVuY3Rpb24gcHJvcGVydHlJc1Vuc2FmZSh0YXJnZXQsIGtleSkge1xuXHRyZXR1cm4gcHJvcGVydHlJc09uT2JqZWN0KHRhcmdldCwga2V5KSAvLyBQcm9wZXJ0aWVzIGFyZSBzYWZlIHRvIG1lcmdlIGlmIHRoZXkgZG9uJ3QgZXhpc3QgaW4gdGhlIHRhcmdldCB5ZXQsXG5cdFx0JiYgIShPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbCh0YXJnZXQsIGtleSkgLy8gdW5zYWZlIGlmIHRoZXkgZXhpc3QgdXAgdGhlIHByb3RvdHlwZSBjaGFpbixcblx0XHRcdCYmIE9iamVjdC5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHRhcmdldCwga2V5KSkgLy8gYW5kIGFsc28gdW5zYWZlIGlmIHRoZXkncmUgbm9uZW51bWVyYWJsZS5cbn1cblxuZnVuY3Rpb24gbWVyZ2VPYmplY3QodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpIHtcblx0dmFyIGRlc3RpbmF0aW9uID0ge307XG5cdGlmIChvcHRpb25zLmlzTWVyZ2VhYmxlT2JqZWN0KHRhcmdldCkpIHtcblx0XHRnZXRLZXlzKHRhcmdldCkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcblx0XHRcdGRlc3RpbmF0aW9uW2tleV0gPSBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZCh0YXJnZXRba2V5XSwgb3B0aW9ucyk7XG5cdFx0fSk7XG5cdH1cblx0Z2V0S2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG5cdFx0aWYgKHByb3BlcnR5SXNVbnNhZmUodGFyZ2V0LCBrZXkpKSB7XG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cblx0XHRpZiAocHJvcGVydHlJc09uT2JqZWN0KHRhcmdldCwga2V5KSAmJiBvcHRpb25zLmlzTWVyZ2VhYmxlT2JqZWN0KHNvdXJjZVtrZXldKSkge1xuXHRcdFx0ZGVzdGluYXRpb25ba2V5XSA9IGdldE1lcmdlRnVuY3Rpb24oa2V5LCBvcHRpb25zKSh0YXJnZXRba2V5XSwgc291cmNlW2tleV0sIG9wdGlvbnMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZXN0aW5hdGlvbltrZXldID0gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQoc291cmNlW2tleV0sIG9wdGlvbnMpO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBkZXN0aW5hdGlvblxufVxuXG5mdW5jdGlvbiBkZWVwbWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdG9wdGlvbnMuYXJyYXlNZXJnZSA9IG9wdGlvbnMuYXJyYXlNZXJnZSB8fCBkZWZhdWx0QXJyYXlNZXJnZTtcblx0b3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdCA9IG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3QgfHwgaXNNZXJnZWFibGVPYmplY3Q7XG5cdC8vIGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkIGlzIGFkZGVkIHRvIGBvcHRpb25zYCBzbyB0aGF0IGN1c3RvbSBhcnJheU1lcmdlKClcblx0Ly8gaW1wbGVtZW50YXRpb25zIGNhbiB1c2UgaXQuIFRoZSBjYWxsZXIgbWF5IG5vdCByZXBsYWNlIGl0LlxuXHRvcHRpb25zLmNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkID0gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQ7XG5cblx0dmFyIHNvdXJjZUlzQXJyYXkgPSBBcnJheS5pc0FycmF5KHNvdXJjZSk7XG5cdHZhciB0YXJnZXRJc0FycmF5ID0gQXJyYXkuaXNBcnJheSh0YXJnZXQpO1xuXHR2YXIgc291cmNlQW5kVGFyZ2V0VHlwZXNNYXRjaCA9IHNvdXJjZUlzQXJyYXkgPT09IHRhcmdldElzQXJyYXk7XG5cblx0aWYgKCFzb3VyY2VBbmRUYXJnZXRUeXBlc01hdGNoKSB7XG5cdFx0cmV0dXJuIGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKHNvdXJjZSwgb3B0aW9ucylcblx0fSBlbHNlIGlmIChzb3VyY2VJc0FycmF5KSB7XG5cdFx0cmV0dXJuIG9wdGlvbnMuYXJyYXlNZXJnZSh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucylcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gbWVyZ2VPYmplY3QodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpXG5cdH1cbn1cblxuZGVlcG1lcmdlLmFsbCA9IGZ1bmN0aW9uIGRlZXBtZXJnZUFsbChhcnJheSwgb3B0aW9ucykge1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXkpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdmaXJzdCBhcmd1bWVudCBzaG91bGQgYmUgYW4gYXJyYXknKVxuXHR9XG5cblx0cmV0dXJuIGFycmF5LnJlZHVjZShmdW5jdGlvbihwcmV2LCBuZXh0KSB7XG5cdFx0cmV0dXJuIGRlZXBtZXJnZShwcmV2LCBuZXh0LCBvcHRpb25zKVxuXHR9LCB7fSlcbn07XG5cbnZhciBkZWVwbWVyZ2VfMSA9IGRlZXBtZXJnZTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWVwbWVyZ2VfMTtcbiJdLCJuYW1lcyI6WyJyZXBsYWNlIiwiZXMiLCJjYSIsImVzY2EiLCJwZSIsIm0iLCJlc2NhcGUiLCJjYWxsIiwidW5lcyIsImNhcGUiLCJ1bmVzY2FwZSIsInVuIiwiaXNNZXJnZWFibGVPYmplY3QiLCJ2YWx1ZSIsImlzTm9uTnVsbE9iamVjdCIsImlzU3BlY2lhbCIsInN0cmluZ1ZhbHVlIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJpc1JlYWN0RWxlbWVudCIsImNhblVzZVN5bWJvbCIsIlN5bWJvbCIsIlJFQUNUX0VMRU1FTlRfVFlQRSIsIiQkdHlwZW9mIiwiZW1wdHlUYXJnZXQiLCJ2YWwiLCJBcnJheSIsImlzQXJyYXkiLCJjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZCIsIm9wdGlvbnMiLCJjbG9uZSIsImRlZXBtZXJnZSIsImRlZmF1bHRBcnJheU1lcmdlIiwidGFyZ2V0Iiwic291cmNlIiwiY29uY2F0IiwibWFwIiwiZWxlbWVudCIsImdldE1lcmdlRnVuY3Rpb24iLCJrZXkiLCJjdXN0b21NZXJnZSIsImdldEVudW1lcmFibGVPd25Qcm9wZXJ0eVN5bWJvbHMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJmaWx0ZXIiLCJzeW1ib2wiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsImdldEtleXMiLCJrZXlzIiwicHJvcGVydHlJc09uT2JqZWN0Iiwib2JqZWN0IiwicHJvcGVydHkiLCJfIiwicHJvcGVydHlJc1Vuc2FmZSIsImhhc093blByb3BlcnR5IiwibWVyZ2VPYmplY3QiLCJkZXN0aW5hdGlvbiIsImZvckVhY2giLCJhcnJheU1lcmdlIiwic291cmNlSXNBcnJheSIsInRhcmdldElzQXJyYXkiLCJzb3VyY2VBbmRUYXJnZXRUeXBlc01hdGNoIiwiYWxsIiwiZGVlcG1lcmdlQWxsIiwiYXJyYXkiLCJFcnJvciIsInJlZHVjZSIsInByZXYiLCJuZXh0IiwiZGVlcG1lcmdlXzEiLCJjanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7RUFFQSxXQUFrQixFQUFsQjtFQUFBLElBQU9BLE9BQVAsUUFBT0EsT0FBUDs7RUFHQSxJQUFNQyxFQUFFLEdBQUcsZ0RBQVg7RUFDQSxJQUFNQyxFQUFFLEdBQUcsVUFBWDtFQUVBLElBQU1DLElBQUksR0FBRztFQUNYLE9BQUssT0FETTtFQUVYLE9BQUssTUFGTTtFQUdYLE9BQUssTUFITTtFQUlYLE9BQUssT0FK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
