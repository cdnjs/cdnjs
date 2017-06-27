(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function add(a, b){
  if (b === undefined) {
    return c => add(a, c)
  }

  return a + b
}

function adjust(fn, index, arr){
  if (index === undefined) {
    return (indexHolder, arrHolder) => adjust(fn, indexHolder, arrHolder)
  } else if (arr === undefined) {
    return holder => adjust(fn, index, holder)
  }

  return arr.map((val, key) => {
    if (key === index) {
      return fn(arr[ index ])
    }

    return val
  })
}

function any(fn, arr){
  if (arr === undefined) {
    return holder => any(fn, holder)
  }

  let counter = 0
  while (counter < arr.length) {
    if (fn(arr[ counter ])) {
      return true
    }
    counter++
  }

  return false
}

function append (val, arr) {
  if (arr === undefined) {
    return holder => append(val, holder)
  }
  const clone = arr
  clone.push(val)

  return clone
}

function isFunction(value){

  return typeof value === "function"
}

function compose () {
  const funcs = arguments
  let length = funcs.length

  while (length--) {
    if (!isFunction(funcs[ length ])) {
      throw new TypeError
    }
  }

  return function () {
    let args = arguments
    let len = funcs.length

    while (len--) {
      args = [ funcs[ len ].apply(this, args) ]
    }

    return args[ 0 ]
  }
}

function contains(val, arr) {
  if (arr === undefined) {
    return holder => contains(val, holder)
  }

  let index = -1
  let flag = false
  while (++index < arr.length && !flag) {
    if (equals(arr[ index ], val)) {
      flag = true
    }
  }

  return flag
}

function filter(fn, arr) {
  if (arr === undefined) {
    return holder => filter(fn, holder)
  }

  let index = -1
  let resIndex = 0
  const len =  arr.length
  const willReturn = []

  while (++index < len) {
    const value = arr[ index ]
    if (fn(value)) {
      willReturn[ resIndex++ ] = value
    }
  }

  return willReturn
}

function find(fn, arr){
  if (arr === undefined) {
    return holder => find(fn, holder)
  }

  return arr.find(fn)
}

function findIndex(fn, arr){
  if (arr === undefined) {
    return holder => findIndex(fn, holder)
  }

  const length = arr.length
  let index = -1

  while (++index < length) {
    if (fn(arr[ index ])) {
      return index
    }
  }

  return -1
}

function flatten(arr, willReturn){
  willReturn = willReturn === undefined ?
    [] :
    willReturn

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[ i ])) {
      flatten(arr[ i ], willReturn)
    } else {
      willReturn.push(arr[ i ])
    }
  }

  return willReturn
}

function drop(dropNumber, a){
  if (a === undefined) {
    return holder => drop(dropNumber, holder)
  }

  return a.slice(dropNumber)
}

function dropLast(dropNumber, a){
  if (a === undefined) {
    return holder => dropLast(dropNumber, holder)
  }

  return a.slice(0, -dropNumber)
}

function equals(a, b) {
  if (b === undefined) {

    return holder => equals(a, holder)
  } else if (a === b) {

    return a !== 0 || 1 / a === 1 / b
  }
  const aType = type(a)
  if (aType !== type(b)) {
    return false
  }

  if (aType === "Array") {
    const aClone = a
    const bClone = b

    return aClone.sort().toString() === bClone.sort().toString()
  }

  if (aType === "Object") {
    const aKeys = Object.keys(a)
    if (aKeys.length === Object.keys(b).length) {
      if (aKeys.length === 0) {
        return true
      }
      let flag = true
      aKeys.map(val => {
        if (flag) {
          const aValType = type(a[ val ])
          const bValType = type(b[ val ])
          if (aValType === bValType) {
            if (aValType === "Object") {
              if (Object.keys(a[ val ]).length === Object.keys(b[ val ]).length) {
                if (Object.keys(a[ val ]).length !== 0) {
                  if (!equals(a[ val ], b[ val ])) {
                    flag = false
                  }
                }
              } else {
                flag = false
              }
            } else if (!equals(a[ val ], b[ val ])) {
              flag = false
            }
          } else {
            flag = false
          }
        }
      })

      return flag
    }
  }

  return false
}

function head(a){
  if (typeof a === "string") {
    return a[ 0 ] || ""
  }

  return a[ 0 ]
}

function indexOf(question, arr) {
  if (arr === undefined) {
    return holder => indexOf(question, holder)
  }

  let index = -1
  const length = arr.length

  while (++index < length) {
    if (arr[ index ] === question) {
      return index
    }
  }

  return -1
}

function baseSlice(array, start, end) {
  let index = -1
  let length = array.length

  end = end > length ? length : end
  if (end < 0) {
    end += length
  }
  length = start > end ? 0 : end - start >>> 0
  start >>>= 0

  const result = Array(length)
  while (++index < length) {
    result[ index ] = array[ index + start ]
  }

  return result
}

function init(a){
  if (typeof a === "string") {
    return a.slice(0, -1)
  }

  return a.length ? baseSlice(a, 0, -1) : []
}

function join(glue, arr) {
  if (arr === undefined) {
    return holder => join(glue, holder)
  }

  return arr.join(glue)
}

function map(fn, arr) {
  if (arr === undefined) {
    return holder => map(fn, holder)
  }

  let index = -1
  const length = arr.length
  const willReturn = Array(length)

  while (++index < length) {
    willReturn[ index ] = fn(arr[ index ])
  }

  return willReturn
}

function last(a){
  if (typeof a === "string") {
    return a[ a.length - 1 ] || ""
  }

  return a[ a.length - 1 ]
}

function length(arr){

  return arr.length
}

function match(regex, str) {
  if (str === undefined) {
    return holder => match(regex, holder)
  }
  const willReturn = str.match(regex)

  return willReturn === null ?
    [] :
    willReturn
}

function merge(obj, newProps) {
  if (newProps === undefined) {
    return holder => merge(obj, holder)
  }

  return Object.assign({}, obj, newProps)
}

function omit(keys, obj){
  if (obj === undefined) {
    return holder => omit(keys, holder)
  }

  const willReturn = {}
  for (key in obj) {
    if (!keys.includes(key)) {
      willReturn[ key ] = obj[ key ]
    }
  }

  return willReturn
}

function path(pathArr, obj) {
  if (obj === undefined) {
    return holder => path(pathArr, holder)
  }

  let holder = obj
  let counter = 0
  while (counter < pathArr.length) {
    if (holder === null) {
      return undefined
    }
    holder = holder[ pathArr[ counter ] ]
    counter++
  }

  return holder
}

function pick(keys, obj) {
  if (obj === undefined) {
    return holder => pick(keys, holder)
  }
  const willReturn = {}
  let counter = 0
  while (counter < keys.length) {
    if (keys[ counter ] in obj) {
      willReturn[ keys[ counter ] ] = obj[ keys[ counter ] ]
    }
    counter++
  }

  return willReturn
}

function pluck(keyToPluck,arr){
  if(arr === undefined){
    return arrHolder => pluck(keyToPluck, arrHolder)
  }
  const willReturn = []
  map(
    val =>{
      if(!(val[keyToPluck]===undefined)){
        willReturn.push(val[keyToPluck])
      }
    },
    arr
  )
  return willReturn
}

function prepend(val, arr) {
  if (arr === undefined) {
    return holder => prepend(val, holder)
  }

  const clone = arr
  clone.unshift(val)

  return clone
}

function prop(key, obj) {
  if (obj === undefined) {
    return holder => prop(key, holder)
  }

  return obj[ key ]
}

function propEq(key, val, obj) {
  if (val === undefined) {
    return (valHolder, objHolder) => propEq(key, valHolder, objHolder)
  } else if (obj === undefined) {
    return holder => propEq(key, val, holder)
  }

  return obj[ key ] === val
}

function range(start, end) {
  const willReturn = []
  for (let i = start; i < end; i++) {
    willReturn.push(i)
  }

  return willReturn
}

function repeat(a, num) {
  if (num === undefined) {
    return holder => repeat(a, holder)
  }
  const willReturn = Array(num)

  return willReturn.fill(a)
}

function replace(regex, replacer, str) {
  if (replacer === undefined) {
    return (replacerHolder, strHolder) => replace(regex, replacerHolder, strHolder)
  } else if (str === undefined) {
    return holder => replace(regex, replacer, holder)
  }

  return str.replace(regex, replacer)
}

function subtract(a, b) {
  if (b === undefined) {
    return holder => subtract(a, holder)
  }

  return a - b
}

function sort(fn, arr) {
  if (arr === undefined) {
    return holder => sort(fn, holder)
  }
  const arrClone = Array.from(arr)

  return arrClone.sort(fn)
}

function sortBy(fn, arr) {
  if (arr === undefined) {
    return holder => sortBy(fn, holder)
  }
  const arrClone = Array.from(arr)

  return arrClone.sort((a, b) => {
    const fnA = fn(a)
    const fnB = fn(b)
    return fnA < fnB ?
      -1 :
      fnA > fnB ?
        1 :
        0
  })
}

function split(glue, str) {
  if (str === undefined) {
    return holder => split(glue, holder)
  }

  return str.split(glue)
}

function splitEvery(num, a) {
  if (a === undefined) {
    return holder => splitEvery(num, holder)
  }
  num = num > 1 ?
    num :
    1

  const willReturn = []
  let counter = 0
  while (counter < a.length) {
    willReturn.push(a.slice(counter, counter += num))
  }

  return willReturn
}

function tail(arr){

  return drop(1, arr)
}

function take(takeNumber, a) {
  if (a === undefined) {
    return holder => take(takeNumber, holder)
  } else if (typeof a === "string") {
    return a.slice(0, takeNumber)
  }

  return baseSlice(a, 0, takeNumber)
}

function takeLast(takeNumber, a) {
  if (a === undefined) {
    return holder => takeLast(takeNumber, holder)
  }
  const len = a.length
  takeNumber = takeNumber > len ?
    len :
    takeNumber

  if (typeof a === "string") {
    return a.slice(len - takeNumber)
  }
  takeNumber = len - takeNumber

  return baseSlice(a, takeNumber, len)
}

function toLower(str){

  return str.toLowerCase()
}

function toUpper(str){

  return str.toUpperCase()
}

function test(regex, str){
  if (str === undefined) {
    return holder => test(regex, holder)
  }

  return str.search(regex) === -1 ?
    false :
    true
}

function trim(str){

  return str.trim()
}

function type(a){
  if (a === null) {

    return "Null"
  } else if (Array.isArray(a)) {

    return "Array"
  } else if (typeof a === "boolean") {

    return "Boolean"
  } else if (typeof a === "number") {

    return "Number"
  } else if (typeof a === "string") {

    return "String"
  } else if (a === undefined) {

    return "Undefined"
  } else if (a instanceof RegExp) {

    return "RegExp"
  }

  const asStr = a.toString()
  if(asStr.startsWith("async")){
    return "Async"
  }else if(asStr.includes("function")||asStr.includes("=>")){
    return "Function"
  }

  return "Object"
}

function values(obj){
  const willReturn = []
  for (key in obj) {
    willReturn.push(obj[ key ])
  }

  return willReturn
}

function uniq(arr){
  let index = -1
  const willReturn = []
  while (++index < arr.length) {
    const value = arr[ index ]
    if (!contains(value, willReturn)) {
      willReturn.push(value)
    }
  }

  return willReturn
}

function update(index, newValue, arr){
  if (newValue === undefined) {
    return (newValueHolder, arrHolder) => update(index, newValueHolder, arrHolder)
  } else if (arr === undefined) {
    return holder => update(index, newValue, holder)
  }
  const arrClone = Array.from(arr)

  return arrClone.fill(newValue, index, index + 1)
}

function defaultTo(defaultArgument, inputArgument){
  if(arguments.length === 1){
    return inputArgumentHolder => defaultTo(defaultArgument,inputArgumentHolder)
  }
  return inputArgument === undefined || !(type(inputArgument)===type(defaultArgument)) ?
    defaultArgument :
    inputArgument
}

function curry(fn, inputArguments = {}) {
  return inputArgumentsHolder => {
    if (type(fn) === "Async") {
      return new Promise((resolve, reject) => {
        fn(merge(inputArgumentsHolder, inputArguments))
          .then(resolve)
          .catch(reject)
      })
    }
    return fn(merge(inputArgumentsHolder, inputArguments))
  }
}

exports.add = add
exports.adjust = adjust
exports.any = any
exports.append = append
exports.compose = compose
exports.contains = contains
exports.curry = curry
exports.defaultTo = defaultTo
exports.drop = drop
exports.dropLast = dropLast
exports.equals = equals
exports.filter = filter
exports.find = find
exports.findIndex = findIndex
exports.flatten = flatten
exports.head = head
exports.indexOf = indexOf
exports.init = init
exports.join = join
exports.last = last
exports.length = length
exports.map = map
exports.match = match
exports.merge = merge
exports.omit = omit
exports.path = path
exports.pick = pick
exports.pluck = pluck
exports.prepend = prepend
exports.prop = prop
exports.propEq = propEq
exports.range = range
exports.repeat = repeat
exports.replace = replace
exports.sort = sort
exports.sortBy = sortBy
exports.split = split
exports.splitEvery = splitEvery
exports.subtract = subtract
exports.tail = tail
exports.take = take
exports.takeLast = takeLast
exports.test = test
exports.toLower = toLower
exports.toUpper = toUpper
exports.trim = trim
exports.type = type
exports.uniq = uniq
exports.update = update
exports.values = values


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const rambda = __webpack_require__(0)
module.exports.R = rambda


/***/ })
/******/ ]);
});