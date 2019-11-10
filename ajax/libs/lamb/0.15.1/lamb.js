/**
 * @overview lamb - A lightweight, and docile, JavaScript library to help embracing functional programming.
 * @author Andrea Scartabelli <andrea.scartabelli@gmail.com>
 * @version 0.15.1
 * @module lamb
 * @license MIT
 * @preserve
 */
!function (host) {
    "use strict";

    var lamb = Object.create(null);

    /**
     * The current module version.
     * @memberof module:lamb
     * @private
     * @category Core
     * @type String
     */
    lamb._version =  "0.15.1";

    // alias used as a placeholder argument for partial application
    var _ = lamb;

    // some prototype shortcuts for internal use
    var _arrayProto = Array.prototype;
    var _fnProto = Function.prototype;
    var _objectProto = Object.prototype;
    var _reProto = RegExp.prototype;

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
     * @category Core
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
     * var getName = _.getKey("name");
     * var users = [{name: "fred"}, {name: "bOb"}];
     * var sayHiToUser = _.compose(fixNameAndSayHi, getName);
     *
     * users.map(sayHiToUser) // ["Hi, Fred", "Hi, Bob"]
     *
     * @memberof module:lamb
     * @category Function
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
     * @memberof module:lamb
     * @category Core
     * @author [Irakli Gozalishvili]{@link https://github.com/Gozala/}. Thanks for this *beautiful* one-liner (never liked your "unbind" naming choice, though).
     * @function
     * @example
     * // Lamb's "filter" is actually implemented like this
     * var filter = _.generic(Array.prototype.filter);
     * var isLowerCase = function (s) { return s.toLowerCase() === s; };
     *
     * filter(["Foo", "bar", "baZ"], isLowerCase) // => ["bar"]
     *
     * // the function will work with any array-like object
     * filter("fooBAR", isLowerCase) // => ["f", "o", "o"]
     *
     * @param {Function} method
     * @returns {Function}
     */
    var generic = _fnProto.call.bind(_fnProto.bind, _fnProto.call);

    /**
     * The I combinator. Any value passed to the function is simply returned as it is.
     * @example
     * var foo = {bar: "baz"};
     *
     * _.identity(foo) === foo // true
     *
     * @memberof module:lamb
     * @category Core
     * @see [SKI combinator calculus]{@link https://en.wikipedia.org/wiki/SKI_combinator_calculus}
     * @param {*} value
     * @returns {*} The value passed as parameter.
     */
    function identity (value) {
        return value;
    }

    /**
     * Builds a partially applied function. The <code>lamb</code> object itself can be used as a placeholder argument:
     * it's useful to alias it as <code>_</code> or <code>__</code>.
     * @example
     * var weights = ["2 Kg", "10 Kg", "1 Kg", "7 Kg"];
     * var parseInt10 = _.partial(parseInt, _, 10);
     *
     * weights.map(parseInt10) // => [2, 10, 1, 7]
     *
     * @memberof module:lamb
     * @category Function
     * @param {Function} fn
     * @param {...*} args
     * @returns {Function}
     */
    function partial (fn) {
        var args = slice(arguments, 1);

        return function () {
            var lastArgumentIdx = 0;
            var newArgs = [];
            var argsLen = args.length;

            for (var i = 0, boundArg; i < argsLen; i++) {
                boundArg = args[i];
                newArgs[i] = boundArg === _ ? arguments[lastArgumentIdx++] : boundArg;
            }

            for (var len = arguments.length; lastArgumentIdx < len; lastArgumentIdx++) {
                newArgs.push(arguments[lastArgumentIdx]);
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
     * Builds an array comprised of all values of the array-like object passing the <code>predicate</code> test.<br/>
     * It's a generic version of [Array.prototype.filter]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter}.
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
     * @function
     * @param {ArrayLike} arrayLike
     * @param {ListIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Array}
     */
    var filter = generic(_arrayProto.filter);

    /**
     * Executes the provided <code>iteratee</code> for each element of the given array-like object.<br/>
     * It's a generic version of [Array.prototype.forEach]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach}.
     * @example <caption>Adding a CSS class to all elements of a NodeList in a browser environment</caption>
     * var addClass = function (className) {
     *     return function (element) {
     *         element.classList.add(className);
     *     };
     * };
     * var paragraphs = document.querySelectorAll("#some-container p");
     *
     * _.forEach(paragraphs, addClass("main"));
     * // each "p" element in the container will have the "main" class now
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @param {ArrayLike} arrayLike
     * @param {ListIteratorCallback} iteratee
     * @param {Object} [iterateeContext]
     */
    var forEach = generic(_arrayProto.forEach);

    /**
     * Creates an array from the results of the provided <code>iteratee</code>.<br/>
     * It's a generic version of [Array.prototype.map]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map}.
     * @example
     * function getSquareRoots () {
     *     return _.map(arguments, Math.sqrt);
     * }
     *
     * getSquareRoots(4, 9, 16) // => [2, 3, 4]
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @param {ArrayLike} arrayLike
     * @param {ListIteratorCallback} iteratee
     * @param {Object} [iterateeContext]
     * @returns {Array}
     */
    var map = generic(_arrayProto.map);

    /**
     * Reduces (or folds) the values of an array-like object, starting from the first, to a new value using the provided <code>accumulator</code> function.<br/>
     * It's a generic version of [Array.prototype.reduce]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce}.
     * @example
     * _.reduce([1, 2, 3, 4], _.add) // => 10
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @param {ArrayLike} arrayLike
     * @param {AccumulatorCallback} accumulator
     * @param {*} [initialValue]
     * @returns {*}
     */
    var reduce = generic(_arrayProto.reduce);

    /**
     * Same as {@link module:lamb.reduce|reduce}, but starts the fold operation from the last element instead.<br/>
     * It's a generic version of [Array.prototype.reduceRight]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight}.
     * @memberof module:lamb
     * @category Array
     * @function
     * @param {ArrayLike} arrayLike
     * @param {AccumulatorCallback} accumulator
     * @param {*} [initialValue]
     * @returns {*}
     */
    var reduceRight = generic(_arrayProto.reduceRight);

    /**
     * Builds an array by extracting a portion of an array-like object.<br/>
     * It's a generic version of [Array.prototype.slice]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice}.
     * @example
     * _.slice(["foo", "bar", "baz"], 0, 2) // => ["foo", "bar"]
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @param {ArrayLike} arrayLike - Any array like object.
     * @param {Number} [start=0] - Zero-based index at which to begin extraction.
     * @param {Number} [end=arrayLike.length] - Zero-based index at which to end extraction. Extracts up to but not including end.
     * @returns {Array}
     */
    var slice = generic(_arrayProto.slice);

    lamb.filter = filter;
    lamb.forEach = forEach;
    lamb.map = map;
    lamb.reduce = reduce;
    lamb.reduceRight = reduceRight;
    lamb.slice = slice;


    function _findSliceEndIndex (arrayLike, predicate, predicateContext) {
        var idx = -1;
        var len = arrayLike.length;

        while (++idx < len && predicate.call(predicateContext, arrayLike[idx], idx, arrayLike));

        return idx;
    }

    function _flatten (array, output) {
        array.forEach(function (value) {
            if (Array.isArray(value)) {
                _flatten(value, output);
            } else {
                output.push(value);
            }
        });

        return output;
    }

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
     * Returns an array of items present only in the first of the given arrays.<br/>
     * Note that since version <code>0.13.0</code> this function uses the ["SameValueZero" comparison]{@link module:lamb.isSVZ|isSVZ}.
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
        var rest = shallowFlatten(slice(arguments, 1));
        var isInRest = partial(isIn, rest, _, 0);
        return array.filter(not(isInRest));
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
     * @function
     * @param {ArrayLike} arrayLike
     * @param {Number} n
     * @returns {Array}
     */
    var drop = binary(slice);

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
     * @param {Number} n
     * @returns {Function}
     */
    var dropN = _curry(drop, 2, true);

    /**
     * Builds a function that drops the first <code>n</code> elements satisfying a predicate from an array or array-like object.
     * @example
     * var isEven = function (n) { return n % 2 === 0; };
     * var dropWhileIsEven = _.dropWhile(isEven);
     *
     * dropWhileIsEven([2, 4, 6, 8]) // => []
     * dropWhileIsEven([2, 4, 7, 8]) // => [7, 8]
     *
     * @memberof module:lamb
     * @category Array
     * @param {ListIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Function}
     */
    function dropWhile (predicate, predicateContext) {
        return function (arrayLike) {
            return slice(arrayLike, _findSliceEndIndex(arrayLike, predicate, predicateContext));
        };
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
     * @param {ListIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Function}
     */
    function filterWith (predicate, predicateContext) {
        return partial(filter, _, predicate, predicateContext);
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
     * @param {ArrayLike} arrayLike
     * @param {ListIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {*}
     */
    function find (arrayLike, predicate, predicateContext) {
        var result;

        for (var i = 0, len = arrayLike.length, element; i < len; i++) {
            element = arrayLike[i];

            if (predicate.call(predicateContext, element, i, arrayLike)) {
                result = element;
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
     * @param {ArrayLike} arrayLike
     * @param {ListIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Number}
     */
    function findIndex (arrayLike, predicate, predicateContext) {
        var result = -1;

        for (var i = 0, len = arrayLike.length; i < len; i++) {
            if (predicate.call(predicateContext, arrayLike[i], i, arrayLike)) {
                result = i;
                break;
            }
        }

        return result;
    }

    /**
     * Similar to {@link module:lamb.map|map}, but if the mapping function returns an array this will
     * be concatenated, rather than pushed, to the final result.
     * @example <caption>showing the difference with <code>map</code></caption>
     * var words = ["foo", "bar"];
     * var toCharArray = function (s) { return s.split(""); };
     *
     * _.map(words, toCharArray) // => [["f", "o", "o"], ["b", "a", "r"]]
     * _.flatMap(words, toCharArray) // => ["f", "o", "o", "b", "a", "r"]
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @param {Array} array
     * @param {ListIteratorCallback} iteratee
     * @param {Object} [iterateeContext]
     * @returns {Array}
     */
    var flatMap = compose(shallowFlatten, map);

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
     * @param {ListIteratorCallback} iteratee
     * @param {Object} [iterateeContext]
     * @returns {Function}
     */
    function flatMapWith (iteratee, iterateeContext) {
        return partial(flatMap, _, iteratee, iterateeContext);
    }

    /**
     * Flattens an array. See also {@link module:lamb.shallowFlatten|shallowFlatten}.
     * @example <caption>showing the difference with <code>shallowFlatten</code></caption>
     * var arr = [1, 2, [3, 4, [5, 6]], 7, 8];
     *
     * _.flatten(arr) // => [1, 2, 3, 4, 5, 6, 7, 8]
     * _.shallowFlatten(arr) // => [1, 2, 3, 4, [5, 6], 7, 8]
     *
     * @memberof module:lamb
     * @category Array
     * @param {Array} array
     * @returns {Array}
     */
    function flatten (array) {
        return _flatten(array, []);
    }

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
     * @example <caption>Adding a custom value for missing keys</caption>
     *
     * var getCityOrUnknown = _.condition(
     *     _.hasKey("city"),
     *     getCity,
     *     _.always("Unknown")
     * );
     *
     * personsByCity = _.group(persons, getCityOrUnknown);
     *
     * // "personsByCity" now holds:
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
     * @param {ArrayLike} arrayLike
     * @param {ListIteratorCallback} iteratee
     * @param {Object} [iterateeContext]
     * @returns {Object}
     */
    function group (arrayLike, iteratee, iterateeContext) {
       var result = {};
        var len = arrayLike.length;

        for (var i = 0, element; i < len; i++) {
            element = arrayLike[i];
            var key = iteratee.call(iterateeContext, element, i, arrayLike);

            if (key in result) {
                result[key].push(element);
            } else {
                result[key] = [element];
            }
        }

        return result;
    }

    /**
     * Using the provided iteratee, and its optional context, builds a [partial application]{@link module:lamb.partial}
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
     * @param {ListIteratorCallback} iteratee
     * @param {Object} [iterateeContext]
     * @returns {Function}
     */
    function groupBy (iteratee, iterateeContext) {
        return partial(group, _, iteratee, iterateeContext);
    }

    /**
     * Returns an array of every item present in all given arrays.<br/>
     * Note that since version <code>0.13.0</code> this function uses the ["SameValueZero" comparison]{@link module:lamb.isSVZ|isSVZ}.
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
     * @return {Array}
     */
    function intersection () {
        var rest = slice(arguments, 1);
        return uniques(arguments[0]).filter(function (item) {
            return rest.every(contains(item));
        });
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
     * @param {ArrayLike} arrayLike
     * @param {*} value
     * @param {Number} [fromIndex=0] The position at which to begin searching for the given value.
     * @returns {Boolean}
     */
    function isIn (arrayLike, value, fromIndex) {
        var result = false;

        for (var i = fromIndex | 0, len = arrayLike.length; i < len; i++) {
            if (isSVZ(value, arrayLike[i])) {
                result = true;
                break;
            }
        }

        return result;
    }

    /**
     * Generates an array with the values passed as arguments.
     * @example
     * _.list(1, 2, 3) // => [1, 2, 3]
     *
     * @memberof module:lamb
     * @category Array
     * @param {...*} value
     * @returns {Array}
     */
    function list () {
        return arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
    }

    /**
     * Builds a partial application of {@link module:lamb.map|map} using the given iteratee and the optional context.
     * The resulting function expects the array-like object to act upon.
     * @example
     * var square = function (n) { return n * n; };
     * var getSquares = _.mapWith(square);
     *
     * getSquares([1, 2, 3, 4, 5]) // => [1, 4, 9, 16, 25]
     *
     * @memberof module:lamb
     * @category Array
     * @param {ListIteratorCallback} iteratee
     * @param {Object} [iterateeContext]
     * @returns {function}
     */
    function mapWith (iteratee, iterateeContext) {
        return partial(map, _, iteratee, iterateeContext);
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
     * @param {ArrayLike} arrayLike
     * @param {ListIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Array<Array<*>, Array<*>>}
     */
    function partition (arrayLike, predicate, predicateContext) {
        var result = [[], []];
        var len = arrayLike.length;

        for (var i = 0, el; i < len; i++) {
            el = arrayLike[i];
            result[predicate.call(predicateContext, el, i, arrayLike) ? 0 : 1].push(el);
        }

        return result;
    }

    /**
     * Builds a partial application of {@link module:lamb.partition|partition} using the given predicate and the optional context.
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
     * @param {ListIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Function}
     */
    function partitionWith (predicate, predicateContext) {
        return partial(partition, _, predicate, predicateContext);
    }

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
     * @param {String} key
     * @returns {Function}
     */
    function pluckKey (key) {
        return mapWith(getKey(key));
    }

    /**
     * Flattens the "first level" of an array.<br/>
     * See also {@link module:lamb.flatten|flatten}.
     * @example <caption>showing the difference with <code>flatten</code></caption>
     * var arr = [1, 2, [3, 4, [5, 6]], 7, 8];
     *
     * _.flatten(arr) // => [1, 2, 3, 4, 5, 6, 7, 8]
     * _.shallowFlatten(arr) // => [1, 2, 3, 4, [5, 6], 7, 8]
     *
     * @memberof module:lamb
     * @category Array
     * @param {Array} array
     * @returns {Array}
     */
    function shallowFlatten (array) {
        return _arrayProto.concat.apply([], array);
    }

    /**
     * Retrieves the first <code>n</code> elements from an array or array-like object.
     * Note that, being this a partial application of {@link module:lamb.slice|slice},
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
     * @param {Number} n
     * @returns {Function}
     */
    var takeN = _curry(take, 2, true);

    /**
     * Builds a function that takes the first <code>n</code> elements satisfying a predicate from an array or array-like object.
     * @example
     * var isEven = function (n) { return n % 2 === 0; };
     * var takeWhileIsEven = _.takeWhile(isEven);
     *
     * takeWhileIsEven([1, 2, 4, 6, 8]) // => []
     * takeWhileIsEven([2, 4, 7, 8]) // => [2, 4]
     *
     * @memberof module:lamb
     * @category Array
     * @param {ListIteratorCallback} predicate
     * @param {Object} predicateContext
     * @returns {Function}
     */
    function takeWhile (predicate, predicateContext) {
        return function (arrayLike) {
            return slice(arrayLike, 0, _findSliceEndIndex(arrayLike, predicate, predicateContext));
        };
    }

    /**
     * Transposes a matrix. Can also be used to reverse a {@link module:lamb.zip|zip} operation.<br/>
     * Just like {@link module:lamb.zip|zip}, the received array-like objects will be truncated to the
     * shortest length.
     * @example <caption>transposing a matrix</caption>
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
     * @example <caption>showing the relationship with <code>zip</code></caption>
     * var zipped = _.zip(["a", "b", "c"], [1, 2, 3]); // => [["a", 1], ["b", 2], ["c", 3]]
     *
     * _.transpose(zipped) // => [["a", "b", "c"], [1, 2, 3]]
     *
     * @memberof module:lamb
     * @category Array
     * @param {ArrayLike<ArrayLike<*>>} arrayLike
     * @returns {Array<Array<*>>}
     */
    function transpose (arrayLike) {
        var result = [];
        var minLen = apply(Math.min, pluck(arrayLike, "length")) | 0;
        var len = arrayLike.length;

        for (var i = 0, j; i < minLen; i++) {
            result.push([]);

            for (j = 0; j < len; j++) {
                result[i][j] = arrayLike[j][i];
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
    var union = compose(uniques, flatMapWith(unary(slice)), list);

    /**
     * Returns an array comprised of the unique elements of the given array-like object.<br/>
     * Can work with lists of complex objects if supplied with an iteratee.<br/>
     * Note that since version <code>0.13.0</code> this function uses the ["SameValueZero" comparison]{@link module:lamb.isSVZ|isSVZ}.
     * @example <caption>with simple values</caption>
     * _.uniques([1, 2, 2, 3, 4, 3, 5, 1]) // => [1, 2, 3, 4, 5]
     *
     * @example <caption>with complex values</caption>
     * var data  = [
     *     {id: "1"},
     *     {id: "4"},
     *     {id: "5"},
     *     {id: "1"},
     *     {id: "5"},
     * ];
     *
     * _.uniques(data, _.getKey("id")) // => [{id: "1"}, {id: "4"}, {"id": 5}]
     *
     * @memberof module:lamb
     * @category Array
     * @param {ArrayLike} arrayLike
     * @param {ListIteratorCallback} [iteratee] Defaults to the [identity function]{@link module:lamb.identity}.
     * @param {Object} [iterateeContext]
     * @returns {Array}
     */
    function uniques (arrayLike, iteratee, iterateeContext) {
        if (typeof iteratee !== "function") {
            iteratee = identity;
        }

        var result = [];
        var seen = [];
        var value;

        for (var i = 0; i < arrayLike.length; i++) {
            value = iteratee.call(iterateeContext, arrayLike[i], i , arrayLike);

            if (!isIn(seen, value)) {
                seen.push(value);
                result.push(arrayLike[i]);
            }
        }

        return result;
    }

    /**
     * Builds a list of arrays out of the given array-like objects by pairing items with the same index.<br/>
     * The received array-like objects will be truncated to the shortest length.<br/>
     * See also {@link module:lamb.zipWithIndex|zipWithIndex} and {@link module:lamb.transpose|transpose} for the reverse operation.
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
     * @param {ArrayLike} arrayLike
     * @returns {Array<Array<*, Number>>}
     */
    var zipWithIndex = mapWith(binary(list));

    lamb.contains = contains;
    lamb.difference = difference;
    lamb.drop = drop;
    lamb.dropN = dropN;
    lamb.dropWhile = dropWhile;
    lamb.filterWith = filterWith;
    lamb.find = find;
    lamb.findIndex = findIndex;
    lamb.flatMap = flatMap;
    lamb.flatMapWith = flatMapWith;
    lamb.flatten = flatten;
    lamb.group = group;
    lamb.groupBy = groupBy;
    lamb.intersection = intersection;
    lamb.isIn = isIn;
    lamb.list = list;
    lamb.mapWith = mapWith;
    lamb.partition = partition;
    lamb.partitionWith = partitionWith;
    lamb.pluck = pluck;
    lamb.pluckKey = pluckKey;
    lamb.shallowFlatten = shallowFlatten;
    lamb.take = take;
    lamb.takeN = takeN;
    lamb.takeWhile = takeWhile;
    lamb.transpose = transpose;
    lamb.union = union;
    lamb.uniques = uniques;
    lamb.zip = zip;
    lamb.zipWithIndex = zipWithIndex;


    function _comparer (a, b) {
        var result = 0;

        if (typeof a !== typeof b) {
            a = String(a);
            b = String(b);
        }

        if (!isSVZ(a, b)) {
            if (a > b || a !== a) {
                result = 1;
            } else if (a < b || b !== b) {
                result = -1;
            }
        }

        return result;
    }

    function _compareWith (criteria) {
        var len = criteria.length;

        return function (a, b) {
            var result = 0;
            var isDescSort;
            var criterion;

            for (var i = 0; i < len; i++) {
                criterion = criteria[i];
                result = criterion.compare(a.value, b.value);

                if (result !== 0) {
                    isDescSort = criteria[i].isDescending;
                    break;
                }
            }

            if (result === 0) {
                isDescSort = criteria[len - 1].isDescending;
                result = a.index - b.index;
            }

            return isDescSort ? -result : result;
        };
    }

    function _getInsertionIndex (array, element, comparer, start, end) {
        if (array.length === 0) {
            return 0;
        }

        var pivot = (start + end) >> 1;
        var result = comparer({
            value: element,
            index: pivot
        }, {
            value: array[pivot],
            index: pivot
        });

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

    function _makeCriteria (sorters) {
        return sorters.length ? sorters.map(_makeCriterion) : [_sorter()];
    }

    function _makeCriterion (criterion) {
        return typeof Object(criterion).compare === "function" ? criterion : _sorter(criterion);
    }

    function _sorter (reader, isDescending, comparer) {
        return {
            isDescending: isDescending === true,
            compare: function (a, b) {
                if (typeof reader === "function" && reader !== identity) {
                    a = reader(a);
                    b = reader(b);
                }

                return (comparer || _comparer)(a, b);
            }
        };
    }

    /**
     * Inserts an element in a copy of a sorted array respecting the sort order.
     * @example <caption>with simple values</caption>
     * _.insert([], 1) // => [1]
     * _.insert([2, 4, 6], 5) // => [2, 4, 5, 6]
     * _.insert([4, 2, 1], 3, _.sorterDesc()) // => [4, 3, 2, 1]
     *
     * @example <caption>with complex values</caption>
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
     * var result = _.insert(
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
     * @see {@link module:lamb.sort|sort}
     * @see {@link module:lamb.sorter|sorter}
     * @see {@link module:lamb.sorterDesc|sorterDesc}
     * @see {@link module:lamb.sortWith|sortWith}
     * @param {Array} array
     * @param {*} element
     * @param {...(Sorter|Function)} [sorter={@link module:lamb.sorter|sorter()}] - The sorting criteria used to sort the array.
     * @returns {Array}
     */
    function insert (array, element) {
        var criteria = _makeCriteria(slice(arguments, 2));
        var result = array.concat();
        var idx = _getInsertionIndex(array, element, _compareWith(criteria), 0, array.length);

        result.splice(idx, 0, element);
        return result;
    }

    /**
     * Returns a [stably]{@link https://en.wikipedia.org/wiki/Sorting_algorithm#Stability} sorted copy of an
     * array-like object using the given criteria.<br/>
     * Sorting criteria are built using Lamb's {@link module:lamb.sorter|sorter} function, but you can also
     * pass simple "reader" functions and default ascending sorters will be built.<br/>
     * A "reader" is a function that evaluates the array element and supplies the value to be used in the comparison.
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
     * @param {ArrayLike} arrayLike
     * @param {...(Sorter|Function)} [sorter={@link module:lamb.sorter|sorter()}]
     * @returns {Array}
     */
    function sort (arrayLike) {
        var criteria = _makeCriteria(slice(arguments, 1));
        var data = [];
        var result = [];
        var len = arrayLike.length;

        for (var i = 0; i < len; i++) {
            data.push({
                value: arrayLike[i],
                index: i
            });
        }

        data.sort(_compareWith(criteria));

        for (i = 0; i < len; i++) {
            result.push(data[i].value);
        }

        return result;
    }

    /**
     * Creates an ascending sort criterion with the provided <code>reader</code> and <code>comparer</code>.<br/>
     * See {@link module:lamb.sort|sort} for various examples.
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.insert|insert}
     * @see {@link module:lamb.sort|sort}
     * @see {@link module:lamb.sorterDesc|sorterDesc}
     * @see {@link module:lamb.sortWith|sortWith}
     * @param {Function} [reader={@link module:lamb.identity|identity}] A function meant to generate a simple value from a complex one. The function should evaluate the array element and supply the value to be passed to the comparer.
     * @param {Function} [comparer] An optional custom comparer function.
     * @returns {Sorter}
     */
    var sorter = partial(_sorter, _, false, _);

    /**
     * Creates a descending sort criterion with the provided <code>reader</code> and <code>comparer</code>.<br/>
     * See {@link module:lamb.sort|sort} for various examples.
     *
     * @memberof module:lamb
     * @category Array
     * @function
     * @see {@link module:lamb.insert|insert}
     * @see {@link module:lamb.sort|sort}
     * @see {@link module:lamb.sorter|sorter}
     * @see {@link module:lamb.sortWith|sortWith}
     * @param {Function} [reader={@link module:lamb.identity|identity}] A function meant to generate a simple value from a complex one. The function should evaluate the array element and supply the value to be passed to the comparer.
     * @param {Function} [comparer] An optional custom comparer function.
     * @returns {Sorter}
     */
    var sorterDesc = partial(_sorter, _, true, _);

    /**
     * Builds a partial application of {@link module:lamb.sort|sort} using the provided criteria. The returned
     * function expects the array-like object to sort.
     * As usual, sorting criteria are built using Lamb's {@link module:lamb.sorter|sorter} function, but you can also
     * pass simple "reader" functions and default ascending sorters will be built.<br/>
     * A "reader" is a function that evaluates the array element and supplies the value to be used in the comparison.<br/>
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
     * @param {...(Sorter|Function)} [sorter={@link module:lamb.sorter|sorter()}]
     * @returns {Function}
     */
    function sortWith () {
        var sorters = slice(arguments);

        return function (arrayLike) {
            return sort.apply(null, [arrayLike].concat(sorters));
        };
    }

    lamb.insert = insert;
    lamb.sort = sort;
    lamb.sorter = sorter;
    lamb.sorterDesc = sorterDesc;
    lamb.sortWith = sortWith;


    function _currier (fn, arity, isRightCurry, slicer, argsHolder) {
        return function () {
            var args = argsHolder.concat(slicer(arguments));

            if (args.length >= arity) {
                return fn.apply(this, isRightCurry ? args.reverse() : args);
            } else {
                return _currier(fn, arity, isRightCurry, slicer, args);
            }
        };
    }

    function _curry (fn, arity, isRightCurry, isAutoCurry) {
        var slicer = isAutoCurry ? slice : function (a) {
            return a.length ? [a[0]] : [];
        };

        if ((arity | 0) !== arity) {
            arity = fn.length;
        }

        return _currier(fn, arity, isRightCurry, slicer, []);
    }

    /**
     * Applies the passed function to the given argument list.
     * @example
     * _.apply(_.add, [3, 4]) // => 7
     *
     * @memberof module:lamb
     * @category Function
     * @param {Function} fn
     * @param {ArrayLike} args
     * @returns {*}
     */
    function apply (fn, args) {
        return fn.apply(fn, slice(args));
    }

    /**
     * A curried version of {@link module:lamb.apply|apply}. Expects an array-like object to use as arguments
     * and builds a function waiting for the target of the application.
     * @example
     * var data = [3, 4];
     * var applyDataTo = _.applyArgs(data);
     *
     * applyDataTo(_.add) // => 7
     * applyDataTo(_.multiply) // => 12
     *
     * @memberof module:lamb
     * @category Function
     * @function
     * @param {ArrayLike} args
     * @returns {Function}
     */
    var applyArgs = _curry(apply, 2, true);

    /**
     * Builds a function that passes only the specified amount of arguments to the given function.<br/>
     * See also {@link module:lamb.binary|binary} and {@link module:lamb.unary|unary} for common use
     * cases shortcuts.
     * @example
     * var data = ["1-2", "13-5", "6-23"];
     * var getDashIndex = _.invoker("indexOf", "-");
     *
     * data.map(getDashIndex) // => [1, 2, -1]
     * data.map(_.aritize(getDashIndex, 1)) // = > [1, 2, 1]
     *
     * @memberof module:lamb
     * @category Function
     * @param {Function} fn
     * @param {Number} arity
     * @returns {Function}
     */
    function aritize (fn, arity) {
        return function () {
            return apply(fn, slice(arguments, 0, arity));
        };
    }

    /**
     * Builds a function that passes only two arguments to the given function.<br/>
     * It's simply a shortcut for a common use case of {@link module:lamb.aritize|aritize},
     * exposed for convenience.<br/>
     * See also {@link module:lamb.unary|unary}.
     * @example
     * _.list(1, 2, 3, 4, 5) // => [1, 2, 3, 4, 5]
     * _.binary(_.list)(1, 2, 3, 4, 5) // => [1, 2]
     *
     * @memberof module:lamb
     * @category Function
     * @param {Function} fn
     * @returns {Function}
     */
    function binary (fn) {
        return function (a, b) {
            return fn(a, b);
        };
    }

    /**
     * Transforms the evaluation of the given function in the evaluation of a sequence of functions
     * expecting only one argument. Each function of the sequence is a partial application of the
     * original one, which will be applied when the specified (or derived) arity is consumed.<br/>
     * Currying will start from the leftmost argument: use {@link module:lamb.curryRight|curryRight}
     * for right currying.<br/>
     * See also {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
     * and {@link module:lamb.partial|partial}.
     * @example
     * var multiplyBy = _.curry(_.multiply);
     * var multiplyBy10 = multiplyBy(10);
     *
     * multiplyBy10(5) // => 50
     * multiplyBy10()(5) // => 50
     * multiplyBy10()()(2) // => 20
     *
     * @memberof module:lamb
     * @category Function
     * @param {Function} fn
     * @param {Number} [arity=fn.length]
     * @returns {Function}
     */
    function curry (fn, arity) {
        return _curry(fn, arity, false);
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
     * @param {Function} fn
     * @param {Number} [arity=fn.length]
     * @returns {Function}
     */
    function curryRight (fn, arity) {
        return _curry(fn, arity, true);
    }

    /**
     * Builds an auto-curried function. The resulting function can be called multiple times with
     * any number of arguments, and the original function will be applied only when the specified
     * (or derived) arity is consumed.<br/>
     * Currying will start from the leftmost argument: use {@link module:lamb.curryableRight|curryableRight}
     * for right currying.<br/>
     * Note that you can pass undefined values as arguments explicitly, if you are so inclined, but empty
     * calls doesn't consume the arity.<br/>
     * See also {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight} and
     * {@link module:lamb.partial|partial}.
     * @example
     * var collectFourElements = _.curryable(_.list, 4);
     *
     * collectFourElements(2)(3)(4)(5) // => [2, 3, 4, 5]
     * collectFourElements(2)(3, 4)(5) // => [2, 3, 4, 5]
     * collectFourElements(2, 3, 4, 5) // => [2, 3, 4, 5]
     * collectFourElements()(2)()(3, 4, 5) // => [2, 3, 4, 5]
     *
     * @memberof module:lamb
     * @category Function
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
     * collectFourElements()(2)()(3, 4, 5) // => [5, 4, 3, 2]
     *
     * @memberof module:lamb
     * @category Function
     * @param {Function} fn
     * @param {Number} [arity=fn.length]
     * @returns {Function}
     */
    function curryableRight (fn, arity) {
        return _curry(fn, arity, true, true);
    }

    /**
     * Returns a function that will execute the given function only if it stops being called for the specified timespan.<br/>
     * See also {@link module:lamb.throttle|throttle} for a different behaviour where the first call happens immediately.
     * @example <caption>A common use case of <code>debounce</code> in a browser environment</caption>
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
     * @param {Function} fn
     * @param {Number} timespan - Expressed in milliseconds
     * @returns {Function}
     */
    function debounce (fn, timespan) {
        var timeoutID;

        return function () {
            var context = this;
            var args = arguments;
            var debounced = function () {
                timeoutID = null;
                fn.apply(context, args);
            };

            clearTimeout(timeoutID);
            timeoutID = setTimeout(debounced, timespan);
        };
    }

    /**
     * Returns a function that applies its arguments to the original function in reverse order.
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
            var args = slice(arguments).reverse();
            return fn.apply(this, args);
        };
    }

    /**
     * Accepts an object and builds a function expecting a method name, and optionally arguments, to call on such object.
     * Like {@link module:lamb.invoker|invoker}, if no method with the given name is found the function will return <code>undfined</code>.
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
        return function (methodName) {
            var args = slice(arguments, 1);
            var method = target[methodName];
            return type(method) === "Function" ? method.apply(target, args) : void 0;
        };
    }

    /**
     * Builds a function that will invoke the given method name on any received object and return
     * the result. If no method with such name is found the function will return <code>undefined</code>.
     * Along with the method name it's possible to supply some arguments that will be bound to the method call.<br/>
     * Further arguments can also be passed when the function is actually called, and they will be concatenated
     * to the bound ones.<br/>
     * If different objects share a method name it's possible to build polymorphic functions as you can see in
     * the example below.<br/>
     * {@link module:lamb.condition|Condition} can be used to wrap <code>invoker</code> to avoid this behaviour
     * by adding a predicate, while {@link module:lamb.adapter|adapter} can build more complex polymorphic functions
     * without the need of homonymy.<br/>
     * Returning <code>undefined</code> or checking for such value is meant to favor composition and interoperability
     * between the aforementioned functions: for a more standard behaviour see also {@link module:lamb.generic|generic}.
     * See also {@link module:lamb.invokerOn|invokerOn}.
     * @example <caption>Basic polymorphism with <code>invoker</code></caption>
     * var polySlice = _.invoker("slice");
     *
     * polySlice([1, 2, 3, 4, 5], 1, 3) // => [2, 3]
     * polySlice("Hello world", 1, 3) // => "el"
     *
     * @example <caption>With bound arguments</caption>
     * var substrFrom2 = _.invoker("substr", 2);
     * substrFrom2("Hello world") // => "llo world"
     * substrFrom2("Hello world", 5) // => "llo w"
     *
     * @memberof module:lamb
     * @category Function
     * @param {String} methodName
     * @param {...*} [boundArg]
     * @returns {Function}
     */
    function invoker (methodName) {
        var boundArgs = slice(arguments, 1);

        return function (target) {
            var args = slice(arguments, 1);
            var method = target[methodName];
            return type(method) === "Function" ? method.apply(target, boundArgs.concat(args)) : void 0;
        };
    }

    /**
     * Builds a function that allows to map over the received arguments before applying them to the original one.
     * @example
     * var sumArray = _.invoker("reduce", _.add);
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
     * @param {Function} fn
     * @param {ListIteratorCallback} mapper
     * @returns {Function}
     */
    function mapArgs (fn, mapper) {
        return compose(partial(apply, fn), mapWith(mapper), list);
    }

    /**
     * Creates a pipeline of functions, where each function consumes the result of the previous one.<br/>
     * See also {@link module:lamb.compose|compose}.
     * @example
     * var square = _.partial(Math.pow, _, 2);
     * var getMaxAndSquare = _.pipe(Math.max, square);
     *
     * getMaxAndSquare(3, 5) // => 25
     *
     * @memberof module:lamb
     * @category Function
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
     * @param {Function} fn
     * @param {...?Function} [tapper]
     * @returns {Function}
     */
    function tapArgs (fn) {
        var readers = slice(arguments, 1);

        return function () {
            var len = arguments.length;
            var args = [];

            for (var i = 0; i < len; i++) {
                args.push(readers[i] ? readers[i](arguments[i]) : arguments[i]);
            }

            return fn.apply(this, args);
        };
    }

    /**
     * Returns a function that will invoke the passed function at most once in the given timespan.<br/>
     * The first call in this case happens as soon as the function is invoked; see also {@link module:lamb.debounce|debounce}
     * for a different behaviour where the first call is delayed.
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
     * exposed for convenience.<br/>
     * See also {@link module:lamb.binary|binary}.
     * @example
     * var weights = ["2 Kg", "10 Kg", "1 Kg", "7 Kg"];
     *
     * weights.map(_.unary(parseInt)) // => [2, 10, 1, 7]
     *
     * @memberof module:lamb
     * @category Function
     * @param {Function} fn
     * @returns {Function}
     */
    function unary (fn) {
        return function (a) {
            return fn(a);
        };
    }

    /**
     * Wraps the function <code>fn</code> inside a <code>wrapper</code> function.<br/>
     * This allows to conditionally execute <code>fn</code>, to tamper with its arguments or return value
     * and to run code before and after its execution.<br/>
     * Being this nothing more than a "{@link module:lamb.flip|flipped}" [partial application]{@link module:lamb.partial},
     * you can also easily build new functions from existent ones.
     * @example
     * var arrayMax = _.wrap(Math.max, _.apply);
     *
     * arrayMax([4, 5, 2, 6, 1]) // => 6
     *
     * @memberof module:lamb
     * @category Function
     * @function
     * @param {Function} fn
     * @param {Function} wrapper
     * @returns {Function}
     */
    var wrap = binary(flip(partial));

    lamb.apply = apply;
    lamb.applyArgs = applyArgs;
    lamb.aritize = aritize;
    lamb.binary = binary;
    lamb.curry = curry;
    lamb.curryRight = curryRight;
    lamb.curryable = curryable;
    lamb.curryableRight = curryableRight;
    lamb.debounce = debounce;
    lamb.flip = flip;
    lamb.invokerOn = invokerOn;
    lamb.invoker = invoker;
    lamb.mapArgs = mapArgs;
    lamb.pipe = pipe;
    lamb.tapArgs = tapArgs;
    lamb.throttle = throttle;
    lamb.unary = unary;
    lamb.wrap = wrap;


    /**
     * Accepts a series of functions and builds a function that applies the received arguments to each one and
     * returns the first non <code>undefined</code> value.<br/>
     * Meant to work in sinergy with {@link module:lamb.condition|condition} and {@link module:lamb.invoker|invoker},
     * can be useful as a strategy pattern for functions, to mimic conditional logic and also to build polymorphic functions.
     * @example
     * var isEven = function (n) { return n % 2 === 0; };
     * var filterString = _.compose(_.invoker("join", ""), _.filter);
     * var filterAdapter = _.adapter(
     *     _.invoker("filter"),
     *     _.condition(_.isType("String"), filterString)
     * );
     *
     * filterAdapter([1, 2, 3, 4, 5, 6], isEven)) // => [2, 4, 6]
     * filterAdapter("123456", isEven)) // => "246"
     * filterAdapter({}, isEven)) // => undefined
     *
     * // obviously it's composable
     * var filterWithDefault = _.adapter(filterAdapter, _.always("Not implemented"));
     *
     * filterWithDefault([1, 2, 3, 4, 5, 6], isEven)) // => [2, 4, 6]
     * filterWithDefault("123456", isEven)) // => "246"
     * filterWithDefault({}, isEven)) // => "Not implemented"
     *
     * @memberof module:lamb
     * @category Logic
     * @param {...Function} fn
     * @returns {Function}
     */
    function adapter () {
        var functions = slice(arguments);

        return function () {
            var len = functions.length;
            var result;

            for (var i = 0; i < len; i++) {
                result = apply(functions[i], arguments);

                if (!isUndefined(result)) {
                    break;
                }
            }

            return result;
        };
    }

    /**
     * Builds a predicate that returns true if all the given predicates are satisfied.
     * The arguments passed to the resulting function are applied to every predicate unless one of them returns false.
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
     * @param {...Function} predicate
     * @returns {Function}
     */
    function allOf () {
        var predicates = slice(arguments);

        return function () {
            var args = arguments;

            return predicates.every(function (predicate) {
                return predicate.apply(null, args);
            });
        };
    }

    /**
     * Builds a predicate that returns true if at least one of the given predicates is satisfied.
     * The arguments passed to the resulting function are applied to every predicate until one of them returns true.
     * @example
     * // Lamb's "isNil" is actually implemented like this
     * var isNil = _.anyOf(_.isNull, _.isUndefined);
     *
     * isNil(NaN) // => false
     * isNil({}) // => false
     * isNil(null) // => true
     * isNil(void 0) // => true
     * isNil() // => true
     *
     * @memberof module:lamb
     * @category Logic
     * @param {...Function} predicate
     * @returns {Function}
     */
    function anyOf () {
        var predicates = slice(arguments);

        return function () {
            var args = arguments;

            return predicates.some(function (predicate) {
                return predicate.apply(null, args);
            });
        };
    }

    /**
     * Builds a function that will apply the received arguments to <code>trueFn</code>, if the predicate is satisfied with
     * the same arguments, or to <code>falseFn</code> otherwise.<br/>
     * If <code>falseFn</code> isn't provided and the predicate isn't satisfied the function will return <code>undefined</code>.<br/>
     * Although you can use other <code>condition</code>s as <code>trueFn</code> or <code>falseFn</code>, it's probably better to
     * use {@link module:lamb.adapter|adapter} to build more complex behaviours.
     * @example
     * var isEven = function (n) { return n % 2 === 0};
     * var halve = function (n) { return n / 2; };
     * var halveIfEven = _.condition(isEven, halve, _.identity);
     *
     * halveIfEven(5) // => 5
     * halveIfEven(6) // => 3
     *
     * @memberof module:lamb
     * @category Logic
     * @see {@link module:lamb.invoker|invoker}
     * @param {Function} predicate
     * @param {Function} trueFn
     * @param {Function} [falseFn]
     * @returns {Function}
     */
    function condition (predicate, trueFn, falseFn) {
        return function () {
            var applyArgsTo = applyArgs(arguments);
            return applyArgsTo(predicate) ? applyArgsTo(trueFn) : falseFn ? applyArgsTo(falseFn) : void 0;
        };
    }

    /**
     * Verifies that the two supplied values are the same value using the "SameValue" comparison.<br/>
     * Note that this doesn't behave as the strict equality operator, but rather as a shim of ES6's
     * [Object.is]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is}.
     * Differences are that <code>0</code> and <code>-0</code> aren't the same value and, finally, <code>NaN</code> is equal to itself.<br/>
     * See also {@link module:lamb.isSVZ|isSVZ} which performs the check using the "SameValueZero" comparison.
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
     * @see [SameValue comparison]{@link https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevalue}
     * @see [SameValueZero comparison]{@link https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero}
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
     * _.isGT(today, pastDate) // true
     * _.isGT(pastDate, today) // false
     * _.isGT(3, 4) // false
     * _.isGT(3, 3) // false
     * _.isGT(3, 2) // true
     * _.isGT(0, -0) // false
     * _.isGT(-0, 0) // false
     * _.isGT("a", "A") // true
     * _.isGT("b", "a") // true
     *
     * @memberof module:lamb
     * @category Logic
     * @param {Number|String|Date|Boolean} a
     * @param {Number|String|Date|Boolean} b
     * @returns {Boolean}
     */
    function isGT (a, b) {
        return a > b;
    }

    /**
     * Verifies that the first given value is greater than or equal to the second.
     * Regarding equality, beware that this is simply a wrapper for the native operator, so <code>-0 === 0</code>.
     * @example
     * _.isGTE(3, 4) // false
     * _.isGTE(3, 3) // true
     * _.isGTE(3, 2) // true
     * _.isGTE(0, -0) // true
     * _.isGTE(-0, 0) // true
     *
     * @memberof module:lamb
     * @category Logic
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
     * _.isLT(today, pastDate) // false
     * _.isLT(pastDate, today) // true
     * _.isLT(3, 4) // true
     * _.isLT(3, 3) // false
     * _.isLT(3, 2) // false
     * _.isLT(0, -0) // false
     * _.isLT(-0, 0) // false
     * _.isLT("a", "A") // false
     * _.isLT("a", "b") // true
     *
     * @memberof module:lamb
     * @category Logic
     * @param {Number|String|Date|Boolean} a
     * @param {Number|String|Date|Boolean} b
     * @returns {Boolean}
     */
    function isLT (a, b) {
        return a < b;
    }

    /**
     * Verifies that the first given value is less than or equal to the second.
     * Regarding equality, beware that this is simply a wrapper for the native operator, so <code>-0 === 0</code>.
     * @example
     * _.isLTE(3, 4) // true
     * _.isLTE(3, 3) // true
     * _.isLTE(3, 2) // false
     * _.isLTE(0, -0) // true
     * _.isLTE(-0, 0) // true
     *
     * @memberof module:lamb
     * @category Logic
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
     * @param {*} valueA
     * @param {*} valueB
     * @returns {Boolean}
     */
    var isNot = not(is);

    /**
     * Verifies that the two supplied values are the same value using the "SameValueZero" comparison.<br/>
     * With this comparison <code>NaN</code> is equal to itself, but <code>0</code> and <code>-0</code> are
     * considered the same value too.<br/>
     * See also {@link module:lamb.is|is} to perform a "SameValue" comparison.
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
     * @see [SameValue comparison]{@link https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevalue}
     * @see [SameValueZero comparison]{@link https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero}
     * @param {*} a
     * @param {*} b
     * @returns {Boolean}
     */
    function isSVZ (a, b) {
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
            return !predicate.apply(null, arguments);
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
     * "Clamps" a number within the given limits.
     * @example
     * _.clamp(-5, 0, 10) // => 0
     * _.clamp(5, 0, 10) // => 5
     * _.clamp(15, 0, 10) // => 10
     *
     * @memberof module:lamb
     * @category Math
     * @param {Number} n
     * @param {Number} min
     * @param {Number} max
     * @returns {Number}
     */
    function clamp (n, min, max) {
        return n < min ? min : n > max ? max : n;
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
     * Performs the modulo operation and should not be confused with the {@link module:lamb.remainder|remainder}.
     * The function performs a floored division to calculate the result and not a truncated one, hence the sign of
     * the dividend is not kept, unlike the {@link module:lamb.remainder|remainder}.
     * @example
     * _.modulo(5, 3) // => 2
     * _.remainder(5, 3) // => 2
     *
     * _.modulo(-5, 3) // => 1
     * _.remainder(-5, 3) // => -2
     *
     * @memberof module:lamb
     * @category Math
     * @see {@link http://en.wikipedia.org/wiki/Modulo_operation}
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
        return sequence(start, len, partial(add, step));
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
     * @see {@link http://en.wikipedia.org/wiki/Modulo_operation}
     * @param {Number} a
     * @param {Number} b
     * @returns {Number}
     */
    function remainder (a, b) {
        return a % b;
    }

    /**
     * Generates a sequence of values of the desired length with the provided iteratee.
     * The values being iterated, and received by the iteratee, are the results generated so far.
     * @example
     * var fibonacci = function (n, idx, list) {
     *     return n + (list[idx - 1] || 0);
     * };
     *
     * _.sequence(1, 10, fibonacci) // => [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
     *
     * @memberof module:lamb
     * @category Math
     * @param {*} start - The starting value
     * @param {Number} len - The desired length for the sequence
     * @param {ListIteratorCallback} iteratee
     * @param {Object} [iterateeContext]
     * @returns {Array}
     */
    function sequence (start, len, iteratee, iterateeContext) {
        var result = [start];

        for (var i = 0, limit = len - 1; i < limit; i++) {
            result.push(iteratee.call(iterateeContext, result[i], i, result));
        }

        return result;
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
    lamb.divide = divide;
    lamb.modulo = modulo;
    lamb.multiply = multiply;
    lamb.randomInt = randomInt;
    lamb.range = range;
    lamb.remainder = remainder;
    lamb.sequence = sequence;
    lamb.subtract = subtract;


    function _immutable (obj, seen) {
        if (seen.indexOf(obj) === -1) {
            seen.push(Object.freeze(obj));

            Object.getOwnPropertyNames(obj).forEach(function (key) {
                var value = obj[key];

                if (typeof value === "object" && !isNull(value)) {
                    _immutable(value, seen);
                }
            });
        }

        return obj;
    }

    function _keyToPair (key) {
        return [key, this[key]];
    }

    function _merge (getKeys) {
        return reduce(slice(arguments, 1), function (result, source) {
            forEach(getKeys(source), function (key) {
                result[key] = source[key];
            });

            return result;
        }, {});
    }

    var _pairsFrom = _curry(function (getKeys, obj) {
        return getKeys(obj).map(_keyToPair, obj);
    });

    var _tearFrom = _curry(function  (getKeys, obj) {
        return getKeys(obj).reduce(function (result, key) {
            result[0].push(key);
            result[1].push(obj[key]);
            return result;
        }, [[], []]);
    });

    var _valuesFrom = _curry(function (getKeys, obj) {
        return getKeys(obj).map(partial(get, obj));
    });

    /**
     * Builds a <code>checker</code> function meant to be used with {@link module:lamb.validate|validate}.<br/>
     * Note that the function accepts multiple <code>keyPaths</code> as a means to compare their values. In
     * other words all the received <code>keyPaths</code> will be passed as arguments to the <code>predicate</code>
     * to run the test.<br/>
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
     * user.login.passwordConfirm = "avc123";
     *
     * pwdMatch(user) // => ["Passwords don't match", ["login.password", "login.passwordConfirm"]]
     *
     * @memberof module:lamb
     * @category Object
     * @param {Function} predicate - The predicate to test the object properties
     * @param {String} message - The error message
     * @param {String[]} keyPaths - The array of property names, or {@link module:lamb.getWithPath|paths}, to test.
     * @param {String} [pathSeparator="."]
     * @returns {Array<String, String[]>} An error in the form <code>["message", ["propertyA", "propertyB"]]</code> or an empty array.
     */
    function checker (predicate, message, keyPaths, pathSeparator) {
        return function (obj) {
            var getValues = partial(getWithPath, obj, _, pathSeparator);
            return predicate.apply(obj, keyPaths.map(getValues)) ? [] : [message, keyPaths];
        };
    }

    /**
     * Creates an array with all the enumerable properties of the given object.
     * @example <caption>showing the difference with <code>Object.keys</code></caption>
     * var baseFoo = Object.create({a: 1}, {b: {value: 2}});
     * var foo = Object.create(baseFoo, {
     *     c: {value: 3},
     *     d: {value: 4, enumerable: true}
     * });
     *
     * Object.keys(foo) // => ["d"]
     * _.enumerables(foo) // => ["d", "a"]
     *
     * @memberof module:lamb
     * @category Object
     * @param {Object} obj
     * @returns {String[]}
     */
    function enumerables (obj) {
        var keys = [];

        for (var key in obj) {
            keys.push(key);
        }

        return keys;
    }

    /**
     * Builds an object from a list of key / value pairs like the one
     * returned by [pairs]{@link module:lamb.pairs} or {@link module:lamb.ownPairs|ownPairs}.<br/>
     * In case of duplicate keys the last key / value pair is used.
     * @example
     * _.fromPairs([["a", 1], ["b", 2], ["c", 3]]) // => {"a": 1, "b": 2, "c": 3}
     * _.fromPairs([["a", 1], ["b", 2], ["a", 3]]) // => {"a": 3, "b": 2}
     * _.fromPairs([[1], [void 0, 2], [null, 3]]) // => {"1": undefined, "undefined": 2, "null": 3}
     *
     * @memberof module:lamb
     * @category Object
     * @param {Array<Array<String, *>>} pairsList
     * @returns {Object}
     */
    function fromPairs (pairsList) {
        var result = {};

        pairsList.forEach(function (pair) {
            result[pair[0]] = pair[1];
        });

        return result;
    }

    /**
     * Returns the value of the object property with the given key.
     * @example
     * var user {name: "John"};
     *
     * _.get(user, "name") // => "John";
     * _.get(user, "surname") // => undefined
     *
     * @memberof module:lamb
     * @category Object
     * @param {Object} obj
     * @param {String} key
     * @returns {*}
     */
    function get (obj, key) {
        return obj[key];
    }

    /**
     * A curried version of {@link module:lamb.get|get}.<br/>
     * Receives a property name and builds a function expecting the object from which we want to retrieve the property.
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
     * @param {String} key
     * @returns {Function}
     */
    var getKey = _curry(get, 2, true);

    /**
     * Gets a nested property value from an object using the given path.<br/>
     * The path is a string with property names separated by dots by default, but
     * it can be customised with the optional third parameter.
     * @example
     * var user = {
     *     name: "John",
     *     surname: "Doe",
     *     login: {
     *         "user.name": "jdoe",
     *         password: "abc123"
     *     }
     * };
     *
     * // same as _.get if no path is involved
     * _.getWithPath(user, "name") // => "John"
     *
     * _.getWithPath(user, "login.password") // => "abc123";
     * _.getWithPath(user, "login/user.name", "/") // => "jdoe"
     * _.getWithPath(user, "name.foo") // => undefined
     * _.getWithPath(user, "name.foo.bar") // => throws a TypeError
     *
     * @memberof module:lamb
     * @category Object
     * @param {Object|ArrayLike} obj
     * @param {String} path
     * @param {String} [separator="."]
     * @returns {*}
     */
    function getWithPath (obj, path, separator) {
        return path.split(separator || ".").reduce(get, obj);
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
     * @param {Object} obj
     * @param {String} key
     * @returns {Boolean}
     */
    function has (obj, key) {
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
     * @param {String} key
     * @returns {Function}
     */
    var hasKey = _curry(has, 2, true);

    /**
     * Builds a function expecting an object to check against the given key / value pair.
     * @example
     * var hasTheCorrectAnswer = _.hasKeyValue("answer", 42);
     *
     * hasTheCorrectAnswer({answer: 2}) // false
     * hasTheCorrectAnswer({answer: 42}) // true
     *
     * @memberof module:lamb
     * @category Object
     * @function
     * @param {String} key
     * @param {*} value
     * @returns {Function}
     */
    var hasKeyValue = function (key, value) {
        return compose(partial(is, value), getKey(key));
    };

    /**
     * Verifies if an object has the specified property and that the property isn't inherited through
     * the prototype chain.<br/>
     * @example <caption>Comparison with <code>has</code>.</caption>
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
     * @function
     * @param {String} key
     * @returns {Function}
     */
    var hasOwnKey = _curry(hasOwn, 2, true);

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
     * // Any of these statements will fail and possibly
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
     * Builds an object from the two given lists, using the first one as keys and the last one as values.<br/>
     * If the list of keys is longer than the values one, the keys will be created with <code>undefined</code> values.<br/>
     * If more values than keys are supplied, the extra values will be ignored.<br/>
     * See also {@link module:lamb.tear|tear} and {@link module:lamb.tearOwn|tearOwn} for the reverse operation.
     * @example
     * _.make(["a", "b", "c"], [1, 2, 3]) // => {a: 1, b: 2, c: 3}
     * _.make(["a", "b", "c"], [1, 2]) // => {a: 1, b: 2, c: undefined}
     * _.make(["a", "b"], [1, 2, 3]) // => {a: 1, b: 2}
     * _.make([null, void 0, 2], [1, 2, 3]) // => {"null": 1, "undefined": 2, "2": 3}
     *
     * @memberof module:lamb
     * @category Object
     * @param {String[]} keys
     * @param {Array} values
     * @returns {Object}
     */
    function make (keys, values) {
        var result = {};
        var valuesLen = values.length;

        for (var i = 0, len = keys.length; i < len; i++) {
            result[keys[i]] = i < valuesLen ? values[i] : void 0;
        }

        return result;
    }

    /**
     * Merges the enumerable properties of the provided sources into a new object.<br/>
     * In case of key homonymy each source has precedence over the previous one.<br/>
     * See also {@link module:lamb.mergeOwn|mergeOwn} for merging only own properties of
     * the given sources.
     * @example
     * _.merge({a: 1}, {b: 3, c: 4}, {b: 5}) // => {a: 1, b: 5, c: 4}
     *
     * @memberof module:lamb
     * @category Object
     * @function
     * @param {...Object} source
     * @returns {Object}
     */
    var merge = partial(_merge, enumerables);

    /**
     * Same as {@link module:lamb.merge|merge}, but only the own properties of the sources are taken into account.
     * @example <caption>showing the difference with <code>merge</code></caption>
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
     *
     * @memberof module:lamb
     * @category Object
     * @function
     * @param {...Object} source
     * @returns {Object}
     */
    var mergeOwn = partial(_merge, Object.keys);

    /**
     * Same as {@link module:lamb.pairs|pairs}, but only the own enumerable properties of the object are
     * taken into account.<br/>
     * See also {@link module:lamb.fromPairs|fromPairs} for the reverse operation.
     * @example <caption>showing the difference with <code>pairs</code></caption>
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
     * @param {Object} obj
     * @returns {Array<Array<String, *>>}
     */
    var ownPairs = _pairsFrom(Object.keys);

    /**
     * Same as {@link module:lamb.values|values}, but only the own enumerable properties of the object are
     * taken into account.<br/>
     * @example <caption>showing the difference with <code>values</code></caption>
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
     * @param {Object} obj
     * @returns {Array}
     */
    var ownValues = _valuesFrom(Object.keys);

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
     * @param {Object} obj
     * @returns {Array<Array<String, *>>}
     */
    var pairs = _pairsFrom(enumerables);

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
     * @param {Object} source
     * @param {String[]} whitelist
     * @returns {Object}
     */
    function pick (source, whitelist) {
        var result = {};

        whitelist.forEach(function (key) {
            if (key in source) {
                result[key] = source[key];
            }
        });

        return result;
    }

    /**
     * Builds a function expecting an object whose properties will be checked against the given predicate.<br/>
     * The properties satisfying the predicate will be included in the resulting object.
     * @example
     * var user = {name: "john", surname: "doe", age: 30};
     * var pickIfIsString = _.pickIf(_.isType("String"));
     *
     * pickIfIsString(user) // => {name: "john", surname: "doe"}
     *
     * @memberof module:lamb
     * @category Object
     * @param {ObjectIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Function}
     */
    function pickIf (predicate, predicateContext) {
        return function (source) {
            var result = {};

            for (var key in source) {
                if (predicate.call(predicateContext, source[key], key, source)) {
                    result[key] = source[key];
                }
            }

            return result;
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
     * @param {Object} source
     * @param {String[]} blacklist
     * @returns {Object}
     */
    function skip (source, blacklist) {
        var result = {};

        for (var key in source) {
            if (blacklist.indexOf(key) === -1) {
                result[key] = source[key];
            }
        }

        return result;
    }

    /**
     * Builds a function expecting an object whose properties will be checked against the given predicate.<br/>
     * The properties satisfying the predicate will be omitted in the resulting object.
     * @example
     * var user = {name: "john", surname: "doe", age: 30};
     * var skipIfIstring = _.skipIf(_.isType("String"));
     *
     * skipIfIstring(user) // => {age: 30}
     *
     * @memberof module:lamb
     * @category Object
     * @param {ObjectIteratorCallback} predicate
     * @param {Object} [predicateContext]
     * @returns {Function}
     */
    function skipIf (predicate, predicateContext) {
        return pickIf(not(predicate), predicateContext);
    }

    /**
     * Tears an object apart by transforming it in an array of two lists: one containing its enumerable keys,
     * the other containing the corresponding values.<br/>
     * Although this "tearing apart" may sound as a rather violent process, the source object will be unharmed.<br/>
     * See also {@link module:lamb.tearOwn|tearOwn} for picking only the own enumerable properties and
     * {@link module:lamb.make|make} for the reverse operation.
     * @example
     * _.tear({a: 1, b: 2, c: 3}) // => [["a", "b", "c"], [1, 2, 3]]
     *
     * @memberof module:lamb
     * @category Object
     * @function
     * @param {Object} obj
     * @returns {Array<Array<String>, Array<*>>}
     */
    var tear = _tearFrom(enumerables);

    /**
     * Same as {@link module:lamb.tear|tear}, but only the own properties of the object are taken into account.<br/>
     * See also {@link module:lamb.make|make} for the reverse operation.
     * @example <caption>showing the difference with <code>tear</code></caption>
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
     * @param {Object} obj
     * @returns {Array<Array<String>, Array<*>>}
     */
    var tearOwn = _tearFrom(Object.keys);

    /**
     * Validates an object with the given list of {@link module:lamb.checker|checker} functions.
     * @example
     * var hasContent = function (s) { return s.trim().length > 0; };
     * var isAdult = function (age) { return age >= 18; };
     * var userCheckers = [
     *     _.checker(hasContent, "Name is required", ["name"]),
     *     _.checker(hasContent, "Surname is required", ["surname"]),
     *     _.checker(isAdult, "Must be at least 18 years old", ["age"])
     * ];
     *
     * var user1 = {name: "john", surname: "doe", age: 30};
     * var user2 = {name: "jane", surname: "", age: 15};
     *
     * _.validate(user1, userCheckers) // => []
     * _.validate(user2, userCheckers) // => [["Surname is required", ["surname"]], ["Must be at least 18 years old", ["age"]]]
     *
     * @memberof module:lamb
     * @category Object
     * @param {Object} obj
     * @param {Function[]} checkers
     * @returns {Array<Array<String, String[]>>} An array of errors in the form returned by {@link module:lamb.checker|checker}, or an empty array.
     */
    function validate (obj, checkers) {
        return checkers.reduce(function (errors, checker) {
            var result = checker(obj);
            result.length && errors.push(result);
            return errors;
        }, []);
    }

    /**
     * A curried version of {@link module:lamb.validate|validate} accepting a list of {@link module:lamb.checker|checkers} and
     * returning a function expecting the object to validate.
     * @example
     * var hasContent = function (s) { return s.trim().length > 0; };
     * var isAdult = function (age) { return age >= 18; };
     * var userCheckers = [
     *     _.checker(hasContent, "Name is required", ["name"]),
     *     _.checker(hasContent, "Surname is required", ["surname"]),
     *     _.checker(isAdult, "Must be at least 18 years old", ["age"])
     * ];
     * var validateUser = _.validateWith(userCheckers);
     *
     * var user1 = {name: "john", surname: "doe", age: 30};
     * var user2 = {name: "jane", surname: "", age: 15};
     *
     * validateUser(user1) // => []
     * validateUser(user2) // => [["Surname is required", ["surname"]], ["Must be at least 18 years old", ["age"]]]
     *
     * @memberof module:lamb
     * @category Object
     * @function
     * @param {Function[]} checkers
     * @returns {Function}
     */
    var validateWith = _curry(validate, 2, true);

    /**
     * Generates an array with the values of the enumerable properties of the given object.<br/>
     * See also {@link module:lamb.ownValues|ownValues} for picking only the own properties of the object.
     * @example
     * var user = {name: "john", surname: "doe", age: 30};
     *
     * _.values(user) // => ["john", "doe", 30]
     *
     * @memberof module:lamb
     * @category Object
     * @function
     * @param {Object} obj
     * @returns {Array}
     */
    var values = _valuesFrom(enumerables);

    lamb.checker = checker;
    lamb.enumerables = enumerables;
    lamb.fromPairs = fromPairs;
    lamb.get = get;
    lamb.getKey = getKey;
    lamb.getWithPath = getWithPath;
    lamb.has = has;
    lamb.hasKey = hasKey;
    lamb.hasKeyValue = hasKeyValue;
    lamb.hasOwn = hasOwn;
    lamb.hasOwnKey = hasOwnKey;
    lamb.immutable = immutable;
    lamb.make = make;
    lamb.merge = merge;
    lamb.mergeOwn = mergeOwn;
    lamb.ownPairs = ownPairs;
    lamb.ownValues = ownValues;
    lamb.pairs = pairs;
    lamb.pick = pick;
    lamb.pickIf = pickIf;
    lamb.skip = skip;
    lamb.skipIf = skipIf;
    lamb.tear = tear;
    lamb.tearOwn = tearOwn;
    lamb.validate = validate;
    lamb.validateWith = validateWith;
    lamb.values = values;


    function _getPadding (source, char, len) {
        return repeat(char[0] || " ", Math.ceil(len - source.length));
    }

    /**
     * Pads a string to the desired length with the given char starting from the beginning of the string.
     * @example
     * _.padLeft("foo", "-", 0) // => "foo"
     * _.padLeft("foo", "-", -1) // => "foo"
     * _.padLeft("foo", "-", 5) // => "--foo"
     * _.padLeft("foo", "-", 3) // => "foo"
     * _.padLeft("foo", "ab", 7) // => "aaaafoo"
     * _.padLeft("foo", "", 5) // => "  foo"
     * _.padLeft("", "-", 5) // => "-----"
     *
     * @memberof module:lamb
     * @category String
     * @param {String} source
     * @param {String} [char=" "] - The padding char. If a string is passed only the first char is used.
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
     * _.padRight("foo", "", 5) // => "foo  "
     * _.padRight("", "-", 5) // => "-----"
     *
     * @memberof module:lamb
     * @category String
     * @param {String} source
     * @param {String} [char=" "] - The padding char. If a string is passed only the first char is used.
     * @param {Number} len
     * @returns {String}
     */
    function padRight (source, char, len) {
        return source + _getPadding(source, char, len);
    }

    /**
     * Builds a new string by repeating the source string the desired amount of times.<br/>
     * Note that unlike the current ES6 proposal for [String.prototype.repeat]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat},
     * this function doesn't throw a RangeError if <code>count</code> is negative, but returns an empty string instead.
     * @example
     * _.repeat("Hello", -1) // => ""
     * _.repeat("Hello", 1) // => "Hello"
     * _.repeat("Hello", 3) // => "HelloHelloHello"
     *
     * @memberof module:lamb
     * @category String
     * @param {String} source
     * @param {Number} count
     * @returns {String}
     */
    function repeat (source, count) {
        var result = "";

        for (var i = 0; i < count; i++) {
            result += source;
        }

        return result;
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
        return _reProto.test.bind(pattern);
    }

    lamb.padLeft = padLeft;
    lamb.padRight = padRight;
    lamb.repeat = repeat;
    lamb.testWith = testWith;


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
     * @function
     * @param {*} value
     * @returns {Boolean}
     */
    var isNil = anyOf(isNull, isUndefined);

    /**
     * Verifies if a value is <code>null</code>.
     * @example
     * _.isNull(null) // => true
     * _.isNull(void 0) // => false
     * _.isNull(false) // => false
     *
     * @memberof module:lamb
     * @category Type
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
     * @param {String} typeTag
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
     * @param {*} value
     * @returns {Boolean}
     */
    function isUndefined (value) {
        // using void because undefined could be theoretically shadowed
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
     * @param {*} value
     * @returns {String}
     */
    function type (value) {
        return _objectProto.toString.call(value).replace(/^\[\w+\s+|\]$/g, "");
    }

    lamb.isNil = isNil;
    lamb.isNull = isNull;
    lamb.isType = isType;
    lamb.isUndefined = isUndefined;
    lamb.type = type;

    /* istanbul ignore next */
    if (typeof exports === "object") {
        module.exports = lamb;
    } else if (typeof define === "function" && define.amd) {
        define(function() { return lamb; });
    } else {
        host.lamb = lamb;
    }
}(this);

/**
 * @callback AccumulatorCallback
 * @global
 * @param {*} previousValue The value returned it the last execution of the accumulator or, in the first iteration, the {@link module:lamb.reduce|initialValue} if supplied.
 * @param {*} currentValue The value being processed in the current iteration.
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
 * Represent a sorting criteria used by {@link module:lamb.insert|insert}, {@link module:lamb.sort|sort} and {@link module:lamb.sortWith|sortWith},
 * and it's usually built using {@link module:lamb.sorter|sorter} and {@link module:lamb.sorterDesc|sorterDesc}.
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
