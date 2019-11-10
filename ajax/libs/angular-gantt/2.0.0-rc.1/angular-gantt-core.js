/*!
 * Project: angular-gantt v2.0.0-rc.1 - Gantt chart component for AngularJS
 * Authors: Rémi Alvergnat <toilal.dev@gmail.com> (https://www.pragmasphere.com), Marco Schweighauser
 * License: MIT
 * Homepage: https://www.angular-gantt.com
 * Github: https://github.com/angular-gantt/angular-gantt.git
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"), require("moment"));
	else if(typeof define === 'function' && define.amd)
		define("angular-gantt-core", ["angular", "moment"], factory);
	else if(typeof exports === 'object')
		exports["angular-gantt-core"] = factory(require("angular"), require("moment"));
	else
		root["angular-gantt-core"] = factory(root["angular"], root["moment"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(126);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(133), __esModule: true };

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(130);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(129);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _angular = __webpack_require__(2);

var _angular2 = _interopRequireDefault(_angular);

var _gantt = __webpack_require__(64);

var _gantt2 = _interopRequireDefault(_gantt);

var _resizer = __webpack_require__(83);

var _resizer2 = _interopRequireDefault(_resizer);

var _containerHeightListener = __webpack_require__(89);

var _containerHeightListener2 = _interopRequireDefault(_containerHeightListener);

var _containerWidthListener = __webpack_require__(90);

var _containerWidthListener2 = _interopRequireDefault(_containerWidthListener);

var _elementHeightListener = __webpack_require__(91);

var _elementHeightListener2 = _interopRequireDefault(_elementHeightListener);

var _elementWidthListener = __webpack_require__(92);

var _elementWidthListener2 = _interopRequireDefault(_elementWidthListener);

var _horizontalScrollReceiver = __webpack_require__(84);

var _horizontalScrollReceiver2 = _interopRequireDefault(_horizontalScrollReceiver);

var _scrollable = __webpack_require__(87);

var _scrollable2 = _interopRequireDefault(_scrollable);

var _scrollManager = __webpack_require__(85);

var _scrollManager2 = _interopRequireDefault(_scrollManager);

var _scrollSender = __webpack_require__(86);

var _scrollSender2 = _interopRequireDefault(_scrollSender);

var _verticalScrollReceiver = __webpack_require__(88);

var _verticalScrollReceiver2 = _interopRequireDefault(_verticalScrollReceiver);

var _body = __webpack_require__(93);

var _body2 = _interopRequireDefault(_body);

var _bodyBackground = __webpack_require__(94);

var _bodyBackground2 = _interopRequireDefault(_bodyBackground);

var _bodyColumns = __webpack_require__(95);

var _bodyColumns2 = _interopRequireDefault(_bodyColumns);

var _bodyForeground = __webpack_require__(96);

var _bodyForeground2 = _interopRequireDefault(_bodyForeground);

var _bodyRows = __webpack_require__(97);

var _bodyRows2 = _interopRequireDefault(_bodyRows);

var _column = __webpack_require__(98);

var _column2 = _interopRequireDefault(_column);

var _columnHeader = __webpack_require__(99);

var _columnHeader2 = _interopRequireDefault(_columnHeader);

var _header = __webpack_require__(100);

var _header2 = _interopRequireDefault(_header);

var _headerColumns = __webpack_require__(101);

var _headerColumns2 = _interopRequireDefault(_headerColumns);

var _row = __webpack_require__(102);

var _row2 = _interopRequireDefault(_row);

var _rowBackground = __webpack_require__(103);

var _rowBackground2 = _interopRequireDefault(_rowBackground);

var _rowLabel = __webpack_require__(104);

var _rowLabel2 = _interopRequireDefault(_rowLabel);

var _scrollableHeader = __webpack_require__(105);

var _scrollableHeader2 = _interopRequireDefault(_scrollableHeader);

var _side = __webpack_require__(106);

var _side2 = _interopRequireDefault(_side);

var _sideBackground = __webpack_require__(107);

var _sideBackground2 = _interopRequireDefault(_sideBackground);

var _sideContent = __webpack_require__(108);

var _sideContent2 = _interopRequireDefault(_sideContent);

var _task = __webpack_require__(109);

var _task2 = _interopRequireDefault(_task);

var _taskBackground = __webpack_require__(110);

var _taskBackground2 = _interopRequireDefault(_taskBackground);

var _taskContent = __webpack_require__(111);

var _taskContent2 = _interopRequireDefault(_taskContent);

var _taskForeground = __webpack_require__(112);

var _taskForeground2 = _interopRequireDefault(_taskForeground);

var _timeFrame = __webpack_require__(113);

var _timeFrame2 = _interopRequireDefault(_timeFrame);

var _timespan = __webpack_require__(114);

var _timespan2 = _interopRequireDefault(_timespan);

var _ganttBindCompileHtml = __webpack_require__(119);

var _ganttBindCompileHtml2 = _interopRequireDefault(_ganttBindCompileHtml);

var _gantt3 = __webpack_require__(68);

var _gantt4 = _interopRequireDefault(_gantt3);

var _api = __webpack_require__(37);

var _api2 = _interopRequireDefault(_api);

var _options = __webpack_require__(38);

var _options2 = _interopRequireDefault(_options);

var _calendar = __webpack_require__(39);

var _calendar2 = _interopRequireDefault(_calendar);

var _scroll = __webpack_require__(47);

var _scroll2 = _interopRequireDefault(_scroll);

var _body3 = __webpack_require__(45);

var _body4 = _interopRequireDefault(_body3);

var _bodyColumns3 = __webpack_require__(72);

var _bodyColumns4 = _interopRequireDefault(_bodyColumns3);

var _bodyRows3 = __webpack_require__(74);

var _bodyRows4 = _interopRequireDefault(_bodyRows3);

var _bodyBackground3 = __webpack_require__(71);

var _bodyBackground4 = _interopRequireDefault(_bodyBackground3);

var _bodyForeground3 = __webpack_require__(73);

var _bodyForeground4 = _interopRequireDefault(_bodyForeground3);

var _header3 = __webpack_require__(46);

var _header4 = _interopRequireDefault(_header3);

var _headerColumns3 = __webpack_require__(75);

var _headerColumns4 = _interopRequireDefault(_headerColumns3);

var _side3 = __webpack_require__(48);

var _side4 = _interopRequireDefault(_side3);

var _objectModel = __webpack_require__(43);

var _objectModel2 = _interopRequireDefault(_objectModel);

var _task3 = __webpack_require__(70);

var _task4 = _interopRequireDefault(_task3);

var _row3 = __webpack_require__(69);

var _row4 = _interopRequireDefault(_row3);

var _rowsManager = __webpack_require__(44);

var _rowsManager2 = _interopRequireDefault(_rowsManager);

var _column3 = __webpack_require__(23);

var _column4 = _interopRequireDefault(_column3);

var _columnBuilder = __webpack_require__(65);

var _columnBuilder2 = _interopRequireDefault(_columnBuilder);

var _columnHeader3 = __webpack_require__(41);

var _columnHeader4 = _interopRequireDefault(_columnHeader3);

var _columnsManager = __webpack_require__(42);

var _columnsManager2 = _interopRequireDefault(_columnsManager);

var _timespan3 = __webpack_require__(76);

var _timespan4 = _interopRequireDefault(_timespan3);

var _timespansManager = __webpack_require__(49);

var _timespansManager2 = _interopRequireDefault(_timespansManager);

var _currentDateManager = __webpack_require__(40);

var _currentDateManager2 = _interopRequireDefault(_currentDateManager);

var _hierarchy = __webpack_require__(79);

var _hierarchy2 = _interopRequireDefault(_hierarchy);

var _debounce = __webpack_require__(115);

var _debounce2 = _interopRequireDefault(_debounce);

var _smartEvent = __webpack_require__(123);

var _smartEvent2 = _interopRequireDefault(_smartEvent);

var _directiveBuilder = __webpack_require__(116);

var _directiveBuilder2 = _interopRequireDefault(_directiveBuilder);

var _enableNgAnimate = __webpack_require__(118);

var _enableNgAnimate2 = _interopRequireDefault(_enableNgAnimate);

var _utils = __webpack_require__(80);

var _utils2 = _interopRequireDefault(_utils);

var _arrays = __webpack_require__(77);

var _arrays2 = _interopRequireDefault(_arrays);

var _binarySearch = __webpack_require__(78);

var _binarySearch2 = _interopRequireDefault(_binarySearch);

var _layout = __webpack_require__(120);

var _layout2 = _interopRequireDefault(_layout);

var _headersGenerator = __webpack_require__(67);

var _headersGenerator2 = _interopRequireDefault(_headersGenerator);

var _columnGenerator = __webpack_require__(66);

var _columnGenerator2 = _interopRequireDefault(_columnGenerator);

var _dom = __webpack_require__(117);

var _dom2 = _interopRequireDefault(_dom);

var _mouseButton = __webpack_require__(121);

var _mouseButton2 = _interopRequireDefault(_mouseButton);

var _mouseOffset = __webpack_require__(122);

var _mouseOffset2 = _interopRequireDefault(_mouseOffset);

var _columnLimit = __webpack_require__(81);

var _columnLimit2 = _interopRequireDefault(_columnLimit);

var _taskLimit = __webpack_require__(82);

var _taskLimit2 = _interopRequireDefault(_taskLimit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(124);
__webpack_require__(63);

var _module = 'gantt';
_angular2.default.module(_module, []).directive('gantt', _gantt2.default).directive('ganttResizer', _resizer2.default).directive('ganttContainerWidthListener', _containerWidthListener2.default).directive('ganttContainerHeightListener', _containerHeightListener2.default).directive('ganttElementWidthListener', _elementWidthListener2.default).directive('ganttElementHeightListener', _elementHeightListener2.default).directive('ganttHorizontalScrollReceiver', _horizontalScrollReceiver2.default).directive('ganttScrollable', _scrollable2.default).directive('ganttScrollManager', _scrollManager2.default).directive('ganttScrollSender', _scrollSender2.default).directive('ganttVerticalScrollReceiver', _verticalScrollReceiver2.default).directive('ganttBindCompileHtml', _ganttBindCompileHtml2.default).directive('ganttBody', _body2.default).directive('ganttBodyBackground', _bodyBackground2.default).directive('ganttBodyColumns', _bodyColumns2.default).directive('ganttBodyForeground', _bodyForeground2.default).directive('ganttBodyRows', _bodyRows2.default).directive('ganttColumn', _column2.default).directive('ganttColumnHeader', _columnHeader2.default).directive('ganttHeader', _header2.default).directive('ganttHeaderColumns', _headerColumns2.default).directive('ganttRow', _row2.default).directive('ganttRowBackground', _rowBackground2.default).directive('ganttRowLabel', _rowLabel2.default).directive('ganttScrollableHeader', _scrollableHeader2.default).directive('ganttSide', _side2.default).directive('ganttSideBackground', _sideBackground2.default).directive('ganttSideContent', _sideContent2.default).directive('ganttTask', _task2.default).directive('ganttTaskBackground', _taskBackground2.default).directive('ganttTaskContent', _taskContent2.default).directive('ganttTaskForeground', _taskForeground2.default).directive('ganttTimeFrame', _timeFrame2.default).directive('ganttTimespan', _timespan2.default).factory('GanttDirectiveBuilder', _directiveBuilder2.default).factory('Gantt', _gantt4.default).factory('GanttApi', _api2.default).factory('GanttOptions', _options2.default).factory('GanttCalendar', _calendar2.default).factory('GanttScroll', _scroll2.default).factory('GanttBody', _body4.default).factory('GanttBodyColumns', _bodyColumns4.default).factory('GanttBodyRows', _bodyRows4.default).factory('GanttBodyBackground', _bodyBackground4.default).factory('GanttBodyForeground', _bodyForeground4.default).factory('GanttHeader', _header4.default).factory('GanttHeaderColumns', _headerColumns4.default).factory('GanttSide', _side4.default).factory('GanttObjectModel', _objectModel2.default).factory('GanttTask', _task4.default).factory('GanttRow', _row4.default).factory('GanttRowsManager', _rowsManager2.default).factory('GanttColumn', _column4.default).factory('GanttColumnHeader', _columnHeader4.default).factory('GanttColumnBuilder', _columnBuilder2.default).factory('GanttColumnsManager', _columnsManager2.default).factory('GanttTimespan', _timespan4.default).factory('GanttTimespansManager', _timespansManager2.default).factory('GanttCurrentDateManager', _currentDateManager2.default).factory('GanttHierarchy', _hierarchy2.default).factory('ganttDebounce', _debounce2.default).factory('GanttSmartEvent', _smartEvent2.default).service('ganttEnableNgAnimate', _enableNgAnimate2.default).service('ganttUtils', _utils2.default).service('ganttArrays', _arrays2.default).service('ganttBinarySearch', _binarySearch2.default).service('ganttLayout', _layout2.default).service('GanttHeadersGenerator', _headersGenerator2.default).service('GanttColumnGenerator', _columnGenerator2.default).service('ganttDom', _dom2.default).service('ganttMouseButton', _mouseButton2.default).service('ganttMouseOffset', _mouseOffset2.default).filter('ganttColumnLimit', _columnLimit2.default).filter('ganttTaskLimit', _taskLimit2.default);
exports.default = _module;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(32)('wks')
  , uid        = __webpack_require__(22)
  , Symbol     = __webpack_require__(8).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(17)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(14)
  , IE8_DOM_DEFINE = __webpack_require__(52)
  , toPrimitive    = __webpack_require__(34)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(10) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(146)
  , defined = __webpack_require__(25);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(18);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(8)
  , core      = __webpack_require__(7)
  , ctx       = __webpack_require__(50)
  , hide      = __webpack_require__(16)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(12)
  , createDesc = __webpack_require__(21);
module.exports = __webpack_require__(10) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(58)
  , enumBugKeys = __webpack_require__(26);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttColumn = undefined;

var _getIterator2 = __webpack_require__(4);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = function () {
    'ngInject';

    return GanttColumn;
};

var _moment = __webpack_require__(3);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttColumn = exports.GanttColumn = function () {
    function GanttColumn(date, endDate, left, width, calendar, timeFramesWorkingMode, timeFramesNonWorkingMode) {
        (0, _classCallCheck3.default)(this, GanttColumn);

        this.timeFrames = [];
        this.visibleTimeFrames = [];
        this.daysTimeFrames = {};
        this.currentDate = false;
        this.cropped = false;
        this.date = date;
        this.endDate = endDate;
        this.left = left;
        this.width = width;
        this.calendar = calendar;
        this.duration = this.endDate.diff(this.date, 'milliseconds');
        this.timeFramesWorkingMode = timeFramesWorkingMode;
        this.timeFramesNonWorkingMode = timeFramesNonWorkingMode;
        this.timeFrames = [];
        this.visibleTimeFrames = [];
        this.daysTimeFrames = {};
        this.originalSize = { left: this.left, width: this.width };
        this.updateTimeFrames();
    }

    (0, _createClass3.default)(GanttColumn, [{
        key: 'getDateKey',
        value: function getDateKey(date) {
            return date.year() + '-' + date.month() + '-' + date.date();
        }
    }, {
        key: 'updateView',
        value: function updateView() {
            if (this.$element) {
                if (this.currentDate) {
                    this.$element.addClass('gantt-foreground-col-current-date');
                } else {
                    this.$element.removeClass('gantt-foreground-col-current-date');
                }
                this.$element.css({ 'left': this.left + 'px', 'width': this.width + 'px' });
                this.timeFrames.forEach(function (timeFrame) {
                    return timeFrame.updateView();
                });
            }
        }
    }, {
        key: 'updateTimeFrames',
        value: function updateTimeFrames() {
            if (this.calendar !== undefined && (this.timeFramesNonWorkingMode !== 'hidden' || this.timeFramesWorkingMode !== 'hidden')) {
                var cDate = this.date;
                var cDateStartOfDay = (0, _moment2.default)(cDate).startOf('day');
                var cDateNextDay = cDateStartOfDay.add(1, 'day');
                var i = void 0;
                while (cDate < this.endDate) {
                    var timeFrames = this.calendar.getTimeFrames(cDate);
                    var nextCDate = _moment2.default.min(cDateNextDay, this.endDate);
                    timeFrames = this.calendar.solve(timeFrames, cDate, nextCDate);
                    var cTimeFrames = [];
                    for (i = 0; i < timeFrames.length; i++) {
                        var cTimeFrame = timeFrames[i];
                        var start = cTimeFrame.start;
                        if (start === undefined) {
                            start = cDate;
                        }
                        var end = cTimeFrame.end;
                        if (end === undefined) {
                            end = nextCDate;
                        }
                        if (start < this.date) {
                            start = this.date;
                        }
                        if (end > this.endDate) {
                            end = this.endDate;
                        }
                        cTimeFrame = cTimeFrame.clone();
                        cTimeFrame.start = (0, _moment2.default)(start);
                        cTimeFrame.end = (0, _moment2.default)(end);
                        cTimeFrames.push(cTimeFrame);
                    }
                    this.timeFrames = this.timeFrames.concat(cTimeFrames);
                    var cDateKey = this.getDateKey(cDate);
                    this.daysTimeFrames[cDateKey] = cTimeFrames;
                    cDate = nextCDate;
                    cDateStartOfDay = (0, _moment2.default)(cDate).startOf('day');
                    cDateNextDay = cDateStartOfDay.add(1, 'day');
                }
                for (i = 0; i < this.timeFrames.length; i++) {
                    var timeFrame = this.timeFrames[i];
                    var positionDuration = timeFrame.start.diff(this.date, 'milliseconds');
                    var position = positionDuration / this.duration * this.width;
                    var timeFrameDuration = timeFrame.end.diff(timeFrame.start, 'milliseconds');
                    var timeFramePosition = timeFrameDuration / this.duration * this.width;
                    var hidden = false;
                    if (timeFrame.working && this.timeFramesWorkingMode !== 'visible') {
                        hidden = true;
                    } else if (!timeFrame.working && this.timeFramesNonWorkingMode !== 'visible') {
                        hidden = true;
                    }
                    if (!hidden) {
                        this.visibleTimeFrames.push(timeFrame);
                    }
                    timeFrame.hidden = hidden;
                    timeFrame.left = position;
                    timeFrame.width = timeFramePosition;
                    timeFrame.originalSize = { left: timeFrame.left, width: timeFrame.width };
                }
                if (this.timeFramesNonWorkingMode === 'cropped' || this.timeFramesWorkingMode === 'cropped') {
                    var timeFramesWidth = 0;
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = (0, _getIterator3.default)(this.timeFrames), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var aTimeFrame = _step.value;

                            if (!aTimeFrame.working && this.timeFramesNonWorkingMode !== 'cropped' || aTimeFrame.working && this.timeFramesWorkingMode !== 'cropped') {
                                timeFramesWidth += aTimeFrame.width;
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    if (timeFramesWidth !== this.width) {
                        var croppedRatio = this.width / timeFramesWidth;
                        var croppedWidth = 0;
                        var originalCroppedWidth = 0;
                        var allCropped = true;
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = (0, _getIterator3.default)(this.timeFrames), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var bTimeFrame = _step2.value;

                                if (!bTimeFrame.working && this.timeFramesNonWorkingMode !== 'cropped' || bTimeFrame.working && this.timeFramesWorkingMode !== 'cropped') {
                                    bTimeFrame.left = (bTimeFrame.left - croppedWidth) * croppedRatio;
                                    bTimeFrame.width = bTimeFrame.width * croppedRatio;
                                    bTimeFrame.originalSize.left = (bTimeFrame.originalSize.left - originalCroppedWidth) * croppedRatio;
                                    bTimeFrame.originalSize.width = bTimeFrame.originalSize.width * croppedRatio;
                                    bTimeFrame.cropped = false;
                                    allCropped = false;
                                } else {
                                    croppedWidth += bTimeFrame.width;
                                    originalCroppedWidth += bTimeFrame.originalSize.width;
                                    bTimeFrame.left = undefined;
                                    bTimeFrame.width = 0;
                                    bTimeFrame.originalSize = { left: undefined, width: 0 };
                                    bTimeFrame.cropped = true;
                                }
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }

                        this.cropped = allCropped;
                    } else {
                        this.cropped = false;
                    }
                }
            }
        }
    }, {
        key: 'clone',
        value: function clone() {
            return new GanttColumn((0, _moment2.default)(this.date), (0, _moment2.default)(this.endDate), this.left, this.width, this.calendar);
        }
    }, {
        key: 'containsDate',
        value: function containsDate(date) {
            return date > this.date && date <= this.endDate;
        }
    }, {
        key: 'equals',
        value: function equals(other) {
            return this.date === other.date;
        }
    }, {
        key: 'roundTo',
        value: function roundTo(date, unit, offset, midpoint) {
            if (unit === 'day') {
                unit = 'date';
            }
            offset = offset || 1;
            var value = date.get(unit);
            switch (midpoint) {
                case 'up':
                    value = Math.ceil(value / offset);
                    break;
                case 'down':
                    value = Math.floor(value / offset);
                    break;
                default:
                    value = Math.round(value / offset);
                    break;
            }
            var units = ['millisecond', 'second', 'minute', 'hour', 'date', 'month', 'year'];
            date.set(unit, value * offset);
            var indexOf = units.indexOf(unit);
            for (var i = 0; i < indexOf; i++) {
                date.set(units[i], 0);
            }
            return date;
        }
    }, {
        key: 'getMagnetDate',
        value: function getMagnetDate(date, magnetValue, magnetUnit, timeFramesMagnet) {
            if (magnetValue > 0 && magnetUnit !== undefined) {
                var initialDate = date;
                date = (0, _moment2.default)(date);
                if (magnetUnit === 'column') {
                    var position = this.getPositionByDate(date);
                    if (position < this.width / 2) {
                        date = (0, _moment2.default)(this.date);
                    } else {
                        date = (0, _moment2.default)(this.endDate);
                    }
                } else {
                    date = this.roundTo(date, magnetUnit, magnetValue);

                    if (date < this.date) {
                        date = (0, _moment2.default)(this.date);
                    } else if (date > this.endDate) {
                        date = (0, _moment2.default)(this.endDate);
                    }
                }
                if (timeFramesMagnet) {
                    var maxTimeFrameDiff = Math.abs(initialDate.diff(date, 'milliseconds'));
                    var currentTimeFrameDiff = void 0;
                    for (var i = 0; i < this.timeFrames.length; i++) {
                        var timeFrame = this.timeFrames[i];
                        if (timeFrame.magnet) {
                            var previousTimeFrame = this.timeFrames[i - 1];
                            var nextTimeFrame = this.timeFrames[i + 1];
                            var timeFrameDiff = void 0;
                            if (previousTimeFrame === undefined || previousTimeFrame.working !== timeFrame.working) {
                                timeFrameDiff = Math.abs(initialDate.diff(timeFrame.start, 'milliseconds'));
                                if (timeFrameDiff < maxTimeFrameDiff && (currentTimeFrameDiff === undefined || timeFrameDiff < currentTimeFrameDiff)) {
                                    currentTimeFrameDiff = timeFrameDiff;
                                    date = timeFrame.start;
                                }
                            }
                            if (nextTimeFrame === undefined || nextTimeFrame.working !== timeFrame.working) {
                                timeFrameDiff = Math.abs(initialDate.diff(timeFrame.end, 'milliseconds'));
                                if (timeFrameDiff < maxTimeFrameDiff && (currentTimeFrameDiff === undefined || timeFrameDiff < currentTimeFrameDiff)) {
                                    currentTimeFrameDiff = timeFrameDiff;
                                    date = timeFrame.end;
                                }
                            }
                        }
                    }
                }
            }
            return date;
        }
    }, {
        key: 'getDateByPositionUsingTimeFrames',
        value: function getDateByPositionUsingTimeFrames(position) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = (0, _getIterator3.default)(this.timeFrames), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var timeFrame = _step3.value;

                    if (!timeFrame.cropped && position >= timeFrame.left && position <= timeFrame.left + timeFrame.width) {
                        var positionDuration = timeFrame.getDuration() / timeFrame.width * (position - timeFrame.left);
                        var date = (0, _moment2.default)(timeFrame.start).add(positionDuration, 'milliseconds');
                        return date;
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }, {
        key: 'getDateByPosition',
        value: function getDateByPosition(position, magnetValue, magnetUnit, timeFramesMagnet) {
            var date = void 0;
            if (position < 0) {
                position = 0;
            }
            if (position > this.width) {
                position = this.width;
            }
            if (this.timeFramesNonWorkingMode === 'cropped' || this.timeFramesWorkingMode === 'cropped') {
                date = this.getDateByPositionUsingTimeFrames(position);
            }
            if (date === undefined) {
                var positionDuration = this.duration / this.width * position;
                date = (0, _moment2.default)(this.date).add(positionDuration, 'milliseconds');
            }
            date = this.getMagnetDate(date, magnetValue, magnetUnit, timeFramesMagnet);
            return date;
        }
    }, {
        key: 'getDayTimeFrame',
        value: function getDayTimeFrame(date) {
            var dtf = this.daysTimeFrames[this.getDateKey(date)];
            if (dtf === undefined) {
                return [];
            }
            return dtf;
        }
    }, {
        key: 'getPositionByDate',
        value: function getPositionByDate(date) {
            var croppedDate = date;
            if (this.timeFramesNonWorkingMode === 'cropped' || this.timeFramesWorkingMode === 'cropped') {
                var timeFrames = this.getDayTimeFrame(croppedDate);
                for (var i = 0; i < timeFrames.length; i++) {
                    var timeFrame = timeFrames[i];
                    if (croppedDate >= timeFrame.start && croppedDate <= timeFrame.end) {
                        if (timeFrame.cropped) {
                            if (timeFrames.length > i + 1) {
                                croppedDate = timeFrames[i + 1].start;
                            } else {
                                croppedDate = timeFrame.end;
                            }
                        } else {
                            var _positionDuration = croppedDate.diff(timeFrame.start, 'milliseconds');
                            var _position = _positionDuration / timeFrame.getDuration() * timeFrame.width;
                            return this.left + timeFrame.left + _position;
                        }
                    }
                }
            }
            var positionDuration = croppedDate.diff(this.date, 'milliseconds');
            var position = positionDuration / this.duration * this.width;
            if (position < 0) {
                position = 0;
            }
            if (position > this.width) {
                position = this.width;
            }
            return this.left + position;
        }
    }]);
    return GanttColumn;
}();

/***/ }),
/* 24 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(14)
  , dPs         = __webpack_require__(152)
  , enumBugKeys = __webpack_require__(26)
  , IE_PROTO    = __webpack_require__(31)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(51)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(145).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(12).f
  , has = __webpack_require__(11)
  , TAG = __webpack_require__(9)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(32)('keys')
  , uid    = __webpack_require__(22);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(18);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(8)
  , core           = __webpack_require__(7)
  , LIBRARY        = __webpack_require__(27)
  , wksExt         = __webpack_require__(36)
  , defineProperty = __webpack_require__(12).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(9);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttApi = undefined;

var _getIterator2 = __webpack_require__(4);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = ["$q", "$rootScope", "ganttUtils", function ($q, $rootScope, ganttUtils) {
    'ngInject';

    GanttApi.$q = $q;
    GanttApi.$rootScope = $rootScope;
    GanttApi.ganttUtils = ganttUtils;
    return GanttApi;
}];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttApi = exports.GanttApi = function () {
    function GanttApi(gantt) {
        (0, _classCallCheck3.default)(this, GanttApi);

        this.gantt = gantt;
        this.listeners = [];
        this.apiId = GanttApi.ganttUtils.newId();
    }

    (0, _createClass3.default)(GanttApi, [{
        key: 'registerEventWithAngular',
        value: function registerEventWithAngular(eventId, handler, gantt, _this) {
            return GanttApi.$rootScope.$on(eventId, function () {
                var args = Array.prototype.slice.call(arguments);
                args.splice(0, 1);
                handler.apply(_this ? _this : gantt.api, args);
            });
        }
    }, {
        key: 'suppressEvents',
        value: function suppressEvents(listenerFuncs, callBackFn) {
            var _this2 = this;

            var listeners = Array.isArray(listenerFuncs) ? listenerFuncs : [listenerFuncs];

            var foundListeners = [];
            listeners.forEach(function (l) {
                foundListeners = _this2.listeners.filter(function (lstnr) {
                    return l === lstnr.handler;
                });
            });

            foundListeners.forEach(function (l) {
                return l.dereg();
            });
            callBackFn();

            foundListeners.forEach(function (l) {
                l.dereg = _this2.registerEventWithAngular(l.eventId, l.handler, _this2.gantt, l._this);
            });
        }
    }, {
        key: 'registerEvent',
        value: function registerEvent(featureName, eventName) {
            var _this3 = this;

            if (!this[featureName]) {
                this[featureName] = {};
            }
            var feature = this[featureName];
            if (!feature.on) {
                feature.on = {};
                feature.raise = {};
            }
            var eventId = 'event:gantt:' + this.apiId + ':' + featureName + ':' + eventName;

            feature.raise[eventName] = function () {
                GanttApi.$rootScope.$emit.apply(GanttApi.$rootScope, [eventId].concat(Array.prototype.slice.call(arguments)));
            };

            feature.on[eventName] = function (scope, handler, _this) {
                var deregAngularOn = _this3.registerEventWithAngular(eventId, handler, _this3.gantt, _this);

                var listener = {
                    handler: handler,
                    dereg: deregAngularOn,
                    eventId: eventId,
                    scope: scope,
                    _this: _this
                };
                _this3.listeners.push(listener);
                var removeListener = function removeListener() {
                    listener.dereg();
                    var index = _this3.listeners.indexOf(listener);
                    _this3.listeners.splice(index, 1);
                };

                scope.$on('$destroy', function () {
                    removeListener();
                });
                return removeListener;
            };
        }
    }, {
        key: 'registerEventsFromObject',
        value: function registerEventsFromObject(eventObjectMap) {
            var _this4 = this;

            var features = [];
            for (var featPropName in eventObjectMap) {
                var featProp = eventObjectMap[featPropName];
                var feature = { name: featPropName, events: [] };
                for (var propName in featProp) {
                    feature.events.push(propName);
                }
                features.push(feature);
            }

            var _loop = function _loop(_feature) {
                _feature.events.forEach(function (event) {
                    _this4.registerEvent(_feature.name, event);
                });
            };

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(features), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _feature = _step.value;

                    _loop(_feature);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'registerMethod',
        value: function registerMethod(featureName, methodName, callBackFn, _this) {
            if (!this[featureName]) {
                this[featureName] = {};
            }
            var feature = this[featureName];
            feature[methodName] = GanttApi.ganttUtils.createBoundedWrapper(_this || this.gantt, callBackFn);
        }
    }, {
        key: 'registerMethodsFromObject',
        value: function registerMethodsFromObject(methodMap, _this) {
            var features = [];
            for (var featPropName in methodMap) {
                var featProp = methodMap[featPropName];
                var feature = { name: featPropName, methods: [] };
                for (var propName in featProp) {
                    var prop = featProp[propName];
                    feature.methods.push({ name: propName, fn: prop });
                }
                features.push(feature);
            }
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (0, _getIterator3.default)(features), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _feature2 = _step2.value;
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = (0, _getIterator3.default)(_feature2.methods), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var method = _step3.value;

                            this.registerMethod(_feature2.name, method.name, method.fn, _this);
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }]);
    return GanttApi;
}();

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttOptions = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = function () {
    'ngInject';

    return GanttOptions;
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttOptions = exports.GanttOptions = function () {
    function GanttOptions(values, defaultValues) {
        (0, _classCallCheck3.default)(this, GanttOptions);

        this.defaultValues = defaultValues;
        this.values = values;
    }

    (0, _createClass3.default)(GanttOptions, [{
        key: 'defaultValue',
        value: function defaultValue(optionName) {
            var defaultValue = this.defaultValues[optionName];
            if (typeof defaultValue === 'function') {
                defaultValue = defaultValue();
            }
            return defaultValue;
        }
    }, {
        key: 'sanitize',
        value: function sanitize(optionName, optionValue) {
            if (!optionValue) {
                var defaultValue = this.defaultValue(optionName);
                if (defaultValue !== undefined) {
                    if (optionValue !== undefined && typeof defaultValue === 'boolean') {
                        return optionValue;
                    }
                    return defaultValue;
                }
            }
            return optionValue;
        }
    }, {
        key: 'value',
        value: function value(optionName) {
            return this.sanitize(optionName, this.values[optionName]);
        }
    }, {
        key: 'set',
        value: function set(optionName, optionValue) {
            this.values[optionName] = optionValue;
        }
    }, {
        key: 'initialize',
        value: function initialize() {
            for (var optionName in this.values) {
                if (this.values.hasOwnProperty(optionName)) {
                    this.values[optionName] = this.value(optionName);
                }
            }
            return this.values;
        }
    }]);
    return GanttOptions;
}();

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttCalendar = exports.DateFrame = exports.TimeFrameMapping = exports.TimeFrame = undefined;

var _getIterator2 = __webpack_require__(4);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = ["$filter", function ($filter) {
    'ngInject';

    GanttCalendar.$filter = $filter;
    return GanttCalendar;
}];

var _moment = __webpack_require__(3);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimeFrame = exports.TimeFrame = function () {
    function TimeFrame(options) {
        (0, _classCallCheck3.default)(this, TimeFrame);

        if (options === undefined) {
            options = {};
        }
        this.start = options.start;
        this.end = options.end;
        this.working = options.working;
        this.magnet = options.magnet !== undefined ? options.magnet : true;
        this.default = options.default;
        this.color = options.color;
        this.classes = options.classes;
        this.internal = options.internal;
    }

    (0, _createClass3.default)(TimeFrame, [{
        key: 'updateView',
        value: function updateView() {
            if (this.$element) {
                var cssStyles = {};
                if (this.left !== undefined) {
                    cssStyles['left'] = this.left + 'px';
                } else {
                    cssStyles['left'] = '';
                }
                if (this.width !== undefined) {
                    cssStyles['width'] = this.width + 'px';
                } else {
                    cssStyles['width'] = '';
                }
                if (this.color !== undefined) {
                    cssStyles['background-color'] = this.color;
                } else {
                    cssStyles['background-color'] = '';
                }
                this.$element.css(cssStyles);
                var classes = ['gantt-timeframe' + (this.working ? '' : '-non') + '-working'];
                if (this.classes) {
                    classes = classes.concat(this.classes);
                }

                for (var i = 0, l = classes.length; i < l; i++) {
                    this.$element.toggleClass(classes[i], true);
                }
            }
        }
    }, {
        key: 'getDuration',
        value: function getDuration() {
            if (this.end !== undefined && this.start !== undefined) {
                return this.end.diff(this.start, 'milliseconds');
            }
        }
    }, {
        key: 'clone',
        value: function clone() {
            return new TimeFrame(this);
        }
    }]);
    return TimeFrame;
}();

var TimeFrameMapping = exports.TimeFrameMapping = function () {
    function TimeFrameMapping(func) {
        (0, _classCallCheck3.default)(this, TimeFrameMapping);

        this.func = func;
    }

    (0, _createClass3.default)(TimeFrameMapping, [{
        key: 'getTimeFrames',
        value: function getTimeFrames(date) {
            var ret = this.func(date);
            if (!(ret instanceof Array)) {
                ret = [ret];
            }
            return ret;
        }
    }, {
        key: 'clone',
        value: function clone() {
            return new TimeFrameMapping(this.func);
        }
    }]);
    return TimeFrameMapping;
}();

var DateFrame = exports.DateFrame = function () {
    function DateFrame(options) {
        (0, _classCallCheck3.default)(this, DateFrame);

        this.evaluator = options.evaluator;
        if (options.date) {
            this.start = (0, _moment2.default)(options.date).startOf('day');
            this.end = (0, _moment2.default)(options.date).endOf('day');
        } else {
            this.start = options.start;
            this.end = options.end;
        }
        if (options.targets instanceof Array) {
            this.targets = options.targets;
        } else {
            this.targets = [options.targets];
        }
        this.default = options.default;
    }

    (0, _createClass3.default)(DateFrame, [{
        key: 'dateMatch',
        value: function dateMatch(date) {
            if (this.evaluator) {
                return this.evaluator(date);
            } else if (this.start && this.end) {
                return date >= this.start && date <= this.end;
            } else {
                return false;
            }
        }
    }, {
        key: 'clone',
        value: function clone() {
            return new DateFrame(this);
        }
    }]);
    return DateFrame;
}();

var GanttCalendar = exports.GanttCalendar = function () {
    function GanttCalendar() {
        (0, _classCallCheck3.default)(this, GanttCalendar);

        this.timeFrames = {};
        this.timeFrameMappings = {};
        this.dateFrames = {};
    }

    (0, _createClass3.default)(GanttCalendar, [{
        key: 'clear',
        value: function clear() {
            this.timeFrames = {};
            this.timeFrameMappings = {};
            this.dateFrames = {};
        }
    }, {
        key: 'registerTimeFrames',
        value: function registerTimeFrames(timeFrames) {
            for (var name in timeFrames) {
                var timeFrame = timeFrames[name];
                this.timeFrames[name] = new TimeFrame(timeFrame);
            }
        }
    }, {
        key: 'removeTimeFrames',
        value: function removeTimeFrames(timeFrames) {
            for (var name in timeFrames) {
                delete this.timeFrames[name];
            }
        }
    }, {
        key: 'clearTimeFrames',
        value: function clearTimeFrames() {
            this.timeFrames = {};
        }
    }, {
        key: 'registerTimeFrameMappings',
        value: function registerTimeFrameMappings(mappings) {
            for (var name in mappings) {
                var timeFrameMapping = mappings[name];
                this.timeFrameMappings[name] = new TimeFrameMapping(timeFrameMapping);
            }
        }
    }, {
        key: 'removeTimeFrameMappings',
        value: function removeTimeFrameMappings(mappings) {
            for (var name in mappings) {
                delete this.timeFrameMappings[name];
            }
        }
    }, {
        key: 'clearTimeFrameMappings',
        value: function clearTimeFrameMappings() {
            this.timeFrameMappings = {};
        }
    }, {
        key: 'registerDateFrames',
        value: function registerDateFrames(dateFrames) {
            for (var name in dateFrames) {
                var dateFrame = dateFrames[name];
                this.dateFrames[name] = new DateFrame(dateFrame);
            }
        }
    }, {
        key: 'removeDateFrames',
        value: function removeDateFrames(dateFrames) {
            for (var name in dateFrames) {
                delete this.dateFrames[name];
            }
        }
    }, {
        key: 'clearDateFrames',
        value: function clearDateFrames() {
            this.dateFrames = {};
        }
    }, {
        key: 'filterDateFrames',
        value: function filterDateFrames(inputDateFrames, date) {
            var dateFrames = [];
            for (var name in inputDateFrames) {
                var dateFrame = inputDateFrames[name];
                if (dateFrame.dateMatch(date)) {
                    dateFrames.push(dateFrame);
                }
            }
            if (dateFrames.length === 0) {
                for (var _name in inputDateFrames) {
                    var _dateFrame = inputDateFrames[_name];
                    if (_dateFrame.default) {
                        dateFrames.push(_dateFrame);
                    }
                }
            }
            return dateFrames;
        }
    }, {
        key: 'getTimeFrames',
        value: function getTimeFrames(date) {
            var timeFrames = [];
            var dateFrames = this.filterDateFrames(this.dateFrames, date);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(dateFrames), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var dateFrame = _step.value;

                    if (dateFrame !== undefined) {
                        var targets = dateFrame.targets;
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = (0, _getIterator3.default)(targets), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var target = _step2.value;

                                var timeFrameMapping = this.timeFrameMappings[target];
                                if (timeFrameMapping !== undefined) {
                                    var names = timeFrameMapping.getTimeFrames(date);
                                    var _iteratorNormalCompletion3 = true;
                                    var _didIteratorError3 = false;
                                    var _iteratorError3 = undefined;

                                    try {
                                        for (var _iterator3 = (0, _getIterator3.default)(names), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                            var _name3 = _step3.value;

                                            var _timeFrame2 = this.timeFrames[_name3];
                                            timeFrames.push(_timeFrame2);
                                        }
                                    } catch (err) {
                                        _didIteratorError3 = true;
                                        _iteratorError3 = err;
                                    } finally {
                                        try {
                                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                                _iterator3.return();
                                            }
                                        } finally {
                                            if (_didIteratorError3) {
                                                throw _iteratorError3;
                                            }
                                        }
                                    }
                                } else {
                                    var _timeFrame3 = this.timeFrames[target];
                                    if (_timeFrame3 !== undefined) {
                                        timeFrames.push(_timeFrame3);
                                    }
                                }
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var dateYear = date.year();
            var dateMonth = date.month();
            var dateDate = date.date();
            var validatedTimeFrames = [];
            if (timeFrames.length === 0) {
                for (var name in this.timeFrames) {
                    var timeFrame = this.timeFrames[name];
                    if (timeFrame.default) {
                        timeFrames.push(timeFrame);
                    }
                }
            }
            for (var _name2 in timeFrames) {
                var _timeFrame = timeFrames[_name2];
                var cTimeFrame = _timeFrame.clone();
                if (cTimeFrame.start !== undefined) {
                    cTimeFrame.start.year(dateYear);
                    cTimeFrame.start.month(dateMonth);
                    cTimeFrame.start.date(dateDate);
                }
                if (cTimeFrame.end !== undefined) {
                    cTimeFrame.end.year(dateYear);
                    cTimeFrame.end.month(dateMonth);
                    cTimeFrame.end.date(dateDate);
                    if ((0, _moment2.default)(cTimeFrame.end).startOf('day') === cTimeFrame.end) {
                        cTimeFrame.end.add(1, 'day');
                    }
                }
                validatedTimeFrames.push(cTimeFrame);
            }
            return validatedTimeFrames;
        }
    }, {
        key: 'solve',
        value: function solve(timeFrames, startDate, endDate) {
            var color = void 0;
            var classes = void 0;
            var minDate = void 0;
            var maxDate = void 0;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = (0, _getIterator3.default)(timeFrames), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var timeFrame = _step4.value;

                    if (minDate === undefined || minDate > timeFrame.start) {
                        minDate = timeFrame.start;
                    }
                    if (maxDate === undefined || maxDate < timeFrame.end) {
                        maxDate = timeFrame.end;
                    }
                    if (color === undefined && timeFrame.color) {
                        color = timeFrame.color;
                    }
                    if (timeFrame.classes !== undefined) {
                        if (classes === undefined) {
                            classes = [];
                        }
                        classes = classes.concat(timeFrame.classes);
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            if (startDate === undefined) {
                startDate = minDate;
            }
            if (endDate === undefined) {
                endDate = maxDate;
            }
            var solvedTimeFrames = [new TimeFrame({ start: startDate, end: endDate, internal: true })];
            timeFrames = GanttCalendar.$filter('filter')(timeFrames, function (timeFrame) {
                return (timeFrame.start === undefined || timeFrame.start < endDate) && (timeFrame.end === undefined || timeFrame.end > startDate);
            });
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = (0, _getIterator3.default)(timeFrames), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var _timeFrame4 = _step5.value;

                    if (!_timeFrame4.start) {
                        _timeFrame4.start = startDate;
                    }
                    if (!_timeFrame4.end) {
                        _timeFrame4.end = endDate;
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            var orderedTimeFrames = GanttCalendar.$filter('orderBy')(timeFrames, function (timeFrame) {
                return -timeFrame.getDuration();
            });
            var k = void 0;
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = (0, _getIterator3.default)(orderedTimeFrames), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var oTimeFrame = _step6.value;

                    var tmpSolvedTimeFrames = solvedTimeFrames.slice();
                    k = 0;
                    var dispatched = false;
                    var treated = false;
                    var _iteratorNormalCompletion7 = true;
                    var _didIteratorError7 = false;
                    var _iteratorError7 = undefined;

                    try {
                        for (var _iterator7 = (0, _getIterator3.default)(solvedTimeFrames), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                            var sTimeFrame = _step7.value;

                            if (!treated) {
                                if (!oTimeFrame.end && !oTimeFrame.start) {
                                    tmpSolvedTimeFrames.splice(k, 0, oTimeFrame);
                                    treated = true;
                                    dispatched = false;
                                } else if (oTimeFrame.end > sTimeFrame.start && oTimeFrame.start < sTimeFrame.end) {
                                    var newSolvedTimeFrame = sTimeFrame.clone();
                                    sTimeFrame.end = (0, _moment2.default)(oTimeFrame.start);
                                    newSolvedTimeFrame.start = (0, _moment2.default)(oTimeFrame.end);
                                    tmpSolvedTimeFrames.splice(k + 1, 0, oTimeFrame.clone(), newSolvedTimeFrame);
                                    treated = true;
                                    dispatched = false;
                                } else if (!dispatched && oTimeFrame.start < sTimeFrame.end) {
                                    sTimeFrame.end = (0, _moment2.default)(oTimeFrame.start);
                                    tmpSolvedTimeFrames.splice(k + 1, 0, oTimeFrame.clone());
                                    dispatched = true;
                                } else if (dispatched && oTimeFrame.end > sTimeFrame.start) {
                                    sTimeFrame.start = (0, _moment2.default)(oTimeFrame.end);
                                    dispatched = false;
                                    treated = true;
                                }
                                k++;
                            }
                        }
                    } catch (err) {
                        _didIteratorError7 = true;
                        _iteratorError7 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                _iterator7.return();
                            }
                        } finally {
                            if (_didIteratorError7) {
                                throw _iteratorError7;
                            }
                        }
                    }

                    solvedTimeFrames = tmpSolvedTimeFrames;
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            solvedTimeFrames = GanttCalendar.$filter('filter')(solvedTimeFrames, function (timeFrame) {
                return !timeFrame.internal && (timeFrame.start === undefined || timeFrame.start < endDate) && (timeFrame.end === undefined || timeFrame.end > startDate);
            });
            return solvedTimeFrames;
        }
    }]);
    return GanttCalendar;
}();

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttCurrentDateManager = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = function () {
    'ngInject';

    return GanttCurrentDateManager;
};

var _moment = __webpack_require__(3);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttCurrentDateManager = exports.GanttCurrentDateManager = function () {
    function GanttCurrentDateManager(gantt) {
        var _this = this;

        (0, _classCallCheck3.default)(this, GanttCurrentDateManager);

        this.gantt = gantt;
        this.date = undefined;
        this.position = undefined;
        this.currentDateColumn = undefined;
        this.gantt.$scope.simplifyMoment = function (d) {
            return _moment2.default.isMoment(d) ? d.unix() : d;
        };
        this.gantt.$scope.$watchGroup(['currentDate', 'simplifyMoment(currentDateValue)'], function (newValues, oldValues) {
            if (newValues !== oldValues) {
                _this.setCurrentDate(_this.gantt.options.value('currentDateValue'));
            }
        });
    }

    (0, _createClass3.default)(GanttCurrentDateManager, [{
        key: 'setCurrentDate',
        value: function setCurrentDate(currentDate) {
            this.date = currentDate;
            var oldColumn = this.currentDateColumn;
            var newColumn = void 0;
            if (this.date !== undefined && this.gantt.options.value('currentDate') === 'column') {
                newColumn = this.gantt.columnsManager.getColumnByDate(this.date, true);
            }
            this.currentDateColumn = newColumn;
            if (oldColumn !== newColumn) {
                if (oldColumn !== undefined) {
                    oldColumn.currentDate = false;
                    oldColumn.updateView();
                }
                if (newColumn !== undefined) {
                    newColumn.currentDate = true;
                    newColumn.updateView();
                }
            }
            this.position = this.gantt.getPositionByDate(this.date, true);
        }
    }]);
    return GanttCurrentDateManager;
}();

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttColumnHeader = undefined;

var _getPrototypeOf = __webpack_require__(127);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(132);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(131);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = function () {
    'ngInject';

    return GanttColumnHeader;
};

var _column = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttColumnHeader = exports.GanttColumnHeader = function (_GanttColumn) {
    (0, _inherits3.default)(GanttColumnHeader, _GanttColumn);

    function GanttColumnHeader(date, endDate, viewScaleUnit, left, width, labelFormat, name) {
        (0, _classCallCheck3.default)(this, GanttColumnHeader);

        var _this = (0, _possibleConstructorReturn3.default)(this, (GanttColumnHeader.__proto__ || (0, _getPrototypeOf2.default)(GanttColumnHeader)).call(this, date, endDate, left, width));

        _this.name = name;
        _this.unit = viewScaleUnit;
        _this.label = typeof labelFormat === 'function' ? labelFormat(_this) : date.format(labelFormat);
        return _this;
    }

    return GanttColumnHeader;
}(_column.GanttColumn);

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttColumnsManager = undefined;

var _getIterator2 = __webpack_require__(4);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = ["GanttColumnGenerator", "GanttColumnBuilder", "GanttHeadersGenerator", "$filter", "ganttLayout", "ganttBinarySearch", function (GanttColumnGenerator, GanttColumnBuilder, GanttHeadersGenerator, $filter, ganttLayout, ganttBinarySearch) {
    'ngInject';

    GanttColumnsManager.GanttColumnGenerator = GanttColumnGenerator;
    GanttColumnsManager.GanttHeadersGenerator = GanttHeadersGenerator;
    GanttColumnsManager.ganttBinarySearch = ganttBinarySearch;
    GanttColumnsManager.GanttColumnBuilder = GanttColumnBuilder;
    GanttColumnsManager.ganttLayout = ganttLayout;
    GanttColumnsManager.$filter = $filter;
    return GanttColumnsManager;
}];

var _moment = __webpack_require__(3);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttColumnsManager = exports.GanttColumnsManager = function () {
    function GanttColumnsManager(gantt) {
        var _this = this;

        (0, _classCallCheck3.default)(this, GanttColumnsManager);

        this.defaultHeadersFormats = {
            year: 'YYYY',
            quarter: '[Q]Q YYYY',
            month: 'MMMM YYYY',
            week: 'w',
            day: 'D',
            hour: 'H',
            minute: 'H:mm',
            second: 'H:mm:ss',
            millisecond: 'H:mm:ss:SSS'
        };
        this.defaultDayHeadersFormats = { day: 'LL', hour: 'H', minute: 'H:mm', second: 'H:mm:ss', millisecond: 'H:mm:ss:SSS' };
        this.defaultYearHeadersFormats = { 'year': 'YYYY', 'quarter': '[Q]Q', month: 'MMMM' };
        this.gantt = gantt;
        this.from = undefined;
        this.to = undefined;
        this.columns = [];
        this.visibleColumns = [];
        this.previousColumns = [];
        this.nextColumns = [];
        this.headers = [];
        this.visibleHeaders = [];
        this.scrollAnchor = undefined;
        this.columnBuilder = new GanttColumnsManager.GanttColumnBuilder(this);

        this.gantt.$scope.$watchGroup(['viewScale', 'columnWidth', 'timeFramesWorkingMode', 'timeFramesNonWorkingMode', 'fromDate', 'toDate', 'autoExpand', 'taskOutOfRange'], function (newValues, oldValues) {
            if (newValues !== oldValues && _this.gantt.rendered) {
                _this.generateColumns();
            }
        });
        this.gantt.$scope.$watchCollection('headers', function (newValues, oldValues) {
            if (newValues !== oldValues && _this.gantt.rendered) {
                _this.generateColumns();
            }
        });
        this.gantt.$scope.$watchCollection('headersFormats', function (newValues, oldValues) {
            if (newValues !== oldValues && _this.gantt.rendered) {
                _this.generateColumns();
            }
        });
        this.gantt.$scope.$watchGroup(['ganttElementWidth', 'showSide', 'sideWidth', 'maxHeight', 'daily'], function (newValues, oldValues) {
            if (newValues !== oldValues && _this.gantt.rendered) {
                _this.updateColumnsMeta();
            }
        });
        this.gantt.api.data.on.load(this.gantt.$scope, function () {
            if ((_this.from === undefined || _this.to === undefined || _this.from > _this.gantt.rowsManager.getDefaultFrom() || _this.to < _this.gantt.rowsManager.getDefaultTo()) && _this.gantt.rendered) {
                _this.generateColumns();
            }
            _this.gantt.rowsManager.sortRows();
        });
        this.gantt.api.data.on.remove(this.gantt.$scope, function () {
            _this.gantt.rowsManager.sortRows();
        });
        this.gantt.api.registerMethod('columns', 'clear', this.clearColumns, this);
        this.gantt.api.registerMethod('columns', 'generate', this.generateColumns, this);
        this.gantt.api.registerMethod('columns', 'refresh', this.updateColumnsMeta, this);
        this.gantt.api.registerMethod('columns', 'getColumnsWidth', this.getColumnsWidth, this);
        this.gantt.api.registerMethod('columns', 'getColumnsWidthToFit', this.getColumnsWidthToFit, this);
        this.gantt.api.registerMethod('columns', 'getDateRange', this.getDateRange, this);
        this.gantt.api.registerEvent('columns', 'clear');
        this.gantt.api.registerEvent('columns', 'generate');
        this.gantt.api.registerEvent('columns', 'refresh');
    }

    (0, _createClass3.default)(GanttColumnsManager, [{
        key: 'setScrollAnchor',
        value: function setScrollAnchor() {
            if (this.gantt.scroll.$element && this.columns.length > 0) {
                var el = this.gantt.scroll.$element[0];
                var center = el.scrollLeft + el.offsetWidth / 2;
                this.scrollAnchor = this.gantt.getDateByPosition(center);
            }
        }
    }, {
        key: 'scrollToScrollAnchor',
        value: function scrollToScrollAnchor() {
            var _this2 = this;

            if (this.columns.length > 0 && this.scrollAnchor !== undefined) {
                this.gantt.$scope.$$postDigest(function () {
                    _this2.gantt.api.scroll.toDate(_this2.scrollAnchor);
                });
            }
        }
    }, {
        key: 'clearColumns',
        value: function clearColumns() {
            this.setScrollAnchor();
            this.from = undefined;
            this.to = undefined;
            this.columns = [];
            this.visibleColumns = [];
            this.previousColumns = [];
            this.nextColumns = [];
            this.headers = [];
            this.visibleHeaders = [];
            this.gantt.api.columns.raise.clear();
        }
    }, {
        key: 'generateColumns',
        value: function generateColumns(from, to) {
            if (!from) {
                from = this.gantt.options.value('fromDate');
            }
            if (!to) {
                to = this.gantt.options.value('toDate');
            }
            if (!from || _moment2.default.isMoment(from) && !from.isValid()) {
                from = this.gantt.rowsManager.getDefaultFrom();
                if (!from) {
                    return false;
                }
            }
            if (!to || _moment2.default.isMoment(to) && !to.isValid()) {
                to = this.gantt.rowsManager.getDefaultTo();
                if (!to) {
                    return false;
                }
            }
            if (from !== undefined && !_moment2.default.isMoment(from)) {
                from = (0, _moment2.default)(from);
            }
            if (to !== undefined && !_moment2.default.isMoment(to)) {
                to = (0, _moment2.default)(to);
            }
            if (this.gantt.options.value('taskOutOfRange') === 'expand') {
                from = this.gantt.rowsManager.getExpandedFrom(from);
                to = this.gantt.rowsManager.getExpandedTo(to);
            }
            this.setScrollAnchor();
            this.from = from;
            this.to = to;
            this.previousColumns = [];
            this.nextColumns = [];
            this.columns = GanttColumnsManager.GanttColumnGenerator.generate(this.columnBuilder, this.from, this.to, this.gantt.options.value('viewScale'), this.getColumnsWidth());
            this.headers = GanttColumnsManager.GanttHeadersGenerator.generate(this);
            this.updateColumnsMeta();
            this.scrollToScrollAnchor();
            this.gantt.api.columns.raise.generate(this.columns, this.headers);
        }
    }, {
        key: 'updateColumnsMeta',
        value: function updateColumnsMeta() {
            this.gantt.isRefreshingColumns = true;
            var lastColumn = this.getLastColumn();
            this.gantt.originalWidth = lastColumn !== undefined ? lastColumn.originalSize.left + lastColumn.originalSize.width : 0;
            var columnsWidthChanged = this.updateColumnsWidths(this.columns, this.headers, this.previousColumns, this.nextColumns);
            this.gantt.width = lastColumn !== undefined ? lastColumn.left + lastColumn.width : 0;
            var showSide = this.gantt.options.value('showSide');
            var sideShown = this.gantt.side.isShown();
            var sideVisibilityChanged = showSide !== sideShown;
            if (sideVisibilityChanged && !showSide) {
                this.gantt.side.show(false);
            }
            this.gantt.rowsManager.updateTasksPosAndSize();
            this.gantt.timespansManager.updateTimespansPosAndSize();
            this.updateVisibleColumns(columnsWidthChanged);
            this.gantt.rowsManager.updateVisibleObjects();
            var currentDateValue = this.gantt.options.value('currentDateValue');
            this.gantt.currentDateManager.setCurrentDate(currentDateValue);
            if (sideVisibilityChanged && showSide) {
                this.gantt.side.show(true);
            }
            this.gantt.isRefreshingColumns = false;
            this.gantt.api.columns.raise.refresh(this.columns, this.headers);
        }
    }, {
        key: 'getLastColumn',
        value: function getLastColumn() {
            var extended = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var columns = this.columns;
            if (extended) {
                columns = this.nextColumns;
            }
            if (columns && columns.length > 0) {
                return columns[columns.length - 1];
            } else {
                return undefined;
            }
        }
    }, {
        key: 'getFirstColumn',
        value: function getFirstColumn() {
            var extended = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var columns = this.columns;
            if (extended) {
                columns = this.previousColumns;
            }
            if (columns && columns.length > 0) {
                return columns[0];
            } else {
                return undefined;
            }
        }
    }, {
        key: 'getColumnByDate',
        value: function getColumnByDate(date, disableExpand) {
            if (!disableExpand) {
                this.expandExtendedColumnsForDate(date);
            }
            var extendedColumns = this.previousColumns.concat(this.columns, this.nextColumns);
            var columns = GanttColumnsManager.ganttBinarySearch.get(extendedColumns, date, function (c) {
                return c.date;
            }, true);
            return columns[0] === undefined ? columns[1] : columns[0];
        }
    }, {
        key: 'getColumnByPosition',
        value: function getColumnByPosition(x, disableExpand) {
            if (!disableExpand) {
                this.expandExtendedColumnsForPosition(x);
            }
            var extendedColumns = this.previousColumns.concat(this.columns, this.nextColumns);
            var columns = GanttColumnsManager.ganttBinarySearch.get(extendedColumns, x, function (c) {
                return c.left;
            }, true);
            return columns[0] === undefined ? columns[1] : columns[0];
        }
    }, {
        key: 'updateColumnsWidths',
        value: function updateColumnsWidths(columns, headers, previousColumns, nextColumns) {
            var columnWidth = this.gantt.options.value('columnWidth');
            var expandToFit = this.gantt.options.value('expandToFit');
            var shrinkToFit = this.gantt.options.value('shrinkToFit');
            if (columnWidth === undefined || expandToFit || shrinkToFit) {
                var newWidth = this.gantt.getBodyAvailableWidth();
                var lastColumn = this.gantt.columnsManager.getLastColumn(false);
                if (lastColumn !== undefined) {
                    var currentWidth = lastColumn.originalSize.left + lastColumn.originalSize.width;
                    if (expandToFit && currentWidth < newWidth || shrinkToFit && currentWidth > newWidth || columnWidth === undefined) {
                        var widthFactor = newWidth / currentWidth;
                        GanttColumnsManager.ganttLayout.setColumnsWidthFactor(columns, widthFactor);
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = (0, _getIterator3.default)(headers), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var header = _step.value;

                                GanttColumnsManager.ganttLayout.setColumnsWidthFactor(header, widthFactor);
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }

                        previousColumns.splice(0, this.previousColumns.length);
                        nextColumns.splice(0, this.nextColumns.length);
                        return true;
                    }
                }
            }
            return false;
        }
    }, {
        key: 'getColumnsWidth',
        value: function getColumnsWidth() {
            var columnWidth = this.gantt.options.value('columnWidth');
            if (columnWidth === undefined) {
                if (!this.gantt.width || this.gantt.width <= 0) {
                    columnWidth = 20;
                } else {
                    columnWidth = this.gantt.width / this.columns.length;
                }
            }
            return columnWidth;
        }
    }, {
        key: 'getColumnsWidthToFit',
        value: function getColumnsWidthToFit() {
            return this.gantt.getBodyAvailableWidth() / this.columns.length;
        }
    }, {
        key: 'expandExtendedColumnsForPosition',
        value: function expandExtendedColumnsForPosition(x) {
            var viewScale = void 0;
            if (x < 0) {
                var firstColumn = this.getFirstColumn();
                var from = firstColumn.date;
                var firstExtendedColumn = this.getFirstColumn(true);
                if (!firstExtendedColumn || firstExtendedColumn.left > x) {
                    viewScale = this.gantt.options.value('viewScale');
                    this.previousColumns = GanttColumnsManager.GanttColumnGenerator.generate(this.columnBuilder, from, undefined, viewScale, this.getColumnsWidth(), -x, 0, true);
                }
                return true;
            } else if (x > this.gantt.width) {
                var lastColumn = this.getLastColumn();
                var endDate = lastColumn.getDateByPosition(lastColumn.width);
                var lastExtendedColumn = this.getLastColumn(true);
                if (!lastExtendedColumn || lastExtendedColumn.left + lastExtendedColumn.width < x) {
                    viewScale = this.gantt.options.value('viewScale');
                    this.nextColumns = GanttColumnsManager.GanttColumnGenerator.generate(this.columnBuilder, endDate, undefined, viewScale, this.getColumnsWidth(), x - this.gantt.width, this.gantt.width, false);
                }
                return true;
            }
            return false;
        }
    }, {
        key: 'expandExtendedColumnsForDate',
        value: function expandExtendedColumnsForDate(date) {
            var firstColumn = this.getFirstColumn();
            var from = void 0;
            if (firstColumn) {
                from = firstColumn.date;
            }
            var lastColumn = this.getLastColumn();
            var endDate = void 0;
            if (lastColumn) {
                endDate = lastColumn.endDate;
            }
            var viewScale = void 0;
            if (from && date < from) {
                var firstExtendedColumn = this.getFirstColumn(true);
                if (!firstExtendedColumn || firstExtendedColumn.date > date) {
                    viewScale = this.gantt.options.value('viewScale');
                    this.previousColumns = GanttColumnsManager.GanttColumnGenerator.generate(this.columnBuilder, from, date, viewScale, this.getColumnsWidth(), undefined, 0, true);
                }
                return true;
            } else if (endDate && date >= endDate) {
                var lastExtendedColumn = this.getLastColumn(true);
                if (!lastExtendedColumn || lastExtendedColumn.date < endDate) {
                    viewScale = this.gantt.options.value('viewScale');
                    this.nextColumns = GanttColumnsManager.GanttColumnGenerator.generate(this.columnBuilder, endDate, date, viewScale, this.getColumnsWidth(), undefined, this.gantt.width, false);
                }
                return true;
            }
            return false;
        }
    }, {
        key: 'getActiveHeadersCount',
        value: function getActiveHeadersCount() {
            return this.headers.length;
        }
    }, {
        key: 'updateVisibleColumns',
        value: function updateVisibleColumns(includeViews) {
            var limitThreshold = this.gantt.options.value('columnLimitThreshold');
            var i = void 0;
            if (limitThreshold === undefined || limitThreshold > 0 && this.columns.length >= limitThreshold) {
                this.visibleColumns = GanttColumnsManager.$filter('ganttColumnLimit')(this.columns, this.gantt);
                this.visibleHeaders = [];
                for (i = 0; i < this.headers.length; i++) {
                    this.visibleHeaders.push.apply(this.visibleHeaders, GanttColumnsManager.$filter('ganttColumnLimit')(this.headers[i], this.gantt));
                }
            } else {
                this.visibleColumns = this.columns;
                this.visibleHeaders = this.headers;
            }
            if (includeViews) {
                for (i = 0; i < this.visibleColumns.length; i++) {
                    this.visibleColumns[i].updateView();
                }
                for (i = 0; i < this.visibleHeaders.length; i++) {
                    var headerRow = this.visibleHeaders[i];
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = (0, _getIterator3.default)(headerRow), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var headerRowItem = _step2.value;

                            headerRowItem.updateView();
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            }
            var currentDateValue = this.gantt.options.value('currentDateValue');
            this.gantt.currentDateManager.setCurrentDate(currentDateValue);
        }
    }, {
        key: 'getHeaderFormat',
        value: function getHeaderFormat(unit) {
            var format = void 0;
            var headersFormats = this.gantt.options.value('headersFormats');
            if (headersFormats !== undefined) {
                format = headersFormats[unit];
            }
            if (format === undefined) {
                var viewScale = this.gantt.options.value('viewScale');
                viewScale = viewScale.trim();
                if (viewScale.charAt(viewScale.length - 1) === 's') {
                    viewScale = viewScale.substring(0, viewScale.length - 1);
                }
                var viewScaleUnit = void 0;
                var splittedViewScale = void 0;
                if (viewScale) {
                    splittedViewScale = viewScale.split(' ');
                }
                if (splittedViewScale && splittedViewScale.length > 1) {
                    viewScaleUnit = splittedViewScale[splittedViewScale.length - 1];
                } else {
                    viewScaleUnit = viewScale;
                }
                if (['millisecond', 'second', 'minute', 'hour'].indexOf(viewScaleUnit) > -1) {
                    format = this.defaultDayHeadersFormats[unit];
                } else if (['month', 'quarter', 'year'].indexOf(viewScaleUnit) > -1) {
                    format = this.defaultYearHeadersFormats[unit];
                }
                if (format === undefined) {
                    format = this.defaultHeadersFormats[unit];
                }
            }
            return format;
        }
    }, {
        key: 'getHeaderScale',
        value: function getHeaderScale(header) {
            var scale = void 0;
            var headersScales = this.gantt.options.value('headersScales');
            if (headersScales !== undefined) {
                scale = headersScales[header];
            }
            if (scale === undefined) {
                scale = header;
            }
            if (['millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'quarter', 'year'].indexOf(scale) === -1) {
                scale = 'day';
            }
            return scale;
        }
    }, {
        key: 'getDateRange',
        value: function getDateRange(visibleOnly) {
            var firstColumn = void 0;
            var lastColumn = void 0;
            if (visibleOnly) {
                if (this.visibleColumns && this.visibleColumns.length > 0) {
                    firstColumn = this.visibleColumns[0];
                    lastColumn = this.visibleColumns[this.visibleColumns.length - 1];
                }
            } else {
                firstColumn = this.getFirstColumn();
                lastColumn = this.getLastColumn();
            }
            return firstColumn && lastColumn ? [firstColumn.date, lastColumn.endDate] : undefined;
        }
    }]);
    return GanttColumnsManager;
}();

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttObjectModel = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = ["ganttUtils", function (ganttUtils) {
    'ngInject';

    GanttObjectModel.ganttUtils = ganttUtils;
    return GanttObjectModel;
}];

var _moment = __webpack_require__(3);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttObjectModel = exports.GanttObjectModel = function () {
    function GanttObjectModel(api) {
        (0, _classCallCheck3.default)(this, GanttObjectModel);

        this.api = api;
        this.api.registerEvent('tasks', 'clean');
        this.api.registerEvent('rows', 'clean');
        this.api.registerEvent('timespans', 'clean');
    }

    (0, _createClass3.default)(GanttObjectModel, [{
        key: 'cleanTask',
        value: function cleanTask(model) {
            if (model.id === undefined) {
                model.id = GanttObjectModel.ganttUtils.randomUuid();
            }
            if (model.from !== undefined && !_moment2.default.isMoment(model.from)) {
                model.from = (0, _moment2.default)(model.from);
            }
            if (model.to !== undefined && !_moment2.default.isMoment(model.to)) {
                model.to = (0, _moment2.default)(model.to);
            }
            this.api.tasks.raise.clean(model);
        }
    }, {
        key: 'cleanRow',
        value: function cleanRow(model) {
            if (model.id === undefined) {
                model.id = GanttObjectModel.ganttUtils.randomUuid();
            }
            if (model.from !== undefined && !_moment2.default.isMoment(model.from)) {
                model.from = (0, _moment2.default)(model.from);
            }
            if (model.to !== undefined && !_moment2.default.isMoment(model.to)) {
                model.to = (0, _moment2.default)(model.to);
            }
            this.api.rows.raise.clean(model);
        }
    }, {
        key: 'cleanTimespan',
        value: function cleanTimespan(model) {
            if (model.id === undefined) {
                model.id = GanttObjectModel.ganttUtils.randomUuid();
            }
            if (model.from !== undefined && !_moment2.default.isMoment(model.from)) {
                model.from = (0, _moment2.default)(model.from);
            }
            if (model.to !== undefined && !_moment2.default.isMoment(model.to)) {
                model.to = (0, _moment2.default)(model.to);
            }
            this.api.timespans.raise.clean(model);
        }
    }]);
    return GanttObjectModel;
}();

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttRowsManager = undefined;

var _typeof2 = __webpack_require__(5);

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = __webpack_require__(4);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = ["GanttRow", "ganttArrays", "$filter", "$timeout", function (GanttRow, ganttArrays, $filter, $timeout) {
    'ngInject';

    GanttRowsManager.GanttRow = GanttRow;
    GanttRowsManager.$filter = $filter;
    GanttRowsManager.$timeout = $timeout;
    GanttRowsManager.ganttArrays = ganttArrays;
    return GanttRowsManager;
}];

var _angular = __webpack_require__(2);

var _angular2 = _interopRequireDefault(_angular);

var _moment = __webpack_require__(3);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttRowsManager = exports.GanttRowsManager = function () {
    function GanttRowsManager(gantt) {
        var _this = this;

        (0, _classCallCheck3.default)(this, GanttRowsManager);

        this.rowsMap = {};
        this.rows = [];
        this.sortedRows = [];
        this.filteredRows = [];
        this.customFilteredRows = [];
        this.visibleRows = [];
        this.rowsTaskWatchers = [];
        this.customRowSorters = [];
        this.customRowFilters = [];
        this.gantt = gantt;
        this._defaultFilterImpl = function (sortedRows, filterRow, filterRowComparator) {
            return GanttRowsManager.$filter('filter')(sortedRows, filterRow, filterRowComparator);
        };
        this.filterImpl = this._defaultFilterImpl;
        this.customRowSorters = [];
        this.customRowFilters = [];
        this.gantt.$scope.$watchGroup(['filterTask', 'filterTaskComparator'], function (newValues, oldValues) {
            if (newValues !== oldValues) {
                _this.updateVisibleTasks();
            }
        });
        this.gantt.$scope.$watchGroup(['filterRow', 'filterRowComparator'], function (newValues, oldValues) {
            if (newValues !== oldValues) {
                _this.updateVisibleRows();
            }
        });
        this.gantt.$scope.$watch('sortMode', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                _this.sortRows();
            }
        });

        var _oldVScrollbarVisible = this.gantt.scroll.isVScrollbarVisible();
        this.gantt.$scope.$watchGroup(['maxHeight', 'gantt.rowsManager.visibleRows.length'], function (newValue, oldValue) {
            if (newValue !== oldValue) {
                GanttRowsManager.$timeout(function () {
                    var newVScrollbarVisible = _this.gantt.scroll.isVScrollbarVisible();
                    if (newVScrollbarVisible !== _oldVScrollbarVisible) {
                        _oldVScrollbarVisible = newVScrollbarVisible;
                        _this.gantt.columnsManager.updateColumnsMeta();
                    }
                });
            }
        });
        this.gantt.api.registerMethod('rows', 'sort', GanttRowsManager.prototype.sortRows, this);
        this.gantt.api.registerMethod('rows', 'applySort', GanttRowsManager.prototype.applySort, this);
        this.gantt.api.registerMethod('rows', 'refresh', GanttRowsManager.prototype.updateVisibleObjects, this);
        this.gantt.api.registerMethod('rows', 'removeRowSorter', GanttRowsManager.prototype.removeCustomRowSorter, this);
        this.gantt.api.registerMethod('rows', 'addRowSorter', GanttRowsManager.prototype.addCustomRowSorter, this);
        this.gantt.api.registerMethod('rows', 'removeRowFilter', GanttRowsManager.prototype.removeCustomRowFilter, this);
        this.gantt.api.registerMethod('rows', 'addRowFilter', GanttRowsManager.prototype.addCustomRowFilter, this);
        this.gantt.api.registerMethod('rows', 'setFilterImpl', GanttRowsManager.prototype.setFilterImpl, this);
        this.gantt.api.registerEvent('tasks', 'add');
        this.gantt.api.registerEvent('tasks', 'change');
        this.gantt.api.registerEvent('tasks', 'viewChange');
        this.gantt.api.registerEvent('tasks', 'beforeRowChange');
        this.gantt.api.registerEvent('tasks', 'beforeViewRowChange');
        this.gantt.api.registerEvent('tasks', 'rowChange');
        this.gantt.api.registerEvent('tasks', 'viewRowChange');
        this.gantt.api.registerEvent('tasks', 'remove');
        this.gantt.api.registerEvent('tasks', 'filter');
        this.gantt.api.registerEvent('tasks', 'displayed');
        this.gantt.api.registerEvent('rows', 'add');
        this.gantt.api.registerEvent('rows', 'change');
        this.gantt.api.registerEvent('rows', 'remove');
        this.gantt.api.registerEvent('rows', 'move');
        this.gantt.api.registerEvent('rows', 'displayed');
        this.gantt.api.registerEvent('rows', 'filter');
        this.updateVisibleObjects();
    }

    (0, _createClass3.default)(GanttRowsManager, [{
        key: 'resetNonModelLists',
        value: function resetNonModelLists() {
            this.rows = [];
            this.sortedRows = [];
            this.filteredRows = [];
            this.customFilteredRows = [];
            this.visibleRows = [];
        }
    }, {
        key: 'addRow',
        value: function addRow(rowModel, modelOrderChanged) {
            var row = void 0;
            var i = void 0;
            var l = void 0;
            var isUpdate = false;
            this.gantt.objectModel.cleanRow(rowModel);
            if (rowModel.id in this.rowsMap) {
                row = this.rowsMap[rowModel.id];
                if (modelOrderChanged) {
                    this.rows.push(row);
                    this.sortedRows.push(row);
                    this.filteredRows.push(row);
                    this.customFilteredRows.push(row);
                    this.visibleRows.push(row);
                }
                if (row.model === rowModel) {
                    return;
                }
                var toRemoveIds = GanttRowsManager.ganttArrays.getRemovedIds(rowModel.tasks, row.model.tasks);
                for (i = 0, l = toRemoveIds.length; i < l; i++) {
                    var toRemoveId = toRemoveIds[i];
                    row.removeTask(toRemoveId);
                }
                row.model = rowModel;
                isUpdate = true;
            } else {
                row = new GanttRowsManager.GanttRow(this, rowModel);
                this.rowsMap[rowModel.id] = row;
                this.rows.push(row);
                this.sortedRows.push(row);
                this.filteredRows.push(row);
                this.customFilteredRows.push(row);
                this.visibleRows.push(row);
            }
            if (rowModel.tasks !== undefined && rowModel.tasks.length > 0) {
                for (i = 0, l = rowModel.tasks.length; i < l; i++) {
                    var taskModel = rowModel.tasks[i];
                    row.addTask(taskModel);
                }
                row.updateVisibleTasks();
            }
            if (isUpdate) {
                this.gantt.api.rows.raise.change(row);
            } else {
                this.gantt.api.rows.raise.add(row);
            }
            if (!isUpdate) {
                var watcher = this.gantt.$scope.$watchCollection(function () {
                    return rowModel.tasks;
                }, function (newTasks, oldTasks) {
                    if (newTasks !== oldTasks) {
                        var _i = void 0;
                        var _l = void 0;
                        var _toRemoveIds = GanttRowsManager.ganttArrays.getRemovedIds(newTasks, oldTasks);
                        for (_i = 0, _l = _toRemoveIds.length; _i < _l; _i++) {
                            var toRemove = _toRemoveIds[_i];
                            row.removeTask(toRemove);
                        }
                        if (newTasks !== undefined) {
                            for (_i = 0, _l = newTasks.length; _i < _l; _i++) {
                                var toAdd = newTasks[_i];
                                row.addTask(toAdd);
                            }
                            row.updateVisibleTasks();
                        }
                    }
                });
                this.rowsTaskWatchers.push(watcher);
            }
            return isUpdate;
        }
    }, {
        key: 'removeRow',
        value: function removeRow(rowId) {
            if (rowId in this.rowsMap) {
                delete this.rowsMap[rowId];
                var removedRow = void 0;
                var indexOf = GanttRowsManager.ganttArrays.indexOfId(this.rows, rowId, ['model', 'id']);
                if (indexOf > -1) {
                    removedRow = this.rows.splice(indexOf, 1)[0];
                    var unregisterFunction = this.rowsTaskWatchers.splice(indexOf, 1)[0];
                    if (unregisterFunction) {
                        unregisterFunction();
                    }
                }
                GanttRowsManager.ganttArrays.removeId(this.sortedRows, rowId, ['model', 'id']);
                GanttRowsManager.ganttArrays.removeId(this.filteredRows, rowId, ['model', 'id']);
                GanttRowsManager.ganttArrays.removeId(this.customFilteredRows, rowId, ['model', 'id']);
                GanttRowsManager.ganttArrays.removeId(this.visibleRows, rowId, ['model', 'id']);
                this.gantt.api.rows.raise.remove(removedRow);
                return removedRow;
            }
            return undefined;
        }
    }, {
        key: 'removeAll',
        value: function removeAll() {
            this.rowsMap = {};
            this.rows = [];
            this.sortedRows = [];
            this.filteredRows = [];
            this.customFilteredRows = [];
            this.visibleRows = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(this.rowsTaskWatchers), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var unregisterFunction = _step.value;

                    unregisterFunction();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.rowsTaskWatchers = [];
        }
    }, {
        key: 'sortRows',
        value: function sortRows() {
            var expression = this.gantt.options.value('sortMode');
            if (expression !== undefined) {
                var reverse = false;
                if ((typeof expression === 'string' || expression instanceof String) && expression.charAt(0) === '-') {
                    reverse = true;
                    expression = expression.substr(1);
                }
                var angularOrderBy = GanttRowsManager.$filter('orderBy');
                this.sortedRows = angularOrderBy(this.rows, expression, reverse);
            } else {
                this.sortedRows = this.rows.slice();
            }
            this.sortedRows = this.applyCustomRowSorters(this.sortedRows);
            this.updateVisibleRows();
        }
    }, {
        key: 'removeCustomRowSorter',
        value: function removeCustomRowSorter(sorterFunction) {
            var i = this.customRowSorters.indexOf(sorterFunction);
            if (i > -1) {
                this.customRowSorters.splice(i, 1);
            }
        }
    }, {
        key: 'addCustomRowSorter',
        value: function addCustomRowSorter(sorterFunction) {
            this.customRowSorters.push(sorterFunction);
        }
    }, {
        key: 'applyCustomRowSorters',
        value: function applyCustomRowSorters(rows) {
            var sortedRows = rows;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (0, _getIterator3.default)(this.customRowSorters), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var customRowSorter = _step2.value;

                    sortedRows = customRowSorter(sortedRows);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return sortedRows;
        }
    }, {
        key: 'applySort',
        value: function applySort() {
            var data = this.gantt.$scope.data;
            data.splice(0, data.length);
            var rows = [];
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = (0, _getIterator3.default)(this.sortedRows), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var row = _step3.value;

                    data.push(row.model);
                    rows.push(row);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            this.rows = rows;
        }
    }, {
        key: 'moveRow',
        value: function moveRow(row, targetRow) {
            var sortMode = this.gantt.options.value('sortMode');
            if (sortMode !== undefined) {
                this.applySort();
                this.gantt.options.set('sortMode', undefined);
            }
            var targetRowIndex = this.rows.indexOf(targetRow);
            var rowIndex = this.rows.indexOf(row);
            if (targetRowIndex > -1 && rowIndex > -1 && targetRowIndex !== rowIndex) {
                GanttRowsManager.ganttArrays.moveToIndex(this.rows, rowIndex, targetRowIndex);
                GanttRowsManager.ganttArrays.moveToIndex(this.rowsTaskWatchers, rowIndex, targetRowIndex);
                GanttRowsManager.ganttArrays.moveToIndex(this.gantt.$scope.data, rowIndex, targetRowIndex);
                this.gantt.api.rows.raise.change(row);
                this.gantt.api.rows.raise.move(row, rowIndex, targetRowIndex);
                this.updateVisibleObjects();
                this.sortRows();
            }
        }
    }, {
        key: 'updateVisibleObjects',
        value: function updateVisibleObjects() {
            this.updateVisibleRows();
            this.updateVisibleTasks();
        }
    }, {
        key: 'updateVisibleRows',
        value: function updateVisibleRows() {
            var oldFilteredRows = this.filteredRows;
            var filterRow = this.gantt.options.value('filterRow');
            if (filterRow) {
                if ((typeof filterRow === 'undefined' ? 'undefined' : (0, _typeof3.default)(filterRow)) === 'object') {
                    filterRow = { model: filterRow };
                }
                var filterRowComparator = this.gantt.options.value('filterRowComparator');
                if (typeof filterRowComparator === 'function') {
                    var gantt = this.gantt;
                    filterRowComparator = function filterRowComparator(actual, expected) {
                        return gantt.options.value('filterRowComparator')(actual, expected);
                    };
                }
                this.filteredRows = this.filterImpl(this.sortedRows, filterRow, filterRowComparator);
            } else {
                this.filteredRows = this.sortedRows.slice(0);
            }
            var raiseEvent = !_angular2.default.equals(oldFilteredRows, this.filteredRows);
            this.customFilteredRows = this.applyCustomRowFilters(this.filteredRows);

            this.visibleRows = this.customFilteredRows;
            this.gantt.api.rows.raise.displayed(this.sortedRows, this.filteredRows, this.visibleRows);
            if (raiseEvent) {
                this.gantt.api.rows.raise.filter(this.sortedRows, this.filteredRows);
            }
        }
    }, {
        key: 'removeCustomRowFilter',
        value: function removeCustomRowFilter(filterFunction) {
            var i = this.customRowFilters.indexOf(filterFunction);
            if (i > -1) {
                this.customRowFilters.splice(i, 1);
            }
        }
    }, {
        key: 'addCustomRowFilter',
        value: function addCustomRowFilter(filterFunction) {
            this.customRowFilters.push(filterFunction);
        }
    }, {
        key: 'applyCustomRowFilters',
        value: function applyCustomRowFilters(rows) {
            var filteredRows = rows;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = (0, _getIterator3.default)(this.customRowFilters), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var customRowFilter = _step4.value;

                    filteredRows = customRowFilter(filteredRows);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return filteredRows;
        }
    }, {
        key: 'setFilterImpl',
        value: function setFilterImpl(filterImpl) {
            if (!filterImpl) {
                this.filterImpl = this._defaultFilterImpl;
            } else {
                this.filterImpl = filterImpl;
            }
        }
    }, {
        key: 'updateVisibleTasks',
        value: function updateVisibleTasks() {
            var oldFilteredTasks = [];
            var filteredTasks = [];
            var tasks = [];
            var visibleTasks = [];
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = (0, _getIterator3.default)(this.rows), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var row = _step5.value;

                    oldFilteredTasks = oldFilteredTasks.concat(row.filteredTasks);
                    row.updateVisibleTasks();
                    filteredTasks = filteredTasks.concat(row.filteredTasks);
                    visibleTasks = visibleTasks.concat(row.visibleTasks);
                    tasks = tasks.concat(row.tasks);
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            this.gantt.api.tasks.raise.displayed(tasks, filteredTasks, visibleTasks);
            var filterEvent = !_angular2.default.equals(oldFilteredTasks, filteredTasks);
            if (filterEvent) {
                this.gantt.api.tasks.raise.filter(tasks, filteredTasks, visibleTasks);
            }
        }
    }, {
        key: 'updateTasksPosAndSize',
        value: function updateTasksPosAndSize() {
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = (0, _getIterator3.default)(this.rows), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var row = _step6.value;

                    row.updateTasksPosAndSize();
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }
        }
    }, {
        key: 'getExpandedFrom',
        value: function getExpandedFrom(from) {
            from = from ? (0, _moment2.default)(from) : from;
            var minRowFrom = from;
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = (0, _getIterator3.default)(this.rows), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var row = _step7.value;

                    if (minRowFrom === undefined || minRowFrom > row.from) {
                        minRowFrom = row.from;
                    }
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }

            if (minRowFrom && (!from || minRowFrom < from)) {
                return minRowFrom;
            }
            return from;
        }
    }, {
        key: 'getExpandedTo',
        value: function getExpandedTo(to) {
            to = to ? (0, _moment2.default)(to) : to;
            var maxRowTo = to;
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = (0, _getIterator3.default)(this.rows), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var row = _step8.value;

                    if (maxRowTo === undefined || maxRowTo < row.to) {
                        maxRowTo = row.to;
                    }
                }
            } catch (err) {
                _didIteratorError8 = true;
                _iteratorError8 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
                        _iterator8.return();
                    }
                } finally {
                    if (_didIteratorError8) {
                        throw _iteratorError8;
                    }
                }
            }

            var toDate = this.gantt.options.value('toDate');
            if (maxRowTo && (!toDate || maxRowTo > toDate)) {
                return maxRowTo;
            }
            return to;
        }
    }, {
        key: 'getDefaultFrom',
        value: function getDefaultFrom() {
            var defaultFrom = void 0;
            var _iteratorNormalCompletion9 = true;
            var _didIteratorError9 = false;
            var _iteratorError9 = undefined;

            try {
                for (var _iterator9 = (0, _getIterator3.default)(this.rows), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                    var row = _step9.value;

                    if (defaultFrom === undefined || row.from < defaultFrom) {
                        defaultFrom = row.from;
                    }
                }
            } catch (err) {
                _didIteratorError9 = true;
                _iteratorError9 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion9 && _iterator9.return) {
                        _iterator9.return();
                    }
                } finally {
                    if (_didIteratorError9) {
                        throw _iteratorError9;
                    }
                }
            }

            return defaultFrom;
        }
    }, {
        key: 'getDefaultTo',
        value: function getDefaultTo() {
            var defaultTo = void 0;
            var _iteratorNormalCompletion10 = true;
            var _didIteratorError10 = false;
            var _iteratorError10 = undefined;

            try {
                for (var _iterator10 = (0, _getIterator3.default)(this.rows), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                    var row = _step10.value;

                    if (defaultTo === undefined || row.to > defaultTo) {
                        defaultTo = row.to;
                    }
                }
            } catch (err) {
                _didIteratorError10 = true;
                _iteratorError10 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion10 && _iterator10.return) {
                        _iterator10.return();
                    }
                } finally {
                    if (_didIteratorError10) {
                        throw _iteratorError10;
                    }
                }
            }

            return defaultTo;
        }
    }]);
    return GanttRowsManager;
}();

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttBody = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = ["GanttBodyColumns", "GanttBodyRows", "GanttBodyBackground", "GanttBodyForeground", function (GanttBodyColumns, GanttBodyRows, GanttBodyBackground, GanttBodyForeground) {
    'ngInject';

    GanttBody.GanttBodyColumns = GanttBodyColumns;
    GanttBody.GanttBodyRows = GanttBodyRows;
    GanttBody.GanttBodyBackground = GanttBodyBackground;
    GanttBody.GanttBodyForeground = GanttBodyForeground;
    return GanttBody;
}];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttBody = exports.GanttBody = function GanttBody(gantt) {
    (0, _classCallCheck3.default)(this, GanttBody);

    this.gantt = gantt;
    this.background = new GanttBody.GanttBodyBackground(this);
    this.foreground = new GanttBody.GanttBodyForeground(this);
    this.columns = new GanttBody.GanttBodyColumns(this);
    this.rows = new GanttBody.GanttBodyRows(this);
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttHeader = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = ["GanttHeaderColumns", function (GanttHeaderColumns) {
    'ngInject';

    GanttHeader.GanttHeaderColumns = GanttHeaderColumns;
    return GanttHeader;
}];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttHeader = exports.GanttHeader = function () {
    function GanttHeader(gantt) {
        (0, _classCallCheck3.default)(this, GanttHeader);

        this.gantt = gantt;
        this.columns = new GanttHeader.GanttHeaderColumns(this.gantt);
    }

    (0, _createClass3.default)(GanttHeader, [{
        key: 'getHeight',
        value: function getHeight() {
            return this.$element[0].offsetHeight;
        }
    }]);
    return GanttHeader;
}();

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttScroll = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = function () {
    'ngInject';

    return GanttScroll;
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttScroll = exports.GanttScroll = function () {
    function GanttScroll(gantt) {
        (0, _classCallCheck3.default)(this, GanttScroll);

        this.gantt = gantt;
        this.gantt.api.registerEvent('scroll', 'scroll');
        this.gantt.api.registerMethod('scroll', 'to', this.scrollTo, this);
        this.gantt.api.registerMethod('scroll', 'toDate', this.scrollToDate, this);
        this.gantt.api.registerMethod('scroll', 'left', this.scrollToLeft, this);
        this.gantt.api.registerMethod('scroll', 'right', this.scrollToRight, this);
        this.gantt.api.registerMethod('scroll', 'setWidth', this.setWidth, this);
    }

    (0, _createClass3.default)(GanttScroll, [{
        key: 'getScrollLeft',
        value: function getScrollLeft() {
            if (this.$element === undefined) {
                return undefined;
            } else {
                if (this.cachedScrollLeft === undefined) {
                    this.cachedScrollLeft = this.$element[0].scrollLeft;
                }
                return this.cachedScrollLeft;
            }
        }
    }, {
        key: 'getScrollWidth',
        value: function getScrollWidth() {
            return this.$element === undefined ? undefined : this.$element[0].scrollWidth;
        }
    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this.$element === undefined ? undefined : this.$element[0].offsetWidth;
        }
    }, {
        key: 'setWidth',
        value: function setWidth(width) {
            if (this.$element[0]) {}
        }
    }, {
        key: 'getBordersWidth',
        value: function getBordersWidth() {
            if (this.$element === undefined) {
                return undefined;
            }
            if (this.$element[0].clientWidth) {
                return this.$element[0].offsetWidth - this.$element[0].clientWidth;
            } else {
                var borderLeft = window.getComputedStyle(this.$element[0]).getPropertyValue('border-left-width') ? window.getComputedStyle(this.$element[0]).getPropertyValue('border-left-width').match(/\d+/)[0] : '0';
                var borderRight = window.getComputedStyle(this.$element[0]).getPropertyValue('border-right-width') ? window.getComputedStyle(this.$element[0]).getPropertyValue('border-right-width').match(/\d+/)[0] : '0';
                return parseInt(borderLeft, 10) + parseInt(borderRight, 10);
            }
        }
    }, {
        key: 'getBordersHeight',
        value: function getBordersHeight() {
            return this.$element === undefined ? undefined : this.$element[0].offsetHeight - this.$element[0].clientHeight;
        }
    }, {
        key: 'isVScrollbarVisible',
        value: function isVScrollbarVisible() {
            if (this.$element !== undefined) {
                return this.$element[0].scrollHeight > this.$element[0].offsetHeight;
            }
        }
    }, {
        key: 'isHScrollbarVisible',
        value: function isHScrollbarVisible() {
            if (this.$element !== undefined) {
                return this.$element[0].scrollWidth > this.$element[0].offsetWidth;
            }
        }
    }, {
        key: 'scrollTo',
        value: function scrollTo(position) {
            this.$element[0].scrollLeft = position;
            this.$element.triggerHandler('scroll');
        }
    }, {
        key: 'scrollToLeft',
        value: function scrollToLeft(offset) {
            this.$element[0].scrollLeft -= offset;
            this.$element.triggerHandler('scroll');
        }
    }, {
        key: 'scrollToRight',
        value: function scrollToRight(offset) {
            this.$element[0].scrollLeft += offset;
            this.$element.triggerHandler('scroll');
        }
    }, {
        key: 'scrollToDate',
        value: function scrollToDate(date) {
            var position = this.gantt.getPositionByDate(date);
            if (position !== undefined) {
                this.$element[0].scrollLeft = position - this.$element[0].offsetWidth / 2;
            }
        }
    }]);
    return GanttScroll;
}();

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttSide = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = function () {
    'ngInject';

    return GanttSide;
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttSide = exports.GanttSide = function () {
    function GanttSide(gantt) {
        (0, _classCallCheck3.default)(this, GanttSide);

        this.gantt = gantt;
    }

    (0, _createClass3.default)(GanttSide, [{
        key: 'getWidth',
        value: function getWidth() {
            if (this.gantt.options.value('showSide')) {
                var width = this.gantt.options.value('sideWidth');
                if (width === undefined && this.$element !== undefined) {
                    if (this.$element.css('width') !== undefined) {
                        this.$element.css('width', '');
                    }
                }
                if (this.$element !== undefined) {
                    width = this.$element[0].offsetWidth;
                }
                if (width !== undefined) {
                    return width;
                }
            }
            return 0;
        }
    }, {
        key: 'show',
        value: function show(value) {
            if (this.$element !== undefined) {
                this.$element.toggleClass('ng-hide', !value);
            }
        }
    }, {
        key: 'isShown',
        value: function isShown() {
            if (this.$element !== undefined) {
                return !this.$element.hasClass('ng-hide');
            }
        }
    }]);
    return GanttSide;
}();

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttTimespansManager = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = ["GanttTimespan", function (GanttTimespan) {
    'ngInject';

    GanttTimespansManager.GanttTimespan = GanttTimespan;
    return GanttTimespansManager;
}];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttTimespansManager = exports.GanttTimespansManager = function () {
    function GanttTimespansManager(gantt) {
        var _this = this;

        (0, _classCallCheck3.default)(this, GanttTimespansManager);

        this.timespansMap = {};
        this.timespans = [];
        this.gantt = gantt;
        this.gantt.$scope.$watchCollection('timespans', function (newValue) {
            _this.clearTimespans();
            _this.loadTimespans(newValue);
        });
        this.gantt.api.registerMethod('timespans', 'load', this.loadTimespans, this);
        this.gantt.api.registerMethod('timespans', 'remove', this.removeTimespans, this);
        this.gantt.api.registerMethod('timespans', 'clear', this.clearTimespans, this);
        this.gantt.api.registerEvent('timespans', 'add');
        this.gantt.api.registerEvent('timespans', 'remove');
        this.gantt.api.registerEvent('timespans', 'change');
    }

    (0, _createClass3.default)(GanttTimespansManager, [{
        key: 'loadTimespans',
        value: function loadTimespans(timespans) {
            if (!Array.isArray(timespans)) {
                timespans = timespans !== undefined ? [timespans] : [];
            }
            this.gantt.$scope.timespans = timespans;

            for (var i = 0, l = timespans.length; i < l; i++) {
                var timespanModel = timespans[i];
                this.gantt.objectModel.cleanTimespan(timespanModel);
                this.loadTimespan(timespanModel);
            }
        }
    }, {
        key: 'loadTimespan',
        value: function loadTimespan(timespanModel) {
            var timespan = void 0;
            var isUpdate = false;
            if (timespanModel.id in this.timespansMap) {
                timespan = this.timespansMap[timespanModel.id];
                timespan.model = timespanModel;
                isUpdate = true;
                this.gantt.api.timespans.raise.change(timespan);
            } else {
                timespan = new GanttTimespansManager.GanttTimespan(this.gantt, timespanModel);
                this.timespansMap[timespanModel.id] = timespan;
                this.timespans.push(timespan);
                this.gantt.api.timespans.raise.add(timespan);
            }
            timespan.updatePosAndSize();
            return isUpdate;
        }
    }, {
        key: 'removeTimespans',
        value: function removeTimespans(timespans) {
            if (!Array.isArray(timespans)) {
                timespans = [timespans];
            }
            for (var i = 0, l = timespans.length; i < l; i++) {
                var timespanData = timespans[i];
                this.removeTimespan(timespanData.id);
            }
        }
    }, {
        key: 'removeTimespan',
        value: function removeTimespan(timespanId) {
            if (timespanId in this.timespansMap) {
                delete this.timespansMap[timespanId];
                var removedTimespan = void 0;
                var timespan = void 0;
                for (var i = this.timespans.length - 1; i >= 0; i--) {
                    timespan = this.timespans[i];
                    if (timespan.model.id === timespanId) {
                        removedTimespan = timespan;
                        this.timespans.splice(i, 1);
                        break;
                    }
                }
                this.gantt.api.timespans.raise.remove(removedTimespan);
                return removedTimespan;
            }
            return undefined;
        }
    }, {
        key: 'clearTimespans',
        value: function clearTimespans() {
            this.timespansMap = {};
            this.timespans = [];
        }
    }, {
        key: 'updateTimespansPosAndSize',
        value: function updateTimespansPosAndSize() {
            for (var i = 0, l = this.timespans.length; i < l; i++) {
                this.timespans[i].updatePosAndSize();
            }
        }
    }]);
    return GanttTimespansManager;
}();

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(140);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(18)
  , document = __webpack_require__(8).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(10) && !__webpack_require__(17)(function(){
  return Object.defineProperty(__webpack_require__(51)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(27)
  , $export        = __webpack_require__(15)
  , redefine       = __webpack_require__(59)
  , hide           = __webpack_require__(16)
  , has            = __webpack_require__(11)
  , Iterators      = __webpack_require__(19)
  , $iterCreate    = __webpack_require__(148)
  , setToStringTag = __webpack_require__(30)
  , getPrototypeOf = __webpack_require__(57)
  , ITERATOR       = __webpack_require__(9)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(29)
  , createDesc     = __webpack_require__(21)
  , toIObject      = __webpack_require__(13)
  , toPrimitive    = __webpack_require__(34)
  , has            = __webpack_require__(11)
  , IE8_DOM_DEFINE = __webpack_require__(52)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(10) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(58)
  , hiddenKeys = __webpack_require__(26).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 56 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(11)
  , toObject    = __webpack_require__(60)
  , IE_PROTO    = __webpack_require__(31)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(11)
  , toIObject    = __webpack_require__(13)
  , arrayIndexOf = __webpack_require__(142)(false)
  , IE_PROTO     = __webpack_require__(31)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(25);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(156)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(53)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(161);
var global        = __webpack_require__(8)
  , hide          = __webpack_require__(16)
  , Iterators     = __webpack_require__(19)
  , TO_STRING_TAG = __webpack_require__(9)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 63 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["Gantt", "ganttEnableNgAnimate", "$timeout", "$templateCache", function (Gantt, ganttEnableNgAnimate, $timeout, $templateCache) {
    'ngInject';

    return {
        restrict: 'A',
        transclude: true,
        templateUrl: function templateUrl(tElement, tAttrs) {
            var templateUrl = void 0;
            if (tAttrs.templateUrl === undefined) {
                templateUrl = 'template/gantt.tmpl.html';
            } else {
                templateUrl = tAttrs.templateUrl;
            }
            if (tAttrs.template !== undefined) {
                $templateCache.put(templateUrl, tAttrs.template);
            }
            return templateUrl;
        },
        scope: {
            sortMode: '=?',
            filterTask: '=?',
            filterTaskComparator: '=?',
            filterRow: '=?',
            filterRowComparator: '=?',
            viewScale: '=?',
            columnWidth: '=?',
            expandToFit: '=?',
            shrinkToFit: '=?',
            showSide: '=?',
            allowSideResizing: '=?',
            fromDate: '=?',
            toDate: '=?',
            currentDateValue: '=?',
            currentDate: '=?',
            daily: '=?',
            autoExpand: '=?',
            taskOutOfRange: '=?',
            taskContent: '=?',
            rowContent: '=?',
            maxHeight: '=?',
            sideWidth: '=?',
            headers: '=?',
            headersFormats: '=?',
            headersScales: '=?',
            timeFrames: '=?',
            dateFrames: '=?',
            timeFramesWorkingMode: '=?',
            timeFramesNonWorkingMode: '=?',
            timespans: '=?',
            columnMagnet: '=?',
            shiftColumnMagnet: '=?',
            timeFramesMagnet: '=?',
            data: '=?',
            api: '=?',
            options: '=?'
        },
        controller: ["$scope", "$element", function controller($scope, $element) {
            'ngInject';

            for (var option in $scope.options) {
                $scope[option] = $scope.options[option];
            }

            ganttEnableNgAnimate($element, false);
            $scope.gantt = new Gantt($scope, $element);
            this.gantt = $scope.gantt;
        }],
        link: function link(scope, element) {
            scope.gantt.api.directives.raise.new('gantt', scope, element);
            scope.$on('$destroy', function () {
                scope.gantt.api.directives.raise.destroy('gantt', scope, element);
            });
            $timeout(function () {
                scope.gantt.initialized();
            });
        }
    };
}];

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttColumnBuilder = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = ["GanttColumn", function (GanttColumn) {
    'ngInject';

    GanttColumnBuilder.GanttColumn = GanttColumn;
    return GanttColumnBuilder;
}];

var _column = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttColumnBuilder = exports.GanttColumnBuilder = function () {
    function GanttColumnBuilder(columnsManager) {
        (0, _classCallCheck3.default)(this, GanttColumnBuilder);

        this.columnsManager = columnsManager;
    }

    (0, _createClass3.default)(GanttColumnBuilder, [{
        key: 'newColumn',
        value: function newColumn(date, endDate, left, width) {
            var calendar = this.columnsManager.gantt.calendar;
            var timeFramesWorkingMode = this.columnsManager.gantt.options.value('timeFramesWorkingMode');
            var timeFramesNonWorkingMode = this.columnsManager.gantt.options.value('timeFramesNonWorkingMode');
            return new _column.GanttColumn(date, endDate, left, width, calendar, timeFramesWorkingMode, timeFramesNonWorkingMode);
        }
    }]);
    return GanttColumnBuilder;
}();

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _moment = __webpack_require__(3);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttColumnGenerator = function () {
    function GanttColumnGenerator() {
        (0, _classCallCheck3.default)(this, GanttColumnGenerator);
    }

    (0, _createClass3.default)(GanttColumnGenerator, [{
        key: 'isToDateToExclude',
        value: function isToDateToExclude(to, value, unit) {
            return (0, _moment2.default)(to).add(value, unit).startOf(unit) === to;
        }
    }, {
        key: 'getFirstValue',
        value: function getFirstValue(unit) {
            if (['hour', 'minute', 'second', 'millisecond'].indexOf(unit) >= 0) {
                return 0;
            }
        }
    }, {
        key: 'ensureNoUnitOverflow',
        value: function ensureNoUnitOverflow(unit, startDate, endDate) {
            var v1 = startDate.get(unit);
            var v2 = endDate.get(unit);
            var firstValue = this.getFirstValue(unit);
            if (firstValue !== undefined && v2 !== firstValue && v2 < v1) {
                endDate.set(unit, firstValue);
            }
        }
    }, {
        key: 'generate',
        value: function generate(builder, from, to, viewScale, columnWidth, maximumWidth, leftOffset, reverse) {
            if (!to && !maximumWidth) {
                throw new Error('to or maximumWidth must be defined');
            }
            viewScale = viewScale.trim();
            if (viewScale.charAt(viewScale.length - 1) === 's') {
                viewScale = viewScale.substring(0, viewScale.length - 1);
            }
            var viewScaleValue = void 0;
            var viewScaleUnit = void 0;
            var splittedViewScale = void 0;
            if (viewScale) {
                splittedViewScale = viewScale.split(' ');
            }
            if (splittedViewScale && splittedViewScale.length > 1) {
                viewScaleValue = parseFloat(splittedViewScale[0]);
                viewScaleUnit = splittedViewScale[splittedViewScale.length - 1];
            } else {
                viewScaleValue = 1;
                viewScaleUnit = viewScale;
            }
            var excludeTo = false;
            from = (0, _moment2.default)(from).startOf(viewScaleUnit);
            if (to) {
                excludeTo = this.isToDateToExclude(to, viewScaleValue, viewScaleUnit);
                to = (0, _moment2.default)(to).startOf(viewScaleUnit);
            }
            var left = 0;
            var date = (0, _moment2.default)(from).startOf(viewScaleUnit);
            if (reverse) {
                date.subtract(viewScaleValue, viewScaleUnit);
                left -= columnWidth;
            }
            var generatedCols = [];
            while (true) {
                if (maximumWidth && Math.abs(left) > maximumWidth + columnWidth) {
                    break;
                }
                var startDate = (0, _moment2.default)(date);
                var endDate = (0, _moment2.default)(startDate).add(viewScaleValue, viewScaleUnit);
                this.ensureNoUnitOverflow(viewScaleUnit, startDate, endDate);
                var column = builder.newColumn(startDate, endDate, leftOffset ? left + leftOffset : left, columnWidth);
                if (!column.cropped) {
                    generatedCols.push(column);
                    if (reverse) {
                        left -= columnWidth;
                    } else {
                        left += columnWidth;
                    }
                }
                if (to) {
                    if (reverse) {
                        if (excludeTo && date < to || !excludeTo && date <= to) {
                            break;
                        }
                    } else {
                        if (excludeTo && date > to || !excludeTo && date >= to) {
                            break;
                        }
                    }
                }
                if (reverse) {
                    date.subtract(viewScaleValue, viewScaleUnit);
                    this.ensureNoUnitOverflow(viewScaleUnit, date, startDate);
                } else {
                    date.add(viewScaleValue, viewScaleUnit);
                    this.ensureNoUnitOverflow(viewScaleUnit, startDate, date);
                }
            }
            if (reverse) {
                if (this.isToDateToExclude(from, viewScaleValue, viewScaleUnit)) {
                    generatedCols.shift();
                }
                generatedCols.reverse();
            }
            return generatedCols;
        }
    }]);
    return GanttColumnGenerator;
}();

exports.default = GanttColumnGenerator;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = __webpack_require__(4);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _moment = __webpack_require__(3);

var _moment2 = _interopRequireDefault(_moment);

var _columnHeader = __webpack_require__(41);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttHeadersGenerator = function () {
    function GanttHeadersGenerator() {
        (0, _classCallCheck3.default)(this, GanttHeadersGenerator);
    }

    (0, _createClass3.default)(GanttHeadersGenerator, [{
        key: 'generateHeaders',
        value: function generateHeaders(columnsManager, headerName) {
            var generatedHeaders = [];
            var header = void 0;
            var viewScale = columnsManager.getHeaderScale(headerName);
            var viewScaleValue = void 0;
            var viewScaleUnit = void 0;
            var splittedViewScale = void 0;
            if (viewScale) {
                splittedViewScale = viewScale.split(' ');
            }
            if (splittedViewScale && splittedViewScale.length > 1) {
                viewScaleValue = parseFloat(splittedViewScale[0]);
                viewScaleUnit = splittedViewScale[splittedViewScale.length - 1];
            } else {
                viewScaleValue = 1;
                viewScaleUnit = viewScale;
            }
            if (columnsManager.columns.length > 0) {
                var currentColumn = columnsManager.columns[0];
                var currentDate = (0, _moment2.default)(currentColumn.date).startOf(viewScaleUnit);
                var maximumDate = (0, _moment2.default)(columnsManager.columns[columnsManager.columns.length - 1].endDate);
                while (true) {
                    var currentPosition = currentColumn.getPositionByDate(currentDate);
                    var endDate = _moment2.default.min((0, _moment2.default)(currentDate).add(viewScaleValue, viewScaleUnit), maximumDate);
                    var column = columnsManager.getColumnByDate(endDate);
                    var left = column.getPositionByDate(endDate);
                    var width = left - currentPosition;
                    if (width > 0) {
                        var labelFormat = columnsManager.getHeaderFormat(headerName);
                        header = new _columnHeader.GanttColumnHeader(currentDate, endDate, viewScaleUnit, currentPosition, width, labelFormat, headerName);
                        generatedHeaders.push(header);
                    }
                    if (endDate.isSame(maximumDate) || endDate.isAfter(maximumDate)) {
                        break;
                    }
                    currentColumn = column;
                    currentDate = endDate;
                }
            }
            return generatedHeaders;
        }
    }, {
        key: 'generate',
        value: function generate(columnsManager) {
            var headerNames = [];
            if (columnsManager.gantt.options.value('headers') === undefined) {
                var viewScale = columnsManager.gantt.options.value('viewScale');
                viewScale = viewScale.trim();
                if (viewScale.charAt(viewScale.length - 1) === 's') {
                    viewScale = viewScale.substring(0, viewScale.length - 1);
                }
                var viewScaleUnit = void 0;
                var splittedViewScale = void 0;
                if (viewScale) {
                    splittedViewScale = viewScale.split(' ');
                }
                if (splittedViewScale && splittedViewScale.length > 1) {
                    viewScaleUnit = splittedViewScale[splittedViewScale.length - 1];
                } else {
                    viewScaleUnit = viewScale;
                }
                if (['quarter', 'month'].indexOf(viewScaleUnit) > -1) {
                    headerNames.push('year');
                }
                if (['day', 'week'].indexOf(viewScaleUnit) > -1) {
                    headerNames.push('month');
                }
                if (['day'].indexOf(viewScaleUnit) > -1) {
                    headerNames.push('week');
                }
                if (['hour'].indexOf(viewScaleUnit) > -1) {
                    headerNames.push('day');
                }
                if (['minute', 'second', 'millisecond'].indexOf(viewScaleUnit) > -1) {
                    headerNames.push('hour');
                }
                if (['second', 'millisecond'].indexOf(viewScaleUnit) > -1) {
                    headerNames.push('minute');
                }
                if (['millisecond'].indexOf(viewScaleUnit) > -1) {
                    headerNames.push('second');
                }
                headerNames.push(viewScale);
            } else {
                headerNames = columnsManager.gantt.options.value('headers');
            }
            var headers = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(headerNames), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var headerName = _step.value;

                    headers.push(this.generateHeaders(columnsManager, headerName));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return headers;
        }
    }]);
    return GanttHeadersGenerator;
}();

exports.default = GanttHeadersGenerator;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Gantt = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = ["GanttApi", "GanttOptions", "GanttCalendar", "GanttScroll", "GanttBody", "GanttHeader", "GanttSide", "GanttObjectModel", "GanttRowsManager", "GanttColumnsManager", "GanttTimespansManager", "GanttCurrentDateManager", "ganttArrays", "$document", "$timeout", function (GanttApi, GanttOptions, GanttCalendar, GanttScroll, GanttBody, GanttHeader, GanttSide, GanttObjectModel, GanttRowsManager, GanttColumnsManager, GanttTimespansManager, GanttCurrentDateManager, ganttArrays, $document, $timeout) {
    'ngInject';

    Gantt.ganttArrays = ganttArrays;
    Gantt.$document = $document;
    Gantt.$timeout = $timeout;
    return Gantt;
}];

var _angular = __webpack_require__(2);

var _angular2 = _interopRequireDefault(_angular);

var _moment = __webpack_require__(3);

var _moment2 = _interopRequireDefault(_moment);

var _api = __webpack_require__(37);

var _options = __webpack_require__(38);

var _calendar = __webpack_require__(39);

var _currentDateManager = __webpack_require__(40);

var _objectModel = __webpack_require__(43);

var _rowsManager = __webpack_require__(44);

var _columnsManager = __webpack_require__(42);

var _timespansManager = __webpack_require__(49);

var _scroll = __webpack_require__(47);

var _body = __webpack_require__(45);

var _header = __webpack_require__(46);

var _side = __webpack_require__(48);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Gantt = exports.Gantt = function () {
    function Gantt($scope, $element) {
        var _this = this;

        (0, _classCallCheck3.default)(this, Gantt);

        this.rendered = false;
        this.isRefreshingColumns = false;
        this.$scope = $scope;
        this.$element = $element;
        this.options = new _options.GanttOptions($scope, {
            'api': function api() {},
            'data': [],
            'timespans': [],
            'viewScale': 'day',
            'columnMagnet': '15 minutes',
            'timeFramesMagnet': true,
            'showSide': true,
            'allowSideResizing': true,
            'currentDate': 'line',
            'currentDateValue': _moment2.default,
            'autoExpand': 'none',
            'taskOutOfRange': 'truncate',
            'taskContent': '{{task.model.name}}',
            'rowContent': '{{row.model.name}}',
            'maxHeight': 0,
            'timeFrames': [],
            'dateFrames': [],
            'timeFramesWorkingMode': 'hidden',
            'timeFramesNonWorkingMode': 'visible',
            'taskLimitThreshold': 100,
            'columnLimitThreshold': 500
        });
        this.api = new _api.GanttApi(this);
        this.api.registerEvent('core', 'ready');
        this.api.registerEvent('core', 'rendered');
        this.api.registerEvent('directives', 'controller');
        this.api.registerEvent('directives', 'preLink');
        this.api.registerEvent('directives', 'postLink');
        this.api.registerEvent('directives', 'new');
        this.api.registerEvent('directives', 'destroy');
        this.api.registerEvent('data', 'change');
        this.api.registerEvent('data', 'load');
        this.api.registerEvent('data', 'remove');
        this.api.registerEvent('data', 'clear');
        this.api.registerMethod('core', 'getDateByPosition', this.getDateByPosition, this);
        this.api.registerMethod('core', 'getPositionByDate', this.getPositionByDate, this);
        this.api.registerMethod('data', 'load', this.loadData, this);
        this.api.registerMethod('data', 'remove', this.removeData, this);
        this.api.registerMethod('data', 'clear', this.clearData, this);
        this.api.registerMethod('data', 'get', this.getData, this);
        this.calendar = new _calendar.GanttCalendar();
        this.calendar.registerTimeFrames(this.options.value('timeFrames'));
        this.calendar.registerDateFrames(this.options.value('dateFrames'));
        this.api.registerMethod('timeframes', 'registerTimeFrames', this.calendar.registerTimeFrames, this.calendar);
        this.api.registerMethod('timeframes', 'clearTimeframes', this.calendar.clearTimeFrames, this.calendar);
        this.api.registerMethod('timeframes', 'registerDateFrames', this.calendar.registerDateFrames, this.calendar);
        this.api.registerMethod('timeframes', 'clearDateFrames', this.calendar.clearDateFrames, this.calendar);
        this.api.registerMethod('timeframes', 'registerTimeFrameMappings', this.calendar.registerTimeFrameMappings, this.calendar);
        this.api.registerMethod('timeframes', 'clearTimeFrameMappings', this.calendar.clearTimeFrameMappings, this.calendar);
        $scope.$watchGroup(['timeFrames', 'dateFrames'], function (newValues, oldValues) {
            if (newValues !== oldValues) {
                var timeFrames = newValues[0];
                var dateFrames = newValues[1];
                var oldTimeFrames = oldValues[0];
                var oldDateFrames = oldValues[1];
                var framesChanged = false;
                if (!_angular2.default.equals(timeFrames, oldTimeFrames)) {
                    _this.calendar.clearTimeFrames();
                    _this.calendar.registerTimeFrames(timeFrames);
                    framesChanged = true;
                }
                if (!_angular2.default.equals(dateFrames, oldDateFrames)) {
                    _this.calendar.clearDateFrames();
                    _this.calendar.registerDateFrames(dateFrames);
                    framesChanged = true;
                }
                if (framesChanged) {
                    _this.columnsManager.generateColumns();
                }
            }
        });
        $scope.$watch('columnMagnet', function () {
            var splittedColumnMagnet = void 0;
            var columnMagnet = _this.options.value('columnMagnet');
            if (columnMagnet) {
                splittedColumnMagnet = columnMagnet.trim().split(' ');
            }
            if (splittedColumnMagnet && splittedColumnMagnet.length > 1) {
                _this.columnMagnetValue = parseFloat(splittedColumnMagnet[0]);
                _this.columnMagnetUnit = _moment2.default.normalizeUnits(splittedColumnMagnet[splittedColumnMagnet.length - 1]);
            } else {
                _this.columnMagnetValue = 1;
                _this.columnMagnetUnit = _moment2.default.normalizeUnits(columnMagnet);
            }
        });
        $scope.$watchGroup(['shiftColumnMagnet', 'viewScale'], function () {
            var splittedColumnMagnet = void 0;
            var shiftColumnMagnet = _this.options.value('shiftColumnMagnet');
            if (shiftColumnMagnet) {
                splittedColumnMagnet = shiftColumnMagnet.trim().split(' ');
            }
            if (splittedColumnMagnet !== undefined && splittedColumnMagnet.length > 1) {
                _this.shiftColumnMagnetValue = parseFloat(splittedColumnMagnet[0]);
                _this.shiftColumnMagnetUnit = _moment2.default.normalizeUnits(splittedColumnMagnet[splittedColumnMagnet.length - 1]);
            } else {
                _this.shiftColumnMagnetValue = 1;
                _this.shiftColumnMagnetUnit = _moment2.default.normalizeUnits(shiftColumnMagnet);
            }
        });
        Gantt.$document.on('keyup keydown', this.keyHandler);
        $scope.$on('$destroy', function () {
            Gantt.$document.off('keyup keydown', _this.keyHandler);
        });
        this.scroll = new _scroll.GanttScroll(this);
        this.body = new _body.GanttBody(this);
        this.header = new _header.GanttHeader(this);
        this.side = new _side.GanttSide(this);
        this.objectModel = new _objectModel.GanttObjectModel(this.api);
        this.rowsManager = new _rowsManager.GanttRowsManager(this);
        this.columnsManager = new _columnsManager.GanttColumnsManager(this);
        this.timespansManager = new _timespansManager.GanttTimespansManager(this);
        this.currentDateManager = new _currentDateManager.GanttCurrentDateManager(this);
        this.originalWidth = 0;
        this.width = 0;
        if (typeof this.$scope.api === 'function') {
            this.$scope.api(this.api);
        }
        var hasRowModelOrderChanged = function hasRowModelOrderChanged(data1, data2) {
            if (data2 === undefined || data1.length !== data2.length) {
                return true;
            }

            for (var i = 0, l = data1.length; i < l; i++) {
                if (data1[i].id !== data2[i].id) {
                    return true;
                }
            }
            return false;
        };
        $scope.$watchCollection('data', function (newData, oldData) {
            if (oldData !== undefined) {
                var toRemoveIds = Gantt.ganttArrays.getRemovedIds(newData, oldData);
                if (toRemoveIds.length === oldData.length) {
                    _this.rowsManager.removeAll();

                    _this.api.data.raise.clear();
                } else {
                    for (var i = 0, l = toRemoveIds.length; i < l; i++) {
                        var toRemoveId = toRemoveIds[i];
                        _this.rowsManager.removeRow(toRemoveId);
                    }

                    var removedRows = [];
                    for (var _i = 0, _l = oldData.length; _i < _l; _i++) {
                        if (toRemoveIds.indexOf(oldData[_i].id) > -1) {
                            removedRows.push(oldData[_i]);
                        }
                    }
                    _this.api.data.raise.remove(removedRows);
                }
            }
            if (newData !== undefined) {
                var modelOrderChanged = hasRowModelOrderChanged(newData, oldData);
                if (modelOrderChanged) {
                    _this.rowsManager.resetNonModelLists();
                }
                for (var j = 0, k = newData.length; j < k; j++) {
                    var rowData = newData[j];
                    _this.rowsManager.addRow(rowData, modelOrderChanged);
                }
                _this.api.data.raise.change(newData, oldData);

                _this.api.data.raise.load(newData);
            }
        });
    }

    (0, _createClass3.default)(Gantt, [{
        key: 'keyHandler',
        value: function keyHandler(e) {
            this.shiftKey = e.shiftKey;
            return true;
        }
    }, {
        key: 'getMagnetValueAndUnit',
        value: function getMagnetValueAndUnit() {
            if (this.shiftKey) {
                if (this.shiftColumnMagnetValue !== undefined && this.shiftColumnMagnetUnit !== undefined) {
                    return [this.shiftColumnMagnetValue, this.shiftColumnMagnetUnit];
                } else {
                    var viewScale = this.options.value('viewScale');
                    viewScale = viewScale.trim();
                    var viewScaleValue = void 0;
                    var viewScaleUnit = void 0;
                    var splittedViewScale = void 0;
                    if (viewScale) {
                        splittedViewScale = viewScale.split(' ');
                    }
                    if (splittedViewScale && splittedViewScale.length > 1) {
                        viewScaleValue = parseFloat(splittedViewScale[0]);
                        viewScaleUnit = _moment2.default.normalizeUnits(splittedViewScale[splittedViewScale.length - 1]);
                    } else {
                        viewScaleValue = 1;
                        viewScaleUnit = _moment2.default.normalizeUnits(viewScale);
                    }
                    return [viewScaleValue * 0.25, viewScaleUnit];
                }
            } else {
                return [this.columnMagnetValue, this.columnMagnetUnit];
            }
        }
    }, {
        key: 'getMagnetDate',
        value: function getMagnetDate(date, disableExpand) {
            if (date === undefined) {
                return undefined;
            }
            if (!_moment2.default.isMoment(_moment2.default)) {
                date = (0, _moment2.default)(date);
            }
            var column = this.columnsManager.getColumnByDate(date, disableExpand);
            var magnetValueAndUnit = this.getMagnetValueAndUnit();
            var magnetValue = magnetValueAndUnit[0];
            var magnetUnit = magnetValueAndUnit[1];
            return column.getMagnetDate(date, magnetValue, magnetUnit, this.options.value('timeFramesMagnet'));
        }
    }, {
        key: 'getDateByPosition',
        value: function getDateByPosition(x, magnet, disableExpand) {
            var column = this.columnsManager.getColumnByPosition(x, disableExpand);
            if (column !== undefined) {
                var magnetValue = void 0;
                var magnetUnit = void 0;
                if (magnet) {
                    var magnetValueAndUnit = this.getMagnetValueAndUnit();
                    magnetValue = magnetValueAndUnit[0];
                    magnetUnit = magnetValueAndUnit[1];
                }
                return column.getDateByPosition(x - column.left, magnetValue, magnetUnit, this.options.value('timeFramesMagnet'));
            } else {
                return undefined;
            }
        }
    }, {
        key: 'getBodyAvailableWidth',
        value: function getBodyAvailableWidth() {
            var scrollWidth = this.getWidth() - this.side.getWidth();
            var borderWidth = this.scroll.getBordersWidth();
            var availableWidth = scrollWidth - (borderWidth !== undefined ? this.scroll.getBordersWidth() : 0);

            availableWidth = availableWidth - 1;
            return availableWidth;
        }
    }, {
        key: 'getPositionByDate',
        value: function getPositionByDate(date, disableExpand) {
            if (date === undefined) {
                return undefined;
            }
            if (!_moment2.default.isMoment(_moment2.default)) {
                date = (0, _moment2.default)(date);
            }
            var column = this.columnsManager.getColumnByDate(date, disableExpand);
            if (column !== undefined) {
                return column.getPositionByDate(date);
            } else {
                return undefined;
            }
        }
    }, {
        key: 'loadData',
        value: function loadData(data) {
            if (!Array.isArray(data)) {
                data = data !== undefined ? [data] : [];
            }
            if (this.$scope.data === undefined) {
                this.$scope.data = data;
            } else {
                for (var i = 0, l = data.length; i < l; i++) {
                    var row = data[i];
                    var j = Gantt.ganttArrays.indexOfId(this.$scope.data, row.id);
                    if (j > -1) {
                        this.$scope.data[j] = row;
                    } else {
                        this.$scope.data.push(row);
                    }
                }
            }
            var w = this.side.getWidth();
            if (w > 0) {
                this.options.set('sideWidth', w);
            }
        }
    }, {
        key: 'getData',
        value: function getData() {
            return this.$scope.data;
        }
    }, {
        key: 'removeData',
        value: function removeData(data) {
            if (!Array.isArray(data)) {
                data = data !== undefined ? [data] : [];
            }
            if (this.$scope.data !== undefined) {
                for (var i = 0, l = data.length; i < l; i++) {
                    var rowToRemove = data[i];
                    var j = Gantt.ganttArrays.indexOfId(this.$scope.data, rowToRemove.id);
                    if (j > -1) {
                        if (rowToRemove.tasks === undefined || rowToRemove.tasks.length === 0) {
                            this.$scope.data.splice(j, 1);
                        } else {
                            var row = this.$scope.data[j];
                            for (var ti = 0, tl = rowToRemove.tasks.length; ti < tl; ti++) {
                                var taskToRemove = rowToRemove.tasks[ti];
                                var tj = Gantt.ganttArrays.indexOfId(row.tasks, taskToRemove.id);
                                if (tj > -1) {
                                    row.tasks.splice(tj, 1);
                                }
                            }
                        }
                    }
                }
            }
        }
    }, {
        key: 'clearData',
        value: function clearData() {
            this.$scope.data = undefined;
        }
    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this.$scope.ganttElementWidth;
        }
    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.$scope.ganttElementHeight;
        }
    }, {
        key: 'getContainerWidth',
        value: function getContainerWidth() {
            return this.$scope.ganttContainerWidth;
        }
    }, {
        key: 'getContainerHeight',
        value: function getContainerHeight() {
            return this.$scope.ganttContainerHeight;
        }
    }, {
        key: 'initialized',
        value: function initialized() {
            var _this2 = this;

            this.api.core.raise.ready(this.api);
            this.rendered = true;
            this.columnsManager.generateColumns();
            Gantt.$timeout(function () {
                var w = _this2.side.getWidth();
                if (w > 0) {
                    _this2.options.set('sideWidth', w);
                }
                _this2.api.core.raise.rendered(_this2.api);
            });
        }
    }]);
    return Gantt;
}();

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttRow = exports.GanttRowModel = undefined;

var _getIterator2 = __webpack_require__(4);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _typeof2 = __webpack_require__(5);

var _typeof3 = _interopRequireDefault(_typeof2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = ["GanttTask", "$filter", function (GanttTask, $filter) {
    'ngInject';

    GanttRow.GanttTask = GanttTask;
    GanttRow.$filter = $filter;
    return GanttRow;
}];

var _moment = __webpack_require__(3);

var _moment2 = _interopRequireDefault(_moment);

var _angular = __webpack_require__(2);

var angular = _interopRequireWildcard(_angular);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttRowModel = exports.GanttRowModel = function GanttRowModel() {
    (0, _classCallCheck3.default)(this, GanttRowModel);
};

var GanttRow = exports.GanttRow = function () {
    function GanttRow(rowsManager, model) {
        (0, _classCallCheck3.default)(this, GanttRow);

        this.rowsManager = rowsManager;
        this.model = model;
        this.from = undefined;
        this.to = undefined;
        this.tasksMap = {};
        this.tasks = [];
        this.filteredTasks = [];
        this.visibleTasks = [];
    }

    (0, _createClass3.default)(GanttRow, [{
        key: 'addTaskImpl',
        value: function addTaskImpl(task) {
            var viewOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            this.tasksMap[task.model.id] = task;
            this.tasks.push(task);
            if (!viewOnly) {
                if (this.model.tasks === undefined) {
                    this.model.tasks = [];
                }
                if (this.model.tasks.indexOf(task.model) === -1) {
                    this.model.tasks.push(task.model);
                }
            }
        }
    }, {
        key: 'addTask',
        value: function addTask(taskModel) {
            var viewOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var task = void 0;
            var isUpdate = false;
            this.rowsManager.gantt.objectModel.cleanTask(taskModel);
            if (taskModel.id in this.tasksMap) {
                task = this.tasksMap[taskModel.id];
                if (task.model === taskModel) {
                    return task;
                }
                task.model = taskModel;
                isUpdate = true;
            } else {
                task = new GanttRow.GanttTask(this, taskModel);
                this.addTaskImpl(task, viewOnly);
            }
            this.sortTasks();
            this.setFromToByTask(task);
            if (!viewOnly) {
                if (isUpdate) {
                    this.rowsManager.gantt.api.tasks.raise.change(task);
                } else {
                    this.rowsManager.gantt.api.tasks.raise.add(task);
                }
            }
            return task;
        }
    }, {
        key: 'moveTaskToRow',
        value: function moveTaskToRow(task) {
            var viewOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            this.rowsManager.gantt.api.tasks.raise.beforeViewRowChange(task, this);
            if (!viewOnly) {
                this.rowsManager.gantt.api.tasks.raise.beforeRowChange(task, this);
            }
            var oldRow = task.row;
            oldRow.removeTask(task.model.id, viewOnly, true);
            task.row = this;
            this.addTaskImpl(task, viewOnly);
            this.sortTasks();
            this.setFromToByTask(task);
            task.updatePosAndSize();
            this.updateVisibleTasks();
            oldRow.$scope.$digest();
            task.row.$scope.$digest();
            this.rowsManager.gantt.api.tasks.raise.viewRowChange(task, oldRow);
            if (!viewOnly) {
                this.rowsManager.gantt.api.tasks.raise.rowChange(task, oldRow);
            }
        }
    }, {
        key: 'updateVisibleTasks',
        value: function updateVisibleTasks() {
            var filterTask = this.rowsManager.gantt.options.value('filterTask');
            if (filterTask) {
                if ((typeof filterTask === 'undefined' ? 'undefined' : (0, _typeof3.default)(filterTask)) === 'object') {
                    filterTask = { model: filterTask };
                }
                var _filterTaskComparator = this.rowsManager.gantt.options.value('filterTaskComparator');
                if (typeof _filterTaskComparator === 'function') {
                    _filterTaskComparator = function filterTaskComparator(actual, expected) {
                        return _filterTaskComparator(actual.model, expected.model);
                    };
                }
                this.filteredTasks = GanttRow.$filter('filter')(this.tasks, filterTask, _filterTaskComparator);
            } else {
                this.filteredTasks = this.tasks.slice(0);
            }
            var limitThreshold = this.rowsManager.gantt.options.value('taskLimitThreshold');
            if (limitThreshold === undefined || limitThreshold > 0 && this.filteredTasks.length >= limitThreshold) {
                this.visibleTasks = GanttRow.$filter('ganttTaskLimit')(this.filteredTasks, this.rowsManager.gantt);
            } else {
                this.visibleTasks = this.filteredTasks;
            }
        }
    }, {
        key: 'updateTasksPosAndSize',
        value: function updateTasksPosAndSize() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(this.tasks), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var task = _step.value;

                    task.updatePosAndSize();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'removeTask',
        value: function removeTask(taskId, viewOnly, silent) {
            if (taskId in this.tasksMap) {
                var removedTask = this.tasksMap[taskId];
                var task = void 0;
                var i = void 0;
                for (i = this.tasks.length - 1; i >= 0; i--) {
                    task = this.tasks[i];
                    if (task.model.id === taskId) {
                        this.tasks.splice(i, 1);
                        if (this.from && this.from.isSame((0, _moment2.default)(task.model.from)) || this.to && this.to.isSame((0, _moment2.default)(task.model.to))) {
                            this.setFromTo();
                        }
                        break;
                    }
                }
                for (i = this.filteredTasks.length - 1; i >= 0; i--) {
                    task = this.filteredTasks[i];
                    if (task.model.id === taskId) {
                        this.filteredTasks.splice(i, 1);
                        break;
                    }
                }
                for (i = this.visibleTasks.length - 1; i >= 0; i--) {
                    task = this.visibleTasks[i];
                    if (task.model.id === taskId) {
                        this.visibleTasks.splice(i, 1);
                        break;
                    }
                }
                if (!viewOnly) {
                    delete this.tasksMap[taskId];
                    if (this.model.tasks !== undefined) {
                        var taskIndex = this.model.tasks.indexOf(removedTask.model);
                        if (taskIndex > -1) {
                            this.model.tasks.splice(taskIndex, 1);
                        }
                    }
                    if (!silent) {
                        this.rowsManager.gantt.api.tasks.raise.remove(removedTask);
                    }
                }
                return removedTask;
            }
        }
    }, {
        key: 'removeAllTasks',
        value: function removeAllTasks() {
            this.from = undefined;
            this.to = undefined;
            this.tasksMap = {};
            this.tasks = [];
            this.filteredTasks = [];
            this.visibleTasks = [];
        }
    }, {
        key: 'setFromTo',
        value: function setFromTo() {
            this.from = undefined;
            this.to = undefined;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (0, _getIterator3.default)(this.tasks), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var task = _step2.value;

                    this.setFromToByTask(task);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'setFromToByTask',
        value: function setFromToByTask(task) {
            this.setFromToByValues(task.model.from, task.model.to);
        }
    }, {
        key: 'setFromToByValues',
        value: function setFromToByValues(from, to) {
            if (from !== undefined) {
                if (this.from === undefined) {
                    this.from = (0, _moment2.default)(from);
                } else if (from < this.from) {
                    this.from = (0, _moment2.default)(from);
                }
            }
            if (to !== undefined) {
                if (this.to === undefined) {
                    this.to = (0, _moment2.default)(to);
                } else if (to > this.to) {
                    this.to = (0, _moment2.default)(to);
                }
            }
        }
    }, {
        key: 'sortTasks',
        value: function sortTasks() {
            this.tasks.sort(function (t1, t2) {
                return t1.left - t2.left;
            });
        }
    }, {
        key: 'clone',
        value: function clone() {
            var clone = new GanttRow(this.rowsManager, angular.copy(this.model));
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = (0, _getIterator3.default)(this.tasks), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var task = _step3.value;

                    clone.addTask(task.model);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return clone;
        }
    }]);
    return GanttRow;
}();

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttTask = exports.GanttTaskModel = undefined;

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = function () {
    'ngInject';

    return GanttTask;
};

var _angular = __webpack_require__(2);

var _angular2 = _interopRequireDefault(_angular);

var _moment = __webpack_require__(3);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttTaskModel = exports.GanttTaskModel = function GanttTaskModel() {
    (0, _classCallCheck3.default)(this, GanttTaskModel);
};

var GanttTask = exports.GanttTask = function () {
    function GanttTask(row, model) {
        (0, _classCallCheck3.default)(this, GanttTask);

        this.rowsManager = row.rowsManager;
        this.row = row;
        this.model = model;
        this.truncatedLeft = false;
        this.truncatedRight = false;
    }

    (0, _createClass3.default)(GanttTask, [{
        key: 'isMilestone',
        value: function isMilestone() {
            return !this.model.to || this.model.to.isSame(this.model.from);
        }
    }, {
        key: 'isOutOfRange',
        value: function isOutOfRange() {
            var firstColumn = this.rowsManager.gantt.columnsManager.getFirstColumn();
            var lastColumn = this.rowsManager.gantt.columnsManager.getLastColumn();
            return firstColumn === undefined || this.model.to < firstColumn.date || lastColumn === undefined || this.model.from > lastColumn.endDate;
        }
    }, {
        key: 'updatePosAndSize',
        value: function updatePosAndSize() {
            var oldViewLeft = this.left;
            var oldViewWidth = this.width;
            var oldTruncatedRight = this.truncatedRight;
            var oldTruncatedLeft = this.truncatedLeft;
            if (!this.isMoving && this.isOutOfRange()) {
                this.modelLeft = undefined;
                this.modelWidth = undefined;
            } else {
                this.modelLeft = this.rowsManager.gantt.getPositionByDate(this.model.from);
                this.modelWidth = this.rowsManager.gantt.getPositionByDate(this.model.to) - this.modelLeft;
            }
            var lastColumn = this.rowsManager.gantt.columnsManager.getLastColumn();
            var maxModelLeft = lastColumn ? lastColumn.left + lastColumn.width : 0;
            var modelLeft = this.modelLeft;
            var modelWidth = this.modelWidth;
            if (this.rowsManager.gantt.options.value('daily')) {
                modelLeft = this.rowsManager.gantt.getPositionByDate((0, _moment2.default)(this.model.from).startOf('day'));
                modelWidth = this.rowsManager.gantt.getPositionByDate((0, _moment2.default)(this.model.to).endOf('day')) - modelLeft;
            }
            var minModelLeft = -modelWidth;
            if (modelLeft < minModelLeft) {
                modelLeft = minModelLeft;
            }
            if (modelLeft > maxModelLeft) {
                modelLeft = maxModelLeft;
            }
            if (modelLeft === undefined || modelWidth === undefined) {
                this.left = undefined;
                this.width = undefined;
            } else {
                this.left = modelLeft;
                this.width = modelWidth;
                if (modelLeft < 0) {
                    this.truncatedLeft = true;
                    this.truncatedLeftOffset = -modelLeft;
                    this.truncatedRight = false;
                    this.truncatedRightOffset = undefined;
                } else if (modelWidth + modelLeft > this.rowsManager.gantt.width) {
                    this.truncatedRight = true;
                    this.truncatedRightOffset = modelWidth + modelLeft - this.rowsManager.gantt.width;
                    this.truncatedLeft = false;
                    this.truncatedLeftOffset = undefined;
                } else {
                    this.truncatedLeft = false;
                    this.truncatedLeftOffset = undefined;
                    this.truncatedRight = false;
                    this.truncatedRightOffset = modelWidth + modelLeft - this.rowsManager.gantt.width;
                }
                if (this.width < 0) {
                    this.left = this.left + this.width;
                    this.width = -this.width;
                }
            }
            this.updateView();
            if (!this.rowsManager.gantt.isRefreshingColumns && (oldViewLeft !== this.left || oldViewWidth !== this.width || oldTruncatedRight !== this.truncatedRight || oldTruncatedLeft !== this.truncatedLeft)) {
                this.rowsManager.gantt.api.tasks.raise.viewChange(this);
            }
        }
    }, {
        key: 'updateView',
        value: function updateView() {
            if (this.$element) {
                if (this.left === undefined || this.width === undefined) {
                    this.$element.css('display', 'none');
                } else {
                    this.$element.css({ 'left': this.left + 'px', 'width': this.width + 'px', 'display': '' });
                    if (this.model.priority > 0) {
                        var priority = this.model.priority;
                        var children = this.$element.children();
                        this.$element.css('z-index', priority);

                        for (var i = 0; i < children.length; i++) {
                            _angular2.default.element(children[i]).css('z-index', priority);
                        }
                    }
                    this.$element.toggleClass('gantt-task-milestone', this.isMilestone());
                }
            }
        }
    }, {
        key: 'getBackgroundElement',
        value: function getBackgroundElement() {
            if (this.$element !== undefined) {
                var backgroundElement = this.$element[0].querySelector('.gantt-task-background');
                if (backgroundElement !== undefined) {
                    return _angular2.default.element(backgroundElement);
                }
                return undefined;
            }
        }
    }, {
        key: 'getContentElement',
        value: function getContentElement() {
            if (this.$element !== undefined) {
                var contentElement = this.$element[0].querySelector('.gantt-task-content');
                if (contentElement !== undefined) {
                    return _angular2.default.element(contentElement);
                }
                return undefined;
            }
        }
    }, {
        key: 'getForegroundElement',
        value: function getForegroundElement() {
            if (this.$element !== undefined) {
                var foregroundElement = this.$element[0].querySelector('.gantt-task-foreground');
                if (foregroundElement !== undefined) {
                    return _angular2.default.element(foregroundElement);
                }
                return foregroundElement;
            }
        }
    }, {
        key: 'setFrom',
        value: function setFrom(x, magnetEnabled) {
            this.model.from = this.rowsManager.gantt.getDateByPosition(x, magnetEnabled);
            this.row.setFromTo();
            this.updatePosAndSize();
        }
    }, {
        key: 'setTo',
        value: function setTo(x, magnetEnabled) {
            this.model.to = this.rowsManager.gantt.getDateByPosition(x, magnetEnabled);
            this.row.setFromTo();
            this.updatePosAndSize();
        }
    }, {
        key: 'moveTo',
        value: function moveTo(x, magnetEnabled) {
            var newTaskRight = void 0;
            var newTaskLeft = void 0;
            if (x > this.modelLeft) {
                this.model.to = this.rowsManager.gantt.getDateByPosition(x + this.modelWidth, magnetEnabled);
                newTaskRight = this.rowsManager.gantt.getPositionByDate(this.model.to);
                newTaskLeft = newTaskRight - this.modelWidth;
                this.model.from = this.rowsManager.gantt.getDateByPosition(newTaskLeft, false);
            } else {
                this.model.from = this.rowsManager.gantt.getDateByPosition(x, magnetEnabled);
                newTaskLeft = this.rowsManager.gantt.getPositionByDate(this.model.from);
                newTaskRight = newTaskLeft + this.modelWidth;
                this.model.to = this.rowsManager.gantt.getDateByPosition(newTaskRight, false);
            }
            this.row.setFromTo();
            this.updatePosAndSize();
        }
    }, {
        key: 'clone',
        value: function clone() {
            return new GanttTask(this.row, _angular2.default.copy(this.model));
        }
    }]);
    return GanttTask;
}();

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttBodyBackground = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = function () {
    'ngInject';

    return GanttBodyBackground;
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttBodyBackground = exports.GanttBodyBackground = function GanttBodyBackground(body) {
    (0, _classCallCheck3.default)(this, GanttBodyBackground);

    this.body = body;
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttBodyColumns = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = function () {
    'ngInject';

    return GanttBodyColumns;
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttBodyColumns = exports.GanttBodyColumns = function GanttBodyColumns(body) {
    (0, _classCallCheck3.default)(this, GanttBodyColumns);

    this.body = body;
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttBodyForeground = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = function () {
    'ngInject';

    return GanttBodyForeground;
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttBodyForeground = exports.GanttBodyForeground = function GanttBodyForeground(body) {
    (0, _classCallCheck3.default)(this, GanttBodyForeground);

    this.body = body;
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttBodyRows = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = function () {
    'ngInject';

    return GanttBodyRows;
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttBodyRows = exports.GanttBodyRows = function GanttBodyRows(body) {
    (0, _classCallCheck3.default)(this, GanttBodyRows);

    this.body = body;
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttHeaderColumns = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = function () {
    'ngInject';

    return GanttHeaderColumns;
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttHeaderColumns = exports.GanttHeaderColumns = function GanttHeaderColumns($element) {
    (0, _classCallCheck3.default)(this, GanttHeaderColumns);

    this.$element = $element;
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Timespan = exports.TimespanModel = undefined;

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = function () {
    'ngInject';

    return Timespan;
};

var _angular = __webpack_require__(2);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimespanModel = exports.TimespanModel = function TimespanModel() {
    (0, _classCallCheck3.default)(this, TimespanModel);
};

var Timespan = exports.Timespan = function () {
    function Timespan(gantt, model) {
        (0, _classCallCheck3.default)(this, Timespan);

        this.gantt = gantt;
        this.model = model;
    }

    (0, _createClass3.default)(Timespan, [{
        key: 'updatePosAndSize',
        value: function updatePosAndSize() {
            this.modelLeft = this.gantt.getPositionByDate(this.model.from);
            this.modelWidth = this.gantt.getPositionByDate(this.model.to) - this.modelLeft;
            var lastColumn = this.gantt.columnsManager.getLastColumn();
            var maxModelLeft = lastColumn ? lastColumn.left + lastColumn.width : 0;
            var modelLeft = this.modelLeft;
            var modelWidth = this.modelWidth;
            var minModelLeft = -modelWidth;
            if (modelLeft < minModelLeft) {
                modelLeft = minModelLeft;
            }
            if (modelLeft > maxModelLeft) {
                modelLeft = maxModelLeft;
            }
            if (modelLeft === undefined || modelWidth === undefined) {
                this.left = undefined;
                this.width = undefined;
            } else {
                this.left = modelLeft;
                this.width = modelWidth;
                if (modelLeft < 0) {
                    this.truncatedLeft = true;
                    this.truncatedLeftOffset = -modelLeft;
                    this.truncatedRight = false;
                    this.truncatedRightOffset = undefined;
                } else if (modelWidth + modelLeft > this.gantt.width) {
                    this.truncatedRight = true;
                    this.truncatedRightOffset = modelWidth + modelLeft - this.gantt.width;
                    this.truncatedLeft = false;
                    this.truncatedLeftOffset = undefined;
                } else {
                    this.truncatedLeft = false;
                    this.truncatedLeftOffset = undefined;
                    this.truncatedRight = false;
                    this.truncatedRightOffset = modelWidth + modelLeft - this.gantt.width;
                }
                if (this.width < 0) {
                    this.left = this.left + this.width;
                    this.width = -this.width;
                }
            }
            this.updateView();
        }
    }, {
        key: 'updateView',
        value: function updateView() {
            if (this.$element) {
                if (this.left === undefined || this.width === undefined) {
                    this.$element.css('display', 'none');
                } else {
                    this.$element.css('display', '');
                    this.$element.css('left', this.left + 'px');
                    this.$element.css('width', this.width + 'px');
                }
            }
        }
    }, {
        key: 'setFrom',
        value: function setFrom(x) {
            this.from = this.gantt.getDateByPosition(x);
            this.updatePosAndSize();
        }
    }, {
        key: 'setTo',
        value: function setTo(x) {
            this.to = this.gantt.getDateByPosition(x);
            this.updatePosAndSize();
        }
    }, {
        key: 'moveTo',
        value: function moveTo(x) {
            this.from = this.gantt.getDateByPosition(x);
            this.to = this.gantt.getDateByPosition(x + this.width);
            this.updatePosAndSize();
        }
    }, {
        key: 'clone',
        value: function clone() {
            return new Timespan(this.gantt, _angular2.default.copy(this.model));
        }
    }]);
    return Timespan;
}();

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttArrays = function () {
    function GanttArrays() {
        (0, _classCallCheck3.default)(this, GanttArrays);
    }

    (0, _createClass3.default)(GanttArrays, [{
        key: 'moveToIndex',
        value: function moveToIndex(array, oldIndex, newIndex) {
            if (newIndex >= array.length) {
                var k = newIndex - array.length;
                while (k-- + 1) {
                    array.push(undefined);
                }
            }
            array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
            return array;
        }
    }, {
        key: 'getRemovedIds',
        value: function getRemovedIds(newArray, oldArray) {
            var idProperty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'id';

            var i = void 0;
            var l = void 0;
            var removedIds = [];
            if (oldArray !== undefined) {
                for (i = 0, l = oldArray.length; i < l; i++) {
                    removedIds.push(oldArray[i][idProperty]);
                }
            }
            if (newArray !== undefined) {
                for (i = 0, l = newArray.length; i < l; i++) {
                    var newObject = newArray[i];
                    if (newObject[idProperty] !== undefined) {
                        var newObjectIndex = removedIds.indexOf(newObject[idProperty]);
                        if (newObjectIndex > -1) {
                            removedIds.splice(newObjectIndex, 1);
                        }
                    }
                }
            }
            return removedIds;
        }
    }, {
        key: 'indexOfId',
        value: function indexOfId(array, value) {
            var idProperties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'id';

            var i = void 0;
            if (idProperties instanceof Array) {
                for (i = array.length - 1; i >= 0; i--) {
                    var arrayValue = array[i];

                    for (var k = 0, l = idProperties.length; k < l; k++) {
                        arrayValue = arrayValue[idProperties[k]];
                    }
                    if (arrayValue === value) {
                        return i;
                    }
                }
                return -1;
            }
            for (i = array.length - 1; i >= 0; i--) {
                if (array[i][idProperties] === value) {
                    return i;
                }
            }
            return -1;
        }
    }, {
        key: 'removeId',
        value: function removeId(array, value, idProperties) {
            var indexOf = this.indexOfId(array, value, idProperties);
            if (indexOf > -1) {
                return array.splice(indexOf, 1)[0];
            }
        }
    }, {
        key: 'remove',
        value: function remove(array, value) {
            var index = array.indexOf(value);
            if (index > -1) {
                array.splice(index, 1);
                return true;
            }
            return false;
        }
    }]);
    return GanttArrays;
}();

exports.default = GanttArrays;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttBinarySearch = function () {
    function GanttBinarySearch() {
        (0, _classCallCheck3.default)(this, GanttBinarySearch);
    }

    (0, _createClass3.default)(GanttBinarySearch, [{
        key: "getIndicesOnly",
        value: function getIndicesOnly(input, value, comparer, strict) {
            var lo = -1;
            var hi = input.length;
            while (hi - lo > 1) {
                var mid = Math.floor((lo + hi) / 2);
                if (strict ? comparer(input[mid]) < value : comparer(input[mid]) <= value) {
                    lo = mid;
                } else {
                    hi = mid;
                }
            }
            if (!strict && input[lo] !== undefined && comparer(input[lo]) === value) {
                hi = lo;
            }
            return [lo, hi];
        }
    }, {
        key: "get",
        value: function get(input, value, comparer, strict) {
            var res = this.getIndicesOnly(input, value, comparer, strict);
            return [input[res[0]], input[res[1]]];
        }
    }]);
    return GanttBinarySearch;
}();

exports.default = GanttBinarySearch;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttHierarchy = undefined;

var _getIterator2 = __webpack_require__(4);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = GanttHierarchyFactory;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttHierarchy = exports.GanttHierarchy = function () {
    function GanttHierarchy() {
        (0, _classCallCheck3.default)(this, GanttHierarchy);

        this.nameToRow = {};
        this.idToRow = {};
        this.nameToChildren = {};
        this.idToChildren = {};
        this.nameToParent = {};
        this.idToParent = {};
    }

    (0, _createClass3.default)(GanttHierarchy, [{
        key: 'registerChildRow',
        value: function registerChildRow(row, childRow) {
            if (childRow !== undefined) {
                var nameChildren = this.nameToChildren[row.model.name];
                if (nameChildren === undefined) {
                    nameChildren = [];
                    this.nameToChildren[row.model.name] = nameChildren;
                }
                nameChildren.push(childRow);
                var idChildren = this.idToChildren[row.model.id];
                if (idChildren === undefined) {
                    idChildren = [];
                    this.idToChildren[row.model.id] = idChildren;
                }
                idChildren.push(childRow);
                this.nameToParent[childRow.model.name] = row;
                this.idToParent[childRow.model.id] = row;
            }
        }
    }, {
        key: 'refresh',
        value: function refresh(rows) {
            this.nameToRow = {};
            this.idToRow = {};
            this.nameToChildren = {};
            this.idToChildren = {};
            this.nameToParent = {};
            this.idToParent = {};
            var row = void 0;
            for (var i = 0; i < rows.length; i++) {
                row = rows[i];
                this.nameToRow[row.model.name] = row;
                this.idToRow[row.model.id] = row;
            }
            for (var _i = 0; _i < rows.length; _i++) {
                row = rows[_i];
                if (row.model.parent !== undefined) {
                    var parentRow = this.nameToRow[row.model.parent];
                    if (parentRow === undefined) {
                        parentRow = this.idToRow[row.model.parent];
                    }
                    if (parentRow !== undefined) {
                        this.registerChildRow(parentRow, row);
                    }
                }
                if (row.model.children !== undefined) {
                    var children = row.model.children;
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = (0, _getIterator3.default)(children), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var childRowNameOrId = _step.value;

                            var childRow = this.nameToRow[childRowNameOrId];
                            if (childRow === undefined) {
                                childRow = this.idToRow[childRowNameOrId];
                            }
                            if (childRow !== undefined) {
                                this.registerChildRow(row, childRow);
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
            }
            var rootRows = [];
            for (var _i2 = 0; _i2 < rows.length; _i2++) {
                row = rows[_i2];
                if (this.parent(row) === undefined) {
                    rootRows.push(row);
                }
            }
            return rootRows;
        }
    }, {
        key: 'children',
        value: function children(row) {
            var children = this.idToChildren[row.model.id];
            return children;
        }
    }, {
        key: 'descendants',
        value: function descendants(row) {
            var descendants = [];
            var children = this.children(row);
            descendants.push.apply(descendants, children);
            if (children !== undefined) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = (0, _getIterator3.default)(children), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var child = _step2.value;

                        var childDescendants = this.descendants(child);
                        descendants.push.apply(descendants, childDescendants);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
            return descendants;
        }
    }, {
        key: 'parent',
        value: function parent(row) {
            var parent = this.idToParent[row.model.id];
            return parent;
        }
    }, {
        key: 'ancestors',
        value: function ancestors(row) {
            var ancestors = [];
            var parent = this.parent(row);
            while (parent !== undefined) {
                ancestors.push(parent);
                parent = this.parent(parent);
            }
            return ancestors;
        }
    }]);
    return GanttHierarchy;
}();

function GanttHierarchyFactory() {
    'ngInject';

    return GanttHierarchy;
}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _angular = __webpack_require__(2);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttUtils = function () {
    function GanttUtils() {
        (0, _classCallCheck3.default)(this, GanttUtils);

        this.seedId = new Date().getTime();
    }

    (0, _createClass3.default)(GanttUtils, [{
        key: 'createBoundedWrapper',
        value: function createBoundedWrapper(object, method) {
            return function () {
                return method.apply(object, arguments);
            };
        }
    }, {
        key: 'firstProperty',
        value: function firstProperty(objects, propertyName, defaultValue) {
            for (var i = 0, l = objects.length; i < l; i++) {
                var object = objects[i];
                if (object !== undefined && propertyName in object) {
                    if (object[propertyName] !== undefined) {
                        return object[propertyName];
                    }
                }
            }
            return defaultValue;
        }
    }, {
        key: 'angularIndexOf',
        value: function angularIndexOf(arr, obj) {
            for (var i = 0; i < arr.length; i++) {
                if (_angular2.default.equals(arr[i], obj)) {
                    return i;
                }
            }
            return -1;
        }
    }, {
        key: 'random4',
        value: function random4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
    }, {
        key: 'randomUuid',
        value: function randomUuid() {
            return this.random4() + this.random4() + '-' + this.random4() + '-' + this.random4() + '-' + this.random4() + '-' + this.random4() + this.random4() + this.random4();
        }
    }, {
        key: 'newId',
        value: function newId() {
            return this.seedId += 1;
        }
    }]);
    return GanttUtils;
}();

exports.default = GanttUtils;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["ganttBinarySearch", function (ganttBinarySearch) {
    'ngInject';

    var leftComparator = function leftComparator(c) {
        return c.left;
    };
    return function (input, gantt) {
        var scrollLeft = gantt.scroll.getScrollLeft();
        var scrollContainerWidth = gantt.getWidth() - gantt.side.getWidth();
        if (scrollContainerWidth > 0) {
            var start = ganttBinarySearch.getIndicesOnly(input, scrollLeft, leftComparator)[0];
            var end = ganttBinarySearch.getIndicesOnly(input, scrollLeft + scrollContainerWidth, leftComparator)[1];
            return input.slice(start, end);
        } else {
            return input.slice();
        }
    };
}];

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    'ngInject';

    return function (input, gantt) {
        var firstColumn = gantt.columnsManager.getFirstColumn();
        var lastColumn = gantt.columnsManager.getLastColumn();
        if (firstColumn !== undefined && lastColumn !== undefined) {
            var fromDate = firstColumn.date;
            var toDate = lastColumn.endDate;
            var res = [];
            var scrollLeft = gantt.scroll.getScrollLeft();
            var scrollContainerWidth = gantt.getWidth() - gantt.side.getWidth();

            for (var i = 0, l = input.length; i < l; i++) {
                var task = input[i];
                if (task.active) {
                    res.push(task);
                } else {
                    if (task.model.to >= fromDate && task.model.from <= toDate) {
                        if (task.left === undefined) {
                            task.updatePosAndSize();
                        }

                        if (!scrollContainerWidth || task.left >= scrollLeft && task.left <= scrollLeft + scrollContainerWidth || task.left + task.width >= scrollLeft && task.left + task.width <= scrollLeft + scrollContainerWidth || task.left < scrollLeft && task.left + task.width > scrollLeft + scrollContainerWidth) {
                            res.push(task);
                        }
                    }
                }
            }
            return res;
        } else {
            return input.splice(0);
        }
    };
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["$document", "$parse", "$timeout", "ganttMouseOffset", function ($document, $parse, $timeout, ganttMouseOffset) {
    'ngInject';

    return {
        restrict: 'A',
        require: '^gantt',
        scope: {
            targetElement: '=ganttResizer',
            enabled: '@?ganttResizerEnabled'
        },
        link: function link($scope, $element, $attrs, ganttCtrl) {
            var api = ganttCtrl.gantt.api;
            var eventTopic = $attrs.ganttResizerEventTopic;
            if ($scope.enabled === undefined) {
                $scope.enabled = true;
            }
            function getWidth() {
                return ganttCtrl.gantt.options.value($attrs.resizerWidth);
            }
            function setWidth(width) {
                if (width !== getWidth()) {
                    ganttCtrl.gantt.options.set($attrs.resizerWidth, width);
                    if (eventTopic !== undefined) {
                        api[eventTopic].raise.resize(width);
                    }
                    $timeout(function () {
                        ganttCtrl.gantt.columnsManager.updateColumnsMeta();
                    });
                }
            }
            function dblclick(event) {
                event.preventDefault();
                setWidth(undefined);
            }
            function mousemove(event) {
                $scope.$evalAsync(function () {
                    var offset = ganttMouseOffset.getOffsetForElement($scope.targetElement[0], event);
                    var maxWidth = ganttCtrl.gantt.getWidth() - ganttCtrl.gantt.scroll.getBordersWidth();
                    var width = Math.min(Math.max(offset.x, 0), maxWidth);
                    setWidth(width);
                });
            }
            function mouseup() {
                if (eventTopic !== undefined) {
                    api[eventTopic].raise.resizeEnd(getWidth());
                }
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
            }
            function mousedown(event) {
                event.preventDefault();
                if (eventTopic !== undefined) {
                    api[eventTopic].raise.resizeBegin(getWidth());
                }
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            }
            $attrs.$observe('ganttResizerEnabled', function (value) {
                $scope.enabled = $parse(value)();
            });
            $scope.$watch('enabled', function (value) {
                if (value === undefined) {
                    value = true;
                }
                $element.toggleClass('gantt-resizer-enabled', value);
                if (value) {
                    $element.on('dblclick', dblclick);
                    $element.on('mousedown', mousedown);
                } else {
                    $element.off('dblclick', dblclick);
                    $element.off('mousedown', mousedown);
                }
            });
            $scope.$watch(function () {
                return getWidth();
            }, function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    $scope.targetElement.css('width', newValue + 'px');

                    if ($scope.targetElement[0].offsetWidth > 0) {
                        setWidth($scope.targetElement[0].offsetWidth);
                    }
                }
            });
            if (eventTopic) {
                api.registerEvent(eventTopic, 'resize');
                api.registerEvent(eventTopic, 'resizeBegin');
                api.registerEvent(eventTopic, 'resizeEnd');
                api.registerMethod(eventTopic, 'setWidth', setWidth, this);
                api.registerMethod(eventTopic, 'getWidth', getWidth, this);
            }
        }
    };
}];

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    'ngInject';

    return {
        restrict: 'A',
        require: '^ganttScrollManager',
        link: function link(scope, element, attrs, ganttScrollManagerCtrl) {
            ganttScrollManagerCtrl.registerHorizontalReceiver(element);
        }
    };
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    'ngInject';

    return {
        restrict: 'A',
        scope: {},
        controller: ["$scope", function controller($scope) {
            'ngInject';

            $scope.horizontal = [];
            $scope.vertical = [];
            this.registerVerticalReceiver = function (element) {
                element.css('position', 'relative');
                $scope.vertical.push(element[0]);
            };
            this.registerHorizontalReceiver = function (element) {
                element.css('position', 'relative');
                $scope.horizontal.push(element[0]);
            };
            this.getHorizontalRecievers = function () {
                return $scope.horizontal;
            };
            this.getVerticalRecievers = function () {
                return $scope.vertical;
            };
        }]
    };
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    'ngInject';

    return {
        restrict: 'A',
        require: ['^gantt', '^ganttScrollManager'],
        link: function link(scope, element, attrs, controllers) {
            var el = element[0];
            var updateListeners = function updateListeners() {
                var i = void 0;
                var l = void 0;
                var vertical = controllers[1].getVerticalRecievers();
                for (i = 0, l = vertical.length; i < l; i++) {
                    var vElement = vertical[i];
                    if (vElement.parentNode.scrollTop !== el.scrollTop) {
                        vElement.parentNode.scrollTop = el.scrollTop;
                    }
                }
                var horizontal = controllers[1].getHorizontalRecievers();
                for (i = 0, l = horizontal.length; i < l; i++) {
                    var hElement = horizontal[i];
                    if (hElement.parentNode.scrollLeft !== el.scrollLeft) {
                        hElement.parentNode.scrollLeft = el.scrollLeft;
                    }
                }
            };
            element.bind('scroll', updateListeners);
            scope.$watch(function () {
                return controllers[0].gantt.width;
            }, function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    var horizontal = controllers[1].getHorizontalRecievers();

                    for (var i = 0, l = horizontal.length; i < l; i++) {
                        var hElement = horizontal[i];
                        hElement.style.width = newValue + 'px';
                    }
                }
            });
        }
    };
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", "$timeout", "ganttDebounce", function (GanttDirectiveBuilder, $timeout, ganttDebounce) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttScrollable');
    builder.controller = function ($scope, $element) {
        $scope.gantt.scroll.$element = $element;
        var lastScrollLeft = void 0;
        var autoExpandTimer = void 0;
        var autoExpandColumns = function autoExpandColumns(el, date, direction) {
            var autoExpand = $scope.gantt.options.value('autoExpand');
            if (autoExpand !== 'both' && autoExpand !== true && autoExpand !== direction) {
                return;
            }
            var from = void 0;
            var to = void 0;
            var viewScale = $scope.gantt.options.value('viewScale');
            viewScale = viewScale.trim();
            if (viewScale.charAt(viewScale.length - 1) === 's') {
                viewScale = viewScale.substring(0, viewScale.length - 1);
            }
            var viewScaleValue = void 0;
            var viewScaleUnit = void 0;
            var splittedViewScale = void 0;
            if (viewScale) {
                splittedViewScale = viewScale.split(' ');
            }
            if (splittedViewScale && splittedViewScale.length > 1) {
                viewScaleValue = parseFloat(splittedViewScale[0]);
                viewScaleUnit = splittedViewScale[splittedViewScale.length - 1];
            } else {
                viewScaleValue = 1;
                viewScaleUnit = viewScale;
            }
            if (direction === 'left') {
                from = (0, _moment2.default)(date).add(-5 * viewScaleValue, viewScaleUnit);
                $scope.fromDate = from;
            } else {
                to = (0, _moment2.default)(date).add(5 * viewScaleValue, viewScaleUnit);
                $scope.toDate = to;
            }
            $scope.gantt.api.scroll.raise.scroll(el.scrollLeft, date, direction);
        };
        $element.bind('scroll', ganttDebounce(function () {
            var el = $element[0];
            var currentScrollLeft = el.scrollLeft;
            var direction = void 0;
            var date = void 0;
            $scope.gantt.scroll.cachedScrollLeft = currentScrollLeft;
            $scope.gantt.columnsManager.updateVisibleColumns();
            $scope.gantt.rowsManager.updateVisibleObjects();
            if (currentScrollLeft < lastScrollLeft && currentScrollLeft === 0) {
                direction = 'left';
                date = $scope.gantt.columnsManager.from;
            } else if (currentScrollLeft > lastScrollLeft && el.offsetWidth + currentScrollLeft >= el.scrollWidth - 1) {
                direction = 'right';
                date = $scope.gantt.columnsManager.to;
            }
            lastScrollLeft = currentScrollLeft;
            if (date !== undefined) {
                if (autoExpandTimer) {
                    $timeout.cancel(autoExpandTimer);
                }
                autoExpandTimer = $timeout(function () {
                    autoExpandColumns(el, date, direction);
                }, 300);
            } else {
                $scope.gantt.api.scroll.raise.scroll(currentScrollLeft);
            }
        }, 5));
        $scope.getScrollableCss = function () {
            var css = {};
            var maxHeight = $scope.gantt.options.value('maxHeight');
            if (!maxHeight) {
                maxHeight = $scope.gantt.getContainerHeight();
            }
            if (maxHeight > 0) {
                css['max-height'] = maxHeight - $scope.gantt.header.getHeight() + 'px';
                css['overflow-y'] = 'auto';
                if ($scope.gantt.scroll.isVScrollbarVisible()) {
                    css['border-right'] = 'none';
                }
            }
            var columnWidth = this.gantt.options.value('columnWidth');
            var bodySmallerThanGantt = $scope.gantt.width === 0 ? false : $scope.gantt.width < $scope.gantt.getWidth() - $scope.gantt.side.getWidth();
            if (columnWidth !== undefined && bodySmallerThanGantt) {
                css['width'] = $scope.gantt.width + this.gantt.scroll.getBordersWidth() + 'px';
            }
            return css;
        };
    };
    return builder.build();
}];

var _moment = __webpack_require__(3);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    'ngInject';

    return {
        restrict: 'A',
        require: '^ganttScrollManager',
        link: function link(scope, element, attrs, ganttScrollManagerCtrl) {
            ganttScrollManagerCtrl.registerVerticalReceiver(element);
        }
    };
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    'ngInject';

    return {
        restrict: 'A',
        controller: ["$scope", "$element", "$attrs", function controller($scope, $element, $attrs) {
            'ngInject';

            var scopeVariable = $attrs.ganttContainerHeightListener;
            if (scopeVariable === '') {
                scopeVariable = 'ganttContainerHeight';
            }
            var effectiveScope = $scope;
            while (scopeVariable.indexOf('$parent.') === 0) {
                scopeVariable = scopeVariable.substring('$parent.'.length);
                effectiveScope = effectiveScope.$parent;
            }
            effectiveScope.$watch(function () {
                var el = $element[0].parentElement ? $element[0].parentElement.parentElement : undefined;
                if (el) {
                    var height = el.offsetHeight;
                    var style = getComputedStyle(el);
                    height = height - parseInt(style.marginTop, 10) - parseInt(style.marginBottom, 10);
                    return height;
                }
                return 0;
            }, function (newValue) {
                if (newValue > 0) {
                    effectiveScope[scopeVariable] = newValue;
                }
            });
        }]
    };
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    'ngInject';

    return {
        restrict: 'A',
        controller: ["$scope", "$element", "$attrs", function controller($scope, $element, $attrs) {
            'ngInject';

            var scopeVariable = $attrs.ganttContainerWidthListener;
            if (scopeVariable === '') {
                scopeVariable = 'ganttContainerWidth';
            }
            var effectiveScope = $scope;
            while (scopeVariable.indexOf('$parent.') === 0) {
                scopeVariable = scopeVariable.substring('$parent.'.length);
                effectiveScope = effectiveScope.$parent;
            }
            effectiveScope.$watch(function () {
                var el = $element[0].parentElement ? $element[0].parentElement.parentElement : undefined;
                if (el) {
                    var width = el.offsetWidth;
                    var style = getComputedStyle(el);
                    width = width - parseInt(style.marginLeft, 10) - parseInt(style.marginRight, 10);
                    return width;
                }
                return 0;
            }, function (newValue) {
                if (newValue > 0) {
                    effectiveScope[scopeVariable] = newValue;
                }
            });
        }]
    };
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    'ngInject';

    return {
        restrict: 'A',
        controller: ["$scope", "$element", "$attrs", function controller($scope, $element, $attrs) {
            'ngInject';

            var scopeVariable = $attrs.ganttElementHeightListener;
            if (scopeVariable === '') {
                scopeVariable = 'ganttElementHeight';
            }
            var el = $element[0];
            var effectiveScope = $scope;
            while (scopeVariable.indexOf('$parent.') === 0) {
                scopeVariable = scopeVariable.substring('$parent.'.length);
                effectiveScope = effectiveScope.$parent;
            }
            effectiveScope.$watch(function () {
                return el.clientHeight;
            }, function (newValue) {
                if (newValue > 0) {
                    effectiveScope[scopeVariable] = newValue;
                }
            });
        }]
    };
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    'ngInject';

    return {
        restrict: 'A',
        controller: ["$scope", "$element", "$attrs", function controller($scope, $element, $attrs) {
            'ngInject';

            var scopeVariable = $attrs.ganttElementWidthListener;
            if (scopeVariable === '') {
                scopeVariable = 'ganttElementWidth';
            }
            var el = $element[0];
            var effectiveScope = $scope;
            while (scopeVariable.indexOf('$parent.') === 0) {
                scopeVariable = scopeVariable.substring('$parent.'.length);
                effectiveScope = effectiveScope.$parent;
            }
            effectiveScope.$watch(function () {
                return el.clientWidth;
            }, function (newValue) {
                if (newValue > 0) {
                    effectiveScope[scopeVariable] = newValue;
                }
            });
        }]
    };
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", function (GanttDirectiveBuilder) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttBody');
    builder.controller = function ($scope, $element) {
        $scope.gantt.body.$element = $element;
        $scope.gantt.body.$scope = $scope;
    };
    return builder.build();
}];

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", function (GanttDirectiveBuilder) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttBodyBackground');
    builder.controller = function ($scope, $element) {
        $scope.gantt.body.background.$element = $element;
        $scope.gantt.body.background.$scope = $scope;
    };
    return builder.build();
}];

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", function (GanttDirectiveBuilder) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttBodyColumns');
    builder.controller = function ($scope, $element) {
        $scope.gantt.body.columns.$element = $element;
        $scope.gantt.body.background.$scope = $scope;
    };
    return builder.build();
}];

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", function (GanttDirectiveBuilder) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttBodyForeground');
    builder.controller = function ($scope, $element) {
        $scope.gantt.body.foreground.$element = $element;
        $scope.gantt.body.foreground.$scope = $scope;
    };
    return builder.build();
}];

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", function (GanttDirectiveBuilder) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttBodyRows');
    builder.controller = function ($scope, $element) {
        $scope.gantt.body.rows.$element = $element;
        $scope.gantt.body.rows.$scope = $scope;
    };
    return builder.build();
}];

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", function (GanttDirectiveBuilder) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttColumn');
    builder.controller = function ($scope, $element) {
        $scope.column.$element = $element;
        $scope.column.$scope = $scope;
        $scope.column.updateView();
    };
    return builder.build();
}];

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", function (GanttDirectiveBuilder) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttColumnHeader');
    builder.controller = function ($scope, $element) {
        $scope.column.$element = $element;
        $scope.column.$scope = $scope;
        $scope.column.updateView();
    };
    return builder.build();
}];

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", function (GanttDirectiveBuilder) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttHeader');
    builder.controller = function ($scope, $element) {
        $scope.gantt.header.$element = $element;
        $scope.gantt.header.$scope = $scope;
    };
    return builder.build();
}];

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", function (GanttDirectiveBuilder) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttHeaderColumns');
    builder.controller = function ($scope, $element) {
        $scope.gantt.header.columns.$element = $element;
        $scope.gantt.header.columns.$scope = $scope;
    };
    return builder.build();
}];

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", function (GanttDirectiveBuilder) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttRow');
    builder.controller = function ($scope, $element) {
        $scope.row.$element = $element;
        $scope.row.$scope = $scope;
    };
    return builder.build();
}];

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", function (GanttDirectiveBuilder) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttRowBackground');
    return builder.build();
}];

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", function (GanttDirectiveBuilder) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttRowLabel');
    builder.restrict = 'A';
    builder.templateUrl = undefined;
    return builder.build();
}];

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", "ganttLayout", function (GanttDirectiveBuilder, ganttLayout) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttScrollableHeader');
    builder.controller = function ($scope) {
        var scrollBarWidth = ganttLayout.getScrollBarWidth();
        $scope.getScrollableHeaderCss = function () {
            var css = {};
            var maxHeightActivated = $scope.gantt.scroll.isVScrollbarVisible();
            var vScrollbarWidth = maxHeightActivated ? scrollBarWidth : 0;
            var columnWidth = this.gantt.options.value('columnWidth');
            var bodySmallerThanGantt = $scope.gantt.width === 0 ? false : $scope.gantt.width < $scope.gantt.getWidth() - $scope.gantt.side.getWidth();
            if (columnWidth !== undefined && bodySmallerThanGantt) {
                css['width'] = $scope.gantt.width - vScrollbarWidth + this.gantt.scroll.getBordersWidth() + 'px';
            } else if (maxHeightActivated) {
                css['width'] = $scope.gantt.getWidth() - $scope.gantt.side.getWidth() - vScrollbarWidth + 'px';
            }

            return css;
        };
    };
    return builder.build();
}];

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", function (GanttDirectiveBuilder) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttSide');
    builder.controller = function ($scope, $element) {
        $scope.gantt.side.$element = $element;
        $scope.gantt.side.$scope = $scope;
    };
    return builder.build();
}];

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", "ganttLayout", function (GanttDirectiveBuilder, ganttLayout) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttSideBackground');
    builder.controller = function ($scope) {
        var hScrollBarHeight = ganttLayout.getScrollBarHeight();
        $scope.getMaxHeightCss = function () {
            var css = {};
            var maxHeight = $scope.maxHeight;
            if (!maxHeight) {
                maxHeight = $scope.gantt.getContainerHeight();
            }
            var bodyScrollBarHeight = $scope.gantt.scroll.isHScrollbarVisible() ? hScrollBarHeight : 0;
            css['max-height'] = maxHeight - bodyScrollBarHeight - $scope.gantt.header.getHeight() + 'px';
            return css;
        };
    };
    return builder.build();
}];

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", function (GanttDirectiveBuilder) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttSideContent');
    return builder.build();
}];

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", function (GanttDirectiveBuilder) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttTask');
    builder.controller = function ($scope, $element) {
        $scope.task.$element = $element;
        $scope.task.$scope = $scope;
        $scope.getTaskContent = function () {
            if ($scope.task.model.content !== undefined) {
                return $scope.task.model.content;
            }
            return $scope.task.rowsManager.gantt.options.value('taskContent');
        };
        $scope.simplifyMoment = function (d) {
            return _moment2.default.isMoment(d) ? d.unix() : d;
        };
        $scope.$watchGroup(['simplifyMoment(task.model.from)', 'simplifyMoment(task.model.to)'], function () {
            $scope.task.updatePosAndSize();
        });
    };
    return builder.build();
}];

var _moment = __webpack_require__(3);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", function (GanttDirectiveBuilder) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttTaskBackground');
    return builder.build();
}];

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", function (GanttDirectiveBuilder) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttTaskContent');
    return builder.build();
}];

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", function (GanttDirectiveBuilder) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttTaskForeground');
    return builder.build();
}];

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", function (GanttDirectiveBuilder) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttTimeFrame');
    builder.controller = function ($scope, $element) {
        $scope.timeFrame.$element = $element;
        $scope.timeFrame.$scope = $scope;
        $scope.timeFrame.updateView();
    };
    return builder.build();
}];

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["GanttDirectiveBuilder", function (GanttDirectiveBuilder) {
    'ngInject';

    var builder = new GanttDirectiveBuilder('ganttTimespan');
    builder.controller = function ($scope, $element) {
        $scope.timespan.$element = $element;
        $scope.timespan.$scope = $scope;
        $scope.timespan.updateView();
    };
    return builder.build();
}];

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["$timeout", function ($timeout) {
    'ngInject';

    function debounce(fn, timeout) {
        var invokeApply = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var nthCall = 0;
        return function () {
            var self = this;
            var argz = arguments;
            nthCall++;
            var later = function (version) {
                return function () {
                    if (version === nthCall) {
                        return fn.apply(self, argz);
                    }
                };
            }(nthCall);
            return $timeout(later, timeout, invokeApply === undefined ? true : invokeApply);
        };
    }
    return debounce;
}];

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttDirectiveBuilder = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = ["$templateCache", function ($templateCache) {
    'ngInject';

    GanttDirectiveBuilder.$templateCache = $templateCache;
    return GanttDirectiveBuilder;
}];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttDirectiveBuilder = exports.GanttDirectiveBuilder = function () {
    function GanttDirectiveBuilder(directiveName, templateUrl) {
        var require = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '^gantt';

        var restrict = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'E';
        (0, _classCallCheck3.default)(this, GanttDirectiveBuilder);

        this.directiveName = directiveName;
        this.templateUrl = templateUrl === undefined ? 'template/' + directiveName + '.tmpl.html' : templateUrl;
        this.require = require === undefined ? '^gantt' : require;
        this.restrict = restrict === undefined ? 'E' : restrict;
        this.scope = false;
        this.transclude = true;
        this.replace = true;
    }

    (0, _createClass3.default)(GanttDirectiveBuilder, [{
        key: 'build',
        value: function build() {
            var directiveName = this.directiveName;
            var _templateUrl = this.templateUrl;
            var controllerFunction = this.controller;
            var directive = {
                restrict: this.restrict,
                require: this.require,
                transclude: this.transclude,
                replace: this.replace,
                scope: this.scope,
                templateUrl: function templateUrl(tElement, tAttrs) {
                    if (tAttrs.templateUrl !== undefined) {
                        _templateUrl = tAttrs.templateUrl;
                    }
                    if (tAttrs.template !== undefined) {
                        GanttDirectiveBuilder.$templateCache.put(_templateUrl, tAttrs.template);
                    }
                    return _templateUrl;
                },
                compile: function compile() {
                    return {
                        pre: function preLink(scope, iElement, iAttrs, controller) {
                            scope.gantt.api.directives.raise.preLink(directiveName, scope, iElement, iAttrs, controller);
                        },
                        post: function postLink(scope, iElement, iAttrs, controller) {
                            scope.gantt.api.directives.raise.postLink(directiveName, scope, iElement, iAttrs, controller);
                        }
                    };
                },
                controller: ["$scope", "$element", "$attrs", function controller($scope, $element, $attrs) {
                    'ngInject';

                    var controller = this;
                    if (controllerFunction !== undefined) {
                        controllerFunction($scope, $element, $attrs, controller);
                    }
                    $scope.gantt.api.directives.raise.controller(directiveName, $scope, $element, $attrs, controller);
                    $scope.$on('$destroy', function () {
                        $scope.gantt.api.directives.raise.destroy(directiveName, $scope, $element, $attrs, controller);
                    });
                    $scope.$applyAsync(function () {
                        $scope.gantt.api.directives.raise.new(directiveName, $scope, $element, $attrs, controller);
                    });
                }]
            };
            if (!_templateUrl) {
                delete directive.templateUrl;
                delete directive.replace;
                delete directive.transclude;
            }
            return directive;
        }
    }]);
    return GanttDirectiveBuilder;
}();

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttDom = function () {
    GanttDom.$inject = ["$document"];
    function GanttDom($document) {
        'ngInject';

        (0, _classCallCheck3.default)(this, GanttDom);
        this.$document = $document;
    }

    (0, _createClass3.default)(GanttDom, [{
        key: 'elementFromPoint',
        value: function elementFromPoint(x, y) {
            return this.$document[0].elementFromPoint(x, y);
        }
    }, {
        key: 'elementsFromPoint',
        value: function elementsFromPoint(x, y, depth) {
            var elements = [];
            var previousPointerEvents = [];
            var cDepth = 0;
            var current = void 0;
            var i = void 0;
            var l = void 0;
            var d = void 0;

            while ((current = this.elementFromPoint(x, y)) && elements.indexOf(current) === -1 && current !== null && (depth === undefined || cDepth < depth)) {
                elements.push(current);
                previousPointerEvents.push({
                    value: current.style.getPropertyValue('visibility'),
                    priority: current.style.getPropertyPriority('visibility')
                });

                current.style.setProperty('visibility', 'hidden', 'important');
                cDepth++;
            }

            for (i = 0, l = previousPointerEvents.length; i < l; i++) {
                d = previousPointerEvents[i];
                elements[i].style.setProperty('visibility', d.value ? d.value : '', d.priority);
            }
            return elements;
        }
    }, {
        key: 'findElementFromPoint',
        value: function findElementFromPoint(x, y, checkFunction) {
            var elements = [];
            var previousPointerEvents = [];
            var cDepth = 0;
            var current = void 0;
            var found = void 0;
            var i = void 0;
            var l = void 0;
            var d = void 0;

            while ((current = this.elementFromPoint(x, y)) && elements.indexOf(current) === -1 && current !== null) {
                elements.push(current);
                previousPointerEvents.push({
                    value: current.style.getPropertyValue('visibility'),
                    priority: current.style.getPropertyPriority('visibility')
                });

                current.style.setProperty('visibility', 'hidden', 'important');
                cDepth++;
                if (checkFunction(current)) {
                    found = current;
                    break;
                }
            }

            for (i = 0, l = previousPointerEvents.length; i < l; i++) {
                d = previousPointerEvents[i];
                elements[i].style.setProperty('visibility', d.value ? d.value : '', d.priority);
            }
            return found;
        }
    }, {
        key: 'isElementVisible',
        value: function isElementVisible(element) {
            return element.offsetParent !== undefined && element.offsetParent !== null;
        }
    }]);
    return GanttDom;
}();

exports.default = GanttDom;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["$injector", function ($injector) {
    'ngInject';

    var ngAnimate = void 0;
    try {
        ngAnimate = $injector.get('$animate');
    } catch (e) {}
    if (ngAnimate !== undefined) {
        return function (element, enabled) {
            if (_angular2.default.version.major >= 1 && _angular2.default.version.minor >= 4) {
                ngAnimate.enabled(element, enabled);
            } else {
                ngAnimate.enabled(enabled, element);
            }
        };
    } else {
        return function () {};
    }
}];

var _angular = __webpack_require__(2);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = ["$compile", function ($compile) {
    'ngInject';

    return {
        restrict: 'A',
        require: '^gantt',
        link: function link(scope, element, attrs, ganttCtrl) {
            scope.scope = ganttCtrl.gantt.$scope.$parent;
            scope.$watch(function () {
                return scope.$eval(attrs.ganttBindCompileHtml);
            }, function (value) {
                element.html(value);
                $compile(element.contents())(scope);
            });
        }
    };
}];

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = __webpack_require__(4);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttLayout = function () {
    GanttLayout.$inject = ["$document"];
    function GanttLayout($document) {
        'ngInject';

        (0, _classCallCheck3.default)(this, GanttLayout);
        this.$document = $document;
    }

    (0, _createClass3.default)(GanttLayout, [{
        key: 'getScrollBarWidth',
        value: function getScrollBarWidth() {
            var inner = this.$document[0].createElement('p');
            inner.style.width = '100%';
            inner.style.height = '200px';
            var outer = this.$document[0].createElement('div');
            outer.style.position = 'absolute';
            outer.style.top = '0px';
            outer.style.left = '0px';
            outer.style.visibility = 'hidden';
            outer.style.width = '200px';
            outer.style.height = '150px';
            outer.style.overflow = 'hidden';
            outer.appendChild(inner);
            this.$document[0].body.appendChild(outer);
            var w1 = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            var w2 = inner.offsetWidth;
            if (w1 === w2) {
                w2 = outer.clientWidth;
            }
            this.$document[0].body.removeChild(outer);
            return w1 - w2;
        }
    }, {
        key: 'getScrollBarHeight',
        value: function getScrollBarHeight() {
            var inner = this.$document[0].createElement('p');
            inner.style.width = '200px;';
            inner.style.height = '100%';
            var outer = this.$document[0].createElement('div');
            outer.style.position = 'absolute';
            outer.style.top = '0px';
            outer.style.left = '0px';
            outer.style.visibility = 'hidden';
            outer.style.width = '150px';
            outer.style.height = '200px';
            outer.style.overflow = 'hidden';
            outer.appendChild(inner);
            this.$document[0].body.appendChild(outer);
            var h1 = inner.offsetHeight;
            outer.style.overflow = 'scroll';
            var h2 = inner.offsetHeight;
            if (h1 === h2) {
                h2 = outer.clientHeight;
            }
            this.$document[0].body.removeChild(outer);
            return h1 - h2;
        }
    }, {
        key: 'setColumnsWidthFactor',
        value: function setColumnsWidthFactor(columns, widthFactor) {
            var originalLeftOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            if (!columns) {
                return;
            }
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(columns), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var column = _step.value;

                    column.left = widthFactor * (column.originalSize.left + originalLeftOffset) - originalLeftOffset;
                    column.width = widthFactor * column.originalSize.width;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = (0, _getIterator3.default)(column.timeFrames), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var timeFrame = _step2.value;

                            timeFrame.left = widthFactor * timeFrame.originalSize.left;
                            timeFrame.width = widthFactor * timeFrame.originalSize.width;
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }]);
    return GanttLayout;
}();

exports.default = GanttLayout;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttMouseButton = function () {
    function GanttMouseButton() {
        (0, _classCallCheck3.default)(this, GanttMouseButton);
    }

    (0, _createClass3.default)(GanttMouseButton, [{
        key: "getButton",
        value: function getButton(e) {
            e = e || window.event;
            if (!e.which) {
                if (e.button === undefined) {
                    return 1;
                }
                return e.button < 2 ? 1 : e.button === 4 ? 2 : 3;
            } else {
                return e.which;
            }
        }
    }]);
    return GanttMouseButton;
}();

exports.default = GanttMouseButton;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttMouseOffset = function () {
    function GanttMouseOffset() {
        (0, _classCallCheck3.default)(this, GanttMouseOffset);
    }

    (0, _createClass3.default)(GanttMouseOffset, [{
        key: "getTouch",
        value: function getTouch(evt) {
            if (evt.touches !== undefined) {
                return evt.touches[0];
            }
            return evt;
        }
    }, {
        key: "getOffset",
        value: function getOffset(evt) {
            if (evt.offsetX && evt.offsetY) {
                return { x: evt.offsetX, y: evt.offsetY };
            }
            if (evt.layerX && evt.layerY) {
                return { x: evt.layerX, y: evt.layerY };
            }
            return this.getOffsetForElement(evt.target, evt);
        }
    }, {
        key: "getOffsetForElement",
        value: function getOffsetForElement(el, evt) {
            var bb = el.getBoundingClientRect();
            return { x: evt.clientX - bb.left, y: evt.clientY - bb.top };
        }
    }]);
    return GanttMouseOffset;
}();

exports.default = GanttMouseOffset;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GanttSmartEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = function () {
    'ngInject';

    return GanttSmartEvent;
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GanttSmartEvent = exports.GanttSmartEvent = function () {
    function GanttSmartEvent($scope, $element, event, fn) {
        var _this = this;

        (0, _classCallCheck3.default)(this, GanttSmartEvent);

        this.$element = $element;
        this.event = event;
        this.fn = fn;
        $scope.$on('$destroy', function () {
            _this.$element.unbind(_this.event, _this.fn);
        });
    }

    (0, _createClass3.default)(GanttSmartEvent, [{
        key: 'bindOnce',
        value: function bindOnce() {
            this.$element.one(this.event, this.fn);
        }
    }, {
        key: 'bind',
        value: function bind() {
            this.$element.bind(this.event, this.fn);
        }
    }, {
        key: 'unbind',
        value: function unbind() {
            this.$element.unbind(this.event, this.fn);
        }
    }]);
    return GanttSmartEvent;
}();

/***/ }),
/* 124 */
/***/ (function(module, exports) {

var path = 'template/gantt.tmpl.html';
var html = "<div class=\"gantt unselectable\" ng-cloak gantt-scroll-manager gantt-container-height-listener=ganttContainerHeight gantt-container-width-listener=ganttContainerWidth gantt-element-height-listener=ganttElementHeight gantt-element-width-listener=ganttElementWidth> <gantt-side> <gantt-side-background> </gantt-side-background> <gantt-side-content> </gantt-side-content> <div gantt-resizer=gantt.side.$element gantt-resizer-event-topic=side gantt-resizer-enabled=\"{{$parent.gantt.options.value('allowSideResizing')}}\" resizer-width=sideWidth class=gantt-resizer> <div ng-show=\"$parent.gantt.options.value('allowSideResizing')\" class=gantt-resizer-display></div> </div> </gantt-side> <gantt-scrollable-header> <gantt-header gantt-element-height-listener=$parent.ganttHeaderHeight> <gantt-header-columns> <div ng-repeat=\"header in gantt.columnsManager.visibleHeaders track by $index\"> <div class=gantt-header-row ng-class=\"{'gantt-header-row-last': $last, 'gantt-header-row-first': $first}\"> <gantt-column-header ng-repeat=\"column in header\"></gantt-column-header> </div> </div> </gantt-header-columns> </gantt-header> </gantt-scrollable-header> <gantt-scrollable> <gantt-body> <gantt-body-background> <gantt-row-background ng-repeat=\"row in gantt.rowsManager.visibleRows track by row.model.id\"></gantt-row-background> </gantt-body-background> <gantt-body-foreground> <div class=gantt-current-date-line ng-show=\"currentDate === 'line' && gantt.currentDateManager.position >= 0 && gantt.currentDateManager.position <= gantt.width\" ng-style=\"{'left': gantt.currentDateManager.position + 'px' }\"></div> </gantt-body-foreground> <gantt-body-columns> <gantt-column ng-repeat=\"column in gantt.columnsManager.visibleColumns\"> <gantt-time-frame ng-repeat=\"timeFrame in column.visibleTimeFrames\"></gantt-time-frame> </gantt-column> </gantt-body-columns> <div ng-if=\"gantt.columnsManager.visibleColumns == 0\" style=background-color:grey></div> <gantt-body-rows> <gantt-timespan ng-repeat=\"timespan in gantt.timespansManager.timespans track by timespan.model.id\"></gantt-timespan> <gantt-row ng-repeat=\"row in gantt.rowsManager.visibleRows track by row.model.id\"> <gantt-task ng-repeat=\"task in row.visibleTasks track by task.model.id\"> </gantt-task> </gantt-row> </gantt-body-rows> </gantt-body> </gantt-scrollable> <ng-transclude></ng-transclude> <script type=text/ng-template id=template/ganttBody.tmpl.html> <div ng-transclude class=\"gantt-body\" ng-style=\"{'width': gantt.width > 0 ? gantt.width +'px' : undefined}\"></div> </script> <script type=text/ng-template id=template/ganttHeader.tmpl.html> <div ng-transclude class=\"gantt-header\"\n             ng-show=\"gantt.columnsManager.columns.length > 0 && gantt.columnsManager.headers.length > 0\"></div> </script> <script type=text/ng-template id=template/ganttSide.tmpl.html> <div ng-transclude class=\"gantt-side\" style=\"width: auto;\"></div> </script> <script type=text/ng-template id=template/ganttSideContent.tmpl.html> <div class=\"gantt-side-content\" ng-style=\"getSideCss()\">\n        </div> </script> <script type=text/ng-template id=template/ganttHeaderColumns.tmpl.html> <div ng-transclude class=\"gantt-header-columns\"\n              gantt-horizontal-scroll-receiver></div> </script> <script type=text/ng-template id=template/ganttColumnHeader.tmpl.html> <div class=\"gantt-column-header\" ng-class=\"{'gantt-column-header-last': $last, 'gantt-column-header-first': $first}\">{{::column.label}}</div> </script> <script type=text/ng-template id=template/ganttBodyBackground.tmpl.html> <div ng-transclude class=\"gantt-body-background\"></div> </script> <script type=text/ng-template id=template/ganttBodyForeground.tmpl.html> <div ng-transclude class=\"gantt-body-foreground\"></div> </script> <script type=text/ng-template id=template/ganttBodyColumns.tmpl.html> <div ng-transclude class=\"gantt-body-columns\"></div> </script> <script type=text/ng-template id=template/ganttColumn.tmpl.html> <div ng-transclude class=\"gantt-column gantt-foreground-col\" ng-class=\"{'gantt-column-last': $last, 'gantt-column-first': $first}\"></div> </script> <script type=text/ng-template id=template/ganttTimeFrame.tmpl.html> <div class=\"gantt-timeframe\"></div> </script> <script type=text/ng-template id=template/ganttScrollable.tmpl.html> <div ng-transclude class=\"gantt-scrollable\" gantt-scroll-sender ng-style=\"getScrollableCss()\"></div> </script> <script type=text/ng-template id=template/ganttScrollableHeader.tmpl.html> <div ng-transclude class=\"gantt-scrollable-header\" ng-style=\"getScrollableHeaderCss()\"></div> </script> <script type=text/ng-template id=template/ganttBodyRows.tmpl.html> <div ng-transclude class=\"gantt-body-rows\"></div> </script> <script type=text/ng-template id=template/ganttTimespan.tmpl.html> <div class=\"gantt-timespan\" ng-class=\"timespan.model.classes\">\n        </div> </script> <script type=text/ng-template id=template/ganttTask.tmpl.html> <div class=\"gantt-task\" ng-class=\"task.model.classes\">\n            <gantt-task-background></gantt-task-background>\n            <gantt-task-foreground></gantt-task-foreground>\n            <gantt-task-content></gantt-task-content>\n        </div> </script> <script type=text/ng-template id=template/ganttTaskBackground.tmpl.html> <div class=\"gantt-task-background\" ng-style=\"{'background-color': task.model.color}\"></div> </script> <script type=text/ng-template id=template/ganttTaskForeground.tmpl.html> <div class=\"gantt-task-foreground\">\n            <div ng-if=\"task.truncatedRight\" class=\"gantt-task-truncated-right\" ng-style=\"{'padding-right': task.truncatedRightOffset + 'px'}\">&gt;</div>\n            <div ng-if=\"task.truncatedLeft\" class=\"gantt-task-truncated-left\" ng-style=\"{'padding-left': task.truncatedLeftOffset + 'px'}\">&lt;</div>\n        </div> </script> <script type=text/ng-template id=template/ganttTaskContent.tmpl.html> <div class=\"gantt-task-content\" unselectable=\"on\"><span unselectable=\"on\" gantt-bind-compile-html=\"getTaskContent()\"/></div> </script> <script type=text/ng-template id=template/ganttRowBackground.tmpl.html> <div class=\"gantt-row gantt-row-height\"\n             ng-class=\"row.model.classes\"\n             ng-class-odd=\"'gantt-row-odd'\"\n             ng-class-even=\"'gantt-row-even'\"\n             ng-style=\"{'height': row.model.height}\">\n            <div class=\"gantt-row-background\"\n                 ng-style=\"{'background-color': row.model.color}\">\n            </div>\n        </div> </script> <script type=text/ng-template id=template/ganttRow.tmpl.html> <div class=\"gantt-row gantt-row-height\"\n             ng-class=\"row.model.classes\"\n             ng-class-odd=\"'gantt-row-odd'\"\n             ng-class-even=\"'gantt-row-even'\"\n             ng-style=\"{'height': row.model.height}\">\n            <div ng-transclude class=\"gantt-row-content\"></div>\n        </div> </script> <script type=text/ng-template id=template/ganttSideBackground.tmpl.html> <div class=\"gantt-side-background\">\n            <div class=\"gantt-side-background-header\" ng-style=\"{height: $parent.ganttHeaderHeight + 'px'}\">\n                <div ng-show=\"$parent.ganttHeaderHeight\" class=\"gantt-header-row gantt-side-header-row\"></div>\n            </div>\n            <div class=\"gantt-side-background-body\" ng-style=\"getMaxHeightCss()\">\n                <div gantt-vertical-scroll-receiver>\n                    <div class=\"gantt-row gantt-row-height \"\n                         ng-class-odd=\"'gantt-row-odd'\"\n                         ng-class-even=\"'gantt-row-even'\"\n                         ng-class=\"row.model.classes\"\n                         ng-repeat=\"row in gantt.rowsManager.visibleRows track by row.model.id\"\n                         ng-style=\"{'height': row.model.height}\">\n                        <div class=\"gantt-row-label gantt-row-background\"\n                             ng-style=\"{'background-color': row.model.color}\">\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div> </script> </div> ";
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(134), __esModule: true };

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(135), __esModule: true };

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(136), __esModule: true };

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(137), __esModule: true };

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(138), __esModule: true };

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(139), __esModule: true };

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(128);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(125);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(5);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(5);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(62);
__webpack_require__(61);
module.exports = __webpack_require__(160);

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(162);
var $Object = __webpack_require__(7).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(163);
var $Object = __webpack_require__(7).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(164);
module.exports = __webpack_require__(7).Object.getPrototypeOf;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(165);
module.exports = __webpack_require__(7).Object.setPrototypeOf;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(167);
__webpack_require__(166);
__webpack_require__(168);
__webpack_require__(169);
module.exports = __webpack_require__(7).Symbol;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(61);
__webpack_require__(62);
module.exports = __webpack_require__(36).f('iterator');

/***/ }),
/* 140 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 141 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(13)
  , toLength  = __webpack_require__(158)
  , toIndex   = __webpack_require__(157);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(24)
  , TAG = __webpack_require__(9)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(20)
  , gOPS    = __webpack_require__(56)
  , pIE     = __webpack_require__(29);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8).document && document.documentElement;

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(24);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(24);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(28)
  , descriptor     = __webpack_require__(21)
  , setToStringTag = __webpack_require__(30)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(16)(IteratorPrototype, __webpack_require__(9)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 149 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(20)
  , toIObject = __webpack_require__(13);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(22)('meta')
  , isObject = __webpack_require__(18)
  , has      = __webpack_require__(11)
  , setDesc  = __webpack_require__(12).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(17)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(12)
  , anObject = __webpack_require__(14)
  , getKeys  = __webpack_require__(20);

module.exports = __webpack_require__(10) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(13)
  , gOPN      = __webpack_require__(55).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(15)
  , core    = __webpack_require__(7)
  , fails   = __webpack_require__(17);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(18)
  , anObject = __webpack_require__(14);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(50)(Function.call, __webpack_require__(54).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(33)
  , defined   = __webpack_require__(25);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(33)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(33)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(143)
  , ITERATOR  = __webpack_require__(9)('iterator')
  , Iterators = __webpack_require__(19);
module.exports = __webpack_require__(7).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(14)
  , get      = __webpack_require__(159);
module.exports = __webpack_require__(7).getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(141)
  , step             = __webpack_require__(149)
  , Iterators        = __webpack_require__(19)
  , toIObject        = __webpack_require__(13);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(53)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(15)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(28)});

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(15);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(10), 'Object', {defineProperty: __webpack_require__(12).f});

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(60)
  , $getPrototypeOf = __webpack_require__(57);

__webpack_require__(154)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(15);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(155).set});

/***/ }),
/* 166 */
/***/ (function(module, exports) {



/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(8)
  , has            = __webpack_require__(11)
  , DESCRIPTORS    = __webpack_require__(10)
  , $export        = __webpack_require__(15)
  , redefine       = __webpack_require__(59)
  , META           = __webpack_require__(151).KEY
  , $fails         = __webpack_require__(17)
  , shared         = __webpack_require__(32)
  , setToStringTag = __webpack_require__(30)
  , uid            = __webpack_require__(22)
  , wks            = __webpack_require__(9)
  , wksExt         = __webpack_require__(36)
  , wksDefine      = __webpack_require__(35)
  , keyOf          = __webpack_require__(150)
  , enumKeys       = __webpack_require__(144)
  , isArray        = __webpack_require__(147)
  , anObject       = __webpack_require__(14)
  , toIObject      = __webpack_require__(13)
  , toPrimitive    = __webpack_require__(34)
  , createDesc     = __webpack_require__(21)
  , _create        = __webpack_require__(28)
  , gOPNExt        = __webpack_require__(153)
  , $GOPD          = __webpack_require__(54)
  , $DP            = __webpack_require__(12)
  , $keys          = __webpack_require__(20)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(55).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(29).f  = $propertyIsEnumerable;
  __webpack_require__(56).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(27)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(16)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35)('asyncIterator');

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35)('observable');

/***/ })
/******/ ]);
});
//# sourceMappingURL=angular-gantt-core.js.map