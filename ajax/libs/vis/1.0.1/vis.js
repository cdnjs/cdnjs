/**
 * vis.js
 * https://github.com/almende/vis
 *
 * A dynamic, browser-based visualization library.
 *
 * @version 1.0.1
 * @date    2014-05-09
 *
 * @license
 * Copyright (C) 2011-2014 Almende B.V, http://almende.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.vis=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * vis.js module imports
 */

// Try to load dependencies from the global window object.
// If not available there, load via require.

var moment = (typeof window !== 'undefined') && window['moment'] || require('moment');
var Emitter = require('emitter-component');

var Hammer;
if (typeof window !== 'undefined') {
  // load hammer.js only when running in a browser (where window is available)
  Hammer = window['Hammer'] || require('hammerjs');
}
else {
  Hammer = function () {
    throw Error('hammer.js is only available in a browser, not in node.js.');
  }
}

var mousetrap;
if (typeof window !== 'undefined') {
  // load mousetrap.js only when running in a browser (where window is available)
  mousetrap = window['mousetrap'] || require('mousetrap');
}
else {
  mousetrap = function () {
    throw Error('mouseTrap is only available in a browser, not in node.js.');
  }
}


// Internet Explorer 8 and older does not support Array.indexOf, so we define
// it here in that case.
// http://soledadpenades.com/2007/05/17/arrayindexof-in-internet-explorer/
if(!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(obj){
    for(var i = 0; i < this.length; i++){
      if(this[i] == obj){
        return i;
      }
    }
    return -1;
  };

  try {
    console.log("Warning: Ancient browser detected. Please update your browser");
  }
  catch (err) {
  }
}

// Internet Explorer 8 and older does not support Array.forEach, so we define
// it here in that case.
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(fn, scope) {
    for(var i = 0, len = this.length; i < len; ++i) {
      fn.call(scope || this, this[i], i, this);
    }
  }
}

// Internet Explorer 8 and older does not support Array.map, so we define it
// here in that case.
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map
// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.com/#x15.4.4.19
if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(" this is null or not defined");
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (thisArg) {
      T = thisArg;
    }

    // 6. Let A be a new array created as if by the expression new Array(len) where Array is
    // the standard built-in constructor with that name and len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while(k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[ k ];

        // ii. Let mappedValue be the result of calling the Call internal method of callback
        // with T as the this value and argument list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor {Value: mappedValue, : true, Enumerable: true, Configurable: true},
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });

        // For best browser support, use the following:
        A[ k ] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };
}

// Internet Explorer 8 and older does not support Array.filter, so we define it
// here in that case.
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter
if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun /*, thisp */) {
    "use strict";

    if (this == null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun != "function") {
      throw new TypeError();
    }

    var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, t))
          res.push(val);
      }
    }

    return res;
  };
}


// Internet Explorer 8 and older does not support Object.keys, so we define it
// here in that case.
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [];

      for (var prop in obj) {
        if (hasOwnProperty.call(obj, prop)) result.push(prop);
      }

      if (hasDontEnumBug) {
        for (var i=0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
        }
      }
      return result;
    }
  })()
}

// Internet Explorer 8 and older does not support Array.isArray,
// so we define it here in that case.
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/isArray
if(!Array.isArray) {
  Array.isArray = function (vArg) {
    return Object.prototype.toString.call(vArg) === "[object Array]";
  };
}

// Internet Explorer 8 and older does not support Function.bind,
// so we define it here in that case.
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
              ? this
              : oThis,
              aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create
if (!Object.create) {
  Object.create = function (o) {
    if (arguments.length > 1) {
      throw new Error('Object.create implementation only accepts the first parameter.');
    }
    function F() {}
    F.prototype = o;
    return new F();
  };
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
              ? this
              : oThis,
              aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

/**
 * utility functions
 */
var util = {};

/**
 * Test whether given object is a number
 * @param {*} object
 * @return {Boolean} isNumber
 */
util.isNumber = function isNumber(object) {
  return (object instanceof Number || typeof object == 'number');
};

/**
 * Test whether given object is a string
 * @param {*} object
 * @return {Boolean} isString
 */
util.isString = function isString(object) {
  return (object instanceof String || typeof object == 'string');
};

/**
 * Test whether given object is a Date, or a String containing a Date
 * @param {Date | String} object
 * @return {Boolean} isDate
 */
util.isDate = function isDate(object) {
  if (object instanceof Date) {
    return true;
  }
  else if (util.isString(object)) {
    // test whether this string contains a date
    var match = ASPDateRegex.exec(object);
    if (match) {
      return true;
    }
    else if (!isNaN(Date.parse(object))) {
      return true;
    }
  }

  return false;
};

/**
 * Test whether given object is an instance of google.visualization.DataTable
 * @param {*} object
 * @return {Boolean} isDataTable
 */
util.isDataTable = function isDataTable(object) {
  return (typeof (google) !== 'undefined') &&
      (google.visualization) &&
      (google.visualization.DataTable) &&
      (object instanceof google.visualization.DataTable);
};

/**
 * Create a semi UUID
 * source: http://stackoverflow.com/a/105074/1262753
 * @return {String} uuid
 */
util.randomUUID = function randomUUID () {
  var S4 = function () {
    return Math.floor(
        Math.random() * 0x10000 /* 65536 */
    ).toString(16);
  };

  return (
      S4() + S4() + '-' +
          S4() + '-' +
          S4() + '-' +
          S4() + '-' +
          S4() + S4() + S4()
      );
};

/**
 * Extend object a with the properties of object b or a series of objects
 * Only properties with defined values are copied
 * @param {Object} a
 * @param {... Object} b
 * @return {Object} a
 */
util.extend = function (a, b) {
  for (var i = 1, len = arguments.length; i < len; i++) {
    var other = arguments[i];
    for (var prop in other) {
      if (other.hasOwnProperty(prop) && other[prop] !== undefined) {
        a[prop] = other[prop];
      }
    }
  }

  return a;
};

/**
 * Test whether all elements in two arrays are equal.
 * @param {Array} a
 * @param {Array} b
 * @return {boolean} Returns true if both arrays have the same length and same
 *                   elements.
 */
util.equalArray = function (a, b) {
  if (a.length != b.length) return false;

  for (var i = 0, len = a.length; i < len; i++) {
    if (a[i] != b[i]) return false;
  }

  return true;
};

/**
 * Convert an object to another type
 * @param {Boolean | Number | String | Date | Moment | Null | undefined} object
 * @param {String | undefined} type   Name of the type. Available types:
 *                                    'Boolean', 'Number', 'String',
 *                                    'Date', 'Moment', ISODate', 'ASPDate'.
 * @return {*} object
 * @throws Error
 */
util.convert = function convert(object, type) {
  var match;

  if (object === undefined) {
    return undefined;
  }
  if (object === null) {
    return null;
  }

  if (!type) {
    return object;
  }
  if (!(typeof type === 'string') && !(type instanceof String)) {
    throw new Error('Type must be a string');
  }

  //noinspection FallthroughInSwitchStatementJS
  switch (type) {
    case 'boolean':
    case 'Boolean':
      return Boolean(object);

    case 'number':
    case 'Number':
      return Number(object.valueOf());

    case 'string':
    case 'String':
      return String(object);

    case 'Date':
      if (util.isNumber(object)) {
        return new Date(object);
      }
      if (object instanceof Date) {
        return new Date(object.valueOf());
      }
      else if (moment.isMoment(object)) {
        return new Date(object.valueOf());
      }
      if (util.isString(object)) {
        match = ASPDateRegex.exec(object);
        if (match) {
          // object is an ASP date
          return new Date(Number(match[1])); // parse number
        }
        else {
          return moment(object).toDate(); // parse string
        }
      }
      else {
        throw new Error(
            'Cannot convert object of type ' + util.getType(object) +
                ' to type Date');
      }

    case 'Moment':
      if (util.isNumber(object)) {
        return moment(object);
      }
      if (object instanceof Date) {
        return moment(object.valueOf());
      }
      else if (moment.isMoment(object)) {
        return moment(object);
      }
      if (util.isString(object)) {
        match = ASPDateRegex.exec(object);
        if (match) {
          // object is an ASP date
          return moment(Number(match[1])); // parse number
        }
        else {
          return moment(object); // parse string
        }
      }
      else {
        throw new Error(
            'Cannot convert object of type ' + util.getType(object) +
                ' to type Date');
      }

    case 'ISODate':
      if (util.isNumber(object)) {
        return new Date(object);
      }
      else if (object instanceof Date) {
        return object.toISOString();
      }
      else if (moment.isMoment(object)) {
        return object.toDate().toISOString();
      }
      else if (util.isString(object)) {
        match = ASPDateRegex.exec(object);
        if (match) {
          // object is an ASP date
          return new Date(Number(match[1])).toISOString(); // parse number
        }
        else {
          return new Date(object).toISOString(); // parse string
        }
      }
      else {
        throw new Error(
            'Cannot convert object of type ' + util.getType(object) +
                ' to type ISODate');
      }

    case 'ASPDate':
      if (util.isNumber(object)) {
        return '/Date(' + object + ')/';
      }
      else if (object instanceof Date) {
        return '/Date(' + object.valueOf() + ')/';
      }
      else if (util.isString(object)) {
        match = ASPDateRegex.exec(object);
        var value;
        if (match) {
          // object is an ASP date
          value = new Date(Number(match[1])).valueOf(); // parse number
        }
        else {
          value = new Date(object).valueOf(); // parse string
        }
        return '/Date(' + value + ')/';
      }
      else {
        throw new Error(
            'Cannot convert object of type ' + util.getType(object) +
                ' to type ASPDate');
      }

    default:
      throw new Error('Cannot convert object of type ' + util.getType(object) +
          ' to type "' + type + '"');
  }
};

// parse ASP.Net Date pattern,
// for example '/Date(1198908717056)/' or '/Date(1198908717056-0700)/'
// code from http://momentjs.com/
var ASPDateRegex = /^\/?Date\((\-?\d+)/i;

/**
 * Get the type of an object, for example util.getType([]) returns 'Array'
 * @param {*} object
 * @return {String} type
 */
util.getType = function getType(object) {
  var type = typeof object;

  if (type == 'object') {
    if (object == null) {
      return 'null';
    }
    if (object instanceof Boolean) {
      return 'Boolean';
    }
    if (object instanceof Number) {
      return 'Number';
    }
    if (object instanceof String) {
      return 'String';
    }
    if (object instanceof Array) {
      return 'Array';
    }
    if (object instanceof Date) {
      return 'Date';
    }
    return 'Object';
  }
  else if (type == 'number') {
    return 'Number';
  }
  else if (type == 'boolean') {
    return 'Boolean';
  }
  else if (type == 'string') {
    return 'String';
  }

  return type;
};

/**
 * Retrieve the absolute left value of a DOM element
 * @param {Element} elem        A dom element, for example a div
 * @return {number} left        The absolute left position of this element
 *                              in the browser page.
 */
util.getAbsoluteLeft = function getAbsoluteLeft (elem) {
  var doc = document.documentElement;
  var body = document.body;

  var left = elem.offsetLeft;
  var e = elem.offsetParent;
  while (e != null && e != body && e != doc) {
    left += e.offsetLeft;
    left -= e.scrollLeft;
    e = e.offsetParent;
  }
  return left;
};

/**
 * Retrieve the absolute top value of a DOM element
 * @param {Element} elem        A dom element, for example a div
 * @return {number} top        The absolute top position of this element
 *                              in the browser page.
 */
util.getAbsoluteTop = function getAbsoluteTop (elem) {
  var doc = document.documentElement;
  var body = document.body;

  var top = elem.offsetTop;
  var e = elem.offsetParent;
  while (e != null && e != body && e != doc) {
    top += e.offsetTop;
    top -= e.scrollTop;
    e = e.offsetParent;
  }
  return top;
};

/**
 * Get the absolute, vertical mouse position from an event.
 * @param {Event} event
 * @return {Number} pageY
 */
util.getPageY = function getPageY (event) {
  if ('pageY' in event) {
    return event.pageY;
  }
  else {
    var clientY;
    if (('targetTouches' in event) && event.targetTouches.length) {
      clientY = event.targetTouches[0].clientY;
    }
    else {
      clientY = event.clientY;
    }

    var doc = document.documentElement;
    var body = document.body;
    return clientY +
        ( doc && doc.scrollTop || body && body.scrollTop || 0 ) -
        ( doc && doc.clientTop || body && body.clientTop || 0 );
  }
};

/**
 * Get the absolute, horizontal mouse position from an event.
 * @param {Event} event
 * @return {Number} pageX
 */
util.getPageX = function getPageX (event) {
  if ('pageY' in event) {
    return event.pageX;
  }
  else {
    var clientX;
    if (('targetTouches' in event) && event.targetTouches.length) {
      clientX = event.targetTouches[0].clientX;
    }
    else {
      clientX = event.clientX;
    }

    var doc = document.documentElement;
    var body = document.body;
    return clientX +
        ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
        ( doc && doc.clientLeft || body && body.clientLeft || 0 );
  }
};

/**
 * add a className to the given elements style
 * @param {Element} elem
 * @param {String} className
 */
util.addClassName = function addClassName(elem, className) {
  var classes = elem.className.split(' ');
  if (classes.indexOf(className) == -1) {
    classes.push(className); // add the class to the array
    elem.className = classes.join(' ');
  }
};

/**
 * add a className to the given elements style
 * @param {Element} elem
 * @param {String} className
 */
util.removeClassName = function removeClassname(elem, className) {
  var classes = elem.className.split(' ');
  var index = classes.indexOf(className);
  if (index != -1) {
    classes.splice(index, 1); // remove the class from the array
    elem.className = classes.join(' ');
  }
};

/**
 * For each method for both arrays and objects.
 * In case of an array, the built-in Array.forEach() is applied.
 * In case of an Object, the method loops over all properties of the object.
 * @param {Object | Array} object   An Object or Array
 * @param {function} callback       Callback method, called for each item in
 *                                  the object or array with three parameters:
 *                                  callback(value, index, object)
 */
util.forEach = function forEach (object, callback) {
  var i,
      len;
  if (object instanceof Array) {
    // array
    for (i = 0, len = object.length; i < len; i++) {
      callback(object[i], i, object);
    }
  }
  else {
    // object
    for (i in object) {
      if (object.hasOwnProperty(i)) {
        callback(object[i], i, object);
      }
    }
  }
};

/**
 * Convert an object into an array: all objects properties are put into the
 * array. The resulting array is unordered.
 * @param {Object} object
 * @param {Array} array
 */
util.toArray = function toArray(object) {
  var array = [];

  for (var prop in object) {
    if (object.hasOwnProperty(prop)) array.push(object[prop]);
  }

  return array;
}

/**
 * Update a property in an object
 * @param {Object} object
 * @param {String} key
 * @param {*} value
 * @return {Boolean} changed
 */
util.updateProperty = function updateProperty (object, key, value) {
  if (object[key] !== value) {
    object[key] = value;
    return true;
  }
  else {
    return false;
  }
};

/**
 * Add and event listener. Works for all browsers
 * @param {Element}     element    An html element
 * @param {string}      action     The action, for example "click",
 *                                 without the prefix "on"
 * @param {function}    listener   The callback function to be executed
 * @param {boolean}     [useCapture]
 */
util.addEventListener = function addEventListener(element, action, listener, useCapture) {
  if (element.addEventListener) {
    if (useCapture === undefined)
      useCapture = false;

    if (action === "mousewheel" && navigator.userAgent.indexOf("Firefox") >= 0) {
      action = "DOMMouseScroll";  // For Firefox
    }

    element.addEventListener(action, listener, useCapture);
  } else {
    element.attachEvent("on" + action, listener);  // IE browsers
  }
};

/**
 * Remove an event listener from an element
 * @param {Element}     element         An html dom element
 * @param {string}      action          The name of the event, for example "mousedown"
 * @param {function}    listener        The listener function
 * @param {boolean}     [useCapture]
 */
util.removeEventListener = function removeEventListener(element, action, listener, useCapture) {
  if (element.removeEventListener) {
    // non-IE browsers
    if (useCapture === undefined)
      useCapture = false;

    if (action === "mousewheel" && navigator.userAgent.indexOf("Firefox") >= 0) {
      action = "DOMMouseScroll";  // For Firefox
    }

    element.removeEventListener(action, listener, useCapture);
  } else {
    // IE browsers
    element.detachEvent("on" + action, listener);
  }
};


/**
 * Get HTML element which is the target of the event
 * @param {Event} event
 * @return {Element} target element
 */
util.getTarget = function getTarget(event) {
  // code from http://www.quirksmode.org/js/events_properties.html
  if (!event) {
    event = window.event;
  }

  var target;

  if (event.target) {
    target = event.target;
  }
  else if (event.srcElement) {
    target = event.srcElement;
  }

  if (target.nodeType != undefined && target.nodeType == 3) {
    // defeat Safari bug
    target = target.parentNode;
  }

  return target;
};

/**
 * Fake a hammer.js gesture. Event can be a ScrollEvent or MouseMoveEvent
 * @param {Element} element
 * @param {Event} event
 */
util.fakeGesture = function fakeGesture (element, event) {
  var eventType = null;

  // for hammer.js 1.0.5
  var gesture = Hammer.event.collectEventData(this, eventType, event);

  // for hammer.js 1.0.6
  //var touches = Hammer.event.getTouchList(event, eventType);
  // var gesture = Hammer.event.collectEventData(this, eventType, touches, event);

  // on IE in standards mode, no touches are recognized by hammer.js,
  // resulting in NaN values for center.pageX and center.pageY
  if (isNaN(gesture.center.pageX)) {
    gesture.center.pageX = event.pageX;
  }
  if (isNaN(gesture.center.pageY)) {
    gesture.center.pageY = event.pageY;
  }

  return gesture;
};

util.option = {};

/**
 * Convert a value into a boolean
 * @param {Boolean | function | undefined} value
 * @param {Boolean} [defaultValue]
 * @returns {Boolean} bool
 */
util.option.asBoolean = function (value, defaultValue) {
  if (typeof value == 'function') {
    value = value();
  }

  if (value != null) {
    return (value != false);
  }

  return defaultValue || null;
};

/**
 * Convert a value into a number
 * @param {Boolean | function | undefined} value
 * @param {Number} [defaultValue]
 * @returns {Number} number
 */
util.option.asNumber = function (value, defaultValue) {
  if (typeof value == 'function') {
    value = value();
  }

  if (value != null) {
    return Number(value) || defaultValue || null;
  }

  return defaultValue || null;
};

/**
 * Convert a value into a string
 * @param {String | function | undefined} value
 * @param {String} [defaultValue]
 * @returns {String} str
 */
util.option.asString = function (value, defaultValue) {
  if (typeof value == 'function') {
    value = value();
  }

  if (value != null) {
    return String(value);
  }

  return defaultValue || null;
};

/**
 * Convert a size or location into a string with pixels or a percentage
 * @param {String | Number | function | undefined} value
 * @param {String} [defaultValue]
 * @returns {String} size
 */
util.option.asSize = function (value, defaultValue) {
  if (typeof value == 'function') {
    value = value();
  }

  if (util.isString(value)) {
    return value;
  }
  else if (util.isNumber(value)) {
    return value + 'px';
  }
  else {
    return defaultValue || null;
  }
};

/**
 * Convert a value into a DOM element
 * @param {HTMLElement | function | undefined} value
 * @param {HTMLElement} [defaultValue]
 * @returns {HTMLElement | null} dom
 */
util.option.asElement = function (value, defaultValue) {
  if (typeof value == 'function') {
    value = value();
  }

  return value || defaultValue || null;
};



util.GiveDec = function GiveDec(Hex) {
  var Value;

  if (Hex == "A")
    Value = 10;
  else if (Hex == "B")
    Value = 11;
  else if (Hex == "C")
    Value = 12;
  else if (Hex == "D")
    Value = 13;
  else if (Hex == "E")
    Value = 14;
  else if (Hex == "F")
    Value = 15;
  else
    Value = eval(Hex);

  return Value;
};

util.GiveHex = function GiveHex(Dec) {
  var Value;

  if(Dec == 10)
    Value = "A";
  else if (Dec == 11)
    Value = "B";
  else if (Dec == 12)
    Value = "C";
  else if (Dec == 13)
    Value = "D";
  else if (Dec == 14)
    Value = "E";
  else if (Dec == 15)
    Value = "F";
  else
    Value = "" + Dec;

  return Value;
};

/**
 * Parse a color property into an object with border, background, and
 * highlight colors
 * @param {Object | String} color
 * @return {Object} colorObject
 */
util.parseColor = function(color) {
  var c;
  if (util.isString(color)) {
    if (util.isValidHex(color)) {
      var hsv = util.hexToHSV(color);
      var lighterColorHSV = {h:hsv.h,s:hsv.s * 0.45,v:Math.min(1,hsv.v * 1.05)};
      var darkerColorHSV  = {h:hsv.h,s:Math.min(1,hsv.v * 1.25),v:hsv.v*0.6};
      var darkerColorHex  = util.HSVToHex(darkerColorHSV.h ,darkerColorHSV.h ,darkerColorHSV.v);
      var lighterColorHex = util.HSVToHex(lighterColorHSV.h,lighterColorHSV.s,lighterColorHSV.v);

      c = {
        background: color,
        border:darkerColorHex,
        highlight: {
          background:lighterColorHex,
          border:darkerColorHex
        }
      };
    }
    else {
      c = {
        background:color,
        border:color,
        highlight: {
          background:color,
          border:color
        }
      };
    }
  }
  else {
    c = {};
    c.background = color.background || 'white';
    c.border = color.border || c.background;

    if (util.isString(color.highlight)) {
      c.highlight = {
        border: color.highlight,
        background: color.highlight
      }
    }
    else {
      c.highlight = {};
      c.highlight.background = color.highlight && color.highlight.background || c.background;
      c.highlight.border = color.highlight && color.highlight.border || c.border;
    }
  }

  return c;
};

/**
 * http://www.yellowpipe.com/yis/tools/hex-to-rgb/color-converter.php
 *
 * @param {String} hex
 * @returns {{r: *, g: *, b: *}}
 */
util.hexToRGB = function hexToRGB(hex) {
  hex = hex.replace("#","").toUpperCase();

  var a = util.GiveDec(hex.substring(0, 1));
  var b = util.GiveDec(hex.substring(1, 2));
  var c = util.GiveDec(hex.substring(2, 3));
  var d = util.GiveDec(hex.substring(3, 4));
  var e = util.GiveDec(hex.substring(4, 5));
  var f = util.GiveDec(hex.substring(5, 6));

  var r = (a * 16) + b;
  var g = (c * 16) + d;
  var b = (e * 16) + f;

  return {r:r,g:g,b:b};
};

util.RGBToHex = function RGBToHex(red,green,blue) {
  var a = util.GiveHex(Math.floor(red / 16));
  var b = util.GiveHex(red % 16);
  var c = util.GiveHex(Math.floor(green / 16));
  var d = util.GiveHex(green % 16);
  var e = util.GiveHex(Math.floor(blue / 16));
  var f = util.GiveHex(blue % 16);

  var hex = a + b + c + d + e + f;
  return "#" + hex;
};


/**
 * http://www.javascripter.net/faq/rgb2hsv.htm
 *
 * @param red
 * @param green
 * @param blue
 * @returns {*}
 * @constructor
 */
util.RGBToHSV = function  RGBToHSV (red,green,blue) {
  red=red/255; green=green/255; blue=blue/255;
  var minRGB = Math.min(red,Math.min(green,blue));
  var maxRGB = Math.max(red,Math.max(green,blue));

  // Black-gray-white
  if (minRGB == maxRGB) {
    return {h:0,s:0,v:minRGB};
  }

  // Colors other than black-gray-white:
  var d = (red==minRGB) ? green-blue : ((blue==minRGB) ? red-green : blue-red);
  var h = (red==minRGB) ? 3 : ((blue==minRGB) ? 1 : 5);
  var hue = 60*(h - d/(maxRGB - minRGB))/360;
  var saturation = (maxRGB - minRGB)/maxRGB;
  var value = maxRGB;
  return {h:hue,s:saturation,v:value};
};


/**
 * https://gist.github.com/mjijackson/5311256
 * @param hue
 * @param saturation
 * @param value
 * @returns {{r: number, g: number, b: number}}
 * @constructor
 */
util.HSVToRGB = function HSVToRGB(h, s, v) {
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return {r:Math.floor(r * 255), g:Math.floor(g * 255), b:Math.floor(b * 255) };
};

util.HSVToHex = function HSVToHex(h, s, v) {
  var rgb = util.HSVToRGB(h, s, v);
  return util.RGBToHex(rgb.r, rgb.g, rgb.b);
};

util.hexToHSV = function hexToHSV(hex) {
  var rgb = util.hexToRGB(hex);
  return util.RGBToHSV(rgb.r, rgb.g, rgb.b);
};

util.isValidHex = function isValidHex(hex) {
  var isOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
  return isOk;
};

util.copyObject = function copyObject(objectFrom, objectTo) {
  for (var i in objectFrom) {
    if (objectFrom.hasOwnProperty(i)) {
      if (typeof objectFrom[i] == "object") {
        objectTo[i] = {};
        util.copyObject(objectFrom[i], objectTo[i]);
      }
      else {
        objectTo[i] = objectFrom[i];
      }
    }
  }
};

/**
 * DataSet
 *
 * Usage:
 *     var dataSet = new DataSet({
 *         fieldId: '_id',
 *         convert: {
 *             // ...
 *         }
 *     });
 *
 *     dataSet.add(item);
 *     dataSet.add(data);
 *     dataSet.update(item);
 *     dataSet.update(data);
 *     dataSet.remove(id);
 *     dataSet.remove(ids);
 *     var data = dataSet.get();
 *     var data = dataSet.get(id);
 *     var data = dataSet.get(ids);
 *     var data = dataSet.get(ids, options, data);
 *     dataSet.clear();
 *
 * A data set can:
 * - add/remove/update data
 * - gives triggers upon changes in the data
 * - can  import/export data in various data formats
 *
 * @param {Array | DataTable} [data]    Optional array with initial data
 * @param {Object} [options]   Available options:
 *                             {String} fieldId Field name of the id in the
 *                                              items, 'id' by default.
 *                             {Object.<String, String} convert
 *                                              A map with field names as key,
 *                                              and the field type as value.
 * @constructor DataSet
 */
// TODO: add a DataSet constructor DataSet(data, options)
function DataSet (data, options) {
  this.id = util.randomUUID();

  // correctly read optional arguments
  if (data && !Array.isArray(data) && !util.isDataTable(data)) {
    options = data;
    data = null;
  }

  this.options = options || {};
  this.data = {};                                 // map with data indexed by id
  this.fieldId = this.options.fieldId || 'id';    // name of the field containing id
  this.convert = {};                              // field types by field name
  this.showInternalIds = this.options.showInternalIds || false; // show internal ids with the get function

  if (this.options.convert) {
    for (var field in this.options.convert) {
      if (this.options.convert.hasOwnProperty(field)) {
        var value = this.options.convert[field];
        if (value == 'Date' || value == 'ISODate' || value == 'ASPDate') {
          this.convert[field] = 'Date';
        }
        else {
          this.convert[field] = value;
        }
      }
    }
  }

  this.subscribers = {};  // event subscribers
  this.internalIds = {};  // internally generated id's

  // add initial data when provided
  if (data) {
    this.add(data);
  }
}

/**
 * Subscribe to an event, add an event listener
 * @param {String} event        Event name. Available events: 'put', 'update',
 *                              'remove'
 * @param {function} callback   Callback method. Called with three parameters:
 *                                  {String} event
 *                                  {Object | null} params
 *                                  {String | Number} senderId
 */
DataSet.prototype.on = function on (event, callback) {
  var subscribers = this.subscribers[event];
  if (!subscribers) {
    subscribers = [];
    this.subscribers[event] = subscribers;
  }

  subscribers.push({
    callback: callback
  });
};

// TODO: make this function deprecated (replaced with `on` since version 0.5)
DataSet.prototype.subscribe = DataSet.prototype.on;

/**
 * Unsubscribe from an event, remove an event listener
 * @param {String} event
 * @param {function} callback
 */
DataSet.prototype.off = function off(event, callback) {
  var subscribers = this.subscribers[event];
  if (subscribers) {
    this.subscribers[event] = subscribers.filter(function (listener) {
      return (listener.callback != callback);
    });
  }
};

// TODO: make this function deprecated (replaced with `on` since version 0.5)
DataSet.prototype.unsubscribe = DataSet.prototype.off;

/**
 * Trigger an event
 * @param {String} event
 * @param {Object | null} params
 * @param {String} [senderId]       Optional id of the sender.
 * @private
 */
DataSet.prototype._trigger = function (event, params, senderId) {
  if (event == '*') {
    throw new Error('Cannot trigger event *');
  }

  var subscribers = [];
  if (event in this.subscribers) {
    subscribers = subscribers.concat(this.subscribers[event]);
  }
  if ('*' in this.subscribers) {
    subscribers = subscribers.concat(this.subscribers['*']);
  }

  for (var i = 0; i < subscribers.length; i++) {
    var subscriber = subscribers[i];
    if (subscriber.callback) {
      subscriber.callback(event, params, senderId || null);
    }
  }
};

/**
 * Add data.
 * Adding an item will fail when there already is an item with the same id.
 * @param {Object | Array | DataTable} data
 * @param {String} [senderId] Optional sender id
 * @return {Array} addedIds      Array with the ids of the added items
 */
DataSet.prototype.add = function (data, senderId) {
  var addedIds = [],
      id,
      me = this;

  if (data instanceof Array) {
    // Array
    for (var i = 0, len = data.length; i < len; i++) {
      id = me._addItem(data[i]);
      addedIds.push(id);
    }
  }
  else if (util.isDataTable(data)) {
    // Google DataTable
    var columns = this._getColumnNames(data);
    for (var row = 0, rows = data.getNumberOfRows(); row < rows; row++) {
      var item = {};
      for (var col = 0, cols = columns.length; col < cols; col++) {
        var field = columns[col];
        item[field] = data.getValue(row, col);
      }

      id = me._addItem(item);
      addedIds.push(id);
    }
  }
  else if (data instanceof Object) {
    // Single item
    id = me._addItem(data);
    addedIds.push(id);
  }
  else {
    throw new Error('Unknown dataType');
  }

  if (addedIds.length) {
    this._trigger('add', {items: addedIds}, senderId);
  }

  return addedIds;
};

/**
 * Update existing items. When an item does not exist, it will be created
 * @param {Object | Array | DataTable} data
 * @param {String} [senderId] Optional sender id
 * @return {Array} updatedIds     The ids of the added or updated items
 */
DataSet.prototype.update = function (data, senderId) {
  var addedIds = [],
      updatedIds = [],
      me = this,
      fieldId = me.fieldId;

  var addOrUpdate = function (item) {
    var id = item[fieldId];
    if (me.data[id]) {
      // update item
      id = me._updateItem(item);
      updatedIds.push(id);
    }
    else {
      // add new item
      id = me._addItem(item);
      addedIds.push(id);
    }
  };

  if (data instanceof Array) {
    // Array
    for (var i = 0, len = data.length; i < len; i++) {
      addOrUpdate(data[i]);
    }
  }
  else if (util.isDataTable(data)) {
    // Google DataTable
    var columns = this._getColumnNames(data);
    for (var row = 0, rows = data.getNumberOfRows(); row < rows; row++) {
      var item = {};
      for (var col = 0, cols = columns.length; col < cols; col++) {
        var field = columns[col];
        item[field] = data.getValue(row, col);
      }

      addOrUpdate(item);
    }
  }
  else if (data instanceof Object) {
    // Single item
    addOrUpdate(data);
  }
  else {
    throw new Error('Unknown dataType');
  }

  if (addedIds.length) {
    this._trigger('add', {items: addedIds}, senderId);
  }
  if (updatedIds.length) {
    this._trigger('update', {items: updatedIds}, senderId);
  }

  return addedIds.concat(updatedIds);
};

/**
 * Get a data item or multiple items.
 *
 * Usage:
 *
 *     get()
 *     get(options: Object)
 *     get(options: Object, data: Array | DataTable)
 *
 *     get(id: Number | String)
 *     get(id: Number | String, options: Object)
 *     get(id: Number | String, options: Object, data: Array | DataTable)
 *
 *     get(ids: Number[] | String[])
 *     get(ids: Number[] | String[], options: Object)
 *     get(ids: Number[] | String[], options: Object, data: Array | DataTable)
 *
 * Where:
 *
 * {Number | String} id         The id of an item
 * {Number[] | String{}} ids    An array with ids of items
 * {Object} options             An Object with options. Available options:
 *                              {String} [type] Type of data to be returned. Can
 *                                              be 'DataTable' or 'Array' (default)
 *                              {Object.<String, String>} [convert]
 *                              {String[]} [fields] field names to be returned
 *                              {function} [filter] filter items
 *                              {String | function} [order] Order the items by
 *                                  a field name or custom sort function.
 * {Array | DataTable} [data]   If provided, items will be appended to this
 *                              array or table. Required in case of Google
 *                              DataTable.
 *
 * @throws Error
 */
DataSet.prototype.get = function (args) {
  var me = this;
  var globalShowInternalIds = this.showInternalIds;

  // parse the arguments
  var id, ids, options, data;
  var firstType = util.getType(arguments[0]);
  if (firstType == 'String' || firstType == 'Number') {
    // get(id [, options] [, data])
    id = arguments[0];
    options = arguments[1];
    data = arguments[2];
  }
  else if (firstType == 'Array') {
    // get(ids [, options] [, data])
    ids = arguments[0];
    options = arguments[1];
    data = arguments[2];
  }
  else {
    // get([, options] [, data])
    options = arguments[0];
    data = arguments[1];
  }

  // determine the return type
  var type;
  if (options && options.type) {
    type = (options.type == 'DataTable') ? 'DataTable' : 'Array';

    if (data && (type != util.getType(data))) {
      throw new Error('Type of parameter "data" (' + util.getType(data) + ') ' +
          'does not correspond with specified options.type (' + options.type + ')');
    }
    if (type == 'DataTable' && !util.isDataTable(data)) {
      throw new Error('Parameter "data" must be a DataTable ' +
          'when options.type is "DataTable"');
    }
  }
  else if (data) {
    type = (util.getType(data) == 'DataTable') ? 'DataTable' : 'Array';
  }
  else {
    type = 'Array';
  }

  // we allow the setting of this value for a single get request.
  if (options != undefined) {
    if (options.showInternalIds != undefined) {
      this.showInternalIds = options.showInternalIds;
    }
  }

  // build options
  var convert = options && options.convert || this.options.convert;
  var filter = options && options.filter;
  var items = [], item, itemId, i, len;

  // convert items
  if (id != undefined) {
    // return a single item
    item = me._getItem(id, convert);
    if (filter && !filter(item)) {
      item = null;
    }
  }
  else if (ids != undefined) {
    // return a subset of items
    for (i = 0, len = ids.length; i < len; i++) {
      item = me._getItem(ids[i], convert);
      if (!filter || filter(item)) {
        items.push(item);
      }
    }
  }
  else {
    // return all items
    for (itemId in this.data) {
      if (this.data.hasOwnProperty(itemId)) {
        item = me._getItem(itemId, convert);
        if (!filter || filter(item)) {
          items.push(item);
        }
      }
    }
  }

  // restore the global value of showInternalIds
  this.showInternalIds = globalShowInternalIds;

  // order the results
  if (options && options.order && id == undefined) {
    this._sort(items, options.order);
  }

  // filter fields of the items
  if (options && options.fields) {
    var fields = options.fields;
    if (id != undefined) {
      item = this._filterFields(item, fields);
    }
    else {
      for (i = 0, len = items.length; i < len; i++) {
        items[i] = this._filterFields(items[i], fields);
      }
    }
  }

  // return the results
  if (type == 'DataTable') {
    var columns = this._getColumnNames(data);
    if (id != undefined) {
      // append a single item to the data table
      me._appendRow(data, columns, item);
    }
    else {
      // copy the items to the provided data table
      for (i = 0, len = items.length; i < len; i++) {
        me._appendRow(data, columns, items[i]);
      }
    }
    return data;
  }
  else {
    // return an array
    if (id != undefined) {
      // a single item
      return item;
    }
    else {
      // multiple items
      if (data) {
        // copy the items to the provided array
        for (i = 0, len = items.length; i < len; i++) {
          data.push(items[i]);
        }
        return data;
      }
      else {
        // just return our array
        return items;
      }
    }
  }
};

/**
 * Get ids of all items or from a filtered set of items.
 * @param {Object} [options]    An Object with options. Available options:
 *                              {function} [filter] filter items
 *                              {String | function} [order] Order the items by
 *                                  a field name or custom sort function.
 * @return {Array} ids
 */
DataSet.prototype.getIds = function (options) {
  var data = this.data,
      filter = options && options.filter,
      order = options && options.order,
      convert = options && options.convert || this.options.convert,
      i,
      len,
      id,
      item,
      items,
      ids = [];

  if (filter) {
    // get filtered items
    if (order) {
      // create ordered list
      items = [];
      for (id in data) {
        if (data.hasOwnProperty(id)) {
          item = this._getItem(id, convert);
          if (filter(item)) {
            items.push(item);
          }
        }
      }

      this._sort(items, order);

      for (i = 0, len = items.length; i < len; i++) {
        ids[i] = items[i][this.fieldId];
      }
    }
    else {
      // create unordered list
      for (id in data) {
        if (data.hasOwnProperty(id)) {
          item = this._getItem(id, convert);
          if (filter(item)) {
            ids.push(item[this.fieldId]);
          }
        }
      }
    }
  }
  else {
    // get all items
    if (order) {
      // create an ordered list
      items = [];
      for (id in data) {
        if (data.hasOwnProperty(id)) {
          items.push(data[id]);
        }
      }

      this._sort(items, order);

      for (i = 0, len = items.length; i < len; i++) {
        ids[i] = items[i][this.fieldId];
      }
    }
    else {
      // create unordered list
      for (id in data) {
        if (data.hasOwnProperty(id)) {
          item = data[id];
          ids.push(item[this.fieldId]);
        }
      }
    }
  }

  return ids;
};

/**
 * Execute a callback function for every item in the dataset.
 * @param {function} callback
 * @param {Object} [options]    Available options:
 *                              {Object.<String, String>} [convert]
 *                              {String[]} [fields] filter fields
 *                              {function} [filter] filter items
 *                              {String | function} [order] Order the items by
 *                                  a field name or custom sort function.
 */
DataSet.prototype.forEach = function (callback, options) {
  var filter = options && options.filter,
      convert = options && options.convert || this.options.convert,
      data = this.data,
      item,
      id;

  if (options && options.order) {
    // execute forEach on ordered list
    var items = this.get(options);

    for (var i = 0, len = items.length; i < len; i++) {
      item = items[i];
      id = item[this.fieldId];
      callback(item, id);
    }
  }
  else {
    // unordered
    for (id in data) {
      if (data.hasOwnProperty(id)) {
        item = this._getItem(id, convert);
        if (!filter || filter(item)) {
          callback(item, id);
        }
      }
    }
  }
};

/**
 * Map every item in the dataset.
 * @param {function} callback
 * @param {Object} [options]    Available options:
 *                              {Object.<String, String>} [convert]
 *                              {String[]} [fields] filter fields
 *                              {function} [filter] filter items
 *                              {String | function} [order] Order the items by
 *                                  a field name or custom sort function.
 * @return {Object[]} mappedItems
 */
DataSet.prototype.map = function (callback, options) {
  var filter = options && options.filter,
      convert = options && options.convert || this.options.convert,
      mappedItems = [],
      data = this.data,
      item;

  // convert and filter items
  for (var id in data) {
    if (data.hasOwnProperty(id)) {
      item = this._getItem(id, convert);
      if (!filter || filter(item)) {
        mappedItems.push(callback(item, id));
      }
    }
  }

  // order items
  if (options && options.order) {
    this._sort(mappedItems, options.order);
  }

  return mappedItems;
};

/**
 * Filter the fields of an item
 * @param {Object} item
 * @param {String[]} fields     Field names
 * @return {Object} filteredItem
 * @private
 */
DataSet.prototype._filterFields = function (item, fields) {
  var filteredItem = {};

  for (var field in item) {
    if (item.hasOwnProperty(field) && (fields.indexOf(field) != -1)) {
      filteredItem[field] = item[field];
    }
  }

  return filteredItem;
};

/**
 * Sort the provided array with items
 * @param {Object[]} items
 * @param {String | function} order      A field name or custom sort function.
 * @private
 */
DataSet.prototype._sort = function (items, order) {
  if (util.isString(order)) {
    // order by provided field name
    var name = order; // field name
    items.sort(function (a, b) {
      var av = a[name];
      var bv = b[name];
      return (av > bv) ? 1 : ((av < bv) ? -1 : 0);
    });
  }
  else if (typeof order === 'function') {
    // order by sort function
    items.sort(order);
  }
  // TODO: extend order by an Object {field:String, direction:String}
  //       where direction can be 'asc' or 'desc'
  else {
    throw new TypeError('Order must be a function or a string');
  }
};

/**
 * Remove an object by pointer or by id
 * @param {String | Number | Object | Array} id Object or id, or an array with
 *                                              objects or ids to be removed
 * @param {String} [senderId] Optional sender id
 * @return {Array} removedIds
 */
DataSet.prototype.remove = function (id, senderId) {
  var removedIds = [],
      i, len, removedId;

  if (id instanceof Array) {
    for (i = 0, len = id.length; i < len; i++) {
      removedId = this._remove(id[i]);
      if (removedId != null) {
        removedIds.push(removedId);
      }
    }
  }
  else {
    removedId = this._remove(id);
    if (removedId != null) {
      removedIds.push(removedId);
    }
  }

  if (removedIds.length) {
    this._trigger('remove', {items: removedIds}, senderId);
  }

  return removedIds;
};

/**
 * Remove an item by its id
 * @param {Number | String | Object} id   id or item
 * @returns {Number | String | null} id
 * @private
 */
DataSet.prototype._remove = function (id) {
  if (util.isNumber(id) || util.isString(id)) {
    if (this.data[id]) {
      delete this.data[id];
      delete this.internalIds[id];
      return id;
    }
  }
  else if (id instanceof Object) {
    var itemId = id[this.fieldId];
    if (itemId && this.data[itemId]) {
      delete this.data[itemId];
      delete this.internalIds[itemId];
      return itemId;
    }
  }
  return null;
};

/**
 * Clear the data
 * @param {String} [senderId] Optional sender id
 * @return {Array} removedIds    The ids of all removed items
 */
DataSet.prototype.clear = function (senderId) {
  var ids = Object.keys(this.data);

  this.data = {};
  this.internalIds = {};

  this._trigger('remove', {items: ids}, senderId);

  return ids;
};

/**
 * Find the item with maximum value of a specified field
 * @param {String} field
 * @return {Object | null} item  Item containing max value, or null if no items
 */
DataSet.prototype.max = function (field) {
  var data = this.data,
      max = null,
      maxField = null;

  for (var id in data) {
    if (data.hasOwnProperty(id)) {
      var item = data[id];
      var itemField = item[field];
      if (itemField != null && (!max || itemField > maxField)) {
        max = item;
        maxField = itemField;
      }
    }
  }

  return max;
};

/**
 * Find the item with minimum value of a specified field
 * @param {String} field
 * @return {Object | null} item  Item containing max value, or null if no items
 */
DataSet.prototype.min = function (field) {
  var data = this.data,
      min = null,
      minField = null;

  for (var id in data) {
    if (data.hasOwnProperty(id)) {
      var item = data[id];
      var itemField = item[field];
      if (itemField != null && (!min || itemField < minField)) {
        min = item;
        minField = itemField;
      }
    }
  }

  return min;
};

/**
 * Find all distinct values of a specified field
 * @param {String} field
 * @return {Array} values  Array containing all distinct values. If data items
 *                         do not contain the specified field are ignored.
 *                         The returned array is unordered.
 */
DataSet.prototype.distinct = function (field) {
  var data = this.data,
      values = [],
      fieldType = this.options.convert[field],
      count = 0;

  for (var prop in data) {
    if (data.hasOwnProperty(prop)) {
      var item = data[prop];
      var value = util.convert(item[field], fieldType);
      var exists = false;
      for (var i = 0; i < count; i++) {
        if (values[i] == value) {
          exists = true;
          break;
        }
      }
      if (!exists && (value !== undefined)) {
        values[count] = value;
        count++;
      }
    }
  }

  return values;
};

/**
 * Add a single item. Will fail when an item with the same id already exists.
 * @param {Object} item
 * @return {String} id
 * @private
 */
DataSet.prototype._addItem = function (item) {
  var id = item[this.fieldId];

  if (id != undefined) {
    // check whether this id is already taken
    if (this.data[id]) {
      // item already exists
      throw new Error('Cannot add item: item with id ' + id + ' already exists');
    }
  }
  else {
    // generate an id
    id = util.randomUUID();
    item[this.fieldId] = id;
    this.internalIds[id] = item;
  }

  var d = {};
  for (var field in item) {
    if (item.hasOwnProperty(field)) {
      var fieldType = this.convert[field];  // type may be undefined
      d[field] = util.convert(item[field], fieldType);
    }
  }
  this.data[id] = d;

  return id;
};

/**
 * Get an item. Fields can be converted to a specific type
 * @param {String} id
 * @param {Object.<String, String>} [convert]  field types to convert
 * @return {Object | null} item
 * @private
 */
DataSet.prototype._getItem = function (id, convert) {
  var field, value;

  // get the item from the dataset
  var raw = this.data[id];
  if (!raw) {
    return null;
  }

  // convert the items field types
  var converted = {},
      fieldId = this.fieldId,
      internalIds = this.internalIds;
  if (convert) {
    for (field in raw) {
      if (raw.hasOwnProperty(field)) {
        value = raw[field];
        // output all fields, except internal ids
        if ((field != fieldId) || (!(value in internalIds) || this.showInternalIds)) {
          converted[field] = util.convert(value, convert[field]);
        }
      }
    }
  }
  else {
    // no field types specified, no converting needed
    for (field in raw) {
      if (raw.hasOwnProperty(field)) {
        value = raw[field];
        // output all fields, except internal ids
        if ((field != fieldId) || (!(value in internalIds) || this.showInternalIds)) {
          converted[field] = value;
        }
      }
    }
  }
  return converted;
};

/**
 * Update a single item: merge with existing item.
 * Will fail when the item has no id, or when there does not exist an item
 * with the same id.
 * @param {Object} item
 * @return {String} id
 * @private
 */
DataSet.prototype._updateItem = function (item) {
  var id = item[this.fieldId];
  if (id == undefined) {
    throw new Error('Cannot update item: item has no id (item: ' + JSON.stringify(item) + ')');
  }
  var d = this.data[id];
  if (!d) {
    // item doesn't exist
    throw new Error('Cannot update item: no item with id ' + id + ' found');
  }

  // merge with current item
  for (var field in item) {
    if (item.hasOwnProperty(field)) {
      var fieldType = this.convert[field];  // type may be undefined
      d[field] = util.convert(item[field], fieldType);
    }
  }

  return id;
};

/**
 * check if an id is an internal or external id
 * @param id
 * @returns {boolean}
 * @private
 */
DataSet.prototype.isInternalId = function(id) {
  return (id in this.internalIds);
};


/**
 * Get an array with the column names of a Google DataTable
 * @param {DataTable} dataTable
 * @return {String[]} columnNames
 * @private
 */
DataSet.prototype._getColumnNames = function (dataTable) {
  var columns = [];
  for (var col = 0, cols = dataTable.getNumberOfColumns(); col < cols; col++) {
    columns[col] = dataTable.getColumnId(col) || dataTable.getColumnLabel(col);
  }
  return columns;
};

/**
 * Append an item as a row to the dataTable
 * @param dataTable
 * @param columns
 * @param item
 * @private
 */
DataSet.prototype._appendRow = function (dataTable, columns, item) {
  var row = dataTable.addRow();

  for (var col = 0, cols = columns.length; col < cols; col++) {
    var field = columns[col];
    dataTable.setValue(row, col, item[field]);
  }
};

/**
 * DataView
 *
 * a dataview offers a filtered view on a dataset or an other dataview.
 *
 * @param {DataSet | DataView} data
 * @param {Object} [options]   Available options: see method get
 *
 * @constructor DataView
 */
function DataView (data, options) {
  this.id = util.randomUUID();

  this.data = null;
  this.ids = {}; // ids of the items currently in memory (just contains a boolean true)
  this.options = options || {};
  this.fieldId = 'id'; // name of the field containing id
  this.subscribers = {}; // event subscribers

  var me = this;
  this.listener = function () {
    me._onEvent.apply(me, arguments);
  };

  this.setData(data);
}

// TODO: implement a function .config() to dynamically update things like configured filter
// and trigger changes accordingly

/**
 * Set a data source for the view
 * @param {DataSet | DataView} data
 */
DataView.prototype.setData = function (data) {
  var ids, dataItems, i, len;

  if (this.data) {
    // unsubscribe from current dataset
    if (this.data.unsubscribe) {
      this.data.unsubscribe('*', this.listener);
    }

    // trigger a remove of all items in memory
    ids = [];
    for (var id in this.ids) {
      if (this.ids.hasOwnProperty(id)) {
        ids.push(id);
      }
    }
    this.ids = {};
    this._trigger('remove', {items: ids});
  }

  this.data = data;

  if (this.data) {
    // update fieldId
    this.fieldId = this.options.fieldId ||
        (this.data && this.data.options && this.data.options.fieldId) ||
        'id';

    // trigger an add of all added items
    ids = this.data.getIds({filter: this.options && this.options.filter});
    for (i = 0, len = ids.length; i < len; i++) {
      id = ids[i];
      this.ids[id] = true;
    }
    this._trigger('add', {items: ids});

    // subscribe to new dataset
    if (this.data.on) {
      this.data.on('*', this.listener);
    }
  }
};

/**
 * Get data from the data view
 *
 * Usage:
 *
 *     get()
 *     get(options: Object)
 *     get(options: Object, data: Array | DataTable)
 *
 *     get(id: Number)
 *     get(id: Number, options: Object)
 *     get(id: Number, options: Object, data: Array | DataTable)
 *
 *     get(ids: Number[])
 *     get(ids: Number[], options: Object)
 *     get(ids: Number[], options: Object, data: Array | DataTable)
 *
 * Where:
 *
 * {Number | String} id         The id of an item
 * {Number[] | String{}} ids    An array with ids of items
 * {Object} options             An Object with options. Available options:
 *                              {String} [type] Type of data to be returned. Can
 *                                              be 'DataTable' or 'Array' (default)
 *                              {Object.<String, String>} [convert]
 *                              {String[]} [fields] field names to be returned
 *                              {function} [filter] filter items
 *                              {String | function} [order] Order the items by
 *                                  a field name or custom sort function.
 * {Array | DataTable} [data]   If provided, items will be appended to this
 *                              array or table. Required in case of Google
 *                              DataTable.
 * @param args
 */
DataView.prototype.get = function (args) {
  var me = this;

  // parse the arguments
  var ids, options, data;
  var firstType = util.getType(arguments[0]);
  if (firstType == 'String' || firstType == 'Number' || firstType == 'Array') {
    // get(id(s) [, options] [, data])
    ids = arguments[0];  // can be a single id or an array with ids
    options = arguments[1];
    data = arguments[2];
  }
  else {
    // get([, options] [, data])
    options = arguments[0];
    data = arguments[1];
  }

  // extend the options with the default options and provided options
  var viewOptions = util.extend({}, this.options, options);

  // create a combined filter method when needed
  if (this.options.filter && options && options.filter) {
    viewOptions.filter = function (item) {
      return me.options.filter(item) && options.filter(item);
    }
  }

  // build up the call to the linked data set
  var getArguments = [];
  if (ids != undefined) {
    getArguments.push(ids);
  }
  getArguments.push(viewOptions);
  getArguments.push(data);

  return this.data && this.data.get.apply(this.data, getArguments);
};

/**
 * Get ids of all items or from a filtered set of items.
 * @param {Object} [options]    An Object with options. Available options:
 *                              {function} [filter] filter items
 *                              {String | function} [order] Order the items by
 *                                  a field name or custom sort function.
 * @return {Array} ids
 */
DataView.prototype.getIds = function (options) {
  var ids;

  if (this.data) {
    var defaultFilter = this.options.filter;
    var filter;

    if (options && options.filter) {
      if (defaultFilter) {
        filter = function (item) {
          return defaultFilter(item) && options.filter(item);
        }
      }
      else {
        filter = options.filter;
      }
    }
    else {
      filter = defaultFilter;
    }

    ids = this.data.getIds({
      filter: filter,
      order: options && options.order
    });
  }
  else {
    ids = [];
  }

  return ids;
};

/**
 * Event listener. Will propagate all events from the connected data set to
 * the subscribers of the DataView, but will filter the items and only trigger
 * when there are changes in the filtered data set.
 * @param {String} event
 * @param {Object | null} params
 * @param {String} senderId
 * @private
 */
DataView.prototype._onEvent = function (event, params, senderId) {
  var i, len, id, item,
      ids = params && params.items,
      data = this.data,
      added = [],
      updated = [],
      removed = [];

  if (ids && data) {
    switch (event) {
      case 'add':
        // filter the ids of the added items
        for (i = 0, len = ids.length; i < len; i++) {
          id = ids[i];
          item = this.get(id);
          if (item) {
            this.ids[id] = true;
            added.push(id);
          }
        }

        break;

      case 'update':
        // determine the event from the views viewpoint: an updated
        // item can be added, updated, or removed from this view.
        for (i = 0, len = ids.length; i < len; i++) {
          id = ids[i];
          item = this.get(id);

          if (item) {
            if (this.ids[id]) {
              updated.push(id);
            }
            else {
              this.ids[id] = true;
              added.push(id);
            }
          }
          else {
            if (this.ids[id]) {
              delete this.ids[id];
              removed.push(id);
            }
            else {
              // nothing interesting for me :-(
            }
          }
        }

        break;

      case 'remove':
        // filter the ids of the removed items
        for (i = 0, len = ids.length; i < len; i++) {
          id = ids[i];
          if (this.ids[id]) {
            delete this.ids[id];
            removed.push(id);
          }
        }

        break;
    }

    if (added.length) {
      this._trigger('add', {items: added}, senderId);
    }
    if (updated.length) {
      this._trigger('update', {items: updated}, senderId);
    }
    if (removed.length) {
      this._trigger('remove', {items: removed}, senderId);
    }
  }
};

// copy subscription functionality from DataSet
DataView.prototype.on = DataSet.prototype.on;
DataView.prototype.off = DataSet.prototype.off;
DataView.prototype._trigger = DataSet.prototype._trigger;

// TODO: make these functions deprecated (replaced with `on` and `off` since version 0.5)
DataView.prototype.subscribe = DataView.prototype.on;
DataView.prototype.unsubscribe = DataView.prototype.off;

/**
 * Utility functions for ordering and stacking of items
 */
var stack = {};

/**
 * Order items by their start data
 * @param {Item[]} items
 */
stack.orderByStart = function orderByStart(items) {
  items.sort(function (a, b) {
    return a.data.start - b.data.start;
  });
};

/**
 * Order items by their end date. If they have no end date, their start date
 * is used.
 * @param {Item[]} items
 */
stack.orderByEnd = function orderByEnd(items) {
  items.sort(function (a, b) {
    var aTime = ('end' in a.data) ? a.data.end : a.data.start,
        bTime = ('end' in b.data) ? b.data.end : b.data.start;

    return aTime - bTime;
  });
};

/**
 * Adjust vertical positions of the items such that they don't overlap each
 * other.
 * @param {Item[]} items
 *            All visible items
 * @param {{item: number, axis: number}} margin
 *            Margins between items and between items and the axis.
 * @param {boolean} [force=false]
 *            If true, all items will be repositioned. If false (default), only
 *            items having a top===null will be re-stacked
 */
stack.stack = function _stack (items, margin, force) {
  var i, iMax;

  if (force) {
    // reset top position of all items
    for (i = 0, iMax = items.length; i < iMax; i++) {
      items[i].top = null;
    }
  }

  // calculate new, non-overlapping positions
  for (i = 0, iMax = items.length; i < iMax; i++) {
    var item = items[i];
    if (item.top === null) {
      // initialize top position
      item.top = margin.axis;

      do {
        // TODO: optimize checking for overlap. when there is a gap without items,
        //       you only need to check for items from the next item on, not from zero
        var collidingItem = null;
        for (var j = 0, jj = items.length; j < jj; j++) {
          var other = items[j];
          if (other.top !== null && other !== item && stack.collision(item, other, margin.item)) {
            collidingItem = other;
            break;
          }
        }

        if (collidingItem != null) {
          // There is a collision. Reposition the items above the colliding element
          item.top = collidingItem.top + collidingItem.height + margin.item;
        }
      } while (collidingItem);
    }
  }
};

/**
 * Adjust vertical positions of the items without stacking them
 * @param {Item[]} items
 *            All visible items
 * @param {{item: number, axis: number}} margin
 *            Margins between items and between items and the axis.
 */
stack.nostack = function nostack (items, margin) {
  var i, iMax;

  // reset top position of all items
  for (i = 0, iMax = items.length; i < iMax; i++) {
    items[i].top = margin.axis;
  }
};

/**
 * Test if the two provided items collide
 * The items must have parameters left, width, top, and height.
 * @param {Item} a          The first item
 * @param {Item} b          The second item
 * @param {Number} margin   A minimum required margin.
 *                          If margin is provided, the two items will be
 *                          marked colliding when they overlap or
 *                          when the margin between the two is smaller than
 *                          the requested margin.
 * @return {boolean}        true if a and b collide, else false
 */
stack.collision = function collision (a, b, margin) {
  return ((a.left - margin) < (b.left + b.width) &&
      (a.left + a.width + margin) > b.left &&
      (a.top - margin) < (b.top + b.height) &&
      (a.top + a.height + margin) > b.top);
};

/**
 * @constructor  TimeStep
 * The class TimeStep is an iterator for dates. You provide a start date and an
 * end date. The class itself determines the best scale (step size) based on the
 * provided start Date, end Date, and minimumStep.
 *
 * If minimumStep is provided, the step size is chosen as close as possible
 * to the minimumStep but larger than minimumStep. If minimumStep is not
 * provided, the scale is set to 1 DAY.
 * The minimumStep should correspond with the onscreen size of about 6 characters
 *
 * Alternatively, you can set a scale by hand.
 * After creation, you can initialize the class by executing first(). Then you
 * can iterate from the start date to the end date via next(). You can check if
 * the end date is reached with the function hasNext(). After each step, you can
 * retrieve the current date via getCurrent().
 * The TimeStep has scales ranging from milliseconds, seconds, minutes, hours,
 * days, to years.
 *
 * Version: 1.2
 *
 * @param {Date} [start]         The start date, for example new Date(2010, 9, 21)
 *                               or new Date(2010, 9, 21, 23, 45, 00)
 * @param {Date} [end]           The end date
 * @param {Number} [minimumStep] Optional. Minimum step size in milliseconds
 */
function TimeStep(start, end, minimumStep) {
  // variables
  this.current = new Date();
  this._start = new Date();
  this._end = new Date();

  this.autoScale  = true;
  this.scale = TimeStep.SCALE.DAY;
  this.step = 1;

  // initialize the range
  this.setRange(start, end, minimumStep);
}

/// enum scale
TimeStep.SCALE = {
  MILLISECOND: 1,
  SECOND: 2,
  MINUTE: 3,
  HOUR: 4,
  DAY: 5,
  WEEKDAY: 6,
  MONTH: 7,
  YEAR: 8
};


/**
 * Set a new range
 * If minimumStep is provided, the step size is chosen as close as possible
 * to the minimumStep but larger than minimumStep. If minimumStep is not
 * provided, the scale is set to 1 DAY.
 * The minimumStep should correspond with the onscreen size of about 6 characters
 * @param {Date} [start]      The start date and time.
 * @param {Date} [end]        The end date and time.
 * @param {int} [minimumStep] Optional. Minimum step size in milliseconds
 */
TimeStep.prototype.setRange = function(start, end, minimumStep) {
  if (!(start instanceof Date) || !(end instanceof Date)) {
    throw  "No legal start or end date in method setRange";
  }

  this._start = (start != undefined) ? new Date(start.valueOf()) : new Date();
  this._end = (end != undefined) ? new Date(end.valueOf()) : new Date();

  if (this.autoScale) {
    this.setMinimumStep(minimumStep);
  }
};

/**
 * Set the range iterator to the start date.
 */
TimeStep.prototype.first = function() {
  this.current = new Date(this._start.valueOf());
  this.roundToMinor();
};

/**
 * Round the current date to the first minor date value
 * This must be executed once when the current date is set to start Date
 */
TimeStep.prototype.roundToMinor = function() {
  // round to floor
  // IMPORTANT: we have no breaks in this switch! (this is no bug)
  //noinspection FallthroughInSwitchStatementJS
  switch (this.scale) {
    case TimeStep.SCALE.YEAR:
      this.current.setFullYear(this.step * Math.floor(this.current.getFullYear() / this.step));
      this.current.setMonth(0);
    case TimeStep.SCALE.MONTH:        this.current.setDate(1);
    case TimeStep.SCALE.DAY:          // intentional fall through
    case TimeStep.SCALE.WEEKDAY:      this.current.setHours(0);
    case TimeStep.SCALE.HOUR:         this.current.setMinutes(0);
    case TimeStep.SCALE.MINUTE:       this.current.setSeconds(0);
    case TimeStep.SCALE.SECOND:       this.current.setMilliseconds(0);
    //case TimeStep.SCALE.MILLISECOND: // nothing to do for milliseconds
  }

  if (this.step != 1) {
    // round down to the first minor value that is a multiple of the current step size
    switch (this.scale) {
      case TimeStep.SCALE.MILLISECOND:  this.current.setMilliseconds(this.current.getMilliseconds() - this.current.getMilliseconds() % this.step);  break;
      case TimeStep.SCALE.SECOND:       this.current.setSeconds(this.current.getSeconds() - this.current.getSeconds() % this.step); break;
      case TimeStep.SCALE.MINUTE:       this.current.setMinutes(this.current.getMinutes() - this.current.getMinutes() % this.step); break;
      case TimeStep.SCALE.HOUR:         this.current.setHours(this.current.getHours() - this.current.getHours() % this.step); break;
      case TimeStep.SCALE.WEEKDAY:      // intentional fall through
      case TimeStep.SCALE.DAY:          this.current.setDate((this.current.getDate()-1) - (this.current.getDate()-1) % this.step + 1); break;
      case TimeStep.SCALE.MONTH:        this.current.setMonth(this.current.getMonth() - this.current.getMonth() % this.step);  break;
      case TimeStep.SCALE.YEAR:         this.current.setFullYear(this.current.getFullYear() - this.current.getFullYear() % this.step); break;
      default: break;
    }
  }
};

/**
 * Check if the there is a next step
 * @return {boolean}  true if the current date has not passed the end date
 */
TimeStep.prototype.hasNext = function () {
  return (this.current.valueOf() <= this._end.valueOf());
};

/**
 * Do the next step
 */
TimeStep.prototype.next = function() {
  var prev = this.current.valueOf();

  // Two cases, needed to prevent issues with switching daylight savings
  // (end of March and end of October)
  if (this.current.getMonth() < 6)   {
    switch (this.scale) {
      case TimeStep.SCALE.MILLISECOND:

        this.current = new Date(this.current.valueOf() + this.step); break;
      case TimeStep.SCALE.SECOND:       this.current = new Date(this.current.valueOf() + this.step * 1000); break;
      case TimeStep.SCALE.MINUTE:       this.current = new Date(this.current.valueOf() + this.step * 1000 * 60); break;
      case TimeStep.SCALE.HOUR:
        this.current = new Date(this.current.valueOf() + this.step * 1000 * 60 * 60);
        // in case of skipping an hour for daylight savings, adjust the hour again (else you get: 0h 5h 9h ... instead of 0h 4h 8h ...)
        var h = this.current.getHours();
        this.current.setHours(h - (h % this.step));
        break;
      case TimeStep.SCALE.WEEKDAY:      // intentional fall through
      case TimeStep.SCALE.DAY:          this.current.setDate(this.current.getDate() + this.step); break;
      case TimeStep.SCALE.MONTH:        this.current.setMonth(this.current.getMonth() + this.step); break;
      case TimeStep.SCALE.YEAR:         this.current.setFullYear(this.current.getFullYear() + this.step); break;
      default:                      break;
    }
  }
  else {
    switch (this.scale) {
      case TimeStep.SCALE.MILLISECOND:  this.current = new Date(this.current.valueOf() + this.step); break;
      case TimeStep.SCALE.SECOND:       this.current.setSeconds(this.current.getSeconds() + this.step); break;
      case TimeStep.SCALE.MINUTE:       this.current.setMinutes(this.current.getMinutes() + this.step); break;
      case TimeStep.SCALE.HOUR:         this.current.setHours(this.current.getHours() + this.step); break;
      case TimeStep.SCALE.WEEKDAY:      // intentional fall through
      case TimeStep.SCALE.DAY:          this.current.setDate(this.current.getDate() + this.step); break;
      case TimeStep.SCALE.MONTH:        this.current.setMonth(this.current.getMonth() + this.step); break;
      case TimeStep.SCALE.YEAR:         this.current.setFullYear(this.current.getFullYear() + this.step); break;
      default:                      break;
    }
  }

  if (this.step != 1) {
    // round down to the correct major value
    switch (this.scale) {
      case TimeStep.SCALE.MILLISECOND:  if(this.current.getMilliseconds() < this.step) this.current.setMilliseconds(0);  break;
      case TimeStep.SCALE.SECOND:       if(this.current.getSeconds() < this.step) this.current.setSeconds(0);  break;
      case TimeStep.SCALE.MINUTE:       if(this.current.getMinutes() < this.step) this.current.setMinutes(0);  break;
      case TimeStep.SCALE.HOUR:         if(this.current.getHours() < this.step) this.current.setHours(0);  break;
      case TimeStep.SCALE.WEEKDAY:      // intentional fall through
      case TimeStep.SCALE.DAY:          if(this.current.getDate() < this.step+1) this.current.setDate(1); break;
      case TimeStep.SCALE.MONTH:        if(this.current.getMonth() < this.step) this.current.setMonth(0);  break;
      case TimeStep.SCALE.YEAR:         break; // nothing to do for year
      default:                break;
    }
  }

  // safety mechanism: if current time is still unchanged, move to the end
  if (this.current.valueOf() == prev) {
    this.current = new Date(this._end.valueOf());
  }
};


/**
 * Get the current datetime
 * @return {Date}  current The current date
 */
TimeStep.prototype.getCurrent = function() {
  return this.current;
};

/**
 * Set a custom scale. Autoscaling will be disabled.
 * For example setScale(SCALE.MINUTES, 5) will result
 * in minor steps of 5 minutes, and major steps of an hour.
 *
 * @param {TimeStep.SCALE} newScale
 *                               A scale. Choose from SCALE.MILLISECOND,
 *                               SCALE.SECOND, SCALE.MINUTE, SCALE.HOUR,
 *                               SCALE.WEEKDAY, SCALE.DAY, SCALE.MONTH,
 *                               SCALE.YEAR.
 * @param {Number}     newStep   A step size, by default 1. Choose for
 *                               example 1, 2, 5, or 10.
 */
TimeStep.prototype.setScale = function(newScale, newStep) {
  this.scale = newScale;

  if (newStep > 0) {
    this.step = newStep;
  }

  this.autoScale = false;
};

/**
 * Enable or disable autoscaling
 * @param {boolean} enable  If true, autoascaling is set true
 */
TimeStep.prototype.setAutoScale = function (enable) {
  this.autoScale = enable;
};


/**
 * Automatically determine the scale that bests fits the provided minimum step
 * @param {Number} [minimumStep]  The minimum step size in milliseconds
 */
TimeStep.prototype.setMinimumStep = function(minimumStep) {
  if (minimumStep == undefined) {
    return;
  }

  var stepYear       = (1000 * 60 * 60 * 24 * 30 * 12);
  var stepMonth      = (1000 * 60 * 60 * 24 * 30);
  var stepDay        = (1000 * 60 * 60 * 24);
  var stepHour       = (1000 * 60 * 60);
  var stepMinute     = (1000 * 60);
  var stepSecond     = (1000);
  var stepMillisecond= (1);

  // find the smallest step that is larger than the provided minimumStep
  if (stepYear*1000 > minimumStep)        {this.scale = TimeStep.SCALE.YEAR;        this.step = 1000;}
  if (stepYear*500 > minimumStep)         {this.scale = TimeStep.SCALE.YEAR;        this.step = 500;}
  if (stepYear*100 > minimumStep)         {this.scale = TimeStep.SCALE.YEAR;        this.step = 100;}
  if (stepYear*50 > minimumStep)          {this.scale = TimeStep.SCALE.YEAR;        this.step = 50;}
  if (stepYear*10 > minimumStep)          {this.scale = TimeStep.SCALE.YEAR;        this.step = 10;}
  if (stepYear*5 > minimumStep)           {this.scale = TimeStep.SCALE.YEAR;        this.step = 5;}
  if (stepYear > minimumStep)             {this.scale = TimeStep.SCALE.YEAR;        this.step = 1;}
  if (stepMonth*3 > minimumStep)          {this.scale = TimeStep.SCALE.MONTH;       this.step = 3;}
  if (stepMonth > minimumStep)            {this.scale = TimeStep.SCALE.MONTH;       this.step = 1;}
  if (stepDay*5 > minimumStep)            {this.scale = TimeStep.SCALE.DAY;         this.step = 5;}
  if (stepDay*2 > minimumStep)            {this.scale = TimeStep.SCALE.DAY;         this.step = 2;}
  if (stepDay > minimumStep)              {this.scale = TimeStep.SCALE.DAY;         this.step = 1;}
  if (stepDay/2 > minimumStep)            {this.scale = TimeStep.SCALE.WEEKDAY;     this.step = 1;}
  if (stepHour*4 > minimumStep)           {this.scale = TimeStep.SCALE.HOUR;        this.step = 4;}
  if (stepHour > minimumStep)             {this.scale = TimeStep.SCALE.HOUR;        this.step = 1;}
  if (stepMinute*15 > minimumStep)        {this.scale = TimeStep.SCALE.MINUTE;      this.step = 15;}
  if (stepMinute*10 > minimumStep)        {this.scale = TimeStep.SCALE.MINUTE;      this.step = 10;}
  if (stepMinute*5 > minimumStep)         {this.scale = TimeStep.SCALE.MINUTE;      this.step = 5;}
  if (stepMinute > minimumStep)           {this.scale = TimeStep.SCALE.MINUTE;      this.step = 1;}
  if (stepSecond*15 > minimumStep)        {this.scale = TimeStep.SCALE.SECOND;      this.step = 15;}
  if (stepSecond*10 > minimumStep)        {this.scale = TimeStep.SCALE.SECOND;      this.step = 10;}
  if (stepSecond*5 > minimumStep)         {this.scale = TimeStep.SCALE.SECOND;      this.step = 5;}
  if (stepSecond > minimumStep)           {this.scale = TimeStep.SCALE.SECOND;      this.step = 1;}
  if (stepMillisecond*200 > minimumStep)  {this.scale = TimeStep.SCALE.MILLISECOND; this.step = 200;}
  if (stepMillisecond*100 > minimumStep)  {this.scale = TimeStep.SCALE.MILLISECOND; this.step = 100;}
  if (stepMillisecond*50 > minimumStep)   {this.scale = TimeStep.SCALE.MILLISECOND; this.step = 50;}
  if (stepMillisecond*10 > minimumStep)   {this.scale = TimeStep.SCALE.MILLISECOND; this.step = 10;}
  if (stepMillisecond*5 > minimumStep)    {this.scale = TimeStep.SCALE.MILLISECOND; this.step = 5;}
  if (stepMillisecond > minimumStep)      {this.scale = TimeStep.SCALE.MILLISECOND; this.step = 1;}
};

/**
 * Snap a date to a rounded value.
 * The snap intervals are dependent on the current scale and step.
 * @param {Date} date   the date to be snapped.
 * @return {Date} snappedDate
 */
TimeStep.prototype.snap = function(date) {
  var clone = new Date(date.valueOf());

  if (this.scale == TimeStep.SCALE.YEAR) {
    var year = clone.getFullYear() + Math.round(clone.getMonth() / 12);
    clone.setFullYear(Math.round(year / this.step) * this.step);
    clone.setMonth(0);
    clone.setDate(0);
    clone.setHours(0);
    clone.setMinutes(0);
    clone.setSeconds(0);
    clone.setMilliseconds(0);
  }
  else if (this.scale == TimeStep.SCALE.MONTH) {
    if (clone.getDate() > 15) {
      clone.setDate(1);
      clone.setMonth(clone.getMonth() + 1);
      // important: first set Date to 1, after that change the month.
    }
    else {
      clone.setDate(1);
    }

    clone.setHours(0);
    clone.setMinutes(0);
    clone.setSeconds(0);
    clone.setMilliseconds(0);
  }
  else if (this.scale == TimeStep.SCALE.DAY ||
      this.scale == TimeStep.SCALE.WEEKDAY) {
    //noinspection FallthroughInSwitchStatementJS
    switch (this.step) {
      case 5:
      case 2:
        clone.setHours(Math.round(clone.getHours() / 24) * 24); break;
      default:
        clone.setHours(Math.round(clone.getHours() / 12) * 12); break;
    }
    clone.setMinutes(0);
    clone.setSeconds(0);
    clone.setMilliseconds(0);
  }
  else if (this.scale == TimeStep.SCALE.HOUR) {
    switch (this.step) {
      case 4:
        clone.setMinutes(Math.round(clone.getMinutes() / 60) * 60); break;
      default:
        clone.setMinutes(Math.round(clone.getMinutes() / 30) * 30); break;
    }
    clone.setSeconds(0);
    clone.setMilliseconds(0);
  } else if (this.scale == TimeStep.SCALE.MINUTE) {
    //noinspection FallthroughInSwitchStatementJS
    switch (this.step) {
      case 15:
      case 10:
        clone.setMinutes(Math.round(clone.getMinutes() / 5) * 5);
        clone.setSeconds(0);
        break;
      case 5:
        clone.setSeconds(Math.round(clone.getSeconds() / 60) * 60); break;
      default:
        clone.setSeconds(Math.round(clone.getSeconds() / 30) * 30); break;
    }
    clone.setMilliseconds(0);
  }
  else if (this.scale == TimeStep.SCALE.SECOND) {
    //noinspection FallthroughInSwitchStatementJS
    switch (this.step) {
      case 15:
      case 10:
        clone.setSeconds(Math.round(clone.getSeconds() / 5) * 5);
        clone.setMilliseconds(0);
        break;
      case 5:
        clone.setMilliseconds(Math.round(clone.getMilliseconds() / 1000) * 1000); break;
      default:
        clone.setMilliseconds(Math.round(clone.getMilliseconds() / 500) * 500); break;
    }
  }
  else if (this.scale == TimeStep.SCALE.MILLISECOND) {
    var step = this.step > 5 ? this.step / 2 : 1;
    clone.setMilliseconds(Math.round(clone.getMilliseconds() / step) * step);
  }
  
  return clone;
};

/**
 * Check if the current value is a major value (for example when the step
 * is DAY, a major value is each first day of the MONTH)
 * @return {boolean} true if current date is major, else false.
 */
TimeStep.prototype.isMajor = function() {
  switch (this.scale) {
    case TimeStep.SCALE.MILLISECOND:
      return (this.current.getMilliseconds() == 0);
    case TimeStep.SCALE.SECOND:
      return (this.current.getSeconds() == 0);
    case TimeStep.SCALE.MINUTE:
      return (this.current.getHours() == 0) && (this.current.getMinutes() == 0);
    // Note: this is no bug. Major label is equal for both minute and hour scale
    case TimeStep.SCALE.HOUR:
      return (this.current.getHours() == 0);
    case TimeStep.SCALE.WEEKDAY: // intentional fall through
    case TimeStep.SCALE.DAY:
      return (this.current.getDate() == 1);
    case TimeStep.SCALE.MONTH:
      return (this.current.getMonth() == 0);
    case TimeStep.SCALE.YEAR:
      return false;
    default:
      return false;
  }
};


/**
 * Returns formatted text for the minor axislabel, depending on the current
 * date and the scale. For example when scale is MINUTE, the current time is
 * formatted as "hh:mm".
 * @param {Date} [date] custom date. if not provided, current date is taken
 */
TimeStep.prototype.getLabelMinor = function(date) {
  if (date == undefined) {
    date = this.current;
  }

  switch (this.scale) {
    case TimeStep.SCALE.MILLISECOND:  return moment(date).format('SSS');
    case TimeStep.SCALE.SECOND:       return moment(date).format('s');
    case TimeStep.SCALE.MINUTE:       return moment(date).format('HH:mm');
    case TimeStep.SCALE.HOUR:         return moment(date).format('HH:mm');
    case TimeStep.SCALE.WEEKDAY:      return moment(date).format('ddd D');
    case TimeStep.SCALE.DAY:          return moment(date).format('D');
    case TimeStep.SCALE.MONTH:        return moment(date).format('MMM');
    case TimeStep.SCALE.YEAR:         return moment(date).format('YYYY');
    default:                          return '';
  }
};


/**
 * Returns formatted text for the major axis label, depending on the current
 * date and the scale. For example when scale is MINUTE, the major scale is
 * hours, and the hour will be formatted as "hh".
 * @param {Date} [date] custom date. if not provided, current date is taken
 */
TimeStep.prototype.getLabelMajor = function(date) {
  if (date == undefined) {
    date = this.current;
  }

  //noinspection FallthroughInSwitchStatementJS
  switch (this.scale) {
    case TimeStep.SCALE.MILLISECOND:return moment(date).format('HH:mm:ss');
    case TimeStep.SCALE.SECOND:     return moment(date).format('D MMMM HH:mm');
    case TimeStep.SCALE.MINUTE:
    case TimeStep.SCALE.HOUR:       return moment(date).format('ddd D MMMM');
    case TimeStep.SCALE.WEEKDAY:
    case TimeStep.SCALE.DAY:        return moment(date).format('MMMM YYYY');
    case TimeStep.SCALE.MONTH:      return moment(date).format('YYYY');
    case TimeStep.SCALE.YEAR:       return '';
    default:                        return '';
  }
};

/**
 * @constructor Range
 * A Range controls a numeric range with a start and end value.
 * The Range adjusts the range based on mouse events or programmatic changes,
 * and triggers events when the range is changing or has been changed.
 * @param {RootPanel} root      Root panel, used to subscribe to events
 * @param {Panel} parent        Parent panel, used to attach to the DOM
 * @param {Object} [options]    See description at Range.setOptions
 */
function Range(root, parent, options) {
  this.id = util.randomUUID();
  this.start = null; // Number
  this.end = null;   // Number

  this.root = root;
  this.parent = parent;
  this.options = options || {};

  // drag listeners for dragging
  this.root.on('dragstart', this._onDragStart.bind(this));
  this.root.on('drag',      this._onDrag.bind(this));
  this.root.on('dragend',   this._onDragEnd.bind(this));

  // ignore dragging when holding
  this.root.on('hold', this._onHold.bind(this));

  // mouse wheel for zooming
  this.root.on('mousewheel',      this._onMouseWheel.bind(this));
  this.root.on('DOMMouseScroll',  this._onMouseWheel.bind(this)); // For FF

  // pinch to zoom
  this.root.on('touch', this._onTouch.bind(this));
  this.root.on('pinch', this._onPinch.bind(this));

  this.setOptions(options);
}

// turn Range into an event emitter
Emitter(Range.prototype);

/**
 * Set options for the range controller
 * @param {Object} options      Available options:
 *                              {Number} min    Minimum value for start
 *                              {Number} max    Maximum value for end
 *                              {Number} zoomMin    Set a minimum value for
 *                                                  (end - start).
 *                              {Number} zoomMax    Set a maximum value for
 *                                                  (end - start).
 */
Range.prototype.setOptions = function (options) {
  util.extend(this.options, options);

  // re-apply range with new limitations
  if (this.start !== null && this.end !== null) {
    this.setRange(this.start, this.end);
  }
};

/**
 * Test whether direction has a valid value
 * @param {String} direction    'horizontal' or 'vertical'
 */
function validateDirection (direction) {
  if (direction != 'horizontal' && direction != 'vertical') {
    throw new TypeError('Unknown direction "' + direction + '". ' +
        'Choose "horizontal" or "vertical".');
  }
}

/**
 * Set a new start and end range
 * @param {Number} [start]
 * @param {Number} [end]
 */
Range.prototype.setRange = function(start, end) {
  var changed = this._applyRange(start, end);
  if (changed) {
    var params = {
      start: new Date(this.start),
      end: new Date(this.end)
    };
    this.emit('rangechange', params);
    this.emit('rangechanged', params);
  }
};

/**
 * Set a new start and end range. This method is the same as setRange, but
 * does not trigger a range change and range changed event, and it returns
 * true when the range is changed
 * @param {Number} [start]
 * @param {Number} [end]
 * @return {Boolean} changed
 * @private
 */
Range.prototype._applyRange = function(start, end) {
  var newStart = (start != null) ? util.convert(start, 'Date').valueOf() : this.start,
      newEnd   = (end != null)   ? util.convert(end, 'Date').valueOf()   : this.end,
      max = (this.options.max != null) ? util.convert(this.options.max, 'Date').valueOf() : null,
      min = (this.options.min != null) ? util.convert(this.options.min, 'Date').valueOf() : null,
      diff;

  // check for valid number
  if (isNaN(newStart) || newStart === null) {
    throw new Error('Invalid start "' + start + '"');
  }
  if (isNaN(newEnd) || newEnd === null) {
    throw new Error('Invalid end "' + end + '"');
  }

  // prevent start < end
  if (newEnd < newStart) {
    newEnd = newStart;
  }

  // prevent start < min
  if (min !== null) {
    if (newStart < min) {
      diff = (min - newStart);
      newStart += diff;
      newEnd += diff;

      // prevent end > max
      if (max != null) {
        if (newEnd > max) {
          newEnd = max;
        }
      }
    }
  }

  // prevent end > max
  if (max !== null) {
    if (newEnd > max) {
      diff = (newEnd - max);
      newStart -= diff;
      newEnd -= diff;

      // prevent start < min
      if (min != null) {
        if (newStart < min) {
          newStart = min;
        }
      }
    }
  }

  // prevent (end-start) < zoomMin
  if (this.options.zoomMin !== null) {
    var zoomMin = parseFloat(this.options.zoomMin);
    if (zoomMin < 0) {
      zoomMin = 0;
    }
    if ((newEnd - newStart) < zoomMin) {
      if ((this.end - this.start) === zoomMin) {
        // ignore this action, we are already zoomed to the minimum
        newStart = this.start;
        newEnd = this.end;
      }
      else {
        // zoom to the minimum
        diff = (zoomMin - (newEnd - newStart));
        newStart -= diff / 2;
        newEnd += diff / 2;
      }
    }
  }

  // prevent (end-start) > zoomMax
  if (this.options.zoomMax !== null) {
    var zoomMax = parseFloat(this.options.zoomMax);
    if (zoomMax < 0) {
      zoomMax = 0;
    }
    if ((newEnd - newStart) > zoomMax) {
      if ((this.end - this.start) === zoomMax) {
        // ignore this action, we are already zoomed to the maximum
        newStart = this.start;
        newEnd = this.end;
      }
      else {
        // zoom to the maximum
        diff = ((newEnd - newStart) - zoomMax);
        newStart += diff / 2;
        newEnd -= diff / 2;
      }
    }
  }

  var changed = (this.start != newStart || this.end != newEnd);

  this.start = newStart;
  this.end = newEnd;

  return changed;
};

/**
 * Retrieve the current range.
 * @return {Object} An object with start and end properties
 */
Range.prototype.getRange = function() {
  return {
    start: this.start,
    end: this.end
  };
};

/**
 * Calculate the conversion offset and scale for current range, based on
 * the provided width
 * @param {Number} width
 * @returns {{offset: number, scale: number}} conversion
 */
Range.prototype.conversion = function (width) {
  return Range.conversion(this.start, this.end, width);
};

/**
 * Static method to calculate the conversion offset and scale for a range,
 * based on the provided start, end, and width
 * @param {Number} start
 * @param {Number} end
 * @param {Number} width
 * @returns {{offset: number, scale: number}} conversion
 */
Range.conversion = function (start, end, width) {
  if (width != 0 && (end - start != 0)) {
    return {
      offset: start,
      scale: width / (end - start)
    }
  }
  else {
    return {
      offset: 0,
      scale: 1
    };
  }
};

// global (private) object to store drag params
var touchParams = {};

/**
 * Start dragging horizontally or vertically
 * @param {Event} event
 * @private
 */
Range.prototype._onDragStart = function(event) {
  // refuse to drag when we where pinching to prevent the timeline make a jump
  // when releasing the fingers in opposite order from the touch screen
  if (touchParams.ignore) return;

  // TODO: reckon with option movable

  touchParams.start = this.start;
  touchParams.end = this.end;

  var frame = this.parent.frame;
  if (frame) {
    frame.style.cursor = 'move';
  }
};

/**
 * Perform dragging operating.
 * @param {Event} event
 * @private
 */
Range.prototype._onDrag = function (event) {
  var direction = this.options.direction;
  validateDirection(direction);

  // TODO: reckon with option movable


  // refuse to drag when we where pinching to prevent the timeline make a jump
  // when releasing the fingers in opposite order from the touch screen
  if (touchParams.ignore) return;

  var delta = (direction == 'horizontal') ? event.gesture.deltaX : event.gesture.deltaY,
      interval = (touchParams.end - touchParams.start),
      width = (direction == 'horizontal') ? this.parent.width : this.parent.height,
      diffRange = -delta / width * interval;

  this._applyRange(touchParams.start + diffRange, touchParams.end + diffRange);

  this.emit('rangechange', {
    start: new Date(this.start),
    end:   new Date(this.end)
  });
};

/**
 * Stop dragging operating.
 * @param {event} event
 * @private
 */
Range.prototype._onDragEnd = function (event) {
  // refuse to drag when we where pinching to prevent the timeline make a jump
  // when releasing the fingers in opposite order from the touch screen
  if (touchParams.ignore) return;

  // TODO: reckon with option movable

  if (this.parent.frame) {
    this.parent.frame.style.cursor = 'auto';
  }

  // fire a rangechanged event
  this.emit('rangechanged', {
    start: new Date(this.start),
    end:   new Date(this.end)
  });
};

/**
 * Event handler for mouse wheel event, used to zoom
 * Code from http://adomas.org/javascript-mouse-wheel/
 * @param {Event} event
 * @private
 */
Range.prototype._onMouseWheel = function(event) {
  // TODO: reckon with option zoomable

  // retrieve delta
  var delta = 0;
  if (event.wheelDelta) { /* IE/Opera. */
    delta = event.wheelDelta / 120;
  } else if (event.detail) { /* Mozilla case. */
    // In Mozilla, sign of delta is different than in IE.
    // Also, delta is multiple of 3.
    delta = -event.detail / 3;
  }

  // If delta is nonzero, handle it.
  // Basically, delta is now positive if wheel was scrolled up,
  // and negative, if wheel was scrolled down.
  if (delta) {
    // perform the zoom action. Delta is normally 1 or -1

    // adjust a negative delta such that zooming in with delta 0.1
    // equals zooming out with a delta -0.1
    var scale;
    if (delta < 0) {
      scale = 1 - (delta / 5);
    }
    else {
      scale = 1 / (1 + (delta / 5)) ;
    }

    // calculate center, the date to zoom around
    var gesture = util.fakeGesture(this, event),
        pointer = getPointer(gesture.center, this.parent.frame),
        pointerDate = this._pointerToDate(pointer);

    this.zoom(scale, pointerDate);
  }

  // Prevent default actions caused by mouse wheel
  // (else the page and timeline both zoom and scroll)
  event.preventDefault();
};

/**
 * Start of a touch gesture
 * @private
 */
Range.prototype._onTouch = function (event) {
  touchParams.start = this.start;
  touchParams.end = this.end;
  touchParams.ignore = false;
  touchParams.center = null;

  // don't move the range when dragging a selected event
  // TODO: it's not so neat to have to know about the state of the ItemSet
  var item = ItemSet.itemFromTarget(event);
  if (item && item.selected && this.options.editable) {
    touchParams.ignore = true;
  }
};

/**
 * On start of a hold gesture
 * @private
 */
Range.prototype._onHold = function () {
  touchParams.ignore = true;
};

/**
 * Handle pinch event
 * @param {Event} event
 * @private
 */
Range.prototype._onPinch = function (event) {
  var direction = this.options.direction;
  touchParams.ignore = true;

  // TODO: reckon with option zoomable

  if (event.gesture.touches.length > 1) {
    if (!touchParams.center) {
      touchParams.center = getPointer(event.gesture.center, this.parent.frame);
    }

    var scale = 1 / event.gesture.scale,
        initDate = this._pointerToDate(touchParams.center),
        center = getPointer(event.gesture.center, this.parent.frame),
        date = this._pointerToDate(this.parent, center),
        delta = date - initDate; // TODO: utilize delta

    // calculate new start and end
    var newStart = parseInt(initDate + (touchParams.start - initDate) * scale);
    var newEnd = parseInt(initDate + (touchParams.end - initDate) * scale);

    // apply new range
    this.setRange(newStart, newEnd);
  }
};

/**
 * Helper function to calculate the center date for zooming
 * @param {{x: Number, y: Number}} pointer
 * @return {number} date
 * @private
 */
Range.prototype._pointerToDate = function (pointer) {
  var conversion;
  var direction = this.options.direction;

  validateDirection(direction);

  if (direction == 'horizontal') {
    var width = this.parent.width;
    conversion = this.conversion(width);
    return pointer.x / conversion.scale + conversion.offset;
  }
  else {
    var height = this.parent.height;
    conversion = this.conversion(height);
    return pointer.y / conversion.scale + conversion.offset;
  }
};

/**
 * Get the pointer location relative to the location of the dom element
 * @param {{pageX: Number, pageY: Number}} touch
 * @param {Element} element   HTML DOM element
 * @return {{x: Number, y: Number}} pointer
 * @private
 */
function getPointer (touch, element) {
  return {
    x: touch.pageX - vis.util.getAbsoluteLeft(element),
    y: touch.pageY - vis.util.getAbsoluteTop(element)
  };
}

/**
 * Zoom the range the given scale in or out. Start and end date will
 * be adjusted, and the timeline will be redrawn. You can optionally give a
 * date around which to zoom.
 * For example, try scale = 0.9 or 1.1
 * @param {Number} scale      Scaling factor. Values above 1 will zoom out,
 *                            values below 1 will zoom in.
 * @param {Number} [center]   Value representing a date around which will
 *                            be zoomed.
 */
Range.prototype.zoom = function(scale, center) {
  // if centerDate is not provided, take it half between start Date and end Date
  if (center == null) {
    center = (this.start + this.end) / 2;
  }

  // calculate new start and end
  var newStart = center + (this.start - center) * scale;
  var newEnd = center + (this.end - center) * scale;

  this.setRange(newStart, newEnd);
};

/**
 * Move the range with a given delta to the left or right. Start and end
 * value will be adjusted. For example, try delta = 0.1 or -0.1
 * @param {Number}  delta     Moving amount. Positive value will move right,
 *                            negative value will move left
 */
Range.prototype.move = function(delta) {
  // zoom start Date and end Date relative to the centerDate
  var diff = (this.end - this.start);

  // apply new values
  var newStart = this.start + diff * delta;
  var newEnd = this.end + diff * delta;

  // TODO: reckon with min and max range

  this.start = newStart;
  this.end = newEnd;
};

/**
 * Move the range to a new center point
 * @param {Number} moveTo      New center point of the range
 */
Range.prototype.moveTo = function(moveTo) {
  var center = (this.start + this.end) / 2;

  var diff = center - moveTo;

  // calculate new start and end
  var newStart = this.start - diff;
  var newEnd = this.end - diff;

  this.setRange(newStart, newEnd);
};

/**
 * Prototype for visual components
 */
function Component () {
  this.id = null;
  this.parent = null;
  this.childs = null;
  this.options = null;

  this.top = 0;
  this.left = 0;
  this.width = 0;
  this.height = 0;
}

// Turn the Component into an event emitter
Emitter(Component.prototype);

/**
 * Set parameters for the frame. Parameters will be merged in current parameter
 * set.
 * @param {Object} options  Available parameters:
 *                          {String | function} [className]
 *                          {String | Number | function} [left]
 *                          {String | Number | function} [top]
 *                          {String | Number | function} [width]
 *                          {String | Number | function} [height]
 */
Component.prototype.setOptions = function setOptions(options) {
  if (options) {
    util.extend(this.options, options);

    this.repaint();
  }
};

/**
 * Get an option value by name
 * The function will first check this.options object, and else will check
 * this.defaultOptions.
 * @param {String} name
 * @return {*} value
 */
Component.prototype.getOption = function getOption(name) {
  var value;
  if (this.options) {
    value = this.options[name];
  }
  if (value === undefined && this.defaultOptions) {
    value = this.defaultOptions[name];
  }
  return value;
};

/**
 * Get the frame element of the component, the outer HTML DOM element.
 * @returns {HTMLElement | null} frame
 */
Component.prototype.getFrame = function getFrame() {
  // should be implemented by the component
  return null;
};

/**
 * Repaint the component
 * @return {boolean} Returns true if the component is resized
 */
Component.prototype.repaint = function repaint() {
  // should be implemented by the component
  return false;
};

/**
 * Test whether the component is resized since the last time _isResized() was
 * called.
 * @return {Boolean} Returns true if the component is resized
 * @protected
 */
Component.prototype._isResized = function _isResized() {
  var resized = (this._previousWidth !== this.width || this._previousHeight !== this.height);

  this._previousWidth = this.width;
  this._previousHeight = this.height;

  return resized;
};

/**
 * A panel can contain components
 * @param {Object} [options]    Available parameters:
 *                              {String | Number | function} [left]
 *                              {String | Number | function} [top]
 *                              {String | Number | function} [width]
 *                              {String | Number | function} [height]
 *                              {String | function} [className]
 * @constructor Panel
 * @extends Component
 */
function Panel(options) {
  this.id = util.randomUUID();
  this.parent = null;
  this.childs = [];

  this.options = options || {};

  // create frame
  this.frame = (typeof document !== 'undefined') ? document.createElement('div') : null;
}

Panel.prototype = new Component();

/**
 * Set options. Will extend the current options.
 * @param {Object} [options]    Available parameters:
 *                              {String | function} [className]
 *                              {String | Number | function} [left]
 *                              {String | Number | function} [top]
 *                              {String | Number | function} [width]
 *                              {String | Number | function} [height]
 */
Panel.prototype.setOptions = Component.prototype.setOptions;

/**
 * Get the outer frame of the panel
 * @returns {HTMLElement} frame
 */
Panel.prototype.getFrame = function () {
  return this.frame;
};

/**
 * Append a child to the panel
 * @param {Component} child
 */
Panel.prototype.appendChild = function (child) {
  this.childs.push(child);
  child.parent = this;

  // attach to the DOM
  var frame = child.getFrame();
  if (frame) {
    if (frame.parentNode) {
      frame.parentNode.removeChild(frame);
    }
    this.frame.appendChild(frame);
  }
};

/**
 * Insert a child to the panel
 * @param {Component} child
 * @param {Component} beforeChild
 */
Panel.prototype.insertBefore = function (child, beforeChild) {
  var index = this.childs.indexOf(beforeChild);
  if (index != -1) {
    this.childs.splice(index, 0, child);
    child.parent = this;

    // attach to the DOM
    var frame = child.getFrame();
    if (frame) {
      if (frame.parentNode) {
        frame.parentNode.removeChild(frame);
      }

      var beforeFrame = beforeChild.getFrame();
      if (beforeFrame) {
        this.frame.insertBefore(frame, beforeFrame);
      }
      else {
        this.frame.appendChild(frame);
      }
    }
  }
};

/**
 * Remove a child from the panel
 * @param {Component} child
 */
Panel.prototype.removeChild = function (child) {
  var index = this.childs.indexOf(child);
  if (index != -1) {
    this.childs.splice(index, 1);
    child.parent = null;

    // remove from the DOM
    var frame = child.getFrame();
    if (frame && frame.parentNode) {
      this.frame.removeChild(frame);
    }
  }
};

/**
 * Test whether the panel contains given child
 * @param {Component} child
 */
Panel.prototype.hasChild = function (child) {
  var index = this.childs.indexOf(child);
  return (index != -1);
};

/**
 * Repaint the component
 * @return {boolean} Returns true if the component was resized since previous repaint
 */
Panel.prototype.repaint = function () {
  var asString = util.option.asString,
      options = this.options,
      frame = this.getFrame();

  // update className
  frame.className = 'vpanel' + (options.className ? (' ' + asString(options.className)) : '');

  // repaint the child components
  var childsResized = this._repaintChilds();

  // update frame size
  this._updateSize();

  return this._isResized() || childsResized;
};

/**
 * Repaint all childs of the panel
 * @return {boolean} Returns true if the component is resized
 * @private
 */
Panel.prototype._repaintChilds = function () {
  var resized = false;
  for (var i = 0, ii = this.childs.length; i < ii; i++) {
    resized = this.childs[i].repaint() || resized;
  }
  return resized;
};

/**
 * Apply the size from options to the panel, and recalculate it's actual size.
 * @private
 */
Panel.prototype._updateSize = function () {
  // apply size
  this.frame.style.top    = util.option.asSize(this.options.top);
  this.frame.style.bottom = util.option.asSize(this.options.bottom);
  this.frame.style.left   = util.option.asSize(this.options.left);
  this.frame.style.right  = util.option.asSize(this.options.right);
  this.frame.style.width  = util.option.asSize(this.options.width, '100%');
  this.frame.style.height = util.option.asSize(this.options.height, '');

  // get actual size
  this.top    = this.frame.offsetTop;
  this.left   = this.frame.offsetLeft;
  this.width  = this.frame.offsetWidth;
  this.height = this.frame.offsetHeight;
};

/**
 * A root panel can hold components. The root panel must be initialized with
 * a DOM element as container.
 * @param {HTMLElement} container
 * @param {Object} [options]    Available parameters: see RootPanel.setOptions.
 * @constructor RootPanel
 * @extends Panel
 */
function RootPanel(container, options) {
  this.id = util.randomUUID();
  this.container = container;

  this.options = options || {};
  this.defaultOptions = {
    autoResize: true
  };

  // create the HTML DOM
  this._create();

  // attach the root panel to the provided container
  if (!this.container) throw new Error('Cannot repaint root panel: no container attached');
  this.container.appendChild(this.getFrame());


  this._initWatch();
}

RootPanel.prototype = new Panel();

/**
 * Create the HTML DOM for the root panel
 */
RootPanel.prototype._create = function _create() {
  // create frame
  this.frame = document.createElement('div');

  // create event listeners for all interesting events, these events will be
  // emitted via emitter
  this.hammer = Hammer(this.frame, {
    prevent_default: true
  });
  this.listeners = {};

  var me = this;
  var events = [
    'touch', 'pinch', 'tap', 'doubletap', 'hold',
    'dragstart', 'drag', 'dragend',
    'mousewheel', 'DOMMouseScroll' // DOMMouseScroll is for Firefox
  ];
  events.forEach(function (event) {
    var listener = function () {
      var args = [event].concat(Array.prototype.slice.call(arguments, 0));
      me.emit.apply(me, args);
    };
    me.hammer.on(event, listener);
    me.listeners[event] = listener;
  });
};

/**
 * Set options. Will extend the current options.
 * @param {Object} [options]    Available parameters:
 *                              {String | function} [className]
 *                              {String | Number | function} [left]
 *                              {String | Number | function} [top]
 *                              {String | Number | function} [width]
 *                              {String | Number | function} [height]
 *                              {Boolean | function} [autoResize]
 */
RootPanel.prototype.setOptions = function setOptions(options) {
  if (options) {
    util.extend(this.options, options);

    this.repaint();

    this._initWatch();
  }
};

/**
 * Get the frame of the root panel
 */
RootPanel.prototype.getFrame = function getFrame() {
  return this.frame;
};

/**
 * Repaint the root panel
 */
RootPanel.prototype.repaint = function repaint() {
  // update class name
  var options = this.options;
  var editable = options.editable.updateTime || options.editable.updateGroup;
  var className = 'vis timeline rootpanel ' + options.orientation + (editable ? ' editable' : '');
  if (options.className) className += ' ' + util.option.asString(className);
  this.frame.className = className;

  // repaint the child components
  var childsResized = this._repaintChilds();

  // update frame size
  this.frame.style.maxHeight = util.option.asSize(this.options.maxHeight, '');
  this._updateSize();

  // if the root panel or any of its childs is resized, repaint again,
  // as other components may need to be resized accordingly
  var resized = this._isResized() || childsResized;
  if (resized) {
    setTimeout(this.repaint.bind(this), 0);
  }
};

/**
 * Initialize watching when option autoResize is true
 * @private
 */
RootPanel.prototype._initWatch = function _initWatch() {
  var autoResize = this.getOption('autoResize');
  if (autoResize) {
    this._watch();
  }
  else {
    this._unwatch();
  }
};

/**
 * Watch for changes in the size of the frame. On resize, the Panel will
 * automatically redraw itself.
 * @private
 */
RootPanel.prototype._watch = function _watch() {
  var me = this;

  this._unwatch();

  var checkSize = function checkSize() {
    var autoResize = me.getOption('autoResize');
    if (!autoResize) {
      // stop watching when the option autoResize is changed to false
      me._unwatch();
      return;
    }

    if (me.frame) {
      // check whether the frame is resized
      if ((me.frame.clientWidth != me.lastWidth) ||
          (me.frame.clientHeight != me.lastHeight)) {
        me.lastWidth = me.frame.clientWidth;
        me.lastHeight = me.frame.clientHeight;
        me.repaint();
        // TODO: emit a resize event instead?
      }
    }
  };

  // TODO: automatically cleanup the event listener when the frame is deleted
  util.addEventListener(window, 'resize', checkSize);

  this.watchTimer = setInterval(checkSize, 1000);
};

/**
 * Stop watching for a resize of the frame.
 * @private
 */
RootPanel.prototype._unwatch = function _unwatch() {
  if (this.watchTimer) {
    clearInterval(this.watchTimer);
    this.watchTimer = undefined;
  }

  // TODO: remove event listener on window.resize
};

/**
 * A horizontal time axis
 * @param {Object} [options]        See TimeAxis.setOptions for the available
 *                                  options.
 * @constructor TimeAxis
 * @extends Component
 */
function TimeAxis (options) {
  this.id = util.randomUUID();

  this.dom = {
    majorLines: [],
    majorTexts: [],
    minorLines: [],
    minorTexts: [],
    redundant: {
      majorLines: [],
      majorTexts: [],
      minorLines: [],
      minorTexts: []
    }
  };
  this.props = {
    range: {
      start: 0,
      end: 0,
      minimumStep: 0
    },
    lineTop: 0
  };

  this.options = options || {};
  this.defaultOptions = {
    orientation: 'bottom',  // supported: 'top', 'bottom'
    // TODO: implement timeaxis orientations 'left' and 'right'
    showMinorLabels: true,
    showMajorLabels: true
  };

  this.range = null;

  // create the HTML DOM
  this._create();
}

TimeAxis.prototype = new Component();

// TODO: comment options
TimeAxis.prototype.setOptions = Component.prototype.setOptions;

/**
 * Create the HTML DOM for the TimeAxis
 */
TimeAxis.prototype._create = function _create() {
  this.frame = document.createElement('div');
};

/**
 * Set a range (start and end)
 * @param {Range | Object} range  A Range or an object containing start and end.
 */
TimeAxis.prototype.setRange = function (range) {
  if (!(range instanceof Range) && (!range || !range.start || !range.end)) {
    throw new TypeError('Range must be an instance of Range, ' +
        'or an object containing start and end.');
  }
  this.range = range;
};

/**
 * Get the outer frame of the time axis
 * @return {HTMLElement} frame
 */
TimeAxis.prototype.getFrame = function getFrame() {
  return this.frame;
};

/**
 * Repaint the component
 * @return {boolean} Returns true if the component is resized
 */
TimeAxis.prototype.repaint = function () {
  var asSize = util.option.asSize,
      options = this.options,
      props = this.props,
      frame = this.frame;

  // update classname
  frame.className = 'timeaxis'; // TODO: add className from options if defined

  var parent = frame.parentNode;
  if (parent) {
    // calculate character width and height
    this._calculateCharSize();

    // TODO: recalculate sizes only needed when parent is resized or options is changed
    var orientation = this.getOption('orientation'),
        showMinorLabels = this.getOption('showMinorLabels'),
        showMajorLabels = this.getOption('showMajorLabels');

    // determine the width and height of the elemens for the axis
    var parentHeight = this.parent.height;
    props.minorLabelHeight = showMinorLabels ? props.minorCharHeight : 0;
    props.majorLabelHeight = showMajorLabels ? props.majorCharHeight : 0;
    this.height = props.minorLabelHeight + props.majorLabelHeight;
    this.width = frame.offsetWidth; // TODO: only update the width when the frame is resized?

    props.minorLineHeight = parentHeight + props.minorLabelHeight;
    props.minorLineWidth = 1; // TODO: really calculate width
    props.majorLineHeight = parentHeight + this.height;
    props.majorLineWidth = 1; // TODO: really calculate width

    //  take frame offline while updating (is almost twice as fast)
    var beforeChild = frame.nextSibling;
    parent.removeChild(frame);

    // TODO: top/bottom positioning should be determined by options set in the Timeline, not here
    if (orientation == 'top') {
      frame.style.top = '0';
      frame.style.left = '0';
      frame.style.bottom = '';
      frame.style.width = asSize(options.width, '100%');
      frame.style.height = this.height + 'px';
    }
    else { // bottom
      frame.style.top = '';
      frame.style.bottom = '0';
      frame.style.left = '0';
      frame.style.width = asSize(options.width, '100%');
      frame.style.height = this.height + 'px';
    }

    this._repaintLabels();

    this._repaintLine();

    // put frame online again
    if (beforeChild) {
      parent.insertBefore(frame, beforeChild);
    }
    else {
      parent.appendChild(frame)
    }
  }

  return this._isResized();
};

/**
 * Repaint major and minor text labels and vertical grid lines
 * @private
 */
TimeAxis.prototype._repaintLabels = function () {
  var orientation = this.getOption('orientation');

  // calculate range and step (step such that we have space for 7 characters per label)
  var start = util.convert(this.range.start, 'Number'),
      end = util.convert(this.range.end, 'Number'),
      minimumStep = this.options.toTime((this.props.minorCharWidth || 10) * 7).valueOf()
          -this.options.toTime(0).valueOf();
  var step = new TimeStep(new Date(start), new Date(end), minimumStep);
  this.step = step;

  // Move all DOM elements to a "redundant" list, where they
  // can be picked for re-use, and clear the lists with lines and texts.
  // At the end of the function _repaintLabels, left over elements will be cleaned up
  var dom = this.dom;
  dom.redundant.majorLines = dom.majorLines;
  dom.redundant.majorTexts = dom.majorTexts;
  dom.redundant.minorLines = dom.minorLines;
  dom.redundant.minorTexts = dom.minorTexts;
  dom.majorLines = [];
  dom.majorTexts = [];
  dom.minorLines = [];
  dom.minorTexts = [];

  step.first();
  var xFirstMajorLabel = undefined;
  var max = 0;
  while (step.hasNext() && max < 1000) {
    max++;
    var cur = step.getCurrent(),
        x = this.options.toScreen(cur),
        isMajor = step.isMajor();

    // TODO: lines must have a width, such that we can create css backgrounds

    if (this.getOption('showMinorLabels')) {
      this._repaintMinorText(x, step.getLabelMinor(), orientation);
    }

    if (isMajor && this.getOption('showMajorLabels')) {
      if (x > 0) {
        if (xFirstMajorLabel == undefined) {
          xFirstMajorLabel = x;
        }
        this._repaintMajorText(x, step.getLabelMajor(), orientation);
      }
      this._repaintMajorLine(x, orientation);
    }
    else {
      this._repaintMinorLine(x, orientation);
    }

    step.next();
  }

  // create a major label on the left when needed
  if (this.getOption('showMajorLabels')) {
    var leftTime = this.options.toTime(0),
        leftText = step.getLabelMajor(leftTime),
        widthText = leftText.length * (this.props.majorCharWidth || 10) + 10; // upper bound estimation

    if (xFirstMajorLabel == undefined || widthText < xFirstMajorLabel) {
      this._repaintMajorText(0, leftText, orientation);
    }
  }

  // Cleanup leftover DOM elements from the redundant list
  util.forEach(this.dom.redundant, function (arr) {
    while (arr.length) {
      var elem = arr.pop();
      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
};

/**
 * Create a minor label for the axis at position x
 * @param {Number} x
 * @param {String} text
 * @param {String} orientation   "top" or "bottom" (default)
 * @private
 */
TimeAxis.prototype._repaintMinorText = function (x, text, orientation) {
  // reuse redundant label
  var label = this.dom.redundant.minorTexts.shift();

  if (!label) {
    // create new label
    var content = document.createTextNode('');
    label = document.createElement('div');
    label.appendChild(content);
    label.className = 'text minor';
    this.frame.appendChild(label);
  }
  this.dom.minorTexts.push(label);

  label.childNodes[0].nodeValue = text;

  if (orientation == 'top') {
    label.style.top = this.props.majorLabelHeight + 'px';
    label.style.bottom = '';
  }
  else {
    label.style.top = '';
    label.style.bottom = this.props.majorLabelHeight + 'px';
  }
  label.style.left = x + 'px';
  //label.title = title;  // TODO: this is a heavy operation
};

/**
 * Create a Major label for the axis at position x
 * @param {Number} x
 * @param {String} text
 * @param {String} orientation   "top" or "bottom" (default)
 * @private
 */
TimeAxis.prototype._repaintMajorText = function (x, text, orientation) {
  // reuse redundant label
  var label = this.dom.redundant.majorTexts.shift();

  if (!label) {
    // create label
    var content = document.createTextNode(text);
    label = document.createElement('div');
    label.className = 'text major';
    label.appendChild(content);
    this.frame.appendChild(label);
  }
  this.dom.majorTexts.push(label);

  label.childNodes[0].nodeValue = text;
  //label.title = title; // TODO: this is a heavy operation

  if (orientation == 'top') {
    label.style.top = '0px';
    label.style.bottom = '';
  }
  else {
    label.style.top = '';
    label.style.bottom = '0px';
  }
  label.style.left = x + 'px';
};

/**
 * Create a minor line for the axis at position x
 * @param {Number} x
 * @param {String} orientation   "top" or "bottom" (default)
 * @private
 */
TimeAxis.prototype._repaintMinorLine = function (x, orientation) {
  // reuse redundant line
  var line = this.dom.redundant.minorLines.shift();

  if (!line) {
    // create vertical line
    line = document.createElement('div');
    line.className = 'grid vertical minor';
    this.frame.appendChild(line);
  }
  this.dom.minorLines.push(line);

  var props = this.props;
  if (orientation == 'top') {
    line.style.top = this.props.majorLabelHeight + 'px';
    line.style.bottom = '';
  }
  else {
    line.style.top = '';
    line.style.bottom = this.props.majorLabelHeight + 'px';
  }
  line.style.height = props.minorLineHeight + 'px';
  line.style.left = (x - props.minorLineWidth / 2) + 'px';
};

/**
 * Create a Major line for the axis at position x
 * @param {Number} x
 * @param {String} orientation   "top" or "bottom" (default)
 * @private
 */
TimeAxis.prototype._repaintMajorLine = function (x, orientation) {
  // reuse redundant line
  var line = this.dom.redundant.majorLines.shift();

  if (!line) {
    // create vertical line
    line = document.createElement('DIV');
    line.className = 'grid vertical major';
    this.frame.appendChild(line);
  }
  this.dom.majorLines.push(line);

  var props = this.props;
  if (orientation == 'top') {
    line.style.top = '0px';
    line.style.bottom = '';
  }
  else {
    line.style.top = '';
    line.style.bottom = '0px';
  }
  line.style.left = (x - props.majorLineWidth / 2) + 'px';
  line.style.height = props.majorLineHeight + 'px';
};


/**
 * Repaint the horizontal line for the axis
 * @private
 */
TimeAxis.prototype._repaintLine = function() {
  var line = this.dom.line,
      frame = this.frame,
      orientation = this.getOption('orientation');

  // line before all axis elements
  if (this.getOption('showMinorLabels') || this.getOption('showMajorLabels')) {
    if (line) {
      // put this line at the end of all childs
      frame.removeChild(line);
      frame.appendChild(line);
    }
    else {
      // create the axis line
      line = document.createElement('div');
      line.className = 'grid horizontal major';
      frame.appendChild(line);
      this.dom.line = line;
    }

    if (orientation == 'top') {
      line.style.top = this.height + 'px';
      line.style.bottom = '';
    }
    else {
      line.style.top = '';
      line.style.bottom = this.height + 'px';
    }
  }
  else {
    if (line && line.parentNode) {
      line.parentNode.removeChild(line);
      delete this.dom.line;
    }
  }
};

/**
 * Determine the size of text on the axis (both major and minor axis).
 * The size is calculated only once and then cached in this.props.
 * @private
 */
TimeAxis.prototype._calculateCharSize = function () {
  // determine the char width and height on the minor axis
  if (!('minorCharHeight' in this.props)) {
    var textMinor = document.createTextNode('0');
    var measureCharMinor = document.createElement('DIV');
    measureCharMinor.className = 'text minor measure';
    measureCharMinor.appendChild(textMinor);
    this.frame.appendChild(measureCharMinor);

    this.props.minorCharHeight = measureCharMinor.clientHeight;
    this.props.minorCharWidth = measureCharMinor.clientWidth;

    this.frame.removeChild(measureCharMinor);
  }

  if (!('majorCharHeight' in this.props)) {
    var textMajor = document.createTextNode('0');
    var measureCharMajor = document.createElement('DIV');
    measureCharMajor.className = 'text major measure';
    measureCharMajor.appendChild(textMajor);
    this.frame.appendChild(measureCharMajor);

    this.props.majorCharHeight = measureCharMajor.clientHeight;
    this.props.majorCharWidth = measureCharMajor.clientWidth;

    this.frame.removeChild(measureCharMajor);
  }
};

/**
 * Snap a date to a rounded value.
 * The snap intervals are dependent on the current scale and step.
 * @param {Date} date   the date to be snapped.
 * @return {Date} snappedDate
 */
TimeAxis.prototype.snap = function snap (date) {
  return this.step.snap(date);
};

/**
 * A current time bar
 * @param {Range} range
 * @param {Object} [options]        Available parameters:
 *                                  {Boolean} [showCurrentTime]
 * @constructor CurrentTime
 * @extends Component
 */

function CurrentTime (range, options) {
  this.id = util.randomUUID();

  this.range = range;
  this.options = options || {};
  this.defaultOptions = {
    showCurrentTime: false
  };

  this._create();
}

CurrentTime.prototype = new Component();

CurrentTime.prototype.setOptions = Component.prototype.setOptions;

/**
 * Create the HTML DOM for the current time bar
 * @private
 */
CurrentTime.prototype._create = function _create () {
  var bar = document.createElement('div');
  bar.className = 'currenttime';
  bar.style.position = 'absolute';
  bar.style.top = '0px';
  bar.style.height = '100%';

  this.bar = bar;
};

/**
 * Get the frame element of the current time bar
 * @returns {HTMLElement} frame
 */
CurrentTime.prototype.getFrame = function getFrame() {
  return this.bar;
};

/**
 * Repaint the component
 * @return {boolean} Returns true if the component is resized
 */
CurrentTime.prototype.repaint = function repaint() {
  var parent = this.parent;

  var now = new Date();
  var x = this.options.toScreen(now);

  this.bar.style.left = x + 'px';
  this.bar.title = 'Current time: ' + now;

  return false;
};

/**
 * Start auto refreshing the current time bar
 */
CurrentTime.prototype.start = function start() {
  var me = this;

  function update () {
    me.stop();

    // determine interval to refresh
    var scale = me.range.conversion(me.parent.width).scale;
    var interval = 1 / scale / 10;
    if (interval < 30)   interval = 30;
    if (interval > 1000) interval = 1000;

    me.repaint();

    // start a timer to adjust for the new time
    me.currentTimeTimer = setTimeout(update, interval);
  }

  update();
};

/**
 * Stop auto refreshing the current time bar
 */
CurrentTime.prototype.stop = function stop() {
  if (this.currentTimeTimer !== undefined) {
    clearTimeout(this.currentTimeTimer);
    delete this.currentTimeTimer;
  }
};

/**
 * A custom time bar
 * @param {Object} [options]        Available parameters:
 *                                  {Boolean} [showCustomTime]
 * @constructor CustomTime
 * @extends Component
 */

function CustomTime (options) {
  this.id = util.randomUUID();

  this.options = options || {};
  this.defaultOptions = {
    showCustomTime: false
  };

  this.customTime = new Date();
  this.eventParams = {}; // stores state parameters while dragging the bar

  // create the DOM
  this._create();
}

CustomTime.prototype = new Component();

CustomTime.prototype.setOptions = Component.prototype.setOptions;

/**
 * Create the DOM for the custom time
 * @private
 */
CustomTime.prototype._create = function _create () {
  var bar = document.createElement('div');
  bar.className = 'customtime';
  bar.style.position = 'absolute';
  bar.style.top = '0px';
  bar.style.height = '100%';
  this.bar = bar;

  var drag = document.createElement('div');
  drag.style.position = 'relative';
  drag.style.top = '0px';
  drag.style.left = '-10px';
  drag.style.height = '100%';
  drag.style.width = '20px';
  bar.appendChild(drag);

  // attach event listeners
  this.hammer = Hammer(bar, {
    prevent_default: true
  });
  this.hammer.on('dragstart', this._onDragStart.bind(this));
  this.hammer.on('drag',      this._onDrag.bind(this));
  this.hammer.on('dragend',   this._onDragEnd.bind(this));
};

/**
 * Get the frame element of the custom time bar
 * @returns {HTMLElement} frame
 */
CustomTime.prototype.getFrame = function getFrame() {
  return this.bar;
};

/**
 * Repaint the component
 * @return {boolean} Returns true if the component is resized
 */
CustomTime.prototype.repaint = function () {
  var x = this.options.toScreen(this.customTime);

  this.bar.style.left = x + 'px';
  this.bar.title = 'Time: ' + this.customTime;

  return false;
};

/**
 * Set custom time.
 * @param {Date} time
 */
CustomTime.prototype.setCustomTime = function(time) {
  this.customTime = new Date(time.valueOf());
  this.repaint();
};

/**
 * Retrieve the current custom time.
 * @return {Date} customTime
 */
CustomTime.prototype.getCustomTime = function() {
  return new Date(this.customTime.valueOf());
};

/**
 * Start moving horizontally
 * @param {Event} event
 * @private
 */
CustomTime.prototype._onDragStart = function(event) {
  this.eventParams.dragging = true;
  this.eventParams.customTime = this.customTime;

  event.stopPropagation();
  event.preventDefault();
};

/**
 * Perform moving operating.
 * @param {Event} event
 * @private
 */
CustomTime.prototype._onDrag = function (event) {
  if (!this.eventParams.dragging) return;

  var deltaX = event.gesture.deltaX,
      x = this.options.toScreen(this.eventParams.customTime) + deltaX,
      time = this.options.toTime(x);

  this.setCustomTime(time);

  // fire a timechange event
  this.emit('timechange', {
    time: new Date(this.customTime.valueOf())
  });

  event.stopPropagation();
  event.preventDefault();
};

/**
 * Stop moving operating.
 * @param {event} event
 * @private
 */
CustomTime.prototype._onDragEnd = function (event) {
  if (!this.eventParams.dragging) return;

  // fire a timechanged event
  this.emit('timechanged', {
    time: new Date(this.customTime.valueOf())
  });

  event.stopPropagation();
  event.preventDefault();
};

var UNGROUPED = '__ungrouped__'; // reserved group id for ungrouped items

/**
 * An ItemSet holds a set of items and ranges which can be displayed in a
 * range. The width is determined by the parent of the ItemSet, and the height
 * is determined by the size of the items.
 * @param {Panel} backgroundPanel Panel which can be used to display the
 *                                vertical lines of box items.
 * @param {Panel} axisPanel       Panel on the axis where the dots of box-items
 *                                can be displayed.
 * @param {Panel} sidePanel      Left side panel holding labels
 * @param {Object} [options]      See ItemSet.setOptions for the available options.
 * @constructor ItemSet
 * @extends Panel
 */
function ItemSet(backgroundPanel, axisPanel, sidePanel, options) {
  this.id = util.randomUUID();

  // one options object is shared by this itemset and all its items
  this.options = options || {};
  this.backgroundPanel = backgroundPanel;
  this.axisPanel = axisPanel;
  this.sidePanel = sidePanel;
  this.itemOptions = Object.create(this.options);
  this.dom = {};
  this.hammer = null;

  var me = this;
  this.itemsData = null;    // DataSet
  this.groupsData = null;   // DataSet
  this.range = null;        // Range or Object {start: number, end: number}

  // listeners for the DataSet of the items
  this.itemListeners = {
    'add': function (event, params, senderId) {
      if (senderId != me.id) me._onAdd(params.items);
    },
    'update': function (event, params, senderId) {
      if (senderId != me.id) me._onUpdate(params.items);
    },
    'remove': function (event, params, senderId) {
      if (senderId != me.id) me._onRemove(params.items);
    }
  };

  // listeners for the DataSet of the groups
  this.groupListeners = {
    'add': function (event, params, senderId) {
      if (senderId != me.id) me._onAddGroups(params.items);
    },
    'update': function (event, params, senderId) {
      if (senderId != me.id) me._onUpdateGroups(params.items);
    },
    'remove': function (event, params, senderId) {
      if (senderId != me.id) me._onRemoveGroups(params.items);
    }
  };

  this.items = {};      // object with an Item for every data item
  this.groups = {};     // Group object for every group
  this.groupIds = [];

  this.selection = [];  // list with the ids of all selected nodes
  this.stackDirty = true; // if true, all items will be restacked on next repaint

  this.touchParams = {}; // stores properties while dragging
  // create the HTML DOM

  this._create();
}

ItemSet.prototype = new Panel();

// available item types will be registered here
ItemSet.types = {
  box: ItemBox,
  range: ItemRange,
  rangeoverflow: ItemRangeOverflow,
  point: ItemPoint
};

/**
 * Create the HTML DOM for the ItemSet
 */
ItemSet.prototype._create = function _create(){
  var frame = document.createElement('div');
  frame['timeline-itemset'] = this;
  this.frame = frame;

  // create background panel
  var background = document.createElement('div');
  background.className = 'background';
  this.backgroundPanel.frame.appendChild(background);
  this.dom.background = background;

  // create foreground panel
  var foreground = document.createElement('div');
  foreground.className = 'foreground';
  frame.appendChild(foreground);
  this.dom.foreground = foreground;

  // create axis panel
  var axis = document.createElement('div');
  axis.className = 'axis';
  this.dom.axis = axis;
  this.axisPanel.frame.appendChild(axis);

  // create labelset
  var labelSet = document.createElement('div');
  labelSet.className = 'labelset';
  this.dom.labelSet = labelSet;
  this.sidePanel.frame.appendChild(labelSet);

  // create ungrouped Group
  this._updateUngrouped();

  // attach event listeners
  // TODO: use event listeners from the rootpanel to improve performance?
  this.hammer = Hammer(frame, {
    prevent_default: true
  });
  this.hammer.on('dragstart', this._onDragStart.bind(this));
  this.hammer.on('drag',      this._onDrag.bind(this));
  this.hammer.on('dragend',   this._onDragEnd.bind(this));
};

/**
 * Set options for the ItemSet. Existing options will be extended/overwritten.
 * @param {Object} [options] The following options are available:
 *                           {String | function} [className]
 *                              class name for the itemset
 *                           {String} [type]
 *                              Default type for the items. Choose from 'box'
 *                              (default), 'point', or 'range'. The default
 *                              Style can be overwritten by individual items.
 *                           {String} align
 *                              Alignment for the items, only applicable for
 *                              ItemBox. Choose 'center' (default), 'left', or
 *                              'right'.
 *                           {String} orientation
 *                              Orientation of the item set. Choose 'top' or
 *                              'bottom' (default).
 *                           {Number} margin.axis
 *                              Margin between the axis and the items in pixels.
 *                              Default is 20.
 *                           {Number} margin.item
 *                              Margin between items in pixels. Default is 10.
 *                           {Number} padding
 *                              Padding of the contents of an item in pixels.
 *                              Must correspond with the items css. Default is 5.
 *                           {Function} snap
 *                              Function to let items snap to nice dates when
 *                              dragging items.
 */
ItemSet.prototype.setOptions = function setOptions(options) {
  Component.prototype.setOptions.call(this, options);
};

/**
 * Mark the ItemSet dirty so it will refresh everything with next repaint
 */
ItemSet.prototype.markDirty = function markDirty() {
  this.groupIds = [];
  this.stackDirty = true;
};

/**
 * Hide the component from the DOM
 */
ItemSet.prototype.hide = function hide() {
  // remove the axis with dots
  if (this.dom.axis.parentNode) {
    this.dom.axis.parentNode.removeChild(this.dom.axis);
  }

  // remove the background with vertical lines
  if (this.dom.background.parentNode) {
    this.dom.background.parentNode.removeChild(this.dom.background);
  }

  // remove the labelset containing all group labels
  if (this.dom.labelSet.parentNode) {
    this.dom.labelSet.parentNode.removeChild(this.dom.labelSet);
  }
};

/**
 * Show the component in the DOM (when not already visible).
 * @return {Boolean} changed
 */
ItemSet.prototype.show = function show() {
  // show axis with dots
  if (!this.dom.axis.parentNode) {
    this.axisPanel.frame.appendChild(this.dom.axis);
  }

  // show background with vertical lines
  if (!this.dom.background.parentNode) {
    this.backgroundPanel.frame.appendChild(this.dom.background);
  }

  // show labelset containing labels
  if (!this.dom.labelSet.parentNode) {
    this.sidePanel.frame.appendChild(this.dom.labelSet);
  }
};

/**
 * Set range (start and end).
 * @param {Range | Object} range  A Range or an object containing start and end.
 */
ItemSet.prototype.setRange = function setRange(range) {
  if (!(range instanceof Range) && (!range || !range.start || !range.end)) {
    throw new TypeError('Range must be an instance of Range, ' +
        'or an object containing start and end.');
  }
  this.range = range;
};

/**
 * Set selected items by their id. Replaces the current selection
 * Unknown id's are silently ignored.
 * @param {Array} [ids] An array with zero or more id's of the items to be
 *                      selected. If ids is an empty array, all items will be
 *                      unselected.
 */
ItemSet.prototype.setSelection = function setSelection(ids) {
  var i, ii, id, item;

  if (ids) {
    if (!Array.isArray(ids)) {
      throw new TypeError('Array expected');
    }

    // unselect currently selected items
    for (i = 0, ii = this.selection.length; i < ii; i++) {
      id = this.selection[i];
      item = this.items[id];
      if (item) item.unselect();
    }

    // select items
    this.selection = [];
    for (i = 0, ii = ids.length; i < ii; i++) {
      id = ids[i];
      item = this.items[id];
      if (item) {
        this.selection.push(id);
        item.select();
      }
    }
  }
};

/**
 * Get the selected items by their id
 * @return {Array} ids  The ids of the selected items
 */
ItemSet.prototype.getSelection = function getSelection() {
  return this.selection.concat([]);
};

/**
 * Deselect a selected item
 * @param {String | Number} id
 * @private
 */
ItemSet.prototype._deselect = function _deselect(id) {
  var selection = this.selection;
  for (var i = 0, ii = selection.length; i < ii; i++) {
    if (selection[i] == id) { // non-strict comparison!
      selection.splice(i, 1);
      break;
    }
  }
};

/**
 * Return the item sets frame
 * @returns {HTMLElement} frame
 */
ItemSet.prototype.getFrame = function getFrame() {
  return this.frame;
};

/**
 * Repaint the component
 * @return {boolean} Returns true if the component is resized
 */
ItemSet.prototype.repaint = function repaint() {
  var margin = this.options.margin,
      range = this.range,
      asSize = util.option.asSize,
      asString = util.option.asString,
      options = this.options,
      orientation = this.getOption('orientation'),
      resized = false,
      frame = this.frame;

  // TODO: document this feature to specify one margin for both item and axis distance
  if (typeof margin === 'number') {
    margin = {
      item: margin,
      axis: margin
    };
  }

  // update className
  frame.className = 'itemset' + (options.className ? (' ' + asString(options.className)) : '');

  // reorder the groups (if needed)
  resized = this._orderGroups() || resized;

  // check whether zoomed (in that case we need to re-stack everything)
  // TODO: would be nicer to get this as a trigger from Range
  var visibleInterval = this.range.end - this.range.start;
  var zoomed = (visibleInterval != this.lastVisibleInterval) || (this.width != this.lastWidth);
  if (zoomed) this.stackDirty = true;
  this.lastVisibleInterval = visibleInterval;
  this.lastWidth = this.width;

  // repaint all groups
  var restack = this.stackDirty,
      firstGroup = this._firstGroup(),
      firstMargin = {
        item: margin.item,
        axis: margin.axis
      },
      nonFirstMargin = {
        item: margin.item,
        axis: margin.item / 2
      },
      height = 0,
      minHeight = margin.axis + margin.item;
  util.forEach(this.groups, function (group) {
    var groupMargin = (group == firstGroup) ? firstMargin : nonFirstMargin;
    resized = group.repaint(range, groupMargin, restack) || resized;
    height += group.height;
  });
  height = Math.max(height, minHeight);
  this.stackDirty = false;

  // reposition frame
  frame.style.left    = asSize(options.left, '');
  frame.style.right   = asSize(options.right, '');
  frame.style.top     = asSize((orientation == 'top') ? '0' : '');
  frame.style.bottom  = asSize((orientation == 'top') ? '' : '0');
  frame.style.width   = asSize(options.width, '100%');
  frame.style.height  = asSize(height);
  //frame.style.height  = asSize('height' in options ? options.height : height); // TODO: reckon with height

  // calculate actual size and position
  this.top = frame.offsetTop;
  this.left = frame.offsetLeft;
  this.width = frame.offsetWidth;
  this.height = height;

  // reposition axis
  this.dom.axis.style.left   = asSize(options.left, '0');
  this.dom.axis.style.right  = asSize(options.right, '');
  this.dom.axis.style.width  = asSize(options.width, '100%');
  this.dom.axis.style.height = asSize(0);
  this.dom.axis.style.top    = asSize((orientation == 'top') ? '0' : '');
  this.dom.axis.style.bottom = asSize((orientation == 'top') ? '' : '0');

  // check if this component is resized
  resized = this._isResized() || resized;

  return resized;
};

/**
 * Get the first group, aligned with the axis
 * @return {Group | null} firstGroup
 * @private
 */
ItemSet.prototype._firstGroup = function _firstGroup() {
  var firstGroupIndex = (this.options.orientation == 'top') ? 0 : (this.groupIds.length - 1);
  var firstGroupId = this.groupIds[firstGroupIndex];
  var firstGroup = this.groups[firstGroupId] || this.groups[UNGROUPED];

  return firstGroup || null;
};

/**
 * Create or delete the group holding all ungrouped items. This group is used when
 * there are no groups specified.
 * @protected
 */
ItemSet.prototype._updateUngrouped = function _updateUngrouped() {
  var ungrouped = this.groups[UNGROUPED];

  if (this.groupsData) {
    // remove the group holding all ungrouped items
    if (ungrouped) {
      ungrouped.hide();
      delete this.groups[UNGROUPED];
    }
  }
  else {
    // create a group holding all (unfiltered) items
    if (!ungrouped) {
      var id = null;
      var data = null;
      ungrouped = new Group(id, data, this);
      this.groups[UNGROUPED] = ungrouped;

      for (var itemId in this.items) {
        if (this.items.hasOwnProperty(itemId)) {
          ungrouped.add(this.items[itemId]);
        }
      }

      ungrouped.show();
    }
  }
};

/**
 * Get the foreground container element
 * @return {HTMLElement} foreground
 */
ItemSet.prototype.getForeground = function getForeground() {
  return this.dom.foreground;
};

/**
 * Get the background container element
 * @return {HTMLElement} background
 */
ItemSet.prototype.getBackground = function getBackground() {
  return this.dom.background;
};

/**
 * Get the axis container element
 * @return {HTMLElement} axis
 */
ItemSet.prototype.getAxis = function getAxis() {
  return this.dom.axis;
};

/**
 * Get the element for the labelset
 * @return {HTMLElement} labelSet
 */
ItemSet.prototype.getLabelSet = function getLabelSet() {
  return this.dom.labelSet;
};

/**
 * Set items
 * @param {vis.DataSet | null} items
 */
ItemSet.prototype.setItems = function setItems(items) {
  var me = this,
      ids,
      oldItemsData = this.itemsData;

  // replace the dataset
  if (!items) {
    this.itemsData = null;
  }
  else if (items instanceof DataSet || items instanceof DataView) {
    this.itemsData = items;
  }
  else {
    throw new TypeError('Data must be an instance of DataSet or DataView');
  }

  if (oldItemsData) {
    // unsubscribe from old dataset
    util.forEach(this.itemListeners, function (callback, event) {
      oldItemsData.unsubscribe(event, callback);
    });

    // remove all drawn items
    ids = oldItemsData.getIds();
    this._onRemove(ids);
  }

  if (this.itemsData) {
    // subscribe to new dataset
    var id = this.id;
    util.forEach(this.itemListeners, function (callback, event) {
      me.itemsData.on(event, callback, id);
    });

    // add all new items
    ids = this.itemsData.getIds();
    this._onAdd(ids);

    // update the group holding all ungrouped items
    this._updateUngrouped();
  }
};

/**
 * Get the current items
 * @returns {vis.DataSet | null}
 */
ItemSet.prototype.getItems = function getItems() {
  return this.itemsData;
};

/**
 * Set groups
 * @param {vis.DataSet} groups
 */
ItemSet.prototype.setGroups = function setGroups(groups) {
  var me = this,
      ids;

  // unsubscribe from current dataset
  if (this.groupsData) {
    util.forEach(this.groupListeners, function (callback, event) {
      me.groupsData.unsubscribe(event, callback);
    });

    // remove all drawn groups
    ids = this.groupsData.getIds();
    this._onRemoveGroups(ids);
  }

  // replace the dataset
  if (!groups) {
    this.groupsData = null;
  }
  else if (groups instanceof DataSet || groups instanceof DataView) {
    this.groupsData = groups;
  }
  else {
    throw new TypeError('Data must be an instance of DataSet or DataView');
  }

  if (this.groupsData) {
    // subscribe to new dataset
    var id = this.id;
    util.forEach(this.groupListeners, function (callback, event) {
      me.groupsData.on(event, callback, id);
    });

    // draw all ms
    ids = this.groupsData.getIds();
    this._onAddGroups(ids);
  }

  // update the group holding all ungrouped items
  this._updateUngrouped();

  // update the order of all items in each group
  this._order();

  this.emit('change');
};

/**
 * Get the current groups
 * @returns {vis.DataSet | null} groups
 */
ItemSet.prototype.getGroups = function getGroups() {
  return this.groupsData;
};

/**
 * Remove an item by its id
 * @param {String | Number} id
 */
ItemSet.prototype.removeItem = function removeItem (id) {
  var item = this.itemsData.get(id),
      dataset = this._myDataSet();

  if (item) {
    // confirm deletion
    this.options.onRemove(item, function (item) {
      if (item) {
        // remove by id here, it is possible that an item has no id defined
        // itself, so better not delete by the item itself
        dataset.remove(id);
      }
    });
  }
};

/**
 * Handle updated items
 * @param {Number[]} ids
 * @protected
 */
ItemSet.prototype._onUpdate = function _onUpdate(ids) {
  var me = this,
      items = this.items,
      itemOptions = this.itemOptions;

  ids.forEach(function (id) {
    var itemData = me.itemsData.get(id),
        item = items[id],
        type = itemData.type ||
            (itemData.start && itemData.end && 'range') ||
            me.options.type ||
            'box';

    var constructor = ItemSet.types[type];

    if (item) {
      // update item
      if (!constructor || !(item instanceof constructor)) {
        // item type has changed, delete the item and recreate it
        me._removeItem(item);
        item = null;
      }
      else {
        me._updateItem(item, itemData);
      }
    }

    if (!item) {
      // create item
      if (constructor) {
        item = new constructor(itemData, me.options, itemOptions);
        item.id = id; // TODO: not so nice setting id afterwards
        me._addItem(item);
      }
      else {
        throw new TypeError('Unknown item type "' + type + '"');
      }
    }
  });

  this._order();
  this.stackDirty = true; // force re-stacking of all items next repaint
  this.emit('change');
};

/**
 * Handle added items
 * @param {Number[]} ids
 * @protected
 */
ItemSet.prototype._onAdd = ItemSet.prototype._onUpdate;

/**
 * Handle removed items
 * @param {Number[]} ids
 * @protected
 */
ItemSet.prototype._onRemove = function _onRemove(ids) {
  var count = 0;
  var me = this;
  ids.forEach(function (id) {
    var item = me.items[id];
    if (item) {
      count++;
      me._removeItem(item);
    }
  });

  if (count) {
    // update order
    this._order();
    this.stackDirty = true; // force re-stacking of all items next repaint
    this.emit('change');
  }
};

/**
 * Update the order of item in all groups
 * @private
 */
ItemSet.prototype._order = function _order() {
  // reorder the items in all groups
  // TODO: optimization: only reorder groups affected by the changed items
  util.forEach(this.groups, function (group) {
    group.order();
  });
};

/**
 * Handle updated groups
 * @param {Number[]} ids
 * @private
 */
ItemSet.prototype._onUpdateGroups = function _onUpdateGroups(ids) {
  this._onAddGroups(ids);
};

/**
 * Handle changed groups
 * @param {Number[]} ids
 * @private
 */
ItemSet.prototype._onAddGroups = function _onAddGroups(ids) {
  var me = this;

  ids.forEach(function (id) {
    var groupData = me.groupsData.get(id);
    var group = me.groups[id];

    if (!group) {
      // check for reserved ids
      if (id == UNGROUPED) {
        throw new Error('Illegal group id. ' + id + ' is a reserved id.');
      }

      var groupOptions = Object.create(me.options);
      util.extend(groupOptions, {
        height: null
      });

      group = new Group(id, groupData, me);
      me.groups[id] = group;

      // add items with this groupId to the new group
      for (var itemId in me.items) {
        if (me.items.hasOwnProperty(itemId)) {
          var item = me.items[itemId];
          if (item.data.group == id) {
            group.add(item);
          }
        }
      }

      group.order();
      group.show();
    }
    else {
      // update group
      group.setData(groupData);
    }
  });

  this.emit('change');
};

/**
 * Handle removed groups
 * @param {Number[]} ids
 * @private
 */
ItemSet.prototype._onRemoveGroups = function _onRemoveGroups(ids) {
  var groups = this.groups;
  ids.forEach(function (id) {
    var group = groups[id];

    if (group) {
      group.hide();
      delete groups[id];
    }
  });

  this.markDirty();

  this.emit('change');
};

/**
 * Reorder the groups if needed
 * @return {boolean} changed
 * @private
 */
ItemSet.prototype._orderGroups = function () {
  if (this.groupsData) {
    // reorder the groups
    var groupIds = this.groupsData.getIds({
      order: this.options.groupOrder
    });

    var changed = !util.equalArray(groupIds, this.groupIds);
    if (changed) {
      // hide all groups, removes them from the DOM
      var groups = this.groups;
      groupIds.forEach(function (groupId) {
        var group = groups[groupId];
        group.hide();
      });

      // show the groups again, attach them to the DOM in correct order
      groupIds.forEach(function (groupId) {
        groups[groupId].show();
      });

      this.groupIds = groupIds;
    }

    return changed;
  }
  else {
    return false;
  }
};

/**
 * Add a new item
 * @param {Item} item
 * @private
 */
ItemSet.prototype._addItem = function _addItem(item) {
  this.items[item.id] = item;

  // add to group
  var groupId = this.groupsData ? item.data.group : UNGROUPED;
  var group = this.groups[groupId];
  if (group) group.add(item);
};

/**
 * Update an existing item
 * @param {Item} item
 * @param {Object} itemData
 * @private
 */
ItemSet.prototype._updateItem = function _updateItem(item, itemData) {
  var oldGroupId = item.data.group;

  item.data = itemData;
  if (item.displayed) {
    item.repaint();
  }

  // update group
  if (oldGroupId != item.data.group) {
    var oldGroup = this.groups[oldGroupId];
    if (oldGroup) oldGroup.remove(item);

    var groupId = this.groupsData ? item.data.group : UNGROUPED;
    var group = this.groups[groupId];
    if (group) group.add(item);
  }
};

/**
 * Delete an item from the ItemSet: remove it from the DOM, from the map
 * with items, and from the map with visible items, and from the selection
 * @param {Item} item
 * @private
 */
ItemSet.prototype._removeItem = function _removeItem(item) {
  // remove from DOM
  item.hide();

  // remove from items
  delete this.items[item.id];

  // remove from selection
  var index = this.selection.indexOf(item.id);
  if (index != -1) this.selection.splice(index, 1);

  // remove from group
  var groupId = this.groupsData ? item.data.group : UNGROUPED;
  var group = this.groups[groupId];
  if (group) group.remove(item);
};

/**
 * Create an array containing all items being a range (having an end date)
 * @param array
 * @returns {Array}
 * @private
 */
ItemSet.prototype._constructByEndArray = function _constructByEndArray(array) {
  var endArray = [];

  for (var i = 0; i < array.length; i++) {
    if (array[i] instanceof ItemRange) {
      endArray.push(array[i]);
    }
  }
  return endArray;
};

/**
 * Get the width of the group labels
 * @return {Number} width
 */
ItemSet.prototype.getLabelsWidth = function getLabelsWidth() {
  var width = 0;

  util.forEach(this.groups, function (group) {
    width = Math.max(width, group.getLabelWidth());
  });

  return width;
};

/**
 * Get the height of the itemsets background
 * @return {Number} height
 */
ItemSet.prototype.getBackgroundHeight = function getBackgroundHeight() {
  return this.height;
};

/**
 * Start dragging the selected events
 * @param {Event} event
 * @private
 */
ItemSet.prototype._onDragStart = function (event) {
  if (!this.options.editable.updateTime && !this.options.editable.updateGroup) {
    return;
  }

  var item = ItemSet.itemFromTarget(event),
      me = this,
      props;

  if (item && item.selected) {
    var dragLeftItem = event.target.dragLeftItem;
    var dragRightItem = event.target.dragRightItem;

    if (dragLeftItem) {
      props = {
        item: dragLeftItem
      };

      if (me.options.editable.updateTime) {
        props.start = item.data.start.valueOf();
      }
      if (me.options.editable.updateGroup) {
        if ('group' in item.data) props.group = item.data.group;
      }

      this.touchParams.itemProps = [props];
    }
    else if (dragRightItem) {
      props = {
        item: dragRightItem
      };

      if (me.options.editable.updateTime) {
        props.end = item.data.end.valueOf();
      }
      if (me.options.editable.updateGroup) {
        if ('group' in item.data) props.group = item.data.group;
      }

      this.touchParams.itemProps = [props];
    }
    else {
      this.touchParams.itemProps = this.getSelection().map(function (id) {
        var item = me.items[id];
        var props = {
          item: item
        };

        if (me.options.editable.updateTime) {
          if ('start' in item.data) props.start = item.data.start.valueOf();
          if ('end' in item.data)   props.end = item.data.end.valueOf();
        }
        if (me.options.editable.updateGroup) {
          if ('group' in item.data) props.group = item.data.group;
        }

        return props;
      });
    }

    event.stopPropagation();
  }
};

/**
 * Drag selected items
 * @param {Event} event
 * @private
 */
ItemSet.prototype._onDrag = function (event) {
  if (this.touchParams.itemProps) {
    var snap = this.options.snap || null,
        deltaX = event.gesture.deltaX,
        scale = (this.width / (this.range.end - this.range.start)),
        offset = deltaX / scale;

    // move
    this.touchParams.itemProps.forEach(function (props) {
      if ('start' in props) {
        var start = new Date(props.start + offset);
        props.item.data.start = snap ? snap(start) : start;
      }

      if ('end' in props) {
        var end = new Date(props.end + offset);
        props.item.data.end = snap ? snap(end) : end;
      }

      if ('group' in props) {
        // drag from one group to another
        var group = ItemSet.groupFromTarget(event);
        if (group && group.groupId != props.item.data.group) {
          var oldGroup = props.item.parent;
          oldGroup.remove(props.item);
          oldGroup.order();
          group.add(props.item);
          group.order();

          props.item.data.group = group.groupId;
        }
      }
    });

    // TODO: implement onMoving handler

    this.stackDirty = true; // force re-stacking of all items next repaint
    this.emit('change');

    event.stopPropagation();
  }
};

/**
 * End of dragging selected items
 * @param {Event} event
 * @private
 */
ItemSet.prototype._onDragEnd = function (event) {
  if (this.touchParams.itemProps) {
    // prepare a change set for the changed items
    var changes = [],
        me = this,
        dataset = this._myDataSet();

    this.touchParams.itemProps.forEach(function (props) {
      var id = props.item.id,
          itemData = me.itemsData.get(id);

      var changed = false;
      if ('start' in props.item.data) {
        changed = (props.start != props.item.data.start.valueOf());
        itemData.start = util.convert(props.item.data.start, dataset.convert['start']);
      }
      if ('end' in props.item.data) {
        changed = changed  || (props.end != props.item.data.end.valueOf());
        itemData.end = util.convert(props.item.data.end, dataset.convert['end']);
      }
      if ('group' in props.item.data) {
        changed = changed  || (props.group != props.item.data.group);
        itemData.group = props.item.data.group;
      }

      // only apply changes when start or end is actually changed
      if (changed) {
        me.options.onMove(itemData, function (itemData) {
          if (itemData) {
            // apply changes
            itemData[dataset.fieldId] = id; // ensure the item contains its id (can be undefined)
            changes.push(itemData);
          }
          else {
            // restore original values
            if ('start' in props) props.item.data.start = props.start;
            if ('end' in props)   props.item.data.end   = props.end;

            me.stackDirty = true; // force re-stacking of all items next repaint
            me.emit('change');
          }
        });
      }
    });
    this.touchParams.itemProps = null;

    // apply the changes to the data (if there are changes)
    if (changes.length) {
      dataset.update(changes);
    }

    event.stopPropagation();
  }
};

/**
 * Find an item from an event target:
 * searches for the attribute 'timeline-item' in the event target's element tree
 * @param {Event} event
 * @return {Item | null} item
 */
ItemSet.itemFromTarget = function itemFromTarget (event) {
  var target = event.target;
  while (target) {
    if (target.hasOwnProperty('timeline-item')) {
      return target['timeline-item'];
    }
    target = target.parentNode;
  }

  return null;
};

/**
 * Find the Group from an event target:
 * searches for the attribute 'timeline-group' in the event target's element tree
 * @param {Event} event
 * @return {Group | null} group
 */
ItemSet.groupFromTarget = function groupFromTarget (event) {
  var target = event.target;
  while (target) {
    if (target.hasOwnProperty('timeline-group')) {
      return target['timeline-group'];
    }
    target = target.parentNode;
  }

  return null;
};

/**
 * Find the ItemSet from an event target:
 * searches for the attribute 'timeline-itemset' in the event target's element tree
 * @param {Event} event
 * @return {ItemSet | null} item
 */
ItemSet.itemSetFromTarget = function itemSetFromTarget (event) {
  var target = event.target;
  while (target) {
    if (target.hasOwnProperty('timeline-itemset')) {
      return target['timeline-itemset'];
    }
    target = target.parentNode;
  }

  return null;
};

/**
 * Find the DataSet to which this ItemSet is connected
 * @returns {null | DataSet} dataset
 * @private
 */
ItemSet.prototype._myDataSet = function _myDataSet() {
  // find the root DataSet
  var dataset = this.itemsData;
  while (dataset instanceof DataView) {
    dataset = dataset.data;
  }
  return dataset;
};
/**
 * @constructor Item
 * @param {Object} data             Object containing (optional) parameters type,
 *                                  start, end, content, group, className.
 * @param {Object} [options]        Options to set initial property values
 * @param {Object} [defaultOptions] default options
 *                                  // TODO: describe available options
 */
function Item (data, options, defaultOptions) {
  this.id = null;
  this.parent = null;
  this.data = data;
  this.dom = null;
  this.options = options || {};
  this.defaultOptions = defaultOptions || {};

  this.selected = false;
  this.displayed = false;
  this.dirty = true;

  this.top = null;
  this.left = null;
  this.width = null;
  this.height = null;
}

/**
 * Select current item
 */
Item.prototype.select = function select() {
  this.selected = true;
  if (this.displayed) this.repaint();
};

/**
 * Unselect current item
 */
Item.prototype.unselect = function unselect() {
  this.selected = false;
  if (this.displayed) this.repaint();
};

/**
 * Set a parent for the item
 * @param {ItemSet | Group} parent
 */
Item.prototype.setParent = function setParent(parent) {
  if (this.displayed) {
    this.hide();
    this.parent = parent;
    if (this.parent) {
      this.show();
    }
  }
  else {
    this.parent = parent;
  }
};

/**
 * Check whether this item is visible inside given range
 * @returns {{start: Number, end: Number}} range with a timestamp for start and end
 * @returns {boolean} True if visible
 */
Item.prototype.isVisible = function isVisible (range) {
  // Should be implemented by Item implementations
  return false;
};

/**
 * Show the Item in the DOM (when not already visible)
 * @return {Boolean} changed
 */
Item.prototype.show = function show() {
  return false;
};

/**
 * Hide the Item from the DOM (when visible)
 * @return {Boolean} changed
 */
Item.prototype.hide = function hide() {
  return false;
};

/**
 * Repaint the item
 */
Item.prototype.repaint = function repaint() {
  // should be implemented by the item
};

/**
 * Reposition the Item horizontally
 */
Item.prototype.repositionX = function repositionX() {
  // should be implemented by the item
};

/**
 * Reposition the Item vertically
 */
Item.prototype.repositionY = function repositionY() {
  // should be implemented by the item
};

/**
 * Repaint a delete button on the top right of the item when the item is selected
 * @param {HTMLElement} anchor
 * @protected
 */
Item.prototype._repaintDeleteButton = function (anchor) {
  if (this.selected && this.options.editable.remove && !this.dom.deleteButton) {
    // create and show button
    var me = this;

    var deleteButton = document.createElement('div');
    deleteButton.className = 'delete';
    deleteButton.title = 'Delete this item';

    Hammer(deleteButton, {
      preventDefault: true
    }).on('tap', function (event) {
      me.parent.removeFromDataSet(me);
      event.stopPropagation();
    });

    anchor.appendChild(deleteButton);
    this.dom.deleteButton = deleteButton;
  }
  else if (!this.selected && this.dom.deleteButton) {
    // remove button
    if (this.dom.deleteButton.parentNode) {
      this.dom.deleteButton.parentNode.removeChild(this.dom.deleteButton);
    }
    this.dom.deleteButton = null;
  }
};

/**
 * @constructor ItemBox
 * @extends Item
 * @param {Object} data             Object containing parameters start
 *                                  content, className.
 * @param {Object} [options]        Options to set initial property values
 * @param {Object} [defaultOptions] default options
 *                                  // TODO: describe available options
 */
function ItemBox (data, options, defaultOptions) {
  this.props = {
    dot: {
      width: 0,
      height: 0
    },
    line: {
      width: 0,
      height: 0
    }
  };

  // validate data
  if (data) {
    if (data.start == undefined) {
      throw new Error('Property "start" missing in item ' + data);
    }
  }

  Item.call(this, data, options, defaultOptions);
}

ItemBox.prototype = new Item (null);

/**
 * Check whether this item is visible inside given range
 * @returns {{start: Number, end: Number}} range with a timestamp for start and end
 * @returns {boolean} True if visible
 */
ItemBox.prototype.isVisible = function isVisible (range) {
  // determine visibility
  // TODO: account for the real width of the item. Right now we just add 1/4 to the window
  var interval = (range.end - range.start) / 4;
  return (this.data.start > range.start - interval) && (this.data.start < range.end + interval);
};

/**
 * Repaint the item
 */
ItemBox.prototype.repaint = function repaint() {
  var dom = this.dom;
  if (!dom) {
    // create DOM
    this.dom = {};
    dom = this.dom;

    // create main box
    dom.box = document.createElement('DIV');

    // contents box (inside the background box). used for making margins
    dom.content = document.createElement('DIV');
    dom.content.className = 'content';
    dom.box.appendChild(dom.content);

    // line to axis
    dom.line = document.createElement('DIV');
    dom.line.className = 'line';

    // dot on axis
    dom.dot = document.createElement('DIV');
    dom.dot.className = 'dot';

    // attach this item as attribute
    dom.box['timeline-item'] = this;
  }

  // append DOM to parent DOM
  if (!this.parent) {
    throw new Error('Cannot repaint item: no parent attached');
  }
  if (!dom.box.parentNode) {
    var foreground = this.parent.getForeground();
    if (!foreground) throw new Error('Cannot repaint time axis: parent has no foreground container element');
    foreground.appendChild(dom.box);
  }
  if (!dom.line.parentNode) {
    var background = this.parent.getBackground();
    if (!background) throw new Error('Cannot repaint time axis: parent has no background container element');
    background.appendChild(dom.line);
  }
  if (!dom.dot.parentNode) {
    var axis = this.parent.getAxis();
    if (!background) throw new Error('Cannot repaint time axis: parent has no axis container element');
    axis.appendChild(dom.dot);
  }
  this.displayed = true;

  // update contents
  if (this.data.content != this.content) {
    this.content = this.data.content;
    if (this.content instanceof Element) {
      dom.content.innerHTML = '';
      dom.content.appendChild(this.content);
    }
    else if (this.data.content != undefined) {
      dom.content.innerHTML = this.content;
    }
    else {
      throw new Error('Property "content" missing in item ' + this.data.id);
    }

    this.dirty = true;
  }

  // update class
  var className = (this.data.className? ' ' + this.data.className : '') +
      (this.selected ? ' selected' : '');
  if (this.className != className) {
    this.className = className;
    dom.box.className = 'item box' + className;
    dom.line.className = 'item line' + className;
    dom.dot.className  = 'item dot' + className;

    this.dirty = true;
  }

  // recalculate size
  if (this.dirty) {
    this.props.dot.height = dom.dot.offsetHeight;
    this.props.dot.width = dom.dot.offsetWidth;
    this.props.line.width = dom.line.offsetWidth;
    this.width = dom.box.offsetWidth;
    this.height = dom.box.offsetHeight;

    this.dirty = false;
  }

  this._repaintDeleteButton(dom.box);
};

/**
 * Show the item in the DOM (when not already displayed). The items DOM will
 * be created when needed.
 */
ItemBox.prototype.show = function show() {
  if (!this.displayed) {
    this.repaint();
  }
};

/**
 * Hide the item from the DOM (when visible)
 */
ItemBox.prototype.hide = function hide() {
  if (this.displayed) {
    var dom = this.dom;

    if (dom.box.parentNode)   dom.box.parentNode.removeChild(dom.box);
    if (dom.line.parentNode)  dom.line.parentNode.removeChild(dom.line);
    if (dom.dot.parentNode)   dom.dot.parentNode.removeChild(dom.dot);

    this.top = null;
    this.left = null;

    this.displayed = false;
  }
};

/**
 * Reposition the item horizontally
 * @Override
 */
ItemBox.prototype.repositionX = function repositionX() {
  var start = this.defaultOptions.toScreen(this.data.start),
      align = this.options.align || this.defaultOptions.align,
      left,
      box = this.dom.box,
      line = this.dom.line,
      dot = this.dom.dot;

  // calculate left position of the box
  if (align == 'right') {
    this.left = start - this.width;
  }
  else if (align == 'left') {
    this.left = start;
  }
  else {
    // default or 'center'
    this.left = start - this.width / 2;
  }

  // reposition box
  box.style.left = this.left + 'px';

  // reposition line
  line.style.left = (start - this.props.line.width / 2) + 'px';

  // reposition dot
  dot.style.left = (start - this.props.dot.width / 2) + 'px';
};

/**
 * Reposition the item vertically
 * @Override
 */
ItemBox.prototype.repositionY = function repositionY () {
  var orientation = this.options.orientation || this.defaultOptions.orientation,
      box = this.dom.box,
      line = this.dom.line,
      dot = this.dom.dot;

  if (orientation == 'top') {
    box.style.top = (this.top || 0) + 'px';
    box.style.bottom = '';

    line.style.top = '0';
    line.style.bottom = '';
    line.style.height = (this.parent.top + this.top + 1) + 'px';
  }
  else { // orientation 'bottom'
    box.style.top = '';
    box.style.bottom = (this.top || 0) + 'px';

    line.style.top = (this.parent.top + this.parent.height - this.top - 1) + 'px';
    line.style.bottom = '0';
    line.style.height = '';
  }

  dot.style.top = (-this.props.dot.height / 2) + 'px';
};

/**
 * @constructor ItemPoint
 * @extends Item
 * @param {Object} data             Object containing parameters start
 *                                  content, className.
 * @param {Object} [options]        Options to set initial property values
 * @param {Object} [defaultOptions] default options
 *                                  // TODO: describe available options
 */
function ItemPoint (data, options, defaultOptions) {
  this.props = {
    dot: {
      top: 0,
      width: 0,
      height: 0
    },
    content: {
      height: 0,
      marginLeft: 0
    }
  };

  // validate data
  if (data) {
    if (data.start == undefined) {
      throw new Error('Property "start" missing in item ' + data);
    }
  }

  Item.call(this, data, options, defaultOptions);
}

ItemPoint.prototype = new Item (null);

/**
 * Check whether this item is visible inside given range
 * @returns {{start: Number, end: Number}} range with a timestamp for start and end
 * @returns {boolean} True if visible
 */
ItemPoint.prototype.isVisible = function isVisible (range) {
  // determine visibility
  // TODO: account for the real width of the item. Right now we just add 1/4 to the window
  var interval = (range.end - range.start) / 4;
  return (this.data.start > range.start - interval) && (this.data.start < range.end + interval);
};

/**
 * Repaint the item
 */
ItemPoint.prototype.repaint = function repaint() {
  var dom = this.dom;
  if (!dom) {
    // create DOM
    this.dom = {};
    dom = this.dom;

    // background box
    dom.point = document.createElement('div');
    // className is updated in repaint()

    // contents box, right from the dot
    dom.content = document.createElement('div');
    dom.content.className = 'content';
    dom.point.appendChild(dom.content);

    // dot at start
    dom.dot = document.createElement('div');
    dom.point.appendChild(dom.dot);

    // attach this item as attribute
    dom.point['timeline-item'] = this;
  }

  // append DOM to parent DOM
  if (!this.parent) {
    throw new Error('Cannot repaint item: no parent attached');
  }
  if (!dom.point.parentNode) {
    var foreground = this.parent.getForeground();
    if (!foreground) {
      throw new Error('Cannot repaint time axis: parent has no foreground container element');
    }
    foreground.appendChild(dom.point);
  }
  this.displayed = true;

  // update contents
  if (this.data.content != this.content) {
    this.content = this.data.content;
    if (this.content instanceof Element) {
      dom.content.innerHTML = '';
      dom.content.appendChild(this.content);
    }
    else if (this.data.content != undefined) {
      dom.content.innerHTML = this.content;
    }
    else {
      throw new Error('Property "content" missing in item ' + this.data.id);
    }

    this.dirty = true;
  }

  // update class
  var className = (this.data.className? ' ' + this.data.className : '') +
      (this.selected ? ' selected' : '');
  if (this.className != className) {
    this.className = className;
    dom.point.className  = 'item point' + className;
    dom.dot.className  = 'item dot' + className;

    this.dirty = true;
  }

  // recalculate size
  if (this.dirty) {
    this.width = dom.point.offsetWidth;
    this.height = dom.point.offsetHeight;
    this.props.dot.width = dom.dot.offsetWidth;
    this.props.dot.height = dom.dot.offsetHeight;
    this.props.content.height = dom.content.offsetHeight;

    // resize contents
    dom.content.style.marginLeft = 2 * this.props.dot.width + 'px';
    //dom.content.style.marginRight = ... + 'px'; // TODO: margin right

    dom.dot.style.top = ((this.height - this.props.dot.height) / 2) + 'px';
    dom.dot.style.left = (this.props.dot.width / 2) + 'px';

    this.dirty = false;
  }

  this._repaintDeleteButton(dom.point);
};

/**
 * Show the item in the DOM (when not already visible). The items DOM will
 * be created when needed.
 */
ItemPoint.prototype.show = function show() {
  if (!this.displayed) {
    this.repaint();
  }
};

/**
 * Hide the item from the DOM (when visible)
 */
ItemPoint.prototype.hide = function hide() {
  if (this.displayed) {
    if (this.dom.point.parentNode) {
      this.dom.point.parentNode.removeChild(this.dom.point);
    }

    this.top = null;
    this.left = null;

    this.displayed = false;
  }
};

/**
 * Reposition the item horizontally
 * @Override
 */
ItemPoint.prototype.repositionX = function repositionX() {
  var start = this.defaultOptions.toScreen(this.data.start);

  this.left = start - this.props.dot.width;

  // reposition point
  this.dom.point.style.left = this.left + 'px';
};

/**
 * Reposition the item vertically
 * @Override
 */
ItemPoint.prototype.repositionY = function repositionY () {
  var orientation = this.options.orientation || this.defaultOptions.orientation,
      point = this.dom.point;

  if (orientation == 'top') {
    point.style.top = this.top + 'px';
    point.style.bottom = '';
  }
  else {
    point.style.top = '';
    point.style.bottom = this.top + 'px';
  }
};

/**
 * @constructor ItemRange
 * @extends Item
 * @param {Object} data             Object containing parameters start, end
 *                                  content, className.
 * @param {Object} [options]        Options to set initial property values
 * @param {Object} [defaultOptions] default options
 *                                  // TODO: describe available options
 */
function ItemRange (data, options, defaultOptions) {
  this.props = {
    content: {
      width: 0
    }
  };

  // validate data
  if (data) {
    if (data.start == undefined) {
      throw new Error('Property "start" missing in item ' + data.id);
    }
    if (data.end == undefined) {
      throw new Error('Property "end" missing in item ' + data.id);
    }
  }

  Item.call(this, data, options, defaultOptions);
}

ItemRange.prototype = new Item (null);

ItemRange.prototype.baseClassName = 'item range';

/**
 * Check whether this item is visible inside given range
 * @returns {{start: Number, end: Number}} range with a timestamp for start and end
 * @returns {boolean} True if visible
 */
ItemRange.prototype.isVisible = function isVisible (range) {
  // determine visibility
  return (this.data.start < range.end) && (this.data.end > range.start);
};

/**
 * Repaint the item
 */
ItemRange.prototype.repaint = function repaint() {
  var dom = this.dom;
  if (!dom) {
    // create DOM
    this.dom = {};
    dom = this.dom;

      // background box
    dom.box = document.createElement('div');
    // className is updated in repaint()

    // contents box
    dom.content = document.createElement('div');
    dom.content.className = 'content';
    dom.box.appendChild(dom.content);

    // attach this item as attribute
    dom.box['timeline-item'] = this;
  }

  // append DOM to parent DOM
  if (!this.parent) {
    throw new Error('Cannot repaint item: no parent attached');
  }
  if (!dom.box.parentNode) {
    var foreground = this.parent.getForeground();
    if (!foreground) {
      throw new Error('Cannot repaint time axis: parent has no foreground container element');
    }
    foreground.appendChild(dom.box);
  }
  this.displayed = true;

  // update contents
  if (this.data.content != this.content) {
    this.content = this.data.content;
    if (this.content instanceof Element) {
      dom.content.innerHTML = '';
      dom.content.appendChild(this.content);
    }
    else if (this.data.content != undefined) {
      dom.content.innerHTML = this.content;
    }
    else {
      throw new Error('Property "content" missing in item ' + this.data.id);
    }

    this.dirty = true;
  }

  // update class
  var className = (this.data.className ? (' ' + this.data.className) : '') +
      (this.selected ? ' selected' : '');
  if (this.className != className) {
    this.className = className;
    dom.box.className = this.baseClassName + className;

    this.dirty = true;
  }

  // recalculate size
  if (this.dirty) {
    this.props.content.width = this.dom.content.offsetWidth;
    this.height = this.dom.box.offsetHeight;

    this.dirty = false;
  }

  this._repaintDeleteButton(dom.box);
  this._repaintDragLeft();
  this._repaintDragRight();
};

/**
 * Show the item in the DOM (when not already visible). The items DOM will
 * be created when needed.
 */
ItemRange.prototype.show = function show() {
  if (!this.displayed) {
    this.repaint();
  }
};

/**
 * Hide the item from the DOM (when visible)
 * @return {Boolean} changed
 */
ItemRange.prototype.hide = function hide() {
  if (this.displayed) {
    var box = this.dom.box;

    if (box.parentNode) {
      box.parentNode.removeChild(box);
    }

    this.top = null;
    this.left = null;

    this.displayed = false;
  }
};

/**
 * Reposition the item horizontally
 * @Override
 */
ItemRange.prototype.repositionX = function repositionX() {
  var props = this.props,
      parentWidth = this.parent.width,
      start = this.defaultOptions.toScreen(this.data.start),
      end = this.defaultOptions.toScreen(this.data.end),
      padding = 'padding' in this.options ? this.options.padding : this.defaultOptions.padding,
      contentLeft;

  // limit the width of the this, as browsers cannot draw very wide divs
  if (start < -parentWidth) {
    start = -parentWidth;
  }
  if (end > 2 * parentWidth) {
    end = 2 * parentWidth;
  }

  // when range exceeds left of the window, position the contents at the left of the visible area
  if (start < 0) {
    contentLeft = Math.min(-start,
        (end - start - props.content.width - 2 * padding));
    // TODO: remove the need for options.padding. it's terrible.
  }
  else {
    contentLeft = 0;
  }

  this.left = start;
  this.width = Math.max(end - start, 1);

  this.dom.box.style.left = this.left + 'px';
  this.dom.box.style.width = this.width + 'px';
  this.dom.content.style.left = contentLeft + 'px';
};

/**
 * Reposition the item vertically
 * @Override
 */
ItemRange.prototype.repositionY = function repositionY() {
  var orientation = this.options.orientation || this.defaultOptions.orientation,
      box = this.dom.box;

  if (orientation == 'top') {
    box.style.top = this.top + 'px';
    box.style.bottom = '';
  }
  else {
    box.style.top = '';
    box.style.bottom = this.top + 'px';
  }
};

/**
 * Repaint a drag area on the left side of the range when the range is selected
 * @protected
 */
ItemRange.prototype._repaintDragLeft = function () {
  if (this.selected && this.options.editable.updateTime && !this.dom.dragLeft) {
    // create and show drag area
    var dragLeft = document.createElement('div');
    dragLeft.className = 'drag-left';
    dragLeft.dragLeftItem = this;

    // TODO: this should be redundant?
    Hammer(dragLeft, {
      preventDefault: true
    }).on('drag', function () {
          //console.log('drag left')
        });

    this.dom.box.appendChild(dragLeft);
    this.dom.dragLeft = dragLeft;
  }
  else if (!this.selected && this.dom.dragLeft) {
    // delete drag area
    if (this.dom.dragLeft.parentNode) {
      this.dom.dragLeft.parentNode.removeChild(this.dom.dragLeft);
    }
    this.dom.dragLeft = null;
  }
};

/**
 * Repaint a drag area on the right side of the range when the range is selected
 * @protected
 */
ItemRange.prototype._repaintDragRight = function () {
  if (this.selected && this.options.editable.updateTime && !this.dom.dragRight) {
    // create and show drag area
    var dragRight = document.createElement('div');
    dragRight.className = 'drag-right';
    dragRight.dragRightItem = this;

    // TODO: this should be redundant?
    Hammer(dragRight, {
      preventDefault: true
    }).on('drag', function () {
      //console.log('drag right')
    });

    this.dom.box.appendChild(dragRight);
    this.dom.dragRight = dragRight;
  }
  else if (!this.selected && this.dom.dragRight) {
    // delete drag area
    if (this.dom.dragRight.parentNode) {
      this.dom.dragRight.parentNode.removeChild(this.dom.dragRight);
    }
    this.dom.dragRight = null;
  }
};

/**
 * @constructor ItemRangeOverflow
 * @extends ItemRange
 * @param {Object} data             Object containing parameters start, end
 *                                  content, className.
 * @param {Object} [options]        Options to set initial property values
 * @param {Object} [defaultOptions] default options
 *                                  // TODO: describe available options
 */
function ItemRangeOverflow (data, options, defaultOptions) {
  this.props = {
    content: {
      left: 0,
      width: 0
    }
  };

  ItemRange.call(this, data, options, defaultOptions);
}

ItemRangeOverflow.prototype = new ItemRange (null);

ItemRangeOverflow.prototype.baseClassName = 'item rangeoverflow';

/**
 * Reposition the item horizontally
 * @Override
 */
ItemRangeOverflow.prototype.repositionX = function repositionX() {
  var parentWidth = this.parent.width,
      start = this.defaultOptions.toScreen(this.data.start),
      end = this.defaultOptions.toScreen(this.data.end),
      padding = 'padding' in this.options ? this.options.padding : this.defaultOptions.padding,
      contentLeft;

  // limit the width of the this, as browsers cannot draw very wide divs
  if (start < -parentWidth) {
    start = -parentWidth;
  }
  if (end > 2 * parentWidth) {
    end = 2 * parentWidth;
  }

  // when range exceeds left of the window, position the contents at the left of the visible area
  contentLeft = Math.max(-start, 0);

  this.left = start;
  var boxWidth = Math.max(end - start, 1);
  this.width = boxWidth + this.props.content.width;
  // Note: The calculation of width is an optimistic calculation, giving
  //       a width which will not change when moving the Timeline
  //       So no restacking needed, which is nicer for the eye

  this.dom.box.style.left = this.left + 'px';
  this.dom.box.style.width = boxWidth + 'px';
  this.dom.content.style.left = contentLeft + 'px';
};

/**
 * @constructor Group
 * @param {Number | String} groupId
 * @param {Object} data
 * @param {ItemSet} itemSet
 */
function Group (groupId, data, itemSet) {
  this.groupId = groupId;

  this.itemSet = itemSet;

  this.dom = {};
  this.props = {
    label: {
      width: 0,
      height: 0
    }
  };

  this.items = {};        // items filtered by groupId of this group
  this.visibleItems = []; // items currently visible in window
  this.orderedItems = {   // items sorted by start and by end
    byStart: [],
    byEnd: []
  };

  this._create();

  this.setData(data);
}

/**
 * Create DOM elements for the group
 * @private
 */
Group.prototype._create = function() {
  var label = document.createElement('div');
  label.className = 'vlabel';
  this.dom.label = label;

  var inner = document.createElement('div');
  inner.className = 'inner';
  label.appendChild(inner);
  this.dom.inner = inner;

  var foreground = document.createElement('div');
  foreground.className = 'group';
  foreground['timeline-group'] = this;
  this.dom.foreground = foreground;

  this.dom.background = document.createElement('div');

  this.dom.axis = document.createElement('div');
};

/**
 * Set the group data for this group
 * @param {Object} data   Group data, can contain properties content and className
 */
Group.prototype.setData = function setData(data) {
  // update contents
  var content = data && data.content;
  if (content instanceof Element) {
    this.dom.inner.appendChild(content);
  }
  else if (content != undefined) {
    this.dom.inner.innerHTML = content;
  }
  else {
    this.dom.inner.innerHTML = this.groupId;
  }

  // update className
  var className = data && data.className;
  if (className) {
    util.addClassName(this.dom.label, className);
  }
};

/**
 * Get the foreground container element
 * @return {HTMLElement} foreground
 */
Group.prototype.getForeground = function getForeground() {
  return this.dom.foreground;
};

/**
 * Get the background container element
 * @return {HTMLElement} background
 */
Group.prototype.getBackground = function getBackground() {
  return this.dom.background;
};

/**
 * Get the axis container element
 * @return {HTMLElement} axis
 */
Group.prototype.getAxis = function getAxis() {
  return this.dom.axis;
};

/**
 * Get the width of the group label
 * @return {number} width
 */
Group.prototype.getLabelWidth = function getLabelWidth() {
  return this.props.label.width;
};


/**
 * Repaint this group
 * @param {{start: number, end: number}} range
 * @param {{item: number, axis: number}} margin
 * @param {boolean} [restack=false]  Force restacking of all items
 * @return {boolean} Returns true if the group is resized
 */
Group.prototype.repaint = function repaint(range, margin, restack) {
  var resized = false;

  this.visibleItems = this._updateVisibleItems(this.orderedItems, this.visibleItems, range);

  // reposition visible items vertically
  if (this.itemSet.options.stack) { // TODO: ugly way to access options...
    stack.stack(this.visibleItems, margin, restack);
  }
  else { // no stacking
    stack.nostack(this.visibleItems, margin);
  }
  this.stackDirty = false;
  for (var i = 0, ii = this.visibleItems.length; i < ii; i++) {
    var item = this.visibleItems[i];
    item.repositionY();
  }

  // recalculate the height of the group
  var height;
  var visibleItems = this.visibleItems;
  if (visibleItems.length) {
    var min = visibleItems[0].top;
    var max = visibleItems[0].top + visibleItems[0].height;
    util.forEach(visibleItems, function (item) {
      min = Math.min(min, item.top);
      max = Math.max(max, (item.top + item.height));
    });
    height = (max - min) + margin.axis + margin.item;
  }
  else {
    height = margin.axis + margin.item;
  }
  height = Math.max(height, this.props.label.height);

  // calculate actual size and position
  var foreground = this.dom.foreground;
  this.top = foreground.offsetTop;
  this.left = foreground.offsetLeft;
  this.width = foreground.offsetWidth;
  resized = util.updateProperty(this, 'height', height) || resized;

  // recalculate size of label
  resized = util.updateProperty(this.props.label, 'width', this.dom.inner.clientWidth) || resized;
  resized = util.updateProperty(this.props.label, 'height', this.dom.inner.clientHeight) || resized;

  // apply new height
  foreground.style.height  = height + 'px';
  this.dom.label.style.height = height + 'px';

  return resized;
};

/**
 * Show this group: attach to the DOM
 */
Group.prototype.show = function show() {
  if (!this.dom.label.parentNode) {
    this.itemSet.getLabelSet().appendChild(this.dom.label);
  }

  if (!this.dom.foreground.parentNode) {
    this.itemSet.getForeground().appendChild(this.dom.foreground);
  }

  if (!this.dom.background.parentNode) {
    this.itemSet.getBackground().appendChild(this.dom.background);
  }

  if (!this.dom.axis.parentNode) {
    this.itemSet.getAxis().appendChild(this.dom.axis);
  }
};

/**
 * Hide this group: remove from the DOM
 */
Group.prototype.hide = function hide() {
  var label = this.dom.label;
  if (label.parentNode) {
    label.parentNode.removeChild(label);
  }

  var foreground = this.dom.foreground;
  if (foreground.parentNode) {
    foreground.parentNode.removeChild(foreground);
  }

  var background = this.dom.background;
  if (background.parentNode) {
    background.parentNode.removeChild(background);
  }

  var axis = this.dom.axis;
  if (axis.parentNode) {
    axis.parentNode.removeChild(axis);
  }
};

/**
 * Add an item to the group
 * @param {Item} item
 */
Group.prototype.add = function add(item) {
  this.items[item.id] = item;
  item.setParent(this);

  if (item instanceof ItemRange && this.visibleItems.indexOf(item) == -1) {
    var range = this.itemSet.range; // TODO: not nice accessing the range like this
    this._checkIfVisible(item, this.visibleItems, range);
  }
};

/**
 * Remove an item from the group
 * @param {Item} item
 */
Group.prototype.remove = function remove(item) {
  delete this.items[item.id];
  item.setParent(this.itemSet);

  // remove from visible items
  var index = this.visibleItems.indexOf(item);
  if (index != -1) this.visibleItems.splice(index, 1);

  // TODO: also remove from ordered items?
};

/**
 * Remove an item from the corresponding DataSet
 * @param {Item} item
 */
Group.prototype.removeFromDataSet = function removeFromDataSet(item) {
  this.itemSet.removeItem(item.id);
};

/**
 * Reorder the items
 */
Group.prototype.order = function order() {
  var array = util.toArray(this.items);
  this.orderedItems.byStart = array;
  this.orderedItems.byEnd = this._constructByEndArray(array);

  stack.orderByStart(this.orderedItems.byStart);
  stack.orderByEnd(this.orderedItems.byEnd);
};

/**
 * Create an array containing all items being a range (having an end date)
 * @param {Item[]} array
 * @returns {ItemRange[]}
 * @private
 */
Group.prototype._constructByEndArray = function _constructByEndArray(array) {
  var endArray = [];

  for (var i = 0; i < array.length; i++) {
    if (array[i] instanceof ItemRange) {
      endArray.push(array[i]);
    }
  }
  return endArray;
};

/**
 * Update the visible items
 * @param {{byStart: Item[], byEnd: Item[]}} orderedItems   All items ordered by start date and by end date
 * @param {Item[]} visibleItems                             The previously visible items.
 * @param {{start: number, end: number}} range              Visible range
 * @return {Item[]} visibleItems                            The new visible items.
 * @private
 */
Group.prototype._updateVisibleItems = function _updateVisibleItems(orderedItems, visibleItems, range) {
  var initialPosByStart,
      newVisibleItems = [],
      i;

  // first check if the items that were in view previously are still in view.
  // this handles the case for the ItemRange that is both before and after the current one.
  if (visibleItems.length > 0) {
    for (i = 0; i < visibleItems.length; i++) {
      this._checkIfVisible(visibleItems[i], newVisibleItems, range);
    }
  }

  // If there were no visible items previously, use binarySearch to find a visible ItemPoint or ItemRange (based on startTime)
  if (newVisibleItems.length == 0) {
    initialPosByStart = this._binarySearch(orderedItems, range, false);
  }
  else {
    initialPosByStart = orderedItems.byStart.indexOf(newVisibleItems[0]);
  }

  // use visible search to find a visible ItemRange (only based on endTime)
  var initialPosByEnd = this._binarySearch(orderedItems, range, true);

  // if we found a initial ID to use, trace it up and down until we meet an invisible item.
  if (initialPosByStart != -1) {
    for (i = initialPosByStart; i >= 0; i--) {
      if (this._checkIfInvisible(orderedItems.byStart[i], newVisibleItems, range)) {break;}
    }
    for (i = initialPosByStart + 1; i < orderedItems.byStart.length; i++) {
      if (this._checkIfInvisible(orderedItems.byStart[i], newVisibleItems, range)) {break;}
    }
  }

  // if we found a initial ID to use, trace it up and down until we meet an invisible item.
  if (initialPosByEnd != -1) {
    for (i = initialPosByEnd; i >= 0; i--) {
      if (this._checkIfInvisible(orderedItems.byEnd[i], newVisibleItems, range)) {break;}
    }
    for (i = initialPosByEnd + 1; i < orderedItems.byEnd.length; i++) {
      if (this._checkIfInvisible(orderedItems.byEnd[i], newVisibleItems, range)) {break;}
    }
  }

  return newVisibleItems;
};

/**
 * This function does a binary search for a visible item. The user can select either the this.orderedItems.byStart or .byEnd
 * arrays. This is done by giving a boolean value true if you want to use the byEnd.
 * This is done to be able to select the correct if statement (we do not want to check if an item is visible, we want to check
 * if the time we selected (start or end) is within the current range).
 *
 * The trick is that every interval has to either enter the screen at the initial load or by dragging. The case of the ItemRange that is
 * before and after the current range is handled by simply checking if it was in view before and if it is again. For all the rest,
 * either the start OR end time has to be in the range.
 *
 * @param {{byStart: Item[], byEnd: Item[]}} orderedItems
 * @param {{start: number, end: number}} range
 * @param {Boolean} byEnd
 * @returns {number}
 * @private
 */
Group.prototype._binarySearch = function _binarySearch(orderedItems, range, byEnd) {
  var array = [];
  var byTime = byEnd ? 'end' : 'start';
  if (byEnd == true) {array = orderedItems.byEnd;  }
  else               {array = orderedItems.byStart;}

  var interval = range.end - range.start;

  var found = false;
  var low = 0;
  var high = array.length;
  var guess = Math.floor(0.5*(high+low));
  var newGuess;

  if (high == 0) {guess = -1;}
  else if (high == 1) {
    if ((array[guess].data[byTime] > range.start - interval) && (array[guess].data[byTime] < range.end)) {
      guess =  0;
    }
    else {
      guess = -1;
    }
  }
  else {
    high -= 1;
    while (found == false) {
      if ((array[guess].data[byTime] > range.start - interval) && (array[guess].data[byTime] < range.end)) {
        found = true;
      }
      else {
        if (array[guess].data[byTime] < range.start - interval) { // it is too small --> increase low
          low = Math.floor(0.5*(high+low));
        }
        else {  // it is too big --> decrease high
          high = Math.floor(0.5*(high+low));
        }
        newGuess = Math.floor(0.5*(high+low));
        // not in list;
        if (guess == newGuess) {
          guess = -1;
          found = true;
        }
        else {
          guess = newGuess;
        }
      }
    }
  }
  return guess;
};

/**
 * this function checks if an item is invisible. If it is NOT we make it visible
 * and add it to the global visible items. If it is, return true.
 *
 * @param {Item} item
 * @param {Item[]} visibleItems
 * @param {{start:number, end:number}} range
 * @returns {boolean}
 * @private
 */
Group.prototype._checkIfInvisible = function _checkIfInvisible(item, visibleItems, range) {
  if (item.isVisible(range)) {
    if (!item.displayed) item.show();
    item.repositionX();
    if (visibleItems.indexOf(item) == -1) {
      visibleItems.push(item);
    }
    return false;
  }
  else {
    return true;
  }
};

/**
 * this function is very similar to the _checkIfInvisible() but it does not
 * return booleans, hides the item if it should not be seen and always adds to
 * the visibleItems.
 * this one is for brute forcing and hiding.
 *
 * @param {Item} item
 * @param {Array} visibleItems
 * @param {{start:number, end:number}} range
 * @private
 */
Group.prototype._checkIfVisible = function _checkIfVisible(item, visibleItems, range) {
  if (item.isVisible(range)) {
    if (!item.displayed) item.show();
    // reposition item horizontally
    item.repositionX();
    visibleItems.push(item);
  }
  else {
    if (item.displayed) item.hide();
  }
};

/**
 * Create a timeline visualization
 * @param {HTMLElement} container
 * @param {vis.DataSet | Array | google.visualization.DataTable} [items]
 * @param {Object} [options]  See Timeline.setOptions for the available options.
 * @constructor
 */
function Timeline (container, items, options) {
  // validate arguments
  if (!container) throw new Error('No container element provided');

  var me = this;
  var now = moment().hours(0).minutes(0).seconds(0).milliseconds(0);
  this.options = {
    orientation: 'bottom',
    direction: 'horizontal', // 'horizontal' or 'vertical'
    autoResize: true,
    stack: true,

    editable: {
      updateTime: false,
      updateGroup: false,
      add: false,
      remove: false
    },

    selectable: true,
    snap: null, // will be specified after timeaxis is created

    min: null,
    max: null,
    zoomMin: 10,                                // milliseconds
    zoomMax: 1000 * 60 * 60 * 24 * 365 * 10000, // milliseconds
    // moveable: true, // TODO: option moveable
    // zoomable: true, // TODO: option zoomable

    showMinorLabels: true,
    showMajorLabels: true,
    showCurrentTime: false,
    showCustomTime: false,

    type: 'box',
    align: 'center',
    margin: {
      axis: 20,
      item: 10
    },
    padding: 5,

    onAdd: function (item, callback) {
      callback(item);
    },
    onUpdate: function (item, callback) {
      callback(item);
    },
    onMove: function (item, callback) {
      callback(item);
    },
    onRemove: function (item, callback) {
      callback(item);
    },

    toScreen: me._toScreen.bind(me),
    toTime: me._toTime.bind(me)
  };

  // root panel
  var rootOptions = util.extend(Object.create(this.options), {
    height: function () {
      if (me.options.height) {
        // fixed height
        return me.options.height;
      }
      else {
        // auto height
        // TODO: implement a css based solution to automatically have the right hight
        return (me.timeAxis.height + me.contentPanel.height) + 'px';
      }
    }
  });
  this.rootPanel = new RootPanel(container, rootOptions);

  // single select (or unselect) when tapping an item
  this.rootPanel.on('tap',  this._onSelectItem.bind(this));

  // multi select when holding mouse/touch, or on ctrl+click
  this.rootPanel.on('hold', this._onMultiSelectItem.bind(this));

  // add item on doubletap
  this.rootPanel.on('doubletap', this._onAddItem.bind(this));

  // side panel
  var sideOptions = util.extend(Object.create(this.options), {
    top: function () {
      return (sideOptions.orientation == 'top') ? '0' : '';
    },
    bottom: function () {
      return (sideOptions.orientation == 'top') ? '' : '0';
    },
    left: '0',
    right: null,
    height: '100%',
    width: function () {
      if (me.itemSet) {
        return me.itemSet.getLabelsWidth();
      }
      else {
        return 0;
      }
    },
    className: function () {
      return 'side' + (me.groupsData ? '' : ' hidden');
    }
  });
  this.sidePanel = new Panel(sideOptions);
  this.rootPanel.appendChild(this.sidePanel);

  // main panel (contains time axis and itemsets)
  var mainOptions = util.extend(Object.create(this.options), {
    left: function () {
      // we align left to enable a smooth resizing of the window
      return me.sidePanel.width;
    },
    right: null,
    height: '100%',
    width: function () {
      return me.rootPanel.width - me.sidePanel.width;
    },
    className: 'main'
  });
  this.mainPanel = new Panel(mainOptions);
  this.rootPanel.appendChild(this.mainPanel);

  // range
  // TODO: move range inside rootPanel?
  var rangeOptions = Object.create(this.options);
  this.range = new Range(this.rootPanel, this.mainPanel, rangeOptions);
  this.range.setRange(
      now.clone().add('days', -3).valueOf(),
      now.clone().add('days', 4).valueOf()
  );
  this.range.on('rangechange', function (properties) {
    me.rootPanel.repaint();
    me.emit('rangechange', properties);
  });
  this.range.on('rangechanged', function (properties) {
    me.rootPanel.repaint();
    me.emit('rangechanged', properties);
  });

  // panel with time axis
  var timeAxisOptions = util.extend(Object.create(rootOptions), {
    range: this.range,
    left: null,
    top: null,
    width: null,
    height: null
  });
  this.timeAxis = new TimeAxis(timeAxisOptions);
  this.timeAxis.setRange(this.range);
  this.options.snap = this.timeAxis.snap.bind(this.timeAxis);
  this.mainPanel.appendChild(this.timeAxis);

  // content panel (contains itemset(s))
  var contentOptions = util.extend(Object.create(this.options), {
    top: function () {
      return (me.options.orientation == 'top') ? (me.timeAxis.height + 'px') : '';
    },
    bottom: function () {
      return (me.options.orientation == 'top') ? '' : (me.timeAxis.height + 'px');
    },
    left: null,
    right: null,
    height: null,
    width: null,
    className: 'content'
  });
  this.contentPanel = new Panel(contentOptions);
  this.mainPanel.appendChild(this.contentPanel);

  // content panel (contains the vertical lines of box items)
  var backgroundOptions = util.extend(Object.create(this.options), {
    top: function () {
      return (me.options.orientation == 'top') ? (me.timeAxis.height + 'px') : '';
    },
    bottom: function () {
      return (me.options.orientation == 'top') ? '' : (me.timeAxis.height + 'px');
    },
    left: null,
    right: null,
    height: function () {
      return me.contentPanel.height;
    },
    width: null,
    className: 'background'
  });
  this.backgroundPanel = new Panel(backgroundOptions);
  this.mainPanel.insertBefore(this.backgroundPanel, this.contentPanel);

  // panel with axis holding the dots of item boxes
  var axisPanelOptions = util.extend(Object.create(rootOptions), {
    left: 0,
    top: function () {
      return (me.options.orientation == 'top') ? (me.timeAxis.height + 'px') : '';
    },
    bottom: function () {
      return (me.options.orientation == 'top') ? '' : (me.timeAxis.height + 'px');
    },
    width: '100%',
    height: 0,
    className: 'axis'
  });
  this.axisPanel = new Panel(axisPanelOptions);
  this.mainPanel.appendChild(this.axisPanel);

  // content panel (contains itemset(s))
  var sideContentOptions = util.extend(Object.create(this.options), {
    top: function () {
      return (me.options.orientation == 'top') ? (me.timeAxis.height + 'px') : '';
    },
    bottom: function () {
      return (me.options.orientation == 'top') ? '' : (me.timeAxis.height + 'px');
    },
    left: null,
    right: null,
    height: null,
    width: null,
    className: 'side-content'
  });
  this.sideContentPanel = new Panel(sideContentOptions);
  this.sidePanel.appendChild(this.sideContentPanel);

  // current time bar
  // Note: time bar will be attached in this.setOptions when selected
  this.currentTime = new CurrentTime(this.range, rootOptions);

  // custom time bar
  // Note: time bar will be attached in this.setOptions when selected
  this.customTime = new CustomTime(rootOptions);
  this.customTime.on('timechange', function (time) {
    me.emit('timechange', time);
  });
  this.customTime.on('timechanged', function (time) {
    me.emit('timechanged', time);
  });

  // itemset containing items and groups
  var itemOptions = util.extend(Object.create(this.options), {
    left: null,
    right: null,
    top: null,
    bottom: null,
    width: null,
    height: null
  });
  this.itemSet = new ItemSet(this.backgroundPanel, this.axisPanel, this.sideContentPanel, itemOptions);
  this.itemSet.setRange(this.range);
  this.itemSet.on('change', me.rootPanel.repaint.bind(me.rootPanel));
  this.contentPanel.appendChild(this.itemSet);

  this.itemsData = null;      // DataSet
  this.groupsData = null;     // DataSet

  // apply options
  if (options) {
    this.setOptions(options);
  }

  // create itemset
  if (items) {
    this.setItems(items);
  }
}

// turn Timeline into an event emitter
Emitter(Timeline.prototype);

/**
 * Set options
 * @param {Object} options  TODO: describe the available options
 */
Timeline.prototype.setOptions = function (options) {
  util.extend(this.options, options);

  if ('editable' in options) {
    var isBoolean = typeof options.editable === 'boolean';

    this.options.editable = {
      updateTime:  isBoolean ? options.editable : (options.editable.updateTime || false),
      updateGroup: isBoolean ? options.editable : (options.editable.updateGroup || false),
      add:         isBoolean ? options.editable : (options.editable.add || false),
      remove:      isBoolean ? options.editable : (options.editable.remove || false)
    };
  }

  // force update of range (apply new min/max etc.)
  // both start and end are optional
  this.range.setRange(options.start, options.end);

  if ('editable' in options || 'selectable' in options) {
    if (this.options.selectable) {
      // force update of selection
      this.setSelection(this.getSelection());
    }
    else {
      // remove selection
      this.setSelection([]);
    }
  }

  // force the itemSet to refresh: options like orientation and margins may be changed
  this.itemSet.markDirty();

  // validate the callback functions
  var validateCallback = (function (fn) {
    if (!(this.options[fn] instanceof Function) || this.options[fn].length != 2) {
      throw new Error('option ' + fn + ' must be a function ' + fn + '(item, callback)');
    }
  }).bind(this);
  ['onAdd', 'onUpdate', 'onRemove', 'onMove'].forEach(validateCallback);

  // add/remove the current time bar
  if (this.options.showCurrentTime) {
    if (!this.mainPanel.hasChild(this.currentTime)) {
      this.mainPanel.appendChild(this.currentTime);
      this.currentTime.start();
    }
  }
  else {
    if (this.mainPanel.hasChild(this.currentTime)) {
      this.currentTime.stop();
      this.mainPanel.removeChild(this.currentTime);
    }
  }

  // add/remove the custom time bar
  if (this.options.showCustomTime) {
    if (!this.mainPanel.hasChild(this.customTime)) {
      this.mainPanel.appendChild(this.customTime);
    }
  }
  else {
    if (this.mainPanel.hasChild(this.customTime)) {
      this.mainPanel.removeChild(this.customTime);
    }
  }

  // TODO: remove deprecation error one day (deprecated since version 0.8.0)
  if (options && options.order) {
    throw new Error('Option order is deprecated. There is no replacement for this feature.');
  }

  // repaint everything
  this.rootPanel.repaint();
};

/**
 * Set a custom time bar
 * @param {Date} time
 */
Timeline.prototype.setCustomTime = function (time) {
  if (!this.customTime) {
    throw new Error('Cannot get custom time: Custom time bar is not enabled');
  }

  this.customTime.setCustomTime(time);
};

/**
 * Retrieve the current custom time.
 * @return {Date} customTime
 */
Timeline.prototype.getCustomTime = function() {
  if (!this.customTime) {
    throw new Error('Cannot get custom time: Custom time bar is not enabled');
  }

  return this.customTime.getCustomTime();
};

/**
 * Set items
 * @param {vis.DataSet | Array | google.visualization.DataTable | null} items
 */
Timeline.prototype.setItems = function(items) {
  var initialLoad = (this.itemsData == null);

  // convert to type DataSet when needed
  var newDataSet;
  if (!items) {
    newDataSet = null;
  }
  else if (items instanceof DataSet || items instanceof DataView) {
    newDataSet = items;
  }
  else {
    // turn an array into a dataset
    newDataSet = new DataSet(items, {
      convert: {
        start: 'Date',
        end: 'Date'
      }
    });
  }

  // set items
  this.itemsData = newDataSet;
  this.itemSet.setItems(newDataSet);

  if (initialLoad && (this.options.start == undefined || this.options.end == undefined)) {
    this.fit();

    var start = (this.options.start != undefined) ? util.convert(this.options.start, 'Date') : null;
    var end   = (this.options.end != undefined) ? util.convert(this.options.end, 'Date') : null;

    this.setWindow(start, end);
  }
};

/**
 * Set groups
 * @param {vis.DataSet | Array | google.visualization.DataTable} groups
 */
Timeline.prototype.setGroups = function setGroups(groups) {
  // convert to type DataSet when needed
  var newDataSet;
  if (!groups) {
    newDataSet = null;
  }
  else if (groups instanceof DataSet || groups instanceof DataView) {
    newDataSet = groups;
  }
  else {
    // turn an array into a dataset
    newDataSet = new DataSet(groups);
  }

  this.groupsData = newDataSet;
  this.itemSet.setGroups(newDataSet);
};

/**
 * Set Timeline window such that it fits all items
 */
Timeline.prototype.fit = function fit() {
  // apply the data range as range
  var dataRange = this.getItemRange();

  // add 5% space on both sides
  var start = dataRange.min;
  var end = dataRange.max;
  if (start != null && end != null) {
    var interval = (end.valueOf() - start.valueOf());
    if (interval <= 0) {
      // prevent an empty interval
      interval = 24 * 60 * 60 * 1000; // 1 day
    }
    start = new Date(start.valueOf() - interval * 0.05);
    end = new Date(end.valueOf() + interval * 0.05);
  }

  // skip range set if there is no start and end date
  if (start === null && end === null) {
    return;
  }

  this.range.setRange(start, end);
};

/**
 * Get the data range of the item set.
 * @returns {{min: Date, max: Date}} range  A range with a start and end Date.
 *                                          When no minimum is found, min==null
 *                                          When no maximum is found, max==null
 */
Timeline.prototype.getItemRange = function getItemRange() {
  // calculate min from start filed
  var itemsData = this.itemsData,
      min = null,
      max = null;

  if (itemsData) {
    // calculate the minimum value of the field 'start'
    var minItem = itemsData.min('start');
    min = minItem ? minItem.start.valueOf() : null;

    // calculate maximum value of fields 'start' and 'end'
    var maxStartItem = itemsData.max('start');
    if (maxStartItem) {
      max = maxStartItem.start.valueOf();
    }
    var maxEndItem = itemsData.max('end');
    if (maxEndItem) {
      if (max == null) {
        max = maxEndItem.end.valueOf();
      }
      else {
        max = Math.max(max, maxEndItem.end.valueOf());
      }
    }
  }

  return {
    min: (min != null) ? new Date(min) : null,
    max: (max != null) ? new Date(max) : null
  };
};

/**
 * Set selected items by their id. Replaces the current selection
 * Unknown id's are silently ignored.
 * @param {Array} [ids] An array with zero or more id's of the items to be
 *                      selected. If ids is an empty array, all items will be
 *                      unselected.
 */
Timeline.prototype.setSelection = function setSelection (ids) {
  this.itemSet.setSelection(ids);
};

/**
 * Get the selected items by their id
 * @return {Array} ids  The ids of the selected items
 */
Timeline.prototype.getSelection = function getSelection() {
  return this.itemSet.getSelection();
};

/**
 * Set the visible window. Both parameters are optional, you can change only
 * start or only end. Syntax:
 *
 *     TimeLine.setWindow(start, end)
 *     TimeLine.setWindow(range)
 *
 * Where start and end can be a Date, number, or string, and range is an
 * object with properties start and end.
 *
 * @param {Date | Number | String} [start] Start date of visible window
 * @param {Date | Number | String} [end]   End date of visible window
 */
Timeline.prototype.setWindow = function setWindow(start, end) {
  if (arguments.length == 1) {
    var range = arguments[0];
    this.range.setRange(range.start, range.end);
  }
  else {
    this.range.setRange(start, end);
  }
};

/**
 * Get the visible window
 * @return {{start: Date, end: Date}}   Visible range
 */
Timeline.prototype.getWindow = function setWindow() {
  var range = this.range.getRange();
  return {
    start: new Date(range.start),
    end: new Date(range.end)
  };
};

/**
 * Handle selecting/deselecting an item when tapping it
 * @param {Event} event
 * @private
 */
// TODO: move this function to ItemSet
Timeline.prototype._onSelectItem = function (event) {
  if (!this.options.selectable) return;

  var ctrlKey  = event.gesture.srcEvent && event.gesture.srcEvent.ctrlKey;
  var shiftKey = event.gesture.srcEvent && event.gesture.srcEvent.shiftKey;
  if (ctrlKey || shiftKey) {
    this._onMultiSelectItem(event);
    return;
  }

  var oldSelection = this.getSelection();

  var item = ItemSet.itemFromTarget(event);
  var selection = item ? [item.id] : [];
  this.setSelection(selection);

  var newSelection = this.getSelection();

  // if selection is changed, emit a select event
  if (!util.equalArray(oldSelection, newSelection)) {
    this.emit('select', {
      items: this.getSelection()
    });
  }

  event.stopPropagation();
};

/**
 * Handle creation and updates of an item on double tap
 * @param event
 * @private
 */
Timeline.prototype._onAddItem = function (event) {
  if (!this.options.selectable) return;
  if (!this.options.editable.add) return;

  var me = this,
      item = ItemSet.itemFromTarget(event);

  if (item) {
    // update item

    // execute async handler to update the item (or cancel it)
    var itemData = me.itemsData.get(item.id); // get a clone of the data from the dataset
    this.options.onUpdate(itemData, function (itemData) {
      if (itemData) {
        me.itemsData.update(itemData);
      }
    });
  }
  else {
    // add item
    var xAbs = vis.util.getAbsoluteLeft(this.contentPanel.frame);
    var x = event.gesture.center.pageX - xAbs;
    var newItem = {
      start: this.timeAxis.snap(this._toTime(x)),
      content: 'new item'
    };

    var id = util.randomUUID();
    newItem[this.itemsData.fieldId] = id;

    var group = ItemSet.groupFromTarget(event);
    if (group) {
      newItem.group = group.groupId;
    }

    // execute async handler to customize (or cancel) adding an item
    this.options.onAdd(newItem, function (item) {
      if (item) {
        me.itemsData.add(newItem);
        // TODO: need to trigger a repaint?
      }
    });
  }
};

/**
 * Handle selecting/deselecting multiple items when holding an item
 * @param {Event} event
 * @private
 */
// TODO: move this function to ItemSet
Timeline.prototype._onMultiSelectItem = function (event) {
  if (!this.options.selectable) return;

  var selection,
      item = ItemSet.itemFromTarget(event);

  if (item) {
    // multi select items
    selection = this.getSelection(); // current selection
    var index = selection.indexOf(item.id);
    if (index == -1) {
      // item is not yet selected -> select it
      selection.push(item.id);
    }
    else {
      // item is already selected -> deselect it
      selection.splice(index, 1);
    }
    this.setSelection(selection);

    this.emit('select', {
      items: this.getSelection()
    });

    event.stopPropagation();
  }
};

/**
 * Convert a position on screen (pixels) to a datetime
 * @param {int}     x    Position on the screen in pixels
 * @return {Date}   time The datetime the corresponds with given position x
 * @private
 */
Timeline.prototype._toTime = function _toTime(x) {
  var conversion = this.range.conversion(this.mainPanel.width);
  return new Date(x / conversion.scale + conversion.offset);
};

/**
 * Convert a datetime (Date object) into a position on the screen
 * @param {Date}   time A date
 * @return {int}   x    The position on the screen in pixels which corresponds
 *                      with the given date.
 * @private
 */
Timeline.prototype._toScreen = function _toScreen(time) {
  var conversion = this.range.conversion(this.mainPanel.width);
  return (time.valueOf() - conversion.offset) * conversion.scale;
};

(function(exports) {
  /**
   * Parse a text source containing data in DOT language into a JSON object.
   * The object contains two lists: one with nodes and one with edges.
   *
   * DOT language reference: http://www.graphviz.org/doc/info/lang.html
   *
   * @param {String} data     Text containing a graph in DOT-notation
   * @return {Object} graph   An object containing two parameters:
   *                          {Object[]} nodes
   *                          {Object[]} edges
   */
  function parseDOT (data) {
    dot = data;
    return parseGraph();
  }

  // token types enumeration
  var TOKENTYPE = {
    NULL : 0,
    DELIMITER : 1,
    IDENTIFIER: 2,
    UNKNOWN : 3
  };

  // map with all delimiters
  var DELIMITERS = {
    '{': true,
    '}': true,
    '[': true,
    ']': true,
    ';': true,
    '=': true,
    ',': true,

    '->': true,
    '--': true
  };

  var dot = '';                   // current dot file
  var index = 0;                  // current index in dot file
  var c = '';                     // current token character in expr
  var token = '';                 // current token
  var tokenType = TOKENTYPE.NULL; // type of the token

  /**
   * Get the first character from the dot file.
   * The character is stored into the char c. If the end of the dot file is
   * reached, the function puts an empty string in c.
   */
  function first() {
    index = 0;
    c = dot.charAt(0);
  }

  /**
   * Get the next character from the dot file.
   * The character is stored into the char c. If the end of the dot file is
   * reached, the function puts an empty string in c.
   */
  function next() {
    index++;
    c = dot.charAt(index);
  }

  /**
   * Preview the next character from the dot file.
   * @return {String} cNext
   */
  function nextPreview() {
    return dot.charAt(index + 1);
  }

  /**
   * Test whether given character is alphabetic or numeric
   * @param {String} c
   * @return {Boolean} isAlphaNumeric
   */
  var regexAlphaNumeric = /[a-zA-Z_0-9.:#]/;
  function isAlphaNumeric(c) {
    return regexAlphaNumeric.test(c);
  }

  /**
   * Merge all properties of object b into object b
   * @param {Object} a
   * @param {Object} b
   * @return {Object} a
   */
  function merge (a, b) {
    if (!a) {
      a = {};
    }

    if (b) {
      for (var name in b) {
        if (b.hasOwnProperty(name)) {
          a[name] = b[name];
        }
      }
    }
    return a;
  }

  /**
   * Set a value in an object, where the provided parameter name can be a
   * path with nested parameters. For example:
   *
   *     var obj = {a: 2};
   *     setValue(obj, 'b.c', 3);     // obj = {a: 2, b: {c: 3}}
   *
   * @param {Object} obj
   * @param {String} path  A parameter name or dot-separated parameter path,
   *                      like "color.highlight.border".
   * @param {*} value
   */
  function setValue(obj, path, value) {
    var keys = path.split('.');
    var o = obj;
    while (keys.length) {
      var key = keys.shift();
      if (keys.length) {
        // this isn't the end point
        if (!o[key]) {
          o[key] = {};
        }
        o = o[key];
      }
      else {
        // this is the end point
        o[key] = value;
      }
    }
  }

  /**
   * Add a node to a graph object. If there is already a node with
   * the same id, their attributes will be merged.
   * @param {Object} graph
   * @param {Object} node
   */
  function addNode(graph, node) {
    var i, len;
    var current = null;

    // find root graph (in case of subgraph)
    var graphs = [graph]; // list with all graphs from current graph to root graph
    var root = graph;
    while (root.parent) {
      graphs.push(root.parent);
      root = root.parent;
    }

    // find existing node (at root level) by its id
    if (root.nodes) {
      for (i = 0, len = root.nodes.length; i < len; i++) {
        if (node.id === root.nodes[i].id) {
          current = root.nodes[i];
          break;
        }
      }
    }

    if (!current) {
      // this is a new node
      current = {
        id: node.id
      };
      if (graph.node) {
        // clone default attributes
        current.attr = merge(current.attr, graph.node);
      }
    }

    // add node to this (sub)graph and all its parent graphs
    for (i = graphs.length - 1; i >= 0; i--) {
      var g = graphs[i];

      if (!g.nodes) {
        g.nodes = [];
      }
      if (g.nodes.indexOf(current) == -1) {
        g.nodes.push(current);
      }
    }

    // merge attributes
    if (node.attr) {
      current.attr = merge(current.attr, node.attr);
    }
  }

  /**
   * Add an edge to a graph object
   * @param {Object} graph
   * @param {Object} edge
   */
  function addEdge(graph, edge) {
    if (!graph.edges) {
      graph.edges = [];
    }
    graph.edges.push(edge);
    if (graph.edge) {
      var attr = merge({}, graph.edge);     // clone default attributes
      edge.attr = merge(attr, edge.attr); // merge attributes
    }
  }

  /**
   * Create an edge to a graph object
   * @param {Object} graph
   * @param {String | Number | Object} from
   * @param {String | Number | Object} to
   * @param {String} type
   * @param {Object | null} attr
   * @return {Object} edge
   */
  function createEdge(graph, from, to, type, attr) {
    var edge = {
      from: from,
      to: to,
      type: type
    };

    if (graph.edge) {
      edge.attr = merge({}, graph.edge);  // clone default attributes
    }
    edge.attr = merge(edge.attr || {}, attr); // merge attributes

    return edge;
  }

  /**
   * Get next token in the current dot file.
   * The token and token type are available as token and tokenType
   */
  function getToken() {
    tokenType = TOKENTYPE.NULL;
    token = '';

    // skip over whitespaces
    while (c == ' ' || c == '\t' || c == '\n' || c == '\r') {  // space, tab, enter
      next();
    }

    do {
      var isComment = false;

      // skip comment
      if (c == '#') {
        // find the previous non-space character
        var i = index - 1;
        while (dot.charAt(i) == ' ' || dot.charAt(i) == '\t') {
          i--;
        }
        if (dot.charAt(i) == '\n' || dot.charAt(i) == '') {
          // the # is at the start of a line, this is indeed a line comment
          while (c != '' && c != '\n') {
            next();
          }
          isComment = true;
        }
      }
      if (c == '/' && nextPreview() == '/') {
        // skip line comment
        while (c != '' && c != '\n') {
          next();
        }
        isComment = true;
      }
      if (c == '/' && nextPreview() == '*') {
        // skip block comment
        while (c != '') {
          if (c == '*' && nextPreview() == '/') {
            // end of block comment found. skip these last two characters
            next();
            next();
            break;
          }
          else {
            next();
          }
        }
        isComment = true;
      }

      // skip over whitespaces
      while (c == ' ' || c == '\t' || c == '\n' || c == '\r') {  // space, tab, enter
        next();
      }
    }
    while (isComment);

    // check for end of dot file
    if (c == '') {
      // token is still empty
      tokenType = TOKENTYPE.DELIMITER;
      return;
    }

    // check for delimiters consisting of 2 characters
    var c2 = c + nextPreview();
    if (DELIMITERS[c2]) {
      tokenType = TOKENTYPE.DELIMITER;
      token = c2;
      next();
      next();
      return;
    }

    // check for delimiters consisting of 1 character
    if (DELIMITERS[c]) {
      tokenType = TOKENTYPE.DELIMITER;
      token = c;
      next();
      return;
    }

    // check for an identifier (number or string)
    // TODO: more precise parsing of numbers/strings (and the port separator ':')
    if (isAlphaNumeric(c) || c == '-') {
      token += c;
      next();

      while (isAlphaNumeric(c)) {
        token += c;
        next();
      }
      if (token == 'false') {
        token = false;   // convert to boolean
      }
      else if (token == 'true') {
        token = true;   // convert to boolean
      }
      else if (!isNaN(Number(token))) {
        token = Number(token); // convert to number
      }
      tokenType = TOKENTYPE.IDENTIFIER;
      return;
    }

    // check for a string enclosed by double quotes
    if (c == '"') {
      next();
      while (c != '' && (c != '"' || (c == '"' && nextPreview() == '"'))) {
        token += c;
        if (c == '"') { // skip the escape character
          next();
        }
        next();
      }
      if (c != '"') {
        throw newSyntaxError('End of string " expected');
      }
      next();
      tokenType = TOKENTYPE.IDENTIFIER;
      return;
    }

    // something unknown is found, wrong characters, a syntax error
    tokenType = TOKENTYPE.UNKNOWN;
    while (c != '') {
      token += c;
      next();
    }
    throw new SyntaxError('Syntax error in part "' + chop(token, 30) + '"');
  }

  /**
   * Parse a graph.
   * @returns {Object} graph
   */
  function parseGraph() {
    var graph = {};

    first();
    getToken();

    // optional strict keyword
    if (token == 'strict') {
      graph.strict = true;
      getToken();
    }

    // graph or digraph keyword
    if (token == 'graph' || token == 'digraph') {
      graph.type = token;
      getToken();
    }

    // optional graph id
    if (tokenType == TOKENTYPE.IDENTIFIER) {
      graph.id = token;
      getToken();
    }

    // open angle bracket
    if (token != '{') {
      throw newSyntaxError('Angle bracket { expected');
    }
    getToken();

    // statements
    parseStatements(graph);

    // close angle bracket
    if (token != '}') {
      throw newSyntaxError('Angle bracket } expected');
    }
    getToken();

    // end of file
    if (token !== '') {
      throw newSyntaxError('End of file expected');
    }
    getToken();

    // remove temporary default properties
    delete graph.node;
    delete graph.edge;
    delete graph.graph;

    return graph;
  }

  /**
   * Parse a list with statements.
   * @param {Object} graph
   */
  function parseStatements (graph) {
    while (token !== '' && token != '}') {
      parseStatement(graph);
      if (token == ';') {
        getToken();
      }
    }
  }

  /**
   * Parse a single statement. Can be a an attribute statement, node
   * statement, a series of node statements and edge statements, or a
   * parameter.
   * @param {Object} graph
   */
  function parseStatement(graph) {
    // parse subgraph
    var subgraph = parseSubgraph(graph);
    if (subgraph) {
      // edge statements
      parseEdge(graph, subgraph);

      return;
    }

    // parse an attribute statement
    var attr = parseAttributeStatement(graph);
    if (attr) {
      return;
    }

    // parse node
    if (tokenType != TOKENTYPE.IDENTIFIER) {
      throw newSyntaxError('Identifier expected');
    }
    var id = token; // id can be a string or a number
    getToken();

    if (token == '=') {
      // id statement
      getToken();
      if (tokenType != TOKENTYPE.IDENTIFIER) {
        throw newSyntaxError('Identifier expected');
      }
      graph[id] = token;
      getToken();
      // TODO: implement comma separated list with "a_list: ID=ID [','] [a_list] "
    }
    else {
      parseNodeStatement(graph, id);
    }
  }

  /**
   * Parse a subgraph
   * @param {Object} graph    parent graph object
   * @return {Object | null} subgraph
   */
  function parseSubgraph (graph) {
    var subgraph = null;

    // optional subgraph keyword
    if (token == 'subgraph') {
      subgraph = {};
      subgraph.type = 'subgraph';
      getToken();

      // optional graph id
      if (tokenType == TOKENTYPE.IDENTIFIER) {
        subgraph.id = token;
        getToken();
      }
    }

    // open angle bracket
    if (token == '{') {
      getToken();

      if (!subgraph) {
        subgraph = {};
      }
      subgraph.parent = graph;
      subgraph.node = graph.node;
      subgraph.edge = graph.edge;
      subgraph.graph = graph.graph;

      // statements
      parseStatements(subgraph);

      // close angle bracket
      if (token != '}') {
        throw newSyntaxError('Angle bracket } expected');
      }
      getToken();

      // remove temporary default properties
      delete subgraph.node;
      delete subgraph.edge;
      delete subgraph.graph;
      delete subgraph.parent;

      // register at the parent graph
      if (!graph.subgraphs) {
        graph.subgraphs = [];
      }
      graph.subgraphs.push(subgraph);
    }

    return subgraph;
  }

  /**
   * parse an attribute statement like "node [shape=circle fontSize=16]".
   * Available keywords are 'node', 'edge', 'graph'.
   * The previous list with default attributes will be replaced
   * @param {Object} graph
   * @returns {String | null} keyword Returns the name of the parsed attribute
   *                                  (node, edge, graph), or null if nothing
   *                                  is parsed.
   */
  function parseAttributeStatement (graph) {
    // attribute statements
    if (token == 'node') {
      getToken();

      // node attributes
      graph.node = parseAttributeList();
      return 'node';
    }
    else if (token == 'edge') {
      getToken();

      // edge attributes
      graph.edge = parseAttributeList();
      return 'edge';
    }
    else if (token == 'graph') {
      getToken();

      // graph attributes
      graph.graph = parseAttributeList();
      return 'graph';
    }

    return null;
  }

  /**
   * parse a node statement
   * @param {Object} graph
   * @param {String | Number} id
   */
  function parseNodeStatement(graph, id) {
    // node statement
    var node = {
      id: id
    };
    var attr = parseAttributeList();
    if (attr) {
      node.attr = attr;
    }
    addNode(graph, node);

    // edge statements
    parseEdge(graph, id);
  }

  /**
   * Parse an edge or a series of edges
   * @param {Object} graph
   * @param {String | Number} from        Id of the from node
   */
  function parseEdge(graph, from) {
    while (token == '->' || token == '--') {
      var to;
      var type = token;
      getToken();

      var subgraph = parseSubgraph(graph);
      if (subgraph) {
        to = subgraph;
      }
      else {
        if (tokenType != TOKENTYPE.IDENTIFIER) {
          throw newSyntaxError('Identifier or subgraph expected');
        }
        to = token;
        addNode(graph, {
          id: to
        });
        getToken();
      }

      // parse edge attributes
      var attr = parseAttributeList();

      // create edge
      var edge = createEdge(graph, from, to, type, attr);
      addEdge(graph, edge);

      from = to;
    }
  }

  /**
   * Parse a set with attributes,
   * for example [label="1.000", shape=solid]
   * @return {Object | null} attr
   */
  function parseAttributeList() {
    var attr = null;

    while (token == '[') {
      getToken();
      attr = {};
      while (token !== '' && token != ']') {
        if (tokenType != TOKENTYPE.IDENTIFIER) {
          throw newSyntaxError('Attribute name expected');
        }
        var name = token;

        getToken();
        if (token != '=') {
          throw newSyntaxError('Equal sign = expected');
        }
        getToken();

        if (tokenType != TOKENTYPE.IDENTIFIER) {
          throw newSyntaxError('Attribute value expected');
        }
        var value = token;
        setValue(attr, name, value); // name can be a path

        getToken();
        if (token ==',') {
          getToken();
        }
      }

      if (token != ']') {
        throw newSyntaxError('Bracket ] expected');
      }
      getToken();
    }

    return attr;
  }

  /**
   * Create a syntax error with extra information on current token and index.
   * @param {String} message
   * @returns {SyntaxError} err
   */
  function newSyntaxError(message) {
    return new SyntaxError(message + ', got "' + chop(token, 30) + '" (char ' + index + ')');
  }

  /**
   * Chop off text after a maximum length
   * @param {String} text
   * @param {Number} maxLength
   * @returns {String}
   */
  function chop (text, maxLength) {
    return (text.length <= maxLength) ? text : (text.substr(0, 27) + '...');
  }

  /**
   * Execute a function fn for each pair of elements in two arrays
   * @param {Array | *} array1
   * @param {Array | *} array2
   * @param {function} fn
   */
  function forEach2(array1, array2, fn) {
    if (array1 instanceof Array) {
      array1.forEach(function (elem1) {
        if (array2 instanceof Array) {
          array2.forEach(function (elem2)  {
            fn(elem1, elem2);
          });
        }
        else {
          fn(elem1, array2);
        }
      });
    }
    else {
      if (array2 instanceof Array) {
        array2.forEach(function (elem2)  {
          fn(array1, elem2);
        });
      }
      else {
        fn(array1, array2);
      }
    }
  }

  /**
   * Convert a string containing a graph in DOT language into a map containing
   * with nodes and edges in the format of graph.
   * @param {String} data         Text containing a graph in DOT-notation
   * @return {Object} graphData
   */
  function DOTToGraph (data) {
    // parse the DOT file
    var dotData = parseDOT(data);
    var graphData = {
      nodes: [],
      edges: [],
      options: {}
    };

    // copy the nodes
    if (dotData.nodes) {
      dotData.nodes.forEach(function (dotNode) {
        var graphNode = {
          id: dotNode.id,
          label: String(dotNode.label || dotNode.id)
        };
        merge(graphNode, dotNode.attr);
        if (graphNode.image) {
          graphNode.shape = 'image';
        }
        graphData.nodes.push(graphNode);
      });
    }

    // copy the edges
    if (dotData.edges) {
      /**
       * Convert an edge in DOT format to an edge with VisGraph format
       * @param {Object} dotEdge
       * @returns {Object} graphEdge
       */
      function convertEdge(dotEdge) {
        var graphEdge = {
          from: dotEdge.from,
          to: dotEdge.to
        };
        merge(graphEdge, dotEdge.attr);
        graphEdge.style = (dotEdge.type == '->') ? 'arrow' : 'line';
        return graphEdge;
      }

      dotData.edges.forEach(function (dotEdge) {
        var from, to;
        if (dotEdge.from instanceof Object) {
          from = dotEdge.from.nodes;
        }
        else {
          from = {
            id: dotEdge.from
          }
        }

        if (dotEdge.to instanceof Object) {
          to = dotEdge.to.nodes;
        }
        else {
          to = {
            id: dotEdge.to
          }
        }

        if (dotEdge.from instanceof Object && dotEdge.from.edges) {
          dotEdge.from.edges.forEach(function (subEdge) {
            var graphEdge = convertEdge(subEdge);
            graphData.edges.push(graphEdge);
          });
        }

        forEach2(from, to, function (from, to) {
          var subEdge = createEdge(graphData, from.id, to.id, dotEdge.type, dotEdge.attr);
          var graphEdge = convertEdge(subEdge);
          graphData.edges.push(graphEdge);
        });

        if (dotEdge.to instanceof Object && dotEdge.to.edges) {
          dotEdge.to.edges.forEach(function (subEdge) {
            var graphEdge = convertEdge(subEdge);
            graphData.edges.push(graphEdge);
          });
        }
      });
    }

    // copy the options
    if (dotData.attr) {
      graphData.options = dotData.attr;
    }

    return graphData;
  }

  // exports
  exports.parseDOT = parseDOT;
  exports.DOTToGraph = DOTToGraph;

})(typeof util !== 'undefined' ? util : exports);

/**
 * Canvas shapes used by the Graph
 */
if (typeof CanvasRenderingContext2D !== 'undefined') {

  /**
   * Draw a circle shape
   */
  CanvasRenderingContext2D.prototype.circle = function(x, y, r) {
    this.beginPath();
    this.arc(x, y, r, 0, 2*Math.PI, false);
  };

  /**
   * Draw a square shape
   * @param {Number} x horizontal center
   * @param {Number} y vertical center
   * @param {Number} r   size, width and height of the square
   */
  CanvasRenderingContext2D.prototype.square = function(x, y, r) {
    this.beginPath();
    this.rect(x - r, y - r, r * 2, r * 2);
  };

  /**
   * Draw a triangle shape
   * @param {Number} x horizontal center
   * @param {Number} y vertical center
   * @param {Number} r   radius, half the length of the sides of the triangle
   */
  CanvasRenderingContext2D.prototype.triangle = function(x, y, r) {
    // http://en.wikipedia.org/wiki/Equilateral_triangle
    this.beginPath();

    var s = r * 2;
    var s2 = s / 2;
    var ir = Math.sqrt(3) / 6 * s;      // radius of inner circle
    var h = Math.sqrt(s * s - s2 * s2); // height

    this.moveTo(x, y - (h - ir));
    this.lineTo(x + s2, y + ir);
    this.lineTo(x - s2, y + ir);
    this.lineTo(x, y - (h - ir));
    this.closePath();
  };

  /**
   * Draw a triangle shape in downward orientation
   * @param {Number} x horizontal center
   * @param {Number} y vertical center
   * @param {Number} r radius
   */
  CanvasRenderingContext2D.prototype.triangleDown = function(x, y, r) {
    // http://en.wikipedia.org/wiki/Equilateral_triangle
    this.beginPath();

    var s = r * 2;
    var s2 = s / 2;
    var ir = Math.sqrt(3) / 6 * s;      // radius of inner circle
    var h = Math.sqrt(s * s - s2 * s2); // height

    this.moveTo(x, y + (h - ir));
    this.lineTo(x + s2, y - ir);
    this.lineTo(x - s2, y - ir);
    this.lineTo(x, y + (h - ir));
    this.closePath();
  };

  /**
   * Draw a star shape, a star with 5 points
   * @param {Number} x horizontal center
   * @param {Number} y vertical center
   * @param {Number} r   radius, half the length of the sides of the triangle
   */
  CanvasRenderingContext2D.prototype.star = function(x, y, r) {
    // http://www.html5canvastutorials.com/labs/html5-canvas-star-spinner/
    this.beginPath();

    for (var n = 0; n < 10; n++) {
      var radius = (n % 2 === 0) ? r * 1.3 : r * 0.5;
      this.lineTo(
          x + radius * Math.sin(n * 2 * Math.PI / 10),
          y - radius * Math.cos(n * 2 * Math.PI / 10)
      );
    }

    this.closePath();
  };

  /**
   * http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
   */
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    var r2d = Math.PI/180;
    if( w - ( 2 * r ) < 0 ) { r = ( w / 2 ); } //ensure that the radius isn't too large for x
    if( h - ( 2 * r ) < 0 ) { r = ( h / 2 ); } //ensure that the radius isn't too large for y
    this.beginPath();
    this.moveTo(x+r,y);
    this.lineTo(x+w-r,y);
    this.arc(x+w-r,y+r,r,r2d*270,r2d*360,false);
    this.lineTo(x+w,y+h-r);
    this.arc(x+w-r,y+h-r,r,0,r2d*90,false);
    this.lineTo(x+r,y+h);
    this.arc(x+r,y+h-r,r,r2d*90,r2d*180,false);
    this.lineTo(x,y+r);
    this.arc(x+r,y+r,r,r2d*180,r2d*270,false);
  };

  /**
   * http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
   */
  CanvasRenderingContext2D.prototype.ellipse = function(x, y, w, h) {
    var kappa = .5522848,
        ox = (w / 2) * kappa, // control point offset horizontal
        oy = (h / 2) * kappa, // control point offset vertical
        xe = x + w,           // x-end
        ye = y + h,           // y-end
        xm = x + w / 2,       // x-middle
        ym = y + h / 2;       // y-middle

    this.beginPath();
    this.moveTo(x, ym);
    this.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    this.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    this.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    this.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  };



  /**
   * http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
   */
  CanvasRenderingContext2D.prototype.database = function(x, y, w, h) {
    var f = 1/3;
    var wEllipse = w;
    var hEllipse = h * f;

    var kappa = .5522848,
        ox = (wEllipse / 2) * kappa, // control point offset horizontal
        oy = (hEllipse / 2) * kappa, // control point offset vertical
        xe = x + wEllipse,           // x-end
        ye = y + hEllipse,           // y-end
        xm = x + wEllipse / 2,       // x-middle
        ym = y + hEllipse / 2,       // y-middle
        ymb = y + (h - hEllipse/2),  // y-midlle, bottom ellipse
        yeb = y + h;                 // y-end, bottom ellipse

    this.beginPath();
    this.moveTo(xe, ym);

    this.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    this.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

    this.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    this.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);

    this.lineTo(xe, ymb);

    this.bezierCurveTo(xe, ymb + oy, xm + ox, yeb, xm, yeb);
    this.bezierCurveTo(xm - ox, yeb, x, ymb + oy, x, ymb);

    this.lineTo(x, ym);
  };


  /**
   * Draw an arrow point (no line)
   */
  CanvasRenderingContext2D.prototype.arrow = function(x, y, angle, length) {
    // tail
    var xt = x - length * Math.cos(angle);
    var yt = y - length * Math.sin(angle);

    // inner tail
    // TODO: allow to customize different shapes
    var xi = x - length * 0.9 * Math.cos(angle);
    var yi = y - length * 0.9 * Math.sin(angle);

    // left
    var xl = xt + length / 3 * Math.cos(angle + 0.5 * Math.PI);
    var yl = yt + length / 3 * Math.sin(angle + 0.5 * Math.PI);

    // right
    var xr = xt + length / 3 * Math.cos(angle - 0.5 * Math.PI);
    var yr = yt + length / 3 * Math.sin(angle - 0.5 * Math.PI);

    this.beginPath();
    this.moveTo(x, y);
    this.lineTo(xl, yl);
    this.lineTo(xi, yi);
    this.lineTo(xr, yr);
    this.closePath();
  };

  /**
   * Sets up the dashedLine functionality for drawing
   * Original code came from http://stackoverflow.com/questions/4576724/dotted-stroke-in-canvas
   * @author David Jordan
   * @date 2012-08-08
   */
  CanvasRenderingContext2D.prototype.dashedLine = function(x,y,x2,y2,dashArray){
    if (!dashArray) dashArray=[10,5];
    if (dashLength==0) dashLength = 0.001; // Hack for Safari
    var dashCount = dashArray.length;
    this.moveTo(x, y);
    var dx = (x2-x), dy = (y2-y);
    var slope = dy/dx;
    var distRemaining = Math.sqrt( dx*dx + dy*dy );
    var dashIndex=0, draw=true;
    while (distRemaining>=0.1){
      var dashLength = dashArray[dashIndex++%dashCount];
      if (dashLength > distRemaining) dashLength = distRemaining;
      var xStep = Math.sqrt( dashLength*dashLength / (1 + slope*slope) );
      if (dx<0) xStep = -xStep;
      x += xStep;
      y += slope*xStep;
      this[draw ? 'lineTo' : 'moveTo'](x,y);
      distRemaining -= dashLength;
      draw = !draw;
    }
  };

  // TODO: add diamond shape
}

/**
 * @class Node
 * A node. A node can be connected to other nodes via one or multiple edges.
 * @param {object} properties An object containing properties for the node. All
 *                            properties are optional, except for the id.
 *                              {number} id     Id of the node. Required
 *                              {string} label  Text label for the node
 *                              {number} x      Horizontal position of the node
 *                              {number} y      Vertical position of the node
 *                              {string} shape  Node shape, available:
 *                                              "database", "circle", "ellipse",
 *                                              "box", "image", "text", "dot",
 *                                              "star", "triangle", "triangleDown",
 *                                              "square"
 *                              {string} image  An image url
 *                              {string} title  An title text, can be HTML
 *                              {anytype} group A group name or number
 * @param {Graph.Images} imagelist    A list with images. Only needed
 *                                            when the node has an image
 * @param {Graph.Groups} grouplist    A list with groups. Needed for
 *                                            retrieving group properties
 * @param {Object}               constants    An object with default values for
 *                                            example for the color
 *
 */
function Node(properties, imagelist, grouplist, constants) {
  this.selected = false;

  this.edges = []; // all edges connected to this node
  this.dynamicEdges = [];
  this.reroutedEdges = {};
  this.group = constants.nodes.group;

  this.fontSize = constants.nodes.fontSize;
  this.fontFace = constants.nodes.fontFace;
  this.fontColor = constants.nodes.fontColor;
  this.fontDrawThreshold = 3;

  this.color = constants.nodes.color;

  // set defaults for the properties
  this.id = undefined;
  this.shape = constants.nodes.shape;
  this.image = constants.nodes.image;
  this.x = null;
  this.y = null;
  this.xFixed = false;
  this.yFixed = false;
  this.horizontalAlignLeft = true; // these are for the navigation controls
  this.verticalAlignTop    = true; // these are for the navigation controls
  this.radius = constants.nodes.radius;
  this.baseRadiusValue = constants.nodes.radius;
  this.radiusFixed = false;
  this.radiusMin = constants.nodes.radiusMin;
  this.radiusMax = constants.nodes.radiusMax;
  this.level = -1;
  this.preassignedLevel = false;


  this.imagelist = imagelist;
  this.grouplist = grouplist;

  // physics properties
  this.fx = 0.0;  // external force x
  this.fy = 0.0;  // external force y
  this.vx = 0.0;  // velocity x
  this.vy = 0.0;  // velocity y
  this.minForce = constants.minForce;
  this.damping = constants.physics.damping;
  this.mass = 1;  // kg
  this.fixedData = {x:null,y:null};

  this.setProperties(properties, constants);

  // creating the variables for clustering
  this.resetCluster();
  this.dynamicEdgesLength = 0;
  this.clusterSession = 0;
  this.clusterSizeWidthFactor  = constants.clustering.nodeScaling.width;
  this.clusterSizeHeightFactor = constants.clustering.nodeScaling.height;
  this.clusterSizeRadiusFactor = constants.clustering.nodeScaling.radius;
  this.maxNodeSizeIncrements = constants.clustering.maxNodeSizeIncrements;
  this.growthIndicator = 0;

  // variables to tell the node about the graph.
  this.graphScaleInv = 1;
  this.graphScale = 1;
  this.canvasTopLeft = {"x": -300, "y": -300};
  this.canvasBottomRight = {"x":  300, "y":  300};
  this.parentEdgeId = null;
}

/**
 * (re)setting the clustering variables and objects
 */
Node.prototype.resetCluster = function() {
  // clustering variables
  this.formationScale = undefined; // this is used to determine when to open the cluster
  this.clusterSize = 1;            // this signifies the total amount of nodes in this cluster
  this.containedNodes = {};
  this.containedEdges = {};
  this.clusterSessions = [];
};

/**
 * Attach a edge to the node
 * @param {Edge} edge
 */
Node.prototype.attachEdge = function(edge) {
  if (this.edges.indexOf(edge) == -1) {
    this.edges.push(edge);
  }
  if (this.dynamicEdges.indexOf(edge) == -1) {
    this.dynamicEdges.push(edge);
  }
  this.dynamicEdgesLength = this.dynamicEdges.length;
};

/**
 * Detach a edge from the node
 * @param {Edge} edge
 */
Node.prototype.detachEdge = function(edge) {
  var index = this.edges.indexOf(edge);
  if (index != -1) {
    this.edges.splice(index, 1);
    this.dynamicEdges.splice(index, 1);
  }
  this.dynamicEdgesLength = this.dynamicEdges.length;
};


/**
 * Set or overwrite properties for the node
 * @param {Object} properties an object with properties
 * @param {Object} constants  and object with default, global properties
 */
Node.prototype.setProperties = function(properties, constants) {
  if (!properties) {
    return;
  }
  this.originalLabel = undefined;
  // basic properties
  if (properties.id !== undefined)        {this.id = properties.id;}
  if (properties.label !== undefined)     {this.label = properties.label; this.originalLabel = properties.label;}
  if (properties.title !== undefined)     {this.title = properties.title;}
  if (properties.group !== undefined)     {this.group = properties.group;}
  if (properties.x !== undefined)         {this.x = properties.x;}
  if (properties.y !== undefined)         {this.y = properties.y;}
  if (properties.value !== undefined)     {this.value = properties.value;}
  if (properties.level !== undefined)     {this.level = properties.level; this.preassignedLevel = true;}


  // physics
  if (properties.mass !== undefined)                {this.mass = properties.mass;}

  // navigation controls properties
  if (properties.horizontalAlignLeft !== undefined) {this.horizontalAlignLeft = properties.horizontalAlignLeft;}
  if (properties.verticalAlignTop    !== undefined) {this.verticalAlignTop    = properties.verticalAlignTop;}
  if (properties.triggerFunction     !== undefined) {this.triggerFunction     = properties.triggerFunction;}

  if (this.id === undefined) {
    throw "Node must have an id";
  }

  // copy group properties
  if (this.group) {
    var groupObj = this.grouplist.get(this.group);
    for (var prop in groupObj) {
      if (groupObj.hasOwnProperty(prop)) {
        this[prop] = groupObj[prop];
      }
    }
  }

  // individual shape properties
  if (properties.shape !== undefined)          {this.shape = properties.shape;}
  if (properties.image !== undefined)          {this.image = properties.image;}
  if (properties.radius !== undefined)         {this.radius = properties.radius;}
  if (properties.color !== undefined)          {this.color = util.parseColor(properties.color);}

  if (properties.fontColor !== undefined)      {this.fontColor = properties.fontColor;}
  if (properties.fontSize !== undefined)       {this.fontSize = properties.fontSize;}
  if (properties.fontFace !== undefined)       {this.fontFace = properties.fontFace;}

  if (this.image !== undefined && this.image != "") {
    if (this.imagelist) {
      this.imageObj = this.imagelist.load(this.image);
    }
    else {
      throw "No imagelist provided";
    }
  }

  this.xFixed = this.xFixed || (properties.x !== undefined && !properties.allowedToMoveX);
  this.yFixed = this.yFixed || (properties.y !== undefined && !properties.allowedToMoveY);
  this.radiusFixed = this.radiusFixed || (properties.radius !== undefined);

  if (this.shape == 'image') {
    this.radiusMin = constants.nodes.widthMin;
    this.radiusMax = constants.nodes.widthMax;
  }

  // choose draw method depending on the shape
  switch (this.shape) {
    case 'database':      this.draw = this._drawDatabase; this.resize = this._resizeDatabase; break;
    case 'box':           this.draw = this._drawBox; this.resize = this._resizeBox; break;
    case 'circle':        this.draw = this._drawCircle; this.resize = this._resizeCircle; break;
    case 'ellipse':       this.draw = this._drawEllipse; this.resize = this._resizeEllipse; break;
    // TODO: add diamond shape
    case 'image':         this.draw = this._drawImage; this.resize = this._resizeImage; break;
    case 'text':          this.draw = this._drawText; this.resize = this._resizeText; break;
    case 'dot':           this.draw = this._drawDot; this.resize = this._resizeShape; break;
    case 'square':        this.draw = this._drawSquare; this.resize = this._resizeShape; break;
    case 'triangle':      this.draw = this._drawTriangle; this.resize = this._resizeShape; break;
    case 'triangleDown':  this.draw = this._drawTriangleDown; this.resize = this._resizeShape; break;
    case 'star':          this.draw = this._drawStar; this.resize = this._resizeShape; break;
    default:              this.draw = this._drawEllipse; this.resize = this._resizeEllipse; break;
  }
  // reset the size of the node, this can be changed
  this._reset();
};

/**
 * select this node
 */
Node.prototype.select = function() {
  this.selected = true;
  this._reset();
};

/**
 * unselect this node
 */
Node.prototype.unselect = function() {
  this.selected = false;
  this._reset();
};


/**
 * Reset the calculated size of the node, forces it to recalculate its size
 */
Node.prototype.clearSizeCache = function() {
  this._reset();
};

/**
 * Reset the calculated size of the node, forces it to recalculate its size
 * @private
 */
Node.prototype._reset = function() {
  this.width = undefined;
  this.height = undefined;
};

/**
 * get the title of this node.
 * @return {string} title    The title of the node, or undefined when no title
 *                           has been set.
 */
Node.prototype.getTitle = function() {
  return typeof this.title === "function" ? this.title() : this.title;
};

/**
 * Calculate the distance to the border of the Node
 * @param {CanvasRenderingContext2D}   ctx
 * @param {Number} angle        Angle in radians
 * @returns {number} distance   Distance to the border in pixels
 */
Node.prototype.distanceToBorder = function (ctx, angle) {
  var borderWidth = 1;

  if (!this.width) {
    this.resize(ctx);
  }

  switch (this.shape) {
    case 'circle':
    case 'dot':
      return this.radius + borderWidth;

    case 'ellipse':
      var a = this.width / 2;
      var b = this.height / 2;
      var w = (Math.sin(angle) * a);
      var h = (Math.cos(angle) * b);
      return a * b / Math.sqrt(w * w + h * h);

    // TODO: implement distanceToBorder for database
    // TODO: implement distanceToBorder for triangle
    // TODO: implement distanceToBorder for triangleDown

    case 'box':
    case 'image':
    case 'text':
    default:
      if (this.width) {
        return Math.min(
            Math.abs(this.width / 2 / Math.cos(angle)),
            Math.abs(this.height / 2 / Math.sin(angle))) + borderWidth;
        // TODO: reckon with border radius too in case of box
      }
      else {
        return 0;
      }

  }
  // TODO: implement calculation of distance to border for all shapes
};

/**
 * Set forces acting on the node
 * @param {number} fx   Force in horizontal direction
 * @param {number} fy   Force in vertical direction
 */
Node.prototype._setForce = function(fx, fy) {
  this.fx = fx;
  this.fy = fy;
};

/**
 * Add forces acting on the node
 * @param {number} fx   Force in horizontal direction
 * @param {number} fy   Force in vertical direction
 * @private
 */
Node.prototype._addForce = function(fx, fy) {
  this.fx += fx;
  this.fy += fy;
};

/**
 * Perform one discrete step for the node
 * @param {number} interval    Time interval in seconds
 */
Node.prototype.discreteStep = function(interval) {
  if (!this.xFixed) {
    var dx   = this.damping * this.vx;     // damping force
    var ax   = (this.fx - dx) / this.mass;  // acceleration
    this.vx += ax * interval;               // velocity
    this.x  += this.vx * interval;          // position
  }

  if (!this.yFixed) {
    var dy   = this.damping * this.vy;     // damping force
    var ay   = (this.fy - dy) / this.mass;  // acceleration
    this.vy += ay * interval;               // velocity
    this.y  += this.vy * interval;          // position
  }
};



/**
 * Perform one discrete step for the node
 * @param {number} interval    Time interval in seconds
 * @param {number} maxVelocity The speed limit imposed on the velocity
 */
Node.prototype.discreteStepLimited = function(interval, maxVelocity) {
  if (!this.xFixed) {
    var dx   = this.damping * this.vx;     // damping force
    var ax   = (this.fx - dx) / this.mass;  // acceleration
    this.vx += ax * interval;               // velocity
    this.vx = (Math.abs(this.vx) > maxVelocity) ? ((this.vx > 0) ? maxVelocity : -maxVelocity) : this.vx;
    this.x  += this.vx * interval;          // position
  }
  else {
    this.fx = 0;
  }

  if (!this.yFixed) {
    var dy   = this.damping * this.vy;     // damping force
    var ay   = (this.fy - dy) / this.mass;  // acceleration
    this.vy += ay * interval;               // velocity
    this.vy = (Math.abs(this.vy) > maxVelocity) ? ((this.vy > 0) ? maxVelocity : -maxVelocity) : this.vy;
    this.y  += this.vy * interval;          // position
  }
  else {
    this.fy = 0;
  }
};

/**
 * Check if this node has a fixed x and y position
 * @return {boolean}      true if fixed, false if not
 */
Node.prototype.isFixed = function() {
  return (this.xFixed && this.yFixed);
};

/**
 * Check if this node is moving
 * @param {number} vmin   the minimum velocity considered as "moving"
 * @return {boolean}      true if moving, false if it has no velocity
 */
// TODO: replace this method with calculating the kinetic energy
Node.prototype.isMoving = function(vmin) {
  return (Math.abs(this.vx) > vmin || Math.abs(this.vy) > vmin);
};

/**
 * check if this node is selecte
 * @return {boolean} selected   True if node is selected, else false
 */
Node.prototype.isSelected = function() {
  return this.selected;
};

/**
 * Retrieve the value of the node. Can be undefined
 * @return {Number} value
 */
Node.prototype.getValue = function() {
  return this.value;
};

/**
 * Calculate the distance from the nodes location to the given location (x,y)
 * @param {Number} x
 * @param {Number} y
 * @return {Number} value
 */
Node.prototype.getDistance = function(x, y) {
  var dx = this.x - x,
      dy = this.y - y;
  return Math.sqrt(dx * dx + dy * dy);
};


/**
 * Adjust the value range of the node. The node will adjust it's radius
 * based on its value.
 * @param {Number} min
 * @param {Number} max
 */
Node.prototype.setValueRange = function(min, max) {
  if (!this.radiusFixed && this.value !== undefined) {
    if (max == min) {
      this.radius = (this.radiusMin + this.radiusMax) / 2;
    }
    else {
      var scale = (this.radiusMax - this.radiusMin) / (max - min);
      this.radius = (this.value - min) * scale + this.radiusMin;
    }
  }
  this.baseRadiusValue = this.radius;
};

/**
 * Draw this node in the given canvas
 * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
 * @param {CanvasRenderingContext2D}   ctx
 */
Node.prototype.draw = function(ctx) {
  throw "Draw method not initialized for node";
};

/**
 * Recalculate the size of this node in the given canvas
 * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
 * @param {CanvasRenderingContext2D}   ctx
 */
Node.prototype.resize = function(ctx) {
  throw "Resize method not initialized for node";
};

/**
 * Check if this object is overlapping with the provided object
 * @param {Object} obj   an object with parameters left, top, right, bottom
 * @return {boolean}     True if location is located on node
 */
Node.prototype.isOverlappingWith = function(obj) {
  return (this.left              < obj.right  &&
          this.left + this.width > obj.left   &&
          this.top               < obj.bottom &&
          this.top + this.height > obj.top);
};

Node.prototype._resizeImage = function (ctx) {
  // TODO: pre calculate the image size

  if (!this.width || !this.height) {  // undefined or 0
    var width, height;
    if (this.value) {
      this.radius = this.baseRadiusValue;
      var scale = this.imageObj.height / this.imageObj.width;
      if (scale !== undefined) {
        width = this.radius || this.imageObj.width;
        height = this.radius * scale || this.imageObj.height;
      }
      else {
        width = 0;
        height = 0;
      }
    }
    else {
      width = this.imageObj.width;
      height = this.imageObj.height;
    }
    this.width  = width;
    this.height = height;

    this.growthIndicator = 0;
    if (this.width > 0 && this.height > 0) {
      this.width  += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements)  * this.clusterSizeWidthFactor;
      this.height += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeHeightFactor;
      this.radius += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeRadiusFactor;
      this.growthIndicator = this.width - width;
    }
  }

};

Node.prototype._drawImage = function (ctx) {
  this._resizeImage(ctx);

  this.left   = this.x - this.width / 2;
  this.top    = this.y - this.height / 2;

  var yLabel;
  if (this.imageObj.width != 0 ) {
    // draw the shade
    if (this.clusterSize > 1) {
      var lineWidth = ((this.clusterSize > 1) ? 10 : 0.0);
      lineWidth *= this.graphScaleInv;
      lineWidth = Math.min(0.2 * this.width,lineWidth);

      ctx.globalAlpha = 0.5;
      ctx.drawImage(this.imageObj, this.left - lineWidth, this.top - lineWidth, this.width + 2*lineWidth, this.height + 2*lineWidth);
    }

    // draw the image
    ctx.globalAlpha = 1.0;
    ctx.drawImage(this.imageObj, this.left, this.top, this.width, this.height);
    yLabel = this.y + this.height / 2;
  }
  else {
    // image still loading... just draw the label for now
    yLabel = this.y;
  }

  this._label(ctx, this.label, this.x, yLabel, undefined, "top");
};


Node.prototype._resizeBox = function (ctx) {
  if (!this.width) {
    var margin = 5;
    var textSize = this.getTextSize(ctx);
    this.width = textSize.width + 2 * margin;
    this.height = textSize.height + 2 * margin;

    this.width  += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * 0.5 * this.clusterSizeWidthFactor;
    this.height += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * 0.5 * this.clusterSizeHeightFactor;
    this.growthIndicator = this.width - (textSize.width + 2 * margin);
//    this.radius += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * 0.5 * this.clusterSizeRadiusFactor;

  }
};

Node.prototype._drawBox = function (ctx) {
  this._resizeBox(ctx);

  this.left = this.x - this.width / 2;
  this.top = this.y - this.height / 2;

  var clusterLineWidth = 2.5;
  var selectionLineWidth = 2;

  ctx.strokeStyle = this.selected ? this.color.highlight.border : this.color.border;

  // draw the outer border
  if (this.clusterSize > 1) {
    ctx.lineWidth = (this.selected ? selectionLineWidth : 1.0) + ((this.clusterSize > 1) ? clusterLineWidth : 0.0);
    ctx.lineWidth *= this.graphScaleInv;
    ctx.lineWidth = Math.min(0.1 * this.width,ctx.lineWidth);

    ctx.roundRect(this.left-2*ctx.lineWidth, this.top-2*ctx.lineWidth, this.width+4*ctx.lineWidth, this.height+4*ctx.lineWidth, this.radius);
    ctx.stroke();
  }
  ctx.lineWidth = (this.selected ? selectionLineWidth : 1.0) + ((this.clusterSize > 1) ? clusterLineWidth : 0.0);
  ctx.lineWidth *= this.graphScaleInv;
  ctx.lineWidth = Math.min(0.1 * this.width,ctx.lineWidth);

  ctx.fillStyle = this.selected ? this.color.highlight.background : this.color.background;

  ctx.roundRect(this.left, this.top, this.width, this.height, this.radius);
  ctx.fill();
  ctx.stroke();

  this._label(ctx, this.label, this.x, this.y);
};


Node.prototype._resizeDatabase = function (ctx) {
  if (!this.width) {
    var margin = 5;
    var textSize = this.getTextSize(ctx);
    var size = textSize.width + 2 * margin;
    this.width = size;
    this.height = size;

    // scaling used for clustering
    this.width  += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeWidthFactor;
    this.height += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeHeightFactor;
    this.radius += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeRadiusFactor;
    this.growthIndicator = this.width - size;
  }
};

Node.prototype._drawDatabase = function (ctx) {
  this._resizeDatabase(ctx);
  this.left = this.x - this.width / 2;
  this.top = this.y - this.height / 2;

  var clusterLineWidth = 2.5;
  var selectionLineWidth = 2;

  ctx.strokeStyle = this.selected ? this.color.highlight.border : this.color.border;

  // draw the outer border
  if (this.clusterSize > 1) {
    ctx.lineWidth = (this.selected ? selectionLineWidth : 1.0) + ((this.clusterSize > 1) ? clusterLineWidth : 0.0);
    ctx.lineWidth *= this.graphScaleInv;
    ctx.lineWidth = Math.min(0.1 * this.width,ctx.lineWidth);

    ctx.database(this.x - this.width/2 - 2*ctx.lineWidth, this.y - this.height*0.5 - 2*ctx.lineWidth, this.width + 4*ctx.lineWidth, this.height + 4*ctx.lineWidth);
    ctx.stroke();
  }
  ctx.lineWidth = (this.selected ? selectionLineWidth : 1.0) + ((this.clusterSize > 1) ? clusterLineWidth : 0.0);
  ctx.lineWidth *= this.graphScaleInv;
  ctx.lineWidth = Math.min(0.1 * this.width,ctx.lineWidth);

  ctx.fillStyle = this.selected ? this.color.highlight.background : this.color.background;
  ctx.database(this.x - this.width/2, this.y - this.height*0.5, this.width, this.height);
  ctx.fill();
  ctx.stroke();

  this._label(ctx, this.label, this.x, this.y);
};


Node.prototype._resizeCircle = function (ctx) {
  if (!this.width) {
    var margin = 5;
    var textSize = this.getTextSize(ctx);
    var diameter = Math.max(textSize.width, textSize.height) + 2 * margin;
    this.radius = diameter / 2;

    this.width = diameter;
    this.height = diameter;

    // scaling used for clustering
//    this.width  += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * 0.5 * this.clusterSizeWidthFactor;
//    this.height += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * 0.5 * this.clusterSizeHeightFactor;
    this.radius += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * 0.5 * this.clusterSizeRadiusFactor;
    this.growthIndicator = this.radius - 0.5*diameter;
  }
};

Node.prototype._drawCircle = function (ctx) {
  this._resizeCircle(ctx);
  this.left = this.x - this.width / 2;
  this.top = this.y - this.height / 2;

  var clusterLineWidth = 2.5;
  var selectionLineWidth = 2;

  ctx.strokeStyle = this.selected ? this.color.highlight.border : this.color.border;

  // draw the outer border
  if (this.clusterSize > 1) {
    ctx.lineWidth = (this.selected ? selectionLineWidth : 1.0) + ((this.clusterSize > 1) ? clusterLineWidth : 0.0);
    ctx.lineWidth *= this.graphScaleInv;
    ctx.lineWidth = Math.min(0.1 * this.width,ctx.lineWidth);

    ctx.circle(this.x, this.y, this.radius+2*ctx.lineWidth);
    ctx.stroke();
  }
  ctx.lineWidth = (this.selected ? selectionLineWidth : 1.0) + ((this.clusterSize > 1) ? clusterLineWidth : 0.0);
  ctx.lineWidth *= this.graphScaleInv;
  ctx.lineWidth = Math.min(0.1 * this.width,ctx.lineWidth);

  ctx.fillStyle = this.selected ? this.color.highlight.background : this.color.background;
  ctx.circle(this.x, this.y, this.radius);
  ctx.fill();
  ctx.stroke();

  this._label(ctx, this.label, this.x, this.y);
};

Node.prototype._resizeEllipse = function (ctx) {
  if (!this.width) {
    var textSize = this.getTextSize(ctx);

    this.width = textSize.width * 1.5;
    this.height = textSize.height * 2;
    if (this.width < this.height) {
      this.width = this.height;
    }
    var defaultSize = this.width;

      // scaling used for clustering
    this.width  += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeWidthFactor;
    this.height += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeHeightFactor;
    this.radius += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeRadiusFactor;
    this.growthIndicator = this.width - defaultSize;
  }
};

Node.prototype._drawEllipse = function (ctx) {
  this._resizeEllipse(ctx);
  this.left = this.x - this.width / 2;
  this.top = this.y - this.height / 2;

  var clusterLineWidth = 2.5;
  var selectionLineWidth = 2;

  ctx.strokeStyle = this.selected ? this.color.highlight.border : this.color.border;

  // draw the outer border
  if (this.clusterSize > 1) {
    ctx.lineWidth = (this.selected ? selectionLineWidth : 1.0) + ((this.clusterSize > 1) ? clusterLineWidth : 0.0);
    ctx.lineWidth *= this.graphScaleInv;
    ctx.lineWidth = Math.min(0.1 * this.width,ctx.lineWidth);

    ctx.ellipse(this.left-2*ctx.lineWidth, this.top-2*ctx.lineWidth, this.width+4*ctx.lineWidth, this.height+4*ctx.lineWidth);
    ctx.stroke();
  }
  ctx.lineWidth = (this.selected ? selectionLineWidth : 1.0) + ((this.clusterSize > 1) ? clusterLineWidth : 0.0);
  ctx.lineWidth *= this.graphScaleInv;
  ctx.lineWidth = Math.min(0.1 * this.width,ctx.lineWidth);

  ctx.fillStyle = this.selected ? this.color.highlight.background : this.color.background;

  ctx.ellipse(this.left, this.top, this.width, this.height);
  ctx.fill();
  ctx.stroke();
  this._label(ctx, this.label, this.x, this.y);
};

Node.prototype._drawDot = function (ctx) {
  this._drawShape(ctx, 'circle');
};

Node.prototype._drawTriangle = function (ctx) {
  this._drawShape(ctx, 'triangle');
};

Node.prototype._drawTriangleDown = function (ctx) {
  this._drawShape(ctx, 'triangleDown');
};

Node.prototype._drawSquare = function (ctx) {
  this._drawShape(ctx, 'square');
};

Node.prototype._drawStar = function (ctx) {
  this._drawShape(ctx, 'star');
};

Node.prototype._resizeShape = function (ctx) {
  if (!this.width) {
    this.radius = this.baseRadiusValue;
    var size = 2 * this.radius;
    this.width = size;
    this.height = size;

    // scaling used for clustering
    this.width  += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeWidthFactor;
    this.height += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeHeightFactor;
    this.radius += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * 0.5 * this.clusterSizeRadiusFactor;
    this.growthIndicator = this.width - size;
  }
};

Node.prototype._drawShape = function (ctx, shape) {
  this._resizeShape(ctx);

  this.left = this.x - this.width / 2;
  this.top = this.y - this.height / 2;

  var clusterLineWidth = 2.5;
  var selectionLineWidth = 2;
  var radiusMultiplier = 2;

  // choose draw method depending on the shape
  switch (shape) {
    case 'dot':           radiusMultiplier = 2; break;
    case 'square':        radiusMultiplier = 2; break;
    case 'triangle':      radiusMultiplier = 3; break;
    case 'triangleDown':  radiusMultiplier = 3; break;
    case 'star':          radiusMultiplier = 4; break;
  }

  ctx.strokeStyle = this.selected ? this.color.highlight.border : this.color.border;

  // draw the outer border
  if (this.clusterSize > 1) {
    ctx.lineWidth = (this.selected ? selectionLineWidth : 1.0) + ((this.clusterSize > 1) ? clusterLineWidth : 0.0);
    ctx.lineWidth *= this.graphScaleInv;
    ctx.lineWidth = Math.min(0.1 * this.width,ctx.lineWidth);

    ctx[shape](this.x, this.y, this.radius + radiusMultiplier * ctx.lineWidth);
    ctx.stroke();
  }
  ctx.lineWidth = (this.selected ? selectionLineWidth : 1.0) + ((this.clusterSize > 1) ? clusterLineWidth : 0.0);
  ctx.lineWidth *= this.graphScaleInv;
  ctx.lineWidth = Math.min(0.1 * this.width,ctx.lineWidth);

  ctx.fillStyle = this.selected ? this.color.highlight.background : this.color.background;

  ctx[shape](this.x, this.y, this.radius);
  ctx.fill();
  ctx.stroke();

  if (this.label) {
    this._label(ctx, this.label, this.x, this.y + this.height / 2, undefined, 'top');
  }
};

Node.prototype._resizeText = function (ctx) {
  if (!this.width) {
    var margin = 5;
    var textSize = this.getTextSize(ctx);
    this.width = textSize.width + 2 * margin;
    this.height = textSize.height + 2 * margin;

    // scaling used for clustering
    this.width  += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeWidthFactor;
    this.height += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeHeightFactor;
    this.radius += Math.min(this.clusterSize - 1, this.maxNodeSizeIncrements) * this.clusterSizeRadiusFactor;
    this.growthIndicator = this.width - (textSize.width + 2 * margin);
  }
};

Node.prototype._drawText = function (ctx) {
  this._resizeText(ctx);
  this.left = this.x - this.width / 2;
  this.top = this.y - this.height / 2;

  this._label(ctx, this.label, this.x, this.y);
};


Node.prototype._label = function (ctx, text, x, y, align, baseline) {
  if (text && this.fontSize * this.graphScale > this.fontDrawThreshold) {
    ctx.font = (this.selected ? "bold " : "") + this.fontSize + "px " + this.fontFace;
    ctx.fillStyle = this.fontColor || "black";
    ctx.textAlign = align || "center";
    ctx.textBaseline = baseline || "middle";

    var lines = text.split('\n'),
        lineCount = lines.length,
        fontSize = (this.fontSize + 4),
        yLine = y + (1 - lineCount) / 2 * fontSize;

    for (var i = 0; i < lineCount; i++) {
      ctx.fillText(lines[i], x, yLine);
      yLine += fontSize;
    }
  }
};


Node.prototype.getTextSize = function(ctx) {
  if (this.label !== undefined) {
    ctx.font = (this.selected ? "bold " : "") + this.fontSize + "px " + this.fontFace;

    var lines = this.label.split('\n'),
        height = (this.fontSize + 4) * lines.length,
        width = 0;

    for (var i = 0, iMax = lines.length; i < iMax; i++) {
      width = Math.max(width, ctx.measureText(lines[i]).width);
    }

    return {"width": width, "height": height};
  }
  else {
    return {"width": 0, "height": 0};
  }
};

/**
 * this is used to determine if a node is visible at all. this is used to determine when it needs to be drawn.
 * there is a safety margin of 0.3 * width;
 *
 * @returns {boolean}
 */
Node.prototype.inArea = function() {
  if (this.width !== undefined) {
  return (this.x + this.width*this.graphScaleInv  >= this.canvasTopLeft.x    &&
          this.x - this.width*this.graphScaleInv  <  this.canvasBottomRight.x &&
          this.y + this.height*this.graphScaleInv >= this.canvasTopLeft.y    &&
          this.y - this.height*this.graphScaleInv <  this.canvasBottomRight.y);
  }
  else {
    return true;
  }
};

/**
 * checks if the core of the node is in the display area, this is used for opening clusters around zoom
 * @returns {boolean}
 */
Node.prototype.inView = function() {
  return (this.x >= this.canvasTopLeft.x    &&
          this.x < this.canvasBottomRight.x &&
          this.y >= this.canvasTopLeft.y    &&
          this.y < this.canvasBottomRight.y);
};

/**
 * This allows the zoom level of the graph to influence the rendering
 * We store the inverted scale and the coordinates of the top left, and bottom right points of the canvas
 *
 * @param scale
 * @param canvasTopLeft
 * @param canvasBottomRight
 */
Node.prototype.setScaleAndPos = function(scale,canvasTopLeft,canvasBottomRight) {
  this.graphScaleInv = 1.0/scale;
  this.graphScale = scale;
  this.canvasTopLeft = canvasTopLeft;
  this.canvasBottomRight = canvasBottomRight;
};


/**
 * This allows the zoom level of the graph to influence the rendering
 *
 * @param scale
 */
Node.prototype.setScale = function(scale) {
  this.graphScaleInv = 1.0/scale;
  this.graphScale = scale;
};



/**
 * set the velocity at 0. Is called when this node is contained in another during clustering
 */
Node.prototype.clearVelocity = function() {
  this.vx = 0;
  this.vy = 0;
};


/**
 * Basic preservation of (kinectic) energy
 *
 * @param massBeforeClustering
 */
Node.prototype.updateVelocity = function(massBeforeClustering) {
  var energyBefore = this.vx * this.vx * massBeforeClustering;
  //this.vx = (this.vx < 0) ? -Math.sqrt(energyBefore/this.mass) : Math.sqrt(energyBefore/this.mass);
  this.vx = Math.sqrt(energyBefore/this.mass);
  energyBefore = this.vy * this.vy * massBeforeClustering;
  //this.vy = (this.vy < 0) ? -Math.sqrt(energyBefore/this.mass) : Math.sqrt(energyBefore/this.mass);
  this.vy = Math.sqrt(energyBefore/this.mass);
};


/**
 * @class Edge
 *
 * A edge connects two nodes
 * @param {Object} properties     Object with properties. Must contain
 *                                At least properties from and to.
 *                                Available properties: from (number),
 *                                to (number), label (string, color (string),
 *                                width (number), style (string),
 *                                length (number), title (string)
 * @param {Graph} graph A graph object, used to find and edge to
 *                                nodes.
 * @param {Object} constants      An object with default values for
 *                                example for the color
 */
function Edge (properties, graph, constants) {
  if (!graph) {
    throw "No graph provided";
  }
  this.graph = graph;

  // initialize constants
  this.widthMin = constants.edges.widthMin;
  this.widthMax = constants.edges.widthMax;

  // initialize variables
  this.id     = undefined;
  this.fromId = undefined;
  this.toId   = undefined;
  this.style  = constants.edges.style;
  this.title  = undefined;
  this.width  = constants.edges.width;
  this.value  = undefined;
  this.length = constants.physics.springLength;
  this.customLength = false;
  this.selected = false;
  this.smooth = constants.smoothCurves;
  this.arrowScaleFactor = constants.edges.arrowScaleFactor;

  this.from = null;   // a node
  this.to = null;     // a node
  this.via = null;    // a temp node

  // we use this to be able to reconnect the edge to a cluster if its node is put into a cluster
  // by storing the original information we can revert to the original connection when the cluser is opened.
  this.originalFromId = [];
  this.originalToId = [];

  this.connected = false;

  // Added to support dashed lines
  // David Jordan
  // 2012-08-08
  this.dash = util.extend({}, constants.edges.dash); // contains properties length, gap, altLength

  this.color       = {color:constants.edges.color.color,
                      highlight:constants.edges.color.highlight};
  this.widthFixed  = false;
  this.lengthFixed = false;

  this.setProperties(properties, constants);
}

/**
 * Set or overwrite properties for the edge
 * @param {Object} properties  an object with properties
 * @param {Object} constants   and object with default, global properties
 */
Edge.prototype.setProperties = function(properties, constants) {
  if (!properties) {
    return;
  }

  if (properties.from !== undefined)           {this.fromId = properties.from;}
  if (properties.to !== undefined)             {this.toId = properties.to;}

  if (properties.id !== undefined)             {this.id = properties.id;}
  if (properties.style !== undefined)          {this.style = properties.style;}
  if (properties.label !== undefined)          {this.label = properties.label;}

  if (this.label) {
    this.fontSize = constants.edges.fontSize;
    this.fontFace = constants.edges.fontFace;
    this.fontColor = constants.edges.fontColor;
    this.fontFill = constants.edges.fontFill;

    if (properties.fontColor !== undefined)  {this.fontColor = properties.fontColor;}
    if (properties.fontSize !== undefined)   {this.fontSize = properties.fontSize;}
    if (properties.fontFace !== undefined)   {this.fontFace = properties.fontFace;}
    if (properties.fontFill !== undefined)   {this.fontFill = properties.fontFill;}
  }

  if (properties.title !== undefined)        {this.title = properties.title;}
  if (properties.width !== undefined)        {this.width = properties.width;}
  if (properties.value !== undefined)        {this.value = properties.value;}
  if (properties.length !== undefined)       {this.length = properties.length;
                                              this.customLength = true;}

  // scale the arrow
  if (properties.arrowScaleFactor !== undefined)       {this.arrowScaleFactor = properties.arrowScaleFactor;}

  // Added to support dashed lines
  // David Jordan
  // 2012-08-08
  if (properties.dash) {
    if (properties.dash.length !== undefined)    {this.dash.length = properties.dash.length;}
    if (properties.dash.gap !== undefined)       {this.dash.gap = properties.dash.gap;}
    if (properties.dash.altLength !== undefined) {this.dash.altLength = properties.dash.altLength;}
  }

  if (properties.color !== undefined) {
    if (util.isString(properties.color)) {
      this.color.color = properties.color;
      this.color.highlight = properties.color;
    }
    else {
      if (properties.color.color !== undefined)     {this.color.color = properties.color.color;}
      if (properties.color.highlight !== undefined) {this.color.highlight = properties.color.highlight;}
    }
  }

  // A node is connected when it has a from and to node.
  this.connect();

  this.widthFixed = this.widthFixed || (properties.width !== undefined);
  this.lengthFixed = this.lengthFixed || (properties.length !== undefined);

  // set draw method based on style
  switch (this.style) {
    case 'line':          this.draw = this._drawLine; break;
    case 'arrow':         this.draw = this._drawArrow; break;
    case 'arrow-center':  this.draw = this._drawArrowCenter; break;
    case 'dash-line':     this.draw = this._drawDashLine; break;
    default:              this.draw = this._drawLine; break;
  }
};

/**
 * Connect an edge to its nodes
 */
Edge.prototype.connect = function () {
  this.disconnect();

  this.from = this.graph.nodes[this.fromId] || null;
  this.to = this.graph.nodes[this.toId] || null;
  this.connected = (this.from && this.to);

  if (this.connected) {
    this.from.attachEdge(this);
    this.to.attachEdge(this);
  }
  else {
    if (this.from) {
      this.from.detachEdge(this);
    }
    if (this.to) {
      this.to.detachEdge(this);
    }
  }
};

/**
 * Disconnect an edge from its nodes
 */
Edge.prototype.disconnect = function () {
  if (this.from) {
    this.from.detachEdge(this);
    this.from = null;
  }
  if (this.to) {
    this.to.detachEdge(this);
    this.to = null;
  }

  this.connected = false;
};

/**
 * get the title of this edge.
 * @return {string} title    The title of the edge, or undefined when no title
 *                           has been set.
 */
Edge.prototype.getTitle = function() {
  return typeof this.title === "function" ? this.title() : this.title;
};


/**
 * Retrieve the value of the edge. Can be undefined
 * @return {Number} value
 */
Edge.prototype.getValue = function() {
  return this.value;
};

/**
 * Adjust the value range of the edge. The edge will adjust it's width
 * based on its value.
 * @param {Number} min
 * @param {Number} max
 */
Edge.prototype.setValueRange = function(min, max) {
  if (!this.widthFixed && this.value !== undefined) {
    var scale = (this.widthMax - this.widthMin) / (max - min);
    this.width = (this.value - min) * scale + this.widthMin;
  }
};

/**
 * Redraw a edge
 * Draw this edge in the given canvas
 * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
 * @param {CanvasRenderingContext2D}   ctx
 */
Edge.prototype.draw = function(ctx) {
  throw "Method draw not initialized in edge";
};

/**
 * Check if this object is overlapping with the provided object
 * @param {Object} obj   an object with parameters left, top
 * @return {boolean}     True if location is located on the edge
 */
Edge.prototype.isOverlappingWith = function(obj) {
  if (this.connected) {
    var distMax = 10;
    var xFrom = this.from.x;
    var yFrom = this.from.y;
    var xTo = this.to.x;
    var yTo = this.to.y;
    var xObj = obj.left;
    var yObj = obj.top;

    var dist = this._getDistanceToEdge(xFrom, yFrom, xTo, yTo, xObj, yObj);

    return (dist < distMax);
  }
  else {
    return false
  }
};


/**
 * Redraw a edge as a line
 * Draw this edge in the given canvas
 * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
 * @param {CanvasRenderingContext2D}   ctx
 * @private
 */
Edge.prototype._drawLine = function(ctx) {
  // set style
  if (this.selected == true) {ctx.strokeStyle = this.color.highlight;}
  else                       {ctx.strokeStyle = this.color.color;}
  ctx.lineWidth = this._getLineWidth();

  if (this.from != this.to) {
    // draw line
    this._line(ctx);

    // draw label
    var point;
    if (this.label) {
      if (this.smooth == true) {
        var midpointX = 0.5*(0.5*(this.from.x + this.via.x) + 0.5*(this.to.x + this.via.x));
        var midpointY = 0.5*(0.5*(this.from.y + this.via.y) + 0.5*(this.to.y + this.via.y));
        point = {x:midpointX, y:midpointY};
      }
      else {
        point = this._pointOnLine(0.5);
      }
      this._label(ctx, this.label, point.x, point.y);
    }
  }
  else {
    var x, y;
    var radius = this.length / 4;
    var node = this.from;
    if (!node.width) {
      node.resize(ctx);
    }
    if (node.width > node.height) {
      x = node.x + node.width / 2;
      y = node.y - radius;
    }
    else {
      x = node.x + radius;
      y = node.y - node.height / 2;
    }
    this._circle(ctx, x, y, radius);
    point = this._pointOnCircle(x, y, radius, 0.5);
    this._label(ctx, this.label, point.x, point.y);
  }
};

/**
 * Get the line width of the edge. Depends on width and whether one of the
 * connected nodes is selected.
 * @return {Number} width
 * @private
 */
Edge.prototype._getLineWidth = function() {
  if (this.selected == true) {
    return Math.min(this.width * 2, this.widthMax)*this.graphScaleInv;
  }
  else {
    return this.width*this.graphScaleInv;
  }
};

/**
 * Draw a line between two nodes
 * @param {CanvasRenderingContext2D} ctx
 * @private
 */
Edge.prototype._line = function (ctx) {
  // draw a straight line
  ctx.beginPath();
  ctx.moveTo(this.from.x, this.from.y);
 if (this.smooth == true) {
      ctx.quadraticCurveTo(this.via.x,this.via.y,this.to.x, this.to.y);
  }
  else {
    ctx.lineTo(this.to.x, this.to.y);
  }
  ctx.stroke();
};

/**
 * Draw a line from a node to itself, a circle
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x
 * @param {Number} y
 * @param {Number} radius
 * @private
 */
Edge.prototype._circle = function (ctx, x, y, radius) {
  // draw a circle
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.stroke();
};

/**
 * Draw label with white background and with the middle at (x, y)
 * @param {CanvasRenderingContext2D} ctx
 * @param {String} text
 * @param {Number} x
 * @param {Number} y
 * @private
 */
Edge.prototype._label = function (ctx, text, x, y) {
  if (text) {
    // TODO: cache the calculated size
    ctx.font = ((this.from.selected || this.to.selected) ? "bold " : "") +
        this.fontSize + "px " + this.fontFace;
    ctx.fillStyle = this.fontFill;
    var width = ctx.measureText(text).width;
    var height = this.fontSize;
    var left = x - width / 2;
    var top = y - height / 2;

    ctx.fillRect(left, top, width, height);

    // draw text
    ctx.fillStyle = this.fontColor || "black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(text, left, top);
  }
};

/**
 * Redraw a edge as a dashed line
 * Draw this edge in the given canvas
 * @author David Jordan
 * @date 2012-08-08
 * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
 * @param {CanvasRenderingContext2D}   ctx
 * @private
 */
Edge.prototype._drawDashLine = function(ctx) {
  // set style
  if (this.selected == true) {ctx.strokeStyle = this.color.highlight;}
  else                       {ctx.strokeStyle = this.color.color;}

  ctx.lineWidth = this._getLineWidth();

  // only firefox and chrome support this method, else we use the legacy one.
  if (ctx.mozDash !== undefined || ctx.setLineDash !== undefined) {
    ctx.beginPath();
    ctx.moveTo(this.from.x, this.from.y);

    // configure the dash pattern
    var pattern = [0];
    if (this.dash.length !== undefined && this.dash.gap !== undefined) {
      pattern = [this.dash.length,this.dash.gap];
    }
    else {
      pattern = [5,5];
    }

    // set dash settings for chrome or firefox
    if (typeof ctx.setLineDash !== 'undefined') { //Chrome
      ctx.setLineDash(pattern);
      ctx.lineDashOffset = 0;

    } else { //Firefox
      ctx.mozDash = pattern;
      ctx.mozDashOffset = 0;
    }

    // draw the line
    if (this.smooth == true) {
      ctx.quadraticCurveTo(this.via.x,this.via.y,this.to.x, this.to.y);
    }
    else {
      ctx.lineTo(this.to.x, this.to.y);
    }
    ctx.stroke();

    // restore the dash settings.
    if (typeof ctx.setLineDash !== 'undefined') { //Chrome
      ctx.setLineDash([0]);
      ctx.lineDashOffset = 0;

    } else { //Firefox
      ctx.mozDash = [0];
      ctx.mozDashOffset = 0;
    }
  }
  else { // unsupporting smooth lines
    // draw dashed line
    ctx.beginPath();
    ctx.lineCap = 'round';
    if (this.dash.altLength !== undefined) //If an alt dash value has been set add to the array this value
    {
      ctx.dashedLine(this.from.x,this.from.y,this.to.x,this.to.y,
          [this.dash.length,this.dash.gap,this.dash.altLength,this.dash.gap]);
    }
    else if (this.dash.length !== undefined && this.dash.gap !== undefined) //If a dash and gap value has been set add to the array this value
    {
      ctx.dashedLine(this.from.x,this.from.y,this.to.x,this.to.y,
          [this.dash.length,this.dash.gap]);
    }
    else //If all else fails draw a line
    {
      ctx.moveTo(this.from.x, this.from.y);
      ctx.lineTo(this.to.x, this.to.y);
    }
    ctx.stroke();
  }

  // draw label
  if (this.label) {
    var point;
    if (this.smooth == true) {
      var midpointX = 0.5*(0.5*(this.from.x + this.via.x) + 0.5*(this.to.x + this.via.x));
      var midpointY = 0.5*(0.5*(this.from.y + this.via.y) + 0.5*(this.to.y + this.via.y));
      point = {x:midpointX, y:midpointY};
    }
    else {
      point = this._pointOnLine(0.5);
    }
    this._label(ctx, this.label, point.x, point.y);
  }
};

/**
 * Get a point on a line
 * @param {Number} percentage. Value between 0 (line start) and 1 (line end)
 * @return {Object} point
 * @private
 */
Edge.prototype._pointOnLine = function (percentage) {
  return {
    x: (1 - percentage) * this.from.x + percentage * this.to.x,
    y: (1 - percentage) * this.from.y + percentage * this.to.y
  }
};

/**
 * Get a point on a circle
 * @param {Number} x
 * @param {Number} y
 * @param {Number} radius
 * @param {Number} percentage. Value between 0 (line start) and 1 (line end)
 * @return {Object} point
 * @private
 */
Edge.prototype._pointOnCircle = function (x, y, radius, percentage) {
  var angle = (percentage - 3/8) * 2 * Math.PI;
  return {
    x: x + radius * Math.cos(angle),
    y: y - radius * Math.sin(angle)
  }
};

/**
 * Redraw a edge as a line with an arrow halfway the line
 * Draw this edge in the given canvas
 * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
 * @param {CanvasRenderingContext2D}   ctx
 * @private
 */
Edge.prototype._drawArrowCenter = function(ctx) {
  var point;
  // set style
  if (this.selected == true) {ctx.strokeStyle = this.color.highlight; ctx.fillStyle = this.color.highlight;}
  else                       {ctx.strokeStyle = this.color.color; ctx.fillStyle = this.color.color;}
  ctx.lineWidth = this._getLineWidth();

  if (this.from != this.to) {
    // draw line
    this._line(ctx);

    var angle = Math.atan2((this.to.y - this.from.y), (this.to.x - this.from.x));
    var length = (10 + 5 * this.width) * this.arrowScaleFactor;
    // draw an arrow halfway the line
    if (this.smooth == true) {
      var midpointX = 0.5*(0.5*(this.from.x + this.via.x) + 0.5*(this.to.x + this.via.x));
      var midpointY = 0.5*(0.5*(this.from.y + this.via.y) + 0.5*(this.to.y + this.via.y));
      point = {x:midpointX, y:midpointY};
    }
    else {
      point = this._pointOnLine(0.5);
    }

    ctx.arrow(point.x, point.y, angle, length);
    ctx.fill();
    ctx.stroke();

    // draw label
    if (this.label) {
      this._label(ctx, this.label, point.x, point.y);
    }
  }
  else {
    // draw circle
    var x, y;
    var radius = 0.25 * Math.max(100,this.length);
    var node = this.from;
    if (!node.width) {
      node.resize(ctx);
    }
    if (node.width > node.height) {
      x = node.x + node.width * 0.5;
      y = node.y - radius;
    }
    else {
      x = node.x + radius;
      y = node.y - node.height * 0.5;
    }
    this._circle(ctx, x, y, radius);

    // draw all arrows
    var angle = 0.2 * Math.PI;
    var length = (10 + 5 * this.width) * this.arrowScaleFactor;
    point = this._pointOnCircle(x, y, radius, 0.5);
    ctx.arrow(point.x, point.y, angle, length);
    ctx.fill();
    ctx.stroke();

    // draw label
    if (this.label) {
      point = this._pointOnCircle(x, y, radius, 0.5);
      this._label(ctx, this.label, point.x, point.y);
    }
  }
};



/**
 * Redraw a edge as a line with an arrow
 * Draw this edge in the given canvas
 * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
 * @param {CanvasRenderingContext2D}   ctx
 * @private
 */
Edge.prototype._drawArrow = function(ctx) {
  // set style
  if (this.selected == true) {ctx.strokeStyle = this.color.highlight; ctx.fillStyle = this.color.highlight;}
  else                       {ctx.strokeStyle = this.color.color;     ctx.fillStyle = this.color.color;}

  ctx.lineWidth = this._getLineWidth();

  var angle, length;
  //draw a line
  if (this.from != this.to) {
    angle = Math.atan2((this.to.y - this.from.y), (this.to.x - this.from.x));
    var dx = (this.to.x - this.from.x);
    var dy = (this.to.y - this.from.y);
    var edgeSegmentLength = Math.sqrt(dx * dx + dy * dy);

    var fromBorderDist = this.from.distanceToBorder(ctx, angle + Math.PI);
    var fromBorderPoint = (edgeSegmentLength - fromBorderDist) / edgeSegmentLength;
    var xFrom = (fromBorderPoint) * this.from.x + (1 - fromBorderPoint) * this.to.x;
    var yFrom = (fromBorderPoint) * this.from.y + (1 - fromBorderPoint) * this.to.y;


    if (this.smooth == true) {
      angle = Math.atan2((this.to.y - this.via.y), (this.to.x - this.via.x));
      dx = (this.to.x - this.via.x);
      dy = (this.to.y - this.via.y);
      edgeSegmentLength = Math.sqrt(dx * dx + dy * dy);
    }
    var toBorderDist = this.to.distanceToBorder(ctx, angle);
    var toBorderPoint = (edgeSegmentLength - toBorderDist) / edgeSegmentLength;

    var xTo,yTo;
    if (this.smooth == true) {
     xTo = (1 - toBorderPoint) * this.via.x + toBorderPoint * this.to.x;
     yTo = (1 - toBorderPoint) * this.via.y + toBorderPoint * this.to.y;
    }
    else {
      xTo = (1 - toBorderPoint) * this.from.x + toBorderPoint * this.to.x;
      yTo = (1 - toBorderPoint) * this.from.y + toBorderPoint * this.to.y;
    }

    ctx.beginPath();
    ctx.moveTo(xFrom,yFrom);
    if (this.smooth == true) {
      ctx.quadraticCurveTo(this.via.x,this.via.y,xTo, yTo);
    }
    else {
      ctx.lineTo(xTo, yTo);
    }
    ctx.stroke();

    // draw arrow at the end of the line
    length = (10 + 5 * this.width) * this.arrowScaleFactor;
    ctx.arrow(xTo, yTo, angle, length);
    ctx.fill();
    ctx.stroke();

    // draw label
    if (this.label) {
      var point;
      if (this.smooth == true) {
        var midpointX = 0.5*(0.5*(this.from.x + this.via.x) + 0.5*(this.to.x + this.via.x));
        var midpointY = 0.5*(0.5*(this.from.y + this.via.y) + 0.5*(this.to.y + this.via.y));
        point = {x:midpointX, y:midpointY};
      }
      else {
        point = this._pointOnLine(0.5);
      }
      this._label(ctx, this.label, point.x, point.y);
    }
  }
  else {
    // draw circle
    var node = this.from;
    var x, y, arrow;
    var radius = 0.25 * Math.max(100,this.length);
    if (!node.width) {
      node.resize(ctx);
    }
    if (node.width > node.height) {
      x = node.x + node.width * 0.5;
      y = node.y - radius;
      arrow = {
        x: x,
        y: node.y,
        angle: 0.9 * Math.PI
      };
    }
    else {
      x = node.x + radius;
      y = node.y - node.height * 0.5;
      arrow = {
        x: node.x,
        y: y,
        angle: 0.6 * Math.PI
      };
    }
    ctx.beginPath();
    // TODO: similarly, for a line without arrows, draw to the border of the nodes instead of the center
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.stroke();

    // draw all arrows
    var length = (10 + 5 * this.width) * this.arrowScaleFactor;
    ctx.arrow(arrow.x, arrow.y, arrow.angle, length);
    ctx.fill();
    ctx.stroke();

    // draw label
    if (this.label) {
      point = this._pointOnCircle(x, y, radius, 0.5);
      this._label(ctx, this.label, point.x, point.y);
    }
  }
};



/**
 * Calculate the distance between a point (x3,y3) and a line segment from
 * (x1,y1) to (x2,y2).
 * http://stackoverflow.com/questions/849211/shortest-distancae-between-a-point-and-a-line-segment
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {number} x3
 * @param {number} y3
 * @private
 */
Edge.prototype._getDistanceToEdge = function (x1,y1, x2,y2, x3,y3) { // x3,y3 is the point
  if (this.smooth == true) {
    var minDistance = 1e9;
    var i,t,x,y,dx,dy;
    for (i = 0; i < 10; i++) {
      t = 0.1*i;
      x = Math.pow(1-t,2)*x1 + (2*t*(1 - t))*this.via.x + Math.pow(t,2)*x2;
      y = Math.pow(1-t,2)*y1 + (2*t*(1 - t))*this.via.y + Math.pow(t,2)*y2;
      dx = Math.abs(x3-x);
      dy = Math.abs(y3-y);
      minDistance = Math.min(minDistance,Math.sqrt(dx*dx + dy*dy));
    }
    return minDistance
  }
  else {
    var px = x2-x1,
        py = y2-y1,
        something = px*px + py*py,
        u =  ((x3 - x1) * px + (y3 - y1) * py) / something;

    if (u > 1) {
      u = 1;
    }
    else if (u < 0) {
      u = 0;
    }

    var x = x1 + u * px,
        y = y1 + u * py,
        dx = x - x3,
        dy = y - y3;

    //# Note: If the actual distance does not matter,
    //# if you only want to compare what this function
    //# returns to other results of this function, you
    //# can just return the squared distance instead
    //# (i.e. remove the sqrt) to gain a little performance

    return Math.sqrt(dx*dx + dy*dy);
  }
};



/**
 * This allows the zoom level of the graph to influence the rendering
 *
 * @param scale
 */
Edge.prototype.setScale = function(scale) {
  this.graphScaleInv = 1.0/scale;
};


Edge.prototype.select = function() {
  this.selected = true;
};

Edge.prototype.unselect = function() {
  this.selected = false;
};

Edge.prototype.positionBezierNode = function() {
  if (this.via !== null) {
    this.via.x = 0.5 * (this.from.x + this.to.x);
    this.via.y = 0.5 * (this.from.y + this.to.y);
  }
};
/**
 * Popup is a class to create a popup window with some text
 * @param {Element}  container     The container object.
 * @param {Number} [x]
 * @param {Number} [y]
 * @param {String} [text]
 * @param {Object} [style]     An object containing borderColor,
 *                             backgroundColor, etc.
 */
function Popup(container, x, y, text, style) {
  if (container) {
    this.container = container;
  }
  else {
    this.container = document.body;
  }

  // x, y and text are optional, see if a style object was passed in their place
  if (style === undefined) {
    if (typeof x === "object") {
      style = x;
      x = undefined;
    } else if (typeof text === "object") {
      style = text;
      text = undefined;
    } else {
      // for backwards compatibility, in case clients other than Graph are creating Popup directly
      style = {
        fontColor: 'black',
        fontSize: 14, // px
        fontFace: 'verdana',
        color: {
          border: '#666',
          background: '#FFFFC6'
        }
      }
    }
  }

  this.x = 0;
  this.y = 0;
  this.padding = 5;

  if (x !== undefined && y !== undefined ) {
    this.setPosition(x, y);
  }
  if (text !== undefined) {
    this.setText(text);
  }

  // create the frame
  this.frame = document.createElement("div");
  var styleAttr = this.frame.style;
  styleAttr.position = "absolute";
  styleAttr.visibility = "hidden";
  styleAttr.border = "1px solid " + style.color.border;
  styleAttr.color = style.fontColor;
  styleAttr.fontSize = style.fontSize + "px";
  styleAttr.fontFamily = style.fontFace;
  styleAttr.padding = this.padding + "px";
  styleAttr.backgroundColor = style.color.background;
  styleAttr.borderRadius = "3px";
  styleAttr.MozBorderRadius = "3px";
  styleAttr.WebkitBorderRadius = "3px";
  styleAttr.boxShadow = "3px 3px 10px rgba(128, 128, 128, 0.5)";
  styleAttr.whiteSpace = "nowrap";
  this.container.appendChild(this.frame);
}

/**
 * @param {number} x   Horizontal position of the popup window
 * @param {number} y   Vertical position of the popup window
 */
Popup.prototype.setPosition = function(x, y) {
  this.x = parseInt(x);
  this.y = parseInt(y);
};

/**
 * Set the text for the popup window. This can be HTML code
 * @param {string} text
 */
Popup.prototype.setText = function(text) {
  this.frame.innerHTML = text;
};

/**
 * Show the popup window
 * @param {boolean} show    Optional. Show or hide the window
 */
Popup.prototype.show = function (show) {
  if (show === undefined) {
    show = true;
  }

  if (show) {
    var height = this.frame.clientHeight;
    var width =  this.frame.clientWidth;
    var maxHeight = this.frame.parentNode.clientHeight;
    var maxWidth = this.frame.parentNode.clientWidth;

    var top = (this.y - height);
    if (top + height + this.padding > maxHeight) {
      top = maxHeight - height - this.padding;
    }
    if (top < this.padding) {
      top = this.padding;
    }

    var left = this.x;
    if (left + width + this.padding > maxWidth) {
      left = maxWidth - width - this.padding;
    }
    if (left < this.padding) {
      left = this.padding;
    }

    this.frame.style.left = left + "px";
    this.frame.style.top = top + "px";
    this.frame.style.visibility = "visible";
  }
  else {
    this.hide();
  }
};

/**
 * Hide the popup window
 */
Popup.prototype.hide = function () {
  this.frame.style.visibility = "hidden";
};

/**
 * @class Groups
 * This class can store groups and properties specific for groups.
 */
function Groups() {
  this.clear();
  this.defaultIndex = 0;
}


/**
 * default constants for group colors
 */
Groups.DEFAULT = [
  {border: "#2B7CE9", background: "#97C2FC", highlight: {border: "#2B7CE9", background: "#D2E5FF"}}, // blue
  {border: "#FFA500", background: "#FFFF00", highlight: {border: "#FFA500", background: "#FFFFA3"}}, // yellow
  {border: "#FA0A10", background: "#FB7E81", highlight: {border: "#FA0A10", background: "#FFAFB1"}}, // red
  {border: "#41A906", background: "#7BE141", highlight: {border: "#41A906", background: "#A1EC76"}}, // green
  {border: "#E129F0", background: "#EB7DF4", highlight: {border: "#E129F0", background: "#F0B3F5"}}, // magenta
  {border: "#7C29F0", background: "#AD85E4", highlight: {border: "#7C29F0", background: "#D3BDF0"}}, // purple
  {border: "#C37F00", background: "#FFA807", highlight: {border: "#C37F00", background: "#FFCA66"}}, // orange
  {border: "#4220FB", background: "#6E6EFD", highlight: {border: "#4220FB", background: "#9B9BFD"}}, // darkblue
  {border: "#FD5A77", background: "#FFC0CB", highlight: {border: "#FD5A77", background: "#FFD1D9"}}, // pink
  {border: "#4AD63A", background: "#C2FABC", highlight: {border: "#4AD63A", background: "#E6FFE3"}}  // mint
];


/**
 * Clear all groups
 */
Groups.prototype.clear = function () {
  this.groups = {};
  this.groups.length = function()
  {
    var i = 0;
    for ( var p in this ) {
      if (this.hasOwnProperty(p)) {
        i++;
      }
    }
    return i;
  }
};


/**
 * get group properties of a groupname. If groupname is not found, a new group
 * is added.
 * @param {*} groupname        Can be a number, string, Date, etc.
 * @return {Object} group      The created group, containing all group properties
 */
Groups.prototype.get = function (groupname) {
  var group = this.groups[groupname];

  if (group == undefined) {
    // create new group
    var index = this.defaultIndex % Groups.DEFAULT.length;
    this.defaultIndex++;
    group = {};
    group.color = Groups.DEFAULT[index];
    this.groups[groupname] = group;
  }

  return group;
};

/**
 * Add a custom group style
 * @param {String} groupname
 * @param {Object} style       An object containing borderColor,
 *                             backgroundColor, etc.
 * @return {Object} group      The created group object
 */
Groups.prototype.add = function (groupname, style) {
  this.groups[groupname] = style;
  if (style.color) {
    style.color = util.parseColor(style.color);
  }
  return style;
};

/**
 * @class Images
 * This class loads images and keeps them stored.
 */
function Images() {
  this.images = {};

  this.callback = undefined;
}

/**
 * Set an onload callback function. This will be called each time an image
 * is loaded
 * @param {function} callback
 */
Images.prototype.setOnloadCallback = function(callback) {
  this.callback = callback;
};

/**
 *
 * @param {string} url          Url of the image
 * @return {Image} img          The image object
 */
Images.prototype.load = function(url) {
  var img = this.images[url];
  if (img == undefined) {
    // create the image
    var images = this;
    img = new Image();
    this.images[url] = img;
    img.onload = function() {
      if (images.callback) {
        images.callback(this);
      }
    };
    img.src = url;
  }

  return img;
};

/**
 * Created by Alex on 2/6/14.
 */


var physicsMixin = {

  /**
   * Toggling barnes Hut calculation on and off.
   *
   * @private
   */
  _toggleBarnesHut: function () {
    this.constants.physics.barnesHut.enabled = !this.constants.physics.barnesHut.enabled;
    this._loadSelectedForceSolver();
    this.moving = true;
    this.start();
  },


  /**
   * This loads the node force solver based on the barnes hut or repulsion algorithm
   *
   * @private
   */
  _loadSelectedForceSolver: function () {
    // this overloads the this._calculateNodeForces
    if (this.constants.physics.barnesHut.enabled == true) {
      this._clearMixin(repulsionMixin);
      this._clearMixin(hierarchalRepulsionMixin);

      this.constants.physics.centralGravity = this.constants.physics.barnesHut.centralGravity;
      this.constants.physics.springLength = this.constants.physics.barnesHut.springLength;
      this.constants.physics.springConstant = this.constants.physics.barnesHut.springConstant;
      this.constants.physics.damping = this.constants.physics.barnesHut.damping;

      this._loadMixin(barnesHutMixin);
    }
    else if (this.constants.physics.hierarchicalRepulsion.enabled == true) {
      this._clearMixin(barnesHutMixin);
      this._clearMixin(repulsionMixin);

      this.constants.physics.centralGravity = this.constants.physics.hierarchicalRepulsion.centralGravity;
      this.constants.physics.springLength = this.constants.physics.hierarchicalRepulsion.springLength;
      this.constants.physics.springConstant = this.constants.physics.hierarchicalRepulsion.springConstant;
      this.constants.physics.damping = this.constants.physics.hierarchicalRepulsion.damping;

      this._loadMixin(hierarchalRepulsionMixin);
    }
    else {
      this._clearMixin(barnesHutMixin);
      this._clearMixin(hierarchalRepulsionMixin);
      this.barnesHutTree = undefined;

      this.constants.physics.centralGravity = this.constants.physics.repulsion.centralGravity;
      this.constants.physics.springLength = this.constants.physics.repulsion.springLength;
      this.constants.physics.springConstant = this.constants.physics.repulsion.springConstant;
      this.constants.physics.damping = this.constants.physics.repulsion.damping;

      this._loadMixin(repulsionMixin);
    }
  },

  /**
   * Before calculating the forces, we check if we need to cluster to keep up performance and we check
   * if there is more than one node. If it is just one node, we dont calculate anything.
   *
   * @private
   */
  _initializeForceCalculation: function () {
    // stop calculation if there is only one node
    if (this.nodeIndices.length == 1) {
      this.nodes[this.nodeIndices[0]]._setForce(0, 0);
    }
    else {
      // if there are too many nodes on screen, we cluster without repositioning
      if (this.nodeIndices.length > this.constants.clustering.clusterThreshold && this.constants.clustering.enabled == true) {
        this.clusterToFit(this.constants.clustering.reduceToNodes, false);
      }

      // we now start the force calculation
      this._calculateForces();
    }
  },


  /**
   * Calculate the external forces acting on the nodes
   * Forces are caused by: edges, repulsing forces between nodes, gravity
   * @private
   */
  _calculateForces: function () {
    // Gravity is required to keep separated groups from floating off
    // the forces are reset to zero in this loop by using _setForce instead
    // of _addForce

    this._calculateGravitationalForces();
    this._calculateNodeForces();

    if (this.constants.smoothCurves == true) {
      this._calculateSpringForcesWithSupport();
    }
    else {
      this._calculateSpringForces();
    }
  },


  /**
   * Smooth curves are created by adding invisible nodes in the center of the edges. These nodes are also
   * handled in the calculateForces function. We then use a quadratic curve with the center node as control.
   * This function joins the datanodes and invisible (called support) nodes into one object.
   * We do this so we do not contaminate this.nodes with the support nodes.
   *
   * @private
   */
  _updateCalculationNodes: function () {
    if (this.constants.smoothCurves == true) {
      this.calculationNodes = {};
      this.calculationNodeIndices = [];

      for (var nodeId in this.nodes) {
        if (this.nodes.hasOwnProperty(nodeId)) {
          this.calculationNodes[nodeId] = this.nodes[nodeId];
        }
      }
      var supportNodes = this.sectors['support']['nodes'];
      for (var supportNodeId in supportNodes) {
        if (supportNodes.hasOwnProperty(supportNodeId)) {
          if (this.edges.hasOwnProperty(supportNodes[supportNodeId].parentEdgeId)) {
            this.calculationNodes[supportNodeId] = supportNodes[supportNodeId];
          }
          else {
            supportNodes[supportNodeId]._setForce(0, 0);
          }
        }
      }

      for (var idx in this.calculationNodes) {
        if (this.calculationNodes.hasOwnProperty(idx)) {
          this.calculationNodeIndices.push(idx);
        }
      }
    }
    else {
      this.calculationNodes = this.nodes;
      this.calculationNodeIndices = this.nodeIndices;
    }
  },


  /**
   * this function applies the central gravity effect to keep groups from floating off
   *
   * @private
   */
  _calculateGravitationalForces: function () {
    var dx, dy, distance, node, i;
    var nodes = this.calculationNodes;
    var gravity = this.constants.physics.centralGravity;
    var gravityForce = 0;

    for (i = 0; i < this.calculationNodeIndices.length; i++) {
      node = nodes[this.calculationNodeIndices[i]];
      node.damping = this.constants.physics.damping; // possibly add function to alter damping properties of clusters.
      // gravity does not apply when we are in a pocket sector
      if (this._sector() == "default" && gravity != 0) {
        dx = -node.x;
        dy = -node.y;
        distance = Math.sqrt(dx * dx + dy * dy);

        gravityForce = (distance == 0) ? 0 : (gravity / distance);
        node.fx = dx * gravityForce;
        node.fy = dy * gravityForce;
      }
      else {
        node.fx = 0;
        node.fy = 0;
      }
    }
  },


  /**
   * this function calculates the effects of the springs in the case of unsmooth curves.
   *
   * @private
   */
  _calculateSpringForces: function () {
    var edgeLength, edge, edgeId;
    var dx, dy, fx, fy, springForce, length;
    var edges = this.edges;

    // forces caused by the edges, modelled as springs
    for (edgeId in edges) {
      if (edges.hasOwnProperty(edgeId)) {
        edge = edges[edgeId];
        if (edge.connected) {
          // only calculate forces if nodes are in the same sector
          if (this.nodes.hasOwnProperty(edge.toId) && this.nodes.hasOwnProperty(edge.fromId)) {
            edgeLength = edge.customLength ? edge.length : this.constants.physics.springLength;
            // this implies that the edges between big clusters are longer
            edgeLength += (edge.to.clusterSize + edge.from.clusterSize - 2) * this.constants.clustering.edgeGrowth;

            dx = (edge.from.x - edge.to.x);
            dy = (edge.from.y - edge.to.y);
            length = Math.sqrt(dx * dx + dy * dy);

            if (length == 0) {
              length = 0.01;
            }

            springForce = this.constants.physics.springConstant * (edgeLength - length) / length;

            fx = dx * springForce;
            fy = dy * springForce;

            edge.from.fx += fx;
            edge.from.fy += fy;
            edge.to.fx -= fx;
            edge.to.fy -= fy;
          }
        }
      }
    }
  },


  /**
   * This function calculates the springforces on the nodes, accounting for the support nodes.
   *
   * @private
   */
  _calculateSpringForcesWithSupport: function () {
    var edgeLength, edge, edgeId, combinedClusterSize;
    var edges = this.edges;

    // forces caused by the edges, modelled as springs
    for (edgeId in edges) {
      if (edges.hasOwnProperty(edgeId)) {
        edge = edges[edgeId];
        if (edge.connected) {
          // only calculate forces if nodes are in the same sector
          if (this.nodes.hasOwnProperty(edge.toId) && this.nodes.hasOwnProperty(edge.fromId)) {
            if (edge.via != null) {
              var node1 = edge.to;
              var node2 = edge.via;
              var node3 = edge.from;

              edgeLength = edge.customLength ? edge.length : this.constants.physics.springLength;

              combinedClusterSize = node1.clusterSize + node3.clusterSize - 2;

              // this implies that the edges between big clusters are longer
              edgeLength += combinedClusterSize * this.constants.clustering.edgeGrowth;
              this._calculateSpringForce(node1, node2, 0.5 * edgeLength);
              this._calculateSpringForce(node2, node3, 0.5 * edgeLength);
            }
          }
        }
      }
    }
  },


  /**
   * This is the code actually performing the calculation for the function above. It is split out to avoid repetition.
   *
   * @param node1
   * @param node2
   * @param edgeLength
   * @private
   */
  _calculateSpringForce: function (node1, node2, edgeLength) {
    var dx, dy, fx, fy, springForce, length;

    dx = (node1.x - node2.x);
    dy = (node1.y - node2.y);
    length = Math.sqrt(dx * dx + dy * dy);

    if (length == 0) {
      length = 0.01;
    }

    springForce = this.constants.physics.springConstant * (edgeLength - length) / length;

    fx = dx * springForce;
    fy = dy * springForce;

    node1.fx += fx;
    node1.fy += fy;
    node2.fx -= fx;
    node2.fy -= fy;
  },


  /**
   * Load the HTML for the physics config and bind it
   * @private
   */
  _loadPhysicsConfiguration: function () {
    if (this.physicsConfiguration === undefined) {
      this.backupConstants = {};
      util.copyObject(this.constants, this.backupConstants);

      var hierarchicalLayoutDirections = ["LR", "RL", "UD", "DU"];
      this.physicsConfiguration = document.createElement('div');
      this.physicsConfiguration.className = "PhysicsConfiguration";
      this.physicsConfiguration.innerHTML = '' +
        '<table><tr><td><b>Simulation Mode:</b></td></tr>' +
        '<tr>' +
        '<td width="120px"><input type="radio" name="graph_physicsMethod" id="graph_physicsMethod1" value="BH" checked="checked">Barnes Hut</td>' +
        '<td width="120px"><input type="radio" name="graph_physicsMethod" id="graph_physicsMethod2" value="R">Repulsion</td>' +
        '<td width="120px"><input type="radio" name="graph_physicsMethod" id="graph_physicsMethod3" value="H">Hierarchical</td>' +
        '</tr>' +
        '</table>' +
        '<table id="graph_BH_table" style="display:none">' +
        '<tr><td><b>Barnes Hut</b></td></tr>' +
        '<tr>' +
        '<td width="150px">gravitationalConstant</td><td>0</td><td><input type="range" min="500" max="20000" value="' + (-1 * this.constants.physics.barnesHut.gravitationalConstant) + '" step="25" style="width:300px" id="graph_BH_gc"></td><td  width="50px">-20000</td><td><input value="' + (-1 * this.constants.physics.barnesHut.gravitationalConstant) + '" id="graph_BH_gc_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">centralGravity</td><td>0</td><td><input type="range" min="0" max="3"  value="' + this.constants.physics.barnesHut.centralGravity + '" step="0.05"  style="width:300px" id="graph_BH_cg"></td><td>3</td><td><input value="' + this.constants.physics.barnesHut.centralGravity + '" id="graph_BH_cg_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">springLength</td><td>0</td><td><input type="range" min="0" max="500" value="' + this.constants.physics.barnesHut.springLength + '" step="1" style="width:300px" id="graph_BH_sl"></td><td>500</td><td><input value="' + this.constants.physics.barnesHut.springLength + '" id="graph_BH_sl_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">springConstant</td><td>0</td><td><input type="range" min="0" max="0.5" value="' + this.constants.physics.barnesHut.springConstant + '" step="0.001" style="width:300px" id="graph_BH_sc"></td><td>0.5</td><td><input value="' + this.constants.physics.barnesHut.springConstant + '" id="graph_BH_sc_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">damping</td><td>0</td><td><input type="range" min="0" max="0.3" value="' + this.constants.physics.barnesHut.damping + '" step="0.005" style="width:300px" id="graph_BH_damp"></td><td>0.3</td><td><input value="' + this.constants.physics.barnesHut.damping + '" id="graph_BH_damp_value" style="width:60px"></td>' +
        '</tr>' +
        '</table>' +
        '<table id="graph_R_table" style="display:none">' +
        '<tr><td><b>Repulsion</b></td></tr>' +
        '<tr>' +
        '<td width="150px">nodeDistance</td><td>0</td><td><input type="range" min="0" max="300" value="' + this.constants.physics.repulsion.nodeDistance + '" step="1" style="width:300px" id="graph_R_nd"></td><td width="50px">300</td><td><input value="' + this.constants.physics.repulsion.nodeDistance + '" id="graph_R_nd_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">centralGravity</td><td>0</td><td><input type="range" min="0" max="3"  value="' + this.constants.physics.repulsion.centralGravity + '" step="0.05"  style="width:300px" id="graph_R_cg"></td><td>3</td><td><input value="' + this.constants.physics.repulsion.centralGravity + '" id="graph_R_cg_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">springLength</td><td>0</td><td><input type="range" min="0" max="500" value="' + this.constants.physics.repulsion.springLength + '" step="1" style="width:300px" id="graph_R_sl"></td><td>500</td><td><input value="' + this.constants.physics.repulsion.springLength + '" id="graph_R_sl_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">springConstant</td><td>0</td><td><input type="range" min="0" max="0.5" value="' + this.constants.physics.repulsion.springConstant + '" step="0.001" style="width:300px" id="graph_R_sc"></td><td>0.5</td><td><input value="' + this.constants.physics.repulsion.springConstant + '" id="graph_R_sc_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">damping</td><td>0</td><td><input type="range" min="0" max="0.3" value="' + this.constants.physics.repulsion.damping + '" step="0.005" style="width:300px" id="graph_R_damp"></td><td>0.3</td><td><input value="' + this.constants.physics.repulsion.damping + '" id="graph_R_damp_value" style="width:60px"></td>' +
        '</tr>' +
        '</table>' +
        '<table id="graph_H_table" style="display:none">' +
        '<tr><td width="150"><b>Hierarchical</b></td></tr>' +
        '<tr>' +
        '<td width="150px">nodeDistance</td><td>0</td><td><input type="range" min="0" max="300" value="' + this.constants.physics.hierarchicalRepulsion.nodeDistance + '" step="1" style="width:300px" id="graph_H_nd"></td><td width="50px">300</td><td><input value="' + this.constants.physics.hierarchicalRepulsion.nodeDistance + '" id="graph_H_nd_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">centralGravity</td><td>0</td><td><input type="range" min="0" max="3"  value="' + this.constants.physics.hierarchicalRepulsion.centralGravity + '" step="0.05"  style="width:300px" id="graph_H_cg"></td><td>3</td><td><input value="' + this.constants.physics.hierarchicalRepulsion.centralGravity + '" id="graph_H_cg_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">springLength</td><td>0</td><td><input type="range" min="0" max="500" value="' + this.constants.physics.hierarchicalRepulsion.springLength + '" step="1" style="width:300px" id="graph_H_sl"></td><td>500</td><td><input value="' + this.constants.physics.hierarchicalRepulsion.springLength + '" id="graph_H_sl_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">springConstant</td><td>0</td><td><input type="range" min="0" max="0.5" value="' + this.constants.physics.hierarchicalRepulsion.springConstant + '" step="0.001" style="width:300px" id="graph_H_sc"></td><td>0.5</td><td><input value="' + this.constants.physics.hierarchicalRepulsion.springConstant + '" id="graph_H_sc_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">damping</td><td>0</td><td><input type="range" min="0" max="0.3" value="' + this.constants.physics.hierarchicalRepulsion.damping + '" step="0.005" style="width:300px" id="graph_H_damp"></td><td>0.3</td><td><input value="' + this.constants.physics.hierarchicalRepulsion.damping + '" id="graph_H_damp_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">direction</td><td>1</td><td><input type="range" min="0" max="3" value="' + hierarchicalLayoutDirections.indexOf(this.constants.hierarchicalLayout.direction) + '" step="1" style="width:300px" id="graph_H_direction"></td><td>4</td><td><input value="' + this.constants.hierarchicalLayout.direction + '" id="graph_H_direction_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">levelSeparation</td><td>1</td><td><input type="range" min="0" max="500" value="' + this.constants.hierarchicalLayout.levelSeparation + '" step="1" style="width:300px" id="graph_H_levsep"></td><td>500</td><td><input value="' + this.constants.hierarchicalLayout.levelSeparation + '" id="graph_H_levsep_value" style="width:60px"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="150px">nodeSpacing</td><td>1</td><td><input type="range" min="0" max="500" value="' + this.constants.hierarchicalLayout.nodeSpacing + '" step="1" style="width:300px" id="graph_H_nspac"></td><td>500</td><td><input value="' + this.constants.hierarchicalLayout.nodeSpacing + '" id="graph_H_nspac_value" style="width:60px"></td>' +
        '</tr>' +
        '</table>' +
        '<table><tr><td><b>Options:</b></td></tr>' +
        '<tr>' +
        '<td width="180px"><input type="button" id="graph_toggleSmooth" value="Toggle smoothCurves" style="width:150px"></td>' +
        '<td width="180px"><input type="button" id="graph_repositionNodes" value="Reinitialize" style="width:150px"></td>' +
        '<td width="180px"><input type="button" id="graph_generateOptions" value="Generate Options" style="width:150px"></td>' +
        '</tr>' +
        '</table>'
      this.containerElement.parentElement.insertBefore(this.physicsConfiguration, this.containerElement);
      this.optionsDiv = document.createElement("div");
      this.optionsDiv.style.fontSize = "14px";
      this.optionsDiv.style.fontFamily = "verdana";
      this.containerElement.parentElement.insertBefore(this.optionsDiv, this.containerElement);

      var rangeElement;
      rangeElement = document.getElementById('graph_BH_gc');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_BH_gc', -1, "physics_barnesHut_gravitationalConstant");
      rangeElement = document.getElementById('graph_BH_cg');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_BH_cg', 1, "physics_centralGravity");
      rangeElement = document.getElementById('graph_BH_sc');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_BH_sc', 1, "physics_springConstant");
      rangeElement = document.getElementById('graph_BH_sl');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_BH_sl', 1, "physics_springLength");
      rangeElement = document.getElementById('graph_BH_damp');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_BH_damp', 1, "physics_damping");

      rangeElement = document.getElementById('graph_R_nd');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_R_nd', 1, "physics_repulsion_nodeDistance");
      rangeElement = document.getElementById('graph_R_cg');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_R_cg', 1, "physics_centralGravity");
      rangeElement = document.getElementById('graph_R_sc');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_R_sc', 1, "physics_springConstant");
      rangeElement = document.getElementById('graph_R_sl');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_R_sl', 1, "physics_springLength");
      rangeElement = document.getElementById('graph_R_damp');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_R_damp', 1, "physics_damping");

      rangeElement = document.getElementById('graph_H_nd');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_H_nd', 1, "physics_hierarchicalRepulsion_nodeDistance");
      rangeElement = document.getElementById('graph_H_cg');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_H_cg', 1, "physics_centralGravity");
      rangeElement = document.getElementById('graph_H_sc');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_H_sc', 1, "physics_springConstant");
      rangeElement = document.getElementById('graph_H_sl');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_H_sl', 1, "physics_springLength");
      rangeElement = document.getElementById('graph_H_damp');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_H_damp', 1, "physics_damping");
      rangeElement = document.getElementById('graph_H_direction');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_H_direction', hierarchicalLayoutDirections, "hierarchicalLayout_direction");
      rangeElement = document.getElementById('graph_H_levsep');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_H_levsep', 1, "hierarchicalLayout_levelSeparation");
      rangeElement = document.getElementById('graph_H_nspac');
      rangeElement.onchange = showValueOfRange.bind(this, 'graph_H_nspac', 1, "hierarchicalLayout_nodeSpacing");

      var radioButton1 = document.getElementById("graph_physicsMethod1");
      var radioButton2 = document.getElementById("graph_physicsMethod2");
      var radioButton3 = document.getElementById("graph_physicsMethod3");
      radioButton2.checked = true;
      if (this.constants.physics.barnesHut.enabled) {
        radioButton1.checked = true;
      }
      if (this.constants.hierarchicalLayout.enabled) {
        radioButton3.checked = true;
      }

      var graph_toggleSmooth = document.getElementById("graph_toggleSmooth");
      var graph_repositionNodes = document.getElementById("graph_repositionNodes");
      var graph_generateOptions = document.getElementById("graph_generateOptions");

      graph_toggleSmooth.onclick = graphToggleSmoothCurves.bind(this);
      graph_repositionNodes.onclick = graphRepositionNodes.bind(this);
      graph_generateOptions.onclick = graphGenerateOptions.bind(this);
      if (this.constants.smoothCurves == true) {
        graph_toggleSmooth.style.background = "#A4FF56";
      }
      else {
        graph_toggleSmooth.style.background = "#FF8532";
      }


      switchConfigurations.apply(this);

      radioButton1.onchange = switchConfigurations.bind(this);
      radioButton2.onchange = switchConfigurations.bind(this);
      radioButton3.onchange = switchConfigurations.bind(this);
    }
  },

  /**
   * This overwrites the this.constants.
   *
   * @param constantsVariableName
   * @param value
   * @private
   */
  _overWriteGraphConstants: function (constantsVariableName, value) {
    var nameArray = constantsVariableName.split("_");
    if (nameArray.length == 1) {
      this.constants[nameArray[0]] = value;
    }
    else if (nameArray.length == 2) {
      this.constants[nameArray[0]][nameArray[1]] = value;
    }
    else if (nameArray.length == 3) {
      this.constants[nameArray[0]][nameArray[1]][nameArray[2]] = value;
    }
  }
};

/**
 * this function is bound to the toggle smooth curves button. That is also why it is not in the prototype.
 */
function graphToggleSmoothCurves () {
  this.constants.smoothCurves = !this.constants.smoothCurves;
  var graph_toggleSmooth = document.getElementById("graph_toggleSmooth");
  if (this.constants.smoothCurves == true) {graph_toggleSmooth.style.background = "#A4FF56";}
  else                                     {graph_toggleSmooth.style.background = "#FF8532";}

  this._configureSmoothCurves(false);
};

/**
 * this function is used to scramble the nodes
 *
 */
function graphRepositionNodes () {
  for (var nodeId in this.calculationNodes) {
    if (this.calculationNodes.hasOwnProperty(nodeId)) {
      this.calculationNodes[nodeId].vx = 0;  this.calculationNodes[nodeId].vy = 0;
      this.calculationNodes[nodeId].fx = 0;  this.calculationNodes[nodeId].fy = 0;
    }
  }
  if (this.constants.hierarchicalLayout.enabled == true) {
    this._setupHierarchicalLayout();
  }
  else {
    this.repositionNodes();
  }
  this.moving = true;
  this.start();
};

/**
 *  this is used to generate an options file from the playing with physics system.
 */
function graphGenerateOptions () {
  var options = "No options are required, default values used.";
  var optionsSpecific = [];
  var radioButton1 = document.getElementById("graph_physicsMethod1");
  var radioButton2 = document.getElementById("graph_physicsMethod2");
  if (radioButton1.checked == true) {
    if (this.constants.physics.barnesHut.gravitationalConstant != this.backupConstants.physics.barnesHut.gravitationalConstant) {optionsSpecific.push("gravitationalConstant: " + this.constants.physics.barnesHut.gravitationalConstant);}
    if (this.constants.physics.centralGravity != this.backupConstants.physics.barnesHut.centralGravity)                         {optionsSpecific.push("centralGravity: " + this.constants.physics.centralGravity);}
    if (this.constants.physics.springLength != this.backupConstants.physics.barnesHut.springLength)                             {optionsSpecific.push("springLength: " + this.constants.physics.springLength);}
    if (this.constants.physics.springConstant != this.backupConstants.physics.barnesHut.springConstant)                         {optionsSpecific.push("springConstant: " + this.constants.physics.springConstant);}
    if (this.constants.physics.damping != this.backupConstants.physics.barnesHut.damping)                                       {optionsSpecific.push("damping: " + this.constants.physics.damping);}
    if (optionsSpecific.length != 0) {
      options = "var options = {";
      options += "physics: {barnesHut: {";
      for (var i = 0; i < optionsSpecific.length; i++) {
        options += optionsSpecific[i];
        if (i < optionsSpecific.length - 1) {
          options += ", "
        }
      }
      options += '}}'
    }
    if (this.constants.smoothCurves != this.backupConstants.smoothCurves) {
      if (optionsSpecific.length == 0) {options = "var options = {";}
      else {options += ", "}
      options += "smoothCurves: " + this.constants.smoothCurves;
    }
    if (options != "No options are required, default values used.") {
      options += '};'
    }
  }
  else if (radioButton2.checked == true) {
    options = "var options = {";
    options += "physics: {barnesHut: {enabled: false}";
    if (this.constants.physics.repulsion.nodeDistance != this.backupConstants.physics.repulsion.nodeDistance)  {optionsSpecific.push("nodeDistance: " + this.constants.physics.repulsion.nodeDistance);}
    if (this.constants.physics.centralGravity != this.backupConstants.physics.repulsion.centralGravity)        {optionsSpecific.push("centralGravity: " + this.constants.physics.centralGravity);}
    if (this.constants.physics.springLength != this.backupConstants.physics.repulsion.springLength)            {optionsSpecific.push("springLength: " + this.constants.physics.springLength);}
    if (this.constants.physics.springConstant != this.backupConstants.physics.repulsion.springConstant)        {optionsSpecific.push("springConstant: " + this.constants.physics.springConstant);}
    if (this.constants.physics.damping != this.backupConstants.physics.repulsion.damping)                      {optionsSpecific.push("damping: " + this.constants.physics.damping);}
    if (optionsSpecific.length != 0) {
      options += ", repulsion: {";
      for (var i = 0; i < optionsSpecific.length; i++) {
        options += optionsSpecific[i];
        if (i < optionsSpecific.length - 1) {
          options += ", "
        }
      }
      options += '}}'
    }
    if (optionsSpecific.length == 0) {options += "}"}
    if (this.constants.smoothCurves != this.backupConstants.smoothCurves) {
      options += ", smoothCurves: " + this.constants.smoothCurves;
    }
    options += '};'
  }
  else {
    options = "var options = {";
    if (this.constants.physics.hierarchicalRepulsion.nodeDistance != this.backupConstants.physics.hierarchicalRepulsion.nodeDistance)  {optionsSpecific.push("nodeDistance: " + this.constants.physics.hierarchicalRepulsion.nodeDistance);}
    if (this.constants.physics.centralGravity != this.backupConstants.physics.hierarchicalRepulsion.centralGravity)        {optionsSpecific.push("centralGravity: " + this.constants.physics.centralGravity);}
    if (this.constants.physics.springLength != this.backupConstants.physics.hierarchicalRepulsion.springLength)            {optionsSpecific.push("springLength: " + this.constants.physics.springLength);}
    if (this.constants.physics.springConstant != this.backupConstants.physics.hierarchicalRepulsion.springConstant)        {optionsSpecific.push("springConstant: " + this.constants.physics.springConstant);}
    if (this.constants.physics.damping != this.backupConstants.physics.hierarchicalRepulsion.damping)                      {optionsSpecific.push("damping: " + this.constants.physics.damping);}
    if (optionsSpecific.length != 0) {
      options += "physics: {hierarchicalRepulsion: {";
      for (var i = 0; i < optionsSpecific.length; i++) {
        options += optionsSpecific[i];
        if (i < optionsSpecific.length - 1) {
          options += ", ";
        }
      }
      options += '}},';
    }
    options += 'hierarchicalLayout: {';
    optionsSpecific = [];
    if (this.constants.hierarchicalLayout.direction != this.backupConstants.hierarchicalLayout.direction)                       {optionsSpecific.push("direction: " + this.constants.hierarchicalLayout.direction);}
    if (Math.abs(this.constants.hierarchicalLayout.levelSeparation) != this.backupConstants.hierarchicalLayout.levelSeparation) {optionsSpecific.push("levelSeparation: " + this.constants.hierarchicalLayout.levelSeparation);}
    if (this.constants.hierarchicalLayout.nodeSpacing != this.backupConstants.hierarchicalLayout.nodeSpacing)                   {optionsSpecific.push("nodeSpacing: " + this.constants.hierarchicalLayout.nodeSpacing);}
    if (optionsSpecific.length != 0) {
      for (var i = 0; i < optionsSpecific.length; i++) {
        options += optionsSpecific[i];
        if (i < optionsSpecific.length - 1) {
          options += ", "
        }
      }
      options += '}'
    }
    else {
      options += "enabled:true}";
    }
    options += '};'
  }


  this.optionsDiv.innerHTML = options;

};

/**
 * this is used to switch between barnesHut, repulsion and hierarchical.
 *
 */
function switchConfigurations () {
  var ids = ["graph_BH_table", "graph_R_table", "graph_H_table"];
  var radioButton = document.querySelector('input[name="graph_physicsMethod"]:checked').value;
  var tableId = "graph_" + radioButton + "_table";
  var table = document.getElementById(tableId);
  table.style.display = "block";
  for (var i = 0; i < ids.length; i++) {
    if (ids[i] != tableId) {
      table = document.getElementById(ids[i]);
      table.style.display = "none";
    }
  }
  this._restoreNodes();
  if (radioButton == "R") {
    this.constants.hierarchicalLayout.enabled = false;
    this.constants.physics.hierarchicalRepulsion.enabled = false;
    this.constants.physics.barnesHut.enabled = false;
  }
  else if (radioButton == "H") {
    if (this.constants.hierarchicalLayout.enabled == false) {
      this.constants.hierarchicalLayout.enabled = true;
      this.constants.physics.hierarchicalRepulsion.enabled = true;
      this.constants.physics.barnesHut.enabled = false;
      this._setupHierarchicalLayout();
    }
  }
  else {
    this.constants.hierarchicalLayout.enabled = false;
    this.constants.physics.hierarchicalRepulsion.enabled = false;
    this.constants.physics.barnesHut.enabled = true;
  }
  this._loadSelectedForceSolver();
  var graph_toggleSmooth = document.getElementById("graph_toggleSmooth");
  if (this.constants.smoothCurves == true) {graph_toggleSmooth.style.background = "#A4FF56";}
  else                                     {graph_toggleSmooth.style.background = "#FF8532";}
  this.moving = true;
  this.start();

}


/**
 * this generates the ranges depending on the iniital values.
 *
 * @param id
 * @param map
 * @param constantsVariableName
 */
function showValueOfRange (id,map,constantsVariableName) {
  var valueId = id + "_value";
  var rangeValue = document.getElementById(id).value;

  if (map instanceof Array) {
    document.getElementById(valueId).value = map[parseInt(rangeValue)];
    this._overWriteGraphConstants(constantsVariableName,map[parseInt(rangeValue)]);
  }
  else {
    document.getElementById(valueId).value = parseInt(map) * parseFloat(rangeValue);
    this._overWriteGraphConstants(constantsVariableName, parseInt(map) * parseFloat(rangeValue));
  }

  if (constantsVariableName == "hierarchicalLayout_direction" ||
    constantsVariableName == "hierarchicalLayout_levelSeparation" ||
    constantsVariableName == "hierarchicalLayout_nodeSpacing") {
    this._setupHierarchicalLayout();
  }
  this.moving = true;
  this.start();
};



/**
 * Created by Alex on 2/10/14.
 */

var hierarchalRepulsionMixin = {


  /**
   * Calculate the forces the nodes apply on eachother based on a repulsion field.
   * This field is linearly approximated.
   *
   * @private
   */
  _calculateNodeForces: function () {
    var dx, dy, distance, fx, fy, combinedClusterSize,
      repulsingForce, node1, node2, i, j;

    var nodes = this.calculationNodes;
    var nodeIndices = this.calculationNodeIndices;

    // approximation constants
    var b = 5;
    var a_base = 0.5 * -b;


    // repulsing forces between nodes
    var nodeDistance = this.constants.physics.hierarchicalRepulsion.nodeDistance;
    var minimumDistance = nodeDistance;

    // we loop from i over all but the last entree in the array
    // j loops from i+1 to the last. This way we do not double count any of the indices, nor i == j
    for (i = 0; i < nodeIndices.length - 1; i++) {

      node1 = nodes[nodeIndices[i]];
      for (j = i + 1; j < nodeIndices.length; j++) {
        node2 = nodes[nodeIndices[j]];

        dx = node2.x - node1.x;
        dy = node2.y - node1.y;
        distance = Math.sqrt(dx * dx + dy * dy);

        var a = a_base / minimumDistance;
        if (distance < 2 * minimumDistance) {
          repulsingForce = a * distance + b; // linear approx of  1 / (1 + Math.exp((distance / minimumDistance - 1) * steepness))

          // normalize force with
          if (distance == 0) {
            distance = 0.01;
          }
          else {
            repulsingForce = repulsingForce / distance;
          }
          fx = dx * repulsingForce;
          fy = dy * repulsingForce;

          node1.fx -= fx;
          node1.fy -= fy;
          node2.fx += fx;
          node2.fy += fy;
        }
      }
    }
  }
};
/**
 * Created by Alex on 2/10/14.
 */

var barnesHutMixin = {

  /**
   * This function calculates the forces the nodes apply on eachother based on a gravitational model.
   * The Barnes Hut method is used to speed up this N-body simulation.
   *
   * @private
   */
  _calculateNodeForces : function() {
    if (this.constants.physics.barnesHut.gravitationalConstant != 0) {
      var node;
      var nodes = this.calculationNodes;
      var nodeIndices = this.calculationNodeIndices;
      var nodeCount = nodeIndices.length;

      this._formBarnesHutTree(nodes,nodeIndices);

      var barnesHutTree = this.barnesHutTree;

      // place the nodes one by one recursively
      for (var i = 0; i < nodeCount; i++) {
        node = nodes[nodeIndices[i]];
        // starting with root is irrelevant, it never passes the BarnesHut condition
        this._getForceContribution(barnesHutTree.root.children.NW,node);
        this._getForceContribution(barnesHutTree.root.children.NE,node);
        this._getForceContribution(barnesHutTree.root.children.SW,node);
        this._getForceContribution(barnesHutTree.root.children.SE,node);
      }
    }
  },


  /**
   * This function traverses the barnesHutTree. It checks when it can approximate distant nodes with their center of mass.
   * If a region contains a single node, we check if it is not itself, then we apply the force.
   *
   * @param parentBranch
   * @param node
   * @private
   */
  _getForceContribution : function(parentBranch,node) {
    // we get no force contribution from an empty region
    if (parentBranch.childrenCount > 0) {
      var dx,dy,distance;

      // get the distance from the center of mass to the node.
      dx = parentBranch.centerOfMass.x - node.x;
      dy = parentBranch.centerOfMass.y - node.y;
      distance = Math.sqrt(dx * dx + dy * dy);

      // BarnesHut condition
      // original condition : s/d < theta = passed  ===  d/s > 1/theta = passed
      // calcSize = 1/s --> d * 1/s > 1/theta = passed
      if (distance * parentBranch.calcSize > this.constants.physics.barnesHut.theta) {
        // duplicate code to reduce function calls to speed up program
        if (distance == 0) {
          distance = 0.1*Math.random();
          dx = distance;
        }
        var gravityForce = this.constants.physics.barnesHut.gravitationalConstant * parentBranch.mass * node.mass / (distance * distance * distance);
        var fx = dx * gravityForce;
        var fy = dy * gravityForce;
        node.fx += fx;
        node.fy += fy;
      }
      else {
        // Did not pass the condition, go into children if available
        if (parentBranch.childrenCount == 4) {
          this._getForceContribution(parentBranch.children.NW,node);
          this._getForceContribution(parentBranch.children.NE,node);
          this._getForceContribution(parentBranch.children.SW,node);
          this._getForceContribution(parentBranch.children.SE,node);
        }
        else { // parentBranch must have only one node, if it was empty we wouldnt be here
          if (parentBranch.children.data.id != node.id) { // if it is not self
            // duplicate code to reduce function calls to speed up program
            if (distance == 0) {
              distance = 0.5*Math.random();
              dx = distance;
            }
            var gravityForce = this.constants.physics.barnesHut.gravitationalConstant * parentBranch.mass * node.mass / (distance * distance * distance);
            var fx = dx * gravityForce;
            var fy = dy * gravityForce;
            node.fx += fx;
            node.fy += fy;
          }
        }
      }
    }
  },

  /**
   * This function constructs the barnesHut tree recursively. It creates the root, splits it and starts placing the nodes.
   *
   * @param nodes
   * @param nodeIndices
   * @private
   */
  _formBarnesHutTree : function(nodes,nodeIndices) {
    var node;
    var nodeCount = nodeIndices.length;

    var minX = Number.MAX_VALUE,
      minY = Number.MAX_VALUE,
      maxX =-Number.MAX_VALUE,
      maxY =-Number.MAX_VALUE;

    // get the range of the nodes
    for (var i = 0; i < nodeCount; i++) {
      var x = nodes[nodeIndices[i]].x;
      var y = nodes[nodeIndices[i]].y;
      if (x < minX) { minX = x; }
      if (x > maxX) { maxX = x; }
      if (y < minY) { minY = y; }
      if (y > maxY) { maxY = y; }
    }
    // make the range a square
    var sizeDiff = Math.abs(maxX - minX) - Math.abs(maxY - minY); // difference between X and Y
    if (sizeDiff > 0) {minY -= 0.5 * sizeDiff; maxY += 0.5 * sizeDiff;} // xSize > ySize
    else              {minX += 0.5 * sizeDiff; maxX -= 0.5 * sizeDiff;} // xSize < ySize


    var minimumTreeSize = 1e-5;
    var rootSize = Math.max(minimumTreeSize,Math.abs(maxX - minX));
    var halfRootSize = 0.5 * rootSize;
    var centerX = 0.5 * (minX + maxX), centerY = 0.5 * (minY + maxY);

    // construct the barnesHutTree
    var barnesHutTree = {root:{
      centerOfMass:{x:0,y:0}, // Center of Mass
      mass:0,
      range: {minX:centerX-halfRootSize,maxX:centerX+halfRootSize,
              minY:centerY-halfRootSize,maxY:centerY+halfRootSize},

      size: rootSize,
      calcSize: 1 / rootSize,
      children: {data:null},
      maxWidth: 0,
      level: 0,
      childrenCount: 4
    }};
    this._splitBranch(barnesHutTree.root);

    // place the nodes one by one recursively
    for (i = 0; i < nodeCount; i++) {
      node = nodes[nodeIndices[i]];
      this._placeInTree(barnesHutTree.root,node);
    }

    // make global
    this.barnesHutTree = barnesHutTree
  },


  /**
   * this updates the mass of a branch. this is increased by adding a node.
   *
   * @param parentBranch
   * @param node
   * @private
   */
  _updateBranchMass : function(parentBranch, node) {
    var totalMass = parentBranch.mass + node.mass;
    var totalMassInv = 1/totalMass;

    parentBranch.centerOfMass.x = parentBranch.centerOfMass.x * parentBranch.mass + node.x * node.mass;
    parentBranch.centerOfMass.x *= totalMassInv;

    parentBranch.centerOfMass.y = parentBranch.centerOfMass.y * parentBranch.mass + node.y * node.mass;
    parentBranch.centerOfMass.y *= totalMassInv;

    parentBranch.mass = totalMass;
    var biggestSize = Math.max(Math.max(node.height,node.radius),node.width);
    parentBranch.maxWidth = (parentBranch.maxWidth < biggestSize) ? biggestSize : parentBranch.maxWidth;

  },


  /**
   * determine in which branch the node will be placed.
   *
   * @param parentBranch
   * @param node
   * @param skipMassUpdate
   * @private
   */
  _placeInTree : function(parentBranch,node,skipMassUpdate) {
    if (skipMassUpdate != true || skipMassUpdate === undefined) {
      // update the mass of the branch.
      this._updateBranchMass(parentBranch,node);
    }

    if (parentBranch.children.NW.range.maxX > node.x) { // in NW or SW
      if (parentBranch.children.NW.range.maxY > node.y) { // in NW
        this._placeInRegion(parentBranch,node,"NW");
      }
      else { // in SW
        this._placeInRegion(parentBranch,node,"SW");
      }
    }
    else { // in NE or SE
      if (parentBranch.children.NW.range.maxY > node.y) { // in NE
        this._placeInRegion(parentBranch,node,"NE");
      }
      else { // in SE
        this._placeInRegion(parentBranch,node,"SE");
      }
    }
  },


  /**
   * actually place the node in a region (or branch)
   *
   * @param parentBranch
   * @param node
   * @param region
   * @private
   */
  _placeInRegion : function(parentBranch,node,region) {
    switch (parentBranch.children[region].childrenCount) {
      case 0: // place node here
        parentBranch.children[region].children.data = node;
        parentBranch.children[region].childrenCount = 1;
        this._updateBranchMass(parentBranch.children[region],node);
        break;
      case 1: // convert into children
        // if there are two nodes exactly overlapping (on init, on opening of cluster etc.)
        // we move one node a pixel and we do not put it in the tree.
        if (parentBranch.children[region].children.data.x == node.x &&
            parentBranch.children[region].children.data.y == node.y) {
          node.x += Math.random();
          node.y += Math.random();
        }
        else {
          this._splitBranch(parentBranch.children[region]);
          this._placeInTree(parentBranch.children[region],node);
        }
        break;
      case 4: // place in branch
        this._placeInTree(parentBranch.children[region],node);
        break;
    }
  },


  /**
   * this function splits a branch into 4 sub branches. If the branch contained a node, we place it in the subbranch
   * after the split is complete.
   *
   * @param parentBranch
   * @private
   */
  _splitBranch : function(parentBranch) {
    // if the branch is filled with a node, replace the node in the new subset.
    var containedNode = null;
    if (parentBranch.childrenCount == 1) {
      containedNode = parentBranch.children.data;
      parentBranch.mass = 0; parentBranch.centerOfMass.x = 0; parentBranch.centerOfMass.y = 0;
    }
    parentBranch.childrenCount = 4;
    parentBranch.children.data = null;
    this._insertRegion(parentBranch,"NW");
    this._insertRegion(parentBranch,"NE");
    this._insertRegion(parentBranch,"SW");
    this._insertRegion(parentBranch,"SE");

    if (containedNode != null) {
      this._placeInTree(parentBranch,containedNode);
    }
  },


  /**
   * This function subdivides the region into four new segments.
   * Specifically, this inserts a single new segment.
   * It fills the children section of the parentBranch
   *
   * @param parentBranch
   * @param region
   * @param parentRange
   * @private
   */
  _insertRegion : function(parentBranch, region) {
    var minX,maxX,minY,maxY;
    var childSize = 0.5 * parentBranch.size;
    switch (region) {
      case "NW":
        minX = parentBranch.range.minX;
        maxX = parentBranch.range.minX + childSize;
        minY = parentBranch.range.minY;
        maxY = parentBranch.range.minY + childSize;
        break;
      case "NE":
        minX = parentBranch.range.minX + childSize;
        maxX = parentBranch.range.maxX;
        minY = parentBranch.range.minY;
        maxY = parentBranch.range.minY + childSize;
        break;
      case "SW":
        minX = parentBranch.range.minX;
        maxX = parentBranch.range.minX + childSize;
        minY = parentBranch.range.minY + childSize;
        maxY = parentBranch.range.maxY;
        break;
      case "SE":
        minX = parentBranch.range.minX + childSize;
        maxX = parentBranch.range.maxX;
        minY = parentBranch.range.minY + childSize;
        maxY = parentBranch.range.maxY;
        break;
    }


    parentBranch.children[region] = {
      centerOfMass:{x:0,y:0},
      mass:0,
      range:{minX:minX,maxX:maxX,minY:minY,maxY:maxY},
      size: 0.5 * parentBranch.size,
      calcSize: 2 * parentBranch.calcSize,
      children: {data:null},
      maxWidth: 0,
      level: parentBranch.level+1,
      childrenCount: 0
    };
  },


  /**
   * This function is for debugging purposed, it draws the tree.
   *
   * @param ctx
   * @param color
   * @private
   */
  _drawTree : function(ctx,color) {
    if (this.barnesHutTree !== undefined) {

      ctx.lineWidth = 1;

      this._drawBranch(this.barnesHutTree.root,ctx,color);
    }
  },


  /**
   * This function is for debugging purposes. It draws the branches recursively.
   *
   * @param branch
   * @param ctx
   * @param color
   * @private
   */
  _drawBranch : function(branch,ctx,color) {
    if (color === undefined) {
      color = "#FF0000";
    }

    if (branch.childrenCount == 4) {
      this._drawBranch(branch.children.NW,ctx);
      this._drawBranch(branch.children.NE,ctx);
      this._drawBranch(branch.children.SE,ctx);
      this._drawBranch(branch.children.SW,ctx);
    }
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(branch.range.minX,branch.range.minY);
    ctx.lineTo(branch.range.maxX,branch.range.minY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(branch.range.maxX,branch.range.minY);
    ctx.lineTo(branch.range.maxX,branch.range.maxY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(branch.range.maxX,branch.range.maxY);
    ctx.lineTo(branch.range.minX,branch.range.maxY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(branch.range.minX,branch.range.maxY);
    ctx.lineTo(branch.range.minX,branch.range.minY);
    ctx.stroke();

    /*
     if (branch.mass > 0) {
     ctx.circle(branch.centerOfMass.x, branch.centerOfMass.y, 3*branch.mass);
     ctx.stroke();
     }
     */
  }

};
/**
 * Created by Alex on 2/10/14.
 */

var repulsionMixin = {


  /**
   * Calculate the forces the nodes apply on eachother based on a repulsion field.
   * This field is linearly approximated.
   *
   * @private
   */
  _calculateNodeForces: function () {
    var dx, dy, angle, distance, fx, fy, combinedClusterSize,
      repulsingForce, node1, node2, i, j;

    var nodes = this.calculationNodes;
    var nodeIndices = this.calculationNodeIndices;

    // approximation constants
    var a_base = -2 / 3;
    var b = 4 / 3;

    // repulsing forces between nodes
    var nodeDistance = this.constants.physics.repulsion.nodeDistance;
    var minimumDistance = nodeDistance;

    // we loop from i over all but the last entree in the array
    // j loops from i+1 to the last. This way we do not double count any of the indices, nor i == j
    for (i = 0; i < nodeIndices.length - 1; i++) {
      node1 = nodes[nodeIndices[i]];
      for (j = i + 1; j < nodeIndices.length; j++) {
        node2 = nodes[nodeIndices[j]];
        combinedClusterSize = node1.clusterSize + node2.clusterSize - 2;

        dx = node2.x - node1.x;
        dy = node2.y - node1.y;
        distance = Math.sqrt(dx * dx + dy * dy);

        minimumDistance = (combinedClusterSize == 0) ? nodeDistance : (nodeDistance * (1 + combinedClusterSize * this.constants.clustering.distanceAmplification));
        var a = a_base / minimumDistance;
        if (distance < 2 * minimumDistance) {
          if (distance < 0.5 * minimumDistance) {
            repulsingForce = 1.0;
          }
          else {
            repulsingForce = a * distance + b; // linear approx of  1 / (1 + Math.exp((distance / minimumDistance - 1) * steepness))
          }

          // amplify the repulsion for clusters.
          repulsingForce *= (combinedClusterSize == 0) ? 1 : 1 + combinedClusterSize * this.constants.clustering.forceAmplification;
          repulsingForce = repulsingForce / distance;

          fx = dx * repulsingForce;
          fy = dy * repulsingForce;

          node1.fx -= fx;
          node1.fy -= fy;
          node2.fx += fx;
          node2.fy += fy;
        }
      }
    }
  }
};
var HierarchicalLayoutMixin = {



  _resetLevels : function() {
    for (var nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        var node = this.nodes[nodeId];
        if (node.preassignedLevel == false) {
          node.level = -1;
        }
      }
    }
  },

  /**
   * This is the main function to layout the nodes in a hierarchical way.
   * It checks if the node details are supplied correctly
   *
   * @private
   */
  _setupHierarchicalLayout : function() {
    if (this.constants.hierarchicalLayout.enabled == true) {
      if (this.constants.hierarchicalLayout.direction == "RL" || this.constants.hierarchicalLayout.direction == "DU") {
        this.constants.hierarchicalLayout.levelSeparation *= -1;
      }
      else {
        this.constants.hierarchicalLayout.levelSeparation = Math.abs(this.constants.hierarchicalLayout.levelSeparation);
      }
      // get the size of the largest hubs and check if the user has defined a level for a node.
      var hubsize = 0;
      var node, nodeId;
      var definedLevel = false;
      var undefinedLevel = false;

      for (nodeId in this.nodes) {
        if (this.nodes.hasOwnProperty(nodeId)) {
          node = this.nodes[nodeId];
          if (node.level != -1) {
            definedLevel = true;
          }
          else {
            undefinedLevel = true;
          }
          if (hubsize < node.edges.length) {
            hubsize = node.edges.length;
          }
        }
      }

      // if the user defined some levels but not all, alert and run without hierarchical layout
      if (undefinedLevel == true && definedLevel == true) {
        alert("To use the hierarchical layout, nodes require either no predefined levels or levels have to be defined for all nodes.");
        this.zoomExtent(true,this.constants.clustering.enabled);
        if (!this.constants.clustering.enabled) {
          this.start();
        }
      }
      else {
        // setup the system to use hierarchical method.
        this._changeConstants();

        // define levels if undefined by the users. Based on hubsize
        if (undefinedLevel == true) {
          this._determineLevels(hubsize);
        }
        // check the distribution of the nodes per level.
        var distribution = this._getDistribution();

        // place the nodes on the canvas. This also stablilizes the system.
        this._placeNodesByHierarchy(distribution);

        // start the simulation.
        this.start();
      }
    }
  },


  /**
   * This function places the nodes on the canvas based on the hierarchial distribution.
   *
   * @param {Object} distribution | obtained by the function this._getDistribution()
   * @private
   */
  _placeNodesByHierarchy : function(distribution) {
    var nodeId, node;

    // start placing all the level 0 nodes first. Then recursively position their branches.
    for (nodeId in distribution[0].nodes) {
      if (distribution[0].nodes.hasOwnProperty(nodeId)) {
        node = distribution[0].nodes[nodeId];
        if (this.constants.hierarchicalLayout.direction == "UD" || this.constants.hierarchicalLayout.direction == "DU") {
          if (node.xFixed) {
            node.x = distribution[0].minPos;
            node.xFixed = false;

            distribution[0].minPos += distribution[0].nodeSpacing;
          }
        }
        else {
          if (node.yFixed) {
            node.y = distribution[0].minPos;
            node.yFixed = false;

            distribution[0].minPos += distribution[0].nodeSpacing;
          }
        }
        this._placeBranchNodes(node.edges,node.id,distribution,node.level);
      }
    }

    // stabilize the system after positioning. This function calls zoomExtent.
    this._stabilize();
  },


  /**
   * This function get the distribution of levels based on hubsize
   *
   * @returns {Object}
   * @private
   */
  _getDistribution : function() {
    var distribution = {};
    var nodeId, node, level;

    // we fix Y because the hierarchy is vertical, we fix X so we do not give a node an x position for a second time.
    // the fix of X is removed after the x value has been set.
    for (nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        node = this.nodes[nodeId];
        node.xFixed = true;
        node.yFixed = true;
        if (this.constants.hierarchicalLayout.direction == "UD" || this.constants.hierarchicalLayout.direction == "DU") {
          node.y = this.constants.hierarchicalLayout.levelSeparation*node.level;
        }
        else {
          node.x = this.constants.hierarchicalLayout.levelSeparation*node.level;
        }
        if (!distribution.hasOwnProperty(node.level)) {
          distribution[node.level] = {amount: 0, nodes: {}, minPos:0, nodeSpacing:0};
        }
        distribution[node.level].amount += 1;
        distribution[node.level].nodes[node.id] = node;
      }
    }

    // determine the largest amount of nodes of all levels
    var maxCount = 0;
    for (level in distribution) {
      if (distribution.hasOwnProperty(level)) {
        if (maxCount < distribution[level].amount) {
          maxCount = distribution[level].amount;
        }
      }
    }

    // set the initial position and spacing of each nodes accordingly
    for (level in distribution) {
      if (distribution.hasOwnProperty(level)) {
        distribution[level].nodeSpacing = (maxCount + 1) * this.constants.hierarchicalLayout.nodeSpacing;
        distribution[level].nodeSpacing /= (distribution[level].amount + 1);
        distribution[level].minPos = distribution[level].nodeSpacing - (0.5 * (distribution[level].amount + 1) * distribution[level].nodeSpacing);
      }
    }

    return distribution;
  },


  /**
   * this function allocates nodes in levels based on the recursive branching from the largest hubs.
   *
   * @param hubsize
   * @private
   */
  _determineLevels : function(hubsize) {
    var nodeId, node;

    // determine hubs
    for (nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        node = this.nodes[nodeId];
        if (node.edges.length == hubsize) {
          node.level = 0;
        }
      }
    }

    // branch from hubs
    for (nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        node = this.nodes[nodeId];
        if (node.level == 0) {
          this._setLevel(1,node.edges,node.id);
        }
      }
    }
  },


  /**
   * Since hierarchical layout does not support:
   *    - smooth curves (based on the physics),
   *    - clustering (based on dynamic node counts)
   *
   * We disable both features so there will be no problems.
   *
   * @private
   */
  _changeConstants : function() {
    this.constants.clustering.enabled = false;
    this.constants.physics.barnesHut.enabled = false;
    this.constants.physics.hierarchicalRepulsion.enabled = true;
    this._loadSelectedForceSolver();
    this.constants.smoothCurves = false;
    this._configureSmoothCurves();
  },


  /**
   * This is a recursively called function to enumerate the branches from the largest hubs and place the nodes
   * on a X position that ensures there will be no overlap.
   *
   * @param edges
   * @param parentId
   * @param distribution
   * @param parentLevel
   * @private
   */
  _placeBranchNodes : function(edges, parentId, distribution, parentLevel) {
    for (var i = 0; i < edges.length; i++) {
      var childNode = null;
      if (edges[i].toId == parentId) {
        childNode = edges[i].from;
      }
      else {
        childNode = edges[i].to;
      }

      // if a node is conneceted to another node on the same level (or higher (means lower level))!, this is not handled here.
      var nodeMoved = false;
      if (this.constants.hierarchicalLayout.direction == "UD" || this.constants.hierarchicalLayout.direction == "DU") {
        if (childNode.xFixed && childNode.level > parentLevel) {
          childNode.xFixed = false;
          childNode.x = distribution[childNode.level].minPos;
          nodeMoved = true;
        }
      }
      else {
        if (childNode.yFixed && childNode.level > parentLevel) {
          childNode.yFixed = false;
          childNode.y = distribution[childNode.level].minPos;
          nodeMoved = true;
        }
      }

      if (nodeMoved == true) {
        distribution[childNode.level].minPos += distribution[childNode.level].nodeSpacing;
        if (childNode.edges.length > 1) {
          this._placeBranchNodes(childNode.edges,childNode.id,distribution,childNode.level);
        }
      }
    }
  },


  /**
   * this function is called recursively to enumerate the barnches of the largest hubs and give each node a level.
   *
   * @param level
   * @param edges
   * @param parentId
   * @private
   */
  _setLevel : function(level, edges, parentId) {
    for (var i = 0; i < edges.length; i++) {
      var childNode = null;
      if (edges[i].toId == parentId) {
        childNode = edges[i].from;
      }
      else {
        childNode = edges[i].to;
      }
      if (childNode.level == -1 || childNode.level > level) {
        childNode.level = level;
        if (edges.length > 1) {
          this._setLevel(level+1, childNode.edges, childNode.id);
        }
      }
    }
  },


  /**
   * Unfix nodes
   *
   * @private
   */
  _restoreNodes : function() {
    for (nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        this.nodes[nodeId].xFixed = false;
        this.nodes[nodeId].yFixed = false;
      }
    }
  }


};
/**
 * Created by Alex on 2/4/14.
 */

var manipulationMixin = {

  /**
   * clears the toolbar div element of children
   *
   * @private
   */
  _clearManipulatorBar : function() {
    while (this.manipulationDiv.hasChildNodes()) {
      this.manipulationDiv.removeChild(this.manipulationDiv.firstChild);
    }
  },

  /**
   * Manipulation UI temporarily overloads certain functions to extend or replace them. To be able to restore
   * these functions to their original functionality, we saved them in this.cachedFunctions.
   * This function restores these functions to their original function.
   *
   * @private
   */
  _restoreOverloadedFunctions : function() {
    for (var functionName in this.cachedFunctions) {
      if (this.cachedFunctions.hasOwnProperty(functionName)) {
        this[functionName] = this.cachedFunctions[functionName];
      }
    }
  },

  /**
   * Enable or disable edit-mode.
   *
   * @private
   */
  _toggleEditMode : function() {
    this.editMode = !this.editMode;
    var toolbar = document.getElementById("graph-manipulationDiv");
    var closeDiv = document.getElementById("graph-manipulation-closeDiv");
    var editModeDiv = document.getElementById("graph-manipulation-editMode");
    if (this.editMode == true) {
      toolbar.style.display="block";
      closeDiv.style.display="block";
      editModeDiv.style.display="none";
      closeDiv.onclick = this._toggleEditMode.bind(this);
    }
    else {
      toolbar.style.display="none";
      closeDiv.style.display="none";
      editModeDiv.style.display="block";
      closeDiv.onclick = null;
    }
    this._createManipulatorBar()
  },

  /**
   * main function, creates the main toolbar. Removes functions bound to the select event. Binds all the buttons of the toolbar.
   *
   * @private
   */
  _createManipulatorBar : function() {
    // remove bound functions
    if (this.boundFunction) {
      this.off('select', this.boundFunction);
    }

    // restore overloaded functions
    this._restoreOverloadedFunctions();

    // resume calculation
    this.freezeSimulation = false;

    // reset global variables
    this.blockConnectingEdgeSelection = false;
    this.forceAppendSelection = false;

    if (this.editMode == true) {
      while (this.manipulationDiv.hasChildNodes()) {
        this.manipulationDiv.removeChild(this.manipulationDiv.firstChild);
      }
      // add the icons to the manipulator div
      this.manipulationDiv.innerHTML = "" +
        "<span class='graph-manipulationUI add' id='graph-manipulate-addNode'>" +
          "<span class='graph-manipulationLabel'>"+this.constants.labels['add'] +"</span></span>" +
        "<div class='graph-seperatorLine'></div>" +
        "<span class='graph-manipulationUI connect' id='graph-manipulate-connectNode'>" +
          "<span class='graph-manipulationLabel'>"+this.constants.labels['link'] +"</span></span>";
      if (this._getSelectedNodeCount() == 1 && this.triggerFunctions.edit) {
        this.manipulationDiv.innerHTML += "" +
          "<div class='graph-seperatorLine'></div>" +
          "<span class='graph-manipulationUI edit' id='graph-manipulate-editNode'>" +
            "<span class='graph-manipulationLabel'>"+this.constants.labels['editNode'] +"</span></span>";
      }
      if (this._selectionIsEmpty() == false) {
        this.manipulationDiv.innerHTML += "" +
          "<div class='graph-seperatorLine'></div>" +
          "<span class='graph-manipulationUI delete' id='graph-manipulate-delete'>" +
            "<span class='graph-manipulationLabel'>"+this.constants.labels['del'] +"</span></span>";
      }


      // bind the icons
      var addNodeButton = document.getElementById("graph-manipulate-addNode");
      addNodeButton.onclick = this._createAddNodeToolbar.bind(this);
      var addEdgeButton = document.getElementById("graph-manipulate-connectNode");
      addEdgeButton.onclick = this._createAddEdgeToolbar.bind(this);
      if (this._getSelectedNodeCount() == 1 && this.triggerFunctions.edit) {
        var editButton = document.getElementById("graph-manipulate-editNode");
        editButton.onclick = this._editNode.bind(this);
      }
      if (this._selectionIsEmpty() == false) {
        var deleteButton = document.getElementById("graph-manipulate-delete");
        deleteButton.onclick = this._deleteSelected.bind(this);
      }
      var closeDiv = document.getElementById("graph-manipulation-closeDiv");
      closeDiv.onclick = this._toggleEditMode.bind(this);

      this.boundFunction = this._createManipulatorBar.bind(this);
      this.on('select', this.boundFunction);
    }
    else {
      this.editModeDiv.innerHTML = "" +
        "<span class='graph-manipulationUI edit editmode' id='graph-manipulate-editModeButton'>" +
        "<span class='graph-manipulationLabel'>" + this.constants.labels['edit'] + "</span></span>";
      var editModeButton = document.getElementById("graph-manipulate-editModeButton");
      editModeButton.onclick = this._toggleEditMode.bind(this);
    }
  },



  /**
   * Create the toolbar for adding Nodes
   *
   * @private
   */
  _createAddNodeToolbar : function() {
    // clear the toolbar
    this._clearManipulatorBar();
    if (this.boundFunction) {
      this.off('select', this.boundFunction);
    }

    // create the toolbar contents
    this.manipulationDiv.innerHTML = "" +
      "<span class='graph-manipulationUI back' id='graph-manipulate-back'>" +
      "<span class='graph-manipulationLabel'>" + this.constants.labels['back'] + " </span></span>" +
      "<div class='graph-seperatorLine'></div>" +
      "<span class='graph-manipulationUI none' id='graph-manipulate-back'>" +
      "<span id='graph-manipulatorLabel' class='graph-manipulationLabel'>" + this.constants.labels['addDescription'] + "</span></span>";

    // bind the icon
    var backButton = document.getElementById("graph-manipulate-back");
    backButton.onclick = this._createManipulatorBar.bind(this);

    // we use the boundFunction so we can reference it when we unbind it from the "select" event.
    this.boundFunction = this._addNode.bind(this);
    this.on('select', this.boundFunction);
  },


  /**
   * create the toolbar to connect nodes
   *
   * @private
   */
  _createAddEdgeToolbar : function() {
    // clear the toolbar
    this._clearManipulatorBar();
    this._unselectAll(true);
    this.freezeSimulation = true;

    if (this.boundFunction) {
      this.off('select', this.boundFunction);
    }

    this._unselectAll();
    this.forceAppendSelection = false;
    this.blockConnectingEdgeSelection = true;

    this.manipulationDiv.innerHTML = "" +
      "<span class='graph-manipulationUI back' id='graph-manipulate-back'>" +
        "<span class='graph-manipulationLabel'>" + this.constants.labels['back'] + " </span></span>" +
      "<div class='graph-seperatorLine'></div>" +
      "<span class='graph-manipulationUI none' id='graph-manipulate-back'>" +
        "<span id='graph-manipulatorLabel' class='graph-manipulationLabel'>" + this.constants.labels['linkDescription'] + "</span></span>";

    // bind the icon
    var backButton = document.getElementById("graph-manipulate-back");
    backButton.onclick = this._createManipulatorBar.bind(this);

    // we use the boundFunction so we can reference it when we unbind it from the "select" event.
    this.boundFunction = this._handleConnect.bind(this);
    this.on('select', this.boundFunction);

    // temporarily overload functions
    this.cachedFunctions["_handleTouch"] = this._handleTouch;
    this.cachedFunctions["_handleOnRelease"] = this._handleOnRelease;
    this._handleTouch = this._handleConnect;
    this._handleOnRelease = this._finishConnect;

    // redraw to show the unselect
    this._redraw();

  },


  /**
   * the function bound to the selection event. It checks if you want to connect a cluster and changes the description
   * to walk the user through the process.
   *
   * @private
   */
  _handleConnect : function(pointer) {
    if (this._getSelectedNodeCount() == 0) {
      var node = this._getNodeAt(pointer);
      if (node != null) {
        if (node.clusterSize > 1) {
          alert("Cannot create edges to a cluster.")
        }
        else {
          this._selectObject(node,false);
          // create a node the temporary line can look at
          this.sectors['support']['nodes']['targetNode'] = new Node({id:'targetNode'},{},{},this.constants);
          this.sectors['support']['nodes']['targetNode'].x = node.x;
          this.sectors['support']['nodes']['targetNode'].y = node.y;
          this.sectors['support']['nodes']['targetViaNode'] = new Node({id:'targetViaNode'},{},{},this.constants);
          this.sectors['support']['nodes']['targetViaNode'].x = node.x;
          this.sectors['support']['nodes']['targetViaNode'].y = node.y;
          this.sectors['support']['nodes']['targetViaNode'].parentEdgeId = "connectionEdge";

          // create a temporary edge
          this.edges['connectionEdge'] = new Edge({id:"connectionEdge",from:node.id,to:this.sectors['support']['nodes']['targetNode'].id}, this, this.constants);
          this.edges['connectionEdge'].from = node;
          this.edges['connectionEdge'].connected = true;
          this.edges['connectionEdge'].smooth = true;
          this.edges['connectionEdge'].selected = true;
          this.edges['connectionEdge'].to = this.sectors['support']['nodes']['targetNode'];
          this.edges['connectionEdge'].via = this.sectors['support']['nodes']['targetViaNode'];

          this.cachedFunctions["_handleOnDrag"] = this._handleOnDrag;
          this._handleOnDrag = function(event) {
            var pointer = this._getPointer(event.gesture.center);
            this.sectors['support']['nodes']['targetNode'].x = this._canvasToX(pointer.x);
            this.sectors['support']['nodes']['targetNode'].y = this._canvasToY(pointer.y);
            this.sectors['support']['nodes']['targetViaNode'].x = 0.5 * (this._canvasToX(pointer.x) + this.edges['connectionEdge'].from.x);
            this.sectors['support']['nodes']['targetViaNode'].y = this._canvasToY(pointer.y);
          };

          this.moving = true;
          this.start();
        }
      }
    }
  },

  _finishConnect : function(pointer) {
    if (this._getSelectedNodeCount() == 1) {

      // restore the drag function
      this._handleOnDrag = this.cachedFunctions["_handleOnDrag"];
      delete this.cachedFunctions["_handleOnDrag"];

      // remember the edge id
      var connectFromId = this.edges['connectionEdge'].fromId;

      // remove the temporary nodes and edge
      delete this.edges['connectionEdge'];
      delete this.sectors['support']['nodes']['targetNode'];
      delete this.sectors['support']['nodes']['targetViaNode'];

      var node = this._getNodeAt(pointer);
      if (node != null) {
        if (node.clusterSize > 1) {
          alert("Cannot create edges to a cluster.")
        }
        else {
          this._createEdge(connectFromId,node.id);
          this._createManipulatorBar();
        }
      }
      this._unselectAll();
    }
  },


  /**
   * Adds a node on the specified location
   */
  _addNode : function() {
    if (this._selectionIsEmpty() && this.editMode == true) {
      var positionObject = this._pointerToPositionObject(this.pointerPosition);
      var defaultData = {id:util.randomUUID(),x:positionObject.left,y:positionObject.top,label:"new",allowedToMoveX:true,allowedToMoveY:true};
      if (this.triggerFunctions.add) {
        if (this.triggerFunctions.add.length == 2) {
          var me = this;
          this.triggerFunctions.add(defaultData, function(finalizedData) {
            me.nodesData.add(finalizedData);
            me._createManipulatorBar();
            me.moving = true;
            me.start();
          });
        }
        else {
          alert(this.constants.labels['addError']);
          this._createManipulatorBar();
          this.moving = true;
          this.start();
        }
      }
      else {
        this.nodesData.add(defaultData);
        this._createManipulatorBar();
        this.moving = true;
        this.start();
      }
    }
  },


  /**
   * connect two nodes with a new edge.
   *
   * @private
   */
  _createEdge : function(sourceNodeId,targetNodeId) {
    if (this.editMode == true) {
      var defaultData = {from:sourceNodeId, to:targetNodeId};
      if (this.triggerFunctions.connect) {
        if (this.triggerFunctions.connect.length == 2) {
          var me = this;
          this.triggerFunctions.connect(defaultData, function(finalizedData) {
            me.edgesData.add(finalizedData);
            me.moving = true;
            me.start();
          });
        }
        else {
          alert(this.constants.labels["linkError"]);
          this.moving = true;
          this.start();
        }
      }
      else {
        this.edgesData.add(defaultData);
        this.moving = true;
        this.start();
      }
    }
  },


  /**
   * Create the toolbar to edit the selected node. The label and the color can be changed. Other colors are derived from the chosen color.
   *
   * @private
   */
  _editNode : function() {
    if (this.triggerFunctions.edit && this.editMode == true) {
      var node = this._getSelectedNode();
      var data = {id:node.id,
        label: node.label,
        group: node.group,
        shape: node.shape,
        color: {
          background:node.color.background,
          border:node.color.border,
          highlight: {
            background:node.color.highlight.background,
            border:node.color.highlight.border
          }
        }};
      if (this.triggerFunctions.edit.length == 2) {
        var me = this;
        this.triggerFunctions.edit(data, function (finalizedData) {
          me.nodesData.update(finalizedData);
          me._createManipulatorBar();
          me.moving = true;
          me.start();
        });
      }
      else {
        alert(this.constants.labels["editError"]);
      }
    }
    else {
      alert(this.constants.labels["editBoundError"]);
    }
  },


  /**
   * delete everything in the selection
   *
   * @private
   */
  _deleteSelected : function() {
    if (!this._selectionIsEmpty() && this.editMode == true) {
      if (!this._clusterInSelection()) {
        var selectedNodes = this.getSelectedNodes();
        var selectedEdges = this.getSelectedEdges();
        if (this.triggerFunctions.del) {
          var me = this;
          var data = {nodes: selectedNodes, edges: selectedEdges};
          if (this.triggerFunctions.del.length = 2) {
            this.triggerFunctions.del(data, function (finalizedData) {
              me.edgesData.remove(finalizedData.edges);
              me.nodesData.remove(finalizedData.nodes);
              me._unselectAll();
              me.moving = true;
              me.start();
            });
          }
          else {
            alert(this.constants.labels["deleteError"])
          }
        }
        else {
          this.edgesData.remove(selectedEdges);
          this.nodesData.remove(selectedNodes);
          this._unselectAll();
          this.moving = true;
          this.start();
        }
      }
      else {
        alert(this.constants.labels["deleteClusterError"]);
      }
    }
  }
};
/**
 * Creation of the SectorMixin var.
 *
 * This contains all the functions the Graph object can use to employ the sector system.
 * The sector system is always used by Graph, though the benefits only apply to the use of clustering.
 * If clustering is not used, there is no overhead except for a duplicate object with references to nodes and edges.
 *
 * Alex de Mulder
 * 21-01-2013
 */
var SectorMixin = {

  /**
   * This function is only called by the setData function of the Graph object.
   * This loads the global references into the active sector. This initializes the sector.
   *
   * @private
   */
  _putDataInSector : function() {
    this.sectors["active"][this._sector()].nodes = this.nodes;
    this.sectors["active"][this._sector()].edges = this.edges;
    this.sectors["active"][this._sector()].nodeIndices = this.nodeIndices;
  },


  /**
   *  /**
   * This function sets the global references to nodes, edges and nodeIndices back to
   * those of the supplied (active) sector. If a type is defined, do the specific type
   *
   * @param {String} sectorId
   * @param {String} [sectorType] | "active" or "frozen"
   * @private
   */
  _switchToSector : function(sectorId, sectorType) {
    if (sectorType === undefined || sectorType == "active") {
      this._switchToActiveSector(sectorId);
    }
    else {
      this._switchToFrozenSector(sectorId);
    }
  },


  /**
   * This function sets the global references to nodes, edges and nodeIndices back to
   * those of the supplied active sector.
   *
   * @param sectorId
   * @private
   */
  _switchToActiveSector : function(sectorId) {
    this.nodeIndices = this.sectors["active"][sectorId]["nodeIndices"];
    this.nodes       = this.sectors["active"][sectorId]["nodes"];
    this.edges       = this.sectors["active"][sectorId]["edges"];
  },


  /**
   * This function sets the global references to nodes, edges and nodeIndices back to
   * those of the supplied active sector.
   *
   * @param sectorId
   * @private
   */
  _switchToSupportSector : function() {
    this.nodeIndices = this.sectors["support"]["nodeIndices"];
    this.nodes       = this.sectors["support"]["nodes"];
    this.edges       = this.sectors["support"]["edges"];
  },


  /**
   * This function sets the global references to nodes, edges and nodeIndices back to
   * those of the supplied frozen sector.
   *
   * @param sectorId
   * @private
   */
  _switchToFrozenSector : function(sectorId) {
    this.nodeIndices = this.sectors["frozen"][sectorId]["nodeIndices"];
    this.nodes       = this.sectors["frozen"][sectorId]["nodes"];
    this.edges       = this.sectors["frozen"][sectorId]["edges"];
  },


  /**
   * This function sets the global references to nodes, edges and nodeIndices back to
   * those of the currently active sector.
   *
   * @private
   */
  _loadLatestSector : function() {
    this._switchToSector(this._sector());
  },


  /**
   * This function returns the currently active sector Id
   *
   * @returns {String}
   * @private
   */
  _sector : function() {
    return this.activeSector[this.activeSector.length-1];
  },


  /**
   * This function returns the previously active sector Id
   *
   * @returns {String}
   * @private
   */
  _previousSector : function() {
    if (this.activeSector.length > 1) {
      return this.activeSector[this.activeSector.length-2];
    }
    else {
      throw new TypeError('there are not enough sectors in the this.activeSector array.');
    }
  },


  /**
   * We add the active sector at the end of the this.activeSector array
   * This ensures it is the currently active sector returned by _sector() and it reaches the top
   * of the activeSector stack. When we reverse our steps we move from the end to the beginning of this stack.
   *
   * @param newId
   * @private
   */
  _setActiveSector : function(newId) {
    this.activeSector.push(newId);
  },


  /**
   * We remove the currently active sector id from the active sector stack. This happens when
   * we reactivate the previously active sector
   *
   * @private
   */
  _forgetLastSector : function() {
    this.activeSector.pop();
  },


  /**
   * This function creates a new active sector with the supplied newId. This newId
   * is the expanding node id.
   *
   * @param {String} newId   | Id of the new active sector
   * @private
   */
  _createNewSector : function(newId) {
    // create the new sector
    this.sectors["active"][newId] = {"nodes":{},
                                     "edges":{},
                                     "nodeIndices":[],
                                     "formationScale": this.scale,
                                     "drawingNode": undefined};

    // create the new sector render node. This gives visual feedback that you are in a new sector.
    this.sectors["active"][newId]['drawingNode'] = new Node(
        {id:newId,
          color: {
            background: "#eaefef",
            border: "495c5e"
          }
        },{},{},this.constants);
    this.sectors["active"][newId]['drawingNode'].clusterSize = 2;
  },


  /**
   * This function removes the currently active sector. This is called when we create a new
   * active sector.
   *
   * @param {String} sectorId   | Id of the active sector that will be removed
   * @private
   */
  _deleteActiveSector : function(sectorId) {
    delete this.sectors["active"][sectorId];
  },


  /**
   * This function removes the currently active sector. This is called when we reactivate
   * the previously active sector.
   *
   * @param {String} sectorId   | Id of the active sector that will be removed
   * @private
   */
  _deleteFrozenSector : function(sectorId) {
    delete this.sectors["frozen"][sectorId];
  },


  /**
   * Freezing an active sector means moving it from the "active" object to the "frozen" object.
   * We copy the references, then delete the active entree.
   *
   * @param sectorId
   * @private
   */
  _freezeSector : function(sectorId) {
    // we move the set references from the active to the frozen stack.
    this.sectors["frozen"][sectorId] = this.sectors["active"][sectorId];

    // we have moved the sector data into the frozen set, we now remove it from the active set
    this._deleteActiveSector(sectorId);
  },


  /**
   * This is the reverse operation of _freezeSector. Activating means moving the sector from the "frozen"
   * object to the "active" object.
   *
   * @param sectorId
   * @private
   */
  _activateSector : function(sectorId) {
    // we move the set references from the frozen to the active stack.
    this.sectors["active"][sectorId] = this.sectors["frozen"][sectorId];

    // we have moved the sector data into the active set, we now remove it from the frozen stack
    this._deleteFrozenSector(sectorId);
  },


  /**
   * This function merges the data from the currently active sector with a frozen sector. This is used
   * in the process of reverting back to the previously active sector.
   * The data that is placed in the frozen (the previously active) sector is the node that has been removed from it
   * upon the creation of a new active sector.
   *
   * @param sectorId
   * @private
   */
  _mergeThisWithFrozen : function(sectorId) {
    // copy all nodes
    for (var nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        this.sectors["frozen"][sectorId]["nodes"][nodeId] = this.nodes[nodeId];
      }
    }

    // copy all edges (if not fully clustered, else there are no edges)
    for (var edgeId in this.edges) {
      if (this.edges.hasOwnProperty(edgeId)) {
        this.sectors["frozen"][sectorId]["edges"][edgeId] = this.edges[edgeId];
      }
    }

    // merge the nodeIndices
    for (var i = 0; i < this.nodeIndices.length; i++) {
      this.sectors["frozen"][sectorId]["nodeIndices"].push(this.nodeIndices[i]);
    }
  },


  /**
   * This clusters the sector to one cluster. It was a single cluster before this process started so
   * we revert to that state. The clusterToFit function with a maximum size of 1 node does this.
   *
   * @private
   */
  _collapseThisToSingleCluster : function() {
    this.clusterToFit(1,false);
  },


  /**
   * We create a new active sector from the node that we want to open.
   *
   * @param node
   * @private
   */
  _addSector : function(node) {
    // this is the currently active sector
    var sector = this._sector();

//    // this should allow me to select nodes from a frozen set.
//    if (this.sectors['active'][sector]["nodes"].hasOwnProperty(node.id)) {
//      console.log("the node is part of the active sector");
//    }
//    else {
//      console.log("I dont know what happened!!");
//    }

    // when we switch to a new sector, we remove the node that will be expanded from the current nodes list.
    delete this.nodes[node.id];

    var unqiueIdentifier = util.randomUUID();

    // we fully freeze the currently active sector
    this._freezeSector(sector);

    // we create a new active sector. This sector has the Id of the node to ensure uniqueness
    this._createNewSector(unqiueIdentifier);

    // we add the active sector to the sectors array to be able to revert these steps later on
    this._setActiveSector(unqiueIdentifier);

    // we redirect the global references to the new sector's references. this._sector() now returns unqiueIdentifier
    this._switchToSector(this._sector());

    // finally we add the node we removed from our previous active sector to the new active sector
    this.nodes[node.id] = node;
  },


  /**
   * We close the sector that is currently open and revert back to the one before.
   * If the active sector is the "default" sector, nothing happens.
   *
   * @private
   */
  _collapseSector : function() {
    // the currently active sector
    var sector = this._sector();

    // we cannot collapse the default sector
    if (sector != "default") {
      if ((this.nodeIndices.length == 1) ||
       (this.sectors["active"][sector]["drawingNode"].width*this.scale < this.constants.clustering.screenSizeThreshold * this.frame.canvas.clientWidth) ||
       (this.sectors["active"][sector]["drawingNode"].height*this.scale < this.constants.clustering.screenSizeThreshold * this.frame.canvas.clientHeight)) {
        var previousSector = this._previousSector();

        // we collapse the sector back to a single cluster
        this._collapseThisToSingleCluster();

        // we move the remaining nodes, edges and nodeIndices to the previous sector.
        // This previous sector is the one we will reactivate
        this._mergeThisWithFrozen(previousSector);

        // the previously active (frozen) sector now has all the data from the currently active sector.
        // we can now delete the active sector.
        this._deleteActiveSector(sector);

        // we activate the previously active (and currently frozen) sector.
        this._activateSector(previousSector);

        // we load the references from the newly active sector into the global references
        this._switchToSector(previousSector);

        // we forget the previously active sector because we reverted to the one before
        this._forgetLastSector();

        // finally, we update the node index list.
        this._updateNodeIndexList();

        // we refresh the list with calulation nodes and calculation node indices.
        this._updateCalculationNodes();
      }
    }
  },


  /**
   * This runs a function in all active sectors. This is used in _redraw() and the _initializeForceCalculation().
   *
   * @param {String} runFunction  |   This is the NAME of a function we want to call in all active sectors
   *                              |   we dont pass the function itself because then the "this" is the window object
   *                              |   instead of the Graph object
   * @param {*} [argument]            |   Optional: arguments to pass to the runFunction
   * @private
   */
  _doInAllActiveSectors : function(runFunction,argument) {
    if (argument === undefined) {
      for (var sector in this.sectors["active"]) {
        if (this.sectors["active"].hasOwnProperty(sector)) {
          // switch the global references to those of this sector
          this._switchToActiveSector(sector);
          this[runFunction]();
        }
      }
    }
    else {
      for (var sector in this.sectors["active"]) {
        if (this.sectors["active"].hasOwnProperty(sector)) {
          // switch the global references to those of this sector
          this._switchToActiveSector(sector);
          var args = Array.prototype.splice.call(arguments, 1);
          if (args.length > 1) {
            this[runFunction](args[0],args[1]);
          }
          else {
            this[runFunction](argument);
          }
        }
      }
    }
    // we revert the global references back to our active sector
    this._loadLatestSector();
  },


  /**
   * This runs a function in all active sectors. This is used in _redraw() and the _initializeForceCalculation().
   *
   * @param {String} runFunction  |   This is the NAME of a function we want to call in all active sectors
   *                              |   we dont pass the function itself because then the "this" is the window object
   *                              |   instead of the Graph object
   * @param {*} [argument]        |   Optional: arguments to pass to the runFunction
   * @private
   */
  _doInSupportSector : function(runFunction,argument) {
    if (argument === undefined) {
      this._switchToSupportSector();
      this[runFunction]();
    }
    else {
      this._switchToSupportSector();
      var args = Array.prototype.splice.call(arguments, 1);
      if (args.length > 1) {
        this[runFunction](args[0],args[1]);
      }
      else {
        this[runFunction](argument);
      }
    }
    // we revert the global references back to our active sector
    this._loadLatestSector();
  },


  /**
   * This runs a function in all frozen sectors. This is used in the _redraw().
   *
   * @param {String} runFunction  |   This is the NAME of a function we want to call in all active sectors
   *                              |   we don't pass the function itself because then the "this" is the window object
   *                              |   instead of the Graph object
   * @param {*} [argument]            |   Optional: arguments to pass to the runFunction
   * @private
   */
  _doInAllFrozenSectors : function(runFunction,argument) {
    if (argument === undefined) {
      for (var sector in this.sectors["frozen"]) {
        if (this.sectors["frozen"].hasOwnProperty(sector)) {
          // switch the global references to those of this sector
          this._switchToFrozenSector(sector);
          this[runFunction]();
        }
      }
    }
    else {
      for (var sector in this.sectors["frozen"]) {
        if (this.sectors["frozen"].hasOwnProperty(sector)) {
          // switch the global references to those of this sector
          this._switchToFrozenSector(sector);
          var args = Array.prototype.splice.call(arguments, 1);
          if (args.length > 1) {
            this[runFunction](args[0],args[1]);
          }
          else {
            this[runFunction](argument);
          }
        }
      }
    }
    this._loadLatestSector();
  },


  /**
   * This runs a function in all sectors. This is used in the _redraw().
   *
   * @param {String} runFunction  |   This is the NAME of a function we want to call in all active sectors
   *                              |   we don't pass the function itself because then the "this" is the window object
   *                              |   instead of the Graph object
   * @param {*} [argument]        |   Optional: arguments to pass to the runFunction
   * @private
   */
  _doInAllSectors : function(runFunction,argument) {
    var args = Array.prototype.splice.call(arguments, 1);
    if (argument === undefined) {
      this._doInAllActiveSectors(runFunction);
      this._doInAllFrozenSectors(runFunction);
    }
    else {
      if (args.length > 1) {
        this._doInAllActiveSectors(runFunction,args[0],args[1]);
        this._doInAllFrozenSectors(runFunction,args[0],args[1]);
      }
      else {
        this._doInAllActiveSectors(runFunction,argument);
        this._doInAllFrozenSectors(runFunction,argument);
      }
    }
  },


  /**
   * This clears the nodeIndices list. We cannot use this.nodeIndices = [] because we would break the link with the
   * active sector. Thus we clear the nodeIndices in the active sector, then reconnect the this.nodeIndices to it.
   *
   * @private
   */
  _clearNodeIndexList : function() {
    var sector = this._sector();
    this.sectors["active"][sector]["nodeIndices"] = [];
    this.nodeIndices = this.sectors["active"][sector]["nodeIndices"];
  },


  /**
   * Draw the encompassing sector node
   *
   * @param ctx
   * @param sectorType
   * @private
   */
  _drawSectorNodes : function(ctx,sectorType) {
    var minY = 1e9, maxY = -1e9, minX = 1e9, maxX = -1e9, node;
    for (var sector in this.sectors[sectorType]) {
      if (this.sectors[sectorType].hasOwnProperty(sector)) {
        if (this.sectors[sectorType][sector]["drawingNode"] !== undefined) {

          this._switchToSector(sector,sectorType);

          minY = 1e9; maxY = -1e9; minX = 1e9; maxX = -1e9;
          for (var nodeId in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeId)) {
              node = this.nodes[nodeId];
              node.resize(ctx);
              if (minX > node.x - 0.5 * node.width) {minX = node.x - 0.5 * node.width;}
              if (maxX < node.x + 0.5 * node.width) {maxX = node.x + 0.5 * node.width;}
              if (minY > node.y - 0.5 * node.height) {minY = node.y - 0.5 * node.height;}
              if (maxY < node.y + 0.5 * node.height) {maxY = node.y + 0.5 * node.height;}
            }
          }
          node = this.sectors[sectorType][sector]["drawingNode"];
          node.x = 0.5 * (maxX + minX);
          node.y = 0.5 * (maxY + minY);
          node.width = 2 * (node.x - minX);
          node.height = 2 * (node.y - minY);
          node.radius = Math.sqrt(Math.pow(0.5*node.width,2) + Math.pow(0.5*node.height,2));
          node.setScale(this.scale);
          node._drawCircle(ctx);
        }
      }
    }
  },

  _drawAllSectorNodes : function(ctx) {
    this._drawSectorNodes(ctx,"frozen");
    this._drawSectorNodes(ctx,"active");
    this._loadLatestSector();
  }
};
/**
 * Creation of the ClusterMixin var.
 *
 * This contains all the functions the Graph object can use to employ clustering
 *
 * Alex de Mulder
 * 21-01-2013
 */
var ClusterMixin = {

 /**
  * This is only called in the constructor of the graph object
  *
  */
 startWithClustering : function() {
   // cluster if the data set is big
   this.clusterToFit(this.constants.clustering.initialMaxNodes, true);

   // updates the lables after clustering
   this.updateLabels();

   // this is called here because if clusterin is disabled, the start and stabilize are called in
   // the setData function.
   if (this.stabilize) {
     this._stabilize();
   }
   this.start();
 },

  /**
   * This function clusters until the initialMaxNodes has been reached
   *
   * @param {Number}  maxNumberOfNodes
   * @param {Boolean} reposition
   */
  clusterToFit : function(maxNumberOfNodes, reposition) {
    var numberOfNodes = this.nodeIndices.length;

    var maxLevels = 50;
    var level = 0;

    // we first cluster the hubs, then we pull in the outliers, repeat
    while (numberOfNodes > maxNumberOfNodes && level < maxLevels) {
      if (level % 3 == 0) {
        this.forceAggregateHubs(true);
        this.normalizeClusterLevels();
      }
      else {
        this.increaseClusterLevel(); // this also includes a cluster normalization
      }

      numberOfNodes = this.nodeIndices.length;
      level += 1;
    }

    // after the clustering we reposition the nodes to reduce the initial chaos
    if (level > 0 && reposition == true) {
      this.repositionNodes();
    }
    this._updateCalculationNodes();
  },

  /**
   * This function can be called to open up a specific cluster. It is only called by
   * It will unpack the cluster back one level.
   *
   * @param node    | Node object: cluster to open.
   */
  openCluster : function(node) {
    var isMovingBeforeClustering = this.moving;
    if (node.clusterSize > this.constants.clustering.sectorThreshold && this._nodeInActiveArea(node) &&
      !(this._sector() == "default" && this.nodeIndices.length == 1)) {
      // this loads a new sector, loads the nodes and edges and nodeIndices of it.
      this._addSector(node);
      var level = 0;

      // we decluster until we reach a decent number of nodes
      while ((this.nodeIndices.length < this.constants.clustering.initialMaxNodes) && (level < 10)) {
        this.decreaseClusterLevel();
        level += 1;
      }

    }
    else {
      this._expandClusterNode(node,false,true);

      // update the index list, dynamic edges and labels
      this._updateNodeIndexList();
      this._updateDynamicEdges();
      this._updateCalculationNodes();
      this.updateLabels();
    }

    // if the simulation was settled, we restart the simulation if a cluster has been formed or expanded
    if (this.moving != isMovingBeforeClustering) {
      this.start();
    }
  },


  /**
   * This calls the updateClustes with default arguments
   */
  updateClustersDefault : function() {
    if (this.constants.clustering.enabled == true) {
      this.updateClusters(0,false,false);
    }
  },


  /**
   * This function can be called to increase the cluster level. This means that the nodes with only one edge connection will
   * be clustered with their connected node. This can be repeated as many times as needed.
   * This can be called externally (by a keybind for instance) to reduce the complexity of big datasets.
   */
  increaseClusterLevel : function() {
    this.updateClusters(-1,false,true);
  },


  /**
   * This function can be called to decrease the cluster level. This means that the nodes with only one edge connection will
   * be unpacked if they are a cluster. This can be repeated as many times as needed.
   * This can be called externally (by a key-bind for instance) to look into clusters without zooming.
   */
  decreaseClusterLevel : function() {
    this.updateClusters(1,false,true);
  },


  /**
   * This is the main clustering function. It clusters and declusters on zoom or forced
   * This function clusters on zoom, it can be called with a predefined zoom direction
   * If out, check if we can form clusters, if in, check if we can open clusters.
   * This function is only called from _zoom()
   *
   * @param {Number} zoomDirection  | -1 / 0 / +1   for  zoomOut / determineByZoom / zoomIn
   * @param {Boolean} recursive     | enabled or disable recursive calling of the opening of clusters
   * @param {Boolean} force         | enabled or disable forcing
   * @param {Boolean} doNotStart    | if true do not call start
   *
   */
  updateClusters : function(zoomDirection,recursive,force,doNotStart) {
    var isMovingBeforeClustering = this.moving;
    var amountOfNodes = this.nodeIndices.length;

    // on zoom out collapse the sector if the scale is at the level the sector was made
    if (this.previousScale > this.scale && zoomDirection == 0) {
      this._collapseSector();
    }

    // check if we zoom in or out
    if (this.previousScale > this.scale || zoomDirection == -1) { // zoom out
      // forming clusters when forced pulls outliers in. When not forced, the edge length of the
      // outer nodes determines if it is being clustered
      this._formClusters(force);
    }
    else if (this.previousScale < this.scale || zoomDirection == 1) { // zoom in
      if (force == true) {
        // _openClusters checks for each node if the formationScale of the cluster is smaller than
        // the current scale and if so, declusters. When forced, all clusters are reduced by one step
        this._openClusters(recursive,force);
      }
      else {
        // if a cluster takes up a set percentage of the active window
        this._openClustersBySize();
      }
    }
    this._updateNodeIndexList();

    // if a cluster was NOT formed and the user zoomed out, we try clustering by hubs
    if (this.nodeIndices.length == amountOfNodes && (this.previousScale > this.scale || zoomDirection == -1))  {
      this._aggregateHubs(force);
      this._updateNodeIndexList();
    }

    // we now reduce chains.
    if (this.previousScale > this.scale || zoomDirection == -1) { // zoom out
      this.handleChains();
      this._updateNodeIndexList();
    }

    this.previousScale = this.scale;

    // rest of the update the index list, dynamic edges and labels
    this._updateDynamicEdges();
    this.updateLabels();

    // if a cluster was formed, we increase the clusterSession
    if (this.nodeIndices.length < amountOfNodes) { // this means a clustering operation has taken place
      this.clusterSession += 1;
      // if clusters have been made, we normalize the cluster level
      this.normalizeClusterLevels();
    }

    if (doNotStart == false || doNotStart === undefined) {
      // if the simulation was settled, we restart the simulation if a cluster has been formed or expanded
      if (this.moving != isMovingBeforeClustering) {
        this.start();
      }
    }

    this._updateCalculationNodes();
  },

  /**
   * This function handles the chains. It is called on every updateClusters().
   */
  handleChains : function() {
    // after clustering we check how many chains there are
    var chainPercentage = this._getChainFraction();
    if (chainPercentage > this.constants.clustering.chainThreshold) {
      this._reduceAmountOfChains(1 - this.constants.clustering.chainThreshold / chainPercentage)

    }
  },

  /**
   * this functions starts clustering by hubs
   * The minimum hub threshold is set globally
   *
   * @private
   */
  _aggregateHubs : function(force) {
    this._getHubSize();
    this._formClustersByHub(force,false);
  },


  /**
   * This function is fired by keypress. It forces hubs to form.
   *
   */
  forceAggregateHubs : function(doNotStart) {
    var isMovingBeforeClustering = this.moving;
    var amountOfNodes = this.nodeIndices.length;

    this._aggregateHubs(true);

    // update the index list, dynamic edges and labels
    this._updateNodeIndexList();
    this._updateDynamicEdges();
    this.updateLabels();

    // if a cluster was formed, we increase the clusterSession
    if (this.nodeIndices.length != amountOfNodes) {
      this.clusterSession += 1;
    }

    if (doNotStart == false || doNotStart === undefined) {
      // if the simulation was settled, we restart the simulation if a cluster has been formed or expanded
      if (this.moving != isMovingBeforeClustering) {
        this.start();
      }
    }
  },

  /**
   * If a cluster takes up more than a set percentage of the screen, open the cluster
   *
   * @private
   */
  _openClustersBySize : function() {
    for (var nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        var node = this.nodes[nodeId];
        if (node.inView() == true) {
          if ((node.width*this.scale > this.constants.clustering.screenSizeThreshold * this.frame.canvas.clientWidth) ||
              (node.height*this.scale > this.constants.clustering.screenSizeThreshold * this.frame.canvas.clientHeight)) {
            this.openCluster(node);
          }
        }
      }
    }
  },


  /**
   * This function loops over all nodes in the nodeIndices list. For each node it checks if it is a cluster and if it
   * has to be opened based on the current zoom level.
   *
   * @private
   */
  _openClusters : function(recursive,force) {
    for (var i = 0; i < this.nodeIndices.length; i++) {
      var node = this.nodes[this.nodeIndices[i]];
      this._expandClusterNode(node,recursive,force);
      this._updateCalculationNodes();
    }
  },

  /**
   * This function checks if a node has to be opened. This is done by checking the zoom level.
   * If the node contains child nodes, this function is recursively called on the child nodes as well.
   * This recursive behaviour is optional and can be set by the recursive argument.
   *
   * @param {Node}    parentNode    | to check for cluster and expand
   * @param {Boolean} recursive     | enabled or disable recursive calling
   * @param {Boolean} force         | enabled or disable forcing
   * @param {Boolean} [openAll]     | This will recursively force all nodes in the parent to be released
   * @private
   */
  _expandClusterNode : function(parentNode, recursive, force, openAll) {
    // first check if node is a cluster
    if (parentNode.clusterSize > 1) {
      // this means that on a double tap event or a zoom event, the cluster fully unpacks if it is smaller than 20
      if (parentNode.clusterSize < this.constants.clustering.sectorThreshold) {
        openAll = true;
      }
      recursive = openAll ? true : recursive;

      // if the last child has been added on a smaller scale than current scale decluster
      if (parentNode.formationScale < this.scale || force == true) {
        // we will check if any of the contained child nodes should be removed from the cluster
        for (var containedNodeId in parentNode.containedNodes) {
          if (parentNode.containedNodes.hasOwnProperty(containedNodeId)) {
            var childNode = parentNode.containedNodes[containedNodeId];

            // force expand will expand the largest cluster size clusters. Since we cluster from outside in, we assume that
            // the largest cluster is the one that comes from outside
            if (force == true) {
              if (childNode.clusterSession == parentNode.clusterSessions[parentNode.clusterSessions.length-1]
                  || openAll) {
                this._expelChildFromParent(parentNode,containedNodeId,recursive,force,openAll);
              }
            }
            else {
              if (this._nodeInActiveArea(parentNode)) {
                this._expelChildFromParent(parentNode,containedNodeId,recursive,force,openAll);
              }
            }
          }
        }
      }
    }
  },

  /**
   * ONLY CALLED FROM _expandClusterNode
   *
   * This function will expel a child_node from a parent_node. This is to de-cluster the node. This function will remove
   * the child node from the parent contained_node object and put it back into the global nodes object.
   * The same holds for the edge that was connected to the child node. It is moved back into the global edges object.
   *
   * @param {Node}    parentNode        | the parent node
   * @param {String}  containedNodeId   | child_node id as it is contained in the containedNodes object of the parent node
   * @param {Boolean} recursive         | This will also check if the child needs to be expanded.
   *                                      With force and recursive both true, the entire cluster is unpacked
   * @param {Boolean} force             | This will disregard the zoom level and will expel this child from the parent
   * @param {Boolean} openAll           | This will recursively force all nodes in the parent to be released
   * @private
   */
   _expelChildFromParent : function(parentNode, containedNodeId, recursive, force, openAll) {
    var childNode = parentNode.containedNodes[containedNodeId];

    // if child node has been added on smaller scale than current, kick out
    if (childNode.formationScale < this.scale || force == true) {
      // unselect all selected items
      this._unselectAll();

      // put the child node back in the global nodes object
      this.nodes[containedNodeId] = childNode;

      // release the contained edges from this childNode back into the global edges
      this._releaseContainedEdges(parentNode,childNode);

      // reconnect rerouted edges to the childNode
      this._connectEdgeBackToChild(parentNode,childNode);

      // validate all edges in dynamicEdges
      this._validateEdges(parentNode);

      // undo the changes from the clustering operation on the parent node
      parentNode.mass -= childNode.mass;
      parentNode.clusterSize -= childNode.clusterSize;
      parentNode.fontSize = Math.min(this.constants.clustering.maxFontSize, this.constants.nodes.fontSize + this.constants.clustering.fontSizeMultiplier*parentNode.clusterSize);
      parentNode.dynamicEdgesLength = parentNode.dynamicEdges.length;

      // place the child node near the parent, not at the exact same location to avoid chaos in the system
      childNode.x = parentNode.x + parentNode.growthIndicator * (0.5 - Math.random());
      childNode.y = parentNode.y + parentNode.growthIndicator * (0.5 - Math.random());

      // remove node from the list
      delete parentNode.containedNodes[containedNodeId];

      // check if there are other childs with this clusterSession in the parent.
      var othersPresent = false;
      for (var childNodeId in parentNode.containedNodes) {
        if (parentNode.containedNodes.hasOwnProperty(childNodeId)) {
          if (parentNode.containedNodes[childNodeId].clusterSession == childNode.clusterSession) {
            othersPresent = true;
            break;
          }
        }
      }
      // if there are no others, remove the cluster session from the list
      if (othersPresent == false) {
        parentNode.clusterSessions.pop();
      }

      this._repositionBezierNodes(childNode);
//      this._repositionBezierNodes(parentNode);

      // remove the clusterSession from the child node
      childNode.clusterSession = 0;

      // recalculate the size of the node on the next time the node is rendered
      parentNode.clearSizeCache();

      // restart the simulation to reorganise all nodes
      this.moving = true;
    }

    // check if a further expansion step is possible if recursivity is enabled
    if (recursive == true) {
      this._expandClusterNode(childNode,recursive,force,openAll);
    }
  },


  /**
   * position the bezier nodes at the center of the edges
   *
   * @param node
   * @private
   */
  _repositionBezierNodes : function(node) {
    for (var i = 0; i < node.dynamicEdges.length; i++) {
      node.dynamicEdges[i].positionBezierNode();
    }
  },


  /**
   * This function checks if any nodes at the end of their trees have edges below a threshold length
   * This function is called only from updateClusters()
   * forceLevelCollapse ignores the length of the edge and collapses one level
   * This means that a node with only one edge will be clustered with its connected node
   *
   * @private
   * @param {Boolean} force
   */
  _formClusters : function(force) {
    if (force == false) {
      this._formClustersByZoom();
    }
    else {
      this._forceClustersByZoom();
    }
  },


  /**
   * This function handles the clustering by zooming out, this is based on a minimum edge distance
   *
   * @private
   */
  _formClustersByZoom : function() {
    var dx,dy,length,
        minLength = this.constants.clustering.clusterEdgeThreshold/this.scale;

    // check if any edges are shorter than minLength and start the clustering
    // the clustering favours the node with the larger mass
    for (var edgeId in this.edges) {
      if (this.edges.hasOwnProperty(edgeId)) {
        var edge = this.edges[edgeId];
        if (edge.connected) {
          if (edge.toId != edge.fromId) {
            dx = (edge.to.x - edge.from.x);
            dy = (edge.to.y - edge.from.y);
            length = Math.sqrt(dx * dx + dy * dy);


            if (length < minLength) {
              // first check which node is larger
              var parentNode = edge.from;
              var childNode = edge.to;
              if (edge.to.mass > edge.from.mass) {
                parentNode = edge.to;
                childNode = edge.from;
              }

              if (childNode.dynamicEdgesLength == 1) {
                this._addToCluster(parentNode,childNode,false);
              }
              else if (parentNode.dynamicEdgesLength == 1) {
                this._addToCluster(childNode,parentNode,false);
              }
            }
          }
        }
      }
    }
  },

  /**
   * This function forces the graph to cluster all nodes with only one connecting edge to their
   * connected node.
   *
   * @private
   */
  _forceClustersByZoom : function() {
    for (var nodeId in this.nodes) {
      // another node could have absorbed this child.
      if (this.nodes.hasOwnProperty(nodeId)) {
        var childNode = this.nodes[nodeId];

        // the edges can be swallowed by another decrease
        if (childNode.dynamicEdgesLength == 1 && childNode.dynamicEdges.length != 0) {
          var edge = childNode.dynamicEdges[0];
          var parentNode = (edge.toId == childNode.id) ? this.nodes[edge.fromId] : this.nodes[edge.toId];

          // group to the largest node
          if (childNode.id != parentNode.id) {
            if (parentNode.mass > childNode.mass) {
              this._addToCluster(parentNode,childNode,true);
            }
            else {
              this._addToCluster(childNode,parentNode,true);
            }
          }
        }
      }
    }
  },


  /**
   * To keep the nodes of roughly equal size we normalize the cluster levels.
   * This function clusters a node to its smallest connected neighbour.
   *
   * @param node
   * @private
   */
  _clusterToSmallestNeighbour : function(node) {
    var smallestNeighbour = -1;
    var smallestNeighbourNode = null;
    for (var i = 0; i < node.dynamicEdges.length; i++) {
      if (node.dynamicEdges[i] !== undefined) {
        var neighbour = null;
        if (node.dynamicEdges[i].fromId != node.id) {
          neighbour = node.dynamicEdges[i].from;
        }
        else if (node.dynamicEdges[i].toId != node.id) {
          neighbour = node.dynamicEdges[i].to;
        }


        if (neighbour != null && smallestNeighbour > neighbour.clusterSessions.length) {
          smallestNeighbour = neighbour.clusterSessions.length;
          smallestNeighbourNode = neighbour;
        }
      }
    }

    if (neighbour != null && this.nodes[neighbour.id] !== undefined) {
      this._addToCluster(neighbour, node, true);
    }
  },


  /**
   * This function forms clusters from hubs, it loops over all nodes
   *
   * @param {Boolean} force         |   Disregard zoom level
   * @param {Boolean} onlyEqual     |   This only clusters a hub with a specific number of edges
   * @private
   */
  _formClustersByHub : function(force, onlyEqual) {
    // we loop over all nodes in the list
    for (var nodeId in this.nodes) {
      // we check if it is still available since it can be used by the clustering in this loop
      if (this.nodes.hasOwnProperty(nodeId)) {
        this._formClusterFromHub(this.nodes[nodeId],force,onlyEqual);
      }
    }
  },

  /**
   * This function forms a cluster from a specific preselected hub node
   *
   * @param {Node}    hubNode       |   the node we will cluster as a hub
   * @param {Boolean} force         |   Disregard zoom level
   * @param {Boolean} onlyEqual     |   This only clusters a hub with a specific number of edges
   * @param {Number} [absorptionSizeOffset] |
   * @private
   */
  _formClusterFromHub : function(hubNode, force, onlyEqual, absorptionSizeOffset) {
    if (absorptionSizeOffset === undefined) {
      absorptionSizeOffset = 0;
    }
    // we decide if the node is a hub
    if ((hubNode.dynamicEdgesLength >= this.hubThreshold && onlyEqual == false) ||
      (hubNode.dynamicEdgesLength == this.hubThreshold && onlyEqual == true)) {
      // initialize variables
      var dx,dy,length;
      var minLength = this.constants.clustering.clusterEdgeThreshold/this.scale;
      var allowCluster = false;

      // we create a list of edges because the dynamicEdges change over the course of this loop
      var edgesIdarray = [];
      var amountOfInitialEdges = hubNode.dynamicEdges.length;
      for (var j = 0; j < amountOfInitialEdges; j++) {
        edgesIdarray.push(hubNode.dynamicEdges[j].id);
      }

      // if the hub clustering is not forces, we check if one of the edges connected
      // to a cluster is small enough based on the constants.clustering.clusterEdgeThreshold
      if (force == false) {
        allowCluster = false;
        for (j = 0; j < amountOfInitialEdges; j++) {
          var edge = this.edges[edgesIdarray[j]];
          if (edge !== undefined) {
            if (edge.connected) {
              if (edge.toId != edge.fromId) {
                dx = (edge.to.x - edge.from.x);
                dy = (edge.to.y - edge.from.y);
                length = Math.sqrt(dx * dx + dy * dy);

                if (length < minLength) {
                  allowCluster = true;
                  break;
                }
              }
            }
          }
        }
      }

      // start the clustering if allowed
      if ((!force && allowCluster) || force) {
        // we loop over all edges INITIALLY connected to this hub
        for (j = 0; j < amountOfInitialEdges; j++) {
          edge = this.edges[edgesIdarray[j]];
          // the edge can be clustered by this function in a previous loop
          if (edge !== undefined) {
            var childNode = this.nodes[(edge.fromId == hubNode.id) ? edge.toId : edge.fromId];
            // we do not want hubs to merge with other hubs nor do we want to cluster itself.
            if ((childNode.dynamicEdges.length <= (this.hubThreshold + absorptionSizeOffset)) &&
                (childNode.id != hubNode.id)) {
              this._addToCluster(hubNode,childNode,force);
            }
          }
        }
      }
    }
  },



  /**
   * This function adds the child node to the parent node, creating a cluster if it is not already.
   *
   * @param {Node} parentNode           | this is the node that will house the child node
   * @param {Node} childNode            | this node will be deleted from the global this.nodes and stored in the parent node
   * @param {Boolean} force             | true will only update the remainingEdges at the very end of the clustering, ensuring single level collapse
   * @private
   */
  _addToCluster : function(parentNode, childNode, force) {
    // join child node in the parent node
    parentNode.containedNodes[childNode.id] = childNode;

    // manage all the edges connected to the child and parent nodes
    for (var i = 0; i < childNode.dynamicEdges.length; i++) {
      var edge = childNode.dynamicEdges[i];
      if (edge.toId == parentNode.id || edge.fromId == parentNode.id) { // edge connected to parentNode
        this._addToContainedEdges(parentNode,childNode,edge);
      }
      else {
        this._connectEdgeToCluster(parentNode,childNode,edge);
      }
    }
    // a contained node has no dynamic edges.
    childNode.dynamicEdges = [];

    // remove circular edges from clusters
    this._containCircularEdgesFromNode(parentNode,childNode);


    // remove the childNode from the global nodes object
    delete this.nodes[childNode.id];

    // update the properties of the child and parent
    var massBefore = parentNode.mass;
    childNode.clusterSession = this.clusterSession;
    parentNode.mass += childNode.mass;
    parentNode.clusterSize += childNode.clusterSize;
    parentNode.fontSize = Math.min(this.constants.clustering.maxFontSize, this.constants.nodes.fontSize + this.constants.clustering.fontSizeMultiplier*parentNode.clusterSize);

    // keep track of the clustersessions so we can open the cluster up as it has been formed.
    if (parentNode.clusterSessions[parentNode.clusterSessions.length - 1] != this.clusterSession) {
      parentNode.clusterSessions.push(this.clusterSession);
    }

    // forced clusters only open from screen size and double tap
    if (force == true) {
      // parentNode.formationScale = Math.pow(1 - (1.0/11.0),this.clusterSession+3);
      parentNode.formationScale = 0;
    }
    else {
      parentNode.formationScale = this.scale; // The latest child has been added on this scale
    }

    // recalculate the size of the node on the next time the node is rendered
    parentNode.clearSizeCache();

    // set the pop-out scale for the childnode
    parentNode.containedNodes[childNode.id].formationScale = parentNode.formationScale;

    // nullify the movement velocity of the child, this is to avoid hectic behaviour
    childNode.clearVelocity();

    // the mass has altered, preservation of energy dictates the velocity to be updated
    parentNode.updateVelocity(massBefore);

    // restart the simulation to reorganise all nodes
    this.moving = true;
  },


  /**
   * This function will apply the changes made to the remainingEdges during the formation of the clusters.
   * This is a seperate function to allow for level-wise collapsing of the node barnesHutTree.
   * It has to be called if a level is collapsed. It is called by _formClusters().
   * @private
   */
  _updateDynamicEdges : function() {
    for (var i = 0; i < this.nodeIndices.length; i++) {
      var node = this.nodes[this.nodeIndices[i]];
      node.dynamicEdgesLength = node.dynamicEdges.length;

      // this corrects for multiple edges pointing at the same other node
      var correction = 0;
      if (node.dynamicEdgesLength > 1) {
        for (var j = 0; j < node.dynamicEdgesLength - 1; j++) {
          var edgeToId = node.dynamicEdges[j].toId;
          var edgeFromId = node.dynamicEdges[j].fromId;
          for (var k = j+1; k < node.dynamicEdgesLength; k++) {
            if ((node.dynamicEdges[k].toId == edgeToId && node.dynamicEdges[k].fromId == edgeFromId) ||
                (node.dynamicEdges[k].fromId == edgeToId && node.dynamicEdges[k].toId == edgeFromId)) {
              correction += 1;
            }
          }
        }
      }
      node.dynamicEdgesLength -= correction;
    }
  },


  /**
   * This adds an edge from the childNode to the contained edges of the parent node
   *
   * @param parentNode    | Node object
   * @param childNode     | Node object
   * @param edge          | Edge object
   * @private
   */
  _addToContainedEdges : function(parentNode, childNode, edge) {
    // create an array object if it does not yet exist for this childNode
    if (!(parentNode.containedEdges.hasOwnProperty(childNode.id))) {
      parentNode.containedEdges[childNode.id] = []
    }
    // add this edge to the list
    parentNode.containedEdges[childNode.id].push(edge);

    // remove the edge from the global edges object
    delete this.edges[edge.id];

    // remove the edge from the parent object
    for (var i = 0; i < parentNode.dynamicEdges.length; i++) {
      if (parentNode.dynamicEdges[i].id == edge.id) {
        parentNode.dynamicEdges.splice(i,1);
        break;
      }
    }
  },

  /**
   * This function connects an edge that was connected to a child node to the parent node.
   * It keeps track of which nodes it has been connected to with the originalId array.
   *
   * @param {Node} parentNode    | Node object
   * @param {Node} childNode     | Node object
   * @param {Edge} edge          | Edge object
   * @private
   */
  _connectEdgeToCluster : function(parentNode, childNode, edge) {
    // handle circular edges
    if (edge.toId == edge.fromId) {
      this._addToContainedEdges(parentNode, childNode, edge);
    }
    else {
      if (edge.toId == childNode.id) {    // edge connected to other node on the "to" side
        edge.originalToId.push(childNode.id);
        edge.to = parentNode;
        edge.toId = parentNode.id;
      }
      else {          // edge connected to other node with the "from" side

        edge.originalFromId.push(childNode.id);
        edge.from = parentNode;
        edge.fromId = parentNode.id;
      }

      this._addToReroutedEdges(parentNode,childNode,edge);
    }
  },


  /**
   * If a node is connected to itself, a circular edge is drawn. When clustering we want to contain
   * these edges inside of the cluster.
   *
   * @param parentNode
   * @param childNode
   * @private
   */
  _containCircularEdgesFromNode : function(parentNode, childNode) {
    // manage all the edges connected to the child and parent nodes
    for (var i = 0; i < parentNode.dynamicEdges.length; i++) {
      var edge = parentNode.dynamicEdges[i];
      // handle circular edges
      if (edge.toId == edge.fromId) {
        this._addToContainedEdges(parentNode, childNode, edge);
      }
    }
  },


  /**
   * This adds an edge from the childNode to the rerouted edges of the parent node
   *
   * @param parentNode    | Node object
   * @param childNode     | Node object
   * @param edge          | Edge object
   * @private
   */
  _addToReroutedEdges : function(parentNode, childNode, edge) {
    // create an array object if it does not yet exist for this childNode
    // we store the edge in the rerouted edges so we can restore it when the cluster pops open
    if (!(parentNode.reroutedEdges.hasOwnProperty(childNode.id))) {
      parentNode.reroutedEdges[childNode.id] = [];
    }
    parentNode.reroutedEdges[childNode.id].push(edge);

    // this edge becomes part of the dynamicEdges of the cluster node
    parentNode.dynamicEdges.push(edge);
   },



  /**
   * This function connects an edge that was connected to a cluster node back to the child node.
   *
   * @param parentNode    | Node object
   * @param childNode     | Node object
   * @private
   */
  _connectEdgeBackToChild : function(parentNode, childNode) {
    if (parentNode.reroutedEdges.hasOwnProperty(childNode.id)) {
      for (var i = 0; i < parentNode.reroutedEdges[childNode.id].length; i++) {
        var edge = parentNode.reroutedEdges[childNode.id][i];
        if (edge.originalFromId[edge.originalFromId.length-1] == childNode.id) {
          edge.originalFromId.pop();
          edge.fromId = childNode.id;
          edge.from = childNode;
        }
        else {
          edge.originalToId.pop();
          edge.toId = childNode.id;
          edge.to = childNode;
        }

        // append this edge to the list of edges connecting to the childnode
        childNode.dynamicEdges.push(edge);

        // remove the edge from the parent object
        for (var j = 0; j < parentNode.dynamicEdges.length; j++) {
          if (parentNode.dynamicEdges[j].id == edge.id) {
            parentNode.dynamicEdges.splice(j,1);
            break;
          }
        }
      }
      // remove the entry from the rerouted edges
      delete parentNode.reroutedEdges[childNode.id];
    }
  },


  /**
   * When loops are clustered, an edge can be both in the rerouted array and the contained array.
   * This function is called last to verify that all edges in dynamicEdges are in fact connected to the
   * parentNode
   *
   * @param parentNode    | Node object
   * @private
   */
  _validateEdges : function(parentNode) {
    for (var i = 0; i < parentNode.dynamicEdges.length; i++) {
      var edge = parentNode.dynamicEdges[i];
      if (parentNode.id != edge.toId && parentNode.id != edge.fromId) {
        parentNode.dynamicEdges.splice(i,1);
      }
    }
  },


  /**
   * This function released the contained edges back into the global domain and puts them back into the
   * dynamic edges of both parent and child.
   *
   * @param {Node} parentNode    |
   * @param {Node} childNode     |
   * @private
   */
  _releaseContainedEdges : function(parentNode, childNode) {
    for (var i = 0; i < parentNode.containedEdges[childNode.id].length; i++) {
      var edge = parentNode.containedEdges[childNode.id][i];

      // put the edge back in the global edges object
      this.edges[edge.id] = edge;

      // put the edge back in the dynamic edges of the child and parent
      childNode.dynamicEdges.push(edge);
      parentNode.dynamicEdges.push(edge);
    }
    // remove the entry from the contained edges
    delete parentNode.containedEdges[childNode.id];

  },




  // ------------------- UTILITY FUNCTIONS ---------------------------- //


  /**
   * This updates the node labels for all nodes (for debugging purposes)
   */
  updateLabels : function() {
    var nodeId;
    // update node labels
    for (nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        var node = this.nodes[nodeId];
        if (node.clusterSize > 1) {
          node.label = "[".concat(String(node.clusterSize),"]");
        }
      }
    }

    // update node labels
    for (nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        node = this.nodes[nodeId];
        if (node.clusterSize == 1) {
          if (node.originalLabel !== undefined) {
            node.label = node.originalLabel;
          }
          else {
            node.label = String(node.id);
          }
        }
      }
    }

//    /* Debug Override */
//    for (nodeId in this.nodes) {
//      if (this.nodes.hasOwnProperty(nodeId)) {
//        node = this.nodes[nodeId];
//        node.label = String(node.level);
//      }
//    }

  },


  /**
   * We want to keep the cluster level distribution rather small. This means we do not want unclustered nodes
   * if the rest of the nodes are already a few cluster levels in.
   * To fix this we use this function. It determines the min and max cluster level and sends nodes that have not
   * clustered enough to the clusterToSmallestNeighbours function.
   */
  normalizeClusterLevels : function() {
    var maxLevel = 0;
    var minLevel = 1e9;
    var clusterLevel = 0;
    var nodeId;

    // we loop over all nodes in the list
    for (nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        clusterLevel = this.nodes[nodeId].clusterSessions.length;
        if (maxLevel < clusterLevel) {maxLevel = clusterLevel;}
        if (minLevel > clusterLevel) {minLevel = clusterLevel;}
      }
    }

    if (maxLevel - minLevel > this.constants.clustering.clusterLevelDifference) {
      var amountOfNodes = this.nodeIndices.length;
      var targetLevel = maxLevel - this.constants.clustering.clusterLevelDifference;
      // we loop over all nodes in the list
      for (nodeId in this.nodes) {
        if (this.nodes.hasOwnProperty(nodeId)) {
          if (this.nodes[nodeId].clusterSessions.length < targetLevel) {
            this._clusterToSmallestNeighbour(this.nodes[nodeId]);
          }
        }
      }
      this._updateNodeIndexList();
      this._updateDynamicEdges();
      // if a cluster was formed, we increase the clusterSession
      if (this.nodeIndices.length != amountOfNodes) {
        this.clusterSession += 1;
      }
    }
  },



  /**
   * This function determines if the cluster we want to decluster is in the active area
   * this means around the zoom center
   *
   * @param {Node} node
   * @returns {boolean}
   * @private
   */
  _nodeInActiveArea : function(node) {
    return (
      Math.abs(node.x - this.areaCenter.x) <= this.constants.clustering.activeAreaBoxSize/this.scale
        &&
      Math.abs(node.y - this.areaCenter.y) <= this.constants.clustering.activeAreaBoxSize/this.scale
      )
  },


  /**
   * This is an adaptation of the original repositioning function. This is called if the system is clustered initially
   * It puts large clusters away from the center and randomizes the order.
   *
   */
  repositionNodes : function() {
    for (var i = 0; i < this.nodeIndices.length; i++) {
      var node = this.nodes[this.nodeIndices[i]];
      if ((node.xFixed == false || node.yFixed == false)) {
        var radius = 10 * 0.1*this.nodeIndices.length * Math.min(100,node.mass);
        var angle = 2 * Math.PI * Math.random();
        if (node.xFixed == false) {node.x = radius * Math.cos(angle);}
        if (node.yFixed == false) {node.y = radius * Math.sin(angle);}
        this._repositionBezierNodes(node);
      }
    }
  },


  /**
   * We determine how many connections denote an important hub.
   * We take the mean + 2*std as the important hub size. (Assuming a normal distribution of data, ~2.2%)
   *
   * @private
   */
  _getHubSize : function() {
    var average = 0;
    var averageSquared = 0;
    var hubCounter = 0;
    var largestHub = 0;

    for (var i = 0; i < this.nodeIndices.length; i++) {

      var node = this.nodes[this.nodeIndices[i]];
      if (node.dynamicEdgesLength > largestHub) {
        largestHub = node.dynamicEdgesLength;
      }
      average += node.dynamicEdgesLength;
      averageSquared += Math.pow(node.dynamicEdgesLength,2);
      hubCounter += 1;
    }
    average = average / hubCounter;
    averageSquared = averageSquared / hubCounter;

    var variance = averageSquared - Math.pow(average,2);

    var standardDeviation = Math.sqrt(variance);

    this.hubThreshold = Math.floor(average + 2*standardDeviation);

    // always have at least one to cluster
    if (this.hubThreshold > largestHub) {
      this.hubThreshold = largestHub;
    }

  //  console.log("average",average,"averageSQ",averageSquared,"var",variance,"std",standardDeviation);
  //  console.log("hubThreshold:",this.hubThreshold);
  },


  /**
   * We reduce the amount of "extension nodes" or chains. These are not quickly clustered with the outliers and hubs methods
   * with this amount we can cluster specifically on these chains.
   *
   * @param   {Number} fraction     | between 0 and 1, the percentage of chains to reduce
   * @private
   */
  _reduceAmountOfChains : function(fraction) {
    this.hubThreshold = 2;
    var reduceAmount = Math.floor(this.nodeIndices.length * fraction);
    for (var nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        if (this.nodes[nodeId].dynamicEdgesLength == 2 && this.nodes[nodeId].dynamicEdges.length >= 2) {
          if (reduceAmount > 0) {
            this._formClusterFromHub(this.nodes[nodeId],true,true,1);
            reduceAmount -= 1;
          }
        }
      }
    }
  },

  /**
   * We get the amount of "extension nodes" or chains. These are not quickly clustered with the outliers and hubs methods
   * with this amount we can cluster specifically on these chains.
   *
   * @private
   */
  _getChainFraction : function() {
    var chains = 0;
    var total = 0;
    for (var nodeId in this.nodes) {
      if (this.nodes.hasOwnProperty(nodeId)) {
        if (this.nodes[nodeId].dynamicEdgesLength == 2 && this.nodes[nodeId].dynamicEdges.length >= 2) {
          chains += 1;
        }
        total += 1;
      }
    }
    return chains/total;
  }

};


var SelectionMixin = {

  /**
   * This function can be called from the _doInAllSectors function
   *
   * @param object
   * @param overlappingNodes
   * @private
   */
  _getNodesOverlappingWith : function(object, overlappingNodes) {
    var nodes = this.nodes;
    for (var nodeId in nodes) {
      if (nodes.hasOwnProperty(nodeId)) {
        if (nodes[nodeId].isOverlappingWith(object)) {
          overlappingNodes.push(nodeId);
        }
      }
    }
  },

  /**
   * retrieve all nodes overlapping with given object
   * @param {Object} object  An object with parameters left, top, right, bottom
   * @return {Number[]}   An array with id's of the overlapping nodes
   * @private
   */
  _getAllNodesOverlappingWith : function (object) {
    var overlappingNodes = [];
    this._doInAllActiveSectors("_getNodesOverlappingWith",object,overlappingNodes);
    return overlappingNodes;
  },


  /**
   * Return a position object in canvasspace from a single point in screenspace
   *
   * @param pointer
   * @returns {{left: number, top: number, right: number, bottom: number}}
   * @private
   */
  _pointerToPositionObject : function(pointer) {
    var x = this._canvasToX(pointer.x);
    var y = this._canvasToY(pointer.y);

    return {left:   x,
            top:    y,
            right:  x,
            bottom: y};
  },


  /**
   * Get the top node at the a specific point (like a click)
   *
   * @param {{x: Number, y: Number}} pointer
   * @return {Node | null} node
   * @private
   */
  _getNodeAt : function (pointer) {
    // we first check if this is an navigation controls element
    var positionObject = this._pointerToPositionObject(pointer);
    var overlappingNodes = this._getAllNodesOverlappingWith(positionObject);

    // if there are overlapping nodes, select the last one, this is the
    // one which is drawn on top of the others
    if (overlappingNodes.length > 0) {
       return this.nodes[overlappingNodes[overlappingNodes.length - 1]];
    }
    else {
      return null;
    }
  },


  /**
   * retrieve all edges overlapping with given object, selector is around center
   * @param {Object} object  An object with parameters left, top, right, bottom
   * @return {Number[]}   An array with id's of the overlapping nodes
   * @private
   */
  _getEdgesOverlappingWith : function (object, overlappingEdges) {
    var edges = this.edges;
    for (var edgeId in edges) {
      if (edges.hasOwnProperty(edgeId)) {
        if (edges[edgeId].isOverlappingWith(object)) {
          overlappingEdges.push(edgeId);
        }
      }
    }
  },


  /**
   * retrieve all nodes overlapping with given object
   * @param {Object} object  An object with parameters left, top, right, bottom
   * @return {Number[]}   An array with id's of the overlapping nodes
   * @private
   */
  _getAllEdgesOverlappingWith : function (object) {
    var overlappingEdges = [];
    this._doInAllActiveSectors("_getEdgesOverlappingWith",object,overlappingEdges);
    return overlappingEdges;
  },

  /**
   * Place holder. To implement change the _getNodeAt to a _getObjectAt. Have the _getObjectAt call
   * _getNodeAt and _getEdgesAt, then priortize the selection to user preferences.
   *
   * @param pointer
   * @returns {null}
   * @private
   */
  _getEdgeAt : function(pointer) {
    var positionObject = this._pointerToPositionObject(pointer);
    var overlappingEdges = this._getAllEdgesOverlappingWith(positionObject);

    if (overlappingEdges.length > 0) {
      return this.edges[overlappingEdges[overlappingEdges.length - 1]];
    }
    else {
      return null;
    }
  },


  /**
   * Add object to the selection array.
   *
   * @param obj
   * @private
   */
  _addToSelection : function(obj) {
    if (obj instanceof Node) {
      this.selectionObj.nodes[obj.id] = obj;
    }
    else {
      this.selectionObj.edges[obj.id] = obj;
    }

  },


  /**
   * Remove a single option from selection.
   *
   * @param {Object} obj
   * @private
   */
  _removeFromSelection : function(obj) {
    if (obj instanceof Node) {
      delete this.selectionObj.nodes[obj.id];
    }
    else {
      delete this.selectionObj.edges[obj.id];
    }
  },


  /**
   * Unselect all. The selectionObj is useful for this.
   *
   * @param {Boolean} [doNotTrigger] | ignore trigger
   * @private
   */
  _unselectAll : function(doNotTrigger) {
    if (doNotTrigger === undefined) {
      doNotTrigger = false;
    }
    for(var nodeId in this.selectionObj.nodes) {
      if(this.selectionObj.nodes.hasOwnProperty(nodeId)) {
        this.selectionObj.nodes[nodeId].unselect();
      }
    }
    for(var edgeId in this.selectionObj.edges) {
      if(this.selectionObj.edges.hasOwnProperty(edgeId)) {
        this.selectionObj.edges[edgeId].unselect();
      }
    }

    this.selectionObj = {nodes:{},edges:{}};

    if (doNotTrigger == false) {
      this.emit('select', this.getSelection());
    }
  },

  /**
   * Unselect all clusters. The selectionObj is useful for this.
   *
   * @param {Boolean} [doNotTrigger] | ignore trigger
   * @private
   */
  _unselectClusters : function(doNotTrigger) {
    if (doNotTrigger === undefined) {
      doNotTrigger = false;
    }

    for (var nodeId in this.selectionObj.nodes) {
      if (this.selectionObj.nodes.hasOwnProperty(nodeId)) {
        if (this.selectionObj.nodes[nodeId].clusterSize > 1) {
          this.selectionObj.nodes[nodeId].unselect();
          this._removeFromSelection(this.selectionObj.nodes[nodeId]);
        }
      }
    }

    if (doNotTrigger == false) {
      this.emit('select', this.getSelection());
    }
  },


  /**
   * return the number of selected nodes
   *
   * @returns {number}
   * @private
   */
  _getSelectedNodeCount : function() {
    var count = 0;
    for (var nodeId in this.selectionObj.nodes) {
      if (this.selectionObj.nodes.hasOwnProperty(nodeId)) {
        count += 1;
      }
    }
    return count;
  },

  /**
   * return the number of selected nodes
   *
   * @returns {number}
   * @private
   */
  _getSelectedNode : function() {
    for (var nodeId in this.selectionObj.nodes) {
      if (this.selectionObj.nodes.hasOwnProperty(nodeId)) {
        return this.selectionObj.nodes[nodeId];
      }
    }
    return null;
  },


  /**
   * return the number of selected edges
   *
   * @returns {number}
   * @private
   */
  _getSelectedEdgeCount : function() {
    var count = 0;
    for (var edgeId in this.selectionObj.edges) {
      if (this.selectionObj.edges.hasOwnProperty(edgeId)) {
        count += 1;
      }
    }
    return count;
  },


  /**
   * return the number of selected objects.
   *
   * @returns {number}
   * @private
   */
  _getSelectedObjectCount : function() {
    var count = 0;
    for(var nodeId in this.selectionObj.nodes) {
      if(this.selectionObj.nodes.hasOwnProperty(nodeId)) {
        count += 1;
      }
    }
    for(var edgeId in this.selectionObj.edges) {
      if(this.selectionObj.edges.hasOwnProperty(edgeId)) {
        count += 1;
      }
    }
    return count;
  },

  /**
   * Check if anything is selected
   *
   * @returns {boolean}
   * @private
   */
  _selectionIsEmpty : function() {
    for(var nodeId in this.selectionObj.nodes) {
      if(this.selectionObj.nodes.hasOwnProperty(nodeId)) {
        return false;
      }
    }
    for(var edgeId in this.selectionObj.edges) {
      if(this.selectionObj.edges.hasOwnProperty(edgeId)) {
        return false;
      }
    }
    return true;
  },


  /**
   * check if one of the selected nodes is a cluster.
   *
   * @returns {boolean}
   * @private
   */
  _clusterInSelection : function() {
    for(var nodeId in this.selectionObj.nodes) {
      if(this.selectionObj.nodes.hasOwnProperty(nodeId)) {
        if (this.selectionObj.nodes[nodeId].clusterSize > 1) {
          return true;
        }
      }
    }
    return false;
  },

  /**
   * select the edges connected to the node that is being selected
   *
   * @param {Node} node
   * @private
   */
  _selectConnectedEdges : function(node) {
    for (var i = 0; i < node.dynamicEdges.length; i++) {
      var edge = node.dynamicEdges[i];
      edge.select();
      this._addToSelection(edge);
    }
  },


  /**
   * unselect the edges connected to the node that is being selected
   *
   * @param {Node} node
   * @private
   */
  _unselectConnectedEdges : function(node) {
    for (var i = 0; i < node.dynamicEdges.length; i++) {
      var edge = node.dynamicEdges[i];
      edge.unselect();
      this._removeFromSelection(edge);
    }
  },



  /**
   * This is called when someone clicks on a node. either select or deselect it.
   * If there is an existing selection and we don't want to append to it, clear the existing selection
   *
   * @param {Node || Edge} object
   * @param {Boolean} append
   * @param {Boolean} [doNotTrigger] | ignore trigger
   * @private
   */
  _selectObject : function(object, append, doNotTrigger) {
    if (doNotTrigger === undefined) {
      doNotTrigger = false;
    }

    if (this._selectionIsEmpty() == false && append == false && this.forceAppendSelection == false) {
      this._unselectAll(true);
    }

    if (object.selected == false) {
      object.select();
      this._addToSelection(object);
      if (object instanceof Node && this.blockConnectingEdgeSelection == false) {
        this._selectConnectedEdges(object);
      }
    }
    else {
      object.unselect();
      this._removeFromSelection(object);
    }
    if (doNotTrigger == false) {
      this.emit('select', this.getSelection());
    }
  },


  /**
   * handles the selection part of the touch, only for navigation controls elements;
   * Touch is triggered before tap, also before hold. Hold triggers after a while.
   * This is the most responsive solution
   *
   * @param {Object} pointer
   * @private
   */
  _handleTouch : function(pointer) {

  },


  /**
   * handles the selection part of the tap;
   *
   * @param {Object} pointer
   * @private
   */
  _handleTap : function(pointer) {
    var node = this._getNodeAt(pointer);
    if (node != null) {
      this._selectObject(node,false);
    }
    else {
      var edge = this._getEdgeAt(pointer);
      if (edge != null) {
        this._selectObject(edge,false);
      }
      else {
        this._unselectAll();
      }
    }
    this.emit("click", this.getSelection());
    this._redraw();
  },


  /**
   * handles the selection part of the double tap and opens a cluster if needed
   *
   * @param {Object} pointer
   * @private
   */
  _handleDoubleTap : function(pointer) {
    var node = this._getNodeAt(pointer);
    if (node != null && node !== undefined) {
      // we reset the areaCenter here so the opening of the node will occur
      this.areaCenter =  {"x" : this._canvasToX(pointer.x),
                          "y" : this._canvasToY(pointer.y)};
      this.openCluster(node);
    }
    this.emit("doubleClick", this.getSelection());
  },


  /**
   * Handle the onHold selection part
   *
   * @param pointer
   * @private
   */
  _handleOnHold : function(pointer) {
    var node = this._getNodeAt(pointer);
    if (node != null) {
      this._selectObject(node,true);
    }
    else {
      var edge = this._getEdgeAt(pointer);
      if (edge != null) {
        this._selectObject(edge,true);
      }
    }
    this._redraw();
  },


  /**
   * handle the onRelease event. These functions are here for the navigation controls module.
   *
    * @private
   */
  _handleOnRelease : function(pointer) {

  },



  /**
   *
   * retrieve the currently selected objects
   * @return {Number[] | String[]} selection    An array with the ids of the
   *                                            selected nodes.
   */
  getSelection : function() {
    var nodeIds = this.getSelectedNodes();
    var edgeIds = this.getSelectedEdges();
    return {nodes:nodeIds, edges:edgeIds};
  },

  /**
   *
   * retrieve the currently selected nodes
   * @return {String} selection    An array with the ids of the
   *                                            selected nodes.
   */
  getSelectedNodes : function() {
    var idArray = [];
    for(var nodeId in this.selectionObj.nodes) {
      if(this.selectionObj.nodes.hasOwnProperty(nodeId)) {
        idArray.push(nodeId);
      }
    }
    return idArray
  },

  /**
   *
   * retrieve the currently selected edges
   * @return {Array} selection    An array with the ids of the
   *                                            selected nodes.
   */
  getSelectedEdges : function() {
    var idArray = [];
    for(var edgeId in this.selectionObj.edges) {
      if(this.selectionObj.edges.hasOwnProperty(edgeId)) {
        idArray.push(edgeId);
      }
    }
    return idArray;
  },


  /**
   * select zero or more nodes
   * @param {Number[] | String[]} selection     An array with the ids of the
   *                                            selected nodes.
   */
  setSelection : function(selection) {
    var i, iMax, id;

    if (!selection || (selection.length == undefined))
      throw 'Selection must be an array with ids';

    // first unselect any selected node
    this._unselectAll(true);

    for (i = 0, iMax = selection.length; i < iMax; i++) {
      id = selection[i];

      var node = this.nodes[id];
      if (!node) {
        throw new RangeError('Node with id "' + id + '" not found');
      }
      this._selectObject(node,true,true);
    }
    this.redraw();
  },


  /**
   * Validate the selection: remove ids of nodes which no longer exist
   * @private
   */
  _updateSelection : function () {
    for(var nodeId in this.selectionObj.nodes) {
      if(this.selectionObj.nodes.hasOwnProperty(nodeId)) {
        if (!this.nodes.hasOwnProperty(nodeId)) {
          delete this.selectionObj.nodes[nodeId];
        }
      }
    }
    for(var edgeId in this.selectionObj.edges) {
      if(this.selectionObj.edges.hasOwnProperty(edgeId)) {
        if (!this.edges.hasOwnProperty(edgeId)) {
          delete this.selectionObj.edges[edgeId];
        }
      }
    }
  }
};



/**
 * Created by Alex on 1/22/14.
 */

var NavigationMixin = {

  _cleanNavigation : function() {
    // clean up previosu navigation items
    var wrapper = document.getElementById('graph-navigation_wrapper');
    if (wrapper != null) {
      this.containerElement.removeChild(wrapper);
    }
    document.onmouseup = null;
  },

  /**
   * Creation of the navigation controls nodes. They are drawn over the rest of the nodes and are not affected by scale and translation
   * they have a triggerFunction which is called on click. If the position of the navigation controls is dependent
   * on this.frame.canvas.clientWidth or this.frame.canvas.clientHeight, we flag horizontalAlignLeft and verticalAlignTop false.
   * This means that the location will be corrected by the _relocateNavigation function on a size change of the canvas.
   *
   * @private
   */
  _loadNavigationElements : function() {
    this._cleanNavigation();

    this.navigationDivs = {};
    var navigationDivs = ['up','down','left','right','zoomIn','zoomOut','zoomExtends'];
    var navigationDivActions = ['_moveUp','_moveDown','_moveLeft','_moveRight','_zoomIn','_zoomOut','zoomExtent'];

    this.navigationDivs['wrapper'] = document.createElement('div');
    this.navigationDivs['wrapper'].id = "graph-navigation_wrapper";
    this.navigationDivs['wrapper'].style.position = "absolute";
    this.navigationDivs['wrapper'].style.width = this.frame.canvas.clientWidth + "px";
    this.navigationDivs['wrapper'].style.height = this.frame.canvas.clientHeight + "px";
    this.containerElement.insertBefore(this.navigationDivs['wrapper'],this.frame);

    for (var i = 0; i < navigationDivs.length; i++) {
      this.navigationDivs[navigationDivs[i]] = document.createElement('div');
      this.navigationDivs[navigationDivs[i]].id = "graph-navigation_" + navigationDivs[i];
      this.navigationDivs[navigationDivs[i]].className = "graph-navigation " + navigationDivs[i];
      this.navigationDivs['wrapper'].appendChild(this.navigationDivs[navigationDivs[i]]);
      this.navigationDivs[navigationDivs[i]].onmousedown = this[navigationDivActions[i]].bind(this);
    }

    document.onmouseup = this._stopMovement.bind(this);
  },

  /**
   * this stops all movement induced by the navigation buttons
   *
   * @private
   */
  _stopMovement : function() {
    this._xStopMoving();
    this._yStopMoving();
    this._stopZoom();
  },


  /**
   * stops the actions performed by page up and down etc.
   *
   * @param event
   * @private
   */
  _preventDefault : function(event) {
    if (event !== undefined) {
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    }
  },


  /**
   * move the screen up
   * By using the increments, instead of adding a fixed number to the translation, we keep fluent and
   * instant movement. The onKeypress event triggers immediately, then pauses, then triggers frequently
   * To avoid this behaviour, we do the translation in the start loop.
   *
   * @private
   */
  _moveUp : function(event) {
    this.yIncrement = this.constants.keyboard.speed.y;
    this.start(); // if there is no node movement, the calculation wont be done
    this._preventDefault(event);
    if (this.navigationDivs) {
      this.navigationDivs['up'].className += " active";
    }
  },


  /**
   * move the screen down
   * @private
   */
  _moveDown : function(event) {
    this.yIncrement = -this.constants.keyboard.speed.y;
    this.start(); // if there is no node movement, the calculation wont be done
    this._preventDefault(event);
    if (this.navigationDivs) {
      this.navigationDivs['down'].className += " active";
    }
  },


  /**
   * move the screen left
   * @private
   */
  _moveLeft : function(event) {
    this.xIncrement = this.constants.keyboard.speed.x;
    this.start(); // if there is no node movement, the calculation wont be done
    this._preventDefault(event);
    if (this.navigationDivs) {
      this.navigationDivs['left'].className += " active";
    }
  },


  /**
   * move the screen right
   * @private
   */
  _moveRight : function(event) {
    this.xIncrement = -this.constants.keyboard.speed.y;
    this.start(); // if there is no node movement, the calculation wont be done
    this._preventDefault(event);
    if (this.navigationDivs) {
      this.navigationDivs['right'].className += " active";
    }
  },


  /**
   * Zoom in, using the same method as the movement.
   * @private
   */
  _zoomIn : function(event) {
    this.zoomIncrement = this.constants.keyboard.speed.zoom;
    this.start(); // if there is no node movement, the calculation wont be done
    this._preventDefault(event);
    if (this.navigationDivs) {
      this.navigationDivs['zoomIn'].className += " active";
    }
  },


  /**
   * Zoom out
   * @private
   */
  _zoomOut : function() {
    this.zoomIncrement = -this.constants.keyboard.speed.zoom;
    this.start(); // if there is no node movement, the calculation wont be done
    this._preventDefault(event);
    if (this.navigationDivs) {
      this.navigationDivs['zoomOut'].className += " active";
    }
  },


  /**
   * Stop zooming and unhighlight the zoom controls
   * @private
   */
  _stopZoom : function() {
    this.zoomIncrement = 0;
    if (this.navigationDivs) {
      this.navigationDivs['zoomIn'].className = this.navigationDivs['zoomIn'].className.replace(" active","");
      this.navigationDivs['zoomOut'].className = this.navigationDivs['zoomOut'].className.replace(" active","");
    }
  },


  /**
   * Stop moving in the Y direction and unHighlight the up and down
   * @private
   */
  _yStopMoving : function() {
    this.yIncrement = 0;
    if (this.navigationDivs) {
      this.navigationDivs['up'].className = this.navigationDivs['up'].className.replace(" active","");
      this.navigationDivs['down'].className = this.navigationDivs['down'].className.replace(" active","");
    }
  },


  /**
   * Stop moving in the X direction and unHighlight left and right.
   * @private
   */
  _xStopMoving : function() {
    this.xIncrement = 0;
    if (this.navigationDivs) {
      this.navigationDivs['left'].className = this.navigationDivs['left'].className.replace(" active","");
      this.navigationDivs['right'].className = this.navigationDivs['right'].className.replace(" active","");
    }
  }


};

/**
 * Created by Alex on 2/10/14.
 */


var graphMixinLoaders = {

  /**
   * Load a mixin into the graph object
   *
   * @param {Object} sourceVariable | this object has to contain functions.
   * @private
   */
  _loadMixin: function (sourceVariable) {
    for (var mixinFunction in sourceVariable) {
      if (sourceVariable.hasOwnProperty(mixinFunction)) {
        Graph.prototype[mixinFunction] = sourceVariable[mixinFunction];
      }
    }
  },


  /**
   * removes a mixin from the graph object.
   *
   * @param {Object} sourceVariable | this object has to contain functions.
   * @private
   */
  _clearMixin: function (sourceVariable) {
    for (var mixinFunction in sourceVariable) {
      if (sourceVariable.hasOwnProperty(mixinFunction)) {
        Graph.prototype[mixinFunction] = undefined;
      }
    }
  },


  /**
   * Mixin the physics system and initialize the parameters required.
   *
   * @private
   */
  _loadPhysicsSystem: function () {
    this._loadMixin(physicsMixin);
    this._loadSelectedForceSolver();
    if (this.constants.configurePhysics == true) {
      this._loadPhysicsConfiguration();
    }
  },


  /**
   * Mixin the cluster system and initialize the parameters required.
   *
   * @private
   */
  _loadClusterSystem: function () {
    this.clusterSession = 0;
    this.hubThreshold = 5;
    this._loadMixin(ClusterMixin);
  },


  /**
   * Mixin the sector system and initialize the parameters required
   *
   * @private
   */
  _loadSectorSystem: function () {
    this.sectors = {};
    this.activeSector = ["default"];
    this.sectors["active"] = {};
    this.sectors["active"]["default"] = {"nodes": {},
        "edges": {},
        "nodeIndices": [],
        "formationScale": 1.0,
        "drawingNode": undefined };
    this.sectors["frozen"] = {};
      this.sectors["support"] = {"nodes": {},
        "edges": {},
        "nodeIndices": [],
        "formationScale": 1.0,
        "drawingNode": undefined };

    this.nodeIndices = this.sectors["active"]["default"]["nodeIndices"];  // the node indices list is used to speed up the computation of the repulsion fields

    this._loadMixin(SectorMixin);
  },


  /**
   * Mixin the selection system and initialize the parameters required
   *
   * @private
   */
  _loadSelectionSystem: function () {
    this.selectionObj = {nodes: {}, edges: {}};

    this._loadMixin(SelectionMixin);
  },


  /**
   * Mixin the navigationUI (User Interface) system and initialize the parameters required
   *
   * @private
   */
  _loadManipulationSystem: function () {
    // reset global variables -- these are used by the selection of nodes and edges.
    this.blockConnectingEdgeSelection = false;
    this.forceAppendSelection = false;

    if (this.constants.dataManipulation.enabled == true) {
      // load the manipulator HTML elements. All styling done in css.
      if (this.manipulationDiv === undefined) {
        this.manipulationDiv = document.createElement('div');
        this.manipulationDiv.className = 'graph-manipulationDiv';
        this.manipulationDiv.id = 'graph-manipulationDiv';
        if (this.editMode == true) {
          this.manipulationDiv.style.display = "block";
        }
        else {
          this.manipulationDiv.style.display = "none";
        }
        this.containerElement.insertBefore(this.manipulationDiv, this.frame);
      }

      if (this.editModeDiv === undefined) {
        this.editModeDiv = document.createElement('div');
        this.editModeDiv.className = 'graph-manipulation-editMode';
        this.editModeDiv.id = 'graph-manipulation-editMode';
        if (this.editMode == true) {
          this.editModeDiv.style.display = "none";
        }
        else {
          this.editModeDiv.style.display = "block";
        }
        this.containerElement.insertBefore(this.editModeDiv, this.frame);
      }

      if (this.closeDiv === undefined) {
        this.closeDiv = document.createElement('div');
        this.closeDiv.className = 'graph-manipulation-closeDiv';
        this.closeDiv.id = 'graph-manipulation-closeDiv';
        this.closeDiv.style.display = this.manipulationDiv.style.display;
        this.containerElement.insertBefore(this.closeDiv, this.frame);
      }

      // load the manipulation functions
      this._loadMixin(manipulationMixin);

      // create the manipulator toolbar
      this._createManipulatorBar();
    }
    else {
      if (this.manipulationDiv !== undefined) {
        // removes all the bindings and overloads
        this._createManipulatorBar();
        // remove the manipulation divs
        this.containerElement.removeChild(this.manipulationDiv);
        this.containerElement.removeChild(this.editModeDiv);
        this.containerElement.removeChild(this.closeDiv);

        this.manipulationDiv = undefined;
        this.editModeDiv = undefined;
        this.closeDiv = undefined;
        // remove the mixin functions
        this._clearMixin(manipulationMixin);
      }
    }
  },


  /**
   * Mixin the navigation (User Interface) system and initialize the parameters required
   *
   * @private
   */
  _loadNavigationControls: function () {
    this._loadMixin(NavigationMixin);

    // the clean function removes the button divs, this is done to remove the bindings.
    this._cleanNavigation();
    if (this.constants.navigation.enabled == true) {
      this._loadNavigationElements();
    }
  },


  /**
   * Mixin the hierarchical layout system.
   *
   * @private
   */
  _loadHierarchySystem: function () {
    this._loadMixin(HierarchicalLayoutMixin);
  }

};

/**
 * @constructor Graph
 * Create a graph visualization, displaying nodes and edges.
 *
 * @param {Element} container   The DOM element in which the Graph will
 *                                  be created. Normally a div element.
 * @param {Object} data         An object containing parameters
 *                              {Array} nodes
 *                              {Array} edges
 * @param {Object} options      Options
 */
function Graph (container, data, options) {

  this._initializeMixinLoaders();

  // create variables and set default values
  this.containerElement = container;
  this.width = '100%';
  this.height = '100%';

  // render and calculation settings
  this.renderRefreshRate = 60;                         // hz (fps)
  this.renderTimestep = 1000 / this.renderRefreshRate; // ms -- saves calculation later on
  this.renderTime = 0.5 * this.renderTimestep;         // measured time it takes to render a frame
  this.maxPhysicsTicksPerRender = 3;                   // max amount of physics ticks per render step.
  this.physicsDiscreteStepsize = 0.65;                 // discrete stepsize of the simulation

  this.stabilize = true;  // stabilize before displaying the graph
  this.selectable = true;
  this.initializing = true;

  // these functions are triggered when the dataset is edited
  this.triggerFunctions = {add:null,edit:null,connect:null,del:null};

  // set constant values
  this.constants = {
    nodes: {
      radiusMin: 5,
      radiusMax: 20,
      radius: 5,
      shape: 'ellipse',
      image: undefined,
      widthMin: 16, // px
      widthMax: 64, // px
      fixed: false,
      fontColor: 'black',
      fontSize: 14, // px
      fontFace: 'verdana',
      level: -1,
      color: {
          border: '#2B7CE9',
          background: '#97C2FC',
        highlight: {
          border: '#2B7CE9',
          background: '#D2E5FF'
        }
      },
      borderColor: '#2B7CE9',
      backgroundColor: '#97C2FC',
      highlightColor: '#D2E5FF',
      group: undefined
    },
    edges: {
      widthMin: 1,
      widthMax: 15,
      width: 1,
      style: 'line',
      color: {
        color:'#848484',
        highlight:'#848484'
      },
      fontColor: '#343434',
      fontSize: 14, // px
      fontFace: 'arial',
      fontFill: 'white',
      arrowScaleFactor: 1,
      dash: {
        length: 10,
        gap: 5,
        altLength: undefined
      }
    },
    configurePhysics:false,
    physics: {
      barnesHut: {
        enabled: true,
        theta: 1 / 0.6, // inverted to save time during calculation
        gravitationalConstant: -2000,
        centralGravity: 0.3,
        springLength: 95,
        springConstant: 0.04,
        damping: 0.09
      },
      repulsion: {
        centralGravity: 0.1,
        springLength: 200,
        springConstant: 0.05,
        nodeDistance: 100,
        damping: 0.09
      },
      hierarchicalRepulsion: {
        enabled: false,
        centralGravity: 0.0,
        springLength: 100,
        springConstant: 0.01,
        nodeDistance: 60,
        damping: 0.09
      },
      damping: null,
      centralGravity: null,
      springLength: null,
      springConstant: null
    },
    clustering: {                   // Per Node in Cluster = PNiC
      enabled: false,               // (Boolean)             | global on/off switch for clustering.
      initialMaxNodes: 100,         // (# nodes)             | if the initial amount of nodes is larger than this, we cluster until the total number is less than this threshold.
      clusterThreshold:500,         // (# nodes)             | during calculate forces, we check if the total number of nodes is larger than this. If it is, cluster until reduced to reduceToNodes
      reduceToNodes:300,            // (# nodes)             | during calculate forces, we check if the total number of nodes is larger than clusterThreshold. If it is, cluster until reduced to this
      chainThreshold: 0.4,          // (% of all drawn nodes)| maximum percentage of allowed chainnodes (long strings of connected nodes) within all nodes. (lower means less chains).
      clusterEdgeThreshold: 20,     // (px)                  | edge length threshold. if smaller, this node is clustered.
      sectorThreshold: 100,         // (# nodes in cluster)  | cluster size threshold. If larger, expanding in own sector.
      screenSizeThreshold: 0.2,     // (% of canvas)         | relative size threshold. If the width or height of a clusternode takes up this much of the screen, decluster node.
      fontSizeMultiplier: 4.0,      // (px PNiC)             | how much the cluster font size grows per node in cluster (in px).
      maxFontSize: 1000,
      forceAmplification: 0.1,      // (multiplier PNiC)     | factor of increase fo the repulsion force of a cluster (per node in cluster).
      distanceAmplification: 0.1,   // (multiplier PNiC)     | factor how much the repulsion distance of a cluster increases (per node in cluster).
      edgeGrowth: 20,               // (px PNiC)             | amount of clusterSize connected to the edge is multiplied with this and added to edgeLength.
      nodeScaling: {width:  1,      // (px PNiC)             | growth of the width  per node in cluster.
                    height: 1,      // (px PNiC)             | growth of the height per node in cluster.
                    radius: 1},     // (px PNiC)             | growth of the radius per node in cluster.
      maxNodeSizeIncrements: 600,   // (# increments)        | max growth of the width  per node in cluster.
      activeAreaBoxSize: 80,       // (px)                  | box area around the curser where clusters are popped open.
      clusterLevelDifference: 2
    },
    navigation: {
      enabled: false
    },
    keyboard: {
      enabled: false,
      speed: {x: 10, y: 10, zoom: 0.02}
    },
    dataManipulation: {
      enabled: false,
      initiallyVisible: false
    },
    hierarchicalLayout: {
      enabled:false,
      levelSeparation: 150,
      nodeSpacing: 100,
      direction: "UD"   // UD, DU, LR, RL
    },
    freezeForStabilization: false,
    smoothCurves: true,
    maxVelocity:  10,
    minVelocity:  0.1,   // px/s
    stabilizationIterations: 1000,  // maximum number of iteration to stabilize
    labels:{
      add:"Add Node",
      edit:"Edit",
      link:"Add Link",
      del:"Delete selected",
      editNode:"Edit Node",
      back:"Back",
      addDescription:"Click in an empty space to place a new node.",
      linkDescription:"Click on a node and drag the edge to another node to connect them.",
      addError:"The function for add does not support two arguments (data,callback).",
      linkError:"The function for connect does not support two arguments (data,callback).",
      editError:"The function for edit does not support two arguments (data, callback).",
      editBoundError:"No edit function has been bound to this button.",
      deleteError:"The function for delete does not support two arguments (data, callback).",
      deleteClusterError:"Clusters cannot be deleted."
    },
    tooltip: {
      delay: 300,
      fontColor: 'black',
      fontSize: 14, // px
      fontFace: 'verdana',
      color: {
        border: '#666',
        background: '#FFFFC6'
      }
    }
  };
  this.editMode = this.constants.dataManipulation.initiallyVisible;

  // Node variables
  var graph = this;
  this.groups = new Groups(); // object with groups
  this.images = new Images(); // object with images
  this.images.setOnloadCallback(function () {
    graph._redraw();
  });

  // keyboard navigation variables
  this.xIncrement = 0;
  this.yIncrement = 0;
  this.zoomIncrement = 0;

  // loading all the mixins:
  // load the force calculation functions, grouped under the physics system.
  this._loadPhysicsSystem();
  // create a frame and canvas
  this._create();
  // load the sector system.    (mandatory, fully integrated with Graph)
  this._loadSectorSystem();
  // load the cluster system.   (mandatory, even when not using the cluster system, there are function calls to it)
  this._loadClusterSystem();
  // load the selection system. (mandatory, required by Graph)
  this._loadSelectionSystem();
  // load the selection system. (mandatory, required by Graph)
  this._loadHierarchySystem();

  // apply options
  this.setOptions(options);

  // other vars
  this.freezeSimulation = false;// freeze the simulation
  this.cachedFunctions = {};

  // containers for nodes and edges
  this.calculationNodes = {};
  this.calculationNodeIndices = [];
  this.nodeIndices = [];        // array with all the indices of the nodes. Used to speed up forces calculation
  this.nodes = {};              // object with Node objects
  this.edges = {};              // object with Edge objects

  // position and scale variables and objects
  this.canvasTopLeft     = {"x": 0,"y": 0};   // coordinates of the top left of the canvas.     they will be set during _redraw.
  this.canvasBottomRight = {"x": 0,"y": 0};   // coordinates of the bottom right of the canvas. they will be set during _redraw
  this.pointerPosition = {"x": 0,"y": 0};   // coordinates of the bottom right of the canvas. they will be set during _redraw
  this.areaCenter = {};               // object with x and y elements used for determining the center of the zoom action
  this.scale = 1;                     // defining the global scale variable in the constructor
  this.previousScale = this.scale;    // this is used to check if the zoom operation is zooming in or out

  // datasets or dataviews
  this.nodesData = null;      // A DataSet or DataView
  this.edgesData = null;      // A DataSet or DataView

  // create event listeners used to subscribe on the DataSets of the nodes and edges
  this.nodesListeners = {
    'add': function (event, params) {
      graph._addNodes(params.items);
      graph.start();
    },
    'update': function (event, params) {
      graph._updateNodes(params.items);
      graph.start();
    },
    'remove': function (event, params) {
      graph._removeNodes(params.items);
      graph.start();
    }
  };
  this.edgesListeners = {
    'add': function (event, params) {
      graph._addEdges(params.items);
      graph.start();
    },
    'update': function (event, params) {
      graph._updateEdges(params.items);
      graph.start();
    },
    'remove': function (event, params) {
      graph._removeEdges(params.items);
      graph.start();
    }
  };

  // properties for the animation
  this.moving = true;
  this.timer = undefined; // Scheduling function. Is definded in this.start();

  // load data (the disable start variable will be the same as the enabled clustering)
  this.setData(data,this.constants.clustering.enabled || this.constants.hierarchicalLayout.enabled);

  // hierarchical layout
  this.initializing = false;
  if (this.constants.hierarchicalLayout.enabled == true) {
    this._setupHierarchicalLayout();
  }
  else {
    // zoom so all data will fit on the screen, if clustering is enabled, we do not want start to be called here.
    if (this.stabilize == false) {
      this.zoomExtent(true,this.constants.clustering.enabled);
    }
  }

  // if clustering is disabled, the simulation will have started in the setData function
  if (this.constants.clustering.enabled) {
    this.startWithClustering();
  }
}

// Extend Graph with an Emitter mixin
Emitter(Graph.prototype);

/**
 * Get the script path where the vis.js library is located
 *
 * @returns {string | null} path   Path or null when not found. Path does not
 *                                 end with a slash.
 * @private
 */
Graph.prototype._getScriptPath = function() {
  var scripts = document.getElementsByTagName( 'script' );

  // find script named vis.js or vis.min.js
  for (var i = 0; i < scripts.length; i++) {
    var src = scripts[i].src;
    var match = src && /\/?vis(.min)?\.js$/.exec(src);
    if (match) {
      // return path without the script name
      return src.substring(0, src.length - match[0].length);
    }
  }

  return null;
};


/**
 * Find the center position of the graph
 * @private
 */
Graph.prototype._getRange = function() {
  var minY = 1e9, maxY = -1e9, minX = 1e9, maxX = -1e9, node;
  for (var nodeId in this.nodes) {
    if (this.nodes.hasOwnProperty(nodeId)) {
      node = this.nodes[nodeId];
      if (minX > (node.x)) {minX = node.x;}
      if (maxX < (node.x)) {maxX = node.x;}
      if (minY > (node.y)) {minY = node.y;}
      if (maxY < (node.y)) {maxY = node.y;}
    }
  }
  if (minX == 1e9 && maxX == -1e9 && minY == 1e9 && maxY == -1e9) {
    minY = 0, maxY = 0, minX = 0, maxX = 0;
  }
  return {minX: minX, maxX: maxX, minY: minY, maxY: maxY};
};


/**
 * @param {object} range = {minX: minX, maxX: maxX, minY: minY, maxY: maxY};
 * @returns {{x: number, y: number}}
 * @private
 */
Graph.prototype._findCenter = function(range) {
  return {x: (0.5 * (range.maxX + range.minX)),
          y: (0.5 * (range.maxY + range.minY))};
};


/**
 * center the graph
 *
 * @param {object} range = {minX: minX, maxX: maxX, minY: minY, maxY: maxY};
 */
Graph.prototype._centerGraph = function(range) {
  var center = this._findCenter(range);

  center.x *= this.scale;
  center.y *= this.scale;
  center.x -= 0.5 * this.frame.canvas.clientWidth;
  center.y -= 0.5 * this.frame.canvas.clientHeight;

  this._setTranslation(-center.x,-center.y); // set at 0,0
};


/**
 * This function zooms out to fit all data on screen based on amount of nodes
 *
 * @param {Boolean} [initialZoom]  | zoom based on fitted formula or range, true = fitted, default = false;
 * @param {Boolean} [disableStart] | If true, start is not called.
 */
Graph.prototype.zoomExtent = function(initialZoom, disableStart) {
  if (initialZoom === undefined) {
    initialZoom = false;
  }
  if (disableStart === undefined) {
    disableStart = false;
  }

  var range = this._getRange();
  var zoomLevel;

  if (initialZoom == true) {
    var numberOfNodes = this.nodeIndices.length;
    if (this.constants.smoothCurves == true) {
      if (this.constants.clustering.enabled == true &&
        numberOfNodes >= this.constants.clustering.initialMaxNodes) {
        zoomLevel = 49.07548 / (numberOfNodes + 142.05338) + 9.1444e-04; // this is obtained from fitting a dataset from 5 points with scale levels that looked good.
      }
      else {
        zoomLevel = 12.662 / (numberOfNodes + 7.4147) + 0.0964822; // this is obtained from fitting a dataset from 5 points with scale levels that looked good.
      }
    }
    else {
      if (this.constants.clustering.enabled == true &&
          numberOfNodes >= this.constants.clustering.initialMaxNodes) {
        zoomLevel = 77.5271985 / (numberOfNodes + 187.266146) + 4.76710517e-05; // this is obtained from fitting a dataset from 5 points with scale levels that looked good.
      }
      else {
        zoomLevel = 30.5062972 / (numberOfNodes + 19.93597763) + 0.08413486; // this is obtained from fitting a dataset from 5 points with scale levels that looked good.
      }
    }

    // correct for larger canvasses.
    var factor = Math.min(this.frame.canvas.clientWidth / 600, this.frame.canvas.clientHeight / 600);
    zoomLevel *= factor;
  }
  else {
    var xDistance = (Math.abs(range.minX) + Math.abs(range.maxX)) * 1.1;
    var yDistance = (Math.abs(range.minY) + Math.abs(range.maxY)) * 1.1;

    var xZoomLevel = this.frame.canvas.clientWidth / xDistance;
    var yZoomLevel = this.frame.canvas.clientHeight / yDistance;

    zoomLevel = (xZoomLevel <= yZoomLevel) ? xZoomLevel : yZoomLevel;
  }

  if (zoomLevel > 1.0) {
    zoomLevel = 1.0;
  }


  this._setScale(zoomLevel);
  this._centerGraph(range);
  if (disableStart == false) {
    this.moving = true;
    this.start();
  }
};


/**
 * Update the this.nodeIndices with the most recent node index list
 * @private
 */
Graph.prototype._updateNodeIndexList = function() {
  this._clearNodeIndexList();
  for (var idx in this.nodes) {
    if (this.nodes.hasOwnProperty(idx)) {
      this.nodeIndices.push(idx);
    }
  }
};


/**
 * Set nodes and edges, and optionally options as well.
 *
 * @param {Object} data              Object containing parameters:
 *                                   {Array | DataSet | DataView} [nodes] Array with nodes
 *                                   {Array | DataSet | DataView} [edges] Array with edges
 *                                   {String} [dot] String containing data in DOT format
 *                                   {Options} [options] Object with options
 * @param {Boolean} [disableStart]   | optional: disable the calling of the start function.
 */
Graph.prototype.setData = function(data, disableStart) {
  if (disableStart === undefined) {
    disableStart = false;
  }

  if (data && data.dot && (data.nodes || data.edges)) {
    throw new SyntaxError('Data must contain either parameter "dot" or ' +
        ' parameter pair "nodes" and "edges", but not both.');
  }

  // set options
  this.setOptions(data && data.options);

  // set all data
  if (data && data.dot) {
    // parse DOT file
    if(data && data.dot) {
      var dotData = vis.util.DOTToGraph(data.dot);
      this.setData(dotData);
      return;
    }
  }
  else {
    this._setNodes(data && data.nodes);
    this._setEdges(data && data.edges);
  }

  this._putDataInSector();

  if (!disableStart) {
    // find a stable position or start animating to a stable position
    if (this.stabilize) {
      this._stabilize();
    }
    this.start();
  }
};

/**
 * Set options
 * @param {Object} options
 */
Graph.prototype.setOptions = function (options) {
  if (options) {
    var prop;
    // retrieve parameter values
    if (options.width !== undefined)           {this.width = options.width;}
    if (options.height !== undefined)          {this.height = options.height;}
    if (options.stabilize !== undefined)       {this.stabilize = options.stabilize;}
    if (options.selectable !== undefined)      {this.selectable = options.selectable;}
    if (options.smoothCurves !== undefined)    {this.constants.smoothCurves = options.smoothCurves;}
    if (options.freezeForStabilization !== undefined)    {this.constants.freezeForStabilization = options.freezeForStabilization;}
    if (options.configurePhysics !== undefined){this.constants.configurePhysics = options.configurePhysics;}
    if (options.stabilizationIterations !== undefined)   {this.constants.stabilizationIterations = options.stabilizationIterations;}



    if (options.labels !== undefined)  {
      for (prop in options.labels) {
        if (options.labels.hasOwnProperty(prop)) {
          this.constants.labels[prop] = options.labels[prop];
        }
      }
    }

    if (options.onAdd) {
        this.triggerFunctions.add = options.onAdd;
      }

    if (options.onEdit) {
      this.triggerFunctions.edit = options.onEdit;
    }

    if (options.onConnect) {
      this.triggerFunctions.connect = options.onConnect;
    }

    if (options.onDelete) {
      this.triggerFunctions.del = options.onDelete;
    }

    if (options.physics) {
      if (options.physics.barnesHut) {
        this.constants.physics.barnesHut.enabled = true;
        for (prop in options.physics.barnesHut) {
          if (options.physics.barnesHut.hasOwnProperty(prop)) {
            this.constants.physics.barnesHut[prop] = options.physics.barnesHut[prop];
          }
        }
      }

      if (options.physics.repulsion) {
        this.constants.physics.barnesHut.enabled = false;
        for (prop in options.physics.repulsion) {
          if (options.physics.repulsion.hasOwnProperty(prop)) {
            this.constants.physics.repulsion[prop] = options.physics.repulsion[prop];
          }
        }
      }

      if (options.physics.hierarchicalRepulsion) {
        this.constants.hierarchicalLayout.enabled = true;
        this.constants.physics.hierarchicalRepulsion.enabled = true;
        this.constants.physics.barnesHut.enabled = false;
        for (prop in options.physics.hierarchicalRepulsion) {
          if (options.physics.hierarchicalRepulsion.hasOwnProperty(prop)) {
            this.constants.physics.hierarchicalRepulsion[prop] = options.physics.hierarchicalRepulsion[prop];
          }
        }
      }
    }

    if (options.hierarchicalLayout) {
      this.constants.hierarchicalLayout.enabled = true;
      for (prop in options.hierarchicalLayout) {
        if (options.hierarchicalLayout.hasOwnProperty(prop)) {
          this.constants.hierarchicalLayout[prop] = options.hierarchicalLayout[prop];
        }
      }
    }
    else if (options.hierarchicalLayout !== undefined)  {
      this.constants.hierarchicalLayout.enabled = false;
    }

    if (options.clustering) {
      this.constants.clustering.enabled = true;
      for (prop in options.clustering) {
        if (options.clustering.hasOwnProperty(prop)) {
          this.constants.clustering[prop] = options.clustering[prop];
        }
      }
    }
    else if (options.clustering !== undefined)  {
      this.constants.clustering.enabled = false;
    }

    if (options.navigation) {
      this.constants.navigation.enabled = true;
      for (prop in options.navigation) {
        if (options.navigation.hasOwnProperty(prop)) {
          this.constants.navigation[prop] = options.navigation[prop];
        }
      }
    }
    else if (options.navigation !== undefined) {
      this.constants.navigation.enabled = false;
    }

    if (options.keyboard) {
      this.constants.keyboard.enabled = true;
      for (prop in options.keyboard) {
        if (options.keyboard.hasOwnProperty(prop)) {
          this.constants.keyboard[prop] = options.keyboard[prop];
        }
      }
    }
    else if (options.keyboard !== undefined)  {
      this.constants.keyboard.enabled = false;
    }

    if (options.dataManipulation) {
      this.constants.dataManipulation.enabled = true;
      for (prop in options.dataManipulation) {
        if (options.dataManipulation.hasOwnProperty(prop)) {
          this.constants.dataManipulation[prop] = options.dataManipulation[prop];
        }
      }
    }
    else if (options.dataManipulation !== undefined)  {
      this.constants.dataManipulation.enabled = false;
    }

    // TODO: work out these options and document them
    if (options.edges) {
      for (prop in options.edges) {
        if (options.edges.hasOwnProperty(prop)) {
          if (typeof options.edges[prop] != "object") {
            this.constants.edges[prop] = options.edges[prop];
          }
        }
      }


      if (options.edges.color !== undefined) {
        if (util.isString(options.edges.color)) {
          this.constants.edges.color = {};
          this.constants.edges.color.color = options.edges.color;
          this.constants.edges.color.highlight = options.edges.color;
        }
        else {
          if (options.edges.color.color !== undefined)     {this.constants.edges.color.color = options.edges.color.color;}
          if (options.edges.color.highlight !== undefined) {this.constants.edges.color.highlight = options.edges.color.highlight;}
        }
      }

      if (!options.edges.fontColor) {
        if (options.edges.color !== undefined) {
          if (util.isString(options.edges.color))           {this.constants.edges.fontColor = options.edges.color;}
          else if (options.edges.color.color !== undefined) {this.constants.edges.fontColor = options.edges.color.color;}
        }
      }

      // Added to support dashed lines
      // David Jordan
      // 2012-08-08
      if (options.edges.dash) {
        if (options.edges.dash.length !== undefined) {
          this.constants.edges.dash.length = options.edges.dash.length;
        }
        if (options.edges.dash.gap !== undefined) {
          this.constants.edges.dash.gap = options.edges.dash.gap;
        }
        if (options.edges.dash.altLength !== undefined) {
          this.constants.edges.dash.altLength = options.edges.dash.altLength;
        }
      }
    }

    if (options.nodes) {
      for (prop in options.nodes) {
        if (options.nodes.hasOwnProperty(prop)) {
          this.constants.nodes[prop] = options.nodes[prop];
        }
      }

      if (options.nodes.color) {
        this.constants.nodes.color = util.parseColor(options.nodes.color);
      }

      /*
       if (options.nodes.widthMin) this.constants.nodes.radiusMin = options.nodes.widthMin;
       if (options.nodes.widthMax) this.constants.nodes.radiusMax = options.nodes.widthMax;
       */
    }
    if (options.groups) {
      for (var groupname in options.groups) {
        if (options.groups.hasOwnProperty(groupname)) {
          var group = options.groups[groupname];
          this.groups.add(groupname, group);
        }
      }
    }

    if (options.tooltip) {
      for (prop in options.tooltip) {
        if (options.tooltip.hasOwnProperty(prop)) {
          this.constants.tooltip[prop] = options.tooltip[prop];
        }
      }
      if (options.tooltip.color) {
        this.constants.tooltip.color = util.parseColor(options.tooltip.color);
      }
    }
  }


  // (Re)loading the mixins that can be enabled or disabled in the options.
  // load the force calculation functions, grouped under the physics system.
  this._loadPhysicsSystem();
  // load the navigation system.
  this._loadNavigationControls();
  // load the data manipulation system
  this._loadManipulationSystem();
  // configure the smooth curves
  this._configureSmoothCurves();


  // bind keys. If disabled, this will not do anything;
  this._createKeyBinds();

  this.setSize(this.width, this.height);
  this._setTranslation(this.frame.clientWidth / 2, this.frame.clientHeight / 2);
  this._setScale(1);
  this._redraw();
};

/**
 * Create the main frame for the Graph.
 * This function is executed once when a Graph object is created. The frame
 * contains a canvas, and this canvas contains all objects like the axis and
 * nodes.
 * @private
 */
Graph.prototype._create = function () {
  // remove all elements from the container element.
  while (this.containerElement.hasChildNodes()) {
    this.containerElement.removeChild(this.containerElement.firstChild);
  }

  this.frame = document.createElement('div');
  this.frame.className = 'graph-frame';
  this.frame.style.position = 'relative';
  this.frame.style.overflow = 'hidden';

  // create the graph canvas (HTML canvas element)
  this.frame.canvas = document.createElement( 'canvas' );
  this.frame.canvas.style.position = 'relative';
  this.frame.appendChild(this.frame.canvas);
  if (!this.frame.canvas.getContext) {
    var noCanvas = document.createElement( 'DIV' );
    noCanvas.style.color = 'red';
    noCanvas.style.fontWeight =  'bold' ;
    noCanvas.style.padding =  '10px';
    noCanvas.innerHTML =  'Error: your browser does not support HTML canvas';
    this.frame.canvas.appendChild(noCanvas);
  }

  var me = this;
  this.drag = {};
  this.pinch = {};
  this.hammer = Hammer(this.frame.canvas, {
    prevent_default: true
  });
  this.hammer.on('tap',       me._onTap.bind(me) );
  this.hammer.on('doubletap', me._onDoubleTap.bind(me) );
  this.hammer.on('hold',      me._onHold.bind(me) );
  this.hammer.on('pinch',     me._onPinch.bind(me) );
  this.hammer.on('touch',     me._onTouch.bind(me) );
  this.hammer.on('dragstart', me._onDragStart.bind(me) );
  this.hammer.on('drag',      me._onDrag.bind(me) );
  this.hammer.on('dragend',   me._onDragEnd.bind(me) );
  this.hammer.on('release',   me._onRelease.bind(me) );
  this.hammer.on('mousewheel',me._onMouseWheel.bind(me) );
  this.hammer.on('DOMMouseScroll',me._onMouseWheel.bind(me) ); // for FF
  this.hammer.on('mousemove', me._onMouseMoveTitle.bind(me) );

  // add the frame to the container element
  this.containerElement.appendChild(this.frame);

};


/**
 * Binding the keys for keyboard navigation. These functions are defined in the NavigationMixin
 * @private
 */
Graph.prototype._createKeyBinds = function() {
  var me = this;
  this.mousetrap = mousetrap;

  this.mousetrap.reset();

  if (this.constants.keyboard.enabled == true) {
    this.mousetrap.bind("up",   this._moveUp.bind(me)   , "keydown");
    this.mousetrap.bind("up",   this._yStopMoving.bind(me), "keyup");
    this.mousetrap.bind("down", this._moveDown.bind(me) , "keydown");
    this.mousetrap.bind("down", this._yStopMoving.bind(me), "keyup");
    this.mousetrap.bind("left", this._moveLeft.bind(me) , "keydown");
    this.mousetrap.bind("left", this._xStopMoving.bind(me), "keyup");
    this.mousetrap.bind("right",this._moveRight.bind(me), "keydown");
    this.mousetrap.bind("right",this._xStopMoving.bind(me), "keyup");
    this.mousetrap.bind("=",    this._zoomIn.bind(me),    "keydown");
    this.mousetrap.bind("=",    this._stopZoom.bind(me),    "keyup");
    this.mousetrap.bind("-",    this._zoomOut.bind(me),   "keydown");
    this.mousetrap.bind("-",    this._stopZoom.bind(me),    "keyup");
    this.mousetrap.bind("[",    this._zoomIn.bind(me),    "keydown");
    this.mousetrap.bind("[",    this._stopZoom.bind(me),    "keyup");
    this.mousetrap.bind("]",    this._zoomOut.bind(me),   "keydown");
    this.mousetrap.bind("]",    this._stopZoom.bind(me),    "keyup");
    this.mousetrap.bind("pageup",this._zoomIn.bind(me),   "keydown");
    this.mousetrap.bind("pageup",this._stopZoom.bind(me),   "keyup");
    this.mousetrap.bind("pagedown",this._zoomOut.bind(me),"keydown");
    this.mousetrap.bind("pagedown",this._stopZoom.bind(me), "keyup");
  }

  if (this.constants.dataManipulation.enabled == true) {
    this.mousetrap.bind("escape",this._createManipulatorBar.bind(me));
    this.mousetrap.bind("del",this._deleteSelected.bind(me));
  }
};

/**
 * Get the pointer location from a touch location
 * @param {{pageX: Number, pageY: Number}} touch
 * @return {{x: Number, y: Number}} pointer
 * @private
 */
Graph.prototype._getPointer = function (touch) {
  return {
    x: touch.pageX - vis.util.getAbsoluteLeft(this.frame.canvas),
    y: touch.pageY - vis.util.getAbsoluteTop(this.frame.canvas)
  };
};

/**
 * On start of a touch gesture, store the pointer
 * @param event
 * @private
 */
Graph.prototype._onTouch = function (event) {
  this.drag.pointer = this._getPointer(event.gesture.center);
  this.drag.pinched = false;
  this.pinch.scale = this._getScale();

  this._handleTouch(this.drag.pointer);
};

/**
 * handle drag start event
 * @private
 */
Graph.prototype._onDragStart = function () {
  this._handleDragStart();
};


/**
 * This function is called by _onDragStart.
 * It is separated out because we can then overload it for the datamanipulation system.
 *
 * @private
 */
Graph.prototype._handleDragStart = function() {
  var drag = this.drag;
  var node = this._getNodeAt(drag.pointer);
  // note: drag.pointer is set in _onTouch to get the initial touch location

  drag.dragging = true;
  drag.selection = [];
  drag.translation = this._getTranslation();
  drag.nodeId = null;

  if (node != null) {
    drag.nodeId = node.id;
    // select the clicked node if not yet selected
    if (!node.isSelected()) {
      this._selectObject(node,false);
    }

    // create an array with the selected nodes and their original location and status
    for (var objectId in this.selectionObj.nodes) {
      if (this.selectionObj.nodes.hasOwnProperty(objectId)) {
        var object = this.selectionObj.nodes[objectId];
        var s = {
          id: object.id,
          node: object,

          // store original x, y, xFixed and yFixed, make the node temporarily Fixed
          x: object.x,
          y: object.y,
          xFixed: object.xFixed,
          yFixed: object.yFixed
        };

        object.xFixed = true;
        object.yFixed = true;

        drag.selection.push(s);
      }
    }
  }
};


/**
 * handle drag event
 * @private
 */
Graph.prototype._onDrag = function (event) {
  this._handleOnDrag(event)
};


/**
 * This function is called by _onDrag.
 * It is separated out because we can then overload it for the datamanipulation system.
 *
 * @private
 */
Graph.prototype._handleOnDrag = function(event) {
  if (this.drag.pinched) {
    return;
  }

  var pointer = this._getPointer(event.gesture.center);

  var me = this,
    drag = this.drag,
    selection = drag.selection;
  if (selection && selection.length) {
    // calculate delta's and new location
    var deltaX = pointer.x - drag.pointer.x,
      deltaY = pointer.y - drag.pointer.y;

    // update position of all selected nodes
    selection.forEach(function (s) {
      var node = s.node;

      if (!s.xFixed) {
        node.x = me._canvasToX(me._xToCanvas(s.x) + deltaX);
      }

      if (!s.yFixed) {
        node.y = me._canvasToY(me._yToCanvas(s.y) + deltaY);
      }
    });

    // start _animationStep if not yet running
    if (!this.moving) {
      this.moving = true;
      this.start();
    }
  }
  else {
    // move the graph
    var diffX = pointer.x - this.drag.pointer.x;
    var diffY = pointer.y - this.drag.pointer.y;

    this._setTranslation(
      this.drag.translation.x + diffX,
      this.drag.translation.y + diffY);
    this._redraw();
    this.moving = true;
    this.start();
  }
};

/**
 * handle drag start event
 * @private
 */
Graph.prototype._onDragEnd = function () {
  this.drag.dragging = false;
  var selection = this.drag.selection;
  if (selection) {
    selection.forEach(function (s) {
      // restore original xFixed and yFixed
      s.node.xFixed = s.xFixed;
      s.node.yFixed = s.yFixed;
    });
  }
};

/**
 * handle tap/click event: select/unselect a node
 * @private
 */
Graph.prototype._onTap = function (event) {
  var pointer = this._getPointer(event.gesture.center);
  this.pointerPosition = pointer;
  this._handleTap(pointer);

};


/**
 * handle doubletap event
 * @private
 */
Graph.prototype._onDoubleTap = function (event) {
  var pointer = this._getPointer(event.gesture.center);
  this._handleDoubleTap(pointer);
};


/**
 * handle long tap event: multi select nodes
 * @private
 */
Graph.prototype._onHold = function (event) {
  var pointer = this._getPointer(event.gesture.center);
  this.pointerPosition = pointer;
  this._handleOnHold(pointer);
};

/**
 * handle the release of the screen
 *
 * @private
 */
Graph.prototype._onRelease = function (event) {
  var pointer = this._getPointer(event.gesture.center);
  this._handleOnRelease(pointer);
};

/**
 * Handle pinch event
 * @param event
 * @private
 */
Graph.prototype._onPinch = function (event) {
  var pointer = this._getPointer(event.gesture.center);

  this.drag.pinched = true;
  if (!('scale' in this.pinch)) {
    this.pinch.scale = 1;
  }

  // TODO: enabled moving while pinching?
  var scale = this.pinch.scale * event.gesture.scale;
  this._zoom(scale, pointer)
};

/**
 * Zoom the graph in or out
 * @param {Number} scale a number around 1, and between 0.01 and 10
 * @param {{x: Number, y: Number}} pointer    Position on screen
 * @return {Number} appliedScale    scale is limited within the boundaries
 * @private
 */
Graph.prototype._zoom = function(scale, pointer) {
  var scaleOld = this._getScale();
  if (scale < 0.00001) {
    scale = 0.00001;
  }
  if (scale > 10) {
    scale = 10;
  }
// + this.frame.canvas.clientHeight / 2
  var translation = this._getTranslation();

  var scaleFrac = scale / scaleOld;
  var tx = (1 - scaleFrac) * pointer.x + translation.x * scaleFrac;
  var ty = (1 - scaleFrac) * pointer.y + translation.y * scaleFrac;

  this.areaCenter = {"x" : this._canvasToX(pointer.x),
                     "y" : this._canvasToY(pointer.y)};

  this._setScale(scale);
  this._setTranslation(tx, ty);
  this.updateClustersDefault();
  this._redraw();

  if (scaleOld < scale) {
    this.emit("zoom", {direction:"+"});
  }
  else {
    this.emit("zoom", {direction:"-"});
  }


  return scale;
};


/**
 * Event handler for mouse wheel event, used to zoom the timeline
 * See http://adomas.org/javascript-mouse-wheel/
 *     https://github.com/EightMedia/hammer.js/issues/256
 * @param {MouseEvent}  event
 * @private
 */
Graph.prototype._onMouseWheel = function(event) {
  // retrieve delta
  var delta = 0;
  if (event.wheelDelta) { /* IE/Opera. */
    delta = event.wheelDelta/120;
  } else if (event.detail) { /* Mozilla case. */
    // In Mozilla, sign of delta is different than in IE.
    // Also, delta is multiple of 3.
    delta = -event.detail/3;
  }

  // If delta is nonzero, handle it.
  // Basically, delta is now positive if wheel was scrolled up,
  // and negative, if wheel was scrolled down.
  if (delta) {

    // calculate the new scale
    var scale = this._getScale();
    var zoom = delta / 10;
    if (delta < 0) {
      zoom = zoom / (1 - zoom);
    }
    scale *= (1 + zoom);

    // calculate the pointer location
    var gesture = util.fakeGesture(this, event);
    var pointer = this._getPointer(gesture.center);

    // apply the new scale
    this._zoom(scale, pointer);
  }

  // Prevent default actions caused by mouse wheel.
  event.preventDefault();
};


/**
 * Mouse move handler for checking whether the title moves over a node with a title.
 * @param  {Event} event
 * @private
 */
Graph.prototype._onMouseMoveTitle = function (event) {
  var gesture = util.fakeGesture(this, event);
  var pointer = this._getPointer(gesture.center);

  // check if the previously selected node is still selected
  if (this.popupNode) {
    this._checkHidePopup(pointer);
  }

  // start a timeout that will check if the mouse is positioned above
  // an element
  var me = this;
  var checkShow = function() {
    me._checkShowPopup(pointer);
  };
  if (this.popupTimer) {
    clearInterval(this.popupTimer); // stop any running calculationTimer
  }
  if (!this.drag.dragging) {
    this.popupTimer = setTimeout(checkShow, this.constants.tooltip.delay);
  }
};

/**
 * Check if there is an element on the given position in the graph
 * (a node or edge). If so, and if this element has a title,
 * show a popup window with its title.
 *
 * @param {{x:Number, y:Number}} pointer
 * @private
 */
Graph.prototype._checkShowPopup = function (pointer) {
  var obj = {
    left:   this._canvasToX(pointer.x),
    top:    this._canvasToY(pointer.y),
    right:  this._canvasToX(pointer.x),
    bottom: this._canvasToY(pointer.y)
  };

  var id;
  var lastPopupNode = this.popupNode;

  if (this.popupNode == undefined) {
    // search the nodes for overlap, select the top one in case of multiple nodes
    var nodes = this.nodes;
    for (id in nodes) {
      if (nodes.hasOwnProperty(id)) {
        var node = nodes[id];
        if (node.getTitle() !== undefined && node.isOverlappingWith(obj)) {
          this.popupNode = node;
          break;
        }
      }
    }
  }

  if (this.popupNode === undefined) {
    // search the edges for overlap
    var edges = this.edges;
    for (id in edges) {
      if (edges.hasOwnProperty(id)) {
        var edge = edges[id];
        if (edge.connected && (edge.getTitle() !== undefined) &&
            edge.isOverlappingWith(obj)) {
          this.popupNode = edge;
          break;
        }
      }
    }
  }

  if (this.popupNode) {
    // show popup message window
    if (this.popupNode != lastPopupNode) {
      var me = this;
      if (!me.popup) {
        me.popup = new Popup(me.frame, me.constants.tooltip);
      }

      // adjust a small offset such that the mouse cursor is located in the
      // bottom left location of the popup, and you can easily move over the
      // popup area
      me.popup.setPosition(pointer.x - 3, pointer.y - 3);
      me.popup.setText(me.popupNode.getTitle());
      me.popup.show();
    }
  }
  else {
    if (this.popup) {
      this.popup.hide();
    }
  }
};


/**
 * Check if the popup must be hided, which is the case when the mouse is no
 * longer hovering on the object
 * @param {{x:Number, y:Number}} pointer
 * @private
 */
Graph.prototype._checkHidePopup = function (pointer) {
  if (!this.popupNode || !this._getNodeAt(pointer) ) {
    this.popupNode = undefined;
    if (this.popup) {
      this.popup.hide();
    }
  }
};


/**
 * Set a new size for the graph
 * @param {string} width   Width in pixels or percentage (for example '800px'
 *                         or '50%')
 * @param {string} height  Height in pixels or percentage  (for example '400px'
 *                         or '30%')
 */
Graph.prototype.setSize = function(width, height) {
  this.frame.style.width = width;
  this.frame.style.height = height;

  this.frame.canvas.style.width = '100%';
  this.frame.canvas.style.height = '100%';

  this.frame.canvas.width = this.frame.canvas.clientWidth;
  this.frame.canvas.height = this.frame.canvas.clientHeight;

  if (this.manipulationDiv !== undefined) {
    this.manipulationDiv.style.width = this.frame.canvas.clientWidth + "px";
  }
  if (this.navigationDivs !== undefined) {
    if (this.navigationDivs['wrapper'] !== undefined) {
      this.navigationDivs['wrapper'].style.width = this.frame.canvas.clientWidth + "px";
      this.navigationDivs['wrapper'].style.height = this.frame.canvas.clientHeight + "px";
    }
  }

  this.emit('resize', {width:this.frame.canvas.width,height:this.frame.canvas.height});
};

/**
 * Set a data set with nodes for the graph
 * @param {Array | DataSet | DataView} nodes         The data containing the nodes.
 * @private
 */
Graph.prototype._setNodes = function(nodes) {
  var oldNodesData = this.nodesData;

  if (nodes instanceof DataSet || nodes instanceof DataView) {
    this.nodesData = nodes;
  }
  else if (nodes instanceof Array) {
    this.nodesData = new DataSet();
    this.nodesData.add(nodes);
  }
  else if (!nodes) {
    this.nodesData = new DataSet();
  }
  else {
    throw new TypeError('Array or DataSet expected');
  }

  if (oldNodesData) {
    // unsubscribe from old dataset
    util.forEach(this.nodesListeners, function (callback, event) {
      oldNodesData.off(event, callback);
    });
  }

  // remove drawn nodes
  this.nodes = {};

  if (this.nodesData) {
    // subscribe to new dataset
    var me = this;
    util.forEach(this.nodesListeners, function (callback, event) {
      me.nodesData.on(event, callback);
    });

    // draw all new nodes
    var ids = this.nodesData.getIds();
    this._addNodes(ids);
  }
  this._updateSelection();
};

/**
 * Add nodes
 * @param {Number[] | String[]} ids
 * @private
 */
Graph.prototype._addNodes = function(ids) {
  var id;
  for (var i = 0, len = ids.length; i < len; i++) {
    id = ids[i];
    var data = this.nodesData.get(id);
    var node = new Node(data, this.images, this.groups, this.constants);
    this.nodes[id] = node; // note: this may replace an existing node

    if ((node.xFixed == false || node.yFixed == false) && (node.x === null || node.y === null)) {
      var radius = 10 * 0.1*ids.length;
      var angle = 2 * Math.PI * Math.random();
      if (node.xFixed == false) {node.x = radius * Math.cos(angle);}
      if (node.yFixed == false) {node.y = radius * Math.sin(angle);}
    }
    this.moving = true;
  }
  this._updateNodeIndexList();
  if (this.constants.hierarchicalLayout.enabled == true && this.initializing == false) {
    this._resetLevels();
    this._setupHierarchicalLayout();
  }
  this._updateCalculationNodes();
  this._reconnectEdges();
  this._updateValueRange(this.nodes);
  this.updateLabels();
};

/**
 * Update existing nodes, or create them when not yet existing
 * @param {Number[] | String[]} ids
 * @private
 */
Graph.prototype._updateNodes = function(ids) {
  var nodes = this.nodes,
      nodesData = this.nodesData;
  for (var i = 0, len = ids.length; i < len; i++) {
    var id = ids[i];
    var node = nodes[id];
    var data = nodesData.get(id);
    if (node) {
      // update node
      node.setProperties(data, this.constants);
    }
    else {
      // create node
      node = new Node(properties, this.images, this.groups, this.constants);
      nodes[id] = node;
    }
  }
  this.moving = true;
  if (this.constants.hierarchicalLayout.enabled == true && this.initializing == false) {
    this._resetLevels();
    this._setupHierarchicalLayout();
  }
  this._updateNodeIndexList();
  this._reconnectEdges();
  this._updateValueRange(nodes);
};

/**
 * Remove existing nodes. If nodes do not exist, the method will just ignore it.
 * @param {Number[] | String[]} ids
 * @private
 */
Graph.prototype._removeNodes = function(ids) {
  var nodes = this.nodes;
  for (var i = 0, len = ids.length; i < len; i++) {
    var id = ids[i];
    delete nodes[id];
  }
  this._updateNodeIndexList();
  if (this.constants.hierarchicalLayout.enabled == true && this.initializing == false) {
    this._resetLevels();
    this._setupHierarchicalLayout();
  }
  this._updateCalculationNodes();
  this._reconnectEdges();
  this._updateSelection();
  this._updateValueRange(nodes);
};

/**
 * Load edges by reading the data table
 * @param {Array | DataSet | DataView} edges    The data containing the edges.
 * @private
 * @private
 */
Graph.prototype._setEdges = function(edges) {
  var oldEdgesData = this.edgesData;

  if (edges instanceof DataSet || edges instanceof DataView) {
    this.edgesData = edges;
  }
  else if (edges instanceof Array) {
    this.edgesData = new DataSet();
    this.edgesData.add(edges);
  }
  else if (!edges) {
    this.edgesData = new DataSet();
  }
  else {
    throw new TypeError('Array or DataSet expected');
  }

  if (oldEdgesData) {
    // unsubscribe from old dataset
    util.forEach(this.edgesListeners, function (callback, event) {
      oldEdgesData.off(event, callback);
    });
  }

  // remove drawn edges
  this.edges = {};

  if (this.edgesData) {
    // subscribe to new dataset
    var me = this;
    util.forEach(this.edgesListeners, function (callback, event) {
      me.edgesData.on(event, callback);
    });

    // draw all new nodes
    var ids = this.edgesData.getIds();
    this._addEdges(ids);
  }

  this._reconnectEdges();
};

/**
 * Add edges
 * @param {Number[] | String[]} ids
 * @private
 */
Graph.prototype._addEdges = function (ids) {
  var edges = this.edges,
      edgesData = this.edgesData;

  for (var i = 0, len = ids.length; i < len; i++) {
    var id = ids[i];

    var oldEdge = edges[id];
    if (oldEdge) {
      oldEdge.disconnect();
    }

    var data = edgesData.get(id, {"showInternalIds" : true});
    edges[id] = new Edge(data, this, this.constants);
  }

  this.moving = true;
  this._updateValueRange(edges);
  this._createBezierNodes();
  if (this.constants.hierarchicalLayout.enabled == true && this.initializing == false) {
    this._resetLevels();
    this._setupHierarchicalLayout();
  }
  this._updateCalculationNodes();
};

/**
 * Update existing edges, or create them when not yet existing
 * @param {Number[] | String[]} ids
 * @private
 */
Graph.prototype._updateEdges = function (ids) {
  var edges = this.edges,
      edgesData = this.edgesData;
  for (var i = 0, len = ids.length; i < len; i++) {
    var id = ids[i];

    var data = edgesData.get(id);
    var edge = edges[id];
    if (edge) {
      // update edge
      edge.disconnect();
      edge.setProperties(data, this.constants);
      edge.connect();
    }
    else {
      // create edge
      edge = new Edge(data, this, this.constants);
      this.edges[id] = edge;
    }
  }

  this._createBezierNodes();
  if (this.constants.hierarchicalLayout.enabled == true && this.initializing == false) {
    this._resetLevels();
    this._setupHierarchicalLayout();
  }
  this.moving = true;
  this._updateValueRange(edges);
};

/**
 * Remove existing edges. Non existing ids will be ignored
 * @param {Number[] | String[]} ids
 * @private
 */
Graph.prototype._removeEdges = function (ids) {
  var edges = this.edges;
  for (var i = 0, len = ids.length; i < len; i++) {
    var id = ids[i];
    var edge = edges[id];
    if (edge) {
      if (edge.via != null) {
        delete this.sectors['support']['nodes'][edge.via.id];
      }
      edge.disconnect();
      delete edges[id];
    }
  }

  this.moving = true;
  this._updateValueRange(edges);
  if (this.constants.hierarchicalLayout.enabled == true && this.initializing == false) {
    this._resetLevels();
    this._setupHierarchicalLayout();
  }
  this._updateCalculationNodes();
};

/**
 * Reconnect all edges
 * @private
 */
Graph.prototype._reconnectEdges = function() {
  var id,
      nodes = this.nodes,
      edges = this.edges;
  for (id in nodes) {
    if (nodes.hasOwnProperty(id)) {
      nodes[id].edges = [];
    }
  }

  for (id in edges) {
    if (edges.hasOwnProperty(id)) {
      var edge = edges[id];
      edge.from = null;
      edge.to = null;
      edge.connect();
    }
  }
};

/**
 * Update the values of all object in the given array according to the current
 * value range of the objects in the array.
 * @param {Object} obj    An object containing a set of Edges or Nodes
 *                        The objects must have a method getValue() and
 *                        setValueRange(min, max).
 * @private
 */
Graph.prototype._updateValueRange = function(obj) {
  var id;

  // determine the range of the objects
  var valueMin = undefined;
  var valueMax = undefined;
  for (id in obj) {
    if (obj.hasOwnProperty(id)) {
      var value = obj[id].getValue();
      if (value !== undefined) {
        valueMin = (valueMin === undefined) ? value : Math.min(value, valueMin);
        valueMax = (valueMax === undefined) ? value : Math.max(value, valueMax);
      }
    }
  }

  // adjust the range of all objects
  if (valueMin !== undefined && valueMax !== undefined) {
    for (id in obj) {
      if (obj.hasOwnProperty(id)) {
        obj[id].setValueRange(valueMin, valueMax);
      }
    }
  }
};

/**
 * Redraw the graph with the current data
 * chart will be resized too.
 */
Graph.prototype.redraw = function() {
  this.setSize(this.width, this.height);

  this._redraw();
};

/**
 * Redraw the graph with the current data
 * @private
 */
Graph.prototype._redraw = function() {
  var ctx = this.frame.canvas.getContext('2d');
  // clear the canvas
  var w = this.frame.canvas.width;
  var h = this.frame.canvas.height;
  ctx.clearRect(0, 0, w, h);

  // set scaling and translation
  ctx.save();
  ctx.translate(this.translation.x, this.translation.y);
  ctx.scale(this.scale, this.scale);

  this.canvasTopLeft = {
    "x": this._canvasToX(0),
    "y": this._canvasToY(0)
  };
  this.canvasBottomRight = {
    "x": this._canvasToX(this.frame.canvas.clientWidth),
    "y": this._canvasToY(this.frame.canvas.clientHeight)
  };

  this._doInAllSectors("_drawAllSectorNodes",ctx);
  this._doInAllSectors("_drawEdges",ctx);
  this._doInAllSectors("_drawNodes",ctx,false);

//  this._doInSupportSector("_drawNodes",ctx,true);
//  this._drawTree(ctx,"#F00F0F");

  // restore original scaling and translation
  ctx.restore();
};

/**
 * Set the translation of the graph
 * @param {Number} offsetX    Horizontal offset
 * @param {Number} offsetY    Vertical offset
 * @private
 */
Graph.prototype._setTranslation = function(offsetX, offsetY) {
  if (this.translation === undefined) {
    this.translation = {
      x: 0,
      y: 0
    };
  }

  if (offsetX !== undefined) {
    this.translation.x = offsetX;
  }
  if (offsetY !== undefined) {
    this.translation.y = offsetY;
  }

  this.emit('viewChanged');
};

/**
 * Get the translation of the graph
 * @return {Object} translation    An object with parameters x and y, both a number
 * @private
 */
Graph.prototype._getTranslation = function() {
  return {
    x: this.translation.x,
    y: this.translation.y
  };
};

/**
 * Scale the graph
 * @param {Number} scale   Scaling factor 1.0 is unscaled
 * @private
 */
Graph.prototype._setScale = function(scale) {
  this.scale = scale;
};

/**
 * Get the current scale of  the graph
 * @return {Number} scale   Scaling factor 1.0 is unscaled
 * @private
 */
Graph.prototype._getScale = function() {
  return this.scale;
};

/**
 * Convert a horizontal point on the HTML canvas to the x-value of the model
 * @param {number} x
 * @returns {number}
 * @private
 */
Graph.prototype._canvasToX = function(x) {
  return (x - this.translation.x) / this.scale;
};

/**
 * Convert an x-value in the model to a horizontal point on the HTML canvas
 * @param {number} x
 * @returns {number}
 * @private
 */
Graph.prototype._xToCanvas = function(x) {
  return x * this.scale + this.translation.x;
};

/**
 * Convert a vertical point on the HTML canvas to the y-value of the model
 * @param {number} y
 * @returns {number}
 * @private
 */
Graph.prototype._canvasToY = function(y) {
  return (y - this.translation.y) / this.scale;
};

/**
 * Convert an y-value in the model to a vertical point on the HTML canvas
 * @param {number} y
 * @returns {number}
 * @private
 */
Graph.prototype._yToCanvas = function(y) {
  return y * this.scale + this.translation.y ;
};


/**
 *
 * @param {object} pos   = {x: number, y: number}
 * @returns {{x: number, y: number}}
 * @constructor
 */
Graph.prototype.DOMtoCanvas = function(pos) {
  return {x:this._xToCanvas(pos.x),y:this._yToCanvas(pos.y)};
}

/**
 *
 * @param {object} pos   = {x: number, y: number}
 * @returns {{x: number, y: number}}
 * @constructor
 */
Graph.prototype.canvasToDOM = function(pos) {
  return {x:this._canvasToX(pos.x),y:this._canvasToY(pos.y)};
}

/**
 * Redraw all nodes
 * The 2d context of a HTML canvas can be retrieved by canvas.getContext('2d');
 * @param {CanvasRenderingContext2D}   ctx
 * @param {Boolean} [alwaysShow]
 * @private
 */
Graph.prototype._drawNodes = function(ctx,alwaysShow) {
  if (alwaysShow === undefined) {
    alwaysShow = false;
  }

  // first draw the unselected nodes
  var nodes = this.nodes;
  var selected = [];

  for (var id in nodes) {
    if (nodes.hasOwnProperty(id)) {
      nodes[id].setScaleAndPos(this.scale,this.canvasTopLeft,this.canvasBottomRight);
      if (nodes[id].isSelected()) {
        selected.push(id);
      }
      else {
        if (nodes[id].inArea() || alwaysShow) {
          nodes[id].draw(ctx);
        }
      }
    }
  }

  // draw the selected nodes on top
  for (var s = 0, sMax = selected.length; s < sMax; s++) {
    if (nodes[selected[s]].inArea() || alwaysShow) {
      nodes[selected[s]].draw(ctx);
    }
  }
};

/**
 * Redraw all edges
 * The 2d context of a HTML canvas can be retrieved by canvas.getContext('2d');
 * @param {CanvasRenderingContext2D}   ctx
 * @private
 */
Graph.prototype._drawEdges = function(ctx) {
  var edges = this.edges;
  for (var id in edges) {
    if (edges.hasOwnProperty(id)) {
      var edge = edges[id];
      edge.setScale(this.scale);
      if (edge.connected) {
        edges[id].draw(ctx);
      }
    }
  }
};

/**
 * Find a stable position for all nodes
 * @private
 */
Graph.prototype._stabilize = function() {
  if (this.constants.freezeForStabilization == true) {
    this._freezeDefinedNodes();
  }

  // find stable position
  var count = 0;
  while (this.moving && count < this.constants.stabilizationIterations) {
    this._physicsTick();
    count++;
  }
  this.zoomExtent(false,true);
  if (this.constants.freezeForStabilization == true) {
    this._restoreFrozenNodes();
  }
  this.emit("stabilized",{iterations:count});
};

/**
 * When initializing and stabilizing, we can freeze nodes with a predefined position. This greatly speeds up stabilization
 * because only the supportnodes for the smoothCurves have to settle.
 *
 * @private
 */
Graph.prototype._freezeDefinedNodes = function() {
  var nodes = this.nodes;
  for (var id in nodes) {
    if (nodes.hasOwnProperty(id)) {
      if (nodes[id].x != null && nodes[id].y != null) {
        nodes[id].fixedData.x = nodes[id].xFixed;
        nodes[id].fixedData.y = nodes[id].yFixed;
        nodes[id].xFixed = true;
        nodes[id].yFixed = true;
      }
    }
  }
};

/**
 * Unfreezes the nodes that have been frozen by _freezeDefinedNodes.
 *
 * @private
 */
Graph.prototype._restoreFrozenNodes = function() {
  var nodes = this.nodes;
  for (var id in nodes) {
    if (nodes.hasOwnProperty(id)) {
      if (nodes[id].fixedData.x != null) {
        nodes[id].xFixed = nodes[id].fixedData.x;
        nodes[id].yFixed = nodes[id].fixedData.y;
      }
    }
  }
};


/**
 * Check if any of the nodes is still moving
 * @param {number} vmin   the minimum velocity considered as 'moving'
 * @return {boolean}      true if moving, false if non of the nodes is moving
 * @private
 */
Graph.prototype._isMoving = function(vmin) {
  var nodes = this.nodes;
  for (var id in nodes) {
    if (nodes.hasOwnProperty(id) && nodes[id].isMoving(vmin)) {
      return true;
    }
  }
  return false;
};


/**
 * /**
 * Perform one discrete step for all nodes
 *
 * @private
 */
Graph.prototype._discreteStepNodes = function() {
  var interval = this.physicsDiscreteStepsize;
  var nodes = this.nodes;
  var nodeId;
  var nodesPresent = false;

  if (this.constants.maxVelocity > 0) {
    for (nodeId in nodes) {
      if (nodes.hasOwnProperty(nodeId)) {
        nodes[nodeId].discreteStepLimited(interval, this.constants.maxVelocity);
        nodesPresent = true;
      }
    }
  }
  else {
    for (nodeId in nodes) {
      if (nodes.hasOwnProperty(nodeId)) {
        nodes[nodeId].discreteStep(interval);
        nodesPresent = true;
      }
    }
  }

  if (nodesPresent == true) {
    var vminCorrected = this.constants.minVelocity / Math.max(this.scale,0.05);
    if (vminCorrected > 0.5*this.constants.maxVelocity) {
      this.moving = true;
    }
    else {
      this.moving = this._isMoving(vminCorrected);
    }
  }
};

/**
 * A single simulation step (or "tick") in the physics simulation
 *
 * @private
 */
Graph.prototype._physicsTick = function() {
  if (!this.freezeSimulation) {
    if (this.moving) {
      this._doInAllActiveSectors("_initializeForceCalculation");
      this._doInAllActiveSectors("_discreteStepNodes");
      if (this.constants.smoothCurves) {
        this._doInSupportSector("_discreteStepNodes");
      }
      this._findCenter(this._getRange())
    }
  }
};


/**
 * This function runs one step of the animation. It calls an x amount of physics ticks and one render tick.
 * It reschedules itself at the beginning of the function
 *
 * @private
 */
Graph.prototype._animationStep = function() {
  // reset the timer so a new scheduled animation step can be set
  this.timer = undefined;
  // handle the keyboad movement
  this._handleNavigation();

  // this schedules a new animation step
  this.start();

  // start the physics simulation
  var calculationTime = Date.now();
  var maxSteps = 1;
  this._physicsTick();
  var timeRequired = Date.now() - calculationTime;
  while (timeRequired < (this.renderTimestep - this.renderTime) && maxSteps < this.maxPhysicsTicksPerRender) {
    this._physicsTick();
    timeRequired = Date.now() - calculationTime;
    maxSteps++;

  }

  // start the rendering process
  var renderTime = Date.now();
  this._redraw();
  this.renderTime = Date.now() - renderTime;
};

if (typeof window !== 'undefined') {
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                 window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
}

/**
 * Schedule a animation step with the refreshrate interval.
 */
Graph.prototype.start = function() {
  if (this.moving || this.xIncrement != 0 || this.yIncrement != 0 || this.zoomIncrement != 0) {
    if (!this.timer) {
      var ua = navigator.userAgent.toLowerCase();

      var requiresTimeout = false;
      if (ua.indexOf('msie 9.0') != -1) { // IE 9
        requiresTimeout = true;
      }
      else if (ua.indexOf('safari') != -1) {  // safari
        if (ua.indexOf('chrome') <= -1) {
          requiresTimeout = true;
        }
      }

      if (requiresTimeout == true) {
        this.timer = window.setTimeout(this._animationStep.bind(this), this.renderTimestep); // wait this.renderTimeStep milliseconds and perform the animation step function
      }
      else{
        this.timer = window.requestAnimationFrame(this._animationStep.bind(this), this.renderTimestep); // wait this.renderTimeStep milliseconds and perform the animation step function
      }
    }
  }
  else {
    this._redraw();
  }
};


/**
 * Move the graph according to the keyboard presses.
 *
 * @private
 */
Graph.prototype._handleNavigation = function() {
  if (this.xIncrement != 0 || this.yIncrement != 0) {
    var translation = this._getTranslation();
    this._setTranslation(translation.x+this.xIncrement, translation.y+this.yIncrement);
  }
  if (this.zoomIncrement != 0) {
    var center = {
      x: this.frame.canvas.clientWidth / 2,
      y: this.frame.canvas.clientHeight / 2
    };
    this._zoom(this.scale*(1 + this.zoomIncrement), center);
  }
};


/**
 *  Freeze the _animationStep
 */
Graph.prototype.toggleFreeze = function() {
  if (this.freezeSimulation == false) {
    this.freezeSimulation = true;
  }
  else {
    this.freezeSimulation = false;
    this.start();
  }
};


/**
 * This function cleans the support nodes if they are not needed and adds them when they are.
 *
 * @param {boolean} [disableStart]
 * @private
 */
Graph.prototype._configureSmoothCurves = function(disableStart) {
  if (disableStart === undefined) {
    disableStart = true;
  }

  if (this.constants.smoothCurves == true) {
    this._createBezierNodes();
  }
  else {
    // delete the support nodes
    this.sectors['support']['nodes'] = {};
    for (var edgeId in this.edges) {
      if (this.edges.hasOwnProperty(edgeId)) {
        this.edges[edgeId].smooth = false;
        this.edges[edgeId].via = null;
      }
    }
  }
  this._updateCalculationNodes();
  if (!disableStart) {
    this.moving = true;
    this.start();
  }
};


/**
 * Bezier curves require an anchor point to calculate the smooth flow. These points are nodes. These nodes are invisible but
 * are used for the force calculation.
 *
 * @private
 */
Graph.prototype._createBezierNodes = function() {
  if (this.constants.smoothCurves == true) {
    for (var edgeId in this.edges) {
      if (this.edges.hasOwnProperty(edgeId)) {
        var edge = this.edges[edgeId];
        if (edge.via == null) {
          edge.smooth = true;
          var nodeId = "edgeId:".concat(edge.id);
          this.sectors['support']['nodes'][nodeId] = new Node(
                  {id:nodeId,
                    mass:1,
                    shape:'circle',
                    image:"",
                    internalMultiplier:1
                  },{},{},this.constants);
          edge.via = this.sectors['support']['nodes'][nodeId];
          edge.via.parentEdgeId = edge.id;
          edge.positionBezierNode();
        }
      }
    }
  }
};

/**
 * load the functions that load the mixins into the prototype.
 *
 * @private
 */
Graph.prototype._initializeMixinLoaders = function () {
  for (var mixinFunction in graphMixinLoaders) {
    if (graphMixinLoaders.hasOwnProperty(mixinFunction)) {
      Graph.prototype[mixinFunction] = graphMixinLoaders[mixinFunction];
    }
  }
};

/**
 * Load the XY positions of the nodes into the dataset.
 */
Graph.prototype.storePosition = function() {
  var dataArray = [];
  for (var nodeId in this.nodes) {
    if (this.nodes.hasOwnProperty(nodeId)) {
      var node = this.nodes[nodeId];
      var allowedToMoveX = !this.nodes.xFixed;
      var allowedToMoveY = !this.nodes.yFixed;
      if (this.nodesData.data[nodeId].x != Math.round(node.x) || this.nodesData.data[nodeId].y != Math.round(node.y)) {
        dataArray.push({id:nodeId,x:Math.round(node.x),y:Math.round(node.y),allowedToMoveX:allowedToMoveX,allowedToMoveY:allowedToMoveY});
      }
    }
  }
  this.nodesData.update(dataArray);
};













/**
 * vis.js module exports
 */
var vis = {
  util: util,

  DataSet: DataSet,
  DataView: DataView,
  Range: Range,
  stack: stack,
  TimeStep: TimeStep,

  components: {
    items: {
      Item: Item,
      ItemBox: ItemBox,
      ItemPoint: ItemPoint,
      ItemRange: ItemRange
    },

    Component: Component,
    Panel: Panel,
    RootPanel: RootPanel,
    ItemSet: ItemSet,
    TimeAxis: TimeAxis
  },

  graph: {
    Node: Node,
    Edge: Edge,
    Popup: Popup,
    Groups: Groups,
    Images: Images
  },

  Timeline: Timeline,
  Graph: Graph
};

/**
 * CommonJS module exports
 */
if (typeof exports !== 'undefined') {
  exports = vis;
}
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = vis;
}

/**
 * AMD module exports
 */
if (typeof(define) === 'function') {
  define(function () {
    return vis;
  });
}

/**
 * Window exports
 */
if (typeof window !== 'undefined') {
  // attach the module to the window, load as a regular javascript file
  window['vis'] = vis;
}


},{"emitter-component":2,"hammerjs":3,"moment":4,"mousetrap":5}],2:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],3:[function(require,module,exports){
/*! Hammer.JS - v1.0.5 - 2013-04-07
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2013 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */

(function(window, undefined) {
    'use strict';

/**
 * Hammer
 * use this to create instances
 * @param   {HTMLElement}   element
 * @param   {Object}        options
 * @returns {Hammer.Instance}
 * @constructor
 */
var Hammer = function(element, options) {
    return new Hammer.Instance(element, options || {});
};

// default settings
Hammer.defaults = {
    // add styles and attributes to the element to prevent the browser from doing
    // its native behavior. this doesnt prevent the scrolling, but cancels
    // the contextmenu, tap highlighting etc
    // set to false to disable this
    stop_browser_behavior: {
		// this also triggers onselectstart=false for IE
        userSelect: 'none',
		// this makes the element blocking in IE10 >, you could experiment with the value
		// see for more options this issue; https://github.com/EightMedia/hammer.js/issues/241
        touchAction: 'none',
		touchCallout: 'none',
        contentZooming: 'none',
        userDrag: 'none',
        tapHighlightColor: 'rgba(0,0,0,0)'
    }

    // more settings are defined per gesture at gestures.js
};

// detect touchevents
Hammer.HAS_POINTEREVENTS = navigator.pointerEnabled || navigator.msPointerEnabled;
Hammer.HAS_TOUCHEVENTS = ('ontouchstart' in window);

// dont use mouseevents on mobile devices
Hammer.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
Hammer.NO_MOUSEEVENTS = Hammer.HAS_TOUCHEVENTS && navigator.userAgent.match(Hammer.MOBILE_REGEX);

// eventtypes per touchevent (start, move, end)
// are filled by Hammer.event.determineEventTypes on setup
Hammer.EVENT_TYPES = {};

// direction defines
Hammer.DIRECTION_DOWN = 'down';
Hammer.DIRECTION_LEFT = 'left';
Hammer.DIRECTION_UP = 'up';
Hammer.DIRECTION_RIGHT = 'right';

// pointer type
Hammer.POINTER_MOUSE = 'mouse';
Hammer.POINTER_TOUCH = 'touch';
Hammer.POINTER_PEN = 'pen';

// touch event defines
Hammer.EVENT_START = 'start';
Hammer.EVENT_MOVE = 'move';
Hammer.EVENT_END = 'end';

// hammer document where the base events are added at
Hammer.DOCUMENT = document;

// plugins namespace
Hammer.plugins = {};

// if the window events are set...
Hammer.READY = false;

/**
 * setup events to detect gestures on the document
 */
function setup() {
    if(Hammer.READY) {
        return;
    }

    // find what eventtypes we add listeners to
    Hammer.event.determineEventTypes();

    // Register all gestures inside Hammer.gestures
    for(var name in Hammer.gestures) {
        if(Hammer.gestures.hasOwnProperty(name)) {
            Hammer.detection.register(Hammer.gestures[name]);
        }
    }

    // Add touch events on the document
    Hammer.event.onTouch(Hammer.DOCUMENT, Hammer.EVENT_MOVE, Hammer.detection.detect);
    Hammer.event.onTouch(Hammer.DOCUMENT, Hammer.EVENT_END, Hammer.detection.detect);

    // Hammer is ready...!
    Hammer.READY = true;
}

/**
 * create new hammer instance
 * all methods should return the instance itself, so it is chainable.
 * @param   {HTMLElement}       element
 * @param   {Object}            [options={}]
 * @returns {Hammer.Instance}
 * @constructor
 */
Hammer.Instance = function(element, options) {
    var self = this;

    // setup HammerJS window events and register all gestures
    // this also sets up the default options
    setup();

    this.element = element;

    // start/stop detection option
    this.enabled = true;

    // merge options
    this.options = Hammer.utils.extend(
        Hammer.utils.extend({}, Hammer.defaults),
        options || {});

    // add some css to the element to prevent the browser from doing its native behavoir
    if(this.options.stop_browser_behavior) {
        Hammer.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior);
    }

    // start detection on touchstart
    Hammer.event.onTouch(element, Hammer.EVENT_START, function(ev) {
        if(self.enabled) {
            Hammer.detection.startDetect(self, ev);
        }
    });

    // return instance
    return this;
};


Hammer.Instance.prototype = {
    /**
     * bind events to the instance
     * @param   {String}      gesture
     * @param   {Function}    handler
     * @returns {Hammer.Instance}
     */
    on: function onEvent(gesture, handler){
        var gestures = gesture.split(' ');
        for(var t=0; t<gestures.length; t++) {
            this.element.addEventListener(gestures[t], handler, false);
        }
        return this;
    },


    /**
     * unbind events to the instance
     * @param   {String}      gesture
     * @param   {Function}    handler
     * @returns {Hammer.Instance}
     */
    off: function offEvent(gesture, handler){
        var gestures = gesture.split(' ');
        for(var t=0; t<gestures.length; t++) {
            this.element.removeEventListener(gestures[t], handler, false);
        }
        return this;
    },


    /**
     * trigger gesture event
     * @param   {String}      gesture
     * @param   {Object}      eventData
     * @returns {Hammer.Instance}
     */
    trigger: function triggerEvent(gesture, eventData){
        // create DOM event
        var event = Hammer.DOCUMENT.createEvent('Event');
		event.initEvent(gesture, true, true);
		event.gesture = eventData;

        // trigger on the target if it is in the instance element,
        // this is for event delegation tricks
        var element = this.element;
        if(Hammer.utils.hasParent(eventData.target, element)) {
            element = eventData.target;
        }

        element.dispatchEvent(event);
        return this;
    },


    /**
     * enable of disable hammer.js detection
     * @param   {Boolean}   state
     * @returns {Hammer.Instance}
     */
    enable: function enable(state) {
        this.enabled = state;
        return this;
    }
};

/**
 * this holds the last move event,
 * used to fix empty touchend issue
 * see the onTouch event for an explanation
 * @type {Object}
 */
var last_move_event = null;


/**
 * when the mouse is hold down, this is true
 * @type {Boolean}
 */
var enable_detect = false;


/**
 * when touch events have been fired, this is true
 * @type {Boolean}
 */
var touch_triggered = false;


Hammer.event = {
    /**
     * simple addEventListener
     * @param   {HTMLElement}   element
     * @param   {String}        type
     * @param   {Function}      handler
     */
    bindDom: function(element, type, handler) {
        var types = type.split(' ');
        for(var t=0; t<types.length; t++) {
            element.addEventListener(types[t], handler, false);
        }
    },


    /**
     * touch events with mouse fallback
     * @param   {HTMLElement}   element
     * @param   {String}        eventType        like Hammer.EVENT_MOVE
     * @param   {Function}      handler
     */
    onTouch: function onTouch(element, eventType, handler) {
		var self = this;

        this.bindDom(element, Hammer.EVENT_TYPES[eventType], function bindDomOnTouch(ev) {
            var sourceEventType = ev.type.toLowerCase();

            // onmouseup, but when touchend has been fired we do nothing.
            // this is for touchdevices which also fire a mouseup on touchend
            if(sourceEventType.match(/mouse/) && touch_triggered) {
                return;
            }

            // mousebutton must be down or a touch event
            else if( sourceEventType.match(/touch/) ||   // touch events are always on screen
                sourceEventType.match(/pointerdown/) || // pointerevents touch
                (sourceEventType.match(/mouse/) && ev.which === 1)   // mouse is pressed
            ){
                enable_detect = true;
            }

            // we are in a touch event, set the touch triggered bool to true,
            // this for the conflicts that may occur on ios and android
            if(sourceEventType.match(/touch|pointer/)) {
                touch_triggered = true;
            }

            // count the total touches on the screen
            var count_touches = 0;

            // when touch has been triggered in this detection session
            // and we are now handling a mouse event, we stop that to prevent conflicts
            if(enable_detect) {
                // update pointerevent
                if(Hammer.HAS_POINTEREVENTS && eventType != Hammer.EVENT_END) {
                    count_touches = Hammer.PointerEvent.updatePointer(eventType, ev);
                }
                // touch
                else if(sourceEventType.match(/touch/)) {
                    count_touches = ev.touches.length;
                }
                // mouse
                else if(!touch_triggered) {
                    count_touches = sourceEventType.match(/up/) ? 0 : 1;
                }

                // if we are in a end event, but when we remove one touch and
                // we still have enough, set eventType to move
                if(count_touches > 0 && eventType == Hammer.EVENT_END) {
                    eventType = Hammer.EVENT_MOVE;
                }
                // no touches, force the end event
                else if(!count_touches) {
                    eventType = Hammer.EVENT_END;
                }

                // because touchend has no touches, and we often want to use these in our gestures,
                // we send the last move event as our eventData in touchend
                if(!count_touches && last_move_event !== null) {
                    ev = last_move_event;
                }
                // store the last move event
                else {
                    last_move_event = ev;
                }

                // trigger the handler
                handler.call(Hammer.detection, self.collectEventData(element, eventType, ev));

                // remove pointerevent from list
                if(Hammer.HAS_POINTEREVENTS && eventType == Hammer.EVENT_END) {
                    count_touches = Hammer.PointerEvent.updatePointer(eventType, ev);
                }
            }

            //debug(sourceEventType +" "+ eventType);

            // on the end we reset everything
            if(!count_touches) {
                last_move_event = null;
                enable_detect = false;
                touch_triggered = false;
                Hammer.PointerEvent.reset();
            }
        });
    },


    /**
     * we have different events for each device/browser
     * determine what we need and set them in the Hammer.EVENT_TYPES constant
     */
    determineEventTypes: function determineEventTypes() {
        // determine the eventtype we want to set
        var types;

        // pointerEvents magic
        if(Hammer.HAS_POINTEREVENTS) {
            types = Hammer.PointerEvent.getEvents();
        }
        // on Android, iOS, blackberry, windows mobile we dont want any mouseevents
        else if(Hammer.NO_MOUSEEVENTS) {
            types = [
                'touchstart',
                'touchmove',
                'touchend touchcancel'];
        }
        // for non pointer events browsers and mixed browsers,
        // like chrome on windows8 touch laptop
        else {
            types = [
                'touchstart mousedown',
                'touchmove mousemove',
                'touchend touchcancel mouseup'];
        }

        Hammer.EVENT_TYPES[Hammer.EVENT_START]  = types[0];
        Hammer.EVENT_TYPES[Hammer.EVENT_MOVE]   = types[1];
        Hammer.EVENT_TYPES[Hammer.EVENT_END]    = types[2];
    },


    /**
     * create touchlist depending on the event
     * @param   {Object}    ev
     * @param   {String}    eventType   used by the fakemultitouch plugin
     */
    getTouchList: function getTouchList(ev/*, eventType*/) {
        // get the fake pointerEvent touchlist
        if(Hammer.HAS_POINTEREVENTS) {
            return Hammer.PointerEvent.getTouchList();
        }
        // get the touchlist
        else if(ev.touches) {
            return ev.touches;
        }
        // make fake touchlist from mouse position
        else {
            return [{
                identifier: 1,
                pageX: ev.pageX,
                pageY: ev.pageY,
                target: ev.target
            }];
        }
    },


    /**
     * collect event data for Hammer js
     * @param   {HTMLElement}   element
     * @param   {String}        eventType        like Hammer.EVENT_MOVE
     * @param   {Object}        eventData
     */
    collectEventData: function collectEventData(element, eventType, ev) {
        var touches = this.getTouchList(ev, eventType);

        // find out pointerType
        var pointerType = Hammer.POINTER_TOUCH;
        if(ev.type.match(/mouse/) || Hammer.PointerEvent.matchType(Hammer.POINTER_MOUSE, ev)) {
            pointerType = Hammer.POINTER_MOUSE;
        }

        return {
            center      : Hammer.utils.getCenter(touches),
            timeStamp   : new Date().getTime(),
            target      : ev.target,
            touches     : touches,
            eventType   : eventType,
            pointerType : pointerType,
            srcEvent    : ev,

            /**
             * prevent the browser default actions
             * mostly used to disable scrolling of the browser
             */
            preventDefault: function() {
                if(this.srcEvent.preventManipulation) {
                    this.srcEvent.preventManipulation();
                }

                if(this.srcEvent.preventDefault) {
                    this.srcEvent.preventDefault();
                }
            },

            /**
             * stop bubbling the event up to its parents
             */
            stopPropagation: function() {
                this.srcEvent.stopPropagation();
            },

            /**
             * immediately stop gesture detection
             * might be useful after a swipe was detected
             * @return {*}
             */
            stopDetect: function() {
                return Hammer.detection.stopDetect();
            }
        };
    }
};

Hammer.PointerEvent = {
    /**
     * holds all pointers
     * @type {Object}
     */
    pointers: {},

    /**
     * get a list of pointers
     * @returns {Array}     touchlist
     */
    getTouchList: function() {
        var self = this;
        var touchlist = [];

        // we can use forEach since pointerEvents only is in IE10
        Object.keys(self.pointers).sort().forEach(function(id) {
            touchlist.push(self.pointers[id]);
        });
        return touchlist;
    },

    /**
     * update the position of a pointer
     * @param   {String}   type             Hammer.EVENT_END
     * @param   {Object}   pointerEvent
     */
    updatePointer: function(type, pointerEvent) {
        if(type == Hammer.EVENT_END) {
            this.pointers = {};
        }
        else {
            pointerEvent.identifier = pointerEvent.pointerId;
            this.pointers[pointerEvent.pointerId] = pointerEvent;
        }

        return Object.keys(this.pointers).length;
    },

    /**
     * check if ev matches pointertype
     * @param   {String}        pointerType     Hammer.POINTER_MOUSE
     * @param   {PointerEvent}  ev
     */
    matchType: function(pointerType, ev) {
        if(!ev.pointerType) {
            return false;
        }

        var types = {};
        types[Hammer.POINTER_MOUSE] = (ev.pointerType == ev.MSPOINTER_TYPE_MOUSE || ev.pointerType == Hammer.POINTER_MOUSE);
        types[Hammer.POINTER_TOUCH] = (ev.pointerType == ev.MSPOINTER_TYPE_TOUCH || ev.pointerType == Hammer.POINTER_TOUCH);
        types[Hammer.POINTER_PEN] = (ev.pointerType == ev.MSPOINTER_TYPE_PEN || ev.pointerType == Hammer.POINTER_PEN);
        return types[pointerType];
    },


    /**
     * get events
     */
    getEvents: function() {
        return [
            'pointerdown MSPointerDown',
            'pointermove MSPointerMove',
            'pointerup pointercancel MSPointerUp MSPointerCancel'
        ];
    },

    /**
     * reset the list
     */
    reset: function() {
        this.pointers = {};
    }
};


Hammer.utils = {
    /**
     * extend method,
     * also used for cloning when dest is an empty object
     * @param   {Object}    dest
     * @param   {Object}    src
	 * @parm	{Boolean}	merge		do a merge
     * @returns {Object}    dest
     */
    extend: function extend(dest, src, merge) {
        for (var key in src) {
			if(dest[key] !== undefined && merge) {
				continue;
			}
            dest[key] = src[key];
        }
        return dest;
    },


    /**
     * find if a node is in the given parent
     * used for event delegation tricks
     * @param   {HTMLElement}   node
     * @param   {HTMLElement}   parent
     * @returns {boolean}       has_parent
     */
    hasParent: function(node, parent) {
        while(node){
            if(node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    },


    /**
     * get the center of all the touches
     * @param   {Array}     touches
     * @returns {Object}    center
     */
    getCenter: function getCenter(touches) {
        var valuesX = [], valuesY = [];

        for(var t= 0,len=touches.length; t<len; t++) {
            valuesX.push(touches[t].pageX);
            valuesY.push(touches[t].pageY);
        }

        return {
            pageX: ((Math.min.apply(Math, valuesX) + Math.max.apply(Math, valuesX)) / 2),
            pageY: ((Math.min.apply(Math, valuesY) + Math.max.apply(Math, valuesY)) / 2)
        };
    },


    /**
     * calculate the velocity between two points
     * @param   {Number}    delta_time
     * @param   {Number}    delta_x
     * @param   {Number}    delta_y
     * @returns {Object}    velocity
     */
    getVelocity: function getVelocity(delta_time, delta_x, delta_y) {
        return {
            x: Math.abs(delta_x / delta_time) || 0,
            y: Math.abs(delta_y / delta_time) || 0
        };
    },


    /**
     * calculate the angle between two coordinates
     * @param   {Touch}     touch1
     * @param   {Touch}     touch2
     * @returns {Number}    angle
     */
    getAngle: function getAngle(touch1, touch2) {
        var y = touch2.pageY - touch1.pageY,
            x = touch2.pageX - touch1.pageX;
        return Math.atan2(y, x) * 180 / Math.PI;
    },


    /**
     * angle to direction define
     * @param   {Touch}     touch1
     * @param   {Touch}     touch2
     * @returns {String}    direction constant, like Hammer.DIRECTION_LEFT
     */
    getDirection: function getDirection(touch1, touch2) {
        var x = Math.abs(touch1.pageX - touch2.pageX),
            y = Math.abs(touch1.pageY - touch2.pageY);

        if(x >= y) {
            return touch1.pageX - touch2.pageX > 0 ? Hammer.DIRECTION_LEFT : Hammer.DIRECTION_RIGHT;
        }
        else {
            return touch1.pageY - touch2.pageY > 0 ? Hammer.DIRECTION_UP : Hammer.DIRECTION_DOWN;
        }
    },


    /**
     * calculate the distance between two touches
     * @param   {Touch}     touch1
     * @param   {Touch}     touch2
     * @returns {Number}    distance
     */
    getDistance: function getDistance(touch1, touch2) {
        var x = touch2.pageX - touch1.pageX,
            y = touch2.pageY - touch1.pageY;
        return Math.sqrt((x*x) + (y*y));
    },


    /**
     * calculate the scale factor between two touchLists (fingers)
     * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
     * @param   {Array}     start
     * @param   {Array}     end
     * @returns {Number}    scale
     */
    getScale: function getScale(start, end) {
        // need two fingers...
        if(start.length >= 2 && end.length >= 2) {
            return this.getDistance(end[0], end[1]) /
                this.getDistance(start[0], start[1]);
        }
        return 1;
    },


    /**
     * calculate the rotation degrees between two touchLists (fingers)
     * @param   {Array}     start
     * @param   {Array}     end
     * @returns {Number}    rotation
     */
    getRotation: function getRotation(start, end) {
        // need two fingers
        if(start.length >= 2 && end.length >= 2) {
            return this.getAngle(end[1], end[0]) -
                this.getAngle(start[1], start[0]);
        }
        return 0;
    },


    /**
     * boolean if the direction is vertical
     * @param    {String}    direction
     * @returns  {Boolean}   is_vertical
     */
    isVertical: function isVertical(direction) {
        return (direction == Hammer.DIRECTION_UP || direction == Hammer.DIRECTION_DOWN);
    },


    /**
     * stop browser default behavior with css props
     * @param   {HtmlElement}   element
     * @param   {Object}        css_props
     */
    stopDefaultBrowserBehavior: function stopDefaultBrowserBehavior(element, css_props) {
        var prop,
            vendors = ['webkit','khtml','moz','ms','o',''];

        if(!css_props || !element.style) {
            return;
        }

        // with css properties for modern browsers
        for(var i = 0; i < vendors.length; i++) {
            for(var p in css_props) {
                if(css_props.hasOwnProperty(p)) {
                    prop = p;

                    // vender prefix at the property
                    if(vendors[i]) {
                        prop = vendors[i] + prop.substring(0, 1).toUpperCase() + prop.substring(1);
                    }

                    // set the style
                    element.style[prop] = css_props[p];
                }
            }
        }

        // also the disable onselectstart
        if(css_props.userSelect == 'none') {
            element.onselectstart = function() {
                return false;
            };
        }
    }
};

Hammer.detection = {
    // contains all registred Hammer.gestures in the correct order
    gestures: [],

    // data of the current Hammer.gesture detection session
    current: null,

    // the previous Hammer.gesture session data
    // is a full clone of the previous gesture.current object
    previous: null,

    // when this becomes true, no gestures are fired
    stopped: false,


    /**
     * start Hammer.gesture detection
     * @param   {Hammer.Instance}   inst
     * @param   {Object}            eventData
     */
    startDetect: function startDetect(inst, eventData) {
        // already busy with a Hammer.gesture detection on an element
        if(this.current) {
            return;
        }

        this.stopped = false;

        this.current = {
            inst        : inst, // reference to HammerInstance we're working for
            startEvent  : Hammer.utils.extend({}, eventData), // start eventData for distances, timing etc
            lastEvent   : false, // last eventData
            name        : '' // current gesture we're in/detected, can be 'tap', 'hold' etc
        };

        this.detect(eventData);
    },


    /**
     * Hammer.gesture detection
     * @param   {Object}    eventData
     * @param   {Object}    eventData
     */
    detect: function detect(eventData) {
        if(!this.current || this.stopped) {
            return;
        }

        // extend event data with calculations about scale, distance etc
        eventData = this.extendEventData(eventData);

        // instance options
        var inst_options = this.current.inst.options;

        // call Hammer.gesture handlers
        for(var g=0,len=this.gestures.length; g<len; g++) {
            var gesture = this.gestures[g];

            // only when the instance options have enabled this gesture
            if(!this.stopped && inst_options[gesture.name] !== false) {
                // if a handler returns false, we stop with the detection
                if(gesture.handler.call(gesture, eventData, this.current.inst) === false) {
                    this.stopDetect();
                    break;
                }
            }
        }

        // store as previous event event
        if(this.current) {
            this.current.lastEvent = eventData;
        }

        // endevent, but not the last touch, so dont stop
        if(eventData.eventType == Hammer.EVENT_END && !eventData.touches.length-1) {
            this.stopDetect();
        }

        return eventData;
    },


    /**
     * clear the Hammer.gesture vars
     * this is called on endDetect, but can also be used when a final Hammer.gesture has been detected
     * to stop other Hammer.gestures from being fired
     */
    stopDetect: function stopDetect() {
        // clone current data to the store as the previous gesture
        // used for the double tap gesture, since this is an other gesture detect session
        this.previous = Hammer.utils.extend({}, this.current);

        // reset the current
        this.current = null;

        // stopped!
        this.stopped = true;
    },


    /**
     * extend eventData for Hammer.gestures
     * @param   {Object}   ev
     * @returns {Object}   ev
     */
    extendEventData: function extendEventData(ev) {
        var startEv = this.current.startEvent;

        // if the touches change, set the new touches over the startEvent touches
        // this because touchevents don't have all the touches on touchstart, or the
        // user must place his fingers at the EXACT same time on the screen, which is not realistic
        // but, sometimes it happens that both fingers are touching at the EXACT same time
        if(startEv && (ev.touches.length != startEv.touches.length || ev.touches === startEv.touches)) {
            // extend 1 level deep to get the touchlist with the touch objects
            startEv.touches = [];
            for(var i=0,len=ev.touches.length; i<len; i++) {
                startEv.touches.push(Hammer.utils.extend({}, ev.touches[i]));
            }
        }

        var delta_time = ev.timeStamp - startEv.timeStamp,
            delta_x = ev.center.pageX - startEv.center.pageX,
            delta_y = ev.center.pageY - startEv.center.pageY,
            velocity = Hammer.utils.getVelocity(delta_time, delta_x, delta_y);

        Hammer.utils.extend(ev, {
            deltaTime   : delta_time,

            deltaX      : delta_x,
            deltaY      : delta_y,

            velocityX   : velocity.x,
            velocityY   : velocity.y,

            distance    : Hammer.utils.getDistance(startEv.center, ev.center),
            angle       : Hammer.utils.getAngle(startEv.center, ev.center),
            direction   : Hammer.utils.getDirection(startEv.center, ev.center),

            scale       : Hammer.utils.getScale(startEv.touches, ev.touches),
            rotation    : Hammer.utils.getRotation(startEv.touches, ev.touches),

            startEvent  : startEv
        });

        return ev;
    },


    /**
     * register new gesture
     * @param   {Object}    gesture object, see gestures.js for documentation
     * @returns {Array}     gestures
     */
    register: function register(gesture) {
        // add an enable gesture options if there is no given
        var options = gesture.defaults || {};
        if(options[gesture.name] === undefined) {
            options[gesture.name] = true;
        }

        // extend Hammer default options with the Hammer.gesture options
        Hammer.utils.extend(Hammer.defaults, options, true);

        // set its index
        gesture.index = gesture.index || 1000;

        // add Hammer.gesture to the list
        this.gestures.push(gesture);

        // sort the list by index
        this.gestures.sort(function(a, b) {
            if (a.index < b.index) {
                return -1;
            }
            if (a.index > b.index) {
                return 1;
            }
            return 0;
        });

        return this.gestures;
    }
};


Hammer.gestures = Hammer.gestures || {};

/**
 * Custom gestures
 * ==============================
 *
 * Gesture object
 * --------------------
 * The object structure of a gesture:
 *
 * { name: 'mygesture',
 *   index: 1337,
 *   defaults: {
 *     mygesture_option: true
 *   }
 *   handler: function(type, ev, inst) {
 *     // trigger gesture event
 *     inst.trigger(this.name, ev);
 *   }
 * }

 * @param   {String}    name
 * this should be the name of the gesture, lowercase
 * it is also being used to disable/enable the gesture per instance config.
 *
 * @param   {Number}    [index=1000]
 * the index of the gesture, where it is going to be in the stack of gestures detection
 * like when you build an gesture that depends on the drag gesture, it is a good
 * idea to place it after the index of the drag gesture.
 *
 * @param   {Object}    [defaults={}]
 * the default settings of the gesture. these are added to the instance settings,
 * and can be overruled per instance. you can also add the name of the gesture,
 * but this is also added by default (and set to true).
 *
 * @param   {Function}  handler
 * this handles the gesture detection of your custom gesture and receives the
 * following arguments:
 *
 *      @param  {Object}    eventData
 *      event data containing the following properties:
 *          timeStamp   {Number}        time the event occurred
 *          target      {HTMLElement}   target element
 *          touches     {Array}         touches (fingers, pointers, mouse) on the screen
 *          pointerType {String}        kind of pointer that was used. matches Hammer.POINTER_MOUSE|TOUCH
 *          center      {Object}        center position of the touches. contains pageX and pageY
 *          deltaTime   {Number}        the total time of the touches in the screen
 *          deltaX      {Number}        the delta on x axis we haved moved
 *          deltaY      {Number}        the delta on y axis we haved moved
 *          velocityX   {Number}        the velocity on the x
 *          velocityY   {Number}        the velocity on y
 *          angle       {Number}        the angle we are moving
 *          direction   {String}        the direction we are moving. matches Hammer.DIRECTION_UP|DOWN|LEFT|RIGHT
 *          distance    {Number}        the distance we haved moved
 *          scale       {Number}        scaling of the touches, needs 2 touches
 *          rotation    {Number}        rotation of the touches, needs 2 touches *
 *          eventType   {String}        matches Hammer.EVENT_START|MOVE|END
 *          srcEvent    {Object}        the source event, like TouchStart or MouseDown *
 *          startEvent  {Object}        contains the same properties as above,
 *                                      but from the first touch. this is used to calculate
 *                                      distances, deltaTime, scaling etc
 *
 *      @param  {Hammer.Instance}    inst
 *      the instance we are doing the detection for. you can get the options from
 *      the inst.options object and trigger the gesture event by calling inst.trigger
 *
 *
 * Handle gestures
 * --------------------
 * inside the handler you can get/set Hammer.detection.current. This is the current
 * detection session. It has the following properties
 *      @param  {String}    name
 *      contains the name of the gesture we have detected. it has not a real function,
 *      only to check in other gestures if something is detected.
 *      like in the drag gesture we set it to 'drag' and in the swipe gesture we can
 *      check if the current gesture is 'drag' by accessing Hammer.detection.current.name
 *
 *      @readonly
 *      @param  {Hammer.Instance}    inst
 *      the instance we do the detection for
 *
 *      @readonly
 *      @param  {Object}    startEvent
 *      contains the properties of the first gesture detection in this session.
 *      Used for calculations about timing, distance, etc.
 *
 *      @readonly
 *      @param  {Object}    lastEvent
 *      contains all the properties of the last gesture detect in this session.
 *
 * after the gesture detection session has been completed (user has released the screen)
 * the Hammer.detection.current object is copied into Hammer.detection.previous,
 * this is usefull for gestures like doubletap, where you need to know if the
 * previous gesture was a tap
 *
 * options that have been set by the instance can be received by calling inst.options
 *
 * You can trigger a gesture event by calling inst.trigger("mygesture", event).
 * The first param is the name of your gesture, the second the event argument
 *
 *
 * Register gestures
 * --------------------
 * When an gesture is added to the Hammer.gestures object, it is auto registered
 * at the setup of the first Hammer instance. You can also call Hammer.detection.register
 * manually and pass your gesture object as a param
 *
 */

/**
 * Hold
 * Touch stays at the same place for x time
 * @events  hold
 */
Hammer.gestures.Hold = {
    name: 'hold',
    index: 10,
    defaults: {
        hold_timeout	: 500,
        hold_threshold	: 1
    },
    timer: null,
    handler: function holdGesture(ev, inst) {
        switch(ev.eventType) {
            case Hammer.EVENT_START:
                // clear any running timers
                clearTimeout(this.timer);

                // set the gesture so we can check in the timeout if it still is
                Hammer.detection.current.name = this.name;

                // set timer and if after the timeout it still is hold,
                // we trigger the hold event
                this.timer = setTimeout(function() {
                    if(Hammer.detection.current.name == 'hold') {
                        inst.trigger('hold', ev);
                    }
                }, inst.options.hold_timeout);
                break;

            // when you move or end we clear the timer
            case Hammer.EVENT_MOVE:
                if(ev.distance > inst.options.hold_threshold) {
                    clearTimeout(this.timer);
                }
                break;

            case Hammer.EVENT_END:
                clearTimeout(this.timer);
                break;
        }
    }
};


/**
 * Tap/DoubleTap
 * Quick touch at a place or double at the same place
 * @events  tap, doubletap
 */
Hammer.gestures.Tap = {
    name: 'tap',
    index: 100,
    defaults: {
        tap_max_touchtime	: 250,
        tap_max_distance	: 10,
		tap_always			: true,
        doubletap_distance	: 20,
        doubletap_interval	: 300
    },
    handler: function tapGesture(ev, inst) {
        if(ev.eventType == Hammer.EVENT_END) {
            // previous gesture, for the double tap since these are two different gesture detections
            var prev = Hammer.detection.previous,
				did_doubletap = false;

            // when the touchtime is higher then the max touch time
            // or when the moving distance is too much
            if(ev.deltaTime > inst.options.tap_max_touchtime ||
                ev.distance > inst.options.tap_max_distance) {
                return;
            }

            // check if double tap
            if(prev && prev.name == 'tap' &&
                (ev.timeStamp - prev.lastEvent.timeStamp) < inst.options.doubletap_interval &&
                ev.distance < inst.options.doubletap_distance) {
				inst.trigger('doubletap', ev);
				did_doubletap = true;
            }

			// do a single tap
			if(!did_doubletap || inst.options.tap_always) {
				Hammer.detection.current.name = 'tap';
				inst.trigger(Hammer.detection.current.name, ev);
			}
        }
    }
};


/**
 * Swipe
 * triggers swipe events when the end velocity is above the threshold
 * @events  swipe, swipeleft, swiperight, swipeup, swipedown
 */
Hammer.gestures.Swipe = {
    name: 'swipe',
    index: 40,
    defaults: {
        // set 0 for unlimited, but this can conflict with transform
        swipe_max_touches  : 1,
        swipe_velocity     : 0.7
    },
    handler: function swipeGesture(ev, inst) {
        if(ev.eventType == Hammer.EVENT_END) {
            // max touches
            if(inst.options.swipe_max_touches > 0 &&
                ev.touches.length > inst.options.swipe_max_touches) {
                return;
            }

            // when the distance we moved is too small we skip this gesture
            // or we can be already in dragging
            if(ev.velocityX > inst.options.swipe_velocity ||
                ev.velocityY > inst.options.swipe_velocity) {
                // trigger swipe events
                inst.trigger(this.name, ev);
                inst.trigger(this.name + ev.direction, ev);
            }
        }
    }
};


/**
 * Drag
 * Move with x fingers (default 1) around on the page. Blocking the scrolling when
 * moving left and right is a good practice. When all the drag events are blocking
 * you disable scrolling on that area.
 * @events  drag, drapleft, dragright, dragup, dragdown
 */
Hammer.gestures.Drag = {
    name: 'drag',
    index: 50,
    defaults: {
        drag_min_distance : 10,
        // set 0 for unlimited, but this can conflict with transform
        drag_max_touches  : 1,
        // prevent default browser behavior when dragging occurs
        // be careful with it, it makes the element a blocking element
        // when you are using the drag gesture, it is a good practice to set this true
        drag_block_horizontal   : false,
        drag_block_vertical     : false,
        // drag_lock_to_axis keeps the drag gesture on the axis that it started on,
        // It disallows vertical directions if the initial direction was horizontal, and vice versa.
        drag_lock_to_axis       : false,
        // drag lock only kicks in when distance > drag_lock_min_distance
        // This way, locking occurs only when the distance has become large enough to reliably determine the direction
        drag_lock_min_distance : 25
    },
    triggered: false,
    handler: function dragGesture(ev, inst) {
        // current gesture isnt drag, but dragged is true
        // this means an other gesture is busy. now call dragend
        if(Hammer.detection.current.name != this.name && this.triggered) {
            inst.trigger(this.name +'end', ev);
            this.triggered = false;
            return;
        }

        // max touches
        if(inst.options.drag_max_touches > 0 &&
            ev.touches.length > inst.options.drag_max_touches) {
            return;
        }

        switch(ev.eventType) {
            case Hammer.EVENT_START:
                this.triggered = false;
                break;

            case Hammer.EVENT_MOVE:
                // when the distance we moved is too small we skip this gesture
                // or we can be already in dragging
                if(ev.distance < inst.options.drag_min_distance &&
                    Hammer.detection.current.name != this.name) {
                    return;
                }

                // we are dragging!
                Hammer.detection.current.name = this.name;

                // lock drag to axis?
                if(Hammer.detection.current.lastEvent.drag_locked_to_axis || (inst.options.drag_lock_to_axis && inst.options.drag_lock_min_distance<=ev.distance)) {
                    ev.drag_locked_to_axis = true;
                }
                var last_direction = Hammer.detection.current.lastEvent.direction;
                if(ev.drag_locked_to_axis && last_direction !== ev.direction) {
                    // keep direction on the axis that the drag gesture started on
                    if(Hammer.utils.isVertical(last_direction)) {
                        ev.direction = (ev.deltaY < 0) ? Hammer.DIRECTION_UP : Hammer.DIRECTION_DOWN;
                    }
                    else {
                        ev.direction = (ev.deltaX < 0) ? Hammer.DIRECTION_LEFT : Hammer.DIRECTION_RIGHT;
                    }
                }

                // first time, trigger dragstart event
                if(!this.triggered) {
                    inst.trigger(this.name +'start', ev);
                    this.triggered = true;
                }

                // trigger normal event
                inst.trigger(this.name, ev);

                // direction event, like dragdown
                inst.trigger(this.name + ev.direction, ev);

                // block the browser events
                if( (inst.options.drag_block_vertical && Hammer.utils.isVertical(ev.direction)) ||
                    (inst.options.drag_block_horizontal && !Hammer.utils.isVertical(ev.direction))) {
                    ev.preventDefault();
                }
                break;

            case Hammer.EVENT_END:
                // trigger dragend
                if(this.triggered) {
                    inst.trigger(this.name +'end', ev);
                }

                this.triggered = false;
                break;
        }
    }
};


/**
 * Transform
 * User want to scale or rotate with 2 fingers
 * @events  transform, pinch, pinchin, pinchout, rotate
 */
Hammer.gestures.Transform = {
    name: 'transform',
    index: 45,
    defaults: {
        // factor, no scale is 1, zoomin is to 0 and zoomout until higher then 1
        transform_min_scale     : 0.01,
        // rotation in degrees
        transform_min_rotation  : 1,
        // prevent default browser behavior when two touches are on the screen
        // but it makes the element a blocking element
        // when you are using the transform gesture, it is a good practice to set this true
        transform_always_block  : false
    },
    triggered: false,
    handler: function transformGesture(ev, inst) {
        // current gesture isnt drag, but dragged is true
        // this means an other gesture is busy. now call dragend
        if(Hammer.detection.current.name != this.name && this.triggered) {
            inst.trigger(this.name +'end', ev);
            this.triggered = false;
            return;
        }

        // atleast multitouch
        if(ev.touches.length < 2) {
            return;
        }

        // prevent default when two fingers are on the screen
        if(inst.options.transform_always_block) {
            ev.preventDefault();
        }

        switch(ev.eventType) {
            case Hammer.EVENT_START:
                this.triggered = false;
                break;

            case Hammer.EVENT_MOVE:
                var scale_threshold = Math.abs(1-ev.scale);
                var rotation_threshold = Math.abs(ev.rotation);

                // when the distance we moved is too small we skip this gesture
                // or we can be already in dragging
                if(scale_threshold < inst.options.transform_min_scale &&
                    rotation_threshold < inst.options.transform_min_rotation) {
                    return;
                }

                // we are transforming!
                Hammer.detection.current.name = this.name;

                // first time, trigger dragstart event
                if(!this.triggered) {
                    inst.trigger(this.name +'start', ev);
                    this.triggered = true;
                }

                inst.trigger(this.name, ev); // basic transform event

                // trigger rotate event
                if(rotation_threshold > inst.options.transform_min_rotation) {
                    inst.trigger('rotate', ev);
                }

                // trigger pinch event
                if(scale_threshold > inst.options.transform_min_scale) {
                    inst.trigger('pinch', ev);
                    inst.trigger('pinch'+ ((ev.scale < 1) ? 'in' : 'out'), ev);
                }
                break;

            case Hammer.EVENT_END:
                // trigger dragend
                if(this.triggered) {
                    inst.trigger(this.name +'end', ev);
                }

                this.triggered = false;
                break;
        }
    }
};


/**
 * Touch
 * Called as first, tells the user has touched the screen
 * @events  touch
 */
Hammer.gestures.Touch = {
    name: 'touch',
    index: -Infinity,
    defaults: {
        // call preventDefault at touchstart, and makes the element blocking by
        // disabling the scrolling of the page, but it improves gestures like
        // transforming and dragging.
        // be careful with using this, it can be very annoying for users to be stuck
        // on the page
        prevent_default: false,

        // disable mouse events, so only touch (or pen!) input triggers events
        prevent_mouseevents: false
    },
    handler: function touchGesture(ev, inst) {
        if(inst.options.prevent_mouseevents && ev.pointerType == Hammer.POINTER_MOUSE) {
            ev.stopDetect();
            return;
        }

        if(inst.options.prevent_default) {
            ev.preventDefault();
        }

        if(ev.eventType ==  Hammer.EVENT_START) {
            inst.trigger(this.name, ev);
        }
    }
};


/**
 * Release
 * Called as last, tells the user has released the screen
 * @events  release
 */
Hammer.gestures.Release = {
    name: 'release',
    index: Infinity,
    handler: function releaseGesture(ev, inst) {
        if(ev.eventType ==  Hammer.EVENT_END) {
            inst.trigger(this.name, ev);
        }
    }
};

// node export
if(typeof module === 'object' && typeof module.exports === 'object'){
    module.exports = Hammer;
}
// just window export
else {
    window.Hammer = Hammer;

    // requireJS module definition
    if(typeof window.define === 'function' && window.define.amd) {
        window.define('hammer', [], function() {
            return Hammer;
        });
    }
}
})(this);
},{}],4:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};//! moment.js
//! version : 2.6.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (undefined) {

    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = "2.6.0",
        // the global-scope this is NOT the global object in Node.js
        globalScope = typeof global !== 'undefined' ? global : this,
        oldGlobalMoment,
        round = Math.round,
        i,

        YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,

        // internal storage for language config files
        languages = {},

        // moment internal properties
        momentProperties = {
            _isAMomentObject: null,
            _i : null,
            _f : null,
            _l : null,
            _strict : null,
            _isUTC : null,
            _offset : null,  // optional. Combine with _isUTC
            _pf : null,
            _lang : null  // optional
        },

        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports),

        // ASP.NET json date format regex
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
        aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,

        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,

        // format tokens
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,

        // parsing token regexes
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
        parseTokenOneToFourDigits = /\d{1,4}/, // 0 - 9999
        parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
        parseTokenDigits = /\d+/, // nonzero number of digits
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        parseTokenT = /T/i, // T (ISO separator)
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
        parseTokenOrdinal = /\d{1,2}/,

        //strict parsing regexes
        parseTokenOneDigit = /\d/, // 0 - 9
        parseTokenTwoDigits = /\d\d/, // 00 - 99
        parseTokenThreeDigits = /\d{3}/, // 000 - 999
        parseTokenFourDigits = /\d{4}/, // 0000 - 9999
        parseTokenSixDigits = /[+-]?\d{6}/, // -999,999 - 999,999
        parseTokenSignedNumber = /[+-]?\d+/, // -inf - inf

        // iso 8601 regex
        // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
        isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,

        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
            ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
            ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d{2}/],
            ['YYYY-DDD', /\d{4}-\d{3}/]
        ],

        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],

        // timezone chunker "+10:00" > ["10", "00"] or "-1530" > ["-15", "30"]
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,

        // getter and setter names
        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        },

        unitAliases = {
            ms : 'millisecond',
            s : 'second',
            m : 'minute',
            h : 'hour',
            d : 'day',
            D : 'date',
            w : 'week',
            W : 'isoWeek',
            M : 'month',
            Q : 'quarter',
            y : 'year',
            DDD : 'dayOfYear',
            e : 'weekday',
            E : 'isoWeekday',
            gg: 'weekYear',
            GG: 'isoWeekYear'
        },

        camelFunctions = {
            dayofyear : 'dayOfYear',
            isoweekday : 'isoWeekday',
            isoweek : 'isoWeek',
            weekyear : 'weekYear',
            isoweekyear : 'isoWeekYear'
        },

        // format function strings
        formatFunctions = {},

        // tokens to ordinalize and pad
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),

        formatTokenFunctions = {
            M    : function () {
                return this.month() + 1;
            },
            MMM  : function (format) {
                return this.lang().monthsShort(this, format);
            },
            MMMM : function (format) {
                return this.lang().months(this, format);
            },
            D    : function () {
                return this.date();
            },
            DDD  : function () {
                return this.dayOfYear();
            },
            d    : function () {
                return this.day();
            },
            dd   : function (format) {
                return this.lang().weekdaysMin(this, format);
            },
            ddd  : function (format) {
                return this.lang().weekdaysShort(this, format);
            },
            dddd : function (format) {
                return this.lang().weekdays(this, format);
            },
            w    : function () {
                return this.week();
            },
            W    : function () {
                return this.isoWeek();
            },
            YY   : function () {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY : function () {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY : function () {
                return leftZeroFill(this.year(), 5);
            },
            YYYYYY : function () {
                var y = this.year(), sign = y >= 0 ? '+' : '-';
                return sign + leftZeroFill(Math.abs(y), 6);
            },
            gg   : function () {
                return leftZeroFill(this.weekYear() % 100, 2);
            },
            gggg : function () {
                return leftZeroFill(this.weekYear(), 4);
            },
            ggggg : function () {
                return leftZeroFill(this.weekYear(), 5);
            },
            GG   : function () {
                return leftZeroFill(this.isoWeekYear() % 100, 2);
            },
            GGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 4);
            },
            GGGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 5);
            },
            e : function () {
                return this.weekday();
            },
            E : function () {
                return this.isoWeekday();
            },
            a    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), true);
            },
            A    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), false);
            },
            H    : function () {
                return this.hours();
            },
            h    : function () {
                return this.hours() % 12 || 12;
            },
            m    : function () {
                return this.minutes();
            },
            s    : function () {
                return this.seconds();
            },
            S    : function () {
                return toInt(this.milliseconds() / 100);
            },
            SS   : function () {
                return leftZeroFill(toInt(this.milliseconds() / 10), 2);
            },
            SSS  : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            SSSS : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z    : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(toInt(a / 60), 2) + ":" + leftZeroFill(toInt(a) % 60, 2);
            },
            ZZ   : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
            },
            z : function () {
                return this.zoneAbbr();
            },
            zz : function () {
                return this.zoneName();
            },
            X    : function () {
                return this.unix();
            },
            Q : function () {
                return this.quarter();
            }
        },

        lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'];

    function defaultParsingFlags() {
        // We need to deep clone this object, and es5 standard is not very
        // helpful.
        return {
            empty : false,
            unusedTokens : [],
            unusedInput : [],
            overflow : -2,
            charsLeftOver : 0,
            nullInput : false,
            invalidMonth : null,
            invalidFormat : false,
            userInvalidated : false,
            iso: false
        };
    }

    function deprecate(msg, fn) {
        var firstTime = true;
        function printMsg() {
            if (moment.suppressDeprecationWarnings === false &&
                    typeof console !== 'undefined' && console.warn) {
                console.warn("Deprecation warning: " + msg);
            }
        }
        return extend(function () {
            if (firstTime) {
                printMsg();
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func, period) {
        return function (a) {
            return this.lang().ordinal(func.call(this, a), period);
        };
    }

    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


    /************************************
        Constructors
    ************************************/

    function Language() {

    }

    // Moment prototype object
    function Moment(config) {
        checkOverflow(config);
        extend(this, config);
    }

    // Duration Constructor
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._bubble();
    }

    /************************************
        Helpers
    ************************************/


    function extend(a, b) {
        for (var i in b) {
            if (b.hasOwnProperty(i)) {
                a[i] = b[i];
            }
        }

        if (b.hasOwnProperty("toString")) {
            a.toString = b.toString;
        }

        if (b.hasOwnProperty("valueOf")) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function cloneMoment(m) {
        var result = {}, i;
        for (i in m) {
            if (m.hasOwnProperty(i) && momentProperties.hasOwnProperty(i)) {
                result[i] = m[i];
            }
        }

        return result;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength, forceSign) {
        var output = '' + Math.abs(number),
            sign = number >= 0;

        while (output.length < targetLength) {
            output = '0' + output;
        }
        return (sign ? (forceSign ? '+' : '') : '-') + output;
    }

    // helper function for _.addTime and _.subtractTime
    function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;
        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            rawSetter(mom, 'Date', rawGetter(mom, 'Date') + days * isAdding);
        }
        if (months) {
            rawMonthSetter(mom, rawGetter(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            moment.updateOffset(mom, days || months);
        }
    }

    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return  Object.prototype.toString.call(input) === '[object Date]' ||
                input instanceof Date;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function normalizeUnits(units) {
        if (units) {
            var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
            units = unitAliases[units] || camelFunctions[lowered] || lowered;
        }
        return units;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (inputObject.hasOwnProperty(prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeList(field) {
        var count, setter;

        if (field.indexOf('week') === 0) {
            count = 7;
            setter = 'day';
        }
        else if (field.indexOf('month') === 0) {
            count = 12;
            setter = 'month';
        }
        else {
            return;
        }

        moment[field] = function (format, index) {
            var i, getter,
                method = moment.fn._lang[field],
                results = [];

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            getter = function (i) {
                var m = moment().utc().set(setter, i);
                return method.call(moment.fn._lang, m, format || '');
            };

            if (index != null) {
                return getter(index);
            }
            else {
                for (i = 0; i < count; i++) {
                    results.push(getter(i));
                }
                return results;
            }
        };
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber);
            } else {
                value = Math.ceil(coercedNumber);
            }
        }

        return value;
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    function weeksInYear(year, dow, doy) {
        return weekOfYear(moment([year, 11, 31 + dow - doy]), dow, doy).week;
    }

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function checkOverflow(m) {
        var overflow;
        if (m._a && m._pf.overflow === -2) {
            overflow =
                m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :
                m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :
                m._a[HOUR] < 0 || m._a[HOUR] > 23 ? HOUR :
                m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :
                m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :
                m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }

            m._pf.overflow = overflow;
        }
    }

    function isValid(m) {
        if (m._isValid == null) {
            m._isValid = !isNaN(m._d.getTime()) &&
                m._pf.overflow < 0 &&
                !m._pf.empty &&
                !m._pf.invalidMonth &&
                !m._pf.nullInput &&
                !m._pf.invalidFormat &&
                !m._pf.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    m._pf.charsLeftOver === 0 &&
                    m._pf.unusedTokens.length === 0;
            }
        }
        return m._isValid;
    }

    function normalizeLanguage(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function makeAs(input, model) {
        return model._isUTC ? moment(input).zone(model._offset || 0) :
            moment(input).local();
    }

    /************************************
        Languages
    ************************************/


    extend(Language.prototype, {

        set : function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        },

        _months : "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months : function (m) {
            return this._months[m.month()];
        },

        _monthsShort : "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort : function (m) {
            return this._monthsShort[m.month()];
        },

        monthsParse : function (monthName) {
            var i, mom, regex;

            if (!this._monthsParse) {
                this._monthsParse = [];
            }

            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                if (!this._monthsParse[i]) {
                    mom = moment.utc([2000, i]);
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },

        _weekdays : "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays : function (m) {
            return this._weekdays[m.day()];
        },

        _weekdaysShort : "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort : function (m) {
            return this._weekdaysShort[m.day()];
        },

        _weekdaysMin : "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin : function (m) {
            return this._weekdaysMin[m.day()];
        },

        weekdaysParse : function (weekdayName) {
            var i, mom, regex;

            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }

            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already
                if (!this._weekdaysParse[i]) {
                    mom = moment([2000, 1]).day(i);
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        },

        _longDateFormat : {
            LT : "h:mm A",
            L : "MM/DD/YYYY",
            LL : "MMMM D YYYY",
            LLL : "MMMM D YYYY LT",
            LLLL : "dddd, MMMM D YYYY LT"
        },
        longDateFormat : function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },

        isPM : function (input) {
            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
            // Using charAt should be more compatible.
            return ((input + '').toLowerCase().charAt(0) === 'p');
        },

        _meridiemParse : /[ap]\.?m?\.?/i,
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },

        _calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        calendar : function (key, mom) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom) : output;
        },

        _relativeTime : {
            future : "in %s",
            past : "%s ago",
            s : "a few seconds",
            m : "a minute",
            mm : "%d minutes",
            h : "an hour",
            hh : "%d hours",
            d : "a day",
            dd : "%d days",
            M : "a month",
            MM : "%d months",
            y : "a year",
            yy : "%d years"
        },
        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },
        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },

        ordinal : function (number) {
            return this._ordinal.replace("%d", number);
        },
        _ordinal : "%d",

        preparse : function (string) {
            return string;
        },

        postformat : function (string) {
            return string;
        },

        week : function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        },

        _week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        },

        _invalidDate: 'Invalid date',
        invalidDate: function () {
            return this._invalidDate;
        }
    });

    // Loads a language definition into the `languages` cache.  The function
    // takes a key and optionally values.  If not in the browser and no values
    // are provided, it will load the language file module.  As a convenience,
    // this function also returns the language values.
    function loadLang(key, values) {
        values.abbr = key;
        if (!languages[key]) {
            languages[key] = new Language();
        }
        languages[key].set(values);
        return languages[key];
    }

    // Remove a language from the `languages` cache. Mostly useful in tests.
    function unloadLang(key) {
        delete languages[key];
    }

    // Determines which language definition to use and returns it.
    //
    // With no parameters, it will return the global language.  If you
    // pass in a language key, such as 'en', it will return the
    // definition for 'en', so long as 'en' has already been loaded using
    // moment.lang.
    function getLangDefinition(key) {
        var i = 0, j, lang, next, split,
            get = function (k) {
                if (!languages[k] && hasModule) {
                    try {
                        require('./lang/' + k);
                    } catch (e) { }
                }
                return languages[k];
            };

        if (!key) {
            return moment.fn._lang;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            lang = get(key);
            if (lang) {
                return lang;
            }
            key = [key];
        }

        //pick the language from the array
        //try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
        //substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
        while (i < key.length) {
            split = normalizeLanguage(key[i]).split('-');
            j = split.length;
            next = normalizeLanguage(key[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                lang = get(split.slice(0, j).join('-'));
                if (lang) {
                    return lang;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return moment.fn._lang;
    }

    /************************************
        Formatting
    ************************************/


    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, "");
        }
        return input.replace(/\\/g, "");
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = "";
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {

        if (!m.isValid()) {
            return m.lang().invalidDate();
        }

        format = expandFormat(format, m.lang());

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }

    function expandFormat(format, lang) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return lang.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }


    /************************************
        Parsing
    ************************************/


    // get the regex to find the next token
    function getParseRegexForToken(token, config) {
        var a, strict = config._strict;
        switch (token) {
        case 'Q':
            return parseTokenOneDigit;
        case 'DDDD':
            return parseTokenThreeDigits;
        case 'YYYY':
        case 'GGGG':
        case 'gggg':
            return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
        case 'Y':
        case 'G':
        case 'g':
            return parseTokenSignedNumber;
        case 'YYYYYY':
        case 'YYYYY':
        case 'GGGGG':
        case 'ggggg':
            return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
        case 'S':
            if (strict) { return parseTokenOneDigit; }
            /* falls through */
        case 'SS':
            if (strict) { return parseTokenTwoDigits; }
            /* falls through */
        case 'SSS':
            if (strict) { return parseTokenThreeDigits; }
            /* falls through */
        case 'DDD':
            return parseTokenOneToThreeDigits;
        case 'MMM':
        case 'MMMM':
        case 'dd':
        case 'ddd':
        case 'dddd':
            return parseTokenWord;
        case 'a':
        case 'A':
            return getLangDefinition(config._l)._meridiemParse;
        case 'X':
            return parseTokenTimestampMs;
        case 'Z':
        case 'ZZ':
            return parseTokenTimezone;
        case 'T':
            return parseTokenT;
        case 'SSSS':
            return parseTokenDigits;
        case 'MM':
        case 'DD':
        case 'YY':
        case 'GG':
        case 'gg':
        case 'HH':
        case 'hh':
        case 'mm':
        case 'ss':
        case 'ww':
        case 'WW':
            return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
        case 'M':
        case 'D':
        case 'd':
        case 'H':
        case 'h':
        case 'm':
        case 's':
        case 'w':
        case 'W':
        case 'e':
        case 'E':
            return parseTokenOneOrTwoDigits;
        case 'Do':
            return parseTokenOrdinal;
        default :
            a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), "i"));
            return a;
        }
    }

    function timezoneMinutesFromString(string) {
        string = string || "";
        var possibleTzMatches = (string.match(parseTokenTimezone) || []),
            tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],
            parts = (tzChunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
            minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? -minutes : minutes;
    }

    // function to convert string input to date
    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;

        switch (token) {
        // QUARTER
        case 'Q':
            if (input != null) {
                datePartArray[MONTH] = (toInt(input) - 1) * 3;
            }
            break;
        // MONTH
        case 'M' : // fall through to MM
        case 'MM' :
            if (input != null) {
                datePartArray[MONTH] = toInt(input) - 1;
            }
            break;
        case 'MMM' : // fall through to MMMM
        case 'MMMM' :
            a = getLangDefinition(config._l).monthsParse(input);
            // if we didn't find a month name, mark the date as invalid.
            if (a != null) {
                datePartArray[MONTH] = a;
            } else {
                config._pf.invalidMonth = input;
            }
            break;
        // DAY OF MONTH
        case 'D' : // fall through to DD
        case 'DD' :
            if (input != null) {
                datePartArray[DATE] = toInt(input);
            }
            break;
        case 'Do' :
            if (input != null) {
                datePartArray[DATE] = toInt(parseInt(input, 10));
            }
            break;
        // DAY OF YEAR
        case 'DDD' : // fall through to DDDD
        case 'DDDD' :
            if (input != null) {
                config._dayOfYear = toInt(input);
            }

            break;
        // YEAR
        case 'YY' :
            datePartArray[YEAR] = moment.parseTwoDigitYear(input);
            break;
        case 'YYYY' :
        case 'YYYYY' :
        case 'YYYYYY' :
            datePartArray[YEAR] = toInt(input);
            break;
        // AM / PM
        case 'a' : // fall through to A
        case 'A' :
            config._isPm = getLangDefinition(config._l).isPM(input);
            break;
        // 24 HOUR
        case 'H' : // fall through to hh
        case 'HH' : // fall through to hh
        case 'h' : // fall through to hh
        case 'hh' :
            datePartArray[HOUR] = toInt(input);
            break;
        // MINUTE
        case 'm' : // fall through to mm
        case 'mm' :
            datePartArray[MINUTE] = toInt(input);
            break;
        // SECOND
        case 's' : // fall through to ss
        case 'ss' :
            datePartArray[SECOND] = toInt(input);
            break;
        // MILLISECOND
        case 'S' :
        case 'SS' :
        case 'SSS' :
        case 'SSSS' :
            datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);
            break;
        // UNIX TIMESTAMP WITH MS
        case 'X':
            config._d = new Date(parseFloat(input) * 1000);
            break;
        // TIMEZONE
        case 'Z' : // fall through to ZZ
        case 'ZZ' :
            config._useUTC = true;
            config._tzm = timezoneMinutesFromString(input);
            break;
        case 'w':
        case 'ww':
        case 'W':
        case 'WW':
        case 'd':
        case 'dd':
        case 'ddd':
        case 'dddd':
        case 'e':
        case 'E':
            token = token.substr(0, 1);
            /* falls through */
        case 'gg':
        case 'gggg':
        case 'GG':
        case 'GGGG':
        case 'GGGGG':
            token = token.substr(0, 2);
            if (input) {
                config._w = config._w || {};
                config._w[token] = input;
            }
            break;
        }
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromConfig(config) {
        var i, date, input = [], currentDate,
            yearToUse, fixYear, w, temp, lang, weekday, week;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            fixYear = function (val) {
                var intVal = parseInt(val, 10);
                return val ?
                  (val.length < 3 ? (intVal > 68 ? 1900 + intVal : 2000 + intVal) : intVal) :
                  (config._a[YEAR] == null ? moment().weekYear() : config._a[YEAR]);
            };

            w = config._w;
            if (w.GG != null || w.W != null || w.E != null) {
                temp = dayOfYearFromWeeks(fixYear(w.GG), w.W || 1, w.E, 4, 1);
            }
            else {
                lang = getLangDefinition(config._l);
                weekday = w.d != null ?  parseWeekday(w.d, lang) :
                  (w.e != null ?  parseInt(w.e, 10) + lang._week.dow : 0);

                week = parseInt(w.w, 10) || 1;

                //if we're parsing 'd', then the low day numbers may be next week
                if (w.d != null && weekday < lang._week.dow) {
                    week++;
                }

                temp = dayOfYearFromWeeks(fixYear(w.gg), week, weekday, lang._week.doy, lang._week.dow);
            }

            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = config._a[YEAR] == null ? currentDate[YEAR] : config._a[YEAR];

            if (config._dayOfYear > daysInYear(yearToUse)) {
                config._pf._overflowDayOfYear = true;
            }

            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // add the offsets to the time to be parsed so that we can have a clean array for checking isValid
        input[HOUR] += toInt((config._tzm || 0) / 60);
        input[MINUTE] += toInt((config._tzm || 0) % 60);

        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
    }

    function dateFromObject(config) {
        var normalizedInput;

        if (config._d) {
            return;
        }

        normalizedInput = normalizeObjectUnits(config._i);
        config._a = [
            normalizedInput.year,
            normalizedInput.month,
            normalizedInput.day,
            normalizedInput.hour,
            normalizedInput.minute,
            normalizedInput.second,
            normalizedInput.millisecond
        ];

        dateFromConfig(config);
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate()
            ];
        } else {
            return [now.getFullYear(), now.getMonth(), now.getDate()];
        }
    }

    // date from string and format string
    function makeDateFromStringAndFormat(config) {

        config._a = [];
        config._pf.empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var lang = getLangDefinition(config._l),
            string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, lang).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    config._pf.unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    config._pf.empty = false;
                }
                else {
                    config._pf.unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                config._pf.unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            config._pf.unusedInput.push(string);
        }

        // handle am pm
        if (config._isPm && config._a[HOUR] < 12) {
            config._a[HOUR] += 12;
        }
        // if is 12 am, change hours to 0
        if (config._isPm === false && config._a[HOUR] === 12) {
            config._a[HOUR] = 0;
        }

        dateFromConfig(config);
        checkOverflow(config);
    }

    function unescapeFormat(s) {
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        });
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function regexpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    // date from string and array of format strings
    function makeDateFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            config._pf.invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = extend({}, config);
            tempConfig._pf = defaultParsingFlags();
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += tempConfig._pf.charsLeftOver;

            //or tokens
            currentScore += tempConfig._pf.unusedTokens.length * 10;

            tempConfig._pf.score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    // date from iso format
    function makeDateFromString(config) {
        var i, l,
            string = config._i,
            match = isoRegex.exec(string);

        if (match) {
            config._pf.iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    // match[5] should be "T" or undefined
                    config._f = isoDates[i][0] + (match[6] || " ");
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (string.match(parseTokenTimezone)) {
                config._f += "Z";
            }
            makeDateFromStringAndFormat(config);
        }
        else {
            moment.createFromInputFallback(config);
        }
    }

    function makeDateFromInput(config) {
        var input = config._i,
            matched = aspNetJsonRegex.exec(input);

        if (input === undefined) {
            config._d = new Date();
        } else if (matched) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = input.slice(0);
            dateFromConfig(config);
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if (typeof(input) === 'object') {
            dateFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            moment.createFromInputFallback(config);
        }
    }

    function makeDate(y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor doesn't accept years < 1970
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function makeUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    function parseWeekday(input, language) {
        if (typeof input === 'string') {
            if (!isNaN(input)) {
                input = parseInt(input, 10);
            }
            else {
                input = language.weekdaysParse(input);
                if (typeof input !== 'number') {
                    return null;
                }
            }
        }
        return input;
    }

    /************************************
        Relative Time
    ************************************/


    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, lang) {
        return lang.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(milliseconds, withoutSuffix, lang) {
        var seconds = round(Math.abs(milliseconds) / 1000),
            minutes = round(seconds / 60),
            hours = round(minutes / 60),
            days = round(hours / 24),
            years = round(days / 365),
            args = seconds < 45 && ['s', seconds] ||
                minutes === 1 && ['m'] ||
                minutes < 45 && ['mm', minutes] ||
                hours === 1 && ['h'] ||
                hours < 22 && ['hh', hours] ||
                days === 1 && ['d'] ||
                days <= 25 && ['dd', days] ||
                days <= 45 && ['M'] ||
                days < 345 && ['MM', round(days / 30)] ||
                years === 1 && ['y'] || ['yy', years];
        args[2] = withoutSuffix;
        args[3] = milliseconds > 0;
        args[4] = lang;
        return substituteTimeAgo.apply({}, args);
    }


    /************************************
        Week of Year
    ************************************/


    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = moment(mom).add('d', daysToDayOfWeek);
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = makeUTCDate(year, 0, 1).getUTCDay(), daysToAdd, dayOfYear;

        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;

        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    /************************************
        Top Level Functions
    ************************************/

    function makeMoment(config) {
        var input = config._i,
            format = config._f;

        if (input === null || (format === undefined && input === '')) {
            return moment.invalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = getLangDefinition().preparse(input);
        }

        if (moment.isMoment(input)) {
            config = cloneMoment(input);

            config._d = new Date(+input._d);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }

        return new Moment(config);
    }

    moment = function (input, format, lang, strict) {
        var c;

        if (typeof(lang) === "boolean") {
            strict = lang;
            lang = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._i = input;
        c._f = format;
        c._l = lang;
        c._strict = strict;
        c._isUTC = false;
        c._pf = defaultParsingFlags();

        return makeMoment(c);
    };

    moment.suppressDeprecationWarnings = false;

    moment.createFromInputFallback = deprecate(
            "moment construction falls back to js Date. This is " +
            "discouraged and will be removed in upcoming major " +
            "release. Please refer to " +
            "https://github.com/moment/moment/issues/1407 for more info.",
            function (config) {
        config._d = new Date(config._i);
    });

    // creating with utc
    moment.utc = function (input, format, lang, strict) {
        var c;

        if (typeof(lang) === "boolean") {
            strict = lang;
            lang = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._useUTC = true;
        c._isUTC = true;
        c._l = lang;
        c._i = input;
        c._f = format;
        c._strict = strict;
        c._pf = defaultParsingFlags();

        return makeMoment(c).utc();
    };

    // creating with unix timestamp (in seconds)
    moment.unix = function (input) {
        return moment(input * 1000);
    };

    // duration
    moment.duration = function (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            parseIso;

        if (moment.isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
            sign = (match[1] === "-") ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoDurationRegex.exec(input))) {
            sign = (match[1] === "-") ? -1 : 1;
            parseIso = function (inp) {
                // We'd normally use ~~inp for this, but unfortunately it also
                // converts floats to ints.
                // inp may be undefined, so careful calling replace on it.
                var res = inp && parseFloat(inp.replace(',', '.'));
                // apply sign while we're at it
                return (isNaN(res) ? 0 : res) * sign;
            };
            duration = {
                y: parseIso(match[2]),
                M: parseIso(match[3]),
                d: parseIso(match[4]),
                h: parseIso(match[5]),
                m: parseIso(match[6]),
                s: parseIso(match[7]),
                w: parseIso(match[8])
            };
        }

        ret = new Duration(duration);

        if (moment.isDuration(input) && input.hasOwnProperty('_lang')) {
            ret._lang = input._lang;
        }

        return ret;
    };

    // version number
    moment.version = VERSION;

    // default format
    moment.defaultFormat = isoFormat;

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    moment.momentProperties = momentProperties;

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    moment.updateOffset = function () {};

    // This function will load languages and then set the global language.  If
    // no arguments are passed in, it will simply return the current global
    // language key.
    moment.lang = function (key, values) {
        var r;
        if (!key) {
            return moment.fn._lang._abbr;
        }
        if (values) {
            loadLang(normalizeLanguage(key), values);
        } else if (values === null) {
            unloadLang(key);
            key = 'en';
        } else if (!languages[key]) {
            getLangDefinition(key);
        }
        r = moment.duration.fn._lang = moment.fn._lang = getLangDefinition(key);
        return r._abbr;
    };

    // returns language data
    moment.langData = function (key) {
        if (key && key._lang && key._lang._abbr) {
            key = key._lang._abbr;
        }
        return getLangDefinition(key);
    };

    // compare moment object
    moment.isMoment = function (obj) {
        return obj instanceof Moment ||
            (obj != null &&  obj.hasOwnProperty('_isAMomentObject'));
    };

    // for typechecking Duration objects
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };

    for (i = lists.length - 1; i >= 0; --i) {
        makeList(lists[i]);
    }

    moment.normalizeUnits = function (units) {
        return normalizeUnits(units);
    };

    moment.invalid = function (flags) {
        var m = moment.utc(NaN);
        if (flags != null) {
            extend(m._pf, flags);
        }
        else {
            m._pf.userInvalidated = true;
        }

        return m;
    };

    moment.parseZone = function () {
        return moment.apply(null, arguments).parseZone();
    };

    moment.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    /************************************
        Moment Prototype
    ************************************/


    extend(moment.fn = Moment.prototype, {

        clone : function () {
            return moment(this);
        },

        valueOf : function () {
            return +this._d + ((this._offset || 0) * 60000);
        },

        unix : function () {
            return Math.floor(+this / 1000);
        },

        toString : function () {
            return this.clone().lang('en').format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        },

        toDate : function () {
            return this._offset ? new Date(+this) : this._d;
        },

        toISOString : function () {
            var m = moment(this).utc();
            if (0 < m.year() && m.year() <= 9999) {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            } else {
                return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        },

        toArray : function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },

        isValid : function () {
            return isValid(this);
        },

        isDSTShifted : function () {

            if (this._a) {
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
            }

            return false;
        },

        parsingFlags : function () {
            return extend({}, this._pf);
        },

        invalidAt: function () {
            return this._pf.overflow;
        },

        utc : function () {
            return this.zone(0);
        },

        local : function () {
            this.zone(0);
            this._isUTC = false;
            return this;
        },

        format : function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.lang().postformat(output);
        },

        add : function (input, val) {
            var dur;
            // switch args to support add('s', 1) and add(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, 1);
            return this;
        },

        subtract : function (input, val) {
            var dur;
            // switch args to support subtract('s', 1) and subtract(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, -1);
            return this;
        },

        diff : function (input, units, asFloat) {
            var that = makeAs(input, this),
                zoneDiff = (this.zone() - that.zone()) * 6e4,
                diff, output;

            units = normalizeUnits(units);

            if (units === 'year' || units === 'month') {
                // average number of days in the months in the given dates
                diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
                // difference in months
                output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
                // adjust by taking difference in days, average number of days
                // and dst in the given months.
                output += ((this - moment(this).startOf('month')) -
                        (that - moment(that).startOf('month'))) / diff;
                // same as above but with zones, to negate all dst
                output -= ((this.zone() - moment(this).startOf('month').zone()) -
                        (that.zone() - moment(that).startOf('month').zone())) * 6e4 / diff;
                if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = (this - that);
                output = units === 'second' ? diff / 1e3 : // 1000
                    units === 'minute' ? diff / 6e4 : // 1000 * 60
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                    units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                    diff;
            }
            return asFloat ? output : absRound(output);
        },

        from : function (time, withoutSuffix) {
            return moment.duration(this.diff(time)).lang(this.lang()._abbr).humanize(!withoutSuffix);
        },

        fromNow : function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },

        calendar : function () {
            // We want to compare the start of today, vs this.
            // Getting start-of-today depends on whether we're zone'd or not.
            var sod = makeAs(moment(), this).startOf('day'),
                diff = this.diff(sod, 'days', true),
                format = diff < -6 ? 'sameElse' :
                    diff < -1 ? 'lastWeek' :
                    diff < 0 ? 'lastDay' :
                    diff < 1 ? 'sameDay' :
                    diff < 2 ? 'nextDay' :
                    diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.lang().calendar(format, this));
        },

        isLeapYear : function () {
            return isLeapYear(this.year());
        },

        isDST : function () {
            return (this.zone() < this.clone().month(0).zone() ||
                this.zone() < this.clone().month(5).zone());
        },

        day : function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.lang());
                return this.add({ d : input - day });
            } else {
                return day;
            }
        },

        month : makeAccessor('Month', true),

        startOf: function (units) {
            units = normalizeUnits(units);
            // the following switch intentionally omits break keywords
            // to utilize falling through the cases.
            switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
                /* falls through */
            }

            // weeks are a special case
            if (units === 'week') {
                this.weekday(0);
            } else if (units === 'isoWeek') {
                this.isoWeekday(1);
            }

            // quarters are also special
            if (units === 'quarter') {
                this.month(Math.floor(this.month() / 3) * 3);
            }

            return this;
        },

        endOf: function (units) {
            units = normalizeUnits(units);
            return this.startOf(units).add((units === 'isoWeek' ? 'week' : units), 1).subtract('ms', 1);
        },

        isAfter: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) > +moment(input).startOf(units);
        },

        isBefore: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) < +moment(input).startOf(units);
        },

        isSame: function (input, units) {
            units = units || 'ms';
            return +this.clone().startOf(units) === +makeAs(input, this).startOf(units);
        },

        min: function (other) {
            other = moment.apply(null, arguments);
            return other < this ? this : other;
        },

        max: function (other) {
            other = moment.apply(null, arguments);
            return other > this ? this : other;
        },

        // keepTime = true means only change the timezone, without affecting
        // the local hour. So 5:31:26 +0300 --[zone(2, true)]--> 5:31:26 +0200
        // It is possible that 5:31:26 doesn't exist int zone +0200, so we
        // adjust the time as needed, to be valid.
        //
        // Keeping the time actually adds/subtracts (one hour)
        // from the actual represented time. That is why we call updateOffset
        // a second time. In case it wants us to change the offset again
        // _changeInProgress == true case, then we have to adjust, because
        // there is no such time in the given timezone.
        zone : function (input, keepTime) {
            var offset = this._offset || 0;
            if (input != null) {
                if (typeof input === "string") {
                    input = timezoneMinutesFromString(input);
                }
                if (Math.abs(input) < 16) {
                    input = input * 60;
                }
                this._offset = input;
                this._isUTC = true;
                if (offset !== input) {
                    if (!keepTime || this._changeInProgress) {
                        addOrSubtractDurationFromMoment(this,
                                moment.duration(offset - input, 'm'), 1, false);
                    } else if (!this._changeInProgress) {
                        this._changeInProgress = true;
                        moment.updateOffset(this, true);
                        this._changeInProgress = null;
                    }
                }
            } else {
                return this._isUTC ? offset : this._d.getTimezoneOffset();
            }
            return this;
        },

        zoneAbbr : function () {
            return this._isUTC ? "UTC" : "";
        },

        zoneName : function () {
            return this._isUTC ? "Coordinated Universal Time" : "";
        },

        parseZone : function () {
            if (this._tzm) {
                this.zone(this._tzm);
            } else if (typeof this._i === 'string') {
                this.zone(this._i);
            }
            return this;
        },

        hasAlignedHourOffset : function (input) {
            if (!input) {
                input = 0;
            }
            else {
                input = moment(input).zone();
            }

            return (this.zone() - input) % 60 === 0;
        },

        daysInMonth : function () {
            return daysInMonth(this.year(), this.month());
        },

        dayOfYear : function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add("d", (input - dayOfYear));
        },

        quarter : function (input) {
            return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
        },

        weekYear : function (input) {
            var year = weekOfYear(this, this.lang()._week.dow, this.lang()._week.doy).year;
            return input == null ? year : this.add("y", (input - year));
        },

        isoWeekYear : function (input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add("y", (input - year));
        },

        week : function (input) {
            var week = this.lang().week(this);
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        isoWeek : function (input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        weekday : function (input) {
            var weekday = (this.day() + 7 - this.lang()._week.dow) % 7;
            return input == null ? weekday : this.add("d", input - weekday);
        },

        isoWeekday : function (input) {
            // behaves the same as moment#day except
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
            // as a setter, sunday should belong to the previous week.
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        },

        isoWeeksInYear : function () {
            return weeksInYear(this.year(), 1, 4);
        },

        weeksInYear : function () {
            var weekInfo = this._lang._week;
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units]();
        },

        set : function (units, value) {
            units = normalizeUnits(units);
            if (typeof this[units] === 'function') {
                this[units](value);
            }
            return this;
        },

        // If passed a language key, it will set the language for this
        // instance.  Otherwise, it will return the language configuration
        // variables for this instance.
        lang : function (key) {
            if (key === undefined) {
                return this._lang;
            } else {
                this._lang = getLangDefinition(key);
                return this;
            }
        }
    });

    function rawMonthSetter(mom, value) {
        var dayOfMonth;

        // TODO: Move this out of here!
        if (typeof value === 'string') {
            value = mom.lang().monthsParse(value);
            // TODO: Another silent failure?
            if (typeof value !== 'number') {
                return mom;
            }
        }

        dayOfMonth = Math.min(mom.date(),
                daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function rawGetter(mom, unit) {
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
    }

    function rawSetter(mom, unit, value) {
        if (unit === 'Month') {
            return rawMonthSetter(mom, value);
        } else {
            return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    function makeAccessor(unit, keepTime) {
        return function (value) {
            if (value != null) {
                rawSetter(this, unit, value);
                moment.updateOffset(this, keepTime);
                return this;
            } else {
                return rawGetter(this, unit);
            }
        };
    }

    moment.fn.millisecond = moment.fn.milliseconds = makeAccessor('Milliseconds', false);
    moment.fn.second = moment.fn.seconds = makeAccessor('Seconds', false);
    moment.fn.minute = moment.fn.minutes = makeAccessor('Minutes', false);
    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    moment.fn.hour = moment.fn.hours = makeAccessor('Hours', true);
    // moment.fn.month is defined separately
    moment.fn.date = makeAccessor('Date', true);
    moment.fn.dates = deprecate("dates accessor is deprecated. Use date instead.", makeAccessor('Date', true));
    moment.fn.year = makeAccessor('FullYear', true);
    moment.fn.years = deprecate("years accessor is deprecated. Use year instead.", makeAccessor('FullYear', true));

    // add plural methods
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;
    moment.fn.quarters = moment.fn.quarter;

    // add aliased format methods
    moment.fn.toJSON = moment.fn.toISOString;

    /************************************
        Duration Prototype
    ************************************/


    extend(moment.duration.fn = Duration.prototype, {

        _bubble : function () {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds, minutes, hours, years;

            // The following code bubbles up values, see the tests for
            // examples of what that means.
            data.milliseconds = milliseconds % 1000;

            seconds = absRound(milliseconds / 1000);
            data.seconds = seconds % 60;

            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;

            hours = absRound(minutes / 60);
            data.hours = hours % 24;

            days += absRound(hours / 24);
            data.days = days % 30;

            months += absRound(days / 30);
            data.months = months % 12;

            years = absRound(months / 12);
            data.years = years;
        },

        weeks : function () {
            return absRound(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              toInt(this._months / 12) * 31536e6;
        },

        humanize : function (withSuffix) {
            var difference = +this,
                output = relativeTime(difference, !withSuffix, this.lang());

            if (withSuffix) {
                output = this.lang().pastFuture(difference, output);
            }

            return this.lang().postformat(output);
        },

        add : function (input, val) {
            // supports only 2.0-style add(1, 's') or add(moment)
            var dur = moment.duration(input, val);

            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;

            this._bubble();

            return this;
        },

        subtract : function (input, val) {
            var dur = moment.duration(input, val);

            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;

            this._bubble();

            return this;
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + 's']();
        },

        as : function (units) {
            units = normalizeUnits(units);
            return this['as' + units.charAt(0).toUpperCase() + units.slice(1) + 's']();
        },

        lang : moment.fn.lang,

        toIsoString : function () {
            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
            var years = Math.abs(this.years()),
                months = Math.abs(this.months()),
                days = Math.abs(this.days()),
                hours = Math.abs(this.hours()),
                minutes = Math.abs(this.minutes()),
                seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);

            if (!this.asSeconds()) {
                // this is the same as C#'s (Noda) and python (isodate)...
                // but not other JS (goog.date)
                return 'P0D';
            }

            return (this.asSeconds() < 0 ? '-' : '') +
                'P' +
                (years ? years + 'Y' : '') +
                (months ? months + 'M' : '') +
                (days ? days + 'D' : '') +
                ((hours || minutes || seconds) ? 'T' : '') +
                (hours ? hours + 'H' : '') +
                (minutes ? minutes + 'M' : '') +
                (seconds ? seconds + 'S' : '');
        }
    });

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    function makeDurationAsGetter(name, factor) {
        moment.duration.fn['as' + name] = function () {
            return +this / factor;
        };
    }

    for (i in unitMillisecondFactors) {
        if (unitMillisecondFactors.hasOwnProperty(i)) {
            makeDurationAsGetter(i, unitMillisecondFactors[i]);
            makeDurationGetter(i.toLowerCase());
        }
    }

    makeDurationAsGetter('Weeks', 6048e5);
    moment.duration.fn.asMonths = function () {
        return (+this - this.years() * 31536e6) / 2592e6 + this.years() * 12;
    };


    /************************************
        Default Lang
    ************************************/


    // Set default language, other languages will inherit from English.
    moment.lang('en', {
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    /* EMBED_LANGUAGES */

    /************************************
        Exposing Moment
    ************************************/

    function makeGlobal(shouldDeprecate) {
        /*global ender:false */
        if (typeof ender !== 'undefined') {
            return;
        }
        oldGlobalMoment = globalScope.moment;
        if (shouldDeprecate) {
            globalScope.moment = deprecate(
                    "Accessing Moment through the global scope is " +
                    "deprecated, and will be removed in an upcoming " +
                    "release.",
                    moment);
        } else {
            globalScope.moment = moment;
        }
    }

    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
    } else if (typeof define === "function" && define.amd) {
        define("moment", function (require, exports, module) {
            if (module.config && module.config() && module.config().noGlobal === true) {
                // release the global variable
                globalScope.moment = oldGlobalMoment;
            }

            return moment;
        });
        makeGlobal(true);
    } else {
        makeGlobal();
    }
}).call(this);

},{}],5:[function(require,module,exports){
/**
 * Copyright 2012 Craig Campbell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Mousetrap is a simple keyboard shortcut library for Javascript with
 * no external dependencies
 *
 * @version 1.1.2
 * @url craig.is/killing/mice
 */

  /**
   * mapping of special keycodes to their corresponding keys
   *
   * everything in this dictionary cannot use keypress events
   * so it has to be here to map to the correct keycodes for
   * keyup/keydown events
   *
   * @type {Object}
   */
  var _MAP = {
          8: 'backspace',
          9: 'tab',
          13: 'enter',
          16: 'shift',
          17: 'ctrl',
          18: 'alt',
          20: 'capslock',
          27: 'esc',
          32: 'space',
          33: 'pageup',
          34: 'pagedown',
          35: 'end',
          36: 'home',
          37: 'left',
          38: 'up',
          39: 'right',
          40: 'down',
          45: 'ins',
          46: 'del',
          91: 'meta',
          93: 'meta',
          224: 'meta'
      },

      /**
       * mapping for special characters so they can support
       *
       * this dictionary is only used incase you want to bind a
       * keyup or keydown event to one of these keys
       *
       * @type {Object}
       */
      _KEYCODE_MAP = {
          106: '*',
          107: '+',
          109: '-',
          110: '.',
          111 : '/',
          186: ';',
          187: '=',
          188: ',',
          189: '-',
          190: '.',
          191: '/',
          192: '`',
          219: '[',
          220: '\\',
          221: ']',
          222: '\''
      },

      /**
       * this is a mapping of keys that require shift on a US keypad
       * back to the non shift equivelents
       *
       * this is so you can use keyup events with these keys
       *
       * note that this will only work reliably on US keyboards
       *
       * @type {Object}
       */
      _SHIFT_MAP = {
          '~': '`',
          '!': '1',
          '@': '2',
          '#': '3',
          '$': '4',
          '%': '5',
          '^': '6',
          '&': '7',
          '*': '8',
          '(': '9',
          ')': '0',
          '_': '-',
          '+': '=',
          ':': ';',
          '\"': '\'',
          '<': ',',
          '>': '.',
          '?': '/',
          '|': '\\'
      },

      /**
       * this is a list of special strings you can use to map
       * to modifier keys when you specify your keyboard shortcuts
       *
       * @type {Object}
       */
      _SPECIAL_ALIASES = {
          'option': 'alt',
          'command': 'meta',
          'return': 'enter',
          'escape': 'esc'
      },

      /**
       * variable to store the flipped version of _MAP from above
       * needed to check if we should use keypress or not when no action
       * is specified
       *
       * @type {Object|undefined}
       */
      _REVERSE_MAP,

      /**
       * a list of all the callbacks setup via Mousetrap.bind()
       *
       * @type {Object}
       */
      _callbacks = {},

      /**
       * direct map of string combinations to callbacks used for trigger()
       *
       * @type {Object}
       */
      _direct_map = {},

      /**
       * keeps track of what level each sequence is at since multiple
       * sequences can start out with the same sequence
       *
       * @type {Object}
       */
      _sequence_levels = {},

      /**
       * variable to store the setTimeout call
       *
       * @type {null|number}
       */
      _reset_timer,

      /**
       * temporary state where we will ignore the next keyup
       *
       * @type {boolean|string}
       */
      _ignore_next_keyup = false,

      /**
       * are we currently inside of a sequence?
       * type of action ("keyup" or "keydown" or "keypress") or false
       *
       * @type {boolean|string}
       */
      _inside_sequence = false;

  /**
   * loop through the f keys, f1 to f19 and add them to the map
   * programatically
   */
  for (var i = 1; i < 20; ++i) {
      _MAP[111 + i] = 'f' + i;
  }

  /**
   * loop through to map numbers on the numeric keypad
   */
  for (i = 0; i <= 9; ++i) {
      _MAP[i + 96] = i;
  }

  /**
   * cross browser add event method
   *
   * @param {Element|HTMLDocument} object
   * @param {string} type
   * @param {Function} callback
   * @returns void
   */
  function _addEvent(object, type, callback) {
      if (object.addEventListener) {
          return object.addEventListener(type, callback, false);
      }

      object.attachEvent('on' + type, callback);
  }

  /**
   * takes the event and returns the key character
   *
   * @param {Event} e
   * @return {string}
   */
  function _characterFromEvent(e) {

      // for keypress events we should return the character as is
      if (e.type == 'keypress') {
          return String.fromCharCode(e.which);
      }

      // for non keypress events the special maps are needed
      if (_MAP[e.which]) {
          return _MAP[e.which];
      }

      if (_KEYCODE_MAP[e.which]) {
          return _KEYCODE_MAP[e.which];
      }

      // if it is not in the special map
      return String.fromCharCode(e.which).toLowerCase();
  }

  /**
   * should we stop this event before firing off callbacks
   *
   * @param {Event} e
   * @return {boolean}
   */
  function _stop(e) {
      var element = e.target || e.srcElement,
          tag_name = element.tagName;

      // if the element has the class "mousetrap" then no need to stop
      if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
          return false;
      }

      // stop for input, select, and textarea
      return tag_name == 'INPUT' || tag_name == 'SELECT' || tag_name == 'TEXTAREA' || (element.contentEditable && element.contentEditable == 'true');
  }

  /**
   * checks if two arrays are equal
   *
   * @param {Array} modifiers1
   * @param {Array} modifiers2
   * @returns {boolean}
   */
  function _modifiersMatch(modifiers1, modifiers2) {
      return modifiers1.sort().join(',') === modifiers2.sort().join(',');
  }

  /**
   * resets all sequence counters except for the ones passed in
   *
   * @param {Object} do_not_reset
   * @returns void
   */
  function _resetSequences(do_not_reset) {
      do_not_reset = do_not_reset || {};

      var active_sequences = false,
          key;

      for (key in _sequence_levels) {
          if (do_not_reset[key]) {
              active_sequences = true;
              continue;
          }
          _sequence_levels[key] = 0;
      }

      if (!active_sequences) {
          _inside_sequence = false;
      }
  }

  /**
   * finds all callbacks that match based on the keycode, modifiers,
   * and action
   *
   * @param {string} character
   * @param {Array} modifiers
   * @param {string} action
   * @param {boolean=} remove - should we remove any matches
   * @param {string=} combination
   * @returns {Array}
   */
  function _getMatches(character, modifiers, action, remove, combination) {
      var i,
          callback,
          matches = [];

      // if there are no events related to this keycode
      if (!_callbacks[character]) {
          return [];
      }

      // if a modifier key is coming up on its own we should allow it
      if (action == 'keyup' && _isModifier(character)) {
          modifiers = [character];
      }

      // loop through all callbacks for the key that was pressed
      // and see if any of them match
      for (i = 0; i < _callbacks[character].length; ++i) {
          callback = _callbacks[character][i];

          // if this is a sequence but it is not at the right level
          // then move onto the next match
          if (callback.seq && _sequence_levels[callback.seq] != callback.level) {
              continue;
          }

          // if the action we are looking for doesn't match the action we got
          // then we should keep going
          if (action != callback.action) {
              continue;
          }

          // if this is a keypress event that means that we need to only
          // look at the character, otherwise check the modifiers as
          // well
          if (action == 'keypress' || _modifiersMatch(modifiers, callback.modifiers)) {

              // remove is used so if you change your mind and call bind a
              // second time with a new function the first one is overwritten
              if (remove && callback.combo == combination) {
                  _callbacks[character].splice(i, 1);
              }

              matches.push(callback);
          }
      }

      return matches;
  }

  /**
   * takes a key event and figures out what the modifiers are
   *
   * @param {Event} e
   * @returns {Array}
   */
  function _eventModifiers(e) {
      var modifiers = [];

      if (e.shiftKey) {
          modifiers.push('shift');
      }

      if (e.altKey) {
          modifiers.push('alt');
      }

      if (e.ctrlKey) {
          modifiers.push('ctrl');
      }

      if (e.metaKey) {
          modifiers.push('meta');
      }

      return modifiers;
  }

  /**
   * actually calls the callback function
   *
   * if your callback function returns false this will use the jquery
   * convention - prevent default and stop propogation on the event
   *
   * @param {Function} callback
   * @param {Event} e
   * @returns void
   */
  function _fireCallback(callback, e) {
      if (callback(e) === false) {
          if (e.preventDefault) {
              e.preventDefault();
          }

          if (e.stopPropagation) {
              e.stopPropagation();
          }

          e.returnValue = false;
          e.cancelBubble = true;
      }
  }

  /**
   * handles a character key event
   *
   * @param {string} character
   * @param {Event} e
   * @returns void
   */
  function _handleCharacter(character, e) {

      // if this event should not happen stop here
      if (_stop(e)) {
          return;
      }

      var callbacks = _getMatches(character, _eventModifiers(e), e.type),
          i,
          do_not_reset = {},
          processed_sequence_callback = false;

      // loop through matching callbacks for this key event
      for (i = 0; i < callbacks.length; ++i) {

          // fire for all sequence callbacks
          // this is because if for example you have multiple sequences
          // bound such as "g i" and "g t" they both need to fire the
          // callback for matching g cause otherwise you can only ever
          // match the first one
          if (callbacks[i].seq) {
              processed_sequence_callback = true;

              // keep a list of which sequences were matches for later
              do_not_reset[callbacks[i].seq] = 1;
              _fireCallback(callbacks[i].callback, e);
              continue;
          }

          // if there were no sequence matches but we are still here
          // that means this is a regular match so we should fire that
          if (!processed_sequence_callback && !_inside_sequence) {
              _fireCallback(callbacks[i].callback, e);
          }
      }

      // if you are inside of a sequence and the key you are pressing
      // is not a modifier key then we should reset all sequences
      // that were not matched by this key event
      if (e.type == _inside_sequence && !_isModifier(character)) {
          _resetSequences(do_not_reset);
      }
  }

  /**
   * handles a keydown event
   *
   * @param {Event} e
   * @returns void
   */
  function _handleKey(e) {

      // normalize e.which for key events
      // @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion
      e.which = typeof e.which == "number" ? e.which : e.keyCode;

      var character = _characterFromEvent(e);

      // no character found then stop
      if (!character) {
          return;
      }

      if (e.type == 'keyup' && _ignore_next_keyup == character) {
          _ignore_next_keyup = false;
          return;
      }

      _handleCharacter(character, e);
  }

  /**
   * determines if the keycode specified is a modifier key or not
   *
   * @param {string} key
   * @returns {boolean}
   */
  function _isModifier(key) {
      return key == 'shift' || key == 'ctrl' || key == 'alt' || key == 'meta';
  }

  /**
   * called to set a 1 second timeout on the specified sequence
   *
   * this is so after each key press in the sequence you have 1 second
   * to press the next key before you have to start over
   *
   * @returns void
   */
  function _resetSequenceTimer() {
      clearTimeout(_reset_timer);
      _reset_timer = setTimeout(_resetSequences, 1000);
  }

  /**
   * reverses the map lookup so that we can look for specific keys
   * to see what can and can't use keypress
   *
   * @return {Object}
   */
  function _getReverseMap() {
      if (!_REVERSE_MAP) {
          _REVERSE_MAP = {};
          for (var key in _MAP) {

              // pull out the numeric keypad from here cause keypress should
              // be able to detect the keys from the character
              if (key > 95 && key < 112) {
                  continue;
              }

              if (_MAP.hasOwnProperty(key)) {
                  _REVERSE_MAP[_MAP[key]] = key;
              }
          }
      }
      return _REVERSE_MAP;
  }

  /**
   * picks the best action based on the key combination
   *
   * @param {string} key - character for key
   * @param {Array} modifiers
   * @param {string=} action passed in
   */
  function _pickBestAction(key, modifiers, action) {

      // if no action was picked in we should try to pick the one
      // that we think would work best for this key
      if (!action) {
          action = _getReverseMap()[key] ? 'keydown' : 'keypress';
      }

      // modifier keys don't work as expected with keypress,
      // switch to keydown
      if (action == 'keypress' && modifiers.length) {
          action = 'keydown';
      }

      return action;
  }

  /**
   * binds a key sequence to an event
   *
   * @param {string} combo - combo specified in bind call
   * @param {Array} keys
   * @param {Function} callback
   * @param {string=} action
   * @returns void
   */
  function _bindSequence(combo, keys, callback, action) {

      // start off by adding a sequence level record for this combination
      // and setting the level to 0
      _sequence_levels[combo] = 0;

      // if there is no action pick the best one for the first key
      // in the sequence
      if (!action) {
          action = _pickBestAction(keys[0], []);
      }

      /**
       * callback to increase the sequence level for this sequence and reset
       * all other sequences that were active
       *
       * @param {Event} e
       * @returns void
       */
      var _increaseSequence = function(e) {
              _inside_sequence = action;
              ++_sequence_levels[combo];
              _resetSequenceTimer();
          },

          /**
           * wraps the specified callback inside of another function in order
           * to reset all sequence counters as soon as this sequence is done
           *
           * @param {Event} e
           * @returns void
           */
          _callbackAndReset = function(e) {
              _fireCallback(callback, e);

              // we should ignore the next key up if the action is key down
              // or keypress.  this is so if you finish a sequence and
              // release the key the final key will not trigger a keyup
              if (action !== 'keyup') {
                  _ignore_next_keyup = _characterFromEvent(e);
              }

              // weird race condition if a sequence ends with the key
              // another sequence begins with
              setTimeout(_resetSequences, 10);
          },
          i;

      // loop through keys one at a time and bind the appropriate callback
      // function.  for any key leading up to the final one it should
      // increase the sequence. after the final, it should reset all sequences
      for (i = 0; i < keys.length; ++i) {
          _bindSingle(keys[i], i < keys.length - 1 ? _increaseSequence : _callbackAndReset, action, combo, i);
      }
  }

  /**
   * binds a single keyboard combination
   *
   * @param {string} combination
   * @param {Function} callback
   * @param {string=} action
   * @param {string=} sequence_name - name of sequence if part of sequence
   * @param {number=} level - what part of the sequence the command is
   * @returns void
   */
  function _bindSingle(combination, callback, action, sequence_name, level) {

      // make sure multiple spaces in a row become a single space
      combination = combination.replace(/\s+/g, ' ');

      var sequence = combination.split(' '),
          i,
          key,
          keys,
          modifiers = [];

      // if this pattern is a sequence of keys then run through this method
      // to reprocess each pattern one key at a time
      if (sequence.length > 1) {
          return _bindSequence(combination, sequence, callback, action);
      }

      // take the keys from this pattern and figure out what the actual
      // pattern is all about
      keys = combination === '+' ? ['+'] : combination.split('+');

      for (i = 0; i < keys.length; ++i) {
          key = keys[i];

          // normalize key names
          if (_SPECIAL_ALIASES[key]) {
              key = _SPECIAL_ALIASES[key];
          }

          // if this is not a keypress event then we should
          // be smart about using shift keys
          // this will only work for US keyboards however
          if (action && action != 'keypress' && _SHIFT_MAP[key]) {
              key = _SHIFT_MAP[key];
              modifiers.push('shift');
          }

          // if this key is a modifier then add it to the list of modifiers
          if (_isModifier(key)) {
              modifiers.push(key);
          }
      }

      // depending on what the key combination is
      // we will try to pick the best event for it
      action = _pickBestAction(key, modifiers, action);

      // make sure to initialize array if this is the first time
      // a callback is added for this key
      if (!_callbacks[key]) {
          _callbacks[key] = [];
      }

      // remove an existing match if there is one
      _getMatches(key, modifiers, action, !sequence_name, combination);

      // add this call back to the array
      // if it is a sequence put it at the beginning
      // if not put it at the end
      //
      // this is important because the way these are processed expects
      // the sequence ones to come first
      _callbacks[key][sequence_name ? 'unshift' : 'push']({
          callback: callback,
          modifiers: modifiers,
          action: action,
          seq: sequence_name,
          level: level,
          combo: combination
      });
  }

  /**
   * binds multiple combinations to the same callback
   *
   * @param {Array} combinations
   * @param {Function} callback
   * @param {string|undefined} action
   * @returns void
   */
  function _bindMultiple(combinations, callback, action) {
      for (var i = 0; i < combinations.length; ++i) {
          _bindSingle(combinations[i], callback, action);
      }
  }

  // start!
  _addEvent(document, 'keypress', _handleKey);
  _addEvent(document, 'keydown', _handleKey);
  _addEvent(document, 'keyup', _handleKey);

  var mousetrap = {

      /**
       * binds an event to mousetrap
       *
       * can be a single key, a combination of keys separated with +,
       * a comma separated list of keys, an array of keys, or
       * a sequence of keys separated by spaces
       *
       * be sure to list the modifier keys first to make sure that the
       * correct key ends up getting bound (the last key in the pattern)
       *
       * @param {string|Array} keys
       * @param {Function} callback
       * @param {string=} action - 'keypress', 'keydown', or 'keyup'
       * @returns void
       */
      bind: function(keys, callback, action) {
          _bindMultiple(keys instanceof Array ? keys : [keys], callback, action);
          _direct_map[keys + ':' + action] = callback;
          return this;
      },

      /**
       * unbinds an event to mousetrap
       *
       * the unbinding sets the callback function of the specified key combo
       * to an empty function and deletes the corresponding key in the
       * _direct_map dict.
       *
       * the keycombo+action has to be exactly the same as
       * it was defined in the bind method
       *
       * TODO: actually remove this from the _callbacks dictionary instead
       * of binding an empty function
       *
       * @param {string|Array} keys
       * @param {string} action
       * @returns void
       */
      unbind: function(keys, action) {
          if (_direct_map[keys + ':' + action]) {
              delete _direct_map[keys + ':' + action];
              this.bind(keys, function() {}, action);
          }
          return this;
      },

      /**
       * triggers an event that has already been bound
       *
       * @param {string} keys
       * @param {string=} action
       * @returns void
       */
      trigger: function(keys, action) {
          _direct_map[keys + ':' + action]();
          return this;
      },

      /**
       * resets the library back to its initial state.  this is useful
       * if you want to clear out the current keyboard shortcuts and bind
       * new ones - for example if you switch to another page
       *
       * @returns void
       */
      reset: function() {
          _callbacks = {};
          _direct_map = {};
          return this;
      }
  };

module.exports = mousetrap;


},{}]},{},[1])
(1)
});
