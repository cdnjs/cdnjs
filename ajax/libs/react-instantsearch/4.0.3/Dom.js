/*! ReactInstantSearch 4.0.3 | © Algolia, inc. | https://community.algolia.com/react-instantsearch/ */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["Dom"] = factory(require("react"), require("react-dom"));
	else
		root["ReactInstantSearch"] = root["ReactInstantSearch"] || {}, root["ReactInstantSearch"]["Dom"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_429__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	return __webpack_require__(__webpack_require__.s = 432);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (false) {
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
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(208)();
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _isEqual2=__webpack_require__(104),_isEqual3=_interopRequireDefault(_isEqual2),_has2=__webpack_require__(57),_has3=_interopRequireDefault(_has2),_extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();Object.defineProperty(exports,'__esModule',{value:!0});exports.default=createConnector;var _propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_utils=__webpack_require__(58);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function createConnector(a){if(!a.displayName)throw new Error('`createConnector` requires you to provide a `displayName` property.');var b=(0,_has3.default)(a,'refine'),c=(0,_has3.default)(a,'searchForFacetValues'),d=(0,_has3.default)(a,'getSearchParameters'),e=(0,_has3.default)(a,'getMetadata'),f=(0,_has3.default)(a,'transitionState'),g=(0,_has3.default)(a,'cleanUp'),h=d||e||f;return function(j){var k,l,m;return l=k=function(n){function o(p,q){_classCallCheck(this,o);var r=_possibleConstructorReturn(this,(o.__proto__||Object.getPrototypeOf(o)).call(this,p,q));m.call(r);var s=q.ais,t=s.store,u=s.widgetsManager,v=q.multiIndexContext;r.state={props:r.getProvidedProps(p)},r.unsubscribe=t.subscribe(function(){r.setState({props:r.getProvidedProps(r.props)})});var w=d?function(z){return a.getSearchParameters.call(r,z,r.props,t.getState().widgets)}:null,x=e?function(z){return a.getMetadata.call(r,r.props,z)}:null,y=f?function(z,A){return a.transitionState.call(r,r.props,z,A)}:null;return h&&(r.unregisterWidget=u.registerWidget({getSearchParameters:w,getMetadata:x,transitionState:y,multiIndexContext:v})),r}return _inherits(o,n),_createClass(o,[{key:'componentWillReceiveProps',value:function componentWillReceiveProps(p){(0,_isEqual3.default)(this.props,p)||(this.setState({props:this.getProvidedProps(p)}),h&&(this.context.ais.widgetsManager.update(),a.transitionState&&this.context.ais.onSearchStateChange(a.transitionState.call(this,p,this.context.ais.store.getState().widgets,this.context.ais.store.getState().widgets))))}},{key:'componentWillUnmount',value:function componentWillUnmount(){if(this.unsubscribe(),h&&(this.unregisterWidget(),g)){var p=a.cleanUp.call(this,this.props,this.context.ais.store.getState().widgets);this.context.ais.store.setState(_extends({},this.context.ais.store.getState(),{widgets:p})),this.context.ais.onSearchStateChange((0,_utils.removeEmptyKey)(p))}}},{key:'shouldComponentUpdate',value:function shouldComponentUpdate(p,q){var r=(0,_utils.shallowEqual)(this.props,p);return null===this.state.props||null===q.props?this.state.props!==q.props||!r:!r||!(0,_utils.shallowEqual)(this.state.props,q.props)}},{key:'render',value:function render(){var p=this;if(null===this.state.props)return null;var q=b?{refine:this.refine,createURL:this.createURL}:{},r=c?{searchForItems:this.searchForFacetValues,searchForFacetValues:function searchForFacetValues(s,t){'development'==="production"&&console.warn('react-instantsearch: `searchForFacetValues` has been renamed to`searchForItems`, this will break in the next major version.'),p.searchForFacetValues(s,t)}}:{};return _react2.default.createElement(j,_extends({},this.props,this.state.props,q,r))}}]),o}(_react.Component),k.displayName=a.displayName+'('+(0,_utils.getDisplayName)(j)+')',k.defaultClassNames=j.defaultClassNames,k.propTypes=a.propTypes,k.defaultProps=a.defaultProps,k.contextTypes={ais:_propTypes2.default.object.isRequired,multiIndexContext:_propTypes2.default.object},m=function _initialiseProps(){var n=this;this.getProvidedProps=function(o){var p=n.context.ais.store,q=p.getState(),r=q.results,s=q.searching,t=q.error,u=q.widgets,v=q.metadata,w=q.resultsFacetValues,x=q.searchingForFacetValues;return a.getProvidedProps.call(n,o,u,{results:r,searching:s,error:t,searchingForFacetValues:x},v,w)},this.refine=function(){for(var o,p=arguments.length,q=Array(p),r=0;r<p;r++)q[r]=arguments[r];n.context.ais.onInternalStateUpdate((o=a.refine).call.apply(o,[n,n.props,n.context.ais.store.getState().widgets].concat(q)))},this.searchForFacetValues=function(){for(var o=arguments.length,p=Array(o),q=0;q<o;q++)p[q]=arguments[q];n.context.ais.onSearchForFacetValues(a.searchForFacetValues.apply(a,[n.props,n.context.ais.store.getState().widgets].concat(p)))},this.createURL=function(){for(var o,p=arguments.length,q=Array(p),r=0;r<p;r++)q[r]=arguments[r];return n.context.ais.createHrefForState((o=a.refine).call.apply(o,[n,n.props,n.context.ais.store.getState().widgets].concat(q)))},this.cleanUp=function(){for(var o,p=arguments.length,q=Array(p),r=0;r<p;r++)q[r]=arguments[r];return(o=a.cleanUp).call.apply(o,[n].concat(q))}},l}}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(78);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _get2=__webpack_require__(73),_get3=_interopRequireDefault(_get2),_omit2=__webpack_require__(51),_omit3=_interopRequireDefault(_omit2),_has2=__webpack_require__(57),_has3=_interopRequireDefault(_has2),_extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a};Object.defineProperty(exports,'__esModule',{value:!0});exports.getIndex=getIndex,exports.getResults=getResults,exports.hasMultipleIndex=hasMultipleIndex,exports.refineValue=refineValue,exports.getCurrentRefinementValue=getCurrentRefinementValue,exports.cleanUpValue=cleanUpValue;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function getIndex(a){return a&&a.multiIndexContext?a.multiIndexContext.targetedIndex:a.ais.mainTargetedIndex}function getResults(a,b){return a.results&&!a.results.hits?a.results[getIndex(b)]?a.results[getIndex(b)]:null:a.results?a.results:null}function hasMultipleIndex(a){return a&&a.multiIndexContext}function refineValue(a,b,c,d,e){return hasMultipleIndex(c)?e?refineMultiIndexWithNamespace(a,b,c,d,e):refineMultiIndex(a,b,c,d):e?refineSingleIndexWithNamespace(a,b,d,e):refineSingleIndex(a,b,d)}function refineMultiIndex(a,b,c,d){var e=d?{page:1}:void 0,f=getIndex(c),g=(0,_has3.default)(a,'indices.'+f)?_extends({},a.indices,_defineProperty({},f,_extends({},a.indices[f],b,e))):_extends({},a.indices,_defineProperty({},f,_extends({},b,e)));return _extends({},a,{indices:g})}function refineSingleIndex(a,b,c){var d=c?{page:1}:void 0;return _extends({},a,b,d)}function refineMultiIndexWithNamespace(a,b,c,d,e){var f,g=getIndex(c),h=d?{page:1}:void 0,j=(0,_has3.default)(a,'indices.'+g)?_extends({},a.indices,_defineProperty({},g,_extends({},a.indices[g],(f={},_defineProperty(f,e,_extends({},a.indices[g][e],b)),_defineProperty(f,'page',1),f)))):_extends({},a.indices,_defineProperty({},g,_extends(_defineProperty({},e,b),h)));return _extends({},a,{indices:j})}function refineSingleIndexWithNamespace(a,b,c,d){var e=c?{page:1}:void 0;return _extends({},a,_defineProperty({},d,_extends({},a[d],b)),e)}function getNamespaceAndAttributeName(a){var b=a.match(/^([^.]*)\.(.*)/),c=b&&b[1],d=b&&b[2];return{namespace:c,attributeName:d}}function getCurrentRefinementValue(a,b,c,d,e,f){var g=getIndex(c),h=getNamespaceAndAttributeName(d),j=h.namespace,k=h.attributeName,l=hasMultipleIndex(c)&&b.indices&&j&&(0,_has3.default)(b.indices[''+g][j],''+k)||hasMultipleIndex(c)&&b.indices&&(0,_has3.default)(b,'indices.'+g+'.'+d)||!hasMultipleIndex(c)&&j&&(0,_has3.default)(b[j],k)||!hasMultipleIndex(c)&&(0,_has3.default)(b,d);if(l){var m;return m=hasMultipleIndex(c)?j?(0,_get3.default)(b.indices[''+g][j],k):(0,_get3.default)(b.indices[g],d):j?(0,_get3.default)(b[j],k):(0,_get3.default)(b,d),f(m)}return a.defaultRefinement?a.defaultRefinement:e}function cleanUpValue(a,b,c){var d=getIndex(b),e=getNamespaceAndAttributeName(c),f=e.namespace,g=e.attributeName;return hasMultipleIndex(b)?f?_extends({},a,{indices:_extends({},a.indices,_defineProperty({},d,_extends({},a.indices[d],_defineProperty({},f,(0,_omit3.default)(a.indices[d][f],''+g)))))}):(0,_omit3.default)(a,'indices.'+d+'.'+c):f?_extends({},a,_defineProperty({},f,(0,_omit3.default)(a[f],''+g))):(0,_omit3.default)(a,''+c)}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(15),
    getRawTag = __webpack_require__(157),
    objectToString = __webpack_require__(184);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(88),
    baseKeys = __webpack_require__(76),
    isArrayLike = __webpack_require__(11);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(136),
    getValue = __webpack_require__(159);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(19),
    isLength = __webpack_require__(47);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var baseMatches = __webpack_require__(265),
    baseMatchesProperty = __webpack_require__(266),
    identity = __webpack_require__(24),
    isArray = __webpack_require__(0),
    property = __webpack_require__(335);

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0}),exports.default=classNames;var _classnames=__webpack_require__(418),_classnames2=_interopRequireDefault(_classnames);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var prefix='ais';function classNames(a){return function(){for(var b=arguments.length,c=Array(b),d=0;d<b;d++)c[d]=arguments[d];return{className:(0,_classnames2.default)(c.filter(function(e){return e!==void 0&&!1!==e}).map(function(e){return prefix+'-'+a+'__'+e}))}}}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(3);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var baseKeys = __webpack_require__(76),
    getTag = __webpack_require__(56),
    isArguments = __webpack_require__(25),
    isArray = __webpack_require__(0),
    isArrayLike = __webpack_require__(11),
    isBuffer = __webpack_require__(26),
    isPrototype = __webpack_require__(37),
    isTypedArray = __webpack_require__(36);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

module.exports = isEmpty;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(12),
    baseIteratee = __webpack_require__(13),
    baseMap = __webpack_require__(138),
    isArray = __webpack_require__(0);

/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * _.map([4, 8], square);
 * // => [16, 64]
 *
 * _.map({ 'a': 4, 'b': 8 }, square);
 * // => [16, 64] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee) {
  var func = isArray(collection) ? arrayMap : baseMap;
  return func(collection, baseIteratee(iteratee, 3));
}

module.exports = map;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(8),
    isObject = __webpack_require__(6);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(24),
    overRest = __webpack_require__(185),
    setToString = __webpack_require__(100);

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(0),
    isKey = __webpack_require__(72),
    stringToPath = __webpack_require__(196),
    toString = __webpack_require__(75);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(90),
    baseAssignValue = __webpack_require__(41);

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(27);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(134),
    isObjectLike = __webpack_require__(7);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(3),
    stubFalse = __webpack_require__(206);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(55)(module)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(8),
    isObjectLike = __webpack_require__(7);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(169),
    listCacheDelete = __webpack_require__(170),
    listCacheGet = __webpack_require__(171),
    listCacheHas = __webpack_require__(172),
    listCacheSet = __webpack_require__(173);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(18);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(166);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),
/* 31 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(10);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _has2=__webpack_require__(57),_has3=_interopRequireDefault(_has2),_extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a};Object.defineProperty(exports,'__esModule',{value:!0});exports.default=translatable;var _react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_utils=__webpack_require__(58),_propTypes=__webpack_require__(403);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _objectWithoutProperties(a,b){var c={};for(var d in a)0<=b.indexOf(d)||Object.prototype.hasOwnProperty.call(a,d)&&(c[d]=a[d]);return c}function translatable(a){return function(b){function c(d){var e=d.translations,f=_objectWithoutProperties(d,['translations']);return _react2.default.createElement(b,_extends({translate:function translate(h){for(var j=arguments.length,k=Array(1<j?j-1:0),l=1;l<j;l++)k[l-1]=arguments[l];var m=e&&(0,_has3.default)(e,h)?e[h]:a[h];return'function'==typeof m?m.apply(void 0,k):m}},f))}return c.displayName='Translatable('+(0,_utils.getDisplayName)(b)+')',c.propTypes={translations:(0,_propTypes.withKeysPropType)(Object.keys(a))},c}}

/***/ }),
/* 34 */
/***/ (function(module, exports) {

/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */
function replaceHolders(array, placeholder) {
  var index = -1,
      length = array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value === placeholder || value === PLACEHOLDER) {
      array[index] = PLACEHOLDER;
      result[resIndex++] = index;
    }
  }
  return result;
}

module.exports = replaceHolders;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var arrayEach = __webpack_require__(85),
    baseEach = __webpack_require__(63),
    castFunction = __webpack_require__(143),
    isArray = __webpack_require__(0);

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, castFunction(iteratee));
}

module.exports = forEach;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(137),
    baseUnary = __webpack_require__(44),
    nodeUtil = __webpack_require__(183);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),
/* 37 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(10),
    root = __webpack_require__(3);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(174),
    mapCacheDelete = __webpack_require__(175),
    mapCacheGet = __webpack_require__(176),
    mapCacheHas = __webpack_require__(177),
    mapCacheSet = __webpack_require__(178);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(28),
    stackClear = __webpack_require__(191),
    stackDelete = __webpack_require__(192),
    stackGet = __webpack_require__(193),
    stackHas = __webpack_require__(194),
    stackSet = __webpack_require__(195);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(152);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var baseFor = __webpack_require__(132),
    keys = __webpack_require__(9);

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var baseFindIndex = __webpack_require__(130),
    baseIsNaN = __webpack_require__(263),
    strictIndexOf = __webpack_require__(317);

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),
/* 45 */
/***/ (function(module, exports) {

/**
 * Gets the argument placeholder value for `func`.
 *
 * @private
 * @param {Function} func The function to inspect.
 * @returns {*} Returns the placeholder value.
 */
function getHolder(func) {
  var object = func;
  return object.placeholder;
}

module.exports = getHolder;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var createFind = __webpack_require__(298),
    findIndex = __webpack_require__(198);

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.find(users, function(o) { return o.age < 40; });
 * // => object for 'barney'
 *
 * // The `_.matches` iteratee shorthand.
 * _.find(users, { 'age': 1, 'active': true });
 * // => object for 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.find(users, ['active', false]);
 * // => object for 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.find(users, 'active');
 * // => object for 'barney'
 */
var find = createFind(findIndex);

module.exports = find;


/***/ }),
/* 47 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(8),
    getPrototype = __webpack_require__(70),
    isObjectLike = __webpack_require__(7);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(8),
    isArray = __webpack_require__(0),
    isObjectLike = __webpack_require__(7);

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
}

module.exports = isString;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(88),
    baseKeysIn = __webpack_require__(264),
    isArrayLike = __webpack_require__(11);

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(12),
    baseClone = __webpack_require__(256),
    baseUnset = __webpack_require__(278),
    castPath = __webpack_require__(21),
    copyObject = __webpack_require__(22),
    customOmitClone = __webpack_require__(302),
    flatRest = __webpack_require__(155),
    getAllKeysIn = __webpack_require__(96);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable property paths of `object` that are not omitted.
 *
 * **Note:** This method is considerably slower than `_.pick`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = flatRest(function(object, paths) {
  var result = {};
  if (object == null) {
    return result;
  }
  var isDeep = false;
  paths = arrayMap(paths, function(path) {
    path = castPath(path, object);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  copyObject(object, getAllKeysIn(object), result);
  if (isDeep) {
    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
  }
  var length = paths.length;
  while (length--) {
    baseUnset(result, paths[length]);
  }
  return result;
});

module.exports = omit;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var arrayReduce = __webpack_require__(89),
    baseEach = __webpack_require__(63),
    baseIteratee = __webpack_require__(13),
    baseReduce = __webpack_require__(273),
    isArray = __webpack_require__(0);

/**
 * Reduces `collection` to a value which is the accumulated result of running
 * each element in `collection` thru `iteratee`, where each successive
 * invocation is supplied the return value of the previous. If `accumulator`
 * is not given, the first element of `collection` is used as the initial
 * value. The iteratee is invoked with four arguments:
 * (accumulator, value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.reduce`, `_.reduceRight`, and `_.transform`.
 *
 * The guarded methods are:
 * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
 * and `sortBy`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @returns {*} Returns the accumulated value.
 * @see _.reduceRight
 * @example
 *
 * _.reduce([1, 2], function(sum, n) {
 *   return sum + n;
 * }, 0);
 * // => 3
 *
 * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
 *   (result[value] || (result[value] = [])).push(key);
 *   return result;
 * }, {});
 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
 */
function reduce(collection, iteratee, accumulator) {
  var func = isArray(collection) ? arrayReduce : baseReduce,
      initAccum = arguments.length < 3;

  return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEach);
}

module.exports = reduce;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var toFinite = __webpack_require__(219);

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;


/***/ }),
/* 54 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(122),
    Map = __webpack_require__(38),
    Promise = __webpack_require__(125),
    Set = __webpack_require__(126),
    WeakMap = __webpack_require__(84),
    baseGetTag = __webpack_require__(8),
    toSource = __webpack_require__(80);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var baseHas = __webpack_require__(133),
    hasPath = __webpack_require__(97);

/**
 * Checks if `path` is a direct property of `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = { 'a': { 'b': 2 } };
 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.has(object, 'a');
 * // => true
 *
 * _.has(object, 'a.b');
 * // => true
 *
 * _.has(object, ['a', 'b']);
 * // => true
 *
 * _.has(other, 'a');
 * // => false
 */
function has(object, path) {
  return object != null && hasPath(object, path, baseHas);
}

module.exports = has;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _isPlainObject2=__webpack_require__(48),_isPlainObject3=_interopRequireDefault(_isPlainObject2),_isEmpty2=__webpack_require__(16),_isEmpty3=_interopRequireDefault(_isEmpty2);Object.defineProperty(exports,'__esModule',{value:!0}),exports.defer=void 0;exports.shallowEqual=shallowEqual,exports.isSpecialClick=isSpecialClick,exports.capitalize=capitalize,exports.assertFacetDefined=assertFacetDefined,exports.getDisplayName=getDisplayName,exports.removeEmptyKey=removeEmptyKey;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function shallowEqual(a,b){if(a===b)return!0;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(var e=Object.prototype.hasOwnProperty,g=0;g<c.length;g++)if(!e.call(b,c[g])||a[c[g]]!==b[c[g]])return!1;return!0}function isSpecialClick(a){var b=1===a.button;return!!(b||a.altKey||a.ctrlKey||a.metaKey||a.shiftKey)}function capitalize(a){return 0===a.length?'':''+a[0].toUpperCase()+a.slice(1)}function assertFacetDefined(a,b,c){var d=a.isConjunctiveFacet(c)||a.isDisjunctiveFacet(c),e=!!b.getFacetByName(c);0<b.nbHits&&d&&!e&&console.warn('A component requested values for facet "'+c+'", but no facet values were retrieved from the API. This means that you should add '+('the attribute "'+c+'" to the list of attributes for faceting in your index settings.'))}function getDisplayName(a){return a.displayName||a.name||'UnknownComponent'}var resolved=Promise.resolve(),defer=exports.defer=function(a){resolved.then(a)};function removeEmptyKey(a){return Object.keys(a).forEach(function(b){var c=a[b];(0,_isEmpty3.default)(c)&&(0,_isPlainObject3.default)(c)?delete a[b]:(0,_isPlainObject3.default)(c)&&removeEmptyKey(c)}),a}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(39),
    setCacheAdd = __webpack_require__(186),
    setCacheHas = __webpack_require__(187);

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ }),
/* 60 */
/***/ (function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var baseForOwn = __webpack_require__(42),
    createBaseEach = __webpack_require__(294);

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(21),
    toKey = __webpack_require__(23);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(135),
    isObjectLike = __webpack_require__(7);

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(15),
    arrayMap = __webpack_require__(12),
    isArray = __webpack_require__(0),
    isSymbol = __webpack_require__(27);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),
/* 67 */
/***/ (function(module, exports) {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ }),
/* 68 */
/***/ (function(module, exports) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(62),
    isObject = __webpack_require__(6);

/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */
function createCtor(Ctor) {
  return function() {
    // Use a `switch` statement to work with class constructors. See
    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
    // for more details.
    var args = arguments;
    switch (args.length) {
      case 0: return new Ctor;
      case 1: return new Ctor(args[0]);
      case 2: return new Ctor(args[0], args[1]);
      case 3: return new Ctor(args[0], args[1], args[2]);
      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }
    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, args);

    // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.
    return isObject(result) ? result : thisBinding;
  };
}

module.exports = createCtor;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(79);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(86),
    stubArray = __webpack_require__(107);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(0),
    isSymbol = __webpack_require__(27);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(64);

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(43),
    toInteger = __webpack_require__(53);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Gets the index at which the first occurrence of `value` is found in `array`
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. If `fromIndex` is negative, it's used as the
 * offset from the end of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * _.indexOf([1, 2, 1, 2], 2);
 * // => 1
 *
 * // Search from the `fromIndex`.
 * _.indexOf([1, 2, 1, 2], 2, 2);
 * // => 3
 */
function indexOf(array, value, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseIndexOf(array, value, index);
}

module.exports = indexOf;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(66);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(37),
    nativeKeys = __webpack_require__(182);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(59),
    arraySome = __webpack_require__(128),
    cacheHas = __webpack_require__(67);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)))

/***/ }),
/* 79 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 80 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(9);
var intersection = __webpack_require__(328);
var forOwn = __webpack_require__(326);
var forEach = __webpack_require__(35);
var filter = __webpack_require__(102);
var map = __webpack_require__(17);
var reduce = __webpack_require__(52);
var omit = __webpack_require__(51);
var indexOf = __webpack_require__(74);
var isNaN = __webpack_require__(218);
var isArray = __webpack_require__(0);
var isEmpty = __webpack_require__(16);
var isEqual = __webpack_require__(104);
var isUndefined = __webpack_require__(203);
var isString = __webpack_require__(49);
var isFunction = __webpack_require__(19);
var find = __webpack_require__(46);
var trim = __webpack_require__(207);

var defaults = __webpack_require__(101);
var merge = __webpack_require__(105);

var valToNumber = __webpack_require__(246);

var filterState = __webpack_require__(242);

var RefinementList = __webpack_require__(241);

/**
 * like _.find but using _.isEqual to be able to use it
 * to find arrays.
 * @private
 * @param {any[]} array array to search into
 * @param {any} searchedValue the value we're looking for
 * @return {any} the searched value or undefined
 */
function findArray(array, searchedValue) {
  return find(array, function(currentValue) {
    return isEqual(currentValue, searchedValue);
  });
}

/**
 * The facet list is the structure used to store the list of values used to
 * filter a single attribute.
 * @typedef {string[]} SearchParameters.FacetList
 */

/**
 * Structure to store numeric filters with the operator as the key. The supported operators
 * are `=`, `>`, `<`, `>=`, `<=` and `!=`.
 * @typedef {Object.<string, Array.<number|number[]>>} SearchParameters.OperatorList
 */

/**
 * SearchParameters is the data structure that contains all the information
 * usable for making a search to Algolia API. It doesn't do the search itself,
 * nor does it contains logic about the parameters.
 * It is an immutable object, therefore it has been created in a way that each
 * changes does not change the object itself but returns a copy with the
 * modification.
 * This object should probably not be instantiated outside of the helper. It will
 * be provided when needed. This object is documented for reference as you'll
 * get it from events generated by the {@link AlgoliaSearchHelper}.
 * If need be, instantiate the Helper from the factory function {@link SearchParameters.make}
 * @constructor
 * @classdesc contains all the parameters of a search
 * @param {object|SearchParameters} newParameters existing parameters or partial object
 * for the properties of a new SearchParameters
 * @see SearchParameters.make
 * @example <caption>SearchParameters of the first query in
 *   <a href="http://demos.algolia.com/instant-search-demo/">the instant search demo</a></caption>
{
   "query": "",
   "disjunctiveFacets": [
      "customerReviewCount",
      "category",
      "salePrice_range",
      "manufacturer"
  ],
   "maxValuesPerFacet": 30,
   "page": 0,
   "hitsPerPage": 10,
   "facets": [
      "type",
      "shipping"
  ]
}
 */
function SearchParameters(newParameters) {
  var params = newParameters ? SearchParameters._parseNumbers(newParameters) : {};

  /**
   * Targeted index. This parameter is mandatory.
   * @member {string}
   */
  this.index = params.index || '';

  // Query
  /**
   * Query string of the instant search. The empty string is a valid query.
   * @member {string}
   * @see https://www.algolia.com/doc/rest#param-query
   */
  this.query = params.query || '';

  // Facets
  /**
   * This attribute contains the list of all the conjunctive facets
   * used. This list will be added to requested facets in the
   * [facets attribute](https://www.algolia.com/doc/rest-api/search#param-facets) sent to algolia.
   * @member {string[]}
   */
  this.facets = params.facets || [];
  /**
   * This attribute contains the list of all the disjunctive facets
   * used. This list will be added to requested facets in the
   * [facets attribute](https://www.algolia.com/doc/rest-api/search#param-facets) sent to algolia.
   * @member {string[]}
   */
  this.disjunctiveFacets = params.disjunctiveFacets || [];
  /**
   * This attribute contains the list of all the hierarchical facets
   * used. This list will be added to requested facets in the
   * [facets attribute](https://www.algolia.com/doc/rest-api/search#param-facets) sent to algolia.
   * Hierarchical facets are a sub type of disjunctive facets that
   * let you filter faceted attributes hierarchically.
   * @member {string[]|object[]}
   */
  this.hierarchicalFacets = params.hierarchicalFacets || [];

  // Refinements
  /**
   * This attribute contains all the filters that need to be
   * applied on the conjunctive facets. Each facet must be properly
   * defined in the `facets` attribute.
   *
   * The key is the name of the facet, and the `FacetList` contains all
   * filters selected for the associated facet name.
   *
   * When querying algolia, the values stored in this attribute will
   * be translated into the `facetFiters` attribute.
   * @member {Object.<string, SearchParameters.FacetList>}
   */
  this.facetsRefinements = params.facetsRefinements || {};
  /**
   * This attribute contains all the filters that need to be
   * excluded from the conjunctive facets. Each facet must be properly
   * defined in the `facets` attribute.
   *
   * The key is the name of the facet, and the `FacetList` contains all
   * filters excluded for the associated facet name.
   *
   * When querying algolia, the values stored in this attribute will
   * be translated into the `facetFiters` attribute.
   * @member {Object.<string, SearchParameters.FacetList>}
   */
  this.facetsExcludes = params.facetsExcludes || {};
  /**
   * This attribute contains all the filters that need to be
   * applied on the disjunctive facets. Each facet must be properly
   * defined in the `disjunctiveFacets` attribute.
   *
   * The key is the name of the facet, and the `FacetList` contains all
   * filters selected for the associated facet name.
   *
   * When querying algolia, the values stored in this attribute will
   * be translated into the `facetFiters` attribute.
   * @member {Object.<string, SearchParameters.FacetList>}
   */
  this.disjunctiveFacetsRefinements = params.disjunctiveFacetsRefinements || {};
  /**
   * This attribute contains all the filters that need to be
   * applied on the numeric attributes.
   *
   * The key is the name of the attribute, and the value is the
   * filters to apply to this attribute.
   *
   * When querying algolia, the values stored in this attribute will
   * be translated into the `numericFilters` attribute.
   * @member {Object.<string, SearchParameters.OperatorList>}
   */
  this.numericRefinements = params.numericRefinements || {};
  /**
   * This attribute contains all the tags used to refine the query.
   *
   * When querying algolia, the values stored in this attribute will
   * be translated into the `tagFilters` attribute.
   * @member {string[]}
   */
  this.tagRefinements = params.tagRefinements || [];
  /**
   * This attribute contains all the filters that need to be
   * applied on the hierarchical facets. Each facet must be properly
   * defined in the `hierarchicalFacets` attribute.
   *
   * The key is the name of the facet, and the `FacetList` contains all
   * filters selected for the associated facet name. The FacetList values
   * are structured as a string that contain the values for each level
   * seperated by the configured separator.
   *
   * When querying algolia, the values stored in this attribute will
   * be translated into the `facetFiters` attribute.
   * @member {Object.<string, SearchParameters.FacetList>}
   */
  this.hierarchicalFacetsRefinements = params.hierarchicalFacetsRefinements || {};

  /**
   * Contains the numeric filters in the raw format of the Algolia API. Setting
   * this parameter is not compatible with the usage of numeric filters methods.
   * @see https://www.algolia.com/doc/javascript#numericFilters
   * @member {string}
   */
  this.numericFilters = params.numericFilters;

  /**
   * Contains the tag filters in the raw format of the Algolia API. Setting this
   * parameter is not compatible with the of the add/remove/toggle methods of the
   * tag api.
   * @see https://www.algolia.com/doc/rest#param-tagFilters
   * @member {string}
   */
  this.tagFilters = params.tagFilters;

  /**
   * Contains the optional tag filters in the raw format of the Algolia API.
   * @see https://www.algolia.com/doc/rest#param-tagFilters
   * @member {string}
   */
  this.optionalTagFilters = params.optionalTagFilters;

  /**
   * Contains the optional facet filters in the raw format of the Algolia API.
   * @see https://www.algolia.com/doc/rest#param-tagFilters
   * @member {string}
   */
  this.optionalFacetFilters = params.optionalFacetFilters;


  // Misc. parameters
  /**
   * Number of hits to be returned by the search API
   * @member {number}
   * @see https://www.algolia.com/doc/rest#param-hitsPerPage
   */
  this.hitsPerPage = params.hitsPerPage;
  /**
   * Number of values for each facetted attribute
   * @member {number}
   * @see https://www.algolia.com/doc/rest#param-maxValuesPerFacet
   */
  this.maxValuesPerFacet = params.maxValuesPerFacet;
  /**
   * The current page number
   * @member {number}
   * @see https://www.algolia.com/doc/rest#param-page
   */
  this.page = params.page || 0;
  /**
   * How the query should be treated by the search engine.
   * Possible values: prefixAll, prefixLast, prefixNone
   * @see https://www.algolia.com/doc/rest#param-queryType
   * @member {string}
   */
  this.queryType = params.queryType;
  /**
   * How the typo tolerance behave in the search engine.
   * Possible values: true, false, min, strict
   * @see https://www.algolia.com/doc/rest#param-typoTolerance
   * @member {string}
   */
  this.typoTolerance = params.typoTolerance;

  /**
   * Number of characters to wait before doing one character replacement.
   * @see https://www.algolia.com/doc/rest#param-minWordSizefor1Typo
   * @member {number}
   */
  this.minWordSizefor1Typo = params.minWordSizefor1Typo;
  /**
   * Number of characters to wait before doing a second character replacement.
   * @see https://www.algolia.com/doc/rest#param-minWordSizefor2Typos
   * @member {number}
   */
  this.minWordSizefor2Typos = params.minWordSizefor2Typos;
  /**
   * Configure the precision of the proximity ranking criterion
   * @see https://www.algolia.com/doc/rest#param-minProximity
   */
  this.minProximity = params.minProximity;
  /**
   * Should the engine allow typos on numerics.
   * @see https://www.algolia.com/doc/rest#param-allowTyposOnNumericTokens
   * @member {boolean}
   */
  this.allowTyposOnNumericTokens = params.allowTyposOnNumericTokens;
  /**
   * Should the plurals be ignored
   * @see https://www.algolia.com/doc/rest#param-ignorePlurals
   * @member {boolean}
   */
  this.ignorePlurals = params.ignorePlurals;
  /**
   * Restrict which attribute is searched.
   * @see https://www.algolia.com/doc/rest#param-restrictSearchableAttributes
   * @member {string}
   */
  this.restrictSearchableAttributes = params.restrictSearchableAttributes;
  /**
   * Enable the advanced syntax.
   * @see https://www.algolia.com/doc/rest#param-advancedSyntax
   * @member {boolean}
   */
  this.advancedSyntax = params.advancedSyntax;
  /**
   * Enable the analytics
   * @see https://www.algolia.com/doc/rest#param-analytics
   * @member {boolean}
   */
  this.analytics = params.analytics;
  /**
   * Tag of the query in the analytics.
   * @see https://www.algolia.com/doc/rest#param-analyticsTags
   * @member {string}
   */
  this.analyticsTags = params.analyticsTags;
  /**
   * Enable the synonyms
   * @see https://www.algolia.com/doc/rest#param-synonyms
   * @member {boolean}
   */
  this.synonyms = params.synonyms;
  /**
   * Should the engine replace the synonyms in the highlighted results.
   * @see https://www.algolia.com/doc/rest#param-replaceSynonymsInHighlight
   * @member {boolean}
   */
  this.replaceSynonymsInHighlight = params.replaceSynonymsInHighlight;
  /**
   * Add some optional words to those defined in the dashboard
   * @see https://www.algolia.com/doc/rest#param-optionalWords
   * @member {string}
   */
  this.optionalWords = params.optionalWords;
  /**
   * Possible values are "lastWords" "firstWords" "allOptional" "none" (default)
   * @see https://www.algolia.com/doc/rest#param-removeWordsIfNoResults
   * @member {string}
   */
  this.removeWordsIfNoResults = params.removeWordsIfNoResults;
  /**
   * List of attributes to retrieve
   * @see https://www.algolia.com/doc/rest#param-attributesToRetrieve
   * @member {string}
   */
  this.attributesToRetrieve = params.attributesToRetrieve;
  /**
   * List of attributes to highlight
   * @see https://www.algolia.com/doc/rest#param-attributesToHighlight
   * @member {string}
   */
  this.attributesToHighlight = params.attributesToHighlight;
  /**
   * Code to be embedded on the left part of the highlighted results
   * @see https://www.algolia.com/doc/rest#param-highlightPreTag
   * @member {string}
   */
  this.highlightPreTag = params.highlightPreTag;
  /**
   * Code to be embedded on the right part of the highlighted results
   * @see https://www.algolia.com/doc/rest#param-highlightPostTag
   * @member {string}
   */
  this.highlightPostTag = params.highlightPostTag;
  /**
   * List of attributes to snippet
   * @see https://www.algolia.com/doc/rest#param-attributesToSnippet
   * @member {string}
   */
  this.attributesToSnippet = params.attributesToSnippet;
  /**
   * Enable the ranking informations in the response, set to 1 to activate
   * @see https://www.algolia.com/doc/rest#param-getRankingInfo
   * @member {number}
   */
  this.getRankingInfo = params.getRankingInfo;
  /**
   * Remove duplicates based on the index setting attributeForDistinct
   * @see https://www.algolia.com/doc/rest#param-distinct
   * @member {boolean|number}
   */
  this.distinct = params.distinct;
  /**
   * Center of the geo search.
   * @see https://www.algolia.com/doc/rest#param-aroundLatLng
   * @member {string}
   */
  this.aroundLatLng = params.aroundLatLng;
  /**
   * Center of the search, retrieve from the user IP.
   * @see https://www.algolia.com/doc/rest#param-aroundLatLngViaIP
   * @member {boolean}
   */
  this.aroundLatLngViaIP = params.aroundLatLngViaIP;
  /**
   * Radius of the geo search.
   * @see https://www.algolia.com/doc/rest#param-aroundRadius
   * @member {number}
   */
  this.aroundRadius = params.aroundRadius;
  /**
   * Precision of the geo search.
   * @see https://www.algolia.com/doc/rest#param-aroundPrecision
   * @member {number}
   */
  this.minimumAroundRadius = params.minimumAroundRadius;
  /**
   * Precision of the geo search.
   * @see https://www.algolia.com/doc/rest#param-minimumAroundRadius
   * @member {number}
   */
  this.aroundPrecision = params.aroundPrecision;
  /**
   * Geo search inside a box.
   * @see https://www.algolia.com/doc/rest#param-insideBoundingBox
   * @member {string}
   */
  this.insideBoundingBox = params.insideBoundingBox;
  /**
   * Geo search inside a polygon.
   * @see https://www.algolia.com/doc/rest#param-insidePolygon
   * @member {string}
   */
  this.insidePolygon = params.insidePolygon;
  /**
   * Allows to specify an ellipsis character for the snippet when we truncate the text
   * (added before and after if truncated).
   * The default value is an empty string and we recommend to set it to "…"
   * @see https://www.algolia.com/doc/rest#param-insidePolygon
   * @member {string}
   */
  this.snippetEllipsisText = params.snippetEllipsisText;
  /**
   * Allows to specify some attributes name on which exact won't be applied.
   * Attributes are separated with a comma (for example "name,address" ), you can also use a
   * JSON string array encoding (for example encodeURIComponent('["name","address"]') ).
   * By default the list is empty.
   * @see https://www.algolia.com/doc/rest#param-disableExactOnAttributes
   * @member {string|string[]}
   */
  this.disableExactOnAttributes = params.disableExactOnAttributes;
  /**
   * Applies 'exact' on single word queries if the word contains at least 3 characters
   * and is not a stop word.
   * Can take two values: true or false.
   * By default, its set to false.
   * @see https://www.algolia.com/doc/rest#param-enableExactOnSingleWordQuery
   * @member {boolean}
   */
  this.enableExactOnSingleWordQuery = params.enableExactOnSingleWordQuery;

  // Undocumented parameters, still needed otherwise we fail
  this.offset = params.offset;
  this.length = params.length;

  var self = this;
  forOwn(params, function checkForUnknownParameter(paramValue, paramName) {
    if (SearchParameters.PARAMETERS.indexOf(paramName) === -1) {
      self[paramName] = paramValue;
    }
  });
}

/**
 * List all the properties in SearchParameters and therefore all the known Algolia properties
 * This doesn't contain any beta/hidden features.
 * @private
 */
SearchParameters.PARAMETERS = keys(new SearchParameters());

/**
 * @private
 * @param {object} partialState full or part of a state
 * @return {object} a new object with the number keys as number
 */
SearchParameters._parseNumbers = function(partialState) {
  // Do not reparse numbers in SearchParameters, they ought to be parsed already
  if (partialState instanceof SearchParameters) return partialState;

  var numbers = {};

  var numberKeys = [
    'aroundPrecision',
    'aroundRadius',
    'getRankingInfo',
    'minWordSizefor2Typos',
    'minWordSizefor1Typo',
    'page',
    'maxValuesPerFacet',
    'distinct',
    'minimumAroundRadius',
    'hitsPerPage',
    'minProximity'
  ];

  forEach(numberKeys, function(k) {
    var value = partialState[k];
    if (isString(value)) {
      var parsedValue = parseFloat(value);
      numbers[k] = isNaN(parsedValue) ? value : parsedValue;
    }
  });

  if (partialState.numericRefinements) {
    var numericRefinements = {};
    forEach(partialState.numericRefinements, function(operators, attribute) {
      numericRefinements[attribute] = {};
      forEach(operators, function(values, operator) {
        var parsedValues = map(values, function(v) {
          if (isArray(v)) {
            return map(v, function(vPrime) {
              if (isString(vPrime)) {
                return parseFloat(vPrime);
              }
              return vPrime;
            });
          } else if (isString(v)) {
            return parseFloat(v);
          }
          return v;
        });
        numericRefinements[attribute][operator] = parsedValues;
      });
    });
    numbers.numericRefinements = numericRefinements;
  }

  return merge({}, partialState, numbers);
};

/**
 * Factory for SearchParameters
 * @param {object|SearchParameters} newParameters existing parameters or partial
 * object for the properties of a new SearchParameters
 * @return {SearchParameters} frozen instance of SearchParameters
 */
SearchParameters.make = function makeSearchParameters(newParameters) {
  var instance = new SearchParameters(newParameters);

  forEach(newParameters.hierarchicalFacets, function(facet) {
    if (facet.rootPath) {
      var currentRefinement = instance.getHierarchicalRefinement(facet.name);

      if (currentRefinement.length > 0 && currentRefinement[0].indexOf(facet.rootPath) !== 0) {
        instance = instance.clearRefinements(facet.name);
      }

      // get it again in case it has been cleared
      currentRefinement = instance.getHierarchicalRefinement(facet.name);
      if (currentRefinement.length === 0) {
        instance = instance.toggleHierarchicalFacetRefinement(facet.name, facet.rootPath);
      }
    }
  });

  return instance;
};

/**
 * Validates the new parameters based on the previous state
 * @param {SearchParameters} currentState the current state
 * @param {object|SearchParameters} parameters the new parameters to set
 * @return {Error|null} Error if the modification is invalid, null otherwise
 */
SearchParameters.validate = function(currentState, parameters) {
  var params = parameters || {};

  if (currentState.tagFilters && params.tagRefinements && params.tagRefinements.length > 0) {
    return new Error(
      '[Tags] Cannot switch from the managed tag API to the advanced API. It is probably ' +
      'an error, if it is really what you want, you should first clear the tags with clearTags method.');
  }

  if (currentState.tagRefinements.length > 0 && params.tagFilters) {
    return new Error(
      '[Tags] Cannot switch from the advanced tag API to the managed API. It is probably ' +
      'an error, if it is not, you should first clear the tags with clearTags method.');
  }

  if (currentState.numericFilters && params.numericRefinements && !isEmpty(params.numericRefinements)) {
    return new Error(
      "[Numeric filters] Can't switch from the advanced to the managed API. It" +
      ' is probably an error, if this is really what you want, you have to first' +
      ' clear the numeric filters.');
  }

  if (!isEmpty(currentState.numericRefinements) && params.numericFilters) {
    return new Error(
      "[Numeric filters] Can't switch from the managed API to the advanced. It" +
      ' is probably an error, if this is really what you want, you have to first' +
      ' clear the numeric filters.');
  }

  return null;
};

SearchParameters.prototype = {
  constructor: SearchParameters,

  /**
   * Remove all refinements (disjunctive + conjunctive + excludes + numeric filters)
   * @method
   * @param {undefined|string|SearchParameters.clearCallback} [attribute] optionnal string or function
   * - If not given, means to clear all the filters.
   * - If `string`, means to clear all refinements for the `attribute` named filter.
   * - If `function`, means to clear all the refinements that return truthy values.
   * @return {SearchParameters}
   */
  clearRefinements: function clearRefinements(attribute) {
    var clear = RefinementList.clearRefinement;
    return this.setQueryParameters({
      numericRefinements: this._clearNumericRefinements(attribute),
      facetsRefinements: clear(this.facetsRefinements, attribute, 'conjunctiveFacet'),
      facetsExcludes: clear(this.facetsExcludes, attribute, 'exclude'),
      disjunctiveFacetsRefinements: clear(this.disjunctiveFacetsRefinements, attribute, 'disjunctiveFacet'),
      hierarchicalFacetsRefinements: clear(this.hierarchicalFacetsRefinements, attribute, 'hierarchicalFacet')
    });
  },
  /**
   * Remove all the refined tags from the SearchParameters
   * @method
   * @return {SearchParameters}
   */
  clearTags: function clearTags() {
    if (this.tagFilters === undefined && this.tagRefinements.length === 0) return this;

    return this.setQueryParameters({
      tagFilters: undefined,
      tagRefinements: []
    });
  },
  /**
   * Set the index.
   * @method
   * @param {string} index the index name
   * @return {SearchParameters}
   */
  setIndex: function setIndex(index) {
    if (index === this.index) return this;

    return this.setQueryParameters({
      index: index
    });
  },
  /**
   * Query setter
   * @method
   * @param {string} newQuery value for the new query
   * @return {SearchParameters}
   */
  setQuery: function setQuery(newQuery) {
    if (newQuery === this.query) return this;

    return this.setQueryParameters({
      query: newQuery
    });
  },
  /**
   * Page setter
   * @method
   * @param {number} newPage new page number
   * @return {SearchParameters}
   */
  setPage: function setPage(newPage) {
    if (newPage === this.page) return this;

    return this.setQueryParameters({
      page: newPage
    });
  },
  /**
   * Facets setter
   * The facets are the simple facets, used for conjunctive (and) facetting.
   * @method
   * @param {string[]} facets all the attributes of the algolia records used for conjunctive facetting
   * @return {SearchParameters}
   */
  setFacets: function setFacets(facets) {
    return this.setQueryParameters({
      facets: facets
    });
  },
  /**
   * Disjunctive facets setter
   * Change the list of disjunctive (or) facets the helper chan handle.
   * @method
   * @param {string[]} facets all the attributes of the algolia records used for disjunctive facetting
   * @return {SearchParameters}
   */
  setDisjunctiveFacets: function setDisjunctiveFacets(facets) {
    return this.setQueryParameters({
      disjunctiveFacets: facets
    });
  },
  /**
   * HitsPerPage setter
   * Hits per page represents the number of hits retrieved for this query
   * @method
   * @param {number} n number of hits retrieved per page of results
   * @return {SearchParameters}
   */
  setHitsPerPage: function setHitsPerPage(n) {
    if (this.hitsPerPage === n) return this;

    return this.setQueryParameters({
      hitsPerPage: n
    });
  },
  /**
   * typoTolerance setter
   * Set the value of typoTolerance
   * @method
   * @param {string} typoTolerance new value of typoTolerance ("true", "false", "min" or "strict")
   * @return {SearchParameters}
   */
  setTypoTolerance: function setTypoTolerance(typoTolerance) {
    if (this.typoTolerance === typoTolerance) return this;

    return this.setQueryParameters({
      typoTolerance: typoTolerance
    });
  },
  /**
   * Add a numeric filter for a given attribute
   * When value is an array, they are combined with OR
   * When value is a single value, it will combined with AND
   * @method
   * @param {string} attribute attribute to set the filter on
   * @param {string} operator operator of the filter (possible values: =, >, >=, <, <=, !=)
   * @param {number | number[]} value value of the filter
   * @return {SearchParameters}
   * @example
   * // for price = 50 or 40
   * searchparameter.addNumericRefinement('price', '=', [50, 40]);
   * @example
   * // for size = 38 and 40
   * searchparameter.addNumericRefinement('size', '=', 38);
   * searchparameter.addNumericRefinement('size', '=', 40);
   */
  addNumericRefinement: function(attribute, operator, v) {
    var value = valToNumber(v);

    if (this.isNumericRefined(attribute, operator, value)) return this;

    var mod = merge({}, this.numericRefinements);

    mod[attribute] = merge({}, mod[attribute]);

    if (mod[attribute][operator]) {
      // Array copy
      mod[attribute][operator] = mod[attribute][operator].slice();
      // Add the element. Concat can't be used here because value can be an array.
      mod[attribute][operator].push(value);
    } else {
      mod[attribute][operator] = [value];
    }

    return this.setQueryParameters({
      numericRefinements: mod
    });
  },
  /**
   * Get the list of conjunctive refinements for a single facet
   * @param {string} facetName name of the attribute used for facetting
   * @return {string[]} list of refinements
   */
  getConjunctiveRefinements: function(facetName) {
    if (!this.isConjunctiveFacet(facetName)) {
      throw new Error(facetName + ' is not defined in the facets attribute of the helper configuration');
    }
    return this.facetsRefinements[facetName] || [];
  },
  /**
   * Get the list of disjunctive refinements for a single facet
   * @param {string} facetName name of the attribute used for facetting
   * @return {string[]} list of refinements
   */
  getDisjunctiveRefinements: function(facetName) {
    if (!this.isDisjunctiveFacet(facetName)) {
      throw new Error(
        facetName + ' is not defined in the disjunctiveFacets attribute of the helper configuration'
      );
    }
    return this.disjunctiveFacetsRefinements[facetName] || [];
  },
  /**
   * Get the list of hierarchical refinements for a single facet
   * @param {string} facetName name of the attribute used for facetting
   * @return {string[]} list of refinements
   */
  getHierarchicalRefinement: function(facetName) {
    // we send an array but we currently do not support multiple
    // hierarchicalRefinements for a hierarchicalFacet
    return this.hierarchicalFacetsRefinements[facetName] || [];
  },
  /**
   * Get the list of exclude refinements for a single facet
   * @param {string} facetName name of the attribute used for facetting
   * @return {string[]} list of refinements
   */
  getExcludeRefinements: function(facetName) {
    if (!this.isConjunctiveFacet(facetName)) {
      throw new Error(facetName + ' is not defined in the facets attribute of the helper configuration');
    }
    return this.facetsExcludes[facetName] || [];
  },

  /**
   * Remove all the numeric filter for a given (attribute, operator)
   * @method
   * @param {string} attribute attribute to set the filter on
   * @param {string} [operator] operator of the filter (possible values: =, >, >=, <, <=, !=)
   * @param {number} [number] the value to be removed
   * @return {SearchParameters}
   */
  removeNumericRefinement: function(attribute, operator, paramValue) {
    if (paramValue !== undefined) {
      var paramValueAsNumber = valToNumber(paramValue);
      if (!this.isNumericRefined(attribute, operator, paramValueAsNumber)) return this;
      return this.setQueryParameters({
        numericRefinements: this._clearNumericRefinements(function(value, key) {
          return key === attribute && value.op === operator && isEqual(value.val, paramValueAsNumber);
        })
      });
    } else if (operator !== undefined) {
      if (!this.isNumericRefined(attribute, operator)) return this;
      return this.setQueryParameters({
        numericRefinements: this._clearNumericRefinements(function(value, key) {
          return key === attribute && value.op === operator;
        })
      });
    }

    if (!this.isNumericRefined(attribute)) return this;
    return this.setQueryParameters({
      numericRefinements: this._clearNumericRefinements(function(value, key) {
        return key === attribute;
      })
    });
  },
  /**
   * Get the list of numeric refinements for a single facet
   * @param {string} facetName name of the attribute used for facetting
   * @return {SearchParameters.OperatorList[]} list of refinements
   */
  getNumericRefinements: function(facetName) {
    return this.numericRefinements[facetName] || {};
  },
  /**
   * Return the current refinement for the (attribute, operator)
   * @param {string} attribute of the record
   * @param {string} operator applied
   * @return {number} value of the refinement
   */
  getNumericRefinement: function(attribute, operator) {
    return this.numericRefinements[attribute] && this.numericRefinements[attribute][operator];
  },
  /**
   * Clear numeric filters.
   * @method
   * @private
   * @param {string|SearchParameters.clearCallback} [attribute] optionnal string or function
   * - If not given, means to clear all the filters.
   * - If `string`, means to clear all refinements for the `attribute` named filter.
   * - If `function`, means to clear all the refinements that return truthy values.
   * @return {Object.<string, OperatorList>}
   */
  _clearNumericRefinements: function _clearNumericRefinements(attribute) {
    if (isUndefined(attribute)) {
      return {};
    } else if (isString(attribute)) {
      return omit(this.numericRefinements, attribute);
    } else if (isFunction(attribute)) {
      return reduce(this.numericRefinements, function(memo, operators, key) {
        var operatorList = {};

        forEach(operators, function(values, operator) {
          var outValues = [];
          forEach(values, function(value) {
            var predicateResult = attribute({val: value, op: operator}, key, 'numeric');
            if (!predicateResult) outValues.push(value);
          });
          if (!isEmpty(outValues)) operatorList[operator] = outValues;
        });

        if (!isEmpty(operatorList)) memo[key] = operatorList;

        return memo;
      }, {});
    }
  },
  /**
   * Add a facet to the facets attribute of the helper configuration, if it
   * isn't already present.
   * @method
   * @param {string} facet facet name to add
   * @return {SearchParameters}
   */
  addFacet: function addFacet(facet) {
    if (this.isConjunctiveFacet(facet)) {
      return this;
    }

    return this.setQueryParameters({
      facets: this.facets.concat([facet])
    });
  },
  /**
   * Add a disjunctive facet to the disjunctiveFacets attribute of the helper
   * configuration, if it isn't already present.
   * @method
   * @param {string} facet disjunctive facet name to add
   * @return {SearchParameters}
   */
  addDisjunctiveFacet: function addDisjunctiveFacet(facet) {
    if (this.isDisjunctiveFacet(facet)) {
      return this;
    }

    return this.setQueryParameters({
      disjunctiveFacets: this.disjunctiveFacets.concat([facet])
    });
  },
  /**
   * Add a hierarchical facet to the hierarchicalFacets attribute of the helper
   * configuration.
   * @method
   * @param {object} hierarchicalFacet hierarchical facet to add
   * @return {SearchParameters}
   * @throws will throw an error if a hierarchical facet with the same name was already declared
   */
  addHierarchicalFacet: function addHierarchicalFacet(hierarchicalFacet) {
    if (this.isHierarchicalFacet(hierarchicalFacet.name)) {
      throw new Error(
        'Cannot declare two hierarchical facets with the same name: `' + hierarchicalFacet.name + '`');
    }

    return this.setQueryParameters({
      hierarchicalFacets: this.hierarchicalFacets.concat([hierarchicalFacet])
    });
  },
  /**
   * Add a refinement on a "normal" facet
   * @method
   * @param {string} facet attribute to apply the facetting on
   * @param {string} value value of the attribute (will be converted to string)
   * @return {SearchParameters}
   */
  addFacetRefinement: function addFacetRefinement(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
    }
    if (RefinementList.isRefined(this.facetsRefinements, facet, value)) return this;

    return this.setQueryParameters({
      facetsRefinements: RefinementList.addRefinement(this.facetsRefinements, facet, value)
    });
  },
  /**
   * Exclude a value from a "normal" facet
   * @method
   * @param {string} facet attribute to apply the exclusion on
   * @param {string} value value of the attribute (will be converted to string)
   * @return {SearchParameters}
   */
  addExcludeRefinement: function addExcludeRefinement(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
    }
    if (RefinementList.isRefined(this.facetsExcludes, facet, value)) return this;

    return this.setQueryParameters({
      facetsExcludes: RefinementList.addRefinement(this.facetsExcludes, facet, value)
    });
  },
  /**
   * Adds a refinement on a disjunctive facet.
   * @method
   * @param {string} facet attribute to apply the facetting on
   * @param {string} value value of the attribute (will be converted to string)
   * @return {SearchParameters}
   */
  addDisjunctiveFacetRefinement: function addDisjunctiveFacetRefinement(facet, value) {
    if (!this.isDisjunctiveFacet(facet)) {
      throw new Error(
        facet + ' is not defined in the disjunctiveFacets attribute of the helper configuration');
    }

    if (RefinementList.isRefined(this.disjunctiveFacetsRefinements, facet, value)) return this;

    return this.setQueryParameters({
      disjunctiveFacetsRefinements: RefinementList.addRefinement(
        this.disjunctiveFacetsRefinements, facet, value)
    });
  },
  /**
   * addTagRefinement adds a tag to the list used to filter the results
   * @param {string} tag tag to be added
   * @return {SearchParameters}
   */
  addTagRefinement: function addTagRefinement(tag) {
    if (this.isTagRefined(tag)) return this;

    var modification = {
      tagRefinements: this.tagRefinements.concat(tag)
    };

    return this.setQueryParameters(modification);
  },
  /**
   * Remove a facet from the facets attribute of the helper configuration, if it
   * is present.
   * @method
   * @param {string} facet facet name to remove
   * @return {SearchParameters}
   */
  removeFacet: function removeFacet(facet) {
    if (!this.isConjunctiveFacet(facet)) {
      return this;
    }

    return this.clearRefinements(facet).setQueryParameters({
      facets: filter(this.facets, function(f) {
        return f !== facet;
      })
    });
  },
  /**
   * Remove a disjunctive facet from the disjunctiveFacets attribute of the
   * helper configuration, if it is present.
   * @method
   * @param {string} facet disjunctive facet name to remove
   * @return {SearchParameters}
   */
  removeDisjunctiveFacet: function removeDisjunctiveFacet(facet) {
    if (!this.isDisjunctiveFacet(facet)) {
      return this;
    }

    return this.clearRefinements(facet).setQueryParameters({
      disjunctiveFacets: filter(this.disjunctiveFacets, function(f) {
        return f !== facet;
      })
    });
  },
  /**
   * Remove a hierarchical facet from the hierarchicalFacets attribute of the
   * helper configuration, if it is present.
   * @method
   * @param {string} facet hierarchical facet name to remove
   * @return {SearchParameters}
   */
  removeHierarchicalFacet: function removeHierarchicalFacet(facet) {
    if (!this.isHierarchicalFacet(facet)) {
      return this;
    }

    return this.clearRefinements(facet).setQueryParameters({
      hierarchicalFacets: filter(this.hierarchicalFacets, function(f) {
        return f.name !== facet;
      })
    });
  },
  /**
   * Remove a refinement set on facet. If a value is provided, it will clear the
   * refinement for the given value, otherwise it will clear all the refinement
   * values for the facetted attribute.
   * @method
   * @param {string} facet name of the attribute used for facetting
   * @param {string} [value] value used to filter
   * @return {SearchParameters}
   */
  removeFacetRefinement: function removeFacetRefinement(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
    }
    if (!RefinementList.isRefined(this.facetsRefinements, facet, value)) return this;

    return this.setQueryParameters({
      facetsRefinements: RefinementList.removeRefinement(this.facetsRefinements, facet, value)
    });
  },
  /**
   * Remove a negative refinement on a facet
   * @method
   * @param {string} facet name of the attribute used for facetting
   * @param {string} value value used to filter
   * @return {SearchParameters}
   */
  removeExcludeRefinement: function removeExcludeRefinement(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
    }
    if (!RefinementList.isRefined(this.facetsExcludes, facet, value)) return this;

    return this.setQueryParameters({
      facetsExcludes: RefinementList.removeRefinement(this.facetsExcludes, facet, value)
    });
  },
  /**
   * Remove a refinement on a disjunctive facet
   * @method
   * @param {string} facet name of the attribute used for facetting
   * @param {string} value value used to filter
   * @return {SearchParameters}
   */
  removeDisjunctiveFacetRefinement: function removeDisjunctiveFacetRefinement(facet, value) {
    if (!this.isDisjunctiveFacet(facet)) {
      throw new Error(
        facet + ' is not defined in the disjunctiveFacets attribute of the helper configuration');
    }
    if (!RefinementList.isRefined(this.disjunctiveFacetsRefinements, facet, value)) return this;

    return this.setQueryParameters({
      disjunctiveFacetsRefinements: RefinementList.removeRefinement(
        this.disjunctiveFacetsRefinements, facet, value)
    });
  },
  /**
   * Remove a tag from the list of tag refinements
   * @method
   * @param {string} tag the tag to remove
   * @return {SearchParameters}
   */
  removeTagRefinement: function removeTagRefinement(tag) {
    if (!this.isTagRefined(tag)) return this;

    var modification = {
      tagRefinements: filter(this.tagRefinements, function(t) { return t !== tag; })
    };

    return this.setQueryParameters(modification);
  },
  /**
   * Generic toggle refinement method to use with facet, disjunctive facets
   * and hierarchical facets
   * @param  {string} facet the facet to refine
   * @param  {string} value the associated value
   * @return {SearchParameters}
   * @throws will throw an error if the facet is not declared in the settings of the helper
   * @deprecated since version 2.19.0, see {@link SearchParameters#toggleFacetRefinement}
   */
  toggleRefinement: function toggleRefinement(facet, value) {
    return this.toggleFacetRefinement(facet, value);
  },
  /**
   * Generic toggle refinement method to use with facet, disjunctive facets
   * and hierarchical facets
   * @param  {string} facet the facet to refine
   * @param  {string} value the associated value
   * @return {SearchParameters}
   * @throws will throw an error if the facet is not declared in the settings of the helper
   */
  toggleFacetRefinement: function toggleFacetRefinement(facet, value) {
    if (this.isHierarchicalFacet(facet)) {
      return this.toggleHierarchicalFacetRefinement(facet, value);
    } else if (this.isConjunctiveFacet(facet)) {
      return this.toggleConjunctiveFacetRefinement(facet, value);
    } else if (this.isDisjunctiveFacet(facet)) {
      return this.toggleDisjunctiveFacetRefinement(facet, value);
    }

    throw new Error('Cannot refine the undeclared facet ' + facet +
      '; it should be added to the helper options facets, disjunctiveFacets or hierarchicalFacets');
  },
  /**
   * Switch the refinement applied over a facet/value
   * @method
   * @param {string} facet name of the attribute used for facetting
   * @param {value} value value used for filtering
   * @return {SearchParameters}
   */
  toggleConjunctiveFacetRefinement: function toggleConjunctiveFacetRefinement(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
    }

    return this.setQueryParameters({
      facetsRefinements: RefinementList.toggleRefinement(this.facetsRefinements, facet, value)
    });
  },
  /**
   * Switch the refinement applied over a facet/value
   * @method
   * @param {string} facet name of the attribute used for facetting
   * @param {value} value value used for filtering
   * @return {SearchParameters}
   */
  toggleExcludeFacetRefinement: function toggleExcludeFacetRefinement(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
    }

    return this.setQueryParameters({
      facetsExcludes: RefinementList.toggleRefinement(this.facetsExcludes, facet, value)
    });
  },
  /**
   * Switch the refinement applied over a facet/value
   * @method
   * @param {string} facet name of the attribute used for facetting
   * @param {value} value value used for filtering
   * @return {SearchParameters}
   */
  toggleDisjunctiveFacetRefinement: function toggleDisjunctiveFacetRefinement(facet, value) {
    if (!this.isDisjunctiveFacet(facet)) {
      throw new Error(
        facet + ' is not defined in the disjunctiveFacets attribute of the helper configuration');
    }

    return this.setQueryParameters({
      disjunctiveFacetsRefinements: RefinementList.toggleRefinement(
        this.disjunctiveFacetsRefinements, facet, value)
    });
  },
  /**
   * Switch the refinement applied over a facet/value
   * @method
   * @param {string} facet name of the attribute used for facetting
   * @param {value} value value used for filtering
   * @return {SearchParameters}
   */
  toggleHierarchicalFacetRefinement: function toggleHierarchicalFacetRefinement(facet, value) {
    if (!this.isHierarchicalFacet(facet)) {
      throw new Error(
        facet + ' is not defined in the hierarchicalFacets attribute of the helper configuration');
    }

    var separator = this._getHierarchicalFacetSeparator(this.getHierarchicalFacetByName(facet));

    var mod = {};

    var upOneOrMultipleLevel = this.hierarchicalFacetsRefinements[facet] !== undefined &&
      this.hierarchicalFacetsRefinements[facet].length > 0 && (
      // remove current refinement:
      // refinement was 'beer > IPA', call is toggleRefine('beer > IPA'), refinement should be `beer`
      this.hierarchicalFacetsRefinements[facet][0] === value ||
      // remove a parent refinement of the current refinement:
      //  - refinement was 'beer > IPA > Flying dog'
      //  - call is toggleRefine('beer > IPA')
      //  - refinement should be `beer`
      this.hierarchicalFacetsRefinements[facet][0].indexOf(value + separator) === 0
    );

    if (upOneOrMultipleLevel) {
      if (value.indexOf(separator) === -1) {
        // go back to root level
        mod[facet] = [];
      } else {
        mod[facet] = [value.slice(0, value.lastIndexOf(separator))];
      }
    } else {
      mod[facet] = [value];
    }

    return this.setQueryParameters({
      hierarchicalFacetsRefinements: defaults({}, mod, this.hierarchicalFacetsRefinements)
    });
  },

  /**
   * Adds a refinement on a hierarchical facet.
   * @param {string} facet the facet name
   * @param {string} path the hierarchical facet path
   * @return {SearchParameter} the new state
   * @throws Error if the facet is not defined or if the facet is refined
   */
  addHierarchicalFacetRefinement: function(facet, path) {
    if (this.isHierarchicalFacetRefined(facet)) {
      throw new Error(facet + ' is already refined.');
    }
    var mod = {};
    mod[facet] = [path];
    return this.setQueryParameters({
      hierarchicalFacetsRefinements: defaults({}, mod, this.hierarchicalFacetsRefinements)
    });
  },

  /**
   * Removes the refinement set on a hierarchical facet.
   * @param {string} facet the facet name
   * @return {SearchParameter} the new state
   * @throws Error if the facet is not defined or if the facet is not refined
   */
  removeHierarchicalFacetRefinement: function(facet) {
    if (!this.isHierarchicalFacetRefined(facet)) {
      throw new Error(facet + ' is not refined.');
    }
    var mod = {};
    mod[facet] = [];
    return this.setQueryParameters({
      hierarchicalFacetsRefinements: defaults({}, mod, this.hierarchicalFacetsRefinements)
    });
  },
  /**
   * Switch the tag refinement
   * @method
   * @param {string} tag the tag to remove or add
   * @return {SearchParameters}
   */
  toggleTagRefinement: function toggleTagRefinement(tag) {
    if (this.isTagRefined(tag)) {
      return this.removeTagRefinement(tag);
    }

    return this.addTagRefinement(tag);
  },
  /**
   * Test if the facet name is from one of the disjunctive facets
   * @method
   * @param {string} facet facet name to test
   * @return {boolean}
   */
  isDisjunctiveFacet: function(facet) {
    return indexOf(this.disjunctiveFacets, facet) > -1;
  },
  /**
   * Test if the facet name is from one of the hierarchical facets
   * @method
   * @param {string} facetName facet name to test
   * @return {boolean}
   */
  isHierarchicalFacet: function(facetName) {
    return this.getHierarchicalFacetByName(facetName) !== undefined;
  },
  /**
   * Test if the facet name is from one of the conjunctive/normal facets
   * @method
   * @param {string} facet facet name to test
   * @return {boolean}
   */
  isConjunctiveFacet: function(facet) {
    return indexOf(this.facets, facet) > -1;
  },
  /**
   * Returns true if the facet is refined, either for a specific value or in
   * general.
   * @method
   * @param {string} facet name of the attribute for used for facetting
   * @param {string} value, optionnal value. If passed will test that this value
   * is filtering the given facet.
   * @return {boolean} returns true if refined
   */
  isFacetRefined: function isFacetRefined(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
    }
    return RefinementList.isRefined(this.facetsRefinements, facet, value);
  },
  /**
   * Returns true if the facet contains exclusions or if a specific value is
   * excluded.
   *
   * @method
   * @param {string} facet name of the attribute for used for facetting
   * @param {string} [value] optionnal value. If passed will test that this value
   * is filtering the given facet.
   * @return {boolean} returns true if refined
   */
  isExcludeRefined: function isExcludeRefined(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
    }
    return RefinementList.isRefined(this.facetsExcludes, facet, value);
  },
  /**
   * Returns true if the facet contains a refinement, or if a value passed is a
   * refinement for the facet.
   * @method
   * @param {string} facet name of the attribute for used for facetting
   * @param {string} value optionnal, will test if the value is used for refinement
   * if there is one, otherwise will test if the facet contains any refinement
   * @return {boolean}
   */
  isDisjunctiveFacetRefined: function isDisjunctiveFacetRefined(facet, value) {
    if (!this.isDisjunctiveFacet(facet)) {
      throw new Error(
        facet + ' is not defined in the disjunctiveFacets attribute of the helper configuration');
    }
    return RefinementList.isRefined(this.disjunctiveFacetsRefinements, facet, value);
  },
  /**
   * Returns true if the facet contains a refinement, or if a value passed is a
   * refinement for the facet.
   * @method
   * @param {string} facet name of the attribute for used for facetting
   * @param {string} value optionnal, will test if the value is used for refinement
   * if there is one, otherwise will test if the facet contains any refinement
   * @return {boolean}
   */
  isHierarchicalFacetRefined: function isHierarchicalFacetRefined(facet, value) {
    if (!this.isHierarchicalFacet(facet)) {
      throw new Error(
        facet + ' is not defined in the hierarchicalFacets attribute of the helper configuration');
    }

    var refinements = this.getHierarchicalRefinement(facet);

    if (!value) {
      return refinements.length > 0;
    }

    return indexOf(refinements, value) !== -1;
  },
  /**
   * Test if the triple (attribute, operator, value) is already refined.
   * If only the attribute and the operator are provided, it tests if the
   * contains any refinement value.
   * @method
   * @param {string} attribute attribute for which the refinement is applied
   * @param {string} [operator] operator of the refinement
   * @param {string} [value] value of the refinement
   * @return {boolean} true if it is refined
   */
  isNumericRefined: function isNumericRefined(attribute, operator, value) {
    if (isUndefined(value) && isUndefined(operator)) {
      return !!this.numericRefinements[attribute];
    }

    var isOperatorDefined = this.numericRefinements[attribute] &&
      !isUndefined(this.numericRefinements[attribute][operator]);

    if (isUndefined(value) || !isOperatorDefined) {
      return isOperatorDefined;
    }

    var parsedValue = valToNumber(value);
    var isAttributeValueDefined = !isUndefined(
      findArray(this.numericRefinements[attribute][operator], parsedValue)
    );

    return isOperatorDefined && isAttributeValueDefined;
  },
  /**
   * Returns true if the tag refined, false otherwise
   * @method
   * @param {string} tag the tag to check
   * @return {boolean}
   */
  isTagRefined: function isTagRefined(tag) {
    return indexOf(this.tagRefinements, tag) !== -1;
  },
  /**
   * Returns the list of all disjunctive facets refined
   * @method
   * @param {string} facet name of the attribute used for facetting
   * @param {value} value value used for filtering
   * @return {string[]}
   */
  getRefinedDisjunctiveFacets: function getRefinedDisjunctiveFacets() {
    // attributes used for numeric filter can also be disjunctive
    var disjunctiveNumericRefinedFacets = intersection(
      keys(this.numericRefinements),
      this.disjunctiveFacets
    );

    return keys(this.disjunctiveFacetsRefinements)
      .concat(disjunctiveNumericRefinedFacets)
      .concat(this.getRefinedHierarchicalFacets());
  },
  /**
   * Returns the list of all disjunctive facets refined
   * @method
   * @param {string} facet name of the attribute used for facetting
   * @param {value} value value used for filtering
   * @return {string[]}
   */
  getRefinedHierarchicalFacets: function getRefinedHierarchicalFacets() {
    return intersection(
      // enforce the order between the two arrays,
      // so that refinement name index === hierarchical facet index
      map(this.hierarchicalFacets, 'name'),
      keys(this.hierarchicalFacetsRefinements)
    );
  },
  /**
   * Returned the list of all disjunctive facets not refined
   * @method
   * @return {string[]}
   */
  getUnrefinedDisjunctiveFacets: function() {
    var refinedFacets = this.getRefinedDisjunctiveFacets();

    return filter(this.disjunctiveFacets, function(f) {
      return indexOf(refinedFacets, f) === -1;
    });
  },

  managedParameters: [
    'index',
    'facets', 'disjunctiveFacets', 'facetsRefinements',
    'facetsExcludes', 'disjunctiveFacetsRefinements',
    'numericRefinements', 'tagRefinements', 'hierarchicalFacets', 'hierarchicalFacetsRefinements'
  ],
  getQueryParams: function getQueryParams() {
    var managedParameters = this.managedParameters;

    var queryParams = {};

    forOwn(this, function(paramValue, paramName) {
      if (indexOf(managedParameters, paramName) === -1 && paramValue !== undefined) {
        queryParams[paramName] = paramValue;
      }
    });

    return queryParams;
  },
  /**
   * Let the user retrieve any parameter value from the SearchParameters
   * @param {string} paramName name of the parameter
   * @return {any} the value of the parameter
   */
  getQueryParameter: function getQueryParameter(paramName) {
    if (!this.hasOwnProperty(paramName)) {
      throw new Error(
        "Parameter '" + paramName + "' is not an attribute of SearchParameters " +
        '(http://algolia.github.io/algoliasearch-helper-js/docs/SearchParameters.html)');
    }

    return this[paramName];
  },
  /**
   * Let the user set a specific value for a given parameter. Will return the
   * same instance if the parameter is invalid or if the value is the same as the
   * previous one.
   * @method
   * @param {string} parameter the parameter name
   * @param {any} value the value to be set, must be compliant with the definition
   * of the attribute on the object
   * @return {SearchParameters} the updated state
   */
  setQueryParameter: function setParameter(parameter, value) {
    if (this[parameter] === value) return this;

    var modification = {};

    modification[parameter] = value;

    return this.setQueryParameters(modification);
  },
  /**
   * Let the user set any of the parameters with a plain object.
   * @method
   * @param {object} params all the keys and the values to be updated
   * @return {SearchParameters} a new updated instance
   */
  setQueryParameters: function setQueryParameters(params) {
    if (!params) return this;

    var error = SearchParameters.validate(this, params);

    if (error) {
      throw error;
    }

    var parsedParams = SearchParameters._parseNumbers(params);

    return this.mutateMe(function mergeWith(newInstance) {
      var ks = keys(params);

      forEach(ks, function(k) {
        newInstance[k] = parsedParams[k];
      });

      return newInstance;
    });
  },

  /**
   * Returns an object with only the selected attributes.
   * @param {string[]} filters filters to retrieve only a subset of the state. It
   * accepts strings that can be either attributes of the SearchParameters (e.g. hitsPerPage)
   * or attributes of the index with the notation 'attribute:nameOfMyAttribute'
   * @return {object}
   */
  filter: function(filters) {
    return filterState(this, filters);
  },
  /**
   * Helper function to make it easier to build new instances from a mutating
   * function
   * @private
   * @param {function} fn newMutableState -> previousState -> () function that will
   * change the value of the newMutable to the desired state
   * @return {SearchParameters} a new instance with the specified modifications applied
   */
  mutateMe: function mutateMe(fn) {
    var newState = new this.constructor(this);

    fn(newState, this);
    return newState;
  },

  /**
   * Helper function to get the hierarchicalFacet separator or the default one (`>`)
   * @param  {object} hierarchicalFacet
   * @return {string} returns the hierarchicalFacet.separator or `>` as default
   */
  _getHierarchicalFacetSortBy: function(hierarchicalFacet) {
    return hierarchicalFacet.sortBy || ['isRefined:desc', 'name:asc'];
  },

  /**
   * Helper function to get the hierarchicalFacet separator or the default one (`>`)
   * @private
   * @param  {object} hierarchicalFacet
   * @return {string} returns the hierarchicalFacet.separator or `>` as default
   */
  _getHierarchicalFacetSeparator: function(hierarchicalFacet) {
    return hierarchicalFacet.separator || ' > ';
  },

  /**
   * Helper function to get the hierarchicalFacet prefix path or null
   * @private
   * @param  {object} hierarchicalFacet
   * @return {string} returns the hierarchicalFacet.rootPath or null as default
   */
  _getHierarchicalRootPath: function(hierarchicalFacet) {
    return hierarchicalFacet.rootPath || null;
  },

  /**
   * Helper function to check if we show the parent level of the hierarchicalFacet
   * @private
   * @param  {object} hierarchicalFacet
   * @return {string} returns the hierarchicalFacet.showParentLevel or true as default
   */
  _getHierarchicalShowParentLevel: function(hierarchicalFacet) {
    if (typeof hierarchicalFacet.showParentLevel === 'boolean') {
      return hierarchicalFacet.showParentLevel;
    }
    return true;
  },

  /**
   * Helper function to get the hierarchicalFacet by it's name
   * @param  {string} hierarchicalFacetName
   * @return {object} a hierarchicalFacet
   */
  getHierarchicalFacetByName: function(hierarchicalFacetName) {
    return find(
      this.hierarchicalFacets,
      {name: hierarchicalFacetName}
    );
  },

  /**
   * Get the current breadcrumb for a hierarchical facet, as an array
   * @param  {string} facetName Hierarchical facet name
   * @return {array.<string>} the path as an array of string
   */
  getHierarchicalFacetBreadcrumb: function(facetName) {
    if (!this.isHierarchicalFacet(facetName)) {
      throw new Error(
        'Cannot get the breadcrumb of an unknown hierarchical facet: `' + facetName + '`');
    }

    var refinement = this.getHierarchicalRefinement(facetName)[0];
    if (!refinement) return [];

    var separator = this._getHierarchicalFacetSeparator(
      this.getHierarchicalFacetByName(facetName)
    );
    var path = refinement.split(separator);
    return map(path, trim);
  }
};

/**
 * Callback used for clearRefinement method
 * @callback SearchParameters.clearCallback
 * @param {OperatorList|FacetList} value the value of the filter
 * @param {string} key the current attribute name
 * @param {string} type `numeric`, `disjunctiveFacet`, `conjunctiveFacet`, `hierarchicalFacet` or `exclude`
 * depending on the type of facet
 * @return {boolean} `true` if the element should be removed. `false` otherwise.
 */
module.exports = SearchParameters;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(62),
    baseLodash = __webpack_require__(92);

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295;

/**
 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
 *
 * @private
 * @constructor
 * @param {*} value The value to wrap.
 */
function LazyWrapper(value) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__dir__ = 1;
  this.__filtered__ = false;
  this.__iteratees__ = [];
  this.__takeCount__ = MAX_ARRAY_LENGTH;
  this.__views__ = [];
}

// Ensure `LazyWrapper` is an instance of `baseLodash`.
LazyWrapper.prototype = baseCreate(baseLodash.prototype);
LazyWrapper.prototype.constructor = LazyWrapper;

module.exports = LazyWrapper;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(3);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(10),
    root = __webpack_require__(3);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),
/* 85 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),
/* 86 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(43);

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(142),
    isArguments = __webpack_require__(25),
    isArray = __webpack_require__(0),
    isBuffer = __webpack_require__(26),
    isIndex = __webpack_require__(31),
    isTypedArray = __webpack_require__(36);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),
/* 89 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(41),
    eq = __webpack_require__(18);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(61),
    isArray = __webpack_require__(0);

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),
/* 92 */
/***/ (function(module, exports) {

/**
 * The function whose prototype chain sequence wrappers inherit from.
 *
 * @private
 */
function baseLodash() {
  // No operation performed.
}

module.exports = baseLodash;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var Uint8Array = __webpack_require__(83);

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var baseSetData = __webpack_require__(140),
    createBind = __webpack_require__(296),
    createCurry = __webpack_require__(297),
    createHybrid = __webpack_require__(150),
    createPartial = __webpack_require__(300),
    getData = __webpack_require__(156),
    mergeData = __webpack_require__(312),
    setData = __webpack_require__(188),
    setWrapToString = __webpack_require__(189),
    toInteger = __webpack_require__(53);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_FLAG = 8,
    WRAP_CURRY_RIGHT_FLAG = 16,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_PARTIAL_RIGHT_FLAG = 64;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags.
 *    1 - `_.bind`
 *    2 - `_.bindKey`
 *    4 - `_.curry` or `_.curryRight` of a bound function
 *    8 - `_.curry`
 *   16 - `_.curryRight`
 *   32 - `_.partial`
 *   64 - `_.partialRight`
 *  128 - `_.rearg`
 *  256 - `_.ary`
 *  512 - `_.flip`
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to be partially applied.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
    partials = holders = undefined;
  }
  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
  arity = arity === undefined ? arity : toInteger(arity);
  length -= holders ? holders.length : 0;

  if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials,
        holdersRight = holders;

    partials = holders = undefined;
  }
  var data = isBindKey ? undefined : getData(func);

  var newData = [
    func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
    argPos, ary, arity
  ];

  if (data) {
    mergeData(newData, data);
  }
  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] === undefined
    ? (isBindKey ? 0 : func.length)
    : nativeMax(newData[9] - length, 0);

  if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
    bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
  }
  if (!bitmask || bitmask == WRAP_BIND_FLAG) {
    var result = createBind(func, bitmask, thisArg);
  } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
    result = createCurry(func, bitmask, arity);
  } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
    result = createPartial(func, bitmask, thisArg, partials);
  } else {
    result = createHybrid.apply(undefined, newData);
  }
  var setter = data ? baseSetData : setData;
  return setWrapToString(setter(result, newData), func, bitmask);
}

module.exports = createWrap;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(91),
    getSymbols = __webpack_require__(71),
    keys = __webpack_require__(9);

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(91),
    getSymbolsIn = __webpack_require__(158),
    keysIn = __webpack_require__(50);

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(21),
    isArguments = __webpack_require__(25),
    isArray = __webpack_require__(0),
    isIndex = __webpack_require__(31),
    isLength = __webpack_require__(47),
    toKey = __webpack_require__(23);

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;


/***/ }),
/* 98 */
/***/ (function(module, exports) {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ }),
/* 99 */
/***/ (function(module, exports) {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(275),
    shortOut = __webpack_require__(190);

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(60),
    assignInWith = __webpack_require__(322),
    baseRest = __webpack_require__(20),
    customDefaultsAssignIn = __webpack_require__(301);

/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaultsDeep
 * @example
 *
 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var defaults = baseRest(function(args) {
  args.push(undefined, customDefaultsAssignIn);
  return apply(assignInWith, undefined, args);
});

module.exports = defaults;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(86),
    baseFilter = __webpack_require__(258),
    baseIteratee = __webpack_require__(13),
    isArray = __webpack_require__(0);

/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * **Note:** Unlike `_.remove`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see _.reject
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * _.filter(users, function(o) { return !o.active; });
 * // => objects for ['fred']
 *
 * // The `_.matches` iteratee shorthand.
 * _.filter(users, { 'age': 36, 'active': true });
 * // => objects for ['barney']
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.filter(users, ['active', false]);
 * // => objects for ['fred']
 *
 * // The `_.property` iteratee shorthand.
 * _.filter(users, 'active');
 * // => objects for ['barney']
 */
function filter(collection, predicate) {
  var func = isArray(collection) ? arrayFilter : baseFilter;
  return func(collection, baseIteratee(predicate, 3));
}

module.exports = filter;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(11),
    isObjectLike = __webpack_require__(7);

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(65);

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var baseMerge = __webpack_require__(267),
    createAssigner = __webpack_require__(149);

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

module.exports = merge;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var baseOrderBy = __webpack_require__(269),
    isArray = __webpack_require__(0);

/**
 * This method is like `_.sortBy` except that it allows specifying the sort
 * orders of the iteratees to sort by. If `orders` is unspecified, all values
 * are sorted in ascending order. Otherwise, specify an order of "desc" for
 * descending or "asc" for ascending sort order of corresponding values.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @param {string[]} [orders] The sort orders of `iteratees`.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 34 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 36 }
 * ];
 *
 * // Sort by `user` in ascending order and by `age` in descending order.
 * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 */
function orderBy(collection, iteratees, orders, guard) {
  if (collection == null) {
    return [];
  }
  if (!isArray(iteratees)) {
    iteratees = iteratees == null ? [] : [iteratees];
  }
  orders = guard ? undefined : orders;
  if (!isArray(orders)) {
    orders = orders == null ? [] : [orders];
  }
  return baseOrderBy(collection, iteratees, orders);
}

module.exports = orderBy;


/***/ }),
/* 107 */
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

exports.arrayToObject = function (source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function (target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            target[source] = true;
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = exports.merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (Object.prototype.hasOwnProperty.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function (str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D || // -
            c === 0x2E || // .
            c === 0x5F || // _
            c === 0x7E || // ~
            (c >= 0x30 && c <= 0x39) || // 0-9
            (c >= 0x41 && c <= 0x5A) || // a-z
            (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)] + hexTable[0x80 | ((c >> 12) & 0x3F)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

exports.compact = function (obj, references) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    var refs = references || [];
    var lookup = refs.indexOf(obj);
    if (lookup !== -1) {
        return refs[lookup];
    }

    refs.push(obj);

    if (Array.isArray(obj)) {
        var compacted = [];

        for (var i = 0; i < obj.length; ++i) {
            if (obj[i] && typeof obj[i] === 'object') {
                compacted.push(exports.compact(obj[i], refs));
            } else if (typeof obj[i] !== 'undefined') {
                compacted.push(obj[i]);
            }
        }

        return compacted;
    }

    var keys = Object.keys(obj);
    keys.forEach(function (key) {
        obj[key] = exports.compact(obj[key], refs);
    });

    return obj;
};

exports.isRegExp = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function (obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};


/***/ }),
/* 109 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 110 */
/***/ (function(module, exports) {


var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};



/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var basePick = __webpack_require__(270),
    flatRest = __webpack_require__(155);

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
var pick = flatRest(function(object, paths) {
  return object == null ? {} : basePick(object, paths);
});

module.exports = pick;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_indexUtils=__webpack_require__(5),_createConnector=__webpack_require__(2),_createConnector2=_interopRequireDefault(_createConnector);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function getId(a){return a.attributeName}var namespace='range';function getCurrentRefinement(a,b,c){return(0,_indexUtils.getCurrentRefinementValue)(a,b,c,namespace+'.'+getId(a),{},function(d){var e=d.min,f=d.max;return'string'==typeof e&&(e=parseInt(e,10)),'string'==typeof f&&(f=parseInt(f,10)),{min:e,max:f}})}function _refine(a,b,c,d){if(!isFinite(c.min)||!isFinite(c.max))throw new Error('You can\'t provide non finite values to the range connector');var e=getId(a),f=_defineProperty({},e,c);return(0,_indexUtils.refineValue)(b,f,d,!0,namespace)}function _cleanUp(a,b,c){return(0,_indexUtils.cleanUpValue)(b,c,namespace+'.'+getId(a))}exports.default=(0,_createConnector2.default)({displayName:'AlgoliaRange',propTypes:{id:_propTypes2.default.string,attributeName:_propTypes2.default.string.isRequired,defaultRefinement:_propTypes2.default.shape({min:_propTypes2.default.number.isRequired,max:_propTypes2.default.number.isRequired}),min:_propTypes2.default.number,max:_propTypes2.default.number},getProvidedProps:function getProvidedProps(a,b,c){var d=a.attributeName,e=a.min,f=a.max,g='undefined'!=typeof e,h='undefined'!=typeof f,i=(0,_indexUtils.getResults)(c,this.context);if(!g||!h){if(!i)return{canRefine:!1};var p=i.getFacetByName(d)?i.getFacetStats(d):null;if(!p)return{canRefine:!1};g||(e=p.min),h||(f=p.max)}var j=i?i.getFacetValues(d).map(function(p){return{value:p.name,count:p.count}}):[],k=getCurrentRefinement(a,b,this.context),l=k.min,m=l===void 0?e:l,n=k.max,o=n===void 0?f:n;return{min:e,max:f,currentRefinement:{min:m,max:o},count:j,canRefine:0<j.length}},refine:function refine(a,b,c){return _refine(a,b,c,this.context)},cleanUp:function cleanUp(a,b){return _cleanUp(a,b,this.context)},getSearchParameters:function getSearchParameters(a,b,c){var d=b.attributeName,e=getCurrentRefinement(b,c,this.context);a=a.addDisjunctiveFacet(d);var f=e.min,g=e.max;return'undefined'!=typeof f&&(a=a.addNumericRefinement(d,'>=',f)),'undefined'!=typeof g&&(a=a.addNumericRefinement(d,'<=',g)),a},getMetadata:function getMetadata(a,b){var c=this,d=getId(a),e=getCurrentRefinement(a,b,this.context),f=void 0,g='undefined'!=typeof e.min,h='undefined'!=typeof e.max;if(g||h){var i='';g&&(i+=e.min+' <= '),i+=a.attributeName,h&&(i+=' <= '+e.max),f={label:i,currentRefinement:e,attributeName:a.attributeName,value:function value(j){return _cleanUp(a,j,c.context)}}}return{id:d,index:(0,_indexUtils.getIndex)(this.context),items:f?[f]:[]}}});

/***/ }),
/* 113 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(239);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(238);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54), __webpack_require__(109)))

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach = __webpack_require__(35);
var compact = __webpack_require__(324);
var indexOf = __webpack_require__(74);
var findIndex = __webpack_require__(198);
var get = __webpack_require__(73);

var sumBy = __webpack_require__(337);
var find = __webpack_require__(46);
var includes = __webpack_require__(327);
var map = __webpack_require__(17);
var orderBy = __webpack_require__(106);

var defaults = __webpack_require__(101);
var merge = __webpack_require__(105);

var isArray = __webpack_require__(0);
var isFunction = __webpack_require__(19);

var partial = __webpack_require__(332);
var partialRight = __webpack_require__(333);

var formatSort = __webpack_require__(116);

var generateHierarchicalTree = __webpack_require__(244);

/**
 * @typedef SearchResults.Facet
 * @type {object}
 * @property {string} name name of the attribute in the record
 * @property {object} data the facetting data: value, number of entries
 * @property {object} stats undefined unless facet_stats is retrieved from algolia
 */

/**
 * @typedef SearchResults.HierarchicalFacet
 * @type {object}
 * @property {string} name name of the current value given the hierarchical level, trimmed.
 * If root node, you get the facet name
 * @property {number} count number of objets matching this hierarchical value
 * @property {string} path the current hierarchical value full path
 * @property {boolean} isRefined `true` if the current value was refined, `false` otherwise
 * @property {HierarchicalFacet[]} data sub values for the current level
 */

/**
 * @typedef SearchResults.FacetValue
 * @type {object}
 * @property {string} value the facet value itself
 * @property {number} count times this facet appears in the results
 * @property {boolean} isRefined is the facet currently selected
 * @property {boolean} isExcluded is the facet currently excluded (only for conjunctive facets)
 */

/**
 * @typedef Refinement
 * @type {object}
 * @property {string} type the type of filter used:
 * `numeric`, `facet`, `exclude`, `disjunctive`, `hierarchical`
 * @property {string} attributeName name of the attribute used for filtering
 * @property {string} name the value of the filter
 * @property {number} numericValue the value as a number. Only for numeric fitlers.
 * @property {string} operator the operator used. Only for numeric filters.
 * @property {number} count the number of computed hits for this filter. Only on facets.
 * @property {boolean} exhaustive if the count is exhaustive
 */

function getIndices(obj) {
  var indices = {};

  forEach(obj, function(val, idx) { indices[val] = idx; });

  return indices;
}

function assignFacetStats(dest, facetStats, key) {
  if (facetStats && facetStats[key]) {
    dest.stats = facetStats[key];
  }
}

function findMatchingHierarchicalFacetFromAttributeName(hierarchicalFacets, hierarchicalAttributeName) {
  return find(
    hierarchicalFacets,
    function facetKeyMatchesAttribute(hierarchicalFacet) {
      return includes(hierarchicalFacet.attributes, hierarchicalAttributeName);
    }
  );
}

/*eslint-disable */
/**
 * Constructor for SearchResults
 * @class
 * @classdesc SearchResults contains the results of a query to Algolia using the
 * {@link AlgoliaSearchHelper}.
 * @param {SearchParameters} state state that led to the response
 * @param {array.<object>} results the results from algolia client
 * @example <caption>SearchResults of the first query in
 * <a href="http://demos.algolia.com/instant-search-demo">the instant search demo</a></caption>
{
   "hitsPerPage": 10,
   "processingTimeMS": 2,
   "facets": [
      {
         "name": "type",
         "data": {
            "HardGood": 6627,
            "BlackTie": 550,
            "Music": 665,
            "Software": 131,
            "Game": 456,
            "Movie": 1571
         },
         "exhaustive": false
      },
      {
         "exhaustive": false,
         "data": {
            "Free shipping": 5507
         },
         "name": "shipping"
      }
  ],
   "hits": [
      {
         "thumbnailImage": "http://img.bbystatic.com/BestBuy_US/images/products/1688/1688832_54x108_s.gif",
         "_highlightResult": {
            "shortDescription": {
               "matchLevel": "none",
               "value": "Safeguard your PC, Mac, Android and iOS devices with comprehensive Internet protection",
               "matchedWords": []
            },
            "category": {
               "matchLevel": "none",
               "value": "Computer Security Software",
               "matchedWords": []
            },
            "manufacturer": {
               "matchedWords": [],
               "value": "Webroot",
               "matchLevel": "none"
            },
            "name": {
               "value": "Webroot SecureAnywhere Internet Security (3-Device) (1-Year Subscription) - Mac/Windows",
               "matchedWords": [],
               "matchLevel": "none"
            }
         },
         "image": "http://img.bbystatic.com/BestBuy_US/images/products/1688/1688832_105x210_sc.jpg",
         "shipping": "Free shipping",
         "bestSellingRank": 4,
         "shortDescription": "Safeguard your PC, Mac, Android and iOS devices with comprehensive Internet protection",
         "url": "http://www.bestbuy.com/site/webroot-secureanywhere-internet-security-3-devi…d=1219060687969&skuId=1688832&cmp=RMX&ky=2d3GfEmNIzjA0vkzveHdZEBgpPCyMnLTJ",
         "name": "Webroot SecureAnywhere Internet Security (3-Device) (1-Year Subscription) - Mac/Windows",
         "category": "Computer Security Software",
         "salePrice_range": "1 - 50",
         "objectID": "1688832",
         "type": "Software",
         "customerReviewCount": 5980,
         "salePrice": 49.99,
         "manufacturer": "Webroot"
      },
      ....
  ],
   "nbHits": 10000,
   "disjunctiveFacets": [
      {
         "exhaustive": false,
         "data": {
            "5": 183,
            "12": 112,
            "7": 149,
            ...
         },
         "name": "customerReviewCount",
         "stats": {
            "max": 7461,
            "avg": 157.939,
            "min": 1
         }
      },
      {
         "data": {
            "Printer Ink": 142,
            "Wireless Speakers": 60,
            "Point & Shoot Cameras": 48,
            ...
         },
         "name": "category",
         "exhaustive": false
      },
      {
         "exhaustive": false,
         "data": {
            "> 5000": 2,
            "1 - 50": 6524,
            "501 - 2000": 566,
            "201 - 500": 1501,
            "101 - 200": 1360,
            "2001 - 5000": 47
         },
         "name": "salePrice_range"
      },
      {
         "data": {
            "Dynex™": 202,
            "Insignia™": 230,
            "PNY": 72,
            ...
         },
         "name": "manufacturer",
         "exhaustive": false
      }
  ],
   "query": "",
   "nbPages": 100,
   "page": 0,
   "index": "bestbuy"
}
 **/
/*eslint-enable */
function SearchResults(state, results) {
  var mainSubResponse = results[0];

  this._rawResults = results;

  /**
   * query used to generate the results
   * @member {string}
   */
  this.query = mainSubResponse.query;
  /**
   * The query as parsed by the engine given all the rules.
   * @member {string}
   */
  this.parsedQuery = mainSubResponse.parsedQuery;
  /**
   * all the records that match the search parameters. Each record is
   * augmented with a new attribute `_highlightResult`
   * which is an object keyed by attribute and with the following properties:
   *  - `value` : the value of the facet highlighted (html)
   *  - `matchLevel`: full, partial or none depending on how the query terms match
   * @member {object[]}
   */
  this.hits = mainSubResponse.hits;
  /**
   * index where the results come from
   * @member {string}
   */
  this.index = mainSubResponse.index;
  /**
   * number of hits per page requested
   * @member {number}
   */
  this.hitsPerPage = mainSubResponse.hitsPerPage;
  /**
   * total number of hits of this query on the index
   * @member {number}
   */
  this.nbHits = mainSubResponse.nbHits;
  /**
   * total number of pages with respect to the number of hits per page and the total number of hits
   * @member {number}
   */
  this.nbPages = mainSubResponse.nbPages;
  /**
   * current page
   * @member {number}
   */
  this.page = mainSubResponse.page;
  /**
   * sum of the processing time of all the queries
   * @member {number}
   */
  this.processingTimeMS = sumBy(results, 'processingTimeMS');
  /**
   * The position if the position was guessed by IP.
   * @member {string}
   * @example "48.8637,2.3615",
   */
  this.aroundLatLng = mainSubResponse.aroundLatLng;
  /**
   * The radius computed by Algolia.
   * @member {string}
   * @example "126792922",
   */
  this.automaticRadius = mainSubResponse.automaticRadius;
  /**
   * String identifying the server used to serve this request.
   * @member {string}
   * @example "c7-use-2.algolia.net",
   */
  this.serverUsed = mainSubResponse.serverUsed;
  /**
   * Boolean that indicates if the computation of the counts did time out.
   * @member {boolean}
   */
  this.timeoutCounts = mainSubResponse.timeoutCounts;
  /**
   * Boolean that indicates if the computation of the hits did time out.
   * @member {boolean}
   */
  this.timeoutHits = mainSubResponse.timeoutHits;

  /**
   * disjunctive facets results
   * @member {SearchResults.Facet[]}
   */
  this.disjunctiveFacets = [];
  /**
   * disjunctive facets results
   * @member {SearchResults.HierarchicalFacet[]}
   */
  this.hierarchicalFacets = map(state.hierarchicalFacets, function initFutureTree() {
    return [];
  });
  /**
   * other facets results
   * @member {SearchResults.Facet[]}
   */
  this.facets = [];

  var disjunctiveFacets = state.getRefinedDisjunctiveFacets();

  var facetsIndices = getIndices(state.facets);
  var disjunctiveFacetsIndices = getIndices(state.disjunctiveFacets);
  var nextDisjunctiveResult = 1;

  var self = this;
  // Since we send request only for disjunctive facets that have been refined,
  // we get the facets informations from the first, general, response.
  forEach(mainSubResponse.facets, function(facetValueObject, facetKey) {
    var hierarchicalFacet = findMatchingHierarchicalFacetFromAttributeName(
      state.hierarchicalFacets,
      facetKey
    );

    if (hierarchicalFacet) {
      // Place the hierarchicalFacet data at the correct index depending on
      // the attributes order that was defined at the helper initialization
      var facetIndex = hierarchicalFacet.attributes.indexOf(facetKey);
      var idxAttributeName = findIndex(state.hierarchicalFacets, {name: hierarchicalFacet.name});
      self.hierarchicalFacets[idxAttributeName][facetIndex] = {
        attribute: facetKey,
        data: facetValueObject,
        exhaustive: mainSubResponse.exhaustiveFacetsCount
      };
    } else {
      var isFacetDisjunctive = indexOf(state.disjunctiveFacets, facetKey) !== -1;
      var isFacetConjunctive = indexOf(state.facets, facetKey) !== -1;
      var position;

      if (isFacetDisjunctive) {
        position = disjunctiveFacetsIndices[facetKey];
        self.disjunctiveFacets[position] = {
          name: facetKey,
          data: facetValueObject,
          exhaustive: mainSubResponse.exhaustiveFacetsCount
        };
        assignFacetStats(self.disjunctiveFacets[position], mainSubResponse.facets_stats, facetKey);
      }
      if (isFacetConjunctive) {
        position = facetsIndices[facetKey];
        self.facets[position] = {
          name: facetKey,
          data: facetValueObject,
          exhaustive: mainSubResponse.exhaustiveFacetsCount
        };
        assignFacetStats(self.facets[position], mainSubResponse.facets_stats, facetKey);
      }
    }
  });

  // Make sure we do not keep holes within the hierarchical facets
  this.hierarchicalFacets = compact(this.hierarchicalFacets);

  // aggregate the refined disjunctive facets
  forEach(disjunctiveFacets, function(disjunctiveFacet) {
    var result = results[nextDisjunctiveResult];
    var hierarchicalFacet = state.getHierarchicalFacetByName(disjunctiveFacet);

    // There should be only item in facets.
    forEach(result.facets, function(facetResults, dfacet) {
      var position;

      if (hierarchicalFacet) {
        position = findIndex(state.hierarchicalFacets, {name: hierarchicalFacet.name});
        var attributeIndex = findIndex(self.hierarchicalFacets[position], {attribute: dfacet});

        // previous refinements and no results so not able to find it
        if (attributeIndex === -1) {
          return;
        }

        self.hierarchicalFacets[position][attributeIndex].data = merge(
          {},
          self.hierarchicalFacets[position][attributeIndex].data,
          facetResults
        );
      } else {
        position = disjunctiveFacetsIndices[dfacet];

        var dataFromMainRequest = mainSubResponse.facets && mainSubResponse.facets[dfacet] || {};

        self.disjunctiveFacets[position] = {
          name: dfacet,
          data: defaults({}, facetResults, dataFromMainRequest),
          exhaustive: result.exhaustiveFacetsCount
        };
        assignFacetStats(self.disjunctiveFacets[position], result.facets_stats, dfacet);

        if (state.disjunctiveFacetsRefinements[dfacet]) {
          forEach(state.disjunctiveFacetsRefinements[dfacet], function(refinementValue) {
            // add the disjunctive refinements if it is no more retrieved
            if (!self.disjunctiveFacets[position].data[refinementValue] &&
              indexOf(state.disjunctiveFacetsRefinements[dfacet], refinementValue) > -1) {
              self.disjunctiveFacets[position].data[refinementValue] = 0;
            }
          });
        }
      }
    });
    nextDisjunctiveResult++;
  });

  // if we have some root level values for hierarchical facets, merge them
  forEach(state.getRefinedHierarchicalFacets(), function(refinedFacet) {
    var hierarchicalFacet = state.getHierarchicalFacetByName(refinedFacet);
    var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);

    var currentRefinement = state.getHierarchicalRefinement(refinedFacet);
    // if we are already at a root refinement (or no refinement at all), there is no
    // root level values request
    if (currentRefinement.length === 0 || currentRefinement[0].split(separator).length < 2) {
      return;
    }

    var result = results[nextDisjunctiveResult];

    forEach(result.facets, function(facetResults, dfacet) {
      var position = findIndex(state.hierarchicalFacets, {name: hierarchicalFacet.name});
      var attributeIndex = findIndex(self.hierarchicalFacets[position], {attribute: dfacet});

      // previous refinements and no results so not able to find it
      if (attributeIndex === -1) {
        return;
      }

      // when we always get root levels, if the hits refinement is `beers > IPA` (count: 5),
      // then the disjunctive values will be `beers` (count: 100),
      // but we do not want to display
      //   | beers (100)
      //     > IPA (5)
      // We want
      //   | beers (5)
      //     > IPA (5)
      var defaultData = {};

      if (currentRefinement.length > 0) {
        var root = currentRefinement[0].split(separator)[0];
        defaultData[root] = self.hierarchicalFacets[position][attributeIndex].data[root];
      }

      self.hierarchicalFacets[position][attributeIndex].data = defaults(
        defaultData,
        facetResults,
        self.hierarchicalFacets[position][attributeIndex].data
      );
    });

    nextDisjunctiveResult++;
  });

  // add the excludes
  forEach(state.facetsExcludes, function(excludes, facetName) {
    var position = facetsIndices[facetName];

    self.facets[position] = {
      name: facetName,
      data: mainSubResponse.facets[facetName],
      exhaustive: mainSubResponse.exhaustiveFacetsCount
    };
    forEach(excludes, function(facetValue) {
      self.facets[position] = self.facets[position] || {name: facetName};
      self.facets[position].data = self.facets[position].data || {};
      self.facets[position].data[facetValue] = 0;
    });
  });

  this.hierarchicalFacets = map(this.hierarchicalFacets, generateHierarchicalTree(state));

  this.facets = compact(this.facets);
  this.disjunctiveFacets = compact(this.disjunctiveFacets);

  this._state = state;
}

/**
 * Get a facet object with its name
 * @deprecated
 * @param {string} name name of the attribute facetted
 * @return {SearchResults.Facet} the facet object
 */
SearchResults.prototype.getFacetByName = function(name) {
  var predicate = {name: name};

  return find(this.facets, predicate) ||
    find(this.disjunctiveFacets, predicate) ||
    find(this.hierarchicalFacets, predicate);
};

/**
 * Get the facet values of a specified attribute from a SearchResults object.
 * @private
 * @param {SearchResults} results the search results to search in
 * @param {string} attribute name of the facetted attribute to search for
 * @return {array|object} facet values. For the hierarchical facets it is an object.
 */
function extractNormalizedFacetValues(results, attribute) {
  var predicate = {name: attribute};
  if (results._state.isConjunctiveFacet(attribute)) {
    var facet = find(results.facets, predicate);
    if (!facet) return [];

    return map(facet.data, function(v, k) {
      return {
        name: k,
        count: v,
        isRefined: results._state.isFacetRefined(attribute, k),
        isExcluded: results._state.isExcludeRefined(attribute, k)
      };
    });
  } else if (results._state.isDisjunctiveFacet(attribute)) {
    var disjunctiveFacet = find(results.disjunctiveFacets, predicate);
    if (!disjunctiveFacet) return [];

    return map(disjunctiveFacet.data, function(v, k) {
      return {
        name: k,
        count: v,
        isRefined: results._state.isDisjunctiveFacetRefined(attribute, k)
      };
    });
  } else if (results._state.isHierarchicalFacet(attribute)) {
    return find(results.hierarchicalFacets, predicate);
  }
}

/**
 * Sort nodes of a hierarchical facet results
 * @private
 * @param {HierarchicalFacet} node node to upon which we want to apply the sort
 */
function recSort(sortFn, node) {
  if (!node.data || node.data.length === 0) {
    return node;
  }
  var children = map(node.data, partial(recSort, sortFn));
  var sortedChildren = sortFn(children);
  var newNode = merge({}, node, {data: sortedChildren});
  return newNode;
}

SearchResults.DEFAULT_SORT = ['isRefined:desc', 'count:desc', 'name:asc'];

function vanillaSortFn(order, data) {
  return data.sort(order);
}

/**
 * Get a the list of values for a given facet attribute. Those values are sorted
 * refinement first, descending count (bigger value on top), and name ascending
 * (alphabetical order). The sort formula can overridden using either string based
 * predicates or a function.
 *
 * This method will return all the values returned by the Algolia engine plus all
 * the values already refined. This means that it can happen that the
 * `maxValuesPerFacet` [configuration](https://www.algolia.com/doc/rest-api/search#param-maxValuesPerFacet)
 * might not be respected if you have facet values that are already refined.
 * @param {string} attribute attribute name
 * @param {object} opts configuration options.
 * @param {Array.<string> | function} opts.sortBy
 * When using strings, it consists of
 * the name of the [FacetValue](#SearchResults.FacetValue) or the
 * [HierarchicalFacet](#SearchResults.HierarchicalFacet) attributes with the
 * order (`asc` or `desc`). For example to order the value by count, the
 * argument would be `['count:asc']`.
 *
 * If only the attribute name is specified, the ordering defaults to the one
 * specified in the default value for this attribute.
 *
 * When not specified, the order is
 * ascending.  This parameter can also be a function which takes two facet
 * values and should return a number, 0 if equal, 1 if the first argument is
 * bigger or -1 otherwise.
 *
 * The default value for this attribute `['isRefined:desc', 'count:desc', 'name:asc']`
 * @return {FacetValue[]|HierarchicalFacet} depending on the type of facet of
 * the attribute requested (hierarchical, disjunctive or conjunctive)
 * @example
 * helper.on('results', function(content){
 *   //get values ordered only by name ascending using the string predicate
 *   content.getFacetValues('city', {sortBy: ['name:asc']);
 *   //get values  ordered only by count ascending using a function
 *   content.getFacetValues('city', {
 *     // this is equivalent to ['count:asc']
 *     sortBy: function(a, b) {
 *       if (a.count === b.count) return 0;
 *       if (a.count > b.count)   return 1;
 *       if (b.count > a.count)   return -1;
 *     }
 *   });
 * });
 */
SearchResults.prototype.getFacetValues = function(attribute, opts) {
  var facetValues = extractNormalizedFacetValues(this, attribute);
  if (!facetValues) throw new Error(attribute + ' is not a retrieved facet.');

  var options = defaults({}, opts, {sortBy: SearchResults.DEFAULT_SORT});

  if (isArray(options.sortBy)) {
    var order = formatSort(options.sortBy, SearchResults.DEFAULT_SORT);
    if (isArray(facetValues)) {
      return orderBy(facetValues, order[0], order[1]);
    }
    // If facetValues is not an array, it's an object thus a hierarchical facet object
    return recSort(partialRight(orderBy, order[0], order[1]), facetValues);
  } else if (isFunction(options.sortBy)) {
    if (isArray(facetValues)) {
      return facetValues.sort(options.sortBy);
    }
    // If facetValues is not an array, it's an object thus a hierarchical facet object
    return recSort(partial(vanillaSortFn, options.sortBy), facetValues);
  }
  throw new Error(
    'options.sortBy is optional but if defined it must be ' +
    'either an array of string (predicates) or a sorting function'
  );
};

/**
 * Returns the facet stats if attribute is defined and the facet contains some.
 * Otherwise returns undefined.
 * @param {string} attribute name of the facetted attribute
 * @return {object} The stats of the facet
 */
SearchResults.prototype.getFacetStats = function(attribute) {
  if (this._state.isConjunctiveFacet(attribute)) {
    return getFacetStatsIfAvailable(this.facets, attribute);
  } else if (this._state.isDisjunctiveFacet(attribute)) {
    return getFacetStatsIfAvailable(this.disjunctiveFacets, attribute);
  }

  throw new Error(attribute + ' is not present in `facets` or `disjunctiveFacets`');
};

function getFacetStatsIfAvailable(facetList, facetName) {
  var data = find(facetList, {name: facetName});
  return data && data.stats;
}

/**
 * Returns all refinements for all filters + tags. It also provides
 * additional information: count and exhausistivity for each filter.
 *
 * See the [refinement type](#Refinement) for an exhaustive view of the available
 * data.
 *
 * @return {Array.<Refinement>} all the refinements
 */
SearchResults.prototype.getRefinements = function() {
  var state = this._state;
  var results = this;
  var res = [];

  forEach(state.facetsRefinements, function(refinements, attributeName) {
    forEach(refinements, function(name) {
      res.push(getRefinement(state, 'facet', attributeName, name, results.facets));
    });
  });

  forEach(state.facetsExcludes, function(refinements, attributeName) {
    forEach(refinements, function(name) {
      res.push(getRefinement(state, 'exclude', attributeName, name, results.facets));
    });
  });

  forEach(state.disjunctiveFacetsRefinements, function(refinements, attributeName) {
    forEach(refinements, function(name) {
      res.push(getRefinement(state, 'disjunctive', attributeName, name, results.disjunctiveFacets));
    });
  });

  forEach(state.hierarchicalFacetsRefinements, function(refinements, attributeName) {
    forEach(refinements, function(name) {
      res.push(getHierarchicalRefinement(state, attributeName, name, results.hierarchicalFacets));
    });
  });

  forEach(state.numericRefinements, function(operators, attributeName) {
    forEach(operators, function(values, operator) {
      forEach(values, function(value) {
        res.push({
          type: 'numeric',
          attributeName: attributeName,
          name: value,
          numericValue: value,
          operator: operator
        });
      });
    });
  });

  forEach(state.tagRefinements, function(name) {
    res.push({type: 'tag', attributeName: '_tags', name: name});
  });

  return res;
};

function getRefinement(state, type, attributeName, name, resultsFacets) {
  var facet = find(resultsFacets, {name: attributeName});
  var count = get(facet, 'data[' + name + ']');
  var exhaustive = get(facet, 'exhaustive');
  return {
    type: type,
    attributeName: attributeName,
    name: name,
    count: count || 0,
    exhaustive: exhaustive || false
  };
}

function getHierarchicalRefinement(state, attributeName, name, resultsFacets) {
  var facet = find(resultsFacets, {name: attributeName});
  var facetDeclaration = state.getHierarchicalFacetByName(attributeName);
  var splitted = name.split(facetDeclaration.separator);
  var configuredName = splitted[splitted.length - 1];
  for (var i = 0; facet !== undefined && i < splitted.length; ++i) {
    facet = find(facet.data, {name: splitted[i]});
  }
  var count = get(facet, 'count');
  var exhaustive = get(facet, 'exhaustive');
  return {
    type: 'hierarchical',
    attributeName: attributeName,
    name: configuredName,
    count: count || 0,
    exhaustive: exhaustive || false
  };
}

module.exports = SearchResults;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var reduce = __webpack_require__(52);
var find = __webpack_require__(46);
var startsWith = __webpack_require__(336);

/**
 * Transform sort format from user friendly notation to lodash format
 * @param {string[]} sortBy array of predicate of the form "attribute:order"
 * @return {array.<string[]>} array containing 2 elements : attributes, orders
 */
module.exports = function formatSort(sortBy, defaults) {
  return reduce(sortBy, function preparePredicate(out, sortInstruction) {
    var sortInstructions = sortInstruction.split(':');
    if (defaults && sortInstructions.length === 1) {
      var similarDefault = find(defaults, function(predicate) {
        return startsWith(predicate, sortInstruction[0]);
      });
      if (similarDefault) {
        sortInstructions = similarDefault.split(':');
      }
    }
    out[0].push(sortInstructions[0]);
    out[1].push(sortInstructions[1]);
    return out;
  }, [[], []]);
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module containing the functions to serialize and deserialize
 * {SearchParameters} in the query string format
 * @module algoliasearchHelper.url
 */

var shortener = __webpack_require__(243);
var SearchParameters = __webpack_require__(81);

var qs = __webpack_require__(342);

var bind = __webpack_require__(323);
var forEach = __webpack_require__(35);
var pick = __webpack_require__(111);
var map = __webpack_require__(17);
var mapKeys = __webpack_require__(329);
var mapValues = __webpack_require__(330);
var isString = __webpack_require__(49);
var isPlainObject = __webpack_require__(48);
var isArray = __webpack_require__(0);
var invert = __webpack_require__(201);

var encode = __webpack_require__(108).encode;

function recursiveEncode(input) {
  if (isPlainObject(input)) {
    return mapValues(input, recursiveEncode);
  }
  if (isArray(input)) {
    return map(input, recursiveEncode);
  }
  if (isString(input)) {
    return encode(input);
  }
  return input;
}

var refinementsParameters = ['dFR', 'fR', 'nR', 'hFR', 'tR'];
var stateKeys = shortener.ENCODED_PARAMETERS;
function sortQueryStringValues(prefixRegexp, invertedMapping, a, b) {
  if (prefixRegexp !== null) {
    a = a.replace(prefixRegexp, '');
    b = b.replace(prefixRegexp, '');
  }

  a = invertedMapping[a] || a;
  b = invertedMapping[b] || b;

  if (stateKeys.indexOf(a) !== -1 || stateKeys.indexOf(b) !== -1) {
    if (a === 'q') return -1;
    if (b === 'q') return 1;

    var isARefinements = refinementsParameters.indexOf(a) !== -1;
    var isBRefinements = refinementsParameters.indexOf(b) !== -1;
    if (isARefinements && !isBRefinements) {
      return 1;
    } else if (isBRefinements && !isARefinements) {
      return -1;
    }
  }

  return a.localeCompare(b);
}

/**
 * Read a query string and return an object containing the state
 * @param {string} queryString the query string that will be decoded
 * @param {object} [options] accepted options :
 *   - prefix : the prefix used for the saved attributes, you have to provide the
 *     same that was used for serialization
 *   - mapping : map short attributes to another value e.g. {q: 'query'}
 * @return {object} partial search parameters object (same properties than in the
 * SearchParameters but not exhaustive)
 */
exports.getStateFromQueryString = function(queryString, options) {
  var prefixForParameters = options && options.prefix || '';
  var mapping = options && options.mapping || {};
  var invertedMapping = invert(mapping);

  var partialStateWithPrefix = qs.parse(queryString);
  var prefixRegexp = new RegExp('^' + prefixForParameters);
  var partialState = mapKeys(
    partialStateWithPrefix,
    function(v, k) {
      var hasPrefix = prefixForParameters && prefixRegexp.test(k);
      var unprefixedKey = hasPrefix ? k.replace(prefixRegexp, '') : k;
      var decodedKey = shortener.decode(invertedMapping[unprefixedKey] || unprefixedKey);
      return decodedKey || unprefixedKey;
    }
  );

  var partialStateWithParsedNumbers = SearchParameters._parseNumbers(partialState);

  return pick(partialStateWithParsedNumbers, SearchParameters.PARAMETERS);
};

/**
 * Retrieve an object of all the properties that are not understandable as helper
 * parameters.
 * @param {string} queryString the query string to read
 * @param {object} [options] the options
 *   - prefixForParameters : prefix used for the helper configuration keys
 *   - mapping : map short attributes to another value e.g. {q: 'query'}
 * @return {object} the object containing the parsed configuration that doesn't
 * to the helper
 */
exports.getUnrecognizedParametersInQueryString = function(queryString, options) {
  var prefixForParameters = options && options.prefix;
  var mapping = options && options.mapping || {};
  var invertedMapping = invert(mapping);

  var foreignConfig = {};
  var config = qs.parse(queryString);
  if (prefixForParameters) {
    var prefixRegexp = new RegExp('^' + prefixForParameters);
    forEach(config, function(v, key) {
      if (!prefixRegexp.test(key)) foreignConfig[key] = v;
    });
  } else {
    forEach(config, function(v, key) {
      if (!shortener.decode(invertedMapping[key] || key)) foreignConfig[key] = v;
    });
  }

  return foreignConfig;
};

/**
 * Generate a query string for the state passed according to the options
 * @param {SearchParameters} state state to serialize
 * @param {object} [options] May contain the following parameters :
 *  - prefix : prefix in front of the keys
 *  - mapping : map short attributes to another value e.g. {q: 'query'}
 *  - moreAttributes : more values to be added in the query string. Those values
 *    won't be prefixed.
 *  - safe : get safe urls for use in emails, chat apps or any application auto linking urls.
 *  All parameters and values will be encoded in a way that it's safe to share them.
 *  Default to false for legacy reasons ()
 * @return {string} the query string
 */
exports.getQueryStringFromState = function(state, options) {
  var moreAttributes = options && options.moreAttributes;
  var prefixForParameters = options && options.prefix || '';
  var mapping = options && options.mapping || {};
  var safe = options && options.safe || false;
  var invertedMapping = invert(mapping);

  var stateForUrl = safe ? state : recursiveEncode(state);

  var encodedState = mapKeys(
    stateForUrl,
    function(v, k) {
      var shortK = shortener.encode(k);
      return prefixForParameters + (mapping[shortK] || shortK);
    }
  );

  var prefixRegexp = prefixForParameters === '' ? null : new RegExp('^' + prefixForParameters);
  var sort = bind(sortQueryStringValues, null, prefixRegexp, invertedMapping);
  if (moreAttributes) {
    var stateQs = qs.stringify(encodedState, {encode: safe, sort: sort});
    var moreQs = qs.stringify(moreAttributes, {encode: safe});
    if (!stateQs) return moreQs;
    return stateQs + '&' + moreQs;
  }

  return qs.stringify(encodedState, {encode: safe, sort: sort});
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = '2.19.0';


/***/ }),
/* 119 */
/***/ (function(module, exports) {

module.exports = function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
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

module.exports = emptyFunction;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
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

if (false) {
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

module.exports = invariant;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(10),
    root = __webpack_require__(3);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(160),
    hashDelete = __webpack_require__(161),
    hashGet = __webpack_require__(162),
    hashHas = __webpack_require__(163),
    hashSet = __webpack_require__(164);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(62),
    baseLodash = __webpack_require__(92);

/**
 * The base constructor for creating `lodash` wrapper objects.
 *
 * @private
 * @param {*} value The value to wrap.
 * @param {boolean} [chainAll] Enable explicit method chain sequences.
 */
function LodashWrapper(value, chainAll) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__chain__ = !!chainAll;
  this.__index__ = 0;
  this.__values__ = undefined;
}

LodashWrapper.prototype = baseCreate(baseLodash.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;

module.exports = LodashWrapper;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(10),
    root = __webpack_require__(3);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(10),
    root = __webpack_require__(3);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),
/* 127 */
/***/ (function(module, exports) {

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;


/***/ }),
/* 128 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(41),
    eq = __webpack_require__(18);

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignMergeValue;


/***/ }),
/* 130 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(61),
    isFlattenable = __webpack_require__(310);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var createBaseFor = __webpack_require__(295);

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ }),
/* 133 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  return object != null && hasOwnProperty.call(object, key);
}

module.exports = baseHas;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(8),
    isObjectLike = __webpack_require__(7);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(40),
    equalArrays = __webpack_require__(77),
    equalByTag = __webpack_require__(153),
    equalObjects = __webpack_require__(154),
    getTag = __webpack_require__(56),
    isArray = __webpack_require__(0),
    isBuffer = __webpack_require__(26),
    isTypedArray = __webpack_require__(36);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(19),
    isMasked = __webpack_require__(167),
    isObject = __webpack_require__(6),
    toSource = __webpack_require__(80);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(8),
    isLength = __webpack_require__(47),
    isObjectLike = __webpack_require__(7);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var baseEach = __webpack_require__(63),
    isArrayLike = __webpack_require__(11);

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

module.exports = baseMap;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(64),
    baseSet = __webpack_require__(274),
    castPath = __webpack_require__(21);

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths, predicate) {
  var index = -1,
      length = paths.length,
      result = {};

  while (++index < length) {
    var path = paths[index],
        value = baseGet(object, path);

    if (predicate(value, path)) {
      baseSet(result, castPath(path, object), value);
    }
  }
  return result;
}

module.exports = basePickBy;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(24),
    metaMap = __webpack_require__(181);

/**
 * The base implementation of `setData` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var baseSetData = !metaMap ? identity : function(func, data) {
  metaMap.set(func, data);
  return func;
};

module.exports = baseSetData;


/***/ }),
/* 141 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;


/***/ }),
/* 142 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(24);

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function castFunction(value) {
  return typeof value == 'function' ? value : identity;
}

module.exports = castFunction;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(3);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(55)(module)))

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(93);

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),
/* 146 */
/***/ (function(module, exports) {

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgs(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersLength = holders.length,
      leftIndex = -1,
      leftLength = partials.length,
      rangeLength = nativeMax(argsLength - holdersLength, 0),
      result = Array(leftLength + rangeLength),
      isUncurried = !isCurried;

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }
  while (++argsIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[holders[argsIndex]] = args[argsIndex];
    }
  }
  while (rangeLength--) {
    result[leftIndex++] = args[argsIndex++];
  }
  return result;
}

module.exports = composeArgs;


/***/ }),
/* 147 */
/***/ (function(module, exports) {

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `_.partialRight`.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgsRight(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersIndex = -1,
      holdersLength = holders.length,
      rightIndex = -1,
      rightLength = partials.length,
      rangeLength = nativeMax(argsLength - holdersLength, 0),
      result = Array(rangeLength + rightLength),
      isUncurried = !isCurried;

  while (++argsIndex < rangeLength) {
    result[argsIndex] = args[argsIndex];
  }
  var offset = argsIndex;
  while (++rightIndex < rightLength) {
    result[offset + rightIndex] = partials[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[offset + holders[holdersIndex]] = args[argsIndex++];
    }
  }
  return result;
}

module.exports = composeArgsRight;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(3);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(20),
    isIterateeCall = __webpack_require__(217);

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var composeArgs = __webpack_require__(146),
    composeArgsRight = __webpack_require__(147),
    countHolders = __webpack_require__(293),
    createCtor = __webpack_require__(69),
    createRecurry = __webpack_require__(151),
    getHolder = __webpack_require__(45),
    reorder = __webpack_require__(316),
    replaceHolders = __webpack_require__(34),
    root = __webpack_require__(3);

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_FLAG = 8,
    WRAP_CURRY_RIGHT_FLAG = 16,
    WRAP_ARY_FLAG = 128,
    WRAP_FLIP_FLAG = 512;

/**
 * Creates a function that wraps `func` to invoke it with optional `this`
 * binding of `thisArg`, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided
 *  to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & WRAP_ARY_FLAG,
      isBind = bitmask & WRAP_BIND_FLAG,
      isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
      isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
      isFlip = bitmask & WRAP_FLIP_FLAG,
      Ctor = isBindKey ? undefined : createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length;

    while (index--) {
      args[index] = arguments[index];
    }
    if (isCurried) {
      var placeholder = getHolder(wrapper),
          holdersCount = countHolders(args, placeholder);
    }
    if (partials) {
      args = composeArgs(args, partials, holders, isCurried);
    }
    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
    }
    length -= holdersCount;
    if (isCurried && length < arity) {
      var newHolders = replaceHolders(args, placeholder);
      return createRecurry(
        func, bitmask, createHybrid, wrapper.placeholder, thisArg,
        args, newHolders, argPos, ary, arity - length
      );
    }
    var thisBinding = isBind ? thisArg : this,
        fn = isBindKey ? thisBinding[func] : func;

    length = args.length;
    if (argPos) {
      args = reorder(args, argPos);
    } else if (isFlip && length > 1) {
      args.reverse();
    }
    if (isAry && ary < length) {
      args.length = ary;
    }
    if (this && this !== root && this instanceof wrapper) {
      fn = Ctor || createCtor(fn);
    }
    return fn.apply(thisBinding, args);
  }
  return wrapper;
}

module.exports = createHybrid;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var isLaziable = __webpack_require__(311),
    setData = __webpack_require__(188),
    setWrapToString = __webpack_require__(189);

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_BOUND_FLAG = 4,
    WRAP_CURRY_FLAG = 8,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_PARTIAL_RIGHT_FLAG = 64;

/**
 * Creates a function that wraps `func` to continue currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {Function} wrapFunc The function to create the `func` wrapper.
 * @param {*} placeholder The placeholder value.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
  var isCurry = bitmask & WRAP_CURRY_FLAG,
      newHolders = isCurry ? holders : undefined,
      newHoldersRight = isCurry ? undefined : holders,
      newPartials = isCurry ? partials : undefined,
      newPartialsRight = isCurry ? undefined : partials;

  bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
  bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

  if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
    bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
  }
  var newData = [
    func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
    newHoldersRight, argPos, ary, arity
  ];

  var result = wrapFunc.apply(undefined, newData);
  if (isLaziable(func)) {
    setData(result, newData);
  }
  result.placeholder = placeholder;
  return setWrapToString(result, func, bitmask);
}

module.exports = createRecurry;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(10);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(15),
    Uint8Array = __webpack_require__(83),
    eq = __webpack_require__(18),
    equalArrays = __webpack_require__(77),
    mapToArray = __webpack_require__(98),
    setToArray = __webpack_require__(99);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var getAllKeys = __webpack_require__(95);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var flatten = __webpack_require__(199),
    overRest = __webpack_require__(185),
    setToString = __webpack_require__(100);

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

module.exports = flatRest;


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var metaMap = __webpack_require__(181),
    noop = __webpack_require__(331);

/**
 * Gets metadata for `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {*} Returns the metadata for `func`.
 */
var getData = !metaMap ? noop : function(func) {
  return metaMap.get(func);
};

module.exports = getData;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(15);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(61),
    getPrototype = __webpack_require__(70),
    getSymbols = __webpack_require__(71),
    stubArray = __webpack_require__(107);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;


/***/ }),
/* 159 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(32);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),
/* 161 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(32);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(32);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(32);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(62),
    getPrototype = __webpack_require__(70),
    isPrototype = __webpack_require__(37);

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),
/* 166 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(148);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;


/***/ }),
/* 169 */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(29);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(29);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(29);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(29);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(123),
    ListCache = __webpack_require__(28),
    Map = __webpack_require__(38);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(30);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(30);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(30);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(30);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),
/* 179 */
/***/ (function(module, exports) {

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

module.exports = matchesStrictComparable;


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

var memoize = __webpack_require__(205);

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var WeakMap = __webpack_require__(84);

/** Used to store function metadata. */
var metaMap = WeakMap && new WeakMap;

module.exports = metaMap;


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(79);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(78);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(55)(module)))

/***/ }),
/* 184 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(60);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),
/* 186 */
/***/ (function(module, exports) {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ }),
/* 187 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var baseSetData = __webpack_require__(140),
    shortOut = __webpack_require__(190);

/**
 * Sets metadata for `func`.
 *
 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
 * period of time, it will trip its breaker and transition to an identity
 * function to avoid garbage collection pauses in V8. See
 * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
 * for more details.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var setData = shortOut(baseSetData);

module.exports = setData;


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

var getWrapDetails = __webpack_require__(305),
    insertWrapDetails = __webpack_require__(309),
    setToString = __webpack_require__(100),
    updateWrapDetails = __webpack_require__(320);

/**
 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
 * with wrapper details in a comment at the top of the source body.
 *
 * @private
 * @param {Function} wrapper The function to modify.
 * @param {Function} reference The reference function.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Function} Returns `wrapper`.
 */
function setWrapToString(wrapper, reference, bitmask) {
  var source = (reference + '');
  return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
}

module.exports = setWrapToString;


/***/ }),
/* 190 */
/***/ (function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(28);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),
/* 192 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),
/* 193 */
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),
/* 194 */
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(28),
    Map = __webpack_require__(38),
    MapCache = __webpack_require__(39);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(180);

/** Used to match property names within property paths. */
var reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),
/* 197 */
/***/ (function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

var baseFindIndex = __webpack_require__(130),
    baseIteratee = __webpack_require__(13),
    toInteger = __webpack_require__(53);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseFindIndex(array, baseIteratee(predicate, 3), index);
}

module.exports = findIndex;


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

var baseFlatten = __webpack_require__(131);

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

var baseHasIn = __webpack_require__(259),
    hasPath = __webpack_require__(97);

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__(197),
    createInverter = __webpack_require__(299),
    identity = __webpack_require__(24);

/**
 * Creates an object composed of the inverted keys and values of `object`.
 * If `object` contains duplicate values, subsequent values overwrite
 * property assignments of previous values.
 *
 * @static
 * @memberOf _
 * @since 0.7.0
 * @category Object
 * @param {Object} object The object to invert.
 * @returns {Object} Returns the new inverted object.
 * @example
 *
 * var object = { 'a': 1, 'b': 2, 'c': 1 };
 *
 * _.invert(object);
 * // => { '1': 'c', '2': 'b' }
 */
var invert = createInverter(function(result, value, key) {
  result[value] = key;
}, constant(identity));

module.exports = invert;


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(8),
    isObjectLike = __webpack_require__(7);

/** `Object#toString` result references. */
var numberTag = '[object Number]';

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
 * classified as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
 * @example
 *
 * _.isNumber(3);
 * // => true
 *
 * _.isNumber(Number.MIN_VALUE);
 * // => true
 *
 * _.isNumber(Infinity);
 * // => true
 *
 * _.isNumber('3');
 * // => false
 */
function isNumber(value) {
  return typeof value == 'number' ||
    (isObjectLike(value) && baseGetTag(value) == numberTag);
}

module.exports = isNumber;


/***/ }),
/* 203 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value) {
  return value === undefined;
}

module.exports = isUndefined;


/***/ }),
/* 204 */
/***/ (function(module, exports) {

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

module.exports = last;


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(39);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),
/* 206 */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(66),
    castSlice = __webpack_require__(281),
    charsEndIndex = __webpack_require__(282),
    charsStartIndex = __webpack_require__(283),
    stringToArray = __webpack_require__(318),
    toString = __webpack_require__(75);

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * _.trim('  abc  ');
 * // => 'abc'
 *
 * _.trim('-_-abc-_-', '_-');
 * // => 'abc'
 *
 * _.map(['  foo  ', '  bar  '], _.trim);
 * // => ['foo', 'bar']
 */
function trim(string, chars, guard) {
  string = toString(string);
  if (string && (guard || chars === undefined)) {
    return string.replace(reTrim, '');
  }
  if (!string || !(chars = baseToString(chars))) {
    return string;
  }
  var strSymbols = stringToArray(string),
      chrSymbols = stringToArray(chars),
      start = charsStartIndex(strSymbols, chrSymbols),
      end = charsEndIndex(strSymbols, chrSymbols) + 1;

  return castSlice(strSymbols, start, end).join('');
}

module.exports = trim;


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(120);
var invariant = __webpack_require__(121);

module.exports = function() {
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  function shim() {
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
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
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _createConnector=__webpack_require__(2),_createConnector2=_interopRequireDefault(_createConnector),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_createConnector2.default)({displayName:'AlgoliaCurrentRefinements',propTypes:{transformItems:_propTypes2.default.func},getProvidedProps:function getProvidedProps(a,b,c,d){var e=d.reduce(function(f,g){return'undefined'==typeof g.items?f:a.clearsQuery||'query'!==g.id?a.clearsQuery&&'query'===g.id&&''===g.items[0].currentRefinement?f:f.concat(g.items):f},[]);return{items:a.transformItems?a.transformItems(e):e,canRefine:0<e.length}},refine:function refine(a,b,c){var d=c instanceof Array?c.map(function(e){return e.value}):[c];return d.reduce(function(e,f){return f(e)},b)}});

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _createConnector=__webpack_require__(2),_createConnector2=_interopRequireDefault(_createConnector),_highlight=__webpack_require__(237),_highlight2=_interopRequireDefault(_highlight),_highlightTags=__webpack_require__(213),_highlightTags2=_interopRequireDefault(_highlightTags);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var highlight=function(a){var b=a.attributeName,c=a.hit,d=a.highlightProperty;return(0,_highlight2.default)({attributeName:b,hit:c,preTag:_highlightTags2.default.highlightPreTag,postTag:_highlightTags2.default.highlightPostTag,highlightProperty:d})};exports.default=(0,_createConnector2.default)({displayName:'AlgoliaHighlighter',propTypes:{},getProvidedProps:function getProvidedProps(){return{highlight:highlight}}});

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_createClass=function(){function a(b,c){for(var f,d=0;d<c.length;d++)f=c[d],f.enumerable=f.enumerable||!1,f.configurable=!0,'value'in f&&(f.writable=!0),Object.defineProperty(b,f.key,f)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_SearchBox=__webpack_require__(346),_SearchBox2=_interopRequireDefault(_SearchBox);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var itemsPropType=_propTypes2.default.arrayOf(_propTypes2.default.shape({value:_propTypes2.default.any,label:_propTypes2.default.string.isRequired,items:function items(){return itemsPropType.apply(void 0,arguments)}})),List=function(a){function b(){_classCallCheck(this,b);var c=_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).call(this));return c.defaultProps={isFromSearch:!1},c.onShowMoreClick=function(){c.setState(function(d){return{extended:!d.extended}})},c.getLimit=function(){var d=c.props,f=d.limitMin,g=d.limitMax,h=c.state.extended;return h?g:f},c.resetQuery=function(){c.setState({query:''})},c.renderItem=function(d,f){var g=d.items&&_react2.default.createElement('div',c.props.cx('itemItems'),d.items.slice(0,c.getLimit()).map(function(h){return c.renderItem(h,d)}));return _react2.default.createElement('div',_extends({key:d.key||d.label},c.props.cx('item',d.isRefined&&'itemSelected',d.noRefinement&&'itemNoRefinement',g&&'itemParent',g&&d.isRefined&&'itemSelectedParent')),c.props.renderItem(d,f),g)},c.state={extended:!1,query:''},c}return _inherits(b,a),_createClass(b,[{key:'renderShowMore',value:function renderShowMore(){var c=this.props,d=c.showMore,f=c.translate,g=c.cx,h=this.state.extended,j=this.props.limitMin>=this.props.items.length;return d?_react2.default.createElement('button',_extends({disabled:j},g('showMore',j&&'showMoreDisabled'),{onClick:this.onShowMoreClick}),f('showMore',h)):null}},{key:'renderSearchBox',value:function renderSearchBox(){var c=this,d=this.props,f=d.cx,g=d.searchForItems,h=d.isFromSearch,j=d.translate,k=d.items,l=d.selectItem,m=0===k.length&&''!==this.state.query?_react2.default.createElement('div',f('noResults'),j('noResults')):null;return _react2.default.createElement('div',f('SearchBox'),_react2.default.createElement(_SearchBox2.default,{currentRefinement:this.state.query,refine:function refine(n){c.setState({query:n}),g(n)},focusShortcuts:[],translate:j,onSubmit:function onSubmit(n){n.preventDefault(),n.stopPropagation(),h&&l(k[0],c.resetQuery)}}),m)}},{key:'render',value:function render(){var c=this,d=this.props,f=d.cx,g=d.items,h=d.withSearchBox,j=d.canRefine,k=h?this.renderSearchBox():null;if(0===g.length)return _react2.default.createElement('div',f('root',!j&&'noRefinement'),k);var l=this.getLimit();return _react2.default.createElement('div',f('root',!this.props.canRefine&&'noRefinement'),k,_react2.default.createElement('div',f('items'),g.slice(0,l).map(function(m){return c.renderItem(m,c.resetQuery)})),this.renderShowMore())}}]),b}(_react.Component);List.propTypes={cx:_propTypes2.default.func.isRequired,translate:_propTypes2.default.func,items:itemsPropType,renderItem:_propTypes2.default.func.isRequired,selectItem:_propTypes2.default.func,showMore:_propTypes2.default.bool,limitMin:_propTypes2.default.number,limitMax:_propTypes2.default.number,limit:_propTypes2.default.number,show:_propTypes2.default.func,searchForItems:_propTypes2.default.func,withSearchBox:_propTypes2.default.bool,isFromSearch:_propTypes2.default.bool,canRefine:_propTypes2.default.bool},exports.default=List;

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:!0});var timestamp=Date.now().toString();exports.default={highlightPreTag:"<ais-highlight-"+timestamp+">",highlightPostTag:"</ais-highlight-"+timestamp+">"};

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var AlgoliaSearchHelper = __webpack_require__(245);

var SearchParameters = __webpack_require__(81);
var SearchResults = __webpack_require__(115);

/**
 * The algoliasearchHelper module is the function that will let its
 * contains everything needed to use the Algoliasearch
 * Helper. It is a also a function that instanciate the helper.
 * To use the helper, you also need the Algolia JS client v3.
 * @example
 * //using the UMD build
 * var client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');
 * var helper = algoliasearchHelper(client, 'bestbuy', {
 *   facets: ['shipping'],
 *   disjunctiveFacets: ['category']
 * });
 * helper.on('result', function(result) {
 *   console.log(result);
 * });
 * helper.toggleRefine('Movies & TV Shows')
 *       .toggleRefine('Free shipping')
 *       .search();
 * @example
 * // The helper is an event emitter using the node API
 * helper.on('result', updateTheResults);
 * helper.once('result', updateTheResults);
 * helper.removeListener('result', updateTheResults);
 * helper.removeAllListeners('result');
 * @module algoliasearchHelper
 * @param  {AlgoliaSearch} client an AlgoliaSearch client
 * @param  {string} index the name of the index to query
 * @param  {SearchParameters|object} opts an object defining the initial config of the search. It doesn't have to be a {SearchParameters}, just an object containing the properties you need from it.
 * @return {AlgoliaSearchHelper}
 */
function algoliasearchHelper(client, index, opts) {
  return new AlgoliaSearchHelper(client, index, opts);
}

/**
 * The version currently used
 * @member module:algoliasearchHelper.version
 * @type {number}
 */
algoliasearchHelper.version = __webpack_require__(118);

/**
 * Constructor for the Helper.
 * @member module:algoliasearchHelper.AlgoliaSearchHelper
 * @type {AlgoliaSearchHelper}
 */
algoliasearchHelper.AlgoliaSearchHelper = AlgoliaSearchHelper;

/**
 * Constructor for the object containing all the parameters of the search.
 * @member module:algoliasearchHelper.SearchParameters
 * @type {SearchParameters}
 */
algoliasearchHelper.SearchParameters = SearchParameters;

/**
 * Constructor for the object containing the results of the search.
 * @member module:algoliasearchHelper.SearchResults
 * @type {SearchResults}
 */
algoliasearchHelper.SearchResults = SearchResults;

/**
 * URL tools to generate query string and parse them from/into
 * SearchParameters
 * @member module:algoliasearchHelper.url
 * @type {object} {@link url}
 *
 */
algoliasearchHelper.url = __webpack_require__(117);

module.exports = algoliasearchHelper;


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// This file hosts our error definitions
// We use custom error "types" so that we can act on them when we need it
// e.g.: if error instanceof errors.UnparsableJSON then..

var inherits = __webpack_require__(349);

function AlgoliaSearchError(message, extraProperties) {
  var forEach = __webpack_require__(110);

  var error = this;

  // try to get a stacktrace
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  } else {
    error.stack = (new Error()).stack || 'Cannot get a stacktrace, browser is too old';
  }

  this.name = 'AlgoliaSearchError';
  this.message = message || 'Unknown error';

  if (extraProperties) {
    forEach(extraProperties, function addToErrorObject(value, key) {
      error[key] = value;
    });
  }
}

inherits(AlgoliaSearchError, Error);

function createCustomError(name, message) {
  function AlgoliaSearchCustomError() {
    var args = Array.prototype.slice.call(arguments, 0);

    // custom message not set, use default
    if (typeof args[0] !== 'string') {
      args.unshift(message);
    }

    AlgoliaSearchError.apply(this, args);
    this.name = 'AlgoliaSearch' + name + 'Error';
  }

  inherits(AlgoliaSearchCustomError, AlgoliaSearchError);

  return AlgoliaSearchCustomError;
}

// late exports to let various fn defs and inherits take place
module.exports = {
  AlgoliaSearchError: AlgoliaSearchError,
  UnparsableJSON: createCustomError(
    'UnparsableJSON',
    'Could not parse the incoming response as JSON, see err.more for details'
  ),
  RequestTimeout: createCustomError(
    'RequestTimeout',
    'Request timedout before getting a response'
  ),
  Network: createCustomError(
    'Network',
    'Network issue, see err.more for details'
  ),
  JSONPScriptFail: createCustomError(
    'JSONPScriptFail',
    '<script> was loaded but did not call our provided callback'
  ),
  JSONPScriptError: createCustomError(
    'JSONPScriptError',
    '<script> unable to load due to an `error` event on it'
  ),
  Unknown: createCustomError(
    'Unknown',
    'Unknown error occured'
  )
};


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {
/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(419);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    return exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (typeof process !== 'undefined' && 'env' in process) {
    return process.env.DEBUG;
  }
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage(){
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(109)))

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(18),
    isArrayLike = __webpack_require__(11),
    isIndex = __webpack_require__(31),
    isObject = __webpack_require__(6);

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

var isNumber = __webpack_require__(202);

/**
 * Checks if `value` is `NaN`.
 *
 * **Note:** This method is based on
 * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
 * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
 * `undefined` and other non-number values.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 * @example
 *
 * _.isNaN(NaN);
 * // => true
 *
 * _.isNaN(new Number(NaN));
 * // => true
 *
 * isNaN(undefined);
 * // => true
 *
 * _.isNaN(undefined);
 * // => false
 */
function isNaN(value) {
  // An `NaN` primitive is the only value that is not equal to itself.
  // Perform the `toStringTag` check first to avoid errors with some
  // ActiveX objects in IE.
  return isNumber(value) && value != +value;
}

module.exports = isNaN;


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

var toNumber = __webpack_require__(338);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _keys2=__webpack_require__(9),_keys3=_interopRequireDefault(_keys2),_difference2=__webpack_require__(325),_difference3=_interopRequireDefault(_difference2),_omit2=__webpack_require__(51),_omit3=_interopRequireDefault(_omit2),_extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_createConnector=__webpack_require__(2),_createConnector2=_interopRequireDefault(_createConnector),_indexUtils=__webpack_require__(5);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function getId(){return'configure'}exports.default=(0,_createConnector2.default)({displayName:'AlgoliaConfigure',getProvidedProps:function getProvidedProps(){return{}},getSearchParameters:function getSearchParameters(a,b){var c=(0,_omit3.default)(b,'children');return a.setQueryParameters(c)},transitionState:function transitionState(a,b,c){var d=getId(),e=(0,_omit3.default)(a,'children'),f=this._props?(0,_difference3.default)((0,_keys3.default)(this._props),(0,_keys3.default)(a)):[];this._props=a;var g=_defineProperty({},d,_extends({},(0,_omit3.default)(c[d],f),e));return(0,_indexUtils.refineValue)(c,g,this.context)},cleanUp:function cleanUp(a,b){var c=getId(),d=(0,_indexUtils.getIndex)(this.context),e=(0,_indexUtils.hasMultipleIndex)(this.context)&&b.indices?b.indices[d]:b,f=e&&e[c]?Object.keys(e[c]):[],g=f.reduce(function(j,k){return a[k]||(j[k]=e[c][k]),j},{}),h=_defineProperty({},c,g);return(0,_indexUtils.refineValue)(b,h,this.context)}});

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0}),exports.getId=void 0;var _propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_createConnector=__webpack_require__(2),_createConnector2=_interopRequireDefault(_createConnector),_algoliasearchHelper=__webpack_require__(214),_indexUtils=__webpack_require__(5);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var getId=exports.getId=function(a){return a.attributes[0]},namespace='hierarchicalMenu';function getCurrentRefinement(a,b,c){return(0,_indexUtils.getCurrentRefinementValue)(a,b,c,namespace+'.'+getId(a),null,function(d){return''===d?null:d})}function getValue(a,b,c,d){var e=b.id,f=b.attributes,g=b.separator,h=b.rootPath,i=b.showParentLevel,j=getCurrentRefinement(b,c,d),k=void 0;if(null===j)k=a;else{var l=new _algoliasearchHelper.SearchParameters({hierarchicalFacets:[{name:e,attributes:f,separator:g,rootPath:h,showParentLevel:i}]});k=l.toggleHierarchicalFacetRefinement(e,j).toggleHierarchicalFacetRefinement(e,a).getHierarchicalRefinement(e)[0]}return k}function transformValue(a,b,c,d,e){return a.slice(0,b).map(function(f){return{label:f.name,value:getValue(f.path,c,d,e),count:f.count,isRefined:f.isRefined,items:f.data&&transformValue(f.data,b,c,d,e)}})}function _refine(a,b,c,d){var e=getId(a),f=_defineProperty({},e,c||'');return(0,_indexUtils.refineValue)(b,f,d,!0,namespace)}function _cleanUp(a,b,c){return(0,_indexUtils.cleanUpValue)(b,c,namespace+'.'+getId(a))}var sortBy=['name:asc'];exports.default=(0,_createConnector2.default)({displayName:'AlgoliaHierarchicalMenu',propTypes:{attributes:function attributes(a,b,c){return!Array.isArray(a[b])||a[b].some(function isNotString(e){return'string'!=typeof e})||1>a[b].length?new Error('Invalid prop '+b+' supplied to '+c+'. Expected an Array of Strings'):void 0},separator:_propTypes2.default.string,rootPath:_propTypes2.default.string,showParentLevel:_propTypes2.default.bool,defaultRefinement:_propTypes2.default.string,showMore:_propTypes2.default.bool,limitMin:_propTypes2.default.number,limitMax:_propTypes2.default.number,transformItems:_propTypes2.default.func},defaultProps:{showMore:!1,limitMin:10,limitMax:20,separator:' > ',rootPath:null,showParentLevel:!0},getProvidedProps:function getProvidedProps(a,b,c){var d=a.showMore,e=a.limitMin,f=a.limitMax,g=getId(a),h=(0,_indexUtils.getResults)(c,this.context),i=!!h&&!!h.getFacetByName(g);if(!i)return{items:[],currentRefinement:getCurrentRefinement(a,b,this.context),canRefine:!1};var j=d?f:e,k=h.getFacetValues(g,{sortBy:sortBy}),l=k.data?transformValue(k.data,j,a,b,this.context):[];return{items:a.transformItems?a.transformItems(l):l,currentRefinement:getCurrentRefinement(a,b,this.context),canRefine:0<l.length}},refine:function refine(a,b,c){return _refine(a,b,c,this.context)},cleanUp:function cleanUp(a,b){return _cleanUp(a,b,this.context)},getSearchParameters:function getSearchParameters(a,b,c){var d=b.attributes,e=b.separator,f=b.rootPath,g=b.showParentLevel,h=b.showMore,i=b.limitMin,j=b.limitMax,k=getId(b),l=h?j:i;a=a.addHierarchicalFacet({name:k,attributes:d,separator:e,rootPath:f,showParentLevel:g}).setQueryParameters({maxValuesPerFacet:Math.max(a.maxValuesPerFacet||0,l)});var m=getCurrentRefinement(b,c,this.context);return null!==m&&(a=a.toggleHierarchicalFacetRefinement(k,m)),a},getMetadata:function getMetadata(a,b){var c=this,d=a.attributes[0],e=getId(a),f=getCurrentRefinement(a,b,this.context);return{id:e,index:(0,_indexUtils.getIndex)(this.context),items:f?[{label:d+': '+f,attributeName:d,value:function value(g){return _refine(a,g,'',c.context)},currentRefinement:f}]:[]}}});

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _createConnector=__webpack_require__(2),_createConnector2=_interopRequireDefault(_createConnector),_indexUtils=__webpack_require__(5);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_createConnector2.default)({displayName:'AlgoliaHits',getProvidedProps:function getProvidedProps(a,b,c){var d=(0,_indexUtils.getResults)(c,this.context),e=d?d.hits:[];return{hits:e}},getSearchParameters:function getSearchParameters(a){return a}});

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_createConnector=__webpack_require__(2),_createConnector2=_interopRequireDefault(_createConnector),_indexUtils=__webpack_require__(5);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function getId(){return'hitsPerPage'}function getCurrentRefinement(a,b,c){var d=getId();return(0,_indexUtils.getCurrentRefinementValue)(a,b,c,d,null,function(e){return'string'==typeof e?parseInt(e,10):e})}exports.default=(0,_createConnector2.default)({displayName:'AlgoliaHitsPerPage',propTypes:{defaultRefinement:_propTypes2.default.number.isRequired,items:_propTypes2.default.arrayOf(_propTypes2.default.shape({label:_propTypes2.default.string,value:_propTypes2.default.number.isRequired})).isRequired,transformItems:_propTypes2.default.func},getProvidedProps:function getProvidedProps(a,b){var c=getCurrentRefinement(a,b,this.context),d=a.items.map(function(e){return e.value===c?_extends({},e,{isRefined:!0}):_extends({},e,{isRefined:!1})});return{items:a.transformItems?a.transformItems(d):d,currentRefinement:c}},refine:function refine(a,b,c){var d=getId(),e=_defineProperty({},d,c);return(0,_indexUtils.refineValue)(b,e,this.context,!0)},cleanUp:function cleanUp(a,b){return(0,_indexUtils.cleanUpValue)(b,this.context,getId())},getSearchParameters:function getSearchParameters(a,b,c){return a.setHitsPerPage(getCurrentRefinement(b,c,this.context))},getMetadata:function getMetadata(){return{id:getId()}}});

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _createConnector=__webpack_require__(2),_createConnector2=_interopRequireDefault(_createConnector),_indexUtils=__webpack_require__(5);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _toConsumableArray(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)}function getId(){return'page'}function getCurrentRefinement(a,b,c){var d=getId();return(0,_indexUtils.getCurrentRefinementValue)(a,b,c,d,1,function(f){return'string'==typeof f&&(f=parseInt(f,10)),f})}exports.default=(0,_createConnector2.default)({displayName:'AlgoliaInfiniteHits',getProvidedProps:function getProvidedProps(a,b,c){var d=(0,_indexUtils.getResults)(c,this.context);if(!d)return this._allResults=[],{hits:this._allResults,hasMore:!1};var e=d.hits,f=d.page,g=d.nbPages;0===f?this._allResults=e:f>this.previousPage?this._allResults=[].concat(_toConsumableArray(this._allResults),_toConsumableArray(e)):f<this.previousPage&&(this._allResults=e);return this.previousPage=f,{hits:this._allResults,hasMore:f<g-1}},getSearchParameters:function getSearchParameters(a,b,c){return a.setQueryParameters({page:getCurrentRefinement(b,c,this.context)-1})},refine:function refine(a,b){var c=getId(),d=getCurrentRefinement(a,b,this.context)+1,e=_defineProperty({},c,d);return(0,_indexUtils.refineValue)(b,e,this.context,!1)}});

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _orderBy2=__webpack_require__(106),_orderBy3=_interopRequireDefault(_orderBy2),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_createConnector=__webpack_require__(2),_createConnector2=_interopRequireDefault(_createConnector),_indexUtils=__webpack_require__(5);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var namespace='menu';function getId(a){return a.attributeName}function getCurrentRefinement(a,b,c){return(0,_indexUtils.getCurrentRefinementValue)(a,b,c,namespace+'.'+getId(a),null,function(d){return''===d?null:d})}function getValue(a,b,c,d){var e=getCurrentRefinement(b,c,d);return a===e?'':a}function _refine(a,b,c,d){var e=getId(a),f=_defineProperty({},e,c?c:'');return(0,_indexUtils.refineValue)(b,f,d,!0,namespace)}function _cleanUp(a,b,c){return(0,_indexUtils.cleanUpValue)(b,c,namespace+'.'+getId(a))}var sortBy=['count:desc','name:asc'];exports.default=(0,_createConnector2.default)({displayName:'AlgoliaMenu',propTypes:{attributeName:_propTypes2.default.string.isRequired,showMore:_propTypes2.default.bool,limitMin:_propTypes2.default.number,limitMax:_propTypes2.default.number,defaultRefinement:_propTypes2.default.string,transformItems:_propTypes2.default.func,withSearchBox:_propTypes2.default.bool,searchForFacetValues:_propTypes2.default.bool},defaultProps:{showMore:!1,limitMin:10,limitMax:20},getProvidedProps:function getProvidedProps(a,b,c,d,e){var f=this,g=a.attributeName,h=a.showMore,i=a.limitMin,j=a.limitMax,k=h?j:i,l=(0,_indexUtils.getResults)(c,this.context),m=!!l&&!!l.getFacetByName(g),n=!!(e&&e[g]&&''!==e.query),o=a.withSearchBox||a.searchForFacetValues;if('development'==="production"&&a.searchForFacetValues&&console.warn('react-instantsearch: `searchForFacetValues` has been renamed to`withSearchBox`, this will break in the next major version.'),a.withSearchBox&&this.context.multiIndexContext)throw new Error('react-instantsearch: searching in *List is not available when used inside a multi index context');if(!m)return{items:[],currentRefinement:getCurrentRefinement(a,b,this.context),isFromSearch:n,withSearchBox:o,canRefine:m};var p=n?e[g].map(function(s){return{label:s.value,value:getValue(s.value,a,b,f.context),_highlightResult:{label:{value:s.highlighted}},count:s.count,isRefined:s.isRefined}}):l.getFacetValues(g,{sortBy:sortBy}).map(function(s){return{label:s.name,value:getValue(s.name,a,b,f.context),count:s.count,isRefined:s.isRefined}}),q=o&&!n?(0,_orderBy3.default)(p,['isRefined','count','label'],['desc','desc','asc']):p,r=a.transformItems?a.transformItems(q):q;return{items:r.slice(0,k),currentRefinement:getCurrentRefinement(a,b,this.context),isFromSearch:n,withSearchBox:o,canRefine:0<p.length}},refine:function refine(a,b,c){return _refine(a,b,c,this.context)},searchForFacetValues:function searchForFacetValues(a,b,c){return{facetName:a.attributeName,query:c}},cleanUp:function cleanUp(a,b){return _cleanUp(a,b,this.context)},getSearchParameters:function getSearchParameters(a,b,c){var d=b.attributeName,e=b.showMore,f=b.limitMin,g=b.limitMax,h=e?g:f;a=a.setQueryParameters({maxValuesPerFacet:Math.max(a.maxValuesPerFacet||0,h)}),a=a.addDisjunctiveFacet(d);var i=getCurrentRefinement(b,c,this.context);return null!==i&&(a=a.addDisjunctiveFacetRefinement(d,i)),a},getMetadata:function getMetadata(a,b){var c=this,d=getId(a),e=getCurrentRefinement(a,b,this.context);return{id:d,index:(0,_indexUtils.getIndex)(this.context),items:null===e?[]:[{label:a.attributeName+': '+e,attributeName:a.attributeName,value:function value(f){return _refine(a,f,'',c.context)},currentRefinement:e}]}}});

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _isEmpty2=__webpack_require__(16),_isEmpty3=_interopRequireDefault(_isEmpty2),_find3=__webpack_require__(46),_find4=_interopRequireDefault(_find3),_slicedToArray=function(){function a(b,c){var d=[],e=!0,f=!1,g=void 0;try{for(var j,h=b[Symbol.iterator]();!(e=(j=h.next()).done)&&(d.push(j.value),!(c&&d.length===c));e=!0);}catch(k){f=!0,g=k}finally{try{!e&&h['return']&&h['return']()}finally{if(f)throw g}}return d}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError('Invalid attempt to destructure non-iterable instance')}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_indexUtils=__webpack_require__(5),_createConnector=__webpack_require__(2),_createConnector2=_interopRequireDefault(_createConnector);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function stringifyItem(a){return'undefined'==typeof a.start&&'undefined'==typeof a.end?'':(a.start?a.start:'')+':'+(a.end?a.end:'')}function parseItem(a){if(0===a.length)return{start:null,end:null};var b=a.split(':'),c=_slicedToArray(b,2),d=c[0],e=c[1];return{start:0<d.length?parseInt(d,10):null,end:0<e.length?parseInt(e,10):null}}var namespace='multiRange';function getId(a){return a.attributeName}function getCurrentRefinement(a,b,c){return(0,_indexUtils.getCurrentRefinementValue)(a,b,c,namespace+'.'+getId(a),'',function(d){return''===d?'':d})}function isRefinementsRangeIncludesInsideItemRange(a,b,c){return a.min>b&&a.min<c||a.max>b&&a.max<c}function isItemRangeIncludedInsideRefinementsRange(a,b,c){return b>a.min&&b<a.max||c>a.min&&c<a.max}function itemHasRefinement(a,b,c){var d=b.getFacetByName(a)?b.getFacetStats(a):null,e=c.split(':'),f=0===+e[0]||''===c?Number.NEGATIVE_INFINITY:+e[0],g=0===+e[1]||''===c?Number.POSITIVE_INFINITY:+e[1];return!(!!d&&(isRefinementsRangeIncludesInsideItemRange(d,f,g)||isItemRangeIncludedInsideRefinementsRange(d,f,g)))}function _refine(a,b,c,d){var e=_defineProperty({},getId(a,b),c);return(0,_indexUtils.refineValue)(b,e,d,!0,namespace)}function _cleanUp(a,b,c){return(0,_indexUtils.cleanUpValue)(b,c,namespace+'.'+getId(a))}exports.default=(0,_createConnector2.default)({displayName:'AlgoliaMultiRange',propTypes:{id:_propTypes2.default.string,attributeName:_propTypes2.default.string.isRequired,items:_propTypes2.default.arrayOf(_propTypes2.default.shape({label:_propTypes2.default.node,start:_propTypes2.default.number,end:_propTypes2.default.number})).isRequired,transformItems:_propTypes2.default.func},getProvidedProps:function getProvidedProps(a,b,c){var d=a.attributeName,e=getCurrentRefinement(a,b,this.context),f=(0,_indexUtils.getResults)(c,this.context),g=a.items.map(function(k){var l=stringifyItem(k);return{label:k.label,value:l,isRefined:l===e,noRefinement:!!f&&itemHasRefinement(getId(a),f,l)}}),h=f&&f.getFacetByName(d)?f.getFacetStats(d):null,j=(0,_find4.default)(g,function(k){return!0===k.isRefined});return g.some(function(k){return''===k.value})||g.push({value:'',isRefined:(0,_isEmpty3.default)(j),noRefinement:!h,label:'All'}),{items:a.transformItems?a.transformItems(g):g,currentRefinement:e,canRefine:0<g.length&&g.some(function(k){return!1===k.noRefinement})}},refine:function refine(a,b,c){return _refine(a,b,c,this.context)},cleanUp:function cleanUp(a,b){return _cleanUp(a,b,this.context)},getSearchParameters:function getSearchParameters(a,b,c){var d=b.attributeName,e=parseItem(getCurrentRefinement(b,c,this.context)),f=e.start,g=e.end;return a=a.addDisjunctiveFacet(d),f&&(a=a.addNumericRefinement(d,'>=',f)),g&&(a=a.addNumericRefinement(d,'<=',g)),a},getMetadata:function getMetadata(a,b){var c=this,d=getId(a),e=getCurrentRefinement(a,b,this.context),f=[],g=(0,_indexUtils.getIndex)(this.context);if(''!==e){var h=(0,_find4.default)(a.items,function(k){return stringifyItem(k)===e}),j=h.label;f.push({label:a.attributeName+': '+j,attributeName:a.attributeName,currentRefinement:j,value:function value(k){return _refine(a,k,'',c.context)}})}return{id:d,index:g,items:f}}});

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _indexUtils=__webpack_require__(5),_createConnector=__webpack_require__(2),_createConnector2=_interopRequireDefault(_createConnector);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function getId(){return'page'}function getCurrentRefinement(a,b,c){var d=getId();return(0,_indexUtils.getCurrentRefinementValue)(a,b,c,d,1,function(f){return'string'==typeof f?parseInt(f,10):f})}function _refine(a,b,c,d){var e=getId(),f=_defineProperty({},e,c);return(0,_indexUtils.refineValue)(b,f,d,!1)}exports.default=(0,_createConnector2.default)({displayName:'AlgoliaPagination',getProvidedProps:function getProvidedProps(a,b,c){var d=(0,_indexUtils.getResults)(c,this.context);if(!d)return null;var e=d.nbPages;return{nbPages:e,currentRefinement:getCurrentRefinement(a,b,this.context),canRefine:1<e}},refine:function refine(a,b,c){return _refine(a,b,c,this.context)},cleanUp:function cleanUp(a,b){return(0,_indexUtils.cleanUpValue)(b,this.context,getId())},getSearchParameters:function getSearchParameters(a,b,c){return a.setPage(getCurrentRefinement(b,c,this.context)-1)},getMetadata:function getMetadata(){return{id:getId()}}});

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _createConnector=__webpack_require__(2),_createConnector2=_interopRequireDefault(_createConnector);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_createConnector2.default)({displayName:'AlgoliaPoweredBy',propTypes:{},getProvidedProps:function getProvidedProps(){var a='https://www.algolia.com/?utm_source=react-instantsearch&utm_medium=website&'+('utm_content='+location.hostname+'&utm_campaign=poweredby');return{url:a}}});

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_indexUtils=__webpack_require__(5),_createConnector=__webpack_require__(2),_createConnector2=_interopRequireDefault(_createConnector);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var namespace='refinementList';function getId(a){return a.attributeName}function getCurrentRefinement(a,b,c){return(0,_indexUtils.getCurrentRefinementValue)(a,b,c,namespace+'.'+getId(a),[],function(d){return'string'==typeof d?''===d?[]:[d]:d})}function getValue(a,b,c,d){var e=getCurrentRefinement(b,c,d),f=-1===e.indexOf(a),g=f?e.concat([a]):e.filter(function(h){return h!==a});return g}function _refine(a,b,c,d){var e=getId(a),f=_defineProperty({},e,0<c.length?c:'');return(0,_indexUtils.refineValue)(b,f,d,!0,namespace)}function _cleanUp(a,b,c){return(0,_indexUtils.cleanUpValue)(b,c,namespace+'.'+getId(a))}var sortBy=['isRefined','count:desc','name:asc'];exports.default=(0,_createConnector2.default)({displayName:'AlgoliaRefinementList',propTypes:{id:_propTypes2.default.string,attributeName:_propTypes2.default.string.isRequired,operator:_propTypes2.default.oneOf(['and','or']),showMore:_propTypes2.default.bool,limitMin:_propTypes2.default.number,limitMax:_propTypes2.default.number,defaultRefinement:_propTypes2.default.arrayOf(_propTypes2.default.string),withSearchBox:_propTypes2.default.bool,searchForFacetValues:_propTypes2.default.bool,transformItems:_propTypes2.default.func},defaultProps:{operator:'or',showMore:!1,limitMin:10,limitMax:20},getProvidedProps:function getProvidedProps(a,b,c,d,e){var f=this,g=a.attributeName,h=a.showMore,i=a.limitMin,j=a.limitMax,k=h?j:i,l=(0,_indexUtils.getResults)(c,this.context),m=!!l&&!!l.getFacetByName(g),n=!!(e&&e[g]&&''!==e.query),o=a.withSearchBox||a.searchForFacetValues;if('development'==="production"&&a.searchForFacetValues&&console.warn('react-instantsearch: `searchForFacetValues` has been renamed to`withSearchBox`, this will break in the next major version.'),a.withSearchBox&&this.context.multiIndexContext)throw new Error('react-instantsearch: searching in *List is not available when used inside a multi index context');if(!m)return{items:[],currentRefinement:getCurrentRefinement(a,b,this.context),canRefine:m,isFromSearch:n,withSearchBox:o};var p=n?e[g].map(function(r){return{label:r.value,value:getValue(r.value,a,b,f.context),_highlightResult:{label:{value:r.highlighted}},count:r.count,isRefined:r.isRefined}}):l.getFacetValues(g,{sortBy:sortBy}).map(function(r){return{label:r.name,value:getValue(r.name,a,b,f.context),count:r.count,isRefined:r.isRefined}}),q=a.transformItems?a.transformItems(p):p;return{items:q.slice(0,k),currentRefinement:getCurrentRefinement(a,b,this.context),isFromSearch:n,withSearchBox:o,canRefine:0<p.length}},refine:function refine(a,b,c){return _refine(a,b,c,this.context)},searchForFacetValues:function searchForFacetValues(a,b,c){return{facetName:a.attributeName,query:c}},cleanUp:function cleanUp(a,b){return _cleanUp(a,b,this.context)},getSearchParameters:function getSearchParameters(a,b,c){var d=b.attributeName,e=b.operator,f=b.showMore,g=b.limitMin,h=b.limitMax,i=f?h:g,j='and'===e?'addFacet':'addDisjunctiveFacet';return a=a.setQueryParameters({maxValuesPerFacet:Math.max(a.maxValuesPerFacet||0,i)}),a=a[j](d),getCurrentRefinement(b,c,this.context).reduce(function(l,m){return l[j+'Refinement'](d,m)},a)},getMetadata:function getMetadata(a,b){var c=getId(a),d=this.context;return{id:c,index:(0,_indexUtils.getIndex)(this.context),items:0<getCurrentRefinement(a,b,d).length?[{attributeName:a.attributeName,label:a.attributeName+': ',currentRefinement:getCurrentRefinement(a,b,d),value:function value(e){return _refine(a,e,[],d)},items:getCurrentRefinement(a,b,d).map(function(e){return{label:''+e,value:function value(f){var g=getCurrentRefinement(a,f,d).filter(function(h){return h!==e});return _refine(a,b,g,d)}}})}]:[]}}});

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_createConnector=__webpack_require__(2),_createConnector2=_interopRequireDefault(_createConnector),_indexUtils=__webpack_require__(5);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_createConnector2.default)({displayName:'AlgoliaScrollTo',propTypes:{scrollOn:_propTypes2.default.string},defaultProps:{scrollOn:'page'},getProvidedProps:function getProvidedProps(a,b){var c=a.scrollOn,d=(0,_indexUtils.getCurrentRefinementValue)(a,b,this.context,c,null,function(e){return e});return{value:d}}});

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _createConnector=__webpack_require__(2),_createConnector2=_interopRequireDefault(_createConnector),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_indexUtils=__webpack_require__(5);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function getId(){return'query'}function getCurrentRefinement(a,b,c){var d=getId(a);return(0,_indexUtils.getCurrentRefinementValue)(a,b,c,d,'',function(e){return e?e:''})}function _refine(a,b,c,d){var e=getId(),f=_defineProperty({},e,c);return(0,_indexUtils.refineValue)(b,f,d,!0)}function _cleanUp(a,b,c){return(0,_indexUtils.cleanUpValue)(b,c,getId())}exports.default=(0,_createConnector2.default)({displayName:'AlgoliaSearchBox',propTypes:{defaultRefinement:_propTypes2.default.string},getProvidedProps:function getProvidedProps(a,b){return{currentRefinement:getCurrentRefinement(a,b,this.context)}},refine:function refine(a,b,c){return _refine(a,b,c,this.context)},cleanUp:function cleanUp(a,b){return _cleanUp(a,b,this.context)},getSearchParameters:function getSearchParameters(a,b,c){return a.setQuery(getCurrentRefinement(b,c,this.context))},getMetadata:function getMetadata(a,b){var c=this,d=getId(a),e=getCurrentRefinement(a,b,this.context);return{id:d,index:(0,_indexUtils.getIndex)(this.context),items:null===e?[]:[{label:d+': '+e,value:function value(f){return _refine(a,f,'',c.context)},currentRefinement:e}]}}});

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_indexUtils=__webpack_require__(5),_createConnector=__webpack_require__(2),_createConnector2=_interopRequireDefault(_createConnector);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function getId(){return'sortBy'}function getCurrentRefinement(a,b,c){var d=getId(a);return(0,_indexUtils.getCurrentRefinementValue)(a,b,c,d,null,function(e){return e?e:null})}exports.default=(0,_createConnector2.default)({displayName:'AlgoliaSortBy',propTypes:{defaultRefinement:_propTypes2.default.string,items:_propTypes2.default.arrayOf(_propTypes2.default.shape({label:_propTypes2.default.string,value:_propTypes2.default.string.isRequired})).isRequired,transformItems:_propTypes2.default.func},getProvidedProps:function getProvidedProps(a,b){var c=getCurrentRefinement(a,b,this.context),d=a.items.map(function(e){return e.value===c?_extends({},e,{isRefined:!0}):_extends({},e,{isRefined:!1})});return{items:a.transformItems?a.transformItems(d):d,currentRefinement:c}},refine:function refine(a,b,c){var d=getId(),e=_defineProperty({},d,c);return(0,_indexUtils.refineValue)(b,e,this.context,!0)},cleanUp:function cleanUp(a,b){return(0,_indexUtils.cleanUpValue)(b,this.context,getId())},getSearchParameters:function getSearchParameters(a,b,c){var d=getCurrentRefinement(b,c,this.context);return a.setIndex(d)},getMetadata:function getMetadata(){return{id:getId()}}});

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _createConnector=__webpack_require__(2),_createConnector2=_interopRequireDefault(_createConnector),_indexUtils=__webpack_require__(5);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_createConnector2.default)({displayName:'AlgoliaStats',getProvidedProps:function getProvidedProps(a,b,c){var d=(0,_indexUtils.getResults)(c,this.context);return d?{nbHits:d.nbHits,processingTimeMS:d.processingTimeMS}:null}});

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_createConnector=__webpack_require__(2),_createConnector2=_interopRequireDefault(_createConnector),_indexUtils=__webpack_require__(5);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function getId(a){return a.attributeName}var namespace='toggle';function getCurrentRefinement(a,b,c){return(0,_indexUtils.getCurrentRefinementValue)(a,b,c,namespace+'.'+getId(a),!1,function(d){return!!d&&d})}function _refine(a,b,c,d){var e=getId(a),f=_defineProperty({},e,!!c&&c);return(0,_indexUtils.refineValue)(b,f,d,!0,namespace)}function _cleanUp(a,b,c){return(0,_indexUtils.cleanUpValue)(b,c,namespace+'.'+getId(a))}exports.default=(0,_createConnector2.default)({displayName:'AlgoliaToggle',propTypes:{label:_propTypes2.default.string,filter:_propTypes2.default.func,attributeName:_propTypes2.default.string,value:_propTypes2.default.any,defaultRefinement:_propTypes2.default.bool},getProvidedProps:function getProvidedProps(a,b){var c=getCurrentRefinement(a,b,this.context);return{currentRefinement:c}},refine:function refine(a,b,c){return _refine(a,b,c,this.context)},cleanUp:function cleanUp(a,b){return _cleanUp(a,b,this.context)},getSearchParameters:function getSearchParameters(a,b,c){var d=b.attributeName,e=b.value,f=b.filter,g=getCurrentRefinement(b,c,this.context);return g&&(d&&(a=a.addFacet(d).addFacetRefinement(d,e)),f&&(a=f(a))),a},getMetadata:function getMetadata(a,b){var c=this,d=getId(a),e=getCurrentRefinement(a,b,this.context),f=[],g=(0,_indexUtils.getIndex)(this.context);return e&&f.push({label:a.label,currentRefinement:a.label,attributeName:a.attributeName,value:function value(h){return _refine(a,h,!1,c.context)}}),{id:d,index:g,items:f}}});

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectHighlight=__webpack_require__(211),_connectHighlight2=_interopRequireDefault(_connectHighlight),_Highlight=__webpack_require__(380),_Highlight2=_interopRequireDefault(_Highlight);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectHighlight2.default)(_Highlight2.default);

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _omit2=__webpack_require__(51),_omit3=_interopRequireDefault(_omit2),_extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_createClass=function(){function a(b,c){for(var f,d=0;d<c.length;d++)f=c[d],f.enumerable=f.enumerable||!1,f.configurable=!0,'value'in f&&(f.writable=!0),Object.defineProperty(b,f.key,f)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_utils=__webpack_require__(58);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var Link=function(a){function b(){var c,d,f,g;_classCallCheck(this,b);for(var h=arguments.length,j=Array(h),k=0;k<h;k++)j[k]=arguments[k];return g=(d=(f=_possibleConstructorReturn(this,(c=b.__proto__||Object.getPrototypeOf(b)).call.apply(c,[this].concat(j))),f),f.onClick=function(l){(0,_utils.isSpecialClick)(l)||(f.props.onClick(),l.preventDefault())},d),_possibleConstructorReturn(f,g)}return _inherits(b,a),_createClass(b,[{key:'render',value:function render(){return _react2.default.createElement('a',_extends({},(0,_omit3.default)(this.props,'onClick'),{onClick:this.onClick}))}}]),b}(_react.Component);Link.propTypes={onClick:_propTypes2.default.func.isRequired},exports.default=Link;

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _get2=__webpack_require__(73),_get3=_interopRequireDefault(_get2);Object.defineProperty(exports,'__esModule',{value:!0});exports.default=parseAlgoliaHit;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function parseAlgoliaHit(a){var b=a.preTag,c=b===void 0?'<em>':b,d=a.postTag,e=d===void 0?'</em>':d,f=a.highlightProperty,g=a.attributeName,h=a.hit;if(!h)throw new Error('`hit`, the matching record, must be provided');var i=(0,_get3.default)(h[f],g),j=i?i.value:'';return parseHighlightedAttribute({preTag:c,postTag:e,highlightedValue:j})}function parseHighlightedAttribute(a){var b=a.preTag,c=a.postTag,d=a.highlightedValue,e=d.split(b),f=e.shift(),g=''===f?[]:[{value:f,isHighlighted:!1}];if(c===b){var h=!0;e.forEach(function(i){g.push({value:i,isHighlighted:h}),h=!h})}else e.forEach(function(h){var i=h.split(c);g.push({value:i[0],isHighlighted:!0}),''!==i[1]&&g.push({value:i[1],isHighlighted:!1})});return g}

/***/ }),
/* 238 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 239 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(114);
var events = __webpack_require__(113);

/**
 * A DerivedHelper is a way to create sub requests to
 * Algolia from a main helper.
 * @class
 * @classdesc The DerivedHelper provides an event based interface for search callbacks:
 *  - search: when a search is triggered using the `search()` method.
 *  - result: when the response is retrieved from Algolia and is processed.
 *    This event contains a {@link SearchResults} object and the
 *    {@link SearchParameters} corresponding to this answer.
 */
function DerivedHelper(mainHelper, fn) {
  this.main = mainHelper;
  this.fn = fn;
  this.lastResults = null;
}

util.inherits(DerivedHelper, events.EventEmitter);

/**
 * Detach this helper from the main helper
 * @return {undefined}
 * @throws Error if the derived helper is already detached
 */
DerivedHelper.prototype.detach = function() {
  this.removeAllListeners();
  this.main.detachDerivedHelper(this);
};

DerivedHelper.prototype.getModifiedState = function(parameters) {
  return this.fn(parameters);
};

module.exports = DerivedHelper;


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Functions to manipulate refinement lists
 *
 * The RefinementList is not formally defined through a prototype but is based
 * on a specific structure.
 *
 * @module SearchParameters.refinementList
 *
 * @typedef {string[]} SearchParameters.refinementList.Refinements
 * @typedef {Object.<string, SearchParameters.refinementList.Refinements>} SearchParameters.refinementList.RefinementList
 */

var isUndefined = __webpack_require__(203);
var isString = __webpack_require__(49);
var isFunction = __webpack_require__(19);
var isEmpty = __webpack_require__(16);
var defaults = __webpack_require__(101);

var reduce = __webpack_require__(52);
var filter = __webpack_require__(102);
var omit = __webpack_require__(51);

var lib = {
  /**
   * Adds a refinement to a RefinementList
   * @param {RefinementList} refinementList the initial list
   * @param {string} attribute the attribute to refine
   * @param {string} value the value of the refinement, if the value is not a string it will be converted
   * @return {RefinementList} a new and updated prefinement list
   */
  addRefinement: function addRefinement(refinementList, attribute, value) {
    if (lib.isRefined(refinementList, attribute, value)) {
      return refinementList;
    }

    var valueAsString = '' + value;

    var facetRefinement = !refinementList[attribute] ?
      [valueAsString] :
      refinementList[attribute].concat(valueAsString);

    var mod = {};

    mod[attribute] = facetRefinement;

    return defaults({}, mod, refinementList);
  },
  /**
   * Removes refinement(s) for an attribute:
   *  - if the value is specified removes the refinement for the value on the attribute
   *  - if no value is specified removes all the refinements for this attribute
   * @param {RefinementList} refinementList the initial list
   * @param {string} attribute the attribute to refine
   * @param {string} [value] the value of the refinement
   * @return {RefinementList} a new and updated refinement lst
   */
  removeRefinement: function removeRefinement(refinementList, attribute, value) {
    if (isUndefined(value)) {
      return lib.clearRefinement(refinementList, attribute);
    }

    var valueAsString = '' + value;

    return lib.clearRefinement(refinementList, function(v, f) {
      return attribute === f && valueAsString === v;
    });
  },
  /**
   * Toggles the refinement value for an attribute.
   * @param {RefinementList} refinementList the initial list
   * @param {string} attribute the attribute to refine
   * @param {string} value the value of the refinement
   * @return {RefinementList} a new and updated list
   */
  toggleRefinement: function toggleRefinement(refinementList, attribute, value) {
    if (isUndefined(value)) throw new Error('toggleRefinement should be used with a value');

    if (lib.isRefined(refinementList, attribute, value)) {
      return lib.removeRefinement(refinementList, attribute, value);
    }

    return lib.addRefinement(refinementList, attribute, value);
  },
  /**
   * Clear all or parts of a RefinementList. Depending on the arguments, three
   * behaviors can happen:
   *  - if no attribute is provided: clears the whole list
   *  - if an attribute is provided as a string: clears the list for the specific attribute
   *  - if an attribute is provided as a function: discards the elements for which the function returns true
   * @param {RefinementList} refinementList the initial list
   * @param {string} [attribute] the attribute or function to discard
   * @param {string} [refinementType] optionnal parameter to give more context to the attribute function
   * @return {RefinementList} a new and updated refinement list
   */
  clearRefinement: function clearRefinement(refinementList, attribute, refinementType) {
    if (isUndefined(attribute)) {
      return {};
    } else if (isString(attribute)) {
      return omit(refinementList, attribute);
    } else if (isFunction(attribute)) {
      return reduce(refinementList, function(memo, values, key) {
        var facetList = filter(values, function(value) {
          return !attribute(value, key, refinementType);
        });

        if (!isEmpty(facetList)) memo[key] = facetList;

        return memo;
      }, {});
    }
  },
  /**
   * Test if the refinement value is used for the attribute. If no refinement value
   * is provided, test if the refinementList contains any refinement for the
   * given attribute.
   * @param {RefinementList} refinementList the list of refinement
   * @param {string} attribute name of the attribute
   * @param {string} [refinementValue] value of the filter/refinement
   * @return {boolean}
   */
  isRefined: function isRefined(refinementList, attribute, refinementValue) {
    var indexOf = __webpack_require__(74);

    var containsRefinements = !!refinementList[attribute] &&
      refinementList[attribute].length > 0;

    if (isUndefined(refinementValue) || !containsRefinements) {
      return containsRefinements;
    }

    var refinementValueAsString = '' + refinementValue;

    return indexOf(refinementList[attribute], refinementValueAsString) !== -1;
  }
};

module.exports = lib;


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach = __webpack_require__(35);
var filter = __webpack_require__(102);
var map = __webpack_require__(17);
var isEmpty = __webpack_require__(16);
var indexOf = __webpack_require__(74);

function filterState(state, filters) {
  var partialState = {};
  var attributeFilters = filter(filters, function(f) { return f.indexOf('attribute:') !== -1; });
  var attributes = map(attributeFilters, function(aF) { return aF.split(':')[1]; });

  if (indexOf(attributes, '*') === -1) {
    forEach(attributes, function(attr) {
      if (state.isConjunctiveFacet(attr) && state.isFacetRefined(attr)) {
        if (!partialState.facetsRefinements) partialState.facetsRefinements = {};
        partialState.facetsRefinements[attr] = state.facetsRefinements[attr];
      }

      if (state.isDisjunctiveFacet(attr) && state.isDisjunctiveFacetRefined(attr)) {
        if (!partialState.disjunctiveFacetsRefinements) partialState.disjunctiveFacetsRefinements = {};
        partialState.disjunctiveFacetsRefinements[attr] = state.disjunctiveFacetsRefinements[attr];
      }

      if (state.isHierarchicalFacet(attr) && state.isHierarchicalFacetRefined(attr)) {
        if (!partialState.hierarchicalFacetsRefinements) partialState.hierarchicalFacetsRefinements = {};
        partialState.hierarchicalFacetsRefinements[attr] = state.hierarchicalFacetsRefinements[attr];
      }

      var numericRefinements = state.getNumericRefinements(attr);
      if (!isEmpty(numericRefinements)) {
        if (!partialState.numericRefinements) partialState.numericRefinements = {};
        partialState.numericRefinements[attr] = state.numericRefinements[attr];
      }
    });
  } else {
    if (!isEmpty(state.numericRefinements)) {
      partialState.numericRefinements = state.numericRefinements;
    }
    if (!isEmpty(state.facetsRefinements)) partialState.facetsRefinements = state.facetsRefinements;
    if (!isEmpty(state.disjunctiveFacetsRefinements)) {
      partialState.disjunctiveFacetsRefinements = state.disjunctiveFacetsRefinements;
    }
    if (!isEmpty(state.hierarchicalFacetsRefinements)) {
      partialState.hierarchicalFacetsRefinements = state.hierarchicalFacetsRefinements;
    }
  }

  var searchParameters = filter(
    filters,
    function(f) {
      return f.indexOf('attribute:') === -1;
    }
  );

  forEach(
    searchParameters,
    function(parameterKey) {
      partialState[parameterKey] = state[parameterKey];
    }
  );

  return partialState;
}

module.exports = filterState;


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var invert = __webpack_require__(201);
var keys = __webpack_require__(9);

var keys2Short = {
  advancedSyntax: 'aS',
  allowTyposOnNumericTokens: 'aTONT',
  analyticsTags: 'aT',
  analytics: 'a',
  aroundLatLngViaIP: 'aLLVIP',
  aroundLatLng: 'aLL',
  aroundPrecision: 'aP',
  aroundRadius: 'aR',
  attributesToHighlight: 'aTH',
  attributesToRetrieve: 'aTR',
  attributesToSnippet: 'aTS',
  disjunctiveFacetsRefinements: 'dFR',
  disjunctiveFacets: 'dF',
  distinct: 'd',
  facetsExcludes: 'fE',
  facetsRefinements: 'fR',
  facets: 'f',
  getRankingInfo: 'gRI',
  hierarchicalFacetsRefinements: 'hFR',
  hierarchicalFacets: 'hF',
  highlightPostTag: 'hPoT',
  highlightPreTag: 'hPrT',
  hitsPerPage: 'hPP',
  ignorePlurals: 'iP',
  index: 'idx',
  insideBoundingBox: 'iBB',
  insidePolygon: 'iPg',
  length: 'l',
  maxValuesPerFacet: 'mVPF',
  minimumAroundRadius: 'mAR',
  minProximity: 'mP',
  minWordSizefor1Typo: 'mWS1T',
  minWordSizefor2Typos: 'mWS2T',
  numericFilters: 'nF',
  numericRefinements: 'nR',
  offset: 'o',
  optionalWords: 'oW',
  page: 'p',
  queryType: 'qT',
  query: 'q',
  removeWordsIfNoResults: 'rWINR',
  replaceSynonymsInHighlight: 'rSIH',
  restrictSearchableAttributes: 'rSA',
  synonyms: 's',
  tagFilters: 'tF',
  tagRefinements: 'tR',
  typoTolerance: 'tT',
  optionalTagFilters: 'oTF',
  optionalFacetFilters: 'oFF',
  snippetEllipsisText: 'sET',
  disableExactOnAttributes: 'dEOA',
  enableExactOnSingleWordQuery: 'eEOSWQ'
};

var short2Keys = invert(keys2Short);

module.exports = {
  /**
   * All the keys of the state, encoded.
   * @const
   */
  ENCODED_PARAMETERS: keys(short2Keys),
  /**
   * Decode a shorten attribute
   * @param {string} shortKey the shorten attribute
   * @return {string} the decoded attribute, undefined otherwise
   */
  decode: function(shortKey) {
    return short2Keys[shortKey];
  },
  /**
   * Encode an attribute into a short version
   * @param {string} key the attribute
   * @return {string} the shorten attribute
   */
  encode: function(key) {
    return keys2Short[key];
  }
};


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = generateTrees;

var last = __webpack_require__(204);
var map = __webpack_require__(17);
var reduce = __webpack_require__(52);
var orderBy = __webpack_require__(106);
var trim = __webpack_require__(207);
var find = __webpack_require__(46);
var pickBy = __webpack_require__(334);

var prepareHierarchicalFacetSortBy = __webpack_require__(116);

function generateTrees(state) {
  return function generate(hierarchicalFacetResult, hierarchicalFacetIndex) {
    var hierarchicalFacet = state.hierarchicalFacets[hierarchicalFacetIndex];
    var hierarchicalFacetRefinement = state.hierarchicalFacetsRefinements[hierarchicalFacet.name] &&
      state.hierarchicalFacetsRefinements[hierarchicalFacet.name][0] || '';
    var hierarchicalSeparator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
    var hierarchicalRootPath = state._getHierarchicalRootPath(hierarchicalFacet);
    var hierarchicalShowParentLevel = state._getHierarchicalShowParentLevel(hierarchicalFacet);
    var sortBy = prepareHierarchicalFacetSortBy(state._getHierarchicalFacetSortBy(hierarchicalFacet));

    var generateTreeFn = generateHierarchicalTree(sortBy, hierarchicalSeparator, hierarchicalRootPath,
      hierarchicalShowParentLevel, hierarchicalFacetRefinement);

    var results = hierarchicalFacetResult;

    if (hierarchicalRootPath) {
      results = hierarchicalFacetResult.slice(hierarchicalRootPath.split(hierarchicalSeparator).length);
    }

    return reduce(results, generateTreeFn, {
      name: state.hierarchicalFacets[hierarchicalFacetIndex].name,
      count: null, // root level, no count
      isRefined: true, // root level, always refined
      path: null, // root level, no path
      data: null
    });
  };
}

function generateHierarchicalTree(sortBy, hierarchicalSeparator, hierarchicalRootPath,
                                  hierarchicalShowParentLevel, currentRefinement) {
  return function generateTree(hierarchicalTree, hierarchicalFacetResult, currentHierarchicalLevel) {
    var parent = hierarchicalTree;

    if (currentHierarchicalLevel > 0) {
      var level = 0;

      parent = hierarchicalTree;

      while (level < currentHierarchicalLevel) {
        parent = parent && find(parent.data, {isRefined: true});
        level++;
      }
    }

    // we found a refined parent, let's add current level data under it
    if (parent) {
      // filter values in case an object has multiple categories:
      //   {
      //     categories: {
      //       level0: ['beers', 'bières'],
      //       level1: ['beers > IPA', 'bières > Belges']
      //     }
      //   }
      //
      // If parent refinement is `beers`, then we do not want to have `bières > Belges`
      // showing up

      var onlyMatchingValuesFn = filterFacetValues(parent.path || hierarchicalRootPath,
        currentRefinement, hierarchicalSeparator, hierarchicalRootPath, hierarchicalShowParentLevel);

      parent.data = orderBy(
        map(
          pickBy(hierarchicalFacetResult.data, onlyMatchingValuesFn),
          formatHierarchicalFacetValue(hierarchicalSeparator, currentRefinement)
        ),
        sortBy[0], sortBy[1]
      );
    }

    return hierarchicalTree;
  };
}

function filterFacetValues(parentPath, currentRefinement, hierarchicalSeparator, hierarchicalRootPath,
                           hierarchicalShowParentLevel) {
  return function(facetCount, facetValue) {
    // we want the facetValue is a child of hierarchicalRootPath
    if (hierarchicalRootPath &&
      (facetValue.indexOf(hierarchicalRootPath) !== 0 || hierarchicalRootPath === facetValue)) {
      return false;
    }

    // we always want root levels (only when there is no prefix path)
    return !hierarchicalRootPath && facetValue.indexOf(hierarchicalSeparator) === -1 ||
      // if there is a rootPath, being root level mean 1 level under rootPath
      hierarchicalRootPath &&
      facetValue.split(hierarchicalSeparator).length - hierarchicalRootPath.split(hierarchicalSeparator).length === 1 ||
      // if current refinement is a root level and current facetValue is a root level,
      // keep the facetValue
      facetValue.indexOf(hierarchicalSeparator) === -1 &&
      currentRefinement.indexOf(hierarchicalSeparator) === -1 ||
      // currentRefinement is a child of the facet value
      currentRefinement.indexOf(facetValue) === 0 ||
      // facetValue is a child of the current parent, add it
      facetValue.indexOf(parentPath + hierarchicalSeparator) === 0 &&
      (hierarchicalShowParentLevel || facetValue.indexOf(currentRefinement) === 0);
  };
}

function formatHierarchicalFacetValue(hierarchicalSeparator, currentRefinement) {
  return function format(facetCount, facetValue) {
    return {
      name: trim(last(facetValue.split(hierarchicalSeparator))),
      path: facetValue,
      count: facetCount,
      isRefined: currentRefinement === facetValue || currentRefinement.indexOf(facetValue + hierarchicalSeparator) === 0,
      data: null
    };
  };
}


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SearchParameters = __webpack_require__(81);
var SearchResults = __webpack_require__(115);
var DerivedHelper = __webpack_require__(240);
var requestBuilder = __webpack_require__(247);

var util = __webpack_require__(114);
var events = __webpack_require__(113);

var flatten = __webpack_require__(199);
var forEach = __webpack_require__(35);
var isEmpty = __webpack_require__(16);
var map = __webpack_require__(17);

var url = __webpack_require__(117);
var version = __webpack_require__(118);

/**
 * Event triggered when a parameter is set or updated
 * @event AlgoliaSearchHelper#event:change
 * @property {SearchParameters} state the current parameters with the latest changes applied
 * @property {SearchResults} lastResults the previous results received from Algolia. `null` before
 * the first request
 * @example
 * helper.on('change', function(state, lastResults) {
 *   console.log('The parameters have changed');
 * });
 */

/**
 * Event triggered when the search is sent to Algolia
 * @event AlgoliaSearchHelper#event:search
 * @property {SearchParameters} state the parameters used for this search
 * @property {SearchResults} lastResults the results from the previous search. `null` if
 * it is the first search.
 * @example
 * helper.on('search', function(state, lastResults) {
 *   console.log('Search sent');
 * });
 */

/**
 * Event triggered when the results are retrieved from Algolia
 * @event AlgoliaSearchHelper#event:result
 * @property {SearchResults} results the results received from Algolia
 * @property {SearchParameters} state the parameters used to query Algolia. Those might
 * be different from the one in the helper instance (for example if the network is unreliable).
 * @example
 * helper.on('result', function(results, state) {
 *   console.log('Search results received');
 * });
 */

/**
 * Event triggered when Algolia sends back an error. For example, if an unknown parameter is
 * used, the error can be caught using this event.
 * @event AlgoliaSearchHelper#event:error
 * @property {Error} error the error returned by the Algolia.
 * @example
 * helper.on('error', function(error) {
 *   console.log('Houston we got a problem.');
 * });
 */

/**
 * Initialize a new AlgoliaSearchHelper
 * @class
 * @classdesc The AlgoliaSearchHelper is a class that ease the management of the
 * search. It provides an event based interface for search callbacks:
 *  - change: when the internal search state is changed.
 *    This event contains a {@link SearchParameters} object and the
 *    {@link SearchResults} of the last result if any.
 *  - search: when a search is triggered using the `search()` method.
 *  - result: when the response is retrieved from Algolia and is processed.
 *    This event contains a {@link SearchResults} object and the
 *    {@link SearchParameters} corresponding to this answer.
 *  - error: when the response is an error. This event contains the error returned by the server.
 * @param  {AlgoliaSearch} client an AlgoliaSearch client
 * @param  {string} index the index name to query
 * @param  {SearchParameters | object} options an object defining the initial
 * config of the search. It doesn't have to be a {SearchParameters},
 * just an object containing the properties you need from it.
 */
function AlgoliaSearchHelper(client, index, options) {
  if (!client.addAlgoliaAgent) console.log('Please upgrade to the newest version of the JS Client.'); // eslint-disable-line
  else if (!doesClientAgentContainsHelper(client)) client.addAlgoliaAgent('JS Helper ' + version);

  this.setClient(client);
  var opts = options || {};
  opts.index = index;
  this.state = SearchParameters.make(opts);
  this.lastResults = null;
  this._queryId = 0;
  this._lastQueryIdReceived = -1;
  this.derivedHelpers = [];
}

util.inherits(AlgoliaSearchHelper, events.EventEmitter);

/**
 * Start the search with the parameters set in the state. When the
 * method is called, it triggers a `search` event. The results will
 * be available through the `result` event. If an error occcurs, an
 * `error` will be fired instead.
 * @return {AlgoliaSearchHelper}
 * @fires search
 * @fires result
 * @fires error
 * @chainable
 */
AlgoliaSearchHelper.prototype.search = function() {
  this._search();
  return this;
};

/**
 * Gets the search query parameters that would be sent to the Algolia Client
 * for the hits
 * @return {object} Query Parameters
 */
AlgoliaSearchHelper.prototype.getQuery = function() {
  var state = this.state;
  return requestBuilder._getHitsSearchParams(state);
};

/**
 * Start a search using a modified version of the current state. This method does
 * not trigger the helper lifecycle and does not modify the state kept internally
 * by the helper. This second aspect means that the next search call will be the
 * same as a search call before calling searchOnce.
 * @param {object} options can contain all the parameters that can be set to SearchParameters
 * plus the index
 * @param {function} [callback] optional callback executed when the response from the
 * server is back.
 * @return {promise|undefined} if a callback is passed the method returns undefined
 * otherwise it returns a promise containing an object with two keys :
 *  - content with a SearchResults
 *  - state with the state used for the query as a SearchParameters
 * @example
 * // Changing the number of records returned per page to 1
 * // This example uses the callback API
 * var state = helper.searchOnce({hitsPerPage: 1},
 *   function(error, content, state) {
 *     // if an error occured it will be passed in error, otherwise its value is null
 *     // content contains the results formatted as a SearchResults
 *     // state is the instance of SearchParameters used for this search
 *   });
 * @example
 * // Changing the number of records returned per page to 1
 * // This example uses the promise API
 * var state1 = helper.searchOnce({hitsPerPage: 1})
 *                 .then(promiseHandler);
 *
 * function promiseHandler(res) {
 *   // res contains
 *   // {
 *   //   content : SearchResults
 *   //   state   : SearchParameters (the one used for this specific search)
 *   // }
 * }
 */
AlgoliaSearchHelper.prototype.searchOnce = function(options, cb) {
  var tempState = !options ? this.state : this.state.setQueryParameters(options);
  var queries = requestBuilder._getQueries(tempState.index, tempState);
  if (cb) {
    return this.client.search(
      queries,
      function(err, content) {
        if (err) cb(err, null, tempState);
        else cb(err, new SearchResults(tempState, content.results), tempState);
      }
    );
  }

  return this.client.search(queries).then(function(content) {
    return {
      content: new SearchResults(tempState, content.results),
      state: tempState,
      _originalResponse: content
    };
  });
};

/**
 * Structure of each result when using
 * [`searchForFacetValues()`](reference.html#AlgoliaSearchHelper#searchForFacetValues)
 * @typedef FacetSearchHit
 * @type {object}
 * @property {string} value the facet value
 * @property {string} highlighted the facet value highlighted with the query string
 * @property {number} count number of occurence of this facet value
 * @property {boolean} isRefined true if the value is already refined
 */

/**
 * Structure of the data resolved by the
 * [`searchForFacetValues()`](reference.html#AlgoliaSearchHelper#searchForFacetValues)
 * promise.
 * @typedef FacetSearchResult
 * @type {objet}
 * @property {FacetSearchHit} facetHits the results for this search for facet values
 * @property {number} processingTimeMS time taken by the query insde the engine
 */

/**
 * Search for facet values based on an query and the name of a facetted attribute. This
 * triggers a search and will retrun a promise. On top of using the query, it also sends
 * the parameters from the state so that the search is narrowed to only the possible values.
 *
 * See the description of [FacetSearchResult](reference.html#FacetSearchResult)
 * @param {string} query the string query for the search
 * @param {string} facet the name of the facetted attribute
 * @return {promise<FacetSearchResult>} the results of the search
 */
AlgoliaSearchHelper.prototype.searchForFacetValues = function(facet, query) {
  var state = this.state;
  var index = this.client.initIndex(this.state.index);
  var isDisjunctive = state.isDisjunctiveFacet(facet);
  var algoliaQuery = requestBuilder.getSearchForFacetQuery(facet, query, this.state);
  return index.searchForFacetValues(algoliaQuery).then(function addIsRefined(content) {
    content.facetHits = forEach(content.facetHits, function(f) {
      f.isRefined = isDisjunctive ?
        state.isDisjunctiveFacetRefined(facet, f.value) :
        state.isFacetRefined(facet, f.value);
    });

    return content;
  });
};

/**
 * Sets the text query used for the search.
 *
 * This method resets the current page to 0.
 * @param  {string} q the user query
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.setQuery = function(q) {
  this.state = this.state.setPage(0).setQuery(q);
  this._change();
  return this;
};

/**
 * Remove all the types of refinements except tags. A string can be provided to remove
 * only the refinements of a specific attribute. For more advanced use case, you can
 * provide a function instead. This function should follow the
 * [clearCallback definition](#SearchParameters.clearCallback).
 *
 * This method resets the current page to 0.
 * @param {string} [name] optional name of the facet / attribute on which we want to remove all refinements
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 * @example
 * // Removing all the refinements
 * helper.clearRefinements().search();
 * @example
 * // Removing all the filters on a the category attribute.
 * helper.clearRefinements('category').search();
 * @example
 * // Removing only the exclude filters on the category facet.
 * helper.clearRefinements(function(value, attribute, type) {
 *   return type === 'exclude' && attribute === 'category';
 * }).search();
 */
AlgoliaSearchHelper.prototype.clearRefinements = function(name) {
  this.state = this.state.setPage(0).clearRefinements(name);
  this._change();
  return this;
};

/**
 * Remove all the tag filters.
 *
 * This method resets the current page to 0.
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.clearTags = function() {
  this.state = this.state.setPage(0).clearTags();
  this._change();
  return this;
};

/**
 * Adds a disjunctive filter to a facetted attribute with the `value` provided. If the
 * filter is already set, it doesn't change the filters.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value (will be converted to string)
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.addDisjunctiveFacetRefinement = function(facet, value) {
  this.state = this.state.setPage(0).addDisjunctiveFacetRefinement(facet, value);
  this._change();
  return this;
};

/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#addDisjunctiveFacetRefinement}
 */
AlgoliaSearchHelper.prototype.addDisjunctiveRefine = function() {
  return this.addDisjunctiveFacetRefinement.apply(this, arguments);
};

/**
 * Adds a refinement on a hierarchical facet. It will throw
 * an exception if the facet is not defined or if the facet
 * is already refined.
 *
 * This method resets the current page to 0.
 * @param {string} facet the facet name
 * @param {string} path the hierarchical facet path
 * @return {AlgoliaSearchHelper}
 * @throws Error if the facet is not defined or if the facet is refined
 * @chainable
 * @fires change
 */
AlgoliaSearchHelper.prototype.addHierarchicalFacetRefinement = function(facet, value) {
  this.state = this.state.setPage(0).addHierarchicalFacetRefinement(facet, value);
  this._change();
  return this;
};

/**
 * Adds a an numeric filter to an attribute with the `operator` and `value` provided. If the
 * filter is already set, it doesn't change the filters.
 *
 * This method resets the current page to 0.
 * @param  {string} attribute the attribute on which the numeric filter applies
 * @param  {string} operator the operator of the filter
 * @param  {number} value the value of the filter
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.addNumericRefinement = function(attribute, operator, value) {
  this.state = this.state.setPage(0).addNumericRefinement(attribute, operator, value);
  this._change();
  return this;
};

/**
 * Adds a filter to a facetted attribute with the `value` provided. If the
 * filter is already set, it doesn't change the filters.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value (will be converted to string)
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.addFacetRefinement = function(facet, value) {
  this.state = this.state.setPage(0).addFacetRefinement(facet, value);
  this._change();
  return this;
};

/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#addFacetRefinement}
 */
AlgoliaSearchHelper.prototype.addRefine = function() {
  return this.addFacetRefinement.apply(this, arguments);
};


/**
 * Adds a an exclusion filter to a facetted attribute with the `value` provided. If the
 * filter is already set, it doesn't change the filters.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value (will be converted to string)
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.addFacetExclusion = function(facet, value) {
  this.state = this.state.setPage(0).addExcludeRefinement(facet, value);
  this._change();
  return this;
};

/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#addFacetExclusion}
 */
AlgoliaSearchHelper.prototype.addExclude = function() {
  return this.addFacetExclusion.apply(this, arguments);
};

/**
 * Adds a tag filter with the `tag` provided. If the
 * filter is already set, it doesn't change the filters.
 *
 * This method resets the current page to 0.
 * @param {string} tag the tag to add to the filter
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.addTag = function(tag) {
  this.state = this.state.setPage(0).addTagRefinement(tag);
  this._change();
  return this;
};

/**
 * Removes an numeric filter to an attribute with the `operator` and `value` provided. If the
 * filter is not set, it doesn't change the filters.
 *
 * Some parameters are optionnals, triggering different behaviors:
 *  - if the value is not provided, then all the numeric value will be removed for the
 *  specified attribute/operator couple.
 *  - if the operator is not provided either, then all the numeric filter on this attribute
 *  will be removed.
 *
 * This method resets the current page to 0.
 * @param  {string} attribute the attribute on which the numeric filter applies
 * @param  {string} [operator] the operator of the filter
 * @param  {number} [value] the value of the filter
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.removeNumericRefinement = function(attribute, operator, value) {
  this.state = this.state.setPage(0).removeNumericRefinement(attribute, operator, value);
  this._change();
  return this;
};

/**
 * Removes a disjunctive filter to a facetted attribute with the `value` provided. If the
 * filter is not set, it doesn't change the filters.
 *
 * If the value is omitted, then this method will remove all the filters for the
 * attribute.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} [value] the associated value
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.removeDisjunctiveFacetRefinement = function(facet, value) {
  this.state = this.state.setPage(0).removeDisjunctiveFacetRefinement(facet, value);
  this._change();
  return this;
};

/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#removeDisjunctiveFacetRefinement}
 */
AlgoliaSearchHelper.prototype.removeDisjunctiveRefine = function() {
  return this.removeDisjunctiveFacetRefinement.apply(this, arguments);
};

/**
 * Removes the refinement set on a hierarchical facet.
 * @param {string} facet the facet name
 * @return {AlgoliaSearchHelper}
 * @throws Error if the facet is not defined or if the facet is not refined
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.removeHierarchicalFacetRefinement = function(facet) {
  this.state = this.state.setPage(0).removeHierarchicalFacetRefinement(facet);
  this._change();

  return this;
};

/**
 * Removes a filter to a facetted attribute with the `value` provided. If the
 * filter is not set, it doesn't change the filters.
 *
 * If the value is omitted, then this method will remove all the filters for the
 * attribute.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} [value] the associated value
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.removeFacetRefinement = function(facet, value) {
  this.state = this.state.setPage(0).removeFacetRefinement(facet, value);
  this._change();
  return this;
};

/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#removeFacetRefinement}
 */
AlgoliaSearchHelper.prototype.removeRefine = function() {
  return this.removeFacetRefinement.apply(this, arguments);
};

/**
 * Removes an exclusion filter to a facetted attribute with the `value` provided. If the
 * filter is not set, it doesn't change the filters.
 *
 * If the value is omitted, then this method will remove all the filters for the
 * attribute.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} [value] the associated value
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.removeFacetExclusion = function(facet, value) {
  this.state = this.state.setPage(0).removeExcludeRefinement(facet, value);
  this._change();
  return this;
};

/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#removeFacetExclusion}
 */
AlgoliaSearchHelper.prototype.removeExclude = function() {
  return this.removeFacetExclusion.apply(this, arguments);
};

/**
 * Removes a tag filter with the `tag` provided. If the
 * filter is not set, it doesn't change the filters.
 *
 * This method resets the current page to 0.
 * @param {string} tag tag to remove from the filter
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.removeTag = function(tag) {
  this.state = this.state.setPage(0).removeTagRefinement(tag);
  this._change();
  return this;
};

/**
 * Adds or removes an exclusion filter to a facetted attribute with the `value` provided. If
 * the value is set then it removes it, otherwise it adds the filter.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.toggleFacetExclusion = function(facet, value) {
  this.state = this.state.setPage(0).toggleExcludeFacetRefinement(facet, value);
  this._change();
  return this;
};

/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#toggleFacetExclusion}
 */
AlgoliaSearchHelper.prototype.toggleExclude = function() {
  return this.toggleFacetExclusion.apply(this, arguments);
};

/**
 * Adds or removes a filter to a facetted attribute with the `value` provided. If
 * the value is set then it removes it, otherwise it adds the filter.
 *
 * This method can be used for conjunctive, disjunctive and hierarchical filters.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value
 * @return {AlgoliaSearchHelper}
 * @throws Error will throw an error if the facet is not declared in the settings of the helper
 * @fires change
 * @chainable
 * @deprecated since version 2.19.0, see {@link AlgoliaSearchHelper#toggleFacetRefinement}
 */
AlgoliaSearchHelper.prototype.toggleRefinement = function(facet, value) {
  return this.toggleFacetRefinement(facet, value);
};

/**
 * Adds or removes a filter to a facetted attribute with the `value` provided. If
 * the value is set then it removes it, otherwise it adds the filter.
 *
 * This method can be used for conjunctive, disjunctive and hierarchical filters.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value
 * @return {AlgoliaSearchHelper}
 * @throws Error will throw an error if the facet is not declared in the settings of the helper
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.toggleFacetRefinement = function(facet, value) {
  this.state = this.state.setPage(0).toggleFacetRefinement(facet, value);

  this._change();
  return this;
};

/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#toggleFacetRefinement}
 */
AlgoliaSearchHelper.prototype.toggleRefine = function() {
  return this.toggleFacetRefinement.apply(this, arguments);
};

/**
 * Adds or removes a tag filter with the `value` provided. If
 * the value is set then it removes it, otherwise it adds the filter.
 *
 * This method resets the current page to 0.
 * @param {string} tag tag to remove or add
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.toggleTag = function(tag) {
  this.state = this.state.setPage(0).toggleTagRefinement(tag);
  this._change();
  return this;
};

/**
 * Increments the page number by one.
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 * @example
 * helper.setPage(0).nextPage().getPage();
 * // returns 1
 */
AlgoliaSearchHelper.prototype.nextPage = function() {
  return this.setPage(this.state.page + 1);
};

/**
 * Decrements the page number by one.
 * @fires change
 * @return {AlgoliaSearchHelper}
 * @chainable
 * @example
 * helper.setPage(1).previousPage().getPage();
 * // returns 0
 */
AlgoliaSearchHelper.prototype.previousPage = function() {
  return this.setPage(this.state.page - 1);
};

/**
 * @private
 */
function setCurrentPage(page) {
  if (page < 0) throw new Error('Page requested below 0.');

  this.state = this.state.setPage(page);
  this._change();
  return this;
}

/**
 * Change the current page
 * @deprecated
 * @param  {number} page The page number
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.setCurrentPage = setCurrentPage;

/**
 * Updates the current page.
 * @function
 * @param  {number} page The page number
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.setPage = setCurrentPage;

/**
 * Updates the name of the index that will be targeted by the query.
 *
 * This method resets the current page to 0.
 * @param {string} name the index name
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.setIndex = function(name) {
  this.state = this.state.setPage(0).setIndex(name);
  this._change();
  return this;
};

/**
 * Update a parameter of the search. This method reset the page
 *
 * The complete list of parameters is available on the
 * [Algolia website](https://www.algolia.com/doc/rest#query-an-index).
 * The most commonly used parameters have their own [shortcuts](#query-parameters-shortcuts)
 * or benefit from higher-level APIs (all the kind of filters and facets have their own API)
 *
 * This method resets the current page to 0.
 * @param {string} parameter name of the parameter to update
 * @param {any} value new value of the parameter
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 * @example
 * helper.setQueryParameter('hitsPerPage', 20).search();
 */
AlgoliaSearchHelper.prototype.setQueryParameter = function(parameter, value) {
  var newState = this.state.setPage(0).setQueryParameter(parameter, value);

  if (this.state === newState) return this;

  this.state = newState;
  this._change();
  return this;
};

/**
 * Set the whole state (warning: will erase previous state)
 * @param {SearchParameters} newState the whole new state
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.setState = function(newState) {
  this.state = new SearchParameters(newState);
  this._change();
  return this;
};

/**
 * Get the current search state stored in the helper. This object is immutable.
 * @param {string[]} [filters] optionnal filters to retrieve only a subset of the state
 * @return {SearchParameters|object} if filters is specified a plain object is
 * returned containing only the requested fields, otherwise return the unfiltered
 * state
 * @example
 * // Get the complete state as stored in the helper
 * helper.getState();
 * @example
 * // Get a part of the state with all the refinements on attributes and the query
 * helper.getState(['query', 'attribute:category']);
 */
AlgoliaSearchHelper.prototype.getState = function(filters) {
  if (filters === undefined) return this.state;
  return this.state.filter(filters);
};

/**
 * DEPRECATED Get part of the state as a query string. By default, the output keys will not
 * be prefixed and will only take the applied refinements and the query.
 * @deprecated
 * @param {object} [options] May contain the following parameters :
 *
 * **filters** : possible values are all the keys of the [SearchParameters](#searchparameters), `index` for
 * the index, all the refinements with `attribute:*` or for some specific attributes with
 * `attribute:theAttribute`
 *
 * **prefix** : prefix in front of the keys
 *
 * **moreAttributes** : more values to be added in the query string. Those values
 *    won't be prefixed.
 * @return {string} the query string
 */
AlgoliaSearchHelper.prototype.getStateAsQueryString = function getStateAsQueryString(options) {
  var filters = options && options.filters || ['query', 'attribute:*'];
  var partialState = this.getState(filters);

  return url.getQueryStringFromState(partialState, options);
};

/**
 * DEPRECATED Read a query string and return an object containing the state. Use
 * url module.
 * @deprecated
 * @static
 * @param {string} queryString the query string that will be decoded
 * @param {object} options accepted options :
 *   - prefix : the prefix used for the saved attributes, you have to provide the
 *     same that was used for serialization
 * @return {object} partial search parameters object (same properties than in the
 * SearchParameters but not exhaustive)
 * @see {@link url#getStateFromQueryString}
 */
AlgoliaSearchHelper.getConfigurationFromQueryString = url.getStateFromQueryString;

/**
 * DEPRECATED Retrieve an object of all the properties that are not understandable as helper
 * parameters. Use url module.
 * @deprecated
 * @static
 * @param {string} queryString the query string to read
 * @param {object} options the options
 *   - prefixForParameters : prefix used for the helper configuration keys
 * @return {object} the object containing the parsed configuration that doesn't
 * to the helper
 */
AlgoliaSearchHelper.getForeignConfigurationInQueryString = url.getUnrecognizedParametersInQueryString;

/**
 * DEPRECATED Overrides part of the state with the properties stored in the provided query
 * string.
 * @deprecated
 * @param {string} queryString the query string containing the informations to url the state
 * @param {object} options optionnal parameters :
 *  - prefix : prefix used for the algolia parameters
 *  - triggerChange : if set to true the state update will trigger a change event
 */
AlgoliaSearchHelper.prototype.setStateFromQueryString = function(queryString, options) {
  var triggerChange = options && options.triggerChange || false;
  var configuration = url.getStateFromQueryString(queryString, options);
  var updatedState = this.state.setQueryParameters(configuration);

  if (triggerChange) this.setState(updatedState);
  else this.overrideStateWithoutTriggeringChangeEvent(updatedState);
};

/**
 * Override the current state without triggering a change event.
 * Do not use this method unless you know what you are doing. (see the example
 * for a legit use case)
 * @param {SearchParameters} newState the whole new state
 * @return {AlgoliaSearchHelper}
 * @example
 *  helper.on('change', function(state){
 *    // In this function you might want to find a way to store the state in the url/history
 *    updateYourURL(state)
 *  })
 *  window.onpopstate = function(event){
 *    // This is naive though as you should check if the state is really defined etc.
 *    helper.overrideStateWithoutTriggeringChangeEvent(event.state).search()
 *  }
 * @chainable
 */
AlgoliaSearchHelper.prototype.overrideStateWithoutTriggeringChangeEvent = function(newState) {
  this.state = new SearchParameters(newState);
  return this;
};

/**
 * @deprecated since 2.4.0, see {@link AlgoliaSearchHelper#hasRefinements}
 */
AlgoliaSearchHelper.prototype.isRefined = function(facet, value) {
  if (this.state.isConjunctiveFacet(facet)) {
    return this.state.isFacetRefined(facet, value);
  } else if (this.state.isDisjunctiveFacet(facet)) {
    return this.state.isDisjunctiveFacetRefined(facet, value);
  }

  throw new Error(facet +
    ' is not properly defined in this helper configuration' +
    '(use the facets or disjunctiveFacets keys to configure it)');
};

/**
 * Check if an attribute has any numeric, conjunctive, disjunctive or hierarchical filters.
 * @param {string} attribute the name of the attribute
 * @return {boolean} true if the attribute is filtered by at least one value
 * @example
 * // hasRefinements works with numeric, conjunctive, disjunctive and hierarchical filters
 * helper.hasRefinements('price'); // false
 * helper.addNumericRefinement('price', '>', 100);
 * helper.hasRefinements('price'); // true
 *
 * helper.hasRefinements('color'); // false
 * helper.addFacetRefinement('color', 'blue');
 * helper.hasRefinements('color'); // true
 *
 * helper.hasRefinements('material'); // false
 * helper.addDisjunctiveFacetRefinement('material', 'plastic');
 * helper.hasRefinements('material'); // true
 *
 * helper.hasRefinements('categories'); // false
 * helper.toggleFacetRefinement('categories', 'kitchen > knife');
 * helper.hasRefinements('categories'); // true
 *
 */
AlgoliaSearchHelper.prototype.hasRefinements = function(attribute) {
  if (!isEmpty(this.state.getNumericRefinements(attribute))) {
    return true;
  } else if (this.state.isConjunctiveFacet(attribute)) {
    return this.state.isFacetRefined(attribute);
  } else if (this.state.isDisjunctiveFacet(attribute)) {
    return this.state.isDisjunctiveFacetRefined(attribute);
  } else if (this.state.isHierarchicalFacet(attribute)) {
    return this.state.isHierarchicalFacetRefined(attribute);
  }

  // there's currently no way to know that the user did call `addNumericRefinement` at some point
  // thus we cannot distinguish if there once was a numeric refinement that was cleared
  // so we will return false in every other situations to be consistent
  // while what we should do here is throw because we did not find the attribute in any type
  // of refinement
  return false;
};

/**
 * Check if a value is excluded for a specific facetted attribute. If the value
 * is omitted then the function checks if there is any excluding refinements.
 *
 * @param  {string}  facet name of the attribute for used for facetting
 * @param  {string}  [value] optionnal value. If passed will test that this value
   * is filtering the given facet.
 * @return {boolean} true if refined
 * @example
 * helper.isExcludeRefined('color'); // false
 * helper.isExcludeRefined('color', 'blue') // false
 * helper.isExcludeRefined('color', 'red') // false
 *
 * helper.addFacetExclusion('color', 'red');
 *
 * helper.isExcludeRefined('color'); // true
 * helper.isExcludeRefined('color', 'blue') // false
 * helper.isExcludeRefined('color', 'red') // true
 */
AlgoliaSearchHelper.prototype.isExcluded = function(facet, value) {
  return this.state.isExcludeRefined(facet, value);
};

/**
 * @deprecated since 2.4.0, see {@link AlgoliaSearchHelper#hasRefinements}
 */
AlgoliaSearchHelper.prototype.isDisjunctiveRefined = function(facet, value) {
  return this.state.isDisjunctiveFacetRefined(facet, value);
};

/**
 * Check if the string is a currently filtering tag.
 * @param {string} tag tag to check
 * @return {boolean}
 */
AlgoliaSearchHelper.prototype.hasTag = function(tag) {
  return this.state.isTagRefined(tag);
};

/**
 * @deprecated since 2.4.0, see {@link AlgoliaSearchHelper#hasTag}
 */
AlgoliaSearchHelper.prototype.isTagRefined = function() {
  return this.hasTagRefinements.apply(this, arguments);
};


/**
 * Get the name of the currently used index.
 * @return {string}
 * @example
 * helper.setIndex('highestPrice_products').getIndex();
 * // returns 'highestPrice_products'
 */
AlgoliaSearchHelper.prototype.getIndex = function() {
  return this.state.index;
};

function getCurrentPage() {
  return this.state.page;
}

/**
 * Get the currently selected page
 * @deprecated
 * @return {number} the current page
 */
AlgoliaSearchHelper.prototype.getCurrentPage = getCurrentPage;
/**
 * Get the currently selected page
 * @function
 * @return {number} the current page
 */
AlgoliaSearchHelper.prototype.getPage = getCurrentPage;

/**
 * Get all the tags currently set to filters the results.
 *
 * @return {string[]} The list of tags currently set.
 */
AlgoliaSearchHelper.prototype.getTags = function() {
  return this.state.tagRefinements;
};

/**
 * Get a parameter of the search by its name. It is possible that a parameter is directly
 * defined in the index dashboard, but it will be undefined using this method.
 *
 * The complete list of parameters is
 * available on the
 * [Algolia website](https://www.algolia.com/doc/rest#query-an-index).
 * The most commonly used parameters have their own [shortcuts](#query-parameters-shortcuts)
 * or benefit from higher-level APIs (all the kind of filters have their own API)
 * @param {string} parameterName the parameter name
 * @return {any} the parameter value
 * @example
 * var hitsPerPage = helper.getQueryParameter('hitsPerPage');
 */
AlgoliaSearchHelper.prototype.getQueryParameter = function(parameterName) {
  return this.state.getQueryParameter(parameterName);
};

/**
 * Get the list of refinements for a given attribute. This method works with
 * conjunctive, disjunctive, excluding and numerical filters.
 *
 * See also SearchResults#getRefinements
 *
 * @param {string} facetName attribute name used for facetting
 * @return {Array.<FacetRefinement|NumericRefinement>} All Refinement are objects that contain a value, and
 * a type. Numeric also contains an operator.
 * @example
 * helper.addNumericRefinement('price', '>', 100);
 * helper.getRefinements('price');
 * // [
 * //   {
 * //     "value": [
 * //       100
 * //     ],
 * //     "operator": ">",
 * //     "type": "numeric"
 * //   }
 * // ]
 * @example
 * helper.addFacetRefinement('color', 'blue');
 * helper.addFacetExclusion('color', 'red');
 * helper.getRefinements('color');
 * // [
 * //   {
 * //     "value": "blue",
 * //     "type": "conjunctive"
 * //   },
 * //   {
 * //     "value": "red",
 * //     "type": "exclude"
 * //   }
 * // ]
 * @example
 * helper.addDisjunctiveFacetRefinement('material', 'plastic');
 * // [
 * //   {
 * //     "value": "plastic",
 * //     "type": "disjunctive"
 * //   }
 * // ]
 */
AlgoliaSearchHelper.prototype.getRefinements = function(facetName) {
  var refinements = [];

  if (this.state.isConjunctiveFacet(facetName)) {
    var conjRefinements = this.state.getConjunctiveRefinements(facetName);

    forEach(conjRefinements, function(r) {
      refinements.push({
        value: r,
        type: 'conjunctive'
      });
    });

    var excludeRefinements = this.state.getExcludeRefinements(facetName);

    forEach(excludeRefinements, function(r) {
      refinements.push({
        value: r,
        type: 'exclude'
      });
    });
  } else if (this.state.isDisjunctiveFacet(facetName)) {
    var disjRefinements = this.state.getDisjunctiveRefinements(facetName);

    forEach(disjRefinements, function(r) {
      refinements.push({
        value: r,
        type: 'disjunctive'
      });
    });
  }

  var numericRefinements = this.state.getNumericRefinements(facetName);

  forEach(numericRefinements, function(value, operator) {
    refinements.push({
      value: value,
      operator: operator,
      type: 'numeric'
    });
  });

  return refinements;
};

/**
 * Return the current refinement for the (attribute, operator)
 * @param {string} attribute of the record
 * @param {string} operator applied
 * @return {number} value of the refinement
 */
AlgoliaSearchHelper.prototype.getNumericRefinement = function(attribute, operator) {
  return this.state.getNumericRefinement(attribute, operator);
};

/**
 * Get the current breadcrumb for a hierarchical facet, as an array
 * @param  {string} facetName Hierarchical facet name
 * @return {array.<string>} the path as an array of string
 */
AlgoliaSearchHelper.prototype.getHierarchicalFacetBreadcrumb = function(facetName) {
  return this.state.getHierarchicalFacetBreadcrumb(facetName);
};

// /////////// PRIVATE

/**
 * Perform the underlying queries
 * @private
 * @return {undefined}
 * @fires search
 * @fires result
 * @fires error
 */
AlgoliaSearchHelper.prototype._search = function() {
  var state = this.state;
  var mainQueries = requestBuilder._getQueries(state.index, state);

  var states = [{
    state: state,
    queriesCount: mainQueries.length,
    helper: this
  }];

  this.emit('search', state, this.lastResults);

  var derivedQueries = map(this.derivedHelpers, function(derivedHelper) {
    var derivedState = derivedHelper.getModifiedState(state);
    var queries = requestBuilder._getQueries(derivedState.index, derivedState);
    states.push({
      state: derivedState,
      queriesCount: queries.length,
      helper: derivedHelper
    });
    derivedHelper.emit('search', derivedState, derivedHelper.lastResults);
    return queries;
  });

  var queries = mainQueries.concat(flatten(derivedQueries));
  var queryId = this._queryId++;

  this.client.search(queries, this._dispatchAlgoliaResponse.bind(this, states, queryId));
};

/**
 * Transform the responses as sent by the server and transform them into a user
 * usable objet that merge the results of all the batch requests. It will dispatch
 * over the different helper + derived helpers (when there are some).
 * @private
 * @param {array.<{SearchParameters, AlgoliaQueries, AlgoliaSearchHelper}>}
 *  state state used for to generate the request
 * @param {number} queryId id of the current request
 * @param {Error} err error if any, null otherwise
 * @param {object} content content of the response
 * @return {undefined}
 */
AlgoliaSearchHelper.prototype._dispatchAlgoliaResponse = function(states, queryId, err, content) {
  if (queryId < this._lastQueryIdReceived) {
    // Outdated answer
    return;
  }

  this._lastQueryIdReceived = queryId;

  if (err) {
    this.emit('error', err);
    return;
  }

  var results = content.results;
  forEach(states, function(s) {
    var state = s.state;
    var queriesCount = s.queriesCount;
    var helper = s.helper;

    var specificResults = results.splice(0, queriesCount);

    var formattedResponse = helper.lastResults = new SearchResults(state, specificResults);
    helper.emit('result', formattedResponse, state);
  });
};

AlgoliaSearchHelper.prototype.containsRefinement = function(query, facetFilters, numericFilters, tagFilters) {
  return query ||
    facetFilters.length !== 0 ||
    numericFilters.length !== 0 ||
    tagFilters.length !== 0;
};

/**
 * Test if there are some disjunctive refinements on the facet
 * @private
 * @param {string} facet the attribute to test
 * @return {boolean}
 */
AlgoliaSearchHelper.prototype._hasDisjunctiveRefinements = function(facet) {
  return this.state.disjunctiveRefinements[facet] &&
    this.state.disjunctiveRefinements[facet].length > 0;
};

AlgoliaSearchHelper.prototype._change = function() {
  this.emit('change', this.state, this.lastResults);
};

/**
 * Clears the cache of the underlying Algolia client.
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.clearCache = function() {
  this.client.clearCache();
  return this;
};

/**
 * Updates the internal client instance. If the reference of the clients
 * are equal then no update is actually done.
 * @param  {AlgoliaSearch} newClient an AlgoliaSearch client
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.setClient = function(newClient) {
  if (this.client === newClient) return this;

  if (newClient.addAlgoliaAgent && !doesClientAgentContainsHelper(newClient)) newClient.addAlgoliaAgent('JS Helper ' + version);
  this.client = newClient;

  return this;
};

/**
 * Gets the instance of the currently used client.
 * @return {AlgoliaSearch}
 */
AlgoliaSearchHelper.prototype.getClient = function() {
  return this.client;
};

/**
 * Creates an derived instance of the Helper. A derived helper
 * is a way to request other indices synchronised with the lifecycle
 * of the main Helper. This mechanism uses the multiqueries feature
 * of Algolia to aggregate all the requests in a single network call.
 *
 * This method takes a function that is used to create a new SearchParameter
 * that will be used to create requests to Algolia. Those new requests
 * are created just before the `search` event. The signature of the function
 * is `SearchParameters -> SearchParameters`.
 *
 * This method returns a new DerivedHelper which is an EventEmitter
 * that fires the same `search`, `result` and `error` events. Those
 * events, however, will receive data specific to this DerivedHelper
 * and the SearchParameters that is returned by the call of the
 * parameter function.
 * @param {function} fn SearchParameters -> SearchParameters
 * @return {DerivedHelper}
 */
AlgoliaSearchHelper.prototype.derive = function(fn) {
  var derivedHelper = new DerivedHelper(this, fn);
  this.derivedHelpers.push(derivedHelper);
  return derivedHelper;
};

/**
 * This method detaches a derived Helper from the main one. Prefer using the one from the
 * derived helper itself, to remove the event listeners too.
 * @private
 * @return {undefined}
 * @throws Error
 */
AlgoliaSearchHelper.prototype.detachDerivedHelper = function(derivedHelper) {
  var pos = this.derivedHelpers.indexOf(derivedHelper);
  if (pos === -1) throw new Error('Derived helper already detached');
  this.derivedHelpers.splice(pos, 1);
};

/**
 * @typedef AlgoliaSearchHelper.NumericRefinement
 * @type {object}
 * @property {number[]} value the numbers that are used for filtering this attribute with
 * the operator specified.
 * @property {string} operator the facetting data: value, number of entries
 * @property {string} type will be 'numeric'
 */

/**
 * @typedef AlgoliaSearchHelper.FacetRefinement
 * @type {object}
 * @property {string} value the string use to filter the attribute
 * @property {string} type the type of filter: 'conjunctive', 'disjunctive', 'exclude'
 */


/*
 * This function tests if the _ua parameter of the client
 * already contains the JS Helper UA
 */
function doesClientAgentContainsHelper(client) {
  // this relies on JS Client internal variable, this might break if implementation changes
  var currentAgent = client._ua;
  return !currentAgent ? false :
    currentAgent.indexOf('JS Helper') !== -1;
}

module.exports = AlgoliaSearchHelper;


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var map = __webpack_require__(17);
var isArray = __webpack_require__(0);
var isNumber = __webpack_require__(202);
var isString = __webpack_require__(49);
function valToNumber(v) {
  if (isNumber(v)) {
    return v;
  } else if (isString(v)) {
    return parseFloat(v);
  } else if (isArray(v)) {
    return map(v, valToNumber);
  }

  throw new Error('The value should be a number, a parseable string or an array of those.');
}

module.exports = valToNumber;


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach = __webpack_require__(35);
var map = __webpack_require__(17);
var reduce = __webpack_require__(52);
var merge = __webpack_require__(105);
var isArray = __webpack_require__(0);

var requestBuilder = {
  /**
   * Get all the queries to send to the client, those queries can used directly
   * with the Algolia client.
   * @private
   * @return {object[]} The queries
   */
  _getQueries: function getQueries(index, state) {
    var queries = [];

    // One query for the hits
    queries.push({
      indexName: index,
      params: requestBuilder._getHitsSearchParams(state)
    });

    // One for each disjunctive facets
    forEach(state.getRefinedDisjunctiveFacets(), function(refinedFacet) {
      queries.push({
        indexName: index,
        params: requestBuilder._getDisjunctiveFacetSearchParams(state, refinedFacet)
      });
    });

    // maybe more to get the root level of hierarchical facets when activated
    forEach(state.getRefinedHierarchicalFacets(), function(refinedFacet) {
      var hierarchicalFacet = state.getHierarchicalFacetByName(refinedFacet);

      var currentRefinement = state.getHierarchicalRefinement(refinedFacet);
      // if we are deeper than level 0 (starting from `beer > IPA`)
      // we want to get the root values
      var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
      if (currentRefinement.length > 0 && currentRefinement[0].split(separator).length > 1) {
        queries.push({
          indexName: index,
          params: requestBuilder._getDisjunctiveFacetSearchParams(state, refinedFacet, true)
        });
      }
    });

    return queries;
  },

  /**
   * Build search parameters used to fetch hits
   * @private
   * @return {object.<string, any>}
   */
  _getHitsSearchParams: function(state) {
    var facets = state.facets
      .concat(state.disjunctiveFacets)
      .concat(requestBuilder._getHitsHierarchicalFacetsAttributes(state));


    var facetFilters = requestBuilder._getFacetFilters(state);
    var numericFilters = requestBuilder._getNumericFilters(state);
    var tagFilters = requestBuilder._getTagFilters(state);
    var additionalParams = {
      facets: facets,
      tagFilters: tagFilters
    };

    if (facetFilters.length > 0) {
      additionalParams.facetFilters = facetFilters;
    }

    if (numericFilters.length > 0) {
      additionalParams.numericFilters = numericFilters;
    }

    return merge(state.getQueryParams(), additionalParams);
  },

  /**
   * Build search parameters used to fetch a disjunctive facet
   * @private
   * @param  {string} facet the associated facet name
   * @param  {boolean} hierarchicalRootLevel ?? FIXME
   * @return {object}
   */
  _getDisjunctiveFacetSearchParams: function(state, facet, hierarchicalRootLevel) {
    var facetFilters = requestBuilder._getFacetFilters(state, facet, hierarchicalRootLevel);
    var numericFilters = requestBuilder._getNumericFilters(state, facet);
    var tagFilters = requestBuilder._getTagFilters(state);
    var additionalParams = {
      hitsPerPage: 1,
      page: 0,
      attributesToRetrieve: [],
      attributesToHighlight: [],
      attributesToSnippet: [],
      tagFilters: tagFilters
    };

    var hierarchicalFacet = state.getHierarchicalFacetByName(facet);

    if (hierarchicalFacet) {
      additionalParams.facets = requestBuilder._getDisjunctiveHierarchicalFacetAttribute(
        state,
        hierarchicalFacet,
        hierarchicalRootLevel
      );
    } else {
      additionalParams.facets = facet;
    }

    if (numericFilters.length > 0) {
      additionalParams.numericFilters = numericFilters;
    }

    if (facetFilters.length > 0) {
      additionalParams.facetFilters = facetFilters;
    }

    return merge(state.getQueryParams(), additionalParams);
  },

  /**
   * Return the numeric filters in an algolia request fashion
   * @private
   * @param {string} [facetName] the name of the attribute for which the filters should be excluded
   * @return {string[]} the numeric filters in the algolia format
   */
  _getNumericFilters: function(state, facetName) {
    if (state.numericFilters) {
      return state.numericFilters;
    }

    var numericFilters = [];

    forEach(state.numericRefinements, function(operators, attribute) {
      forEach(operators, function(values, operator) {
        if (facetName !== attribute) {
          forEach(values, function(value) {
            if (isArray(value)) {
              var vs = map(value, function(v) {
                return attribute + operator + v;
              });
              numericFilters.push(vs);
            } else {
              numericFilters.push(attribute + operator + value);
            }
          });
        }
      });
    });

    return numericFilters;
  },

  /**
   * Return the tags filters depending
   * @private
   * @return {string}
   */
  _getTagFilters: function(state) {
    if (state.tagFilters) {
      return state.tagFilters;
    }

    return state.tagRefinements.join(',');
  },


  /**
   * Build facetFilters parameter based on current refinements. The array returned
   * contains strings representing the facet filters in the algolia format.
   * @private
   * @param  {string} [facet] if set, the current disjunctive facet
   * @return {array.<string>}
   */
  _getFacetFilters: function(state, facet, hierarchicalRootLevel) {
    var facetFilters = [];

    forEach(state.facetsRefinements, function(facetValues, facetName) {
      forEach(facetValues, function(facetValue) {
        facetFilters.push(facetName + ':' + facetValue);
      });
    });

    forEach(state.facetsExcludes, function(facetValues, facetName) {
      forEach(facetValues, function(facetValue) {
        facetFilters.push(facetName + ':-' + facetValue);
      });
    });

    forEach(state.disjunctiveFacetsRefinements, function(facetValues, facetName) {
      if (facetName === facet || !facetValues || facetValues.length === 0) return;
      var orFilters = [];

      forEach(facetValues, function(facetValue) {
        orFilters.push(facetName + ':' + facetValue);
      });

      facetFilters.push(orFilters);
    });

    forEach(state.hierarchicalFacetsRefinements, function(facetValues, facetName) {
      var facetValue = facetValues[0];

      if (facetValue === undefined) {
        return;
      }

      var hierarchicalFacet = state.getHierarchicalFacetByName(facetName);
      var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
      var rootPath = state._getHierarchicalRootPath(hierarchicalFacet);
      var attributeToRefine;
      var attributesIndex;

      // we ask for parent facet values only when the `facet` is the current hierarchical facet
      if (facet === facetName) {
        // if we are at the root level already, no need to ask for facet values, we get them from
        // the hits query
        if (facetValue.indexOf(separator) === -1 || (!rootPath && hierarchicalRootLevel === true) ||
          (rootPath && rootPath.split(separator).length === facetValue.split(separator).length)) {
          return;
        }

        if (!rootPath) {
          attributesIndex = facetValue.split(separator).length - 2;
          facetValue = facetValue.slice(0, facetValue.lastIndexOf(separator));
        } else {
          attributesIndex = rootPath.split(separator).length - 1;
          facetValue = rootPath;
        }

        attributeToRefine = hierarchicalFacet.attributes[attributesIndex];
      } else {
        attributesIndex = facetValue.split(separator).length - 1;

        attributeToRefine = hierarchicalFacet.attributes[attributesIndex];
      }

      if (attributeToRefine) {
        facetFilters.push([attributeToRefine + ':' + facetValue]);
      }
    });

    return facetFilters;
  },

  _getHitsHierarchicalFacetsAttributes: function(state) {
    var out = [];

    return reduce(
      state.hierarchicalFacets,
      // ask for as much levels as there's hierarchical refinements
      function getHitsAttributesForHierarchicalFacet(allAttributes, hierarchicalFacet) {
        var hierarchicalRefinement = state.getHierarchicalRefinement(hierarchicalFacet.name)[0];

        // if no refinement, ask for root level
        if (!hierarchicalRefinement) {
          allAttributes.push(hierarchicalFacet.attributes[0]);
          return allAttributes;
        }

        var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
        var level = hierarchicalRefinement.split(separator).length;
        var newAttributes = hierarchicalFacet.attributes.slice(0, level + 1);

        return allAttributes.concat(newAttributes);
      }, out);
  },

  _getDisjunctiveHierarchicalFacetAttribute: function(state, hierarchicalFacet, rootLevel) {
    var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
    if (rootLevel === true) {
      var rootPath = state._getHierarchicalRootPath(hierarchicalFacet);
      var attributeIndex = 0;

      if (rootPath) {
        attributeIndex = rootPath.split(separator).length;
      }
      return [hierarchicalFacet.attributes[attributeIndex]];
    }

    var hierarchicalRefinement = state.getHierarchicalRefinement(hierarchicalFacet.name)[0] || '';
    // if refinement is 'beers > IPA > Flying dog',
    // then we want `facets: ['beers > IPA']` as disjunctive facet (parent level values)

    var parentLevel = hierarchicalRefinement.split(separator).length - 1;
    return hierarchicalFacet.attributes.slice(0, parentLevel + 1);
  },

  getSearchForFacetQuery: function(facetName, query, state) {
    var stateForSearchForFacetValues = state.isDisjunctiveFacet(facetName) ?
      state.clearRefinements(facetName) :
      state;
    var queries = merge(requestBuilder._getHitsSearchParams(stateForSearchForFacetValues), {
      facetQuery: query,
      facetName: facetName
    });
    return queries;
  }
};

module.exports = requestBuilder;


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

var foreach = __webpack_require__(110);

module.exports = function map(arr, fn) {
  var newArr = [];
  foreach(arr, function(item, itemIndex) {
    newArr.push(fn(item, itemIndex, arr));
  });
  return newArr;
};


/***/ }),
/* 249 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 250 */
/***/ (function(module, exports) {

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

module.exports = addMapEntry;


/***/ }),
/* 251 */
/***/ (function(module, exports) {

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

module.exports = addSetEntry;


/***/ }),
/* 252 */
/***/ (function(module, exports) {

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

module.exports = asciiToArray;


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(22),
    keys = __webpack_require__(9);

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(22),
    keysIn = __webpack_require__(50);

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;


/***/ }),
/* 255 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.clamp` which doesn't coerce arguments.
 *
 * @private
 * @param {number} number The number to clamp.
 * @param {number} [lower] The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 */
function baseClamp(number, lower, upper) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}

module.exports = baseClamp;


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(40),
    arrayEach = __webpack_require__(85),
    assignValue = __webpack_require__(90),
    baseAssign = __webpack_require__(253),
    baseAssignIn = __webpack_require__(254),
    cloneBuffer = __webpack_require__(144),
    copyArray = __webpack_require__(68),
    copySymbols = __webpack_require__(291),
    copySymbolsIn = __webpack_require__(292),
    getAllKeys = __webpack_require__(95),
    getAllKeysIn = __webpack_require__(96),
    getTag = __webpack_require__(56),
    initCloneArray = __webpack_require__(307),
    initCloneByTag = __webpack_require__(308),
    initCloneObject = __webpack_require__(165),
    isArray = __webpack_require__(0),
    isBuffer = __webpack_require__(26),
    isObject = __webpack_require__(6),
    keys = __webpack_require__(9);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(59),
    arrayIncludes = __webpack_require__(87),
    arrayIncludesWith = __webpack_require__(127),
    arrayMap = __webpack_require__(12),
    baseUnary = __webpack_require__(44),
    cacheHas = __webpack_require__(67);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee == null ? value : iteratee(value);

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

var baseEach = __webpack_require__(63);

/**
 * The base implementation of `_.filter` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function baseFilter(collection, predicate) {
  var result = [];
  baseEach(collection, function(value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });
  return result;
}

module.exports = baseFilter;


/***/ }),
/* 259 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(59),
    arrayIncludes = __webpack_require__(87),
    arrayIncludesWith = __webpack_require__(127),
    arrayMap = __webpack_require__(12),
    baseUnary = __webpack_require__(44),
    cacheHas = __webpack_require__(67);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * The base implementation of methods like `_.intersection`, without support
 * for iteratee shorthands, that accepts an array of arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of shared values.
 */
function baseIntersection(arrays, iteratee, comparator) {
  var includes = comparator ? arrayIncludesWith : arrayIncludes,
      length = arrays[0].length,
      othLength = arrays.length,
      othIndex = othLength,
      caches = Array(othLength),
      maxLength = Infinity,
      result = [];

  while (othIndex--) {
    var array = arrays[othIndex];
    if (othIndex && iteratee) {
      array = arrayMap(array, baseUnary(iteratee));
    }
    maxLength = nativeMin(array.length, maxLength);
    caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
      ? new SetCache(othIndex && array)
      : undefined;
  }
  array = arrays[0];

  var index = -1,
      seen = caches[0];

  outer:
  while (++index < length && result.length < maxLength) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (!(seen
          ? cacheHas(seen, computed)
          : includes(result, computed, comparator)
        )) {
      othIndex = othLength;
      while (--othIndex) {
        var cache = caches[othIndex];
        if (!(cache
              ? cacheHas(cache, computed)
              : includes(arrays[othIndex], computed, comparator))
            ) {
          continue outer;
        }
      }
      if (seen) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseIntersection;


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

var baseForOwn = __webpack_require__(42);

/**
 * The base implementation of `_.invert` and `_.invertBy` which inverts
 * `object` with values transformed by `iteratee` and set by `setter`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} setter The function to set `accumulator` values.
 * @param {Function} iteratee The iteratee to transform values.
 * @param {Object} accumulator The initial inverted object.
 * @returns {Function} Returns `accumulator`.
 */
function baseInverter(object, setter, iteratee, accumulator) {
  baseForOwn(object, function(value, key, object) {
    setter(accumulator, iteratee(value), key, object);
  });
  return accumulator;
}

module.exports = baseInverter;


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(40),
    baseIsEqual = __webpack_require__(65);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;


/***/ }),
/* 263 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6),
    isPrototype = __webpack_require__(37),
    nativeKeysIn = __webpack_require__(313);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsMatch = __webpack_require__(262),
    getMatchData = __webpack_require__(304),
    matchesStrictComparable = __webpack_require__(179);

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(65),
    get = __webpack_require__(73),
    hasIn = __webpack_require__(200),
    isKey = __webpack_require__(72),
    isStrictComparable = __webpack_require__(168),
    matchesStrictComparable = __webpack_require__(179),
    toKey = __webpack_require__(23);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(40),
    assignMergeValue = __webpack_require__(129),
    baseFor = __webpack_require__(132),
    baseMergeDeep = __webpack_require__(268),
    isObject = __webpack_require__(6),
    keysIn = __webpack_require__(50);

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    if (isObject(srcValue)) {
      stack || (stack = new Stack);
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

module.exports = baseMerge;


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

var assignMergeValue = __webpack_require__(129),
    cloneBuffer = __webpack_require__(144),
    cloneTypedArray = __webpack_require__(145),
    copyArray = __webpack_require__(68),
    initCloneObject = __webpack_require__(165),
    isArguments = __webpack_require__(25),
    isArray = __webpack_require__(0),
    isArrayLikeObject = __webpack_require__(103),
    isBuffer = __webpack_require__(26),
    isFunction = __webpack_require__(19),
    isObject = __webpack_require__(6),
    isPlainObject = __webpack_require__(48),
    isTypedArray = __webpack_require__(36),
    toPlainObject = __webpack_require__(339);

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = object[key],
      srcValue = source[key],
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

module.exports = baseMergeDeep;


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(12),
    baseIteratee = __webpack_require__(13),
    baseMap = __webpack_require__(138),
    baseSortBy = __webpack_require__(276),
    baseUnary = __webpack_require__(44),
    compareMultiple = __webpack_require__(290),
    identity = __webpack_require__(24);

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  var index = -1;
  iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(baseIteratee));

  var result = baseMap(collection, function(value, key, collection) {
    var criteria = arrayMap(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return baseSortBy(result, function(object, other) {
    return compareMultiple(object, other, orders);
  });
}

module.exports = baseOrderBy;


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

var basePickBy = __webpack_require__(139),
    hasIn = __webpack_require__(200);

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, paths) {
  return basePickBy(object, paths, function(value, path) {
    return hasIn(object, path);
  });
}

module.exports = basePick;


/***/ }),
/* 271 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(64);

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;


/***/ }),
/* 273 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.reduce` and `_.reduceRight`, without support
 * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} accumulator The initial value.
 * @param {boolean} initAccum Specify using the first or last element of
 *  `collection` as the initial value.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @returns {*} Returns the accumulated value.
 */
function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
  eachFunc(collection, function(value, index, collection) {
    accumulator = initAccum
      ? (initAccum = false, value)
      : iteratee(accumulator, value, index, collection);
  });
  return accumulator;
}

module.exports = baseReduce;


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(90),
    castPath = __webpack_require__(21),
    isIndex = __webpack_require__(31),
    isObject = __webpack_require__(6),
    toKey = __webpack_require__(23);

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {});
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

module.exports = baseSet;


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__(197),
    defineProperty = __webpack_require__(152),
    identity = __webpack_require__(24);

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),
/* 276 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

module.exports = baseSortBy;


/***/ }),
/* 277 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.sum` and `_.sumBy` without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {number} Returns the sum.
 */
function baseSum(array, iteratee) {
  var result,
      index = -1,
      length = array.length;

  while (++index < length) {
    var current = iteratee(array[index]);
    if (current !== undefined) {
      result = result === undefined ? current : (result + current);
    }
  }
  return result;
}

module.exports = baseSum;


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(21),
    last = __webpack_require__(204),
    parent = __webpack_require__(314),
    toKey = __webpack_require__(23);

/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset(object, path) {
  path = castPath(path, object);
  object = parent(object, path);
  return object == null || delete object[toKey(last(path))];
}

module.exports = baseUnset;


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(12);

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

module.exports = baseValues;


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLikeObject = __webpack_require__(103);

/**
 * Casts `value` to an empty array if it's not an array like object.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array|Object} Returns the cast array-like object.
 */
function castArrayLikeObject(value) {
  return isArrayLikeObject(value) ? value : [];
}

module.exports = castArrayLikeObject;


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

var baseSlice = __webpack_require__(141);

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

module.exports = castSlice;


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(43);

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the last unmatched string symbol.
 */
function charsEndIndex(strSymbols, chrSymbols) {
  var index = strSymbols.length;

  while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
  return index;
}

module.exports = charsEndIndex;


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(43);

/**
 * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the first unmatched string symbol.
 */
function charsStartIndex(strSymbols, chrSymbols) {
  var index = -1,
      length = strSymbols.length;

  while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
  return index;
}

module.exports = charsStartIndex;


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(93);

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

var addMapEntry = __webpack_require__(250),
    arrayReduce = __webpack_require__(89),
    mapToArray = __webpack_require__(98);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

module.exports = cloneMap;


/***/ }),
/* 286 */
/***/ (function(module, exports) {

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

var addSetEntry = __webpack_require__(251),
    arrayReduce = __webpack_require__(89),
    setToArray = __webpack_require__(99);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

module.exports = cloneSet;


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(15);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(27);

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol(value);

    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol(other);

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1;
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}

module.exports = compareAscending;


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

var compareAscending = __webpack_require__(289);

/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

module.exports = compareMultiple;


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(22),
    getSymbols = __webpack_require__(71);

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(22),
    getSymbolsIn = __webpack_require__(158);

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;


/***/ }),
/* 293 */
/***/ (function(module, exports) {

/**
 * Gets the number of `placeholder` occurrences in `array`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} placeholder The placeholder to search for.
 * @returns {number} Returns the placeholder count.
 */
function countHolders(array, placeholder) {
  var length = array.length,
      result = 0;

  while (length--) {
    if (array[length] === placeholder) {
      ++result;
    }
  }
  return result;
}

module.exports = countHolders;


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(11);

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;


/***/ }),
/* 295 */
/***/ (function(module, exports) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

var createCtor = __webpack_require__(69),
    root = __webpack_require__(3);

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1;

/**
 * Creates a function that wraps `func` to invoke it with the optional `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createBind(func, bitmask, thisArg) {
  var isBind = bitmask & WRAP_BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }
  return wrapper;
}

module.exports = createBind;


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(60),
    createCtor = __webpack_require__(69),
    createHybrid = __webpack_require__(150),
    createRecurry = __webpack_require__(151),
    getHolder = __webpack_require__(45),
    replaceHolders = __webpack_require__(34),
    root = __webpack_require__(3);

/**
 * Creates a function that wraps `func` to enable currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {number} arity The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createCurry(func, bitmask, arity) {
  var Ctor = createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length,
        placeholder = getHolder(wrapper);

    while (index--) {
      args[index] = arguments[index];
    }
    var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
      ? []
      : replaceHolders(args, placeholder);

    length -= holders.length;
    if (length < arity) {
      return createRecurry(
        func, bitmask, createHybrid, wrapper.placeholder, undefined,
        args, holders, undefined, undefined, arity - length);
    }
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return apply(fn, this, args);
  }
  return wrapper;
}

module.exports = createCurry;


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

var baseIteratee = __webpack_require__(13),
    isArrayLike = __webpack_require__(11),
    keys = __webpack_require__(9);

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */
function createFind(findIndexFunc) {
  return function(collection, predicate, fromIndex) {
    var iterable = Object(collection);
    if (!isArrayLike(collection)) {
      var iteratee = baseIteratee(predicate, 3);
      collection = keys(collection);
      predicate = function(key) { return iteratee(iterable[key], key, iterable); };
    }
    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
  };
}

module.exports = createFind;


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

var baseInverter = __webpack_require__(261);

/**
 * Creates a function like `_.invertBy`.
 *
 * @private
 * @param {Function} setter The function to set accumulator values.
 * @param {Function} toIteratee The function to resolve iteratees.
 * @returns {Function} Returns the new inverter function.
 */
function createInverter(setter, toIteratee) {
  return function(object, iteratee) {
    return baseInverter(object, setter, toIteratee(iteratee), {});
  };
}

module.exports = createInverter;


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(60),
    createCtor = __webpack_require__(69),
    root = __webpack_require__(3);

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1;

/**
 * Creates a function that wraps `func` to invoke it with the `this` binding
 * of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to
 *  the new function.
 * @returns {Function} Returns the new wrapped function.
 */
function createPartial(func, bitmask, thisArg, partials) {
  var isBind = bitmask & WRAP_BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(leftLength + argsLength),
        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return apply(fn, isBind ? thisArg : this, args);
  }
  return wrapper;
}

module.exports = createPartial;


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(18);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
 * of source objects to the destination object for all destination properties
 * that resolve to `undefined`.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to assign.
 * @param {Object} object The parent object of `objValue`.
 * @returns {*} Returns the value to assign.
 */
function customDefaultsAssignIn(objValue, srcValue, key, object) {
  if (objValue === undefined ||
      (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
    return srcValue;
  }
  return objValue;
}

module.exports = customDefaultsAssignIn;


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

var isPlainObject = __webpack_require__(48);

/**
 * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
 * objects.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {string} key The key of the property to inspect.
 * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
 */
function customOmitClone(value) {
  return isPlainObject(value) ? undefined : value;
}

module.exports = customOmitClone;


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

var realNames = __webpack_require__(315);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the name of `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {string} Returns the function name.
 */
function getFuncName(func) {
  var result = (func.name + ''),
      array = realNames[result],
      length = hasOwnProperty.call(realNames, result) ? array.length : 0;

  while (length--) {
    var data = array[length],
        otherFunc = data.func;
    if (otherFunc == null || otherFunc == func) {
      return data.name;
    }
  }
  return result;
}

module.exports = getFuncName;


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

var isStrictComparable = __webpack_require__(168),
    keys = __webpack_require__(9);

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

module.exports = getMatchData;


/***/ }),
/* 305 */
/***/ (function(module, exports) {

/** Used to match wrap detail comments. */
var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
    reSplitDetails = /,? & /;

/**
 * Extracts wrapper details from the `source` body comment.
 *
 * @private
 * @param {string} source The source to inspect.
 * @returns {Array} Returns the wrapper details.
 */
function getWrapDetails(source) {
  var match = source.match(reWrapDetails);
  return match ? match[1].split(reSplitDetails) : [];
}

module.exports = getWrapDetails;


/***/ }),
/* 306 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

module.exports = hasUnicode;


/***/ }),
/* 307 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(93),
    cloneDataView = __webpack_require__(284),
    cloneMap = __webpack_require__(285),
    cloneRegExp = __webpack_require__(286),
    cloneSet = __webpack_require__(287),
    cloneSymbol = __webpack_require__(288),
    cloneTypedArray = __webpack_require__(145);

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;


/***/ }),
/* 309 */
/***/ (function(module, exports) {

/** Used to match wrap detail comments. */
var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;

/**
 * Inserts wrapper `details` in a comment at the top of the `source` body.
 *
 * @private
 * @param {string} source The source to modify.
 * @returns {Array} details The details to insert.
 * @returns {string} Returns the modified source.
 */
function insertWrapDetails(source, details) {
  var length = details.length;
  if (!length) {
    return source;
  }
  var lastIndex = length - 1;
  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
  details = details.join(length > 2 ? ', ' : ' ');
  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
}

module.exports = insertWrapDetails;


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(15),
    isArguments = __webpack_require__(25),
    isArray = __webpack_require__(0);

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

var LazyWrapper = __webpack_require__(82),
    getData = __webpack_require__(156),
    getFuncName = __webpack_require__(303),
    lodash = __webpack_require__(341);

/**
 * Checks if `func` has a lazy counterpart.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
 *  else `false`.
 */
function isLaziable(func) {
  var funcName = getFuncName(func),
      other = lodash[funcName];

  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
    return false;
  }
  if (func === other) {
    return true;
  }
  var data = getData(other);
  return !!data && func === data[0];
}

module.exports = isLaziable;


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

var composeArgs = __webpack_require__(146),
    composeArgsRight = __webpack_require__(147),
    replaceHolders = __webpack_require__(34);

/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_BOUND_FLAG = 4,
    WRAP_CURRY_FLAG = 8,
    WRAP_ARY_FLAG = 128,
    WRAP_REARG_FLAG = 256;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Merges the function metadata of `source` into `data`.
 *
 * Merging metadata reduces the number of wrappers used to invoke a function.
 * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
 * may be applied regardless of execution order. Methods like `_.ary` and
 * `_.rearg` modify function arguments, making the order in which they are
 * executed important, preventing the merging of metadata. However, we make
 * an exception for a safe combined case where curried functions have `_.ary`
 * and or `_.rearg` applied.
 *
 * @private
 * @param {Array} data The destination metadata.
 * @param {Array} source The source metadata.
 * @returns {Array} Returns `data`.
 */
function mergeData(data, source) {
  var bitmask = data[1],
      srcBitmask = source[1],
      newBitmask = bitmask | srcBitmask,
      isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);

  var isCombo =
    ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
    ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
    ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));

  // Exit early if metadata can't be merged.
  if (!(isCommon || isCombo)) {
    return data;
  }
  // Use source `thisArg` if available.
  if (srcBitmask & WRAP_BIND_FLAG) {
    data[2] = source[2];
    // Set when currying a bound function.
    newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
  }
  // Compose partial arguments.
  var value = source[3];
  if (value) {
    var partials = data[3];
    data[3] = partials ? composeArgs(partials, value, source[4]) : value;
    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
  }
  // Compose partial right arguments.
  value = source[5];
  if (value) {
    partials = data[5];
    data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
  }
  // Use source `argPos` if available.
  value = source[7];
  if (value) {
    data[7] = value;
  }
  // Use source `ary` if it's smaller.
  if (srcBitmask & WRAP_ARY_FLAG) {
    data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
  }
  // Use source `arity` if one is not provided.
  if (data[9] == null) {
    data[9] = source[9];
  }
  // Use source `func` and merge bitmasks.
  data[0] = source[0];
  data[1] = newBitmask;

  return data;
}

module.exports = mergeData;


/***/ }),
/* 313 */
/***/ (function(module, exports) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(64),
    baseSlice = __webpack_require__(141);

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
function parent(object, path) {
  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
}

module.exports = parent;


/***/ }),
/* 315 */
/***/ (function(module, exports) {

/** Used to lookup unminified function names. */
var realNames = {};

module.exports = realNames;


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

var copyArray = __webpack_require__(68),
    isIndex = __webpack_require__(31);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */
function reorder(array, indexes) {
  var arrLength = array.length,
      length = nativeMin(indexes.length, arrLength),
      oldArray = copyArray(array);

  while (length--) {
    var index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
  }
  return array;
}

module.exports = reorder;


/***/ }),
/* 317 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

var asciiToArray = __webpack_require__(252),
    hasUnicode = __webpack_require__(306),
    unicodeToArray = __webpack_require__(319);

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

module.exports = stringToArray;


/***/ }),
/* 319 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

module.exports = unicodeToArray;


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

var arrayEach = __webpack_require__(85),
    arrayIncludes = __webpack_require__(87);

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_FLAG = 8,
    WRAP_CURRY_RIGHT_FLAG = 16,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_PARTIAL_RIGHT_FLAG = 64,
    WRAP_ARY_FLAG = 128,
    WRAP_REARG_FLAG = 256,
    WRAP_FLIP_FLAG = 512;

/** Used to associate wrap methods with their bit flags. */
var wrapFlags = [
  ['ary', WRAP_ARY_FLAG],
  ['bind', WRAP_BIND_FLAG],
  ['bindKey', WRAP_BIND_KEY_FLAG],
  ['curry', WRAP_CURRY_FLAG],
  ['curryRight', WRAP_CURRY_RIGHT_FLAG],
  ['flip', WRAP_FLIP_FLAG],
  ['partial', WRAP_PARTIAL_FLAG],
  ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
  ['rearg', WRAP_REARG_FLAG]
];

/**
 * Updates wrapper `details` based on `bitmask` flags.
 *
 * @private
 * @returns {Array} details The details to modify.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Array} Returns `details`.
 */
function updateWrapDetails(details, bitmask) {
  arrayEach(wrapFlags, function(pair) {
    var value = '_.' + pair[0];
    if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
      details.push(value);
    }
  });
  return details.sort();
}

module.exports = updateWrapDetails;


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

var LazyWrapper = __webpack_require__(82),
    LodashWrapper = __webpack_require__(124),
    copyArray = __webpack_require__(68);

/**
 * Creates a clone of `wrapper`.
 *
 * @private
 * @param {Object} wrapper The wrapper to clone.
 * @returns {Object} Returns the cloned wrapper.
 */
function wrapperClone(wrapper) {
  if (wrapper instanceof LazyWrapper) {
    return wrapper.clone();
  }
  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
  result.__actions__ = copyArray(wrapper.__actions__);
  result.__index__  = wrapper.__index__;
  result.__values__ = wrapper.__values__;
  return result;
}

module.exports = wrapperClone;


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(22),
    createAssigner = __webpack_require__(149),
    keysIn = __webpack_require__(50);

/**
 * This method is like `_.assignIn` except that it accepts `customizer`
 * which is invoked to produce the assigned values. If `customizer` returns
 * `undefined`, assignment is handled by the method instead. The `customizer`
 * is invoked with five arguments: (objValue, srcValue, key, object, source).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extendWith
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @see _.assignWith
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   return _.isUndefined(objValue) ? srcValue : objValue;
 * }
 *
 * var defaults = _.partialRight(_.assignInWith, customizer);
 *
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
  copyObject(source, keysIn(source), object, customizer);
});

module.exports = assignInWith;


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(20),
    createWrap = __webpack_require__(94),
    getHolder = __webpack_require__(45),
    replaceHolders = __webpack_require__(34);

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_PARTIAL_FLAG = 32;

/**
 * Creates a function that invokes `func` with the `this` binding of `thisArg`
 * and `partials` prepended to the arguments it receives.
 *
 * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for partially applied arguments.
 *
 * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
 * property of bound functions.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {...*} [partials] The arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * function greet(greeting, punctuation) {
 *   return greeting + ' ' + this.user + punctuation;
 * }
 *
 * var object = { 'user': 'fred' };
 *
 * var bound = _.bind(greet, object, 'hi');
 * bound('!');
 * // => 'hi fred!'
 *
 * // Bound with placeholders.
 * var bound = _.bind(greet, object, _, '!');
 * bound('hi');
 * // => 'hi fred!'
 */
var bind = baseRest(function(func, thisArg, partials) {
  var bitmask = WRAP_BIND_FLAG;
  if (partials.length) {
    var holders = replaceHolders(partials, getHolder(bind));
    bitmask |= WRAP_PARTIAL_FLAG;
  }
  return createWrap(func, bitmask, thisArg, partials, holders);
});

// Assign default placeholders.
bind.placeholder = {};

module.exports = bind;


/***/ }),
/* 324 */
/***/ (function(module, exports) {

/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 */
function compact(array) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = compact;


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

var baseDifference = __webpack_require__(257),
    baseFlatten = __webpack_require__(131),
    baseRest = __webpack_require__(20),
    isArrayLikeObject = __webpack_require__(103);

/**
 * Creates an array of `array` values not included in the other given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * **Note:** Unlike `_.pullAll`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...Array} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.without, _.xor
 * @example
 *
 * _.difference([2, 1], [2, 3]);
 * // => [1]
 */
var difference = baseRest(function(array, values) {
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
    : [];
});

module.exports = difference;


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

var baseForOwn = __webpack_require__(42),
    castFunction = __webpack_require__(143);

/**
 * Iterates over own enumerable string keyed properties of an object and
 * invokes `iteratee` for each property. The iteratee is invoked with three
 * arguments: (value, key, object). Iteratee functions may exit iteration
 * early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @since 0.3.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns `object`.
 * @see _.forOwnRight
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.forOwn(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forOwn(object, iteratee) {
  return object && baseForOwn(object, castFunction(iteratee));
}

module.exports = forOwn;


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(43),
    isArrayLike = __webpack_require__(11),
    isString = __webpack_require__(49),
    toInteger = __webpack_require__(53),
    values = __webpack_require__(340);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's
 * checked for a substring of `value`, otherwise
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * is used for equality comparisons. If `fromIndex` is negative, it's used as
 * the offset from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'a': 1, 'b': 2 }, 1);
 * // => true
 *
 * _.includes('abcd', 'bc');
 * // => true
 */
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike(collection) ? collection : values(collection);
  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax(length + fromIndex, 0);
  }
  return isString(collection)
    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
}

module.exports = includes;


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(12),
    baseIntersection = __webpack_require__(260),
    baseRest = __webpack_require__(20),
    castArrayLikeObject = __webpack_require__(280);

/**
 * Creates an array of unique values that are included in all given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * _.intersection([2, 1], [2, 3]);
 * // => [2]
 */
var intersection = baseRest(function(arrays) {
  var mapped = arrayMap(arrays, castArrayLikeObject);
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped)
    : [];
});

module.exports = intersection;


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(41),
    baseForOwn = __webpack_require__(42),
    baseIteratee = __webpack_require__(13);

/**
 * The opposite of `_.mapValues`; this method creates an object with the
 * same values as `object` and keys generated by running each own enumerable
 * string keyed property of `object` thru `iteratee`. The iteratee is invoked
 * with three arguments: (value, key, object).
 *
 * @static
 * @memberOf _
 * @since 3.8.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns the new mapped object.
 * @see _.mapValues
 * @example
 *
 * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
 *   return key + value;
 * });
 * // => { 'a1': 1, 'b2': 2 }
 */
function mapKeys(object, iteratee) {
  var result = {};
  iteratee = baseIteratee(iteratee, 3);

  baseForOwn(object, function(value, key, object) {
    baseAssignValue(result, iteratee(value, key, object), value);
  });
  return result;
}

module.exports = mapKeys;


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(41),
    baseForOwn = __webpack_require__(42),
    baseIteratee = __webpack_require__(13);

/**
 * Creates an object with the same keys as `object` and values generated
 * by running each own enumerable string keyed property of `object` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, key, object).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns the new mapped object.
 * @see _.mapKeys
 * @example
 *
 * var users = {
 *   'fred':    { 'user': 'fred',    'age': 40 },
 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
 * };
 *
 * _.mapValues(users, function(o) { return o.age; });
 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
 *
 * // The `_.property` iteratee shorthand.
 * _.mapValues(users, 'age');
 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
 */
function mapValues(object, iteratee) {
  var result = {};
  iteratee = baseIteratee(iteratee, 3);

  baseForOwn(object, function(value, key, object) {
    baseAssignValue(result, key, iteratee(value, key, object));
  });
  return result;
}

module.exports = mapValues;


/***/ }),
/* 331 */
/***/ (function(module, exports) {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(20),
    createWrap = __webpack_require__(94),
    getHolder = __webpack_require__(45),
    replaceHolders = __webpack_require__(34);

/** Used to compose bitmasks for function metadata. */
var WRAP_PARTIAL_FLAG = 32;

/**
 * Creates a function that invokes `func` with `partials` prepended to the
 * arguments it receives. This method is like `_.bind` except it does **not**
 * alter the `this` binding.
 *
 * The `_.partial.placeholder` value, which defaults to `_` in monolithic
 * builds, may be used as a placeholder for partially applied arguments.
 *
 * **Note:** This method doesn't set the "length" property of partially
 * applied functions.
 *
 * @static
 * @memberOf _
 * @since 0.2.0
 * @category Function
 * @param {Function} func The function to partially apply arguments to.
 * @param {...*} [partials] The arguments to be partially applied.
 * @returns {Function} Returns the new partially applied function.
 * @example
 *
 * function greet(greeting, name) {
 *   return greeting + ' ' + name;
 * }
 *
 * var sayHelloTo = _.partial(greet, 'hello');
 * sayHelloTo('fred');
 * // => 'hello fred'
 *
 * // Partially applied with placeholders.
 * var greetFred = _.partial(greet, _, 'fred');
 * greetFred('hi');
 * // => 'hi fred'
 */
var partial = baseRest(function(func, partials) {
  var holders = replaceHolders(partials, getHolder(partial));
  return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
});

// Assign default placeholders.
partial.placeholder = {};

module.exports = partial;


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(20),
    createWrap = __webpack_require__(94),
    getHolder = __webpack_require__(45),
    replaceHolders = __webpack_require__(34);

/** Used to compose bitmasks for function metadata. */
var WRAP_PARTIAL_RIGHT_FLAG = 64;

/**
 * This method is like `_.partial` except that partially applied arguments
 * are appended to the arguments it receives.
 *
 * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
 * builds, may be used as a placeholder for partially applied arguments.
 *
 * **Note:** This method doesn't set the "length" property of partially
 * applied functions.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Function
 * @param {Function} func The function to partially apply arguments to.
 * @param {...*} [partials] The arguments to be partially applied.
 * @returns {Function} Returns the new partially applied function.
 * @example
 *
 * function greet(greeting, name) {
 *   return greeting + ' ' + name;
 * }
 *
 * var greetFred = _.partialRight(greet, 'fred');
 * greetFred('hi');
 * // => 'hi fred'
 *
 * // Partially applied with placeholders.
 * var sayHelloTo = _.partialRight(greet, 'hello', _);
 * sayHelloTo('fred');
 * // => 'hello fred'
 */
var partialRight = baseRest(function(func, partials) {
  var holders = replaceHolders(partials, getHolder(partialRight));
  return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders);
});

// Assign default placeholders.
partialRight.placeholder = {};

module.exports = partialRight;


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(12),
    baseIteratee = __webpack_require__(13),
    basePickBy = __webpack_require__(139),
    getAllKeysIn = __webpack_require__(96);

/**
 * Creates an object composed of the `object` properties `predicate` returns
 * truthy for. The predicate is invoked with two arguments: (value, key).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The source object.
 * @param {Function} [predicate=_.identity] The function invoked per property.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pickBy(object, _.isNumber);
 * // => { 'a': 1, 'c': 3 }
 */
function pickBy(object, predicate) {
  if (object == null) {
    return {};
  }
  var props = arrayMap(getAllKeysIn(object), function(prop) {
    return [prop];
  });
  predicate = baseIteratee(predicate);
  return basePickBy(object, props, function(value, path) {
    return predicate(value, path[0]);
  });
}

module.exports = pickBy;


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

var baseProperty = __webpack_require__(271),
    basePropertyDeep = __webpack_require__(272),
    isKey = __webpack_require__(72),
    toKey = __webpack_require__(23);

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

var baseClamp = __webpack_require__(255),
    baseToString = __webpack_require__(66),
    toInteger = __webpack_require__(53),
    toString = __webpack_require__(75);

/**
 * Checks if `string` starts with the given target string.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=0] The position to search from.
 * @returns {boolean} Returns `true` if `string` starts with `target`,
 *  else `false`.
 * @example
 *
 * _.startsWith('abc', 'a');
 * // => true
 *
 * _.startsWith('abc', 'b');
 * // => false
 *
 * _.startsWith('abc', 'b', 1);
 * // => true
 */
function startsWith(string, target, position) {
  string = toString(string);
  position = position == null
    ? 0
    : baseClamp(toInteger(position), 0, string.length);

  target = baseToString(target);
  return string.slice(position, position + target.length) == target;
}

module.exports = startsWith;


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

var baseIteratee = __webpack_require__(13),
    baseSum = __webpack_require__(277);

/**
 * This method is like `_.sum` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the value to be summed.
 * The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {number} Returns the sum.
 * @example
 *
 * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
 *
 * _.sumBy(objects, function(o) { return o.n; });
 * // => 20
 *
 * // The `_.property` iteratee shorthand.
 * _.sumBy(objects, 'n');
 * // => 20
 */
function sumBy(array, iteratee) {
  return (array && array.length)
    ? baseSum(array, baseIteratee(iteratee, 2))
    : 0;
}

module.exports = sumBy;


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6),
    isSymbol = __webpack_require__(27);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(22),
    keysIn = __webpack_require__(50);

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

module.exports = toPlainObject;


/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

var baseValues = __webpack_require__(279),
    keys = __webpack_require__(9);

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object == null ? [] : baseValues(object, keys(object));
}

module.exports = values;


/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

var LazyWrapper = __webpack_require__(82),
    LodashWrapper = __webpack_require__(124),
    baseLodash = __webpack_require__(92),
    isArray = __webpack_require__(0),
    isObjectLike = __webpack_require__(7),
    wrapperClone = __webpack_require__(321);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates a `lodash` object which wraps `value` to enable implicit method
 * chain sequences. Methods that operate on and return arrays, collections,
 * and functions can be chained together. Methods that retrieve a single value
 * or may return a primitive value will automatically end the chain sequence
 * and return the unwrapped value. Otherwise, the value must be unwrapped
 * with `_#value`.
 *
 * Explicit chain sequences, which must be unwrapped with `_#value`, may be
 * enabled using `_.chain`.
 *
 * The execution of chained methods is lazy, that is, it's deferred until
 * `_#value` is implicitly or explicitly called.
 *
 * Lazy evaluation allows several methods to support shortcut fusion.
 * Shortcut fusion is an optimization to merge iteratee calls; this avoids
 * the creation of intermediate arrays and can greatly reduce the number of
 * iteratee executions. Sections of a chain sequence qualify for shortcut
 * fusion if the section is applied to an array and iteratees accept only
 * one argument. The heuristic for whether a section qualifies for shortcut
 * fusion is subject to change.
 *
 * Chaining is supported in custom builds as long as the `_#value` method is
 * directly or indirectly included in the build.
 *
 * In addition to lodash methods, wrappers have `Array` and `String` methods.
 *
 * The wrapper `Array` methods are:
 * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
 *
 * The wrapper `String` methods are:
 * `replace` and `split`
 *
 * The wrapper methods that support shortcut fusion are:
 * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
 * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
 * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
 *
 * The chainable wrapper methods are:
 * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
 * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
 * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
 * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
 * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
 * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
 * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
 * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
 * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
 * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
 * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
 * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
 * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
 * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
 * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
 * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
 * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
 * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
 * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
 * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
 * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
 * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
 * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
 * `zipObject`, `zipObjectDeep`, and `zipWith`
 *
 * The wrapper methods that are **not** chainable by default are:
 * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
 * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
 * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
 * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
 * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
 * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
 * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
 * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
 * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
 * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
 * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
 * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
 * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
 * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
 * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
 * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
 * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
 * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
 * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
 * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
 * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
 * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
 * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
 * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
 * `upperFirst`, `value`, and `words`
 *
 * @name _
 * @constructor
 * @category Seq
 * @param {*} value The value to wrap in a `lodash` instance.
 * @returns {Object} Returns the new `lodash` wrapper instance.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var wrapped = _([1, 2, 3]);
 *
 * // Returns an unwrapped value.
 * wrapped.reduce(_.add);
 * // => 6
 *
 * // Returns a wrapped value.
 * var squares = wrapped.map(square);
 *
 * _.isArray(squares);
 * // => false
 *
 * _.isArray(squares.value());
 * // => true
 */
function lodash(value) {
  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
    if (value instanceof LodashWrapper) {
      return value;
    }
    if (hasOwnProperty.call(value, '__wrapped__')) {
      return wrapperClone(value);
    }
  }
  return new LodashWrapper(value);
}

// Ensure wrappers are instances of `baseLodash`.
lodash.prototype = baseLodash.prototype;
lodash.prototype.constructor = lodash;

module.exports = lodash;


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(344);
var parse = __webpack_require__(343);
var formats = __webpack_require__(209);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(108);

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseValues(str, options) {
    var obj = {};
    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];
        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos));
            val = options.decoder(part.slice(pos + 1));
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function parseObject(chain, val, options) {
    if (!chain.length) {
        return val;
    }

    var root = chain.shift();

    var obj;
    if (root === '[]') {
        obj = [];
        obj = obj.concat(parseObject(chain, val, options));
    } else {
        obj = options.plainObjects ? Object.create(null) : {};
        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
        var index = parseInt(cleanRoot, 10);
        if (
            !isNaN(index) &&
            root !== cleanRoot &&
            String(index) === cleanRoot &&
            index >= 0 &&
            (options.parseArrays && index <= options.arrayLimit)
        ) {
            obj = [];
            obj[index] = parseObject(chain, val, options);
        } else {
            obj[cleanRoot] = parseObject(chain, val, options);
        }
    }

    return obj;
};

var parseKeys = function parseKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^\.\[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var parent = /^([^\[\]]*)/;
    var child = /(\[[^\[\]]*\])/g;

    // Get the parent

    var segment = parent.exec(key);

    // Stash the parent if it exists

    var keys = [];
    if (segment[1]) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, segment[1])) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(segment[1]);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].replace(/\[|\]/g, ''))) {
            if (!options.allowPrototypes) {
                continue;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts || {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(108);
var formats = __webpack_require__(209);

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    serializeDate: function serializeDate(date) {
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder ? encoder(prefix) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            return [formatter(encoder(prefix)) + '=' + formatter(encoder(obj))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts || {};
    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = encode ? (typeof options.encoder === 'function' ? options.encoder : defaults.encoder) : null;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    if (typeof options.format === 'undefined') {
        options.format = formats.default;
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encoder,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter
        ));
    }

    return keys.join(delimiter);
};


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0}),exports.default=Highlighter;var _propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function Highlighter(a){var b=a.hit,c=a.attributeName,d=a.highlight,e=a.highlightProperty,f=a.tagName,g=d({hit:b,attributeName:c,highlightProperty:e}),h=g.map(function(j,k){var l='split-'+k+'-'+j.value;if(!j.isHighlighted)return _react2.default.createElement('span',{key:l,className:'ais-Highlight__nonHighlighted'},j.value);var m=f?f:'em';return _react2.default.createElement(m,{key:l,className:'ais-Highlight__highlighted'},j.value)});return _react2.default.createElement('span',{className:'ais-Highlight'},h)}Highlighter.propTypes={hit:_propTypes2.default.object.isRequired,attributeName:_propTypes2.default.string.isRequired,highlight:_propTypes2.default.func.isRequired,highlightProperty:_propTypes2.default.string.isRequired,tagName:_propTypes2.default.string};

/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_createClass=function(){function a(b,c){for(var f,d=0;d<c.length;d++)f=c[d],f.enumerable=f.enumerable||!1,f.configurable=!0,'value'in f&&(f.writable=!0),Object.defineProperty(b,f.key,f)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_translatable=__webpack_require__(33),_translatable2=_interopRequireDefault(_translatable),_classNames=__webpack_require__(14),_classNames2=_interopRequireDefault(_classNames);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var cx=(0,_classNames2.default)('SearchBox'),SearchBox=function(a){function b(c){_classCallCheck(this,b);var d=_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).call(this));return d.getQuery=function(){return d.props.searchAsYouType?d.props.currentRefinement:d.state.query},d.setQuery=function(f){var g=d.props,h=g.refine,j=g.searchAsYouType;j?h(f):d.setState({query:f})},d.onInputMount=function(f){d.input=f,d.props.__inputRef&&d.props.__inputRef(f)},d.onKeyDown=function(f){if(d.props.focusShortcuts){var g=d.props.focusShortcuts.map(function(l){return'string'==typeof l?l.toUpperCase().charCodeAt(0):l}),h=f.target||f.srcElement,j=h.tagName;if(!(h.isContentEditable||'INPUT'===j||'SELECT'===j||'TEXTAREA'===j)){var k=f.which||f.keyCode;-1===g.indexOf(k)||(d.input.focus(),f.stopPropagation(),f.preventDefault())}}},d.onSubmit=function(f){f.preventDefault(),f.stopPropagation(),d.input.blur();var g=d.props,h=g.refine,j=g.searchAsYouType;return j||h(d.getQuery()),!1},d.onChange=function(f){d.setQuery(f.target.value),d.props.onChange&&d.props.onChange(f)},d.onReset=function(){d.setQuery(''),d.input.focus(),d.props.onReset&&d.props.onReset()},d.state={query:c.searchAsYouType?null:c.currentRefinement},d}return _inherits(b,a),_createClass(b,[{key:'componentDidMount',value:function componentDidMount(){document.addEventListener('keydown',this.onKeyDown)}},{key:'componentWillUnmount',value:function componentWillUnmount(){document.removeEventListener('keydown',this.onKeyDown)}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(c){c.searchAsYouType||c.currentRefinement===this.props.currentRefinement||this.setState({query:c.currentRefinement})}},{key:'render',value:function render(){var c=this,d=this.props,f=d.translate,g=d.autoFocus,h=this.getQuery(),j=this.props.submitComponent?this.props.submitComponent:_react2.default.createElement('svg',{role:'img',width:'1em',height:'1em'},_react2.default.createElement('use',{xlinkHref:'#sbx-icon-search-13'})),k=this.props.resetComponent?this.props.resetComponent:_react2.default.createElement('svg',{role:'img',width:'1em',height:'1em'},_react2.default.createElement('use',{xlinkHref:'#sbx-icon-clear-3'})),l=Object.keys(this.props).reduce(function(m,n){return-1===['onsubmit','onreset','onchange'].indexOf(n.toLowerCase())&&0===n.indexOf('on')?_extends({},m,_defineProperty({},n,c.props[n])):m},{});return _react2.default.createElement('form',_extends({noValidate:!0,onSubmit:this.props.onSubmit?this.props.onSubmit:this.onSubmit,onReset:this.onReset},cx('root'),{action:'',role:'search'}),_react2.default.createElement('svg',{xmlns:'http://www.w3.org/2000/svg',style:{display:'none'}},_react2.default.createElement('symbol',{xmlns:'http://www.w3.org/2000/svg',id:'sbx-icon-search-13',viewBox:'0 0 40 40'},_react2.default.createElement('path',{d:'M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z',fillRule:'evenodd'})),_react2.default.createElement('symbol',{xmlns:'http://www.w3.org/2000/svg',id:'sbx-icon-clear-3',viewBox:'0 0 20 20'},_react2.default.createElement('path',{d:'M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z',fillRule:'evenodd'}))),_react2.default.createElement('div',_extends({role:'search'},cx('wrapper')),_react2.default.createElement('input',_extends({ref:this.onInputMount,type:'search',placeholder:f('placeholder'),autoFocus:g,autoComplete:'off',autoCorrect:'off',autoCapitalize:'off',spellCheck:'false',required:!0,value:h,onChange:this.onChange},l,cx('input'))),_react2.default.createElement('button',_extends({type:'submit',title:f('submitTitle')},cx('submit')),j),_react2.default.createElement('button',_extends({type:'reset',title:f('resetTitle')},cx('reset'),{onClick:this.onReset}),k)))}}]),b}(_react.Component);SearchBox.propTypes={currentRefinement:_propTypes2.default.string,refine:_propTypes2.default.func.isRequired,translate:_propTypes2.default.func.isRequired,resetComponent:_propTypes2.default.element,submitComponent:_propTypes2.default.element,focusShortcuts:_propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.number])),autoFocus:_propTypes2.default.bool,searchAsYouType:_propTypes2.default.bool,onSubmit:_propTypes2.default.func,onReset:_propTypes2.default.func,onChange:_propTypes2.default.func,__inputRef:_propTypes2.default.func},SearchBox.defaultProps={currentRefinement:'',focusShortcuts:['s','/'],autoFocus:!1,searchAsYouType:!0},exports.default=(0,_translatable2.default)({resetTitle:'Clear the search query.',submitTitle:'Submit your search query.',placeholder:'Search here\u2026'})(SearchBox);

/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _has2=__webpack_require__(57),_has3=_interopRequireDefault(_has2),_extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_createClass=function(){function a(b,c){for(var f,d=0;d<c.length;d++)f=c[d],f.enumerable=f.enumerable||!1,f.configurable=!0,'value'in f&&(f.writable=!0),Object.defineProperty(b,f.key,f)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var Select=function(a){function b(){var c,d,f,g;_classCallCheck(this,b);for(var h=arguments.length,j=Array(h),k=0;k<h;k++)j[k]=arguments[k];return g=(d=(f=_possibleConstructorReturn(this,(c=b.__proto__||Object.getPrototypeOf(b)).call.apply(c,[this].concat(j))),f),f.onChange=function(l){f.props.onSelect(l.target.value)},d),_possibleConstructorReturn(f,g)}return _inherits(b,a),_createClass(b,[{key:'render',value:function render(){var c=this.props,d=c.cx,f=c.items,g=c.selectedItem;return _react2.default.createElement('select',_extends({},d('root'),{value:g,onChange:this.onChange}),f.map(function(h){return _react2.default.createElement('option',{key:(0,_has3.default)(h,'key')?h.key:h.value,disabled:h.disabled,value:h.value},(0,_has3.default)(h,'label')?h.label:h.value)}))}}]),b}(_react.Component);Select.propTypes={cx:_propTypes2.default.func.isRequired,onSelect:_propTypes2.default.func.isRequired,items:_propTypes2.default.arrayOf(_propTypes2.default.shape({value:_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.number]).isRequired,key:_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.number]),label:_propTypes2.default.string,disabled:_propTypes2.default.bool})).isRequired,selectedItem:_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.number]).isRequired},exports.default=Select;

/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = buildSearchMethod;

var errors = __webpack_require__(215);

/**
 * Creates a search method to be used in clients
 * @param {string} queryParam the name of the attribute used for the query
 * @param {string} url the url
 * @return {function} the search method
 */
function buildSearchMethod(queryParam, url) {
  /**
   * The search method. Prepares the data and send the query to Algolia.
   * @param {string} query the string used for query search
   * @param {object} args additional parameters to send with the search
   * @param {function} [callback] the callback to be called with the client gets the answer
   * @return {undefined|Promise} If the callback is not provided then this methods returns a Promise
   */
  return function search(query, args, callback) {
    // warn V2 users on how to search
    if (typeof query === 'function' && typeof args === 'object' ||
      typeof callback === 'object') {
      // .search(query, params, cb)
      // .search(cb, params)
      throw new errors.AlgoliaSearchError('index.search usage is index.search(query, params, cb)');
    }

    // Normalizing the function signature
    if (arguments.length === 0 || typeof query === 'function') {
      // Usage : .search(), .search(cb)
      callback = query;
      query = '';
    } else if (arguments.length === 1 || typeof args === 'function') {
      // Usage : .search(query/args), .search(query, cb)
      callback = args;
      args = undefined;
    }
    // At this point we have 3 arguments with values

    // Usage : .search(args) // careful: typeof null === 'object'
    if (typeof query === 'object' && query !== null) {
      args = query;
      query = undefined;
    } else if (query === undefined || query === null) { // .search(undefined/null)
      query = '';
    }

    var params = '';

    if (query !== undefined) {
      params += queryParam + '=' + encodeURIComponent(query);
    }

    var additionalUA;
    if (args !== undefined) {
      if (args.additionalUA) {
        additionalUA = args.additionalUA;
        delete args.additionalUA;
      }
      // `_getSearchParams` will augment params, do not be fooled by the = versus += from previous if
      params = this.as._getSearchParams(args, params);
    }


    return this._search(params, url, callback, additionalUA);
  };
}


/***/ }),
/* 349 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 350 */,
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();Object.defineProperty(exports,'__esModule',{value:!0});exports.default=createIndex;var _propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_Index=__webpack_require__(398),_Index2=_interopRequireDefault(_Index);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function createIndex(a){var b,c;return c=b=function(d){function e(){return _classCallCheck(this,e),_possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return _inherits(e,d),_createClass(e,[{key:'render',value:function render(){return _react2.default.createElement(_Index2.default,{indexName:this.props.indexName,root:a,children:this.props.children})}}]),e}(_react.Component),b.propTypes={children:_propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node),_propTypes2.default.node]),indexName:_propTypes2.default.string.isRequired},c}

/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();Object.defineProperty(exports,'__esModule',{value:!0});exports.default=createInstantSearch;var _propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_InstantSearch=__webpack_require__(399),_InstantSearch2=_interopRequireDefault(_InstantSearch);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var _name$author$main$mod={name:'react-instantsearch',author:{name:'Algolia, Inc.',url:'https://www.algolia.com'},main:'index.js',module:'es/index.js',description:'\u26A1 Lightning-fast search for React and React Native apps',version:'4.0.3',scripts:{build:'./scripts/build.sh','build-and-publish':'./scripts/build-and-publish.sh'},homepage:'https://community.algolia.com/react-instantsearch/',repository:{type:'git',url:'https://github.com/algolia/react-instantsearch/'},dependencies:{algoliasearch:'^3.21.1','algoliasearch-helper':'2.19.0',classnames:'^2.2.5',lodash:'^4.17.4','prop-types':'^15.5.8'},license:'MIT',devDependencies:{enzyme:'^2.8.1',react:'^15.5.4','react-dom':'^15.5.4','react-native':'^0.41.2','react-test-renderer':'^15.5.4'}},version=_name$author$main$mod.version;function createInstantSearch(a,b){var c,d;return d=c=function(e){function f(g){_classCallCheck(this,f);var h=_possibleConstructorReturn(this,(f.__proto__||Object.getPrototypeOf(f)).call(this));return h.client=g.algoliaClient||a(g.appId,g.apiKey),h.client.addAlgoliaAgent('react-instantsearch '+version),h}return _inherits(f,e),_createClass(f,[{key:'componentWillReceiveProps',value:function componentWillReceiveProps(g){var h=this.props;g.algoliaClient?this.client=g.algoliaClient:(h.appId!==g.appId||h.apiKey!==g.apiKey)&&(this.client=a(g.appId,g.apiKey)),this.client.addAlgoliaAgent('react-instantsearch '+version)}},{key:'render',value:function render(){return _react2.default.createElement(_InstantSearch2.default,{createURL:this.props.createURL,indexName:this.props.indexName,searchParameters:this.props.searchParameters,searchState:this.props.searchState,onSearchStateChange:this.props.onSearchStateChange,root:b,algoliaClient:this.client,children:this.props.children})}}]),f}(_react.Component),c.propTypes={algoliaClient:_propTypes2.default.object,appId:_propTypes2.default.string,apiKey:_propTypes2.default.string,children:_propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node),_propTypes2.default.node]),indexName:_propTypes2.default.string.isRequired,searchParameters:_propTypes2.default.object,createURL:_propTypes2.default.func,searchState:_propTypes2.default.object,onSearchStateChange:_propTypes2.default.func},d}

/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectCurrentRefinements=__webpack_require__(210),_connectCurrentRefinements2=_interopRequireDefault(_connectCurrentRefinements),_ClearAll=__webpack_require__(376),_ClearAll2=_interopRequireDefault(_ClearAll);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectCurrentRefinements2.default)(_ClearAll2.default);

/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectConfigure=__webpack_require__(220),_connectConfigure2=_interopRequireDefault(_connectConfigure),_Configure=__webpack_require__(377),_Configure2=_interopRequireDefault(_Configure);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectConfigure2.default)(_Configure2.default);

/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectCurrentRefinements=__webpack_require__(210),_connectCurrentRefinements2=_interopRequireDefault(_connectCurrentRefinements),_CurrentRefinements=__webpack_require__(378),_CurrentRefinements2=_interopRequireDefault(_CurrentRefinements);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectCurrentRefinements2.default)(_CurrentRefinements2.default);

/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectHierarchicalMenu=__webpack_require__(221),_connectHierarchicalMenu2=_interopRequireDefault(_connectHierarchicalMenu),_HierarchicalMenu=__webpack_require__(379),_HierarchicalMenu2=_interopRequireDefault(_HierarchicalMenu);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectHierarchicalMenu2.default)(_HierarchicalMenu2.default);

/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectHits=__webpack_require__(222),_connectHits2=_interopRequireDefault(_connectHits),_Hits=__webpack_require__(381),_Hits2=_interopRequireDefault(_Hits);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectHits2.default)(_Hits2.default);

/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectHitsPerPage=__webpack_require__(223),_connectHitsPerPage2=_interopRequireDefault(_connectHitsPerPage),_HitsPerPage=__webpack_require__(382),_HitsPerPage2=_interopRequireDefault(_HitsPerPage);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectHitsPerPage2.default)(_HitsPerPage2.default);

/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectInfiniteHits=__webpack_require__(224),_connectInfiniteHits2=_interopRequireDefault(_connectInfiniteHits),_InfiniteHits=__webpack_require__(383),_InfiniteHits2=_interopRequireDefault(_InfiniteHits);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectInfiniteHits2.default)(_InfiniteHits2.default);

/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectMenu=__webpack_require__(225),_connectMenu2=_interopRequireDefault(_connectMenu),_Menu=__webpack_require__(385),_Menu2=_interopRequireDefault(_Menu);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectMenu2.default)(_Menu2.default);

/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectMultiRange=__webpack_require__(226),_connectMultiRange2=_interopRequireDefault(_connectMultiRange),_MultiRange=__webpack_require__(386),_MultiRange2=_interopRequireDefault(_MultiRange);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectMultiRange2.default)(_MultiRange2.default);

/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectPagination=__webpack_require__(227),_connectPagination2=_interopRequireDefault(_connectPagination),_Pagination=__webpack_require__(387),_Pagination2=_interopRequireDefault(_Pagination);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectPagination2.default)(_Pagination2.default);

/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _Panel=__webpack_require__(388),_Panel2=_interopRequireDefault(_Panel);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=_Panel2.default;

/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectPoweredBy=__webpack_require__(228),_connectPoweredBy2=_interopRequireDefault(_connectPoweredBy),_PoweredBy=__webpack_require__(389),_PoweredBy2=_interopRequireDefault(_PoweredBy);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectPoweredBy2.default)(_PoweredBy2.default);

/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectRange=__webpack_require__(112),_connectRange2=_interopRequireDefault(_connectRange),_RangeInput=__webpack_require__(390),_RangeInput2=_interopRequireDefault(_RangeInput);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectRange2.default)(_RangeInput2.default);

/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectRange=__webpack_require__(112),_connectRange2=_interopRequireDefault(_connectRange),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectRange2.default)(function(){return _react2.default.createElement('div',null,'We do not provide any Slider, see the documentation to learn how to connect one easily:',_react2.default.createElement('a',{target:'_blank',href:'https://community.algolia.com/react-instantsearch/widgets/RangeSlider.html'},'https://community.algolia.com/react-instantsearch/widgets/RangeSlider.html'))});

/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectRefinementList=__webpack_require__(229),_connectRefinementList2=_interopRequireDefault(_connectRefinementList),_RefinementList=__webpack_require__(391),_RefinementList2=_interopRequireDefault(_RefinementList);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectRefinementList2.default)(_RefinementList2.default);

/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectScrollTo=__webpack_require__(230),_connectScrollTo2=_interopRequireDefault(_connectScrollTo),_ScrollTo=__webpack_require__(392),_ScrollTo2=_interopRequireDefault(_ScrollTo);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectScrollTo2.default)(_ScrollTo2.default);

/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectSearchBox=__webpack_require__(231),_connectSearchBox2=_interopRequireDefault(_connectSearchBox),_SearchBox=__webpack_require__(346),_SearchBox2=_interopRequireDefault(_SearchBox);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectSearchBox2.default)(_SearchBox2.default);

/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectHighlight=__webpack_require__(211),_connectHighlight2=_interopRequireDefault(_connectHighlight),_Snippet=__webpack_require__(393),_Snippet2=_interopRequireDefault(_Snippet);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectHighlight2.default)(_Snippet2.default);

/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectSortBy=__webpack_require__(232),_connectSortBy2=_interopRequireDefault(_connectSortBy),_SortBy=__webpack_require__(394),_SortBy2=_interopRequireDefault(_SortBy);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectSortBy2.default)(_SortBy2.default);

/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectRange=__webpack_require__(112),_connectRange2=_interopRequireDefault(_connectRange),_StarRating=__webpack_require__(395),_StarRating2=_interopRequireDefault(_StarRating);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectRange2.default)(_StarRating2.default);

/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectStats=__webpack_require__(233),_connectStats2=_interopRequireDefault(_connectStats),_Stats=__webpack_require__(396),_Stats2=_interopRequireDefault(_Stats);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectStats2.default)(_Stats2.default);

/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _connectToggle=__webpack_require__(234),_connectToggle2=_interopRequireDefault(_connectToggle),_Toggle=__webpack_require__(397),_Toggle2=_interopRequireDefault(_Toggle);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=(0,_connectToggle2.default)(_Toggle2.default);

/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var AlgoliaSearchCore = __webpack_require__(404);
var createAlgoliasearch = __webpack_require__(406);

module.exports = createAlgoliasearch(AlgoliaSearchCore, '(lite) ');


/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_translatable=__webpack_require__(33),_translatable2=_interopRequireDefault(_translatable),_classNames=__webpack_require__(14),_classNames2=_interopRequireDefault(_classNames);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var cx=(0,_classNames2.default)('ClearAll'),ClearAll=function(a){function b(){return _classCallCheck(this,b),_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).apply(this,arguments))}return _inherits(b,a),_createClass(b,[{key:'render',value:function render(){var c=this.props,d=c.translate,e=c.items,f=c.refine,g=0===e.length;return g?_react2.default.createElement('button',_extends({},cx('root'),{disabled:!0}),d('reset')):_react2.default.createElement('button',_extends({},cx('root'),{onClick:f.bind(null,e)}),d('reset'))}}]),b}(_react.Component);ClearAll.propTypes={translate:_propTypes2.default.func.isRequired,items:_propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,refine:_propTypes2.default.func.isRequired},exports.default=(0,_translatable2.default)({reset:'Clear all filters'})(ClearAll);

/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){return null};

/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_translatable=__webpack_require__(33),_translatable2=_interopRequireDefault(_translatable),_classNames=__webpack_require__(14),_classNames2=_interopRequireDefault(_classNames);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var cx=(0,_classNames2.default)('CurrentRefinements'),CurrentRefinements=function(a){function b(){return _classCallCheck(this,b),_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).apply(this,arguments))}return _inherits(b,a),_createClass(b,[{key:'componentWillMount',value:function componentWillMount(){this.context.canRefine&&this.context.canRefine(this.props.canRefine)}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(c){this.context.canRefine&&this.context.canRefine(c.canRefine)}},{key:'render',value:function render(){var c=this.props,d=c.translate,e=c.items,f=c.refine,g=c.canRefine;return _react2.default.createElement('div',cx('root',!g&&'noRefinement'),_react2.default.createElement('div',cx('items'),e.map(function(h){return _react2.default.createElement('div',_extends({key:h.label},cx('item',h.items&&'itemParent')),_react2.default.createElement('span',cx('itemLabel'),h.label),h.items?h.items.map(function(j){return _react2.default.createElement('div',_extends({key:j.label},cx('item')),_react2.default.createElement('span',cx('itemLabel'),j.label),_react2.default.createElement('button',_extends({},cx('itemClear'),{onClick:f.bind(null,j.value)}),d('clearFilter',j)))}):_react2.default.createElement('button',_extends({},cx('itemClear'),{onClick:f.bind(null,h.value)}),d('clearFilter',h)))})))}}]),b}(_react.Component);CurrentRefinements.propTypes={translate:_propTypes2.default.func.isRequired,items:_propTypes2.default.arrayOf(_propTypes2.default.shape({label:_propTypes2.default.string})).isRequired,refine:_propTypes2.default.func.isRequired,canRefine:_propTypes2.default.bool.isRequired,transformItems:_propTypes2.default.func},CurrentRefinements.contextTypes={canRefine:_propTypes2.default.func},exports.default=(0,_translatable2.default)({clearFilter:'\u2715'})(CurrentRefinements);

/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _pick2=__webpack_require__(111),_pick3=_interopRequireDefault(_pick2),_extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_translatable=__webpack_require__(33),_translatable2=_interopRequireDefault(_translatable),_List=__webpack_require__(212),_List2=_interopRequireDefault(_List),_Link=__webpack_require__(236),_Link2=_interopRequireDefault(_Link),_classNames=__webpack_require__(14),_classNames2=_interopRequireDefault(_classNames);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var cx=(0,_classNames2.default)('HierarchicalMenu'),itemsPropType=_propTypes2.default.arrayOf(_propTypes2.default.shape({label:_propTypes2.default.string.isRequired,value:_propTypes2.default.string,count:_propTypes2.default.number.isRequired,items:function items(){return itemsPropType.apply(void 0,arguments)}})),HierarchicalMenu=function(a){function b(){var c,d,e,f;_classCallCheck(this,b);for(var g=arguments.length,h=Array(g),j=0;j<g;j++)h[j]=arguments[j];return f=(d=(e=_possibleConstructorReturn(this,(c=b.__proto__||Object.getPrototypeOf(b)).call.apply(c,[this].concat(h))),e),e.renderItem=function(k){var l=e.props,m=l.createURL,n=l.refine;return _react2.default.createElement(_Link2.default,_extends({},cx('itemLink'),{onClick:function onClick(){return n(k.value)},href:m(k.value)}),_react2.default.createElement('span',cx('itemLabel'),k.label),' ',_react2.default.createElement('span',cx('itemCount'),k.count))},d),_possibleConstructorReturn(e,f)}return _inherits(b,a),_createClass(b,[{key:'componentWillMount',value:function componentWillMount(){this.context.canRefine&&this.context.canRefine(this.props.canRefine)}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(c){this.context.canRefine&&this.context.canRefine(c.canRefine)}},{key:'render',value:function render(){return _react2.default.createElement(_List2.default,_extends({renderItem:this.renderItem,cx:cx},(0,_pick3.default)(this.props,['translate','items','showMore','limitMin','limitMax','isEmpty','canRefine'])))}}]),b}(_react.Component);HierarchicalMenu.propTypes={translate:_propTypes2.default.func.isRequired,refine:_propTypes2.default.func.isRequired,createURL:_propTypes2.default.func.isRequired,canRefine:_propTypes2.default.bool.isRequired,items:itemsPropType,showMore:_propTypes2.default.bool,limitMin:_propTypes2.default.number,limitMax:_propTypes2.default.number,transformItems:_propTypes2.default.func},HierarchicalMenu.contextTypes={canRefine:_propTypes2.default.func},exports.default=(0,_translatable2.default)({showMore:function showMore(a){return a?'Show less':'Show more'}})(HierarchicalMenu);

/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a};Object.defineProperty(exports,'__esModule',{value:!0});exports.default=Highlight;var _propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_Highlighter=__webpack_require__(345),_Highlighter2=_interopRequireDefault(_Highlighter);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function Highlight(a){return _react2.default.createElement(_Highlighter2.default,_extends({highlightProperty:'_highlightResult'},a))}Highlight.propTypes={hit:_propTypes2.default.object.isRequired,attributeName:_propTypes2.default.string.isRequired,highlight:_propTypes2.default.func.isRequired,tagName:_propTypes2.default.string};

/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_classNames=__webpack_require__(14),_classNames2=_interopRequireDefault(_classNames);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var cx=(0,_classNames2.default)('Hits'),Hits=function(a){function b(){return _classCallCheck(this,b),_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).apply(this,arguments))}return _inherits(b,a),_createClass(b,[{key:'render',value:function render(){var c=this.props,d=c.hitComponent,e=c.hits;return _react2.default.createElement('div',cx('root'),e.map(function(f){return _react2.default.createElement(d,{key:f.objectID,hit:f})}))}}]),b}(_react.Component);Hits.propTypes={hits:_propTypes2.default.array,hitComponent:_propTypes2.default.func.isRequired},Hits.defaultProps={hitComponent:function hitComponent(a){return _react2.default.createElement('div',{style:{borderBottom:'1px solid #bbb',paddingBottom:'5px',marginBottom:'5px'}},JSON.stringify(a).slice(0,100),'...')}},exports.default=Hits;

/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_Select=__webpack_require__(347),_Select2=_interopRequireDefault(_Select),_classNames=__webpack_require__(14),_classNames2=_interopRequireDefault(_classNames);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var cx=(0,_classNames2.default)('HitsPerPage'),HitsPerPage=function(a){function b(){return _classCallCheck(this,b),_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).apply(this,arguments))}return _inherits(b,a),_createClass(b,[{key:'render',value:function render(){var c=this.props,d=c.currentRefinement,e=c.refine,f=c.items;return _react2.default.createElement(_Select2.default,{onSelect:e,selectedItem:d,items:f,cx:cx})}}]),b}(_react.Component);HitsPerPage.propTypes={refine:_propTypes2.default.func.isRequired,currentRefinement:_propTypes2.default.number.isRequired,transformItems:_propTypes2.default.func,items:_propTypes2.default.arrayOf(_propTypes2.default.shape({value:_propTypes2.default.number.isRequired,label:_propTypes2.default.string}))},exports.default=HitsPerPage;

/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_classNames=__webpack_require__(14),_classNames2=_interopRequireDefault(_classNames),_translatable=__webpack_require__(33),_translatable2=_interopRequireDefault(_translatable);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var cx=(0,_classNames2.default)('InfiniteHits'),InfiniteHits=function(a){function b(){return _classCallCheck(this,b),_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).apply(this,arguments))}return _inherits(b,a),_createClass(b,[{key:'render',value:function render(){var c=this.props,d=c.hitComponent,e=c.hits,f=c.hasMore,g=c.refine,h=c.translate,j=e.map(function(l){return _react2.default.createElement(d,{key:l.objectID,hit:l})}),k=f?_react2.default.createElement('button',_extends({},cx('loadMore'),{onClick:function onClick(){return g()}}),h('loadMore')):_react2.default.createElement('button',_extends({},cx('loadMore'),{disabled:!0}),h('loadMore'));return _react2.default.createElement('div',cx('root'),j,k)}}]),b}(_react.Component);InfiniteHits.propTypes={hits:_propTypes2.default.array,hitComponent:_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.func]).isRequired,hasMore:_propTypes2.default.bool.isRequired,refine:_propTypes2.default.func.isRequired,translate:_propTypes2.default.func.isRequired},InfiniteHits.defaultProps={hitComponent:function hitComponent(a){return _react2.default.createElement('div',{style:{borderBottom:'1px solid #bbb',paddingBottom:'5px',marginBottom:'5px'}},JSON.stringify(a).slice(0,100),'...')}},exports.default=(0,_translatable2.default)({loadMore:'Load more'})(InfiniteHits);

/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _has2=__webpack_require__(57),_has3=_interopRequireDefault(_has2),_extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_Link=__webpack_require__(236),_Link2=_interopRequireDefault(_Link);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var LinkList=function(a){function b(){return _classCallCheck(this,b),_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).apply(this,arguments))}return _inherits(b,a),_createClass(b,[{key:'render',value:function render(){var c=this.props,d=c.cx,e=c.createURL,f=c.items,g=c.onSelect,h=c.canRefine;return _react2.default.createElement('ul',d('root',!h&&'noRefinement'),f.map(function(j){return _react2.default.createElement('li',_extends({key:(0,_has3.default)(j,'key')?j.key:j.value},d('item',j.selected&&!j.disabled&&'itemSelected',j.disabled&&'itemDisabled',j.modifier),{disabled:j.disabled}),j.disabled?_react2.default.createElement('span',d('itemLink','itemLinkDisabled'),(0,_has3.default)(j,'label')?j.label:j.value):_react2.default.createElement(_Link2.default,_extends({},d('itemLink',j.selected&&'itemLinkSelected'),{'aria-label':j.ariaLabel,href:e(j.value),onClick:g.bind(null,j.value)}),(0,_has3.default)(j,'label')?j.label:j.value))}))}}]),b}(_react.Component);LinkList.propTypes={cx:_propTypes2.default.func.isRequired,createURL:_propTypes2.default.func.isRequired,items:_propTypes2.default.arrayOf(_propTypes2.default.shape({value:_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.number,_propTypes2.default.object]).isRequired,key:_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.number]),label:_propTypes2.default.node,modifier:_propTypes2.default.string,ariaLabel:_propTypes2.default.string,disabled:_propTypes2.default.bool})),onSelect:_propTypes2.default.func.isRequired,canRefine:_propTypes2.default.bool.isRequired},exports.default=LinkList;

/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _pick2=__webpack_require__(111),_pick3=_interopRequireDefault(_pick2),_extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_translatable=__webpack_require__(33),_translatable2=_interopRequireDefault(_translatable),_List=__webpack_require__(212),_List2=_interopRequireDefault(_List),_Link=__webpack_require__(236),_Link2=_interopRequireDefault(_Link),_Highlight=__webpack_require__(235),_Highlight2=_interopRequireDefault(_Highlight),_classNames=__webpack_require__(14),_classNames2=_interopRequireDefault(_classNames);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var cx=(0,_classNames2.default)('Menu'),Menu=function(a){function b(){var c,d,e,f;_classCallCheck(this,b);for(var g=arguments.length,h=Array(g),j=0;j<g;j++)h[j]=arguments[j];return f=(d=(e=_possibleConstructorReturn(this,(c=b.__proto__||Object.getPrototypeOf(b)).call.apply(c,[this].concat(h))),e),e.renderItem=function(k,l){var m=e.props.createURL,n=e.props.isFromSearch?_react2.default.createElement(_Highlight2.default,{attributeName:'label',hit:k}):k.label;return _react2.default.createElement(_Link2.default,_extends({},cx('itemLink',k.isRefined&&'itemLinkSelected'),{onClick:function onClick(){return e.selectItem(k,l)},href:m(k.value)}),_react2.default.createElement('span',cx('itemLabel',k.isRefined&&'itemLabelSelected'),n),' ',_react2.default.createElement('span',cx('itemCount',k.isRefined&&'itemCountSelected'),k.count))},e.selectItem=function(k,l){l(),e.props.refine(k.value)},d),_possibleConstructorReturn(e,f)}return _inherits(b,a),_createClass(b,[{key:'componentWillMount',value:function componentWillMount(){this.context.canRefine&&this.context.canRefine(this.props.canRefine)}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(c){this.context.canRefine&&this.context.canRefine(c.canRefine)}},{key:'render',value:function render(){return _react2.default.createElement(_List2.default,_extends({renderItem:this.renderItem,selectItem:this.selectItem,cx:cx},(0,_pick3.default)(this.props,['translate','items','showMore','limitMin','limitMax','isFromSearch','searchForItems','withSearchBox','canRefine'])))}}]),b}(_react.Component);Menu.propTypes={translate:_propTypes2.default.func.isRequired,refine:_propTypes2.default.func.isRequired,searchForItems:_propTypes2.default.func.isRequired,withSearchBox:_propTypes2.default.bool,createURL:_propTypes2.default.func.isRequired,items:_propTypes2.default.arrayOf(_propTypes2.default.shape({label:_propTypes2.default.string.isRequired,value:_propTypes2.default.string.isRequired,count:_propTypes2.default.number.isRequired,isRefined:_propTypes2.default.bool.isRequired})),isFromSearch:_propTypes2.default.bool.isRequired,canRefine:_propTypes2.default.bool.isRequired,showMore:_propTypes2.default.bool,limitMin:_propTypes2.default.number,limitMax:_propTypes2.default.number,transformItems:_propTypes2.default.func},Menu.contextTypes={canRefine:_propTypes2.default.func},exports.default=(0,_translatable2.default)({showMore:function showMore(a){return a?'Show less':'Show more'},noResults:'No results',submit:null,reset:null,resetTitle:'Clear the search query.',submitTitle:'Submit your search query.',placeholder:'Search here\u2026'})(Menu);

/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_List=__webpack_require__(212),_List2=_interopRequireDefault(_List),_classNames=__webpack_require__(14),_classNames2=_interopRequireDefault(_classNames),_translatable=__webpack_require__(33),_translatable2=_interopRequireDefault(_translatable);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var cx=(0,_classNames2.default)('MultiRange'),MultiRange=function(a){function b(){var c,d,e,f;_classCallCheck(this,b);for(var g=arguments.length,h=Array(g),j=0;j<g;j++)h[j]=arguments[j];return f=(d=(e=_possibleConstructorReturn(this,(c=b.__proto__||Object.getPrototypeOf(b)).call.apply(c,[this].concat(h))),e),e.renderItem=function(k){var l=e.props,m=l.refine,n=l.translate,o=''===k.value?n('all'):k.label;return _react2.default.createElement('label',cx(''===k.value&&'itemAll'),_react2.default.createElement('input',_extends({},cx('itemRadio',k.isRefined&&'itemRadioSelected'),{type:'radio',checked:k.isRefined,disabled:k.noRefinement,onChange:m.bind(null,k.value)})),_react2.default.createElement('span',cx('itemBox','itemBox',k.isRefined&&'itemBoxSelected')),_react2.default.createElement('span',cx('itemLabel','itemLabel',k.isRefined&&'itemLabelSelected'),o))},d),_possibleConstructorReturn(e,f)}return _inherits(b,a),_createClass(b,[{key:'componentWillMount',value:function componentWillMount(){this.context.canRefine&&this.context.canRefine(this.props.canRefine)}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(c){this.context.canRefine&&this.context.canRefine(c.canRefine)}},{key:'render',value:function render(){var c=this.props,d=c.items,e=c.canRefine;return _react2.default.createElement(_List2.default,{renderItem:this.renderItem,showMore:!1,canRefine:e,cx:cx,items:d.map(function(f){return _extends({},f,{key:f.value})})})}}]),b}(_react.Component);MultiRange.propTypes={items:_propTypes2.default.arrayOf(_propTypes2.default.shape({label:_propTypes2.default.node.isRequired,value:_propTypes2.default.string.isRequired,isRefined:_propTypes2.default.bool.isRequired,noRefinement:_propTypes2.default.bool.isRequired})).isRequired,refine:_propTypes2.default.func.isRequired,transformItems:_propTypes2.default.func,canRefine:_propTypes2.default.bool.isRequired,translate:_propTypes2.default.func.isRequired},MultiRange.contextTypes={canRefine:_propTypes2.default.func},exports.default=(0,_translatable2.default)({all:'All'})(MultiRange);

/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _range2=__webpack_require__(424),_range3=_interopRequireDefault(_range2),_extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_utils=__webpack_require__(58),_translatable=__webpack_require__(33),_translatable2=_interopRequireDefault(_translatable),_LinkList=__webpack_require__(384),_LinkList2=_interopRequireDefault(_LinkList),_classNames=__webpack_require__(14),_classNames2=_interopRequireDefault(_classNames);var _Mathmin=Math.min;Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _objectWithoutProperties(a,b){var c={};for(var d in a)0<=b.indexOf(d)||Object.prototype.hasOwnProperty.call(a,d)&&(c[d]=a[d]);return c}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var cx=(0,_classNames2.default)('Pagination');function getPagesDisplayedCount(a,b){return _Mathmin(2*a+1,b)}function calculatePaddingLeft(a,b,c,d){return a<=b?a:a>=c-b?d-(c-a):b}function getPages(a,b,c){var d=getPagesDisplayedCount(c,b);if(d===b)return(0,_range3.default)(1,b+1);var e=calculatePaddingLeft(a,c,b,d);return(0,_range3.default)(a-e+1,a+(d-e)+1)}var Pagination=function(a){function b(){return _classCallCheck(this,b),_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).apply(this,arguments))}return _inherits(b,a),_createClass(b,[{key:'componentWillMount',value:function componentWillMount(){this.context.canRefine&&this.context.canRefine(this.props.canRefine)}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(c){this.context.canRefine&&this.context.canRefine(c.canRefine)}},{key:'getItem',value:function getItem(c,d,e){var f=this.props,g=f.nbPages,h=f.maxPages,j=f.translate;return{key:c+'.'+e,modifier:c,disabled:1>e||e>=_Mathmin(h,g),label:j(d,e),value:e,ariaLabel:j('aria'+(0,_utils.capitalize)(d),e)}}},{key:'render',value:function render(){var c=this.props,d=c.nbPages,e=c.maxPages,f=c.currentRefinement,g=c.pagesPadding,h=c.showFirst,j=c.showPrevious,k=c.showNext,l=c.showLast,m=c.refine,n=c.createURL,o=c.translate,p=c.listComponent,q=_objectWithoutProperties(c,['nbPages','maxPages','currentRefinement','pagesPadding','showFirst','showPrevious','showNext','showLast','refine','createURL','translate','listComponent']),r=_Mathmin(d,e),s=r,t=[];return h&&t.push({key:'first',modifier:'itemFirst',disabled:1===f,label:o('first'),value:1,ariaLabel:o('ariaFirst')}),j&&t.push({key:'previous',modifier:'itemPrevious',disabled:1===f,label:o('previous'),value:f-1,ariaLabel:o('ariaPrevious')}),t=t.concat(getPages(f,r,g).map(function(u){return{key:u,modifier:'itemPage',label:o('page',u),value:u,selected:u===f,ariaLabel:o('ariaPage',u)}})),k&&t.push({key:'next',modifier:'itemNext',disabled:f===s||1>=s,label:o('next'),value:f+1,ariaLabel:o('ariaNext')}),l&&t.push({key:'last',modifier:'itemLast',disabled:f===s||1>=s,label:o('last'),value:s,ariaLabel:o('ariaLast')}),_react2.default.createElement(p,_extends({},q,{cx:cx,items:t,onSelect:m,createURL:n}))}}]),b}(_react.Component);Pagination.propTypes={nbPages:_propTypes2.default.number.isRequired,currentRefinement:_propTypes2.default.number.isRequired,refine:_propTypes2.default.func.isRequired,createURL:_propTypes2.default.func.isRequired,canRefine:_propTypes2.default.bool.isRequired,translate:_propTypes2.default.func.isRequired,listComponent:_propTypes2.default.func,showFirst:_propTypes2.default.bool,showPrevious:_propTypes2.default.bool,showNext:_propTypes2.default.bool,showLast:_propTypes2.default.bool,pagesPadding:_propTypes2.default.number,maxPages:_propTypes2.default.number},Pagination.defaultProps={listComponent:_LinkList2.default,showFirst:!0,showPrevious:!0,showNext:!0,showLast:!1,pagesPadding:3,maxPages:Infinity},Pagination.contextTypes={canRefine:_propTypes2.default.func},exports.default=(0,_translatable2.default)({previous:'\u2039',next:'\u203A',first:'\xAB',last:'\xBB',page:function page(a){return a.toString()},ariaPrevious:'Previous page',ariaNext:'Next page',ariaFirst:'First page',ariaLast:'Last page',ariaPage:function ariaPage(a){return'Page '+a.toString()}})(Pagination);

/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_classNames=__webpack_require__(14),_classNames2=_interopRequireDefault(_classNames);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var cx=(0,_classNames2.default)('Panel'),Panel=function(a){function b(c){_classCallCheck(this,b);var d=_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,c));return d.state={canRefine:!0},d.canRefine=function(e){d.setState({canRefine:e})},d}return _inherits(b,a),_createClass(b,[{key:'getChildContext',value:function getChildContext(){return{canRefine:this.canRefine}}}]),_createClass(b,[{key:'render',value:function render(){return _react2.default.createElement('div',cx('root',!this.state.canRefine&&'noRefinement'),_react2.default.createElement('h5',cx('title'),this.props.title),this.props.children)}}]),b}(_react.Component);Panel.propTypes={title:_propTypes2.default.string.isRequired,children:_propTypes2.default.node},Panel.childContextTypes={canRefine:_propTypes2.default.func},exports.default=Panel;

/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_translatable=__webpack_require__(33),_translatable2=_interopRequireDefault(_translatable),_classNames=__webpack_require__(14),_classNames2=_interopRequireDefault(_classNames);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var cx=(0,_classNames2.default)('PoweredBy'),AlgoliaLogo=function(){return _react2.default.createElement('svg',{xmlns:'http://www.w3.org/2000/svg',baseProfile:'basic',viewBox:'0 0 1366 362'},_react2.default.createElement('linearGradient',{id:'g',x1:'428.258',x2:'434.145',y1:'404.15',y2:'409.85',gradientUnits:'userSpaceOnUse',gradientTransform:'matrix(94.045 0 0 -94.072 -40381.527 38479.52)'},_react2.default.createElement('stop',{offset:'0',stopColor:'#00AEFF'}),_react2.default.createElement('stop',{offset:'1',stopColor:'#3369E7'})),_react2.default.createElement('path',{d:'M61.8 15.4h242.8c23.9 0 43.4 19.4 43.4 43.4v242.9c0 23.9-19.4 43.4-43.4 43.4H61.8c-23.9 0-43.4-19.4-43.4-43.4v-243c0-23.9 19.4-43.3 43.4-43.3z',fill:'url(#g)'}),_react2.default.createElement('path',{d:'M187 98.7c-51.4 0-93.1 41.7-93.1 93.2S135.6 285 187 285s93.1-41.7 93.1-93.2-41.6-93.1-93.1-93.1zm0 158.8c-36.2 0-65.6-29.4-65.6-65.6s29.4-65.6 65.6-65.6 65.6 29.4 65.6 65.6-29.3 65.6-65.6 65.6zm0-117.8v48.9c0 1.4 1.5 2.4 2.8 1.7l43.4-22.5c1-.5 1.3-1.7.8-2.7-9-15.8-25.7-26.6-45-27.3-1 0-2 .8-2 1.9zm-60.8-35.9l-5.7-5.7c-5.6-5.6-14.6-5.6-20.2 0l-6.8 6.8c-5.6 5.6-5.6 14.6 0 20.2l5.6 5.6c.9.9 2.2.7 3-.2 3.3-4.5 6.9-8.8 10.9-12.8 4.1-4.1 8.3-7.7 12.9-11 1-.6 1.1-2 .3-2.9zM217.5 89V77.7c0-7.9-6.4-14.3-14.3-14.3h-33.3c-7.9 0-14.3 6.4-14.3 14.3v11.6c0 1.3 1.2 2.2 2.5 1.9 9.3-2.7 19.1-4.1 29-4.1 9.5 0 18.9 1.3 28 3.8 1.2.3 2.4-.6 2.4-1.9z',fill:'#FFFFFF'}),_react2.default.createElement('path',{d:'M842.5 267.6c0 26.7-6.8 46.2-20.5 58.6-13.7 12.4-34.6 18.6-62.8 18.6-10.3 0-31.7-2-48.8-5.8l6.3-31c14.3 3 33.2 3.8 43.1 3.8 15.7 0 26.9-3.2 33.6-9.6s10-15.9 10-28.5v-6.4c-3.9 1.9-9 3.8-15.3 5.8-6.3 1.9-13.6 2.9-21.8 2.9-10.8 0-20.6-1.7-29.5-5.1-8.9-3.4-16.6-8.4-22.9-15-6.3-6.6-11.3-14.9-14.8-24.8s-5.3-27.6-5.3-40.6c0-12.2 1.9-27.5 5.6-37.7 3.8-10.2 9.2-19 16.5-26.3 7.2-7.3 16-12.9 26.3-17s22.4-6.7 35.5-6.7c12.7 0 24.4 1.6 35.8 3.5 11.4 1.9 21.1 3.9 29 6.1v155.2zm-108.7-77.2c0 16.4 3.6 34.6 10.8 42.2 7.2 7.6 16.5 11.4 27.9 11.4 6.2 0 12.1-.9 17.6-2.6 5.5-1.7 9.9-3.7 13.4-6.1v-97.1c-2.8-.6-14.5-3-25.8-3.3-14.2-.4-25 5.4-32.6 14.7-7.5 9.3-11.3 25.6-11.3 40.8zm294.3 0c0 13.2-1.9 23.2-5.8 34.1s-9.4 20.2-16.5 27.9c-7.1 7.7-15.6 13.7-25.6 17.9s-25.4 6.6-33.1 6.6c-7.7-.1-23-2.3-32.9-6.6-9.9-4.3-18.4-10.2-25.5-17.9-7.1-7.7-12.6-17-16.6-27.9s-6-20.9-6-34.1c0-13.2 1.8-25.9 5.8-36.7 4-10.8 9.6-20 16.8-27.7s15.8-13.6 25.6-17.8c9.9-4.2 20.8-6.2 32.6-6.2s22.7 2.1 32.7 6.2c10 4.2 18.6 10.1 25.6 17.8 7.1 7.7 12.6 16.9 16.6 27.7 4.2 10.8 6.3 23.5 6.3 36.7zm-40 .1c0-16.9-3.7-31-10.9-40.8-7.2-9.9-17.3-14.8-30.2-14.8-12.9 0-23 4.9-30.2 14.8-7.2 9.9-10.7 23.9-10.7 40.8 0 17.1 3.6 28.6 10.8 38.5 7.2 10 17.3 14.9 30.2 14.9 12.9 0 23-5 30.2-14.9 7.2-10 10.8-21.4 10.8-38.5zm127.1 86.4c-64.1.3-64.1-51.8-64.1-60.1L1051 32l39.1-6.2v183.6c0 4.7 0 34.5 25.1 34.6v32.9zm68.9 0h-39.3V108.1l39.3-6.2v175zm-19.7-193.5c13.1 0 23.8-10.6 23.8-23.7S1177.6 36 1164.4 36s-23.8 10.6-23.8 23.7 10.7 23.7 23.8 23.7zm117.4 18.6c12.9 0 23.8 1.6 32.6 4.8 8.8 3.2 15.9 7.7 21.1 13.4s8.9 13.5 11.1 21.7c2.3 8.2 3.4 17.2 3.4 27.1v100.6c-6 1.3-15.1 2.8-27.3 4.6s-25.9 2.7-41.1 2.7c-10.1 0-19.4-1-27.7-2.9-8.4-1.9-15.5-5-21.5-9.3-5.9-4.3-10.5-9.8-13.9-16.6-3.3-6.8-5-16.4-5-26.4 0-9.6 1.9-15.7 5.6-22.3 3.8-6.6 8.9-12 15.3-16.2 6.5-4.2 13.9-7.2 22.4-9s17.4-2.7 26.6-2.7c4.3 0 8.8.3 13.6.8s9.8 1.4 15.2 2.7v-6.4c0-4.5-.5-8.8-1.6-12.8-1.1-4.1-3-7.6-5.6-10.7-2.7-3.1-6.2-5.5-10.6-7.2s-10-3-16.7-3c-9 0-17.2 1.1-24.7 2.4-7.5 1.3-13.7 2.8-18.4 4.5l-4.7-32.1c4.9-1.7 12.2-3.4 21.6-5.1s19.5-2.6 30.3-2.6zm3.3 141.9c12 0 20.9-.7 27.1-1.9v-39.8c-2.2-.6-5.3-1.3-9.4-1.9-4.1-.6-8.6-1-13.6-1-4.3 0-8.7.3-13.1 1-4.4.6-8.4 1.8-11.9 3.5s-6.4 4.1-8.5 7.2c-2.2 3.1-3.2 4.9-3.2 9.6 0 9.2 3.2 14.5 9 18 5.9 3.6 13.7 5.3 23.6 5.3zM512.9 103c12.9 0 23.8 1.6 32.6 4.8 8.8 3.2 15.9 7.7 21.1 13.4 5.3 5.8 8.9 13.5 11.1 21.7 2.3 8.2 3.4 17.2 3.4 27.1v100.6c-6 1.3-15.1 2.8-27.3 4.6-12.2 1.8-25.9 2.7-41.1 2.7-10.1 0-19.4-1-27.7-2.9-8.4-1.9-15.5-5-21.5-9.3-5.9-4.3-10.5-9.8-13.9-16.6-3.3-6.8-5-16.4-5-26.4 0-9.6 1.9-15.7 5.6-22.3 3.8-6.6 8.9-12 15.3-16.2 6.5-4.2 13.9-7.2 22.4-9s17.4-2.7 26.6-2.7c4.3 0 8.8.3 13.6.8 4.7.5 9.8 1.4 15.2 2.7v-6.4c0-4.5-.5-8.8-1.6-12.8-1.1-4.1-3-7.6-5.6-10.7-2.7-3.1-6.2-5.5-10.6-7.2-4.4-1.7-10-3-16.7-3-9 0-17.2 1.1-24.7 2.4-7.5 1.3-13.7 2.8-18.4 4.5l-4.7-32.1c4.9-1.7 12.2-3.4 21.6-5.1 9.4-1.8 19.5-2.6 30.3-2.6zm3.4 142c12 0 20.9-.7 27.1-1.9v-39.8c-2.2-.6-5.3-1.3-9.4-1.9-4.1-.6-8.6-1-13.6-1-4.3 0-8.7.3-13.1 1-4.4.6-8.4 1.8-11.9 3.5s-6.4 4.1-8.5 7.2c-2.2 3.1-3.2 4.9-3.2 9.6 0 9.2 3.2 14.5 9 18s13.7 5.3 23.6 5.3zm158.5 31.9c-64.1.3-64.1-51.8-64.1-60.1L610.6 32l39.1-6.2v183.6c0 4.7 0 34.5 25.1 34.6v32.9z',fill:'#182359'}))},PoweredBy=function(a){function b(){return _classCallCheck(this,b),_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).apply(this,arguments))}return _inherits(b,a),_createClass(b,[{key:'render',value:function render(){var c=this.props,d=c.translate,e=c.url;return _react2.default.createElement('div',cx('root'),_react2.default.createElement('span',cx('searchBy'),d('searchBy'),' '),_react2.default.createElement('a',_extends({href:e,target:'_blank'},cx('algoliaLink')),_react2.default.createElement(AlgoliaLogo,null)))}}]),b}(_react.Component);PoweredBy.propTypes={url:_propTypes2.default.string.isRequired,translate:_propTypes2.default.func.isRequired},exports.default=(0,_translatable2.default)({searchBy:'Search by'})(PoweredBy);

/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _isNaN2=__webpack_require__(218),_isNaN3=_interopRequireDefault(_isNaN2),_extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_createClass=function(){function a(b,c){for(var f,d=0;d<c.length;d++)f=c[d],f.enumerable=f.enumerable||!1,f.configurable=!0,'value'in f&&(f.writable=!0),Object.defineProperty(b,f.key,f)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_translatable=__webpack_require__(33),_translatable2=_interopRequireDefault(_translatable),_classNames=__webpack_require__(14),_classNames2=_interopRequireDefault(_classNames);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var cx=(0,_classNames2.default)('RangeInput'),RangeInput=function(a){function b(c){_classCallCheck(this,b);var d=_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,c));return d.onSubmit=function(f){f.preventDefault(),f.stopPropagation(),(0,_isNaN3.default)(parseFloat(d.state.from,10))||(0,_isNaN3.default)(parseFloat(d.state.to,10))||d.props.refine({min:d.state.from,max:d.state.to})},d.state=d.props.canRefine?{from:c.currentRefinement.min,to:c.currentRefinement.max}:{from:'',to:''},d}return _inherits(b,a),_createClass(b,[{key:'componentWillMount',value:function componentWillMount(){this.context.canRefine&&this.context.canRefine(this.props.canRefine)}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(c){c.canRefine&&this.setState({from:c.currentRefinement.min,to:c.currentRefinement.max}),this.context.canRefine&&this.context.canRefine(c.canRefine)}},{key:'render',value:function render(){var c=this,d=this.props,f=d.translate,g=d.canRefine;return _react2.default.createElement('form',_extends({},cx('root',!g&&'noRefinement'),{onSubmit:this.onSubmit}),_react2.default.createElement('fieldset',_extends({disabled:!g},cx('fieldset')),_react2.default.createElement('label',cx('labelMin'),_react2.default.createElement('input',_extends({},cx('inputMin'),{type:'number',value:this.state.from,onChange:function onChange(h){return c.setState({from:h.target.value})}}))),_react2.default.createElement('span',cx('separator'),f('separator')),_react2.default.createElement('label',cx('labelMax'),_react2.default.createElement('input',_extends({},cx('inputMax'),{type:'number',value:this.state.to,onChange:function onChange(h){return c.setState({to:h.target.value})}}))),_react2.default.createElement('button',_extends({},cx('submit'),{type:'submit'}),f('submit'))))}}]),b}(_react.Component);RangeInput.propTypes={translate:_propTypes2.default.func.isRequired,refine:_propTypes2.default.func.isRequired,min:_propTypes2.default.number,max:_propTypes2.default.number,currentRefinement:_propTypes2.default.shape({min:_propTypes2.default.number,max:_propTypes2.default.number}),canRefine:_propTypes2.default.bool.isRequired},RangeInput.contextTypes={canRefine:_propTypes2.default.func},exports.default=(0,_translatable2.default)({submit:'ok',separator:'to'})(RangeInput);

/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _pick2=__webpack_require__(111),_pick3=_interopRequireDefault(_pick2),_extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_translatable=__webpack_require__(33),_translatable2=_interopRequireDefault(_translatable),_List=__webpack_require__(212),_List2=_interopRequireDefault(_List),_classNames=__webpack_require__(14),_classNames2=_interopRequireDefault(_classNames),_Highlight=__webpack_require__(235),_Highlight2=_interopRequireDefault(_Highlight);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var cx=(0,_classNames2.default)('RefinementList'),RefinementList=function(a){function b(c){_classCallCheck(this,b);var d=_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,c));return d.selectItem=function(e,f){f(),d.props.refine(e.value)},d.renderItem=function(e,f){var g=d.props.isFromSearch?_react2.default.createElement(_Highlight2.default,{attributeName:'label',hit:e}):e.label;return _react2.default.createElement('label',null,_react2.default.createElement('input',_extends({},cx('itemCheckbox',e.isRefined&&'itemCheckboxSelected'),{type:'checkbox',checked:e.isRefined,onChange:function onChange(){return d.selectItem(e,f)}})),_react2.default.createElement('span',cx('itemBox','itemBox',e.isRefined&&'itemBoxSelected')),_react2.default.createElement('span',cx('itemLabel','itemLabel',e.isRefined&&'itemLabelSelected'),g),' ',_react2.default.createElement('span',cx('itemCount',e.isRefined&&'itemCountSelected'),e.count))},d.state={query:''},d}return _inherits(b,a),_createClass(b,[{key:'componentWillMount',value:function componentWillMount(){this.context.canRefine&&this.context.canRefine(this.props.canRefine)}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(c){this.context.canRefine&&this.context.canRefine(c.canRefine)}},{key:'render',value:function render(){return _react2.default.createElement('div',null,_react2.default.createElement(_List2.default,_extends({renderItem:this.renderItem,selectItem:this.selectItem,cx:cx},(0,_pick3.default)(this.props,['translate','items','showMore','limitMin','limitMax','isFromSearch','searchForItems','withSearchBox','canRefine']),{query:this.state.query})))}}]),b}(_react.Component);RefinementList.propTypes={translate:_propTypes2.default.func.isRequired,refine:_propTypes2.default.func.isRequired,searchForItems:_propTypes2.default.func.isRequired,withSearchBox:_propTypes2.default.bool,createURL:_propTypes2.default.func.isRequired,items:_propTypes2.default.arrayOf(_propTypes2.default.shape({label:_propTypes2.default.string.isRequired,value:_propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,count:_propTypes2.default.number.isRequired,isRefined:_propTypes2.default.bool.isRequired})),isFromSearch:_propTypes2.default.bool.isRequired,canRefine:_propTypes2.default.bool.isRequired,showMore:_propTypes2.default.bool,limitMin:_propTypes2.default.number,limitMax:_propTypes2.default.number,transformItems:_propTypes2.default.func},RefinementList.contextTypes={canRefine:_propTypes2.default.func},exports.default=(0,_translatable2.default)({showMore:function showMore(a){return a?'Show less':'Show more'},noResults:'No results',submit:null,reset:null,resetTitle:'Clear the search query.',submitTitle:'Submit your search query.',placeholder:'Search here\u2026'})(RefinementList);

/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_reactDom=__webpack_require__(429);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var ScrollTo=function(a){function b(){return _classCallCheck(this,b),_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).apply(this,arguments))}return _inherits(b,a),_createClass(b,[{key:'componentDidUpdate',value:function componentDidUpdate(c){var d=this.props.value;if(d!==c.value){var e=(0,_reactDom.findDOMNode)(this);e.scrollIntoView()}}},{key:'render',value:function render(){return _react.Children.only(this.props.children)}}]),b}(_react.Component);ScrollTo.propTypes={value:_propTypes2.default.any,children:_propTypes2.default.node},exports.default=ScrollTo;

/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a};Object.defineProperty(exports,'__esModule',{value:!0});exports.default=Snippet;var _propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_Highlighter=__webpack_require__(345),_Highlighter2=_interopRequireDefault(_Highlighter);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function Snippet(a){return _react2.default.createElement(_Highlighter2.default,_extends({highlightProperty:'_snippetResult'},a))}Snippet.propTypes={hit:_propTypes2.default.object.isRequired,attributeName:_propTypes2.default.string.isRequired,highlight:_propTypes2.default.func.isRequired,tagName:_propTypes2.default.string};

/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _createClass=function(){function a(b,c){for(var f,d=0;d<c.length;d++)f=c[d],f.enumerable=f.enumerable||!1,f.configurable=!0,'value'in f&&(f.writable=!0),Object.defineProperty(b,f.key,f)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_Select=__webpack_require__(347),_Select2=_interopRequireDefault(_Select),_classNames=__webpack_require__(14),_classNames2=_interopRequireDefault(_classNames);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var cx=(0,_classNames2.default)('SortBy'),SortBy=function(a){function b(){var c,d,f,g;_classCallCheck(this,b);for(var h=arguments.length,j=Array(h),k=0;k<h;k++)j[k]=arguments[k];return g=(d=(f=_possibleConstructorReturn(this,(c=b.__proto__||Object.getPrototypeOf(b)).call.apply(c,[this].concat(j))),f),f.onChange=function(l){f.props.refine(l.target.value)},d),_possibleConstructorReturn(f,g)}return _inherits(b,a),_createClass(b,[{key:'render',value:function render(){var c=this.props,d=c.refine,f=c.items,g=c.currentRefinement;return _react2.default.createElement(_Select2.default,{cx:cx,selectedItem:g,onSelect:d,items:f})}}]),b}(_react.Component);SortBy.propTypes={refine:_propTypes2.default.func.isRequired,items:_propTypes2.default.arrayOf(_propTypes2.default.shape({label:_propTypes2.default.string,value:_propTypes2.default.string.isRequired})).isRequired,currentRefinement:_propTypes2.default.string.isRequired,transformItems:_propTypes2.default.func},exports.default=SortBy;

/***/ }),
/* 395 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _isEmpty2=__webpack_require__(16),_isEmpty3=_interopRequireDefault(_isEmpty2),_extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_createClass=function(){function a(b,c){for(var f,d=0;d<c.length;d++)f=c[d],f.enumerable=f.enumerable||!1,f.configurable=!0,'value'in f&&(f.writable=!0),Object.defineProperty(b,f.key,f)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_translatable=__webpack_require__(33),_translatable2=_interopRequireDefault(_translatable),_classNames=__webpack_require__(14),_classNames2=_interopRequireDefault(_classNames);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var cx=(0,_classNames2.default)('StarRating'),StarRating=function(a){function b(){return _classCallCheck(this,b),_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).apply(this,arguments))}return _inherits(b,a),_createClass(b,[{key:'componentWillMount',value:function componentWillMount(){this.context.canRefine&&this.context.canRefine(this.props.canRefine)}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(c){this.context.canRefine&&this.context.canRefine(c.canRefine)}},{key:'onClick',value:function onClick(c,d,f){f.preventDefault(),f.stopPropagation(),c===this.props.currentRefinement.min&&d===this.props.currentRefinement.max?this.props.refine({min:this.props.min,max:this.props.max}):this.props.refine({min:c,max:d})}},{key:'buildItem',value:function buildItem(c){for(var t,d=c.max,f=c.lowerBound,g=c.count,h=c.translate,j=c.createURL,k=c.isLastSelectableItem,l=!g,m=this.props.currentRefinement.min<f,n=k&&m||!l&&f===this.props.currentRefinement.min&&d===this.props.currentRefinement.max,o=[],s=0;s<d;s++)t=s>=f?'ratingIconEmpty':'ratingIcon',o.push(_react2.default.createElement('span',_extends({key:s},cx(t,n&&t+'Selected',l&&t+'Disabled'))));var p=k&&n,q=p?'div':'a',r=p?{}:{href:j({min:f,max:d}),onClick:this.onClick.bind(this,f,d)};return _react2.default.createElement(q,_extends({},cx('ratingLink',n&&'ratingLinkSelected',l&&'ratingLinkDisabled'),{disabled:l,key:f},r),o,_react2.default.createElement('span',cx('ratingLabel',n&&'ratingLabelSelected',l&&'ratingLabelDisabled'),h('ratingLabel')),_react2.default.createElement('span',null,' '),_react2.default.createElement('span',cx('ratingCount',n&&'ratingCountSelected',l&&'ratingCountDisabled'),g))}},{key:'render',value:function render(){for(var c=this,d=this.props,f=d.translate,g=d.refine,h=d.min,j=d.max,k=d.count,l=d.createURL,m=d.canRefine,n=[],o=function _loop(p){var q=!(0,_isEmpty3.default)(k.filter(function(t){return+t.value===p})),r=k.reduce(function(t,u){return u.value<t.value||!t.value&&q?u:t},{}),s=k.reduce(function(t,u){return u.value>=p&&q?t+u.count:t},0);n.push(c.buildItem({lowerBound:p,max:j,refine:g,count:s,translate:f,createURL:l,isLastSelectableItem:p===+r.value}))},p=j;p>=h;p--)o(p);return _react2.default.createElement('div',cx('root',!m&&'noRefinement'),n)}}]),b}(_react.Component);StarRating.propTypes={translate:_propTypes2.default.func.isRequired,refine:_propTypes2.default.func.isRequired,createURL:_propTypes2.default.func.isRequired,min:_propTypes2.default.number,max:_propTypes2.default.number,currentRefinement:_propTypes2.default.shape({min:_propTypes2.default.number,max:_propTypes2.default.number}),count:_propTypes2.default.arrayOf(_propTypes2.default.shape({value:_propTypes2.default.string,count:_propTypes2.default.number})),canRefine:_propTypes2.default.bool.isRequired},StarRating.contextTypes={canRefine:_propTypes2.default.func},exports.default=(0,_translatable2.default)({ratingLabel:' & Up'})(StarRating);

/***/ }),
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_translatable=__webpack_require__(33),_translatable2=_interopRequireDefault(_translatable),_classNames=__webpack_require__(14),_classNames2=_interopRequireDefault(_classNames);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var cx=(0,_classNames2.default)('Stats'),Stats=function(a){function b(){return _classCallCheck(this,b),_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).apply(this,arguments))}return _inherits(b,a),_createClass(b,[{key:'render',value:function render(){var c=this.props,d=c.translate,e=c.nbHits,f=c.processingTimeMS;return _react2.default.createElement('span',cx('root'),d('stats',e,f))}}]),b}(_react.Component);Stats.propTypes={translate:_propTypes2.default.func.isRequired,nbHits:_propTypes2.default.number.isRequired,processingTimeMS:_propTypes2.default.number.isRequired},exports.default=(0,_translatable2.default)({stats:function stats(a,b){return a.toLocaleString()+' results found in '+b.toLocaleString()+'ms'}})(Stats);

/***/ }),
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_createClass=function(){function a(b,c){for(var f,d=0;d<c.length;d++)f=c[d],f.enumerable=f.enumerable||!1,f.configurable=!0,'value'in f&&(f.writable=!0),Object.defineProperty(b,f.key,f)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_classNames=__webpack_require__(14),_classNames2=_interopRequireDefault(_classNames);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var cx=(0,_classNames2.default)('Toggle'),Toggle=function(a){function b(){var c,d,f,g;_classCallCheck(this,b);for(var h=arguments.length,j=Array(h),k=0;k<h;k++)j[k]=arguments[k];return g=(d=(f=_possibleConstructorReturn(this,(c=b.__proto__||Object.getPrototypeOf(b)).call.apply(c,[this].concat(j))),f),f.onChange=function(l){f.props.refine(l.target.checked)},d),_possibleConstructorReturn(f,g)}return _inherits(b,a),_createClass(b,[{key:'render',value:function render(){var c=this.props,d=c.currentRefinement,f=c.label;return _react2.default.createElement('label',cx('root'),_react2.default.createElement('input',_extends({},cx('checkbox'),{type:'checkbox',checked:d,onChange:this.onChange})),_react2.default.createElement('span',cx('label'),f))}}]),b}(_react.Component);Toggle.propTypes={currentRefinement:_propTypes2.default.bool.isRequired,refine:_propTypes2.default.func.isRequired,label:_propTypes2.default.string.isRequired},exports.default=Toggle;

/***/ }),
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var Index=function(a){function b(c,d){_classCallCheck(this,b);var e=_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,c)),f=d.ais.widgetsManager;return e.unregisterWidget=f.registerWidget({getSearchParameters:function getSearchParameters(g){return e.getSearchParameters(g,e.props)},multiIndexContext:{targetedIndex:e.props.indexName}}),e}return _inherits(b,a),_createClass(b,[{key:'componentWillUnmount',value:function componentWillUnmount(){this.unregisterWidget()}},{key:'getChildContext',value:function getChildContext(){return{multiIndexContext:{targetedIndex:this.props.indexName}}}},{key:'getSearchParameters',value:function getSearchParameters(c,d){return c.setIndex(d.indexName)}},{key:'render',value:function render(){var c=_react.Children.count(this.props.children),d=this.props.root,e=d.Root,f=d.props;return 0===c?null:_react2.default.createElement(e,f,this.props.children)}}]),b}(_react.Component);Index.propTypes={indexName:_propTypes2.default.string.isRequired,children:_propTypes2.default.node,root:_propTypes2.default.shape({Root:_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.func]),props:_propTypes2.default.object}).isRequired},Index.childContextTypes={multiIndexContext:_propTypes2.default.object.isRequired},Index.contextTypes={ais:_propTypes2.default.object.isRequired},exports.default=Index;

/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes),_react=__webpack_require__(4),_react2=_interopRequireDefault(_react),_createInstantSearchManager=__webpack_require__(400),_createInstantSearchManager2=_interopRequireDefault(_createInstantSearchManager);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function validateNextProps(a,b){if(!a.searchState&&b.searchState)throw new Error('You can\'t switch <InstantSearch> from being uncontrolled to controlled');else if(a.searchState&&!b.searchState)throw new Error('You can\'t switch <InstantSearch> from being controlled to uncontrolled')}var InstantSearch=function(a){function b(c){_classCallCheck(this,b);var d=_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,c));d.isControlled=!!c.searchState;var e=d.isControlled?c.searchState:{};return d.isUnmounting=!1,d.aisManager=(0,_createInstantSearchManager2.default)({indexName:c.indexName,searchParameters:c.searchParameters,algoliaClient:c.algoliaClient,initialState:e}),d}return _inherits(b,a),_createClass(b,[{key:'componentWillReceiveProps',value:function componentWillReceiveProps(c){validateNextProps(this.props,c),this.props.indexName!==c.indexName&&this.aisManager.updateIndex(c.indexName),this.props.algoliaClient!==c.algoliaClient&&this.aisManager.updateClient(c.algoliaClient),this.isControlled&&this.aisManager.onExternalStateUpdate(c.searchState)}},{key:'componentWillUnmount',value:function componentWillUnmount(){this.isUnmounting=!0,this.aisManager.skipSearch()}},{key:'getChildContext',value:function getChildContext(){return this._aisContextCache||(this._aisContextCache={ais:{onInternalStateUpdate:this.onWidgetsInternalStateUpdate.bind(this),createHrefForState:this.createHrefForState.bind(this),onSearchForFacetValues:this.onSearchForFacetValues.bind(this),onSearchStateChange:this.onSearchStateChange.bind(this)}}),{ais:_extends({},this._aisContextCache.ais,{store:this.aisManager.store,widgetsManager:this.aisManager.widgetsManager,mainTargetedIndex:this.props.indexName})}}},{key:'createHrefForState',value:function createHrefForState(c){return c=this.aisManager.transitionState(c),this.isControlled&&this.props.createURL?this.props.createURL(c,this.getKnownKeys()):'#'}},{key:'onWidgetsInternalStateUpdate',value:function onWidgetsInternalStateUpdate(c){c=this.aisManager.transitionState(c),this.onSearchStateChange(c),this.isControlled||this.aisManager.onExternalStateUpdate(c)}},{key:'onSearchStateChange',value:function onSearchStateChange(c){this.props.onSearchStateChange&&!this.isUnmounting&&this.props.onSearchStateChange(c)}},{key:'onSearchForFacetValues',value:function onSearchForFacetValues(c){this.aisManager.onSearchForFacetValues(c)}},{key:'getKnownKeys',value:function getKnownKeys(){return this.aisManager.getWidgetsIds()}},{key:'render',value:function render(){var c=_react.Children.count(this.props.children),d=this.props.root,e=d.Root,f=d.props;return 0===c?null:_react2.default.createElement(e,f,this.props.children)}}]),b}(_react.Component);InstantSearch.propTypes={indexName:_propTypes2.default.string.isRequired,algoliaClient:_propTypes2.default.object.isRequired,searchParameters:_propTypes2.default.object,createURL:_propTypes2.default.func,searchState:_propTypes2.default.object,onSearchStateChange:_propTypes2.default.func,children:_propTypes2.default.node,root:_propTypes2.default.shape({Root:_propTypes2.default.oneOfType([_propTypes2.default.string,_propTypes2.default.func]),props:_propTypes2.default.object}).isRequired},InstantSearch.childContextTypes={ais:_propTypes2.default.object.isRequired},exports.default=InstantSearch;

/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _isEmpty2=__webpack_require__(16),_isEmpty3=_interopRequireDefault(_isEmpty2),_omit2=__webpack_require__(51),_omit3=_interopRequireDefault(_omit2),_extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a};Object.defineProperty(exports,'__esModule',{value:!0});exports.default=createInstantSearchManager;var _algoliasearchHelper=__webpack_require__(214),_algoliasearchHelper2=_interopRequireDefault(_algoliasearchHelper),_createWidgetsManager=__webpack_require__(402),_createWidgetsManager2=_interopRequireDefault(_createWidgetsManager),_createStore=__webpack_require__(401),_createStore2=_interopRequireDefault(_createStore),_highlightTags=__webpack_require__(213),_highlightTags2=_interopRequireDefault(_highlightTags);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function createInstantSearchManager(a){function d(D){return A.getWidgets().filter(function(E){return!!E.getMetadata}).map(function(E){return E.getMetadata(D)})}function e(){y={};var D=A.getWidgets().filter(function(G){return!!G.getSearchParameters}).filter(function(G){return!G.multiIndexContext}).reduce(function(G,H){return H.getSearchParameters(G)},z);y[D.index]=p;var E=A.getWidgets().filter(function(G){return!!G.getSearchParameters}).filter(function(G){return G.multiIndexContext&&G.multiIndexContext.targetedIndex!==p}).reduce(function(G,H){var I=H.multiIndexContext.targetedIndex,J=G.find(function(K){return K.targetedIndex===I});return J?J.widgets.push(H):G.push({targetedIndex:I,widgets:[H]}),G},[]),F=A.getWidgets().filter(function(G){return!!G.getSearchParameters}).filter(function(G){return G.multiIndexContext&&G.multiIndexContext.targetedIndex===p}).reduce(function(G,H){return H.getSearchParameters(G)},D);return{sharedParameters:D,mainIndexParameters:F,derivatedWidgets:E}}function f(){if(!C){var D=e(w.state),E=D.sharedParameters,F=D.mainIndexParameters,G=D.derivatedWidgets;Object.keys(x).forEach(function(H){return x[H].detach()}),x={},w.setState(E),G.forEach(function(H){var I=H.targetedIndex,J=w.derive(function(){var K=H.widgets.reduce(function(L,M){return M.getSearchParameters(L)},E);return y[K.index]=I,K});J.on('result',g),J.on('error',h),x[I]=J}),w.setState(F),w.search()}}function g(D){var E=B.getState(),F=E.results?E.results:[];(0,_isEmpty3.default)(x)?F=D:F[y[D.index]]=D;var G=(0,_omit3.default)(_extends({},B.getState(),{results:F,searching:!1}),'resultsFacetValues');B.setState(G)}function h(D){var E=(0,_omit3.default)(_extends({},B.getState(),{error:D,searching:!1}),'resultsFacetValues');B.setState(E)}var p=a.indexName,q=a.initialState,r=q===void 0?{}:q,s=a.algoliaClient,t=a.searchParameters,u=t===void 0?{}:t,v=new _algoliasearchHelper.SearchParameters(_extends({},u,{index:p},_highlightTags2.default)),w=(0,_algoliasearchHelper2.default)(s,p,v);w.on('result',g),w.on('error',h);var x={},y={},z=w.state,A=(0,_createWidgetsManager2.default)(function(){var D=d(B.getState().widgets);B.setState(_extends({},B.getState(),{metadata:D,searching:!0})),f()}),B=(0,_createStore2.default)({widgets:r,metadata:[],results:null,error:null,searching:!1,searchingForFacetValues:!1}),C=!1;return{store:B,widgetsManager:A,getWidgetsIds:function(){return B.getState().metadata.reduce(function(D,E){return'undefined'==typeof E.id?D:D.concat(E.id)},[])},onExternalStateUpdate:function(D){var E=d(D);B.setState(_extends({},B.getState(),{widgets:D,metadata:E,searching:!0})),f()},transitionState:function(D){var E=B.getState().widgets;return A.getWidgets().filter(function(F){return!!F.transitionState}).reduce(function(F,G){return G.transitionState(E,F)},D)},onSearchForFacetValues:function(D){B.setState(_extends({},B.getState(),{searchingForFacetValues:!0})),w.searchForFacetValues(D.facetName,D.query).then(function(E){var F;B.setState(_extends({},B.getState(),{resultsFacetValues:_extends({},B.getState().resultsFacetValues,(F={},_defineProperty(F,D.facetName,E.facetHits),_defineProperty(F,'query',D.query),F)),searchingForFacetValues:!1}))},function(E){B.setState(_extends({},B.getState(),{error:E,searchingForFacetValues:!1}))}).catch(function(E){setTimeout(function(){throw E})})},updateClient:function(D){w.setClient(D),f()},updateIndex:function(D){z=z.setIndex(D),f()},skipSearch:function(){C=!0}}}

/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=createStore;function createStore(a){function b(){d.forEach(function(e){return e()})}var c=a,d=[];return{getState:function getState(){return c},setState:function setState(e){c=e,b()},subscribe:function subscribe(e){return d.push(e),function(){d.splice(d.indexOf(e),1)}}}}

/***/ }),
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0}),exports.default=createWidgetsManager;var _utils=__webpack_require__(58);function createWidgetsManager(a){function b(){d||(d=!0,(0,_utils.defer)(function(){d=!1,a()}))}var c=[],d=!1;return{registerWidget:function registerWidget(e){return c.push(e),b(),function(){c.splice(c.indexOf(e),1),b()}},update:b,getWidgets:function getWidgets(){return c}}}

/***/ }),
/* 403 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0}),exports.withKeysPropType=exports.stateManagerPropType=exports.configManagerPropType=void 0;var _propTypes=__webpack_require__(1),_propTypes2=_interopRequireDefault(_propTypes);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var configManagerPropType=exports.configManagerPropType=_propTypes2.default.shape({register:_propTypes2.default.func.isRequired,swap:_propTypes2.default.func.isRequired,unregister:_propTypes2.default.func.isRequired}),stateManagerPropType=exports.stateManagerPropType=_propTypes2.default.shape({createURL:_propTypes2.default.func.isRequired,setState:_propTypes2.default.func.isRequired,getState:_propTypes2.default.func.isRequired,unlisten:_propTypes2.default.func.isRequired}),withKeysPropType=exports.withKeysPropType=function(a){return function(b,c,d){var e=b[c];if(e){var f=!0,g=!1,h=void 0;try{for(var j,k,i=Object.keys(e)[Symbol.iterator]();!(f=(j=i.next()).done);f=!0)if(k=j.value,-1===a.indexOf(k))return new Error('Unknown `'+c+'` key `'+k+'`. Check the render method '+('of `'+d+'`.'))}catch(k){g=!0,h=k}finally{try{!f&&i.return&&i.return()}finally{if(g)throw h}}}}};

/***/ }),
/* 404 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {module.exports = AlgoliaSearchCore;

var errors = __webpack_require__(215);
var exitPromise = __webpack_require__(412);
var IndexCore = __webpack_require__(405);
var store = __webpack_require__(416);

// We will always put the API KEY in the JSON body in case of too long API KEY,
// to avoid query string being too long and failing in various conditions (our server limit, browser limit,
// proxies limit)
var MAX_API_KEY_LENGTH = 500;
var RESET_APP_DATA_TIMER =
  process.env.RESET_APP_DATA_TIMER && parseInt(process.env.RESET_APP_DATA_TIMER, 10) ||
  60 * 2 * 1000; // after 2 minutes reset to first host

/*
 * Algolia Search library initialization
 * https://www.algolia.com/
 *
 * @param {string} applicationID - Your applicationID, found in your dashboard
 * @param {string} apiKey - Your API key, found in your dashboard
 * @param {Object} [opts]
 * @param {number} [opts.timeout=2000] - The request timeout set in milliseconds,
 * another request will be issued after this timeout
 * @param {string} [opts.protocol='http:'] - The protocol used to query Algolia Search API.
 *                                        Set to 'https:' to force using https.
 *                                        Default to document.location.protocol in browsers
 * @param {Object|Array} [opts.hosts={
 *           read: [this.applicationID + '-dsn.algolia.net'].concat([
 *             this.applicationID + '-1.algolianet.com',
 *             this.applicationID + '-2.algolianet.com',
 *             this.applicationID + '-3.algolianet.com']
 *           ]),
 *           write: [this.applicationID + '.algolia.net'].concat([
 *             this.applicationID + '-1.algolianet.com',
 *             this.applicationID + '-2.algolianet.com',
 *             this.applicationID + '-3.algolianet.com']
 *           ]) - The hosts to use for Algolia Search API.
 *           If you provide them, you will less benefit from our HA implementation
 */
function AlgoliaSearchCore(applicationID, apiKey, opts) {
  var debug = __webpack_require__(216)('algoliasearch');

  var clone = __webpack_require__(119);
  var isArray = __webpack_require__(249);
  var map = __webpack_require__(248);

  var usage = 'Usage: algoliasearch(applicationID, apiKey, opts)';

  if (opts._allowEmptyCredentials !== true && !applicationID) {
    throw new errors.AlgoliaSearchError('Please provide an application ID. ' + usage);
  }

  if (opts._allowEmptyCredentials !== true && !apiKey) {
    throw new errors.AlgoliaSearchError('Please provide an API key. ' + usage);
  }

  this.applicationID = applicationID;
  this.apiKey = apiKey;

  this.hosts = {
    read: [],
    write: []
  };

  opts = opts || {};

  var protocol = opts.protocol || 'https:';
  this._timeouts = opts.timeouts || {
    connect: 1 * 1000, // 500ms connect is GPRS latency
    read: 2 * 1000,
    write: 30 * 1000
  };

  // backward compat, if opts.timeout is passed, we use it to configure all timeouts like before
  if (opts.timeout) {
    this._timeouts.connect = this._timeouts.read = this._timeouts.write = opts.timeout;
  }

  // while we advocate for colon-at-the-end values: 'http:' for `opts.protocol`
  // we also accept `http` and `https`. It's a common error.
  if (!/:$/.test(protocol)) {
    protocol = protocol + ':';
  }

  if (opts.protocol !== 'http:' && opts.protocol !== 'https:') {
    throw new errors.AlgoliaSearchError('protocol must be `http:` or `https:` (was `' + opts.protocol + '`)');
  }

  this._checkAppIdData();

  if (!opts.hosts) {
    var defaultHosts = map(this._shuffleResult, function(hostNumber) {
      return applicationID + '-' + hostNumber + '.algolianet.com';
    });

    // no hosts given, compute defaults
    this.hosts.read = [this.applicationID + '-dsn.algolia.net'].concat(defaultHosts);
    this.hosts.write = [this.applicationID + '.algolia.net'].concat(defaultHosts);
  } else if (isArray(opts.hosts)) {
    // when passing custom hosts, we need to have a different host index if the number
    // of write/read hosts are different.
    this.hosts.read = clone(opts.hosts);
    this.hosts.write = clone(opts.hosts);
  } else {
    this.hosts.read = clone(opts.hosts.read);
    this.hosts.write = clone(opts.hosts.write);
  }

  // add protocol and lowercase hosts
  this.hosts.read = map(this.hosts.read, prepareHost(protocol));
  this.hosts.write = map(this.hosts.write, prepareHost(protocol));

  this.extraHeaders = [];

  // In some situations you might want to warm the cache
  this.cache = opts._cache || {};

  this._ua = opts._ua;
  this._useCache = opts._useCache === undefined || opts._cache ? true : opts._useCache;
  this._useFallback = opts.useFallback === undefined ? true : opts.useFallback;

  this._setTimeout = opts._setTimeout;

  debug('init done, %j', this);
}

/*
 * Get the index object initialized
 *
 * @param indexName the name of index
 * @param callback the result callback with one argument (the Index instance)
 */
AlgoliaSearchCore.prototype.initIndex = function(indexName) {
  return new IndexCore(this, indexName);
};

/**
* Add an extra field to the HTTP request
*
* @param name the header field name
* @param value the header field value
*/
AlgoliaSearchCore.prototype.setExtraHeader = function(name, value) {
  this.extraHeaders.push({
    name: name.toLowerCase(), value: value
  });
};

/**
* Augment sent x-algolia-agent with more data, each agent part
* is automatically separated from the others by a semicolon;
*
* @param algoliaAgent the agent to add
*/
AlgoliaSearchCore.prototype.addAlgoliaAgent = function(algoliaAgent) {
  if (this._ua.indexOf(';' + algoliaAgent) === -1) {
    this._ua += ';' + algoliaAgent;
  }
};

/*
 * Wrapper that try all hosts to maximize the quality of service
 */
AlgoliaSearchCore.prototype._jsonRequest = function(initialOpts) {
  this._checkAppIdData();

  var requestDebug = __webpack_require__(216)('algoliasearch:' + initialOpts.url);

  var body;
  var additionalUA = initialOpts.additionalUA || '';
  var cache = initialOpts.cache;
  var client = this;
  var tries = 0;
  var usingFallback = false;
  var hasFallback = client._useFallback && client._request.fallback && initialOpts.fallback;
  var headers;

  if (
    this.apiKey.length > MAX_API_KEY_LENGTH &&
    initialOpts.body !== undefined &&
    (initialOpts.body.params !== undefined || // index.search()
    initialOpts.body.requests !== undefined) // client.search()
  ) {
    initialOpts.body.apiKey = this.apiKey;
    headers = this._computeRequestHeaders(additionalUA, false);
  } else {
    headers = this._computeRequestHeaders(additionalUA);
  }

  if (initialOpts.body !== undefined) {
    body = safeJSONStringify(initialOpts.body);
  }

  requestDebug('request start');
  var debugData = [];

  function doRequest(requester, reqOpts) {
    client._checkAppIdData();

    var startTime = new Date();
    var cacheID;

    if (client._useCache) {
      cacheID = initialOpts.url;
    }

    // as we sometime use POST requests to pass parameters (like query='aa'),
    // the cacheID must also include the body to be different between calls
    if (client._useCache && body) {
      cacheID += '_body_' + reqOpts.body;
    }

    // handle cache existence
    if (client._useCache && cache && cache[cacheID] !== undefined) {
      requestDebug('serving response from cache');
      return client._promise.resolve(JSON.parse(cache[cacheID]));
    }

    // if we reached max tries
    if (tries >= client.hosts[initialOpts.hostType].length) {
      if (!hasFallback || usingFallback) {
        requestDebug('could not get any response');
        // then stop
        return client._promise.reject(new errors.AlgoliaSearchError(
          'Cannot connect to the AlgoliaSearch API.' +
          ' Send an email to support@algolia.com to report and resolve the issue.' +
          ' Application id was: ' + client.applicationID, {debugData: debugData}
        ));
      }

      requestDebug('switching to fallback');

      // let's try the fallback starting from here
      tries = 0;

      // method, url and body are fallback dependent
      reqOpts.method = initialOpts.fallback.method;
      reqOpts.url = initialOpts.fallback.url;
      reqOpts.jsonBody = initialOpts.fallback.body;
      if (reqOpts.jsonBody) {
        reqOpts.body = safeJSONStringify(reqOpts.jsonBody);
      }
      // re-compute headers, they could be omitting the API KEY
      headers = client._computeRequestHeaders(additionalUA);

      reqOpts.timeouts = client._getTimeoutsForRequest(initialOpts.hostType);
      client._setHostIndexByType(0, initialOpts.hostType);
      usingFallback = true; // the current request is now using fallback
      return doRequest(client._request.fallback, reqOpts);
    }

    var currentHost = client._getHostByType(initialOpts.hostType);

    var url = currentHost + reqOpts.url;
    var options = {
      body: reqOpts.body,
      jsonBody: reqOpts.jsonBody,
      method: reqOpts.method,
      headers: headers,
      timeouts: reqOpts.timeouts,
      debug: requestDebug
    };

    requestDebug('method: %s, url: %s, headers: %j, timeouts: %d',
      options.method, url, options.headers, options.timeouts);

    if (requester === client._request.fallback) {
      requestDebug('using fallback');
    }

    // `requester` is any of this._request or this._request.fallback
    // thus it needs to be called using the client as context
    return requester.call(client, url, options).then(success, tryFallback);

    function success(httpResponse) {
      // compute the status of the response,
      //
      // When in browser mode, using XDR or JSONP, we have no statusCode available
      // So we rely on our API response `status` property.
      // But `waitTask` can set a `status` property which is not the statusCode (it's the task status)
      // So we check if there's a `message` along `status` and it means it's an error
      //
      // That's the only case where we have a response.status that's not the http statusCode
      var status = httpResponse && httpResponse.body && httpResponse.body.message && httpResponse.body.status ||

        // this is important to check the request statusCode AFTER the body eventual
        // statusCode because some implementations (jQuery XDomainRequest transport) may
        // send statusCode 200 while we had an error
        httpResponse.statusCode ||

        // When in browser mode, using XDR or JSONP
        // we default to success when no error (no response.status && response.message)
        // If there was a JSON.parse() error then body is null and it fails
        httpResponse && httpResponse.body && 200;

      requestDebug('received response: statusCode: %s, computed statusCode: %d, headers: %j',
        httpResponse.statusCode, status, httpResponse.headers);

      var httpResponseOk = Math.floor(status / 100) === 2;

      var endTime = new Date();
      debugData.push({
        currentHost: currentHost,
        headers: removeCredentials(headers),
        content: body || null,
        contentLength: body !== undefined ? body.length : null,
        method: reqOpts.method,
        timeouts: reqOpts.timeouts,
        url: reqOpts.url,
        startTime: startTime,
        endTime: endTime,
        duration: endTime - startTime,
        statusCode: status
      });

      if (httpResponseOk) {
        if (client._useCache && cache) {
          cache[cacheID] = httpResponse.responseText;
        }

        return httpResponse.body;
      }

      var shouldRetry = Math.floor(status / 100) !== 4;

      if (shouldRetry) {
        tries += 1;
        return retryRequest();
      }

      requestDebug('unrecoverable error');

      // no success and no retry => fail
      var unrecoverableError = new errors.AlgoliaSearchError(
        httpResponse.body && httpResponse.body.message, {debugData: debugData, statusCode: status}
      );

      return client._promise.reject(unrecoverableError);
    }

    function tryFallback(err) {
      // error cases:
      //  While not in fallback mode:
      //    - CORS not supported
      //    - network error
      //  While in fallback mode:
      //    - timeout
      //    - network error
      //    - badly formatted JSONP (script loaded, did not call our callback)
      //  In both cases:
      //    - uncaught exception occurs (TypeError)
      requestDebug('error: %s, stack: %s', err.message, err.stack);

      var endTime = new Date();
      debugData.push({
        currentHost: currentHost,
        headers: removeCredentials(headers),
        content: body || null,
        contentLength: body !== undefined ? body.length : null,
        method: reqOpts.method,
        timeouts: reqOpts.timeouts,
        url: reqOpts.url,
        startTime: startTime,
        endTime: endTime,
        duration: endTime - startTime
      });

      if (!(err instanceof errors.AlgoliaSearchError)) {
        err = new errors.Unknown(err && err.message, err);
      }

      tries += 1;

      // stop the request implementation when:
      if (
        // we did not generate this error,
        // it comes from a throw in some other piece of code
        err instanceof errors.Unknown ||

        // server sent unparsable JSON
        err instanceof errors.UnparsableJSON ||

        // max tries and already using fallback or no fallback
        tries >= client.hosts[initialOpts.hostType].length &&
        (usingFallback || !hasFallback)) {
        // stop request implementation for this command
        err.debugData = debugData;
        return client._promise.reject(err);
      }

      // When a timeout occured, retry by raising timeout
      if (err instanceof errors.RequestTimeout) {
        return retryRequestWithHigherTimeout();
      }

      return retryRequest();
    }

    function retryRequest() {
      requestDebug('retrying request');
      client._incrementHostIndex(initialOpts.hostType);
      return doRequest(requester, reqOpts);
    }

    function retryRequestWithHigherTimeout() {
      requestDebug('retrying request with higher timeout');
      client._incrementHostIndex(initialOpts.hostType);
      client._incrementTimeoutMultipler();
      reqOpts.timeouts = client._getTimeoutsForRequest(initialOpts.hostType);
      return doRequest(requester, reqOpts);
    }
  }

  var promise = doRequest(
    client._request, {
      url: initialOpts.url,
      method: initialOpts.method,
      body: body,
      jsonBody: initialOpts.body,
      timeouts: client._getTimeoutsForRequest(initialOpts.hostType)
    }
  );

  // either we have a callback
  // either we are using promises
  if (initialOpts.callback) {
    promise.then(function okCb(content) {
      exitPromise(function() {
        initialOpts.callback(null, content);
      }, client._setTimeout || setTimeout);
    }, function nookCb(err) {
      exitPromise(function() {
        initialOpts.callback(err);
      }, client._setTimeout || setTimeout);
    });
  } else {
    return promise;
  }
};

/*
* Transform search param object in query string
* @param {object} args arguments to add to the current query string
* @param {string} params current query string
* @return {string} the final query string
*/
AlgoliaSearchCore.prototype._getSearchParams = function(args, params) {
  if (args === undefined || args === null) {
    return params;
  }
  for (var key in args) {
    if (key !== null && args[key] !== undefined && args.hasOwnProperty(key)) {
      params += params === '' ? '' : '&';
      params += key + '=' + encodeURIComponent(Object.prototype.toString.call(args[key]) === '[object Array]' ? safeJSONStringify(args[key]) : args[key]);
    }
  }
  return params;
};

AlgoliaSearchCore.prototype._computeRequestHeaders = function(additionalUA, withAPIKey) {
  var forEach = __webpack_require__(110);

  var ua = additionalUA ?
    this._ua + ';' + additionalUA :
    this._ua;

  var requestHeaders = {
    'x-algolia-agent': ua,
    'x-algolia-application-id': this.applicationID
  };

  // browser will inline headers in the url, node.js will use http headers
  // but in some situations, the API KEY will be too long (big secured API keys)
  // so if the request is a POST and the KEY is very long, we will be asked to not put
  // it into headers but in the JSON body
  if (withAPIKey !== false) {
    requestHeaders['x-algolia-api-key'] = this.apiKey;
  }

  if (this.userToken) {
    requestHeaders['x-algolia-usertoken'] = this.userToken;
  }

  if (this.securityTags) {
    requestHeaders['x-algolia-tagfilters'] = this.securityTags;
  }

  if (this.extraHeaders) {
    forEach(this.extraHeaders, function addToRequestHeaders(header) {
      requestHeaders[header.name] = header.value;
    });
  }

  return requestHeaders;
};

/**
 * Search through multiple indices at the same time
 * @param  {Object[]}   queries  An array of queries you want to run.
 * @param {string} queries[].indexName The index name you want to target
 * @param {string} [queries[].query] The query to issue on this index. Can also be passed into `params`
 * @param {Object} queries[].params Any search param like hitsPerPage, ..
 * @param  {Function} callback Callback to be called
 * @return {Promise|undefined} Returns a promise if no callback given
 */
AlgoliaSearchCore.prototype.search = function(queries, opts, callback) {
  var isArray = __webpack_require__(249);
  var map = __webpack_require__(248);

  var usage = 'Usage: client.search(arrayOfQueries[, callback])';

  if (!isArray(queries)) {
    throw new Error(usage);
  }

  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  } else if (opts === undefined) {
    opts = {};
  }

  var client = this;

  var postObj = {
    requests: map(queries, function prepareRequest(query) {
      var params = '';

      // allow query.query
      // so we are mimicing the index.search(query, params) method
      // {indexName:, query:, params:}
      if (query.query !== undefined) {
        params += 'query=' + encodeURIComponent(query.query);
      }

      return {
        indexName: query.indexName,
        params: client._getSearchParams(query.params, params)
      };
    })
  };

  var JSONPParams = map(postObj.requests, function prepareJSONPParams(request, requestId) {
    return requestId + '=' +
      encodeURIComponent(
        '/1/indexes/' + encodeURIComponent(request.indexName) + '?' +
        request.params
      );
  }).join('&');

  var url = '/1/indexes/*/queries';

  if (opts.strategy !== undefined) {
    url += '?strategy=' + opts.strategy;
  }

  return this._jsonRequest({
    cache: this.cache,
    method: 'POST',
    url: url,
    body: postObj,
    hostType: 'read',
    fallback: {
      method: 'GET',
      url: '/1/indexes/*',
      body: {
        params: JSONPParams
      }
    },
    callback: callback
  });
};

/**
 * Set the extra security tagFilters header
 * @param {string|array} tags The list of tags defining the current security filters
 */
AlgoliaSearchCore.prototype.setSecurityTags = function(tags) {
  if (Object.prototype.toString.call(tags) === '[object Array]') {
    var strTags = [];
    for (var i = 0; i < tags.length; ++i) {
      if (Object.prototype.toString.call(tags[i]) === '[object Array]') {
        var oredTags = [];
        for (var j = 0; j < tags[i].length; ++j) {
          oredTags.push(tags[i][j]);
        }
        strTags.push('(' + oredTags.join(',') + ')');
      } else {
        strTags.push(tags[i]);
      }
    }
    tags = strTags.join(',');
  }

  this.securityTags = tags;
};

/**
 * Set the extra user token header
 * @param {string} userToken The token identifying a uniq user (used to apply rate limits)
 */
AlgoliaSearchCore.prototype.setUserToken = function(userToken) {
  this.userToken = userToken;
};

/**
 * Clear all queries in client's cache
 * @return undefined
 */
AlgoliaSearchCore.prototype.clearCache = function() {
  this.cache = {};
};

/**
* Set the number of milliseconds a request can take before automatically being terminated.
* @deprecated
* @param {Number} milliseconds
*/
AlgoliaSearchCore.prototype.setRequestTimeout = function(milliseconds) {
  if (milliseconds) {
    this._timeouts.connect = this._timeouts.read = this._timeouts.write = milliseconds;
  }
};

/**
* Set the three different (connect, read, write) timeouts to be used when requesting
* @param {Object} timeouts
*/
AlgoliaSearchCore.prototype.setTimeouts = function(timeouts) {
  this._timeouts = timeouts;
};

/**
* Get the three different (connect, read, write) timeouts to be used when requesting
* @param {Object} timeouts
*/
AlgoliaSearchCore.prototype.getTimeouts = function() {
  return this._timeouts;
};

AlgoliaSearchCore.prototype._getAppIdData = function() {
  var data = store.get(this.applicationID);
  if (data !== null) this._cacheAppIdData(data);
  return data;
};

AlgoliaSearchCore.prototype._setAppIdData = function(data) {
  data.lastChange = (new Date()).getTime();
  this._cacheAppIdData(data);
  return store.set(this.applicationID, data);
};

AlgoliaSearchCore.prototype._checkAppIdData = function() {
  var data = this._getAppIdData();
  var now = (new Date()).getTime();
  if (data === null || now - data.lastChange > RESET_APP_DATA_TIMER) {
    return this._resetInitialAppIdData(data);
  }

  return data;
};

AlgoliaSearchCore.prototype._resetInitialAppIdData = function(data) {
  var newData = data || {};
  newData.hostIndexes = {read: 0, write: 0};
  newData.timeoutMultiplier = 1;
  newData.shuffleResult = newData.shuffleResult || shuffle([1, 2, 3]);
  return this._setAppIdData(newData);
};

AlgoliaSearchCore.prototype._cacheAppIdData = function(data) {
  this._hostIndexes = data.hostIndexes;
  this._timeoutMultiplier = data.timeoutMultiplier;
  this._shuffleResult = data.shuffleResult;
};

AlgoliaSearchCore.prototype._partialAppIdDataUpdate = function(newData) {
  var foreach = __webpack_require__(110);
  var currentData = this._getAppIdData();
  foreach(newData, function(value, key) {
    currentData[key] = value;
  });

  return this._setAppIdData(currentData);
};

AlgoliaSearchCore.prototype._getHostByType = function(hostType) {
  return this.hosts[hostType][this._getHostIndexByType(hostType)];
};

AlgoliaSearchCore.prototype._getTimeoutMultiplier = function() {
  return this._timeoutMultiplier;
};

AlgoliaSearchCore.prototype._getHostIndexByType = function(hostType) {
  return this._hostIndexes[hostType];
};

AlgoliaSearchCore.prototype._setHostIndexByType = function(hostIndex, hostType) {
  var clone = __webpack_require__(119);
  var newHostIndexes = clone(this._hostIndexes);
  newHostIndexes[hostType] = hostIndex;
  this._partialAppIdDataUpdate({hostIndexes: newHostIndexes});
  return hostIndex;
};

AlgoliaSearchCore.prototype._incrementHostIndex = function(hostType) {
  return this._setHostIndexByType(
    (this._getHostIndexByType(hostType) + 1) % this.hosts[hostType].length, hostType
  );
};

AlgoliaSearchCore.prototype._incrementTimeoutMultipler = function() {
  var timeoutMultiplier = Math.max(this._timeoutMultiplier + 1, 4);
  return this._partialAppIdDataUpdate({timeoutMultiplier: timeoutMultiplier});
};

AlgoliaSearchCore.prototype._getTimeoutsForRequest = function(hostType) {
  return {
    connect: this._timeouts.connect * this._timeoutMultiplier,
    complete: this._timeouts[hostType] * this._timeoutMultiplier
  };
};

function prepareHost(protocol) {
  return function prepare(host) {
    return protocol + '//' + host.toLowerCase();
  };
}

// Prototype.js < 1.7, a widely used library, defines a weird
// Array.prototype.toJSON function that will fail to stringify our content
// appropriately
// refs:
//   - https://groups.google.com/forum/#!topic/prototype-core/E-SAVvV_V9Q
//   - https://github.com/sstephenson/prototype/commit/038a2985a70593c1a86c230fadbdfe2e4898a48c
//   - http://stackoverflow.com/a/3148441/147079
function safeJSONStringify(obj) {
  /* eslint no-extend-native:0 */

  if (Array.prototype.toJSON === undefined) {
    return JSON.stringify(obj);
  }

  var toJSON = Array.prototype.toJSON;
  delete Array.prototype.toJSON;
  var out = JSON.stringify(obj);
  Array.prototype.toJSON = toJSON;

  return out;
}

function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function removeCredentials(headers) {
  var newHeaders = {};

  for (var headerName in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, headerName)) {
      var value;

      if (headerName === 'x-algolia-api-key' || headerName === 'x-algolia-application-id') {
        value = '**hidden for security purposes**';
      } else {
        value = headers[headerName];
      }

      newHeaders[headerName] = value;
    }
  }

  return newHeaders;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(109)))

/***/ }),
/* 405 */
/***/ (function(module, exports, __webpack_require__) {

var buildSearchMethod = __webpack_require__(348);
var deprecate = __webpack_require__(410);
var deprecatedMessage = __webpack_require__(411);

module.exports = IndexCore;

/*
* Index class constructor.
* You should not use this method directly but use initIndex() function
*/
function IndexCore(algoliasearch, indexName) {
  this.indexName = indexName;
  this.as = algoliasearch;
  this.typeAheadArgs = null;
  this.typeAheadValueOption = null;

  // make sure every index instance has it's own cache
  this.cache = {};
}

/*
* Clear all queries in cache
*/
IndexCore.prototype.clearCache = function() {
  this.cache = {};
};

/*
* Search inside the index using XMLHttpRequest request (Using a POST query to
* minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
*
* @param {string} [query] the full text query
* @param {object} [args] (optional) if set, contains an object with query parameters:
* - page: (integer) Pagination parameter used to select the page to retrieve.
*                   Page is zero-based and defaults to 0. Thus,
*                   to retrieve the 10th page you need to set page=9
* - hitsPerPage: (integer) Pagination parameter used to select the number of hits per page. Defaults to 20.
* - attributesToRetrieve: a string that contains the list of object attributes
* you want to retrieve (let you minimize the answer size).
*   Attributes are separated with a comma (for example "name,address").
*   You can also use an array (for example ["name","address"]).
*   By default, all attributes are retrieved. You can also use '*' to retrieve all
*   values when an attributesToRetrieve setting is specified for your index.
* - attributesToHighlight: a string that contains the list of attributes you
*   want to highlight according to the query.
*   Attributes are separated by a comma. You can also use an array (for example ["name","address"]).
*   If an attribute has no match for the query, the raw value is returned.
*   By default all indexed text attributes are highlighted.
*   You can use `*` if you want to highlight all textual attributes.
*   Numerical attributes are not highlighted.
*   A matchLevel is returned for each highlighted attribute and can contain:
*      - full: if all the query terms were found in the attribute,
*      - partial: if only some of the query terms were found,
*      - none: if none of the query terms were found.
* - attributesToSnippet: a string that contains the list of attributes to snippet alongside
* the number of words to return (syntax is `attributeName:nbWords`).
*    Attributes are separated by a comma (Example: attributesToSnippet=name:10,content:10).
*    You can also use an array (Example: attributesToSnippet: ['name:10','content:10']).
*    By default no snippet is computed.
* - minWordSizefor1Typo: the minimum number of characters in a query word to accept one typo in this word.
* Defaults to 3.
* - minWordSizefor2Typos: the minimum number of characters in a query word
* to accept two typos in this word. Defaults to 7.
* - getRankingInfo: if set to 1, the result hits will contain ranking
* information in _rankingInfo attribute.
* - aroundLatLng: search for entries around a given
* latitude/longitude (specified as two floats separated by a comma).
*   For example aroundLatLng=47.316669,5.016670).
*   You can specify the maximum distance in meters with the aroundRadius parameter (in meters)
*   and the precision for ranking with aroundPrecision
*   (for example if you set aroundPrecision=100, two objects that are distant of
*   less than 100m will be considered as identical for "geo" ranking parameter).
*   At indexing, you should specify geoloc of an object with the _geoloc attribute
*   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
* - insideBoundingBox: search entries inside a given area defined by the two extreme points
* of a rectangle (defined by 4 floats: p1Lat,p1Lng,p2Lat,p2Lng).
*   For example insideBoundingBox=47.3165,4.9665,47.3424,5.0201).
*   At indexing, you should specify geoloc of an object with the _geoloc attribute
*   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
* - numericFilters: a string that contains the list of numeric filters you want to
* apply separated by a comma.
*   The syntax of one filter is `attributeName` followed by `operand` followed by `value`.
*   Supported operands are `<`, `<=`, `=`, `>` and `>=`.
*   You can have multiple conditions on one attribute like for example numericFilters=price>100,price<1000.
*   You can also use an array (for example numericFilters: ["price>100","price<1000"]).
* - tagFilters: filter the query by a set of tags. You can AND tags by separating them by commas.
*   To OR tags, you must add parentheses. For example, tags=tag1,(tag2,tag3) means tag1 AND (tag2 OR tag3).
*   You can also use an array, for example tagFilters: ["tag1",["tag2","tag3"]]
*   means tag1 AND (tag2 OR tag3).
*   At indexing, tags should be added in the _tags** attribute
*   of objects (for example {"_tags":["tag1","tag2"]}).
* - facetFilters: filter the query by a list of facets.
*   Facets are separated by commas and each facet is encoded as `attributeName:value`.
*   For example: `facetFilters=category:Book,author:John%20Doe`.
*   You can also use an array (for example `["category:Book","author:John%20Doe"]`).
* - facets: List of object attributes that you want to use for faceting.
*   Comma separated list: `"category,author"` or array `['category','author']`
*   Only attributes that have been added in **attributesForFaceting** index setting
*   can be used in this parameter.
*   You can also use `*` to perform faceting on all attributes specified in **attributesForFaceting**.
* - queryType: select how the query words are interpreted, it can be one of the following value:
*    - prefixAll: all query words are interpreted as prefixes,
*    - prefixLast: only the last word is interpreted as a prefix (default behavior),
*    - prefixNone: no query word is interpreted as a prefix. This option is not recommended.
* - optionalWords: a string that contains the list of words that should
* be considered as optional when found in the query.
*   Comma separated and array are accepted.
* - distinct: If set to 1, enable the distinct feature (disabled by default)
* if the attributeForDistinct index setting is set.
*   This feature is similar to the SQL "distinct" keyword: when enabled
*   in a query with the distinct=1 parameter,
*   all hits containing a duplicate value for the attributeForDistinct attribute are removed from results.
*   For example, if the chosen attribute is show_name and several hits have
*   the same value for show_name, then only the best
*   one is kept and others are removed.
* - restrictSearchableAttributes: List of attributes you want to use for
* textual search (must be a subset of the attributesToIndex index setting)
* either comma separated or as an array
* @param {function} [callback] the result callback called with two arguments:
*  error: null or Error('message'). If false, the content contains the error.
*  content: the server answer that contains the list of results.
*/
IndexCore.prototype.search = buildSearchMethod('query');

/*
* -- BETA --
* Search a record similar to the query inside the index using XMLHttpRequest request (Using a POST query to
* minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
*
* @param {string} [query] the similar query
* @param {object} [args] (optional) if set, contains an object with query parameters.
*   All search parameters are supported (see search function), restrictSearchableAttributes and facetFilters
*   are the two most useful to restrict the similar results and get more relevant content
*/
IndexCore.prototype.similarSearch = buildSearchMethod('similarQuery');

/*
* Browse index content. The response content will have a `cursor` property that you can use
* to browse subsequent pages for this query. Use `index.browseFrom(cursor)` when you want.
*
* @param {string} query - The full text query
* @param {Object} [queryParameters] - Any search query parameter
* @param {Function} [callback] - The result callback called with two arguments
*   error: null or Error('message')
*   content: the server answer with the browse result
* @return {Promise|undefined} Returns a promise if no callback given
* @example
* index.browse('cool songs', {
*   tagFilters: 'public,comments',
*   hitsPerPage: 500
* }, callback);
* @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
*/
IndexCore.prototype.browse = function(query, queryParameters, callback) {
  var merge = __webpack_require__(413);

  var indexObj = this;

  var page;
  var hitsPerPage;

  // we check variadic calls that are not the one defined
  // .browse()/.browse(fn)
  // => page = 0
  if (arguments.length === 0 || arguments.length === 1 && typeof arguments[0] === 'function') {
    page = 0;
    callback = arguments[0];
    query = undefined;
  } else if (typeof arguments[0] === 'number') {
    // .browse(2)/.browse(2, 10)/.browse(2, fn)/.browse(2, 10, fn)
    page = arguments[0];
    if (typeof arguments[1] === 'number') {
      hitsPerPage = arguments[1];
    } else if (typeof arguments[1] === 'function') {
      callback = arguments[1];
      hitsPerPage = undefined;
    }
    query = undefined;
    queryParameters = undefined;
  } else if (typeof arguments[0] === 'object') {
    // .browse(queryParameters)/.browse(queryParameters, cb)
    if (typeof arguments[1] === 'function') {
      callback = arguments[1];
    }
    queryParameters = arguments[0];
    query = undefined;
  } else if (typeof arguments[0] === 'string' && typeof arguments[1] === 'function') {
    // .browse(query, cb)
    callback = arguments[1];
    queryParameters = undefined;
  }

  // otherwise it's a .browse(query)/.browse(query, queryParameters)/.browse(query, queryParameters, cb)

  // get search query parameters combining various possible calls
  // to .browse();
  queryParameters = merge({}, queryParameters || {}, {
    page: page,
    hitsPerPage: hitsPerPage,
    query: query
  });

  var params = this.as._getSearchParams(queryParameters, '');

  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/browse',
    body: {params: params},
    hostType: 'read',
    callback: callback
  });
};

/*
* Continue browsing from a previous position (cursor), obtained via a call to `.browse()`.
*
* @param {string} query - The full text query
* @param {Object} [queryParameters] - Any search query parameter
* @param {Function} [callback] - The result callback called with two arguments
*   error: null or Error('message')
*   content: the server answer with the browse result
* @return {Promise|undefined} Returns a promise if no callback given
* @example
* index.browseFrom('14lkfsakl32', callback);
* @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
*/
IndexCore.prototype.browseFrom = function(cursor, callback) {
  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/browse',
    body: {cursor: cursor},
    hostType: 'read',
    callback: callback
  });
};

/*
* Search for facet values
* https://www.algolia.com/doc/rest-api/search#search-for-facet-values
*
* @param {string} params.facetName Facet name, name of the attribute to search for values in.
* Must be declared as a facet
* @param {string} params.facetQuery Query for the facet search
* @param {string} [params.*] Any search parameter of Algolia,
* see https://www.algolia.com/doc/api-client/javascript/search#search-parameters
* Pagination is not supported. The page and hitsPerPage parameters will be ignored.
* @param callback (optional)
*/
IndexCore.prototype.searchForFacetValues = function(params, callback) {
  var clone = __webpack_require__(119);
  var omit = __webpack_require__(414);
  var usage = 'Usage: index.searchForFacetValues({facetName, facetQuery, ...params}[, callback])';

  if (params.facetName === undefined || params.facetQuery === undefined) {
    throw new Error(usage);
  }

  var facetName = params.facetName;
  var filteredParams = omit(clone(params), function(keyName) {
    return keyName === 'facetName';
  });
  var searchParameters = this.as._getSearchParams(filteredParams, '');

  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/' +
      encodeURIComponent(this.indexName) + '/facets/' + encodeURIComponent(facetName) + '/query',
    hostType: 'read',
    body: {params: searchParameters},
    callback: callback
  });
};

IndexCore.prototype.searchFacet = deprecate(function(params, callback) {
  return this.searchForFacetValues(params, callback);
}, deprecatedMessage(
  'index.searchFacet(params[, callback])',
  'index.searchForFacetValues(params[, callback])'
));

IndexCore.prototype._search = function(params, url, callback, additionalUA) {
  return this.as._jsonRequest({
    cache: this.cache,
    method: 'POST',
    url: url || '/1/indexes/' + encodeURIComponent(this.indexName) + '/query',
    body: {params: params},
    hostType: 'read',
    fallback: {
      method: 'GET',
      url: '/1/indexes/' + encodeURIComponent(this.indexName),
      body: {params: params}
    },
    callback: callback,
    additionalUA: additionalUA
  });
};

/*
* Get an object from this index
*
* @param objectID the unique identifier of the object to retrieve
* @param attrs (optional) if set, contains the array of attribute names to retrieve
* @param callback (optional) the result callback called with two arguments
*  error: null or Error('message')
*  content: the object to retrieve or the error message if a failure occured
*/
IndexCore.prototype.getObject = function(objectID, attrs, callback) {
  var indexObj = this;

  if (arguments.length === 1 || typeof attrs === 'function') {
    callback = attrs;
    attrs = undefined;
  }

  var params = '';
  if (attrs !== undefined) {
    params = '?attributes=';
    for (var i = 0; i < attrs.length; ++i) {
      if (i !== 0) {
        params += ',';
      }
      params += attrs[i];
    }
  }

  return this.as._jsonRequest({
    method: 'GET',
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(objectID) + params,
    hostType: 'read',
    callback: callback
  });
};

/*
* Get several objects from this index
*
* @param objectIDs the array of unique identifier of objects to retrieve
*/
IndexCore.prototype.getObjects = function(objectIDs, attributesToRetrieve, callback) {
  var isArray = __webpack_require__(249);
  var map = __webpack_require__(248);

  var usage = 'Usage: index.getObjects(arrayOfObjectIDs[, callback])';

  if (!isArray(objectIDs)) {
    throw new Error(usage);
  }

  var indexObj = this;

  if (arguments.length === 1 || typeof attributesToRetrieve === 'function') {
    callback = attributesToRetrieve;
    attributesToRetrieve = undefined;
  }

  var body = {
    requests: map(objectIDs, function prepareRequest(objectID) {
      var request = {
        indexName: indexObj.indexName,
        objectID: objectID
      };

      if (attributesToRetrieve) {
        request.attributesToRetrieve = attributesToRetrieve.join(',');
      }

      return request;
    })
  };

  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/*/objects',
    hostType: 'read',
    body: body,
    callback: callback
  });
};

IndexCore.prototype.as = null;
IndexCore.prototype.indexName = null;
IndexCore.prototype.typeAheadArgs = null;
IndexCore.prototype.typeAheadValueOption = null;


/***/ }),
/* 406 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(421);
var Promise = global.Promise || __webpack_require__(420).Promise;

// This is the standalone browser build entry point
// Browser implementation of the Algolia Search JavaScript client,
// using XMLHttpRequest, XDomainRequest and JSONP as fallback
module.exports = function createAlgoliasearch(AlgoliaSearch, uaSuffix) {
  var inherits = __webpack_require__(349);
  var errors = __webpack_require__(215);
  var inlineHeaders = __webpack_require__(408);
  var jsonpRequest = __webpack_require__(409);
  var places = __webpack_require__(415);
  uaSuffix = uaSuffix || '';

  if (false) {
    require('debug').enable('algoliasearch*');
  }

  function algoliasearch(applicationID, apiKey, opts) {
    var cloneDeep = __webpack_require__(119);

    var getDocumentProtocol = __webpack_require__(407);

    opts = cloneDeep(opts || {});

    if (opts.protocol === undefined) {
      opts.protocol = getDocumentProtocol();
    }

    opts._ua = opts._ua || algoliasearch.ua;

    return new AlgoliaSearchBrowser(applicationID, apiKey, opts);
  }

  algoliasearch.version = __webpack_require__(417);
  algoliasearch.ua = 'Algolia for vanilla JavaScript ' + uaSuffix + algoliasearch.version;
  algoliasearch.initPlaces = places(algoliasearch);

  // we expose into window no matter how we are used, this will allow
  // us to easily debug any website running algolia
  global.__algolia = {
    debug: __webpack_require__(216),
    algoliasearch: algoliasearch
  };

  var support = {
    hasXMLHttpRequest: 'XMLHttpRequest' in global,
    hasXDomainRequest: 'XDomainRequest' in global
  };

  if (support.hasXMLHttpRequest) {
    support.cors = 'withCredentials' in new XMLHttpRequest();
  }

  function AlgoliaSearchBrowser() {
    // call AlgoliaSearch constructor
    AlgoliaSearch.apply(this, arguments);
  }

  inherits(AlgoliaSearchBrowser, AlgoliaSearch);

  AlgoliaSearchBrowser.prototype._request = function request(url, opts) {
    return new Promise(function wrapRequest(resolve, reject) {
      // no cors or XDomainRequest, no request
      if (!support.cors && !support.hasXDomainRequest) {
        // very old browser, not supported
        reject(new errors.Network('CORS not supported'));
        return;
      }

      url = inlineHeaders(url, opts.headers);

      var body = opts.body;
      var req = support.cors ? new XMLHttpRequest() : new XDomainRequest();
      var reqTimeout;
      var timedOut;
      var connected = false;

      reqTimeout = setTimeout(onTimeout, opts.timeouts.connect);
      // we set an empty onprogress listener
      // so that XDomainRequest on IE9 is not aborted
      // refs:
      //  - https://github.com/algolia/algoliasearch-client-js/issues/76
      //  - https://social.msdn.microsoft.com/Forums/ie/en-US/30ef3add-767c-4436-b8a9-f1ca19b4812e/ie9-rtm-xdomainrequest-issued-requests-may-abort-if-all-event-handlers-not-specified?forum=iewebdevelopment
      req.onprogress = onProgress;
      if ('onreadystatechange' in req) req.onreadystatechange = onReadyStateChange;
      req.onload = onLoad;
      req.onerror = onError;

      // do not rely on default XHR async flag, as some analytics code like hotjar
      // breaks it and set it to false by default
      if (req instanceof XMLHttpRequest) {
        req.open(opts.method, url, true);
      } else {
        req.open(opts.method, url);
      }

      // headers are meant to be sent after open
      if (support.cors) {
        if (body) {
          if (opts.method === 'POST') {
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Simple_requests
            req.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
          } else {
            req.setRequestHeader('content-type', 'application/json');
          }
        }
        req.setRequestHeader('accept', 'application/json');
      }

      req.send(body);

      // event object not received in IE8, at least
      // but we do not use it, still important to note
      function onLoad(/* event */) {
        // When browser does not supports req.timeout, we can
        // have both a load and timeout event, since handled by a dumb setTimeout
        if (timedOut) {
          return;
        }

        clearTimeout(reqTimeout);

        var out;

        try {
          out = {
            body: JSON.parse(req.responseText),
            responseText: req.responseText,
            statusCode: req.status,
            // XDomainRequest does not have any response headers
            headers: req.getAllResponseHeaders && req.getAllResponseHeaders() || {}
          };
        } catch (e) {
          out = new errors.UnparsableJSON({
            more: req.responseText
          });
        }

        if (out instanceof errors.UnparsableJSON) {
          reject(out);
        } else {
          resolve(out);
        }
      }

      function onError(event) {
        if (timedOut) {
          return;
        }

        clearTimeout(reqTimeout);

        // error event is trigerred both with XDR/XHR on:
        //   - DNS error
        //   - unallowed cross domain request
        reject(
          new errors.Network({
            more: event
          })
        );
      }

      function onTimeout() {
        timedOut = true;
        req.abort();

        reject(new errors.RequestTimeout());
      }

      function onConnect() {
        connected = true;
        clearTimeout(reqTimeout);
        reqTimeout = setTimeout(onTimeout, opts.timeouts.complete);
      }

      function onProgress() {
        if (!connected) onConnect();
      }

      function onReadyStateChange() {
        if (!connected && req.readyState > 1) onConnect();
      }
    });
  };

  AlgoliaSearchBrowser.prototype._request.fallback = function requestFallback(url, opts) {
    url = inlineHeaders(url, opts.headers);

    return new Promise(function wrapJsonpRequest(resolve, reject) {
      jsonpRequest(url, opts, function jsonpRequestDone(err, content) {
        if (err) {
          reject(err);
          return;
        }

        resolve(content);
      });
    });
  };

  AlgoliaSearchBrowser.prototype._promise = {
    reject: function rejectPromise(val) {
      return Promise.reject(val);
    },
    resolve: function resolvePromise(val) {
      return Promise.resolve(val);
    },
    delay: function delayPromise(ms) {
      return new Promise(function resolveOnTimeout(resolve/* , reject*/) {
        setTimeout(resolve, ms);
      });
    }
  };

  return algoliasearch;
};


/***/ }),
/* 407 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = getDocumentProtocol;

function getDocumentProtocol() {
  var protocol = window.document.location.protocol;

  // when in `file:` mode (local html file), default to `http:`
  if (protocol !== 'http:' && protocol !== 'https:') {
    protocol = 'http:';
  }

  return protocol;
}


/***/ }),
/* 408 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = inlineHeaders;

var encode = __webpack_require__(428);

function inlineHeaders(url, headers) {
  if (/\?/.test(url)) {
    url += '&';
  } else {
    url += '?';
  }

  return url + encode(headers);
}


/***/ }),
/* 409 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = jsonpRequest;

var errors = __webpack_require__(215);

var JSONPCounter = 0;

function jsonpRequest(url, opts, cb) {
  if (opts.method !== 'GET') {
    cb(new Error('Method ' + opts.method + ' ' + url + ' is not supported by JSONP.'));
    return;
  }

  opts.debug('JSONP: start');

  var cbCalled = false;
  var timedOut = false;

  JSONPCounter += 1;
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  var cbName = 'algoliaJSONP_' + JSONPCounter;
  var done = false;

  window[cbName] = function(data) {
    removeGlobals();

    if (timedOut) {
      opts.debug('JSONP: Late answer, ignoring');
      return;
    }

    cbCalled = true;

    clean();

    cb(null, {
      body: data/* ,
      // We do not send the statusCode, there's no statusCode in JSONP, it will be
      // computed using data.status && data.message like with XDR
      statusCode*/
    });
  };

  // add callback by hand
  url += '&callback=' + cbName;

  // add body params manually
  if (opts.jsonBody && opts.jsonBody.params) {
    url += '&' + opts.jsonBody.params;
  }

  var ontimeout = setTimeout(timeout, opts.timeouts.complete);

  // script onreadystatechange needed only for
  // <= IE8
  // https://github.com/angular/angular.js/issues/4523
  script.onreadystatechange = readystatechange;
  script.onload = success;
  script.onerror = error;

  script.async = true;
  script.defer = true;
  script.src = url;
  head.appendChild(script);

  function success() {
    opts.debug('JSONP: success');

    if (done || timedOut) {
      return;
    }

    done = true;

    // script loaded but did not call the fn => script loading error
    if (!cbCalled) {
      opts.debug('JSONP: Fail. Script loaded but did not call the callback');
      clean();
      cb(new errors.JSONPScriptFail());
    }
  }

  function readystatechange() {
    if (this.readyState === 'loaded' || this.readyState === 'complete') {
      success();
    }
  }

  function clean() {
    clearTimeout(ontimeout);
    script.onload = null;
    script.onreadystatechange = null;
    script.onerror = null;
    head.removeChild(script);
  }

  function removeGlobals() {
    try {
      delete window[cbName];
      delete window[cbName + '_loaded'];
    } catch (e) {
      window[cbName] = window[cbName + '_loaded'] = undefined;
    }
  }

  function timeout() {
    opts.debug('JSONP: Script timeout');
    timedOut = true;
    clean();
    cb(new errors.RequestTimeout());
  }

  function error() {
    opts.debug('JSONP: Script error');

    if (done || timedOut) {
      return;
    }

    clean();
    cb(new errors.JSONPScriptError());
  }
}


/***/ }),
/* 410 */
/***/ (function(module, exports) {

module.exports = function deprecate(fn, message) {
  var warned = false;

  function deprecated() {
    if (!warned) {
      /* eslint no-console:0 */
      console.log(message);
      warned = true;
    }

    return fn.apply(this, arguments);
  }

  return deprecated;
};


/***/ }),
/* 411 */
/***/ (function(module, exports) {

module.exports = function deprecatedMessage(previousUsage, newUsage) {
  var githubAnchorLink = previousUsage.toLowerCase()
    .replace('.', '')
    .replace('()', '');

  return 'algoliasearch: `' + previousUsage + '` was replaced by `' + newUsage +
    '`. Please see https://github.com/algolia/algoliasearch-client-js/wiki/Deprecated#' + githubAnchorLink;
};


/***/ }),
/* 412 */
/***/ (function(module, exports) {

// Parse cloud does not supports setTimeout
// We do not store a setTimeout reference in the client everytime
// We only fallback to a fake setTimeout when not available
// setTimeout cannot be override globally sadly
module.exports = function exitPromise(fn, _setTimeout) {
  _setTimeout(fn, 0);
};


/***/ }),
/* 413 */
/***/ (function(module, exports, __webpack_require__) {

var foreach = __webpack_require__(110);

module.exports = function merge(destination/* , sources */) {
  var sources = Array.prototype.slice.call(arguments);

  foreach(sources, function(source) {
    for (var keyName in source) {
      if (source.hasOwnProperty(keyName)) {
        if (typeof destination[keyName] === 'object' && typeof source[keyName] === 'object') {
          destination[keyName] = merge({}, destination[keyName], source[keyName]);
        } else if (source[keyName] !== undefined) {
          destination[keyName] = source[keyName];
        }
      }
    }
  });

  return destination;
};


/***/ }),
/* 414 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function omit(obj, test) {
  var keys = __webpack_require__(426);
  var foreach = __webpack_require__(110);

  var filtered = {};

  foreach(keys(obj), function doFilter(keyName) {
    if (test(keyName) !== true) {
      filtered[keyName] = obj[keyName];
    }
  });

  return filtered;
};


/***/ }),
/* 415 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = createPlacesClient;

var buildSearchMethod = __webpack_require__(348);

function createPlacesClient(algoliasearch) {
  return function places(appID, apiKey, opts) {
    var cloneDeep = __webpack_require__(119);

    opts = opts && cloneDeep(opts) || {};
    opts.hosts = opts.hosts || [
      'places-dsn.algolia.net',
      'places-1.algolianet.com',
      'places-2.algolianet.com',
      'places-3.algolianet.com'
    ];

    // allow initPlaces() no arguments => community rate limited
    if (arguments.length === 0 || typeof appID === 'object' || appID === undefined) {
      appID = '';
      apiKey = '';
      opts._allowEmptyCredentials = true;
    }

    var client = algoliasearch(appID, apiKey, opts);
    var index = client.initIndex('places');
    index.search = buildSearchMethod('query', '/1/places/query');
    return index;
  };
}


/***/ }),
/* 416 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var debug = __webpack_require__(216)('algoliasearch:src/hostIndexState.js');
var localStorageNamespace = 'algoliasearch-client-js';

var store;
var moduleStore = {
  state: {},
  set: function(key, data) {
    this.state[key] = data;
    return this.state[key];
  },
  get: function(key) {
    return this.state[key] || null;
  }
};

var localStorageStore = {
  set: function(key, data) {
    moduleStore.set(key, data); // always replicate localStorageStore to moduleStore in case of failure

    try {
      var namespace = JSON.parse(global.localStorage[localStorageNamespace]);
      namespace[key] = data;
      global.localStorage[localStorageNamespace] = JSON.stringify(namespace);
      return namespace[key];
    } catch (e) {
      return localStorageFailure(key, e);
    }
  },
  get: function(key) {
    try {
      return JSON.parse(global.localStorage[localStorageNamespace])[key] || null;
    } catch (e) {
      return localStorageFailure(key, e);
    }
  }
};

function localStorageFailure(key, e) {
  debug('localStorage failed with', e);
  cleanup();
  store = moduleStore;
  return store.get(key);
}

store = supportsLocalStorage() ? localStorageStore : moduleStore;

module.exports = {
  get: getOrSet,
  set: getOrSet,
  supportsLocalStorage: supportsLocalStorage
};

function getOrSet(key, data) {
  if (arguments.length === 1) {
    return store.get(key);
  }

  return store.set(key, data);
}

function supportsLocalStorage() {
  try {
    if ('localStorage' in global &&
      global.localStorage !== null) {
      if (!global.localStorage[localStorageNamespace]) {
        // actual creation of the namespace
        global.localStorage.setItem(localStorageNamespace, JSON.stringify({}));
      }
      return true;
    }

    return false;
  } catch (_) {
    return false;
  }
}

// In case of any error on localStorage, we clean our own namespace, this should handle
// quota errors when a lot of keys + data are used
function cleanup() {
  try {
    global.localStorage.removeItem(localStorageNamespace);
  } catch (_) {
    // nothing to do
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)))

/***/ }),
/* 417 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = '3.21.1';


/***/ }),
/* 418 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 419 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug.debug = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(425);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting
    args = exports.formatArgs.apply(self, args);

    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/[\\^$+?.()|[\]{}]/g, '\\$&').replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 420 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.0.5
 */

(function (global, factory) {
     true ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  return typeof x === 'function' || typeof x === 'object' && x !== null;
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (!Array.isArray) {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
} else {
  _isArray = Array.isArray;
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(430);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  _resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        _resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      _reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      _reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    _reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return _resolve(promise, value);
    }, function (reason) {
      return _reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$) {
  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$ === GET_THEN_ERROR) {
      _reject(promise, GET_THEN_ERROR.error);
    } else if (then$$ === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$)) {
      handleForeignThenable(promise, maybeThenable, then$$);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function _resolve(promise, value) {
  if (promise === value) {
    _reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function _reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      _reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      _resolve(promise, value);
    } else if (failed) {
      _reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      _reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      _resolve(promise, value);
    }, function rejectPromise(reason) {
      _reject(promise, reason);
    });
  } catch (e) {
    _reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this._input = input;
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate();
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    _reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
};

Enumerator.prototype._enumerate = function () {
  var length = this.length;
  var _input = this._input;

  for (var i = 0; this._state === PENDING && i < length; i++) {
    this._eachEntry(_input[i], i);
  }
};

Enumerator.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$ = c.resolve;

  if (resolve$$ === resolve) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$) {
        return resolve$$(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$(entry), i);
  }
};

Enumerator.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      _reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  _reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
  }
}

Promise.all = all;
Promise.race = race;
Promise.resolve = resolve;
Promise.reject = reject;
Promise._setScheduler = setScheduler;
Promise._setAsap = setAsap;
Promise._asap = asap;

Promise.prototype = {
  constructor: Promise,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

function polyfill() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise;
}

// Strange compat..
Promise.polyfill = polyfill;
Promise.Promise = Promise;

return Promise;

})));
//# sourceMappingURL=es6-promise.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(109), __webpack_require__(54)))

/***/ }),
/* 421 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)))

/***/ }),
/* 422 */
/***/ (function(module, exports) {

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil = Math.ceil,
    nativeMax = Math.max;

/**
 * The base implementation of `_.range` and `_.rangeRight` which doesn't
 * coerce arguments.
 *
 * @private
 * @param {number} start The start of the range.
 * @param {number} end The end of the range.
 * @param {number} step The value to increment or decrement by.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the range of numbers.
 */
function baseRange(start, end, step, fromRight) {
  var index = -1,
      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
      result = Array(length);

  while (length--) {
    result[fromRight ? length : ++index] = start;
    start += step;
  }
  return result;
}

module.exports = baseRange;


/***/ }),
/* 423 */
/***/ (function(module, exports, __webpack_require__) {

var baseRange = __webpack_require__(422),
    isIterateeCall = __webpack_require__(217),
    toFinite = __webpack_require__(219);

/**
 * Creates a `_.range` or `_.rangeRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new range function.
 */
function createRange(fromRight) {
  return function(start, end, step) {
    if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
      end = step = undefined;
    }
    // Ensure the sign of `-0` is preserved.
    start = toFinite(start);
    if (end === undefined) {
      end = start;
      start = 0;
    } else {
      end = toFinite(end);
    }
    step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
    return baseRange(start, end, step, fromRight);
  };
}

module.exports = createRange;


/***/ }),
/* 424 */
/***/ (function(module, exports, __webpack_require__) {

var createRange = __webpack_require__(423);

/**
 * Creates an array of numbers (positive and/or negative) progressing from
 * `start` up to, but not including, `end`. A step of `-1` is used if a negative
 * `start` is specified without an `end` or `step`. If `end` is not specified,
 * it's set to `start` with `start` then set to `0`.
 *
 * **Note:** JavaScript follows the IEEE-754 standard for resolving
 * floating-point values which can produce unexpected results.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {number} [start=0] The start of the range.
 * @param {number} end The end of the range.
 * @param {number} [step=1] The value to increment or decrement by.
 * @returns {Array} Returns the range of numbers.
 * @see _.inRange, _.rangeRight
 * @example
 *
 * _.range(4);
 * // => [0, 1, 2, 3]
 *
 * _.range(-4);
 * // => [0, -1, -2, -3]
 *
 * _.range(1, 5);
 * // => [1, 2, 3, 4]
 *
 * _.range(0, 20, 5);
 * // => [0, 5, 10, 15]
 *
 * _.range(0, -4, -1);
 * // => [0, -1, -2, -3]
 *
 * _.range(1, 4, 0);
 * // => [1, 1, 1]
 *
 * _.range(0);
 * // => []
 */
var range = createRange();

module.exports = range;


/***/ }),
/* 425 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000
var m = s * 60
var h = m * 60
var d = h * 24
var y = d * 365.25

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {}
  var type = typeof val
  if (type === 'string' && val.length > 0) {
    return parse(val)
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ?
			fmtLong(val) :
			fmtShort(val)
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
}

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str)
  if (str.length > 10000) {
    return
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
  if (!match) {
    return
  }
  var n = parseFloat(match[1])
  var type = (match[2] || 'ms').toLowerCase()
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y
    case 'days':
    case 'day':
    case 'd':
      return n * d
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n
    default:
      return undefined
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd'
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h'
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm'
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's'
  }
  return ms + 'ms'
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms'
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name
  }
  return Math.ceil(ms / n) + ' ' + name + 's'
}


/***/ }),
/* 426 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = __webpack_require__(427);
var isEnumerable = Object.prototype.propertyIsEnumerable;
var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var excludedKeys = {
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
	$outerHeight: true,
	$outerWidth: true,
	$pageXOffset: true,
	$pageYOffset: true,
	$parent: true,
	$scrollLeft: true,
	$scrollTop: true,
	$scrollX: true,
	$scrollY: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),
/* 427 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),
/* 428 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 429 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_429__;

/***/ }),
/* 430 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 431 */,
/* 432 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0}),exports.Panel=exports.Toggle=exports.Stats=exports.SortBy=exports.SearchBox=exports.ScrollTo=exports.ClearAll=exports.RefinementList=exports.StarRating=exports.RangeSlider=exports.RangeInput=exports.PoweredBy=exports.Pagination=exports.MultiRange=exports.Menu=exports.InfiniteHits=exports.HitsPerPage=exports.Hits=exports.Snippet=exports.Highlight=exports.HierarchicalMenu=exports.CurrentRefinements=exports.Configure=exports.Index=exports.InstantSearch=void 0;var _Configure=__webpack_require__(354);Object.defineProperty(exports,'Configure',{enumerable:!0,get:function get(){return _interopRequireDefault(_Configure).default}});var _CurrentRefinements=__webpack_require__(355);Object.defineProperty(exports,'CurrentRefinements',{enumerable:!0,get:function get(){return _interopRequireDefault(_CurrentRefinements).default}});var _HierarchicalMenu=__webpack_require__(356);Object.defineProperty(exports,'HierarchicalMenu',{enumerable:!0,get:function get(){return _interopRequireDefault(_HierarchicalMenu).default}});var _Highlight=__webpack_require__(235);Object.defineProperty(exports,'Highlight',{enumerable:!0,get:function get(){return _interopRequireDefault(_Highlight).default}});var _Snippet=__webpack_require__(370);Object.defineProperty(exports,'Snippet',{enumerable:!0,get:function get(){return _interopRequireDefault(_Snippet).default}});var _Hits=__webpack_require__(357);Object.defineProperty(exports,'Hits',{enumerable:!0,get:function get(){return _interopRequireDefault(_Hits).default}});var _HitsPerPage=__webpack_require__(358);Object.defineProperty(exports,'HitsPerPage',{enumerable:!0,get:function get(){return _interopRequireDefault(_HitsPerPage).default}});var _InfiniteHits=__webpack_require__(359);Object.defineProperty(exports,'InfiniteHits',{enumerable:!0,get:function get(){return _interopRequireDefault(_InfiniteHits).default}});var _Menu=__webpack_require__(360);Object.defineProperty(exports,'Menu',{enumerable:!0,get:function get(){return _interopRequireDefault(_Menu).default}});var _MultiRange=__webpack_require__(361);Object.defineProperty(exports,'MultiRange',{enumerable:!0,get:function get(){return _interopRequireDefault(_MultiRange).default}});var _Pagination=__webpack_require__(362);Object.defineProperty(exports,'Pagination',{enumerable:!0,get:function get(){return _interopRequireDefault(_Pagination).default}});var _PoweredBy=__webpack_require__(364);Object.defineProperty(exports,'PoweredBy',{enumerable:!0,get:function get(){return _interopRequireDefault(_PoweredBy).default}});var _RangeInput=__webpack_require__(365);Object.defineProperty(exports,'RangeInput',{enumerable:!0,get:function get(){return _interopRequireDefault(_RangeInput).default}});var _RangeSlider=__webpack_require__(366);Object.defineProperty(exports,'RangeSlider',{enumerable:!0,get:function get(){return _interopRequireDefault(_RangeSlider).default}});var _StarRating=__webpack_require__(372);Object.defineProperty(exports,'StarRating',{enumerable:!0,get:function get(){return _interopRequireDefault(_StarRating).default}});var _RefinementList=__webpack_require__(367);Object.defineProperty(exports,'RefinementList',{enumerable:!0,get:function get(){return _interopRequireDefault(_RefinementList).default}});var _ClearAll=__webpack_require__(353);Object.defineProperty(exports,'ClearAll',{enumerable:!0,get:function get(){return _interopRequireDefault(_ClearAll).default}});var _ScrollTo=__webpack_require__(368);Object.defineProperty(exports,'ScrollTo',{enumerable:!0,get:function get(){return _interopRequireDefault(_ScrollTo).default}});var _SearchBox=__webpack_require__(369);Object.defineProperty(exports,'SearchBox',{enumerable:!0,get:function get(){return _interopRequireDefault(_SearchBox).default}});var _SortBy=__webpack_require__(371);Object.defineProperty(exports,'SortBy',{enumerable:!0,get:function get(){return _interopRequireDefault(_SortBy).default}});var _Stats=__webpack_require__(373);Object.defineProperty(exports,'Stats',{enumerable:!0,get:function get(){return _interopRequireDefault(_Stats).default}});var _Toggle=__webpack_require__(374);Object.defineProperty(exports,'Toggle',{enumerable:!0,get:function get(){return _interopRequireDefault(_Toggle).default}});var _Panel=__webpack_require__(363);Object.defineProperty(exports,'Panel',{enumerable:!0,get:function get(){return _interopRequireDefault(_Panel).default}});var _createInstantSearch=__webpack_require__(352),_createInstantSearch2=_interopRequireDefault(_createInstantSearch),_createIndex=__webpack_require__(351),_createIndex2=_interopRequireDefault(_createIndex),_lite=__webpack_require__(375),_lite2=_interopRequireDefault(_lite);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var InstantSearch=(0,_createInstantSearch2.default)(_lite2.default,{Root:'div',props:{className:'ais-InstantSearch__root'}});exports.InstantSearch=InstantSearch;var Index=(0,_createIndex2.default)({Root:'div',props:{className:'ais-MultiIndex__root'}});exports.Index=Index;

/***/ })
/******/ ]);
});
//# sourceMappingURL=Dom.js.map