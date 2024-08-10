(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("ramda"));
	else if(typeof define === 'function' && define.amd)
		define(["ramda"], factory);
	else if(typeof exports === 'object')
		exports["RA"] = factory(require("ramda"));
	else
		root["RA"] = factory(root["ramda"]);
})(global, (__WEBPACK_EXTERNAL_MODULE__4871__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 4871:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__4871__;

/***/ }),

/***/ 221:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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

var Y = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, function (le) {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _lengthLte_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5369);



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
var allEqual = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.uniq, (0,_lengthLte_js__WEBPACK_IMPORTED_MODULE_1__["default"])(1)));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (allEqual);

/***/ }),

/***/ 7056:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var allEqualTo = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (val, list) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.all)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.equals)(val), list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (allEqualTo);

/***/ }),

/***/ 6194:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _lengthLte_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5369);



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
var allIdentical = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.uniqWith)(ramda__WEBPACK_IMPORTED_MODULE_0__.identical), (0,_lengthLte_js__WEBPACK_IMPORTED_MODULE_1__["default"])(1)));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (allIdentical);

/***/ }),

/***/ 9399:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var allIdenticalTo = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (val, list) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.all)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)(val), list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (allIdenticalTo);

/***/ }),

/***/ 2121:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var allP = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.bind)(Promise.all, Promise));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (allP);

/***/ }),

/***/ 1514:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   allSettledPPonyfill: () => (/* binding */ allSettledPPonyfill),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);
/* harmony import */ var _internal_ponyfills_Promise_allSettled_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3958);



var allSettledPPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, _internal_ponyfills_Promise_allSettled_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

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
var allSettledP = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Promise.allSettled) ? (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.bind)(Promise.allSettled, Promise)) : allSettledPPonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (allSettledP);

/***/ }),

/***/ 7902:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var allUnique = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.converge)(_lengthEq_js__WEBPACK_IMPORTED_MODULE_1__["default"], [ramda__WEBPACK_IMPORTED_MODULE_0__.length, ramda__WEBPACK_IMPORTED_MODULE_0__.uniq]);
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);
/* harmony import */ var _internal_ponyfills_Promise_any_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1590);



var anyPPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, _internal_ponyfills_Promise_any_js__WEBPACK_IMPORTED_MODULE_1__["default"]);


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
var anyP = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Promise.any) ? (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.bind)(Promise.any, Promise)) : anyPPonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (anyP);

/***/ }),

/***/ 862:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var appendFlipped = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.flip)(ramda__WEBPACK_IMPORTED_MODULE_0__.append);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (appendFlipped);

/***/ }),

/***/ 9656:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _list_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3204);
/* harmony import */ var _isTruthy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1092);




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
var argsPass = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (combiningPredicate, predicates) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.useWith)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.compose)(combiningPredicate(_isTruthy_js__WEBPACK_IMPORTED_MODULE_1__["default"]), _list_js__WEBPACK_IMPORTED_MODULE_2__["default"]), predicates);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (argsPass);

/***/ }),

/***/ 5466:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _resolveP_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5784);
/* harmony import */ var _rejectP_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2075);




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
var async = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, function (generatorFn) {
  function asyncWrapper() {
    var iterator = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.bind)(generatorFn, this).apply(void 0, arguments);
    var _handle = function handle(result) {
      var resolved = (0,_resolveP_js__WEBPACK_IMPORTED_MODULE_1__["default"])(result.value);
      return result.done ? resolved : resolved.then(function (value) {
        return _handle(iterator.next(value));
      }, function (error) {
        return _handle(iterator["throw"](error));
      });
    };
    try {
      return _handle(iterator.next());
    } catch (error) {
      return (0,_rejectP_js__WEBPACK_IMPORTED_MODULE_2__["default"])(error);
    }
  }
  if (generatorFn.length > 0) {
    return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(generatorFn.length, asyncWrapper);
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var catamorphism = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (leftFn, rightFn, catamorphicObj) {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var catchP = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.invoker)(1, 'catch');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (catchP);

/***/ }),

/***/ 30:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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

var ceil = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.bind)(Math.ceil, Math));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ceil);

/***/ }),

/***/ 2823:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var compact = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.reject)(_isFalsy_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (compact);

/***/ }),

/***/ 5373:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _stubUndefined_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8254);


var leftIdentitySemigroup = {
  concat: ramda__WEBPACK_IMPORTED_MODULE_0__.identity
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
var concatAll = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.reduce)(ramda__WEBPACK_IMPORTED_MODULE_0__.concat, leftIdentitySemigroup), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.when)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)(leftIdentitySemigroup), _stubUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (concatAll);

/***/ }),

/***/ 944:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var concatRight = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.flip)(ramda__WEBPACK_IMPORTED_MODULE_0__.concat);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (concatRight);

/***/ }),

/***/ 4757:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var copyKeys = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(2, function (keysMap, obj) {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var curryRight = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.converge)(_curryRightN_js__WEBPACK_IMPORTED_MODULE_1__["default"], [ramda__WEBPACK_IMPORTED_MODULE_0__.length, ramda__WEBPACK_IMPORTED_MODULE_0__.identity]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (curryRight);

/***/ }),

/***/ 4961:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var curryRightN = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(2, function (arity, fn) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(arity, function wrapper() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return fn.apply(this, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.reverse)(args));
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var defaultWhen = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (predicate, defaultVal, val) {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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

var makeDelay = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (settleFnPicker, opts) {
  var timeout;
  var value;
  if ((0,_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"])(opts) && (0,_isNonNegative_js__WEBPACK_IMPORTED_MODULE_2__["default"])(opts)) {
    timeout = opts;
  } else {
    timeout = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.propOr)(0, 'timeout', opts);
    value = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.propOr)(value, 'value', opts);
  }
  return new Promise(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var settleFn = settleFnPicker(args);
    setTimeout((0,ramda__WEBPACK_IMPORTED_MODULE_0__.partial)(settleFn, [value]), timeout);
  });
});
var delayP = makeDelay((0,ramda__WEBPACK_IMPORTED_MODULE_0__.nth)(0));
delayP.reject = makeDelay((0,ramda__WEBPACK_IMPORTED_MODULE_0__.nth)(1));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (delayP);

/***/ }),

/***/ 9366:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isNotNil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5368);
/* harmony import */ var _isNonEmptyArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6019);
/* harmony import */ var _stubUndefined_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8254);
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



var byArity = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.comparator)(function (a, b) {
  return a.length > b.length;
});
var getMaxArity = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.sort)(byArity), ramda__WEBPACK_IMPORTED_MODULE_0__.head, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.prop)('length'));
var iteratorFn = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (args, accumulator, fn) {
  var result = fn.apply(void 0, _toConsumableArray(args));
  return (0,_isNotNil_js__WEBPACK_IMPORTED_MODULE_1__["default"])(result) ? (0,ramda__WEBPACK_IMPORTED_MODULE_0__.reduced)(result) : accumulator;
});
var dispatchImpl = function dispatchImpl(functions) {
  var arity = getMaxArity(functions);
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(arity, function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.reduce)(iteratorFn(args), undefined, functions);
  });
};
var dispatch = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.ifElse)(_isNonEmptyArray_js__WEBPACK_IMPORTED_MODULE_2__["default"], dispatchImpl, _stubUndefined_js__WEBPACK_IMPORTED_MODULE_3__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dispatch);

/***/ }),

/***/ 9033:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var divideNum = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.flip)(ramda__WEBPACK_IMPORTED_MODULE_0__.divide);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (divideNum);

/***/ }),

/***/ 612:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var dropArgs = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.nAry)(0);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dropArgs);

/***/ }),

/***/ 6089:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var ensureArray = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.when)(_isNotArray_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_0__.of)(Array));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ensureArray);

/***/ }),

/***/ 406:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var escapeRegExp = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.when)(_isString_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_0__.replace)(/[.*+?^${}()|[\]\\-]/g, '\\$&'));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (escapeRegExp);

/***/ }),

/***/ 7405:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _mapping_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2105);
/* harmony import */ var _traits_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7814);
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
      return _traits_js__WEBPACK_IMPORTED_MODULE_1__.applyTrait[_mapping_js__WEBPACK_IMPORTED_MODULE_2__.ap].call(this, applyWithFn);
    }
  }, {
    key: "ap",
    value: function ap(applyWithFn) {
      return this[_mapping_js__WEBPACK_IMPORTED_MODULE_2__.ap](applyWithFn);
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
      return _traits_js__WEBPACK_IMPORTED_MODULE_1__.functorTrait[_mapping_js__WEBPACK_IMPORTED_MODULE_2__.map].call(this, fn);
    }
  }, {
    key: "map",
    value: function map(fn) {
      return this[_mapping_js__WEBPACK_IMPORTED_MODULE_2__.map](fn);
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
      return _traits_js__WEBPACK_IMPORTED_MODULE_1__.setoidTrait[_mapping_js__WEBPACK_IMPORTED_MODULE_2__.equals].call(this, setoid);
    }
  }, {
    key: "equals",
    value: function equals(setoid) {
      return this[_mapping_js__WEBPACK_IMPORTED_MODULE_2__.equals](setoid);
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
      return _traits_js__WEBPACK_IMPORTED_MODULE_1__.semigroupTrait[_mapping_js__WEBPACK_IMPORTED_MODULE_2__.concat].call(this, semigroup);
    }
  }, {
    key: "concat",
    value: function concat(semigroup) {
      return this[_mapping_js__WEBPACK_IMPORTED_MODULE_2__.concat](semigroup);
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
      return _traits_js__WEBPACK_IMPORTED_MODULE_1__.chainTrait[_mapping_js__WEBPACK_IMPORTED_MODULE_2__.chain].call(this, fn);
    }
  }, {
    key: "chain",
    value: function chain(fn) {
      return this[_mapping_js__WEBPACK_IMPORTED_MODULE_2__.chain](fn);
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
      return _traits_js__WEBPACK_IMPORTED_MODULE_1__.ordTrait[_mapping_js__WEBPACK_IMPORTED_MODULE_2__.lte].call(this, ord);
    }
  }, {
    key: "lte",
    value: function lte(ord) {
      return this[_mapping_js__WEBPACK_IMPORTED_MODULE_2__.lte](ord);
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
      return this.constructor.of((0,ramda__WEBPACK_IMPORTED_MODULE_0__.empty)(this.value));
    }
  }, {
    key: "empty",
    value: function empty() {
      return this[_mapping_js__WEBPACK_IMPORTED_MODULE_2__.empty]();
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
      return this[_mapping_js__WEBPACK_IMPORTED_MODULE_2__.contramap](fn);
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
}(_mapping_js__WEBPACK_IMPORTED_MODULE_2__.of, _mapping_js__WEBPACK_IMPORTED_MODULE_2__.ap, _mapping_js__WEBPACK_IMPORTED_MODULE_2__.map, _mapping_js__WEBPACK_IMPORTED_MODULE_2__.equals, _mapping_js__WEBPACK_IMPORTED_MODULE_2__.concat, _mapping_js__WEBPACK_IMPORTED_MODULE_2__.chain, _mapping_js__WEBPACK_IMPORTED_MODULE_2__.lte, _mapping_js__WEBPACK_IMPORTED_MODULE_2__.empty, _mapping_js__WEBPACK_IMPORTED_MODULE_2__.contramap);
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9705);
/* harmony import */ var _isNumber_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7301);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3800);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7675);
/* harmony import */ var _mapping_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2105);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






var functorTrait = _defineProperty({}, _mapping_js__WEBPACK_IMPORTED_MODULE_1__.map, function (fn) {
  return this.constructor[_mapping_js__WEBPACK_IMPORTED_MODULE_1__.of](fn(this.value));
});
var applyTrait = _defineProperty({}, _mapping_js__WEBPACK_IMPORTED_MODULE_1__.ap, function (applyWithFn) {
  var _this = this;
  return applyWithFn.map(function (fn) {
    return fn(_this.value);
  });
});
var setoidTrait = _defineProperty({}, _mapping_js__WEBPACK_IMPORTED_MODULE_1__.equals, function (setoid) {
  return (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.isSameType)(this, setoid) && (0,ramda__WEBPACK_IMPORTED_MODULE_0__.equals)(this.value, setoid.value);
});
var semigroupTrait = _defineProperty({}, _mapping_js__WEBPACK_IMPORTED_MODULE_1__.concat, function (semigroup) {
  var concatenatedValue = this.value;
  if ((0,_isString_js__WEBPACK_IMPORTED_MODULE_3__["default"])(this.value) || (0,_isNumber_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this.value)) {
    concatenatedValue = this.value + semigroup.value;
  } else if ((0,ramda__WEBPACK_IMPORTED_MODULE_0__.pathSatisfies)(_isFunction_js__WEBPACK_IMPORTED_MODULE_5__["default"], ['value', _mapping_js__WEBPACK_IMPORTED_MODULE_1__.concat], this)) {
    concatenatedValue = this.value[_mapping_js__WEBPACK_IMPORTED_MODULE_1__.concat](semigroup.value);
  } else if ((0,ramda__WEBPACK_IMPORTED_MODULE_0__.pathSatisfies)(_isFunction_js__WEBPACK_IMPORTED_MODULE_5__["default"], ['value', 'concat'], this)) {
    concatenatedValue = this.value.concat(semigroup.value);
  }
  return this.constructor[_mapping_js__WEBPACK_IMPORTED_MODULE_1__.of](concatenatedValue);
});
var chainTrait = _defineProperty({}, _mapping_js__WEBPACK_IMPORTED_MODULE_1__.chain, function (fn) {
  var newChain = fn(this.value);
  return (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.isSameType)(this, newChain) ? newChain : this;
});
var ordTrait = _defineProperty({}, _mapping_js__WEBPACK_IMPORTED_MODULE_1__.lte, function (ord) {
  return (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.isSameType)(this, ord) && (this.value < ord.value || this[_mapping_js__WEBPACK_IMPORTED_MODULE_1__.equals](ord));
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


// type :: Monad a => a -> String
var type = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.either)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.path)(['@@type']), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.path)(['constructor', '@@type']));

// typeEquals :: Monad a => String -> a -> Boolean
var typeEquals = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (typeIdent, monad) {
  return type(monad) === typeIdent;
});

// isSameType :: (Monad a, Monad b) => a -> b -> Boolean
var isSameType = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(2, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.useWith)(ramda__WEBPACK_IMPORTED_MODULE_0__.equals, [type, type]));

// isNotSameType :: (Monad a, Monad b) => a -> b -> Boolean
var isNotSameType = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(isSameType);

/***/ }),

/***/ 3529:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var filterIndexed = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.addIndex)(ramda__WEBPACK_IMPORTED_MODULE_0__.filter);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (filterIndexed);

/***/ }),

/***/ 1922:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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

var findOr = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (defaultVal, fn, list) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.find)(fn), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.defaultTo)(defaultVal))(list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (findOr);

/***/ }),

/***/ 8823:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _internal_makeFlat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9937);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }


var flatten1 = (0,_internal_makeFlat_js__WEBPACK_IMPORTED_MODULE_1__["default"])(false);

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
var flattenDepth = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (depth, list) {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var flattenPath = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (path, obj) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.mergeRight)(obj, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pathOr)({}, path, obj));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (flattenPath);

/***/ }),

/***/ 6781:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var flattenProp = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (prop, obj) {
  return (0,_flattenPath_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_0__.of)(Array, prop), obj);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (flattenProp);

/***/ }),

/***/ 752:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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

var floor = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.bind)(Math.floor, Math));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (floor);

/***/ }),

/***/ 6694:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _defaultWhen_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9999);
/* harmony import */ var _mapIndexed_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2579);




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

var fnull = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (fn, defaults) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(fn.length, function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var argsWithDefaults = (0,_mapIndexed_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (val, idx) {
      return (0,_defaultWhen_js__WEBPACK_IMPORTED_MODULE_2__["default"])(ramda__WEBPACK_IMPORTED_MODULE_0__.isNil, defaults[idx], val);
    }, args);
    return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.apply)(fn, argsWithDefaults);
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);

var inRangeImp = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.ifElse)(ramda__WEBPACK_IMPORTED_MODULE_0__.gte, function () {
  throw new Error('low must not be greater than high in inRange(low, high, value)');
}, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.useWith)(ramda__WEBPACK_IMPORTED_MODULE_0__.both, [ramda__WEBPACK_IMPORTED_MODULE_0__.lte, ramda__WEBPACK_IMPORTED_MODULE_0__.gt]));

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (low, high, value) {
  return inRangeImp(low, high)(value);
}));

/***/ }),

/***/ 1424:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var included = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.flip)(ramda__WEBPACK_IMPORTED_MODULE_0__.includes);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (included);

/***/ }),

/***/ 7061:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3800);
/* harmony import */ var _fantasy_land_mapping_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2105);



var isFunctor = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.either)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.pathSatisfies)(_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"], ['map']), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pathSatisfies)(_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"], [_fantasy_land_mapping_js__WEBPACK_IMPORTED_MODULE_2__.map]));
var isApply = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(isFunctor, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.either)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.pathSatisfies)(_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"], ['ap']), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pathSatisfies)(_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"], [_fantasy_land_mapping_js__WEBPACK_IMPORTED_MODULE_2__.ap])));
var ap = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(2, function (applyF, applyX) {
  // return original ramda `ap` if not Apply spec
  if (!isApply(applyF) || !isApply(applyX)) {
    return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.ap)(applyF, applyX);
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);

var compareLength = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (comparator, value, list) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.compose)(comparator(value), ramda__WEBPACK_IMPORTED_MODULE_0__.length)(list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (compareLength);

/***/ }),

/***/ 9884:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isObj_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9719);
/* harmony import */ var _isSymbol_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2912);
/* harmony import */ var _neither_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9609);




var isCoercible = (0,_neither_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_isSymbol_js__WEBPACK_IMPORTED_MODULE_2__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isObj_js__WEBPACK_IMPORTED_MODULE_3__["default"], (0,_neither_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_0__.hasIn)('toString'), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.hasIn)('valueOf'))));
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isIterable_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1730);
/* harmony import */ var _isNotUndefined_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6391);
/* harmony import */ var _isNotNil_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5368);
/* harmony import */ var _isNotFunction_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(691);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }





var copyArray = function copyArray(items, mapFn, thisArg) {
  var boundMapFn = (0,_isNotUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"])(thisArg) ? (0,ramda__WEBPACK_IMPORTED_MODULE_0__.bind)(mapFn, thisArg) : mapFn;
  return (0,_isNotUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"])(mapFn) ? _toConsumableArray(items).map(boundMapFn) : _toConsumableArray(items);
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isNumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7301);



// eslint-disable-next-line no-restricted-globals
var isFinitePonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"], isFinite);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isFinitePonyfill);

/***/ }),

/***/ 3238:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isFinite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3099);


var isIntegerPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isFinite_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_0__.converge)(ramda__WEBPACK_IMPORTED_MODULE_0__.equals, [Math.floor, ramda__WEBPACK_IMPORTED_MODULE_0__.identity]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isIntegerPonyfill);

/***/ }),

/***/ 7221:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isNumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7301);



// eslint-disable-next-line no-restricted-globals
var isNaNPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"], isNaN);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNaNPonyfill);

/***/ }),

/***/ 9541:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(920);
/* harmony import */ var _Number_MAX_SAFE_INTEGER_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3885);



var isSafeIntegerPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"], function (value) {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
  var array = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.map)(function (p) {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
    (0,ramda__WEBPACK_IMPORTED_MODULE_0__.map)(function (p) {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isRegExp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1833);
/* harmony import */ var _escapeRegExp_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(406);



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
  var regexp = new RegExp((0,_isRegExp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(searchValue) ? searchValue : (0,_escapeRegExp_js__WEBPACK_IMPORTED_MODULE_2__["default"])(searchValue), 'g');
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.replace)(regexp, replaceValue, str);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (replaceAll);

/***/ }),

/***/ 3561:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);

var trimStart = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.replace)(/[\s\uFEFF\xA0]+$/, '');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (trimStart);

/***/ }),

/***/ 8232:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);

var trimStart = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.replace)(/^[\s\uFEFF\xA0]+/, '');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (trimStart);

/***/ }),

/***/ 9308:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _invokeArgs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2053);



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
var invoke = (0,_invokeArgs_js__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_0__.__, [], ramda__WEBPACK_IMPORTED_MODULE_0__.__);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (invoke);

/***/ }),

/***/ 2053:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isNotFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(691);
/* harmony import */ var _isEmptyArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9222);




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

var invokeArgs = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(3, function (mpath, args, obj) {
  var method = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.path)(mpath, obj);
  var context = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.path)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.init)(mpath), obj);
  if ((0,_isNotFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(method)) return undefined;
  if ((0,_isEmptyArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mpath)) return undefined;
  var boundMethod = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.bind)(method, context);
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.apply)(boundMethod, args);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (invokeArgs);

/***/ }),

/***/ 4111:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isArray = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Array.isArray) ? Array.isArray : (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.type, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)('Array')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isArray);

/***/ }),

/***/ 9032:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isArrayLike = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, function (val) {
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
    return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.has)(0, val) && (0,ramda__WEBPACK_IMPORTED_MODULE_0__.has)(val.length - 1, val);
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var isAsyncFunction = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.type, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)('AsyncFunction')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isAsyncFunction);

/***/ }),

/***/ 8147:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var isBigInt = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.type, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)('BigInt')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isBigInt);

/***/ }),

/***/ 5796:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isBlank = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.anyPass)([_isFalse_js__WEBPACK_IMPORTED_MODULE_1__["default"], ramda__WEBPACK_IMPORTED_MODULE_0__.isNil, ramda__WEBPACK_IMPORTED_MODULE_0__.isEmpty, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.test)(/^\s+$/gm)]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isBlank);

/***/ }),

/***/ 8762:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var isBoolean = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.type, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)('Boolean')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isBoolean);

/***/ }),

/***/ 5900:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var isDate = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.type, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)('Date')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isDate);

/***/ }),

/***/ 9222:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isEmptyArray = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"], ramda__WEBPACK_IMPORTED_MODULE_0__.isEmpty);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isEmptyArray);

/***/ }),

/***/ 4458:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var isEmptyString = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.equals)('');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isEmptyString);

/***/ }),

/***/ 2296:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var isError = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.type, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)('Error')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isError);

/***/ }),

/***/ 4220:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(920);
/* harmony import */ var _isOdd_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1299);




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
var isEven = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isOdd_js__WEBPACK_IMPORTED_MODULE_2__["default"])));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isEven);

/***/ }),

/***/ 821:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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

var isFalse = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)(false));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isFalse);

/***/ }),

/***/ 97:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isFalsy = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isTruthy_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isFalsy);

/***/ }),

/***/ 3099:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isFinitePonyfill: () => (/* binding */ isFinitePonyfill)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);
/* harmony import */ var _internal_ponyfills_Number_isFinite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9825);



var isFinitePonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, _internal_ponyfills_Number_isFinite_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

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
var _isFinite = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Number.isFinite) ? (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.bind)(Number.isFinite, Number)) : isFinitePonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_isFinite);

/***/ }),

/***/ 3020:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isInteger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(920);
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
var isFloat = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isFinite_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isInteger_js__WEBPACK_IMPORTED_MODULE_2__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isFloat);

/***/ }),

/***/ 3800:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isGeneratorFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4455);
/* harmony import */ var _isAsyncFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1586);




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
var isFunction = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.anyPass)([(0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.type, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)('Function')), _isGeneratorFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"], _isAsyncFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"]]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isFunction);

/***/ }),

/***/ 4455:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var isGeneratorFunction = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.type, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)('GeneratorFunction')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isGeneratorFunction);

/***/ }),

/***/ 8111:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4111);
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9705);




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

var isIndexed = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.either)(_isString_js__WEBPACK_IMPORTED_MODULE_1__["default"], _isArray_js__WEBPACK_IMPORTED_MODULE_2__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isIndexed);

/***/ }),

/***/ 920:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isIntegerPonyfill: () => (/* binding */ isIntegerPonyfill)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);
/* harmony import */ var _internal_ponyfills_Number_isInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3238);



var isIntegerPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, _internal_ponyfills_Number_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

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
var isInteger = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Number.isInteger) ? (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.bind)(Number.isInteger, Number)) : isIntegerPonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isInteger);

/***/ }),

/***/ 9713:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isInteger32 = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, function (val) {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3800);



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
var isIterable = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, function (val) {
  if (typeof Symbol === 'undefined') {
    return false;
  }
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.hasIn)(Symbol.iterator, Object(val)) && (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val[Symbol.iterator]);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isIterable);

/***/ }),

/***/ 6152:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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

var isMap = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.type, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)('Map')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isMap);

/***/ }),

/***/ 19:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isNaNPonyfill: () => (/* binding */ isNaNPonyfill)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);
/* harmony import */ var _internal_ponyfills_Number_isNaN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7221);



var isNaNPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, _internal_ponyfills_Number_isNaN_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

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
var _isNaN = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Number.isNaN) ? (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, Number.isNaN) : isNaNPonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_isNaN);

/***/ }),

/***/ 2562:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(920);
/* harmony import */ var _isNegative_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9267);




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

var isNaturalNumber = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isNegative_js__WEBPACK_IMPORTED_MODULE_2__["default"])));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNaturalNumber);

/***/ }),

/***/ 9267:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isNumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7301);



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
var isNegative = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_0__.gt)(0)));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNegative);

/***/ }),

/***/ 3897:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var isNegativeZero = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)(-0));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNegativeZero);

/***/ }),

/***/ 9251:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var isNilOrEmpty = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.either)(ramda__WEBPACK_IMPORTED_MODULE_0__.isNil, ramda__WEBPACK_IMPORTED_MODULE_0__.isEmpty));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNilOrEmpty);

/***/ }),

/***/ 6019:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNonEmptyArray = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"], ramda__WEBPACK_IMPORTED_MODULE_0__.isNotEmpty);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNonEmptyArray);

/***/ }),

/***/ 9533:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNonEmptyString = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.allPass)([_isString_js__WEBPACK_IMPORTED_MODULE_1__["default"], _isNotObj_js__WEBPACK_IMPORTED_MODULE_2__["default"], ramda__WEBPACK_IMPORTED_MODULE_0__.isNotEmpty]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNonEmptyString);

/***/ }),

/***/ 4102:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isNumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7301);



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
var isNonNegative = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_0__.flip)(ramda__WEBPACK_IMPORTED_MODULE_0__.gte)(0)));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNonNegative);

/***/ }),

/***/ 4146:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isNumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7301);



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
var isNonPositive = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_0__.flip)(ramda__WEBPACK_IMPORTED_MODULE_0__.lte)(0)));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNonPositive);

/***/ }),

/***/ 3002:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotArray = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotArray);

/***/ }),

/***/ 997:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotArrayLike = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotArrayLike);

/***/ }),

/***/ 495:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotAsyncFunction = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isAsyncFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotAsyncFunction);

/***/ }),

/***/ 2607:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotBoolean = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isBoolean_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotBoolean);

/***/ }),

/***/ 5847:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotDate = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isDate_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotDate);

/***/ }),

/***/ 6784:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotFinite = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isFinite_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotFinite);

/***/ }),

/***/ 633:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isFloat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3020);



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
var isNotFloat = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isFloat_js__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotFloat);

/***/ }),

/***/ 691:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotFunction = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotFunction);

/***/ }),

/***/ 1750:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotGeneratorFunction = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isGeneratorFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotGeneratorFunction);

/***/ }),

/***/ 6857:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotInteger = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotInteger);

/***/ }),

/***/ 9101:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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

var isNotMap = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isMap_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotMap);

/***/ }),

/***/ 3258:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotNaN = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isNaN_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotNaN);

/***/ }),

/***/ 5368:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var isNotNil = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(ramda__WEBPACK_IMPORTED_MODULE_0__.isNil);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotNil);

/***/ }),

/***/ 108:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotNilOrEmpty = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isNilOrEmpty_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotNilOrEmpty);

/***/ }),

/***/ 8010:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotNull = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isNull_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotNull);

/***/ }),

/***/ 5702:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotNumber = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotNumber);

/***/ }),

/***/ 2402:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotObj = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isObj_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotObj);

/***/ }),

/***/ 3245:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotObjLike = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isObjLike_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotObjLike);

/***/ }),

/***/ 2279:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotPair = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isPair_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotPair);

/***/ }),

/***/ 4766:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotPlainObj = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isPlainObj_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotPlainObj);

/***/ }),

/***/ 8486:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8055);



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

var isNotPrimitive = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isPrimitive_js__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotPrimitive);

/***/ }),

/***/ 2106:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotRegExp = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isRegExp_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotRegExp);

/***/ }),

/***/ 1979:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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

var isNotSet = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isSet_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotSet);

/***/ }),

/***/ 5614:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotString = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isString_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotString);

/***/ }),

/***/ 6391:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotUndefined = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotUndefined);

/***/ }),

/***/ 1437:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotValidDate = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isValidDate_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotValidDate);

/***/ }),

/***/ 6184:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isNotValidNumber = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_isValidNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNotValidNumber);

/***/ }),

/***/ 5681:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var isNull = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.equals)(null);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNull);

/***/ }),

/***/ 7301:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var isNumber = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.type, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)('Number')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isNumber);

/***/ }),

/***/ 9719:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isNotNull_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8010);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3800);
/* harmony import */ var _internal_isOfTypeObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5410);





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
var isObj = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isNotNull_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_0__.either)(_internal_isOfTypeObject_js__WEBPACK_IMPORTED_MODULE_2__["default"], _isFunction_js__WEBPACK_IMPORTED_MODULE_3__["default"])));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isObj);

/***/ }),

/***/ 9456:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isNotNull_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8010);
/* harmony import */ var _internal_isOfTypeObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5410);




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
var isObjLike = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isNotNull_js__WEBPACK_IMPORTED_MODULE_1__["default"], _internal_isOfTypeObject_js__WEBPACK_IMPORTED_MODULE_2__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isObjLike);

/***/ }),

/***/ 1299:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(920);



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
var isOdd = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.flip)(ramda__WEBPACK_IMPORTED_MODULE_0__.modulo)(2), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(ramda__WEBPACK_IMPORTED_MODULE_0__.equals)(0))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isOdd);

/***/ }),

/***/ 8712:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4111);



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
var isPair = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.length, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.equals)(2))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isPair);

/***/ }),

/***/ 6005:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isNull_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5681);
/* harmony import */ var _isObjLike_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9456);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3800);




var isObject = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.type, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)('Object'));
var isObjectConstructor = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.toString, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.equals)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.toString)(Object)));
var hasObjectConstructor = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pathSatisfies)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"], isObjectConstructor), ['constructor']);

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
var isPlainObj = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, function (val) {
  if (!(0,_isObjLike_js__WEBPACK_IMPORTED_MODULE_2__["default"])(val) || !isObject(val)) {
    return false;
  }
  var proto = Object.getPrototypeOf(val);
  if ((0,_isNull_js__WEBPACK_IMPORTED_MODULE_3__["default"])(proto)) {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isPositive = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_0__.lt)(0));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isPositive);

/***/ }),

/***/ 2913:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var isPositiveZero = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)(+0));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isPositiveZero);

/***/ }),

/***/ 8055:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isNotObj_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2402);
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9705);
/* harmony import */ var _isNumber_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7301);
/* harmony import */ var _isBigInt_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8147);
/* harmony import */ var _isBoolean_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8762);
/* harmony import */ var _isUndefined_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9290);
/* harmony import */ var _isNull_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5681);
/* harmony import */ var _isSymbol_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2912);










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

var isPrimitive = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isNotObj_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_0__.anyPass)([_isString_js__WEBPACK_IMPORTED_MODULE_2__["default"], _isNumber_js__WEBPACK_IMPORTED_MODULE_3__["default"], _isBigInt_js__WEBPACK_IMPORTED_MODULE_4__["default"], _isBoolean_js__WEBPACK_IMPORTED_MODULE_5__["default"], _isUndefined_js__WEBPACK_IMPORTED_MODULE_6__["default"], _isNull_js__WEBPACK_IMPORTED_MODULE_7__["default"], _isSymbol_js__WEBPACK_IMPORTED_MODULE_8__["default"]]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isPrimitive);

/***/ }),

/***/ 9567:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isObj_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9719);



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
var isPromise = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isObj_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.toString, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.equals)('[object Promise]'))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isPromise);

/***/ }),

/***/ 1677:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isPrototypeOf = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (type, object) {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var isRegExp = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.type, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)('RegExp')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isRegExp);

/***/ }),

/***/ 4727:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isSafeIntegerPonyfill: () => (/* binding */ isSafeIntegerPonyfill)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);
/* harmony import */ var _internal_ponyfills_Number_isSafeInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9541);



var isSafeIntegerPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, _internal_ponyfills_Number_isSafeInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

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

var isSafeInteger = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Number.isSafeInteger) ? (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.bind)(Number.isSafeInteger, Number)) : isSafeIntegerPonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSafeInteger);

/***/ }),

/***/ 155:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isSentinelValue = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, function (val) {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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

var isSet = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.type, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)('Set')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSet);

/***/ }),

/***/ 2451:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isSparseArray = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_0__.converge)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(ramda__WEBPACK_IMPORTED_MODULE_0__.identical), [(0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.values, ramda__WEBPACK_IMPORTED_MODULE_0__.length), ramda__WEBPACK_IMPORTED_MODULE_0__.length]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSparseArray);

/***/ }),

/***/ 9705:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var isString = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.type, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)('String')));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isString);

/***/ }),

/***/ 2912:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isSymbol = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, function (val) {
  return _typeof(val) === 'symbol' || _typeof(val) === 'object' && (0,ramda__WEBPACK_IMPORTED_MODULE_0__.type)(val) === 'Symbol';
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSymbol);

/***/ }),

/***/ 2199:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isThenable = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pathSatisfies)(_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"], ['then']);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isThenable);

/***/ }),

/***/ 5828:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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

var isTrue = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)(true));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isTrue);

/***/ }),

/***/ 1092:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var isTruthy = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, Boolean);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isTruthy);

/***/ }),

/***/ 270:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isUinteger32 = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, function (val) {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var isUndefined = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.equals)((0,_stubUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"])());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isUndefined);

/***/ }),

/***/ 9176:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isDate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5900);
/* harmony import */ var _isNotNaN_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3258);




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
var isValidDate = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.both)(_isDate_js__WEBPACK_IMPORTED_MODULE_1__["default"], (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.invoker)(0, 'getTime'), _isNotNaN_js__WEBPACK_IMPORTED_MODULE_2__["default"])));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isValidDate);

/***/ }),

/***/ 4313:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isFloat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3020);
/* harmony import */ var _isInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(920);




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
var isValidNumber = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.either)(_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"], _isFloat_js__WEBPACK_IMPORTED_MODULE_2__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isValidNumber);

/***/ }),

/***/ 2726:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _allP_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2121);
/* harmony import */ var _lengthEq_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6238);
/* harmony import */ var _lengthGte_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2544);
/* harmony import */ var _rejectP_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2075);
/* harmony import */ var _resolveP_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5784);
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
var lastP = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, function (iterable) {
  var fulfilled = [];
  var rejected = [];
  var onFulfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.bind)(fulfilled.push, fulfilled);
  var onReject = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.bind)(rejected.push, rejected);
  var listOfPromises = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.map)(function (p) {
    return (0,_resolveP_js__WEBPACK_IMPORTED_MODULE_1__["default"])(p).then(onFulfill)["catch"](onReject);
  }, _toConsumableArray(iterable));
  return (0,_allP_js__WEBPACK_IMPORTED_MODULE_2__["default"])(listOfPromises).then(function () {
    if ((0,_lengthEq_js__WEBPACK_IMPORTED_MODULE_3__["default"])(0, fulfilled) && (0,_lengthEq_js__WEBPACK_IMPORTED_MODULE_3__["default"])(0, rejected)) {
      return undefined;
    }
    if ((0,_lengthGte_js__WEBPACK_IMPORTED_MODULE_4__["default"])(1, fulfilled)) {
      return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.last)(fulfilled);
    }
    return (0,_rejectP_js__WEBPACK_IMPORTED_MODULE_5__["default"])(rejected);
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _internal_compareLength_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2329);



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
var lengthEq = (0,_internal_compareLength_js__WEBPACK_IMPORTED_MODULE_1__["default"])(ramda__WEBPACK_IMPORTED_MODULE_0__.equals);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lengthEq);

/***/ }),

/***/ 451:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _internal_compareLength_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2329);



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
var lengthGt = (0,_internal_compareLength_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_0__.flip)(ramda__WEBPACK_IMPORTED_MODULE_0__.gt));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lengthGt);

/***/ }),

/***/ 2544:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _internal_compareLength_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2329);



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
var lengthGte = (0,_internal_compareLength_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_0__.flip)(ramda__WEBPACK_IMPORTED_MODULE_0__.gte));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lengthGte);

/***/ }),

/***/ 2076:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _internal_compareLength_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2329);



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
var lengthLt = (0,_internal_compareLength_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_0__.flip)(ramda__WEBPACK_IMPORTED_MODULE_0__.lt));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lengthLt);

/***/ }),

/***/ 5369:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _internal_compareLength_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2329);



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
var lengthLte = (0,_internal_compareLength_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_0__.flip)(ramda__WEBPACK_IMPORTED_MODULE_0__.lte));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lengthLte);

/***/ }),

/***/ 4045:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _internal_compareLength_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2329);



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
var lengthNotEq = (0,_internal_compareLength_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(ramda__WEBPACK_IMPORTED_MODULE_0__.equals));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lengthNotEq);

/***/ }),

/***/ 4998:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var lensEq = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(3, function (lens, val, data) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.view)(lens), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.equals)(val))(data);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lensEq);

/***/ }),

/***/ 955:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
  return isomorphic((0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (toFunctorFn, target) {
    return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.map)(from, toFunctorFn(to(target)));
  }), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (toFunctorFn, target) {
    return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.map)(to, toFunctorFn(from(target)));
  }));
};

// from :: Isomorphism -> a -> b
var from = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (isomorphism, x) {
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
var lensIso = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(isomorphisms);
lensIso.from = from;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lensIso);

/***/ }),

/***/ 8181:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var lensNotEq = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_lensEq_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lensNotEq);

/***/ }),

/***/ 430:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var lensNotSatisfy = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_lensSatisfies_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lensNotSatisfy);

/***/ }),

/***/ 607:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isTrue_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5828);



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
var lensSatisfies = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(3, function (predicate, lens, data) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.view)(lens), predicate, _isTrue_js__WEBPACK_IMPORTED_MODULE_1__["default"])(data);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lensSatisfies);

/***/ }),

/***/ 1614:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _fantasy_land_Identity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7405);



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
var lensTraverse = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, function (F) {
  var of = typeof F['fantasy-land/of'] === 'function' ? F['fantasy-land/of'] : typeof F.of === 'function' ? F.of : F;
  var TypeRep = {
    'fantasy-land/of': of
  };
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (toFunctorFn, target) {
    return _fantasy_land_Identity_js__WEBPACK_IMPORTED_MODULE_1__["default"].of((0,ramda__WEBPACK_IMPORTED_MODULE_0__.traverse)(TypeRep, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(toFunctorFn, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.prop)('value')), target));
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var liftF = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, function (fn) {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _internal_ap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7061);



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
var liftFN = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (arity, fn) {
  var lifted = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(arity, fn);
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(arity, function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var accumulator = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.map)(lifted, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.head)(args));
    var apps = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.slice)(1, Infinity, args);
    return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.reduce)(_internal_ap_js__WEBPACK_IMPORTED_MODULE_1__["default"], accumulator, apps);
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var list = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.unapply)(ramda__WEBPACK_IMPORTED_MODULE_0__.identity);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (list);

/***/ }),

/***/ 2579:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var mapIndexed = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.addIndex)(ramda__WEBPACK_IMPORTED_MODULE_0__.map);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mapIndexed);

/***/ }),

/***/ 2737:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var mergePath = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (path, source, obj) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.over)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.lensPath)(path), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.mergeLeft)(source), obj);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergePath);

/***/ }),

/***/ 8164:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _paths_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3418);



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
var mergePaths = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(2, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(_paths_js__WEBPACK_IMPORTED_MODULE_1__["default"], ramda__WEBPACK_IMPORTED_MODULE_0__.mergeAll));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergePaths);

/***/ }),

/***/ 7559:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var mergeProp = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (p, subj, obj) {
  return (0,_mergePath_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_0__.of)(Array, p), subj, obj);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeProp);

/***/ }),

/***/ 3586:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var mergeProps = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(2, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.props, ramda__WEBPACK_IMPORTED_MODULE_0__.mergeAll));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeProps);

/***/ }),

/***/ 3073:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var move = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (fromIdx, toIdx, list) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.compose)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.insert)(toIdx, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.nth)(fromIdx, list)), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.remove)(fromIdx, 1))(list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (move);

/***/ }),

/***/ 7827:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var nand = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(ramda__WEBPACK_IMPORTED_MODULE_0__.and); // eslint-disable-line ramda/complement-simplification

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nand);

/***/ }),

/***/ 9609:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var neither = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.compose)(ramda__WEBPACK_IMPORTED_MODULE_0__.complement, ramda__WEBPACK_IMPORTED_MODULE_0__.either));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (neither);

/***/ }),

/***/ 9360:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _allP_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2121);
/* harmony import */ var _rejectP_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2075);
/* harmony import */ var _resolveP_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5784);





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
var noneP = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.map)(_resolveP_js__WEBPACK_IMPORTED_MODULE_1__["default"]), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.map)(function (p) {
  return p.then(_rejectP_js__WEBPACK_IMPORTED_MODULE_2__["default"], _resolveP_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
}), _allP_js__WEBPACK_IMPORTED_MODULE_3__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (noneP);

/***/ }),

/***/ 5131:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var nonePass = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.compose)(ramda__WEBPACK_IMPORTED_MODULE_0__.complement, ramda__WEBPACK_IMPORTED_MODULE_0__.anyPass));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nonePass);

/***/ }),

/***/ 4512:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var noop = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.always)((0,_stubUndefined_js__WEBPACK_IMPORTED_MODULE_1__["default"])());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (noop);

/***/ }),

/***/ 397:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var nor = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(ramda__WEBPACK_IMPORTED_MODULE_0__.or); // eslint-disable-line ramda/complement-simplification

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nor);

/***/ }),

/***/ 3833:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var notAllPass = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.compose)(ramda__WEBPACK_IMPORTED_MODULE_0__.complement, ramda__WEBPACK_IMPORTED_MODULE_0__.allPass));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (notAllPass);

/***/ }),

/***/ 2855:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var notAllUnique = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(_allUnique_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (notAllUnique);

/***/ }),

/***/ 8076:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var notBoth = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.compose)(ramda__WEBPACK_IMPORTED_MODULE_0__.complement, ramda__WEBPACK_IMPORTED_MODULE_0__.both));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (notBoth);

/***/ }),

/***/ 7383:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var notEqual = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(ramda__WEBPACK_IMPORTED_MODULE_0__.equals);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (notEqual);

/***/ }),

/***/ 5376:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var omitBy = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.useWith)(ramda__WEBPACK_IMPORTED_MODULE_0__.pickBy, [ramda__WEBPACK_IMPORTED_MODULE_0__.complement, ramda__WEBPACK_IMPORTED_MODULE_0__.identity]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (omitBy);

/***/ }),

/***/ 1153:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


// helpers
var rejectIndexed = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.addIndex)(ramda__WEBPACK_IMPORTED_MODULE_0__.reject);
var containsIndex = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (indexes, val, index) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.includes)(index, indexes);
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
var omitIndexes = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (indexes, list) {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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

var overlaps = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(2, function (list1, list2) {
  if ((0,ramda__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(list1)) {
    return true;
  }
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.intersection, ramda__WEBPACK_IMPORTED_MODULE_0__.isNotEmpty)(list1, list2);
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _internal_ponyfills_String_padEnd_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2724);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);



var padEndPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(_internal_ponyfills_String_padEnd_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
var padEndInvoker = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.flip)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.invoker)(2, 'padEnd'));

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
var padCharsEnd = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(String.prototype.padEnd) ? padEndInvoker : padEndPonyfill;
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);
/* harmony import */ var _internal_ponyfills_String_padStart_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4989);



var padStartInvoker = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.flip)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.invoker)(2, 'padStart'));
var padStartPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(_internal_ponyfills_String_padStart_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

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
var padCharsStart = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(String.prototype.padStart) ? padStartInvoker : padStartPonyfill;
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var pathNotEq = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(ramda__WEBPACK_IMPORTED_MODULE_0__.pathEq);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pathNotEq);

/***/ }),

/***/ 5988:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var pathOrLazy = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(3, function (defaultFn, path, obj) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.when)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)(defaultFn), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.partial)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.unary)(defaultFn), [obj]), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pathOr)(defaultFn, path, obj));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pathOrLazy);

/***/ }),

/***/ 3418:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var paths = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (ps, obj) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.ap)([(0,ramda__WEBPACK_IMPORTED_MODULE_0__.path)(ramda__WEBPACK_IMPORTED_MODULE_0__.__, obj)], ps);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (paths);

/***/ }),

/***/ 2609:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


// helpers
var filterIndexed = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.addIndex)(ramda__WEBPACK_IMPORTED_MODULE_0__.filter);
var containsIndex = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (indexes, val, index) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.includes)(index, indexes);
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
var pickIndexes = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (indexes, list) {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var propNotEq = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.complement)(ramda__WEBPACK_IMPORTED_MODULE_0__.propEq);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (propNotEq);

/***/ }),

/***/ 7649:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _floor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(752);



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
var rangeStep = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(3, function (step, from, to) {
  var callback = step === 0 ? (0,ramda__WEBPACK_IMPORTED_MODULE_0__.always)(from) : function (n) {
    return from + step * n;
  };
  var rangeEnd = step === 0 ? to - from : (0,_floor_js__WEBPACK_IMPORTED_MODULE_1__["default"])((to - from) / step);
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.map)(callback, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.range)(0, rangeEnd));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rangeStep);

/***/ }),

/***/ 5745:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var reduceIndexed = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.addIndex)(ramda__WEBPACK_IMPORTED_MODULE_0__.reduce);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reduceIndexed);

/***/ }),

/***/ 7360:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isUndefined_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9290);
/* harmony import */ var _resolveP_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5784);
/* harmony import */ var _allP_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2121);
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
var reduceP = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(3, function (fn, acc, list) {
  return (0,_resolveP_js__WEBPACK_IMPORTED_MODULE_1__["default"])(list).then(function (iterable) {
    var listLength = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.length)(iterable);
    if (listLength === 0) {
      return acc;
    }
    var reducer = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.reduce)(function (accP, currentValueP) {
      return accP.then(function (previousValue) {
        return (0,_allP_js__WEBPACK_IMPORTED_MODULE_2__["default"])([previousValue, currentValueP]);
      }).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          previousValue = _ref2[0],
          currentValue = _ref2[1];
        if ((0,_isUndefined_js__WEBPACK_IMPORTED_MODULE_3__["default"])(previousValue) && listLength === 1) {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isUndefined_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9290);
/* harmony import */ var _resolveP_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5784);
/* harmony import */ var _allP_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2121);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





// in older ramda versions the order of the arguments is flipped
var flipArgs = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.reduceRight)(ramda__WEBPACK_IMPORTED_MODULE_0__.concat, ''), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.equals)('ba'))(['a', 'b']);

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
var reduceRightP = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(3, function (fn, acc, list) {
  return (0,_resolveP_js__WEBPACK_IMPORTED_MODULE_1__["default"])(list).then(function (iterable) {
    var listLength = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.length)(iterable);
    if (listLength === 0) {
      return acc;
    }
    var reducer = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.reduceRight)(function (arg1, arg2) {
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
        return (0,_allP_js__WEBPACK_IMPORTED_MODULE_2__["default"])([previousValue, currentValueP]);
      }).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          previousValue = _ref2[0],
          currentValue = _ref2[1];
        if ((0,_isUndefined_js__WEBPACK_IMPORTED_MODULE_3__["default"])(previousValue) && listLength === 1) {
          return currentValue;
        }
        return fn(currentValue, previousValue);
      });
    });
    return reducer((0,_resolveP_js__WEBPACK_IMPORTED_MODULE_1__["default"])(acc), iterable);
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var rejectP = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.bind)(Promise.reject, Promise);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rejectP);

/***/ }),

/***/ 627:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var renameKey = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (oldKey, newKey, obj) {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var renameKeyWith = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (fn, key, obj) {
  return (0,_renameKeysWith_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_0__.when)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.equals)(key), fn), obj);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renameKeyWith);

/***/ }),

/***/ 5190:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _renameKeysWith_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2546);


var valueOrKey = function valueOrKey(keysMap) {
  return function (key) {
    if ((0,ramda__WEBPACK_IMPORTED_MODULE_0__.has)(key, keysMap)) {
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
var renameKeys = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (keysMap, obj) {
  return (0,_renameKeysWith_js__WEBPACK_IMPORTED_MODULE_1__["default"])(valueOrKey(keysMap), obj);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renameKeys);

/***/ }),

/***/ 2546:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var renameKeysWith = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (fn, obj) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.toPairs, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.map)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.over)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.lensIndex)(0), fn)), ramda__WEBPACK_IMPORTED_MODULE_0__.fromPairs)(obj);
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _internal_ponyfills_String_repeat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1237);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);



var repeatStrPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(_internal_ponyfills_String_repeat_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
var repeatStrInvoker = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.flip)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.invoker)(1, 'repeat'));

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
var repeatStr = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(String.prototype.repeat) ? repeatStrInvoker : repeatStrPonyfill;
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);
/* harmony import */ var _internal_ponyfills_String_replaceAll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4905);



var replaceAllPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(3, _internal_ponyfills_String_replaceAll_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
var replaceAllInvoker = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.invoker)(2, 'replaceAll');

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
var replaceAll = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(String.prototype.replaceAll) ? replaceAllInvoker : replaceAllPonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (replaceAll);

/***/ }),

/***/ 5784:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var resolveP = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.bind)(Promise.resolve, Promise);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (resolveP);

/***/ }),

/***/ 3798:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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

var round = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.bind)(Math.round, Math));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (round);

/***/ }),

/***/ 2961:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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

var seq = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (fns, x) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.tap)(function (tx) {
    return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.map)(function (fn) {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);
/* harmony import */ var _internal_ponyfills_Math_sign_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8674);



var signPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, _internal_ponyfills_Math_sign_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

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

var sign = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Math.sign) ? (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.bind)(Math.sign, Math)) : signPonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sign);

/***/ }),

/***/ 5780:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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

var skipTake = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (n, list) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.addIndex)(ramda__WEBPACK_IMPORTED_MODULE_0__.filter)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.nthArg)(1), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.modulo)(ramda__WEBPACK_IMPORTED_MODULE_0__.__, n), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.identical)(0)))(list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (skipTake);

/***/ }),

/***/ 6936:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var sliceFrom = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.slice)(ramda__WEBPACK_IMPORTED_MODULE_0__.__, Infinity);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliceFrom);

/***/ }),

/***/ 7285:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var sliceTo = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.slice)(0);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliceTo);

/***/ }),

/***/ 481:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);

var pathToAscendSort = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.path, ramda__WEBPACK_IMPORTED_MODULE_0__.ascend);
var mapPathsToAscendSort = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.map)(pathToAscendSort);

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

var sortByPaths = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.useWith)(ramda__WEBPACK_IMPORTED_MODULE_0__.sortWith, [mapPathsToAscendSort, ramda__WEBPACK_IMPORTED_MODULE_0__.identity]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sortByPaths);

/***/ }),

/***/ 7320:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _sortByProps_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2999);



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

var addValueInAnArray = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.append)(ramda__WEBPACK_IMPORTED_MODULE_0__.__, []);
var sortByProp = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.useWith)(_sortByProps_js__WEBPACK_IMPORTED_MODULE_1__["default"], [addValueInAnArray, ramda__WEBPACK_IMPORTED_MODULE_0__.identity]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sortByProp);

/***/ }),

/***/ 2999:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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

var sortByProps = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (props, list) {
  var firstTruthy = function firstTruthy(_ref) {
    var _ref2 = _toArray(_ref),
      head = _ref2[0],
      tail = _ref2.slice(1);
    return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.reduce)(ramda__WEBPACK_IMPORTED_MODULE_0__.either, head, tail);
  };
  var makeComparator = function makeComparator(propName) {
    return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.comparator)(function (a, b) {
      return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.lt)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.prop)(propName, a), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.prop)(propName, b));
    });
  };
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.sort)(firstTruthy((0,ramda__WEBPACK_IMPORTED_MODULE_0__.map)(makeComparator, props)), list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sortByProps);

/***/ }),

/***/ 3708:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var spreadPath = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(2, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.converge)(ramda__WEBPACK_IMPORTED_MODULE_0__.mergeRight, [ramda__WEBPACK_IMPORTED_MODULE_0__.dissocPath, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pathOr)({})]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (spreadPath);

/***/ }),

/***/ 4834:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var spreadProp = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (prop, obj) {
  return (0,_spreadPath_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,ramda__WEBPACK_IMPORTED_MODULE_0__.of)(Array, prop), obj);
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var stubNull = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.always)(null);
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var stubString = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.always)('');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stubString);

/***/ }),

/***/ 8254:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var stubUndefined = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.always)(void 0); // eslint-disable-line no-void

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stubUndefined);

/***/ }),

/***/ 6954:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var subtractNum = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.flip)(ramda__WEBPACK_IMPORTED_MODULE_0__.subtract);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (subtractNum);

/***/ }),

/***/ 1538:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   thenCatchP: () => (/* binding */ thenCatchP)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var thenCatchP = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.invoker)(2, 'then');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (thenCatchP);

/***/ }),

/***/ 5592:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   fromPonyfill: () => (/* binding */ fromPonyfill)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _isIterable_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1730);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);
/* harmony import */ var _internal_ponyfills_Array_from_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3010);




var fromPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, _internal_ponyfills_Array_from_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
var fromArray = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Array.from) ? (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, Array.from) : fromPonyfill;

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

var toArray = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.ifElse)(_isIterable_js__WEBPACK_IMPORTED_MODULE_3__["default"], fromArray, ramda__WEBPACK_IMPORTED_MODULE_0__.values);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toArray);

/***/ }),

/***/ 1798:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);

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
var toInteger32 = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, function (val) {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
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
var toNumber = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.ifElse)(_internal_isCoercible_js__WEBPACK_IMPORTED_MODULE_1__["default"], Number, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.always)(NaN));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toNumber);

/***/ }),

/***/ 7575:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var toUinteger32 = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, function (val) {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _included_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1424);



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

var trimCharsEnd = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (chars, value) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.split)(''), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.dropLastWhile)((0,_included_js__WEBPACK_IMPORTED_MODULE_1__["default"])(chars)), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.join)(''))(value);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (trimCharsEnd);

/***/ }),

/***/ 3287:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _included_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1424);



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

var trimCharsStart = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curry)(function (chars, value) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.split)(''), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.dropWhile)((0,_included_js__WEBPACK_IMPORTED_MODULE_1__["default"])(chars)), (0,ramda__WEBPACK_IMPORTED_MODULE_0__.join)(''))(value);
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _internal_ponyfills_String_trimEnd_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3561);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);



var trimEndPonyfill = _internal_ponyfills_String_trimEnd_js__WEBPACK_IMPORTED_MODULE_1__["default"];
var trimEndInvoker = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.invoker)(0, 'trimEnd');

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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _internal_ponyfills_String_trimStart_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8232);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);



var trimStartPonyfill = _internal_ponyfills_String_trimStart_js__WEBPACK_IMPORTED_MODULE_1__["default"];
var trimStartInvoker = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.invoker)(0, 'trimStart');

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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _internal_ponyfills_Math_trunc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3153);
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3800);



var truncPonyfill = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, _internal_ponyfills_Math_trunc_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

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

var trunc = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Math.trunc) ? (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(1, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.bind)(Math.trunc, Math)) : truncPonyfill;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (trunc);

/***/ }),

/***/ 4843:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);
/* harmony import */ var _lengthEq_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6238);



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
var unzipObjWith = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(2, function (fn, obj) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.toPairs, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.map)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.flip, ramda__WEBPACK_IMPORTED_MODULE_0__.apply)(fn)), ramda__WEBPACK_IMPORTED_MODULE_0__.transpose, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.when)((0,_lengthEq_js__WEBPACK_IMPORTED_MODULE_1__["default"])(0), function () {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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

var viewOr = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(3, function (defaultValue, lens, data) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.defaultTo)(defaultValue, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.view)(lens, data));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (viewOr);

/***/ }),

/***/ 392:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var weave = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(2, function (fn, config) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(fn.length, function () {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var weaveLazy = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(2, function (fn, configAccessor) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(fn.length, function () {
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
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4871);


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
var zipObjWith = (0,ramda__WEBPACK_IMPORTED_MODULE_0__.curryN)(3, function (fn, keys, values) {
  return (0,ramda__WEBPACK_IMPORTED_MODULE_0__.pipe)(ramda__WEBPACK_IMPORTED_MODULE_0__.zip, (0,ramda__WEBPACK_IMPORTED_MODULE_0__.map)((0,ramda__WEBPACK_IMPORTED_MODULE_0__.apply)(fn)), ramda__WEBPACK_IMPORTED_MODULE_0__.fromPairs)(values, keys);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (zipObjWith);

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