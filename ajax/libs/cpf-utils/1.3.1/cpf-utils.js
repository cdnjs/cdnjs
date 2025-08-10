/**
 * cpf-utils v1.3.1
 *
 * @author Julio L. Muller.
 * @license MIT - 2020-2025
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.cpfUtils = factory());
})(this, (function () { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var cjs$1 = {};

	var hasRequiredCjs$1;
	function requireCjs$1() {
	  if (hasRequiredCjs$1) return cjs$1;
	  hasRequiredCjs$1 = 1;
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

	  // escape
	  const es = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g;
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
	  cjs$1.escape = escape;

	  // unescape
	  const unes = {
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
	  const cape = m => unes[m];

	  /**
	   * Safely unescape previously escaped entities such as `&`, `<`, `>`, `"`,
	   * and `'`.
	   * @param {string} un a previously escaped string
	   * @returns {string} the unescaped input, and it **throws** an error if
	   *  the input type is unexpected, except for boolean and numbers,
	   *  converted as string.
	   */
	  const unescape = un => replace.call(un, es, cape);
	  cjs$1.unescape = unescape;
	  return cjs$1;
	}

	var build$3;
	var hasRequiredBuild$3;

	function requireBuild$3 () {
		if (hasRequiredBuild$3) return build$3;
		hasRequiredBuild$3 = 1;

		function numOnly(target) {
		  return String(target).replace(/\D/g, "");
		}

		build$3 = numOnly;
		
		return build$3;
	}

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

	var build$2;
	var hasRequiredBuild$2;

	function requireBuild$2 () {
		if (hasRequiredBuild$2) return build$2;
		hasRequiredBuild$2 = 1;

		var htmlEscaper = requireCjs$1();
		var numOnly = requireBuild$3();
		var mergeDeep = requireCjs();

		const defaultOptions = {
		  delimiters: {
		    dot: ".",
		    dash: "-"
		  },
		  hiddenRange: {
		    start: 3,
		    end: 10
		  },
		  onFail: (value) => value,
		  hiddenKey: "*",
		  hidden: false,
		  escape: false
		};
		function mergeOptions(customOptions = {}) {
		  const options = mergeDeep(
		    defaultOptions,
		    customOptions
		  );
		  if (options.hidden) {
		    if (isNaN(options.hiddenRange.start) || options.hiddenRange.start < 0 || options.hiddenRange.start > 10) {
		      throw new TypeError('Option "hiddenRange.start" must be a number between 0 and 10.');
		    }
		    if (isNaN(options.hiddenRange.end) || options.hiddenRange.end < 0 || options.hiddenRange.end > 10) {
		      throw new TypeError('Option "hiddenRange.end" must be a number between 0 and 10.');
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

		function cpfFmt(cpfString, options) {
		  const CPF_LENGTH = 11;
		  const cpfArray = numOnly(cpfString).split("");
		  const customOptions = mergeOptions(options);
		  if (cpfArray.length !== CPF_LENGTH) {
		    const error = new Error(`Parameter "${cpfString}" does not contain ${CPF_LENGTH} digits.`);
		    return customOptions.onFail(cpfString, error);
		  }
		  if (customOptions.hidden) {
		    for (let i = customOptions.hiddenRange.start; i <= customOptions.hiddenRange.end; i++) {
		      cpfArray[i] = customOptions.hiddenKey;
		    }
		  }
		  cpfArray.splice(9, 0, customOptions.delimiters.dash);
		  cpfArray.splice(6, 0, customOptions.delimiters.dot);
		  cpfArray.splice(3, 0, customOptions.delimiters.dot);
		  const cpfPretty = cpfArray.join("");
		  if (customOptions.escape) {
		    return htmlEscaper.escape(cpfPretty);
		  }
		  return cpfPretty;
		}

		build$2 = cpfFmt;
		
		return build$2;
	}

	var buildExports$2 = requireBuild$2();
	var cpfFmt = /*@__PURE__*/getDefaultExportFromCjs(buildExports$2);

	var build$1;
	var hasRequiredBuild$1;

	function requireBuild$1 () {
		if (hasRequiredBuild$1) return build$1;
		hasRequiredBuild$1 = 1;

		var cpfFmt = requireBuild$2();
		var numOnly = requireBuild$3();
		var mergeDeep = requireCjs();

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

		function cpfGen(options) {
		  const userOptions = mergeOptions(options);
		  const baseSequence = numOnly(userOptions.prefix);
		  const prefixLength = baseSequence.length;
		  if (prefixLength < 0 || prefixLength > 9) {
		    throw new Error('Option "prefix" must be a string containing between 1 and 9 digits.');
		  }
		  const cpfSequence = baseSequence.split("").map(Number).concat(numberGenerator(9 - prefixLength));
		  [9, 10].forEach((nextNumIndex) => {
		    let factor = nextNumIndex + 1;
		    let sum = 0;
		    for (let n = 0; n < nextNumIndex; n++, factor--) {
		      sum += cpfSequence[n] * factor;
		    }
		    const remainder = 11 - sum % 11;
		    cpfSequence.push(remainder > 9 ? 0 : remainder);
		  });
		  return userOptions.format ? cpfFmt(cpfSequence.join("")) : cpfSequence.join("");
		}

		build$1 = cpfGen;
		
		return build$1;
	}

	var buildExports$1 = requireBuild$1();
	var cpfGen = /*@__PURE__*/getDefaultExportFromCjs(buildExports$1);

	var build;
	var hasRequiredBuild;

	function requireBuild () {
		if (hasRequiredBuild) return build;
		hasRequiredBuild = 1;

		var cpfGen = requireBuild$1();
		var numOnly = requireBuild$3();

		function cpfVal(cpfString) {
		  const CPF_LENGTH = 11;
		  const cpfDigits = numOnly(cpfString);
		  if (cpfDigits.length !== CPF_LENGTH) {
		    return false;
		  }
		  return cpfDigits === cpfGen({
		    prefix: cpfDigits.substring(0, 9)
		  });
		}

		build = cpfVal;
		
		return build;
	}

	var buildExports = requireBuild();
	var cpfVal = /*@__PURE__*/getDefaultExportFromCjs(buildExports);

	var format = cpfFmt;
	var generate = cpfGen;
	var isValid = cpfVal;
	var module = {
	  format: format,
	  generate: generate,
	  isValid: isValid
	};

	return module;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BmLXV0aWxzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvaHRtbC1lc2NhcGVyL2Nqcy9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9udW0tb25seS9idWlsZC9pbmRleC5janMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZGVlcG1lcmdlL2Rpc3QvY2pzLmpzIiwiLi4vLi4vY3BmLWZtdC9idWlsZC9pbmRleC5janMiLCIuLi8uLi9jcGYtZ2VuL2J1aWxkL2luZGV4LmNqcyIsIi4uLy4uL2NwZi12YWwvYnVpbGQvaW5kZXguY2pzIiwiLi4vc3JjL21vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG4vKipcbiAqIENvcHlyaWdodCAoQykgMjAxNy1wcmVzZW50IGJ5IEFuZHJlYSBHaWFtbWFyY2hpIC0gQFdlYlJlZmxlY3Rpb25cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbmNvbnN0IHtyZXBsYWNlfSA9ICcnO1xuXG4vLyBlc2NhcGVcbmNvbnN0IGVzID0gLyYoPzphbXB8IzM4fGx0fCM2MHxndHwjNjJ8YXBvc3wjMzl8cXVvdHwjMzQpOy9nO1xuY29uc3QgY2EgPSAvWyY8PidcIl0vZztcblxuY29uc3QgZXNjYSA9IHtcbiAgJyYnOiAnJmFtcDsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0OycsXG4gIFwiJ1wiOiAnJiMzOTsnLFxuICAnXCInOiAnJnF1b3Q7J1xufTtcbmNvbnN0IHBlID0gbSA9PiBlc2NhW21dO1xuXG4vKipcbiAqIFNhZmVseSBlc2NhcGUgSFRNTCBlbnRpdGllcyBzdWNoIGFzIGAmYCwgYDxgLCBgPmAsIGBcImAsIGFuZCBgJ2AuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXMgdGhlIGlucHV0IHRvIHNhZmVseSBlc2NhcGVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBlc2NhcGVkIGlucHV0LCBhbmQgaXQgKip0aHJvd3MqKiBhbiBlcnJvciBpZlxuICogIHRoZSBpbnB1dCB0eXBlIGlzIHVuZXhwZWN0ZWQsIGV4Y2VwdCBmb3IgYm9vbGVhbiBhbmQgbnVtYmVycyxcbiAqICBjb252ZXJ0ZWQgYXMgc3RyaW5nLlxuICovXG5jb25zdCBlc2NhcGUgPSBlcyA9PiByZXBsYWNlLmNhbGwoZXMsIGNhLCBwZSk7XG5leHBvcnRzLmVzY2FwZSA9IGVzY2FwZTtcblxuXG4vLyB1bmVzY2FwZVxuY29uc3QgdW5lcyA9IHtcbiAgJyZhbXA7JzogJyYnLFxuICAnJiMzODsnOiAnJicsXG4gICcmbHQ7JzogJzwnLFxuICAnJiM2MDsnOiAnPCcsXG4gICcmZ3Q7JzogJz4nLFxuICAnJiM2MjsnOiAnPicsXG4gICcmYXBvczsnOiBcIidcIixcbiAgJyYjMzk7JzogXCInXCIsXG4gICcmcXVvdDsnOiAnXCInLFxuICAnJiMzNDsnOiAnXCInXG59O1xuY29uc3QgY2FwZSA9IG0gPT4gdW5lc1ttXTtcblxuLyoqXG4gKiBTYWZlbHkgdW5lc2NhcGUgcHJldmlvdXNseSBlc2NhcGVkIGVudGl0aWVzIHN1Y2ggYXMgYCZgLCBgPGAsIGA+YCwgYFwiYCxcbiAqIGFuZCBgJ2AuXG4gKiBAcGFyYW0ge3N0cmluZ30gdW4gYSBwcmV2aW91c2x5IGVzY2FwZWQgc3RyaW5nXG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgdW5lc2NhcGVkIGlucHV0LCBhbmQgaXQgKip0aHJvd3MqKiBhbiBlcnJvciBpZlxuICogIHRoZSBpbnB1dCB0eXBlIGlzIHVuZXhwZWN0ZWQsIGV4Y2VwdCBmb3IgYm9vbGVhbiBhbmQgbnVtYmVycyxcbiAqICBjb252ZXJ0ZWQgYXMgc3RyaW5nLlxuICovXG5jb25zdCB1bmVzY2FwZSA9IHVuID0+IHJlcGxhY2UuY2FsbCh1biwgZXMsIGNhcGUpO1xuZXhwb3J0cy51bmVzY2FwZSA9IHVuZXNjYXBlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBudW1Pbmx5KHRhcmdldCkge1xuICByZXR1cm4gU3RyaW5nKHRhcmdldCkucmVwbGFjZSgvXFxEL2csIFwiXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG51bU9ubHk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1WTJweklpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZiblZ0TFc5dWJIa3VkSE1pWFN3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaVpuVnVZM1JwYjI0Z2JuVnRUMjVzZVNoMFlYSm5aWFE2SUhWdWEyNXZkMjRwT2lCemRISnBibWNnZTF4dUlDQnlaWFIxY200Z1UzUnlhVzVuS0hSaGNtZGxkQ2t1Y21Wd2JHRmpaU2d2WEZ4RUwyY3NJQ2NuS1R0Y2JuMWNibHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdiblZ0VDI1c2VUdGNiaUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVVGQkxGTkJRVk1zVVVGQlVTeE5RVUY1UWl4RlFVRkJPMEZCUTNoRExFVkJRVUVzVDBGQlR5eE5RVUZQTEVOQlFVRXNUVUZCVFN4RFFVRkZMRU5CUVVFc1QwRkJRU3hEUVVGUkxFOUJRVThzUlVGQlJTeERRVUZCTzBGQlEzcERPenM3T3lKOVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNNZXJnZWFibGVPYmplY3QgPSBmdW5jdGlvbiBpc01lcmdlYWJsZU9iamVjdCh2YWx1ZSkge1xuXHRyZXR1cm4gaXNOb25OdWxsT2JqZWN0KHZhbHVlKVxuXHRcdCYmICFpc1NwZWNpYWwodmFsdWUpXG59O1xuXG5mdW5jdGlvbiBpc05vbk51bGxPYmplY3QodmFsdWUpIHtcblx0cmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0J1xufVxuXG5mdW5jdGlvbiBpc1NwZWNpYWwodmFsdWUpIHtcblx0dmFyIHN0cmluZ1ZhbHVlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcblxuXHRyZXR1cm4gc3RyaW5nVmFsdWUgPT09ICdbb2JqZWN0IFJlZ0V4cF0nXG5cdFx0fHwgc3RyaW5nVmFsdWUgPT09ICdbb2JqZWN0IERhdGVdJ1xuXHRcdHx8IGlzUmVhY3RFbGVtZW50KHZhbHVlKVxufVxuXG4vLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2Jsb2IvYjVhYzk2M2ZiNzkxZDEyOThlN2YzOTYyMzYzODNiYzk1NWY5MTZjMS9zcmMvaXNvbW9ycGhpYy9jbGFzc2ljL2VsZW1lbnQvUmVhY3RFbGVtZW50LmpzI0wyMS1MMjVcbnZhciBjYW5Vc2VTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5mb3I7XG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gY2FuVXNlU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIDogMHhlYWM3O1xuXG5mdW5jdGlvbiBpc1JlYWN0RWxlbWVudCh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRVxufVxuXG5mdW5jdGlvbiBlbXB0eVRhcmdldCh2YWwpIHtcblx0cmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKSA/IFtdIDoge31cbn1cblxuZnVuY3Rpb24gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQodmFsdWUsIG9wdGlvbnMpIHtcblx0cmV0dXJuIChvcHRpb25zLmNsb25lICE9PSBmYWxzZSAmJiBvcHRpb25zLmlzTWVyZ2VhYmxlT2JqZWN0KHZhbHVlKSlcblx0XHQ/IGRlZXBtZXJnZShlbXB0eVRhcmdldCh2YWx1ZSksIHZhbHVlLCBvcHRpb25zKVxuXHRcdDogdmFsdWVcbn1cblxuZnVuY3Rpb24gZGVmYXVsdEFycmF5TWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpIHtcblx0cmV0dXJuIHRhcmdldC5jb25jYXQoc291cmNlKS5tYXAoZnVuY3Rpb24oZWxlbWVudCkge1xuXHRcdHJldHVybiBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZChlbGVtZW50LCBvcHRpb25zKVxuXHR9KVxufVxuXG5mdW5jdGlvbiBnZXRNZXJnZUZ1bmN0aW9uKGtleSwgb3B0aW9ucykge1xuXHRpZiAoIW9wdGlvbnMuY3VzdG9tTWVyZ2UpIHtcblx0XHRyZXR1cm4gZGVlcG1lcmdlXG5cdH1cblx0dmFyIGN1c3RvbU1lcmdlID0gb3B0aW9ucy5jdXN0b21NZXJnZShrZXkpO1xuXHRyZXR1cm4gdHlwZW9mIGN1c3RvbU1lcmdlID09PSAnZnVuY3Rpb24nID8gY3VzdG9tTWVyZ2UgOiBkZWVwbWVyZ2Vcbn1cblxuZnVuY3Rpb24gZ2V0RW51bWVyYWJsZU93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpIHtcblx0cmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHNcblx0XHQ/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KS5maWx0ZXIoZnVuY3Rpb24oc3ltYm9sKSB7XG5cdFx0XHRyZXR1cm4gT2JqZWN0LnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodGFyZ2V0LCBzeW1ib2wpXG5cdFx0fSlcblx0XHQ6IFtdXG59XG5cbmZ1bmN0aW9uIGdldEtleXModGFyZ2V0KSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyh0YXJnZXQpLmNvbmNhdChnZXRFbnVtZXJhYmxlT3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpXG59XG5cbmZ1bmN0aW9uIHByb3BlcnR5SXNPbk9iamVjdChvYmplY3QsIHByb3BlcnR5KSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHByb3BlcnR5IGluIG9iamVjdFxuXHR9IGNhdGNoKF8pIHtcblx0XHRyZXR1cm4gZmFsc2Vcblx0fVxufVxuXG4vLyBQcm90ZWN0cyBmcm9tIHByb3RvdHlwZSBwb2lzb25pbmcgYW5kIHVuZXhwZWN0ZWQgbWVyZ2luZyB1cCB0aGUgcHJvdG90eXBlIGNoYWluLlxuZnVuY3Rpb24gcHJvcGVydHlJc1Vuc2FmZSh0YXJnZXQsIGtleSkge1xuXHRyZXR1cm4gcHJvcGVydHlJc09uT2JqZWN0KHRhcmdldCwga2V5KSAvLyBQcm9wZXJ0aWVzIGFyZSBzYWZlIHRvIG1lcmdlIGlmIHRoZXkgZG9uJ3QgZXhpc3QgaW4gdGhlIHRhcmdldCB5ZXQsXG5cdFx0JiYgIShPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbCh0YXJnZXQsIGtleSkgLy8gdW5zYWZlIGlmIHRoZXkgZXhpc3QgdXAgdGhlIHByb3RvdHlwZSBjaGFpbixcblx0XHRcdCYmIE9iamVjdC5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHRhcmdldCwga2V5KSkgLy8gYW5kIGFsc28gdW5zYWZlIGlmIHRoZXkncmUgbm9uZW51bWVyYWJsZS5cbn1cblxuZnVuY3Rpb24gbWVyZ2VPYmplY3QodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpIHtcblx0dmFyIGRlc3RpbmF0aW9uID0ge307XG5cdGlmIChvcHRpb25zLmlzTWVyZ2VhYmxlT2JqZWN0KHRhcmdldCkpIHtcblx0XHRnZXRLZXlzKHRhcmdldCkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcblx0XHRcdGRlc3RpbmF0aW9uW2tleV0gPSBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZCh0YXJnZXRba2V5XSwgb3B0aW9ucyk7XG5cdFx0fSk7XG5cdH1cblx0Z2V0S2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG5cdFx0aWYgKHByb3BlcnR5SXNVbnNhZmUodGFyZ2V0LCBrZXkpKSB7XG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cblx0XHRpZiAocHJvcGVydHlJc09uT2JqZWN0KHRhcmdldCwga2V5KSAmJiBvcHRpb25zLmlzTWVyZ2VhYmxlT2JqZWN0KHNvdXJjZVtrZXldKSkge1xuXHRcdFx0ZGVzdGluYXRpb25ba2V5XSA9IGdldE1lcmdlRnVuY3Rpb24oa2V5LCBvcHRpb25zKSh0YXJnZXRba2V5XSwgc291cmNlW2tleV0sIG9wdGlvbnMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZXN0aW5hdGlvbltrZXldID0gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQoc291cmNlW2tleV0sIG9wdGlvbnMpO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBkZXN0aW5hdGlvblxufVxuXG5mdW5jdGlvbiBkZWVwbWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdG9wdGlvbnMuYXJyYXlNZXJnZSA9IG9wdGlvbnMuYXJyYXlNZXJnZSB8fCBkZWZhdWx0QXJyYXlNZXJnZTtcblx0b3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdCA9IG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3QgfHwgaXNNZXJnZWFibGVPYmplY3Q7XG5cdC8vIGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkIGlzIGFkZGVkIHRvIGBvcHRpb25zYCBzbyB0aGF0IGN1c3RvbSBhcnJheU1lcmdlKClcblx0Ly8gaW1wbGVtZW50YXRpb25zIGNhbiB1c2UgaXQuIFRoZSBjYWxsZXIgbWF5IG5vdCByZXBsYWNlIGl0LlxuXHRvcHRpb25zLmNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkID0gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQ7XG5cblx0dmFyIHNvdXJjZUlzQXJyYXkgPSBBcnJheS5pc0FycmF5KHNvdXJjZSk7XG5cdHZhciB0YXJnZXRJc0FycmF5ID0gQXJyYXkuaXNBcnJheSh0YXJnZXQpO1xuXHR2YXIgc291cmNlQW5kVGFyZ2V0VHlwZXNNYXRjaCA9IHNvdXJjZUlzQXJyYXkgPT09IHRhcmdldElzQXJyYXk7XG5cblx0aWYgKCFzb3VyY2VBbmRUYXJnZXRUeXBlc01hdGNoKSB7XG5cdFx0cmV0dXJuIGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKHNvdXJjZSwgb3B0aW9ucylcblx0fSBlbHNlIGlmIChzb3VyY2VJc0FycmF5KSB7XG5cdFx0cmV0dXJuIG9wdGlvbnMuYXJyYXlNZXJnZSh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucylcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gbWVyZ2VPYmplY3QodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpXG5cdH1cbn1cblxuZGVlcG1lcmdlLmFsbCA9IGZ1bmN0aW9uIGRlZXBtZXJnZUFsbChhcnJheSwgb3B0aW9ucykge1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXkpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdmaXJzdCBhcmd1bWVudCBzaG91bGQgYmUgYW4gYXJyYXknKVxuXHR9XG5cblx0cmV0dXJuIGFycmF5LnJlZHVjZShmdW5jdGlvbihwcmV2LCBuZXh0KSB7XG5cdFx0cmV0dXJuIGRlZXBtZXJnZShwcmV2LCBuZXh0LCBvcHRpb25zKVxuXHR9LCB7fSlcbn07XG5cbnZhciBkZWVwbWVyZ2VfMSA9IGRlZXBtZXJnZTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWVwbWVyZ2VfMTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGh0bWxFc2NhcGVyID0gcmVxdWlyZSgnaHRtbC1lc2NhcGVyJyk7XG52YXIgbnVtT25seSA9IHJlcXVpcmUoJ251bS1vbmx5Jyk7XG52YXIgbWVyZ2VEZWVwID0gcmVxdWlyZSgnZGVlcG1lcmdlJyk7XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICBkZWxpbWl0ZXJzOiB7XG4gICAgZG90OiBcIi5cIixcbiAgICBkYXNoOiBcIi1cIlxuICB9LFxuICBoaWRkZW5SYW5nZToge1xuICAgIHN0YXJ0OiAzLFxuICAgIGVuZDogMTBcbiAgfSxcbiAgb25GYWlsOiAodmFsdWUpID0+IHZhbHVlLFxuICBoaWRkZW5LZXk6IFwiKlwiLFxuICBoaWRkZW46IGZhbHNlLFxuICBlc2NhcGU6IGZhbHNlXG59O1xuZnVuY3Rpb24gbWVyZ2VPcHRpb25zKGN1c3RvbU9wdGlvbnMgPSB7fSkge1xuICBjb25zdCBvcHRpb25zID0gbWVyZ2VEZWVwKFxuICAgIGRlZmF1bHRPcHRpb25zLFxuICAgIGN1c3RvbU9wdGlvbnNcbiAgKTtcbiAgaWYgKG9wdGlvbnMuaGlkZGVuKSB7XG4gICAgaWYgKGlzTmFOKG9wdGlvbnMuaGlkZGVuUmFuZ2Uuc3RhcnQpIHx8IG9wdGlvbnMuaGlkZGVuUmFuZ2Uuc3RhcnQgPCAwIHx8IG9wdGlvbnMuaGlkZGVuUmFuZ2Uuc3RhcnQgPiAxMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT3B0aW9uIFwiaGlkZGVuUmFuZ2Uuc3RhcnRcIiBtdXN0IGJlIGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgMTAuJyk7XG4gICAgfVxuICAgIGlmIChpc05hTihvcHRpb25zLmhpZGRlblJhbmdlLmVuZCkgfHwgb3B0aW9ucy5oaWRkZW5SYW5nZS5lbmQgPCAwIHx8IG9wdGlvbnMuaGlkZGVuUmFuZ2UuZW5kID4gMTApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09wdGlvbiBcImhpZGRlblJhbmdlLmVuZFwiIG11c3QgYmUgYSBudW1iZXIgYmV0d2VlbiAwIGFuZCAxMC4nKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuaGlkZGVuUmFuZ2Uuc3RhcnQgPiBvcHRpb25zLmhpZGRlblJhbmdlLmVuZCkge1xuICAgICAgY29uc3QgYXV4ID0gb3B0aW9ucy5oaWRkZW5SYW5nZS5zdGFydDtcbiAgICAgIG9wdGlvbnMuaGlkZGVuUmFuZ2Uuc3RhcnQgPSBvcHRpb25zLmhpZGRlblJhbmdlLmVuZDtcbiAgICAgIG9wdGlvbnMuaGlkZGVuUmFuZ2UuZW5kID0gYXV4O1xuICAgIH1cbiAgfVxuICBpZiAodHlwZW9mIG9wdGlvbnMub25GYWlsICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgb3B0aW9uIFwib25GYWlsXCIgbXVzdCBiZSBhIGNhbGxiYWNrIGZ1bmN0aW9uLicpO1xuICB9XG4gIHJldHVybiBvcHRpb25zO1xufVxuXG5mdW5jdGlvbiBjcGZGbXQoY3BmU3RyaW5nLCBvcHRpb25zKSB7XG4gIGNvbnN0IENQRl9MRU5HVEggPSAxMTtcbiAgY29uc3QgY3BmQXJyYXkgPSBudW1Pbmx5KGNwZlN0cmluZykuc3BsaXQoXCJcIik7XG4gIGNvbnN0IGN1c3RvbU9wdGlvbnMgPSBtZXJnZU9wdGlvbnMob3B0aW9ucyk7XG4gIGlmIChjcGZBcnJheS5sZW5ndGggIT09IENQRl9MRU5HVEgpIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgUGFyYW1ldGVyIFwiJHtjcGZTdHJpbmd9XCIgZG9lcyBub3QgY29udGFpbiAke0NQRl9MRU5HVEh9IGRpZ2l0cy5gKTtcbiAgICByZXR1cm4gY3VzdG9tT3B0aW9ucy5vbkZhaWwoY3BmU3RyaW5nLCBlcnJvcik7XG4gIH1cbiAgaWYgKGN1c3RvbU9wdGlvbnMuaGlkZGVuKSB7XG4gICAgZm9yIChsZXQgaSA9IGN1c3RvbU9wdGlvbnMuaGlkZGVuUmFuZ2Uuc3RhcnQ7IGkgPD0gY3VzdG9tT3B0aW9ucy5oaWRkZW5SYW5nZS5lbmQ7IGkrKykge1xuICAgICAgY3BmQXJyYXlbaV0gPSBjdXN0b21PcHRpb25zLmhpZGRlbktleTtcbiAgICB9XG4gIH1cbiAgY3BmQXJyYXkuc3BsaWNlKDksIDAsIGN1c3RvbU9wdGlvbnMuZGVsaW1pdGVycy5kYXNoKTtcbiAgY3BmQXJyYXkuc3BsaWNlKDYsIDAsIGN1c3RvbU9wdGlvbnMuZGVsaW1pdGVycy5kb3QpO1xuICBjcGZBcnJheS5zcGxpY2UoMywgMCwgY3VzdG9tT3B0aW9ucy5kZWxpbWl0ZXJzLmRvdCk7XG4gIGNvbnN0IGNwZlByZXR0eSA9IGNwZkFycmF5LmpvaW4oXCJcIik7XG4gIGlmIChjdXN0b21PcHRpb25zLmVzY2FwZSkge1xuICAgIHJldHVybiBodG1sRXNjYXBlci5lc2NhcGUoY3BmUHJldHR5KTtcbiAgfVxuICByZXR1cm4gY3BmUHJldHR5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNwZkZtdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYVc1a1pYZ3VZMnB6SWl3aWMyOTFjbU5sY3lJNld5SXVMaTl6Y21NdmJXVnlaMlV0YjNCMGFXOXVjeTUwY3lJc0lpNHVMM055WXk5amNHWXRabTEwTG5SeklsMHNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbWx0Y0c5eWRDQnRaWEpuWlVSbFpYQWdabkp2YlNBblpHVmxjRzFsY21kbEp6dGNibHh1ZEhsd1pTQkVaV1Z3VUdGeWRHbGhiRHhVUGlBOUlIdGNiaUFnVzFBZ2FXNGdhMlY1YjJZZ1ZGMC9PaUJFWldWd1VHRnlkR2xoYkR4VVcxQmRQanRjYm4wN1hHNWNibVY0Y0c5eWRDQnBiblJsY21aaFkyVWdRV04wZFdGc1EzQm1SbTl5YldGMGRHbHVaMDl3ZEdsdmJuTThUMjVGY25KR1lXeHNZbUZqYXo0Z2UxeHVJQ0JrWld4cGJXbDBaWEp6T2lCN1hHNGdJQ0FnWkdGemFEb2djM1J5YVc1bk8xeHVJQ0FnSUdSdmREb2djM1J5YVc1bk8xeHVJQ0I5TzF4dUlDQmxjMk5oY0dVNklHSnZiMnhsWVc0N1hHNGdJR2hwWkdSbGJqb2dZbTl2YkdWaGJqdGNiaUFnYUdsa1pHVnVTMlY1T2lCemRISnBibWM3WEc0Z0lHaHBaR1JsYmxKaGJtZGxPaUI3WEc0Z0lDQWdaVzVrT2lCdWRXMWlaWEk3WEc0Z0lDQWdjM1JoY25RNklHNTFiV0psY2p0Y2JpQWdmVHRjYmlBZ2IyNUdZV2xzT2lBb2RtRnNkV1U2SUhOMGNtbHVaeXdnWlhKeWIzSTZJRVZ5Y205eUtTQTlQaUJQYmtWeWNrWmhiR3hpWVdOck8xeHVmVnh1WEc1bGVIQnZjblFnZEhsd1pTQkRjR1pHYjNKdFlYUjBhVzVuVDNCMGFXOXVjenhQYmtWeWNrWmhiR3hpWVdOclBpQTlJRVJsWlhCUVlYSjBhV0ZzUEZ4dUlDQkJZM1IxWVd4RGNHWkdiM0p0WVhSMGFXNW5UM0IwYVc5dWN6eFBia1Z5Y2taaGJHeGlZV05yUGx4dVBqdGNibHh1WTI5dWMzUWdaR1ZtWVhWc2RFOXdkR2x2Ym5NNklFRmpkSFZoYkVOd1prWnZjbTFoZEhScGJtZFBjSFJwYjI1elBITjBjbWx1Wno0Z1BTQjdYRzRnSUdSbGJHbHRhWFJsY25NNklIdGNiaUFnSUNCa2IzUTZJQ2N1Snl4Y2JpQWdJQ0JrWVhOb09pQW5MU2NzWEc0Z0lIMHNYRzRnSUdocFpHUmxibEpoYm1kbE9pQjdYRzRnSUNBZ2MzUmhjblE2SURNc1hHNGdJQ0FnWlc1a09pQXhNQ3hjYmlBZ2ZTeGNiaUFnYjI1R1lXbHNPaUFvZG1Gc2RXVXBJRDArSUhaaGJIVmxMRnh1SUNCb2FXUmtaVzVMWlhrNklDY3FKeXhjYmlBZ2FHbGtaR1Z1T2lCbVlXeHpaU3hjYmlBZ1pYTmpZWEJsT2lCbVlXeHpaU3hjYm4wN1hHNWNiaThxS2x4dUlDb2dUV1Z5WjJVZ1kzVnpkRzl0SUc5d2RHbHZibk1nZEc4Z2RHaGxJR1JsWm1GMWJIUWdiMjVsY3k1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnYldWeVoyVlBjSFJwYjI1elBFOXVSWEp5Um1Gc2JHSmhZMnMrS0Z4dUlDQmpkWE4wYjIxUGNIUnBiMjV6T2lCRGNHWkdiM0p0WVhSMGFXNW5UM0IwYVc5dWN6eFBia1Z5Y2taaGJHeGlZV05yUGlBOUlIdDlMRnh1S1RvZ1FXTjBkV0ZzUTNCbVJtOXliV0YwZEdsdVowOXdkR2x2Ym5NOFQyNUZjbkpHWVd4c1ltRmphejRnZTF4dUlDQmpiMjV6ZENCdmNIUnBiMjV6SUQwZ2JXVnlaMlZFWldWd0tGeHVJQ0FnSUdSbFptRjFiSFJQY0hScGIyNXpMRnh1SUNBZ0lHTjFjM1J2YlU5d2RHbHZibk1zWEc0Z0lDa2dZWE1nUVdOMGRXRnNRM0JtUm05eWJXRjBkR2x1WjA5d2RHbHZibk04VDI1RmNuSkdZV3hzWW1GamF6NDdYRzVjYmlBZ2FXWWdLRzl3ZEdsdmJuTXVhR2xrWkdWdUtTQjdYRzRnSUNBZ2FXWWdLRnh1SUNBZ0lDQWdhWE5PWVU0b2IzQjBhVzl1Y3k1b2FXUmtaVzVTWVc1blpTNXpkR0Z5ZENrZ2ZIeGNiaUFnSUNBZ0lHOXdkR2x2Ym5NdWFHbGtaR1Z1VW1GdVoyVXVjM1JoY25RZ1BDQXdJSHg4WEc0Z0lDQWdJQ0J2Y0hScGIyNXpMbWhwWkdSbGJsSmhibWRsTG5OMFlYSjBJRDRnTVRCY2JpQWdJQ0FwSUh0Y2JpQWdJQ0FnSUhSb2NtOTNJRzVsZHlCVWVYQmxSWEp5YjNJb0owOXdkR2x2YmlCY0ltaHBaR1JsYmxKaGJtZGxMbk4wWVhKMFhDSWdiWFZ6ZENCaVpTQmhJRzUxYldKbGNpQmlaWFIzWldWdUlEQWdZVzVrSURFd0xpY3BPMXh1SUNBZ0lIMWNibHh1SUNBZ0lHbG1JQ2hjYmlBZ0lDQWdJR2x6VG1GT0tHOXdkR2x2Ym5NdWFHbGtaR1Z1VW1GdVoyVXVaVzVrS1NCOGZGeHVJQ0FnSUNBZ2IzQjBhVzl1Y3k1b2FXUmtaVzVTWVc1blpTNWxibVFnUENBd0lIeDhYRzRnSUNBZ0lDQnZjSFJwYjI1ekxtaHBaR1JsYmxKaGJtZGxMbVZ1WkNBK0lERXdYRzRnSUNBZ0tTQjdYRzRnSUNBZ0lDQjBhSEp2ZHlCdVpYY2dWSGx3WlVWeWNtOXlLQ2RQY0hScGIyNGdYQ0pvYVdSa1pXNVNZVzVuWlM1bGJtUmNJaUJ0ZFhOMElHSmxJR0VnYm5WdFltVnlJR0psZEhkbFpXNGdNQ0JoYm1RZ01UQXVKeWs3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdhV1lnS0c5d2RHbHZibk11YUdsa1pHVnVVbUZ1WjJVdWMzUmhjblFnUGlCdmNIUnBiMjV6TG1ocFpHUmxibEpoYm1kbExtVnVaQ2tnZTF4dUlDQWdJQ0FnWTI5dWMzUWdZWFY0SUQwZ2IzQjBhVzl1Y3k1b2FXUmtaVzVTWVc1blpTNXpkR0Z5ZER0Y2JpQWdJQ0FnSUc5d2RHbHZibk11YUdsa1pHVnVVbUZ1WjJVdWMzUmhjblFnUFNCdmNIUnBiMjV6TG1ocFpHUmxibEpoYm1kbExtVnVaRHRjYmlBZ0lDQWdJRzl3ZEdsdmJuTXVhR2xrWkdWdVVtRnVaMlV1Wlc1a0lEMGdZWFY0TzF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdsbUlDaDBlWEJsYjJZZ2IzQjBhVzl1Y3k1dmJrWmhhV3dnSVQwOUlDZG1kVzVqZEdsdmJpY3BJSHRjYmlBZ0lDQjBhSEp2ZHlCdVpYY2dWSGx3WlVWeWNtOXlLQ2RVYUdVZ2IzQjBhVzl1SUZ3aWIyNUdZV2xzWENJZ2JYVnpkQ0JpWlNCaElHTmhiR3hpWVdOcklHWjFibU4wYVc5dUxpY3BPMXh1SUNCOVhHNWNiaUFnY21WMGRYSnVJRzl3ZEdsdmJuTTdYRzU5WEc1Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUcxbGNtZGxUM0IwYVc5dWN6dGNiaUlzSW1sdGNHOXlkQ0I3SUdWelkyRndaU0JoY3lCbGMyTmhjR1ZJVkUxTUlIMGdabkp2YlNBbmFIUnRiQzFsYzJOaGNHVnlKenRjYm1sdGNHOXlkQ0J1ZFcxUGJteDVJR1p5YjIwZ0oyNTFiUzF2Ym14NUp6dGNibHh1YVcxd2IzSjBJRzFsY21kbFQzQjBhVzl1Y3lCbWNtOXRJQ2N1TDIxbGNtZGxMVzl3ZEdsdmJuTW5PMXh1YVcxd2IzSjBJSFI1Y0dVZ2V5QkRjR1pHYjNKdFlYUjBhVzVuVDNCMGFXOXVjeUI5SUdaeWIyMGdKeTR2YldWeVoyVXRiM0IwYVc5dWN5YzdYRzVjYmk4cUtseHVJQ29nVm1Gc2FXUmhkR1VnWVNCbmFYWmxiaUJEVUVZZ1kyaGhjaUJ6WlhGMVpXNWpaUzVjYmlBcUwxeHVablZ1WTNScGIyNGdZM0JtUm0xMFBFOXVSWEp5Um1Gc2JHSmhZMnNnUFNCemRISnBibWMrS0Z4dUlDQmpjR1pUZEhKcGJtYzZJSE4wY21sdVp5eGNiaUFnYjNCMGFXOXVjejg2SUVOd1prWnZjbTFoZEhScGJtZFBjSFJwYjI1elBFOXVSWEp5Um1Gc2JHSmhZMnMrTEZ4dUtUb2djM1J5YVc1bklIdGNiaUFnWTI5dWMzUWdRMUJHWDB4RlRrZFVTQ0E5SURFeE8xeHVJQ0JqYjI1emRDQmpjR1pCY25KaGVTQTlJRzUxYlU5dWJIa29ZM0JtVTNSeWFXNW5LUzV6Y0d4cGRDZ25KeWs3WEc0Z0lHTnZibk4wSUdOMWMzUnZiVTl3ZEdsdmJuTWdQU0J0WlhKblpVOXdkR2x2Ym5Nb2IzQjBhVzl1Y3lrN1hHNWNiaUFnYVdZZ0tHTndaa0Z5Y21GNUxteGxibWQwYUNBaFBUMGdRMUJHWDB4RlRrZFVTQ2tnZTF4dUlDQWdJR052Ym5OMElHVnljbTl5SUQwZ2JtVjNJRVZ5Y205eUtHQlFZWEpoYldWMFpYSWdYQ0lrZTJOd1psTjBjbWx1WjMxY0lpQmtiMlZ6SUc1dmRDQmpiMjUwWVdsdUlDUjdRMUJHWDB4RlRrZFVTSDBnWkdsbmFYUnpMbUFwTzF4dVhHNGdJQ0FnY21WMGRYSnVJR04xYzNSdmJVOXdkR2x2Ym5NdWIyNUdZV2xzS0dOd1psTjBjbWx1Wnl3Z1pYSnliM0lwSUdGeklITjBjbWx1Wnp0Y2JpQWdmVnh1WEc0Z0lHbG1JQ2hqZFhOMGIyMVBjSFJwYjI1ekxtaHBaR1JsYmlrZ2UxeHVJQ0FnSUdadmNpQW9iR1YwSUdrZ1BTQmpkWE4wYjIxUGNIUnBiMjV6TG1ocFpHUmxibEpoYm1kbExuTjBZWEowT3lCcElEdzlJR04xYzNSdmJVOXdkR2x2Ym5NdWFHbGtaR1Z1VW1GdVoyVXVaVzVrT3lCcEt5c3BJSHRjYmlBZ0lDQWdJR053WmtGeWNtRjVXMmxkSUQwZ1kzVnpkRzl0VDNCMGFXOXVjeTVvYVdSa1pXNUxaWGs3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnWTNCbVFYSnlZWGt1YzNCc2FXTmxLRGtzSURBc0lHTjFjM1J2YlU5d2RHbHZibk11WkdWc2FXMXBkR1Z5Y3k1a1lYTm9LVHRjYmlBZ1kzQm1RWEp5WVhrdWMzQnNhV05sS0RZc0lEQXNJR04xYzNSdmJVOXdkR2x2Ym5NdVpHVnNhVzFwZEdWeWN5NWtiM1FwTzF4dUlDQmpjR1pCY25KaGVTNXpjR3hwWTJVb015d2dNQ3dnWTNWemRHOXRUM0IwYVc5dWN5NWtaV3hwYldsMFpYSnpMbVJ2ZENrN1hHNGdJR052Ym5OMElHTndabEJ5WlhSMGVTQTlJR053WmtGeWNtRjVMbXB2YVc0b0p5Y3BPMXh1WEc0Z0lHbG1JQ2hqZFhOMGIyMVBjSFJwYjI1ekxtVnpZMkZ3WlNrZ2UxeHVJQ0FnSUhKbGRIVnliaUJsYzJOaGNHVklWRTFNS0dOd1psQnlaWFIwZVNrN1hHNGdJSDFjYmx4dUlDQnlaWFIxY200Z1kzQm1VSEpsZEhSNU8xeHVmVnh1WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0JqY0daR2JYUTdYRzRpWFN3aWJtRnRaWE1pT2xzaVpYTmpZWEJsU0ZSTlRDSmRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdPMEZCZVVKQkxFMUJRVTBzWTBGQmNVUXNSMEZCUVR0QlFVRkJMRVZCUTNwRUxGVkJRVmtzUlVGQlFUdEJRVUZCTEVsQlExWXNSMEZCU3l4RlFVRkJMRWRCUVVFN1FVRkJRU3hKUVVOTUxFbEJRVTBzUlVGQlFUdEJRVUZCTEVkQlExSTdRVUZCUVN4RlFVTkJMRmRCUVdFc1JVRkJRVHRCUVVGQkxFbEJRMWdzUzBGQlR5eEZRVUZCTEVOQlFVRTdRVUZCUVN4SlFVTlFMRWRCUVVzc1JVRkJRVHRCUVVGQkxFZEJRMUE3UVVGQlFTeEZRVU5CTEUxQlFVRXNSVUZCVVN4RFFVRkRMRXRCUVZVc1MwRkJRU3hMUVVGQk8wRkJRVUVzUlVGRGJrSXNVMEZCVnl4RlFVRkJMRWRCUVVFN1FVRkJRU3hGUVVOWUxFMUJRVkVzUlVGQlFTeExRVUZCTzBGQlFVRXNSVUZEVWl4TlFVRlJMRVZCUVVFN1FVRkRWaXhEUVVGQk8wRkJTMEVzVTBGQlV5eFpRVUZCTEVOQlExQXNZVUZCY1VRc1IwRkJRU3hGUVVOV0xFVkJRVUU3UVVGRE0wTXNSVUZCUVN4TlFVRk5MRTlCUVZVc1IwRkJRU3hUUVVGQk8wRkJRVUVzU1VGRFpDeGpRVUZCTzBGQlFVRXNTVUZEUVR0QlFVRkJMRWRCUTBZN1FVRkZRU3hGUVVGQkxFbEJRVWtzVVVGQlVTeE5RVUZSTEVWQlFVRTdRVUZEYkVJc1NVRkJRU3hKUVVORkxFdEJRVTBzUTBGQlFTeFBRVUZCTEVOQlFWRXNWMEZCV1N4RFFVRkJMRXRCUVVzc1EwRkRMMElzU1VGQlFTeFBRVUZCTEVOQlFWRXNWMEZCV1N4RFFVRkJMRXRCUVVFc1IwRkJVU3hEUVVNMVFpeEpRVUZCTEU5QlFVRXNRMEZCVVN4WFFVRlpMRU5CUVVFc1MwRkJRU3hIUVVGUkxFVkJRelZDTEVWQlFVRTdRVUZEUVN4TlFVRk5MRTFCUVVFc1NVRkJTU3hWUVVGVkxDdEVRVUVyUkN4RFFVRkJPMEZCUVVFN1FVRkhja1lzU1VGQlFTeEpRVU5GTEV0QlFVMHNRMEZCUVN4UFFVRkJMRU5CUVZFc1YwRkJXU3hEUVVGQkxFZEJRVWNzUTBGRE4wSXNTVUZCUVN4UFFVRkJMRU5CUVZFc1YwRkJXU3hEUVVGQkxFZEJRVUVzUjBGQlRTeERRVU14UWl4SlFVRkJMRTlCUVVFc1EwRkJVU3hYUVVGWkxFTkJRVUVzUjBGQlFTeEhRVUZOTEVWQlF6RkNMRVZCUVVFN1FVRkRRU3hOUVVGTkxFMUJRVUVzU1VGQlNTeFZRVUZWTERaRVFVRTJSQ3hEUVVGQk8wRkJRVUU3UVVGSGJrWXNTVUZCUVN4SlFVRkpMRTlCUVZFc1EwRkJRU3hYUVVGQkxFTkJRVmtzUzBGQlVTeEhRVUZCTEU5QlFVRXNRMEZCVVN4WlFVRlpMRWRCUVVzc1JVRkJRVHRCUVVOMlJDeE5RVUZOTEUxQlFVRXNSMEZCUVN4SFFVRk5MRkZCUVZFc1YwRkJXU3hEUVVGQkxFdEJRVUU3UVVGRGFFTXNUVUZCVVN4UFFVRkJMRU5CUVVFc1YwRkJRU3hEUVVGWkxFdEJRVkVzUjBGQlFTeFBRVUZCTEVOQlFWRXNWMEZCV1N4RFFVRkJMRWRCUVVFN1FVRkRhRVFzVFVGQlFTeFBRVUZCTEVOQlFWRXNXVUZCV1N4SFFVRk5MRWRCUVVFc1IwRkJRVHRCUVVGQk8wRkJRelZDTzBGQlIwWXNSVUZCU1N4SlFVRkJMRTlCUVU4c1QwRkJVU3hEUVVGQkxFMUJRVUVzUzBGQlZ5eFZRVUZaTEVWQlFVRTdRVUZEZUVNc1NVRkJUU3hOUVVGQkxFbEJRVWtzVlVGQlZTeHJSRUZCYTBRc1EwRkJRVHRCUVVGQk8wRkJSM2hGTEVWQlFVOHNUMEZCUVN4UFFVRkJPMEZCUTFRN08wRkRka1ZCTEZOQlFWTXNUVUZCUVN4RFFVTlFMRmRCUTBFc1QwRkRVU3hGUVVGQk8wRkJRMUlzUlVGQlFTeE5RVUZOTEZWQlFXRXNSMEZCUVN4RlFVRkJPMEZCUTI1Q0xFVkJRVUVzVFVGQlRTeFJRVUZYTEVkQlFVRXNUMEZCUVN4RFFVRlJMRk5CUVZNc1EwRkJRU3hEUVVGRkxFMUJRVTBzUlVGQlJTeERRVUZCTzBGQlF6VkRMRVZCUVUwc1RVRkJRU3hoUVVGQkxFZEJRV2RDTEdGQlFXRXNUMEZCVHl4RFFVRkJPMEZCUlRGRExFVkJRVWtzU1VGQlFTeFJRVUZCTEVOQlFWTXNWMEZCVnl4VlFVRlpMRVZCUVVFN1FVRkRiRU1zU1VGQlFTeE5RVUZOTEZGQlFWRXNTVUZCU1N4TFFVRkJMRU5CUVUwc1kwRkJZeXhUUVVGVExFTkJRVUVzYlVKQlFVRXNSVUZCYzBJc1ZVRkJWU3hEUVVGVkxGRkJRVUVzUTBGQlFTeERRVUZCTzBGQlJYcEdMRWxCUVU4c1QwRkJRU3hoUVVGQkxFTkJRV01zVFVGQlR5eERRVUZCTEZOQlFVRXNSVUZCVnl4TFFVRkxMRU5CUVVFN1FVRkJRVHRCUVVjNVF5eEZRVUZCTEVsQlFVa3NZMEZCWXl4TlFVRlJMRVZCUVVFN1FVRkRlRUlzU1VGQlV5eExRVUZCTEVsQlFVRXNRMEZCUVN4SFFVRkpMR05CUVdNc1YwRkJXU3hEUVVGQkxFdEJRVUVzUlVGQlR5eExRVUZMTEdGQlFXTXNRMEZCUVN4WFFVRkJMRU5CUVZrc1MwRkJTeXhEUVVGTExFVkJRVUVzUlVGQlFUdEJRVU55Uml4TlFVRlRMRkZCUVVFc1EwRkJRU3hEUVVGRExFbEJRVWtzWVVGQll5eERRVUZCTEZOQlFVRTdRVUZCUVR0QlFVTTVRanRCUVVkR0xFVkJRVUVzVVVGQlFTeERRVUZUTEUxQlFVOHNRMEZCUVN4RFFVRkJMRVZCUVVjc1EwRkJSeXhGUVVGQkxHRkJRVUVzUTBGQll5eFhRVUZYTEVsQlFVa3NRMEZCUVR0QlFVTnVSQ3hGUVVGQkxGRkJRVUVzUTBGQlV5eE5RVUZQTEVOQlFVRXNRMEZCUVN4RlFVRkhMRU5CUVVjc1JVRkJRU3hoUVVGQkxFTkJRV01zVjBGQlZ5eEhRVUZITEVOQlFVRTdRVUZEYkVRc1JVRkJRU3hSUVVGQkxFTkJRVk1zVFVGQlR5eERRVUZCTEVOQlFVRXNSVUZCUnl4RFFVRkhMRVZCUVVFc1lVRkJRU3hEUVVGakxGZEJRVmNzUjBGQlJ5eERRVUZCTzBGQlEyeEVMRVZCUVUwc1RVRkJRU3hUUVVGQkxFZEJRVmtzVVVGQlV5eERRVUZCTEVsQlFVRXNRMEZCU3l4RlFVRkZMRU5CUVVFN1FVRkZiRU1zUlVGQlFTeEpRVUZKTEdOQlFXTXNUVUZCVVN4RlFVRkJPMEZCUTNoQ0xFbEJRVUVzVDBGQlQwRXNiVUpCUVZjc1UwRkJVeXhEUVVGQk8wRkJRVUU3UVVGSE4wSXNSVUZCVHl4UFFVRkJMRk5CUVVFN1FVRkRWRHM3T3pzaWZRPT1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNwZkZtdCA9IHJlcXVpcmUoJ0BsYWN1c3NvZnQvY3BmLWZtdCcpO1xudmFyIG51bU9ubHkgPSByZXF1aXJlKCdudW0tb25seScpO1xudmFyIG1lcmdlRGVlcCA9IHJlcXVpcmUoJ2RlZXBtZXJnZScpO1xuXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgZm9ybWF0OiBmYWxzZSxcbiAgcHJlZml4OiBcIlwiXG59O1xuZnVuY3Rpb24gbWVyZ2VPcHRpb25zKGN1c3RvbU9wdGlvbnMgPSB7fSkge1xuICByZXR1cm4gbWVyZ2VEZWVwKGRlZmF1bHRPcHRpb25zLCBjdXN0b21PcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gbnVtYmVyR2VuZXJhdG9yKGxlbmd0aCkge1xuICBjb25zdCBudW1lcmljU2VxdWVuY2UgPSBbXTtcbiAgd2hpbGUgKG51bWVyaWNTZXF1ZW5jZS5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICBjb25zdCByYW5kb20gPSBNYXRoLnJhbmRvbSgpICogMTA7XG4gICAgY29uc3QgaW50ZWdlciA9IE1hdGguZmxvb3IocmFuZG9tKTtcbiAgICBudW1lcmljU2VxdWVuY2UucHVzaChpbnRlZ2VyKTtcbiAgfVxuICByZXR1cm4gbnVtZXJpY1NlcXVlbmNlO1xufVxuXG5mdW5jdGlvbiBjcGZHZW4ob3B0aW9ucykge1xuICBjb25zdCB1c2VyT3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhvcHRpb25zKTtcbiAgY29uc3QgYmFzZVNlcXVlbmNlID0gbnVtT25seSh1c2VyT3B0aW9ucy5wcmVmaXgpO1xuICBjb25zdCBwcmVmaXhMZW5ndGggPSBiYXNlU2VxdWVuY2UubGVuZ3RoO1xuICBpZiAocHJlZml4TGVuZ3RoIDwgMCB8fCBwcmVmaXhMZW5ndGggPiA5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdPcHRpb24gXCJwcmVmaXhcIiBtdXN0IGJlIGEgc3RyaW5nIGNvbnRhaW5pbmcgYmV0d2VlbiAxIGFuZCA5IGRpZ2l0cy4nKTtcbiAgfVxuICBjb25zdCBjcGZTZXF1ZW5jZSA9IGJhc2VTZXF1ZW5jZS5zcGxpdChcIlwiKS5tYXAoTnVtYmVyKS5jb25jYXQobnVtYmVyR2VuZXJhdG9yKDkgLSBwcmVmaXhMZW5ndGgpKTtcbiAgWzksIDEwXS5mb3JFYWNoKChuZXh0TnVtSW5kZXgpID0+IHtcbiAgICBsZXQgZmFjdG9yID0gbmV4dE51bUluZGV4ICsgMTtcbiAgICBsZXQgc3VtID0gMDtcbiAgICBmb3IgKGxldCBuID0gMDsgbiA8IG5leHROdW1JbmRleDsgbisrLCBmYWN0b3ItLSkge1xuICAgICAgc3VtICs9IGNwZlNlcXVlbmNlW25dICogZmFjdG9yO1xuICAgIH1cbiAgICBjb25zdCByZW1haW5kZXIgPSAxMSAtIHN1bSAlIDExO1xuICAgIGNwZlNlcXVlbmNlLnB1c2gocmVtYWluZGVyID4gOSA/IDAgOiByZW1haW5kZXIpO1xuICB9KTtcbiAgcmV0dXJuIHVzZXJPcHRpb25zLmZvcm1hdCA/IGNwZkZtdChjcGZTZXF1ZW5jZS5qb2luKFwiXCIpKSA6IGNwZlNlcXVlbmNlLmpvaW4oXCJcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3BmR2VuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhVzVrWlhndVkycHpJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12YldWeVoyVXRiM0IwYVc5dWN5NTBjeUlzSWk0dUwzTnlZeTl1ZFcxaVpYSXRaMlZ1WlhKaGRHOXlMblJ6SWl3aUxpNHZjM0pqTDJOd1ppMW5aVzR1ZEhNaVhTd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lhVzF3YjNKMElHMWxjbWRsUkdWbGNDQm1jbTl0SUNka1pXVndiV1Z5WjJVbk8xeHVYRzVsZUhCdmNuUWdhVzUwWlhKbVlXTmxJRUZqZEhWaGJFTndaa2RsYm1WeVlYUnZjazl3ZEdsdmJuTWdlMXh1SUNCbWIzSnRZWFE2SUdKdmIyeGxZVzQ3WEc0Z0lIQnlaV1pwZURvZ2MzUnlhVzVuTzF4dWZWeHVYRzVsZUhCdmNuUWdkSGx3WlNCRGNHWkhaVzVsY21GMGIzSlBjSFJwYjI1eklEMGdVR0Z5ZEdsaGJEeEJZM1IxWVd4RGNHWkhaVzVsY21GMGIzSlBjSFJwYjI1elBqdGNibHh1WTI5dWMzUWdaR1ZtWVhWc2RFOXdkR2x2Ym5NZ1BTQjdYRzRnSUdadmNtMWhkRG9nWm1Gc2MyVXNYRzRnSUhCeVpXWnBlRG9nSnljc1hHNTlPMXh1WEc0dktpcGNiaUFxSUUxbGNtZGxJR04xYzNSdmJTQnZjSFJwYjI1eklIUnZJSFJvWlNCa1pXWmhkV3gwSUc5dVpYTXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHMWxjbWRsVDNCMGFXOXVjeWhqZFhOMGIyMVBjSFJwYjI1ek9pQkRjR1pIWlc1bGNtRjBiM0pQY0hScGIyNXpJRDBnZTMwcE9pQkJZM1IxWVd4RGNHWkhaVzVsY21GMGIzSlBjSFJwYjI1eklIdGNiaUFnY21WMGRYSnVJRzFsY21kbFJHVmxjQ2hrWldaaGRXeDBUM0IwYVc5dWN5d2dZM1Z6ZEc5dFQzQjBhVzl1Y3lrN1hHNTlYRzVjYm1WNGNHOXlkQ0JrWldaaGRXeDBJRzFsY21kbFQzQjBhVzl1Y3p0Y2JpSXNJaThxS2x4dUlDb2dSMlZ1WlhKaGRHVWdZVzRnWVhKeVlYa2diMllnY21GdVpHOXRJRzUxYldKbGNuTWdLR0Z6SUhOMGNtbHVaeWtnWW1WMGQyVmxiaUF3SUdGdVpDQWdPUzVjYmlBcUwxeHVablZ1WTNScGIyNGdiblZ0WW1WeVIyVnVaWEpoZEc5eUtHeGxibWQwYURvZ2JuVnRZbVZ5S1RvZ2JuVnRZbVZ5VzEwZ2UxeHVJQ0JqYjI1emRDQnVkVzFsY21salUyVnhkV1Z1WTJVNklHNTFiV0psY2x0ZElEMGdXMTA3WEc1Y2JpQWdkMmhwYkdVZ0tHNTFiV1Z5YVdOVFpYRjFaVzVqWlM1c1pXNW5kR2dnUENCc1pXNW5kR2dwSUh0Y2JpQWdJQ0JqYjI1emRDQnlZVzVrYjIwZ1BTQk5ZWFJvTG5KaGJtUnZiU2dwSUNvZ01UQTdYRzRnSUNBZ1kyOXVjM1FnYVc1MFpXZGxjaUE5SUUxaGRHZ3VabXh2YjNJb2NtRnVaRzl0S1R0Y2JseHVJQ0FnSUc1MWJXVnlhV05UWlhGMVpXNWpaUzV3ZFhOb0tHbHVkR1ZuWlhJcE8xeHVJQ0I5WEc1Y2JpQWdjbVYwZFhKdUlHNTFiV1Z5YVdOVFpYRjFaVzVqWlR0Y2JuMWNibHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdiblZ0WW1WeVIyVnVaWEpoZEc5eU8xeHVJaXdpYVcxd2IzSjBJR053WmtadGRDQm1jbTl0SUNkQWJHRmpkWE56YjJaMEwyTndaaTFtYlhRbk8xeHVhVzF3YjNKMElHNTFiVTl1YkhrZ1puSnZiU0FuYm5WdExXOXViSGtuTzF4dVhHNXBiWEJ2Y25RZ2JXVnlaMlZQY0hScGIyNXpJR1p5YjIwZ0p5NHZiV1Z5WjJVdGIzQjBhVzl1Y3ljN1hHNXBiWEJ2Y25RZ2RIbHdaU0I3SUVOd1prZGxibVZ5WVhSdmNrOXdkR2x2Ym5NZ2ZTQm1jbTl0SUNjdUwyMWxjbWRsTFc5d2RHbHZibk1uTzF4dWFXMXdiM0owSUc1MWJXSmxja2RsYm1WeVlYUnZjaUJtY205dElDY3VMMjUxYldKbGNpMW5aVzVsY21GMGIzSW5PMXh1WEc0dktpcGNiaUFxSUVkbGJtVnlZWFJsSUdFZ2RtRnNhV1FnUTFCR0lDaENjbUY2YVd4cFlXNGdTVVFnWkc5amRXMWxiblFwSUc1MWJXVnlhV01nYzJWeGRXVnVZMlV1WEc0Z0tpOWNibVoxYm1OMGFXOXVJR053WmtkbGJpaHZjSFJwYjI1elB6b2dRM0JtUjJWdVpYSmhkRzl5VDNCMGFXOXVjeWs2SUhOMGNtbHVaeUI3WEc0Z0lHTnZibk4wSUhWelpYSlBjSFJwYjI1eklEMGdiV1Z5WjJWUGNIUnBiMjV6S0c5d2RHbHZibk1wTzF4dUlDQmpiMjV6ZENCaVlYTmxVMlZ4ZFdWdVkyVWdQU0J1ZFcxUGJteDVLSFZ6WlhKUGNIUnBiMjV6TG5CeVpXWnBlQ2s3WEc0Z0lHTnZibk4wSUhCeVpXWnBlRXhsYm1kMGFDQTlJR0poYzJWVFpYRjFaVzVqWlM1c1pXNW5kR2c3WEc1Y2JpQWdhV1lnS0hCeVpXWnBlRXhsYm1kMGFDQThJREFnZkh3Z2NISmxabWw0VEdWdVozUm9JRDRnT1NrZ2UxeHVJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduVDNCMGFXOXVJRndpY0hKbFptbDRYQ0lnYlhWemRDQmlaU0JoSUhOMGNtbHVaeUJqYjI1MFlXbHVhVzVuSUdKbGRIZGxaVzRnTVNCaGJtUWdPU0JrYVdkcGRITXVKeWs3WEc0Z0lIMWNibHh1SUNCamIyNXpkQ0JqY0daVFpYRjFaVzVqWlNBOUlHSmhjMlZUWlhGMVpXNWpaVnh1SUNBZ0lDNXpjR3hwZENnbkp5bGNiaUFnSUNBdWJXRndLRTUxYldKbGNpbGNiaUFnSUNBdVkyOXVZMkYwS0c1MWJXSmxja2RsYm1WeVlYUnZjaWc1SUMwZ2NISmxabWw0VEdWdVozUm9LU2s3WEc0Z0lGczVMQ0F4TUYwdVptOXlSV0ZqYUNnb2JtVjRkRTUxYlVsdVpHVjRLU0E5UGlCN1hHNGdJQ0FnYkdWMElHWmhZM1J2Y2lBOUlHNWxlSFJPZFcxSmJtUmxlQ0FySURFN1hHNGdJQ0FnYkdWMElITjFiU0E5SURBN1hHNWNiaUFnSUNCbWIzSWdLR3hsZENCdUlEMGdNRHNnYmlBOElHNWxlSFJPZFcxSmJtUmxlRHNnYmlzckxDQm1ZV04wYjNJdExTa2dlMXh1SUNBZ0lDQWdjM1Z0SUNzOUlHTndabE5sY1hWbGJtTmxXMjVkSUNvZ1ptRmpkRzl5TzF4dUlDQWdJSDFjYmx4dUlDQWdJR052Ym5OMElISmxiV0ZwYm1SbGNpQTlJREV4SUMwZ0tITjFiU0FsSURFeEtUdGNiaUFnSUNCamNHWlRaWEYxWlc1alpTNXdkWE5vS0hKbGJXRnBibVJsY2lBK0lEa2dQeUF3SURvZ2NtVnRZV2x1WkdWeUtUdGNiaUFnZlNrN1hHNWNiaUFnY21WMGRYSnVJSFZ6WlhKUGNIUnBiMjV6TG1admNtMWhkQ0EvSUdOd1prWnRkQ2hqY0daVFpYRjFaVzVqWlM1cWIybHVLQ2NuS1NrZ09pQmpjR1pUWlhGMVpXNWpaUzVxYjJsdUtDY25LVHRjYm4xY2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ1kzQm1SMlZ1TzF4dUlsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN096czdPenRCUVZOQkxFMUJRVTBzWTBGQmFVSXNSMEZCUVR0QlFVRkJMRVZCUTNKQ0xFMUJRVkVzUlVGQlFTeExRVUZCTzBGQlFVRXNSVUZEVWl4TlFVRlJMRVZCUVVFN1FVRkRWaXhEUVVGQk8wRkJTMEVzVTBGQlV5eFpRVUZCTEVOQlFXRXNZVUZCY1VNc1IwRkJRU3hGUVVFclFpeEZRVUZCTzBGQlEzaEdMRVZCUVU4c1QwRkJRU3hUUVVGQkxFTkJRVlVzWjBKQlFXZENMR0ZCUVdFc1EwRkJRVHRCUVVOb1JEczdRVU5vUWtFc1UwRkJVeXhuUWtGQlowSXNUVUZCTUVJc1JVRkJRVHRCUVVOcVJDeEZRVUZCTEUxQlFVMHNhMEpCUVRSQ0xFVkJRVU03UVVGRmJrTXNSVUZCVHl4UFFVRkJMR1ZCUVVFc1EwRkJaMElzVTBGQlV5eE5RVUZSTEVWQlFVRTdRVUZEZEVNc1NVRkJUU3hOUVVGQkxFMUJRVUVzUjBGQlV5eEpRVUZMTEVOQlFVRXNUVUZCUVN4RlFVRlhMRWRCUVVFc1JVRkJRVHRCUVVNdlFpeEpRVUZOTEUxQlFVRXNUMEZCUVN4SFFVRlZMRWxCUVVzc1EwRkJRU3hMUVVGQkxFTkJRVTBzVFVGQlRTeERRVUZCTzBGQlJXcERMRWxCUVVFc1pVRkJRU3hEUVVGblFpeExRVUZMTEU5QlFVOHNRMEZCUVR0QlFVRkJPMEZCUnpsQ0xFVkJRVThzVDBGQlFTeGxRVUZCTzBGQlExUTdPMEZEU2tFc1UwRkJVeXhQUVVGUExFOUJRWFZETEVWQlFVRTdRVUZEY2tRc1JVRkJUU3hOUVVGQkxGZEJRVUVzUjBGQll5eGhRVUZoTEU5QlFVOHNRMEZCUVR0QlFVTjRReXhGUVVGTkxFMUJRVUVzV1VGQlFTeEhRVUZsTEU5QlFWRXNRMEZCUVN4WFFVRkJMRU5CUVZrc1RVRkJUU3hEUVVGQk8wRkJReTlETEVWQlFVRXNUVUZCVFN4bFFVRmxMRmxCUVdFc1EwRkJRU3hOUVVGQk8wRkJSV3hETEVWQlFVa3NTVUZCUVN4WlFVRkJMRWRCUVdVc1EwRkJTeXhKUVVGQkxGbEJRVUVzUjBGQlpTeERRVUZITEVWQlFVRTdRVUZEZUVNc1NVRkJUU3hOUVVGQkxFbEJRVWtzVFVGQlRTeHhSVUZCY1VVc1EwRkJRVHRCUVVGQk8wRkJSM1pHTEVWQlFVRXNUVUZCVFN4WFFVRmpMRWRCUVVFc1dVRkJRU3hEUVVOcVFpeExRVUZOTEVOQlFVRXNSVUZCUlN4RFFVTlNMRU5CUVVFc1IwRkJRU3hEUVVGSkxFMUJRVTBzUTBGQlFTeERRVU5XTEUxQlFVOHNRMEZCUVN4bFFVRkJMRU5CUVdkQ0xFTkJRVWtzUjBGQlFTeFpRVUZaTEVOQlFVTXNRMEZCUVR0QlFVTXpReXhGUVVGQkxFTkJRVU1zUTBGQlJ5eEZRVUZCTEVWQlFVVXNRMEZCUlN4RFFVRkJMRTlCUVVFc1EwRkJVU3hEUVVGRExGbEJRV2xDTEV0QlFVRTdRVUZEYUVNc1NVRkJRU3hKUVVGSkxGTkJRVk1zV1VGQlpTeEhRVUZCTEVOQlFVRTdRVUZETlVJc1NVRkJRU3hKUVVGSkxFZEJRVTBzUjBGQlFTeERRVUZCTzBGQlJWWXNTVUZCUVN4TFFVRkJMRWxCUVZNc1EwRkJTU3hIUVVGQkxFTkJRVUVzUlVGQlJ5eERRVUZKTEVkQlFVRXNXVUZCUVN4RlFVRmpMRXRCUVVzc1RVRkJWU3hGUVVGQkxFVkJRVUU3UVVGREwwTXNUVUZCVHl4SFFVRkJMRWxCUVVFc1YwRkJRU3hEUVVGWkxFTkJRVU1zUTBGQlNTeEhRVUZCTEUxQlFVRTdRVUZCUVR0QlFVY3hRaXhKUVVGTkxFMUJRVUVzVTBGQlFTeEhRVUZaTEV0QlFVMHNSMEZCVFN4SFFVRkJMRVZCUVVFN1FVRkRPVUlzU1VGQlFTeFhRVUZCTEVOQlFWa3NTVUZCU3l4RFFVRkJMRk5CUVVFc1IwRkJXU3hEUVVGSkxFZEJRVUVzUTBGQlFTeEhRVUZKTEZOQlFWTXNRMEZCUVR0QlFVRkJMRWRCUXk5RExFTkJRVUU3UVVGRlJDeEZRVUZQTEU5QlFVRXNWMEZCUVN4RFFVRlpMRTFCUVZNc1IwRkJRU3hOUVVGQkxFTkJRVThzVjBGQldTeERRVUZCTEVsQlFVRXNRMEZCU3l4RlFVRkZMRU5CUVVNc1EwRkJRU3hIUVVGSkxGZEJRVmtzUTBGQlFTeEpRVUZCTEVOQlFVc3NSVUZCUlN4RFFVRkJPMEZCUTJoR096czdPeUo5XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcGZHZW4gPSByZXF1aXJlKCdAbGFjdXNzb2Z0L2NwZi1nZW4nKTtcbnZhciBudW1Pbmx5ID0gcmVxdWlyZSgnbnVtLW9ubHknKTtcblxuZnVuY3Rpb24gY3BmVmFsKGNwZlN0cmluZykge1xuICBjb25zdCBDUEZfTEVOR1RIID0gMTE7XG4gIGNvbnN0IGNwZkRpZ2l0cyA9IG51bU9ubHkoY3BmU3RyaW5nKTtcbiAgaWYgKGNwZkRpZ2l0cy5sZW5ndGggIT09IENQRl9MRU5HVEgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGNwZkRpZ2l0cyA9PT0gY3BmR2VuKHtcbiAgICBwcmVmaXg6IGNwZkRpZ2l0cy5zdWJzdHJpbmcoMCwgOSlcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3BmVmFsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhVzVrWlhndVkycHpJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12WTNCbUxYWmhiQzUwY3lKZExDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SnBiWEJ2Y25RZ1kzQm1SMlZ1SUdaeWIyMGdKMEJzWVdOMWMzTnZablF2WTNCbUxXZGxiaWM3WEc1cGJYQnZjblFnYm5WdFQyNXNlU0JtY205dElDZHVkVzB0YjI1c2VTYzdYRzVjYmk4cUtseHVJQ29nVm1Gc2FXUmhkR1VnWVNCbmFYWmxiaUJEVUVZZ0tFSnlZWHBwYkdsaGJpQkpSQ0JrYjJOMWJXVnVkQ2tnWTJoaGNpQnpaWEYxWlc1alpTNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1kzQm1WbUZzS0dOd1psTjBjbWx1WnpvZ2MzUnlhVzVuS1RvZ1ltOXZiR1ZoYmlCN1hHNGdJR052Ym5OMElFTlFSbDlNUlU1SFZFZ2dQU0F4TVR0Y2JpQWdZMjl1YzNRZ1kzQm1SR2xuYVhSeklEMGdiblZ0VDI1c2VTaGpjR1pUZEhKcGJtY3BPMXh1WEc0Z0lHbG1JQ2hqY0daRWFXZHBkSE11YkdWdVozUm9JQ0U5UFNCRFVFWmZURVZPUjFSSUtTQjdYRzRnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNCOVhHNWNiaUFnY21WMGRYSnVJQ2hjYmlBZ0lDQmpjR1pFYVdkcGRITWdQVDA5WEc0Z0lDQWdZM0JtUjJWdUtIdGNiaUFnSUNBZ0lIQnlaV1pwZURvZ1kzQm1SR2xuYVhSekxuTjFZbk4wY21sdVp5Z3dMQ0E1S1N4Y2JpQWdJQ0I5S1Z4dUlDQXBPMXh1ZlZ4dVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCamNHWldZV3c3WEc0aVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdRVUZOUVN4VFFVRlRMRTlCUVU4c1UwRkJORUlzUlVGQlFUdEJRVU14UXl4RlFVRkJMRTFCUVUwc1ZVRkJZU3hIUVVGQkxFVkJRVUU3UVVGRGJrSXNSVUZCVFN4TlFVRkJMRk5CUVVFc1IwRkJXU3hSUVVGUkxGTkJRVk1zUTBGQlFUdEJRVVZ1UXl4RlFVRkpMRWxCUVVFc1UwRkJRU3hEUVVGVkxGZEJRVmNzVlVGQldTeEZRVUZCTzBGQlEyNURMRWxCUVU4c1QwRkJRU3hMUVVGQk8wRkJRVUU3UVVGSFZDeEZRVUZCTEU5QlEwVXNZMEZEUVN4TlFVRlBMRU5CUVVFN1FVRkJRU3hKUVVOTUxFMUJRVkVzUlVGQlFTeFRRVUZCTEVOQlFWVXNVMEZCVlN4RFFVRkJMRU5CUVVFc1JVRkJSeXhEUVVGRE8wRkJRVUVzUjBGRGFrTXNRMEZCUVR0QlFVVk1PenM3T3lKOVxuIiwiaW1wb3J0IGNwZkZtdCBmcm9tICdAbGFjdXNzb2Z0L2NwZi1mbXQnO1xuaW1wb3J0IGNwZkdlbiBmcm9tICdAbGFjdXNzb2Z0L2NwZi1nZW4nO1xuaW1wb3J0IGNwZlZhbCBmcm9tICdAbGFjdXNzb2Z0L2NwZi12YWwnO1xuXG5leHBvcnQgY29uc3QgZm9ybWF0ID0gY3BmRm10O1xuXG5leHBvcnQgY29uc3QgZ2VuZXJhdGUgPSBjcGZHZW47XG5cbmV4cG9ydCBjb25zdCBpc1ZhbGlkID0gY3BmVmFsO1xuXG5leHBvcnQgZGVmYXVsdCB7IGZvcm1hdCwgZ2VuZXJhdGUsIGlzVmFsaWQgfTtcbiJdLCJuYW1lcyI6WyJyZXBsYWNlIiwiZXMiLCJjYSIsImVzY2EiLCJwZSIsIm0iLCJlc2NhcGUiLCJjYWxsIiwiY2pzIiwidW5lcyIsImNhcGUiLCJ1bmVzY2FwZSIsInVuIiwiYnVpbGQiLCJpc01lcmdlYWJsZU9iamVjdCIsInZhbHVlIiwiaXNOb25OdWxsT2JqZWN0IiwiaXNTcGVjaWFsIiwic3RyaW5nVmFsdWUiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImlzUmVhY3RFbGVtZW50IiwiY2FuVXNlU3ltYm9sIiwiU3ltYm9sIiwiZm9yIiwiUkVBQ1RfRUxFTUVOVF9UWVBFIiwiJCR0eXBlb2YiLCJlbXB0eVRhcmdldCIsInZhbCIsIkFycmF5IiwiaXNBcnJheSIsImNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkIiwib3B0aW9ucyIsImNsb25lIiwiZGVlcG1lcmdlIiwiZGVmYXVsdEFycmF5TWVyZ2UiLCJ0YXJnZXQiLCJzb3VyY2UiLCJjb25jYXQiLCJtYXAiLCJlbGVtZW50IiwiZ2V0TWVyZ2VGdW5jdGlvbiIsImtleSIsImN1c3RvbU1lcmdlIiwiZ2V0RW51bWVyYWJsZU93blByb3BlcnR5U3ltYm9scyIsImdldE93blByb3BlcnR5U3ltYm9scyIsImZpbHRlciIsInN5bWJvbCIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwiZ2V0S2V5cyIsImtleXMiLCJwcm9wZXJ0eUlzT25PYmplY3QiLCJvYmplY3QiLCJwcm9wZXJ0eSIsIl8iLCJwcm9wZXJ0eUlzVW5zYWZlIiwiaGFzT3duUHJvcGVydHkiLCJtZXJnZU9iamVjdCIsImRlc3RpbmF0aW9uIiwiZm9yRWFjaCIsImFycmF5TWVyZ2UiLCJzb3VyY2VJc0FycmF5IiwidGFyZ2V0SXNBcnJheSIsInNvdXJjZUFuZFRhcmdldFR5cGVzTWF0Y2giLCJhbGwiLCJkZWVwbWVyZ2VBbGwiLCJhcnJheSIsIkVycm9yIiwicmVkdWNlIiwicHJldiIsIm5leHQiLCJkZWVwbWVyZ2VfMSIsInJlcXVpcmUkJDAiLCJyZXF1aXJlJCQxIiwicmVxdWlyZSQkMiIsImZvcm1hdCIsImNwZkZtdCIsImdlbmVyYXRlIiwiY3BmR2VuIiwiaXNWYWxpZCIsImNwZlZhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7O0dBRUEsTUFBTTtDQUFDQSxJQUFBQTtDQUFPLEdBQUMsR0FBRyxFQUFFOztDQUVwQjtHQUNBLE1BQU1DLEVBQUUsR0FBRyxnREFBZ0Q7R0FDM0QsTUFBTUMsRUFBRSxHQUFHLFVBQVU7Q0FFckIsRUFBQSxNQUFNQyxJQUFJLEdBQUc7Q0FDWCxJQUFBLEdBQUcsRUFBRSxPQUFPO0NBQ1osSUFBQSxHQUFHLEVBQUUsTUFBTTtDQUNYLElBQUEsR0FBRyxFQUFFLE1BQU07Q0FDWCxJQUFBLEdBQUcsRUFBRSxPQUFPO0NBQ1osSUFBQSxHQUFHLEVBQUU7SUFDTjtDQUNELEVBQUEsTUFBTUMsRUFBRSxHQUFHQyxDQUFDLElBQUlGLElBQUksQ0FBQ0UsQ0FBQyxDQUFDOztDQUV2QjtDQUNBO0NB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
