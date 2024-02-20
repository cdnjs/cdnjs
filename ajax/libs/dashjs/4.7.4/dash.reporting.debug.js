(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dashjs"] = factory();
	else
		root["dashjs"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/core/Debug.js":
/*!***************************!*\
  !*** ./src/core/Debug.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EventBus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventBus */ "./src/core/EventBus.js");
/* harmony import */ var _events_Events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events/Events */ "./src/core/events/Events.js");
/* harmony import */ var _FactoryMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FactoryMaker */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */



var LOG_LEVEL_NONE = 0;
var LOG_LEVEL_FATAL = 1;
var LOG_LEVEL_ERROR = 2;
var LOG_LEVEL_WARNING = 3;
var LOG_LEVEL_INFO = 4;
var LOG_LEVEL_DEBUG = 5;
/**
 * @module Debug
 * @param {object} config
 * @ignore
 */

function Debug(config) {
  config = config || {};
  var context = this.context;
  var eventBus = (0,_EventBus__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance();
  var settings = config.settings;
  var logFn = [];
  var instance, showLogTimestamp, showCalleeName, startTime;

  function setup() {
    showLogTimestamp = true;
    showCalleeName = true;
    startTime = new Date().getTime();

    if (typeof window !== 'undefined' && window.console) {
      logFn[LOG_LEVEL_FATAL] = getLogFn(window.console.error);
      logFn[LOG_LEVEL_ERROR] = getLogFn(window.console.error);
      logFn[LOG_LEVEL_WARNING] = getLogFn(window.console.warn);
      logFn[LOG_LEVEL_INFO] = getLogFn(window.console.info);
      logFn[LOG_LEVEL_DEBUG] = getLogFn(window.console.debug);
    }
  }

  function getLogFn(fn) {
    if (fn && fn.bind) {
      return fn.bind(window.console);
    } // if not define, return the default function for reporting logs


    return window.console.log.bind(window.console);
  }
  /**
   * Retrieves a logger which can be used to write logging information in browser console.
   * @param {object} instance Object for which the logger is created. It is used
   * to include calle object information in log messages.
   * @memberof module:Debug
   * @returns {Logger}
   * @instance
   */


  function getLogger(instance) {
    return {
      fatal: fatal.bind(instance),
      error: error.bind(instance),
      warn: warn.bind(instance),
      info: info.bind(instance),
      debug: debug.bind(instance)
    };
  }
  /**
   * Prepends a timestamp in milliseconds to each log message.
   * @param {boolean} value Set to true if you want to see a timestamp in each log message.
   * @default LOG_LEVEL_WARNING
   * @memberof module:Debug
   * @instance
   */


  function setLogTimestampVisible(value) {
    showLogTimestamp = value;
  }
  /**
   * Prepends the callee object name, and media type if available, to each log message.
   * @param {boolean} value Set to true if you want to see the callee object name and media type in each log message.
   * @default true
   * @memberof module:Debug
   * @instance
   */


  function setCalleeNameVisible(value) {
    showCalleeName = value;
  }

  function fatal() {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    doLog.apply(void 0, [LOG_LEVEL_FATAL, this].concat(params));
  }

  function error() {
    for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      params[_key2] = arguments[_key2];
    }

    doLog.apply(void 0, [LOG_LEVEL_ERROR, this].concat(params));
  }

  function warn() {
    for (var _len3 = arguments.length, params = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      params[_key3] = arguments[_key3];
    }

    doLog.apply(void 0, [LOG_LEVEL_WARNING, this].concat(params));
  }

  function info() {
    for (var _len4 = arguments.length, params = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      params[_key4] = arguments[_key4];
    }

    doLog.apply(void 0, [LOG_LEVEL_INFO, this].concat(params));
  }

  function debug() {
    for (var _len5 = arguments.length, params = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      params[_key5] = arguments[_key5];
    }

    doLog.apply(void 0, [LOG_LEVEL_DEBUG, this].concat(params));
  }

  function doLog(level, _this) {
    var message = '';
    var logTime = null;

    if (showLogTimestamp) {
      logTime = new Date().getTime();
      message += '[' + (logTime - startTime) + ']';
    }

    if (showCalleeName && _this && _this.getClassName) {
      message += '[' + _this.getClassName() + ']';

      if (_this.getType) {
        message += '[' + _this.getType() + ']';
      }
    }

    if (message.length > 0) {
      message += ' ';
    }

    for (var _len6 = arguments.length, params = new Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
      params[_key6 - 2] = arguments[_key6];
    }

    Array.apply(null, params).forEach(function (item) {
      message += item + ' ';
    }); // log to console if the log level is high enough

    if (logFn[level] && settings && settings.get().debug.logLevel >= level) {
      logFn[level](message);
    } // send log event regardless of log level


    if (settings && settings.get().debug.dispatchEvent) {
      eventBus.trigger(_events_Events__WEBPACK_IMPORTED_MODULE_1__["default"].LOG, {
        message: message,
        level: level
      });
    }
  }

  instance = {
    getLogger: getLogger,
    setLogTimestampVisible: setLogTimestampVisible,
    setCalleeNameVisible: setCalleeNameVisible
  };
  setup();
  return instance;
}

Debug.__dashjs_factory_name = 'Debug';
var factory = _FactoryMaker__WEBPACK_IMPORTED_MODULE_2__["default"].getSingletonFactory(Debug);
factory.LOG_LEVEL_NONE = LOG_LEVEL_NONE;
factory.LOG_LEVEL_FATAL = LOG_LEVEL_FATAL;
factory.LOG_LEVEL_ERROR = LOG_LEVEL_ERROR;
factory.LOG_LEVEL_WARNING = LOG_LEVEL_WARNING;
factory.LOG_LEVEL_INFO = LOG_LEVEL_INFO;
factory.LOG_LEVEL_DEBUG = LOG_LEVEL_DEBUG;
_FactoryMaker__WEBPACK_IMPORTED_MODULE_2__["default"].updateSingletonFactory(Debug.__dashjs_factory_name, factory);
/* harmony default export */ __webpack_exports__["default"] = (factory);

/***/ }),

/***/ "./src/core/EventBus.js":
/*!******************************!*\
  !*** ./src/core/EventBus.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FactoryMaker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FactoryMaker */ "./src/core/FactoryMaker.js");
/* harmony import */ var _streaming_MediaPlayerEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../streaming/MediaPlayerEvents */ "./src/streaming/MediaPlayerEvents.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */


var EVENT_PRIORITY_LOW = 0;
var EVENT_PRIORITY_HIGH = 5000;

function EventBus() {
  var handlers = {};

  function on(type, listener, scope) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    if (!type) {
      throw new Error('event type cannot be null or undefined');
    }

    if (!listener || typeof listener !== 'function') {
      throw new Error('listener must be a function: ' + listener);
    }

    var priority = options.priority || EVENT_PRIORITY_LOW;
    if (getHandlerIdx(type, listener, scope) >= 0) return;
    handlers[type] = handlers[type] || [];
    var handler = {
      callback: listener,
      scope: scope,
      priority: priority
    };

    if (scope && scope.getStreamId) {
      handler.streamId = scope.getStreamId();
    }

    if (scope && scope.getType) {
      handler.mediaType = scope.getType();
    }

    if (options && options.mode) {
      handler.mode = options.mode;
    }

    var inserted = handlers[type].some(function (item, idx) {
      if (item && priority > item.priority) {
        handlers[type].splice(idx, 0, handler);
        return true;
      }
    });

    if (!inserted) {
      handlers[type].push(handler);
    }
  }

  function off(type, listener, scope) {
    if (!type || !listener || !handlers[type]) return;
    var idx = getHandlerIdx(type, listener, scope);
    if (idx < 0) return;
    handlers[type][idx] = null;
  }

  function trigger(type) {
    var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var filters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (!type || !handlers[type]) return;
    payload = payload || {};
    if (payload.hasOwnProperty('type')) throw new Error('\'type\' is a reserved word for event dispatching');
    payload.type = type;

    if (filters.streamId) {
      payload.streamId = filters.streamId;
    }

    if (filters.mediaType) {
      payload.mediaType = filters.mediaType;
    }

    handlers[type].filter(function (handler) {
      if (!handler) {
        return false;
      }

      if (filters.streamId && handler.streamId && handler.streamId !== filters.streamId) {
        return false;
      }

      if (filters.mediaType && handler.mediaType && handler.mediaType !== filters.mediaType) {
        return false;
      } // This is used for dispatching DASH events. By default we use the onStart mode. Consequently we filter everything that has a non matching mode and the onReceive events for handlers that did not specify a mode.


      if (filters.mode && handler.mode && handler.mode !== filters.mode || !handler.mode && filters.mode && filters.mode === _streaming_MediaPlayerEvents__WEBPACK_IMPORTED_MODULE_1__["default"].EVENT_MODE_ON_RECEIVE) {
        return false;
      }

      return true;
    }).forEach(function (handler) {
      return handler && handler.callback.call(handler.scope, payload);
    });
  }

  function getHandlerIdx(type, listener, scope) {
    var idx = -1;
    if (!handlers[type]) return idx;
    handlers[type].some(function (item, index) {
      if (item && item.callback === listener && (!scope || scope === item.scope)) {
        idx = index;
        return true;
      }
    });
    return idx;
  }

  function reset() {
    handlers = {};
  }

  var instance = {
    on: on,
    off: off,
    trigger: trigger,
    reset: reset
  };
  return instance;
}

EventBus.__dashjs_factory_name = 'EventBus';
var factory = _FactoryMaker__WEBPACK_IMPORTED_MODULE_0__["default"].getSingletonFactory(EventBus);
factory.EVENT_PRIORITY_LOW = EVENT_PRIORITY_LOW;
factory.EVENT_PRIORITY_HIGH = EVENT_PRIORITY_HIGH;
_FactoryMaker__WEBPACK_IMPORTED_MODULE_0__["default"].updateSingletonFactory(EventBus.__dashjs_factory_name, factory);
/* harmony default export */ __webpack_exports__["default"] = (factory);

/***/ }),

/***/ "./src/core/FactoryMaker.js":
/*!**********************************!*\
  !*** ./src/core/FactoryMaker.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @module FactoryMaker
 * @ignore
 */
var FactoryMaker = function () {
  var instance;
  var singletonContexts = [];
  var singletonFactories = {};
  var classFactories = {};

  function extend(name, childInstance, override, context) {
    if (!context[name] && childInstance) {
      context[name] = {
        instance: childInstance,
        override: override
      };
    }
  }
  /**
   * Use this method from your extended object.  this.factory is injected into your object.
   * this.factory.getSingletonInstance(this.context, 'VideoModel')
   * will return the video model for use in the extended object.
   *
   * @param {Object} context - injected into extended object as this.context
   * @param {string} className - string name found in all dash.js objects
   * with name __dashjs_factory_name Will be at the bottom. Will be the same as the object's name.
   * @returns {*} Context aware instance of specified singleton name.
   * @memberof module:FactoryMaker
   * @instance
   */


  function getSingletonInstance(context, className) {
    for (var i in singletonContexts) {
      var obj = singletonContexts[i];

      if (obj.context === context && obj.name === className) {
        return obj.instance;
      }
    }

    return null;
  }
  /**
   * Use this method to add an singleton instance to the system.  Useful for unit testing to mock objects etc.
   *
   * @param {Object} context
   * @param {string} className
   * @param {Object} instance
   * @memberof module:FactoryMaker
   * @instance
   */


  function setSingletonInstance(context, className, instance) {
    for (var i in singletonContexts) {
      var obj = singletonContexts[i];

      if (obj.context === context && obj.name === className) {
        singletonContexts[i].instance = instance;
        return;
      }
    }

    singletonContexts.push({
      name: className,
      context: context,
      instance: instance
    });
  }
  /**
   * Use this method to remove all singleton instances associated with a particular context.
   *
   * @param {Object} context
   * @memberof module:FactoryMaker
   * @instance
   */


  function deleteSingletonInstances(context) {
    singletonContexts = singletonContexts.filter(function (x) {
      return x.context !== context;
    });
  }
  /*------------------------------------------------------------------------------------------*/
  // Factories storage Management

  /*------------------------------------------------------------------------------------------*/


  function getFactoryByName(name, factoriesArray) {
    return factoriesArray[name];
  }

  function updateFactory(name, factory, factoriesArray) {
    if (name in factoriesArray) {
      factoriesArray[name] = factory;
    }
  }
  /*------------------------------------------------------------------------------------------*/
  // Class Factories Management

  /*------------------------------------------------------------------------------------------*/


  function updateClassFactory(name, factory) {
    updateFactory(name, factory, classFactories);
  }

  function getClassFactoryByName(name) {
    return getFactoryByName(name, classFactories);
  }

  function getClassFactory(classConstructor) {
    var factory = getFactoryByName(classConstructor.__dashjs_factory_name, classFactories);

    if (!factory) {
      factory = function factory(context) {
        if (context === undefined) {
          context = {};
        }

        return {
          create: function create() {
            return merge(classConstructor, context, arguments);
          }
        };
      };

      classFactories[classConstructor.__dashjs_factory_name] = factory; // store factory
    }

    return factory;
  }
  /*------------------------------------------------------------------------------------------*/
  // Singleton Factory MAangement

  /*------------------------------------------------------------------------------------------*/


  function updateSingletonFactory(name, factory) {
    updateFactory(name, factory, singletonFactories);
  }

  function getSingletonFactoryByName(name) {
    return getFactoryByName(name, singletonFactories);
  }

  function getSingletonFactory(classConstructor) {
    var factory = getFactoryByName(classConstructor.__dashjs_factory_name, singletonFactories);

    if (!factory) {
      factory = function factory(context) {
        var instance;

        if (context === undefined) {
          context = {};
        }

        return {
          getInstance: function getInstance() {
            // If we don't have an instance yet check for one on the context
            if (!instance) {
              instance = getSingletonInstance(context, classConstructor.__dashjs_factory_name);
            } // If there's no instance on the context then create one


            if (!instance) {
              instance = merge(classConstructor, context, arguments);
              singletonContexts.push({
                name: classConstructor.__dashjs_factory_name,
                context: context,
                instance: instance
              });
            }

            return instance;
          }
        };
      };

      singletonFactories[classConstructor.__dashjs_factory_name] = factory; // store factory
    }

    return factory;
  }

  function merge(classConstructor, context, args) {
    var classInstance;
    var className = classConstructor.__dashjs_factory_name;
    var extensionObject = context[className];

    if (extensionObject) {
      var extension = extensionObject.instance;

      if (extensionObject.override) {
        //Override public methods in parent but keep parent.
        classInstance = classConstructor.apply({
          context: context
        }, args);
        extension = extension.apply({
          context: context,
          factory: instance,
          parent: classInstance
        }, args);

        for (var prop in extension) {
          if (classInstance.hasOwnProperty(prop)) {
            classInstance[prop] = extension[prop];
          }
        }
      } else {
        //replace parent object completely with new object. Same as dijon.
        return extension.apply({
          context: context,
          factory: instance
        }, args);
      }
    } else {
      // Create new instance of the class
      classInstance = classConstructor.apply({
        context: context
      }, args);
    } // Add getClassName function to class instance prototype (used by Debug)


    classInstance.getClassName = function () {
      return className;
    };

    return classInstance;
  }

  instance = {
    extend: extend,
    getSingletonInstance: getSingletonInstance,
    setSingletonInstance: setSingletonInstance,
    deleteSingletonInstances: deleteSingletonInstances,
    getSingletonFactory: getSingletonFactory,
    getSingletonFactoryByName: getSingletonFactoryByName,
    updateSingletonFactory: updateSingletonFactory,
    getClassFactory: getClassFactory,
    getClassFactoryByName: getClassFactoryByName,
    updateClassFactory: updateClassFactory
  };
  return instance;
}();

/* harmony default export */ __webpack_exports__["default"] = (FactoryMaker);

/***/ }),

/***/ "./src/core/Settings.js":
/*!******************************!*\
  !*** ./src/core/Settings.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FactoryMaker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FactoryMaker */ "./src/core/FactoryMaker.js");
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils.js */ "./src/core/Utils.js");
/* harmony import */ var _core_Debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Debug */ "./src/core/Debug.js");
/* harmony import */ var _streaming_constants_Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../streaming/constants/Constants */ "./src/streaming/constants/Constants.js");
/* harmony import */ var _streaming_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../streaming/vo/metrics/HTTPRequest */ "./src/streaming/vo/metrics/HTTPRequest.js");
/* harmony import */ var _EventBus__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EventBus */ "./src/core/EventBus.js");
/* harmony import */ var _events_Events__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./events/Events */ "./src/core/events/Events.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */







/** @module Settings
 * @description Define the configuration parameters of Dash.js MediaPlayer.
 * @see {@link module:Settings~PlayerSettings PlayerSettings} for further information about the supported configuration properties.
 */

/**
 * @typedef {Object} PlayerSettings
 * @property {module:Settings~DebugSettings} [debug]
 * Debug related settings.
 * @property {module:Settings~ErrorSettings} [errors]
 * Error related settings
 * @property {module:Settings~StreamingSettings} [streaming]
 * Streaming related settings.
 * @example
 *
 * // Full settings object
 * settings = {
 *        debug: {
 *            logLevel: Debug.LOG_LEVEL_WARNING,
 *            dispatchEvent: false
 *        },
 *        streaming: {
 *            abandonLoadTimeout: 10000,
 *            wallclockTimeUpdateInterval: 100,
 *            manifestUpdateRetryInterval: 100,
 *            liveUpdateTimeThresholdInMilliseconds: 0,
 *            cacheInitSegments: false,
 *            applyServiceDescription: true,
 *            applyProducerReferenceTime: true,
 *            applyContentSteering: true,
 *            eventControllerRefreshDelay: 100,
 *            enableManifestDurationMismatchFix: true,
 *            enableManifestTimescaleMismatchFix: false,
 *            parseInbandPrft: false,
 *            capabilities: {
 *               filterUnsupportedEssentialProperties: true,
 *               useMediaCapabilitiesApi: false
 *            },
 *            timeShiftBuffer: {
 *                calcFromSegmentTimeline: false,
 *                fallbackToSegmentTimeline: true
 *            },
 *            metrics: {
 *              maxListDepth: 100
 *            },
 *            delay: {
 *                liveDelayFragmentCount: NaN,
 *                liveDelay: NaN,
 *                useSuggestedPresentationDelay: true
 *            },
 *            protection: {
 *                keepProtectionMediaKeys: false,
 *                ignoreEmeEncryptedEvent: false,
 *                detectPlayreadyMessageFormat: true,
 *            },
 *            buffer: {
 *                enableSeekDecorrelationFix: false,
 *                fastSwitchEnabled: true,
 *                flushBufferAtTrackSwitch: false,
 *                reuseExistingSourceBuffers: true,
 *                bufferPruningInterval: 10,
 *                bufferToKeep: 20,
 *                bufferTimeAtTopQuality: 30,
 *                bufferTimeAtTopQualityLongForm: 60,
 *                initialBufferLevel: NaN,
 *                stableBufferTime: 12,
 *                longFormContentDurationThreshold: 600,
 *                stallThreshold: 0.3,
 *                useAppendWindow: true,
 *                setStallState: true,
 *                avoidCurrentTimeRangePruning: false,
 *                useChangeTypeForTrackSwitch: true,
 *                mediaSourceDurationInfinity: true,
 *                resetSourceBuffersForTrackSwitch: false
 *            },
 *            gaps: {
 *                jumpGaps: true,
 *                jumpLargeGaps: true,
 *                smallGapLimit: 1.5,
 *                threshold: 0.3,
 *                enableSeekFix: true,
 *                enableStallFix: false,
 *                stallSeek: 0.1
 *            },
 *            utcSynchronization: {
 *                enabled: true,
 *                useManifestDateHeaderTimeSource: true,
 *                backgroundAttempts: 2,
 *                timeBetweenSyncAttempts: 30,
 *                maximumTimeBetweenSyncAttempts: 600,
 *                minimumTimeBetweenSyncAttempts: 2,
 *                timeBetweenSyncAttemptsAdjustmentFactor: 2,
 *                maximumAllowedDrift: 100,
 *                enableBackgroundSyncAfterSegmentDownloadError: true,
 *                defaultTimingSource: {
 *                    scheme: 'urn:mpeg:dash:utc:http-xsdate:2014',
 *                    value: 'http://time.akamai.com/?iso&ms'
 *                }
 *            },
 *            scheduling: {
 *                defaultTimeout: 500,
 *                lowLatencyTimeout: 0,
 *                scheduleWhilePaused: true
 *            },
 *            text: {
 *                defaultEnabled: true,
 *                dispatchForManualRendering: false,
 *                extendSegmentedCues: true,
 *                imsc: {
 *                    displayForcedOnlyMode: false,
 *                    enableRollUp: true
 *                },
 *                webvtt: {
 *                    customRenderingEnabled: false
 *                }
 *            },
 *            liveCatchup: {
 *                maxDrift: NaN,
 *                playbackRate: {min: NaN, max: NaN},
 *                playbackBufferMin: 0.5,
 *                enabled: null,
 *                mode: Constants.LIVE_CATCHUP_MODE_DEFAULT
 *            },
 *            lastBitrateCachingInfo: { enabled: true, ttl: 360000 },
 *            lastMediaSettingsCachingInfo: { enabled: true, ttl: 360000 },
 *            saveLastMediaSettingsForCurrentStreamingSession: true,
 *            cacheLoadThresholds: { video: 50, audio: 5 },
 *            trackSwitchMode: {
 *                audio: Constants.TRACK_SWITCH_MODE_ALWAYS_REPLACE,
 *                video: Constants.TRACK_SWITCH_MODE_NEVER_REPLACE
 *            },
 *            selectionModeForInitialTrack: Constants.TRACK_SELECTION_MODE_HIGHEST_SELECTION_PRIORITY,
 *            fragmentRequestTimeout: 20000,
 *            fragmentRequestProgressTimeout: -1,
 *            manifestRequestTimeout: 10000,
 *            retryIntervals: {
 *                [HTTPRequest.MPD_TYPE]: 500,
 *                [HTTPRequest.XLINK_EXPANSION_TYPE]: 500,
 *                [HTTPRequest.MEDIA_SEGMENT_TYPE]: 1000,
 *                [HTTPRequest.INIT_SEGMENT_TYPE]: 1000,
 *                [HTTPRequest.BITSTREAM_SWITCHING_SEGMENT_TYPE]: 1000,
 *                [HTTPRequest.INDEX_SEGMENT_TYPE]: 1000,
 *                [HTTPRequest.MSS_FRAGMENT_INFO_SEGMENT_TYPE]: 1000,
 *                [HTTPRequest.LICENSE]: 1000,
 *                [HTTPRequest.OTHER_TYPE]: 1000,
 *                lowLatencyReductionFactor: 10
 *            },
 *            retryAttempts: {
 *                [HTTPRequest.MPD_TYPE]: 3,
 *                [HTTPRequest.XLINK_EXPANSION_TYPE]: 1,
 *                [HTTPRequest.MEDIA_SEGMENT_TYPE]: 3,
 *                [HTTPRequest.INIT_SEGMENT_TYPE]: 3,
 *                [HTTPRequest.BITSTREAM_SWITCHING_SEGMENT_TYPE]: 3,
 *                [HTTPRequest.INDEX_SEGMENT_TYPE]: 3,
 *                [HTTPRequest.MSS_FRAGMENT_INFO_SEGMENT_TYPE]: 3,
 *                [HTTPRequest.LICENSE]: 3,
 *                [HTTPRequest.OTHER_TYPE]: 3,
 *                lowLatencyMultiplyFactor: 5
 *            },
 *            abr: {
 *                movingAverageMethod: Constants.MOVING_AVERAGE_SLIDING_WINDOW,
 *                ABRStrategy: Constants.ABR_STRATEGY_DYNAMIC,
 *                additionalAbrRules: {
 *                   insufficientBufferRule: true,
 *                   switchHistoryRule: true,
 *                   droppedFramesRule: true,
 *                   abandonRequestsRule: true
 *                },
 *                abrRulesParameters: {
 *                     abandonRequestsRule: {
 *                         graceTimeThreshold: 500,
 *                         abandonMultiplier: 1.8,
 *                         minLengthToAverage: 5
 *                     }
 *                 },
 *                bandwidthSafetyFactor: 0.9,
 *                useDefaultABRRules: true,
 *                useDeadTimeLatency: true,
 *                limitBitrateByPortal: false,
 *                usePixelRatioInLimitBitrateByPortal: false,
 *                maxBitrate: { audio: -1, video: -1 },
 *                minBitrate: { audio: -1, video: -1 },
 *                maxRepresentationRatio: { audio: 1, video: 1 },
 *                initialBitrate: { audio: -1, video: -1 },
 *                initialRepresentationRatio: { audio: -1, video: -1 },
 *                autoSwitchBitrate: { audio: true, video: true },
 *                fetchThroughputCalculationMode: Constants.ABR_FETCH_THROUGHPUT_CALCULATION_DOWNLOADED_DATA
 *            },
 *            cmcd: {
 *                enabled: false,
 *                sid: null,
 *                cid: null,
 *                rtp: null,
 *                rtpSafetyFactor: 5,
 *                mode: Constants.CMCD_MODE_QUERY,
 *                enabledKeys: ['br', 'd', 'ot', 'tb' , 'bl', 'dl', 'mtp', 'nor', 'nrr', 'su' , 'bs', 'rtp' , 'cid', 'pr', 'sf', 'sid', 'st', 'v']
 *            },
 *            cmsd: {
 *                enabled: false,
 *                abr: {
 *                    applyMb: false,
 *                    etpWeightRatio: 0
 *                }
 *           }
 *          },
 *          errors: {
 *            recoverAttempts: {
 *                mediaErrorDecode: 5
 *             }
 *          }
 * }
 */

/**
 * @typedef {Object} TimeShiftBuffer
 * @property {boolean} [calcFromSegmentTimeline=false]
 * Enable calculation of the DVR window for SegmentTimeline manifests based on the entries in \<SegmentTimeline\>.
 *  * @property {boolean} [fallbackToSegmentTimeline=true]
 * In case the MPD uses \<SegmentTimeline\ and no segment is found within the DVR window the DVR window is calculated based on the entries in \<SegmentTimeline\>.
 */

/**
 * @typedef {Object} LiveDelay
 * @property {number} [liveDelayFragmentCount=NaN]
 * Changing this value will lower or increase live stream latency.
 *
 * The detected segment duration will be multiplied by this value to define a time in seconds to delay a live stream from the live edge.
 *
 * Lowering this value will lower latency but may decrease the player's ability to build a stable buffer.
 * @property {number} [liveDelay=NaN]
 * Equivalent in seconds of setLiveDelayFragmentCount.
 *
 * Lowering this value will lower latency but may decrease the player's ability to build a stable buffer.
 *
 * This value should be less than the manifest duration by a couple of segment durations to avoid playback issues.
 *
 * If set, this parameter will take precedence over setLiveDelayFragmentCount and manifest info.
 * @property {boolean} [useSuggestedPresentationDelay=true]
 * Set to true if you would like to overwrite the default live delay and honor the SuggestedPresentationDelay attribute in by the manifest.
 */

/**
 * @typedef {Object} Buffer
 * @property {boolean} [enableSeekDecorrelationFix=false]
 * Enables a workaround for playback start on some devices, e.g. WebOS 4.9.
 * It is necessary because some browsers do not support setting currentTime on video element to a value that is outside of current buffer.
 *
 * If you experience unexpected seeking triggered by BufferController, you can try setting this value to false.

 * @property {boolean} [fastSwitchEnabled=true]
 * When enabled, after an ABR up-switch in quality, instead of requesting and appending the next fragment at the end of the current buffer range it is requested and appended closer to the current time.
 *
 * When enabled, The maximum time to render a higher quality is current time + (1.5 * fragment duration).
 *
 * Note, When ABR down-switch is detected, we appended the lower quality at the end of the buffer range to preserve the
 * higher quality media for as long as possible.
 *
 * If enabled, it should be noted there are a few cases when the client will not replace inside buffer range but rather just append at the end.
 * 1. When the buffer level is less than one fragment duration.
 * 2. The client is in an Abandonment State due to recent fragment abandonment event.
 *
 * Known issues:
 * 1. In IE11 with auto switching off, if a user switches to a quality they can not download in time the fragment may be appended in the same range as the playhead or even in the past, in IE11 it may cause a stutter or stall in playback.
 * @property {boolean} [flushBufferAtTrackSwitch=false]
 * When enabled, after a track switch and in case buffer is being replaced, the video element is flushed (seek at current playback time) once a segment of the new track is appended in buffer in order to force video decoder to play new track.
 *
 * This can be required on some devices like GoogleCast devices to make track switching functional.
 *
 * Otherwise track switching will be effective only once after previous buffered track is fully consumed.
 * @property {boolean} [reuseExistingSourceBuffers=true]
 * Enable reuse of existing MediaSource Sourcebuffers during period transition.
 * @property {number} [bufferPruningInterval=10]
 * The interval of pruning buffer in seconds.
 * @property {number} [bufferToKeep=20]
 * This value influences the buffer pruning logic.
 *
 * Allows you to modify the buffer that is kept in source buffer in seconds.
 * 0|-----------bufferToPrune-----------|-----bufferToKeep-----|currentTime|
 * @property {number} [bufferTimeAtTopQuality=30]
 * The time that the internal buffer target will be set to once playing the top quality.
 *
 * If there are multiple bitrates in your adaptation, and the media is playing at the highest bitrate, then we try to build a larger buffer at the top quality to increase stability and to maintain media quality.
 * @property {number} [bufferTimeAtTopQualityLongForm=60]
 * The time that the internal buffer target will be set to once playing the top quality for long form content.
 * @property {number} [longFormContentDurationThreshold=600]
 * The threshold which defines if the media is considered long form content.
 *
 * This will directly affect the buffer targets when playing back at the top quality.
 * @property {number} [initialBufferLevel=NaN]
 * Initial buffer level before playback starts
 * @property {number} [stableBufferTime=12]
 * The time that the internal buffer target will be set to post startup/seeks (NOT top quality).
 *
 * When the time is set higher than the default you will have to wait longer to see automatic bitrate switches but will have a larger buffer which will increase stability.
 * @property {number} [stallThreshold=0.3]
 * Stall threshold used in BufferController.js to determine whether a track should still be changed and which buffer range to prune.
 * @property {boolean} [useAppendWindow=true]
 * Specifies if the appendWindow attributes of the MSE SourceBuffers should be set according to content duration from manifest.
 * @property {boolean} [setStallState=true]
 * Specifies if we fire manual waiting events once the stall threshold is reached
 * @property {boolean} [avoidCurrentTimeRangePruning=false]
 * Avoids pruning of the buffered range that contains the current playback time.
 *
 * That buffered range is likely to have been enqueued for playback. Pruning it causes a flush and reenqueue in WPE and WebKitGTK based browsers. This stresses the video decoder and can cause stuttering on embedded platforms.
 * @property {boolean} [useChangeTypeForTrackSwitch=true]
 * If this flag is set to true then dash.js will use the MSE v.2 API call "changeType()" before switching to a different track.
 * Note that some platforms might not implement the changeType functio. dash.js is checking for the availability before trying to call it.
 * @property {boolean} [mediaSourceDurationInfinity=true]
 * If this flag is set to true then dash.js will allow `Infinity` to be set as the MediaSource duration otherwise the duration will be set to `Math.pow(2,32)` instead of `Infinity` to allow appending segments indefinitely.
 * Some platforms such as WebOS 4.x have issues with seeking when duration is set to `Infinity`, setting this flag to false resolve this.
 * @property {boolean} [resetSourceBuffersForTrackSwitch=false]
 * When switching to a track that is not compatible with the currently active MSE SourceBuffers, MSE will be reset. This happens when we switch codecs on a system
 * that does not properly implement "changeType()", such as webOS 4.0 and before.
 */

/**
 * @typedef {Object} module:Settings~AudioVideoSettings
 * @property {number|boolean|string} [audio]
 * Configuration for audio media type of tracks.
 * @property {number|boolean|string} [video]
 * Configuration for video media type of tracks.
 */

/**
 * @typedef {Object} DebugSettings
 * @property {number} [logLevel=dashjs.Debug.LOG_LEVEL_WARNING]
 * Sets up the log level. The levels are cumulative.
 *
 * For example, if you set the log level to dashjs.Debug.LOG_LEVEL_WARNING all warnings, errors and fatals will be logged.
 *
 * Possible values.
 *
 * - dashjs.Debug.LOG_LEVEL_NONE
 * No message is written in the browser console.
 *
 * - dashjs.Debug.LOG_LEVEL_FATAL
 * Log fatal errors.
 * An error is considered fatal when it causes playback to fail completely.
 *
 * - dashjs.Debug.LOG_LEVEL_ERROR
 * Log error messages.
 *
 * - dashjs.Debug.LOG_LEVEL_WARNING
 * Log warning messages.
 *
 * - dashjs.Debug.LOG_LEVEL_INFO
 * Log info messages.
 *
 * - dashjs.Debug.LOG_LEVEL_DEBUG
 * Log debug messages.
 * @property {boolean} [dispatchEvent=false]
 * Enable to trigger a Events.LOG event whenever log output is generated.
 *
 * Note this will be dispatched regardless of log level.
 */

/**
 * @typedef {Object} module:Settings~ErrorSettings
 * @property {object} [recoverAttempts={mediaErrorDecode: 5}]
 * Defines the maximum number of recover attempts for specific media errors.
 *
 * For mediaErrorDecode the player will reset the MSE and skip the blacklisted segment that caused the decode error. The resulting gap will be handled by the GapController.
 */

/**
 * @typedef {Object} CachingInfoSettings
 * @property {boolean} [enable]
 * Enable or disable the caching feature.
 * @property {number} [ttl]
 * Time to live.
 *
 * A value defined in milliseconds representing how log to cache the settings for.
 */

/**
 * @typedef {Object} Gaps
 * @property {boolean} [jumpGaps=true]
 * Sets whether player should jump small gaps (discontinuities) in the buffer.
 * @property {boolean} [jumpLargeGaps=true]
 * Sets whether player should jump large gaps (discontinuities) in the buffer.
 * @property {number} [smallGapLimit=1.5]
 * Time in seconds for a gap to be considered small.
 * @property {number} [threshold=0.3]
 * Threshold at which the gap handling is executed. If currentRangeEnd - currentTime < threshold the gap jump will be triggered.
 * For live stream the jump might be delayed to keep a consistent live edge.
 * Note that the amount of buffer at which platforms automatically stall might differ.
 * @property {boolean} [enableSeekFix=true]
 * Enables the adjustment of the seek target once no valid segment request could be generated for a specific seek time. This can happen if the user seeks to a position for which there is a gap in the timeline.
 * @property {boolean} [enableStallFix=false]
 * If playback stalled in a buffered range this fix will perform a seek by the value defined in stallSeek to trigger playback again.
 * @property {number} [stallSeek=0.1]
 * Value to be used in case enableStallFix is set to true
 */

/**
 * @typedef {Object} UtcSynchronizationSettings
 * @property {boolean} [enabled=true]
 * Enables or disables the UTC clock synchronization
 * @property {boolean} [useManifestDateHeaderTimeSource=true]
 * Allows you to enable the use of the Date Header, if exposed with CORS, as a timing source for live edge detection.
 *
 * The use of the date header will happen only after the other timing source that take precedence fail or are omitted as described.
 * @property {number} [backgroundAttempts=2]
 * Number of synchronization attempts to perform in the background after an initial synchronization request has been done. This is used to verify that the derived client-server offset is correct.
 *
 * The background requests are async and done in parallel to the start of the playback.
 *
 * This value is also used to perform a resync after 404 errors on segments.
 * @property {number} [timeBetweenSyncAttempts=30]
 * The time in seconds between two consecutive sync attempts.
 *
 * Note: This value is used as an initial starting value. The internal value of the TimeSyncController is adjusted during playback based on the drift between two consecutive synchronization attempts.
 *
 * Note: A sync is only performed after an MPD update. In case the @minimumUpdatePeriod is larger than this value the sync will be delayed until the next MPD update.
 * @property {number} [maximumTimeBetweenSyncAttempts=600]
 * The maximum time in seconds between two consecutive sync attempts.
 *
 * @property {number} [minimumTimeBetweenSyncAttempts=2]
 * The minimum time in seconds between two consecutive sync attempts.
 *
 * @property {number} [timeBetweenSyncAttemptsAdjustmentFactor=2]
 * The factor used to multiply or divide the timeBetweenSyncAttempts parameter after a sync. The maximumAllowedDrift defines whether this value is used as a factor or a dividend.
 *
 * @property {number} [maximumAllowedDrift=100]
 * The maximum allowed drift specified in milliseconds between two consecutive synchronization attempts.
 *
 * @property {boolean} [enableBackgroundSyncAfterSegmentDownloadError=true]
 * Enables or disables the background sync after the player ran into a segment download error.
 *
 * @property {object} [defaultTimingSource={scheme:'urn:mpeg:dash:utc:http-xsdate:2014',value: 'http://time.akamai.com/?iso&ms'}]
 * The default timing source to be used. The timing sources in the MPD take precedence over this one.
 */

/**
 * @typedef {Object} Scheduling
 * @property {number} [defaultTimeout=500]
 * Default timeout between two consecutive segment scheduling attempts
 * @property {number} [lowLatencyTimeout=0]
 * Default timeout between two consecutive low-latency segment scheduling attempts
 * @property {boolean} [scheduleWhilePaused=true]
 * Set to true if you would like dash.js to keep downloading fragments in the background when the video element is paused.
 */

/**
 * @typedef {Object} Text
 * @property {boolean} [defaultEnabled=true]
 * Enable/disable subtitle rendering by default.
 * @property {boolean} [dispatchForManualRendering=false]
 * Enable/disable firing of CueEnter/CueExt events. This will disable the display of subtitles and should be used when you want to have full control about rendering them.
 * @property {boolean} [extendSegmentedCues=true]
 * Enable/disable patching of segmented cues in order to merge as a single cue by extending cue end time.
 * @property {boolean} [imsc.displayForcedOnlyMode=false]
 * Enable/disable forced only mode in IMSC captions.
 * When true, only those captions where itts:forcedDisplay="true" will be displayed.
 * @property {boolean} [imsc.enableRollUp=true]
 * Enable/disable rollUp style display of IMSC captions.
 * @property {object} [webvtt.customRenderingEnabled=false]
 * Enables the custom rendering for WebVTT captions. For details refer to the "Subtitles and Captions" sample section of dash.js.
 * Custom WebVTT rendering requires the external library vtt.js that can be found in the contrib folder.
 */

/**
 * @typedef {Object} LiveCatchupSettings
 * @property {number} [maxDrift=NaN]
 * Use this method to set the maximum latency deviation allowed before dash.js to do a seeking to live position.
 *
 * In low latency mode, when the difference between the measured latency and the target one, as an absolute number, is higher than the one sets with this method, then dash.js does a seek to live edge position minus the target live delay.
 *
 * LowLatencyMaxDriftBeforeSeeking should be provided in seconds.
 *
 * If 0, then seeking operations won't be used for fixing latency deviations.
 *
 * Note: Catch-up mechanism is only applied when playing low latency live streams.
 * @property {number} [playbackRate={min: NaN, max: NaN}]
 * Use this parameter to set the minimum and maximum catch up rates, as percentages, for low latency live streams.
 *
 * In low latency mode, when measured latency is higher/lower than the target one, dash.js increases/decreases playback rate respectively up to (+/-) the percentage defined with this method until target is reached.
 *
 * Valid values for min catch up rate are in the range -0.5 to 0 (-50% to 0% playback rate decrease)
 *
 * Valid values for max catch up rate are in the range 0 to 1 (0% to 100% playback rate increase).
 *
 * Set min and max to NaN to turn off live catch up feature.
 *
 * These playback rate limits take precedence over any PlaybackRate values in ServiceDescription elements in an MPD. If only one of the min/max properties is given a value, the property without a value will not fall back to a ServiceDescription value. Its default value of NaN will be used.
 *
 * Note: Catch-up mechanism is only applied when playing low latency live streams.
 * @property {number} [playbackBufferMin=0.5]
 * Use this parameter to specify the minimum buffer which is used for LoL+ based playback rate reduction.
 *
 *
 * @property {boolean} [enabled=null]
 * Use this parameter to enable the catchup mode for non low-latency streams.
 *
 * @property {string} [mode="liveCatchupModeDefault"]
 * Use this parameter to switch between different catchup modes.
 *
 * Options: "liveCatchupModeDefault" or "liveCatchupModeLOLP".
 *
 * Note: Catch-up mechanism is automatically applied when playing low latency live streams.
 */

/**
 * @typedef {Object} RequestTypeSettings
 * @property {number} [MPD]
 * Manifest type of requests.
 * @property {number} [XLinkExpansion]
 * XLink expansion type of requests.
 * @property {number} [InitializationSegment]
 * Request to retrieve an initialization segment.
 * @property {number} [IndexSegment]
 * Request to retrieve an index segment (SegmentBase).
 * @property {number} [MediaSegment]
 * Request to retrieve a media segment (video/audio/image/text chunk).
 * @property {number} [BitstreamSwitchingSegment]
 * Bitrate stream switching type of request.
 * @property {number} [FragmentInfoSegment]
 * Request to retrieve a FragmentInfo segment (specific to Smooth Streaming live streams).
 * @property {number} [other]
 * Other type of request.
 * @property {number} [lowLatencyReductionFactor]
 * For low latency mode, values of type of request are divided by lowLatencyReductionFactor.
 *
 * Note: It's not type of request.
 * @property {number} [lowLatencyMultiplyFactor]
 * For low latency mode, values of type of request are multiplied by lowLatencyMultiplyFactor.
 *
 * Note: It's not type of request.
 */

/**
 * @typedef {Object} Protection
 * @property {boolean} [keepProtectionMediaKeys=false]
 * Set the value for the ProtectionController and MediaKeys life cycle.
 *
 * If true, the ProtectionController and then created MediaKeys and MediaKeySessions will be preserved during the MediaPlayer lifetime.
 * @property {boolean} [ignoreEmeEncryptedEvent=false]
 * If set to true the player will ignore "encrypted" and "needkey" events thrown by the EME.
 *
 * @property {boolean} [detectPlayreadyMessageFormat=true]
 * If set to true the player will use the raw unwrapped message from the Playready CDM
 */

/**
 * @typedef {Object} Capabilities
 * @property {boolean} [filterUnsupportedEssentialProperties=true]
 * Enable to filter all the AdaptationSets and Representations which contain an unsupported \<EssentialProperty\> element.
 * @property {boolean} [useMediaCapabilitiesApi=false]
 * Enable to use the MediaCapabilities API to check whether codecs are supported. If disabled MSE.isTypeSupported will be used instead.
 */

/**
 * @typedef {Object} AbrRulesParameters
 * @property {module:Settings~AbandonRequestRuleParameters} abandonRequestRule
 * Configuration parameters for the AbandonRequestRule
 */

/**
 * @typedef {Object} AbandonRequestRuleParameters
 * @property {number} [graceTimeThreshold=500]
 * Minimum elapsed time in milliseconds that the segment download has to run before the rule considers abandoning the download.
 * @property {number} [abandonMultiplier]
 * This value is multiplied with the segment duration and compared to the estimated time of the download to decide the request should be abandoned.
 * @property {number} [minLengthToAverage]
 * Minimum number of throughput samples required to consider abandoning the download of the segment.
 */

/**
 * @typedef {Object} AbrSettings
 * @property {string} [movingAverageMethod="slidingWindow"]
 * Sets the moving average method used for smoothing throughput estimates.
 *
 * Valid methods are "slidingWindow" and "ewma".
 *
 * The call has no effect if an invalid method is passed.
 *
 * The sliding window moving average method computes the average throughput using the last four segments downloaded.
 *
 * If the stream is live (as opposed to VOD), then only the last three segments are used.
 *
 * If wide variations in throughput are detected, the number of segments can be dynamically increased to avoid oscillations.
 *
 * The exponentially weighted moving average (EWMA) method computes the average using exponential smoothing.
 *
 * Two separate estimates are maintained, a fast one with a three-second half life and a slow one with an eight-second half life.
 *
 * The throughput estimate at any time is the minimum of the fast and slow estimates.
 *
 * This allows a fast reaction to a bandwidth drop and prevents oscillations on bandwidth spikes.
 * @property {string} [ABRStrategy="abrDynamic"]
 * Returns the current ABR strategy being used: "abrDynamic", "abrBola" or "abrThroughput".
 * @property {object} [trackSwitchMode={video: "neverReplace", audio: "alwaysReplace"}]
 * @property {object} [additionalAbrRules={insufficientBufferRule: true,switchHistoryRule: true,droppedFramesRule: true,abandonRequestsRule: true}]
 * Enable/Disable additional ABR rules in case ABRStrategy is set to "abrDynamic", "abrBola" or "abrThroughput".
 * @property {module:Settings~AbrRulesParameters} abrRulesParameters Configuration options for the different ABR rules
 * @property {number} [bandwidthSafetyFactor=0.9]
 * Standard ABR throughput rules multiply the throughput by this value.
 *
 * It should be between 0 and 1, with lower values giving less rebuffering (but also lower quality).
 * @property {boolean} [useDefaultABRRules=true]
 * Should the default ABR rules be used, or the custom ones added.
 * @property {boolean} [useDeadTimeLatency=true]
 * If true, only the download portion will be considered part of the download bitrate and latency will be regarded as static.
 *
 * If false, the reciprocal of the whole transfer time will be used.
 * @property {boolean} [limitBitrateByPortal=false]
 * If true, the size of the video portal will limit the max chosen video resolution.
 * @property {boolean} [usePixelRatioInLimitBitrateByPortal=false]
 * Sets whether to take into account the device's pixel ratio when defining the portal dimensions.
 *
 * Useful on, for example, retina displays.
 * @property {module:Settings~AudioVideoSettings} [maxBitrate={audio: -1, video: -1}]
 * The maximum bitrate that the ABR algorithms will choose. This value is specified in kbps.
 *
 * Use -1 for no limit.
 * @property {module:Settings~AudioVideoSettings} [minBitrate={audio: -1, video: -1}]
 * The minimum bitrate that the ABR algorithms will choose. This value is specified in kbps.
 *
 * Use -1 for no limit.
 * @property {module:Settings~AudioVideoSettings} [maxRepresentationRatio={audio: 1, video: 1}]
 * When switching multi-bitrate content (auto or manual mode) this property specifies the maximum representation allowed, as a proportion of the size of the representation set.
 *
 * You can set or remove this cap at anytime before or during playback.
 *
 * To clear this setting you set the value to 1.
 *
 * If both this and maxAllowedBitrate are defined, maxAllowedBitrate is evaluated first, then maxAllowedRepresentation, i.e. the lowest value from executing these rules is used.
 *
 * This feature is typically used to reserve higher representations for playback only when connected over a fast connection.
 * @property {module:Settings~AudioVideoSettings} [initialBitrate={audio: -1, video: -1}]
 * Explicitly set the starting bitrate for audio or video. This value is specified in kbps.
 *
 * Use -1 to let the player decide.
 * @property {module:Settings~AudioVideoSettings} [initialRepresentationRatio={audio: -1, video: -1}]
 * Explicitly set the initial representation ratio.
 *
 * If initalBitrate is specified, this is ignored.
 * @property {module:Settings~AudioVideoSettings} [autoSwitchBitrate={audio: true, video: true}]
 * Indicates whether the player should enable ABR algorithms to switch the bitrate.
 *
 * @property {string} [fetchThroughputCalculationMode="abrFetchThroughputCalculationDownloadedData"]
 * Algorithm to determine the throughput in case the Fetch API is used for low latency streaming.
 *
 * For details please check the samples section and FetchLoader.js.
 */

/**
 * @typedef {Object} module:Settings~CmcdSettings
 * @property {boolean} [enable=false]
 * Enable or disable the CMCD reporting.
 * @property {string} [sid]
 * GUID identifying the current playback session.
 *
 * Should be in UUID format.
 *
 * If not specified a UUID will be automatically generated.
 * @property {string} [cid]
 * A unique string to identify the current content.
 *
 * If not specified it will be a hash of the MPD url.
 * @property {number} [rtp]
 * The requested maximum throughput that the client considers sufficient for delivery of the asset.
 *
 * If not specified this value will be dynamically calculated in the CMCDModel based on the current buffer level.
 * @property {number} [rtpSafetyFactor=5]
 * This value is used as a factor for the rtp value calculation: rtp = minBandwidth * rtpSafetyFactor
 *
 * If not specified this value defaults to 5. Note that this value is only used when no static rtp value is defined.
 * @property {number} [mode="query"]
 * The method to use to attach cmcd metrics to the requests. 'query' to use query parameters, 'header' to use http headers.
 *
 * If not specified this value defaults to 'query'.
 * @property {Array.<string>} [enabledKeys]
 * This value is used to specify the desired CMCD parameters. Parameters not included in this list are not reported.
 */

/**
 * @typedef {Object} module:Settings~CmsdSettings
 * @property {boolean} [enabled=false]
 * Enable or disable the CMSD response headers parsing.
 * @property {module:Settings~CmsdAbrSettings} [abr]
 * Sets additional ABR rules based on CMSD response headers.
 */

/**
 * @typedef {Object} CmsdAbrSettings
 * @property {boolean} [applyMb=false]
 * Set to true if dash.js should apply CMSD maximum suggested bitrate in ABR logic.
 * @property {number} [etpWeightRatio=0]
 * Sets the weight ratio (between 0 and 1) that shall be applied on CMSD estimated throuhgput compared to measured throughput when calculating throughput.
 */

/**
 * @typedef {Object} Metrics
 * @property {number} [metricsMaxListDepth=100]
 * Maximum number of metrics that are persisted per type.
 */

/**
 * @typedef {Object} StreamingSettings
 * @property {number} [abandonLoadTimeout=10000]
 * A timeout value in seconds, which during the ABRController will block switch-up events.
 *
 * This will only take effect after an abandoned fragment event occurs.
 * @property {number} [wallclockTimeUpdateInterval=100]
 * How frequently the wallclockTimeUpdated internal event is triggered (in milliseconds).
 * @property {number} [manifestUpdateRetryInterval=100]
 * For live streams, set the interval-frequency in milliseconds at which dash.js will check if the current manifest is still processed before downloading the next manifest once the minimumUpdatePeriod time has.
 * @property {number} [liveUpdateTimeThresholdInMilliseconds=0]
 * For live streams, postpone syncing time updates until the threshold is passed. Increase if problems occurs during live streams on low end devices.
 * @property {boolean} [cacheInitSegments=false]
 * Enables the caching of init segments to avoid requesting the init segments before each representation switch.
 * @property {boolean} [applyServiceDescription=true]
 * Set to true if dash.js should use the parameters defined in ServiceDescription elements
 * @property {boolean} [applyProducerReferenceTime=true]
 * Set to true if dash.js should use the parameters defined in ProducerReferenceTime elements in combination with ServiceDescription elements.
 * @property {boolean} [applyContentSteering=true]
 * Set to true if dash.js should apply content steering during playback.
 * @property {number} [eventControllerRefreshDelay=100]
 * For multi-period streams, overwrite the manifest mediaPresentationDuration attribute with the sum of period durations if the manifest mediaPresentationDuration is greater than the sum of period durations
 * @property {boolean} [enableManifestDurationMismatchFix=true]
 * Overwrite the manifest segments base information timescale attributes with the timescale set in initialization segments
 * @property {boolean} [enableManifestTimescaleMismatchFix=false]
 * Defines the delay in milliseconds between two consecutive checks for events to be fired.
 * @property {boolean} [parseInbandPrft=false]
 * Set to true if dash.js should parse inband prft boxes (ProducerReferenceTime) and trigger events.
 * @property {module:Settings~Metrics} metrics Metric settings
 * @property {module:Settings~LiveDelay} delay Live Delay settings
 * @property {module:Settings~TimeShiftBuffer} timeShiftBuffer TimeShiftBuffer settings
 * @property {module:Settings~Protection} protection DRM related settings
 * @property {module:Settings~Capabilities} capabilities Capability related settings
 * @property {module:Settings~Buffer}  buffer Buffer related settings
 * @property {module:Settings~Gaps}  gaps Gap related settings
 * @property {module:Settings~UtcSynchronizationSettings} utcSynchronization Settings related to UTC clock synchronization
 * @property {module:Settings~Scheduling} scheduling Settings related to segment scheduling
 * @property {module:Settings~Text} text Settings related to Subtitles and captions
 * @property {module:Settings~LiveCatchupSettings} liveCatchup  Settings related to live catchup.
 * @property {module:Settings~CachingInfoSettings} [lastBitrateCachingInfo={enabled: true, ttl: 360000}]
 * Set to false if you would like to disable the last known bit rate from being stored during playback and used to set the initial bit rate for subsequent playback within the expiration window.
 *
 * The default expiration is one hour, defined in milliseconds.
 *
 * If expired, the default initial bit rate (closest to 1000 kbps) will be used for that session and a new bit rate will be stored during that session.
 * @property {module:Settings~CachingInfoSettings} [lastMediaSettingsCachingInfo={enabled: true, ttl: 360000}]
 * Set to false if you would like to disable the last media settings from being stored to localStorage during playback and used to set the initial track for subsequent playback within the expiration window.
 *
 * The default expiration is one hour, defined in milliseconds.
 * @property {boolean} [saveLastMediaSettingsForCurrentStreamingSession=true]
 * Set to true if dash.js should save media settings from last selected track for incoming track selection during current streaming session.
 * @property {module:Settings~AudioVideoSettings} [cacheLoadThresholds={video: 50, audio: 5}]
 * For a given media type, the threshold which defines if the response to a fragment request is coming from browser cache or not.
 * @property {module:Settings~AudioVideoSettings} [trackSwitchMode={video: "neverReplace", audio: "alwaysReplace"}]
 * For a given media type defines if existing segments in the buffer should be overwritten once the track is switched. For instance if the user switches the audio language the existing segments in the audio buffer will be replaced when setting this value to "alwaysReplace".
 *
 * Possible values
 *
 * - Constants.TRACK_SWITCH_MODE_ALWAYS_REPLACE
 * Replace existing segments in the buffer
 *
 * - Constants.TRACK_SWITCH_MODE_NEVER_REPLACE
 * Do not replace existing segments in the buffer
 *
 * @property {string} [selectionModeForInitialTrack="highestSelectionPriority"]
 * Sets the selection mode for the initial track. This mode defines how the initial track will be selected if no initial media settings are set. If initial media settings are set this parameter will be ignored. Available options are:
 *
 * Possible values
 *
 * - Constants.TRACK_SELECTION_MODE_HIGHEST_SELECTION_PRIORITY
 * This mode makes the player select the track with the highest selectionPriority as defined in the manifest. If not selectionPriority is given we fallback to TRACK_SELECTION_MODE_HIGHEST_BITRATE. This mode is a default mode.
 *
 * - Constants.TRACK_SELECTION_MODE_HIGHEST_BITRATE
 * This mode makes the player select the track with a highest bitrate.
 *
 * - Constants.TRACK_SELECTION_MODE_FIRST_TRACK
 * This mode makes the player select the first track found in the manifest.
 *
 * - Constants.TRACK_SELECTION_MODE_HIGHEST_EFFICIENCY
 * This mode makes the player select the track with the lowest bitrate per pixel average.
 *
 * - Constants.TRACK_SELECTION_MODE_WIDEST_RANGE
 * This mode makes the player select the track with a widest range of bitrates.
 *
 *
 * @property {number} [fragmentRequestTimeout=20000]
 * Time in milliseconds before timing out on loading a media fragment.
 *
 * @property {number} [fragmentRequestProgressTimeout=-1]
 * Time in milliseconds before timing out on loading progress of a media fragment.
 *
 * @property {number} [manifestRequestTimeout=10000]
 * Time in milliseconds before timing out on loading a manifest.
 *
 * Fragments that timeout are retried as if they failed.
 * @property {module:Settings~RequestTypeSettings} [retryIntervals]
 * Time in milliseconds of which to reload a failed file load attempt.
 *
 * For low latency mode these values are divided by lowLatencyReductionFactor.
 * @property {module:Settings~RequestTypeSettings} [retryAttempts]
 * Total number of retry attempts that will occur on a file load before it fails.
 *
 * For low latency mode these values are multiplied by lowLatencyMultiplyFactor.
 * @property {module:Settings~AbrSettings} abr
 * Adaptive Bitrate algorithm related settings.
 * @property {module:Settings~CmcdSettings} cmcd
 * Settings related to Common Media Client Data reporting.
 * @property {module:Settings~CmsdSettings} cmsd
 * Settings related to Common Media Server Data parsing.
 */

/**
 * @class
 * @ignore
 */

function Settings() {
  var _retryIntervals, _retryAttempts;

  var instance;
  var context = this.context;
  var eventBus = (0,_EventBus__WEBPACK_IMPORTED_MODULE_5__["default"])(context).getInstance();
  var DISPATCH_KEY_MAP = {
    'streaming.delay.liveDelay': _events_Events__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_LIVE_DELAY,
    'streaming.delay.liveDelayFragmentCount': _events_Events__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_LIVE_DELAY_FRAGMENT_COUNT,
    'streaming.liveCatchup.enabled': _events_Events__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_CATCHUP_ENABLED,
    'streaming.liveCatchup.playbackRate.min': _events_Events__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_PLAYBACK_RATE_MIN,
    'streaming.liveCatchup.playbackRate.max': _events_Events__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_PLAYBACK_RATE_MAX
  };
  /**
   * @const {PlayerSettings} defaultSettings
   * @ignore
   */

  var defaultSettings = {
    debug: {
      logLevel: _core_Debug__WEBPACK_IMPORTED_MODULE_2__["default"].LOG_LEVEL_WARNING,
      dispatchEvent: false
    },
    streaming: {
      abandonLoadTimeout: 10000,
      wallclockTimeUpdateInterval: 100,
      manifestUpdateRetryInterval: 100,
      liveUpdateTimeThresholdInMilliseconds: 0,
      cacheInitSegments: false,
      applyServiceDescription: true,
      applyProducerReferenceTime: true,
      applyContentSteering: true,
      eventControllerRefreshDelay: 100,
      enableManifestDurationMismatchFix: true,
      parseInbandPrft: false,
      enableManifestTimescaleMismatchFix: false,
      capabilities: {
        filterUnsupportedEssentialProperties: true,
        useMediaCapabilitiesApi: false
      },
      timeShiftBuffer: {
        calcFromSegmentTimeline: false,
        fallbackToSegmentTimeline: true
      },
      metrics: {
        maxListDepth: 100
      },
      delay: {
        liveDelayFragmentCount: NaN,
        liveDelay: NaN,
        useSuggestedPresentationDelay: true
      },
      protection: {
        keepProtectionMediaKeys: false,
        ignoreEmeEncryptedEvent: false,
        detectPlayreadyMessageFormat: true
      },
      buffer: {
        enableSeekDecorrelationFix: false,
        fastSwitchEnabled: true,
        flushBufferAtTrackSwitch: false,
        reuseExistingSourceBuffers: true,
        bufferPruningInterval: 10,
        bufferToKeep: 20,
        bufferTimeAtTopQuality: 30,
        bufferTimeAtTopQualityLongForm: 60,
        initialBufferLevel: NaN,
        stableBufferTime: 12,
        longFormContentDurationThreshold: 600,
        stallThreshold: 0.3,
        useAppendWindow: true,
        setStallState: true,
        avoidCurrentTimeRangePruning: false,
        useChangeTypeForTrackSwitch: true,
        mediaSourceDurationInfinity: true,
        resetSourceBuffersForTrackSwitch: false
      },
      gaps: {
        jumpGaps: true,
        jumpLargeGaps: true,
        smallGapLimit: 1.5,
        threshold: 0.3,
        enableSeekFix: true,
        enableStallFix: false,
        stallSeek: 0.1
      },
      utcSynchronization: {
        enabled: true,
        useManifestDateHeaderTimeSource: true,
        backgroundAttempts: 2,
        timeBetweenSyncAttempts: 30,
        maximumTimeBetweenSyncAttempts: 600,
        minimumTimeBetweenSyncAttempts: 2,
        timeBetweenSyncAttemptsAdjustmentFactor: 2,
        maximumAllowedDrift: 100,
        enableBackgroundSyncAfterSegmentDownloadError: true,
        defaultTimingSource: {
          scheme: 'urn:mpeg:dash:utc:http-xsdate:2014',
          value: 'https://time.akamai.com/?iso&ms'
        }
      },
      scheduling: {
        defaultTimeout: 500,
        lowLatencyTimeout: 0,
        scheduleWhilePaused: true
      },
      text: {
        defaultEnabled: true,
        dispatchForManualRendering: false,
        extendSegmentedCues: true,
        imsc: {
          displayForcedOnlyMode: false,
          enableRollUp: true
        },
        webvtt: {
          customRenderingEnabled: false
        }
      },
      liveCatchup: {
        maxDrift: NaN,
        playbackRate: {
          min: NaN,
          max: NaN
        },
        playbackBufferMin: 0.5,
        enabled: null,
        mode: _streaming_constants_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].LIVE_CATCHUP_MODE_DEFAULT
      },
      lastBitrateCachingInfo: {
        enabled: true,
        ttl: 360000
      },
      lastMediaSettingsCachingInfo: {
        enabled: true,
        ttl: 360000
      },
      saveLastMediaSettingsForCurrentStreamingSession: true,
      cacheLoadThresholds: {
        video: 50,
        audio: 5
      },
      trackSwitchMode: {
        audio: _streaming_constants_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].TRACK_SWITCH_MODE_ALWAYS_REPLACE,
        video: _streaming_constants_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].TRACK_SWITCH_MODE_NEVER_REPLACE
      },
      selectionModeForInitialTrack: _streaming_constants_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].TRACK_SELECTION_MODE_HIGHEST_SELECTION_PRIORITY,
      fragmentRequestTimeout: 20000,
      fragmentRequestProgressTimeout: -1,
      manifestRequestTimeout: 10000,
      retryIntervals: (_retryIntervals = {}, _defineProperty(_retryIntervals, _streaming_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.MPD_TYPE, 500), _defineProperty(_retryIntervals, _streaming_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.XLINK_EXPANSION_TYPE, 500), _defineProperty(_retryIntervals, _streaming_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.MEDIA_SEGMENT_TYPE, 1000), _defineProperty(_retryIntervals, _streaming_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.INIT_SEGMENT_TYPE, 1000), _defineProperty(_retryIntervals, _streaming_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.BITSTREAM_SWITCHING_SEGMENT_TYPE, 1000), _defineProperty(_retryIntervals, _streaming_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.INDEX_SEGMENT_TYPE, 1000), _defineProperty(_retryIntervals, _streaming_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.MSS_FRAGMENT_INFO_SEGMENT_TYPE, 1000), _defineProperty(_retryIntervals, _streaming_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.LICENSE, 1000), _defineProperty(_retryIntervals, _streaming_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.OTHER_TYPE, 1000), _defineProperty(_retryIntervals, "lowLatencyReductionFactor", 10), _retryIntervals),
      retryAttempts: (_retryAttempts = {}, _defineProperty(_retryAttempts, _streaming_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.MPD_TYPE, 3), _defineProperty(_retryAttempts, _streaming_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.XLINK_EXPANSION_TYPE, 1), _defineProperty(_retryAttempts, _streaming_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.MEDIA_SEGMENT_TYPE, 3), _defineProperty(_retryAttempts, _streaming_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.INIT_SEGMENT_TYPE, 3), _defineProperty(_retryAttempts, _streaming_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.BITSTREAM_SWITCHING_SEGMENT_TYPE, 3), _defineProperty(_retryAttempts, _streaming_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.INDEX_SEGMENT_TYPE, 3), _defineProperty(_retryAttempts, _streaming_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.MSS_FRAGMENT_INFO_SEGMENT_TYPE, 3), _defineProperty(_retryAttempts, _streaming_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.LICENSE, 3), _defineProperty(_retryAttempts, _streaming_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.OTHER_TYPE, 3), _defineProperty(_retryAttempts, "lowLatencyMultiplyFactor", 5), _retryAttempts),
      abr: {
        movingAverageMethod: _streaming_constants_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].MOVING_AVERAGE_SLIDING_WINDOW,
        ABRStrategy: _streaming_constants_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].ABR_STRATEGY_DYNAMIC,
        additionalAbrRules: {
          insufficientBufferRule: true,
          switchHistoryRule: true,
          droppedFramesRule: true,
          abandonRequestsRule: true
        },
        abrRulesParameters: {
          abandonRequestsRule: {
            graceTimeThreshold: 500,
            abandonMultiplier: 1.8,
            minLengthToAverage: 5
          }
        },
        bandwidthSafetyFactor: 0.9,
        useDefaultABRRules: true,
        useDeadTimeLatency: true,
        limitBitrateByPortal: false,
        usePixelRatioInLimitBitrateByPortal: false,
        maxBitrate: {
          audio: -1,
          video: -1
        },
        minBitrate: {
          audio: -1,
          video: -1
        },
        maxRepresentationRatio: {
          audio: 1,
          video: 1
        },
        initialBitrate: {
          audio: -1,
          video: -1
        },
        initialRepresentationRatio: {
          audio: -1,
          video: -1
        },
        autoSwitchBitrate: {
          audio: true,
          video: true
        },
        fetchThroughputCalculationMode: _streaming_constants_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].ABR_FETCH_THROUGHPUT_CALCULATION_MOOF_PARSING
      },
      cmcd: {
        enabled: false,
        sid: null,
        cid: null,
        rtp: null,
        rtpSafetyFactor: 5,
        mode: _streaming_constants_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CMCD_MODE_QUERY,
        enabledKeys: ['br', 'd', 'ot', 'tb', 'bl', 'dl', 'mtp', 'nor', 'nrr', 'su', 'bs', 'rtp', 'cid', 'pr', 'sf', 'sid', 'st', 'v']
      },
      cmsd: {
        enabled: false,
        abr: {
          applyMb: false,
          etpWeightRatio: 0
        }
      }
    },
    errors: {
      recoverAttempts: {
        mediaErrorDecode: 5
      }
    }
  };
  var settings = _Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].clone(defaultSettings); //Merge in the settings. If something exists in the new config that doesn't match the schema of the default config,
  //regard it as an error and log it.

  function mixinSettings(source, dest, path) {
    for (var n in source) {
      if (source.hasOwnProperty(n)) {
        if (dest.hasOwnProperty(n)) {
          if (_typeof(source[n]) === 'object' && !(source[n] instanceof Array) && source[n] !== null) {
            mixinSettings(source[n], dest[n], path.slice() + n + '.');
          } else {
            dest[n] = _Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].clone(source[n]);

            if (DISPATCH_KEY_MAP[path + n]) {
              eventBus.trigger(DISPATCH_KEY_MAP[path + n]);
            }
          }
        } else {
          console.error('Settings parameter ' + path + n + ' is not supported');
        }
      }
    }
  }
  /**
   * Return the settings object. Don't copy/store this object, you won't get updates.
   * @func
   * @instance
   */


  function get() {
    return settings;
  }
  /**
   * @func
   * @instance
   * @param {object} settingsObj - This should be a partial object of the Settings.Schema type. That is, fields defined should match the path (e.g.
   * settingsObj.streaming.abr.autoSwitchBitrate.audio -> defaultSettings.streaming.abr.autoSwitchBitrate.audio). Where an element's path does
   * not match it is ignored, and a warning is logged.
   *
   * Use to change the settings object. Any new values defined will overwrite the settings and anything undefined will not change.
   * Implementers of new settings should add it in an approriate namespace to the defaultSettings object and give it a default value (that is not undefined).
   *
   */


  function update(settingsObj) {
    if (_typeof(settingsObj) === 'object') {
      mixinSettings(settingsObj, settings, '');
    }
  }
  /**
   * Resets the settings object. Everything is set to its default value.
   * @func
   * @instance
   *
   */


  function reset() {
    settings = _Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].clone(defaultSettings);
  }

  instance = {
    get: get,
    update: update,
    reset: reset
  };
  return instance;
}

Settings.__dashjs_factory_name = 'Settings';
var factory = _FactoryMaker__WEBPACK_IMPORTED_MODULE_0__["default"].getSingletonFactory(Settings);
/* harmony default export */ __webpack_exports__["default"] = (factory);

/***/ }),

/***/ "./src/core/Utils.js":
/*!***************************!*\
  !*** ./src/core/Utils.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path_browserify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path-browserify */ "./node_modules/path-browserify/index.js");
/* harmony import */ var path_browserify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path_browserify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ua_parser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ua-parser-js */ "./node_modules/ua-parser-js/src/ua-parser.js");
/* harmony import */ var ua_parser_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ua_parser_js__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @class
 * @ignore
 */



var Utils = /*#__PURE__*/function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: "mixin",
    value: function mixin(dest, source, copy) {
      var s;
      var empty = {};

      if (dest) {
        for (var name in source) {
          if (source.hasOwnProperty(name)) {
            s = source[name];

            if (!(name in dest) || dest[name] !== s && (!(name in empty) || empty[name] !== s)) {
              if (_typeof(dest[name]) === 'object' && dest[name] !== null) {
                dest[name] = Utils.mixin(dest[name], s, copy);
              } else {
                dest[name] = copy(s);
              }
            }
          }
        }
      }

      return dest;
    }
  }, {
    key: "clone",
    value: function clone(src) {
      if (!src || _typeof(src) !== 'object') {
        return src; // anything
      }

      var r;

      if (src instanceof Array) {
        // array
        r = [];

        for (var i = 0, l = src.length; i < l; ++i) {
          if (i in src) {
            r.push(Utils.clone(src[i]));
          }
        }
      } else {
        r = {};
      }

      return Utils.mixin(r, src, Utils.clone);
    }
  }, {
    key: "addAditionalQueryParameterToUrl",
    value: function addAditionalQueryParameterToUrl(url, params) {
      try {
        if (!params || params.length === 0) {
          return url;
        }

        var modifiedUrl = new URL(url);
        params.forEach(function (param) {
          if (param.key && param.value) {
            modifiedUrl.searchParams.set(param.key, param.value);
          }
        });
        return modifiedUrl.href;
      } catch (e) {
        return url;
      }
    }
  }, {
    key: "parseHttpHeaders",
    value: function parseHttpHeaders(headerStr) {
      var headers = {};

      if (!headerStr) {
        return headers;
      } // Trim headerStr to fix a MS Edge bug with xhr.getAllResponseHeaders method
      // which send a string starting with a "\n" character


      var headerPairs = headerStr.trim().split("\r\n");

      for (var i = 0, ilen = headerPairs.length; i < ilen; i++) {
        var headerPair = headerPairs[i];
        var index = headerPair.indexOf(": ");

        if (index > 0) {
          headers[headerPair.substring(0, index)] = headerPair.substring(index + 2);
        }
      }

      return headers;
    }
  }, {
    key: "generateUuid",
    value: function generateUuid() {
      var dt = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
      });
      return uuid;
    }
  }, {
    key: "generateHashCode",
    value: function generateHashCode(string) {
      var hash = 0;

      if (string.length === 0) {
        return hash;
      }

      for (var i = 0; i < string.length; i++) {
        var chr = string.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
      }

      return hash;
    }
    /**
     * Compares both urls and returns a relative url (target relative to original)
     * @param {string} originalUrl
     * @param {string} targetUrl
     * @return {string|*}
     */

  }, {
    key: "getRelativeUrl",
    value: function getRelativeUrl(originalUrl, targetUrl) {
      try {
        var original = new URL(originalUrl);
        var target = new URL(targetUrl); // Unify the protocol to compare the origins

        original.protocol = target.protocol;

        if (original.origin !== target.origin) {
          return targetUrl;
        } // Use the relative path implementation of the path library. We need to cut off the actual filename in the end to get the relative path


        var relativePath = path_browserify__WEBPACK_IMPORTED_MODULE_0___default().relative(original.pathname.substr(0, original.pathname.lastIndexOf('/')), target.pathname.substr(0, target.pathname.lastIndexOf('/'))); // In case the relative path is empty (both path are equal) return the filename only. Otherwise add a slash in front of the filename

        var startIndexOffset = relativePath.length === 0 ? 1 : 0;
        relativePath += target.pathname.substr(target.pathname.lastIndexOf('/') + startIndexOffset, target.pathname.length - 1); // Build the other candidate, e.g. the 'host relative' path that starts with "/", and return the shortest of the two candidates.

        if (target.pathname.length < relativePath.length) {
          return target.pathname;
        }

        return relativePath;
      } catch (e) {
        return targetUrl;
      }
    }
  }, {
    key: "parseUserAgent",
    value: function parseUserAgent() {
      var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      try {
        var uaString = ua === null ? typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '' : '';
        return (0,ua_parser_js__WEBPACK_IMPORTED_MODULE_1__.UAParser)(uaString);
      } catch (e) {
        return {};
      }
    }
    /**
     * Checks for existence of "http" or "https" in a string
     * @param string
     * @returns {boolean}
     */

  }, {
    key: "stringHasProtocol",
    value: function stringHasProtocol(string) {
      return /(http(s?)):\/\//i.test(string);
    }
  }]);

  return Utils;
}();

/* harmony default export */ __webpack_exports__["default"] = (Utils);

/***/ }),

/***/ "./src/core/events/CoreEvents.js":
/*!***************************************!*\
  !*** ./src/core/events/CoreEvents.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EventsBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventsBase */ "./src/core/events/EventsBase.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * These are internal events that should not be needed at the player level.
 * If you find and event in here that you would like access to from MediaPlayer level
 * please add an issue at https://github.com/Dash-Industry-Forum/dash.js/issues/new
 * @class
 * @ignore
 */

var CoreEvents = /*#__PURE__*/function (_EventsBase) {
  _inherits(CoreEvents, _EventsBase);

  var _super = _createSuper(CoreEvents);

  function CoreEvents() {
    var _this;

    _classCallCheck(this, CoreEvents);

    _this = _super.call(this);
    _this.ATTEMPT_BACKGROUND_SYNC = 'attemptBackgroundSync';
    _this.BUFFERING_COMPLETED = 'bufferingCompleted';
    _this.BUFFER_CLEARED = 'bufferCleared';
    _this.BYTES_APPENDED_END_FRAGMENT = 'bytesAppendedEndFragment';
    _this.BUFFER_REPLACEMENT_STARTED = 'bufferReplacementStarted';
    _this.CHECK_FOR_EXISTENCE_COMPLETED = 'checkForExistenceCompleted';
    _this.CMSD_STATIC_HEADER = 'cmsdStaticHeader';
    _this.CURRENT_TRACK_CHANGED = 'currentTrackChanged';
    _this.DATA_UPDATE_COMPLETED = 'dataUpdateCompleted';
    _this.INBAND_EVENTS = 'inbandEvents';
    _this.INITIAL_STREAM_SWITCH = 'initialStreamSwitch';
    _this.INIT_FRAGMENT_LOADED = 'initFragmentLoaded';
    _this.INIT_FRAGMENT_NEEDED = 'initFragmentNeeded';
    _this.INTERNAL_MANIFEST_LOADED = 'internalManifestLoaded';
    _this.ORIGINAL_MANIFEST_LOADED = 'originalManifestLoaded';
    _this.LOADING_COMPLETED = 'loadingCompleted';
    _this.LOADING_PROGRESS = 'loadingProgress';
    _this.LOADING_DATA_PROGRESS = 'loadingDataProgress';
    _this.LOADING_ABANDONED = 'loadingAborted';
    _this.MANIFEST_UPDATED = 'manifestUpdated';
    _this.MEDIA_FRAGMENT_LOADED = 'mediaFragmentLoaded';
    _this.MEDIA_FRAGMENT_NEEDED = 'mediaFragmentNeeded';
    _this.QUOTA_EXCEEDED = 'quotaExceeded';
    _this.SEGMENT_LOCATION_BLACKLIST_ADD = 'segmentLocationBlacklistAdd';
    _this.SEGMENT_LOCATION_BLACKLIST_CHANGED = 'segmentLocationBlacklistChanged';
    _this.SERVICE_LOCATION_BASE_URL_BLACKLIST_ADD = 'serviceLocationBlacklistAdd';
    _this.SERVICE_LOCATION_BASE_URL_BLACKLIST_CHANGED = 'serviceLocationBlacklistChanged';
    _this.SERVICE_LOCATION_LOCATION_BLACKLIST_ADD = 'serviceLocationLocationBlacklistAdd';
    _this.SERVICE_LOCATION_LOCATION_BLACKLIST_CHANGED = 'serviceLocationLocationBlacklistChanged';
    _this.SET_FRAGMENTED_TEXT_AFTER_DISABLED = 'setFragmentedTextAfterDisabled';
    _this.SET_NON_FRAGMENTED_TEXT = 'setNonFragmentedText';
    _this.SOURCE_BUFFER_ERROR = 'sourceBufferError';
    _this.STREAMS_COMPOSED = 'streamsComposed';
    _this.STREAM_BUFFERING_COMPLETED = 'streamBufferingCompleted';
    _this.STREAM_REQUESTING_COMPLETED = 'streamRequestingCompleted';
    _this.TEXT_TRACKS_QUEUE_INITIALIZED = 'textTracksQueueInitialized';
    _this.TIME_SYNCHRONIZATION_COMPLETED = 'timeSynchronizationComplete';
    _this.UPDATE_TIME_SYNC_OFFSET = 'updateTimeSyncOffset';
    _this.URL_RESOLUTION_FAILED = 'urlResolutionFailed';
    _this.VIDEO_CHUNK_RECEIVED = 'videoChunkReceived';
    _this.WALLCLOCK_TIME_UPDATED = 'wallclockTimeUpdated';
    _this.XLINK_ELEMENT_LOADED = 'xlinkElementLoaded';
    _this.XLINK_READY = 'xlinkReady';
    _this.SEEK_TARGET = 'seekTarget';
    _this.SETTING_UPDATED_LIVE_DELAY = 'settingUpdatedLiveDelay';
    _this.SETTING_UPDATED_LIVE_DELAY_FRAGMENT_COUNT = 'settingUpdatedLiveDelayFragmentCount';
    _this.SETTING_UPDATED_CATCHUP_ENABLED = 'settingUpdatedCatchupEnabled';
    _this.SETTING_UPDATED_PLAYBACK_RATE_MIN = 'settingUpdatedPlaybackRateMin';
    _this.SETTING_UPDATED_PLAYBACK_RATE_MAX = 'settingUpdatedPlaybackRateMax';
    return _this;
  }

  return CoreEvents;
}(_EventsBase__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (CoreEvents);

/***/ }),

/***/ "./src/core/events/Events.js":
/*!***********************************!*\
  !*** ./src/core/events/Events.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CoreEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CoreEvents */ "./src/core/events/CoreEvents.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @class
 * @ignore
 */


var Events = /*#__PURE__*/function (_CoreEvents) {
  _inherits(Events, _CoreEvents);

  var _super = _createSuper(Events);

  function Events() {
    _classCallCheck(this, Events);

    return _super.apply(this, arguments);
  }

  return Events;
}(_CoreEvents__WEBPACK_IMPORTED_MODULE_0__["default"]);

var events = new Events();
/* harmony default export */ __webpack_exports__["default"] = (events);

/***/ }),

/***/ "./src/core/events/EventsBase.js":
/*!***************************************!*\
  !*** ./src/core/events/EventsBase.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @class
 * @ignore
 */
var EventsBase = /*#__PURE__*/function () {
  function EventsBase() {
    _classCallCheck(this, EventsBase);
  }

  _createClass(EventsBase, [{
    key: "extend",
    value: function extend(events, config) {
      if (!events) return;
      var override = config ? config.override : false;
      var publicOnly = config ? config.publicOnly : false;

      for (var evt in events) {
        if (!events.hasOwnProperty(evt) || this[evt] && !override) continue;
        if (publicOnly && events[evt].indexOf('public_') === -1) continue;
        this[evt] = events[evt];
      }
    }
  }]);

  return EventsBase;
}();

/* harmony default export */ __webpack_exports__["default"] = (EventsBase);

/***/ }),

/***/ "./src/dash/vo/UTCTiming.js":
/*!**********************************!*\
  !*** ./src/dash/vo/UTCTiming.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @class
 * @ignore
 */
var UTCTiming = function UTCTiming() {
  _classCallCheck(this, UTCTiming);

  // UTCTiming is a DescriptorType and doesn't have any additional fields
  this.schemeIdUri = '';
  this.value = '';
};

/* harmony default export */ __webpack_exports__["default"] = (UTCTiming);

/***/ }),

/***/ "./src/streaming/MediaPlayerEvents.js":
/*!********************************************!*\
  !*** ./src/streaming/MediaPlayerEvents.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_events_EventsBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/events/EventsBase */ "./src/core/events/EventsBase.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @class
 * @implements EventsBase
 */

var MediaPlayerEvents = /*#__PURE__*/function (_EventsBase) {
  _inherits(MediaPlayerEvents, _EventsBase);

  var _super = _createSuper(MediaPlayerEvents);

  /**
   * @description Public facing external events to be used when developing a player that implements dash.js.
   */
  function MediaPlayerEvents() {
    var _this;

    _classCallCheck(this, MediaPlayerEvents);

    _this = _super.call(this);
    /**
     * Triggered when playback will not start yet
     * as the MPD's availabilityStartTime is in the future.
     * Check delay property in payload to determine time before playback will start.
     * @event MediaPlayerEvents#AST_IN_FUTURE
     */

    _this.AST_IN_FUTURE = 'astInFuture';
    /**
     * Triggered when the BaseURLs have been updated.
     * @event MediaPlayerEvents#BASE_URLS_UPDATED
     */

    _this.BASE_URLS_UPDATED = 'baseUrlsUpdated';
    /**
     * Triggered when the video element's buffer state changes to stalled.
     * Check mediaType in payload to determine type (Video, Audio, FragmentedText).
     * @event MediaPlayerEvents#BUFFER_EMPTY
     */

    _this.BUFFER_EMPTY = 'bufferStalled';
    /**
     * Triggered when the video element's buffer state changes to loaded.
     * Check mediaType in payload to determine type (Video, Audio, FragmentedText).
     * @event MediaPlayerEvents#BUFFER_LOADED
     */

    _this.BUFFER_LOADED = 'bufferLoaded';
    /**
     * Triggered when the video element's buffer state changes, either stalled or loaded. Check payload for state.
     * @event MediaPlayerEvents#BUFFER_LEVEL_STATE_CHANGED
     */

    _this.BUFFER_LEVEL_STATE_CHANGED = 'bufferStateChanged';
    /**
     * Triggered when the buffer level of a media type has been updated
     * @event MediaPlayerEvents#BUFFER_LEVEL_UPDATED
     */

    _this.BUFFER_LEVEL_UPDATED = 'bufferLevelUpdated';
    /**
     * Triggered when a font signalled by a DVB Font Download has been added to the document FontFaceSet interface.
     * @event MediaPlayerEvents#DVB_FONT_DOWNLOAD_ADDED
     */

    _this.DVB_FONT_DOWNLOAD_ADDED = 'dvbFontDownloadAdded';
    /**
     * Triggered when a font signalled by a DVB Font Download has successfully downloaded and the FontFace can be used.
     * @event MediaPlayerEvents#DVB_FONT_DOWNLOAD_COMPLETE
     */

    _this.DVB_FONT_DOWNLOAD_COMPLETE = 'dvbFontDownloadComplete';
    /**
     * Triggered when a font signalled by a DVB Font Download could not be successfully downloaded, so the FontFace will not be used.
     * @event MediaPlayerEvents#DVB_FONT_DOWNLOAD_FAILED
     */

    _this.DVB_FONT_DOWNLOAD_FAILED = 'dvbFontDownloadFailed';
    /**
     * Triggered when a dynamic stream changed to static (transition phase between Live and On-Demand).
     * @event MediaPlayerEvents#DYNAMIC_TO_STATIC
     */

    _this.DYNAMIC_TO_STATIC = 'dynamicToStatic';
    /**
     * Triggered when there is an error from the element or MSE source buffer.
     * @event MediaPlayerEvents#ERROR
     */

    _this.ERROR = 'error';
    /**
     * Triggered when a fragment download has completed.
     * @event MediaPlayerEvents#FRAGMENT_LOADING_COMPLETED
     */

    _this.FRAGMENT_LOADING_COMPLETED = 'fragmentLoadingCompleted';
    /**
     * Triggered when a partial fragment download has completed.
     * @event MediaPlayerEvents#FRAGMENT_LOADING_PROGRESS
     */

    _this.FRAGMENT_LOADING_PROGRESS = 'fragmentLoadingProgress';
    /**
     * Triggered when a fragment download has started.
     * @event MediaPlayerEvents#FRAGMENT_LOADING_STARTED
     */

    _this.FRAGMENT_LOADING_STARTED = 'fragmentLoadingStarted';
    /**
     * Triggered when a fragment download is abandoned due to detection of slow download base on the ABR abandon rule..
     * @event MediaPlayerEvents#FRAGMENT_LOADING_ABANDONED
     */

    _this.FRAGMENT_LOADING_ABANDONED = 'fragmentLoadingAbandoned';
    /**
     * Triggered when {@link module:Debug} logger methods are called.
     * @event MediaPlayerEvents#LOG
     */

    _this.LOG = 'log';
    /**
     * Triggered when the manifest load is started
     * @event MediaPlayerEvents#MANIFEST_LOADING_STARTED
     */

    _this.MANIFEST_LOADING_STARTED = 'manifestLoadingStarted';
    /**
     * Triggered when the manifest loading is finished, providing the request object information
     * @event MediaPlayerEvents#MANIFEST_LOADING_FINISHED
     */

    _this.MANIFEST_LOADING_FINISHED = 'manifestLoadingFinished';
    /**
     * Triggered when the manifest load is complete, providing the payload
     * @event MediaPlayerEvents#MANIFEST_LOADED
     */

    _this.MANIFEST_LOADED = 'manifestLoaded';
    /**
     * Triggered anytime there is a change to the overall metrics.
     * @event MediaPlayerEvents#METRICS_CHANGED
     */

    _this.METRICS_CHANGED = 'metricsChanged';
    /**
     * Triggered when an individual metric is added, updated or cleared.
     * @event MediaPlayerEvents#METRIC_CHANGED
     */

    _this.METRIC_CHANGED = 'metricChanged';
    /**
     * Triggered every time a new metric is added.
     * @event MediaPlayerEvents#METRIC_ADDED
     */

    _this.METRIC_ADDED = 'metricAdded';
    /**
     * Triggered every time a metric is updated.
     * @event MediaPlayerEvents#METRIC_UPDATED
     */

    _this.METRIC_UPDATED = 'metricUpdated';
    /**
     * Triggered when a new stream (period) starts.
     * @event MediaPlayerEvents#PERIOD_SWITCH_STARTED
     */

    _this.PERIOD_SWITCH_STARTED = 'periodSwitchStarted';
    /**
     * Triggered at the stream end of a period.
     * @event MediaPlayerEvents#PERIOD_SWITCH_COMPLETED
     */

    _this.PERIOD_SWITCH_COMPLETED = 'periodSwitchCompleted';
    /**
     * Triggered when an ABR up /down switch is initiated; either by user in manual mode or auto mode via ABR rules.
     * @event MediaPlayerEvents#QUALITY_CHANGE_REQUESTED
     */

    _this.QUALITY_CHANGE_REQUESTED = 'qualityChangeRequested';
    /**
     * Triggered when the new ABR quality is being rendered on-screen.
     * @event MediaPlayerEvents#QUALITY_CHANGE_RENDERED
     */

    _this.QUALITY_CHANGE_RENDERED = 'qualityChangeRendered';
    /**
     * Triggered when the new track is being rendered.
     * @event MediaPlayerEvents#TRACK_CHANGE_RENDERED
     */

    _this.TRACK_CHANGE_RENDERED = 'trackChangeRendered';
    /**
     * Triggered when a stream (period) is being loaded
     * @event MediaPlayerEvents#STREAM_INITIALIZING
     */

    _this.STREAM_INITIALIZING = 'streamInitializing';
    /**
     * Triggered when a stream (period) is loaded
     * @event MediaPlayerEvents#STREAM_UPDATED
     */

    _this.STREAM_UPDATED = 'streamUpdated';
    /**
     * Triggered when a stream (period) is activated
     * @event MediaPlayerEvents#STREAM_ACTIVATED
     */

    _this.STREAM_ACTIVATED = 'streamActivated';
    /**
     * Triggered when a stream (period) is deactivated
     * @event MediaPlayerEvents#STREAM_DEACTIVATED
     */

    _this.STREAM_DEACTIVATED = 'streamDeactivated';
    /**
     * Triggered when a stream (period) is activated
     * @event MediaPlayerEvents#STREAM_INITIALIZED
     */

    _this.STREAM_INITIALIZED = 'streamInitialized';
    /**
     * Triggered when the player has been reset.
     * @event MediaPlayerEvents#STREAM_TEARDOWN_COMPLETE
     */

    _this.STREAM_TEARDOWN_COMPLETE = 'streamTeardownComplete';
    /**
     * Triggered once all text tracks detected in the MPD are added to the video element.
     * @event MediaPlayerEvents#TEXT_TRACKS_ADDED
     */

    _this.TEXT_TRACKS_ADDED = 'allTextTracksAdded';
    /**
     * Triggered when a text track is added to the video element's TextTrackList
     * @event MediaPlayerEvents#TEXT_TRACK_ADDED
     */

    _this.TEXT_TRACK_ADDED = 'textTrackAdded';
    /**
     * Triggered when a text track should be shown
     * @event MediaPlayerEvents#CUE_ENTER
     */

    _this.CUE_ENTER = 'cueEnter';
    /**
     * Triggered when a text track should be hidden
     * @event MediaPlayerEvents#CUE_ENTER
     */

    _this.CUE_EXIT = 'cueExit';
    /**
     * Triggered when a throughput measurement based on the last segment request has been stored
     * @event MediaPlayerEvents#THROUGHPUT_MEASUREMENT_STORED
     */

    _this.THROUGHPUT_MEASUREMENT_STORED = 'throughputMeasurementStored';
    /**
     * Triggered when a ttml chunk is parsed.
     * @event MediaPlayerEvents#TTML_PARSED
     */

    _this.TTML_PARSED = 'ttmlParsed';
    /**
     * Triggered when a ttml chunk has to be parsed.
     * @event MediaPlayerEvents#TTML_TO_PARSE
     */

    _this.TTML_TO_PARSE = 'ttmlToParse';
    /**
     * Triggered when a caption is rendered.
     * @event MediaPlayerEvents#CAPTION_RENDERED
     */

    _this.CAPTION_RENDERED = 'captionRendered';
    /**
     * Triggered when the caption container is resized.
     * @event MediaPlayerEvents#CAPTION_CONTAINER_RESIZE
     */

    _this.CAPTION_CONTAINER_RESIZE = 'captionContainerResize';
    /**
     * Sent when enough data is available that the media can be played,
     * at least for a couple of frames.  This corresponds to the
     * HAVE_ENOUGH_DATA readyState.
     * @event MediaPlayerEvents#CAN_PLAY
     */

    _this.CAN_PLAY = 'canPlay';
    /**
     * This corresponds to the CAN_PLAY_THROUGH readyState.
     * @event MediaPlayerEvents#CAN_PLAY_THROUGH
     */

    _this.CAN_PLAY_THROUGH = 'canPlayThrough';
    /**
     * Sent when playback completes.
     * @event MediaPlayerEvents#PLAYBACK_ENDED
     */

    _this.PLAYBACK_ENDED = 'playbackEnded';
    /**
     * Sent when an error occurs.  The element's error
     * attribute contains more information.
     * @event MediaPlayerEvents#PLAYBACK_ERROR
     */

    _this.PLAYBACK_ERROR = 'playbackError';
    /**
     * Sent when playback is not allowed (for example if user gesture is needed).
     * @event MediaPlayerEvents#PLAYBACK_NOT_ALLOWED
     */

    _this.PLAYBACK_NOT_ALLOWED = 'playbackNotAllowed';
    /**
     * The media's metadata has finished loading; all attributes now
     * contain as much useful information as they're going to.
     * @event MediaPlayerEvents#PLAYBACK_METADATA_LOADED
     */

    _this.PLAYBACK_METADATA_LOADED = 'playbackMetaDataLoaded';
    /**
     * The event is fired when the frame at the current playback position of the media has finished loading;
     * often the first frame
     * @event MediaPlayerEvents#PLAYBACK_LOADED_DATA
     */

    _this.PLAYBACK_LOADED_DATA = 'playbackLoadedData';
    /**
     * Sent when playback is paused.
     * @event MediaPlayerEvents#PLAYBACK_PAUSED
     */

    _this.PLAYBACK_PAUSED = 'playbackPaused';
    /**
     * Sent when the media begins to play (either for the first time, after having been paused,
     * or after ending and then restarting).
     *
     * @event MediaPlayerEvents#PLAYBACK_PLAYING
     */

    _this.PLAYBACK_PLAYING = 'playbackPlaying';
    /**
     * Sent periodically to inform interested parties of progress downloading
     * the media. Information about the current amount of the media that has
     * been downloaded is available in the media element's buffered attribute.
     * @event MediaPlayerEvents#PLAYBACK_PROGRESS
     */

    _this.PLAYBACK_PROGRESS = 'playbackProgress';
    /**
     * Sent when the playback speed changes.
     * @event MediaPlayerEvents#PLAYBACK_RATE_CHANGED
     */

    _this.PLAYBACK_RATE_CHANGED = 'playbackRateChanged';
    /**
     * Sent when a seek operation completes.
     * @event MediaPlayerEvents#PLAYBACK_SEEKED
     */

    _this.PLAYBACK_SEEKED = 'playbackSeeked';
    /**
     * Sent when a seek operation begins.
     * @event MediaPlayerEvents#PLAYBACK_SEEKING
     */

    _this.PLAYBACK_SEEKING = 'playbackSeeking';
    /**
     * Sent when the video element reports stalled
     * @event MediaPlayerEvents#PLAYBACK_STALLED
     */

    _this.PLAYBACK_STALLED = 'playbackStalled';
    /**
     * Sent when playback of the media starts after having been paused;
     * that is, when playback is resumed after a prior pause event.
     *
     * @event MediaPlayerEvents#PLAYBACK_STARTED
     */

    _this.PLAYBACK_STARTED = 'playbackStarted';
    /**
     * The time indicated by the element's currentTime attribute has changed.
     * @event MediaPlayerEvents#PLAYBACK_TIME_UPDATED
     */

    _this.PLAYBACK_TIME_UPDATED = 'playbackTimeUpdated';
    /**
     * Sent when the video element reports that the volume has changed
     * @event MediaPlayerEvents#PLAYBACK_VOLUME_CHANGED
     */

    _this.PLAYBACK_VOLUME_CHANGED = 'playbackVolumeChanged';
    /**
     * Sent when the media playback has stopped because of a temporary lack of data.
     *
     * @event MediaPlayerEvents#PLAYBACK_WAITING
     */

    _this.PLAYBACK_WAITING = 'playbackWaiting';
    /**
     * Manifest validity changed - As a result of an MPD validity expiration event.
     * @event MediaPlayerEvents#MANIFEST_VALIDITY_CHANGED
     */

    _this.MANIFEST_VALIDITY_CHANGED = 'manifestValidityChanged';
    /**
     * Dash events are triggered at their respective start points on the timeline.
     * @event MediaPlayerEvents#EVENT_MODE_ON_START
     */

    _this.EVENT_MODE_ON_START = 'eventModeOnStart';
    /**
     * Dash events are triggered as soon as they were parsed.
     * @event MediaPlayerEvents#EVENT_MODE_ON_RECEIVE
     */

    _this.EVENT_MODE_ON_RECEIVE = 'eventModeOnReceive';
    /**
     * Event that is dispatched whenever the player encounters a potential conformance validation that might lead to unexpected/not optimal behavior
     * @event MediaPlayerEvents#CONFORMANCE_VIOLATION
     */

    _this.CONFORMANCE_VIOLATION = 'conformanceViolation';
    /**
     * Event that is dispatched whenever the player switches to a different representation
     * @event MediaPlayerEvents#REPRESENTATION_SWITCH
     */

    _this.REPRESENTATION_SWITCH = 'representationSwitch';
    /**
     * Event that is dispatched whenever an adaptation set is removed due to all representations not being supported.
     * @event MediaPlayerEvents#ADAPTATION_SET_REMOVED_NO_CAPABILITIES
     */

    _this.ADAPTATION_SET_REMOVED_NO_CAPABILITIES = 'adaptationSetRemovedNoCapabilities';
    /**
     * Triggered when a content steering request has completed.
     * @event MediaPlayerEvents#CONTENT_STEERING_REQUEST_COMPLETED
     */

    _this.CONTENT_STEERING_REQUEST_COMPLETED = 'contentSteeringRequestCompleted';
    /**
     * Triggered when an inband prft (ProducerReferenceTime) boxes has been received.
     * @event MediaPlayerEvents#INBAND_PRFT
     */

    _this.INBAND_PRFT = 'inbandPrft';
    /**
     * The streaming attribute of the Managed Media Source is true
     * @type {string}
     */

    _this.MANAGED_MEDIA_SOURCE_START_STREAMING = 'managedMediaSourceStartStreaming';
    /**
     * The streaming attribute of the Managed Media Source is false
     * @type {string}
     */

    _this.MANAGED_MEDIA_SOURCE_END_STREAMING = 'managedMediaSourceEndStreaming';
    return _this;
  }

  return MediaPlayerEvents;
}(_core_events_EventsBase__WEBPACK_IMPORTED_MODULE_0__["default"]);

var mediaPlayerEvents = new MediaPlayerEvents();
/* harmony default export */ __webpack_exports__["default"] = (mediaPlayerEvents);

/***/ }),

/***/ "./src/streaming/constants/Constants.js":
/*!**********************************************!*\
  !*** ./src/streaming/constants/Constants.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Constants declaration
 * @class
 * @ignore
 * @hideconstructor
 */
var Constants = /*#__PURE__*/function () {
  function Constants() {
    _classCallCheck(this, Constants);

    this.init();
  }

  _createClass(Constants, [{
    key: "init",
    value: function init() {
      /**
       *  @constant {string} STREAM Stream media type. Mainly used to report metrics relative to the full stream
       *  @memberof Constants#
       *  @static
       */
      this.STREAM = 'stream';
      /**
       *  @constant {string} VIDEO Video media type
       *  @memberof Constants#
       *  @static
       */

      this.VIDEO = 'video';
      /**
       *  @constant {string} AUDIO Audio media type
       *  @memberof Constants#
       *  @static
       */

      this.AUDIO = 'audio';
      /**
       *  @constant {string} TEXT Text media type
       *  @memberof Constants#
       *  @static
       */

      this.TEXT = 'text';
      /**
       *  @constant {string} MUXED Muxed (video/audio in the same chunk) media type
       *  @memberof Constants#
       *  @static
       */

      this.MUXED = 'muxed';
      /**
       *  @constant {string} IMAGE Image media type
       *  @memberof Constants#
       *  @static
       */

      this.IMAGE = 'image';
      /**
       *  @constant {string} STPP STTP Subtitles format
       *  @memberof Constants#
       *  @static
       */

      this.STPP = 'stpp';
      /**
       *  @constant {string} TTML STTP Subtitles format
       *  @memberof Constants#
       *  @static
       */

      this.TTML = 'ttml';
      /**
       *  @constant {string} VTT STTP Subtitles format
       *  @memberof Constants#
       *  @static
       */

      this.VTT = 'vtt';
      /**
       *  @constant {string} WVTT STTP Subtitles format
       *  @memberof Constants#
       *  @static
       */

      this.WVTT = 'wvtt';
      /**
       *  @constant {string} Content Steering
       *  @memberof Constants#
       *  @static
       */

      this.CONTENT_STEERING = 'contentSteering';
      /**
       *  @constant {string} ABR_STRATEGY_DYNAMIC Dynamic Adaptive bitrate algorithm
       *  @memberof Constants#
       *  @static
       */

      this.ABR_STRATEGY_DYNAMIC = 'abrDynamic';
      /**
       *  @constant {string} ABR_STRATEGY_BOLA Adaptive bitrate algorithm based on Bola (buffer level)
       *  @memberof Constants#
       *  @static
       */

      this.ABR_STRATEGY_BOLA = 'abrBola';
      /**
       *  @constant {string} ABR_STRATEGY_L2A Adaptive bitrate algorithm based on L2A (online learning)
       *  @memberof Constants#
       *  @static
       */

      this.ABR_STRATEGY_L2A = 'abrL2A';
      /**
       *  @constant {string} ABR_STRATEGY_LoLP Adaptive bitrate algorithm based on LoL+
       *  @memberof Constants#
       *  @static
       */

      this.ABR_STRATEGY_LoLP = 'abrLoLP';
      /**
       *  @constant {string} ABR_STRATEGY_THROUGHPUT Adaptive bitrate algorithm based on throughput
       *  @memberof Constants#
       *  @static
       */

      this.ABR_STRATEGY_THROUGHPUT = 'abrThroughput';
      /**
       *  @constant {string} ABR_FETCH_THROUGHPUT_CALUCUALTION_DOWNLOADED_DATA Throughput calculation based on downloaded data array
       *  @memberof Constants#
       *  @static
       */

      this.ABR_FETCH_THROUGHPUT_CALCULATION_DOWNLOADED_DATA = 'abrFetchThroughputCalculationDownloadedData';
      /**
       *  @constant {string} ABR_FETCH_THROUGHPUT_CALCULATION_MOOF_PARSING Throughput calculation based on moof parsing
       *  @memberof Constants#
       *  @static
       */

      this.ABR_FETCH_THROUGHPUT_CALCULATION_MOOF_PARSING = 'abrFetchThroughputCalculationMoofParsing';
      /**
      *  @constant {string} ABR_FETCH_THROUGHPUT_CALCULATION_AAST Throughput calculation based on adjusted availability start time in low latency mode
      *  @memberof Constants#
      *  @static
      */

      this.ABR_FETCH_THROUGHPUT_CALCULATION_AAST = 'abrFetchThroughputCalculationAAST';
      /**
       *  @constant {string} LIVE_CATCHUP_MODE_DEFAULT Throughput calculation based on moof parsing
       *  @memberof Constants#
       *  @static
       */

      this.LIVE_CATCHUP_MODE_DEFAULT = 'liveCatchupModeDefault';
      /**
       *  @constant {string} LIVE_CATCHUP_MODE_LOLP Throughput calculation based on moof parsing
       *  @memberof Constants#
       *  @static
       */

      this.LIVE_CATCHUP_MODE_LOLP = 'liveCatchupModeLoLP';
      /**
       *  @constant {string} MOVING_AVERAGE_SLIDING_WINDOW Moving average sliding window
       *  @memberof Constants#
       *  @static
       */

      this.MOVING_AVERAGE_SLIDING_WINDOW = 'slidingWindow';
      /**
       *  @constant {string} EWMA Exponential moving average
       *  @memberof Constants#
       *  @static
       */

      this.MOVING_AVERAGE_EWMA = 'ewma';
      /**
       *  @constant {string} BAD_ARGUMENT_ERROR Invalid Arguments type of error
       *  @memberof Constants#
       *  @static
       */

      this.BAD_ARGUMENT_ERROR = 'Invalid Arguments';
      /**
       *  @constant {string} MISSING_CONFIG_ERROR Missing configuration parameters type of error
       *  @memberof Constants#
       *  @static
       */

      this.MISSING_CONFIG_ERROR = 'Missing config parameter(s)';
      /**
       *  @constant {string} TRACK_SWITCH_MODE_ALWAYS_REPLACE used to clear the buffered data (prior to current playback position) after track switch. Default for audio
       *  @memberof Constants#
       *  @static
       */

      this.TRACK_SWITCH_MODE_ALWAYS_REPLACE = 'alwaysReplace';
      /**
       *  @constant {string} TRACK_SWITCH_MODE_NEVER_REPLACE used to forbid clearing the buffered data (prior to current playback position) after track switch. Defers to fastSwitchEnabled for placement of new data. Default for video
       *  @memberof Constants#
       *  @static
       */

      this.TRACK_SWITCH_MODE_NEVER_REPLACE = 'neverReplace';
      /**
       *  @constant {string} TRACK_SELECTION_MODE_FIRST_TRACK makes the player select the first track found in the manifest.
       *  @memberof Constants#
       *  @static
       */

      this.TRACK_SELECTION_MODE_FIRST_TRACK = 'firstTrack';
      /**
       *  @constant {string} TRACK_SELECTION_MODE_HIGHEST_BITRATE makes the player select the track with a highest bitrate. This mode is a default mode.
       *  @memberof Constants#
       *  @static
       */

      this.TRACK_SELECTION_MODE_HIGHEST_BITRATE = 'highestBitrate';
      /**
       *  @constant {string} TRACK_SELECTION_MODE_HIGHEST_EFFICIENCY makes the player select the track with the lowest bitrate per pixel average.
       *  @memberof Constants#
       *  @static
       */

      this.TRACK_SELECTION_MODE_HIGHEST_EFFICIENCY = 'highestEfficiency';
      /**
       *  @constant {string} TRACK_SELECTION_MODE_WIDEST_RANGE makes the player select the track with a widest range of bitrates.
       *  @memberof Constants#
       *  @static
       */

      this.TRACK_SELECTION_MODE_WIDEST_RANGE = 'widestRange';
      /**
       *  @constant {string} TRACK_SELECTION_MODE_WIDEST_RANGE makes the player select the track with the highest selectionPriority as defined in the manifest
       *  @memberof Constants#
       *  @static
       */

      this.TRACK_SELECTION_MODE_HIGHEST_SELECTION_PRIORITY = 'highestSelectionPriority';
      /**
       *  @constant {string} CMCD_MODE_QUERY specifies to attach CMCD metrics as query parameters.
       *  @memberof Constants#
       *  @static
       */

      this.CMCD_MODE_QUERY = 'query';
      /**
       *  @constant {string} CMCD_MODE_HEADER specifies to attach CMCD metrics as HTTP headers.
       *  @memberof Constants#
       *  @static
       */

      this.CMCD_MODE_HEADER = 'header';
      this.INITIALIZE = 'initialize';
      this.TEXT_SHOWING = 'showing';
      this.TEXT_HIDDEN = 'hidden';
      this.TEXT_DISABLED = 'disabled';
      this.CC1 = 'CC1';
      this.CC3 = 'CC3';
      this.UTF8 = 'utf-8';
      this.SCHEME_ID_URI = 'schemeIdUri';
      this.START_TIME = 'starttime';
      this.SERVICE_DESCRIPTION_DVB_LL_SCHEME = 'urn:dvb:dash:lowlatency:scope:2019';
      this.SUPPLEMENTAL_PROPERTY_DVB_LL_SCHEME = 'urn:dvb:dash:lowlatency:critical:2019';
      this.FONT_DOWNLOAD_DVB_SCHEME = 'urn:dvb:dash:fontdownload:2014';
      this.XML = 'XML';
      this.ARRAY_BUFFER = 'ArrayBuffer';
      this.DVB_REPORTING_URL = 'dvb:reportingUrl';
      this.DVB_PROBABILITY = 'dvb:probability';
      this.OFF_MIMETYPE = 'application/font-sfnt';
      this.WOFF_MIMETYPE = 'application/font-woff';
      this.VIDEO_ELEMENT_READY_STATES = {
        HAVE_NOTHING: 0,
        HAVE_METADATA: 1,
        HAVE_CURRENT_DATA: 2,
        HAVE_FUTURE_DATA: 3,
        HAVE_ENOUGH_DATA: 4
      };
      this.FILE_LOADER_TYPES = {
        FETCH: 'fetch_loader',
        XHR: 'xhr_loader'
      };
    }
  }]);

  return Constants;
}();

var constants = new Constants();
/* harmony default export */ __webpack_exports__["default"] = (constants);

/***/ }),

/***/ "./src/streaming/constants/MetricsConstants.js":
/*!*****************************************************!*\
  !*** ./src/streaming/constants/MetricsConstants.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Metrics Constants declaration
 * @class
 * @ignore
 */
var MetricsConstants = /*#__PURE__*/function () {
  function MetricsConstants() {
    _classCallCheck(this, MetricsConstants);

    this.init();
  }

  _createClass(MetricsConstants, [{
    key: "init",
    value: function init() {
      this.TCP_CONNECTION = 'TcpList';
      this.HTTP_REQUEST = 'HttpList';
      this.TRACK_SWITCH = 'RepSwitchList';
      this.BUFFER_LEVEL = 'BufferLevel';
      this.BUFFER_LOADED = 'bufferLoaded';
      this.ABANDON_LOAD = 'abandonload';
      this.ALLOW_LOAD = 'allowload';
      this.BUFFER_EMPTY = 'bufferStalled';
      this.BUFFER_STATE = 'BufferState';
      this.DVR_INFO = 'DVRInfo';
      this.DROPPED_FRAMES = 'DroppedFrames';
      this.SCHEDULING_INFO = 'SchedulingInfo';
      this.REQUESTS_QUEUE = 'RequestsQueue';
      this.MANIFEST_UPDATE = 'ManifestUpdate';
      this.MANIFEST_UPDATE_STREAM_INFO = 'ManifestUpdatePeriodInfo';
      this.MANIFEST_UPDATE_TRACK_INFO = 'ManifestUpdateRepresentationInfo';
      this.PLAY_LIST = 'PlayList';
      this.DVB_ERRORS = 'DVBErrors';
      this.HTTP_REQUEST_DVB_REPORTING_TYPE = 'DVBReporting';
    }
  }]);

  return MetricsConstants;
}();

var constants = new MetricsConstants();
/* harmony default export */ __webpack_exports__["default"] = (constants);

/***/ }),

/***/ "./src/streaming/metrics/MetricsReportingEvents.js":
/*!*********************************************************!*\
  !*** ./src/streaming/metrics/MetricsReportingEvents.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_events_EventsBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/events/EventsBase */ "./src/core/events/EventsBase.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @class
 * @implements EventsBase
 */

var MetricsReportingEvents = /*#__PURE__*/function (_EventsBase) {
  _inherits(MetricsReportingEvents, _EventsBase);

  var _super = _createSuper(MetricsReportingEvents);

  function MetricsReportingEvents() {
    var _this;

    _classCallCheck(this, MetricsReportingEvents);

    _this = _super.call(this);
    _this.METRICS_INITIALISATION_COMPLETE = 'internal_metricsReportingInitialized';
    _this.BECAME_REPORTING_PLAYER = 'internal_becameReportingPlayer';
    /**
     * Triggered when CMCD data was generated for a HTTP request
     * @event MetricsReportingEvents#CMCD_DATA_GENERATED
     */

    _this.CMCD_DATA_GENERATED = 'cmcdDataGenerated';
    return _this;
  }

  return MetricsReportingEvents;
}(_core_events_EventsBase__WEBPACK_IMPORTED_MODULE_0__["default"]);

var metricsReportingEvents = new MetricsReportingEvents();
/* harmony default export */ __webpack_exports__["default"] = (metricsReportingEvents);

/***/ }),

/***/ "./src/streaming/metrics/controllers/MetricsCollectionController.js":
/*!**************************************************************************!*\
  !*** ./src/streaming/metrics/controllers/MetricsCollectionController.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MetricsController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MetricsController */ "./src/streaming/metrics/controllers/MetricsController.js");
/* harmony import */ var _utils_ManifestParsing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/ManifestParsing */ "./src/streaming/metrics/utils/ManifestParsing.js");
/* harmony import */ var _MetricsReportingEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../MetricsReportingEvents */ "./src/streaming/metrics/MetricsReportingEvents.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */




function MetricsCollectionController(config) {
  config = config || {};
  var instance;
  var metricsControllers = {};
  var context = this.context;
  var eventBus = config.eventBus;
  var events = config.events;

  function update(e) {
    if (e.error) {
      return;
    } // start by assuming all existing controllers need removing


    var controllersToRemove = Object.keys(metricsControllers);
    var metrics = (0,_utils_ManifestParsing__WEBPACK_IMPORTED_MODULE_1__["default"])(context).getInstance({
      adapter: config.adapter,
      constants: config.constants
    }).getMetrics(e.manifest);
    metrics.forEach(function (m) {
      var key = JSON.stringify(m);

      if (!metricsControllers.hasOwnProperty(key)) {
        try {
          var controller = (0,_MetricsController__WEBPACK_IMPORTED_MODULE_0__["default"])(context).create(config);
          controller.initialize(m);
          metricsControllers[key] = controller;
        } catch (e) {// fail quietly
        }
      } else {
        // we still need this controller - delete from removal list
        controllersToRemove.splice(key, 1);
      }
    }); // now remove the unwanted controllers

    controllersToRemove.forEach(function (c) {
      metricsControllers[c].reset();
      delete metricsControllers[c];
    });
    eventBus.trigger(_MetricsReportingEvents__WEBPACK_IMPORTED_MODULE_2__["default"].METRICS_INITIALISATION_COMPLETE);
  }

  function resetMetricsControllers() {
    Object.keys(metricsControllers).forEach(function (key) {
      metricsControllers[key].reset();
    });
    metricsControllers = {};
  }

  function setup() {
    eventBus.on(events.MANIFEST_UPDATED, update, instance);
    eventBus.on(events.STREAM_TEARDOWN_COMPLETE, resetMetricsControllers, instance);
  }

  function reset() {
    eventBus.off(events.MANIFEST_UPDATED, update, instance);
    eventBus.off(events.STREAM_TEARDOWN_COMPLETE, resetMetricsControllers, instance);
  }

  instance = {
    reset: reset
  };
  setup();
  return instance;
}

MetricsCollectionController.__dashjs_factory_name = 'MetricsCollectionController';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getClassFactory(MetricsCollectionController));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/metrics/controllers/MetricsController.js":
/*!****************************************************************!*\
  !*** ./src/streaming/metrics/controllers/MetricsController.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RangeController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RangeController */ "./src/streaming/metrics/controllers/RangeController.js");
/* harmony import */ var _ReportingController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReportingController */ "./src/streaming/metrics/controllers/ReportingController.js");
/* harmony import */ var _MetricsHandlersController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MetricsHandlersController */ "./src/streaming/metrics/controllers/MetricsHandlersController.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */




function MetricsController(config) {
  config = config || {};
  var metricsHandlersController, reportingController, rangeController, instance;
  var context = this.context;

  function initialize(metricsEntry) {
    try {
      rangeController = (0,_RangeController__WEBPACK_IMPORTED_MODULE_0__["default"])(context).create({
        mediaElement: config.mediaElement
      });
      rangeController.initialize(metricsEntry.Range);
      reportingController = (0,_ReportingController__WEBPACK_IMPORTED_MODULE_1__["default"])(context).create({
        debug: config.debug,
        metricsConstants: config.metricsConstants,
        mediaPlayerModel: config.mediaPlayerModel
      });
      reportingController.initialize(metricsEntry.Reporting, rangeController);
      metricsHandlersController = (0,_MetricsHandlersController__WEBPACK_IMPORTED_MODULE_2__["default"])(context).create({
        debug: config.debug,
        eventBus: config.eventBus,
        metricsConstants: config.metricsConstants,
        events: config.events
      });
      metricsHandlersController.initialize(metricsEntry.metrics, reportingController);
    } catch (e) {
      reset();
      throw e;
    }
  }

  function reset() {
    if (metricsHandlersController) {
      metricsHandlersController.reset();
    }

    if (reportingController) {
      reportingController.reset();
    }

    if (rangeController) {
      rangeController.reset();
    }
  }

  instance = {
    initialize: initialize,
    reset: reset
  };
  return instance;
}

MetricsController.__dashjs_factory_name = 'MetricsController';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getClassFactory(MetricsController));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/metrics/controllers/MetricsHandlersController.js":
/*!************************************************************************!*\
  !*** ./src/streaming/metrics/controllers/MetricsHandlersController.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _metrics_MetricsHandlerFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metrics/MetricsHandlerFactory */ "./src/streaming/metrics/metrics/MetricsHandlerFactory.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */


function MetricsHandlersController(config) {
  config = config || {};
  var handlers = [];
  var instance;
  var context = this.context;
  var eventBus = config.eventBus;
  var Events = config.events;
  var metricsHandlerFactory = (0,_metrics_MetricsHandlerFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance({
    debug: config.debug,
    eventBus: config.eventBus,
    metricsConstants: config.metricsConstants
  });

  function handle(e) {
    handlers.forEach(function (handler) {
      handler.handleNewMetric(e.metric, e.value, e.mediaType);
    });
  }

  function initialize(metrics, reportingController) {
    metrics.split(',').forEach(function (m, midx, ms) {
      var handler; // there is a bug in ISO23009-1 where the metrics attribute
      // is a comma-separated list but HttpList key can contain a
      // comma enclosed by ().

      if (m.indexOf('(') !== -1 && m.indexOf(')') === -1) {
        var nextm = ms[midx + 1];

        if (nextm && nextm.indexOf('(') === -1 && nextm.indexOf(')') !== -1) {
          m += ',' + nextm; // delete the next metric so forEach does not visit.

          delete ms[midx + 1];
        }
      }

      handler = metricsHandlerFactory.create(m, reportingController);

      if (handler) {
        handlers.push(handler);
      }
    });
    eventBus.on(Events.METRIC_ADDED, handle, instance);
    eventBus.on(Events.METRIC_UPDATED, handle, instance);
  }

  function reset() {
    eventBus.off(Events.METRIC_ADDED, handle, instance);
    eventBus.off(Events.METRIC_UPDATED, handle, instance);
    handlers.forEach(function (handler) {
      return handler.reset();
    });
    handlers = [];
  }

  instance = {
    initialize: initialize,
    reset: reset
  };
  return instance;
}

MetricsHandlersController.__dashjs_factory_name = 'MetricsHandlersController';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getClassFactory(MetricsHandlersController));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/metrics/controllers/RangeController.js":
/*!**************************************************************!*\
  !*** ./src/streaming/metrics/controllers/RangeController.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_CustomTimeRanges__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/CustomTimeRanges */ "./src/streaming/utils/CustomTimeRanges.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */


function RangeController(config) {
  config = config || {};
  var useWallClockTime = false;
  var context = this.context;
  var instance, ranges;
  var mediaElement = config.mediaElement;

  function initialize(rs) {
    if (rs && rs.length) {
      rs.forEach(function (r) {
        var start = r.starttime;
        var end = start + r.duration;
        ranges.add(start, end);
      });
      useWallClockTime = !!rs[0]._useWallClockTime;
    }
  }

  function reset() {
    ranges.clear();
  }

  function setup() {
    ranges = (0,_utils_CustomTimeRanges__WEBPACK_IMPORTED_MODULE_0__["default"])(context).create();
  }

  function isEnabled() {
    var numRanges = ranges.length;
    var time;

    if (!numRanges) {
      return true;
    } // When not present, DASH Metrics reporting is requested
    // for the whole duration of the content.


    time = useWallClockTime ? new Date().getTime() / 1000 : mediaElement.currentTime;

    for (var i = 0; i < numRanges; i += 1) {
      var start = ranges.start(i);
      var end = ranges.end(i);

      if (start <= time && time < end) {
        return true;
      }
    }

    return false;
  }

  instance = {
    initialize: initialize,
    reset: reset,
    isEnabled: isEnabled
  };
  setup();
  return instance;
}

RangeController.__dashjs_factory_name = 'RangeController';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getClassFactory(RangeController));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/metrics/controllers/ReportingController.js":
/*!******************************************************************!*\
  !*** ./src/streaming/metrics/controllers/ReportingController.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _reporting_ReportingFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reporting/ReportingFactory */ "./src/streaming/metrics/reporting/ReportingFactory.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */


function ReportingController(config) {
  var reporters = [];
  var instance;
  var reportingFactory = (0,_reporting_ReportingFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(this.context).getInstance(config);

  function initialize(reporting, rangeController) {
    // "if multiple Reporting elements are present, it is expected that
    // the client processes one of the recognized reporting schemes."
    // to ignore this, and support multiple Reporting per Metric,
    // simply change the 'some' below to 'forEach'
    reporting.some(function (r) {
      var reporter = reportingFactory.create(r, rangeController);

      if (reporter) {
        reporters.push(reporter);
        return true;
      }
    });
  }

  function reset() {
    reporters.forEach(function (r) {
      return r.reset();
    });
    reporters = [];
  }

  function report(type, vos) {
    reporters.forEach(function (r) {
      return r.report(type, vos);
    });
  }

  instance = {
    initialize: initialize,
    reset: reset,
    report: report
  };
  return instance;
}

ReportingController.__dashjs_factory_name = 'ReportingController';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getClassFactory(ReportingController));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/metrics/metrics/MetricsHandlerFactory.js":
/*!****************************************************************!*\
  !*** ./src/streaming/metrics/metrics/MetricsHandlerFactory.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _handlers_BufferLevelHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handlers/BufferLevelHandler */ "./src/streaming/metrics/metrics/handlers/BufferLevelHandler.js");
/* harmony import */ var _handlers_DVBErrorsHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handlers/DVBErrorsHandler */ "./src/streaming/metrics/metrics/handlers/DVBErrorsHandler.js");
/* harmony import */ var _handlers_HttpListHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handlers/HttpListHandler */ "./src/streaming/metrics/metrics/handlers/HttpListHandler.js");
/* harmony import */ var _handlers_GenericMetricHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./handlers/GenericMetricHandler */ "./src/streaming/metrics/metrics/handlers/GenericMetricHandler.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */





function MetricsHandlerFactory(config) {
  config = config || {};
  var instance;
  var logger = config.debug ? config.debug.getLogger(instance) : {}; // group 1: key, [group 3: n [, group 5: type]]

  var keyRegex = /([a-zA-Z]*)(\(([0-9]*)(\,\s*([a-zA-Z]*))?\))?/;
  var context = this.context;
  var knownFactoryProducts = {
    BufferLevel: _handlers_BufferLevelHandler__WEBPACK_IMPORTED_MODULE_0__["default"],
    DVBErrors: _handlers_DVBErrorsHandler__WEBPACK_IMPORTED_MODULE_1__["default"],
    HttpList: _handlers_HttpListHandler__WEBPACK_IMPORTED_MODULE_2__["default"],
    PlayList: _handlers_GenericMetricHandler__WEBPACK_IMPORTED_MODULE_3__["default"],
    RepSwitchList: _handlers_GenericMetricHandler__WEBPACK_IMPORTED_MODULE_3__["default"],
    TcpList: _handlers_GenericMetricHandler__WEBPACK_IMPORTED_MODULE_3__["default"]
  };

  function create(listType, reportingController) {
    var matches = listType.match(keyRegex);
    var handler;

    if (!matches) {
      return;
    }

    try {
      handler = knownFactoryProducts[matches[1]](context).create({
        eventBus: config.eventBus,
        metricsConstants: config.metricsConstants
      });
      handler.initialize(matches[1], reportingController, matches[3], matches[5]);
    } catch (e) {
      handler = null;
      logger.error("MetricsHandlerFactory: Could not create handler for type ".concat(matches[1], " with args ").concat(matches[3], ", ").concat(matches[5], " (").concat(e.message, ")"));
    }

    return handler;
  }

  function register(key, handler) {
    knownFactoryProducts[key] = handler;
  }

  function unregister(key) {
    delete knownFactoryProducts[key];
  }

  instance = {
    create: create,
    register: register,
    unregister: unregister
  };
  return instance;
}

MetricsHandlerFactory.__dashjs_factory_name = 'MetricsHandlerFactory';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getSingletonFactory(MetricsHandlerFactory));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/metrics/metrics/handlers/BufferLevelHandler.js":
/*!**********************************************************************!*\
  !*** ./src/streaming/metrics/metrics/handlers/BufferLevelHandler.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_HandlerHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/HandlerHelpers */ "./src/streaming/metrics/utils/HandlerHelpers.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */


function BufferLevelHandler(config) {
  config = config || {};
  var instance, reportingController, n, name, interval, lastReportedTime;
  var context = this.context;
  var handlerHelpers = (0,_utils_HandlerHelpers__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance();
  var storedVOs = [];
  var metricsConstants = config.metricsConstants;

  function getLowestBufferLevelVO() {
    try {
      return Object.keys(storedVOs).map(function (key) {
        return storedVOs[key];
      }).reduce(function (a, b) {
        return a.level < b.level ? a : b;
      });
    } catch (e) {
      return;
    }
  }

  function intervalCallback() {
    var vo = getLowestBufferLevelVO();

    if (vo) {
      if (lastReportedTime !== vo.t) {
        lastReportedTime = vo.t;
        reportingController.report(name, vo);
      }
    }
  }

  function initialize(basename, rc, n_ms) {
    if (rc) {
      // this will throw if n is invalid, to be
      // caught by the initialize caller.
      n = handlerHelpers.validateN(n_ms);
      reportingController = rc;
      name = handlerHelpers.reconstructFullMetricName(basename, n_ms);
      interval = setInterval(intervalCallback, n);
    }
  }

  function reset() {
    clearInterval(interval);
    interval = null;
    n = 0;
    reportingController = null;
    lastReportedTime = null;
  }

  function handleNewMetric(metric, vo, type) {
    if (metric === metricsConstants.BUFFER_LEVEL) {
      storedVOs[type] = vo;
    }
  }

  instance = {
    initialize: initialize,
    reset: reset,
    handleNewMetric: handleNewMetric
  };
  return instance;
}

BufferLevelHandler.__dashjs_factory_name = 'BufferLevelHandler';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getClassFactory(BufferLevelHandler));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/metrics/metrics/handlers/DVBErrorsHandler.js":
/*!********************************************************************!*\
  !*** ./src/streaming/metrics/metrics/handlers/DVBErrorsHandler.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MetricsReportingEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../MetricsReportingEvents */ "./src/streaming/metrics/MetricsReportingEvents.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */


function DVBErrorsHandler(config) {
  config = config || {};
  var instance, reportingController;
  var eventBus = config.eventBus;
  var metricsConstants = config.metricsConstants;

  function onInitialisationComplete() {
    // we only want to report this once per call to initialize
    eventBus.off(_MetricsReportingEvents__WEBPACK_IMPORTED_MODULE_0__["default"].METRICS_INITIALISATION_COMPLETE, onInitialisationComplete, this); // Note: A Player becoming a reporting Player is itself
    // something which is recorded by the DVBErrors metric.

    eventBus.trigger(_MetricsReportingEvents__WEBPACK_IMPORTED_MODULE_0__["default"].BECAME_REPORTING_PLAYER);
  }

  function initialize(unused, rc) {
    if (rc) {
      reportingController = rc;
      eventBus.on(_MetricsReportingEvents__WEBPACK_IMPORTED_MODULE_0__["default"].METRICS_INITIALISATION_COMPLETE, onInitialisationComplete, this);
    }
  }

  function reset() {
    reportingController = null;
  }

  function handleNewMetric(metric, vo) {
    // simply pass metric straight through
    if (metric === metricsConstants.DVB_ERRORS) {
      if (reportingController) {
        reportingController.report(metric, vo);
      }
    }
  }

  instance = {
    initialize: initialize,
    reset: reset,
    handleNewMetric: handleNewMetric
  };
  return instance;
}

/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getClassFactory(DVBErrorsHandler));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/metrics/metrics/handlers/GenericMetricHandler.js":
/*!************************************************************************!*\
  !*** ./src/streaming/metrics/metrics/handlers/GenericMetricHandler.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @ignore
 */
function GenericMetricHandler() {
  var instance, metricName, reportingController;

  function initialize(name, rc) {
    metricName = name;
    reportingController = rc;
  }

  function reset() {
    reportingController = null;
    metricName = undefined;
  }

  function handleNewMetric(metric, vo) {
    // simply pass metric straight through
    if (metric === metricName) {
      if (reportingController) {
        reportingController.report(metricName, vo);
      }
    }
  }

  instance = {
    initialize: initialize,
    reset: reset,
    handleNewMetric: handleNewMetric
  };
  return instance;
}

GenericMetricHandler.__dashjs_factory_name = 'GenericMetricHandler';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getClassFactory(GenericMetricHandler));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/metrics/metrics/handlers/HttpListHandler.js":
/*!*******************************************************************!*\
  !*** ./src/streaming/metrics/metrics/handlers/HttpListHandler.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_HandlerHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/HandlerHelpers */ "./src/streaming/metrics/utils/HandlerHelpers.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */


function HttpListHandler(config) {
  config = config || {};
  var instance, reportingController, n, type, name, interval;
  var storedVos = [];
  var handlerHelpers = (0,_utils_HandlerHelpers__WEBPACK_IMPORTED_MODULE_0__["default"])(this.context).getInstance();
  var metricsConstants = config.metricsConstants;

  function intervalCallback() {
    var vos = storedVos;

    if (vos.length) {
      if (reportingController) {
        reportingController.report(name, vos);
      }
    }

    storedVos = [];
  }

  function initialize(basename, rc, n_ms, requestType) {
    if (rc) {
      // this will throw if n is invalid, to be
      // caught by the initialize caller.
      n = handlerHelpers.validateN(n_ms);
      reportingController = rc;

      if (requestType && requestType.length) {
        type = requestType;
      }

      name = handlerHelpers.reconstructFullMetricName(basename, n_ms, requestType);
      interval = setInterval(intervalCallback, n);
    }
  }

  function reset() {
    clearInterval(interval);
    interval = null;
    n = null;
    type = null;
    storedVos = [];
    reportingController = null;
  }

  function handleNewMetric(metric, vo) {
    if (metric === metricsConstants.HTTP_REQUEST) {
      if (!type || type === vo.type) {
        storedVos.push(vo);
      }
    }
  }

  instance = {
    initialize: initialize,
    reset: reset,
    handleNewMetric: handleNewMetric
  };
  return instance;
}

HttpListHandler.__dashjs_factory_name = 'HttpListHandler';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getClassFactory(HttpListHandler));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/metrics/reporting/ReportingFactory.js":
/*!*************************************************************!*\
  !*** ./src/streaming/metrics/reporting/ReportingFactory.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _reporters_DVBReporting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reporters/DVBReporting */ "./src/streaming/metrics/reporting/reporters/DVBReporting.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */


function ReportingFactory(config) {
  config = config || {};
  var knownReportingSchemeIdUris = {
    'urn:dvb:dash:reporting:2014': _reporters_DVBReporting__WEBPACK_IMPORTED_MODULE_0__["default"]
  };
  var context = this.context;
  var instance;
  var logger = config.debug ? config.debug.getLogger(instance) : {};
  var metricsConstants = config.metricsConstants;
  var mediaPlayerModel = config.mediaPlayerModel || {};

  function create(entry, rangeController) {
    var reporting;

    try {
      reporting = knownReportingSchemeIdUris[entry.schemeIdUri](context).create({
        metricsConstants: metricsConstants,
        mediaPlayerModel: mediaPlayerModel
      });
      reporting.initialize(entry, rangeController);
    } catch (e) {
      reporting = null;
      logger.error("ReportingFactory: could not create Reporting with schemeIdUri ".concat(entry.schemeIdUri, " (").concat(e.message, ")"));
    }

    return reporting;
  }

  function register(schemeIdUri, moduleName) {
    knownReportingSchemeIdUris[schemeIdUri] = moduleName;
  }

  function unregister(schemeIdUri) {
    delete knownReportingSchemeIdUris[schemeIdUri];
  }

  instance = {
    create: create,
    register: register,
    unregister: unregister
  };
  return instance;
}

ReportingFactory.__dashjs_factory_name = 'ReportingFactory';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getSingletonFactory(ReportingFactory));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/metrics/reporting/reporters/DVBReporting.js":
/*!*******************************************************************!*\
  !*** ./src/streaming/metrics/reporting/reporters/DVBReporting.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_MetricSerialiser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/MetricSerialiser */ "./src/streaming/metrics/utils/MetricSerialiser.js");
/* harmony import */ var _utils_RNG__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/RNG */ "./src/streaming/metrics/utils/RNG.js");
/* harmony import */ var _models_CustomParametersModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../models/CustomParametersModel */ "./src/streaming/models/CustomParametersModel.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */




function DVBReporting(config) {
  config = config || {};
  var instance;
  var context = this.context;
  var metricSerialiser, customParametersModel, randomNumberGenerator, reportingPlayerStatusDecided, isReportingPlayer, reportingUrl, rangeController;
  var USE_DRAFT_DVB_SPEC = true;
  var allowPendingRequestsToCompleteOnReset = true;
  var pendingRequests = [];
  var metricsConstants = config.metricsConstants;

  function setup() {
    metricSerialiser = (0,_utils_MetricSerialiser__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance();
    randomNumberGenerator = (0,_utils_RNG__WEBPACK_IMPORTED_MODULE_1__["default"])(context).getInstance();
    customParametersModel = (0,_models_CustomParametersModel__WEBPACK_IMPORTED_MODULE_2__["default"])(context).getInstance();
    resetInitialSettings();
  }

  function doGetRequest(url, successCB, failureCB) {
    var req = new XMLHttpRequest();
    req.withCredentials = customParametersModel.getXHRWithCredentialsForType(metricsConstants.HTTP_REQUEST_DVB_REPORTING_TYPE);

    var oncomplete = function oncomplete() {
      var reqIndex = pendingRequests.indexOf(req);

      if (reqIndex === -1) {
        return;
      } else {
        pendingRequests.splice(reqIndex, 1);
      }

      if (req.status >= 200 && req.status < 300) {
        if (successCB) {
          successCB();
        }
      } else {
        if (failureCB) {
          failureCB();
        }
      }
    };

    pendingRequests.push(req);

    try {
      req.open('GET', url);
      req.onloadend = oncomplete;
      req.onerror = oncomplete;
      req.send();
    } catch (e) {
      req.onerror();
    }
  }

  function report(type, vos) {
    if (!Array.isArray(vos)) {
      vos = [vos];
    } // If the Player is not a reporting Player, then the Player shall
    // not report any errors.
    // ... In addition to any time restrictions specified by a Range
    // element within the Metrics element.


    if (isReportingPlayer && rangeController.isEnabled()) {
      // This reporting mechanism operates by creating one HTTP GET
      // request for every entry in the top level list of the metric.
      vos.forEach(function (vo) {
        var url = metricSerialiser.serialise(vo); // this has been proposed for errata

        if (USE_DRAFT_DVB_SPEC && type !== metricsConstants.DVB_ERRORS) {
          url = "metricname=".concat(type, "&").concat(url);
        } // Take the value of the @reportingUrl attribute, append a
        // question mark ('?') character and then append the string
        // created in the previous step.


        url = "".concat(reportingUrl, "?").concat(url); // Make an HTTP GET request to the URL contained within the
        // string created in the previous step.

        doGetRequest(url, null, function () {
          // If the Player is unable to make the report, for
          // example because the @reportingUrl is invalid, the
          // host cannot be reached, or an HTTP status code other
          // than one in the 200 series is received, the Player
          // shall cease being a reporting Player for the
          // duration of the MPD.
          isReportingPlayer = false;
        });
      });
    }
  }

  function initialize(entry, rc) {
    var probability;
    rangeController = rc;
    reportingUrl = entry.dvbReportingUrl; // If a required attribute is missing, the Reporting descriptor may
    // be ignored by the Player

    if (!reportingUrl) {
      throw new Error('required parameter missing (dvb:reportingUrl)');
    } // A Player's status, as a reporting Player or not, shall remain
    // static for the duration of the MPD, regardless of MPD updates.
    // (i.e. only calling reset (or failure) changes this state)


    if (!reportingPlayerStatusDecided) {
      probability = entry.dvbProbability; // TS 103 285 Clause 10.12.3.4
      // If the @probability attribute is set to 1000, it shall be a reporting Player.
      // If the @probability attribute is absent it will take the default value of 1000.
      // For any other value of the @probability attribute, it shall decide at random whether to be a
      // reporting Player, such that the probability of being one is @probability/1000.

      if (probability && (probability === 1000 || probability / 1000 >= randomNumberGenerator.random())) {
        isReportingPlayer = true;
      }

      reportingPlayerStatusDecided = true;
    }
  }

  function resetInitialSettings() {
    reportingPlayerStatusDecided = false;
    isReportingPlayer = false;
    reportingUrl = null;
    rangeController = null;
  }

  function reset() {
    if (!allowPendingRequestsToCompleteOnReset) {
      pendingRequests.forEach(function (req) {
        return req.abort();
      });
      pendingRequests = [];
    }

    resetInitialSettings();
  }

  instance = {
    report: report,
    initialize: initialize,
    reset: reset
  };
  setup();
  return instance;
}

DVBReporting.__dashjs_factory_name = 'DVBReporting';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getClassFactory(DVBReporting));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/metrics/utils/DVBErrorsTranslator.js":
/*!************************************************************!*\
  !*** ./src/streaming/metrics/utils/DVBErrorsTranslator.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vo_DVBErrors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vo/DVBErrors */ "./src/streaming/metrics/vo/DVBErrors.js");
/* harmony import */ var _MetricsReportingEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../MetricsReportingEvents */ "./src/streaming/metrics/MetricsReportingEvents.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */



function DVBErrorsTranslator(config) {
  config = config || {};
  var instance, mpd;
  var eventBus = config.eventBus;
  var dashMetrics = config.dashMetrics;
  var metricsConstants = config.metricsConstants; //MediaPlayerEvents have been added to Events in MediaPlayer class

  var Events = config.events;

  function report(vo) {
    var o = new _vo_DVBErrors__WEBPACK_IMPORTED_MODULE_0__["default"]();

    if (!mpd) {
      return;
    }

    for (var key in vo) {
      if (vo.hasOwnProperty(key)) {
        o[key] = vo[key];
      }
    }

    if (!o.mpdurl) {
      o.mpdurl = mpd.originalUrl || mpd.url;
    }

    if (!o.terror) {
      o.terror = new Date();
    }

    dashMetrics.addDVBErrors(o);
  }

  function onManifestUpdate(e) {
    if (e.error) {
      return;
    }

    mpd = e.manifest;
  }

  function onServiceLocationChanged(e) {
    report({
      errorcode: _vo_DVBErrors__WEBPACK_IMPORTED_MODULE_0__["default"].BASE_URL_CHANGED,
      servicelocation: e.entry
    });
  }

  function onBecameReporter() {
    report({
      errorcode: _vo_DVBErrors__WEBPACK_IMPORTED_MODULE_0__["default"].BECAME_REPORTER
    });
  }

  function handleHttpMetric(vo) {
    if (vo.responsecode === 0 || // connection failure - unknown
    vo.responsecode == null || // Generated on .catch() and when uninitialized
    vo.responsecode >= 400 || // HTTP error status code
    vo.responsecode < 100 || // unknown status codes
    vo.responsecode >= 600) {
      // unknown status codes
      report({
        errorcode: vo.responsecode || _vo_DVBErrors__WEBPACK_IMPORTED_MODULE_0__["default"].CONNECTION_ERROR,
        url: vo.url,
        terror: vo.tresponse,
        servicelocation: vo._serviceLocation
      });
    }
  }

  function onMetricEvent(e) {
    switch (e.metric) {
      case metricsConstants.HTTP_REQUEST:
        handleHttpMetric(e.value);
        break;

      default:
        break;
    }
  }

  function onPlaybackError(e) {
    var reason = e.error ? e.error.code : 0;
    var errorcode;

    switch (reason) {
      case MediaError.MEDIA_ERR_NETWORK:
        errorcode = _vo_DVBErrors__WEBPACK_IMPORTED_MODULE_0__["default"].CONNECTION_ERROR;
        break;

      case MediaError.MEDIA_ERR_DECODE:
        errorcode = _vo_DVBErrors__WEBPACK_IMPORTED_MODULE_0__["default"].CORRUPT_MEDIA_OTHER;
        break;

      default:
        return;
    }

    report({
      errorcode: errorcode
    });
  }

  function initialize() {
    eventBus.on(Events.MANIFEST_UPDATED, onManifestUpdate, instance);
    eventBus.on(Events.SERVICE_LOCATION_BASE_URL_BLACKLIST_CHANGED, onServiceLocationChanged, instance);
    eventBus.on(Events.METRIC_ADDED, onMetricEvent, instance);
    eventBus.on(Events.METRIC_UPDATED, onMetricEvent, instance);
    eventBus.on(Events.PLAYBACK_ERROR, onPlaybackError, instance);
    eventBus.on(_MetricsReportingEvents__WEBPACK_IMPORTED_MODULE_1__["default"].BECAME_REPORTING_PLAYER, onBecameReporter, instance);
  }

  function reset() {
    eventBus.off(Events.MANIFEST_UPDATED, onManifestUpdate, instance);
    eventBus.off(Events.SERVICE_LOCATION_BASE_URL_BLACKLIST_CHANGED, onServiceLocationChanged, instance);
    eventBus.off(Events.METRIC_ADDED, onMetricEvent, instance);
    eventBus.off(Events.METRIC_UPDATED, onMetricEvent, instance);
    eventBus.off(Events.PLAYBACK_ERROR, onPlaybackError, instance);
    eventBus.off(_MetricsReportingEvents__WEBPACK_IMPORTED_MODULE_1__["default"].BECAME_REPORTING_PLAYER, onBecameReporter, instance);
  }

  instance = {
    initialize: initialize,
    reset: reset
  };
  return instance;
}

DVBErrorsTranslator.__dashjs_factory_name = 'DVBErrorsTranslator';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getSingletonFactory(DVBErrorsTranslator));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/metrics/utils/HandlerHelpers.js":
/*!*******************************************************!*\
  !*** ./src/streaming/metrics/utils/HandlerHelpers.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @ignore
 */
function HandlerHelpers() {
  return {
    reconstructFullMetricName: function reconstructFullMetricName(key, n, type) {
      var mn = key;

      if (n) {
        mn += '(' + n;

        if (type && type.length) {
          mn += ',' + type;
        }

        mn += ')';
      }

      return mn;
    },
    validateN: function validateN(n_ms) {
      if (!n_ms) {
        throw new Error('missing n');
      }

      if (isNaN(n_ms)) {
        throw new Error('n is NaN');
      } // n is a positive integer is defined to refer to the metric
      // in which the buffer level is recorded every n ms.


      if (n_ms < 0) {
        throw new Error('n must be positive');
      }

      return n_ms;
    }
  };
}

HandlerHelpers.__dashjs_factory_name = 'HandlerHelpers';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getSingletonFactory(HandlerHelpers));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/metrics/utils/ManifestParsing.js":
/*!********************************************************!*\
  !*** ./src/streaming/metrics/utils/ManifestParsing.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vo_Metrics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vo/Metrics */ "./src/streaming/metrics/vo/Metrics.js");
/* harmony import */ var _vo_Range__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/Range */ "./src/streaming/metrics/vo/Range.js");
/* harmony import */ var _vo_Reporting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../vo/Reporting */ "./src/streaming/metrics/vo/Reporting.js");




function ManifestParsing(config) {
  config = config || {};
  var instance;
  var adapter = config.adapter;
  var constants = config.constants;

  function getMetricsRangeStartTime(manifest, dynamic, range) {
    var voPeriods, reportingStartTime;
    var presentationStartTime = 0;

    if (dynamic) {
      // For services with MPD@type='dynamic', the start time is
      // indicated in wall clock time by adding the value of this
      // attribute to the value of the MPD@availabilityStartTime
      // attribute.
      presentationStartTime = adapter.getAvailabilityStartTime(manifest) / 1000;
    } else {
      // For services with MPD@type='static', the start time is indicated
      // in Media Presentation time and is relative to the PeriodStart
      // time of the first Period in this MPD.
      voPeriods = adapter.getRegularPeriods(manifest);

      if (voPeriods.length) {
        presentationStartTime = voPeriods[0].start;
      }
    } // When not present, DASH Metrics collection is
    // requested from the beginning of content
    // consumption.


    reportingStartTime = presentationStartTime;

    if (range && range.hasOwnProperty(constants.START_TIME)) {
      reportingStartTime += range.starttime;
    }

    return reportingStartTime;
  }

  function getMetrics(manifest) {
    var metrics = [];

    if (manifest && manifest.Metrics_asArray) {
      manifest.Metrics_asArray.forEach(function (metric) {
        var metricEntry = new _vo_Metrics__WEBPACK_IMPORTED_MODULE_0__["default"]();
        var isDynamic = adapter.getIsDynamic(manifest);

        if (metric.hasOwnProperty('metrics')) {
          metricEntry.metrics = metric.metrics;
        } else {
          return;
        }

        if (metric.Range_asArray) {
          metric.Range_asArray.forEach(function (range) {
            var rangeEntry = new _vo_Range__WEBPACK_IMPORTED_MODULE_1__["default"]();
            rangeEntry.starttime = getMetricsRangeStartTime(manifest, isDynamic, range);

            if (range.hasOwnProperty('duration')) {
              rangeEntry.duration = range.duration;
            } else {
              // if not present, the value is identical to the
              // Media Presentation duration.
              rangeEntry.duration = adapter.getDuration(manifest);
            }

            rangeEntry._useWallClockTime = isDynamic;
            metricEntry.Range.push(rangeEntry);
          });
        }

        if (metric.Reporting_asArray) {
          metric.Reporting_asArray.forEach(function (reporting) {
            var reportingEntry = new _vo_Reporting__WEBPACK_IMPORTED_MODULE_2__["default"]();

            if (reporting.hasOwnProperty(constants.SCHEME_ID_URI)) {
              reportingEntry.schemeIdUri = reporting.schemeIdUri;
            } else {
              // Invalid Reporting. schemeIdUri must be set. Ignore.
              return;
            }

            if (reporting.hasOwnProperty('value')) {
              reportingEntry.value = reporting.value;
            }

            if (reporting.hasOwnProperty(constants.DVB_REPORTING_URL)) {
              reportingEntry.dvbReportingUrl = reporting[constants.DVB_REPORTING_URL];
            }

            if (reporting.hasOwnProperty(constants.DVB_PROBABILITY)) {
              reportingEntry.dvbProbability = reporting[constants.DVB_PROBABILITY];
            }

            metricEntry.Reporting.push(reportingEntry);
          });
        } else {
          // Invalid Metrics. At least one reporting must be present. Ignore
          return;
        }

        metrics.push(metricEntry);
      });
    }

    return metrics;
  }

  instance = {
    getMetrics: getMetrics
  };
  return instance;
}

ManifestParsing.__dashjs_factory_name = 'ManifestParsing';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getSingletonFactory(ManifestParsing));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/metrics/utils/MetricSerialiser.js":
/*!*********************************************************!*\
  !*** ./src/streaming/metrics/utils/MetricSerialiser.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @ignore
 */
function MetricSerialiser() {
  // For each entry in the top level list within the metric (in the case
  // of the DVBErrors metric each entry corresponds to an "error event"
  // described in clause 10.8.4) the Player shall:
  function serialise(metric) {
    var pairs = [];
    var obj = [];
    var key, value; // Take each (key, value) pair from the metric entry and create a
    // string consisting of the name of the key, followed by an equals
    // ('=') character, followed by the string representation of the
    // value. The string representation of the value is created based
    // on the type of the value following the instructions in Table 22.

    for (key in metric) {
      if (metric.hasOwnProperty(key) && key.indexOf('_') !== 0) {
        value = metric[key]; // we want to ensure that keys still end up in the report
        // even if there is no value

        if (value === undefined || value === null) {
          value = '';
        } // DVB A168 10.12.4 Table 22


        if (Array.isArray(value)) {
          // if trace or similar is null, do not include in output
          if (!value.length) {
            continue;
          }

          obj = [];
          value.forEach(function (v) {
            var isBuiltIn = Object.prototype.toString.call(v).slice(8, -1) !== 'Object';
            obj.push(isBuiltIn ? v : serialise(v));
          });
          value = obj.map(encodeURIComponent).join(',');
        } else if (typeof value === 'string') {
          value = encodeURIComponent(value);
        } else if (value instanceof Date) {
          value = value.toISOString();
        } else if (typeof value === 'number') {
          value = Math.round(value);
        }

        pairs.push(key + '=' + value);
      }
    } // Concatenate the strings created in the previous step with an
    // ampersand ('&') character between each one.


    return pairs.join('&');
  }

  return {
    serialise: serialise
  };
}

MetricSerialiser.__dashjs_factory_name = 'MetricSerialiser';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getSingletonFactory(MetricSerialiser));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/metrics/utils/RNG.js":
/*!********************************************!*\
  !*** ./src/streaming/metrics/utils/RNG.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @ignore
 */
function RNG() {
  // check whether secure random numbers are available. if not, revert to
  // using Math.random
  var crypto = window.crypto || window.msCrypto; // could just as easily use any other array type by changing line below

  var ArrayType = Uint32Array;
  var MAX_VALUE = Math.pow(2, ArrayType.BYTES_PER_ELEMENT * 8) - 1; // currently there is only one client for this code, and that only uses
  // a single random number per initialisation. may want to increase this
  // number if more consumers in the future

  var NUM_RANDOM_NUMBERS = 10;
  var randomNumbers, index, instance;

  function initialize() {
    if (crypto) {
      if (!randomNumbers) {
        randomNumbers = new ArrayType(NUM_RANDOM_NUMBERS);
      }

      crypto.getRandomValues(randomNumbers);
      index = 0;
    }
  }

  function rand(min, max) {
    var r;

    if (!min) {
      min = 0;
    }

    if (!max) {
      max = 1;
    }

    if (crypto) {
      if (index === randomNumbers.length) {
        initialize();
      }

      r = randomNumbers[index] / MAX_VALUE;
      index += 1;
    } else {
      r = Math.random();
    }

    return r * (max - min) + min;
  }

  instance = {
    random: rand
  };
  initialize();
  return instance;
}

RNG.__dashjs_factory_name = 'RNG';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getSingletonFactory(RNG));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/metrics/vo/DVBErrors.js":
/*!***********************************************!*\
  !*** ./src/streaming/metrics/vo/DVBErrors.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @class
 * @ignore
 */
var DVBErrors = function DVBErrors() {
  _classCallCheck(this, DVBErrors);

  this.mpdurl = null; // String - Absolute URL from which the MPD was originally
  // retrieved (MPD updates will not change this value).

  this.errorcode = null; // String - The value of errorcode depends upon the type
  // of error being reported. For an error listed in the
  // ErrorType column below the value is as described in the
  // Value column.
  //
  // ErrorType                                            Value
  // ---------                                            -----
  // HTTP error status code                               HTTP status code
  // Unknown HTTP status code                             HTTP status code
  // SSL connection failed                                "SSL" followed by SSL alert value
  // DNS resolution failed                                "C00"
  // Host unreachable                                     "C01"
  // Connection refused                                   "C02"
  // Connection error – Not otherwise specified           "C03"
  // Corrupt media – ISO BMFF container cannot be parsed  "M00"
  // Corrupt media – Not otherwise specified              "M01"
  // Changing Base URL in use due to errors               "F00"
  // Becoming an error reporting Player                   "S00"

  this.terror = null; // Real-Time - Date and time at which error occurred in UTC,
  // formatted as a combined date and time according to ISO 8601.

  this.url = null; // String - Absolute URL from which data was being requested
  // when this error occurred. If the error report is in relation
  // to corrupt media or changing BaseURL, this may be a null
  // string if the URL from which the media was obtained or
  // which led to the change of BaseURL is no longer known.

  this.ipaddress = null; // String - IP Address which the host name in "url" resolved to.
  // If the error report is in relation to corrupt media or
  // changing BaseURL, this may be a null string if the URL
  // from which the media was obtained or which led to the
  // change of BaseURL is no longer known.

  this.servicelocation = null; // String - The value of the serviceLocation field in the
  // BaseURL being used. In the event of this report indicating
  // a change of BaseURL this is the value from the BaseURL
  // being moved from.
};

DVBErrors.SSL_CONNECTION_FAILED_PREFIX = 'SSL';
DVBErrors.DNS_RESOLUTION_FAILED = 'C00';
DVBErrors.HOST_UNREACHABLE = 'C01';
DVBErrors.CONNECTION_REFUSED = 'C02';
DVBErrors.CONNECTION_ERROR = 'C03';
DVBErrors.CORRUPT_MEDIA_ISOBMFF = 'M00';
DVBErrors.CORRUPT_MEDIA_OTHER = 'M01';
DVBErrors.BASE_URL_CHANGED = 'F00';
DVBErrors.BECAME_REPORTER = 'S00';
/* harmony default export */ __webpack_exports__["default"] = (DVBErrors);

/***/ }),

/***/ "./src/streaming/metrics/vo/Metrics.js":
/*!*********************************************!*\
  !*** ./src/streaming/metrics/vo/Metrics.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @class
 * @ignore
 */
var Metrics = function Metrics() {
  _classCallCheck(this, Metrics);

  this.metrics = '';
  this.Range = [];
  this.Reporting = [];
};

/* harmony default export */ __webpack_exports__["default"] = (Metrics);

/***/ }),

/***/ "./src/streaming/metrics/vo/Range.js":
/*!*******************************************!*\
  !*** ./src/streaming/metrics/vo/Range.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @class
 * @ignore
 */
var Range = function Range() {
  _classCallCheck(this, Range);

  // as defined in ISO23009-1
  this.starttime = 0;
  this.duration = Infinity; // for internal use

  this._useWallClockTime = false;
};

/* harmony default export */ __webpack_exports__["default"] = (Range);

/***/ }),

/***/ "./src/streaming/metrics/vo/Reporting.js":
/*!***********************************************!*\
  !*** ./src/streaming/metrics/vo/Reporting.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @class
 * @ignore
 */
// TS 103 285 Clause 10.12.3.3
var DEFAULT_DVB_PROBABILITY = 1000;

var Reporting = function Reporting() {
  _classCallCheck(this, Reporting);

  this.schemeIdUri = '';
  this.value = ''; // DVB Extensions

  this.dvbReportingUrl = '';
  this.dvbProbability = DEFAULT_DVB_PROBABILITY;
};

/* harmony default export */ __webpack_exports__["default"] = (Reporting);

/***/ }),

/***/ "./src/streaming/models/CustomParametersModel.js":
/*!*******************************************************!*\
  !*** ./src/streaming/models/CustomParametersModel.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dash_vo_UTCTiming__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dash/vo/UTCTiming */ "./src/dash/vo/UTCTiming.js");
/* harmony import */ var _core_FactoryMaker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/FactoryMaker */ "./src/core/FactoryMaker.js");
/* harmony import */ var _core_Settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/Settings */ "./src/core/Settings.js");
/* harmony import */ var _utils_SupervisorTools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/SupervisorTools */ "./src/streaming/utils/SupervisorTools.js");
/* harmony import */ var _rules_abr_ABRRulesCollection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../rules/abr/ABRRulesCollection */ "./src/streaming/rules/abr/ABRRulesCollection.js");
/* harmony import */ var _constants_Constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants/Constants */ "./src/streaming/constants/Constants.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */






var DEFAULT_XHR_WITH_CREDENTIALS = false;

function CustomParametersModel() {
  var instance, utcTimingSources, xhrWithCredentials, licenseRequestFilters, licenseResponseFilters, customCapabilitiesFilters, customInitialTrackSelectionFunction, customAbrRules;
  var context = this.context;
  var settings = (0,_core_Settings__WEBPACK_IMPORTED_MODULE_2__["default"])(context).getInstance();

  function setup() {
    xhrWithCredentials = {
      "default": DEFAULT_XHR_WITH_CREDENTIALS
    };

    _resetInitialSettings();
  }

  function _resetInitialSettings() {
    licenseRequestFilters = [];
    licenseResponseFilters = [];
    customCapabilitiesFilters = [];
    customAbrRules = [];
    customInitialTrackSelectionFunction = null;
    utcTimingSources = [];
  }

  function reset() {
    _resetInitialSettings();
  }

  function setConfig() {}
  /**
   * Registers a custom initial track selection function. Only one function is allowed. Calling this method will overwrite a potentially existing function.
   * @param {function} customFunc - the custom function that returns the initial track
   */


  function setCustomInitialTrackSelectionFunction(customFunc) {
    customInitialTrackSelectionFunction = customFunc;
  }
  /**
   * Resets the custom initial track selection
   */


  function resetCustomInitialTrackSelectionFunction() {
    customInitialTrackSelectionFunction = null;
  }
  /**
   * Returns the initial track selection function
   * @return {function}
   */


  function getCustomInitialTrackSelectionFunction() {
    return customInitialTrackSelectionFunction;
  }
  /**
   * Returns all license request filters
   * @return {array}
   */


  function getLicenseRequestFilters() {
    return licenseRequestFilters;
  }
  /**
   * Returns all license response filters
   * @return {array}
   */


  function getLicenseResponseFilters() {
    return licenseResponseFilters;
  }
  /**
   * Registers a license request filter. This enables application to manipulate/overwrite any request parameter and/or request data.
   * The provided callback function shall return a promise that shall be resolved once the filter process is completed.
   * The filters are applied in the order they are registered.
   * @param {function} filter - the license request filter callback
   */


  function registerLicenseRequestFilter(filter) {
    licenseRequestFilters.push(filter);
  }
  /**
   * Registers a license response filter. This enables application to manipulate/overwrite the response data
   * The provided callback function shall return a promise that shall be resolved once the filter process is completed.
   * The filters are applied in the order they are registered.
   * @param {function} filter - the license response filter callback
   */


  function registerLicenseResponseFilter(filter) {
    licenseResponseFilters.push(filter);
  }
  /**
   * Unregisters a license request filter.
   * @param {function} filter - the license request filter callback
   */


  function unregisterLicenseRequestFilter(filter) {
    _unregisterFilter(licenseRequestFilters, filter);
  }
  /**
   * Unregisters a license response filter.
   * @param {function} filter - the license response filter callback
   */


  function unregisterLicenseResponseFilter(filter) {
    _unregisterFilter(licenseResponseFilters, filter);
  }
  /**
   * Returns all custom capabilities filter
   * @return {array}
   */


  function getCustomCapabilitiesFilters() {
    return customCapabilitiesFilters;
  }
  /**
   * Registers a custom capabilities filter. This enables application to filter representations to use.
   * The provided callback function shall return a boolean based on whether or not to use the representation.
   * The filters are applied in the order they are registered.
   * @param {function} filter - the custom capabilities filter callback
   */


  function registerCustomCapabilitiesFilter(filter) {
    customCapabilitiesFilters.push(filter);
  }
  /**
   * Unregisters a custom capabilities filter.
   * @param {function} filter - the custom capabilities filter callback
   */


  function unregisterCustomCapabilitiesFilter(filter) {
    _unregisterFilter(customCapabilitiesFilters, filter);
  }
  /**
   * Unregister a filter from the list of existing filers.
   * @param {array} filters
   * @param {function} filter
   * @private
   */


  function _unregisterFilter(filters, filter) {
    var index = -1;
    filters.some(function (item, i) {
      if (item === filter) {
        index = i;
        return true;
      }
    });
    if (index < 0) return;
    filters.splice(index, 1);
  }
  /**
   * Iterate through the list of custom ABR rules and find the right rule by name
   * @param {string} rulename
   * @return {number} rule number
   */


  function _findAbrCustomRuleIndex(rulename) {
    var i;

    for (i = 0; i < customAbrRules.length; i++) {
      if (customAbrRules[i].rulename === rulename) {
        return i;
      }
    }

    return -1;
  }
  /**
   * Add a custom ABR Rule
   * Rule will be apply on next stream if a stream is being played
   *
   * @param {string} type - rule type (one of ['qualitySwitchRules','abandonFragmentRules'])
   * @param {string} rulename - name of rule (used to identify custom rule). If one rule of same name has been added, then existing rule will be updated
   * @param {object} rule - the rule object instance
   * @throws {@link Constants#BAD_ARGUMENT_ERROR BAD_ARGUMENT_ERROR} if called with invalid arguments.
   */


  function addAbrCustomRule(type, rulename, rule) {
    if (typeof type !== 'string' || type !== _rules_abr_ABRRulesCollection__WEBPACK_IMPORTED_MODULE_4__["default"].ABANDON_FRAGMENT_RULES && type !== _rules_abr_ABRRulesCollection__WEBPACK_IMPORTED_MODULE_4__["default"].QUALITY_SWITCH_RULES || typeof rulename !== 'string') {
      throw _constants_Constants__WEBPACK_IMPORTED_MODULE_5__["default"].BAD_ARGUMENT_ERROR;
    }

    var index = _findAbrCustomRuleIndex(rulename);

    if (index === -1) {
      // add rule
      customAbrRules.push({
        type: type,
        rulename: rulename,
        rule: rule
      });
    } else {
      // update rule
      customAbrRules[index].type = type;
      customAbrRules[index].rule = rule;
    }
  }
  /**
   * Remove a custom ABR Rule
   *
   * @param {string} rulename - name of the rule to be removed
   */


  function removeAbrCustomRule(rulename) {
    if (rulename) {
      var index = _findAbrCustomRuleIndex(rulename); //if no rulename custom rule has been found, do nothing


      if (index !== -1) {
        // remove rule
        customAbrRules.splice(index, 1);
      }
    } else {
      //if no rulename is defined, remove all ABR custome rules
      customAbrRules = [];
    }
  }
  /**
   * Remove all custom rules
   */


  function removeAllAbrCustomRule() {
    customAbrRules = [];
  }
  /**
   * Return all ABR custom rules
   * @return {array}
   */


  function getAbrCustomRules() {
    return customAbrRules;
  }
  /**
   * Add a UTC timing source at the top of the list
   * @param {string} schemeIdUri
   * @param {string} value
   */


  function addUTCTimingSource(schemeIdUri, value) {
    removeUTCTimingSource(schemeIdUri, value); //check if it already exists and remove if so.

    var vo = new _dash_vo_UTCTiming__WEBPACK_IMPORTED_MODULE_0__["default"]();
    vo.schemeIdUri = schemeIdUri;
    vo.value = value;
    utcTimingSources.push(vo);
  }
  /**
   * Return all UTC timing sources
   * @return {array}
   */


  function getUTCTimingSources() {
    return utcTimingSources;
  }
  /**
   * Remove a specific timing source from the array
   * @param {string} schemeIdUri
   * @param {string} value
   */


  function removeUTCTimingSource(schemeIdUri, value) {
    (0,_utils_SupervisorTools__WEBPACK_IMPORTED_MODULE_3__.checkParameterType)(schemeIdUri, 'string');
    (0,_utils_SupervisorTools__WEBPACK_IMPORTED_MODULE_3__.checkParameterType)(value, 'string');
    utcTimingSources.forEach(function (obj, idx) {
      if (obj.schemeIdUri === schemeIdUri && obj.value === value) {
        utcTimingSources.splice(idx, 1);
      }
    });
  }
  /**
   * Remove all timing sources
   */


  function clearDefaultUTCTimingSources() {
    utcTimingSources = [];
  }
  /**
   * Add the default timing source to the list
   */


  function restoreDefaultUTCTimingSources() {
    var defaultUtcTimingSource = settings.get().streaming.utcSynchronization.defaultTimingSource;
    addUTCTimingSource(defaultUtcTimingSource.scheme, defaultUtcTimingSource.value);
  }

  function setXHRWithCredentialsForType(type, value) {
    if (!type) {
      Object.keys(xhrWithCredentials).forEach(function (key) {
        setXHRWithCredentialsForType(key, value);
      });
    } else {
      xhrWithCredentials[type] = !!value;
    }
  }

  function getXHRWithCredentialsForType(type) {
    var useCreds = xhrWithCredentials[type];
    return useCreds === undefined ? xhrWithCredentials["default"] : useCreds;
  }

  instance = {
    getCustomInitialTrackSelectionFunction: getCustomInitialTrackSelectionFunction,
    setCustomInitialTrackSelectionFunction: setCustomInitialTrackSelectionFunction,
    resetCustomInitialTrackSelectionFunction: resetCustomInitialTrackSelectionFunction,
    getLicenseResponseFilters: getLicenseResponseFilters,
    getLicenseRequestFilters: getLicenseRequestFilters,
    getCustomCapabilitiesFilters: getCustomCapabilitiesFilters,
    registerCustomCapabilitiesFilter: registerCustomCapabilitiesFilter,
    registerLicenseResponseFilter: registerLicenseResponseFilter,
    registerLicenseRequestFilter: registerLicenseRequestFilter,
    unregisterCustomCapabilitiesFilter: unregisterCustomCapabilitiesFilter,
    unregisterLicenseResponseFilter: unregisterLicenseResponseFilter,
    unregisterLicenseRequestFilter: unregisterLicenseRequestFilter,
    addAbrCustomRule: addAbrCustomRule,
    removeAllAbrCustomRule: removeAllAbrCustomRule,
    removeAbrCustomRule: removeAbrCustomRule,
    getAbrCustomRules: getAbrCustomRules,
    addUTCTimingSource: addUTCTimingSource,
    removeUTCTimingSource: removeUTCTimingSource,
    getUTCTimingSources: getUTCTimingSources,
    clearDefaultUTCTimingSources: clearDefaultUTCTimingSources,
    restoreDefaultUTCTimingSources: restoreDefaultUTCTimingSources,
    setXHRWithCredentialsForType: setXHRWithCredentialsForType,
    getXHRWithCredentialsForType: getXHRWithCredentialsForType,
    setConfig: setConfig,
    reset: reset
  };
  setup();
  return instance;
}

CustomParametersModel.__dashjs_factory_name = 'CustomParametersModel';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker__WEBPACK_IMPORTED_MODULE_1__["default"].getSingletonFactory(CustomParametersModel));

/***/ }),

/***/ "./src/streaming/rules/SwitchRequest.js":
/*!**********************************************!*\
  !*** ./src/streaming/rules/SwitchRequest.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_FactoryMaker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/FactoryMaker */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

var NO_CHANGE = -1;
var PRIORITY = {
  DEFAULT: 0.5,
  STRONG: 1,
  WEAK: 0
};

function SwitchRequest(q, r, p) {
  //TODO refactor all the calls to this to use config to be like everything else.
  var instance, quality, priority, reason; // check priority value

  function getPriority(p) {
    var ret = PRIORITY.DEFAULT; // check that p is one of declared priority value

    if (p === PRIORITY.DEFAULT || p === PRIORITY.STRONG || p === PRIORITY.WEAK) {
      ret = p;
    }

    return ret;
  } // init attributes


  quality = q === undefined ? NO_CHANGE : q;
  priority = getPriority(p);
  reason = r === undefined ? null : r;
  instance = {
    quality: quality,
    reason: reason,
    priority: priority
  };
  return instance;
}

SwitchRequest.__dashjs_factory_name = 'SwitchRequest';
var factory = _core_FactoryMaker__WEBPACK_IMPORTED_MODULE_0__["default"].getClassFactory(SwitchRequest);
factory.NO_CHANGE = NO_CHANGE;
factory.PRIORITY = PRIORITY;
_core_FactoryMaker__WEBPACK_IMPORTED_MODULE_0__["default"].updateClassFactory(SwitchRequest.__dashjs_factory_name, factory);
/* harmony default export */ __webpack_exports__["default"] = (factory);

/***/ }),

/***/ "./src/streaming/rules/abr/ABRRulesCollection.js":
/*!*******************************************************!*\
  !*** ./src/streaming/rules/abr/ABRRulesCollection.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ThroughputRule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ThroughputRule */ "./src/streaming/rules/abr/ThroughputRule.js");
/* harmony import */ var _InsufficientBufferRule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InsufficientBufferRule */ "./src/streaming/rules/abr/InsufficientBufferRule.js");
/* harmony import */ var _AbandonRequestsRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AbandonRequestsRule */ "./src/streaming/rules/abr/AbandonRequestsRule.js");
/* harmony import */ var _DroppedFramesRule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DroppedFramesRule */ "./src/streaming/rules/abr/DroppedFramesRule.js");
/* harmony import */ var _SwitchHistoryRule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SwitchHistoryRule */ "./src/streaming/rules/abr/SwitchHistoryRule.js");
/* harmony import */ var _BolaRule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BolaRule */ "./src/streaming/rules/abr/BolaRule.js");
/* harmony import */ var _L2ARule_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./L2ARule.js */ "./src/streaming/rules/abr/L2ARule.js");
/* harmony import */ var _lolp_LoLpRule_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lolp/LoLpRule.js */ "./src/streaming/rules/abr/lolp/LoLpRule.js");
/* harmony import */ var _core_FactoryMaker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../core/FactoryMaker */ "./src/core/FactoryMaker.js");
/* harmony import */ var _SwitchRequest__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../SwitchRequest */ "./src/streaming/rules/SwitchRequest.js");
/* harmony import */ var _constants_Constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../constants/Constants */ "./src/streaming/constants/Constants.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */











var QUALITY_SWITCH_RULES = 'qualitySwitchRules';
var ABANDON_FRAGMENT_RULES = 'abandonFragmentRules';

function ABRRulesCollection(config) {
  config = config || {};
  var context = this.context;
  var mediaPlayerModel = config.mediaPlayerModel;
  var customParametersModel = config.customParametersModel;
  var dashMetrics = config.dashMetrics;
  var settings = config.settings;
  var instance, qualitySwitchRules, abandonFragmentRules;

  function initialize() {
    qualitySwitchRules = [];
    abandonFragmentRules = [];

    if (settings.get().streaming.abr.useDefaultABRRules) {
      // If L2A is used we only need this one rule
      if (settings.get().streaming.abr.ABRStrategy === _constants_Constants__WEBPACK_IMPORTED_MODULE_10__["default"].ABR_STRATEGY_L2A) {
        qualitySwitchRules.push((0,_L2ARule_js__WEBPACK_IMPORTED_MODULE_6__["default"])(context).create({
          dashMetrics: dashMetrics,
          settings: settings
        }));
      } // If LoLP is used we only need this one rule
      else if (settings.get().streaming.abr.ABRStrategy === _constants_Constants__WEBPACK_IMPORTED_MODULE_10__["default"].ABR_STRATEGY_LoLP) {
        qualitySwitchRules.push((0,_lolp_LoLpRule_js__WEBPACK_IMPORTED_MODULE_7__["default"])(context).create({
          dashMetrics: dashMetrics
        }));
      } else {
        // Only one of BolaRule and ThroughputRule will give a switchRequest.quality !== SwitchRequest.NO_CHANGE.
        // This is controlled by useBufferOccupancyABR mechanism in AbrController.
        qualitySwitchRules.push((0,_BolaRule__WEBPACK_IMPORTED_MODULE_5__["default"])(context).create({
          dashMetrics: dashMetrics,
          mediaPlayerModel: mediaPlayerModel,
          settings: settings
        }));
        qualitySwitchRules.push((0,_ThroughputRule__WEBPACK_IMPORTED_MODULE_0__["default"])(context).create({
          dashMetrics: dashMetrics
        }));

        if (settings.get().streaming.abr.additionalAbrRules.insufficientBufferRule) {
          qualitySwitchRules.push((0,_InsufficientBufferRule__WEBPACK_IMPORTED_MODULE_1__["default"])(context).create({
            dashMetrics: dashMetrics,
            settings: settings
          }));
        }

        if (settings.get().streaming.abr.additionalAbrRules.switchHistoryRule) {
          qualitySwitchRules.push((0,_SwitchHistoryRule__WEBPACK_IMPORTED_MODULE_4__["default"])(context).create());
        }

        if (settings.get().streaming.abr.additionalAbrRules.droppedFramesRule) {
          qualitySwitchRules.push((0,_DroppedFramesRule__WEBPACK_IMPORTED_MODULE_3__["default"])(context).create());
        }

        if (settings.get().streaming.abr.additionalAbrRules.abandonRequestsRule) {
          abandonFragmentRules.push((0,_AbandonRequestsRule__WEBPACK_IMPORTED_MODULE_2__["default"])(context).create({
            dashMetrics: dashMetrics,
            mediaPlayerModel: mediaPlayerModel,
            settings: settings
          }));
        }
      }
    } // add custom ABR rules if any


    var customRules = customParametersModel.getAbrCustomRules();
    customRules.forEach(function (rule) {
      if (rule.type === QUALITY_SWITCH_RULES) {
        qualitySwitchRules.push(rule.rule(context).create());
      }

      if (rule.type === ABANDON_FRAGMENT_RULES) {
        abandonFragmentRules.push(rule.rule(context).create());
      }
    });
  }

  function _getRulesWithChange(srArray) {
    return srArray.filter(function (sr) {
      return sr.quality > _SwitchRequest__WEBPACK_IMPORTED_MODULE_9__["default"].NO_CHANGE;
    });
  }
  /**
   *
   * @param {array} srArray
   * @return {object} SwitchRequest
   */


  function getMinSwitchRequest(srArray) {
    var values = {};
    var newSwitchReq = null;
    var i, len, req, quality, reason;

    if (srArray.length === 0) {
      return;
    }

    values[_SwitchRequest__WEBPACK_IMPORTED_MODULE_9__["default"].PRIORITY.STRONG] = {
      quality: _SwitchRequest__WEBPACK_IMPORTED_MODULE_9__["default"].NO_CHANGE,
      reason: null
    };
    values[_SwitchRequest__WEBPACK_IMPORTED_MODULE_9__["default"].PRIORITY.WEAK] = {
      quality: _SwitchRequest__WEBPACK_IMPORTED_MODULE_9__["default"].NO_CHANGE,
      reason: null
    };
    values[_SwitchRequest__WEBPACK_IMPORTED_MODULE_9__["default"].PRIORITY.DEFAULT] = {
      quality: _SwitchRequest__WEBPACK_IMPORTED_MODULE_9__["default"].NO_CHANGE,
      reason: null
    };

    for (i = 0, len = srArray.length; i < len; i += 1) {
      req = srArray[i];

      if (req.quality !== _SwitchRequest__WEBPACK_IMPORTED_MODULE_9__["default"].NO_CHANGE) {
        // We only use the new quality in case it is lower than the already saved one or if no new quality has been selected for the respective priority
        if (values[req.priority].quality === _SwitchRequest__WEBPACK_IMPORTED_MODULE_9__["default"].NO_CHANGE || values[req.priority].quality > req.quality) {
          values[req.priority].quality = req.quality;
          values[req.priority].reason = req.reason || null;
        }
      }
    }

    if (values[_SwitchRequest__WEBPACK_IMPORTED_MODULE_9__["default"].PRIORITY.WEAK].quality !== _SwitchRequest__WEBPACK_IMPORTED_MODULE_9__["default"].NO_CHANGE) {
      newSwitchReq = values[_SwitchRequest__WEBPACK_IMPORTED_MODULE_9__["default"].PRIORITY.WEAK];
    }

    if (values[_SwitchRequest__WEBPACK_IMPORTED_MODULE_9__["default"].PRIORITY.DEFAULT].quality !== _SwitchRequest__WEBPACK_IMPORTED_MODULE_9__["default"].NO_CHANGE) {
      newSwitchReq = values[_SwitchRequest__WEBPACK_IMPORTED_MODULE_9__["default"].PRIORITY.DEFAULT];
    }

    if (values[_SwitchRequest__WEBPACK_IMPORTED_MODULE_9__["default"].PRIORITY.STRONG].quality !== _SwitchRequest__WEBPACK_IMPORTED_MODULE_9__["default"].NO_CHANGE) {
      newSwitchReq = values[_SwitchRequest__WEBPACK_IMPORTED_MODULE_9__["default"].PRIORITY.STRONG];
    }

    if (newSwitchReq) {
      quality = newSwitchReq.quality;
      reason = newSwitchReq.reason;
    }

    return (0,_SwitchRequest__WEBPACK_IMPORTED_MODULE_9__["default"])(context).create(quality, reason);
  }

  function getMaxQuality(rulesContext) {
    var switchRequestArray = qualitySwitchRules.map(function (rule) {
      return rule.getMaxIndex(rulesContext);
    });

    var activeRules = _getRulesWithChange(switchRequestArray);

    var maxQuality = getMinSwitchRequest(activeRules);
    return maxQuality || (0,_SwitchRequest__WEBPACK_IMPORTED_MODULE_9__["default"])(context).create();
  }

  function shouldAbandonFragment(rulesContext, streamId) {
    var abandonRequestArray = abandonFragmentRules.map(function (rule) {
      return rule.shouldAbandon(rulesContext, streamId);
    });

    var activeRules = _getRulesWithChange(abandonRequestArray);

    var shouldAbandon = getMinSwitchRequest(activeRules);

    if (shouldAbandon) {
      shouldAbandon.reason.forceAbandon = true;
    }

    return shouldAbandon || (0,_SwitchRequest__WEBPACK_IMPORTED_MODULE_9__["default"])(context).create();
  }

  function reset() {
    [qualitySwitchRules, abandonFragmentRules].forEach(function (rules) {
      if (rules && rules.length) {
        rules.forEach(function (rule) {
          return rule.reset && rule.reset();
        });
      }
    });
    qualitySwitchRules = [];
    abandonFragmentRules = [];
  }

  function getQualitySwitchRules() {
    return qualitySwitchRules;
  }

  instance = {
    initialize: initialize,
    reset: reset,
    getMaxQuality: getMaxQuality,
    getMinSwitchRequest: getMinSwitchRequest,
    shouldAbandonFragment: shouldAbandonFragment,
    getQualitySwitchRules: getQualitySwitchRules
  };
  return instance;
}

ABRRulesCollection.__dashjs_factory_name = 'ABRRulesCollection';
var factory = _core_FactoryMaker__WEBPACK_IMPORTED_MODULE_8__["default"].getClassFactory(ABRRulesCollection);
factory.QUALITY_SWITCH_RULES = QUALITY_SWITCH_RULES;
factory.ABANDON_FRAGMENT_RULES = ABANDON_FRAGMENT_RULES;
_core_FactoryMaker__WEBPACK_IMPORTED_MODULE_8__["default"].updateSingletonFactory(ABRRulesCollection.__dashjs_factory_name, factory);
/* harmony default export */ __webpack_exports__["default"] = (factory);

/***/ }),

/***/ "./src/streaming/rules/abr/AbandonRequestsRule.js":
/*!********************************************************!*\
  !*** ./src/streaming/rules/abr/AbandonRequestsRule.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SwitchRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../SwitchRequest */ "./src/streaming/rules/SwitchRequest.js");
/* harmony import */ var _core_FactoryMaker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/FactoryMaker */ "./src/core/FactoryMaker.js");
/* harmony import */ var _core_Debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/Debug */ "./src/core/Debug.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */




function AbandonRequestsRule(config) {
  config = config || {};
  var context = this.context;
  var mediaPlayerModel = config.mediaPlayerModel;
  var dashMetrics = config.dashMetrics;
  var settings = config.settings;
  var instance, logger, fragmentDict, abandonDict, throughputArray;

  function setup() {
    logger = (0,_core_Debug__WEBPACK_IMPORTED_MODULE_2__["default"])(context).getInstance().getLogger(instance);
    reset();
  }

  function setFragmentRequestDict(type, id) {
    fragmentDict[type] = fragmentDict[type] || {};
    fragmentDict[type][id] = fragmentDict[type][id] || {};
  }

  function storeLastRequestThroughputByType(type, throughput) {
    throughputArray[type] = throughputArray[type] || [];
    throughputArray[type].push(throughput);
  }

  function shouldAbandon(rulesContext) {
    var switchRequest = (0,_SwitchRequest__WEBPACK_IMPORTED_MODULE_0__["default"])(context).create(_SwitchRequest__WEBPACK_IMPORTED_MODULE_0__["default"].NO_CHANGE, {
      name: AbandonRequestsRule.__dashjs_factory_name
    });

    if (!rulesContext || !rulesContext.hasOwnProperty('getMediaInfo') || !rulesContext.hasOwnProperty('getMediaType') || !rulesContext.hasOwnProperty('getCurrentRequest') || !rulesContext.hasOwnProperty('getRepresentationInfo') || !rulesContext.hasOwnProperty('getAbrController')) {
      return switchRequest;
    }

    var mediaInfo = rulesContext.getMediaInfo();
    var mediaType = rulesContext.getMediaType();
    var streamInfo = rulesContext.getStreamInfo();
    var streamId = streamInfo ? streamInfo.id : null;
    var req = rulesContext.getCurrentRequest();

    if (!isNaN(req.index)) {
      setFragmentRequestDict(mediaType, req.index);
      var stableBufferTime = mediaPlayerModel.getStableBufferTime();
      var bufferLevel = dashMetrics.getCurrentBufferLevel(mediaType);

      if (bufferLevel > stableBufferTime) {
        return switchRequest;
      }

      var fragmentInfo = fragmentDict[mediaType][req.index];

      if (fragmentInfo === null || req.firstByteDate === null || abandonDict.hasOwnProperty(fragmentInfo.id)) {
        return switchRequest;
      } //setup some init info based on first progress event


      if (fragmentInfo.firstByteTime === undefined) {
        throughputArray[mediaType] = [];
        fragmentInfo.firstByteTime = req.firstByteDate.getTime();
        fragmentInfo.segmentDuration = req.duration;
        fragmentInfo.bytesTotal = req.bytesTotal;
        fragmentInfo.id = req.index;
      }

      fragmentInfo.bytesLoaded = req.bytesLoaded;
      fragmentInfo.elapsedTime = new Date().getTime() - fragmentInfo.firstByteTime;

      if (fragmentInfo.bytesLoaded > 0 && fragmentInfo.elapsedTime > 0) {
        storeLastRequestThroughputByType(mediaType, Math.round(fragmentInfo.bytesLoaded * 8 / fragmentInfo.elapsedTime));
      }

      if (throughputArray[mediaType].length >= settings.get().streaming.abr.abrRulesParameters.abandonRequestsRule.minLengthToAverage && fragmentInfo.elapsedTime > settings.get().streaming.abr.abrRulesParameters.abandonRequestsRule.graceTimeThreshold && fragmentInfo.bytesLoaded < fragmentInfo.bytesTotal) {
        var totalSampledValue = throughputArray[mediaType].reduce(function (a, b) {
          return a + b;
        }, 0);
        fragmentInfo.measuredBandwidthInKbps = Math.round(totalSampledValue / throughputArray[mediaType].length);
        fragmentInfo.estimatedTimeOfDownload = +(fragmentInfo.bytesTotal * 8 / fragmentInfo.measuredBandwidthInKbps / 1000).toFixed(2);

        if (fragmentInfo.estimatedTimeOfDownload < fragmentInfo.segmentDuration * settings.get().streaming.abr.abrRulesParameters.abandonRequestsRule.abandonMultiplier || rulesContext.getRepresentationInfo().quality === 0) {
          return switchRequest;
        } else if (!abandonDict.hasOwnProperty(fragmentInfo.id)) {
          var abrController = rulesContext.getAbrController();
          var bytesRemaining = fragmentInfo.bytesTotal - fragmentInfo.bytesLoaded;
          var bitrateList = abrController.getBitrateList(mediaInfo);
          var quality = abrController.getQualityForBitrate(mediaInfo, fragmentInfo.measuredBandwidthInKbps * settings.get().streaming.abr.bandwidthSafetyFactor, streamId);
          var minQuality = abrController.getMinAllowedIndexFor(mediaType, streamId);
          var newQuality = minQuality !== undefined ? Math.max(minQuality, quality) : quality;
          var estimateOtherBytesTotal = fragmentInfo.bytesTotal * bitrateList[newQuality].bitrate / bitrateList[abrController.getQualityFor(mediaType, streamId)].bitrate;

          if (bytesRemaining > estimateOtherBytesTotal) {
            switchRequest.quality = newQuality;
            switchRequest.reason.throughput = fragmentInfo.measuredBandwidthInKbps;
            switchRequest.reason.fragmentID = fragmentInfo.id;
            switchRequest.reason.rule = this.getClassName();
            abandonDict[fragmentInfo.id] = fragmentInfo;
            logger.debug('[' + mediaType + '] frag id', fragmentInfo.id, ' is asking to abandon and switch to quality to ', newQuality, ' measured bandwidth was', fragmentInfo.measuredBandwidthInKbps);
            delete fragmentDict[mediaType][fragmentInfo.id];
          }
        }
      } else if (fragmentInfo.bytesLoaded === fragmentInfo.bytesTotal) {
        delete fragmentDict[mediaType][fragmentInfo.id];
      }
    }

    return switchRequest;
  }

  function reset() {
    fragmentDict = {};
    abandonDict = {};
    throughputArray = [];
  }

  instance = {
    shouldAbandon: shouldAbandon,
    reset: reset
  };
  setup();
  return instance;
}

AbandonRequestsRule.__dashjs_factory_name = 'AbandonRequestsRule';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker__WEBPACK_IMPORTED_MODULE_1__["default"].getClassFactory(AbandonRequestsRule));

/***/ }),

/***/ "./src/streaming/rules/abr/BolaRule.js":
/*!*********************************************!*\
  !*** ./src/streaming/rules/abr/BolaRule.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_MetricsConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/MetricsConstants */ "./src/streaming/constants/MetricsConstants.js");
/* harmony import */ var _SwitchRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SwitchRequest */ "./src/streaming/rules/SwitchRequest.js");
/* harmony import */ var _core_FactoryMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/FactoryMaker */ "./src/core/FactoryMaker.js");
/* harmony import */ var _vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../vo/metrics/HTTPRequest */ "./src/streaming/vo/metrics/HTTPRequest.js");
/* harmony import */ var _core_EventBus__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core/EventBus */ "./src/core/EventBus.js");
/* harmony import */ var _core_events_Events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../core/events/Events */ "./src/core/events/Events.js");
/* harmony import */ var _core_Debug__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../core/Debug */ "./src/core/Debug.js");
/* harmony import */ var _MediaPlayerEvents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../MediaPlayerEvents */ "./src/streaming/MediaPlayerEvents.js");
/* harmony import */ var _constants_Constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../constants/Constants */ "./src/streaming/constants/Constants.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2016, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
// For a description of the BOLA adaptive bitrate (ABR) algorithm, see http://arxiv.org/abs/1601.06748








 // BOLA_STATE_ONE_BITRATE   : If there is only one bitrate (or initialization failed), always return NO_CHANGE.
// BOLA_STATE_STARTUP       : Set placeholder buffer such that we download fragments at most recently measured throughput.
// BOLA_STATE_STEADY        : Buffer primed, we switch to steady operation.
// TODO: add BOLA_STATE_SEEK and tune BOLA behavior on seeking

var BOLA_STATE_ONE_BITRATE = 0;
var BOLA_STATE_STARTUP = 1;
var BOLA_STATE_STEADY = 2;
var MINIMUM_BUFFER_S = 10; // BOLA should never add artificial delays if buffer is less than MINIMUM_BUFFER_S.

var MINIMUM_BUFFER_PER_BITRATE_LEVEL_S = 2; // E.g. if there are 5 bitrates, BOLA switches to top bitrate at buffer = 10 + 5 * 2 = 20s.
// If Schedule Controller does not allow buffer to reach that level, it can be achieved through the placeholder buffer level.

var PLACEHOLDER_BUFFER_DECAY = 0.99; // Make sure placeholder buffer does not stick around too long.

function BolaRule(config) {
  config = config || {};
  var context = this.context;
  var dashMetrics = config.dashMetrics;
  var mediaPlayerModel = config.mediaPlayerModel;
  var eventBus = (0,_core_EventBus__WEBPACK_IMPORTED_MODULE_4__["default"])(context).getInstance();
  var instance, logger, bolaStateDict;

  function setup() {
    logger = (0,_core_Debug__WEBPACK_IMPORTED_MODULE_6__["default"])(context).getInstance().getLogger(instance);
    resetInitialSettings();
    eventBus.on(_MediaPlayerEvents__WEBPACK_IMPORTED_MODULE_7__["default"].BUFFER_EMPTY, onBufferEmpty, instance);
    eventBus.on(_MediaPlayerEvents__WEBPACK_IMPORTED_MODULE_7__["default"].PLAYBACK_SEEKING, onPlaybackSeeking, instance);
    eventBus.on(_MediaPlayerEvents__WEBPACK_IMPORTED_MODULE_7__["default"].METRIC_ADDED, onMetricAdded, instance);
    eventBus.on(_MediaPlayerEvents__WEBPACK_IMPORTED_MODULE_7__["default"].QUALITY_CHANGE_REQUESTED, onQualityChangeRequested, instance);
    eventBus.on(_MediaPlayerEvents__WEBPACK_IMPORTED_MODULE_7__["default"].FRAGMENT_LOADING_ABANDONED, onFragmentLoadingAbandoned, instance);
    eventBus.on(_core_events_Events__WEBPACK_IMPORTED_MODULE_5__["default"].MEDIA_FRAGMENT_LOADED, onMediaFragmentLoaded, instance);
  }

  function utilitiesFromBitrates(bitrates) {
    return bitrates.map(function (b) {
      return Math.log(b);
    }); // no need to worry about offset, utilities will be offset (uniformly) anyway later
  } // NOTE: in live streaming, the real buffer level can drop below minimumBufferS, but bola should not stick to lowest bitrate by using a placeholder buffer level


  function calculateBolaParameters(stableBufferTime, bitrates, utilities) {
    var highestUtilityIndex = utilities.reduce(function (highestIndex, u, uIndex) {
      return u > utilities[highestIndex] ? uIndex : highestIndex;
    }, 0);

    if (highestUtilityIndex === 0) {
      // if highestUtilityIndex === 0, then always use lowest bitrate
      return null;
    }

    var bufferTime = Math.max(stableBufferTime, MINIMUM_BUFFER_S + MINIMUM_BUFFER_PER_BITRATE_LEVEL_S * bitrates.length); // TODO: Investigate if following can be better if utilities are not the default Math.log utilities.
    // If using Math.log utilities, we can choose Vp and gp to always prefer bitrates[0] at minimumBufferS and bitrates[max] at bufferTarget.
    // (Vp * (utility + gp) - bufferLevel) / bitrate has the maxima described when:
    // Vp * (utilities[0] + gp - 1) === minimumBufferS and Vp * (utilities[max] + gp - 1) === bufferTarget
    // giving:

    var gp = (utilities[highestUtilityIndex] - 1) / (bufferTime / MINIMUM_BUFFER_S - 1);
    var Vp = MINIMUM_BUFFER_S / gp; // note that expressions for gp and Vp assume utilities[0] === 1, which is true because of normalization

    return {
      gp: gp,
      Vp: Vp
    };
  }

  function getInitialBolaState(rulesContext) {
    var initialState = {};
    var mediaInfo = rulesContext.getMediaInfo();
    var bitrates = mediaInfo.bitrateList.map(function (b) {
      return b.bandwidth;
    });
    var utilities = utilitiesFromBitrates(bitrates);
    utilities = utilities.map(function (u) {
      return u - utilities[0] + 1;
    }); // normalize

    var stableBufferTime = mediaPlayerModel.getStableBufferTime();
    var params = calculateBolaParameters(stableBufferTime, bitrates, utilities);

    if (!params) {
      // only happens when there is only one bitrate level
      initialState.state = BOLA_STATE_ONE_BITRATE;
    } else {
      initialState.state = BOLA_STATE_STARTUP;
      initialState.bitrates = bitrates;
      initialState.utilities = utilities;
      initialState.stableBufferTime = stableBufferTime;
      initialState.Vp = params.Vp;
      initialState.gp = params.gp;
      initialState.lastQuality = 0;
      clearBolaStateOnSeek(initialState);
    }

    return initialState;
  }

  function clearBolaStateOnSeek(bolaState) {
    bolaState.placeholderBuffer = 0;
    bolaState.mostAdvancedSegmentStart = NaN;
    bolaState.lastSegmentWasReplacement = false;
    bolaState.lastSegmentStart = NaN;
    bolaState.lastSegmentDurationS = NaN;
    bolaState.lastSegmentRequestTimeMs = NaN;
    bolaState.lastSegmentFinishTimeMs = NaN;
  } // If the buffer target is changed (can this happen mid-stream?), then adjust BOLA parameters accordingly.


  function checkBolaStateStableBufferTime(bolaState, mediaType) {
    var stableBufferTime = mediaPlayerModel.getStableBufferTime();

    if (bolaState.stableBufferTime !== stableBufferTime) {
      var params = calculateBolaParameters(stableBufferTime, bolaState.bitrates, bolaState.utilities);

      if (params.Vp !== bolaState.Vp || params.gp !== bolaState.gp) {
        // correct placeholder buffer using two criteria:
        // 1. do not change effective buffer level at effectiveBufferLevel === MINIMUM_BUFFER_S ( === Vp * gp )
        // 2. scale placeholder buffer by Vp subject to offset indicated in 1.
        var bufferLevel = dashMetrics.getCurrentBufferLevel(mediaType);
        var effectiveBufferLevel = bufferLevel + bolaState.placeholderBuffer;
        effectiveBufferLevel -= MINIMUM_BUFFER_S;
        effectiveBufferLevel *= params.Vp / bolaState.Vp;
        effectiveBufferLevel += MINIMUM_BUFFER_S;
        bolaState.stableBufferTime = stableBufferTime;
        bolaState.Vp = params.Vp;
        bolaState.gp = params.gp;
        bolaState.placeholderBuffer = Math.max(0, effectiveBufferLevel - bufferLevel);
      }
    }
  }

  function getBolaState(rulesContext) {
    var mediaType = rulesContext.getMediaType();
    var bolaState = bolaStateDict[mediaType];

    if (!bolaState) {
      bolaState = getInitialBolaState(rulesContext);
      bolaStateDict[mediaType] = bolaState;
    } else if (bolaState.state !== BOLA_STATE_ONE_BITRATE) {
      checkBolaStateStableBufferTime(bolaState, mediaType);
    }

    return bolaState;
  } // The core idea of BOLA.


  function getQualityFromBufferLevel(bolaState, bufferLevel) {
    var bitrateCount = bolaState.bitrates.length;
    var quality = NaN;
    var score = NaN;

    for (var i = 0; i < bitrateCount; ++i) {
      var s = (bolaState.Vp * (bolaState.utilities[i] + bolaState.gp) - bufferLevel) / bolaState.bitrates[i];

      if (isNaN(score) || s >= score) {
        score = s;
        quality = i;
      }
    }

    return quality;
  } // maximum buffer level which prefers to download at quality rather than wait


  function maxBufferLevelForQuality(bolaState, quality) {
    return bolaState.Vp * (bolaState.utilities[quality] + bolaState.gp);
  } // the minimum buffer level that would cause BOLA to choose quality rather than a lower bitrate


  function minBufferLevelForQuality(bolaState, quality) {
    var qBitrate = bolaState.bitrates[quality];
    var qUtility = bolaState.utilities[quality];
    var min = 0;

    for (var i = quality - 1; i >= 0; --i) {
      // for each bitrate less than bitrates[quality], BOLA should prefer quality (unless other bitrate has higher utility)
      if (bolaState.utilities[i] < bolaState.utilities[quality]) {
        var iBitrate = bolaState.bitrates[i];
        var iUtility = bolaState.utilities[i];
        var level = bolaState.Vp * (bolaState.gp + (qBitrate * iUtility - iBitrate * qUtility) / (qBitrate - iBitrate));
        min = Math.max(min, level); // we want min to be small but at least level(i) for all i
      }
    }

    return min;
  }
  /*
   * The placeholder buffer increases the effective buffer that is used to calculate the bitrate.
   * There are two main reasons we might want to increase the placeholder buffer:
   *
   * 1. When a segment finishes downloading, we would expect to get a call on getMaxIndex() regarding the quality for
   *    the next segment. However, there might be a delay before the next call. E.g. when streaming live content, the
   *    next segment might not be available yet. If the call to getMaxIndex() does happens after a delay, we don't
   *    want the delay to change the BOLA decision - we only want to factor download time to decide on bitrate level.
   *
   * 2. It is possible to get a call to getMaxIndex() without having a segment download. The buffer target in dash.js
   *    is different for top-quality segments and lower-quality segments. If getMaxIndex() returns a lower-than-top
   *    quality, then the buffer controller might decide not to download a segment. When dash.js is ready for the next
   *    segment, getMaxIndex() will be called again. We don't want this extra delay to factor in the bitrate decision.
   */


  function updatePlaceholderBuffer(bolaState, mediaType) {
    var nowMs = Date.now();

    if (!isNaN(bolaState.lastSegmentFinishTimeMs)) {
      // compensate for non-bandwidth-derived delays, e.g., live streaming availability, buffer controller
      var delay = 0.001 * (nowMs - bolaState.lastSegmentFinishTimeMs);
      bolaState.placeholderBuffer += Math.max(0, delay);
    } else if (!isNaN(bolaState.lastCallTimeMs)) {
      // no download after last call, compensate for delay between calls
      var _delay = 0.001 * (nowMs - bolaState.lastCallTimeMs);

      bolaState.placeholderBuffer += Math.max(0, _delay);
    }

    bolaState.lastCallTimeMs = nowMs;
    bolaState.lastSegmentStart = NaN;
    bolaState.lastSegmentRequestTimeMs = NaN;
    bolaState.lastSegmentFinishTimeMs = NaN;
    checkBolaStateStableBufferTime(bolaState, mediaType);
  }

  function onBufferEmpty(e) {
    // if we rebuffer, we don't want the placeholder buffer to artificially raise BOLA quality
    var mediaType = e.mediaType; // if audio buffer runs empty (due to track switch for example) then reset placeholder buffer only for audio (to avoid decrease video BOLA quality)

    var stateDict = mediaType === _constants_Constants__WEBPACK_IMPORTED_MODULE_8__["default"].AUDIO ? [_constants_Constants__WEBPACK_IMPORTED_MODULE_8__["default"].AUDIO] : bolaStateDict;

    for (var _mediaType in stateDict) {
      if (bolaStateDict.hasOwnProperty(_mediaType) && bolaStateDict[_mediaType].state === BOLA_STATE_STEADY) {
        bolaStateDict[_mediaType].placeholderBuffer = 0;
      }
    }
  }

  function onPlaybackSeeking() {
    // TODO: 1. Verify what happens if we seek mid-fragment.
    // TODO: 2. If e.g. we have 10s fragments and seek, we might want to download the first fragment at a lower quality to restart playback quickly.
    for (var mediaType in bolaStateDict) {
      if (bolaStateDict.hasOwnProperty(mediaType)) {
        var bolaState = bolaStateDict[mediaType];

        if (bolaState.state !== BOLA_STATE_ONE_BITRATE) {
          bolaState.state = BOLA_STATE_STARTUP; // TODO: BOLA_STATE_SEEK?

          clearBolaStateOnSeek(bolaState);
        }
      }
    }
  }

  function onMediaFragmentLoaded(e) {
    if (e && e.chunk && e.chunk.mediaInfo) {
      var bolaState = bolaStateDict[e.chunk.mediaInfo.type];

      if (bolaState && bolaState.state !== BOLA_STATE_ONE_BITRATE) {
        var start = e.chunk.start;

        if (isNaN(bolaState.mostAdvancedSegmentStart) || start > bolaState.mostAdvancedSegmentStart) {
          bolaState.mostAdvancedSegmentStart = start;
          bolaState.lastSegmentWasReplacement = false;
        } else {
          bolaState.lastSegmentWasReplacement = true;
        }

        bolaState.lastSegmentStart = start;
        bolaState.lastSegmentDurationS = e.chunk.duration;
        bolaState.lastQuality = e.chunk.quality;
        checkNewSegment(bolaState, e.chunk.mediaInfo.type);
      }
    }
  }

  function onMetricAdded(e) {
    if (e && e.metric === _constants_MetricsConstants__WEBPACK_IMPORTED_MODULE_0__["default"].HTTP_REQUEST && e.value && e.value.type === _vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_3__.HTTPRequest.MEDIA_SEGMENT_TYPE && e.value.trace && e.value.trace.length) {
      var bolaState = bolaStateDict[e.mediaType];

      if (bolaState && bolaState.state !== BOLA_STATE_ONE_BITRATE) {
        bolaState.lastSegmentRequestTimeMs = e.value.trequest.getTime();
        bolaState.lastSegmentFinishTimeMs = e.value._tfinish.getTime();
        checkNewSegment(bolaState, e.mediaType);
      }
    }
  }
  /*
   * When a new segment is downloaded, we get two notifications: onMediaFragmentLoaded() and onMetricAdded(). It is
   * possible that the quality for the downloaded segment was lower (not higher) than the quality indicated by BOLA.
   * This might happen because of other rules such as the DroppedFramesRule. When this happens, we trim the
   * placeholder buffer to make BOLA more stable. This mechanism also avoids inflating the buffer when BOLA itself
   * decides not to increase the quality to avoid oscillations.
   *
   * We should also check for replacement segments (fast switching). In this case, a segment is downloaded but does
   * not grow the actual buffer. Fast switching might cause the buffer to deplete, causing BOLA to drop the bitrate.
   * We avoid this by growing the placeholder buffer.
   */


  function checkNewSegment(bolaState, mediaType) {
    if (!isNaN(bolaState.lastSegmentStart) && !isNaN(bolaState.lastSegmentRequestTimeMs) && !isNaN(bolaState.placeholderBuffer)) {
      bolaState.placeholderBuffer *= PLACEHOLDER_BUFFER_DECAY; // Find what maximum buffer corresponding to last segment was, and ensure placeholder is not relatively larger.

      if (!isNaN(bolaState.lastSegmentFinishTimeMs)) {
        var bufferLevel = dashMetrics.getCurrentBufferLevel(mediaType);
        var bufferAtLastSegmentRequest = bufferLevel + 0.001 * (bolaState.lastSegmentFinishTimeMs - bolaState.lastSegmentRequestTimeMs); // estimate

        var maxEffectiveBufferForLastSegment = maxBufferLevelForQuality(bolaState, bolaState.lastQuality);
        var maxPlaceholderBuffer = Math.max(0, maxEffectiveBufferForLastSegment - bufferAtLastSegmentRequest);
        bolaState.placeholderBuffer = Math.min(maxPlaceholderBuffer, bolaState.placeholderBuffer);
      } // then see if we should grow placeholder buffer


      if (bolaState.lastSegmentWasReplacement && !isNaN(bolaState.lastSegmentDurationS)) {
        // compensate for segments that were downloaded but did not grow the buffer
        bolaState.placeholderBuffer += bolaState.lastSegmentDurationS;
      }

      bolaState.lastSegmentStart = NaN;
      bolaState.lastSegmentRequestTimeMs = NaN;
    }
  }

  function onQualityChangeRequested(e) {
    // Useful to store change requests when abandoning a download.
    if (e) {
      var bolaState = bolaStateDict[e.mediaType];

      if (bolaState && bolaState.state !== BOLA_STATE_ONE_BITRATE) {
        bolaState.abrQuality = e.newQuality;
      }
    }
  }

  function onFragmentLoadingAbandoned(e) {
    if (e) {
      var bolaState = bolaStateDict[e.mediaType];

      if (bolaState && bolaState.state !== BOLA_STATE_ONE_BITRATE) {
        // deflate placeholderBuffer - note that we want to be conservative when abandoning
        var bufferLevel = dashMetrics.getCurrentBufferLevel(e.mediaType);
        var wantEffectiveBufferLevel;

        if (bolaState.abrQuality > 0) {
          // deflate to point where BOLA just chooses newQuality over newQuality-1
          wantEffectiveBufferLevel = minBufferLevelForQuality(bolaState, bolaState.abrQuality);
        } else {
          wantEffectiveBufferLevel = MINIMUM_BUFFER_S;
        }

        var maxPlaceholderBuffer = Math.max(0, wantEffectiveBufferLevel - bufferLevel);
        bolaState.placeholderBuffer = Math.min(bolaState.placeholderBuffer, maxPlaceholderBuffer);
      }
    }
  }

  function getMaxIndex(rulesContext) {
    var switchRequest = (0,_SwitchRequest__WEBPACK_IMPORTED_MODULE_1__["default"])(context).create();

    if (!rulesContext || !rulesContext.hasOwnProperty('getMediaInfo') || !rulesContext.hasOwnProperty('getMediaType') || !rulesContext.hasOwnProperty('getScheduleController') || !rulesContext.hasOwnProperty('getStreamInfo') || !rulesContext.hasOwnProperty('getAbrController') || !rulesContext.hasOwnProperty('useBufferOccupancyABR')) {
      return switchRequest;
    }

    var mediaInfo = rulesContext.getMediaInfo();
    var mediaType = rulesContext.getMediaType();
    var scheduleController = rulesContext.getScheduleController();
    var streamInfo = rulesContext.getStreamInfo();
    var abrController = rulesContext.getAbrController();
    var throughputHistory = abrController.getThroughputHistory();
    var streamId = streamInfo ? streamInfo.id : null;
    var isDynamic = streamInfo && streamInfo.manifestInfo && streamInfo.manifestInfo.isDynamic;
    var useBufferOccupancyABR = rulesContext.useBufferOccupancyABR();
    switchRequest.reason = switchRequest.reason || {};

    if (!useBufferOccupancyABR) {
      return switchRequest;
    }

    scheduleController.setTimeToLoadDelay(0);
    var bolaState = getBolaState(rulesContext);

    if (bolaState.state === BOLA_STATE_ONE_BITRATE) {
      // shouldn't even have been called
      return switchRequest;
    }

    var bufferLevel = dashMetrics.getCurrentBufferLevel(mediaType);
    var throughput = throughputHistory.getAverageThroughput(mediaType, isDynamic);
    var safeThroughput = throughputHistory.getSafeAverageThroughput(mediaType, isDynamic);
    var latency = throughputHistory.getAverageLatency(mediaType);
    var quality;
    switchRequest.reason.state = bolaState.state;
    switchRequest.reason.throughput = throughput;
    switchRequest.reason.latency = latency;

    if (isNaN(throughput)) {
      // isNaN(throughput) === isNaN(safeThroughput) === isNaN(latency)
      // still starting up - not enough information
      return switchRequest;
    }

    switch (bolaState.state) {
      case BOLA_STATE_STARTUP:
        quality = abrController.getQualityForBitrate(mediaInfo, safeThroughput, streamId, latency);
        switchRequest.quality = quality;
        switchRequest.reason.throughput = safeThroughput;
        bolaState.placeholderBuffer = Math.max(0, minBufferLevelForQuality(bolaState, quality) - bufferLevel);
        bolaState.lastQuality = quality;

        if (!isNaN(bolaState.lastSegmentDurationS) && bufferLevel >= bolaState.lastSegmentDurationS) {
          bolaState.state = BOLA_STATE_STEADY;
        }

        break;
      // BOLA_STATE_STARTUP

      case BOLA_STATE_STEADY:
        // NB: The placeholder buffer is added to bufferLevel to come up with a bitrate.
        //     This might lead BOLA to be too optimistic and to choose a bitrate that would lead to rebuffering -
        //     if the real buffer bufferLevel runs out, the placeholder buffer cannot prevent rebuffering.
        //     However, the InsufficientBufferRule takes care of this scenario.
        updatePlaceholderBuffer(bolaState, mediaType);
        quality = getQualityFromBufferLevel(bolaState, bufferLevel + bolaState.placeholderBuffer); // we want to avoid oscillations
        // We implement the "BOLA-O" variant: when network bandwidth lies between two encoded bitrate levels, stick to the lowest level.

        var qualityForThroughput = abrController.getQualityForBitrate(mediaInfo, safeThroughput, streamId, latency);

        if (quality > bolaState.lastQuality && quality > qualityForThroughput) {
          // only intervene if we are trying to *increase* quality to an *unsustainable* level
          // we are only avoid oscillations - do not drop below last quality
          quality = Math.max(qualityForThroughput, bolaState.lastQuality);
        } // We do not want to overfill buffer with low quality chunks.
        // Note that there will be no delay if buffer level is below MINIMUM_BUFFER_S, probably even with some margin higher than MINIMUM_BUFFER_S.


        var delayS = Math.max(0, bufferLevel + bolaState.placeholderBuffer - maxBufferLevelForQuality(bolaState, quality)); // First reduce placeholder buffer, then tell schedule controller to pause.

        if (delayS <= bolaState.placeholderBuffer) {
          bolaState.placeholderBuffer -= delayS;
          delayS = 0;
        } else {
          delayS -= bolaState.placeholderBuffer;
          bolaState.placeholderBuffer = 0;

          if (quality < abrController.getMaxAllowedIndexFor(mediaType, streamId)) {
            // At top quality, allow schedule controller to decide how far to fill buffer.
            scheduleController.setTimeToLoadDelay(1000 * delayS);
          } else {
            delayS = 0;
          }
        }

        switchRequest.quality = quality;
        switchRequest.reason.throughput = throughput;
        switchRequest.reason.latency = latency;
        switchRequest.reason.bufferLevel = bufferLevel;
        switchRequest.reason.placeholderBuffer = bolaState.placeholderBuffer;
        switchRequest.reason.delay = delayS;
        bolaState.lastQuality = quality; // keep bolaState.state === BOLA_STATE_STEADY

        break;
      // BOLA_STATE_STEADY

      default:
        logger.debug('BOLA ABR rule invoked in bad state.'); // should not arrive here, try to recover

        switchRequest.quality = abrController.getQualityForBitrate(mediaInfo, safeThroughput, streamId, latency);
        switchRequest.reason.state = bolaState.state;
        switchRequest.reason.throughput = safeThroughput;
        switchRequest.reason.latency = latency;
        bolaState.state = BOLA_STATE_STARTUP;
        clearBolaStateOnSeek(bolaState);
    }

    return switchRequest;
  }

  function resetInitialSettings() {
    bolaStateDict = {};
  }

  function reset() {
    resetInitialSettings();
    eventBus.off(_MediaPlayerEvents__WEBPACK_IMPORTED_MODULE_7__["default"].BUFFER_EMPTY, onBufferEmpty, instance);
    eventBus.off(_MediaPlayerEvents__WEBPACK_IMPORTED_MODULE_7__["default"].PLAYBACK_SEEKING, onPlaybackSeeking, instance);
    eventBus.off(_MediaPlayerEvents__WEBPACK_IMPORTED_MODULE_7__["default"].METRIC_ADDED, onMetricAdded, instance);
    eventBus.off(_MediaPlayerEvents__WEBPACK_IMPORTED_MODULE_7__["default"].QUALITY_CHANGE_REQUESTED, onQualityChangeRequested, instance);
    eventBus.off(_MediaPlayerEvents__WEBPACK_IMPORTED_MODULE_7__["default"].FRAGMENT_LOADING_ABANDONED, onFragmentLoadingAbandoned, instance);
    eventBus.off(_core_events_Events__WEBPACK_IMPORTED_MODULE_5__["default"].MEDIA_FRAGMENT_LOADED, onMediaFragmentLoaded, instance);
  }

  instance = {
    getMaxIndex: getMaxIndex,
    reset: reset
  };
  setup();
  return instance;
}

BolaRule.__dashjs_factory_name = 'BolaRule';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker__WEBPACK_IMPORTED_MODULE_2__["default"].getClassFactory(BolaRule));

/***/ }),

/***/ "./src/streaming/rules/abr/DroppedFramesRule.js":
/*!******************************************************!*\
  !*** ./src/streaming/rules/abr/DroppedFramesRule.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_FactoryMaker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/FactoryMaker */ "./src/core/FactoryMaker.js");
/* harmony import */ var _SwitchRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SwitchRequest */ "./src/streaming/rules/SwitchRequest.js");
/* harmony import */ var _core_Debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/Debug */ "./src/core/Debug.js");




function DroppedFramesRule() {
  var context = this.context;
  var instance, logger;
  var DROPPED_PERCENTAGE_FORBID = 0.15;
  var GOOD_SAMPLE_SIZE = 375; //Don't apply the rule until this many frames have been rendered(and counted under those indices).

  function setup() {
    logger = (0,_core_Debug__WEBPACK_IMPORTED_MODULE_2__["default"])(context).getInstance().getLogger(instance);
  }

  function getMaxIndex(rulesContext) {
    var switchRequest = (0,_SwitchRequest__WEBPACK_IMPORTED_MODULE_1__["default"])(context).create();

    if (!rulesContext || !rulesContext.hasOwnProperty('getDroppedFramesHistory')) {
      return switchRequest;
    }

    var droppedFramesHistory = rulesContext.getDroppedFramesHistory();
    var streamId = rulesContext.getStreamInfo().id;

    if (droppedFramesHistory) {
      var dfh = droppedFramesHistory.getFrameHistory(streamId);

      if (!dfh || dfh.length === 0) {
        return switchRequest;
      }

      var droppedFrames = 0;
      var totalFrames = 0;
      var maxIndex = _SwitchRequest__WEBPACK_IMPORTED_MODULE_1__["default"].NO_CHANGE; //No point in measuring dropped frames for the zeroeth index.

      for (var i = 1; i < dfh.length; i++) {
        if (dfh[i]) {
          droppedFrames = dfh[i].droppedVideoFrames;
          totalFrames = dfh[i].totalVideoFrames;

          if (totalFrames > GOOD_SAMPLE_SIZE && droppedFrames / totalFrames > DROPPED_PERCENTAGE_FORBID) {
            maxIndex = i - 1;
            logger.debug('index: ' + maxIndex + ' Dropped Frames: ' + droppedFrames + ' Total Frames: ' + totalFrames);
            break;
          }
        }
      }

      return (0,_SwitchRequest__WEBPACK_IMPORTED_MODULE_1__["default"])(context).create(maxIndex, {
        droppedFrames: droppedFrames
      });
    }

    return switchRequest;
  }

  instance = {
    getMaxIndex: getMaxIndex
  };
  setup();
  return instance;
}

DroppedFramesRule.__dashjs_factory_name = 'DroppedFramesRule';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker__WEBPACK_IMPORTED_MODULE_0__["default"].getClassFactory(DroppedFramesRule));

/***/ }),

/***/ "./src/streaming/rules/abr/InsufficientBufferRule.js":
/*!***********************************************************!*\
  !*** ./src/streaming/rules/abr/InsufficientBufferRule.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_EventBus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/EventBus */ "./src/core/EventBus.js");
/* harmony import */ var _core_events_Events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/events/Events */ "./src/core/events/Events.js");
/* harmony import */ var _core_FactoryMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/FactoryMaker */ "./src/core/FactoryMaker.js");
/* harmony import */ var _core_Debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/Debug */ "./src/core/Debug.js");
/* harmony import */ var _SwitchRequest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SwitchRequest */ "./src/streaming/rules/SwitchRequest.js");
/* harmony import */ var _constants_Constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../constants/Constants */ "./src/streaming/constants/Constants.js");
/* harmony import */ var _constants_MetricsConstants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../constants/MetricsConstants */ "./src/streaming/constants/MetricsConstants.js");
/* harmony import */ var _MediaPlayerEvents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../MediaPlayerEvents */ "./src/streaming/MediaPlayerEvents.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */









function InsufficientBufferRule(config) {
  config = config || {};
  var INSUFFICIENT_BUFFER_SAFETY_FACTOR = 0.5;
  var SEGMENT_IGNORE_COUNT = 2;
  var context = this.context;
  var eventBus = (0,_core_EventBus__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance();
  var dashMetrics = config.dashMetrics;
  var instance, logger, bufferStateDict;

  function setup() {
    logger = (0,_core_Debug__WEBPACK_IMPORTED_MODULE_3__["default"])(context).getInstance().getLogger(instance);
    resetInitialSettings();
    eventBus.on(_MediaPlayerEvents__WEBPACK_IMPORTED_MODULE_7__["default"].PLAYBACK_SEEKING, _onPlaybackSeeking, instance);
    eventBus.on(_core_events_Events__WEBPACK_IMPORTED_MODULE_1__["default"].BYTES_APPENDED_END_FRAGMENT, _onBytesAppended, instance);
  }

  function checkConfig() {
    if (!dashMetrics || !dashMetrics.hasOwnProperty('getCurrentBufferLevel') || !dashMetrics.hasOwnProperty('getCurrentBufferState')) {
      throw new Error(_constants_Constants__WEBPACK_IMPORTED_MODULE_5__["default"].MISSING_CONFIG_ERROR);
    }
  }
  /**
   * If a BUFFER_EMPTY event happens, then InsufficientBufferRule returns switchRequest.quality=0 until BUFFER_LOADED happens.
   * Otherwise InsufficientBufferRule gives a maximum bitrate depending on throughput and bufferLevel such that
   * a whole fragment can be downloaded before the buffer runs out, subject to a conservative safety factor of 0.5.
   * If the bufferLevel is low, then InsufficientBufferRule avoids rebuffering risk.
   * If the bufferLevel is high, then InsufficientBufferRule give a high MaxIndex allowing other rules to take over.
   * @param rulesContext
   * @return {object}
   */


  function getMaxIndex(rulesContext) {
    var switchRequest = (0,_SwitchRequest__WEBPACK_IMPORTED_MODULE_4__["default"])(context).create();

    if (!rulesContext || !rulesContext.hasOwnProperty('getMediaType')) {
      return switchRequest;
    }

    checkConfig();
    var mediaType = rulesContext.getMediaType();
    var currentBufferState = dashMetrics.getCurrentBufferState(mediaType);
    var representationInfo = rulesContext.getRepresentationInfo();
    var fragmentDuration = representationInfo.fragmentDuration;
    var streamInfo = rulesContext.getStreamInfo();
    var streamId = streamInfo ? streamInfo.id : null;
    var scheduleController = rulesContext.getScheduleController();
    var isDynamic = streamInfo && streamInfo.manifestInfo && streamInfo.manifestInfo.isDynamic;
    var playbackController = scheduleController.getPlaybackController(); // Don't ask for a bitrate change if there is not info about buffer state or if fragmentDuration is not defined

    var lowLatencyEnabled = playbackController.getLowLatencyModeEnabled();

    if (shouldIgnore(lowLatencyEnabled, mediaType) || !fragmentDuration) {
      return switchRequest;
    }

    if (currentBufferState && currentBufferState.state === _constants_MetricsConstants__WEBPACK_IMPORTED_MODULE_6__["default"].BUFFER_EMPTY) {
      logger.debug('[' + mediaType + '] Switch to index 0; buffer is empty.');
      switchRequest.quality = 0;
      switchRequest.reason = 'InsufficientBufferRule: Buffer is empty';
    } else {
      var mediaInfo = rulesContext.getMediaInfo();
      var abrController = rulesContext.getAbrController();
      var throughputHistory = abrController.getThroughputHistory();
      var bufferLevel = dashMetrics.getCurrentBufferLevel(mediaType);
      var throughput = throughputHistory.getAverageThroughput(mediaType, isDynamic);
      var latency = throughputHistory.getAverageLatency(mediaType);
      var bitrate = throughput * (bufferLevel / fragmentDuration) * INSUFFICIENT_BUFFER_SAFETY_FACTOR;
      switchRequest.quality = abrController.getQualityForBitrate(mediaInfo, bitrate, streamId, latency);
      switchRequest.reason = 'InsufficientBufferRule: being conservative to avoid immediate rebuffering';
    }

    return switchRequest;
  }

  function shouldIgnore(lowLatencyEnabled, mediaType) {
    return !lowLatencyEnabled && bufferStateDict[mediaType].ignoreCount > 0;
  }

  function resetInitialSettings() {
    bufferStateDict = {};
    bufferStateDict[_constants_Constants__WEBPACK_IMPORTED_MODULE_5__["default"].VIDEO] = {
      ignoreCount: SEGMENT_IGNORE_COUNT
    };
    bufferStateDict[_constants_Constants__WEBPACK_IMPORTED_MODULE_5__["default"].AUDIO] = {
      ignoreCount: SEGMENT_IGNORE_COUNT
    };
  }

  function _onPlaybackSeeking() {
    resetInitialSettings();
  }

  function _onBytesAppended(e) {
    if (!isNaN(e.startTime) && (e.mediaType === _constants_Constants__WEBPACK_IMPORTED_MODULE_5__["default"].AUDIO || e.mediaType === _constants_Constants__WEBPACK_IMPORTED_MODULE_5__["default"].VIDEO)) {
      if (bufferStateDict[e.mediaType].ignoreCount > 0) {
        bufferStateDict[e.mediaType].ignoreCount--;
      }
    }
  }

  function reset() {
    resetInitialSettings();
    eventBus.off(_MediaPlayerEvents__WEBPACK_IMPORTED_MODULE_7__["default"].PLAYBACK_SEEKING, _onPlaybackSeeking, instance);
    eventBus.off(_core_events_Events__WEBPACK_IMPORTED_MODULE_1__["default"].BYTES_APPENDED_END_FRAGMENT, _onBytesAppended, instance);
  }

  instance = {
    getMaxIndex: getMaxIndex,
    reset: reset
  };
  setup();
  return instance;
}

InsufficientBufferRule.__dashjs_factory_name = 'InsufficientBufferRule';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker__WEBPACK_IMPORTED_MODULE_2__["default"].getClassFactory(InsufficientBufferRule));

/***/ }),

/***/ "./src/streaming/rules/abr/L2ARule.js":
/*!********************************************!*\
  !*** ./src/streaming/rules/abr/L2ARule.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_MetricsConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/MetricsConstants */ "./src/streaming/constants/MetricsConstants.js");
/* harmony import */ var _SwitchRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SwitchRequest */ "./src/streaming/rules/SwitchRequest.js");
/* harmony import */ var _core_FactoryMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/FactoryMaker */ "./src/core/FactoryMaker.js");
/* harmony import */ var _vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../vo/metrics/HTTPRequest */ "./src/streaming/vo/metrics/HTTPRequest.js");
/* harmony import */ var _core_EventBus__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core/EventBus */ "./src/core/EventBus.js");
/* harmony import */ var _core_events_Events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../core/events/Events */ "./src/core/events/Events.js");
/* harmony import */ var _core_Debug__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../core/Debug */ "./src/core/Debug.js");
/* harmony import */ var _constants_Constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../constants/Constants */ "./src/streaming/constants/Constants.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2020, Unified Streaming.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
// For a description of the Learn2Adapt-LowLatency (L2A-LL) bitrate adaptation algorithm, see https://github.com/unifiedstreaming/Learn2Adapt-LowLatency/blob/master/Online_learning_for_bitrate_adaptation_in_low_latency_live_streaming_CR.pdf








var L2A_STATE_ONE_BITRATE = 0; // If there is only one bitrate (or initialization failed), always return NO_CHANGE.

var L2A_STATE_STARTUP = 1; // Set placeholder buffer such that we download fragments at most recently measured throughput.

var L2A_STATE_STEADY = 2; // Buffer primed, we switch to steady operation.

function L2ARule(config) {
  config = config || {};
  var context = this.context;
  var dashMetrics = config.dashMetrics;
  var eventBus = (0,_core_EventBus__WEBPACK_IMPORTED_MODULE_4__["default"])(context).getInstance();
  var instance, l2AStateDict, l2AParameterDict, logger;
  /**
   * Setup function to initialize L2ARule
   */

  function setup() {
    logger = (0,_core_Debug__WEBPACK_IMPORTED_MODULE_6__["default"])(context).getInstance().getLogger(instance);

    _resetInitialSettings();

    eventBus.on(_core_events_Events__WEBPACK_IMPORTED_MODULE_5__["default"].PLAYBACK_SEEKING, _onPlaybackSeeking, instance);
    eventBus.on(_core_events_Events__WEBPACK_IMPORTED_MODULE_5__["default"].MEDIA_FRAGMENT_LOADED, _onMediaFragmentLoaded, instance);
    eventBus.on(_core_events_Events__WEBPACK_IMPORTED_MODULE_5__["default"].METRIC_ADDED, _onMetricAdded, instance);
    eventBus.on(_core_events_Events__WEBPACK_IMPORTED_MODULE_5__["default"].QUALITY_CHANGE_REQUESTED, _onQualityChangeRequested, instance);
  }
  /**
   * Sets the initial state of the algorithm. Calls the initialize function for the paramteters.
   * @param {object} rulesContext
   * @return {object} initialState
   * @private
   */


  function _getInitialL2AState(rulesContext) {
    var initialState = {};
    var mediaInfo = rulesContext.getMediaInfo();
    var bitrates = mediaInfo.bitrateList.map(function (b) {
      return b.bandwidth / 1000;
    });
    initialState.state = L2A_STATE_STARTUP;
    initialState.bitrates = bitrates;
    initialState.lastQuality = 0;

    _initializeL2AParameters(mediaInfo);

    _clearL2AStateOnSeek(initialState);

    return initialState;
  }
  /**
   * Initializes the parameters of the algorithm. This will be done once for each media type.
   * @param {object} mediaInfo
   * @private
   */


  function _initializeL2AParameters(mediaInfo) {
    if (!mediaInfo || !mediaInfo.type) {
      return;
    }

    l2AParameterDict[mediaInfo.type] = {};
    l2AParameterDict[mediaInfo.type].w = []; //Vector of probabilities associated with bitrate decisions

    l2AParameterDict[mediaInfo.type].prev_w = []; //Vector of probabilities associated with bitrate decisions calculated in the previous step

    l2AParameterDict[mediaInfo.type].Q = 0; //Initialization of Lagrangian multiplier (This keeps track of the buffer displacement)

    l2AParameterDict[mediaInfo.type].segment_request_start_s = 0;
    l2AParameterDict[mediaInfo.type].segment_download_finish_s = 0;
    l2AParameterDict[mediaInfo.type].B_target = 1.5; //Target buffer level
  }
  /**
   * Clears the state object
   * @param {object} l2AState
   * @private
   */


  function _clearL2AStateOnSeek(l2AState) {
    l2AState.placeholderBuffer = 0;
    l2AState.mostAdvancedSegmentStart = NaN;
    l2AState.lastSegmentWasReplacement = false;
    l2AState.lastSegmentStart = NaN;
    l2AState.lastSegmentDurationS = NaN;
    l2AState.lastSegmentRequestTimeMs = NaN;
    l2AState.lastSegmentFinishTimeMs = NaN;
    l2AState.lastSegmentUrl = '';
  }
  /**
   * Returns the state object for a fiven media type. If the state object is not yet defined _getInitialL2AState is called
   * @param {object} rulesContext
   * @return {object} l2AState
   * @private
   */


  function _getL2AState(rulesContext) {
    var mediaType = rulesContext.getMediaType();
    var l2AState = l2AStateDict[mediaType];

    if (!l2AState) {
      l2AState = _getInitialL2AState(rulesContext);
      l2AStateDict[mediaType] = l2AState;
    }

    return l2AState;
  }
  /**
   * Event handler for the seeking event.
   * @private
   */


  function _onPlaybackSeeking() {
    for (var mediaType in l2AStateDict) {
      if (l2AStateDict.hasOwnProperty(mediaType)) {
        var l2aState = l2AStateDict[mediaType];

        if (l2aState.state !== L2A_STATE_ONE_BITRATE) {
          l2aState.state = L2A_STATE_STARTUP;

          _clearL2AStateOnSeek(l2aState);
        }
      }
    }
  }
  /**
   * Event handler for the mediaFragmentLoaded event
   * @param {object} e
   * @private
   */


  function _onMediaFragmentLoaded(e) {
    if (e && e.chunk && e.chunk.mediaInfo) {
      var l2AState = l2AStateDict[e.chunk.mediaInfo.type];
      var l2AParameters = l2AParameterDict[e.chunk.mediaInfo.type];

      if (l2AState && l2AState.state !== L2A_STATE_ONE_BITRATE) {
        var start = e.chunk.start;

        if (isNaN(l2AState.mostAdvancedSegmentStart) || start > l2AState.mostAdvancedSegmentStart) {
          l2AState.mostAdvancedSegmentStart = start;
          l2AState.lastSegmentWasReplacement = false;
        } else {
          l2AState.lastSegmentWasReplacement = true;
        }

        l2AState.lastSegmentStart = start;
        l2AState.lastSegmentDurationS = e.chunk.duration;
        l2AState.lastQuality = e.chunk.quality;

        _checkNewSegment(l2AState, l2AParameters);
      }
    }
  }
  /**
   * Event handler for the metricAdded event
   * @param {object} e
   * @private
   */


  function _onMetricAdded(e) {
    if (e && e.metric === _constants_MetricsConstants__WEBPACK_IMPORTED_MODULE_0__["default"].HTTP_REQUEST && e.value && e.value.type === _vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_3__.HTTPRequest.MEDIA_SEGMENT_TYPE && e.value.trace && e.value.trace.length) {
      var l2AState = l2AStateDict[e.mediaType];
      var l2AParameters = l2AParameterDict[e.mediaType];

      if (l2AState && l2AState.state !== L2A_STATE_ONE_BITRATE) {
        l2AState.lastSegmentRequestTimeMs = e.value.trequest.getTime();
        l2AState.lastSegmentFinishTimeMs = e.value._tfinish.getTime();

        _checkNewSegment(l2AState, l2AParameters);
      }
    }
  }
  /**
   * When a new metric has been added or a media fragment has been loaded the state is adjusted accordingly
   * @param {object} L2AState
   * @param {object} l2AParameters
   * @private
   */


  function _checkNewSegment(L2AState, l2AParameters) {
    if (!isNaN(L2AState.lastSegmentStart) && !isNaN(L2AState.lastSegmentRequestTimeMs)) {
      l2AParameters.segment_request_start_s = 0.001 * L2AState.lastSegmentRequestTimeMs;
      l2AParameters.segment_download_finish_s = 0.001 * L2AState.lastSegmentFinishTimeMs;
      L2AState.lastSegmentStart = NaN;
      L2AState.lastSegmentRequestTimeMs = NaN;
    }
  }
  /**
   * Event handler for the qualityChangeRequested event
   * @param {object} e
   * @private
   */


  function _onQualityChangeRequested(e) {
    // Useful to store change requests when abandoning a download.
    if (e && e.mediaType) {
      var L2AState = l2AStateDict[e.mediaType];

      if (L2AState && L2AState.state !== L2A_STATE_ONE_BITRATE) {
        L2AState.abrQuality = e.newQuality;
      }
    }
  }
  /**
   * Dot multiplication of two arrays
   * @param {array} arr1
   * @param {array} arr2
   * @return {number} sumdot
   * @private
   */


  function _dotmultiplication(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return -1;
    }

    var sumdot = 0;

    for (var i = 0; i < arr1.length; i++) {
      sumdot = sumdot + arr1[i] * arr2[i];
    }

    return sumdot;
  }
  /**
   * Project an n-dim vector y to the simplex Dn
   * Dn = { x : x n-dim, 1 >= x >= 0, sum(x) = 1}
   * Algorithm is explained at http://arxiv.org/abs/1101.6081
   * @param {array} arr
   * @return {array}
   */


  function euclideanProjection(arr) {
    var m = arr.length;
    var bget = false;
    var arr2 = [];

    for (var ii = 0; ii < m; ++ii) {
      arr2[ii] = arr[ii];
    }

    var s = arr.sort(function (a, b) {
      return b - a;
    });
    var tmpsum = 0;
    var tmax = 0;
    var x = [];

    for (var _ii = 0; _ii < m - 1; ++_ii) {
      tmpsum = tmpsum + s[_ii];
      tmax = (tmpsum - 1) / (_ii + 1);

      if (tmax >= s[_ii + 1]) {
        bget = true;
        break;
      }
    }

    if (!bget) {
      tmax = (tmpsum + s[m - 1] - 1) / m;
    }

    for (var _ii2 = 0; _ii2 < m; ++_ii2) {
      x[_ii2] = Math.max(arr2[_ii2] - tmax, 0);
    }

    return x;
  }
  /**
   * Returns a switch request object indicating which quality is to be played
   * @param {object} rulesContext
   * @return {object}
   */


  function getMaxIndex(rulesContext) {
    var switchRequest = (0,_SwitchRequest__WEBPACK_IMPORTED_MODULE_1__["default"])(context).create();
    var horizon = 4; // Optimization horizon (The amount of steps required to achieve convergence)

    var vl = Math.pow(horizon, 0.99); // Cautiousness parameter, used to control aggressiveness of the bitrate decision process.

    var alpha = Math.max(Math.pow(horizon, 1), vl * Math.sqrt(horizon)); // Step size, used for gradient descent exploration granularity

    var mediaInfo = rulesContext.getMediaInfo();
    var mediaType = rulesContext.getMediaType();
    var bitrates = mediaInfo.bitrateList.map(function (b) {
      return b.bandwidth;
    });
    var bitrateCount = bitrates.length;
    var scheduleController = rulesContext.getScheduleController();
    var streamInfo = rulesContext.getStreamInfo();
    var abrController = rulesContext.getAbrController();
    var throughputHistory = abrController.getThroughputHistory();
    var isDynamic = streamInfo && streamInfo.manifestInfo && streamInfo.manifestInfo.isDynamic;
    var useL2AABR = rulesContext.useL2AABR();
    var bufferLevel = dashMetrics.getCurrentBufferLevel(mediaType, true);
    var safeThroughput = throughputHistory.getSafeAverageThroughput(mediaType, isDynamic);
    var throughput = throughputHistory.getAverageThroughput(mediaType, isDynamic); // In kbits/s

    var react = 2; // Reactiveness to volatility (abrupt throughput drops), used to re-calibrate Lagrangian multiplier Q

    var latency = throughputHistory.getAverageLatency(mediaType);
    var videoModel = rulesContext.getVideoModel();
    var quality;
    var currentPlaybackRate = videoModel.getPlaybackRate();

    if (!rulesContext || !rulesContext.hasOwnProperty('getMediaInfo') || !rulesContext.hasOwnProperty('getMediaType') || !rulesContext.hasOwnProperty('getScheduleController') || !rulesContext.hasOwnProperty('getStreamInfo') || !rulesContext.hasOwnProperty('getAbrController') || !rulesContext.hasOwnProperty('useL2AABR')) {
      return switchRequest;
    }

    switchRequest.reason = switchRequest.reason || {};

    if (!useL2AABR || mediaType === _constants_Constants__WEBPACK_IMPORTED_MODULE_7__["default"].AUDIO) {
      // L2A decides bitrate only for video. Audio to be included in decision process in a later stage
      return switchRequest;
    }

    scheduleController.setTimeToLoadDelay(0);

    var l2AState = _getL2AState(rulesContext);

    if (l2AState.state === L2A_STATE_ONE_BITRATE) {
      // shouldn't even have been called
      return switchRequest;
    }

    var l2AParameter = l2AParameterDict[mediaType];

    if (!l2AParameter) {
      return switchRequest;
    }

    switchRequest.reason.state = l2AState.state;
    switchRequest.reason.throughput = throughput;
    switchRequest.reason.latency = latency;

    if (isNaN(throughput)) {
      // still starting up - not enough information
      return switchRequest;
    }

    switch (l2AState.state) {
      case L2A_STATE_STARTUP:
        quality = abrController.getQualityForBitrate(mediaInfo, safeThroughput, streamInfo.id, latency); //During strat-up phase abr.controller is responsible for bitrate decisions.

        switchRequest.quality = quality;
        switchRequest.reason.throughput = safeThroughput;
        l2AState.lastQuality = quality;

        if (!isNaN(l2AState.lastSegmentDurationS) && bufferLevel >= l2AParameter.B_target) {
          l2AState.state = L2A_STATE_STEADY;
          l2AParameter.Q = vl; // Initialization of Q langrangian multiplier
          // Update of probability vector w, to be used in main adaptation logic of L2A below (steady state)

          for (var i = 0; i < bitrateCount; ++i) {
            if (i === l2AState.lastQuality) {
              l2AParameter.prev_w[i] = 1;
            } else {
              l2AParameter.prev_w[i] = 0;
            }
          }
        }

        break;
      // L2A_STATE_STARTUP

      case L2A_STATE_STEADY:
        var diff1 = []; //Used to calculate the difference between consecutive decisions (w-w_prev)
        // Manual calculation of latency and throughput during previous request

        var throughputMeasureTime = dashMetrics.getCurrentHttpRequest(mediaType).trace.reduce(function (a, b) {
          return a + b.d;
        }, 0);
        var downloadBytes = dashMetrics.getCurrentHttpRequest(mediaType).trace.reduce(function (a, b) {
          return a + b.b[0];
        }, 0);
        var lastthroughput = Math.round(8 * downloadBytes / throughputMeasureTime); // bits/ms = kbits/s

        var currentHttpRequest = dashMetrics.getCurrentHttpRequest(mediaType);

        if (lastthroughput < 1) {
          lastthroughput = 1;
        } //To avoid division with 0 (avoid infinity) in case of an absolute network outage
        // Note that for SegmentBase addressing the request url does not change.
        // As this is not relevant for low latency streaming at this point the check below is sufficient


        if (currentHttpRequest.url === l2AState.lastSegmentUrl || currentHttpRequest.type === _vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_3__.HTTPRequest.INIT_SEGMENT_TYPE) {
          // No change to inputs or init segment so use previously calculated quality
          quality = l2AState.lastQuality;
        } else {
          // Recalculate Q
          var V = l2AState.lastSegmentDurationS;
          var sign = 1; //Main adaptation logic of L2A-LL

          for (var _i = 0; _i < bitrateCount; ++_i) {
            bitrates[_i] = bitrates[_i] / 1000; // Originally in bps, now in Kbps

            if (currentPlaybackRate * bitrates[_i] > lastthroughput) {
              // In this case buffer would deplete, leading to a stall, which increases latency and thus the particular probability of selsection of bitrate[i] should be decreased.
              sign = -1;
            } // The objective of L2A is to minimize the overall latency=request-response time + buffer length after download+ potential stalling (if buffer less than chunk downlad time)


            l2AParameter.w[_i] = l2AParameter.prev_w[_i] + sign * (V / (2 * alpha)) * ((l2AParameter.Q + vl) * (currentPlaybackRate * bitrates[_i] / lastthroughput)); //Lagrangian descent
          } // Apply euclidean projection on w to ensure w expresses a probability distribution


          l2AParameter.w = euclideanProjection(l2AParameter.w);

          for (var _i2 = 0; _i2 < bitrateCount; ++_i2) {
            diff1[_i2] = l2AParameter.w[_i2] - l2AParameter.prev_w[_i2];
            l2AParameter.prev_w[_i2] = l2AParameter.w[_i2];
          } // Lagrangian multiplier Q calculation:


          l2AParameter.Q = Math.max(0, l2AParameter.Q - V + V * currentPlaybackRate * ((_dotmultiplication(bitrates, l2AParameter.prev_w) + _dotmultiplication(bitrates, diff1)) / lastthroughput)); // Quality is calculated as argmin of the absolute difference between available bitrates (bitrates[i]) and bitrate estimation (dotmultiplication(w,bitrates)).

          var temp = [];

          for (var _i3 = 0; _i3 < bitrateCount; ++_i3) {
            temp[_i3] = Math.abs(bitrates[_i3] - _dotmultiplication(l2AParameter.w, bitrates));
          } // Quality is calculated based on the probability distribution w (the output of L2A)


          quality = temp.indexOf(Math.min.apply(Math, temp)); // We employ a cautious -stepwise- ascent

          if (quality > l2AState.lastQuality) {
            if (bitrates[l2AState.lastQuality + 1] <= lastthroughput) {
              quality = l2AState.lastQuality + 1;
            }
          } // Provision against bitrate over-estimation, by re-calibrating the Lagrangian multiplier Q, to be taken into account for the next chunk


          if (bitrates[quality] >= lastthroughput) {
            l2AParameter.Q = react * Math.max(vl, l2AParameter.Q);
          }

          l2AState.lastSegmentUrl = currentHttpRequest.url;
        }

        switchRequest.quality = quality;
        switchRequest.reason.throughput = throughput;
        switchRequest.reason.latency = latency;
        switchRequest.reason.bufferLevel = bufferLevel;
        l2AState.lastQuality = switchRequest.quality;
        break;

      default:
        // should not arrive here, try to recover
        logger.debug('L2A ABR rule invoked in bad state.');
        switchRequest.quality = abrController.getQualityForBitrate(mediaInfo, safeThroughput, streamInfo.id, latency);
        switchRequest.reason.state = l2AState.state;
        switchRequest.reason.throughput = safeThroughput;
        switchRequest.reason.latency = latency;
        l2AState.state = L2A_STATE_STARTUP;

        _clearL2AStateOnSeek(l2AState);

    }

    return switchRequest;
  }
  /**
   * Reset objects to their initial state
   * @private
   */


  function _resetInitialSettings() {
    l2AStateDict = {};
    l2AParameterDict = {};
  }
  /**
   * Reset the rule
   */


  function reset() {
    _resetInitialSettings();

    eventBus.off(_core_events_Events__WEBPACK_IMPORTED_MODULE_5__["default"].PLAYBACK_SEEKING, _onPlaybackSeeking, instance);
    eventBus.off(_core_events_Events__WEBPACK_IMPORTED_MODULE_5__["default"].MEDIA_FRAGMENT_LOADED, _onMediaFragmentLoaded, instance);
    eventBus.off(_core_events_Events__WEBPACK_IMPORTED_MODULE_5__["default"].METRIC_ADDED, _onMetricAdded, instance);
    eventBus.off(_core_events_Events__WEBPACK_IMPORTED_MODULE_5__["default"].QUALITY_CHANGE_REQUESTED, _onQualityChangeRequested, instance);
  }

  instance = {
    getMaxIndex: getMaxIndex,
    reset: reset
  };
  setup();
  return instance;
}

L2ARule.__dashjs_factory_name = 'L2ARule';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker__WEBPACK_IMPORTED_MODULE_2__["default"].getClassFactory(L2ARule));

/***/ }),

/***/ "./src/streaming/rules/abr/SwitchHistoryRule.js":
/*!******************************************************!*\
  !*** ./src/streaming/rules/abr/SwitchHistoryRule.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_FactoryMaker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/FactoryMaker */ "./src/core/FactoryMaker.js");
/* harmony import */ var _core_Debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/Debug */ "./src/core/Debug.js");
/* harmony import */ var _SwitchRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SwitchRequest */ "./src/streaming/rules/SwitchRequest.js");




function SwitchHistoryRule() {
  var context = this.context;
  var instance, logger; //MAX_SWITCH is the number of drops made. It doesn't consider the size of the drop.

  var MAX_SWITCH = 0.075; //Before this number of switch requests(no switch or actual), don't apply the rule.
  //must be < SwitchRequestHistory SWITCH_REQUEST_HISTORY_DEPTH to enable rule

  var SAMPLE_SIZE = 6;

  function setup() {
    logger = (0,_core_Debug__WEBPACK_IMPORTED_MODULE_1__["default"])(context).getInstance().getLogger(instance);
  }

  function getMaxIndex(rulesContext) {
    var switchRequestHistory = rulesContext ? rulesContext.getSwitchHistory() : null;
    var switchRequests = switchRequestHistory ? switchRequestHistory.getSwitchRequests() : [];
    var drops = 0;
    var noDrops = 0;
    var dropSize = 0;
    var switchRequest = (0,_SwitchRequest__WEBPACK_IMPORTED_MODULE_2__["default"])(context).create();

    for (var i = 0; i < switchRequests.length; i++) {
      if (switchRequests[i] !== undefined) {
        drops += switchRequests[i].drops;
        noDrops += switchRequests[i].noDrops;
        dropSize += switchRequests[i].dropSize;

        if (drops + noDrops >= SAMPLE_SIZE && drops / noDrops > MAX_SWITCH) {
          switchRequest.quality = i > 0 && switchRequests[i].drops > 0 ? i - 1 : i;
          switchRequest.reason = {
            index: switchRequest.quality,
            drops: drops,
            noDrops: noDrops,
            dropSize: dropSize
          };
          logger.debug('Switch history rule index: ' + switchRequest.quality + ' samples: ' + (drops + noDrops) + ' drops: ' + drops);
          break;
        }
      }
    }

    return switchRequest;
  }

  instance = {
    getMaxIndex: getMaxIndex
  };
  setup();
  return instance;
}

SwitchHistoryRule.__dashjs_factory_name = 'SwitchHistoryRule';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker__WEBPACK_IMPORTED_MODULE_0__["default"].getClassFactory(SwitchHistoryRule));

/***/ }),

/***/ "./src/streaming/rules/abr/ThroughputRule.js":
/*!***************************************************!*\
  !*** ./src/streaming/rules/abr/ThroughputRule.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_FactoryMaker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/FactoryMaker */ "./src/core/FactoryMaker.js");
/* harmony import */ var _SwitchRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SwitchRequest */ "./src/streaming/rules/SwitchRequest.js");
/* harmony import */ var _constants_Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants/Constants */ "./src/streaming/constants/Constants.js");
/* harmony import */ var _constants_MetricsConstants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants/MetricsConstants */ "./src/streaming/constants/MetricsConstants.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */





function ThroughputRule(config) {
  config = config || {};
  var context = this.context;
  var dashMetrics = config.dashMetrics;
  var instance;

  function setup() {}

  function checkConfig() {
    if (!dashMetrics || !dashMetrics.hasOwnProperty('getCurrentBufferState')) {
      throw new Error(_constants_Constants__WEBPACK_IMPORTED_MODULE_2__["default"].MISSING_CONFIG_ERROR);
    }
  }

  function getMaxIndex(rulesContext) {
    var switchRequest = (0,_SwitchRequest__WEBPACK_IMPORTED_MODULE_1__["default"])(context).create();

    if (!rulesContext || !rulesContext.hasOwnProperty('getMediaInfo') || !rulesContext.hasOwnProperty('getMediaType') || !rulesContext.hasOwnProperty('useBufferOccupancyABR') || !rulesContext.hasOwnProperty('getAbrController') || !rulesContext.hasOwnProperty('getScheduleController')) {
      return switchRequest;
    }

    checkConfig();
    var mediaInfo = rulesContext.getMediaInfo();
    var mediaType = rulesContext.getMediaType();
    var currentBufferState = dashMetrics.getCurrentBufferState(mediaType);
    var scheduleController = rulesContext.getScheduleController();
    var abrController = rulesContext.getAbrController();
    var streamInfo = rulesContext.getStreamInfo();
    var streamId = streamInfo ? streamInfo.id : null;
    var isDynamic = streamInfo && streamInfo.manifestInfo ? streamInfo.manifestInfo.isDynamic : null;
    var throughputHistory = abrController.getThroughputHistory();
    var throughput = throughputHistory.getSafeAverageThroughput(mediaType, isDynamic);
    var latency = throughputHistory.getAverageLatency(mediaType);
    var useBufferOccupancyABR = rulesContext.useBufferOccupancyABR();

    if (isNaN(throughput) || !currentBufferState || useBufferOccupancyABR) {
      return switchRequest;
    }

    if (abrController.getAbandonmentStateFor(streamId, mediaType) !== _constants_MetricsConstants__WEBPACK_IMPORTED_MODULE_3__["default"].ABANDON_LOAD) {
      if (currentBufferState.state === _constants_MetricsConstants__WEBPACK_IMPORTED_MODULE_3__["default"].BUFFER_LOADED || isDynamic) {
        switchRequest.quality = abrController.getQualityForBitrate(mediaInfo, throughput, streamId, latency);
        scheduleController.setTimeToLoadDelay(0);
        switchRequest.reason = {
          throughput: throughput,
          latency: latency
        };
      }
    }

    return switchRequest;
  }

  function reset() {// no persistent information to reset
  }

  instance = {
    getMaxIndex: getMaxIndex,
    reset: reset
  };
  setup();
  return instance;
}

ThroughputRule.__dashjs_factory_name = 'ThroughputRule';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker__WEBPACK_IMPORTED_MODULE_0__["default"].getClassFactory(ThroughputRule));

/***/ }),

/***/ "./src/streaming/rules/abr/lolp/LearningAbrController.js":
/*!***************************************************************!*\
  !*** ./src/streaming/rules/abr/lolp/LearningAbrController.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_FactoryMaker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core/FactoryMaker */ "./src/core/FactoryMaker.js");
/* harmony import */ var _core_Debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/Debug */ "./src/core/Debug.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Authors:
 * Abdelhak Bentaleb | National University of Singapore | bentaleb@comp.nus.edu.sg
 * Mehmet N. Akcay | Ozyegin University | necmettin.akcay@ozu.edu.tr
 * May Lim | National University of Singapore | maylim@comp.nus.edu.sg
 */


var WEIGHT_SELECTION_MODES = {
  MANUAL: 'manual_weight_selection',
  RANDOM: 'random_weight_selection',
  DYNAMIC: 'dynamic_weight_selection'
};

function LearningAbrController() {
  var context = this.context;
  var instance, logger, somBitrateNeurons, bitrateNormalizationFactor, latencyNormalizationFactor, minBitrate, weights, sortedCenters, weightSelectionMode;
  /**
   * Setup the class
   */

  function _setup() {
    logger = (0,_core_Debug__WEBPACK_IMPORTED_MODULE_1__["default"])(context).getInstance().getLogger(instance);

    _resetInitialSettings();
  }
  /**
   * Reset all values
   */


  function reset() {
    _resetInitialSettings();
  }
  /**
   * Reset to initial settings
   * @private
   */


  function _resetInitialSettings() {
    somBitrateNeurons = null;
    bitrateNormalizationFactor = 1;
    latencyNormalizationFactor = 100;
    minBitrate = 0;
    weights = null;
    sortedCenters = null;
    weightSelectionMode = WEIGHT_SELECTION_MODES.DYNAMIC;
  }
  /**
   * Returns the maximum throughput
   * @return {number}
   * @private
   */


  function _getMaxThroughput() {
    var maxThroughput = 0;

    if (somBitrateNeurons) {
      for (var i = 0; i < somBitrateNeurons.length; i++) {
        var neuron = somBitrateNeurons[i];

        if (neuron.state.throughput > maxThroughput) {
          maxThroughput = neuron.state.throughput;
        }
      }
    }

    return maxThroughput;
  }
  /**
   *
   * @param {array} w
   * @return {number}
   * @private
   */


  function _getMagnitude(w) {
    var magnitude = w.map(function (x) {
      return Math.pow(x, 2);
    }).reduce(function (sum, now) {
      return sum + now;
    });
    return Math.sqrt(magnitude);
  }
  /**
   *
   * @param {array} a
   * @param {array} b
   * @param {array} w
   * @return {number}
   * @private
   */


  function _getDistance(a, b, w) {
    var sum = a.map(function (x, i) {
      return w[i] * Math.pow(x - b[i], 2);
    }) // square the difference*w
    .reduce(function (sum, now) {
      return sum + now;
    }); // sum

    var sign = sum < 0 ? -1 : 1;
    return sign * Math.sqrt(Math.abs(sum));
  }
  /**
   *
   * @param {object} a
   * @param {object} b
   * @return {number}
   * @private
   */


  function _getNeuronDistance(a, b) {
    var aState = [a.state.throughput, a.state.latency, a.state.rebuffer, a.state["switch"]];
    var bState = [b.state.throughput, b.state.latency, b.state.rebuffer, b.state["switch"]];
    return _getDistance(aState, bState, [1, 1, 1, 1]);
  }
  /**
   *
   * @param {object} winnerNeuron
   * @param {array} somElements
   * @param {array} x
   * @private
   */


  function _updateNeurons(winnerNeuron, somElements, x) {
    for (var i = 0; i < somElements.length; i++) {
      var somNeuron = somElements[i];
      var sigma = 0.1;

      var neuronDistance = _getNeuronDistance(somNeuron, winnerNeuron);

      var neighbourHood = Math.exp(-1 * Math.pow(neuronDistance, 2) / (2 * Math.pow(sigma, 2)));

      _updateNeuronState(somNeuron, x, neighbourHood);
    }
  }
  /**
   *
   * @param {object} neuron
   * @param {array} x
   * @param {object} neighbourHood
   * @private
   */


  function _updateNeuronState(neuron, x, neighbourHood) {
    var state = neuron.state;
    var w = [0.01, 0.01, 0.01, 0.01]; // learning rate

    state.throughput = state.throughput + (x[0] - state.throughput) * w[0] * neighbourHood;
    state.latency = state.latency + (x[1] - state.latency) * w[1] * neighbourHood;
    state.rebuffer = state.rebuffer + (x[2] - state.rebuffer) * w[2] * neighbourHood;
    state["switch"] = state["switch"] + (x[3] - state["switch"]) * w[3] * neighbourHood;
  }
  /**
   *
   * @param {object} currentNeuron
   * @param {number} currentThroughput
   * @return {object}
   * @private
   */


  function _getDownShiftNeuron(currentNeuron, currentThroughput) {
    var maxSuitableBitrate = 0;
    var result = currentNeuron;

    if (somBitrateNeurons) {
      for (var i = 0; i < somBitrateNeurons.length; i++) {
        var n = somBitrateNeurons[i];

        if (n.bitrate < currentNeuron.bitrate && n.bitrate > maxSuitableBitrate && currentThroughput > n.bitrate) {
          // possible downshiftable neuron
          maxSuitableBitrate = n.bitrate;
          result = n;
        }
      }
    }

    return result;
  }
  /**
   *
   * @param {object} mediaInfo
   * @param {number} throughput
   * @param {number} latency
   * @param {number} bufferSize
   * @param {number} playbackRate
   * @param {number} currentQualityIndex
   * @param {object} dynamicWeightsSelector
   * @return {null|*}
   */


  function getNextQuality(mediaInfo, throughput, latency, bufferSize, playbackRate, currentQualityIndex, dynamicWeightsSelector) {
    // For Dynamic Weights Selector
    var currentLatency = latency;
    var currentBuffer = bufferSize;
    var currentThroughput = throughput;

    var somElements = _getSomBitrateNeurons(mediaInfo); // normalize throughput


    var throughputNormalized = throughput / bitrateNormalizationFactor; // saturate values higher than 1

    if (throughputNormalized > 1) {
      throughputNormalized = _getMaxThroughput();
    } // normalize latency


    latency = latency / latencyNormalizationFactor;
    var targetLatency = 0;
    var targetRebufferLevel = 0;
    var targetSwitch = 0; // 10K + video encoding is the recommended throughput

    var throughputDelta = 10000;
    logger.debug("getNextQuality called throughput:".concat(throughputNormalized, " latency:").concat(latency, " bufferSize:").concat(bufferSize, " currentQualityIndex:").concat(currentQualityIndex, " playbackRate:").concat(playbackRate));
    var currentNeuron = somElements[currentQualityIndex];
    var downloadTime = currentNeuron.bitrate * dynamicWeightsSelector.getSegmentDuration() / currentThroughput;
    var rebuffer = Math.max(0, downloadTime - currentBuffer); // check buffer for possible stall

    if (currentBuffer - downloadTime < dynamicWeightsSelector.getMinBuffer()) {
      logger.debug("Buffer is low for bitrate= ".concat(currentNeuron.bitrate, " downloadTime=").concat(downloadTime, " currentBuffer=").concat(currentBuffer, " rebuffer=").concat(rebuffer));
      return _getDownShiftNeuron(currentNeuron, currentThroughput).qualityIndex;
    }

    switch (weightSelectionMode) {
      case WEIGHT_SELECTION_MODES.MANUAL:
        _manualWeightSelection();

        break;

      case WEIGHT_SELECTION_MODES.RANDOM:
        _randomWeightSelection(somElements);

        break;

      case WEIGHT_SELECTION_MODES.DYNAMIC:
        _dynamicWeightSelection(dynamicWeightsSelector, somElements, currentLatency, currentBuffer, rebuffer, currentThroughput, playbackRate);

        break;

      default:
        _dynamicWeightSelection(dynamicWeightsSelector, somElements, currentLatency, currentBuffer, rebuffer, currentThroughput, playbackRate);

    }

    var minDistance = null;
    var minIndex = null;
    var winnerNeuron = null;

    for (var i = 0; i < somElements.length; i++) {
      var somNeuron = somElements[i];
      var somNeuronState = somNeuron.state;
      var somData = [somNeuronState.throughput, somNeuronState.latency, somNeuronState.rebuffer, somNeuronState["switch"]];
      var distanceWeights = weights.slice();
      var nextBuffer = dynamicWeightsSelector.getNextBufferWithBitrate(somNeuron.bitrate, currentBuffer, currentThroughput);
      var isBufferLow = nextBuffer < dynamicWeightsSelector.getMinBuffer();

      if (isBufferLow) {
        logger.debug("Buffer is low for bitrate=".concat(somNeuron.bitrate, " downloadTime=").concat(downloadTime, " currentBuffer=").concat(currentBuffer, " nextBuffer=").concat(nextBuffer));
      } // special condition downshift immediately


      if (somNeuron.bitrate > throughput - throughputDelta || isBufferLow) {
        if (somNeuron.bitrate !== minBitrate) {
          // encourage to pick smaller bitrates throughputWeight=100
          distanceWeights[0] = 100;
        }
      } // calculate the distance with the target


      var distance = _getDistance(somData, [throughputNormalized, targetLatency, targetRebufferLevel, targetSwitch], distanceWeights);

      if (minDistance === null || distance < minDistance) {
        minDistance = distance;
        minIndex = somNeuron.qualityIndex;
        winnerNeuron = somNeuron;
      }
    } // update current neuron and the neighbourhood with the calculated QoE
    // will punish current if it is not picked


    var bitrateSwitch = Math.abs(currentNeuron.bitrate - winnerNeuron.bitrate) / bitrateNormalizationFactor;

    _updateNeurons(currentNeuron, somElements, [throughputNormalized, latency, rebuffer, bitrateSwitch]); // update bmu and  neighbours with targetQoE=1, targetLatency=0


    _updateNeurons(winnerNeuron, somElements, [throughputNormalized, targetLatency, targetRebufferLevel, bitrateSwitch]);

    return minIndex;
  }
  /**
   * Option 1: Manual weights
   * @private
   */


  function _manualWeightSelection() {
    var throughputWeight = 0.4;
    var latencyWeight = 0.4;
    var bufferWeight = 0.4;
    var switchWeight = 0.4;
    weights = [throughputWeight, latencyWeight, bufferWeight, switchWeight]; // throughput, latency, buffer, switch
  }
  /**
   * Option 2: Random (Xavier) weights
   * @param {array} somElements
   * @private
   */


  function _randomWeightSelection(somElements) {
    weights = _getXavierWeights(somElements.length, 4);
  }
  /**
   * Dynamic Weight Selector weights
   * @param {object} dynamicWeightsSelector
   * @param {array} somElements
   * @param {number} currentLatency
   * @param {number} currentBuffer
   * @param {number} rebuffer
   * @param {number} currentThroughput
   * @param {number} playbackRate
   * @private
   */


  function _dynamicWeightSelection(dynamicWeightsSelector, somElements, currentLatency, currentBuffer, rebuffer, currentThroughput, playbackRate) {
    if (!weights) {
      weights = sortedCenters[sortedCenters.length - 1];
    } // Dynamic Weights Selector (step 2/2: find weights)


    var weightVector = dynamicWeightsSelector.findWeightVector(somElements, currentLatency, currentBuffer, rebuffer, currentThroughput, playbackRate);

    if (weightVector !== null && weightVector !== -1) {
      // null: something went wrong, -1: constraints not met
      weights = weightVector;
    }
  }
  /**
   *
   * @param {number }neuronCount
   * @param {number }weightCount
   * @return {array}
   * @private
   */


  function _getXavierWeights(neuronCount, weightCount) {
    var W = [];
    var upperBound = Math.sqrt(2 / neuronCount);

    for (var i = 0; i < weightCount; i++) {
      W.push(Math.random() * upperBound);
    }

    weights = W;
    return weights;
  }
  /**
   *
   * @param {object} mediaInfo
   * @return {array}
   * @private
   */


  function _getSomBitrateNeurons(mediaInfo) {
    if (!somBitrateNeurons) {
      somBitrateNeurons = [];
      var bitrateList = mediaInfo.bitrateList;
      var bitrateVector = [];
      minBitrate = bitrateList[0].bandwidth;
      bitrateList.forEach(function (element) {
        bitrateVector.push(element.bandwidth);

        if (element.bandwidth < minBitrate) {
          minBitrate = element.bandwidth;
        }
      });
      bitrateNormalizationFactor = _getMagnitude(bitrateVector);

      for (var i = 0; i < bitrateList.length; i++) {
        var neuron = {
          qualityIndex: i,
          bitrate: bitrateList[i].bandwidth,
          state: {
            // normalize throughputs
            throughput: bitrateList[i].bandwidth / bitrateNormalizationFactor,
            latency: 0,
            rebuffer: 0,
            "switch": 0
          }
        };
        somBitrateNeurons.push(neuron);
      }

      sortedCenters = _getInitialKmeansPlusPlusCenters(somBitrateNeurons);
    }

    return somBitrateNeurons;
  }
  /**
   *
   * @param {number} size
   * @return {array}
   * @private
   */


  function _getRandomData(size) {
    var dataArray = [];

    for (var i = 0; i < size; i++) {
      var data = [Math.random() * _getMaxThroughput(), //throughput
      Math.random(), //latency
      Math.random(), //buffersize
      Math.random() //switch
      ];
      dataArray.push(data);
    }

    return dataArray;
  }
  /**
   *
   * @param {array} somElements
   * @return {array}
   * @private
   */


  function _getInitialKmeansPlusPlusCenters(somElements) {
    var centers = [];

    var randomDataSet = _getRandomData(Math.pow(somElements.length, 2));

    centers.push(randomDataSet[0]);
    var distanceWeights = [1, 1, 1, 1];

    for (var k = 1; k < somElements.length; k++) {
      var nextPoint = null;
      var _maxDistance = null;

      for (var i = 0; i < randomDataSet.length; i++) {
        var currentPoint = randomDataSet[i];
        var minDistance = null;

        for (var j = 0; j < centers.length; j++) {
          var distance = _getDistance(currentPoint, centers[j], distanceWeights);

          if (minDistance === null || distance < minDistance) {
            minDistance = distance;
          }
        }

        if (_maxDistance === null || minDistance > _maxDistance) {
          nextPoint = currentPoint;
          _maxDistance = minDistance;
        }
      }

      centers.push(nextPoint);
    } // find the least similar center


    var maxDistance = null;
    var leastSimilarIndex = null;

    for (var _i = 0; _i < centers.length; _i++) {
      var _distance = 0;

      for (var _j = 0; _j < centers.length; _j++) {
        if (_i === _j) continue;
        _distance += _getDistance(centers[_i], centers[_j], distanceWeights);
      }

      if (maxDistance === null || _distance > maxDistance) {
        maxDistance = _distance;
        leastSimilarIndex = _i;
      }
    } // move centers to sortedCenters


    var sortedCenters = [];
    sortedCenters.push(centers[leastSimilarIndex]);
    centers.splice(leastSimilarIndex, 1);

    while (centers.length > 0) {
      var _minDistance = null;
      var minIndex = null;

      for (var _i2 = 0; _i2 < centers.length; _i2++) {
        var _distance2 = _getDistance(sortedCenters[0], centers[_i2], distanceWeights);

        if (_minDistance === null || _distance2 < _minDistance) {
          _minDistance = _distance2;
          minIndex = _i2;
        }
      }

      sortedCenters.push(centers[minIndex]);
      centers.splice(minIndex, 1);
    }

    return sortedCenters;
  }

  instance = {
    getNextQuality: getNextQuality,
    reset: reset
  };

  _setup();

  return instance;
}

LearningAbrController.__dashjs_factory_name = 'LearningAbrController';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker__WEBPACK_IMPORTED_MODULE_0__["default"].getClassFactory(LearningAbrController));

/***/ }),

/***/ "./src/streaming/rules/abr/lolp/LoLpQoEEvaluator.js":
/*!**********************************************************!*\
  !*** ./src/streaming/rules/abr/lolp/LoLpQoEEvaluator.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_FactoryMaker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core/FactoryMaker */ "./src/core/FactoryMaker.js");
/* harmony import */ var _QoeInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QoeInfo */ "./src/streaming/rules/abr/lolp/QoeInfo.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Authors:
 * Abdelhak Bentaleb | National University of Singapore | bentaleb@comp.nus.edu.sg
 * Mehmet N. Akcay | Ozyegin University | necmettin.akcay@ozu.edu.tr
 * May Lim | National University of Singapore | maylim@comp.nus.edu.sg
 */



function LoLpQoeEvaluator() {
  var instance, voPerSegmentQoeInfo, segmentDuration, maxBitrateKbps, minBitrateKbps;

  function _setup() {
    _resetInitialSettings();
  }

  function _resetInitialSettings() {
    voPerSegmentQoeInfo = null;
    segmentDuration = null;
    maxBitrateKbps = null;
    minBitrateKbps = null;
  }

  function setupPerSegmentQoe(sDuration, maxBrKbps, minBrKbps) {
    // Set up Per Segment QoeInfo
    voPerSegmentQoeInfo = _createQoeInfo('segment', sDuration, maxBrKbps, minBrKbps);
    segmentDuration = sDuration;
    maxBitrateKbps = maxBrKbps;
    minBitrateKbps = minBrKbps;
  }

  function _createQoeInfo(fragmentType, fragmentDuration, maxBitrateKbps, minBitrateKbps) {
    /*
     * [Weights][Source: Abdelhak Bentaleb, 2020 (last updated: 30 Mar 2020)]
     * bitrateReward:           segment duration, e.g. 0.5s
     * bitrateSwitchPenalty:    0.02s or 1s if the bitrate switch is too important
     * rebufferPenalty:         max encoding bitrate, e.g. 1000kbps
     * latencyPenalty:          if L ≤ 1.1 seconds then = min encoding bitrate * 0.05, otherwise = max encoding bitrate * 0.1
     * playbackSpeedPenalty:    min encoding bitrate, e.g. 200kbps
     */
    // Create new QoeInfo object
    var qoeInfo = new _QoeInfo__WEBPACK_IMPORTED_MODULE_1__["default"]();
    qoeInfo.type = fragmentType; // Set weight: bitrateReward
    // set some safe value, else consider throwing error

    if (!fragmentDuration) {
      qoeInfo.weights.bitrateReward = 1;
    } else {
      qoeInfo.weights.bitrateReward = fragmentDuration;
    } // Set weight: bitrateSwitchPenalty
    // qoeInfo.weights.bitrateSwitchPenalty = 0.02;


    qoeInfo.weights.bitrateSwitchPenalty = 1; // Set weight: rebufferPenalty
    // set some safe value, else consider throwing error

    if (!maxBitrateKbps) {
      qoeInfo.weights.rebufferPenalty = 1000;
    } else {
      qoeInfo.weights.rebufferPenalty = maxBitrateKbps;
    } // Set weight: latencyPenalty


    qoeInfo.weights.latencyPenalty = [];
    qoeInfo.weights.latencyPenalty.push({
      threshold: 1.1,
      penalty: minBitrateKbps * 0.05
    });
    qoeInfo.weights.latencyPenalty.push({
      threshold: 100000000,
      penalty: maxBitrateKbps * 0.1
    }); // Set weight: playbackSpeedPenalty

    if (!minBitrateKbps) qoeInfo.weights.playbackSpeedPenalty = 200; // set some safe value, else consider throwing error
    else qoeInfo.weights.playbackSpeedPenalty = minBitrateKbps;
    return qoeInfo;
  }

  function logSegmentMetrics(segmentBitrate, segmentRebufferTime, currentLatency, currentPlaybackSpeed) {
    if (voPerSegmentQoeInfo) {
      _logMetricsInQoeInfo(segmentBitrate, segmentRebufferTime, currentLatency, currentPlaybackSpeed, voPerSegmentQoeInfo);
    }
  }

  function _logMetricsInQoeInfo(bitrate, rebufferTime, latency, playbackSpeed, qoeInfo) {
    // Update: bitrate Weighted Sum value
    qoeInfo.bitrateWSum += qoeInfo.weights.bitrateReward * bitrate; // Update: bitrateSwitch Weighted Sum value

    if (qoeInfo.lastBitrate) {
      qoeInfo.bitrateSwitchWSum += qoeInfo.weights.bitrateSwitchPenalty * Math.abs(bitrate - qoeInfo.lastBitrate);
    }

    qoeInfo.lastBitrate = bitrate; // Update: rebuffer Weighted Sum value

    qoeInfo.rebufferWSum += qoeInfo.weights.rebufferPenalty * rebufferTime; // Update: latency Weighted Sum value

    for (var i = 0; i < qoeInfo.weights.latencyPenalty.length; i++) {
      var latencyRange = qoeInfo.weights.latencyPenalty[i];

      if (latency <= latencyRange.threshold) {
        qoeInfo.latencyWSum += latencyRange.penalty * latency;
        break;
      }
    } // Update: playbackSpeed Weighted Sum value


    qoeInfo.playbackSpeedWSum += qoeInfo.weights.playbackSpeedPenalty * Math.abs(1 - playbackSpeed); // Update: Total Qoe value

    qoeInfo.totalQoe = qoeInfo.bitrateWSum - qoeInfo.bitrateSwitchWSum - qoeInfo.rebufferWSum - qoeInfo.latencyWSum - qoeInfo.playbackSpeedWSum;
  } // Returns current Per Segment QoeInfo


  function getPerSegmentQoe() {
    return voPerSegmentQoeInfo;
  } // For one-time use only
  // Returns totalQoe based on a single set of metrics.


  function calculateSingleUseQoe(segmentBitrate, segmentRebufferTime, currentLatency, currentPlaybackSpeed) {
    var singleUseQoeInfo = null;

    if (segmentDuration && maxBitrateKbps && minBitrateKbps) {
      singleUseQoeInfo = _createQoeInfo('segment', segmentDuration, maxBitrateKbps, minBitrateKbps);
    }

    if (singleUseQoeInfo) {
      _logMetricsInQoeInfo(segmentBitrate, segmentRebufferTime, currentLatency, currentPlaybackSpeed, singleUseQoeInfo);

      return singleUseQoeInfo.totalQoe;
    } else {
      // Something went wrong..
      return 0;
    }
  }

  function reset() {
    _resetInitialSettings();
  }

  instance = {
    setupPerSegmentQoe: setupPerSegmentQoe,
    logSegmentMetrics: logSegmentMetrics,
    getPerSegmentQoe: getPerSegmentQoe,
    calculateSingleUseQoe: calculateSingleUseQoe,
    reset: reset
  };

  _setup();

  return instance;
}

LoLpQoeEvaluator.__dashjs_factory_name = 'LoLpQoeEvaluator';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker__WEBPACK_IMPORTED_MODULE_0__["default"].getClassFactory(LoLpQoeEvaluator));

/***/ }),

/***/ "./src/streaming/rules/abr/lolp/LoLpRule.js":
/*!**************************************************!*\
  !*** ./src/streaming/rules/abr/lolp/LoLpRule.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core/Debug */ "./src/core/Debug.js");
/* harmony import */ var _core_FactoryMaker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/FactoryMaker */ "./src/core/FactoryMaker.js");
/* harmony import */ var _LearningAbrController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LearningAbrController */ "./src/streaming/rules/abr/lolp/LearningAbrController.js");
/* harmony import */ var _LoLpQoEEvaluator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LoLpQoEEvaluator */ "./src/streaming/rules/abr/lolp/LoLpQoEEvaluator.js");
/* harmony import */ var _SwitchRequest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../SwitchRequest */ "./src/streaming/rules/SwitchRequest.js");
/* harmony import */ var _constants_MetricsConstants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../constants/MetricsConstants */ "./src/streaming/constants/MetricsConstants.js");
/* harmony import */ var _LoLpWeightSelector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./LoLpWeightSelector */ "./src/streaming/rules/abr/lolp/LoLpWeightSelector.js");
/* harmony import */ var _constants_Constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../constants/Constants */ "./src/streaming/constants/Constants.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Authors:
 * Abdelhak Bentaleb | National University of Singapore | bentaleb@comp.nus.edu.sg
 * Mehmet N. Akcay | Ozyegin University | necmettin.akcay@ozu.edu.tr
 * May Lim | National University of Singapore | maylim@comp.nus.edu.sg
 */








var DWS_TARGET_LATENCY = 1.5;
var DWS_BUFFER_MIN = 0.3;

function LoLPRule(config) {
  config = config || {};
  var dashMetrics = config.dashMetrics;
  var context = this.context;
  var logger, instance, learningController, qoeEvaluator;

  function _setup() {
    logger = (0,_core_Debug__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance().getLogger(instance);
    learningController = (0,_LearningAbrController__WEBPACK_IMPORTED_MODULE_2__["default"])(context).create();
    qoeEvaluator = (0,_LoLpQoEEvaluator__WEBPACK_IMPORTED_MODULE_3__["default"])(context).create();
  }

  function getMaxIndex(rulesContext) {
    try {
      var switchRequest = (0,_SwitchRequest__WEBPACK_IMPORTED_MODULE_4__["default"])(context).create();
      var mediaType = rulesContext.getMediaInfo().type;
      var abrController = rulesContext.getAbrController();
      var streamInfo = rulesContext.getStreamInfo();
      var currentQuality = abrController.getQualityFor(mediaType, streamInfo.id);
      var mediaInfo = rulesContext.getMediaInfo();
      var bufferStateVO = dashMetrics.getCurrentBufferState(mediaType);
      var scheduleController = rulesContext.getScheduleController();
      var currentBufferLevel = dashMetrics.getCurrentBufferLevel(mediaType, true);
      var isDynamic = streamInfo && streamInfo.manifestInfo ? streamInfo.manifestInfo.isDynamic : null;
      var playbackController = scheduleController.getPlaybackController();
      var latency = playbackController.getCurrentLiveLatency();

      if (!rulesContext.useLoLPABR() || mediaType === _constants_Constants__WEBPACK_IMPORTED_MODULE_7__["default"].AUDIO) {
        return switchRequest;
      }

      if (!latency) {
        latency = 0;
      }

      var playbackRate = playbackController.getPlaybackRate();
      var throughputHistory = abrController.getThroughputHistory();
      var throughput = throughputHistory.getSafeAverageThroughput(mediaType, isDynamic);
      logger.debug("Throughput ".concat(Math.round(throughput), " kbps"));

      if (isNaN(throughput) || !bufferStateVO) {
        return switchRequest;
      }

      if (abrController.getAbandonmentStateFor(streamInfo.id, mediaType) === _constants_MetricsConstants__WEBPACK_IMPORTED_MODULE_5__["default"].ABANDON_LOAD) {
        return switchRequest;
      } // QoE parameters


      var bitrateList = mediaInfo.bitrateList; // [{bandwidth: 200000, width: 640, height: 360}, ...]

      var segmentDuration = rulesContext.getRepresentationInfo().fragmentDuration;
      var minBitrateKbps = bitrateList[0].bandwidth / 1000.0; // min bitrate level

      var maxBitrateKbps = bitrateList[bitrateList.length - 1].bandwidth / 1000.0; // max bitrate level

      for (var i = 0; i < bitrateList.length; i++) {
        // in case bitrateList is not sorted as expected
        var b = bitrateList[i].bandwidth / 1000.0;
        if (b > maxBitrateKbps) maxBitrateKbps = b;else if (b < minBitrateKbps) {
          minBitrateKbps = b;
        }
      } // Learning rule pre-calculations


      var currentBitrate = bitrateList[currentQuality].bandwidth;
      var currentBitrateKbps = currentBitrate / 1000.0;
      var httpRequest = dashMetrics.getCurrentHttpRequest(mediaType, true);
      var lastFragmentDownloadTime = (httpRequest.tresponse.getTime() - httpRequest.trequest.getTime()) / 1000;
      var segmentRebufferTime = lastFragmentDownloadTime > segmentDuration ? lastFragmentDownloadTime - segmentDuration : 0;
      qoeEvaluator.setupPerSegmentQoe(segmentDuration, maxBitrateKbps, minBitrateKbps);
      qoeEvaluator.logSegmentMetrics(currentBitrateKbps, segmentRebufferTime, latency, playbackRate);
      /*
      * Dynamic Weights Selector (step 1/2: initialization)
      */

      var dynamicWeightsSelector = (0,_LoLpWeightSelector__WEBPACK_IMPORTED_MODULE_6__["default"])(context).create({
        targetLatency: DWS_TARGET_LATENCY,
        bufferMin: DWS_BUFFER_MIN,
        segmentDuration: segmentDuration,
        qoeEvaluator: qoeEvaluator
      });
      /*
       * Select next quality
       */

      switchRequest.quality = learningController.getNextQuality(mediaInfo, throughput * 1000, latency, currentBufferLevel, playbackRate, currentQuality, dynamicWeightsSelector);
      switchRequest.reason = {
        throughput: throughput,
        latency: latency
      };
      switchRequest.priority = _SwitchRequest__WEBPACK_IMPORTED_MODULE_4__["default"].PRIORITY.STRONG;
      scheduleController.setTimeToLoadDelay(0);

      if (switchRequest.quality !== currentQuality) {
        logger.debug('[TgcLearningRule][' + mediaType + '] requesting switch to index: ', switchRequest.quality, 'Average throughput', Math.round(throughput), 'kbps');
      }

      return switchRequest;
    } catch (e) {
      throw e;
    }
  }
  /**
   * Reset objects to their initial state
   * @private
   */


  function _resetInitialSettings() {
    learningController.reset();
    qoeEvaluator.reset();
  }
  /**
   * Reset the rule
   */


  function reset() {
    _resetInitialSettings();
  }

  instance = {
    getMaxIndex: getMaxIndex,
    reset: reset
  };

  _setup();

  return instance;
}

LoLPRule.__dashjs_factory_name = 'LoLPRule';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker__WEBPACK_IMPORTED_MODULE_1__["default"].getClassFactory(LoLPRule));

/***/ }),

/***/ "./src/streaming/rules/abr/lolp/LoLpWeightSelector.js":
/*!************************************************************!*\
  !*** ./src/streaming/rules/abr/lolp/LoLpWeightSelector.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_FactoryMaker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core/FactoryMaker */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Authors:
 * Abdelhak Bentaleb | National University of Singapore | bentaleb@comp.nus.edu.sg
 * Mehmet N. Akcay | Ozyegin University | necmettin.akcay@ozu.edu.tr
 * May Lim | National University of Singapore | maylim@comp.nus.edu.sg
 */


function LoLpWeightSelector(config) {
  var targetLatency = config.targetLatency;
  var bufferMin = config.bufferMin;
  var segmentDuration = config.segmentDuration;
  var qoeEvaluator = config.qoeEvaluator;
  var instance, valueList, weightTypeCount, weightOptions, previousLatency;
  /**
   *
   * @private
   */

  function _setup() {
    _resetInitialSettings();
  }
  /**
   *
   * @private
   */


  function _resetInitialSettings() {
    valueList = [0.2, 0.4, 0.6, 0.8, 1];
    weightTypeCount = 4;
    weightOptions = _getPermutations(valueList, weightTypeCount);
    previousLatency = 0;
  }
  /**
   * Next, at each segment boundary, ABR to input current neurons and target state (only used in Method II) to find the desired weight vector
   * @param {array} neurons
   * @param {number} currentLatency
   * @param {number} currentBuffer
   * @param {number} currentRebuffer
   * @param {number} currentThroughput
   * @param {number} playbackRate
   * @return {number|null}
   * @private
   */


  function findWeightVector(neurons, currentLatency, currentBuffer, currentRebuffer, currentThroughput, playbackRate) {
    var maxQoE = null;
    var winnerWeights = null;
    var winnerBitrate = null;
    var deltaLatency = Math.abs(currentLatency - previousLatency); // For each neuron, m

    neurons.forEach(function (neuron) {
      // For each possible weight vector, z
      // E.g. For [ throughput, latency, buffer, playbackRate, QoE ]
      //      Possible weightVector = [ 0.2, 0.4, 0.2, 0, 0.2 ]
      weightOptions.forEach(function (weightVector) {
        // Apply weightVector to neuron, compute utility and determine winnerWeights
        // Method I: Utility based on QoE given current state
        var weightsObj = {
          throughput: weightVector[0],
          latency: weightVector[1],
          buffer: weightVector[2],
          "switch": weightVector[3]
        };
        var downloadTime = neuron.bitrate * segmentDuration / currentThroughput;
        var nextBuffer = getNextBuffer(currentBuffer, downloadTime);
        var rebuffer = Math.max(0.00001, downloadTime - nextBuffer);
        var wt;

        if (weightsObj.buffer === 0) {
          wt = 10;
        } else {
          wt = 1 / weightsObj.buffer;
        }

        var weightedRebuffer = wt * rebuffer;

        if (weightsObj.latency === 0) {
          wt = 10;
        } else {
          wt = 1 / weightsObj.latency; // inverse the weight because wt and latency should have positive relationship, i.e., higher latency = higher wt
        }

        var weightedLatency = wt * neuron.state.latency;
        var totalQoE = qoeEvaluator.calculateSingleUseQoe(neuron.bitrate, weightedRebuffer, weightedLatency, playbackRate);

        if ((maxQoE === null || totalQoE > maxQoE) && _checkConstraints(currentLatency, nextBuffer, deltaLatency)) {
          maxQoE = totalQoE;
          winnerWeights = weightVector;
          winnerBitrate = neuron.bitrate;
        }
      });
    }); // winnerWeights was found, check if constraints are satisfied

    if (winnerWeights === null && winnerBitrate === null) {
      winnerWeights = -1;
    }

    previousLatency = currentLatency;
    return winnerWeights;
  }
  /**
   *
   * @param {number} nextLatency
   * @param {number} nextBuffer
   * @param {number} deltaLatency
   * @return {boolean}
   * @private
   */


  function _checkConstraints(nextLatency, nextBuffer, deltaLatency) {
    // A1
    // disabled till we find a better way of estimating latency
    // fails for all with current value
    if (nextLatency > targetLatency + deltaLatency) {
      return false;
    }

    return nextBuffer >= bufferMin;
  }
  /**
   *
   * @param {array} list
   * @param {number} length
   * @return {*}
   * @private
   */


  function _getPermutations(list, length) {
    // Copy initial values as arrays
    var perm = list.map(function (val) {
      return [val];
    }); // Our permutation generator

    var generate = function generate(perm, length, currLen) {
      // Reached desired length
      if (currLen === length) {
        return perm;
      } // For each existing permutation


      var len = perm.length;

      for (var i = 0; i < len; i++) {
        var currPerm = perm.shift(); // Create new permutation

        for (var k = 0; k < list.length; k++) {
          perm.push(currPerm.concat(list[k]));
        }
      } // Recurse


      return generate(perm, length, currLen + 1);
    }; // Start with size 1 because of initial values


    return generate(perm, length, 1);
  }
  /**
   *
   * @return {number}
   */


  function getMinBuffer() {
    return bufferMin;
  }
  /**
   *
   * @return {number}
   */


  function getSegmentDuration() {
    return segmentDuration;
  }
  /**
   *
   * @param {number} bitrateToDownload
   * @param {number} currentBuffer
   * @param {number} currentThroughput
   * @return {number}
   */


  function getNextBufferWithBitrate(bitrateToDownload, currentBuffer, currentThroughput) {
    var downloadTime = bitrateToDownload * segmentDuration / currentThroughput;
    return getNextBuffer(currentBuffer, downloadTime);
  }
  /**
   *
   * @param {number} currentBuffer
   * @param {number} downloadTime
   * @return {number}
   */


  function getNextBuffer(currentBuffer, downloadTime) {
    var segmentDuration = getSegmentDuration();
    var nextBuffer;

    if (downloadTime > segmentDuration) {
      nextBuffer = currentBuffer - segmentDuration;
    } else {
      nextBuffer = currentBuffer + segmentDuration - downloadTime;
    }

    return nextBuffer;
  }

  instance = {
    getMinBuffer: getMinBuffer,
    getSegmentDuration: getSegmentDuration,
    getNextBufferWithBitrate: getNextBufferWithBitrate,
    getNextBuffer: getNextBuffer,
    findWeightVector: findWeightVector
  };

  _setup();

  return instance;
}

LoLpWeightSelector.__dashjs_factory_name = 'LoLpWeightSelector';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker__WEBPACK_IMPORTED_MODULE_0__["default"].getClassFactory(LoLpWeightSelector));

/***/ }),

/***/ "./src/streaming/rules/abr/lolp/QoeInfo.js":
/*!*************************************************!*\
  !*** ./src/streaming/rules/abr/lolp/QoeInfo.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @class
 * @ignore
 */
var QoeInfo = function QoeInfo() {
  _classCallCheck(this, QoeInfo);

  // Type e.g. 'segment'
  this.type = null; // Store lastBitrate for calculation of bitrateSwitchWSum

  this.lastBitrate = null; // Weights for each Qoe factor

  this.weights = {};
  this.weights.bitrateReward = null;
  this.weights.bitrateSwitchPenalty = null;
  this.weights.rebufferPenalty = null;
  this.weights.latencyPenalty = null;
  this.weights.playbackSpeedPenalty = null; // Weighted Sum for each Qoe factor

  this.bitrateWSum = 0; // kbps

  this.bitrateSwitchWSum = 0; // kbps

  this.rebufferWSum = 0; // seconds

  this.latencyWSum = 0; // seconds

  this.playbackSpeedWSum = 0; // e.g. 0.95, 1.0, 1.05
  // Store total Qoe value based on current Weighted Sum values

  this.totalQoe = 0;
};

/* harmony default export */ __webpack_exports__["default"] = (QoeInfo);

/***/ }),

/***/ "./src/streaming/utils/CustomTimeRanges.js":
/*!*************************************************!*\
  !*** ./src/streaming/utils/CustomTimeRanges.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_FactoryMaker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/FactoryMaker */ "./src/core/FactoryMaker.js");
/* harmony import */ var _utils_SupervisorTools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/SupervisorTools */ "./src/streaming/utils/SupervisorTools.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */



function CustomTimeRanges() {
  var customTimeRangeArray = [];
  var length = 0;

  function add(start, end) {
    var i;

    for (i = 0; i < this.customTimeRangeArray.length && start > this.customTimeRangeArray[i].start; i++) {
      ;
    }

    this.customTimeRangeArray.splice(i, 0, {
      start: start,
      end: end
    });

    for (i = 0; i < this.customTimeRangeArray.length - 1; i++) {
      if (this.mergeRanges(i, i + 1)) {
        i--;
      }
    }

    this.length = this.customTimeRangeArray.length;
  }

  function clear() {
    this.customTimeRangeArray = [];
    this.length = 0;
  }

  function remove(start, end) {
    for (var i = 0; i < this.customTimeRangeArray.length; i++) {
      if (start <= this.customTimeRangeArray[i].start && end >= this.customTimeRangeArray[i].end) {
        //      |--------------Range i-------|
        //|---------------Range to remove ---------------|
        //    or
        //|--------------Range i-------|
        //|--------------Range to remove ---------------|
        //    or
        //                 |--------------Range i-------|
        //|--------------Range to remove ---------------|
        this.customTimeRangeArray.splice(i, 1);
        i--;
      } else if (start > this.customTimeRangeArray[i].start && end < this.customTimeRangeArray[i].end) {
        //|-----------------Range i----------------|
        //        |-------Range to remove -----|
        this.customTimeRangeArray.splice(i + 1, 0, {
          start: end,
          end: this.customTimeRangeArray[i].end
        });
        this.customTimeRangeArray[i].end = start;
        break;
      } else if (start > this.customTimeRangeArray[i].start && start < this.customTimeRangeArray[i].end) {
        //|-----------Range i----------|
        //                    |---------Range to remove --------|
        //    or
        //|-----------------Range i----------------|
        //            |-------Range to remove -----|
        this.customTimeRangeArray[i].end = start;
      } else if (end > this.customTimeRangeArray[i].start && end < this.customTimeRangeArray[i].end) {
        //                     |-----------Range i----------|
        //|---------Range to remove --------|
        //            or
        //|-----------------Range i----------------|
        //|-------Range to remove -----|
        this.customTimeRangeArray[i].start = end;
      }
    }

    this.length = this.customTimeRangeArray.length;
  }

  function mergeRanges(rangeIndex1, rangeIndex2) {
    var range1 = this.customTimeRangeArray[rangeIndex1];
    var range2 = this.customTimeRangeArray[rangeIndex2];

    if (range1.start <= range2.start && range2.start <= range1.end && range1.end <= range2.end) {
      //|-----------Range1----------|
      //                    |-----------Range2----------|
      range1.end = range2.end;
      this.customTimeRangeArray.splice(rangeIndex2, 1);
      return true;
    } else if (range2.start <= range1.start && range1.start <= range2.end && range2.end <= range1.end) {
      //                |-----------Range1----------|
      //|-----------Range2----------|
      range1.start = range2.start;
      this.customTimeRangeArray.splice(rangeIndex2, 1);
      return true;
    } else if (range2.start <= range1.start && range1.start <= range2.end && range1.end <= range2.end) {
      //      |--------Range1-------|
      //|---------------Range2--------------|
      this.customTimeRangeArray.splice(rangeIndex1, 1);
      return true;
    } else if (range1.start <= range2.start && range2.start <= range1.end && range2.end <= range1.end) {
      //|-----------------Range1--------------|
      //        |-----------Range2----------|
      this.customTimeRangeArray.splice(rangeIndex2, 1);
      return true;
    }

    return false;
  }

  function start(index) {
    (0,_utils_SupervisorTools__WEBPACK_IMPORTED_MODULE_1__.checkInteger)(index);

    if (index >= this.customTimeRangeArray.length || index < 0) {
      return NaN;
    }

    return this.customTimeRangeArray[index].start;
  }

  function end(index) {
    (0,_utils_SupervisorTools__WEBPACK_IMPORTED_MODULE_1__.checkInteger)(index);

    if (index >= this.customTimeRangeArray.length || index < 0) {
      return NaN;
    }

    return this.customTimeRangeArray[index].end;
  }

  return {
    customTimeRangeArray: customTimeRangeArray,
    length: length,
    add: add,
    clear: clear,
    remove: remove,
    mergeRanges: mergeRanges,
    start: start,
    end: end
  };
}

CustomTimeRanges.__dashjs_factory_name = 'CustomTimeRanges';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker__WEBPACK_IMPORTED_MODULE_0__["default"].getClassFactory(CustomTimeRanges));

/***/ }),

/***/ "./src/streaming/utils/SupervisorTools.js":
/*!************************************************!*\
  !*** ./src/streaming/utils/SupervisorTools.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkInteger": function() { return /* binding */ checkInteger; },
/* harmony export */   "checkIsVideoOrAudioType": function() { return /* binding */ checkIsVideoOrAudioType; },
/* harmony export */   "checkParameterType": function() { return /* binding */ checkParameterType; },
/* harmony export */   "checkRange": function() { return /* binding */ checkRange; }
/* harmony export */ });
/* harmony import */ var _constants_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/Constants */ "./src/streaming/constants/Constants.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

function checkParameterType(parameter, type) {
  if (_typeof(parameter) !== type) {
    throw _constants_Constants__WEBPACK_IMPORTED_MODULE_0__["default"].BAD_ARGUMENT_ERROR;
  }
}
function checkInteger(parameter) {
  var isInt = parameter !== null && !isNaN(parameter) && parameter % 1 === 0;

  if (!isInt) {
    throw _constants_Constants__WEBPACK_IMPORTED_MODULE_0__["default"].BAD_ARGUMENT_ERROR + ' : argument is not an integer';
  }
}
function checkRange(parameter, min, max) {
  if (parameter < min || parameter > max) {
    throw _constants_Constants__WEBPACK_IMPORTED_MODULE_0__["default"].BAD_ARGUMENT_ERROR + ' : argument out of range';
  }
}
function checkIsVideoOrAudioType(type) {
  if (typeof type !== 'string' || type !== _constants_Constants__WEBPACK_IMPORTED_MODULE_0__["default"].AUDIO && type !== _constants_Constants__WEBPACK_IMPORTED_MODULE_0__["default"].VIDEO) {
    throw _constants_Constants__WEBPACK_IMPORTED_MODULE_0__["default"].BAD_ARGUMENT_ERROR;
  }
}

/***/ }),

/***/ "./src/streaming/vo/metrics/HTTPRequest.js":
/*!*************************************************!*\
  !*** ./src/streaming/vo/metrics/HTTPRequest.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HTTPRequest": function() { return /* binding */ HTTPRequest; },
/* harmony export */   "HTTPRequestTrace": function() { return /* binding */ HTTPRequestTrace; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @classdesc This Object holds reference to the HTTPRequest for manifest, fragment and xlink loading.
 * Members which are not defined in ISO23009-1 Annex D should be prefixed by a _ so that they are ignored
 * by Metrics Reporting code.
 * @ignore
 */
var HTTPRequest =
/**
 * @class
 */
function HTTPRequest() {
  _classCallCheck(this, HTTPRequest);

  /**
   * Identifier of the TCP connection on which the HTTP request was sent.
   * @public
   */
  this.tcpid = null;
  /**
   * This is an optional parameter and should not be included in HTTP request/response transactions for progressive download.
   * The type of the request:
   * - MPD
   * - XLink expansion
   * - Initialization Fragment
   * - Index Fragment
   * - Media Fragment
   * - Bitstream Switching Fragment
   * - other
   * @public
   */

  this.type = null;
  /**
   * The original URL (before any redirects or failures)
   * @public
   */

  this.url = null;
  /**
   * The actual URL requested, if different from above
   * @public
   */

  this.actualurl = null;
  /**
   * The contents of the byte-range-spec part of the HTTP Range header.
   * @public
   */

  this.range = null;
  /**
   * Real-Time | The real time at which the request was sent.
   * @public
   */

  this.trequest = null;
  /**
   * Real-Time | The real time at which the first byte of the response was received.
   * @public
   */

  this.tresponse = null;
  /**
   * The HTTP response code.
   * @public
   */

  this.responsecode = null;
  /**
   * The duration of the throughput trace intervals (ms), for successful requests only.
   * @public
   */

  this.interval = null;
  /**
   * Throughput traces, for successful requests only.
   * @public
   */

  this.trace = [];
  /**
   * The CMSD static and dynamic values retrieved from CMSD response headers.
   * @public
   */

  this.cmsd = null;
  /**
   * Type of stream ("audio" | "video" etc..)
   * @public
   */

  this._stream = null;
  /**
   * Real-Time | The real time at which the request finished.
   * @public
   */

  this._tfinish = null;
  /**
   * The duration of the media requests, if available, in seconds.
   * @public
   */

  this._mediaduration = null;
  /**
   * The media segment quality
   * @public
   */

  this._quality = null;
  /**
   * all the response headers from request.
   * @public
   */

  this._responseHeaders = null;
  /**
   * The selected service location for the request. string.
   * @public
   */

  this._serviceLocation = null;
  /**
   * The type of the loader that was used. Distinguish between fetch loader and xhr loader
   */

  this._fileLoaderType = null;
};
/**
 * @classdesc This Object holds reference to the progress of the HTTPRequest.
 * @ignore
 */


var HTTPRequestTrace =
/**
 * @class
 */
function HTTPRequestTrace() {
  _classCallCheck(this, HTTPRequestTrace);

  /**
   * Real-Time | Measurement stream start.
   * @public
   */
  this.s = null;
  /**
   * Measurement stream duration (ms).
   * @public
   */

  this.d = null;
  /**
   * List of integers counting the bytes received in each trace interval within the measurement stream.
   * @public
   */

  this.b = [];
};

HTTPRequest.GET = 'GET';
HTTPRequest.HEAD = 'HEAD';
HTTPRequest.MPD_TYPE = 'MPD';
HTTPRequest.XLINK_EXPANSION_TYPE = 'XLinkExpansion';
HTTPRequest.INIT_SEGMENT_TYPE = 'InitializationSegment';
HTTPRequest.INDEX_SEGMENT_TYPE = 'IndexSegment';
HTTPRequest.MEDIA_SEGMENT_TYPE = 'MediaSegment';
HTTPRequest.BITSTREAM_SWITCHING_SEGMENT_TYPE = 'BitstreamSwitchingSegment';
HTTPRequest.MSS_FRAGMENT_INFO_SEGMENT_TYPE = 'FragmentInfoSegment';
HTTPRequest.DVB_REPORTING_TYPE = 'DVBReporting';
HTTPRequest.LICENSE = 'license';
HTTPRequest.CONTENT_STEERING_TYPE = 'ContentSteering';
HTTPRequest.OTHER_TYPE = 'other';


/***/ }),

/***/ "./node_modules/path-browserify/index.js":
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/***/ (function(module) {

"use strict";
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

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



function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;


/***/ }),

/***/ "./node_modules/ua-parser-js/src/ua-parser.js":
/*!****************************************************!*\
  !*** ./node_modules/ua-parser-js/src/ua-parser.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/////////////////////////////////////////////////////////////////////////////////
/* UAParser.js v1.0.37
   Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
   MIT License *//*
   Detect Browser, Engine, OS, CPU, and Device type/model from User-Agent data.
   Supports browser & node.js environment. 
   Demo   : https://faisalman.github.io/ua-parser-js
   Source : https://github.com/faisalman/ua-parser-js */
/////////////////////////////////////////////////////////////////////////////////

(function (window, undefined) {

    'use strict';

    //////////////
    // Constants
    /////////////


    var LIBVERSION  = '1.0.37',
        EMPTY       = '',
        UNKNOWN     = '?',
        FUNC_TYPE   = 'function',
        UNDEF_TYPE  = 'undefined',
        OBJ_TYPE    = 'object',
        STR_TYPE    = 'string',
        MAJOR       = 'major',
        MODEL       = 'model',
        NAME        = 'name',
        TYPE        = 'type',
        VENDOR      = 'vendor',
        VERSION     = 'version',
        ARCHITECTURE= 'architecture',
        CONSOLE     = 'console',
        MOBILE      = 'mobile',
        TABLET      = 'tablet',
        SMARTTV     = 'smarttv',
        WEARABLE    = 'wearable',
        EMBEDDED    = 'embedded',
        UA_MAX_LENGTH = 500;

    var AMAZON  = 'Amazon',
        APPLE   = 'Apple',
        ASUS    = 'ASUS',
        BLACKBERRY = 'BlackBerry',
        BROWSER = 'Browser',
        CHROME  = 'Chrome',
        EDGE    = 'Edge',
        FIREFOX = 'Firefox',
        GOOGLE  = 'Google',
        HUAWEI  = 'Huawei',
        LG      = 'LG',
        MICROSOFT = 'Microsoft',
        MOTOROLA  = 'Motorola',
        OPERA   = 'Opera',
        SAMSUNG = 'Samsung',
        SHARP   = 'Sharp',
        SONY    = 'Sony',
        XIAOMI  = 'Xiaomi',
        ZEBRA   = 'Zebra',
        FACEBOOK    = 'Facebook',
        CHROMIUM_OS = 'Chromium OS',
        MAC_OS  = 'Mac OS';

    ///////////
    // Helper
    //////////

    var extend = function (regexes, extensions) {
            var mergedRegexes = {};
            for (var i in regexes) {
                if (extensions[i] && extensions[i].length % 2 === 0) {
                    mergedRegexes[i] = extensions[i].concat(regexes[i]);
                } else {
                    mergedRegexes[i] = regexes[i];
                }
            }
            return mergedRegexes;
        },
        enumerize = function (arr) {
            var enums = {};
            for (var i=0; i<arr.length; i++) {
                enums[arr[i].toUpperCase()] = arr[i];
            }
            return enums;
        },
        has = function (str1, str2) {
            return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
        },
        lowerize = function (str) {
            return str.toLowerCase();
        },
        majorize = function (version) {
            return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g, EMPTY).split('.')[0] : undefined;
        },
        trim = function (str, len) {
            if (typeof(str) === STR_TYPE) {
                str = str.replace(/^\s\s*/, EMPTY);
                return typeof(len) === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
            }
    };

    ///////////////
    // Map helper
    //////////////

    var rgxMapper = function (ua, arrays) {

            var i = 0, j, k, p, q, matches, match;

            // loop through all regexes maps
            while (i < arrays.length && !matches) {

                var regex = arrays[i],       // even sequence (0,2,4,..)
                    props = arrays[i + 1];   // odd sequence (1,3,5,..)
                j = k = 0;

                // try matching uastring with regexes
                while (j < regex.length && !matches) {

                    if (!regex[j]) { break; }
                    matches = regex[j++].exec(ua);

                    if (!!matches) {
                        for (p = 0; p < props.length; p++) {
                            match = matches[++k];
                            q = props[p];
                            // check if given property is actually array
                            if (typeof q === OBJ_TYPE && q.length > 0) {
                                if (q.length === 2) {
                                    if (typeof q[1] == FUNC_TYPE) {
                                        // assign modified match
                                        this[q[0]] = q[1].call(this, match);
                                    } else {
                                        // assign given value, ignore regex match
                                        this[q[0]] = q[1];
                                    }
                                } else if (q.length === 3) {
                                    // check whether function or regex
                                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                        // call function (usually string mapper)
                                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                                    } else {
                                        // sanitize match using given regex
                                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                                    }
                                } else if (q.length === 4) {
                                        this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                                }
                            } else {
                                this[q] = match ? match : undefined;
                            }
                        }
                    }
                }
                i += 2;
            }
        },

        strMapper = function (str, map) {

            for (var i in map) {
                // check if current value is array
                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                    for (var j = 0; j < map[i].length; j++) {
                        if (has(map[i][j], str)) {
                            return (i === UNKNOWN) ? undefined : i;
                        }
                    }
                } else if (has(map[i], str)) {
                    return (i === UNKNOWN) ? undefined : i;
                }
            }
            return str;
    };

    ///////////////
    // String map
    //////////////

    // Safari < 3.0
    var oldSafariMap = {
            '1.0'   : '/8',
            '1.2'   : '/1',
            '1.3'   : '/3',
            '2.0'   : '/412',
            '2.0.2' : '/416',
            '2.0.3' : '/417',
            '2.0.4' : '/419',
            '?'     : '/'
        },
        windowsVersionMap = {
            'ME'        : '4.90',
            'NT 3.11'   : 'NT3.51',
            'NT 4.0'    : 'NT4.0',
            '2000'      : 'NT 5.0',
            'XP'        : ['NT 5.1', 'NT 5.2'],
            'Vista'     : 'NT 6.0',
            '7'         : 'NT 6.1',
            '8'         : 'NT 6.2',
            '8.1'       : 'NT 6.3',
            '10'        : ['NT 6.4', 'NT 10.0'],
            'RT'        : 'ARM'
    };

    //////////////
    // Regex map
    /////////////

    var regexes = {

        browser : [[

            /\b(?:crmo|crios)\/([\w\.]+)/i                                      // Chrome for Android/iOS
            ], [VERSION, [NAME, 'Chrome']], [
            /edg(?:e|ios|a)?\/([\w\.]+)/i                                       // Microsoft Edge
            ], [VERSION, [NAME, 'Edge']], [

            // Presto based
            /(opera mini)\/([-\w\.]+)/i,                                        // Opera Mini
            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,                 // Opera Mobi/Tablet
            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i                           // Opera
            ], [NAME, VERSION], [
            /opios[\/ ]+([\w\.]+)/i                                             // Opera mini on iphone >= 8.0
            ], [VERSION, [NAME, OPERA+' Mini']], [
            /\bopr\/([\w\.]+)/i                                                 // Opera Webkit
            ], [VERSION, [NAME, OPERA]], [

            // Mixed
            /\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i            // Baidu
            ], [VERSION, [NAME, 'Baidu']], [
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,      // Lunascape/Maxthon/Netfront/Jasmine/Blazer
            // Trident based
            /(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i,             // Avant/IEMobile/SlimBrowser
            /(?:ms|\()(ie) ([\w\.]+)/i,                                         // Internet Explorer

            // Webkit/KHTML based                                               // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
            /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                                                                                // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ, aka ShouQ
            /(heytap|ovi)browser\/([\d\.]+)/i,                                  // Heytap/Ovi
            /(weibo)__([\d\.]+)/i                                               // Weibo
            ], [NAME, VERSION], [
            /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i                 // UCBrowser
            ], [VERSION, [NAME, 'UC'+BROWSER]], [
            /microm.+\bqbcore\/([\w\.]+)/i,                                     // WeChat Desktop for Windows Built-in Browser
            /\bqbcore\/([\w\.]+).+microm/i,
            /micromessenger\/([\w\.]+)/i                                        // WeChat
            ], [VERSION, [NAME, 'WeChat']], [
            /konqueror\/([\w\.]+)/i                                             // Konqueror
            ], [VERSION, [NAME, 'Konqueror']], [
            /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i                       // IE11
            ], [VERSION, [NAME, 'IE']], [
            /ya(?:search)?browser\/([\w\.]+)/i                                  // Yandex
            ], [VERSION, [NAME, 'Yandex']], [
            /slbrowser\/([\w\.]+)/i                                             // Smart Lenovo Browser
            ], [VERSION, [NAME, 'Smart Lenovo '+BROWSER]], [
            /(avast|avg)\/([\w\.]+)/i                                           // Avast/AVG Secure Browser
            ], [[NAME, /(.+)/, '$1 Secure '+BROWSER], VERSION], [
            /\bfocus\/([\w\.]+)/i                                               // Firefox Focus
            ], [VERSION, [NAME, FIREFOX+' Focus']], [
            /\bopt\/([\w\.]+)/i                                                 // Opera Touch
            ], [VERSION, [NAME, OPERA+' Touch']], [
            /coc_coc\w+\/([\w\.]+)/i                                            // Coc Coc Browser
            ], [VERSION, [NAME, 'Coc Coc']], [
            /dolfin\/([\w\.]+)/i                                                // Dolphin
            ], [VERSION, [NAME, 'Dolphin']], [
            /coast\/([\w\.]+)/i                                                 // Opera Coast
            ], [VERSION, [NAME, OPERA+' Coast']], [
            /miuibrowser\/([\w\.]+)/i                                           // MIUI Browser
            ], [VERSION, [NAME, 'MIUI '+BROWSER]], [
            /fxios\/([-\w\.]+)/i                                                // Firefox for iOS
            ], [VERSION, [NAME, FIREFOX]], [
            /\bqihu|(qi?ho?o?|360)browser/i                                     // 360
            ], [[NAME, '360 ' + BROWSER]], [
            /(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i
            ], [[NAME, /(.+)/, '$1 ' + BROWSER], VERSION], [                    // Oculus/Sailfish/HuaweiBrowser/VivoBrowser
            /samsungbrowser\/([\w\.]+)/i                                        // Samsung Internet
            ], [VERSION, [NAME, SAMSUNG + ' Internet']], [
            /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
            ], [[NAME, /_/g, ' '], VERSION], [
            /metasr[\/ ]?([\d\.]+)/i                                            // Sogou Explorer
            ], [VERSION, [NAME, 'Sogou Explorer']], [
            /(sogou)mo\w+\/([\d\.]+)/i                                          // Sogou Mobile
            ], [[NAME, 'Sogou Mobile'], VERSION], [
            /(electron)\/([\w\.]+) safari/i,                                    // Electron-based App
            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,                   // Tesla
            /m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i                        // QQBrowser/2345 Browser
            ], [NAME, VERSION], [
            /(lbbrowser)/i,                                                     // LieBao Browser
            /\[(linkedin)app\]/i                                                // LinkedIn App for iOS & Android
            ], [NAME], [

            // WebView
            /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i       // Facebook App for iOS & Android
            ], [[NAME, FACEBOOK], VERSION], [
            /(Klarna)\/([\w\.]+)/i,                                             // Klarna Shopping Browser for iOS & Android
            /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,                             // Kakao App
            /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,                                  // Naver InApp
            /safari (line)\/([\w\.]+)/i,                                        // Line App for iOS
            /\b(line)\/([\w\.]+)\/iab/i,                                        // Line App for Android
            /(alipay)client\/([\w\.]+)/i,                                       // Alipay
            /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i                     // Chromium/Instagram/Snapchat
            ], [NAME, VERSION], [
            /\bgsa\/([\w\.]+) .*safari\//i                                      // Google Search Appliance on iOS
            ], [VERSION, [NAME, 'GSA']], [
            /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i                        // TikTok
            ], [VERSION, [NAME, 'TikTok']], [

            /headlesschrome(?:\/([\w\.]+)| )/i                                  // Chrome Headless
            ], [VERSION, [NAME, CHROME+' Headless']], [

            / wv\).+(chrome)\/([\w\.]+)/i                                       // Chrome WebView
            ], [[NAME, CHROME+' WebView'], VERSION], [

            /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i           // Android Browser
            ], [VERSION, [NAME, 'Android '+BROWSER]], [

            /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i       // Chrome/OmniWeb/Arora/Tizen/Nokia
            ], [NAME, VERSION], [

            /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i                      // Mobile Safari
            ], [VERSION, [NAME, 'Mobile Safari']], [
            /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i                // Safari & Safari Mobile
            ], [VERSION, NAME], [
            /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i                      // Safari < 3.0
            ], [NAME, [VERSION, strMapper, oldSafariMap]], [

            /(webkit|khtml)\/([\w\.]+)/i
            ], [NAME, VERSION], [

            // Gecko based
            /(navigator|netscape\d?)\/([-\w\.]+)/i                              // Netscape
            ], [[NAME, 'Netscape'], VERSION], [
            /mobile vr; rv:([\w\.]+)\).+firefox/i                               // Firefox Reality
            ], [VERSION, [NAME, FIREFOX+' Reality']], [
            /ekiohf.+(flow)\/([\w\.]+)/i,                                       // Flow
            /(swiftfox)/i,                                                      // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror/Klar
            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(firefox)\/([\w\.]+)/i,                                            // Other Firefox-based
            /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,                         // Mozilla

            // Other
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir/Obigo/Mosaic/Go/ICE/UP.Browser
            /(links) \(([\w\.]+)/i,                                             // Links
            /panasonic;(viera)/i                                                // Panasonic Viera
            ], [NAME, VERSION], [
            
            /(cobalt)\/([\w\.]+)/i                                              // Cobalt
            ], [NAME, [VERSION, /master.|lts./, ""]]
        ],

        cpu : [[

            /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i                     // AMD64 (x64)
            ], [[ARCHITECTURE, 'amd64']], [

            /(ia32(?=;))/i                                                      // IA32 (quicktime)
            ], [[ARCHITECTURE, lowerize]], [

            /((?:i[346]|x)86)[;\)]/i                                            // IA32 (x86)
            ], [[ARCHITECTURE, 'ia32']], [

            /\b(aarch64|arm(v?8e?l?|_?64))\b/i                                 // ARM64
            ], [[ARCHITECTURE, 'arm64']], [

            /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i                                   // ARMHF
            ], [[ARCHITECTURE, 'armhf']], [

            // PocketPC mistakenly identified as PowerPC
            /windows (ce|mobile); ppc;/i
            ], [[ARCHITECTURE, 'arm']], [

            /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i                            // PowerPC
            ], [[ARCHITECTURE, /ower/, EMPTY, lowerize]], [

            /(sun4\w)[;\)]/i                                                    // SPARC
            ], [[ARCHITECTURE, 'sparc']], [

            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
                                                                                // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
            ], [[ARCHITECTURE, lowerize]]
        ],

        device : [[

            //////////////////////////
            // MOBILES & TABLETS
            /////////////////////////

            // Samsung
            /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
            ], [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]], [
            /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
            /samsung[- ]([-\w]+)/i,
            /sec-(sgh\w+)/i
            ], [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]], [

            // Apple
            /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i                          // iPod/iPhone
            ], [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]], [
            /\((ipad);[-\w\),; ]+apple/i,                                       // iPad
            /applecoremedia\/[\w\.]+ \((ipad)/i,
            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
            ], [MODEL, [VENDOR, APPLE], [TYPE, TABLET]], [
            /(macintosh);/i
            ], [MODEL, [VENDOR, APPLE]], [

            // Sharp
            /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
            ], [MODEL, [VENDOR, SHARP], [TYPE, MOBILE]], [

            // Huawei
            /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
            ], [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]], [
            /(?:huawei|honor)([-\w ]+)[;\)]/i,
            /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
            ], [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]], [

            // Xiaomi
            /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,                  // Xiaomi POCO
            /\b; (\w+) build\/hm\1/i,                                           // Xiaomi Hongmi 'numeric' models
            /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,                             // Xiaomi Hongmi
            /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,                   // Xiaomi Redmi
            /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,        // Xiaomi Redmi 'numeric' models
            /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i // Xiaomi Mi
            ], [[MODEL, /_/g, ' '], [VENDOR, XIAOMI], [TYPE, MOBILE]], [
            /oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,                     // Redmi Pad
            /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i                        // Mi Pad tablets
            ],[[MODEL, /_/g, ' '], [VENDOR, XIAOMI], [TYPE, TABLET]], [

            // OPPO
            /; (\w+) bui.+ oppo/i,
            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
            ], [MODEL, [VENDOR, 'OPPO'], [TYPE, MOBILE]], [

            // Vivo
            /vivo (\w+)(?: bui|\))/i,
            /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
            ], [MODEL, [VENDOR, 'Vivo'], [TYPE, MOBILE]], [

            // Realme
            /\b(rmx[1-3]\d{3})(?: bui|;|\))/i
            ], [MODEL, [VENDOR, 'Realme'], [TYPE, MOBILE]], [

            // Motorola
            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
            /\bmot(?:orola)?[- ](\w*)/i,
            /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
            ], [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]], [
            /\b(mz60\d|xoom[2 ]{0,2}) build\//i
            ], [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]], [

            // LG
            /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
            ], [MODEL, [VENDOR, LG], [TYPE, TABLET]], [
            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
            /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
            /\blg-?([\d\w]+) bui/i
            ], [MODEL, [VENDOR, LG], [TYPE, MOBILE]], [

            // Lenovo
            /(ideatab[-\w ]+)/i,
            /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
            ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [

            // Nokia
            /(?:maemo|nokia).*(n900|lumia \d+)/i,
            /nokia[-_ ]?([-\w\.]*)/i
            ], [[MODEL, /_/g, ' '], [VENDOR, 'Nokia'], [TYPE, MOBILE]], [

            // Google
            /(pixel c)\b/i                                                      // Google Pixel C
            ], [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]], [
            /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i                         // Google Pixel
            ], [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]], [

            // Sony
            /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
            ], [MODEL, [VENDOR, SONY], [TYPE, MOBILE]], [
            /sony tablet [ps]/i,
            /\b(?:sony)?sgp\w+(?: bui|\))/i
            ], [[MODEL, 'Xperia Tablet'], [VENDOR, SONY], [TYPE, TABLET]], [

            // OnePlus
            / (kb2005|in20[12]5|be20[12][59])\b/i,
            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
            ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

            // Amazon
            /(alexa)webm/i,
            /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,                             // Kindle Fire without Silk / Echo Show
            /(kf[a-z]+)( bui|\)).+silk\//i                                      // Kindle Fire HD
            ], [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]], [
            /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i                     // Fire Phone
            ], [[MODEL, /(.+)/g, 'Fire Phone $1'], [VENDOR, AMAZON], [TYPE, MOBILE]], [

            // BlackBerry
            /(playbook);[-\w\),; ]+(rim)/i                                      // BlackBerry PlayBook
            ], [MODEL, VENDOR, [TYPE, TABLET]], [
            /\b((?:bb[a-f]|st[hv])100-\d)/i,
            /\(bb10; (\w+)/i                                                    // BlackBerry 10
            ], [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]], [

            // Asus
            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
            ], [MODEL, [VENDOR, ASUS], [TYPE, TABLET]], [
            / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
            ], [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]], [

            // HTC
            /(nexus 9)/i                                                        // HTC Nexus 9
            ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [
            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,                         // HTC

            // ZTE
            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
            /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i         // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

            // Acer
            /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
            ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

            // Meizu
            /droid.+; (m[1-5] note) bui/i,
            /\bmz-([-\w]{2,})/i
            ], [MODEL, [VENDOR, 'Meizu'], [TYPE, MOBILE]], [
                
            // Ulefone
            /; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i
            ], [MODEL, [VENDOR, 'Ulefone'], [TYPE, MOBILE]], [

            // MIXED
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,
                                                                                // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
            /(hp) ([\w ]+\w)/i,                                                 // HP iPAQ
            /(asus)-?(\w+)/i,                                                   // Asus
            /(microsoft); (lumia[\w ]+)/i,                                      // Microsoft Lumia
            /(lenovo)[-_ ]?([-\w]+)/i,                                          // Lenovo
            /(jolla)/i,                                                         // Jolla
            /(oppo) ?([\w ]+) bui/i                                             // OPPO
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /(kobo)\s(ereader|touch)/i,                                         // Kobo
            /(archos) (gamepad2?)/i,                                            // Archos
            /(hp).+(touchpad(?!.+tablet)|tablet)/i,                             // HP TouchPad
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(nook)[\w ]+build\/(\w+)/i,                                        // Nook
            /(dell) (strea[kpr\d ]*[\dko])/i,                                   // Dell Streak
            /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,                                  // Le Pan Tablets
            /(trinity)[- ]*(t\d{3}) bui/i,                                      // Trinity Tablets
            /(gigaset)[- ]+(q\w{1,9}) bui/i,                                    // Gigaset Tablets
            /(vodafone) ([\w ]+)(?:\)| bui)/i                                   // Vodafone
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(surface duo)/i                                                    // Surface Duo
            ], [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]], [
            /droid [\d\.]+; (fp\du?)(?: b|\))/i                                 // Fairphone
            ], [MODEL, [VENDOR, 'Fairphone'], [TYPE, MOBILE]], [
            /(u304aa)/i                                                         // AT&T
            ], [MODEL, [VENDOR, 'AT&T'], [TYPE, MOBILE]], [
            /\bsie-(\w*)/i                                                      // Siemens
            ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [
            /\b(rct\w+) b/i                                                     // RCA Tablets
            ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [
            /\b(venue[\d ]{2,7}) b/i                                            // Dell Venue Tablets
            ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [
            /\b(q(?:mv|ta)\w+) b/i                                              // Verizon Tablet
            ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [
            /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i                       // Barnes & Noble Tablet
            ], [MODEL, [VENDOR, 'Barnes & Noble'], [TYPE, TABLET]], [
            /\b(tm\d{3}\w+) b/i
            ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [
            /\b(k88) b/i                                                        // ZTE K Series Tablet
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [
            /\b(nx\d{3}j) b/i                                                   // ZTE Nubia
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [
            /\b(gen\d{3}) b.+49h/i                                              // Swiss GEN Mobile
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [
            /\b(zur\d{3}) b/i                                                   // Swiss ZUR Tablet
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [
            /\b((zeki)?tb.*\b) b/i                                              // Zeki Tablets
            ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [
            /\b([yr]\d{2}) b/i,
            /\b(dragon[- ]+touch |dt)(\w{5}) b/i                                // Dragon Touch Tablet
            ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [
            /\b(ns-?\w{0,9}) b/i                                                // Insignia Tablets
            ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [
            /\b((nxa|next)-?\w{0,9}) b/i                                        // NextBook Tablets
            ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [
            /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i                  // Voice Xtreme Phones
            ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [
            /\b(lvtel\-)?(v1[12]) b/i                                           // LvTel Phones
            ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [
            /\b(ph-1) /i                                                        // Essential PH-1
            ], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [
            /\b(v(100md|700na|7011|917g).*\b) b/i                               // Envizen Tablets
            ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [
            /\b(trio[-\w\. ]+) b/i                                              // MachSpeed Tablets
            ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [
            /\btu_(1491) b/i                                                    // Rotor Tablets
            ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [
            /(shield[\w ]+) b/i                                                 // Nvidia Shield Tablets
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, TABLET]], [
            /(sprint) (\w+)/i                                                   // Sprint Phones
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /(kin\.[onetw]{3})/i                                                // Microsoft Kin
            ], [[MODEL, /\./g, ' '], [VENDOR, MICROSOFT], [TYPE, MOBILE]], [
            /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i             // Zebra
            ], [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]], [
            /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
            ], [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]], [

            ///////////////////
            // SMARTTVS
            ///////////////////

            /smart-tv.+(samsung)/i                                              // Samsung
            ], [VENDOR, [TYPE, SMARTTV]], [
            /hbbtv.+maple;(\d+)/i
            ], [[MODEL, /^/, 'SmartTV'], [VENDOR, SAMSUNG], [TYPE, SMARTTV]], [
            /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i        // LG SmartTV
            ], [[VENDOR, LG], [TYPE, SMARTTV]], [
            /(apple) ?tv/i                                                      // Apple TV
            ], [VENDOR, [MODEL, APPLE+' TV'], [TYPE, SMARTTV]], [
            /crkey/i                                                            // Google Chromecast
            ], [[MODEL, CHROME+'cast'], [VENDOR, GOOGLE], [TYPE, SMARTTV]], [
            /droid.+aft(\w+)( bui|\))/i                                         // Fire TV
            ], [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]], [
            /\(dtv[\);].+(aquos)/i,
            /(aquos-tv[\w ]+)\)/i                                               // Sharp
            ], [MODEL, [VENDOR, SHARP], [TYPE, SMARTTV]],[
            /(bravia[\w ]+)( bui|\))/i                                              // Sony
            ], [MODEL, [VENDOR, SONY], [TYPE, SMARTTV]], [
            /(mitv-\w{5}) bui/i                                                 // Xiaomi
            ], [MODEL, [VENDOR, XIAOMI], [TYPE, SMARTTV]], [
            /Hbbtv.*(technisat) (.*);/i                                         // TechniSAT
            ], [VENDOR, MODEL, [TYPE, SMARTTV]], [
            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,                          // Roku
            /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i         // HbbTV devices
            ], [[VENDOR, trim], [MODEL, trim], [TYPE, SMARTTV]], [
            /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i                   // SmartTV from Unidentified Vendors
            ], [[TYPE, SMARTTV]], [

            ///////////////////
            // CONSOLES
            ///////////////////

            /(ouya)/i,                                                          // Ouya
            /(nintendo) ([wids3utch]+)/i                                        // Nintendo
            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [
            /droid.+; (shield) bui/i                                            // Nvidia
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [
            /(playstation [345portablevi]+)/i                                   // Playstation
            ], [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]], [
            /\b(xbox(?: one)?(?!; xbox))[\); ]/i                                // Microsoft Xbox
            ], [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]], [

            ///////////////////
            // WEARABLES
            ///////////////////

            /((pebble))app/i                                                    // Pebble
            ], [VENDOR, MODEL, [TYPE, WEARABLE]], [
            /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i                              // Apple Watch
            ], [MODEL, [VENDOR, APPLE], [TYPE, WEARABLE]], [
            /droid.+; (glass) \d/i                                              // Google Glass
            ], [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]], [
            /droid.+; (wt63?0{2,3})\)/i
            ], [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]], [
            /(quest( 2| pro)?)/i                                                // Oculus Quest
            ], [MODEL, [VENDOR, FACEBOOK], [TYPE, WEARABLE]], [

            ///////////////////
            // EMBEDDED
            ///////////////////

            /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i                              // Tesla
            ], [VENDOR, [TYPE, EMBEDDED]], [
            /(aeobc)\b/i                                                        // Echo Dot
            ], [MODEL, [VENDOR, AMAZON], [TYPE, EMBEDDED]], [

            ////////////////////
            // MIXED (GENERIC)
            ///////////////////

            /droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i    // Android Phones from Unidentified Vendors
            ], [MODEL, [TYPE, MOBILE]], [
            /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i       // Android Tablets from Unidentified Vendors
            ], [MODEL, [TYPE, TABLET]], [
            /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i                      // Unidentifiable Tablet
            ], [[TYPE, TABLET]], [
            /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i    // Unidentifiable Mobile
            ], [[TYPE, MOBILE]], [
            /(android[-\w\. ]{0,9});.+buil/i                                    // Generic Android Device
            ], [MODEL, [VENDOR, 'Generic']]
        ],

        engine : [[

            /windows.+ edge\/([\w\.]+)/i                                       // EdgeHTML
            ], [VERSION, [NAME, EDGE+'HTML']], [

            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i                         // Blink
            ], [VERSION, [NAME, 'Blink']], [

            /(presto)\/([\w\.]+)/i,                                             // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
            /ekioh(flow)\/([\w\.]+)/i,                                          // Flow
            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,                           // KHTML/Tasman/Links
            /(icab)[\/ ]([23]\.[\d\.]+)/i,                                      // iCab
            /\b(libweb)/i
            ], [NAME, VERSION], [

            /rv\:([\w\.]{1,9})\b.+(gecko)/i                                     // Gecko
            ], [VERSION, NAME]
        ],

        os : [[

            // Windows
            /microsoft (windows) (vista|xp)/i                                   // Windows (iTunes)
            ], [NAME, VERSION], [
            /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i             // Windows Phone
            ], [NAME, [VERSION, strMapper, windowsVersionMap]], [
            /windows nt 6\.2; (arm)/i,                                        // Windows RT
            /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
            /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i
            ], [[VERSION, strMapper, windowsVersionMap], [NAME, 'Windows']], [

            // iOS/macOS
            /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,              // iOS
            /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
            /cfnetwork\/.+darwin/i
            ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [
            /(mac os x) ?([\w\. ]*)/i,
            /(macintosh|mac_powerpc\b)(?!.+haiku)/i                             // Mac OS
            ], [[NAME, MAC_OS], [VERSION, /_/g, '.']], [

            // Mobile OSes
            /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i                    // Android-x86/HarmonyOS
            ], [VERSION, NAME], [                                               // Android/WebOS/QNX/Bada/RIM/Maemo/MeeGo/Sailfish OS
            /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
            /(blackberry)\w*\/([\w\.]*)/i,                                      // Blackberry
            /(tizen|kaios)[\/ ]([\w\.]+)/i,                                     // Tizen/KaiOS
            /\((series40);/i                                                    // Series 40
            ], [NAME, VERSION], [
            /\(bb(10);/i                                                        // BlackBerry 10
            ], [VERSION, [NAME, BLACKBERRY]], [
            /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i         // Symbian
            ], [VERSION, [NAME, 'Symbian']], [
            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i // Firefox OS
            ], [VERSION, [NAME, FIREFOX+' OS']], [
            /web0s;.+rt(tv)/i,
            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i                              // WebOS
            ], [VERSION, [NAME, 'webOS']], [
            /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i                              // watchOS
            ], [VERSION, [NAME, 'watchOS']], [

            // Google Chromecast
            /crkey\/([\d\.]+)/i                                                 // Google Chromecast
            ], [VERSION, [NAME, CHROME+'cast']], [
            /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i                                  // Chromium OS
            ], [[NAME, CHROMIUM_OS], VERSION],[

            // Smart TVs
            /panasonic;(viera)/i,                                               // Panasonic Viera
            /(netrange)mmh/i,                                                   // Netrange
            /(nettv)\/(\d+\.[\w\.]+)/i,                                         // NetTV

            // Console
            /(nintendo|playstation) ([wids345portablevuch]+)/i,                 // Nintendo/Playstation
            /(xbox); +xbox ([^\);]+)/i,                                         // Microsoft Xbox (360, One, X, S, Series X, Series S)

            // Other
            /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,                            // Joli/Palm
            /(mint)[\/\(\) ]?(\w*)/i,                                           // Mint
            /(mageia|vectorlinux)[; ]/i,                                        // Mageia/VectorLinux
            /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                                                                                // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
            /(hurd|linux) ?([\w\.]*)/i,                                         // Hurd/Linux
            /(gnu) ?([\w\.]*)/i,                                                // GNU
            /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, // FreeBSD/NetBSD/OpenBSD/PC-BSD/GhostBSD/DragonFly
            /(haiku) (\w+)/i                                                    // Haiku
            ], [NAME, VERSION], [
            /(sunos) ?([\w\.\d]*)/i                                             // Solaris
            ], [[NAME, 'Solaris'], VERSION], [
            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,                              // Solaris
            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,                                  // AIX
            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, // BeOS/OS2/AmigaOS/MorphOS/OpenVMS/Fuchsia/HP-UX/SerenityOS
            /(unix) ?([\w\.]*)/i                                                // UNIX
            ], [NAME, VERSION]
        ]
    };

    /////////////////
    // Constructor
    ////////////////

    var UAParser = function (ua, extensions) {

        if (typeof ua === OBJ_TYPE) {
            extensions = ua;
            ua = undefined;
        }

        if (!(this instanceof UAParser)) {
            return new UAParser(ua, extensions).getResult();
        }

        var _navigator = (typeof window !== UNDEF_TYPE && window.navigator) ? window.navigator : undefined;
        var _ua = ua || ((_navigator && _navigator.userAgent) ? _navigator.userAgent : EMPTY);
        var _uach = (_navigator && _navigator.userAgentData) ? _navigator.userAgentData : undefined;
        var _rgxmap = extensions ? extend(regexes, extensions) : regexes;
        var _isSelfNav = _navigator && _navigator.userAgent == _ua;

        this.getBrowser = function () {
            var _browser = {};
            _browser[NAME] = undefined;
            _browser[VERSION] = undefined;
            rgxMapper.call(_browser, _ua, _rgxmap.browser);
            _browser[MAJOR] = majorize(_browser[VERSION]);
            // Brave-specific detection
            if (_isSelfNav && _navigator && _navigator.brave && typeof _navigator.brave.isBrave == FUNC_TYPE) {
                _browser[NAME] = 'Brave';
            }
            return _browser;
        };
        this.getCPU = function () {
            var _cpu = {};
            _cpu[ARCHITECTURE] = undefined;
            rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
            return _cpu;
        };
        this.getDevice = function () {
            var _device = {};
            _device[VENDOR] = undefined;
            _device[MODEL] = undefined;
            _device[TYPE] = undefined;
            rgxMapper.call(_device, _ua, _rgxmap.device);
            if (_isSelfNav && !_device[TYPE] && _uach && _uach.mobile) {
                _device[TYPE] = MOBILE;
            }
            // iPadOS-specific detection: identified as Mac, but has some iOS-only properties
            if (_isSelfNav && _device[MODEL] == 'Macintosh' && _navigator && typeof _navigator.standalone !== UNDEF_TYPE && _navigator.maxTouchPoints && _navigator.maxTouchPoints > 2) {
                _device[MODEL] = 'iPad';
                _device[TYPE] = TABLET;
            }
            return _device;
        };
        this.getEngine = function () {
            var _engine = {};
            _engine[NAME] = undefined;
            _engine[VERSION] = undefined;
            rgxMapper.call(_engine, _ua, _rgxmap.engine);
            return _engine;
        };
        this.getOS = function () {
            var _os = {};
            _os[NAME] = undefined;
            _os[VERSION] = undefined;
            rgxMapper.call(_os, _ua, _rgxmap.os);
            if (_isSelfNav && !_os[NAME] && _uach && _uach.platform != 'Unknown') {
                _os[NAME] = _uach.platform  
                                    .replace(/chrome os/i, CHROMIUM_OS)
                                    .replace(/macos/i, MAC_OS);           // backward compatibility
            }
            return _os;
        };
        this.getResult = function () {
            return {
                ua      : this.getUA(),
                browser : this.getBrowser(),
                engine  : this.getEngine(),
                os      : this.getOS(),
                device  : this.getDevice(),
                cpu     : this.getCPU()
            };
        };
        this.getUA = function () {
            return _ua;
        };
        this.setUA = function (ua) {
            _ua = (typeof ua === STR_TYPE && ua.length > UA_MAX_LENGTH) ? trim(ua, UA_MAX_LENGTH) : ua;
            return this;
        };
        this.setUA(_ua);
        return this;
    };

    UAParser.VERSION = LIBVERSION;
    UAParser.BROWSER =  enumerize([NAME, VERSION, MAJOR]);
    UAParser.CPU = enumerize([ARCHITECTURE]);
    UAParser.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
    UAParser.ENGINE = UAParser.OS = enumerize([NAME, VERSION]);

    ///////////
    // Export
    //////////

    // check js environment
    if (typeof(exports) !== UNDEF_TYPE) {
        // nodejs env
        if ("object" !== UNDEF_TYPE && module.exports) {
            exports = module.exports = UAParser;
        }
        exports.UAParser = UAParser;
    } else {
        // requirejs env (optional)
        if ("function" === FUNC_TYPE && __webpack_require__.amdO) {
            !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
                return UAParser;
            }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } else if (typeof window !== UNDEF_TYPE) {
            // browser env
            window.UAParser = UAParser;
        }
    }

    // jQuery/Zepto specific (optional)
    // Note:
    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
    //   and we should catch that.
    var $ = typeof window !== UNDEF_TYPE && (window.jQuery || window.Zepto);
    if ($ && !$.ua) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function () {
            return parser.getUA();
        };
        $.ua.set = function (ua) {
            parser.setUA(ua);
            var result = parser.getResult();
            for (var prop in result) {
                $.ua[prop] = result[prop];
            }
        };
    }

})(typeof window === 'object' ? window : this);


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
/******/ 	/* webpack/runtime/amd options */
/******/ 	!function() {
/******/ 		__webpack_require__.amdO = {};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!***************************************************!*\
  !*** ./src/streaming/metrics/MetricsReporting.js ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_DVBErrorsTranslator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/DVBErrorsTranslator */ "./src/streaming/metrics/utils/DVBErrorsTranslator.js");
/* harmony import */ var _MetricsReportingEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MetricsReportingEvents */ "./src/streaming/metrics/MetricsReportingEvents.js");
/* harmony import */ var _controllers_MetricsCollectionController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controllers/MetricsCollectionController */ "./src/streaming/metrics/controllers/MetricsCollectionController.js");
/* harmony import */ var _metrics_MetricsHandlerFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./metrics/MetricsHandlerFactory */ "./src/streaming/metrics/metrics/MetricsHandlerFactory.js");
/* harmony import */ var _reporting_ReportingFactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reporting/ReportingFactory */ "./src/streaming/metrics/reporting/ReportingFactory.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */






function MetricsReporting() {
  var context = this.context;
  var instance, dvbErrorsTranslator;
  /**
   * Create a MetricsCollectionController, and a DVBErrorsTranslator
   * @param {Object} config - dependancies from owner
   * @return {MetricsCollectionController} Metrics Collection Controller
   */

  function createMetricsReporting(config) {
    dvbErrorsTranslator = (0,_utils_DVBErrorsTranslator__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance({
      eventBus: config.eventBus,
      dashMetrics: config.dashMetrics,
      metricsConstants: config.metricsConstants,
      events: config.events
    });
    dvbErrorsTranslator.initialize();
    return (0,_controllers_MetricsCollectionController__WEBPACK_IMPORTED_MODULE_2__["default"])(context).create(config);
  }
  /**
   * Get the ReportingFactory to allow new reporters to be registered
   * @return {ReportingFactory} Reporting Factory
   */


  function getReportingFactory() {
    return (0,_reporting_ReportingFactory__WEBPACK_IMPORTED_MODULE_4__["default"])(context).getInstance();
  }
  /**
   * Get the MetricsHandlerFactory to allow new handlers to be registered
   * @return {MetricsHandlerFactory} Metrics Handler Factory
   */


  function getMetricsHandlerFactory() {
    return (0,_metrics_MetricsHandlerFactory__WEBPACK_IMPORTED_MODULE_3__["default"])(context).getInstance();
  }

  instance = {
    createMetricsReporting: createMetricsReporting,
    getReportingFactory: getReportingFactory,
    getMetricsHandlerFactory: getMetricsHandlerFactory
  };
  return instance;
}

MetricsReporting.__dashjs_factory_name = 'MetricsReporting';
var factory = dashjs.FactoryMaker.getClassFactory(MetricsReporting);
/* jshint ignore:line */

factory.events = _MetricsReportingEvents__WEBPACK_IMPORTED_MODULE_1__["default"];
dashjs.FactoryMaker.updateClassFactory(MetricsReporting.__dashjs_factory_name, factory);
/* jshint ignore:line */

/* harmony default export */ __webpack_exports__["default"] = (factory);
}();
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=dash.reporting.debug.js.map