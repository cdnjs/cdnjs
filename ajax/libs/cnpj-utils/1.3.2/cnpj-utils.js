/**
 * cnpj-utils v1.3.2
 *
 * @author Julio L. Muller.
 * @license MIT - 2021-2025
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.cnpjUtils = factory());
})(this, (function () { 'use strict';

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

  const {
    replace
  } = '';
  const ca = /[&<>'"]/g;
  const esca = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  };
  const pe = m => esca[m];

  /**
   * Safely escape HTML entities such as `&`, `<`, `>`, `"`, and `'`.
   * @param {string} es the input to safely escape
   * @returns {string} the escaped input, and it **throws** an error if
   *  the input type is unexpected, except for boolean and numbers,
   *  converted as string.
   */
  const escape = es => replace.call(es, ca, pe);

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var build;
  var hasRequiredBuild;

  function requireBuild () {
  	if (hasRequiredBuild) return build;
  	hasRequiredBuild = 1;

  	function numOnly(target) {
  	  return String(target).replace(/\D/g, "");
  	}

  	build = numOnly;
  	
  	return build;
  }

  var buildExports = requireBuild();
  var numOnly = /*@__PURE__*/getDefaultExportFromCjs(buildExports);

  var cjs;
  var hasRequiredCjs;
  function requireCjs() {
    if (hasRequiredCjs) return cjs;
    hasRequiredCjs = 1;
    var isMergeableObject = function isMergeableObject(value) {
      return isNonNullObject(value) && !isSpecial(value);
    };
    function isNonNullObject(value) {
      return !!value && typeof value === 'object';
    }
    function isSpecial(value) {
      var stringValue = Object.prototype.toString.call(value);
      return stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value);
    }

    // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
    var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;
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
        return Object.propertyIsEnumerable.call(target, symbol);
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
    }

    // Protects from prototype poisoning and unexpected merging up the prototype chain.
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
      options.isMergeableObject = options.isMergeableObject || isMergeableObject;
      // cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
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
    cjs = deepmerge_1;
    return cjs;
  }

  var cjsExports = requireCjs();
  var mergeDeep = /*@__PURE__*/getDefaultExportFromCjs(cjsExports);

  const defaultOptions$1 = {
    delimiters: {
      dot: ".",
      slash: "/",
      dash: "-"
    },
    hiddenRange: {
      start: 5,
      end: 13
    },
    onFail: (value) => value,
    hiddenKey: "*",
    hidden: false,
    escape: false
  };
  function mergeOptions$1(customOptions = {}) {
    const options = mergeDeep(
      defaultOptions$1,
      customOptions
    );
    if (options.hidden) {
      if (isNaN(options.hiddenRange.start) || options.hiddenRange.start < 0 || options.hiddenRange.start > 13) {
        throw new TypeError('Option "hiddenRange.start" must be a number between 0 and 13.');
      }
      if (isNaN(options.hiddenRange.end) || options.hiddenRange.end < 0 || options.hiddenRange.end > 13) {
        throw new TypeError('Option "hiddenRange.end" must be a number between 0 and 13.');
      }
      if (options.hiddenRange.start > options.hiddenRange.end) {
        const aux = options.hiddenRange.start;
        options.hiddenRange.start = options.hiddenRange.end;
        options.hiddenRange.end = aux;
      }
    }
    if (typeof options.onFail !== "function") {
      throw new TypeError('The option "onFail" must be a callback function.');
    }
    return options;
  }

  function cnpjFmt(cnpjString, options) {
    const CNPJ_LENGTH = 14;
    const cnpjArray = numOnly(cnpjString).split("");
    const customOptions = mergeOptions$1(options);
    if (cnpjArray.length !== CNPJ_LENGTH) {
      const error = new Error(`Parameter "${cnpjString}" does not contain ${CNPJ_LENGTH} digits.`);
      return customOptions.onFail(cnpjString, error);
    }
    if (customOptions.hidden) {
      for (let i = customOptions.hiddenRange.start; i <= customOptions.hiddenRange.end; i++) {
        cnpjArray[i] = customOptions.hiddenKey;
      }
    }
    cnpjArray.splice(12, 0, customOptions.delimiters.dash);
    cnpjArray.splice(8, 0, customOptions.delimiters.slash);
    cnpjArray.splice(5, 0, customOptions.delimiters.dot);
    cnpjArray.splice(2, 0, customOptions.delimiters.dot);
    const cnpjPretty = cnpjArray.join("");
    if (customOptions.escape) {
      return escape(cnpjPretty);
    }
    return cnpjPretty;
  }

  function calculateDigit(cnpjSequence) {
    let index = 2;
    const sum = [...cnpjSequence].reduceRight((previousResult, number) => {
      const result = previousResult + number * index;
      index = index === 9 ? 2 : index + 1;
      return result;
    }, 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  const defaultOptions = {
    format: false,
    prefix: ""
  };
  function mergeOptions(customOptions = {}) {
    return mergeDeep(defaultOptions, customOptions);
  }

  function numberGenerator(length) {
    const numericSequence = [];
    while (numericSequence.length < length) {
      const random = Math.random() * 10;
      const integer = Math.floor(random);
      numericSequence.push(integer);
    }
    return numericSequence;
  }

  function cnpjGen(options) {
    const userOptions = mergeOptions(options);
    const baseSequence = numOnly(userOptions.prefix);
    const prefixLength = baseSequence.length;
    if (prefixLength < 0 || prefixLength > 12) {
      throw new Error('Option "prefix" must be a string containing between 1 and 12 digits.');
    }
    if (prefixLength > 8 && baseSequence.slice(8) === "0000") {
      throw new Error('The branch ID (characters 8 to 11) cannot be "0000".');
    }
    const branchID = [0, 0, 0, Math.ceil(Math.random() * 9)];
    const cnpjSequence = baseSequence.split("").map(Number).concat(numberGenerator(8 - prefixLength)).concat(branchID.slice(0, 12 - prefixLength));
    cnpjSequence.push(calculateDigit(cnpjSequence));
    cnpjSequence.push(calculateDigit(cnpjSequence));
    return userOptions.format ? cnpjFmt(cnpjSequence.join("")) : cnpjSequence.join("");
  }

  function cnpjVal(cnpjString) {
    const CNPJ_LENGTH = 14;
    const cnpjDigits = numOnly(cnpjString);
    if (cnpjDigits.length !== CNPJ_LENGTH) {
      return false;
    }
    return cnpjDigits === cnpjGen({
      prefix: cnpjDigits.slice(0, 12)
    });
  }

  var format = cnpjFmt;
  var generate = cnpjGen;
  var isValid = cnpjVal;
  var module = {
    format: format,
    generate: generate,
    isValid: isValid
  };

  return module;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY25wai11dGlscy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2h0bWwtZXNjYXBlci9lc20vaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbnVtLW9ubHkvYnVpbGQvaW5kZXguY2pzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2RlZXBtZXJnZS9kaXN0L2Nqcy5qcyIsIi4uLy4uL2NucGotZm10L2J1aWxkL2luZGV4Lm1qcyIsIi4uLy4uL2NucGotZ2VuL2J1aWxkL2luZGV4Lm1qcyIsIi4uLy4uL2NucGotdmFsL2J1aWxkL2luZGV4Lm1qcyIsIi4uL3NyYy9tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTctcHJlc2VudCBieSBBbmRyZWEgR2lhbW1hcmNoaSAtIEBXZWJSZWZsZWN0aW9uXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5jb25zdCB7cmVwbGFjZX0gPSAnJztcblxuLy8gZXNjYXBlXG5jb25zdCBlcyA9IC8mKD86YW1wfCMzOHxsdHwjNjB8Z3R8IzYyfGFwb3N8IzM5fHF1b3R8IzM0KTsvZztcbmNvbnN0IGNhID0gL1smPD4nXCJdL2c7XG5cbmNvbnN0IGVzY2EgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICBcIidcIjogJyYjMzk7JyxcbiAgJ1wiJzogJyZxdW90Oydcbn07XG5jb25zdCBwZSA9IG0gPT4gZXNjYVttXTtcblxuLyoqXG4gKiBTYWZlbHkgZXNjYXBlIEhUTUwgZW50aXRpZXMgc3VjaCBhcyBgJmAsIGA8YCwgYD5gLCBgXCJgLCBhbmQgYCdgLlxuICogQHBhcmFtIHtzdHJpbmd9IGVzIHRoZSBpbnB1dCB0byBzYWZlbHkgZXNjYXBlXG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgZXNjYXBlZCBpbnB1dCwgYW5kIGl0ICoqdGhyb3dzKiogYW4gZXJyb3IgaWZcbiAqICB0aGUgaW5wdXQgdHlwZSBpcyB1bmV4cGVjdGVkLCBleGNlcHQgZm9yIGJvb2xlYW4gYW5kIG51bWJlcnMsXG4gKiAgY29udmVydGVkIGFzIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGVzY2FwZSA9IGVzID0+IHJlcGxhY2UuY2FsbChlcywgY2EsIHBlKTtcblxuXG4vLyB1bmVzY2FwZVxuY29uc3QgdW5lcyA9IHtcbiAgJyZhbXA7JzogJyYnLFxuICAnJiMzODsnOiAnJicsXG4gICcmbHQ7JzogJzwnLFxuICAnJiM2MDsnOiAnPCcsXG4gICcmZ3Q7JzogJz4nLFxuICAnJiM2MjsnOiAnPicsXG4gICcmYXBvczsnOiBcIidcIixcbiAgJyYjMzk7JzogXCInXCIsXG4gICcmcXVvdDsnOiAnXCInLFxuICAnJiMzNDsnOiAnXCInXG59O1xuY29uc3QgY2FwZSA9IG0gPT4gdW5lc1ttXTtcblxuLyoqXG4gKiBTYWZlbHkgdW5lc2NhcGUgcHJldmlvdXNseSBlc2NhcGVkIGVudGl0aWVzIHN1Y2ggYXMgYCZgLCBgPGAsIGA+YCwgYFwiYCxcbiAqIGFuZCBgJ2AuXG4gKiBAcGFyYW0ge3N0cmluZ30gdW4gYSBwcmV2aW91c2x5IGVzY2FwZWQgc3RyaW5nXG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgdW5lc2NhcGVkIGlucHV0LCBhbmQgaXQgKip0aHJvd3MqKiBhbiBlcnJvciBpZlxuICogIHRoZSBpbnB1dCB0eXBlIGlzIHVuZXhwZWN0ZWQsIGV4Y2VwdCBmb3IgYm9vbGVhbiBhbmQgbnVtYmVycyxcbiAqICBjb252ZXJ0ZWQgYXMgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgdW5lc2NhcGUgPSB1biA9PiByZXBsYWNlLmNhbGwodW4sIGVzLCBjYXBlKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gbnVtT25seSh0YXJnZXQpIHtcbiAgcmV0dXJuIFN0cmluZyh0YXJnZXQpLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBudW1Pbmx5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhVzVrWlhndVkycHpJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12Ym5WdExXOXViSGt1ZEhNaVhTd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lablZ1WTNScGIyNGdiblZ0VDI1c2VTaDBZWEpuWlhRNklIVnVhMjV2ZDI0cE9pQnpkSEpwYm1jZ2UxeHVJQ0J5WlhSMWNtNGdVM1J5YVc1bktIUmhjbWRsZENrdWNtVndiR0ZqWlNndlhGeEVMMmNzSUNjbktUdGNibjFjYmx4dVpYaHdiM0owSUdSbFptRjFiSFFnYm5WdFQyNXNlVHRjYmlKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFVRkJMRk5CUVZNc1VVRkJVU3hOUVVGNVFpeEZRVUZCTzBGQlEzaERMRVZCUVVFc1QwRkJUeXhOUVVGUExFTkJRVUVzVFVGQlRTeERRVUZGTEVOQlFVRXNUMEZCUVN4RFFVRlJMRTlCUVU4c1JVRkJSU3hEUVVGQk8wRkJRM3BET3pzN095SjlcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzTWVyZ2VhYmxlT2JqZWN0ID0gZnVuY3Rpb24gaXNNZXJnZWFibGVPYmplY3QodmFsdWUpIHtcblx0cmV0dXJuIGlzTm9uTnVsbE9iamVjdCh2YWx1ZSlcblx0XHQmJiAhaXNTcGVjaWFsKHZhbHVlKVxufTtcblxuZnVuY3Rpb24gaXNOb25OdWxsT2JqZWN0KHZhbHVlKSB7XG5cdHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCdcbn1cblxuZnVuY3Rpb24gaXNTcGVjaWFsKHZhbHVlKSB7XG5cdHZhciBzdHJpbmdWYWx1ZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG5cblx0cmV0dXJuIHN0cmluZ1ZhbHVlID09PSAnW29iamVjdCBSZWdFeHBdJ1xuXHRcdHx8IHN0cmluZ1ZhbHVlID09PSAnW29iamVjdCBEYXRlXSdcblx0XHR8fCBpc1JlYWN0RWxlbWVudCh2YWx1ZSlcbn1cblxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9ibG9iL2I1YWM5NjNmYjc5MWQxMjk4ZTdmMzk2MjM2MzgzYmM5NTVmOTE2YzEvc3JjL2lzb21vcnBoaWMvY2xhc3NpYy9lbGVtZW50L1JlYWN0RWxlbWVudC5qcyNMMjEtTDI1XG52YXIgY2FuVXNlU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuZm9yO1xudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGNhblVzZVN5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcblxuZnVuY3Rpb24gaXNSZWFjdEVsZW1lbnQodmFsdWUpIHtcblx0cmV0dXJuIHZhbHVlLiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEVcbn1cblxuZnVuY3Rpb24gZW1wdHlUYXJnZXQodmFsKSB7XG5cdHJldHVybiBBcnJheS5pc0FycmF5KHZhbCkgPyBbXSA6IHt9XG59XG5cbmZ1bmN0aW9uIGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKHZhbHVlLCBvcHRpb25zKSB7XG5cdHJldHVybiAob3B0aW9ucy5jbG9uZSAhPT0gZmFsc2UgJiYgb3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdCh2YWx1ZSkpXG5cdFx0PyBkZWVwbWVyZ2UoZW1wdHlUYXJnZXQodmFsdWUpLCB2YWx1ZSwgb3B0aW9ucylcblx0XHQ6IHZhbHVlXG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRBcnJheU1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG5cdHJldHVybiB0YXJnZXQuY29uY2F0KHNvdXJjZSkubWFwKGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0XHRyZXR1cm4gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQoZWxlbWVudCwgb3B0aW9ucylcblx0fSlcbn1cblxuZnVuY3Rpb24gZ2V0TWVyZ2VGdW5jdGlvbihrZXksIG9wdGlvbnMpIHtcblx0aWYgKCFvcHRpb25zLmN1c3RvbU1lcmdlKSB7XG5cdFx0cmV0dXJuIGRlZXBtZXJnZVxuXHR9XG5cdHZhciBjdXN0b21NZXJnZSA9IG9wdGlvbnMuY3VzdG9tTWVyZ2Uoa2V5KTtcblx0cmV0dXJuIHR5cGVvZiBjdXN0b21NZXJnZSA9PT0gJ2Z1bmN0aW9uJyA/IGN1c3RvbU1lcmdlIDogZGVlcG1lcmdlXG59XG5cbmZ1bmN0aW9uIGdldEVudW1lcmFibGVPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSB7XG5cdHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzXG5cdFx0PyBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkuZmlsdGVyKGZ1bmN0aW9uKHN5bWJvbCkge1xuXHRcdFx0cmV0dXJuIE9iamVjdC5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHRhcmdldCwgc3ltYm9sKVxuXHRcdH0pXG5cdFx0OiBbXVxufVxuXG5mdW5jdGlvbiBnZXRLZXlzKHRhcmdldCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXModGFyZ2V0KS5jb25jYXQoZ2V0RW51bWVyYWJsZU93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKVxufVxuXG5mdW5jdGlvbiBwcm9wZXJ0eUlzT25PYmplY3Qob2JqZWN0LCBwcm9wZXJ0eSkge1xuXHR0cnkge1xuXHRcdHJldHVybiBwcm9wZXJ0eSBpbiBvYmplY3Rcblx0fSBjYXRjaChfKSB7XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cbn1cblxuLy8gUHJvdGVjdHMgZnJvbSBwcm90b3R5cGUgcG9pc29uaW5nIGFuZCB1bmV4cGVjdGVkIG1lcmdpbmcgdXAgdGhlIHByb3RvdHlwZSBjaGFpbi5cbmZ1bmN0aW9uIHByb3BlcnR5SXNVbnNhZmUodGFyZ2V0LCBrZXkpIHtcblx0cmV0dXJuIHByb3BlcnR5SXNPbk9iamVjdCh0YXJnZXQsIGtleSkgLy8gUHJvcGVydGllcyBhcmUgc2FmZSB0byBtZXJnZSBpZiB0aGV5IGRvbid0IGV4aXN0IGluIHRoZSB0YXJnZXQgeWV0LFxuXHRcdCYmICEoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwodGFyZ2V0LCBrZXkpIC8vIHVuc2FmZSBpZiB0aGV5IGV4aXN0IHVwIHRoZSBwcm90b3R5cGUgY2hhaW4sXG5cdFx0XHQmJiBPYmplY3QucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh0YXJnZXQsIGtleSkpIC8vIGFuZCBhbHNvIHVuc2FmZSBpZiB0aGV5J3JlIG5vbmVudW1lcmFibGUuXG59XG5cbmZ1bmN0aW9uIG1lcmdlT2JqZWN0KHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG5cdHZhciBkZXN0aW5hdGlvbiA9IHt9O1xuXHRpZiAob3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdCh0YXJnZXQpKSB7XG5cdFx0Z2V0S2V5cyh0YXJnZXQpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG5cdFx0XHRkZXN0aW5hdGlvbltrZXldID0gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQodGFyZ2V0W2tleV0sIG9wdGlvbnMpO1xuXHRcdH0pO1xuXHR9XG5cdGdldEtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuXHRcdGlmIChwcm9wZXJ0eUlzVW5zYWZlKHRhcmdldCwga2V5KSkge1xuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXG5cdFx0aWYgKHByb3BlcnR5SXNPbk9iamVjdCh0YXJnZXQsIGtleSkgJiYgb3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdChzb3VyY2Vba2V5XSkpIHtcblx0XHRcdGRlc3RpbmF0aW9uW2tleV0gPSBnZXRNZXJnZUZ1bmN0aW9uKGtleSwgb3B0aW9ucykodGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldLCBvcHRpb25zKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVzdGluYXRpb25ba2V5XSA9IGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKHNvdXJjZVtrZXldLCBvcHRpb25zKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gZGVzdGluYXRpb25cbn1cblxuZnVuY3Rpb24gZGVlcG1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHRvcHRpb25zLmFycmF5TWVyZ2UgPSBvcHRpb25zLmFycmF5TWVyZ2UgfHwgZGVmYXVsdEFycmF5TWVyZ2U7XG5cdG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3QgPSBvcHRpb25zLmlzTWVyZ2VhYmxlT2JqZWN0IHx8IGlzTWVyZ2VhYmxlT2JqZWN0O1xuXHQvLyBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZCBpcyBhZGRlZCB0byBgb3B0aW9uc2Agc28gdGhhdCBjdXN0b20gYXJyYXlNZXJnZSgpXG5cdC8vIGltcGxlbWVudGF0aW9ucyBjYW4gdXNlIGl0LiBUaGUgY2FsbGVyIG1heSBub3QgcmVwbGFjZSBpdC5cblx0b3B0aW9ucy5jbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZCA9IGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkO1xuXG5cdHZhciBzb3VyY2VJc0FycmF5ID0gQXJyYXkuaXNBcnJheShzb3VyY2UpO1xuXHR2YXIgdGFyZ2V0SXNBcnJheSA9IEFycmF5LmlzQXJyYXkodGFyZ2V0KTtcblx0dmFyIHNvdXJjZUFuZFRhcmdldFR5cGVzTWF0Y2ggPSBzb3VyY2VJc0FycmF5ID09PSB0YXJnZXRJc0FycmF5O1xuXG5cdGlmICghc291cmNlQW5kVGFyZ2V0VHlwZXNNYXRjaCkge1xuXHRcdHJldHVybiBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZChzb3VyY2UsIG9wdGlvbnMpXG5cdH0gZWxzZSBpZiAoc291cmNlSXNBcnJheSkge1xuXHRcdHJldHVybiBvcHRpb25zLmFycmF5TWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpXG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIG1lcmdlT2JqZWN0KHRhcmdldCwgc291cmNlLCBvcHRpb25zKVxuXHR9XG59XG5cbmRlZXBtZXJnZS5hbGwgPSBmdW5jdGlvbiBkZWVwbWVyZ2VBbGwoYXJyYXksIG9wdGlvbnMpIHtcblx0aWYgKCFBcnJheS5pc0FycmF5KGFycmF5KSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignZmlyc3QgYXJndW1lbnQgc2hvdWxkIGJlIGFuIGFycmF5Jylcblx0fVxuXG5cdHJldHVybiBhcnJheS5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgbmV4dCkge1xuXHRcdHJldHVybiBkZWVwbWVyZ2UocHJldiwgbmV4dCwgb3B0aW9ucylcblx0fSwge30pXG59O1xuXG52YXIgZGVlcG1lcmdlXzEgPSBkZWVwbWVyZ2U7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVlcG1lcmdlXzE7XG4iLCJpbXBvcnQgeyBlc2NhcGUgfSBmcm9tICdodG1sLWVzY2FwZXInO1xuaW1wb3J0IG51bU9ubHkgZnJvbSAnbnVtLW9ubHknO1xuaW1wb3J0IG1lcmdlRGVlcCBmcm9tICdkZWVwbWVyZ2UnO1xuXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgZGVsaW1pdGVyczoge1xuICAgIGRvdDogXCIuXCIsXG4gICAgc2xhc2g6IFwiL1wiLFxuICAgIGRhc2g6IFwiLVwiXG4gIH0sXG4gIGhpZGRlblJhbmdlOiB7XG4gICAgc3RhcnQ6IDUsXG4gICAgZW5kOiAxM1xuICB9LFxuICBvbkZhaWw6ICh2YWx1ZSkgPT4gdmFsdWUsXG4gIGhpZGRlbktleTogXCIqXCIsXG4gIGhpZGRlbjogZmFsc2UsXG4gIGVzY2FwZTogZmFsc2Vcbn07XG5mdW5jdGlvbiBtZXJnZU9wdGlvbnMoY3VzdG9tT3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IG9wdGlvbnMgPSBtZXJnZURlZXAoXG4gICAgZGVmYXVsdE9wdGlvbnMsXG4gICAgY3VzdG9tT3B0aW9uc1xuICApO1xuICBpZiAob3B0aW9ucy5oaWRkZW4pIHtcbiAgICBpZiAoaXNOYU4ob3B0aW9ucy5oaWRkZW5SYW5nZS5zdGFydCkgfHwgb3B0aW9ucy5oaWRkZW5SYW5nZS5zdGFydCA8IDAgfHwgb3B0aW9ucy5oaWRkZW5SYW5nZS5zdGFydCA+IDEzKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdPcHRpb24gXCJoaWRkZW5SYW5nZS5zdGFydFwiIG11c3QgYmUgYSBudW1iZXIgYmV0d2VlbiAwIGFuZCAxMy4nKTtcbiAgICB9XG4gICAgaWYgKGlzTmFOKG9wdGlvbnMuaGlkZGVuUmFuZ2UuZW5kKSB8fCBvcHRpb25zLmhpZGRlblJhbmdlLmVuZCA8IDAgfHwgb3B0aW9ucy5oaWRkZW5SYW5nZS5lbmQgPiAxMykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT3B0aW9uIFwiaGlkZGVuUmFuZ2UuZW5kXCIgbXVzdCBiZSBhIG51bWJlciBiZXR3ZWVuIDAgYW5kIDEzLicpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5oaWRkZW5SYW5nZS5zdGFydCA+IG9wdGlvbnMuaGlkZGVuUmFuZ2UuZW5kKSB7XG4gICAgICBjb25zdCBhdXggPSBvcHRpb25zLmhpZGRlblJhbmdlLnN0YXJ0O1xuICAgICAgb3B0aW9ucy5oaWRkZW5SYW5nZS5zdGFydCA9IG9wdGlvbnMuaGlkZGVuUmFuZ2UuZW5kO1xuICAgICAgb3B0aW9ucy5oaWRkZW5SYW5nZS5lbmQgPSBhdXg7XG4gICAgfVxuICB9XG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5vbkZhaWwgIT09IFwiZnVuY3Rpb25cIikge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBvcHRpb24gXCJvbkZhaWxcIiBtdXN0IGJlIGEgY2FsbGJhY2sgZnVuY3Rpb24uJyk7XG4gIH1cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbmZ1bmN0aW9uIGNucGpGbXQoY25walN0cmluZywgb3B0aW9ucykge1xuICBjb25zdCBDTlBKX0xFTkdUSCA9IDE0O1xuICBjb25zdCBjbnBqQXJyYXkgPSBudW1Pbmx5KGNucGpTdHJpbmcpLnNwbGl0KFwiXCIpO1xuICBjb25zdCBjdXN0b21PcHRpb25zID0gbWVyZ2VPcHRpb25zKG9wdGlvbnMpO1xuICBpZiAoY25wakFycmF5Lmxlbmd0aCAhPT0gQ05QSl9MRU5HVEgpIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgUGFyYW1ldGVyIFwiJHtjbnBqU3RyaW5nfVwiIGRvZXMgbm90IGNvbnRhaW4gJHtDTlBKX0xFTkdUSH0gZGlnaXRzLmApO1xuICAgIHJldHVybiBjdXN0b21PcHRpb25zLm9uRmFpbChjbnBqU3RyaW5nLCBlcnJvcik7XG4gIH1cbiAgaWYgKGN1c3RvbU9wdGlvbnMuaGlkZGVuKSB7XG4gICAgZm9yIChsZXQgaSA9IGN1c3RvbU9wdGlvbnMuaGlkZGVuUmFuZ2Uuc3RhcnQ7IGkgPD0gY3VzdG9tT3B0aW9ucy5oaWRkZW5SYW5nZS5lbmQ7IGkrKykge1xuICAgICAgY25wakFycmF5W2ldID0gY3VzdG9tT3B0aW9ucy5oaWRkZW5LZXk7XG4gICAgfVxuICB9XG4gIGNucGpBcnJheS5zcGxpY2UoMTIsIDAsIGN1c3RvbU9wdGlvbnMuZGVsaW1pdGVycy5kYXNoKTtcbiAgY25wakFycmF5LnNwbGljZSg4LCAwLCBjdXN0b21PcHRpb25zLmRlbGltaXRlcnMuc2xhc2gpO1xuICBjbnBqQXJyYXkuc3BsaWNlKDUsIDAsIGN1c3RvbU9wdGlvbnMuZGVsaW1pdGVycy5kb3QpO1xuICBjbnBqQXJyYXkuc3BsaWNlKDIsIDAsIGN1c3RvbU9wdGlvbnMuZGVsaW1pdGVycy5kb3QpO1xuICBjb25zdCBjbnBqUHJldHR5ID0gY25wakFycmF5LmpvaW4oXCJcIik7XG4gIGlmIChjdXN0b21PcHRpb25zLmVzY2FwZSkge1xuICAgIHJldHVybiBlc2NhcGUoY25walByZXR0eSk7XG4gIH1cbiAgcmV0dXJuIGNucGpQcmV0dHk7XG59XG5cbmV4cG9ydCB7IGNucGpGbXQgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhVzVrWlhndWJXcHpJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12YldWeVoyVXRiM0IwYVc5dWN5NTBjeUlzSWk0dUwzTnlZeTlqYm5CcUxXWnRkQzUwY3lKZExDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SnBiWEJ2Y25RZ2JXVnlaMlZFWldWd0lHWnliMjBnSjJSbFpYQnRaWEpuWlNjN1hHNWNiblI1Y0dVZ1JHVmxjRkJoY25ScFlXdzhWRDRnUFNCN1hHNGdJRnRRSUdsdUlHdGxlVzltSUZSZFB6b2dSR1ZsY0ZCaGNuUnBZV3c4VkZ0UVhUNDdYRzU5TzF4dVhHNWxlSEJ2Y25RZ2FXNTBaWEptWVdObElFRmpkSFZoYkVOdWNHcEdiM0p0WVhSMGFXNW5UM0IwYVc5dWN6eFBia1Z5Y2taaGJHeGlZV05yUGlCN1hHNGdJR1JsYkdsdGFYUmxjbk02SUh0Y2JpQWdJQ0JrWVhOb09pQnpkSEpwYm1jN1hHNGdJQ0FnWkc5ME9pQnpkSEpwYm1jN1hHNGdJQ0FnYzJ4aGMyZzZJSE4wY21sdVp6dGNiaUFnZlR0Y2JpQWdaWE5qWVhCbE9pQmliMjlzWldGdU8xeHVJQ0JvYVdSa1pXNDZJR0p2YjJ4bFlXNDdYRzRnSUdocFpHUmxia3RsZVRvZ2MzUnlhVzVuTzF4dUlDQm9hV1JrWlc1U1lXNW5aVG9nZTF4dUlDQWdJR1Z1WkRvZ2JuVnRZbVZ5TzF4dUlDQWdJSE4wWVhKME9pQnVkVzFpWlhJN1hHNGdJSDA3WEc0Z0lHOXVSbUZwYkRvZ0tIWmhiSFZsT2lCemRISnBibWNzSUdWeWNtOXlPaUJGY25KdmNpa2dQVDRnVDI1RmNuSkdZV3hzWW1GamF6dGNibjFjYmx4dVpYaHdiM0owSUhSNWNHVWdRMjV3YWtadmNtMWhkSFJwYm1kUGNIUnBiMjV6UEU5dVJYSnlSbUZzYkdKaFkycytJRDBnUkdWbGNGQmhjblJwWVd3OFhHNGdJRUZqZEhWaGJFTnVjR3BHYjNKdFlYUjBhVzVuVDNCMGFXOXVjenhQYmtWeWNrWmhiR3hpWVdOclBseHVQanRjYmx4dVkyOXVjM1FnWkdWbVlYVnNkRTl3ZEdsdmJuTTZJRUZqZEhWaGJFTnVjR3BHYjNKdFlYUjBhVzVuVDNCMGFXOXVjenh6ZEhKcGJtYytJRDBnZTF4dUlDQmtaV3hwYldsMFpYSnpPaUI3WEc0Z0lDQWdaRzkwT2lBbkxpY3NYRzRnSUNBZ2MyeGhjMmc2SUNjdkp5eGNiaUFnSUNCa1lYTm9PaUFuTFNjc1hHNGdJSDBzWEc0Z0lHaHBaR1JsYmxKaGJtZGxPaUI3WEc0Z0lDQWdjM1JoY25RNklEVXNYRzRnSUNBZ1pXNWtPaUF4TXl4Y2JpQWdmU3hjYmlBZ2IyNUdZV2xzT2lBb2RtRnNkV1VwSUQwK0lIWmhiSFZsTEZ4dUlDQm9hV1JrWlc1TFpYazZJQ2NxSnl4Y2JpQWdhR2xrWkdWdU9pQm1ZV3h6WlN4Y2JpQWdaWE5qWVhCbE9pQm1ZV3h6WlN4Y2JuMDdYRzVjYmk4cUtseHVJQ29nVFdWeVoyVWdZM1Z6ZEc5dElHOXdkR2x2Ym5NZ2RHOGdkR2hsSUdSbFptRjFiSFFnYjI1bGN5NWNiaUFxTDF4dVpuVnVZM1JwYjI0Z2JXVnlaMlZQY0hScGIyNXpQRTl1UlhKeVJtRnNiR0poWTJzK0tGeHVJQ0JqZFhOMGIyMVBjSFJwYjI1ek9pQkRibkJxUm05eWJXRjBkR2x1WjA5d2RHbHZibk04VDI1RmNuSkdZV3hzWW1GamF6NGdQU0I3ZlN4Y2JpazZJRUZqZEhWaGJFTnVjR3BHYjNKdFlYUjBhVzVuVDNCMGFXOXVjenhQYmtWeWNrWmhiR3hpWVdOclBpQjdYRzRnSUdOdmJuTjBJRzl3ZEdsdmJuTWdQU0J0WlhKblpVUmxaWEFvWEc0Z0lDQWdaR1ZtWVhWc2RFOXdkR2x2Ym5Nc1hHNGdJQ0FnWTNWemRHOXRUM0IwYVc5dWN5eGNiaUFnS1NCaGN5QkJZM1IxWVd4RGJuQnFSbTl5YldGMGRHbHVaMDl3ZEdsdmJuTThUMjVGY25KR1lXeHNZbUZqYXo0N1hHNWNiaUFnYVdZZ0tHOXdkR2x2Ym5NdWFHbGtaR1Z1S1NCN1hHNGdJQ0FnYVdZZ0tGeHVJQ0FnSUNBZ2FYTk9ZVTRvYjNCMGFXOXVjeTVvYVdSa1pXNVNZVzVuWlM1emRHRnlkQ2tnZkh4Y2JpQWdJQ0FnSUc5d2RHbHZibk11YUdsa1pHVnVVbUZ1WjJVdWMzUmhjblFnUENBd0lIeDhYRzRnSUNBZ0lDQnZjSFJwYjI1ekxtaHBaR1JsYmxKaGJtZGxMbk4wWVhKMElENGdNVE5jYmlBZ0lDQXBJSHRjYmlBZ0lDQWdJSFJvY205M0lHNWxkeUJVZVhCbFJYSnliM0lvSjA5d2RHbHZiaUJjSW1ocFpHUmxibEpoYm1kbExuTjBZWEowWENJZ2JYVnpkQ0JpWlNCaElHNTFiV0psY2lCaVpYUjNaV1Z1SURBZ1lXNWtJREV6TGljcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUdsbUlDaGNiaUFnSUNBZ0lHbHpUbUZPS0c5d2RHbHZibk11YUdsa1pHVnVVbUZ1WjJVdVpXNWtLU0I4ZkZ4dUlDQWdJQ0FnYjNCMGFXOXVjeTVvYVdSa1pXNVNZVzVuWlM1bGJtUWdQQ0F3SUh4OFhHNGdJQ0FnSUNCdmNIUnBiMjV6TG1ocFpHUmxibEpoYm1kbExtVnVaQ0ErSURFelhHNGdJQ0FnS1NCN1hHNGdJQ0FnSUNCMGFISnZkeUJ1WlhjZ1ZIbHdaVVZ5Y205eUtDZFBjSFJwYjI0Z1hDSm9hV1JrWlc1U1lXNW5aUzVsYm1SY0lpQnRkWE4wSUdKbElHRWdiblZ0WW1WeUlHSmxkSGRsWlc0Z01DQmhibVFnTVRNdUp5azdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2FXWWdLRzl3ZEdsdmJuTXVhR2xrWkdWdVVtRnVaMlV1YzNSaGNuUWdQaUJ2Y0hScGIyNXpMbWhwWkdSbGJsSmhibWRsTG1WdVpDa2dlMXh1SUNBZ0lDQWdZMjl1YzNRZ1lYVjRJRDBnYjNCMGFXOXVjeTVvYVdSa1pXNVNZVzVuWlM1emRHRnlkRHRjYmlBZ0lDQWdJRzl3ZEdsdmJuTXVhR2xrWkdWdVVtRnVaMlV1YzNSaGNuUWdQU0J2Y0hScGIyNXpMbWhwWkdSbGJsSmhibWRsTG1WdVpEdGNiaUFnSUNBZ0lHOXdkR2x2Ym5NdWFHbGtaR1Z1VW1GdVoyVXVaVzVrSUQwZ1lYVjRPMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJR2xtSUNoMGVYQmxiMllnYjNCMGFXOXVjeTV2YmtaaGFXd2dJVDA5SUNkbWRXNWpkR2x2YmljcElIdGNiaUFnSUNCMGFISnZkeUJ1WlhjZ1ZIbHdaVVZ5Y205eUtDZFVhR1VnYjNCMGFXOXVJRndpYjI1R1lXbHNYQ0lnYlhWemRDQmlaU0JoSUdOaGJHeGlZV05ySUdaMWJtTjBhVzl1TGljcE8xeHVJQ0I5WEc1Y2JpQWdjbVYwZFhKdUlHOXdkR2x2Ym5NN1hHNTlYRzVjYm1WNGNHOXlkQ0JrWldaaGRXeDBJRzFsY21kbFQzQjBhVzl1Y3p0Y2JpSXNJbWx0Y0c5eWRDQjdJR1Z6WTJGd1pTQmhjeUJsYzJOaGNHVklWRTFNSUgwZ1puSnZiU0FuYUhSdGJDMWxjMk5oY0dWeUp6dGNibWx0Y0c5eWRDQnVkVzFQYm14NUlHWnliMjBnSjI1MWJTMXZibXg1Snp0Y2JseHVhVzF3YjNKMElHMWxjbWRsVDNCMGFXOXVjeUJtY205dElDY3VMMjFsY21kbExXOXdkR2x2Ym5Nbk8xeHVhVzF3YjNKMElIUjVjR1VnZXlCRGJuQnFSbTl5YldGMGRHbHVaMDl3ZEdsdmJuTWdmU0JtY205dElDY3VMMjFsY21kbExXOXdkR2x2Ym5Nbk8xeHVYRzR2S2lwY2JpQXFJRVp2Y20xaGRDQmhJR2RwZG1WdUlFTk9VRW9nWTJoaGNpQnpaWEYxWlc1alpTNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1kyNXdha1p0ZER4UGJrVnlja1poYkd4aVlXTnJJRDBnYzNSeWFXNW5QaWhjYmlBZ1kyNXdhbE4wY21sdVp6b2djM1J5YVc1bkxGeHVJQ0J2Y0hScGIyNXpQem9nUTI1d2FrWnZjbTFoZEhScGJtZFBjSFJwYjI1elBFOXVSWEp5Um1Gc2JHSmhZMnMrTEZ4dUtUb2djM1J5YVc1bklIdGNiaUFnWTI5dWMzUWdRMDVRU2w5TVJVNUhWRWdnUFNBeE5EdGNiaUFnWTI5dWMzUWdZMjV3YWtGeWNtRjVJRDBnYm5WdFQyNXNlU2hqYm5CcVUzUnlhVzVuS1M1emNHeHBkQ2duSnlrN1hHNGdJR052Ym5OMElHTjFjM1J2YlU5d2RHbHZibk1nUFNCdFpYSm5aVTl3ZEdsdmJuTW9iM0IwYVc5dWN5azdYRzVjYmlBZ2FXWWdLR051Y0dwQmNuSmhlUzVzWlc1bmRHZ2dJVDA5SUVOT1VFcGZURVZPUjFSSUtTQjdYRzRnSUNBZ1kyOXVjM1FnWlhKeWIzSWdQU0J1WlhjZ1JYSnliM0lvWUZCaGNtRnRaWFJsY2lCY0lpUjdZMjV3YWxOMGNtbHVaMzFjSWlCa2IyVnpJRzV2ZENCamIyNTBZV2x1SUNSN1EwNVFTbDlNUlU1SFZFaDlJR1JwWjJsMGN5NWdLVHRjYmx4dUlDQWdJSEpsZEhWeWJpQmpkWE4wYjIxUGNIUnBiMjV6TG05dVJtRnBiQ2hqYm5CcVUzUnlhVzVuTENCbGNuSnZjaWtnWVhNZ2MzUnlhVzVuTzF4dUlDQjlYRzVjYmlBZ2FXWWdLR04xYzNSdmJVOXdkR2x2Ym5NdWFHbGtaR1Z1S1NCN1hHNGdJQ0FnWm05eUlDaHNaWFFnYVNBOUlHTjFjM1J2YlU5d2RHbHZibk11YUdsa1pHVnVVbUZ1WjJVdWMzUmhjblE3SUdrZ1BEMGdZM1Z6ZEc5dFQzQjBhVzl1Y3k1b2FXUmtaVzVTWVc1blpTNWxibVE3SUdrckt5a2dlMXh1SUNBZ0lDQWdZMjV3YWtGeWNtRjVXMmxkSUQwZ1kzVnpkRzl0VDNCMGFXOXVjeTVvYVdSa1pXNUxaWGs3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnWTI1d2FrRnljbUY1TG5Od2JHbGpaU2d4TWl3Z01Dd2dZM1Z6ZEc5dFQzQjBhVzl1Y3k1a1pXeHBiV2wwWlhKekxtUmhjMmdwTzF4dUlDQmpibkJxUVhKeVlYa3VjM0JzYVdObEtEZ3NJREFzSUdOMWMzUnZiVTl3ZEdsdmJuTXVaR1ZzYVcxcGRHVnljeTV6YkdGemFDazdYRzRnSUdOdWNHcEJjbkpoZVM1emNHeHBZMlVvTlN3Z01Dd2dZM1Z6ZEc5dFQzQjBhVzl1Y3k1a1pXeHBiV2wwWlhKekxtUnZkQ2s3WEc0Z0lHTnVjR3BCY25KaGVTNXpjR3hwWTJVb01pd2dNQ3dnWTNWemRHOXRUM0IwYVc5dWN5NWtaV3hwYldsMFpYSnpMbVJ2ZENrN1hHNGdJR052Ym5OMElHTnVjR3BRY21WMGRIa2dQU0JqYm5CcVFYSnlZWGt1YW05cGJpZ25KeWs3WEc1Y2JpQWdhV1lnS0dOMWMzUnZiVTl3ZEdsdmJuTXVaWE5qWVhCbEtTQjdYRzRnSUNBZ2NtVjBkWEp1SUdWelkyRndaVWhVVFV3b1kyNXdhbEJ5WlhSMGVTazdYRzRnSUgxY2JseHVJQ0J5WlhSMWNtNGdZMjV3YWxCeVpYUjBlVHRjYm4xY2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ1kyNXdha1p0ZER0Y2JpSmRMQ0p1WVcxbGN5STZXeUpsYzJOaGNHVklWRTFNSWwwc0ltMWhjSEJwYm1keklqb2lPenM3TzBGQk1FSkJMRTFCUVUwc1kwRkJRU3hIUVVGelJEdEJRVUZCTEVWQlF6RkVMRlZCUVVFc1JVRkJXVHRCUVVGQkxFbEJRMVlzUjBGQlFTeEZRVUZMTEVkQlFVRTdRVUZCUVN4SlFVTk1MRXRCUVVFc1JVRkJUeXhIUVVGQk8wRkJRVUVzU1VGRFVDeEpRVUZCTEVWQlFVMDdRVUZCUVN4SFFVTlNPMEZCUVVFc1JVRkRRU3hYUVVGQkxFVkJRV0U3UVVGQlFTeEpRVU5ZTEV0QlFVRXNSVUZCVHl4RFFVRkJPMEZCUVVFc1NVRkRVQ3hIUVVGQkxFVkJRVXM3UVVGQlFTeEhRVU5RTzBGQlFVRXNSVUZEUVN4TlFVRkJMRVZCUVZFc1EwRkJReXhMUVVGQkxFdEJRVlVzUzBGQlFUdEJRVUZCTEVWQlEyNUNMRk5CUVVFc1JVRkJWeXhIUVVGQk8wRkJRVUVzUlVGRFdDeE5RVUZCTEVWQlFWRXNTMEZCUVR0QlFVRkJMRVZCUTFJc1RVRkJRU3hGUVVGUk8wRkJRMVlzUTBGQlFUdEJRVXRCTEZOQlFWTXNXVUZCUVN4RFFVTlFMR0ZCUVVFc1IwRkJjMFFzUlVGQlF5eEZRVU5ZTzBGQlF6VkRMRVZCUVVFc1RVRkJUU3hQUVVGQkxFZEJRVlVzVTBGQlFUdEJRVUZCTEVsQlEyUXNZMEZCUVR0QlFVRkJMRWxCUTBFN1FVRkJRU3hIUVVOR08wRkJSVUVzUlVGQlFTeEpRVUZKTEZGQlFWRXNUVUZCUVN4RlFVRlJPMEZCUTJ4Q0xFbEJRVUVzU1VGRFJTeExRVUZCTEVOQlFVMHNUMEZCUVN4RFFVRlJMRmRCUVVFc1EwRkJXU3hMUVVGTExFTkJRVUVzU1VGREwwSXNUMEZCUVN4RFFVRlJMRmRCUVVFc1EwRkJXU3hMUVVGQkxFZEJRVkVzUTBGQlFTeEpRVU0xUWl4UFFVRkJMRU5CUVZFc1YwRkJRU3hEUVVGWkxFdEJRVUVzUjBGQlVTeEZRVUZCTEVWQlF6VkNPMEZCUTBFc1RVRkJRU3hOUVVGTkxFbEJRVWtzVlVGQlZTd3JSRUZCSzBRc1EwRkJRVHRCUVVGQkxFbEJRM0pHTzBGQlJVRXNTVUZCUVN4SlFVTkZMRXRCUVVFc1EwRkJUU3hQUVVGQkxFTkJRVkVzVjBGQlFTeERRVUZaTEVkQlFVY3NRMEZCUVN4SlFVTTNRaXhQUVVGQkxFTkJRVkVzVjBGQlFTeERRVUZaTEVkQlFVRXNSMEZCVFN4RFFVRkJMRWxCUXpGQ0xFOUJRVUVzUTBGQlVTeFhRVUZCTEVOQlFWa3NSMEZCUVN4SFFVRk5MRVZCUVVFc1JVRkRNVUk3UVVGRFFTeE5RVUZCTEUxQlFVMHNTVUZCU1N4VlFVRlZMRFpFUVVFMlJDeERRVUZCTzBGQlFVRXNTVUZEYmtZN1FVRkZRU3hKUVVGQkxFbEJRVWtzVDBGQlFTeERRVUZSTEZkQlFVRXNRMEZCV1N4TFFVRkJMRWRCUVZFc1QwRkJRU3hEUVVGUkxGbEJRVmtzUjBGQlFTeEZRVUZMTzBGQlEzWkVMRTFCUVVFc1RVRkJUU3hIUVVGQkxFZEJRVTBzVVVGQlVTeFhRVUZCTEVOQlFWa3NTMEZCUVR0QlFVTm9ReXhOUVVGQkxFOUJRVUVzUTBGQlVTeFhRVUZCTEVOQlFWa3NTMEZCUVN4SFFVRlJMRTlCUVVFc1EwRkJVU3hYUVVGQkxFTkJRVmtzUjBGQlFUdEJRVU5vUkN4TlFVRkJMRTlCUVVFc1EwRkJVU3haUVVGWkxFZEJRVUVzUjBGQlRTeEhRVUZCTzBGQlFVRXNTVUZETlVJN1FVRkJRU3hGUVVOR08wRkJSVUVzUlVGQlFTeEpRVUZKTEU5QlFVOHNUMEZCUVN4RFFVRlJMRTFCUVVFc1MwRkJWeXhWUVVGQkxFVkJRVms3UVVGRGVFTXNTVUZCUVN4TlFVRk5MRWxCUVVrc1ZVRkJWU3hyUkVGQmEwUXNRMEZCUVR0QlFVRkJMRVZCUTNoRk8wRkJSVUVzUlVGQlFTeFBRVUZQTEU5QlFVRTdRVUZEVkRzN1FVTjZSVUVzVTBGQlV5eFBRVUZCTEVOQlExQXNXVUZEUVN4UFFVRkJMRVZCUTFFN1FVRkRVaXhGUVVGQkxFMUJRVTBzVjBGQlFTeEhRVUZqTEVWQlFVRTdRVUZEY0VJc1JVRkJRU3hOUVVGTkxGTkJRVUVzUjBGQldTeFBRVUZCTEVOQlFWRXNWVUZCVlN4RFFVRkJMRU5CUVVVc1RVRkJUU3hGUVVGRkxFTkJRVUU3UVVGRE9VTXNSVUZCUVN4TlFVRk5MR0ZCUVVFc1IwRkJaMElzWVVGQllTeFBRVUZQTEVOQlFVRTdRVUZGTVVNc1JVRkJRU3hKUVVGSkxGTkJRVUVzUTBGQlZTeFhRVUZYTEZkQlFVRXNSVUZCWVR0QlFVTndReXhKUVVGQkxFMUJRVTBzVVVGQlVTeEpRVUZKTEV0QlFVRXNRMEZCVFN4alFVRmpMRlZCUVZVc1EwRkJRU3h0UWtGQlFTeEZRVUZ6UWl4WFFVRlhMRU5CUVVFc1VVRkJRU3hEUVVGVkxFTkJRVUU3UVVGRk0wWXNTVUZCUVN4UFFVRlBMR0ZCUVVFc1EwRkJZeXhOUVVGQkxFTkJRVThzVlVGQlFTeEZRVUZaTEV0QlFVc3NRMEZCUVR0QlFVRkJMRVZCUXk5RE8wRkJSVUVzUlVGQlFTeEpRVUZKTEdOQlFXTXNUVUZCUVN4RlFVRlJPMEZCUTNoQ0xFbEJRVUVzUzBGQlFTeEpRVUZUTEVOQlFVRXNSMEZCU1N4alFVRmpMRmRCUVVFc1EwRkJXU3hMUVVGQkxFVkJRVThzUzBGQlN5eGhRVUZCTEVOQlFXTXNWMEZCUVN4RFFVRlpMRXRCUVVzc1EwRkJRU3hGUVVGQkxFVkJRVXM3UVVGRGNrWXNUVUZCUVN4VFFVRkJMRU5CUVZVc1EwRkJReXhKUVVGSkxHRkJRVUVzUTBGQll5eFRRVUZCTzBGQlFVRXNTVUZETDBJN1FVRkJRU3hGUVVOR08wRkJSVUVzUlVGQlFTeFRRVUZCTEVOQlFWVXNUVUZCUVN4RFFVRlBMRVZCUVVFc1JVRkJTU3hEUVVGQkxFVkJRVWNzWVVGQlFTeERRVUZqTEZkQlFWY3NTVUZCU1N4RFFVRkJPMEZCUTNKRUxFVkJRVUVzVTBGQlFTeERRVUZWTEUxQlFVRXNRMEZCVHl4RFFVRkJMRVZCUVVjc1EwRkJRU3hGUVVGSExHRkJRVUVzUTBGQll5eFhRVUZYTEV0QlFVc3NRMEZCUVR0QlFVTnlSQ3hGUVVGQkxGTkJRVUVzUTBGQlZTeE5RVUZCTEVOQlFVOHNRMEZCUVN4RlFVRkhMRU5CUVVFc1JVRkJSeXhoUVVGQkxFTkJRV01zVjBGQlZ5eEhRVUZITEVOQlFVRTdRVUZEYmtRc1JVRkJRU3hUUVVGQkxFTkJRVlVzVFVGQlFTeERRVUZQTEVOQlFVRXNSVUZCUnl4RFFVRkJMRVZCUVVjc1lVRkJRU3hEUVVGakxGZEJRVmNzUjBGQlJ5eERRVUZCTzBGQlEyNUVMRVZCUVVFc1RVRkJUU3hWUVVGQkxFZEJRV0VzVTBGQlFTeERRVUZWTEVsQlFVRXNRMEZCU3l4RlFVRkZMRU5CUVVFN1FVRkZjRU1zUlVGQlFTeEpRVUZKTEdOQlFXTXNUVUZCUVN4RlFVRlJPMEZCUTNoQ0xFbEJRVUVzVDBGQlQwRXNUMEZCVnl4VlFVRlZMRU5CUVVFN1FVRkJRU3hGUVVNNVFqdEJRVVZCTEVWQlFVRXNUMEZCVHl4VlFVRkJPMEZCUTFRN096czdJbjA9XG4iLCJpbXBvcnQgY25wakZtdCBmcm9tICdAbGFjdXNzb2Z0L2NucGotZm10JztcbmltcG9ydCBudW1Pbmx5IGZyb20gJ251bS1vbmx5JztcbmltcG9ydCBtZXJnZURlZXAgZnJvbSAnZGVlcG1lcmdlJztcblxuZnVuY3Rpb24gY2FsY3VsYXRlRGlnaXQoY25walNlcXVlbmNlKSB7XG4gIGxldCBpbmRleCA9IDI7XG4gIGNvbnN0IHN1bSA9IFsuLi5jbnBqU2VxdWVuY2VdLnJlZHVjZVJpZ2h0KChwcmV2aW91c1Jlc3VsdCwgbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gcHJldmlvdXNSZXN1bHQgKyBudW1iZXIgKiBpbmRleDtcbiAgICBpbmRleCA9IGluZGV4ID09PSA5ID8gMiA6IGluZGV4ICsgMTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LCAwKTtcbiAgY29uc3QgcmVtYWluZGVyID0gc3VtICUgMTE7XG4gIHJldHVybiByZW1haW5kZXIgPCAyID8gMCA6IDExIC0gcmVtYWluZGVyO1xufVxuXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgZm9ybWF0OiBmYWxzZSxcbiAgcHJlZml4OiBcIlwiXG59O1xuZnVuY3Rpb24gbWVyZ2VPcHRpb25zKGN1c3RvbU9wdGlvbnMgPSB7fSkge1xuICByZXR1cm4gbWVyZ2VEZWVwKGRlZmF1bHRPcHRpb25zLCBjdXN0b21PcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gbnVtYmVyR2VuZXJhdG9yKGxlbmd0aCkge1xuICBjb25zdCBudW1lcmljU2VxdWVuY2UgPSBbXTtcbiAgd2hpbGUgKG51bWVyaWNTZXF1ZW5jZS5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICBjb25zdCByYW5kb20gPSBNYXRoLnJhbmRvbSgpICogMTA7XG4gICAgY29uc3QgaW50ZWdlciA9IE1hdGguZmxvb3IocmFuZG9tKTtcbiAgICBudW1lcmljU2VxdWVuY2UucHVzaChpbnRlZ2VyKTtcbiAgfVxuICByZXR1cm4gbnVtZXJpY1NlcXVlbmNlO1xufVxuXG5mdW5jdGlvbiBjbnBqR2VuKG9wdGlvbnMpIHtcbiAgY29uc3QgdXNlck9wdGlvbnMgPSBtZXJnZU9wdGlvbnMob3B0aW9ucyk7XG4gIGNvbnN0IGJhc2VTZXF1ZW5jZSA9IG51bU9ubHkodXNlck9wdGlvbnMucHJlZml4KTtcbiAgY29uc3QgcHJlZml4TGVuZ3RoID0gYmFzZVNlcXVlbmNlLmxlbmd0aDtcbiAgaWYgKHByZWZpeExlbmd0aCA8IDAgfHwgcHJlZml4TGVuZ3RoID4gMTIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ09wdGlvbiBcInByZWZpeFwiIG11c3QgYmUgYSBzdHJpbmcgY29udGFpbmluZyBiZXR3ZWVuIDEgYW5kIDEyIGRpZ2l0cy4nKTtcbiAgfVxuICBpZiAocHJlZml4TGVuZ3RoID4gOCAmJiBiYXNlU2VxdWVuY2Uuc2xpY2UoOCkgPT09IFwiMDAwMFwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgYnJhbmNoIElEIChjaGFyYWN0ZXJzIDggdG8gMTEpIGNhbm5vdCBiZSBcIjAwMDBcIi4nKTtcbiAgfVxuICBjb25zdCBicmFuY2hJRCA9IFswLCAwLCAwLCBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDkpXTtcbiAgY29uc3QgY25walNlcXVlbmNlID0gYmFzZVNlcXVlbmNlLnNwbGl0KFwiXCIpLm1hcChOdW1iZXIpLmNvbmNhdChudW1iZXJHZW5lcmF0b3IoOCAtIHByZWZpeExlbmd0aCkpLmNvbmNhdChicmFuY2hJRC5zbGljZSgwLCAxMiAtIHByZWZpeExlbmd0aCkpO1xuICBjbnBqU2VxdWVuY2UucHVzaChjYWxjdWxhdGVEaWdpdChjbnBqU2VxdWVuY2UpKTtcbiAgY25walNlcXVlbmNlLnB1c2goY2FsY3VsYXRlRGlnaXQoY25walNlcXVlbmNlKSk7XG4gIHJldHVybiB1c2VyT3B0aW9ucy5mb3JtYXQgPyBjbnBqRm10KGNucGpTZXF1ZW5jZS5qb2luKFwiXCIpKSA6IGNucGpTZXF1ZW5jZS5qb2luKFwiXCIpO1xufVxuXG5leHBvcnQgeyBjbnBqR2VuIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYVc1a1pYZ3ViV3B6SWl3aWMyOTFjbU5sY3lJNld5SXVMaTl6Y21NdlkyRnNZM1ZzWVhSbExXUnBaMmwwTG5Seklpd2lMaTR2YzNKakwyMWxjbWRsTFc5d2RHbHZibk11ZEhNaUxDSXVMaTl6Y21NdmJuVnRZbVZ5TFdkbGJtVnlZWFJ2Y2k1MGN5SXNJaTR1TDNOeVl5OWpibkJxTFdkbGJpNTBjeUpkTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJdktpcGNiaUFxSUVOaGJHTjFiR0YwWlNCMGFHVWdkbVZ5YVdacFpYSWdaR2xuYVhRZ1ltRnpaV1FnYjI0Z1EwNVFTaUJpWVhObElHNTFiV1Z5YVdNZ2MyVnhkV1Z1WTJVdVhHNGdLaTljYm1aMWJtTjBhVzl1SUdOaGJHTjFiR0YwWlVScFoybDBLR051Y0dwVFpYRjFaVzVqWlRvZ2JuVnRZbVZ5VzEwcE9pQnVkVzFpWlhJZ2UxeHVJQ0JzWlhRZ2FXNWtaWGdnUFNBeU8xeHVJQ0JqYjI1emRDQnpkVzBnUFNCYkxpNHVZMjV3YWxObGNYVmxibU5sWFM1eVpXUjFZMlZTYVdkb2RDZ29jSEpsZG1sdmRYTlNaWE4xYkhRc0lHNTFiV0psY2lrZ1BUNGdlMXh1SUNBZ0lHTnZibk4wSUhKbGMzVnNkQ0E5SUhCeVpYWnBiM1Z6VW1WemRXeDBJQ3NnYm5WdFltVnlJQ29nYVc1a1pYZzdYRzRnSUNBZ2FXNWtaWGdnUFNCcGJtUmxlQ0E5UFQwZ09TQS9JRElnT2lCcGJtUmxlQ0FySURFN1hHNWNiaUFnSUNCeVpYUjFjbTRnY21WemRXeDBPMXh1SUNCOUxDQXdLVHRjYmx4dUlDQmpiMjV6ZENCeVpXMWhhVzVrWlhJZ1BTQnpkVzBnSlNBeE1UdGNibHh1SUNCeVpYUjFjbTRnY21WdFlXbHVaR1Z5SUR3Z01pQS9JREFnT2lBeE1TQXRJSEpsYldGcGJtUmxjanRjYm4xY2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ1kyRnNZM1ZzWVhSbFJHbG5hWFE3WEc0aUxDSnBiWEJ2Y25RZ2JXVnlaMlZFWldWd0lHWnliMjBnSjJSbFpYQnRaWEpuWlNjN1hHNWNibVY0Y0c5eWRDQnBiblJsY21aaFkyVWdRV04wZFdGc1EyNXdha2RsYm1WeVlYUnZjazl3ZEdsdmJuTWdlMXh1SUNCbWIzSnRZWFE2SUdKdmIyeGxZVzQ3WEc0Z0lIQnlaV1pwZURvZ2MzUnlhVzVuTzF4dWZWeHVYRzVsZUhCdmNuUWdkSGx3WlNCRGJuQnFSMlZ1WlhKaGRHOXlUM0IwYVc5dWN5QTlJRkJoY25ScFlXdzhRV04wZFdGc1EyNXdha2RsYm1WeVlYUnZjazl3ZEdsdmJuTStPMXh1WEc1amIyNXpkQ0JrWldaaGRXeDBUM0IwYVc5dWN5QTlJSHRjYmlBZ1ptOXliV0YwT2lCbVlXeHpaU3hjYmlBZ2NISmxabWw0T2lBbkp5eGNibjA3WEc1Y2JpOHFLbHh1SUNvZ1RXVnlaMlVnWTNWemRHOXRJRzl3ZEdsdmJuTWdkRzhnZEdobElHUmxabUYxYkhRZ2IyNWxjeTVjYmlBcUwxeHVablZ1WTNScGIyNGdiV1Z5WjJWUGNIUnBiMjV6S0dOMWMzUnZiVTl3ZEdsdmJuTTZJRU51Y0dwSFpXNWxjbUYwYjNKUGNIUnBiMjV6SUQwZ2UzMHBPaUJCWTNSMVlXeERibkJxUjJWdVpYSmhkRzl5VDNCMGFXOXVjeUI3WEc0Z0lISmxkSFZ5YmlCdFpYSm5aVVJsWlhBb1pHVm1ZWFZzZEU5d2RHbHZibk1zSUdOMWMzUnZiVTl3ZEdsdmJuTXBPMXh1ZlZ4dVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCdFpYSm5aVTl3ZEdsdmJuTTdYRzRpTENJdktpcGNiaUFxSUVkbGJtVnlZWFJsSUdGdUlHRnljbUY1SUc5bUlISmhibVJ2YlNCemRISnBibWRwWm1sbFpDQnVkVzFpWlhKeklHSmxkSGRsWlc0Z01DQmhibVFnSURrdVhHNGdLaTljYm1aMWJtTjBhVzl1SUc1MWJXSmxja2RsYm1WeVlYUnZjaWhzWlc1bmRHZzZJRzUxYldKbGNpazZJRzUxYldKbGNsdGRJSHRjYmlBZ1kyOXVjM1FnYm5WdFpYSnBZMU5sY1hWbGJtTmxPaUJ1ZFcxaVpYSmJYU0E5SUZ0ZE8xeHVYRzRnSUhkb2FXeGxJQ2h1ZFcxbGNtbGpVMlZ4ZFdWdVkyVXViR1Z1WjNSb0lEd2diR1Z1WjNSb0tTQjdYRzRnSUNBZ1kyOXVjM1FnY21GdVpHOXRJRDBnVFdGMGFDNXlZVzVrYjIwb0tTQXFJREV3TzF4dUlDQWdJR052Ym5OMElHbHVkR1ZuWlhJZ1BTQk5ZWFJvTG1ac2IyOXlLSEpoYm1SdmJTazdYRzVjYmlBZ0lDQnVkVzFsY21salUyVnhkV1Z1WTJVdWNIVnphQ2hwYm5SbFoyVnlLVHRjYmlBZ2ZWeHVYRzRnSUhKbGRIVnliaUJ1ZFcxbGNtbGpVMlZ4ZFdWdVkyVTdYRzU5WEc1Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUc1MWJXSmxja2RsYm1WeVlYUnZjanRjYmlJc0ltbHRjRzl5ZENCamJuQnFSbTEwSUdaeWIyMGdKMEJzWVdOMWMzTnZablF2WTI1d2FpMW1iWFFuTzF4dWFXMXdiM0owSUc1MWJVOXViSGtnWm5KdmJTQW5iblZ0TFc5dWJIa25PMXh1WEc1cGJYQnZjblFnWTJGc1kzVnNZWFJsUkdsbmFYUWdabkp2YlNBbkxpOWpZV3hqZFd4aGRHVXRaR2xuYVhRbk8xeHVhVzF3YjNKMElHMWxjbWRsVDNCMGFXOXVjeUJtY205dElDY3VMMjFsY21kbExXOXdkR2x2Ym5Nbk8xeHVhVzF3YjNKMElIUjVjR1VnZXlCRGJuQnFSMlZ1WlhKaGRHOXlUM0IwYVc5dWN5QjlJR1p5YjIwZ0p5NHZiV1Z5WjJVdGIzQjBhVzl1Y3ljN1hHNXBiWEJ2Y25RZ2JuVnRZbVZ5UjJWdVpYSmhkRzl5SUdaeWIyMGdKeTR2Ym5WdFltVnlMV2RsYm1WeVlYUnZjaWM3WEc1Y2JpOHFLbHh1SUNvZ1IyVnVaWEpoZEdVZ1lTQjJZV3hwWkNCRFRsQktJQ2hDY21GNmFXeHBZVzRnWTI5dGNHRnVlU0JKUkNrZ2JuVnRaWEpwWXlCelpYRjFaVzVqWlM1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnWTI1d2FrZGxiaWh2Y0hScGIyNXpQem9nUTI1d2FrZGxibVZ5WVhSdmNrOXdkR2x2Ym5NcE9pQnpkSEpwYm1jZ2UxeHVJQ0JqYjI1emRDQjFjMlZ5VDNCMGFXOXVjeUE5SUcxbGNtZGxUM0IwYVc5dWN5aHZjSFJwYjI1ektUdGNiaUFnWTI5dWMzUWdZbUZ6WlZObGNYVmxibU5sSUQwZ2JuVnRUMjVzZVNoMWMyVnlUM0IwYVc5dWN5NXdjbVZtYVhncE8xeHVJQ0JqYjI1emRDQndjbVZtYVhoTVpXNW5kR2dnUFNCaVlYTmxVMlZ4ZFdWdVkyVXViR1Z1WjNSb08xeHVYRzRnSUdsbUlDaHdjbVZtYVhoTVpXNW5kR2dnUENBd0lIeDhJSEJ5WldacGVFeGxibWQwYUNBK0lERXlLU0I3WEc0Z0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZFBjSFJwYjI0Z1hDSndjbVZtYVhoY0lpQnRkWE4wSUdKbElHRWdjM1J5YVc1bklHTnZiblJoYVc1cGJtY2dZbVYwZDJWbGJpQXhJR0Z1WkNBeE1pQmthV2RwZEhNdUp5azdYRzRnSUgxY2JpQWdhV1lnS0hCeVpXWnBlRXhsYm1kMGFDQStJRGdnSmlZZ1ltRnpaVk5sY1hWbGJtTmxMbk5zYVdObEtEZ3BJRDA5UFNBbk1EQXdNQ2NwSUh0Y2JpQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9KMVJvWlNCaWNtRnVZMmdnU1VRZ0tHTm9ZWEpoWTNSbGNuTWdPQ0IwYnlBeE1Ta2dZMkZ1Ym05MElHSmxJRndpTURBd01Gd2lMaWNwTzF4dUlDQjlYRzVjYmlBZ1kyOXVjM1FnWW5KaGJtTm9TVVFnUFNCYk1Dd2dNQ3dnTUN3Z1RXRjBhQzVqWldsc0tFMWhkR2d1Y21GdVpHOXRLQ2tnS2lBNUtWMDdYRzRnSUdOdmJuTjBJR051Y0dwVFpYRjFaVzVqWlNBOUlHSmhjMlZUWlhGMVpXNWpaVnh1SUNBZ0lDNXpjR3hwZENnbkp5bGNiaUFnSUNBdWJXRndLRTUxYldKbGNpbGNiaUFnSUNBdVkyOXVZMkYwS0c1MWJXSmxja2RsYm1WeVlYUnZjaWc0SUMwZ2NISmxabWw0VEdWdVozUm9LU2xjYmlBZ0lDQXVZMjl1WTJGMEtHSnlZVzVqYUVsRUxuTnNhV05sS0RBc0lERXlJQzBnY0hKbFptbDRUR1Z1WjNSb0tTazdYRzVjYmlBZ1kyNXdhbE5sY1hWbGJtTmxMbkIxYzJnb1kyRnNZM1ZzWVhSbFJHbG5hWFFvWTI1d2FsTmxjWFZsYm1ObEtTazdYRzRnSUdOdWNHcFRaWEYxWlc1alpTNXdkWE5vS0dOaGJHTjFiR0YwWlVScFoybDBLR051Y0dwVFpYRjFaVzVqWlNrcE8xeHVYRzRnSUhKbGRIVnliaUIxYzJWeVQzQjBhVzl1Y3k1bWIzSnRZWFFnUHlCamJuQnFSbTEwS0dOdWNHcFRaWEYxWlc1alpTNXFiMmx1S0NjbktTa2dPaUJqYm5CcVUyVnhkV1Z1WTJVdWFtOXBiaWduSnlrN1hHNTlYRzVjYm1WNGNHOXlkQ0JrWldaaGRXeDBJR051Y0dwSFpXNDdYRzRpWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3T3p0QlFVZEJMRk5CUVZNc1pVRkJaU3haUVVGQkxFVkJRV2RETzBGQlEzUkVMRVZCUVVFc1NVRkJTU3hMUVVGQkxFZEJRVkVzUTBGQlFUdEJRVU5hTEVWQlFVRXNUVUZCVFN4SFFVRkJMRWRCUVUwc1EwRkJReXhIUVVGSExGbEJRVmtzUlVGQlJTeFhRVUZCTEVOQlFWa3NRMEZCUXl4blFrRkJaMElzVFVGQlFTeExRVUZYTzBGQlEzQkZMRWxCUVVFc1RVRkJUU3hOUVVGQkxFZEJRVk1zYVVKQlFXbENMRTFCUVVFc1IwRkJVeXhMUVVGQk8wRkJRM3BETEVsQlFVRXNTMEZCUVN4SFFVRlJMRXRCUVVFc1MwRkJWU3hEUVVGQkxFZEJRVWtzUTBGQlFTeEhRVUZKTEV0QlFVRXNSMEZCVVN4RFFVRkJPMEZCUld4RExFbEJRVUVzVDBGQlR5eE5RVUZCTzBGQlFVRXNSVUZEVkN4SFFVRkhMRU5CUVVNc1EwRkJRVHRCUVVWS0xFVkJRVUVzVFVGQlRTeFpRVUZaTEVkQlFVRXNSMEZCVFN4RlFVRkJPMEZCUlhoQ0xFVkJRVUVzVDBGQlR5eFRRVUZCTEVkQlFWa3NRMEZCUVN4SFFVRkpMRU5CUVVFc1IwRkJTU3hGUVVGQkxFZEJRVXNzVTBGQlFUdEJRVU5zUXpzN1FVTk9RU3hOUVVGTkxHTkJRVUVzUjBGQmFVSTdRVUZCUVN4RlFVTnlRaXhOUVVGQkxFVkJRVkVzUzBGQlFUdEJRVUZCTEVWQlExSXNUVUZCUVN4RlFVRlJPMEZCUTFZc1EwRkJRVHRCUVV0QkxGTkJRVk1zV1VGQlFTeERRVUZoTEdGQlFVRXNSMEZCYzBNc1JVRkJReXhGUVVFclFqdEJRVU14Uml4RlFVRkJMRTlCUVU4c1UwRkJRU3hEUVVGVkxHZENRVUZuUWl4aFFVRmhMRU5CUVVFN1FVRkRhRVE3TzBGRGFFSkJMRk5CUVZNc1owSkJRV2RDTEUxQlFVRXNSVUZCTUVJN1FVRkRha1FzUlVGQlFTeE5RVUZOTEd0Q1FVRTBRaXhGUVVGRE8wRkJSVzVETEVWQlFVRXNUMEZCVHl4bFFVRkJMRU5CUVdkQ0xGTkJRVk1zVFVGQlFTeEZRVUZSTzBGQlEzUkRMRWxCUVVFc1RVRkJUU3hOUVVGQkxFZEJRVk1zU1VGQlFTeERRVUZMTEUxQlFVRXNSVUZCVHl4SFFVRkpMRVZCUVVFN1FVRkRMMElzU1VGQlFTeE5RVUZOTEU5QlFVRXNSMEZCVlN4SlFVRkJMRU5CUVVzc1MwRkJRU3hEUVVGTkxFMUJRVTBzUTBGQlFUdEJRVVZxUXl4SlFVRkJMR1ZCUVVFc1EwRkJaMElzUzBGQlN5eFBRVUZQTEVOQlFVRTdRVUZCUVN4RlFVTTVRanRCUVVWQkxFVkJRVUVzVDBGQlR5eGxRVUZCTzBGQlExUTdPMEZEU0VFc1UwRkJVeXhSUVVGUkxFOUJRVUVzUlVGQmQwTTdRVUZEZGtRc1JVRkJRU3hOUVVGTkxGZEJRVUVzUjBGQll5eGhRVUZoTEU5QlFVOHNRMEZCUVR0QlFVTjRReXhGUVVGQkxFMUJRVTBzV1VGQlFTeEhRVUZsTEU5QlFVRXNRMEZCVVN4WFFVRkJMRU5CUVZrc1RVRkJUU3hEUVVGQk8wRkJReTlETEVWQlFVRXNUVUZCVFN4bFFVRmxMRmxCUVVFc1EwRkJZU3hOUVVGQk8wRkJSV3hETEVWQlFVRXNTVUZCU1N4WlFVRkJMRWRCUVdVc1EwRkJRU3hKUVVGTExGbEJRVUVzUjBGQlpTeEZRVUZCTEVWQlFVazdRVUZEZWtNc1NVRkJRU3hOUVVGTkxFbEJRVWtzVFVGQlRTeHpSVUZCYzBVc1EwRkJRVHRCUVVGQkxFVkJRM2hHTzBGQlEwRXNSVUZCUVN4SlFVRkpMR1ZCUVdVc1EwRkJRU3hKUVVGTExGbEJRVUVzUTBGQllTeExRVUZCTEVOQlFVMHNRMEZCUXl4TlFVRk5MRTFCUVVFc1JVRkJVVHRCUVVONFJDeEpRVUZCTEUxQlFVMHNTVUZCU1N4TlFVRk5MSE5FUVVGelJDeERRVUZCTzBGQlFVRXNSVUZEZUVVN1FVRkZRU3hGUVVGQkxFMUJRVTBzVVVGQlFTeEhRVUZYTEVOQlFVTXNRMEZCUVN4RlFVRkhMRU5CUVVFc1JVRkJSeXhEUVVGQkxFVkJRVWNzU1VGQlFTeERRVUZMTEVsQlFVRXNRMEZCU3l4SlFVRkJMRU5CUVVzc1RVRkJRU3hGUVVGUExFZEJRVWtzUTBGQlF5eERRVUZETEVOQlFVRTdRVUZEZGtRc1JVRkJRU3hOUVVGTkxGbEJRVUVzUjBGQlpTeGhRVU5zUWl4TFFVRkJMRU5CUVUwc1JVRkJSU3hGUVVOU0xFZEJRVUVzUTBGQlNTeE5RVUZOTEVWQlExWXNUVUZCUVN4RFFVRlBMR1ZCUVVFc1EwRkJaMElzU1VGQlNTeFpRVUZaTEVOQlFVTXNSVUZEZUVNc1RVRkJRU3hEUVVGUExGRkJRVUVzUTBGQlV5eE5RVUZOTEVOQlFVRXNSVUZCUnl4RlFVRkJMRWRCUVVzc1dVRkJXU3hEUVVGRExFTkJRVUU3UVVGRk9VTXNSVUZCUVN4WlFVRkJMRU5CUVdFc1NVRkJRU3hEUVVGTExHTkJRVUVzUTBGQlpTeFpRVUZaTEVOQlFVTXNRMEZCUVR0QlFVTTVReXhGUVVGQkxGbEJRVUVzUTBGQllTeEpRVUZCTEVOQlFVc3NZMEZCUVN4RFFVRmxMRmxCUVZrc1EwRkJReXhEUVVGQk8wRkJSVGxETEVWQlFVRXNUMEZCVHl4WFFVRkJMRU5CUVZrc1RVRkJRU3hIUVVGVExFOUJRVUVzUTBGQlVTeFpRVUZCTEVOQlFXRXNTVUZCUVN4RFFVRkxMRVZCUVVVc1EwRkJReXhEUVVGQkxFZEJRVWtzV1VGQlFTeERRVUZoTEVsQlFVRXNRMEZCU3l4RlFVRkZMRU5CUVVFN1FVRkRia1k3T3pzN0luMD1cbiIsImltcG9ydCBjbnBqR2VuIGZyb20gJ0BsYWN1c3NvZnQvY25wai1nZW4nO1xuaW1wb3J0IG51bU9ubHkgZnJvbSAnbnVtLW9ubHknO1xuXG5mdW5jdGlvbiBjbnBqVmFsKGNucGpTdHJpbmcpIHtcbiAgY29uc3QgQ05QSl9MRU5HVEggPSAxNDtcbiAgY29uc3QgY25wakRpZ2l0cyA9IG51bU9ubHkoY25walN0cmluZyk7XG4gIGlmIChjbnBqRGlnaXRzLmxlbmd0aCAhPT0gQ05QSl9MRU5HVEgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGNucGpEaWdpdHMgPT09IGNucGpHZW4oe1xuICAgIHByZWZpeDogY25wakRpZ2l0cy5zbGljZSgwLCAxMilcbiAgfSk7XG59XG5cbmV4cG9ydCB7IGNucGpWYWwgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhVzVrWlhndWJXcHpJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12WTI1d2FpMTJZV3d1ZEhNaVhTd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lhVzF3YjNKMElHTnVjR3BIWlc0Z1puSnZiU0FuUUd4aFkzVnpjMjltZEM5amJuQnFMV2RsYmljN1hHNXBiWEJ2Y25RZ2JuVnRUMjVzZVNCbWNtOXRJQ2R1ZFcwdGIyNXNlU2M3WEc1Y2JpOHFLbHh1SUNvZ1ZtRnNhV1JoZEdVZ1lTQm5hWFpsYmlCRFRsQktJQ2hDY21GNmFXeHBZVzRnWTI5dGNHRnVlU0JKUkNrZ1kyaGhjaUJ6WlhGMVpXNWpaUzVjYmlBcUwxeHVablZ1WTNScGIyNGdZMjV3YWxaaGJDaGpibkJxVTNSeWFXNW5PaUJ6ZEhKcGJtY3BPaUJpYjI5c1pXRnVJSHRjYmlBZ1kyOXVjM1FnUTA1UVNsOU1SVTVIVkVnZ1BTQXhORHRjYmlBZ1kyOXVjM1FnWTI1d2FrUnBaMmwwY3lBOUlHNTFiVTl1Ykhrb1kyNXdhbE4wY21sdVp5azdYRzVjYmlBZ2FXWWdLR051Y0dwRWFXZHBkSE11YkdWdVozUm9JQ0U5UFNCRFRsQktYMHhGVGtkVVNDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCbVlXeHpaVHRjYmlBZ2ZWeHVYRzRnSUhKbGRIVnliaUFvWEc0Z0lDQWdZMjV3YWtScFoybDBjeUE5UFQxY2JpQWdJQ0JqYm5CcVIyVnVLSHRjYmlBZ0lDQWdJSEJ5WldacGVEb2dZMjV3YWtScFoybDBjeTV6YkdsalpTZ3dMQ0F4TWlrc1hHNGdJQ0FnZlNsY2JpQWdLVHRjYm4xY2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ1kyNXdhbFpoYkR0Y2JpSmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96czdRVUZOUVN4VFFVRlRMRkZCUVZFc1ZVRkJRU3hGUVVFMlFqdEJRVU0xUXl4RlFVRkJMRTFCUVUwc1YwRkJRU3hIUVVGakxFVkJRVUU3UVVGRGNFSXNSVUZCUVN4TlFVRk5MRlZCUVVFc1IwRkJZU3hSUVVGUkxGVkJRVlVzUTBGQlFUdEJRVVZ5UXl4RlFVRkJMRWxCUVVrc1ZVRkJRU3hEUVVGWExGZEJRVmNzVjBGQlFTeEZRVUZoTzBGQlEzSkRMRWxCUVVFc1QwRkJUeXhMUVVGQk8wRkJRVUVzUlVGRFZEdEJRVVZCTEVWQlFVRXNUMEZEUlN4bFFVTkJMRTlCUVVFc1EwRkJVVHRCUVVGQkxFbEJRMDRzVFVGQlFTeEZRVUZSTEZWQlFVRXNRMEZCVnl4TFFVRkJMRU5CUVUwc1EwRkJRU3hGUVVGSExFVkJRVVU3UVVGQlFTeEhRVU12UWl4RFFVRkJPMEZCUlV3N096czdJbjA9XG4iLCJpbXBvcnQgY25wakZtdCBmcm9tICdAbGFjdXNzb2Z0L2NucGotZm10JztcbmltcG9ydCBjbnBqR2VuIGZyb20gJ0BsYWN1c3NvZnQvY25wai1nZW4nO1xuaW1wb3J0IGNucGpWYWwgZnJvbSAnQGxhY3Vzc29mdC9jbnBqLXZhbCc7XG5cbmV4cG9ydCBjb25zdCBmb3JtYXQgPSBjbnBqRm10O1xuXG5leHBvcnQgY29uc3QgZ2VuZXJhdGUgPSBjbnBqR2VuO1xuXG5leHBvcnQgY29uc3QgaXNWYWxpZCA9IGNucGpWYWw7XG5cbmV4cG9ydCBkZWZhdWx0IHsgZm9ybWF0LCBnZW5lcmF0ZSwgaXNWYWxpZCB9O1xuIl0sIm5hbWVzIjpbInJlcGxhY2UiLCJjYSIsImVzY2EiLCJwZSIsIm0iLCJlc2NhcGUiLCJlcyIsImNhbGwiLCJpc01lcmdlYWJsZU9iamVjdCIsInZhbHVlIiwiaXNOb25OdWxsT2JqZWN0IiwiaXNTcGVjaWFsIiwic3RyaW5nVmFsdWUiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImlzUmVhY3RFbGVtZW50IiwiY2FuVXNlU3ltYm9sIiwiU3ltYm9sIiwiZm9yIiwiUkVBQ1RfRUxFTUVOVF9UWVBFIiwiJCR0eXBlb2YiLCJlbXB0eVRhcmdldCIsInZhbCIsIkFycmF5IiwiaXNBcnJheSIsImNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkIiwib3B0aW9ucyIsImNsb25lIiwiZGVlcG1lcmdlIiwiZGVmYXVsdEFycmF5TWVyZ2UiLCJ0YXJnZXQiLCJzb3VyY2UiLCJjb25jYXQiLCJtYXAiLCJlbGVtZW50IiwiZ2V0TWVyZ2VGdW5jdGlvbiIsImtleSIsImN1c3RvbU1lcmdlIiwiZ2V0RW51bWVyYWJsZU93blByb3BlcnR5U3ltYm9scyIsImdldE93blByb3BlcnR5U3ltYm9scyIsImZpbHRlciIsInN5bWJvbCIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwiZ2V0S2V5cyIsImtleXMiLCJwcm9wZXJ0eUlzT25PYmplY3QiLCJvYmplY3QiLCJwcm9wZXJ0eSIsIl8iLCJwcm9wZXJ0eUlzVW5zYWZlIiwiaGFzT3duUHJvcGVydHkiLCJtZXJnZU9iamVjdCIsImRlc3RpbmF0aW9uIiwiZm9yRWFjaCIsImFycmF5TWVyZ2UiLCJzb3VyY2VJc0FycmF5IiwidGFyZ2V0SXNBcnJheSIsInNvdXJjZUFuZFRhcmdldFR5cGVzTWF0Y2giLCJhbGwiLCJkZWVwbWVyZ2VBbGwiLCJhcnJheSIsIkVycm9yIiwicmVkdWNlIiwicHJldiIsIm5leHQiLCJkZWVwbWVyZ2VfMSIsImNqcyIsImRlZmF1bHRPcHRpb25zIiwibWVyZ2VPcHRpb25zIiwiZm9ybWF0IiwiY25wakZtdCIsImdlbmVyYXRlIiwiY25wakdlbiIsImlzVmFsaWQiLCJjbnBqVmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0VBQUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBLE1BQU07RUFB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
