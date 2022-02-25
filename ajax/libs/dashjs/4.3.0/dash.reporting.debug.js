(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dashjs"] = factory();
	else
		root["dashjs"] = factory();
})(window, function() {
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/streaming/metrics/MetricsReporting.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/FactoryMaker.js":
/*!**********************************!*\
  !*** ./src/core/FactoryMaker.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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

/***/ "./src/core/events/EventsBase.js":
/*!***************************************!*\
  !*** ./src/core/events/EventsBase.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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

/***/ "./src/streaming/constants/Constants.js":
/*!**********************************************!*\
  !*** ./src/streaming/constants/Constants.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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
      this.LOCATION = 'Location';
      this.INITIALIZE = 'initialize';
      this.TEXT_SHOWING = 'showing';
      this.TEXT_HIDDEN = 'hidden';
      this.CC1 = 'CC1';
      this.CC3 = 'CC3';
      this.UTF8 = 'utf-8';
      this.SCHEME_ID_URI = 'schemeIdUri';
      this.START_TIME = 'starttime';
      this.SERVICE_DESCRIPTION_LL_SCHEME = 'urn:dvb:dash:lowlatency:scope:2019';
      this.SUPPLEMENTAL_PROPERTY_LL_SCHEME = 'urn:dvb:dash:lowlatency:critical:2019';
      this.XML = 'XML';
      this.ARRAY_BUFFER = 'ArrayBuffer';
      this.DVB_REPORTING_URL = 'dvb:reportingUrl';
      this.DVB_PROBABILITY = 'dvb:probability';
      this.VIDEO_ELEMENT_READY_STATES = {
        HAVE_NOTHING: 0,
        HAVE_METADATA: 1,
        HAVE_CURRENT_DATA: 2,
        HAVE_FUTURE_DATA: 3,
        HAVE_ENOUGH_DATA: 4
      };
    }
  }]);

  return Constants;
}();

var constants = new Constants();
/* harmony default export */ __webpack_exports__["default"] = (constants);

/***/ }),

/***/ "./src/streaming/metrics/MetricsReporting.js":
/*!***************************************************!*\
  !*** ./src/streaming/metrics/MetricsReporting.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    dvbErrorsTranslator = Object(_utils_DVBErrorsTranslator__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance({
      eventBus: config.eventBus,
      dashMetrics: config.dashMetrics,
      metricsConstants: config.metricsConstants,
      events: config.events
    });
    dvbErrorsTranslator.initialise();
    return Object(_controllers_MetricsCollectionController__WEBPACK_IMPORTED_MODULE_2__["default"])(context).create(config);
  }
  /**
   * Get the ReportingFactory to allow new reporters to be registered
   * @return {ReportingFactory} Reporting Factory
   */


  function getReportingFactory() {
    return Object(_reporting_ReportingFactory__WEBPACK_IMPORTED_MODULE_4__["default"])(context).getInstance();
  }
  /**
   * Get the MetricsHandlerFactory to allow new handlers to be registered
   * @return {MetricsHandlerFactory} Metrics Handler Factory
   */


  function getMetricsHandlerFactory() {
    return Object(_metrics_MetricsHandlerFactory__WEBPACK_IMPORTED_MODULE_3__["default"])(context).getInstance();
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

/***/ }),

/***/ "./src/streaming/metrics/MetricsReportingEvents.js":
/*!*********************************************************!*\
  !*** ./src/streaming/metrics/MetricsReportingEvents.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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
    var metrics = Object(_utils_ManifestParsing__WEBPACK_IMPORTED_MODULE_1__["default"])(context).getInstance({
      adapter: config.adapter,
      constants: config.constants
    }).getMetrics(e.manifest);
    metrics.forEach(function (m) {
      var key = JSON.stringify(m);

      if (!metricsControllers.hasOwnProperty(key)) {
        try {
          var controller = Object(_MetricsController__WEBPACK_IMPORTED_MODULE_0__["default"])(context).create(config);
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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
      rangeController = Object(_RangeController__WEBPACK_IMPORTED_MODULE_0__["default"])(context).create({
        mediaElement: config.mediaElement
      });
      rangeController.initialize(metricsEntry.Range);
      reportingController = Object(_ReportingController__WEBPACK_IMPORTED_MODULE_1__["default"])(context).create({
        debug: config.debug,
        metricsConstants: config.metricsConstants
      });
      reportingController.initialize(metricsEntry.Reporting, rangeController);
      metricsHandlersController = Object(_MetricsHandlersController__WEBPACK_IMPORTED_MODULE_2__["default"])(context).create({
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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
  var metricsHandlerFactory = Object(_metrics_MetricsHandlerFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance({
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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
    ranges = Object(_utils_CustomTimeRanges__WEBPACK_IMPORTED_MODULE_0__["default"])(context).create();
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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
  var reportingFactory = Object(_reporting_ReportingFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(this.context).getInstance(config);

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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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
  var handlerHelpers = Object(_utils_HandlerHelpers__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance();
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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
  var handlerHelpers = Object(_utils_HandlerHelpers__WEBPACK_IMPORTED_MODULE_0__["default"])(this.context).getInstance();
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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

  function create(entry, rangeController) {
    var reporting;

    try {
      reporting = knownReportingSchemeIdUris[entry.schemeIdUri](context).create({
        metricsConstants: metricsConstants
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_MetricSerialiser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/MetricSerialiser */ "./src/streaming/metrics/utils/MetricSerialiser.js");
/* harmony import */ var _utils_RNG__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/RNG */ "./src/streaming/metrics/utils/RNG.js");
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
  var metricSerialiser, randomNumberGenerator, reportingPlayerStatusDecided, isReportingPlayer, reportingUrl, rangeController;
  var USE_DRAFT_DVB_SPEC = true;
  var allowPendingRequestsToCompleteOnReset = true;
  var pendingRequests = [];
  var metricsConstants = config.metricsConstants;

  function setup() {
    metricSerialiser = Object(_utils_MetricSerialiser__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance();
    randomNumberGenerator = Object(_utils_RNG__WEBPACK_IMPORTED_MODULE_1__["default"])(context).getInstance();
    resetInitialSettings();
  }

  function doGetRequest(url, successCB, failureCB) {
    var req = new XMLHttpRequest();

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
    reportingUrl = entry.dvb_reportingUrl; // If a required attribute is missing, the Reporting descriptor may
    // be ignored by the Player

    if (!reportingUrl) {
      throw new Error('required parameter missing (dvb:reportingUrl)');
    } // A Player's status, as a reporting Player or not, shall remain
    // static for the duration of the MPD, regardless of MPD updates.
    // (i.e. only calling reset (or failure) changes this state)


    if (!reportingPlayerStatusDecided) {
      probability = entry.dvb_probability; // TS 103 285 Clause 10.12.3.4
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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
    vo.responsecode == null || // Generated on .catch() and when uninitialised
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

  function initialise() {
    eventBus.on(Events.MANIFEST_UPDATED, onManifestUpdate, instance);
    eventBus.on(Events.SERVICE_LOCATION_BLACKLIST_CHANGED, onServiceLocationChanged, instance);
    eventBus.on(Events.METRIC_ADDED, onMetricEvent, instance);
    eventBus.on(Events.METRIC_UPDATED, onMetricEvent, instance);
    eventBus.on(Events.PLAYBACK_ERROR, onPlaybackError, instance);
    eventBus.on(_MetricsReportingEvents__WEBPACK_IMPORTED_MODULE_1__["default"].BECAME_REPORTING_PLAYER, onBecameReporter, instance);
  }

  function reset() {
    eventBus.off(Events.MANIFEST_UPDATED, onManifestUpdate, instance);
    eventBus.off(Events.SERVICE_LOCATION_BLACKLIST_CHANGED, onServiceLocationChanged, instance);
    eventBus.off(Events.METRIC_ADDED, onMetricEvent, instance);
    eventBus.off(Events.METRIC_UPDATED, onMetricEvent, instance);
    eventBus.off(Events.PLAYBACK_ERROR, onPlaybackError, instance);
    eventBus.off(_MetricsReportingEvents__WEBPACK_IMPORTED_MODULE_1__["default"].BECAME_REPORTING_PLAYER, onBecameReporter, instance);
  }

  instance = {
    initialise: initialise,
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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
              reportingEntry.dvb_reportingUrl = reporting[constants.DVB_REPORTING_URL];
            }

            if (reporting.hasOwnProperty(constants.DVB_PROBABILITY)) {
              reportingEntry.dvb_probability = reporting[constants.DVB_PROBABILITY];
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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

  function initialise() {
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
        initialise();
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
  initialise();
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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

  this.dvb_reportingUrl = '';
  this.dvb_probability = DEFAULT_DVB_PROBABILITY;
};

/* harmony default export */ __webpack_exports__["default"] = (Reporting);

/***/ }),

/***/ "./src/streaming/utils/CustomTimeRanges.js":
/*!*************************************************!*\
  !*** ./src/streaming/utils/CustomTimeRanges.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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



function CustomTimeRanges()
/*config*/
{
  var customTimeRangeArray = [];
  var length = 0;

  function add(start, end) {
    var i = 0;

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
    Object(_utils_SupervisorTools__WEBPACK_IMPORTED_MODULE_1__["checkInteger"])(index);

    if (index >= this.customTimeRangeArray.length || index < 0) {
      return NaN;
    }

    return this.customTimeRangeArray[index].start;
  }

  function end(index) {
    Object(_utils_SupervisorTools__WEBPACK_IMPORTED_MODULE_1__["checkInteger"])(index);

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
/*! exports provided: checkParameterType, checkInteger, checkRange, checkIsVideoOrAudioType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkParameterType", function() { return checkParameterType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkInteger", function() { return checkInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkRange", function() { return checkRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkIsVideoOrAudioType", function() { return checkIsVideoOrAudioType; });
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

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=dash.reporting.debug.js.map