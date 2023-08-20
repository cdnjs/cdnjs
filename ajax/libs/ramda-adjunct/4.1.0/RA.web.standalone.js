(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["RA"] = factory();
	else
		root["RA"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 80928:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Y-combinator
 *
 * The Y combinator is an interesting function which only works with functional languages,
 * showing how recursion can still be done even without any variable or function declarations,
 * only functions and parameters
 *
 * @func Y
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.3.0|v2.3.0}
 * @category Function
 * @sig (a, ... -> b -> b) -> (a, ... -> b)
 * @param {Function} le Recursive function maker
 * @return {Function}
 * @see {@link http://kestas.kuliukas.com/YCombinatorExplained/|Y combinator explained}
 * @example
 *
 * const makeFact = givenFact => (n) => {
 *   if (n < 2) { return 1 }
 *   return n * givenFact(n - 1);
 * };
 *
 * const factorial = RA.Y(makeFact);
 *
 * factorial(5); //=> 120
 */

var Y = (0, _ramda.curryN)(1, function (le) {
  return function (f) {
    return f(f);
  }(function (g) {
    return le(function (x) {
      return g(g)(x);
    });
  });
});
var _default = Y;
exports["default"] = _default;

/***/ }),

/***/ 89303:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _lengthLte = _interopRequireDefault(__webpack_require__(42385));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Original idea for this function was conceived by https://github.com/jackmellis
// in https://github.com/char0n/ramda-adjunct/pull/513.
/**
 * Returns true if all items in the list are equivalent using `R.equals` for equality comparisons.
 *
 * @func allEqual
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.9.0|v2.9.0}
 * @category List
 * @sig [a] -> Boolean
 * @param {Array} list The list of values
 * @return {boolean}
 * @see {@link https://ramdajs.com/docs/#equals|equals}
 * @example
 *
 * RA.allEqual([ 1, 2, 3, 4 ]); //=> false
 * RA.allEqual([ 1, 1, 1, 1 ]); //=> true
 * RA.allEqual([]); //=> true
 *
 */
var allEqual = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.uniq, (0, _lengthLte["default"])(1)));
var _default = allEqual;
exports["default"] = _default;

/***/ }),

/***/ 76228:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns true if all items in the list are equivalent to user provided value using `R.equals` for equality comparisons.
 *
 * @func allEqualTo
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.11.0|v2.11.0}
 * @category List
 * @sig a -> [b] -> Boolean
 * @param {*} val User provided value to check the `list` against
 * @param {Array} list The list of values
 * @return {boolean}
 * @see {@link RA.allEqual|allEqual}, {@link https://ramdajs.com/docs/#equals|equals}
 * @example
 *
 * RA.allEqualTo(1, [ 1, 2, 3, 4 ]); //=> false
 * RA.allEqualTo(1, [ 1, 1, 1, 1 ]); //=> true
 * RA.allEqualTo({}, [ {}, {} ]); //=> true
 * RA.allEqualTo(1, []); //=> true
 *
 */
var allEqualTo = (0, _ramda.curry)(function (val, list) {
  return (0, _ramda.all)((0, _ramda.equals)(val), list);
});
var _default = allEqualTo;
exports["default"] = _default;

/***/ }),

/***/ 41845:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _lengthLte = _interopRequireDefault(__webpack_require__(42385));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Returns true if all items in the list are equivalent using `R.identical` for equality comparisons.
 *
 * @func allIdentical
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.11.0|v2.11.0}
 * @category List
 * @sig [a] -> Boolean
 * @param {Array} list The list of values
 * @return {boolean}
 * @see {@link https://ramdajs.com/docs/#identical|identical}
 * @example
 *
 * RA.allIdentical([ 1, 2, 3, 4 ]); //=> false
 * RA.allIdentical([ 1, 1, 1, 1 ]); //=> true
 * RA.allIdentical([]); //=> true
 * RA.allIdentical([ {}, {} ]); //=> false
 * RA.allIdentical([ () => {}, () => {} ]); //=> false
 */
var allIdentical = (0, _ramda.curryN)(1, (0, _ramda.pipe)((0, _ramda.uniqWith)(_ramda.identical), (0, _lengthLte["default"])(1)));
var _default = allIdentical;
exports["default"] = _default;

/***/ }),

/***/ 38333:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns true if all items in the list are equivalent to user provided value using `R.identical` for equality comparisons.
 *
 * @func allIdenticalTo
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.11.0|v2.11.0}
 * @category List
 * @sig a -> [b] -> Boolean
 * @param {*} val User provided value to check the `list` against
 * @param {Array} list The list of values
 * @return {boolean}
 * @see {@link RA.allIdentical|allIdentical}, {@link http://ramdajs.com/docs/#identical|R.identical}
 * @example
 *
 * RA.allIdenticalTo(1, [ 1, 2, 3, 4 ]); //=> false
 * RA.allIdenticalTo(1, [ 1, 1, 1, 1 ]); //=> true
 * RA.allIdenticalTo(1, []); //=> true
 * RA.allIdenticalTo({}, [ {}, {} ]); //=> false
 *
 */
var allIdenticalTo = (0, _ramda.curry)(function (val, list) {
  return (0, _ramda.all)((0, _ramda.identical)(val), list);
});
var _default = allIdenticalTo;
exports["default"] = _default;

/***/ }),

/***/ 215:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Composable shortcut for `Promise.all`.
 *
 * The `allP` method returns a single Promise that resolves when all of the promises
 * in the iterable argument have resolved or when the iterable argument contains no promises.
 * It rejects with the reason of the first promise that rejects.
 *
 * @func allP
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.3.0|v2.3.0}
 * @category Function
 * @sig [Promise a] -> Promise [a]
 * @param {Iterable.<*>} iterable An iterable object such as an Array or String
 * @return {Promise} An already resolved Promise if the iterable passed is empty. An asynchronously resolved Promise if the iterable passed contains no promises. Note, Google Chrome 58 returns an already resolved promise in this case. A pending Promise in all other cases. This returned promise is then resolved/rejected asynchronously (as soon as the stack is empty) when all the promises in the given iterable have resolved, or if any of the promises reject. See the example about "Asynchronicity or synchronicity of allP" below.
 * @see {@link RA.resolveP|resolveP}, {@link RA.rejectP|rejectP}
 * @example
 *
 * RA.allP([1, 2]); //=> Promise([1, 2])
 * RA.allP([1, Promise.resolve(2)]); //=> Promise([1, 2])
 * RA.allP([Promise.resolve(1), Promise.resolve(2)]); //=> Promise([1, 2])
 * RA.allP([1, Promise.reject(2)]); //=> Promise(2)
 */
var allP = (0, _ramda.curryN)(1, (0, _ramda.bind)(Promise.all, Promise));
var _default = allP;
exports["default"] = _default;

/***/ }),

/***/ 22081:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = exports.allSettledPPonyfill = void 0;
var _ramda = __webpack_require__(36);
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
var _Promise = _interopRequireDefault(__webpack_require__(20971));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var allSettledPPonyfill = (0, _ramda.curryN)(1, _Promise["default"]);

/**
 * Returns a promise that is fulfilled with an array of promise state snapshots,
 * but only after all the original promises have settled, i.e. become either fulfilled or rejected.
 * We say that a promise is settled if it is not pending, i.e. if it is either fulfilled or rejected.
 *
 * @func allSettledP
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.18.0|v2.18.0}
 * @category Function
 * @typedef Settlement = { status: String, value: * }
 * @sig [Promise a] -> Promise [Settlement a]
 * @param {Iterable.<*>} iterable An iterable object such as an Array or String
 * @return {Promise} Returns a promise that is fulfilled with an array of promise state snapshots
 * @see {@link RA.allP|allP}
 * @example
 *
 * RA.allSettledP([
 *   Promise.resolve(1),
 *   2,
 *   Promise.reject(3),
 * ]); //=> Promise([{ status: 'fulfilled', value: 1 }, { status: 'fulfilled', value: 2 }, { status: 'rejected', reason: 3 }])
 */
exports.allSettledPPonyfill = allSettledPPonyfill;
var allSettledP = (0, _isFunction["default"])(Promise.allSettled) ? (0, _ramda.curryN)(1, (0, _ramda.bind)(Promise.allSettled, Promise)) : allSettledPPonyfill;
var _default = allSettledP;
exports["default"] = _default;

/***/ }),

/***/ 64493:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _lengthEq = _interopRequireDefault(__webpack_require__(58481));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Returns true if all items in the list are unique. `R.equals` is used to determine equality.
 *
 * @func allUnique
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category List
 * @sig [a] -> Boolean
 * @param {Array} list The list of values
 * @return {boolean}
 * @see {@link RA.notAllUnique|notAllUnique},  {@link https://ramdajs.com/docs/#equals|equals}
 * @example
 *
 * RA.allUnique([ 1, 2, 3, 4 ]); //=> true
 * RA.allUnique([ 1, 1, 2, 3 ]); //=> false
 * RA.allUnique([]); //=> true
 *
 */
var allUnique = (0, _ramda.converge)(_lengthEq["default"], [_ramda.length, _ramda.uniq]);
var _default = allUnique;
exports["default"] = _default;

/***/ }),

/***/ 94180:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
exports.__esModule = true;
exports["default"] = exports.anyPPonyfill = void 0;
var _ramda = __webpack_require__(36);
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
var _Promise = _interopRequireWildcard(__webpack_require__(47441));
exports.AggregatedError = _Promise.AggregatedError;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var anyPPonyfill = (0, _ramda.curryN)(1, _Promise["default"]);
exports.anyPPonyfill = anyPPonyfill;
/**
 * Returns a promise that is fulfilled by the first given promise to be fulfilled,
 * or rejected with an array of rejection reasons if all of the given promises are rejected.
 *
 * @func anyP
 * @memberOf RA
 * @category Function
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @sig [Promise a] -> Promise a
 * @param {Iterable.<*>} iterable An iterable object such as an Array or String
 * @return {Promise} A promise that is fulfilled by the first given promise to be fulfilled, or rejected with an array of rejection reasons if all of the given promises are rejected
 * @see {@link RA.lastP|lastP}
 * @example
 *
 * RA.anyP([
 *   Promise.resolve(1),
 *   2,
 *   Promise.reject(3),
 * ]); //=> Promise(1)
 */
var anyP = (0, _isFunction["default"])(Promise.any) ? (0, _ramda.curryN)(1, (0, _ramda.bind)(Promise.any, Promise)) : anyPPonyfill;
var _default = anyP;
exports["default"] = _default;

/***/ }),

/***/ 1570:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns a new list containing the contents of the given list, followed by the given element.
 * Like {@link http://ramdajs.com/docs/#append|R.append} but with argument order reversed.
 *
 * @func appendFlipped
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.5.0|v2.5.0}
 * @category List
 * @sig [a] -> a -> [a]
 * @param {Array} list The list of elements to add a new item to
 * @param {*} el The element to add to the end of the new list
 * @return {Array} A new list containing the elements of the old list followed by `el`
 * @see {@link http://ramdajs.com/docs/#append|R.append}
 * @example
 *
 * RA.appendFlipped(['write', 'more'], 'tests'); //=> ['write', 'more', 'tests']
 * RA.appendFlipped([], 'tests'); //=> ['tests']
 * RA.appendFlipped(['write', 'more'], ['tests']); //=> ['write', 'more', ['tests']]
 */
var appendFlipped = (0, _ramda.flip)(_ramda.append);
var _default = appendFlipped;
exports["default"] = _default;

/***/ }),

/***/ 62341:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _list = _interopRequireDefault(__webpack_require__(55302));
var _isTruthy = _interopRequireDefault(__webpack_require__(54459));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Takes a combining predicate and a list of functions and returns a function which will map the
 * arguments it receives to the list of functions and returns the result of passing the values
 * returned from each function to the combining predicate. A combining predicate is a function that
 * combines a list of Boolean values into a single Boolean value, such as `R.any` or `R.all`. It
 * will test each value using `RA.isTruthy`, meaning the functions don't necessarily have to be
 * predicates.
 *
 * The function returned is curried to the number of functions supplied, and if called with more
 * arguments than functions, any remaining arguments are passed in to the combining predicate
 * untouched.
 *
 * @func argsPass
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.7.0|v2.7.0}
 * @category Logic
 * @sig ((* -> Boolean) -> [*] -> Boolean) -> [(* -> Boolean), ...] -> (*...) -> Boolean
 * @param {Function} combiningPredicate The predicate used to combine the values returned from the
 * list of functions
 * @param {Array} functions List of functions
 * @return {boolean} Returns the combined result of mapping arguments to functions
 * @example
 *
 * RA.argsPass(R.all, [RA.isArray, RA.isBoolean, RA.isString])([], false, 'abc') //=> true
 * RA.argsPass(R.all, [RA.isArray, RA.isBoolean, RA.isString])([], false, 1) //=> false
 * RA.argsPass(R.any, [RA.isArray, RA.isBoolean, RA.isString])({}, 1, 'abc') //=> true
 * RA.argsPass(R.any, [RA.isArray, RA.isBoolean, RA.isString])({}, 1, false) //=> false
 * RA.argsPass(R.none, [RA.isArray, RA.isBoolean, RA.isString])({}, 1, false) //=> true
 * RA.argsPass(R.none, [RA.isArray, RA.isBoolean, RA.isString])({}, 1, 'abc') //=> false
 */
var argsPass = (0, _ramda.curry)(function (combiningPredicate, predicates) {
  return (0, _ramda.useWith)((0, _ramda.compose)(combiningPredicate(_isTruthy["default"]), _list["default"]), predicates);
});
var _default = argsPass;
exports["default"] = _default;

/***/ }),

/***/ 20554:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _resolveP = _interopRequireDefault(__webpack_require__(37555));
var _rejectP = _interopRequireDefault(__webpack_require__(72197));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Takes a generator function and returns an async function.
 * The async function returned is a curried function whose arity matches that of the generator function.
 *
 * Note: This function is handy for environments that does support generators but doesn't support async/await.
 *
 * @func async
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.16.0|v2.16.0}
 * @category Function
 * @sig Promise c => (a, b, ...) -> a -> b -> ... -> c
 * @param {Function} generatorFn The generator function
 * @return {Function} Curried async function
 * @see {@link https://www.promisejs.org/generators/}
 * @example
 *
 * const asyncFn = RA.async(function* generator(val1, val2) {
 *   const a = yield Promise.resolve(val1);
 *   const b = yield Promise.resolve(val2);
 *
 *   return a + b;
 * });
 *
 * asyncFn(1, 2); //=> Promise(3)
 *
 */
var async = (0, _ramda.curryN)(1, function (generatorFn) {
  function asyncWrapper() {
    var iterator = (0, _ramda.bind)(generatorFn, this).apply(void 0, arguments);
    var handle = function handle(result) {
      var resolved = (0, _resolveP["default"])(result.value);
      return result.done ? resolved : resolved.then(function (value) {
        return handle(iterator.next(value));
      }, function (error) {
        return handle(iterator["throw"](error));
      });
    };
    try {
      return handle(iterator.next());
    } catch (error) {
      return (0, _rejectP["default"])(error);
    }
  }
  if (generatorFn.length > 0) {
    return (0, _ramda.curryN)(generatorFn.length, asyncWrapper);
  }
  return asyncWrapper;
});
var _default = async;
exports["default"] = _default;

/***/ }),

/***/ 60640:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * The catamorphism is a way of folding a type into a value.
 *
 * **Either**
 *
 * If the either is right then the right function will be executed with
 * the `right` value and the value of the function returned. Otherwise the left function
 * will be called with the `left` value.
 *
 * **Maybe**
 *
 * If the maybe is Some than the right function will be executed with the `some` value and the value of the function
 * returned. Otherwise the left function with be called without an argument.
 *
 * **Result**
 *
 * If the result is Ok than the right function will be executed with the `Ok` value and the value of the function
 * returned. Otherwise the left function will be called with the `Error` value.
 *
 * **Validation**
 *
 * If the validation is Success than the right function will be executed with the `Success` value and the value of the function
 * returned. Otherwise the left function will be called with the `Failure` value.
 *
 * Supported monadic libraries: {@link https://monet.github.io/monet.js/|monet.js}, {@link https://folktale.origamitower.com/|folktale}, {@link https://github.com/ramda/ramda-fantasy|ramda-fantasy}
 *
 * @func cata
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.4.0|v1.4.0}
 * @category Function
 * @sig (a -> b) -> (a -> c) -> Cata a -> b | c
 * @param {Function} leftFn The left function that consumes the left value
 * @param {Function} rightFn The right function that consumes the right value
 * @param {Cata} catamorphicObj Either, Maybe or any other type with catamorphic capabilities (`cata` or `either` method)
 * @return {*}
 * @see {@link https://monet.github.io/monet.js/#cata|cata explained}
 * @example
 *
 * // Either
 * const eitherR = Either.Right(1);
 * const eitherL = Either.Left(2);
 *
 * RA.cata(identity, identity, eitherR); //=> 1
 * RA.cata(identity, identity, eitherL); //=> 2
 *
 * // Maybe
 * const maybeSome = Maybe.Some(1);
 * const maybeNothing = Maybe.Nothing();
 *
 * RA.cata(identity, identity, maybeSome); //=> 1
 * RA.cata(identity, identity, maybeNothing); //=> undefined
 */
var catamorphism = (0, _ramda.curry)(function (leftFn, rightFn, catamorphicObj) {
  // folktale support
  if ((0, _isFunction["default"])(catamorphicObj.matchWith)) {
    return catamorphicObj.matchWith({
      // Result type
      Ok: function Ok(_ref) {
        var value = _ref.value;
        return rightFn(value);
      },
      Error: function Error(_ref2) {
        var value = _ref2.value;
        return leftFn(value);
      },
      // Maybe type
      Just: function Just(_ref3) {
        var value = _ref3.value;
        return rightFn(value);
      },
      Nothing: function Nothing() {
        return leftFn(undefined);
      },
      // Validation type
      Success: function Success(_ref4) {
        var value = _ref4.value;
        return rightFn(value);
      },
      Failure: function Failure(_ref5) {
        var value = _ref5.value;
        return leftFn(value);
      }
    });
  }
  if ((0, _isFunction["default"])(catamorphicObj.cata)) {
    return catamorphicObj.cata(leftFn, rightFn);
  }
  if ((0, _isFunction["default"])(catamorphicObj.getOrElse)) {
    var elseValue = "RA.cata".concat(Math.random());
    var value = catamorphicObj.getOrElse(elseValue);
    return value === elseValue ? leftFn() : rightFn(value);
  }
  return catamorphicObj.either(leftFn, rightFn);
});
var _default = catamorphism;
exports["default"] = _default;

/***/ }),

/***/ 69287:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Composable shortcut for `Promise.catch`.
 * The catchP function returns a Promise. It takes two arguments: a callback function for the failure of the Promise
 * and the promise instance itself.
 *
 * @func catchP
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.29.0|v2.29.0}
 * @category Function
 * @sig (a -> Promise b | b) -> Promise b
 * @param {Function} onRejected A Function called if the Promise is rejected. This function has one argument, the rejection reason.
 * @param {Promise} promise Any Promise
 * @return {Promise} Returns a Promise with dealt rejected cases
 * @see {@link RA.thenP|thenP}, {@link RA.resolveP|resolveP}, {@link RA.rejectP|rejectP}, {@link RA.allP|allP}
 *
 * @example
 *
 * RA.catchP(() => 'b', Promise.resolve('a')); //=> Promise('a')
 * RA.catchP(() => 'b', Promise.reject('a')); //=> Promise('b')
 */
var catchP = (0, _ramda.invoker)(1, 'catch');
var _default = catchP;
exports["default"] = _default;

/***/ }),

/***/ 13515:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns the smallest integer greater than or equal to a given number.
 *
 * Note: ceil(null) returns integer 0 and does not give a NaN error.
 *
 * @func ceil
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.15.0|v2.15.0}
 * @category Math
 * @sig Number -> Number
 * @param {number} number The number to ceil
 * @return {number} The smallest integer greater than or equal to the given number
 * @example
 *
 * RA.ceil(.95); //=> 1
 * RA.ceil(4); //=> 4
 * RA.ceil(7.004); //=> 8
 * RA.ceil(-0.95); //=> -0
 * RA.ceil(-4); //=> -4
 * RA.ceil(-7.004); //=> -7
 * RA.ceil(null); //=> 0
 */

var ceil = (0, _ramda.curryN)(1, (0, _ramda.bind)(Math.ceil, Math));
var _default = ceil;
exports["default"] = _default;

/***/ }),

/***/ 92798:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isFalsy = _interopRequireDefault(__webpack_require__(62893));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Creates an array with all falsy values removed.
 * The values false, null, 0, "", undefined, and NaN are falsy.
 *
 * @func compact
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.5.0|v2.5.0}
 * @category List
 * @sig Filterable f => f a -> f a
 * @param {Array} list The array to compact
 * @return {Array} Returns the new array of filtered values
 * @see {@link RA.isFalsy|isFalsy}
 * @example
 *
 * RA.compact([0, 1, false, 2, '', 3]); //=> [1, 2, 3]
 */
var compact = (0, _ramda.reject)(_isFalsy["default"]);
var _default = compact;
exports["default"] = _default;

/***/ }),

/***/ 10923:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _stubUndefined = _interopRequireDefault(__webpack_require__(25536));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var leftIdentitySemigroup = {
  concat: _ramda.identity
};

/**
 * Returns the result of concatenating the given lists or strings.
 * Note: RA.concatAll expects all elements to be of the same type. It will throw an error if you concat an Array with a non-Array value.
 * Dispatches to the concat method of the preceding element, if present. Can also concatenate multiple elements of a [fantasy-land compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).
 * Returns undefined if empty array was passed.
 *
 * @func concatAll
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.6.0|v2.6.0}
 * @category List
 * @sig [[a]] -> [a] | Undefined
 * @sig [String] -> String | Undefined
 * @sig Semigroup s => Foldable s f => f -> s | Undefined
 * @param {Array.<Array|string>} list List containing elements that will be concatenated
 * @return {Array|string|undefined} Concatenated elements
 * @see {@link http://ramdajs.com/docs/#concat|R.concat}, {@link RA.concatRight|concatRight}, {@link http://ramdajs.com/docs/#unnest|R.unnest}, {@link http://ramdajs.com/docs/#join|R.join}
 * @example
 *
 * concatAll([[1], [2], [3]]); //=> [1, 2, 3]
 * concatAll(['1', '2', '3']); //=> '123'
 * concatAll([]); //=> undefined
 * concatAll(null); //=> undefined
 */
var concatAll = (0, _ramda.pipe)((0, _ramda.reduce)(_ramda.concat, leftIdentitySemigroup), (0, _ramda.when)((0, _ramda.identical)(leftIdentitySemigroup), _stubUndefined["default"]));
var _default = concatAll;
exports["default"] = _default;

/***/ }),

/***/ 31307:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: R.concat expects both arguments to be of the same type, unlike
 * the native Array.prototype.concat method.
 * It will throw an error if you concat an Array with a non-Array value.
 * Dispatches to the concat method of the second argument, if present.
 *
 * @func concatRight
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.11.0|v1.11.0}
 * @category List
 * @sig [a] -> [a] -> [a]
 * @sig String -> String -> String
 * @param {Array|String} firstList The first list
 * @param {Array|String} secondList The second list
 * @return {Array|String} A list consisting of the elements of `secondList`
 * followed by the elements of `firstList`.
 * @see {@link http://ramdajs.com/docs/#concat|R.concat}
 * @example
 *
 * RA.concatRight('ABC', 'DEF'); //=> 'DEFABC'
 * RA.concatRight([4, 5, 6], [1, 2, 3]); //=> [1, 2, 3, 4, 5, 6]
 * RA.concatRight([], []); //=> []
 */
var concatRight = (0, _ramda.flip)(_ramda.concat);
var _default = concatRight;
exports["default"] = _default;

/***/ }),

/***/ 37143:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _renameKeys = _interopRequireDefault(__webpack_require__(46351));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Creates a new object with the own properties of the provided object, and the
 * keys copied according to the keysMap object as `{oldKey: newKey}`.
 * When no key from the keysMap is found, then a shallow clone of an object is returned.
 *
 * Keep in mind that in the case of keys conflict is behaviour undefined and
 * the result may vary between various JS engines!
 *
 * @func copyKeys
 * @memberOf RA
 * @category Object
 * @sig {a: b} -> {a: *} -> {b: *}
 * @param {!Object} keysMap
 * @param {!Object} obj
 * @return {!Object} New object with copied keys
 * @see {@link RA.renameKeys|renameKeys}
 * @example
 *
 * copyKeys({ a: 'b' }, { a: true }); //=> { a: true, b: true }
 * copyKeys({ a: 'b' }, { a: true, b: false }); //=> { a: true, b: true }
 */
var copyKeys = (0, _ramda.curryN)(2, function (keysMap, obj) {
  return _objectSpread(_objectSpread({}, obj), (0, _renameKeys["default"])(keysMap, obj));
});
var _default = copyKeys;
exports["default"] = _default;

/***/ }),

/***/ 59753:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _curryRightN = _interopRequireDefault(__webpack_require__(78528));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Returns a curried equivalent of the provided function.
 * This function is like curry, except that the provided arguments order is reversed.
 *
 * @func curryRight
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.12.0|v1.12.0}
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry
 * @return {Function}  A new, curried function
 * @see {@link http://ramdajs.com/docs/#curry|R.curry}, {@link RA.curryRightN|curryRightN}
 * @example
 *
 * const concatStrings = (a, b, c) => a + b + c;
 * const concatStringsCurried = RA.curryRight(concatStrings);
 *
 * concatStringCurried('a')('b')('c'); // => 'cba'
 */
var curryRight = (0, _ramda.converge)(_curryRightN["default"], [_ramda.length, _ramda.identity]);
var _default = curryRight;
exports["default"] = _default;

/***/ }),

/***/ 78528:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns a curried equivalent of the provided function, with the specified arity.
 * This function is like curryN, except that the provided arguments order is reversed.
 *
 * @func curryRightN
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.12.0|v1.12.0}
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {number} length The arity for the returned function
 * @param {Function} fn The function to curry
 * @return {Function}  A new, curried function
 * @see {@link http://ramdajs.com/docs/#curryN|R.curryN}, {@link RA.curryRight|curryRight}
 * @example
 *
 * const concatStrings = (a, b, c) => a + b + c;
 * const concatStringsCurried = RA.curryRightN(3, concatStrings);
 *
 * concatStringCurried('a')('b')('c'); // => 'cba'
 */
var curryRightN = (0, _ramda.curryN)(2, function (arity, fn) {
  return (0, _ramda.curryN)(arity, function wrapper() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return fn.apply(this, (0, _ramda.reverse)(args));
  });
});
var _default = curryRightN;
exports["default"] = _default;

/***/ }),

/***/ 31654:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns the second argument if predicate function returns `true`,
 * otherwise the third argument is returned.
 *
 * @func defaultWhen
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.2.0|v2.2.0}
 * @category Logic
 * @sig  (a -> Boolean) -> b -> a -> a | b
 * @param {!function} predicate The predicate function
 * @param {*} defaultVal The default value
 * @param {*} val `val` will be returned instead of `defaultVal` if predicate returns false
 * @return {*} The `val` if predicate returns `false`, otherwise the default value
 * @see {@link http://ramdajs.com/docs/#defaultTo|R.defaultTo}
 * @example
 *
 * RA.defaultWhen(RA.isNull, 1, null); // => 1
 * RA.defaultWhen(RA.isNull, 1, 2); // => 2
 */
var defaultWhen = (0, _ramda.curry)(function (predicate, defaultVal, val) {
  return predicate(val) ? defaultVal : val;
});
var _default = defaultWhen;
exports["default"] = _default;

/***/ }),

/***/ 68824:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isNonNegative = _interopRequireDefault(__webpack_require__(6793));
var _isInteger = _interopRequireDefault(__webpack_require__(16399));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Creates a promise which resolves/rejects after the specified milliseconds.
 *
 * @func delayP
 * @memberOf RA
 * @category Function
 * @sig Number -> Promise Undefined
 * @sig {timeout: Number, value: a} -> Promise a
 * @param {number|Object} milliseconds number of milliseconds or options object
 * @return {Promise} A Promise that is resolved/rejected with the given value (if provided) after the specified delay
 * @example
 *
 * RA.delayP(200); //=> Promise(undefined)
 * RA.delayP({ timeout: 1000, value: 'hello world' }); //=> Promise('hello world')
 * RA.delayP.reject(100); //=> Promise(undefined)
 * RA.delayP.reject({ timeout: 100, value: new Error('error') }); //=> Promise(Error('error'))
 */

var makeDelay = (0, _ramda.curry)(function (settleFnPicker, opts) {
  var timeout;
  var value;
  if ((0, _isInteger["default"])(opts) && (0, _isNonNegative["default"])(opts)) {
    timeout = opts;
  } else {
    timeout = (0, _ramda.propOr)(0, 'timeout', opts);
    value = (0, _ramda.propOr)(value, 'value', opts);
  }
  return new Promise(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var settleFn = settleFnPicker(args);
    setTimeout((0, _ramda.partial)(settleFn, [value]), timeout);
  });
});
var delayP = makeDelay((0, _ramda.nth)(0));
delayP.reject = makeDelay((0, _ramda.nth)(1));
var _default = delayP;
exports["default"] = _default;

/***/ }),

/***/ 32372:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isNotNil = _interopRequireDefault(__webpack_require__(18210));
var _isNonEmptyArray = _interopRequireDefault(__webpack_require__(98688));
var _stubUndefined = _interopRequireDefault(__webpack_require__(25536));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; } /**
                                                                                                                                                                                     * Can be used as a way to compose multiple invokers together to form polymorphic functions,
                                                                                                                                                                                     * or functions that exhibit different behaviors based on their argument(s).
                                                                                                                                                                                     * Consumes dispatching functions and keep trying to invoke each in turn, until a non-nil value is returned.
                                                                                                                                                                                     *
                                                                                                                                                                                     * Accepts a list of dispatching functions and returns a new function.
                                                                                                                                                                                     * When invoked, this new function is applied to some arguments,
                                                                                                                                                                                     * each dispatching function is applied to those same arguments until one of the
                                                                                                                                                                                     * dispatching functions returns a non-nil value.
                                                                                                                                                                                     *
                                                                                                                                                                                     * @func dispatch
                                                                                                                                                                                     * @memberOf RA
                                                                                                                                                                                     * @since {@link https://char0n.github.io/ramda-adjunct/2.6.0|v2.6.0}
                                                                                                                                                                                     * @category Function
                                                                                                                                                                                     * @sig [((a, b, ...) -> x1), ((a, b, ...) -> x2), ...] -> x1 | x2 | ...
                                                                                                                                                                                     * @param {!Array} functions A list of functions
                                                                                                                                                                                     * @return {*|undefined} Returns the first not-nil value, or undefined if either an empty list is provided or none of the dispatching functions returns a non-nil value
                                                                                                                                                                                     * @see {@link RA.isNotNil}
                                                                                                                                                                                     * @example
                                                                                                                                                                                     *
                                                                                                                                                                                     * // returns first non-nil value
                                                                                                                                                                                     * const stubNil = () => null;
                                                                                                                                                                                     * const stubUndefined = () => undefined;
                                                                                                                                                                                     * const addOne = v => v + 1;
                                                                                                                                                                                     * const addTwo = v => v + 2;
                                                                                                                                                                                     *
                                                                                                                                                                                     * RA.dispatch([stubNil, stubUndefined, addOne, addTwo])(1); //=> 2
                                                                                                                                                                                     *
                                                                                                                                                                                     * // acts as a switch
                                                                                                                                                                                     * const fnSwitch = RA.dispatch([
                                                                                                                                                                                     *   R.ifElse(RA.isString, s => `${s}-join`, RA.stubUndefined),
                                                                                                                                                                                     *   R.ifElse(RA.isNumber, n => n + 1, RA.stubUndefined),
                                                                                                                                                                                     *   R.ifElse(RA.isDate, R.T, RA.stubUndefined),
                                                                                                                                                                                     * ]);
                                                                                                                                                                                     * fnSwitch(1); //=> 2
                                                                                                                                                                                     */
var byArity = (0, _ramda.comparator)(function (a, b) {
  return a.length > b.length;
});
var getMaxArity = (0, _ramda.pipe)((0, _ramda.sort)(byArity), _ramda.head, (0, _ramda.prop)('length'));
var iteratorFn = (0, _ramda.curry)(function (args, accumulator, fn) {
  var result = fn.apply(void 0, _toConsumableArray(args));
  return (0, _isNotNil["default"])(result) ? (0, _ramda.reduced)(result) : accumulator;
});
var dispatchImpl = function dispatchImpl(functions) {
  var arity = getMaxArity(functions);
  return (0, _ramda.curryN)(arity, function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return (0, _ramda.reduce)(iteratorFn(args), undefined, functions);
  });
};
var dispatch = (0, _ramda.ifElse)(_isNonEmptyArray["default"], dispatchImpl, _stubUndefined["default"]);
var _default = dispatch;
exports["default"] = _default;

/***/ }),

/***/ 92464:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Divides two numbers, where the second number is divided by the first number.
 *
 * @func divideNum
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category Math
 * @sig Number -> Number -> Number
 * @param {number} divisor the number to divide by
 * @param {number} dividend the number to divide
 * @return {number} A number representing the quotient of dividing the dividend by the divisor
 * @example
 *
 * RA.divideNum(2, 1); //=> 0.5
 */
var divideNum = (0, _ramda.flip)(_ramda.divide);
var _default = divideNum;
exports["default"] = _default;

/***/ }),

/***/ 19962:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Accepts a function with any arity and returns a function with arity of zero.
 * The returned function ignores any arguments supplied to it.
 *
 * @func dropArgs
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.10.0|v2.10.0}
 * @category Logic
 * @sig (...a -> b)-> () -> b
 * @param {Function} fn The function with any arity
 * @return {Function} Returns function with arity of zero
 * @see {@link http://ramdajs.com/docs/#nAry|R.nAry}
 * @example
 *
 * const fn = (a = 1, b = 2) => a + b;
 *
 * RA.dropArgs(fn)('ignore1', 'ignore2'); //=> 3
 */
var dropArgs = (0, _ramda.nAry)(0);
var _default = dropArgs;
exports["default"] = _default;

/***/ }),

/***/ 36878:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isNotArray = _interopRequireDefault(__webpack_require__(52974));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Returns a singleton array containing the value provided.
 * If value is already an array, it is returned as is.
 *
 * @func ensureArray
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.6.0|v2.6.0}
 * @category List
 * @sig a | [a] -> [a]
 * @param {*|Array} val the value ensure as Array
 * @return {Array}
 * @see {@link http://ramdajs.com/docs/#of|R.of}
 * @example
 *
 * RA.ensureArray(42); //=> [42]
 * RA.ensureArray([42]); //=> [42]
 */
var ensureArray = (0, _ramda.when)(_isNotArray["default"], (0, _ramda.of)(Array));
var _default = ensureArray;
exports["default"] = _default;

/***/ }),

/***/ 74971:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isString = _interopRequireDefault(__webpack_require__(36851));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Escapes the RegExp special characters.
 *
 * @func escapeRegExp
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.21.0|v2.21.0}
 * @category String
 * @sig String -> String
 * @param {string} val the value to escape
 * @return {string}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping|MDN Regular Expressions Escaping}
 * @example
 *
 * RA.escapeRegExp('[ramda-adjunct](https://github.com/char0n/ramda-adjunct)'); //=> '\[ramda\-adjunct\]\(https://github\.com/char0n/ramda\-adjunct\)'
 */
var escapeRegExp = (0, _ramda.when)(_isString["default"], (0, _ramda.replace)(/[.*+?^${}()|[\]\\-]/g, '\\$&'));
var _default = escapeRegExp;
exports["default"] = _default;

/***/ }),

/***/ 99895:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var fl = _interopRequireWildcard(__webpack_require__(74509));
var _traits = __webpack_require__(10183);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The simplest {@link https://github.com/fantasyland/fantasy-land|fantasy-land}
 * compatible monad which attaches no information to values.
 *
 * The Identity type is a very simple type that has no interesting side effects and
 * is effectively just a container of some value. So why does it exist ?
 * The Identity type is often used as the base monad of a monad
 * transformer when no other behaviour is required.
 *
 * @memberOf RA
 * @implements
 * {@link https://github.com/fantasyland/fantasy-land#apply|Apply},
 * {@link https://github.com/fantasyland/fantasy-land#applicative|Applicative},
 * {@link https://github.com/fantasyland/fantasy-land#functor|Functor},
 * {@link https://github.com/fantasyland/fantasy-land#setoid|Setoid},
 * {@link https://github.com/fantasyland/fantasy-land#semigroup|Semigroup},
 * {@link https://github.com/fantasyland/fantasy-land#chain|Chain},
 * {@link https://github.com/fantasyland/fantasy-land#monad|Monad},
 * {@link https://github.com/fantasyland/fantasy-land#ord|Ord},
 * {@link https://github.com/fantasyland/fantasy-land#monoid|Monoid*},
 * {@link https://github.com/fantasyland/fantasy-land#contravariant|Contravariant}
 * @since {@link https://char0n.github.io/ramda-adjunct/1.8.0|v1.8.0}
 */
var Identity = /*#__PURE__*/function (_fl$of, _fl$ap, _fl$map, _fl$equals, _fl$concat, _fl$chain, _fl$lte, _fl$empty, _fl$contramap) {
  /**
   * Private constructor. Use {@link RA.Identity.of|Identity.of} instead.
   *
   * @param {*} value
   * @return {RA.Identity}
   */
  function Identity(value) {
    _classCallCheck(this, Identity);
    this.value = value;
  }

  /**
   * Catamorphism for a value.
   * @returns {*}
   * @example
   *
   * const a = Identity.of(1);
   * a.get(); //=> 1
   */
  _createClass(Identity, [{
    key: "get",
    value: function get() {
      return this.value;
    }

    /**
     * Fantasy land {@link https://github.com/fantasyland/fantasy-land#apply|Apply} specification.
     *
     * @sig ap :: Apply f => f a ~> f (a -> b) -> f b
     * @param {RA.Identity} applyWithFn
     * @return {RA.Identity}
     * @example
     *
     * const a = Identity.of(1);
     * const b = Identity.of(1).map(a => b => a + b);
     *
     * a.ap(b); //=> Identity(2)
     */
  }, {
    key: _fl$ap,
    value: function value(applyWithFn) {
      return _traits.applyTrait[fl.ap].call(this, applyWithFn);
    }
  }, {
    key: "ap",
    value: function ap(applyWithFn) {
      return this[fl.ap](applyWithFn);
    }

    /**
     * Fantasy land {@link https://github.com/fantasyland/fantasy-land#functor|Functor} specification.
     *
     * @sig map :: Functor f => f a ~> (a -> b) -> f b
     * @param {Function} fn
     * @return {RA.Identity}
     * @example
     *
     * const a = Identity.of(1);
     * a.map(a => a + 1); //=> Identity(2)
     */
  }, {
    key: _fl$map,
    value: function value(fn) {
      return _traits.functorTrait[fl.map].call(this, fn);
    }
  }, {
    key: "map",
    value: function map(fn) {
      return this[fl.map](fn);
    }

    /**
     * Fantasy land {@link https://github.com/fantasyland/fantasy-land#setoid|Setoid} specification.
     *
     * @sig equals :: Setoid a => a ~> a -> Boolean
     * @param {RA.Identity} setoid
     * @return {boolean}
     * @example
     *
     * const a = Identity.of(1);
     * const b = Identity.of(1);
     * const c = Identity.of(2);
     *
     * a.equals(b); //=> true
     * a.equals(c); //=> false
     */
  }, {
    key: _fl$equals,
    value: function value(setoid) {
      return _traits.setoidTrait[fl.equals].call(this, setoid);
    }
  }, {
    key: "equals",
    value: function equals(setoid) {
      return this[fl.equals](setoid);
    }

    /**
     * Fantasy land {@link https://github.com/fantasyland/fantasy-land#semigroup|Semigroup} specification.
     *
     * @sig concat :: Semigroup a => a ~> a -> a
     * @param {RA.Identity} semigroup
     * @return {RA.Identity}
     * @example
     *
     * const a = Identity.of(1);
     * const b = Identity.of(1);
     * a.concat(b); //=> 2
     *
     * const c = Identity.of('c');
     * const d = Identity.of('d');
     * c.concat(d); //=> 'cd'
     *
     * const e = Identity.of(['e']);
     * const f = Identity.of(['f']);
     * e.concat(f); //=> ['e', 'f']
     */
  }, {
    key: _fl$concat,
    value: function value(semigroup) {
      return _traits.semigroupTrait[fl.concat].call(this, semigroup);
    }
  }, {
    key: "concat",
    value: function concat(semigroup) {
      return this[fl.concat](semigroup);
    }

    /**
     * Fantasy land {@link https://github.com/fantasyland/fantasy-land#chain|Chain} specification.
     *
     * @sig chain :: Chain m => m a ~> (a -> m b) -> m b
     * @param {Function} fn Function returning the value of the same {@link https://github.com/fantasyland/fantasy-land#semigroup|Chain}
     * @return {RA.Identity}
     * @example
     *
     * const a = Identity.of(1);
     * const fn = val => Identity.of(val + 1);
     *
     * a.chain(fn).chain(fn); //=> Identity(3)
     */
  }, {
    key: _fl$chain,
    value: function value(fn) {
      return _traits.chainTrait[fl.chain].call(this, fn);
    }
  }, {
    key: "chain",
    value: function chain(fn) {
      return this[fl.chain](fn);
    }

    /**
     * Fantasy land {@link https://github.com/fantasyland/fantasy-land#ord|Ord} specification.
     *
     * @sig lte :: Ord a => a ~> a -> Boolean
     * @param {RA.Identity} ord
     * @return {boolean}
     * @example
     *
     * const a = Identity.of(1);
     * const b = Identity.of(1);
     * const c = Identity.of(2);
     *
     * a.lte(b); //=> true
     * a.lte(c); //=> true
     * c.lte(a); //=> false
     */
  }, {
    key: _fl$lte,
    value: function value(ord) {
      return _traits.ordTrait[fl.lte].call(this, ord);
    }
  }, {
    key: "lte",
    value: function lte(ord) {
      return this[fl.lte](ord);
    }

    /**
     * Fantasy land {@link https://github.com/fantasyland/fantasy-land#monoid|Monoid*} specification.
     * Partial implementation of Monoid specification. `empty` method on instance only, returning
     * identity value of the wrapped type. Using `R.empty` under the hood.
     *
     *
     * @sig empty :: Monoid m => () -> m
     * @return {RA.Identity}
     * @example
     *
     * const a = Identity.of('test');
     * const i = a.empty();
     *
     * a.concat(i); //=> Identity('string');
     * i.concat(a); //=> Identity('string');
     */
  }, {
    key: _fl$empty,
    value: function value() {
      return this.constructor.of((0, _ramda.empty)(this.value));
    }
  }, {
    key: "empty",
    value: function empty() {
      return this[fl.empty]();
    }

    /**
     * Fantasy land {@link https://github.com/fantasyland/fantasy-land#contravariant|Contravariant} specification.
     *
     * @sig contramap :: Contravariant f => f a ~> (b -> a) -> f b
     * @param {Function} fn
     * @return {RA.Identity}
     * @example
     *
     * const identity = a => a;
     * const add1 = a => a + 1;
     * const divide2 = a => a / 2;
     *
     * Identity.of(divide2).contramap(add1).get()(3); //=> 2
     * Identity.of(identity).contramap(divide2).contramap(add1).get()(3); //=> 2
     * Identity.of(identity).contramap(a => divide2(add1(a))).get()(3); //=> 2
     */
  }, {
    key: _fl$contramap,
    value: function value(fn) {
      var _this = this;
      return this.constructor.of(function (value) {
        return _this.value(fn(value));
      });
    }
  }, {
    key: "contramap",
    value: function contramap(fn) {
      return this[fl.contramap](fn);
    }
  }], [{
    key: _fl$of,
    value:
    /**
     * Fantasy land {@link https://github.com/fantasyland/fantasy-land#applicative|Applicative} specification.
     *
     * @static
     * @sig of :: Applicative f => a -> f a
     * @param {*} value
     * @returns {RA.Identity}
     * @example
     *
     * const a = Identity.of(1); //=> Identity(1)
     */
    function value(_value) {
      return new Identity(_value);
    }
  }, {
    key: "of",
    value: function of(value) {
      return new Identity(value);
    }

    /**
     * @static
     */
  }, {
    key: '@@type',
    get: function get() {
      return 'RA/Identity';
    }
  }]);
  return Identity;
}(fl.of, fl.ap, fl.map, fl.equals, fl.concat, fl.chain, fl.lte, fl.empty, fl.contramap);
var _default = Identity;
exports["default"] = _default;

/***/ }),

/***/ 74509:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports.zero = exports.traverse = exports.reduce = exports.promap = exports.of = exports.map = exports.lte = exports.id = exports.extract = exports.extend = exports.equals = exports.empty = exports.contramap = exports.concat = exports.compose = exports.chainRec = exports.chain = exports.bimap = exports.ap = exports.alt = void 0;
var equals = 'fantasy-land/equals';
exports.equals = equals;
var lte = 'fantasy-land/lte';
exports.lte = lte;
var compose = 'fantasy-land/compose';
exports.compose = compose;
var id = 'fantasy-land/id';
exports.id = id;
var concat = 'fantasy-land/concat';
exports.concat = concat;
var empty = 'fantasy-land/empty';
exports.empty = empty;
var map = 'fantasy-land/map';
exports.map = map;
var contramap = 'fantasy-land/contramap';
exports.contramap = contramap;
var ap = 'fantasy-land/ap';
exports.ap = ap;
var of = 'fantasy-land/of';
exports.of = of;
var alt = 'fantasy-land/alt';
exports.alt = alt;
var zero = 'fantasy-land/zero';
exports.zero = zero;
var reduce = 'fantasy-land/reduce';
exports.reduce = reduce;
var traverse = 'fantasy-land/traverse';
exports.traverse = traverse;
var chain = 'fantasy-land/chain';
exports.chain = chain;
var chainRec = 'fantasy-land/chainRec';
exports.chainRec = chainRec;
var extend = 'fantasy-land/extend';
exports.extend = extend;
var extract = 'fantasy-land/extract';
exports.extract = extract;
var bimap = 'fantasy-land/bimap';
exports.bimap = bimap;
var promap = 'fantasy-land/promap';
exports.promap = promap;

/***/ }),

/***/ 10183:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.setoidTrait = exports.semigroupTrait = exports.ordTrait = exports.functorTrait = exports.chainTrait = exports.applyTrait = void 0;
var _ramda = __webpack_require__(36);
var _isString = _interopRequireDefault(__webpack_require__(36851));
var _isNumber = _interopRequireDefault(__webpack_require__(3722));
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
var _util = __webpack_require__(64595);
var fl = _interopRequireWildcard(__webpack_require__(74509));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var functorTrait = _defineProperty({}, fl.map, function (fn) {
  return this.constructor[fl.of](fn(this.value));
});
exports.functorTrait = functorTrait;
var applyTrait = _defineProperty({}, fl.ap, function (applyWithFn) {
  var _this = this;
  return applyWithFn.map(function (fn) {
    return fn(_this.value);
  });
});
exports.applyTrait = applyTrait;
var setoidTrait = _defineProperty({}, fl.equals, function (setoid) {
  return (0, _util.isSameType)(this, setoid) && (0, _ramda.equals)(this.value, setoid.value);
});
exports.setoidTrait = setoidTrait;
var semigroupTrait = _defineProperty({}, fl.concat, function (semigroup) {
  var concatenatedValue = this.value;
  if ((0, _isString["default"])(this.value) || (0, _isNumber["default"])(this.value)) {
    concatenatedValue = this.value + semigroup.value;
  } else if ((0, _ramda.pathSatisfies)(_isFunction["default"], ['value', fl.concat], this)) {
    concatenatedValue = this.value[fl.concat](semigroup.value);
  } else if ((0, _ramda.pathSatisfies)(_isFunction["default"], ['value', 'concat'], this)) {
    concatenatedValue = this.value.concat(semigroup.value);
  }
  return this.constructor[fl.of](concatenatedValue);
});
exports.semigroupTrait = semigroupTrait;
var chainTrait = _defineProperty({}, fl.chain, function (fn) {
  var newChain = fn(this.value);
  return (0, _util.isSameType)(this, newChain) ? newChain : this;
});
exports.chainTrait = chainTrait;
var ordTrait = _defineProperty({}, fl.lte, function (ord) {
  return (0, _util.isSameType)(this, ord) && (this.value < ord.value || this[fl.equals](ord));
});
exports.ordTrait = ordTrait;

/***/ }),

/***/ 64595:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.typeEquals = exports.type = exports.isSameType = exports.isNotSameType = void 0;
var _ramda = __webpack_require__(36);
// type :: Monad a => a -> String
var type = (0, _ramda.either)((0, _ramda.path)(['@@type']), (0, _ramda.path)(['constructor', '@@type']));

// typeEquals :: Monad a => String -> a -> Boolean
exports.type = type;
var typeEquals = (0, _ramda.curry)(function (typeIdent, monad) {
  return type(monad) === typeIdent;
});

// isSameType :: (Monad a, Monad b) => a -> b -> Boolean
exports.typeEquals = typeEquals;
var isSameType = (0, _ramda.curryN)(2, (0, _ramda.useWith)(_ramda.equals, [type, type]));

// isNotSameType :: (Monad a, Monad b) => a -> b -> Boolean
exports.isSameType = isSameType;
var isNotSameType = (0, _ramda.complement)(isSameType);
exports.isNotSameType = isNotSameType;

/***/ }),

/***/ 50251:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * {@link http://ramdajs.com/docs/#filter|R.filter} function that more closely resembles `Array.prototype.filter`.
 * It takes two new parameters to its callback function: the current index, and the entire list.
 *
 * `filterIndexed` implementation is simple: `
 *  const filterIndexed = R.addIndex(R.filter);
 * `
 *
 * @func filterIndexed
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.31.0|v2.31.0}
 * @category List
 * @typedef Idx = Number
 * @sig Filterable f => ((a, Idx, f a) -> Boolean) -> f a -> f a
 * @param {Function} pred The predicate function
 * @param {Array} list The collection to filter
 * @return {Array} Filterable
 * @see {@link http://ramdajs.com/docs/#addIndex|R.addIndex}, {@link http://ramdajs.com/docs/#filter|R.filter}
 * @example
 *
 * const isValueGtIndex = (val, idx) => val > idx;
 * RA.filterIndexed(isValueGtIndex, [5, 4, 3, 2, 1, 0]); //=> [5, 4, 3]
 */
var filterIndexed = (0, _ramda.addIndex)(_ramda.filter);
var _default = filterIndexed;
exports["default"] = _default;

/***/ }),

/***/ 52085:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns the first element of the list which matches the predicate.
 * Returns default value if no element matches or matched element is `null`, `undefined` or `NaN`.
 * Dispatches to the find method of the second argument, if present.
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func findOr
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.32.0|v2.32.0}
 * @category List
 * @sig  a -> (b -> Boolean) -> [b] -> b | a
 * @param {*} defaultValue The default value
 * @param {Function} fn The predicate function used to determine if the element is the desired one.
 * @param {Array} list The array to consider.
 * @return {*} The element found, or the default value.
 * @see {@link http://ramdajs.com/docs/#defaultTo|R.defaultTo}, {@link http://ramdajs.com/docs/#find|R.find}
 * @example
 *
 * RA.findOr(1, isUndefined, [1, 2, undefined]); // => 1
 * RA.findOr(1, val => val === 2, [1, 2, undefined]); // => 2
 * RA.findOr(1, val => val === 3, [1, 2, undefined]); // => 1
 */

var findOr = (0, _ramda.curry)(function (defaultVal, fn, list) {
  return (0, _ramda.pipe)((0, _ramda.find)(fn), (0, _ramda.defaultTo)(defaultVal))(list);
});
var _default = findOr;
exports["default"] = _default;

/***/ }),

/***/ 37689:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _makeFlat2 = _interopRequireDefault(__webpack_require__(20298));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var flatten1 = (0, _makeFlat2["default"])(false);

/**
 * Flattens the list to the specified depth.
 *
 * @func flattenDepth
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.19.0|v2.19.0}
 * @category List
 * @sig Number -> [a] -> [b]
 * @param {!number} depth The maximum recursion depth
 * @param {!Array} list The array to flatten
 * @return {!Array} Returns the new flattened array
 * @see {@link http://ramdajs.com/docs/#flatten|R.flatten}, {@link http://ramdajs.com/docs/#unnest|R.unnest}
 * @example
 *
 * RA.flattenDepth(
 *   2,
 *   [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10]
 * ); //=> [1, 2, 3, 4, 5, 6, [[7], 8], 9, 10];
 */
var flattenDepth = (0, _ramda.curry)(function (depth, list) {
  var currentDept = depth;
  var flatList = _toConsumableArray(list);
  while (currentDept > 0) {
    flatList = flatten1(flatList);
    currentDept -= 1;
  }
  return flatList;
});
var _default = flattenDepth;
exports["default"] = _default;

/***/ }),

/***/ 87835:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Flattens a property path so that its fields are spread out into the provided object.
 * It's like {@link RA.spreadPath|spreadPath}, but preserves object under the property path.
 *
 * @func flattenPath
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|v1.19.0}
 * @category Object
 * @typedef Idx = String | Int
 * @sig [Idx] -> {k: v} -> {k: v}
 * @param {!Array.<string|number>} path The property path to flatten
 * @param {!Object} obj The provided object
 * @return {!Object} The flattened object
 * @see {@link RA.flattenProp|flattenProp}, {@link RA.spreadPath|spreadPath}
 * @example
 *
 * RA.flattenPath(
 *   ['b1', 'b2'],
 *   { a: 1, b1: { b2: { c: 3, d: 4 } } }
 * ); // => { a: 1, c: 3, d: 4, b1: { b2: { c: 3, d: 4 } } };
 */
var flattenPath = (0, _ramda.curry)(function (path, obj) {
  return (0, _ramda.mergeRight)(obj, (0, _ramda.pathOr)({}, path, obj));
});
var _default = flattenPath;
exports["default"] = _default;

/***/ }),

/***/ 37391:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _flattenPath = _interopRequireDefault(__webpack_require__(87835));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Flattens a property so that its fields are spread out into the provided object.
 * It's like {@link RA.spreadProp|spreadProp}, but preserves object under the property path.
 *
 * @func flattenProp
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|v1.19.0}
 * @category Object
 * @typedef Idx = String | Int
 * @sig [Idx] -> {k: v} -> {k: v}
 * @param {!string|number} prop The property to flatten
 * @param {!Object} obj The provided object
 * @return {!Object} The flattened object
 * @see {@link RA.flattenPath|flattenPath}, {@link RA.spreadProp|spreadProp}
 * @example
 *
 * RA.flattenProp(
 *   'b',
 *   { a: 1, b: { c: 3, d: 4 } }
 * ); // => { a: 1, c: 3, d: 4, b: { c: 3, d: 4 } };
 */
var flattenProp = (0, _ramda.curry)(function (prop, obj) {
  return (0, _flattenPath["default"])((0, _ramda.of)(Array, prop), obj);
});
var _default = flattenProp;
exports["default"] = _default;

/***/ }),

/***/ 5062:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns the largest integer less than or equal to a given number.
 *
 * Note: floor(null) returns integer 0 and do not give a NaN error.
 *
 * @func floor
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.15.0|v2.15.0}
 * @category Math
 * @sig Number -> Number
 * @param {number} number The number to floor
 * @return {number} A number representing the largest integer less than or equal to the specified number
 * @example
 *
 * RA.floor(45.95); //=> 45
 * RA.floor(45.05); //=> 45
 * RA.floor(4); //=> 4
 * RA.floor(-45.05); //=> -46
 * RA.floor(-45.95); //=> -46
 * RA.floor(null); //=> 0
 */

var floor = (0, _ramda.curryN)(1, (0, _ramda.bind)(Math.floor, Math));
var _default = floor;
exports["default"] = _default;

/***/ }),

/***/ 56047:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _defaultWhen = _interopRequireDefault(__webpack_require__(31654));
var _mapIndexed = _interopRequireDefault(__webpack_require__(42977));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Returns a function which is called with the given arguments. If any of the given arguments are null or undefined,
 * the corresponding default value for that argument is used instead.
 *
 * @func fnull
 * @memberOf RA
 * @category Function
 * @sig (a ... -> b) -> [c] -> a ... | c -> b
 * @param {Function} function to be executed
 * @param {Array} defaults default arguments
 * @return {Function} will apply provided arguments or default ones
 * @example
 *
 * const addDefaults = RA.fnull((a, b) => a + b, [4, 5])
 *
 * addDefaults(1, 2); // => 3
 * addDefaults(null, 2); // => 6
 * addDefaults(2, null); // => 7
 * addDefaults(undefined, undefined); // => 9
 */

var fnull = (0, _ramda.curry)(function (fn, defaults) {
  return (0, _ramda.curryN)(fn.length, function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var argsWithDefaults = (0, _mapIndexed["default"])(function (val, idx) {
      return (0, _defaultWhen["default"])(_ramda.isNil, defaults[idx], val);
    }, args);
    return (0, _ramda.apply)(fn, argsWithDefaults);
  });
});
var _default = fnull;
exports["default"] = _default;

/***/ }),

/***/ 28154:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var inRangeImp = (0, _ramda.ifElse)(_ramda.gte, function () {
  throw new Error('low must not be greater than high in inRange(low, high, value)');
}, (0, _ramda.useWith)(_ramda.both, [_ramda.lte, _ramda.gt]));

/**
 * Checks if `value` is between `low` and up to but not including `high`.
 *
 * @func inRange
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.7.0|v2.7.0}
 * @category Relation
 * @sig Number -> Number -> Number -> Boolean
 * @param {number} low Start of the range
 * @param {number} high The end of the range
 * @param {number} value The value to test
 * @return {boolean}
 * @throws {Error} When `low` is greater than or equal to `high`
 * @example
 *
 * RA.inRange(0, 5, 3); //=> true
 * RA.inRange(0, 5, 0); //=> true
 * RA.inRange(0, 5, 4); //=> true
 * RA.inRange(0, 5, 5); //=> false
 * RA.inRange(0, 5, -1); //=> false
 */
var _default = (0, _ramda.curry)(function (low, high, value) {
  return inRangeImp(low, high)(value);
});
exports["default"] = _default;

/***/ }),

/***/ 2655:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns true if the specified value is equal, in R.equals terms,
 * to at least one element of the given list or false otherwise.
 * Given list can be a string.
 *
 * Like {@link http://ramdajs.com/docs/#includes|R.includes} but with argument order reversed.
 *
 * @func included
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/3.0.0|v3.0.0}
 * @category List
 * @sig [a] -> a -> Boolean
 * @param {Array|String} list The list to consider
 * @param {*} a The item to compare against
 * @return {boolean} Returns Boolean `true` if an equivalent item is in the list or `false` otherwise
 * @see {@link http://ramdajs.com/docs/#includes|R.includes}
 * @example
 *
 * RA.included([1, 2, 3], 3); //=> true
 * RA.included([1, 2, 3], 4); //=> false
 * RA.included([{ name: 'Fred' }], { name: 'Fred' }); //=> true
 * RA.included([[42]], [42]); //=> true
 */
var included = (0, _ramda.flip)(_ramda.includes);
var _default = included;
exports["default"] = _default;

/***/ }),

/***/ 72625:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
var fl = _interopRequireWildcard(__webpack_require__(74509));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var isFunctor = (0, _ramda.either)((0, _ramda.pathSatisfies)(_isFunction["default"], ['map']), (0, _ramda.pathSatisfies)(_isFunction["default"], [fl.map]));
var isApply = (0, _ramda.both)(isFunctor, (0, _ramda.either)((0, _ramda.pathSatisfies)(_isFunction["default"], ['ap']), (0, _ramda.pathSatisfies)(_isFunction["default"], [fl.ap])));
var ap = (0, _ramda.curryN)(2, function (applyF, applyX) {
  // return original ramda `ap` if not Apply spec
  if (!isApply(applyF) || !isApply(applyX)) {
    return (0, _ramda.ap)(applyF, applyX);
  }
  try {
    // new version of `ap` starting from ramda version > 0.23.0
    return applyF.ap(applyX);
  } catch (e) {
    // old version of `ap` till ramda version <= 0.23.0
    return applyX.ap(applyF);
  }
});
var _default = ap;
exports["default"] = _default;

/***/ }),

/***/ 37854:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var compareLength = (0, _ramda.curry)(function (comparator, value, list) {
  return (0, _ramda.compose)(comparator(value), _ramda.length)(list);
});
var _default = compareLength;
exports["default"] = _default;

/***/ }),

/***/ 64969:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isObj = _interopRequireDefault(__webpack_require__(82806));
var _isSymbol = _interopRequireDefault(__webpack_require__(53220));
var _neither = _interopRequireDefault(__webpack_require__(88760));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var isCoercible = (0, _neither["default"])(_isSymbol["default"], (0, _ramda.both)(_isObj["default"], (0, _neither["default"])((0, _ramda.hasIn)('toString'), (0, _ramda.hasIn)('valueOf'))));
var _default = isCoercible;
exports["default"] = _default;

/***/ }),

/***/ 42374:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var isOfTypeObject = function isOfTypeObject(val) {
  return _typeof(val) === 'object';
};
var _default = isOfTypeObject;
exports["default"] = _default;

/***/ }),

/***/ 20298:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _isArrayLike = _interopRequireDefault(__webpack_require__(50461));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * `makeFlat` is a helper function that returns a one-level or fully recursive
 * function based on the flag passed in.
 *
 * @func makeFlat
 * @memberOf RA
 *
 * @category List
 * @param {!bool} = should recursively flatten
 * @param {!Array} = the nested list to be flattened
 * @return {!Array} = the flattened list
 * @sig Bool -> List -> List
 *
 */
var makeFlat = function makeFlat(recursive) {
  return function flatt(list) {
    var value;
    var jlen;
    var j;
    var result = [];
    var idx = 0;
    while (idx < list.length) {
      if ((0, _isArrayLike["default"])(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        jlen = value.length;
        while (j < jlen) {
          result[result.length] = value[j];
          j += 1;
        }
      } else {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
    return result;
  };
};
var _default = makeFlat;
exports["default"] = _default;

/***/ }),

/***/ 94453:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isIterable = _interopRequireDefault(__webpack_require__(33953));
var _isNotUndefined = _interopRequireDefault(__webpack_require__(50384));
var _isNotNil = _interopRequireDefault(__webpack_require__(18210));
var _isNotFunction = _interopRequireDefault(__webpack_require__(23498));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var copyArray = function copyArray(items, mapFn, thisArg) {
  var boundMapFn = (0, _isNotUndefined["default"])(thisArg) ? (0, _ramda.bind)(mapFn, thisArg) : mapFn;
  return (0, _isNotUndefined["default"])(mapFn) ? _toConsumableArray(items).map(boundMapFn) : _toConsumableArray(items);
};
var fromArray = function fromArray(items, mapFn, thisArg) {
  if (items == null) {
    throw new TypeError('Array.from requires an array-like object - not null or undefined');
  }
  if ((0, _isNotNil["default"])(mapFn) && (0, _isNotFunction["default"])(mapFn)) {
    throw new TypeError('Array.from: when provided, the second argument must be a function');
  }
  if ((0, _isIterable["default"])(items)) {
    return copyArray(items, mapFn, thisArg);
  }
  return [];
};
var _default = fromArray;
exports["default"] = _default;

/***/ }),

/***/ 29808:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var signPonyfill = function signPonyfill(number) {
  return (number > 0) - (number < 0) || +number;
};
var _default = signPonyfill;
exports["default"] = _default;

/***/ }),

/***/ 90092:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _isFinite = _interopRequireDefault(__webpack_require__(12785));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var truncPonyfill = function truncPonyfill(v) {
  var numV = Number(v);
  if (!(0, _isFinite["default"])(numV)) {
    return numV;
  }

  // eslint-disable-next-line no-nested-ternary
  return numV - numV % 1 || (numV < 0 ? -0 : numV === 0 ? numV : 0);
};
var _default = truncPonyfill;
exports["default"] = _default;

/***/ }),

/***/ 24008:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
var _default = MAX_SAFE_INTEGER;
exports["default"] = _default;

/***/ }),

/***/ 62684:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isNumber = _interopRequireDefault(__webpack_require__(3722));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// eslint-disable-next-line no-restricted-globals
var isFinitePonyfill = (0, _ramda.both)(_isNumber["default"], isFinite);
var _default = isFinitePonyfill;
exports["default"] = _default;

/***/ }),

/***/ 24058:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isFinite = _interopRequireDefault(__webpack_require__(12785));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var isIntegerPonyfill = (0, _ramda.both)(_isFinite["default"], (0, _ramda.converge)(_ramda.equals, [Math.floor, _ramda.identity]));
var _default = isIntegerPonyfill;
exports["default"] = _default;

/***/ }),

/***/ 41291:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isNumber = _interopRequireDefault(__webpack_require__(3722));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// eslint-disable-next-line no-restricted-globals
var isNaNPonyfill = (0, _ramda.both)(_isNumber["default"], isNaN);
var _default = isNaNPonyfill;
exports["default"] = _default;

/***/ }),

/***/ 98797:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isInteger = _interopRequireDefault(__webpack_require__(16399));
var _Number = _interopRequireDefault(__webpack_require__(24008));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var isSafeIntegerPonyfill = (0, _ramda.both)(_isInteger["default"], function (value) {
  return Math.abs(value) <= _Number["default"];
});
var _default = isSafeIntegerPonyfill;
exports["default"] = _default;

/***/ }),

/***/ 20971:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _allP = _interopRequireDefault(__webpack_require__(215));
var _resolveP = _interopRequireDefault(__webpack_require__(37555));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var onFulfill = function onFulfill(value) {
  return {
    status: 'fulfilled',
    value: value
  };
};
var onReject = function onReject(reason) {
  return {
    status: 'rejected',
    reason: reason
  };
};
var allSettledPonyfill = function allSettledPonyfill(iterable) {
  var array = (0, _ramda.map)(function (p) {
    return (0, _resolveP["default"])(p).then(onFulfill)["catch"](onReject);
  }, _toConsumableArray(iterable));
  return (0, _allP["default"])(array);
};
var _default = allSettledPonyfill;
exports["default"] = _default;

/***/ }),

/***/ 47441:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
exports.__esModule = true;
exports["default"] = exports.AggregatedError = void 0;
var _ramda = __webpack_require__(36);
var _resolveP = _interopRequireDefault(__webpack_require__(37555));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var AggregatedError = /*#__PURE__*/function (_Error) {
  _inherits(AggregatedError, _Error);
  var _super = _createSuper(AggregatedError);
  function AggregatedError() {
    var _this;
    var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    _classCallCheck(this, AggregatedError);
    _this = _super.call(this, message);
    _this.errors = errors;
    return _this;
  }
  return _createClass(AggregatedError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
exports.AggregatedError = AggregatedError;
var anyPonyfill = function anyPonyfill(iterable) {
  var exceptions = [];
  return new Promise(function (resolve, reject) {
    var onReject = function onReject(e) {
      exceptions.push(e);
      if (exceptions.length === iterable.length) {
        reject(new AggregatedError(exceptions));
      }
    };
    (0, _ramda.map)(function (p) {
      return (0, _resolveP["default"])(p).then(resolve)["catch"](onReject);
    }, _toConsumableArray(iterable));
  });
};
var _default = anyPonyfill;
exports["default"] = _default;

/***/ }),

/***/ 67426:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
var _isNotUndefined = _interopRequireDefault(__webpack_require__(50384));
var _String = _interopRequireDefault(__webpack_require__(50279));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var padEndPonyfill = function padEndPonyfill(padString, targetLength, value) {
  // eslint-disable-next-line no-bitwise
  var finalLength = targetLength >> 0;
  var finalPadString = String((0, _isNotUndefined["default"])(padString) ? padString : ' ');
  if (value.length > finalLength) {
    return String(value);
  }
  finalLength -= value.length;
  if (finalLength > finalPadString.length) {
    var remainingLength = finalLength / finalPadString.length;
    finalPadString += (0, _isFunction["default"])(String.prototype.repeat) ? finalPadString.repeat(remainingLength) : (0, _String["default"])(finalPadString, remainingLength);
  }
  return String(value) + finalPadString.slice(0, finalLength);
};
var _default = padEndPonyfill;
exports["default"] = _default;

/***/ }),

/***/ 94251:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
var _isNotUndefined = _interopRequireDefault(__webpack_require__(50384));
var _String = _interopRequireDefault(__webpack_require__(50279));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var padStartPonyfill = function padStartPonyfill(padString, targetLength, value) {
  // eslint-disable-next-line no-bitwise
  var finalLength = targetLength >> 0; // truncate if number, or convert non-number to 0;
  var finalPadString = String((0, _isNotUndefined["default"])(padString) ? padString : ' ');

  // return the original string, if targeted length is less than original strings length
  if (value.length >= finalLength) {
    return String(value);
  }
  finalLength -= value.length;
  if (finalLength > finalPadString.length) {
    var lenghtToPad = finalLength / finalPadString.length;
    // append to original to ensure we are longer than needed
    finalPadString += (0, _isFunction["default"])(String.prototype.repeat) ? finalPadString.repeat(lenghtToPad) : (0, _String["default"])(finalPadString, lenghtToPad);
  }
  return finalPadString.slice(0, finalLength) + String(value);
};
var _default = padStartPonyfill;
exports["default"] = _default;

/***/ }),

/***/ 50279:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _isNotFinite = _interopRequireDefault(__webpack_require__(61362));
var _isNegative = _interopRequireDefault(__webpack_require__(47494));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var repeat = function repeat(value, count) {
  var validCount = Number(count);
  if (validCount !== count) {
    validCount = 0;
  }
  if ((0, _isNegative["default"])(validCount)) {
    throw new RangeError('repeat count must be non-negative');
  }
  if ((0, _isNotFinite["default"])(validCount)) {
    throw new RangeError('repeat count must be less than infinity');
  }
  validCount = Math.floor(validCount);
  if (value.length === 0 || validCount === 0) {
    return '';
  }

  // Ensuring validCount is a 31-bit integer allows us to heavily optimize the
  // main part. But anyway, most current (August 2014) browsers can't handle
  // strings 1 << 28 chars or longer, so:
  // eslint-disable-next-line no-bitwise
  if (value.length * validCount >= 1 << 28) {
    throw new RangeError('repeat count must not overflow maximum string size');
  }
  var maxCount = value.length * validCount;
  validCount = Math.floor(Math.log(validCount) / Math.log(2));
  var result = value;
  while (validCount) {
    result += value;
    validCount -= 1;
  }
  result += result.substring(0, maxCount - result.length);
  return result;
};
var _default = repeat;
exports["default"] = _default;

/***/ }),

/***/ 80443:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isRegExp = _interopRequireDefault(__webpack_require__(18380));
var _escapeRegExp = _interopRequireDefault(__webpack_require__(74971));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var checkArguments = function checkArguments(searchValue, replaceValue, str) {
  if (str == null || searchValue == null || replaceValue == null) {
    throw TypeError('Input values must not be `null` or `undefined`');
  }
};
var checkValue = function checkValue(value, valueName) {
  if (typeof value !== 'string') {
    if (!(value instanceof String)) {
      throw TypeError("`".concat(valueName, "` must be a string"));
    }
  }
};
var checkSearchValue = function checkSearchValue(searchValue) {
  if (typeof searchValue !== 'string' && !(searchValue instanceof String) && !(searchValue instanceof RegExp)) {
    throw TypeError('`searchValue` must be a string or an regexp');
  }
};
var replaceAll = function replaceAll(searchValue, replaceValue, str) {
  checkArguments(searchValue, replaceValue, str);
  checkValue(str, 'str');
  checkValue(replaceValue, 'replaceValue');
  checkSearchValue(searchValue);
  var regexp = new RegExp((0, _isRegExp["default"])(searchValue) ? searchValue : (0, _escapeRegExp["default"])(searchValue), 'g');
  return (0, _ramda.replace)(regexp, replaceValue, str);
};
var _default = replaceAll;
exports["default"] = _default;

/***/ }),

/***/ 5167:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var trimStart = (0, _ramda.replace)(/[\s\uFEFF\xA0]+$/, '');
var _default = trimStart;
exports["default"] = _default;

/***/ }),

/***/ 32350:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var trimStart = (0, _ramda.replace)(/^[\s\uFEFF\xA0]+/, '');
var _default = trimStart;
exports["default"] = _default;

/***/ }),

/***/ 24775:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _invokeArgs = _interopRequireDefault(__webpack_require__(61583));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Invokes the method at path of object.
 *
 * @func invoke
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.31.0|v2.31.0}
 * @category Object
 * @sig Array -> Object -> *
 * @param {Array.<string|number>} path The path of the method to invoke
 * @param {Object} obj The object to query
 * @return {*}
 * @example
 *
 * RA.invoke(['random'], Math); //=> 0.5113253820009047
 */
var invoke = (0, _invokeArgs["default"])(_ramda.__, [], _ramda.__);
var _default = invoke;
exports["default"] = _default;

/***/ }),

/***/ 61583:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isNotFunction = _interopRequireDefault(__webpack_require__(23498));
var _isEmptyArray = _interopRequireDefault(__webpack_require__(54360));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Invokes the method at path of object with given arguments.
 *
 * @func invokeArgs
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.27.0|v2.27.0}
 * @category Object
 * @sig Array -> Array -> Object -> *
 * @param {Array.<string|number>} path The path of the method to invoke
 * @param {Array} args The arguments to invoke the method with
 * @param {Object} obj The object to query
 * @return {*}
 * @example
 *
 * RA.invokeArgs(['abs'], [-1], Math); //=> 1
 * RA.invokeArgs(['path', 'to', 'non-existent', 'method'], [-1], Math); //=> undefined
 */

var invokeArgs = (0, _ramda.curryN)(3, function (mpath, args, obj) {
  var method = (0, _ramda.path)(mpath, obj);
  var context = (0, _ramda.path)((0, _ramda.init)(mpath), obj);
  if ((0, _isNotFunction["default"])(method)) return undefined;
  if ((0, _isEmptyArray["default"])(mpath)) return undefined;
  var boundMethod = (0, _ramda.bind)(method, context);
  return (0, _ramda.apply)(boundMethod, args);
});
var _default = invokeArgs;
exports["default"] = _default;

/***/ }),

/***/ 57567:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if input value is `Array`.
 *
 * @func isArray
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.3.0|v0.3.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotArray|isNotArray}
 * @example
 *
 * RA.isArray([]); //=> true
 * RA.isArray(null); //=> false
 * RA.isArray({}); //=> false
 */
var isArray = (0, _ramda.curryN)(1, (0, _isFunction["default"])(Array.isArray) ? Array.isArray : (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('Array')));
var _default = isArray;
exports["default"] = _default;

/***/ }),

/***/ 50461:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isArray = _interopRequireDefault(__webpack_require__(57567));
var _isString = _interopRequireDefault(__webpack_require__(36851));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/* eslint-disable max-len */
/**
 * Tests whether or not an object is similar to an array.
 *
 * @func isArrayLike
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.9.0|v1.9.0}
 * @licence https://github.com/ramda/ramda/blob/master/LICENSE.txt
 * @category List
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @returns {boolean} `true` if `val` has a numeric length property and extreme indices defined; `false` otherwise.
 * @see {@link RA.isNotArrayLike|isNotArrayLike}

 * @example
 *
 * RA.isArrayLike([]); //=> true
 * RA.isArrayLike(true); //=> false
 * RA.isArrayLike({}); //=> false
 * RA.isArrayLike({length: 10}); //=> false
 * RA.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */
/* eslint-enable max-len */
var isArrayLike = (0, _ramda.curryN)(1, function (val) {
  if ((0, _isArray["default"])(val)) {
    return true;
  }
  if (!val) {
    return false;
  }
  if ((0, _isString["default"])(val)) {
    return false;
  }
  if (_typeof(val) !== 'object') {
    return false;
  }
  if (val.nodeType === 1) {
    return !!val.length;
  }
  if (val.length === 0) {
    return true;
  }
  if (val.length > 0) {
    return (0, _ramda.has)(0, val) && (0, _ramda.has)(val.length - 1, val);
  }
  return false;
});
var _default = isArrayLike;
/**
 The MIT License (MIT)

 Copyright (c) 2013-2016 Scott Sauyet and Michael Hurley

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/
exports["default"] = _default;

/***/ }),

/***/ 79503:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Checks if input value is `Async Function`.
 *
 * @func isAsyncFunction
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isFunction|isFunction}, {@link RA.isNotAsyncFunction|isNotAsyncFunction}, {@link RA.isGeneratorFunction|isGeneratorFunction}
 * @example
 *
 * RA.isAsyncFunction(async function test() { }); //=> true
 * RA.isAsyncFunction(null); //=> false
 * RA.isAsyncFunction(function test() { }); //=> false
 * RA.isAsyncFunction(() => {}); //=> false
 */
var isAsyncFunction = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('AsyncFunction')));
var _default = isAsyncFunction;
exports["default"] = _default;

/***/ }),

/***/ 68214:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Checks if value is a BigInt.
 *
 * @func isBigInt
 * @memberOf RA
 * @category Type
 * @since {@link https://char0n.github.io/ramda-adjunct/2.27.0|v2.27.0}
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @example
 *
 * RA.isBigInt(5); // => false
 * RA.isBigInt(Number.MAX_VALUE); // => false
 * RA.isBigInt(-Infinity); // => false
 * RA.isBigInt(10); // => false
 * RA.isBigInt(10n); // => true
 * RA.isBigInt(BitInt(9007199254740991)); // => true
 */
var isBigInt = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('BigInt')));
var _default = isBigInt;
exports["default"] = _default;

/***/ }),

/***/ 23338:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isFalse = _interopRequireDefault(__webpack_require__(30490));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Returns `true` if the given value is its type's empty value, `false`, `undefined`
 * as well as strings containing only whitespace characters; `false` otherwise.
 *
 * @func isBlank
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/3.1.0|v3.1.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link https://blog.appsignal.com/2018/09/11/differences-between-nil-empty-blank-and-present.html|Differences Between #nil?, #empty?, #blank?, and #present?}
 * @example
 *
 * RA.isBlank(''); //=> true
 * RA.isBlank('   '); //=> true
 * RA.isBlank('\t\n'); //=> true
 * RA.isBlank({}); //=> true
 * RA.isBlank(null); //=> true
 * RA.isBlank(undefined); //=> true
 * RA.isBlank([]); //=> true
 * RA.isBlank(false); //=> true
 * RA.isBlank('value'); //=> false
 * RA.isBlank({ foo: 'foo' }); //=> false
 * RA.isBlank([1, 2, 3]); //=> false
 * RA.isBlank(true); //=> false
 */
var isBlank = (0, _ramda.anyPass)([_isFalse["default"], _ramda.isNil, _ramda.isEmpty, (0, _ramda.test)(/^\s+$/gm)]);
var _default = isBlank;
exports["default"] = _default;

/***/ }),

/***/ 51843:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Checks if input value is `Boolean`.
 *
 * @func isBoolean
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.3.0|v0.3.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotBoolean|isNotBoolean}
 * @example
 *
 * RA.isBoolean(false); //=> true
 * RA.isBoolean(true); //=> true
 * RA.isBoolean(null); //=> false
 */
var isBoolean = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('Boolean')));
var _default = isBoolean;
exports["default"] = _default;

/***/ }),

/***/ 11606:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Checks if value is `Date` object.
 *
 * @func isDate
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.6.0|v0.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotDate|isNotDate}, {@link RA.isValidDate|isValidDate}, {@link RA.isNotValidDate|isNotValidDate}
 * @example
 *
 * RA.isDate(new Date()); //=> true
 * RA.isDate('1997-07-16T19:20+01:00'); //=> false
 */
var isDate = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('Date')));
var _default = isDate;
exports["default"] = _default;

/***/ }),

/***/ 54360:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isArray = _interopRequireDefault(__webpack_require__(57567));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if input value is an empty `Array`.
 *
 * @func isEmptyArray
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.4.0|v2.4.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotEmptyArray|isNotEmptyArray}
 * @example
 *
 * RA.isEmptyArray([]); // => true
 * RA.isEmptyArray([42]); // => false
 * RA.isEmptyArray({}); // => false
 * RA.isEmptyArray(null); // => false
 * RA.isEmptyArray(undefined); // => false
 * RA.isEmptyArray(42); // => false
 * RA.isEmptyArray('42'); // => false
 */
var isEmptyArray = (0, _ramda.both)(_isArray["default"], _ramda.isEmpty);
var _default = isEmptyArray;
exports["default"] = _default;

/***/ }),

/***/ 93614:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Checks if input value is an empty `String`.
 *
 * @func isEmptyString
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.4.0|v2.4.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotEmptyString|isNotEmptyString}
 * @example
 *
 * RA.isEmptyString(''); // => true
 * RA.isEmptyString('42'); // => false
 * RA.isEmptyString(new String('42')); // => false
 * RA.isEmptyString(new String('')); // => false
 * RA.isEmptyString([42]); // => false
 * RA.isEmptyString({}); // => false
 * RA.isEmptyString(null); // => false
 * RA.isEmptyString(undefined); // => false
 * RA.isEmptyString(42); // => false
 */
var isEmptyString = (0, _ramda.equals)('');
var _default = isEmptyString;
exports["default"] = _default;

/***/ }),

/***/ 38050:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`, `SyntaxError`, `TypeError` or `URIError` object.
 *
 * @func isError
 * @category Type
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.30.0|v2.30.0}
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean} Returns `true` if value is an error object, `false` otherwise
 * @example
 *
 * RA.isError(new Error()); //=> true
 * RA.isError(Error); //=> false
 * RA.isError(1); // => false
 */
var isError = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('Error')));
var _default = isError;
exports["default"] = _default;

/***/ }),

/***/ 95273:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isInteger = _interopRequireDefault(__webpack_require__(16399));
var _isOdd = _interopRequireDefault(__webpack_require__(86334));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if value is even integer number.
 * An even number is an integer which is "evenly divisible" by two.
 * Zero is an even number because zero divided by two equals zero,
 * which despite not being a natural number, is an integer.
 * Even numbers are either positive or negative.
 *
 * @func isEven
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.18.0|v1.18.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isOdd|isOdd}
 * @example
 *
 * RA.isEven(0); // => true
 * RA.isEven(1); // => false
 * RA.isEven(-Infinity); // => false
 * RA.isEven(4); // => true
 * RA.isEven(3); // => false
 */
var isEven = (0, _ramda.curryN)(1, (0, _ramda.both)(_isInteger["default"], (0, _ramda.complement)(_isOdd["default"])));
var _default = isEven;
exports["default"] = _default;

/***/ }),

/***/ 30490:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Checks if input value is the Boolean primitive `false`. Will return false for all values created
 * using the `Boolean` function as a constructor.
 *
 * @func isFalse
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.6.0|v2.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isTrue|isTrue}, {@link RA.isTruthy|isTruthy}, {@link RA.isFalsy|isFalsy}
 * @example
 *
 * RA.isFalse(false); // => true
 * RA.isFalse(Boolean(false)); // => true
 * RA.isFalse(true); // => false
 * RA.isFalse(0); // => false
 * RA.isFalse(''); // => false
 * RA.isFalse(null); // => false
 * RA.isFalse(undefined); // => false
 * RA.isFalse(NaN); // => false
 * RA.isFalse([]); // => false
 * RA.isFalse(new Boolean(false)); // => false
 */

var isFalse = (0, _ramda.curryN)(1, (0, _ramda.identical)(false));
var _default = isFalse;
exports["default"] = _default;

/***/ }),

/***/ 62893:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isTruthy = _interopRequireDefault(__webpack_require__(54459));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * A falsy value is a value that translates to false when evaluated in a Boolean context.
 * Falsy values are `false`, `0`, `""`, `null`, `undefined`, and `NaN`.
 *
 * @func isFalsy
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.2.0|v2.2..0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Falsy|falsy}, {@link RA.isTruthy|isTruthy}
 * @example
 *
 * RA.isFalsy(false); // => true
 * RA.isFalsy(0); // => true
 * RA.isFalsy(''); // => true
 * RA.isFalsy(null); // => true
 * RA.isFalsy(undefined); // => true
 * RA.isFalsy(NaN); // => true
 */
var isFalsy = (0, _ramda.complement)(_isTruthy["default"]);
var _default = isFalsy;
exports["default"] = _default;

/***/ }),

/***/ 12785:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.isFinitePonyfill = exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
var _Number = _interopRequireDefault(__webpack_require__(62684));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var isFinitePonyfill = (0, _ramda.curryN)(1, _Number["default"]);

/**
 * Checks whether the passed value is a finite `Number`.
 *
 * @func isFinite
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.7.0|v0.7.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotFinite|isNotFinite}
 * @example
 *
 * RA.isFinite(Infinity); //=> false
 * RA.isFinite(NaN); //=> false
 * RA.isFinite(-Infinity); //=> false
 *
 * RA.isFinite(0); // true
 * RA.isFinite(2e64); // true
 *
 * RA.isFinite('0');  // => false
 *                    // would've been true with global isFinite('0')
 * RA.isFinite(null); // => false
 *                    // would've been true with global isFinite(null)
 */
exports.isFinitePonyfill = isFinitePonyfill;
var _isFinite = (0, _isFunction["default"])(Number.isFinite) ? (0, _ramda.curryN)(1, (0, _ramda.bind)(Number.isFinite, Number)) : isFinitePonyfill;
var _default = _isFinite;
exports["default"] = _default;

/***/ }),

/***/ 1362:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isInteger = _interopRequireDefault(__webpack_require__(16399));
var _isFinite = _interopRequireDefault(__webpack_require__(12785));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks whether the passed value is a `float`.
 *
 * @func isFloat
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.14.0|v1.14.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotFloat|isNotFloat}
 * @example
 *
 * RA.isFloat(0); //=> false
 * RA.isFloat(1); //=> false
 * RA.isFloat(-100000); //=> false
 *
 * RA.isFloat(0.1);       //=> true
 * RA.isFloat(Math.PI);   //=> true
 *
 * RA.isFloat(NaN);       //=> false
 * RA.isFloat(Infinity);  //=> false
 * RA.isFloat(-Infinity); //=> false
 * RA.isFloat('10');      //=> false
 * RA.isFloat(true);      //=> false
 * RA.isFloat(false);     //=> false
 * RA.isFloat([1]);       //=> false
 */
var isFloat = (0, _ramda.both)(_isFinite["default"], (0, _ramda.complement)(_isInteger["default"]));
var _default = isFloat;
exports["default"] = _default;

/***/ }),

/***/ 29179:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isGeneratorFunction = _interopRequireDefault(__webpack_require__(43010));
var _isAsyncFunction = _interopRequireDefault(__webpack_require__(79503));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if input value is `Function`.
 *
 * @func isFunction
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotFunction|isNotFunction}, {@link RA.isAsyncFunction|isNotAsyncFunction}, {@link RA.isGeneratorFunction|isGeneratorFunction}
 * @example
 *
 * RA.isFunction(function test() { }); //=> true
 * RA.isFunction(function* test() { }); //=> true
 * RA.isFunction(async function test() { }); //=> true
 * RA.isFunction(() => {}); //=> true
 * RA.isFunction(null); //=> false
 * RA.isFunction('abc'); //=> false
 */
var isFunction = (0, _ramda.anyPass)([(0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('Function')), _isGeneratorFunction["default"], _isAsyncFunction["default"]]);
var _default = isFunction;
exports["default"] = _default;

/***/ }),

/***/ 43010:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Checks if input value is `Generator Function`.
 *
 * @func isGeneratorFunction
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isFunction|isFunction}, {@link RA.isAsyncFunction|isAsyncFunction}, {@link RA.isNotGeneratorFunction|isNotGeneratorFunction}
 * @example
 *
 * RA.isGeneratorFunction(function* test() { }); //=> true
 * RA.isGeneratorFunction(null); //=> false
 * RA.isGeneratorFunction(function test() { }); //=> false
 * RA.isGeneratorFunction(() => {}); //=> false
 */
var isGeneratorFunction = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('GeneratorFunction')));
var _default = isGeneratorFunction;
exports["default"] = _default;

/***/ }),

/***/ 43453:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isArray = _interopRequireDefault(__webpack_require__(57567));
var _isString = _interopRequireDefault(__webpack_require__(36851));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Determine if input value is an indexed data type.
 *
 * @func isIndexed
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.26.0|v2.26.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @example
 *
 * RA.isIndexed([1]) //=> true
 * RA.isIndexed('test') //=> true
 */

var isIndexed = (0, _ramda.curryN)(1, (0, _ramda.either)(_isString["default"], _isArray["default"]));
var _default = isIndexed;
exports["default"] = _default;

/***/ }),

/***/ 16399:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.isIntegerPonyfill = exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
var _Number = _interopRequireDefault(__webpack_require__(24058));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var isIntegerPonyfill = (0, _ramda.curryN)(1, _Number["default"]);

/**
 * Checks whether the passed value is an `integer`.
 *
 * @func isInteger
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.7.0|v0.7.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotInteger|isNotInteger}
 * @example
 *
 * RA.isInteger(0); //=> true
 * RA.isInteger(1); //=> true
 * RA.isInteger(-100000); //=> true
 *
 * RA.isInteger(0.1);       //=> false
 * RA.isInteger(Math.PI);   //=> false
 *
 * RA.isInteger(NaN);       //=> false
 * RA.isInteger(Infinity);  //=> false
 * RA.isInteger(-Infinity); //=> false
 * RA.isInteger('10');      //=> false
 * RA.isInteger(true);      //=> false
 * RA.isInteger(false);     //=> false
 * RA.isInteger([1]);       //=> false
 */
exports.isIntegerPonyfill = isIntegerPonyfill;
var isInteger = (0, _isFunction["default"])(Number.isInteger) ? (0, _ramda.curryN)(1, (0, _ramda.bind)(Number.isInteger, Number)) : isIntegerPonyfill;
var _default = isInteger;
exports["default"] = _default;

/***/ }),

/***/ 19554:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _toInteger = _interopRequireDefault(__webpack_require__(22242));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks whether the passed value is a signed 32 bit integer.
 *
 * @func isInteger32
 * @aliases isInt32
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.32.0|v2.32.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.toInteger32|toInteger32}
 * @example
 *
 * RA.isInteger32(0); //=> true
 * RA.isInteger32((-2) ** 31); //=> true
 *
 * RA.isInteger32(Infinity); //=> false
 * RA.isInteger32(NaN); //=> false
 * RA.isInteger32(2 ** 31); //=> false
 */
var isInteger32 = (0, _ramda.curryN)(1, function (val) {
  return (0, _toInteger["default"])(val) === val;
});
var _default = isInteger32;
exports["default"] = _default;

/***/ }),

/***/ 33953:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks whether the passed value is iterable.
 *
 * @func isIterable
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.18.0|v2.18.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol}
 * @return {boolean}
 * @example
 *
 * RA.isIterable(['arrays', 'are', 'iterable']); //=> true
 * RA.isIterable('strings are iterable, too'); //=> true
 * RA.isIterable((function* () {})()); //=> true (generator objects are both iterable and iterators)
 *
 * RA.isIterable({}); //=> false
 * RA.isIterable(-0); //=> false
 * RA.isIterable(null); //=> false
 * RA.isIterable(undefined); //=> false
 */
var isIterable = (0, _ramda.curryN)(1, function (val) {
  if (typeof Symbol === 'undefined') {
    return false;
  }
  return (0, _ramda.hasIn)(Symbol.iterator, Object(val)) && (0, _isFunction["default"])(val[Symbol.iterator]);
});
var _default = isIterable;
exports["default"] = _default;

/***/ }),

/***/ 62439:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Predicate for determining if a provided value is an instance of a Map.
 *
 * @func isMap
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isSet|isSet}}
 * @example
 *
 * RA.isMap(new Map()); //=> true
 * RA.isMap(new Map([[1, 2], [2, 1]])); //=> true
 * RA.isSet(new Set()); //=> false
 * RA.isSet(new Set([1,2]); //=> false
 * RA.isSet(new Object()); //=> false
 */

var isMap = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('Map')));
var _default = isMap;
exports["default"] = _default;

/***/ }),

/***/ 25475:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.isNaNPonyfill = exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
var _Number = _interopRequireDefault(__webpack_require__(41291));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var isNaNPonyfill = (0, _ramda.curryN)(1, _Number["default"]);

/**
 * Checks whether the passed value is `NaN` and its type is `Number`.
 * It is a more robust version of the original, global isNaN().
 *
 *
 * @func isNaN
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.6.0|v0.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotNaN|isNotNaN}
 * @example
 *
 * RA.isNaN(NaN); // => true
 * RA.isNaN(Number.NaN); // => true
 * RA.isNaN(0 / 0); // => true
 *
 * // e.g. these would have been true with global isNaN().
 * RA.isNaN('NaN'); // => false
 * RA.isNaN(undefined); // => false
 * RA.isNaN({}); // => false
 * RA.isNaN('blabla'); // => false
 *
 * RA.isNaN(true); // => false
 * RA.isNaN(null); // => false
 * RA.isNaN(37); // => false
 * RA.isNaN('37'); // => false
 * RA.isNaN('37.37'); // => false
 * RA.isNaN(''); // => false
 * RA.isNaN(' '); // => false
 */
exports.isNaNPonyfill = isNaNPonyfill;
var _isNaN = (0, _isFunction["default"])(Number.isNaN) ? (0, _ramda.curryN)(1, Number.isNaN) : isNaNPonyfill;
var _default = _isNaN;
exports["default"] = _default;

/***/ }),

/***/ 49362:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isInteger = _interopRequireDefault(__webpack_require__(16399));
var _isNegative = _interopRequireDefault(__webpack_require__(47494));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if value is a natural number.
 * Natural numbers correspond to all non-negative integers and 0.
 *
 * @func isNaturalNumber
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.29.0|v2.29.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @example
 *
 * RA.isNaturalNumber(5); // => true
 * RA.isNaturalNumber(Number.MAX_VALUE); // => true
 * RA.isNaturalNumber(0); // => true
 * RA.isNaturalNumber(-1); // => false
 * RA.isNaturalNumber(0.9); // => false
 */

var isNaturalNumber = (0, _ramda.curryN)(1, (0, _ramda.both)(_isInteger["default"], (0, _ramda.complement)(_isNegative["default"])));
var _default = isNaturalNumber;
exports["default"] = _default;

/***/ }),

/***/ 47494:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isNumber = _interopRequireDefault(__webpack_require__(3722));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if value is a negative `Number` primitive or object. Zero is not considered neither
 * positive or negative.
 *
 * @func isNegative
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.15.0|v1.15.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isPositive|isPositive}
 * @example
 *
 * RA.isNegative(-1); // => true
 * RA.isNegative(Number.MIN_VALUE); // => false
 * RA.isNegative(+Infinity); // => false
 * RA.isNegative(NaN); // => false
 * RA.isNegative('5'); // => false
 */
var isNegative = (0, _ramda.curryN)(1, (0, _ramda.both)(_isNumber["default"], (0, _ramda.gt)(0)));
var _default = isNegative;
exports["default"] = _default;

/***/ }),

/***/ 75262:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Checks if value is a negative zero (-0).
 *
 * @func isNegativeZero
 * @memberof RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see @see {@link RA.isPositiveZero|isPositiveZero}
 * @example
 *
 * RA.isNegativeZero(-0); //=> true
 * RA.isNegativeZero(+0); //=> false
 * RA.isNegativeZero(0); //=> false
 * RA.isNegativeZero(null); //=> false
 */
var isNegativeZero = (0, _ramda.curryN)(1, (0, _ramda.identical)(-0));
var _default = isNegativeZero;
exports["default"] = _default;

/***/ }),

/***/ 77208:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns `true` if the given value is its type's empty value, `null` or `undefined`.
 *
 * @func isNilOrEmpty
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.4.0|v0.4.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link http://ramdajs.com/docs/#isEmpty|R.isEmpty}, {@link http://ramdajs.com/docs/#isNil|R.isNil}
 * @example
 *
 * RA.isNilOrEmpty([1, 2, 3]); //=> false
 * RA.isNilOrEmpty([]); //=> true
 * RA.isNilOrEmpty(''); //=> true
 * RA.isNilOrEmpty(null); //=> true
 * RA.isNilOrEmpty(undefined): //=> true
 * RA.isNilOrEmpty({}); //=> true
 * RA.isNilOrEmpty({length: 0}); //=> false
 */
var isNilOrEmpty = (0, _ramda.curryN)(1, (0, _ramda.either)(_ramda.isNil, _ramda.isEmpty));
var _default = isNilOrEmpty;
exports["default"] = _default;

/***/ }),

/***/ 98688:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isNotEmpty = _interopRequireDefault(__webpack_require__(93848));
var _isArray = _interopRequireDefault(__webpack_require__(57567));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if input value is not an empty `Array`.
 *
 * @func isNonEmptyArray
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.4.0|v2.4.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isEmptyArray|isEmptyArray}
 * @example
 *
 * RA.isNonEmptyArray([42]); // => true
 * RA.isNonEmptyArray([]); // => false
 * RA.isNonEmptyArray({}); // => false
 * RA.isNonEmptyArray(null); // => false
 * RA.isNonEmptyArray(undefined); // => false
 * RA.isNonEmptyArray(42); // => false
 * RA.isNonEmptyArray('42'); // => false
 */
var isNonEmptyArray = (0, _ramda.both)(_isArray["default"], _isNotEmpty["default"]);
var _default = isNonEmptyArray;
exports["default"] = _default;

/***/ }),

/***/ 43211:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isString = _interopRequireDefault(__webpack_require__(36851));
var _isNotObj = _interopRequireDefault(__webpack_require__(75155));
var _isNotEmpty = _interopRequireDefault(__webpack_require__(93848));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if input value is not an empty `String`.
 *
 * @func isNonEmptyString
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.4.0|v2.4.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isEmptyString|isEmptyString}
 * @example
 *
 * RA.isNonEmptyString('42'); // => true
 * RA.isNonEmptyString(''); // => false
 * RA.isNonEmptyString(new String('42')); // => false
 * RA.isNonEmptyString(new String('')); // => false
 * RA.isNonEmptyString([42]); // => false
 * RA.isNonEmptyString({}); // => false
 * RA.isNonEmptyString(null); // => false
 * RA.isNonEmptyString(undefined); // => false
 * RA.isNonEmptyString(42); // => false
 */
var isNonEmptyString = (0, _ramda.allPass)([_isString["default"], _isNotObj["default"], _isNotEmpty["default"]]);
var _default = isNonEmptyString;
exports["default"] = _default;

/***/ }),

/***/ 6793:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isNumber = _interopRequireDefault(__webpack_require__(3722));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if value is a non-negative `Number` primitive or object. This includes all positive
 * numbers and zero.
 *
 * @func isNonNegative
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.6.0|v2.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isPositive|isPositive}, {@link RA.isNonPositive|isNonPositive}
 * @example
 *
 * RA.isNonNegative(0); // => true
 * RA.isNonNegative(1); // => true
 * RA.isNonNegative(Infinity); // => true
 * RA.isNonNegative(Number.MAX_VALUE); // => true
 *
 * RA.isNonNegative(-Infinity); // => false
 * RA.isNonNegative(Number.MIN_VALUE); // => false
 * RA.isNonNegative(NaN); // => false
 */
var isNonNegative = (0, _ramda.curryN)(1, (0, _ramda.both)(_isNumber["default"], (0, _ramda.flip)(_ramda.gte)(0)));
var _default = isNonNegative;
exports["default"] = _default;

/***/ }),

/***/ 51667:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isNumber = _interopRequireDefault(__webpack_require__(3722));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if value is a non-positive `Number` primitive or object. This includes all negative
 * numbers and zero.
 *
 * @func isNonPositive
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.6.0|v2.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNegative|isNegative}, {@link RA.isNonNegative|isNonNegative}
 * @example
 *
 * RA.isNonPositive(0); // => true
 * RA.isNonPositive(-1); // => true
 * RA.isNonPositive(-Infinity); // => true
 * RA.isNonPositive(Number.MIN_VALUE); // => true
 *
 * RA.isNonPositive(Infinity); // => false
 * RA.isNonPositive(Number.MAX_VALUE); // => false
 * RA.isNonPositive(NaN); // => false
 */
var isNonPositive = (0, _ramda.curryN)(1, (0, _ramda.both)(_isNumber["default"], (0, _ramda.flip)(_ramda.lte)(0)));
var _default = isNonPositive;
exports["default"] = _default;

/***/ }),

/***/ 52974:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isArray = _interopRequireDefault(__webpack_require__(57567));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if input value is complement of `Array`
 *
 * @func isNotArray
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.3.0|v0.3.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isArray|isArray}
 * @example
 *
 * RA.isNotArray([]); //=> false
 * RA.isNotArray(null); //=> true
 * RA.isNotArray({}); //=> true
 */
var isNotArray = (0, _ramda.complement)(_isArray["default"]);
var _default = isNotArray;
exports["default"] = _default;

/***/ }),

/***/ 86997:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isArrayLike = _interopRequireDefault(__webpack_require__(50461));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Tests whether or not an object is similar to an array.
 *
 * @func isNotArrayLike
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isArrayLike|isArrayLike}
 * @example
 *
 * RA.isNotArrayLike([]); //=> false
 * RA.isNotArrayLike(true); //=> true
 * RA.isNotArrayLike({}); //=> true
 * RA.isNotArrayLike({length: 10}); //=> true
 * RA.isNotArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> false
 */
var isNotArrayLike = (0, _ramda.complement)(_isArrayLike["default"]);
var _default = isNotArrayLike;
exports["default"] = _default;

/***/ }),

/***/ 87730:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isAsyncFunction = _interopRequireDefault(__webpack_require__(79503));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* eslint-disable max-len */
/**
 * Checks if input value is complement of `Async Function`
 *
 * @func isNotAsyncFunction
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isFunction|isFunction}, {@link RA.isAsyncFunction|isAsyncFunction}, {@link RA.isGeneratorFunction|isGeneratorFunction}
 * @example
 *
 * RA.isNotAsyncFunction(async function test() { }); //=> false
 * RA.isNotAsyncFunction(null); //=> true
 * RA.isNotAsyncFunction(function test() { }); //=> true
 * RA.isNotAsyncFunction(() => {}); //=> true
 */
/* eslint-enable max-len */
var isNotAsyncFunction = (0, _ramda.complement)(_isAsyncFunction["default"]);
var _default = isNotAsyncFunction;
exports["default"] = _default;

/***/ }),

/***/ 34098:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isBoolean = _interopRequireDefault(__webpack_require__(51843));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if input value is complement of `Boolean`.
 *
 * @func isNotBoolean
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.3.0|v0.3.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isBoolean|isBoolean}
 * @example
 *
 * RA.isNotBoolean(false); //=> false
 * RA.isNotBoolean(true); //=> false
 * RA.isNotBoolean(null); //=> true
 */
var isNotBoolean = (0, _ramda.complement)(_isBoolean["default"]);
var _default = isNotBoolean;
exports["default"] = _default;

/***/ }),

/***/ 72856:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isDate = _interopRequireDefault(__webpack_require__(11606));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if value is complement of `Date` object.
 *
 * @func isNotDate
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.6.0|v0.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isDate|isDate}
 * @example
 *
 * RA.isNotDate(new Date()); //=> false
 * RA.isNotDate('1997-07-16T19:20+01:00'); //=> true
 */
var isNotDate = (0, _ramda.complement)(_isDate["default"]);
var _default = isNotDate;
exports["default"] = _default;

/***/ }),

/***/ 93848:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns true if the given value is not its type's empty value; `false` otherwise.
 *
 * @func isNotEmpty
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.4.0|v0.4.0}
 * @category Logic
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link http://ramdajs.com/docs/#isEmpty|R.isEmpty}
 * @example
 *
 * RA.isNotEmpty([1, 2, 3]); //=> true
 * RA.isNotEmpty([]); //=> false
 * RA.isNotEmpty(''); //=> false
 * RA.isNotEmpty(null); //=> true
 * RA.isNotEmpty(undefined): //=> true
 * RA.isNotEmpty({}); //=> false
 * RA.isNotEmpty({length: 0}); //=> true
 */
var isNotEmpty = (0, _ramda.complement)(_ramda.isEmpty);
var _default = isNotEmpty;
exports["default"] = _default;

/***/ }),

/***/ 61362:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isFinite2 = _interopRequireDefault(__webpack_require__(12785));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks whether the passed value is complement of finite `Number`.
 *
 *
 * @func isNotFinite
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.7.0|v0.7.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isFinite|isFinite}
 * @example
 *
 * RA.isNotFinite(Infinity); //=> true
 * RA.isNotFinite(NaN); //=> true
 * RA.isNotFinite(-Infinity); //=> true
 *
 * RA.isNotFinite(0); // false
 * RA.isNotFinite(2e64); // false
 *
 * RA.isNotFinite('0');  // => true
 * RA.isNotFinite(null); // => true
 */
var isNotFinite = (0, _ramda.complement)(_isFinite2["default"]);
var _default = isNotFinite;
exports["default"] = _default;

/***/ }),

/***/ 25044:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isFloat = _interopRequireDefault(__webpack_require__(1362));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks whether the passed value is complement of a `float`.
 *
 * @func isNotFloat
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.14.0|v1.14.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isFloat|isFloat}
 * @example
 *
 * RA.isNotFloat(0); //=> true
 * RA.isNotFloat(1); //=> true
 * RA.isNotFloat(-100000); //=> true
 *
 * RA.isNotFloat(0.1);       //=> false
 * RA.isNotFloat(Math.PI);   //=> false
 *
 * RA.isNotFloat(NaN);       //=> true
 * RA.isNotFloat(Infinity);  //=> true
 * RA.isNotFloat(-Infinity); //=> true
 * RA.isNotFloat('10');      //=> true
 * RA.isNotFloat(true);      //=> true
 * RA.isNotFloat(false);     //=> true
 * RA.isNotFloat([1]);       //=> true
 */
var isNotFloat = (0, _ramda.curryN)(1, (0, _ramda.complement)(_isFloat["default"]));
var _default = isNotFloat;
exports["default"] = _default;

/***/ }),

/***/ 23498:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* eslint-disable max-len */
/**
 * Checks if input value is complement of `Function`.
 *
 * @func isNotFunction
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isFunction|isFunction}, {@link RA.isAsyncFunction|isNotAsyncFunction}, {@link RA.isGeneratorFunction|isGeneratorFunction}
 * @example
 *
 * RA.isNotFunction(function test() { }); //=> false
 * RA.isNotFunction(function* test() { }); //=> false
 * RA.isNotFunction(async function test() { }); //=> false
 * RA.isNotFunction(() => {}); //=> false
 * RA.isNotFunction(null); //=> true
 * RA.isNotFunction('abc'); //=> true
 */
/* eslint-enable max-len */
var isNotFunction = (0, _ramda.complement)(_isFunction["default"]);
var _default = isNotFunction;
exports["default"] = _default;

/***/ }),

/***/ 94220:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isGeneratorFunction = _interopRequireDefault(__webpack_require__(43010));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* eslint-disable max-len */
/**
 * Checks if input value is complement of `Generator Function`
 *
 * @func isNotGeneratorFunction
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isFunction|isFunction}, {@link RA.isAsyncFunction|isAsyncFunction}, {@link RA.isGeneratorFunction|isGeneratorFunction}
 * @example
 *
 * RA.isNotGeneratorFunction(function* test() { }); //=> false
 * RA.isNotGeneratorFunction(null); //=> true
 * RA.isNotGeneratorFunction(function test() { }); //=> true
 * RA.isNotGeneratorFunction(() => {}); //=> true
 */
/* eslint-enable max-len */
var isNotGeneratorFunction = (0, _ramda.complement)(_isGeneratorFunction["default"]);
var _default = isNotGeneratorFunction;
exports["default"] = _default;

/***/ }),

/***/ 81655:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isInteger = _interopRequireDefault(__webpack_require__(16399));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks whether the passed value is complement of an `integer`.
 *
 *
 * @func isNotInteger
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.7.0|v0.7.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isInteger|isInteger}
 * @example
 *
 * RA.isNotInteger(0); //=> false
 * RA.isNotInteger(1); //=> false
 * RA.isNotInteger(-100000); //=> false
 *
 * RA.isNotInteger(0.1);       //=> true
 * RA.isNotInteger(Math.PI);   //=> true
 *
 * RA.isNotInteger(NaN);       //=> true
 * RA.isNotInteger(Infinity);  //=> true
 * RA.isNotInteger(-Infinity); //=> true
 * RA.isNotInteger('10');      //=> true
 * RA.isNotInteger(true);      //=> true
 * RA.isNotInteger(false);     //=> true
 * RA.isNotInteger([1]);       //=> true
 */
var isNotInteger = (0, _ramda.complement)(_isInteger["default"]);
var _default = isNotInteger;
exports["default"] = _default;

/***/ }),

/***/ 52274:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isMap = _interopRequireDefault(__webpack_require__(62439));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if value is complement of `Map` object.
 *
 * @func isNotMap
 * @memberOf RA
 * @category Type
 * @since {@link https://char0n.github.io/ramda-adjunct/2.27.0|v2.27.0}
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isMap|isMap}
 * @example
 *
 * RA.isNotMap(new Map()); //=> false
 * RA.isNotMap(new Map([[1, 2], [2, 1]])); //=> false
 * RA.isNotMap(new Set()); //=> true
 * RA.isNotMap({}); //=> true
 * RA.isNotMap(12); //=> true
 */

var isNotMap = (0, _ramda.complement)(_isMap["default"]);
var _default = isNotMap;
exports["default"] = _default;

/***/ }),

/***/ 42428:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isNaN2 = _interopRequireDefault(__webpack_require__(25475));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks whether the passed value is complement of `NaN` and its type is not `Number`.
 *
 * @func isNotNaN
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.6.0|v0.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNaN|isNaN}
 * @example
 *
 * RA.isNotNaN(NaN); // => false
 * RA.isNotNaN(Number.NaN); // => false
 * RA.isNotNaN(0 / 0); // => false
 *
 * RA.isNotNaN('NaN'); // => true
 * RA.isNotNaN(undefined); // => true
 * RA.isNotNaN({}); // => true
 * RA.isNotNaN('blabla'); // => true
 *
 * RA.isNotNaN(true); // => true
 * RA.isNotNaN(null); // => true
 * RA.isNotNaN(37); // => true
 * RA.isNotNaN('37'); // => true
 * RA.isNotNaN('37.37'); // => true
 * RA.isNotNaN(''); // => true
 * RA.isNotNaN(' '); // => true
 */
var isNotNaN = (0, _ramda.complement)(_isNaN2["default"]);
var _default = isNotNaN;
exports["default"] = _default;

/***/ }),

/***/ 18210:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Checks if input value is complement of `null` or `undefined`.
 *
 * @func isNotNil
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.3.0|v0.3.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link http://ramdajs.com/docs/#isNil|R.isNil}
 * @example
 *
 * RA.isNotNil(null); //=> false
 * RA.isNotNil(undefined); //=> false
 * RA.isNotNil(0); //=> true
 * RA.isNotNil([]); //=> true
 */
var isNotNil = (0, _ramda.complement)(_ramda.isNil);
var _default = isNotNil;
exports["default"] = _default;

/***/ }),

/***/ 59723:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isNilOrEmpty = _interopRequireDefault(__webpack_require__(77208));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Returns `false` if the given value is its type's empty value, `null` or `undefined`.
 *
 * @func isNotNilOrEmpty
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.18.0|v2.18.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNilOrEmpty|isNilOrEmpty}
 * @example
 *
 * RA.isNotNilOrEmpty([1, 2, 3]); //=> true
 * RA.isNotNilOrEmpty([]); //=> false
 * RA.isNotNilOrEmpty(''); //=> false
 * RA.isNotNilOrEmpty(null); //=> false
 * RA.isNotNilOrEmpty(undefined): //=> false
 * RA.isNotNilOrEmpty({}); //=> false
 * RA.isNotNilOrEmpty({length: 0}); //=> true
 */
var isNotNilOrEmpty = (0, _ramda.complement)(_isNilOrEmpty["default"]);
var _default = isNotNilOrEmpty;
exports["default"] = _default;

/***/ }),

/***/ 14533:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isNull = _interopRequireDefault(__webpack_require__(77553));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if input value is complement of `null`.
 *
 * @func isNotNull
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.1.0|v0.1.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNull|isNull}
 * @example
 *
 * RA.isNotNull(1); //=> true
 * RA.isNotNull(undefined); //=> true
 * RA.isNotNull(null); //=> false
 */
var isNotNull = (0, _ramda.complement)(_isNull["default"]);
var _default = isNotNull;
exports["default"] = _default;

/***/ }),

/***/ 29011:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isNumber = _interopRequireDefault(__webpack_require__(3722));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if value is a complement of `Number` primitive or object.
 *
 * @func isNotNumber
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.6.0|v0.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNumber|isNumber}
 * @example
 *
 * RA.isNotNumber(5); // => false
 * RA.isNotNumber(Number.MAX_VALUE); // => false
 * RA.isNotNumber(-Infinity); // => false
 * RA.isNotNumber('5'); // => true
 */
var isNotNumber = (0, _ramda.complement)(_isNumber["default"]);
var _default = isNotNumber;
exports["default"] = _default;

/***/ }),

/***/ 75155:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isObj = _interopRequireDefault(__webpack_require__(82806));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* eslint-disable max-len */
/**
 * Checks if input value is complement of language type of `Object`.
 *
 * @func isNotObj
 * @aliases isNotObject
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isObj|isObj}, {@link RA.isObjLike|isObjLike}, {@link RA.isPlainObj|isPlainObj}
 * @example
 *
 * RA.isNotObj({}); //=> false
 * RA.isNotObj([]); //=> false
 * RA.isNotObj(() => {}); //=> false
 * RA.isNotObj(null); //=> true
 * RA.isNotObj(undefined); //=> true
 */
/* eslint-enable max-len */
var isNotObj = (0, _ramda.complement)(_isObj["default"]);
var _default = isNotObj;
exports["default"] = _default;

/***/ }),

/***/ 88177:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isObjLike = _interopRequireDefault(__webpack_require__(79685));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* eslint-disable max-len */
/**
 * Checks if value is not object-like. A value is object-like if it's not null and has a typeof result of "object".
 *
 * @func isNotObjLike
 * @aliases isNotObjectLike
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isObjLike|isObjLike}, {@link RA.isObj|isObj}, {@link RA.isPlainObj|isPlainObj}
 * @example
 *
 * RA.isNotObjLike({}); //=> false
 * RA.isNotObjLike([]); //=> false
 * RA.isNotObjLike(() => {}); //=> true
 * RA.isNotObjLike(null); //=> true
 * RA.isNotObjLike(undefined); //=> true
 */
/* eslint-enable max-len */
var isNotObjLike = (0, _ramda.complement)(_isObjLike["default"]);
var _default = isNotObjLike;
exports["default"] = _default;

/***/ }),

/***/ 24559:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isPair = _interopRequireDefault(__webpack_require__(14653));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if input value is complement of a pair.
 *
 * @func isNotPair
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|v1.19.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link http://ramdajs.com/docs/#pair|R.pair}, {@link RA.isPair|isPair}
 * @example
 *
 * RA.isNotPair([]); // => true
 * RA.isNotPair([0]); // => true
 * RA.isNotPair([0, 1]); // => false
 * RA.isNotPair([0, 1, 2]); // => true
 * RA.isNotPair({0: 0, 1: 1}); // => true
 * RA.isNotPair({foo: 0, bar: 0}); // => true
 */
var isNotPair = (0, _ramda.complement)(_isPair["default"]);
var _default = isNotPair;
exports["default"] = _default;

/***/ }),

/***/ 56240:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isPlainObj = _interopRequireDefault(__webpack_require__(63252));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* eslint-disable max-len */
/**
 * Check to see if an object is a not plain object (created using `{}`, `new Object()` or `Object.create(null)`).
 *
 * @func isNotPlainObj
 * @aliases isNotPlainObject
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isPlainObj|isPlainObj}, {@link RA.isObjLike|isObjLike}, {@link RA.isObj|isObj}
 * @example
 *
 * class Bar {
 *   constructor() {
 *     this.prop = 'value';
 *   }
 * }
 *
 * RA.isNotPlainObj(new Bar()); //=> true
 * RA.isNotPlainObj({ prop: 'value' }); //=> false
 * RA.isNotPlainObj(['a', 'b', 'c']); //=> true
 * RA.isNotPlainObj(Object.create(null); //=> false
 * RA.isNotPlainObj(new Object()); //=> false
 */
/* eslint-enable max-len */
var isNotPlainObj = (0, _ramda.complement)(_isPlainObj["default"]);
var _default = isNotPlainObj;
exports["default"] = _default;

/***/ }),

/***/ 40105:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isPrimitive = _interopRequireDefault(__webpack_require__(79541));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if value is not a primitive data type. There are 6 primitive data types: `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol` and a special case of `null`.
 *
 * @func isNotPrimitive
 * @memberOf RA
 * @category Type
 * @sig * -> Boolean
 * @since {@link https://char0n.github.io/ramda-adjunct/2.32.0|v2.32.0}
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isPrimitive|isPrimitive}, {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_values|MDN Primitive values}, {@link https://developer.mozilla.org/en-US/docs/Glossary/Primitive|MDN Primitive}
 * @example
 *
 * RA.isNotPrimitive(new String("string")); //=> true
 * RA.isNotPrimitive(new Number(1)); //=> true
 * RA.isNotPrimitive("string"); //=> false
 * RA.isNotPrimitive(1); //=> false
 */

var isNotPrimitive = (0, _ramda.curryN)(1, (0, _ramda.complement)(_isPrimitive["default"]));
var _default = isNotPrimitive;
exports["default"] = _default;

/***/ }),

/***/ 80891:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isRegExp = _interopRequireDefault(__webpack_require__(18380));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if value is complement of `RegExp` object.
 *
 * @func isNotRegExp
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.5.0|v2.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isRegExp|isRegExp}
 * @example
 *
 * RA.isNotRegExp(1); //=> true
 * RA.isNotRegExp(/(?:)/); //=> false
 * RA.isNotRegExp(new RegExp()); //=> false
 */
var isNotRegExp = (0, _ramda.complement)(_isRegExp["default"]);
var _default = isNotRegExp;
exports["default"] = _default;

/***/ }),

/***/ 98043:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isSet = _interopRequireDefault(__webpack_require__(39962));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if value is complement of `Set` object.
 *
 * @func isNotSet
 * @memberOf RA
 * @category Type
 * @since {@link https://char0n.github.io/ramda-adjunct/2.27.0|v2.27.0}
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isSet|isSet}
 * @example
 *
 * RA.isNotSet(new Map()); //=> true
 * RA.isNotSet(new Set()); //=> false
 * RA.isNotSet(new Set([1,2]); //=> false
 * RA.isNotSet(new Object()); //=> true
 */

var isNotSet = (0, _ramda.complement)(_isSet["default"]);
var _default = isNotSet;
exports["default"] = _default;

/***/ }),

/***/ 84763:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isString = _interopRequireDefault(__webpack_require__(36851));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if input value is complement of `String`.
 *
 * @func isNotString
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.4.0|v0.4.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isString|isString}
 * @example
 *
 * RA.isNotString('abc'); //=> false
 * RA.isNotString(1); //=> true
 */
var isNotString = (0, _ramda.complement)(_isString["default"]);
var _default = isNotString;
exports["default"] = _default;

/***/ }),

/***/ 50384:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isUndefined = _interopRequireDefault(__webpack_require__(47078));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if input value is complement `undefined`.
 *
 * @func isNotUndefined
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.0.1|v0.0.1}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isUndefined|isUndefined}
 * @example
 *
 * RA.isNotUndefined(1); //=> true
 * RA.isNotUndefined(undefined); //=> false
 * RA.isNotUndefined(null); //=> true
 */
var isNotUndefined = (0, _ramda.complement)(_isUndefined["default"]);
var _default = isNotUndefined;
exports["default"] = _default;

/***/ }),

/***/ 82827:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isValidDate = _interopRequireDefault(__webpack_require__(62891));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if value is complement of valid `Date` object.
 *
 * @func isNotValidDate
 * @aliases isInvalidDate
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.8.0|v1.8.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isValidDate|isValidDate}, {@link RA.isDate|isDate}, {@link RA.isNotDate|isNotDate}
 * @example
 *
 * RA.isNotValidDate(new Date()); //=> false
 * RA.isNotValidDate(new Date('a')); //=> true
 */
var isNotValidDate = (0, _ramda.complement)(_isValidDate["default"]);
var _default = isNotValidDate;
exports["default"] = _default;

/***/ }),

/***/ 24590:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isValidNumber = _interopRequireDefault(__webpack_require__(56680));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if value is not a valid `Number`. A valid `Number` is a number that is not `NaN`,
 * `Infinity` or `-Infinity`.
 *
 * @func isNotValidNumber
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.2.0|v2.2.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isValidNumber|isValidNumber}
 * @example
 *
 * RA.isNotValidNumber(1); //=> false
 * RA.isNotValidNumber(''); //=> true
 * RA.isNotValidNumber(NaN); //=> true
 * RA.isNotValidNumber(Infinity); //=> true
 * RA.isNotValidNumber(-Infinity); //=> true
 */
var isNotValidNumber = (0, _ramda.complement)(_isValidNumber["default"]);
var _default = isNotValidNumber;
exports["default"] = _default;

/***/ }),

/***/ 77553:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Checks if input value is `null`.
 *
 * @func isNull
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.1.0|v0.1.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotNull|isNotNull}
 * @example
 *
 * RA.isNull(1); //=> false
 * RA.isNull(undefined); //=> false
 * RA.isNull(null); //=> true
 */
var isNull = (0, _ramda.equals)(null);
var _default = isNull;
exports["default"] = _default;

/***/ }),

/***/ 3722:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Checks if value is a `Number` primitive or object.
 *
 * @func isNumber
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.6.0|v0.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotNumber|isNotNumber}
 * @example
 *
 * RA.isNumber(5); // => true
 * RA.isNumber(Number.MAX_VALUE); // => true
 * RA.isNumber(-Infinity); // => true
 * RA.isNumber(NaN); // => true
 * RA.isNumber('5'); // => false
 */
var isNumber = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('Number')));
var _default = isNumber;
exports["default"] = _default;

/***/ }),

/***/ 82806:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isNotNull = _interopRequireDefault(__webpack_require__(14533));
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
var _isOfTypeObject = _interopRequireDefault(__webpack_require__(42374));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* eslint-disable max-len */
/**
 * Checks if input value is language type of `Object`.
 *
 * @func isObj
 * @aliases isObject
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotObj|isNotObj}, {@link RA.isObjLike|isObjLike}, {@link RA.isPlainObj|isPlainObj}
 * @example
 *
 * RA.isObj({}); //=> true
 * RA.isObj([]); //=> true
 * RA.isObj(() => {}); //=> true
 * RA.isObj(null); //=> false
 * RA.isObj(undefined); //=> false
 */
/* eslint-enable max-len */
var isObj = (0, _ramda.curryN)(1, (0, _ramda.both)(_isNotNull["default"], (0, _ramda.either)(_isOfTypeObject["default"], _isFunction["default"])));
var _default = isObj;
exports["default"] = _default;

/***/ }),

/***/ 79685:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isNotNull = _interopRequireDefault(__webpack_require__(14533));
var _isOfTypeObject = _interopRequireDefault(__webpack_require__(42374));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* eslint-disable max-len */
/**
 * Checks if value is object-like. A value is object-like if it's not null and has a typeof result of "object".
 *
 * @func isObjLike
 * @aliases isObjectLike
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotObjLike|isNotObjLike}, {@link RA.isObj|isObj}, {@link RA.isPlainObj|isPlainObj}
 * @example
 *
 * RA.isObjLike({}); //=> true
 * RA.isObjLike([]); //=> true
 * RA.isObjLike(() => {}); //=> false
 * RA.isObjLike(null); //=> false
 * RA.isObjLike(undefined); //=> false
 */
/* eslint-enable max-len */
var isObjLike = (0, _ramda.curryN)(1, (0, _ramda.both)(_isNotNull["default"], _isOfTypeObject["default"]));
var _default = isObjLike;
exports["default"] = _default;

/***/ }),

/***/ 86334:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isInteger = _interopRequireDefault(__webpack_require__(16399));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if value is odd integer number.
 * An odd number is an integer which is not a multiple DIVISIBLE of two.
 *
 * @func isOdd
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.18.0|v1.18.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isEven|isEven}
 * @example
 *
 * RA.isOdd(1); // => true
 * RA.isOdd(-Infinity); // => false
 * RA.isOdd(4); // => false
 * RA.isOdd(3); // => true
 */
var isOdd = (0, _ramda.curryN)(1, (0, _ramda.both)(_isInteger["default"], (0, _ramda.pipe)((0, _ramda.flip)(_ramda.modulo)(2), (0, _ramda.complement)(_ramda.equals)(0))));
var _default = isOdd;
exports["default"] = _default;

/***/ }),

/***/ 14653:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isArray = _interopRequireDefault(__webpack_require__(57567));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if input value is a pair.
 *
 * @func isPair
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|v1.19.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link http://ramdajs.com/docs/#pair|R.pair}, {@link RA.isNotPair|isNotPair}
 * @example
 *
 * RA.isPair([]); // => false
 * RA.isPair([0]); // => false
 * RA.isPair([0, 1]); // => true
 * RA.isPair([0, 1, 2]); // => false
 * RA.isPair({ 0: 0, 1: 1 }); // => false
 * RA.isPair({ foo: 0, bar: 0 }); // => false
 */
var isPair = (0, _ramda.curryN)(1, (0, _ramda.both)(_isArray["default"], (0, _ramda.pipe)(_ramda.length, (0, _ramda.equals)(2))));
var _default = isPair;
exports["default"] = _default;

/***/ }),

/***/ 63252:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isNull = _interopRequireDefault(__webpack_require__(77553));
var _isObjLike = _interopRequireDefault(__webpack_require__(79685));
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var isObject = (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('Object'));
var isObjectConstructor = (0, _ramda.pipe)(_ramda.toString, (0, _ramda.equals)((0, _ramda.toString)(Object)));
var hasObjectConstructor = (0, _ramda.pathSatisfies)((0, _ramda.both)(_isFunction["default"], isObjectConstructor), ['constructor']);

/* eslint-disable max-len */
/**
 * Check to see if an object is a plain object (created using `{}`, `new Object()` or `Object.create(null)`).
 *
 * @func isPlainObj
 * @aliases isPlainObject
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotPlainObj|isNotPlainObj}, {@link RA.isObjLike|isObjLike}, {@link RA.isObj|isObj}
 * @example
 *
 * class Bar {
 *   constructor() {
 *     this.prop = 'value';
 *   }
 * }
 *
 * RA.isPlainObj(new Bar()); //=> false
 * RA.isPlainObj({ prop: 'value' }); //=> true
 * RA.isPlainObj(['a', 'b', 'c']); //=> false
 * RA.isPlainObj(Object.create(null); //=> true
 * RA.isPlainObj(new Object()); //=> true
 */
/* eslint-enable max-len */
var isPlainObj = (0, _ramda.curryN)(1, function (val) {
  if (!(0, _isObjLike["default"])(val) || !isObject(val)) {
    return false;
  }
  var proto = Object.getPrototypeOf(val);
  if ((0, _isNull["default"])(proto)) {
    return true;
  }
  return hasObjectConstructor(proto);
});
var _default = isPlainObj;
exports["default"] = _default;

/***/ }),

/***/ 50282:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isNumber = _interopRequireDefault(__webpack_require__(3722));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if value is a positive `Number` primitive or object. Zero is not considered positive.
 *
 * @func isPositive
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.15.0|v1.15.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNegative|isNegative}
 * @example
 *
 * RA.isPositive(1); // => true
 * RA.isPositive(Number.MAX_VALUE); // => true
 * RA.isPositive(-Infinity); // => false
 * RA.isPositive(NaN); // => false
 * RA.isPositive('5'); // => false
 */
var isPositive = (0, _ramda.both)(_isNumber["default"], (0, _ramda.lt)(0));
var _default = isPositive;
exports["default"] = _default;

/***/ }),

/***/ 2947:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Checks if value is a positive zero (+0).
 *
 * @func isPositiveZero
 * @memberof RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNegativeZero|isNegativeZero}
 * @example
 *
 * RA.isPositiveZero(+0); //=> true
 * RA.isPositiveZero(0); //=> true
 * RA.isPositiveZero(-0); //=> false
 * RA.isPositiveZero(null); //=> false
 */
var isPositiveZero = (0, _ramda.curryN)(1, (0, _ramda.identical)(+0));
var _default = isPositiveZero;
exports["default"] = _default;

/***/ }),

/***/ 79541:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isNotObj = _interopRequireDefault(__webpack_require__(75155));
var _isString = _interopRequireDefault(__webpack_require__(36851));
var _isNumber = _interopRequireDefault(__webpack_require__(3722));
var _isBigInt = _interopRequireDefault(__webpack_require__(68214));
var _isBoolean = _interopRequireDefault(__webpack_require__(51843));
var _isUndefined = _interopRequireDefault(__webpack_require__(47078));
var _isNull = _interopRequireDefault(__webpack_require__(77553));
var _isSymbol = _interopRequireDefault(__webpack_require__(53220));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if value is a primitive data type. There are 6 primitive data types: `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol` and a special case of `null`.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Primitive_values
 * for definition of what sub-types comprise a primitive.
 *
 * @func isPrimitive
 * @memberOf RA
 * @category Type
 * @sig * -> Boolean
 * @since {@link https://char0n.github.io/ramda-adjunct/2.32.0|v2.32.0}
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotPrimitive|isNotPrimitive}, {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_values|MDN Primitive values}, {@link https://developer.mozilla.org/en-US/docs/Glossary/Primitive|MDN Primitive}
 * @example
 *
 * RA.isPrimitive("string"); //=> true
 * RA.isPrimitive(1); //=> true
 * RA.isPrimitive(new String("string")); //=> false
 * RA.isPrimitive(new Number(1)); //=> false
 */

var isPrimitive = (0, _ramda.both)(_isNotObj["default"], (0, _ramda.anyPass)([_isString["default"], _isNumber["default"], _isBigInt["default"], _isBoolean["default"], _isUndefined["default"], _isNull["default"], _isSymbol["default"]]));
var _default = isPrimitive;
exports["default"] = _default;

/***/ }),

/***/ 92836:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isObj = _interopRequireDefault(__webpack_require__(82806));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if input value is a native `Promise`.
 * The Promise object represents the eventual completion (or failure)
 * of an asynchronous operation, and its resulting value.
 *
 * @func isPromise
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.1.0|v2.1.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link https://promisesaplus.com/|Promises/A+}, {@link RA.isThenable|isThenable}
 * @example
 *
 * RA.isPromise(null); // => false
 * RA.isPromise(undefined); // => false
 * RA.isPromise([]); // => false
 * RA.isPromise(Promise.resolve()); // => true
 * RA.isPromise(Promise.reject()); // => true
 * RA.isPromise({ then: () => 1 }); // => false
 */
var isPromise = (0, _ramda.curryN)(1, (0, _ramda.both)(_isObj["default"], (0, _ramda.pipe)(_ramda.toString, (0, _ramda.equals)('[object Promise]'))));
var _default = isPromise;
exports["default"] = _default;

/***/ }),

/***/ 67252:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _invokeArgs = _interopRequireDefault(__webpack_require__(61583));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if an object exists in another object's prototype chain.
 *
 * @func isPrototypeOf
 * @category Object
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.31.0|v2.31.0}
 * @sig * -> Boolean
 * @param {Object} type The prototype that we're searching for
 * @param {Object} object The object whose prototype chain will be searched
 * @return {boolean}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf|Object.prorotype.isPrototypeOf}
 * @example
 * function Foo() {}
 * function Bar() {}
 * function Baz() {}
 *
 * Bar.prototype = Object.create(Foo.prototype);
 * Baz.prototype = Object.create(Bar.prototype);
 *
 * const baz = new Baz();
 *
 * RA.isPrototypeOf(Baz, baz); // => true
 * RA.isPrototypeOf(Bar, baz); // => true
 * RA.isPrototypeOf(Foo, baz); // => true
 * RA.isPrototypeOf(Object, baz); // => true
 */
var isPrototypeOf = (0, _ramda.curry)(function (type, object) {
  return Boolean((0, _invokeArgs["default"])(['prototype', 'isPrototypeOf'], [object], type));
});
var _default = isPrototypeOf;
exports["default"] = _default;

/***/ }),

/***/ 18380:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Checks if value is `RegExp` object.
 *
 * @func isRegExp
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.5.0|v2.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotRegExp|isNotRegExp}
 * @example
 *
 * RA.isRegExp(new RegExp()); //=> true
 * RA.isRegExp(/(?:)/); //=> true
 * RA.isRegExp(1); //=> false
 */
var isRegExp = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('RegExp')));
var _default = isRegExp;
exports["default"] = _default;

/***/ }),

/***/ 42092:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.isSafeIntegerPonyfill = exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
var _Number = _interopRequireDefault(__webpack_require__(98797));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var isSafeIntegerPonyfill = (0, _ramda.curryN)(1, _Number["default"]);

/**
 * Checks whether the passed value is a safe `integer`.
 *
 * @func isSafeInteger
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @example
 *
 * RA.isSafeInteger(3); //=> true
 * RA.isSafeInteger(Math.pow(2, 53)) //=> false
 * RA.isSafeInteger(Math.pow(2, 53) - 1); //=> true
 * RA.isSafeInteger(NaN); //=> false
 * RA.isSafeInteger(Infinity); //=> false
 * RA.isSafeInteger('3') //=> false
 * RA.isSafeInteger(3.1); //=> false
 * RA.isSafeInteger(3.0); //=> true
 * RA.isSafeInteger('string'); //=> false
 * RA.isSafeInteger(null); //=> false
 * RA.isSafeInteger(undefined); //=> false
 * RA.isSafeInteger({}); //=> false
 * RA.isSafeInteger(() => { }); //=> false
 * RA.isSafeInteger(true); //=> false
 */
exports.isSafeIntegerPonyfill = isSafeIntegerPonyfill;
var isSafeInteger = (0, _isFunction["default"])(Number.isSafeInteger) ? (0, _ramda.curryN)(1, (0, _ramda.bind)(Number.isSafeInteger, Number)) : isSafeIntegerPonyfill;
var _default = isSafeInteger;
exports["default"] = _default;

/***/ }),

/***/ 76933:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isInteger = _interopRequireDefault(__webpack_require__(19554));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks whether the passed value is {@link https://github.com/getify/You-Dont-Know-JS/blob/9959fc904d584bbf0b02cf41c192f74ff4238581/types-grammar/ch4.md#the-curious-case-of-the-|a sentinel value}.
 *
 * @func isSentinelValue
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.33.0|v2.33.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @example
 *
 * RA.isSentinelValue(-1); //=> true
 *
 * RA.isSentinelValue('-1'); //=> false
 * RA.isSentinelValue(1); //=> false
 * RA.isSentinelValue([-1]); //=> false
 */ // eslint-disable-next-line no-bitwise
var isSentinelValue = (0, _ramda.curryN)(1, function (val) {
  return (0, _isInteger["default"])(val) && ~val === 0;
});
var _default = isSentinelValue;
exports["default"] = _default;

/***/ }),

/***/ 39962:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Predicate for determining if a provided value is an instance of a Set.
 *
 * @func isSet
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isMap|isMap}}
 * @example
 *
 * RA.isSet(new Map()); //=> false
 * RA.isSet(new Set()); //=> true
 * RA.isSet(new Set([1,2]); //=> true
 * RA.isSet(new Object()); //=> false
 */

var isSet = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('Set')));
var _default = isSet;
exports["default"] = _default;

/***/ }),

/***/ 5971:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isArray = _interopRequireDefault(__webpack_require__(57567));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if input value is a sparse Array.
 * An array with at least one "empty slot" in it is often called a "sparse array."
 * Empty slot doesn't mean that the slot contains `null` or `undefined` values,
 * but rather that the slots don't exist.
 *
 * @func isSparseArray
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.20.0|v2.20.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} list The list to test
 * @return {boolean}
 * @see {@link https://github.com/getify/You-Dont-Know-JS/blob/f0d591b6502c080b92e18fc470432af8144db610/types%20%26%20grammar/ch3.md#array|Sparse Arrays}, {@link RA.isArray|isArray}
 * @example
 *
 * RA.isSparseArray(new Array(3)); // => true
 * RA.isSparseArray([1,,3]); // => true
 *
 * const list = [1, 2, 3];
 * delete list[1];
 * RA.isSparseArray(list); // => true
 *
 * RA.isSparseArray([1, 2, 3]); // => false
 */
var isSparseArray = (0, _ramda.both)(_isArray["default"], (0, _ramda.converge)((0, _ramda.complement)(_ramda.identical), [(0, _ramda.pipe)(_ramda.values, _ramda.length), _ramda.length]));
var _default = isSparseArray;
exports["default"] = _default;

/***/ }),

/***/ 36851:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Checks if input value is `String`.
 *
 * @func isString
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.4.0|v0.4.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotString|isNotString}
 * @example
 *
 * RA.isString('abc'); //=> true
 * RA.isString(1); //=> false
 */
var isString = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('String')));
var _default = isString;
exports["default"] = _default;

/***/ }),

/***/ 53220:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/**
 * Checks if input value is a Symbol.
 *
 * @func isSymbol
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol|MDN Symbol}
 * @example
 *
 * RA.isSymbol(Symbol('1')); //=> true
 * RA.isSymbol(Symbol(1)); //=> true
 * RA.isSymbol('string'); //=> false
 * RA.isSymbol(undefined); //=> false
 * RA.isSymbol(null); //=> false
 */
var isSymbol = (0, _ramda.curryN)(1, function (val) {
  return _typeof(val) === 'symbol' || _typeof(val) === 'object' && (0, _ramda.type)(val) === 'Symbol';
});
var _default = isSymbol;
exports["default"] = _default;

/***/ }),

/***/ 32803:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if input value is a `thenable`.
 * `thenable` is an object or function that defines a `then` method.
 *
 * @func isThenable
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.1.0|v2.1.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isPromise|isPromise}
 * @example
 *
 * RA.isThenable(null); // => false
 * RA.isThenable(undefined); // => false
 * RA.isThenable([]); // => false
 * RA.isThenable(Promise.resolve()); // => true
 * RA.isThenable(Promise.reject()); // => true
 * RA.isThenable({ then: () => 1 }); // => true
 */
var isThenable = (0, _ramda.pathSatisfies)(_isFunction["default"], ['then']);
var _default = isThenable;
exports["default"] = _default;

/***/ }),

/***/ 49702:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Checks if input value is the Boolean primitive `true`. Will return false for Boolean objects
 * created using the `Boolean` function as a constructor.
 *
 * @func isTrue
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.6.0|v2.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isFalse|isFalse}, {@link RA.isTruthy|isTruthy}, {@link RA.isFalsy|isFalsy}
 * @example
 *
 * RA.isTrue(true); // => true
 * RA.isTrue(Boolean(true)); // => true
 * RA.isTrue(false); // => false
 * RA.isTrue(1); // => false
 * RA.isTrue('true'); // => false
 * RA.isTrue(new Boolean(true)); // => false
 */

var isTrue = (0, _ramda.curryN)(1, (0, _ramda.identical)(true));
var _default = isTrue;
exports["default"] = _default;

/***/ }),

/***/ 54459:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * In JavaScript, a `truthy` value is a value that is considered true
 * when evaluated in a Boolean context. All values are truthy unless
 * they are defined as falsy (i.e., except for `false`, `0`, `""`, `null`, `undefined`, and `NaN`).
 *
 * @func isTruthy
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.2.0|v2.2.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Truthy|truthy}, {@link RA.isFalsy|isFalsy}
 * @example
 *
 * RA.isTruthy({}); // => true
 * RA.isTruthy([]); // => true
 * RA.isTruthy(42); // => true
 * RA.isTruthy(3.14); // => true
 * RA.isTruthy('foo'); // => true
 * RA.isTruthy(new Date()); // => true
 * RA.isTruthy(Infinity); // => true
 */
var isTruthy = (0, _ramda.curryN)(1, Boolean);
var _default = isTruthy;
exports["default"] = _default;

/***/ }),

/***/ 14545:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _toUinteger = _interopRequireDefault(__webpack_require__(24020));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks whether the passed value is an unsigned 32 bit integer.
 *
 * @func isUinteger32
 * @aliases isUint32
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/3.2.0|v3.2.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.toUinteger32|toUinteger32}
 * @example
 *
 * RA.isUinteger32(0); //=> true
 * RA.isUinteger32(2 ** 32 - 1); //=> true
 *
 * RA.isUinteger32(Infinity); //=> false
 * RA.isUinteger32(NaN); //=> false
 * RA.isUinteger32(-1); //=> false
 * RA.isUinteger32(2 ** 32); //=> false
 */
var isUinteger32 = (0, _ramda.curryN)(1, function (val) {
  return (0, _toUinteger["default"])(val) === val;
});
var _default = isUinteger32;
exports["default"] = _default;

/***/ }),

/***/ 47078:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _stubUndefined = _interopRequireDefault(__webpack_require__(25536));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if input value is `undefined`.
 *
 * @func isUndefined
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.0.1|v0.0.1}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotUndefined|isNotUndefined}
 * @example
 *
 * RA.isUndefined(1); //=> false
 * RA.isUndefined(undefined); //=> true
 * RA.isUndefined(null); //=> false
 */
var isUndefined = (0, _ramda.equals)((0, _stubUndefined["default"])());
var _default = isUndefined;
exports["default"] = _default;

/***/ }),

/***/ 62891:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isDate = _interopRequireDefault(__webpack_require__(11606));
var _isNotNaN = _interopRequireDefault(__webpack_require__(42428));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* eslint-disable max-len */
/**
 * Checks if value is valid `Date` object.
 *
 * @func isValidDate
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.8.0|v1.8.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isDate|isDate}, {@link RA.isNotDate|isNotDate}, {@link RA.isNotValidDate|isNotValidDate}
 * @example
 *
 * RA.isValidDate(new Date()); //=> true
 * RA.isValidDate(new Date('a')); //=> false
 */
/* eslint-enable max-len */
var isValidDate = (0, _ramda.curryN)(1, (0, _ramda.both)(_isDate["default"], (0, _ramda.pipe)((0, _ramda.invoker)(0, 'getTime'), _isNotNaN["default"])));
var _default = isValidDate;
exports["default"] = _default;

/***/ }),

/***/ 56680:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isFloat = _interopRequireDefault(__webpack_require__(1362));
var _isInteger = _interopRequireDefault(__webpack_require__(16399));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Checks if value is a valid `Number`. A valid `Number` is a number that is not `NaN`, `Infinity`
 * or `-Infinity`.
 *
 * @func isValidNumber
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.2.0|v2.2.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotValidNumber|isNotValidNumber}
 * @example
 *
 * RA.isValidNumber(1); //=> true
 * RA.isValidNumber(''); //=> false
 * RA.isValidNumber(NaN); //=> false
 * RA.isValidNumber(Infinity); //=> false
 * RA.isValidNumber(-Infinity); //=> false
 */
var isValidNumber = (0, _ramda.curryN)(1, (0, _ramda.either)(_isInteger["default"], _isFloat["default"]));
var _default = isValidNumber;
exports["default"] = _default;

/***/ }),

/***/ 51528:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _allP = _interopRequireDefault(__webpack_require__(215));
var _lengthEq = _interopRequireDefault(__webpack_require__(58481));
var _lengthGte = _interopRequireDefault(__webpack_require__(33880));
var _rejectP = _interopRequireDefault(__webpack_require__(72197));
var _resolveP = _interopRequireDefault(__webpack_require__(37555));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * Returns a promise that is fulfilled by the last given promise to be fulfilled,
 * or rejected with an array of rejection reasons if all of the given promises are rejected.
 *
 * @func lastP
 * @memberOf RA
 * @category Function
 * @since {@link https://char0n.github.io/ramda-adjunct/2.23.0|v2.23.0}
 * @sig [Promise a] -> Promise a
 * @param {Iterable.<*>} iterable An iterable object such as an Array or String
 * @return {Promise} A promise that is fulfilled by the last given promise to be fulfilled, or rejected with an array of rejection reasons if all of the given promises are rejected.
 * @see {@link RA.anyP|anyP}
 * @example
 *
 * const delayP = timeout => new Promise(resolve => setTimeout(() => resolve(timeout), timeout));
 * delayP.reject = timeout => new Promise((resolve, reject) => setTimeout(() => reject(timeout), timeout));
 * RA.lastP([
 *   1,
 *   delayP(10),
 *   delayP(100),
 *   delayP.reject(1000),
 * ]); //=> Promise(100)
 */
var lastP = (0, _ramda.curryN)(1, function (iterable) {
  var fulfilled = [];
  var rejected = [];
  var onFulfill = (0, _ramda.bind)(fulfilled.push, fulfilled);
  var onReject = (0, _ramda.bind)(rejected.push, rejected);
  var listOfPromises = (0, _ramda.map)(function (p) {
    return (0, _resolveP["default"])(p).then(onFulfill)["catch"](onReject);
  }, _toConsumableArray(iterable));
  return (0, _allP["default"])(listOfPromises).then(function () {
    if ((0, _lengthEq["default"])(0, fulfilled) && (0, _lengthEq["default"])(0, rejected)) {
      return undefined;
    }
    if ((0, _lengthGte["default"])(1, fulfilled)) {
      return (0, _ramda.last)(fulfilled);
    }
    return (0, _rejectP["default"])(rejected);
  });
});
var _default = lastP;
exports["default"] = _default;

/***/ }),

/***/ 58481:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _compareLength = _interopRequireDefault(__webpack_require__(37854));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Returns `true` if the supplied list or string has a length equal to `valueLength`.
 *
 * @func lengthEq
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.8.0|v2.8.0}
 * @category List
 * @sig Number -> [*] -> Boolean
 * @param {number} valueLength The length of the list or string
 * @param {Array|string} value The list or string
 * @return {boolean}
 * @see {@link RA.lengthNotEq|lengthNotEq}, {@link RA.lengthLt|lengthLt}, {@link RA.lengthGt|lengthGt}, {@link RA.lengthLte|lengthLte}, {@link RA.lengthGte|lengthGte},, {@link http://ramdajs.com/docs/#equals|equals}, {@link http://ramdajs.com/docs/#length|length}
 * @example
 *
 * RA.lengthEq(3, [1,2,3]); //=> true
 * RA.lengthEq(3, [1,2,3,4]); //=> false
 */
var lengthEq = (0, _compareLength["default"])(_ramda.equals);
var _default = lengthEq;
exports["default"] = _default;

/***/ }),

/***/ 66376:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _compareLength = _interopRequireDefault(__webpack_require__(37854));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Returns `true` if the supplied list or string has a length greater than `valueLength`.
 *
 * @func lengthGt
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.8.0|v2.8.0}
 * @category List
 * @sig Number -> [*] -> Boolean
 * @param {number} valueLength The length of the list or string
 * @param {Array|string} value The list or string
 * @return {boolean}
 * @see {@link RA.lengthEq|lengthEq}, {@link RA.lengthNotEq|lengthNotEq}, {@link RA.lengthLt|lengthLt}, {@link RA.lengthLte|lengthLte}, {@link RA.lengthGte|lengthGte}, {@link http://ramdajs.com/docs/#gt|gt},  {@link http://ramdajs.com/docs/#length|length}
 * @example
 *
 * RA.lengthGt(3, [1,2,3,4]); //=> true
 * RA.lengthGt(3, [1,2,3]); //=> false
 */
var lengthGt = (0, _compareLength["default"])((0, _ramda.flip)(_ramda.gt));
var _default = lengthGt;
exports["default"] = _default;

/***/ }),

/***/ 33880:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _compareLength = _interopRequireDefault(__webpack_require__(37854));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Returns `true` if the supplied list or string has a length greater than or equal to
 * `valueLength`.
 *
 * @func lengthGte
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.8.0|v2.8.0}
 * @category List
 * @sig Number -> [*] -> Boolean
 * @param {number} valueLength The length of the list or string
 * @param {Array|string} value The list or string
 * @return {boolean}
 * @see {@link RA.lengthEq|lengthEq}, {@link RA.lengthNotEq|lengthNotEq}, {@link RA.lengthLt|lengthLt}, {@link RA.lengthGt|lengthGt}, {@link RA.lengthLte|lengthLte}, {@link http://ramdajs.com/docs/#gte|gte}, {@link http://ramdajs.com/docs/#length|length}
 * @example
 *
 * RA.lengthGte(3, [1,2,3,4]); //=> true
 * RA.lengthGte(3, [1,2,3]); //=> true
 * RA.lengthGte(3, [1,2]); //=> false
 */
var lengthGte = (0, _compareLength["default"])((0, _ramda.flip)(_ramda.gte));
var _default = lengthGte;
exports["default"] = _default;

/***/ }),

/***/ 26539:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _compareLength = _interopRequireDefault(__webpack_require__(37854));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Returns `true` if the supplied list or string has a length less than `valueLength`.
 *
 * @func lengthLt
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.8.0|v2.8.0}
 * @category List
 * @sig Number -> [*] -> Boolean
 * @param {number} valueLength The length of the list or string
 * @param {Array|string} value The list or string
 * @return {boolean}
 * @see {@link RA.lengthEq|lengthEq}, {@link RA.lengthNotEq|lengthNotEq}, {@link RA.lengthGt|lengthGt}, {@link RA.lengthLte|lengthLte}, {@link RA.lengthGte|lengthGte}, {@link http://ramdajs.com/docs/#lt|lt}, {@link http://ramdajs.com/docs/#length|length}
 * @example
 *
 * RA.lengthLt(3, [1,2]); //=> true
 * RA.lengthLt(3, [1,2,3]); //=> false
 */
var lengthLt = (0, _compareLength["default"])((0, _ramda.flip)(_ramda.lt));
var _default = lengthLt;
exports["default"] = _default;

/***/ }),

/***/ 42385:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _compareLength = _interopRequireDefault(__webpack_require__(37854));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Returns `true` if the supplied list or string has a length less than or equal to `valueLength`.
 *
 * @func lengthLte
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.8.0|v2.8.0}
 * @category List
 * @sig Number -> [*] -> Boolean
 * @param {number} valueLength The length of the list or string
 * @param {Array|string} value The list or string
 * @return {boolean}
 * @see {@link RA.lengthEq|lengthEq}, {@link RA.lengthNotEq|lengthNotEq}, {@link RA.lengthLt|lengthLt}, {@link RA.lengthGt|lengthGt}, {@link RA.lengthGte|lengthGte}, {@link http://ramdajs.com/docs/#lte|lte}, {@link http://ramdajs.com/docs/#length|length}
 * @example
 *
 * RA.lengthLte(3, [1,2]); //=> true
 * RA.lengthLte(3, [1,2,3]); //=> true
 * RA.lengthLte(3, [1,2,3,4]); //=> false
 */
var lengthLte = (0, _compareLength["default"])((0, _ramda.flip)(_ramda.lte));
var _default = lengthLte;
exports["default"] = _default;

/***/ }),

/***/ 17602:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _compareLength = _interopRequireDefault(__webpack_require__(37854));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Returns `true` if the supplied list or string has a length not equal to `valueLength`.
 *
 * @func lengthNotEq
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.8.0|v2.8.0}
 * @category List
 * @sig Number -> [*] -> Boolean
 * @param {number} valueLength The length of the list or string
 * @param {Array|string} value The list or string
 * @return {boolean}
 * @see {@link RA.lengthEq|lengthEq}, {@link RA.lengthLt|lengthLt}, {@link RA.lengthGt|lengthGt}, {@link RA.lengthLte|lengthLte}, {@link RA.lengthGte|lengthGte}, {@link http://ramdajs.com/docs/#equals|equals}, {@link http://ramdajs.com/docs/#length|length}
 * @example
 *
 * RA.lengthNotEq(3, [1,2,3,4]); //=> true
 * RA.lengthNotEq(3, [1,2,3]); //=> false
 */
var lengthNotEq = (0, _compareLength["default"])((0, _ramda.complement)(_ramda.equals));
var _default = lengthNotEq;
exports["default"] = _default;

/***/ }),

/***/ 55409:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns `true` if data structure focused by the given lens equals provided value.
 *
 * @func lensEq
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.13.0|1.13.0}
 * @category Relation
 * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig  Lens s a -> b -> s -> Boolean
 * @see {@link RA.lensNotEq|lensNotEq}
 * @param {function} lens Van Laarhoven lens
 * @param {*} value The value to compare the focused data structure with
 * @param {*} data The data structure
 * @return {boolean} `true` if the focused data structure equals value, `false` otherwise
 *
 * @example
 *
 * RA.lensEq(R.lensIndex(0), 1, [0, 1, 2]); // => false
 * RA.lensEq(R.lensIndex(1), 1, [0, 1, 2]); // => true
 * RA.lensEq(R.lensPath(['a', 'b']), 'foo', { a: { b: 'foo' } }) // => true
 */
var lensEq = (0, _ramda.curryN)(3, function (lens, val, data) {
  return (0, _ramda.pipe)((0, _ramda.view)(lens), (0, _ramda.equals)(val))(data);
});
var _default = lensEq;
exports["default"] = _default;

/***/ }),

/***/ 90024:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
// This implementation was highly inspired by the implementations
// in ramda-lens library.
//
// https://github.com/ramda/ramda-lens

// isomorphic :: ((a -> b), (b -> a)) -> Isomorphism
//     Isomorphism = x -> y
var isomorphic = function isomorphic(to, from) {
  var isomorphism = function isomorphism(x) {
    return to(x);
  };
  isomorphism.from = from;
  return isomorphism;
};

// isomorphisms :: ((a -> b), (b -> a)) -> (a -> b)
var isomorphisms = function isomorphisms(to, from) {
  return isomorphic((0, _ramda.curry)(function (toFunctorFn, target) {
    return (0, _ramda.map)(from, toFunctorFn(to(target)));
  }), (0, _ramda.curry)(function (toFunctorFn, target) {
    return (0, _ramda.map)(to, toFunctorFn(from(target)));
  }));
};

// from :: Isomorphism -> a -> b
var from = (0, _ramda.curry)(function (isomorphism, x) {
  return isomorphism.from(x);
});

/**
 * Defines an isomorphism that will work like a lens. It takes two functions.
 * The function that converts and the function that recovers.
 *
 * @func lensIso
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|1.19.0}
 * @category Relation
 * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig (s -> a) -> (a -> s) -> Lens s a
 * @param {!function} to The function that converts
 * @param {!function} from The function that recovers
 * @return {!function} The isomorphic lens
 * @see {@link http://ramdajs.com/docs/#lens|R.lens}
 *
 * @example
 *
 * const lensJSON = RA.lensIso(JSON.parse, JSON.stringify);
 *
 * R.over(lensJSON, assoc('b', 2), '{"a":1}'); //=> '{"a":1,"b":2}'
 * R.over(RA.lensIso.from(lensJSON), R.replace('}', ',"b":2}'), { a: 1 }); // => { a: 1, b: 2 }
 */
var lensIso = (0, _ramda.curry)(isomorphisms);
lensIso.from = from;
var _default = lensIso;
exports["default"] = _default;

/***/ }),

/***/ 50448:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _lensEq = _interopRequireDefault(__webpack_require__(55409));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Returns `true` if data structure focused by the given lens doesn't equal provided value.
 *
 * @func lensNotEq
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.13.0|1.13.0}
 * @category Relation
 * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> b -> s -> Boolean
 * @see {@link RA.lensEq|lensEq}
 * @param {function} lens Van Laarhoven lens
 * @param {*} value The value to compare the focused data structure with
 * @param {*} data The data structure
 * @return {boolean} `false` if the focused data structure equals value, `true` otherwise
 *
 * @example
 *
 * RA.lensNotEq(R.lensIndex(0), 1, [0, 1, 2]); // => true
 * RA.lensNotEq(R.lensIndex(1), 1, [0, 1, 2]); // => false
 * RA.lensNotEq(R.lensPath(['a', 'b']), 'foo', { a: { b: 'foo' } }) // => false
 */
var lensNotEq = (0, _ramda.complement)(_lensEq["default"]);
var _default = lensNotEq;
exports["default"] = _default;

/***/ }),

/***/ 84805:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _lensSatisfies = _interopRequireDefault(__webpack_require__(65268));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Returns `true` if data structure focused by the given lens doesn't satisfy the predicate.
 * Note that the predicate is expected to return boolean value.
 *
 * @func lensNotSatisfy
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.13.0|1.13.0}
 * @category Relation
 * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig  Boolean b => (a -> b) -> Lens s a -> s -> b
 * @see {@link RA.lensSatisfies|lensSatisfies}
 * @param {Function} predicate The predicate function
 * @param {Function} lens Van Laarhoven lens
 * @param {*} data The data structure
 * @return {boolean} `false` if the focused data structure satisfies the predicate, `true` otherwise
 *
 * @example
 *
 * RA.lensNotSatisfy(RA.isTrue, R.lensIndex(0), [false, true, 1]); // => true
 * RA.lensNotSatisfy(RA.isTrue, R.lensIndex(1), [false, true, 1]); // => false
 * RA.lensNotSatisfy(RA.isTrue, R.lensIndex(2), [false, true, 1]); // => true
 * RA.lensNotSatisfy(R.identity, R.lensProp('x'), { x: 1 }); // => true
 */
var lensNotSatisfy = (0, _ramda.complement)(_lensSatisfies["default"]);
var _default = lensNotSatisfy;
exports["default"] = _default;

/***/ }),

/***/ 65268:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isTrue = _interopRequireDefault(__webpack_require__(49702));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Returns `true` if data structure focused by the given lens satisfies the predicate.
 * Note that the predicate is expected to return boolean value and will be evaluated
 * as `false` unless the predicate returns `true`.
 *
 * @func lensSatisfies
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.13.0|1.13.0}
 * @category Relation
 * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig  Boolean b => (a -> b) -> Lens s a -> s -> b
 * @see {@link RA.lensNotSatisfy|lensNotSatisfy}
 * @param {Function} predicate The predicate function
 * @param {Function} lens Van Laarhoven lens
 * @param {*} data The data structure
 * @return {boolean} `true` if the focused data structure satisfies the predicate, `false` otherwise
 *
 * @example
 *
 * RA.lensSatisfies(RA.isTrue, R.lensIndex(0), [false, true, 1]); // => false
 * RA.lensSatisfies(RA.isTrue, R.lensIndex(1), [false, true, 1]); // => true
 * RA.lensSatisfies(RA.isTrue, R.lensIndex(2), [false, true, 1]); // => false
 * RA.lensSatisfies(R.identity, R.lensProp('x'), { x: 1 }); // => false
 */
var lensSatisfies = (0, _ramda.curryN)(3, function (predicate, lens, data) {
  return (0, _ramda.pipe)((0, _ramda.view)(lens), predicate, _isTrue["default"])(data);
});
var _default = lensSatisfies;
exports["default"] = _default;

/***/ }),

/***/ 63481:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _Identity = _interopRequireDefault(__webpack_require__(99895));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Creates a [Traversable](https://github.com/fantasyland/fantasy-land#traversable) lens
 * from an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning function.
 *
 * When executed, it maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](https://ramdajs.com/docs/#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 *
 * Dispatches to the `traverse` method of the third argument, if present.
 *
 * @func lensTraverse
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.7.0|2.7.0}
 * @category Relation
 * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig fantasy-land/of :: TypeRep f => f ~> a → f a
 * @sig Applicative f => (a -> f a) -> Lens s a
 * @sig Applicative f => TypeRep f -> Lens s a
 * @param {!Object|!Function} TypeRepresentative with an `of` or `fantasy-land/of` method
 * @return {!function} The Traversable lens
 * @see {@link http://ramdajs.com/docs/#lens|R.lens}, {@link http://ramdajs.com/docs/#traverse|R.traverse}
 *
 * @example
 *
 * const maybeLens = RA.lensTraverse(Maybe.of);
 * const safeDiv = n => d => d === 0 ? Maybe.Nothing() : Maybe.Just(n / d)
 *
 * R.over(maybeLens, safeDiv(10), [2, 4, 5]); // => Just([5, 2.5, 2])
 * R.over(maybeLens, safeDiv(10), [2, 0, 5]); // => Nothing
 *
 * R.view(maybeLens, [Maybe.Just(2), Maybe.Just(3)]); // => Maybe.Just([2, 3])
 *
 * R.set(maybeLens, Maybe.Just(1), [Maybe.just(2), Maybe.Just(3)]); // => Maybe.Just([1, 1])
 */
/* eslint-disable no-nested-ternary */
var lensTraverse = (0, _ramda.curryN)(1, function (F) {
  var of = typeof F['fantasy-land/of'] === 'function' ? F['fantasy-land/of'] : typeof F.of === 'function' ? F.of : F;
  var TypeRep = {
    'fantasy-land/of': of
  };
  return (0, _ramda.curry)(function (toFunctorFn, target) {
    return _Identity["default"].of((0, _ramda.traverse)(TypeRep, (0, _ramda.pipe)(toFunctorFn, (0, _ramda.prop)('value')), target));
  });
});
/* eslint-enable */
var _default = lensTraverse;
exports["default"] = _default;

/***/ }),

/***/ 36127:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _liftFN = _interopRequireDefault(__webpack_require__(59492));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * "lifts" a function to be the specified arity, so that it may "map over" objects that satisfy
 * the fantasy land Apply spec of algebraic structures.
 *
 * Lifting is specific for {@link https://github.com/scalaz/scalaz|scalaz} and {@link http://functionaljava.org/|function Java} implementations.
 * Old version of fantasy land spec were not compatible with this approach,
 * but as of fantasy land 1.0.0 Apply spec also adopted this approach.
 *
 * This function acts as interop for ramda <= 0.23.0 and {@link https://monet.github.io/monet.js/|monet.js}.
 *
 * More info {@link https://github.com/fantasyland/fantasy-land/issues/50|here}.
 *
 * @func liftF
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.2.0|v1.2.0}
 * @category Function
 * @sig Apply a => (a... -> a) -> (a... -> a)
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function
 * @see {@link RA.liftFN|liftFN}
 * @example
 *
 * const { Maybe } = require('monet');
 *
 * const add3 = (a, b, c) => a + b + c;
 * const madd3 = RA.liftF(add3);
 *
 * madd3(Maybe.Some(10), Maybe.Some(15), Maybe.Some(17)); //=> Maybe.Some(42)
 * madd3(Maybe.Some(10), Maybe.Nothing(), Maybe.Some(17)); //=> Maybe.Nothing()
 */
var liftF = (0, _ramda.curryN)(1, function (fn) {
  return (0, _liftFN["default"])(fn.length, fn);
});
var _default = liftF;
exports["default"] = _default;

/***/ }),

/***/ 59492:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _ap = _interopRequireDefault(__webpack_require__(72625));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * "lifts" a function to be the specified arity, so that it may "map over" objects that satisfy
 * the fantasy land Apply spec of algebraic structures.
 *
 * Lifting is specific for {@link https://github.com/scalaz/scalaz|scalaz} and {@link http://www.functionaljava.org/|functional java} implementations.
 * Old version of fantasy land spec were not compatible with this approach,
 * but as of fantasy land 1.0.0 Apply spec also adopted this approach.
 *
 * This function acts as interop for ramda <= 0.23.0 and {@link https://monet.github.io/monet.js/|monet.js}.
 *
 * More info {@link https://github.com/fantasyland/fantasy-land/issues/50|here}.
 *
 * @func liftFN
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.2.0|v1.2.0}
 * @category Function
 * @sig Apply a => Number -> (a... -> a) -> (a... -> a)
 * @param {number} arity The arity of the lifter function
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function
 * @see {@link http://ramdajs.com/docs/#lift|R.lift}, {@link http://ramdajs.com/docs/#ap|R.ap}
 * @example
 *
 * const { Maybe } = require('monet');
 *
 * const add3 = (a, b, c) => a + b + c;
 * const madd3 = RA.liftFN(3, add3);
 *
 * madd3(Maybe.Some(10), Maybe.Some(15), Maybe.Some(17)); //=> Maybe.Some(42)
 * madd3(Maybe.Some(10), Maybe.Nothing(), Maybe.Some(17)); //=> Maybe.Nothing()
 */
var liftFN = (0, _ramda.curry)(function (arity, fn) {
  var lifted = (0, _ramda.curryN)(arity, fn);
  return (0, _ramda.curryN)(arity, function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var accumulator = (0, _ramda.map)(lifted, (0, _ramda.head)(args));
    var apps = (0, _ramda.slice)(1, Infinity, args);
    return (0, _ramda.reduce)(_ap["default"], accumulator, apps);
  });
});
var _default = liftFN;
exports["default"] = _default;

/***/ }),

/***/ 55302:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Creates a list from arguments.
 *
 * @func list
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.1.0|v1.1.0}
 * @category List
 * @sig  a... -> [a...]
 * @param {...*} items The items of the feature list
 * @return {Array} New list created from items
 * @see {@link https://github.com/ramda/ramda/wiki/Cookbook#create-a-list-function|Ramda Cookbook}
 * @example
 *
 * RA.list('a', 'b', 'c'); //=> ['a', 'b', 'c']
 */
var list = (0, _ramda.unapply)(_ramda.identity);
var _default = list;
exports["default"] = _default;

/***/ }),

/***/ 42977:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * {@link http://ramdajs.com/docs/#map|R.map} function that more closely resembles Array.prototype.map.
 * It takes two new parameters to its callback function: the current index, and the entire list.
 *
 * `mapIndexed` implementation is simple : `
 * const mapIndexed = R.addIndex(R.map);
 * `
 * @func mapIndexed
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.5.0|v2.5.0}
 * @category List
 * @typedef Idx = Number
 * @sig Functor f => ((a, Idx, f a) => b) => f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`
 * @param {Array} list The list to be iterated over
 * @return {Array} The new list
 * @see {@link http://ramdajs.com/docs/#addIndex|R.addIndex}, {@link http://ramdajs.com/docs/#map|R.map}
 * @example
 *
 * RA.mapIndexed((val, idx, list) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
 * //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
 */
var mapIndexed = (0, _ramda.addIndex)(_ramda.map);
var _default = mapIndexed;
exports["default"] = _default;

/***/ }),

/***/ 67984:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Create a new object with the own properties of the object under the `path`
 * merged with the own properties of the provided `source`.
 * If a key exists in both objects, the value from the `source` object will be used.
 *
 * @func mergePath
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.18.0|v1.18.0}
 * @category Object
 * @sig [k] -> {a} -> {k: {a}} -> {k: {a}}
 * @see {@link RA.mergeProp|mergeProp}
 * @param {!Array} path The property path of the destination object
 * @param {!Object} source The source object
 * @param {!Object} obj The object that has destination object under corresponding property path
 * @return {!Object} The new version of object
 * @example
 *
 * RA.mergePath(
 *  ['outer', 'inner'],
 *  { foo: 3, bar: 4 },
 *  { outer: { inner: { foo: 2 } } }
 * ); //=> { outer: { inner: { foo: 3, bar: 4 } }
 */
var mergePath = (0, _ramda.curry)(function (path, source, obj) {
  return (0, _ramda.over)((0, _ramda.lensPath)(path), (0, _ramda.mergeLeft)(source), obj);
});
var _default = mergePath;
exports["default"] = _default;

/***/ }),

/***/ 75259:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _paths = _interopRequireDefault(__webpack_require__(42852));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Merge objects under corresponding paths.
 *
 * @func mergePaths
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.17.0|v1.17.0}
 * @category Object
 * @sig [[k]] -> {k: {a}} -> {a}
 * @see {@link RA.mergeProps|mergeProps}
 * @param {!Array} paths The property paths to merge
 * @param {!Object} obj The object to query
 * @return {!Object} The object composed of merged property paths of obj
 * @example
 *
 * const obj = {
 *   foo: { fooInner: { fooInner2: 1 } },
 *   bar: { barInner: 2 }
 * };
 *
 * { ...obj.foo.fooInner, ...obj.bar }; //=>  { fooInner2: 1, barInner: 2 }
 * RA.mergePaths([['foo', 'fooInner'], ['bar']], obj); //=> { fooInner2: 1, barInner: 2 }
 */
var mergePaths = (0, _ramda.curryN)(2, (0, _ramda.pipe)(_paths["default"], _ramda.mergeAll));
var _default = mergePaths;
exports["default"] = _default;

/***/ }),

/***/ 90829:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _mergePath = _interopRequireDefault(__webpack_require__(67984));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Create a new object with the own properties of the object under the `p`
 * merged with the own properties of the provided `source`.
 * If a key exists in both objects, the value from the `source` object will be used.
 *
 * @func mergeProp
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.18.0|v1.18.0}
 * @category Object
 * @sig [k] -> {a} -> {k: {a}} -> {k: {a}}
 * @see {@link RA.mergePath|mergePath}
 * @param {!Array} p The property of the destination object
 * @param {!Object} source The source object
 * @param {!Object} obj The object that has destination object under corresponding property
 * @return {!Object} The new version of object
 * @example
 *
 * RA.mergeProp(
 *  'outer',
 *  { foo: 3, bar: 4 },
 *  { outer: { foo: 2 } }
 * ); //=> { outer: { foo: 3, bar: 4 } };
 */
var mergeProp = (0, _ramda.curry)(function (p, subj, obj) {
  return (0, _mergePath["default"])((0, _ramda.of)(Array, p), subj, obj);
});
var _default = mergeProp;
exports["default"] = _default;

/***/ }),

/***/ 78102:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Functional equivalent of merging object properties with object spread operator.
 *
 * @func mergeProps
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.17.0|v1.17.0}
 * @category Object
 * @sig [k] -> {k: {a}} -> {a}
 * @see {@link RA.mergePaths|mergePaths}
 * @param {!Array} ps The property names to merge
 * @param {!Object} obj The object to query
 * @return {!Object} The object composed of merged properties of obj
 * @example
 *
 * const obj = {
 *   foo: { fooInner: 1 },
 *   bar: { barInner: 2 }
 * };
 *
 * { ...obj.foo, ...obj.bar }; //=> { fooInner: 1, barInner: 2 }
 * RA.mergeProps(['foo', 'bar'], obj); //=> { fooInner: 1, barInner: 2 }
 */
var mergeProps = (0, _ramda.curryN)(2, (0, _ramda.pipe)(_ramda.props, _ramda.mergeAll));
var _default = mergeProps;
exports["default"] = _default;

/***/ }),

/***/ 61218:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns a new list with the item at the position `fromIdx` moved to the position `toIdx`. If the
 * `toIdx` is out of the `list` range, the item will be placed at the last position of the `list`.
 * When negative indices are provided, the behavior of the move is unspecified.
 *
 * @func move
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.8.0|v2.8.0}
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {number} fromIdx The position of item to be moved
 * @param {number} toIdx The position of item after move
 * @param {Array} list The list containing the item to be moved
 * @return {Array}
 * @example
 *
 * const list = ['a', 'b', 'c', 'd', 'e'];
 * RA.move(1, 3, list) //=> ['a', 'c', 'd', 'b', 'e']
 */
var move = (0, _ramda.curry)(function (fromIdx, toIdx, list) {
  return (0, _ramda.compose)((0, _ramda.insert)(toIdx, (0, _ramda.nth)(fromIdx, list)), (0, _ramda.remove)(fromIdx, 1))(list);
});
var _default = move;
exports["default"] = _default;

/***/ }),

/***/ 82831:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns false if both arguments are truthy; true otherwise.
 *
 * @func nand
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.19.0|v2.19.0}
 * @category Logic
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean} false if both arguments are truesy
 * @example
 *
 * RA.nand(true, true); //=> false
 * RA.nand(false, true); //=> true
 * RA.nand(true, false); //=> true
 * RA.nand(false, false); //=> true
 * RA.nand(1.0, 1.0); //=> false
 * RA.nand(1.0, 0); //=> true
 * RA.nand(0, 1.0); //=> true
 * RA.nand(0, 0); //=> true
 */
var nand = (0, _ramda.complement)(_ramda.and); // eslint-disable-line ramda/complement-simplification
var _default = nand;
exports["default"] = _default;

/***/ }),

/***/ 88760:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/* eslint-disable max-len */
/**
 * A function which calls the two provided functions and returns the complement of `||`ing the
 * results.
 * It returns false if the first function is truth-y and the complement of the second function
 * otherwise. Note that this is short-circuited, meaning that the second function will not be
 * invoked if the first returns a truth-y value. In short it will return true if neither predicate
 * returns true.
 *
 * In addition to functions, `RA.neither` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func neither
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.3.0|v2.3.0}
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f A predicate
 * @param {Function} g Another predicate
 * @return {Function} Returns a function that applies its arguments to `f` and `g` and returns the complement of `||`ing their outputs together.
 * @see {@link http://ramdajs.com/docs/#either|R.either}, {@link http://ramdajs.com/docs/#or|R.or}
 * @example
 *
 * const gt10 = R.gt(R.__, 10)
 * const even = (x) => x % 2 === 0;
 * const f = RA.neither(gt10, even);
 *
 * f(12); //=> false
 * f(8); //=> false
 * f(11); //=> false
 * f(9); //=> true
 */
/* eslint-enable max-len */
var neither = (0, _ramda.curry)((0, _ramda.compose)(_ramda.complement, _ramda.either));
var _default = neither;
exports["default"] = _default;

/***/ }),

/***/ 85414:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _allP = _interopRequireDefault(__webpack_require__(215));
var _rejectP = _interopRequireDefault(__webpack_require__(72197));
var _resolveP = _interopRequireDefault(__webpack_require__(37555));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Returns a Promise that is resolved with an array of reasons when all of the provided Promises reject, or rejected when any Promise is resolved.
 * This pattern is like allP, but fulfillments and rejections are transposed - rejections become the fulfillment values and vice versa.
 *
 * @func noneP
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category Function
 * @sig [Promise a] -> Promise [a]
 * @param {Iterable.<*>} iterable An iterable object such as an Array or String
 * @return {Promise} A Promise that is resolved with a list of rejection reasons if all Promises are rejected, or a Promise that is rejected with the fulfillment value of the first Promise that resolves.
 * @see {@link RA.allP|allP}
 * @example
 *
 * RA.noneP([Promise.reject('hello'), Promise.reject('world')]); //=> Promise(['hello', 'world'])
 * RA.noneP([]); //=> Promise([])
 * RA.noneP([Promise.reject(), Promise.resolve('hello world')]); //=> Promise('hello world')
 * RA.noneP([Promise.reject(), 'hello world']); //=> Promise('hello world')
 */
var noneP = (0, _ramda.curryN)(1, (0, _ramda.pipe)((0, _ramda.map)(_resolveP["default"]), (0, _ramda.map)(function (p) {
  return p.then(_rejectP["default"], _resolveP["default"]);
}), _allP["default"]));
var _default = noneP;
exports["default"] = _default;

/***/ }),

/***/ 24011:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Takes a list of predicates and returns a predicate that returns true for a given list of
 * arguments if none of the provided predicates are satisfied by those arguments. It is the
 * complement of Ramda's anyPass.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func nonePass
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.5.0|v2.5.0}
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see {@link http://ramdajs.com/docs/#anyPass|R.anyPass}
 * @example
 *
 * const gt10 = R.gt(R.__, 10)
 * const even = (x) => x % 2 === 0;
 * const f = RA.nonePass([gt10, even]);
 *
 * f(12); //=> false
 * f(8); //=> false
 * f(11); //=> false
 * f(9); //=> true
 */
var nonePass = (0, _ramda.curryN)(1, (0, _ramda.compose)(_ramda.complement, _ramda.anyPass));
var _default = nonePass;
exports["default"] = _default;

/***/ }),

/***/ 12432:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _stubUndefined = _interopRequireDefault(__webpack_require__(25536));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * A function that performs no operations.
 *
 * @func noop
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.0.0|v1.0.0}
 * @category Function
 * @sig ... -> undefined
 * @return {undefined}
 * @example
 *
 * RA.noop(); //=> undefined
 * RA.noop(1, 2, 3); //=> undefined
 */
var noop = (0, _ramda.always)((0, _stubUndefined["default"])());
var _default = noop;
exports["default"] = _default;

/***/ }),

/***/ 28122:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns true if both arguments are falsy; false otherwise.
 *
 * @func nor
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.20.0|v2.20.0}
 * @category Logic
 * @sig a -> b -> a ⊽ b
 * @param {*} a
 * @param {*} b
 * @return {boolean} true if both arguments are falsy
 * @see {@link RA.neither|neither}
 * @example
 *
 * RA.nor(true, true); //=> false
 * RA.nor(false, true); //=> false
 * RA.nor(true, false); //=> false
 * RA.nor(false, false); //=> true
 * RA.nor(1, 1); //=> false
 * RA.nor(1, 0); //=> false
 * RA.nor(0, 1); //=> false
 * RA.nor(0, 0); //=> true
 */
var nor = (0, _ramda.complement)(_ramda.or); // eslint-disable-line ramda/complement-simplification
var _default = nor;
exports["default"] = _default;

/***/ }),

/***/ 60886:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Takes a list of predicates and returns a predicate that returns true for a given list of
 * arguments if one or more of the provided predicates is not satisfied by those arguments. It is
 * the complement of Ramda's allPass.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func notAllPass
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.4.0|v2.4.0}
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see {@link http://ramdajs.com/docs/#allPass|R.allPass}
 * @example
 *
 * const gt10 = R.gt(R.__, 10)
 * const even = (x) => x % 2 === 0;
 * const f = RA.notAllPass([gt10, even]);
 *
 * f(12); //=> false
 * f(8); //=> true
 * f(11); //=> true
 * f(9); //=> true
 */
var notAllPass = (0, _ramda.curry)((0, _ramda.compose)(_ramda.complement, _ramda.allPass));
var _default = notAllPass;
exports["default"] = _default;

/***/ }),

/***/ 95026:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _allUnique = _interopRequireDefault(__webpack_require__(64493));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Returns true if at least one item of the list is repeated. `R.equals` is used to determine equality.
 *
 * @func notAllUnique
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category List
 * @sig [a] -> Boolean
 * @param {Array} list The list of values
 * @return {boolean}
 * @see {@link RA.allUnique|allUnique}, {@link https://ramdajs.com/docs/#equals|equals}
 * @example
 *
 * RA.notAllUnique([ 1, 1, 2, 3 ]); //=> true
 * RA.notAllUnique([ 1, 2, 3, 4 ]); //=> false
 * RA.notAllUnique([]); //=> false
 *
 */
var notAllUnique = (0, _ramda.complement)(_allUnique["default"]);
var _default = notAllUnique;
exports["default"] = _default;

/***/ }),

/***/ 28214:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/* eslint-disable max-len */
/**
 * A function which calls the two provided functions and returns the complement of `&&`ing the
 * results.
 * It returns true if the first function is false-y and the complement of the second function
 * otherwise. Note that this is short-circuited, meaning that the second function will not be
 * invoked if the first returns a false-y value. In short it will return true unless both predicates
 * return true.
 *
 * In addition to functions, `RA.notBoth` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func notBoth
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.3.0|v2.3.0}
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f A predicate
 * @param {Function} g Another predicate
 * @return {Function} Returns a function that applies its arguments to `f` and `g` and returns the complement of `&&`ing their outputs together.
 * @see {@link http://ramdajs.com/docs/#both|R.both}
 * @example
 *
 * const gt10 = R.gt(R.__, 10)
 * const even = (x) => x % 2 === 0;
 * const f = RA.notBoth(gt10, even);
 *
 * f(12); //=> false
 * f(8); //=> true
 * f(11); //=> true
 * f(9); //=> true
 */
/* eslint-enable max-len */
var notBoth = (0, _ramda.curry)((0, _ramda.compose)(_ramda.complement, _ramda.both));
var _default = notBoth;
exports["default"] = _default;

/***/ }),

/***/ 48949:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns `true` if its arguments are not equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func notEqual
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.29.0|v2.29.0}
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see {@link https://ramdajs.com/docs/#equals|equals}
 * @example
 *
 * RA.notEqual(1, 1); //=> false
 * RA.notEqual(1, '1'); //=> true
 * RA.notEqual([1, 2, 3], [1, 2, 3]); //=> false
 *
 * const a = {}; a.v = a;
 * const b = {}; b.v = b;
 * RA.notEqual(a, b); //=> false
 */
var notEqual = (0, _ramda.complement)(_ramda.equals);
var _default = notEqual;
exports["default"] = _default;

/***/ }),

/***/ 90882:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/* eslint-disable max-len */
/**
 * Returns a partial copy of an object containing only the keys
 * that don't satisfy the supplied predicate.
 *
 * @func omitBy
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.6.0|v2.6.0}
 * @category Object
 * @sig ((v, k) -> Boolean) -> {k: v} -> {k: v}
 * @param {!Function} pred A predicate to determine whether or not a key should be included on the output object
 * @param {!Object} obj The object to copy from
 * @return {!Object} A new object only with properties that don't satisfy `pred`
 *
 * @example
 *
 * const isLowerCase = (val, key) => key.toLowerCase() === key;
 * RA.omitBy(isLowerCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
 */
/* eslint-enable max-len */
var omitBy = (0, _ramda.useWith)(_ramda.pickBy, [_ramda.complement, _ramda.identity]);
var _default = omitBy;
exports["default"] = _default;

/***/ }),

/***/ 20901:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
// helpers
var rejectIndexed = (0, _ramda.addIndex)(_ramda.reject);
var containsIndex = (0, _ramda.curry)(function (indexes, val, index) {
  return (0, _ramda.includes)(index, indexes);
});

/**
 * Returns a partial copy of an array omitting the indexes specified.
 *
 * @func omitIndexes
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|v1.19.0}
 * @category List
 * @sig [Int] -> [a] -> [a]
 * @see {@link http://ramdajs.com/docs/#omit|R.omit}, {@link RA.pickIndexes|pickIndexes}
 * @param {!Array} indexes The array of indexes to omit from the new array
 * @param {!Array} list The array to copy from
 * @return {!Array} The new array with omitted indexes
 * @example
 *
 * RA.omitIndexes([-1, 1, 3], ['a', 'b', 'c', 'd']); //=> ['a', 'c']
 */
var omitIndexes = (0, _ramda.curry)(function (indexes, list) {
  return rejectIndexed(containsIndex(indexes), list);
});
var _default = omitIndexes;
exports["default"] = _default;

/***/ }),

/***/ 88377:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isNotEmpty = _interopRequireDefault(__webpack_require__(93848));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Returns true if two lists have at least one element common to both lists.
 *
 * @func overlaps
 * @memberOf RA
 * @category Relation
 * @since {@link https://char0n.github.io/ramda-adjunct/2.30.0|v2.30.0}
 * @sig [a] -> [a] -> Boolean
 * @param {Array} list1 The first list
 * @param {Array} list2 The second list
 * @return {boolean} True if two lists have at least one element common to both lists
 * @example
 *
 * RA.overlaps(['-v', '--verbose'], ['node', 'script.js', '-v']); //=> true
 * RA.overlaps(['-v', '--verbose'], []); //=> false
 * RA.overlaps([1, 2, 3], [3, 4, 5]); //=> true
 * RA.overlaps([1, 2, 3], [4, 5]); //=> false
 */

var overlaps = (0, _ramda.curryN)(2, function (list1, list2) {
  if ((0, _ramda.isEmpty)(list1)) {
    return true;
  }
  return (0, _ramda.pipe)(_ramda.intersection, _isNotEmpty["default"])(list1, list2);
});
var _default = overlaps;
exports["default"] = _default;

/***/ }),

/***/ 20597:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.padEndPonyfill = exports.padEndInvoker = exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _String = _interopRequireDefault(__webpack_require__(67426));
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var padEndPonyfill = (0, _ramda.curry)(_String["default"]);
exports.padEndPonyfill = padEndPonyfill;
var padEndInvoker = (0, _ramda.flip)((0, _ramda.invoker)(2, 'padEnd'));

/**
 * The function pads the current string with a given string
 * (repeated, if needed) so that the resulting string reaches a given length.
 * The padding is applied from the end of the current string.
 *
 * @func padCharsEnd
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category String
 * @sig String -> Number -> String -> String
 * @param {string} padString The string to pad the current string with
 * @param {number} targetLength The length of the resulting string once
 * the current string has been padded
 * @param {string} value String value to be padded
 * @return {string} A new string of the specified length with the pad string
 * applied at the end of the current string
 * @see {@link RA.padEnd|padEnd}, {@link RA.padCharsStart|padCharsStart}, {@link RA.padStart|padStart}
 * @example
 *
 * RA.padCharsEnd('-', 3, 'a'); // => 'a--'
 * RA.padCharsEnd('foo', 10, 'abc'); // => 'abcfoofoof'
 * RA.padCharsEnd('123456', 6, 'abc'); // => 'abc123'
 */
exports.padEndInvoker = padEndInvoker;
var padCharsEnd = (0, _isFunction["default"])(String.prototype.padEnd) ? padEndInvoker : padEndPonyfill;
var _default = padCharsEnd;
exports["default"] = _default;

/***/ }),

/***/ 93160:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.padStartPonyfill = exports.padStartInvoker = exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
var _String = _interopRequireDefault(__webpack_require__(94251));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var padStartInvoker = (0, _ramda.flip)((0, _ramda.invoker)(2, 'padStart'));
exports.padStartInvoker = padStartInvoker;
var padStartPonyfill = (0, _ramda.curry)(_String["default"]);

/**
 * The function pads the current string with a given string
 * (repeated, if needed) so that the resulting string reaches a given length.
 * The padding is applied from the start of the current string.
 *
 * @func padCharsStart
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category String
 * @sig String -> Number -> String -> String
 * @param {string} padString The string to pad the current string with
 * @param {number} targetLength The length of the resulting string once the current string has been padded
 * @param {string} value String value to be padded
 * @return {string} A new string of the specified length with the pad string on the start of current string
 * @see {@link RA.padStart|padStart}, {@link RA.padEnd|padEnd}, {@link RA.padCharsEnd|padCharsEnd}
 * @example
 *
 * RA.padCharsStart('-', 3, 'a'); // => '--a'
 * RA.padCharsStart('foo', 10, 'abc'); // => 'foofoofabc'
 * RA.padCharsStart('123456', 6, 'abc'); // => '123abc'
 */
exports.padStartPonyfill = padStartPonyfill;
var padCharsStart = (0, _isFunction["default"])(String.prototype.padStart) ? padStartInvoker : padStartPonyfill;
var _default = padCharsStart;
exports["default"] = _default;

/***/ }),

/***/ 89273:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _padCharsEnd = _interopRequireDefault(__webpack_require__(20597));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * The function pads the current string with an empty string
 * so that the resulting string reaches a given length.
 * The padding is applied from the end of the current string.
 *
 * @func padEnd
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category String
 * @sig Number -> String -> String
 * @param {number} targetLength The length of the resulting string once
 * the current string has been padded
 * @param {string} value String value to be padded
 * @return {string} A new string of the specified length with the pad string
 * applied at the end of the current string
 * @see {@link RA.padCharsEnd|padCharsEnd}, {@link RA.padCharsStart|padCharsStart}, {@link RA.padStart|padStart}
 * @example
 *
 * RA.padEnd(3, 'a'); // => 'a  '
 */
var padEnd = (0, _padCharsEnd["default"])(' ');
var _default = padEnd;
exports["default"] = _default;

/***/ }),

/***/ 22974:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _padCharsStart = _interopRequireDefault(__webpack_require__(93160));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Pads string on the left side if it's shorter than length.
 *
 * @func padStart
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.25.0|v2.25.0}
 * @category String
 * @sig Number -> String -> String
 * @param {number} targetLength The length of the resulting string once
 * the current string has been padded
 * @param {string} value String value to be padded
 * @return {string} A new string of the specified length with the empty string
 * applied to the beginning of the current string
 * @see {@link RA.padCharsEnd|padCharsEnd}, {@link RA.padCharsStart|padCharsStart}, {@link RA.padEnd|padEnd}
 * @example
 *
 * RA.padStart(3, 'a'); // => '  a'
 */
var padStart = (0, _padCharsStart["default"])(' ');
var _default = padStart;
exports["default"] = _default;

/***/ }),

/***/ 67638:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/* eslint-disable max-len */
/**
 * Determines whether a nested path on an object doesn't have a specific value,
 * in R.equals terms. Most likely used to filter a list.
 *
 * @func pathNotEq
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.4.0|v2.4.0}
 * @category Relation
 * @sig a => [Idx] => {a} => Boolean
 * @sig Idx = String | Int | Symbol
 * @param {a} val The value to compare the nested property with
 * @param {Array} path The path of the nested property to use
 * @param {Object} object The object to check the nested property in
 * @return {boolean} Returns Boolean `false` if the value equals the nested object property, `true` otherwise
 * @see {@link http://ramdajs.com/docs/#pathEq|R.pathEq}
 * @example
 *
 * const user1 = { address: { zipCode: 90210 } };
 * const user2 = { address: { zipCode: 55555 } };
 * const user3 = { name: 'Bob' };
 * const users = [ user1, user2, user3 ];
 * const isFamous = RA.pathNotEq(90210, ['address', 'zipCode']);
 * R.filter(isFamous, users); //=> [ user2, user3 ]
 */
/* eslint-enable max-len */
var pathNotEq = (0, _ramda.complement)(_ramda.pathEq);
var _default = pathNotEq;
exports["default"] = _default;

/***/ }),

/***/ 98650:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * If the given, non-null object has a value at the given path, returns the value at that path.
 * Otherwise returns the result of invoking the provided function with the object.
 *
 * @func pathOrLazy
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category Object
 * @typedef Idx = String | Int
 * @sig ({a} -> a) -> [Idx] -> {a} -> a
 * @param {Function} defaultFn The function that will return the default value.
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path` of the supplied object or the default value.
 * @example
 *
 * RA.pathOrLazy(() => 'N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
 * RA.pathOrLazy(() => 'N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
 */
var pathOrLazy = (0, _ramda.curryN)(3, function (defaultFn, path, obj) {
  return (0, _ramda.when)((0, _ramda.identical)(defaultFn), (0, _ramda.partial)((0, _ramda.unary)(defaultFn), [obj]), (0, _ramda.pathOr)(defaultFn, path, obj));
});
var _default = pathOrLazy;
exports["default"] = _default;

/***/ }),

/***/ 42852:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Acts as multiple path: arrays of paths in, array of values out. Preserves order.
 *
 * @func paths
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.2.0|v1.2.0}
 * @category List
 * @sig  [[k]] -> {k: v} - [v]
 * @param {Array} ps The property paths to fetch
 * @param {Object} obj The object to query
 * @return {Array} The corresponding values or partially applied function
 * @see {@link https://github.com/ramda/ramda/wiki/Cookbook#derivative-of-rprops-for-deep-fields|Ramda Cookbook}, {@link http://ramdajs.com/docs/#props|R.props}
 * @example
 *
 * const obj = {
 *   a: { b: { c: 1 } },
 *   x: 2,
 * };
 *
 * RA.paths([['a', 'b', 'c'], ['x']], obj); //=> [1, 2]
 */
var paths = (0, _ramda.curry)(function (ps, obj) {
  return (0, _ramda.ap)([(0, _ramda.path)(_ramda.__, obj)], ps);
});
var _default = paths;
exports["default"] = _default;

/***/ }),

/***/ 14520:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
// helpers
var filterIndexed = (0, _ramda.addIndex)(_ramda.filter);
var containsIndex = (0, _ramda.curry)(function (indexes, val, index) {
  return (0, _ramda.includes)(index, indexes);
});

/**
 * Picks values from list by indexes.
 *
 * Note: pickIndexes will skip non existing indexes. If you want to include them
 * use ramda's `props` function.
 *
 * @func pickIndexes
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.1.0|v1.1.0}
 * @category List
 * @sig  [Number] -> [a] -> [a]
 * @param {Array} indexes The indexes to pick
 * @param {Array} list The list to pick values from
 * @return {Array} New array containing only values at `indexes`
 * @see {@link http://ramdajs.com/docs/#pick|R.pick}, {@link RA.omitIndexes|omitIndexes}
 * @example
 *
 * RA.pickIndexes([0, 2], ['a', 'b', 'c']); //=> ['a', 'c']
 */
var pickIndexes = (0, _ramda.curry)(function (indexes, list) {
  return filterIndexed(containsIndex(indexes), list);
});
var _default = pickIndexes;
exports["default"] = _default;

/***/ }),

/***/ 69788:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns true if the specified object property is not equal,
 * in R.equals terms, to the given value; false otherwise.
 *
 * @func propNotEq
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.3.0|v2.3.0}
 * @category Relation
 * @sig  a -> String -> Object -> Boolean
 * @param {a} val The value to compare to
 * @param {String} name The property to pick
 * @param {Object} object The object, that presumably contains value under the property
 * @return {boolean} Comparison result
 * @see {@link http://ramdajs.com/docs/#propEq|R.propEq}
 * @example
 *
 * const abby = { name: 'Abby', age: 7, hair: 'blond' };
 * const fred = { name: 'Fred', age: 12, hair: 'brown' };
 * const rusty = { name: 'Rusty', age: 10, hair: 'brown' };
 * const alois = { name: 'Alois', age: 15, disposition: 'surly' };
 * const kids = [abby, fred, rusty, alois];
 * const hasNotBrownHair = RA.propNotEq('brown', 'hair');
 *
 * R.filter(hasNotBrownHair, kids); //=> [abby, alois]
 */
var propNotEq = (0, _ramda.complement)(_ramda.propEq);
var _default = propNotEq;
exports["default"] = _default;

/***/ }),

/***/ 4675:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _floor = _interopRequireDefault(__webpack_require__(5062));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Creates an array of numbers (positive and/or negative) progressing from start up to, but not including, end.
 *
 * `Note`: JavaScript follows the IEEE-754 standard for resolving floating-point values which can produce unexpected results.
 *
 * @func rangeStep
 * @memberOf RA
 * @category List
 * @since {@link https://char0n.github.io/ramda-adjunct/2.30.0|v2.30.0}
 * @sig Number -> Number -> Number -> [Number]
 * @param {number} step The value to increment or decrement by
 * @param {number} from The start of the range
 * @param {number} to The end of the range
 * @return {number[]} Returns the range of numbers
 * @see {@link http://ramdajs.com/docs/#range|R.range}
 * @example
 *
 * RA.rangeStep(1, 0, 4); // => [0, 1 ,2, 3]
 * RA.rangeStep(-1, 0, -4); // => [0, -1, -2, -3]
 * RA.rangeStep(1, 1, 5); // => [1, 2, 3, 4]
 * RA.rangeStep(5, 0, 20); // => [0, 5, 10, 15]
 * RA.rangeStep(-1, 0, -4); // => [0, -1, -2, -3]
 * RA.rangeStep(0, 1, 4); // => [1, 1, 1]
 * RA.rangeStep(1, 0, 0); // => []
 */
var rangeStep = (0, _ramda.curryN)(3, function (step, from, to) {
  var callback = step === 0 ? (0, _ramda.always)(from) : function (n) {
    return from + step * n;
  };
  var rangeEnd = step === 0 ? to - from : (0, _floor["default"])((to - from) / step);
  return (0, _ramda.map)(callback, (0, _ramda.range)(0, rangeEnd));
});
var _default = rangeStep;
exports["default"] = _default;

/***/ }),

/***/ 11555:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * {@link http://ramdajs.com/docs/#reduce|R.reduce} function that more closely resembles Array.prototype.reduce.
 * It takes two new parameters to its callback function: the current index, and the entire list.
 *
 * `reduceIndexed` implementation is simple : `
 * const reduceIndexed = R.addIndex(R.reduce);
 * `
 * @func reduceIndexed
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.5.0|v2.5.0}
 * @category List
 * @typedef Idx = Number
 * @sig ((a, b, Idx, [b]) => a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives four values,
 * the accumulator, the current element from the array, index and the entire list
 * @param {*} acc The accumulator value
 * @param {Array} list The list to iterate over
 * @return {*} The final, accumulated value
 * @see {@link http://ramdajs.com/docs/#addIndex|R.addIndex}, {@link http://ramdajs.com/docs/#reduce|R.reduce}
 * @example
 *
 * const initialList = ['f', 'o', 'o', 'b', 'a', 'r'];
 *
 * reduceIndexed((acc, val, idx, list) => acc + '-' + val + idx, '', initialList);
 * //=> "-f0-o1-o2-b3-a4-r5"
 */
var reduceIndexed = (0, _ramda.addIndex)(_ramda.reduce);
var _default = reduceIndexed;
exports["default"] = _default;

/***/ }),

/***/ 1726:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isUndefined = _interopRequireDefault(__webpack_require__(47078));
var _resolveP = _interopRequireDefault(__webpack_require__(37555));
var _allP = _interopRequireDefault(__webpack_require__(215));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/* eslint-disable max-len */
/**
 * Given an `Iterable`(arrays are `Iterable`), or a promise of an `Iterable`,
 * which produces promises (or a mix of promises and values),
 * iterate over all the values in the `Iterable` into an array and
 * reduce the array to a value using the given iterator function.
 *
 * If the iterator function returns a promise, then the result of the promise is awaited,
 * before continuing with next iteration. If any promise in the array is rejected or a promise
 * returned by the iterator function is rejected, the result is rejected as well.
 *
 * If `initialValue` is `undefined` (or a promise that resolves to `undefined`) and
 * the `Iterable` contains only 1 item, the callback will not be called and
 * the `Iterable's` single item is returned. If the `Iterable` is empty, the callback
 * will not be called and `initialValue` is returned (which may be undefined).
 *
 * This function is basically equivalent to {@link http://bluebirdjs.com/docs/api/promise.reduce.html|bluebird.reduce}.
 *
 * @func reduceP
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.13.0|v1.13.0}
 * @category List
 * @typedef MaybePromise = Promise.<*> | *
 * @sig ((Promise a, MaybePromise b) -> Promise a) -> MaybePromise a -> MaybePromise [MaybePromise b] -> Promise a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the current element from the list
 * @param {*|Promise.<*>} acc The accumulator value
 * @param {Array.<*>|Promise.<Array<*|Promise.<*>>>} list The list to iterate over
 * @return {Promise} The final, accumulated value
 * @see {@link http://ramdajs.com/docs/#reduce|R.reduce}, {@link RA.reduceRightP|reduceRightP}, {@link http://bluebirdjs.com/docs/api/promise.reduce.html|bluebird.reduce}
 * @example
 *
 * RA.reduceP(
 *   (total, fileName) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   0,
 *   ['file1.txt', 'file2.txt', 'file3.txt']
 * ); // => Promise(10)
 *
 * RA.reduceP(
 *   (total, fileName) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   Promise.resolve(0),
 *   ['file1.txt', 'file2.txt', 'file3.txt']
 * ); // => Promise(10)
 *
 * RA.reduceP(
 *   (total, fileName) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   0,
 *   [Promise.resolve('file1.txt'), 'file2.txt', 'file3.txt']
 * ); // => Promise(10)
 *
 * RA.reduceP(
 *   (total, fileName) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   0,
 *   Promise.resolve([Promise.resolve('file1.txt'), 'file2.txt', 'file3.txt'])
 * ); // => Promise(10)
 *
 */
/* esline-enable max-len */
var reduceP = (0, _ramda.curryN)(3, function (fn, acc, list) {
  return (0, _resolveP["default"])(list).then(function (iterable) {
    var listLength = (0, _ramda.length)(iterable);
    if (listLength === 0) {
      return acc;
    }
    var reducer = (0, _ramda.reduce)(function (accP, currentValueP) {
      return accP.then(function (previousValue) {
        return (0, _allP["default"])([previousValue, currentValueP]);
      }).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          previousValue = _ref2[0],
          currentValue = _ref2[1];
        if ((0, _isUndefined["default"])(previousValue) && listLength === 1) {
          return currentValue;
        }
        return fn(previousValue, currentValue);
      });
    });
    return reducer((0, _resolveP["default"])(acc), iterable);
  });
});
var _default = reduceP;
exports["default"] = _default;

/***/ }),

/***/ 16577:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isUndefined = _interopRequireDefault(__webpack_require__(47078));
var _resolveP = _interopRequireDefault(__webpack_require__(37555));
var _allP = _interopRequireDefault(__webpack_require__(215));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// in older ramda versions the order of the arguments is flipped
var flipArgs = (0, _ramda.pipe)((0, _ramda.reduceRight)(_ramda.concat, ''), (0, _ramda.equals)('ba'))(['a', 'b']);

/* eslint-disable max-len */
/**
 * Given an `Iterable`(arrays are `Iterable`), or a promise of an `Iterable`,
 * which produces promises (or a mix of promises and values),
 * iterate over all the values in the `Iterable` into an array and
 * reduce the array to a value using the given iterator function.
 *
 * Similar to {@link RA.reduceP|reduceP} except moves through the input list from the right to the left.
 * The iterator function receives two values: (value, acc),
 * while the arguments' order of reduceP's iterator function is (acc, value).
 *
 * @func reduceRightP
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.13.0|v1.13.0}
 * @category List
 * @typedef MaybePromise = Promise.<*> | *
 * @sig ((MaybePromise b, Promise a) -> Promise a) -> MaybePromise a -> MaybePromise [MaybePromise b] -> Promise a
 * @param {Function} fn The iterator function. Receives two values, the current element from the list and the accumulator
 * @param {*|Promise.<*>} acc The accumulator value
 * @param {Array.<*>|Promise.<Array<*|Promise.<*>>>} list The list to iterate over
 * @return {Promise} The final, accumulated value
 * @see {@link RA.reduceP|reduceP}, {@link http://bluebirdjs.com/docs/api/promise.reduce.html|bluebird.reduce}
 * @example
 *
 * RA.reduceRightP(
 *   (fileName, total) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   0,
 *   ['file1.txt', 'file2.txt', 'file3.txt']
 * ); // => Promise(10)
 *
 * RA.reduceRightP(
 *   (fileName, total) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   Promise.resolve(0),
 *   ['file1.txt', 'file2.txt', 'file3.txt']
 * ); // => Promise(10)
 *
 * RA.reduceRightP(
 *   (fileName, total) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   0,
 *   [Promise.resolve('file1.txt'), 'file2.txt', 'file3.txt']
 * ); // => Promise(10)
 *
 * RA.reduceRightP(
 *   (fileName, total) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   0,
 *   Promise.resolve([Promise.resolve('file1.txt'), 'file2.txt', 'file3.txt'])
 * ); // => Promise(10)
 *
 */
/* esline-enable max-len */
var reduceRightP = (0, _ramda.curryN)(3, function (fn, acc, list) {
  return (0, _resolveP["default"])(list).then(function (iterable) {
    var listLength = (0, _ramda.length)(iterable);
    if (listLength === 0) {
      return acc;
    }
    var reducer = (0, _ramda.reduceRight)(function (arg1, arg2) {
      var accP;
      var currentValueP;
      if (flipArgs) {
        accP = arg1;
        currentValueP = arg2;
      } else {
        accP = arg2;
        currentValueP = arg1;
      }
      return accP.then(function (previousValue) {
        return (0, _allP["default"])([previousValue, currentValueP]);
      }).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          previousValue = _ref2[0],
          currentValue = _ref2[1];
        if ((0, _isUndefined["default"])(previousValue) && listLength === 1) {
          return currentValue;
        }
        return fn(currentValue, previousValue);
      });
    });
    return reducer((0, _resolveP["default"])(acc), iterable);
  });
});
var _default = reduceRightP;
exports["default"] = _default;

/***/ }),

/***/ 72197:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Composable shortcut for `Promise.reject`.
 *
 * Returns a Promise object that is rejected with the given reason.
 *
 * @func rejectP
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.16.0|v1.16.0}
 * @category Function
 * @sig a -> Promise a
 * @param {*} [reason=undefined] Reason why this Promise rejected
 * @return {Promise} A Promise that is rejected with the given reason
 * @see {@link RA.resolveP|resolveP}
 * @example
 *
 * RA.rejectP(); //=> Promise(undefined)
 * RA.rejectP('a'); //=> Promise('a')
 * RA.rejectP([1, 2, 3]); //=> Promise([1, 2, 3])
 */
var rejectP = (0, _ramda.bind)(Promise.reject, Promise);
var _default = rejectP;
exports["default"] = _default;

/***/ }),

/***/ 87706:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _renameKeys2 = _interopRequireDefault(__webpack_require__(46351));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Creates a new object with the own properties of the provided object, but a
 * single key is renamed from `oldKey` to `newKey`.
 *
 * Keep in mind that in the case of keys conflict is behavior undefined and
 * the result may vary between various JS engines!
 *
 * @func renameKey
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/4.1.0|v4.1.0}
 * @category Object
 * @sig (String a, String b) => a -> b ->  {a: *} -> {b: *}
 * @param {!string} oldKey
 * @param {!string} newKey
 * @param {!Object} obj
 * @return {!Object} New object with renamed key
 * @see {@link https://github.com/ramda/ramda/wiki/Cookbook#rename-key-of-an-object|Ramda Cookbook}, {@link RA.renameKeyWith|renameKeyWith}
 * @example
 *
 * const input = { firstName: 'Elisia', age: 22, type: 'human' };
 *
 * RA.renameKey('firstName', 'name')(input);
 * //=> { name: 'Elisia', age: 22, type: 'human' }
 */
var renameKey = (0, _ramda.curry)(function (oldKey, newKey, obj) {
  return (0, _renameKeys2["default"])(_defineProperty({}, oldKey, newKey), obj);
});
var _default = renameKey;
exports["default"] = _default;

/***/ }),

/***/ 11052:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _renameKeysWith = _interopRequireDefault(__webpack_require__(21463));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Creates a new object with the own properties of the provided object, but the
 * key `key` renamed according to logic of renaming function.
 *
 * Keep in mind that in case the new key name already existed on the object,
 * the behaviour is undefined and the result may vary between various JS engines!
 *
 * @func renameKeyWith
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.29.0|v2.29.0}
 * @category Object
 * @sig (k -> k) -> k -> {k: v} -> {k: v}
 * @param {Function} fn Function that renames the keys
 * @param {!string} key Key to rename
 * @param {!Object} obj Provided object
 * @return {!Object} New object with renamed key
 * @see {@link RA.renameKeysWith|renameKeysWith}
 * @example
 *
 * RA.renameKeyWith(R.concat('a'), 'A', { A: 1 }) //=> { aA: 1 }
 */
var renameKeyWith = (0, _ramda.curry)(function (fn, key, obj) {
  return (0, _renameKeysWith["default"])((0, _ramda.when)((0, _ramda.equals)(key), fn), obj);
});
var _default = renameKeyWith;
exports["default"] = _default;

/***/ }),

/***/ 46351:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _renameKeysWith = _interopRequireDefault(__webpack_require__(21463));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var valueOrKey = function valueOrKey(keysMap) {
  return function (key) {
    if ((0, _ramda.has)(key, keysMap)) {
      return keysMap[key];
    }
    return key;
  };
};

/**
 * Creates a new object with the own properties of the provided object, but the
 * keys renamed according to the keysMap object as `{oldKey: newKey}`.
 * When some key is not found in the keysMap, then it's passed as-is.
 *
 * Keep in mind that in the case of keys conflict is behaviour undefined and
 * the result may vary between various JS engines!
 *
 * @func renameKeys
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.5.0|v1.5.0}
 * @category Object
 * @sig {a: b} -> {a: *} -> {b: *}
 * @param {!Object} keysMap
 * @param {!Object} obj
 * @return {!Object} New object with renamed keys
 * @see {@link https://github.com/ramda/ramda/wiki/Cookbook#rename-keys-of-an-object|Ramda Cookbook}, {@link RA.renameKeysWith|renameKeysWith}
 * @example
 *
 * const input = { firstName: 'Elisia', age: 22, type: 'human' };
 *
 * RA.renameKeys({ firstName: 'name', type: 'kind', foo: 'bar' })(input);
 * //=> { name: 'Elisia', age: 22, kind: 'human' }
 */
var renameKeys = (0, _ramda.curry)(function (keysMap, obj) {
  return (0, _renameKeysWith["default"])(valueOrKey(keysMap), obj);
});
var _default = renameKeys;
exports["default"] = _default;

/***/ }),

/***/ 21463:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Creates a new object with the own properties of the provided object, but the
 * keys renamed according to logic of renaming function.
 *
 * Keep in mind that in the case of keys conflict is behaviour undefined and
 * the result may vary between various JS engines!
 *
 * @func renameKeysWith
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.5.0|v1.5.0}
 * @category Object
 * @sig (a -> b) -> {a: *} -> {b: *}
 * @param {Function} fn Function that renames the keys
 * @param {!Object} obj Provided object
 * @return {!Object} New object with renamed keys
 * @see {@link https://github.com/ramda/ramda/wiki/Cookbook#rename-keys-of-an-object-by-a-function|Ramda Cookbook}, {@link RA.renameKeys|renameKeys}
 * @example
 *
 * RA.renameKeysWith(R.concat('a'), { A: 1, B: 2, C: 3 }) //=> { aA: 1, aB: 2, aC: 3 }
 */
var renameKeysWith = (0, _ramda.curry)(function (fn, obj) {
  return (0, _ramda.pipe)(_ramda.toPairs, (0, _ramda.map)((0, _ramda.over)((0, _ramda.lensIndex)(0), fn)), _ramda.fromPairs)(obj);
});
var _default = renameKeysWith;
exports["default"] = _default;

/***/ }),

/***/ 92845:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.repeatStrPonyfill = exports.repeatStrInvoker = exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _String = _interopRequireDefault(__webpack_require__(50279));
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var repeatStrPonyfill = (0, _ramda.curry)(_String["default"]);
exports.repeatStrPonyfill = repeatStrPonyfill;
var repeatStrInvoker = (0, _ramda.flip)((0, _ramda.invoker)(1, 'repeat'));

/**
 * Constructs and returns a new string which contains the specified
 * number of copies of the string on which it was called, concatenated together.
 *
 * @func repeatStr
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.11.0|v2.11.0}
 * @category List
 * @sig String -> Number -> String
 * @param {string} value String value to be repeated
 * @param {number} count An integer between 0 and +∞: [0, +∞), indicating the number of times to repeat the string in the newly-created string that is to be returned
 * @return {string} A new string containing the specified number of copies of the given string
 * @example
 *
 * RA.repeatStr('a', 3); //=> 'aaa'
 */
exports.repeatStrInvoker = repeatStrInvoker;
var repeatStr = (0, _isFunction["default"])(String.prototype.repeat) ? repeatStrInvoker : repeatStrPonyfill;
var _default = repeatStr;
exports["default"] = _default;

/***/ }),

/***/ 26390:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.replaceAllPonyfill = exports.replaceAllInvoker = exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
var _String = _interopRequireDefault(__webpack_require__(80443));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var replaceAllPonyfill = (0, _ramda.curryN)(3, _String["default"]);
exports.replaceAllPonyfill = replaceAllPonyfill;
var replaceAllInvoker = (0, _ramda.invoker)(2, 'replaceAll');

/**
 * Replaces all substring matches in a string with a replacement.
 *
 * @func replaceAll
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.17.0|v2.17.0}
 * @category String
 * @sig String -> String -> String -> String
 * @param {string} searchValue The substring or a global RegExp to match
 * @param {string} replaceValue The string to replace the matches with
 * @param {string} str The String to do the search and replacement in
 * @return {string} A new string containing all the `searchValue` replaced with the `replaceValue`
 * @throws {TypeError} When invalid arguments provided
 * @see {@link http://ramdajs.com/docs/#replace|R.replace}, {@link https://github.com/tc39/proposal-string-replaceall|TC39 proposal}
 * @example
 *
 * RA.replaceAll('ac', 'ef', 'ac ab ac ab'); //=> 'ef ab ef ab'
 * RA.replaceAll('', '_', 'xxx'); //=> '_x_x_x_'
 * RA.replaceAll(/x/g, 'v', 'xxx'); //=> 'vvv'
 * RA.replaceAll(/x/, 'v', 'xxx'); //=> TypeError
 */
exports.replaceAllInvoker = replaceAllInvoker;
var replaceAll = (0, _isFunction["default"])(String.prototype.replaceAll) ? replaceAllInvoker : replaceAllPonyfill;
var _default = replaceAll;
exports["default"] = _default;

/***/ }),

/***/ 37555:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/* eslint-disable max-len */
/**
 * Composable shortcut for `Promise.resolve`.
 *
 * Returns a Promise object that is resolved with the given value.
 * If the value is a thenable (i.e. has a "then" method), the returned promise will
 * "follow" that thenable, adopting its eventual state.
 *
 * @func resolveP
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.16.0|v1.16.0}
 * @category Function
 * @sig a -> Promise a
 * @param {*} [value=undefined] Argument to be resolved by this Promise. Can also be a Promise or a thenable to resolve
 * @return {Promise} A Promise that is resolved with the given value, or the promise passed as value, if the value was a promise object
 * @see {@link RA.rejectP|rejectP}
 * @example
 *
 * RA.resolveP(); //=> Promise(undefined)
 * RA.resolveP('a'); //=> Promise('a')
 * RA.resolveP([1, 2, 3]); //=> Promise([1, 2, 3])
 */
/* eslint-enable max-len */
var resolveP = (0, _ramda.bind)(Promise.resolve, Promise);
var _default = resolveP;
exports["default"] = _default;

/***/ }),

/***/ 5743:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns the value of a number rounded to the nearest integer.
 *
 * @func round
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.15.0|v2.15.0}
 * @category Math
 * @sig Number -> Number
 * @param {number} number The number to round
 * @return {number} The value of the given number rounded to the nearest integer
 * @example
 *
 * RA.round(0.9); //=> 1
 * RA.round(5.95); //=> 6
 * RA.round(5.5); //=> 6
 * RA.round(5.05); //=> 5
 * RA.round(-5.05); //=> -5
 * RA.round(-5.5); //=> -5
 * RA.round(-5.95); //=> -6
 */

var round = (0, _ramda.curryN)(1, (0, _ramda.bind)(Math.round, Math));
var _default = round;
exports["default"] = _default;

/***/ }),

/***/ 18572:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/* eslint-disable max-len */
/**
 * Runs the given list of functions in order with the supplied object, then returns the object.
 * Also known as the normal order sequencing combinator.
 *
 * Acts as a transducer if a transformer is given as second parameter.
 *
 * @func seq
 * @aliases sequencing
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.3.0|v2.3.0}
 * @category Function
 * @sig [(a -> *), (a -> *), ...] -> a -> a
 * @param {Array} fns The list of functions to call in order with `x` whose return values will be thrown away
 * @param {*} x
 * @return {*} `x`
 * @see {@link http://ramdajs.com/docs/#tap|R.tap}, {@link http://www.cs.rpi.edu/academics/courses/spring11/proglang/handouts/lambda-calculus-chapter.pdf|sequencing combinator explained}
 * @example
 *
 * RA.seq([console.info, console.log])('foo'); //=> prints 'foo' via info then log
 *
 * // usage in composition
 * R.pipe(
 *   R.concat('prefix '),
 *   RA.seq([
 *     console.info, //=> prints 'prefix test'
 *     console.log //=> prints 'prefix test'
 *   ]),
 *   R.toUpper
 * )('test'); //=> 'PREFIX TEST'
 */
/* eslint-enable max-len */
var seq = (0, _ramda.curry)(function (fns, x) {
  return (0, _ramda.tap)(function (tx) {
    return (0, _ramda.map)(function (fn) {
      return fn(tx);
    })(fns);
  })(x);
});
var _default = seq;
exports["default"] = _default;

/***/ }),

/***/ 49381:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.signPonyfill = exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
var _Math = _interopRequireDefault(__webpack_require__(29808));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var signPonyfill = (0, _ramda.curryN)(1, _Math["default"]);

/**
 * Returns the sign of a number, indicating whether the number is positive, negative or zero.
 *
 * @func sign
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.15.0|v2.15.0}
 * @category Math
 * @sig Number | String -> Number
 * @param {number} number A number
 * @return {number} A number representing the sign of the given argument. If the argument is a positive number, negative number, positive zero or negative zero, the function will return 1, -1, 0 or -0 respectively. Otherwise, NaN is returned
 * @example
 *
 * RA.sign(3); //  1
 * RA.sign(-3); // -1
 * RA.sign('-3'); // -1
 * RA.sign(0); //  0
 * RA.sign(-0); // -0
 * RA.sign(NaN); // NaN
 * RA.sign('foo'); // NaN
 */
exports.signPonyfill = signPonyfill;
var sign = (0, _isFunction["default"])(Math.sign) ? (0, _ramda.curryN)(1, (0, _ramda.bind)(Math.sign, Math)) : signPonyfill;
var _default = sign;
exports["default"] = _default;

/***/ }),

/***/ 35246:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * When given a number n and an array, returns an array containing every nth element.
 *
 * @func skipTake
 * @memberOf RA
 * @category List
 * @since {@link https://char0n.github.io/ramda-adjunct/2.26.0|v2.26.0}
 * @sig Number -> [a] -> [a]
 * @param {number} the nth element to extract
 * @param {Array} value the input array
 * @return {Array} An array containing every nth element
 * @example
 *
 * RA.skipTake(2, [1,2,3,4]) //=> [1, 3]
 * RA.skipTake(3, R.range(0, 20)); //=> [0, 3, 6, 9, 12, 15, 18]
 */

var skipTake = (0, _ramda.curry)(function (n, list) {
  return (0, _ramda.addIndex)(_ramda.filter)((0, _ramda.pipe)((0, _ramda.nthArg)(1), (0, _ramda.modulo)(_ramda.__, n), (0, _ramda.identical)(0)))(list);
});
var _default = skipTake;
exports["default"] = _default;

/***/ }),

/***/ 94237:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns the elements of the given list or string (or object with a slice method)
 * from fromIndex (inclusive).
 * Dispatches to the slice method of the second argument, if present.
 *
 * @func sliceFrom
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.16.0|v1.16.0}
 * @category List
 * @sig  Number -> [a] -> [a]
 * @param {number} fromIndex The start index (inclusive)
 * @param {Array|string} list The list or string to slice
 * @return {Array|string} The sliced list or string
 * @see {@link http://ramdajs.com/docs/#slice|R.slice}, {@link RA.sliceTo|sliceTo}
 * @example
 *
 * RA.sliceFrom(1, [1, 2, 3]); //=> [2, 3]
 */
var sliceFrom = (0, _ramda.slice)(_ramda.__, Infinity);
var _default = sliceFrom;
exports["default"] = _default;

/***/ }),

/***/ 68334:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns the elements of the given list or string (or object with a slice method)
 * to toIndex (exclusive).
 * Dispatches to the slice method of the second argument, if present.
 *
 * @func sliceTo
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.16.0|v1.16.0}
 * @category List
 * @sig  Number -> [a] -> [a]
 * @param {number} toIndex The end index (exclusive)
 * @param {Array|string} list The list or string to slice
 * @return {Array|string} The sliced list or string
 * @see {@link http://ramdajs.com/docs/#slice|R.slice}, {@link RA.sliceFrom|sliceFrom}
 * @example
 *
 * RA.sliceTo(2, [1, 2, 3]); //=> [1, 2]
 */
var sliceTo = (0, _ramda.slice)(0);
var _default = sliceTo;
exports["default"] = _default;

/***/ }),

/***/ 81757:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var pathToAscendSort = (0, _ramda.pipe)(_ramda.path, _ramda.ascend);
var mapPathsToAscendSort = (0, _ramda.map)(pathToAscendSort);

/**
 * Sort a list of objects by a list of paths (if first path value is equivalent, sort by second, etc).
 *
 * @func sortByPaths
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/3.1.0|v3.1.0}
 * @category List
 * @sig [[k]] -> [{k: v}] -> [{k: v}]
 * @param {Array.<Array.<string>>} paths A list of paths in the list param to sort by
 * @param {Array.<object>} list A list of objects to be sorted
 * @return {Array.<object>} A new list sorted by the paths in the paths param
 * @example
 *
 * const alice = {
 *   name: 'Alice',
 *   address: {
 *     street: 31,
 *     zipCode: 97777,
 *   },
 * };
 * const bob = {
 *   name: 'Bob',
 *   address: {
 *     street: 31,
 *     zipCode: 55555,
 *   },
 * };
 * const clara = {
 *   name: 'Clara',
 *   address: {
 *     street: 32,
 *     zipCode: 90210,
 *   },
 * };
 * const people = [clara, bob, alice]
 *
 * RA.sortByPaths([
 *   ['address', 'street'],
 *   ['address', 'zipCode'],
 * ], people); // => [bob, alice, clara]
 *
 * RA.sortByPaths([
 *   ['address', 'zipCode'],
 *   ['address', 'street'],
 * ], people); // => [bob, clara, alice]
 */

var sortByPaths = (0, _ramda.useWith)(_ramda.sortWith, [mapPathsToAscendSort, _ramda.identity]);
var _default = sortByPaths;
exports["default"] = _default;

/***/ }),

/***/ 65493:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _sortByProps = _interopRequireDefault(__webpack_require__(7134));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Sort a list of objects by a property.
 *
 * @func sortByProp
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/3.4.0|v3.4.0}
 * @category List
 * @sig k -> [{k: v}] -> [{k: v}]
 * @param {Array.<string>} prop The property in the list param to sort by
 * @param {Array.<object>} list A list of objects to be sorted
 * @return {Array.<object>} A new list sorted by the property in the prop param
 * @example
 *
 * // sorting list of tuples
 * const sortByFirstItem = sortByProp(0);
 * const listOfTuples = [[-1, 1], [-2, 2], [-3, 3]];
 * sortByFirstItem(listOfTuples); // => [[-3, 3], [-2, 2], [-1, 1]]
 *
 * // sorting list of objects
 * const sortByName = sortByProp('name');
 * const alice = {
 *   name: 'ALICE',
 *   age: 101,
 * };
 * const bob = {
 *   name: 'Bob',
 *   age: -10,
 * };
 * const clara = {
 *   name: 'clara',
 *   age: 314.159,
 * };
 * const people = [clara, bob, alice];
 * sortByName(people); // => [alice, bob, clara]
 */

var addValueInAnArray = (0, _ramda.append)(_ramda.__, []);
var sortByProp = (0, _ramda.useWith)(_sortByProps["default"], [addValueInAnArray, _ramda.identity]);
var _default = sortByProp;
exports["default"] = _default;

/***/ }),

/***/ 7134:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * Sort a list of objects by a list of props (if first prop value is equivalent, sort by second, etc).
 *
 * @func sortByProps
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.26.0|v2.26.0}
 * @category List
 * @sig [k] -> [{k: v}] -> [{k: v}]
 * @param {Array.<string>} props A list of properties in the list param to sort by
 * @param {Array.<object>} list A list of objects to be sorted
 * @return {Array.<object>} A new list sorted by the properties in the props param
 * @example
 *
 * sortByProps(['num'], [{num: 3}, {num: 2}, {num: 1}])
 * //=> [{num: 1}, {num: 2} {num: 3}]
 * sortByProps(['letter', 'num'], [{num: 3, letter: 'a'}, {num: 2, letter: 'a'} {num: 1, letter: 'z'}])
 * //=> [ {num: 2, letter: 'a'}, {num: 3, letter: 'a'}, {num: 1, letter: 'z'}]
 * sortByProps(['name', 'num'], [{num: 3}, {num: 2}, {num: 1}])
 * //=> [{num: 1}, {num: 2}, {num: 3}]
 */

var sortByProps = (0, _ramda.curry)(function (props, list) {
  var firstTruthy = function firstTruthy(_ref) {
    var _ref2 = _toArray(_ref),
      head = _ref2[0],
      tail = _ref2.slice(1);
    return (0, _ramda.reduce)(_ramda.either, head, tail);
  };
  var makeComparator = function makeComparator(propName) {
    return (0, _ramda.comparator)(function (a, b) {
      return (0, _ramda.lt)((0, _ramda.prop)(propName, a), (0, _ramda.prop)(propName, b));
    });
  };
  return (0, _ramda.sort)(firstTruthy((0, _ramda.map)(makeComparator, props)), list);
});
var _default = sortByProps;
exports["default"] = _default;

/***/ }),

/***/ 35681:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Spreads object under property path onto provided object.
 * It's like {@link RA.flattenPath|flattenPath}, but removes object under the property path.
 *
 * @func spreadPath
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|v1.19.0}
 * @category Object
 * @typedef Idx = String | Int
 * @sig [Idx] -> {k: v} -> {k: v}
 * @param {!Array.<string|number>} path The property path to spread
 * @param {!Object} obj The provided object
 * @return {!Object} The result of the spread
 * @see {@link RA.spreadProp|spreadProp}, {@link RA.flattenPath|flattenPath}
 * @example
 *
 * RA.spreadPath(
 *   ['b1', 'b2'],
 *   { a: 1, b1: { b2: { c: 3, d: 4 } } }
 * ); // => { a: 1, c: 3, d: 4, b1: {} };
 */
var spreadPath = (0, _ramda.curryN)(2, (0, _ramda.converge)(_ramda.mergeRight, [_ramda.dissocPath, (0, _ramda.pathOr)({})]));
var _default = spreadPath;
exports["default"] = _default;

/***/ }),

/***/ 17851:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _spreadPath = _interopRequireDefault(__webpack_require__(35681));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Spreads object under property onto provided object.
 * It's like {@link RA.flattenProp|flattenProp}, but removes object under the property.
 *
 * @func spreadProp
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|v1.19.0}
 * @category Object
 * @typedef Idx = String | Int
 * @sig Idx -> {k: v} -> {k: v}
 * @param {!string|number} prop The property to spread
 * @param {!Object} obj The provided object
 * @return {!Object} The result of the spread
 * @see {@link RA.spreadPath|spreadPath}, {@link RA.flattenProp|flattenProp}
 * @example
 *
 * RA.spreadProp('b', { a: 1, b: { c: 3, d: 4 } }); // => { a: 1, c: 3, d: 4 };
 */
var spreadProp = (0, _ramda.curry)(function (prop, obj) {
  return (0, _spreadPath["default"])((0, _ramda.of)(Array, prop), obj);
});
var _default = spreadProp;
exports["default"] = _default;

/***/ }),

/***/ 9135:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
/**
 * A function that returns new empty array on every call.
 *
 * @func stubArray
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.1.0|v2.1.0}
 * @category Function
 * @sig ... -> Array
 * @return {Array} New empty array
 * @example
 *
 * RA.stubArray(); //=> []
 * RA.stubArray(1, 2, 3); //=> []
 */

var stubArray = function stubArray() {
  return [];
};
var _default = stubArray;
exports["default"] = _default;

/***/ }),

/***/ 46207:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * A function that returns `null`.
 *
 * @func stubNull
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.6.0|v1.6.0}
 * @category Function
 * @sig ... -> null
 * @return {null}
 * @example
 *
 * RA.stubNull(); //=> null
 * RA.stubNull(1, 2, 3); //=> null
 */
var stubNull = (0, _ramda.always)(null);
var _default = stubNull;
exports["default"] = _default;

/***/ }),

/***/ 36051:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
/**
 * This function returns a new empty object.
 *
 * @func stubObj
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.1.0|v2.1.0}
 * @category Function
 * @sig ... -> Object
 * @aliases stubObject
 * @return {Object} Returns the new empty object.
 * @example
 *
 * RA.stubObj(); //=> {}
 * RA.stubObj(1, 2, 3); //=> {}
 */

var stubObj = function stubObj() {
  return {};
};
var _default = stubObj;
exports["default"] = _default;

/***/ }),

/***/ 27918:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * A function that returns empty string.
 *
 * @func stubString
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.1.0|v2.1.0}
 * @category Function
 * @sig ... -> String
 * @return {string} The empty string
 * @example
 *
 * RA.stubString(); //=> ''
 * RA.stubString(1, 2, 3); //=> ''
 */
var stubString = (0, _ramda.always)('');
var _default = stubString;
exports["default"] = _default;

/***/ }),

/***/ 25536:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * A function that returns `undefined`.
 *
 * @func stubUndefined
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.0.0|v1.0.0}
 * @category Function
 * @sig ... -> undefined
 * @return {undefined}
 * @example
 *
 * RA.stubUndefined(); //=> undefined
 * RA.stubUndefined(1, 2, 3); //=> undefined
 */
var stubUndefined = (0, _ramda.always)(void 0); // eslint-disable-line no-void
var _default = stubUndefined;
exports["default"] = _default;

/***/ }),

/***/ 9130:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Subtracts its first argument from its second argument.
 *
 * @func subtractNum
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category Math
 * @sig Number -> Number -> Number
 * @param {number} subtrahend the number to subtract
 * @param {number} minuend the number to subtract from
 * @return {number} A number representing the difference of subtracting the subtrahend from the minuend
 * @example
 *
 * RA.subtractNum(3, 5); //=> 2
 */
var subtractNum = (0, _ramda.flip)(_ramda.subtract);
var _default = subtractNum;
exports["default"] = _default;

/***/ }),

/***/ 61364:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.thenCatchP = exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Composable shortcut for `Promise.then` that allows for success and failure callbacks.
 * The thenCatchP function returns a Promise. It takes three arguments: a callback function for the success of the Promise,
 * a callback function for the failure of the Promise, and the promise instance itself.
 *
 * @func thenCatchP
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.27.0|v2.27.0}
 * @category Function
 * @sig (a -> b) -> (c -> d) -> Promise a -> Promise b | d
 * @param {Function} onFulfilled A Function called if the Promise is fulfilled. This function has one argument, the fulfillment value
 * @param {Function} onRejected A Function called if the Promise is rejected. This function has one argument, the error
 * @param {Promise} promise Any Promise or Thenable object
 * @return {Promise}
 * @see {@link RA.resolveP|resolveP}, {@link RA.rejectP|rejectP}, {@link RA.allP|allP}
 * @example
 *
 * const promise = Promise.resolve(1);
 * const add1 = x => x + 1;
 *
 * RA.thenCatchP(add1, console.error, promise); // => Promise(2)
 */
var thenCatchP = (0, _ramda.invoker)(2, 'then');
exports.thenCatchP = thenCatchP;
var _default = thenCatchP;
exports["default"] = _default;

/***/ }),

/***/ 69584:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.fromPonyfill = exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isIterable = _interopRequireDefault(__webpack_require__(33953));
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
var _Array = _interopRequireDefault(__webpack_require__(94453));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var fromPonyfill = (0, _ramda.curryN)(1, _Array["default"]);
exports.fromPonyfill = fromPonyfill;
var fromArray = (0, _isFunction["default"])(Array.from) ? (0, _ramda.curryN)(1, Array.from) : fromPonyfill;

/**
 * Converts value to an array.
 *
 * @func toArray
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category List
 * @sig * -> [a]
 * @param {*} val The value to convert
 * @return {Array}
 * @example
 *
 * RA.toArray([1, 2]); //=> [1, 2]
 * RA.toArray({'foo': 1, 'bar': 2}); //=> [1, 2]
 * RA.toArray('abc'); //=> ['a', 'b', 'c']
 * RA.toArray(1); //=> []
 * RA.toArray(null); //=> []
 */

var toArray = (0, _ramda.ifElse)(_isIterable["default"], fromArray, _ramda.values);
var _default = toArray;
exports["default"] = _default;

/***/ }),

/***/ 22242:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Converts double-precision 64-bit binary format IEEE 754 to signed 32 bit integer number.
 *
 * @func toInteger32
 * @aliases toInt32
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.28.0|v2.28.0}
 * @category Math
 * @sig Number -> Number
 * @param {number} number A number
 * @return {number} A signed 32-bit integer number
 * @see {@link RA.toUInteger32|toUInteger32}, {@link http://speakingjs.com/es5/ch11.html#integers_via_bitwise_operators}
 * @example
 *
 * RA.toInteger32(2 ** 35); // => 0
 * RA.toInteger32(2 ** 30); // => 1073741824
 */ // eslint-disable-next-line no-bitwise
var toInteger32 = (0, _ramda.curryN)(1, function (val) {
  return val >> 0;
});
var _default = toInteger32;
exports["default"] = _default;

/***/ }),

/***/ 71370:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _isCoercible = _interopRequireDefault(__webpack_require__(64969));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Converts value to a number.
 *
 * @func toNumber
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.36.0|v2.36.0}
 * @category Type
 * @param {*} val The value to convert
 * @return {Number}
 * @example
 *
 * RA.toNumber(3.2); //=> 3.2
 * RA.toNumber(Number.MIN_VALUE); //=> 5e-324
 * RA.toNumber(Infinity); //=> Infinity
 * RA.toNumber('3.2'); //=> 3.2
 * RA.toNumber(Symbol('3.2')); //=> NaN
 */
var toNumber = (0, _ramda.ifElse)(_isCoercible["default"], Number, (0, _ramda.always)(NaN));
var _default = toNumber;
exports["default"] = _default;

/***/ }),

/***/ 24020:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Converts double-precision 64-bit binary format IEEE 754 to unsigned 32 bit integer number.
 *
 * @func toUinteger32
 * @aliases toUint32
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.28.0|v2.28.0}
 * @category Math
 * @sig Number -> Number
 * @param {number} val Value to be converted.
 * @return {number}
 * @see {@link RA.toInteger32|toInteger32}, {@link http://speakingjs.com/es5/ch11.html#integers_via_bitwise_operators}
 * @example
 *
 * RA.toUinteger32(1.5); //=> 1
 * RA.toInteger32(2 ** 35); // => 0
 * RA.toInteger32(2 ** 31); // => 2147483648
 * RA.toInteger32(2 ** 30); // => 1073741824
 */ // eslint-disable-next-line no-bitwise
var toUinteger32 = (0, _ramda.curryN)(1, function (val) {
  return val >>> 0;
});
var _default = toUinteger32;
exports["default"] = _default;

/***/ }),

/***/ 17235:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _included = _interopRequireDefault(__webpack_require__(2655));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Removes specified characters from the end of a string.
 *
 * @func trimCharsEnd
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.25.0|v2.25.0}
 * @category String
 * @sig String -> String
 * @param {string} chars The characters to trim
 * @param {string} value The string to trim
 * @return {string} Returns the trimmed string.
 * @example
 *
 * RA.trimCharsEnd('_-', '-_-abc-_-'); //=> '-_-abc'
 */

var trimCharsEnd = (0, _ramda.curry)(function (chars, value) {
  return (0, _ramda.pipe)((0, _ramda.split)(''), (0, _ramda.dropLastWhile)((0, _included["default"])(chars)), (0, _ramda.join)(''))(value);
});
var _default = trimCharsEnd;
exports["default"] = _default;

/***/ }),

/***/ 34638:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _included = _interopRequireDefault(__webpack_require__(2655));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Removes specified characters from the beginning of a string.
 *
 * @func trimCharsStart
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.24.0|v2.24.0}
 * @category String
 * @sig String -> String
 * @param {string} chars The characters to trim
 * @param {string} value The string to trim
 * @return {string} Returns the trimmed string.
 * @example
 *
 * RA.trimCharsStart('_-', '-_-abc-_-'); //=> 'abc-_-'
 */

var trimCharsStart = (0, _ramda.curry)(function (chars, value) {
  return (0, _ramda.pipe)((0, _ramda.split)(''), (0, _ramda.dropWhile)((0, _included["default"])(chars)), (0, _ramda.join)(''))(value);
});
var _default = trimCharsStart;
exports["default"] = _default;

/***/ }),

/***/ 66600:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.trimEndPonyfill = exports.trimEndInvoker = exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _String = _interopRequireDefault(__webpack_require__(5167));
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var trimEndPonyfill = _String["default"];
exports.trimEndPonyfill = trimEndPonyfill;
var trimEndInvoker = (0, _ramda.invoker)(0, 'trimEnd');

/**
 * Removes whitespace from the end of a string.
 *
 * @func trimEnd
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category String
 * @sig String -> String
 * @param {string} value String value to have the whitespace removed from the end
 * @return {string} A new string representing the calling string stripped of whitespace from its end (right end).
 * @see {@link RA.trimEnd|trimEnd}
 * @example
 *
 * RA.trimEnd('abc   '); //=> 'abc'
 */
exports.trimEndInvoker = trimEndInvoker;
var trimEnd = (0, _isFunction["default"])(String.prototype.trimEnd) ? trimEndInvoker : trimEndPonyfill;
var _default = trimEnd;
exports["default"] = _default;

/***/ }),

/***/ 95498:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.trimStartPonyfill = exports.trimStartInvoker = exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _String = _interopRequireDefault(__webpack_require__(32350));
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var trimStartPonyfill = _String["default"];
exports.trimStartPonyfill = trimStartPonyfill;
var trimStartInvoker = (0, _ramda.invoker)(0, 'trimStart');

/**
 * Removes whitespace from the beginning of a string.
 *
 * @func trimStart
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category String
 * @sig String -> String
 * @param {string} value String value to have the whitespace removed from the beginning
 * @return {string} A new string representing the calling string stripped of whitespace from its beginning (left end).
 * @example
 *
 * RA.trimStart('  abc'); //=> 'abc'
 */
exports.trimStartInvoker = trimStartInvoker;
var trimStart = (0, _isFunction["default"])(String.prototype.trimStart) ? trimStartInvoker : trimStartPonyfill;
var _default = trimStart;
exports["default"] = _default;

/***/ }),

/***/ 59927:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.truncPonyfill = exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _Math = _interopRequireDefault(__webpack_require__(90092));
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var truncPonyfill = (0, _ramda.curryN)(1, _Math["default"]);

/**
 * Returns the integer part of a number by removing any fractional digits.
 *
 * @func trunc
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.15.0|v2.15.0}
 * @category Math
 * @sig Number | String -> Number
 * @param {number|string} number The number to trunc
 * @return {number} The integer part of the given number
 * @example
 *
 * RA.trunc(13.37); //=> 13
 * RA.trunc(42.84); //=> 42
 * RA.trunc(0.123); //=>  0
 * RA.trunc(-0.123); //=> -0
 * RA.trunc('-1.123'); //=> -1
 * RA.trunc(NaN); //=> NaN
 * RA.trunc('foo'); //=> NaN
 */
exports.truncPonyfill = truncPonyfill;
var trunc = (0, _isFunction["default"])(Math.trunc) ? (0, _ramda.curryN)(1, (0, _ramda.bind)(Math.trunc, Math)) : truncPonyfill;
var _default = trunc;
exports["default"] = _default;

/***/ }),

/***/ 1263:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
var _lengthEq = _interopRequireDefault(__webpack_require__(58481));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Creates a new list out of the supplied object by applying the function to each key/value pairing.
 *
 * @func unzipObjWith
 * @memberOf RA
 * @category Object
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @sig  (v, k) => [k, v] -> { k: v } -> [[k], [v]]
 * @param {Function} fn The function to transform each value-key pair
 * @param {Object} obj Object to unzip
 * @return {Array} A pair of tw lists: a list of keys and a list of values
 * @see {@link https://ramdajs.com/docs/#zipObj|zipObj}, {@link RA.zipObjWith|zipObjWith}
 * @example
 *
 * RA.unzipObjWith((v, k) => [`new${k.toUpperCase()}`, 2 * v], { a: 1, b: 2, c: 3 });
 * //=> [['newA', 'newB', 'newC'], [2, 4, 6]]
 */
var unzipObjWith = (0, _ramda.curryN)(2, function (fn, obj) {
  return (0, _ramda.pipe)(_ramda.toPairs, (0, _ramda.map)((0, _ramda.pipe)(_ramda.flip, _ramda.apply)(fn)), _ramda.transpose, (0, _ramda.when)((0, _lengthEq["default"])(0), function () {
    return [[], []];
  }))(obj);
});
var _default = unzipObjWith;
exports["default"] = _default;

/***/ }),

/***/ 62696:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Returns a "view" of the given data structure, determined by the given lens.
 * The lens's focus determines which portion of the data structure is visible.
 * Returns the defaultValue if "view" is null, undefined or NaN; otherwise the "view" is returned.
 *
 * @func viewOr
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.13.0|1.13.0}
 * @category Object
 * @typedef Lens s b = Functor f => (b -> f b) -> s -> f s
 * @sig a -> Lens s b -> s -> b | a
 * @see {@link http://ramdajs.com/docs/#view|R.view}
 * @param {*} defaultValue The default value
 * @param {Function} lens Van Laarhoven lens
 * @param {*} data The data structure
 * @returns {*} "view" or defaultValue
 *
 * @example
 *
 * RA.viewOr('N/A', R.lensProp('x'), {}); // => 'N/A'
 * RA.viewOr('N/A', R.lensProp('x'), { x: 1 }); // => 1
 * RA.viewOr('some', R.lensProp('y'), { y: null }); // => 'some'
 * RA.viewOr('some', R.lensProp('y'), { y: false }); // => false
 */

var viewOr = (0, _ramda.curryN)(3, function (defaultValue, lens, data) {
  return (0, _ramda.defaultTo)(defaultValue, (0, _ramda.view)(lens, data));
});
var _default = viewOr;
exports["default"] = _default;

/***/ }),

/***/ 699:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Weaves a configuration into function returning the runnable monad like `Reader` or `Free`.
 * This allows us to pre-bind the configuration in advance and use the weaved function
 * without need to explicitly pass the configuration on every call.
 *
 * @func weave
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.7.0|v1.7.0}
 * @category Function
 * @sig (*... -> *) -> * -> (*... -> *)
 * @param {Function} fn The function to weave
 * @param {*} config The configuration to weave into fn
 * @return {Function} Auto-curried weaved function
 * @example
 *
 * const { Reader: reader } = require('monet');
 *
 * const log = value => reader(
 *   config => config.log(value)
 * );
 *
 * // no weaving
 * log('test').run(console); //=> prints 'test'
 *
 * // weaving
 * const wlog = RA.weave(log, console);
 * wlog('test'); //=> prints 'test'
 */
var weave = (0, _ramda.curryN)(2, function (fn, config) {
  return (0, _ramda.curryN)(fn.length, function () {
    return fn.apply(void 0, arguments).run(config);
  });
});
var _default = weave;
exports["default"] = _default;

/***/ }),

/***/ 21638:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Weaves a configuration into function returning the runnable monad like `Reader` or `Free`.
 * This allows us to pre-bind the configuration in advance and use the weaved function
 * without need to explicitly pass the configuration on every call.
 *
 * @func weaveLazy
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.10.0|v1.10.0}
 * @category Function
 * @sig (*... -> *) -> (* -> *) -> (*... -> *)
 * @param {Function} fn The function to weave
 * @param {Function} configAccessor The function that returns the configuration object
 * @return {Function} Auto-curried weaved function
 * @example
 *
 * const { Reader: reader } = require('monet');
 *
 * const log = value => reader(
 *   config => config.log(value)
 * );
 *
 * const consoleAccessor = R.always(console);
 *
 * // no weaving
 * log('test').run(console); //=> prints 'test'
 *
 * // weaving
 * const wlog = RA.weaveLazy(log, consoleAccessor);
 * wlog('test'); //=> prints 'test'
 */
var weaveLazy = (0, _ramda.curryN)(2, function (fn, configAccessor) {
  return (0, _ramda.curryN)(fn.length, function () {
    return fn.apply(void 0, arguments).run(configAccessor());
  });
});
var _default = weaveLazy;
exports["default"] = _default;

/***/ }),

/***/ 3207:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _ramda = __webpack_require__(36);
/**
 * Creates a new object out of a list of keys and a list of values by applying the function
 * to each equally-positioned pair in the lists.
 * Key/value pairing is truncated to the length of the shorter of the two lists.
 *
 * @func zipObjWith
 * @memberOf RA
 * @category Object
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @sig (b, a) -> [k, v] -> [a] -> [b] -> { k: v }
 * @param {Function} fn The function to transform each value-key pair
 * @param {Array} keys Array to transform into the properties on the output object
 * @param {Array} values Array to transform into the values on the output object
 * @return {Object}  The object made by pairing up and transforming same-indexed elements of `keys` and `values`.
 * @see {@link https://ramdajs.com/docs/#zipObj|zipObj}, {@link RA.unzipObjWith|unzipObjWith}
 * @example
 *
 * RA.zipObjWith((value, key) => [key, `${key}${value + 1}`]), ['a', 'b', 'c'], [1, 2, 3]);
 *  // => { a: 'a2', b: 'b3', c: 'c4' }
 */
var zipObjWith = (0, _ramda.curryN)(3, function (fn, keys, values) {
  return (0, _ramda.pipe)(_ramda.zip, (0, _ramda.map)((0, _ramda.apply)(fn)), _ramda.fromPairs)(values, keys);
});
var _default = zipObjWith;
exports["default"] = _default;

/***/ }),

/***/ 91369:
/***/ ((module) => {

/**
 * A function that always returns `false`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.T
 * @example
 *
 *      R.F(); //=> false
 */
var F = function () {
  return false;
};

module.exports = F;

/***/ }),

/***/ 53007:
/***/ ((module) => {

/**
 * A function that always returns `true`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.F
 * @example
 *
 *      R.T(); //=> true
 */
var T = function () {
  return true;
};

module.exports = T;

/***/ }),

/***/ 34923:
/***/ ((module) => {

/**
 * A special placeholder value used to specify "gaps" within curried functions,
 * allowing partial application of any combination of arguments, regardless of
 * their positions.
 *
 * If `g` is a curried ternary function and `_` is `R.__`, the following are
 * equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2, _)(1, 3)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @name __
 * @constant
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @example
 *
 *      const greet = R.replace('{name}', R.__, 'Hello, {name}!');
 *      greet('Alice'); //=> 'Hello, Alice!'
 */
module.exports = {
  '@@functional/placeholder': true
};

/***/ }),

/***/ 63073:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Adds two values.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 * @see R.subtract
 * @example
 *
 *      R.add(2, 3);       //=>  5
 *      R.add(7)(10);      //=> 17
 */


var add =
/*#__PURE__*/
_curry2(function add(a, b) {
  return Number(a) + Number(b);
});

module.exports = add;

/***/ }),

/***/ 45582:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _concat =
/*#__PURE__*/
__webpack_require__(14011);

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var curryN =
/*#__PURE__*/
__webpack_require__(2220);
/**
 * Creates a new list iteration function from an existing one by adding two new
 * parameters to its callback function: the current index, and the entire list.
 *
 * This would turn, for instance, [`R.map`](#map) function into one that
 * more closely resembles `Array.prototype.map`. Note that this will only work
 * for functions in which the iteration callback function is the first
 * parameter, and where the list is the last parameter. (This latter might be
 * unimportant if the list parameter is not used.)
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Function
 * @category List
 * @sig (((a ...) -> b) ... -> [a] -> *) -> (((a ..., Int, [a]) -> b) ... -> [a] -> *)
 * @param {Function} fn A list iteration function that does not pass index or list to its callback
 * @return {Function} An altered list iteration function that passes (item, index, list) to its callback
 * @example
 *
 *      const mapIndexed = R.addIndex(R.map);
 *      mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
 *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
 */


var addIndex =
/*#__PURE__*/
_curry1(function addIndex(fn) {
  return curryN(fn.length, function () {
    var idx = 0;
    var origFn = arguments[0];
    var list = arguments[arguments.length - 1];
    var args = Array.prototype.slice.call(arguments, 0);

    args[0] = function () {
      var result = origFn.apply(this, _concat(arguments, [idx, list]));
      idx += 1;
      return result;
    };

    return fn.apply(this, args);
  });
});

module.exports = addIndex;

/***/ }),

/***/ 16160:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _concat =
/*#__PURE__*/
__webpack_require__(14011);

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var curryN =
/*#__PURE__*/
__webpack_require__(2220);
/**
 * As with `addIndex`, `addIndexRight` creates a new list iteration function
 * from an existing one by adding two new parameters to its callback function:
 * the current index, and the entire list.
 *
 * Unlike `addIndex`, `addIndexRight` iterates from the right to the left.
 *
 * @func
 * @memberOf R
 * @since v0.29.0
 * @category Function
 * @category List
 * @sig ((a ... -> b) ... -> [a] -> *) -> (a ..., Int, [a] -> b) ... -> [a] -> *)
 * @param {Function} fn A list iteration function that does not pass index or list to its callback
 * @return {Function} An altered list iteration function that passes (item, index, list) to its callback
 * @example
 *
 *      const revmap = (fn, ary) => R.map(fn, R.reverse(ary));
 *      const revmapIndexed = R.addIndexRight(revmap);
 *      revmapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
 *      //=> [ '5-r', '4-a', '3-b', '2-o', '1-o', '0-f' ]
 */


var addIndexRight =
/*#__PURE__*/
_curry1(function addIndex(fn) {
  return curryN(fn.length, function () {
    var origFn = arguments[0];
    var list = arguments[arguments.length - 1];
    var idx = list.length - 1;
    var args = Array.prototype.slice.call(arguments, 0);

    args[0] = function () {
      var result = origFn.apply(this, _concat(arguments, [idx, list]));
      idx -= 1;
      return result;
    };

    return fn.apply(this, args);
  });
});

module.exports = addIndexRight;

/***/ }),

/***/ 82515:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _concat =
/*#__PURE__*/
__webpack_require__(14011);

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);
/**
 * Applies a function to the value at the given index of an array, returning a
 * new copy of the array with the element at the given index replaced with the
 * result of the function application.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig Number -> (a -> a) -> [a] -> [a]
 * @param {Number} idx The index.
 * @param {Function} fn The function to apply.
 * @param {Array|Arguments} list An array-like object whose value
 *        at the supplied index will be replaced.
 * @return {Array} A copy of the supplied array-like object with
 *         the element at index `idx` replaced with the value
 *         returned by applying `fn` to the existing element.
 * @see R.update
 * @example
 *
 *      R.adjust(1, R.toUpper, ['a', 'b', 'c', 'd']);      //=> ['a', 'B', 'c', 'd']
 *      R.adjust(-1, R.toUpper, ['a', 'b', 'c', 'd']);     //=> ['a', 'b', 'c', 'D']
 * @symb R.adjust(-1, f, [a, b]) = [a, f(b)]
 * @symb R.adjust(0, f, [a, b]) = [f(a), b]
 */


var adjust =
/*#__PURE__*/
_curry3(function adjust(idx, fn, list) {
  var len = list.length;

  if (idx >= len || idx < -len) {
    return list;
  }

  var _idx = (len + idx) % len;

  var _list = _concat(list);

  _list[_idx] = fn(list[_idx]);
  return _list;
});

module.exports = adjust;

/***/ }),

/***/ 22626:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _xall =
/*#__PURE__*/
__webpack_require__(15750);
/**
 * Returns `true` if all elements of the list match the predicate, `false` if
 * there are any that don't.
 *
 * Dispatches to the `all` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
 *         otherwise.
 * @see R.any, R.none, R.transduce
 * @example
 *
 *      const equals3 = R.equals(3);
 *      R.all(equals3)([3, 3, 3, 3]); //=> true
 *      R.all(equals3)([3, 3, 1, 3]); //=> false
 */


var all =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable(['all'], _xall, function all(fn, list) {
  var idx = 0;

  while (idx < list.length) {
    if (!fn(list[idx])) {
      return false;
    }

    idx += 1;
  }

  return true;
}));

module.exports = all;

/***/ }),

/***/ 57735:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var curryN =
/*#__PURE__*/
__webpack_require__(2220);

var max =
/*#__PURE__*/
__webpack_require__(21186);

var pluck =
/*#__PURE__*/
__webpack_require__(84585);

var reduce =
/*#__PURE__*/
__webpack_require__(20793);
/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if every one of the provided predicates is satisfied
 * by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.anyPass, R.both
 * @example
 *
 *      const isQueen = R.propEq('rank', 'Q');
 *      const isSpade = R.propEq('suit', '♠︎');
 *      const isQueenOfSpades = R.allPass([isQueen, isSpade]);
 *
 *      isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
 *      isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
 */


var allPass =
/*#__PURE__*/
_curry1(function allPass(preds) {
  return curryN(reduce(max, 0, pluck('length', preds)), function () {
    var idx = 0;
    var len = preds.length;

    while (idx < len) {
      if (!preds[idx].apply(this, arguments)) {
        return false;
      }

      idx += 1;
    }

    return true;
  });
});

module.exports = allPass;

/***/ }),

/***/ 54115:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);
/**
 * Returns a function that always returns the given value. Note that for
 * non-primitives the value returned is a reference to the original value.
 *
 * This function is known as `const`, `constant`, or `K` (for K combinator) in
 * other languages and libraries.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> (* -> a)
 * @param {*} val The value to wrap in a function
 * @return {Function} A Function :: * -> val.
 * @example
 *
 *      const t = R.always('Tee');
 *      t(); //=> 'Tee'
 */


var always =
/*#__PURE__*/
_curry1(function always(val) {
  return function () {
    return val;
  };
});

module.exports = always;

/***/ }),

/***/ 42537:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Returns the first argument if it is falsy, otherwise the second argument.
 * Acts as the boolean `and` statement if both inputs are `Boolean`s.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any}
 * @see R.both, R.or
 * @example
 *
 *      R.and(true, true); //=> true
 *      R.and(true, false); //=> false
 *      R.and(false, true); //=> false
 *      R.and(false, false); //=> false
 */


var and =
/*#__PURE__*/
_curry2(function and(a, b) {
  return a && b;
});

module.exports = and;

/***/ }),

/***/ 1859:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _assertPromise =
/*#__PURE__*/
__webpack_require__(80649);
/**
 * Returns the result of applying the onSuccess function to the value inside
 * a successfully resolved promise. This is useful for working with promises
 * inside function compositions.
 *
 * @func
 * @memberOf R
 * @since v0.27.1
 * @category Function
 * @sig (a -> b) -> (Promise e a) -> (Promise e b)
 * @sig (a -> (Promise e b)) -> (Promise e a) -> (Promise e b)
 * @param {Function} onSuccess The function to apply. Can return a value or a promise of a value.
 * @param {Promise} p
 * @return {Promise} The result of calling `p.then(onSuccess)`
 * @see R.otherwise
 * @example
 *
 *      const makeQuery = email => ({ query: { email }});
 *      const fetchMember = request =>
 *        Promise.resolve({ firstName: 'Bob', lastName: 'Loblaw', id: 42 });
 *
 *      //getMemberName :: String -> Promise ({ firstName, lastName })
 *      const getMemberName = R.pipe(
 *        makeQuery,
 *        fetchMember,
 *        R.andThen(R.pick(['firstName', 'lastName']))
 *      );
 *
 *      getMemberName('bob@gmail.com').then(console.log);
 */


var andThen =
/*#__PURE__*/
_curry2(function andThen(f, p) {
  _assertPromise('andThen', p);

  return p.then(f);
});

module.exports = andThen;

/***/ }),

/***/ 78095:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _xany =
/*#__PURE__*/
__webpack_require__(97034);
/**
 * Returns `true` if at least one of the elements of the list match the predicate,
 * `false` otherwise.
 *
 * Dispatches to the `any` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
 *         otherwise.
 * @see R.all, R.none, R.transduce
 * @example
 *
 *      const lessThan0 = R.flip(R.lt)(0);
 *      const lessThan2 = R.flip(R.lt)(2);
 *      R.any(lessThan0)([1, 2]); //=> false
 *      R.any(lessThan2)([1, 2]); //=> true
 */


var any =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable(['any'], _xany, function any(fn, list) {
  var idx = 0;

  while (idx < list.length) {
    if (fn(list[idx])) {
      return true;
    }

    idx += 1;
  }

  return false;
}));

module.exports = any;

/***/ }),

/***/ 98766:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var curryN =
/*#__PURE__*/
__webpack_require__(2220);

var max =
/*#__PURE__*/
__webpack_require__(21186);

var pluck =
/*#__PURE__*/
__webpack_require__(84585);

var reduce =
/*#__PURE__*/
__webpack_require__(20793);
/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if at least one of the provided predicates is
 * satisfied by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.allPass, R.either
 * @example
 *
 *      const isClub = R.propEq('suit', '♣');
 *      const isSpade = R.propEq('suit', '♠');
 *      const isBlackCard = R.anyPass([isClub, isSpade]);
 *
 *      isBlackCard({rank: '10', suit: '♣'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♠'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♦'}); //=> false
 */


var anyPass =
/*#__PURE__*/
_curry1(function anyPass(preds) {
  return curryN(reduce(max, 0, pluck('length', preds)), function () {
    var idx = 0;
    var len = preds.length;

    while (idx < len) {
      if (preds[idx].apply(this, arguments)) {
        return true;
      }

      idx += 1;
    }

    return false;
  });
});

module.exports = anyPass;

/***/ }),

/***/ 77693:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _concat =
/*#__PURE__*/
__webpack_require__(14011);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _reduce =
/*#__PURE__*/
__webpack_require__(39488);

var map =
/*#__PURE__*/
__webpack_require__(61894);
/**
 * ap applies a list of functions to a list of values.
 *
 * Dispatches to the `ap` method of the first argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig [a -> b] -> [a] -> [b]
 * @sig Apply f => f (a -> b) -> f a -> f b
 * @sig (r -> a -> b) -> (r -> a) -> (r -> b)
 * @param {*} applyF
 * @param {*} applyX
 * @return {*}
 * @example
 *
 *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
 *      R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
 *
 *      // R.ap can also be used as S combinator
 *      // when only two functions are passed
 *      R.ap(R.concat, R.toUpper)('Ramda') //=> 'RamdaRAMDA'
 * @symb R.ap([f, g], [a, b]) = [f(a), f(b), g(a), g(b)]
 */


var ap =
/*#__PURE__*/
_curry2(function ap(applyF, applyX) {
  return typeof applyX['fantasy-land/ap'] === 'function' ? applyX['fantasy-land/ap'](applyF) : typeof applyF.ap === 'function' ? applyF.ap(applyX) : typeof applyF === 'function' ? function (x) {
    return applyF(x)(applyX(x));
  } : _reduce(function (acc, f) {
    return _concat(acc, map(f, applyX));
  }, [], applyF);
});

module.exports = ap;

/***/ }),

/***/ 85133:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _aperture =
/*#__PURE__*/
__webpack_require__(45179);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _xaperture =
/*#__PURE__*/
__webpack_require__(76020);
/**
 * Returns a new list, composed of n-tuples of consecutive elements. If `n` is
 * greater than the length of the list, an empty list is returned.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @param {Number} n The size of the tuples to create
 * @param {Array} list The list to split into `n`-length tuples
 * @return {Array} The resulting list of `n`-length tuples
 * @see R.transduce
 * @example
 *
 *      R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
 *      R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *      R.aperture(7, [1, 2, 3, 4, 5]); //=> []
 */


var aperture =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable([], _xaperture, _aperture));

module.exports = aperture;

/***/ }),

/***/ 89576:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _concat =
/*#__PURE__*/
__webpack_require__(14011);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The element to add to the end of the new list.
 * @param {Array} list The list of elements to add a new item to.
 *        list.
 * @return {Array} A new list containing the elements of the old list followed by `el`.
 * @see R.prepend
 * @example
 *
 *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 *      R.append('tests', []); //=> ['tests']
 *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
 */


var append =
/*#__PURE__*/
_curry2(function append(el, list) {
  return _concat(list, [el]);
});

module.exports = append;

/***/ }),

/***/ 75748:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Applies function `fn` to the argument list `args`. This is useful for
 * creating a fixed-arity function from a variadic function. `fn` should be a
 * bound function if context is significant.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> a) -> [*] -> a
 * @param {Function} fn The function which will be called with `args`
 * @param {Array} args The arguments to call `fn` with
 * @return {*} result The result, equivalent to `fn(...args)`
 * @see R.call, R.unapply
 * @example
 *
 *      const nums = [1, 2, 3, -99, 42, 6, 7];
 *      R.apply(Math.max, nums); //=> 42
 * @symb R.apply(f, [a, b, c]) = f(a, b, c)
 */


var apply =
/*#__PURE__*/
_curry2(function apply(fn, args) {
  return fn.apply(this, args);
});

module.exports = apply;

/***/ }),

/***/ 58375:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var _isArray =
/*#__PURE__*/
__webpack_require__(20219);

var apply =
/*#__PURE__*/
__webpack_require__(75748);

var curryN =
/*#__PURE__*/
__webpack_require__(2220);

var max =
/*#__PURE__*/
__webpack_require__(21186);

var pluck =
/*#__PURE__*/
__webpack_require__(84585);

var reduce =
/*#__PURE__*/
__webpack_require__(20793);

var keys =
/*#__PURE__*/
__webpack_require__(90368);

var values =
/*#__PURE__*/
__webpack_require__(33411); // Use custom mapValues function to avoid issues with specs that include a "map" key and R.map
// delegating calls to .map


function mapValues(fn, obj) {
  return _isArray(obj) ? obj.map(fn) : keys(obj).reduce(function (acc, key) {
    acc[key] = fn(obj[key]);
    return acc;
  }, {});
}
/**
 * Given a spec object recursively mapping properties to functions, creates a
 * function producing an object of the same structure, by mapping each property
 * to the result of calling its associated function with the supplied arguments.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig {k: ((a, b, ..., m) -> v)} -> ((a, b, ..., m) -> {k: v})
 * @param {Object} spec an object recursively mapping properties to functions for
 *        producing the values for these properties.
 * @return {Function} A function that returns an object of the same structure
 * as `spec', with each property set to the value returned by calling its
 * associated function with the supplied arguments.
 * @see R.converge, R.juxt
 * @example
 *
 *      const getMetrics = R.applySpec({
 *        sum: R.add,
 *        nested: { mul: R.multiply }
 *      });
 *      getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
 * @symb R.applySpec({ x: f, y: { z: g } })(a, b) = { x: f(a, b), y: { z: g(a, b) } }
 */


var applySpec =
/*#__PURE__*/
_curry1(function applySpec(spec) {
  spec = mapValues(function (v) {
    return typeof v == 'function' ? v : applySpec(v);
  }, spec);
  return curryN(reduce(max, 0, pluck('length', values(spec))), function () {
    var args = arguments;
    return mapValues(function (f) {
      return apply(f, args);
    }, spec);
  });
});

module.exports = applySpec;

/***/ }),

/***/ 61423:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Takes a value and applies a function to it.
 *
 * This function is also known as the `thrush` combinator.
 *
 * @func
 * @memberOf R
 * @since v0.25.0
 * @category Function
 * @sig a -> (a -> b) -> b
 * @param {*} x The value
 * @param {Function} f The function to apply
 * @return {*} The result of applying `f` to `x`
 * @example
 *
 *      const t42 = R.applyTo(42);
 *      t42(R.identity); //=> 42
 *      t42(R.add(1)); //=> 43
 */


var applyTo =
/*#__PURE__*/
_curry2(function applyTo(x, f) {
  return f(x);
});

module.exports = applyTo;

/***/ }),

/***/ 7772:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);
/**
 * Makes an ascending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) < fn(b), `1` if fn(b) < fn(a), otherwise `0`
 * @see R.descend
 * @example
 *
 *      const byAge = R.ascend(R.prop('age'));
 *      const people = [
 *        { name: 'Emma', age: 70 },
 *        { name: 'Peter', age: 78 },
 *        { name: 'Mikhail', age: 62 },
 *      ];
 *      const peopleByYoungestFirst = R.sort(byAge, people);
 *        //=> [{ name: 'Mikhail', age: 62 },{ name: 'Emma', age: 70 }, { name: 'Peter', age: 78 }]
 */


var ascend =
/*#__PURE__*/
_curry3(function ascend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa < bb ? -1 : aa > bb ? 1 : 0;
});

module.exports = ascend;

/***/ }),

/***/ 66497:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var assocPath =
/*#__PURE__*/
__webpack_require__(32423);
/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig Idx -> a -> {k: v} -> {k: v}
 * @param {String|Number} prop The property name to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except for the changed property.
 * @see R.dissoc, R.pick
 * @example
 *
 *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 */


var assoc =
/*#__PURE__*/
_curry3(function assoc(prop, val, obj) {
  return assocPath([prop], val, obj);
});

module.exports = assoc;

/***/ }),

/***/ 32423:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var _has =
/*#__PURE__*/
__webpack_require__(87684);

var _isInteger =
/*#__PURE__*/
__webpack_require__(37000);

var _assoc =
/*#__PURE__*/
__webpack_require__(17031);

var isNil =
/*#__PURE__*/
__webpack_require__(13657);
/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Idx = String | Int | Symbol
 * @sig [Idx] -> a -> {a} -> {a}
 * @param {Array} path the path to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except along the specified path.
 * @see R.dissocPath
 * @example
 *
 *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 *
 *      // Any missing or non-object keys in path will be overridden
 *      R.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}
 */


var assocPath =
/*#__PURE__*/
_curry3(function assocPath(path, val, obj) {
  if (path.length === 0) {
    return val;
  }

  var idx = path[0];

  if (path.length > 1) {
    var nextObj = !isNil(obj) && _has(idx, obj) && typeof obj[idx] === 'object' ? obj[idx] : _isInteger(path[1]) ? [] : {};
    val = assocPath(Array.prototype.slice.call(path, 1), val, nextObj);
  }

  return _assoc(idx, val, obj);
});

module.exports = assocPath;

/***/ }),

/***/ 70962:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var nAry =
/*#__PURE__*/
__webpack_require__(40864);
/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 2 parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (a -> b -> c -> ... -> z) -> ((a, b) -> z)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 2.
 * @see R.nAry, R.unary
 * @example
 *
 *      const takesThreeArgs = function(a, b, c) {
 *        return [a, b, c];
 *      };
 *      takesThreeArgs.length; //=> 3
 *      takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
 *
 *      const takesTwoArgs = R.binary(takesThreeArgs);
 *      takesTwoArgs.length; //=> 2
 *      // Only 2 arguments are passed to the wrapped function
 *      takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
 * @symb R.binary(f)(a, b, c) = f(a, b)
 */


var binary =
/*#__PURE__*/
_curry1(function binary(fn) {
  return nAry(2, fn);
});

module.exports = binary;

/***/ }),

/***/ 63195:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arity =
/*#__PURE__*/
__webpack_require__(7455);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      const log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */


var bind =
/*#__PURE__*/
_curry2(function bind(fn, thisObj) {
  return _arity(fn.length, function () {
    return fn.apply(thisObj, arguments);
  });
});

module.exports = bind;

/***/ }),

/***/ 23018:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _isFunction =
/*#__PURE__*/
__webpack_require__(62144);

var and =
/*#__PURE__*/
__webpack_require__(42537);

var lift =
/*#__PURE__*/
__webpack_require__(4041);
/**
 * A function which calls the two provided functions and returns the `&&`
 * of the results.
 * It returns the result of the first function if it is false-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * false-y value.
 *
 * In addition to functions, `R.both` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f A predicate
 * @param {Function} g Another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
 * @see R.either, R.allPass, R.and
 * @example
 *
 *      const gt10 = R.gt(R.__, 10)
 *      const lt20 = R.lt(R.__, 20)
 *      const f = R.both(gt10, lt20);
 *      f(15); //=> true
 *      f(30); //=> false
 *
 *      R.both(Maybe.Just(false), Maybe.Just(55)); // => Maybe.Just(false)
 *      R.both([false, false, 'a'], [11]); //=> [false, false, 11]
 */


var both =
/*#__PURE__*/
_curry2(function both(f, g) {
  return _isFunction(f) ? function _both() {
    return f.apply(this, arguments) && g.apply(this, arguments);
  } : lift(and)(f, g);
});

module.exports = both;

/***/ }),

/***/ 2703:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);
/**
 * Returns the result of calling its first argument with the remaining
 * arguments. This is occasionally useful as a converging function for
 * [`R.converge`](#converge): the first branch can produce a function while the
 * remaining branches produce values to be passed to that function as its
 * arguments.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig ((*... -> a), *...) -> a
 * @param {Function} fn The function to apply to the remaining arguments.
 * @param {...*} args Any number of positional arguments.
 * @return {*}
 * @see R.apply
 * @example
 *
 *      R.call(R.add, 1, 2); //=> 3
 *
 *      const indentN = R.pipe(
 *        R.repeat(' '),
 *        R.join(''),
 *        R.replace(/^(?!$)/gm)
 *      );
 *
 *      const format = R.converge(
 *        R.call,
 *        [
 *          R.pipe(R.prop('indent'), indentN),
 *          R.prop('value')
 *        ]
 *      );
 *
 *      format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
 * @symb R.call(f, a, b) = f(a, b)
 */


var call =
/*#__PURE__*/
_curry1(function call(fn) {
  return fn.apply(this, Array.prototype.slice.call(arguments, 1));
});

module.exports = call;

/***/ }),

/***/ 79098:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _makeFlat =
/*#__PURE__*/
__webpack_require__(55161);

var _xchain =
/*#__PURE__*/
__webpack_require__(64814);

var map =
/*#__PURE__*/
__webpack_require__(61894);
/**
 * `chain` maps a function over a list and concatenates the results. `chain`
 * is also known as `flatMap` in some libraries.
 *
 * Dispatches to the `chain` method of the second argument, if present,
 * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
 *
 * If second argument is a function, `chain(f, g)(x)` is equivalent to `f(g(x), x)`.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain m => (a -> m b) -> m a -> m b
 * @param {Function} fn The function to map with
 * @param {Array} list The list to map over
 * @return {Array} The result of flat-mapping `list` with `fn`
 * @example
 *
 *      const duplicate = n => [n, n];
 *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
 *
 *      R.chain(R.append, R.head)([1, 2, 3]); //=> [1, 2, 3, 1]
 */


var chain =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable(['fantasy-land/chain', 'chain'], _xchain, function chain(fn, monad) {
  if (typeof monad === 'function') {
    return function (x) {
      return fn(monad(x))(x);
    };
  }

  return _makeFlat(false)(map(fn, monad));
}));

module.exports = chain;

/***/ }),

/***/ 11:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);
/**
 * Restricts a number to be within a range.
 *
 * Also works for other ordered types such as Strings and Dates.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Relation
 * @sig Ord a => a -> a -> a -> a
 * @param {Number} minimum The lower limit of the clamp (inclusive)
 * @param {Number} maximum The upper limit of the clamp (inclusive)
 * @param {Number} value Value to be clamped
 * @return {Number} Returns `minimum` when `val < minimum`, `maximum` when `val > maximum`, returns `val` otherwise
 * @example
 *
 *      R.clamp(1, 10, -5) // => 1
 *      R.clamp(1, 10, 15) // => 10
 *      R.clamp(1, 10, 4)  // => 4
 */


var clamp =
/*#__PURE__*/
_curry3(function clamp(min, max, value) {
  if (min > max) {
    throw new Error('min must not be greater than max in clamp(min, max, value)');
  }

  return value < min ? min : value > max ? max : value;
});

module.exports = clamp;

/***/ }),

/***/ 91549:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _clone =
/*#__PURE__*/
__webpack_require__(45114);

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);
/**
 * Creates a deep copy of the source that can be used in place of the source
 * object without retaining any references to it.
 * The source object may contain (nested) `Array`s and `Object`s,
 * `Number`s, `String`s, `Boolean`s and `Date`s.
 * `Function`s are assigned by reference rather than copied.
 *
 * Dispatches to a `clone` method if present.
 *
 * Note that if the source object has multiple nodes that share a reference,
 * the returned object will have the same structure, but the references will
 * be pointed to the location within the cloned value.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {*} -> {*}
 * @param {*} value The object or array to clone
 * @return {*} A deeply cloned copy of `val`
 * @example
 *
 *      const objects = [{}, {}, {}];
 *      const objectsClone = R.clone(objects);
 *      objects === objectsClone; //=> false
 *      objects[0] === objectsClone[0]; //=> false
 */


var clone =
/*#__PURE__*/
_curry1(function clone(value) {
  return value != null && typeof value.clone === 'function' ? value.clone() : _clone(value, true);
});

module.exports = clone;

/***/ }),

/***/ 69406:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _reduce =
/*#__PURE__*/
__webpack_require__(39488);
/**
 * Splits a list into sub-lists, based on the result of calling a key-returning function on each element,
 * and grouping the results according to values returned.
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category List
 * @typedefn Idx = String | Int | Symbol
 * @sig Idx a => (b -> a) -> [b] -> [[b]]
 * @param {Function} fn Function :: a -> Idx
 * @param {Array} list The array to group
 * @return {Array}
 *    An array of arrays where each sub-array contains items for which
 *    the String-returning function has returned the same value.
 * @see R.groupBy, R.partition
 * @example
 *      R.collectBy(R.prop('type'), [
 *        {type: 'breakfast', item: '☕️'},
 *        {type: 'lunch', item: '🌯'},
 *        {type: 'dinner', item: '🍝'},
 *        {type: 'breakfast', item: '🥐'},
 *        {type: 'lunch', item: '🍕'}
 *      ]);
 *
 *      // [ [ {type: 'breakfast', item: '☕️'},
 *      //     {type: 'breakfast', item: '🥐'} ],
 *      //   [ {type: 'lunch', item: '🌯'},
 *      //     {type: 'lunch', item: '🍕'} ],
 *      //   [ {type: 'dinner', item: '🍝'} ] ]
 */


var collectBy =
/*#__PURE__*/
_curry2(function collectBy(fn, list) {
  var group = _reduce(function (o, x) {
    var tag = fn(x);

    if (o[tag] === undefined) {
      o[tag] = [];
    }

    o[tag].push(x);
    return o;
  }, {}, list);

  var newList = [];

  for (var tag in group) {
    newList.push(group[tag]);
  }

  return newList;
});

module.exports = collectBy;

/***/ }),

/***/ 83428:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);
/**
 * Makes a comparator function out of a function that reports whether the first
 * element is less than the second.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b) -> Boolean) -> ((a, b) -> Number)
 * @param {Function} pred A predicate function of arity two which will return `true` if the first argument
 * is less than the second, `false` otherwise
 * @return {Function} A Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`
 * @example
 *
 *      const byAge = R.comparator((a, b) => a.age < b.age);
 *      const people = [
 *        { name: 'Emma', age: 70 },
 *        { name: 'Peter', age: 78 },
 *        { name: 'Mikhail', age: 62 },
 *      ];
 *      const peopleByIncreasingAge = R.sort(byAge, people);
 *        //=> [{ name: 'Mikhail', age: 62 },{ name: 'Emma', age: 70 }, { name: 'Peter', age: 78 }]
 */


var comparator =
/*#__PURE__*/
_curry1(function comparator(pred) {
  return function (a, b) {
    return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
  };
});

module.exports = comparator;

/***/ }),

/***/ 36573:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var lift =
/*#__PURE__*/
__webpack_require__(4041);

var not =
/*#__PURE__*/
__webpack_require__(22184);
/**
 * Takes a function `f` and returns a function `g` such that if called with the same arguments
 * when `f` returns a "truthy" value, `g` returns `false` and when `f` returns a "falsy" value `g` returns `true`.
 *
 * `R.complement` may be applied to any functor
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> *) -> (*... -> Boolean)
 * @param {Function} f
 * @return {Function}
 * @see R.not
 * @example
 *
 *      const isNotNil = R.complement(R.isNil);
 *      R.isNil(null); //=> true
 *      isNotNil(null); //=> false
 *      R.isNil(7); //=> false
 *      isNotNil(7); //=> true
 */


var complement =
/*#__PURE__*/
lift(not);
module.exports = complement;

/***/ }),

/***/ 50557:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pipe =
/*#__PURE__*/
__webpack_require__(4603);

var reverse =
/*#__PURE__*/
__webpack_require__(65814);
/**
 * Performs right-to-left function composition. The last argument may have
 * any arity; the remaining arguments must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipe
 * @example
 *
 *      const classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      const yellGreeting = R.compose(R.toUpper, classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 * @symb R.compose(f, g, h)(a)(b) = f(g(h(a)))(b)
 */


function compose() {
  if (arguments.length === 0) {
    throw new Error('compose requires at least one argument');
  }

  return pipe.apply(this, reverse(arguments));
}

module.exports = compose;

/***/ }),

/***/ 51663:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var pipeWith =
/*#__PURE__*/
__webpack_require__(51446);

var reverse =
/*#__PURE__*/
__webpack_require__(65814);
/**
 * Performs right-to-left function composition using transforming function. The last function may have
 * any arity; the remaining functions must be unary. Unlike `compose`, functions are passed in an array.
 *
 * **Note:** The result of composeWith is not automatically curried. Transforming function is not used
 * on the last argument.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Function
 * @sig ((* -> *), [(y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)]) -> ((a, b, ..., n) -> z)
 * @param {Function} transformer The transforming function
 * @param {Array} functions The functions to compose
 * @return {Function}
 * @see R.compose, R.pipeWith
 * @example
 *
 *      const composeWhileNotNil = R.composeWith((f, res) => R.isNil(res) ? res : f(res));
 *
 *      composeWhileNotNil([R.inc, R.prop('age')])({age: 1}) //=> 2
 *      composeWhileNotNil([R.inc, R.prop('age')])({}) //=> undefined
 *
 * @symb R.composeWith(f)([g, h, i])(...args) = f(g, f(h, i(...args)))
 */


var composeWith =
/*#__PURE__*/
_curry2(function composeWith(xf, list) {
  return pipeWith.apply(this, [xf, reverse(list)]);
});

module.exports = composeWith;

/***/ }),

/***/ 54405:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _isArray =
/*#__PURE__*/
__webpack_require__(20219);

var _isFunction =
/*#__PURE__*/
__webpack_require__(62144);

var _isString =
/*#__PURE__*/
__webpack_require__(20190);

var toString =
/*#__PURE__*/
__webpack_require__(15243);
/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 *
 * Dispatches to the `concat` method of the first argument, if present.
 * Can also concatenate two members of a [fantasy-land
 * compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @sig String -> String -> String
 * @param {Array|String} firstList The first list
 * @param {Array|String} secondList The second list
 * @return {Array|String} A list consisting of the elements of `firstList` followed by the elements of
 * `secondList`.
 *
 * @example
 *
 *      R.concat('ABC', 'DEF'); // 'ABCDEF'
 *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 *      R.concat([], []); //=> []
 */


var concat =
/*#__PURE__*/
_curry2(function concat(a, b) {
  if (_isArray(a)) {
    if (_isArray(b)) {
      return a.concat(b);
    }

    throw new TypeError(toString(b) + ' is not an array');
  }

  if (_isString(a)) {
    if (_isString(b)) {
      return a + b;
    }

    throw new TypeError(toString(b) + ' is not a string');
  }

  if (a != null && _isFunction(a['fantasy-land/concat'])) {
    return a['fantasy-land/concat'](b);
  }

  if (a != null && _isFunction(a.concat)) {
    return a.concat(b);
  }

  throw new TypeError(toString(a) + ' does not have a method named "concat" or "fantasy-land/concat"');
});

module.exports = concat;

/***/ }),

/***/ 17794:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arity =
/*#__PURE__*/
__webpack_require__(7455);

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var map =
/*#__PURE__*/
__webpack_require__(61894);

var max =
/*#__PURE__*/
__webpack_require__(21186);

var reduce =
/*#__PURE__*/
__webpack_require__(20793);
/**
 * Returns a function, `fn`, which encapsulates `if/else, if/else, ...` logic.
 * `R.cond` takes a list of [predicate, transformer] pairs. All of the arguments
 * to `fn` are applied to each of the predicates in turn until one returns a
 * "truthy" value, at which point `fn` returns the result of applying its
 * arguments to the corresponding transformer. If none of the predicates
 * matches, `fn` returns undefined.
 *
 * **Please note**: This is not a direct substitute for a `switch` statement.
 * Remember that both elements of every pair passed to `cond` are *functions*,
 * and `cond` returns a function.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Logic
 * @sig [[(*... -> Boolean),(*... -> *)]] -> (*... -> *)
 * @param {Array} pairs A list of [predicate, transformer]
 * @return {Function}
 * @see R.ifElse, R.unless, R.when
 * @example
 *
 *      const fn = R.cond([
 *        [R.equals(0),   R.always('water freezes at 0°C')],
 *        [R.equals(100), R.always('water boils at 100°C')],
 *        [R.T,           temp => 'nothing special happens at ' + temp + '°C']
 *      ]);
 *      fn(0); //=> 'water freezes at 0°C'
 *      fn(50); //=> 'nothing special happens at 50°C'
 *      fn(100); //=> 'water boils at 100°C'
 */


var cond =
/*#__PURE__*/
_curry1(function cond(pairs) {
  var arity = reduce(max, 0, map(function (pair) {
    return pair[0].length;
  }, pairs));
  return _arity(arity, function () {
    var idx = 0;

    while (idx < pairs.length) {
      if (pairs[idx][0].apply(this, arguments)) {
        return pairs[idx][1].apply(this, arguments);
      }

      idx += 1;
    }
  });
});

module.exports = cond;

/***/ }),

/***/ 27448:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var constructN =
/*#__PURE__*/
__webpack_require__(96809);
/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> {*}) -> (* -> {*})
 * @param {Function} fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @see R.invoker
 * @example
 *
 *      // Constructor function
 *      function Animal(kind) {
 *        this.kind = kind;
 *      };
 *      Animal.prototype.sighting = function() {
 *        return "It's a " + this.kind + "!";
 *      }
 *
 *      const AnimalConstructor = R.construct(Animal)
 *
 *      // Notice we no longer need the 'new' keyword:
 *      AnimalConstructor('Pig'); //=> {"kind": "Pig", "sighting": function (){...}};
 *
 *      const animalTypes = ["Lion", "Tiger", "Bear"];
 *      const animalSighting = R.invoker(0, 'sighting');
 *      const sightNewAnimal = R.compose(animalSighting, AnimalConstructor);
 *      R.map(sightNewAnimal, animalTypes); //=> ["It's a Lion!", "It's a Tiger!", "It's a Bear!"]
 */


var construct =
/*#__PURE__*/
_curry1(function construct(Fn) {
  return constructN(Fn.length, Fn);
});

module.exports = construct;

/***/ }),

/***/ 96809:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var curry =
/*#__PURE__*/
__webpack_require__(3087);

var nAry =
/*#__PURE__*/
__webpack_require__(40864);
/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type. The arity of the function
 * returned is specified to allow using variadic constructor functions.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Function
 * @sig Number -> (* -> {*}) -> (* -> {*})
 * @param {Number} n The arity of the constructor function.
 * @param {Function} Fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @example
 *
 *      // Variadic Constructor function
 *      function Salad() {
 *        this.ingredients = arguments;
 *      }
 *
 *      Salad.prototype.recipe = function() {
 *        const instructions = R.map(ingredient => 'Add a dollop of ' + ingredient, this.ingredients);
 *        return R.join('\n', instructions);
 *      };
 *
 *      const ThreeLayerSalad = R.constructN(3, Salad);
 *
 *      // Notice we no longer need the 'new' keyword, and the constructor is curried for 3 arguments.
 *      const salad = ThreeLayerSalad('Mayonnaise')('Potato Chips')('Ketchup');
 *
 *      console.log(salad.recipe());
 *      // Add a dollop of Mayonnaise
 *      // Add a dollop of Potato Chips
 *      // Add a dollop of Ketchup
 */


var constructN =
/*#__PURE__*/
_curry2(function constructN(n, Fn) {
  if (n > 10) {
    throw new Error('Constructor with greater than ten arguments');
  }

  if (n === 0) {
    return function () {
      return new Fn();
    };
  }

  return curry(nAry(n, function ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
    switch (n) {
      case 1:
        return new Fn($0);

      case 2:
        return new Fn($0, $1);

      case 3:
        return new Fn($0, $1, $2);

      case 4:
        return new Fn($0, $1, $2, $3);

      case 5:
        return new Fn($0, $1, $2, $3, $4);

      case 6:
        return new Fn($0, $1, $2, $3, $4, $5);

      case 7:
        return new Fn($0, $1, $2, $3, $4, $5, $6);

      case 8:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7);

      case 9:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);

      case 10:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
    }
  }));
});

module.exports = constructN;

/***/ }),

/***/ 38907:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _map =
/*#__PURE__*/
__webpack_require__(36692);

var curryN =
/*#__PURE__*/
__webpack_require__(2220);

var max =
/*#__PURE__*/
__webpack_require__(21186);

var pluck =
/*#__PURE__*/
__webpack_require__(84585);

var reduce =
/*#__PURE__*/
__webpack_require__(20793);
/**
 * Accepts a converging function and a list of branching functions and returns
 * a new function. The arity of the new function is the same as the arity of
 * the longest branching function. When invoked, this new function is applied
 * to some arguments, and each branching function is applied to those same
 * arguments. The results of each branching function are passed as arguments
 * to the converging function to produce the return value.
 *
 * @func
 * @memberOf R
 * @since v0.4.2
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [((a, b, ...) -> x1), ((a, b, ...) -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} after A function. `after` will be invoked with the return values of
 *        `fn1` and `fn2` as its arguments.
 * @param {Array} functions A list of functions.
 * @return {Function} A new function.
 * @see R.useWith
 * @example
 *
 *      const average = R.converge(R.divide, [R.sum, R.length])
 *      average([1, 2, 3, 4, 5, 6, 7]) //=> 4
 *
 *      const strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
 *      strangeConcat("Yodel") //=> "YODELyodel"
 *
 * @symb R.converge(f, [g, h])(a, b) = f(g(a, b), h(a, b))
 */


var converge =
/*#__PURE__*/
_curry2(function converge(after, fns) {
  return curryN(reduce(max, 0, pluck('length', fns)), function () {
    var args = arguments;
    var context = this;
    return after.apply(context, _map(function (fn) {
      return fn.apply(context, args);
    }, fns));
  });
});

module.exports = converge;

/***/ }),

/***/ 63558:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _reduce =
/*#__PURE__*/
__webpack_require__(39488);

var curry =
/*#__PURE__*/
__webpack_require__(3087);
/**
 * Returns the number of items in a given `list` matching the predicate `f`
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} predicate to match items against
 * @return {Array} list of items to count in
 * @example
 *
 *      const even = x => x % 2 == 0;
 *
 *      R.count(even, [1, 2, 3, 4, 5]); // => 2
 *      R.map(R.count(even), [[1, 1, 1], [2, 3, 4, 5], [6]]); // => [0, 2, 1]
 */


var count =
/*#__PURE__*/
curry(function (pred, list) {
  return _reduce(function (a, e) {
    return pred(e) ? a + 1 : a;
  }, 0, list);
});
module.exports = count;

/***/ }),

/***/ 78324:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var reduceBy =
/*#__PURE__*/
__webpack_require__(44285);
/**
 * Counts the elements of a list according to how many match each value of a
 * key generated by the supplied function. Returns an object mapping the keys
 * produced by `fn` to the number of occurrences in the list. Note that all
 * keys are coerced to strings because of how JavaScript objects work.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig (a -> String) -> [a] -> {*}
 * @param {Function} fn The function used to map values to keys.
 * @param {Array} list The list to count elements from.
 * @return {Object} An object mapping keys to number of occurrences in the list.
 * @example
 *
 *      const numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
 *      R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}
 *
 *      const letters = ['a', 'b', 'A', 'a', 'B', 'c'];
 *      R.countBy(R.toLower)(letters);   //=> {'a': 3, 'b': 2, 'c': 1}
 */


var countBy =
/*#__PURE__*/
reduceBy(function (acc, elem) {
  return acc + 1;
}, 0);
module.exports = countBy;

/***/ }),

/***/ 3087:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var curryN =
/*#__PURE__*/
__webpack_require__(2220);
/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * Please note that default parameters don't count towards a [function arity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
 * and therefore `curry` won't work well with those:
 *
 * ```
 * const h = R.curry((a, b, c = 2) => a + b + c);
 *
 * h(40);
 * //=> function (waits for `b`)
 *
 * h(39)(1);
 * //=> 42
 *
 * h(1)(2, 3);
 * //=> 6
 *
 * h(1)(2)(7);
 * //=> Error! (`3` is not a function!)
 * ```
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curryN, R.partial
 * @example
 *
 *      const addFourNumbers = (a, b, c, d) => a + b + c + d;
 *
 *      const curriedAddFourNumbers = R.curry(addFourNumbers);
 *      const f = curriedAddFourNumbers(1, 2);
 *      const g = f(3);
 *      g(4); //=> 10
 */


var curry =
/*#__PURE__*/
_curry1(function curry(fn) {
  return curryN(fn.length, fn);
});

module.exports = curry;

/***/ }),

/***/ 2220:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arity =
/*#__PURE__*/
__webpack_require__(7455);

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _curryN =
/*#__PURE__*/
__webpack_require__(32738);
/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      const sumArgs = (...args) => R.sum(args);
 *
 *      const curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      const f = curriedAddFourNumbers(1, 2);
 *      const g = f(3);
 *      g(4); //=> 10
 */


var curryN =
/*#__PURE__*/
_curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }

  return _arity(length, _curryN(length, [], fn));
});

module.exports = curryN;

/***/ }),

/***/ 17919:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var add =
/*#__PURE__*/
__webpack_require__(63073);
/**
 * Decrements its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n - 1
 * @see R.inc
 * @example
 *
 *      R.dec(42); //=> 41
 */


var dec =
/*#__PURE__*/
add(-1);
module.exports = dec;

/***/ }),

/***/ 52892:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Returns the second argument if it is not `null`, `undefined` or `NaN`;
 * otherwise the first argument is returned.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {a} default The default value.
 * @param {b} val `val` will be returned instead of `default` unless `val` is `null`, `undefined` or `NaN`.
 * @return {*} The second value if it is not `null`, `undefined` or `NaN`, otherwise the default value
 * @example
 *
 *      const defaultTo42 = R.defaultTo(42);
 *
 *      defaultTo42(null);  //=> 42
 *      defaultTo42(undefined);  //=> 42
 *      defaultTo42(false);  //=> false
 *      defaultTo42('Ramda');  //=> 'Ramda'
 *      // parseInt('string') results in NaN
 *      defaultTo42(parseInt('string')); //=> 42
 */


var defaultTo =
/*#__PURE__*/
_curry2(function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
});

module.exports = defaultTo;

/***/ }),

/***/ 78045:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);
/**
 * Makes a descending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) > fn(b), `1` if fn(b) > fn(a), otherwise `0`
 * @see R.ascend
 * @example
 *
 *      const byAge = R.descend(R.prop('age'));
 *      const people = [
 *        { name: 'Emma', age: 70 },
 *        { name: 'Peter', age: 78 },
 *        { name: 'Mikhail', age: 62 },
 *      ];
 *      const peopleByOldestFirst = R.sort(byAge, people);
 *        //=> [{ name: 'Peter', age: 78 }, { name: 'Emma', age: 70 }, { name: 'Mikhail', age: 62 }]
 */


var descend =
/*#__PURE__*/
_curry3(function descend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa > bb ? -1 : aa < bb ? 1 : 0;
});

module.exports = descend;

/***/ }),

/***/ 34226:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _Set =
/*#__PURE__*/
__webpack_require__(8876);
/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Objects and Arrays are compared in terms of
 * value equality, not reference equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.differenceWith, R.symmetricDifference, R.symmetricDifferenceWith, R.without
 * @example
 *
 *      R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
 *      R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
 *      R.difference([{a: 1}, {b: 2}], [{a: 1}, {c: 3}]) //=> [{b: 2}]
 */


var difference =
/*#__PURE__*/
_curry2(function difference(first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  var secondLen = second.length;
  var toFilterOut = new _Set();

  for (var i = 0; i < secondLen; i += 1) {
    toFilterOut.add(second[i]);
  }

  while (idx < firstLen) {
    if (toFilterOut.add(first[idx])) {
      out[out.length] = first[idx];
    }

    idx += 1;
  }

  return out;
});

module.exports = difference;

/***/ }),

/***/ 22013:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _includesWith =
/*#__PURE__*/
__webpack_require__(82976);

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);
/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Duplication is determined according to the
 * value returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.difference, R.symmetricDifference, R.symmetricDifferenceWith
 * @example
 *
 *      const cmp = (x, y) => x.a === y.a;
 *      const l1 = [{a: 1}, {a: 2}, {a: 3}];
 *      const l2 = [{a: 3}, {a: 4}];
 *      R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
 *
 *      R.differenceWith(R.equals, [1, 2, 3, 3, 3], []); //=> [1, 2, 3]
 *      R.differenceWith(R.equals, [1, 2, 3, 3, 3], [1]); //=> [2, 3]
 */


var differenceWith =
/*#__PURE__*/
_curry3(function differenceWith(pred, first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;

  while (idx < firstLen) {
    if (!_includesWith(pred, first[idx], second) && !_includesWith(pred, first[idx], out)) {
      out.push(first[idx]);
    }

    idx += 1;
  }

  return out;
});

module.exports = differenceWith;

/***/ }),

/***/ 92650:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var dissocPath =
/*#__PURE__*/
__webpack_require__(72337);
/**
 * Returns a new object that does not contain a `prop` property.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Object
 * @sig String -> {k: v} -> {k: v}
 * @param {String} prop The name of the property to dissociate
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original but without the specified property
 * @see R.assoc, R.omit
 * @example
 *
 *      R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
 */


var dissoc =
/*#__PURE__*/
_curry2(function dissoc(prop, obj) {
  return dissocPath([prop], obj);
});

module.exports = dissoc;

/***/ }),

/***/ 72337:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dissoc =
/*#__PURE__*/
__webpack_require__(15947);

var _isInteger =
/*#__PURE__*/
__webpack_require__(37000);

var _isArray =
/*#__PURE__*/
__webpack_require__(20219);

var assoc =
/*#__PURE__*/
__webpack_require__(66497);
/**
 * Makes a shallow clone of an object. Note that this copies and flattens
 * prototype properties onto the new object as well. All non-primitive
 * properties are copied by reference.
 *
 * @private
 * @param {String|Integer} prop The prop operating
 * @param {Object|Array} obj The object to clone
 * @return {Object|Array} A new object equivalent to the original.
 */


function _shallowCloneObject(prop, obj) {
  if (_isInteger(prop) && _isArray(obj)) {
    return [].concat(obj);
  }

  var result = {};

  for (var p in obj) {
    result[p] = obj[p];
  }

  return result;
}
/**
 * Makes a shallow clone of an object, omitting the property at the given path.
 * Note that this copies and flattens prototype properties onto the new object
 * as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.11.0
 * @category Object
 * @typedefn Idx = String | Int | Symbol
 * @sig [Idx] -> {k: v} -> {k: v}
 * @param {Array} path The path to the value to omit
 * @param {Object} obj The object to clone
 * @return {Object} A new object without the property at path
 * @see R.assocPath
 * @example
 *
 *      R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
 */


var dissocPath =
/*#__PURE__*/
_curry2(function dissocPath(path, obj) {
  if (obj == null) {
    return obj;
  }

  switch (path.length) {
    case 0:
      return obj;

    case 1:
      return _dissoc(path[0], obj);

    default:
      var head = path[0];
      var tail = Array.prototype.slice.call(path, 1);

      if (obj[head] == null) {
        return _shallowCloneObject(head, obj);
      } else {
        return assoc(head, dissocPath(tail, obj[head]), obj);
      }

  }
});

module.exports = dissocPath;

/***/ }),

/***/ 47166:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Divides two numbers. Equivalent to `a / b`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a / b`.
 * @see R.multiply
 * @example
 *
 *      R.divide(71, 100); //=> 0.71
 *
 *      const half = R.divide(R.__, 2);
 *      half(42); //=> 21
 *
 *      const reciprocal = R.divide(1);
 *      reciprocal(4);   //=> 0.25
 */


var divide =
/*#__PURE__*/
_curry2(function divide(a, b) {
  return a / b;
});

module.exports = divide;

/***/ }),

/***/ 78821:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _xdrop =
/*#__PURE__*/
__webpack_require__(41700);

var slice =
/*#__PURE__*/
__webpack_require__(81753);
/**
 * Returns all but the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `drop` method).
 *
 * Dispatches to the `drop` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*} A copy of list without the first `n` elements
 * @see R.take, R.transduce, R.dropLast, R.dropWhile
 * @example
 *
 *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(3, 'ramda');               //=> 'da'
 */


var drop =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable(['drop'], _xdrop, function drop(n, xs) {
  return slice(Math.max(0, n), Infinity, xs);
}));

module.exports = drop;

/***/ }),

/***/ 50898:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _dropLast =
/*#__PURE__*/
__webpack_require__(11247);

var _xdropLast =
/*#__PURE__*/
__webpack_require__(4534);
/**
 * Returns a list containing all but the last `n` elements of the given `list`.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements of `list` to skip.
 * @param {Array} list The list of elements to consider.
 * @return {Array} A copy of the list with only the first `list.length - n` elements
 * @see R.takeLast, R.drop, R.dropWhile, R.dropLastWhile
 * @example
 *
 *      R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.dropLast(3, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(4, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(3, 'ramda');               //=> 'ra'
 */


var dropLast =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable([], _xdropLast, _dropLast));

module.exports = dropLast;

/***/ }),

/***/ 62520:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _dropLastWhile =
/*#__PURE__*/
__webpack_require__(57288);

var _xdropLastWhile =
/*#__PURE__*/
__webpack_require__(34783);
/**
 * Returns a new list excluding all the tailing elements of a given list which
 * satisfy the supplied predicate function. It passes each value from the right
 * to the supplied predicate function, skipping elements until the predicate
 * function returns a `falsy` value. The predicate function is applied to one argument:
 * *(value)*.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} predicate The function to be called on each element
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array without any trailing elements that return `falsy` values from the `predicate`.
 * @see R.takeLastWhile, R.addIndex, R.drop, R.dropWhile
 * @example
 *
 *      const lteThree = x => x <= 3;
 *
 *      R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]
 *
 *      R.dropLastWhile(x => x !== 'd' , 'Ramda'); //=> 'Ramd'
 */


var dropLastWhile =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable([], _xdropLastWhile, _dropLastWhile));

module.exports = dropLastWhile;

/***/ }),

/***/ 74649:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _xdropRepeatsWith =
/*#__PURE__*/
__webpack_require__(6234);

var dropRepeatsWith =
/*#__PURE__*/
__webpack_require__(43432);

var equals =
/*#__PURE__*/
__webpack_require__(51481);
/**
 * Returns a new list without any consecutively repeating elements.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *     R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
 */


var dropRepeats =
/*#__PURE__*/
_curry1(
/*#__PURE__*/
_dispatchable([], function () {
  return _xdropRepeatsWith(equals);
},
/*#__PURE__*/
dropRepeatsWith(equals)));

module.exports = dropRepeats;

/***/ }),

/***/ 91591:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _xdropRepeatsWith =
/*#__PURE__*/
__webpack_require__(6234);

var dropRepeatsWith =
/*#__PURE__*/
__webpack_require__(43432);

var eqBy =
/*#__PURE__*/
__webpack_require__(24486);
/**
 * Returns a new list without any consecutively repeating elements,
 * based upon the value returned by applying the supplied function to
 * each list element. [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.29.0
 * @category List
 * @sig (a -> b) -> [a] -> [a]
 * @param {Function} fn A function used to produce a value to use during comparisons.
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *     R.dropRepeatsBy(Math.abs, [1, -1, -1, 2, 3, -4, 4, 2, 2]); //=> [1, 2, 3, -4, 2]
 */


var dropRepeatsBy =
/*#__PURE__*/
_curry2(function (fn, list) {
  return _dispatchable([], function () {
    return _xdropRepeatsWith(eqBy(fn));
  }, dropRepeatsWith(eqBy(fn)))(list);
});

module.exports = dropRepeatsBy;

/***/ }),

/***/ 43432:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _xdropRepeatsWith =
/*#__PURE__*/
__webpack_require__(6234);

var last =
/*#__PURE__*/
__webpack_require__(27601);
/**
 * Returns a new list without any consecutively repeating elements. Equality is
 * determined by applying the supplied predicate to each pair of consecutive elements. The
 * first element in a series of equal elements will be preserved.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig ((a, a) -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *      const l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
 *      R.dropRepeatsWith(R.eqBy(Math.abs), l); //=> [1, 3, 4, -5, 3]
 */


var dropRepeatsWith =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable([], _xdropRepeatsWith, function dropRepeatsWith(pred, list) {
  var result = [];
  var idx = 1;
  var len = list.length;

  if (len !== 0) {
    result[0] = list[0];

    while (idx < len) {
      if (!pred(last(result), list[idx])) {
        result[result.length] = list[idx];
      }

      idx += 1;
    }
  }

  return result;
}));

module.exports = dropRepeatsWith;

/***/ }),

/***/ 51008:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _xdropWhile =
/*#__PURE__*/
__webpack_require__(1908);

var slice =
/*#__PURE__*/
__webpack_require__(81753);
/**
 * Returns a new list excluding the leading elements of a given list which
 * satisfy the supplied predicate function. It passes each value to the supplied
 * predicate function, skipping elements while the predicate function returns
 * `true`. The predicate function is applied to one argument: *(value)*.
 *
 * Dispatches to the `dropWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.takeWhile, R.transduce, R.addIndex
 * @example
 *
 *      const lteTwo = x => x <= 2;
 *
 *      R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]
 *
 *      R.dropWhile(x => x !== 'd' , 'Ramda'); //=> 'da'
 */


var dropWhile =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable(['dropWhile'], _xdropWhile, function dropWhile(pred, xs) {
  var idx = 0;
  var len = xs.length;

  while (idx < len && pred(xs[idx])) {
    idx += 1;
  }

  return slice(idx, Infinity, xs);
}));

module.exports = dropWhile;

/***/ }),

/***/ 14087:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _isFunction =
/*#__PURE__*/
__webpack_require__(62144);

var lift =
/*#__PURE__*/
__webpack_require__(4041);

var or =
/*#__PURE__*/
__webpack_require__(18384);
/**
 * A function wrapping calls to the two functions in an `||` operation,
 * returning the result of the first function if it is truth-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * truth-y value.
 *
 * In addition to functions, `R.either` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f a predicate
 * @param {Function} g another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
 * @see R.both, R.anyPass, R.or
 * @example
 *
 *      const gt10 = x => x > 10;
 *      const even = x => x % 2 === 0;
 *      const f = R.either(gt10, even);
 *      f(101); //=> true
 *      f(8); //=> true
 *
 *      R.either(Maybe.Just(false), Maybe.Just(55)); // => Maybe.Just(55)
 *      R.either([false, false, 'a'], [11]) // => [11, 11, "a"]
 */


var either =
/*#__PURE__*/
_curry2(function either(f, g) {
  return _isFunction(f) ? function _either() {
    return f.apply(this, arguments) || g.apply(this, arguments);
  } : lift(or)(f, g);
});

module.exports = either;

/***/ }),

/***/ 8403:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var _isArguments =
/*#__PURE__*/
__webpack_require__(97587);

var _isArray =
/*#__PURE__*/
__webpack_require__(20219);

var _isObject =
/*#__PURE__*/
__webpack_require__(8291);

var _isString =
/*#__PURE__*/
__webpack_require__(20190);

var _isTypedArray =
/*#__PURE__*/
__webpack_require__(92105);
/**
 * Returns the empty value of its argument's type. Ramda defines the empty
 * value of Array (`[]`), Object (`{}`), String (`''`),
 * TypedArray (`Uint8Array []`, `Float32Array []`, etc), and Arguments. Other
 * types are supported if they define `<Type>.empty`,
 * `<Type>.prototype.empty` or implement the
 * [FantasyLand Monoid spec](https://github.com/fantasyland/fantasy-land#monoid).
 *
 * Dispatches to the `empty` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> a
 * @param {*} x
 * @return {*}
 * @example
 *
 *      R.empty(Just(42));               //=> Nothing()
 *      R.empty([1, 2, 3]);              //=> []
 *      R.empty('unicorns');             //=> ''
 *      R.empty({x: 1, y: 2});           //=> {}
 *      R.empty(Uint8Array.from('123')); //=> Uint8Array []
 */


var empty =
/*#__PURE__*/
_curry1(function empty(x) {
  return x != null && typeof x['fantasy-land/empty'] === 'function' ? x['fantasy-land/empty']() : x != null && x.constructor != null && typeof x.constructor['fantasy-land/empty'] === 'function' ? x.constructor['fantasy-land/empty']() : x != null && typeof x.empty === 'function' ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === 'function' ? x.constructor.empty() : _isArray(x) ? [] : _isString(x) ? '' : _isObject(x) ? {} : _isArguments(x) ? function () {
    return arguments;
  }() : _isTypedArray(x) ? x.constructor.from('') : void 0 // else
  ;
});

module.exports = empty;

/***/ }),

/***/ 30796:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var equals =
/*#__PURE__*/
__webpack_require__(51481);

var takeLast =
/*#__PURE__*/
__webpack_require__(18703);
/**
 * Checks if a list ends with the provided sublist.
 *
 * Similarly, checks if a string ends with the provided substring.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> [a] -> Boolean
 * @sig String -> String -> Boolean
 * @param {*} suffix
 * @param {*} list
 * @return {Boolean}
 * @see R.startsWith
 * @example
 *
 *      R.endsWith('c', 'abc')                //=> true
 *      R.endsWith('b', 'abc')                //=> false
 *      R.endsWith(['c'], ['a', 'b', 'c'])    //=> true
 *      R.endsWith(['b'], ['a', 'b', 'c'])    //=> false
 */


var endsWith =
/*#__PURE__*/
_curry2(function (suffix, list) {
  return equals(takeLast(suffix.length, list), suffix);
});

module.exports = endsWith;

/***/ }),

/***/ 24486:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var equals =
/*#__PURE__*/
__webpack_require__(51481);
/**
 * Takes a function and two values in its domain and returns `true` if the
 * values map to the same value in the codomain; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Relation
 * @sig (a -> b) -> a -> a -> Boolean
 * @param {Function} f
 * @param {*} x
 * @param {*} y
 * @return {Boolean}
 * @example
 *
 *      R.eqBy(Math.abs, 5, -5); //=> true
 */


var eqBy =
/*#__PURE__*/
_curry3(function eqBy(f, x, y) {
  return equals(f(x), f(y));
});

module.exports = eqBy;

/***/ }),

/***/ 54228:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var equals =
/*#__PURE__*/
__webpack_require__(51481);
/**
 * Reports whether two objects have the same value, in [`R.equals`](#equals)
 * terms, for the specified property. Useful as a curried predicate.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig k -> {k: v} -> {k: v} -> Boolean
 * @param {String} prop The name of the property to compare
 * @param {Object} obj1
 * @param {Object} obj2
 * @return {Boolean}
 *
 * @example
 *
 *      const o1 = { a: 1, b: 2, c: 3, d: 4 };
 *      const o2 = { a: 10, b: 20, c: 3, d: 40 };
 *      R.eqProps('a', o1, o2); //=> false
 *      R.eqProps('c', o1, o2); //=> true
 */


var eqProps =
/*#__PURE__*/
_curry3(function eqProps(prop, obj1, obj2) {
  return equals(obj1[prop], obj2[prop]);
});

module.exports = eqProps;

/***/ }),

/***/ 51481:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _equals =
/*#__PURE__*/
__webpack_require__(74023);
/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      const a = {}; a.v = a;
 *      const b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */


var equals =
/*#__PURE__*/
_curry2(function equals(a, b) {
  return _equals(a, b, [], []);
});

module.exports = equals;

/***/ }),

/***/ 22624:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _isArray =
/*#__PURE__*/
__webpack_require__(20219);

var _isObject =
/*#__PURE__*/
__webpack_require__(8291);
/**
 * Creates a new object by recursively evolving a shallow copy of `object`,
 * according to the `transformation` functions. All non-primitive properties
 * are copied by reference.
 *
 * A `transformation` function will not be invoked if its corresponding key
 * does not exist in the evolved object.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {k: (v -> v)} -> {k: v} -> {k: v}
 * @param {Object} transformations The object specifying transformation functions to apply
 *        to the object.
 * @param {Object} object The object to be transformed.
 * @return {Object} The transformed object.
 * @example
 *
 *      const tomato = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
 *      const transformations = {
 *        firstName: R.trim,
 *        lastName: R.trim, // Will not get invoked.
 *        data: {elapsed: R.add(1), remaining: R.add(-1)}
 *      };
 *      R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
 */


var evolve =
/*#__PURE__*/
_curry2(function evolve(transformations, object) {
  if (!_isObject(object) && !_isArray(object)) {
    return object;
  }

  var result = object instanceof Array ? [] : {};
  var transformation, key, type;

  for (key in object) {
    transformation = transformations[key];
    type = typeof transformation;
    result[key] = type === 'function' ? transformation(object[key]) : transformation && type === 'object' ? evolve(transformation, object[key]) : object[key];
  }

  return result;
});

module.exports = evolve;

/***/ }),

/***/ 51383:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arrayReduce =
/*#__PURE__*/
__webpack_require__(20854);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _filter =
/*#__PURE__*/
__webpack_require__(34877);

var _isObject =
/*#__PURE__*/
__webpack_require__(8291);

var _xfilter =
/*#__PURE__*/
__webpack_require__(11383);

var keys =
/*#__PURE__*/
__webpack_require__(90368);
/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @category Object
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array} Filterable
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      const isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */


var filter =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable(['fantasy-land/filter', 'filter'], _xfilter, function (pred, filterable) {
  return _isObject(filterable) ? _arrayReduce(function (acc, key) {
    if (pred(filterable[key])) {
      acc[key] = filterable[key];
    }

    return acc;
  }, {}, keys(filterable)) : // else
  _filter(pred, filterable);
}));

module.exports = filter;

/***/ }),

/***/ 46376:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _xfind =
/*#__PURE__*/
__webpack_require__(47855);
/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Dispatches to the `find` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      const xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 *      R.find(R.propEq('a', 4))(xs); //=> undefined
 */


var find =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable(['find'], _xfind, function find(fn, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (fn(list[idx])) {
      return list[idx];
    }

    idx += 1;
  }
}));

module.exports = find;

/***/ }),

/***/ 53523:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _xfindIndex =
/*#__PURE__*/
__webpack_require__(20834);
/**
 * Returns the index of the first element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce, R.indexOf
 * @example
 *
 *      const xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.findIndex(R.propEq('a', 2))(xs); //=> 1
 *      R.findIndex(R.propEq('a', 4))(xs); //=> -1
 */


var findIndex =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable([], _xfindIndex, function findIndex(fn, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (fn(list[idx])) {
      return idx;
    }

    idx += 1;
  }

  return -1;
}));

module.exports = findIndex;

/***/ }),

/***/ 79605:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _xfindLast =
/*#__PURE__*/
__webpack_require__(28922);
/**
 * Returns the last element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      const xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
 *      R.findLast(R.propEq('a', 4))(xs); //=> undefined
 */


var findLast =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable([], _xfindLast, function findLast(fn, list) {
  var idx = list.length - 1;

  while (idx >= 0) {
    if (fn(list[idx])) {
      return list[idx];
    }

    idx -= 1;
  }
}));

module.exports = findLast;

/***/ }),

/***/ 52417:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _xfindLastIndex =
/*#__PURE__*/
__webpack_require__(36626);
/**
 * Returns the index of the last element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce, R.lastIndexOf
 * @example
 *
 *      const xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
 *      R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
 */


var findLastIndex =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable([], _xfindLastIndex, function findLastIndex(fn, list) {
  var idx = list.length - 1;

  while (idx >= 0) {
    if (fn(list[idx])) {
      return idx;
    }

    idx -= 1;
  }

  return -1;
}));

module.exports = findLastIndex;

/***/ }),

/***/ 77414:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var _makeFlat =
/*#__PURE__*/
__webpack_require__(55161);
/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b]
 * @param {Array} list The array to consider.
 * @return {Array} The flattened list.
 * @see R.unnest
 * @example
 *
 *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
 *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */


var flatten =
/*#__PURE__*/
_curry1(
/*#__PURE__*/
_makeFlat(true));

module.exports = flatten;

/***/ }),

/***/ 9134:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var curryN =
/*#__PURE__*/
__webpack_require__(2220);
/**
 * Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b, c, ...) -> z) -> (b -> a -> c -> ... -> z)
 * @param {Function} fn The function to invoke with its first two parameters reversed.
 * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
 * @example
 *
 *      const mergeThree = (a, b, c) => [].concat(a, b, c);
 *
 *      mergeThree(1, 2, 3); //=> [1, 2, 3]
 *
 *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
 * @symb R.flip(f)(a, b, c) = f(b, a, c)
 */


var flip =
/*#__PURE__*/
_curry1(function flip(fn) {
  return curryN(fn.length, function (a, b) {
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = b;
    args[1] = a;
    return fn.apply(this, args);
  });
});

module.exports = flip;

/***/ }),

/***/ 15636:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _checkForMethod =
/*#__PURE__*/
__webpack_require__(73542);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Iterate over an input `list`, calling a provided function `fn` for each
 * element in the list.
 *
 * `fn` receives one argument: *(value)*.
 *
 * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.forEach` method. For more
 * details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
 *
 * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
 * the original array. In some libraries this function is named `each`.
 *
 * Dispatches to the `forEach` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> *) -> [a] -> [a]
 * @param {Function} fn The function to invoke. Receives one argument, `value`.
 * @param {Array} list The list to iterate over.
 * @return {Array} The original list.
 * @see R.addIndex
 * @example
 *
 *      const printXPlusFive = x => console.log(x + 5);
 *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
 *      // logs 6
 *      // logs 7
 *      // logs 8
 * @symb R.forEach(f, [a, b, c]) = [a, b, c]
 */


var forEach =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_checkForMethod('forEach', function forEach(fn, list) {
  var len = list.length;
  var idx = 0;

  while (idx < len) {
    fn(list[idx]);
    idx += 1;
  }

  return list;
}));

module.exports = forEach;

/***/ }),

/***/ 28860:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var keys =
/*#__PURE__*/
__webpack_require__(90368);
/**
 * Iterate over an input `object`, calling a provided function `fn` for each
 * key and value in the object.
 *
 * `fn` receives three argument: *(value, key, obj)*.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Object
 * @sig ((a, String, StrMap a) -> Any) -> StrMap a -> StrMap a
 * @param {Function} fn The function to invoke. Receives three argument, `value`, `key`, `obj`.
 * @param {Object} obj The object to iterate over.
 * @return {Object} The original object.
 * @example
 *
 *      const printKeyConcatValue = (value, key) => console.log(key + ':' + value);
 *      R.forEachObjIndexed(printKeyConcatValue, {x: 1, y: 2}); //=> {x: 1, y: 2}
 *      // logs x:1
 *      // logs y:2
 * @symb R.forEachObjIndexed(f, {x: a, y: b}) = {x: a, y: b}
 */


var forEachObjIndexed =
/*#__PURE__*/
_curry2(function forEachObjIndexed(fn, obj) {
  var keyList = keys(obj);
  var idx = 0;

  while (idx < keyList.length) {
    var key = keyList[idx];
    fn(obj[key], key, obj);
    idx += 1;
  }

  return obj;
});

module.exports = forEachObjIndexed;

/***/ }),

/***/ 425:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);
/**
 * Creates a new object from a list key-value pairs. If a key appears in
 * multiple pairs, the rightmost pair is included in the object.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [[k,v]] -> {k: v}
 * @param {Array} pairs An array of two-element arrays that will be the keys and values of the output object.
 * @return {Object} The object made by pairing up `keys` and `values`.
 * @see R.toPairs, R.pair
 * @example
 *
 *      R.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
 */


var fromPairs =
/*#__PURE__*/
_curry1(function fromPairs(pairs) {
  var result = {};
  var idx = 0;

  while (idx < pairs.length) {
    result[pairs[idx][0]] = pairs[idx][1];
    idx += 1;
  }

  return result;
});

module.exports = fromPairs;

/***/ }),

/***/ 10449:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _checkForMethod =
/*#__PURE__*/
__webpack_require__(73542);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var reduceBy =
/*#__PURE__*/
__webpack_require__(44285);
/**
 * Splits a list into sub-lists stored in an object, based on the result of
 * calling a key-returning function on each element, and grouping the
 * results according to values returned.
 *
 * Dispatches to the `groupBy` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @typedefn Idx = String | Int | Symbol
 * @sig Idx a => (b -> a) -> [b] -> {a: [b]}
 * @param {Function} fn Function :: a -> Idx
 * @param {Array} list The array to group
 * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
 *         that produced that key when passed to `fn`.
 * @see R.reduceBy, R.transduce, R.indexBy, R.collectBy
 * @example
 *
 *      const byGrade = R.groupBy(function(student) {
 *        const score = student.score;
 *        return score < 65 ? 'F' :
 *               score < 70 ? 'D' :
 *               score < 80 ? 'C' :
 *               score < 90 ? 'B' : 'A';
 *      });
 *      const students = [{name: 'Abby', score: 84},
 *                      {name: 'Eddy', score: 58},
 *                      // ...
 *                      {name: 'Jack', score: 69}];
 *      byGrade(students);
 *      // {
 *      //   'A': [{name: 'Dianne', score: 99}],
 *      //   'B': [{name: 'Abby', score: 84}]
 *      //   // ...,
 *      //   'F': [{name: 'Eddy', score: 58}]
 *      // }
 */


var groupBy =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_checkForMethod('groupBy',
/*#__PURE__*/
reduceBy(function (acc, item) {
  acc.push(item);
  return acc;
}, [])));

module.exports = groupBy;

/***/ }),

/***/ 17233:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Takes a list and returns a list of lists where each sublist's elements are
 * all satisfied pairwise comparison according to the provided function.
 * Only adjacent elements are passed to the comparison function.
 *
 * @func
 * @memberOf R
 * @since v0.21.0
 * @category List
 * @sig ((a, a) → Boolean) → [a] → [[a]]
 * @param {Function} fn Function for determining whether two given (adjacent)
 *        elements should be in the same group
 * @param {Array} list The array to group. Also accepts a string, which will be
 *        treated as a list of characters.
 * @return {List} A list that contains sublists of elements,
 *         whose concatenations are equal to the original list.
 * @example
 *
 * R.groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a + 1 === b, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0, 1], [1, 2, 3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3, 5], [8], [13, 21]]
 *
 * const isVowel = R.test(/^[aeiou]$/i);
 * R.groupWith(R.eqBy(isVowel), 'aestiou')
 * //=> ['ae', 'st', 'iou']
 */


var groupWith =
/*#__PURE__*/
_curry2(function (fn, list) {
  var res = [];
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    var nextidx = idx + 1;

    while (nextidx < len && fn(list[nextidx - 1], list[nextidx])) {
      nextidx += 1;
    }

    res.push(list.slice(idx, nextidx));
    idx = nextidx;
  }

  return res;
});

module.exports = groupWith;

/***/ }),

/***/ 72038:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Returns `true` if the first argument is greater than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.lt
 * @example
 *
 *      R.gt(2, 1); //=> true
 *      R.gt(2, 2); //=> false
 *      R.gt(2, 3); //=> false
 *      R.gt('a', 'z'); //=> false
 *      R.gt('z', 'a'); //=> true
 */


var gt =
/*#__PURE__*/
_curry2(function gt(a, b) {
  return a > b;
});

module.exports = gt;

/***/ }),

/***/ 88524:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Returns `true` if the first argument is greater than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.lte
 * @example
 *
 *      R.gte(2, 1); //=> true
 *      R.gte(2, 2); //=> true
 *      R.gte(2, 3); //=> false
 *      R.gte('a', 'z'); //=> false
 *      R.gte('z', 'a'); //=> true
 */


var gte =
/*#__PURE__*/
_curry2(function gte(a, b) {
  return a >= b;
});

module.exports = gte;

/***/ }),

/***/ 97877:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var hasPath =
/*#__PURE__*/
__webpack_require__(12618);
/**
 * Returns whether or not an object has an own property with the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      const hasName = R.has('name');
 *      hasName({name: 'alice'});   //=> true
 *      hasName({name: 'bob'});     //=> true
 *      hasName({});                //=> false
 *
 *      const point = {x: 0, y: 0};
 *      const pointHas = R.has(R.__, point);
 *      pointHas('x');  //=> true
 *      pointHas('y');  //=> true
 *      pointHas('z');  //=> false
 */


var has =
/*#__PURE__*/
_curry2(function has(prop, obj) {
  return hasPath([prop], obj);
});

module.exports = has;

/***/ }),

/***/ 85809:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var isNil =
/*#__PURE__*/
__webpack_require__(13657);
/**
 * Returns whether or not an object or its prototype chain has a property with
 * the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      function Rectangle(width, height) {
 *        this.width = width;
 *        this.height = height;
 *      }
 *      Rectangle.prototype.area = function() {
 *        return this.width * this.height;
 *      };
 *
 *      const square = new Rectangle(2, 2);
 *      R.hasIn('width', square);  //=> true
 *      R.hasIn('area', square);  //=> true
 */


var hasIn =
/*#__PURE__*/
_curry2(function hasIn(prop, obj) {
  if (isNil(obj)) {
    return false;
  }

  return prop in obj;
});

module.exports = hasIn;

/***/ }),

/***/ 12618:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _has =
/*#__PURE__*/
__webpack_require__(87684);

var isNil =
/*#__PURE__*/
__webpack_require__(13657);
/**
 * Returns whether or not a path exists in an object. Only the object's
 * own properties are checked.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Object
 * @typedefn Idx = String | Int | Symbol
 * @sig [Idx] -> {a} -> Boolean
 * @param {Array} path The path to use.
 * @param {Object} obj The object to check the path in.
 * @return {Boolean} Whether the path exists.
 * @see R.has
 * @example
 *
 *      R.hasPath(['a', 'b'], {a: {b: 2}});         // => true
 *      R.hasPath(['a', 'b'], {a: {b: undefined}}); // => true
 *      R.hasPath(['a', 'b'], {a: {c: 2}});         // => false
 *      R.hasPath(['a', 'b'], {});                  // => false
 */


var hasPath =
/*#__PURE__*/
_curry2(function hasPath(_path, obj) {
  if (_path.length === 0 || isNil(obj)) {
    return false;
  }

  var val = obj;
  var idx = 0;

  while (idx < _path.length) {
    if (!isNil(val) && _has(_path[idx], val)) {
      val = val[_path[idx]];
      idx += 1;
    } else {
      return false;
    }
  }

  return true;
});

module.exports = hasPath;

/***/ }),

/***/ 46408:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nth =
/*#__PURE__*/
__webpack_require__(87041);
/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {Array|String} list
 * @return {*}
 * @see R.tail, R.init, R.last
 * @example
 *
 *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
 *      R.head([]); //=> undefined
 *
 *      R.head('abc'); //=> 'a'
 *      R.head(''); //=> ''
 */


var head =
/*#__PURE__*/
nth(0);
module.exports = head;

/***/ }),

/***/ 35713:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _objectIs =
/*#__PURE__*/
__webpack_require__(21361);
/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 *
 * Note this is merely a curried version of ES6 `Object.is`.
 *
 * `identical` does not support the `__` placeholder.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      const o = {};
 *      R.identical(o, o); //=> true
 *      R.identical(1, 1); //=> true
 *      R.identical(1, '1'); //=> false
 *      R.identical([], []); //=> false
 *      R.identical(0, -0); //=> false
 *      R.identical(NaN, NaN); //=> true
 */


var identical = function (a, b) {
  switch (arguments.length) {
    case 0:
      return identical;

    case 1:
      return function () {
        return function unaryIdentical(_b) {
          switch (arguments.length) {
            case 0:
              return unaryIdentical;

            default:
              return _objectIs(a, _b);
          }
        };
      }();

    default:
      return _objectIs(a, b);
  }
}; // In order to support Cross-origin Window objects as arguments to identical,
// it cannot be implemented as _curry2(_objectIs).
// The reason is that _curry2 checks if a function argument is the placeholder __
// by accessing a paritcular property. However, across URL origins access
// to most properties of Window is forbidden.


module.exports = identical;

/***/ }),

/***/ 69105:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var _identity =
/*#__PURE__*/
__webpack_require__(50339);
/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> a
 * @param {*} x The value to return.
 * @return {*} The input value, `x`.
 * @example
 *
 *      R.identity(1); //=> 1
 *
 *      const obj = {};
 *      R.identity(obj) === obj; //=> true
 * @symb R.identity(a) = a
 */


var identity =
/*#__PURE__*/
_curry1(_identity);

module.exports = identity;

/***/ }),

/***/ 23710:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var curryN =
/*#__PURE__*/
__webpack_require__(2220);
/**
 * Creates a function that will process either the `onTrue` or the `onFalse`
 * function depending upon the result of the `condition` predicate.
 *
 * Note that `ifElse` takes its arity from the longest of the three functions passed to it.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
 * @param {Function} condition A predicate function
 * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
 * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
 * @return {Function} A new function that will process either the `onTrue` or the `onFalse`
 *                    function depending upon the result of the `condition` predicate.
 * @see R.unless, R.when, R.cond
 * @example
 *
 *      const incCount = R.ifElse(
 *        R.has('count'),
 *        R.over(R.lensProp('count'), R.inc),
 *        R.assoc('count', 1)
 *      );
 *      incCount({ count: 1 }); //=> { count: 2 }
 *      incCount({});           //=> { count: 1 }
 */


var ifElse =
/*#__PURE__*/
_curry3(function ifElse(condition, onTrue, onFalse) {
  return curryN(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
    return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
  });
});

module.exports = ifElse;

/***/ }),

/***/ 40486:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var add =
/*#__PURE__*/
__webpack_require__(63073);
/**
 * Increments its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n + 1
 * @see R.dec
 * @example
 *
 *      R.inc(42); //=> 43
 */


var inc =
/*#__PURE__*/
add(1);
module.exports = inc;

/***/ }),

/***/ 59270:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _includes =
/*#__PURE__*/
__webpack_require__(87243);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Returns `true` if the specified value is equal, in [`R.equals`](#equals)
 * terms, to at least one element of the given list; `false` otherwise.
 * Also works with strings.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category List
 * @sig a -> [a] -> Boolean
 * @param {Object} a The item to compare against.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if an equivalent item is in the list, `false` otherwise.
 * @see R.any
 * @example
 *
 *      R.includes(3, [1, 2, 3]); //=> true
 *      R.includes(4, [1, 2, 3]); //=> false
 *      R.includes({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
 *      R.includes([42], [[42]]); //=> true
 *      R.includes('ba', 'banana'); //=>true
 */


var includes =
/*#__PURE__*/
_curry2(_includes);

module.exports = includes;

/***/ }),

/***/ 36:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {};
module.exports.F = __webpack_require__(91369);
module.exports.T = __webpack_require__(53007);
module.exports.__ = __webpack_require__(34923);
module.exports.add = __webpack_require__(63073);
module.exports.addIndex = __webpack_require__(45582);
module.exports.addIndexRight = __webpack_require__(16160);
module.exports.adjust = __webpack_require__(82515);
module.exports.all = __webpack_require__(22626);
module.exports.allPass = __webpack_require__(57735);
module.exports.always = __webpack_require__(54115);
module.exports.and = __webpack_require__(42537);
module.exports.any = __webpack_require__(78095);
module.exports.anyPass = __webpack_require__(98766);
module.exports.ap = __webpack_require__(77693);
module.exports.aperture = __webpack_require__(85133);
module.exports.append = __webpack_require__(89576);
module.exports.apply = __webpack_require__(75748);
module.exports.applySpec = __webpack_require__(58375);
module.exports.applyTo = __webpack_require__(61423);
module.exports.ascend = __webpack_require__(7772);
module.exports.assoc = __webpack_require__(66497);
module.exports.assocPath = __webpack_require__(32423);
module.exports.binary = __webpack_require__(70962);
module.exports.bind = __webpack_require__(63195);
module.exports.both = __webpack_require__(23018);
module.exports.call = __webpack_require__(2703);
module.exports.chain = __webpack_require__(79098);
module.exports.clamp = __webpack_require__(11);
module.exports.clone = __webpack_require__(91549);
module.exports.collectBy = __webpack_require__(69406);
module.exports.comparator = __webpack_require__(83428);
module.exports.complement = __webpack_require__(36573);
module.exports.compose = __webpack_require__(50557);
module.exports.composeWith = __webpack_require__(51663);
module.exports.concat = __webpack_require__(54405);
module.exports.cond = __webpack_require__(17794);
module.exports.construct = __webpack_require__(27448);
module.exports.constructN = __webpack_require__(96809);
module.exports.converge = __webpack_require__(38907);
module.exports.count = __webpack_require__(63558);
module.exports.countBy = __webpack_require__(78324);
module.exports.curry = __webpack_require__(3087);
module.exports.curryN = __webpack_require__(2220);
module.exports.dec = __webpack_require__(17919);
module.exports.defaultTo = __webpack_require__(52892);
module.exports.descend = __webpack_require__(78045);
module.exports.difference = __webpack_require__(34226);
module.exports.differenceWith = __webpack_require__(22013);
module.exports.dissoc = __webpack_require__(92650);
module.exports.dissocPath = __webpack_require__(72337);
module.exports.divide = __webpack_require__(47166);
module.exports.drop = __webpack_require__(78821);
module.exports.dropLast = __webpack_require__(50898);
module.exports.dropLastWhile = __webpack_require__(62520);
module.exports.dropRepeats = __webpack_require__(74649);
module.exports.dropRepeatsBy = __webpack_require__(91591);
module.exports.dropRepeatsWith = __webpack_require__(43432);
module.exports.dropWhile = __webpack_require__(51008);
module.exports.either = __webpack_require__(14087);
module.exports.empty = __webpack_require__(8403);
module.exports.endsWith = __webpack_require__(30796);
module.exports.eqBy = __webpack_require__(24486);
module.exports.eqProps = __webpack_require__(54228);
module.exports.equals = __webpack_require__(51481);
module.exports.evolve = __webpack_require__(22624);
module.exports.filter = __webpack_require__(51383);
module.exports.find = __webpack_require__(46376);
module.exports.findIndex = __webpack_require__(53523);
module.exports.findLast = __webpack_require__(79605);
module.exports.findLastIndex = __webpack_require__(52417);
module.exports.flatten = __webpack_require__(77414);
module.exports.flip = __webpack_require__(9134);
module.exports.forEach = __webpack_require__(15636);
module.exports.forEachObjIndexed = __webpack_require__(28860);
module.exports.fromPairs = __webpack_require__(425);
module.exports.groupBy = __webpack_require__(10449);
module.exports.groupWith = __webpack_require__(17233);
module.exports.gt = __webpack_require__(72038);
module.exports.gte = __webpack_require__(88524);
module.exports.has = __webpack_require__(97877);
module.exports.hasIn = __webpack_require__(85809);
module.exports.hasPath = __webpack_require__(12618);
module.exports.head = __webpack_require__(46408);
module.exports.identical = __webpack_require__(35713);
module.exports.identity = __webpack_require__(69105);
module.exports.ifElse = __webpack_require__(23710);
module.exports.inc = __webpack_require__(40486);
module.exports.includes = __webpack_require__(59270);
module.exports.indexBy = __webpack_require__(40731);
module.exports.indexOf = __webpack_require__(73411);
module.exports.init = __webpack_require__(51010);
module.exports.innerJoin = __webpack_require__(99496);
module.exports.insert = __webpack_require__(27938);
module.exports.insertAll = __webpack_require__(87449);
module.exports.intersection = __webpack_require__(26921);
module.exports.intersperse = __webpack_require__(72577);
module.exports.into = __webpack_require__(33795);
module.exports.invert = __webpack_require__(92778);
module.exports.invertObj = __webpack_require__(62380);
module.exports.invoker = __webpack_require__(25189);
module.exports.is = __webpack_require__(9443);
module.exports.isEmpty = __webpack_require__(42157);
module.exports.isNil = __webpack_require__(13657);
module.exports.isNotNil = __webpack_require__(91533);
module.exports.join = __webpack_require__(18231);
module.exports.juxt = __webpack_require__(55389);
module.exports.keys = __webpack_require__(90368);
module.exports.keysIn = __webpack_require__(17716);
module.exports.last = __webpack_require__(27601);
module.exports.lastIndexOf = __webpack_require__(43448);
module.exports.length = __webpack_require__(24234);
module.exports.lens = __webpack_require__(83087);
module.exports.lensIndex = __webpack_require__(76584);
module.exports.lensPath = __webpack_require__(13207);
module.exports.lensProp = __webpack_require__(25677);
module.exports.lift = __webpack_require__(4041);
module.exports.liftN = __webpack_require__(1272);
module.exports.lt = __webpack_require__(97560);
module.exports.lte = __webpack_require__(13594);
module.exports.map = __webpack_require__(61894);
module.exports.mapAccum = __webpack_require__(11282);
module.exports.mapAccumRight = __webpack_require__(51187);
module.exports.mapObjIndexed = __webpack_require__(90013);
module.exports.match = __webpack_require__(6087);
module.exports.mathMod = __webpack_require__(39175);
module.exports.max = __webpack_require__(21186);
module.exports.maxBy = __webpack_require__(91121);
module.exports.mean = __webpack_require__(70182);
module.exports.median = __webpack_require__(98442);
module.exports.memoizeWith = __webpack_require__(37365);
module.exports.mergeAll = __webpack_require__(51493);
module.exports.mergeDeepLeft = __webpack_require__(88576);
module.exports.mergeDeepRight = __webpack_require__(57046);
module.exports.mergeDeepWith = __webpack_require__(71334);
module.exports.mergeDeepWithKey = __webpack_require__(39036);
module.exports.mergeLeft = __webpack_require__(55765);
module.exports.mergeRight = __webpack_require__(79821);
module.exports.mergeWith = __webpack_require__(71008);
module.exports.mergeWithKey = __webpack_require__(56027);
module.exports.min = __webpack_require__(25624);
module.exports.minBy = __webpack_require__(72121);
module.exports.modify = __webpack_require__(11576);
module.exports.modifyPath = __webpack_require__(62514);
module.exports.modulo = __webpack_require__(52395);
module.exports.move = __webpack_require__(74322);
module.exports.multiply = __webpack_require__(1102);
module.exports.nAry = __webpack_require__(40864);
module.exports.partialObject = __webpack_require__(72102);
module.exports.negate = __webpack_require__(709);
module.exports.none = __webpack_require__(79916);
module.exports.not = __webpack_require__(22184);
module.exports.nth = __webpack_require__(87041);
module.exports.nthArg = __webpack_require__(33367);
module.exports.o = __webpack_require__(62809);
module.exports.objOf = __webpack_require__(144);
module.exports.of = __webpack_require__(70682);
module.exports.omit = __webpack_require__(61584);
module.exports.on = __webpack_require__(11107);
module.exports.once = __webpack_require__(79487);
module.exports.or = __webpack_require__(18384);
module.exports.otherwise = __webpack_require__(37273);
module.exports.over = __webpack_require__(92738);
module.exports.pair = __webpack_require__(68380);
module.exports.partial = __webpack_require__(96942);
module.exports.partialRight = __webpack_require__(69025);
module.exports.partition = __webpack_require__(38135);
module.exports.path = __webpack_require__(87430);
module.exports.paths = __webpack_require__(84439);
module.exports.pathEq = __webpack_require__(40437);
module.exports.pathOr = __webpack_require__(54782);
module.exports.pathSatisfies = __webpack_require__(4991);
module.exports.pick = __webpack_require__(5206);
module.exports.pickAll = __webpack_require__(14286);
module.exports.pickBy = __webpack_require__(12964);
module.exports.pipe = __webpack_require__(4603);
module.exports.pipeWith = __webpack_require__(51446);
module.exports.pluck = __webpack_require__(84585);
module.exports.prepend = __webpack_require__(80409);
module.exports.product = __webpack_require__(18890);
module.exports.project = __webpack_require__(61391);
module.exports.promap = __webpack_require__(59548);
module.exports.prop = __webpack_require__(52478);
module.exports.propEq = __webpack_require__(18371);
module.exports.propIs = __webpack_require__(58426);
module.exports.propOr = __webpack_require__(53176);
module.exports.propSatisfies = __webpack_require__(67430);
module.exports.props = __webpack_require__(64691);
module.exports.range = __webpack_require__(56396);
module.exports.reduce = __webpack_require__(20793);
module.exports.reduceBy = __webpack_require__(44285);
module.exports.reduceRight = __webpack_require__(47981);
module.exports.reduceWhile = __webpack_require__(16392);
module.exports.reduced = __webpack_require__(39280);
module.exports.reject = __webpack_require__(63266);
module.exports.remove = __webpack_require__(99072);
module.exports.repeat = __webpack_require__(33633);
module.exports.replace = __webpack_require__(5683);
module.exports.reverse = __webpack_require__(65814);
module.exports.scan = __webpack_require__(95485);
module.exports.sequence = __webpack_require__(233);
module.exports.set = __webpack_require__(5994);
module.exports.slice = __webpack_require__(81753);
module.exports.sort = __webpack_require__(36218);
module.exports.sortBy = __webpack_require__(1667);
module.exports.sortWith = __webpack_require__(39153);
module.exports.split = __webpack_require__(12601);
module.exports.splitAt = __webpack_require__(68959);
module.exports.splitEvery = __webpack_require__(59241);
module.exports.splitWhen = __webpack_require__(9781);
module.exports.splitWhenever = __webpack_require__(83709);
module.exports.startsWith = __webpack_require__(60830);
module.exports.subtract = __webpack_require__(29454);
module.exports.sum = __webpack_require__(36945);
module.exports.swap = __webpack_require__(59776);
module.exports.symmetricDifference = __webpack_require__(16722);
module.exports.symmetricDifferenceWith = __webpack_require__(7776);
module.exports.tail = __webpack_require__(43656);
module.exports.take = __webpack_require__(94744);
module.exports.takeLast = __webpack_require__(18703);
module.exports.takeLastWhile = __webpack_require__(96412);
module.exports.takeWhile = __webpack_require__(27050);
module.exports.tap = __webpack_require__(6037);
module.exports.test = __webpack_require__(73495);
module.exports.andThen = __webpack_require__(1859);
module.exports.times = __webpack_require__(32250);
module.exports.toLower = __webpack_require__(80620);
module.exports.toPairs = __webpack_require__(98313);
module.exports.toPairsIn = __webpack_require__(44739);
module.exports.toString = __webpack_require__(15243);
module.exports.toUpper = __webpack_require__(74633);
module.exports.transduce = __webpack_require__(63158);
module.exports.transpose = __webpack_require__(5466);
module.exports.traverse = __webpack_require__(40231);
module.exports.trim = __webpack_require__(67031);
module.exports.tryCatch = __webpack_require__(55105);
module.exports.type = __webpack_require__(36433);
module.exports.unapply = __webpack_require__(59378);
module.exports.unary = __webpack_require__(51380);
module.exports.uncurryN = __webpack_require__(1465);
module.exports.unfold = __webpack_require__(32936);
module.exports.union = __webpack_require__(30275);
module.exports.unionWith = __webpack_require__(90014);
module.exports.uniq = __webpack_require__(90086);
module.exports.uniqBy = __webpack_require__(54025);
module.exports.uniqWith = __webpack_require__(77263);
module.exports.unless = __webpack_require__(61937);
module.exports.unnest = __webpack_require__(51497);
module.exports.until = __webpack_require__(51800);
module.exports.unwind = __webpack_require__(95244);
module.exports.update = __webpack_require__(67964);
module.exports.useWith = __webpack_require__(40517);
module.exports.values = __webpack_require__(33411);
module.exports.valuesIn = __webpack_require__(75988);
module.exports.view = __webpack_require__(43931);
module.exports.when = __webpack_require__(47176);
module.exports.where = __webpack_require__(39629);
module.exports.whereAny = __webpack_require__(72146);
module.exports.whereEq = __webpack_require__(15598);
module.exports.without = __webpack_require__(76290);
module.exports.xor = __webpack_require__(64958);
module.exports.xprod = __webpack_require__(90482);
module.exports.zip = __webpack_require__(5086);
module.exports.zipObj = __webpack_require__(47858);
module.exports.zipWith = __webpack_require__(19380);
module.exports.thunkify = __webpack_require__(92839);

/***/ }),

/***/ 40731:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var reduceBy =
/*#__PURE__*/
__webpack_require__(44285);
/**
 * Given a function that generates a key, turns a list of objects into an
 * object indexing the objects by the given key. Note that if multiple
 * objects generate the same value for the indexing key only the last value
 * will be included in the generated object.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @typedefn Idx = String | Int | Symbol
 * @sig Idx a => (b -> a) -> [b] -> {a: b}
 * @param {Function} fn Function :: a -> Idx
 * @param {Array} array The array of objects to index
 * @return {Object} An object indexing each array element by the given property.
 * @see R.groupBy
 * @example
 *
 *      const list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
 *      R.indexBy(R.prop('id'), list);
 *      //=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}
 */


var indexBy =
/*#__PURE__*/
reduceBy(function (acc, elem) {
  return elem;
}, null);
module.exports = indexBy;

/***/ }),

/***/ 73411:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _indexOf =
/*#__PURE__*/
__webpack_require__(96069);

var _isArray =
/*#__PURE__*/
__webpack_require__(20219);
/**
 * Returns the position of the first occurrence of an item in an array, or -1
 * if the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.lastIndexOf, R.findIndex
 * @example
 *
 *      R.indexOf(3, [1,2,3,4]); //=> 2
 *      R.indexOf(10, [1,2,3,4]); //=> -1
 */


var indexOf =
/*#__PURE__*/
_curry2(function indexOf(target, xs) {
  return typeof xs.indexOf === 'function' && !_isArray(xs) ? xs.indexOf(target) : _indexOf(xs, target, 0);
});

module.exports = indexOf;

/***/ }),

/***/ 51010:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var slice =
/*#__PURE__*/
__webpack_require__(81753);
/**
 * Returns all but the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.last, R.head, R.tail
 * @example
 *
 *      R.init([1, 2, 3]);  //=> [1, 2]
 *      R.init([1, 2]);     //=> [1]
 *      R.init([1]);        //=> []
 *      R.init([]);         //=> []
 *
 *      R.init('abc');  //=> 'ab'
 *      R.init('ab');   //=> 'a'
 *      R.init('a');    //=> ''
 *      R.init('');     //=> ''
 */


var init =
/*#__PURE__*/
slice(0, -1);
module.exports = init;

/***/ }),

/***/ 99496:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _includesWith =
/*#__PURE__*/
__webpack_require__(82976);

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var _filter =
/*#__PURE__*/
__webpack_require__(34877);
/**
 * Takes a predicate `pred`, a list `xs`, and a list `ys`, and returns a list
 * `xs'` comprising each of the elements of `xs` which is equal to one or more
 * elements of `ys` according to `pred`.
 *
 * `pred` must be a binary function expecting an element from each list.
 *
 * `xs`, `ys`, and `xs'` are treated as sets, semantically, so ordering should
 * not be significant, but since `xs'` is ordered the implementation guarantees
 * that its values are in the same order as they appear in `xs`. Duplicates are
 * not removed, so `xs'` may contain duplicates if `xs` contains duplicates.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Relation
 * @sig ((a, b) -> Boolean) -> [a] -> [b] -> [a]
 * @param {Function} pred
 * @param {Array} xs
 * @param {Array} ys
 * @return {Array}
 * @see R.intersection
 * @example
 *
 *      R.innerJoin(
 *        (record, id) => record.id === id,
 *        [{id: 824, name: 'Richie Furay'},
 *         {id: 956, name: 'Dewey Martin'},
 *         {id: 313, name: 'Bruce Palmer'},
 *         {id: 456, name: 'Stephen Stills'},
 *         {id: 177, name: 'Neil Young'}],
 *        [177, 456, 999]
 *      );
 *      //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
 */


var innerJoin =
/*#__PURE__*/
_curry3(function innerJoin(pred, xs, ys) {
  return _filter(function (x) {
    return _includesWith(pred, x, ys);
  }, xs);
});

module.exports = innerJoin;

/***/ }),

/***/ 27938:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);
/**
 * Inserts the supplied element into the list, at the specified `index`. _Note that

 * this is not destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} index The position to insert the element
 * @param {*} elt The element to insert into the Array
 * @param {Array} list The list to insert into
 * @return {Array} A new Array with `elt` inserted at `index`.
 * @example
 *
 *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
 */


var insert =
/*#__PURE__*/
_curry3(function insert(idx, elt, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  var result = Array.prototype.slice.call(list, 0);
  result.splice(idx, 0, elt);
  return result;
});

module.exports = insert;

/***/ }),

/***/ 87449:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);
/**
 * Inserts the sub-list into the list, at the specified `index`. _Note that this is not
 * destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig Number -> [a] -> [a] -> [a]
 * @param {Number} index The position to insert the sub-list
 * @param {Array} elts The sub-list to insert into the Array
 * @param {Array} list The list to insert the sub-list into
 * @return {Array} A new Array with `elts` inserted starting at `index`.
 * @example
 *
 *      R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
 */


var insertAll =
/*#__PURE__*/
_curry3(function insertAll(idx, elts, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  return [].concat(Array.prototype.slice.call(list, 0, idx), elts, Array.prototype.slice.call(list, idx));
});

module.exports = insertAll;

/***/ }),

/***/ 8876:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _includes =
/*#__PURE__*/
__webpack_require__(87243);

var _Set =
/*#__PURE__*/
function () {
  function _Set() {
    /* globals Set */
    this._nativeSet = typeof Set === 'function' ? new Set() : null;
    this._items = {};
  }

  // until we figure out why jsdoc chokes on this
  // @param item The item to add to the Set
  // @returns {boolean} true if the item did not exist prior, otherwise false
  //
  _Set.prototype.add = function (item) {
    return !hasOrAdd(item, true, this);
  }; //
  // @param item The item to check for existence in the Set
  // @returns {boolean} true if the item exists in the Set, otherwise false
  //


  _Set.prototype.has = function (item) {
    return hasOrAdd(item, false, this);
  }; //
  // Combines the logic for checking whether an item is a member of the set and
  // for adding a new item to the set.
  //
  // @param item       The item to check or add to the Set instance.
  // @param shouldAdd  If true, the item will be added to the set if it doesn't
  //                   already exist.
  // @param set        The set instance to check or add to.
  // @return {boolean} true if the item already existed, otherwise false.
  //


  return _Set;
}();

function hasOrAdd(item, shouldAdd, set) {
  var type = typeof item;
  var prevSize, newSize;

  switch (type) {
    case 'string':
    case 'number':
      // distinguish between +0 and -0
      if (item === 0 && 1 / item === -Infinity) {
        if (set._items['-0']) {
          return true;
        } else {
          if (shouldAdd) {
            set._items['-0'] = true;
          }

          return false;
        }
      } // these types can all utilise the native Set


      if (set._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set._nativeSet.size;

          set._nativeSet.add(item);

          newSize = set._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set._nativeSet.has(item);
        }
      } else {
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = {};
            set._items[type][item] = true;
          }

          return false;
        } else if (item in set._items[type]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type][item] = true;
          }

          return false;
        }
      }

    case 'boolean':
      // set._items['boolean'] holds a two element array
      // representing [ falseExists, trueExists ]
      if (type in set._items) {
        var bIdx = item ? 1 : 0;

        if (set._items[type][bIdx]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type][bIdx] = true;
          }

          return false;
        }
      } else {
        if (shouldAdd) {
          set._items[type] = item ? [false, true] : [true, false];
        }

        return false;
      }

    case 'function':
      // compare functions for reference equality
      if (set._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set._nativeSet.size;

          set._nativeSet.add(item);

          newSize = set._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set._nativeSet.has(item);
        }
      } else {
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = [item];
          }

          return false;
        }

        if (!_includes(item, set._items[type])) {
          if (shouldAdd) {
            set._items[type].push(item);
          }

          return false;
        }

        return true;
      }

    case 'undefined':
      if (set._items[type]) {
        return true;
      } else {
        if (shouldAdd) {
          set._items[type] = true;
        }

        return false;
      }

    case 'object':
      if (item === null) {
        if (!set._items['null']) {
          if (shouldAdd) {
            set._items['null'] = true;
          }

          return false;
        }

        return true;
      }

    /* falls through */

    default:
      // reduce the search size of heterogeneous sets by creating buckets
      // for each type.
      type = Object.prototype.toString.call(item);

      if (!(type in set._items)) {
        if (shouldAdd) {
          set._items[type] = [item];
        }

        return false;
      } // scan through all previously applied items


      if (!_includes(item, set._items[type])) {
        if (shouldAdd) {
          set._items[type].push(item);
        }

        return false;
      }

      return true;
  }
} // A simple Set type that honours R.equals semantics


module.exports = _Set;

/***/ }),

/***/ 45179:
/***/ ((module) => {

function _aperture(n, list) {
  var idx = 0;
  var limit = list.length - (n - 1);
  var acc = new Array(limit >= 0 ? limit : 0);

  while (idx < limit) {
    acc[idx] = Array.prototype.slice.call(list, idx, idx + n);
    idx += 1;
  }

  return acc;
}

module.exports = _aperture;

/***/ }),

/***/ 7455:
/***/ ((module) => {

function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };

    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };

    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };

    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };

    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };

    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };

    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };

    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };

    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };

    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };

    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };

    default:
      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}

module.exports = _arity;

/***/ }),

/***/ 54118:
/***/ ((module) => {

function _arrayFromIterator(iter) {
  var list = [];
  var next;

  while (!(next = iter.next()).done) {
    list.push(next.value);
  }

  return list;
}

module.exports = _arrayFromIterator;

/***/ }),

/***/ 20854:
/***/ ((module) => {

function _arrayReduce(reducer, acc, list) {
  var index = 0;
  var length = list.length;

  while (index < length) {
    acc = reducer(acc, list[index]);
    index += 1;
  }

  return acc;
}

module.exports = _arrayReduce;

/***/ }),

/***/ 80649:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _isFunction =
/*#__PURE__*/
__webpack_require__(62144);

var _toString =
/*#__PURE__*/
__webpack_require__(31136);

function _assertPromise(name, p) {
  if (p == null || !_isFunction(p.then)) {
    throw new TypeError('`' + name + '` expected a Promise, received ' + _toString(p, []));
  }
}

module.exports = _assertPromise;

/***/ }),

/***/ 17031:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _isArray =
/*#__PURE__*/
__webpack_require__(20219);

var _isInteger =
/*#__PURE__*/
__webpack_require__(37000);
/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @private
 * @param {String|Number} prop The property name to set
 * @param {*} val The new value
 * @param {Object|Array} obj The object to clone
 * @return {Object|Array} A new object equivalent to the original except for the changed property.
 */


function _assoc(prop, val, obj) {
  if (_isInteger(prop) && _isArray(obj)) {
    var arr = [].concat(obj);
    arr[prop] = val;
    return arr;
  }

  var result = {};

  for (var p in obj) {
    result[p] = obj[p];
  }

  result[prop] = val;
  return result;
}

module.exports = _assoc;

/***/ }),

/***/ 73542:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _isArray =
/*#__PURE__*/
__webpack_require__(20219);
/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implementation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */


function _checkForMethod(methodname, fn) {
  return function () {
    var length = arguments.length;

    if (length === 0) {
      return fn();
    }

    var obj = arguments[length - 1];
    return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
}

module.exports = _checkForMethod;

/***/ }),

/***/ 45114:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _cloneRegExp =
/*#__PURE__*/
__webpack_require__(9039);

var type =
/*#__PURE__*/
__webpack_require__(36433);
/**
 * Copies an object.
 *
 * @private
 * @param {*} value The value to be copied
 * @param {Boolean} deep Whether or not to perform deep cloning.
 * @return {*} The copied value.
 */


function _clone(value, deep, map) {
  map || (map = new _ObjectMap()); // this avoids the slower switch with a quick if decision removing some milliseconds in each run.

  if (_isPrimitive(value)) {
    return value;
  }

  var copy = function copy(copiedValue) {
    // Check for circular and same references on the object graph and return its corresponding clone.
    var cachedCopy = map.get(value);

    if (cachedCopy) {
      return cachedCopy;
    }

    map.set(value, copiedValue);

    for (var key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        copiedValue[key] = deep ? _clone(value[key], true, map) : value[key];
      }
    }

    return copiedValue;
  };

  switch (type(value)) {
    case 'Object':
      return copy(Object.create(Object.getPrototypeOf(value)));

    case 'Array':
      return copy([]);

    case 'Date':
      return new Date(value.valueOf());

    case 'RegExp':
      return _cloneRegExp(value);

    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'BigInt64Array':
    case 'BigUint64Array':
      return value.slice();

    default:
      return value;
  }
}

module.exports = _clone;

function _isPrimitive(param) {
  var type = typeof param;
  return param == null || type != 'object' && type != 'function';
}

var _ObjectMap =
/*#__PURE__*/
function () {
  function _ObjectMap() {
    this.map = {};
    this.length = 0;
  }

  _ObjectMap.prototype.set = function (key, value) {
    const hashedKey = this.hash(key);
    let bucket = this.map[hashedKey];

    if (!bucket) {
      this.map[hashedKey] = bucket = [];
    }

    bucket.push([key, value]);
    this.length += 1;
  };

  _ObjectMap.prototype.hash = function (key) {
    let hashedKey = [];

    for (var value in key) {
      hashedKey.push(Object.prototype.toString.call(key[value]));
    }

    return hashedKey.join();
  };

  _ObjectMap.prototype.get = function (key) {
    /**
     * depending on the number of objects to be cloned is faster to just iterate over the items in the map just because the hash function is so costly,
     * on my tests this number is 180, anything above that using the hash function is faster.
     */
    if (this.length <= 180) {
      for (const p in this.map) {
        const bucket = this.map[p];

        for (let i = 0; i < bucket.length; i += 1) {
          const element = bucket[i];

          if (element[0] === key) {
            return element[1];
          }
        }
      }

      return;
    }

    const hashedKey = this.hash(key);
    const bucket = this.map[hashedKey];

    if (!bucket) {
      return;
    }

    for (let i = 0; i < bucket.length; i += 1) {
      const element = bucket[i];

      if (element[0] === key) {
        return element[1];
      }
    }
  };

  return _ObjectMap;
}();

/***/ }),

/***/ 9039:
/***/ ((module) => {

function _cloneRegExp(pattern) {
  return new RegExp(pattern.source, pattern.flags ? pattern.flags : (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : '') + (pattern.dotAll ? 's' : ''));
}

module.exports = _cloneRegExp;

/***/ }),

/***/ 48770:
/***/ ((module) => {

function _complement(f) {
  return function () {
    return !f.apply(this, arguments);
  };
}

module.exports = _complement;

/***/ }),

/***/ 14011:
/***/ ((module) => {

/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @param {Array|Arguments} [set1=[]] An array-like object.
 * @param {Array|Arguments} [set2=[]] An array-like object.
 * @return {Array} A new, merged array.
 * @example
 *
 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */
function _concat(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set2.length;
  var result = [];
  idx = 0;

  while (idx < len1) {
    result[result.length] = set1[idx];
    idx += 1;
  }

  idx = 0;

  while (idx < len2) {
    result[result.length] = set2[idx];
    idx += 1;
  }

  return result;
}

module.exports = _concat;

/***/ }),

/***/ 57994:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arity =
/*#__PURE__*/
__webpack_require__(7455);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

function _createPartialApplicator(concat) {
  return _curry2(function (fn, args) {
    return _arity(Math.max(0, fn.length - args.length), function () {
      return fn.apply(this, concat(args, arguments));
    });
  });
}

module.exports = _createPartialApplicator;

/***/ }),

/***/ 71351:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _isArrayLike =
/*#__PURE__*/
__webpack_require__(3219);

var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';

function _createReduce(arrayReduce, methodReduce, iterableReduce) {
  return function _reduce(xf, acc, list) {
    if (_isArrayLike(list)) {
      return arrayReduce(xf, acc, list);
    }

    if (list == null) {
      return acc;
    }

    if (typeof list['fantasy-land/reduce'] === 'function') {
      return methodReduce(xf, acc, list, 'fantasy-land/reduce');
    }

    if (list[symIterator] != null) {
      return iterableReduce(xf, acc, list[symIterator]());
    }

    if (typeof list.next === 'function') {
      return iterableReduce(xf, acc, list);
    }

    if (typeof list.reduce === 'function') {
      return methodReduce(xf, acc, list, 'reduce');
    }

    throw new TypeError('reduce: list must be array or iterable');
  };
}

module.exports = _createReduce;

/***/ }),

/***/ 76224:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _isPlaceholder =
/*#__PURE__*/
__webpack_require__(36464);
/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

module.exports = _curry1;

/***/ }),

/***/ 79002:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var _isPlaceholder =
/*#__PURE__*/
__webpack_require__(36464);
/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;

      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
          return fn(a, _b);
        });

      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

module.exports = _curry2;

/***/ }),

/***/ 16370:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _isPlaceholder =
/*#__PURE__*/
__webpack_require__(36464);
/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;

      case 1:
        return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        });

      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _curry1(function (_c) {
          return fn(a, b, _c);
        });

      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
          return fn(_a, _b, c);
        }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b, c);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b, c);
        }) : _isPlaceholder(c) ? _curry1(function (_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}

module.exports = _curry3;

/***/ }),

/***/ 32738:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arity =
/*#__PURE__*/
__webpack_require__(7455);

var _isPlaceholder =
/*#__PURE__*/
__webpack_require__(36464);
/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curryN(length, received, fn) {
  return function () {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;

    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;

      if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }

      combined[combinedIdx] = result;

      if (!_isPlaceholder(result)) {
        left -= 1;
      }

      combinedIdx += 1;
    }

    return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
  };
}

module.exports = _curryN;

/***/ }),

/***/ 34793:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _isArray =
/*#__PURE__*/
__webpack_require__(20219);

var _isTransformer =
/*#__PURE__*/
__webpack_require__(69082);
/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer created by [transducerCreator] to return a new transformer
 * (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} transducerCreator transducer factory if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */


function _dispatchable(methodNames, transducerCreator, fn) {
  return function () {
    if (arguments.length === 0) {
      return fn();
    }

    var obj = arguments[arguments.length - 1];

    if (!_isArray(obj)) {
      var idx = 0;

      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, Array.prototype.slice.call(arguments, 0, -1));
        }

        idx += 1;
      }

      if (_isTransformer(obj)) {
        var transducer = transducerCreator.apply(null, Array.prototype.slice.call(arguments, 0, -1));
        return transducer(obj);
      }
    }

    return fn.apply(this, arguments);
  };
}

module.exports = _dispatchable;

/***/ }),

/***/ 15947:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _isInteger =
/*#__PURE__*/
__webpack_require__(37000);

var _isArray =
/*#__PURE__*/
__webpack_require__(20219);

var remove =
/*#__PURE__*/
__webpack_require__(99072);
/**
 * Returns a new object that does not contain a `prop` property.
 *
 * @private
 * @param {String|Number} prop The name of the property to dissociate
 * @param {Object|Array} obj The object to clone
 * @return {Object} A new object equivalent to the original but without the specified property
 */


function _dissoc(prop, obj) {
  if (obj == null) {
    return obj;
  }

  if (_isInteger(prop) && _isArray(obj)) {
    return remove(prop, 1, obj);
  }

  var result = {};

  for (var p in obj) {
    result[p] = obj[p];
  }

  delete result[prop];
  return result;
}

module.exports = _dissoc;

/***/ }),

/***/ 11247:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var take =
/*#__PURE__*/
__webpack_require__(94744);

function dropLast(n, xs) {
  return take(n < xs.length ? xs.length - n : 0, xs);
}

module.exports = dropLast;

/***/ }),

/***/ 57288:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var slice =
/*#__PURE__*/
__webpack_require__(81753);

function dropLastWhile(pred, xs) {
  var idx = xs.length - 1;

  while (idx >= 0 && pred(xs[idx])) {
    idx -= 1;
  }

  return slice(0, idx + 1, xs);
}

module.exports = dropLastWhile;

/***/ }),

/***/ 74023:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arrayFromIterator =
/*#__PURE__*/
__webpack_require__(54118);

var _includesWith =
/*#__PURE__*/
__webpack_require__(82976);

var _functionName =
/*#__PURE__*/
__webpack_require__(4931);

var _has =
/*#__PURE__*/
__webpack_require__(87684);

var _objectIs =
/*#__PURE__*/
__webpack_require__(21361);

var keys =
/*#__PURE__*/
__webpack_require__(90368);

var type =
/*#__PURE__*/
__webpack_require__(36433);
/**
 * private _uniqContentEquals function.
 * That function is checking equality of 2 iterator contents with 2 assumptions
 * - iterators lengths are the same
 * - iterators values are unique
 *
 * false-positive result will be returned for comparison of, e.g.
 * - [1,2,3] and [1,2,3,4]
 * - [1,1,1] and [1,2,3]
 * */


function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = _arrayFromIterator(aIterator);

  var b = _arrayFromIterator(bIterator);

  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  } // if *a* array contains any element that is not included in *b*


  return !_includesWith(function (b, aItem) {
    return !_includesWith(eq, aItem, b);
  }, b, a);
}

function _equals(a, b, stackA, stackB) {
  if (_objectIs(a, b)) {
    return true;
  }

  var typeA = type(a);

  if (typeA !== type(b)) {
    return false;
  }

  if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
    return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) && typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);
  }

  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
    return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
  }

  switch (typeA) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (typeof a.constructor === 'function' && _functionName(a.constructor) === 'Promise') {
        return a === b;
      }

      break;

    case 'Boolean':
    case 'Number':
    case 'String':
      if (!(typeof a === typeof b && _objectIs(a.valueOf(), b.valueOf()))) {
        return false;
      }

      break;

    case 'Date':
      if (!_objectIs(a.valueOf(), b.valueOf())) {
        return false;
      }

      break;

    case 'Error':
      return a.name === b.name && a.message === b.message;

    case 'RegExp':
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }

      break;
  }

  var idx = stackA.length - 1;

  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }

    idx -= 1;
  }

  switch (typeA) {
    case 'Map':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));

    case 'Set':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));

    case 'Arguments':
    case 'Array':
    case 'Object':
    case 'Boolean':
    case 'Number':
    case 'String':
    case 'Date':
    case 'Error':
    case 'RegExp':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'ArrayBuffer':
      break;

    default:
      // Values of other types are only equal if identical.
      return false;
  }

  var keysA = keys(a);

  if (keysA.length !== keys(b).length) {
    return false;
  }

  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);
  idx = keysA.length - 1;

  while (idx >= 0) {
    var key = keysA[idx];

    if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }

    idx -= 1;
  }

  return true;
}

module.exports = _equals;

/***/ }),

/***/ 34877:
/***/ ((module) => {

function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];

  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }

    idx += 1;
  }

  return result;
}

module.exports = _filter;

/***/ }),

/***/ 8530:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _forceReduced =
/*#__PURE__*/
__webpack_require__(50600);

var _isArrayLike =
/*#__PURE__*/
__webpack_require__(3219);

var _xArrayReduce =
/*#__PURE__*/
__webpack_require__(93703);

var _xReduce =
/*#__PURE__*/
__webpack_require__(89632);

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var tInit = '@@transducer/init';
var tStep = '@@transducer/step';
var tResult = '@@transducer/result';

var XPreservingReduced =
/*#__PURE__*/
function () {
  function XPreservingReduced(xf) {
    this.xf = xf;
  }

  XPreservingReduced.prototype[tInit] = _xfBase.init;
  XPreservingReduced.prototype[tResult] = _xfBase.result;

  XPreservingReduced.prototype[tStep] = function (result, input) {
    var ret = this.xf[tStep](result, input);
    return ret['@@transducer/reduced'] ? _forceReduced(ret) : ret;
  };

  return XPreservingReduced;
}();

var XFlatCat =
/*#__PURE__*/
function () {
  function XFlatCat(xf) {
    this.xf = new XPreservingReduced(xf);
  }

  XFlatCat.prototype[tInit] = _xfBase.init;
  XFlatCat.prototype[tResult] = _xfBase.result;

  XFlatCat.prototype[tStep] = function (result, input) {
    return !_isArrayLike(input) ? _xArrayReduce(this.xf, result, [input]) : _xReduce(this.xf, result, input);
  };

  return XFlatCat;
}();

var _flatCat = function _xcat(xf) {
  return new XFlatCat(xf);
};

module.exports = _flatCat;

/***/ }),

/***/ 50600:
/***/ ((module) => {

function _forceReduced(x) {
  return {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}

module.exports = _forceReduced;

/***/ }),

/***/ 4931:
/***/ ((module) => {

function _functionName(f) {
  // String(x => x) evaluates to "x => x", so the pattern may not match.
  var match = String(f).match(/^function (\w*)/);
  return match == null ? '' : match[1];
}

module.exports = _functionName;

/***/ }),

/***/ 87684:
/***/ ((module) => {

function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = _has;

/***/ }),

/***/ 50339:
/***/ ((module) => {

function _identity(x) {
  return x;
}

module.exports = _identity;

/***/ }),

/***/ 87243:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _indexOf =
/*#__PURE__*/
__webpack_require__(96069);

function _includes(a, list) {
  return _indexOf(list, a, 0) >= 0;
}

module.exports = _includes;

/***/ }),

/***/ 82976:
/***/ ((module) => {

function _includesWith(pred, x, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }

    idx += 1;
  }

  return false;
}

module.exports = _includesWith;

/***/ }),

/***/ 96069:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var equals =
/*#__PURE__*/
__webpack_require__(51481);

function _indexOf(list, a, idx) {
  var inf, item; // Array.prototype.indexOf doesn't exist below IE9

  if (typeof list.indexOf === 'function') {
    switch (typeof a) {
      case 'number':
        if (a === 0) {
          // manually crawl the list to distinguish between +0 and -0
          inf = 1 / a;

          while (idx < list.length) {
            item = list[idx];

            if (item === 0 && 1 / item === inf) {
              return idx;
            }

            idx += 1;
          }

          return -1;
        } else if (a !== a) {
          // NaN
          while (idx < list.length) {
            item = list[idx];

            if (typeof item === 'number' && item !== item) {
              return idx;
            }

            idx += 1;
          }

          return -1;
        } // non-zero numbers can utilise Set


        return list.indexOf(a, idx);
      // all these types can utilise Set

      case 'string':
      case 'boolean':
      case 'function':
      case 'undefined':
        return list.indexOf(a, idx);

      case 'object':
        if (a === null) {
          // null can utilise Set
          return list.indexOf(a, idx);
        }

    }
  } // anything else not covered above, defer to R.equals


  while (idx < list.length) {
    if (equals(list[idx], a)) {
      return idx;
    }

    idx += 1;
  }

  return -1;
}

module.exports = _indexOf;

/***/ }),

/***/ 97587:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _has =
/*#__PURE__*/
__webpack_require__(87684);

var toString = Object.prototype.toString;

var _isArguments =
/*#__PURE__*/
function () {
  return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
    return toString.call(x) === '[object Arguments]';
  } : function _isArguments(x) {
    return _has('callee', x);
  };
}();

module.exports = _isArguments;

/***/ }),

/***/ 20219:
/***/ ((module) => {

/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
module.exports = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
};

/***/ }),

/***/ 3219:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var _isArray =
/*#__PURE__*/
__webpack_require__(20219);

var _isString =
/*#__PURE__*/
__webpack_require__(20190);
/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      _isArrayLike([]); //=> true
 *      _isArrayLike(true); //=> false
 *      _isArrayLike({}); //=> false
 *      _isArrayLike({length: 10}); //=> false
 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 *      _isArrayLike({nodeType: 1, length: 1}) // => false
 */


var _isArrayLike =
/*#__PURE__*/
_curry1(function isArrayLike(x) {
  if (_isArray(x)) {
    return true;
  }

  if (!x) {
    return false;
  }

  if (typeof x !== 'object') {
    return false;
  }

  if (_isString(x)) {
    return false;
  }

  if (x.length === 0) {
    return true;
  }

  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }

  return false;
});

module.exports = _isArrayLike;

/***/ }),

/***/ 62144:
/***/ ((module) => {

function _isFunction(x) {
  var type = Object.prototype.toString.call(x);
  return type === '[object Function]' || type === '[object AsyncFunction]' || type === '[object GeneratorFunction]' || type === '[object AsyncGeneratorFunction]';
}

module.exports = _isFunction;

/***/ }),

/***/ 37000:
/***/ ((module) => {

/**
 * Determine if the passed argument is an integer.
 *
 * @private
 * @param {*} n
 * @category Type
 * @return {Boolean}
 */
module.exports = Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
};

/***/ }),

/***/ 58591:
/***/ ((module) => {

function _isNumber(x) {
  return Object.prototype.toString.call(x) === '[object Number]';
}

module.exports = _isNumber;

/***/ }),

/***/ 8291:
/***/ ((module) => {

function _isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}

module.exports = _isObject;

/***/ }),

/***/ 36464:
/***/ ((module) => {

function _isPlaceholder(a) {
  return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
}

module.exports = _isPlaceholder;

/***/ }),

/***/ 79725:
/***/ ((module) => {

function _isRegExp(x) {
  return Object.prototype.toString.call(x) === '[object RegExp]';
}

module.exports = _isRegExp;

/***/ }),

/***/ 20190:
/***/ ((module) => {

function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}

module.exports = _isString;

/***/ }),

/***/ 69082:
/***/ ((module) => {

function _isTransformer(obj) {
  return obj != null && typeof obj['@@transducer/step'] === 'function';
}

module.exports = _isTransformer;

/***/ }),

/***/ 92105:
/***/ ((module) => {

/**
 * Tests whether or not an object is a typed array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is a typed array, `false` otherwise.
 * @example
 *
 *      _isTypedArray(new Uint8Array([])); //=> true
 *      _isTypedArray(new Float32Array([])); //=> true
 *      _isTypedArray([]); //=> false
 *      _isTypedArray(null); //=> false
 *      _isTypedArray({}); //=> false
 */
function _isTypedArray(val) {
  var type = Object.prototype.toString.call(val);
  return type === '[object Uint8ClampedArray]' || type === '[object Int8Array]' || type === '[object Uint8Array]' || type === '[object Int16Array]' || type === '[object Uint16Array]' || type === '[object Int32Array]' || type === '[object Uint32Array]' || type === '[object Float32Array]' || type === '[object Float64Array]' || type === '[object BigInt64Array]' || type === '[object BigUint64Array]';
}

module.exports = _isTypedArray;

/***/ }),

/***/ 55161:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _isArrayLike =
/*#__PURE__*/
__webpack_require__(3219);
/**
 * `_makeFlat` is a helper function that returns a one-level or fully recursive
 * function based on the flag passed in.
 *
 * @private
 */


function _makeFlat(recursive) {
  return function flatt(list) {
    var value, jlen, j;
    var result = [];
    var idx = 0;
    var ilen = list.length;

    while (idx < ilen) {
      if (_isArrayLike(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        jlen = value.length;

        while (j < jlen) {
          result[result.length] = value[j];
          j += 1;
        }
      } else {
        result[result.length] = list[idx];
      }

      idx += 1;
    }

    return result;
  };
}

module.exports = _makeFlat;

/***/ }),

/***/ 36692:
/***/ ((module) => {

function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);

  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }

  return result;
}

module.exports = _map;

/***/ }),

/***/ 54693:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _isArray =
/*#__PURE__*/
__webpack_require__(20219);

var _isInteger =
/*#__PURE__*/
__webpack_require__(37000);
/**
 * Makes a shallow clone of an object, applying the given fn to the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @private
 * @param {String|Number} prop The property name to set
 * @param {Function} fn The function to apply to the property
 * @param {Object|Array} obj The object to clone
 * @return {Object|Array} A new object equivalent to the original except for the changed property.
 */


function _modify(prop, fn, obj) {
  if (_isInteger(prop) && _isArray(obj)) {
    var arr = [].concat(obj);
    arr[prop] = fn(arr[prop]);
    return arr;
  }

  var result = {};

  for (var p in obj) {
    result[p] = obj[p];
  }

  result[prop] = fn(result[prop]);
  return result;
}

module.exports = _modify;

/***/ }),

/***/ 4778:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _has =
/*#__PURE__*/
__webpack_require__(87684); // Based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign


function _objectAssign(target) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);
  var idx = 1;
  var length = arguments.length;

  while (idx < length) {
    var source = arguments[idx];

    if (source != null) {
      for (var nextKey in source) {
        if (_has(nextKey, source)) {
          output[nextKey] = source[nextKey];
        }
      }
    }

    idx += 1;
  }

  return output;
}

module.exports = typeof Object.assign === 'function' ? Object.assign : _objectAssign;

/***/ }),

/***/ 21361:
/***/ ((module) => {

// Based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
function _objectIs(a, b) {
  // SameValue algorithm
  if (a === b) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return a !== 0 || 1 / a === 1 / b;
  } else {
    // Step 6.a: NaN == NaN
    return a !== a && b !== b;
  }
}

module.exports = typeof Object.is === 'function' ? Object.is : _objectIs;

/***/ }),

/***/ 56015:
/***/ ((module) => {

function _pipe(f, g) {
  return function () {
    return g.call(this, f.apply(this, arguments));
  };
}

module.exports = _pipe;

/***/ }),

/***/ 20475:
/***/ ((module) => {

function _promap(f, g, profunctor) {
  return function (x) {
    return g(profunctor(f(x)));
  };
}

module.exports = _promap;

/***/ }),

/***/ 76001:
/***/ ((module) => {

function _quote(s) {
  var escaped = s.replace(/\\/g, '\\\\').replace(/[\b]/g, '\\b') // \b matches word boundary; [\b] matches backspace
  .replace(/\f/g, '\\f').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\v/g, '\\v').replace(/\0/g, '\\0');
  return '"' + escaped.replace(/"/g, '\\"') + '"';
}

module.exports = _quote;

/***/ }),

/***/ 39488:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arrayReduce =
/*#__PURE__*/
__webpack_require__(20854);

var _createReduce =
/*#__PURE__*/
__webpack_require__(71351);

function _iterableReduce(reducer, acc, iter) {
  var step = iter.next();

  while (!step.done) {
    acc = reducer(acc, step.value);
    step = iter.next();
  }

  return acc;
}

function _methodReduce(reducer, acc, obj, methodName) {
  return obj[methodName](reducer, acc);
}

var _reduce =
/*#__PURE__*/
_createReduce(_arrayReduce, _methodReduce, _iterableReduce);

module.exports = _reduce;

/***/ }),

/***/ 22157:
/***/ ((module) => {

function _reduced(x) {
  return x && x['@@transducer/reduced'] ? x : {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}

module.exports = _reduced;

/***/ }),

/***/ 74745:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _objectAssign =
/*#__PURE__*/
__webpack_require__(4778);

var _identity =
/*#__PURE__*/
__webpack_require__(50339);

var _isArrayLike =
/*#__PURE__*/
__webpack_require__(3219);

var _isTransformer =
/*#__PURE__*/
__webpack_require__(69082);

var objOf =
/*#__PURE__*/
__webpack_require__(144);

var _stepCatArray = {
  '@@transducer/init': Array,
  '@@transducer/step': function (xs, x) {
    xs.push(x);
    return xs;
  },
  '@@transducer/result': _identity
};
var _stepCatString = {
  '@@transducer/init': String,
  '@@transducer/step': function (a, b) {
    return a + b;
  },
  '@@transducer/result': _identity
};
var _stepCatObject = {
  '@@transducer/init': Object,
  '@@transducer/step': function (result, input) {
    return _objectAssign(result, _isArrayLike(input) ? objOf(input[0], input[1]) : input);
  },
  '@@transducer/result': _identity
};

function _stepCat(obj) {
  if (_isTransformer(obj)) {
    return obj;
  }

  if (_isArrayLike(obj)) {
    return _stepCatArray;
  }

  if (typeof obj === 'string') {
    return _stepCatString;
  }

  if (typeof obj === 'object') {
    return _stepCatObject;
  }

  throw new Error('Cannot create transformer for ' + obj);
}

module.exports = _stepCat;

/***/ }),

/***/ 5123:
/***/ ((module) => {

/**
 * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
 */
var pad = function pad(n) {
  return (n < 10 ? '0' : '') + n;
};

var _toISOString = typeof Date.prototype.toISOString === 'function' ? function _toISOString(d) {
  return d.toISOString();
} : function _toISOString(d) {
  return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + '.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
};

module.exports = _toISOString;

/***/ }),

/***/ 31136:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _includes =
/*#__PURE__*/
__webpack_require__(87243);

var _map =
/*#__PURE__*/
__webpack_require__(36692);

var _quote =
/*#__PURE__*/
__webpack_require__(76001);

var _toISOString =
/*#__PURE__*/
__webpack_require__(5123);

var keys =
/*#__PURE__*/
__webpack_require__(90368);

var reject =
/*#__PURE__*/
__webpack_require__(63266);

function _toString(x, seen) {
  var recur = function recur(y) {
    var xs = seen.concat([x]);
    return _includes(y, xs) ? '<Circular>' : _toString(y, xs);
  }; //  mapPairs :: (Object, [String]) -> [String]


  var mapPairs = function (obj, keys) {
    return _map(function (k) {
      return _quote(k) + ': ' + recur(obj[k]);
    }, keys.slice().sort());
  };

  switch (Object.prototype.toString.call(x)) {
    case '[object Arguments]':
      return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';

    case '[object Array]':
      return '[' + _map(recur, x).concat(mapPairs(x, reject(function (k) {
        return /^\d+$/.test(k);
      }, keys(x)))).join(', ') + ']';

    case '[object Boolean]':
      return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();

    case '[object Date]':
      return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ')';

    case '[object Map]':
      return 'new Map(' + recur(Array.from(x)) + ')';

    case '[object Null]':
      return 'null';

    case '[object Number]':
      return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);

    case '[object Set]':
      return 'new Set(' + recur(Array.from(x).sort()) + ')';

    case '[object String]':
      return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);

    case '[object Undefined]':
      return 'undefined';

    default:
      if (typeof x.toString === 'function') {
        var repr = x.toString();

        if (repr !== '[object Object]') {
          return repr;
        }
      }

      return '{' + mapPairs(x, keys(x)).join(', ') + '}';
  }
}

module.exports = _toString;

/***/ }),

/***/ 93703:
/***/ ((module) => {

function _xArrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    acc = xf['@@transducer/step'](acc, list[idx]);

    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }

    idx += 1;
  }

  return xf['@@transducer/result'](acc);
}

module.exports = _xArrayReduce;

/***/ }),

/***/ 89632:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _createReduce =
/*#__PURE__*/
__webpack_require__(71351);

var _xArrayReduce =
/*#__PURE__*/
__webpack_require__(93703);

var bind =
/*#__PURE__*/
__webpack_require__(63195);

function _xIterableReduce(xf, acc, iter) {
  var step = iter.next();

  while (!step.done) {
    acc = xf['@@transducer/step'](acc, step.value);

    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }

    step = iter.next();
  }

  return xf['@@transducer/result'](acc);
}

function _xMethodReduce(xf, acc, obj, methodName) {
  return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
}

var _xReduce =
/*#__PURE__*/
_createReduce(_xArrayReduce, _xMethodReduce, _xIterableReduce);

module.exports = _xReduce;

/***/ }),

/***/ 15750:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _reduced =
/*#__PURE__*/
__webpack_require__(22157);

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var XAll =
/*#__PURE__*/
function () {
  function XAll(f, xf) {
    this.xf = xf;
    this.f = f;
    this.all = true;
  }

  XAll.prototype['@@transducer/init'] = _xfBase.init;

  XAll.prototype['@@transducer/result'] = function (result) {
    if (this.all) {
      result = this.xf['@@transducer/step'](result, true);
    }

    return this.xf['@@transducer/result'](result);
  };

  XAll.prototype['@@transducer/step'] = function (result, input) {
    if (!this.f(input)) {
      this.all = false;
      result = _reduced(this.xf['@@transducer/step'](result, false));
    }

    return result;
  };

  return XAll;
}();

function _xall(f) {
  return function (xf) {
    return new XAll(f, xf);
  };
}

module.exports = _xall;

/***/ }),

/***/ 97034:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _reduced =
/*#__PURE__*/
__webpack_require__(22157);

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var XAny =
/*#__PURE__*/
function () {
  function XAny(f, xf) {
    this.xf = xf;
    this.f = f;
    this.any = false;
  }

  XAny.prototype['@@transducer/init'] = _xfBase.init;

  XAny.prototype['@@transducer/result'] = function (result) {
    if (!this.any) {
      result = this.xf['@@transducer/step'](result, false);
    }

    return this.xf['@@transducer/result'](result);
  };

  XAny.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.any = true;
      result = _reduced(this.xf['@@transducer/step'](result, true));
    }

    return result;
  };

  return XAny;
}();

function _xany(f) {
  return function (xf) {
    return new XAny(f, xf);
  };
}

module.exports = _xany;

/***/ }),

/***/ 76020:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _concat =
/*#__PURE__*/
__webpack_require__(14011);

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var XAperture =
/*#__PURE__*/
function () {
  function XAperture(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }

  XAperture.prototype['@@transducer/init'] = _xfBase.init;

  XAperture.prototype['@@transducer/result'] = function (result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };

  XAperture.prototype['@@transducer/step'] = function (result, input) {
    this.store(input);
    return this.full ? this.xf['@@transducer/step'](result, this.getCopy()) : result;
  };

  XAperture.prototype.store = function (input) {
    this.acc[this.pos] = input;
    this.pos += 1;

    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };

  XAperture.prototype.getCopy = function () {
    return _concat(Array.prototype.slice.call(this.acc, this.pos), Array.prototype.slice.call(this.acc, 0, this.pos));
  };

  return XAperture;
}();

function _xaperture(n) {
  return function (xf) {
    return new XAperture(n, xf);
  };
}

module.exports = _xaperture;

/***/ }),

/***/ 64814:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _flatCat =
/*#__PURE__*/
__webpack_require__(8530);

var _xmap =
/*#__PURE__*/
__webpack_require__(72894);

function _xchain(f) {
  return function (xf) {
    return _xmap(f)(_flatCat(xf));
  };
}

module.exports = _xchain;

/***/ }),

/***/ 41700:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var XDrop =
/*#__PURE__*/
function () {
  function XDrop(n, xf) {
    this.xf = xf;
    this.n = n;
  }

  XDrop.prototype['@@transducer/init'] = _xfBase.init;
  XDrop.prototype['@@transducer/result'] = _xfBase.result;

  XDrop.prototype['@@transducer/step'] = function (result, input) {
    if (this.n > 0) {
      this.n -= 1;
      return result;
    }

    return this.xf['@@transducer/step'](result, input);
  };

  return XDrop;
}();

function _xdrop(n) {
  return function (xf) {
    return new XDrop(n, xf);
  };
}

module.exports = _xdrop;

/***/ }),

/***/ 4534:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var XDropLast =
/*#__PURE__*/
function () {
  function XDropLast(n, xf) {
    if (n <= 0) {
      return xf;
    }

    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }

  XDropLast.prototype['@@transducer/init'] = _xfBase.init;

  XDropLast.prototype['@@transducer/result'] = function (result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };

  XDropLast.prototype['@@transducer/step'] = function (result, input) {
    if (this.full) {
      result = this.xf['@@transducer/step'](result, this.acc[this.pos]);
    }

    this.store(input);
    return result;
  };

  XDropLast.prototype.store = function (input) {
    this.acc[this.pos] = input;
    this.pos += 1;

    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };

  return XDropLast;
}();

function _xdropLast(n) {
  return function (xf) {
    return new XDropLast(n, xf);
  };
}

module.exports = _xdropLast;

/***/ }),

/***/ 34783:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var _xReduce =
/*#__PURE__*/
__webpack_require__(89632);

var XDropLastWhile =
/*#__PURE__*/
function () {
  function XDropLastWhile(fn, xf) {
    this.f = fn;
    this.retained = [];
    this.xf = xf;
  }

  XDropLastWhile.prototype['@@transducer/init'] = _xfBase.init;

  XDropLastWhile.prototype['@@transducer/result'] = function (result) {
    this.retained = null;
    return this.xf['@@transducer/result'](result);
  };

  XDropLastWhile.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.retain(result, input) : this.flush(result, input);
  };

  XDropLastWhile.prototype.flush = function (result, input) {
    result = _xReduce(this.xf, result, this.retained);
    this.retained = [];
    return this.xf['@@transducer/step'](result, input);
  };

  XDropLastWhile.prototype.retain = function (result, input) {
    this.retained.push(input);
    return result;
  };

  return XDropLastWhile;
}();

function _xdropLastWhile(fn) {
  return function (xf) {
    return new XDropLastWhile(fn, xf);
  };
}

module.exports = _xdropLastWhile;

/***/ }),

/***/ 6234:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var XDropRepeatsWith =
/*#__PURE__*/
function () {
  function XDropRepeatsWith(pred, xf) {
    this.xf = xf;
    this.pred = pred;
    this.lastValue = undefined;
    this.seenFirstValue = false;
  }

  XDropRepeatsWith.prototype['@@transducer/init'] = _xfBase.init;
  XDropRepeatsWith.prototype['@@transducer/result'] = _xfBase.result;

  XDropRepeatsWith.prototype['@@transducer/step'] = function (result, input) {
    var sameAsLast = false;

    if (!this.seenFirstValue) {
      this.seenFirstValue = true;
    } else if (this.pred(this.lastValue, input)) {
      sameAsLast = true;
    }

    this.lastValue = input;
    return sameAsLast ? result : this.xf['@@transducer/step'](result, input);
  };

  return XDropRepeatsWith;
}();

function _xdropRepeatsWith(pred) {
  return function (xf) {
    return new XDropRepeatsWith(pred, xf);
  };
}

module.exports = _xdropRepeatsWith;

/***/ }),

/***/ 1908:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var XDropWhile =
/*#__PURE__*/
function () {
  function XDropWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XDropWhile.prototype['@@transducer/init'] = _xfBase.init;
  XDropWhile.prototype['@@transducer/result'] = _xfBase.result;

  XDropWhile.prototype['@@transducer/step'] = function (result, input) {
    if (this.f) {
      if (this.f(input)) {
        return result;
      }

      this.f = null;
    }

    return this.xf['@@transducer/step'](result, input);
  };

  return XDropWhile;
}();

function _xdropWhile(f) {
  return function (xf) {
    return new XDropWhile(f, xf);
  };
}

module.exports = _xdropWhile;

/***/ }),

/***/ 93714:
/***/ ((module) => {

module.exports = {
  init: function () {
    return this.xf['@@transducer/init']();
  },
  result: function (result) {
    return this.xf['@@transducer/result'](result);
  }
};

/***/ }),

/***/ 11383:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var XFilter =
/*#__PURE__*/
function () {
  function XFilter(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XFilter.prototype['@@transducer/init'] = _xfBase.init;
  XFilter.prototype['@@transducer/result'] = _xfBase.result;

  XFilter.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
  };

  return XFilter;
}();

function _xfilter(f) {
  return function (xf) {
    return new XFilter(f, xf);
  };
}

module.exports = _xfilter;

/***/ }),

/***/ 47855:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _reduced =
/*#__PURE__*/
__webpack_require__(22157);

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var XFind =
/*#__PURE__*/
function () {
  function XFind(f, xf) {
    this.xf = xf;
    this.f = f;
    this.found = false;
  }

  XFind.prototype['@@transducer/init'] = _xfBase.init;

  XFind.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, void 0);
    }

    return this.xf['@@transducer/result'](result);
  };

  XFind.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf['@@transducer/step'](result, input));
    }

    return result;
  };

  return XFind;
}();

function _xfind(f) {
  return function (xf) {
    return new XFind(f, xf);
  };
}

module.exports = _xfind;

/***/ }),

/***/ 20834:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _reduced =
/*#__PURE__*/
__webpack_require__(22157);

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var XFindIndex =
/*#__PURE__*/
function () {
  function XFindIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.found = false;
  }

  XFindIndex.prototype['@@transducer/init'] = _xfBase.init;

  XFindIndex.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, -1);
    }

    return this.xf['@@transducer/result'](result);
  };

  XFindIndex.prototype['@@transducer/step'] = function (result, input) {
    this.idx += 1;

    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf['@@transducer/step'](result, this.idx));
    }

    return result;
  };

  return XFindIndex;
}();

function _xfindIndex(f) {
  return function (xf) {
    return new XFindIndex(f, xf);
  };
}

module.exports = _xfindIndex;

/***/ }),

/***/ 28922:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var XFindLast =
/*#__PURE__*/
function () {
  function XFindLast(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XFindLast.prototype['@@transducer/init'] = _xfBase.init;

  XFindLast.prototype['@@transducer/result'] = function (result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.last));
  };

  XFindLast.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.last = input;
    }

    return result;
  };

  return XFindLast;
}();

function _xfindLast(f) {
  return function (xf) {
    return new XFindLast(f, xf);
  };
}

module.exports = _xfindLast;

/***/ }),

/***/ 36626:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var XFindLastIndex =
/*#__PURE__*/
function () {
  function XFindLastIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.lastIdx = -1;
  }

  XFindLastIndex.prototype['@@transducer/init'] = _xfBase.init;

  XFindLastIndex.prototype['@@transducer/result'] = function (result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.lastIdx));
  };

  XFindLastIndex.prototype['@@transducer/step'] = function (result, input) {
    this.idx += 1;

    if (this.f(input)) {
      this.lastIdx = this.idx;
    }

    return result;
  };

  return XFindLastIndex;
}();

function _xfindLastIndex(f) {
  return function (xf) {
    return new XFindLastIndex(f, xf);
  };
}

module.exports = _xfindLastIndex;

/***/ }),

/***/ 72894:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var XMap =
/*#__PURE__*/
function () {
  function XMap(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XMap.prototype['@@transducer/init'] = _xfBase.init;
  XMap.prototype['@@transducer/result'] = _xfBase.result;

  XMap.prototype['@@transducer/step'] = function (result, input) {
    return this.xf['@@transducer/step'](result, this.f(input));
  };

  return XMap;
}();

var _xmap = function _xmap(f) {
  return function (xf) {
    return new XMap(f, xf);
  };
};

module.exports = _xmap;

/***/ }),

/***/ 81884:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var _promap =
/*#__PURE__*/
__webpack_require__(20475);

var XPromap =
/*#__PURE__*/
function () {
  function XPromap(f, g, xf) {
    this.xf = xf;
    this.f = f;
    this.g = g;
  }

  XPromap.prototype['@@transducer/init'] = _xfBase.init;
  XPromap.prototype['@@transducer/result'] = _xfBase.result;

  XPromap.prototype['@@transducer/step'] = function (result, input) {
    return this.xf['@@transducer/step'](result, _promap(this.f, this.g, input));
  };

  return XPromap;
}();

function _xpromap(f, g) {
  return function (xf) {
    return new XPromap(f, g, xf);
  };
}

module.exports = _xpromap;

/***/ }),

/***/ 57744:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _clone =
/*#__PURE__*/
__webpack_require__(45114);

var _has =
/*#__PURE__*/
__webpack_require__(87684);

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var XReduceBy =
/*#__PURE__*/
function () {
  function XReduceBy(valueFn, valueAcc, keyFn, xf) {
    this.valueFn = valueFn;
    this.valueAcc = valueAcc;
    this.keyFn = keyFn;
    this.xf = xf;
    this.inputs = {};
  }

  XReduceBy.prototype['@@transducer/init'] = _xfBase.init;

  XReduceBy.prototype['@@transducer/result'] = function (result) {
    var key;

    for (key in this.inputs) {
      if (_has(key, this.inputs)) {
        result = this.xf['@@transducer/step'](result, this.inputs[key]);

        if (result['@@transducer/reduced']) {
          result = result['@@transducer/value'];
          break;
        }
      }
    }

    this.inputs = null;
    return this.xf['@@transducer/result'](result);
  };

  XReduceBy.prototype['@@transducer/step'] = function (result, input) {
    var key = this.keyFn(input);
    this.inputs[key] = this.inputs[key] || [key, _clone(this.valueAcc, false)];
    this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);
    return result;
  };

  return XReduceBy;
}();

function _xreduceBy(valueFn, valueAcc, keyFn) {
  return function (xf) {
    return new XReduceBy(valueFn, valueAcc, keyFn, xf);
  };
}

module.exports = _xreduceBy;

/***/ }),

/***/ 4465:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var tInit = '@@transducer/init';
var tStep = '@@transducer/step';

var XScan =
/*#__PURE__*/
function () {
  function XScan(reducer, acc, xf) {
    this.xf = xf;
    this.f = reducer;
    this.acc = acc;
  }

  XScan.prototype[tInit] = function () {
    return this.xf[tStep](this.xf[tInit](), this.acc);
  };

  XScan.prototype['@@transducer/result'] = _xfBase.result;

  XScan.prototype[tStep] = function (result, input) {
    if (result['@@transducer/reduced']) {
      return result;
    }

    this.acc = this.f(this.acc, input);
    return this.xf[tStep](result, this.acc);
  };

  return XScan;
}();

var _xscan =
/*#__PURE__*/
_curry3(function _xscan(reducer, acc, xf) {
  return new XScan(reducer, acc, xf);
});

module.exports = _xscan;

/***/ }),

/***/ 49184:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _reduced =
/*#__PURE__*/
__webpack_require__(22157);

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var XTake =
/*#__PURE__*/
function () {
  function XTake(n, xf) {
    this.xf = xf;
    this.n = n;
    this.i = 0;
  }

  XTake.prototype['@@transducer/init'] = _xfBase.init;
  XTake.prototype['@@transducer/result'] = _xfBase.result;

  XTake.prototype['@@transducer/step'] = function (result, input) {
    this.i += 1;
    var ret = this.n === 0 ? result : this.xf['@@transducer/step'](result, input);
    return this.n >= 0 && this.i >= this.n ? _reduced(ret) : ret;
  };

  return XTake;
}();

function _xtake(n) {
  return function (xf) {
    return new XTake(n, xf);
  };
}

module.exports = _xtake;

/***/ }),

/***/ 89963:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _reduced =
/*#__PURE__*/
__webpack_require__(22157);

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var XTakeWhile =
/*#__PURE__*/
function () {
  function XTakeWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XTakeWhile.prototype['@@transducer/init'] = _xfBase.init;
  XTakeWhile.prototype['@@transducer/result'] = _xfBase.result;

  XTakeWhile.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : _reduced(result);
  };

  return XTakeWhile;
}();

function _xtakeWhile(f) {
  return function (xf) {
    return new XTakeWhile(f, xf);
  };
}

module.exports = _xtakeWhile;

/***/ }),

/***/ 59524:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var XTap =
/*#__PURE__*/
function () {
  function XTap(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XTap.prototype['@@transducer/init'] = _xfBase.init;
  XTap.prototype['@@transducer/result'] = _xfBase.result;

  XTap.prototype['@@transducer/step'] = function (result, input) {
    this.f(input);
    return this.xf['@@transducer/step'](result, input);
  };

  return XTap;
}();

function _xtap(f) {
  return function (xf) {
    return new XTap(f, xf);
  };
}

module.exports = _xtap;

/***/ }),

/***/ 17284:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _Set =
/*#__PURE__*/
__webpack_require__(8876);

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var XUniqBy =
/*#__PURE__*/
function () {
  function XUniqBy(f, xf) {
    this.xf = xf;
    this.f = f;
    this.set = new _Set();
  }

  XUniqBy.prototype['@@transducer/init'] = _xfBase.init;
  XUniqBy.prototype['@@transducer/result'] = _xfBase.result;

  XUniqBy.prototype['@@transducer/step'] = function (result, input) {
    return this.set.add(this.f(input)) ? this.xf['@@transducer/step'](result, input) : result;
  };

  return XUniqBy;
}();

function _xuniqBy(f) {
  return function (xf) {
    return new XUniqBy(f, xf);
  };
}

module.exports = _xuniqBy;

/***/ }),

/***/ 37130:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _includesWith =
/*#__PURE__*/
__webpack_require__(82976);

var _xfBase =
/*#__PURE__*/
__webpack_require__(93714);

var XUniqWith =
/*#__PURE__*/
function () {
  function XUniqWith(pred, xf) {
    this.xf = xf;
    this.pred = pred;
    this.items = [];
  }

  XUniqWith.prototype['@@transducer/init'] = _xfBase.init;
  XUniqWith.prototype['@@transducer/result'] = _xfBase.result;

  XUniqWith.prototype['@@transducer/step'] = function (result, input) {
    if (_includesWith(this.pred, input, this.items)) {
      return result;
    } else {
      this.items.push(input);
      return this.xf['@@transducer/step'](result, input);
    }
  };

  return XUniqWith;
}();

function _xuniqWith(pred) {
  return function (xf) {
    return new XUniqWith(pred, xf);
  };
}

module.exports = _xuniqWith;

/***/ }),

/***/ 39874:
/***/ ((module) => {

var XWrap =
/*#__PURE__*/
function () {
  function XWrap(fn) {
    this.f = fn;
  }

  XWrap.prototype['@@transducer/init'] = function () {
    throw new Error('init not implemented on XWrap');
  };

  XWrap.prototype['@@transducer/result'] = function (acc) {
    return acc;
  };

  XWrap.prototype['@@transducer/step'] = function (acc, x) {
    return this.f(acc, x);
  };

  return XWrap;
}();

function _xwrap(fn) {
  return new XWrap(fn);
}

module.exports = _xwrap;

/***/ }),

/***/ 26921:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _filter =
/*#__PURE__*/
__webpack_require__(34877);

var _Set =
/*#__PURE__*/
__webpack_require__(8876);

var uniq =
/*#__PURE__*/
__webpack_require__(90086);
/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The list of elements found in both `list1` and `list2`.
 * @see R.innerJoin
 * @example
 *
 *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
 */


var intersection =
/*#__PURE__*/
_curry2(function intersection(list1, list2) {
  var toKeep = new _Set();

  for (var i = 0; i < list1.length; i += 1) {
    toKeep.add(list1[i]);
  }

  return uniq(_filter(toKeep.has.bind(toKeep), list2));
});

module.exports = intersection;

/***/ }),

/***/ 72577:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _checkForMethod =
/*#__PURE__*/
__webpack_require__(73542);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Creates a new list with the separator interposed between elements.
 *
 * Dispatches to the `intersperse` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} separator The element to add to the list.
 * @param {Array} list The list to be interposed.
 * @return {Array} The new list.
 * @example
 *
 *      R.intersperse('a', ['b', 'n', 'n', 's']); //=> ['b', 'a', 'n', 'a', 'n', 'a', 's']
 */


var intersperse =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_checkForMethod('intersperse', function intersperse(separator, list) {
  var out = [];
  var idx = 0;
  var length = list.length;

  while (idx < length) {
    if (idx === length - 1) {
      out.push(list[idx]);
    } else {
      out.push(list[idx], separator);
    }

    idx += 1;
  }

  return out;
}));

module.exports = intersperse;

/***/ }),

/***/ 33795:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var _isTransformer =
/*#__PURE__*/
__webpack_require__(69082);

var _xReduce =
/*#__PURE__*/
__webpack_require__(89632);

var _stepCat =
/*#__PURE__*/
__webpack_require__(74745);
/**
 * Transforms the items of the list with the transducer and appends the
 * transformed items to the accumulator using an appropriate iterator function
 * based on the accumulator type.
 *
 * The accumulator can be an array, string, object or a transformer. Iterated
 * items will be appended to arrays and concatenated to strings. Objects will
 * be merged directly or 2-item arrays will be merged as key, value pairs.
 *
 * The accumulator can also be a transformer object that provides a 2-arity
 * reducing iterator function, step, 0-arity initial value function, init, and
 * 1-arity result extraction function result. The step function is used as the
 * iterator function in reduce. The result function is used to convert the
 * final accumulator into the return type and in most cases is R.identity. The
 * init function is used to provide the initial accumulator.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the
 * transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig a -> (b -> b) -> [c] -> a
 * @param {*} acc The initial accumulator value.
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.transduce
 * @example
 *
 *      const numbers = [1, 2, 3, 4];
 *      const transducer = R.compose(R.map(R.add(1)), R.take(2));
 *
 *      R.into([], transducer, numbers); //=> [2, 3]
 *
 *      const intoArray = R.into([]);
 *      intoArray(transducer, numbers); //=> [2, 3]
 */


var into =
/*#__PURE__*/
_curry3(function into(acc, transducer, list) {
  var xf = transducer(_isTransformer(acc) ? acc : _stepCat(acc));
  return _xReduce(xf, xf['@@transducer/init'](), list);
});

module.exports = into;

/***/ }),

/***/ 92778:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var _has =
/*#__PURE__*/
__webpack_require__(87684);

var keys =
/*#__PURE__*/
__webpack_require__(90368);
/**
 * Same as [`R.invertObj`](#invertObj), however this accounts for objects with
 * duplicate values by putting the values into an array.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: [ s, ... ]}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object with keys in an array.
 * @see R.invertObj
 * @example
 *
 *      const raceResultsByFirstName = {
 *        first: 'alice',
 *        second: 'jake',
 *        third: 'alice',
 *      };
 *      R.invert(raceResultsByFirstName);
 *      //=> { 'alice': ['first', 'third'], 'jake':['second'] }
 */


var invert =
/*#__PURE__*/
_curry1(function invert(obj) {
  var props = keys(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    var val = obj[key];
    var list = _has(val, out) ? out[val] : out[val] = [];
    list[list.length] = key;
    idx += 1;
  }

  return out;
});

module.exports = invert;

/***/ }),

/***/ 62380:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var keys =
/*#__PURE__*/
__webpack_require__(90368);
/**
 * Returns a new object with the keys of the given object as values, and the
 * values of the given object, which are coerced to strings, as keys. Note
 * that the last key found is preferred when handling the same value.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: s}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object
 * @see R.invert
 * @example
 *
 *      const raceResults = {
 *        first: 'alice',
 *        second: 'jake'
 *      };
 *      R.invertObj(raceResults);
 *      //=> { 'alice': 'first', 'jake':'second' }
 *
 *      // Alternatively:
 *      const raceResults = ['alice', 'jake'];
 *      R.invertObj(raceResults);
 *      //=> { 'alice': '0', 'jake':'1' }
 */


var invertObj =
/*#__PURE__*/
_curry1(function invertObj(obj) {
  var props = keys(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    out[obj[key]] = key;
    idx += 1;
  }

  return out;
});

module.exports = invertObj;

/***/ }),

/***/ 25189:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _isFunction =
/*#__PURE__*/
__webpack_require__(62144);

var curryN =
/*#__PURE__*/
__webpack_require__(2220);

var toString =
/*#__PURE__*/
__webpack_require__(15243);
/**
 * Given an `arity` (Number) and a `name` (String) the `invoker` function
 * returns a curried function that takes `arity` arguments and a `context`
 * object. It will "invoke" the `name`'d function (a method) on the `context`
 * object.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
 * @param {Number} arity Number of arguments the returned function should take
 *        before the target object.
 * @param {String} method Name of any of the target object's methods to call.
 * @return {Function} A new curried function.
 * @see R.construct
 * @example
 *      // A function with no arguments
 *      const asJson = invoker(0, "json")
 *      // Just like calling .then((response) => response.json())
 *      fetch("http://example.com/index.json").then(asJson)
 *
 *      // A function with one argument
 *      const sliceFrom = invoker(1, 'slice');
 *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
 *
 *      // A function with two arguments
 *      const sliceFrom6 = invoker(2, 'slice')(6);
 *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
 *
 *      // NOTE: You can't simply pass some of the arguments to the initial invoker function.
 *      const firstCreditCardSection = invoker(2, "slice", 0, 4)
 *      firstCreditCardSection("4242 4242 4242 4242") // => Function<...>
 *
 *      // Since invoker returns a curried function, you may partially apply it to create the function you need.
 *      const firstCreditCardSection = invoker(2, "slice")(0, 4)
 *      firstCreditCardSection("4242 4242 4242 4242") // => "4242"
 *
 * @symb R.invoker(0, 'method')(o) = o['method']()
 * @symb R.invoker(1, 'method')(a, o) = o['method'](a)
 * @symb R.invoker(2, 'method')(a, b, o) = o['method'](a, b)
 */


var invoker =
/*#__PURE__*/
_curry2(function invoker(arity, method) {
  return curryN(arity + 1, function () {
    var target = arguments[arity];

    if (target != null && _isFunction(target[method])) {
      return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
    }

    throw new TypeError(toString(target) + ' does not have a method named "' + method + '"');
  });
});

module.exports = invoker;

/***/ }),

/***/ 9443:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * See if an object (i.e. `val`) is an instance of the supplied constructor. This
 * function will check up the inheritance chain, if any.
 * If `val` was created using `Object.create`, `R.is(Object, val) === true`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Type
 * @sig (* -> {*}) -> a -> Boolean
 * @param {Object} ctor A constructor
 * @param {*} val The value to test
 * @return {Boolean}
 * @example
 *
 *      R.is(Object, {}); //=> true
 *      R.is(Number, 1); //=> true
 *      R.is(Object, 1); //=> false
 *      R.is(String, 's'); //=> true
 *      R.is(String, new String('')); //=> true
 *      R.is(Object, new String('')); //=> true
 *      R.is(Object, 's'); //=> false
 *      R.is(Number, {}); //=> false
 */


var is =
/*#__PURE__*/
_curry2(function is(Ctor, val) {
  return val instanceof Ctor || val != null && (val.constructor === Ctor || Ctor.name === 'Object' && typeof val === 'object');
});

module.exports = is;

/***/ }),

/***/ 42157:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var empty =
/*#__PURE__*/
__webpack_require__(8403);

var equals =
/*#__PURE__*/
__webpack_require__(51481);
/**
 * Returns `true` if the given value is its type's empty value; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> Boolean
 * @param {*} x
 * @return {Boolean}
 * @see R.empty
 * @example
 *
 *      R.isEmpty([1, 2, 3]);           //=> false
 *      R.isEmpty([]);                  //=> true
 *      R.isEmpty('');                  //=> true
 *      R.isEmpty(null);                //=> false
 *      R.isEmpty({});                  //=> true
 *      R.isEmpty({length: 0});         //=> false
 *      R.isEmpty(Uint8Array.from('')); //=> true
 */


var isEmpty =
/*#__PURE__*/
_curry1(function isEmpty(x) {
  return x != null && equals(x, empty(x));
});

module.exports = isEmpty;

/***/ }),

/***/ 13657:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);
/**
 * Checks if the input value is `null` or `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Type
 * @sig * -> Boolean
 * @param {*} x The value to test.
 * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
 * @example
 *
 *      R.isNil(null); //=> true
 *      R.isNil(undefined); //=> true
 *      R.isNil(0); //=> false
 *      R.isNil([]); //=> false
 */


var isNil =
/*#__PURE__*/
_curry1(function isNil(x) {
  return x == null;
});

module.exports = isNil;

/***/ }),

/***/ 91533:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isNil =
/*#__PURE__*/
__webpack_require__(13657);

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);
/**
 * Checks if the input value is not `null` and not `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.29.0
 * @category Type
 * @sig * -> Boolean
 * @param {*} x The value to test.
 * @return {Boolean} `true` if `x` is not `undefined` or not `null`, otherwise `false`.
 * @example
 *
 *      R.isNotNil(null); //=> false
 *      R.isNotNil(undefined); //=> false
 *      R.isNotNil(0); //=> true
 *      R.isNotNil([]); //=> true
 */


var isNotNil =
/*#__PURE__*/
_curry1(function isNotNil(x) {
  return !isNil(x);
});

module.exports = isNotNil;

/***/ }),

/***/ 18231:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var invoker =
/*#__PURE__*/
__webpack_require__(25189);
/**
 * Returns a string made by inserting the `separator` between each element and
 * concatenating all the elements into a single string.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig String -> [a] -> String
 * @param {Number|String} separator The string used to separate the elements.
 * @param {Array} xs The elements to join into a string.
 * @return {String} str The string made by concatenating `xs` with `separator`.
 * @see R.split
 * @example
 *
 *      const spacer = R.join(' ');
 *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
 *      R.join('|', [1, 2, 3]);    //=> '1|2|3'
 */


var join =
/*#__PURE__*/
invoker(1, 'join');
module.exports = join;

/***/ }),

/***/ 55389:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var converge =
/*#__PURE__*/
__webpack_require__(38907);
/**
 * juxt applies a list of functions to a list of values.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Function
 * @sig [(a, b, ..., m) -> n] -> ((a, b, ..., m) -> [n])
 * @param {Array} fns An array of functions
 * @return {Function} A function that returns a list of values after applying each of the original `fns` to its parameters.
 * @see R.applySpec
 * @example
 *
 *      const getRange = R.juxt([Math.min, Math.max]);
 *      getRange(3, 4, 9, -3); //=> [-3, 9]
 * @symb R.juxt([f, g, h])(a, b) = [f(a, b), g(a, b), h(a, b)]
 */


var juxt =
/*#__PURE__*/
_curry1(function juxt(fns) {
  return converge(function () {
    return Array.prototype.slice.call(arguments, 0);
  }, fns);
});

module.exports = juxt;

/***/ }),

/***/ 90368:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var _has =
/*#__PURE__*/
__webpack_require__(87684);

var _isArguments =
/*#__PURE__*/
__webpack_require__(97587); // cover IE < 9 keys issues


var hasEnumBug = !
/*#__PURE__*/
{
  toString: null
}.propertyIsEnumerable('toString');
var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString']; // Safari bug

var hasArgsEnumBug =
/*#__PURE__*/
function () {
  'use strict';

  return arguments.propertyIsEnumerable('length');
}();

var contains = function contains(list, item) {
  var idx = 0;

  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }

    idx += 1;
  }

  return false;
};
/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @see R.keysIn, R.values, R.toPairs
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */


var keys = typeof Object.keys === 'function' && !hasArgsEnumBug ?
/*#__PURE__*/
_curry1(function keys(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) :
/*#__PURE__*/
_curry1(function keys(obj) {
  if (Object(obj) !== obj) {
    return [];
  }

  var prop, nIdx;
  var ks = [];

  var checkArgsLength = hasArgsEnumBug && _isArguments(obj);

  for (prop in obj) {
    if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
      ks[ks.length] = prop;
    }
  }

  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;

    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];

      if (_has(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }

      nIdx -= 1;
    }
  }

  return ks;
});
module.exports = keys;

/***/ }),

/***/ 17716:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);
/**
 * Returns a list containing the names of all the properties of the supplied
 * object, including prototype properties.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own and prototype properties.
 * @see R.keys, R.valuesIn
 * @example
 *
 *      const F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      const f = new F();
 *      R.keysIn(f); //=> ['x', 'y']
 */


var keysIn =
/*#__PURE__*/
_curry1(function keysIn(obj) {
  var prop;
  var ks = [];

  for (prop in obj) {
    ks[ks.length] = prop;
  }

  return ks;
});

module.exports = keysIn;

/***/ }),

/***/ 27601:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nth =
/*#__PURE__*/
__webpack_require__(87041);
/**
 * Returns the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.init, R.head, R.tail
 * @example
 *
 *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
 *      R.last([]); //=> undefined
 *
 *      R.last('abc'); //=> 'c'
 *      R.last(''); //=> ''
 */


var last =
/*#__PURE__*/
nth(-1);
module.exports = last;

/***/ }),

/***/ 43448:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _isArray =
/*#__PURE__*/
__webpack_require__(20219);

var equals =
/*#__PURE__*/
__webpack_require__(51481);
/**
 * Returns the position of the last occurrence of an item in an array, or -1 if
 * the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.indexOf, R.findLastIndex
 * @example
 *
 *      R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
 *      R.lastIndexOf(10, [1,2,3,4]); //=> -1
 */


var lastIndexOf =
/*#__PURE__*/
_curry2(function lastIndexOf(target, xs) {
  if (typeof xs.lastIndexOf === 'function' && !_isArray(xs)) {
    return xs.lastIndexOf(target);
  } else {
    var idx = xs.length - 1;

    while (idx >= 0) {
      if (equals(xs[idx], target)) {
        return idx;
      }

      idx -= 1;
    }

    return -1;
  }
});

module.exports = lastIndexOf;

/***/ }),

/***/ 24234:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var _isNumber =
/*#__PURE__*/
__webpack_require__(58591);
/**
 * Returns the number of elements in the array by returning `list.length`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [a] -> Number
 * @param {Array} list The array to inspect.
 * @return {Number} The length of the array.
 * @example
 *
 *      R.length([]); //=> 0
 *      R.length([1, 2, 3]); //=> 3
 */


var length =
/*#__PURE__*/
_curry1(function length(list) {
  return list != null && _isNumber(list.length) ? list.length : NaN;
});

module.exports = length;

/***/ }),

/***/ 83087:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var map =
/*#__PURE__*/
__webpack_require__(61894);
/**
 * Returns a lens for the given getter and setter functions. The getter "gets"
 * the value of the focus; the setter "sets" the value of the focus. The setter
 * should not mutate the data structure.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig (s -> a) -> ((a, s) -> s) -> Lens s a
 * @param {Function} getter
 * @param {Function} setter
 * @return {Lens}
 * @see R.view, R.set, R.over, R.lensIndex, R.lensProp
 * @example
 *
 *      const xLens = R.lens(R.prop('x'), R.assoc('x'));
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */


var lens =
/*#__PURE__*/
_curry2(function lens(getter, setter) {
  return function (toFunctorFn) {
    return function (target) {
      return map(function (focus) {
        return setter(focus, target);
      }, toFunctorFn(getter(target)));
    };
  };
});

module.exports = lens;

/***/ }),

/***/ 76584:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var lens =
/*#__PURE__*/
__webpack_require__(83087);

var nth =
/*#__PURE__*/
__webpack_require__(87041);

var update =
/*#__PURE__*/
__webpack_require__(67964);
/**
 * Returns a lens whose focus is the specified index.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Number -> Lens s a
 * @param {Number} n
 * @return {Lens}
 * @see R.view, R.set, R.over, R.nth
 * @example
 *
 *      const headLens = R.lensIndex(0);
 *
 *      R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
 *      R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
 *      R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
 */


var lensIndex =
/*#__PURE__*/
_curry1(function lensIndex(n) {
  return lens(nth(n), update(n));
});

module.exports = lensIndex;

/***/ }),

/***/ 13207:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var assocPath =
/*#__PURE__*/
__webpack_require__(32423);

var lens =
/*#__PURE__*/
__webpack_require__(83087);

var path =
/*#__PURE__*/
__webpack_require__(87430);
/**
 * Returns a lens whose focus is the specified path.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @typedefn Idx = String | Int | Symbol
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig [Idx] -> Lens s a
 * @param {Array} path The path to use.
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      const xHeadYLens = R.lensPath(['x', 0, 'y']);
 *
 *      R.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> 2
 *      R.set(xHeadYLens, 1, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
 *      R.over(xHeadYLens, R.negate, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: -2, z: 3}, {y: 4, z: 5}]}
 */


var lensPath =
/*#__PURE__*/
_curry1(function lensPath(p) {
  return lens(path(p), assocPath(p));
});

module.exports = lensPath;

/***/ }),

/***/ 25677:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var assoc =
/*#__PURE__*/
__webpack_require__(66497);

var lens =
/*#__PURE__*/
__webpack_require__(83087);

var prop =
/*#__PURE__*/
__webpack_require__(52478);
/**
 * Returns a lens whose focus is the specified property.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig String -> Lens s a
 * @param {String} k
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      const xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */


var lensProp =
/*#__PURE__*/
_curry1(function lensProp(k) {
  return lens(prop(k), assoc(k));
});

module.exports = lensProp;

/***/ }),

/***/ 4041:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var liftN =
/*#__PURE__*/
__webpack_require__(1272);
/**
 * "lifts" a function of arity >= 1 so that it may "map over" a list, Function or other
 * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.liftN
 * @example
 *
 *      const madd3 = R.lift((a, b, c) => a + b + c);
 *
 *      madd3([100, 200], [30, 40], [5, 6, 7]); //=> [135, 136, 137, 145, 146, 147, 235, 236, 237, 245, 246, 247]
 *
 *      const madd5 = R.lift((a, b, c, d, e) => a + b + c + d + e);
 *
 *      madd5([10, 20], [1], [2, 3], [4], [100, 200]); //=> [117, 217, 118, 218, 127, 227, 128, 228]
 */


var lift =
/*#__PURE__*/
_curry1(function lift(fn) {
  return liftN(fn.length, fn);
});

module.exports = lift;

/***/ }),

/***/ 1272:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _arrayReduce =
/*#__PURE__*/
__webpack_require__(20854);

var ap =
/*#__PURE__*/
__webpack_require__(77693);

var curryN =
/*#__PURE__*/
__webpack_require__(2220);

var map =
/*#__PURE__*/
__webpack_require__(61894);
/**
 * "lifts" a function to be the specified arity, so that it may "map over" that
 * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig Number -> (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.lift, R.ap
 * @example
 *
 *      const madd3 = R.liftN(3, (...args) => R.sum(args));
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 */


var liftN =
/*#__PURE__*/
_curry2(function liftN(arity, fn) {
  var lifted = curryN(arity, fn);
  return curryN(arity, function () {
    return _arrayReduce(ap, map(lifted, arguments[0]), Array.prototype.slice.call(arguments, 1));
  });
});

module.exports = liftN;

/***/ }),

/***/ 97560:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Returns `true` if the first argument is less than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.gt
 * @example
 *
 *      R.lt(2, 1); //=> false
 *      R.lt(2, 2); //=> false
 *      R.lt(2, 3); //=> true
 *      R.lt('a', 'z'); //=> true
 *      R.lt('z', 'a'); //=> false
 */


var lt =
/*#__PURE__*/
_curry2(function lt(a, b) {
  return a < b;
});

module.exports = lt;

/***/ }),

/***/ 13594:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Returns `true` if the first argument is less than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.gte
 * @example
 *
 *      R.lte(2, 1); //=> false
 *      R.lte(2, 2); //=> true
 *      R.lte(2, 3); //=> true
 *      R.lte('a', 'z'); //=> true
 *      R.lte('z', 'a'); //=> false
 */


var lte =
/*#__PURE__*/
_curry2(function lte(a, b) {
  return a <= b;
});

module.exports = lte;

/***/ }),

/***/ 61894:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arrayReduce =
/*#__PURE__*/
__webpack_require__(20854);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _map =
/*#__PURE__*/
__webpack_require__(36692);

var _xmap =
/*#__PURE__*/
__webpack_require__(72894);

var curryN =
/*#__PURE__*/
__webpack_require__(2220);

var keys =
/*#__PURE__*/
__webpack_require__(90368);
/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @see R.transduce, R.addIndex, R.pluck, R.project
 * @example
 *
 *      const double = x => x * 2;
 *
 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 * @symb R.map(f, [a, b]) = [f(a), f(b)]
 * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
 * @symb R.map(f, functor_o) = functor_o.map(f)
 */


var map =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable(['fantasy-land/map', 'map'], _xmap, function map(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case '[object Function]':
      return curryN(functor.length, function () {
        return fn.call(this, functor.apply(this, arguments));
      });

    case '[object Object]':
      return _arrayReduce(function (acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, keys(functor));

    default:
      return _map(fn, functor);
  }
}));

module.exports = map;

/***/ }),

/***/ 11282:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);
/**
 * The `mapAccum` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from left to right, and returning a final value of this
 * accumulator together with the new list.
 *
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((acc, x) -> (acc, y)) -> acc -> [x] -> (acc, [y])
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.scan, R.addIndex, R.mapAccumRight
 * @example
 *
 *      const digits = ['1', '2', '3', '4'];
 *      const appender = (a, b) => [a + b, a + b];
 *
 *      R.mapAccum(appender, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
 * @symb R.mapAccum(f, a, [b, c, d]) = [
 *   f(f(f(a, b)[0], c)[0], d)[0],
 *   [
 *     f(a, b)[1],
 *     f(f(a, b)[0], c)[1],
 *     f(f(f(a, b)[0], c)[0], d)[1]
 *   ]
 * ]
 */


var mapAccum =
/*#__PURE__*/
_curry3(function mapAccum(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var tuple = [acc];

  while (idx < len) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx += 1;
  }

  return [tuple[0], result];
});

module.exports = mapAccum;

/***/ }),

/***/ 51187:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);
/**
 * The `mapAccumRight` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from right to left, and returning a final value of this
 * accumulator together with the new list.
 *
 * Similar to [`mapAccum`](#mapAccum), except moves through the input list from
 * the right to the left.
 *
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((acc, x) -> (acc, y)) -> acc -> [x] -> (acc, [y])
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.addIndex, R.mapAccum
 * @example
 *
 *      const digits = ['1', '2', '3', '4'];
 *      const appender = (a, b) => [b + a, b + a];
 *
 *      R.mapAccumRight(appender, 5, digits); //=> ['12345', ['12345', '2345', '345', '45']]
 * @symb R.mapAccumRight(f, a, [b, c, d]) = [
 *   f(f(f(a, d)[0], c)[0], b)[0],
 *   [
 *     f(a, d)[1],
 *     f(f(a, d)[0], c)[1],
 *     f(f(f(a, d)[0], c)[0], b)[1]
 *   ]
 * ]
 */


var mapAccumRight =
/*#__PURE__*/
_curry3(function mapAccumRight(fn, acc, list) {
  var idx = list.length - 1;
  var result = [];
  var tuple = [acc];

  while (idx >= 0) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx -= 1;
  }

  return [tuple[0], result];
});

module.exports = mapAccumRight;

/***/ }),

/***/ 90013:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arrayReduce =
/*#__PURE__*/
__webpack_require__(20854);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var keys =
/*#__PURE__*/
__webpack_require__(90368);
/**
 * An Object-specific version of [`map`](#map). The function is applied to three
 * arguments: *(value, key, obj)*. If only the value is significant, use
 * [`map`](#map) instead.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig ((*, String, Object) -> *) -> Object -> Object
 * @param {Function} fn
 * @param {Object} obj
 * @return {Object}
 * @see R.map
 * @example
 *
 *      const xyz = { x: 1, y: 2, z: 3 };
 *      const prependKeyAndDouble = (num, key, obj) => key + (num * 2);
 *
 *      R.mapObjIndexed(prependKeyAndDouble, xyz); //=> { x: 'x2', y: 'y4', z: 'z6' }
 */


var mapObjIndexed =
/*#__PURE__*/
_curry2(function mapObjIndexed(fn, obj) {
  return _arrayReduce(function (acc, key) {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {}, keys(obj));
});

module.exports = mapObjIndexed;

/***/ }),

/***/ 6087:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Tests a regular expression against a String. Note that this function will
 * return an empty array when there are no matches. This differs from
 * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 * which returns `null` when there are no matches.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig RegExp -> String -> [String | Undefined]
 * @param {RegExp} rx A regular expression.
 * @param {String} str The string to match against
 * @return {Array} The list of matches or empty array.
 * @see R.test
 * @example
 *
 *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
 *      R.match(/a/, 'b'); //=> []
 *      R.match(/a/, null); //=> TypeError: null does not have a method named "match"
 */


var match =
/*#__PURE__*/
_curry2(function match(rx, str) {
  return str.match(rx) || [];
});

module.exports = match;

/***/ }),

/***/ 39175:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _isInteger =
/*#__PURE__*/
__webpack_require__(37000);
/**
 * `mathMod` behaves like the modulo operator should mathematically, unlike the
 * `%` operator (and by extension, [`R.modulo`](#modulo)). So while
 * `-17 % 5` is `-2`, `mathMod(-17, 5)` is `3`. `mathMod` requires Integer
 * arguments, and returns NaN when the modulus is zero or negative.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} m The dividend.
 * @param {Number} p the modulus.
 * @return {Number} The result of `b mod a`.
 * @see R.modulo
 * @example
 *
 *      R.mathMod(-17, 5);  //=> 3
 *      R.mathMod(17, 5);   //=> 2
 *      R.mathMod(17, -5);  //=> NaN
 *      R.mathMod(17, 0);   //=> NaN
 *      R.mathMod(17.2, 5); //=> NaN
 *      R.mathMod(17, 5.3); //=> NaN
 *
 *      const clock = R.mathMod(R.__, 12);
 *      clock(15); //=> 3
 *      clock(24); //=> 0
 *
 *      const seventeenMod = R.mathMod(17);
 *      seventeenMod(3);  //=> 2
 *      seventeenMod(4);  //=> 1
 *      seventeenMod(10); //=> 7
 */


var mathMod =
/*#__PURE__*/
_curry2(function mathMod(m, p) {
  if (!_isInteger(m)) {
    return NaN;
  }

  if (!_isInteger(p) || p < 1) {
    return NaN;
  }

  return (m % p + p) % p;
});

module.exports = mathMod;

/***/ }),

/***/ 21186:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var toString =
/*#__PURE__*/
__webpack_require__(15243);
/**
 * Returns the larger of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.maxBy, R.min
 * @example
 *
 *      R.max(789, 123); //=> 789
 *      R.max('a', 'b'); //=> 'b'
 */


var max =
/*#__PURE__*/
_curry2(function max(a, b) {
  if (a === b) {
    return b;
  }

  function safeMax(x, y) {
    if (x > y !== y > x) {
      return y > x ? y : x;
    }

    return undefined;
  }

  var maxByValue = safeMax(a, b);

  if (maxByValue !== undefined) {
    return maxByValue;
  }

  var maxByType = safeMax(typeof a, typeof b);

  if (maxByType !== undefined) {
    return maxByType === typeof a ? a : b;
  }

  var stringA = toString(a);
  var maxByStringValue = safeMax(stringA, toString(b));

  if (maxByStringValue !== undefined) {
    return maxByStringValue === stringA ? a : b;
  }

  return b;
});

module.exports = max;

/***/ }),

/***/ 91121:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var max =
/*#__PURE__*/
__webpack_require__(21186);
/**
 * Takes a function and two values, and returns whichever value produces the
 * larger result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.max, R.minBy
 * @example
 *
 *      //  square :: Number -> Number
 *      const square = n => n * n;
 *
 *      R.maxBy(square, -3, 2); //=> -3
 *
 *      R.reduce(R.maxBy(square), 0, [3, -5, 4, 1, -2]); //=> -5
 *      R.reduce(R.maxBy(square), 0, []); //=> 0
 */


var maxBy =
/*#__PURE__*/
_curry3(function maxBy(f, a, b) {
  var resultB = f(b);
  return max(f(a), resultB) === resultB ? b : a;
});

module.exports = maxBy;

/***/ }),

/***/ 70182:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var sum =
/*#__PURE__*/
__webpack_require__(36945);
/**
 * Returns the mean of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @see R.median
 * @example
 *
 *      R.mean([2, 7, 9]); //=> 6
 *      R.mean([]); //=> NaN
 */


var mean =
/*#__PURE__*/
_curry1(function mean(list) {
  return sum(list) / list.length;
});

module.exports = mean;

/***/ }),

/***/ 98442:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var mean =
/*#__PURE__*/
__webpack_require__(70182);
/**
 * Returns the median of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @see R.mean
 * @example
 *
 *      R.median([2, 9, 7]); //=> 7
 *      R.median([7, 2, 10, 9]); //=> 8
 *      R.median([]); //=> NaN
 */


var median =
/*#__PURE__*/
_curry1(function median(list) {
  var len = list.length;

  if (len === 0) {
    return NaN;
  }

  var width = 2 - len % 2;
  var idx = (len - width) / 2;
  return mean(Array.prototype.slice.call(list, 0).sort(function (a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }).slice(idx, idx + width));
});

module.exports = median;

/***/ }),

/***/ 37365:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arity =
/*#__PURE__*/
__webpack_require__(7455);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _has =
/*#__PURE__*/
__webpack_require__(87684);
/**
 * Takes a string-returning function `keyGen` and a function `fn` and returns
 * a new function that returns cached results for subsequent
 * calls with the same arguments.
 *
 * When the function is invoked, `keyGen` is applied to the same arguments
 * and its result becomes the cache key. If the cache contains something
 * under that key, the function simply returns it and does not invoke `fn` at all.
 *
 * Otherwise `fn` is applied to the same arguments and its return value
 * is cached under that key and returned by the function.
 *
 * Care must be taken when implementing `keyGen` to avoid key collision,
 * or if tracking references, memory leaks and mutating arguments.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (*... -> String) -> (*... -> a) -> (*... -> a)
 * @param {Function} keyGen The function to generate the cache key.
 * @param {Function} fn The function to memoize.
 * @return {Function} Memoized version of `fn`.
 * @example
 *      const withAge = memoizeWith(o => `${o.birth}/${o.death}`, ({birth, death}) => {
 *      //                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^  ^^^^^^^^^^^^^^^^^^^^^
 *      //                          keyGen                        fn
 *        console.log(`computing age for ${birth}/${death}`);
 *        return ({birth, death, age: death - birth});
 *      });
 *
 *      withAge({birth: 1921, death: 1999});
 *      //=> LOG: computing age for 1921/1999
 *      //=> {birth: 1921, death: 1999, age: 78} (returned from fn)
 *
 *      withAge({birth: 1921, death: 1999});
 *      //=> {birth: 1921, death: 1999, age: 78} (returned from cache)
 */


var memoizeWith =
/*#__PURE__*/
_curry2(function memoizeWith(keyGen, fn) {
  var cache = {};
  return _arity(fn.length, function () {
    var key = keyGen.apply(this, arguments);

    if (!_has(key, cache)) {
      cache[key] = fn.apply(this, arguments);
    }

    return cache[key];
  });
});

module.exports = memoizeWith;

/***/ }),

/***/ 51493:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _objectAssign =
/*#__PURE__*/
__webpack_require__(4778);

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);
/**
 * Creates one new object with the own properties from a list of objects.
 * If a key exists in more than one object, the value from the last
 * object it exists in will be used.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig [{k: v}] -> {k: v}
 * @param {Array} list An array of objects
 * @return {Object} A merged object.
 * @see R.reduce
 * @example
 *
 *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
 *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
 * @symb R.mergeAll([{ x: 1 }, { y: 2 }, { z: 3 }]) = { x: 1, y: 2, z: 3 }
 */


var mergeAll =
/*#__PURE__*/
_curry1(function mergeAll(list) {
  return _objectAssign.apply(null, [{}].concat(list));
});

module.exports = mergeAll;

/***/ }),

/***/ 88576:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var mergeDeepWithKey =
/*#__PURE__*/
__webpack_require__(39036);
/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the first object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepRight, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepLeft({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                      { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 10, contact: { email: 'moo@example.com' }}
 */


var mergeDeepLeft =
/*#__PURE__*/
_curry2(function mergeDeepLeft(lObj, rObj) {
  return mergeDeepWithKey(function (k, lVal, rVal) {
    return lVal;
  }, lObj, rObj);
});

module.exports = mergeDeepLeft;

/***/ }),

/***/ 57046:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var mergeDeepWithKey =
/*#__PURE__*/
__webpack_require__(39036);
/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepLeft, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepRight({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                       { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 40, contact: { email: 'baa@example.com' }}
 */


var mergeDeepRight =
/*#__PURE__*/
_curry2(function mergeDeepRight(lObj, rObj) {
  return mergeDeepWithKey(function (k, lVal, rVal) {
    return rVal;
  }, lObj, rObj);
});

module.exports = mergeDeepRight;

/***/ }),

/***/ 71334:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var mergeDeepWithKey =
/*#__PURE__*/
__webpack_require__(39036);
/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to associated values using the
 *   resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepWith(R.concat,
 *                      { a: true, c: { values: [10, 20] }},
 *                      { b: true, c: { values: [15, 35] }});
 *      //=> { a: true, b: true, c: { values: [10, 20, 15, 35] }}
 */


var mergeDeepWith =
/*#__PURE__*/
_curry3(function mergeDeepWith(fn, lObj, rObj) {
  return mergeDeepWithKey(function (k, lVal, rVal) {
    return fn(lVal, rVal);
  }, lObj, rObj);
});

module.exports = mergeDeepWith;

/***/ }),

/***/ 39036:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var _isObject =
/*#__PURE__*/
__webpack_require__(8291);

var mergeWithKey =
/*#__PURE__*/
__webpack_require__(56027);
/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to the key and associated values
 *   using the resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWithKey, R.mergeDeepWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeDeepWithKey(concatValues,
 *                         { a: true, c: { thing: 'foo', values: [10, 20] }},
 *                         { b: true, c: { thing: 'bar', values: [15, 35] }});
 *      //=> { a: true, b: true, c: { thing: 'bar', values: [10, 20, 15, 35] }}
 */


var mergeDeepWithKey =
/*#__PURE__*/
_curry3(function mergeDeepWithKey(fn, lObj, rObj) {
  return mergeWithKey(function (k, lVal, rVal) {
    if (_isObject(lVal) && _isObject(rVal)) {
      return mergeDeepWithKey(fn, lVal, rVal);
    } else {
      return fn(k, lVal, rVal);
    }
  }, lObj, rObj);
});

module.exports = mergeDeepWithKey;

/***/ }),

/***/ 55765:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _objectAssign =
/*#__PURE__*/
__webpack_require__(4778);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the first object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeRight, R.mergeDeepLeft, R.mergeWith, R.mergeWithKey
 * @example
 *
 *      R.mergeLeft({ 'age': 40 }, { 'name': 'fred', 'age': 10 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      const resetToDefault = R.mergeLeft({x: 0});
 *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
 * @symb R.mergeLeft(a, b) = {...b, ...a}
 */


var mergeLeft =
/*#__PURE__*/
_curry2(function mergeLeft(l, r) {
  return _objectAssign({}, r, l);
});

module.exports = mergeLeft;

/***/ }),

/***/ 79821:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _objectAssign =
/*#__PURE__*/
__webpack_require__(4778);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeLeft, R.mergeDeepRight, R.mergeWith, R.mergeWithKey
 * @example
 *
 *      R.mergeRight({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      const withDefaults = R.mergeRight({x: 0, y: 0});
 *      withDefaults({y: 2}); //=> {x: 0, y: 2}
 * @symb R.mergeRight(a, b) = {...a, ...b}
 */


var mergeRight =
/*#__PURE__*/
_curry2(function mergeRight(l, r) {
  return _objectAssign({}, l, r);
});

module.exports = mergeRight;

/***/ }),

/***/ 71008:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var mergeWithKey =
/*#__PURE__*/
__webpack_require__(56027);
/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the values
 * associated with the key in each object, with the result being used as the
 * value associated with the key in the returned object.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepWith, R.merge, R.mergeWithKey
 * @example
 *
 *      R.mergeWith(R.concat,
 *                  { a: true, values: [10, 20] },
 *                  { b: true, values: [15, 35] });
 *      //=> { a: true, b: true, values: [10, 20, 15, 35] }
 */


var mergeWith =
/*#__PURE__*/
_curry3(function mergeWith(fn, l, r) {
  return mergeWithKey(function (_, _l, _r) {
    return fn(_l, _r);
  }, l, r);
});

module.exports = mergeWith;

/***/ }),

/***/ 56027:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var _has =
/*#__PURE__*/
__webpack_require__(87684);
/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the key
 * and the values associated with the key in each object, with the result being
 * used as the value associated with the key in the returned object.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepWithKey, R.merge, R.mergeWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeWithKey(concatValues,
 *                     { a: true, thing: 'foo', values: [10, 20] },
 *                     { b: true, thing: 'bar', values: [15, 35] });
 *      //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
 * @symb R.mergeWithKey(f, { x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: f('y', 2, 5), z: 3 }
 */


var mergeWithKey =
/*#__PURE__*/
_curry3(function mergeWithKey(fn, l, r) {
  var result = {};
  var k;
  l = l || {};
  r = r || {};

  for (k in l) {
    if (_has(k, l)) {
      result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
    }
  }

  for (k in r) {
    if (_has(k, r) && !_has(k, result)) {
      result[k] = r[k];
    }
  }

  return result;
});

module.exports = mergeWithKey;

/***/ }),

/***/ 25624:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var toString =
/*#__PURE__*/
__webpack_require__(15243);
/**
 * Returns the smaller of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.minBy, R.max
 * @example
 *
 *      R.min(789, 123); //=> 123
 *      R.min('a', 'b'); //=> 'a'
 */


var min =
/*#__PURE__*/
_curry2(function min(a, b) {
  if (a === b) {
    return a;
  }

  function safeMin(x, y) {
    if (x < y !== y < x) {
      return y < x ? y : x;
    }

    return undefined;
  }

  var minByValue = safeMin(a, b);

  if (minByValue !== undefined) {
    return minByValue;
  }

  var minByType = safeMin(typeof a, typeof b);

  if (minByType !== undefined) {
    return minByType === typeof a ? a : b;
  }

  var stringA = toString(a);
  var minByStringValue = safeMin(stringA, toString(b));

  if (minByStringValue !== undefined) {
    return minByStringValue === stringA ? a : b;
  }

  return a;
});

module.exports = min;

/***/ }),

/***/ 72121:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var min =
/*#__PURE__*/
__webpack_require__(25624);
/**
 * Takes a function and two values, and returns whichever value produces the
 * smaller result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.min, R.maxBy
 * @example
 *
 *      //  square :: Number -> Number
 *      const square = n => n * n;
 *
 *      R.minBy(square, -3, 2); //=> 2
 *
 *      R.reduce(R.minBy(square), Infinity, [3, -5, 4, 1, -2]); //=> 1
 *      R.reduce(R.minBy(square), Infinity, []); //=> Infinity
 */


var minBy =
/*#__PURE__*/
_curry3(function minBy(f, a, b) {
  var resultB = f(b);
  return min(f(a), resultB) === resultB ? b : a;
});

module.exports = minBy;

/***/ }),

/***/ 11576:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var modifyPath =
/*#__PURE__*/
__webpack_require__(62514);
/**
 * Creates a copy of the passed object by applying an `fn` function to the given `prop` property.
 *
 * The function will not be invoked, and the object will not change
 * if its corresponding property does not exist in the object.
 * All non-primitive properties are copied to the new object by reference.
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category Object
 * @sig Idx -> (v -> v) -> {k: v} -> {k: v}
 * @param {String|Number} prop The property to be modified.
 * @param {Function} fn The function to apply to the property.
 * @param {Object} object The object to be transformed.
 * @return {Object} The transformed object.
 * @example
 *
 *      const person = {name: 'James', age: 20, pets: ['dog', 'cat']};
 *      R.modify('age', R.add(1), person); //=> {name: 'James', age: 21, pets: ['dog', 'cat']}
 *      R.modify('pets', R.append('turtle'), person); //=> {name: 'James', age: 20, pets: ['dog', 'cat', 'turtle']}
 */


var modify =
/*#__PURE__*/
_curry3(function modify(prop, fn, object) {
  return modifyPath([prop], fn, object);
});

module.exports = modify;

/***/ }),

/***/ 62514:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var _isArray =
/*#__PURE__*/
__webpack_require__(20219);

var _isObject =
/*#__PURE__*/
__webpack_require__(8291);

var _has =
/*#__PURE__*/
__webpack_require__(87684);

var _assoc =
/*#__PURE__*/
__webpack_require__(17031);

var _modify =
/*#__PURE__*/
__webpack_require__(54693);
/**
 * Creates a shallow clone of the passed object by applying an `fn` function
 * to the value at the given path.
 *
 * The function will not be invoked, and the object will not change
 * if its corresponding path does not exist in the object.
 * All non-primitive properties are copied to the new object by reference.
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category Object
 * @sig [Idx] -> (v -> v) -> {k: v} -> {k: v}
 * @param {Array} path The path to be modified.
 * @param {Function} fn The function to apply to the path.
 * @param {Object} object The object to be transformed.
 * @return {Object} The transformed object.
 * @example
 *
 *      const person = {name: 'James', address: { zipCode: '90216' }};
 *      R.modifyPath(['address', 'zipCode'], R.reverse, person); //=> {name: 'James', address: { zipCode: '61209' }}
 *
 *      // Can handle arrays too
 *      const person = {name: 'James', addresses: [{ zipCode: '90216' }]};
 *      R.modifyPath(['addresses', 0, 'zipCode'], R.reverse, person); //=> {name: 'James', addresses: [{ zipCode: '61209' }]}
 */


var modifyPath =
/*#__PURE__*/
_curry3(function modifyPath(path, fn, object) {
  if (!_isObject(object) && !_isArray(object) || path.length === 0) {
    return object;
  }

  var idx = path[0];

  if (!_has(idx, object)) {
    return object;
  }

  if (path.length === 1) {
    return _modify(idx, fn, object);
  }

  var val = modifyPath(Array.prototype.slice.call(path, 1), fn, object[idx]);

  if (val === object[idx]) {
    return object;
  }

  return _assoc(idx, val, object);
});

module.exports = modifyPath;

/***/ }),

/***/ 52395:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Divides the first parameter by the second and returns the remainder. Note
 * that this function preserves the JavaScript-style behavior for modulo. For
 * mathematical modulo see [`mathMod`](#mathMod).
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The value to the divide.
 * @param {Number} b The pseudo-modulus
 * @return {Number} The result of `b % a`.
 * @see R.mathMod
 * @example
 *
 *      R.modulo(17, 3); //=> 2
 *      // JS behavior:
 *      R.modulo(-17, 3); //=> -2
 *      R.modulo(17, -3); //=> 2
 *
 *      const isOdd = R.modulo(R.__, 2);
 *      isOdd(42); //=> 0
 *      isOdd(21); //=> 1
 */


var modulo =
/*#__PURE__*/
_curry2(function modulo(a, b) {
  return a % b;
});

module.exports = modulo;

/***/ }),

/***/ 74322:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);
/**
 * Move an item, at index `from`, to index `to`, in a list of elements.
 * A new list will be created containing the new elements order.
 *
 * @func
 * @memberOf R
 * @since v0.27.1
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} from The source index
 * @param {Number} to The destination index
 * @param {Array} list The list which will serve to realise the move
 * @return {Array} The new list reordered
 * @example
 *
 *      R.move(0, 2, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['b', 'c', 'a', 'd', 'e', 'f']
 *      R.move(-1, 0, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['f', 'a', 'b', 'c', 'd', 'e'] list rotation
 */


var move =
/*#__PURE__*/
_curry3(function (from, to, list) {
  var length = list.length;
  var result = list.slice();
  var positiveFrom = from < 0 ? length + from : from;
  var positiveTo = to < 0 ? length + to : to;
  var item = result.splice(positiveFrom, 1);
  return positiveFrom < 0 || positiveFrom >= list.length || positiveTo < 0 || positiveTo >= list.length ? list : [].concat(result.slice(0, positiveTo)).concat(item).concat(result.slice(positiveTo, list.length));
});

module.exports = move;

/***/ }),

/***/ 1102:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Multiplies two numbers. Equivalent to `a * b` but curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a * b`.
 * @see R.divide
 * @example
 *
 *      const double = R.multiply(2);
 *      const triple = R.multiply(3);
 *      double(3);       //=>  6
 *      triple(4);       //=> 12
 *      R.multiply(2, 5);  //=> 10
 */


var multiply =
/*#__PURE__*/
_curry2(function multiply(a, b) {
  return a * b;
});

module.exports = multiply;

/***/ }),

/***/ 40864:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly `n` parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} n The desired arity of the new function.
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity `n`.
 * @see R.binary, R.unary
 * @example
 *
 *      const takesTwoArgs = (a, b) => [a, b];
 *
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      const takesOneArg = R.nAry(1, takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only `n` arguments are passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.nAry(0, f)(a, b) = f()
 * @symb R.nAry(1, f)(a, b) = f(a)
 * @symb R.nAry(2, f)(a, b) = f(a, b)
 */


var nAry =
/*#__PURE__*/
_curry2(function nAry(n, fn) {
  switch (n) {
    case 0:
      return function () {
        return fn.call(this);
      };

    case 1:
      return function (a0) {
        return fn.call(this, a0);
      };

    case 2:
      return function (a0, a1) {
        return fn.call(this, a0, a1);
      };

    case 3:
      return function (a0, a1, a2) {
        return fn.call(this, a0, a1, a2);
      };

    case 4:
      return function (a0, a1, a2, a3) {
        return fn.call(this, a0, a1, a2, a3);
      };

    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.call(this, a0, a1, a2, a3, a4);
      };

    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.call(this, a0, a1, a2, a3, a4, a5);
      };

    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
      };

    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
      };

    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
      };

    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
      };

    default:
      throw new Error('First argument to nAry must be a non-negative integer no greater than ten');
  }
});

module.exports = nAry;

/***/ }),

/***/ 709:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);
/**
 * Negates its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number}
 * @example
 *
 *      R.negate(42); //=> -42
 */


var negate =
/*#__PURE__*/
_curry1(function negate(n) {
  return -n;
});

module.exports = negate;

/***/ }),

/***/ 79916:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _complement =
/*#__PURE__*/
__webpack_require__(48770);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var all =
/*#__PURE__*/
__webpack_require__(22626);
/**
 * Returns `true` if no elements of the list match the predicate, `false`
 * otherwise.
 *
 * Dispatches to the `all` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is not satisfied by every element, `false` otherwise.
 * @see R.all, R.any
 * @example
 *
 *      const isEven = n => n % 2 === 0;
 *      const isOdd = n => n % 2 !== 0;
 *
 *      R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true
 *      R.none(isOdd, [1, 3, 5, 7, 8, 11]); //=> false
 */


var none =
/*#__PURE__*/
_curry2(function none(fn, input) {
  return all(_complement(fn), input);
});

module.exports = none;

/***/ }),

/***/ 22184:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);
/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig * -> Boolean
 * @param {*} a any value
 * @return {Boolean} the logical inverse of passed argument.
 * @see R.complement
 * @example
 *
 *      R.not(true); //=> false
 *      R.not(false); //=> true
 *      R.not(0); //=> true
 *      R.not(1); //=> false
 */


var not =
/*#__PURE__*/
_curry1(function not(a) {
  return !a;
});

module.exports = not;

/***/ }),

/***/ 87041:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _isString =
/*#__PURE__*/
__webpack_require__(20190);
/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> a | Undefined
 * @sig Number -> String -> String
 * @param {Number} offset
 * @param {*} list
 * @return {*}
 * @example
 *
 *      const list = ['foo', 'bar', 'baz', 'quux'];
 *      R.nth(1, list); //=> 'bar'
 *      R.nth(-1, list); //=> 'quux'
 *      R.nth(-99, list); //=> undefined
 *
 *      R.nth(2, 'abc'); //=> 'c'
 *      R.nth(3, 'abc'); //=> ''
 * @symb R.nth(-1, [a, b, c]) = c
 * @symb R.nth(0, [a, b, c]) = a
 * @symb R.nth(1, [a, b, c]) = b
 */


var nth =
/*#__PURE__*/
_curry2(function nth(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return _isString(list) ? list.charAt(idx) : list[idx];
});

module.exports = nth;

/***/ }),

/***/ 33367:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var curryN =
/*#__PURE__*/
__webpack_require__(2220);

var nth =
/*#__PURE__*/
__webpack_require__(87041);
/**
 * Returns a function which returns its nth argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig Number -> *... -> *
 * @param {Number} n
 * @return {Function}
 * @example
 *
 *      R.nthArg(1)('a', 'b', 'c'); //=> 'b'
 *      R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
 * @symb R.nthArg(-1)(a, b, c) = c
 * @symb R.nthArg(0)(a, b, c) = a
 * @symb R.nthArg(1)(a, b, c) = b
 */


var nthArg =
/*#__PURE__*/
_curry1(function nthArg(n) {
  var arity = n < 0 ? 1 : n + 1;
  return curryN(arity, function () {
    return nth(n, arguments);
  });
});

module.exports = nthArg;

/***/ }),

/***/ 62809:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);
/**
 * `o` is a curried composition function that returns a unary function.
 * Like [`compose`](#compose), `o` performs right-to-left function composition.
 * Unlike [`compose`](#compose), the rightmost function passed to `o` will be
 * invoked with only one argument. Also, unlike [`compose`](#compose), `o` is
 * limited to accepting only 2 unary functions. The name o was chosen because
 * of its similarity to the mathematical composition operator ∘.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (b -> c) -> (a -> b) -> a -> c
 * @param {Function} f
 * @param {Function} g
 * @return {Function}
 * @see R.compose, R.pipe
 * @example
 *
 *      const classyGreeting = name => "The name's " + name.last + ", " + name.first + " " + name.last
 *      const yellGreeting = R.o(R.toUpper, classyGreeting);
 *      yellGreeting({first: 'James', last: 'Bond'}); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.o(R.multiply(10), R.add(10))(-4) //=> 60
 *
 * @symb R.o(f, g, x) = f(g(x))
 */


var o =
/*#__PURE__*/
_curry3(function o(f, g, x) {
  return f(g(x));
});

module.exports = o;

/***/ }),

/***/ 144:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Creates an object containing a single key:value pair.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @sig String -> a -> {String:a}
 * @param {String} key
 * @param {*} val
 * @return {Object}
 * @see R.pair
 * @example
 *
 *      const matchPhrases = R.compose(
 *        R.objOf('must'),
 *        R.map(R.objOf('match_phrase'))
 *      );
 *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
 */


var objOf =
/*#__PURE__*/
_curry2(function objOf(key, val) {
  var obj = {};
  obj[key] = val;
  return obj;
});

module.exports = objOf;

/***/ }),

/***/ 70682:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Given a constructor and a value, returns a new instance of that constructor
 * containing the value.
 *
 * Dispatches to the `fantasy-land/of` method of the constructor first (if present)
 * or to the `of` method last (if present). When neither are present, wraps the
 * value in an array.
 *
 * Note this `of` is different from the ES6 `of`; See
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig (* -> {*}) -> a -> {a}
 * @param {Object} Ctor A constructor
 * @param {*} val any value
 * @return {*} An instance of the `Ctor` wrapping `val`.
 * @example
 *
 *      R.of(Array, 42);   //=> [42]
 *      R.of(Array, [42]); //=> [[42]]
 *      R.of(Maybe, 42);   //=> Maybe.Just(42)
 */


var of =
/*#__PURE__*/
_curry2(function of(Ctor, val) {
  return typeof Ctor['fantasy-land/of'] === 'function' ? Ctor['fantasy-land/of'](val) : typeof Ctor.of === 'function' ? Ctor.of(val) : [val];
});

module.exports = of;

/***/ }),

/***/ 61584:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Returns a partial copy of an object omitting the keys specified.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [String] -> {String: *} -> {String: *}
 * @param {Array} names an array of String property names to omit from the new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with properties from `names` not on it.
 * @see R.pick
 * @example
 *
 *      R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
 */


var omit =
/*#__PURE__*/
_curry2(function omit(names, obj) {
  var result = {};
  var index = {};
  var idx = 0;
  var len = names.length;

  while (idx < len) {
    index[names[idx]] = 1;
    idx += 1;
  }

  for (var prop in obj) {
    if (!index.hasOwnProperty(prop)) {
      result[prop] = obj[prop];
    }
  }

  return result;
});

module.exports = omit;

/***/ }),

/***/ 11107:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var curryN =
/*#__PURE__*/
__webpack_require__(32738);
/**
 * Takes a binary function `f`, a unary function `g`, and two values.
 * Applies `g` to each value, then applies the result of each to `f`.
 *
 * Also known as the P combinator.
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category Function
 * @sig ((a, a) -> b) -> (c -> a) -> c -> c -> b
 * @param {Function} f a binary function
 * @param {Function} g a unary function
 * @param {any} a any value
 * @param {any} b any value
 * @return {any} The result of `f`
 * @example
 *
 *      const eqBy = R.on((a, b) => a === b);
 *      eqBy(R.prop('a'), {b:0, a:1}, {a:1}) //=> true;
 *
 *      const containsInsensitive = R.on(R.includes, R.toLower);
 *      containsInsensitive('o', 'FOO'); //=> true
 * @symb R.on(f, g, a, b) = f(g(a), g(b))
 */


var on =
/*#__PURE__*/
curryN(4, [], function on(f, g, a, b) {
  return f(g(a), g(b));
});
module.exports = on;

/***/ }),

/***/ 79487:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arity =
/*#__PURE__*/
__webpack_require__(7455);

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);
/**
 * Accepts a function `fn` and returns a function that guards invocation of
 * `fn` such that `fn` can only ever be called once, no matter how many times
 * the returned function is invoked. The first value calculated is returned in
 * subsequent invocations.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a... -> b) -> (a... -> b)
 * @param {Function} fn The function to wrap in a call-only-once wrapper.
 * @return {Function} The wrapped function.
 * @example
 *
 *      const addOneOnce = R.once(x => x + 1);
 *      addOneOnce(10); //=> 11
 *      addOneOnce(addOneOnce(50)); //=> 11
 */


var once =
/*#__PURE__*/
_curry1(function once(fn) {
  var called = false;
  var result;
  return _arity(fn.length, function () {
    if (called) {
      return result;
    }

    called = true;
    result = fn.apply(this, arguments);
    return result;
  });
});

module.exports = once;

/***/ }),

/***/ 18384:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Returns the first argument if it is truthy, otherwise the second argument.
 * Acts as the boolean `or` statement if both inputs are `Boolean`s.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any}
 * @see R.either, R.and
 * @example
 *
 *      R.or(true, true); //=> true
 *      R.or(true, false); //=> true
 *      R.or(false, true); //=> true
 *      R.or(false, false); //=> false
 */


var or =
/*#__PURE__*/
_curry2(function or(a, b) {
  return a || b;
});

module.exports = or;

/***/ }),

/***/ 37273:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _assertPromise =
/*#__PURE__*/
__webpack_require__(80649);
/**
 * Returns the result of applying the onFailure function to the value inside
 * a failed promise. This is useful for handling rejected promises
 * inside function compositions.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Function
 * @sig (e -> b) -> (Promise e a) -> (Promise e b)
 * @sig (e -> (Promise f b)) -> (Promise e a) -> (Promise f b)
 * @param {Function} onFailure The function to apply. Can return a value or a promise of a value.
 * @param {Promise} p
 * @return {Promise} The result of calling `p.then(null, onFailure)`
 * @see R.andThen
 * @example
 *
 *      const failedFetch = id => Promise.reject('bad ID');
 *      const useDefault = () => ({ firstName: 'Bob', lastName: 'Loblaw' });
 *
 *      //recoverFromFailure :: String -> Promise ({ firstName, lastName })
 *      const recoverFromFailure = R.pipe(
 *        failedFetch,
 *        R.otherwise(useDefault),
 *        R.andThen(R.pick(['firstName', 'lastName'])),
 *      );
 *      recoverFromFailure(12345).then(console.log);
 */


var otherwise =
/*#__PURE__*/
_curry2(function otherwise(f, p) {
  _assertPromise('otherwise', p);

  return p.then(null, f);
});

module.exports = otherwise;

/***/ }),

/***/ 92738:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370); // `Identity` is a functor that holds a single value, where `map` simply
// transforms the held value with the provided function.


var Identity = function (x) {
  return {
    value: x,
    map: function (f) {
      return Identity(f(x));
    }
  };
};
/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the result of applying the given function to
 * the focused value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> (a -> a) -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.view, R.set, R.lens, R.lensIndex, R.lensProp, R.lensPath
 * @example
 *
 *      const headLens = R.lensIndex(0);
 *
 *      R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
 */


var over =
/*#__PURE__*/
_curry3(function over(lens, f, x) {
  // The value returned by the getter function is first transformed with `f`,
  // then set as the value of an `Identity`. This is then mapped over with the
  // setter function of the lens.
  return lens(function (y) {
    return Identity(f(y));
  })(x).value;
});

module.exports = over;

/***/ }),

/***/ 68380:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Takes two arguments, `fst` and `snd`, and returns `[fst, snd]`.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category List
 * @sig a -> b -> (a,b)
 * @param {*} fst
 * @param {*} snd
 * @return {Array}
 * @see R.objOf, R.of
 * @example
 *
 *      R.pair('foo', 'bar'); //=> ['foo', 'bar']
 */


var pair =
/*#__PURE__*/
_curry2(function pair(fst, snd) {
  return [fst, snd];
});

module.exports = pair;

/***/ }),

/***/ 96942:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _concat =
/*#__PURE__*/
__webpack_require__(14011);

var _createPartialApplicator =
/*#__PURE__*/
__webpack_require__(57994);
/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided initially followed by the arguments provided to `g`.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [a, b, c, ...] -> ((d, e, f, ..., n) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partialRight, R.curry
 * @example
 *
 *      const multiply2 = (a, b) => a * b;
 *      const double = R.partial(multiply2, [2]);
 *      double(3); //=> 6
 *
 *      const greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      const sayHello = R.partial(greet, ['Hello']);
 *      const sayHelloToMs = R.partial(sayHello, ['Ms.']);
 *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partial(f, [a, b])(c, d) = f(a, b, c, d)
 */


var partial =
/*#__PURE__*/
_createPartialApplicator(_concat);

module.exports = partial;

/***/ }),

/***/ 72102:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var mergeDeepRight =
/*#__PURE__*/
__webpack_require__(57046);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Takes a function `f` and an object, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the object
 * provided initially merged deeply (right) with the object provided as an argument to `g`.
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category Function
 * @sig (({ a, b, c, ..., n }) -> x) -> { a, b, c, ...} -> ({ d, e, f, ..., n } -> x)
 * @param {Function} f
 * @param {Object} props
 * @return {Function}
 * @see R.partial, R.partialRight, R.curry, R.mergeDeepRight
 * @example
 *
 *      const multiply2 = ({ a, b }) => a * b;
 *      const double = R.partialObject(multiply2, { a: 2 });
 *      double({ b: 2 }); //=> 4
 *
 *      const greet = ({ salutation, title, firstName, lastName }) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      const sayHello = R.partialObject(greet, { salutation: 'Hello' });
 *      const sayHelloToMs = R.partialObject(sayHello, { title: 'Ms.' });
 *      sayHelloToMs({ firstName: 'Jane', lastName: 'Jones' }); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partialObject(f, { a, b })({ c, d }) = f({ a, b, c, d })
 */


var partialObject =
/*#__PURE__*/
_curry2((f, o) => props => f.call(this, mergeDeepRight(o, props)));

module.exports = partialObject;

/***/ }),

/***/ 69025:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _concat =
/*#__PURE__*/
__webpack_require__(14011);

var _createPartialApplicator =
/*#__PURE__*/
__webpack_require__(57994);

var flip =
/*#__PURE__*/
__webpack_require__(9134);
/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided to `g` followed by the arguments provided initially.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [d, e, f, ..., n] -> ((a, b, c, ...) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partial
 * @example
 *
 *      const greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      const greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
 *
 *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partialRight(f, [a, b])(c, d) = f(c, d, a, b)
 */


var partialRight =
/*#__PURE__*/
_createPartialApplicator(
/*#__PURE__*/
flip(_concat));

module.exports = partialRight;

/***/ }),

/***/ 38135:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var filter =
/*#__PURE__*/
__webpack_require__(51383);

var juxt =
/*#__PURE__*/
__webpack_require__(55389);

var reject =
/*#__PURE__*/
__webpack_require__(63266);
/**
 * Takes a predicate and a list or other `Filterable` object and returns the
 * pair of filterable objects of the same type of elements which do and do not
 * satisfy, the predicate, respectively. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> [f a, f a]
 * @param {Function} pred A predicate to determine which side the element belongs to.
 * @param {Array} filterable the list (or other filterable) to partition.
 * @return {Array} An array, containing first the subset of elements that satisfy the
 *         predicate, and second the subset of elements that do not satisfy.
 * @see R.filter, R.reject
 * @example
 *
 *      R.partition(R.includes('s'), ['sss', 'ttt', 'foo', 'bars']);
 *      // => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
 *
 *      R.partition(R.includes('s'), { a: 'sss', b: 'ttt', foo: 'bars' });
 *      // => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
 */


var partition =
/*#__PURE__*/
juxt([filter, reject]);
module.exports = partition;

/***/ }),

/***/ 87430:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var paths =
/*#__PURE__*/
__webpack_require__(84439);
/**
 * Retrieves the value at a given path. The nodes of the path can be arbitrary strings or non-negative integers.
 * For anything else, the value is unspecified. Integer paths are meant to index arrays, strings are meant for objects.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @typedefn Idx = String | Int | Symbol
 * @sig [Idx] -> {a} -> a | Undefined
 * @sig Idx = String | NonNegativeInt
 * @param {Array} path The path to use.
 * @param {Object} obj The object or array to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @see R.prop, R.nth, R.assocPath, R.dissocPath
 * @example
 *
 *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 *      R.path(['a', 'b', 0], {a: {b: [1, 2, 3]}}); //=> 1
 *      R.path(['a', 'b', -2], {a: {b: [1, 2, 3]}}); //=> 2
 *      R.path([2], {'2': 2}); //=> 2
 *      R.path([-2], {'-2': 'a'}); //=> undefined
 */


var path =
/*#__PURE__*/
_curry2(function path(pathAr, obj) {
  return paths([pathAr], obj)[0];
});

module.exports = path;

/***/ }),

/***/ 40437:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var equals =
/*#__PURE__*/
__webpack_require__(51481);

var path =
/*#__PURE__*/
__webpack_require__(87430);
/**
 * Determines whether a nested path on an object has a specific value, in
 * [`R.equals`](#equals) terms. Most likely used to filter a list.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Relation
 * @typedefn Idx = String | Int | Symbol
 * @sig a -> [Idx] -> {a} -> Boolean
 * @param {*} val The value to compare the nested property with
 * @param {Array} path The path of the nested property to use
 * @param {Object} obj The object to check the nested property in
 * @return {Boolean} `true` if the value equals the nested object property,
 *         `false` otherwise.
 * @see R.whereEq, R.propEq, R.pathSatisfies, R.equals
 * @example
 *
 *      const user1 = { address: { zipCode: 90210 } };
 *      const user2 = { address: { zipCode: 55555 } };
 *      const user3 = { name: 'Bob' };
 *      const users = [ user1, user2, user3 ];
 *      const isFamous = R.pathEq(90210, ['address', 'zipCode']);
 *      R.filter(isFamous, users); //=> [ user1 ]
 */


var pathEq =
/*#__PURE__*/
_curry3(function pathEq(val, _path, obj) {
  return equals(path(_path, obj), val);
});

module.exports = pathEq;

/***/ }),

/***/ 54782:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var defaultTo =
/*#__PURE__*/
__webpack_require__(52892);

var path =
/*#__PURE__*/
__webpack_require__(87430);
/**
 * If the given, non-null object has a value at the given path, returns the
 * value at that path. Otherwise returns the provided default value.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @typedefn Idx = String | Int | Symbol
 * @sig a -> [Idx] -> {a} -> a
 * @param {*} d The default value.
 * @param {Array} p The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path` of the supplied object or the default value.
 * @example
 *
 *      R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
 */


var pathOr =
/*#__PURE__*/
_curry3(function pathOr(d, p, obj) {
  return defaultTo(d, path(p, obj));
});

module.exports = pathOr;

/***/ }),

/***/ 4991:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var path =
/*#__PURE__*/
__webpack_require__(87430);
/**
 * Returns `true` if the specified object property at given path satisfies the
 * given predicate; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Logic
 * @typedefn Idx = String | Int | Symbol
 * @sig (a -> Boolean) -> [Idx] -> {a} -> Boolean
 * @param {Function} pred
 * @param {Array} propPath
 * @param {*} obj
 * @return {Boolean}
 * @see R.propSatisfies, R.path
 * @example
 *
 *      R.pathSatisfies(y => y > 0, ['x', 'y'], {x: {y: 2}}); //=> true
 *      R.pathSatisfies(R.is(Object), [], {x: {y: 2}}); //=> true
 */


var pathSatisfies =
/*#__PURE__*/
_curry3(function pathSatisfies(pred, propPath, obj) {
  return pred(path(propPath, obj));
});

module.exports = pathSatisfies;

/***/ }),

/***/ 84439:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _isInteger =
/*#__PURE__*/
__webpack_require__(37000);

var nth =
/*#__PURE__*/
__webpack_require__(87041);
/**
 * Retrieves the values at given paths of an object.
 *
 * @func
 * @memberOf R
 * @since v0.27.1
 * @category Object
 * @typedefn Idx = [String | Int | Symbol]
 * @sig [Idx] -> {a} -> [a | Undefined]
 * @param {Array} pathsArray The array of paths to be fetched.
 * @param {Object} obj The object to retrieve the nested properties from.
 * @return {Array} A list consisting of values at paths specified by "pathsArray".
 * @see R.path
 * @example
 *
 *      R.paths([['a', 'b'], ['p', 0, 'q']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, 3]
 *      R.paths([['a', 'b'], ['p', 'r']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, undefined]
 */


var paths =
/*#__PURE__*/
_curry2(function paths(pathsArray, obj) {
  return pathsArray.map(function (paths) {
    var val = obj;
    var idx = 0;
    var p;

    while (idx < paths.length) {
      if (val == null) {
        return;
      }

      p = paths[idx];
      val = _isInteger(p) ? nth(p, val) : val[p];
      idx += 1;
    }

    return val;
  });
});

module.exports = paths;

/***/ }),

/***/ 5206:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Returns a partial copy of an object containing only the keys specified. If
 * the key does not exist, the property is ignored.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.omit, R.props
 * @example
 *
 *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
 */


var pick =
/*#__PURE__*/
_curry2(function pick(names, obj) {
  var result = {};
  var idx = 0;

  while (idx < names.length) {
    if (names[idx] in obj) {
      result[names[idx]] = obj[names[idx]];
    }

    idx += 1;
  }

  return result;
});

module.exports = pick;

/***/ }),

/***/ 14286:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Similar to `pick` except that this one includes a `key: undefined` pair for
 * properties that don't exist.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.pick
 * @example
 *
 *      R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
 */


var pickAll =
/*#__PURE__*/
_curry2(function pickAll(names, obj) {
  var result = {};
  var idx = 0;
  var len = names.length;

  while (idx < len) {
    var name = names[idx];
    result[name] = obj[name];
    idx += 1;
  }

  return result;
});

module.exports = pickAll;

/***/ }),

/***/ 12964:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Returns a partial copy of an object containing only the keys that satisfy
 * the supplied predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig ((v, k) -> Boolean) -> {k: v} -> {k: v}
 * @param {Function} pred A predicate to determine whether or not a key
 *        should be included on the output object.
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties that satisfy `pred`
 *         on it.
 * @see R.pick, R.filter
 * @example
 *
 *      const isUpperCase = (val, key) => key.toUpperCase() === key;
 *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
 */


var pickBy =
/*#__PURE__*/
_curry2(function pickBy(test, obj) {
  var result = {};

  for (var prop in obj) {
    if (test(obj[prop], prop, obj)) {
      result[prop] = obj[prop];
    }
  }

  return result;
});

module.exports = pickBy;

/***/ }),

/***/ 4603:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arity =
/*#__PURE__*/
__webpack_require__(7455);

var _pipe =
/*#__PURE__*/
__webpack_require__(56015);

var reduce =
/*#__PURE__*/
__webpack_require__(20793);

var tail =
/*#__PURE__*/
__webpack_require__(43656);
/**
 * Performs left-to-right function composition. The first argument may have
 * any arity; the remaining arguments must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      const f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 * @symb R.pipe(f, g, h)(a)(b) = h(g(f(a)))(b)
 */


function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }

  return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
}

module.exports = pipe;

/***/ }),

/***/ 51446:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arity =
/*#__PURE__*/
__webpack_require__(7455);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var head =
/*#__PURE__*/
__webpack_require__(46408);

var _reduce =
/*#__PURE__*/
__webpack_require__(39488);

var tail =
/*#__PURE__*/
__webpack_require__(43656);

var identity =
/*#__PURE__*/
__webpack_require__(69105);
/**
 * Performs left-to-right function composition using transforming function. The first function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of pipeWith is not automatically curried. Transforming function is not used on the
 * first argument.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Function
 * @sig ((* -> *), [((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)]) -> ((a, b, ..., n) -> z)
 * @param {Function} transformer The transforming function
 * @param {Array} functions The functions to pipe
 * @return {Function}
 * @see R.composeWith, R.pipe
 * @example
 *
 *      const pipeWhileNotNil = R.pipeWith((f, res) => R.isNil(res) ? res : f(res));
 *      const f = pipeWhileNotNil([Math.pow, R.negate, R.inc])
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipeWith(f)([g, h, i])(...args) = f(i, f(h, g(...args)))
 */


var pipeWith =
/*#__PURE__*/
_curry2(function pipeWith(xf, list) {
  if (list.length <= 0) {
    return identity;
  }

  var headList = head(list);
  var tailList = tail(list);
  return _arity(headList.length, function () {
    return _reduce(function (result, f) {
      return xf.call(this, f, result);
    }, headList.apply(this, arguments), tailList);
  });
});

module.exports = pipeWith;

/***/ }),

/***/ 84585:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var map =
/*#__PURE__*/
__webpack_require__(61894);

var prop =
/*#__PURE__*/
__webpack_require__(52478);
/**
 * Returns a new list by plucking the same named property off all objects in
 * the list supplied.
 *
 * `pluck` will work on
 * any [functor](https://github.com/fantasyland/fantasy-land#functor) in
 * addition to arrays, as it is equivalent to `R.map(R.prop(k), f)`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => k -> f {k: v} -> f v
 * @param {Number|String} key The key name to pluck off of each object.
 * @param {Array} f The array or functor to consider.
 * @return {Array} The list of values for the given key.
 * @see R.project, R.prop, R.props
 * @example
 *
 *      var getAges = R.pluck('age');
 *      getAges([{name: 'fred', age: 29}, {name: 'wilma', age: 27}]); //=> [29, 27]
 *
 *      R.pluck(0, [[1, 2], [3, 4]]);               //=> [1, 3]
 *      R.pluck('val', {a: {val: 3}, b: {val: 5}}); //=> {a: 3, b: 5}
 * @symb R.pluck('x', [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}]) = [1, 3, 5]
 * @symb R.pluck(0, [[1, 2], [3, 4], [5, 6]]) = [1, 3, 5]
 */


var pluck =
/*#__PURE__*/
_curry2(function pluck(p, list) {
  return map(prop(p), list);
});

module.exports = pluck;

/***/ }),

/***/ 80409:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _concat =
/*#__PURE__*/
__webpack_require__(14011);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Returns a new list with the given element at the front, followed by the
 * contents of the list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The item to add to the head of the output list.
 * @param {Array} list The array to add to the tail of the output list.
 * @return {Array} A new array.
 * @see R.append
 * @example
 *
 *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
 */


var prepend =
/*#__PURE__*/
_curry2(function prepend(el, list) {
  return _concat([el], list);
});

module.exports = prepend;

/***/ }),

/***/ 18890:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var multiply =
/*#__PURE__*/
__webpack_require__(1102);

var reduce =
/*#__PURE__*/
__webpack_require__(20793);
/**
 * Multiplies together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The product of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.product([2,4,6,8,100,1]); //=> 38400
 */


var product =
/*#__PURE__*/
reduce(multiply, 1);
module.exports = product;

/***/ }),

/***/ 61391:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _map =
/*#__PURE__*/
__webpack_require__(36692);

var identity =
/*#__PURE__*/
__webpack_require__(69105);

var pickAll =
/*#__PURE__*/
__webpack_require__(14286);

var useWith =
/*#__PURE__*/
__webpack_require__(40517);
/**
 * Reasonable analog to SQL `select` statement.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @category Relation
 * @sig [k] -> [{k: v}] -> [{k: v}]
 * @param {Array} props The property names to project
 * @param {Array} objs The objects to query
 * @return {Array} An array of objects with just the `props` properties.
 * @see R.pluck, R.props, R.prop
 * @example
 *
 *      const abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
 *      const fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
 *      const kids = [abby, fred];
 *      R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
 */


var project =
/*#__PURE__*/
useWith(_map, [pickAll, identity]); // passing `identity` gives correct arity

module.exports = project;

/***/ }),

/***/ 59548:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _promap =
/*#__PURE__*/
__webpack_require__(20475);

var _xpromap =
/*#__PURE__*/
__webpack_require__(81884);
/**
 * Takes two functions as pre- and post- processors respectively for a third function,
 * i.e. `promap(f, g, h)(x) === g(h(f(x)))`.
 *
 * Dispatches to the `promap` method of the third argument, if present,
 * according to the [FantasyLand Profunctor spec](https://github.com/fantasyland/fantasy-land#profunctor).
 *
 * Acts as a transducer if a transformer is given in profunctor position.
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category Function
 * @sig (a -> b) -> (c -> d) -> (b -> c) -> (a -> d)
 * @sig Profunctor p => (a -> b) -> (c -> d) -> p b c -> p a d
 * @param {Function} f The preprocessor function, a -> b
 * @param {Function} g The postprocessor function, c -> d
 * @param {Profunctor} profunctor The profunctor instance to be promapped, e.g. b -> c
 * @return {Profunctor} The new profunctor instance, e.g. a -> d
 * @see R.transduce
 * @example
 *
 *      const decodeChar = R.promap(s => s.charCodeAt(), String.fromCharCode, R.add(-8))
 *      const decodeString = R.promap(R.split(''), R.join(''), R.map(decodeChar))
 *      decodeString("ziuli") //=> "ramda"
 *
 * @symb R.promap(f, g, h) = x => g(h(f(x)))
 * @symb R.promap(f, g, profunctor) = profunctor.promap(f, g)
 */


var promap =
/*#__PURE__*/
_curry3(
/*#__PURE__*/
_dispatchable(['fantasy-land/promap', 'promap'], _xpromap, _promap));

module.exports = promap;

/***/ }),

/***/ 52478:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _isInteger =
/*#__PURE__*/
__webpack_require__(37000);

var nth =
/*#__PURE__*/
__webpack_require__(87041);
/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @typedefn Idx = String | Int | Symbol
 * @sig Idx -> {s: a} -> a | Undefined
 * @param {String|Number} p The property name or array index
 * @param {Object} obj The object to query
 * @return {*} The value at `obj.p`.
 * @see R.path, R.props, R.pluck, R.project, R.nth
 * @example
 *
 *      R.prop('x', {x: 100}); //=> 100
 *      R.prop('x', {}); //=> undefined
 *      R.prop(0, [100]); //=> 100
 *      R.compose(R.inc, R.prop('x'))({ x: 3 }) //=> 4
 */


var prop =
/*#__PURE__*/
_curry2(function prop(p, obj) {
  if (obj == null) {
    return;
  }

  return _isInteger(p) ? nth(p, obj) : obj[p];
});

module.exports = prop;

/***/ }),

/***/ 18371:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var prop =
/*#__PURE__*/
__webpack_require__(52478);

var equals =
/*#__PURE__*/
__webpack_require__(51481);
/**
 * Returns `true` if the specified object property is equal, in
 * [`R.equals`](#equals) terms, to the given value; `false` otherwise.
 * You can test multiple properties with [`R.whereEq`](#whereEq),
 * and test nested path property with [`R.pathEq`](#pathEq).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig a -> String -> Object -> Boolean
 * @param {*} val The value to compare the property with
 * @param {String} name the specified object property's key
 * @param {*} obj The object to check the property in
 * @return {Boolean} `true` if the value equals the specified object property,
 *         `false` otherwise.
 * @see R.whereEq, R.pathEq, R.propSatisfies, R.equals
 * @example
 *
 *      const abby = {name: 'Abby', age: 7, hair: 'blond'};
 *      const fred = {name: 'Fred', age: 12, hair: 'brown'};
 *      const rusty = {name: 'Rusty', age: 10, hair: 'brown'};
 *      const alois = {name: 'Alois', age: 15, disposition: 'surly'};
 *      const kids = [abby, fred, rusty, alois];
 *      const hasBrownHair = R.propEq('brown', 'hair');
 *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
 */


var propEq =
/*#__PURE__*/
_curry3(function propEq(val, name, obj) {
  return equals(val, prop(name, obj));
});

module.exports = propEq;

/***/ }),

/***/ 58426:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var prop =
/*#__PURE__*/
__webpack_require__(52478);

var is =
/*#__PURE__*/
__webpack_require__(9443);
/**
 * Returns `true` if the specified object property is of the given type;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Type
 * @sig Type -> String -> Object -> Boolean
 * @param {Function} type
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.is, R.propSatisfies
 * @example
 *
 *      R.propIs(Number, 'x', {x: 1, y: 2});  //=> true
 *      R.propIs(Number, 'x', {x: 'foo'});    //=> false
 *      R.propIs(Number, 'x', {});            //=> false
 */


var propIs =
/*#__PURE__*/
_curry3(function propIs(type, name, obj) {
  return is(type, prop(name, obj));
});

module.exports = propIs;

/***/ }),

/***/ 53176:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var defaultTo =
/*#__PURE__*/
__webpack_require__(52892);

var prop =
/*#__PURE__*/
__webpack_require__(52478);
/**
 * Return the specified property of the given non-null object if the property
 * is present and it's value is not `null`, `undefined` or `NaN`.
 *
 * Otherwise the first argument is returned.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Object
 * @sig a -> String -> Object -> a
 * @param {*} val The default value.
 * @param {String} p The name of the property to return.
 * @param {Object} obj The object to query.
 * @return {*} The value of given property of the supplied object or the default value.
 * @example
 *
 *      const alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      const favorite = R.prop('favoriteLibrary');
 *      const favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
 *
 *      favorite(alice);  //=> undefined
 *      favoriteWithDefault(alice);  //=> 'Ramda'
 */


var propOr =
/*#__PURE__*/
_curry3(function propOr(val, p, obj) {
  return defaultTo(val, prop(p, obj));
});

module.exports = propOr;

/***/ }),

/***/ 67430:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var prop =
/*#__PURE__*/
__webpack_require__(52478);
/**
 * Returns `true` if the specified object property satisfies the given
 * predicate; `false` otherwise. You can test multiple properties with
 * [`R.where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Logic
 * @sig (a -> Boolean) -> String -> {String: a} -> Boolean
 * @param {Function} pred
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.where, R.propEq, R.propIs
 * @example
 *
 *      R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
 */


var propSatisfies =
/*#__PURE__*/
_curry3(function propSatisfies(pred, name, obj) {
  return pred(prop(name, obj));
});

module.exports = propSatisfies;

/***/ }),

/***/ 64691:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var path =
/*#__PURE__*/
__webpack_require__(87430);
/**
 * Acts as multiple `prop`: array of keys in, array of values out. Preserves
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> [v]
 * @param {Array} ps The property names to fetch
 * @param {Object} obj The object to query
 * @return {Array} The corresponding values or partially applied function.
 * @see R.prop, R.pluck, R.project
 * @example
 *
 *      R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
 *      R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
 *
 *      const fullName = R.compose(R.join(' '), R.props(['first', 'last']));
 *      fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
 */


var props =
/*#__PURE__*/
_curry2(function props(ps, obj) {
  return ps.map(function (p) {
    return path([p], obj);
  });
});

module.exports = props;

/***/ }),

/***/ 56396:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _isNumber =
/*#__PURE__*/
__webpack_require__(58591);
/**
 * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> Number -> [Number]
 * @param {Number} from The first number in the list.
 * @param {Number} to One more than the last number in the list.
 * @return {Array} The list of numbers in the set `[a, b)`.
 * @example
 *
 *      R.range(1, 5);    //=> [1, 2, 3, 4]
 *      R.range(50, 53);  //=> [50, 51, 52]
 */


var range =
/*#__PURE__*/
_curry2(function range(from, to) {
  if (!(_isNumber(from) && _isNumber(to))) {
    throw new TypeError('Both arguments to range must be numbers');
  }

  var result = [];
  var n = from;

  while (n < to) {
    result.push(n);
    n += 1;
  }

  return result;
});

module.exports = range;

/***/ }),

/***/ 20793:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var _xReduce =
/*#__PURE__*/
__webpack_require__(89632);

var _xwrap =
/*#__PURE__*/
__webpack_require__(39874);
/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 *
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Be cautious of mutating and returning the accumulator. If you reuse it across
 * invocations, it will continue to accumulate onto the same value. The general
 * recommendation is to always return a new value. If you can't do so for
 * performance reasons, then be sure to reinitialize the accumulator on each
 * invocation.
 *
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *      //          -               -10
 *      //         / \              / \
 *      //        -   4           -6   4
 *      //       / \              / \
 *      //      -   3   ==>     -3   3
 *      //     / \              / \
 *      //    -   2           -1   2
 *      //   / \              / \
 *      //  0   1            0   1
 *
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */


var reduce =
/*#__PURE__*/
_curry3(function (xf, acc, list) {
  return _xReduce(typeof xf === 'function' ? _xwrap(xf) : xf, acc, list);
});

module.exports = reduce;

/***/ }),

/***/ 44285:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _clone =
/*#__PURE__*/
__webpack_require__(45114);

var _curryN =
/*#__PURE__*/
__webpack_require__(32738);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _has =
/*#__PURE__*/
__webpack_require__(87684);

var _reduced =
/*#__PURE__*/
__webpack_require__(22157);

var _xReduce =
/*#__PURE__*/
__webpack_require__(89632);

var _xreduceBy =
/*#__PURE__*/
__webpack_require__(57744);

var _xwrap =
/*#__PURE__*/
__webpack_require__(39874);
/**
 * Groups the elements of the list according to the result of calling
 * the String-returning function `keyFn` on each element and reduces the elements
 * of each group to a single value via the reducer function `valueFn`.
 *
 * The value function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to short circuit the iteration.
 *
 * This function is basically a more general [`groupBy`](#groupBy) function.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category List
 * @sig ((a, b) -> a) -> a -> (b -> String) -> [b] -> {String: a}
 * @param {Function} valueFn The function that reduces the elements of each group to a single
 *        value. Receives two values, accumulator for a particular group and the current element.
 * @param {*} acc The (initial) accumulator value for each group.
 * @param {Function} keyFn The function that maps the list's element into a key.
 * @param {Array} list The array to group.
 * @return {Object} An object with the output of `keyFn` for keys, mapped to the output of
 *         `valueFn` for elements which produced that key when passed to `keyFn`.
 * @see R.groupBy, R.reduce, R.reduced
 * @example
 *
 *      const groupNames = (acc, {name}) => acc.concat(name)
 *      const toGrade = ({score}) =>
 *        score < 65 ? 'F' :
 *        score < 70 ? 'D' :
 *        score < 80 ? 'C' :
 *        score < 90 ? 'B' : 'A'
 *
 *      var students = [
 *        {name: 'Abby', score: 83},
 *        {name: 'Bart', score: 62},
 *        {name: 'Curt', score: 88},
 *        {name: 'Dora', score: 92},
 *      ]
 *
 *      reduceBy(groupNames, [], toGrade, students)
 *      //=> {"A": ["Dora"], "B": ["Abby", "Curt"], "F": ["Bart"]}
 */


var reduceBy =
/*#__PURE__*/
_curryN(4, [],
/*#__PURE__*/
_dispatchable([], _xreduceBy, function reduceBy(valueFn, valueAcc, keyFn, list) {
  var xf = _xwrap(function (acc, elt) {
    var key = keyFn(elt);
    var value = valueFn(_has(key, acc) ? acc[key] : _clone(valueAcc, false), elt);

    if (value && value['@@transducer/reduced']) {
      return _reduced(acc);
    }

    acc[key] = value;
    return acc;
  });

  return _xReduce(xf, {}, list);
}));

module.exports = reduceBy;

/***/ }),

/***/ 47981:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);
/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * Similar to [`reduce`](#reduce), except moves through the input list from the
 * right to the left.
 *
 * The iterator function receives two values: *(value, acc)*, while the arguments'
 * order of `reduce`'s iterator function is *(acc, value)*. `reduceRight` may use [`reduced`](#reduced)
 * to short circuit the iteration.
 *
 * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduceRight` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
 *
 * Be cautious of mutating and returning the accumulator. If you reuse it across
 * invocations, it will continue to accumulate onto the same value. The general
 * recommendation is to always return a new value. If you can't do so for
 * performance reasons, then be sure to reinitialize the accumulator on each
 * invocation.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> b) -> b -> [a] -> b
 * @param {Function} fn The iterator function. Receives two values, the current element from the array
 *        and the accumulator.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.addIndex, R.reduced
 * @example
 *
 *      R.reduceRight(R.subtract, 0, [1, 2, 3, 4]) // => (1 - (2 - (3 - (4 - 0)))) = -2
 *      //    -               -2
 *      //   / \              / \
 *      //  1   -            1   3
 *      //     / \              / \
 *      //    2   -     ==>    2  -1
 *      //       / \              / \
 *      //      3   -            3   4
 *      //         / \              / \
 *      //        4   0            4   0
 *
 * @symb R.reduceRight(f, a, [b, c, d]) = f(b, f(c, f(d, a)))
 */


var reduceRight =
/*#__PURE__*/
_curry3(function reduceRight(fn, acc, list) {
  var idx = list.length - 1;

  while (idx >= 0) {
    acc = fn(list[idx], acc);

    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }

    idx -= 1;
  }

  return acc;
});

module.exports = reduceRight;

/***/ }),

/***/ 16392:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curryN =
/*#__PURE__*/
__webpack_require__(32738);

var _xReduce =
/*#__PURE__*/
__webpack_require__(89632);

var _xwrap =
/*#__PURE__*/
__webpack_require__(39874);

var _reduced =
/*#__PURE__*/
__webpack_require__(22157);
/**
 * Like [`reduce`](#reduce), `reduceWhile` returns a single item by iterating
 * through the list, successively calling the iterator function. `reduceWhile`
 * also takes a predicate that is evaluated before each step. If the predicate
 * returns `false`, it "short-circuits" the iteration and returns the current
 * value of the accumulator. `reduceWhile` may alternatively be short-circuited
 * via [`reduced`](#reduced).
 *
 * @func
 * @memberOf R
 * @since v0.22.0
 * @category List
 * @sig ((a, b) -> Boolean) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} pred The predicate. It is passed the accumulator and the
 *        current element.
 * @param {Function} fn The iterator function. Receives two values, the
 *        accumulator and the current element.
 * @param {*} a The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced
 * @example
 *
 *      const isOdd = (acc, x) => x % 2 !== 0;
 *      const xs = [1, 3, 5, 60, 777, 800];
 *      R.reduceWhile(isOdd, R.add, 0, xs); //=> 9
 *
 *      const ys = [2, 4, 6]
 *      R.reduceWhile(isOdd, R.add, 111, ys); //=> 111
 */


var reduceWhile =
/*#__PURE__*/
_curryN(4, [], function _reduceWhile(pred, fn, a, list) {
  var xf = _xwrap(function (acc, x) {
    return pred(acc, x) ? fn(acc, x) : _reduced(acc);
  });

  return _xReduce(xf, a, list);
});

module.exports = reduceWhile;

/***/ }),

/***/ 39280:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var _reduced =
/*#__PURE__*/
__webpack_require__(22157);
/**
 * Returns a value wrapped to indicate that it is the final value of the reduce
 * and transduce functions. The returned value should be considered a black
 * box: the internal structure is not guaranteed to be stable.
 *
 * This optimization is available to the below functions:
 * - [`reduce`](#reduce)
 * - [`reduceWhile`](#reduceWhile)
 * - [`reduceBy`](#reduceBy)
 * - [`reduceRight`](#reduceRight)
 * - [`transduce`](#transduce)
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category List
 * @sig a -> *
 * @param {*} x The final value of the reduce.
 * @return {*} The wrapped value.
 * @see R.reduce, R.reduceWhile, R.reduceBy, R.reduceRight, R.transduce
 * @example
 *
 *     R.reduce(
 *       (acc, item) => item > 3 ? R.reduced(acc) : acc.concat(item),
 *       [],
 *       [1, 2, 3, 4, 5]) // [1, 2, 3]
 */


var reduced =
/*#__PURE__*/
_curry1(_reduced);

module.exports = reduced;

/***/ }),

/***/ 63266:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _complement =
/*#__PURE__*/
__webpack_require__(48770);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var filter =
/*#__PURE__*/
__webpack_require__(51383);
/**
 * The complement of [`filter`](#filter).
 *
 * Acts as a transducer if a transformer is given in list position. Filterable
 * objects include plain objects or any object that has a filter method such
 * as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.filter, R.transduce, R.addIndex
 * @example
 *
 *      const isOdd = (n) => n % 2 !== 0;
 *
 *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */


var reject =
/*#__PURE__*/
_curry2(function reject(pred, filterable) {
  return filter(_complement(pred), filterable);
});

module.exports = reject;

/***/ }),

/***/ 99072:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);
/**
 * Removes the sub-list of `list` starting at index `start` and containing
 * `count` elements. _Note that this is not destructive_: it returns a copy of
 * the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} start The position to start removing elements
 * @param {Number} count The number of elements to remove
 * @param {Array} list The list to remove from
 * @return {Array} A new Array with `count` elements from `start` removed.
 * @see R.without
 * @example
 *
 *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
 */


var remove =
/*#__PURE__*/
_curry3(function remove(start, count, list) {
  var result = Array.prototype.slice.call(list, 0);
  result.splice(start, count);
  return result;
});

module.exports = remove;

/***/ }),

/***/ 33633:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var always =
/*#__PURE__*/
__webpack_require__(54115);

var times =
/*#__PURE__*/
__webpack_require__(32250);
/**
 * Returns a fixed list of size `n` containing a specified identical value.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig a -> n -> [a]
 * @param {*} value The value to repeat.
 * @param {Number} n The desired size of the output list.
 * @return {Array} A new array containing `n` `value`s.
 * @see R.times
 * @example
 *
 *      R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
 *
 *      const obj = {};
 *      const repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
 *      repeatedObjs[0] === repeatedObjs[1]; //=> true
 * @symb R.repeat(a, 0) = []
 * @symb R.repeat(a, 1) = [a]
 * @symb R.repeat(a, 2) = [a, a]
 */


var repeat =
/*#__PURE__*/
_curry2(function repeat(value, n) {
  return times(always(value), n);
});

module.exports = repeat;

/***/ }),

/***/ 5683:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);
/**
 * Replace a substring or regex match in a string with a replacement.
 *
 * The first two parameters correspond to the parameters of the
 * `String.prototype.replace()` function, so the second parameter can also be a
 * function.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category String
 * @sig RegExp|String -> String -> String -> String
 * @param {RegExp|String} pattern A regular expression or a substring to match.
 * @param {String} replacement The string to replace the matches with.
 * @param {String} str The String to do the search and replacement in.
 * @return {String} The result.
 * @example
 *
 *      R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *      R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *
 *      // Use the "g" (global) flag to replace all occurrences:
 *      R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
 */


var replace =
/*#__PURE__*/
_curry3(function replace(regex, replacement, str) {
  return str.replace(regex, replacement);
});

module.exports = replace;

/***/ }),

/***/ 65814:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var _isString =
/*#__PURE__*/
__webpack_require__(20190);
/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */


var reverse =
/*#__PURE__*/
_curry1(function reverse(list) {
  return _isString(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
});

module.exports = reverse;

/***/ }),

/***/ 95485:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _xscan =
/*#__PURE__*/
__webpack_require__(4465);
/**
 * Scan is similar to [`reduce`](#reduce), but returns a list of successively
 * reduced values from the left.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> [a]
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {Array} A list of all intermediately reduced values.
 * @see R.reduce, R.mapAccum
 * @example
 *
 *      const numbers = [1, 2, 3, 4];
 *      const factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
 * @symb R.scan(f, a, [b, c]) = [a, f(a, b), f(f(a, b), c)]
 */


var scan =
/*#__PURE__*/
_curry3(
/*#__PURE__*/
_dispatchable([], _xscan, function scan(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [acc];

  while (idx < len) {
    acc = fn(acc, list[idx]);
    result[idx + 1] = acc;
    idx += 1;
  }

  return result;
}));

module.exports = scan;

/***/ }),

/***/ 233:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var ap =
/*#__PURE__*/
__webpack_require__(77693);

var map =
/*#__PURE__*/
__webpack_require__(61894);

var prepend =
/*#__PURE__*/
__webpack_require__(80409);

var reduceRight =
/*#__PURE__*/
__webpack_require__(47981);

var identity =
/*#__PURE__*/
__webpack_require__(50339);
/**
 * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
 * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
 * Applicative of Traversable.
 *
 * Dispatches to the `"fantasy-land/traverse"` or the `traverse` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig fantasy-land/of :: TypeRep f => f ~> a -> f a
 * @sig (Applicative f, Traversable t) => TypeRep f -> t (f a) -> f (t a)
 * @sig (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
 * @param {Object|Function} TypeRepresentative with an `of` or `fantasy-land/of` method
 * @param {*} traversable
 * @return {*}
 * @see R.traverse
 * @example
 *
 *      R.sequence(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
 *      R.sequence(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
 *
 *      R.sequence(R.of(Array), Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
 *      R.sequence(R.of(Array), Nothing());       //=> [Nothing()]
 */


var sequence =
/*#__PURE__*/
_curry2(function sequence(F, traversable) {
  var of = typeof F['fantasy-land/of'] === 'function' ? F['fantasy-land/of'] : typeof F.of === 'function' ? F.of : F;
  var TypeRep = {
    'fantasy-land/of': of
  };
  return typeof traversable['fantasy-land/traverse'] === 'function' ? traversable['fantasy-land/traverse'](TypeRep, identity) : typeof traversable.traverse === 'function' ? traversable.traverse(TypeRep, identity) : reduceRight(function (x, acc) {
    return ap(map(prepend, x), acc);
  }, of([]), traversable);
});

module.exports = sequence;

/***/ }),

/***/ 5994:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var always =
/*#__PURE__*/
__webpack_require__(54115);

var over =
/*#__PURE__*/
__webpack_require__(92738);
/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the given value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> a -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.view, R.over, R.lens, R.lensIndex, R.lensProp, R.lensPath
 * @example
 *
 *      const xLens = R.lensProp('x');
 *
 *      R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
 *      R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
 */


var set =
/*#__PURE__*/
_curry3(function set(lens, v, x) {
  return over(lens, always(v), x);
});

module.exports = set;

/***/ }),

/***/ 81753:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _checkForMethod =
/*#__PURE__*/
__webpack_require__(73542);

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);
/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */


var slice =
/*#__PURE__*/
_curry3(
/*#__PURE__*/
_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));

module.exports = slice;

/***/ }),

/***/ 36218:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Returns a copy of the list, sorted according to the comparator function,
 * which should accept two values at a time and return a negative number if the
 * first value is smaller, a positive number if it's larger, and zero if they
 * are equal. Please note that this is a **copy** of the list. It does not
 * modify the original.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, a) -> Number) -> [a] -> [a]
 * @param {Function} comparator A sorting function :: a -> b -> Int
 * @param {Array} list The list to sort
 * @return {Array} a new array with its elements sorted by the comparator function.
 * @see R.ascend, R.descend
 * @example
 *
 *      const diff = function(a, b) { return a - b; };
 *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
 */


var sort =
/*#__PURE__*/
_curry2(function sort(comparator, list) {
  return Array.prototype.slice.call(list, 0).sort(comparator);
});

module.exports = sort;

/***/ }),

/***/ 1667:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Sorts the list according to the supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord b => (a -> b) -> [a] -> [a]
 * @param {Function} fn
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted by the keys generated by `fn`.
 * @example
 *
 *      const sortByFirstItem = R.sortBy(R.prop(0));
 *      const pairs = [[-1, 1], [-2, 2], [-3, 3]];
 *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
 *
 *      const sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
 *      const alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      const bob = {
 *        name: 'Bob',
 *        age: -10
 *      };
 *      const clara = {
 *        name: 'clara',
 *        age: 314.159
 *      };
 *      const people = [clara, bob, alice];
 *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
 */


var sortBy =
/*#__PURE__*/
_curry2(function sortBy(fn, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var aa = fn(a);
    var bb = fn(b);
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });
});

module.exports = sortBy;

/***/ }),

/***/ 39153:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Sorts a list according to a list of comparators.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Relation
 * @sig [(a, a) -> Number] -> [a] -> [a]
 * @param {Array} functions A list of comparator functions.
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted according to the comarator functions.
 * @see R.ascend, R.descend
 * @example
 *
 *      const alice = {
 *        name: 'alice',
 *        age: 40
 *      };
 *      const bob = {
 *        name: 'bob',
 *        age: 30
 *      };
 *      const clara = {
 *        name: 'clara',
 *        age: 40
 *      };
 *      const people = [clara, bob, alice];
 *      const ageNameSort = R.sortWith([
 *        R.descend(R.prop('age')),
 *        R.ascend(R.prop('name'))
 *      ]);
 *      ageNameSort(people); //=> [alice, clara, bob]
 */


var sortWith =
/*#__PURE__*/
_curry2(function sortWith(fns, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var result = 0;
    var i = 0;

    while (result === 0 && i < fns.length) {
      result = fns[i](a, b);
      i += 1;
    }

    return result;
  });
});

module.exports = sortWith;

/***/ }),

/***/ 12601:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var invoker =
/*#__PURE__*/
__webpack_require__(25189);
/**
 * Splits a string into an array of strings based on the given
 * separator.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig (String | RegExp) -> String -> [String]
 * @param {String|RegExp} sep The pattern.
 * @param {String} str The string to separate into an array.
 * @return {Array} The array of strings from `str` separated by `sep`.
 * @see R.join
 * @example
 *
 *      const pathComponents = R.split('/');
 *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
 *
 *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
 */


var split =
/*#__PURE__*/
invoker(1, 'split');
module.exports = split;

/***/ }),

/***/ 68959:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var length =
/*#__PURE__*/
__webpack_require__(24234);

var slice =
/*#__PURE__*/
__webpack_require__(81753);
/**
 * Splits a given list or string at a given index.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig Number -> [a] -> [[a], [a]]
 * @sig Number -> String -> [String, String]
 * @param {Number} index The index where the array/string is split.
 * @param {Array|String} array The array/string to be split.
 * @return {Array}
 * @example
 *
 *      R.splitAt(1, [1, 2, 3]);          //=> [[1], [2, 3]]
 *      R.splitAt(5, 'hello world');      //=> ['hello', ' world']
 *      R.splitAt(-1, 'foobar');          //=> ['fooba', 'r']
 */


var splitAt =
/*#__PURE__*/
_curry2(function splitAt(index, array) {
  return [slice(0, index, array), slice(index, length(array), array)];
});

module.exports = splitAt;

/***/ }),

/***/ 59241:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var slice =
/*#__PURE__*/
__webpack_require__(81753);
/**
 * Splits a collection into slices of the specified length.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @sig Number -> String -> [String]
 * @param {Number} n
 * @param {Array} list
 * @return {Array}
 * @example
 *
 *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
 *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
 */


var splitEvery =
/*#__PURE__*/
_curry2(function splitEvery(n, list) {
  if (n <= 0) {
    throw new Error('First argument to splitEvery must be a positive integer');
  }

  var result = [];
  var idx = 0;

  while (idx < list.length) {
    result.push(slice(idx, idx += n, list));
  }

  return result;
});

module.exports = splitEvery;

/***/ }),

/***/ 9781:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Takes a list and a predicate and returns a pair of lists with the following properties:
 *
 *  - the result of concatenating the two output lists is equivalent to the input list;
 *  - none of the elements of the first output list satisfies the predicate; and
 *  - if the second output list is non-empty, its first element satisfies the predicate.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [[a], [a]]
 * @param {Function} pred The predicate that determines where the array is split.
 * @param {Array} list The array to be split.
 * @return {Array}
 * @example
 *
 *      R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1], [2, 3, 1, 2, 3]]
 */


var splitWhen =
/*#__PURE__*/
_curry2(function splitWhen(pred, list) {
  var idx = 0;
  var len = list.length;
  var prefix = [];

  while (idx < len && !pred(list[idx])) {
    prefix.push(list[idx]);
    idx += 1;
  }

  return [prefix, Array.prototype.slice.call(list, idx)];
});

module.exports = splitWhen;

/***/ }),

/***/ 83709:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curryN =
/*#__PURE__*/
__webpack_require__(32738);
/**
 * Splits an array into slices on every occurrence of a value.
 *
 * @func
 * @memberOf R
 * @since v0.26.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> [[a]]
 * @param {Function} pred The predicate that determines where the array is split.
 * @param {Array} list The array to be split.
 * @return {Array}
 * @example
 *
 *      R.splitWhenever(R.equals(2), [1, 2, 3, 2, 4, 5, 2, 6, 7]); //=> [[1], [3], [4, 5], [6, 7]]
 */


var splitWhenever =
/*#__PURE__*/
_curryN(2, [], function splitWhenever(pred, list) {
  var acc = [];
  var curr = [];

  for (var i = 0; i < list.length; i = i + 1) {
    if (!pred(list[i])) {
      curr.push(list[i]);
    }

    if ((i < list.length - 1 && pred(list[i + 1]) || i === list.length - 1) && curr.length > 0) {
      acc.push(curr);
      curr = [];
    }
  }

  return acc;
});

module.exports = splitWhenever;

/***/ }),

/***/ 60830:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var equals =
/*#__PURE__*/
__webpack_require__(51481);

var take =
/*#__PURE__*/
__webpack_require__(94744);
/**
 * Checks if a list starts with the provided sublist.
 *
 * Similarly, checks if a string starts with the provided substring.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> [a] -> Boolean
 * @sig String -> String -> Boolean
 * @param {*} prefix
 * @param {*} list
 * @return {Boolean}
 * @see R.endsWith
 * @example
 *
 *      R.startsWith('a', 'abc')                //=> true
 *      R.startsWith('b', 'abc')                //=> false
 *      R.startsWith(['a'], ['a', 'b', 'c'])    //=> true
 *      R.startsWith(['b'], ['a', 'b', 'c'])    //=> false
 */


var startsWith =
/*#__PURE__*/
_curry2(function (prefix, list) {
  return equals(take(prefix.length, list), prefix);
});

module.exports = startsWith;

/***/ }),

/***/ 29454:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Subtracts its second argument from its first argument.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a - b`.
 * @see R.add
 * @example
 *
 *      R.subtract(10, 8); //=> 2
 *
 *      const minus5 = R.subtract(R.__, 5);
 *      minus5(17); //=> 12
 *
 *      const complementaryAngle = R.subtract(90);
 *      complementaryAngle(30); //=> 60
 *      complementaryAngle(72); //=> 18
 */


var subtract =
/*#__PURE__*/
_curry2(function subtract(a, b) {
  return Number(a) - Number(b);
});

module.exports = subtract;

/***/ }),

/***/ 36945:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var add =
/*#__PURE__*/
__webpack_require__(63073);

var reduce =
/*#__PURE__*/
__webpack_require__(20793);
/**
 * Adds together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The sum of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.sum([2,4,6,8,100,1]); //=> 121
 */


var sum =
/*#__PURE__*/
reduce(add, 0);
module.exports = sum;

/***/ }),

/***/ 59776:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var _isArray =
/*#__PURE__*/
__webpack_require__(20219);

var _isString =
/*#__PURE__*/
__webpack_require__(20190);

var clone =
/*#__PURE__*/
__webpack_require__(91549);

var swapObject = function (indexA, indexB, o) {
  var copy = clone(o);
  var properties = Object.getOwnPropertyNames(copy);

  if (properties.includes(indexA) && properties.includes(indexB)) {
    var tmp = copy[indexA];
    copy[indexA] = copy[indexB];
    copy[indexB] = tmp;
  }

  return copy;
};

var swapList = function (indexA, indexB, list) {
  var length = list.length;
  var result = list.slice();
  var positiveIndexA = indexA < 0 ? length + indexA : indexA;
  var positiveIndexB = indexB < 0 ? length + indexB : indexB;
  var positiveMin = Math.min(positiveIndexA, positiveIndexB);
  var positiveMax = Math.max(positiveIndexA, positiveIndexB);

  if (positiveIndexA < 0 || positiveIndexA > length) {
    return result;
  }

  if (positiveIndexB < 0 || positiveIndexB > length) {
    return result;
  }

  if (positiveIndexA === positiveIndexB) {
    return result;
  }

  result = [].concat(result.slice(0, positiveMin)).concat(result[positiveMax]).concat(result.slice(positiveMin + 1, positiveMax)).concat(result[positiveMin]).concat(result.slice(positiveMax + 1, length));
  return result;
};

var swapString = function (indexA, indexB, s) {
  var result = swapList(indexA, indexB, s);
  return _isArray(result) ? result.join('') : result;
};
/**
 * Swap an item, at index `indexA` with another item, at index `indexB`, in an object or a list of elements.
 * A new result will be created containing the new elements order.
 *
 * @func
 * @memberOf R
 * @since v0.29.0
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number|string|Object} indexA The first index
 * @param {Number|string|Object} indexB The second index
 * @param {Array|Object} o Either the object or list which will serve to realise the swap
 * @return {Array|Object} The new object or list reordered
 * @example
 *
 *      R.swap(0, 2, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['c', 'b', 'a', 'd', 'e', 'f']
 *      R.swap(-1, 0, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['f', 'b', 'c', 'd', 'e', 'a'] list rotation
 *      R.swap('a', 'b', {a: 1, b: 2}); //=> {a: 2, b: 2}
 *      R.swap(0, 2, 'foo'); //=> 'oof'
 */


var swap =
/*#__PURE__*/
_curry3(function (indexA, indexB, o) {
  if (_isArray(o)) {
    return swapList(indexA, indexB, o);
  } else if (_isString(o)) {
    return swapString(indexA, indexB, o);
  } else {
    return swapObject(indexA, indexB, o);
  }
});

module.exports = swap;

/***/ }),

/***/ 16722:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var concat =
/*#__PURE__*/
__webpack_require__(54405);

var difference =
/*#__PURE__*/
__webpack_require__(34226);
/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifferenceWith, R.difference, R.differenceWith
 * @example
 *
 *      R.symmetricDifference([1,2,3,4], [7,6,5,4,3]); //=> [1,2,7,6,5]
 *      R.symmetricDifference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5,1,2]
 */


var symmetricDifference =
/*#__PURE__*/
_curry2(function symmetricDifference(list1, list2) {
  return concat(difference(list1, list2), difference(list2, list1));
});

module.exports = symmetricDifference;

/***/ }),

/***/ 7776:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var concat =
/*#__PURE__*/
__webpack_require__(54405);

var differenceWith =
/*#__PURE__*/
__webpack_require__(22013);
/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both. Duplication is determined according to the value
 * returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifference, R.difference, R.differenceWith
 * @example
 *
 *      const eqA = R.eqBy(R.prop('a'));
 *      const l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
 *      const l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
 *      R.symmetricDifferenceWith(eqA, l1, l2); //=> [{a: 1}, {a: 2}, {a: 5}, {a: 6}]
 */


var symmetricDifferenceWith =
/*#__PURE__*/
_curry3(function symmetricDifferenceWith(pred, list1, list2) {
  return concat(differenceWith(pred, list1, list2), differenceWith(pred, list2, list1));
});

module.exports = symmetricDifferenceWith;

/***/ }),

/***/ 43656:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _checkForMethod =
/*#__PURE__*/
__webpack_require__(73542);

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var slice =
/*#__PURE__*/
__webpack_require__(81753);
/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */


var tail =
/*#__PURE__*/
_curry1(
/*#__PURE__*/
_checkForMethod('tail',
/*#__PURE__*/
slice(1, Infinity)));

module.exports = tail;

/***/ }),

/***/ 94744:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _xtake =
/*#__PURE__*/
__webpack_require__(49184);

var slice =
/*#__PURE__*/
__webpack_require__(81753);
/**
 * Returns the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `take` method).
 *
 * Dispatches to the `take` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*}
 * @see R.drop
 * @example
 *
 *      R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(3, 'ramda');               //=> 'ram'
 *
 *      const personnel = [
 *        'Dave Brubeck',
 *        'Paul Desmond',
 *        'Eugene Wright',
 *        'Joe Morello',
 *        'Gerry Mulligan',
 *        'Bob Bates',
 *        'Joe Dodge',
 *        'Ron Crotty'
 *      ];
 *
 *      const takeFive = R.take(5);
 *      takeFive(personnel);
 *      //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
 * @symb R.take(-1, [a, b]) = [a, b]
 * @symb R.take(0, [a, b]) = []
 * @symb R.take(1, [a, b]) = [a]
 * @symb R.take(2, [a, b]) = [a, b]
 */


var take =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable(['take'], _xtake, function take(n, xs) {
  return slice(0, n < 0 ? Infinity : n, xs);
}));

module.exports = take;

/***/ }),

/***/ 18703:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var drop =
/*#__PURE__*/
__webpack_require__(78821);
/**
 * Returns a new list containing the last `n` elements of the given list.
 * If `n > list.length`, returns a list of `list.length` elements.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements to return.
 * @param {Array} xs The collection to consider.
 * @return {Array}
 * @see R.dropLast
 * @example
 *
 *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(3, 'ramda');               //=> 'mda'
 */


var takeLast =
/*#__PURE__*/
_curry2(function takeLast(n, xs) {
  return drop(n >= 0 ? xs.length - n : 0, xs);
});

module.exports = takeLast;

/***/ }),

/***/ 96412:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var slice =
/*#__PURE__*/
__webpack_require__(81753);
/**
 * Returns a new list containing the last `n` elements of a given list, passing
 * each value to the supplied predicate function, and terminating when the
 * predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropLastWhile, R.addIndex
 * @example
 *
 *      const isNotOne = x => x !== 1;
 *
 *      R.takeLastWhile(isNotOne, [1, 2, 3, 4]); //=> [2, 3, 4]
 *
 *      R.takeLastWhile(x => x !== 'R' , 'Ramda'); //=> 'amda'
 */


var takeLastWhile =
/*#__PURE__*/
_curry2(function takeLastWhile(fn, xs) {
  var idx = xs.length - 1;

  while (idx >= 0 && fn(xs[idx])) {
    idx -= 1;
  }

  return slice(idx + 1, Infinity, xs);
});

module.exports = takeLastWhile;

/***/ }),

/***/ 27050:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _xtakeWhile =
/*#__PURE__*/
__webpack_require__(89963);

var slice =
/*#__PURE__*/
__webpack_require__(81753);
/**
 * Returns a new list containing the first `n` elements of a given list,
 * passing each value to the supplied predicate function, and terminating when
 * the predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * Dispatches to the `takeWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropWhile, R.transduce, R.addIndex
 * @example
 *
 *      const isNotFour = x => x !== 4;
 *
 *      R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3]
 *
 *      R.takeWhile(x => x !== 'd' , 'Ramda'); //=> 'Ram'
 */


var takeWhile =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable(['takeWhile'], _xtakeWhile, function takeWhile(fn, xs) {
  var idx = 0;
  var len = xs.length;

  while (idx < len && fn(xs[idx])) {
    idx += 1;
  }

  return slice(0, idx, xs);
}));

module.exports = takeWhile;

/***/ }),

/***/ 6037:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _xtap =
/*#__PURE__*/
__webpack_require__(59524);
/**
 * Runs the given function with the supplied object, then returns the object.
 *
 * Acts as a transducer if a transformer is given as second parameter.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a -> *) -> a -> a
 * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
 * @param {*} x
 * @return {*} `x`.
 * @example
 *
 *      const sayX = x => console.log('x is ' + x);
 *      R.tap(sayX, 100); //=> 100
 *      // logs 'x is 100'
 * @symb R.tap(f, a) = (f(a), a)
 */


var tap =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable([], _xtap, function tap(fn, x) {
  fn(x);
  return x;
}));

module.exports = tap;

/***/ }),

/***/ 73495:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _cloneRegExp =
/*#__PURE__*/
__webpack_require__(9039);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _isRegExp =
/*#__PURE__*/
__webpack_require__(79725);

var toString =
/*#__PURE__*/
__webpack_require__(15243);
/**
 * Determines whether a given string matches a given regular expression.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category String
 * @sig RegExp -> String -> Boolean
 * @param {RegExp} pattern
 * @param {String} str
 * @return {Boolean}
 * @see R.match
 * @example
 *
 *      R.test(/^x/, 'xyz'); //=> true
 *      R.test(/^y/, 'xyz'); //=> false
 */


var test =
/*#__PURE__*/
_curry2(function test(pattern, str) {
  if (!_isRegExp(pattern)) {
    throw new TypeError('‘test’ requires a value of type RegExp as its first argument; received ' + toString(pattern));
  }

  return _cloneRegExp(pattern).test(str);
});

module.exports = test;

/***/ }),

/***/ 92839:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var curryN =
/*#__PURE__*/
__webpack_require__(2220);

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);
/**
 * Creates a thunk out of a function. A thunk delays a calculation until
 * its result is needed, providing lazy evaluation of arguments.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Function
 * @sig ((a, b, ..., j) -> k) -> (a, b, ..., j) -> (() -> k)
 * @param {Function} fn A function to wrap in a thunk
 * @return {Function} Expects arguments for `fn` and returns a new function
 *  that, when called, applies those arguments to `fn`.
 * @see R.partial, R.partialRight
 * @example
 *
 *      R.thunkify(R.identity)(42)(); //=> 42
 *      R.thunkify((a, b) => a + b)(25, 17)(); //=> 42
 */


var thunkify =
/*#__PURE__*/
_curry1(function thunkify(fn) {
  return curryN(fn.length, function createThunk() {
    var fnArgs = arguments;
    return function invokeThunk() {
      return fn.apply(this, fnArgs);
    };
  });
});

module.exports = thunkify;

/***/ }),

/***/ 32250:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Calls an input function `n` times, returning an array containing the results
 * of those function calls.
 *
 * `fn` is passed one argument: The current value of `n`, which begins at `0`
 * and is gradually incremented to `n - 1`.
 *
 * @func
 * @memberOf R
 * @since v0.2.3
 * @category List
 * @sig (Number -> a) -> Number -> [a]
 * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
 * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
 * @return {Array} An array containing the return values of all calls to `fn`.
 * @see R.repeat
 * @example
 *
 *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
 * @symb R.times(f, 0) = []
 * @symb R.times(f, 1) = [f(0)]
 * @symb R.times(f, 2) = [f(0), f(1)]
 */


var times =
/*#__PURE__*/
_curry2(function times(fn, n) {
  var len = Number(n);
  var idx = 0;
  var list;

  if (len < 0 || isNaN(len)) {
    throw new RangeError('n must be a non-negative number');
  }

  list = [];

  while (idx < len) {
    list.push(fn(idx));
    idx += 1;
  }

  return list;
});

module.exports = times;

/***/ }),

/***/ 80620:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var invoker =
/*#__PURE__*/
__webpack_require__(25189);
/**
 * The lower case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to lower case.
 * @return {String} The lower case version of `str`.
 * @see R.toUpper
 * @example
 *
 *      R.toLower('XYZ'); //=> 'xyz'
 */


var toLower =
/*#__PURE__*/
invoker(0, 'toLowerCase');
module.exports = toLower;

/***/ }),

/***/ 98313:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var _has =
/*#__PURE__*/
__webpack_require__(87684);
/**
 * Converts an object into an array of key, value arrays. Only the object's
 * own properties are used.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own properties.
 * @see R.fromPairs, R.keys, R.values
 * @example
 *
 *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
 */


var toPairs =
/*#__PURE__*/
_curry1(function toPairs(obj) {
  var pairs = [];

  for (var prop in obj) {
    if (_has(prop, obj)) {
      pairs[pairs.length] = [prop, obj[prop]];
    }
  }

  return pairs;
});

module.exports = toPairs;

/***/ }),

/***/ 44739:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);
/**
 * Converts an object into an array of key, value arrays. The object's own
 * properties and prototype properties are used. Note that the order of the
 * output array is not guaranteed to be consistent across different JS
 * platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own
 *         and prototype properties.
 * @example
 *
 *      const F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      const f = new F();
 *      R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
 */


var toPairsIn =
/*#__PURE__*/
_curry1(function toPairsIn(obj) {
  var pairs = [];

  for (var prop in obj) {
    pairs[pairs.length] = [prop, obj[prop]];
  }

  return pairs;
});

module.exports = toPairsIn;

/***/ }),

/***/ 15243:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var _toString =
/*#__PURE__*/
__webpack_require__(31136);
/**
 * Returns the string representation of the given value. `eval`'ing the output
 * should result in a value equivalent to the input value. Many of the built-in
 * `toString` methods do not satisfy this requirement.
 *
 * If the given value is an `[object Object]` with a `toString` method other
 * than `Object.prototype.toString`, this method is invoked with no arguments
 * to produce the return value. This means user-defined constructor functions
 * can provide a suitable `toString` method. For example:
 *
 *     function Point(x, y) {
 *       this.x = x;
 *       this.y = y;
 *     }
 *
 *     Point.prototype.toString = function() {
 *       return 'new Point(' + this.x + ', ' + this.y + ')';
 *     };
 *
 *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category String
 * @sig * -> String
 * @param {*} val
 * @return {String}
 * @example
 *
 *      R.toString(42); //=> '42'
 *      R.toString('abc'); //=> '"abc"'
 *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
 *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
 *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
 */


var toString =
/*#__PURE__*/
_curry1(function toString(val) {
  return _toString(val, []);
});

module.exports = toString;

/***/ }),

/***/ 74633:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var invoker =
/*#__PURE__*/
__webpack_require__(25189);
/**
 * The upper case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to upper case.
 * @return {String} The upper case version of `str`.
 * @see R.toLower
 * @example
 *
 *      R.toUpper('abc'); //=> 'ABC'
 */


var toUpper =
/*#__PURE__*/
invoker(0, 'toUpperCase');
module.exports = toUpper;

/***/ }),

/***/ 63158:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _xReduce =
/*#__PURE__*/
__webpack_require__(89632);

var _xwrap =
/*#__PURE__*/
__webpack_require__(39874);

var curryN =
/*#__PURE__*/
__webpack_require__(2220);
/**
 * Initializes a transducer using supplied iterator function. Returns a single
 * item by iterating through the list, successively calling the transformed
 * iterator function and passing it an accumulator value and the current value
 * from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It will be
 * wrapped as a transformer to initialize the transducer. A transformer can be
 * passed directly in place of an iterator function. In both cases, iteration
 * may be stopped early with the [`R.reduced`](#reduced) function.
 *
 * A transducer is a function that accepts a transformer and returns a
 * transformer and can be composed directly.
 *
 * A transformer is an object that provides a 2-arity reducing iterator
 * function, step, 0-arity initial value function, init, and 1-arity result
 * extraction function, result. The step function is used as the iterator
 * function in reduce. The result function is used to convert the final
 * accumulator into the return type and in most cases is
 * [`R.identity`](#identity). The init function can be used to provide an
 * initial accumulator, but is ignored by transduce.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (c -> c) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array. Wrapped as transformer, if necessary, and used to
 *        initialize the transducer
 * @param {*} acc The initial accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced, R.into
 * @example
 *
 *      const numbers = [1, 2, 3, 4];
 *      const transducer = R.compose(R.map(R.add(1)), R.take(2));
 *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
 *
 *      const isOdd = (x) => x % 2 !== 0;
 *      const firstOddTransducer = R.compose(R.filter(isOdd), R.take(1));
 *      R.transduce(firstOddTransducer, R.flip(R.append), [], R.range(0, 100)); //=> [1]
 */


var transduce =
/*#__PURE__*/
curryN(4, function transduce(xf, fn, acc, list) {
  return _xReduce(xf(typeof fn === 'function' ? _xwrap(fn) : fn), acc, list);
});
module.exports = transduce;

/***/ }),

/***/ 5466:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);
/**
 * Transposes the rows and columns of a 2D list.
 * When passed a list of `n` lists of length `x`,
 * returns a list of `x` lists of length `n`.
 *
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [[a]] -> [[a]]
 * @param {Array} list A 2D list
 * @return {Array} A 2D list
 * @example
 *
 *      R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]) //=> [[1, 2, 3], ['a', 'b', 'c']]
 *      R.transpose([[1, 2, 3], ['a', 'b', 'c']]) //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 *
 *      // If some of the rows are shorter than the following rows, their elements are skipped:
 *      R.transpose([[10, 11], [20], [], [30, 31, 32]]) //=> [[10, 20, 30], [11, 31], [32]]
 * @symb R.transpose([[a], [b], [c]]) = [a, b, c]
 * @symb R.transpose([[a, b], [c, d]]) = [[a, c], [b, d]]
 * @symb R.transpose([[a, b], [c]]) = [[a, c], [b]]
 */


var transpose =
/*#__PURE__*/
_curry1(function transpose(outerlist) {
  var i = 0;
  var result = [];

  while (i < outerlist.length) {
    var innerlist = outerlist[i];
    var j = 0;

    while (j < innerlist.length) {
      if (typeof result[j] === 'undefined') {
        result[j] = [];
      }

      result[j].push(innerlist[j]);
      j += 1;
    }

    i += 1;
  }

  return result;
});

module.exports = transpose;

/***/ }),

/***/ 40231:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var map =
/*#__PURE__*/
__webpack_require__(61894);

var sequence =
/*#__PURE__*/
__webpack_require__(233);
/**
 * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 *
 * Dispatches to the `traverse` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig fantasy-land/of :: TypeRep f => f ~> a -> f a
 * @sig (Applicative f, Traversable t) => TypeRep f -> (a -> f b) -> t a -> f (t b)
 * @sig (Applicative f, Traversable t) => (b -> f b) -> (a -> f b) -> t a -> f (t b)
 * @param {Object|Function} TypeRepresentative with an `of` or `fantasy-land/of` method
 * @param {Function} f
 * @param {*} traversable
 * @return {*}
 * @see R.sequence
 * @example
 *
 *      // Returns `Maybe.Nothing` if the given divisor is `0`
 *      const safeDiv = n => d => d === 0 ? Maybe.Nothing() : Maybe.Just(n / d)
 *
 *      R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Maybe.Just([5, 2.5, 2])
 *      R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Maybe.Nothing
 *
 *      // Using a Type Representative
 *      R.traverse(Maybe, safeDiv(10), Right(4)); //=> Just(Right(2.5))
 *      R.traverse(Maybe, safeDiv(10), Right(0)); //=> Nothing
 *      R.traverse(Maybe, safeDiv(10), Left("X")); //=> Just(Left("X"))
 */


var traverse =
/*#__PURE__*/
_curry3(function traverse(F, f, traversable) {
  var of = typeof F['fantasy-land/of'] === 'function' ? F['fantasy-land/of'] : typeof F.of === 'function' ? F.of : F;
  var TypeRep = {
    'fantasy-land/of': of
  };
  return typeof traversable['fantasy-land/traverse'] === 'function' ? traversable['fantasy-land/traverse'](TypeRep, f) : typeof traversable.traverse === 'function' ? traversable.traverse(TypeRep, f) : sequence(TypeRep, map(f, traversable));
});

module.exports = traverse;

/***/ }),

/***/ 67031:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' + '\u2029\uFEFF';
var zeroWidth = '\u200b';
var hasProtoTrim = typeof String.prototype.trim === 'function';
/**
 * Removes (strips) whitespace from both ends of the string.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to trim.
 * @return {String} Trimmed version of `str`.
 * @example
 *
 *      R.trim('   xyz  '); //=> 'xyz'
 *      R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
 */

var trim = !hasProtoTrim ||
/*#__PURE__*/
ws.trim() || !
/*#__PURE__*/
zeroWidth.trim() ?
/*#__PURE__*/
_curry1(function trim(str) {
  var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
  var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
  return str.replace(beginRx, '').replace(endRx, '');
}) :
/*#__PURE__*/
_curry1(function trim(str) {
  return str.trim();
});
module.exports = trim;

/***/ }),

/***/ 55105:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arity =
/*#__PURE__*/
__webpack_require__(7455);

var _concat =
/*#__PURE__*/
__webpack_require__(14011);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * `tryCatch` takes two functions, a `tryer` and a `catcher`. The returned
 * function evaluates the `tryer`; if it does not throw, it simply returns the
 * result. If the `tryer` *does* throw, the returned function evaluates the
 * `catcher` function and returns its result. Note that for effective
 * composition with this function, both the `tryer` and `catcher` functions
 * must return the same type of results.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig (...x -> a) -> ((e, ...x) -> a) -> (...x -> a)
 * @param {Function} tryer The function that may throw.
 * @param {Function} catcher The function that will be evaluated if `tryer` throws.
 * @return {Function} A new function that will catch exceptions and send them to the catcher.
 * @example
 *
 *      R.tryCatch(R.prop('x'), R.F)({x: true}); //=> true
 *      R.tryCatch(() => { throw 'foo'}, R.always('caught'))('bar') // =>
 *      'caught'
 *      R.tryCatch(R.times(R.identity), R.always([]))('s') // => []
 *      R.tryCatch(() => { throw 'this is not a valid value'}, (err, value)=>({error : err,  value }))('bar') // => {'error': 'this is not a valid value', 'value': 'bar'}
 */


var tryCatch =
/*#__PURE__*/
_curry2(function _tryCatch(tryer, catcher) {
  return _arity(tryer.length, function () {
    try {
      return tryer.apply(this, arguments);
    } catch (e) {
      return catcher.apply(this, _concat([e], arguments));
    }
  });
});

module.exports = tryCatch;

/***/ }),

/***/ 36433:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);
/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Type
 * @sig * -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 *      R.type(() => {}); //=> "Function"
 *      R.type(undefined); //=> "Undefined"
 */


var type =
/*#__PURE__*/
_curry1(function type(val) {
  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
});

module.exports = type;

/***/ }),

/***/ 59378:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);
/**
 * Takes a function `fn`, which takes a single array argument, and returns a
 * function which:
 *
 *   - takes any number of positional arguments;
 *   - passes these arguments to `fn` as an array; and
 *   - returns the result.
 *
 * In other words, `R.unapply` derives a variadic function from a function which
 * takes an array. `R.unapply` is the inverse of [`R.apply`](#apply).
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Function
 * @sig ([*...] -> a) -> (*... -> a)
 * @param {Function} fn
 * @return {Function}
 * @see R.apply
 * @example
 *
 *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
 * @symb R.unapply(f)(a, b) = f([a, b])
 */


var unapply =
/*#__PURE__*/
_curry1(function unapply(fn) {
  return function () {
    return fn(Array.prototype.slice.call(arguments, 0));
  };
});

module.exports = unapply;

/***/ }),

/***/ 51380:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var nAry =
/*#__PURE__*/
__webpack_require__(40864);
/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 1 parameter. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (a -> b -> c -> ... -> z) -> (a -> z)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 1.
 * @see R.binary, R.nAry
 * @example
 *
 *      const takesTwoArgs = function(a, b) {
 *        return [a, b];
 *      };
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      const takesOneArg = R.unary(takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only 1 argument is passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.unary(f)(a, b, c) = f(a)
 */


var unary =
/*#__PURE__*/
_curry1(function unary(fn) {
  return nAry(1, fn);
});

module.exports = unary;

/***/ }),

/***/ 1465:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var curryN =
/*#__PURE__*/
__webpack_require__(2220);
/**
 * Returns a function of arity `n` from a (manually) curried function.
 * Note that, the returned function is actually a ramda style
 * curryied function, which can accept one or more arguments in each
 * function calling.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Function
 * @sig Number -> (a -> b -> c ... -> z) -> ((a -> b -> c ...) -> z)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to uncurry.
 * @return {Function} A new function.
 * @see R.curry, R.curryN
 * @example
 *
 *      const addFour = a => b => c => d => a + b + c + d;
 *
 *      const uncurriedAddFour = R.uncurryN(4, addFour);
 *      uncurriedAddFour(1, 2, 3, 4); //=> 10
 */


var uncurryN =
/*#__PURE__*/
_curry2(function uncurryN(depth, fn) {
  return curryN(depth, function () {
    var currentDepth = 1;
    var value = fn;
    var idx = 0;
    var endIdx;

    while (currentDepth <= depth && typeof value === 'function') {
      endIdx = currentDepth === depth ? arguments.length : idx + value.length;
      value = value.apply(this, Array.prototype.slice.call(arguments, idx, endIdx));
      currentDepth += 1;
      idx = endIdx;
    }

    return value;
  });
});

module.exports = uncurryN;

/***/ }),

/***/ 32936:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Builds a list from a seed value. Accepts an iterator function, which returns
 * either false to stop iteration or an array of length 2 containing the value
 * to add to the resulting list and the seed to be used in the next call to the
 * iterator function.
 *
 * The iterator function receives one argument: *(seed)*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig (a -> [b]) -> * -> [b]
 * @param {Function} fn The iterator function. receives one argument, `seed`, and returns
 *        either false to quit iteration or an array of length two to proceed. The element
 *        at index 0 of this array will be added to the resulting array, and the element
 *        at index 1 will be passed to the next call to `fn`.
 * @param {*} seed The seed value.
 * @return {Array} The final list.
 * @example
 *
 *      const f = n => n > 50 ? false : [-n, n + 10];
 *      R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
 * @symb R.unfold(f, x) = [f(x)[0], f(f(x)[1])[0], f(f(f(x)[1])[1])[0], ...]
 */


var unfold =
/*#__PURE__*/
_curry2(function unfold(fn, seed) {
  var pair = fn(seed);
  var result = [];

  while (pair && pair.length) {
    result[result.length] = pair[0];
    pair = fn(pair[1]);
  }

  return result;
});

module.exports = unfold;

/***/ }),

/***/ 30275:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _concat =
/*#__PURE__*/
__webpack_require__(14011);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var compose =
/*#__PURE__*/
__webpack_require__(50557);

var uniq =
/*#__PURE__*/
__webpack_require__(90086);
/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @example
 *
 *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
 */


var union =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
compose(uniq, _concat));

module.exports = union;

/***/ }),

/***/ 90014:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _concat =
/*#__PURE__*/
__webpack_require__(14011);

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var uniqWith =
/*#__PURE__*/
__webpack_require__(77263);
/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list. Duplication is determined according to the value returned by
 * applying the supplied predicate to two list elements. If an element exists
 * in both lists, the first element from the first list will be used.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [*] -> [*] -> [*]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @see R.union
 * @example
 *
 *      const l1 = [{a: 1}, {a: 2}];
 *      const l2 = [{a: 1}, {a: 4}];
 *      R.unionWith(R.eqBy(R.prop('a')), l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]
 */


var unionWith =
/*#__PURE__*/
_curry3(function unionWith(pred, list1, list2) {
  return uniqWith(pred, _concat(list1, list2));
});

module.exports = unionWith;

/***/ }),

/***/ 90086:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var identity =
/*#__PURE__*/
__webpack_require__(69105);

var uniqBy =
/*#__PURE__*/
__webpack_require__(54025);
/**
 * Returns a new list containing only one copy of each element in the original
 * list. [`R.equals`](#equals) is used to determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
 *      R.uniq([1, '1']);     //=> [1, '1']
 *      R.uniq([[42], [42]]); //=> [[42]]
 */


var uniq =
/*#__PURE__*/
uniqBy(identity);
module.exports = uniq;

/***/ }),

/***/ 54025:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _Set =
/*#__PURE__*/
__webpack_require__(8876);

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _xuniqBy =
/*#__PURE__*/
__webpack_require__(17284);
/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied function to
 * each list element. Prefers the first item if the supplied function produces
 * the same value on two items. [`R.equals`](#equals) is used for comparison.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> b) -> [a] -> [a]
 * @param {Function} fn A function used to produce a value to use during comparisons.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
 */


var uniqBy =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable([], _xuniqBy, function (fn, list) {
  var set = new _Set();
  var result = [];
  var idx = 0;
  var appliedItem, item;

  while (idx < list.length) {
    item = list[idx];
    appliedItem = fn(item);

    if (set.add(appliedItem)) {
      result.push(item);
    }

    idx += 1;
  }

  return result;
}));

module.exports = uniqBy;

/***/ }),

/***/ 77263:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _dispatchable =
/*#__PURE__*/
__webpack_require__(34793);

var _includesWith =
/*#__PURE__*/
__webpack_require__(82976);

var _xuniqWith =
/*#__PURE__*/
__webpack_require__(37130);
/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied predicate to
 * two list elements. Prefers the first item if two items compare equal based
 * on the predicate.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category List
 * @sig ((a, a) -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      const strEq = R.eqBy(String);
 *      R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]
 *      R.uniqWith(strEq)([{}, {}]);       //=> [{}]
 *      R.uniqWith(strEq)([1, '1', 1]);    //=> [1]
 *      R.uniqWith(strEq)(['1', 1, 1]);    //=> ['1']
 */


var uniqWith =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable([], _xuniqWith, function (pred, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var item;

  while (idx < len) {
    item = list[idx];

    if (!_includesWith(pred, item, result)) {
      result[result.length] = item;
    }

    idx += 1;
  }

  return result;
}));

module.exports = uniqWith;

/***/ }),

/***/ 61937:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);
/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is not satisfied, the function will return the result of
 * calling the `whenFalseFn` function with the same argument. If the predicate
 * is satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> b) -> a -> a | b
 * @param {Function} pred        A predicate function
 * @param {Function} whenFalseFn A function to invoke when the `pred` evaluates
 *                               to a falsy value.
 * @param {*}        x           An object to test with the `pred` function and
 *                               pass to `whenFalseFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenFalseFn`.
 * @see R.ifElse, R.when, R.cond
 * @example
 *
 *      let safeInc = R.unless(R.isNil, R.inc);
 *      safeInc(null); //=> null
 *      safeInc(1); //=> 2
 */


var unless =
/*#__PURE__*/
_curry3(function unless(pred, whenFalseFn, x) {
  return pred(x) ? x : whenFalseFn(x);
});

module.exports = unless;

/***/ }),

/***/ 51497:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _identity =
/*#__PURE__*/
__webpack_require__(50339);

var chain =
/*#__PURE__*/
__webpack_require__(79098);
/**
 * Shorthand for `R.chain(R.identity)`, which removes one level of nesting from
 * any [Chain](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain c => c (c a) -> c a
 * @param {*} list
 * @return {*}
 * @see R.flatten, R.chain
 * @example
 *
 *      R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
 *      R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
 */


var unnest =
/*#__PURE__*/
chain(_identity);
module.exports = unnest;

/***/ }),

/***/ 51800:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);
/**
 * Takes a predicate, a transformation function, and an initial value,
 * and returns a value of the same type as the initial value.
 * It does so by applying the transformation until the predicate is satisfied,
 * at which point it returns the satisfactory value.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred A predicate function
 * @param {Function} fn The iterator function
 * @param {*} init Initial value
 * @return {*} Final value that satisfies predicate
 * @example
 *
 *      R.until(R.gt(R.__, 100), R.multiply(2))(1) // => 128
 */


var until =
/*#__PURE__*/
_curry3(function until(pred, fn, init) {
  var val = init;

  while (!pred(val)) {
    val = fn(val);
  }

  return val;
});

module.exports = until;

/***/ }),

/***/ 95244:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _isArray =
/*#__PURE__*/
__webpack_require__(20219);

var _map =
/*#__PURE__*/
__webpack_require__(36692);

var _assoc =
/*#__PURE__*/
__webpack_require__(17031);
/**
 *
 * Deconstructs an array field from the input documents to output a document for each element.
 * Each output document is the input document with the value of the array field replaced by the element.
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category Object
 * @sig String -> {k: [v]} -> [{k: v}]
 * @param {String} key The key to determine which property of the object should be unwind
 * @param {Object} object The object containing list under property named as key which is to unwind
 * @return {List} A new list of object containing the value of input key having list replaced by each element in the object.
 * @example
 *
 * R.unwind('hobbies', {
 *   name: 'alice',
 *   hobbies: ['Golf', 'Hacking'],
 *   colors: ['red', 'green'],
 * });
 * // [
 * //   { name: 'alice', hobbies: 'Golf', colors: ['red', 'green'] },
 * //   { name: 'alice', hobbies: 'Hacking', colors: ['red', 'green'] }
 * // ]
 */


var unwind =
/*#__PURE__*/
_curry2(function (key, object) {
  // If key is not in object or key is not as a list in object
  if (!(key in object && _isArray(object[key]))) {
    return [object];
  } // Map over object[key] which is a list and assoc each element with key


  return _map(function (item) {
    return _assoc(key, item, object);
  }, object[key]);
});

module.exports = unwind;

/***/ }),

/***/ 67964:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);

var adjust =
/*#__PURE__*/
__webpack_require__(82515);

var always =
/*#__PURE__*/
__webpack_require__(54115);
/**
 * Returns a new copy of the array with the element at the provided index
 * replaced with the given value.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} idx The index to update.
 * @param {*} x The value to exist at the given index of the returned array.
 * @param {Array|Arguments} list The source array-like object to be updated.
 * @return {Array} A copy of `list` with the value at index `idx` replaced with `x`.
 * @see R.adjust
 * @example
 *
 *      R.update(1, '_', ['a', 'b', 'c']);      //=> ['a', '_', 'c']
 *      R.update(-1, '_', ['a', 'b', 'c']);     //=> ['a', 'b', '_']
 * @symb R.update(-1, a, [b, c]) = [b, a]
 * @symb R.update(0, a, [b, c]) = [a, c]
 * @symb R.update(1, a, [b, c]) = [b, a]
 */


var update =
/*#__PURE__*/
_curry3(function update(idx, x, list) {
  return adjust(idx, always(x), list);
});

module.exports = update;

/***/ }),

/***/ 40517:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var curryN =
/*#__PURE__*/
__webpack_require__(2220);
/**
 * Accepts a function `fn` and a list of transformer functions and returns a
 * new curried function. When the new function is invoked, it calls the
 * function `fn` with parameters consisting of the result of calling each
 * supplied handler on successive arguments to the new function.
 *
 * If more arguments are passed to the returned function than transformer
 * functions, those arguments are passed directly to `fn` as additional
 * parameters. If you expect additional arguments that don't need to be
 * transformed, although you can ignore them, it's best to pass an identity
 * function so that the new function reports the correct arity.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [(a -> x1), (b -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} fn The function to wrap.
 * @param {Array} transformers A list of transformer functions
 * @return {Function} The wrapped function.
 * @see R.converge
 * @example
 *
 *      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
 *      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
 *      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
 *      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
 * @symb R.useWith(f, [g, h])(a, b) = f(g(a), h(b))
 */


var useWith =
/*#__PURE__*/
_curry2(function useWith(fn, transformers) {
  return curryN(transformers.length, function () {
    var args = [];
    var idx = 0;

    while (idx < transformers.length) {
      args.push(transformers[idx].call(this, arguments[idx]));
      idx += 1;
    }

    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, transformers.length)));
  });
});

module.exports = useWith;

/***/ }),

/***/ 33411:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);

var keys =
/*#__PURE__*/
__webpack_require__(90368);
/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own properties.
 * @see R.valuesIn, R.keys, R.toPairs
 * @example
 *
 *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
 */


var values =
/*#__PURE__*/
_curry1(function values(obj) {
  var props = keys(obj);
  var len = props.length;
  var vals = [];
  var idx = 0;

  while (idx < len) {
    vals[idx] = obj[props[idx]];
    idx += 1;
  }

  return vals;
});

module.exports = values;

/***/ }),

/***/ 75988:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(76224);
/**
 * Returns a list of all the properties, including prototype properties, of the
 * supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own and prototype properties.
 * @see R.values, R.keysIn
 * @example
 *
 *      const F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      const f = new F();
 *      R.valuesIn(f); //=> ['X', 'Y']
 */


var valuesIn =
/*#__PURE__*/
_curry1(function valuesIn(obj) {
  var prop;
  var vs = [];

  for (prop in obj) {
    vs[vs.length] = obj[prop];
  }

  return vs;
});

module.exports = valuesIn;

/***/ }),

/***/ 43931:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002); // `Const` is a functor that effectively ignores the function given to `map`.


var Const = function (x) {
  return {
    value: x,
    'fantasy-land/map': function () {
      return this;
    }
  };
};
/**
 * Returns a "view" of the given data structure, determined by the given lens.
 * The lens's focus determines which portion of the data structure is visible.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> s -> a
 * @param {Lens} lens
 * @param {*} x
 * @return {*}
 * @see R.set, R.over, R.lens, R.lensIndex, R.lensProp, R.lensPath
 * @example
 *
 *      const xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});  //=> 1
 *      R.view(xLens, {x: 4, y: 2});  //=> 4
 */


var view =
/*#__PURE__*/
_curry2(function view(lens, x) {
  // Using `Const` effectively ignores the setter function of the `lens`,
  // leaving the value returned by the getter function unmodified.
  return lens(Const)(x).value;
});

module.exports = view;

/***/ }),

/***/ 47176:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);
/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is satisfied, the function will return the result of calling
 * the `whenTrueFn` function with the same argument. If the predicate is not
 * satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> b) -> a -> a | b
 * @param {Function} pred       A predicate function
 * @param {Function} whenTrueFn A function to invoke when the `condition`
 *                              evaluates to a truthy value.
 * @param {*}        x          An object to test with the `pred` function and
 *                              pass to `whenTrueFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenTrueFn`.
 * @see R.ifElse, R.unless, R.cond
 * @example
 *
 *      // truncate :: String -> String
 *      const truncate = R.when(
 *        R.propSatisfies(R.gt(R.__, 10), 'length'),
 *        R.pipe(R.take(10), R.append('…'), R.join(''))
 *      );
 *      truncate('12345');         //=> '12345'
 *      truncate('0123456789ABC'); //=> '0123456789…'
 */


var when =
/*#__PURE__*/
_curry3(function when(pred, whenTrueFn, x) {
  return pred(x) ? whenTrueFn(x) : x;
});

module.exports = when;

/***/ }),

/***/ 39629:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _has =
/*#__PURE__*/
__webpack_require__(87684);
/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec. Each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `where` returns true if all the predicates return true, false
 * otherwise.
 *
 * `where` is well suited to declaratively expressing constraints for other
 * functions such as [`filter`](#filter) and [`find`](#find).
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Object
 * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propSatisfies, R.whereEq
 * @example
 *
 *      // pred :: Object -> Boolean
 *      const pred = R.where({
 *        a: R.equals('foo'),
 *        b: R.complement(R.equals('bar')),
 *        x: R.gt(R.__, 10),
 *        y: R.lt(R.__, 20)
 *      });
 *
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
 *      pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
 */


var where =
/*#__PURE__*/
_curry2(function where(spec, testObj) {
  for (var prop in spec) {
    if (_has(prop, spec) && !spec[prop](testObj[prop])) {
      return false;
    }
  }

  return true;
});

module.exports = where;

/***/ }),

/***/ 72146:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _has =
/*#__PURE__*/
__webpack_require__(87684);
/**
 * Takes a spec object and a test object; each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `whereAny` returns true if at least one of the predicates return true,
 * false otherwise.
 *
 * `whereAny` is well suited to declaratively expressing constraints for other
 * functions such as [`filter`](#filter) and [`find`](#find).
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category Object
 * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propSatisfies, R.where
 * @example
 *
 *      // pred :: Object -> Boolean
 *      const pred = R.whereAny({
 *        a: R.equals('foo'),
 *        b: R.complement(R.equals('xxx')),
 *        x: R.gt(R.__, 10),
 *        y: R.lt(R.__, 20)
 *      });
 *
 *      pred({a: 'foo', b: 'xxx', x: 8, y: 34}); //=> true
 *      pred({a: 'xxx', b: 'xxx', x: 9, y: 21}); //=> false
 *      pred({a: 'bar', b: 'xxx', x: 10, y: 20}); //=> false
 *      pred({a: 'foo', b: 'bar', x: 10, y: 20}); //=> true
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> true
 */


var whereAny =
/*#__PURE__*/
_curry2(function whereAny(spec, testObj) {
  for (var prop in spec) {
    if (_has(prop, spec) && spec[prop](testObj[prop])) {
      return true;
    }
  }

  return false;
});

module.exports = whereAny;

/***/ }),

/***/ 15598:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var equals =
/*#__PURE__*/
__webpack_require__(51481);

var map =
/*#__PURE__*/
__webpack_require__(61894);

var where =
/*#__PURE__*/
__webpack_require__(39629);
/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec, false otherwise. An object satisfies the spec if, for each of the
 * spec's own properties, accessing that property of the object gives the same
 * value (in [`R.equals`](#equals) terms) as accessing that property of the
 * spec.
 *
 * `whereEq` is a specialization of [`where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @sig {String: *} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propEq, R.where
 * @example
 *
 *      // pred :: Object -> Boolean
 *      const pred = R.whereEq({a: 1, b: 2});
 *
 *      pred({a: 1});              //=> false
 *      pred({a: 1, b: 2});        //=> true
 *      pred({a: 1, b: 2, c: 3});  //=> true
 *      pred({a: 1, b: 1});        //=> false
 */


var whereEq =
/*#__PURE__*/
_curry2(function whereEq(spec, testObj) {
  return where(map(equals, spec), testObj);
});

module.exports = whereEq;

/***/ }),

/***/ 76290:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);

var _Set =
/*#__PURE__*/
__webpack_require__(8876);

var reject =
/*#__PURE__*/
__webpack_require__(63266);
/**
 * Returns a new list without values in the first argument.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @param {Array} list1 The values to be removed from `list2`.
 * @param {Array} list2 The array to remove values from.
 * @return {Array} The new array without values in `list1`.
 * @see R.transduce, R.difference, R.remove
 * @example
 *
 *      R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
 */


var without =
/*#__PURE__*/
_curry2(function without(xs, list) {
  var toRemove = new _Set();

  for (var i = 0; i < xs.length; i += 1) {
    toRemove.add(xs[i]);
  }

  return reject(toRemove.has.bind(toRemove), list);
});

module.exports = without;

/***/ }),

/***/ 64958:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Exclusive disjunction logical operation.
 * Returns `true` if one of the arguments is truthy and the other is falsy.
 * Otherwise, it returns `false`.
 *
 * @func
 * @memberOf R
 * @since v0.27.1
 * @category Logic
 * @sig a -> b -> Boolean
 * @param {Any} a
 * @param {Any} b
 * @return {Boolean} true if one of the arguments is truthy and the other is falsy
 * @see R.or, R.and
 * @example
 *
 *      R.xor(true, true); //=> false
 *      R.xor(true, false); //=> true
 *      R.xor(false, true); //=> true
 *      R.xor(false, false); //=> false
 */


var xor =
/*#__PURE__*/
_curry2(function xor(a, b) {
  return Boolean(!a ^ !b);
});

module.exports = xor;

/***/ }),

/***/ 90482:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Creates a new list out of the two supplied by creating each possible pair
 * from the lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The list made by combining each possible pair from
 *         `as` and `bs` into pairs (`[a, b]`).
 * @example
 *
 *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 * @symb R.xprod([a, b], [c, d]) = [[a, c], [a, d], [b, c], [b, d]]
 */


var xprod =
/*#__PURE__*/
_curry2(function xprod(a, b) {
  // = xprodWith(prepend); (takes about 3 times as long...)
  var idx = 0;
  var ilen = a.length;
  var j;
  var jlen = b.length;
  var result = [];

  while (idx < ilen) {
    j = 0;

    while (j < jlen) {
      result[result.length] = [a[idx], b[j]];
      j += 1;
    }

    idx += 1;
  }

  return result;
});

module.exports = xprod;

/***/ }),

/***/ 5086:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Creates a new list out of the two supplied by pairing up equally-positioned
 * items from both lists. The returned list is truncated to the length of the
 * shorter of the two input lists.
 * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by pairing up same-indexed elements of `list1` and `list2`.
 * @example
 *
 *      R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 * @symb R.zip([a, b, c], [d, e, f]) = [[a, d], [b, e], [c, f]]
 */


var zip =
/*#__PURE__*/
_curry2(function zip(a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);

  while (idx < len) {
    rv[idx] = [a[idx], b[idx]];
    idx += 1;
  }

  return rv;
});

module.exports = zip;

/***/ }),

/***/ 47858:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(79002);
/**
 * Creates a new object out of a list of keys and a list of values.
 * Key/value pairing is truncated to the length of the shorter of the two lists.
 * Note: `zipObj` is equivalent to `pipe(zip, fromPairs)`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [String] -> [*] -> {String: *}
 * @param {Array} keys The array that will be properties on the output object.
 * @param {Array} values The list of values on the output object.
 * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
 * @example
 *
 *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
 */


var zipObj =
/*#__PURE__*/
_curry2(function zipObj(keys, values) {
  var idx = 0;
  var len = Math.min(keys.length, values.length);
  var out = {};

  while (idx < len) {
    out[keys[idx]] = values[idx];
    idx += 1;
  }

  return out;
});

module.exports = zipObj;

/***/ }),

/***/ 19380:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 =
/*#__PURE__*/
__webpack_require__(16370);
/**
 * Creates a new list out of the two supplied by applying the function to each
 * equally-positioned pair in the lists. The returned list is truncated to the
 * length of the shorter of the two input lists.
 *
 * @function
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> c) -> [a] -> [b] -> [c]
 * @param {Function} fn The function used to combine the two elements into one value.
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by combining same-indexed elements of `list1` and `list2`
 *         using `fn`.
 * @example
 *
 *      const f = (x, y) => {
 *        // ...
 *      };
 *      R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
 *      //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
 * @symb R.zipWith(fn, [a, b, c], [d, e, f]) = [fn(a, d), fn(b, e), fn(c, f)]
 */


var zipWith =
/*#__PURE__*/
_curry3(function zipWith(fn, a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);

  while (idx < len) {
    rv[idx] = fn(a[idx], b[idx]);
    idx += 1;
  }

  return rv;
});

module.exports = zipWith;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;


exports.__esModule = true;
exports.isNotRegExp = exports.isNotPrimitive = exports.isNotPlainObject = exports.isNotPlainObj = exports.isNotPair = exports.isNotObjectLike = exports.isNotObject = exports.isNotObjLike = exports.isNotObj = exports.isNotNumber = exports.isNotNull = exports.isNotNilOrEmpty = exports.isNotNil = exports.isNotNaN = exports.isNotMap = exports.isNotInteger = exports.isNotGeneratorFunction = exports.isNotFunction = exports.isNotFloat = exports.isNotFinite = exports.isNotEmpty = exports.isNotDate = exports.isNotBoolean = exports.isNotAsyncFunction = exports.isNotArrayLike = exports.isNotArray = exports.isNonPositive = exports.isNonNegative = exports.isNonEmptyString = exports.isNonEmptyArray = exports.isNilOrEmpty = exports.isNegativeZero = exports.isNegative = exports.isNaturalNumber = exports.isNaN = exports.isMap = exports.isIterable = exports.isInvalidDate = exports.isInteger32 = exports.isInteger = exports.isInt32 = exports.isIndexed = exports.isGeneratorFunction = exports.isFunction = exports.isFloat = exports.isFinite = exports.isFalsy = exports.isFalse = exports.isEven = exports.isError = exports.isEmptyString = exports.isEmptyArray = exports.isDate = exports.isBoolean = exports.isBlank = exports.isBigInt = exports.isAsyncFunction = exports.isArrayLike = exports.isArray = exports.invokeArgs = exports.invoke = exports.included = exports.inRange = exports.fnull = exports.floor = exports.flattenProp = exports.flattenPath = exports.flattenDepth = exports.firstP = exports.findOr = exports.filterIndexed = exports.escapeRegExp = exports.ensureArray = exports.dropArgs = exports.divideNum = exports.dispatch = exports.delayP = exports.defaultWhen = exports.curryRightN = exports.curryRight = exports.copyKeys = exports.concatRight = exports.concatAll = exports.compact = exports.ceil = exports.catchP = exports.cata = exports.async = exports.argsPass = exports.appendFlipped = exports.anyP = exports.allUnique = exports.allSettledP = exports.allP = exports.allIdenticalTo = exports.allIdentical = exports.allEqualTo = exports.allEqual = exports.Y = exports.Identity = void 0;
exports.sortByProp = exports.sortByPaths = exports.sliceTo = exports.sliceFrom = exports.skipTake = exports.sign = exports.sequencing = exports.seq = exports.round = exports.resolveP = exports.replaceAll = exports.repeatStr = exports.renameKeysWith = exports.renameKeys = exports.renameKeyWith = exports.renameKey = exports.rejectP = exports.reduceRightP = exports.reduceP = exports.reduceIndexed = exports.rangeStep = exports.propNotEq = exports.pickIndexes = exports.paths = exports.pathOrLazy = exports.pathNotEq = exports.padStart = exports.padEnd = exports.padCharsStart = exports.padCharsEnd = exports.overlaps = exports.omitIndexes = exports.omitBy = exports.notEqual = exports.notBoth = exports.notAllUnique = exports.notAllPass = exports.nor = exports.noop = exports.nonePass = exports.noneP = exports.neither = exports.nand = exports.move = exports.mergeProps = exports.mergeProp = exports.mergePaths = exports.mergePath = exports.mapIndexed = exports.list = exports.liftFN = exports.liftF = exports.lensTraverse = exports.lensSatisfies = exports.lensNotSatisfy = exports.lensNotEq = exports.lensIso = exports.lensEq = exports.lengthNotEq = exports.lengthLte = exports.lengthLt = exports.lengthGte = exports.lengthGt = exports.lengthEq = exports.lastP = exports.isValidNumber = exports.isValidDate = exports.isUndefined = exports.isUinteger32 = exports.isUint32 = exports.isTruthy = exports.isTrue = exports.isThenable = exports.isSymbol = exports.isString = exports.isSparseArray = exports.isSet = exports.isSentinelValue = exports.isSafeInteger = exports.isRegExp = exports.isPrototypeOf = exports.isPromise = exports.isPrimitive = exports.isPositiveZero = exports.isPositive = exports.isPlainObject = exports.isPlainObj = exports.isPair = exports.isOdd = exports.isObjectLike = exports.isObject = exports.isObjLike = exports.isObj = exports.isNumber = exports.isNull = exports.isNotValidNumber = exports.isNotValidDate = exports.isNotUndefined = exports.isNotString = exports.isNotSet = void 0;
exports.zipObjWith = exports.weaveLazy = exports.weave = exports.viewOr = exports.unzipObjWith = exports.trunc = exports.trimStart = exports.trimRight = exports.trimLeft = exports.trimEnd = exports.trimCharsStart = exports.trimCharsEnd = exports.toUinteger32 = exports.toUint32 = exports.toNumber = exports.toInteger32 = exports.toInt32 = exports.toArray = exports.thenCatchP = exports.subtractNum = exports.stubUndefined = exports.stubString = exports.stubObject = exports.stubObj = exports.stubNull = exports.stubArray = exports.spreadProp = exports.spreadPath = exports.sortByProps = void 0;
var _isNotUndefined = _interopRequireDefault(__webpack_require__(50384));
exports.isNotUndefined = _isNotUndefined["default"];
var _isUndefined = _interopRequireDefault(__webpack_require__(47078));
exports.isUndefined = _isUndefined["default"];
var _isNull = _interopRequireDefault(__webpack_require__(77553));
exports.isNull = _isNull["default"];
var _isNotNull = _interopRequireDefault(__webpack_require__(14533));
exports.isNotNull = _isNotNull["default"];
var _isNotNil = _interopRequireDefault(__webpack_require__(18210));
exports.isNotNil = _isNotNil["default"];
var _isArray = _interopRequireDefault(__webpack_require__(57567));
exports.isArray = _isArray["default"];
var _isIterable = _interopRequireDefault(__webpack_require__(33953));
exports.isIterable = _isIterable["default"];
var _isEmptyArray = _interopRequireDefault(__webpack_require__(54360));
exports.isEmptyArray = _isEmptyArray["default"];
var _isNotArray = _interopRequireDefault(__webpack_require__(52974));
exports.isNotArray = _isNotArray["default"];
var _isNonEmptyArray = _interopRequireDefault(__webpack_require__(98688));
exports.isNonEmptyArray = _isNonEmptyArray["default"];
var _isBoolean = _interopRequireDefault(__webpack_require__(51843));
exports.isBoolean = _isBoolean["default"];
var _isNotBoolean = _interopRequireDefault(__webpack_require__(34098));
exports.isNotBoolean = _isNotBoolean["default"];
var _isNilOrEmpty = _interopRequireDefault(__webpack_require__(77208));
exports.isNilOrEmpty = _isNilOrEmpty["default"];
var _isString = _interopRequireDefault(__webpack_require__(36851));
exports.isString = _isString["default"];
var _isEmptyString = _interopRequireDefault(__webpack_require__(93614));
exports.isEmptyString = _isEmptyString["default"];
var _isNotString = _interopRequireDefault(__webpack_require__(84763));
exports.isNotString = _isNotString["default"];
var _isNonEmptyString = _interopRequireDefault(__webpack_require__(43211));
exports.isNonEmptyString = _isNonEmptyString["default"];
var _isArrayLike = _interopRequireDefault(__webpack_require__(50461));
exports.isArrayLike = _isArrayLike["default"];
var _isNotArrayLike = _interopRequireDefault(__webpack_require__(86997));
exports.isNotArrayLike = _isNotArrayLike["default"];
var _isGeneratorFunction = _interopRequireDefault(__webpack_require__(43010));
exports.isGeneratorFunction = _isGeneratorFunction["default"];
var _isNotGeneratorFunction = _interopRequireDefault(__webpack_require__(94220));
exports.isNotGeneratorFunction = _isNotGeneratorFunction["default"];
var _isAsyncFunction = _interopRequireDefault(__webpack_require__(79503));
exports.isAsyncFunction = _isAsyncFunction["default"];
var _isNotAsyncFunction = _interopRequireDefault(__webpack_require__(87730));
exports.isNotAsyncFunction = _isNotAsyncFunction["default"];
var _isFunction = _interopRequireDefault(__webpack_require__(29179));
exports.isFunction = _isFunction["default"];
var _isNotFunction = _interopRequireDefault(__webpack_require__(23498));
exports.isNotFunction = _isNotFunction["default"];
var _isObj = _interopRequireDefault(__webpack_require__(82806));
exports.isObj = _isObj["default"];
exports.isObject = _isObj["default"];
var _isNotObj = _interopRequireDefault(__webpack_require__(75155));
exports.isNotObj = _isNotObj["default"];
exports.isNotObject = _isNotObj["default"];
var _isObjLike = _interopRequireDefault(__webpack_require__(79685));
exports.isObjLike = _isObjLike["default"];
exports.isObjectLike = _isObjLike["default"];
var _isNotObjLike = _interopRequireDefault(__webpack_require__(88177));
exports.isNotObjLike = _isNotObjLike["default"];
exports.isNotObjectLike = _isNotObjLike["default"];
var _isPlainObj = _interopRequireDefault(__webpack_require__(63252));
exports.isPlainObj = _isPlainObj["default"];
exports.isPlainObject = _isPlainObj["default"];
var _isNotPlainObj = _interopRequireDefault(__webpack_require__(56240));
exports.isNotPlainObj = _isNotPlainObj["default"];
exports.isNotPlainObject = _isNotPlainObj["default"];
var _isDate = _interopRequireDefault(__webpack_require__(11606));
exports.isDate = _isDate["default"];
var _isNotDate = _interopRequireDefault(__webpack_require__(72856));
exports.isNotDate = _isNotDate["default"];
var _isValidDate = _interopRequireDefault(__webpack_require__(62891));
exports.isValidDate = _isValidDate["default"];
var _isNotValidDate = _interopRequireDefault(__webpack_require__(82827));
exports.isNotValidDate = _isNotValidDate["default"];
exports.isInvalidDate = _isNotValidDate["default"];
var _isNumber = _interopRequireDefault(__webpack_require__(3722));
exports.isNumber = _isNumber["default"];
var _isNotNumber = _interopRequireDefault(__webpack_require__(29011));
exports.isNotNumber = _isNotNumber["default"];
var _isPositive = _interopRequireDefault(__webpack_require__(50282));
exports.isPositive = _isPositive["default"];
var _isNegative = _interopRequireDefault(__webpack_require__(47494));
exports.isNegative = _isNegative["default"];
var _isPositiveZero = _interopRequireDefault(__webpack_require__(2947));
exports.isPositiveZero = _isPositiveZero["default"];
var _isNegativeZero = _interopRequireDefault(__webpack_require__(75262));
exports.isNegativeZero = _isNegativeZero["default"];
var _isNotNilOrEmpty = _interopRequireDefault(__webpack_require__(59723));
exports.isNotNilOrEmpty = _isNotNilOrEmpty["default"];
var _isNonPositive = _interopRequireDefault(__webpack_require__(51667));
exports.isNonPositive = _isNonPositive["default"];
var _isNonNegative = _interopRequireDefault(__webpack_require__(6793));
exports.isNonNegative = _isNonNegative["default"];
var _isMap = _interopRequireDefault(__webpack_require__(62439));
exports.isMap = _isMap["default"];
var _isNotMap = _interopRequireDefault(__webpack_require__(52274));
exports.isNotMap = _isNotMap["default"];
var _isNaN = _interopRequireDefault(__webpack_require__(25475));
exports.isNaN = _isNaN["default"];
var _isNotNaN = _interopRequireDefault(__webpack_require__(42428));
exports.isNotNaN = _isNotNaN["default"];
var _isFinite = _interopRequireDefault(__webpack_require__(12785));
exports.isFinite = _isFinite["default"];
var _isNotFinite = _interopRequireDefault(__webpack_require__(61362));
exports.isNotFinite = _isNotFinite["default"];
var _isInteger = _interopRequireDefault(__webpack_require__(16399));
exports.isInteger = _isInteger["default"];
var _isInteger2 = _interopRequireDefault(__webpack_require__(19554));
exports.isInteger32 = _isInteger2["default"];
exports.isInt32 = _isInteger2["default"];
var _isUinteger = _interopRequireDefault(__webpack_require__(14545));
exports.isUinteger32 = _isUinteger["default"];
exports.isUint32 = _isUinteger["default"];
var _isNotInteger = _interopRequireDefault(__webpack_require__(81655));
exports.isNotInteger = _isNotInteger["default"];
var _isBigInt = _interopRequireDefault(__webpack_require__(68214));
exports.isBigInt = _isBigInt["default"];
var _isFloat = _interopRequireDefault(__webpack_require__(1362));
exports.isFloat = _isFloat["default"];
var _isNotFloat = _interopRequireDefault(__webpack_require__(25044));
exports.isNotFloat = _isNotFloat["default"];
var _isValidNumber = _interopRequireDefault(__webpack_require__(56680));
exports.isValidNumber = _isValidNumber["default"];
var _isNotValidNumber = _interopRequireDefault(__webpack_require__(24590));
exports.isNotValidNumber = _isNotValidNumber["default"];
var _isOdd = _interopRequireDefault(__webpack_require__(86334));
exports.isOdd = _isOdd["default"];
var _isEven = _interopRequireDefault(__webpack_require__(95273));
exports.isEven = _isEven["default"];
var _isPair = _interopRequireDefault(__webpack_require__(14653));
exports.isPair = _isPair["default"];
var _isNotPair = _interopRequireDefault(__webpack_require__(24559));
exports.isNotPair = _isNotPair["default"];
var _isThenable = _interopRequireDefault(__webpack_require__(32803));
exports.isThenable = _isThenable["default"];
var _isPromise = _interopRequireDefault(__webpack_require__(92836));
exports.isPromise = _isPromise["default"];
var _isTrue = _interopRequireDefault(__webpack_require__(49702));
exports.isTrue = _isTrue["default"];
var _isFalse = _interopRequireDefault(__webpack_require__(30490));
exports.isFalse = _isFalse["default"];
var _isTruthy = _interopRequireDefault(__webpack_require__(54459));
exports.isTruthy = _isTruthy["default"];
var _isFalsy = _interopRequireDefault(__webpack_require__(62893));
exports.isFalsy = _isFalsy["default"];
var _isRegExp = _interopRequireDefault(__webpack_require__(18380));
exports.isRegExp = _isRegExp["default"];
var _isNotRegExp = _interopRequireDefault(__webpack_require__(80891));
exports.isNotRegExp = _isNotRegExp["default"];
var _isSet = _interopRequireDefault(__webpack_require__(39962));
exports.isSet = _isSet["default"];
var _isNotSet = _interopRequireDefault(__webpack_require__(98043));
exports.isNotSet = _isNotSet["default"];
var _isSparseArray = _interopRequireDefault(__webpack_require__(5971));
exports.isSparseArray = _isSparseArray["default"];
var _isSymbol = _interopRequireDefault(__webpack_require__(53220));
exports.isSymbol = _isSymbol["default"];
var _isSafeInteger = _interopRequireDefault(__webpack_require__(42092));
exports.isSafeInteger = _isSafeInteger["default"];
var _isIndexed = _interopRequireDefault(__webpack_require__(43453));
exports.isIndexed = _isIndexed["default"];
var _isError = _interopRequireDefault(__webpack_require__(38050));
exports.isError = _isError["default"];
var _isNaturalNumber = _interopRequireDefault(__webpack_require__(49362));
exports.isNaturalNumber = _isNaturalNumber["default"];
var _isPrimitive = _interopRequireDefault(__webpack_require__(79541));
exports.isPrimitive = _isPrimitive["default"];
var _isNotPrimitive = _interopRequireDefault(__webpack_require__(40105));
exports.isNotPrimitive = _isNotPrimitive["default"];
var _isSentinelValue = _interopRequireDefault(__webpack_require__(76933));
exports.isSentinelValue = _isSentinelValue["default"];
var _isBlank = _interopRequireDefault(__webpack_require__(23338));
exports.isBlank = _isBlank["default"];
var _stubUndefined = _interopRequireDefault(__webpack_require__(25536));
exports.stubUndefined = _stubUndefined["default"];
var _stubNull = _interopRequireDefault(__webpack_require__(46207));
exports.stubNull = _stubNull["default"];
var _stubObj = _interopRequireDefault(__webpack_require__(36051));
exports.stubObj = _stubObj["default"];
exports.stubObject = _stubObj["default"];
var _stubString = _interopRequireDefault(__webpack_require__(27918));
exports.stubString = _stubString["default"];
var _stubArray = _interopRequireDefault(__webpack_require__(9135));
exports.stubArray = _stubArray["default"];
var _noop = _interopRequireDefault(__webpack_require__(12432));
exports.noop = _noop["default"];
var _liftFN = _interopRequireDefault(__webpack_require__(59492));
exports.liftFN = _liftFN["default"];
var _liftF = _interopRequireDefault(__webpack_require__(36127));
exports.liftF = _liftF["default"];
var _cata = _interopRequireDefault(__webpack_require__(60640));
exports.cata = _cata["default"];
var _weave = _interopRequireDefault(__webpack_require__(699));
exports.weave = _weave["default"];
var _weaveLazy = _interopRequireDefault(__webpack_require__(21638));
exports.weaveLazy = _weaveLazy["default"];
var _curryRightN = _interopRequireDefault(__webpack_require__(78528));
exports.curryRightN = _curryRightN["default"];
var _curryRight = _interopRequireDefault(__webpack_require__(59753));
exports.curryRight = _curryRight["default"];
var _allP = _interopRequireDefault(__webpack_require__(215));
exports.allP = _allP["default"];
var _catchP = _interopRequireDefault(__webpack_require__(69287));
exports.catchP = _catchP["default"];
var _noneP = _interopRequireDefault(__webpack_require__(85414));
exports.noneP = _noneP["default"];
var _resolveP = _interopRequireDefault(__webpack_require__(37555));
exports.resolveP = _resolveP["default"];
var _rejectP = _interopRequireDefault(__webpack_require__(72197));
exports.rejectP = _rejectP["default"];
var _delayP = _interopRequireDefault(__webpack_require__(68824));
exports.delayP = _delayP["default"];
var _thenCatchP = _interopRequireDefault(__webpack_require__(61364));
exports.thenCatchP = _thenCatchP["default"];
var _allSettledP = _interopRequireDefault(__webpack_require__(22081));
exports.allSettledP = _allSettledP["default"];
var _Y = _interopRequireDefault(__webpack_require__(80928));
exports.Y = _Y["default"];
var _seq = _interopRequireDefault(__webpack_require__(18572));
exports.seq = _seq["default"];
exports.sequencing = _seq["default"];
var _dispatch = _interopRequireDefault(__webpack_require__(32372));
exports.dispatch = _dispatch["default"];
var _async = _interopRequireDefault(__webpack_require__(20554));
exports.async = _async["default"];
var _anyP = _interopRequireDefault(__webpack_require__(94180));
exports.anyP = _anyP["default"];
exports.firstP = _anyP["default"];
var _lastP = _interopRequireDefault(__webpack_require__(51528));
exports.lastP = _lastP["default"];
var _fnull = _interopRequireDefault(__webpack_require__(56047));
exports.fnull = _fnull["default"];
var _mapIndexed = _interopRequireDefault(__webpack_require__(42977));
exports.mapIndexed = _mapIndexed["default"];
var _reduceIndexed = _interopRequireDefault(__webpack_require__(11555));
exports.reduceIndexed = _reduceIndexed["default"];
var _filterIndexed = _interopRequireDefault(__webpack_require__(50251));
exports.filterIndexed = _filterIndexed["default"];
var _pickIndexes = _interopRequireDefault(__webpack_require__(14520));
exports.pickIndexes = _pickIndexes["default"];
var _list = _interopRequireDefault(__webpack_require__(55302));
exports.list = _list["default"];
var _ensureArray = _interopRequireDefault(__webpack_require__(36878));
exports.ensureArray = _ensureArray["default"];
var _concatAll = _interopRequireDefault(__webpack_require__(10923));
exports.concatAll = _concatAll["default"];
var _concatRight = _interopRequireDefault(__webpack_require__(31307));
exports.concatRight = _concatRight["default"];
var _reduceP = _interopRequireDefault(__webpack_require__(1726));
exports.reduceP = _reduceP["default"];
var _reduceRightP = _interopRequireDefault(__webpack_require__(16577));
exports.reduceRightP = _reduceRightP["default"];
var _sliceFrom = _interopRequireDefault(__webpack_require__(94237));
exports.sliceFrom = _sliceFrom["default"];
var _sliceTo = _interopRequireDefault(__webpack_require__(68334));
exports.sliceTo = _sliceTo["default"];
var _omitIndexes = _interopRequireDefault(__webpack_require__(20901));
exports.omitIndexes = _omitIndexes["default"];
var _compact = _interopRequireDefault(__webpack_require__(92798));
exports.compact = _compact["default"];
var _appendFlipped = _interopRequireDefault(__webpack_require__(1570));
exports.appendFlipped = _appendFlipped["default"];
var _included = _interopRequireDefault(__webpack_require__(2655));
exports.included = _included["default"];
var _move = _interopRequireDefault(__webpack_require__(61218));
exports.move = _move["default"];
var _lengthGt = _interopRequireDefault(__webpack_require__(66376));
exports.lengthGt = _lengthGt["default"];
var _lengthLt = _interopRequireDefault(__webpack_require__(26539));
exports.lengthLt = _lengthLt["default"];
var _lengthGte = _interopRequireDefault(__webpack_require__(33880));
exports.lengthGte = _lengthGte["default"];
var _lengthLte = _interopRequireDefault(__webpack_require__(42385));
exports.lengthLte = _lengthLte["default"];
var _lengthEq = _interopRequireDefault(__webpack_require__(58481));
exports.lengthEq = _lengthEq["default"];
var _lengthNotEq = _interopRequireDefault(__webpack_require__(17602));
exports.lengthNotEq = _lengthNotEq["default"];
var _allEqual = _interopRequireDefault(__webpack_require__(89303));
exports.allEqual = _allEqual["default"];
var _repeatStr = _interopRequireDefault(__webpack_require__(92845));
exports.repeatStr = _repeatStr["default"];
var _allIdentical = _interopRequireDefault(__webpack_require__(41845));
exports.allIdentical = _allIdentical["default"];
var _allIdenticalTo = _interopRequireDefault(__webpack_require__(38333));
exports.allIdenticalTo = _allIdenticalTo["default"];
var _allEqualTo = _interopRequireDefault(__webpack_require__(76228));
exports.allEqualTo = _allEqualTo["default"];
var _flattenDepth = _interopRequireDefault(__webpack_require__(37689));
exports.flattenDepth = _flattenDepth["default"];
var _toArray = _interopRequireDefault(__webpack_require__(69584));
exports.toArray = _toArray["default"];
var _allUnique = _interopRequireDefault(__webpack_require__(64493));
exports.allUnique = _allUnique["default"];
var _notAllUnique = _interopRequireDefault(__webpack_require__(95026));
exports.notAllUnique = _notAllUnique["default"];
var _sortByProps = _interopRequireDefault(__webpack_require__(7134));
exports.sortByProps = _sortByProps["default"];
var _sortByProp = _interopRequireDefault(__webpack_require__(65493));
exports.sortByProp = _sortByProp["default"];
var _sortByPaths = _interopRequireDefault(__webpack_require__(81757));
exports.sortByPaths = _sortByPaths["default"];
var _skipTake = _interopRequireDefault(__webpack_require__(35246));
exports.skipTake = _skipTake["default"];
var _rangeStep = _interopRequireDefault(__webpack_require__(4675));
exports.rangeStep = _rangeStep["default"];
var _findOr = _interopRequireDefault(__webpack_require__(52085));
exports.findOr = _findOr["default"];
var _invoke = _interopRequireDefault(__webpack_require__(24775));
exports.invoke = _invoke["default"];
var _invokeArgs = _interopRequireDefault(__webpack_require__(61583));
exports.invokeArgs = _invokeArgs["default"];
var _paths = _interopRequireDefault(__webpack_require__(42852));
exports.paths = _paths["default"];
var _renameKey = _interopRequireDefault(__webpack_require__(87706));
exports.renameKey = _renameKey["default"];
var _renameKeys = _interopRequireDefault(__webpack_require__(46351));
exports.renameKeys = _renameKeys["default"];
var _renameKeysWith = _interopRequireDefault(__webpack_require__(21463));
exports.renameKeysWith = _renameKeysWith["default"];
var _renameKeyWith = _interopRequireDefault(__webpack_require__(11052));
exports.renameKeyWith = _renameKeyWith["default"];
var _copyKeys = _interopRequireDefault(__webpack_require__(37143));
exports.copyKeys = _copyKeys["default"];
var _mergeProps = _interopRequireDefault(__webpack_require__(78102));
exports.mergeProps = _mergeProps["default"];
var _mergePaths = _interopRequireDefault(__webpack_require__(75259));
exports.mergePaths = _mergePaths["default"];
var _mergeProp = _interopRequireDefault(__webpack_require__(90829));
exports.mergeProp = _mergeProp["default"];
var _mergePath = _interopRequireDefault(__webpack_require__(67984));
exports.mergePath = _mergePath["default"];
var _omitBy = _interopRequireDefault(__webpack_require__(90882));
exports.omitBy = _omitBy["default"];
var _pathOrLazy = _interopRequireDefault(__webpack_require__(98650));
exports.pathOrLazy = _pathOrLazy["default"];
var _viewOr = _interopRequireDefault(__webpack_require__(62696));
exports.viewOr = _viewOr["default"];
var _spreadProp = _interopRequireDefault(__webpack_require__(17851));
exports.spreadProp = _spreadProp["default"];
var _spreadPath = _interopRequireDefault(__webpack_require__(35681));
exports.spreadPath = _spreadPath["default"];
var _flattenProp = _interopRequireDefault(__webpack_require__(37391));
exports.flattenProp = _flattenProp["default"];
var _flattenPath = _interopRequireDefault(__webpack_require__(87835));
exports.flattenPath = _flattenPath["default"];
var _unzipObjWith = _interopRequireDefault(__webpack_require__(1263));
exports.unzipObjWith = _unzipObjWith["default"];
var _zipObjWith = _interopRequireDefault(__webpack_require__(3207));
exports.zipObjWith = _zipObjWith["default"];
var _isPrototypeOf = _interopRequireDefault(__webpack_require__(67252));
exports.isPrototypeOf = _isPrototypeOf["default"];
var _lensEq = _interopRequireDefault(__webpack_require__(55409));
exports.lensEq = _lensEq["default"];
var _lensNotEq = _interopRequireDefault(__webpack_require__(50448));
exports.lensNotEq = _lensNotEq["default"];
var _lensSatisfies = _interopRequireDefault(__webpack_require__(65268));
exports.lensSatisfies = _lensSatisfies["default"];
var _lensNotSatisfy = _interopRequireDefault(__webpack_require__(84805));
exports.lensNotSatisfy = _lensNotSatisfy["default"];
var _lensTraverse = _interopRequireDefault(__webpack_require__(63481));
exports.lensTraverse = _lensTraverse["default"];
var _lensIso = _interopRequireDefault(__webpack_require__(90024));
exports.lensIso = _lensIso["default"];
var _propNotEq = _interopRequireDefault(__webpack_require__(69788));
exports.propNotEq = _propNotEq["default"];
var _pathNotEq = _interopRequireDefault(__webpack_require__(67638));
exports.pathNotEq = _pathNotEq["default"];
var _inRange = _interopRequireDefault(__webpack_require__(28154));
exports.inRange = _inRange["default"];
var _notEqual = _interopRequireDefault(__webpack_require__(48949));
exports.notEqual = _notEqual["default"];
var _overlaps = _interopRequireDefault(__webpack_require__(88377));
exports.overlaps = _overlaps["default"];
var _isNotEmpty = _interopRequireDefault(__webpack_require__(93848));
exports.isNotEmpty = _isNotEmpty["default"];
var _defaultWhen = _interopRequireDefault(__webpack_require__(31654));
exports.defaultWhen = _defaultWhen["default"];
var _notBoth = _interopRequireDefault(__webpack_require__(28214));
exports.notBoth = _notBoth["default"];
var _nand = _interopRequireDefault(__webpack_require__(82831));
exports.nand = _nand["default"];
var _neither = _interopRequireDefault(__webpack_require__(88760));
exports.neither = _neither["default"];
var _nor = _interopRequireDefault(__webpack_require__(28122));
exports.nor = _nor["default"];
var _notAllPass = _interopRequireDefault(__webpack_require__(60886));
exports.notAllPass = _notAllPass["default"];
var _nonePass = _interopRequireDefault(__webpack_require__(24011));
exports.nonePass = _nonePass["default"];
var _argsPass = _interopRequireDefault(__webpack_require__(62341));
exports.argsPass = _argsPass["default"];
var _dropArgs = _interopRequireDefault(__webpack_require__(19962));
exports.dropArgs = _dropArgs["default"];
var _round = _interopRequireDefault(__webpack_require__(5743));
exports.round = _round["default"];
var _ceil = _interopRequireDefault(__webpack_require__(13515));
exports.ceil = _ceil["default"];
var _divideNum = _interopRequireDefault(__webpack_require__(92464));
exports.divideNum = _divideNum["default"];
var _floor = _interopRequireDefault(__webpack_require__(5062));
exports.floor = _floor["default"];
var _trunc = _interopRequireDefault(__webpack_require__(59927));
exports.trunc = _trunc["default"];
var _sign = _interopRequireDefault(__webpack_require__(49381));
exports.sign = _sign["default"];
var _subtractNum = _interopRequireDefault(__webpack_require__(9130));
exports.subtractNum = _subtractNum["default"];
var _toInteger = _interopRequireDefault(__webpack_require__(22242));
exports.toInteger32 = _toInteger["default"];
exports.toInt32 = _toInteger["default"];
var _toUinteger = _interopRequireDefault(__webpack_require__(24020));
exports.toUinteger32 = _toUinteger["default"];
exports.toUint32 = _toUinteger["default"];
var _toNumber = _interopRequireDefault(__webpack_require__(71370));
exports.toNumber = _toNumber["default"];
var _replaceAll = _interopRequireDefault(__webpack_require__(26390));
exports.replaceAll = _replaceAll["default"];
var _escapeRegExp = _interopRequireDefault(__webpack_require__(74971));
exports.escapeRegExp = _escapeRegExp["default"];
var _trimStart = _interopRequireDefault(__webpack_require__(95498));
exports.trimStart = _trimStart["default"];
exports.trimLeft = _trimStart["default"];
var _trimEnd = _interopRequireDefault(__webpack_require__(66600));
exports.trimEnd = _trimEnd["default"];
exports.trimRight = _trimEnd["default"];
var _trimCharsEnd = _interopRequireDefault(__webpack_require__(17235));
exports.trimCharsEnd = _trimCharsEnd["default"];
var _trimCharsStart = _interopRequireDefault(__webpack_require__(34638));
exports.trimCharsStart = _trimCharsStart["default"];
var _padCharsStart = _interopRequireDefault(__webpack_require__(93160));
exports.padCharsStart = _padCharsStart["default"];
var _padCharsEnd = _interopRequireDefault(__webpack_require__(20597));
exports.padCharsEnd = _padCharsEnd["default"];
var _padEnd = _interopRequireDefault(__webpack_require__(89273));
exports.padEnd = _padEnd["default"];
var _padStart = _interopRequireDefault(__webpack_require__(22974));
exports.padStart = _padStart["default"];
var _Identity = _interopRequireDefault(__webpack_require__(99895));
exports.Identity = _Identity["default"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});