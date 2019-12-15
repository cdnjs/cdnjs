(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
	(factory((global.ReactTable = {}),global.React));
}(this, (function (exports,React) { 'use strict';

var React__default = 'default' in React ? React['default'] : React;

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (undefined !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

var invariant_1 = invariant;

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction_1;

if (undefined !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var warning_1 = warning;

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

if (undefined !== 'production') {
  var invariant$2 = invariant_1;
  var warning$1 = warning_1;
  var ReactPropTypesSecret$2 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (undefined !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant$2(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$2);
        } catch (ex) {
          error = ex;
        }
        warning$1(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning$1(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

var checkPropTypes_1 = checkPropTypes;

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (undefined !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant_1(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (undefined !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning_1(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction_1.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      undefined !== 'production' ? warning_1(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction_1.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      undefined !== 'production' ? warning_1(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction_1.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning_1(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction_1.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = objectAssign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    invariant_1(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (undefined !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};



















var defineProperty = function (obj, key, value) {
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
};

var _extends = Object.assign || function (target) {
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













var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};







var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function getBy(obj, path, def) {
  if (!path) {
    return obj;
  }
  var pathObj = makePathArray(path);
  var val = void 0;
  try {
    val = pathObj.reduce(function (cursor, pathPart) {
      return cursor[pathPart];
    }, obj);
  } catch (e) {
    // continue regardless of error
  }
  return typeof val !== "undefined" ? val : def;
}

function defaultOrderByFn(arr, funcs, dirs) {
  return [].concat(toConsumableArray(arr)).sort(function (rowA, rowB) {
    for (var i = 0; i < funcs.length; i += 1) {
      var sortFn = funcs[i];
      var desc = dirs[i] === false || dirs[i] === "desc";
      var sortInt = sortFn(rowA, rowB);
      if (sortInt !== 0) {
        return desc ? -sortInt : sortInt;
      }
    }
    return dirs[0] ? rowA.index - rowB.index : rowB.index - rowA.index;
  });
}

function defaultSortByFn(a, b, desc) {
  // force null and undefined to the bottom
  a = a === null || a === undefined ? "" : a;
  b = b === null || b === undefined ? "" : b;
  // force any string values to lowercase
  a = typeof a === "string" ? a.toLowerCase() : a;
  b = typeof b === "string" ? b.toLowerCase() : b;
  // Return either 1 or -1 to indicate a sort priority
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  // returning 0, undefined or any falsey value will defer to the next
  // sorting mechanism or eventually the columns index via the orderByFn
  return 0;
}

function getFirstDefined() {
  for (var i = 0; i < arguments.length; i += 1) {
    if (typeof (arguments.length <= i ? undefined : arguments[i]) !== "undefined") {
      return arguments.length <= i ? undefined : arguments[i];
    }
  }
}

function defaultGroupByFn(rows, grouper) {
  return rows.reduce(function (prev, row, i) {
    var resKey = typeof grouper === "function" ? grouper(row.values, i) : row.values[grouper];
    prev[resKey] = Array.isArray(prev[resKey]) ? prev[resKey] : [];
    prev[resKey].push(row);
    return prev;
  }, {});
}

function defaultFilterFn(row, id, value, column) {
  return row.values[id] !== undefined ? String(row.values[id]).toLowerCase().includes(String(value).toLowerCase()) : true;
}

function setBy() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var path = arguments[1];
  var value = arguments[2];

  var recurse = function recurse(obj) {
    var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var key = path[depth];
    var target = _typeof(obj[key]) !== "object" ? {} : obj[key];
    var subValue = depth === path.length - 1 ? value : recurse(target, depth + 1);
    return _extends({}, obj, defineProperty({}, key, subValue));
  };

  return recurse(obj);
}



function flexRender(Comp, props) {
  if (typeof Comp === "function") {
    return Object.getPrototypeOf(Comp).isReactComponent ? React__default.createElement(Comp, props) : Comp(props);
  }
  return Comp;
}

var mergeProps = function mergeProps() {
  for (var _len = arguments.length, groups = Array(_len), _key = 0; _key < _len; _key++) {
    groups[_key] = arguments[_key];
  }

  var props = {};
  groups.forEach(function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref$style = _ref.style,
        style = _ref$style === undefined ? {} : _ref$style,
        className = _ref.className,
        rest = objectWithoutProperties(_ref, ["style", "className"]);

    props = _extends({}, props, rest, {
      style: _extends({}, props.style || {}, style),
      className: [props.className, className].filter(Boolean).join(" ")
    });
  });
  return props;
};

var applyHooks = function applyHooks(hooks, initial) {
  for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  return hooks.reduce(function (prev, next) {
    return next.apply(undefined, [prev].concat(args));
  }, initial);
};

var applyPropHooks = function applyPropHooks(hooks) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return hooks.reduce(function (prev, next) {
    return mergeProps(prev, next.apply(undefined, args));
  }, {});
};



function sum(arr) {
  return arr.reduce(function (prev, curr) {
    return prev + curr;
  }, 0);
}

function makePathArray(obj) {
  return flattenDeep(obj).join(".").replace(/\[/g, ".").replace(/\]/g, "").split(".");
}

function flattenDeep(arr) {
  var newArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!Array.isArray(arr)) {
    newArr.push(arr);
  } else {
    for (var i = 0; i < arr.length; i += 1) {
      flattenDeep(arr[i], newArr);
    }
  }
  return newArr;
}

var defaultState = {};

var defaultReducer = function defaultReducer(old, newState, type) {
  return newState;
};

var useTableState = function useTableState() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var overrides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$reducer = _ref.reducer,
      reducer = _ref$reducer === undefined ? defaultReducer : _ref$reducer,
      _ref$useState = _ref.useState,
      userUseState = _ref$useState === undefined ? React.useState : _ref$useState;

  var _userUseState = userUseState(_extends({}, defaultState, initialState)),
      _userUseState2 = slicedToArray(_userUseState, 2),
      state = _userUseState2[0],
      setState = _userUseState2[1];

  var overriddenState = React.useMemo(function () {
    var newState = _extends({}, state);
    Object.keys(overrides).forEach(function (key) {
      newState[key] = overrides[key];
    });
    return newState;
  }, [state].concat(toConsumableArray(Object.values(overrides))));

  var reducedSetState = function reducedSetState(updater, type) {
    return setState(function (old) {
      var newState = updater(old);
      return reducer(old, newState, type);
    });
  };

  return [overriddenState, reducedSetState];
};

//
var renderErr = 'You must specify a render "type". This could be "Header", "Filter", or any other custom renderers you have set on your column.';

var propTypes$1 = {
  // General
  data: propTypes.any,
  columns: propTypes.arrayOf(propTypes.shape({
    aggregate: propTypes.func,
    filterFn: propTypes.func,
    filterAll: propTypes.bool,
    sortByFn: propTypes.func,
    resolvedDefaultSortDesc: propTypes.bool,
    canSortBy: propTypes.bool,
    canGroupBy: propTypes.bool,
    Cell: propTypes.any,
    Header: propTypes.any,
    Filter: propTypes.any
  })),

  filterFn: propTypes.func,
  sortByFn: propTypes.func,
  orderByFn: propTypes.func,
  groupByFn: propTypes.func,

  manualGrouping: propTypes.bool,
  manualFilters: propTypes.bool,
  manualSorting: propTypes.bool,

  defaultSortDesc: propTypes.bool,
  disableMultiSort: propTypes.bool,
  subRowsKey: propTypes.string,
  expandedKey: propTypes.string,
  userAggregations: propTypes.object,

  debug: propTypes.bool
};

var useTable = function useTable(props) {
  for (var _len = arguments.length, plugins = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    plugins[_key - 1] = arguments[_key];
  }

  // Validate props
  propTypes.checkPropTypes(propTypes$1, props, 'property', 'useTable');

  // Destructure props
  var _props$data = props.data,
      data = _props$data === undefined ? [] : _props$data,
      userState = props.state,
      debug = props.debug;

  // Always provide a default state

  var defaultState$$1 = useTableState();

  // But use the users state if provided
  var state = userState || defaultState$$1;

  // These are hooks that plugins can use right before render
  var hooks = {
    beforeRender: [],
    columns: [],
    headers: [],
    headerGroups: [],
    rows: [],
    row: [],
    renderableRows: [],
    getTableProps: [],
    getRowProps: [],
    getHeaderRowProps: [],
    getHeaderProps: [],
    getCellProps: []

    // The initial api
  };var api = _extends({}, props, {
    data: data,
    state: state,
    hooks: hooks
  });

  if (debug) console.time('hooks');
  // Loop through plugins to build the api out
  api = plugins.filter(Boolean).reduce(function (prev, next) {
    return next(prev);
  }, api);
  if (debug) console.timeEnd('hooks');

  // Run the beforeRender hook
  if (debug) console.time('hooks.beforeRender');
  applyHooks(api.hooks.beforeRender, undefined, api);
  if (debug) console.timeEnd('hooks.beforeRender');

  if (debug) console.time('hooks.columns');
  api.columns = applyHooks(api.hooks.columns, api.columns, api);
  if (debug) console.timeEnd('hooks.columns');

  if (debug) console.time('hooks.headers');
  api.headers = applyHooks(api.hooks.headers, api.headers, api);
  if (debug) console.timeEnd('hooks.headers');
  [].concat(toConsumableArray(api.columns), toConsumableArray(api.headers)).forEach(function (column) {
    // Give columns/headers rendering power
    column.render = function (type) {
      var userProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!type) {
        throw new Error(renderErr);
      }
      return flexRender(column[type], _extends({}, api, column, userProps));
    };

    // Give columns/headers getHeaderProps
    column.getHeaderProps = function (props) {
      return mergeProps({
        key: ['header', column.id].join('_')
      }, applyPropHooks(api.hooks.getHeaderProps, column, api), props);
    };
  });

  if (debug) console.time('hooks.headerGroups');
  api.headerGroups = applyHooks(api.hooks.headerGroups, api.headerGroups, api).filter(function (headerGroup, i) {
    // Filter out any headers and headerGroups that don't have visible columns
    headerGroup.headers = headerGroup.headers.filter(function (header) {
      var recurse = function recurse(columns) {
        return columns.filter(function (column) {
          if (column.columns) {
            return recurse(column.columns);
          }
          return column.visible;
        }).length;
      };
      if (header.columns) {
        return recurse(header.columns);
      }
      return header.visible;
    });

    // Give headerGroups getRowProps
    if (headerGroup.headers.length) {
      headerGroup.getRowProps = function () {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return mergeProps({
          key: ['header' + i].join('_')
        }, applyPropHooks(api.hooks.getHeaderRowProps, headerGroup, api), props);
      };
      return true;
    }

    return false;
  });
  if (debug) console.timeEnd('hooks.headerGroups');

  // Run the rows (this could be a dangerous hook with a ton of data)
  if (debug) console.time('hooks.rows');
  api.rows = applyHooks(api.hooks.rows, api.rows, api);
  if (debug) console.timeEnd('hooks.rows');

  // This function is absolutely necessary and MUST be called on
  // any rows the user wishes to be displayed.
  api.prepareRow = function (row) {
    var index = row.index;

    row.getRowProps = function (props) {
      return mergeProps({ key: ['row', index].join('_') }, applyHooks(api.hooks.getRowProps, row, api), props);
    };

    row.cells = row.cells.filter(function (cell) {
      return cell.column.visible;
    });

    row.cells.forEach(function (cell) {
      if (!cell) {
        return;
      }

      var column = cell.column;


      cell.getCellProps = function (props) {
        var columnPathStr = [index, column.id].join('_');
        return mergeProps({
          key: ['cell', columnPathStr].join('_')
        }, applyPropHooks(api.hooks.getCellProps, cell, api), props);
      };

      cell.render = function (type) {
        var userProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (!type) {
          throw new Error('You must specify a render "type". This could be "Cell", "Header", "Filter", "Aggregated" or any other custom renderers you have set on your column.');
        }
        return flexRender(column[type], _extends({}, api, cell, userProps));
      };
    });
  };

  api.getTableProps = function (userProps) {
    return mergeProps(applyPropHooks(api.hooks.getTableProps, api), userProps);
  };

  api.getRowProps = function (userProps) {
    return mergeProps(applyPropHooks(api.hooks.getRowProps, api), userProps);
  };

  return api;
};

var useColumns = function useColumns(props) {
  var debug = props.debug,
      userColumns = props.columns,
      _props$state = slicedToArray(props.state, 1),
      groupBy = _props$state[0].groupBy;

  var _useMemo = React.useMemo(function () {
    if (debug) console.info("getColumns");

    // Decorate All the columns
    var columnTree = decorateColumnTree(userColumns);

    // Get the flat list of all columns
    var columns = flattenBy(columnTree, "columns");

    columns = [].concat(toConsumableArray(groupBy.map(function (g) {
      return columns.find(function (col) {
        return col.id === g;
      });
    })), toConsumableArray(columns.filter(function (col) {
      return !groupBy.includes(col.id);
    })));

    // Get headerGroups
    var headerGroups = makeHeaderGroups(columns, findMaxDepth(columnTree));
    var headers = flattenBy(headerGroups, "headers");

    return {
      columns: columns,
      headerGroups: headerGroups,
      headers: headers
    };
  }, [groupBy, userColumns]),
      columns = _useMemo.columns,
      headerGroups = _useMemo.headerGroups,
      headers = _useMemo.headers;

  return _extends({}, props, {
    columns: columns,
    headerGroups: headerGroups,
    headers: headers
  });

  // Find the depth of the columns
  function findMaxDepth(columns) {
    var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    return columns.reduce(function (prev, curr) {
      if (curr.columns) {
        return Math.max(prev, findMaxDepth(curr.columns, depth + 1));
      }
      return depth;
    }, 0);
  }

  function decorateColumn(column, parent) {
    // First check for string accessor
    var _column = column,
        id = _column.id,
        accessor = _column.accessor,
        Header = _column.Header;


    if (typeof accessor === "string") {
      id = id || accessor;
      var accessorString = accessor;
      accessor = function accessor(row) {
        return getBy(row, accessorString);
      };
    }

    if (!id && typeof Header === "string") {
      id = Header;
    }

    if (!id) {
      // Accessor, but no column id? This is bad.
      console.error(column);
      throw new Error("A column id is required!");
    }

    column = _extends({
      Header: "",
      Cell: function Cell(cell) {
        return cell.value;
      },
      show: true
    }, column, {
      id: id,
      accessor: accessor,
      parent: parent
    });

    return column;
  }

  // Build the visible columns, headers and flat column list
  function decorateColumnTree(columns, parent) {
    var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    return columns.map(function (column) {
      column = decorateColumn(column, parent);
      if (column.columns) {
        column.columns = decorateColumnTree(column.columns, column, depth + 1);
      }
      return column;
    });
  }

  function flattenBy(columns, childKey) {
    var flatColumns = [];

    var recurse = function recurse(columns) {
      columns.forEach(function (d) {
        if (!d[childKey]) {
          flatColumns.push(d);
        } else {
          recurse(d[childKey]);
        }
      });
    };

    recurse(columns);

    return flatColumns;
  }

  // Build the header groups from the bottom up
  function makeHeaderGroups(columns, maxDepth) {
    var headerGroups = [];

    var removeChildColumns = function removeChildColumns(column) {
      delete column.columns;
      if (column.parent) {
        removeChildColumns(column.parent);
      }
    };
    columns.forEach(removeChildColumns);

    var buildGroup = function buildGroup(columns) {
      var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var headerGroup = {
        headers: []
      };

      var parentColumns = [];

      var hasParents = columns.some(function (col) {
        return col.parent;
      });

      columns.forEach(function (column) {
        var isFirst = !parentColumns.length;
        var latestParentColumn = [].concat(parentColumns).reverse()[0];

        // If the column has a parent, add it if necessary
        if (column.parent) {
          if (isFirst || latestParentColumn.originalID !== column.parent.id) {
            parentColumns.push(_extends({}, column.parent, {
              originalID: column.parent.id,
              id: [column.parent.id, parentColumns.length].join("_")
            }));
          }
        } else if (hasParents) {
          // If other columns have parents, add a place holder if necessary
          var placeholderColumn = decorateColumn({
            originalID: [column.id, "placeholder", maxDepth - depth].join("_"),
            id: [column.id, "placeholder", maxDepth - depth, parentColumns.length].join("_")
          });
          if (isFirst || latestParentColumn.originalID !== placeholderColumn.originalID) {
            parentColumns.push(placeholderColumn);
          }
        }

        // Establish the new columns[] relationship on the parent
        if (column.parent || hasParents) {
          latestParentColumn = [].concat(parentColumns).reverse()[0];
          latestParentColumn.columns = latestParentColumn.columns || [];
          if (!latestParentColumn.columns.includes(column)) {
            latestParentColumn.columns.push(column);
          }
        }

        headerGroup.headers.push(column);
      });

      headerGroups.push(headerGroup);

      if (parentColumns.length) {
        buildGroup(parentColumns);
      }
    };

    buildGroup(columns);

    return headerGroups.reverse();
  }
};

var useRows = function useRows(props) {
  var debug = props.debug,
      columns = props.columns,
      _props$subRowsKey = props.subRowsKey,
      subRowsKey = _props$subRowsKey === undefined ? "subRows" : _props$subRowsKey,
      data = props.data;


  var accessedRows = React.useMemo(function () {
    if (debug) console.info("getAccessedRows");

    // Access the row's data
    var accessRow = function accessRow(originalRow, i) {
      var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      // Keep the original reference around
      var original = originalRow;

      // Process any subRows
      var subRows = originalRow[subRowsKey] ? originalRow[subRowsKey].map(function (d, i) {
        return accessRow(d, i, depth + 1);
      }) : undefined;

      var row = {
        original: original,
        index: i,
        subRows: subRows,
        depth: depth
      };

      // Create the cells and values
      row.values = {};
      columns.forEach(function (column) {
        row.values[column.id] = column.accessor ? column.accessor(originalRow, i, { subRows: subRows, depth: depth, data: data }) : undefined;
      });

      return row;
    };

    // Use the resolved data
    return data.map(function (d, i) {
      return accessRow(d, i);
    });
  }, [data, columns]);

  return _extends({}, props, {
    rows: accessedRows
  });
};

var actions = {};

var addActions = function addActions(acts) {
  Object.keys(acts).forEach(function (key) {
    actions[key] = acts[key];
  });
};

defaultState.expanded = {};

addActions({
  toggleExpanded: "__toggleExpanded__",
  useExpanded: "__useExpanded__"
});

var useExpanded = function useExpanded(props) {
  var debug = props.debug,
      columns = props.columns,
      rows = props.rows,
      _props$expandedKey = props.expandedKey,
      expandedKey = _props$expandedKey === undefined ? "expanded" : _props$expandedKey,
      hooks = props.hooks,
      _props$state = slicedToArray(props.state, 2),
      expanded = _props$state[0].expanded,
      setState = _props$state[1];

  var toggleExpandedByPath = function toggleExpandedByPath(path, set) {
    return setState(function (old) {
      var expanded = old.expanded;

      var existing = getBy(expanded, path);
      set = getFirstDefined(set, !existing);
      return _extends({}, old, {
        expanded: setBy(expanded, path, set)
      });
    }, actions.toggleExpanded);
  };

  hooks.row.push(function (row) {
    var path = row.path;

    row.toggleExpanded = function (set) {
      return toggleExpandedByPath(path, set);
    };
  });

  var expandedRows = React.useMemo(function () {
    if (debug) console.info("getExpandedRows");

    var expandedRows = [];

    // Here we do some mutation, but it's the last stage in the
    // immutable process so this is safe
    var handleRow = function handleRow(row, index) {
      var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var parentPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

      // Compute some final state for the row
      var path = [].concat(toConsumableArray(parentPath), [index]);

      row.path = path;
      row.depth = depth;

      row.isExpanded = row.original && row.original[expandedKey] || getBy(expanded, path);

      row.cells = columns.map(function (column) {
        var cell = {
          column: column,
          row: row,
          state: null,
          value: row.values[column.id]
        };

        return cell;
      });

      expandedRows.push(row);

      if (row.isExpanded && row.subRows && row.subRows.length) {
        row.subRows.forEach(function (row, i) {
          return handleRow(row, i, depth + 1, path);
        });
      }
    };

    rows.forEach(function (row, i) {
      return handleRow(row, i);
    });

    return expandedRows;
  }, [rows, expanded, columns]);

  var expandedDepth = findExpandedDepth(expanded);

  return _extends({}, props, {
    toggleExpandedByPath: toggleExpandedByPath,
    expandedDepth: expandedDepth,
    rows: expandedRows
  });
};

function findExpandedDepth(obj) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  return Object.values(obj).reduce(function (prev, curr) {
    if ((typeof curr === "undefined" ? "undefined" : _typeof(curr)) === "object") {
      return Math.max(prev, findExpandedDepth(curr, depth + 1));
    }
    return depth;
  }, 0);
}

defaultState.filters = {};
addActions({
  setFilter: "__setFilter__",
  setAllFilters: "__setAllFilters__"
});

var useFilters = function useFilters(props) {
  var debug = props.debug,
      rows = props.rows,
      columns = props.columns,
      _props$filterFn = props.filterFn,
      filterFn = _props$filterFn === undefined ? defaultFilterFn : _props$filterFn,
      manualFilters = props.manualFilters,
      disableFilters = props.disableFilters,
      hooks = props.hooks,
      _props$state = slicedToArray(props.state, 2),
      filters = _props$state[0].filters,
      setState = _props$state[1];

  columns.forEach(function (column) {
    var id = column.id,
        accessor = column.accessor,
        canFilter = column.canFilter;

    column.canFilter = accessor ? getFirstDefined(canFilter, disableFilters === true ? false : undefined, true) : false;
    // Was going to add this to the filter hook
    column.filterValue = filters[id];
  });

  var setFilter = function setFilter(id, val) {
    return setState(function (old) {
      if (typeof val === "undefined") {
        var prev = filters[id],
            rest = objectWithoutProperties(filters, [id]);

        return _extends({}, old, {
          filters: _extends({}, rest)
        });
      }

      return _extends({}, old, {
        filters: _extends({}, filters, defineProperty({}, id, val))
      });
    }, actions.setFilter);
  };

  var setAllFilters = function setAllFilters(filters) {
    return setState(function (old) {
      return _extends({}, old, {
        filters: filters
      });
    }, actions.setAllFilters);
  };

  hooks.columns.push(function (columns) {
    columns.forEach(function (column) {
      if (column.canFilter) {
        column.setFilter = function (val) {
          return setFilter(column.id, val);
        };
      }
    });
    return columns;
  });

  var filteredRows = React.useMemo(function () {
    if (manualFilters || !Object.keys(filters).length) {
      return rows;
    }

    if (debug) console.info("getFilteredRows");

    // Filters top level and nested rows
    var filterRows = function filterRows(rows) {
      var filteredRows = rows;

      filteredRows = Object.entries(filters).reduce(function (filteredSoFar, _ref) {
        var _ref2 = slicedToArray(_ref, 2),
            columnID = _ref2[0],
            filterValue = _ref2[1];

        // Find the filters column
        var column = columns.find(function (d) {
          return d.id === columnID;
        });

        // Don't filter hidden columns or columns that have had their filters disabled
        if (!column || column.filterable === false) {
          return filteredSoFar;
        }

        var filterMethod = column.filterMethod || filterFn;

        // If 'filterAll' is set to true, pass the entire dataset to the filter method
        if (column.filterAll) {
          return filterMethod(filteredSoFar, columnID, filterValue, column);
        }
        return filteredSoFar.filter(function (row) {
          return filterMethod(row, columnID, filterValue, column);
        });
      }, rows);

      // Apply the filter to any subRows
      filteredRows = filteredRows.map(function (row) {
        if (!row.subRows) {
          return row;
        }
        return _extends({}, row, {
          subRows: filterRows(row.subRows)
        });
      });

      // then filter any rows without subcolumns because it would be strange to show
      filteredRows = filteredRows.filter(function (row) {
        if (!row.subRows) {
          return true;
        }
        return row.subRows.length > 0;
      });

      return filteredRows;
    };

    return filterRows(rows);
  }, [rows, filters, manualFilters]);

  return _extends({}, props, {
    setFilter: setFilter,
    setAllFilters: setAllFilters,
    rows: filteredRows
  });
};

function sum$1(values, rows) {
  return values.reduce(function (sum, next) {
    return sum + next;
  }, 0);
}

function average(values, rows) {
  return Math.round(sum$1(values, rows) / values.length * 100) / 100;
}

var aggregations = Object.freeze({
	sum: sum$1,
	average: average
});

defaultState.groupBy = [];

addActions({
  toggleGroupBy: "__toggleGroupBy__"
});

var useGroupBy = function useGroupBy(api) {
  var debug = api.debug,
      rows = api.rows,
      columns = api.columns,
      _api$groupByFn = api.groupByFn,
      groupByFn = _api$groupByFn === undefined ? defaultGroupByFn : _api$groupByFn,
      manualGroupBy = api.manualGroupBy,
      disableGrouping = api.disableGrouping,
      _api$aggregations = api.aggregations,
      userAggregations = _api$aggregations === undefined ? {} : _api$aggregations,
      hooks = api.hooks,
      _api$state = slicedToArray(api.state, 2),
      groupBy = _api$state[0].groupBy,
      setState = _api$state[1];

  columns.forEach(function (column) {
    var id = column.id,
        accessor = column.accessor,
        canGroupBy = column.canGroupBy;

    column.grouped = groupBy.includes(id);

    column.canGroupBy = accessor ? getFirstDefined(canGroupBy, disableGrouping === true ? false : undefined, true) : false;

    column.Aggregated = column.Aggregated || column.Cell;
  });

  var toggleGroupBy = function toggleGroupBy(id, toggle) {
    return setState(function (old) {
      var resolvedToggle = typeof set !== "undefined" ? toggle : !groupBy.includes(id);
      if (resolvedToggle) {
        return _extends({}, old, {
          groupBy: [].concat(toConsumableArray(groupBy), [id])
        });
      }
      return _extends({}, old, {
        groupBy: groupBy.filter(function (d) {
          return d !== id;
        })
      });
    }, actions.toggleGroupBy);
  };

  hooks.columns.push(function (columns) {
    columns.forEach(function (column) {
      if (column.canGroupBy) {
        column.toggleGroupBy = function () {
          return toggleGroupBy(column.id);
        };
      }
    });
    return columns;
  });

  hooks.getGroupByToggleProps = [];

  var addGroupByToggleProps = function addGroupByToggleProps(columns, api) {
    columns.forEach(function (column) {
      var canGroupBy = column.canGroupBy;

      column.getGroupByToggleProps = function (props) {
        return mergeProps({
          onClick: canGroupBy ? function (e) {
            e.persist();
            column.toggleGroupBy();
          } : undefined,
          style: {
            cursor: canGroupBy ? "pointer" : undefined
          },
          title: "Toggle GroupBy"
        }, applyPropHooks(api.hooks.getGroupByToggleProps, column, api), props);
      };
    });
    return columns;
  };

  hooks.columns.push(addGroupByToggleProps);
  hooks.headers.push(addGroupByToggleProps);

  var groupedRows = React.useMemo(function () {
    if (manualGroupBy || !groupBy.length) {
      return rows;
    }
    if (debug) console.info("getGroupedRows");
    // Find the columns that can or are aggregating

    // Uses each column to aggregate rows into a single value
    var aggregateRowsToValues = function aggregateRowsToValues(rows) {
      var values = {};
      columns.forEach(function (column) {
        var columnValues = rows.map(function (d) {
          return d.values[column.id];
        });
        var aggregate = userAggregations[column.aggregate] || aggregations[column.aggregate] || column.aggregate;
        if (typeof aggregate === "function") {
          values[column.id] = aggregate(columnValues, rows);
        } else if (aggregate) {
          throw new Error("Invalid aggregate \"" + aggregate + "\" passed to column with ID: \"" + column.id + "\"");
        } else {
          values[column.id] = columnValues[0];
        }
      });
      return values;
    };

    // Recursively group the data
    var groupRecursively = function groupRecursively(rows, groupBy) {
      var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      // This is the last level, just return the rows
      if (depth >= groupBy.length) {
        return rows;
      }

      // Group the rows together for this level
      var groupedRows = Object.entries(groupByFn(rows, groupBy[depth])).map(function (_ref, index) {
        var _ref2 = slicedToArray(_ref, 2),
            groupByVal = _ref2[0],
            subRows = _ref2[1];

        // Recurse to sub rows before aggregation
        subRows = groupRecursively(subRows, groupBy, depth + 1);

        var values = aggregateRowsToValues(subRows);

        var row = {
          groupByID: groupBy[depth],
          groupByVal: groupByVal,
          values: values,
          subRows: subRows,
          depth: depth,
          index: index
        };
        return row;
      });

      return groupedRows;
    };

    // Assign the new data
    return groupRecursively(rows, groupBy);
  }, [rows, groupBy, columns, manualGroupBy]);

  return _extends({}, api, {
    rows: groupedRows
  });
};

defaultState.sortBy = [];

addActions({
  sortByChange: "__sortByChange__"
});

var useSortBy = function useSortBy(api) {
  var debug = api.debug,
      rows = api.rows,
      columns = api.columns,
      _api$orderByFn = api.orderByFn,
      orderByFn = _api$orderByFn === undefined ? defaultOrderByFn : _api$orderByFn,
      _api$sortByFn = api.sortByFn,
      sortByFn = _api$sortByFn === undefined ? defaultSortByFn : _api$sortByFn,
      manualSorting = api.manualSorting,
      disableSorting = api.disableSorting,
      defaultSortDesc = api.defaultSortDesc,
      hooks = api.hooks,
      _api$state = slicedToArray(api.state, 2),
      sortBy = _api$state[0].sortBy,
      setState = _api$state[1];

  columns.forEach(function (column) {
    var accessor = column.accessor,
        canSortBy = column.canSortBy;

    column.canSortBy = accessor ? getFirstDefined(canSortBy, disableSorting === true ? false : undefined, true) : false;
  });

  // Updates sorting based on a columnID, desc flag and multi flag
  var toggleSortByID = function toggleSortByID(columnID, desc, multi) {
    return setState(function (old) {
      var sortBy = old.sortBy;

      // Find the column for this columnID

      var column = columns.find(function (d) {
        return d.id === columnID;
      });
      var resolvedDefaultSortDesc = getFirstDefined(column.defaultSortDesc, defaultSortDesc);

      // Find any existing sortBy for this column
      var existingSortBy = sortBy.find(function (d) {
        return d.id === columnID;
      });
      var hasDescDefined = typeof desc !== "undefined" && desc !== null;

      var newSortBy = [];

      // What should we do with this filter?
      var action = void 0;

      if (!multi) {
        if (sortBy.length <= 1 && existingSortBy) {
          if (existingSortBy.desc) {
            action = "remove";
          } else {
            action = "toggle";
          }
        } else {
          action = "replace";
        }
      } else {
        if (!existingSortBy) {
          action = "add";
        } else {
          if (hasDescDefined) {
            action = "set";
          } else {
            action = "toggle";
          }
        }
      }

      if (action === "replace") {
        newSortBy = [{
          id: columnID,
          desc: hasDescDefined ? desc : resolvedDefaultSortDesc
        }];
      } else if (action === "add") {
        newSortBy = [].concat(toConsumableArray(sortBy), [{
          id: columnID,
          desc: hasDescDefined ? desc : resolvedDefaultSortDesc
        }]);
      } else if (action === "set") {
        newSortBy = sortBy.map(function (d) {
          if (d.id === columnID) {
            return _extends({}, d, {
              desc: desc
            });
          }
          return d;
        });
      } else if (action === "toggle") {
        newSortBy = sortBy.map(function (d) {
          if (d.id === columnID) {
            return _extends({}, d, {
              desc: !existingSortBy.desc
            });
          }
          return d;
        });
      } else if (action === "remove") {
        newSortBy = [];
      }

      return _extends({}, old, {
        sortBy: newSortBy
      });
    }, actions.sortByChange);
  };

  hooks.columns.push(function (columns) {
    columns.forEach(function (column) {
      if (column.canSortBy) {
        column.toggleSortBy = function (desc, multi) {
          return toggleSortByID(column.id, desc, multi);
        };
      }
    });
    return columns;
  });

  hooks.getSortByToggleProps = [];

  var addSortByToggleProps = function addSortByToggleProps(columns, api) {
    columns.forEach(function (column) {
      var canSortBy = column.canSortBy;

      column.getSortByToggleProps = function (props) {
        return mergeProps({
          onClick: canSortBy ? function (e) {
            e.persist();
            column.toggleSortBy(undefined, !api.disableMultiSort && e.shiftKey);
          } : undefined,
          style: {
            cursor: canSortBy ? "pointer" : undefined
          },
          title: "Toggle SortBy"
        }, applyPropHooks(api.hooks.getSortByToggleProps, column, api), props);
      };
    });
    return columns;
  };

  hooks.columns.push(addSortByToggleProps);
  hooks.headers.push(addSortByToggleProps);

  // Mutate columns to reflect sorting state
  columns.forEach(function (column) {
    var id = column.id;

    column.sorted = sortBy.find(function (d) {
      return d.id === id;
    });
    column.sortedIndex = sortBy.findIndex(function (d) {
      return d.id === id;
    });
    column.sortedDesc = column.sorted ? column.sorted.desc : undefined;
  });

  var sortedRows = React.useMemo(function () {
    if (manualSorting || !sortBy.length) {
      return rows;
    }
    if (debug) console.info("getSortedRows");

    var sortMethodsByColumnID = {};

    columns.filter(function (col) {
      return col.sortMethod;
    }).forEach(function (col) {
      sortMethodsByColumnID[col.id] = col.sortMethod;
    });

    var sortData = function sortData(rows) {
      // Use the orderByFn to compose multiple sortBy's together.
      // This will also perform a stable sorting using the row index
      // if needed.
      var sortedData = orderByFn(rows, sortBy.map(function (sort) {
        // Support custom sorting methods for each column
        var columnSortBy = sortMethodsByColumnID[sort.id];

        // Return the correct sortFn
        return function (a, b) {
          return (columnSortBy ? columnSortBy : sortByFn)(a.values[sort.id], b.values[sort.id], sort.desc);
        };
      }),
      // Map the directions
      sortBy.map(function (d) {
        return !d.desc;
      }));

      // TODO: this should be optimized. Not good to loop again
      sortedData.forEach(function (row) {
        if (!row.subRows) {
          return;
        }
        row.subRows = sortData(row.subRows);
      });

      return sortedData;
    };

    return sortData(rows);
  }, [rows, columns, sortBy, manualSorting]);

  return _extends({}, api, {
    rows: sortedRows
  });
};

defaultState.pageSize = 10;
defaultState.pageIndex = 0;

addActions({
  pageChange: "__pageChange__"
});

var propTypes$2 = {
  defaultPageSize: propTypes.number,
  defaultPageIndex: propTypes.number,
  pageSize: propTypes.number,
  pages: propTypes.number,
  pageIndex: propTypes.number,
  onStateChange: propTypes.func,
  stateReducer: propTypes.func,
  debug: propTypes.bool
};

var usePagination = function usePagination(props) {
  // Validate props
  propTypes.checkPropTypes(propTypes$2, props, "property", "usePagination");

  var parentDebug = props.debug,
      rows = props.rows,
      manualPagination = props.manualPagination,
      _props$debug = props.debug,
      debug = _props$debug === undefined ? parentDebug : _props$debug,
      _props$state = slicedToArray(props.state, 2),
      _props$state$ = _props$state[0],
      pageSize = _props$state$.pageSize,
      pageIndex = _props$state$.pageIndex,
      userPageCount = _props$state$.pageCount,
      filters = _props$state$.filters,
      groupBy = _props$state$.groupBy,
      sortBy = _props$state$.sortBy,
      setState = _props$state[1];

  React.useLayoutEffect(function () {
    setState(function (old) {
      return _extends({}, old, {
        pageIndex: 0
      });
    }, actions.pageChange);
  }, [filters, groupBy, sortBy]);

  var _useMemo = React.useMemo(function () {
    if (manualPagination) {
      return {
        pages: [rows],
        pageCount: userPageCount
      };
    }
    if (debug) console.info("getPages");

    // Create a new pages with the first page ready to go.
    var pages = rows.length ? [] : [[]];

    // Start the pageIndex and currentPage cursors
    var cursor = 0;
    while (cursor < rows.length) {
      var end = cursor + pageSize;
      pages.push(rows.slice(cursor, end));
      cursor = end;
    }

    var pageCount = pages.length;

    return {
      pages: pages,
      pageCount: pageCount,
      pageOptions: pageOptions
    };
  }, [rows, pageSize, userPageCount]),
      pages = _useMemo.pages,
      pageCount = _useMemo.pageCount;

  var pageOptions = [].concat(toConsumableArray(new Array(pageCount))).map(function (d, i) {
    return i;
  });
  var page = manualPagination ? rows : pages[pageIndex] || [];
  var canPreviousPage = pageIndex > 0;
  var canNextPage = pageIndex < pageCount - 1;

  var gotoPage = function gotoPage(pageIndex) {
    if (debug) console.info("gotoPage");
    return setState(function (old) {
      if (pageIndex < 0 || pageIndex > pageCount - 1) {
        return old;
      }
      return _extends({}, old, {
        pageIndex: pageIndex
      });
    }, actions.pageChange);
  };

  var previousPage = function previousPage() {
    return gotoPage(pageIndex - 1);
  };

  var nextPage = function nextPage() {
    return gotoPage(pageIndex + 1);
  };

  var setPageSize = function setPageSize(pageSize) {
    setState(function (old) {
      var topRowIndex = old.pageSize * old.pageIndex;
      var pageIndex = Math.floor(topRowIndex / pageSize);
      return _extends({}, old, {
        pageIndex: pageIndex,
        pageSize: pageSize
      });
    }, actions.setPageSize);
  };

  return _extends({}, props, {
    pages: pages,
    pageOptions: pageOptions,
    page: page,
    canPreviousPage: canPreviousPage,
    canNextPage: canNextPage,
    gotoPage: gotoPage,
    previousPage: previousPage,
    nextPage: nextPage,
    setPageSize: setPageSize
  });
};

var propTypes$3 = {
  defaultFlex: propTypes.number
};



var useFlexLayout = function useFlexLayout(props) {
  // Validate props
  propTypes.checkPropTypes(propTypes$3, props, "property", "useFlexLayout");

  var _props$defaultFlex = props.defaultFlex,
      defaultFlex = _props$defaultFlex === undefined ? 1 : _props$defaultFlex,
      _props$hooks = props.hooks,
      columnsHooks = _props$hooks.columns,
      getRowProps = _props$hooks.getRowProps,
      getHeaderRowProps = _props$hooks.getHeaderRowProps,
      getHeaderProps = _props$hooks.getHeaderProps,
      getCellProps = _props$hooks.getCellProps;


  columnsHooks.push(function (columns, api) {
    var visibleColumns = columns.filter(function (column) {
      column.visible = typeof column.show === "function" ? column.show(api) : !!column.show;
      return column.visible;
    });

    var columnMeasurements = {};

    var sumWidth = 0;
    visibleColumns.forEach(function (column) {
      var _getSizesForColumn = getSizesForColumn(column, defaultFlex, undefined, undefined, api),
          width = _getSizesForColumn.width,
          minWidth = _getSizesForColumn.minWidth;

      if (width) {
        sumWidth += width;
      } else if (minWidth) {
        sumWidth += minWidth;
      } else {
        sumWidth += defaultFlex;
      }
    });

    var rowStyles = {
      style: {
        display: "flex",
        minWidth: sumWidth + "px"
      }
    };

    api.rowStyles = rowStyles;

    getRowProps.push(function () {
      return rowStyles;
    });
    getHeaderRowProps.push(function () {
      return rowStyles;
    });

    getHeaderProps.push(function (column) {
      return {
        style: _extends({
          boxSizing: "border-box"
        }, getStylesForColumn(column, columnMeasurements, defaultFlex, api))
        // [refKey]: el => {
        //   renderedCellInfoRef.current[key] = {
        //     column,
        //     el
        //   };
        // },
      };
    });

    getCellProps.push(function (cell) {
      return {
        style: _extends({
          display: "block",
          boxSizing: "border-box"
        }, getStylesForColumn(cell.column, columnMeasurements, defaultFlex, undefined, api))
        // [refKey]: el => {
        //   renderedCellInfoRef.current[columnPathStr] = {
        //     column,
        //     el
        //   };
        // }
      };
    });

    return columns;
  });

  return props;
};

// Utils

function getStylesForColumn(column, columnMeasurements, defaultFlex, api) {
  var _getSizesForColumn2 = getSizesForColumn(column, columnMeasurements, defaultFlex, api),
      flex = _getSizesForColumn2.flex,
      width = _getSizesForColumn2.width,
      maxWidth = _getSizesForColumn2.maxWidth;

  return {
    flex: flex + " 0 auto",
    width: width + "px",
    maxWidth: maxWidth + "px"
  };
}

function getSizesForColumn(_ref, columnMeasurements, defaultFlex, api) {
  var columns = _ref.columns,
      id = _ref.id,
      width = _ref.width,
      minWidth = _ref.minWidth,
      maxWidth = _ref.maxWidth;

  if (columns) {
    columns = columns.map(function (column) {
      return getSizesForColumn(column, columnMeasurements, defaultFlex, api);
    }).filter(Boolean);

    if (!columns.length) {
      return false;
    }

    var flex = sum(columns.map(function (col) {
      return col.flex;
    }));
    var _width = sum(columns.map(function (col) {
      return col.width;
    }));
    var _maxWidth = sum(columns.map(function (col) {
      return col.maxWidth;
    }));

    return {
      flex: flex,
      width: _width,
      maxWidth: _maxWidth
    };
  }

  return {
    flex: width ? 0 : defaultFlex,
    width: width === "auto" ? columnMeasurements[id] || defaultFlex : getFirstDefined(width, minWidth, defaultFlex),
    maxWidth: maxWidth
  };
}

// const resetRefs = () => {
//   if (debug) console.info("resetRefs");
//   renderedCellInfoRef.current = {};
// };

// const calculateAutoWidths = () => {
//   RAF(() => {
//     const newColumnMeasurements = {};
//     Object.values(renderedCellInfoRef.current).forEach(({ column, el }) => {
//       if (!el) {
//         return;
//       }

//       let measurement = 0;

//       const measureChildren = children => {
//         if (children) {
//           [].slice.call(children).forEach(child => {
//             measurement = Math.max(
//               measurement,
//               Math.ceil(child.offsetWidth) || 0
//             );
//             measureChildren(child.children);
//           });
//         }
//         return measurement;
//       };

//       const parentDims = getElementDimensions(el);
//       measureChildren(el.children);

//       newColumnMeasurements[column.id] = Math.max(
//         newColumnMeasurements[column.id] || 0,
//         measurement + parentDims.paddingLeft + parentDims.paddingRight
//       );
//     });

//     const oldKeys = Object.keys(columnMeasurements);
//     const newKeys = Object.keys(newColumnMeasurements);

//     const needsUpdate =
//       oldKeys.length !== newKeys.length ||
//       oldKeys.some(key => {
//         return columnMeasurements[key] !== newColumnMeasurements[key];
//       });

//     if (needsUpdate) {
//       setState(old => {
//         return {
//           ...old,
//           columnMeasurements: newColumnMeasurements
//         };
//       }, actions.updateAutoWidth);
//     }
//   });
// };

exports.useTable = useTable;
exports.useColumns = useColumns;
exports.useRows = useRows;
exports.useExpanded = useExpanded;
exports.useFilters = useFilters;
exports.useGroupBy = useGroupBy;
exports.useSortBy = useSortBy;
exports.usePagination = usePagination;
exports.useTableState = useTableState;
exports.useFlexLayout = useFlexLayout;
exports.actions = actions;

Object.defineProperty(exports, '__esModule', { value: true });

})));
