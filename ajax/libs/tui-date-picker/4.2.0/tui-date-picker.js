/*!
 * TOAST UI Date Picker
 * @version 4.2.0
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tui-time-picker"));
	else if(typeof define === 'function' && define.amd)
		define(["tui-time-picker"], factory);
	else if(typeof exports === 'object')
		exports["DatePicker"] = factory(require("tui-time-picker"));
	else
		root["tui"] = root["tui"] || {}, root["tui"]["DatePicker"] = factory(root["tui"]["TimePicker"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__43__) {
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview
 * This module provides a function to make a constructor
 * that can inherit from the other constructors like the CLASS easily.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var inherit = __webpack_require__(35);
var extend = __webpack_require__(7);

/**
 * @module defineClass
 */

/**
 * Help a constructor to be defined and to inherit from the other constructors
 * @param {*} [parent] Parent constructor
 * @param {Object} props Members of constructor
 *  @param {Function} props.init Initialization method
 *  @param {Object} [props.static] Static members of constructor
 * @returns {*} Constructor
 * @memberof module:defineClass
 * @example
 * var defineClass = require('tui-code-snippet/defineClass/defineClass'); // node, commonjs
 *
 * //-- #2. Use property --//
 * var Parent = defineClass({
 *     init: function() { // constuructor
 *         this.name = 'made by def';
 *     },
 *     method: function() {
 *         // ...
 *     },
 *     static: {
 *         staticMethod: function() {
 *              // ...
 *         }
 *     }
 * });
 *
 * var Child = defineClass(Parent, {
 *     childMethod: function() {}
 * });
 *
 * Parent.staticMethod();
 *
 * var parentInstance = new Parent();
 * console.log(parentInstance.name); //made by def
 * parentInstance.staticMethod(); // Error
 *
 * var childInstance = new Child();
 * childInstance.method();
 * childInstance.childMethod();
 */
function defineClass(parent, props) {
  var obj;

  if (!props) {
    props = parent;
    parent = null;
  }

  obj = props.init || function() {};

  if (parent) {
    inherit(obj, parent);
  }

  if (props.hasOwnProperty('static')) {
    extend(obj, props['static']);
    delete props['static'];
  }

  extend(obj.prototype, props);

  return obj;
}

module.exports = defineClass;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Constants of date-picker
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */



module.exports = {
  TYPE_DATE: 'date',
  TYPE_MONTH: 'month',
  TYPE_YEAR: 'year',
  TYPE_HOUR: 'hour',
  TYPE_MINUTE: 'minute',
  TYPE_MERIDIEM: 'meridiem',
  MIN_DATE: new Date(1900, 0, 1),
  MAX_DATE: new Date(2999, 11, 31),

  DEFAULT_LANGUAGE_TYPE: 'en',

  CLASS_NAME_SELECTED: 'tui-is-selected',

  CLASS_NAME_PREV_MONTH_BTN: 'tui-calendar-btn-prev-month',
  CLASS_NAME_PREV_YEAR_BTN: 'tui-calendar-btn-prev-year',
  CLASS_NAME_NEXT_YEAR_BTN: 'tui-calendar-btn-next-year',
  CLASS_NAME_NEXT_MONTH_BTN: 'tui-calendar-btn-next-month',

  DEFAULT_WEEK_START_DAY: 'Sun',
  WEEK_START_DAY_MAP: {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6
  }
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Execute the provided callback once for each element present in the array(or Array-like object) in ascending order.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Execute the provided callback once for each element present
 * in the array(or Array-like object) in ascending order.
 * If the callback function returns false, the loop will be stopped.
 * Callback function(iteratee) is invoked with three arguments:
 *  1) The value of the element
 *  2) The index of the element
 *  3) The array(or Array-like object) being traversed
 * @param {Array|Arguments|NodeList} arr The array(or Array-like object) that will be traversed
 * @param {function} iteratee Callback function
 * @param {Object} [context] Context(this) of callback function
 * @memberof module:collection
 * @example
 * var forEachArray = require('tui-code-snippet/collection/forEachArray'); // node, commonjs
 *
 * var sum = 0;
 *
 * forEachArray([1,2,3], function(value){
 *     sum += value;
 * });
 * alert(sum); // 6
 */
function forEachArray(arr, iteratee, context) {
  var index = 0;
  var len = arr.length;

  context = context || null;

  for (; index < len; index += 1) {
    if (iteratee.call(context, arr[index], index, arr) === false) {
      break;
    }
  }
}

module.exports = forEachArray;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable complexity */
/**
 * @fileoverview Returns the first index at which a given element can be found in the array.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isArray = __webpack_require__(6);

/**
 * @module array
 */

/**
 * Returns the first index at which a given element can be found in the array
 * from start index(default 0), or -1 if it is not present.
 * It compares searchElement to elements of the Array using strict equality
 * (the same method used by the ===, or triple-equals, operator).
 * @param {*} searchElement Element to locate in the array
 * @param {Array} array Array that will be traversed.
 * @param {number} startIndex Start index in array for searching (default 0)
 * @returns {number} the First index at which a given element, or -1 if it is not present
 * @memberof module:array
 * @example
 * var inArray = require('tui-code-snippet/array/inArray'); // node, commonjs
 *
 * var arr = ['one', 'two', 'three', 'four'];
 * var idx1 = inArray('one', arr, 3); // -1
 * var idx2 = inArray('one', arr); // 0
 */
function inArray(searchElement, array, startIndex) {
  var i;
  var length;
  startIndex = startIndex || 0;

  if (!isArray(array)) {
    return -1;
  }

  if (Array.prototype.indexOf) {
    return Array.prototype.indexOf.call(array, searchElement, startIndex);
  }

  length = array.length;
  for (i = startIndex; startIndex >= 0 && i < length; i += 1) {
    if (array[i] === searchElement) {
      return i;
    }
  }

  return -1;
}

module.exports = inArray;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Utils for Datepicker component
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */



var forEachArray = __webpack_require__(2);
var isHTMLNode = __webpack_require__(46);
var sendHostname = __webpack_require__(47);

var currentId = 0;

var utils = {
  /**
   * Get a target element
   * @param {Event} ev Event object
   * @returns {HTMLElement} An event target element
   */
  getTarget: function(ev) {
    return ev.target || ev.srcElement;
  },

  /**
   * Return the same element with an element or a matched element searched by a selector.
   * @param {HTMLElement|string} param HTMLElement or selector
   * @returns {HTMLElement} A matched element
   */
  getElement: function(param) {
    return isHTMLNode(param) ? param : document.querySelector(param);
  },

  /**
   * Get a selector of the element.
   * @param {HTMLElement} elem An element
   * @returns {string}
   */
  getSelector: function(elem) {
    var selector = '';
    if (elem.id) {
      selector = '#' + elem.id;
    } else if (elem.className) {
      selector = '.' + elem.className.split(' ')[0];
    }

    return selector;
  },

  /**
   * Create an unique id.
   * @returns {number}
   */
  generateId: function() {
    currentId += 1;

    return currentId;
  },

  /**
   * Create a new array with all elements that pass the test implemented by the provided function.
   * @param {Array} arr - Array that will be traversed
   * @param {function} iteratee - iteratee callback function
   * @returns {Array}
   */
  filter: function(arr, iteratee) {
    var result = [];

    forEachArray(arr, function(item) {
      if (iteratee(item)) {
        result.push(item);
      }
    });

    return result;
  },

  /**
   * Send hostname for GA
   * @ignore
   */
  sendHostName: function() {
    sendHostname('date-picker', 'UA-129987462-1');
  }
};

module.exports = utils;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Utils for DatePicker component
 * @author NHN. FE dev Lab. <dl_javascript@nhn.com>
 */



var isDate = __webpack_require__(28);
var isNumber = __webpack_require__(15);

var constants = __webpack_require__(1);

var TYPE_DATE = constants.TYPE_DATE;
var TYPE_MONTH = constants.TYPE_MONTH;
var TYPE_YEAR = constants.TYPE_YEAR;

/**
 * Utils of calendar
 * @namespace dateUtil
 * @ignore
 */
var utils = {
  /**
   * Get weeks count by paramenter
   * @param {number} year A year
   * @param {number} month A month
   * @returns {number} Weeks count (4~6)
   **/
  getWeeksCount: function(year, month) {
    var firstDay = utils.getFirstDay(year, month),
      lastDate = utils.getLastDayInMonth(year, month);

    return Math.ceil((firstDay + lastDate) / 7);
  },

  /**
   * @param {Date} date - Date instance
   * @returns {boolean}
   */
  isValidDate: function(date) {
    return isDate(date) && !isNaN(date.getTime());
  },

  /**
   * Get which day is first by parameters that include year and month information.
   * @param {number} year A year
   * @param {number} month A month
   * @returns {number} (0~6)
   */
  getFirstDay: function(year, month) {
    return new Date(year, month - 1, 1).getDay();
  },

  /**
   * Get timestamp of the first day.
   * @param {number} year A year
   * @param {number} month A month
   * @returns {number} timestamp
   */
  getFirstDayTimestamp: function(year, month) {
    return new Date(year, month, 1).getTime();
  },

  /**
   * Get last date by parameters that include year and month information.
   * @param {number} year A year
   * @param {number} month A month
   * @returns {number} (1~31)
   */
  getLastDayInMonth: function(year, month) {
    return new Date(year, month, 0).getDate();
  },

  /**
   * Chagne number 0~9 to '00~09'
   * @param {number} number number
   * @returns {string}
   * @example
   *  dateUtil.prependLeadingZero(0); //  '00'
   *  dateUtil.prependLeadingZero(9); //  '09'
   *  dateUtil.prependLeadingZero(12); //  '12'
   */
  prependLeadingZero: function(number) {
    var prefix = '';

    if (number < 10) {
      prefix = '0';
    }

    return prefix + number;
  },

  /**
   * Get meridiem hour
   * @param {number} hour - Original hour
   * @returns {number} Converted meridiem hour
   */
  getMeridiemHour: function(hour) {
    hour %= 12;

    if (hour === 0) {
      hour = 12;
    }

    return hour;
  },

  /**
   * Returns number or default
   * @param {*} any - Any value
   * @param {number} defaultNumber - Default number
   * @throws Will throw an error if the defaultNumber is invalid.
   * @returns {number}
   */
  getSafeNumber: function(any, defaultNumber) {
    if (isNaN(defaultNumber) || !isNumber(defaultNumber)) {
      throw Error('The defaultNumber must be a valid number.');
    }
    if (isNaN(any)) {
      return defaultNumber;
    }

    return Number(any);
  },

  /**
   * Return date of the week
   * @param {number} year - Year
   * @param {number} month - Month
   * @param {number} weekNumber - Week number (0~5)
   * @param {number} dayNumber - Day number (0: sunday, 1: monday, ....)
   * @returns {number}
   */
  getDateOfWeek: function(year, month, weekNumber, dayNumber) {
    var firstDayOfMonth = new Date(year, month - 1).getDay();
    var dateOffset = firstDayOfMonth - dayNumber - 1;

    return new Date(year, month - 1, weekNumber * 7 - dateOffset);
  },

  /**
   * Returns range arr
   * @param {number} start - Start value
   * @param {number} end - End value
   * @returns {Array}
   */
  getRangeArr: function(start, end) {
    var arr = [];
    var i;

    if (start > end) {
      for (i = end; i >= start; i -= 1) {
        arr.push(i);
      }
    } else {
      for (i = start; i <= end; i += 1) {
        arr.push(i);
      }
    }

    return arr;
  },

  /**
   * Returns cloned date with the start of a unit of time
   * @param {Date|number} date - Original date
   * @param {string} [type = TYPE_DATE] - Unit type
   * @throws {Error}
   * @returns {Date}
   */
  cloneWithStartOf: function(date, type) {
    type = type || TYPE_DATE;
    date = new Date(date);

    // Does not consider time-level yet.
    date.setHours(0, 0, 0, 0);

    switch (type) {
      case TYPE_DATE:
        break;
      case TYPE_MONTH:
        date.setDate(1);
        break;
      case TYPE_YEAR:
        date.setMonth(0, 1);
        break;
      default:
        throw Error('Unsupported type: ' + type);
    }

    return date;
  },

  /**
   * Returns cloned date with the end of a unit of time
   * @param {Date|number} date - Original date
   * @param {string} [type = TYPE_DATE] - Unit type
   * @throws {Error}
   * @returns {Date}
   */
  cloneWithEndOf: function(date, type) {
    type = type || TYPE_DATE;
    date = new Date(date);

    // Does not consider time-level yet.
    date.setHours(23, 59, 59, 999);

    switch (type) {
      case TYPE_DATE:
        break;
      case TYPE_MONTH:
        date.setMonth(date.getMonth() + 1, 0);
        break;
      case TYPE_YEAR:
        date.setMonth(11, 31);
        break;
      default:
        throw Error('Unsupported type: ' + type);
    }

    return date;
  },

  /**
   * Compare two dates
   * @param {Date|number} dateA - Date
   * @param {Date|number} dateB - Date
   * @param {string} [cmpLevel] - Comparing level
   * @returns {number}
   */
  compare: function(dateA, dateB, cmpLevel) {
    var aTimestamp, bTimestamp;

    if (!(utils.isValidDate(dateA) && utils.isValidDate(dateB))) {
      return NaN;
    }

    if (!cmpLevel) {
      aTimestamp = dateA.getTime();
      bTimestamp = dateB.getTime();
    } else {
      aTimestamp = utils.cloneWithStartOf(dateA, cmpLevel).getTime();
      bTimestamp = utils.cloneWithStartOf(dateB, cmpLevel).getTime();
    }

    if (aTimestamp > bTimestamp) {
      return 1;
    }

    return aTimestamp === bTimestamp ? 0 : -1;
  },

  /**
   * Returns whether two dates are same
   * @param {Date|number} dateA - Date
   * @param {Date|number} dateB - Date
   * @param {string} [cmpLevel] - Comparing level
   * @returns {boolean}
   */
  isSame: function(dateA, dateB, cmpLevel) {
    return utils.compare(dateA, dateB, cmpLevel) === 0;
  },

  /**
   * Returns whether the target is in range
   * @param {Date|number} start - Range start
   * @param {Date|number} end - Range end
   * @param {Date|number} target - Target
   * @param {string} [cmpLevel = TYPE_DATE] - Comparing level
   * @returns {boolean}
   */
  inRange: function(start, end, target, cmpLevel) {
    return utils.compare(start, target, cmpLevel) < 1 && utils.compare(end, target, cmpLevel) > -1;
  }
};

module.exports = utils;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check whether the given variable is an instance of Array or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is an instance of Array or not.
 * If the given variable is an instance of Array, return true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is array instance?
 * @memberof module:type
 */
function isArray(obj) {
  return obj instanceof Array;
}

module.exports = isArray;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Extend the target object from other objects.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * @module object
 */

/**
 * Extend the target object from other objects.
 * @param {object} target - Object that will be extended
 * @param {...object} objects - Objects as sources
 * @returns {object} Extended object
 * @memberof module:object
 */
function extend(target, objects) { // eslint-disable-line no-unused-vars
  var hasOwnProp = Object.prototype.hasOwnProperty;
  var source, prop, i, len;

  for (i = 1, len = arguments.length; i < len; i += 1) {
    source = arguments[i];
    for (prop in source) {
      if (hasOwnProp.call(source, prop)) {
        target[prop] = source[prop];
      }
    }
  }

  return target;
}

module.exports = extend;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview This module provides some functions for custom events. And it is implemented in the observer design pattern.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var extend = __webpack_require__(7);
var isExisty = __webpack_require__(37);
var isString = __webpack_require__(13);
var isObject = __webpack_require__(22);
var isArray = __webpack_require__(6);
var isFunction = __webpack_require__(39);
var forEach = __webpack_require__(9);

var R_EVENTNAME_SPLIT = /\s+/g;

/**
 * @class
 * @example
 * // node, commonjs
 * var CustomEvents = require('tui-code-snippet/customEvents/customEvents');
 */
function CustomEvents() {
  /**
     * @type {HandlerItem[]}
     */
  this.events = null;

  /**
     * only for checking specific context event was binded
     * @type {object[]}
     */
  this.contexts = null;
}

/**
 * Mixin custom events feature to specific constructor
 * @param {function} func - constructor
 * @example
 * var CustomEvents = require('tui-code-snippet/customEvents/customEvents'); // node, commonjs
 *
 * var model;
 * function Model() {
 *     this.name = '';
 * }
 * CustomEvents.mixin(Model);
 *
 * model = new Model();
 * model.on('change', function() { this.name = 'model'; }, this);
 * model.fire('change');
 * alert(model.name); // 'model';
 */
CustomEvents.mixin = function(func) {
  extend(func.prototype, CustomEvents.prototype);
};

/**
 * Get HandlerItem object
 * @param {function} handler - handler function
 * @param {object} [context] - context for handler
 * @returns {HandlerItem} HandlerItem object
 * @private
 */
CustomEvents.prototype._getHandlerItem = function(handler, context) {
  var item = {handler: handler};

  if (context) {
    item.context = context;
  }

  return item;
};

/**
 * Get event object safely
 * @param {string} [eventName] - create sub event map if not exist.
 * @returns {(object|array)} event object. if you supplied `eventName`
 *  parameter then make new array and return it
 * @private
 */
CustomEvents.prototype._safeEvent = function(eventName) {
  var events = this.events;
  var byName;

  if (!events) {
    events = this.events = {};
  }

  if (eventName) {
    byName = events[eventName];

    if (!byName) {
      byName = [];
      events[eventName] = byName;
    }

    events = byName;
  }

  return events;
};

/**
 * Get context array safely
 * @returns {array} context array
 * @private
 */
CustomEvents.prototype._safeContext = function() {
  var context = this.contexts;

  if (!context) {
    context = this.contexts = [];
  }

  return context;
};

/**
 * Get index of context
 * @param {object} ctx - context that used for bind custom event
 * @returns {number} index of context
 * @private
 */
CustomEvents.prototype._indexOfContext = function(ctx) {
  var context = this._safeContext();
  var index = 0;

  while (context[index]) {
    if (ctx === context[index][0]) {
      return index;
    }

    index += 1;
  }

  return -1;
};

/**
 * Memorize supplied context for recognize supplied object is context or
 *  name: handler pair object when off()
 * @param {object} ctx - context object to memorize
 * @private
 */
CustomEvents.prototype._memorizeContext = function(ctx) {
  var context, index;

  if (!isExisty(ctx)) {
    return;
  }

  context = this._safeContext();
  index = this._indexOfContext(ctx);

  if (index > -1) {
    context[index][1] += 1;
  } else {
    context.push([ctx, 1]);
  }
};

/**
 * Forget supplied context object
 * @param {object} ctx - context object to forget
 * @private
 */
CustomEvents.prototype._forgetContext = function(ctx) {
  var context, contextIndex;

  if (!isExisty(ctx)) {
    return;
  }

  context = this._safeContext();
  contextIndex = this._indexOfContext(ctx);

  if (contextIndex > -1) {
    context[contextIndex][1] -= 1;

    if (context[contextIndex][1] <= 0) {
      context.splice(contextIndex, 1);
    }
  }
};

/**
 * Bind event handler
 * @param {(string|{name:string, handler:function})} eventName - custom
 *  event name or an object {eventName: handler}
 * @param {(function|object)} [handler] - handler function or context
 * @param {object} [context] - context for binding
 * @private
 */
CustomEvents.prototype._bindEvent = function(eventName, handler, context) {
  var events = this._safeEvent(eventName);
  this._memorizeContext(context);
  events.push(this._getHandlerItem(handler, context));
};

/**
 * Bind event handlers
 * @param {(string|{name:string, handler:function})} eventName - custom
 *  event name or an object {eventName: handler}
 * @param {(function|object)} [handler] - handler function or context
 * @param {object} [context] - context for binding
 * //-- #1. Get Module --//
 * var CustomEvents = require('tui-code-snippet/customEvents/customEvents'); // node, commonjs
 *
 * //-- #2. Use method --//
 * // # 2.1 Basic Usage
 * CustomEvents.on('onload', handler);
 *
 * // # 2.2 With context
 * CustomEvents.on('onload', handler, myObj);
 *
 * // # 2.3 Bind by object that name, handler pairs
 * CustomEvents.on({
 *     'play': handler,
 *     'pause': handler2
 * });
 *
 * // # 2.4 Bind by object that name, handler pairs with context object
 * CustomEvents.on({
 *     'play': handler
 * }, myObj);
 */
CustomEvents.prototype.on = function(eventName, handler, context) {
  var self = this;

  if (isString(eventName)) {
    // [syntax 1, 2]
    eventName = eventName.split(R_EVENTNAME_SPLIT);
    forEach(eventName, function(name) {
      self._bindEvent(name, handler, context);
    });
  } else if (isObject(eventName)) {
    // [syntax 3, 4]
    context = handler;
    forEach(eventName, function(func, name) {
      self.on(name, func, context);
    });
  }
};

/**
 * Bind one-shot event handlers
 * @param {(string|{name:string,handler:function})} eventName - custom
 *  event name or an object {eventName: handler}
 * @param {function|object} [handler] - handler function or context
 * @param {object} [context] - context for binding
 */
CustomEvents.prototype.once = function(eventName, handler, context) {
  var self = this;

  if (isObject(eventName)) {
    context = handler;
    forEach(eventName, function(func, name) {
      self.once(name, func, context);
    });

    return;
  }

  function onceHandler() { // eslint-disable-line require-jsdoc
    handler.apply(context, arguments);
    self.off(eventName, onceHandler, context);
  }

  this.on(eventName, onceHandler, context);
};

/**
 * Splice supplied array by callback result
 * @param {array} arr - array to splice
 * @param {function} predicate - function return boolean
 * @private
 */
CustomEvents.prototype._spliceMatches = function(arr, predicate) {
  var i = 0;
  var len;

  if (!isArray(arr)) {
    return;
  }

  for (len = arr.length; i < len; i += 1) {
    if (predicate(arr[i]) === true) {
      arr.splice(i, 1);
      len -= 1;
      i -= 1;
    }
  }
};

/**
 * Get matcher for unbind specific handler events
 * @param {function} handler - handler function
 * @returns {function} handler matcher
 * @private
 */
CustomEvents.prototype._matchHandler = function(handler) {
  var self = this;

  return function(item) {
    var needRemove = handler === item.handler;

    if (needRemove) {
      self._forgetContext(item.context);
    }

    return needRemove;
  };
};

/**
 * Get matcher for unbind specific context events
 * @param {object} context - context
 * @returns {function} object matcher
 * @private
 */
CustomEvents.prototype._matchContext = function(context) {
  var self = this;

  return function(item) {
    var needRemove = context === item.context;

    if (needRemove) {
      self._forgetContext(item.context);
    }

    return needRemove;
  };
};

/**
 * Get matcher for unbind specific hander, context pair events
 * @param {function} handler - handler function
 * @param {object} context - context
 * @returns {function} handler, context matcher
 * @private
 */
CustomEvents.prototype._matchHandlerAndContext = function(handler, context) {
  var self = this;

  return function(item) {
    var matchHandler = (handler === item.handler);
    var matchContext = (context === item.context);
    var needRemove = (matchHandler && matchContext);

    if (needRemove) {
      self._forgetContext(item.context);
    }

    return needRemove;
  };
};

/**
 * Unbind event by event name
 * @param {string} eventName - custom event name to unbind
 * @param {function} [handler] - handler function
 * @private
 */
CustomEvents.prototype._offByEventName = function(eventName, handler) {
  var self = this;
  var andByHandler = isFunction(handler);
  var matchHandler = self._matchHandler(handler);

  eventName = eventName.split(R_EVENTNAME_SPLIT);

  forEach(eventName, function(name) {
    var handlerItems = self._safeEvent(name);

    if (andByHandler) {
      self._spliceMatches(handlerItems, matchHandler);
    } else {
      forEach(handlerItems, function(item) {
        self._forgetContext(item.context);
      });

      self.events[name] = [];
    }
  });
};

/**
 * Unbind event by handler function
 * @param {function} handler - handler function
 * @private
 */
CustomEvents.prototype._offByHandler = function(handler) {
  var self = this;
  var matchHandler = this._matchHandler(handler);

  forEach(this._safeEvent(), function(handlerItems) {
    self._spliceMatches(handlerItems, matchHandler);
  });
};

/**
 * Unbind event by object(name: handler pair object or context object)
 * @param {object} obj - context or {name: handler} pair object
 * @param {function} handler - handler function
 * @private
 */
CustomEvents.prototype._offByObject = function(obj, handler) {
  var self = this;
  var matchFunc;

  if (this._indexOfContext(obj) < 0) {
    forEach(obj, function(func, name) {
      self.off(name, func);
    });
  } else if (isString(handler)) {
    matchFunc = this._matchContext(obj);

    self._spliceMatches(this._safeEvent(handler), matchFunc);
  } else if (isFunction(handler)) {
    matchFunc = this._matchHandlerAndContext(handler, obj);

    forEach(this._safeEvent(), function(handlerItems) {
      self._spliceMatches(handlerItems, matchFunc);
    });
  } else {
    matchFunc = this._matchContext(obj);

    forEach(this._safeEvent(), function(handlerItems) {
      self._spliceMatches(handlerItems, matchFunc);
    });
  }
};

/**
 * Unbind custom events
 * @param {(string|object|function)} eventName - event name or context or
 *  {name: handler} pair object or handler function
 * @param {(function)} handler - handler function
 * @example
 * //-- #1. Get Module --//
 * var CustomEvents = require('tui-code-snippet/customEvents/customEvents'); // node, commonjs
 *
 * //-- #2. Use method --//
 * // # 2.1 off by event name
 * CustomEvents.off('onload');
 *
 * // # 2.2 off by event name and handler
 * CustomEvents.off('play', handler);
 *
 * // # 2.3 off by handler
 * CustomEvents.off(handler);
 *
 * // # 2.4 off by context
 * CustomEvents.off(myObj);
 *
 * // # 2.5 off by context and handler
 * CustomEvents.off(myObj, handler);
 *
 * // # 2.6 off by context and event name
 * CustomEvents.off(myObj, 'onload');
 *
 * // # 2.7 off by an Object.<string, function> that is {eventName: handler}
 * CustomEvents.off({
 *   'play': handler,
 *   'pause': handler2
 * });
 *
 * // # 2.8 off the all events
 * CustomEvents.off();
 */
CustomEvents.prototype.off = function(eventName, handler) {
  if (isString(eventName)) {
    // [syntax 1, 2]
    this._offByEventName(eventName, handler);
  } else if (!arguments.length) {
    // [syntax 8]
    this.events = {};
    this.contexts = [];
  } else if (isFunction(eventName)) {
    // [syntax 3]
    this._offByHandler(eventName);
  } else if (isObject(eventName)) {
    // [syntax 4, 5, 6]
    this._offByObject(eventName, handler);
  }
};

/**
 * Fire custom event
 * @param {string} eventName - name of custom event
 */
CustomEvents.prototype.fire = function(eventName) {  // eslint-disable-line
  this.invoke.apply(this, arguments);
};

/**
 * Fire a event and returns the result of operation 'boolean AND' with all
 *  listener's results.
 *
 * So, It is different from {@link CustomEvents#fire}.
 *
 * In service code, use this as a before event in component level usually
 *  for notifying that the event is cancelable.
 * @param {string} eventName - Custom event name
 * @param {...*} data - Data for event
 * @returns {boolean} The result of operation 'boolean AND'
 * @example
 * var map = new Map();
 * map.on({
 *     'beforeZoom': function() {
 *         // It should cancel the 'zoom' event by some conditions.
 *         if (that.disabled && this.getState()) {
 *             return false;
 *         }
 *         return true;
 *     }
 * });
 *
 * if (this.invoke('beforeZoom')) {    // check the result of 'beforeZoom'
 *     // if true,
 *     // doSomething
 * }
 */
CustomEvents.prototype.invoke = function(eventName) {
  var events, args, index, item;

  if (!this.hasListener(eventName)) {
    return true;
  }

  events = this._safeEvent(eventName);
  args = Array.prototype.slice.call(arguments, 1);
  index = 0;

  while (events[index]) {
    item = events[index];

    if (item.handler.apply(item.context, args) === false) {
      return false;
    }

    index += 1;
  }

  return true;
};

/**
 * Return whether at least one of the handlers is registered in the given
 *  event name.
 * @param {string} eventName - Custom event name
 * @returns {boolean} Is there at least one handler in event name?
 */
CustomEvents.prototype.hasListener = function(eventName) {
  return this.getListenerLength(eventName) > 0;
};

/**
 * Return a count of events registered.
 * @param {string} eventName - Custom event name
 * @returns {number} number of event
 */
CustomEvents.prototype.getListenerLength = function(eventName) {
  var events = this._safeEvent(eventName);

  return events.length;
};

module.exports = CustomEvents;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Execute the provided callback once for each property of object(or element of array) which actually exist.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isArray = __webpack_require__(6);
var forEachArray = __webpack_require__(2);
var forEachOwnProperties = __webpack_require__(23);

/**
 * @module collection
 */

/**
 * Execute the provided callback once for each property of object(or element of array) which actually exist.
 * If the object is Array-like object(ex-arguments object), It needs to transform to Array.(see 'ex2' of example).
 * If the callback function returns false, the loop will be stopped.
 * Callback function(iteratee) is invoked with three arguments:
 *  1) The value of the property(or The value of the element)
 *  2) The name of the property(or The index of the element)
 *  3) The object being traversed
 * @param {Object} obj The object that will be traversed
 * @param {function} iteratee Callback function
 * @param {Object} [context] Context(this) of callback function
 * @memberof module:collection
 * @example
 * var forEach = require('tui-code-snippet/collection/forEach'); // node, commonjs
 *
 * var sum = 0;
 *
 * forEach([1,2,3], function(value){
 *     sum += value;
 * });
 * alert(sum); // 6
 *
 * // In case of Array-like object
 * var array = Array.prototype.slice.call(arrayLike); // change to array
 * forEach(array, function(value){
 *     sum += value;
 * });
 */
function forEach(obj, iteratee, context) {
  if (isArray(obj)) {
    forEachArray(obj, iteratee, context);
  } else {
    forEachOwnProperties(obj, iteratee, context);
  }
}

module.exports = forEach;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Default locale texts
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */



module.exports = {
  en: {
    titles: {
      DD: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      D: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      MMM: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      MMMM: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    },
    titleFormat: 'MMMM yyyy',
    todayFormat: 'To\\d\\ay: DD, MMMM d, yyyy',
    time: 'Time',
    date: 'Date'
  },
  ko: {
    titles: {
      DD: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      D: ['일', '월', '화', '수', '목', '금', '토'],
      MMM: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      MMMM: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
    },
    titleFormat: 'yyyy.MM',
    todayFormat: '오늘: yyyy.MM.dd (D)',
    date: '날짜',
    time: '시간'
  }
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Convert text by binding expressions with context.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var inArray = __webpack_require__(3);
var forEach = __webpack_require__(9);
var isArray = __webpack_require__(6);
var isString = __webpack_require__(13);
var extend = __webpack_require__(7);

// IE8 does not support capture groups.
var EXPRESSION_REGEXP = /{{\s?|\s?}}/g;
var BRACKET_NOTATION_REGEXP = /^[a-zA-Z0-9_@]+\[[a-zA-Z0-9_@"']+\]$/;
var BRACKET_REGEXP = /\[\s?|\s?\]/;
var DOT_NOTATION_REGEXP = /^[a-zA-Z_]+\.[a-zA-Z_]+$/;
var DOT_REGEXP = /\./;
var STRING_NOTATION_REGEXP = /^["']\w+["']$/;
var STRING_REGEXP = /"|'/g;
var NUMBER_REGEXP = /^-?\d+\.?\d*$/;

var EXPRESSION_INTERVAL = 2;

var BLOCK_HELPERS = {
  'if': handleIf,
  'each': handleEach,
  'with': handleWith
};

var isValidSplit = 'a'.split(/a/).length === 3;

/**
 * Split by RegExp. (Polyfill for IE8)
 * @param {string} text - text to be splitted\
 * @param {RegExp} regexp - regular expression
 * @returns {Array.<string>}
 */
var splitByRegExp = (function() {
  if (isValidSplit) {
    return function(text, regexp) {
      return text.split(regexp);
    };
  }

  return function(text, regexp) {
    var result = [];
    var prevIndex = 0;
    var match, index;

    if (!regexp.global) {
      regexp = new RegExp(regexp, 'g');
    }

    match = regexp.exec(text);
    while (match !== null) {
      index = match.index;
      result.push(text.slice(prevIndex, index));

      prevIndex = index + match[0].length;
      match = regexp.exec(text);
    }
    result.push(text.slice(prevIndex));

    return result;
  };
})();

/**
 * Find value in the context by an expression.
 * @param {string} exp - an expression
 * @param {object} context - context
 * @returns {*}
 * @private
 */
// eslint-disable-next-line complexity
function getValueFromContext(exp, context) {
  var splitedExps;
  var value = context[exp];

  if (exp === 'true') {
    value = true;
  } else if (exp === 'false') {
    value = false;
  } else if (STRING_NOTATION_REGEXP.test(exp)) {
    value = exp.replace(STRING_REGEXP, '');
  } else if (BRACKET_NOTATION_REGEXP.test(exp)) {
    splitedExps = exp.split(BRACKET_REGEXP);
    value = getValueFromContext(splitedExps[0], context)[getValueFromContext(splitedExps[1], context)];
  } else if (DOT_NOTATION_REGEXP.test(exp)) {
    splitedExps = exp.split(DOT_REGEXP);
    value = getValueFromContext(splitedExps[0], context)[splitedExps[1]];
  } else if (NUMBER_REGEXP.test(exp)) {
    value = parseFloat(exp);
  }

  return value;
}

/**
 * Extract elseif and else expressions.
 * @param {Array.<string>} ifExps - args of if expression
 * @param {Array.<string>} sourcesInsideBlock - sources inside if block
 * @returns {object} - exps: expressions of if, elseif, and else / sourcesInsideIf: sources inside if, elseif, and else block.
 * @private
 */
function extractElseif(ifExps, sourcesInsideBlock) {
  var exps = [ifExps];
  var sourcesInsideIf = [];
  var otherIfCount = 0;
  var start = 0;

  // eslint-disable-next-line complexity
  forEach(sourcesInsideBlock, function(source, index) {
    if (source.indexOf('if') === 0) {
      otherIfCount += 1;
    } else if (source === '/if') {
      otherIfCount -= 1;
    } else if (!otherIfCount && (source.indexOf('elseif') === 0 || source === 'else')) {
      exps.push(source === 'else' ? ['true'] : source.split(' ').slice(1));
      sourcesInsideIf.push(sourcesInsideBlock.slice(start, index));
      start = index + 1;
    }
  });

  sourcesInsideIf.push(sourcesInsideBlock.slice(start));

  return {
    exps: exps,
    sourcesInsideIf: sourcesInsideIf
  };
}

/**
 * Helper function for "if". 
 * @param {Array.<string>} exps - array of expressions split by spaces
 * @param {Array.<string>} sourcesInsideBlock - array of sources inside the if block
 * @param {object} context - context
 * @returns {string}
 * @private
 */
function handleIf(exps, sourcesInsideBlock, context) {
  var analyzed = extractElseif(exps, sourcesInsideBlock);
  var result = false;
  var compiledSource = '';

  forEach(analyzed.exps, function(exp, index) {
    result = handleExpression(exp, context);
    if (result) {
      compiledSource = compile(analyzed.sourcesInsideIf[index], context);
    }

    return !result;
  });

  return compiledSource;
}

/**
 * Helper function for "each".
 * @param {Array.<string>} exps - array of expressions split by spaces
 * @param {Array.<string>} sourcesInsideBlock - array of sources inside the each block
 * @param {object} context - context
 * @returns {string}
 * @private
 */
function handleEach(exps, sourcesInsideBlock, context) {
  var collection = handleExpression(exps, context);
  var additionalKey = isArray(collection) ? '@index' : '@key';
  var additionalContext = {};
  var result = '';

  forEach(collection, function(item, key) {
    additionalContext[additionalKey] = key;
    additionalContext['@this'] = item;
    extend(context, additionalContext);

    result += compile(sourcesInsideBlock.slice(), context);
  });

  return result;
}

/**
 * Helper function for "with ... as"
 * @param {Array.<string>} exps - array of expressions split by spaces
 * @param {Array.<string>} sourcesInsideBlock - array of sources inside the with block
 * @param {object} context - context
 * @returns {string}
 * @private
 */
function handleWith(exps, sourcesInsideBlock, context) {
  var asIndex = inArray('as', exps);
  var alias = exps[asIndex + 1];
  var result = handleExpression(exps.slice(0, asIndex), context);

  var additionalContext = {};
  additionalContext[alias] = result;

  return compile(sourcesInsideBlock, extend(context, additionalContext)) || '';
}

/**
 * Extract sources inside block in place.
 * @param {Array.<string>} sources - array of sources
 * @param {number} start - index of start block
 * @param {number} end - index of end block
 * @returns {Array.<string>}
 * @private
 */
function extractSourcesInsideBlock(sources, start, end) {
  var sourcesInsideBlock = sources.splice(start + 1, end - start);
  sourcesInsideBlock.pop();

  return sourcesInsideBlock;
}

/**
 * Handle block helper function
 * @param {string} helperKeyword - helper keyword (ex. if, each, with)
 * @param {Array.<string>} sourcesToEnd - array of sources after the starting block
 * @param {object} context - context
 * @returns {Array.<string>}
 * @private
 */
function handleBlockHelper(helperKeyword, sourcesToEnd, context) {
  var executeBlockHelper = BLOCK_HELPERS[helperKeyword];
  var helperCount = 1;
  var startBlockIndex = 0;
  var endBlockIndex;
  var index = startBlockIndex + EXPRESSION_INTERVAL;
  var expression = sourcesToEnd[index];

  while (helperCount && isString(expression)) {
    if (expression.indexOf(helperKeyword) === 0) {
      helperCount += 1;
    } else if (expression.indexOf('/' + helperKeyword) === 0) {
      helperCount -= 1;
      endBlockIndex = index;
    }

    index += EXPRESSION_INTERVAL;
    expression = sourcesToEnd[index];
  }

  if (helperCount) {
    throw Error(helperKeyword + ' needs {{/' + helperKeyword + '}} expression.');
  }

  sourcesToEnd[startBlockIndex] = executeBlockHelper(
    sourcesToEnd[startBlockIndex].split(' ').slice(1),
    extractSourcesInsideBlock(sourcesToEnd, startBlockIndex, endBlockIndex),
    context
  );

  return sourcesToEnd;
}

/**
 * Helper function for "custom helper".
 * If helper is not a function, return helper itself.
 * @param {Array.<string>} exps - array of expressions split by spaces (first element: helper)
 * @param {object} context - context
 * @returns {string}
 * @private
 */
function handleExpression(exps, context) {
  var result = getValueFromContext(exps[0], context);

  if (result instanceof Function) {
    return executeFunction(result, exps.slice(1), context);
  }

  return result;
}

/**
 * Execute a helper function.
 * @param {Function} helper - helper function
 * @param {Array.<string>} argExps - expressions of arguments
 * @param {object} context - context
 * @returns {string} - result of executing the function with arguments
 * @private
 */
function executeFunction(helper, argExps, context) {
  var args = [];
  forEach(argExps, function(exp) {
    args.push(getValueFromContext(exp, context));
  });

  return helper.apply(null, args);
}

/**
 * Get a result of compiling an expression with the context.
 * @param {Array.<string>} sources - array of sources split by regexp of expression.
 * @param {object} context - context
 * @returns {Array.<string>} - array of sources that bind with its context
 * @private
 */
function compile(sources, context) {
  var index = 1;
  var expression = sources[index];
  var exps, firstExp, result;

  while (isString(expression)) {
    exps = expression.split(' ');
    firstExp = exps[0];

    if (BLOCK_HELPERS[firstExp]) {
      result = handleBlockHelper(firstExp, sources.splice(index, sources.length - index), context);
      sources = sources.concat(result);
    } else {
      sources[index] = handleExpression(exps, context);
    }

    index += EXPRESSION_INTERVAL;
    expression = sources[index];
  }

  return sources.join('');
}

/**
 * Convert text by binding expressions with context.
 * <br>
 * If expression exists in the context, it will be replaced.
 * ex) '{{title}}' with context {title: 'Hello!'} is converted to 'Hello!'.
 * An array or object can be accessed using bracket and dot notation.
 * ex) '{{odds\[2\]}}' with context {odds: \[1, 3, 5\]} is converted to '5'.
 * ex) '{{evens\[first\]}}' with context {evens: \[2, 4\], first: 0} is converted to '2'.
 * ex) '{{project\["name"\]}}' and '{{project.name}}' with context {project: {name: 'CodeSnippet'}} is converted to 'CodeSnippet'.
 * <br>
 * If replaced expression is a function, next expressions will be arguments of the function.
 * ex) '{{add 1 2}}' with context {add: function(a, b) {return a + b;}} is converted to '3'.
 * <br>
 * It has 3 predefined block helpers '{{helper ...}} ... {{/helper}}': 'if', 'each', 'with ... as ...'.
 * 1) 'if' evaluates conditional statements. It can use with 'elseif' and 'else'.
 * 2) 'each' iterates an array or object. It provides '@index'(array), '@key'(object), and '@this'(current element).
 * 3) 'with ... as ...' provides an alias.
 * @param {string} text - text with expressions
 * @param {object} context - context
 * @returns {string} - text that bind with its context
 * @memberof module:domUtil
 * @example
 * var template = require('tui-code-snippet/domUtil/template');
 * 
 * var source = 
 *     '<h1>'
 *   +   '{{if isValidNumber title}}'
 *   +     '{{title}}th'
 *   +   '{{elseif isValidDate title}}'
 *   +     'Date: {{title}}'
 *   +   '{{/if}}'
 *   + '</h1>'
 *   + '{{each list}}'
 *   +   '{{with addOne @index as idx}}'
 *   +     '<p>{{idx}}: {{@this}}</p>'
 *   +   '{{/with}}'
 *   + '{{/each}}';
 * 
 * var context = {
 *   isValidDate: function(text) {
 *     return /^\d{4}-(0|1)\d-(0|1|2|3)\d$/.test(text);
 *   },
 *   isValidNumber: function(text) {
 *     return /^\d+$/.test(text);
 *   }
 *   title: '2019-11-25',
 *   list: ['Clean the room', 'Wash the dishes'],
 *   addOne: function(num) {
 *     return num + 1;
 *   }
 * };
 * 
 * var result = template(source, context);
 * console.log(result); // <h1>Date: 2019-11-25</h1><p>1: Clean the room</p><p>2: Wash the dishes</p>
 */
function template(text, context) {
  return compile(splitByRegExp(text, EXPRESSION_REGEXP), context);
}

module.exports = template;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check whether the given variable is undefined or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is undefined or not.
 * If the given variable is undefined, returns true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is undefined?
 * @memberof module:type
 */
function isUndefined(obj) {
  return obj === undefined; // eslint-disable-line no-undefined
}

module.exports = isUndefined;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check whether the given variable is a string or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is a string or not.
 * If the given variable is a string, return true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is string?
 * @memberof module:type
 */
function isString(obj) {
  return typeof obj === 'string' || obj instanceof String;
}

module.exports = isString;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Remove element from parent node.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Remove element from parent node.
 * @param {HTMLElement} element - element to remove.
 * @memberof module:domUtil
 */
function removeElement(element) {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

module.exports = removeElement;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check whether the given variable is a number or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is a number or not.
 * If the given variable is a number, return true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is number?
 * @memberof module:type
 */
function isNumber(obj) {
  return typeof obj === 'number' || obj instanceof Number;
}

module.exports = isNumber;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Add css class to element
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var forEach = __webpack_require__(9);
var inArray = __webpack_require__(3);
var getClass = __webpack_require__(17);
var setClassName = __webpack_require__(24);

/**
 * domUtil module
 * @module domUtil
 */

/**
 * Add css class to element
 * @param {(HTMLElement|SVGElement)} element - target element
 * @param {...string} cssClass - css classes to add
 * @memberof module:domUtil
 */
function addClass(element) {
  var cssClass = Array.prototype.slice.call(arguments, 1);
  var classList = element.classList;
  var newClass = [];
  var origin;

  if (classList) {
    forEach(cssClass, function(name) {
      element.classList.add(name);
    });

    return;
  }

  origin = getClass(element);

  if (origin) {
    cssClass = [].concat(origin.split(/\s+/), cssClass);
  }

  forEach(cssClass, function(cls) {
    if (inArray(cls, newClass) < 0) {
      newClass.push(cls);
    }
  });

  setClassName(element, newClass);
}

module.exports = addClass;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Get HTML element's design classes.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isUndefined = __webpack_require__(12);

/**
 * Get HTML element's design classes.
 * @param {(HTMLElement|SVGElement)} element target element
 * @returns {string} element css class name
 * @memberof module:domUtil
 */
function getClass(element) {
  if (!element || !element.className) {
    return '';
  }

  if (isUndefined(element.className.baseVal)) {
    return element.className;
  }

  return element.className.baseVal;
}

module.exports = getClass;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Remove css class from element
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var forEachArray = __webpack_require__(2);
var inArray = __webpack_require__(3);
var getClass = __webpack_require__(17);
var setClassName = __webpack_require__(24);

/**
 * Remove css class from element
 * @param {(HTMLElement|SVGElement)} element - target element
 * @param {...string} cssClass - css classes to remove
 * @memberof module:domUtil
 */
function removeClass(element) {
  var cssClass = Array.prototype.slice.call(arguments, 1);
  var classList = element.classList;
  var origin, newClass;

  if (classList) {
    forEachArray(cssClass, function(name) {
      classList.remove(name);
    });

    return;
  }

  origin = getClass(element).split(/\s+/);
  newClass = [];
  forEachArray(origin, function(name) {
    if (inArray(name, cssClass) < 0) {
      newClass.push(name);
    }
  });

  setClassName(element, newClass);
}

module.exports = removeClass;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Set mouse-touch event
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */



var on = __webpack_require__(31);
var off = __webpack_require__(33);

var mouseTouchEvent = {
  /**
   * Detect mobile browser
   * @type {boolean} Whether using Mobile browser
   * @private
   */
  _isMobile: (function() {
    return /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent
    );
  })(),

  /**
   * Return a matched event type by a mouse event type
   * @param {string} type A mouse event type - mousedown, click
   * @returns {string}
   * @private
   */
  _getEventType: function(type) {
    if (this._isMobile) {
      if (type === 'mousedown') {
        type = 'touchstart';
      } else if (type === 'click') {
        type = 'touchend';
      }
    }

    return type;
  },

  /**
   * Bind touch or mouse events
   * @param {HTMLElement} element An element to bind
   * @param {string} type A mouse event type - mousedown, click
   * @param {Function} handler A handler function
   * @param {object} [context] A context for handler.
   */
  on: function(element, type, handler, context) {
    on(element, this._getEventType(type), handler, context);
  },

  /**
   * Unbind touch or mouse events
   * @param {HTMLElement} element - Target element
   * @param {string} type A mouse event type - mousedown, click
   * @param {Function} handler - Handler
   */
  off: function(element, type, handler) {
    off(element, this._getEventType(type), handler);
  }
};

module.exports = mouseTouchEvent;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Layer base
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */



var defineClass = __webpack_require__(0);
var removeElement = __webpack_require__(14);

var localeText = __webpack_require__(10);
var DEFAULT_LANGUAGE_TYPE = __webpack_require__(1).DEFAULT_LANGUAGE_TYPE;

/**
 * @abstract
 * @class
 * @ignore
 * @param {string} language - Initial language
 * Layer base
 */
var LayerBase = defineClass(
  /** @lends LayerBase.prototype */ {
    init: function(language) {
      language = language || DEFAULT_LANGUAGE_TYPE;

      /**
       * Layer element
       * @type {HTMLElement}
       * @private
       */
      this._element = null;

      /**
       * Language type
       * @type {string}
       * @private
       */
      this._localeText = localeText[language];

      /**
       * Layer type
       * @type {string}
       * @private
       */
      this._type = 'base';
    },

    /**
     * Make context
     * @abstract
     * @throws {Error}
     * @returns {object}
     * @private
     */
    _makeContext: function() {
      throwOverrideError(this.getType(), '_makeContext');
    },

    /**
     * Render the layer element
     * @abstract
     * @throws {Error}
     */
    render: function() {
      throwOverrideError(this.getType(), 'render');
    },

    /**
     * Returns date elements
     * @abstract
     * @throws {Error}
     * @returns {HTMLElement[]}
     */
    getDateElements: function() {
      throwOverrideError(this.getType(), 'getDateElements');
    },

    /**
     * Returns layer type
     * @returns {string}
     */
    getType: function() {
      return this._type;
    },

    /**
     * Set language
     * @param {string} language - Language name
     */
    changeLanguage: function(language) {
      this._localeText = localeText[language];
    },

    /**
     * Remove elements
     */
    remove: function() {
      if (this._element) {
        removeElement(this._element);
      }
      this._element = null;
    }
  }
);

/**
 * Throw - method override error
 * @ignore
 * @param {string} layerType - Layer type
 * @param {string} methodName - Method name
 * @throws {Error}
 */
function throwOverrideError(layerType, methodName) {
  throw new Error(layerType + ' layer does not have the "' + methodName + '" method.');
}

module.exports = LayerBase;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview DatePicker component
 * @author NHN. FE dev Lab <dl_javascript@nhn.com>
 */



var inArray = __webpack_require__(3);
var forEachArray = __webpack_require__(2);
var defineClass = __webpack_require__(0);
var CustomEvents = __webpack_require__(8);
var addClass = __webpack_require__(16);
var closest = __webpack_require__(25);
var getData = __webpack_require__(26);
var hasClass = __webpack_require__(27);
var removeClass = __webpack_require__(18);
var removeElement = __webpack_require__(14);
var extend = __webpack_require__(7);
var isArray = __webpack_require__(6);
var isDate = __webpack_require__(28);
var isNumber = __webpack_require__(15);
var isObject = __webpack_require__(22);

var TimePicker = __webpack_require__(43);

var Calendar = __webpack_require__(29);
var RangeModel = __webpack_require__(56);
var constants = __webpack_require__(1);
var localeTexts = __webpack_require__(10);
var dateUtil = __webpack_require__(5);
var util = __webpack_require__(4);
var mouseTouchEvent = __webpack_require__(19);
var tmpl = __webpack_require__(58);
var DatePickerInput = __webpack_require__(59);

var DEFAULT_WEEK_START_DAY = constants.DEFAULT_WEEK_START_DAY;
var DEFAULT_LANGUAGE_TYPE = constants.DEFAULT_LANGUAGE_TYPE;
var TYPE_DATE = constants.TYPE_DATE;
var TYPE_MONTH = constants.TYPE_MONTH;
var TYPE_YEAR = constants.TYPE_YEAR;
var CLASS_NAME_NEXT_YEAR_BTN = constants.CLASS_NAME_NEXT_YEAR_BTN;
var CLASS_NAME_NEXT_MONTH_BTN = constants.CLASS_NAME_NEXT_MONTH_BTN;
var CLASS_NAME_PREV_YEAR_BTN = constants.CLASS_NAME_PREV_YEAR_BTN;
var CLASS_NAME_PREV_MONTH_BTN = constants.CLASS_NAME_PREV_MONTH_BTN;
var CLASS_NAME_SELECTED = constants.CLASS_NAME_SELECTED;

var CLASS_NAME_SELECTABLE = 'tui-is-selectable';
var CLASS_NAME_BLOCKED = 'tui-is-blocked';
var CLASS_NAME_CHECKED = 'tui-is-checked';
var CLASS_NAME_SELECTOR_BUTTON = 'tui-datepicker-selector-button';
var CLASS_NAME_TODAY = 'tui-calendar-today';
var CLASS_NAME_HIDDEN = 'tui-hidden';

var SELECTOR_BODY = '.tui-datepicker-body';
var SELECTOR_DATE_ICO = '.tui-ico-date';
var SELECTOR_CALENDAR_TITLE = '.tui-calendar-title';
var SELECTOR_CALENDAR_CONTAINER = '.tui-calendar-container';
var SELECTOR_TIMEPICKER_CONTAINER = '.tui-timepicker-container';

/**
 * Merge default option
 * @ignore
 * @param {object} option - DatePicker option
 * @returns {object}
 */
var mergeDefaultOption = function(option) {
  option = extend(
    {
      language: DEFAULT_LANGUAGE_TYPE,
      calendar: {},
      input: {
        element: null,
        format: null
      },
      timePicker: null,
      date: null,
      showAlways: false,
      type: TYPE_DATE,
      selectableRanges: null,
      openers: [],
      autoClose: true,
      usageStatistics: true,
      weekStartDay: DEFAULT_WEEK_START_DAY
    },
    option
  );

  option.selectableRanges = option.selectableRanges || [[constants.MIN_DATE, constants.MAX_DATE]];

  if (!isObject(option.calendar)) {
    throw new Error('Calendar option must be an object');
  }
  if (!isObject(option.input)) {
    throw new Error('Input option must be an object');
  }
  if (!isArray(option.selectableRanges)) {
    throw new Error('Selectable-ranges must be a 2d-array');
  }

  option.localeText = localeTexts[option.language];

  // override calendar option
  option.calendar.language = option.language;
  option.calendar.type = option.type;

  // @TODO: after v5.0.0, remove option.timepicker
  option.timePicker = option.timePicker || option.timepicker;

  return option;
};

/**
 * @class
 * @description
 * Create a date picker.
 * @see {@link /tutorial-example01-basic DatePicker example}
 * @param {HTMLElement|string} container - Container element or selector of DatePicker
 * @param {Object} [options] - Options
 *      @param {Date|number} [options.date = null] - Initial date. Set by a Date instance or a number(timestamp). (default: no initial date)
 *      @param {('date'|'month'|'year')} [options.type = 'date'] - DatePicker type. Determine whether to choose a date, month, or year.
 *      @param {string} [options.language='en'] - Language code. English('en') and Korean('ko') are provided as default. To set to the other languages, use {@link DatePicker#localeTexts DatePicker.localeTexts}.
 *      @param {object|boolean} [options.timePicker] - [TimePicker](https://nhn.github.io/tui.time-picker/latest) options. Refer to the [TimePicker instance's options](https://nhn.github.io/tui.time-picker/latest/TimePicker). To create the TimePicker without customization, set to true.
 *      @param {object} [options.calendar] - {@link Calendar} options. Refer to the {@link Calendar Calendar instance's options}.
 *      @param {object} [options.input] - Input option
 *      @param {HTMLElement|string} [options.input.element] - Input element or selector
 *      @param {string} [options.input.format = 'yyyy-mm-dd'] - Format of the Date string
 *      @param {Array.<Array.<Date|number>>} [options.selectableRanges = 1900/1/1 ~ 2999/12/31]
 *        - Ranges of selectable date. Set by Date instances or numbers(timestamp).
 *      @param {Array<HTMLElement|string>} [options.openers = []] - List of the openers to open the DatePicker (example - icon, button, etc.)
 *      @param {boolean} [options.showAlways = false] - Show the DatePicker always
 *      @param {boolean} [options.autoClose = true] - Close the DatePicker after clicking the date
 *      @param {boolean} [options.usageStatistics = true] - Send a hostname to Google Analytics (default: true)
 *      @param {string} [options.weekStartDay = 'Sun'] - Start of the week. 'Sun', 'Mon', ..., 'Sat'(default: 'Sun'(start on Sunday))
 * @example
 * import DatePicker from 'tui-date-picker' // ES6
 * // const DatePicker = require('tui-date-picker'); // CommonJS
 * // const DatePicker = tui.DatePicker;
 *
 * const range1 = [new Date(2015, 2, 1), new Date(2015, 3, 1)];
 * const range2 = [1465570800000, 1481266182155]; // timestamps
 *
 * const picker1 = new DatePicker('#datepicker-container1', {
 *     showAlways: true
 * });
 *
 * const picker2 = new DatePicker('#datepicker-container2', {
 *    showAlways: true,
 *    timePicker: true
 * });
 *
 * const picker3 = new DatePicker('#datepicker-container3', {
 *     language: 'ko',
 *     calendar: {
 *         showToday: true
 *     },
 *     timePicker: {
 *         showMeridiem: true,
 *         defaultHour: 13,
 *         defaultMinute: 24
 *     },
 *     input: {
 *         element: '#datepicker-input',
 *         format: 'yyyy년 MM월 dd일 hh:mm A'
 *     }
 *     type: 'date',
 *     date: new Date(2015, 0, 1)
 *     selectableRanges: [range1, range2],
 *     openers: ['#opener'],
 *     weekStartDay: 'Mon',
 * });
 */
var DatePicker = defineClass(
  /** @lends DatePicker.prototype */ {
    static: {
      /**
       * Locale text data. English('en') and Korean('ko') are provided as default.
       * @type {object}
       * @memberof DatePicker
       * @static
       * @example
       * DatePicker.localeTexts['customKey'] = {
       *     titles: {
       *         // days
       *         DD: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
       *         // daysShort
       *         D: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
       *         // months
       *         MMMM: [
       *             'January', 'February', 'March', 'April', 'May', 'June',
       *             'July', 'August', 'September', 'October', 'November', 'December'
       *         ],
       *         // monthsShort
       *         MMM: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
       *     },
       *     titleFormat: 'MMM yyyy',
       *     todayFormat: 'D, MMMM dd, yyyy',
       *     date: 'Date',
       *     time: 'Time'
       * };
       *
       * const datepicker = new DatePicker('#datepicker-container', {
       *     language: 'customKey'
       * });
       */
      localeTexts: localeTexts
    },
    init: function(container, options) {
      options = mergeDefaultOption(options);

      /**
       * Language type
       * @type {string}
       * @private
       */
      this._language = options.language;

      /**
       * DatePicker container
       * @type {HTMLElement}
       * @private
       */
      this._container = util.getElement(container);
      this._container.innerHTML = tmpl(
        extend(options, {
          isTab: options.timePicker && options.timePicker.layoutType === 'tab'
        })
      );

      /**
       * DatePicker element
       * @type {HTMLElement}
       * @private
       */
      this._element = this._container.firstChild;

      /**
       * Calendar instance
       * @type {Calendar}
       * @private
       */
      this._calendar = new Calendar(
        this._element.querySelector(SELECTOR_CALENDAR_CONTAINER),
        extend(options.calendar, {
          usageStatistics: options.usageStatistics,
          weekStartDay: options.weekStartDay
        })
      );

      /**
       * TimePicker instance
       * @type {TimePicker}
       * @private
       */
      this._timePicker = null;

      /**
       * DatePicker input
       * @type {DatePickerInput}
       * @private
       */
      this._datepickerInput = null;

      /**
       * Object having date values
       * @type {Date}
       * @private
       */
      this._date = null;

      /**
       * Selectable date-ranges model
       * @type {RangeModel}
       * @private
       */
      this._rangeModel = null;

      /**
       * openers - opener list
       * @type {Array}
       * @private
       */
      this._openers = [];

      /**
       * State of picker enable
       * @type {boolean}
       * @private
       */
      this._isEnabled = true;

      /**
       * ID of instance
       * @type {number}
       * @private
       */
      this._id = 'tui-datepicker-' + util.generateId();

      /**
       * DatePicker type
       * @type {TYPE_DATE|TYPE_MONTH|TYPE_YEAR}
       * @private
       */
      this._type = options.type;

      /**
       * Show always or not
       * @type {boolean}
       */
      this.showAlways = options.showAlways;

      /**
       * Close after select a date
       * @type {boolean}
       */
      this.autoClose = options.autoClose;

      this._initializeDatePicker(options);
    },

    /**
     * Initialize method
     * @param {Object} option - user option
     * @private
     */
    _initializeDatePicker: function(option) {
      this.setRanges(option.selectableRanges);
      this._setEvents();
      this._initTimePicker(option.timePicker, option.usageStatistics);
      this.setInput(option.input.element);
      this.setDateFormat(option.input.format);
      this.setDate(option.date);

      forEachArray(option.openers, this.addOpener, this);
      if (!this.showAlways) {
        this._hide();
      }

      if (this.getType() === TYPE_DATE) {
        addClass(this._element.querySelector(SELECTOR_BODY), 'tui-datepicker-type-date');
      }
    },

    /**
     * Set events on the date picker's element
     * @param {object} option - Constructor option
     * @private
     */
    _setEvents: function() {
      mouseTouchEvent.on(this._element, 'click', this._onClickHandler, this);
      this._calendar.on('draw', this._onDrawCalendar, this);
    },

    /**
     * Remove events on the date picker's element
     * @private
     */
    _removeEvents: function() {
      mouseTouchEvent.off(this._element, 'click', this._onClickHandler, this);
      this._calendar.off();
    },

    /**
     * Set events on the document
     * @private
     */
    _setDocumentEvents: function() {
      mouseTouchEvent.on(document, 'mousedown', this._onMousedownDocument, this);
    },

    /**
     * Remove events on the document
     * @private
     */
    _removeDocumentEvents: function() {
      mouseTouchEvent.off(document, 'mousedown', this._onMousedownDocument);
    },

    /**
     * Set events on the opener
     * @param {HTMLElement} opener An opener to bind the events
     * @private
     */
    _setOpenerEvents: function(opener) {
      mouseTouchEvent.on(opener, 'click', this.toggle, this);
    },

    /**
     * Remove events on the opener
     * @param {HTMLElement} opener An opener to unbind the events
     * @private
     */
    _removeOpenerEvents: function(opener) {
      mouseTouchEvent.off(opener, 'click', this.toggle);
    },

    /**
     * Set TimePicker instance
     * @param {object|boolean} opTimePicker - TimePicker instance options
     * @param {boolean} usageStatistics - GA tracking options
     * @private
     */
    _initTimePicker: function(opTimePicker, usageStatistics) {
      var layoutType;
      if (!opTimePicker) {
        return;
      }

      layoutType = opTimePicker.layoutType || '';

      if (isObject(opTimePicker)) {
        opTimePicker.usageStatistics = usageStatistics;
      } else {
        opTimePicker = {
          usageStatistics: usageStatistics
        };
      }

      this._timePicker = new TimePicker(
        this._element.querySelector(SELECTOR_TIMEPICKER_CONTAINER),
        opTimePicker
      );

      if (layoutType.toLowerCase() === 'tab') {
        this._timePicker.hide();
      }

      this._timePicker.on(
        'change',
        function(ev) {
          var prevDate;
          if (this._date) {
            prevDate = new Date(this._date);
            this.setDate(prevDate.setHours(ev.hour, ev.minute));
          }
        },
        this
      );
    },

    /**
     * Change picker's type by a selector button.
     * @param {HTMLElement} target A target element
     * @private
     */
    _changePicker: function(target) {
      var btnSelector = '.' + CLASS_NAME_SELECTOR_BUTTON;
      var selectedBtn = closest(target, btnSelector);
      var isDateElement = !!selectedBtn.querySelector(SELECTOR_DATE_ICO);

      if (isDateElement) {
        this._calendar.show();
        this._timePicker.hide();
      } else {
        this._calendar.hide();
        this._timePicker.show();
      }
      removeClass(this._element.querySelector('.' + CLASS_NAME_CHECKED), CLASS_NAME_CHECKED);
      addClass(selectedBtn, CLASS_NAME_CHECKED);
    },

    /**
     * Returns whether the element is opener
     * @param {string|HTMLElement} element - Element or selector
     * @returns {boolean}
     * @private
     */
    _isOpener: function(element) {
      var el = util.getElement(element);

      return inArray(el, this._openers) > -1;
    },

    /**
     * add/remove today-class-name to date element
     * @param {HTMLElement} el - date element
     * @private
     */
    _setTodayClassName: function(el) {
      var timestamp, isToday;

      if (this.getCalendarType() !== TYPE_DATE) {
        return;
      }

      timestamp = Number(getData(el, 'timestamp'));
      isToday = timestamp === new Date().setHours(0, 0, 0, 0);

      if (isToday) {
        addClass(el, CLASS_NAME_TODAY);
      } else {
        removeClass(el, CLASS_NAME_TODAY);
      }
    },

    /**
     * add/remove selectable-class-name to date element
     * @param {HTMLElement} el - date element
     * @private
     */
    _setSelectableClassName: function(el) {
      var elDate = new Date(Number(getData(el, 'timestamp')));

      if (this._isSelectableOnCalendar(elDate)) {
        addClass(el, CLASS_NAME_SELECTABLE);
        removeClass(el, CLASS_NAME_BLOCKED);
      } else {
        removeClass(el, CLASS_NAME_SELECTABLE);
        addClass(el, CLASS_NAME_BLOCKED);
      }
    },

    /**
     * add/remove selected-class-name to date element
     * @param {HTMLElement} el - date element
     * @private
     */
    _setSelectedClassName: function(el) {
      var elDate = new Date(Number(getData(el, 'timestamp')));

      if (this._isSelectedOnCalendar(elDate)) {
        addClass(el, CLASS_NAME_SELECTED);
      } else {
        removeClass(el, CLASS_NAME_SELECTED);
      }
    },

    /**
     * Returns whether the date is selectable on calendar
     * @param {Date} date - Date instance
     * @returns {boolean}
     * @private
     */
    _isSelectableOnCalendar: function(date) {
      var type = this.getCalendarType();
      var start = dateUtil.cloneWithStartOf(date, type).getTime();
      var end = dateUtil.cloneWithEndOf(date, type).getTime();

      return this._rangeModel.hasOverlap(start, end);
    },

    /**
     * Returns whether the date is selected on calendar
     * @param {Date} date - Date instance
     * @returns {boolean}
     * @private
     */
    _isSelectedOnCalendar: function(date) {
      var curDate = this.getDate();
      var calendarType = this.getCalendarType();

      return curDate && dateUtil.isSame(curDate, date, calendarType);
    },

    /**
     * Show the date picker element
     * @private
     */
    _show: function() {
      removeClass(this._element, CLASS_NAME_HIDDEN);
    },

    /**
     * Hide the date picker element
     * @private
     */
    _hide: function() {
      addClass(this._element, CLASS_NAME_HIDDEN);
    },

    /**
     * Set value a date-string of current this instance to input element
     * @private
     */
    _syncToInput: function() {
      if (!this._date) {
        return;
      }

      this._datepickerInput.setDate(this._date);
    },

    /**
     * Set date from input value
     * @param {boolean} [shouldRollback = false] - Should rollback from unselectable or error
     * @private
     */
    _syncFromInput: function(shouldRollback) {
      var isFailed = false;
      var date;

      try {
        date = this._datepickerInput.getDate();

        if (this.isSelectable(date)) {
          if (this._timePicker) {
            this._timePicker.setTime(date.getHours(), date.getMinutes());
          }
          this.setDate(date);
        } else {
          isFailed = true;
        }
      } catch (err) {
        this.fire('error', {
          type: 'ParsingError',
          message: err.message
        });
        isFailed = true;
      } finally {
        if (isFailed) {
          if (shouldRollback) {
            this._syncToInput();
          } else {
            this.setNull();
          }
        }
      }
    },

    /**
     * Event handler for mousedown of document<br>
     * - When click the out of layer, close the layer
     * @param {Event} ev - Event object
     * @private
     */
    _onMousedownDocument: function(ev) {
      var target = util.getTarget(ev);
      var selector = util.getSelector(target);
      var isContain = selector ? this._element.querySelector(selector) : false;
      var isInput = this._datepickerInput.is(target);
      var isInOpener = inArray(target, this._openers) > -1;
      var shouldClose = !(this.showAlways || isInput || isContain || isInOpener);

      if (shouldClose) {
        this.close();
      }
    },

    /**
     * Event handler for click of calendar
     * @param {Event} ev An event object
     * @private
     */
    _onClickHandler: function(ev) {
      var target = util.getTarget(ev);

      if (closest(target, '.' + CLASS_NAME_SELECTABLE)) {
        this._updateDate(target);
      } else if (closest(target, SELECTOR_CALENDAR_TITLE)) {
        this.drawUpperCalendar(this._date);
      } else if (closest(target, '.' + CLASS_NAME_SELECTOR_BUTTON)) {
        this._changePicker(target);
      }
    },

    /**
     * Update date from event-target
     * @param {HTMLElement} target An event target element
     * @private
     */
    _updateDate: function(target) {
      var timestamp = Number(getData(target, 'timestamp'));
      var newDate = new Date(timestamp);
      var timePicker = this._timePicker;
      var prevDate = this._date;
      var calendarType = this.getCalendarType();
      var pickerType = this.getType();

      if (calendarType !== pickerType) {
        this.drawLowerCalendar(newDate);
      } else {
        if (timePicker) {
          newDate.setHours(timePicker.getHour(), timePicker.getMinute());
        } else if (prevDate) {
          newDate.setHours(prevDate.getHours(), prevDate.getMinutes());
        }
        this.setDate(newDate);

        if (!this.showAlways && this.autoClose) {
          this.close();
        }
      }
    },

    /**
     * Event handler for 'draw'-custom event of calendar
     * @param {Object} eventData - custom event data
     * @see {@link Calendar#draw}
     * @private
     */
    _onDrawCalendar: function(eventData) {
      forEachArray(
        eventData.dateElements,
        function(el) {
          this._setTodayClassName(el);
          this._setSelectableClassName(el);
          this._setSelectedClassName(el);
        },
        this
      );
      this._setDisplayHeadButtons();

      /**
       * Occur after the calendar is drawn.
       * @event DatePicker#draw
       * @see {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents#on datepicker.on()} to bind event handlers.
       * @see {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents#off datepicker.off()} to unbind event handlers.
       * @see Refer to {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents CustomEvents from tui-code-snippet} for more methods. DatePicker mixes in the methods from CustomEvents.
       * @property {Date} date - Calendar date
       * @property {('date'|'month'|'year')} type - Calendar type
       * @property {HTMLElement[]} dateElements - elements for dates
       * @example
       * // bind the 'draw' event
       * datepicker.on('draw', function(event) {
       *     console.log(`Draw the ${event.type} calendar and its date is ${event.date}.`);
       * });
       *
       * // unbind the 'draw' event
       * datepicker.off('draw');
       */
      this.fire('draw', eventData);
    },

    /**
     * Hide useless buttons (next, next-year, prev, prev-year)
     * @see Don't save buttons reference. The buttons are rerendered every "calendar.draw".
     * @private
     */
    _setDisplayHeadButtons: function() {
      var nextYearDate = this._calendar.getNextYearDate();
      var prevYearDate = this._calendar.getPrevYearDate();
      var maxTimestamp = this._rangeModel.getMaximumValue();
      var minTimestamp = this._rangeModel.getMinimumValue();
      var nextYearBtn = this._element.querySelector('.' + CLASS_NAME_NEXT_YEAR_BTN);
      var prevYearBtn = this._element.querySelector('.' + CLASS_NAME_PREV_YEAR_BTN);
      var nextMonthDate, prevMonthDate, nextMonBtn, prevMonBtn;

      if (this.getCalendarType() === TYPE_DATE) {
        nextMonthDate = dateUtil.cloneWithStartOf(this._calendar.getNextDate(), TYPE_MONTH);
        prevMonthDate = dateUtil.cloneWithEndOf(this._calendar.getPrevDate(), TYPE_MONTH);

        nextMonBtn = this._element.querySelector('.' + CLASS_NAME_NEXT_MONTH_BTN);
        prevMonBtn = this._element.querySelector('.' + CLASS_NAME_PREV_MONTH_BTN);

        this._setDisplay(nextMonBtn, nextMonthDate.getTime() <= maxTimestamp);
        this._setDisplay(prevMonBtn, prevMonthDate.getTime() >= minTimestamp);

        prevYearDate.setDate(1);
        nextYearDate.setDate(1);
      } else {
        prevYearDate.setMonth(12, 0);
        nextYearDate.setMonth(0, 1);
      }

      this._setDisplay(nextYearBtn, nextYearDate.getTime() <= maxTimestamp);
      this._setDisplay(prevYearBtn, prevYearDate.getTime() >= minTimestamp);
    },

    /**
     * Set display show/hide by condition
     * @param {HTMLElement} el - An Element
     * @param {boolean} shouldShow - Condition
     * @private
     */
    _setDisplay: function(el, shouldShow) {
      if (el) {
        if (shouldShow) {
          removeClass(el, CLASS_NAME_HIDDEN);
        } else {
          addClass(el, CLASS_NAME_HIDDEN);
        }
      }
    },

    /**
     * Input change handler
     * @private
     * @throws {Error}
     */
    _onChangeInput: function() {
      this._syncFromInput(true);
    },

    /**
     * Returns whether the date is changed
     * @param {Date} date - Date
     * @returns {boolean}
     * @private
     */
    _isChanged: function(date) {
      var prevDate = this.getDate();

      return !prevDate || date.getTime() !== prevDate.getTime();
    },

    /**
     * Refresh datepicker
     * @private
     */
    _refreshFromRanges: function() {
      if (!this.isSelectable(this._date)) {
        this.setNull();
      } else {
        this._calendar.draw(); // view update
      }
    },

    /**
     * Return the current calendar's type.
     * @returns {('date'|'month'|'year')}
     */
    getCalendarType: function() {
      return this._calendar.getType();
    },

    /**
     * Return the date picker's type.
     * @returns {('date'|'month'|'year')}
     */
    getType: function() {
      return this._type;
    },

    /**
     * Return whether the date is selectable.
     * @param {Date} date - Date to check
     * @returns {boolean}
     */
    isSelectable: function(date) {
      var type = this.getType();
      var start, end;

      if (!dateUtil.isValidDate(date)) {
        return false;
      }
      start = dateUtil.cloneWithStartOf(date, type).getTime();
      end = dateUtil.cloneWithEndOf(date, type).getTime();

      return this._rangeModel.hasOverlap(start, end);
    },

    /**
     * Return whether the date is selected.
     * @param {Date} date - Date to check
     * @returns {boolean}
     */
    isSelected: function(date) {
      return dateUtil.isValidDate(date) && dateUtil.isSame(this._date, date, this.getType());
    },

    /**
     * Set selectable ranges. Previous ranges will be removed.
     * @param {Array.<Array<Date|number>>} ranges - Selectable ranges. Use Date instances or numbers(timestamp).
     * @example
     * datepicker.setRanges([
     *     [new Date(2017, 0, 1), new Date(2018, 0, 2)],
     *     [new Date(2015, 2, 3), new Date(2016, 4, 2)]
     * ]);
     */
    setRanges: function(ranges) {
      var result = [];
      forEachArray(ranges, function(range) {
        var start = new Date(range[0]).getTime();
        var end = new Date(range[1]).getTime();

        result.push([start, end]);
      });

      this._rangeModel = new RangeModel(result);
      this._refreshFromRanges();
    },

    /**
     * Set the calendar's type.
     * @param {('date'|'month'|'year')} type - Calendar type
     * @example
     * datepicker.setType('month');
     */
    setType: function(type) {
      this._type = type;
    },

    /**
     * Add a selectable range. Use Date instances or numbers(timestamp).
     * @param {Date|number} start - the start date
     * @param {Date|number} end - the end date
     * @example
     * const start = new Date(2015, 1, 3);
     * const end = new Date(2015, 2, 6);
     *
     * datepicker.addRange(start, end);
     */
    addRange: function(start, end) {
      start = new Date(start).getTime();
      end = new Date(end).getTime();

      this._rangeModel.add(start, end);
      this._refreshFromRanges();
    },

    /**
     * Remove a range. Use Date instances or numbers(timestamp).
     * @param {Date|number} start - the start date
     * @param {Date|number} end - the end date
     * @param {null|'date'|'month'|'year'} type - Range type. If falsy, start and end values are considered as timestamp
     * @example
     * const start = new Date(2015, 1, 3);
     * const end = new Date(2015, 2, 6);
     *
     * datepicker.removeRange(start, end);
     */
    removeRange: function(start, end, type) {
      start = new Date(start);
      end = new Date(end);

      if (type) {
        // @todo Consider time-range on timePicker
        start = dateUtil.cloneWithStartOf(start, type);
        end = dateUtil.cloneWithEndOf(end, type);
      }

      this._rangeModel.exclude(start.getTime(), end.getTime());
      this._refreshFromRanges();
    },

    /**
     * Add an opener.
     * @param {HTMLElement|string} opener - element or selector of opener
     */
    addOpener: function(opener) {
      opener = util.getElement(opener);

      if (!this._isOpener(opener)) {
        this._openers.push(opener);
        this._setOpenerEvents(opener);
      }
    },

    /**
     * Remove an opener.
     * @param {HTMLElement|string} opener - element or selector of opener
     */
    removeOpener: function(opener) {
      var index;

      opener = util.getElement(opener);
      index = inArray(opener, this._openers);

      if (index > -1) {
        this._removeOpenerEvents(opener);
        this._openers.splice(index, 1);
      }
    },

    /**
     * Remove all openers.
     */
    removeAllOpeners: function() {
      forEachArray(
        this._openers,
        function(opener) {
          this._removeOpenerEvents(opener);
        },
        this
      );
      this._openers = [];
    },

    /**
     * Open the date picker.
     * @example
     * datepicker.open();
     */
    open: function() {
      if (this.isOpened() || !this._isEnabled) {
        return;
      }

      this._calendar.draw({
        date: this._date,
        type: this._type
      });
      this._show();

      if (!this.showAlways) {
        this._setDocumentEvents();
      }

      /**
       * Occur after the date picker opens.
       * @event DatePicker#open
       * @see {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents#on datepicker.on()} to bind event handlers.
       * @see {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents#off datepicker.off()} to unbind event handlers.
       * @see Refer to {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents CustomEvents from tui-code-snippet} for more methods. DatePicker mixes in the methods from CustomEvents.
       * @example
       * // bind the 'open' event
       * datepicker.on('open', function() {
       *     alert('open');
       * });
       *
       * // unbind the 'open' event
       * datepicker.off('open');
       */
      this.fire('open');
    },

    /**
     * Raise the calendar type. (date -> month -> year)
     * @param {Date} [date] - Date to set
     */
    drawUpperCalendar: function(date) {
      var calendarType = this.getCalendarType();

      if (calendarType === TYPE_DATE) {
        this._calendar.draw({
          date: date,
          type: TYPE_MONTH
        });
      } else if (calendarType === TYPE_MONTH) {
        this._calendar.draw({
          date: date,
          type: TYPE_YEAR
        });
      }
    },

    /**
     * Lower the calendar type. (year -> month -> date)
     * @param {Date} [date] - Date to set
     */
    drawLowerCalendar: function(date) {
      var calendarType = this.getCalendarType();
      var pickerType = this.getType();
      var isLast = calendarType === pickerType;

      if (isLast) {
        return;
      }

      if (calendarType === TYPE_MONTH) {
        this._calendar.draw({
          date: date,
          type: TYPE_DATE
        });
      } else if (calendarType === TYPE_YEAR) {
        this._calendar.draw({
          date: date,
          type: TYPE_MONTH
        });
      }
    },

    /**
     * Close the date picker.
     * @exmaple
     * datepicker.close();
     */
    close: function() {
      if (!this.isOpened()) {
        return;
      }
      this._removeDocumentEvents();
      this._hide();

      /**
       * Occur after the date picker closes.
       * @event DatePicker#close
       * @see {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents#on datepicker.on()} to bind event handlers.
       * @see {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents#off datepicker.off()} to unbind event handlers.
       * @see Refer to {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents CustomEvents from tui-code-snippet} for more methods. DatePicker mixes in the methods from CustomEvents.
       * @example
       * // bind the 'close' event
       * datepicker.on('close', function() {
       *     alert('close');
       * });
       *
       * // unbind the 'close' event
       * datepicker.off('close');
       */
      this.fire('close');
    },

    /**
     * Toggle the date picker.
     * @example
     * datepicker.toggle();
     */
    toggle: function() {
      if (this.isOpened()) {
        this.close();
      } else {
        this.open();
      }
    },

    /**
     * Return the selected date.
     * @returns {?Date} - selected date
     * @example
     * // 2015-04-13
     * datepicker.getDate(); // new Date(2015, 3, 13)
     */
    getDate: function() {
      if (!this._date) {
        return null;
      }

      return new Date(this._date);
    },

    /**
     * Select the date.
     * @param {Date|number} date - Date instance or timestamp to set
     * @example
     * datepicker.setDate(new Date()); // Set today
     */
    // eslint-disable-next-line complexity
    setDate: function(date) {
      var isValidInput, newDate, shouldUpdate;

      if (date === null) {
        this.setNull();

        return;
      }

      isValidInput = isNumber(date) || isDate(date);
      newDate = new Date(date);
      shouldUpdate = isValidInput && this._isChanged(newDate) && this.isSelectable(newDate);

      if (shouldUpdate) {
        newDate = new Date(date);
        this._date = newDate;
        this._calendar.draw({ date: newDate });
        if (this._timePicker) {
          this._timePicker.setTime(newDate.getHours(), newDate.getMinutes());
        }
        this._syncToInput();

        /**
         * Occur after the selected date is changed.
         * @event DatePicker#change
         * @see {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents#on datepicker.on()} to bind event handlers.
         * @see {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents#off datepicker.off()} to unbind event handlers.
         * @see Refer to {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents CustomEvents from tui-code-snippet} for more methods. DatePicker mixes in the methods from CustomEvents.
         * @example
         * // bind the 'change' event
         * datepicker.on('change', function() {
         *     console.log(`Selected date: ${datepicker.getDate()}`);
         * });
         *
         * // unbind the 'change' event
         * datepicker.off('change');
         */
        this.fire('change');
      }
    },

    /**
     * Set no date to be selected. (Selected date: null)
     */
    setNull: function() {
      var calendarDate = this._calendar.getDate();
      var isChagned = this._date !== null;

      this._date = null;

      if (this._datepickerInput) {
        this._datepickerInput.clearText();
      }
      if (this._timePicker) {
        this._timePicker.setTime(0, 0);
      }

      // View update
      if (!this.isSelectable(calendarDate)) {
        this._calendar.draw({
          date: new Date(this._rangeModel.getMinimumValue())
        });
      } else {
        this._calendar.draw();
      }

      if (isChagned) {
        this.fire('change');
      }
    },

    /**
     * Select the date by the date string format.
     * @param {String} [format] - Date string format
     * @example
     * datepicker.setDateFormat('yyyy-MM-dd');
     * datepicker.setDateFormat('MM-dd, yyyy');
     * datepicker.setDateFormat('yy/M/d');
     * datepicker.setDateFormat('yy/MM/dd');
     */
    setDateFormat: function(format) {
      this._datepickerInput.setFormat(format);
      this._syncToInput();
    },

    /**
     * Return whether the datepicker opens or not
     * @returns {boolean}
     * @example
     * datepicker.close();
     * datepicker.isOpened(); // false
     *
     * datepicker.open();
     * datepicker.isOpened(); // true
     */
    isOpened: function() {
      return !hasClass(this._element, CLASS_NAME_HIDDEN);
    },

    /**
     * Return the time picker instance
     * @returns {?TimePicker} - TimePicker instance
     * @see {@link https://nhn.github.io/tui.time-picker/latest tui-time-picker}
     * @example
     * const timePicker = this.getTimePicker();
     */
    getTimePicker: function() {
      return this._timePicker;
    },

    /**
     * Return the calendar instance.
     * @see {@link calendar Calendar}
     * @returns {Calendar}
     */
    getCalendar: function() {
      return this._calendar;
    },

    /**
     * Return the locale text object.
     * @see {@link DatePicker#localeTexts DatePicker.localeTexts}
     * @returns {object}
     */
    getLocaleText: function() {
      return localeTexts[this._language] || localeTexts[DEFAULT_LANGUAGE_TYPE];
    },

    /**
     * Set the input element
     * @param {string|HTMLElement} element - Input element or selector
     * @param {object} [options] - Input option
     * @param {string} [options.format = prevInput.format] - Format of the Date string in the input
     * @param {boolean} [options.syncFromInput = false] - Whether set the date from the input
     */
    setInput: function(element, options) {
      var prev = this._datepickerInput;
      var localeText = this.getLocaleText();
      var prevFormat;
      options = options || {};

      if (prev) {
        prevFormat = prev.getFormat();
        prev.destroy();
      }

      this._datepickerInput = new DatePickerInput(element, {
        format: options.format || prevFormat,
        id: this._id,
        localeText: localeText
      });

      this._datepickerInput.on(
        {
          change: this._onChangeInput,
          click: this.open
        },
        this
      );

      if (options.syncFromInput) {
        this._syncFromInput();
      } else {
        this._syncToInput();
      }
    },

    /**
     * Enable the date picker.
     */
    enable: function() {
      if (this._isEnabled) {
        return;
      }
      this._isEnabled = true;
      this._datepickerInput.enable();

      forEachArray(
        this._openers,
        function(opener) {
          opener.removeAttribute('disabled');
          this._setOpenerEvents(opener);
        },
        this
      );
    },

    /**
     * Disable the date picker.
     */
    disable: function() {
      if (!this._isEnabled) {
        return;
      }

      this._isEnabled = false;
      this.close();
      this._datepickerInput.disable();

      forEachArray(
        this._openers,
        function(opener) {
          opener.setAttribute('disabled', true);
          this._removeOpenerEvents(opener);
        },
        this
      );
    },

    /**
     * Return whether the date picker is disabled
     * @returns {boolean}
     */
    isDisabled: function() {
      // @todo this._isEnabled --> this._isDisabled
      return !this._isEnabled;
    },

    /**
     * Apply a CSS class to the date picker.
     * @param {string} className - Class name
     */
    addCssClass: function(className) {
      addClass(this._element, className);
    },

    /**
     * Remove a CSS class from the date picker.
     * @param {string} className - Class name
     */
    removeCssClass: function(className) {
      removeClass(this._element, className);
    },

    /**
     * Return the date elements on the calendar.
     * @returns {HTMLElement[]}
     */
    getDateElements: function() {
      return this._calendar.getDateElements();
    },

    /**
     * Return the first overlapped range from the point or range.
     * @param {Date|number} startDate - Start date to find overlapped range
     * @param {Date|number} endDate - End date to find overlapped range
     * @returns {Array.<Date>} - \[startDate, endDate]
     */
    findOverlappedRange: function(startDate, endDate) {
      var startTimestamp = new Date(startDate).getTime();
      var endTimestamp = new Date(endDate).getTime();
      var overlappedRange = this._rangeModel.findOverlappedRange(startTimestamp, endTimestamp);

      return [new Date(overlappedRange[0]), new Date(overlappedRange[1])];
    },

    /**
     * Change language.
     * @param {string} language - Language code. English('en') and Korean('ko') are provided as default.
     * @see To set to the other languages, use {@link DatePicker#localeTexts DatePicker.localeTexts}.
     */
    changeLanguage: function(language) {
      this._language = language;
      this._calendar.changeLanguage(this._language);
      this._datepickerInput.changeLocaleTitles(this.getLocaleText().titles);
      this.setDateFormat(this._datepickerInput.getFormat());

      if (this._timePicker) {
        this._timePicker.changeLanguage(this._language);
      }
    },

    /**
     * Destroy the date picker.
     */
    destroy: function() {
      this._removeDocumentEvents();
      this._calendar.destroy();
      if (this._timePicker) {
        this._timePicker.destroy();
      }
      if (this._datepickerInput) {
        this._datepickerInput.destroy();
      }
      this._removeEvents();
      removeElement(this._element);
      this.removeAllOpeners();

      this._calendar = this._timePicker = this._datepickerInput = this._container = this._element = this._date = this._rangeModel = this._openers = this._isEnabled = this._id = null;
    }
  }
);

CustomEvents.mixin(DatePicker);
module.exports = DatePicker;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check whether the given variable is an object or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is an object or not.
 * If the given variable is an object, return true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is object?
 * @memberof module:type
 */
function isObject(obj) {
  return obj === Object(obj);
}

module.exports = isObject;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Execute the provided callback once for each property of object which actually exist.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Execute the provided callback once for each property of object which actually exist.
 * If the callback function returns false, the loop will be stopped.
 * Callback function(iteratee) is invoked with three arguments:
 *  1) The value of the property
 *  2) The name of the property
 *  3) The object being traversed
 * @param {Object} obj The object that will be traversed
 * @param {function} iteratee  Callback function
 * @param {Object} [context] Context(this) of callback function
 * @memberof module:collection
 * @example
 * var forEachOwnProperties = require('tui-code-snippet/collection/forEachOwnProperties'); // node, commonjs
 *
 * var sum = 0;
 *
 * forEachOwnProperties({a:1,b:2,c:3}, function(value){
 *     sum += value;
 * });
 * alert(sum); // 6
 */
function forEachOwnProperties(obj, iteratee, context) {
  var key;

  context = context || null;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (iteratee.call(context, obj[key], key, obj) === false) {
        break;
      }
    }
  }
}

module.exports = forEachOwnProperties;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Set className value
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isArray = __webpack_require__(6);
var isUndefined = __webpack_require__(12);

/**
 * Set className value
 * @param {(HTMLElement|SVGElement)} element - target element
 * @param {(string|string[])} cssClass - class names
 * @private
 */
function setClassName(element, cssClass) {
  cssClass = isArray(cssClass) ? cssClass.join(' ') : cssClass;

  cssClass = cssClass.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

  if (isUndefined(element.className.baseVal)) {
    element.className = cssClass;

    return;
  }

  element.className.baseVal = cssClass;
}

module.exports = setClassName;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Find parent element recursively
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var matches = __webpack_require__(40);

/**
 * Find parent element recursively
 * @param {HTMLElement} element - base element to start find
 * @param {string} selector - selector string for find
 * @returns {HTMLElement} - element finded or null
 * @memberof module:domUtil
 */
function closest(element, selector) {
  var parent = element.parentNode;

  if (matches(element, selector)) {
    return element;
  }

  while (parent && parent !== document) {
    if (matches(parent, selector)) {
      return parent;
    }

    parent = parent.parentNode;
  }

  return null;
}

module.exports = closest;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Get data value from data-attribute
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var convertToKebabCase = __webpack_require__(42);

/**
 * Get data value from data-attribute
 * @param {HTMLElement} element - target element
 * @param {string} key - key
 * @returns {string} value
 * @memberof module:domUtil
 */
function getData(element, key) {
  if (element.dataset) {
    return element.dataset[key];
  }

  return element.getAttribute('data-' + convertToKebabCase(key));
}

module.exports = getData;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check element has specific css class
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var inArray = __webpack_require__(3);
var getClass = __webpack_require__(17);

/**
 * Check element has specific css class
 * @param {(HTMLElement|SVGElement)} element - target element
 * @param {string} cssClass - css class
 * @returns {boolean}
 * @memberof module:domUtil
 */
function hasClass(element, cssClass) {
  var origin;

  if (element.classList) {
    return element.classList.contains(cssClass);
  }

  origin = getClass(element).split(/\s+/);

  return inArray(cssClass, origin) > -1;
}

module.exports = hasClass;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check whether the given variable is an instance of Date or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is an instance of Date or not.
 * If the given variables is an instance of Date, return true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is an instance of Date?
 * @memberof module:type
 */
function isDate(obj) {
  return obj instanceof Date;
}

module.exports = isDate;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Calendar component
 * @author NHN. FE dev Lab <dl_javascript@nhn.com>
 */



var defineClass = __webpack_require__(0);
var CustomEvents = __webpack_require__(8);
var addClass = __webpack_require__(16);
var hasClass = __webpack_require__(27);
var removeClass = __webpack_require__(18);
var removeElement = __webpack_require__(14);
var extend = __webpack_require__(7);

var Header = __webpack_require__(44);
var Body = __webpack_require__(49);
var localeTexts = __webpack_require__(10);
var constants = __webpack_require__(1);
var dateUtil = __webpack_require__(5);
var util = __webpack_require__(4);

var DEFAULT_WEEK_START_DAY = constants.DEFAULT_WEEK_START_DAY;
var DEFAULT_LANGUAGE_TYPE = constants.DEFAULT_LANGUAGE_TYPE;

var TYPE_DATE = constants.TYPE_DATE;
var TYPE_MONTH = constants.TYPE_MONTH;
var TYPE_YEAR = constants.TYPE_YEAR;

var CLASS_NAME_PREV_MONTH_BTN = constants.CLASS_NAME_PREV_MONTH_BTN;
var CLASS_NAME_PREV_YEAR_BTN = constants.CLASS_NAME_PREV_YEAR_BTN;
var CLASS_NAME_NEXT_YEAR_BTN = constants.CLASS_NAME_NEXT_YEAR_BTN;
var CLASS_NAME_NEXT_MONTH_BTN = constants.CLASS_NAME_NEXT_MONTH_BTN;

var CLASS_NAME_CALENDAR_MONTH = 'tui-calendar-month';
var CLASS_NAME_CALENDAR_YEAR = 'tui-calendar-year';
var CLASS_NAME_HIDDEN = 'tui-hidden';

var HEADER_SELECTOR = '.tui-calendar-header';
var BODY_SELECTOR = '.tui-calendar-body';

/**
 * @class
 * @description
 * Create a calendar by {@link DatePicker#createCalendar DatePicker.createCalendar()}.
 * @see {@link /tutorial-example07-calendar Calendar example}
 * @param {HTMLElement|string} container - Container or selector of the Calendar
 * @param {Object} [options] - Calendar options
 *     @param {Date} [options.date = new Date()] - Initial date (default: today)
 *     @param {('date'|'month'|'year')} [options.type = 'date'] - Calendar type. Determine whether to show a date, month, or year.
 *     @param {string} [options.language = 'en'] - Language code. English('en') and Korean('ko') are provided as default. To use the other languages, use {@link DatePicker#localeTexts DatePicker.localeTexts}.
 *     @param {boolean} [options.showToday = true] - Show today.
 *     @param {boolean} [options.showJumpButtons = false] - Show the yearly jump buttons (move to the previous and next year in 'date' Calendar)
 *     @param {boolean} [options.usageStatistics = true] - Send a hostname to Google Analytics (default: true)
 *     @param {string} [options.weekStartDay = 'Sun'] - Start of the week. 'Sun', 'Mon', ..., 'Sat'(default: 'Sun'(start on Sunday))
 * @example
 * import DatePicker from 'tui-date-picker' // ES6
 * // const DatePicker = require('tui-date-picker'); // CommonJS
 * // const DatePicker = tui.DatePicker;
 *
 * const calendar = DatePicker.createCalendar('#calendar-wrapper', {
 *     language: 'en',
 *     showToday: true,
 *     showJumpButtons: false,
 *     date: new Date(),
 *     type: 'date',
 *     weekStartDay: 'Mon',
 * });
 *
 * calendar.on('draw', function(event) {
 *     console.log(event.date);
 *     console.log(event.type);
 *     for (let i = 0, len = event.dateElements.length; i < len; i += 1) {
 *         const el = event.dateElements[i];
 *         const date = new Date(getData(el, 'timestamp'));
 *         console.log(date);
 *     }
 * });
 */
var Calendar = defineClass(
  /** @lends Calendar.prototype */ {
    static: {
      localeTexts: localeTexts
    },
    init: function(container, options) {
      options = extend(
        {
          language: DEFAULT_LANGUAGE_TYPE,
          showToday: true,
          showJumpButtons: false,
          date: new Date(),
          type: TYPE_DATE,
          usageStatistics: true,
          weekStartDay: DEFAULT_WEEK_START_DAY
        },
        options
      );

      /**
       * Container element
       * @type {HTMLElement}
       * @private
       */
      this._container = util.getElement(container);
      this._container.innerHTML =
        '<div class="tui-calendar">' +
        '    <div class="tui-calendar-header"></div>' +
        '    <div class="tui-calendar-body"></div>' +
        '</div>';

      /**
       * Wrapper element
       * @type {HTMLElement}
       * @private
       */
      this._element = this._container.firstChild;

      /**
       * Date
       * @type {Date}
       * @private
       */
      this._date = null;

      /**
       * Layer type
       * @type {string}
       * @private
       */
      this._type = null;

      /**
       * Header box
       * @type {Header}
       * @private
       */
      this._header = null;

      /**
       * Body box
       * @type {Body}
       * @private
       */
      this._body = null;

      this._initHeader(options);
      this._initBody(options);
      this.draw({
        date: options.date,
        type: options.type
      });

      if (options.usageStatistics) {
        util.sendHostName();
      }
    },

    /**
     * Initialize header
     * @param {object} options - Header options
     * @private
     */
    _initHeader: function(options) {
      var headerContainer = this._element.querySelector(HEADER_SELECTOR);

      this._header = new Header(headerContainer, options);
      this._header.on(
        'click',
        function(ev) {
          var target = util.getTarget(ev);
          if (hasClass(target, CLASS_NAME_PREV_MONTH_BTN)) {
            this.drawPrev();
          } else if (hasClass(target, CLASS_NAME_PREV_YEAR_BTN)) {
            this._onClickPrevYear();
          } else if (hasClass(target, CLASS_NAME_NEXT_MONTH_BTN)) {
            this.drawNext();
          } else if (hasClass(target, CLASS_NAME_NEXT_YEAR_BTN)) {
            this._onClickNextYear();
          }
        },
        this
      );
    },

    /**
     * Initialize body
     * @param {object} options - Body options
     * @private
     */
    _initBody: function(options) {
      var bodyContainer = this._element.querySelector(BODY_SELECTOR);

      this._body = new Body(bodyContainer, options);
    },

    /**
     * clickHandler - prev year button
     * @private
     */
    _onClickPrevYear: function() {
      if (this.getType() === TYPE_DATE) {
        this.draw({
          date: this._getRelativeDate(-12)
        });
      } else {
        this.drawPrev();
      }
    },

    /**
     * clickHandler - next year button
     * @private
     */
    _onClickNextYear: function() {
      if (this.getType() === TYPE_DATE) {
        this.draw({
          date: this._getRelativeDate(12)
        });
      } else {
        this.drawNext();
      }
    },

    /**
     * Returns whether the layer type is valid
     * @param {string} type - Layer type to check
     * @returns {boolean}
     * @private
     */
    _isValidType: function(type) {
      return type === TYPE_DATE || type === TYPE_MONTH || type === TYPE_YEAR;
    },

    /**
     * @param {Date} date - Date to draw
     * @param {string} type - Layer type to draw
     * @returns {boolean}
     * @private
     */
    _shouldUpdate: function(date, type) {
      var prevDate = this._date;

      if (!dateUtil.isValidDate(date)) {
        throw new Error('Invalid date');
      }

      if (!this._isValidType(type)) {
        throw new Error('Invalid layer type');
      }

      return (
        !prevDate ||
        prevDate.getFullYear() !== date.getFullYear() ||
        prevDate.getMonth() !== date.getMonth() ||
        this.getType() !== type
      );
    },

    /**
     * Render header & body elements
     * @private
     */
    _render: function() {
      var date = this._date;
      var type = this.getType();

      this._header.render(date, type);
      this._body.render(date, type);
      removeClass(this._element, CLASS_NAME_CALENDAR_MONTH, CLASS_NAME_CALENDAR_YEAR);

      switch (type) {
        case TYPE_MONTH:
          addClass(this._element, CLASS_NAME_CALENDAR_MONTH);
          break;
        case TYPE_YEAR:
          addClass(this._element, CLASS_NAME_CALENDAR_YEAR);
          break;
        default:
          break;
      }
    },

    /**
     * Returns relative date
     * @param {number} step - Month step
     * @returns {Date}
     * @private
     */
    _getRelativeDate: function(step) {
      var prev = this._date;

      return new Date(prev.getFullYear(), prev.getMonth() + step);
    },

    /**
     * Draw the calendar.
     * @param {Object} [options] - Draw options
     *   @param {Date} [options.date] - Date to set
     *   @param {('date'|'month'|'year')} [options.type = 'date'] - Calendar type. Determine whether to show a date, month, or year.
     * @example
     * calendar.draw();
     * calendar.draw({
     *     date: new Date()
     * });
     * calendar.draw({
     *     type: 'month'
     * });
     * calendar.draw({
     *     type: 'month',
     *     date: new Date()
     * });
     */
    draw: function(options) {
      var date, type;

      options = options || {};
      date = options.date || this._date;
      type = (options.type || this.getType()).toLowerCase();

      if (this._shouldUpdate(date, type)) {
        this._date = date;
        this._type = type;
        this._render();
      }

      /**
       * Occur after the calendar draws.
       * @event Calendar#draw
       * @see {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents#on calendar.on()} to bind event handlers.
       * @see {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents#off calendar.off()} to unbind event handlers.
       * @see Refer to {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents CustomEvents from tui-code-snippet} for more methods. Calendar mixes in the methods from CustomEvents.
       * @property {Date} date - Calendar date
       * @property {('date'|'month'|'year')} type - Calendar type
       * @property {HTMLElement[]} dateElements - elements for dates
       * @example
       * // bind the 'draw' event
       * calendar.on('draw', function({type, date}) {
       *     console.log(`Draw the ${type} calendar and its date is ${date}.`);
       * });
       *
       * // unbind the 'draw' event
       * calendar.off('draw');
       */
      this.fire('draw', {
        date: this._date,
        type: type,
        dateElements: this._body.getDateElements()
      });
    },

    /**
     * Show the calendar.
     */
    show: function() {
      removeClass(this._element, CLASS_NAME_HIDDEN);
    },

    /**
     * Hide the calendar.
     */
    hide: function() {
      addClass(this._element, CLASS_NAME_HIDDEN);
    },

    /**
     * Draw the next page.
     */
    drawNext: function() {
      this.draw({
        date: this.getNextDate()
      });
    },

    /**
     * Draw the previous page.
     */
    drawPrev: function() {
      this.draw({
        date: this.getPrevDate()
      });
    },

    /**
     * Return the next date.
     * @returns {Date}
     */
    getNextDate: function() {
      if (this.getType() === TYPE_DATE) {
        return this._getRelativeDate(1);
      }

      return this.getNextYearDate();
    },

    /**
     * Return the previous date.
     * @returns {Date}
     */
    getPrevDate: function() {
      if (this.getType() === TYPE_DATE) {
        return this._getRelativeDate(-1);
      }

      return this.getPrevYearDate();
    },

    /**
     * Return the date a year later.
     * @returns {Date}
     */
    getNextYearDate: function() {
      switch (this.getType()) {
        case TYPE_DATE:
        case TYPE_MONTH:
          return this._getRelativeDate(12); // 12 months = 1 year
        case TYPE_YEAR:
          return this._getRelativeDate(108); // 108 months = 9 years = 12 * 9
        default:
          throw new Error('Unknown layer type');
      }
    },

    /**
     * Return the date a year previously.
     * @returns {Date}
     */
    getPrevYearDate: function() {
      switch (this.getType()) {
        case TYPE_DATE:
        case TYPE_MONTH:
          return this._getRelativeDate(-12); // 12 months = 1 year
        case TYPE_YEAR:
          return this._getRelativeDate(-108); // 108 months = 9 years = 12 * 9
        default:
          throw new Error('Unknown layer type');
      }
    },

    /**
     * Change language.
     * @param {string} language - Language code. English('en') and Korean('ko') are provided as default.
     * @see To set to the other languages, use {@link DatePicker#localeTexts DatePicker.localeTexts}.
     */
    changeLanguage: function(language) {
      this._header.changeLanguage(language);
      this._body.changeLanguage(language);
      this._render();
    },

    /**
     * Return the rendered date.
     * @returns {Date}
     */
    getDate: function() {
      return new Date(this._date);
    },

    /**
     * Return the calendar's type.
     * @returns {('date'|'month'|'year')}
     */
    getType: function() {
      return this._type;
    },

    /**
     * Returns HTML elements for dates.
     * @returns {HTMLElement[]}
     */
    getDateElements: function() {
      return this._body.getDateElements();
    },

    /**
     * Apply a CSS class to the calendar.
     * @param {string} className - Class name
     */
    addCssClass: function(className) {
      addClass(this._element, className);
    },

    /**
     * Remove a CSS class from the calendar.
     * @param {string} className - Class name
     */
    removeCssClass: function(className) {
      removeClass(this._element, className);
    },

    /**
     * Destroy the calendar.
     */
    destroy: function() {
      this._header.destroy();
      this._body.destroy();
      removeElement(this._element);

      this._type = this._date = this._container = this._element = this._header = this._body = null;
    }
  }
);

CustomEvents.mixin(Calendar);
module.exports = Calendar;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Date <-> Text formatting module
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */



var inArray = __webpack_require__(3);
var forEachArray = __webpack_require__(2);
var defineClass = __webpack_require__(0);

var util = __webpack_require__(4);
var dateUtil = __webpack_require__(5);
var constants = __webpack_require__(1);
var localeTexts = __webpack_require__(10);

var rFormableKeys = /\\?(yyyy|yy|mmmm|mmm|mm|m|dd|d|hh|h|a)/gi;
var mapForConverting = {
  yyyy: {
    expression: '(\\d{4}|\\d{2})',
    type: constants.TYPE_YEAR
  },
  yy: {
    expression: '(\\d{4}|\\d{2})',
    type: constants.TYPE_YEAR
  },
  y: {
    expression: '(\\d{4}|\\d{2})',
    type: constants.TYPE_YEAR
  },
  M: {
    expression: '(1[012]|0[1-9]|[1-9])',
    type: constants.TYPE_MONTH
  },
  MM: {
    expression: '(1[012]|0[1-9]|[1-9])',
    type: constants.TYPE_MONTH
  },
  MMM: {
    expression: '(1[012]|0[1-9]|[1-9])',
    type: constants.TYPE_MONTH
  },
  MMMM: {
    expression: '(1[012]|0[1-9]|[1-9])',
    type: constants.TYPE_MONTH
  },
  mmm: {
    expression: '(1[012]|0[1-9]|[1-9])',
    type: constants.TYPE_MONTH
  },
  mmmm: {
    expression: '(1[012]|0[1-9]|[1-9])',
    type: constants.TYPE_MONTH
  },
  dd: {
    expression: '([12]\\d{1}|3[01]|0[1-9]|[1-9])',
    type: constants.TYPE_DATE
  },
  d: {
    expression: '([12]\\d{1}|3[01]|0[1-9]|[1-9])',
    type: constants.TYPE_DATE
  },
  D: {
    expression: '([12]\\d{1}|3[01]|0[1-9]|[1-9])',
    type: constants.TYPE_DATE
  },
  DD: {
    expression: '([12]\\d{1}|3[01]|0[1-9]|[1-9])',
    type: constants.TYPE_DATE
  },
  h: {
    expression: '(d{1}|0\\d{1}|1\\d{1}|2[0123])',
    type: constants.TYPE_HOUR
  },
  hh: {
    expression: '(d{1}|[01]\\d{1}|2[0123])',
    type: constants.TYPE_HOUR
  },
  H: {
    expression: '(d{1}|0\\d{1}|1\\d{1}|2[0123])',
    type: constants.TYPE_HOUR
  },
  HH: {
    expression: '(d{1}|[01]\\d{1}|2[0123])',
    type: constants.TYPE_HOUR
  },
  m: {
    expression: '(d{1}|[012345]\\d{1})',
    type: constants.TYPE_MINUTE
  },
  mm: {
    expression: '(d{1}|[012345]\\d{1})',
    type: constants.TYPE_MINUTE
  },
  a: {
    expression: '([ap]m)',
    type: constants.TYPE_MERIDIEM
  },
  A: {
    expression: '([ap]m)',
    type: constants.TYPE_MERIDIEM
  }
};

/**
 * @class
 * @ignore
 */
var DateTimeFormatter = defineClass(
  /** @lends DateTimeFormatter.prototype */ {
    init: function(rawStr, titles) {
      /**
       * @type {string}
       * @private
       */
      this._rawStr = rawStr;

      /**
       * @type {Array}
       * @private
       * @example
       *  rawStr = "yyyy-MM-dd" --> keyOrder = ['year', 'month', 'date']
       *  rawStr = "MM/dd, yyyy" --> keyOrder = ['month', 'date', 'year']
       */
      this._keyOrder = null;

      /**
       * @type {RegExp}
       * @private
       */
      this._regExp = null;

      /**
       * Titles
       * @type {object}
       * @private
       */
      this._titles = titles || localeTexts.en.titles;

      this._parseFormat();
    },

    /**
     * Parse initial format and make the keyOrder, regExp
     * @private
     */
    _parseFormat: function() {
      var regExpStr = '^';
      var matchedKeys = this._rawStr.match(rFormableKeys);
      var keyOrder = [];

      matchedKeys = util.filter(matchedKeys, function(key) {
        return key[0] !== '\\';
      });

      forEachArray(matchedKeys, function(key, index) {
        if (!/m/i.test(key)) {
          key = key.toLowerCase();
        }

        regExpStr += mapForConverting[key].expression + '[\\D\\s]*';
        keyOrder[index] = mapForConverting[key].type;
      });

      // This formatter does not allow additional numbers at the end of string.
      regExpStr += '$';

      this._keyOrder = keyOrder;

      this._regExp = new RegExp(regExpStr, 'gi');
    },

    /**
     * Parse string to dateHash
     * @param {string} str - Date string
     * @returns {Date}
     */
    parse: function(str) {
      var dateHash = {
        year: 0,
        month: 1,
        date: 1,
        hour: 0,
        minute: 0
      };
      var hasMeridiem = false;
      var isPM = false;
      var matched;

      this._regExp.lastIndex = 0;
      matched = this._regExp.exec(str);

      if (!matched) {
        throw Error('DateTimeFormatter: Not matched - "' + str + '"');
      }

      // eslint-disable-next-line complexity
      forEachArray(this._keyOrder, function(name, index) {
        var value = matched[index + 1];

        if (name === constants.TYPE_MERIDIEM && /[ap]m/i.test(value)) {
          hasMeridiem = true;
          isPM = /pm/i.test(value);
        } else {
          value = Number(value);

          if (value !== 0 && !value) {
            throw Error('DateTimeFormatter: Unknown value - ' + matched[index + 1]);
          }

          if (name === constants.TYPE_YEAR && value < 100) {
            value += 2000;
          }

          dateHash[name] = value;
        }
      });

      if (hasMeridiem) {
        isPM = isPM || dateHash.hour > 12;
        dateHash.hour %= 12;
        if (isPM) {
          dateHash.hour += 12;
        }
      }

      return new Date(
        dateHash.year,
        dateHash.month - 1,
        dateHash.date,
        dateHash.hour,
        dateHash.minute
      );
    },

    /**
     * Returns raw string of format
     * @returns {string}
     */
    getRawString: function() {
      return this._rawStr;
    },

    /**
     * Format date to string
     * @param {Date} dateObj - Date object
     * @returns {string}
     */
    format: function(dateObj) {
      var year = dateObj.getFullYear();
      var month = dateObj.getMonth() + 1;
      var dayInMonth = dateObj.getDate();
      var day = dateObj.getDay();
      var hour = dateObj.getHours();
      var minute = dateObj.getMinutes();
      var meridiem = 'a'; // Default value for unusing meridiem format
      var replaceMap;

      if (inArray(constants.TYPE_MERIDIEM, this._keyOrder) > -1) {
        meridiem = hour >= 12 ? 'pm' : 'am';
        hour = dateUtil.getMeridiemHour(hour);
      }

      replaceMap = {
        yyyy: year,
        yy: String(year).substr(2, 2),
        M: month,
        MM: dateUtil.prependLeadingZero(month),
        MMM: this._titles.MMM[month - 1],
        MMMM: this._titles.MMMM[month - 1],
        d: dayInMonth,
        dd: dateUtil.prependLeadingZero(dayInMonth),
        D: this._titles.D[day],
        DD: this._titles.DD[day],
        hh: dateUtil.prependLeadingZero(hour),
        h: hour,
        mm: dateUtil.prependLeadingZero(minute),
        m: minute,
        A: meridiem.toUpperCase(),
        a: meridiem
      };

      return this._rawStr.replace(rFormableKeys, function(key) {
        if (key[0] === '\\') {
          return key.substr(1);
        }

        return replaceMap[key] || replaceMap[key.toLowerCase()] || '';
      });
    }
  }
);

module.exports = DateTimeFormatter;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Bind DOM events
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isString = __webpack_require__(13);
var forEach = __webpack_require__(9);

var safeEvent = __webpack_require__(32);

/**
 * Bind DOM events.
 * @param {HTMLElement} element - element to bind events
 * @param {(string|object)} types - Space splitted events names or eventName:handler object
 * @param {(function|object)} handler - handler function or context for handler method
 * @param {object} [context] context - context for handler method.
 * @memberof module:domEvent
 * @example
 * var div = document.querySelector('div');
 * 
 * // Bind one event to an element.
 * on(div, 'click', toggle);
 * 
 * // Bind multiple events with a same handler to multiple elements at once.
 * // Use event names splitted by a space.
 * on(div, 'mouseenter mouseleave', changeColor);
 * 
 * // Bind multiple events with different handlers to an element at once.
 * // Use an object which of key is an event name and value is a handler function.
 * on(div, {
 *   keydown: highlight,
 *   keyup: dehighlight
 * });
 * 
 * // Set a context for handler method.
 * var name = 'global';
 * var repository = {name: 'CodeSnippet'};
 * on(div, 'drag', function() {
 *  console.log(this.name);
 * }, repository);
 * // Result when you drag a div: "CodeSnippet"
 */
function on(element, types, handler, context) {
  if (isString(types)) {
    forEach(types.split(/\s+/g), function(type) {
      bindEvent(element, type, handler, context);
    });

    return;
  }

  forEach(types, function(func, type) {
    bindEvent(element, type, func, handler);
  });
}

/**
 * Bind DOM events
 * @param {HTMLElement} element - element to bind events
 * @param {string} type - events name
 * @param {function} handler - handler function or context for handler method
 * @param {object} [context] context - context for handler method.
 * @private
 */
function bindEvent(element, type, handler, context) {
  /**
     * Event handler
     * @param {Event} e - event object
     */
  function eventHandler(e) {
    handler.call(context || element, e || window.event);
  }

  if ('addEventListener' in element) {
    element.addEventListener(type, eventHandler);
  } else if ('attachEvent' in element) {
    element.attachEvent('on' + type, eventHandler);
  }
  memorizeHandler(element, type, handler, eventHandler);
}

/**
 * Memorize DOM event handler for unbinding.
 * @param {HTMLElement} element - element to bind events
 * @param {string} type - events name
 * @param {function} handler - handler function that user passed at on() use
 * @param {function} wrappedHandler - handler function that wrapped by domevent for implementing some features
 * @private
 */
function memorizeHandler(element, type, handler, wrappedHandler) {
  var events = safeEvent(element, type);
  var existInEvents = false;

  forEach(events, function(obj) {
    if (obj.handler === handler) {
      existInEvents = true;

      return false;
    }

    return true;
  });

  if (!existInEvents) {
    events.push({
      handler: handler,
      wrappedHandler: wrappedHandler
    });
  }
}

module.exports = on;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Get event collection for specific HTML element
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var EVENT_KEY = '_feEventKey';

/**
 * Get event collection for specific HTML element
 * @param {HTMLElement} element - HTML element
 * @param {string} type - event type
 * @returns {array}
 * @private
 */
function safeEvent(element, type) {
  var events = element[EVENT_KEY];
  var handlers;

  if (!events) {
    events = element[EVENT_KEY] = {};
  }

  handlers = events[type];
  if (!handlers) {
    handlers = events[type] = [];
  }

  return handlers;
}

module.exports = safeEvent;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Unbind DOM events
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isString = __webpack_require__(13);
var forEach = __webpack_require__(9);

var safeEvent = __webpack_require__(32);

/**
 * Unbind DOM events
 * If a handler function is not passed, remove all events of that type.
 * @param {HTMLElement} element - element to unbind events
 * @param {(string|object)} types - Space splitted events names or eventName:handler object
 * @param {function} [handler] - handler function
 * @memberof module:domEvent
 * @example
 * // Following the example of domEvent#on
 * 
 * // Unbind one event from an element.
 * off(div, 'click', toggle);
 * 
 * // Unbind multiple events with a same handler from multiple elements at once.
 * // Use event names splitted by a space.
 * off(element, 'mouseenter mouseleave', changeColor);
 * 
 * // Unbind multiple events with different handlers from an element at once.
 * // Use an object which of key is an event name and value is a handler function.
 * off(div, {
 *   keydown: highlight,
 *   keyup: dehighlight
 * });
 * 
 * // Unbind events without handlers.
 * off(div, 'drag');
 */
function off(element, types, handler) {
  if (isString(types)) {
    forEach(types.split(/\s+/g), function(type) {
      unbindEvent(element, type, handler);
    });

    return;
  }

  forEach(types, function(func, type) {
    unbindEvent(element, type, func);
  });
}

/**
 * Unbind DOM events
 * If a handler function is not passed, remove all events of that type.
 * @param {HTMLElement} element - element to unbind events
 * @param {string} type - events name
 * @param {function} [handler] - handler function
 * @private
 */
function unbindEvent(element, type, handler) {
  var events = safeEvent(element, type);
  var index;

  if (!handler) {
    forEach(events, function(item) {
      removeHandler(element, type, item.wrappedHandler);
    });
    events.splice(0, events.length);
  } else {
    forEach(events, function(item, idx) {
      if (handler === item.handler) {
        removeHandler(element, type, item.wrappedHandler);
        index = idx;

        return false;
      }

      return true;
    });
    events.splice(index, 1);
  }
}

/**
 * Remove an event handler
 * @param {HTMLElement} element - An element to remove an event
 * @param {string} type - event type
 * @param {function} handler - event handler
 * @private
 */
function removeHandler(element, type, handler) {
  if ('removeEventListener' in element) {
    element.removeEventListener(type, handler);
  } else if ('detachEvent' in element) {
    element.detachEvent('on' + type, handler);
  }
}

module.exports = off;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview The entry file of DatePicker components
 * @author NHN. FE Development Team
 */



var DatePicker = __webpack_require__(21);
var DateRangePicker = __webpack_require__(60);
var Calendar = __webpack_require__(29);

__webpack_require__(61);

/**
 * Create a calendar.
 * @see {@link Calendar}
 * @see {@link /tutorial-example07-calendar Calendar example}
 * @static
 * @param {HTMLElement|string} wrapperElement - Container element or selector of the Calendar
 * @param {Object} [options] - {@link Calendar} options. Refer to the {@link Calendar Calendar instance's options}.
 * @returns {Calendar}
 * @example
 * const calendar = DatePicker.createCalendar('#calendar-wrapper', {
 *    language: 'en',
 *    showToday: true,
 *    showJumpButtons: false,
 *    date: new Date(),
 *    type: 'date'
 * });
 */
DatePicker.createCalendar = function(wrapperElement, options) {
  return new Calendar(wrapperElement, options);
};

/**
 * Create a date-range picker.
 * @see {@link DateRangePicker}
 * @see {@link /tutorial-example08-daterangepicker DateRangePicker example}
 * @static
 * @param {object} options - {@link DateRangePicker} options. Refer to the {@link DateRangePicker DateRangePicker instance's options}.
 * @returns {DateRangePicker}
 * @example
 * const rangepicker = DatePicker.createRangePicker({
 *     startpicker: {
 *         input: '#start-input',
 *         container: '#start-container'
 *     },
 *     endpicker: {
 *         input: '#end-input',
 *         container: '#end-container'
 *     },
 *     type: 'date',
 *     format: 'yyyy-MM-dd'
 *     selectableRanges: [
 *         [new Date(2017, 3, 1), new Date(2017, 5, 1)],
 *         [new Date(2017, 6, 3), new Date(2017, 10, 5)]
 *     ]
 * });
 */
DatePicker.createRangePicker = function(options) {
  return new DateRangePicker(options);
};

module.exports = DatePicker;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Provide a simple inheritance in prototype-oriented.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var createObject = __webpack_require__(36);

/**
 * Provide a simple inheritance in prototype-oriented.
 * Caution :
 *  Don't overwrite the prototype of child constructor.
 *
 * @param {function} subType Child constructor
 * @param {function} superType Parent constructor
 * @memberof module:inheritance
 * @example
 * var inherit = require('tui-code-snippet/inheritance/inherit'); // node, commonjs
 *
 * // Parent constructor
 * function Animal(leg) {
 *     this.leg = leg;
 * }
 * Animal.prototype.growl = function() {
 *     // ...
 * };
 *
 * // Child constructor
 * function Person(name) {
 *     this.name = name;
 * }
 *
 * // Inheritance
 * inherit(Person, Animal);
 *
 * // After this inheritance, please use only the extending of property.
 * // Do not overwrite prototype.
 * Person.prototype.walk = function(direction) {
 *     // ...
 * };
 */
function inherit(subType, superType) {
  var prototype = createObject(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}

module.exports = inherit;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Create a new object with the specified prototype object and properties.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * @module inheritance
 */

/**
 * Create a new object with the specified prototype object and properties.
 * @param {Object} obj This object will be a prototype of the newly-created object.
 * @returns {Object}
 * @memberof module:inheritance
 */
function createObject(obj) {
  function F() {} // eslint-disable-line require-jsdoc
  F.prototype = obj;

  return new F();
}

module.exports = createObject;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check whether the given variable is existing or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isUndefined = __webpack_require__(12);
var isNull = __webpack_require__(38);

/**
 * Check whether the given variable is existing or not.
 * If the given variable is not null and not undefined, returns true.
 * @param {*} param - Target for checking
 * @returns {boolean} Is existy?
 * @memberof module:type
 * @example
 * var isExisty = require('tui-code-snippet/type/isExisty'); // node, commonjs
 *
 * isExisty(''); //true
 * isExisty(0); //true
 * isExisty([]); //true
 * isExisty({}); //true
 * isExisty(null); //false
 * isExisty(undefined); //false
*/
function isExisty(param) {
  return !isUndefined(param) && !isNull(param);
}

module.exports = isExisty;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check whether the given variable is null or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is null or not.
 * If the given variable(arguments[0]) is null, returns true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is null?
 * @memberof module:type
 */
function isNull(obj) {
  return obj === null;
}

module.exports = isNull;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check whether the given variable is a function or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is a function or not.
 * If the given variable is a function, return true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is function?
 * @memberof module:type
 */
function isFunction(obj) {
  return obj instanceof Function;
}

module.exports = isFunction;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check element match selector
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var inArray = __webpack_require__(3);
var toArray = __webpack_require__(41);

var elProto = Element.prototype;
var matchSelector = elProto.matches ||
    elProto.webkitMatchesSelector ||
    elProto.mozMatchesSelector ||
    elProto.msMatchesSelector ||
    function(selector) {
      var doc = this.document || this.ownerDocument;

      return inArray(this, toArray(doc.querySelectorAll(selector))) > -1;
    };

/**
 * Check element match selector
 * @param {HTMLElement} element - element to check
 * @param {string} selector - selector to check
 * @returns {boolean} is selector matched to element?
 * @memberof module:domUtil
 */
function matches(element, selector) {
  return matchSelector.call(element, selector);
}

module.exports = matches;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Transform the Array-like object to Array.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var forEachArray = __webpack_require__(2);

/**
 * Transform the Array-like object to Array.
 * In low IE (below 8), Array.prototype.slice.call is not perfect. So, try-catch statement is used.
 * @param {*} arrayLike Array-like object
 * @returns {Array} Array
 * @memberof module:collection
 * @example
 * var toArray = require('tui-code-snippet/collection/toArray'); // node, commonjs
 *
 * var arrayLike = {
 *     0: 'one',
 *     1: 'two',
 *     2: 'three',
 *     3: 'four',
 *     length: 4
 * };
 * var result = toArray(arrayLike);
 *
 * alert(result instanceof Array); // true
 * alert(result); // one,two,three,four
 */
function toArray(arrayLike) {
  var arr;
  try {
    arr = Array.prototype.slice.call(arrayLike);
  } catch (e) {
    arr = [];
    forEachArray(arrayLike, function(value) {
      arr.push(value);
    });
  }

  return arr;
}

module.exports = toArray;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Convert kebab-case
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Convert kebab-case
 * @param {string} key - string to be converted to Kebab-case
 * @private
 */
function convertToKebabCase(key) {
  return key.replace(/([A-Z])/g, function(match) {
    return '-' + match.toLowerCase();
  });
}

module.exports = convertToKebabCase;


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__43__;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Calendar Header
 * @author NHN. FE dev Lab <dl_javascript@nhn.com>
 */



var defineClass = __webpack_require__(0);
var CustomEvents = __webpack_require__(8);
var closest = __webpack_require__(25);
var removeElement = __webpack_require__(14);

var localeTexts = __webpack_require__(10);
var headerTmpl = __webpack_require__(45);
var DateTimeFormatter = __webpack_require__(30);
var constants = __webpack_require__(1);
var util = __webpack_require__(4);
var mouseTouchEvent = __webpack_require__(19);

var TYPE_DATE = constants.TYPE_DATE;
var TYPE_MONTH = constants.TYPE_MONTH;
var TYPE_YEAR = constants.TYPE_YEAR;

var CLASS_NAME_TITLE_MONTH = 'tui-calendar-title-month';
var CLASS_NAME_TITLE_YEAR = 'tui-calendar-title-year';
var CLASS_NAME_TITLE_YEAR_TO_YEAR = 'tui-calendar-title-year-to-year';

var SELECTOR_INNER_ELEM = '.tui-calendar-header-inner';
var SELECTOR_INFO_ELEM = '.tui-calendar-header-info';
var SELECTOR_BTN = '.tui-calendar-btn';

var YEAR_TITLE_FORMAT = 'yyyy';

/**
 * @ignore
 * @class
 * @param {string|HTMLElement} container - Header container or selector
 * @param {object} option - Header option
 * @param {string} option.language - Header language
 * @param {boolean} option.showToday - Has today box or not.
 * @param {boolean} option.showJumpButtons - Has jump buttons or not.
 */
var Header = defineClass(
  /** @lends Header.prototype */ {
    init: function(container, option) {
      /**
       * Container element
       * @type {HTMLElement}
       * @private
       */
      this._container = util.getElement(container);

      /**
       * Header inner element
       * @type {HTMLElement}
       * @private
       */
      this._innerElement = null;

      /**
       * Header info element
       * @type {HTMLElement}
       * @private
       */
      this._infoElement = null;

      /**
       * Render today box or not
       * @type {boolean}
       * @private
       */
      this._showToday = option.showToday;

      /**
       * Render jump buttons or not (next,prev year on date calendar)
       * @type {boolean}
       * @private
       */
      this._showJumpButtons = option.showJumpButtons;

      /**
       * Year_Month title formatter
       * @type {DateTimeFormatter}
       * @private
       */
      this._yearMonthTitleFormatter = null;

      /**
       * Year title formatter
       * @type {DateTimeFormatter}
       * @private
       */
      this._yearTitleFormatter = null;

      /**
       * Today formatter
       * @type {DateTimeFormatter}
       * @private
       */
      this._todayFormatter = null;

      this._setFormatters(localeTexts[option.language]);
      this._setEvents(option);
    },

    /**
     * @param {object} localeText - Locale text
     * @private
     */
    _setFormatters: function(localeText) {
      this._yearMonthTitleFormatter = new DateTimeFormatter(
        localeText.titleFormat,
        localeText.titles
      );
      this._yearTitleFormatter = new DateTimeFormatter(YEAR_TITLE_FORMAT, localeText.titles);
      this._todayFormatter = new DateTimeFormatter(localeText.todayFormat, localeText.titles);
    },

    /**
     * @param {object} option - Constructor option
     * @private
     */
    _setEvents: function() {
      mouseTouchEvent.on(this._container, 'click', this._onClickHandler, this);
    },

    /**
     * @private
     */
    _removeEvents: function() {
      this.off();
      mouseTouchEvent.off(this._container, 'click', this._onClickHandler);
    },

    /**
     * Fire customEvents
     * @param {Event} ev An event object
     * @private
     */
    _onClickHandler: function(ev) {
      var target = util.getTarget(ev);

      if (closest(target, SELECTOR_BTN)) {
        this.fire('click', ev);
      }
    },

    /**
     * @param {string} type - Calendar type
     * @returns {string}
     * @private
     */
    _getTitleClass: function(type) {
      switch (type) {
        case TYPE_DATE:
          return CLASS_NAME_TITLE_MONTH;
        case TYPE_MONTH:
          return CLASS_NAME_TITLE_YEAR;
        case TYPE_YEAR:
          return CLASS_NAME_TITLE_YEAR_TO_YEAR;
        default:
          return '';
      }
    },

    /**
     * @param {Date} date - date
     * @param {string} type - Calendar type
     * @returns {string}
     * @private
     */
    _getTitleText: function(date, type) {
      var currentYear, start, end;

      switch (type) {
        case TYPE_DATE:
          return this._yearMonthTitleFormatter.format(date);
        case TYPE_MONTH:
          return this._yearTitleFormatter.format(date);
        case TYPE_YEAR:
          currentYear = date.getFullYear();
          start = new Date(currentYear - 4, 0, 1);
          end = new Date(currentYear + 4, 0, 1);

          return (
            this._yearTitleFormatter.format(start) + ' - ' + this._yearTitleFormatter.format(end)
          );
        default:
          return '';
      }
    },

    /**
     * Change langauge
     * @param {string} language - Language
     */
    changeLanguage: function(language) {
      this._setFormatters(localeTexts[language]);
    },

    /**
     * Render header
     * @param {Date} date - date
     * @param {string} type - Calendar type
     */
    render: function(date, type) {
      var context = {
        showToday: this._showToday,
        showJumpButtons: this._showJumpButtons,
        todayText: this._todayFormatter.format(new Date()),
        isDateCalendar: type === TYPE_DATE,
        titleClass: this._getTitleClass(type),
        title: this._getTitleText(date, type)
      };

      this._container.innerHTML = headerTmpl(context).replace(/^\s+|\s+$/g, '');
      this._innerElement = this._container.querySelector(SELECTOR_INNER_ELEM);
      if (context.showToday) {
        this._infoElement = this._container.querySelector(SELECTOR_INFO_ELEM);
      }
    },

    /**
     * Destroy header
     */
    destroy: function() {
      this._removeEvents();
      removeElement(this._innerElement);
      removeElement(this._infoElement);
      this._container = this._showToday = this._showJumpButtons = this._yearMonthTitleFormatter = this._yearTitleFormatter = this._todayFormatter = this._innerElement = this._infoElement = null;
    }
  }
);

CustomEvents.mixin(Header);
module.exports = Header;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var template = __webpack_require__(11);

module.exports = function(context) {
  var source =
    '{{if isDateCalendar}}' +
    '  {{if showJumpButtons}}' +
    '    <div class="tui-calendar-header-inner tui-calendar-has-btns">' +
    '      <button class="tui-calendar-btn tui-calendar-btn-prev-year">Prev year</button>' +
    '      <button class="tui-calendar-btn tui-calendar-btn-prev-month">Prev month</button>' +
    '      <em class="tui-calendar-title {{titleClass}}">{{title}}</em>' +
    '      <button class="tui-calendar-btn tui-calendar-btn-next-month">Next month</button>' +
    '      <button class="tui-calendar-btn tui-calendar-btn-next-year">Next year</button>' +
    '    </div>' +
    '  {{else}}' +
    '    <div class="tui-calendar-header-inner">' +
    '      <button class="tui-calendar-btn tui-calendar-btn-prev-month">Prev month</button>' +
    '      <em class="tui-calendar-title {{titleClass}}">{{title}}</em>' +
    '      <button class="tui-calendar-btn tui-calendar-btn-next-month">Next month</button>' +
    '    </div>' +
    '  {{/if}}' +
    '{{else}}' +
    '  <div class="tui-calendar-header-inner">' +
    '    <button class="tui-calendar-btn tui-calendar-btn-prev-year">Prev year</button>' +
    '    <em class="tui-calendar-title {{titleClass}}">{{title}}</em>' +
    '    <button class="tui-calendar-btn tui-calendar-btn-next-year">Next year</button>' +
    '  </div>' +
    '{{/if}}' +
    '{{if showToday}}' +
    '  <div class="tui-calendar-header-info">' +
    '    <p class="tui-calendar-title-today">{{todayText}}</p>' +
    '  </div>' +
    '{{/if}}';

  return template(source, context);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check whether the given variable is a instance of HTMLNode or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is a instance of HTMLNode or not.
 * If the given variables is a instance of HTMLNode, return true.
 * @param {*} html - Target for checking
 * @returns {boolean} Is HTMLNode ?
 * @memberof module:type
 */
function isHTMLNode(html) {
  if (typeof HTMLElement === 'object') {
    return (html && (html instanceof HTMLElement || !!html.nodeType));
  }

  return !!(html && html.nodeType);
}

module.exports = isHTMLNode;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Send hostname on DOMContentLoaded.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isUndefined = __webpack_require__(12);
var imagePing = __webpack_require__(48);

var ms7days = 7 * 24 * 60 * 60 * 1000;

/**
 * Check if the date has passed 7 days
 * @param {number} date - milliseconds
 * @returns {boolean}
 * @private
 */
function isExpired(date) {
  var now = new Date().getTime();

  return now - date > ms7days;
}

/**
 * Send hostname on DOMContentLoaded.
 * To prevent hostname set tui.usageStatistics to false.
 * @param {string} appName - application name
 * @param {string} trackingId - GA tracking ID
 * @ignore
 */
function sendHostname(appName, trackingId) {
  var url = 'https://www.google-analytics.com/collect';
  var hostname = location.hostname;
  var hitType = 'event';
  var eventCategory = 'use';
  var applicationKeyForStorage = 'TOAST UI ' + appName + ' for ' + hostname + ': Statistics';
  var date = window.localStorage.getItem(applicationKeyForStorage);

  // skip if the flag is defined and is set to false explicitly
  if (!isUndefined(window.tui) && window.tui.usageStatistics === false) {
    return;
  }

  // skip if not pass seven days old
  if (date && !isExpired(date)) {
    return;
  }

  window.localStorage.setItem(applicationKeyForStorage, new Date().getTime());

  setTimeout(function() {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      imagePing(url, {
        v: 1,
        t: hitType,
        tid: trackingId,
        cid: hostname,
        dp: hostname,
        dh: appName,
        el: appName,
        ec: eventCategory
      });
    }
  }, 1000);
}

module.exports = sendHostname;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Request image ping.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var forEachOwnProperties = __webpack_require__(23);

/**
 * @module request
 */

/**
 * Request image ping.
 * @param {String} url url for ping request
 * @param {Object} trackingInfo infos for make query string
 * @returns {HTMLElement}
 * @memberof module:request
 * @example
 * var imagePing = require('tui-code-snippet/request/imagePing'); // node, commonjs
 *
 * imagePing('https://www.google-analytics.com/collect', {
 *     v: 1,
 *     t: 'event',
 *     tid: 'trackingid',
 *     cid: 'cid',
 *     dp: 'dp',
 *     dh: 'dh'
 * });
 */
function imagePing(url, trackingInfo) {
  var trackingElement = document.createElement('img');
  var queryString = '';
  forEachOwnProperties(trackingInfo, function(value, key) {
    queryString += '&' + key + '=' + value;
  });
  queryString = queryString.substring(1);

  trackingElement.src = url + '?' + queryString;

  trackingElement.style.display = 'none';
  document.body.appendChild(trackingElement);
  document.body.removeChild(trackingElement);

  return trackingElement;
}

module.exports = imagePing;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Calendar body
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */



var forEachArray = __webpack_require__(2);
var defineClass = __webpack_require__(0);

var DateLayer = __webpack_require__(50);
var MonthLayer = __webpack_require__(52);
var YearLayer = __webpack_require__(54);
var constants = __webpack_require__(1);

var TYPE_DATE = constants.TYPE_DATE;
var TYPE_MONTH = constants.TYPE_MONTH;
var TYPE_YEAR = constants.TYPE_YEAR;

/**
 * @ignore
 * @class
 */
var Body = defineClass(
  /** @lends Body.prototype */ {
    init: function(bodyContainer, options) {
      var language = options.language;
      var weekStartDay = options.weekStartDay;

      /**
       * Body container element
       * @type {HTMLElement}
       * @private
       */
      this._container = bodyContainer;

      /**
       * DateLayer
       * @type {DateLayer}
       * @private
       */
      this._dateLayer = new DateLayer(language, weekStartDay);

      /**
       * MonthLayer
       * @type {MonthLayer}
       * @private
       */
      this._monthLayer = new MonthLayer(language);

      /**
       * YearLayer
       * @type {YearLayer}
       * @private
       */
      this._yearLayer = new YearLayer(language);

      /**
       * Current Layer
       * @type {DateLayer|MonthLayer|YearLayer}
       * @private
       */
      this._currentLayer = this._dateLayer;
    },

    /**
     * Returns matched layer
     * @param {string} type - Layer type
     * @returns {Base} - Layer
     * @private
     */
    _getLayer: function(type) {
      switch (type) {
        case TYPE_DATE:
          return this._dateLayer;
        case TYPE_MONTH:
          return this._monthLayer;
        case TYPE_YEAR:
          return this._yearLayer;
        default:
          return this._currentLayer;
      }
    },

    /**
     * Iterate each layer
     * @param {Function} fn - function
     * @private
     */
    _eachLayer: function(fn) {
      forEachArray([this._dateLayer, this._monthLayer, this._yearLayer], fn);
    },

    /**
     * Change language
     * @param {string} language - Language
     */
    changeLanguage: function(language) {
      this._eachLayer(function(layer) {
        layer.changeLanguage(language);
      });
    },

    /**
     * Render body
     * @param {Date} date - date
     * @param {string} type - Layer type
     */
    render: function(date, type) {
      var nextLayer = this._getLayer(type);
      var prevLayer = this._currentLayer;

      prevLayer.remove();
      nextLayer.render(date, this._container);

      this._currentLayer = nextLayer;
    },

    /**
     * Returns date elements
     * @returns {HTMLElement[]}
     */
    getDateElements: function() {
      return this._currentLayer.getDateElements();
    },

    /**
     * Destory
     */
    destroy: function() {
      this._eachLayer(function(layer) {
        layer.remove();
      });

      this._container = this._currentLayer = this._dateLayer = this._monthLayer = this._yearLayer = null;
    }
  }
);

module.exports = Body;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Date layer
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */



var defineClass = __webpack_require__(0);

var dateUtil = __webpack_require__(5);
var bodyTmpl = __webpack_require__(51);
var LayerBase = __webpack_require__(20);
var TYPE_DATE = __webpack_require__(1).TYPE_DATE;
var WEEK_START_DAY_MAP = __webpack_require__(1).WEEK_START_DAY_MAP;

var DATE_SELECTOR = '.tui-calendar-date';
var DAYS_OF_WEEK = 7;

/**
 * @ignore
 * @class
 * @extends LayerBase
 * @param {string} language - Initial language
 */
var DateLayer = defineClass(
  LayerBase,
  /** @lends DateLayer.prototype */ {
    init: function(language, weekStartDay) {
      LayerBase.call(this, language);

      this.weekStartDay = WEEK_START_DAY_MAP[String(weekStartDay).toLowerCase()] || 0;
    },

    /**
     * Layer type
     * @type {string}
     * @private
     */
    _type: TYPE_DATE,

    /**
     * @override
     * @private
     * @returns {object} Template context
     */
    _makeContext: function(date) {
      var daysShort = this._localeText.titles.D;
      var year, month, days, i;

      date = date || new Date();
      year = date.getFullYear();
      month = date.getMonth() + 1;

      if (this.weekStartDay) {
        days = daysShort.slice();
        for (i = 0; i < this.weekStartDay; i += 1) {
          days.push(days.shift());
        }
        daysShort = days;
      }

      return {
        Sun: daysShort[0],
        Mon: daysShort[1],
        Tue: daysShort[2],
        Wed: daysShort[3],
        Thu: daysShort[4],
        Fri: daysShort[5],
        Sat: daysShort[6],
        year: year,
        month: month,
        weeks: this._getWeeks(year, month)
      };
    },

    /**
     * weeks (templating) for date-calendar
     * @param {number} year - Year
     * @param {number} month - Month
     * @returns {Array.<Array.<Date>>}
     * @private
     */
    _getWeeks: function(year, month) {
      var weekNumber = 0;
      var weeksCount = 6; // Fix for no changing height
      var weeks = [];
      var week, dates, i;

      while (weekNumber < weeksCount) {
        dates = [];

        for (i = this.weekStartDay; i < DAYS_OF_WEEK + this.weekStartDay; i += 1) {
          dates.push(dateUtil.getDateOfWeek(year, month, weekNumber, i));
        }

        week = this._getWeek(year, month, dates);

        if (this.weekStartDay && !_isFirstWeek(weekNumber, week[0].dayInMonth)) {
          weeks.push(this._getFirstWeek(year, month));
          weeksCount -= 1; // Fix for no changing height
        }

        weeks.push(week);
        weekNumber += 1;
      }

      return weeks;
    },

    /**
     * week (templating) for date-calendar
     * @param {number} currentYear
     * @param {number} currentMonth
     * @param {Array.<Date>} dates
     * @private
     */
    _getWeek: function(currentYear, currentMonth, dates) {
      var firstDateOfCurrentMonth = new Date(currentYear, currentMonth - 1, 1);
      var lastDateOfCurrentMonth = new Date(currentYear, currentMonth, 0);
      var contexts = [];
      var i = 0;
      var length = dates.length;
      var date, className;

      for (; i < length; i += 1) {
        className = 'tui-calendar-date';
        date = dates[i];

        if (date < firstDateOfCurrentMonth) {
          className += ' tui-calendar-prev-month';
        }

        if (date > lastDateOfCurrentMonth) {
          className += ' tui-calendar-next-month';
        }

        if (date.getDay() === 0) {
          className += ' tui-calendar-sun';
        } else if (date.getDay() === 6) {
          className += ' tui-calendar-sat';
        }

        contexts.push({
          dayInMonth: date.getDate(),
          className: className,
          timestamp: date.getTime()
        });
      }

      return contexts;
    },

    /**
     * Render date-layer
     * @override
     * @param {Date} date Date to render
     * @param {HTMLElement} container A container element for the rendered element
     */
    render: function(date, container) {
      var context = this._makeContext(date);

      container.innerHTML = bodyTmpl(context);
      this._element = container.firstChild;
    },

    /**
     * Return date elements
     * @override
     * @returns {HTMLElement[]}
     */
    getDateElements: function() {
      return this._element.querySelectorAll(DATE_SELECTOR);
    },

    _getFirstWeek: function(year, month) {
      var firstWeekDates = [];
      var i;

      for (i = this.weekStartDay; i < DAYS_OF_WEEK + this.weekStartDay; i += 1) {
        firstWeekDates.push(dateUtil.getDateOfWeek(year, month, -1, i));
      }

      return this._getWeek(year, month, firstWeekDates);
    }
  }
);

function _isFirstWeek(weekIndex, dayInMonth) {
  return weekIndex || dayInMonth === 1 || dayInMonth > DAYS_OF_WEEK;
}

module.exports = DateLayer;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var template = __webpack_require__(11);

module.exports = function(context) {
  var source =
    '<table class="tui-calendar-body-inner" cellspacing="0" cellpadding="0">' +
    '  <caption><span>Dates</span></caption>' +
    '  <thead class="tui-calendar-body-header">' +
    '    <tr>' +
    '      <th class="tui-sun" scope="col">{{Sun}}</th>' +
    '      <th scope="col">{{Mon}}</th>' +
    '      <th scope="col">{{Tue}}</th>' +
    '      <th scope="col">{{Wed}}</th>' +
    '      <th scope="col">{{Thu}}</th>' +
    '      <th scope="col">{{Fri}}</th>' +
    '      <th class="tui-sat" scope="col">{{Sat}}</th>' +
    '    </tr>' +
    '  </thead>' +
    '  <tbody>' +
    '    {{each weeks}}' +
    '    <tr class="tui-calendar-week">' +
    '      {{each @this}}' +
    '      <td class="{{@this["className"]}}" data-timestamp="{{@this["timestamp"]}}">{{@this["dayInMonth"]}}</td>' +
    '      {{/each}}' +
    '    </tr>' +
    '    {{/each}}' +
    '  </tbody>' +
    '</table>';

  return template(source, context);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Month layer
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */



var defineClass = __webpack_require__(0);

var bodyTmpl = __webpack_require__(53);
var LayerBase = __webpack_require__(20);
var TYPE_MONTH = __webpack_require__(1).TYPE_MONTH;
var dateUtil = __webpack_require__(5);

var DATE_SELECTOR = '.tui-calendar-month';

/**
 * @class
 * @extends LayerBase
 * @param {string} language - Initial language
 * @ignore
 */
var MonthLayer = defineClass(
  LayerBase,
  /** @lends MonthLayer.prototype */ {
    init: function(language) {
      LayerBase.call(this, language);
    },

    /**
     * Layer type
     * @type {string}
     * @private
     */
    _type: TYPE_MONTH,

    /**
     * @override
     * @returns {object} Template context
     * @private
     */
    _makeContext: function(date) {
      var monthsShort = this._localeText.titles.MMM;

      return {
        year: date.getFullYear(),
        Jan: monthsShort[0],
        Feb: monthsShort[1],
        Mar: monthsShort[2],
        Apr: monthsShort[3],
        May: monthsShort[4],
        Jun: monthsShort[5],
        Jul: monthsShort[6],
        Aug: monthsShort[7],
        Sep: monthsShort[8],
        Oct: monthsShort[9],
        Nov: monthsShort[10],
        Dec: monthsShort[11],
        getFirstDayTimestamp: dateUtil.getFirstDayTimestamp
      };
    },

    /**
     * Render month-layer element
     * @override
     * @param {Date} date Date to render
     * @param {HTMLElement} container A container element for the rendered element
     */
    render: function(date, container) {
      var context = this._makeContext(date);

      container.innerHTML = bodyTmpl(context);
      this._element = container.firstChild;
    },

    /**
     * Returns month elements
     * @override
     * @returns {HTMLElement[]}
     */
    getDateElements: function() {
      return this._element.querySelectorAll(DATE_SELECTOR);
    }
  }
);

module.exports = MonthLayer;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var template = __webpack_require__(11);

module.exports = function(context) {
  var source =
    '<table class="tui-calendar-body-inner">' +
    '  <caption><span>Months</span></caption>' +
    '  <tbody>' +
    '    <tr class="tui-calendar-month-group">' +
    '      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 0}}>{{Jan}}</td>' +
    '      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 1}}>{{Feb}}</td>' +
    '      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 2}}>{{Mar}}</td>' +
    '      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 3}}>{{Apr}}</td>' +
    '    </tr>' +
    '    <tr class="tui-calendar-month-group">' +
    '      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 4}}>{{May}}</td>' +
    '      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 5}}>{{Jun}}</td>' +
    '      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 6}}>{{Jul}}</td>' +
    '      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 7}}>{{Aug}}</td>' +
    '    </tr>' +
    '    <tr class="tui-calendar-month-group">' +
    '      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 8}}>{{Sep}}</td>' +
    '      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 9}}>{{Oct}}</td>' +
    '      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 10}}>{{Nov}}</td>' +
    '      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 11}}>{{Dec}}</td>' +
    '    </tr>' +
    '  </tbody>' +
    '</table>';

  return template(source, context);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Year layer
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */



var defineClass = __webpack_require__(0);

var bodyTmpl = __webpack_require__(55);
var LayerBase = __webpack_require__(20);
var TYPE_YEAR = __webpack_require__(1).TYPE_YEAR;
var dateUtil = __webpack_require__(5);

var DATE_SELECTOR = '.tui-calendar-year';

/**
 * @class
 * @extends LayerBase
 * @param {string} language - Initial language
 * @ignore
 */
var YearLayer = defineClass(
  LayerBase,
  /** @lends YearLayer.prototype */ {
    init: function(language) {
      LayerBase.call(this, language);
    },

    /**
     * Layer type
     * @type {string}
     * @private
     */
    _type: TYPE_YEAR,

    /**
     * @override
     * @returns {object} Template context
     * @private
     */
    _makeContext: function(date) {
      var year = date.getFullYear();

      return {
        yearGroups: [
          dateUtil.getRangeArr(year - 4, year - 2),
          dateUtil.getRangeArr(year - 1, year + 1),
          dateUtil.getRangeArr(year + 2, year + 4)
        ],
        getFirstDayTimestamp: dateUtil.getFirstDayTimestamp
      };
    },

    /**
     * Render year-layer element
     * @override
     * @param {Date} date Date to render
     * @param {HTMLElement} container A container element for the rendered element
     */
    render: function(date, container) {
      var context = this._makeContext(date);

      container.innerHTML = bodyTmpl(context);
      this._element = container.firstChild;
    },

    /**
     * Returns year elements
     * @override
     * @returns {HTMLElement[]}
     */
    getDateElements: function() {
      return this._element.querySelectorAll(DATE_SELECTOR);
    }
  }
);

module.exports = YearLayer;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var template = __webpack_require__(11);

module.exports = function(context) {
  var source =
    '<table class="tui-calendar-body-inner">' +
    '  <caption><span>Years</span></caption>' +
    '  <tbody>' +
    '    {{each yearGroups}}' +
    '    <tr class="tui-calendar-year-group">' +
    '      {{each @this}}' +
    '      <td class="tui-calendar-year" data-timestamp={{getFirstDayTimestamp @this 0}}>' +
    '        {{@this}}' +
    '      </td>' +
    '      {{/each}}' +
    '    </tr>' +
    '    {{/each}}' +
    '  </tbody>' +
    '</table>';

  return template(source, context);
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview RangeModel
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */



var forEachArray = __webpack_require__(2);
var defineClass = __webpack_require__(0);
var isNumber = __webpack_require__(15);

var Range = __webpack_require__(57);
var util = __webpack_require__(4);

/**
 * @class
 * @ignore
 * @param {Array.<Array.<number>>} ranges - Ranges
 */
var RangeModel = defineClass(
  /** @lends RangeModel.prototype */ {
    init: function(ranges) {
      ranges = ranges || [];

      /**
       * @type {Array.<Range>}
       * @private
       */
      this._ranges = [];

      forEachArray(
        ranges,
        function(range) {
          this.add(range[0], range[1]);
        },
        this
      );
    },

    /**
     * Whether the ranges contain a time or time-range
     * @param {number} start - Start
     * @param {number} [end] - End
     * @returns {boolean}
     */
    contains: function(start, end) {
      var i = 0;
      var length = this._ranges.length;
      var range;

      for (; i < length; i += 1) {
        range = this._ranges[i];
        if (range.contains(start, end)) {
          return true;
        }
      }

      return false;
    },

    /**
     * Whether overlaps with a point or range
     * @param {number} start - Start
     * @param {number} [end] - End
     * @returns {boolean}
     */
    hasOverlap: function(start, end) {
      var i = 0;
      var length = this._ranges.length;
      var range;

      for (; i < length; i += 1) {
        range = this._ranges[i];
        if (range.isOverlapped(start, end)) {
          return true;
        }
      }

      return false;
    },

    /**
     * Add range
     * @param {number} start - Start
     * @param {number} [end] - End
     */
    add: function(start, end) {
      var overlapped = false;
      var i = 0;
      var len = this._ranges.length;
      var range;

      for (; i < len; i += 1) {
        range = this._ranges[i];
        overlapped = range.isOverlapped(start, end);

        if (overlapped) {
          range.merge(start, end);
          break;
        }

        if (start < range.start) {
          break;
        }
      }

      if (!overlapped) {
        this._ranges.splice(i, 0, new Range(start, end));
      }
    },

    /**
     * Returns minimum value in ranges
     * @returns {number}
     */
    getMinimumValue: function() {
      return this._ranges[0].start;
    },

    /**
     * Returns maximum value in ranges
     * @returns {number}
     */
    getMaximumValue: function() {
      var length = this._ranges.length;

      return this._ranges[length - 1].end;
    },

    /**
     * @param {number} start - Start
     * @param {number} [end] - End
     */
    exclude: function(start, end) {
      if (!isNumber(end)) {
        end = start;
      }

      forEachArray(
        this._ranges,
        function(range) {
          var rangeEnd;

          if (range.isOverlapped(start, end)) {
            rangeEnd = range.end; // Save before excluding
            range.exclude(start, end);

            if (end + 1 <= rangeEnd) {
              this.add(end + 1, rangeEnd); // Add split range
            }
          }
        },
        this
      );

      // Reduce empty ranges
      this._ranges = util.filter(this._ranges, function(range) {
        return !range.isEmpty();
      });
    },

    /**
     * Returns the first overlapped range from the point or range
     * @param {number} start - Start
     * @param {number} end - End
     * @returns {Array.<number>} - [start, end]
     */
    findOverlappedRange: function(start, end) {
      var i = 0;
      var len = this._ranges.length;
      var range;

      for (; i < len; i += 1) {
        range = this._ranges[i];
        if (range.isOverlapped(start, end)) {
          return [range.start, range.end];
        }
      }

      return null;
    }
  }
);

module.exports = RangeModel;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Range (in RangeModel)
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */



var defineClass = __webpack_require__(0);
var isNumber = __webpack_require__(15);

/**
 * @class
 * @ignore
 * @param {number} start - Start of range
 * @param {number} [end] - End of range
 */
var Range = defineClass(
  /** @lends Range.prototype */ {
    init: function(start, end) {
      this.setRange(start, end);
    },

    /**
     * Set range
     * @param {number} start - Start number
     * @param {number} [end] - End number
     */
    setRange: function(start, end) {
      if (!isNumber(end)) {
        end = start;
      }

      this.start = Math.min(start, end);
      this.end = Math.max(start, end);
    },

    /**
     * Merge range
     * @param {number} start - Start
     * @param {number} [end] - End
     */
    merge: function(start, end) {
      if (!isNumber(start) || !isNumber(end) || !this.isOverlapped(start, end)) {
        return;
      }

      this.start = Math.min(start, this.start);
      this.end = Math.max(end, this.end);
    },

    /**
     * Whether being empty.
     * @returns {boolean}
     */
    isEmpty: function() {
      return !isNumber(this.start) || !isNumber(this.end);
    },

    /**
     * Set empty
     */
    setEmpty: function() {
      this.start = this.end = null;
    },

    /**
     * Whether containing a range.
     * @param {number} start - Start
     * @param {number} [end] - End
     * @returns {boolean}
     */
    contains: function(start, end) {
      if (!isNumber(end)) {
        end = start;
      }

      return this.start <= start && end <= this.end;
    },

    /**
     * Whether overlaps with a range
     * @param {number} start - Start
     * @param {number} [end] - End
     * @returns {boolean}
     */
    isOverlapped: function(start, end) {
      if (!isNumber(end)) {
        end = start;
      }

      return this.start <= end && this.end >= start;
    },

    /**
     * Exclude a range
     * @param {number} start - Start
     * @param {number} end - End
     */
    exclude: function(start, end) {
      if (start <= this.start && end >= this.end) {
        // Excluding range contains this
        this.setEmpty();
      } else if (this.contains(start)) {
        this.setRange(this.start, start - 1);
      } else if (this.contains(end)) {
        this.setRange(end + 1, this.end);
      }
    }
  }
);

module.exports = Range;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var template = __webpack_require__(11);

module.exports = function(context) {
  var source =
    '<div class="tui-datepicker">' +
    '  {{if timePicker}}' +
    '    {{if isTab}}' +
    '      <div class="tui-datepicker-selector">' +
    '        <button type="button" class="tui-datepicker-selector-button tui-is-checked" aria-label="selected">' +
    '          <span class="tui-ico-date"></span>{{localeText["date"]}}' +
    '        </button>' +
    '        <button type="button" class="tui-datepicker-selector-button">' +
    '          <span class="tui-ico-time"></span>{{localeText["time"]}}' +
    '        </button>' +
    '      </div>' +
    '      <div class="tui-datepicker-body">' +
    '        <div class="tui-calendar-container"></div>' +
    '        <div class="tui-timepicker-container"></div>' +
    '      </div>' +
    '    {{else}}' +
    '      <div class="tui-datepicker-body">' +
    '        <div class="tui-calendar-container"></div>' +
    '      </div>' +
    '      <div class="tui-datepicker-footer">' +
    '        <div class="tui-timepicker-container"></div>' +
    '      </div>' +
    '    {{/if}}' +
    '  {{else}}' +
    '    <div class="tui-datepicker-body">' +
    '      <div class="tui-calendar-container"></div>' +
    '    </div>' +
    '  {{/if}}' +
    '</div>';

  return template(source, context);
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview DatePicker input(element) component
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */



var defineClass = __webpack_require__(0);
var CustomEvents = __webpack_require__(8);
var on = __webpack_require__(31);
var off = __webpack_require__(33);

var DateTimeFormatter = __webpack_require__(30);
var mouseTouchEvent = __webpack_require__(19);
var util = __webpack_require__(4);

var DEFAULT_FORMAT = 'yyyy-MM-dd';

/**
 * DatePicker Input
 * @ignore
 * @class
 * @param {string|HTMLElement} inputElement - Input element or selector
 * @param {object} option - Option
 * @param {string} option.id - Id
 * @param {string} option.format - Text format
 */
var DatePickerInput = defineClass(
  /** @lends DatePickerInput.prototype */ {
    init: function(inputElement, option) {
      option.format = option.format || DEFAULT_FORMAT;

      /**
       * Input element
       * @type {HTMLElement}
       * @private
       */
      this._input = util.getElement(inputElement);

      /**
       * Id
       * @type {string}
       * @private
       */
      this._id = option.id;

      /**
       * LocaleText titles
       * @type {Object}
       * @private
       */
      this._titles = option.localeText.titles;

      /**
       * Text<->DateTime Formatter
       * @type {DateTimeFormatter}
       * @private
       */
      this._formatter = new DateTimeFormatter(option.format, this._titles);

      this._setEvents();
    },

    /**
     * Change locale titles
     * @param {object} titles - locale text in format
     */
    changeLocaleTitles: function(titles) {
      this._titles = titles;
    },

    /**
     * Set input 'click', 'change' event
     * @private
     */
    _setEvents: function() {
      if (this._input) {
        on(this._input, 'change', this._onChangeHandler, this);
        mouseTouchEvent.on(this._input, 'click', this._onClickHandler, this);
      }
    },

    /**
     * Remove events
     * @private
     */
    _removeEvents: function() {
      this.off();

      if (this._input) {
        off(this._input, 'change', this._onChangeHandler);
        mouseTouchEvent.off(this._input, 'click', this._onClickHandler);
      }
    },

    /**
     * Onchange handler
     */
    _onChangeHandler: function() {
      this.fire('change');
    },

    /**
     * Onclick handler
     */
    _onClickHandler: function() {
      this.fire('click');
    },

    /**
     * Check element is same as the input element.
     * @param {HTMLElement} el - To check matched set of elements
     * @returns {boolean}
     */
    is: function(el) {
      return this._input === el;
    },

    /**
     * Enable input
     */
    enable: function() {
      if (this._input) {
        this._input.removeAttribute('disabled');
      }
    },

    /**
     * Disable input
     */
    disable: function() {
      if (this._input) {
        this._input.setAttribute('disabled', true);
      }
    },

    /**
     * Return format
     * @returns {string}
     */
    getFormat: function() {
      return this._formatter.getRawString();
    },

    /**
     * Set format
     * @param {string} format - Format
     */
    setFormat: function(format) {
      if (!format) {
        return;
      }

      this._formatter = new DateTimeFormatter(format, this._titles);
    },

    /**
     * Clear text
     */
    clearText: function() {
      if (this._input) {
        this._input.value = '';
      }
    },

    /**
     * Set value from date
     * @param {Date} date - Date
     */
    setDate: function(date) {
      if (this._input) {
        this._input.value = this._formatter.format(date);
      }
    },

    /**
     * Returns date from input-text
     * @returns {Date}
     * @throws {Error}
     */
    getDate: function() {
      var value = '';

      if (this._input) {
        value = this._input.value;
      }

      return this._formatter.parse(value);
    },

    /**
     * Destroy
     */
    destroy: function() {
      this._removeEvents();

      this._input = this._id = this._formatter = null;
    }
  }
);

CustomEvents.mixin(DatePickerInput);
module.exports = DatePickerInput;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Date-Range picker
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */



var forEachArray = __webpack_require__(2);
var defineClass = __webpack_require__(0);
var CustomEvents = __webpack_require__(8);
var addClass = __webpack_require__(16);
var getData = __webpack_require__(26);
var removeClass = __webpack_require__(18);
var extend = __webpack_require__(7);

var DatePicker = __webpack_require__(21);
var dateUtil = __webpack_require__(5);
var constants = __webpack_require__(1);
var util = __webpack_require__(4);

var CLASS_NAME_RANGE_PICKER = 'tui-rangepicker';
var CLASS_NAME_SELECTED = constants.CLASS_NAME_SELECTED;
var CLASS_NAME_SELECTED_RANGE = 'tui-is-selected-range';

/**
 * @class
 * @description
 * Create a date-range picker by {@link DatePicker#createRangePicker DatePicker.createRangePicker()}.
 * @see {@link /tutorial-example08-daterangepicker DateRangePicker example}
 * @param {object} options - DateRangePicker options
 *     @param {object} options.startpicker - Startpicker options
 *         @param {HTMLElement|string} options.startpicker.input - Startpicker input element or selector
 *         @param {HTMLElement|string} options.startpicker.container - Startpicker container element or selector
 *         @param {Date|number} [options.startpicker.date] - Initial date of the start picker. Set by a Date instance or a number(timestamp). (default: no initial date)
 *         @param {string} [options.startpicker.weekStartDay = 'Sun'] - Start of the week. 'Sun', 'Mon', ..., 'Sat'(default: 'Sun'(start on Sunday))
 *     @param {object} options.endpicker - Endpicker options
 *         @param {HTMLElement|string} options.endpicker.input - Endpicker input element or selector
 *         @param {HTMLElement|string} options.endpicker.container - Endpicker container element or selector
 *         @param {Date|number} [options.endpicker.date] - Initial date of the end picker. Set by a Date instance or a number(timestamp). (default: no initial date)
 *         @param {string} [options.endpicker.weekStartDay = 'Sun'] - Start of the week. 'Sun', 'Mon', ..., 'Sat'(default: 'Sun'(start on Sunday))
 *     @param {('date'|'month'|'year')} [options.type = 'date'] - DatePicker type. Determine whether to choose a date, month, or year.
 *     @param {string} [options.language='en'] - Language code. English('en') and Korean('ko') are provided as default. To use the other languages, use {@link DatePicker#localeTexts DatePicker.localeTexts}.
 *     @param {object|boolean} [options.timePicker] - [TimePicker](https://nhn.github.io/tui.time-picker/latest) options. Refer to the [TimePicker instance's options](https://nhn.github.io/tui.time-picker/latest/TimePicker). To create the TimePicker without customization, set to true.
 *     @param {object} [options.calendar] - {@link Calendar} options. Refer to the {@link Calendar Calendar instance's options}.
 *     @param {string} [options.format = 'yyyy-mm-dd'] - Format of the Date string
 *     @param {Array.<Array.<Date|number>>} [options.selectableRanges] - Ranges of selectable date. Set by Date instances or numbers(timestamp).
 *     @param {boolean} [options.showAlways = false] - Show the DateRangePicker always
 *     @param {boolean} [options.autoClose = true] - Close the DateRangePicker after clicking the date
 *     @param {boolean} [options.usageStatistics = true] - Send a hostname to Google Analytics (default: true)
 * @example
 * import DatePicker from 'tui-date-picker' // ES6
 * // const DatePicker = require('tui-date-picker'); // CommonJS
 * // const DatePicker = tui.DatePicker;
 *
 * const rangePicker = DatePicker.createRangePicker({
 *     startpicker: {
 *         input: '#start-input',
 *         container: '#start-container'
 *         date: new Date(2019, 3, 1),
 *         weekStartDay: 'Mon',
 *     },
 *     endpicker: {
 *         input: '#end-input',
 *         container: '#end-container',
 *         weekStartDay: 'Mon',
 *     },
 *     type: 'date',
 *     format: 'yyyy-MM-dd'
 *     selectableRanges: [
 *         [new Date(2017, 3, 1), new Date(2017, 5, 1)],
 *         [new Date(2017, 6, 3), new Date(2017, 10, 5)]
 *     ]
 * });
 */
var DateRangePicker = defineClass(
  /** @lends DateRangePicker.prototype */ {
    init: function(options) {
      var startpickerOpt, endpickerOpt;

      options = options || {};
      startpickerOpt = options.startpicker;
      endpickerOpt = options.endpicker;

      if (!startpickerOpt) {
        throw new Error('The "startpicker" option is required.');
      }
      if (!endpickerOpt) {
        throw new Error('The "endpicker" option is required.');
      }

      /**
       * Start picker
       * @type {DatePicker}
       * @private
       */
      this._startpicker = null;

      /**
       * End picker
       * @type {DatePicker}
       * @private
       */
      this._endpicker = null;

      this._initializePickers(options);
      this._syncRangesToEndpicker();
    },

    /**
     * Create picker
     * @param {Object} options - DatePicker options
     * @private
     */
    _initializePickers: function(options) {
      var startpickerContainer = util.getElement(options.startpicker.container);
      var endpickerContainer = util.getElement(options.endpicker.container);
      var startInput = util.getElement(options.startpicker.input);
      var endInput = util.getElement(options.endpicker.input);

      var startpickerOpt = extend({}, options, {
        input: {
          element: startInput,
          format: options.format
        },
        date: options.startpicker.date,
        weekStartDay: options.startpicker.weekStartDay
      });
      var endpickerOpt = extend({}, options, {
        input: {
          element: endInput,
          format: options.format
        },
        date: options.endpicker.date,
        weekStartDay: options.endpicker.weekStartDay
      });

      this._startpicker = new DatePicker(startpickerContainer, startpickerOpt);
      this._startpicker.addCssClass(CLASS_NAME_RANGE_PICKER);
      this._startpicker.on('change', this._onChangeStartpicker, this);
      this._startpicker.on('draw', this._onDrawPicker, this);

      this._endpicker = new DatePicker(endpickerContainer, endpickerOpt);
      this._endpicker.addCssClass(CLASS_NAME_RANGE_PICKER);
      this._endpicker.on('change', this._onChangeEndpicker, this);
      this._endpicker.on('draw', this._onDrawPicker, this);
    },

    /**
     * Set selection-class to elements after calendar drawing
     * @param {Object} eventData - Event data {@link DatePicker#event:draw}
     * @private
     */
    _onDrawPicker: function(eventData) {
      var calendarType = eventData.type;
      var startDate = this._startpicker.getDate();
      var endDate = this._endpicker.getDate();

      if (!startDate) {
        return;
      }

      if (!endDate) {
        // Convert null to invaild date.
        endDate = new Date(NaN);
      }

      forEachArray(
        eventData.dateElements,
        function(el) {
          var elDate = new Date(Number(getData(el, 'timestamp')));
          var isInRange = dateUtil.inRange(startDate, endDate, elDate, calendarType);
          var isSelected =
            dateUtil.isSame(startDate, elDate, calendarType) ||
            dateUtil.isSame(endDate, elDate, calendarType);

          this._setRangeClass(el, isInRange);
          this._setSelectedClass(el, isSelected);
        },
        this
      );
    },

    /**
     * Set range class to element
     * @param {HTMLElement} el - Element
     * @param {boolean} isInRange - In range
     * @private
     */
    _setRangeClass: function(el, isInRange) {
      if (isInRange) {
        addClass(el, CLASS_NAME_SELECTED_RANGE);
      } else {
        removeClass(el, CLASS_NAME_SELECTED_RANGE);
      }
    },

    /**
     * Set selected class to element
     * @param {HTMLElement} el - Element
     * @param {boolean} isSelected - Is selected
     * @private
     */
    _setSelectedClass: function(el, isSelected) {
      if (isSelected) {
        addClass(el, CLASS_NAME_SELECTED);
      } else {
        removeClass(el, CLASS_NAME_SELECTED);
      }
    },

    /**
     * Sync ranges to endpicker
     * @private
     */
    _syncRangesToEndpicker: function() {
      var startDate = this._startpicker.getDate();
      var overlappedRange;

      if (startDate) {
        overlappedRange = this._startpicker.findOverlappedRange(
          dateUtil.cloneWithStartOf(startDate).getTime(),
          dateUtil.cloneWithEndOf(startDate).getTime()
        );

        this._endpicker.enable();
        this._endpicker.setRanges([[startDate.getTime(), overlappedRange[1].getTime()]]);
      } else {
        this._endpicker.setNull();
        this._endpicker.disable();
      }
    },

    /**
     * After change on start-picker
     * @private
     */
    _onChangeStartpicker: function() {
      this._syncRangesToEndpicker();
      /**
       * Occur after the start date is changed.
       * @event DateRangePicker#change:start
       * @see {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents#on rangePicker.on()} to bind event handlers.
       * @see {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents#off rangePicker.off()} to unbind event handlers.
       * @see Refer to {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents CustomEvents} for more methods. DateRangePicker mixes in the methods from CustomEvents.
       * @example
       * // bind the 'change:start' event
       * rangePicker.on('change:start', function() {
       *     console.log(`Start date: ${rangePicker.getStartDate()}`);
       * });
       *
       * // unbind the 'change:start' event
       * rangePicker.off('change:start');
       */
      this.fire('change:start');
    },

    /**
     * After change on end-picker
     * @private
     */
    _onChangeEndpicker: function() {
      /**
       * Occur after the end date is changed.
       * @event DateRangePicker#change:end
       * @see {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents#on rangePicker.on()} to bind event handlers.
       * @see {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents#off rangePicker.off()} to unbind event handlers.
       * @see Refer to {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents CustomEvents} for more methods. DateRangePicker mixes in the methods from CustomEvents.
       * @example
       * // bind the 'change:end' event
       * rangePicker.on('change:end', function() {
       *     console.log(`End date: ${rangePicker.getEndDate()}`);
       * });
       *
       * // unbind the 'change:end' event
       * rangePicker.off('change:end');
       */
      this.fire('change:end');
    },

    /**
     * Return a start-datepicker.
     * @returns {DatePicker}
     */
    getStartpicker: function() {
      return this._startpicker;
    },

    /**
     * Return a end-datepicker.
     * @returns {DatePicker}
     */
    getEndpicker: function() {
      return this._endpicker;
    },

    /**
     * Set the start date.
     * @param {Date} date - Start date
     */
    setStartDate: function(date) {
      this._startpicker.setDate(date);
    },

    /**
     * Return the start date.
     * @returns {?Date}
     */
    getStartDate: function() {
      return this._startpicker.getDate();
    },

    /**
     * Return the end date.
     * @returns {?Date}
     */
    getEndDate: function() {
      return this._endpicker.getDate();
    },

    /**
     * Set the end date.
     * @param {Date} date - End date
     */
    setEndDate: function(date) {
      this._endpicker.setDate(date);
    },

    /**
     * Set selectable ranges.
     * @param {Array.<Array.<number|Date>>} ranges - Selectable ranges. Use Date instances or numbers(timestamp).
     */
    setRanges: function(ranges) {
      this._startpicker.setRanges(ranges);
      this._syncRangesToEndpicker();
    },

    /**
     * Add a selectable range. Use Date instances or numbers(timestamp).
     * @param {Date|number} start - the start date
     * @param {Date|number} end - the end date
     */
    addRange: function(start, end) {
      this._startpicker.addRange(start, end);
      this._syncRangesToEndpicker();
    },

    /**
     * Remove a range. Use Date instances or numbers(timestamp).
     * @param {Date|number} start - the start date
     * @param {Date|number} end - the end date
     * @param {null|'date'|'month'|'year'} type - Range type. If falsy, start and end values are considered as timestamp
     */
    removeRange: function(start, end, type) {
      this._startpicker.removeRange(start, end, type);
      this._syncRangesToEndpicker();
    },

    /**
     * Change language.
     * @param {string} language - Language code. English('en') and Korean('ko') are provided as default.
     * @see To set to the other languages, use {@link DatePicker#localeTexts DatePicker.localeTexts}.
     */
    changeLanguage: function(language) {
      this._startpicker.changeLanguage(language);
      this._endpicker.changeLanguage(language);
    },

    /**
     * Destroy the date-range picker.
     */
    destroy: function() {
      this.off();
      this._startpicker.destroy();
      this._endpicker.destroy();
      this._startpicker = this._endpicker = null;
    }
  }
);

CustomEvents.mixin(DateRangePicker);
module.exports = DateRangePicker;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ]);
});