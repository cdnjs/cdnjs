(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.VueMask = {}));
}(this, function (exports) { 'use strict';

  function _typeof(obj) {
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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  var placeholderChar = '_';
  var strFunction = 'function';

  var emptyArray = [];
  function convertMaskToPlaceholder() {
    var mask = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emptyArray;
    var placeholderChar$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : placeholderChar;

    if (!isArray(mask)) {
      throw new Error('Text-mask:convertMaskToPlaceholder; The mask property must be an array.');
    }

    if (mask.indexOf(placeholderChar$1) !== -1) {
      throw new Error('Placeholder character must not be used as part of the mask. Please specify a character ' + 'that is not present in your mask as your placeholder character.\n\n' + "The placeholder character that was received is: ".concat(JSON.stringify(placeholderChar$1), "\n\n") + "The mask that was received is: ".concat(JSON.stringify(mask)));
    }

    return mask.map(function (char) {
      return char instanceof RegExp ? placeholderChar$1 : char;
    }).join('');
  }
  function isArray(value) {
    return Array.isArray && Array.isArray(value) || value instanceof Array;
  }
  var strCaretTrap = '[]';
  function processCaretTraps(mask) {
    var indexes = [];
    var indexOfCaretTrap;

    while (indexOfCaretTrap = mask.indexOf(strCaretTrap), indexOfCaretTrap !== -1) {
      indexes.push(indexOfCaretTrap);
      mask.splice(indexOfCaretTrap, 1);
    }

    return {
      maskWithoutCaretTraps: mask,
      indexes: indexes
    };
  }

  var emptyArray$1 = [];
  var emptyString = '';
  function conformToMask() {
    var rawValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emptyString;
    var mask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : emptyArray$1;
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (!isArray(mask)) {
      if (_typeof(mask) === strFunction) {
        mask = mask(rawValue, config);
        mask = processCaretTraps(mask).maskWithoutCaretTraps;
      } else {
        throw new Error('Text-mask:conformToMask; The mask property must be an array.');
      }
    }

    var _config$guide = config.guide,
        guide = _config$guide === void 0 ? true : _config$guide,
        _config$previousConfo = config.previousConformedValue,
        previousConformedValue = _config$previousConfo === void 0 ? emptyString : _config$previousConfo,
        _config$placeholderCh = config.placeholderChar,
        placeholderChar$1 = _config$placeholderCh === void 0 ? placeholderChar : _config$placeholderCh,
        _config$placeholder = config.placeholder,
        placeholder = _config$placeholder === void 0 ? convertMaskToPlaceholder(mask, placeholderChar$1) : _config$placeholder,
        currentCaretPosition = config.currentCaretPosition,
        keepCharPositions = config.keepCharPositions;
    var suppressGuide = guide === false && previousConformedValue !== undefined;
    var rawValueLength = rawValue.length;
    var previousConformedValueLength = previousConformedValue.length;
    var placeholderLength = placeholder.length;
    var maskLength = mask.length;
    var editDistance = rawValueLength - previousConformedValueLength;
    var isAddition = editDistance > 0;
    var indexOfFirstChange = currentCaretPosition + (isAddition ? -editDistance : 0);
    var indexOfLastChange = indexOfFirstChange + Math.abs(editDistance);

    if (keepCharPositions === true && !isAddition) {
      var compensatingPlaceholderChars = emptyString;

      for (var i = indexOfFirstChange; i < indexOfLastChange; i++) {
        if (placeholder[i] === placeholderChar$1) {
          compensatingPlaceholderChars += placeholderChar$1;
        }
      }

      rawValue = rawValue.slice(0, indexOfFirstChange) + compensatingPlaceholderChars + rawValue.slice(indexOfFirstChange, rawValueLength);
    }

    var rawValueArr = rawValue.split(emptyString).map(function (char, i) {
      return {
        char: char,
        isNew: i >= indexOfFirstChange && i < indexOfLastChange
      };
    });

    for (var _i = rawValueLength - 1; _i >= 0; _i--) {
      var char = rawValueArr[_i].char;

      if (char !== placeholderChar$1) {
        var shouldOffset = _i >= indexOfFirstChange && previousConformedValueLength === maskLength;

        if (char === placeholder[shouldOffset ? _i - editDistance : _i]) {
          rawValueArr.splice(_i, 1);
        }
      }
    }

    var conformedValue = emptyString;
    var someCharsRejected = false;

    placeholderLoop: for (var _i2 = 0; _i2 < placeholderLength; _i2++) {
      var charInPlaceholder = placeholder[_i2];

      if (charInPlaceholder === placeholderChar$1) {
        if (rawValueArr.length > 0) {
          while (rawValueArr.length > 0) {
            var _rawValueArr$shift = rawValueArr.shift(),
                rawValueChar = _rawValueArr$shift.char,
                isNew = _rawValueArr$shift.isNew;

            if (rawValueChar === placeholderChar$1 && suppressGuide !== true) {
              conformedValue += placeholderChar$1;
              continue placeholderLoop;
            } else if (mask[_i2].test(rawValueChar)) {
              if (keepCharPositions !== true || isNew === false || previousConformedValue === emptyString || guide === false || !isAddition) {
                conformedValue += rawValueChar;
              } else {
                var rawValueArrLength = rawValueArr.length;
                var indexOfNextAvailablePlaceholderChar = null;

                for (var _i3 = 0; _i3 < rawValueArrLength; _i3++) {
                  var charData = rawValueArr[_i3];

                  if (charData.char !== placeholderChar$1 && charData.isNew === false) {
                    break;
                  }

                  if (charData.char === placeholderChar$1) {
                    indexOfNextAvailablePlaceholderChar = _i3;
                    break;
                  }
                }

                if (indexOfNextAvailablePlaceholderChar !== null) {
                  conformedValue += rawValueChar;
                  rawValueArr.splice(indexOfNextAvailablePlaceholderChar, 1);
                } else {
                  _i2--;
                }
              }

              continue placeholderLoop;
            } else {
              someCharsRejected = true;
            }
          }
        }

        if (suppressGuide === false) {
          conformedValue += placeholder.substr(_i2, placeholderLength);
        }

        break;
      } else {
        conformedValue += charInPlaceholder;
      }
    }

    if (suppressGuide && isAddition === false) {
      var indexOfLastFilledPlaceholderChar = null;

      for (var _i4 = 0; _i4 < conformedValue.length; _i4++) {
        if (placeholder[_i4] === placeholderChar$1) {
          indexOfLastFilledPlaceholderChar = _i4;
        }
      }

      if (indexOfLastFilledPlaceholderChar !== null) {
        conformedValue = conformedValue.substr(0, indexOfLastFilledPlaceholderChar + 1);
      } else {
        conformedValue = emptyString;
      }
    }

    return {
      conformedValue: conformedValue,
      meta: {
        someCharsRejected: someCharsRejected
      }
    };
  }

  var NEXT_CHAR_OPTIONAL = {
    __nextCharOptional__: true
  };
  var defaultMaskReplacers = {
    '#': /\d/,
    A: /[a-z]/i,
    N: /[a-z0-9]/i,
    '?': NEXT_CHAR_OPTIONAL,
    X: /./
  };

  var stringToRegexp = function stringToRegexp(str) {
    var lastSlash = str.lastIndexOf('/');
    return new RegExp(str.slice(1, lastSlash), str.slice(lastSlash + 1));
  };

  var makeRegexpOptional = function makeRegexpOptional(charRegexp) {
    return stringToRegexp(charRegexp.toString().replace(/.(\/)[gmiyus]{0,6}$/, function (match) {
      return match.replace('/', '?/');
    }));
  };

  var escapeIfNeeded = function escapeIfNeeded(char) {
    return '[\\^$.|?*+()'.indexOf(char) > -1 ? "\\".concat(char) : char;
  };

  var charRegexp = function charRegexp(char) {
    return new RegExp("/[".concat(escapeIfNeeded(char), "]/"));
  };

  var isRegexp = function isRegexp(entity) {
    return entity instanceof RegExp;
  };

  var castToRegexp = function castToRegexp(char) {
    return isRegexp(char) ? char : charRegexp(char);
  };

  function stringMaskToRegExpMask(stringMask) {
    return stringMask.split('').map(function (char, index, array) {
      var maskChar = defaultMaskReplacers[char] || char;
      var previousChar = array[index - 1];
      var previousMaskChar = defaultMaskReplacers[previousChar] || previousChar;

      if (maskChar === NEXT_CHAR_OPTIONAL) {
        return null;
      }

      if (previousMaskChar === NEXT_CHAR_OPTIONAL) {
        return makeRegexpOptional(castToRegexp(maskChar));
      }

      return maskChar;
    }).filter(Boolean);
  }

  var trigger = function trigger(el, type) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
  };
  var queryInputElementInside = function queryInputElementInside(el) {
    return el instanceof HTMLInputElement ? el : el.querySelector('input') || el;
  };

  var inBrowser = typeof window !== 'undefined';
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isEdge = UA && UA.indexOf('edge/') > 0;
  var isAndroid = UA && UA.indexOf('android') > 0;
  var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

  function createOptions() {
    var elementOptions = new Map();
    var defaultOptions = {
      previousValue: '',
      mask: []
    };

    function get(el) {
      return elementOptions.get(el) || _objectSpread2({}, defaultOptions);
    }

    function partiallyUpdate(el, newOptions) {
      elementOptions.set(el, _objectSpread2({}, get(el), {}, newOptions));
    }

    function remove(el) {
      elementOptions.delete(el);
    }

    return {
      partiallyUpdate: partiallyUpdate,
      remove: remove,
      get: get
    };
  }

  var options = createOptions();

  function triggerInputUpdate(el) {
    var fn = trigger.bind(null, el, 'input');

    if (isAndroid && isChrome) {
      setTimeout(fn, 0);
    } else {
      fn();
    }
  }

  function updateValue(el) {
    var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var value = el.value;

    var _options$get = options.get(el),
        previousValue = _options$get.previousValue,
        mask = _options$get.mask;

    var isValueChanged = value !== previousValue;
    var isLengthIncreased = value.length > previousValue.length;
    var isUpdateNeeded = value && isValueChanged && isLengthIncreased;

    if (force || isUpdateNeeded) {
      var _conformToMask = conformToMask(value, mask, {
        guide: false
      }),
          conformedValue = _conformToMask.conformedValue;

      el.value = conformedValue;
      triggerInputUpdate(el);
    }

    options.partiallyUpdate(el, {
      previousValue: value
    });
  }

  function updateMask(el, mask) {
    options.partiallyUpdate(el, {
      mask: stringMaskToRegExpMask(mask)
    });
  }

  var directive = {
    bind: function bind(el, _ref) {
      var value = _ref.value;
      el = queryInputElementInside(el);
      updateMask(el, value);
      updateValue(el);
    },
    componentUpdated: function componentUpdated(el, _ref2) {
      var value = _ref2.value,
          oldValue = _ref2.oldValue;
      el = queryInputElementInside(el);
      var isMaskChanged = value !== oldValue;

      if (isMaskChanged) {
        updateMask(el, value);
      }

      updateValue(el, isMaskChanged);
    },
    unbind: function unbind(el) {
      el = queryInputElementInside(el);
      options.remove(el);
    }
  };

  var plugin = (function (Vue) {
    Vue.directive('mask', directive);
  });

  exports.VueMaskDirective = directive;
  exports.VueMaskPlugin = plugin;
  exports.default = plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
