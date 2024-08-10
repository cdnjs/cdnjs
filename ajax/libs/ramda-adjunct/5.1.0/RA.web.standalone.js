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
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 221:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);


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

var Y = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, function (le) {
  return function (f) {
    return f(f);
  }(function (g) {
    return le(function (x) {
      return g(g)(x);
    });
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Y);

/***/ }),

/***/ 6257:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7168);
/* harmony import */ var _lengthLte_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5369);



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
var allEqual = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], (0,_lengthLte_js__WEBPACK_IMPORTED_MODULE_3__["default"])(1)));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (allEqual);

/***/ }),

/***/ 7056:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6679);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7911);


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
var allEqualTo = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (val, list) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(val), list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (allEqualTo);

/***/ }),

/***/ 6194:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9307);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5883);
/* harmony import */ var _lengthLte_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5369);



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
var allIdentical = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(ramda__WEBPACK_IMPORTED_MODULE_3__["default"]), (0,_lengthLte_js__WEBPACK_IMPORTED_MODULE_4__["default"])(1)));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (allIdentical);

/***/ }),

/***/ 9399:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6679);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5883);


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
var allIdenticalTo = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (val, list) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(val), list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (allIdenticalTo);

/***/ }),

/***/ 2121:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9461);


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
var allP = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(Promise.all, Promise));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (allP);

/***/ }),

/***/ 1514:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   allSettledPPonyfill: () => (/* binding */ allSettledPPonyfill),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9461);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);
/* harmony import */ var _internal_ponyfills_Promise_allSettled_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3958);



var allSettledPPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, _internal_ponyfills_Promise_allSettled_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

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
var allSettledP = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Promise.allSettled) ? (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(Promise.allSettled, Promise)) : allSettledPPonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (allSettledP);

/***/ }),

/***/ 7902:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7487);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1618);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7168);
/* harmony import */ var _lengthEq_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6238);



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
var allUnique = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_lengthEq_js__WEBPACK_IMPORTED_MODULE_1__["default"], [ramda__WEBPACK_IMPORTED_MODULE_2__["default"], ramda__WEBPACK_IMPORTED_MODULE_3__["default"]]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (allUnique);

/***/ }),

/***/ 4422:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AggregatedError: () => (/* reexport safe */ _internal_ponyfills_Promise_any_js__WEBPACK_IMPORTED_MODULE_1__.AggregatedError),
/* harmony export */   anyPPonyfill: () => (/* binding */ anyPPonyfill),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9461);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);
/* harmony import */ var _internal_ponyfills_Promise_any_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1590);



var anyPPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, _internal_ponyfills_Promise_any_js__WEBPACK_IMPORTED_MODULE_1__["default"]);


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
var anyP = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Promise.any) ? (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(Promise.any, Promise)) : anyPPonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (anyP);

/***/ }),

/***/ 862:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7293);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5830);


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
var appendFlipped = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (appendFlipped);

/***/ }),

/***/ 9656:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7359);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4052);
/* harmony import */ var _list_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3204);
/* harmony import */ var _isTruthy_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1092);




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
var argsPass = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (combiningPredicate, predicates) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(combiningPredicate(_isTruthy_js__WEBPACK_IMPORTED_MODULE_3__["default"]), _list_js__WEBPACK_IMPORTED_MODULE_4__["default"]), predicates);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (argsPass);

/***/ }),

/***/ 5466:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9461);
/* harmony import */ var _resolveP_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5784);
/* harmony import */ var _rejectP_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2075);




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
var async = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, function (generatorFn) {
  function asyncWrapper() {
    var iterator = (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(generatorFn, this).apply(void 0, arguments);
    var _handle = function handle(result) {
      var resolved = (0,_resolveP_js__WEBPACK_IMPORTED_MODULE_2__["default"])(result.value);
      return result.done ? resolved : resolved.then(function (value) {
        return _handle(iterator.next(value));
      }, function (error) {
        return _handle(iterator["throw"](error));
      });
    };
    try {
      return _handle(iterator.next());
    } catch (error) {
      return (0,_rejectP_js__WEBPACK_IMPORTED_MODULE_3__["default"])(error);
    }
  }
  if (generatorFn.length > 0) {
    return (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(generatorFn.length, asyncWrapper);
  }
  return asyncWrapper;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async);

/***/ }),

/***/ 2871:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3800);



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
var catamorphism = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (leftFn, rightFn, catamorphicObj) {
  // folktale support
  if ((0,_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(catamorphicObj.matchWith)) {
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
  if ((0,_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(catamorphicObj.cata)) {
    return catamorphicObj.cata(leftFn, rightFn);
  }
  if ((0,_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(catamorphicObj.getOrElse)) {
    var elseValue = "RA.cata".concat(Math.random());
    var value = catamorphicObj.getOrElse(elseValue);
    return value === elseValue ? leftFn() : rightFn(value);
  }
  return catamorphicObj.either(leftFn, rightFn);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (catamorphism);

/***/ }),

/***/ 8561:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7898);


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
var catchP = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, 'catch');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (catchP);

/***/ }),

/***/ 30:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9461);


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

var ceil = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(Math.ceil, Math));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ceil);

/***/ }),

/***/ 2823:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6173);
/* harmony import */ var _isFalsy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(97);



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
var compact = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isFalsy_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (compact);

/***/ }),

/***/ 5373:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3628);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5920);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7866);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2366);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5883);
/* harmony import */ var _stubUndefined_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8254);


var leftIdentitySemigroup = {
  concat: ramda__WEBPACK_IMPORTED_MODULE_0__["default"]
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
var concatAll = (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(ramda__WEBPACK_IMPORTED_MODULE_3__["default"], leftIdentitySemigroup), (0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(leftIdentitySemigroup), _stubUndefined_js__WEBPACK_IMPORTED_MODULE_6__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (concatAll);

/***/ }),

/***/ 944:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7293);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7866);


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
var concatRight = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (concatRight);

/***/ }),

/***/ 4757:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var _renameKeys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5190);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



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
var copyKeys = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(2, function (keysMap, obj) {
  return _objectSpread(_objectSpread({}, obj), (0,_renameKeys_js__WEBPACK_IMPORTED_MODULE_1__["default"])(keysMap, obj));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (copyKeys);

/***/ }),

/***/ 147:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7487);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1618);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3628);
/* harmony import */ var _curryRightN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4961);



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
var curryRight = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_curryRightN_js__WEBPACK_IMPORTED_MODULE_1__["default"], [ramda__WEBPACK_IMPORTED_MODULE_2__["default"], ramda__WEBPACK_IMPORTED_MODULE_3__["default"]]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (curryRight);

/***/ }),

/***/ 4961:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5506);


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
var curryRightN = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(2, function (arity, fn) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(arity, function wrapper() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return fn.apply(this, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(args));
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (curryRightN);

/***/ }),

/***/ 9999:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);


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
var defaultWhen = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (predicate, defaultVal, val) {
  return predicate(val) ? defaultVal : val;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaultWhen);

/***/ }),

/***/ 5029:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6850);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4073);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9538);
/* harmony import */ var _isNonNegative_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4102);
/* harmony import */ var _isInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(920);




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

var makeDelay = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (settleFnPicker, opts) {
  var timeout;
  var value;
  if ((0,_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"])(opts) && (0,_isNonNegative_js__WEBPACK_IMPORTED_MODULE_2__["default"])(opts)) {
    timeout = opts;
  } else {
    timeout = (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(0, 'timeout', opts);
    value = (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(value, 'value', opts);
  }
  return new Promise(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var settleFn = settleFnPicker(args);
    setTimeout((0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])(settleFn, [value]), timeout);
  });
});
var delayP = makeDelay((0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(0));
delayP.reject = makeDelay((0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(1));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (delayP);

/***/ }),

/***/ 9366:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2142);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8278);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8804);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5987);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(526);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5920);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8564);
/* harmony import */ var _isNotNil_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5368);
/* harmony import */ var _isNonEmptyArray_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6019);
/* harmony import */ var _stubUndefined_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8254);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }


/**
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



var byArity = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (a, b) {
  return a.length > b.length;
});
var getMaxArity = (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(byArity), ramda__WEBPACK_IMPORTED_MODULE_3__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])('length'));
var iteratorFn = (0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(function (args, accumulator, fn) {
  var result = fn.apply(void 0, _toConsumableArray(args));
  return (0,_isNotNil_js__WEBPACK_IMPORTED_MODULE_6__["default"])(result) ? (0,ramda__WEBPACK_IMPORTED_MODULE_7__["default"])(result) : accumulator;
});
var dispatchImpl = function dispatchImpl(functions) {
  var arity = getMaxArity(functions);
  return (0,ramda__WEBPACK_IMPORTED_MODULE_8__["default"])(arity, function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return (0,ramda__WEBPACK_IMPORTED_MODULE_9__["default"])(iteratorFn(args), undefined, functions);
  });
};
var dispatch = (0,ramda__WEBPACK_IMPORTED_MODULE_10__["default"])(_isNonEmptyArray_js__WEBPACK_IMPORTED_MODULE_11__["default"], dispatchImpl, _stubUndefined_js__WEBPACK_IMPORTED_MODULE_12__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dispatch);

/***/ }),

/***/ 9033:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7293);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4827);


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
var divideNum = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (divideNum);

/***/ }),

/***/ 612:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8922);


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
var dropArgs = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(0);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dropArgs);

/***/ }),

/***/ 6089:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2366);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4787);
/* harmony import */ var _isNotArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3002);



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
var ensureArray = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isNotArray_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(Array));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ensureArray);

/***/ }),

/***/ 406:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2366);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8276);
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9705);



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
var escapeRegExp = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isString_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(/[.*+?^${}()|[\]\\-]/g, '\\$&'));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (escapeRegExp);

/***/ }),

/***/ 7405:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4421);
/* harmony import */ var _mapping_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2105);
/* harmony import */ var _traits_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7814);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




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
  return _createClass(Identity, [{
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
      return _traits_js__WEBPACK_IMPORTED_MODULE_0__.applyTrait[_mapping_js__WEBPACK_IMPORTED_MODULE_1__.ap].call(this, applyWithFn);
    }
  }, {
    key: "ap",
    value: function ap(applyWithFn) {
      return this[_mapping_js__WEBPACK_IMPORTED_MODULE_1__.ap](applyWithFn);
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
      return _traits_js__WEBPACK_IMPORTED_MODULE_0__.functorTrait[_mapping_js__WEBPACK_IMPORTED_MODULE_1__.map].call(this, fn);
    }
  }, {
    key: "map",
    value: function map(fn) {
      return this[_mapping_js__WEBPACK_IMPORTED_MODULE_1__.map](fn);
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
      return _traits_js__WEBPACK_IMPORTED_MODULE_0__.setoidTrait[_mapping_js__WEBPACK_IMPORTED_MODULE_1__.equals].call(this, setoid);
    }
  }, {
    key: "equals",
    value: function equals(setoid) {
      return this[_mapping_js__WEBPACK_IMPORTED_MODULE_1__.equals](setoid);
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
      return _traits_js__WEBPACK_IMPORTED_MODULE_0__.semigroupTrait[_mapping_js__WEBPACK_IMPORTED_MODULE_1__.concat].call(this, semigroup);
    }
  }, {
    key: "concat",
    value: function concat(semigroup) {
      return this[_mapping_js__WEBPACK_IMPORTED_MODULE_1__.concat](semigroup);
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
      return _traits_js__WEBPACK_IMPORTED_MODULE_0__.chainTrait[_mapping_js__WEBPACK_IMPORTED_MODULE_1__.chain].call(this, fn);
    }
  }, {
    key: "chain",
    value: function chain(fn) {
      return this[_mapping_js__WEBPACK_IMPORTED_MODULE_1__.chain](fn);
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
      return _traits_js__WEBPACK_IMPORTED_MODULE_0__.ordTrait[_mapping_js__WEBPACK_IMPORTED_MODULE_1__.lte].call(this, ord);
    }
  }, {
    key: "lte",
    value: function lte(ord) {
      return this[_mapping_js__WEBPACK_IMPORTED_MODULE_1__.lte](ord);
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
      return this.constructor.of((0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(this.value));
    }
  }, {
    key: "empty",
    value: function empty() {
      return this[_mapping_js__WEBPACK_IMPORTED_MODULE_1__.empty]();
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
      return this[_mapping_js__WEBPACK_IMPORTED_MODULE_1__.contramap](fn);
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
}(_mapping_js__WEBPACK_IMPORTED_MODULE_1__.of, _mapping_js__WEBPACK_IMPORTED_MODULE_1__.ap, _mapping_js__WEBPACK_IMPORTED_MODULE_1__.map, _mapping_js__WEBPACK_IMPORTED_MODULE_1__.equals, _mapping_js__WEBPACK_IMPORTED_MODULE_1__.concat, _mapping_js__WEBPACK_IMPORTED_MODULE_1__.chain, _mapping_js__WEBPACK_IMPORTED_MODULE_1__.lte, _mapping_js__WEBPACK_IMPORTED_MODULE_1__.empty, _mapping_js__WEBPACK_IMPORTED_MODULE_1__.contramap);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Identity);

/***/ }),

/***/ 2105:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   alt: () => (/* binding */ alt),
/* harmony export */   ap: () => (/* binding */ ap),
/* harmony export */   bimap: () => (/* binding */ bimap),
/* harmony export */   chain: () => (/* binding */ chain),
/* harmony export */   chainRec: () => (/* binding */ chainRec),
/* harmony export */   compose: () => (/* binding */ compose),
/* harmony export */   concat: () => (/* binding */ concat),
/* harmony export */   contramap: () => (/* binding */ contramap),
/* harmony export */   empty: () => (/* binding */ empty),
/* harmony export */   equals: () => (/* binding */ equals),
/* harmony export */   extend: () => (/* binding */ extend),
/* harmony export */   extract: () => (/* binding */ extract),
/* harmony export */   id: () => (/* binding */ id),
/* harmony export */   lte: () => (/* binding */ lte),
/* harmony export */   map: () => (/* binding */ map),
/* harmony export */   of: () => (/* binding */ of),
/* harmony export */   promap: () => (/* binding */ promap),
/* harmony export */   reduce: () => (/* binding */ reduce),
/* harmony export */   traverse: () => (/* binding */ traverse),
/* harmony export */   zero: () => (/* binding */ zero)
/* harmony export */ });
var equals = 'fantasy-land/equals';
var lte = 'fantasy-land/lte';
var compose = 'fantasy-land/compose';
var id = 'fantasy-land/id';
var concat = 'fantasy-land/concat';
var empty = 'fantasy-land/empty';
var map = 'fantasy-land/map';
var contramap = 'fantasy-land/contramap';
var ap = 'fantasy-land/ap';
var of = 'fantasy-land/of';
var alt = 'fantasy-land/alt';
var zero = 'fantasy-land/zero';
var reduce = 'fantasy-land/reduce';
var traverse = 'fantasy-land/traverse';
var chain = 'fantasy-land/chain';
var chainRec = 'fantasy-land/chainRec';
var extend = 'fantasy-land/extend';
var extract = 'fantasy-land/extract';
var bimap = 'fantasy-land/bimap';
var promap = 'fantasy-land/promap';

/***/ }),

/***/ 7814:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyTrait: () => (/* binding */ applyTrait),
/* harmony export */   chainTrait: () => (/* binding */ chainTrait),
/* harmony export */   functorTrait: () => (/* binding */ functorTrait),
/* harmony export */   ordTrait: () => (/* binding */ ordTrait),
/* harmony export */   semigroupTrait: () => (/* binding */ semigroupTrait),
/* harmony export */   setoidTrait: () => (/* binding */ setoidTrait)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7911);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7924);
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9705);
/* harmony import */ var _isNumber_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7301);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3800);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7675);
/* harmony import */ var _mapping_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2105);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






var functorTrait = _defineProperty({}, _mapping_js__WEBPACK_IMPORTED_MODULE_0__.map, function (fn) {
  return this.constructor[_mapping_js__WEBPACK_IMPORTED_MODULE_0__.of](fn(this.value));
});
var applyTrait = _defineProperty({}, _mapping_js__WEBPACK_IMPORTED_MODULE_0__.ap, function (applyWithFn) {
  var _this = this;
  return applyWithFn.map(function (fn) {
    return fn(_this.value);
  });
});
var setoidTrait = _defineProperty({}, _mapping_js__WEBPACK_IMPORTED_MODULE_0__.equals, function (setoid) {
  return (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.isSameType)(this, setoid) && (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(this.value, setoid.value);
});
var semigroupTrait = _defineProperty({}, _mapping_js__WEBPACK_IMPORTED_MODULE_0__.concat, function (semigroup) {
  var concatenatedValue = this.value;
  if ((0,_isString_js__WEBPACK_IMPORTED_MODULE_3__["default"])(this.value) || (0,_isNumber_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this.value)) {
    concatenatedValue = this.value + semigroup.value;
  } else if ((0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(_isFunction_js__WEBPACK_IMPORTED_MODULE_6__["default"], ['value', _mapping_js__WEBPACK_IMPORTED_MODULE_0__.concat], this)) {
    concatenatedValue = this.value[_mapping_js__WEBPACK_IMPORTED_MODULE_0__.concat](semigroup.value);
  } else if ((0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(_isFunction_js__WEBPACK_IMPORTED_MODULE_6__["default"], ['value', 'concat'], this)) {
    concatenatedValue = this.value.concat(semigroup.value);
  }
  return this.constructor[_mapping_js__WEBPACK_IMPORTED_MODULE_0__.of](concatenatedValue);
});
var chainTrait = _defineProperty({}, _mapping_js__WEBPACK_IMPORTED_MODULE_0__.chain, function (fn) {
  var newChain = fn(this.value);
  return (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.isSameType)(this, newChain) ? newChain : this;
});
var ordTrait = _defineProperty({}, _mapping_js__WEBPACK_IMPORTED_MODULE_0__.lte, function (ord) {
  return (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.isSameType)(this, ord) && (this.value < ord.value || this[_mapping_js__WEBPACK_IMPORTED_MODULE_0__.equals](ord));
});

/***/ }),

/***/ 7675:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNotSameType: () => (/* binding */ isNotSameType),
/* harmony export */   isSameType: () => (/* binding */ isSameType),
/* harmony export */   type: () => (/* binding */ type),
/* harmony export */   typeEquals: () => (/* binding */ typeEquals)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(292);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4445);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7359);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7911);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5690);


// type :: Monad a => a -> String
var type = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(['@@type']), (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(['constructor', '@@type']));

// typeEquals :: Monad a => String -> a -> Boolean
var typeEquals = (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(function (typeIdent, monad) {
  return type(monad) === typeIdent;
});

// isSameType :: (Monad a, Monad b) => a -> b -> Boolean
var isSameType = (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(2, (0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])(ramda__WEBPACK_IMPORTED_MODULE_5__["default"], [type, type]));

// isNotSameType :: (Monad a, Monad b) => a -> b -> Boolean
var isNotSameType = (0,ramda__WEBPACK_IMPORTED_MODULE_6__["default"])(isSameType);

/***/ }),

/***/ 3529:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2219);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2720);


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
var filterIndexed = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (filterIndexed);

/***/ }),

/***/ 1922:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4745);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7012);


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

var findOr = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (defaultVal, fn, list) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(fn), (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(defaultVal))(list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (findOr);

/***/ }),

/***/ 8823:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4295);
/* harmony import */ var _internal_makeFlat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9937);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }


var flatten1 = (0,_internal_makeFlat_js__WEBPACK_IMPORTED_MODULE_0__["default"])(false);

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
var flattenDepth = (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(function (depth, list) {
  var currentDept = depth;
  var flatList = _toConsumableArray(list);
  while (currentDept > 0) {
    flatList = flatten1(flatList);
    currentDept -= 1;
  }
  return flatList;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (flattenDepth);

/***/ }),

/***/ 4351:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1319);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2220);


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
var flattenPath = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (path, obj) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(obj, (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])({}, path, obj));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (flattenPath);

/***/ }),

/***/ 6781:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4787);
/* harmony import */ var _flattenPath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4351);



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
var flattenProp = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (prop, obj) {
  return (0,_flattenPath_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(Array, prop), obj);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (flattenProp);

/***/ }),

/***/ 752:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9461);


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

var floor = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(Math.floor, Math));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (floor);

/***/ }),

/***/ 6694:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1647);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6476);
/* harmony import */ var _defaultWhen_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9999);
/* harmony import */ var _mapIndexed_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2579);




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

var fnull = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (fn, defaults) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(fn.length, function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var argsWithDefaults = (0,_mapIndexed_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function (val, idx) {
      return (0,_defaultWhen_js__WEBPACK_IMPORTED_MODULE_3__["default"])(ramda__WEBPACK_IMPORTED_MODULE_4__["default"], defaults[idx], val);
    }, args);
    return (0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(fn, argsWithDefaults);
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fnull);

/***/ }),

/***/ 2186:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8564);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7359);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(625);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5507);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1821);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4295);

var inRangeImp = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"], function () {
  throw new Error('low must not be greater than high in inRange(low, high, value)');
}, (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(ramda__WEBPACK_IMPORTED_MODULE_3__["default"], [ramda__WEBPACK_IMPORTED_MODULE_4__["default"], ramda__WEBPACK_IMPORTED_MODULE_5__["default"]]));

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,ramda__WEBPACK_IMPORTED_MODULE_6__["default"])(function (low, high, value) {
  return inRangeImp(low, high)(value);
}));

/***/ }),

/***/ 1424:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7293);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1487);


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
var included = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (included);

/***/ }),

/***/ 7061:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(292);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7924);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(625);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4087);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);
/* harmony import */ var _fantasy_land_mapping_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2105);



var isFunctor = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"], ['map']), (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"], [_fantasy_land_mapping_js__WEBPACK_IMPORTED_MODULE_3__.map]));
var isApply = (0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])(isFunctor, (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"], ['ap']), (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"], [_fantasy_land_mapping_js__WEBPACK_IMPORTED_MODULE_3__.ap])));
var ap = (0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(2, function (applyF, applyX) {
  // return original ramda `ap` if not Apply spec
  if (!isApply(applyF) || !isApply(applyX)) {
    return (0,ramda__WEBPACK_IMPORTED_MODULE_6__["default"])(applyF, applyX);
  }
  try {
    // new version of `ap` starting from ramda version > 0.23.0
    return applyF.ap(applyX);
  } catch (e) {
    // old version of `ap` till ramda version <= 0.23.0
    return applyX.ap(applyF);
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ap);

/***/ }),

/***/ 2329:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4052);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1618);

var compareLength = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (comparator, value, list) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(comparator(value), ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (compareLength);

/***/ }),

/***/ 9884:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(625);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9947);
/* harmony import */ var _isObj_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9719);
/* harmony import */ var _isSymbol_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2912);
/* harmony import */ var _neither_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9609);




var isCoercible = (0,_neither_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_isSymbol_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(_isObj_js__WEBPACK_IMPORTED_MODULE_3__["default"], (0,_neither_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])('toString'), (0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])('valueOf'))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isCoercible);

/***/ }),

/***/ 5410:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var isOfTypeObject = function isOfTypeObject(val) {
  return _typeof(val) === 'object';
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isOfTypeObject);

/***/ }),

/***/ 9937:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9032);


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
      if ((0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list[idx])) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (makeFlat);

/***/ }),

/***/ 3010:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9461);
/* harmony import */ var _isIterable_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1730);
/* harmony import */ var _isNotUndefined_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6391);
/* harmony import */ var _isNotNil_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5368);
/* harmony import */ var _isNotFunction_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(691);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }





var copyArray = function copyArray(items, mapFn, thisArg) {
  var boundMapFn = (0,_isNotUndefined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(thisArg) ? (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(mapFn, thisArg) : mapFn;
  return (0,_isNotUndefined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(mapFn) ? _toConsumableArray(items).map(boundMapFn) : _toConsumableArray(items);
};
var fromArray = function fromArray(items, mapFn, thisArg) {
  if (items == null) {
    throw new TypeError('Array.from requires an array-like object - not null or undefined');
  }
  if ((0,_isNotNil_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mapFn) && (0,_isNotFunction_js__WEBPACK_IMPORTED_MODULE_3__["default"])(mapFn)) {
    throw new TypeError('Array.from: when provided, the second argument must be a function');
  }
  if ((0,_isIterable_js__WEBPACK_IMPORTED_MODULE_4__["default"])(items)) {
    return copyArray(items, mapFn, thisArg);
  }
  return [];
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fromArray);

/***/ }),

/***/ 8674:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var signPonyfill = function signPonyfill(number) {
  return (number > 0) - (number < 0) || +number;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (signPonyfill);

/***/ }),

/***/ 3153:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isFinite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3099);

var truncPonyfill = function truncPonyfill(v) {
  var numV = Number(v);
  if (!(0,_isFinite_js__WEBPACK_IMPORTED_MODULE_0__["default"])(numV)) {
    return numV;
  }

  // eslint-disable-next-line no-nested-ternary
  return numV - numV % 1 || (numV < 0 ? -0 : numV === 0 ? numV : 0);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (truncPonyfill);

/***/ }),

/***/ 3885:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MAX_SAFE_INTEGER);

/***/ }),

/***/ 9825:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(625);
/* harmony import */ var _isNumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7301);



// eslint-disable-next-line no-restricted-globals
var isFinitePonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"], isFinite);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isFinitePonyfill);

/***/ }),

/***/ 3238:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(625);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7487);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7911);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3628);
/* harmony import */ var _isFinite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3099);


var isIntegerPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isFinite_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(ramda__WEBPACK_IMPORTED_MODULE_3__["default"], [Math.floor, ramda__WEBPACK_IMPORTED_MODULE_4__["default"]]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isIntegerPonyfill);

/***/ }),

/***/ 7221:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(625);
/* harmony import */ var _isNumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7301);



// eslint-disable-next-line no-restricted-globals
var isNaNPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"], isNaN);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNaNPonyfill);

/***/ }),

/***/ 9541:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(625);
/* harmony import */ var _isInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(920);
/* harmony import */ var _Number_MAX_SAFE_INTEGER_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3885);



var isSafeIntegerPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"], function (value) {
  return Math.abs(value) <= _Number_MAX_SAFE_INTEGER_js__WEBPACK_IMPORTED_MODULE_2__["default"];
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSafeIntegerPonyfill);

/***/ }),

/***/ 3958:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2598);
/* harmony import */ var _allP_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2121);
/* harmony import */ var _resolveP_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5784);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }



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
  var array = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (p) {
    return (0,_resolveP_js__WEBPACK_IMPORTED_MODULE_1__["default"])(p).then(onFulfill)["catch"](onReject);
  }, _toConsumableArray(iterable));
  return (0,_allP_js__WEBPACK_IMPORTED_MODULE_2__["default"])(array);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (allSettledPonyfill);

/***/ }),

/***/ 1590:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AggregatedError: () => (/* binding */ AggregatedError),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2598);
/* harmony import */ var _resolveP_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5784);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }


var AggregatedError = /*#__PURE__*/function (_Error) {
  function AggregatedError() {
    var _this;
    var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    _classCallCheck(this, AggregatedError);
    _this = _callSuper(this, AggregatedError, [message]);
    _this.errors = errors;
    return _this;
  }
  _inherits(AggregatedError, _Error);
  return _createClass(AggregatedError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
var anyPonyfill = function anyPonyfill(iterable) {
  var exceptions = [];
  return new Promise(function (resolve, reject) {
    var onReject = function onReject(e) {
      exceptions.push(e);
      if (exceptions.length === iterable.length) {
        reject(new AggregatedError(exceptions));
      }
    };
    (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (p) {
      return (0,_resolveP_js__WEBPACK_IMPORTED_MODULE_1__["default"])(p).then(resolve)["catch"](onReject);
    }, _toConsumableArray(iterable));
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (anyPonyfill);

/***/ }),

/***/ 2724:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3800);
/* harmony import */ var _isNotUndefined_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6391);
/* harmony import */ var _String_repeat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1237);



var padEndPonyfill = function padEndPonyfill(padString, targetLength, value) {
  // eslint-disable-next-line no-bitwise
  var finalLength = targetLength >> 0;
  var finalPadString = String((0,_isNotUndefined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(padString) ? padString : ' ');
  if (value.length > finalLength) {
    return String(value);
  }
  finalLength -= value.length;
  if (finalLength > finalPadString.length) {
    var remainingLength = finalLength / finalPadString.length;
    finalPadString += (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(String.prototype.repeat) ? finalPadString.repeat(remainingLength) : (0,_String_repeat_js__WEBPACK_IMPORTED_MODULE_2__["default"])(finalPadString, remainingLength);
  }
  return String(value) + finalPadString.slice(0, finalLength);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (padEndPonyfill);

/***/ }),

/***/ 4989:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3800);
/* harmony import */ var _isNotUndefined_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6391);
/* harmony import */ var _String_repeat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1237);



var padStartPonyfill = function padStartPonyfill(padString, targetLength, value) {
  // eslint-disable-next-line no-bitwise
  var finalLength = targetLength >> 0; // truncate if number, or convert non-number to 0;
  var finalPadString = String((0,_isNotUndefined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(padString) ? padString : ' ');

  // return the original string, if targeted length is less than original strings length
  if (value.length >= finalLength) {
    return String(value);
  }
  finalLength -= value.length;
  if (finalLength > finalPadString.length) {
    var lenghtToPad = finalLength / finalPadString.length;
    // append to original to ensure we are longer than needed
    finalPadString += (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(String.prototype.repeat) ? finalPadString.repeat(lenghtToPad) : (0,_String_repeat_js__WEBPACK_IMPORTED_MODULE_2__["default"])(finalPadString, lenghtToPad);
  }
  return finalPadString.slice(0, finalLength) + String(value);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (padStartPonyfill);

/***/ }),

/***/ 1237:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isNotFinite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6784);
/* harmony import */ var _isNegative_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9267);


var repeat = function repeat(value, count) {
  var validCount = Number(count);
  if (validCount !== count) {
    validCount = 0;
  }
  if ((0,_isNegative_js__WEBPACK_IMPORTED_MODULE_0__["default"])(validCount)) {
    throw new RangeError('repeat count must be non-negative');
  }
  if ((0,_isNotFinite_js__WEBPACK_IMPORTED_MODULE_1__["default"])(validCount)) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (repeat);

/***/ }),

/***/ 4905:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8276);
/* harmony import */ var _isRegExp_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1833);
/* harmony import */ var _escapeRegExp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(406);



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
  var regexp = new RegExp((0,_isRegExp_js__WEBPACK_IMPORTED_MODULE_0__["default"])(searchValue) ? searchValue : (0,_escapeRegExp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(searchValue), 'g');
  return (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(regexp, replaceValue, str);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (replaceAll);

/***/ }),

/***/ 3561:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8276);

var trimStart = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(/[\s\uFEFF\xA0]+$/, '');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (trimStart);

/***/ }),

/***/ 8232:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8276);

var trimStart = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(/^[\s\uFEFF\xA0]+/, '');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (trimStart);

/***/ }),

/***/ 9308:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3700);
/* harmony import */ var _invokeArgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2053);



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
var invoke = (0,_invokeArgs_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"], [], ramda__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (invoke);

/***/ }),

/***/ 2053:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4445);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6196);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9461);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6476);
/* harmony import */ var _isNotFunction_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(691);
/* harmony import */ var _isEmptyArray_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9222);




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

var invokeArgs = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(3, function (mpath, args, obj) {
  var method = (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(mpath, obj);
  var context = (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(mpath), obj);
  if ((0,_isNotFunction_js__WEBPACK_IMPORTED_MODULE_3__["default"])(method)) return undefined;
  if ((0,_isEmptyArray_js__WEBPACK_IMPORTED_MODULE_4__["default"])(mpath)) return undefined;
  var boundMethod = (0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(method, context);
  return (0,ramda__WEBPACK_IMPORTED_MODULE_6__["default"])(boundMethod, args);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (invokeArgs);

/***/ }),

/***/ 4111:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1322);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5883);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3800);



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
var isArray = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Array.isArray) ? Array.isArray : (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(ramda__WEBPACK_IMPORTED_MODULE_3__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])('Array')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isArray);

/***/ }),

/***/ 9032:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3236);
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4111);
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9705);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }




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
var isArrayLike = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, function (val) {
  if ((0,_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val)) {
    return true;
  }
  if (!val) {
    return false;
  }
  if ((0,_isString_js__WEBPACK_IMPORTED_MODULE_2__["default"])(val)) {
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
    return (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(0, val) && (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(val.length - 1, val);
  }
  return false;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isArrayLike);

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

/***/ }),

/***/ 1586:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1322);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5883);


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
var isAsyncFunction = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])('AsyncFunction')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isAsyncFunction);

/***/ }),

/***/ 8147:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1322);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5883);


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
var isBigInt = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])('BigInt')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isBigInt);

/***/ }),

/***/ 5796:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3755);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1647);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3557);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3218);
/* harmony import */ var _isFalse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(821);


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
var isBlank = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])([_isFalse_js__WEBPACK_IMPORTED_MODULE_1__["default"], ramda__WEBPACK_IMPORTED_MODULE_2__["default"], ramda__WEBPACK_IMPORTED_MODULE_3__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])(/^\s+$/gm)]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isBlank);

/***/ }),

/***/ 8762:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1322);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5883);


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
var isBoolean = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])('Boolean')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isBoolean);

/***/ }),

/***/ 5900:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1322);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5883);


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
var isDate = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])('Date')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isDate);

/***/ }),

/***/ 9222:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(625);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3557);
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4111);



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
var isEmptyArray = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"], ramda__WEBPACK_IMPORTED_MODULE_2__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isEmptyArray);

/***/ }),

/***/ 4458:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7911);


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
var isEmptyString = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])('');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isEmptyString);

/***/ }),

/***/ 2296:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1322);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5883);


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
var isError = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])('Error')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isError);

/***/ }),

/***/ 4220:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(625);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5690);
/* harmony import */ var _isInteger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(920);
/* harmony import */ var _isOdd_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1299);




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
var isEven = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(_isInteger_js__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(_isOdd_js__WEBPACK_IMPORTED_MODULE_4__["default"])));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isEven);

/***/ }),

/***/ 821:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5883);


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

var isFalse = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(false));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isFalse);

/***/ }),

/***/ 97:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isTruthy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1092);



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
var isFalsy = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isTruthy_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isFalsy);

/***/ }),

/***/ 3099:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isFinitePonyfill: () => (/* binding */ isFinitePonyfill)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9461);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);
/* harmony import */ var _internal_ponyfills_Number_isFinite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9825);



var isFinitePonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, _internal_ponyfills_Number_isFinite_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

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
var _isFinite = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Number.isFinite) ? (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(Number.isFinite, Number)) : isFinitePonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_isFinite);

/***/ }),

/***/ 3020:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(625);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5690);
/* harmony import */ var _isInteger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(920);
/* harmony import */ var _isFinite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3099);




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
var isFloat = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isFinite_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(_isInteger_js__WEBPACK_IMPORTED_MODULE_3__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isFloat);

/***/ }),

/***/ 3800:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3755);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1322);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5883);
/* harmony import */ var _isGeneratorFunction_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4455);
/* harmony import */ var _isAsyncFunction_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1586);




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
var isFunction = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])([(0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])('Function')), _isGeneratorFunction_js__WEBPACK_IMPORTED_MODULE_4__["default"], _isAsyncFunction_js__WEBPACK_IMPORTED_MODULE_5__["default"]]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isFunction);

/***/ }),

/***/ 4455:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1322);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5883);


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
var isGeneratorFunction = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])('GeneratorFunction')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isGeneratorFunction);

/***/ }),

/***/ 8111:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(292);
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4111);
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9705);




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

var isIndexed = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(_isString_js__WEBPACK_IMPORTED_MODULE_2__["default"], _isArray_js__WEBPACK_IMPORTED_MODULE_3__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isIndexed);

/***/ }),

/***/ 920:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isIntegerPonyfill: () => (/* binding */ isIntegerPonyfill)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9461);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);
/* harmony import */ var _internal_ponyfills_Number_isInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3238);



var isIntegerPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, _internal_ponyfills_Number_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

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
var isInteger = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Number.isInteger) ? (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(Number.isInteger, Number)) : isIntegerPonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isInteger);

/***/ }),

/***/ 9713:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var _toInteger32_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1798);



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
var isInteger32 = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, function (val) {
  return (0,_toInteger32_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val) === val;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isInteger32);

/***/ }),

/***/ 1730:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9947);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);



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
var isIterable = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, function (val) {
  if (typeof Symbol === 'undefined') {
    return false;
  }
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(Symbol.iterator, Object(val)) && (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(val[Symbol.iterator]);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isIterable);

/***/ }),

/***/ 6152:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1322);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5883);


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

var isMap = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])('Map')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isMap);

/***/ }),

/***/ 19:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isNaNPonyfill: () => (/* binding */ isNaNPonyfill)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);
/* harmony import */ var _internal_ponyfills_Number_isNaN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7221);



var isNaNPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, _internal_ponyfills_Number_isNaN_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

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
var _isNaN = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Number.isNaN) ? (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, Number.isNaN) : isNaNPonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_isNaN);

/***/ }),

/***/ 2562:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(625);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5690);
/* harmony import */ var _isInteger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(920);
/* harmony import */ var _isNegative_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9267);




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

var isNaturalNumber = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(_isInteger_js__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(_isNegative_js__WEBPACK_IMPORTED_MODULE_4__["default"])));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNaturalNumber);

/***/ }),

/***/ 9267:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(625);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1821);
/* harmony import */ var _isNumber_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7301);



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
var isNegative = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(_isNumber_js__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(0)));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNegative);

/***/ }),

/***/ 3897:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5883);


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
var isNegativeZero = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(-0));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNegativeZero);

/***/ }),

/***/ 9251:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(292);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1647);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3557);


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
var isNilOrEmpty = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], ramda__WEBPACK_IMPORTED_MODULE_3__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNilOrEmpty);

/***/ }),

/***/ 6019:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(625);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6536);
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4111);



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
var isNonEmptyArray = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"], ramda__WEBPACK_IMPORTED_MODULE_2__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNonEmptyArray);

/***/ }),

/***/ 9533:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8714);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6536);
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9705);
/* harmony import */ var _isNotObj_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2402);




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
var isNonEmptyString = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])([_isString_js__WEBPACK_IMPORTED_MODULE_1__["default"], _isNotObj_js__WEBPACK_IMPORTED_MODULE_2__["default"], ramda__WEBPACK_IMPORTED_MODULE_3__["default"]]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNonEmptyString);

/***/ }),

/***/ 4102:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(625);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7293);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5182);
/* harmony import */ var _isNumber_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7301);



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
var isNonNegative = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(_isNumber_js__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(ramda__WEBPACK_IMPORTED_MODULE_4__["default"])(0)));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNonNegative);

/***/ }),

/***/ 4146:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(625);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7293);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5507);
/* harmony import */ var _isNumber_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7301);



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
var isNonPositive = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(_isNumber_js__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(ramda__WEBPACK_IMPORTED_MODULE_4__["default"])(0)));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNonPositive);

/***/ }),

/***/ 3002:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4111);



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
var isNotArray = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotArray);

/***/ }),

/***/ 997:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9032);



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
var isNotArrayLike = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotArrayLike);

/***/ }),

/***/ 495:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isAsyncFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1586);



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
var isNotAsyncFunction = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isAsyncFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotAsyncFunction);

/***/ }),

/***/ 2607:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isBoolean_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8762);



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
var isNotBoolean = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isBoolean_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotBoolean);

/***/ }),

/***/ 5847:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isDate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5900);



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
var isNotDate = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isDate_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotDate);

/***/ }),

/***/ 6784:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isFinite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3099);



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
var isNotFinite = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isFinite_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotFinite);

/***/ }),

/***/ 633:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5690);
/* harmony import */ var _isFloat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3020);



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
var isNotFloat = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(_isFloat_js__WEBPACK_IMPORTED_MODULE_2__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotFloat);

/***/ }),

/***/ 691:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3800);



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
var isNotFunction = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotFunction);

/***/ }),

/***/ 1750:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isGeneratorFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4455);



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
var isNotGeneratorFunction = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isGeneratorFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotGeneratorFunction);

/***/ }),

/***/ 6857:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(920);



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
var isNotInteger = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotInteger);

/***/ }),

/***/ 9101:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6152);



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

var isNotMap = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isMap_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotMap);

/***/ }),

/***/ 3258:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isNaN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);



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
var isNotNaN = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isNaN_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotNaN);

/***/ }),

/***/ 5368:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1647);


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
var isNotNil = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotNil);

/***/ }),

/***/ 108:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isNilOrEmpty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9251);



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
var isNotNilOrEmpty = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isNilOrEmpty_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotNilOrEmpty);

/***/ }),

/***/ 8010:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isNull_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5681);



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
var isNotNull = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isNull_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotNull);

/***/ }),

/***/ 5702:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isNumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7301);



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
var isNotNumber = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotNumber);

/***/ }),

/***/ 2402:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isObj_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9719);



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
var isNotObj = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isObj_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotObj);

/***/ }),

/***/ 3245:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isObjLike_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9456);



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
var isNotObjLike = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isObjLike_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotObjLike);

/***/ }),

/***/ 2279:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isPair_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8712);



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
var isNotPair = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isPair_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotPair);

/***/ }),

/***/ 4766:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isPlainObj_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6005);



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
var isNotPlainObj = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isPlainObj_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotPlainObj);

/***/ }),

/***/ 8486:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5690);
/* harmony import */ var _isPrimitive_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8055);



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

var isNotPrimitive = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(_isPrimitive_js__WEBPACK_IMPORTED_MODULE_2__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotPrimitive);

/***/ }),

/***/ 2106:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isRegExp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1833);



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
var isNotRegExp = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isRegExp_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotRegExp);

/***/ }),

/***/ 1979:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isSet_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5138);



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

var isNotSet = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isSet_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotSet);

/***/ }),

/***/ 5614:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9705);



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
var isNotString = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isString_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotString);

/***/ }),

/***/ 6391:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isUndefined_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9290);



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
var isNotUndefined = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotUndefined);

/***/ }),

/***/ 1437:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isValidDate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9176);



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
var isNotValidDate = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isValidDate_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotValidDate);

/***/ }),

/***/ 6184:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _isValidNumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4313);



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
var isNotValidNumber = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isValidNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotValidNumber);

/***/ }),

/***/ 5681:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7911);


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
var isNull = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(null);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNull);

/***/ }),

/***/ 7301:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1322);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5883);


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
var isNumber = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])('Number')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNumber);

/***/ }),

/***/ 9719:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(625);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(292);
/* harmony import */ var _isNotNull_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8010);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3800);
/* harmony import */ var _internal_isOfTypeObject_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5410);





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
var isObj = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(_isNotNull_js__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(_internal_isOfTypeObject_js__WEBPACK_IMPORTED_MODULE_4__["default"], _isFunction_js__WEBPACK_IMPORTED_MODULE_5__["default"])));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isObj);

/***/ }),

/***/ 9456:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(625);
/* harmony import */ var _isNotNull_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8010);
/* harmony import */ var _internal_isOfTypeObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5410);




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
var isObjLike = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(_isNotNull_js__WEBPACK_IMPORTED_MODULE_2__["default"], _internal_isOfTypeObject_js__WEBPACK_IMPORTED_MODULE_3__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isObjLike);

/***/ }),

/***/ 1299:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(625);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7293);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6744);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5690);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7911);
/* harmony import */ var _isInteger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(920);



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
var isOdd = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(_isInteger_js__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])(ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(2), (0,ramda__WEBPACK_IMPORTED_MODULE_6__["default"])(ramda__WEBPACK_IMPORTED_MODULE_7__["default"])(0))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isOdd);

/***/ }),

/***/ 8712:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(625);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1618);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7911);
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4111);



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
var isPair = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(_isArray_js__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(ramda__WEBPACK_IMPORTED_MODULE_4__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(2))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isPair);

/***/ }),

/***/ 6005:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1322);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5883);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2338);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7911);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7924);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(625);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5845);
/* harmony import */ var _isNull_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5681);
/* harmony import */ var _isObjLike_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9456);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3800);




var isObject = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])('Object'));
var isObjectConstructor = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_3__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(Object)));
var hasObjectConstructor = (0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_6__["default"])(_isFunction_js__WEBPACK_IMPORTED_MODULE_7__["default"], isObjectConstructor), ['constructor']);

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
var isPlainObj = (0,ramda__WEBPACK_IMPORTED_MODULE_8__["default"])(1, function (val) {
  if (!(0,_isObjLike_js__WEBPACK_IMPORTED_MODULE_9__["default"])(val) || !isObject(val)) {
    return false;
  }
  var proto = Object.getPrototypeOf(val);
  if ((0,_isNull_js__WEBPACK_IMPORTED_MODULE_10__["default"])(proto)) {
    return true;
  }
  return hasObjectConstructor(proto);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isPlainObj);

/***/ }),

/***/ 4651:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(625);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6586);
/* harmony import */ var _isNumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7301);



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
var isPositive = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(0));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isPositive);

/***/ }),

/***/ 2913:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5883);


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
var isPositiveZero = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(+0));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isPositiveZero);

/***/ }),

/***/ 8055:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(625);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3755);
/* harmony import */ var _isNotObj_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2402);
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9705);
/* harmony import */ var _isNumber_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7301);
/* harmony import */ var _isBigInt_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8147);
/* harmony import */ var _isBoolean_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8762);
/* harmony import */ var _isUndefined_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9290);
/* harmony import */ var _isNull_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5681);
/* harmony import */ var _isSymbol_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2912);










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

var isPrimitive = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isNotObj_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])([_isString_js__WEBPACK_IMPORTED_MODULE_3__["default"], _isNumber_js__WEBPACK_IMPORTED_MODULE_4__["default"], _isBigInt_js__WEBPACK_IMPORTED_MODULE_5__["default"], _isBoolean_js__WEBPACK_IMPORTED_MODULE_6__["default"], _isUndefined_js__WEBPACK_IMPORTED_MODULE_7__["default"], _isNull_js__WEBPACK_IMPORTED_MODULE_8__["default"], _isSymbol_js__WEBPACK_IMPORTED_MODULE_9__["default"]]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isPrimitive);

/***/ }),

/***/ 9567:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(625);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2338);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7911);
/* harmony import */ var _isObj_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9719);



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
var isPromise = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(_isObj_js__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(ramda__WEBPACK_IMPORTED_MODULE_4__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])('[object Promise]'))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isPromise);

/***/ }),

/***/ 1677:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var _invokeArgs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2053);



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
var isPrototypeOf = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (type, object) {
  return Boolean((0,_invokeArgs_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['prototype', 'isPrototypeOf'], [object], type));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isPrototypeOf);

/***/ }),

/***/ 1833:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1322);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5883);


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
var isRegExp = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])('RegExp')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isRegExp);

/***/ }),

/***/ 4727:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isSafeIntegerPonyfill: () => (/* binding */ isSafeIntegerPonyfill)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9461);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);
/* harmony import */ var _internal_ponyfills_Number_isSafeInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9541);



var isSafeIntegerPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, _internal_ponyfills_Number_isSafeInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

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

var isSafeInteger = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Number.isSafeInteger) ? (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(Number.isSafeInteger, Number)) : isSafeIntegerPonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSafeInteger);

/***/ }),

/***/ 155:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var _isInteger32_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9713);



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
 */
// eslint-disable-next-line no-bitwise
var isSentinelValue = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, function (val) {
  return (0,_isInteger32_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val) && ~val === 0;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSentinelValue);

/***/ }),

/***/ 5138:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1322);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5883);


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

var isSet = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])('Set')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSet);

/***/ }),

/***/ 2451:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(625);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7487);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5690);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5883);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2060);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1618);
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4111);



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
var isSparseArray = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(ramda__WEBPACK_IMPORTED_MODULE_4__["default"]), [(0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(ramda__WEBPACK_IMPORTED_MODULE_6__["default"], ramda__WEBPACK_IMPORTED_MODULE_7__["default"]), ramda__WEBPACK_IMPORTED_MODULE_7__["default"]]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSparseArray);

/***/ }),

/***/ 9705:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1322);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5883);


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
var isString = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])('String')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isString);

/***/ }),

/***/ 2912:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1322);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }


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
var isSymbol = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, function (val) {
  return _typeof(val) === 'symbol' || _typeof(val) === 'object' && (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(val) === 'Symbol';
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSymbol);

/***/ }),

/***/ 2199:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7924);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3800);



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
var isThenable = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"], ['then']);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isThenable);

/***/ }),

/***/ 5828:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5883);


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

var isTrue = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(true));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isTrue);

/***/ }),

/***/ 1092:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);


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
var isTruthy = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, Boolean);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isTruthy);

/***/ }),

/***/ 270:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var _toUinteger32_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7575);



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
var isUinteger32 = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, function (val) {
  return (0,_toUinteger32_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val) === val;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isUinteger32);

/***/ }),

/***/ 9290:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7911);
/* harmony import */ var _stubUndefined_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8254);



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
var isUndefined = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_stubUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"])());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isUndefined);

/***/ }),

/***/ 9176:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(625);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7898);
/* harmony import */ var _isDate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5900);
/* harmony import */ var _isNotNaN_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3258);




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
var isValidDate = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(_isDate_js__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])(0, 'getTime'), _isNotNaN_js__WEBPACK_IMPORTED_MODULE_5__["default"])));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isValidDate);

/***/ }),

/***/ 4313:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(292);
/* harmony import */ var _isFloat_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3020);
/* harmony import */ var _isInteger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(920);




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
var isValidNumber = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(_isInteger_js__WEBPACK_IMPORTED_MODULE_2__["default"], _isFloat_js__WEBPACK_IMPORTED_MODULE_3__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isValidNumber);

/***/ }),

/***/ 2726:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9461);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2598);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3022);
/* harmony import */ var _allP_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2121);
/* harmony import */ var _lengthEq_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6238);
/* harmony import */ var _lengthGte_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2544);
/* harmony import */ var _rejectP_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2075);
/* harmony import */ var _resolveP_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5784);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }







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
var lastP = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, function (iterable) {
  var fulfilled = [];
  var rejected = [];
  var onFulfill = (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(fulfilled.push, fulfilled);
  var onReject = (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(rejected.push, rejected);
  var listOfPromises = (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(function (p) {
    return (0,_resolveP_js__WEBPACK_IMPORTED_MODULE_3__["default"])(p).then(onFulfill)["catch"](onReject);
  }, _toConsumableArray(iterable));
  return (0,_allP_js__WEBPACK_IMPORTED_MODULE_4__["default"])(listOfPromises).then(function () {
    if ((0,_lengthEq_js__WEBPACK_IMPORTED_MODULE_5__["default"])(0, fulfilled) && (0,_lengthEq_js__WEBPACK_IMPORTED_MODULE_5__["default"])(0, rejected)) {
      return undefined;
    }
    if ((0,_lengthGte_js__WEBPACK_IMPORTED_MODULE_6__["default"])(1, fulfilled)) {
      return (0,ramda__WEBPACK_IMPORTED_MODULE_7__["default"])(fulfilled);
    }
    return (0,_rejectP_js__WEBPACK_IMPORTED_MODULE_8__["default"])(rejected);
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lastP);

/***/ }),

/***/ 6238:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7911);
/* harmony import */ var _internal_compareLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2329);



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
var lengthEq = (0,_internal_compareLength_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lengthEq);

/***/ }),

/***/ 451:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7293);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1821);
/* harmony import */ var _internal_compareLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2329);



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
var lengthGt = (0,_internal_compareLength_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lengthGt);

/***/ }),

/***/ 2544:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7293);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5182);
/* harmony import */ var _internal_compareLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2329);



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
var lengthGte = (0,_internal_compareLength_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lengthGte);

/***/ }),

/***/ 2076:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7293);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6586);
/* harmony import */ var _internal_compareLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2329);



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
var lengthLt = (0,_internal_compareLength_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lengthLt);

/***/ }),

/***/ 5369:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7293);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5507);
/* harmony import */ var _internal_compareLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2329);



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
var lengthLte = (0,_internal_compareLength_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lengthLte);

/***/ }),

/***/ 4045:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5690);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7911);
/* harmony import */ var _internal_compareLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2329);



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
var lengthNotEq = (0,_internal_compareLength_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lengthNotEq);

/***/ }),

/***/ 4998:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2291);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7911);


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
var lensEq = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(3, function (lens, val, data) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(lens), (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(val))(data);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lensEq);

/***/ }),

/***/ 955:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2598);


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
  return isomorphic((0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (toFunctorFn, target) {
    return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(from, toFunctorFn(to(target)));
  }), (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (toFunctorFn, target) {
    return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(to, toFunctorFn(from(target)));
  }));
};

// from :: Isomorphism -> a -> b
var from = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (isomorphism, x) {
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
var lensIso = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(isomorphisms);
lensIso.from = from;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lensIso);

/***/ }),

/***/ 8181:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _lensEq_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4998);



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
var lensNotEq = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_lensEq_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lensNotEq);

/***/ }),

/***/ 430:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _lensSatisfies_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(607);



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
var lensNotSatisfy = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_lensSatisfies_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lensNotSatisfy);

/***/ }),

/***/ 607:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2291);
/* harmony import */ var _isTrue_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5828);



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
var lensSatisfies = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(3, function (predicate, lens, data) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(lens), predicate, _isTrue_js__WEBPACK_IMPORTED_MODULE_3__["default"])(data);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lensSatisfies);

/***/ }),

/***/ 1614:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(796);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5987);
/* harmony import */ var _fantasy_land_Identity_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7405);



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
var lensTraverse = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, function (F) {
  var of = typeof F['fantasy-land/of'] === 'function' ? F['fantasy-land/of'] : typeof F.of === 'function' ? F.of : F;
  var TypeRep = {
    'fantasy-land/of': of
  };
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(function (toFunctorFn, target) {
    return _fantasy_land_Identity_js__WEBPACK_IMPORTED_MODULE_2__["default"].of((0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(TypeRep, (0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])(toFunctorFn, (0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])('value')), target));
  });
});
/* eslint-enable */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lensTraverse);

/***/ }),

/***/ 5547:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var _liftFN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(249);



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
var liftF = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, function (fn) {
  return (0,_liftFN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fn.length, fn);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (liftF);

/***/ }),

/***/ 249:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2598);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8804);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7094);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5920);
/* harmony import */ var _internal_ap_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7061);



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
var liftFN = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (arity, fn) {
  var lifted = (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(arity, fn);
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(arity, function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var accumulator = (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(lifted, (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(args));
    var apps = (0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])(1, Infinity, args);
    return (0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(_internal_ap_js__WEBPACK_IMPORTED_MODULE_6__["default"], accumulator, apps);
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (liftFN);

/***/ }),

/***/ 3204:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3121);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3628);


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
var list = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (list);

/***/ }),

/***/ 2579:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2219);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2598);


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
var mapIndexed = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mapIndexed);

/***/ }),

/***/ 2737:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7992);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7749);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4149);


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
var mergePath = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (path, source, obj) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(path), (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(source), obj);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergePath);

/***/ }),

/***/ 8164:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3345);
/* harmony import */ var _paths_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3418);



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
var mergePaths = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(2, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(_paths_js__WEBPACK_IMPORTED_MODULE_2__["default"], ramda__WEBPACK_IMPORTED_MODULE_3__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergePaths);

/***/ }),

/***/ 7559:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4787);
/* harmony import */ var _mergePath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2737);



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
var mergeProp = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (p, subj, obj) {
  return (0,_mergePath_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(Array, p), subj, obj);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeProp);

/***/ }),

/***/ 3586:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8422);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3345);


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
var mergeProps = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(2, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], ramda__WEBPACK_IMPORTED_MODULE_3__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeProps);

/***/ }),

/***/ 3073:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4052);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2307);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9538);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(954);


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
var move = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (fromIdx, toIdx, list) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(toIdx, (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(fromIdx, list)), (0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])(fromIdx, 1))(list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (move);

/***/ }),

/***/ 7827:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1021);


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
var nand = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"]); // eslint-disable-line ramda/complement-simplification

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nand);

/***/ }),

/***/ 9609:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4052);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5690);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(292);


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
var neither = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], ramda__WEBPACK_IMPORTED_MODULE_3__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (neither);

/***/ }),

/***/ 9360:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2598);
/* harmony import */ var _allP_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2121);
/* harmony import */ var _rejectP_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2075);
/* harmony import */ var _resolveP_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5784);





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
var noneP = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(_resolveP_js__WEBPACK_IMPORTED_MODULE_3__["default"]), (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(function (p) {
  return p.then(_rejectP_js__WEBPACK_IMPORTED_MODULE_4__["default"], _resolveP_js__WEBPACK_IMPORTED_MODULE_3__["default"]);
}), _allP_js__WEBPACK_IMPORTED_MODULE_5__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (noneP);

/***/ }),

/***/ 5131:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4052);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5690);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3755);


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
var nonePass = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], ramda__WEBPACK_IMPORTED_MODULE_3__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nonePass);

/***/ }),

/***/ 4512:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6183);
/* harmony import */ var _stubUndefined_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8254);



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
var noop = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_stubUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"])());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (noop);

/***/ }),

/***/ 397:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4407);


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
var nor = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"]); // eslint-disable-line ramda/complement-simplification

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nor);

/***/ }),

/***/ 3833:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4052);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5690);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8714);


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
var notAllPass = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], ramda__WEBPACK_IMPORTED_MODULE_3__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (notAllPass);

/***/ }),

/***/ 2855:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var _allUnique_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7902);



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
var notAllUnique = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_allUnique_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (notAllUnique);

/***/ }),

/***/ 8076:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4052);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5690);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(625);


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
var notBoth = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], ramda__WEBPACK_IMPORTED_MODULE_3__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (notBoth);

/***/ }),

/***/ 7383:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7911);


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
var notEqual = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (notEqual);

/***/ }),

/***/ 5376:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7359);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3778);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5690);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3628);


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
var omitBy = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"], [ramda__WEBPACK_IMPORTED_MODULE_2__["default"], ramda__WEBPACK_IMPORTED_MODULE_3__["default"]]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (omitBy);

/***/ }),

/***/ 1153:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2219);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6173);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1487);


// helpers
var rejectIndexed = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"]);
var containsIndex = (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(function (indexes, val, index) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(index, indexes);
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
var omitIndexes = (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(function (indexes, list) {
  return rejectIndexed(containsIndex(indexes), list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (omitIndexes);

/***/ }),

/***/ 1200:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3557);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3971);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6536);


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

var overlaps = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(2, function (list1, list2) {
  if ((0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(list1)) {
    return true;
  }
  return (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(ramda__WEBPACK_IMPORTED_MODULE_3__["default"], ramda__WEBPACK_IMPORTED_MODULE_4__["default"])(list1, list2);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (overlaps);

/***/ }),

/***/ 1213:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   padEndInvoker: () => (/* binding */ padEndInvoker),
/* harmony export */   padEndPonyfill: () => (/* binding */ padEndPonyfill)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7293);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7898);
/* harmony import */ var _internal_ponyfills_String_padEnd_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2724);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3800);



var padEndPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_internal_ponyfills_String_padEnd_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
var padEndInvoker = (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(2, 'padEnd'));

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
var padCharsEnd = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_4__["default"])(String.prototype.padEnd) ? padEndInvoker : padEndPonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (padCharsEnd);

/***/ }),

/***/ 9332:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   padStartInvoker: () => (/* binding */ padStartInvoker),
/* harmony export */   padStartPonyfill: () => (/* binding */ padStartPonyfill)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7293);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7898);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4295);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3800);
/* harmony import */ var _internal_ponyfills_String_padStart_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4989);



var padStartInvoker = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(2, 'padStart'));
var padStartPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(_internal_ponyfills_String_padStart_js__WEBPACK_IMPORTED_MODULE_3__["default"]);

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
var padCharsStart = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_4__["default"])(String.prototype.padStart) ? padStartInvoker : padStartPonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (padCharsStart);

/***/ }),

/***/ 9673:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _padCharsEnd_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1213);


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
var padEnd = (0,_padCharsEnd_js__WEBPACK_IMPORTED_MODULE_0__["default"])(' ');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (padEnd);

/***/ }),

/***/ 5691:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _padCharsStart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9332);


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
var padStart = (0,_padCharsStart_js__WEBPACK_IMPORTED_MODULE_0__["default"])(' ');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (padStart);

/***/ }),

/***/ 8380:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);


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
var pathNotEq = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pathNotEq);

/***/ }),

/***/ 5988:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2366);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5883);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4073);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3163);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2220);


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
var pathOrLazy = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(3, function (defaultFn, path, obj) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(defaultFn), (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])(defaultFn), [obj]), (0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(defaultFn, path, obj));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pathOrLazy);

/***/ }),

/***/ 3418:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4087);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4445);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3700);


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
var paths = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (ps, obj) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])([(0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(ramda__WEBPACK_IMPORTED_MODULE_3__["default"], obj)], ps);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (paths);

/***/ }),

/***/ 2609:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2219);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2720);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1487);


// helpers
var filterIndexed = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"]);
var containsIndex = (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(function (indexes, val, index) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(index, indexes);
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
var pickIndexes = (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(function (indexes, list) {
  return filterIndexed(containsIndex(indexes), list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pickIndexes);

/***/ }),

/***/ 9502:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5690);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5201);


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
var propNotEq = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (propNotEq);

/***/ }),

/***/ 7649:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6183);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2598);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5361);
/* harmony import */ var _floor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(752);



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
var rangeStep = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(3, function (step, from, to) {
  var callback = step === 0 ? (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(from) : function (n) {
    return from + step * n;
  };
  var rangeEnd = step === 0 ? to - from : (0,_floor_js__WEBPACK_IMPORTED_MODULE_2__["default"])((to - from) / step);
  return (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(callback, (0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])(0, rangeEnd));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rangeStep);

/***/ }),

/***/ 5745:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2219);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5920);


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
var reduceIndexed = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reduceIndexed);

/***/ }),

/***/ 7360:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1618);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5920);
/* harmony import */ var _isUndefined_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9290);
/* harmony import */ var _resolveP_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5784);
/* harmony import */ var _allP_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2121);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





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
var reduceP = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(3, function (fn, acc, list) {
  return (0,_resolveP_js__WEBPACK_IMPORTED_MODULE_1__["default"])(list).then(function (iterable) {
    var listLength = (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(iterable);
    if (listLength === 0) {
      return acc;
    }
    var reducer = (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(function (accP, currentValueP) {
      return accP.then(function (previousValue) {
        return (0,_allP_js__WEBPACK_IMPORTED_MODULE_4__["default"])([previousValue, currentValueP]);
      }).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          previousValue = _ref2[0],
          currentValue = _ref2[1];
        if ((0,_isUndefined_js__WEBPACK_IMPORTED_MODULE_5__["default"])(previousValue) && listLength === 1) {
          return currentValue;
        }
        return fn(previousValue, currentValue);
      });
    });
    return reducer((0,_resolveP_js__WEBPACK_IMPORTED_MODULE_1__["default"])(acc), iterable);
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reduceP);

/***/ }),

/***/ 3968:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4804);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7866);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7911);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1618);
/* harmony import */ var _isUndefined_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9290);
/* harmony import */ var _resolveP_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5784);
/* harmony import */ var _allP_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2121);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





// in older ramda versions the order of the arguments is flipped
var flipArgs = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], ''), (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])('ba'))(['a', 'b']);

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
var reduceRightP = (0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])(3, function (fn, acc, list) {
  return (0,_resolveP_js__WEBPACK_IMPORTED_MODULE_5__["default"])(list).then(function (iterable) {
    var listLength = (0,ramda__WEBPACK_IMPORTED_MODULE_6__["default"])(iterable);
    if (listLength === 0) {
      return acc;
    }
    var reducer = (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(function (arg1, arg2) {
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
        return (0,_allP_js__WEBPACK_IMPORTED_MODULE_7__["default"])([previousValue, currentValueP]);
      }).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          previousValue = _ref2[0],
          currentValue = _ref2[1];
        if ((0,_isUndefined_js__WEBPACK_IMPORTED_MODULE_8__["default"])(previousValue) && listLength === 1) {
          return currentValue;
        }
        return fn(currentValue, previousValue);
      });
    });
    return reducer((0,_resolveP_js__WEBPACK_IMPORTED_MODULE_5__["default"])(acc), iterable);
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reduceRightP);

/***/ }),

/***/ 2075:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9461);


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
var rejectP = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(Promise.reject, Promise);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rejectP);

/***/ }),

/***/ 627:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var _renameKeys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5190);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



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
var renameKey = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (oldKey, newKey, obj) {
  return (0,_renameKeys_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_defineProperty({}, oldKey, newKey), obj);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renameKey);

/***/ }),

/***/ 3883:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2366);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7911);
/* harmony import */ var _renameKeysWith_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2546);



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
var renameKeyWith = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (fn, key, obj) {
  return (0,_renameKeysWith_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(key), fn), obj);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renameKeyWith);

/***/ }),

/***/ 5190:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3236);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4295);
/* harmony import */ var _renameKeysWith_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2546);


var valueOrKey = function valueOrKey(keysMap) {
  return function (key) {
    if ((0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(key, keysMap)) {
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
var renameKeys = (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(function (keysMap, obj) {
  return (0,_renameKeysWith_js__WEBPACK_IMPORTED_MODULE_2__["default"])(valueOrKey(keysMap), obj);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renameKeys);

/***/ }),

/***/ 2546:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2374);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2598);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7992);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8711);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1421);


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
var renameKeysWith = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (fn, obj) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(0), fn)), ramda__WEBPACK_IMPORTED_MODULE_6__["default"])(obj);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renameKeysWith);

/***/ }),

/***/ 252:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   repeatStrInvoker: () => (/* binding */ repeatStrInvoker),
/* harmony export */   repeatStrPonyfill: () => (/* binding */ repeatStrPonyfill)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7293);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7898);
/* harmony import */ var _internal_ponyfills_String_repeat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1237);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3800);



var repeatStrPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_internal_ponyfills_String_repeat_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
var repeatStrInvoker = (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(1, 'repeat'));

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
var repeatStr = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_4__["default"])(String.prototype.repeat) ? repeatStrInvoker : repeatStrPonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (repeatStr);

/***/ }),

/***/ 6487:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   replaceAllInvoker: () => (/* binding */ replaceAllInvoker),
/* harmony export */   replaceAllPonyfill: () => (/* binding */ replaceAllPonyfill)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7898);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3800);
/* harmony import */ var _internal_ponyfills_String_replaceAll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4905);



var replaceAllPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(3, _internal_ponyfills_String_replaceAll_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
var replaceAllInvoker = (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(2, 'replaceAll');

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
var replaceAll = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_3__["default"])(String.prototype.replaceAll) ? replaceAllInvoker : replaceAllPonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (replaceAll);

/***/ }),

/***/ 5784:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9461);


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
var resolveP = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(Promise.resolve, Promise);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (resolveP);

/***/ }),

/***/ 3798:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9461);


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

var round = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(Math.round, Math));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (round);

/***/ }),

/***/ 2961:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4193);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2598);


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

var seq = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (fns, x) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(function (tx) {
    return (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(function (fn) {
      return fn(tx);
    })(fns);
  })(x);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (seq);

/***/ }),

/***/ 9069:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   signPonyfill: () => (/* binding */ signPonyfill)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9461);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);
/* harmony import */ var _internal_ponyfills_Math_sign_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8674);



var signPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, _internal_ponyfills_Math_sign_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

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

var sign = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Math.sign) ? (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(Math.sign, Math)) : signPonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sign);

/***/ }),

/***/ 5780:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2219);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2720);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4032);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6744);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3700);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5883);


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

var skipTake = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (n, list) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])(1), (0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(ramda__WEBPACK_IMPORTED_MODULE_6__["default"], n), (0,ramda__WEBPACK_IMPORTED_MODULE_7__["default"])(0)))(list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (skipTake);

/***/ }),

/***/ 6936:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7094);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3700);


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
var sliceFrom = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"], Infinity);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliceFrom);

/***/ }),

/***/ 7285:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7094);


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
var sliceTo = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(0);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliceTo);

/***/ }),

/***/ 481:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4445);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9968);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2598);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7359);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2610);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3628);

var pathToAscendSort = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"], ramda__WEBPACK_IMPORTED_MODULE_2__["default"]);
var mapPathsToAscendSort = (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(pathToAscendSort);

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

var sortByPaths = (0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])(ramda__WEBPACK_IMPORTED_MODULE_5__["default"], [mapPathsToAscendSort, ramda__WEBPACK_IMPORTED_MODULE_6__["default"]]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sortByPaths);

/***/ }),

/***/ 7320:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5830);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3700);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7359);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3628);
/* harmony import */ var _sortByProps_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2999);



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

var addValueInAnArray = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"], []);
var sortByProp = (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(_sortByProps_js__WEBPACK_IMPORTED_MODULE_3__["default"], [addValueInAnArray, ramda__WEBPACK_IMPORTED_MODULE_4__["default"]]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sortByProp);

/***/ }),

/***/ 2999:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5920);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(292);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2142);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6586);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5987);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8278);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2598);
function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }


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

var sortByProps = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (props, list) {
  var firstTruthy = function firstTruthy(_ref) {
    var _ref2 = _toArray(_ref),
      head = _ref2[0],
      tail = _ref2.slice(1);
    return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], head, tail);
  };
  var makeComparator = function makeComparator(propName) {
    return (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(function (a, b) {
      return (0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(propName, a), (0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(propName, b));
    });
  };
  return (0,ramda__WEBPACK_IMPORTED_MODULE_6__["default"])(firstTruthy((0,ramda__WEBPACK_IMPORTED_MODULE_7__["default"])(makeComparator, props)), list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sortByProps);

/***/ }),

/***/ 3708:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7487);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1319);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9234);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2220);


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
var spreadPath = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(2, (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], [ramda__WEBPACK_IMPORTED_MODULE_3__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])({})]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (spreadPath);

/***/ }),

/***/ 4834:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4787);
/* harmony import */ var _spreadPath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3708);



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
var spreadProp = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (prop, obj) {
  return (0,_spreadPath_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(Array, prop), obj);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (spreadProp);

/***/ }),

/***/ 5667:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stubArray);

/***/ }),

/***/ 141:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6183);


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
var stubNull = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(null);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stubNull);

/***/ }),

/***/ 2019:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stubObj);

/***/ }),

/***/ 4461:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6183);


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
var stubString = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])('');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stubString);

/***/ }),

/***/ 8254:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6183);


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
var stubUndefined = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(void 0); // eslint-disable-line no-void

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stubUndefined);

/***/ }),

/***/ 6954:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7293);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3766);


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
var subtractNum = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(ramda__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (subtractNum);

/***/ }),

/***/ 1538:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   thenCatchP: () => (/* binding */ thenCatchP)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7898);


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
var thenCatchP = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(2, 'then');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (thenCatchP);

/***/ }),

/***/ 5592:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   fromPonyfill: () => (/* binding */ fromPonyfill)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8564);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2060);
/* harmony import */ var _isIterable_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1730);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);
/* harmony import */ var _internal_ponyfills_Array_from_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3010);




var fromPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, _internal_ponyfills_Array_from_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
var fromArray = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Array.from) ? (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, Array.from) : fromPonyfill;

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

var toArray = (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(_isIterable_js__WEBPACK_IMPORTED_MODULE_4__["default"], fromArray, ramda__WEBPACK_IMPORTED_MODULE_5__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toArray);

/***/ }),

/***/ 1798:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);

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
 */
// eslint-disable-next-line no-bitwise
var toInteger32 = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, function (val) {
  return val >> 0;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toInteger32);

/***/ }),

/***/ 356:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8564);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6183);
/* harmony import */ var _internal_isCoercible_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9884);



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
var toNumber = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(_internal_isCoercible_js__WEBPACK_IMPORTED_MODULE_1__["default"], Number, (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(NaN));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toNumber);

/***/ }),

/***/ 7575:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);


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
 */

// eslint-disable-next-line no-bitwise
var toUinteger32 = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, function (val) {
  return val >>> 0;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toUinteger32);

/***/ }),

/***/ 3802:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(516);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2358);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6910);
/* harmony import */ var _included_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1424);



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

var trimCharsEnd = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (chars, value) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(''), (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_included_js__WEBPACK_IMPORTED_MODULE_4__["default"])(chars)), (0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(''))(value);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (trimCharsEnd);

/***/ }),

/***/ 3287:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4295);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(516);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7926);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6910);
/* harmony import */ var _included_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1424);



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

var trimCharsStart = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(function (chars, value) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(''), (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_included_js__WEBPACK_IMPORTED_MODULE_4__["default"])(chars)), (0,ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(''))(value);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (trimCharsStart);

/***/ }),

/***/ 6571:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   trimEndInvoker: () => (/* binding */ trimEndInvoker),
/* harmony export */   trimEndPonyfill: () => (/* binding */ trimEndPonyfill)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7898);
/* harmony import */ var _internal_ponyfills_String_trimEnd_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3561);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);



var trimEndPonyfill = _internal_ponyfills_String_trimEnd_js__WEBPACK_IMPORTED_MODULE_0__["default"];
var trimEndInvoker = (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(0, 'trimEnd');

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

var trimEnd = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(String.prototype.trimEnd) ? trimEndInvoker : trimEndPonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (trimEnd);

/***/ }),

/***/ 5782:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   trimStartInvoker: () => (/* binding */ trimStartInvoker),
/* harmony export */   trimStartPonyfill: () => (/* binding */ trimStartPonyfill)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7898);
/* harmony import */ var _internal_ponyfills_String_trimStart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8232);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);



var trimStartPonyfill = _internal_ponyfills_String_trimStart_js__WEBPACK_IMPORTED_MODULE_0__["default"];
var trimStartInvoker = (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(0, 'trimStart');

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

var trimStart = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(String.prototype.trimStart) ? trimStartInvoker : trimStartPonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (trimStart);

/***/ }),

/***/ 5908:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   truncPonyfill: () => (/* binding */ truncPonyfill)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9461);
/* harmony import */ var _internal_ponyfills_Math_trunc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3153);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);



var truncPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, _internal_ponyfills_Math_trunc_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

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

var trunc = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Math.trunc) ? (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(1, (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(Math.trunc, Math)) : truncPonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (trunc);

/***/ }),

/***/ 4843:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2374);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2598);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7293);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6476);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2875);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2366);
/* harmony import */ var _lengthEq_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6238);



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
var unzipObjWith = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(2, function (fn, obj) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_4__["default"], ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(fn)), ramda__WEBPACK_IMPORTED_MODULE_6__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_lengthEq_js__WEBPACK_IMPORTED_MODULE_8__["default"])(0), function () {
    return [[], []];
  }))(obj);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unzipObjWith);

/***/ }),

/***/ 9156:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7012);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2291);


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

var viewOr = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(3, function (defaultValue, lens, data) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(defaultValue, (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])(lens, data));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (viewOr);

/***/ }),

/***/ 392:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);


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
var weave = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(2, function (fn, config) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(fn.length, function () {
    return fn.apply(void 0, arguments).run(config);
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weave);

/***/ }),

/***/ 5178:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);


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
var weaveLazy = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(2, function (fn, configAccessor) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(fn.length, function () {
    return fn.apply(void 0, arguments).run(configAccessor());
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weaveLazy);

/***/ }),

/***/ 2328:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5845);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1182);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8391);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2598);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6476);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1421);


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
var zipObjWith = (0,ramda__WEBPACK_IMPORTED_MODULE_0__["default"])(3, function (fn, keys, values) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_4__["default"])(fn)), ramda__WEBPACK_IMPORTED_MODULE_5__["default"])(values, keys);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (zipObjWith);

/***/ }),

/***/ 3700:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  '@@functional/placeholder': true
});

/***/ }),

/***/ 2219:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2613);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5845);




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
var addIndex = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function addIndex(fn) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fn.length, function () {
    var idx = 0;
    var origFn = arguments[0];
    var list = arguments[arguments.length - 1];
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = function () {
      var result = origFn.apply(this, (0,_internal_concat_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arguments, [idx, list]));
      idx += 1;
      return result;
    };
    return fn.apply(this, args);
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addIndex);

/***/ }),

/***/ 9381:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2613);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2173);



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
var adjust = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function adjust(idx, fn, list) {
  var len = list.length;
  if (idx >= len || idx < -len) {
    return list;
  }
  var _idx = (len + idx) % len;
  var _list = (0,_internal_concat_js__WEBPACK_IMPORTED_MODULE_1__["default"])(list);
  _list[_idx] = fn(list[_idx]);
  return _list;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (adjust);

/***/ }),

/***/ 6679:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9619);
/* harmony import */ var _internal_xall_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2006);




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
var all = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['all'], _internal_xall_js__WEBPACK_IMPORTED_MODULE_2__["default"], function all(fn, list) {
  var idx = 0;
  while (idx < list.length) {
    if (!fn(list[idx])) {
      return false;
    }
    idx += 1;
  }
  return true;
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (all);

/***/ }),

/***/ 8714:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5845);
/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5582);
/* harmony import */ var _pluck_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9849);
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5920);






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
 *      const isQueen = R.propEq('Q', 'rank');
 *      const isSpade = R.propEq('♠︎', 'suit');
 *      const isQueenOfSpades = R.allPass([isQueen, isSpade]);
 *
 *      isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
 *      isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
 */
var allPass = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function allPass(preds) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_reduce_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_max_js__WEBPACK_IMPORTED_MODULE_3__["default"], 0, (0,_pluck_js__WEBPACK_IMPORTED_MODULE_4__["default"])('length', preds)), function () {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (allPass);

/***/ }),

/***/ 6183:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);


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
var always = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function always(val) {
  return function () {
    return val;
  };
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (always);

/***/ }),

/***/ 1021:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);


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
var and = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function and(a, b) {
  return a && b;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (and);

/***/ }),

/***/ 3755:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5845);
/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5582);
/* harmony import */ var _pluck_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9849);
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5920);






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
 *      const isClub = R.propEq('♣', 'suit');
 *      const isSpade = R.propEq('♠', 'suit');
 *      const isBlackCard = R.anyPass([isClub, isSpade]);
 *
 *      isBlackCard({rank: '10', suit: '♣'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♠'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♦'}); //=> false
 */
var anyPass = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function anyPass(preds) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_reduce_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_max_js__WEBPACK_IMPORTED_MODULE_3__["default"], 0, (0,_pluck_js__WEBPACK_IMPORTED_MODULE_4__["default"])('length', preds)), function () {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (anyPass);

/***/ }),

/***/ 4087:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2613);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3471);
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2598);





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
var ap = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function ap(applyF, applyX) {
  return typeof applyX['fantasy-land/ap'] === 'function' ? applyX['fantasy-land/ap'](applyF) : typeof applyF.ap === 'function' ? applyF.ap(applyX) : typeof applyF === 'function' ? function (x) {
    return applyF(x)(applyX(x));
  } : (0,_internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (acc, f) {
    return (0,_internal_concat_js__WEBPACK_IMPORTED_MODULE_2__["default"])(acc, (0,_map_js__WEBPACK_IMPORTED_MODULE_3__["default"])(f, applyX));
  }, [], applyF);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ap);

/***/ }),

/***/ 5830:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2613);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);



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
var append = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function append(el, list) {
  return (0,_internal_concat_js__WEBPACK_IMPORTED_MODULE_1__["default"])(list, [el]);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (append);

/***/ }),

/***/ 6476:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);


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
var apply = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function apply(fn, args) {
  return fn.apply(this, args);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (apply);

/***/ }),

/***/ 9968:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2173);


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
 * @see R.descend, R.ascendNatural, R.descendNatural
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
var ascend = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function ascend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa < bb ? -1 : aa > bb ? 1 : 0;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ascend);

/***/ }),

/***/ 3847:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2173);
/* harmony import */ var _assocPath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(932);



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
var assoc = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function assoc(prop, val, obj) {
  return (0,_assocPath_js__WEBPACK_IMPORTED_MODULE_1__["default"])([prop], val, obj);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (assoc);

/***/ }),

/***/ 932:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2173);
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1069);
/* harmony import */ var _internal_isInteger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4279);
/* harmony import */ var _internal_assoc_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8386);
/* harmony import */ var _isNil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1647);






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
var assocPath = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function assocPath(path, val, obj) {
  if (path.length === 0) {
    return val;
  }
  var idx = path[0];
  if (path.length > 1) {
    var nextObj = !(0,_isNil_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj) && (0,_internal_has_js__WEBPACK_IMPORTED_MODULE_2__["default"])(idx, obj) && typeof obj[idx] === 'object' ? obj[idx] : (0,_internal_isInteger_js__WEBPACK_IMPORTED_MODULE_3__["default"])(path[1]) ? [] : {};
    val = assocPath(Array.prototype.slice.call(path, 1), val, nextObj);
  }
  return (0,_internal_assoc_js__WEBPACK_IMPORTED_MODULE_4__["default"])(idx, val, obj);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (assocPath);

/***/ }),

/***/ 9461:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7660);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);



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
var bind = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function bind(fn, thisObj) {
  return (0,_internal_arity_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fn.length, function () {
    return fn.apply(thisObj, arguments);
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (bind);

/***/ }),

/***/ 625:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3893);
/* harmony import */ var _and_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1021);
/* harmony import */ var _lift_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3519);





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
var both = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function both(f, g) {
  return (0,_internal_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(f) ? function _both() {
    return f.apply(this, arguments) && g.apply(this, arguments);
  } : (0,_lift_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_and_js__WEBPACK_IMPORTED_MODULE_3__["default"])(f, g);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (both);

/***/ }),

/***/ 2142:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);


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
var comparator = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function comparator(pred) {
  return function (a, b) {
    return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
  };
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (comparator);

/***/ }),

/***/ 5690:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lift_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3519);
/* harmony import */ var _not_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2409);



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
var complement = /*#__PURE__*/(0,_lift_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_not_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (complement);

/***/ }),

/***/ 4052:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ compose)
/* harmony export */ });
/* harmony import */ var _pipe_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1182);
/* harmony import */ var _reverse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5506);



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
  return _pipe_js__WEBPACK_IMPORTED_MODULE_0__["default"].apply(this, (0,_reverse_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arguments));
}

/***/ }),

/***/ 7866:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5564);
/* harmony import */ var _internal_isFunction_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3893);
/* harmony import */ var _internal_isString_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8228);
/* harmony import */ var _toString_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2338);






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
var concat = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function concat(a, b) {
  if ((0,_internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(a)) {
    if ((0,_internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b)) {
      return a.concat(b);
    }
    throw new TypeError((0,_toString_js__WEBPACK_IMPORTED_MODULE_2__["default"])(b) + ' is not an array');
  }
  if ((0,_internal_isString_js__WEBPACK_IMPORTED_MODULE_3__["default"])(a)) {
    if ((0,_internal_isString_js__WEBPACK_IMPORTED_MODULE_3__["default"])(b)) {
      return a + b;
    }
    throw new TypeError((0,_toString_js__WEBPACK_IMPORTED_MODULE_2__["default"])(b) + ' is not a string');
  }
  if (a != null && (0,_internal_isFunction_js__WEBPACK_IMPORTED_MODULE_4__["default"])(a['fantasy-land/concat'])) {
    return a['fantasy-land/concat'](b);
  }
  if (a != null && (0,_internal_isFunction_js__WEBPACK_IMPORTED_MODULE_4__["default"])(a.concat)) {
    return a.concat(b);
  }
  throw new TypeError((0,_toString_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a) + ' does not have a method named "concat" or "fantasy-land/concat"');
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (concat);

/***/ }),

/***/ 7487:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_map_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8267);
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5845);
/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5582);
/* harmony import */ var _pluck_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9849);
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5920);







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
var converge = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function converge(after, fns) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_reduce_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_max_js__WEBPACK_IMPORTED_MODULE_3__["default"], 0, (0,_pluck_js__WEBPACK_IMPORTED_MODULE_4__["default"])('length', fns)), function () {
    var args = arguments;
    var context = this;
    return after.apply(context, (0,_internal_map_js__WEBPACK_IMPORTED_MODULE_5__["default"])(function (fn) {
      return fn.apply(context, args);
    }, fns));
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (converge);

/***/ }),

/***/ 4295:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5845);



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
 * and therefore `curry` won't work well with those.
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
 *      const curriedAddFourNumbers = R.curry(addFourNumbers);
 *      const f = curriedAddFourNumbers(1, 2);
 *      const g = f(3);
 *      g(4); //=> 10
 *
 *      // R.curry not working well with default parameters
 *      const h = R.curry((a, b, c = 2) => a + b + c);
 *      h(1)(2)(7); //=> Error! (`3` is not a function!)
 */
var curry = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function curry(fn) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fn.length, fn);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (curry);

/***/ }),

/***/ 5845:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7660);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3579);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_curryN_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9034);





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
var curryN = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function curryN(length, fn) {
  if (length === 1) {
    return (0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fn);
  }
  return (0,_internal_arity_js__WEBPACK_IMPORTED_MODULE_2__["default"])(length, (0,_internal_curryN_js__WEBPACK_IMPORTED_MODULE_3__["default"])(length, [], fn));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (curryN);

/***/ }),

/***/ 7012:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);


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
var defaultTo = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaultTo);

/***/ }),

/***/ 9234:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2254);
/* harmony import */ var _internal_dissoc_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7162);
/* harmony import */ var _internal_isInteger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4279);
/* harmony import */ var _internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5564);
/* harmony import */ var _assoc_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3847);






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
  if ((0,_internal_isInteger_js__WEBPACK_IMPORTED_MODULE_0__["default"])(prop) && (0,_internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj)) {
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
var dissocPath = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function dissocPath(path, obj) {
  if (obj == null) {
    return obj;
  }
  switch (path.length) {
    case 0:
      return obj;
    case 1:
      return (0,_internal_dissoc_js__WEBPACK_IMPORTED_MODULE_3__["default"])(path[0], obj);
    default:
      var head = path[0];
      var tail = Array.prototype.slice.call(path, 1);
      if (obj[head] == null) {
        return _shallowCloneObject(head, obj);
      } else {
        return (0,_assoc_js__WEBPACK_IMPORTED_MODULE_4__["default"])(head, dissocPath(tail, obj[head]), obj);
      }
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dissocPath);

/***/ }),

/***/ 4827:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);


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
var divide = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function divide(a, b) {
  return a / b;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (divide);

/***/ }),

/***/ 2358:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9619);
/* harmony import */ var _internal_dropLastWhile_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7007);
/* harmony import */ var _internal_xdropLastWhile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1451);





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
var dropLastWhile = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])([], _internal_xdropLastWhile_js__WEBPACK_IMPORTED_MODULE_2__["default"], _internal_dropLastWhile_js__WEBPACK_IMPORTED_MODULE_3__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dropLastWhile);

/***/ }),

/***/ 7926:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9619);
/* harmony import */ var _internal_xdropWhile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(779);
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7094);





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
var dropWhile = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['dropWhile'], _internal_xdropWhile_js__WEBPACK_IMPORTED_MODULE_2__["default"], function dropWhile(pred, xs) {
  var idx = 0;
  var len = xs.length;
  while (idx < len && pred(xs[idx])) {
    idx += 1;
  }
  return (0,_slice_js__WEBPACK_IMPORTED_MODULE_3__["default"])(idx, Infinity, xs);
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dropWhile);

/***/ }),

/***/ 292:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3893);
/* harmony import */ var _lift_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3519);
/* harmony import */ var _or_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4407);





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
var either = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function either(f, g) {
  return (0,_internal_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(f) ? function _either() {
    return f.apply(this, arguments) || g.apply(this, arguments);
  } : (0,_lift_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_or_js__WEBPACK_IMPORTED_MODULE_3__["default"])(f, g);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (either);

/***/ }),

/***/ 4421:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _internal_isArguments_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4689);
/* harmony import */ var _internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5564);
/* harmony import */ var _internal_isObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(822);
/* harmony import */ var _internal_isString_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8228);
/* harmony import */ var _internal_isTypedArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1900);







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
var empty = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function empty(x) {
  return x != null && typeof x['fantasy-land/empty'] === 'function' ? x['fantasy-land/empty']() : x != null && x.constructor != null && typeof x.constructor['fantasy-land/empty'] === 'function' ? x.constructor['fantasy-land/empty']() : x != null && typeof x.empty === 'function' ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === 'function' ? x.constructor.empty() : (0,_internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(x) ? [] : (0,_internal_isString_js__WEBPACK_IMPORTED_MODULE_2__["default"])(x) ? '' : (0,_internal_isObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(x) ? {} : (0,_internal_isArguments_js__WEBPACK_IMPORTED_MODULE_4__["default"])(x) ? function () {
    return arguments;
  }() : (0,_internal_isTypedArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(x) ? x.constructor.from('') : void 0 // else
  ;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (empty);

/***/ }),

/***/ 7911:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_equals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1852);



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
var equals = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function equals(a, b) {
  return (0,_internal_equals_js__WEBPACK_IMPORTED_MODULE_1__["default"])(a, b, [], []);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (equals);

/***/ }),

/***/ 2720:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_arrayReduce_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3430);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9619);
/* harmony import */ var _internal_filter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1115);
/* harmony import */ var _internal_isObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(822);
/* harmony import */ var _internal_xfilter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2247);
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2506);








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
var filter = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['fantasy-land/filter', 'filter'], _internal_xfilter_js__WEBPACK_IMPORTED_MODULE_2__["default"], function (pred, filterable) {
  return (0,_internal_isObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(filterable) ? (0,_internal_arrayReduce_js__WEBPACK_IMPORTED_MODULE_4__["default"])(function (acc, key) {
    if (pred(filterable[key])) {
      acc[key] = filterable[key];
    }
    return acc;
  }, {}, (0,_keys_js__WEBPACK_IMPORTED_MODULE_5__["default"])(filterable)) :
  // else
  (0,_internal_filter_js__WEBPACK_IMPORTED_MODULE_6__["default"])(pred, filterable);
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (filter);

/***/ }),

/***/ 4745:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9619);
/* harmony import */ var _internal_xfind_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4090);




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
 *      R.find(R.propEq(2, 'a'))(xs); //=> {a: 2}
 *      R.find(R.propEq(4, 'a'))(xs); //=> undefined
 */
var find = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['find'], _internal_xfind_js__WEBPACK_IMPORTED_MODULE_2__["default"], function find(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (fn(list[idx])) {
      return list[idx];
    }
    idx += 1;
  }
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (find);

/***/ }),

/***/ 7293:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5845);



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
var flip = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function flip(fn) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fn.length, function (a, b) {
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = b;
    args[1] = a;
    return fn.apply(this, args);
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (flip);

/***/ }),

/***/ 1421:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);


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
var fromPairs = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function fromPairs(pairs) {
  var result = {};
  var idx = 0;
  while (idx < pairs.length) {
    result[pairs[idx][0]] = pairs[idx][1];
    idx += 1;
  }
  return result;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fromPairs);

/***/ }),

/***/ 1821:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);


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
var gt = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function gt(a, b) {
  return a > b;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gt);

/***/ }),

/***/ 5182:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);


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
var gte = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function gte(a, b) {
  return a >= b;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gte);

/***/ }),

/***/ 3236:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _hasPath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4519);



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
var has = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function has(prop, obj) {
  return (0,_hasPath_js__WEBPACK_IMPORTED_MODULE_1__["default"])([prop], obj);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (has);

/***/ }),

/***/ 9947:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _isNil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1647);



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
var hasIn = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function hasIn(prop, obj) {
  if ((0,_isNil_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj)) {
    return false;
  }
  return prop in obj;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hasIn);

/***/ }),

/***/ 4519:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1069);
/* harmony import */ var _isNil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1647);




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
var hasPath = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function hasPath(_path, obj) {
  if (_path.length === 0 || (0,_isNil_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj)) {
    return false;
  }
  var val = obj;
  var idx = 0;
  while (idx < _path.length) {
    if (!(0,_isNil_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val) && (0,_internal_has_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_path[idx], val)) {
      val = val[_path[idx]];
      idx += 1;
    } else {
      return false;
    }
  }
  return true;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hasPath);

/***/ }),

/***/ 8804:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _internal_nth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6359);



/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String | Undefined
 * @param {Array|String} list
 * @return {*}
 * @see R.tail, R.init, R.last
 * @example
 *
 *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
 *      R.head([]); //=> undefined
 *
 *      R.head('abc'); //=> 'a'
 *      R.head(''); //=> undefined
 */
var head = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (list) {
  return (0,_internal_nth_js__WEBPACK_IMPORTED_MODULE_1__["default"])(0, list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (head);

/***/ }),

/***/ 5883:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_objectIs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8274);


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
              return (0,_internal_objectIs_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a, _b);
          }
        };
      }();
    default:
      return (0,_internal_objectIs_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a, b);
  }
};

// In order to support Cross-origin Window objects as arguments to identical,
// it cannot be implemented as _curry2(_objectIs).
// The reason is that _curry2 checks if a function argument is the placeholder __
// by accessing a paritcular property. However, across URL origins access
// to most properties of Window is forbidden.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (identical);

/***/ }),

/***/ 3628:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _internal_identity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1031);



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
var identity = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_internal_identity_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (identity);

/***/ }),

/***/ 8564:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2173);
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5845);



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
var ifElse = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function ifElse(condition, onTrue, onFalse) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
    return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ifElse);

/***/ }),

/***/ 1487:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_includes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3112);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);



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
var includes = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_internal_includes_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (includes);

/***/ }),

/***/ 6196:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7094);


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
var init = /*#__PURE__*/(0,_slice_js__WEBPACK_IMPORTED_MODULE_0__["default"])(0, -1);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (init);

/***/ }),

/***/ 2307:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2173);


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
var insert = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function insert(idx, elt, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  var result = Array.prototype.slice.call(list, 0);
  result.splice(idx, 0, elt);
  return result;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (insert);

/***/ }),

/***/ 3413:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3112);

var _Set = /*#__PURE__*/function () {
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
  };

  //
  // @param item The item to check for existence in the Set
  // @returns {boolean} true if the item exists in the Set, otherwise false
  //
  _Set.prototype.has = function (item) {
    return hasOrAdd(item, false, this);
  };

  //
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
      }
      // these types can all utilise the native Set
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
        if (!(0,_includes_js__WEBPACK_IMPORTED_MODULE_0__["default"])(item, set._items[type])) {
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
      }
      // scan through all previously applied items
      if (!(0,_includes_js__WEBPACK_IMPORTED_MODULE_0__["default"])(item, set._items[type])) {
        if (shouldAdd) {
          set._items[type].push(item);
        }
        return false;
      }
      return true;
  }
}

// A simple Set type that honours R.equals semantics
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Set);

/***/ }),

/***/ 7660:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arity)
/* harmony export */ });
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

/***/ }),

/***/ 8142:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayFromIterator)
/* harmony export */ });
function _arrayFromIterator(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
}

/***/ }),

/***/ 3430:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayReduce)
/* harmony export */ });
function _arrayReduce(reducer, acc, list) {
  var index = 0;
  var length = list.length;
  while (index < length) {
    acc = reducer(acc, list[index]);
    index += 1;
  }
  return acc;
}

/***/ }),

/***/ 8386:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _assoc)
/* harmony export */ });
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5564);
/* harmony import */ var _isInteger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4279);



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
  if ((0,_isInteger_js__WEBPACK_IMPORTED_MODULE_0__["default"])(prop) && (0,_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj)) {
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

/***/ }),

/***/ 371:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _checkForMethod)
/* harmony export */ });
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5564);


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
    return (0,_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
}

/***/ }),

/***/ 557:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _cloneRegExp)
/* harmony export */ });
function _cloneRegExp(pattern) {
  return new RegExp(pattern.source, pattern.flags ? pattern.flags : (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : '') + (pattern.dotAll ? 's' : ''));
}

/***/ }),

/***/ 889:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _complement)
/* harmony export */ });
function _complement(f) {
  return function () {
    return !f.apply(this, arguments);
  };
}

/***/ }),

/***/ 2613:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _concat)
/* harmony export */ });
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

/***/ }),

/***/ 4293:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createPartialApplicator)
/* harmony export */ });
/* harmony import */ var _arity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7660);
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);


function _createPartialApplicator(concat) {
  return (0,_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (fn, args) {
    return (0,_arity_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Math.max(0, fn.length - args.length), function () {
      return fn.apply(this, concat(args, arguments));
    });
  });
}

/***/ }),

/***/ 6659:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createReduce)
/* harmony export */ });
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67);

var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
function _createReduce(arrayReduce, methodReduce, iterableReduce) {
  return function _reduce(xf, acc, list) {
    if ((0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list)) {
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

/***/ }),

/***/ 3579:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _curry1)
/* harmony export */ });
/* harmony import */ var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2808);


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
    if (arguments.length === 0 || (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

/***/ }),

/***/ 2254:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _curry2)
/* harmony export */ });
/* harmony import */ var _curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3579);
/* harmony import */ var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2808);



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
        return (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a) ? f2 : (0,_curry1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_b) {
          return fn(a, _b);
        });
      default:
        return (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(b) ? f2 : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a) ? (0,_curry1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_a) {
          return fn(_a, b);
        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(b) ? (0,_curry1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

/***/ }),

/***/ 2173:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _curry3)
/* harmony export */ });
/* harmony import */ var _curry1_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3579);
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2254);
/* harmony import */ var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2808);




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
        return (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a) ? f3 : (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_b, _c) {
          return fn(a, _b, _c);
        });
      case 2:
        return (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(b) ? f3 : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a) ? (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_a, _c) {
          return fn(_a, b, _c);
        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(b) ? (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_b, _c) {
          return fn(a, _b, _c);
        }) : (0,_curry1_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function (_c) {
          return fn(a, b, _c);
        });
      default:
        return (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(b) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(c) ? f3 : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(b) ? (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_a, _b) {
          return fn(_a, _b, c);
        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(c) ? (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_a, _c) {
          return fn(_a, b, _c);
        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(b) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(c) ? (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_b, _c) {
          return fn(a, _b, _c);
        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a) ? (0,_curry1_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function (_a) {
          return fn(_a, b, c);
        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(b) ? (0,_curry1_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function (_b) {
          return fn(a, _b, c);
        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(c) ? (0,_curry1_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function (_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}

/***/ }),

/***/ 9034:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _curryN)
/* harmony export */ });
/* harmony import */ var _arity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7660);
/* harmony import */ var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2808);



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
    var hasPlaceholder = false;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length && (!(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(result)) {
        left -= 1;
      } else {
        hasPlaceholder = true;
      }
      combinedIdx += 1;
    }
    return !hasPlaceholder && left <= 0 ? fn.apply(this, combined) : (0,_arity_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Math.max(0, left), _curryN(length, combined, fn));
  };
}

/***/ }),

/***/ 9619:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _dispatchable)
/* harmony export */ });
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5564);
/* harmony import */ var _isTransformer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4978);



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
    if (!(0,_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj)) {
      var idx = 0;
      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, Array.prototype.slice.call(arguments, 0, -1));
        }
        idx += 1;
      }
      if ((0,_isTransformer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj)) {
        var transducer = transducerCreator.apply(null, Array.prototype.slice.call(arguments, 0, -1));
        return transducer(obj);
      }
    }
    return fn.apply(this, arguments);
  };
}

/***/ }),

/***/ 7162:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _dissoc)
/* harmony export */ });
/* harmony import */ var _isInteger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4279);
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5564);
/* harmony import */ var _remove_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(954);




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
  if ((0,_isInteger_js__WEBPACK_IMPORTED_MODULE_0__["default"])(prop) && (0,_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj)) {
    return (0,_remove_js__WEBPACK_IMPORTED_MODULE_2__["default"])(prop, 1, obj);
  }
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  delete result[prop];
  return result;
}

/***/ }),

/***/ 7007:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dropLastWhile)
/* harmony export */ });
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7094);

function dropLastWhile(pred, xs) {
  var idx = xs.length - 1;
  while (idx >= 0 && pred(xs[idx])) {
    idx -= 1;
  }
  return (0,_slice_js__WEBPACK_IMPORTED_MODULE_0__["default"])(0, idx + 1, xs);
}

/***/ }),

/***/ 1852:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _equals)
/* harmony export */ });
/* harmony import */ var _arrayFromIterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8142);
/* harmony import */ var _includesWith_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8496);
/* harmony import */ var _functionName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7558);
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1069);
/* harmony import */ var _objectIs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8274);
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2506);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1322);








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
  var a = (0,_arrayFromIterator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(aIterator);
  var b = (0,_arrayFromIterator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bIterator);
  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  }

  // if *a* array contains any element that is not included in *b*
  return !(0,_includesWith_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (b, aItem) {
    return !(0,_includesWith_js__WEBPACK_IMPORTED_MODULE_1__["default"])(eq, aItem, b);
  }, b, a);
}
function _equals(a, b, stackA, stackB) {
  if ((0,_objectIs_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a, b)) {
    return true;
  }
  var typeA = (0,_type_js__WEBPACK_IMPORTED_MODULE_3__["default"])(a);
  if (typeA !== (0,_type_js__WEBPACK_IMPORTED_MODULE_3__["default"])(b)) {
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
      if (typeof a.constructor === 'function' && (0,_functionName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(a.constructor) === 'Promise') {
        return a === b;
      }
      break;
    case 'Boolean':
    case 'Number':
    case 'String':
      if (!(typeof a === typeof b && (0,_objectIs_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a.valueOf(), b.valueOf()))) {
        return false;
      }
      break;
    case 'Date':
      if (!(0,_objectIs_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a.valueOf(), b.valueOf())) {
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
  var keysA = (0,_keys_js__WEBPACK_IMPORTED_MODULE_5__["default"])(a);
  if (keysA.length !== (0,_keys_js__WEBPACK_IMPORTED_MODULE_5__["default"])(b).length) {
    return false;
  }
  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);
  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!((0,_has_js__WEBPACK_IMPORTED_MODULE_6__["default"])(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }
    idx -= 1;
  }
  return true;
}

/***/ }),

/***/ 1115:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _filter)
/* harmony export */ });
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

/***/ }),

/***/ 7558:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _functionName)
/* harmony export */ });
function _functionName(f) {
  // String(x => x) evaluates to "x => x", so the pattern may not match.
  var match = String(f).match(/^function (\w*)/);
  return match == null ? '' : match[1];
}

/***/ }),

/***/ 1069:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _has)
/* harmony export */ });
function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/***/ }),

/***/ 1031:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _identity)
/* harmony export */ });
function _identity(x) {
  return x;
}

/***/ }),

/***/ 3112:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _includes)
/* harmony export */ });
/* harmony import */ var _indexOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6252);

function _includes(a, list) {
  return (0,_indexOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list, a, 0) >= 0;
}

/***/ }),

/***/ 8496:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _includesWith)
/* harmony export */ });
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

/***/ }),

/***/ 6252:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _indexOf)
/* harmony export */ });
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7911);

function _indexOf(list, a, idx) {
  var inf, item;
  // Array.prototype.indexOf doesn't exist below IE9
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
        }
        // non-zero numbers can utilise Set
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
  }
  // anything else not covered above, defer to R.equals
  while (idx < list.length) {
    if ((0,_equals_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list[idx], a)) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}

/***/ }),

/***/ 4689:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1069);

var toString = Object.prototype.toString;
var _isArguments = /*#__PURE__*/function () {
  return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
    return toString.call(x) === '[object Arguments]';
  } : function _isArguments(x) {
    return (0,_has_js__WEBPACK_IMPORTED_MODULE_0__["default"])('callee', x);
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_isArguments);

/***/ }),

/***/ 5564:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
});

/***/ }),

/***/ 67:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5564);
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8228);




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
var _isArrayLike = /*#__PURE__*/(0,_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function isArrayLike(x) {
  if ((0,_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(x)) {
    return true;
  }
  if (!x) {
    return false;
  }
  if (typeof x !== 'object') {
    return false;
  }
  if ((0,_isString_js__WEBPACK_IMPORTED_MODULE_2__["default"])(x)) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_isArrayLike);

/***/ }),

/***/ 3893:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isFunction)
/* harmony export */ });
function _isFunction(x) {
  var type = Object.prototype.toString.call(x);
  return type === '[object Function]' || type === '[object AsyncFunction]' || type === '[object GeneratorFunction]' || type === '[object AsyncGeneratorFunction]';
}

/***/ }),

/***/ 4279:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Determine if the passed argument is an integer.
 *
 * @private
 * @param {*} n
 * @category Type
 * @return {Boolean}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
});

/***/ }),

/***/ 464:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isNumber)
/* harmony export */ });
function _isNumber(x) {
  return Object.prototype.toString.call(x) === '[object Number]';
}

/***/ }),

/***/ 822:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isObject)
/* harmony export */ });
function _isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}

/***/ }),

/***/ 2808:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isPlaceholder)
/* harmony export */ });
function _isPlaceholder(a) {
  return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
}

/***/ }),

/***/ 4200:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isRegExp)
/* harmony export */ });
function _isRegExp(x) {
  return Object.prototype.toString.call(x) === '[object RegExp]';
}

/***/ }),

/***/ 8228:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isString)
/* harmony export */ });
function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}

/***/ }),

/***/ 4978:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isTransformer)
/* harmony export */ });
function _isTransformer(obj) {
  return obj != null && typeof obj['@@transducer/step'] === 'function';
}

/***/ }),

/***/ 1900:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isTypedArray)
/* harmony export */ });
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

/***/ }),

/***/ 8267:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _map)
/* harmony export */ });
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

/***/ }),

/***/ 6359:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nth)
/* harmony export */ });
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8228);

function _nth(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return (0,_isString_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list) ? list.charAt(idx) : list[idx];
}

/***/ }),

/***/ 4239:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1069);


// Based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
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
        if ((0,_has_js__WEBPACK_IMPORTED_MODULE_0__["default"])(nextKey, source)) {
          output[nextKey] = source[nextKey];
        }
      }
    }
    idx += 1;
  }
  return output;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typeof Object.assign === 'function' ? Object.assign : _objectAssign);

/***/ }),

/***/ 8274:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typeof Object.is === 'function' ? Object.is : _objectIs);

/***/ }),

/***/ 8506:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _path)
/* harmony export */ });
/* harmony import */ var _isInteger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4279);
/* harmony import */ var _nth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6359);


function _path(pathAr, obj) {
  var val = obj;
  for (var i = 0; i < pathAr.length; i += 1) {
    if (val == null) {
      return undefined;
    }
    var p = pathAr[i];
    if ((0,_isInteger_js__WEBPACK_IMPORTED_MODULE_0__["default"])(p)) {
      val = (0,_nth_js__WEBPACK_IMPORTED_MODULE_1__["default"])(p, val);
    } else {
      val = val[p];
    }
  }
  return val;
}

/***/ }),

/***/ 5393:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _pipe)
/* harmony export */ });
function _pipe(f, g) {
  return function () {
    return g.call(this, f.apply(this, arguments));
  };
}

/***/ }),

/***/ 9017:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _quote)
/* harmony export */ });
function _quote(s) {
  var escaped = s.replace(/\\/g, '\\\\').replace(/[\b]/g, '\\b') // \b matches word boundary; [\b] matches backspace
  .replace(/\f/g, '\\f').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\v/g, '\\v').replace(/\0/g, '\\0');
  return '"' + escaped.replace(/"/g, '\\"') + '"';
}

/***/ }),

/***/ 3471:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _arrayReduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3430);
/* harmony import */ var _createReduce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6659);


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
var _reduce = /*#__PURE__*/(0,_createReduce_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_arrayReduce_js__WEBPACK_IMPORTED_MODULE_1__["default"], _methodReduce, _iterableReduce);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_reduce);

/***/ }),

/***/ 259:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _reduced)
/* harmony export */ });
function _reduced(x) {
  return x && x['@@transducer/reduced'] ? x : {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}

/***/ }),

/***/ 6894:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_toISOString);

/***/ }),

/***/ 565:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toString)
/* harmony export */ });
/* harmony import */ var _includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3112);
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8267);
/* harmony import */ var _quote_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9017);
/* harmony import */ var _toISOString_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6894);
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2506);
/* harmony import */ var _reject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6173);






function _toString(x, seen) {
  var recur = function recur(y) {
    var xs = seen.concat([x]);
    return (0,_includes_js__WEBPACK_IMPORTED_MODULE_0__["default"])(y, xs) ? '<Circular>' : _toString(y, xs);
  };

  //  mapPairs :: (Object, [String]) -> [String]
  var mapPairs = function (obj, keys) {
    return (0,_map_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (k) {
      return (0,_quote_js__WEBPACK_IMPORTED_MODULE_2__["default"])(k) + ': ' + recur(obj[k]);
    }, keys.slice().sort());
  };
  switch (Object.prototype.toString.call(x)) {
    case '[object Arguments]':
      return '(function() { return arguments; }(' + (0,_map_js__WEBPACK_IMPORTED_MODULE_1__["default"])(recur, x).join(', ') + '))';
    case '[object Array]':
      return '[' + (0,_map_js__WEBPACK_IMPORTED_MODULE_1__["default"])(recur, x).concat(mapPairs(x, (0,_reject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(function (k) {
        return /^\d+$/.test(k);
      }, (0,_keys_js__WEBPACK_IMPORTED_MODULE_4__["default"])(x)))).join(', ') + ']';
    case '[object Boolean]':
      return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();
    case '[object Date]':
      return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : (0,_quote_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_toISOString_js__WEBPACK_IMPORTED_MODULE_5__["default"])(x))) + ')';
    case '[object Map]':
      return 'new Map(' + recur(Array.from(x)) + ')';
    case '[object Null]':
      return 'null';
    case '[object Number]':
      return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);
    case '[object Set]':
      return 'new Set(' + recur(Array.from(x).sort()) + ')';
    case '[object String]':
      return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : (0,_quote_js__WEBPACK_IMPORTED_MODULE_2__["default"])(x);
    case '[object Undefined]':
      return 'undefined';
    default:
      if (typeof x.toString === 'function') {
        var repr = x.toString();
        if (repr !== '[object Object]') {
          return repr;
        }
      }
      return '{' + mapPairs(x, (0,_keys_js__WEBPACK_IMPORTED_MODULE_4__["default"])(x)).join(', ') + '}';
  }
}

/***/ }),

/***/ 522:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _xArrayReduce)
/* harmony export */ });
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

/***/ }),

/***/ 8475:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createReduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6659);
/* harmony import */ var _xArrayReduce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(522);
/* harmony import */ var _bind_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9461);



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
  return xf['@@transducer/result'](obj[methodName]((0,_bind_js__WEBPACK_IMPORTED_MODULE_0__["default"])(xf['@@transducer/step'], xf), acc));
}
var _xReduce = /*#__PURE__*/(0,_createReduce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_xArrayReduce_js__WEBPACK_IMPORTED_MODULE_2__["default"], _xMethodReduce, _xIterableReduce);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xReduce);

/***/ }),

/***/ 2006:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _xall)
/* harmony export */ });
/* harmony import */ var _reduced_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(259);
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1878);


var XAll = /*#__PURE__*/function () {
  function XAll(f, xf) {
    this.xf = xf;
    this.f = f;
    this.all = true;
  }
  XAll.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_0__["default"].init;
  XAll.prototype['@@transducer/result'] = function (result) {
    if (this.all) {
      result = this.xf['@@transducer/step'](result, true);
    }
    return this.xf['@@transducer/result'](result);
  };
  XAll.prototype['@@transducer/step'] = function (result, input) {
    if (!this.f(input)) {
      this.all = false;
      result = (0,_reduced_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.xf['@@transducer/step'](result, false));
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

/***/ }),

/***/ 1451:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _xdropLastWhile)
/* harmony export */ });
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1878);
/* harmony import */ var _xReduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8475);


var XDropLastWhile = /*#__PURE__*/function () {
  function XDropLastWhile(fn, xf) {
    this.f = fn;
    this.retained = [];
    this.xf = xf;
  }
  XDropLastWhile.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_0__["default"].init;
  XDropLastWhile.prototype['@@transducer/result'] = function (result) {
    this.retained = null;
    return this.xf['@@transducer/result'](result);
  };
  XDropLastWhile.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.retain(result, input) : this.flush(result, input);
  };
  XDropLastWhile.prototype.flush = function (result, input) {
    result = (0,_xReduce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.xf, result, this.retained);
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

/***/ }),

/***/ 779:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _xdropWhile)
/* harmony export */ });
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1878);

var XDropWhile = /*#__PURE__*/function () {
  function XDropWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XDropWhile.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_0__["default"].init;
  XDropWhile.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_0__["default"].result;
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

/***/ }),

/***/ 1878:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: function () {
    return this.xf['@@transducer/init']();
  },
  result: function (result) {
    return this.xf['@@transducer/result'](result);
  }
});

/***/ }),

/***/ 2247:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _xfilter)
/* harmony export */ });
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1878);

var XFilter = /*#__PURE__*/function () {
  function XFilter(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFilter.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_0__["default"].init;
  XFilter.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_0__["default"].result;
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

/***/ }),

/***/ 4090:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _xfind)
/* harmony export */ });
/* harmony import */ var _reduced_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(259);
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1878);


var XFind = /*#__PURE__*/function () {
  function XFind(f, xf) {
    this.xf = xf;
    this.f = f;
    this.found = false;
  }
  XFind.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_0__["default"].init;
  XFind.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, void 0);
    }
    return this.xf['@@transducer/result'](result);
  };
  XFind.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.found = true;
      result = (0,_reduced_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.xf['@@transducer/step'](result, input));
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

/***/ }),

/***/ 9607:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1878);

var XMap = /*#__PURE__*/function () {
  function XMap(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XMap.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_0__["default"].init;
  XMap.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_0__["default"].result;
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xmap);

/***/ }),

/***/ 6452:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _xtap)
/* harmony export */ });
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1878);

var XTap = /*#__PURE__*/function () {
  function XTap(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XTap.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_0__["default"].init;
  XTap.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_0__["default"].result;
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

/***/ }),

/***/ 9125:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _xuniqBy)
/* harmony export */ });
/* harmony import */ var _Set_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3413);
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1878);


var XUniqBy = /*#__PURE__*/function () {
  function XUniqBy(f, xf) {
    this.xf = xf;
    this.f = f;
    this.set = new _Set_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }
  XUniqBy.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].init;
  XUniqBy.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].result;
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

/***/ }),

/***/ 5020:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _xuniqWith)
/* harmony export */ });
/* harmony import */ var _includesWith_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8496);
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1878);


var XUniqWith = /*#__PURE__*/function () {
  function XUniqWith(pred, xf) {
    this.xf = xf;
    this.pred = pred;
    this.items = [];
  }
  XUniqWith.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_0__["default"].init;
  XUniqWith.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_0__["default"].result;
  XUniqWith.prototype['@@transducer/step'] = function (result, input) {
    if ((0,_includesWith_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.pred, input, this.items)) {
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

/***/ }),

/***/ 7141:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _xwrap)
/* harmony export */ });
var XWrap = /*#__PURE__*/function () {
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

/***/ }),

/***/ 3971:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_filter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1115);
/* harmony import */ var _internal_Set_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3413);
/* harmony import */ var _uniq_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7168);





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
var intersection = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function intersection(list1, list2) {
  var toKeep = new _internal_Set_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  for (var i = 0; i < list1.length; i += 1) {
    toKeep.add(list1[i]);
  }
  return (0,_uniq_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_internal_filter_js__WEBPACK_IMPORTED_MODULE_3__["default"])(toKeep.has.bind(toKeep), list2));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (intersection);

/***/ }),

/***/ 7898:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3893);
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5845);
/* harmony import */ var _toString_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2338);





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
var invoker = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function invoker(arity, method) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arity + 1, function () {
    var target = arguments[arity];
    if (target != null && (0,_internal_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(target[method])) {
      return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
    }
    throw new TypeError((0,_toString_js__WEBPACK_IMPORTED_MODULE_3__["default"])(target) + ' does not have a method named "' + method + '"');
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (invoker);

/***/ }),

/***/ 3557:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _empty_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4421);
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7911);




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
 * @see R.empty, R.isNotEmpty
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
var isEmpty = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function isEmpty(x) {
  return x != null && (0,_equals_js__WEBPACK_IMPORTED_MODULE_1__["default"])(x, (0,_empty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(x));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isEmpty);

/***/ }),

/***/ 1647:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);


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
var isNil = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function isNil(x) {
  return x == null;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNil);

/***/ }),

/***/ 6536:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _isEmpty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3557);



/**
 * Returns `false` if the given value is its type's empty value; `true`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.29.2
 * @category Logic
 * @sig a -> Boolean
 * @param {*} x
 * @return {Boolean}
 * @see R.empty, R.isEmpty
 * @example
 *
 *      R.isNotEmpty([1, 2, 3]);           //=> true
 *      R.isNotEmpty([]);                  //=> false
 *      R.isNotEmpty('');                  //=> false
 *      R.isNotEmpty(null);                //=> true
 *      R.isNotEmpty({});                  //=> false
 *      R.isNotEmpty({length: 0});         //=> true
 *      R.isNotEmpty(Uint8Array.from('')); //=> false
 */
var isNotEmpty = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function isNotEmpty(x) {
  return !(0,_isEmpty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(x);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotEmpty);

/***/ }),

/***/ 6910:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _invoker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7898);


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
var join = /*#__PURE__*/(0,_invoker_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, 'join');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (join);

/***/ }),

/***/ 2506:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1069);
/* harmony import */ var _internal_isArguments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4689);




// cover IE < 9 keys issues
var hasEnumBug = ! /*#__PURE__*/{
  toString: null
}.propertyIsEnumerable('toString');
var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
// Safari bug
var hasArgsEnumBug = /*#__PURE__*/function () {
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
var keys = typeof Object.keys === 'function' && !hasArgsEnumBug ? /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function keys(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) : /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function keys(obj) {
  if (Object(obj) !== obj) {
    return [];
  }
  var prop, nIdx;
  var ks = [];
  var checkArgsLength = hasArgsEnumBug && (0,_internal_isArguments_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj);
  for (prop in obj) {
    if ((0,_internal_has_js__WEBPACK_IMPORTED_MODULE_2__["default"])(prop, obj) && (!checkArgsLength || prop !== 'length')) {
      ks[ks.length] = prop;
    }
  }
  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;
    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];
      if ((0,_internal_has_js__WEBPACK_IMPORTED_MODULE_2__["default"])(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }
      nIdx -= 1;
    }
  }
  return ks;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (keys);

/***/ }),

/***/ 3022:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _internal_nth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6359);



/**
 * Returns the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String | Undefined
 * @param {*} list
 * @return {*}
 * @see R.init, R.head, R.tail
 * @example
 *
 *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
 *      R.last([]); //=> undefined
 *
 *      R.last('abc'); //=> 'c'
 *      R.last(''); //=> undefined
 */
var last = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (list) {
  return (0,_internal_nth_js__WEBPACK_IMPORTED_MODULE_1__["default"])(-1, list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (last);

/***/ }),

/***/ 1618:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _internal_isNumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(464);



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
var length = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function length(list) {
  return list != null && (0,_internal_isNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"])(list.length) ? list.length : NaN;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (length);

/***/ }),

/***/ 9210:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2598);



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
var lens = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lens(getter, setter) {
  return function (toFunctorFn) {
    return function (target) {
      return (0,_map_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (focus) {
        return setter(focus, target);
      }, toFunctorFn(getter(target)));
    };
  };
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lens);

/***/ }),

/***/ 8711:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _internal_nth_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6359);
/* harmony import */ var _lens_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9210);
/* harmony import */ var _update_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6935);





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
var lensIndex = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lensIndex(n) {
  return (0,_lens_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (val) {
    return (0,_internal_nth_js__WEBPACK_IMPORTED_MODULE_2__["default"])(n, val);
  }, (0,_update_js__WEBPACK_IMPORTED_MODULE_3__["default"])(n));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lensIndex);

/***/ }),

/***/ 7749:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _assocPath_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(932);
/* harmony import */ var _lens_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9210);
/* harmony import */ var _internal_path_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8506);





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

var lensPath = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lensPath(p) {
  return (0,_lens_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (val) {
    return (0,_internal_path_js__WEBPACK_IMPORTED_MODULE_2__["default"])(p, val);
  }, (0,_assocPath_js__WEBPACK_IMPORTED_MODULE_3__["default"])(p));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lensPath);

/***/ }),

/***/ 3519:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _liftN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4141);



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
var lift = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lift(fn) {
  return (0,_liftN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fn.length, fn);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lift);

/***/ }),

/***/ 4141:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_arrayReduce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3430);
/* harmony import */ var _ap_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4087);
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5845);
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2598);






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
var liftN = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function liftN(arity, fn) {
  var lifted = (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arity, fn);
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arity, function () {
    return (0,_internal_arrayReduce_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_ap_js__WEBPACK_IMPORTED_MODULE_3__["default"], (0,_map_js__WEBPACK_IMPORTED_MODULE_4__["default"])(lifted, arguments[0]), Array.prototype.slice.call(arguments, 1));
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (liftN);

/***/ }),

/***/ 6586:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);


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
var lt = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lt(a, b) {
  return a < b;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lt);

/***/ }),

/***/ 5507:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);


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
var lte = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lte(a, b) {
  return a <= b;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lte);

/***/ }),

/***/ 2598:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_arrayReduce_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3430);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9619);
/* harmony import */ var _internal_map_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8267);
/* harmony import */ var _internal_xmap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9607);
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5845);
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2506);








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
var map = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['fantasy-land/map', 'map'], _internal_xmap_js__WEBPACK_IMPORTED_MODULE_2__["default"], function map(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case '[object Function]':
      return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_3__["default"])(functor.length, function () {
        return fn.call(this, functor.apply(this, arguments));
      });
    case '[object Object]':
      return (0,_internal_arrayReduce_js__WEBPACK_IMPORTED_MODULE_4__["default"])(function (acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, (0,_keys_js__WEBPACK_IMPORTED_MODULE_5__["default"])(functor));
    default:
      return (0,_internal_map_js__WEBPACK_IMPORTED_MODULE_6__["default"])(fn, functor);
  }
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (map);

/***/ }),

/***/ 5582:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _toString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2338);



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
var max = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function max(a, b) {
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
  var stringA = (0,_toString_js__WEBPACK_IMPORTED_MODULE_1__["default"])(a);
  var maxByStringValue = safeMax(stringA, (0,_toString_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b));
  if (maxByStringValue !== undefined) {
    return maxByStringValue === stringA ? a : b;
  }
  return b;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (max);

/***/ }),

/***/ 3345:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_objectAssign_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4239);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);



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
var mergeAll = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mergeAll(list) {
  return _internal_objectAssign_js__WEBPACK_IMPORTED_MODULE_1__["default"].apply(null, [{}].concat(list));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeAll);

/***/ }),

/***/ 4149:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_objectAssign_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4239);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);



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
var mergeLeft = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mergeLeft(l, r) {
  return (0,_internal_objectAssign_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, r, l);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeLeft);

/***/ }),

/***/ 1319:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_objectAssign_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4239);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);



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
var mergeRight = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mergeRight(l, r) {
  return (0,_internal_objectAssign_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, l, r);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeRight);

/***/ }),

/***/ 6744:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);


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
var modulo = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function modulo(a, b) {
  return a % b;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modulo);

/***/ }),

/***/ 8922:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);


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
var nAry = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function nAry(n, fn) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nAry);

/***/ }),

/***/ 2409:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);


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
var not = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function not(a) {
  return !a;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (not);

/***/ }),

/***/ 9538:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_nth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6359);



/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> a | Undefined
 * @sig Number -> String -> String | Undefined
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
 *      R.nth(3, 'abc'); //=> undefined
 * @symb R.nth(-1, [a, b, c]) = c
 * @symb R.nth(0, [a, b, c]) = a
 * @symb R.nth(1, [a, b, c]) = b
 */
var nth = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_internal_nth_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nth);

/***/ }),

/***/ 4032:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _internal_nth_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6359);
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5845);




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
var nthArg = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function nthArg(n) {
  var arity = n < 0 ? 1 : n + 1;
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arity, function () {
    return (0,_internal_nth_js__WEBPACK_IMPORTED_MODULE_2__["default"])(n, arguments);
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nthArg);

/***/ }),

/***/ 4787:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);


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
var of = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function of(Ctor, val) {
  return typeof Ctor['fantasy-land/of'] === 'function' ? Ctor['fantasy-land/of'](val) : typeof Ctor.of === 'function' ? Ctor.of(val) : [val];
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (of);

/***/ }),

/***/ 4407:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);


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
var or = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function or(a, b) {
  return a || b;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (or);

/***/ }),

/***/ 7992:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2173);


// `Identity` is a functor that holds a single value, where `map` simply
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
var over = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function over(lens, f, x) {
  // The value returned by the getter function is first transformed with `f`,
  // then set as the value of an `Identity`. This is then mapped over with the
  // setter function of the lens.
  return lens(function (y) {
    return Identity(f(y));
  })(x).value;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (over);

/***/ }),

/***/ 4073:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2613);
/* harmony import */ var _internal_createPartialApplicator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4293);



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
var partial = /*#__PURE__*/(0,_internal_createPartialApplicator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_internal_concat_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (partial);

/***/ }),

/***/ 4445:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_path_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8506);



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

var path = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_internal_path_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (path);

/***/ }),

/***/ 3:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2173);
/* harmony import */ var _internal_path_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8506);
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7911);




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
var pathEq = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function pathEq(val, pathAr, obj) {
  return (0,_equals_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_internal_path_js__WEBPACK_IMPORTED_MODULE_2__["default"])(pathAr, obj), val);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pathEq);

/***/ }),

/***/ 2220:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2173);
/* harmony import */ var _internal_path_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8506);
/* harmony import */ var _defaultTo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7012);




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
var pathOr = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function pathOr(d, p, obj) {
  return (0,_defaultTo_js__WEBPACK_IMPORTED_MODULE_1__["default"])(d, (0,_internal_path_js__WEBPACK_IMPORTED_MODULE_2__["default"])(p, obj));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pathOr);

/***/ }),

/***/ 7924:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2173);
/* harmony import */ var _internal_path_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8506);



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
var pathSatisfies = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function pathSatisfies(pred, propPath, obj) {
  return pred((0,_internal_path_js__WEBPACK_IMPORTED_MODULE_1__["default"])(propPath, obj));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pathSatisfies);

/***/ }),

/***/ 3778:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);


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
var pickBy = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function pickBy(test, obj) {
  var result = {};
  for (var prop in obj) {
    if (test(obj[prop], prop, obj)) {
      result[prop] = obj[prop];
    }
  }
  return result;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pickBy);

/***/ }),

/***/ 1182:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ pipe)
/* harmony export */ });
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7660);
/* harmony import */ var _internal_pipe_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5393);
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5920);
/* harmony import */ var _tail_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4596);





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
  return (0,_internal_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arguments[0].length, (0,_reduce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_internal_pipe_js__WEBPACK_IMPORTED_MODULE_2__["default"], arguments[0], (0,_tail_js__WEBPACK_IMPORTED_MODULE_3__["default"])(arguments)));
}

/***/ }),

/***/ 9849:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2598);
/* harmony import */ var _prop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5987);




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
var pluck = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function pluck(p, list) {
  return (0,_map_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_prop_js__WEBPACK_IMPORTED_MODULE_2__["default"])(p), list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pluck);

/***/ }),

/***/ 5800:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2613);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);



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
var prepend = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function prepend(el, list) {
  return (0,_internal_concat_js__WEBPACK_IMPORTED_MODULE_1__["default"])([el], list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prepend);

/***/ }),

/***/ 5987:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_isInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4279);
/* harmony import */ var _internal_nth_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6359);




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

var prop = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function prop(p, obj) {
  if (obj == null) {
    return;
  }
  return (0,_internal_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"])(p) ? (0,_internal_nth_js__WEBPACK_IMPORTED_MODULE_2__["default"])(p, obj) : obj[p];
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prop);

/***/ }),

/***/ 5201:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2173);
/* harmony import */ var _prop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5987);
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7911);




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
var propEq = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function propEq(val, name, obj) {
  return (0,_equals_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val, (0,_prop_js__WEBPACK_IMPORTED_MODULE_2__["default"])(name, obj));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (propEq);

/***/ }),

/***/ 6850:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2173);
/* harmony import */ var _defaultTo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7012);
/* harmony import */ var _prop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5987);




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
var propOr = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function propOr(val, p, obj) {
  return (0,_defaultTo_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val, (0,_prop_js__WEBPACK_IMPORTED_MODULE_2__["default"])(p, obj));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (propOr);

/***/ }),

/***/ 8422:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _prop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5987);



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
var props = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function props(ps, obj) {
  return ps.map(function (p) {
    return (0,_prop_js__WEBPACK_IMPORTED_MODULE_1__["default"])(p, obj);
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (props);

/***/ }),

/***/ 5361:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_isNumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(464);



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
var range = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function range(from, to) {
  if (!((0,_internal_isNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"])(from) && (0,_internal_isNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"])(to))) {
    throw new TypeError('Both arguments to range must be numbers');
  }
  var result = Array(from < to ? to - from : 0);
  var finish = from < 0 ? to + Math.abs(from) : to - from;
  var idx = 0;
  while (idx < finish) {
    result[idx] = idx + from;
    idx += 1;
  }
  return result;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (range);

/***/ }),

/***/ 5920:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2173);
/* harmony import */ var _internal_xReduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8475);
/* harmony import */ var _internal_xwrap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7141);




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
var reduce = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (xf, acc, list) {
  return (0,_internal_xReduce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(typeof xf === 'function' ? (0,_internal_xwrap_js__WEBPACK_IMPORTED_MODULE_2__["default"])(xf) : xf, acc, list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reduce);

/***/ }),

/***/ 4804:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2173);


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
var reduceRight = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function reduceRight(fn, acc, list) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reduceRight);

/***/ }),

/***/ 526:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _internal_reduced_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(259);



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
var reduced = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_internal_reduced_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reduced);

/***/ }),

/***/ 6173:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_complement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(889);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2720);




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
var reject = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function reject(pred, filterable) {
  return (0,_filter_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_internal_complement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(pred), filterable);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reject);

/***/ }),

/***/ 954:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2173);


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
var remove = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function remove(start, count, list) {
  var result = Array.prototype.slice.call(list, 0);
  result.splice(start, count);
  return result;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (remove);

/***/ }),

/***/ 8276:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2173);


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
var replace = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function replace(regex, replacement, str) {
  return str.replace(regex, replacement);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (replace);

/***/ }),

/***/ 5506:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _internal_isString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8228);



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
var reverse = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function reverse(list) {
  return (0,_internal_isString_js__WEBPACK_IMPORTED_MODULE_1__["default"])(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reverse);

/***/ }),

/***/ 3299:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _ap_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4087);
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2598);
/* harmony import */ var _prepend_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5800);
/* harmony import */ var _reduceRight_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4804);
/* harmony import */ var _internal_identity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1031);







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
var sequence = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function sequence(F, traversable) {
  var of = typeof F['fantasy-land/of'] === 'function' ? F['fantasy-land/of'] : typeof F.of === 'function' ? F.of : F;
  var TypeRep = {
    'fantasy-land/of': of
  };
  return typeof traversable['fantasy-land/traverse'] === 'function' ? traversable['fantasy-land/traverse'](TypeRep, _internal_identity_js__WEBPACK_IMPORTED_MODULE_1__["default"]) : typeof traversable.traverse === 'function' ? traversable.traverse(TypeRep, _internal_identity_js__WEBPACK_IMPORTED_MODULE_1__["default"]) : (0,_reduceRight_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function (x, acc) {
    return (0,_ap_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_map_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_prepend_js__WEBPACK_IMPORTED_MODULE_5__["default"], x), acc);
  }, of([]), traversable);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sequence);

/***/ }),

/***/ 7094:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(371);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2173);



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
var slice = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/(0,_internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_1__["default"])('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slice);

/***/ }),

/***/ 8278:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);


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
var sort = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function sort(comparator, list) {
  return Array.prototype.slice.call(list, 0).sort(comparator);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sort);

/***/ }),

/***/ 2610:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);


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
var sortWith = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function sortWith(fns, list) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sortWith);

/***/ }),

/***/ 516:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _invoker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7898);


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
var split = /*#__PURE__*/(0,_invoker_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, 'split');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (split);

/***/ }),

/***/ 3766:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);


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
var subtract = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function subtract(a, b) {
  return Number(a) - Number(b);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (subtract);

/***/ }),

/***/ 4596:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(371);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7094);




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
var tail = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/(0,_internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_1__["default"])('tail', /*#__PURE__*/(0,_slice_js__WEBPACK_IMPORTED_MODULE_2__["default"])(1, Infinity)));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tail);

/***/ }),

/***/ 4193:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9619);
/* harmony import */ var _internal_xtap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6452);




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
var tap = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])([], _internal_xtap_js__WEBPACK_IMPORTED_MODULE_2__["default"], function tap(fn, x) {
  fn(x);
  return x;
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tap);

/***/ }),

/***/ 3218:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_cloneRegExp_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(557);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_isRegExp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4200);
/* harmony import */ var _toString_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2338);





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
var test = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function test(pattern, str) {
  if (!(0,_internal_isRegExp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(pattern)) {
    throw new TypeError('‘test’ requires a value of type RegExp as its first argument; received ' + (0,_toString_js__WEBPACK_IMPORTED_MODULE_2__["default"])(pattern));
  }
  return (0,_internal_cloneRegExp_js__WEBPACK_IMPORTED_MODULE_3__["default"])(pattern).test(str);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (test);

/***/ }),

/***/ 2374:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1069);



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
var toPairs = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function toPairs(obj) {
  var pairs = [];
  for (var prop in obj) {
    if ((0,_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(prop, obj)) {
      pairs[pairs.length] = [prop, obj[prop]];
    }
  }
  return pairs;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toPairs);

/***/ }),

/***/ 2338:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _internal_toString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(565);



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
var toString = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function toString(val) {
  return (0,_internal_toString_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val, []);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toString);

/***/ }),

/***/ 2875:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);


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
var transpose = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function transpose(outerlist) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (transpose);

/***/ }),

/***/ 796:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2173);
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2598);
/* harmony import */ var _sequence_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3299);




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
var traverse = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function traverse(F, f, traversable) {
  var of = typeof F['fantasy-land/of'] === 'function' ? F['fantasy-land/of'] : typeof F.of === 'function' ? F.of : F;
  var TypeRep = {
    'fantasy-land/of': of
  };
  return typeof traversable['fantasy-land/traverse'] === 'function' ? traversable['fantasy-land/traverse'](TypeRep, f) : typeof traversable.traverse === 'function' ? traversable.traverse(TypeRep, f) : (0,_sequence_js__WEBPACK_IMPORTED_MODULE_1__["default"])(TypeRep, (0,_map_js__WEBPACK_IMPORTED_MODULE_2__["default"])(f, traversable));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (traverse);

/***/ }),

/***/ 1322:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);


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
 *      R.type(async () => {}); //=> "AsyncFunction"
 *      R.type(undefined); //=> "Undefined"
 *      R.type(BigInt(123)); //=> "BigInt"
 */
var type = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function type(val) {
  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (type);

/***/ }),

/***/ 3121:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);


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
var unapply = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function unapply(fn) {
  return function () {
    return fn(Array.prototype.slice.call(arguments, 0));
  };
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unapply);

/***/ }),

/***/ 3163:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _nAry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8922);



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
var unary = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function unary(fn) {
  return (0,_nAry_js__WEBPACK_IMPORTED_MODULE_1__["default"])(1, fn);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unary);

/***/ }),

/***/ 7168:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3628);
/* harmony import */ var _uniqBy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1170);



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
var uniq = /*#__PURE__*/(0,_uniqBy_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_identity_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (uniq);

/***/ }),

/***/ 1170:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_Set_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3413);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9619);
/* harmony import */ var _internal_xuniqBy_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9125);





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
var uniqBy = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])([], _internal_xuniqBy_js__WEBPACK_IMPORTED_MODULE_2__["default"], function (fn, list) {
  var set = new _internal_Set_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (uniqBy);

/***/ }),

/***/ 9307:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9619);
/* harmony import */ var _internal_includesWith_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8496);
/* harmony import */ var _internal_xuniqWith_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5020);





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
var uniqWith = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])([], _internal_xuniqWith_js__WEBPACK_IMPORTED_MODULE_2__["default"], function (pred, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var item;
  while (idx < len) {
    item = list[idx];
    if (!(0,_internal_includesWith_js__WEBPACK_IMPORTED_MODULE_3__["default"])(pred, item, result)) {
      result[result.length] = item;
    }
    idx += 1;
  }
  return result;
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (uniqWith);

/***/ }),

/***/ 6935:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2173);
/* harmony import */ var _adjust_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9381);
/* harmony import */ var _always_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6183);




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
var update = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function update(idx, x, list) {
  return (0,_adjust_js__WEBPACK_IMPORTED_MODULE_1__["default"])(idx, (0,_always_js__WEBPACK_IMPORTED_MODULE_2__["default"])(x), list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (update);

/***/ }),

/***/ 7359:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5845);



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
var useWith = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function useWith(fn, transformers) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(transformers.length, function () {
    var args = [];
    var idx = 0;
    while (idx < transformers.length) {
      args.push(transformers[idx].call(this, arguments[idx]));
      idx += 1;
    }
    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, transformers.length)));
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useWith);

/***/ }),

/***/ 2060:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3579);
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2506);



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
var values = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function values(obj) {
  var props = (0,_keys_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj);
  var len = props.length;
  var vals = [];
  var idx = 0;
  while (idx < len) {
    vals[idx] = obj[props[idx]];
    idx += 1;
  }
  return vals;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (values);

/***/ }),

/***/ 2291:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);


// `Const` is a functor that effectively ignores the function given to `map`.
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
var view = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function view(lens, x) {
  // Using `Const` effectively ignores the setter function of the `lens`,
  // leaving the value returned by the getter function unmodified.
  return lens(Const)(x).value;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (view);

/***/ }),

/***/ 2366:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2173);


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
var when = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function when(pred, whenTrueFn, x) {
  return pred(x) ? whenTrueFn(x) : x;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (when);

/***/ }),

/***/ 8391:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2254);


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
var zip = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function zip(a, b) {
  var len = Math.min(a.length, b.length);
  var rv = Array(len);
  var idx = 0;
  while (idx < len) {
    rv[idx] = [a[idx], b[idx]];
    idx += 1;
  }
  return rv;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (zip);

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Identity: () => (/* reexport safe */ _fantasy_land_Identity_js__WEBPACK_IMPORTED_MODULE_211__["default"]),
/* harmony export */   Y: () => (/* reexport safe */ _Y_js__WEBPACK_IMPORTED_MODULE_104__["default"]),
/* harmony export */   allEqual: () => (/* reexport safe */ _allEqual_js__WEBPACK_IMPORTED_MODULE_134__["default"]),
/* harmony export */   allEqualTo: () => (/* reexport safe */ _allEqualTo_js__WEBPACK_IMPORTED_MODULE_138__["default"]),
/* harmony export */   allIdentical: () => (/* reexport safe */ _allIdentical_js__WEBPACK_IMPORTED_MODULE_136__["default"]),
/* harmony export */   allIdenticalTo: () => (/* reexport safe */ _allIdenticalTo_js__WEBPACK_IMPORTED_MODULE_137__["default"]),
/* harmony export */   allP: () => (/* reexport safe */ _allP_js__WEBPACK_IMPORTED_MODULE_96__["default"]),
/* harmony export */   allSettledP: () => (/* reexport safe */ _allSettledP_js__WEBPACK_IMPORTED_MODULE_103__["default"]),
/* harmony export */   allUnique: () => (/* reexport safe */ _allUnique_js__WEBPACK_IMPORTED_MODULE_141__["default"]),
/* harmony export */   anyP: () => (/* reexport safe */ _anyP_js__WEBPACK_IMPORTED_MODULE_108__["default"]),
/* harmony export */   appendFlipped: () => (/* reexport safe */ _appendFlipped_js__WEBPACK_IMPORTED_MODULE_125__["default"]),
/* harmony export */   argsPass: () => (/* reexport safe */ _argsPass_js__WEBPACK_IMPORTED_MODULE_189__["default"]),
/* harmony export */   async: () => (/* reexport safe */ _async_js__WEBPACK_IMPORTED_MODULE_107__["default"]),
/* harmony export */   cata: () => (/* reexport safe */ _cata_js__WEBPACK_IMPORTED_MODULE_91__["default"]),
/* harmony export */   catchP: () => (/* reexport safe */ _catchP_js__WEBPACK_IMPORTED_MODULE_97__["default"]),
/* harmony export */   ceil: () => (/* reexport safe */ _ceil_js__WEBPACK_IMPORTED_MODULE_192__["default"]),
/* harmony export */   compact: () => (/* reexport safe */ _compact_js__WEBPACK_IMPORTED_MODULE_124__["default"]),
/* harmony export */   concatAll: () => (/* reexport safe */ _concatAll_js__WEBPACK_IMPORTED_MODULE_117__["default"]),
/* harmony export */   concatRight: () => (/* reexport safe */ _concatRight_js__WEBPACK_IMPORTED_MODULE_118__["default"]),
/* harmony export */   copyKeys: () => (/* reexport safe */ _copyKeys_js__WEBPACK_IMPORTED_MODULE_156__["default"]),
/* harmony export */   curryRight: () => (/* reexport safe */ _curryRight_js__WEBPACK_IMPORTED_MODULE_95__["default"]),
/* harmony export */   curryRightN: () => (/* reexport safe */ _curryRightN_js__WEBPACK_IMPORTED_MODULE_94__["default"]),
/* harmony export */   defaultWhen: () => (/* reexport safe */ _defaultWhen_js__WEBPACK_IMPORTED_MODULE_182__["default"]),
/* harmony export */   delayP: () => (/* reexport safe */ _delayP_js__WEBPACK_IMPORTED_MODULE_101__["default"]),
/* harmony export */   dispatch: () => (/* reexport safe */ _dispatch_js__WEBPACK_IMPORTED_MODULE_106__["default"]),
/* harmony export */   divideNum: () => (/* reexport safe */ _divideNum_js__WEBPACK_IMPORTED_MODULE_193__["default"]),
/* harmony export */   dropArgs: () => (/* reexport safe */ _dropArgs_js__WEBPACK_IMPORTED_MODULE_190__["default"]),
/* harmony export */   ensureArray: () => (/* reexport safe */ _ensureArray_js__WEBPACK_IMPORTED_MODULE_116__["default"]),
/* harmony export */   escapeRegExp: () => (/* reexport safe */ _escapeRegExp_js__WEBPACK_IMPORTED_MODULE_202__["default"]),
/* harmony export */   filterIndexed: () => (/* reexport safe */ _filterIndexed_js__WEBPACK_IMPORTED_MODULE_113__["default"]),
/* harmony export */   findOr: () => (/* reexport safe */ _findOr_js__WEBPACK_IMPORTED_MODULE_148__["default"]),
/* harmony export */   firstP: () => (/* reexport safe */ _anyP_js__WEBPACK_IMPORTED_MODULE_108__["default"]),
/* harmony export */   flattenDepth: () => (/* reexport safe */ _flattenDepth_js__WEBPACK_IMPORTED_MODULE_139__["default"]),
/* harmony export */   flattenPath: () => (/* reexport safe */ _flattenPath_js__WEBPACK_IMPORTED_MODULE_167__["default"]),
/* harmony export */   flattenProp: () => (/* reexport safe */ _flattenProp_js__WEBPACK_IMPORTED_MODULE_166__["default"]),
/* harmony export */   floor: () => (/* reexport safe */ _floor_js__WEBPACK_IMPORTED_MODULE_194__["default"]),
/* harmony export */   fnull: () => (/* reexport safe */ _fnull_js__WEBPACK_IMPORTED_MODULE_110__["default"]),
/* harmony export */   inRange: () => (/* reexport safe */ _inRange_js__WEBPACK_IMPORTED_MODULE_179__["default"]),
/* harmony export */   included: () => (/* reexport safe */ _included_js__WEBPACK_IMPORTED_MODULE_126__["default"]),
/* harmony export */   invoke: () => (/* reexport safe */ _invoke_js__WEBPACK_IMPORTED_MODULE_149__["default"]),
/* harmony export */   invokeArgs: () => (/* reexport safe */ _invokeArgs_js__WEBPACK_IMPORTED_MODULE_150__["default"]),
/* harmony export */   isArray: () => (/* reexport safe */ _isArray_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   isArrayLike: () => (/* reexport safe */ _isArrayLike_js__WEBPACK_IMPORTED_MODULE_17__["default"]),
/* harmony export */   isAsyncFunction: () => (/* reexport safe */ _isAsyncFunction_js__WEBPACK_IMPORTED_MODULE_21__["default"]),
/* harmony export */   isBigInt: () => (/* reexport safe */ _isBigInt_js__WEBPACK_IMPORTED_MODULE_54__["default"]),
/* harmony export */   isBlank: () => (/* reexport safe */ _isBlank_js__WEBPACK_IMPORTED_MODULE_82__["default"]),
/* harmony export */   isBoolean: () => (/* reexport safe */ _isBoolean_js__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   isDate: () => (/* reexport safe */ _isDate_js__WEBPACK_IMPORTED_MODULE_31__["default"]),
/* harmony export */   isEmptyArray: () => (/* reexport safe */ _isEmptyArray_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   isEmptyString: () => (/* reexport safe */ _isEmptyString_js__WEBPACK_IMPORTED_MODULE_14__["default"]),
/* harmony export */   isError: () => (/* reexport safe */ _isError_js__WEBPACK_IMPORTED_MODULE_77__["default"]),
/* harmony export */   isEven: () => (/* reexport safe */ _isEven_js__WEBPACK_IMPORTED_MODULE_60__["default"]),
/* harmony export */   isFalse: () => (/* reexport safe */ _isFalse_js__WEBPACK_IMPORTED_MODULE_66__["default"]),
/* harmony export */   isFalsy: () => (/* reexport safe */ _isFalsy_js__WEBPACK_IMPORTED_MODULE_68__["default"]),
/* harmony export */   isFinite: () => (/* reexport safe */ _isFinite_js__WEBPACK_IMPORTED_MODULE_48__["default"]),
/* harmony export */   isFloat: () => (/* reexport safe */ _isFloat_js__WEBPACK_IMPORTED_MODULE_55__["default"]),
/* harmony export */   isFunction: () => (/* reexport safe */ _isFunction_js__WEBPACK_IMPORTED_MODULE_23__["default"]),
/* harmony export */   isGeneratorFunction: () => (/* reexport safe */ _isGeneratorFunction_js__WEBPACK_IMPORTED_MODULE_19__["default"]),
/* harmony export */   isIndexed: () => (/* reexport safe */ _isIndexed_js__WEBPACK_IMPORTED_MODULE_76__["default"]),
/* harmony export */   isInt32: () => (/* reexport safe */ _isInteger32_js__WEBPACK_IMPORTED_MODULE_51__["default"]),
/* harmony export */   isInteger: () => (/* reexport safe */ _isInteger_js__WEBPACK_IMPORTED_MODULE_50__["default"]),
/* harmony export */   isInteger32: () => (/* reexport safe */ _isInteger32_js__WEBPACK_IMPORTED_MODULE_51__["default"]),
/* harmony export */   isInvalidDate: () => (/* reexport safe */ _isNotValidDate_js__WEBPACK_IMPORTED_MODULE_34__["default"]),
/* harmony export */   isIterable: () => (/* reexport safe */ _isIterable_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   isMap: () => (/* reexport safe */ _isMap_js__WEBPACK_IMPORTED_MODULE_44__["default"]),
/* harmony export */   isNaN: () => (/* reexport safe */ _isNaN_js__WEBPACK_IMPORTED_MODULE_46__["default"]),
/* harmony export */   isNaturalNumber: () => (/* reexport safe */ _isNaturalNumber_js__WEBPACK_IMPORTED_MODULE_78__["default"]),
/* harmony export */   isNegative: () => (/* reexport safe */ _isNegative_js__WEBPACK_IMPORTED_MODULE_38__["default"]),
/* harmony export */   isNegativeZero: () => (/* reexport safe */ _isNegativeZero_js__WEBPACK_IMPORTED_MODULE_40__["default"]),
/* harmony export */   isNilOrEmpty: () => (/* reexport safe */ _isNilOrEmpty_js__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   isNonEmptyArray: () => (/* reexport safe */ _isNonEmptyArray_js__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   isNonEmptyString: () => (/* reexport safe */ _isNonEmptyString_js__WEBPACK_IMPORTED_MODULE_16__["default"]),
/* harmony export */   isNonNegative: () => (/* reexport safe */ _isNonNegative_js__WEBPACK_IMPORTED_MODULE_43__["default"]),
/* harmony export */   isNonPositive: () => (/* reexport safe */ _isNonPositive_js__WEBPACK_IMPORTED_MODULE_42__["default"]),
/* harmony export */   isNotArray: () => (/* reexport safe */ _isNotArray_js__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   isNotArrayLike: () => (/* reexport safe */ _isNotArrayLike_js__WEBPACK_IMPORTED_MODULE_18__["default"]),
/* harmony export */   isNotAsyncFunction: () => (/* reexport safe */ _isNotAsyncFunction_js__WEBPACK_IMPORTED_MODULE_22__["default"]),
/* harmony export */   isNotBoolean: () => (/* reexport safe */ _isNotBoolean_js__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   isNotDate: () => (/* reexport safe */ _isNotDate_js__WEBPACK_IMPORTED_MODULE_32__["default"]),
/* harmony export */   isNotFinite: () => (/* reexport safe */ _isNotFinite_js__WEBPACK_IMPORTED_MODULE_49__["default"]),
/* harmony export */   isNotFloat: () => (/* reexport safe */ _isNotFloat_js__WEBPACK_IMPORTED_MODULE_56__["default"]),
/* harmony export */   isNotFunction: () => (/* reexport safe */ _isNotFunction_js__WEBPACK_IMPORTED_MODULE_24__["default"]),
/* harmony export */   isNotGeneratorFunction: () => (/* reexport safe */ _isNotGeneratorFunction_js__WEBPACK_IMPORTED_MODULE_20__["default"]),
/* harmony export */   isNotInteger: () => (/* reexport safe */ _isNotInteger_js__WEBPACK_IMPORTED_MODULE_53__["default"]),
/* harmony export */   isNotMap: () => (/* reexport safe */ _isNotMap_js__WEBPACK_IMPORTED_MODULE_45__["default"]),
/* harmony export */   isNotNaN: () => (/* reexport safe */ _isNotNaN_js__WEBPACK_IMPORTED_MODULE_47__["default"]),
/* harmony export */   isNotNil: () => (/* reexport safe */ _isNotNil_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   isNotNilOrEmpty: () => (/* reexport safe */ _isNotNilOrEmpty_js__WEBPACK_IMPORTED_MODULE_41__["default"]),
/* harmony export */   isNotNull: () => (/* reexport safe */ _isNotNull_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   isNotNumber: () => (/* reexport safe */ _isNotNumber_js__WEBPACK_IMPORTED_MODULE_36__["default"]),
/* harmony export */   isNotObj: () => (/* reexport safe */ _isNotObj_js__WEBPACK_IMPORTED_MODULE_26__["default"]),
/* harmony export */   isNotObjLike: () => (/* reexport safe */ _isNotObjLike_js__WEBPACK_IMPORTED_MODULE_28__["default"]),
/* harmony export */   isNotObject: () => (/* reexport safe */ _isNotObj_js__WEBPACK_IMPORTED_MODULE_26__["default"]),
/* harmony export */   isNotObjectLike: () => (/* reexport safe */ _isNotObjLike_js__WEBPACK_IMPORTED_MODULE_28__["default"]),
/* harmony export */   isNotPair: () => (/* reexport safe */ _isNotPair_js__WEBPACK_IMPORTED_MODULE_62__["default"]),
/* harmony export */   isNotPlainObj: () => (/* reexport safe */ _isNotPlainObj_js__WEBPACK_IMPORTED_MODULE_30__["default"]),
/* harmony export */   isNotPlainObject: () => (/* reexport safe */ _isNotPlainObj_js__WEBPACK_IMPORTED_MODULE_30__["default"]),
/* harmony export */   isNotPrimitive: () => (/* reexport safe */ _isNotPrimitive_js__WEBPACK_IMPORTED_MODULE_80__["default"]),
/* harmony export */   isNotRegExp: () => (/* reexport safe */ _isNotRegExp_js__WEBPACK_IMPORTED_MODULE_70__["default"]),
/* harmony export */   isNotSet: () => (/* reexport safe */ _isNotSet_js__WEBPACK_IMPORTED_MODULE_72__["default"]),
/* harmony export */   isNotString: () => (/* reexport safe */ _isNotString_js__WEBPACK_IMPORTED_MODULE_15__["default"]),
/* harmony export */   isNotUndefined: () => (/* reexport safe */ _isNotUndefined_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   isNotValidDate: () => (/* reexport safe */ _isNotValidDate_js__WEBPACK_IMPORTED_MODULE_34__["default"]),
/* harmony export */   isNotValidNumber: () => (/* reexport safe */ _isNotValidNumber_js__WEBPACK_IMPORTED_MODULE_58__["default"]),
/* harmony export */   isNull: () => (/* reexport safe */ _isNull_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   isNumber: () => (/* reexport safe */ _isNumber_js__WEBPACK_IMPORTED_MODULE_35__["default"]),
/* harmony export */   isObj: () => (/* reexport safe */ _isObj_js__WEBPACK_IMPORTED_MODULE_25__["default"]),
/* harmony export */   isObjLike: () => (/* reexport safe */ _isObjLike_js__WEBPACK_IMPORTED_MODULE_27__["default"]),
/* harmony export */   isObject: () => (/* reexport safe */ _isObj_js__WEBPACK_IMPORTED_MODULE_25__["default"]),
/* harmony export */   isObjectLike: () => (/* reexport safe */ _isObjLike_js__WEBPACK_IMPORTED_MODULE_27__["default"]),
/* harmony export */   isOdd: () => (/* reexport safe */ _isOdd_js__WEBPACK_IMPORTED_MODULE_59__["default"]),
/* harmony export */   isPair: () => (/* reexport safe */ _isPair_js__WEBPACK_IMPORTED_MODULE_61__["default"]),
/* harmony export */   isPlainObj: () => (/* reexport safe */ _isPlainObj_js__WEBPACK_IMPORTED_MODULE_29__["default"]),
/* harmony export */   isPlainObject: () => (/* reexport safe */ _isPlainObj_js__WEBPACK_IMPORTED_MODULE_29__["default"]),
/* harmony export */   isPositive: () => (/* reexport safe */ _isPositive_js__WEBPACK_IMPORTED_MODULE_37__["default"]),
/* harmony export */   isPositiveZero: () => (/* reexport safe */ _isPositiveZero_js__WEBPACK_IMPORTED_MODULE_39__["default"]),
/* harmony export */   isPrimitive: () => (/* reexport safe */ _isPrimitive_js__WEBPACK_IMPORTED_MODULE_79__["default"]),
/* harmony export */   isPromise: () => (/* reexport safe */ _isPromise_js__WEBPACK_IMPORTED_MODULE_64__["default"]),
/* harmony export */   isPrototypeOf: () => (/* reexport safe */ _isPrototypeOf_js__WEBPACK_IMPORTED_MODULE_170__["default"]),
/* harmony export */   isRegExp: () => (/* reexport safe */ _isRegExp_js__WEBPACK_IMPORTED_MODULE_69__["default"]),
/* harmony export */   isSafeInteger: () => (/* reexport safe */ _isSafeInteger_js__WEBPACK_IMPORTED_MODULE_75__["default"]),
/* harmony export */   isSentinelValue: () => (/* reexport safe */ _isSentinelValue_js__WEBPACK_IMPORTED_MODULE_81__["default"]),
/* harmony export */   isSet: () => (/* reexport safe */ _isSet_js__WEBPACK_IMPORTED_MODULE_71__["default"]),
/* harmony export */   isSparseArray: () => (/* reexport safe */ _isSparseArray_js__WEBPACK_IMPORTED_MODULE_73__["default"]),
/* harmony export */   isString: () => (/* reexport safe */ _isString_js__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   isSymbol: () => (/* reexport safe */ _isSymbol_js__WEBPACK_IMPORTED_MODULE_74__["default"]),
/* harmony export */   isThenable: () => (/* reexport safe */ _isThenable_js__WEBPACK_IMPORTED_MODULE_63__["default"]),
/* harmony export */   isTrue: () => (/* reexport safe */ _isTrue_js__WEBPACK_IMPORTED_MODULE_65__["default"]),
/* harmony export */   isTruthy: () => (/* reexport safe */ _isTruthy_js__WEBPACK_IMPORTED_MODULE_67__["default"]),
/* harmony export */   isUint32: () => (/* reexport safe */ _isUinteger32_js__WEBPACK_IMPORTED_MODULE_52__["default"]),
/* harmony export */   isUinteger32: () => (/* reexport safe */ _isUinteger32_js__WEBPACK_IMPORTED_MODULE_52__["default"]),
/* harmony export */   isUndefined: () => (/* reexport safe */ _isUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   isValidDate: () => (/* reexport safe */ _isValidDate_js__WEBPACK_IMPORTED_MODULE_33__["default"]),
/* harmony export */   isValidNumber: () => (/* reexport safe */ _isValidNumber_js__WEBPACK_IMPORTED_MODULE_57__["default"]),
/* harmony export */   lastP: () => (/* reexport safe */ _lastP_js__WEBPACK_IMPORTED_MODULE_109__["default"]),
/* harmony export */   lengthEq: () => (/* reexport safe */ _lengthEq_js__WEBPACK_IMPORTED_MODULE_132__["default"]),
/* harmony export */   lengthGt: () => (/* reexport safe */ _lengthGt_js__WEBPACK_IMPORTED_MODULE_128__["default"]),
/* harmony export */   lengthGte: () => (/* reexport safe */ _lengthGte_js__WEBPACK_IMPORTED_MODULE_130__["default"]),
/* harmony export */   lengthLt: () => (/* reexport safe */ _lengthLt_js__WEBPACK_IMPORTED_MODULE_129__["default"]),
/* harmony export */   lengthLte: () => (/* reexport safe */ _lengthLte_js__WEBPACK_IMPORTED_MODULE_131__["default"]),
/* harmony export */   lengthNotEq: () => (/* reexport safe */ _lengthNotEq_js__WEBPACK_IMPORTED_MODULE_133__["default"]),
/* harmony export */   lensEq: () => (/* reexport safe */ _lensEq_js__WEBPACK_IMPORTED_MODULE_171__["default"]),
/* harmony export */   lensIso: () => (/* reexport safe */ _lensIso_js__WEBPACK_IMPORTED_MODULE_176__["default"]),
/* harmony export */   lensNotEq: () => (/* reexport safe */ _lensNotEq_js__WEBPACK_IMPORTED_MODULE_172__["default"]),
/* harmony export */   lensNotSatisfy: () => (/* reexport safe */ _lensNotSatisfy_js__WEBPACK_IMPORTED_MODULE_174__["default"]),
/* harmony export */   lensSatisfies: () => (/* reexport safe */ _lensSatisfies_js__WEBPACK_IMPORTED_MODULE_173__["default"]),
/* harmony export */   lensTraverse: () => (/* reexport safe */ _lensTraverse_js__WEBPACK_IMPORTED_MODULE_175__["default"]),
/* harmony export */   liftF: () => (/* reexport safe */ _liftF_js__WEBPACK_IMPORTED_MODULE_90__["default"]),
/* harmony export */   liftFN: () => (/* reexport safe */ _liftFN_js__WEBPACK_IMPORTED_MODULE_89__["default"]),
/* harmony export */   list: () => (/* reexport safe */ _list_js__WEBPACK_IMPORTED_MODULE_115__["default"]),
/* harmony export */   mapIndexed: () => (/* reexport safe */ _mapIndexed_js__WEBPACK_IMPORTED_MODULE_111__["default"]),
/* harmony export */   mergePath: () => (/* reexport safe */ _mergePath_js__WEBPACK_IMPORTED_MODULE_160__["default"]),
/* harmony export */   mergePaths: () => (/* reexport safe */ _mergePaths_js__WEBPACK_IMPORTED_MODULE_158__["default"]),
/* harmony export */   mergeProp: () => (/* reexport safe */ _mergeProp_js__WEBPACK_IMPORTED_MODULE_159__["default"]),
/* harmony export */   mergeProps: () => (/* reexport safe */ _mergeProps_js__WEBPACK_IMPORTED_MODULE_157__["default"]),
/* harmony export */   move: () => (/* reexport safe */ _move_js__WEBPACK_IMPORTED_MODULE_127__["default"]),
/* harmony export */   nand: () => (/* reexport safe */ _nand_js__WEBPACK_IMPORTED_MODULE_184__["default"]),
/* harmony export */   neither: () => (/* reexport safe */ _neither_js__WEBPACK_IMPORTED_MODULE_185__["default"]),
/* harmony export */   noneP: () => (/* reexport safe */ _noneP_js__WEBPACK_IMPORTED_MODULE_98__["default"]),
/* harmony export */   nonePass: () => (/* reexport safe */ _nonePass_js__WEBPACK_IMPORTED_MODULE_188__["default"]),
/* harmony export */   noop: () => (/* reexport safe */ _noop_js__WEBPACK_IMPORTED_MODULE_88__["default"]),
/* harmony export */   nor: () => (/* reexport safe */ _nor_js__WEBPACK_IMPORTED_MODULE_186__["default"]),
/* harmony export */   notAllPass: () => (/* reexport safe */ _notAllPass_js__WEBPACK_IMPORTED_MODULE_187__["default"]),
/* harmony export */   notAllUnique: () => (/* reexport safe */ _notAllUnique_js__WEBPACK_IMPORTED_MODULE_142__["default"]),
/* harmony export */   notBoth: () => (/* reexport safe */ _notBoth_js__WEBPACK_IMPORTED_MODULE_183__["default"]),
/* harmony export */   notEqual: () => (/* reexport safe */ _notEqual_js__WEBPACK_IMPORTED_MODULE_180__["default"]),
/* harmony export */   omitBy: () => (/* reexport safe */ _omitBy_js__WEBPACK_IMPORTED_MODULE_161__["default"]),
/* harmony export */   omitIndexes: () => (/* reexport safe */ _omitIndexes_js__WEBPACK_IMPORTED_MODULE_123__["default"]),
/* harmony export */   overlaps: () => (/* reexport safe */ _overlaps_js__WEBPACK_IMPORTED_MODULE_181__["default"]),
/* harmony export */   padCharsEnd: () => (/* reexport safe */ _padCharsEnd_js__WEBPACK_IMPORTED_MODULE_208__["default"]),
/* harmony export */   padCharsStart: () => (/* reexport safe */ _padCharsStart_js__WEBPACK_IMPORTED_MODULE_207__["default"]),
/* harmony export */   padEnd: () => (/* reexport safe */ _padEnd_js__WEBPACK_IMPORTED_MODULE_209__["default"]),
/* harmony export */   padStart: () => (/* reexport safe */ _padStart_js__WEBPACK_IMPORTED_MODULE_210__["default"]),
/* harmony export */   pathNotEq: () => (/* reexport safe */ _pathNotEq_js__WEBPACK_IMPORTED_MODULE_178__["default"]),
/* harmony export */   pathOrLazy: () => (/* reexport safe */ _pathOrLazy_js__WEBPACK_IMPORTED_MODULE_162__["default"]),
/* harmony export */   paths: () => (/* reexport safe */ _paths_js__WEBPACK_IMPORTED_MODULE_151__["default"]),
/* harmony export */   pickIndexes: () => (/* reexport safe */ _pickIndexes_js__WEBPACK_IMPORTED_MODULE_114__["default"]),
/* harmony export */   propNotEq: () => (/* reexport safe */ _propNotEq_js__WEBPACK_IMPORTED_MODULE_177__["default"]),
/* harmony export */   rangeStep: () => (/* reexport safe */ _rangeStep_js__WEBPACK_IMPORTED_MODULE_147__["default"]),
/* harmony export */   reduceIndexed: () => (/* reexport safe */ _reduceIndexed_js__WEBPACK_IMPORTED_MODULE_112__["default"]),
/* harmony export */   reduceP: () => (/* reexport safe */ _reduceP_js__WEBPACK_IMPORTED_MODULE_119__["default"]),
/* harmony export */   reduceRightP: () => (/* reexport safe */ _reduceRightP_js__WEBPACK_IMPORTED_MODULE_120__["default"]),
/* harmony export */   rejectP: () => (/* reexport safe */ _rejectP_js__WEBPACK_IMPORTED_MODULE_100__["default"]),
/* harmony export */   renameKey: () => (/* reexport safe */ _renameKey_js__WEBPACK_IMPORTED_MODULE_152__["default"]),
/* harmony export */   renameKeyWith: () => (/* reexport safe */ _renameKeyWith_js__WEBPACK_IMPORTED_MODULE_155__["default"]),
/* harmony export */   renameKeys: () => (/* reexport safe */ _renameKeys_js__WEBPACK_IMPORTED_MODULE_153__["default"]),
/* harmony export */   renameKeysWith: () => (/* reexport safe */ _renameKeysWith_js__WEBPACK_IMPORTED_MODULE_154__["default"]),
/* harmony export */   repeatStr: () => (/* reexport safe */ _repeatStr_js__WEBPACK_IMPORTED_MODULE_135__["default"]),
/* harmony export */   replaceAll: () => (/* reexport safe */ _replaceAll_js__WEBPACK_IMPORTED_MODULE_201__["default"]),
/* harmony export */   resolveP: () => (/* reexport safe */ _resolveP_js__WEBPACK_IMPORTED_MODULE_99__["default"]),
/* harmony export */   round: () => (/* reexport safe */ _round_js__WEBPACK_IMPORTED_MODULE_191__["default"]),
/* harmony export */   seq: () => (/* reexport safe */ _seq_js__WEBPACK_IMPORTED_MODULE_105__["default"]),
/* harmony export */   sequencing: () => (/* reexport safe */ _seq_js__WEBPACK_IMPORTED_MODULE_105__["default"]),
/* harmony export */   sign: () => (/* reexport safe */ _sign_js__WEBPACK_IMPORTED_MODULE_196__["default"]),
/* harmony export */   skipTake: () => (/* reexport safe */ _skipTake_js__WEBPACK_IMPORTED_MODULE_146__["default"]),
/* harmony export */   sliceFrom: () => (/* reexport safe */ _sliceFrom_js__WEBPACK_IMPORTED_MODULE_121__["default"]),
/* harmony export */   sliceTo: () => (/* reexport safe */ _sliceTo_js__WEBPACK_IMPORTED_MODULE_122__["default"]),
/* harmony export */   sortByPaths: () => (/* reexport safe */ _sortByPaths_js__WEBPACK_IMPORTED_MODULE_145__["default"]),
/* harmony export */   sortByProp: () => (/* reexport safe */ _sortByProp_js__WEBPACK_IMPORTED_MODULE_144__["default"]),
/* harmony export */   sortByProps: () => (/* reexport safe */ _sortByProps_js__WEBPACK_IMPORTED_MODULE_143__["default"]),
/* harmony export */   spreadPath: () => (/* reexport safe */ _spreadPath_js__WEBPACK_IMPORTED_MODULE_165__["default"]),
/* harmony export */   spreadProp: () => (/* reexport safe */ _spreadProp_js__WEBPACK_IMPORTED_MODULE_164__["default"]),
/* harmony export */   stubArray: () => (/* reexport safe */ _stubArray_js__WEBPACK_IMPORTED_MODULE_87__["default"]),
/* harmony export */   stubNull: () => (/* reexport safe */ _stubNull_js__WEBPACK_IMPORTED_MODULE_84__["default"]),
/* harmony export */   stubObj: () => (/* reexport safe */ _stubObj_js__WEBPACK_IMPORTED_MODULE_85__["default"]),
/* harmony export */   stubObject: () => (/* reexport safe */ _stubObj_js__WEBPACK_IMPORTED_MODULE_85__["default"]),
/* harmony export */   stubString: () => (/* reexport safe */ _stubString_js__WEBPACK_IMPORTED_MODULE_86__["default"]),
/* harmony export */   stubUndefined: () => (/* reexport safe */ _stubUndefined_js__WEBPACK_IMPORTED_MODULE_83__["default"]),
/* harmony export */   subtractNum: () => (/* reexport safe */ _subtractNum_js__WEBPACK_IMPORTED_MODULE_197__["default"]),
/* harmony export */   thenCatchP: () => (/* reexport safe */ _thenCatchP_js__WEBPACK_IMPORTED_MODULE_102__["default"]),
/* harmony export */   toArray: () => (/* reexport safe */ _toArray_js__WEBPACK_IMPORTED_MODULE_140__["default"]),
/* harmony export */   toInt32: () => (/* reexport safe */ _toInteger32_js__WEBPACK_IMPORTED_MODULE_198__["default"]),
/* harmony export */   toInteger32: () => (/* reexport safe */ _toInteger32_js__WEBPACK_IMPORTED_MODULE_198__["default"]),
/* harmony export */   toNumber: () => (/* reexport safe */ _toNumber_js__WEBPACK_IMPORTED_MODULE_200__["default"]),
/* harmony export */   toUint32: () => (/* reexport safe */ _toUinteger32_js__WEBPACK_IMPORTED_MODULE_199__["default"]),
/* harmony export */   toUinteger32: () => (/* reexport safe */ _toUinteger32_js__WEBPACK_IMPORTED_MODULE_199__["default"]),
/* harmony export */   trimCharsEnd: () => (/* reexport safe */ _trimCharsEnd_js__WEBPACK_IMPORTED_MODULE_205__["default"]),
/* harmony export */   trimCharsStart: () => (/* reexport safe */ _trimCharsStart_js__WEBPACK_IMPORTED_MODULE_206__["default"]),
/* harmony export */   trimEnd: () => (/* reexport safe */ _trimEnd_js__WEBPACK_IMPORTED_MODULE_204__["default"]),
/* harmony export */   trimLeft: () => (/* reexport safe */ _trimStart_js__WEBPACK_IMPORTED_MODULE_203__["default"]),
/* harmony export */   trimRight: () => (/* reexport safe */ _trimEnd_js__WEBPACK_IMPORTED_MODULE_204__["default"]),
/* harmony export */   trimStart: () => (/* reexport safe */ _trimStart_js__WEBPACK_IMPORTED_MODULE_203__["default"]),
/* harmony export */   trunc: () => (/* reexport safe */ _trunc_js__WEBPACK_IMPORTED_MODULE_195__["default"]),
/* harmony export */   unzipObjWith: () => (/* reexport safe */ _unzipObjWith_js__WEBPACK_IMPORTED_MODULE_168__["default"]),
/* harmony export */   viewOr: () => (/* reexport safe */ _viewOr_js__WEBPACK_IMPORTED_MODULE_163__["default"]),
/* harmony export */   weave: () => (/* reexport safe */ _weave_js__WEBPACK_IMPORTED_MODULE_92__["default"]),
/* harmony export */   weaveLazy: () => (/* reexport safe */ _weaveLazy_js__WEBPACK_IMPORTED_MODULE_93__["default"]),
/* harmony export */   zipObjWith: () => (/* reexport safe */ _zipObjWith_js__WEBPACK_IMPORTED_MODULE_169__["default"])
/* harmony export */ });
/* harmony import */ var _isNotUndefined_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6391);
/* harmony import */ var _isUndefined_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9290);
/* harmony import */ var _isNull_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5681);
/* harmony import */ var _isNotNull_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8010);
/* harmony import */ var _isNotNil_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5368);
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4111);
/* harmony import */ var _isIterable_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1730);
/* harmony import */ var _isEmptyArray_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9222);
/* harmony import */ var _isNotArray_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3002);
/* harmony import */ var _isNonEmptyArray_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6019);
/* harmony import */ var _isBoolean_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8762);
/* harmony import */ var _isNotBoolean_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2607);
/* harmony import */ var _isNilOrEmpty_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9251);
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(9705);
/* harmony import */ var _isEmptyString_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(4458);
/* harmony import */ var _isNotString_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(5614);
/* harmony import */ var _isNonEmptyString_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(9533);
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(9032);
/* harmony import */ var _isNotArrayLike_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(997);
/* harmony import */ var _isGeneratorFunction_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(4455);
/* harmony import */ var _isNotGeneratorFunction_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(1750);
/* harmony import */ var _isAsyncFunction_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(1586);
/* harmony import */ var _isNotAsyncFunction_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(495);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(3800);
/* harmony import */ var _isNotFunction_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(691);
/* harmony import */ var _isObj_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(9719);
/* harmony import */ var _isNotObj_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(2402);
/* harmony import */ var _isObjLike_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(9456);
/* harmony import */ var _isNotObjLike_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(3245);
/* harmony import */ var _isPlainObj_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(6005);
/* harmony import */ var _isNotPlainObj_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(4766);
/* harmony import */ var _isDate_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(5900);
/* harmony import */ var _isNotDate_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(5847);
/* harmony import */ var _isValidDate_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(9176);
/* harmony import */ var _isNotValidDate_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(1437);
/* harmony import */ var _isNumber_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(7301);
/* harmony import */ var _isNotNumber_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(5702);
/* harmony import */ var _isPositive_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(4651);
/* harmony import */ var _isNegative_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(9267);
/* harmony import */ var _isPositiveZero_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(2913);
/* harmony import */ var _isNegativeZero_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(3897);
/* harmony import */ var _isNotNilOrEmpty_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(108);
/* harmony import */ var _isNonPositive_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(4146);
/* harmony import */ var _isNonNegative_js__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(4102);
/* harmony import */ var _isMap_js__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(6152);
/* harmony import */ var _isNotMap_js__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(9101);
/* harmony import */ var _isNaN_js__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(19);
/* harmony import */ var _isNotNaN_js__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(3258);
/* harmony import */ var _isFinite_js__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(3099);
/* harmony import */ var _isNotFinite_js__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(6784);
/* harmony import */ var _isInteger_js__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(920);
/* harmony import */ var _isInteger32_js__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(9713);
/* harmony import */ var _isUinteger32_js__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(270);
/* harmony import */ var _isNotInteger_js__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(6857);
/* harmony import */ var _isBigInt_js__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(8147);
/* harmony import */ var _isFloat_js__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(3020);
/* harmony import */ var _isNotFloat_js__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(633);
/* harmony import */ var _isValidNumber_js__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(4313);
/* harmony import */ var _isNotValidNumber_js__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(6184);
/* harmony import */ var _isOdd_js__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(1299);
/* harmony import */ var _isEven_js__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(4220);
/* harmony import */ var _isPair_js__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(8712);
/* harmony import */ var _isNotPair_js__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(2279);
/* harmony import */ var _isThenable_js__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(2199);
/* harmony import */ var _isPromise_js__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(9567);
/* harmony import */ var _isTrue_js__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(5828);
/* harmony import */ var _isFalse_js__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(821);
/* harmony import */ var _isTruthy_js__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(1092);
/* harmony import */ var _isFalsy_js__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(97);
/* harmony import */ var _isRegExp_js__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(1833);
/* harmony import */ var _isNotRegExp_js__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(2106);
/* harmony import */ var _isSet_js__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(5138);
/* harmony import */ var _isNotSet_js__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(1979);
/* harmony import */ var _isSparseArray_js__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(2451);
/* harmony import */ var _isSymbol_js__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(2912);
/* harmony import */ var _isSafeInteger_js__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(4727);
/* harmony import */ var _isIndexed_js__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(8111);
/* harmony import */ var _isError_js__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(2296);
/* harmony import */ var _isNaturalNumber_js__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(2562);
/* harmony import */ var _isPrimitive_js__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(8055);
/* harmony import */ var _isNotPrimitive_js__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(8486);
/* harmony import */ var _isSentinelValue_js__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(155);
/* harmony import */ var _isBlank_js__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(5796);
/* harmony import */ var _stubUndefined_js__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(8254);
/* harmony import */ var _stubNull_js__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(141);
/* harmony import */ var _stubObj_js__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(2019);
/* harmony import */ var _stubString_js__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(4461);
/* harmony import */ var _stubArray_js__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(5667);
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(4512);
/* harmony import */ var _liftFN_js__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(249);
/* harmony import */ var _liftF_js__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(5547);
/* harmony import */ var _cata_js__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(2871);
/* harmony import */ var _weave_js__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(392);
/* harmony import */ var _weaveLazy_js__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(5178);
/* harmony import */ var _curryRightN_js__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(4961);
/* harmony import */ var _curryRight_js__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(147);
/* harmony import */ var _allP_js__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__(2121);
/* harmony import */ var _catchP_js__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__(8561);
/* harmony import */ var _noneP_js__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__(9360);
/* harmony import */ var _resolveP_js__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__(5784);
/* harmony import */ var _rejectP_js__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__(2075);
/* harmony import */ var _delayP_js__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__(5029);
/* harmony import */ var _thenCatchP_js__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__(1538);
/* harmony import */ var _allSettledP_js__WEBPACK_IMPORTED_MODULE_103__ = __webpack_require__(1514);
/* harmony import */ var _Y_js__WEBPACK_IMPORTED_MODULE_104__ = __webpack_require__(221);
/* harmony import */ var _seq_js__WEBPACK_IMPORTED_MODULE_105__ = __webpack_require__(2961);
/* harmony import */ var _dispatch_js__WEBPACK_IMPORTED_MODULE_106__ = __webpack_require__(9366);
/* harmony import */ var _async_js__WEBPACK_IMPORTED_MODULE_107__ = __webpack_require__(5466);
/* harmony import */ var _anyP_js__WEBPACK_IMPORTED_MODULE_108__ = __webpack_require__(4422);
/* harmony import */ var _lastP_js__WEBPACK_IMPORTED_MODULE_109__ = __webpack_require__(2726);
/* harmony import */ var _fnull_js__WEBPACK_IMPORTED_MODULE_110__ = __webpack_require__(6694);
/* harmony import */ var _mapIndexed_js__WEBPACK_IMPORTED_MODULE_111__ = __webpack_require__(2579);
/* harmony import */ var _reduceIndexed_js__WEBPACK_IMPORTED_MODULE_112__ = __webpack_require__(5745);
/* harmony import */ var _filterIndexed_js__WEBPACK_IMPORTED_MODULE_113__ = __webpack_require__(3529);
/* harmony import */ var _pickIndexes_js__WEBPACK_IMPORTED_MODULE_114__ = __webpack_require__(2609);
/* harmony import */ var _list_js__WEBPACK_IMPORTED_MODULE_115__ = __webpack_require__(3204);
/* harmony import */ var _ensureArray_js__WEBPACK_IMPORTED_MODULE_116__ = __webpack_require__(6089);
/* harmony import */ var _concatAll_js__WEBPACK_IMPORTED_MODULE_117__ = __webpack_require__(5373);
/* harmony import */ var _concatRight_js__WEBPACK_IMPORTED_MODULE_118__ = __webpack_require__(944);
/* harmony import */ var _reduceP_js__WEBPACK_IMPORTED_MODULE_119__ = __webpack_require__(7360);
/* harmony import */ var _reduceRightP_js__WEBPACK_IMPORTED_MODULE_120__ = __webpack_require__(3968);
/* harmony import */ var _sliceFrom_js__WEBPACK_IMPORTED_MODULE_121__ = __webpack_require__(6936);
/* harmony import */ var _sliceTo_js__WEBPACK_IMPORTED_MODULE_122__ = __webpack_require__(7285);
/* harmony import */ var _omitIndexes_js__WEBPACK_IMPORTED_MODULE_123__ = __webpack_require__(1153);
/* harmony import */ var _compact_js__WEBPACK_IMPORTED_MODULE_124__ = __webpack_require__(2823);
/* harmony import */ var _appendFlipped_js__WEBPACK_IMPORTED_MODULE_125__ = __webpack_require__(862);
/* harmony import */ var _included_js__WEBPACK_IMPORTED_MODULE_126__ = __webpack_require__(1424);
/* harmony import */ var _move_js__WEBPACK_IMPORTED_MODULE_127__ = __webpack_require__(3073);
/* harmony import */ var _lengthGt_js__WEBPACK_IMPORTED_MODULE_128__ = __webpack_require__(451);
/* harmony import */ var _lengthLt_js__WEBPACK_IMPORTED_MODULE_129__ = __webpack_require__(2076);
/* harmony import */ var _lengthGte_js__WEBPACK_IMPORTED_MODULE_130__ = __webpack_require__(2544);
/* harmony import */ var _lengthLte_js__WEBPACK_IMPORTED_MODULE_131__ = __webpack_require__(5369);
/* harmony import */ var _lengthEq_js__WEBPACK_IMPORTED_MODULE_132__ = __webpack_require__(6238);
/* harmony import */ var _lengthNotEq_js__WEBPACK_IMPORTED_MODULE_133__ = __webpack_require__(4045);
/* harmony import */ var _allEqual_js__WEBPACK_IMPORTED_MODULE_134__ = __webpack_require__(6257);
/* harmony import */ var _repeatStr_js__WEBPACK_IMPORTED_MODULE_135__ = __webpack_require__(252);
/* harmony import */ var _allIdentical_js__WEBPACK_IMPORTED_MODULE_136__ = __webpack_require__(6194);
/* harmony import */ var _allIdenticalTo_js__WEBPACK_IMPORTED_MODULE_137__ = __webpack_require__(9399);
/* harmony import */ var _allEqualTo_js__WEBPACK_IMPORTED_MODULE_138__ = __webpack_require__(7056);
/* harmony import */ var _flattenDepth_js__WEBPACK_IMPORTED_MODULE_139__ = __webpack_require__(8823);
/* harmony import */ var _toArray_js__WEBPACK_IMPORTED_MODULE_140__ = __webpack_require__(5592);
/* harmony import */ var _allUnique_js__WEBPACK_IMPORTED_MODULE_141__ = __webpack_require__(7902);
/* harmony import */ var _notAllUnique_js__WEBPACK_IMPORTED_MODULE_142__ = __webpack_require__(2855);
/* harmony import */ var _sortByProps_js__WEBPACK_IMPORTED_MODULE_143__ = __webpack_require__(2999);
/* harmony import */ var _sortByProp_js__WEBPACK_IMPORTED_MODULE_144__ = __webpack_require__(7320);
/* harmony import */ var _sortByPaths_js__WEBPACK_IMPORTED_MODULE_145__ = __webpack_require__(481);
/* harmony import */ var _skipTake_js__WEBPACK_IMPORTED_MODULE_146__ = __webpack_require__(5780);
/* harmony import */ var _rangeStep_js__WEBPACK_IMPORTED_MODULE_147__ = __webpack_require__(7649);
/* harmony import */ var _findOr_js__WEBPACK_IMPORTED_MODULE_148__ = __webpack_require__(1922);
/* harmony import */ var _invoke_js__WEBPACK_IMPORTED_MODULE_149__ = __webpack_require__(9308);
/* harmony import */ var _invokeArgs_js__WEBPACK_IMPORTED_MODULE_150__ = __webpack_require__(2053);
/* harmony import */ var _paths_js__WEBPACK_IMPORTED_MODULE_151__ = __webpack_require__(3418);
/* harmony import */ var _renameKey_js__WEBPACK_IMPORTED_MODULE_152__ = __webpack_require__(627);
/* harmony import */ var _renameKeys_js__WEBPACK_IMPORTED_MODULE_153__ = __webpack_require__(5190);
/* harmony import */ var _renameKeysWith_js__WEBPACK_IMPORTED_MODULE_154__ = __webpack_require__(2546);
/* harmony import */ var _renameKeyWith_js__WEBPACK_IMPORTED_MODULE_155__ = __webpack_require__(3883);
/* harmony import */ var _copyKeys_js__WEBPACK_IMPORTED_MODULE_156__ = __webpack_require__(4757);
/* harmony import */ var _mergeProps_js__WEBPACK_IMPORTED_MODULE_157__ = __webpack_require__(3586);
/* harmony import */ var _mergePaths_js__WEBPACK_IMPORTED_MODULE_158__ = __webpack_require__(8164);
/* harmony import */ var _mergeProp_js__WEBPACK_IMPORTED_MODULE_159__ = __webpack_require__(7559);
/* harmony import */ var _mergePath_js__WEBPACK_IMPORTED_MODULE_160__ = __webpack_require__(2737);
/* harmony import */ var _omitBy_js__WEBPACK_IMPORTED_MODULE_161__ = __webpack_require__(5376);
/* harmony import */ var _pathOrLazy_js__WEBPACK_IMPORTED_MODULE_162__ = __webpack_require__(5988);
/* harmony import */ var _viewOr_js__WEBPACK_IMPORTED_MODULE_163__ = __webpack_require__(9156);
/* harmony import */ var _spreadProp_js__WEBPACK_IMPORTED_MODULE_164__ = __webpack_require__(4834);
/* harmony import */ var _spreadPath_js__WEBPACK_IMPORTED_MODULE_165__ = __webpack_require__(3708);
/* harmony import */ var _flattenProp_js__WEBPACK_IMPORTED_MODULE_166__ = __webpack_require__(6781);
/* harmony import */ var _flattenPath_js__WEBPACK_IMPORTED_MODULE_167__ = __webpack_require__(4351);
/* harmony import */ var _unzipObjWith_js__WEBPACK_IMPORTED_MODULE_168__ = __webpack_require__(4843);
/* harmony import */ var _zipObjWith_js__WEBPACK_IMPORTED_MODULE_169__ = __webpack_require__(2328);
/* harmony import */ var _isPrototypeOf_js__WEBPACK_IMPORTED_MODULE_170__ = __webpack_require__(1677);
/* harmony import */ var _lensEq_js__WEBPACK_IMPORTED_MODULE_171__ = __webpack_require__(4998);
/* harmony import */ var _lensNotEq_js__WEBPACK_IMPORTED_MODULE_172__ = __webpack_require__(8181);
/* harmony import */ var _lensSatisfies_js__WEBPACK_IMPORTED_MODULE_173__ = __webpack_require__(607);
/* harmony import */ var _lensNotSatisfy_js__WEBPACK_IMPORTED_MODULE_174__ = __webpack_require__(430);
/* harmony import */ var _lensTraverse_js__WEBPACK_IMPORTED_MODULE_175__ = __webpack_require__(1614);
/* harmony import */ var _lensIso_js__WEBPACK_IMPORTED_MODULE_176__ = __webpack_require__(955);
/* harmony import */ var _propNotEq_js__WEBPACK_IMPORTED_MODULE_177__ = __webpack_require__(9502);
/* harmony import */ var _pathNotEq_js__WEBPACK_IMPORTED_MODULE_178__ = __webpack_require__(8380);
/* harmony import */ var _inRange_js__WEBPACK_IMPORTED_MODULE_179__ = __webpack_require__(2186);
/* harmony import */ var _notEqual_js__WEBPACK_IMPORTED_MODULE_180__ = __webpack_require__(7383);
/* harmony import */ var _overlaps_js__WEBPACK_IMPORTED_MODULE_181__ = __webpack_require__(1200);
/* harmony import */ var _defaultWhen_js__WEBPACK_IMPORTED_MODULE_182__ = __webpack_require__(9999);
/* harmony import */ var _notBoth_js__WEBPACK_IMPORTED_MODULE_183__ = __webpack_require__(8076);
/* harmony import */ var _nand_js__WEBPACK_IMPORTED_MODULE_184__ = __webpack_require__(7827);
/* harmony import */ var _neither_js__WEBPACK_IMPORTED_MODULE_185__ = __webpack_require__(9609);
/* harmony import */ var _nor_js__WEBPACK_IMPORTED_MODULE_186__ = __webpack_require__(397);
/* harmony import */ var _notAllPass_js__WEBPACK_IMPORTED_MODULE_187__ = __webpack_require__(3833);
/* harmony import */ var _nonePass_js__WEBPACK_IMPORTED_MODULE_188__ = __webpack_require__(5131);
/* harmony import */ var _argsPass_js__WEBPACK_IMPORTED_MODULE_189__ = __webpack_require__(9656);
/* harmony import */ var _dropArgs_js__WEBPACK_IMPORTED_MODULE_190__ = __webpack_require__(612);
/* harmony import */ var _round_js__WEBPACK_IMPORTED_MODULE_191__ = __webpack_require__(3798);
/* harmony import */ var _ceil_js__WEBPACK_IMPORTED_MODULE_192__ = __webpack_require__(30);
/* harmony import */ var _divideNum_js__WEBPACK_IMPORTED_MODULE_193__ = __webpack_require__(9033);
/* harmony import */ var _floor_js__WEBPACK_IMPORTED_MODULE_194__ = __webpack_require__(752);
/* harmony import */ var _trunc_js__WEBPACK_IMPORTED_MODULE_195__ = __webpack_require__(5908);
/* harmony import */ var _sign_js__WEBPACK_IMPORTED_MODULE_196__ = __webpack_require__(9069);
/* harmony import */ var _subtractNum_js__WEBPACK_IMPORTED_MODULE_197__ = __webpack_require__(6954);
/* harmony import */ var _toInteger32_js__WEBPACK_IMPORTED_MODULE_198__ = __webpack_require__(1798);
/* harmony import */ var _toUinteger32_js__WEBPACK_IMPORTED_MODULE_199__ = __webpack_require__(7575);
/* harmony import */ var _toNumber_js__WEBPACK_IMPORTED_MODULE_200__ = __webpack_require__(356);
/* harmony import */ var _replaceAll_js__WEBPACK_IMPORTED_MODULE_201__ = __webpack_require__(6487);
/* harmony import */ var _escapeRegExp_js__WEBPACK_IMPORTED_MODULE_202__ = __webpack_require__(406);
/* harmony import */ var _trimStart_js__WEBPACK_IMPORTED_MODULE_203__ = __webpack_require__(5782);
/* harmony import */ var _trimEnd_js__WEBPACK_IMPORTED_MODULE_204__ = __webpack_require__(6571);
/* harmony import */ var _trimCharsEnd_js__WEBPACK_IMPORTED_MODULE_205__ = __webpack_require__(3802);
/* harmony import */ var _trimCharsStart_js__WEBPACK_IMPORTED_MODULE_206__ = __webpack_require__(3287);
/* harmony import */ var _padCharsStart_js__WEBPACK_IMPORTED_MODULE_207__ = __webpack_require__(9332);
/* harmony import */ var _padCharsEnd_js__WEBPACK_IMPORTED_MODULE_208__ = __webpack_require__(1213);
/* harmony import */ var _padEnd_js__WEBPACK_IMPORTED_MODULE_209__ = __webpack_require__(9673);
/* harmony import */ var _padStart_js__WEBPACK_IMPORTED_MODULE_210__ = __webpack_require__(5691);
/* harmony import */ var _fantasy_land_Identity_js__WEBPACK_IMPORTED_MODULE_211__ = __webpack_require__(7405);
/**
 * @namespace RA
 */

// Type


























 // alias of isObj

 // alias of isNotObj

 // alias of isObjLike

 // alias of isNotObjLike



 // alias of isNotPlainObj




 // alias of isNotValidDate

















 // alias of isInteger32

 // alias of isUinteger32






























// Function




























 // alias of anyP


// List






































// Object






















// Relation











// Logic









// Math








 // alias of toInteger32

 // alias of to toUinteger32

// String



 // alias of trimStart

 // alias of trimEnd






// Types

/******/ 	return __webpack_exports__;
/******/ })()
;
});