(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Dinero = factory());
}(this, (function () { 'use strict';

  /**
   * Default values for all Dinero objects.
   *
   * You can override default values for all subsequent Dinero objects by changing them directly on the global `Dinero` object.
   * Existing instances won't be affected.
   *
   * @property {Number} defaultAmount - The default amount for new Dinero objects (see {@link module:Dinero Dinero} for format).
   * @property {String} defaultCurrency - The default currency for new Dinero objects (see {@link module:Dinero Dinero} for format).
   * @property {Number} defaultPrecision - The default precision for new Dinero objects (see {@link module:Dinero Dinero} for format).
   *
   * @example
   * // Will set currency to 'EUR' for all Dinero objects.
   * Dinero.defaultCurrency = 'EUR'
   *
   * @type {Object}
   */
  var Defaults = {
    defaultAmount: 0,
    defaultCurrency: 'USD',
    defaultPrecision: 2
  };
  /**
   * Global settings for all Dinero objects.
   *
   * You can override global values for all subsequent Dinero objects by changing them directly on the global `Dinero` object.
   * Existing instances won't be affected.
   *
   * @property {String}  globalLocale - The global locale for new Dinero objects (see {@link module:Dinero~setLocale setLocale} for format).
   * @property {String}  globalFormat - The global format for new Dinero objects (see {@link module:Dinero~toFormat toFormat} for format).
   * @property {String}  globalRoundingMode - The global rounding mode for new Dinero objects (see {@link module:Dinero~multiply multiply} or {@link module:Dinero~divide divide} for format).
   * @property {String}  globalFormatRoundingMode - The global rounding mode to format new Dinero objects (see {@link module:Dinero~toFormat toFormat} or {@link module:Dinero~toRoundedUnit toRoundedUnit} for format).
   * @property {(String|Promise)}  globalExchangeRatesApi.endpoint - The global exchange rate API endpoint for new Dinero objects, or the global promise that resolves to the exchanges rates (see {@link module:Dinero~convert convert} for format).
   * @property {String}  globalExchangeRatesApi.propertyPath - The global exchange rate API property path for new Dinero objects (see {@link module:Dinero~convert convert} for format).
   * @property {Object}  globalExchangeRatesApi.headers - The global exchange rate API headers for new Dinero objects (see {@link module:Dinero~convert convert} for format).
   *
   * @example
   * // Will set locale to 'fr-FR' for all Dinero objects.
   * Dinero.globalLocale = 'fr-FR'
   * @example
   * // Will set global exchange rate API parameters for all Dinero objects.
   * Dinero.globalExchangeRatesApi = {
   *  endpoint: 'https://yourexchangerates.api/latest?base={{from}}',
   *  propertyPath: 'data.rates.{{to}}',
   *  headers: {
   *    'user-key': 'xxxxxxxxx'
   *  }
   * }
   *
   * @type {Object}
   */

  var Globals = {
    globalLocale: 'en-US',
    globalFormat: '$0,0.00',
    globalRoundingMode: 'HALF_EVEN',
    globalFormatRoundingMode: 'HALF_AWAY_FROM_ZERO',
    globalExchangeRatesApi: {
      endpoint: undefined,
      headers: undefined,
      propertyPath: undefined
    }
  };

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /**
   * Static methods for Dinero.
   * @ignore
   *
   * @type {Object}
   */
  var Static = {
    /**
     * Returns an array of Dinero objects, normalized to the same precision (the highest).
     *
     * @memberof module:Dinero
     * @method
     *
     * @param {Dinero[]} objects - An array of Dinero objects
     *
     * @example
     * // returns an array of Dinero objects
     * // both with a precision of 3
     * // and an amount of 1000
     * Dinero.normalizePrecision([
     *   Dinero({ amount: 100, precision: 2 }),
     *   Dinero({ amount: 1000, precision: 3 })
     * ])
     *
     * @return {Dinero[]}
     */
    normalizePrecision: function normalizePrecision(objects) {
      var highestPrecision = objects.reduce(function (a, b) {
        return Math.max(a.getPrecision(), b.getPrecision());
      });
      return objects.map(function (object) {
        return object.getPrecision() !== highestPrecision ? object.convertPrecision(highestPrecision) : object;
      });
    },

    /**
     * Returns the smallest Dinero object from an array of Dinero objects
     *
     * @memberof module:Dinero
     * @method
     *
     * @param {Dinero[]} objects - An array of Dinero objects
     *
     * @example
     * // returns the smallest Dinero object with amount of 500 from an array of Dinero objects with different precisions
     * Dinero.minimum([
     *   Dinero({ amount: 500, precision: 3 }),
     *   Dinero({ amount: 100, precision: 2 })
     * ])
     * @example
     * // returns the smallest Dinero object with amount of 50 from an array of Dinero objects
     * Dinero.minimum([
     *   Dinero({ amount: 50 }),
     *   Dinero({ amount: 100 })
     * ])
     *
     * @return {Dinero[]}
     */
    minimum: function minimum(objects) {
      var _objects = _toArray(objects),
          firstObject = _objects[0],
          tailObjects = _objects.slice(1);

      var currentMinimum = firstObject;
      tailObjects.forEach(function (obj) {
        currentMinimum = currentMinimum.lessThan(obj) ? currentMinimum : obj;
      });
      return currentMinimum;
    },

    /**
     * Returns the biggest Dinero object from an array of Dinero objects
     *
     * @memberof module:Dinero
     * @method
     *
     * @param {Dinero[]} objects - An array of Dinero objects
     *
     * @example
     * // returns the biggest Dinero object with amount of 20, from an array of Dinero objects with different precisions
     * Dinero.maximum([
     *   Dinero({ amount: 20, precision: 2 }),
     *   Dinero({ amount: 150, precision: 3 })
     * ])
     * @example
     * // returns the biggest Dinero object with amount of 100, from an array of Dinero objects
     * Dinero.maximum([
     *   Dinero({ amount: 100 }),
     *   Dinero({ amount: 50 })
     * ])
     *
     * @return {Dinero[]}
     */
    maximum: function maximum(objects) {
      var _objects2 = _toArray(objects),
          firstObject = _objects2[0],
          tailObjects = _objects2.slice(1);

      var currentMaximum = firstObject;
      tailObjects.forEach(function (obj) {
        currentMaximum = currentMaximum.greaterThan(obj) ? currentMaximum : obj;
      });
      return currentMaximum;
    }
  };

  /**
   * Returns whether a value is numeric.
   * @ignore
   *
   * @param  {} value - The value to test.
   *
   * @return {Boolean}
   */
  function isNumeric(value) {
    return !isNaN(parseInt(value)) && isFinite(value);
  }
  /**
   * Returns whether a value is a percentage.
   * @ignore
   *
   * @param  {}  percentage - The percentage to test.
   *
   * @return {Boolean}
   */

  function isPercentage(percentage) {
    return isNumeric(percentage) && percentage <= 100 && percentage >= 0;
  }
  /**
   * Returns whether an array of ratios is valid.
   * @ignore
   *
   * @param  {}  ratios - The ratios to test.
   *
   * @return {Boolean}
   */

  function areValidRatios(ratios) {
    return ratios.length > 0 && ratios.every(function (ratio) {
      return ratio >= 0;
    }) && ratios.some(function (ratio) {
      return ratio > 0;
    });
  }
  /**
   * Returns whether a value is even.
   * @ignore
   *
   * @param  {Number} value - The value to test.
   *
   * @return {Boolean}
   */

  function isEven(value) {
    return value % 2 === 0;
  }
  /**
   * Returns whether a value is a float.
   * @ignore
   *
   * @param  {}  value - The value to test.
   *
   * @return {Boolean}
   */

  function isFloat(value) {
    return isNumeric(value) && !Number.isInteger(value);
  }
  /**
   * Returns how many fraction digits a number has.
   * @ignore
   *
   * @param  {Number} [number=0] - The number to test.
   *
   * @return {Number}
   */

  function countFractionDigits() {
    var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var stringRepresentation = number.toString();

    if (stringRepresentation.indexOf('e-') > 0) {
      // It's too small for a normal string representation, e.g. 1e-7 instead of 0.00000001
      return parseInt(stringRepresentation.split('e-')[1]);
    } else {
      var fractionDigits = stringRepresentation.split('.')[1];
      return fractionDigits ? fractionDigits.length : 0;
    }
  }
  /**
   * Returns whether a number is half.
   * @ignore
   *
   * @param {Number} number - The number to test.
   *
   * @return {Number}
   */

  function isHalf(number) {
    return Math.abs(number) % 1 === 0.5;
  }
  /**
   * Fetches a JSON resource.
   * @ignore
   *
   * @param  {String} url - The resource to fetch.
   * @param  {Object} [options.headers] - The headers to pass.
   *
   * @throws {Error} If `request.status` is lesser than 200 or greater or equal to 400.
   * @throws {Error} If network fails.
   *
   * @return {JSON}
   */

  function getJSON(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise(function (resolve, reject) {
      var request = Object.assign(new XMLHttpRequest(), {
        onreadystatechange: function onreadystatechange() {
          if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 400) resolve(JSON.parse(request.responseText));else reject(new Error(request.statusText));
          }
        },
        onerror: function onerror() {
          reject(new Error('Network error'));
        }
      });
      request.open('GET', url, true);
      setXHRHeaders(request, options.headers);
      request.send();
    });
  }
  /**
   * Returns an XHR object with attached headers.
   * @ignore
   *
   * @param {XMLHttpRequest} xhr - The XHR request to set headers to.
   * @param {Object} headers - The headers to set.
   *
   * @return {XMLHttpRequest}
   */

  function setXHRHeaders(xhr) {
    var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var header in headers) {
      xhr.setRequestHeader(header, headers[header]);
    }

    return xhr;
  }
  /**
   * Returns whether a value is undefined.
   * @ignore
   *
   * @param {} value - The value to test.
   *
   * @return {Boolean}
   */

  function isUndefined(value) {
    return typeof value === 'undefined';
  }
  /**
   * Returns an object flattened to one level deep.
   * @ignore
   *
   * @param {Object} object - The object to flatten.
   * @param {String} separator - The separator to use between flattened nodes.
   *
   * @return {Object}
   */

  function flattenObject(object) {
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';
    var finalObject = {};
    Object.entries(object).forEach(function (item) {
      if (_typeof(item[1]) === 'object') {
        var flatObject = flattenObject(item[1]);
        Object.entries(flatObject).forEach(function (node) {
          finalObject[item[0] + separator + node[0]] = node[1];
        });
      } else {
        finalObject[item[0]] = item[1];
      }
    });
    return finalObject;
  }
  /**
   * Returns whether a value is thenable.
   * @ignore
   *
   * @param {} value - The value to test.
   *
   * @return {Boolean}
   */

  function isThenable(value) {
    return Boolean(value) && (_typeof(value) === 'object' || typeof value === 'function') && typeof value.then === 'function';
  }

  function Calculator() {
    var floatMultiply = function floatMultiply(a, b) {
      var getFactor = function getFactor(number) {
        return Math.pow(10, countFractionDigits(number));
      };

      var factor = Math.max(getFactor(a), getFactor(b));
      return Math.round(a * factor) * Math.round(b * factor) / (factor * factor);
    };

    var roundingModes = {
      HALF_ODD: function HALF_ODD(number) {
        var rounded = Math.round(number);
        return isHalf(number) ? isEven(rounded) ? rounded - 1 : rounded : rounded;
      },
      HALF_EVEN: function HALF_EVEN(number) {
        var rounded = Math.round(number);
        return isHalf(number) ? isEven(rounded) ? rounded : rounded - 1 : rounded;
      },
      HALF_UP: function HALF_UP(number) {
        return Math.round(number);
      },
      HALF_DOWN: function HALF_DOWN(number) {
        return isHalf(number) ? Math.floor(number) : Math.round(number);
      },
      HALF_TOWARDS_ZERO: function HALF_TOWARDS_ZERO(number) {
        return isHalf(number) ? Math.sign(number) * Math.floor(Math.abs(number)) : Math.round(number);
      },
      HALF_AWAY_FROM_ZERO: function HALF_AWAY_FROM_ZERO(number) {
        return isHalf(number) ? Math.sign(number) * Math.ceil(Math.abs(number)) : Math.round(number);
      },
      DOWN: function DOWN(number) {
        return Math.floor(number);
      }
    };
    return {
      /**
       * Returns the sum of two numbers.
       * @ignore
       *
       * @param {Number} a - The first number to add.
       * @param {Number} b - The second number to add.
       *
       * @return {Number}
       */
      add: function add(a, b) {
        return a + b;
      },

      /**
       * Returns the difference of two numbers.
       * @ignore
       *
       * @param {Number} a - The first number to subtract.
       * @param {Number} b - The second number to subtract.
       *
       * @return {Number}
       */
      subtract: function subtract(a, b) {
        return a - b;
      },

      /**
       * Returns the product of two numbers.
       * @ignore
       *
       * @param {Number} a - The first number to multiply.
       * @param {Number} b - The second number to multiply.
       *
       * @return {Number}
       */
      multiply: function multiply(a, b) {
        return isFloat(a) || isFloat(b) ? floatMultiply(a, b) : a * b;
      },

      /**
       * Returns the quotient of two numbers.
       * @ignore
       *
       * @param {Number} a - The first number to divide.
       * @param {Number} b - The second number to divide.
       *
       * @return {Number}
       */
      divide: function divide(a, b) {
        return a / b;
      },

      /**
       * Returns the remainder of two numbers.
       * @ignore
       *
       * @param  {Number} a - The first number to divide.
       * @param  {Number} b - The second number to divide.
       *
       * @return {Number}
       */
      modulo: function modulo(a, b) {
        return a % b;
      },

      /**
       * Returns a rounded number based off a specific rounding mode.
       * @ignore
       *
       * @param {Number} number - The number to round.
       * @param {String} [roundingMode='HALF_EVEN'] - The rounding mode to use.
       *
       * @returns {Number}
       */
      round: function round(number) {
        var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'HALF_EVEN';
        return roundingModes[roundingMode](number);
      }
    };
  }

  var calculator = Calculator();
  function Format(format) {
    var matches = /^(?:(\$|USD)?0(?:(,)0)?(\.)?(0+)?|0(?:(,)0)?(\.)?(0+)?\s?(dollar)?)$/gm.exec(format);
    return {
      /**
       * Returns the matches.
       * @ignore
       *
       * @return {Array}
       */
      getMatches: function getMatches() {
        return matches !== null ? matches.slice(1).filter(function (match) {
          return !isUndefined(match);
        }) : [];
      },

      /**
       * Returns the amount of fraction digits to display.
       * @ignore
       *
       * @return {Number}
       */
      getMinimumFractionDigits: function getMinimumFractionDigits() {
        var decimalPosition = function decimalPosition(match) {
          return match === '.';
        };

        return !isUndefined(this.getMatches().find(decimalPosition)) ? this.getMatches()[calculator.add(this.getMatches().findIndex(decimalPosition), 1)].split('').length : 0;
      },

      /**
       * Returns the currency display mode.
       * @ignore
       *
       * @return {String}
       */
      getCurrencyDisplay: function getCurrencyDisplay() {
        var modes = {
          USD: 'code',
          dollar: 'name',
          $: 'symbol'
        };
        return modes[this.getMatches().find(function (match) {
          return match === 'USD' || match === 'dollar' || match === '$';
        })];
      },

      /**
       * Returns the formatting style.
       * @ignore
       *
       * @return {String}
       */
      getStyle: function getStyle() {
        return !isUndefined(this.getCurrencyDisplay(this.getMatches())) ? 'currency' : 'decimal';
      },

      /**
       * Returns whether grouping should be used or not.
       * @ignore
       *
       * @return {Boolean}
       */
      getUseGrouping: function getUseGrouping() {
        return !isUndefined(this.getMatches().find(function (match) {
          return match === ',';
        }));
      }
    };
  }

  function CurrencyConverter(options) {
    /* istanbul ignore next */
    var mergeTags = function mergeTags() {
      var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var tags = arguments.length > 1 ? arguments[1] : undefined;

      for (var tag in tags) {
        string = string.replace("{{".concat(tag, "}}"), tags[tag]);
      }

      return string;
    };
    /* istanbul ignore next */


    var getRatesFromRestApi = function getRatesFromRestApi(from, to) {
      return getJSON(mergeTags(options.endpoint, {
        from: from,
        to: to
      }), {
        headers: options.headers
      });
    };

    return {
      /**
       * Returns the exchange rate.
       * @ignore
       *
       * @param  {String} from - The base currency.
       * @param  {String} to   - The destination currency.
       *
       * @return {Promise}
       */
      getExchangeRate: function getExchangeRate(from, to) {
        return (isThenable(options.endpoint) ? options.endpoint : getRatesFromRestApi(from, to)).then(function (data) {
          return flattenObject(data)[mergeTags(options.propertyPath, {
            from: from,
            to: to
          })];
        });
      }
    };
  }

  /**
   * Performs an assertion.
   * @ignore
   *
   * @param  {Boolean} condition - The expression to assert.
   * @param  {String}  errorMessage - The message to throw if the assertion fails
   * @param  {ErrorConstructor}   [ErrorType=Error] - The error to throw if the assertion fails.
   *
   * @throws {Error} If `condition` returns `false`.
   */

  function assert(condition, errorMessage) {
    var ErrorType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Error;
    if (!condition) throw new ErrorType(errorMessage);
  }
  /**
   * Asserts a value is a percentage.
   * @ignore
   *
   * @param  {}  percentage - The percentage to test.
   *
   * @throws {RangeError} If `percentage` is out of range.
   */

  function assertPercentage(percentage) {
    assert(isPercentage(percentage), 'You must provide a numeric value between 0 and 100.', RangeError);
  }
  /**
   * Asserts an array of ratios is valid.
   * @ignore
   *
   * @param  {}  ratios - The ratios to test.
   *
   * @throws {TypeError} If `ratios` are invalid.
   */

  function assertValidRatios(ratios) {
    assert(areValidRatios(ratios), 'You must provide a non-empty array of numeric values greater than 0.', TypeError);
  }
  /**
   * Asserts a value is an integer.
   * @ignore
   *
   * @param  {}  number - The value to test.
   *
   * @throws {TypeError}
   */

  function assertInteger(number) {
    assert(Number.isInteger(number), 'You must provide an integer.', TypeError);
  }

  var calculator$1 = Calculator();
  /**
   * A Dinero object is an immutable data structure representing a specific monetary value.
   * It comes with methods for creating, parsing, manipulating, testing, transforming and formatting them.
   *
   * A Dinero object has:
   *
   * * An `amount`, expressed in minor currency units, as an integer.
   * * A `currency`, expressed as an {@link https://en.wikipedia.org/wiki/ISO_4217#Active_codes ISO 4217 currency code}.
   * * A `precision`, expressed as an integer, to represent the number of decimal places in the `amount`.
   *   This is helpful when you want to represent fractional minor currency units (e.g.: $10.4545).
   *   You can also use it to represent a currency with a different [exponent](https://en.wikipedia.org/wiki/ISO_4217#Treatment_of_minor_currency_units_.28the_.22exponent.22.29) than `2` (e.g.: Iraqi dinar with 1000 fils in 1 dinar (exponent of `3`), Japanese yen with no sub-units (exponent of `0`)).
   * * An optional `locale` property that affects how output strings are formatted.
   *
   * Here's an overview of the public API:
   *
   * * **Access:** {@link module:Dinero~getAmount getAmount}, {@link module:Dinero~getCurrency getCurrency}, {@link module:Dinero~getLocale getLocale} and {@link module:Dinero~getPrecision getPrecision}.
   * * **Manipulation:** {@link module:Dinero~add add}, {@link module:Dinero~subtract subtract}, {@link module:Dinero~multiply multiply}, {@link module:Dinero~divide divide}, {@link module:Dinero~percentage percentage}, {@link module:Dinero~allocate allocate} and {@link module:Dinero~convert convert}.
   * * **Testing:** {@link module:Dinero~equalsTo equalsTo}, {@link module:Dinero~lessThan lessThan}, {@link module:Dinero~lessThanOrEqual lessThanOrEqual}, {@link module:Dinero~greaterThan greaterThan}, {@link module:Dinero~greaterThanOrEqual greaterThanOrEqual}, {@link module:Dinero~isZero isZero}, {@link module:Dinero~isPositive isPositive}, {@link module:Dinero~isNegative isNegative}, {@link module:Dinero~hasSubUnits hasSubUnits}, {@link module:Dinero~hasSameCurrency hasSameCurrency} and {@link module:Dinero~hasSameAmount hasSameAmount}.
   * * **Configuration:** {@link module:Dinero~setLocale setLocale}.
   * * **Conversion & formatting:** {@link module:Dinero~toFormat toFormat}, {@link module:Dinero~toUnit toUnit}, {@link module:Dinero~toRoundedUnit toRoundedUnit}, {@link module:Dinero~toObject toObject}, {@link module:Dinero~toJSON toJSON}, {@link module:Dinero~convertPrecision convertPrecision} and {@link module:Dinero.normalizePrecision normalizePrecision}.
   *
   * Dinero.js uses `number`s under the hood, so it's constrained by the [double-precision floating-point format](https://en.wikipedia.org/wiki/Double-precision_floating-point_format). Using values over [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number/MAX_SAFE_INTEGER) or below [`Number.MIN_SAFE_INTEGER`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number/MIN_SAFE_INTEGER) will yield unpredictable results.
   * Same goes with performing calculations: once the internal `amount` value exceeds those limits, precision is no longer guaranteed.
   *
   * @module Dinero
   * @param  {Number} [options.amount=0] - The amount in minor currency units (as an integer).
   * @param  {String} [options.currency='USD'] - An ISO 4217 currency code.
   * @param  {String} [options.precision=2] - The number of decimal places to represent.
   *
   * @throws {TypeError} If `amount` or `precision` is invalid. Integers over [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number/MAX_SAFE_INTEGER) or below [`Number.MIN_SAFE_INTEGER`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number/MIN_SAFE_INTEGER) are considered valid, even though they can lead to imprecise amounts.
   *
   * @return {Object}
   */

  var Dinero = function Dinero(options) {
    var _Object$assign = Object.assign({}, {
      amount: Dinero.defaultAmount,
      currency: Dinero.defaultCurrency,
      precision: Dinero.defaultPrecision
    }, options),
        amount = _Object$assign.amount,
        currency = _Object$assign.currency,
        precision = _Object$assign.precision;

    assertInteger(amount);
    assertInteger(precision);
    var globalLocale = Dinero.globalLocale,
        globalFormat = Dinero.globalFormat,
        globalRoundingMode = Dinero.globalRoundingMode,
        globalFormatRoundingMode = Dinero.globalFormatRoundingMode;
    var globalExchangeRatesApi = Object.assign({}, Dinero.globalExchangeRatesApi);
    /**
     * Uses ES5 function notation so `this` can be passed through call, apply and bind
     * @ignore
     */

    var create = function create(options) {
      var obj = Object.assign({}, Object.assign({}, {
        amount: amount,
        currency: currency,
        precision: precision
      }, options), Object.assign({}, {
        locale: this.locale
      }, options));
      return Object.assign(Dinero({
        amount: obj.amount,
        currency: obj.currency,
        precision: obj.precision
      }), {
        locale: obj.locale
      });
    };
    /**
     * Uses ES5 function notation so `this` can be passed through call, apply and bind
     * @ignore
     */


    var assertSameCurrency = function assertSameCurrency(comparator) {
      assert(this.hasSameCurrency(comparator), 'You must provide a Dinero instance with the same currency.', TypeError);
    };

    return {
      /**
       * Returns the amount.
       *
       * @example
       * // returns 500
       * Dinero({ amount: 500 }).getAmount()
       *
       * @return {Number}
       */
      getAmount: function getAmount() {
        return amount;
      },

      /**
       * Returns the currency.
       *
       * @example
       * // returns 'EUR'
       * Dinero({ currency: 'EUR' }).getCurrency()
       *
       * @return {String}
       */
      getCurrency: function getCurrency() {
        return currency;
      },

      /**
       * Returns the locale.
       *
       * @example
       * // returns 'fr-FR'
       * Dinero().setLocale('fr-FR').getLocale()
       *
       * @return {String}
       */
      getLocale: function getLocale() {
        return this.locale || globalLocale;
      },

      /**
       * Returns a new Dinero object with an embedded locale.
       *
       * @param {String} newLocale - The new locale as an {@link http://tools.ietf.org/html/rfc5646 BCP 47 language tag}.
       *
       * @example
       * // Returns a Dinero object with locale 'ja-JP'
       * Dinero().setLocale('ja-JP')
       *
       * @return {Dinero}
       */
      setLocale: function setLocale(newLocale) {
        return create.call(this, {
          locale: newLocale
        });
      },

      /**
       * Returns the precision.
       *
       * @example
       * // returns 3
       * Dinero({ precision: 3 }).getPrecision()
       *
       * @return {Number}
       */
      getPrecision: function getPrecision() {
        return precision;
      },

      /**
       * Returns a new Dinero object with a new precision and a converted amount.
       *
       * By default, fractional minor currency units are rounded using the **half to even** rule ([banker's rounding](http://wiki.c2.com/?BankersRounding)).
       * This can be necessary when you need to convert objects to a smaller precision.
       *
       * Rounding *can* lead to accuracy issues as you chain many times. Consider a minimal amount of subsequent conversions for safer results.
       * You can also specify a different `roundingMode` to better fit your needs.
       *
       * @param {Number} newPrecision - The new precision.
       * @param {String} [roundingMode='HALF_EVEN'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'`, `'HALF_AWAY_FROM_ZERO'` or `'DOWN'`.
       *
       * @example
       * // Returns a Dinero object with precision 3 and amount 1000
       * Dinero({ amount: 100, precision: 2 }).convertPrecision(3)
       *
       * @throws {TypeError} If `newPrecision` is invalid.
       *
       * @return {Dinero}
       */
      convertPrecision: function convertPrecision(newPrecision) {
        var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalFormatRoundingMode;
        assertInteger(newPrecision);
        var precision = this.getPrecision();
        var isNewPrecisionLarger = newPrecision > precision;
        var operation = isNewPrecisionLarger ? calculator$1.multiply : calculator$1.divide;
        var terms = isNewPrecisionLarger ? [newPrecision, precision] : [precision, newPrecision];
        var factor = Math.pow(10, calculator$1.subtract.apply(calculator$1, terms));
        return create.call(this, {
          amount: calculator$1.round(operation(this.getAmount(), factor), roundingMode),
          precision: newPrecision
        });
      },

      /**
       * Returns a new Dinero object that represents the sum of this and an other Dinero object.
       *
       * If Dinero objects have a different `precision`, they will be first converted to the highest.
       *
       * @param {Dinero} addend - The Dinero object to add.
       *
       * @example
       * // returns a Dinero object with amount 600
       * Dinero({ amount: 400 }).add(Dinero({ amount: 200 }))
       * @example
       * // returns a Dinero object with amount 144545 and precision 4
       * Dinero({ amount: 400 }).add(Dinero({ amount: 104545, precision: 4 }))
       *
       * @throws {TypeError} If `addend` has a different currency.
       *
       * @return {Dinero}
       */
      add: function add(addend) {
        assertSameCurrency.call(this, addend);
        var addends = Dinero.normalizePrecision([this, addend]);
        return create.call(this, {
          amount: calculator$1.add(addends[0].getAmount(), addends[1].getAmount()),
          precision: addends[0].getPrecision()
        });
      },

      /**
       * Returns a new Dinero object that represents the difference of this and an other Dinero object.
       *
       * If Dinero objects have a different `precision`, they will be first converted to the highest.
       *
       * @param  {Dinero} subtrahend - The Dinero object to subtract.
       *
       * @example
       * // returns a Dinero object with amount 200
       * Dinero({ amount: 400 }).subtract(Dinero({ amount: 200 }))
       * @example
       * // returns a Dinero object with amount 64545 and precision 4
       * Dinero({ amount: 104545, precision: 4 }).subtract(Dinero({ amount: 400 }))
       *
       * @throws {TypeError} If `subtrahend` has a different currency.
       *
       * @return {Dinero}
       */
      subtract: function subtract(subtrahend) {
        assertSameCurrency.call(this, subtrahend);
        var subtrahends = Dinero.normalizePrecision([this, subtrahend]);
        return create.call(this, {
          amount: calculator$1.subtract(subtrahends[0].getAmount(), subtrahends[1].getAmount()),
          precision: subtrahends[0].getPrecision()
        });
      },

      /**
       * Returns a new Dinero object that represents the multiplied value by the given factor.
       *
       * By default, fractional minor currency units are rounded using the **half to even** rule ([banker's rounding](http://wiki.c2.com/?BankersRounding)).
       *
       * Rounding *can* lead to accuracy issues as you chain many times. Consider a minimal amount of subsequent calculations for safer results.
       * You can also specify a different `roundingMode` to better fit your needs.
       *
       * @param  {Number} multiplier - The factor to multiply by.
       * @param  {String} [roundingMode='HALF_EVEN'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'`, `'HALF_AWAY_FROM_ZERO'` or `'DOWN'`.
       *
       * @example
       * // returns a Dinero object with amount 1600
       * Dinero({ amount: 400 }).multiply(4)
       * @example
       * // returns a Dinero object with amount 800
       * Dinero({ amount: 400 }).multiply(2.001)
       * @example
       * // returns a Dinero object with amount 801
       * Dinero({ amount: 400 }).multiply(2.00125, 'HALF_UP')
       *
       * @return {Dinero}
       */
      multiply: function multiply(multiplier) {
        var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalRoundingMode;
        return create.call(this, {
          amount: calculator$1.round(calculator$1.multiply(this.getAmount(), multiplier), roundingMode)
        });
      },

      /**
       * Returns a new Dinero object that represents the divided value by the given factor.
       *
       * By default, fractional minor currency units are rounded using the **half to even** rule ([banker's rounding](http://wiki.c2.com/?BankersRounding)).
       *
       * Rounding *can* lead to accuracy issues as you chain many times. Consider a minimal amount of subsequent calculations for safer results.
       * You can also specify a different `roundingMode` to better fit your needs.
       *
       * As rounding is applied, precision may be lost in the process. If you want to accurately split a Dinero object, use {@link module:Dinero~allocate allocate} instead.
       *
       * @param  {Number} divisor - The factor to divide by.
       * @param  {String} [roundingMode='HALF_EVEN'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'`, `'HALF_AWAY_FROM_ZERO'` or `'DOWN'`.
       *
       * @example
       * // returns a Dinero object with amount 100
       * Dinero({ amount: 400 }).divide(4)
       * @example
       * // returns a Dinero object with amount 52
       * Dinero({ amount: 105 }).divide(2)
       * @example
       * // returns a Dinero object with amount 53
       * Dinero({ amount: 105 }).divide(2, 'HALF_UP')
       *
       * @return {Dinero}
       */
      divide: function divide(divisor) {
        var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalRoundingMode;
        return create.call(this, {
          amount: calculator$1.round(calculator$1.divide(this.getAmount(), divisor), roundingMode)
        });
      },

      /**
       * Returns a new Dinero object that represents a percentage of this.
       *
       * As rounding is applied, precision may be lost in the process. If you want to accurately split a Dinero object, use {@link module:Dinero~allocate allocate} instead.
       *
       * @param  {Number} percentage - The percentage to extract (between 0 and 100).
       * @param  {String} [roundingMode='HALF_EVEN'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'`, `'HALF_AWAY_FROM_ZERO'` or `'DOWN'`.
       *
       * @example
       * // returns a Dinero object with amount 5000
       * Dinero({ amount: 10000 }).percentage(50)
       * @example
       * // returns a Dinero object with amount 29
       * Dinero({ amount: 57 }).percentage(50, "HALF_ODD")
       *
       * @throws {RangeError} If `percentage` is out of range.
       *
       * @return {Dinero}
       */
      percentage: function percentage(_percentage) {
        var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalRoundingMode;
        assertPercentage(_percentage);
        return this.multiply(calculator$1.divide(_percentage, 100), roundingMode);
      },

      /**
       * Allocates the amount of a Dinero object according to a list of ratios.
       *
       * Sometimes you need to split monetary values but percentages can't cut it without adding or losing pennies.
       * A good example is invoicing: let's say you need to bill $1,000.03 and you want a 50% downpayment.
       * If you use {@link module:Dinero~percentage percentage}, you'll get an accurate Dinero object but the amount won't be billable: you can't split a penny.
       * If you round it, you'll bill a penny extra.
       * With {@link module:Dinero~allocate allocate}, you can split a monetary amount then distribute the remainder as evenly as possible.
       *
       * You can use percentage style or ratio style for `ratios`: `[25, 75]` and `[1, 3]` will do the same thing.
       *
       * Since v1.8.0, you can use zero ratios (such as [0, 50, 50]). If there's a remainder to distribute, zero ratios are skipped and return a Dinero object with amount zero.
       *
       * @param  {Number[]} ratios - The ratios to allocate the money to.
       *
       * @example
       * // returns an array of two Dinero objects
       * // the first one with an amount of 502
       * // the second one with an amount of 501
       * Dinero({ amount: 1003 }).allocate([50, 50])
       * @example
       * // returns an array of two Dinero objects
       * // the first one with an amount of 25
       * // the second one with an amount of 75
       * Dinero({ amount: 100 }).allocate([1, 3])
       * @example
       * // since version 1.8.0
       * // returns an array of three Dinero objects
       * // the first one with an amount of 0
       * // the second one with an amount of 502
       * // the third one with an amount of 501
       * Dinero({ amount: 1003 }).allocate([0, 50, 50])
       *
       * @throws {TypeError} If ratios are invalid.
       *
       * @return {Dinero[]}
       */
      allocate: function allocate(ratios) {
        var _this = this;

        assertValidRatios(ratios);
        var total = ratios.reduce(function (a, b) {
          return calculator$1.add(a, b);
        });
        var remainder = this.getAmount();
        var shares = ratios.map(function (ratio) {
          var share = Math.floor(calculator$1.divide(calculator$1.multiply(_this.getAmount(), ratio), total));
          remainder = calculator$1.subtract(remainder, share);
          return create.call(_this, {
            amount: share
          });
        });
        var i = 0;

        while (remainder > 0) {
          if (ratios[i] > 0) {
            shares[i] = shares[i].add(create.call(this, {
              amount: 1
            }));
            remainder = calculator$1.subtract(remainder, 1);
          }

          i += 1;
        }

        return shares;
      },

      /**
       * Returns a Promise containing a new Dinero object converted to another currency.
       *
       * You have two options to provide the exchange rates:
       *
       * 1. **Use an exchange rate REST API, and let Dinero handle the fetching and conversion.**
       *   This is a simple option if you have access to an exchange rate REST API and want Dinero to do the rest.
       * 2. **Fetch the exchange rates on your own and provide them directly.**
       *   This is useful if you're fetching your rates from somewhere else (a file, a database), use a different protocol or query language than REST (SOAP, GraphQL) or want to fetch rates once and cache them instead of making new requests every time.
       *
       * **If you want to use a REST API**, you must provide a third-party endpoint yourself. Dinero doesn't come bundled with an exchange rates endpoint.
       *
       * Here are some exchange rate APIs you can use:
       *
       * * [Fixer](https://fixer.io)
       * * [Open Exchange Rates](https://openexchangerates.org)
       * * [Coinbase](https://api.coinbase.com/v2/exchange-rates)
       * * More [foreign](https://github.com/toddmotto/public-apis#currency-exchange) and [crypto](https://github.com/toddmotto/public-apis#cryptocurrency) exchange rate APIs.
       *
       * **If you want to fetch your own rates and provide them directly**, you need to pass a promise that resolves to the exchanges rates.
       *
       * In both cases, you need to specify at least:
       *
       * * a **destination currency**: the currency in which you want to convert your Dinero object. You can specify it with `currency`.
       * * an **endpoint**: the API URL to query exchange rates, with parameters, or a promise that resolves to the exchange rates. You can specify it with `options.endpoint`.
       * * a **property path**: the path to access the wanted rate in your API's JSON response (or the custom promise's payload). For example, with a response of:
       * ```json
       * {
       *     "data": {
       *       "base": "USD",
       *       "destination": "EUR",
       *       "rate": "0.827728919"
       *     }
       * }
       * ```
       * Then the property path is `'data.rate'`. You can specify it with `options.propertyPath`.
       *
       * The base currency (the one of your Dinero object) and the destination currency can be used as "merge tags" with the mustache syntax, respectively `{{from}}` and `{{to}}`.
       * You can use these tags to refer to these values in `options.endpoint` and `options.propertyPath`.
       *
       * For example, if you need to specify the base currency as a query parameter, you can do the following:
       *
       * ```js
       * {
       *   endpoint: 'https://yourexchangerates.api/latest?base={{from}}'
       * }
       * ```
       *
       * @param  {String} currency - The destination currency, expressed as an {@link https://en.wikipedia.org/wiki/ISO_4217#Active_codes ISO 4217 currency code}.
       * @param  {(String|Promise)} options.endpoint - The API endpoint to retrieve exchange rates. You can substitute this with a promise that resolves to the exchanges rates if you already have them.
       * @param  {String} [options.propertyPath='rates.{{to}}'] - The property path to the rate.
       * @param  {Object} [options.headers] - The HTTP headers to provide, if needed.
       * @param  {String} [options.roundingMode='HALF_EVEN'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'`, `'HALF_AWAY_FROM_ZERO'` or `'DOWN'`.
       *
       * @example
       * // your global API parameters
       * Dinero.globalExchangeRatesApi = { ... }
       *
       * // returns a Promise containing a Dinero object with the destination currency
       * // and the initial amount converted to the new currency.
       * Dinero({ amount: 500 }).convert('EUR')
       * @example
       * // returns a Promise containing a Dinero object,
       * // with specific API parameters and rounding mode for this specific instance.
       * Dinero({ amount: 500 })
       *   .convert('XBT', {
       *     endpoint: 'https://yourexchangerates.api/latest?base={{from}}',
       *     propertyPath: 'data.rates.{{to}}',
       *     headers: {
       *       'user-key': 'xxxxxxxxx'
       *     },
       *     roundingMode: 'HALF_UP'
       *   })
       * @example
       * // usage with exchange rates provided as a custom promise
       * // using the default `propertyPath` format (so it doesn't have to be specified)
       * const rates = {
       *   rates: {
       *     EUR: 0.81162
       *   }
       * }
       *
       * Dinero({ amount: 500 })
       *   .convert('EUR', {
       *     endpoint: new Promise(resolve => resolve(rates))
       *   })
       * @example
       * // usage with Promise.prototype.then and Promise.prototype.catch
       * Dinero({ amount: 500 })
       *   .convert('EUR')
       *   .then(dinero => {
       *     dinero.getCurrency() // returns 'EUR'
       *   })
       *   .catch(err => {
       *     // handle errors
       *   })
       * @example
       * // usage with async/await
       * (async () => {
       *   const price = await Dinero({ amount: 500 }).convert('EUR')
       *   price.getCurrency() // returns 'EUR'
       * })()
       *
       * @return {Promise}
       */
      convert: function convert(currency) {
        var _this2 = this;

        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref$endpoint = _ref.endpoint,
            endpoint = _ref$endpoint === void 0 ? globalExchangeRatesApi.endpoint : _ref$endpoint,
            _ref$propertyPath = _ref.propertyPath,
            propertyPath = _ref$propertyPath === void 0 ? globalExchangeRatesApi.propertyPath || 'rates.{{to}}' : _ref$propertyPath,
            _ref$headers = _ref.headers,
            headers = _ref$headers === void 0 ? globalExchangeRatesApi.headers : _ref$headers,
            _ref$roundingMode = _ref.roundingMode,
            roundingMode = _ref$roundingMode === void 0 ? globalRoundingMode : _ref$roundingMode;

        var options = Object.assign({}, {
          endpoint: endpoint,
          propertyPath: propertyPath,
          headers: headers,
          roundingMode: roundingMode
        });
        return CurrencyConverter(options).getExchangeRate(this.getCurrency(), currency).then(function (rate) {
          assert(!isUndefined(rate), "No rate was found for the destination currency \"".concat(currency, "\"."), TypeError);
          return create.call(_this2, {
            amount: calculator$1.round(calculator$1.multiply(_this2.getAmount(), parseFloat(rate)), options.roundingMode),
            currency: currency
          });
        });
      },

      /**
       * Checks whether the value represented by this object equals to the other.
       *
       * @param  {Dinero} comparator - The Dinero object to compare to.
       *
       * @example
       * // returns true
       * Dinero({ amount: 500, currency: 'EUR' }).equalsTo(Dinero({ amount: 500, currency: 'EUR' }))
       * @example
       * // returns false
       * Dinero({ amount: 500, currency: 'EUR' }).equalsTo(Dinero({ amount: 800, currency: 'EUR' }))
       * @example
       * // returns false
       * Dinero({ amount: 500, currency: 'USD' }).equalsTo(Dinero({ amount: 500, currency: 'EUR' }))
       * @example
       * // returns false
       * Dinero({ amount: 500, currency: 'USD' }).equalsTo(Dinero({ amount: 800, currency: 'EUR' }))
       * @example
       * // returns true
       * Dinero({ amount: 1000, currency: 'EUR', precision: 2 }).equalsTo(Dinero({ amount: 10000, currency: 'EUR', precision: 3 }))
       * @example
       * // returns false
       * Dinero({ amount: 10000, currency: 'EUR', precision: 2 }).equalsTo(Dinero({ amount: 10000, currency: 'EUR', precision: 3 }))
       *
       * @return {Boolean}
       */
      equalsTo: function equalsTo(comparator) {
        return this.hasSameAmount(comparator) && this.hasSameCurrency(comparator);
      },

      /**
       * Checks whether the value represented by this object is less than the other.
       *
       * @param  {Dinero} comparator - The Dinero object to compare to.
       *
       * @example
       * // returns true
       * Dinero({ amount: 500 }).lessThan(Dinero({ amount: 800 }))
       * @example
       * // returns false
       * Dinero({ amount: 800 }).lessThan(Dinero({ amount: 500 }))
       * @example
       * // returns true
       * Dinero({ amount: 5000, precision: 3 }).lessThan(Dinero({ amount: 800 }))
       * @example
       * // returns false
       * Dinero({ amount: 800 }).lessThan(Dinero({ amount: 5000, precision: 3 }))
       *
       * @throws {TypeError} If `comparator` has a different currency.
       *
       * @return {Boolean}
       */
      lessThan: function lessThan(comparator) {
        assertSameCurrency.call(this, comparator);
        var comparators = Dinero.normalizePrecision([this, comparator]);
        return comparators[0].getAmount() < comparators[1].getAmount();
      },

      /**
       * Checks whether the value represented by this object is less than or equal to the other.
       *
       * @param  {Dinero} comparator - The Dinero object to compare to.
       *
       * @example
       * // returns true
       * Dinero({ amount: 500 }).lessThanOrEqual(Dinero({ amount: 800 }))
       * @example
       * // returns true
       * Dinero({ amount: 500 }).lessThanOrEqual(Dinero({ amount: 500 }))
       * @example
       * // returns false
       * Dinero({ amount: 500 }).lessThanOrEqual(Dinero({ amount: 300 }))
       * @example
       * // returns true
       * Dinero({ amount: 5000, precision: 3 }).lessThanOrEqual(Dinero({ amount: 800 }))
       * @example
       * // returns true
       * Dinero({ amount: 5000, precision: 3 }).lessThanOrEqual(Dinero({ amount: 500 }))
       * @example
       * // returns false
       * Dinero({ amount: 800 }).lessThanOrEqual(Dinero({ amount: 5000, precision: 3 }))
       *
       * @throws {TypeError} If `comparator` has a different currency.
       *
       * @return {Boolean}
       */
      lessThanOrEqual: function lessThanOrEqual(comparator) {
        assertSameCurrency.call(this, comparator);
        var comparators = Dinero.normalizePrecision([this, comparator]);
        return comparators[0].getAmount() <= comparators[1].getAmount();
      },

      /**
       * Checks whether the value represented by this object is greater than the other.
       *
       * @param  {Dinero} comparator - The Dinero object to compare to.
       *
       * @example
       * // returns false
       * Dinero({ amount: 500 }).greaterThan(Dinero({ amount: 800 }))
       * @example
       * // returns true
       * Dinero({ amount: 800 }).greaterThan(Dinero({ amount: 500 }))
       * @example
       * // returns true
       * Dinero({ amount: 800 }).greaterThan(Dinero({ amount: 5000, precision: 3 }))
       * @example
       * // returns false
       * Dinero({ amount: 5000, precision: 3 }).greaterThan(Dinero({ amount: 800 }))
       *
       * @throws {TypeError} If `comparator` has a different currency.
       *
       * @return {Boolean}
       */
      greaterThan: function greaterThan(comparator) {
        assertSameCurrency.call(this, comparator);
        var comparators = Dinero.normalizePrecision([this, comparator]);
        return comparators[0].getAmount() > comparators[1].getAmount();
      },

      /**
       * Checks whether the value represented by this object is greater than or equal to the other.
       *
       * @param  {Dinero} comparator - The Dinero object to compare to.
       *
       * @example
       * // returns true
       * Dinero({ amount: 500 }).greaterThanOrEqual(Dinero({ amount: 300 }))
       * @example
       * // returns true
       * Dinero({ amount: 500 }).greaterThanOrEqual(Dinero({ amount: 500 }))
       * @example
       * // returns false
       * Dinero({ amount: 500 }).greaterThanOrEqual(Dinero({ amount: 800 }))
       * @example
       * // returns true
       * Dinero({ amount: 800 }).greaterThanOrEqual(Dinero({ amount: 5000, precision: 3 }))
       * @example
       * // returns true
       * Dinero({ amount: 500 }).greaterThanOrEqual(Dinero({ amount: 5000, precision: 3 }))
       * @example
       * // returns false
       * Dinero({ amount: 5000, precision: 3 }).greaterThanOrEqual(Dinero({ amount: 800 }))
       *
       * @throws {TypeError} If `comparator` has a different currency.
       *
       * @return {Boolean}
       */
      greaterThanOrEqual: function greaterThanOrEqual(comparator) {
        assertSameCurrency.call(this, comparator);
        var comparators = Dinero.normalizePrecision([this, comparator]);
        return comparators[0].getAmount() >= comparators[1].getAmount();
      },

      /**
       * Checks if the value represented by this object is zero.
       *
       * @example
       * // returns true
       * Dinero({ amount: 0 }).isZero()
       * @example
       * // returns false
       * Dinero({ amount: 100 }).isZero()
       *
       * @return {Boolean}
       */
      isZero: function isZero() {
        return this.getAmount() === 0;
      },

      /**
       * Checks if the value represented by this object is positive.
       *
       * @example
       * // returns false
       * Dinero({ amount: -10 }).isPositive()
       * @example
       * // returns true
       * Dinero({ amount: 10 }).isPositive()
       * @example
       * // returns true
       * Dinero({ amount: 0 }).isPositive()
       *
       * @return {Boolean}
       */
      isPositive: function isPositive() {
        return this.getAmount() >= 0;
      },

      /**
       * Checks if the value represented by this object is negative.
       *
       * @example
       * // returns true
       * Dinero({ amount: -10 }).isNegative()
       * @example
       * // returns false
       * Dinero({ amount: 10 }).isNegative()
       * @example
       * // returns false
       * Dinero({ amount: 0 }).isNegative()
       *
       * @return {Boolean}
       */
      isNegative: function isNegative() {
        return this.getAmount() < 0;
      },

      /**
       * Checks if this has minor currency units.
       * Deprecates {@link module:Dinero~hasCents hasCents}.
       *
       * @example
       * // returns false
       * Dinero({ amount: 1100 }).hasSubUnits()
       * @example
       * // returns true
       * Dinero({ amount: 1150 }).hasSubUnits()
       *
       * @return {Boolean}
       */
      hasSubUnits: function hasSubUnits() {
        return calculator$1.modulo(this.getAmount(), Math.pow(10, precision)) !== 0;
      },

      /**
       * Checks if this has minor currency units.
       *
       * @deprecated since version 1.4.0, will be removed in 2.0.0
       * Use {@link module:Dinero~hasSubUnits hasSubUnits} instead.
       *
       * @example
       * // returns false
       * Dinero({ amount: 1100 }).hasCents()
       * @example
       * // returns true
       * Dinero({ amount: 1150 }).hasCents()
       *
       * @return {Boolean}
       */
      hasCents: function hasCents() {
        return calculator$1.modulo(this.getAmount(), Math.pow(10, precision)) !== 0;
      },

      /**
       * Checks whether the currency represented by this object equals to the other.
       *
       * @param  {Dinero}  comparator - The Dinero object to compare to.
       *
       * @example
       * // returns true
       * Dinero({ amount: 2000, currency: 'EUR' }).hasSameCurrency(Dinero({ amount: 1000, currency: 'EUR' }))
       * @example
       * // returns false
       * Dinero({ amount: 1000, currency: 'EUR' }).hasSameCurrency(Dinero({ amount: 1000, currency: 'USD' }))
       *
       * @return {Boolean}
       */
      hasSameCurrency: function hasSameCurrency(comparator) {
        return this.getCurrency() === comparator.getCurrency();
      },

      /**
       * Checks whether the amount represented by this object equals to the other.
       *
       * @param  {Dinero}  comparator - The Dinero object to compare to.
       *
       * @example
       * // returns true
       * Dinero({ amount: 1000, currency: 'EUR' }).hasSameAmount(Dinero({ amount: 1000 }))
       * @example
       * // returns false
       * Dinero({ amount: 2000, currency: 'EUR' }).hasSameAmount(Dinero({ amount: 1000, currency: 'EUR' }))
       * @example
       * // returns true
       * Dinero({ amount: 1000, currency: 'EUR', precision: 2 }).hasSameAmount(Dinero({ amount: 10000, precision: 3 }))
       * @example
       * // returns false
       * Dinero({ amount: 10000, currency: 'EUR', precision: 2 }).hasSameAmount(Dinero({ amount: 10000, precision: 3 }))
       *
       * @return {Boolean}
       */
      hasSameAmount: function hasSameAmount(comparator) {
        var comparators = Dinero.normalizePrecision([this, comparator]);
        return comparators[0].getAmount() === comparators[1].getAmount();
      },

      /**
       * Returns this object formatted as a string.
       *
       * The format is a mask which defines how the output string will be formatted.
       * It defines whether to display a currency, in what format, how many fraction digits to display and whether to use grouping separators.
       * The output is formatted according to the applying locale.
       *
       * Object                       | Format            | String
       * :--------------------------- | :---------------- | :---
       * `Dinero({ amount: 500050 })` | `'$0,0.00'`       | $5,000.50
       * `Dinero({ amount: 500050 })` | `'$0,0'`          | $5,001
       * `Dinero({ amount: 500050 })` | `'$0'`            | $5001
       * `Dinero({ amount: 500050 })` | `'$0.0'`          | $5000.5
       * `Dinero({ amount: 500050 })` | `'USD0,0.0'`      | USD5,000.5
       * `Dinero({ amount: 500050 })` | `'0,0.0 dollar'`  | 5,000.5 dollars
       *
       * Don't try to substitute the `$` sign or the `USD` code with your target currency, nor adapt the format string to the exact format you want.
       * The format is a mask which defines a pattern and returns a valid, localized currency string.
       * If you want to display the object in a custom way, either use {@link module:Dinero~getAmount getAmount}, {@link module:Dinero~toUnit toUnit} or {@link module:Dinero~toRoundedUnit toRoundedUnit} and manipulate the output string as you wish.
       *
       * {@link module:Dinero~toFormat toFormat} wraps around `Number.prototype.toLocaleString`. For that reason, **format will vary depending on how it's implemented in the end user's environment**.
       *
       * You can also use `toLocaleString` directly:
       * `Dinero().toRoundedUnit(digits, roundingMode).toLocaleString(locale, options)`.
       *
       * By default, amounts are rounded using the **half away from zero** rule ([commercial rounding](https://en.wikipedia.org/wiki/Rounding#Round_half_away_from_zero)).
       * You can also specify a different `roundingMode` to better fit your needs.
       *
       * @param  {String} [format='$0,0.00'] - The format mask to format to.
       * @param  {String} [roundingMode='HALF_AWAY_FROM_ZERO'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'`, `'HALF_AWAY_FROM_ZERO'` or `'DOWN'`.
       *
       * @example
       * // returns $2,000
       * Dinero({ amount: 200000 }).toFormat('$0,0')
       * @example
       * // returns €50.5
       * Dinero({ amount: 5050, currency: 'EUR' }).toFormat('$0,0.0')
       * @example
       * // returns 100 euros
       * Dinero({ amount: 10000, currency: 'EUR' }).setLocale('fr-FR').toFormat('0,0 dollar')
       * @example
       * // returns 2000
       * Dinero({ amount: 200000, currency: 'EUR' }).toFormat()
       * @example
       * // returns $10
       * Dinero({ amount: 1050 }).toFormat('$0', 'HALF_EVEN')
       *
       * @return {String}
       */
      toFormat: function toFormat() {
        var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : globalFormat;
        var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalFormatRoundingMode;
        var formatter = Format(format);
        return this.toRoundedUnit(formatter.getMinimumFractionDigits(), roundingMode).toLocaleString(this.getLocale(), {
          currencyDisplay: formatter.getCurrencyDisplay(),
          useGrouping: formatter.getUseGrouping(),
          minimumFractionDigits: formatter.getMinimumFractionDigits(),
          style: formatter.getStyle(),
          currency: this.getCurrency()
        });
      },

      /**
       * Returns the amount represented by this object in units.
       *
       * @example
       * // returns 10.5
       * Dinero({ amount: 1050 }).toUnit()
       * @example
       * // returns 10.545
       * Dinero({ amount: 10545, precision: 3 }).toUnit()
       *
       * @return {Number}
       */
      toUnit: function toUnit() {
        return calculator$1.divide(this.getAmount(), Math.pow(10, precision));
      },

      /**
       * Returns the amount represented by this object in rounded units.
       *
       * By default, the method uses the **half away from zero** rule ([commercial rounding](https://en.wikipedia.org/wiki/Rounding#Round_half_away_from_zero)).
       * You can also specify a different `roundingMode` to better fit your needs.
       *
       * @example
       * // returns 10.6
       * Dinero({ amount: 1055 }).toRoundedUnit(1)
       * @example
       * // returns 10
       * Dinero({ amount: 1050 }).toRoundedUnit(0, 'HALF_EVEN')
       *
       * @param  {Number} digits - The number of fraction digits to round to.
       * @param  {String} [roundingMode='HALF_AWAY_FROM_ZERO'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'`, `'HALF_AWAY_FROM_ZERO'` or `'DOWN'`.
       *
       * @return {Number}
       */
      toRoundedUnit: function toRoundedUnit(digits) {
        var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalFormatRoundingMode;
        var factor = Math.pow(10, digits);
        return calculator$1.divide(calculator$1.round(calculator$1.multiply(this.toUnit(), factor), roundingMode), factor);
      },

      /**
       * Returns the object's data as an object literal.
       *
       * @example
       * // returns { amount: 500, currency: 'EUR', precision: 2 }
       * Dinero({ amount: 500, currency: 'EUR', precision: 2 }).toObject()
       *
       * @return {Object}
       */
      toObject: function toObject() {
        return {
          amount: amount,
          currency: currency,
          precision: precision
        };
      },

      /**
       * Returns the object's data as an object literal.
       *
       * Alias of {@link module:Dinero~toObject toObject}.
       * It is defined so that calling `JSON.stringify` on a Dinero object will automatically extract the relevant data.
       *
       * @example
       * // returns '{"amount":500,"currency":"EUR","precision":2}'
       * JSON.stringify(Dinero({ amount: 500, currency: 'EUR', precision: 2 }))
       *
       * @return {Object}
       */
      toJSON: function toJSON() {
        return this.toObject();
      }
    };
  };

  var dinero = Object.assign(Dinero, Defaults, Globals, Static);

  return dinero;

})));
