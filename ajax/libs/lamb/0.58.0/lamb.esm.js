/**
* @overview lamb - A lightweight, and docile, JavaScript library to help embracing functional programming.
* @author Andrea Scartabelli <andrea.scartabelli@gmail.com>
* @version 0.58.0
* @module lamb
* @license MIT
*/
/**
 * The placeholder object used in partial application.
 * @memberof module:lamb
 * @alias module:lamb.__
 * @category Special properties
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @since 0.57.0
 * @type {Object}
 */
var __ = {};

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
 * @since 0.1.0
 * @param {*} value
 * @returns {Function}
 */
function always (value) {
    return function () {
        return value;
    };
}

/**
 * Verifies that the two supplied values are the same value using the "SameValueZero" comparison.<br/>
 * With this comparison <code>NaN</code> is equal to itself, but <code>0</code> and <code>-0</code> are
 * considered the same value.<br/>
 * See also {@link module:lamb.isSVZ|isSVZ} for a curried version building a predicate and
 * {@link module:lamb.areSame|areSame} and {@link module:lamb.is|is} to perform a "SameValue" comparison.
 * @example
 * var testObject = {};
 *
 * _.areSVZ({}, testObject) // => false
 * _.areSVZ(testObject, testObject) // => true
 * _.areSVZ("foo", "foo") // => true
 * _.areSVZ(0, -0) // => true
 * _.areSVZ(0 / 0, NaN) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.isSVZ|isSVZ}
 * @see {@link module:lamb.areSame|areSame}, {@link module:lamb.is|is}
 * @see [SameValue comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevalue}
 * @see [SameValueZero comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevaluezero}
 * @since 0.50.0
 * @param {*} a
 * @param {*} b
 * @returns {Boolean}
 */
function areSVZ (a, b) {
    return a !== a ? b !== b : a === b; // eslint-disable-line no-self-compare
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
 * @since 0.10.0
 * @param {Function} fn
 * @returns {Function}
 */
function binary (fn) {
    return function (a, b) {
        return fn.call(this, a, b);
    };
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
 * @since 0.13.0
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
 * Builds a partially applied function.<br/>
 * The {@link module:lamb.__|__} object can be used as a placeholder for arguments.<br/>
 * @example
 * var __ = _.__;
 * var users = [
 *     {id: 1, name: "John", active: true, confirmedMail: true},
 *     {id: 2, name: "Jane", active: true, confirmedMail: false},
 *     {id: 3, name: "Mario", active: false, confirmedMail: false}
 * ];
 * var isKeyTrue = _.partial(_.hasKeyValue, [__, true]);
 * var isActive = isKeyTrue("active");
 * var hasConfirmedMail = isKeyTrue("confirmedMail");
 *
 * _.map(users, isActive) // => [true, true, false]
 * _.map(users, hasConfirmedMail) // => [true, false, false]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.__|__} The placeholder object.
 * @since 0.1.0
 * @param {Function} fn
 * @param {Array} args
 * @returns {Function}
 */
function partial (fn, args) {
    return function () {
        if (!Array.isArray(args)) {
            return fn.apply(this, arguments);
        }

        var lastIdx = 0;
        var newArgs = [];
        var argsLen = args.length;

        for (var i = 0, boundArg; i < argsLen; i++) {
            boundArg = args[i];
            newArgs[i] = boundArg === __ ? arguments[lastIdx++] : boundArg;
        }

        for (var len = arguments.length; lastIdx < len; lastIdx++) {
            newArgs[i++] = arguments[lastIdx];
        }

        return fn.apply(this, newArgs);
    };
}

/**
 * Builds a partial application of a ternary function so that its first parameter
 * is expected as the last one.<br/>
 * The <code>shouldAritize</code> parameter is for the "reduce" functions, where
 * the absence of the <code>initialValue</code> transforms a "fold" operation into a
 * "reduce" one.
 * @private
 * @param {Function} fn
 * @param {Boolean} shouldAritize
 * @returns {Function}
 */
function _makePartial3 (fn, shouldAritize) {
    return function (a, b) {
        var f = shouldAritize && arguments.length !== 2 ? binary(fn) : fn;

        return partial(f, [__, a, b]);
    };
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
 * @function
 * @see {@link module:lamb.clamp|clamp}
 * @since 0.47.0
 * @param {Number} min
 * @param {Number} max
 * @returns {Function}
 */
var clampWithin = _makePartial3(clamp);

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
 * @since 0.1.0
 * @param {*} value
 * @returns {*} The value passed as parameter.
 */
function identity (value) {
    return value;
}

/**
 * Returns a function that is the composition of the functions given as parameters.
 * The first function consumes the result of the function that follows.
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
 * @since 0.1.0
 * @param {Function} a
 * @param {Function} b
 * @returns {Function}
 */
function compose (a, b) {
    return arguments.length ? function () {
        return a.call(this, b.apply(this, arguments));
    } : identity;
}

var MAX_ARRAY_LENGTH = 4294967295;
var MAX_SAFE_INTEGER = 9007199254740991;

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

/* eslint-disable jsdoc/require-returns-check */

/**
 * Executes the provided <code>iteratee</code> for each element of the given array-like object.<br/>
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
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} iteratee
 * @returns {Undefined}
 */
function forEach (arrayLike, iteratee) {
    for (var i = 0, len = _toArrayLength(arrayLike.length); i < len; i++) {
        iteratee(arrayLike[i], i, arrayLike);
    }
}

/**
 * Creates generic functions out of methods.
 * @author A very little change on a great idea by [Irakli Gozalishvili]{@link https://github.com/Gozala/}.
 * Thanks for this *beautiful* one-liner (never liked your "unbind" naming choice, though).
 * @memberof module:lamb
 * @category Function
 * @function
 * @example
 * var join = _.generic(Array.prototype.join);
 *
 * join([1, 2, 3, 4, 5], "-") // => "1-2-3-4-5"
 *
 * // the function will work with any array-like object
 * join("hello", "-") // => "h-e-l-l-o"
 *
 * @since 0.1.0
 * @param {Function} method
 * @returns {Function}
 */
var generic = Function.bind.bind(Function.call);

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
 * @since 0.1.0
 * @param {*} value
 * @returns {Boolean}
 */
function isNull (value) {
    return value === null;
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
 * @since 0.1.0
 * @param {*} value
 * @returns {Boolean}
 */
function isUndefined (value) {
    return value === void 0;
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
 * @since 0.1.0
 * @param {*} value
 * @returns {Boolean}
 */
function isNil (value) {
    return isNull(value) || isUndefined(value);
}

/**
 * Curries a function of arity 2.
 * @private
 * @param {Function} fn
 * @param {Boolean} [isRightCurry=false]
 * @returns {Function}
 */
function _curry2 (fn, isRightCurry) {
    return function (a) {
        return function (b) {
            return isRightCurry ? fn.call(this, b, a) : fn.call(this, a, b);
        };
    };
}

/**
 * A curried version of {@link module:lamb.areSVZ|areSVZ}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * and the one received by the predicate are the same using the "SameValueZero"
 * comparison.<br/>
 * See also {@link module:lamb.areSame|areSame} and {@link module:lamb.is|is}
 * to perform a "SameValue" comparison.
 * @example
 * var john = {name: "John", surname: "Doe"};
 * var isJohn = _.isSVZ(john);
 * var isZero = _.isSVZ(0);
 * var isReallyNaN = _.isSVZ(NaN);
 *
 * isJohn(john) // => true
 * isJohn({name: "John", surname: "Doe"}) // => false
 *
 * isZero(0) // => true
 * isZero(-0) // => true
 *
 * isNaN(NaN) // => true
 * isNaN("foo") // => true
 *
 * isReallyNaN(NaN) // => true
 * isReallyNaN("foo") // => false
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.areSVZ|areSVZ}
 * @see {@link module:lamb.areSame|areSame}, {@link module:lamb.is|is}
 * @see [SameValue comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevalue}
 * @see [SameValueZero comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevaluezero}
 * @since 0.1.0
 * @param {*} value
 * @returns {Function}
 */
var isSVZ = _curry2(areSVZ);

/**
 * Builds a new array by applying the iteratee function to each element of the
 * received array-like object.<br/>
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
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} iteratee
 * @returns {Array}
 */
function map (arrayLike, iteratee) {
    var len = _toArrayLength(arrayLike.length);
    var result = Array(len);

    for (var i = 0; i < len; i++) {
        result[i] = iteratee(arrayLike[i], i, arrayLike);
    }

    return result;
}

/**
 * A curried version of {@link module:lamb.map|map} that uses the provided iteratee to
 * build a function expecting the array-like object to act upon.
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
 * @since 0.1.0
 * @param {ListIteratorCallback} iteratee
 * @returns {function}
 */
var mapWith = _curry2(map, true);

/**
 * Like {@link module:lamb.partial|partial} will build a partially applied function and
 * it will accept placeholders.<br/>
 * The difference is that the bound arguments will be appended to the ones received by
 * the resulting function.
 * @example
 * <caption>Explaining the difference with <code>partial</code>:</caption>
 * var f1 = _.partial(_.list, ["a", "b", "c"]);
 * var f2 = _.partialRight(_.list, ["a", "b", "c"]);
 *
 * f1("d", "e") // => ["a", "b", "c", "d", "e"]
 * f2("d", "e") // => ["d", "e", "a", "b", "c"]
 *
 * @example
 * <caption>Explaining placeholder substitutions:</caption>
 * var __ = _.__;
 * var f1 = _.partial(_.list, ["a", __, __, "d"]);
 * var f2 = _.partialRight(_.list, ["a", __, __, "d"]);
 *
 * f1("b", "c", "e") // => ["a", "b", "c", "d", "e"]
 * f2("b", "c", "e") // => ["b", "a", "c", "e", "d"]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.partial|partial}
 * @see {@link module:lamb.asPartial|asPartial}
 * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.__|__} The placeholder object.
 * @param {Function} fn
 * @param {Array} args
 * @since 0.52.0
 * @returns {Function}
 */
function partialRight (fn, args) {
    return function () {
        if (!Array.isArray(args)) {
            return fn.apply(this, arguments);
        }

        var lastIdx = arguments.length - 1;
        var argsLen = args.length;
        var boundArgs = Array(argsLen);
        var newArgs = [];

        for (var i = argsLen - 1, boundArg; i > -1; i--) {
            boundArg = args[i];
            boundArgs[i] = boundArg === __ ? arguments[lastIdx--] : boundArg;
        }

        for (i = 0; i <= lastIdx; i++) {
            newArgs[i] = arguments[i];
        }

        for (var j = 0; j < argsLen; j++) {
            newArgs[i++] = boundArgs[j];
        }

        return fn.apply(this, newArgs);
    };
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
 * Reduces (or folds) the values of an array-like object, starting from the first, to a new
 * value using the provided <code>accumulator</code> function.<br/>
 * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
 * @example
 * _.reduce([1, 2, 3, 4], _.sum) // => 10
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.reduceRight|reduceRight}
 * @see {@link module:lamb.reduceWith|reduceWith}, {@link module:lamb.reduceRightWith|reduceRightWith}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {AccumulatorCallback} accumulator
 * @param {*} [initialValue]
 * @returns {*}
 */
var reduce = _makeReducer(1);

/**
 * A partial application of {@link module:lamb.reduce|reduce} that uses the
 * provided <code>accumulator</code> and the optional <code>initialValue</code> to
 * build a function expecting the array-like object to act upon.
 * @example
 * var arr = [1, 2, 3, 4, 5];
 *
 * _.reduceWith(_.sum)(arr) // => 15
 * _.reduceWith(_.subtract)(arr) // => -13
 * _.reduceWith(_.subtract, 0)(arr) // => -15
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.reduceRightWith|reduceRightWith}
 * @see {@link module:lamb.reduce|reduce}, {@link module:lamb.reduce|reduceRight}
 * @since 0.27.0
 * @param {AccumulatorCallback} accumulator
 * @param {*} [initialValue]
 * @returns {Function}
 */
var reduceWith = _makePartial3(reduce, true);

/**
 * Converts a value to an integer.
 * @private
 * @param {*} value
 * @returns {Number}
 */
function _toInteger (value) {
    var n = +value;

    if (n !== n) { // eslint-disable-line no-self-compare
        return 0;
    } else if (n % 1 === 0) {
        return n;
    } else {
        return Math.floor(Math.abs(n)) * (n < 0 ? -1 : 1);
    }
}

/**
 * Builds an array by extracting a portion of an array-like object.<br/>
 * Note that unlike the native array method this function ensures that dense
 * arrays are returned.<br/>
 * Also, unlike the native method, the <code>start</code> and <code>end</code>
 * parameters aren't optional and will be simply converted to integer.<br/>
 * See {@link module:lamb.dropFrom|dropFrom} and {@link module:lamb.drop|drop} if you want a
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
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @since 0.1.0
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
 * See also {@link module:lamb.dropFrom|dropFrom} and {@link module:lamb.drop|drop} if you want a
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
 * @function
 * @see {@link module:lamb.slice|slice}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @since 0.48.0
 * @param {Number} start - Index at which to begin extraction.
 * @param {Number} end - Index at which to end extraction. Extracts up to but not including end.
 * @returns {Function}
 */
var sliceAt = _makePartial3(slice);

var objectProtoToString = Object.prototype.toString;

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
 * @since 0.9.0
 * @param {*} value
 * @returns {String}
 */
function type (value) {
    return objectProtoToString.call(value).slice(8, -1);
}

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
 * @since 0.44.0
 * @param {ArrayLike} arrayLike
 * @param {*} value
 * @returns {Array}
 */
function appendTo (arrayLike, value) {
    return slice(arrayLike, 0, arrayLike.length).concat([value]);
}

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
 * @since 0.44.0
 * @param {*} value
 * @returns {Function}
 */
var append = _curry2(appendTo, true);

/**
 * Checks if an array-like object contains the given value.<br/>
 * Please note that the equality test is made with {@link module:lamb.areSVZ|areSVZ}; so you can
 * check for <code>NaN</code>, but <code>0</code> and <code>-0</code> are the same value.<br/>
 * See also {@link module:lamb.contains|contains} for a curried version building a predicate.
 * @example
 * var numbers = [0, 1, 2, 3, NaN];
 *
 * _.isIn(numbers, 1) // => true
 * _.isIn(numbers, 0) // => true
 * _.isIn(numbers, -0) // => true
 * _.isIn(numbers, NaN) // => true
 * _.isIn(numbers, 5) // => false
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.contains|contains}
 * @since 0.13.0
 * @param {ArrayLike} arrayLike
 * @param {*} value
 * @returns {Boolean}
 */
function isIn (arrayLike, value) {
    var result = false;

    for (var i = 0, len = arrayLike.length; i < len; i++) {
        if (areSVZ(value, arrayLike[i])) {
            result = true;
            break;
        }
    }

    return result;
}

/**
 * Builds a predicate to check if an array-like object contains the given value.<br/>
 * Please note that the equality test is made with {@link module:lamb.areSVZ|areSVZ}; so you can
 * check for <code>NaN</code>, but <code>0</code> and <code>-0</code> are the same value.<br/>
 * See also {@link module:lamb.isIn|isIn} for an uncurried version.
 * @example
 * var containsNaN = _.contains(NaN);
 *
 * containsNaN([0, 1, 2, 3, NaN]) // => true
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.isIn|isIn}
 * @since 0.13.0
 * @param {*} value
 * @returns {Function}
 */
var contains = _curry2(isIn, true);

/**
 * Builds a "grouping function" for an array-like object.
 * @private
 * @param {Function} makeValue
 * @returns {Function}
 */
function _groupWith (makeValue) {
    return function (arrayLike, iteratee) {
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
 * @since 0.21.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} iteratee
 * @returns {Object}
 */
var count = _groupWith(function (a) {
    return a ? ++a : 1;
});

/**
 * A curried version of {@link module:lamb.count|count} that uses the provided iteratee to
 * build a function expecting the array-like object to act upon.
 * @example
 * var persons = [
 *     {"name": "Jane", "city": "New York"},
 *     {"name": "John", "city": "New York"},
 *     {"name": "Mario", "city": "Rome"},
 *     {"name": "Paolo"}
 * ];
 * var getCityOrUnknown = _.adapter([_.getKey("city"), _.always("Unknown")]);
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
 * @since 0.21.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
var countBy = _curry2(count, true);

/**
 * Builds an array comprised of all values of the array-like object passing the <code>predicate</code>
 * test.<br/>
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
 * @since 0.1.0
 * @returns {Array}
 */
function filter (arrayLike, predicate) {
    var len = arrayLike.length;
    var result = [];

    for (var i = 0; i < len; i++) {
        predicate(arrayLike[i], i, arrayLike) && result.push(arrayLike[i]);
    }

    return result;
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
 * @since 0.1.0
 * @param {Function} predicate
 * @returns {Function}
 */
function not (predicate) {
    return function () {
        return !predicate.apply(this, arguments);
    };
}

/**
 * Using the provided iteratee, builds a function that will return an array comprised of the
 * unique elements of an array-like object. The values being compared are the ones returned by
 * the iteratee.<br/>
 * The equality test is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.<br/>
 * When two values are considered equal, the first occurence will be the one included
 * in the result array.<br/>
 * See also {@link module:lamb.uniques|uniques} if you don't need to transform your values before the
 * comparison.
 * @example
 * var data  = [
 *     {id: "1", name: "John"},
 *     {id: "4", name: "Jane"},
 *     {id: "5", name: "Joe"},
 *     {id: "1", name: "Mario"},
 *     {id: "5", name: "Paolo"},
 * ];
 * var uniquesById = _.uniquesBy(_.getKey("id"));
 *
 * uniquesById(data) // => [{id: "1", name: "John"}, {id: "4", name: "Jane"}, {id: "5", name: "Joe"}]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.uniques|uniques}
 * @since 0.51.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
function uniquesBy (iteratee) {
    return function (arrayLike) {
        var result = [];

        for (var i = 0, len = arrayLike.length, seen = [], value; i < len; i++) {
            value = iteratee(arrayLike[i], i, arrayLike);

            if (!isIn(seen, value)) {
                seen.push(value);
                result.push(arrayLike[i]);
            }
        }

        return result;
    };
}

/**
 * Returns an array comprised of the unique elements of the given array-like object.<br/>
 * Note that this function uses the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}
 * to test the equality of values.<br/>
 * When two values are considered equal, the first occurence will be the one included
 * in the result array.<br/>
 * See also {@link module:lamb.uniquesBy|uniquesBy} if you need to transform your values before
 * the comparison or if you have to extract them from complex ones.
 * @example
 * _.uniques([-0, 1, 2, 0, 2, 3, 4, 3, 5, 1]) // => [-0, 1, 2, 3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.uniquesBy|uniquesBy}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @returns {Array}
 */
var uniques = uniquesBy(identity);

/**
 * Returns an array of unique items present only in the first of the two given
 * array-like objects. To determine uniqueness the function uses the
 * ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.
 * @example
 * var a1 = [1, 2, 1, 3, 4];
 * var a2 = [2, 4, 5, 6];
 * var a3 = [3, 4, 5, 2, 1];
 *
 * _.difference(a1, a2) // => [1, 3]
 * _.difference(a2, a3) // => [6]
 * _.difference(a1, a3) // => []
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.intersection|intersection}
 * @see {@link module:lamb.union|union}, {@link module:lamb.unionBy|unionBy}
 * @see {@link module:lamb.pull|pull}, {@link module:lamb.pullFrom|pullFrom}
 * @since 0.6.0
 * @param {ArrayLike} arrayLike
 * @param {ArrayLike} other
 * @returns {Array}
 */
function difference (arrayLike, other) {
    var isNotInOther = partial(not(isIn), [other]);

    return uniques(filter(arrayLike, isNotInOther));
}

/**
 * Builds an array without the first <code>n</code> elements of the given array or array-like object.
 * Note that, being this only a shortcut for a specific use case of {@link module:lamb.slice|slice},
 * <code>n</code> can be a negative number.
 * @example
 * var arr = [1, 2, 3, 4, 5];
 *
 * _.dropFrom(arr, 2) // => [3, 4, 5]
 * _.dropFrom(arr, -1) // => [5]
 * _.dropFrom(arr, -10) // => [1, 2, 3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @since 0.51.0
 * @param {ArrayLike} arrayLike
 * @param {Number} n
 * @returns {Array}
 */
function dropFrom (arrayLike, n) {
    return slice(arrayLike, n, arrayLike.length);
}

/**
 * A curried version of {@link module:lamb.dropFrom|dropFrom} that expects the number of elements
 * to drop to build a function waiting for the list to take the elements from.<br/>
 * See the note and examples for {@link module:lamb.dropFrom|dropFrom} about passing a
 * negative <code>n</code>.
 * @example
 * var drop2 = _.drop(2);
 *
 * drop2([1, 2, 3, 4, 5]) // => [3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @since 0.5.0
 * @see {@link module:lamb.dropFrom|dropFrom}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @param {Number} n
 * @returns {Function}
 */
var drop = _curry2(dropFrom, true);

/**
 * Gets the index of the last element satisfying a predicate in an array-like object.
 * @private
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @param {Boolean} fromLast
 * @returns {Number}
 */
function _getLastHitIndex (arrayLike, predicate, fromLast) {
    var idx;
    var increment;
    var len = arrayLike.length;

    if (fromLast) {
        idx = len - 1;
        increment = -1;
    } else {
        idx = 0;
        increment = 1;
    }

    while (idx >= 0 && idx < len && predicate(arrayLike[idx], idx, arrayLike)) {
        idx += increment;
    }

    return idx;
}

/**
 * Helper to build the {@link module:lamb.takeWhile|takeWhile},
 * {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropWhile|dropWhile} and
 * {@link module:lamb.dropLastWhile|dropLastWhile} functions.
 * @private
 * @param {Boolean} isTake
 * @param {Boolean} fromLast
 * @returns {Function}
 */
function _takeOrDropWhile (isTake, fromLast) {
    return function (predicate) {
        return function (arrayLike) {
            var idxFrom;
            var idxTo;
            var lastHitIndex = _getLastHitIndex(arrayLike, predicate, fromLast);

            if (isTake && fromLast) {
                idxFrom = lastHitIndex + 1;
                idxTo = arrayLike.length;
            } else if (isTake) {
                idxFrom = 0;
                idxTo = lastHitIndex;
            } else if (!isTake && fromLast) {
                idxFrom = 0;
                idxTo = lastHitIndex + 1;
            } else {
                idxFrom = lastHitIndex;
                idxTo = arrayLike.length;
            }

            return slice(arrayLike, idxFrom, idxTo);
        };
    };
}

/**
 * Builds a function that drops the last elements satisfying a predicate
 * from an array or array-like object.
 * @example
 * var isEven = function (n) { return n % 2 === 0; };
 * var dropLastWhileIsEven = _.dropLastWhile(isEven);
 *
 * dropLastWhileIsEven([2, 4, 6, 8]) // => []
 * dropLastWhileIsEven([2, 4, 7, 8]) // => [2, 4, 7]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @since 0.58.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var dropLastWhile = _takeOrDropWhile(false, true);

/**
 * Builds a function that drops the first elements satisfying a predicate
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
 * @function
 * @see {@link module:lamb.takeWhile|takeWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @since 0.5.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var dropWhile = _takeOrDropWhile(false, false);

/**
 * Helper to build the {@link module:lamb.everyIn|everyIn} or the
 * {@link module:lamb.someIn|someIn} function.
 * @private
 * @param {Boolean} defaultResult
 * @returns {Function}
 */
function _makeArrayChecker (defaultResult) {
    return function (arrayLike, predicate) {
        for (var i = 0, len = arrayLike.length; i < len; i++) {
            if (defaultResult ^ !!predicate(arrayLike[i], i, arrayLike)) {
                return !defaultResult;
            }
        }

        return defaultResult;
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
 * var isAdult = _.keySatisfies(_.isGTE(18), "age");
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
 * @since 0.39.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {Boolean}
 */
var everyIn = _makeArrayChecker(true);

/**
 * A curried version of {@link module:lamb.everyIn|everyIn} that expects a predicate
 * to build a function waiting for the array-like to act upon.
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
 * @since 0.39.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var every = _curry2(everyIn, true);

/**
 * A curried version of {@link module:lamb.filter|filter} that uses the given predicate
 * to build a function expecting the array-like object to act upon.
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
 * @since 0.9.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var filterWith = _curry2(filter, true);

/**
 * Helper to create the {@link module:lamb.findIndex|findIndex} and
 * {@link module:lamb.findLastIndex|findLastIndex} functions.
 * @private
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @param {Boolean} fromLast
 * @returns {Number}
 */
function _findIndex (arrayLike, predicate, fromLast) {
    var start;
    var increment;
    var len = arrayLike.length;
    var result = -1;

    if (fromLast) {
        start = len - 1;
        increment = -1;
    } else {
        start = 0;
        increment = 1;
    }

    for (var i = start; i < len && i >= 0; i += increment) {
        if (predicate(arrayLike[i], i, arrayLike)) {
            result = i;
            break;
        }
    }

    return result;
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
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @since 0.7.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {Number}
 */
function findIndex (arrayLike, predicate) {
    return _findIndex(arrayLike, predicate, false);
}

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
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @since 0.7.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {*}
 */
function find (arrayLike, predicate) {
    var idx = findIndex(arrayLike, predicate);

    return idx === -1 ? void 0 : arrayLike[idx];
}

/**
 * A curried version of {@link module:lamb.findIndex|findIndex} that uses the given predicate
 * to build a function expecting the array-like object to search.
 * @example
 * var isEven = function (n) { return n % 2 === 0; };
 * var findEvenIdx = _.findIndexWhere(isEven);
 *
 * findEvenIdx([1, 3, 4, 5, 6, 7]) // => 2
 * findEvenIdx([1, 3, 5, 7]) // => -1
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.findIndex|findIndex}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @since 0.41.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var findIndexWhere = _curry2(findIndex, true);

/**
 * Searches for an element satisfying the predicate in the given array-like object starting from
 * the end and returns its index if the search is successful. Returns <code>-1</code> otherwise.
 * @example
 * var persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 40}
 * ];
 *
 * _.findLastIndex(persons, _.hasKeyValue("age", 40)) // => 3
 * _.findLastIndex(persons, _.hasKeyValue("age", 41)) // => -1
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @since 0.58.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {Number}
 */
function findLastIndex (arrayLike, predicate) {
    return _findIndex(arrayLike, predicate, true);
}

/**
 * Searches for an element satisfying the predicate in the given array-like object starting from the end
 * and returns it if the search is successful. Returns <code>undefined</code> otherwise.
 * @example
 * var persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 40}
 * ];
 *
 * _.findLast(persons, _.hasKeyValue("surname", "Doe")) // => {"name": "John", "surname": "Doe", "age": 40}
 * _.findLast(persons, _.hasKeyValue("age", 41)) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.findLastWhere|findLastWhere}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @since 0.58.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {*}
 */
function findLast (arrayLike, predicate) {
    var idx = findLastIndex(arrayLike, predicate);

    return idx === -1 ? void 0 : arrayLike[idx];
}

/**
 * A curried version of {@link module:lamb.findLastIndex|findLastIndex} that uses the given predicate
 * to build a function expecting the array-like object to search.
 * @example
 * var isEven = function (n) { return n % 2 === 0; };
 * var findLastEvenIdx = _.findLastIndexWhere(isEven);
 *
 * findLastEvenIdx([1, 3, 4, 5, 6, 7]) // => 4
 * findLastEvenIdx([1, 3, 5, 7]) // => -1
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.findLastIndex|findLastIndex}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @since 0.58.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var findLastIndexWhere = _curry2(findLastIndex, true);

/**
 * A curried version of {@link module:lamb.findLast|findLast} that uses the given
 * predicate to build a function expecting the array-like object to search.
 * @example
 * var isEven = function (n) { return n % 2 === 0; };
 * var findEven = _.findLastWhere(isEven);
 *
 * findEven([1, 3, 4, 5, 6, 7]) // => 6
 * findEven([1, 3, 5, 7]) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.findLastWhere|findLastWhere}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @since 0.58.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var findLastWhere = _curry2(findLast, true);

/**
 * A curried version of {@link module:lamb.find|find} that uses the given
 * predicate to build a function expecting the array-like object to search.
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
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @since 0.41.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var findWhere = _curry2(find, true);

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
 * @since 0.1.0
 * @param {Array} array
 * @param {ListIteratorCallback} iteratee
 * @returns {Array}
 */
function flatMap (array, iteratee) {
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
 * A curried version of {@link module:lamb.flatMap|flatMap} that uses provided iteratee
 * to build a function expecting the array to act upon.
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
 * @since 0.11.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
var flatMapWith = _curry2(flatMap, true);

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
 * Helper to build the {@link module:lamb.flatten|flatten} and
 * {@link module:lamb.shallowFlatten|shallowFlatten} functions.
 * @private
 * @function
 * @param {Boolean} isDeep
 * @returns {Function}
 */
var _makeArrayFlattener = _curry2(function (isDeep, array) {
    return Array.isArray(array) ? _flatten(array, isDeep, [], 0) : slice(array, 0, array.length);
});

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
 * @function
 * @see {@link module:lamb.shallowFlatten|shallowFlatten}
 * @since 0.1.0
 * @param {Array} array
 * @returns {Array}
 */
var flatten = _makeArrayFlattener(true);

/**
 * Checks if the given number, even negative, represents an array-like index
 * within the provided length. If so returns its natural number equivalent.<br/>
 * Returns <code>NaN<code> otherwise.
 * @private
 * @param {Number} idx
 * @param {Number} len
 * @returns {Number}
 */
function _toNaturalIndex (idx, len) {
    idx = _toInteger(idx);

    return idx >= -len && idx < len ? idx < 0 ? idx + len : idx : NaN;
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
 * @since 0.23.0
 * @param {ArrayLike} arrayLike
 * @param {Number} index
 * @returns {*}
 */
function getIndex (arrayLike, index) {
    var idx = _toNaturalIndex(index, _toArrayLength(arrayLike.length));

    return idx === idx ? arrayLike[idx] : void 0; // eslint-disable-line no-self-compare
}

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
 * @function
 * @since 0.16.0
 * @see {@link module:lamb.getIndex|getIndex}
 * @see {@link module:lamb.head|head} and {@link module:lamb.last|last} for common use cases shortcuts.
 * @param {Number} index
 * @returns {Function}
 */
var getAt = _curry2(getIndex, true);

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
 * var getCityOrUnknown = _.adapter([getCity, _.always("Unknown")]);
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
 * @since 0.7.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} iteratee
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
 * A curried version of {@link module:lamb.group|group} that uses the provided iteratee
 * to build a function expecting the array-like object to act upon.
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
 * @since 0.7.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
var groupBy = _curry2(group, true);

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
 * @since 0.16.0
 * @param {ArrayLike} arrayLike
 * @returns {*}
 */
var head = getAt(0);

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
 * @since 0.21.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} iteratee
 * @returns {Object}
 */
var index = _groupWith(function (a, b) {
    return b;
});

/**
 * A curried version of {@link module:lamb.index|index} that uses the provided iteratee
 * to build a function expecting the array-like object to act upon.
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
 * @since 0.21.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
var indexBy = _curry2(index, true);

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
 * @since 0.16.0
 * @param {ArrayLike} arrayLike
 * @returns {Array}
 */
var init = partial(slice, [__, 0, -1]);

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
 * @since 0.1.0
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
 * @function
 * @see {@link module:lamb.insert|insert}
 * @see {@link module:lamb.sortedInsert|sortedInsert}
 * @see {@link module:lamb.append|append}, {@link module:lamb.appendTo|appendTo}
 * @since 0.27.0
 * @param {Number} index
 * @param {*} element
 * @returns {Function}
 */
var insertAt = _makePartial3(insert);

/**
 * Returns an array of every unique item that is included in all two given arrays
 * or array-like objects.<br/>
 * Note that this function uses the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.
 * @example
 * var a1 = [1, 2, 3, 4];
 * var a2 = [2, 5, 4, 2, 6];
 * var a3 = [5, 6, 7];
 *
 * _.intersection(a1, a2) // => [2, 4]
 * _.intersection(a2, a3) // => [5, 6]
 * _.intersection(a1, a3) // => []
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.difference|difference}
 * @see {@link module:lamb.union|union}, {@link module:lamb.unionBy|unionBy}
 * @since 0.5.0
 * @param {ArrayLike} a
 * @param {ArrayLike} b
 * @returns {Array}
 */
function intersection (a, b) {
    var result = [];
    var lenA = a.length;

    if (lenA && b.length) {
        for (var i = 0; i < lenA; i++) {
            !isIn(result, a[i]) && isIn(b, a[i]) && result.push(a[i]);
        }
    }

    return result;
}

/**
 * Transforms an array-like object into a string by joining its elements with
 * the given separator.<br/>
 * Note that unlike the native method, this function won't convert
 * <code>null</code> and <code>undefined</code> values in the array to empty
 * strings and that the <code>separator</code> parameter isn't optional.<br/>
 * See the examples about these differences.
 * @example
 * var words = ["foo", "bar", "baz"];
 *
 * _.join(words, "-") // => "foo-bar-baz"
 *
 * @example <caption>Showing the differences with the native array method:</caption>
 * var mixed = [1, null, 2, undefined, 3, NaN, 4, 5];
 * var numbers = [1, 2, 3];
 *
 * _.join(mixed, "-") // => "1-null-2-undefined-3-NaN-4-5"
 * mixed.join("-") // => "1--2--3-NaN-4-5"
 *
 * _.join(numbers) // => "1undefined2undefined3"
 * numbers.join() // => "1,2,3"
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.joinWith|joinWith}
 * @since 0.58.0
 * @param {ArrayLike} arrayLike
 * @param {String} separator
 * @returns {String}
 */
function join (arrayLike, separator) {
    return map(arrayLike, String).join(String(separator));
}

/**
 * A curried version of {@link module:lamb.join|join} that accepts an optional
 * separator and builds a function expecting the array-like object to act upon.<br/>
 * Please refer to the description and examples of {@link module:lamb.join|join}
 * to understand the differences with the native array method.
 * @example
 * var words = ["foo", "bar", "baz"];
 * var joinWithDash = _.joinWith("-");
 *
 * joinWithDash(words) // => "foo-bar-baz"
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.join|join}
 * @since 0.58.0
 * @param {String} separator
 * @returns {Function}
 */
var joinWith = _curry2(join, true);

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
 * @since 0.16.0
 * @param {ArrayLike} arrayLike
 * @returns {*}
 */
var last = getAt(-1);

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
 * Generates an array with the values passed as arguments.<br/>
 * Behaves like ES6's [Array.of]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of}.
 * @example
 * _.list(1, 2, 3) // => [1, 2, 3]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @since 0.1.0
 * @param {...*} value
 * @returns {Array}
 */
var list = _argsToArrayFrom(0);

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
 * @since 0.11.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {Array<Array, Array>}
 */
function partition (arrayLike, predicate) {
    var result = [[], []];
    var len = arrayLike.length;

    for (var i = 0, el; i < len; i++) {
        el = arrayLike[i];
        result[predicate(el, i, arrayLike) ? 0 : 1].push(el);
    }

    return result;
}

/**
 * A curried version of {@link module:lamb.partition|partition} that uses the provided
 * predicate to build a function expecting the array-like object to act upon.
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
 * @since 0.11.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var partitionWith = _curry2(partition, true);

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
 * @since 0.18.0
 * @param {Object} obj
 * @param {String} key
 * @returns {*}
 */
function getIn (obj, key) {
    return obj[key];
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
 * @function
 * @see {@link module:lamb.getIn|getIn}
 * @see {@link module:lamb.getPath|getPath}, {@link module:lamb.getPathIn|getPathIn}
 * @since 0.1.0
 * @param {String} key
 * @returns {Function}
 */
var getKey = _curry2(getIn, true);

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
 * @since 0.1.0
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
 * @since 0.12.0
 * @param {String} key
 * @returns {Function}
 */
var pluckKey = compose(mapWith, getKey);

/**
 * Creates an array copy of the given array-like object without the
 * specified values.<br/>
 * The equality test is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.
 * @example
 * var arr = [1, 2, 3, 4, 5];
 *
 * _.pullFrom(arr, [2, 5]) // => [1, 3, 4]
 *
 * @example <caption>It's not the same as {@link module:lamb.difference|difference}:</caption>
 *
 * var arr = [1,1,2,3,4,4,5];
 *
 * _.pullFrom(arr, [1, 2]) // => [3, 4, 4, 5]
 * _.difference(arr, [1, 2]) // => [3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.pull|pull}
 * @see {@link module:lamb.difference|difference}
 * @since 0.45.0
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
 * A curried version of {@link module:lamb.pullFrom|pullFrom} expecting
 * a list of values to build a function waiting for an array-like object.<br/>
 * The new function will create an array copy of the array-like without
 * the specified values.<br/>
 * The equality test is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.<br/>
 * See examples in {@link module:lamb.pullFrom|pullFrom} about the
 * relationship with {@link module:lamb.difference|difference}.
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
 * @see {@link module:lamb.difference|difference}
 * @since 0.45.0
 * @param {ArrayLike} values
 * @returns {Function}
 */
var pull = _curry2(pullFrom, true);

/**
 * Same as {@link module:lamb.reduce|reduce}, but starts the fold operation from the last
 * element instead.<br/>
 * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.reduce|reduce}
 * @see {@link module:lamb.reduceWith|reduceWith}, {@link module:lamb.reduceRightWith|reduceRightWith}
 * @since 0.1.0
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
 * _.reduceRightWith(_.sum)(arr) // => 15
 * _.reduceRightWith(_.subtract)(arr) // => -5
 * _.reduceRightWith(_.subtract, 0)(arr) // => -15
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.reduceWith|reduceWith}
 * @see {@link module:lamb.reduce|reduce}, {@link module:lamb.reduce|reduceRight}
 * @since 0.27.0
 * @param {AccumulatorCallback} accumulator
 * @param {*} [initialValue]
 * @returns {Function}
 */
var reduceRightWith = _makePartial3(reduceRight, true);

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
 * @since 0.19.0
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
 * Returns a copy of the given array-like with the element rotated by the desired amount.
 * Negative indexes are allowed.
 * @example
 * var arr = [1, 2, 3, 4, 5];
 *
 * _.rotate(arr, 3) // => [3, 4, 5, 1, 2]
 * _.rotate(arr, -3) // => [4, 5, 1, 2, 3]
 * _.rotate(arr, 11) // => [5, 1, 2, 3, 4]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.rotateBy|rotateBy}
 * @since 0.55.0
 * @param {ArrayLike} arrayLike
 * @param {Number} amount
 * @returns {Array}
 */
function rotate (arrayLike, amount) {
    var len = arrayLike.length;
    var shift = amount % len;

    return slice(arrayLike, -shift, len).concat(slice(arrayLike, 0, -shift));
}

/**
 * A curried version of {@link module:lamb.rotate|rotate}.<br/>
 * Uses the given amount to build a function expecting the array to rotate by that amount.
 * @example
 * var arr = [1, 2, 3, 4, 5];
 * var rotateByTwo = _.rotateBy(2);
 *
 * rotateByTwo(arr) // => [4, 5, 1, 2, 3]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.rotate|rotate}
 * @since 0.55.0
 * @param {Number} amount
 * @returns {Function}
 */
var rotateBy = _curry2(rotate, true);

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

    if (n === n) { // eslint-disable-line no-self-compare
        result[n] = arguments.length === 4 ? updater(arrayLike[n]) : value;
    }

    return result;
}

/**
 * A curried version of {@link module:lamb.setIndex|setIndex} that builds
 * a function that creates a copy of an array-like object with the given
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
 * @function
 * @see {@link module:lamb.setIndex|setIndex}
 * @since 0.17.0
 * @param {Number} index
 * @param {*} value
 * @returns {Function}
 */
var setAt = _makePartial3(_setIndex);

/**
 * Builds a new function that passes only the specified amount of arguments to the original one.<br/>
 * As {@link module:lamb.slice|slice} is used to extract the arguments, you can also
 * pass a negative arity.
 * @example
 * Math.max(10, 11, 45, 99) // => 99
 * _.aritize(Math.max, 2)(10, 11, 45, 99) // => 11
 *
 * @example <caption>Using a negative arity:</caption>
 * _.aritize(Math.max, -1)(10, 11, 45, 99) // => 45
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.binary|binary}, {@link module:lamb.unary|unary} for common use cases shortcuts
 * @since 0.1.0
 * @param {Function} fn
 * @param {Number} arity
 * @returns {Function}
 */
function aritize (fn, arity) {
    return function () {
        var n = _toInteger(arity);
        var args = list.apply(null, arguments).slice(0, n);

        for (var i = args.length; i < n; i++) {
            args[i] = void 0;
        }

        return fn.apply(this, args);
    };
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
 * @since 0.23.0
 * @param {ArrayLike} arrayLike
 * @param {Number} index
 * @param {*} value
 * @returns {Array}
 */
var setIndex = aritize(_setIndex, 3);

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
 * @function
 * @see {@link module:lamb.flatten|flatten}
 * @since 0.9.0
 * @param {Array} array
 * @returns {Array}
 */
var shallowFlatten = _makeArrayFlattener(false);

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
 * var isAdult = _.keySatisfies(_.isGTE(18), "age");
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
 * @since 0.39.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {Boolean}
 */
var someIn = _makeArrayChecker(false);

/**
 * A curried version of {@link module:lamb.someIn|someIn} that uses the given predicate to
 * build a function waiting for the array-like to act upon.
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
 * @since 0.39.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var some = _curry2(someIn, true);

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

    if (!areSVZ(a, b)) {
        // eslint-disable-next-line no-self-compare
        result = a > b || a !== a ? 1 : -1;
    }

    return result;
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
 * Converts a sorting function to a sorting criterion if necessary.
 * @private
 * @param {Function} criterion
 * @returns {Sorter}
 */
function _makeCriterion (criterion) {
    return criterion && typeof criterion.compare === "function" ? criterion : _sorter(criterion);
}

/**
 * Builds a list of sorting criteria from a list of sorter functions. Returns a list containing
 * a single default sorting criterion if the sorter list is empty.
 * @private
 * @param {Function[]} sorters
 * @returns {Sorter[]}
 */
function _makeCriteria (sorters) {
    return sorters && sorters.length ? map(sorters, _makeCriterion) : [_sorter()];
}

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
 * var personsByName = _.sort(persons, [_.getKey("name")]);
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
 * var personsByNameAscSurnameDesc = _.sort(persons, [
 *     _.getKey("name"),
 *     _.sorterDesc(_.getKey("surname"))
 * ]);
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
 * _.sort(chars, [localeSorter]) // => ["a", "à", "b", "c", "e", "é", "è"]
 *
 * var localeSorterDesc = _.sorterDesc(_.identity, localeSorter.compare);
 *
 * _.sort(chars, [localeSorterDesc]) // => ["è", "é", "e", "c", "b", "à", "a"]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.sortWith|sortWith}
 * @see {@link module:lamb.sorter|sorter}, {@link module:lamb.sorterDesc|sorterDesc}
 * @since 0.15.0
 * @param {ArrayLike} arrayLike
 * @param {Sorter[]|Function[]} [sorters=[{@link module:lamb.sorter|sorter()}]]
 * @returns {Array}
 */
function sort (arrayLike, sorters) {
    var criteria = _makeCriteria(sorters);
    var len = _toArrayLength(arrayLike.length);
    var result = Array(len);

    for (var i = 0; i < len; i++) {
        result[i] = { value: arrayLike[i], index: i };
    }

    result.sort(_compareWith(criteria));

    for (i = 0; i < len; i++) {
        result[i] = result[i].value;
    }

    return result;
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
        { value: element, index: pivot },
        { value: array[pivot], index: pivot }
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
 * @since 0.27.0
 * @param {ArrayLike} arrayLike
 * @param {*} element
 * @param {Sorter[]|Function[]} [sorters=[{@link module:lamb.sorter|sorter()}]] - The sorting criteria
 * used to sort the array.
 * @returns {Array}
 */
function sortedInsert (arrayLike, element, sorters) {
    var result = slice(arrayLike, 0, arrayLike.length);

    if (arguments.length === 1) {
        return result;
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
 * @since 0.1.0
 * @param {Function} [reader={@link module:lamb.identity|identity}] A function meant to generate a
 * simple value from a complex one. The function should evaluate the array element and supply the
 * value to be passed to the comparer.
 * @param {Function} [comparer] An optional custom comparer function.
 * @returns {Sorter}
 */
var sorter = partial(_sorter, [__, false, __]);

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
 * @since 0.15.0
 * @param {Function} [reader={@link module:lamb.identity|identity}] A function meant to generate a
 * simple value from a complex one. The function should evaluate the array element and supply the
 * value to be passed to the comparer.
 * @param {Function} [comparer] An optional custom comparer function.
 * @returns {Sorter}
 */
var sorterDesc = partial(_sorter, [__, true, __]);

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
 * var sortAsNumbers = _.sortWith([parseFloat]);
 * var weights = ["2 Kg", "10 Kg", "1 Kg", "7 Kg"];
 *
 * sortAsNumbers(weights) // => ["1 Kg", "2 Kg", "7 Kg", "10 Kg"]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.sort|sort}
 * @see {@link module:lamb.sorter|sorter}, {@link module:lamb.sorterDesc|sorterDesc}
 * @since 0.15.0
 * @param {Sorter[]|Function[]} [sorters=[{@link module:lamb.sorter|sorter()}]]
 * @returns {Function}
 */
var sortWith = _curry2(sort, true);

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
 * @since 0.16.0
 * @param {ArrayLike} arrayLike
 * @returns {Array}
 */
var tail = drop(1);

/**
 * Retrieves the first <code>n</code> elements from an array or array-like object.<br/>
 * Note that, being this a shortcut for a common use case of {@link module:lamb.slice|slice},
 * <code>n</code> can be a negative number.
 * @example
 * var arr = [1, 2, 3, 4, 5];
 *
 * _.takeFrom(arr, 3) // => [1, 2, 3]
 * _.takeFrom(arr, -1) // => [1, 2, 3, 4]
 * _.takeFrom(arr, -10) // => []
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.take|take}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @since 0.51.0
 * @param {ArrayLike} arrayLike
 * @param {Number} n
 * @returns {Array}
 */
function takeFrom (arrayLike, n) {
    return slice(arrayLike, 0, n);
}

/**
 * A curried version of {@link module:lamb.takeFrom|takeFrom} that expects the number of elements
 * to retrieve to build a function waiting for the list to take the elements from.<br/>
 * See the note and examples for {@link module:lamb.takeFrom|takeFrom} about passing a
 * negative <code>n</code>.
 * @example
 * var take2 = _.take(2);
 *
 * take2([1, 2, 3, 4, 5]) // => [1, 2]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.takeFrom|takeFrom}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @since 0.5.0
 * @param {Number} n
 * @returns {Function}
 */
var take = _curry2(takeFrom, true);

/**
 * Builds a function that takes the last elements satisfying a predicate
 * from an array or array-like object.
 * @example
 * var isEven = function (n) { return n % 2 === 0; };
 * var takeLastWhileIsEven = _.takeLastWhile(isEven);
 *
 * takeLastWhileIsEven([1, 3, 5, 7]) // => []
 * takeLastWhileIsEven([2, 3, 6, 8]) // => [6, 8]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.dropLastWhile|dropLastWhile}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @since 0.58.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var takeLastWhile = _takeOrDropWhile(true, true);

/**
 * Builds a function that takes the first elements satisfying a predicate from
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
 * @function
 * @see {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @since 0.5.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var takeWhile = _takeOrDropWhile(true, false);

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
 * @since 0.14.0
 * @param {ArrayLike<ArrayLike>} arrayLike
 * @returns {Array<Array>}
 */
function transpose (arrayLike) {
    var minLen = MAX_ARRAY_LENGTH;
    var len = _toArrayLength(arrayLike.length);

    if (len === 0) {
        return [];
    }

    for (var j = 0, elementLen; j < len; j++) {
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
 * Creates a pipeline of functions, where each function consumes the result of the previous one.
 * @example
 * var __ = _.__;
 * var square = _.partial(Math.pow, [__, 2]);
 * var getMaxAndSquare = _.pipe([Math.max, square]);
 *
 * getMaxAndSquare(3, 5) // => 25
 *
 * @memberof module:lamb
 * @category Function
 * @function
 * @see {@link module:lamb.compose|compose}
 * @since 0.1.0
 * @param {Function[]} functions
 * @returns {Function}
 */
function pipe (functions) {
    if (!Array.isArray(functions)) {
        throw _makeTypeErrorFor(functions, "array");
    }

    var len = functions.length;

    return len ? function () {
        var result = functions[0].apply(this, arguments);

        for (var i = 1; i < len; i++) {
            result = functions[i].call(this, result);
        }

        return result;
    } : identity;
}

/**
 * Using the provided iteratee to transform values, builds a function that will
 * return an array of the unique elements  in the two provided array-like objects.<br/>
 * Uses the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}
 * to test the equality of values.<br/>
 * When two values are considered equal, the first occurence will be the one included
 * in the result array.<br/>
 * See also {@link module:lamb.union|union} if you don't need to compare transformed values.
 * @example
 * var unionByFloor = _.unionBy(Math.floor);
 *
 * unionByFloor([2.8, 3.2, 1.5], [3.5, 1.2, 4]) // => [2.8, 3.2, 1.5, 4]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.union|union}
 * @see {@link module:lamb.difference|difference}
 * @see {@link module:lamb.intersection|intersection}
 * @since 0.51.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
function unionBy (iteratee) {
    return pipe([binary(list), flatMapWith(drop(0)), uniquesBy(iteratee)]);
}

/**
 * Returns a list of every unique element present in the two given array-like objects.<br/>
 * Uses the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}
 * to test the equality of values.<br/>
 * When two values are considered equal, the first occurence will be the one included
 * in the result array.<br/>
 * See also {@link module:lamb.unionBy|unionBy} if you need to transform the values before
 * the comparison or if you have to extract them from complex ones.
 * @example
 * _.union([1, 2, 3, 2], [2, 3, 4]) // => [1, 2, 3, 4]
 * _.union("abc", "bcd") // => ["a", "b", "c", "d"]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.unionBy|unionBy}
 * @see {@link module:lamb.difference|difference}
 * @see {@link module:lamb.intersection|intersection}
 * @since 0.5.0
 * @param {ArrayLike} a
 * @param {ArrayLike} b
 * @returns {Array}
 */
var union = unionBy(identity);

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
 * @since 0.22.0
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
 * @since 0.23.0
 * @param {ArrayLike} arrayLike
 * @param {Number} index
 * @param {Function} updater
 * @returns {Array}
 */
var updateIndex = partial(_setIndex, [__, __, null, __]);

/**
 * Builds a list of arrays out of the two given array-like objects by pairing items with
 * the same index.<br/>
 * The received array-like objects will be truncated to the shortest length.
 * @example
 * _.zip(
 *     ["a", "b", "c"],
 *     [1, 2, 3]
 * ) // => [["a", 1], ["b", 2], ["c", 3]]
 *
 * _.zip([1, 2, 3, 4], [5, 6, 7]) // => [[1, 5], [2, 6], [3, 7]]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.transpose|transpose} for the reverse operation
 * @see {@link module:lamb.zipWithIndex|zipWithIndex}
 * @since 0.14.0
 * @param {ArrayLike} a
 * @param {ArrayLike} b
 * @returns {Array<Array>}
 */
function zip (a, b) {
    return transpose([a, b]);
}

/**
 * "{@link module:lamb.zip|Zips}" an array-like object by pairing its values with their index.
 * @example
 * _.zipWithIndex(["a", "b", "c"]) // => [["a", 0], ["b", 1], ["c", 2]]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.zip|zip}
 * @since 0.14.0
 * @param {ArrayLike} arrayLike
 * @returns {Array<Array<*, Number>>}
 */
var zipWithIndex = mapWith(binary(list));

/**
 * Applies the given function to a list of arguments.
 * @example
 * _.application(_.sum, [3, 4]) // => 7
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.apply|apply}, {@link module:lamb.applyTo|applyTo}
 * @since 0.47.0
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
 * @function
 * @see {@link module:lamb.application|application}, {@link module:lamb.applyTo|applyTo}
 * @since 0.1.0
 * @param {Function} fn
 * @returns {Function}
 */
var apply = _curry2(application);

/**
 * A right-curried version of {@link module:lamb.application|application}. Expects an array-like
 * object to use as arguments and builds a function waiting for the target of the application.
 * @example
 * var data = [3, 4];
 * var applyToData = _.applyTo(data);
 *
 * applyToData(_.sum) // => 7
 * applyToData(_.multiply) // => 12
 *
 * @memberof module:lamb
 * @category Function
 * @function
 * @see {@link module:lamb.application|application}, {@link module:lamb.apply|apply}
 * @since 0.47.0
 * @param {ArrayLike} args
 * @returns {Function}
 */
var applyTo = _curry2(application, true);

/**
 * Keeps building a partial application of the received function as long
 * as it's called with placeholders; applies the original function to
 * the collected parameters otherwise.<br/>
 * The function checks only the public placeholder to gain a little performance
 * as no function in Lamb is built with {@link module:lamb.asPartial|asPartial}.
 * @private
 * @param {Function} fn
 * @param {Array} argsHolder
 * @returns {Function|*}
 */
function _asPartial (fn, argsHolder) {
    return function () {
        var argsLen = arguments.length;
        var lastIdx = 0;
        var newArgs = [];

        for (var i = 0, len = argsHolder.length, boundArg; i < len; i++) {
            boundArg = argsHolder[i];
            newArgs[i] = boundArg === __ && lastIdx < argsLen ? arguments[lastIdx++] : boundArg;
        }

        while (lastIdx < argsLen) {
            newArgs[i++] = arguments[lastIdx++];
        }

        for (i = 0; i < argsLen; i++) {
            if (arguments[i] === __) {
                return _asPartial(fn, newArgs);
            }
        }

        for (i = 0, len = newArgs.length; i < len; i++) {
            if (newArgs[i] === __) {
                newArgs[i] = void 0;
            }
        }

        return fn.apply(this, newArgs);
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
 * var __ = _.__;
 * var f = _.asPartial(function (a, b, c) {
 *     return a + b + c;
 * });
 *
 * f(4, 3, 2) // => 9
 * f(4, __, 2)(3) // => 9
 * f(__, 3, __)(4, __)(2) // => 9
 *
 * @example <caption>Exploiting optional parameters:</caption>
 * var __ = _.__;
 * var f = _.asPartial(function (a, b, c) {
 *     return a + b + (c || 0);
 * });
 *
 * var addFive = f(5, __);
 * addFive(2) // => 7
 *
 * var addNine = addFive(4, __);
 * addNine(11) // => 20
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.__|__} The placeholder object.
 * @since 0.36.0
 * @param {Function} fn
 * @returns {Function}
 */
function asPartial (fn) {
    return _asPartial(fn, []);
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
 * var getIDAndLastScore = _.collect([_.getKey("id"), _.getPath("scores.-1")]);
 *
 * getIDAndLastScore(user) // => ["jdoe", 7]
 *
 * @example
 * var minAndMax = _.collect([Math.min, Math.max]);
 *
 * minAndMax(3, 1, -2, 5, 4, -1) // => [-2, 5]
 *
 * @memberof module:lamb
 * @category Function
 * @since 0.35.0
 * @param {Function[]} functions
 * @returns {Function}
 */
function collect (functions) {
    if (!Array.isArray(functions)) {
        throw _makeTypeErrorFor(functions, "array");
    }

    return function () {
        return map(functions, applyTo(arguments));
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
 * Curries a function of arity 3.
 * @private
 * @param {Function} fn
 * @param {Boolean} [isRightCurry=false]
 * @returns {Function}
 */
function _curry3 (fn, isRightCurry) {
    return function (a) {
        return function (b) {
            return function (c) {
                return isRightCurry ? fn.call(this, c, b, a) : fn.call(this, a, b, c);
            };
        };
    };
}

/**
 * Prepares a function for currying. If it's not auto-currying and the arity
 * is 2 or 3 returns optimized functions, otherwise delegates the currying
 * to the <code>_currier</code> function.<br/>
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

    if (isAutoCurry && arity > 1 || arity > 3) {
        return _currier(fn, arity, isRightCurry, isAutoCurry, []);
    } else if (arity === 2) {
        return _curry2(fn, isRightCurry);
    } else if (arity === 3) {
        return _curry3(fn, isRightCurry);
    } else {
        return fn;
    }
}

/**
 * Transforms the evaluation of the given function in the evaluation of a sequence of functions
 * expecting only one argument. Each function of the sequence is a partial application of the
 * original one, which will be applied when the specified (or derived) arity is consumed.<br/>
 * Currying will start from the leftmost argument: use {@link module:lamb.curryRight|curryRight}
 * for right currying.
 * @example
 * var makeWithKeys = _.curry(_.make);
 * var makePerson = makeWithKeys(["name", "surname"]);
 *
 * makePerson(["John", "Doe"]) // => {name: "John", surname: "Doe"};
 * makePerson(["Mario", "Rossi"]) // => {name: "Mario", surname: "Rossi"};
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @since 0.1.0
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
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @since 0.6.0
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
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @since 0.9.0
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
 * var makeWithValues = _.curryRight(_.make);
 * var makeJohnDoe = makeWithValues(["John", "Doe"]);
 *
 * makeJohnDoe(["name", "surname"]) // => {name: "John", surname: "Doe"};
 * makeJohnDoe(["firstName", "lastName"]) // => {firstName: "John", lastName: "Doe"};
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.curry|curry}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @since 0.9.0
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
 * @since 0.1.0
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
 * @since 0.1.0
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
 * var getFirstArg = _.getArgAt(0);
 * var getLastArg = _.getArgAt(-1);
 *
 * getFirstArg(1, 2, 3) // => 1
 * getLastArg(1, 2, 3) // => 3
 *
 * _.getArgAt()(1, 2, 3) // => undefined
 * _.getArgAt(6)(1, 2, 3) // => undefined
 * _.getArgAt(1)() // => undefined
 *
 * @memberof module:lamb
 * @category Function
 * @since 0.17.0
 * @param {Number} idx
 * @returns {Function}
 */
function getArgAt (idx) {
    return function () {
        return arguments[_toNaturalIndex(idx, arguments.length)];
    };
}

/* eslint-disable jsdoc/check-param-names */

/**
 * If a method with the given name exists on the target, applies it to the provided
 * arguments and returns the result. Returns <code>undefined</code> otherwise.<br/>
 * The arguments for the method are built by concatenating the array of bound arguments,
 * received by {@link module:lamb.invoker|invoker}, with the final set of <code>args</code>,
 * if present.
 * @private
 * @param {String} methodName
 * @param {Array} boundArgs
 * @param {Object} target
 * @param {...*} [args]
 * @returns {*}
 */
function _invoker (methodName, boundArgs, target) {
    var method = target[methodName];

    if (typeof method !== "function") {
        return void 0;
    }

    var boundArgsLen = boundArgs ? _toArrayLength(boundArgs.length) : 0;
    var finalArgsLen = boundArgsLen + arguments.length - 3;
    var finalArgs = Array(finalArgsLen);

    for (var i = 0; i < boundArgsLen; i++) {
        finalArgs[i] = boundArgs[i];
    }

    for (var ofs = 3 - i; i < finalArgsLen; i++) {
        finalArgs[i] = arguments[i + ofs];
    }

    return method.apply(target, finalArgs);
}

/**
 * Builds a function that will invoke the given method name on any received object and
 * return the result. If no method with such name is found the function will return
 * <code>undefined</code>.<br/>
 * Along with the method name it's possible to supply some arguments that will be bound to the
 * method call. Further arguments can also be passed when the function is actually called, and
 * they will be concatenated to the bound ones.<br/>
 * Returning <code>undefined</code> is a behaviour meant to quickly create a case for
 * {@link module:lamb.adapter|adapter} without the need to check for the existence of the
 * desired method.<br/>
 * See also {@link module:lamb.generic|generic} to create functions out of object methods.
 * @example <caption>Basic polymorphism with <code>invoker</code>:</caption>
 * var polySlice = _.invoker("slice");
 *
 * polySlice([1, 2, 3, 4, 5], 1, 3) // => [2, 3]
 * polySlice("Hello world", 1, 3) // => "el"
 *
 * @example <caption>With bound arguments:</caption>
 * var substrFrom2 = _.invoker("substr", [2]);
 * substrFrom2("Hello world") // => "llo world"
 * substrFrom2("Hello world", 5) // => "llo w"
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.invokerOn|invokerOn}
 * @since 0.1.0
 * @param {String} methodName
 * @param {ArrayLike} [boundArgs=[]]
 * @returns {Function}
 */
function invoker (methodName, boundArgs) {
    return partial(_invoker, [methodName, boundArgs]);
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
 * @since 0.15.0
 * @param {Object} target
 * @returns {Function}
 */
function invokerOn (target) {
    return partial(_invoker, [__, [], target]);
}

/**
 * Builds a function that allows to map over the received arguments before applying them
 * to the original one.
 * @example
 * var __ = _.__;
 * var sumArray = _.reduceWith(_.sum);
 * var sumArgs = _.compose(sumArray, _.list);
 *
 * sumArgs(1, 2, 3, 4, 5) // => 15
 *
 * var square = _.partial(Math.pow, [__, 2]);
 * var sumSquares = _.mapArgs(sumArgs, square);
 *
 * sumSquares(1, 2, 3, 4, 5) // => 55
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.tapArgs|tapArgs}
 * @since 0.3.0
 * @param {Function} fn
 * @param {ListIteratorCallback} mapper
 * @returns {Function}
 */
function mapArgs (fn, mapper) {
    return pipe([list, mapWith(mapper), apply(fn)]);
}

/**
 * Builds a function that allows to "tap" into the arguments of the original one.
 * This allows to extract simple values from complex ones, transform arguments or simply intercept them.
 * If a "tapper" isn't found the argument is passed as it is.
 * @example
 * var someObject = {count: 5};
 * var someArrayData = [2, 3, 123, 5, 6, 7, 54, 65, 76, 0];
 * var getDataAmount = _.tapArgs(_.sum, [_.getKey("count"), _.getKey("length")]);
 *
 * getDataAmount(someObject, someArrayData); // => 15
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.mapArgs|mapArgs}
 * @since 0.3.0
 * @param {Function} fn
 * @param {Function[]} tappers
 * @returns {Function}
 */
function tapArgs (fn, tappers) {
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
 * @since 0.1.0
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
 * @since 0.10.0
 * @param {Function} fn
 * @returns {Function}
 */
function unary (fn) {
    return function (a) {
        return fn.call(this, a);
    };
}

/**
 * Accepts a series of functions and builds a function that applies the received
 * arguments to each one and returns the first non-<code>undefined</code> value.<br/>
 * Meant to work in synergy with {@link module:lamb.case|case} and
 * {@link module:lamb.invoker|invoker}, can be useful as a strategy pattern for functions,
 * to mimic conditional logic or pattern matching, and also to build polymorphic functions.
 * @example
 * var isEven = function (n) { return n % 2 === 0; };
 * var filterString = _.compose(_.joinWith(""), _.filter);
 * var filterAdapter = _.adapter([
 *     _.invoker("filter"),
 *     _.case(_.isType("String"), filterString)
 * ]);
 *
 * filterAdapter([1, 2, 3, 4, 5, 6], isEven) // => [2, 4, 6]
 * filterAdapter("123456", isEven) // => "246"
 * filterAdapter({}, isEven) // => undefined
 *
 * // by its nature is composable
 * var filterWithDefault = _.adapter([filterAdapter, _.always("Not implemented")]);
 *
 * filterWithDefault([1, 2, 3, 4, 5, 6], isEven) // => [2, 4, 6]
 * filterWithDefault("123456", isEven) // => "246"
 * filterWithDefault({}, isEven) // => "Not implemented"
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.case|case}
 * @see {@link module:lamb.invoker|invoker}
 * @since 0.6.0
 * @param {Function[]} functions
 * @returns {Function}
 */
function adapter (functions) {
    if (!Array.isArray(functions)) {
        throw _makeTypeErrorFor(functions, "array");
    }

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
 * Creates a function to check the given predicates.<br/>
 * Used to build the {@link module:lamb.allOf|allOf} and the
 * {@link module:lamb.anyOf|anyOf} functions.
 * @private
 * @param {Boolean} checkAll
 * @returns {Function}
 */
function _checkPredicates (checkAll) {
    return function (predicates) {
        if (!Array.isArray(predicates)) {
            throw _makeTypeErrorFor(predicates, "array");
        }

        return function () {
            for (var i = 0, len = predicates.length, result; i < len; i++) {
                result = predicates[i].apply(this, arguments);

                if (checkAll && !result) {
                    return false;
                } else if (!checkAll && result) {
                    return true;
                }
            }

            return checkAll;
        };
    };
}

/**
 * Accepts an array of predicates and builds a new one that returns true if they are all satisfied
 * by the same arguments. The functions in the array will be applied one at a time until a
 * <code>false</code> value is produced, which is returned immediately.
 * @example
 * var isEven = function (n) { return n % 2 === 0; };
 * var isPositiveEven = _.allOf([isEven, _.isGT(0)]);
 *
 * isPositiveEven(-2) // => false
 * isPositiveEven(11) // => false
 * isPositiveEven(6) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.anyOf|anyOf}
 * @since 0.1.0
 * @param {Function[]} predicates
 * @returns {Function}
 */
var allOf = _checkPredicates(true);

/**
 * Accepts an array of predicates and builds a new one that returns true if at least one of them is
 * satisfied by the received arguments. The functions in the array will be applied one at a time
 * until a <code>true</code> value is produced, which is returned immediately.
 * @example
 * var users = [
 *     {id: 1, name: "John", group: "guest"},
 *     {id: 2, name: "Jane", group: "root"},
 *     {id: 3, name: "Mario", group: "admin"}
 * ];
 * var isInGroup = _.partial(_.hasKeyValue, ["group"]);
 * var isSuperUser = _.anyOf([isInGroup("admin"), isInGroup("root")]);
 *
 * isSuperUser(users[0]) // => false
 * isSuperUser(users[1]) // => true
 * isSuperUser(users[2]) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.allOf|allOf}
 * @since 0.1.0
 * @param {Function[]} predicates
 * @returns {Function}
 */
var anyOf = _checkPredicates(false);

/**
 * Verifies that the two supplied values are the same value using the "SameValue" comparison.<br/>
 * Note that this doesn't behave as the strict equality operator, but rather as a shim of ES6's
 * [Object.is]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is}.
 * Differences are that <code>0</code> and <code>-0</code> aren't the same value and, finally,
 * <code>NaN</code> is equal to itself.<br/>
 * See also {@link module:lamb.is|is} for a curried version building a predicate and
 * {@link module:lamb.areSVZ|areSVZ} and {@link module:lamb.isSVZ|isSVZ} to perform a "SameValueZero"
 * comparison.
 * @example
 * var testObject = {};
 *
 * _.areSame({}, testObject) // => false
 * _.areSame(testObject, testObject) // => true
 * _.areSame("foo", "foo") // => true
 * _.areSame(0, -0) // => false
 * _.areSame(0 / 0, NaN) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.is|is}
 * @see {@link module:lamb.areSVZ|areSVZ}, {@link module:lamb.isSVZ|isSVZ}
 * @see [SameValue comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevalue}
 * @see [SameValueZero comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevaluezero}
 * @since 0.50.0
 * @param {*} a
 * @param {*} b
 * @returns {Boolean}
 */
function areSame (a, b) {
    return a === 0 && b === 0 ? 1 / a === 1 / b : areSVZ(a, b);
}

/**
 * Builds a case for {@link module:lamb.adapter|adapter}.<br/>
 * The function will apply the received arguments to <code>fn</code> if the predicate is satisfied
 * with the same arguments, otherwise will return <code>undefined</code>.<br/>
 * See also {@link module:lamb.condition|condition} to build a condition with two branching functions
 * and {@link module:lamb.unless|unless} and {@link module:lamb.when|when} where one of the branches
 * is the identity function.
 * @example
 * var halveIfNumber = _.case(_.isType("Number"), _.divideBy(2));
 *
 * halveIfNumber(2) // => 1
 * halveIfNumber("2") // => undefined
 *
 * @alias module:lamb.case
 * @category Logic
 * @see {@link module:lamb.adapter|adapter}
 * @see {@link module:lamb.condition|condition}
 * @see {@link module:lamb.unless|unless}
 * @see {@link module:lamb.when|when}
 * @since 0.51.0
 * @param {Function} predicate
 * @param {Function} fn
 * @returns {Function}
 */
function case_ (predicate, fn) {
    return function () {
        return predicate.apply(this, arguments) ? fn.apply(this, arguments) : void 0;
    };
}

/**
 * Builds a function that will apply the received arguments to <code>trueFn</code>,
 * if the predicate is satisfied with the same arguments, or to <code>falseFn</code> otherwise.<br/>
 * Although you can use other <code>condition</code>s as <code>trueFn</code> or <code>falseFn</code>,
 * it's probably better to use {@link module:lamb.adapter|adapter} to build more complex behaviours.<br/>
 * See also {@link module:lamb.unless|unless} and {@link module:lamb.when|when} as they are
 * shortcuts to common use cases.
 * @example
 * var isEven = function (n) { return n % 2 === 0};
 * var halveEvenAndDoubleOdd = _.condition(isEven, _.divideBy(2), _.multiplyBy(2));
 *
 * halveEvenAndDoubleOdd(5) // => 10
 * halveEvenAndDoubleOdd(6) // => 3
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.unless|unless}
 * @see {@link module:lamb.when|when}
 * @see {@link module:lamb.adapter|adapter}
 * @see {@link module:lamb.case|case}
 * @since 0.2.0
 * @param {Function} predicate
 * @param {Function} trueFn
 * @param {Function} falseFn
 * @returns {Function}
 */
function condition (predicate, trueFn, falseFn) {
    return function () {
        return (predicate.apply(this, arguments) ? trueFn : falseFn).apply(this, arguments);
    };
}

/**
 * Verifies that the first given value is greater than the second.<br/>
 * Wraps the native <code>&gt;</code> operator within a function.
 * @example
 * var pastDate = new Date(2010, 2, 12);
 * var today = new Date();
 *
 * _.gt(today, pastDate) // => true
 * _.gt(pastDate, today) // => false
 * _.gt(3, 4) // => false
 * _.gt(3, 3) // => false
 * _.gt(3, 2) // => true
 * _.gt(0, -0) // => false
 * _.gt(-0, 0) // => false
 * _.gt("a", "A") // => true
 * _.gt("b", "a") // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.gte|gte}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @since 0.50.0
 * @param {Number|String|Date|Boolean} a
 * @param {Number|String|Date|Boolean} b
 * @returns {Boolean}
 */
function gt (a, b) {
    return a > b;
}

/**
 * Verifies that the first given value is greater than or equal to the second.
 * Regarding equality, beware that this is simply a wrapper for the native
 * <code>&gt;=</code> operator, so <code>-0 === 0</code>.
 * @example
 * _.gte(3, 4) // => false
 * _.gte(3, 3) // => true
 * _.gte(3, 2) // => true
 * _.gte(0, -0) // => true
 * _.gte(-0, 0) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.gt|gt}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @since 0.50.0
 * @param {Number|String|Date|Boolean} a
 * @param {Number|String|Date|Boolean} b
 * @returns {Boolean}
 */
function gte (a, b) {
    return a >= b;
}

/**
 * A curried version of {@link module:lamb.areSame|areSame}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * and the one received by the predicate are the same using the "SameValue"
 * comparison.<br/>
 * See also {@link module:lamb.areSVZ|areSVZ} and {@link module:lamb.isSVZ|isSVZ}
 * to perform a "SameValueZero" comparison.
 * @example
 * var john = {name: "John", surname: "Doe"};
 * var isJohn = _.is(john);
 * var isNegativeZero = _.is(-0);
 * var isReallyNaN = _.is(NaN);
 *
 * isJohn(john) // => true
 * isJohn({name: "John", surname: "Doe"}) // => false
 *
 * isNegativeZero(0) // => false
 * isNegativeZero(-0) // => true
 *
 * isNaN(NaN) // => true
 * isNaN("foo") // => true
 *
 * isReallyNaN(NaN) // => true
 * isReallyNaN("foo") // => false
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.areSame|areSame}
 * @see {@link module:lamb.areSVZ|areSVZ}, {@link module:lamb.isSVZ|isSVZ}
 * @see [SameValue comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevalue}
 * @see [SameValueZero comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevaluezero}
 * @since 0.1.0
 * @param {*} value
 * @returns {Function}
 */
var is = _curry2(areSame);

/**
 * A right curried version of {@link module:lamb.gt|gt}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * is greater than the one received by the predicate.
 * @example
 * var isGreaterThan5 = _.isGT(5);
 *
 * isGreaterThan5(3) // => false
 * isGreaterThan5(5) // => false
 * isGreaterThan5(7) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.isGTE|isGTE}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @since 0.1.0
 * @param {Number|String|Date|Boolean} value
 * @returns {Function}
 */
var isGT = _curry2(gt, true);

/**
 * A right curried version of {@link module:lamb.gte|gte}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * is greater than or equal to the one received by the predicate.
 * @example
 * var isPositiveOrZero = _.isGTE(0);
 *
 * isPositiveOrZero(-3) // => false
 * isPositiveOrZero(-0) // => true
 * isPositiveOrZero(0) // => true
 * isPositiveOrZero(5) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.isGT|isGT}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @since 0.1.0
 * @param {Number|String|Date|Boolean} value
 * @returns {Function}
 */
var isGTE = _curry2(gte, true);

/**
 * Verifies that the first given value is less than the second.<br/>
 * Wraps the native <code>&lt;</code> operator within a function.
 * @example
 * var pastDate = new Date(2010, 2, 12);
 * var today = new Date();
 *
 * _.lt(today, pastDate) // => false
 * _.lt(pastDate, today) // => true
 * _.lt(3, 4) // => true
 * _.lt(3, 3) // => false
 * _.lt(3, 2) // => false
 * _.lt(0, -0) // => false
 * _.lt(-0, 0) // => false
 * _.lt("a", "A") // => false
 * _.lt("a", "b") // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.lte|lte}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @since 0.50.0
 * @param {Number|String|Date|Boolean} a
 * @param {Number|String|Date|Boolean} b
 * @returns {Boolean}
 */
function lt (a, b) {
    return a < b;
}

/**
 * A right curried version of {@link module:lamb.lt|lt}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * is less than the one received by the predicate.
 * @example
 * var isLessThan5 = _.isLT(5);
 *
 * isLessThan5(7) // => false
 * isLessThan5(5) // => false
 * isLessThan5(3) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.isLTE|isLTE}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @since 0.1.0
 * @param {Number|String|Date|Boolean} value
 * @returns {Function}
 */
var isLT = _curry2(lt, true);

/**
 * Verifies that the first given value is less than or equal to the second.
 * Regarding equality, beware that this is simply a wrapper for the native
 * <code>&lt;=</code> operator, so <code>-0 === 0</code>.
 * @example
 * _.lte(3, 4) // => true
 * _.lte(3, 3) // => true
 * _.lte(3, 2) // => false
 * _.lte(0, -0) // => true
 * _.lte(-0, 0) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.lt|lt}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @since 0.50.0
 * @param {Number|String|Date|Boolean} a
 * @param {Number|String|Date|Boolean} b
 * @returns {Boolean}
 */
function lte (a, b) {
    return a <= b;
}

/**
 * A right curried version of {@link module:lamb.lte|lte}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * is less than or equal to the one received by the predicate.
 * @example
 * var isNegativeOrZero = _.isLTE(0);
 *
 * isNegativeOrZero(5) // => false
 * isNegativeOrZero(-0) // => true
 * isNegativeOrZero(0) // => true
 * isNegativeOrZero(-3) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.isLT|isLT}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @since 0.1.0
 * @param {Number|String|Date|Boolean} value
 * @returns {Function}
 */
var isLTE = _curry2(lte, true);

/**
 * Builds a unary function that will check its argument against the given predicate.
 * If the predicate isn't satisfied, the provided <code>fn</code> function will be
 * applied to the same value. The received argument is returned as it is otherwise.<br/>
 * See {@link module:lamb.when|when} for the opposite behaviour.<br/>
 * It's a shortcut for a common use case of {@link module:lamb.condition|condition},
 * where its <code>trueFn</code> parameter is the [identity function]{@link module:lamb.identity}.
 * @example
 * var isEven = function (n) { return n % 2 === 0};
 * var halveUnlessIsEven = _.unless(isEven, _.divideBy(2));
 *
 * halveUnlessIsEven(5) // => 2.5
 * halveUnlessIsEven(6) // => 6
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.condition|condition}
 * @see {@link module:lamb.when|when}
 * @see {@link module:lamb.adapter|adapter}
 * @see {@link module:lamb.case|case}
 * @since 0.42.0
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
 * var isEven = function (n) { return n % 2 === 0; };
 * var halveIfEven = _.when(isEven, _.divideBy(2));
 *
 * halveIfEven(5) // => 5
 * halveIfEven(6) // => 3
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.condition|condition}
 * @see {@link module:lamb.unless|unless}
 * @see {@link module:lamb.adapter|adapter}
 * @see {@link module:lamb.case|case}
 * @since 0.42.0
 * @param {Function} predicate
 * @param {Function} fn
 * @returns {Function}
 */
function when (predicate, fn) {
    return function (value) {
        return predicate.call(this, value) ? fn.call(this, value) : value;
    };
}

/**
 * Sums two numbers.
 * @example
 * _.sum(4, 5) // => 9
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.add|add}
 * @since 0.50.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function sum (a, b) {
    return a + b;
}

/**
 * A curried version of {@link module:lamb.sum|sum}.
 * @example
 * var add5 = _.add(5);
 *
 * _.add5(4) // => 9
 * _.add5(-2) // => 3
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.sum|sum}
 * @since 0.1.0
 * @param {Number} a
 * @returns {Function}
 */
var add = _curry2(sum, true);

/**
 * Subtracts two numbers.
 * @example
 * _.subtract(5, 3) // => 2
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.deduct|deduct}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function subtract (a, b) {
    return a - b;
}

/**
 * A curried version of {@link module:lamb.subtract|subtract} that expects the
 * subtrahend to build a function waiting for the minuend.
 * @example
 * var deduct5 = _.deduct(5);
 *
 * deduct5(12) // => 7
 * deduct5(3) // => -2
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.subtract|subtract}
 * @since 0.50.0
 * @param {Number} a
 * @returns {Function}
 */
var deduct = _curry2(subtract, true);

/**
 * Divides two numbers.
 * @example
 * _.divide(5, 2) // => 2.5
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.divideBy|divideBy}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function divide (a, b) {
    return a / b;
}

/**
 * A curried version of {@link module:lamb.divide|divide} that expects a divisor to
 * build a function waiting for the dividend.
 * @example
 * var halve = divideBy(2);
 *
 * halve(10) // => 5
 * halve(5) // => 2.5
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.divide|divide}
 * @since 0.50.0
 * @param {Number} a
 * @returns {Function}
 */
var divideBy = _curry2(divide, true);

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
 * @since 0.21.0
 * @param {*} start - The starting value
 * @param {Number} len - The desired length for the sequence
 * @param {ListIteratorCallback} iteratee
 * @returns {Array}
 */
function generate (start, len, iteratee) {
    var result = [start];

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
 * @alias module:lamb.isFinite
 * @category Math
 * @since 0.46.0
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
 * @since 0.46.0
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
 * @since 0.46.0
 * @param {*} value
 * @returns {Boolean}
 */
function isSafeInteger (value) {
    return isInteger(value) && Math.abs(value) <= MAX_SAFE_INTEGER;
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
 * @since 0.1.0
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
 * @see {@link module:lamb.multiplyBy|multiplyBy}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function multiply (a, b) {
    return a * b;
}

/**
 * A curried version of {@link module:lamb.multiply|multiply}.
 * @example
 * var double = _.multiplyBy(2);
 *
 * double(5) // => 10
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.multiply|multiply}
 * @since 0.50.0
 * @param {Number} a
 * @returns {Function}
 */
var multiplyBy = _curry2(multiply, true);

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
 * @since 0.1.0
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
function randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Converts a value to a number and returns it if it's not NaN, otherwise
 * returns zero.
 * @private
 * @param {*} value
 * @returns {Number}
 */
function _forceToNumber (value) {
    var n = +value;

    return n === n ? n : 0; // eslint-disable-line no-self-compare
}

/**
 * Generates an arithmetic progression of numbers starting from <code>start</code> up to,
 * but not including, <code>limit</code>, using the given <code>step</code>.
 * @example
 * _.range(2, 10) // => [2, 3, 4, 5, 6, 7, 8, 9]
 * _.range(1, -10, -2) // => [1, -1, -3, -5, -7, -9]
 * _.range(0, 3, 1) // => [0, 1, 2]
 * _.range(-0, 3, 1) // => [-0, 1, 2]
 * _.range(1, -10, 2) // => []
 * _.range(3, 5, -1) // => []
 *
 * @example <caption>Behaviour if <code>step</code> happens to be zero:</caption>
 * _.range(2, 10, 0) // => [2]
 * _.range(2, -10, 0) // => [2]
 * _.range(2, 2, 0) // => []
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.generate|generate}
 * @since 0.1.0
 * @param {Number} start
 * @param {Number} limit
 * @param {Number} [step=1]
 * @returns {Number[]}
 */
function range (start, limit, step) {
    start = _forceToNumber(start);
    limit = _forceToNumber(limit);
    step = arguments.length === 3 ? _forceToNumber(step) : 1;

    if (step === 0) {
        return limit === start ? [] : [start];
    }

    var len = Math.max(Math.ceil((limit - start) / step), 0);
    var result = Array(len);

    for (var i = 0, last = start; i < len; i++) {
        result[i] = last;
        last += step;
    }

    return result;
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
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function remainder (a, b) {
    return a % b;
}

/**
 * Checks whether the specified key is a own enumerable property of the given object or not.
 * @private
 * @function
 * @param {Object} obj
 * @param {String} key
 * @returns {Boolean}
 */
var _isOwnEnumerable = generic(Object.prototype.propertyIsEnumerable);

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

    return n >= -len && n < len ? n < 0 ? n + len : n : void 0;
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

    return i === len ? { isValid: true, target: target } : { isValid: false, target: void 0 };
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
 * @since 0.19.0
 * @param {Object|ArrayLike} obj
 * @param {String} path
 * @param {String} [separator="."]
 * @returns {*}
 */
function getPathIn (obj, path, separator) {
    return _getPathInfo(obj, _toPathParts(path, separator), true).target;
}

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
 *     _.areSame,
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
 * @since 0.1.0
 * @param {Function} predicate - The predicate to test the object properties
 * @param {String} message - The error message
 * @param {String[]} keyPaths - The array of keys, or {@link module:lamb.getPathIn|paths}, to test.
 * @param {String} [pathSeparator="."]
 * @returns {Function} A checker function which returns an error in the form
 * <code>["message", ["propertyA", "propertyB"]]</code> or an empty array.
 */
function checker (predicate, message, keyPaths, pathSeparator) {
    return function (obj) {
        var getValues = partial(getPathIn, [obj, __, pathSeparator]);

        return predicate.apply(obj, map(keyPaths, getValues)) ? [] : [message, keyPaths];
    };
}

/**
 * Creates a non-null-safe version of the provided "getKeys" function.
 * @private
 * @function
 * @param {Function} getKeys
 * @returns {Function}
 */
var _unsafeKeyListFrom = _curry2(function (getKeys, obj) {
    if (isNil(obj)) {
        throw _makeTypeErrorFor(obj, "object");
    }

    return getKeys(obj);
});

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
 * @since 0.12.0
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
 * @since 0.8.0
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
 * @function
 * @see {@link module:lamb.getPathIn|getPathIn}
 * @see {@link module:lamb.getIn|getIn}, {@link module:lamb.getKey|getKey}
 * @since 0.19.0
 * @param {String} path
 * @param {String} [separator="."]
 * @returns {Function}
 */
var getPath = _makePartial3(getPathIn);

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
 * @since 0.1.0
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
 * @function
 * @see {@link module:lamb.has|has}
 * @see {@link module:lamb.hasOwn|hasOwn}, {@link module:lamb.hasOwnKey|hasOwnKey}
 * @see {@link module:lamb.pathExistsIn|pathExistsIn}, {@link module:lamb.pathExists|pathExists}
 * @since 0.1.0
 * @param {String} key
 * @returns {Function}
 */
var hasKey = _curry2(has, true);

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
 * @since 0.1.0
 * @param {Object} obj
 * @param {String} key
 * @returns {Boolean}
 */
var hasOwn = generic(Object.prototype.hasOwnProperty);

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
 * @function
 * @see {@link module:lamb.hasOwn|hasOwn}
 * @see {@link module:lamb.has|has}, {@link module:lamb.hasKey|hasKey}
 * @see {@link module:lamb.pathExistsIn|pathExistsIn}, {@link module:lamb.pathExists|pathExists}
 * @since 0.1.0
 * @param {String} key
 * @returns {Function}
 */
var hasOwnKey = _curry2(hasOwn, true);

/**
 * Builds a predicate expecting an object to check against the given key / value pair.<br/>
 * The value check is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.
 * @example
 * var hasTheCorrectAnswer = _.hasKeyValue("answer", 42);
 *
 * hasTheCorrectAnswer({answer: 2}) // false
 * hasTheCorrectAnswer({answer: 42}) // true
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.hasPathValue|hasPathValue}
 * @since 0.1.0
 * @param {String} key
 * @param {*} value
 * @returns {Function}
 */
function hasKeyValue (key, value) {
    return function (obj) {
        return isUndefined(value) ? has(obj, key) && obj[key] === value : areSVZ(value, obj[key]);
    };
}

/**
 * Builds a predicate to check if the given path exists in an object and holds the desired value.<br/>
 * The value check is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.<br/>
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
 * @since 0.41.0
 * @param {String} path
 * @param {*} value
 * @param {String} [separator="."]
 * @returns {Function}
 */
function hasPathValue (path, value, separator) {
    return function (obj) {
        var pathInfo = _getPathInfo(obj, _toPathParts(path, separator), true);

        return pathInfo.isValid && areSVZ(pathInfo.target, value);
    };
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
 * @since 0.25.1
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
 * var isAdult = _.keySatisfies(_.isGTE(18), "age");
 *
 * isAdult(users[0]) // => true
 * isAdult(users[1]) // => false
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.pathSatisfies|pathSatisfies}
 * @since 0.45.0
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
 * @since 0.8.0
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
 * Creates a new object by applying the given function
 * to all enumerable properties of the source one.
 * @example
 * var weights = {
 *     john: "72.5 Kg",
 *     jane: "52.3 Kg"
 * };
 *
 * _.mapValues(weights, parseFloat) // => {john: 72.5, jane: 52.3}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.mapValuesWith|mapValuesWith}
 * @since 0.54.0
 * @param {Object} source
 * @param {ObjectIteratorCallback} fn
 * @returns {Object}
 */
function mapValues (source, fn) {
    if (isNil(source)) {
        throw _makeTypeErrorFor(source, "object");
    }

    var result = {};

    for (var key in source) {
        result[key] = fn(source[key], key, source);
    }

    return result;
}

/**
 * A curried version of {@link module:lamb.mapValues|mapValues}.<br/>
 * Expects a mapping function to build a new function waiting for the
 * object to act upon.
 * @example
 * var incValues = _.mapValuesWith(_.add(1));
 * var results = {
 *     first: 10,
 *     second: 5,
 *     third: 3
 * };
 *
 * incValues(results) // => {first: 11, second: 6, third: 4}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.mapValues|mapValues}
 * @since 0.54.0
 * @function
 * @param {ObjectIteratorCallback} fn
 * @returns {Function}
 */
var mapValuesWith = _curry2(mapValues, true);

/**
 * Merges the received objects using the provided function to retrieve their keys.
 * @private
 * @param {Function} getKeys
 * @param {Object} a
 * @param {Object} b
 * @returns {Function}
 */
function _merge (getKeys, a, b) {
    return reduce([a, b], function (result, source) {
        forEach(getKeys(source), function (key) {
            result[key] = source[key];
        });

        return result;
    }, {});
}

/**
 * Merges the enumerable properties of the provided sources into a new object.<br/>
 * In case of key homonymy the last source has precedence over the first.
 * @example
 * _.merge({a: 1, b: 3}, {b: 5, c: 4}) // => {a: 1, b: 5, c: 4}
 *
 * @example <caption>Array-like objects will be transformed to objects with numbers as keys:</caption>
 * _.merge([1, 2], {a: 2}) // => {"0": 1, "1": 2, a: 2}
 * _.merge("foo", {a: 2}) // => {"0": "f", "1": "o", "2": "o", a: 2}
 *
 * @example <caption>Every other non-nil value will be treated as an empty object:</caption>
 * _.merge({a: 2}, 99) // => {a: 2}
 * _.merge({a: 2}, NaN) // => {a: 2}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.mergeOwn|mergeOwn} to merge own properties only
 * @since 0.10.0
 * @function
 * @param {Object} a
 * @param {Object} b
 * @returns {Object}
 */
var merge = partial(_merge, [enumerables]);

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
 * @example <caption>Every other non-nil value will be treated as an empty object:</caption>
 * _.mergeOwn({a: 2}, 99) // => {a: 2}
 * _.mergeOwn({a: 2}, NaN) // => {a: 2}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.merge|merge} to merge all enumerable properties
 * @since 0.12.0
 * @function
 * @param {Object} a
 * @param {Object} b
 * @returns {Object}
 */
var mergeOwn = partial(_merge, [keys]);

/**
 * Accepts an object and build a function expecting a key to create a "pair" with the key
 * and its value.
 * @private
 * @function
 * @param {Object} obj
 * @returns {Function}
 */
var _keyToPairIn = _curry2(function (obj, key) {
    return [key, obj[key]];
});

/**
 * Using the provided function to retrieve the keys, builds a new function
 * expecting an object to create a list of key / value pairs.
 * @private
 * @function
 * @param {Function} getKeys
 * @returns {Function}
 */
var _pairsFrom = _curry2(function (getKeys, obj) {
    return map(getKeys(obj), _keyToPairIn(obj));
});

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
 * @function
 * @see {@link module:lamb.pairs|pairs}
 * @see {@link module:lamb.fromPairs|fromPairs}
 * @since 0.12.0
 * @param {Object} obj
 * @returns {Array<Array<String, *>>}
 */
var ownPairs = _pairsFrom(keys);

/**
 * Using the provided function to retrieve the keys of an object, builds
 * a function expecting an object to create the list of values for such keys.
 * @private
 * @function
 * @param {Function} getKeys
 * @returns {Function}
 */
var _valuesFrom = _curry2(function (getKeys, obj) {
    return map(getKeys(obj), function (key) {
        return obj[key];
    });
});

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
 * @function
 * @see {@link module:lamb.values|values}
 * @since 0.12.0
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
 * @function
 * @see {@link module:lamb.ownPairs|ownPairs}
 * @see {@link module:lamb.fromPairs|fromPairs}
 * @since 0.8.0
 * @param {Object} obj
 * @returns {Array<Array<String, *>>}
 */
var pairs = _pairsFrom(enumerables);

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
 * @since 0.43.0
 * @param {Object} obj
 * @param {String} path
 * @param {String} [separator="."]
 * @returns {Boolean}
 */
function pathExistsIn (obj, path, separator) {
    return _getPathInfo(obj, _toPathParts(path, separator), true).isValid;
}

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
 * @function
 * @see {@link module:lamb.pathExistsIn|pathExistsIn}
 * @see {@link module:lamb.hasOwn|hasOwn}, {@link module:lamb.hasOwnKey|hasOwnKey}
 * @see {@link module:lamb.has|has}, {@link module:lamb.hasKey|hasKey}
 * @since 0.43.0
 * @param {String} path
 * @param {String} [separator="."]
 * @returns {Function}
 */
var pathExists = _makePartial3(pathExistsIn);

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
 * var gotAnHighScore = _.pathSatisfies(_.contains(10), "performance.scores");
 * var hadAGoodStart = _.pathSatisfies(_.isGT(6), "performance.scores.0");
 *
 * gotAnHighScore(user) // => true
 * hadAGoodStart(user) // => false
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.keySatisfies|keySatisfies}
 * @since 0.45.0
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
 * @since 0.1.0
 * @param {Object} source
 * @param {String[]} whitelist
 * @returns {Object}
 */
function pick (source, whitelist) {
    var result = {};

    for (var i = 0, len = whitelist.length, key; i < len; i++) {
        key = whitelist[i];

        if (has(source, key)) {
            result[key] = source[key];
        }
    }

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
 * @since 0.1.0
 * @param {ObjectIteratorCallback} predicate
 * @returns {Function}
 */
function pickIf (predicate) {
    return function (source) {
        if (isNil(source)) {
            throw _makeTypeErrorFor(source, "object");
        }

        var result = {};

        for (var key in source) {
            if (predicate(source[key], key, source)) {
                result[key] = source[key];
            }
        }

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
 * @since 0.35.0
 * @param {String[]} whitelist
 * @returns {Function}
 */
var pickKeys = _curry2(pick, true);

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
 * @since 0.26.0
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
 * @since 0.26.0
 * @param {Object} keysMap
 * @returns {Function}
 */
var renameKeys = _curry2(rename, true);

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
 * @since 0.26.0
 * @param {Function} fn
 * @returns {Function}
 */
function renameWith (fn) {
    return function (source) {
        return rename(source, fn(source));
    };
}

/**
 * Sets, or creates, a property in a copy of the provided object to the desired value.
 * @private
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
 *
 * // `user` still is {name: "John", surname: "Doe", age: 30}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.setKey|setKey}
 * @see {@link module:lamb.setPath|setPath}, {@link module:lamb.setPathIn|setPathIn}
 * @since 0.18.0
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
 * @function
 * @see {@link module:lamb.setIn|setIn}
 * @see {@link module:lamb.setPath|setPath}, {@link module:lamb.setPathIn|setPathIn}
 * @since 0.18.0
 * @param {String} key
 * @param {*} value
 * @returns {Function}
 */
var setKey = _makePartial3(setIn);

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

    return _isArrayIndex(obj, key) ? _setIndex(obj, key, v) : _setIn(obj, key, v);
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
 * @since 0.20.0
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
 * @since 0.20.0
 * @param {String} path
 * @param {*} value
 * @param {String} [separator="."]
 * @returns {Function}
 */
function setPath (path, value, separator) {
    return function (source) {
        return setPathIn(source, path, value, separator);
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
 * @since 0.1.0
 * @param {Object} source
 * @param {String[]} blacklist
 * @returns {Object}
 */
function skip (source, blacklist) {
    if (isNil(source)) {
        throw _makeTypeErrorFor(source, "object");
    }

    var result = {};
    var props = make(blacklist, []);

    for (var key in source) {
        if (!(key in props)) {
            result[key] = source[key];
        }
    }

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
 * @since 0.1.0
 * @param {ObjectIteratorCallback} predicate
 * @returns {Function}
 */
var skipIf = compose(pickIf, not);

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
 * @since 0.35.0
 * @param {String[]} blacklist
 * @returns {Function}
 */
var skipKeys = _curry2(skip, true);

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
var _tearFrom = _curry2(function (getKeys, obj) {
    return reduce(getKeys(obj), function (result, key) {
        result[0].push(key);
        result[1].push(obj[key]);

        return result;
    }, [[], []]);
});

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
 * @since 0.8.0
 * @param {Object} obj
 * @returns {Array<String[], Array>}
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
 * @function
 * @see {@link module:lamb.tear|tear}
 * @see {@link module:lamb.make|make} for the reverse operation
 * @since 0.12.0
 * @param {Object} obj
 * @returns {Array<String[], Array>}
 */
var tearOwn = _tearFrom(keys);

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
 *
 * _.updateIn(user, "visits", _.add(1)) // => {name: "John", visits: 2}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.updateKey|updateKey}
 * @see {@link module:lamb.updatePath|updatePath}, {@link module:lamb.updatePathIn|updatePathIn}
 * @since 0.22.0
 * @param {Object} source
 * @param {String} key
 * @param {Function} updater
 * @returns {Object}
 */
function updateIn (source, key, updater) {
    return _isEnumerable(source, key)
        ? _setIn(source, key, updater(source[key]))
        : _merge(enumerables, source, {});
}

/**
 * Builds a partial application of {@link module:lamb.updateIn|updateIn} with the provided
 * <code>key</code> and <code>updater</code>, expecting the object to act upon.<br/>
 * This function is meant for updating existing enumerable properties, and for those it
 * will delegate the "set action" to {@link module:lamb.setIn|setIn}; a copy of the
 * <code>source</code> is returned otherwise.
 * @example
 * var user = {name: "John", visits: 2};
 * var incrementVisits = _.updateKey("visits", _.add(1));
 *
 * incrementVisits(user) // => {name: "John", visits: 3}
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.updateIn|updateIn}
 * @see {@link module:lamb.updatePath|updatePath}, {@link module:lamb.updatePathIn|updatePathIn}
 * @since 0.22.0
 * @param {String} key
 * @param {Function} updater
 * @returns {Function}
 */
var updateKey = _makePartial3(updateIn);

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
 * var inc = _.add(1);
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
 * var newUser = _.updatePathIn(user, "scores.0.value", inc);
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
 * @since 0.24.0
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
        return Array.isArray(source) ? slice(source, 0, source.length) : _merge(enumerables, source, {});
    }
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
 * var incrementScores = _.updatePath("status.scores", _.mapWith(_.add(1)))
 *
 * incrementScores(user) // => {id: 1, status: {scores: [3, 5, 7], visits: 0}}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.updatePathIn|updatePathIn}
 * @see {@link module:lamb.updateIn|updateIn}, {@link module:lamb.updateKey|updateKey}
 * @since 0.24.0
 * @param {String} path
 * @param {Function} updater
 * @param {String} [separator="."]
 * @returns {Function}
 */
function updatePath (path, updater, separator) {
    return function (source) {
        return updatePathIn(source, path, updater, separator);
    };
}

/**
 * Validates an object with the given list of {@link module:lamb.checker|checker} functions.
 * @example
 * var hasContent = function (s) { return s.trim().length > 0; };
 * var userCheckers = [
 *     _.checker(hasContent, "Name is required", ["name"]),
 *     _.checker(hasContent, "Surname is required", ["surname"]),
 *     _.checker(_.isGTE(18), "Must be at least 18 years old", ["age"])
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
 * @since 0.1.0
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
 * var userCheckers = [
 *     _.checker(hasContent, "Name is required", ["name"]),
 *     _.checker(hasContent, "Surname is required", ["surname"]),
 *     _.checker(_.isGTE(18), "Must be at least 18 years old", ["age"])
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
 * @since 0.1.0
 * @param {Function[]} checkers
 * @returns {Function}
 */
var validateWith = _curry2(validate, true);

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
 * @function
 * @see {@link module:lamb.ownValues|ownValues}
 * @since 0.1.0
 * @param {Object} obj
 * @returns {Array}
 */
var values = _valuesFrom(enumerables);

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
 * @since 0.1.0
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
 * @since 0.1.0
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
 * @since 0.1.0
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
 * A generic version of <code>String.prototype.search</code>
 * @private
 * @function
 * @param {String} s
 * @param {RegExp} pattern
 * @return {Number}
 */
var _search = generic(String.prototype.search);

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
 * @since 0.1.0
 * @param {RegExp} pattern
 * @returns {Function}
 */
function testWith (pattern) {
    return function (s) {
        return _search(s, pattern) !== -1;
    };
}

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
 * @since 0.47.0
 * @param {*} constructor
 * @returns {Function}
 */
function isInstanceOf (constructor) {
    return function (obj) {
        return obj instanceof constructor;
    };
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
 * @since 0.1.0
 * @param {String} typeName
 * @returns {Function}
 */
function isType (typeName) {
    return function (value) {
        return type(value) === typeName;
    };
}

export { __, adapter, add, allOf, always, anyOf, append, appendTo, application, apply, applyTo, areSVZ, areSame, aritize, asPartial, binary, case_ as case, checker, clamp, clampWithin, collect, compose, condition, contains, count, countBy, curry, curryRight, curryable, curryableRight, debounce, deduct, difference, divide, divideBy, drop, dropFrom, dropLastWhile, dropWhile, enumerables, every, everyIn, filter, filterWith, find, findIndex, findIndexWhere, findLast, findLastIndex, findLastIndexWhere, findLastWhere, findWhere, flatMap, flatMapWith, flatten, flip, forEach, fromPairs, generate, generic, getArgAt, getAt, getIn, getIndex, getKey, getPath, getPathIn, group, groupBy, gt, gte, has, hasKey, hasKeyValue, hasOwn, hasOwnKey, hasPathValue, head, identity, index, indexBy, init, insert, insertAt, intersection, invoker, invokerOn, is, isFinite_ as isFinite, isGT, isGTE, isIn, isInstanceOf, isInteger, isLT, isLTE, isNil, isNull, isSVZ, isSafeInteger, isType, isUndefined, join, joinWith, keySatisfies, keys, last, list, lt, lte, make, map, mapArgs, mapValues, mapValuesWith, mapWith, merge, mergeOwn, modulo, multiply, multiplyBy, not, ownPairs, ownValues, padLeft, padRight, pairs, partial, partialRight, partition, partitionWith, pathExists, pathExistsIn, pathSatisfies, pick, pickIf, pickKeys, pipe, pluck, pluckKey, pull, pullFrom, randomInt, range, reduce, reduceRight, reduceRightWith, reduceWith, remainder, rename, renameKeys, renameWith, repeat, reverse, rotate, rotateBy, setAt, setIn, setIndex, setKey, setPath, setPathIn, shallowFlatten, skip, skipIf, skipKeys, slice, sliceAt, some, someIn, sort, sortWith, sortedInsert, sorter, sorterDesc, subtract, sum, tail, take, takeFrom, takeLastWhile, takeWhile, tapArgs, tear, tearOwn, testWith, throttle, transpose, type, unary, union, unionBy, uniques, uniquesBy, unless, updateAt, updateIn, updateIndex, updateKey, updatePath, updatePathIn, validate, validateWith, values, when, zip, zipWithIndex };
