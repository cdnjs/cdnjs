/**
 * @overview lamb - A lightweight, and docile, JavaScript library to help embracing functional programming.
 * @author Andrea Scartabelli <andrea.scartabelli@gmail.com>
 * @version 0.48.0
 * @module lamb
 * @license MIT
 * @preserve
 */
(function (host) {
    "use strict";

    var lamb = Object.create(null);

    /**
     * The current module version.
     * @memberof module:lamb
     * @private
     * @type String
     */
    lamb._version = "0.48.0";

    // alias used as a placeholder argument for partial application
    var _ = lamb;

    // prototype shortcuts
    var _objectProto = Object.prototype;
    var _stringProto = String.prototype;

    // constants
    var MAX_ARRAY_LENGTH = 4294967295;

    /**
     * Builds a function that returns a constant value.
     * It's actually the simplest form of the K combinator or Kestrel.
     * @example
     * var truth = _.always(true);
     *
     * truth() // => true
     * truth(false) // => true
     * truth(1, 2) // => true
     *
     * // the value being returned is actually the
     * // very same value passed to the function
     * var foo = {bar: "baz"};
     * var alwaysFoo = _.always(foo);
     *
     * alwaysFoo() === foo // => true
     *
     * @memberof module:lamb
     * @category Function
     * @see [SKI combinator calculus]{@link https://en.wikipedia.org/wiki/SKI_combinator_calculus}
     * @param {*} value
     * @returns {Function}
     */
    function always (value) {
        return function () {
            return value;
        };
    }

    /**
     * Returns a function that is the composition of the functions given as parameters.
     * Each function consumes the result of the function that follows.
     * @example
     * var sayHi = function (name) { return "Hi, " + name; };
     * var capitalize = function (s) {
     *     return s[0].toUpperCase() + s.substr(1).toLowerCase();
     * };
     * var fixNameAndSayHi = _.compose(sayHi, capitalize);
     *
     * sayHi("bOb") // => "Hi, bOb"
     * fixNameAndSayHi("bOb") // "Hi, Bob"
     *
     * var users = [{name: "fred"}, {name: "bOb"}];
     * var sayHiToUser = _.compose(fixNameAndSayHi, _.getKey("name"));
     *
     * _.map(users, sayHiToUser) // ["Hi, Fred", "Hi, Bob"]
     *
     * @memberof module:lamb
     * @category Function
     * @see {@link module:lamb.pipe|pipe}
     * @param {...Function} fn
     * @returns {Function}
     */
    function compose () {
        var functions = arguments;

        return function () {
            var args = arguments;
            var len = functions.length;

            while (len--) {
                args = [functions[len].apply(this, args)];
            }

            return args[0];
        };
    }

    /**
     * Creates generic functions out of methods.
     * @author A very little change on a great idea by [Irakli Gozalishvili]{@link https://github.com/Gozala/}.
     * Thanks for this *beautiful* one-liner (never liked your "unbind" naming choice, though).
     * @memberof module:lamb
     * @category Function
     * @function
     * @example
     * var arr = [1, 2, 3, 4, 5];
     * var s = "hello";
     * var join = _.generic(Array.prototype.join);
     *
     * join(arr, "-") // => "1-2-3-4-5"
     *
     * // the function will work with any array-like object
     * join("s", "-") // => "h-e-l-l-o"
     *
     * @param {Function} method
     * @returns {Function}
     */
    var generic = Function.bind.bind(Function.call);

    /**
     * The I combinator. Any value passed to the function is simply returned as it is.
     * @example
     * var foo = {bar: "baz"};
     *
     * _.identity(foo) === foo // true
     *
     * @memberof module:lamb
     * @category Function
     * @see [SKI combinator calculus]{@link https://en.wikipedia.org/wiki/SKI_combinator_calculus}
     * @param {*} value
     * @returns {*} The value passed as parameter.
     */
    function identity (value) {
        return value;
    }

    /**
     * Builds a partially applied function. The <code>lamb</code> object itself can be used
     * as a placeholder argument and it's useful to alias it with a short symbol such as <code>_</code>.
     * @example
     * var users = [
     *     {id: 1, name: "John", active: true, confirmedMail: true},
     *     {id: 2, name: "Jane", active: true, confirmedMail: false},
     *     {id: 3, name: "Mario", active: false, confirmedMail: false}
     * ];
     * var isKeyTrue = _.partial(_.hasKeyValue, _, true);
     * var isActive = isKeyTrue("active");
     * var hasConfirmedMail = isKeyTrue("confirmedMail");
     *
     * _.map(users, isActive) // => [true, true, false]
     * _.map(users, hasConfirmedMail) // => [true, false, false]
     *
     * @memberof module:lamb
     * @category Function
     * @see {@link module:lamb.asPartial|asPartial}
     * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
     * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
     * @param {Function} fn
     * @param {...*} args
     * @returns {Function}
     */
    function partial (fn) {
        var args = _argsTail.apply(null, arguments);

        return function () {
            var lastIdx = 0;
            var newArgs = [];
            var argsLen = args.length;

            for (var i = 0, boundArg; i < argsLen; i++) {
                boundArg = args[i];
                newArgs[i] = boundArg === _ ? arguments[lastIdx++] : boundArg;
            }

            for (var len = arguments.length; lastIdx < len; lastIdx++) {
                newArgs[i++] = arguments[lastIdx];
            }

            return fn.apply(this, newArgs);
        };
    }

    lamb.always = always;
    lamb.compose = compose;
    lamb.generic = generic;
    lamb.identity = identity;
    lamb.partial = partial;

    /**
     * Builds an array with the received arguments excluding the first one.<br/>
     * To be used with the arguments object, which needs to be passed to the apply
     * method of this function.
     * @private
     * @function
     * @param {...*} value
     * @returns {Array}
     */
    var _argsTail = _argsToArrayFrom(1);

    /**
     * Builds helper functions to extract portions of the arguments
     * object rather efficiently without having to write for loops
     * manually for each case.<br/>
     * The arguments object needs to be passed to the apply method
     * of the generated function.
     * @private
     * @param {Number} idx
     * @returns {Function}
     */
    function _argsToArrayFrom (idx) {
        return function () {
            var argsLen = arguments.length || idx;
            var len = argsLen - idx;
            var result = Array(len);

            for (var i = 0; i < len; i++) {
                result[i] = arguments[i + idx];
            }

            return result;
        };
    }

    /**
     * Keeps building a partial application of the received function as long
     * as it's called with placeholders; applies the original function with
     * the collected parameters otherwise.
     * @private
     * @param {Function} fn
     * @param {Array} argsHolder
     * @returns {Function|*}
     */
    function _asPartial (fn, argsHolder) {
        return function () {
            var argsHolderLen = argsHolder.length;
            var argsLen = arguments.length;
            var lastIdx = 0;
            var newArgs = [];
            var canApply = true;

            for (var i = 0; i < argsLen; i++) {
                if (arguments[i] === _) {
                    canApply = false;
                    break;
                }
            }

            for (var idx = 0, boundArg; idx < argsHolderLen; idx++) {
                boundArg = argsHolder[idx];
                newArgs[idx] = lastIdx < argsLen && boundArg === _ ? arguments[lastIdx++] : boundArg;
            }

            while (lastIdx < argsLen) {
                newArgs[idx++] = arguments[lastIdx++];
            }

            return canApply ? fn.apply(this, newArgs) : _asPartial(fn, newArgs);
        };
    }

    /**
     * The default comparer for sorting functions.<br/>
     * If the given values are of different types they
     * will be both converted to strings.<br/>
     * Uses the SameValueZero comparison.
     * @private
     * @param {*} a
     * @param {*} b
     * @returns {Number} -1 | 0 | 1
     */
    function _comparer (a, b) {
        var result = 0;

        if (typeof a !== typeof b) {
            a = String(a);
            b = String(b);
        }

        /* eslint-disable no-self-compare */

        if (!isSVZ(a, b)) {
            if (a > b || a !== a) {
                result = 1;
            } else if (a < b || b !== b) {
                result = -1;
            }
        }

        /* eslint-enable no-self-compare */

        return result;
    }

    /**
     * Accepts a list of sorting criteria with at least one element
     * and builds a function that compares two values with such criteria.
     * @private
     * @param {Sorter[]} criteria
     * @returns {Function}
     */
    function _compareWith (criteria) {
        return function (a, b) {
            var len = criteria.length;
            var criterion = criteria[0];
            var result = criterion.compare(a.value, b.value);

            for (var i = 1; result === 0 && i < len; i++) {
                criterion = criteria[i];
                result = criterion.compare(a.value, b.value);
            }

            if (result === 0) {
                result = a.index - b.index;
            }

            return criterion.isDescending ? -result : result;
        };
    }

    /**
     * Used by curry functions to collect arguments until the arity is consumed,
     * then applies the original function.
     * @private
     * @param {Function} fn
     * @param {Number} arity
     * @param {Boolean} isRightCurry
     * @param {Boolean} isAutoCurry
     * @param {Array} argsHolder
     * @returns {Function}
     */
    function _currier (fn, arity, isRightCurry, isAutoCurry, argsHolder) {
        return function () {
            var holderLen = argsHolder.length;
            var argsLen = arguments.length;
            var newArgsLen = holderLen + (argsLen > 1 && isAutoCurry ? argsLen : 1);
            var newArgs = Array(newArgsLen);

            for (var i = 0; i < holderLen; i++) {
                newArgs[i] = argsHolder[i];
            }

            for (; i < newArgsLen; i++) {
                newArgs[i] = arguments[i - holderLen];
            }

            if (newArgsLen >= arity) {
                return fn.apply(this, isRightCurry ? newArgs.reverse() : newArgs);
            } else {
                return _currier(fn, arity, isRightCurry, isAutoCurry, newArgs);
            }
        };
    }

    /**
     * Prepares a function for currying by setting the proper arity for
     * the <code>_currier</code> function.
     * If the desumed arity isn't greater than one, it will return the received
     * function itself, instead.
     * @private
     * @param {Function} fn
     * @param {Number} [arity=fn.length]
     * @param {Boolean} [isRightCurry=false]
     * @param {Boolean} [isAutoCurry=false]
     * @returns {Function}
     */
    function _curry (fn, arity, isRightCurry, isAutoCurry) {
        if (arity >>> 0 !== arity) {
            arity = fn.length;
        }

        return arity > 1 ? _currier(fn, arity, isRightCurry, isAutoCurry, []) : fn;
    }

    /**
     * Flattens an array.
     * @private
     * @param {Array} array - The source array
     * @param {Boolean} isDeep - Whether to perform a deep flattening or not
     * @param {Array} output - An array to collect the result
     * @param {Number} idx - The next index to be filled in the output
     * @returns {Array} The output array filled with the results
     */
    function _flatten (array, isDeep, output, idx) {
        for (var i = 0, len = array.length, value, j, vLen; i < len; i++) {
            value = array[i];

            if (!Array.isArray(value)) {
                output[idx++] = value;
            } else if (isDeep) {
                _flatten(value, true, output, idx);
                idx = output.length;
            } else {
                vLen = value.length;
                output.length += vLen;

                for (j = 0; j < vLen; j++) {
                    output[idx++] = value[j];
                }
            }
        }

        return output;
    }

    /**
     * Establishes at which index an element should be inserted in a sorted array to respect
     * the array order. Needs the comparer used to sort the array.
     * @private
     * @param {Array} array
     * @param {*} element
     * @param {Function} comparer
     * @param {Number} start
     * @param {Number} end
     * @returns {Number}
     */
    function _getInsertionIndex (array, element, comparer, start, end) {
        if (array.length === 0) {
            return 0;
        }

        var pivot = (start + end) >> 1;
        var result = comparer(
            {value: element, index: pivot},
            {value: array[pivot], index: pivot}
        );

        if (end - start <= 1) {
            return result < 0 ? pivot : pivot + 1;
        } else if (result < 0) {
            return _getInsertionIndex(array, element, comparer, start, pivot);
        } else if (result === 0) {
            return pivot + 1;
        } else {
            return _getInsertionIndex(array, element, comparer, pivot, end);
        }
    }

    /**
     * Gets the number of consecutive elements satisfying a predicate in an array-like object.
     * @private
     * @param {ArrayLike} arrayLike
     * @param {ListIteratorCallback} predicate
     * @param {Object} predicateContext
     * @returns {Number}
     */
    function _getNumConsecutiveHits (arrayLike, predicate, predicateContext) {
        var idx = 0;
        var len = arrayLike.length;

        if (arguments.length === 3) {
            predicate = predicate.bind(predicateContext);
        }

        while (idx < len && predicate(arrayLike[idx], idx, arrayLike)) {
            idx++;
        }

        return idx;
    }

    /**
     * Builds the prefix or suffix to be used when padding a string.
     * @private
     * @param {String} source
     * @param {String} char
     * @param {Number} len
     * @returns {String}
     */
    function _getPadding (source, char, len) {
        if (!isNil(source) && type(source) !== "String") {
            source = String(source);
        }

        return _repeat(String(char)[0] || "", Math.ceil(len - source.length));
    }

    /**
     * Checks if a path is valid in the given object and retrieves the path target.
     * @private
     * @param {Object} obj
     * @param {String[]} parts
     * @param {Boolean} walkNonEnumerables
     * @returns {Object}
     */
    function _getPathInfo (obj, parts, walkNonEnumerables) {
        if (isNil(obj)) {
            throw _makeTypeErrorFor(obj, "object");
        }

        var target = obj;
        var i = -1;
        var len = parts.length;
        var key;

        while (++i < len) {
            key = _getPathKey(target, parts[i], walkNonEnumerables);

            if (isUndefined(key)) {
                break;
            }

            target = target[key];
        }

        return i === len ? {isValid: true, target: target} : {isValid: false, target: void 0};
    }

    /**
     * Helper to retrieve the correct key while evaluating a path.
     * @private
     * @param {Object} target
     * @param {String} key
     * @param {Boolean} includeNonEnumerables
     * @returns {String|Number|Undefined}
     */
    function _getPathKey (target, key, includeNonEnumerables) {
        if (includeNonEnumerables && key in Object(target) || _isEnumerable(target, key)) {
            return key;
        }

        var n = +key;
        var len = target && target.length;

        return n < 0 && n >= -len ? n + len : n < len ? n : void 0;
    }

    /**
     * Builds a "grouping function" for an array-like object.
     * @private
     * @param {Function} makeValue
     * @returns {Function}
     */
    function _groupWith (makeValue) {
        return function (arrayLike, iteratee, iterateeContext) {
            if (arguments.length === 3) {
                iteratee = iteratee.bind(iterateeContext);
            }

            var result = {};
            var len = arrayLike.length;

            for (var i = 0, element, key; i < len; i++) {
                element = arrayLike[i];
                key = iteratee(element, i, arrayLike);
                result[key] = makeValue(result[key], element);
            }

            return result;
        };
    }

    /**
     * Makes an object immutable by recursively calling <code>Object.freeze</code>
     * on its members.
     * @private
     * @param {Object} obj
     * @param {Array} seen
     * @returns {Object} The obj parameter itself, not a copy.
     */
    function _immutable (obj, seen) {
        if (seen.indexOf(obj) === -1) {
            seen.push(Object.freeze(obj));

            forEach(Object.getOwnPropertyNames(obj), function (key) {
                var value = obj[key];

                if (typeof value === "object" && !isNull(value)) {
                    _immutable(value, seen);
                }
            });
        }

        return obj;
    }

    /**
     * If a method with the given name exists on the target, applies it with the provided
     * arguments and returns the result. Returns <code>undefined</code> otherwise.<br/>
     * The arguments for the method are built by concatenating the array of bound arguments,
     * optionally received by {@link module:lamb.invoker|invoker}, with the final set of, also
     * optional, <code>args</code>.
     * @private
     * @param {Array} boundArgs
     * @param {String} methodName
     * @param {Object} target
     * @param {...*} [args]
     * @returns {*}
     */
    function _invoker (boundArgs, methodName, target) {
        var method = target[methodName];

        if (typeof method !== "function") {
            return void 0;
        }

        var boundArgsLen = boundArgs.length;
        var ofs = 3 - boundArgsLen;
        var len = arguments.length - ofs;
        var args = Array(len);

        for (var i = 0; i < boundArgsLen; i++) {
            args[i] = boundArgs[i];
        }

        for (; i < len; i++) {
            args[i] = arguments[i + ofs];
        }

        return method.apply(target, args);
    }

    /**
     * Accepts a target object and a key name and verifies that the target is an array and that
     * the key is an existing index.
     * @private
     * @param {Object} target
     * @param {String|Number} key
     * @returns {Boolean}
     */
    function _isArrayIndex (target, key) {
        var n = +key;

        return Array.isArray(target) && n % 1 === 0 && !(n < 0 && _isEnumerable(target, key));
    }

    /**
     * Checks whether the specified key is an enumerable property of the given object or not.
     * @private
     * @param {Object} obj
     * @param {String} key
     * @returns {Boolean}
     */
    function _isEnumerable (obj, key) {
        return key in Object(obj) && (_isOwnEnumerable(obj, key) || ~_safeEnumerables(obj).indexOf(key));
    }

    /**
     * Checks whether the specified key is a own enumerable property of the given object or not.
     * @private
     * @function
     * @param {Object} obj
     * @param {String} key
     * @returns {Boolean}
     */
    var _isOwnEnumerable = generic(_objectProto.propertyIsEnumerable);

    /**
     * Accepts an object and build a function expecting a key to create a "pair" with the key
     * and its value.
     * @private
     * @param {Object} obj
     * @returns {Function}
     */
    function _keyToPairIn (obj) {
        return function (key) {
            return [key, obj[key]];
        };
    }

    /**
     * Helper to build the {@link module:lamb.everyIn|everyIn} or the
     * {@link module:lamb.someIn|someIn} function.
     * @private
     * @param {Boolean} defaultResult
     * @returns {Function}
     */
    function _makeArrayChecker (defaultResult) {
        return function (arrayLike, predicate, predicateContext) {
            if (arguments.length === 3) {
                predicate = predicate.bind(predicateContext);
            }

            for (var i = 0, len = arrayLike.length; i < len; i++) {
                if (defaultResult ^ !!predicate(arrayLike[i], i, arrayLike)) {
                    return !defaultResult;
                }
            }

            return defaultResult;
        };
    }

    /**
     * Builds a list of sorting criteria from a list of sorter functions. Returns a list containing
     * a single default sorting criterion if the sorter list is empty.
     * @private
     * @param {Function[]} sorters
     * @returns {Sorter[]}
     */
    function _makeCriteria (sorters) {
        return sorters.length ? map(sorters, _makeCriterion) : [_sorter()];
    }

    /**
     * Converts a sorting function to a sorting criterion if necessary.
     * @private
     * @param {Function} criterion
     * @returns {Sorter}
     */
    function _makeCriterion (criterion) {
        return criterion && typeof criterion.compare === "function" ? criterion : _sorter(criterion);
    }

    /**
     * Builds a reduce function. The <code>step</code> parameter must be <code>1</code>
     * to build  {@link module:lamb.reduce|reduce} and <code>-1</code> to build
     * {@link module:lamb.reduceRight|reduceRight}.
     * @private
     * @param {Number} step
     * @returns {Function}
     */
    function _makeReducer (step) {
        return function (arrayLike, accumulator, initialValue) {
            var len = _toArrayLength(arrayLike.length);
            var idx = step === 1 ? 0 : len - 1;
            var nCalls;
            var result;

            if (arguments.length === 3) {
                nCalls = len;
                result = initialValue;
            } else {
                if (len === 0) {
                    throw new TypeError("Reduce of empty array-like with no initial value");
                }

                result = arrayLike[idx];
                idx += step;
                nCalls = len - 1;
            }

            for (; nCalls--; idx += step) {
                result = accumulator(result, arrayLike[idx], idx, arrayLike);
            }

            return result;
        };
    }

    /**
     * Builds a TypeError stating that it's not possible to convert the given value to the
     * desired type.
     * @private
     * @param {*} value
     * @param {String} desiredType
     * @returns {TypeError}
     */
    function _makeTypeErrorFor (value, desiredType) {
        return new TypeError("Cannot convert " + type(value).toLowerCase() + " to " + desiredType);
    }

    /**
     * Merges the received objects using the provided function to retrieve their keys.
     * @private
     * @param {Function} getKeys
     * @param {...Object} source
     * @returns {Object}
     */
    function _merge (getKeys) {
        return reduce(_argsTail.apply(null, arguments), function (result, source) {
            forEach(getKeys(source), function (key) {
                result[key] = source[key];
            });

            return result;
        }, {});
    }

    /**
     * Using the provided function to retrieve the keys of an object, builds
     * a function expecting an object to create a list of key / value pairs.
     * @private
     * @function
     * @param {Function} getKeys
     * @returns {Function}
     */
    var _pairsFrom = _curry(function (getKeys, obj) {
        return map(getKeys(obj), _keyToPairIn(obj));
    });

    /**
     * Builds a partial application of a function expecting an iteratee and an
     * optional argument other than its main data parameter.<br/>
     * The optional argument is passed to the function only when is explicitly given
     * a value.<br/>
     * The optional argument is usually the iteratee context, but reduce functions
     * pass their initial value instead.
     * @private
     * @param {Function} fn
     * @returns {Function}
     */
    function _partialWithIteratee (fn) {
        return function (iteratee, optionalArgument) {
            var f = arguments.length === 2 ? fn : binary(fn);

            return partial(f, _, iteratee, optionalArgument);
        };
    }

    /**
     * A null-safe function to repeat the source string the desired amount of times.
     * @private
     * @param {String} source
     * @param {Number} times
     * @returns {String}
     */
    function _repeat (source, times) {
        var result = "";

        for (var i = 0; i < times; i++) {
            result += source;
        }

        return result;
    }

    /**
     * Builds a list of the enumerable properties of an object.
     * The function is null-safe, unlike the public one.
     * @private
     * @param {Object} obj
     * @returns {String[]}
     */
    function _safeEnumerables (obj) {
        var result = [];

        for (var key in obj) {
            result.push(key);
        }

        return result;
    }

    /**
     * A null-safe version of <code>Object.keys</code>.
     * @private
     * @function
     * @param {Object} obj
     * @returns {String[]}
     */
    var _safeKeys = compose(Object.keys, Object);

    /**
     * A generic version of <code>String.prototype.search</code>
     * @private
     * @function
     * @param {String} s
     * @param {RegExp} pattern
     * @return {Number}
     */
    var _search = generic(_stringProto.search);

    /**
     * Sets, or creates, a property in a copy of the provided object to the desired value.
     * @param {Object} source
     * @param {String} key
     * @param {*} value
     * @returns {Object}
     */
    function _setIn (source, key, value) {
        var result = {};

        for (var prop in source) {
            result[prop] = source[prop];
        }

        result[key] = value;

        return result;
    }

    /**
     * Sets an index in an array-like object.<br/>
     * If provided with an updater function it will use it to update the current value,
     * otherwise sets the index to the specified value.
     * @private
     * @param {ArrayLike} arrayLike
     * @param {Number} idx
     * @param {*} [value]
     * @param {Function} [updater]
     * @returns {Array}
     */
    function _setIndex (arrayLike, idx, value, updater) {
        var result = slice(arrayLike, 0, arrayLike.length);
        var n = _toNaturalIndex(idx, result.length);

        if (!isNaN(n)) {
            result[n] = arguments.length === 4 ? updater(arrayLike[n]) : value;
        }

        return result;
    }

    /**
     * Sets the object's property targeted by the given path to the desired value.<br/>
     * Works with arrays and is able to set their indexes, even negative ones.
     * @private
     * @param {Object|Array} obj
     * @param {String[]} parts
     * @param {*} value
     * @returns {Object|Array}
     */
    function _setPathIn (obj, parts, value) {
        var key = parts[0];
        var partsLen = parts.length;
        var v;

        if (partsLen === 1) {
            v = value;
        } else {
            var targetKey = _getPathKey(obj, key, false);

            v = _setPathIn(
                isUndefined(targetKey) ? targetKey : obj[targetKey],
                slice(parts, 1, partsLen),
                value
            );
        }

        return _isArrayIndex(obj, key) ? _setIndex(obj, +key, v) : _setIn(obj, key, v);
    }

    /**
     * Builds a sorting criterion. If the comparer function is missing, the default
     * comparer will be used instead.
     * @private
     * @param {Function} reader
     * @param {Boolean} isDescending
     * @param {Function} [comparer]
     * @returns {Sorter}
     */
    function _sorter (reader, isDescending, comparer) {
        if (typeof reader !== "function" || reader === identity) {
            reader = null;
        }

        if (typeof comparer !== "function") {
            comparer = _comparer;
        }

        return {
            isDescending: isDescending === true,
            compare: function (a, b) {
                if (reader) {
                    a = reader(a);
                    b = reader(b);
                }

                return comparer(a, b);
            }
        };
    }

    /**
     * Using the provided function to retrieve the keys of an object, builds
     * a function expecting an object to create an array containing a list
     * of the keys in its first index and the corresponding list of values
     * in the second one.
     * @private
     * @function
     * @param {Function} getKeys
     * @returns {Function}
     */
    var _tearFrom = _curry(function (getKeys, obj) {
        return reduce(getKeys(obj), function (result, key) {
            result[0].push(key);
            result[1].push(obj[key]);

            return result;
        }, [[], []]);
    });

    /**
     * Converts a value to a valid array length, thus an integer within
     * <code>0</code> and <code>2<sup>32</sup> - 1</code> (both included).
     * @private
     * @param {*} value
     * @returns {Number}
     */
    function _toArrayLength (value) {
        return clamp(value, 0, MAX_ARRAY_LENGTH) >>> 0;
    }

    /**
     * Converts a value to an integer.
     * @private
     * @param {*} value
     * @returns {Number}
     */
    function _toInteger (value) {
        var n = +value;

        if (isNaN(n)) {
            return 0;
        } else if (n % 1 === 0) {
            return n;
        } else {
            return Math.floor(Math.abs(n)) * (n < 0 ? -1 : 1);
        }
    }

    /**
     * Checks if the given index, even negative, is an integer within the provided
     * length. If so returns its natural number equivalent.<br/>
     * Returns <code>undefined<code> otherwise.
     * @private
     * @param {Number} idx
     * @param {Number} len
     * @returns {Number}
     */
    function _toNaturalIndex (idx, len) {
        if (isInteger(idx)) {
            return idx >= -len && idx < len ? idx < 0 ? idx + len : idx : NaN;
        }

        return NaN;
    }

    /**
     * Splits a sting path using the provided separator and returns an array
     * of path parts.
     * @private
     * @param {String} path
     * @param {String} separator
     * @returns {String[]}
     */
    function _toPathParts (path, separator) {
        return String(path).split(separator || ".");
    }

    /**
     * Creates a non-null-safe version of the provided "getKeys" function.
     * @private
     * @function
     * @param {Function} getKeys
     * @returns {Function}
     */
    var _unsafeKeyListFrom = _curry(function (getKeys, obj) {
        if (isNil(obj)) {
            throw _makeTypeErrorFor(obj, "object");
        }

        return getKeys(obj);
    });

    /**
     * Using the provided function to retrieve the keys of an object, builds
     * a function expecting an object to create the list of values for such keys.
     * @private
     * @function
     * @param {Function} getKeys
     * @returns {Function}
     */
    var _valuesFrom = _curry(function (getKeys, obj) {
        return map(getKeys(obj), partial(getIn, obj));
    });

    /**
     * Builds a predicate to check if an array-like object contains the given value.<br/>
     * Please note that the equality test is made with {@link module:lamb.isSVZ|isSVZ}; so you can
     * check for <code>NaN</code>, but <code>0</code> and <code>-0</code> are the same value.<br/>
     * See also {@link module:lamb.isIn|isIn} for an uncurried version.
     * @example
     * var containsNaN = _.contains(NaN, 0);
     *
     * containsNaN([0, 1, 2, 3, NaN]) // => true
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.isIn|isIn}
     * @param {*} value
     * @param {Number} [fromIndex=0] The position at which to begin searching for the given value.
     * @returns {Function}
     */
    function contains (value, fromIndex) {
        return function (arrayLike) {
            return isIn(arrayLike, value, fromIndex);
        };
    }

    /**
     * Checks if all the elements in an array-like object satisfy the given predicate.<br/>
     * The function will stop calling the predicate as soon as it returns a <em>falsy</em> value.<br/>
     * Note that an empty array-like will always produce a <code>true</code> result regardless of the
     * predicate because of [vacuous truth]{@link https://en.wikipedia.org/wiki/Vacuous_truth}.<br/>
     * Also note that unlike the native
     * [Array.prototype.every]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every},
     * this function won't skip deleted or unassigned indexes.
     * @example
     * var persons = [
     *     {"name": "Jane", "age": 12, active: true},
     *     {"name": "John", "age": 40, active: true},
     *     {"name": "Mario", "age": 17, active: true},
     *     {"name": "Paolo", "age": 15, active: true}
     * ];
     * var isGreaterThan = _.curryRight(_.isGT);
     * var isAdult = _.keySatisfies(isGreaterThan(17), "age");
     * var isActive = _.hasKeyValue("active", true);
     *
     * _.everyIn(persons, isAdult) // => false
     * _.everyIn(persons, isActive) // => true
     *
     * @example <caption>Showing the difference with <code>Array.prototype.every</code>:</caption>
     * var isDefined = _.not(_.isUndefined);
     * var arr = new Array(5);
     * arr[3] = 99;
     *
     * arr.every(isDefined) // => true
     * _.everyIn(arr, isDefined) // => false
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.every|every}
     * @see {@link module:lamb.some|some}, {@link module:lamb.someIn|someIn}
     * @param {ArrayLike} arrayLike
     * @param {ListIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Boolean}
     */
    var everyIn = _makeArrayChecker(true);

    /**
     * A curried version of {@link module:lamb.everyIn|everyIn} expecting a predicate and its optional
     * context to build a function waiting for the array-like to act upon.
     * @example
     * var data = [2, 3, 5, 6, 8];
     * var isEven = function (n) { return n % 2 === 0; };
     * var allEvens = _.every(isEven);
     * var allIntegers = _.every(_.isInteger);
     *
     * allEvens(data) // => false
     * allIntegers(data) // => true
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.everyIn|everyIn}
     * @see {@link module:lamb.some|some}, {@link module:lamb.someIn|someIn}
     * @param {ListIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Function}
     */
    var every = _partialWithIteratee(everyIn);

    /**
     * Builds an array comprised of all values of the array-like object passing the <code>predicate</code>
     * test.<br/>
     * Since version <code>0.34.0</code> this function is no longer a generic version of
     * [Array.prototype.filter]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter}
     * for performance reasons.<br/>
     * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
     * @example
     * var isLowerCase = function (s) { return s.toLowerCase() === s; };
     *
     * _.filter(["Foo", "bar", "baZ"], isLowerCase) // => ["bar"]
     *
     * // the function will work with any array-like object
     * _.filter("fooBAR", isLowerCase) // => ["f", "o", "o"]
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.filterWith|filterWith}
     * @param {ArrayLike} arrayLike
     * @param {ListIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Array}
     */
    function filter (arrayLike, predicate, predicateContext) {
        var len = arrayLike.length;
        var result = [];

        if (arguments.length === 3) {
            predicate = predicate.bind(predicateContext);
        }

        for (var i = 0; i < len; i++) {
            predicate(arrayLike[i], i, arrayLike) && result.push(arrayLike[i]);
        }

        return result;
    }

    /**
     * Returns a partial application of {@link module:lamb.filter|filter} that uses the given predicate and
     * the optional context to build a function expecting the array-like object to act upon.
     * @example
     * var isLowerCase = function (s) { return s.toLowerCase() === s; };
     * var getLowerCaseEntries = _.filterWith(isLowerCase);
     *
     * getLowerCaseEntries(["Foo", "bar", "baZ"]) // => ["bar"]
     *
     * // array-like objects can be used as well
     * getLowerCaseEntries("fooBAR") // => ["f", "o", "o"]
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.filter|filter}
     * @param {ListIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Function}
     */
    var filterWith = _partialWithIteratee(filter);

    /**
     * Searches for an element satisfying the predicate in the given array-like object and returns it if
     * the search is successful. Returns <code>undefined</code> otherwise.
     * @example
     * var persons = [
     *     {"name": "Jane", "surname": "Doe", "age": 12},
     *     {"name": "John", "surname": "Doe", "age": 40},
     *     {"name": "Mario", "surname": "Rossi", "age": 18},
     *     {"name": "Paolo", "surname": "Bianchi", "age": 40}
     * ];
     *
     * _.find(persons, _.hasKeyValue("age", 40)) // => {"name": "John", "surname": "Doe", "age": 40}
     * _.find(persons, _.hasKeyValue("age", 41)) // => undefined
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.findWhere|findWhere}
     * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
     * @param {ArrayLike} arrayLike
     * @param {ListIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {*}
     */
    function find (arrayLike, predicate, predicateContext) {
        var idx = arguments.length === 3 ?
            findIndex(arrayLike, predicate, predicateContext) :
            findIndex(arrayLike, predicate);

        return idx === -1 ? void 0 : arrayLike[idx];
    }

    /**
     * Searches for an element satisfying the predicate in the given array-like object and returns its
     * index if the search is successful. Returns <code>-1</code> otherwise.
     * @example
     * var persons = [
     *     {"name": "Jane", "surname": "Doe", "age": 12},
     *     {"name": "John", "surname": "Doe", "age": 40},
     *     {"name": "Mario", "surname": "Rossi", "age": 18},
     *     {"name": "Paolo", "surname": "Bianchi", "age": 40}
     * ];
     *
     * _.findIndex(persons, _.hasKeyValue("age", 40)) // => 1
     * _.findIndex(persons, _.hasKeyValue("age", 41)) // => -1
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.findIndexWhere|findIndexWhere}
     * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
     * @param {ArrayLike} arrayLike
     * @param {ListIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Number}
     */
    function findIndex (arrayLike, predicate, predicateContext) {
        var result = -1;

        if (arguments.length === 3) {
            predicate = predicate.bind(predicateContext);
        }

        for (var i = 0, len = arrayLike.length; i < len; i++) {
            if (predicate(arrayLike[i], i, arrayLike)) {
                result = i;
                break;
            }
        }

        return result;
    }

    /**
     * Builds a partial application of {@link module:lamb.findIndex|findIndex} expecting the array-like
     * object to search.
     * @example
     * var isEven = function (n) { return n % 2 === 0; };
     * var findEvenIdx = _.findIndexWhere(isEven);
     *
     * findEvenIdx([1, 3, 4, 5, 7]) // => 2
     * findEvenIdx([1, 3, 5, 7]) // => -1
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.findIndex|findIndex}
     * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
     * @param {ListIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Function}
     */
    var findIndexWhere = _partialWithIteratee(findIndex);

    /**
     * Builds a partial application of {@link module:lamb.find|find} expecting the array-like object
     * to search.
     * @example
     * var isEven = function (n) { return n % 2 === 0; };
     * var findEven = _.findWhere(isEven);
     *
     * findEven([1, 3, 4, 5, 7]) // => 4
     * findEven([1, 3, 5, 7]) // => undefined
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.find|find}
     * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
     * @param {ListIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Function}
     */
    var findWhere = _partialWithIteratee(find);

    /**
     * Executes the provided <code>iteratee</code> for each element of the given array-like object.<br/>
     * Since version <code>0.34.0</code> this function is no longer a generic version of
     * [Array.prototype.forEach]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach}
     * for performance reasons.<br/>
     * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
     * @example <caption>Adding a CSS class to all elements of a NodeList in a browser environment:</caption>
     * var addClass = _.curry(function (className, element) {
     *     element.classList.add(className);
     * });
     * var paragraphs = document.querySelectorAll("#some-container p");
     *
     * _.forEach(paragraphs, addClass("main"));
     * // each "p" element in the container will have the "main" class now
     *
     * @memberof module:lamb
     * @category Array
     * @param {ArrayLike} arrayLike
     * @param {ListIteratorCallback} iteratee
     * @param {Object} [iterateeContext]
     * @returns {Undefined}
     */
    function forEach (arrayLike, iteratee, iterateeContext) {
        if (arguments.length === 3) {
            iteratee = iteratee.bind(iterateeContext);
        }

        for (var i = 0, len = _toArrayLength(arrayLike.length); i < len; i++) {
            iteratee(arrayLike[i], i, arrayLike);
        }
    }

    /**
     * Checks if an array-like object contains the given value.<br/>
     * Please note that the equality test is made with {@link module:lamb.isSVZ|isSVZ}; so you can
     * check for <code>NaN</code>, but <code>0</code> and <code>-0</code> are the same value.<br/>
     * See also {@link module:lamb.contains|contains} for a curried version building a predicate.
     * @example
     * var numbers = [0, 1, 2, 3, NaN];
     *
     * _.isIn(numbers, 1) // => true
     * _.isIn(numbers, 0) // => true
     * _.isIn(numbers, -0) // => true
     * _.isIn(numbers, NaN) // => true
     * _.isIn(numbers, 2, 3) // => false
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.contains|contains}
     * @param {ArrayLike} arrayLike
     * @param {*} value
     * @param {Number} [fromIndex=0] The position at which to begin searching for the given value.
     * @returns {Boolean}
     */
    function isIn (arrayLike, value, fromIndex) {
        var result = false;

        for (var i = fromIndex >>> 0, len = arrayLike.length; i < len; i++) {
            if (isSVZ(value, arrayLike[i])) {
                result = true;
                break;
            }
        }

        return result;
    }

    /**
     * Generates an array with the values passed as arguments.<br/>
     * Behaves like ES6's [Array.of]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of}.
     * @example
     * _.list(1, 2, 3) // => [1, 2, 3]
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @param {...*} value
     * @returns {Array}
     */
    var list = _argsToArrayFrom(0);

    /**
     * Builds a new array by applying the iteratee function to each element of the
     * received array-like object.<br/>
     * Since version <code>0.34.0</code> this function is no longer a generic version of
     * [Array.prototype.map]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map}
     * for performance reasons.<br/>
     * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
     * @example
     * _.map(["Joe", "Mario", "Jane"], _.invoker("toUpperCase")) // => ["JOE", "MARIO", "JANE"]
     *
     * _.map([4, 9, 16], Math.sqrt); // => [2, 3, 4]
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.mapWith|mapWith}
     * @see {@link module:lamb.flatMap|flatMap}, {@link module:lamb.flatMapWith|flatMapWith}
     * @param {ArrayLike} arrayLike
     * @param {ListIteratorCallback} iteratee
     * @param {Object} [iterateeContext]
     * @returns {Array}
     */
    function map (arrayLike, iteratee, iterateeContext) {
        var len = _toArrayLength(arrayLike.length);
        var result = Array(len);

        if (arguments.length === 3) {
            iteratee = iteratee.bind(iterateeContext);
        }

        for (var i = 0; i < len; i++) {
            result[i] = iteratee(arrayLike[i], i, arrayLike);
        }

        return result;
    }

    /**
     * Builds a partial application of {@link module:lamb.map|map} using the given iteratee and the
     * optional context. The resulting function expects the array-like object to act upon.
     * @example
     * var square = function (n) { return n * n; };
     * var getSquares = _.mapWith(square);
     *
     * getSquares([1, 2, 3, 4, 5]) // => [1, 4, 9, 16, 25]
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.map|map}
     * @see {@link module:lamb.flatMap|flatMap}, {@link module:lamb.flatMapWith|flatMapWith}
     * @param {ListIteratorCallback} iteratee
     * @param {Object} [iterateeContext]
     * @returns {function}
     */
    var mapWith = _partialWithIteratee(map);

    /**
     * Reduces (or folds) the values of an array-like object, starting from the first, to a new
     * value using the provided <code>accumulator</code> function.<br/>
     * Since version <code>0.34.0</code> this function is no longer a generic version of
     * [Array.prototype.reduce]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce}
     * for performance reasons.<br/>
     * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
     * @example
     * _.reduce([1, 2, 3, 4], _.add) // => 10
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.reduceRight|reduceRight}
     * @see {@link module:lamb.reduceWith|reduceWith}, {@link module:lamb.reduceRightWith|reduceRightWith}
     * @param {ArrayLike} arrayLike
     * @param {AccumulatorCallback} accumulator
     * @param {*} [initialValue]
     * @returns {*}
     */
    var reduce = _makeReducer(1);

    /**
     * Same as {@link module:lamb.reduce|reduce}, but starts the fold operation from the last
     * element instead.<br/>
     * Since version <code>0.34.0</code> this function is no longer a generic version of
     * [Array.prototype.reduceRight]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight}
     * for performance reasons.<br/>
     * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.reduce|reduce}
     * @see {@link module:lamb.reduceWith|reduceWith}, {@link module:lamb.reduceRightWith|reduceRightWith}
     * @param {ArrayLike} arrayLike
     * @param {AccumulatorCallback} accumulator
     * @param {*} [initialValue]
     * @returns {*}
     */
    var reduceRight = _makeReducer(-1);

    /**
     * A partial application of {@link module:lamb.reduce|reduceRight} that uses the
     * provided <code>accumulator</code> and the optional <code>initialValue</code> to
     * build a function expecting the array-like object to act upon.
     * @example
     * var arr = [1, 2, 3, 4, 5];
     *
     * _.reduceRightWith(_.add)(arr) // => 15
     * _.reduceRightWith(_.subtract)(arr) // => -5
     * _.reduceRightWith(_.subtract, 0)(arr) // => -15
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.reduceWith|reduceWith}
     * @see {@link module:lamb.reduce|reduce}, {@link module:lamb.reduce|reduceRight}
     * @param {AccumulatorCallback} accumulator
     * @param {*} [initialValue]
     * @returns {Function}
     */
    var reduceRightWith = _partialWithIteratee(reduceRight);

    /**
     * A partial application of {@link module:lamb.reduce|reduce} that uses the
     * provided <code>accumulator</code> and the optional <code>initialValue</code> to
     * build a function expecting the array-like object to act upon.
     * @example
     * var arr = [1, 2, 3, 4, 5];
     *
     * _.reduceWith(_.add)(arr) // => 15
     * _.reduceWith(_.subtract)(arr) // => -13
     * _.reduceWith(_.subtract, 0)(arr) // => -15
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.reduceRightWith|reduceRightWith}
     * @see {@link module:lamb.reduce|reduce}, {@link module:lamb.reduce|reduceRight}
     * @param {AccumulatorCallback} accumulator
     * @param {*} [initialValue]
     * @returns {Function}
     */
    var reduceWith = _partialWithIteratee(reduce);

    /**
     * Reverses a copy of the given array-like object.
     * @example
     * var arr = [1, 2, 3];
     *
     * _.reverse(arr) // => [3, 2, 1];
     *
     * // `arr` still is [1, 2, 3]
     *
     * @memberof module:lamb
     * @category Array
     * @param {ArrayLike} arrayLike
     * @returns {Array}
     */
    function reverse (arrayLike) {
        var len = _toArrayLength(arrayLike.length);
        var result = Array(len);

        for (var i = 0, ofs = len - 1; i < len; i++) {
            result[i] = arrayLike[ofs - i];
        }

        return result;
    }

    /**
     * Builds an array by extracting a portion of an array-like object.<br/>
     * Since version <code>0.48.0</code> this function is no longer a generic version of
     * [Array.prototype.slice]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice}
     * to ensure that dense arrays are returned.<br/>
     * Also note that, unlike the native method, the <code>start</code> and <code>end</code>
     * parameters aren't optional and will be simply converted to integer.<br/>
     * See also {@link module:lamb.drop|drop} and {@link module:lamb.dropN|dropN} if you want a
     * slice to the end of the array-like.
     * @example
     * var arr = [1, 2, 3, 4, 5];
     *
     * _.slice(arr, 0, 2) // => [1, 2]
     * _.slice(arr, 2, -1) // => [3, 4]
     * _.slice(arr, -3, 5) // => [3, 4, 5]
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.sliceAt|sliceAt}
     * @see {@link module:lamb.drop|drop}, {@link module:lamb.dropN|dropN}
     * @param {ArrayLike} arrayLike - Any array like object.
     * @param {Number} start - Index at which to begin extraction.
     * @param {Number} end - Index at which to end extraction. Extracts up to but not including end.
     * @returns {Array}
     */
    function slice (arrayLike, start, end) {
        var len = _toArrayLength(arrayLike.length);
        var begin = _toInteger(start);
        var upTo = _toInteger(end);

        if (begin < 0) {
            begin = begin < -len ? 0 : begin + len;
        }

        if (upTo < 0) {
            upTo = upTo < -len ? 0 : upTo + len;
        } else if (upTo > len) {
            upTo = len;
        }

        var resultLen = upTo - begin;
        var result = resultLen > 0 ? Array(resultLen) : [];

        for (var i = 0; i < resultLen; i++) {
            result[i] = arrayLike[begin + i];
        }

        return result;
    }

    /**
     * Given the <code>start</code> and <code>end</code> bounds, builds a partial application
     * of {@link module:lamb.slice|slice} expecting the array-like object to slice.<br/>
     * See also {@link module:lamb.drop|drop} and {@link module:lamb.dropN|dropN} if you want a
     * slice to the end of the array-like.
     * @example
     * var arr = [1, 2, 3, 4, 5];
     * var s = "hello";
     * var dropFirstAndLast = _.sliceAt(1, -1);
     *
     * dropFirstAndLast(arr) // => [2, 3, 4]
     * dropFirstAndLast(s) // => ["e", "l", "l"]
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.slice|slice}
     * @see {@link module:lamb.drop|drop}, {@link module:lamb.dropN|dropN}
     * @param {Number} start - Index at which to begin extraction.
     * @param {Number} end - Index at which to end extraction. Extracts up to but not including end.
     * @returns {Function}
     */
    function sliceAt (start, end) {
        return partial(slice, _, start, end);
    }

    /**
     * Checks if at least one element in an array-like object satisfies the given predicate.<br/>
     * The function will stop calling the predicate as soon as it returns a <em>truthy</em> value.<br/>
     * Note that unlike the native
     * [Array.prototype.some]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some},
     * this function won't skip deleted or unassigned indexes.
     * @example
     * var persons = [
     *     {"name": "Jane", "age": 12, active: false},
     *     {"name": "John", "age": 40, active: false},
     *     {"name": "Mario", "age": 17, active: false},
     *     {"name": "Paolo", "age": 15, active: false}
     * ];
     * var isGreaterThan = _.curryRight(_.isGT);
     * var isAdult = _.keySatisfies(isGreaterThan(17), "age");
     * var isActive = _.hasKeyValue("active", true);
     *
     * _.someIn(persons, isAdult) // => true
     * _.someIn(persons, isActive) // => false
     *
     * @example <caption>Showing the difference with <code>Array.prototype.some</code>:</caption>
     * var arr = new Array(5);
     * arr[3] = 99;
     *
     * arr.some(_.isUndefined) // => false
     * _.someIn(arr, _.isUndefined) // => true
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.some|some}
     * @see {@link module:lamb.every|every}, {@link module:lamb.everyIn|everyIn}
     * @param {ArrayLike} arrayLike
     * @param {ListIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Boolean}
     */
    var someIn = _makeArrayChecker(false);

    /**
     * A curried version of {@link module:lamb.someIn|someIn} expecting a predicate and its optional
     * context to build a function waiting for the array-like to act upon.
     * @example
     * var data = [1, 3, 5, 6, 7, 8];
     * var isEven = function (n) { return n % 2 === 0; };
     * var containsEvens = _.some(isEven);
     * var containsStrings = _.some(_.isType("String"));
     *
     * containsEvens(data) // => true
     * containsStrings(data) // => false
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.someIn|someIn}
     * @see {@link module:lamb.every|every}, {@link module:lamb.everyIn|everyIn}
     * @param {ListIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Function}
     */
    var some = _partialWithIteratee(someIn);

    lamb.contains = contains;
    lamb.every = every;
    lamb.everyIn = everyIn;
    lamb.filter = filter;
    lamb.filterWith = filterWith;
    lamb.find = find;
    lamb.findIndex = findIndex;
    lamb.findIndexWhere = findIndexWhere;
    lamb.findWhere = findWhere;
    lamb.forEach = forEach;
    lamb.isIn = isIn;
    lamb.list = list;
    lamb.map = map;
    lamb.mapWith = mapWith;
    lamb.reduce = reduce;
    lamb.reduceRight = reduceRight;
    lamb.reduceRightWith = reduceRightWith;
    lamb.reduceWith = reduceWith;
    lamb.reverse = reverse;
    lamb.slice = slice;
    lamb.sliceAt = sliceAt;
    lamb.some = some;
    lamb.someIn = someIn;

    /**
     * Accepts a series of functions and builds a function that applies the received
     * arguments to each one and returns the first non-<code>undefined</code> value.<br/>
     * Meant to work in sinergy with {@link module:lamb.condition|condition} and
     * {@link module:lamb.invoker|invoker}, can be useful as a strategy pattern for functions,
     * to mimic conditional logic or pattern matching, and also to build polymorphic functions.
     * @example
     * var isEven = function (n) { return n % 2 === 0; };
     * var filterString = _.compose(_.invoker("join", ""), _.filter);
     * var filterAdapter = _.adapter(
     *     _.invoker("filter"),
     *     _.condition(_.isType("String"), filterString)
     * );
     *
     * filterAdapter([1, 2, 3, 4, 5, 6], isEven) // => [2, 4, 6]
     * filterAdapter("123456", isEven) // => "246"
     * filterAdapter({}, isEven) // => undefined
     *
     * // obviously it's composable
     * var filterWithDefault = _.adapter(filterAdapter, _.always("Not implemented"));
     *
     * filterWithDefault([1, 2, 3, 4, 5, 6], isEven) // => [2, 4, 6]
     * filterWithDefault("123456", isEven) // => "246"
     * filterWithDefault({}, isEven) // => "Not implemented"
     *
     * @memberof module:lamb
     * @category Logic
     * @param {...Function} fn
     * @returns {Function}
     */
    function adapter () {
        var functions = list.apply(null, arguments);

        return function () {
            var len = functions.length;
            var result;

            for (var i = 0; i < len; i++) {
                result = functions[i].apply(this, arguments);

                if (!isUndefined(result)) {
                    break;
                }
            }

            return result;
        };
    }

    /**
     * Accepts a series of predicates and builds a new one that returns true if they are all satisfied
     * by the same arguments. The functions in the series will be applied one at a time until a
     * <code>false</code> value is produced, which is returned immediately.
     * @example
     * var isEven = function (n) { return n % 2 === 0; };
     * var isPositive = function (n) { return n > 0; };
     * var isPositiveEven = _.allOf(isEven, isPositive);
     *
     * isPositiveEven(-2) // => false
     * isPositiveEven(11) // => false
     * isPositiveEven(6) // => true
     *
     * @memberof module:lamb
     * @category Logic
     * @see {@link module:lamb.anyOf|anyOf}
     * @param {...Function} predicate
     * @returns {Function}
     */
    function allOf () {
        var predicates = list.apply(null, arguments);

        return function () {
            for (var i = 0, len = predicates.length; i < len; i++) {
                if (!predicates[i].apply(this, arguments)) {
                    return false;
                }
            }

            return true;
        };
    }

    /**
     * Accepts a series of predicates and builds a new one that returns true if at least one of them is
     * satisfied by the received arguments. The functions in the series will be applied one at a time
     * until a <code>true</code> value is produced, which is returned immediately.
     * @example
     * var users = [
     *     {id: 1, name: "John", group: "guest"},
     *     {id: 2, name: "Jane", group: "root"},
     *     {id: 3, name: "Mario", group: "admin"}
     * ];
     * var isInGroup = _.partial(_.hasKeyValue, "group");
     * var isSuperUser = _.anyOf(isInGroup("admin"), isInGroup("root"));
     *
     * isSuperUser(users[0]) // => false
     * isSuperUser(users[1]) // => true
     * isSuperUser(users[2]) // => true
     *
     * @memberof module:lamb
     * @category Logic
     * @see {@link module:lamb.allOf|allOf}
     * @param {...Function} predicate
     * @returns {Function}
     */
    function anyOf () {
        var predicates = list.apply(null, arguments);

        return function () {
            for (var i = 0, len = predicates.length; i < len; i++) {
                if (predicates[i].apply(this, arguments)) {
                    return true;
                }
            }

            return false;
        };
    }

    /**
     * Builds a function that will apply the received arguments to <code>trueFn</code>,
     * if the predicate is satisfied with the same arguments, or to <code>falseFn</code> otherwise.<br/>
     * If <code>falseFn</code> isn't provided and the predicate isn't satisfied the function
     * will return <code>undefined</code>.<br/>
     * Although you can use other <code>condition</code>s as <code>trueFn</code> or <code>falseFn</code>,
     * it's probably better to use {@link module:lamb.adapter|adapter} to build more complex behaviours.<br/>
     * See also {@link module:lamb.unless|unless} and {@link module:lamb.when|when} as they are
     * shortcuts to common use cases.
     * @example
     * var isEven = function (n) { return n % 2 === 0};
     * var halve = function (n) { return n / 2; };
     * var double = function (n) { return n * 2; };
     * var halveEvenAndDoubleOdd = _.condition(isEven, halve, double);
     *
     * halveEvenAndDoubleOdd(5) // => 10
     * halveEvenAndDoubleOdd(6) // => 3
     *
     * var halveIfNumber = _.condition(_.isType("Number"), halve);
     *
     * halveIfNumber(2) // => 1
     * halveIfNumber("2") // => undefined
     *
     * @memberof module:lamb
     * @category Logic
     * @see {@link module:lamb.unless|unless}
     * @see {@link module:lamb.when|when}
     * @param {Function} predicate
     * @param {Function} trueFn
     * @param {Function} [falseFn]
     * @returns {Function}
     */
    function condition (predicate, trueFn, falseFn) {
        return function () {
            if (predicate.apply(this, arguments)) {
                return trueFn.apply(this, arguments);
            } else if (falseFn) {
                return falseFn.apply(this, arguments);
            } else {
                return void 0;
            }
        };
    }

    /**
     * Verifies that the two supplied values are the same value using the "SameValue" comparison.<br/>
     * Note that this doesn't behave as the strict equality operator, but rather as a shim of ES6's
     * [Object.is]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is}.
     * Differences are that <code>0</code> and <code>-0</code> aren't the same value and, finally,
     * <code>NaN</code> is equal to itself
     * @example
     * var testObject = {};
     *
     * _.is({}, testObject) // => false
     * _.is(testObject, testObject) // => true
     * _.is("foo", "foo") // => true
     * _.is(0, -0) // => false
     * _.is(0 / 0, NaN) // => true
     *
     * @memberof module:lamb
     * @category Logic
     * @see {@link module:lamb.isSVZ|isSVZ} to perform a "SameValueZero" comparison
     * @see [SameValue comparison]{@link http://www.ecma-international.org/ecma-262/6.0/#sec-samevalue}
     * @see [SameValueZero comparison]{@link http://www.ecma-international.org/ecma-262/6.0/#sec-samevaluezero}
     * @param {*} a
     * @param {*} b
     * @returns {Boolean}
     */
    function is (a, b) {
        return a === 0 && b === 0 ? 1 / a === 1 / b : isSVZ(a, b);
    }

    /**
     * Verifies that the first given value is greater than the second.
     * @example
     * var pastDate = new Date(2010, 2, 12);
     * var today = new Date();
     *
     * _.isGT(today, pastDate) // => true
     * _.isGT(pastDate, today) // => false
     * _.isGT(3, 4) // => false
     * _.isGT(3, 3) // => false
     * _.isGT(3, 2) // => true
     * _.isGT(0, -0) // => false
     * _.isGT(-0, 0) // => false
     * _.isGT("a", "A") // => true
     * _.isGT("b", "a") // => true
     *
     * @memberof module:lamb
     * @category Logic
     * @see {@link module:lamb.isGTE|isGTE}
     * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
     * @param {Number|String|Date|Boolean} a
     * @param {Number|String|Date|Boolean} b
     * @returns {Boolean}
     */
    function isGT (a, b) {
        return a > b;
    }

    /**
     * Verifies that the first given value is greater than or equal to the second.
     * Regarding equality, beware that this is simply a wrapper for the native operator,
     * so <code>-0 === 0</code>.
     * @example
     * _.isGTE(3, 4) // => false
     * _.isGTE(3, 3) // => true
     * _.isGTE(3, 2) // => true
     * _.isGTE(0, -0) // => true
     * _.isGTE(-0, 0) // => true
     *
     * @memberof module:lamb
     * @category Logic
     * @see {@link module:lamb.isGT|isGT}
     * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
     * @param {Number|String|Date|Boolean} a
     * @param {Number|String|Date|Boolean} b
     * @returns {Boolean}
     */
    function isGTE (a, b) {
        return a >= b;
    }

    /**
     * Verifies that the first given value is less than the second.
     * @example
     * var pastDate = new Date(2010, 2, 12);
     * var today = new Date();
     *
     * _.isLT(today, pastDate) // => false
     * _.isLT(pastDate, today) // => true
     * _.isLT(3, 4) // => true
     * _.isLT(3, 3) // => false
     * _.isLT(3, 2) // => false
     * _.isLT(0, -0) // => false
     * _.isLT(-0, 0) // => false
     * _.isLT("a", "A") // => false
     * _.isLT("a", "b") // => true
     *
     * @memberof module:lamb
     * @category Logic
     * @see {@link module:lamb.isLTE|isLTE}
     * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
     * @param {Number|String|Date|Boolean} a
     * @param {Number|String|Date|Boolean} b
     * @returns {Boolean}
     */
    function isLT (a, b) {
        return a < b;
    }

    /**
     * Verifies that the first given value is less than or equal to the second.
     * Regarding equality, beware that this is simply a wrapper for the native operator,
     * so <code>-0 === 0</code>.
     * @example
     * _.isLTE(3, 4) // => true
     * _.isLTE(3, 3) // => true
     * _.isLTE(3, 2) // => false
     * _.isLTE(0, -0) // => true
     * _.isLTE(-0, 0) // => true
     *
     * @memberof module:lamb
     * @category Logic
     * @see {@link module:lamb.isLT|isLT}
     * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
     * @param {Number|String|Date|Boolean} a
     * @param {Number|String|Date|Boolean} b
     * @returns {Boolean}
     */
    function isLTE (a, b) {
        return a <= b;
    }

    /**
     * A simple negation of {@link module:lamb.is|is}, exposed for convenience.
     * @example
     * _.isNot("foo", "foo") // => false
     * _.isNot(0, -0) // => true
     *
     * @memberof module:lamb
     * @category Logic
     * @function
     * @see {@link module:lamb.is|is}
     * @param {*} valueA
     * @param {*} valueB
     * @returns {Boolean}
     */
    var isNot = not(is);

    /**
     * Verifies that the two supplied values are the same value using the "SameValueZero" comparison.<br/>
     * With this comparison <code>NaN</code> is equal to itself, but <code>0</code> and <code>-0</code> are
     * considered the same value.
     * @example
     * var testObject = {};
     *
     * _.isSVZ({}, testObject) // => false
     * _.isSVZ(testObject, testObject) // => true
     * _.isSVZ("foo", "foo") // => true
     * _.isSVZ(0, -0) // => true
     * _.isSVZ(0 / 0, NaN) // => true
     *
     * @memberof module:lamb
     * @category Logic
     * @see {@link module:lamb.is|is} to perform a "SameValue" comparison
     * @see [SameValue comparison]{@link http://www.ecma-international.org/ecma-262/6.0/#sec-samevalue}
     * @see [SameValueZero comparison]{@link http://www.ecma-international.org/ecma-262/6.0/#sec-samevaluezero}
     * @param {*} a
     * @param {*} b
     * @returns {Boolean}
     */
    function isSVZ (a, b) {
        // eslint-disable-next-line no-self-compare
        return a !== a ? b !== b : a === b;
    }

    /**
     * Returns a predicate that negates the given one.
     * @example
     * var isEven = function (n) { return n % 2 === 0; };
     * var isOdd = _.not(isEven);
     *
     * isOdd(5) // => true
     * isOdd(4) // => false
     *
     * @memberof module:lamb
     * @category Logic
     * @param {Function} predicate
     * @returns {Function}
     */
    function not (predicate) {
        return function () {
            return !predicate.apply(this, arguments);
        };
    }

    /**
     * Builds a unary function that will check its argument against the given predicate.
     * If the predicate isn't satisfied, the provided <code>fn</code> function will be
     * applied to the same value. The received argument is returned as it is otherwise.<br/>
     * See {@link module:lamb.when|when} for the opposite behaviour.<br/>
     * It's a shortcut for a common use case of {@link module:lamb.condition|condition},
     * where its <code>trueFn</code> parameter is the [identity function]{@link module:lamb.identity}.
     * @example
     * var isEven = function (n) { return n % 2 === 0};
     * var halve = function (n) { return n / 2; };
     * var halveUnlessIsEven = _.unless(isEven, halve);
     *
     * halveUnlessIsEven(5) // => 2.5
     * halveUnlessIsEven(6) // => 6
     *
     * @memberof module:lamb
     * @category Logic
     * @see {@link module:lamb.condition|condition}
     * @see {@link module:lamb.when|when}
     * @param {Function} predicate
     * @param {Function} fn
     * @returns {Function}
     */
    function unless (predicate, fn) {
        return function (value) {
            return predicate.call(this, value) ? value : fn.call(this, value);
        };
    }

    /**
     * Builds a unary function that will check its argument against the given predicate.
     * If the predicate is satisfied, the provided <code>fn</code> function will be
     * applied to the same value. The received argument is returned as it is otherwise.<br/>
     * See {@link module:lamb.unless|unless} for the opposite behaviour.<br/>
     * It's a shortcut for a common use case of {@link module:lamb.condition|condition},
     * where its <code>falseFn</code> parameter is the [identity function]{@link module:lamb.identity}.
     * @example
     * var isEven = function (n) { return n % 2 === 0};
     * var halve = function (n) { return n / 2; };
     * var halveIfEven = _.when(isEven, halve);
     *
     * halveIfEven(5) // => 5
     * halveIfEven(6) // => 3
     *
     * @memberof module:lamb
     * @category Logic
     * @see {@link module:lamb.condition|condition}
     * @see {@link module:lamb.unless|unless}
     * @param {Function} predicate
     * @param {Function} fn
     * @returns {Function}
     */
    function when (predicate, fn) {
        return function (value) {
            return predicate.call(this, value) ? fn.call(this, value) : value;
        };
    }

    lamb.adapter = adapter;
    lamb.allOf = allOf;
    lamb.anyOf = anyOf;
    lamb.condition = condition;
    lamb.is = is;
    lamb.isGT = isGT;
    lamb.isGTE = isGTE;
    lamb.isLT = isLT;
    lamb.isLTE = isLTE;
    lamb.isNot = isNot;
    lamb.isSVZ = isSVZ;
    lamb.not = not;
    lamb.unless = unless;
    lamb.when = when;

    /**
     * Adds two numbers.
     * @example
     * _.add(4, 5) // => 9
     *
     * @memberof module:lamb
     * @category Math
     * @param {Number} a
     * @param {Number} b
     * @returns {Number}
     */
    function add (a, b) {
        return a + b;
    }

    /**
     * "Clamps" a number within the given limits, both included.<br/>
     * The function will convert to number all its parameters before starting any
     * evaluation, and will return <code>NaN</code> if <code>min</code> is greater
     * than <code>max</code>.
     * @example
     * _.clamp(-5, 0, 10) // => 0
     * _.clamp(5, 0, 10) // => 5
     * _.clamp(15, 0, 10) // => 10
     * _.clamp(0, 0, 10) // => 0
     * _.clamp(10, 0, 10) // => 10
     * _.is(_.clamp(-0, 0, 10), -0) // => true
     * _.clamp(10, 20, 15) // => NaN
     *
     * @memberof module:lamb
     * @category Math
     * @see {@link module:lamb.clampWithin|clampWithin}
     * @param {Number} n
     * @param {Number} min
     * @param {Number} max
     * @returns {Number}
     */
    function clamp (n, min, max) {
        n = +n;
        min = +min;
        max = +max;

        if (min > max) {
            return NaN;
        } else {
            return n < min ? min : n > max ? max : n;
        }
    }

    /**
     * A curried version of {@link module:lamb.clamp|clamp}, expecting a <code>min</code>
     * and a <code>max</code> value, that builds a function waiting for the number to clamp.
     * @example
     * _.clampWithin(0, 10)(-5) // => 0
     * _.clampWithin(0, 10)(5) // => 5
     * _.clampWithin(0, 10)(15) // => 10
     * _.clampWithin(0, 10)(0) // => 0
     * _.clampWithin(0, 10)(10) // => 10
     * _.is(_.clampWithin(0, 10)(-0), -0) // => true
     * _.clampWithin(20, 15)(10) // => NaN
     *
     * @memberof module:lamb
     * @category Math
     * @see {@link module:lamb.clamp|clamp}
     * @param {Number} min
     * @param {Number} max
     * @returns {Function}
     */
    function clampWithin (min, max) {
        return function (n) {
            return clamp(n, min, max);
        };
    }

    /**
     * Divides two numbers.
     * @example
     * _.divide(5, 2) // => 2.5
     *
     * @memberof module:lamb
     * @category Math
     * @param {Number} a
     * @param {Number} b
     * @returns {Number}
     */
    function divide (a, b) {
        return a / b;
    }

    /**
     * Generates a sequence of values of the desired length with the provided iteratee.
     * The values being iterated, and received by the iteratee, are the results generated so far.
     * @example
     * var fibonacci = function (n, idx, results) {
     *     return n + (results[idx - 1] || 0);
     * };
     *
     * _.generate(1, 10, fibonacci) // => [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
     *
     * @memberof module:lamb
     * @category Math
     * @see {@link module:lamb.range|range}
     * @param {*} start - The starting value
     * @param {Number} len - The desired length for the sequence
     * @param {ListIteratorCallback} iteratee
     * @param {Object} [iterateeContext]
     * @returns {Array}
     */
    function generate (start, len, iteratee, iterateeContext) {
        var result = [start];

        if (arguments.length === 4) {
            iteratee = iteratee.bind(iterateeContext);
        }

        for (var i = 0, limit = len - 1; i < limit; i++) {
            result.push(iteratee(result[i], i, result));
        }

        return result;
    }

    /**
     * Verifies whether the received value is a finite number.<br/>
     * Behaves almost as a shim of ES6's [Number.isFinite]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite},
     * but with a difference: it will return <code>true</code> even for Number object's instances.
     * @example
     * _.isFinite(5) // => true
     * _.isFinite(new Number(5)) // => true
     * _.isFinite(Infinity) // => false
     * _.isFinite(-Infinity) // => false
     * _.isFinite("5") // => false
     * _.isFinite(NaN) // => false
     * _.isFinite(null) // => false
     *
     * @memberof module:lamb
     * @category Math
     * @alias isFinite
     * @param {*} value
     * @returns {Boolean}
     */
    function isFinite_ (value) {
        return type(value) === "Number" && isFinite(value);
    }

    /**
     * Verifies whether the received value is a number and an integer.
     * Behaves almost as a shim of ES6's [Number.isInteger]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger},
     * but with a difference: it will return <code>true</code> even for Number object's instances.
     * @example
     * _.isInteger(5) // => true
     * _.isInteger(new Number(5)) // => true
     * _.isInteger(2.5) // => false
     * _.isInteger(Infinity) // => false
     * _.isInteger(-Infinity) // => false
     * _.isInteger("5") // => false
     * _.isInteger(NaN) // => false
     *
     * @memberof module:lamb
     * @category Math
     * @see {@link module:lamb.isSafeInteger|isSafeInteger}
     * @param {*} value
     * @returns {Boolean}
     */
    function isInteger (value) {
        return type(value) === "Number" && value % 1 === 0;
    }

    /**
     * Verifies whether the received value is a "safe integer", meaning that is a number and that
     * can be exactly represented as an IEEE-754 double precision number.
     * The safe integers consist of all integers from -(2<sup>53</sup> - 1) inclusive to
     * 2<sup>53</sup> - 1 inclusive.<br/>
     * Behaves almost as a shim of ES6's [Number.isSafeInteger]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger},
     * but with a difference: it will return <code>true</code> even for Number object's instances.
     * @example
     * _.isSafeInteger(5) // => true
     * _.isSafeInteger(new Number(5)) // => true
     * _.isSafeInteger(Math.pow(2, 53) - 1) // => true
     * _.isSafeInteger(Math.pow(2, 53)) // => false
     * _.isSafeInteger(2e32) // => false
     * _.isSafeInteger(2.5) // => false
     * _.isSafeInteger(Infinity) // => false
     * _.isSafeInteger(-Infinity) // => false
     * _.isSafeInteger("5") // => false
     * _.isSafeInteger(NaN) // => false
     *
     * @memberof module:lamb
     * @category Math
     * @see {@link module:lamb.isInteger|isInteger}
     * @param {*} value
     * @returns {Boolean}
     */
    function isSafeInteger (value) {
        return isInteger(value) && Math.abs(value) <= 9007199254740991;
    }

    /**
     * Performs the modulo operation and should not be confused with the
     * {@link module:lamb.remainder|remainder}.
     * The function performs a floored division to calculate the result and not
     * a truncated one, hence the sign of the dividend is not kept, unlike the
     * {@link module:lamb.remainder|remainder}.
     * @example
     * _.modulo(5, 3) // => 2
     * _.remainder(5, 3) // => 2
     *
     * _.modulo(-5, 3) // => 1
     * _.remainder(-5, 3) // => -2
     *
     * @memberof module:lamb
     * @category Math
     * @see {@link module:lamb.remainder|remainder}
     * @see [Modulo operation on Wikipedia]{@link http://en.wikipedia.org/wiki/Modulo_operation}
     * @param {Number} a
     * @param {Number} b
     * @returns {Number}
     */
    function modulo (a, b) {
        return a - (b * Math.floor(a / b));
    }

    /**
     * Multiplies two numbers.
     * @example
     * _.multiply(5, 3) // => 15
     *
     * @memberof module:lamb
     * @category Math
     * @param {Number} a
     * @param {Number} b
     * @returns {Number}
     */
    function multiply (a, b) {
        return a * b;
    }

    /**
     * Generates a random integer between two given integers, both included.
     * Note that no safety measure is taken if the provided arguments aren't integers, so
     * you may end up with unexpected (not really) results.
     * For example <code>randomInt(0.1, 1.2)</code> could be <code>2</code>.
     * @example
     *
     * _.randomInt(1, 10) // => an integer >=1 && <= 10
     *
     * @memberof module:lamb
     * @category Math
     * @param {Number} min
     * @param {Number} max
     * @returns {Number}
     */
    function randomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Generates an arithmetic progression of numbers starting from <code>start</code> up to,
     * but not including, <code>limit</code>, using the given <code>step</code>.
     * @example
     * _.range(2, 10) // => [2, 3, 4, 5, 6, 7, 8, 9]
     * _.range(2, 10, 0) // => [2]
     * _.range(1, -10, -2) // => [1, -1, -3, -5, -7, -9]
     * _.range(1, -10, 2) // => [1]
     *
     * @memberof module:lamb
     * @category Math
     * @see {@link module:lamb.generate|generate}
     * @param {Number} start
     * @param {Number} limit
     * @param {Number} [step=1]
     * @returns {Number[]}
     */
    function range (start, limit, step) {
        if (step === 0 || arguments.length < 2) {
            return [start];
        }

        if (!step) {
            step = 1;
        }

        var len = Math.max(Math.ceil((limit - start) / step), 0);

        return generate(start, len, partial(add, step));
    }

    /**
     * Gets the remainder of the division of two numbers.
     * Not to be confused with the {@link module:lamb.modulo|modulo} as the remainder
     * keeps the sign of the dividend and may lead to some unexpected results.
     * @example
     * // example of wrong usage of the remainder
     * // (in this case the modulo operation should be used)
     * var isOdd = function (n) { return _.remainder(n, 2) === 1; };
     * isOdd(-3) // => false as -3 % 2 === -1
     *
     * @memberof module:lamb
     * @category Math
     * @see {@link module:lamb.modulo|modulo}
     * @see [Modulo operation on Wikipedia]{@link http://en.wikipedia.org/wiki/Modulo_operation}
     * @param {Number} a
     * @param {Number} b
     * @returns {Number}
     */
    function remainder (a, b) {
        return a % b;
    }

    /**
     * Subtracts two numbers.
     * @example
     * _.subtract(5, 3) // => 2
     *
     * @memberof module:lamb
     * @category Math
     * @param {Number} a
     * @param {Number} b
     * @returns {Number}
     */
    function subtract (a, b) {
        return a - b;
    }

    lamb.add = add;
    lamb.clamp = clamp;
    lamb.clampWithin = clampWithin;
    lamb.divide = divide;
    lamb.generate = generate;
    lamb.isFinite = isFinite_;
    lamb.isInteger = isInteger;
    lamb.isSafeInteger = isSafeInteger;
    lamb.modulo = modulo;
    lamb.multiply = multiply;
    lamb.randomInt = randomInt;
    lamb.range = range;
    lamb.remainder = remainder;
    lamb.subtract = subtract;

    /**
     * Accepts a constructor and builds a predicate expecting an object,
     * which will be tested to verify whether the prototype of the constructor
     * is in its prototype chain.<br/>
     * Wraps in a convenient way the native
     * [instanceof]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof} operator.
     * @example
     * function SomeObjA () {}
     *
     * var a = new SomeObjA();
     * var sObj = new String("foo");
     * var s = "foo";
     *
     * _.isInstanceOf(Object)(a) // => true
     * _.isInstanceOf(SomeObjA)(a) // => true
     *
     * _.isInstanceOf(Object)(sObj) // => true
     * _.isInstanceOf(String)(sObj) // => true
     *
     * _.isInstanceOf(Object)(s) // => false
     * _.isInstanceOf(String)(s) // => false
     *
     * @memberof module:lamb
     * @category Type
     * @see {@link module:lamb.isType|isType}
     * @param {*} constructor
     * @returns {Function}
     */
    function isInstanceOf (constructor) {
        return function (obj) {
            return obj instanceof constructor;
        };
    }

    /**
     * Verifies if a value is <code>null</code> or <code>undefined</code>.
     * @example
     * _.isNil(NaN) // => false
     * _.isNil({}) // => false
     * _.isNil(null) // => true
     * _.isNil(void 0) // => true
     * _.isNil() // => true
     *
     * @memberof module:lamb
     * @category Type
     * @see {@link module:lamb.isNull|isNull}
     * @see {@link module:lamb.isUndefined|isUndefined}
     * @param {*} value
     * @returns {Boolean}
     */
    function isNil (value) {
        return isNull(value) || isUndefined(value);
    }

    /**
     * Verifies if a value is <code>null</code>.
     * @example
     * _.isNull(null) // => true
     * _.isNull(void 0) // => false
     * _.isNull(false) // => false
     *
     * @memberof module:lamb
     * @category Type
     * @see {@link module:lamb.isNil|isNil} if you want to check for <code>undefined</code> too.
     * @param {*} value
     * @returns {Boolean}
     */
    function isNull (value) {
        return value === null;
    }

    /**
     * Builds a predicate that expects a value to check against the specified type.
     * @example
     * var isString = _.isType("String");
     *
     * isString("Hello") // => true
     * isString(new String("Hi")) // => true
     *
     * @memberof module:lamb
     * @category Type
     * @see {@link module:lamb.type|type}
     * @param {String} typeName
     * @returns {Function}
     */
    function isType (typeName) {
        return function (value) {
            return type(value) === typeName;
        };
    }

    /**
     * Verifies if a value is <code>undefined</code>.
     * @example
     * _.isUndefined(null) // => false
     * _.isUndefined(void 0) // => true
     * _.isUndefined(false) // => false
     *
     * @memberof module:lamb
     * @category Type
     * @see {@link module:lamb.isNil|isNil} if you want to check for <code>null</code> too.
     * @param {*} value
     * @returns {Boolean}
     */
    function isUndefined (value) {
        return value === void 0;
    }

    /**
     * Retrieves the "type tag" from the given value.
     * @example
     * var x = 5;
     * var y = new Number(5);
     *
     * typeof x // => "number"
     * typeof y // => "object"
     * _.type(x) // => "Number"
     * _.type(y) // => "Number"
     *
     * _.type(Object.prototype.toString) // => "Function"
     * _.type(/a/) // => "RegExp"
     *
     * @memberof module:lamb
     * @category Type
     * @see {@link module:lamb.isType|isType}
     * @param {*} value
     * @returns {String}
     */
    function type (value) {
        return _objectProto.toString.call(value).slice(8, -1);
    }

    lamb.isInstanceOf = isInstanceOf;
    lamb.isNil = isNil;
    lamb.isNull = isNull;
    lamb.isType = isType;
    lamb.isUndefined = isUndefined;
    lamb.type = type;

    /**
     * A curried version of {@link module:lamb.getIndex|getIndex} that uses the provided index
     * to build a function expecting the array-like object holding the element we want to retrieve.
     * @example
     * var getFifthElement = _.getAt(4);
     *
     * getFifthElement([1, 2, 3, 4, 5]) // => 5
     * getFifthElement("foo bar") // => "b"
     * getFifthElement([]) // => undefined
     * getFifthElement("foo") // => undefined
     *
     * @example <caption>Using negative indexes:</caption>
     * _.getAt(-2)([1, 2, 3]) // => 2
     * _.getAt(-3)("foo") // => "f"
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.getIndex|getIndex}
     * @see {@link module:lamb.head|head} and {@link module:lamb.last|last} for common use cases shortcuts.
     * @param {Number} index
     * @returns {Function}
     */
    function getAt (index) {
        return function (arrayLike) {
            return getIndex(arrayLike, index);
        };
    }

    /**
     * Returns the value of the object property with the given key.
     * @example
     * var user = {name: "John"};
     *
     * _.getIn(user, "name") // => "John";
     * _.getIn(user, "surname") // => undefined
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.getKey|getKey}
     * @see {@link module:lamb.getPath|getPath}, {@link module:lamb.getPathIn|getPathIn}
     * @param {Object} obj
     * @param {String} key
     * @returns {*}
     */
    function getIn (obj, key) {
        return obj[key];
    }

    /**
     * Retrieves the element at the given index in an array-like object.<br/>
     * Like {@link module:lamb.slice|slice} the index can be negative.<br/>
     * If the index isn't supplied, or if its value isn't an integer within the array-like bounds,
     * the function will return <code>undefined</code>.<br/>
     * <code>getIndex</code> will throw an exception when receives <code>null</code> or
     * <code>undefined</code> in place of an array-like object, but returns <code>undefined</code>
     * for any other value.
     * @example
     * var arr = [1, 2, 3, 4, 5];
     *
     * _.getIndex(arr, 1) // => 2
     * _.getIndex(arr, -1) // => 5
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.getAt|getAt}
     * @see {@link module:lamb.head|head} and {@link module:lamb.last|last} for common use cases shortcuts.
     * @param {ArrayLike} arrayLike
     * @param {Number} index
     * @returns {*}
     */
    function getIndex (arrayLike, index) {
        var idx = _toNaturalIndex(index, _toArrayLength(arrayLike.length));

        return isNaN(idx) ? void 0 : arrayLike[idx];
    }

    /**
     * A curried version of {@link module:lamb.getIn|getIn}.<br/>
     * Receives a property name and builds a function expecting the object from which we want to retrieve
     * the property.
     * @example
     * var user1 = {name: "john"};
     * var user2 = {name: "jane"};
     * var getName = _.getKey("name");
     *
     * getName(user1) // => "john"
     * getName(user2) // => "jane"
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.getIn|getIn}
     * @see {@link module:lamb.getPath|getPath}, {@link module:lamb.getPathIn|getPathIn}
     * @param {String} key
     * @returns {Function}
     */
    function getKey (key) {
        return function (obj) {
            return getIn(obj, key);
        };
    }

    /**
     * Builds a partial application of {@link module:lamb.getPathIn|getPathIn} with the given
     * path and separator, expecting the object to act upon.<br/>
     * @example
     *  var user = {
     *     name: "John",
     *     surname: "Doe",
     *     login: {
     *         "user.name": "jdoe",
     *         password: "abc123"
     *     }
     * };
     *
     * var getPwd = _.getPath("login.password");
     * var getUsername = _.getPath("login/user.name", "/");
     *
     * getPwd(user) // => "abc123";
     * getUsername(user) // => "jdoe"
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.getPathIn|getPathIn}
     * @see {@link module:lamb.getIn|getIn}, {@link module:lamb.getKey|getKey}
     * @param {String} path
     * @param {String} [separator="."]
     * @returns {Function}
     */
    function getPath (path, separator) {
        return partial(getPathIn, _, path, separator);
    }

    /**
     * Gets a nested property value from an object using the given path.<br/>
     * The path is a string with property names separated by dots by default, but
     * it can be customised with the optional third parameter.<br/>
     * You can use integers in the path, even negative ones, to refer to array-like
     * object indexes, but the priority will be given to existing object keys:
     * the last example explains this particular case.
     * @example
     * var user = {
     *     name: "John",
     *     surname: "Doe",
     *     login: {
     *         "user.name": "jdoe",
     *         password: "abc123"
     *     },
     *     scores: [
     *         {id: 1, value: 10},
     *         {id: 2, value: 20},
     *         {id: 3, value: 30}
     *     ]
     * };
     *
     * _.getPathIn(user, "name") // => "John"
     * _.getPathIn(user, "login.password") // => "abc123";
     * _.getPathIn(user, "login/user.name", "/") // => "jdoe"
     * _.getPathIn(user, "name.foo") // => undefined
     * _.getPathIn(user, "name.foo.bar") // => undefined
     *
     * @example <caption>Accessing array-like objects indexes:</caption>
     * _.getPathIn(user, "login.password.1") // => "b"
     * _.getPathIn(user, "scores.0") // => {id: 1, value: 10}
     * _.getPathIn(user, "scores.-1.value") // => 30
     *
     * @example <caption>Priority will be given to existing object keys over indexes:</caption>
     * _.getPathIn(user, "scores.-1") // => {id: 3, value: 30}
     *
     * // let's do something funny
     * user.scores["-1"] = "foo bar";
     *
     * _.getPathIn(user, "scores.-1") // => "foo bar";
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.getPath|getPath}
     * @see {@link module:lamb.getIn|getIn}, {@link module:lamb.getKey|getKey}
     * @param {Object|ArrayLike} obj
     * @param {String} path
     * @param {String} [separator="."]
     * @returns {*}
     */
    function getPathIn (obj, path, separator) {
        var pathInfo = _getPathInfo(obj, _toPathParts(path, separator), true);

        return pathInfo.target;
    }

    /**
     * Retrieves the first element of an array-like object.<br/>
     * Just a common use case of {@link module:lamb.getAt|getAt} exposed for convenience.
     * @example
     * _.head([1, 2, 3]) // => 1
     * _.head("hello") // => "h"
     * _.head([]) // => undefined
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.last|last}
     * @see {@link module:lamb.getIndex|getIndex}, {@link module:lamb.getAt|getAt}
     * @param {ArrayLike} arrayLike
     * @returns {*}
     */
    var head = getAt(0);

    /**
     * Retrieves the last element of an array-like object.<br/>
     * Just a common use case of {@link module:lamb.getAt|getAt} exposed for convenience.
     * @example
     * _.last([1, 2, 3]) // => 3
     * _.last("hello") // => "o"
     * _.last([]) // => undefined
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.head|head}
     * @see {@link module:lamb.getIndex|getIndex}, {@link module:lamb.getAt|getAt}
     * @param {ArrayLike} arrayLike
     * @returns {*}
     */
    var last = getAt(-1);

    /**
     * Builds a function that creates a copy of an array-like object with the given
     * index changed to the desired value.<br/>
     * If the index is not an integer or if it's out of bounds, the function
     * will return a copy of the original array.<br/>
     * Negative indexes are allowed.
     * @example
     * var arr = [1, 2, 3, 4, 5];
     *
     * _.setAt(2, 99)(arr) // => [1, 2, 99, 4, 5]
     * arr // => [1, 2, 3, 4, 5]
     *
     * _.setAt(10, 99)(arr) // => [1, 2, 3, 4, 5] (not a reference to `arr`)
     *
     * @example <caption>Using negative indexes:</caption>
     * _.setAt(-1, 99)(arr) // => [1, 2, 3, 4, 99]
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.setIndex|setIndex}
     * @param {Number} index
     * @param {*} value
     * @returns {Function}
     */
    function setAt (index, value) {
        return function (arrayLike) {
            return _setIndex(arrayLike, index, value);
        };
    }

    /**
     * Sets the specified key to the given value in a copy of the provided object.<br/>
     * All the remaining enumerable keys of the source object will be simply copied in the
     * result object without breaking references.<br/>
     * If the specified key is not part of the source object, it will be added to the
     * result.<br/>
     * The main purpose of the function is to work on simple plain objects used as
     * data structures, such as JSON objects, and makes no effort to play nice with
     * objects created from an OOP perspective (it's not worth it).<br/>
     * For example the prototype of the result will be <code>Object</code>'s regardless
     * of the <code>source</code>'s one.
     * @example
     * var user = {name: "John", surname: "Doe", age: 30};
     *
     * _.setIn(user, "name", "Jane") // => {name: "Jane", surname: "Doe", age: 30}
     * _.setIn(user, "gender", "male") // => {name: "John", surname: "Doe", age: 30, gender: "male"}
     *x
     * // `user` still is {name: "John", surname: "Doe", age: 30}
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.setKey|setKey}
     * @see {@link module:lamb.setPath|setPath}, {@link module:lamb.setPathIn|setPathIn}
     * @param {Object} source
     * @param {String} key
     * @param {*} value
     * @returns {Object}
     */
    function setIn (source, key, value) {
        if (isNil(source)) {
            throw _makeTypeErrorFor(source, "object");
        }

        return _setIn(source, key, value);
    }

    /**
     * Creates a copy of an array-like object with the given index changed to
     * the desired value.<br/>
     * If the index is not an integer or if it's out of bounds, the function
     * will return a copy of the original array.<br/>
     * Negative indexes are allowed.
     * @example
     * var arr = [1, 2, 3];
     *
     * _.setIndex(arr, 1, 99) // => [1, 99, 3]
     * _.setIndex(arr, -1, 99) // => [1, 2, 99]
     * _.setIndex(arr, 10, 99) // => [1, 2, 3] (not a reference to `arr`)
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.setAt|setAt}
     * @param {ArrayLike} arrayLike
     * @param {Number} index
     * @param {*} value
     * @returns {Array}
     */
    var setIndex = aritize(_setIndex, 3);

    /**
     * Builds a partial application of {@link module:lamb.setIn|setIn} with the provided
     * <code>key</code> and <code>value</code>.<br/>
     * The resulting function expects the object to act upon.<br/>
     * Please refer to {@link module:lamb.setIn|setIn}'s description for explanations about
     * how the copy of the source object is made.
     * @example
     * var user = {name: "John", surname: "Doe", age: 30};
     * var setAgeTo40 = _.setKey("age", 40);
     *
     * setAgeTo40(user) // => {name: "john", surname: "doe", age: 40}
     *
     * // `user` still is {name: "John", surname: "Doe", age: 30}
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.setIn|setIn}
     * @see {@link module:lamb.setPath|setPath}, {@link module:lamb.setPathIn|setPathIn}
     * @param {String} key
     * @param {*} value
     * @returns {Function}
     */
    function setKey (key, value) {
        return partial(setIn, _, key, value);
    }

    /**
     * Builds a partial application of {@link module:lamb.setPathIn|setPathIn} expecting the
     * object to act upon.<br/>
     * See {@link module:lamb.setPathIn|setPathIn} for more details and examples.
     * @example
     * var user = {id: 1, status: {active: false}};
     * var activate = _.setPath("status.active", true);
     *
     * activate(user) // => {id: 1, status: {active: true}}
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.setPathIn|setPathIn}
     * @see {@link module:lamb.setIn|setIn}, {@link module:lamb.setKey|setKey}
     * @param {String} path
     * @param {*} value
     * @param {String} [separator="."]
     * @returns {Function}
     */
    function setPath (path, value, separator) {
        return partial(setPathIn, _, path, value, separator);
    }

    /**
     * Allows to change a nested value in a copy of the provided object.<br/>
     * The function will delegate the "set action" to {@link module:lamb.setIn|setIn} or
     * {@link module:lamb.setAt|setAt} depending on the value encountered in the path,
     * so please refer to the documentation of those functions for specifics about the
     * implementation.<br/>
     * Note anyway that the distinction will be between <code>Array</code>s, delegated
     * to {@link module:lamb.setAt|setAt}, and everything else (including array-like objects),
     * which will be delegated to {@link module:lamb.setIn|setIn}.<br/>
     * As a result of that, array-like objects will be converted to objects having numbers as keys
     * and paths targeting non-object values will be converted to empty objects.<br/>
     * You can anyway target array elements using integers in the path, even negative ones, but
     * the priority will be given to existing, and enumerable, object keys.<br/>
     * Non-enumerable properties encountered in the path will be considered as non-existent properties.<br/>
     * Like {@link module:lamb.getPathIn|getPathIn} or {@link module:lamb.getPath|getPath} you can
     * use custom path separators.
     * @example
     * var user = {id: 1, status: {active : false, scores: [2, 4, 6]}};
     *
     * _.setPathIn(user, "status.active", true) // => {id: 1, status: {active : true, scores: [2, 4, 6]}}
     *
     * @example <caption>Targeting arrays:</caption>
     * _.setPathIn(user, "status.scores.0", 8) // => {id: 1, status: {active : false, scores: [8, 4, 6]}}
     *
     * // you can use negative indexes as well
     * _.setPathIn(user, "status.scores.-1", 8) // => {id: 1, status: {active : false, scores: [2, 4, 8]}}
     *
     * @example <caption>Arrays can also be part of the path and not necessarily its target:</caption>
     * var user = {id: 1, scores: [
     *     {value: 2, year: "2000"},
     *     {value: 4, year: "2001"},
     *     {value: 6, year: "2002"}
     * ]};
     *
     * var newUser = _.setPathIn(user, "scores.0.value", 8);
     * // "newUser" holds:
     * // {id: 1, scores: [
     * //     {value: 8, year: "2000"},
     * //     {value: 4, year: "2001"},
     * //     {value: 6, year: "2002"}
     * // ]}
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.setPath|setPath}
     * @see {@link module:lamb.setIn|setIn}, {@link module:lamb.setKey|setKey}
     * @param {Object|Array} source
     * @param {String} path
     * @param {*} value
     * @param {String} [separator="."]
     * @returns {Object|Array}
     */
    function setPathIn (source, path, value, separator) {
        if (isNil(source)) {
            throw _makeTypeErrorFor(source, "object");
        }

        return _setPathIn(source, _toPathParts(path, separator), value);
    }

    /**
     * Builds a function that creates a copy of an array-like object with the given index
     * changed by applying the provided function to its value.<br/>
     * If the index is not an integer or if it's out of bounds, the function will return
     * a copy of the original array.<br/>
     * Negative indexes are allowed.
     * @example
     * var arr = ["a", "b", "c"];
     * var toUpperCase = _.invoker("toUpperCase");
     *
     * _.updateAt(1, toUpperCase)(arr) // => ["a", "B", "c"]
     * _.updateAt(-1, toUpperCase)(arr) // => ["a", "b", "C"]
     * _.updateAt(10, toUpperCase)(arr) // => ["a", "b", "c"] (not a reference to `arr`)
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.updateIndex|updateIndex}
     * @param {Number} index
     * @param {Function} updater
     * @returns {Function}
     */
    function updateAt (index, updater) {
        return function (arrayLike) {
            return _setIndex(arrayLike, index, null, updater);
        };
    }

    /**
     * Creates a copy of the given object having the desired key value updated by applying
     * the provided function to it.<br/>
     * This function is meant for updating existing enumerable properties, and for those it
     * will delegate the "set action" to {@link module:lamb.setIn|setIn}; a copy of the
     * <code>source</code> is returned otherwise.
     * @example
     * var user = {name: "John", visits: 2};
     * var toUpperCase = _.invoker("toUpperCase");
     *
     * _.updateIn(user, "name", toUpperCase) // => {name: "JOHN", visits: 2}
     * _.updateIn(user, "surname", toUpperCase) // => {name: "John", visits: 2}
     *
     * @example <caption>Non-enumerable properties will be treated as non-existent:</caption>
     * var user = Object.create({name: "John"}, {visits: {value: 2}});
     * var increment = _.partial(_.add, 1);
     *
     * _.updateIn(user, "visits", increment) // => {name: "John", visits: 2}
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.updateKey|updateKey}
     * @see {@link module:lamb.updatePath|updatePath}, {@link module:lamb.updatePathIn|updatePathIn}
     * @param {Object} source
     * @param {String} key
     * @param {Function} updater
     * @returns {Object}
     */
    function updateIn (source, key, updater) {
        return _isEnumerable(source, key) ?
            _setIn(source, key, updater(source[key])) :
            _merge(enumerables, source);
    }

    /**
     * Creates a copy of an array-like object with the given index changed by applying the
     * provided function to its value.<br/>
     * If the index is not an integer or if it's out of bounds, the function will return
     * a copy of the original array.<br/>
     * Negative indexes are allowed.
     * @example
     * var arr = ["a", "b", "c"];
     * var toUpperCase = _.invoker("toUpperCase");
     *
     * _.updateIndex(arr, 1, toUpperCase) // => ["a", "B", "c"]
     * _.updateIndex(arr, -1, toUpperCase) // => ["a", "b", "C"]
     * _.updateIndex(arr, 10, toUpperCase) // => ["a", "b", "c"] (not a reference to `arr`)
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.updateAt|updateAt}
     * @param {ArrayLike} arrayLike
     * @param {Number} index
     * @param {Function} updater
     * @returns {Array}
     */
    var updateIndex = partial(_setIndex, _, _, null, _);

    /**
     * Builds a partial application of {@link module:lamb.updateIn|updateIn} with the provided
     * <code>key</code> and <code>updater</code>, expecting the object to act upon.<br/>
     * This function is meant for updating existing enumerable properties, and for those it
     * will delegate the "set action" to {@link module:lamb.setIn|setIn}; a copy of the
     * <code>source</code> is returned otherwise.
     * @example
     * var user = {name: "John", visits: 2};
     * var increment = _.partial(_.add, 1);
     * var incrementVisits = _.updateKey("visits", increment);
     *
     * incrementVisits(user) // => {name: "John", visits: 3}
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.updateIn|updateIn}
     * @see {@link module:lamb.updatePath|updatePath}, {@link module:lamb.updatePathIn|updatePathIn}
     * @param {String} key
     * @param {Function} updater
     * @returns {Function}
     */
    function updateKey (key, updater) {
        return partial(updateIn, _, key, updater);
    }

    /**
     * Builds a partial application of {@link module:lamb.updatePathIn|updatePathIn}
     * expecting the object to act upon.<br/>
     * This function is meant for updating existing enumerable properties, and for those it
     * will delegate the "set action" to {@link module:lamb.setPathIn|setPathIn}; a copy of the
     * <code>source</code> is returned otherwise.<br/>
     * Like the other "path" functions, negative indexes can be used to access array elements, but
     * the priority will be given to existing, and enumerable, object keys.
     * @example
     * var user = {id: 1, status: {scores: [2, 4, 6], visits: 0}};
     * var increment = _.partial(_.add, 1);
     * var incrementScores = _.updatePath("status.scores", _.mapWith(increment))
     *
     * incrementScores(user) // => {id: 1, status: {scores: [3, 5, 7], visits: 0}}
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.updatePathIn|updatePathIn}
     * @see {@link module:lamb.updateIn|updateIn}, {@link module:lamb.updateKey|updateKey}
     * @param {String} path
     * @param {Function} updater
     * @param {String} [separator="."]
     * @returns {Function}
     */
    function updatePath (path, updater, separator) {
        return partial(updatePathIn, _, path, updater, separator);
    }

    /**
     * Allows to change a nested value in a copy of the given object by applying the provided
     * function to it.<br/>
     * This function is meant for updating existing enumerable properties, and for those it
     * will delegate the "set action" to {@link module:lamb.setPathIn|setPathIn}; a copy of the
     * <code>source</code> is returned otherwise.<br/>
     * Like the other "path" functions, negative indexes can be used to access array elements, but
     * the priority will be given to existing, and enumerable, object keys.
     * @example
     * var user = {id: 1, status: {scores: [2, 4, 6], visits: 0}};
     * var inc = _.partial(_.add, 1);
     *
     * _.updatePathIn(user, "status.visits", inc) // => {id: 1, status: {scores: [2, 4, 6]}, visits: 1}
     *
     * @example <caption>Targeting arrays:</caption>
     * _.updatePathIn(user, "status.scores.0", inc) // => {id: 1, status: {scores: [3, 4, 6], visits: 0}}
     *
     * // you can use negative indexes as well
     * _.updatePathIn(user, "status.scores.-1", inc) // => {id: 1, status: {scores: [2, 4, 7], visits: 0}}
     *
     * @example <caption>Arrays can also be part of the path and not necessarily its target:</caption>
     * var user = {id: 1, scores: [
     *     {value: 2, year: "2000"},
     *     {value: 4, year: "2001"},
     *     {value: 6, year: "2002"}
     * ]};
     *
     * var newUser = _.updatePathIn(user, "scores.0.value", increment);
     * // "newUser" holds:
     * // {id: 1, scores: [
     * //     {value: 3, year: "2000"},
     * //     {value: 4, year: "2001"},
     * //     {value: 6, year: "2002"}
     * // ]}
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.updatePath|updatePath}
     * @see {@link module:lamb.updateIn|updateIn}, {@link module:lamb.updateKey|updateKey}
     * @param {Object|Array} source
     * @param {String} path
     * @param {Function} updater
     * @param {String} [separator="."]
     * @returns {Object|Array}
     */
    function updatePathIn (source, path, updater, separator) {
        var parts = _toPathParts(path, separator);
        var pathInfo = _getPathInfo(source, parts, false);

        if (pathInfo.isValid) {
            return _setPathIn(source, parts, updater(pathInfo.target));
        } else {
            return Array.isArray(source) ? slice(source, 0, source.length) : _merge(enumerables, source);
        }
    }

    lamb.getAt = getAt;
    lamb.getIn = getIn;
    lamb.getIndex = getIndex;
    lamb.getKey = getKey;
    lamb.getPath = getPath;
    lamb.getPathIn = getPathIn;
    lamb.head = head;
    lamb.last = last;
    lamb.setAt = setAt;
    lamb.setIn = setIn;
    lamb.setIndex = setIndex;
    lamb.setKey = setKey;
    lamb.setPath = setPath;
    lamb.setPathIn = setPathIn;
    lamb.updateAt = updateAt;
    lamb.updateIn = updateIn;
    lamb.updateIndex = updateIndex;
    lamb.updateKey = updateKey;
    lamb.updatePath = updatePath;
    lamb.updatePathIn = updatePathIn;

    /**
     * A curried version of {@link module:lamb.appendTo|appendTo} that uses the value to append
     * to build a function expecting the array-like object to act upon.
     * @example
     * var arr = [1, 2, 3, 4];
     *
     * _.append(5)(arr) // => [1, 2, 3, 4, 5]
     * _.append([5])(arr) // => [1, 2, 3, 4, [5]]
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.appendTo|appendTo}
     * @see {@link module:lamb.insert|insert}, {@link module:lamb.insertAt|insertAt}
     * @param {*} value
     * @returns {Function}
     */
    var append = _curry(appendTo, 2, true);

    /**
     * Appends the given value at the end of a copy of the provided array-like object.
     * @example
     * var arr = [1, 2, 3, 4];
     *
     * _.appendTo(arr, 5) // => [1, 2, 3, 4, 5]
     * _.appendTo(arr, [5]) // => [1, 2, 3, 4, [5]]
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.append|append}
     * @see {@link module:lamb.insert|insert}, {@link module:lamb.insertAt|insertAt}
     * @param {ArrayLike} arrayLike
     * @param {*} value
     * @returns {Array}
     */
    function appendTo (arrayLike, value) {
        return slice(arrayLike, 0, arrayLike.length).concat([value]);
    }

    /**
     * Returns an array of items present only in the first of the given arrays.<br/>
     * Note that this function uses the ["SameValueZero" comparison]{@link module:lamb.isSVZ|isSVZ}.
     * @example
     * var a1 = [1, 2, 3, 4];
     * var a2 = [2, 4, 5];
     * var a3 = [4, 5, 3, 1];
     *
     * _.difference(a1, a2) // => [1, 3]
     * _.difference(a1, a2, a3) // => []
     *
     * @memberof module:lamb
     * @category Array
     * @param {Array} array
     * @param {...Array} other
     * @returns {Array}
     */
    function difference (array) {
        var rest = flatMap(_argsTail.apply(null, arguments), dropN(0));
        var isInRest = partial(isIn, rest, _, 0);

        return filter(array, not(isInRest));
    }

    /**
     * Builds an array without the first <code>n</code> elements of the given array or array-like object.
     * Note that, being this only a shortcut for a specific use case of {@link module:lamb.slice|slice},
     * <code>n</code> can be a negative number.
     * @example
     * var arr = [1, 2, 3, 4, 5];
     *
     * _.drop(arr, 2) // => [3, 4, 5]
     * _.drop(arr, -1) // => [5]
     * _.drop(arr, -10) // => [1, 2, 3, 4, 5]
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.dropN|dropN}
     * @see {@link module:lamb.take|take}, {@link module:lamb.takeN|takeN}
     * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
     * @param {ArrayLike} arrayLike
     * @param {Number} n
     * @returns {Array}
     */
    function drop (arrayLike, n) {
        return slice(arrayLike, n, arrayLike.length);
    }

    /**
     * A curried version of {@link module:lamb.drop|drop} that expects the number of elements
     * to drop to build a function waiting for the list to take the elements from.
     * See the note and examples for {@link module:lamb.drop|drop} about passing a negative <code>n</code>.
     * @example
     * var drop2 = _.dropN(2);
     *
     * drop2([1, 2, 3, 4, 5]) // => [3, 4, 5]
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.drop|drop}
     * @see {@link module:lamb.take|take}, {@link module:lamb.takeN|takeN}
     * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
     * @param {Number} n
     * @returns {Function}
     */
    var dropN = _curry(drop, 2, true);

    /**
     * Builds a function that drops the first <code>n</code> elements satisfying a predicate
     * from an array or array-like object.
     * @example
     * var isEven = function (n) { return n % 2 === 0; };
     * var dropWhileIsEven = _.dropWhile(isEven);
     *
     * dropWhileIsEven([2, 4, 6, 8]) // => []
     * dropWhileIsEven([2, 4, 7, 8]) // => [7, 8]
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.takeWhile|takeWhile}
     * @see {@link module:lamb.drop|drop}, {@link module:lamb.dropN|dropN}
     * @see {@link module:lamb.take|take}, {@link module:lamb.takeN|takeN}
     * @param {ListIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Function}
     */
    function dropWhile (predicate, predicateContext) {
        var fn = arguments.length === 2 ? _getNumConsecutiveHits : binary(_getNumConsecutiveHits);

        return function (arrayLike) {
            return slice(arrayLike, fn(arrayLike, predicate, predicateContext), arrayLike.length);
        };
    }

    /**
     * Similar to {@link module:lamb.map|map}, but if the mapping function returns an array this will
     * be concatenated, rather than pushed, to the final result.
     * @example <caption>Showing the difference with <code>map</code>:</caption>
     * var words = ["foo", "bar"];
     * var toCharArray = function (s) { return s.split(""); };
     *
     * _.map(words, toCharArray) // => [["f", "o", "o"], ["b", "a", "r"]]
     * _.flatMap(words, toCharArray) // => ["f", "o", "o", "b", "a", "r"]
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.flatMapWith|flatMapWith}
     * @see {@link module:lamb.map|map}, {@link module:lamb.mapWith|mapWith}
     * @param {Array} array
     * @param {ListIteratorCallback} iteratee
     * @param {Object} [iterateeContext]
     * @returns {Array}
     */
    function flatMap (array, iteratee, iterateeContext) {
        if (arguments.length === 3) {
            iteratee = iteratee.bind(iterateeContext);
        }

        return reduce(array, function (result, el, idx, arr) {
            var v = iteratee(el, idx, arr);

            if (!Array.isArray(v)) {
                v = [v];
            }

            for (var i = 0, len = v.length, rLen = result.length; i < len; i++) {
                result[rLen + i] = v[i];
            }

            return result;
        }, []);
    }

    /**
     * Builds a partial application of {@link module:lamb.flatMap|flatMap} using the given iteratee
     * and the optional context. The resulting function expects the array to act upon.
     * @example
     * var toCharArray = function (s) { return s.split(""); };
     * var wordsToCharArray = _.flatMapWith(toCharArray);
     *
     * wordsToCharArray(["foo", "bar"]) // => ["f", "o", "o", "b", "a", "r"]
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.flatMap|flatMap}
     * @see {@link module:lamb.map|map}, {@link module:lamb.mapWith|mapWith}
     * @param {ListIteratorCallback} iteratee
     * @param {Object} [iterateeContext]
     * @returns {Function}
     */
    var flatMapWith = _partialWithIteratee(flatMap);

    /**
     * Flattens an array.
     * @example <caption>Showing the difference with <code>shallowFlatten</code>:</caption>
     * var arr = [1, 2, [3, 4, [5, 6]], 7, 8];
     *
     * _.flatten(arr) // => [1, 2, 3, 4, 5, 6, 7, 8]
     * _.shallowFlatten(arr) // => [1, 2, 3, 4, [5, 6], 7, 8]
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.shallowFlatten|shallowFlatten}
     * @param {Array} array
     * @returns {Array}
     */
    function flatten (array) {
        return Array.isArray(array) ? _flatten(array, true, [], 0) : slice(array, 0, array.length);
    }

    /**
     * Returns a copy of the given array-like object without the last element.
     * @example
     * _.init([1, 2, 3, 4]) // => [1, 2, 3]
     * _.init([1]) // => []
     * _.init([]) // => []
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.tail|tail}
     * @see {@link module:lamb.head|head}, {@link module:lamb.last|last}
     * @param {ArrayLike} arrayLike
     * @returns {Array}
     */
    var init = partial(slice, _, 0, -1);

    /**
     * Inserts the provided element in a copy of an array-like object at the
     * specified index.<br/>
     * If the index is greater than the length of the array-like, the element
     * will be appended at the end.<br/>
     * Negative indexes are allowed; when a negative index is out of bounds
     * the element will be inserted at the start of the resulting array.
     * @example
     * var arr = [1, 2, 3, 4, 5];
     *
     * _.insert(arr, 3, 99) // => [1, 2, 3, 99, 4, 5]
     * _.insert(arr, -2, 99) // => [1, 2, 3, 99, 4, 5]
     * _.insert(arr, 10, 99) // => [1, 2, 3, 4, 5, 99]
     * _.insert(arr, -10, 99) // => [99, 1, 2, 3, 4, 5]
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.insertAt|insertAt}
     * @see {@link module:lamb.sortedInsert|sortedInsert}
     * @see {@link module:lamb.append|append}, {@link module:lamb.appendTo|appendTo}
     * @param {ArrayLike} arrayLike
     * @param {Number} index
     * @param {*} element
     * @returns {Array}
     */
    function insert (arrayLike, index, element) {
        var result = slice(arrayLike, 0, arrayLike.length);

        result.splice(index, 0, element);

        return result;
    }

    /**
     * Builds a partial application of {@link module:lamb.insert|insert}
     * expecting the array-like object to act upon.
     * @example
     * var arr = [1, 2, 3, 4, 5];
     *
     * _.insertAt(3, 99)(arr) // => [1, 2, 3, 99, 4, 5]
     * _.insertAt(-2, 99)(arr) // => [1, 2, 3, 99, 4, 5]
     * _.insertAt(10, 99)(arr) // => [1, 2, 3, 4, 5, 99]
     * _.insertAt(-10, 99)(arr) // => [99, 1, 2, 3, 4, 5]
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.insert|insert}
     * @see {@link module:lamb.sortedInsert|sortedInsert}
     * @see {@link module:lamb.append|append}, {@link module:lamb.appendTo|appendTo}
     * @param {Number} index
     * @param {*} element
     * @returns {Function}
     */
    function insertAt (index, element) {
        return partial(insert, _, index, element);
    }

    /**
     * Returns an array of every item that is included in all given arrays.<br>
     * Note that this function uses the ["SameValueZero" comparison]{@link module:lamb.isSVZ|isSVZ}.
     * @example
     * var a1 = [1, 2, 3, 4];
     * var a2 = [2, 5, 4, 6];
     * var a3 = [5, 6, 7];
     *
     * _.intersection(a1, a2) // => [2, 4]
     * _.intersection(a1, a3) // => []
     *
     * @memberof module:lamb
     * @category Array
     * @param {...Array} array
     * @returns {Array}
     */
    function intersection () {
        var rest = _argsTail.apply(null, arguments);

        return filter(uniques(arguments[0]), function (item) {
            return everyIn(rest, contains(item));
        });
    }

    /**
     * Splits an array-like object in two lists: the first with the elements satisfying the given predicate,
     * the others with the remaining elements.
     * @example
     * var isEven = function (n) { return n % 2 === 0; };
     * var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
     *
     * _.partition(numbers, isEven) // => [[2, 4, 6, 8, 10], [1, 3, 5, 7, 9]]
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.partitionWith|partitionWith}
     * @param {ArrayLike} arrayLike
     * @param {ListIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Array<Array<*>, Array<*>>}
     */
    function partition (arrayLike, predicate, predicateContext) {
        var result = [[], []];
        var len = arrayLike.length;

        if (arguments.length === 3) {
            predicate = predicate.bind(predicateContext);
        }

        for (var i = 0, el; i < len; i++) {
            el = arrayLike[i];
            result[predicate(el, i, arrayLike) ? 0 : 1].push(el);
        }

        return result;
    }

    /**
     * Builds a partial application of {@link module:lamb.partition|partition} using the given
     * predicate and the optional context.
     * The resulting function expects the array-like object to act upon.
     * @example
     * var users = [
     *     {"name": "Jane", "surname": "Doe", "active": false},
     *     {"name": "John", "surname": "Doe", "active": true},
     *     {"name": "Mario", "surname": "Rossi", "active": true},
     *     {"name": "Paolo", "surname": "Bianchi", "active": false}
     * ];
     * var isActive = _.hasKeyValue("active", true);
     * var splitByActiveStatus = _.partitionWith(isActive);
     *
     * splitByActiveStatus(users) // =>
     * // [[
     * //     {"name": "John", "surname": "Doe", "active": true},
     * //     {"name": "Mario", "surname": "Rossi", "active": true}
     * // ], [
     * //     {"name": "Jane", "surname": "Doe", "active": false},
     * //     {"name": "Paolo", "surname": "Bianchi", "active": false}
     * // ]]
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.partition|partition}
     * @param {ListIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Function}
     */
    var partitionWith = _partialWithIteratee(partition);

    /**
     * "Plucks" the values of the specified key from a list of objects.
     * @example
     * var persons = [
     *     {"name": "Jane", "surname": "Doe", "age": 12},
     *     {"name": "John", "surname": "Doe", "age": 40},
     *     {"name": "Mario", "surname": "Rossi", "age": 18},
     *     {"name": "Paolo", "surname": "Bianchi", "age": 15}
     * ];
     *
     * _.pluck(persons, "age") // => [12, 40, 18, 15]
     *
     * var lists = [
     *     [1, 2],
     *     [3, 4, 5],
     *     [6]
     * ];
     *
     * _.pluck(lists, "length") // => [2, 3, 1]
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.pluckKey|pluckKey}
     * @param {ArrayLike} arrayLike
     * @param {String} key
     * @returns {Array}
     */
    function pluck (arrayLike, key) {
        return map(arrayLike, getKey(key));
    }

    /**
     * A curried version of {@link module:lamb.pluck|pluck} expecting the key to retrieve to
     * build a function waiting for the array-like object to act upon.
     * @example
     * var persons = [
     *     {"name": "Jane", "surname": "Doe", "age": 12},
     *     {"name": "John", "surname": "Doe", "age": 40},
     *     {"name": "Mario", "surname": "Rossi", "age": 18},
     *     {"name": "Paolo", "surname": "Bianchi", "age": 15}
     * ];
     * var getAges = _.pluckKey("age");
     *
     * getAges(persons) // => [12, 40, 18, 15]
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.pluck|pluck}
     * @param {String} key
     * @returns {Function}
     */
    var pluckKey = compose(mapWith, getKey);

    /**
     * A curried version of {@link module:lamb.pullFrom|pullFrom} expecting
     * a list of values to build a function waiting for an array-like object.<br/>
     * The new function will create an array copy of the array-like without
     * the specified values.<br/>
     * The equality test is made with the ["SameValueZero" comparison]{@link module:lamb.isSVZ|isSVZ}.
     * @example
     * var scores = [40, 20, 30, 10];
     * var newScores = [30, 10];
     * var pullNewScores = _.pull(newScores);
     *
     * pullNewScores(scores) // => [40, 20]
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.pullFrom|pullFrom}
     * @param {ArrayLike} values
     * @returns {Function}
     */
    var pull = _curry(pullFrom, 2, true);

    /**
     * Creates an array copy of the given array-like object without the
     * specified values.<br/>
     * The equality test is made with the ["SameValueZero" comparison]{@link module:lamb.isSVZ|isSVZ}.
     * @example
     * var arr = [1, 2, 3, 4, 5];
     *
     * _.pullFrom(arr, [2, 5]) // => [1, 3, 4]
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.pull|pull}
     * @param {ArrayLike} arrayLike
     * @param {ArrayLike} values
     * @returns {Array}
     */
    function pullFrom (arrayLike, values) {
        return values ? filter(arrayLike, function (element) {
            return !isIn(values, element);
        }) : slice(arrayLike, 0, arrayLike.length);
    }

    /**
     * Flattens the "first level" of an array.
     * @example <caption>Showing the difference with <code>flatten</code>:</caption>
     * var arr = [1, 2, [3, 4, [5, 6]], 7, 8];
     *
     * _.flatten(arr) // => [1, 2, 3, 4, 5, 6, 7, 8]
     * _.shallowFlatten(arr) // => [1, 2, 3, 4, [5, 6], 7, 8]
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.flatten|flatten}
     * @param {Array} array
     * @returns {Array}
     */
    function shallowFlatten (array) {
        return Array.isArray(array) ? _flatten(array, false, [], 0) : slice(array, 0, array.length);
    }

    /**
     * Returns a copy of the given array-like object without the first element.
     * @example
     * _.tail([1, 2, 3, 4]) // => [2, 3, 4]
     * _.tail([1]) // => []
     * _.tail([]) // => []
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.init|init}
     * @see {@link module:lamb.head|head}, {@link module:lamb.last|last}
     * @param {ArrayLike} arrayLike
     * @returns {Array}
     */
    var tail = dropN(1);

    /**
     * Retrieves the first <code>n</code> elements from an array or array-like object.<br/>
     * Note that, being this a shortcut for a common use case of {@link module:lamb.slice|slice},
     * <code>n</code> can be a negative number.
     * @example
     * var arr = [1, 2, 3, 4, 5];
     *
     * _.take(arr, 3) // => [1, 2, 3]
     * _.take(arr, -1) // => [1, 2, 3, 4]
     * _.take(arr, -10) // => []
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.takeN|takeN}
     * @see {@link module:lamb.drop|drop}, {@link module:lamb.dropN|dropN}
     * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
     * @param {ArrayLike} arrayLike
     * @param {Number} n
     * @returns {Array}
     */
    var take = partial(slice, _, 0, _);

    /**
     * A curried version of {@link module:lamb.take|take} that expects the number of elements
     * to retrieve to build a function waiting for the list to take the elements from.
     * See the note and examples for {@link module:lamb.take|take} about passing a negative <code>n</code>.
     * @example
     * var take2 = _.takeN(2);
     *
     * take2([1, 2, 3, 4, 5]) // => [1, 2]
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.take|take}
     * @see {@link module:lamb.drop|drop}, {@link module:lamb.dropN|dropN}
     * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
     * @param {Number} n
     * @returns {Function}
     */
    var takeN = _curry(take, 2, true);

    /**
     * Builds a function that takes the first <code>n</code> elements satisfying a predicate from
     * an array or array-like object.
     * @example
     * var isEven = function (n) { return n % 2 === 0; };
     * var takeWhileIsEven = _.takeWhile(isEven);
     *
     * takeWhileIsEven([1, 2, 4, 6, 8]) // => []
     * takeWhileIsEven([2, 4, 7, 8]) // => [2, 4]
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.dropWhile|dropWhile}
     * @see {@link module:lamb.take|take}, {@link module:lamb.takeN|takeN}
     * @see {@link module:lamb.drop|drop}, {@link module:lamb.dropN|dropN}
     * @param {ListIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Function}
     */
    function takeWhile (predicate, predicateContext) {
        var fn = arguments.length === 2 ? _getNumConsecutiveHits : binary(_getNumConsecutiveHits);

        return function (arrayLike) {
            return slice(arrayLike, 0, fn(arrayLike, predicate, predicateContext));
        };
    }

    /**
     * Transposes a matrix. Can also be used to reverse a {@link module:lamb.zip|zip} operation.<br/>
     * Just like {@link module:lamb.zip|zip}, the received array-like objects will be truncated to the
     * shortest length.
     * @example <caption>Transposing a matrix:</caption>
     * _.transpose([
     *     [1, 2, 3],
     *     [4, 5, 6],
     *     [7, 8, 9]
     * ]) // =>
     * // [
     * //     [1, 4, 7],
     * //     [2, 5, 8],
     * //     [3, 6, 9]
     * // ]
     *
     * @example <caption>Showing the relationship with <code>zip</code>:</caption>
     * var zipped = _.zip(["a", "b", "c"], [1, 2, 3]); // => [["a", 1], ["b", 2], ["c", 3]]
     *
     * _.transpose(zipped) // => [["a", "b", "c"], [1, 2, 3]]
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.zip|zip}
     * @param {ArrayLike<ArrayLike<*>>} arrayLike
     * @returns {Array<Array<*>>}
     */
    function transpose (arrayLike) {
        var minLen = MAX_ARRAY_LENGTH;
        var len = _toArrayLength(arrayLike.length);

        if (len === 0) {
            return [];
        }

        for (var j = 0, elementLen; j < len && minLen > 0; j++) {
            elementLen = _toArrayLength(arrayLike[j].length);

            if (elementLen < minLen) {
                minLen = elementLen;
            }
        }

        var result = Array(minLen);

        for (var i = 0, el; i < minLen; i++) {
            el = result[i] = Array(len);

            for (j = 0; j < len; j++) {
                el[j] = arrayLike[j][i];
            }
        }

        return result;
    }

    /**
     * Returns a list of every unique element present in the given array-like objects.
     * @example
     * _.union([1, 2, 3, 2], [3, 4], [1, 5]) // => [1, 2, 3, 4, 5]
     * _.union("abc", "bcd", "cde") // => ["a", "b", "c", "d", "e"]
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @param {...ArrayLike} arrayLike
     * @returns {Array}
     */
    var union = compose(uniques, flatMapWith(dropN(0)), list);

    /**
     * Returns an array comprised of the unique elements of the given array-like object.<br/>
     * Can work with lists of complex objects if supplied with an iteratee.<br/>
     * Note that this function uses the ["SameValueZero" comparison]{@link module:lamb.isSVZ|isSVZ}.<br/>
     * When two values are considered equal, the first occurence will be the one included
     * in the result array.
     * @example <caption>With simple values:</caption>
     * _.uniques([-0, 1, 2, 0, 2, 3, 4, 3, 5, 1]) // => [-0, 1, 2, 3, 4, 5]
     *
     * @example <caption>With complex values:</caption>
     * var data  = [
     *     {id: "1", name: "John"},
     *     {id: "4", name: "Jane"},
     *     {id: "5", name: "Joe"},
     *     {id: "1", name: "Mario"},
     *     {id: "5", name: "Paolo"},
     * ];
     *
     * _.uniques(data, _.getKey("id")) // =>
     * // [
     * //     {id: "1", name: "John"},
     * //     {id: "4", name: "Jane"},
     * //     {id: "5", name: "Joe"}
     * // ]
     *
     * @memberof module:lamb
     * @category Array
     * @param {ArrayLike} arrayLike
     * @param {ListIteratorCallback} [iteratee={@link module:lamb.identity|identity}]
     * @param {Object} [iterateeContext]
     * @returns {Array}
     */
    function uniques (arrayLike, iteratee, iterateeContext) {
        if (typeof iteratee !== "function") {
            iteratee = identity;
        } else if (arguments.length === 3) {
            iteratee = iteratee.bind(iterateeContext);
        }

        var result = [];
        var len = arrayLike.length;

        for (var i = 0, seen = [], hasNaN = false, value; i < len; i++) {
            value = iteratee(arrayLike[i], i, arrayLike);

            // eslint-disable-next-line no-self-compare
            if (value === value) {
                if (seen.indexOf(value) === -1) {
                    seen[seen.length] = value;
                    result[result.length] = arrayLike[i];
                }
            } else if (!hasNaN) {
                hasNaN = true;
                result[result.length] = arrayLike[i];
            }
        }

        return result;
    }

    /**
     * Builds a list of arrays out of the given array-like objects by pairing items with the same index.<br/>
     * The received array-like objects will be truncated to the shortest length.
     * @example
     * _.zip(
     *     ["a", "b", "c"],
     *     [1, 2, 3],
     *     [true, false, true]
     * ) // => [["a", 1, true], ["b", 2, false], ["c", 3, true]]
     *
     * _.zip([1, 2, 3, 4], [5, 6, 7]) // => [[1, 5], [2, 6], [3, 7]]
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.transpose|transpose} for the reverse operation
     * @see {@link module:lamb.zipWithIndex|zipWithIndex}
     * @param {...ArrayLike} arrayLike
     * @returns {Array<Array<*>>}
     */
    var zip = compose(transpose, list);

    /**
     * "{@link module:lamb.zip|Zips}" an array-like object by pairing its values with their index.
     * @example
     * _.zipWithIndex(["a", "b", "c"]) // => [["a", 0], ["b", 1], ["c", 2]]
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.zip|zip}
     * @param {ArrayLike} arrayLike
     * @returns {Array<Array<*, Number>>}
     */
    var zipWithIndex = mapWith(binary(list));

    lamb.append = append;
    lamb.appendTo = appendTo;
    lamb.difference = difference;
    lamb.drop = drop;
    lamb.dropN = dropN;
    lamb.dropWhile = dropWhile;
    lamb.flatMap = flatMap;
    lamb.flatMapWith = flatMapWith;
    lamb.flatten = flatten;
    lamb.init = init;
    lamb.insert = insert;
    lamb.insertAt = insertAt;
    lamb.intersection = intersection;
    lamb.partition = partition;
    lamb.partitionWith = partitionWith;
    lamb.pluck = pluck;
    lamb.pluckKey = pluckKey;
    lamb.pull = pull;
    lamb.pullFrom = pullFrom;
    lamb.shallowFlatten = shallowFlatten;
    lamb.tail = tail;
    lamb.take = take;
    lamb.takeN = takeN;
    lamb.takeWhile = takeWhile;
    lamb.transpose = transpose;
    lamb.union = union;
    lamb.uniques = uniques;
    lamb.zip = zip;
    lamb.zipWithIndex = zipWithIndex;

    /**
     * Transforms an array-like object in a lookup table with the keys generated by the provided
     * <code>iteratee</code>, having as values the count of matches for the key.
     * @example
     * var persons = [
     *     {"name": "Jane", "age": 12},
     *     {"name": "John", "age": 40},
     *     {"name": "Mario", "age": 17},
     *     {"name": "Paolo", "age": 15}
     * ];
     * var getAgeStatus = function (person) { return person.age >= 18 ? "adult" : "minor"; };
     *
     * _.count(persons, getAgeStatus) // => {"adult": 1, "minor": 3}
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.countBy|countBy}
     * @see {@link module:lamb.group|group}, {@link module:lamb.groupBy|groupBy}
     * @see {@link module:lamb.index|index}, {@link module:lamb.indexBy|indexBy}
     * @param {ArrayLike} arrayLike
     * @param {ListIteratorCallback} iteratee
     * @param {Object} [iterateeContext]
     * @returns {Object}
     */
    var count = _groupWith(function (a) {
        return a ? ++a : 1;
    });

    /**
     * Using the provided iteratee, and its optional context, builds a partial application of
     * {@link module:lamb.count|count} expecting the array-like object to act upon.
     * @example
     * var persons = [
     *     {"name": "Jane", "city": "New York"},
     *     {"name": "John", "city": "New York"},
     *     {"name": "Mario", "city": "Rome"},
     *     {"name": "Paolo"}
     * ];
     * var getCityOrUnknown = _.adapter(_.getKey("city"), _.always("Unknown"));
     * var countByCity = _.countBy(getCityOrUnknown);
     *
     * countByCity(persons) // => {"New York": 2, "Rome": 1, "Unknown": 1}
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.count|count}
     * @see {@link module:lamb.group|group}, {@link module:lamb.groupBy|groupBy}
     * @see {@link module:lamb.index|index}, {@link module:lamb.indexBy|indexBy}
     * @param {ListIteratorCallback} iteratee
     * @param {Object} [iterateeContext]
     * @returns {Function}
     */
    var countBy = _partialWithIteratee(count);

    /**
     * Transforms an array-like object into a lookup table using the provided iteratee as a grouping
     * criterion to generate keys and values.
     * @example
     * var persons = [
     *     {"name": "Jane", "city": "New York"},
     *     {"name": "John", "city": "New York"},
     *     {"name": "Mario", "city": "Rome"},
     *     {"name": "Paolo"}
     * ];
     * var getCity = _.getKey("city");
     * var personsByCity = _.group(persons, getCity);
     *
     * // "personsByCity" holds:
     * // {
     * //     "New York": [
     * //         {"name": "Jane", "city": "New York"},
     * //         {"name": "John", "city": "New York"}
     * //     ],
     * //     "Rome": [
     * //         {"name": "Mario", "city": "Rome"}
     * //     ],
     * //     "undefined": [
     * //         {"name": "Paolo"}
     * //     ]
     * // }
     *
     * @example <caption>Adding a custom value for missing keys:</caption>
     *
     * var getCityOrUnknown = _.adapter(getCity, _.always("Unknown"));
     *
     * var personsByCity = _.group(persons, getCityOrUnknown);
     *
     * // "personsByCity" holds:
     * // {
     * //     "New York": [
     * //         {"name": "Jane", "city": "New York"},
     * //         {"name": "John", "city": "New York"}
     * //     ],
     * //     "Rome": [
     * //         {"name": "Mario", "city": "Rome"}
     * //     ],
     * //     "Unknown": [
     * //         {"name": "Paolo"}
     * //     ]
     * // }
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.groupBy|groupBy}
     * @see {@link module:lamb.count|count}, {@link module:lamb.countBy|countBy}
     * @see {@link module:lamb.index|index}, {@link module:lamb.indexBy|indexBy}
     * @param {ArrayLike} arrayLike
     * @param {ListIteratorCallback} iteratee
     * @param {Object} [iterateeContext]
     * @returns {Object}
     */
    var group = _groupWith(function (a, b) {
        if (!a) {
            return [b];
        }

        a[a.length] = b;

        return a;
    });

    /**
     * Using the provided iteratee, and its optional context, builds a partial application
     * of {@link module:lamb.group|group} expecting the array-like object to act upon.
     * @example
     * var persons = [
     *     {"name": "Jane", "age": 12},
     *     {"name": "John", "age": 40},
     *     {"name": "Mario", "age": 18},
     *     {"name": "Paolo", "age": 15}
     * ];
     *
     * var getAgeStatus = function (person) { return person.age > 20 ? "over 20" : "under 20"; };
     * var groupByAgeStatus = _.groupBy(getAgeStatus);
     *
     * var personsByAgeStatus = groupByAgeStatus(persons);
     *
     * // "personsByAgeStatus" holds:
     * // {
     * //     "under 20": [
     * //         {"name": "Jane", "age": 12},
     * //         {"name": "Mario", "age": 18},
     * //         {"name": "Paolo", "age": 15}
     * //     ],
     * //     "over 20": [
     * //         {"name": "John", "age": 40}
     * //     ]
     * // }
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.group|group}
     * @see {@link module:lamb.count|count}, {@link module:lamb.countBy|countBy}
     * @see {@link module:lamb.index|index}, {@link module:lamb.indexBy|indexBy}
     * @param {ListIteratorCallback} iteratee
     * @param {Object} [iterateeContext]
     * @returns {Function}
     */
    var groupBy = _partialWithIteratee(group);

    /**
     * Similar to {@link module:lamb.group|group}, but the generated lookup table will have
     * only one element of the original array-like object for each value.<br/>
     * Should be used only when you're sure that your <code>iteratee</code> won't produce
     * duplicate keys, otherwise only the last evaluated element will be in the result.
     * @example
     * var users = [
     *     {id: 1, name: "John"},
     *     {id: 2, name: "Jane"},
     *     {id: 3, name: "Mario"},
     *     {id: 4, name: "John"}
     * ];
     *
     * var indexedUsers = _.index(users, _.getKey("id"));
     *
     * // "indexedUsers" holds:
     * // {
     * //     "1": {id: 1, name: "John"},
     * //     "2": {id: 2, name: "Jane"},
     * //     "3": {id: 3, name: "Mario"},
     * //     "4": {id: 4, name: "John"}
     * // }
     *
     * @example <caption>Result of an <code>iteratee</code> producing a duplicate key:</caption>
     * var users = [
     *     {id: 1, name: "John"},
     *     {id: 2, name: "Jane"},
     *     {id: 3, name: "Mario"},
     *     {id: 4, name: "John"}
     * ];
     *
     * var indexedUsers = _.index(users, _.getKey("name"));
     *
     * // "indexedUsers" holds:
     * // {
     * //     "John": {"id": 4, "name": "John"},
     * //     "Jane": {"id": 2, "name": "Jane"},
     * //     "Mario": {"id": 3, "name": "Mario"}
     * // }
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.indexBy|indexBy}
     * @see {@link module:lamb.count|count}, {@link module:lamb.countBy|countBy}
     * @see {@link module:lamb.group|group}, {@link module:lamb.groupBy|groupBy}
     * @param {ArrayLike} arrayLike
     * @param {ListIteratorCallback} iteratee
     * @param {Object} [iterateeContext]
     * @returns {Object}
     */
    var index = _groupWith(function (a, b) {
        return b;
    });

    /**
     * Using the provided iteratee, and its optional context, builds a partial application
     * of {@link module:lamb.index|index} expecting the array-like object to act upon.
     * @example
     * var users = [
     *     {id: 1, name: "John"},
     *     {id: 2, name: "Jane"},
     *     {id: 3, name: "Mario"}
     * ];
     * var indexByID = _.indexBy(_.getKey("id"));
     *
     * var indexedUsers = indexByID(users);
     *
     * // "indexedUsers" holds:
     * // {
     * //     "1": {id: 1, name: "John"},
     * //     "2": {id: 2, name: "Jane"},
     * //     "3": {id: 3, name: "Mario"}
     * // }
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.index|index}
     * @see {@link module:lamb.count|count}, {@link module:lamb.countBy|countBy}
     * @see {@link module:lamb.group|group}, {@link module:lamb.groupBy|groupBy}
     * @param {ListIteratorCallback} iteratee
     * @param {Object} [iterateeContext]
     * @returns {Function}
     */
    var indexBy = _partialWithIteratee(index);

    lamb.count = count;
    lamb.countBy = countBy;
    lamb.group = group;
    lamb.groupBy = groupBy;
    lamb.index = index;
    lamb.indexBy = indexBy;

    /**
     * Returns a [stably]{@link https://en.wikipedia.org/wiki/Sorting_algorithm#Stability} sorted
     * copy of an array-like object using the given criteria.<br/>
     * Sorting criteria are built using Lamb's {@link module:lamb.sorter|sorter} function, but you
     * can also pass simple "reader" functions and default ascending sorters will be built for you.<br/>
     * A "reader" is a function that evaluates the array element and supplies the value to be used
     * in the comparison.<br/>
     * Please note that if the arguments received by the default comparer aren't of the same type,
     * they will be compared as strings.
     *
     * @example <caption>Stable sort:</caption>
     * var persons = [
     *     {"name": "John", "surname" :"Doe"},
     *     {"name": "Mario", "surname": "Rossi"},
     *     {"name": "John", "surname" :"Moe"},
     *     {"name": "Jane", "surname": "Foe"}
     * ];
     *
     * var personsByName = _.sort(persons, _.getKey("name"));
     *
     * // personsByName holds:
     * // [
     * //     {"name": "Jane", "surname": "Foe"},
     * //     {"name": "John", "surname" :"Doe"},
     * //     {"name": "John", "surname" :"Moe"},
     * //     {"name": "Mario", "surname": "Rossi"}
     * // ]
     *
     * @example <caption>Stable multi-sort:</caption>
     * var personsByNameAscSurnameDesc = _.sort(
     *     persons,
     *     _.getKey("name"),
     *     _.sorterDesc(_.getKey("surname"))
     * );
     *
     * // personsByNameAscSurnameDesc holds:
     * // [
     * //     {"name": "Jane", "surname": "Foe"},
     * //     {"name": "John", "surname" :"Moe"},
     * //     {"name": "John", "surname" :"Doe"},
     * //     {"name": "Mario", "surname": "Rossi"}
     * // ]
     *
     * @example <caption>Using custom comparers:</caption>
     * var localeSorter = new Intl.Collator("it");
     * var chars = ["a", "è", "à", "é", "c", "b", "e"];
     *
     * _.sort(chars, localeSorter) // => ["a", "à", "b", "c", "e", "é", "è"]
     *
     * var localeSorterDesc = _.sorterDesc(_.identity, localeSorter.compare);
     *
     * _.sort(chars, localeSorterDesc) // => ["è", "é", "e", "c", "b", "à", "a"]
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.sortWith|sortWith}
     * @see {@link module:lamb.sorter|sorter}, {@link module:lamb.sorterDesc|sorterDesc}
     * @param {ArrayLike} arrayLike
     * @param {...(Sorter|Function)} [sorter={@link module:lamb.sorter|sorter()}]
     * @returns {Array}
     */
    function sort (arrayLike) {
        var criteria = _makeCriteria(_argsTail.apply(null, arguments));
        var len = _toArrayLength(arrayLike.length);
        var result = Array(len);

        for (var i = 0; i < len; i++) {
            result[i] = {value: arrayLike[i], index: i};
        }

        result.sort(_compareWith(criteria));

        for (i = 0; i < len; i++) {
            result[i] = result[i].value;
        }

        return result;
    }

    /**
     * Inserts an element in a copy of a sorted array respecting the sort order.
     * @example <caption>With simple values:</caption>
     * _.sortedInsert([], 1) // => [1]
     * _.sortedInsert([2, 4, 6], 5) // => [2, 4, 5, 6]
     * _.sortedInsert([4, 2, 1], 3, _.sorterDesc()) // => [4, 3, 2, 1]
     *
     * @example <caption>With complex values:</caption>
     * var persons = [
     *     {"name": "jane", "surname": "doe"},
     *     {"name": "John", "surname": "Doe"},
     *     {"name": "Mario", "surname": "Rossi"}
     * ];
     *
     * var getLowerCaseName = _.compose(
     *     _.invoker("toLowerCase"),
     *     _.getKey("name")
     * );
     *
     * var result = _.sortedInsert(
     *     persons,
     *     {"name": "marco", "surname": "Rossi"},
     *     getLowerCaseName
     * );
     *
     * // `result` holds:
     * // [
     * //     {"name": "jane", "surname": "doe"},
     * //     {"name": "John", "surname": "Doe"},
     * //     {"name": "marco", "surname": "Rossi"},
     * //     {"name": "Mario", "surname": "Rossi"}
     * // ]
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.sort|sort}, {@link module:lamb.sortWith|sortWith}
     * @see {@link module:lamb.sorter|sorter}, {@link module:lamb.sorterDesc|sorterDesc}
     * @see {@link module:lamb.insert|insert}, {@link module:lamb.insertAt|insertAt} to insert the element
     * at a specific index
     * @param {ArrayLike} arrayLike
     * @param {*} element
     * @param {...(Sorter|Function)} [sorter={@link module:lamb.sorter|sorter()}] - The sorting criteria
     * used to sort the array.
     * @returns {Array}
     */
    function sortedInsert (arrayLike, element) {
        var result = slice(arrayLike, 0, arrayLike.length);

        if (arguments.length === 1) {
            return result;
        }

        var len = arguments.length - 2;
        var sorters = Array(len);

        for (var i = 0; i < len; i++) {
            sorters[i] = arguments[i + 2];
        }

        var criteria = _makeCriteria(sorters);
        var idx = _getInsertionIndex(result, element, _compareWith(criteria), 0, result.length);

        result.splice(idx, 0, element);

        return result;
    }

    /**
     * Creates an ascending sort criterion with the provided <code>reader</code> and
     * <code>comparer</code>.<br/>
     * See {@link module:lamb.sort|sort} for various examples.
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.sortedInsert|sortedInsert}
     * @see {@link module:lamb.sort|sort}, {@link module:lamb.sortWith|sortWith}
     * @see {@link module:lamb.sorterDesc|sorterDesc}
     * @param {Function} [reader={@link module:lamb.identity|identity}] A function meant to generate a
     * simple value from a complex one. The function should evaluate the array element and supply the
     * value to be passed to the comparer.
     * @param {Function} [comparer] An optional custom comparer function.
     * @returns {Sorter}
     */
    var sorter = partial(_sorter, _, false, _);

    /**
     * Creates a descending sort criterion with the provided <code>reader</code> and
     * <code>comparer</code>.<br/>
     * See {@link module:lamb.sort|sort} for various examples.
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.sortedInsert|sortedInsert}
     * @see {@link module:lamb.sort|sort}, {@link module:lamb.sortWith|sortWith}
     * @see {@link module:lamb.sorter|sorter}
     * @param {Function} [reader={@link module:lamb.identity|identity}] A function meant to generate a
     * simple value from a complex one. The function should evaluate the array element and supply the
     * value to be passed to the comparer.
     * @param {Function} [comparer] An optional custom comparer function.
     * @returns {Sorter}
     */
    var sorterDesc = partial(_sorter, _, true, _);

    /**
     * Builds a partial application of {@link module:lamb.sort|sort} using the provided criteria.
     * The returned function expects the array-like object to sort.
     * As usual, sorting criteria are built using Lamb's {@link module:lamb.sorter|sorter} function,
     * but you can also pass simple "reader" functions and default ascending sorters will be built.<br/>
     * A "reader" is a function that evaluates the array element and supplies the value to be used in
     * the comparison.<br/>
     * See {@link module:lamb.sort|sort} for more examples.
     *
     * @example
     * var sortAsNumbers = _.sortWith(parseFloat);
     * var weights = ["2 Kg", "10 Kg", "1 Kg", "7 Kg"];
     *
     * sortAsNumbers(weights) // => ["1 Kg", "2 Kg", "7 Kg", "10 Kg"]
     *
     * @memberof module:lamb
     * @category Array
     * @see {@link module:lamb.sort|sort}
     * @see {@link module:lamb.sorter|sorter}, {@link module:lamb.sorterDesc|sorterDesc}
     * @param {...(Sorter|Function)} [sorter={@link module:lamb.sorter|sorter()}]
     * @returns {Function}
     */
    function sortWith () {
        var sorters = list.apply(null, arguments);

        return function (arrayLike) {
            return sort.apply(null, [arrayLike].concat(sorters));
        };
    }

    lamb.sort = sort;
    lamb.sortedInsert = sortedInsert;
    lamb.sorter = sorter;
    lamb.sorterDesc = sorterDesc;
    lamb.sortWith = sortWith;

    /**
     * Applies the given function to a list of arguments.
     * @example
     * _.application(_.add, [3, 4]) // => 7
     *
     * @memberof module:lamb
     * @category Function
     * @see {@link module:lamb.apply|apply}, {@link module:lamb.applyTo|applyTo}
     * @param {Function} fn
     * @param {ArrayLike} args
     * @returns {*}
     */
    function application (fn, args) {
        return fn.apply(this, Object(args));
    }

    /**
     * A left-curried version of {@link module:lamb.application|application}. Expects the function
     * to apply and builds a function waiting for the arguments array.
     * @example
     * var arrayMax = _.apply(Math.max);
     *
     * arrayMax([4, 5, 2, 6, 1]) // => 6
     *
     * @memberof module:lamb
     * @category Function
     * @see {@link module:lamb.application|application}, {@link module:lamb.applyTo|applyTo}
     * @param {Function} fn
     * @returns {Function}
     */
    function apply (fn) {
        return function (args) {
            return fn.apply(this, Object(args));
        };
    }

    /**
     * A right-curried version of {@link module:lamb.application|application}. Expects an array-like
     * object to use as arguments and builds a function waiting for the target of the application.
     * @example
     * var data = [3, 4];
     * var applyToData = _.applyTo(data);
     *
     * applyToData(_.add) // => 7
     * applyToData(_.multiply) // => 12
     *
     * @memberof module:lamb
     * @category Function
     * @see {@link module:lamb.application|application}, {@link module:lamb.apply|apply}
     * @param {ArrayLike} args
     * @returns {Function}
     */
    function applyTo (args) {
        return function (fn) {
            return fn.apply(this, Object(args));
        };
    }

    /**
     * Builds a new function that passes only the specified amount of arguments to the original one.<br/>
     * As {@link module:lamb.slice|slice} is used to extract the arguments, you can also
     * pass a negative arity.
     * @example
     * function maxArgument () {
     *     return Math.max.apply(null, arguments);
     * }
     *
     * maxArgument(10, 11, 45, 99) // => 99
     * _.aritize(maxArgument, 2)(10, 11, 45, 99) // => 11
     *
     * @example <caption>Using a negative arity:</caption>
     * _.aritize(maxArgument, -1)(10, 11, 45, 99) // => 45
     *
     * @memberof module:lamb
     * @category Function
     * @see {@link module:lamb.binary|binary}, {@link module:lamb.unary|unary} for common use cases shortcuts
     * @param {Function} fn
     * @param {Number} arity
     * @returns {Function}
     */
    function aritize (fn, arity) {
        return function () {
            var args = list.apply(null, arguments).slice(0, arity);
            var argsLen = args.length;
            var n = Math.floor(arity);

            if (n > 0) {
                while (argsLen < n) {
                    args[argsLen++] = void 0;
                }
            }

            return fn.apply(this, args);
        };
    }

    /**
     * Decorates the received function so that it can be called with
     * placeholders to build a partial application of it.<br/>
     * The difference with {@link module:lamb.partial|partial} is that, as long as
     * you call the generated function with placeholders, another partial application
     * of the original function will be built.<br/>
     * The final application will happen when one of the generated functions is
     * invoked without placeholders, using the parameters collected so far. <br/>
     * This function comes in handy when you need to build different specialized
     * functions starting from a basic one, but it's also useful when dealing with
     * optional parameters as you can decide to apply the function even if its arity
     * hasn't been entirely consumed.
     * @example <caption>Explaining the function's behaviour:</caption>
     * var f = _.asPartial(function (a, b, c) {
     *     return a + b + c;
     * });
     *
     * f(4, 3, 2) // => 9
     * f(4, _, 2)(3) // => 9
     * f(_, 3, _)(4, _)(2) // => 9
     *
     * @example <caption>Exploiting optional parameters:</caption>
     * var f = _.asPartial(function (a, b, c) {
     *     return a + b + (c || 0);
     * });
     *
     * var addFive = f(5, _);
     * addFive(2) // => 7
     *
     * var addNine = addFive(4, _);
     * addNine(11) // => 20
     *
     * @memberof module:lamb
     * @category Function
     * @see {@link module:lamb.partial|partial}
     * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
     * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
     * @param {Function} fn
     * @returns {Function}
     */
    function asPartial (fn) {
        return _asPartial(fn, []);
    }

    /**
     * Builds a function that passes only two arguments to the given function.<br/>
     * It's simply a shortcut for a common use case of {@link module:lamb.aritize|aritize},
     * exposed for convenience.
     * @example
     * _.list(1, 2, 3, 4, 5) // => [1, 2, 3, 4, 5]
     * _.binary(_.list)(1, 2, 3, 4, 5) // => [1, 2]
     *
     * @memberof module:lamb
     * @category Function
     * @see {@link module:lamb.aritize|aritize}
     * @see {@link module:lamb.unary|unary}
     * @param {Function} fn
     * @returns {Function}
     */
    function binary (fn) {
        return function (a, b) {
            return fn.call(this, a, b);
        };
    }

    /**
     * Accepts a series of functions and builds a new function. The functions in the series
     * will then be applied, in order, with the values received by the function built with
     * <code>collect</code>.<br/>
     * The collected results will be returned in an array.
     * @example
     * var user = {
     *     id: "jdoe",
     *     name: "John",
     *     surname: "Doe",
     *     scores: [2, 4, 7]
     * };
     * var getIDAndLastScore = _.collect(_.getKey("id"), _.getPath("scores.-1"));
     *
     * getIDAndLastScore(user) // => ["jdoe", 7]
     *
     * @example
     * var minAndMax = _.collect(Math.min, Math.max);
     *
     * minAndMax(3, 1, -2, 5, 4, -1) // => [-2, 5]
     *
     * @memberof module:lamb
     * @category Function
     * @param {...Function} fn
     * @returns {Function}
     */
    function collect () {
        var functions = list.apply(null, arguments);

        return function () {
            return map(functions, applyTo(arguments));
        };
    }

    /**
     * Transforms the evaluation of the given function in the evaluation of a sequence of functions
     * expecting only one argument. Each function of the sequence is a partial application of the
     * original one, which will be applied when the specified (or derived) arity is consumed.<br/>
     * Currying will start from the leftmost argument: use {@link module:lamb.curryRight|curryRight}
     * for right currying.
     * @example
     * var multiplyBy = _.curry(_.multiply);
     * var multiplyBy10 = multiplyBy(10);
     *
     * multiplyBy10(5) // => 50
     * multiplyBy10(2) // => 20
     *
     * @memberof module:lamb
     * @category Function
     * @see {@link module:lamb.curryRight|curryRight}
     * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
     * @see {@link module:lamb.partial|partial}, {@link module:lamb.asPartial|asPartial}
     * @param {Function} fn
     * @param {Number} [arity=fn.length]
     * @returns {Function}
     */
    function curry (fn, arity) {
        return _curry(fn, arity, false);
    }

    /**
     * Builds an auto-curried function. The resulting function can be called multiple times with
     * any number of arguments, and the original function will be applied only when the specified
     * (or derived) arity is consumed.<br/>
     * Currying will start from the leftmost argument: use {@link module:lamb.curryableRight|curryableRight}
     * for right currying.
     * @example
     * var collectFourElements = _.curryable(_.list, 4);
     *
     * collectFourElements(2)(3)(4)(5) // => [2, 3, 4, 5]
     * collectFourElements(2)(3, 4)(5) // => [2, 3, 4, 5]
     * collectFourElements(2, 3, 4, 5) // => [2, 3, 4, 5]
     * collectFourElements(2, 3)(4, 5) // => [2, 3, 4, 5]
     *
     * @memberof module:lamb
     * @category Function
     * @see {@link module:lamb.curryableRight|curryableRight}
     * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
     * @see {@link module:lamb.partial|partial}, {@link module:lamb.asPartial|asPartial}
     * @param {Function} fn
     * @param {Number} [arity=fn.length]
     * @returns {Function}
     */
    function curryable (fn, arity) {
        return _curry(fn, arity, false, true);
    }

    /**
     * Same as {@link module:lamb.curryable|curryable}, but currying starts from the rightmost argument.
     * @example
     * var collectFourElements = _.curryableRight(_.list, 4);
     *
     * collectFourElements(2)(3)(4)(5) // => [5, 4, 3, 2]
     * collectFourElements(2)(3, 4)(5) // => [5, 4, 3, 2]
     * collectFourElements(2, 3, 4, 5) // => [5, 4, 3, 2]
     * collectFourElements(2, 3)(4, 5) // => [5, 4, 3, 2]
     *
     * @memberof module:lamb
     * @category Function
     * @see {@link module:lamb.curryable|curryable}
     * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
     * @see {@link module:lamb.partial|partial}, {@link module:lamb.asPartial|asPartial}
     * @param {Function} fn
     * @param {Number} [arity=fn.length]
     * @returns {Function}
     */
    function curryableRight (fn, arity) {
        return _curry(fn, arity, true, true);
    }

    /**
     * Same as {@link module:lamb.curry|curry}, but currying starts from the rightmost argument.
     * @example
     * var divideBy = _.curryRight(_.divide);
     * var halve = divideBy(2);
     * halve(3) // => 1.5
     * halve(3, 7) // => 1.5
     *
     * @memberof module:lamb
     * @category Function
     * @see {@link module:lamb.curry|curry}
     * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
     * @see {@link module:lamb.partial|partial}, {@link module:lamb.asPartial|asPartial}
     * @param {Function} fn
     * @param {Number} [arity=fn.length]
     * @returns {Function}
     */
    function curryRight (fn, arity) {
        return _curry(fn, arity, true);
    }

    /**
     * Returns a function that will execute the given function only if it stops being called for the
     * specified timespan.<br/>
     * See also {@link module:lamb.throttle|throttle} for a different behaviour where the first call
     * happens immediately.
     * @example <caption>A common use case of <code>debounce</code> in a browser environment:</caption>
     * var updateLayout = function () {
     *     // some heavy DOM operations here
     * };
     *
     * window.addEventListener("resize", _.debounce(updateLayout, 200), false);
     *
     * // The resize event is fired repeteadly until the user stops resizing the
     * // window, while the `updateLayout` function is called only once: 200 ms
     * // after he stopped.
     *
     * @memberof module:lamb
     * @category Function
     * @see {@link module:lamb.throttle|throttle}
     * @param {Function} fn
     * @param {Number} timespan - Expressed in milliseconds
     * @returns {Function}
     */
    function debounce (fn, timespan) {
        var timeoutID;

        return function () {
            var args = arguments;
            var debounced = function () {
                timeoutID = null;
                fn.apply(this, args);
            }.bind(this);

            clearTimeout(timeoutID);
            timeoutID = setTimeout(debounced, timespan);
        };
    }

    /**
     * Returns a function that applies the original function with the arguments in reverse order.
     * @example
     * _.list(1, 2, 3) // => [1, 2, 3]
     * _.flip(_.list)(1, 2, 3) // => [3, 2, 1]
     *
     * @memberof module:lamb
     * @category Function
     * @param {Function} fn
     * @returns {Function}
     */
    function flip (fn) {
        return function () {
            var args = list.apply(null, arguments).reverse();

            return fn.apply(this, args);
        };
    }

    /**
     * Builds a function that returns the argument received at the given index.<br/>
     * As with {@link module:lamb.getAt|getAt} negative indexes are allowed.<br/>
     * The resulting function will return <code>undefined</code> if no arguments are
     * passed or if the index is out of bounds.
     * @example
     * var getFirstArg = getArgAt(0);
     * var getLastArg = getArgAt(-1);
     *
     * getFirstArg(1, 2, 3) // => 1
     * getLastArg(1, 2, 3) // => 3
     *
     * getArgAt()(1, 2, 3) // => undefined
     * getArgAt(6)(1, 2, 3) // => undefined
     * getArgAt(1)() // => undefined
     *
     * @memberof module:lamb
     * @category Function
     * @param {Number} idx
     * @returns {Function}
     */
    function getArgAt (idx) {
        return function () {
            return arguments[_toNaturalIndex(idx, arguments.length)];
        };
    }

    /**
     * Builds a function that will invoke the given method name on any received object and return
     * the result. If no method with such name is found the function will return <code>undefined</code>.
     * Along with the method name it's possible to supply some arguments that will be bound to the
     * method call.<br/>
     * Further arguments can also be passed when the function is actually called, and they will be
     * concatenated to the bound ones.<br/>
     * If different objects share a method name it's possible to build polymorphic functions as you
     * can see in the example below.<br/>
     * {@link module:lamb.condition|Condition} can be used to wrap <code>invoker</code> to avoid this
     * behaviour by adding a predicate, while {@link module:lamb.adapter|adapter} can build more complex
     * polymorphic functions without the need of homonymy.<br/>
     * Returning <code>undefined</code> or checking for such value is meant to favor composition and
     * interoperability between the aforementioned functions: for a more standard behaviour see also
     * {@link module:lamb.generic|generic}.
     * @example <caption>Basic polymorphism with <code>invoker</code>:</caption>
     * var polySlice = _.invoker("slice");
     *
     * polySlice([1, 2, 3, 4, 5], 1, 3) // => [2, 3]
     * polySlice("Hello world", 1, 3) // => "el"
     *
     * @example <caption>With bound arguments:</caption>
     * var substrFrom2 = _.invoker("substr", 2);
     * substrFrom2("Hello world") // => "llo world"
     * substrFrom2("Hello world", 5) // => "llo w"
     *
     * @memberof module:lamb
     * @category Function
     * @see {@link module:lamb.invokerOn|invokerOn}
     * @param {String} methodName
     * @param {...*} [boundArg]
     * @returns {Function}
     */
    function invoker (methodName) {
        return partial(_invoker, _argsTail.apply(null, arguments), methodName);
    }

    /**
     * Accepts an object and builds a function expecting a method name, and optionally arguments,
     * to call on such object.
     * Like {@link module:lamb.invoker|invoker}, if no method with the given name is found the
     * function will return <code>undefined</code>.
     * @example
     * var isEven = function (n) { return n % 2 === 0; };
     * var arr = [1, 2, 3, 4, 5];
     * var invokerOnArr = _.invokerOn(arr);
     *
     * invokerOnArr("filter", isEven) // => [2, 4]
     * invokerOnArr("slice", 1, 3) // => [2, 3]
     *
     * @memberof module:lamb
     * @category Function
     * @see {@link module:lamb.invoker|invoker}
     * @param {Object} target
     * @returns {Function}
     */
    function invokerOn (target) {
        return partial(_invoker, [], _, target);
    }

    /**
     * Builds a function that allows to map over the received arguments before applying them
     * to the original one.
     * @example
     * var sumArray = _.reduceWith(_.add);
     * var sum = _.compose(sumArray, _.list);
     *
     * sum(1, 2, 3, 4, 5) // => 15
     *
     * var square = _.partial(Math.pow, _, 2);
     * var sumSquares = _.mapArgs(sum, square);
     *
     * sumSquares(1, 2, 3, 4, 5) // => 55
     *
     * @memberof module:lamb
     * @category Function
     * @see {@link module:lamb.tapArgs|tapArgs}
     * @param {Function} fn
     * @param {ListIteratorCallback} mapper
     * @returns {Function}
     */
    function mapArgs (fn, mapper) {
        return compose(apply(fn), mapWith(mapper), list);
    }

    /**
     * Creates a pipeline of functions, where each function consumes the result of the previous one.
     * @example
     * var square = _.partial(Math.pow, _, 2);
     * var getMaxAndSquare = _.pipe(Math.max, square);
     *
     * getMaxAndSquare(3, 5) // => 25
     *
     * @memberof module:lamb
     * @category Function
     * @see {@link module:lamb.compose|compose}
     * @function
     * @param {...Function} fn
     * @returns {Function}
     */
    var pipe = flip(compose);

    /**
     * Builds a function that allows to "tap" into the arguments of the original one.
     * This allows to extract simple values from complex ones, transform arguments or simply intercept them.
     * If a "tapper" isn't found the argument is passed as it is.
     * @example
     * var someObject = {count: 5};
     * var someArrayData = [2, 3, 123, 5, 6, 7, 54, 65, 76, 0];
     * var getDataAmount = _.tapArgs(_.add, _.getKey("count"), _.getKey("length"));
     *
     * getDataAmount(someObject, someArrayData); // => 15
     *
     * @memberof module:lamb
     * @category Function
     * @see {@link module:lamb.mapArgs|mapArgs}
     * @param {Function} fn
     * @param {...?Function} [tapper]
     * @returns {Function}
     */
    function tapArgs (fn) {
        var tappers = _argsTail.apply(null, arguments);

        return function () {
            var len = arguments.length;
            var tappersLen = tappers.length;
            var args = [];

            for (var i = 0; i < len; i++) {
                args.push(i < tappersLen ? tappers[i](arguments[i]) : arguments[i]);
            }

            return fn.apply(this, args);
        };
    }

    /**
     * Returns a function that will invoke the passed function at most once in the given timespan.<br/>
     * The first call in this case happens as soon as the function is invoked; see also
     * {@link module:lamb.debounce|debounce} for a different behaviour where the first call is delayed.
     * @example
     * var log = _.throttle(console.log.bind(console), 5000);
     *
     * log("Hi"); // console logs "Hi"
     * log("Hi again"); // nothing happens
     * // after five seconds
     * log("Hello world"); // console logs "Hello world"
     *
     * @memberof module:lamb
     * @category Function
     * @see {@link module:lamb.debounce|debounce}
     * @param {Function} fn
     * @param {Number} timespan - Expressed in milliseconds.
     * @returns {Function}
     */
    function throttle (fn, timespan) {
        var result;
        var lastCall = 0;

        return function () {
            var now = Date.now();

            if (now - lastCall >= timespan) {
                lastCall = now;
                result = fn.apply(this, arguments);
            }

            return result;
        };
    }

    /**
     * Builds a function that passes only one argument to the given function.<br/>
     * It's simply a shortcut for a common use case of {@link module:lamb.aritize|aritize},
     * exposed for convenience.
     * @example
     * var weights = ["2 Kg", "10 Kg", "1 Kg", "7 Kg"];
     *
     * _.map(weights, _.unary(parseInt)) // => [2, 10, 1, 7]
     *
     * @memberof module:lamb
     * @category Function
     * @see {@link module:lamb.aritize|aritize}
     * @see {@link module:lamb.binary|binary}
     * @param {Function} fn
     * @returns {Function}
     */
    function unary (fn) {
        return function (a) {
            return fn.call(this, a);
        };
    }

    lamb.application = application;
    lamb.apply = apply;
    lamb.applyTo = applyTo;
    lamb.aritize = aritize;
    lamb.asPartial = asPartial;
    lamb.binary = binary;
    lamb.collect = collect;
    lamb.curry = curry;
    lamb.curryRight = curryRight;
    lamb.curryable = curryable;
    lamb.curryableRight = curryableRight;
    lamb.debounce = debounce;
    lamb.flip = flip;
    lamb.getArgAt = getArgAt;
    lamb.invoker = invoker;
    lamb.invokerOn = invokerOn;
    lamb.mapArgs = mapArgs;
    lamb.pipe = pipe;
    lamb.tapArgs = tapArgs;
    lamb.throttle = throttle;
    lamb.unary = unary;

    /**
     * Builds a <code>checker</code> function meant to be used with
     * {@link module:lamb.validate|validate}.<br/>
     * Note that the function accepts multiple <code>keyPaths</code> as a means to
     * compare their values. In other words all the received <code>keyPaths</code> will be
     * passed as arguments to the <code>predicate</code> to run the test.<br/>
     * If you want to run the same single property check with multiple properties, you should build
     * multiple <code>checker</code>s and combine them with {@link module:lamb.validate|validate}.
     * @example
     * var user = {
     *     name: "John",
     *     surname: "Doe",
     *     login: {
     *         username: "jdoe",
     *         password: "abc123",
     *         passwordConfirm: "abc123"
     *     }
     * };
     * var pwdMatch = _.checker(
     *     _.is,
     *     "Passwords don't match",
     *     ["login.password", "login.passwordConfirm"]
     * );
     *
     * pwdMatch(user) // => []
     *
     * var newUser = _.setPathIn(user, "login.passwordConfirm", "avc123");
     *
     * pwdMatch(newUser) // => ["Passwords don't match", ["login.password", "login.passwordConfirm"]]
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.validate|validate}, {@link module:lamb.validateWith|validateWith}
     * @param {Function} predicate - The predicate to test the object properties
     * @param {String} message - The error message
     * @param {String[]} keyPaths - The array of keys, or {@link module:lamb.getPathIn|paths}, to test.
     * @param {String} [pathSeparator="."]
     * @returns {Function} A checker function which returns an error in the form
     * <code>["message", ["propertyA", "propertyB"]]</code> or an empty array.
     */
    function checker (predicate, message, keyPaths, pathSeparator) {
        return function (obj) {
            var getValues = partial(getPathIn, obj, _, pathSeparator);

            return predicate.apply(obj, map(keyPaths, getValues)) ? [] : [message, keyPaths];
        };
    }

    /**
     * Creates an array with all the enumerable properties of the given object.
     * @example <caption>Showing the difference with {@link module:lamb.keys|keys}:</caption>
     * var baseFoo = Object.create({a: 1}, {b: {value: 2}});
     * var foo = Object.create(baseFoo, {
     *     c: {value: 3},
     *     d: {value: 4, enumerable: true}
     * });
     *
     * _.keys(foo) // => ["d"]
     * _.enumerables(foo) // => ["d", "a"]
     *
     * @memberof module:lamb
     * @category Object
     * @function
     * @see {@link module:lamb.keys|keys}
     * @param {Object} obj
     * @returns {String[]}
     */
    var enumerables = _unsafeKeyListFrom(_safeEnumerables);

    /**
     * Builds an object from a list of key / value pairs like the one
     * returned by {@link module:lamb.pairs|pairs} or {@link module:lamb.ownPairs|ownPairs}.<br/>
     * In case of duplicate keys the last key / value pair is used.
     * @example
     * _.fromPairs([["a", 1], ["b", 2], ["c", 3]]) // => {"a": 1, "b": 2, "c": 3}
     * _.fromPairs([["a", 1], ["b", 2], ["a", 3]]) // => {"a": 3, "b": 2}
     * _.fromPairs([[1], [void 0, 2], [null, 3]]) // => {"1": undefined, "undefined": 2, "null": 3}
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.ownPairs|ownPairs}, {@link module:lamb.pairs|pairs}
     * @param {Array<Array<String, *>>} pairsList
     * @returns {Object}
     */
    function fromPairs (pairsList) {
        var result = {};

        forEach(pairsList, function (pair) {
            result[pair[0]] = pair[1];
        });

        return result;
    }

    /**
     * Verifies the existence of a property in an object.
     * @example
     * var user1 = {name: "john"};
     *
     * _.has(user1, "name") // => true
     * _.has(user1, "surname") // => false
     * _.has(user1, "toString") // => true
     *
     * var user2 = Object.create(null);
     *
     * // not inherited through the prototype chain
     * _.has(user2, "toString") // => false
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.hasKey|hasKey}
     * @see {@link module:lamb.hasOwn|hasOwn}, {@link module:lamb.hasOwnKey|hasOwnKey}
     * @see {@link module:lamb.pathExistsIn|pathExistsIn}, {@link module:lamb.pathExists|pathExists}
     * @param {Object} obj
     * @param {String} key
     * @returns {Boolean}
     */
    function has (obj, key) {
        if (typeof obj !== "object" && !isUndefined(obj)) {
            obj = Object(obj);
        }

        return key in obj;
    }

    /**
     * Curried version of {@link module:lamb.has|has}.<br/>
     * Returns a function expecting the object to check against the given key.
     * @example
     * var user1 = {name: "john"};
     * var user2 = {};
     * var hasName = _.hasKey("name");
     *
     * hasName(user1) // => true
     * hasName(user2) // => false
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.has|has}
     * @see {@link module:lamb.hasOwn|hasOwn}, {@link module:lamb.hasOwnKey|hasOwnKey}
     * @see {@link module:lamb.pathExistsIn|pathExistsIn}, {@link module:lamb.pathExists|pathExists}
     * @param {String} key
     * @returns {Function}
     */
    function hasKey (key) {
        return function (obj) {
            return has(obj, key);
        };
    }

    /**
     * Builds a predicate expecting an object to check against the given key / value pair.<br/>
     * The value check is made with the ["SameValueZero" comparison]{@link module:lamb.isSVZ|isSVZ}.
     * @example
     * var hasTheCorrectAnswer = _.hasKeyValue("answer", 42);
     *
     * hasTheCorrectAnswer({answer: 2}) // false
     * hasTheCorrectAnswer({answer: 42}) // true
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.hasPathValue|hasPathValue}
     * @param {String} key
     * @param {*} value
     * @returns {Function}
     */
    function hasKeyValue (key, value) {
        return function (obj) {
            return isSVZ(value, obj[key]);
        };
    }

    /**
     * Verifies if an object has the specified property and that the property isn't inherited through
     * the prototype chain.<br/>
     * @example <caption>Comparison with <code>has</code>:</caption>
     * var user = {name: "john"};
     *
     * _.has(user, "name") // => true
     * _.has(user, "surname") // => false
     * _.has(user, "toString") // => true
     *
     * _.hasOwn(user, "name") // => true
     * _.hasOwn(user, "surname") // => false
     * _.hasOwn(user, "toString") // => false
     *
     * @memberof module:lamb
     * @category Object
     * @function
     * @see {@link module:lamb.hasOwnKey|hasOwnKey}
     * @see {@link module:lamb.has|has}, {@link module:lamb.hasKey|hasKey}
     * @see {@link module:lamb.pathExistsIn|pathExistsIn}, {@link module:lamb.pathExists|pathExists}
     * @param {Object} obj
     * @param {String} key
     * @returns {Boolean}
     */
    var hasOwn = generic(_objectProto.hasOwnProperty);

    /**
     * Curried version of {@link module:lamb.hasOwn|hasOwn}.<br/>
     * Returns a function expecting the object to check against the given key.
     * @example
     * var user = {name: "john"};
     * var hasOwnName = _.hasOwnKey("name");
     * var hasOwnToString = _.hasOwnToString("toString");
     *
     * hasOwnName(user) // => true
     * hasOwnToString(user) // => false
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.hasOwn|hasOwn}
     * @see {@link module:lamb.has|has}, {@link module:lamb.hasKey|hasKey}
     * @see {@link module:lamb.pathExistsIn|pathExistsIn}, {@link module:lamb.pathExists|pathExists}
     * @param {String} key
     * @returns {Function}
     */
    function hasOwnKey (key) {
        return function (obj) {
            return hasOwn(obj, key);
        };
    }

    /**
     * Builds a predicate to check if the given path exists in an object and holds the desired value.<br/>
     * The value check is made with the ["SameValueZero" comparison]{@link module:lamb.isSVZ|isSVZ}.<br/>
     * Note that the function will check even non-enumerable properties.
     * @example
     * var user = {
     *     name: "John",
     *     surname: "Doe",
     *     personal: {
     *         age: 25,
     *         gender: "M"
     *     },
     *     scores: [
     *         {id: 1, value: 10, passed: false},
     *         {id: 2, value: 20, passed: false},
     *         {id: 3, value: 30, passed: true}
     *     ]
     * };
     *
     * var isMale = _.hasPathValue("personal.gender", "M");
     * var hasPassedFirstTest = _.hasPathValue("scores.0.passed", true);
     * var hasPassedLastTest = _.hasPathValue("scores.-1.passed", true);
     *
     * isMale(user) // => true
     * hasPassedFirstTest(user) // => false
     * hasPassedLastTest(user) // => true
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.hasKeyValue|hasKeyValue}
     * @param {String} path
     * @param {*} value
     * @param {String} [separator="."]
     * @returns {Function}
     */
    function hasPathValue (path, value, separator) {
        return function (obj) {
            var pathInfo = _getPathInfo(obj, _toPathParts(path, separator), true);

            return pathInfo.isValid && isSVZ(pathInfo.target, value);
        };
    }

    /**
     * Makes an object immutable by recursively calling [Object.freeze]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze}
     * on its members.<br/>
     * Any attempt to extend or modify the object can throw a <code>TypeError</code> or fail silently,
     * depending on the environment and the [strict mode]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode} directive.
     * @example
     * var user = _.immutable({
     *     name: "John",
     *     surname: "Doe",
     *     login: {
     *         username: "jdoe",
     *         password: "abc123"
     *     },
     *     luckyNumbers: [13, 17]
     * });
     *
     * // All of these statements will fail and possibly
     * // throw a TypeError (see the function description)
     * user.name = "Joe";
     * delete user.name;
     * user.newProperty = [];
     * user.login.password = "foo";
     * user.luckyNumbers.push(-13);
     *
     * @memberof module:lamb
     * @category Object
     * @param {Object} obj
     * @returns {Object}
     */
    function immutable (obj) {
        return _immutable(obj, []);
    }

    /**
     * Retrieves the list of the own enumerable properties of an object.<br/>
     * Although [Object.keys]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys}
     * is already present in ECMAScript 5, its behaviour changed in the subsequent specifications
     * of the standard.<br/>
     * This function <em>shims</em> the ECMAScript 6 version, by forcing a conversion to
     * object for any value but <code>null</code> and <code>undefined</code>.
     * @example <caption>Showing the difference with {@link module:lamb.enumerables|enumerables}:</caption>
     * var baseFoo = Object.create({a: 1}, {b: {value: 2}});
     * var foo = Object.create(baseFoo, {
     *     c: {value: 3},
     *     d: {value: 4, enumerable: true}
     * });
     *
     * _.enumerables(foo) // => ["d", "a"]
     * _.keys(foo) // => ["d"]
     *
     * @memberof module:lamb
     * @category Object
     * @function
     * @see {@link module:lamb.enumerables|enumerables}
     * @param {Object} obj
     * @returns {String[]}
     */
    var keys = _unsafeKeyListFrom(_safeKeys);

    /**
     * Builds a predicate to check if the given key satisfies the desired condition
     * on an object.
     * @example
     * var users = [
     *     {name: "John", age: 25},
     *     {name: "Jane", age: 15},
     * ];
     * var isGreaterThan = _.curryRight(_.isGT);
     * var isAdult = _.keySatisfies(isGreaterThan(17), "age");
     *
     * isAdult(users[0]) // => true
     * isAdult(users[1]) // => false
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.pathSatisfies|pathSatisfies}
     * @param {Function} predicate
     * @param {String} key
     * @returns {Function}
     */
    function keySatisfies (predicate, key) {
        return function (obj) {
            return predicate.call(this, obj[key]);
        };
    }

    /**
     * Builds an object from the two given lists, using the first one as keys and the last
     * one as values.<br/>
     * If the list of keys is longer than the values one, the keys will be created with
     * <code>undefined</code> values.<br/>
     * If more values than keys are supplied, the extra values will be ignored.
     * @example
     * _.make(["a", "b", "c"], [1, 2, 3]) // => {a: 1, b: 2, c: 3}
     * _.make(["a", "b", "c"], [1, 2]) // => {a: 1, b: 2, c: undefined}
     * _.make(["a", "b"], [1, 2, 3]) // => {a: 1, b: 2}
     * _.make([null, void 0, 2], [1, 2, 3]) // => {"null": 1, "undefined": 2, "2": 3}
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.tear|tear}, {@link module:lamb.tearOwn|tearOwn} for the reverse operation
     * @param {String[]} names
     * @param {ArrayLike} values
     * @returns {Object}
     */
    function make (names, values) {
        var result = {};
        var valuesLen = values.length;

        for (var i = 0, len = names.length; i < len; i++) {
            result[names[i]] = i < valuesLen ? values[i] : void 0;
        }

        return result;
    }

    /**
     * Merges the enumerable properties of the provided sources into a new object.<br/>
     * In case of key homonymy each source has precedence over the previous one.
     * @example
     * _.merge({a: 1}, {b: 3, c: 4}, {b: 5}) // => {a: 1, b: 5, c: 4}
     *
     * @example <caption>Array-like objects will be transformed to objects with numbers as keys:</caption>
     * _.merge([1, 2], {a: 2}) // => {"0": 1, "1": 2, a: 2}
     * _.merge("foo", {a: 2}) // => {"0": "f", "1": "o", "2": "o", a: 2}
     *
     * @example <caption>Every other value will be treated as an empty object:</caption>
     * _.merge({a: 2}, null, NaN) // => {a: 2}
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.mergeOwn|mergeOwn} to merge own properties only
     * @function
     * @param {...Object} source
     * @returns {Object}
     */
    var merge = partial(_merge, _safeEnumerables);

    /**
     * Same as {@link module:lamb.merge|merge}, but only the own properties of the
     * sources are taken into account.
     * @example <caption>Showing the difference with <code>merge</code>:</caption>
     * var baseFoo = Object.create({a: 1}, {b: {value: 2, enumerable: true}, z: {value: 5}});
     * var foo = Object.create(baseFoo, {
     *     c: {value: 3, enumerable: true}
     * });
     *
     * var bar = {d: 4};
     *
     * _.merge(foo, bar) // => {a: 1, b: 2, c: 3, d: 4}
     * _.mergeOwn(foo, bar) // => {c: 3, d: 4}
     *
     * @example <caption>Array-like objects will be transformed to objects with numbers as keys:</caption>
     * _.mergeOwn([1, 2], {a: 2}) // => {"0": 1, "1": 2, a: 2}
     * _.mergeOwn("foo", {a: 2}) // => {"0": "f", "1": "o", "2": "o", a: 2}
     *
     * @example <caption>Every other value will be treated as an empty object:</caption>
     * _.mergeOwn({a: 2}, null, NaN) // => {a: 2}
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.merge|merge} to merge all enumerable properties
     * @function
     * @param {...Object} source
     * @returns {Object}
     */
    var mergeOwn = partial(_merge, _safeKeys);

    /**
     * Same as {@link module:lamb.pairs|pairs}, but only the own enumerable properties of the object are
     * taken into account.<br/>
     * See also {@link module:lamb.fromPairs|fromPairs} for the reverse operation.
     * @example <caption>Showing the difference with <code>pairs</code>:</caption>
     * var baseFoo = Object.create({a: 1}, {b: {value: 2, enumerable: true}, z: {value: 5}});
     * var foo = Object.create(baseFoo, {
     *     c: {value: 3, enumerable: true}
     * });
     *
     * _.pairs(foo) // => [["c", 3], ["b", 2], ["a", 1]]
     * _.ownPairs(foo) // => [["c", 3]]
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.pairs|pairs}
     * @see {@link module:lamb.fromPairs|fromPairs}
     * @function
     * @param {Object} obj
     * @returns {Array<Array<String, *>>}
     */
    var ownPairs = _pairsFrom(keys);

    /**
     * Same as {@link module:lamb.values|values}, but only the own enumerable properties of the object are
     * taken into account.<br/>
     * @example <caption>Showing the difference with <code>values</code>:</caption>
     * var baseFoo = Object.create({a: 1}, {b: {value: 2, enumerable: true}, z: {value: 5}});
     * var foo = Object.create(baseFoo, {
     *     c: {value: 3, enumerable: true}
     * });
     *
     * _.values(foo) // => [3, 2, 1]
     * _.ownValues(foo) // => [3]
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.values|values}
     * @function
     * @param {Object} obj
     * @returns {Array}
     */
    var ownValues = _valuesFrom(keys);

    /**
     * Converts an object into an array of key / value pairs of its enumerable properties.<br/>
     * See also {@link module:lamb.ownPairs|ownPairs} for picking only the own enumerable
     * properties and {@link module:lamb.fromPairs|fromPairs} for the reverse operation.
     * @example
     * _.pairs({a: 1, b: 2, c: 3}) // => [["a", 1], ["b", 2], ["c", 3]]
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.ownPairs|ownPairs}
     * @see {@link module:lamb.fromPairs|fromPairs}
     * @function
     * @param {Object} obj
     * @returns {Array<Array<String, *>>}
     */
    var pairs = _pairsFrom(enumerables);

    /**
     * Builds a partial application of {@link module:lamb.pathExistsIn|pathExistsIn} using the given
     * path and the optional separator. The resulting function expects the object to check.<br/>
     * Note that the function will check even non-enumerable properties.
     * @example
     * var user = {
     *     name: "John",
     *     surname: "Doe",
     *     address: {
     *         city: "New York"
     *     },
     *     scores: [10, 20, 15]
     * };
     *
     * var hasCity = _.pathExists("address.city");
     * var hasCountry = _.pathExists("address.country");
     * var hasAtLeastThreeScores = _.pathExists("scores.2");
     *
     * hasCity(user) // => true
     * hasCountry(user) // => false
     * hasAtLeastThreeScores(user) // => true
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.pathExistsIn|pathExistsIn}
     * @see {@link module:lamb.hasOwn|hasOwn}, {@link module:lamb.hasOwnKey|hasOwnKey}
     * @see {@link module:lamb.has|has}, {@link module:lamb.hasKey|hasKey}
     * @param {String} path
     * @param {String} [separator="."]
     * @returns {Function}
     */
    function pathExists (path, separator) {
        return function (obj) {
            return pathExistsIn(obj, path, separator);
        };
    }

    /**
     * Checks if the provided path exists in the given object.<br/>
     * Note that the function will check even non-enumerable properties.
     * @example
     * var user = {
     *     name: "John",
     *     surname: "Doe",
     *     address: {
     *         city: "New York"
     *     },
     *     scores: [10, 20, 15]
     * };
     *
     * _.pathExistsIn(user, "address.city") // => true
     * _.pathExistsIn(user, "address.country") // => false
     * _.pathExistsIn(user, "scores.1") // => true
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.pathExists|pathExists}
     * @see {@link module:lamb.hasOwn|hasOwn}, {@link module:lamb.hasOwnKey|hasOwnKey}
     * @see {@link module:lamb.has|has}, {@link module:lamb.hasKey|hasKey}
     * @param {Object} obj
     * @param {String} path
     * @param {String} [separator="."]
     * @returns {Boolean}
     */
    function pathExistsIn (obj, path, separator) {
        var pathInfo = _getPathInfo(obj, _toPathParts(path, separator), true);

        return pathInfo.isValid;
    }

    /**
     * Builds a predicate that verifies if a condition is satisfied for the given
     * path in an object.<br/>
     * Like the other "path functions" you can use integers in the path, even
     * negative ones, to refer to array-like object indexes, but the priority will
     * be given to existing object keys.
     * @example
     * var user = {
     *     name: "John",
     *     performance: {
     *         scores: [1, 5, 10]
     *     }
     * };
     *
     * var isGreaterThan = _.curryRight(_.isGT);
     * var gotAnHighScore = _.pathSatisfies(_.contains(10), "performance.scores");
     * var hadAGoodStart = _.pathSatisfies(isGreaterThan(6), "performance.scores.0");
     *
     * gotAnHighScore(user) // => true
     * hadAGoodStart(user) // => false
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.keySatisfies|keySatisfies}
     * @param {Function} predicate
     * @param {String} path
     * @param {String} [separator="."]
     * @returns {Function}
     */
    function pathSatisfies (predicate, path, separator) {
        return function (obj) {
            var pathInfo = _getPathInfo(obj, _toPathParts(path, separator), true);

            return predicate.call(this, pathInfo.target);
        };
    }

    /**
     * Returns an object containing only the specified properties of the given object.<br/>
     * Non existent properties will be ignored.
     * @example
     * var user = {name: "john", surname: "doe", age: 30};
     *
     * _.pick(user, ["name", "age"]) // => {"name": "john", "age": 30};
     * _.pick(user, ["name", "email"]) // => {"name": "john"}
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.pickIf|pickIf}, {@link module:lamb.pickKeys|pickKeys}
     * @see {@link module:lamb.skip|skip}, {@link module:lamb.skipIf|skipIf}
     * @param {Object} source
     * @param {String[]} whitelist
     * @returns {Object}
     */
    function pick (source, whitelist) {
        var result = {};

        forEach(whitelist, function (key) {
            if (has(source, key)) {
                result[key] = source[key];
            }
        });

        return result;
    }

    /**
     * Builds a function expecting an object whose enumerable properties will be checked
     * against the given predicate.<br/>
     * The properties satisfying the predicate will be included in the resulting object.
     * @example
     * var user = {name: "john", surname: "doe", age: 30};
     * var pickIfIsString = _.pickIf(_.isType("String"));
     *
     * pickIfIsString(user) // => {name: "john", surname: "doe"}
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.pick|pick}, {@link module:lamb.pickKeys|pickKeys}
     * @see {@link module:lamb.skip|skip}, {@link module:lamb.skipKeys|skipKeys},
     * {@link module:lamb.skipIf|skipIf}
     * @param {ObjectIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Function}
     */
    function pickIf (predicate, predicateContext) {
        if (arguments.length === 2) {
            predicate = predicate.bind(predicateContext);
        }

        return function (source) {
            var result = {};

            forEach(enumerables(source), function (key) {
                if (predicate(source[key], key, source)) {
                    result[key] = source[key];
                }
            });

            return result;
        };
    }

    /**
     * A curried version of {@link module:lamb.pick|pick}, expecting a whitelist of keys to build
     * a function waiting for the object to act upon.
     * @example
     * var user = {id: 1, name: "Jane", surname: "Doe", active: false};
     * var getUserInfo = _.pickKeys(["id", "active"]);
     *
     * getUserInfo(user) // => {id: 1, active: false}
     *
     * @example <caption>A useful composition with <code>mapWith</code>:</caption>
     * var users = [
     *     {id: 1, name: "Jane", surname: "Doe", active: false},
     *     {id: 2, name: "John", surname: "Doe", active: true},
     *     {id: 3, name: "Mario", surname: "Rossi", active: true},
     *     {id: 4, name: "Paolo", surname: "Bianchi", active: false}
     * ];
     * var select = _.compose(_.mapWith, _.pickKeys);
     * var selectUserInfo = select(["id", "active"]);
     *
     * selectUserInfo(users) // =>
     * // [
     * //     {id: 1, active: false},
     * //     {id: 2, active: true},
     * //     {id: 3, active: true},
     * //     {id: 4, active: false}
     * // ]
     *
     * @memberof module:lamb
     * @category Object
     * @function
     * @see {@link module:lamb.pick|pick}, {@link module:lamb.pickIf|pickIf}
     * @see {@link module:lamb.skip|skip}, {@link module:lamb.skipKeys|skipKeys},
     * {@link module:lamb.skipIf|skipIf}
     * @param {String[]} whitelist
     * @returns {Function}
     */
    var pickKeys = _curry(pick, 2, true);

    /**
     * Creates a copy of the given object with its enumerable keys renamed as
     * indicated in the provided lookup table.
     * @example
     * var person = {"firstName": "John", "lastName": "Doe"};
     * var keysMap = {"firstName": "name", "lastName": "surname"};
     *
     * _.rename(person, keysMap) // => {"name": "John", "surname": "Doe"}
     *
     * @example <caption>It's safe using it to swap keys:</caption>
     * var keysMap = {"firstName": "lastName", "lastName": "firstName"};
     *
     * _.rename(person, keysMap) // => {"lastName": "John", "firstName": "Doe"}
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.renameKeys|renameKeys}, {@link module:lamb.renameWith|renameWith}
     * @param {Object} source
     * @param {Object} keysMap
     * @returns {Object}
     */
    function rename (source, keysMap) {
        keysMap = Object(keysMap);
        var result = {};
        var oldKeys = enumerables(source);

        for (var prop in keysMap) {
            if (~oldKeys.indexOf(prop)) {
                result[keysMap[prop]] = source[prop];
            }
        }

        for (var i = 0, len = oldKeys.length, key; i < len; i++) {
            key = oldKeys[i];

            if (!(key in keysMap || key in result)) {
                result[key] = source[key];
            }
        }

        return result;
    }

    /**
     * A curried version of {@link module:lamb.rename|rename} expecting a
     * <code>keysMap</code> to build a function waiting for the object to act upon.
     * @example
     * var persons = [
     *     {"firstName": "John", "lastName": "Doe"},
     *     {"first_name": "Mario", "last_name": "Rossi"},
     * ];
     * var normalizeKeys = _.renameKeys({
     *     "firstName": "name",
     *     "first_name": "name",
     *     "lastName": "surname",
     *     "last_name": "surname"
     * });
     *
     * _.map(persons, normalizeKeys) // =>
     * // [
     * //     {"name": "John", "surname": "Doe"},
     * //     {"name": "Mario", "surname": "Rossi"}
     * // ]
     *
     * @memberof module:lamb
     * @category Object
     * @function
     * @see {@link module:lamb.rename|rename}, {@link module:lamb.renameWith|renameWith}
     * @param {Object} keysMap
     * @returns {Function}
     */
    var renameKeys = _curry(rename, 2, true);

    /**
     * Uses the provided function as a <code>keysMap</code> generator and returns
     * a function expecting the object whose keys we want to {@link module:lamb.rename|rename}.
     * @example
     * var person = {"NAME": "John", "SURNAME": "Doe"};
     * var arrayToLower = _.mapWith(_.invoker("toLowerCase"));
     * var makeLowerKeysMap = function (source) {
     *     var sourceKeys = _.keys(source);
     *
     *     return _.make(sourceKeys, arrayToLower(sourceKeys));
     * };
     * var lowerKeysFor = _.renameWith(makeLowerKeysMap);
     *
     * lowerKeysFor(person) // => {"name": "John", "surname": "doe"};
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.rename|rename}, {@link module:lamb.renameKeys|renameKeys}
     * @param {Function} fn
     * @returns {Function}
     */
    function renameWith (fn) {
        return function (source) {
            return rename(source, fn(source));
        };
    }

    /**
     * Returns a copy of the source object without the specified properties.
     * @example
     * var user = {name: "john", surname: "doe", age: 30};
     *
     * _.skip(user, ["name", "age"]) // => {surname: "doe"};
     * _.skip(user, ["name", "email"]) // => {surname: "doe", age: 30};
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.skipKeys|skipKeys}, {@link module:lamb.skipIf|skipIf}
     * @see {@link module:lamb.pick|pick}, {@link module:lamb.pickKeys|pickKeys},
     * {@link module:lamb.pickIf|pickIf}
     * @param {Object} source
     * @param {String[]} blacklist
     * @returns {Object}
     */
    function skip (source, blacklist) {
        var result = {};

        forEach(enumerables(source), function (key) {
            if (!isIn(blacklist, key)) {
                result[key] = source[key];
            }
        });

        return result;
    }

    /**
     * Builds a function expecting an object whose enumerable properties will be checked
     * against the given predicate.<br/>
     * The properties satisfying the predicate will be omitted in the resulting object.
     * @example
     * var user = {name: "john", surname: "doe", age: 30};
     * var skipIfIstring = _.skipIf(_.isType("String"));
     *
     * skipIfIstring(user) // => {age: 30}
     *
     * @memberof module:lamb
     * @category Object
     * @function
     * @see {@link module:lamb.skip|skip}, {@link module:lamb.skipKeys|skipKeys}
     * @see {@link module:lamb.pick|pick}, {@link module:lamb.pickKeys|pickKeys},
     * {@link module:lamb.pickIf|pickIf}
     * @param {ObjectIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Function}
     */
    var skipIf = tapArgs(pickIf, not);

    /**
     * A curried version of {@link module:lamb.skip|skip}, expecting a blacklist of keys to build
     * a function waiting for the object to act upon.
     * @example
     * var user = {id: 1, name: "Jane", surname: "Doe", active: false};
     * var getUserInfo = _.skipKeys(["name", "surname"]);
     *
     * getUserInfo(user) // => {id: 1, active: false}
     *
     * @example <caption>A useful composition with <code>mapWith</code>:</caption>
     * var users = [
     *     {id: 1, name: "Jane", surname: "Doe", active: false},
     *     {id: 2, name: "John", surname: "Doe", active: true},
     *     {id: 3, name: "Mario", surname: "Rossi", active: true},
     *     {id: 4, name: "Paolo", surname: "Bianchi", active: false}
     * ];
     * var discard = _.compose(_.mapWith, _.skipKeys);
     * var discardNames = discard(["name", "surname"]);
     *
     * discardNames(users) // =>
     * // [
     * //     {id: 1, active: false},
     * //     {id: 2, active: true},
     * //     {id: 3, active: true},
     * //     {id: 4, active: false}
     * // ]
     *
     * @memberof module:lamb
     * @category Object
     * @function
     * @see {@link module:lamb.skip|skip}, {@link module:lamb.skipIf|skipIf}
     * @see {@link module:lamb.pick|pick}, {@link module:lamb.pickKeys|pickKeys},
     * {@link module:lamb.pickIf|pickIf}
     * @param {String[]} blacklist
     * @returns {Function}
     */
    var skipKeys = _curry(skip, 2, true);

    /**
     * Tears an object apart by transforming it in an array of two lists: one containing
     * its enumerable keys, the other containing the corresponding values.<br/>
     * Although this "tearing apart" may sound as a rather violent process, the source
     * object will be unharmed.
     * @example
     * _.tear({a: 1, b: 2, c: 3}) // => [["a", "b", "c"], [1, 2, 3]]
     *
     * @memberof module:lamb
     * @category Object
     * @function
     * @see {@link module:lamb.tearOwn|tearOwn}
     * @see {@link module:lamb.make|make} for the reverse operation
     * @param {Object} obj
     * @returns {Array<Array<String>, Array<*>>}
     */
    var tear = _tearFrom(enumerables);

    /**
     * Same as {@link module:lamb.tear|tear}, but only the own properties of the object are
     * taken into account.
     * @example <caption>Showing the difference with <code>tear</code>:</caption>
     * var baseFoo = Object.create({a: 1}, {b: {value: 2, enumerable: true}, z: {value: 5}});
     * var foo = Object.create(baseFoo, {
     *     c: {value: 3, enumerable: true}
     * });
     *
     * _.tear(foo) // => [["c", "b", "a"], [3, 2, 1]]
     * _.tearOwn(foo) // => [["c"], [3]]
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.tear|tear}
     * @see {@link module:lamb.make|make} for the reverse operation
     * @function
     * @param {Object} obj
     * @returns {Array<Array<String>, Array<*>>}
     */
    var tearOwn = _tearFrom(keys);

    /**
     * Validates an object with the given list of {@link module:lamb.checker|checker} functions.
     * @example
     * var hasContent = function (s) { return s.trim().length > 0; };
     * var isGreaterThan = _.curryRight(_.isGT);
     * var userCheckers = [
     *     _.checker(hasContent, "Name is required", ["name"]),
     *     _.checker(hasContent, "Surname is required", ["surname"]),
     *     _.checker(isGreaterThan(17), "Must be at least 18 years old", ["age"])
     * ];
     *
     * var user1 = {name: "john", surname: "doe", age: 30};
     * var user2 = {name: "jane", surname: "", age: 15};
     *
     * _.validate(user1, userCheckers) // => []
     * _.validate(user2, userCheckers) // =>
     * // [
     * //     ["Surname is required", ["surname"]],
     * //     ["Must be at least 18 years old", ["age"]]
     * // ]
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.validateWith|validateWith}
     * @see {@link module:lamb.checker|checker}
     * @param {Object} obj
     * @param {Function[]} checkers
     * @returns {Array<Array<String, String[]>>} An array of errors in the form returned by
     * {@link module:lamb.checker|checker}, or an empty array.
     */
    function validate (obj, checkers) {
        return reduce(checkers, function (errors, _checker) {
            var result = _checker(obj);

            result.length && errors.push(result);

            return errors;
        }, []);
    }

    /**
     * A curried version of {@link module:lamb.validate|validate} accepting a list of
     * {@link module:lamb.checker|checkers} and returning a function expecting the object to validate.
     * @example
     * var hasContent = function (s) { return s.trim().length > 0; };
     * var isGreaterThan = _.curryRight(_.isGT);
     * var userCheckers = [
     *     _.checker(hasContent, "Name is required", ["name"]),
     *     _.checker(hasContent, "Surname is required", ["surname"]),
     *     _.checker(isGreaterThan(17), "Must be at least 18 years old", ["age"])
     * ];
     * var validateUser = _.validateWith(userCheckers);
     *
     * var user1 = {name: "john", surname: "doe", age: 30};
     * var user2 = {name: "jane", surname: "", age: 15};
     *
     * validateUser(user1) // => []
     * validateUser(user2) // =>
     * // [
     * //     ["Surname is required", ["surname"]],
     * //     ["Must be at least 18 years old", ["age"]]
     * // ]
     *
     * @memberof module:lamb
     * @category Object
     * @function
     * @see {@link module:lamb.validate|validate}
     * @see {@link module:lamb.checker|checker}
     * @param {Function[]} checkers
     * @returns {Function}
     */
    var validateWith = _curry(validate, 2, true);

    /**
     * Generates an array with the values of the enumerable properties of the given object.<br/>
     * See also {@link module:lamb.ownValues|ownValues} to pick only from the own properties of the object.
     * @example
     * var user = {name: "john", surname: "doe", age: 30};
     *
     * _.values(user) // => ["john", "doe", 30]
     *
     * @memberof module:lamb
     * @category Object
     * @see {@link module:lamb.ownValues|ownValues}
     * @function
     * @param {Object} obj
     * @returns {Array}
     */
    var values = _valuesFrom(enumerables);

    lamb.checker = checker;
    lamb.enumerables = enumerables;
    lamb.fromPairs = fromPairs;
    lamb.has = has;
    lamb.hasKey = hasKey;
    lamb.hasKeyValue = hasKeyValue;
    lamb.hasOwn = hasOwn;
    lamb.hasOwnKey = hasOwnKey;
    lamb.hasPathValue = hasPathValue;
    lamb.immutable = immutable;
    lamb.keys = keys;
    lamb.keySatisfies = keySatisfies;
    lamb.make = make;
    lamb.merge = merge;
    lamb.mergeOwn = mergeOwn;
    lamb.ownPairs = ownPairs;
    lamb.ownValues = ownValues;
    lamb.pairs = pairs;
    lamb.pathExists = pathExists;
    lamb.pathExistsIn = pathExistsIn;
    lamb.pathSatisfies = pathSatisfies;
    lamb.pick = pick;
    lamb.pickIf = pickIf;
    lamb.pickKeys = pickKeys;
    lamb.rename = rename;
    lamb.renameKeys = renameKeys;
    lamb.renameWith = renameWith;
    lamb.skip = skip;
    lamb.skipIf = skipIf;
    lamb.skipKeys = skipKeys;
    lamb.tear = tear;
    lamb.tearOwn = tearOwn;
    lamb.validate = validate;
    lamb.validateWith = validateWith;
    lamb.values = values;

    /**
     * Pads a string to the desired length with the given char starting from the beginning of the string.
     * @example
     * _.padLeft("foo", "-", 0) // => "foo"
     * _.padLeft("foo", "-", -1) // => "foo"
     * _.padLeft("foo", "-", 5) // => "--foo"
     * _.padLeft("foo", "-", 3) // => "foo"
     * _.padLeft("foo", "ab", 7) // => "aaaafoo"
     * _.padLeft("foo", "", 5) // => "foo"
     * _.padLeft("", "-", 5) // => "-----"
     *
     * @memberof module:lamb
     * @category String
     * @see {@link module:lamb.padRight|padRight}
     * @param {String} source
     * @param {String} char - The padding char. If a string is passed only the first char is used.
     * @param {Number} len
     * @returns {String}
     */
    function padLeft (source, char, len) {
        return _getPadding(source, char, len) + source;
    }

    /**
     * Pads a string to the desired length with the given char starting from the end of the string.
     * @example
     * _.padRight("foo", "-", 0) // => "foo"
     * _.padRight("foo", "-", -1) // => "foo"
     * _.padRight("foo", "-", 5) // => "foo--"
     * _.padRight("foo", "-", 3) // => "foo"
     * _.padRight("foo", "ab", 7) // => "fooaaaa"
     * _.padRight("foo", "", 5) // => "foo"
     * _.padRight("", "-", 5) // => "-----"
     *
     * @memberof module:lamb
     * @category String
     * @see {@link module:lamb.padLeft|padLeft}
     * @param {String} source
     * @param {String} char - The padding char. If a string is passed only the first char is used.
     * @param {Number} len
     * @returns {String}
     */
    function padRight (source, char, len) {
        return source + _getPadding(source, char, len);
    }

    /**
     * Builds a new string by repeating the source string the desired amount of times.<br/>
     * Note that unlike the current ES6 proposal for
     * [String.prototype.repeat]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat},
     * this function doesn't throw a RangeError if <code>times</code> is negative,
     * but returns an empty string instead.
     * @example
     * _.repeat("Hello", -1) // => ""
     * _.repeat("Hello", 1) // => "Hello"
     * _.repeat("Hello", 3) // => "HelloHelloHello"
     *
     * @memberof module:lamb
     * @category String
     * @param {String} source
     * @param {Number} times
     * @returns {String}
     */
    function repeat (source, times) {
        if (isNil(source)) {
            throw _makeTypeErrorFor(source, "string");
        }

        return _repeat(source, Math.floor(times));
    }

    /**
     * Builds a predicate expecting a string to test against the given regular expression pattern.
     * @example
     * var hasNumbersOnly = _.testWith(/^\d+$/);
     *
     * hasNumbersOnly("123") // => true
     * hasNumbersOnly("123 Kg") // => false
     *
     * @memberof module:lamb
     * @category String
     * @param {RegExp} pattern
     * @returns {Function}
     */
    function testWith (pattern) {
        return function (s) {
            return _search(s, pattern) !== -1;
        };
    }

    lamb.padLeft = padLeft;
    lamb.padRight = padRight;
    lamb.repeat = repeat;
    lamb.testWith = testWith;

    /* istanbul ignore next */
    if (typeof exports === "object") {
        module.exports = lamb;
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return lamb;
        });
    } else {
        host.lamb = lamb;
    }
})(this);

/**
 * @callback AccumulatorCallback
 * @global
 * @param {*} previousValue - The value returned it the last execution of the accumulator or, in the first
 * iteration, the {@link module:lamb.reduce|initialValue} if supplied.
 * @param {*} currentValue - The value being processed in the current iteration.
 * @param {Number} idx - The index of the element being processed.
 * @param {ArrayLike} arrayLike - The list being traversed.
 */

/**
 * The built-in arguments object.
 * @typedef {arguments} arguments
 * @global
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments|arguments} in Mozilla documentation.
 */

/**
 * The built-in Array object.
 * @typedef {Array} Array
 * @global
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array|Array} in Mozilla documentation.
 */

/**
 * Any array-like object.
 * @typedef {Array|String|arguments|?} ArrayLike
 * @global
 */

/**
 * The built-in Boolean object.
 * @typedef {Boolean} Boolean
 * @global
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean|Boolean} in Mozilla documentation.
 */

/**
 * The built-in Date object.
 * @typedef {Date} Date
 * @global
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date|Date} in Mozilla documentation.
 */

/**
 * The built-in Function object.
 * @typedef {Function} function
 * @global
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function|Function} and
 *      {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions|Functions} in Mozilla documentation.
 */

/**
 * @callback ListIteratorCallback
 * @global
 * @param {*} element - The element being evaluated.
 * @param {Number} idx - The index of the element within the list.
 * @param {ArrayLike} arrayLike - The list being traversed.
 */

/**
 * The built-in Number object.
 * @typedef {Number} Number
 * @global
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number|Number} in Mozilla documentation.
 */

/**
 * The built-in Object object.
 * @typedef {Object} Object
 * @global
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object|Object} in Mozilla documentation.
 */

/**
 * @callback ObjectIteratorCallback
 * @global
 * @param {*} value - The value of the current property.
 * @param {String} key - The property name.
 * @param {Object} source - The object being traversed.
 */

/**
 * The built-in RegExp object.
 * @typedef {RegExp} RegExp
 * @global
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp|RegExp} in Mozilla documentation.
 */

/**
 * Represent a sorting criteria used by {@link module:lamb.sortedInsert|sortedInsert},
 * {@link module:lamb.sort|sort} and {@link module:lamb.sortWith|sortWith}, and it's
 * usually built using {@link module:lamb.sorter|sorter} and {@link module:lamb.sorterDesc|sorterDesc}.
 * @typedef {Sorter} Sorter
 * @global
 * @property {Boolean} isDescending
 * @property {Function} compare
 */

/**
 * The built-in String object.
 * @typedef {String} String
 * @global
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String|String} in Mozilla documentation.
 */

/**
 * The built-in primitive value <code>undefined</code>
 * @typedef {Undefined} Undefined
 * @global
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined|undefined} in Mozilla documentation.
 */
