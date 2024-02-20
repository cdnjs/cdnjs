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

/***/ "./src/core/errors/ErrorsBase.js":
/*!***************************************!*\
  !*** ./src/core/errors/ErrorsBase.js ***!
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
var ErrorsBase = /*#__PURE__*/function () {
  function ErrorsBase() {
    _classCallCheck(this, ErrorsBase);
  }

  _createClass(ErrorsBase, [{
    key: "extend",
    value: function extend(errors, config) {
      if (!errors) return;
      var override = config ? config.override : false;
      var publicOnly = config ? config.publicOnly : false;

      for (var err in errors) {
        if (!errors.hasOwnProperty(err) || this[err] && !override) continue;
        if (publicOnly && errors[err].indexOf('public_') === -1) continue;
        this[err] = errors[err];
      }
    }
  }]);

  return ErrorsBase;
}();

/* harmony default export */ __webpack_exports__["default"] = (ErrorsBase);

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

/***/ "./src/streaming/constants/ProtectionConstants.js":
/*!********************************************************!*\
  !*** ./src/streaming/constants/ProtectionConstants.js ***!
  \********************************************************/
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
 * Protection Constants declaration
 * @class
 * @ignore
 */
var ProtectionConstants = /*#__PURE__*/function () {
  function ProtectionConstants() {
    _classCallCheck(this, ProtectionConstants);

    this.init();
  }

  _createClass(ProtectionConstants, [{
    key: "init",
    value: function init() {
      this.CLEARKEY_KEYSTEM_STRING = 'org.w3.clearkey';
      this.WIDEVINE_KEYSTEM_STRING = 'com.widevine.alpha';
      this.PLAYREADY_KEYSTEM_STRING = 'com.microsoft.playready';
      this.PLAYREADY_RECOMMENDATION_KEYSTEM_STRING = 'com.microsoft.playready.recommendation';
      this.INITIALIZATION_DATA_TYPE_CENC = 'cenc';
      this.INITIALIZATION_DATA_TYPE_KEYIDS = 'keyids';
      this.INITIALIZATION_DATA_TYPE_WEBM = 'webm';
    }
  }]);

  return ProtectionConstants;
}();

var constants = new ProtectionConstants();
/* harmony default export */ __webpack_exports__["default"] = (constants);

/***/ }),

/***/ "./src/streaming/protection/CommonEncryption.js":
/*!******************************************************!*\
  !*** ./src/streaming/protection/CommonEncryption.js ***!
  \******************************************************/
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
var LICENSE_SERVER_MANIFEST_CONFIGURATIONS = {
  attributes: ['Laurl', 'laurl'],
  prefixes: ['clearkey', 'dashif']
};
/**
 * @class
 * @ignore
 */

var CommonEncryption = /*#__PURE__*/function () {
  function CommonEncryption() {
    _classCallCheck(this, CommonEncryption);
  }

  _createClass(CommonEncryption, null, [{
    key: "findCencContentProtection",
    value:
    /**
     * Find and return the ContentProtection element in the given array
     * that indicates support for MPEG Common Encryption
     *
     * @param {Array} cpArray array of content protection elements
     * @returns {Object|null} the Common Encryption content protection element or
     * null if one was not found
     */
    function findCencContentProtection(cpArray) {
      var retVal = null;

      for (var i = 0; i < cpArray.length; ++i) {
        var cp = cpArray[i];
        if (cp.schemeIdUri.toLowerCase() === 'urn:mpeg:dash:mp4protection:2011' && (cp.value.toLowerCase() === 'cenc' || cp.value.toLowerCase() === 'cbcs')) retVal = cp;
      }

      return retVal;
    }
    /**
     * Returns just the data portion of a single PSSH
     *
     * @param {ArrayBuffer} pssh - the PSSH
     * @return {ArrayBuffer} data portion of the PSSH
     */

  }, {
    key: "getPSSHData",
    value: function getPSSHData(pssh) {
      var offset = 8; // Box size and type fields

      var view = new DataView(pssh); // Read version

      var version = view.getUint8(offset);
      offset += 20; // Version (1), flags (3), system ID (16)

      if (version > 0) {
        offset += 4 + 16 * view.getUint32(offset); // Key ID count (4) and All key IDs (16*count)
      }

      offset += 4; // Data size

      return pssh.slice(offset);
    }
    /**
     * Returns the PSSH associated with the given key system from the concatenated
     * list of PSSH boxes in the given initData
     *
     * @param {KeySystem} keySystem the desired
     * key system
     * @param {ArrayBuffer} initData 'cenc' initialization data.  Concatenated list of PSSH.
     * @returns {ArrayBuffer|null} The PSSH box data corresponding to the given key system, null if not found
     * or null if a valid association could not be found.
     */

  }, {
    key: "getPSSHForKeySystem",
    value: function getPSSHForKeySystem(keySystem, initData) {
      var psshList = CommonEncryption.parsePSSHList(initData);

      if (keySystem && psshList.hasOwnProperty(keySystem.uuid.toLowerCase())) {
        return psshList[keySystem.uuid.toLowerCase()];
      }

      return null;
    }
    /**
     * Parse a standard common encryption PSSH which contains a simple
     * base64-encoding of the init data
     *
     * @param {Object} cpData the ContentProtection element
     * @param {BASE64} BASE64 reference
     * @returns {ArrayBuffer|null} the init data or null if not found
     */

  }, {
    key: "parseInitDataFromContentProtection",
    value: function parseInitDataFromContentProtection(cpData, BASE64) {
      if ('pssh' in cpData) {
        // Remove whitespaces and newlines from pssh text
        cpData.pssh.__text = cpData.pssh.__text.replace(/\r?\n|\r/g, '').replace(/\s+/g, '');
        return BASE64.decodeArray(cpData.pssh.__text).buffer;
      }

      return null;
    }
    /**
     * Parses list of PSSH boxes into keysystem-specific PSSH data
     *
     * @param {ArrayBuffer} data - the concatenated list of PSSH boxes as provided by
     * CDM as initialization data when CommonEncryption content is detected
     * @returns {Object|Array} an object that has a property named according to each of
     * the detected key system UUIDs (e.g. 00000000-0000-0000-0000-0000000000)
     * and a ArrayBuffer (the entire PSSH box) as the property value
     */

  }, {
    key: "parsePSSHList",
    value: function parsePSSHList(data) {
      if (data === null || data === undefined) return [];
      var dv = new DataView(data.buffer || data); // data.buffer first for Uint8Array support

      var done = false;
      var pssh = {}; // TODO: Need to check every data read for end of buffer

      var byteCursor = 0;

      while (!done) {
        var size = void 0,
            nextBox = void 0,
            version = void 0,
            systemID = void 0;
        var boxStart = byteCursor;
        if (byteCursor >= dv.buffer.byteLength) break;
        /* Box size */

        size = dv.getUint32(byteCursor);
        nextBox = byteCursor + size;
        byteCursor += 4;
        /* Verify PSSH */

        if (dv.getUint32(byteCursor) !== 0x70737368) {
          byteCursor = nextBox;
          continue;
        }

        byteCursor += 4;
        /* Version must be 0 or 1 */

        version = dv.getUint8(byteCursor);

        if (version !== 0 && version !== 1) {
          byteCursor = nextBox;
          continue;
        }

        byteCursor++;
        byteCursor += 3;
        /* skip flags */
        // 16-byte UUID/SystemID

        systemID = '';
        var i = void 0,
            val = void 0;

        for (i = 0; i < 4; i++) {
          val = dv.getUint8(byteCursor + i).toString(16);
          systemID += val.length === 1 ? '0' + val : val;
        }

        byteCursor += 4;
        systemID += '-';

        for (i = 0; i < 2; i++) {
          val = dv.getUint8(byteCursor + i).toString(16);
          systemID += val.length === 1 ? '0' + val : val;
        }

        byteCursor += 2;
        systemID += '-';

        for (i = 0; i < 2; i++) {
          val = dv.getUint8(byteCursor + i).toString(16);
          systemID += val.length === 1 ? '0' + val : val;
        }

        byteCursor += 2;
        systemID += '-';

        for (i = 0; i < 2; i++) {
          val = dv.getUint8(byteCursor + i).toString(16);
          systemID += val.length === 1 ? '0' + val : val;
        }

        byteCursor += 2;
        systemID += '-';

        for (i = 0; i < 6; i++) {
          val = dv.getUint8(byteCursor + i).toString(16);
          systemID += val.length === 1 ? '0' + val : val;
        }

        byteCursor += 6;
        systemID = systemID.toLowerCase();
        /* PSSH Data Size */

        byteCursor += 4;
        /* PSSH Data */

        pssh[systemID] = dv.buffer.slice(boxStart, nextBox);
        byteCursor = nextBox;
      }

      return pssh;
    }
  }, {
    key: "getLicenseServerUrlFromMediaInfo",
    value: function getLicenseServerUrlFromMediaInfo(mediaInfo, schemeIdUri) {
      try {
        if (!mediaInfo || mediaInfo.length === 0) {
          return null;
        }

        var i = 0;
        var licenseServer = null;

        while (i < mediaInfo.length && !licenseServer) {
          var info = mediaInfo[i];

          if (info && info.contentProtection && info.contentProtection.length > 0) {
            var targetProtectionData = info.contentProtection.filter(function (cp) {
              return cp.schemeIdUri && cp.schemeIdUri === schemeIdUri;
            });

            if (targetProtectionData && targetProtectionData.length > 0) {
              var j = 0;

              while (j < targetProtectionData.length && !licenseServer) {
                var ckData = targetProtectionData[j];
                var k = 0;

                while (k < LICENSE_SERVER_MANIFEST_CONFIGURATIONS.attributes.length && !licenseServer) {
                  var l = 0;
                  var attribute = LICENSE_SERVER_MANIFEST_CONFIGURATIONS.attributes[k];

                  while (l < LICENSE_SERVER_MANIFEST_CONFIGURATIONS.prefixes.length && !licenseServer) {
                    var prefix = LICENSE_SERVER_MANIFEST_CONFIGURATIONS.prefixes[l];

                    if (ckData[attribute] && ckData[attribute].__prefix && ckData[attribute].__prefix === prefix && ckData[attribute].__text) {
                      licenseServer = ckData[attribute].__text;
                    }

                    l += 1;
                  }

                  k += 1;
                }

                j += 1;
              }
            }
          }

          i += 1;
        }

        return licenseServer;
      } catch (e) {
        return null;
      }
    }
  }]);

  return CommonEncryption;
}();

/* harmony default export */ __webpack_exports__["default"] = (CommonEncryption);

/***/ }),

/***/ "./src/streaming/protection/ProtectionEvents.js":
/*!******************************************************!*\
  !*** ./src/streaming/protection/ProtectionEvents.js ***!
  \******************************************************/
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
 */

var ProtectionEvents = /*#__PURE__*/function (_EventsBase) {
  _inherits(ProtectionEvents, _EventsBase);

  var _super = _createSuper(ProtectionEvents);

  /**
   * @description Public facing external events to be used when including protection package.
   * All public events will be aggregated into the MediaPlayerEvents Class and can be accessed
   * via MediaPlayer.events.  public_ is the prefix that we use to move event names to MediaPlayerEvents.
   */
  function ProtectionEvents() {
    var _this;

    _classCallCheck(this, ProtectionEvents);

    _this = _super.call(this);
    /**
     * Event ID for events delivered when the protection set receives
     * a key message from the CDM
     *
     * @ignore
     */

    _this.INTERNAL_KEY_MESSAGE = 'internalKeyMessage';
    /**
     * Event ID for events delivered when the status of one decryption keys has changed
     * @ignore
     */

    _this.INTERNAL_KEY_STATUS_CHANGED = 'internalkeyStatusChanged';
    /**
     * Event ID for events delivered when a new key has been added
     *
     * @constant
     * @deprecated The latest versions of the EME specification no longer
     * use this event.  {@MediaPlayer.models.protectionModel.eventList.KEY_STATUSES_CHANGED}
     * is preferred.
     * @event ProtectionEvents#KEY_ADDED
     */

    _this.KEY_ADDED = 'public_keyAdded';
    /**
     * Event ID for events delivered when an error is encountered by the CDM
     * while processing a license server response message
     * @event ProtectionEvents#KEY_ERROR
     */

    _this.KEY_ERROR = 'public_keyError';
    /**
     * Event ID for events delivered when the protection set receives
     * a key message from the CDM
     * @event ProtectionEvents#KEY_MESSAGE
     */

    _this.KEY_MESSAGE = 'public_keyMessage';
    /**
     * Event ID for events delivered when a key session close
     * process has completed
     * @event ProtectionEvents#KEY_SESSION_CLOSED
     */

    _this.KEY_SESSION_CLOSED = 'public_keySessionClosed';
    /**
     * Event ID for events delivered when a new key sessions creation
     * process has completed
     * @event ProtectionEvents#KEY_SESSION_CREATED
     */

    _this.KEY_SESSION_CREATED = 'public_keySessionCreated';
    /**
     * Event ID for events delivered when a key session removal
     * process has completed
     * @event ProtectionEvents#KEY_SESSION_REMOVED
     */

    _this.KEY_SESSION_REMOVED = 'public_keySessionRemoved';
    /**
     * Event ID for events delivered when the status of one or more
     * decryption keys has changed
     * @event ProtectionEvents#KEY_STATUSES_CHANGED
     */

    _this.KEY_STATUSES_CHANGED = 'public_keyStatusesChanged';
    /**
     * Event ID for events delivered when a key system access procedure
     * has completed
     * @event ProtectionEvents#KEY_SYSTEM_ACCESS_COMPLETE
     */

    _this.KEY_SYSTEM_ACCESS_COMPLETE = 'public_keySystemAccessComplete';
    /**
     * Event ID for events delivered when a key system selection procedure
     * completes
     * @event ProtectionEvents#KEY_SYSTEM_SELECTED
     */

    _this.KEY_SYSTEM_SELECTED = 'public_keySystemSelected';
    /**
     * Event ID for events delivered when a license request procedure
     * has completed
     * @event ProtectionEvents#LICENSE_REQUEST_COMPLETE
     */

    _this.LICENSE_REQUEST_COMPLETE = 'public_licenseRequestComplete';
    /**
     * Sending a license rquest
     * @event ProtectionEvents#LICENSE_REQUEST_SENDING
     */

    _this.LICENSE_REQUEST_SENDING = 'public_licenseRequestSending';
    /**
     * Event ID for needkey/encrypted events
     * @ignore
     */

    _this.NEED_KEY = 'needkey';
    /**
     * Event ID for events delivered when the Protection system is detected and created.
     * @event ProtectionEvents#PROTECTION_CREATED
     */

    _this.PROTECTION_CREATED = 'public_protectioncreated';
    /**
     * Event ID for events delivered when the Protection system is destroyed.
     * @event ProtectionEvents#PROTECTION_DESTROYED
     */

    _this.PROTECTION_DESTROYED = 'public_protectiondestroyed';
    /**
     * Event ID for events delivered when a new server certificate has
     * been delivered to the CDM
     * @ignore
     */

    _this.SERVER_CERTIFICATE_UPDATED = 'serverCertificateUpdated';
    /**
     * Event ID for events delivered when the process of shutting down
     * a protection set has completed
     * @ignore
     */

    _this.TEARDOWN_COMPLETE = 'protectionTeardownComplete';
    /**
     * Event ID for events delivered when a HTMLMediaElement has been
     * associated with the protection set
     * @ignore
     */

    _this.VIDEO_ELEMENT_SELECTED = 'videoElementSelected';
    /**
     * Triggered when the key session has been updated successfully
     * @ignore
     */

    _this.KEY_SESSION_UPDATED = 'public_keySessionUpdated';
    return _this;
  }

  return ProtectionEvents;
}(_core_events_EventsBase__WEBPACK_IMPORTED_MODULE_0__["default"]);

var protectionEvents = new ProtectionEvents();
/* harmony default export */ __webpack_exports__["default"] = (protectionEvents);

/***/ }),

/***/ "./src/streaming/protection/controllers/ProtectionController.js":
/*!**********************************************************************!*\
  !*** ./src/streaming/protection/controllers/ProtectionController.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CommonEncryption__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CommonEncryption */ "./src/streaming/protection/CommonEncryption.js");
/* harmony import */ var _vo_MediaCapability__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/MediaCapability */ "./src/streaming/protection/vo/MediaCapability.js");
/* harmony import */ var _vo_KeySystemConfiguration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../vo/KeySystemConfiguration */ "./src/streaming/protection/vo/KeySystemConfiguration.js");
/* harmony import */ var _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../errors/ProtectionErrors */ "./src/streaming/protection/errors/ProtectionErrors.js");
/* harmony import */ var _vo_DashJSError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../vo/DashJSError */ "./src/streaming/vo/DashJSError.js");
/* harmony import */ var _vo_LicenseRequest__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../vo/LicenseRequest */ "./src/streaming/protection/vo/LicenseRequest.js");
/* harmony import */ var _vo_LicenseResponse__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../vo/LicenseResponse */ "./src/streaming/protection/vo/LicenseResponse.js");
/* harmony import */ var _vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../vo/metrics/HTTPRequest */ "./src/streaming/vo/metrics/HTTPRequest.js");
/* harmony import */ var _core_Utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../core/Utils */ "./src/core/Utils.js");
/* harmony import */ var _constants_Constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../constants/Constants */ "./src/streaming/constants/Constants.js");
/* harmony import */ var _core_FactoryMaker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../core/FactoryMaker */ "./src/core/FactoryMaker.js");
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











var NEEDKEY_BEFORE_INITIALIZE_RETRIES = 5;
var NEEDKEY_BEFORE_INITIALIZE_TIMEOUT = 500;
var LICENSE_SERVER_REQUEST_RETRIES = 3;
var LICENSE_SERVER_REQUEST_RETRY_INTERVAL = 1000;
var LICENSE_SERVER_REQUEST_DEFAULT_TIMEOUT = 8000;
/**
 * @module ProtectionController
 * @description Provides access to media protection information and functionality.  Each
 * ProtectionController manages a single {@link MediaPlayer.models.ProtectionModel}
 * which encapsulates a set of protection information (EME APIs, selected key system,
 * key sessions).  The APIs of ProtectionController mostly align with the latest EME
 * APIs.  Key system selection is mostly automated when combined with app-overrideable
 * functionality provided in {@link ProtectionKeyController}.
 * @todo ProtectionController does almost all of its tasks automatically after init() is
 * called.  Applications might want more control over this process and want to go through
 * each step manually (key system selection, session creation, session maintenance).
 * This module can be accessed using the MediaPlayer API getProtectionController()
 * @param {Object} config
 */

function ProtectionController(config) {
  config = config || {};
  var protectionKeyController = config.protectionKeyController;
  var protectionModel = config.protectionModel;
  var eventBus = config.eventBus;
  var events = config.events;
  var debug = config.debug;
  var BASE64 = config.BASE64;
  var constants = config.constants;
  var needkeyRetries = [];
  var cmcdModel = config.cmcdModel;
  var settings = config.settings;
  var customParametersModel = config.customParametersModel;
  var instance, logger, pendingKeySessionsToHandle, mediaInfoArr, protDataSet, sessionType, robustnessLevel, selectedKeySystem, keySystemSelectionInProgress, licenseXhrRequest, licenseRequestRetryTimeout;

  function setup() {
    logger = debug.getLogger(instance);
    pendingKeySessionsToHandle = [];
    mediaInfoArr = [];
    sessionType = 'temporary';
    robustnessLevel = '';
    licenseXhrRequest = null;
    licenseRequestRetryTimeout = null;
    eventBus.on(events.INTERNAL_KEY_MESSAGE, _onKeyMessage, instance);
    eventBus.on(events.INTERNAL_KEY_STATUS_CHANGED, _onKeyStatusChanged, instance);
  }

  function checkConfig() {
    if (!eventBus || !eventBus.hasOwnProperty('on') || !protectionKeyController || !protectionKeyController.hasOwnProperty('getSupportedKeySystemsFromContentProtection')) {
      throw new Error('Missing config parameter(s)');
    }
  }
  /**
   * Initialize this protection system for a given media type.
   *
   * @param {StreamInfo} [mediaInfo] Media information
   * @memberof module:ProtectionController
   * @instance
   */


  function initializeForMedia(mediaInfo) {
    // Not checking here if a session for similar KS/KID combination is already created
    // because still don't know which keysystem will be selected.
    // Once Keysystem is selected and before creating the session, we will do that check
    // so we create the strictly necessary DRM sessions
    if (!mediaInfo) {
      throw new Error('mediaInfo can not be null or undefined');
    }

    checkConfig();
    mediaInfoArr.push(mediaInfo);
  }
  /**
   * Once all mediaInfo objects have been added to our mediaInfoArray we can select a key system or check if the kid has changed and we need to trigger a new license request
   * @memberof module:ProtectionController
   * @instance
   */


  function handleKeySystemFromManifest() {
    if (!mediaInfoArr || mediaInfoArr.length === 0) {
      return;
    }

    var supportedKeySystems = [];
    mediaInfoArr.forEach(function (mInfo) {
      var currentKs = protectionKeyController.getSupportedKeySystemsFromContentProtection(mInfo.contentProtection, protDataSet, sessionType); // We assume that the same key systems are signaled for each AS. We can use the first entry we found

      if (currentKs.length > 0) {
        if (supportedKeySystems.length === 0) {
          supportedKeySystems = currentKs;
        } // Save config for creating key session once we selected a key system


        pendingKeySessionsToHandle.push(currentKs);
      }
    });

    if (supportedKeySystems && supportedKeySystems.length > 0) {
      _selectKeySystemOrUpdateKeySessions(supportedKeySystems, true);
    }
  }
  /**
   * Selects a key system if we dont have any one yet. Otherwise we use the existing key system and trigger a new license request if the initdata has changed
   * @param {array} supportedKs
   * @private
   */


  function _handleKeySystemFromPssh(supportedKs) {
    pendingKeySessionsToHandle.push(supportedKs);

    _selectKeySystemOrUpdateKeySessions(supportedKs, false);
  }
  /**
   * Select the key system or update one of our existing key sessions
   * @param {array} supportedKs
   * @param {boolean} fromManifest
   * @private
   */


  function _selectKeySystemOrUpdateKeySessions(supportedKs, fromManifest) {
    // First time, so we need to select a key system
    if (!selectedKeySystem && !keySystemSelectionInProgress) {
      _selectInitialKeySystem(supportedKs, fromManifest);
    } // We already selected a key system. We only need to trigger a new license exchange if the init data has changed
    else if (selectedKeySystem) {
      _handleKeySessions();
    }
  }
  /**
   * We do not have a key system yet. Select one
   * @param {array} supportedKs
   * @param {boolean} fromManifest
   * @private
   */


  function _selectInitialKeySystem(supportedKs, fromManifest) {
    if (!keySystemSelectionInProgress) {
      keySystemSelectionInProgress = true;
      var requestedKeySystems = []; // Reorder key systems according to priority order provided in protectionData

      supportedKs = supportedKs.sort(function (ksA, ksB) {
        var indexA = protDataSet && protDataSet[ksA.ks.systemString] && protDataSet[ksA.ks.systemString].priority >= 0 ? protDataSet[ksA.ks.systemString].priority : supportedKs.length;
        var indexB = protDataSet && protDataSet[ksB.ks.systemString] && protDataSet[ksB.ks.systemString].priority >= 0 ? protDataSet[ksB.ks.systemString].priority : supportedKs.length;
        return indexA - indexB;
      }); // Add all key systems to our request list since we have yet to select a key system

      for (var i = 0; i < supportedKs.length; i++) {
        var keySystemConfiguration = _getKeySystemConfiguration(supportedKs[i]);

        requestedKeySystems.push({
          ks: supportedKs[i].ks,
          configs: [keySystemConfiguration],
          protData: supportedKs[i].protData
        });
      }

      var keySystemAccess;
      protectionModel.requestKeySystemAccess(requestedKeySystems).then(function (event) {
        keySystemAccess = event.data;
        var selectedSystemString = keySystemAccess.mksa && keySystemAccess.mksa.selectedSystemString ? keySystemAccess.mksa.selectedSystemString : keySystemAccess.keySystem.systemString;
        logger.info('DRM: KeySystem Access Granted for system string (' + selectedSystemString + ')!  Selecting key system...');
        return protectionModel.selectKeySystem(keySystemAccess);
      }).then(function (keySystem) {
        selectedKeySystem = keySystem;
        keySystemSelectionInProgress = false;

        if (!protectionModel) {
          return;
        }

        eventBus.trigger(events.KEY_SYSTEM_SELECTED, {
          data: keySystemAccess
        }); // Set server certificate from protData

        var protData = _getProtDataForKeySystem(selectedKeySystem);

        if (protData && protData.serverCertificate && protData.serverCertificate.length > 0) {
          protectionModel.setServerCertificate(BASE64.decodeArray(protData.serverCertificate).buffer);
        }

        _handleKeySessions();
      })["catch"](function (event) {
        selectedKeySystem = null;
        keySystemSelectionInProgress = false;

        if (!fromManifest) {
          eventBus.trigger(events.KEY_SYSTEM_SELECTED, {
            data: null,
            error: new _vo_DashJSError__WEBPACK_IMPORTED_MODULE_4__["default"](_errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_3__["default"].KEY_SYSTEM_ACCESS_DENIED_ERROR_CODE, _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_3__["default"].KEY_SYSTEM_ACCESS_DENIED_ERROR_MESSAGE + 'Error selecting key system! -- ' + event.error)
          });
        }
      });
    }
  }
  /**
   * If we have already selected a key system we only need to create a new key session and issue a new license request if the init data has changed.
   * @private
   */


  function _handleKeySessions() {
    // Create key sessions for the different AdaptationSets
    var ksIdx;

    for (var i = 0; i < pendingKeySessionsToHandle.length; i++) {
      for (ksIdx = 0; ksIdx < pendingKeySessionsToHandle[i].length; ksIdx++) {
        if (selectedKeySystem === pendingKeySessionsToHandle[i][ksIdx].ks) {
          var current = pendingKeySessionsToHandle[i][ksIdx];

          _loadOrCreateKeySession(current);

          break;
        }
      }
    }

    pendingKeySessionsToHandle = [];
  }
  /**
   * Loads an existing key session if we already have a session id. Otherwise we create a new key session
   * @param {object} keySystemInfo
   * @private
   */


  function _loadOrCreateKeySession(keySystemInfo) {
    // Clearkey
    if (protectionKeyController.isClearKey(selectedKeySystem)) {
      // For Clearkey: if parameters for generating init data was provided by the user, use them for generating
      // initData and overwrite possible initData indicated in encrypted event (EME)
      if (keySystemInfo.protData && keySystemInfo.protData.hasOwnProperty('clearkeys') && Object.keys(keySystemInfo.protData.clearkeys).length !== 0) {
        var initData = {
          kids: Object.keys(keySystemInfo.protData.clearkeys)
        };
        keySystemInfo.initData = new TextEncoder().encode(JSON.stringify(initData));
      }
    } // Reuse existing KeySession


    if (keySystemInfo.sessionId) {
      // Load MediaKeySession with sessionId
      loadKeySession(keySystemInfo);
    } // Create a new KeySession
    else if (keySystemInfo.initData !== null) {
      // Create new MediaKeySession with initData
      createKeySession(keySystemInfo);
    }
  }
  /**
   * Loads a key session with the given session ID from persistent storage.  This essentially creates a new key session
   *
   * @param {object} ksInfo
   * @memberof module:ProtectionController
   * @instance
   * @fires ProtectionController#KeySessionCreated
   * @ignore
   */


  function loadKeySession(keySystemInfo) {
    checkConfig();
    protectionModel.loadKeySession(keySystemInfo);
  }
  /**
   * Create a new key session associated with the given initialization data from the MPD or from the PSSH box in the media
   * For the latest version of the EME a request is generated. Once this request is ready we get notified via the INTERNAL_KEY_MESSAGE event
   * @param {ArrayBuffer} initData the initialization data
   * @param {Uint8Array} cdmData the custom data to provide to licenser
   * @memberof module:ProtectionController
   * @instance
   * @fires ProtectionController#KeySessionCreated
   * @ignore
   */


  function createKeySession(keySystemInfo) {
    var initDataForKS = _CommonEncryption__WEBPACK_IMPORTED_MODULE_0__["default"].getPSSHForKeySystem(selectedKeySystem, keySystemInfo ? keySystemInfo.initData : null);

    if (initDataForKS) {
      // Check for duplicate key id
      if (_isKeyIdDuplicate(keySystemInfo.keyId)) {
        return;
      } // Check for duplicate initData


      if (_isInitDataDuplicate(initDataForKS)) {
        return;
      }

      try {
        keySystemInfo.initData = initDataForKS;
        protectionModel.createKeySession(keySystemInfo);
      } catch (error) {
        eventBus.trigger(events.KEY_SESSION_CREATED, {
          data: null,
          error: new _vo_DashJSError__WEBPACK_IMPORTED_MODULE_4__["default"](_errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_3__["default"].KEY_SESSION_CREATED_ERROR_CODE, _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_3__["default"].KEY_SESSION_CREATED_ERROR_MESSAGE + error.message)
        });
      }
    } else if (keySystemInfo && keySystemInfo.initData) {
      protectionModel.createKeySession(keySystemInfo);
    } else {
      eventBus.trigger(events.KEY_SESSION_CREATED, {
        data: null,
        error: new _vo_DashJSError__WEBPACK_IMPORTED_MODULE_4__["default"](_errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_3__["default"].KEY_SESSION_CREATED_ERROR_CODE, _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_3__["default"].KEY_SESSION_CREATED_ERROR_MESSAGE + 'Selected key system is ' + (selectedKeySystem ? selectedKeySystem.systemString : null) + '.  needkey/encrypted event contains no initData corresponding to that key system!')
      });
    }
  }
  /**
   * Returns the protectionData for a specific keysystem as specified by the application.
   * @param {object} keySystem
   * @return {object | null}
   * @private
   */


  function _getProtDataForKeySystem(keySystem) {
    if (keySystem) {
      var keySystemString = keySystem.systemString;

      if (protDataSet) {
        return keySystemString in protDataSet ? protDataSet[keySystemString] : null;
      }
    }

    return null;
  }
  /**
   * Removes all entries from the mediaInfoArr
   */


  function clearMediaInfoArray() {
    mediaInfoArr = [];
  }
  /**
   * Returns a set of supported key systems and CENC initialization data
   * from the given array of ContentProtection elements.  Only
   * key systems that are supported by this player will be returned.
   * Key systems are returned in priority order (highest first).
   *
   * @param {Array.<Object>} cps - array of content protection elements parsed
   * from the manifest
   * @returns {Array.<Object>} array of objects indicating which supported key
   * systems were found.  Empty array is returned if no
   * supported key systems were found
   * @memberof module:ProtectionKeyController
   * @instance
   * @ignore
   */


  function getSupportedKeySystemsFromContentProtection(cps) {
    checkConfig();
    return protectionKeyController.getSupportedKeySystemsFromContentProtection(cps, protDataSet, sessionType);
  }
  /**
   * Checks if a session has already created for the provided key id
   * @param {string} keyId
   * @return {boolean}
   * @private
   */


  function _isKeyIdDuplicate(keyId) {
    if (!keyId) {
      return false;
    }

    try {
      var sessions = protectionModel.getSessions();

      for (var i = 0; i < sessions.length; i++) {
        if (sessions[i].getKeyId() === keyId) {
          return true;
        }
      }

      return false;
    } catch (e) {
      return false;
    }
  }
  /**
   * Checks if the provided init data is equal to one of the existing init data values
   * @param {any} initDataForKS
   * @return {boolean}
   * @private
   */


  function _isInitDataDuplicate(initDataForKS) {
    if (!initDataForKS) {
      return false;
    }

    try {
      var currentInitData = protectionModel.getAllInitData();

      for (var i = 0; i < currentInitData.length; i++) {
        if (protectionKeyController.initDataEquals(initDataForKS, currentInitData[i])) {
          logger.debug('DRM: Ignoring initData because we have already seen it!');
          return true;
        }
      }

      return false;
    } catch (e) {
      return false;
    }
  }
  /**
   * Removes the given key session from persistent storage and closes the session
   * as if {@link ProtectionController#closeKeySession}
   * was called
   *
   * @param {SessionToken} sessionToken the session
   * token
   * @memberof module:ProtectionController
   * @instance
   * @fires ProtectionController#KeySessionRemoved
   * @fires ProtectionController#KeySessionClosed
   * @ignore
   */


  function removeKeySession(sessionToken) {
    checkConfig();
    protectionModel.removeKeySession(sessionToken);
  }
  /**
   * Closes the key session and releases all associated decryption keys.  These
   * keys will no longer be available for decrypting media
   *
   * @param {SessionToken} sessionToken the session
   * token
   * @memberof module:ProtectionController
   * @instance
   * @fires ProtectionController#KeySessionClosed
   * @ignore
   */


  function closeKeySession(sessionToken) {
    checkConfig();
    protectionModel.closeKeySession(sessionToken);
  }
  /**
   * Sets a server certificate for use by the CDM when signing key messages
   * intended for a particular license server.  This will fire
   * an error event if a key system has not yet been selected.
   *
   * @param {ArrayBuffer} serverCertificate a CDM-specific license server
   * certificate
   * @memberof module:ProtectionController
   * @instance
   * @fires ProtectionController#ServerCertificateUpdated
   */


  function setServerCertificate(serverCertificate) {
    checkConfig();
    protectionModel.setServerCertificate(serverCertificate);
  }
  /**
   * Associate this protection system with the given HTMLMediaElement.  This
   * causes the system to register for needkey/encrypted events from the given
   * element and provides a destination for setting of MediaKeys
   *
   * @param {HTMLMediaElement} element the media element to which the protection
   * system should be associated
   * @memberof module:ProtectionController
   * @instance
   */


  function setMediaElement(element) {
    checkConfig();

    if (element) {
      protectionModel.setMediaElement(element);
      eventBus.on(events.NEED_KEY, _onNeedKey, instance);
    } else if (element === null) {
      protectionModel.setMediaElement(element);
      eventBus.off(events.NEED_KEY, _onNeedKey, instance);
    }
  }
  /**
   * Sets the session type to use when creating key sessions.  Either "temporary" or
   * "persistent-license".  Default is "temporary".
   *
   * @param {string} value the session type
   * @memberof module:ProtectionController
   * @instance
   */


  function setSessionType(value) {
    sessionType = value;
  }
  /**
   * Sets the robustness level for video and audio capabilities. Optional to remove Chrome warnings.
   * Possible values are SW_SECURE_CRYPTO, SW_SECURE_DECODE, HW_SECURE_CRYPTO, HW_SECURE_CRYPTO, HW_SECURE_DECODE, HW_SECURE_ALL.
   *
   * @param {string} level the robustness level
   * @memberof module:ProtectionController
   * @instance
   */


  function setRobustnessLevel(level) {
    robustnessLevel = level;
  }
  /**
   * Attach KeySystem-specific data to use for license acquisition with EME
   *
   * @param {Object} data an object containing property names corresponding to
   * key system name strings (e.g. "org.w3.clearkey") and associated values
   * being instances of {@link ProtectionData}
   * @memberof module:ProtectionController
   * @instance
   * @ignore
   */


  function setProtectionData(data) {
    protDataSet = data;
    protectionKeyController.setProtectionData(data);
  }
  /**
   * Stop method is called when current playback is stopped/resetted.
   *
   * @memberof module:ProtectionController
   * @instance
   */


  function stop() {
    _abortLicenseRequest();

    if (protectionModel) {
      protectionModel.stop();
    }
  }
  /**
   * Destroys all protection data associated with this protection set.  This includes
   * deleting all key sessions. In the case of persistent key sessions, the sessions
   * will simply be unloaded and not deleted.  Additionally, if this protection set is
   * associated with a HTMLMediaElement, it will be detached from that element.
   *
   * @memberof module:ProtectionController
   * @instance
   * @ignore
   */


  function reset() {
    eventBus.off(events.INTERNAL_KEY_MESSAGE, _onKeyMessage, instance);
    eventBus.off(events.INTERNAL_KEY_STATUS_CHANGED, _onKeyStatusChanged, instance);
    checkConfig();

    _abortLicenseRequest();

    setMediaElement(null);
    selectedKeySystem = null;
    keySystemSelectionInProgress = false;

    if (protectionModel) {
      protectionModel.reset();
      protectionModel = null;
    }

    needkeyRetries.forEach(function (retryTimeout) {
      return clearTimeout(retryTimeout);
    });
    needkeyRetries = [];
    mediaInfoArr = [];
    pendingKeySessionsToHandle = [];
  }
  /**
   * Returns an object corresponding to the EME MediaKeySystemConfiguration dictionary
   * @param {object} keySystem
   * @return {KeySystemConfiguration}
   * @private
   */


  function _getKeySystemConfiguration(keySystemData) {
    var protData = keySystemData.protData;
    var audioCapabilities = [];
    var videoCapabilities = [];
    var audioRobustness = protData && protData.audioRobustness && protData.audioRobustness.length > 0 ? protData.audioRobustness : robustnessLevel;
    var videoRobustness = protData && protData.videoRobustness && protData.videoRobustness.length > 0 ? protData.videoRobustness : robustnessLevel;
    var ksSessionType = keySystemData.sessionType;
    var distinctiveIdentifier = protData && protData.distinctiveIdentifier ? protData.distinctiveIdentifier : 'optional';
    var persistentState = protData && protData.persistentState ? protData.persistentState : ksSessionType === 'temporary' ? 'optional' : 'required';
    mediaInfoArr.forEach(function (media) {
      if (media.type === constants.AUDIO) {
        audioCapabilities.push(new _vo_MediaCapability__WEBPACK_IMPORTED_MODULE_1__["default"](media.codec, audioRobustness));
      } else if (media.type === constants.VIDEO) {
        videoCapabilities.push(new _vo_MediaCapability__WEBPACK_IMPORTED_MODULE_1__["default"](media.codec, videoRobustness));
      }
    });
    return new _vo_KeySystemConfiguration__WEBPACK_IMPORTED_MODULE_2__["default"](audioCapabilities, videoCapabilities, distinctiveIdentifier, persistentState, [ksSessionType]);
  }
  /**
   * Event handler for when the status of the key has changed
   * @param {object} e
   * @private
   */


  function _onKeyStatusChanged(e) {
    if (e.error) {
      eventBus.trigger(events.KEY_STATUSES_CHANGED, {
        data: null,
        error: e.error
      });
    } else {
      logger.debug('DRM: key status = ' + e.status);
    }
  }
  /**
   * Event handler for the key message event. Once we have a key message we can issue a license request
   * @param {object} e
   * @private
   */


  function _onKeyMessage(e) {
    logger.debug('DRM: onKeyMessage'); // Dispatch event to applications indicating we received a key message

    var keyMessage = e.data;
    eventBus.trigger(events.KEY_MESSAGE, {
      data: keyMessage
    });
    var messageType = keyMessage.messageType ? keyMessage.messageType : 'license-request';
    var message = keyMessage.message;
    var sessionToken = keyMessage.sessionToken;

    var protData = _getProtDataForKeySystem(selectedKeySystem);

    var licenseServerModelInstance = protectionKeyController.getLicenseServerModelInstance(selectedKeySystem, protData, messageType);
    var eventData = {
      sessionToken: sessionToken,
      messageType: messageType
    }; // Ensure message from CDM is not empty

    if (!message || message.byteLength === 0) {
      _sendLicenseRequestCompleteEvent(eventData, new _vo_DashJSError__WEBPACK_IMPORTED_MODULE_4__["default"](_errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEY_MESSAGE_NO_CHALLENGE_ERROR_CODE, _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEY_MESSAGE_NO_CHALLENGE_ERROR_MESSAGE));

      return;
    } // Message not destined for license server


    if (!licenseServerModelInstance) {
      logger.debug('DRM: License server request not required for this message (type = ' + e.data.messageType + ').  Session ID = ' + sessionToken.getSessionId());

      _sendLicenseRequestCompleteEvent(eventData);

      return;
    } // Perform any special handling for ClearKey


    if (protectionKeyController.isClearKey(selectedKeySystem)) {
      var clearkeys = protectionKeyController.processClearKeyLicenseRequest(selectedKeySystem, protData, message);

      if (clearkeys && clearkeys.keyPairs && clearkeys.keyPairs.length > 0) {
        logger.debug('DRM: ClearKey license request handled by application!');

        _sendLicenseRequestCompleteEvent(eventData);

        protectionModel.updateKeySession(sessionToken, clearkeys);
        return;
      }
    } // In all other cases we have to make a license request


    _issueLicenseRequest(keyMessage, licenseServerModelInstance, protData);
  }
  /**
   * Notify other classes that the license request was completed
   * @param {object} data
   * @param {object} error
   * @private
   */


  function _sendLicenseRequestCompleteEvent(data, error) {
    eventBus.trigger(events.LICENSE_REQUEST_COMPLETE, {
      data: data,
      error: error
    });
  }
  /**
   * Start issuing a license request
   * @param {object} keyMessage
   * @param {object} licenseServerData
   * @param {object} protData
   * @private
   */


  function _issueLicenseRequest(keyMessage, licenseServerData, protData) {
    var sessionToken = keyMessage.sessionToken;
    var messageType = keyMessage.messageType ? keyMessage.messageType : 'license-request';
    var eventData = {
      sessionToken: sessionToken,
      messageType: messageType
    };
    var keySystemString = selectedKeySystem ? selectedKeySystem.systemString : null; // Determine license server URL

    var url = _getLicenseServerUrl(protData, messageType, sessionToken, keyMessage, licenseServerData); // Ensure valid license server URL


    if (!url) {
      _sendLicenseRequestCompleteEvent(eventData, new _vo_DashJSError__WEBPACK_IMPORTED_MODULE_4__["default"](_errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEY_MESSAGE_NO_LICENSE_SERVER_URL_ERROR_CODE, _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEY_MESSAGE_NO_LICENSE_SERVER_URL_ERROR_MESSAGE));

      return;
    } // Set optional XMLHttpRequest headers from protection data and message


    var reqHeaders = {};
    var withCredentials = false;

    if (protData) {
      _updateHeaders(reqHeaders, protData.httpRequestHeaders);
    }

    var message = keyMessage.message;
    var headersFromMessage = selectedKeySystem.getRequestHeadersFromMessage(message);

    _updateHeaders(reqHeaders, headersFromMessage);

    Object.keys(reqHeaders).forEach(function (key) {
      if ('authorization' === key.toLowerCase()) {
        withCredentials = true;
      }
    }); // Overwrite withCredentials property from protData if present

    if (protData && typeof protData.withCredentials == 'boolean') {
      withCredentials = protData.withCredentials;
    }

    var onLoad = function onLoad(xhr) {
      if (!protectionModel) {
        return;
      }

      if (xhr.status >= 200 && xhr.status <= 299) {
        var responseHeaders = _core_Utils__WEBPACK_IMPORTED_MODULE_8__["default"].parseHttpHeaders(xhr.getAllResponseHeaders ? xhr.getAllResponseHeaders() : null);
        var licenseResponse = new _vo_LicenseResponse__WEBPACK_IMPORTED_MODULE_6__["default"](xhr.responseURL, responseHeaders, xhr.response);
        var licenseResponseFilters = customParametersModel.getLicenseResponseFilters();

        _applyFilters(licenseResponseFilters, licenseResponse).then(function () {
          var licenseMessage = licenseServerData.getLicenseMessage(licenseResponse.data, keySystemString, messageType);

          if (licenseMessage !== null) {
            _sendLicenseRequestCompleteEvent(eventData);

            protectionModel.updateKeySession(sessionToken, licenseMessage);
          } else {
            _reportError(xhr, eventData, keySystemString, messageType, licenseServerData);
          }
        });
      } else {
        _reportError(xhr, eventData, keySystemString, messageType, licenseServerData);
      }
    };

    var onAbort = function onAbort(xhr) {
      _sendLicenseRequestCompleteEvent(eventData, new _vo_DashJSError__WEBPACK_IMPORTED_MODULE_4__["default"](_errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEY_MESSAGE_LICENSER_ERROR_CODE, _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEY_MESSAGE_LICENSER_ERROR_MESSAGE + keySystemString + ' update, XHR aborted. status is "' + xhr.statusText + '" (' + xhr.status + '), readyState is ' + xhr.readyState));
    };

    var onError = function onError(xhr) {
      _sendLicenseRequestCompleteEvent(eventData, new _vo_DashJSError__WEBPACK_IMPORTED_MODULE_4__["default"](_errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEY_MESSAGE_LICENSER_ERROR_CODE, _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEY_MESSAGE_LICENSER_ERROR_MESSAGE + keySystemString + ' update, XHR error. status is "' + xhr.statusText + '" (' + xhr.status + '), readyState is ' + xhr.readyState));
    };

    var reqPayload = selectedKeySystem.getLicenseRequestFromMessage(message);
    var reqMethod = licenseServerData.getHTTPMethod(messageType);
    var responseType = licenseServerData.getResponseType(keySystemString, messageType);
    var timeout = protData && !isNaN(protData.httpTimeout) ? protData.httpTimeout : LICENSE_SERVER_REQUEST_DEFAULT_TIMEOUT;
    var sessionId = sessionToken.getSessionId() || null;
    var licenseRequest = new _vo_LicenseRequest__WEBPACK_IMPORTED_MODULE_5__["default"](url, reqMethod, responseType, reqHeaders, withCredentials, messageType, sessionId, reqPayload);
    var retryAttempts = !isNaN(settings.get().streaming.retryAttempts[_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_7__.HTTPRequest.LICENSE]) ? settings.get().streaming.retryAttempts[_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_7__.HTTPRequest.LICENSE] : LICENSE_SERVER_REQUEST_RETRIES;
    var licenseRequestFilters = customParametersModel.getLicenseRequestFilters();

    _applyFilters(licenseRequestFilters, licenseRequest).then(function () {
      _doLicenseRequest(licenseRequest, retryAttempts, timeout, onLoad, onAbort, onError);
    });
  }
  /**
   * Implement license requests with a retry mechanism to avoid temporary network issues to affect playback experience
   * @param {object} request
   * @param {number} retriesCount
   * @param {number} timeout
   * @param {function} onLoad
   * @param {function} onAbort
   * @param {function} onError
   * @private
   */


  function _doLicenseRequest(request, retriesCount, timeout, onLoad, onAbort, onError) {
    var xhr = new XMLHttpRequest();

    if (settings.get().streaming.cmcd && settings.get().streaming.cmcd.enabled) {
      var cmcdMode = settings.get().streaming.cmcd.mode;

      if (cmcdMode === _constants_Constants__WEBPACK_IMPORTED_MODULE_9__["default"].CMCD_MODE_QUERY) {
        var cmcdParams = cmcdModel.getQueryParameter({
          url: request.url,
          type: _vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_7__.HTTPRequest.LICENSE
        });

        if (cmcdParams) {
          request.url = _core_Utils__WEBPACK_IMPORTED_MODULE_8__["default"].addAditionalQueryParameterToUrl(request.url, [cmcdParams]);
        }
      }
    }

    xhr.open(request.method, request.url, true);
    xhr.responseType = request.responseType;
    xhr.withCredentials = request.withCredentials;

    if (timeout > 0) {
      xhr.timeout = timeout;
    }

    for (var key in request.headers) {
      xhr.setRequestHeader(key, request.headers[key]);
    }

    if (settings.get().streaming.cmcd && settings.get().streaming.cmcd.enabled) {
      var _cmcdMode = settings.get().streaming.cmcd.mode;

      if (_cmcdMode === _constants_Constants__WEBPACK_IMPORTED_MODULE_9__["default"].CMCD_MODE_HEADER) {
        var cmcdHeaders = cmcdModel.getHeaderParameters({
          url: request.url,
          type: _vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_7__.HTTPRequest.LICENSE
        });

        if (cmcdHeaders) {
          for (var header in cmcdHeaders) {
            var value = cmcdHeaders[header];

            if (value) {
              xhr.setRequestHeader(header, value);
            }
          }
        }
      }
    }

    var _retryRequest = function _retryRequest() {
      // fail silently and retry
      retriesCount--;
      var retryInterval = !isNaN(settings.get().streaming.retryIntervals[_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_7__.HTTPRequest.LICENSE]) ? settings.get().streaming.retryIntervals[_vo_metrics_HTTPRequest__WEBPACK_IMPORTED_MODULE_7__.HTTPRequest.LICENSE] : LICENSE_SERVER_REQUEST_RETRY_INTERVAL;
      licenseRequestRetryTimeout = setTimeout(function () {
        _doLicenseRequest(request, retriesCount, timeout, onLoad, onAbort, onError);
      }, retryInterval);
    };

    xhr.onload = function () {
      licenseXhrRequest = null;

      if (this.status >= 200 && this.status <= 299 || retriesCount <= 0) {
        onLoad(this);
      } else {
        logger.warn('License request failed (' + this.status + '). Retrying it... Pending retries: ' + retriesCount);

        _retryRequest();
      }
    };

    xhr.ontimeout = xhr.onerror = function () {
      licenseXhrRequest = null;

      if (retriesCount <= 0) {
        onError(this);
      } else {
        logger.warn('License request network request failed . Retrying it... Pending retries: ' + retriesCount);

        _retryRequest();
      }
    };

    xhr.onabort = function () {
      onAbort(this);
    }; // deprecated, to be removed


    eventBus.trigger(events.LICENSE_REQUEST_SENDING, {
      url: request.url,
      headers: request.headers,
      payload: request.data,
      sessionId: request.sessionId
    });
    licenseXhrRequest = xhr;
    xhr.send(request.data);
  }
  /**
   * Aborts license request
   * @private
   */


  function _abortLicenseRequest() {
    if (licenseXhrRequest) {
      licenseXhrRequest.onloadend = licenseXhrRequest.onerror = licenseXhrRequest.onprogress = undefined; //Ignore events from aborted requests.

      licenseXhrRequest.abort();
      licenseXhrRequest = null;
    }

    if (licenseRequestRetryTimeout) {
      clearTimeout(licenseRequestRetryTimeout);
      licenseRequestRetryTimeout = null;
    }
  }
  /**
   * Returns the url of the license server
   * @param {object} protData
   * @param {string} messageType
   * @param {object} sessionToken
   * @param {object} keyMessage
   * @param {object} licenseServerData
   * @return {*}
   * @private
   */


  function _getLicenseServerUrl(protData, messageType, sessionToken, keyMessage, licenseServerData) {
    var url = null;
    var message = keyMessage.message; // Check if the url is defined by the application

    if (protData && protData.serverURL) {
      var serverURL = protData.serverURL;

      if (typeof serverURL === 'string' && serverURL !== '') {
        url = serverURL;
      } else if (_typeof(serverURL) === 'object' && serverURL.hasOwnProperty(messageType)) {
        url = serverURL[messageType];
      }
    } // This is the old way of providing the url
    else if (protData && protData.laURL && protData.laURL !== '') {
      url = protData.laURL;
    } // No url provided by the app. Check the manifest and the pssh
    else {
      // Check for url defined in the manifest
      url = _CommonEncryption__WEBPACK_IMPORTED_MODULE_0__["default"].getLicenseServerUrlFromMediaInfo(mediaInfoArr, selectedKeySystem.schemeIdURI); // In case we are not using Clearky we can still get a url from the pssh.

      if (!url && !protectionKeyController.isClearKey(selectedKeySystem)) {
        var psshData = _CommonEncryption__WEBPACK_IMPORTED_MODULE_0__["default"].getPSSHData(sessionToken.initData);
        url = selectedKeySystem.getLicenseServerURLFromInitData(psshData); // Still no url, check the keymessage

        if (!url) {
          url = keyMessage.laURL;
        }
      }
    } // Possibly update or override the URL based on the message


    url = licenseServerData.getServerURLFromMessage(url, message, messageType);
    return url;
  }
  /**
   * Add new headers to the existing ones
   * @param {array} reqHeaders
   * @param {object} headers
   * @private
   */


  function _updateHeaders(reqHeaders, headers) {
    if (headers) {
      for (var key in headers) {
        reqHeaders[key] = headers[key];
      }
    }
  }
  /**
   * Reports an error that might have occured during the license request
   * @param {object} xhr
   * @param {object} eventData
   * @param {string} keySystemString
   * @param {string} messageType
   * @param {object} licenseServerData
   * @private
   */


  function _reportError(xhr, eventData, keySystemString, messageType, licenseServerData) {
    var errorMsg = 'NONE';
    var data = null;

    if (xhr.response) {
      errorMsg = licenseServerData.getErrorResponse(xhr.response, keySystemString, messageType);
      data = {
        serverResponse: xhr.response || null,
        responseCode: xhr.status || null,
        responseText: xhr.statusText || null
      };
    }

    _sendLicenseRequestCompleteEvent(eventData, new _vo_DashJSError__WEBPACK_IMPORTED_MODULE_4__["default"](_errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEY_MESSAGE_LICENSER_ERROR_CODE, _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEY_MESSAGE_LICENSER_ERROR_MESSAGE + keySystemString + ' update, XHR complete. status is "' + xhr.statusText + '" (' + xhr.status + '), readyState is ' + xhr.readyState + '.  Response is ' + errorMsg, data));
  }
  /**
   * Applies custom filters defined by the application
   * @param {array} filters
   * @param {object} param
   * @return {Promise<void>|*}
   * @private
   */


  function _applyFilters(filters, param) {
    if (!filters) return Promise.resolve();
    return filters.reduce(function (prev, next) {
      return prev.then(function () {
        return next(param);
      });
    }, Promise.resolve());
  }
  /**
   * Event handler for "needkey" and "encrypted" events
   * @param {object} event
   * @param {number} retry
   * @private
   */


  function _onNeedKey(event, retry) {
    if (!settings.get().streaming.protection.ignoreEmeEncryptedEvent) {
      logger.debug('DRM: onNeedKey'); // Ignore non-cenc initData

      if (event.key.initDataType !== 'cenc') {
        logger.warn('DRM:  Only \'cenc\' initData is supported!  Ignoring initData of type: ' + event.key.initDataType);
        return;
      }

      if (mediaInfoArr.length === 0) {
        logger.warn('DRM: onNeedKey called before initializeForMedia, wait until initialized');
        retry = typeof retry === 'undefined' ? 1 : retry + 1;

        if (retry < NEEDKEY_BEFORE_INITIALIZE_RETRIES) {
          needkeyRetries.push(setTimeout(function () {
            _onNeedKey(event, retry);
          }, NEEDKEY_BEFORE_INITIALIZE_TIMEOUT));
          return;
        }
      } // Some browsers return initData as Uint8Array (IE), some as ArrayBuffer (Chrome).
      // Convert to ArrayBuffer


      var abInitData = event.key.initData;

      if (ArrayBuffer.isView(abInitData)) {
        abInitData = abInitData.buffer;
      } // If key system has already been selected and initData already seen, then do nothing


      if (selectedKeySystem) {
        var initDataForKS = _CommonEncryption__WEBPACK_IMPORTED_MODULE_0__["default"].getPSSHForKeySystem(selectedKeySystem, abInitData);

        if (initDataForKS) {
          // Check for duplicate initData
          if (_isInitDataDuplicate(initDataForKS)) {
            return;
          }
        }
      }

      logger.debug('DRM: initData:', String.fromCharCode.apply(null, new Uint8Array(abInitData)));
      var supportedKs = protectionKeyController.getSupportedKeySystemsFromSegmentPssh(abInitData, protDataSet, sessionType);

      if (supportedKs.length === 0) {
        logger.debug('DRM: Received needkey event with initData, but we don\'t support any of the key systems!');
        return;
      }

      _handleKeySystemFromPssh(supportedKs);
    }
  }
  /**
   * Returns all available key systems
   * @return {array}
   */


  function getKeySystems() {
    return protectionKeyController ? protectionKeyController.getKeySystems() : [];
  }
  /**
   * Sets all available key systems
   * @param {array} keySystems
   */


  function setKeySystems(keySystems) {
    if (protectionKeyController) {
      protectionKeyController.setKeySystems(keySystems);
    }
  }

  instance = {
    initializeForMedia: initializeForMedia,
    clearMediaInfoArray: clearMediaInfoArray,
    handleKeySystemFromManifest: handleKeySystemFromManifest,
    createKeySession: createKeySession,
    loadKeySession: loadKeySession,
    removeKeySession: removeKeySession,
    closeKeySession: closeKeySession,
    setServerCertificate: setServerCertificate,
    setMediaElement: setMediaElement,
    setSessionType: setSessionType,
    setRobustnessLevel: setRobustnessLevel,
    setProtectionData: setProtectionData,
    getSupportedKeySystemsFromContentProtection: getSupportedKeySystemsFromContentProtection,
    getKeySystems: getKeySystems,
    setKeySystems: setKeySystems,
    stop: stop,
    reset: reset
  };
  setup();
  return instance;
}

ProtectionController.__dashjs_factory_name = 'ProtectionController';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker__WEBPACK_IMPORTED_MODULE_10__["default"].getClassFactory(ProtectionController));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/protection/controllers/ProtectionKeyController.js":
/*!*************************************************************************!*\
  !*** ./src/streaming/protection/controllers/ProtectionKeyController.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CommonEncryption__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../CommonEncryption */ "./src/streaming/protection/CommonEncryption.js");
/* harmony import */ var _drm_KeySystemClearKey__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../drm/KeySystemClearKey */ "./src/streaming/protection/drm/KeySystemClearKey.js");
/* harmony import */ var _drm_KeySystemW3CClearKey__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../drm/KeySystemW3CClearKey */ "./src/streaming/protection/drm/KeySystemW3CClearKey.js");
/* harmony import */ var _drm_KeySystemWidevine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../drm/KeySystemWidevine */ "./src/streaming/protection/drm/KeySystemWidevine.js");
/* harmony import */ var _drm_KeySystemPlayReady__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../drm/KeySystemPlayReady */ "./src/streaming/protection/drm/KeySystemPlayReady.js");
/* harmony import */ var _servers_DRMToday__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../servers/DRMToday */ "./src/streaming/protection/servers/DRMToday.js");
/* harmony import */ var _servers_PlayReady__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../servers/PlayReady */ "./src/streaming/protection/servers/PlayReady.js");
/* harmony import */ var _servers_Widevine__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../servers/Widevine */ "./src/streaming/protection/servers/Widevine.js");
/* harmony import */ var _servers_ClearKey__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../servers/ClearKey */ "./src/streaming/protection/servers/ClearKey.js");
/* harmony import */ var _constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../constants/ProtectionConstants */ "./src/streaming/constants/ProtectionConstants.js");
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
 * @module ProtectionKeyController
 * @ignore
 * @description Media protection key system functionality that can be modified/overridden by applications
 */

function ProtectionKeyController() {
  var context = this.context;
  var instance, debug, logger, keySystems, BASE64, settings, clearkeyKeySystem, clearkeyW3CKeySystem;

  function setConfig(config) {
    if (!config) return;

    if (config.debug) {
      debug = config.debug;
      logger = debug.getLogger(instance);
    }

    if (config.BASE64) {
      BASE64 = config.BASE64;
    }

    if (config.settings) {
      settings = config.settings;
    }
  }

  function initialize() {
    keySystems = [];
    var keySystem; // PlayReady

    keySystem = (0,_drm_KeySystemPlayReady__WEBPACK_IMPORTED_MODULE_4__["default"])(context).getInstance({
      BASE64: BASE64,
      settings: settings
    });
    keySystems.push(keySystem); // Widevine

    keySystem = (0,_drm_KeySystemWidevine__WEBPACK_IMPORTED_MODULE_3__["default"])(context).getInstance({
      BASE64: BASE64
    });
    keySystems.push(keySystem); // ClearKey

    keySystem = (0,_drm_KeySystemClearKey__WEBPACK_IMPORTED_MODULE_1__["default"])(context).getInstance({
      BASE64: BASE64
    });
    keySystems.push(keySystem);
    clearkeyKeySystem = keySystem; // W3C ClearKey

    keySystem = (0,_drm_KeySystemW3CClearKey__WEBPACK_IMPORTED_MODULE_2__["default"])(context).getInstance({
      BASE64: BASE64,
      debug: debug
    });
    keySystems.push(keySystem);
    clearkeyW3CKeySystem = keySystem;
  }
  /**
   * Returns a prioritized list of key systems supported
   * by this player (not necessarily those supported by the
   * user agent)
   *
   * @returns {Array.<KeySystem>} a prioritized
   * list of key systems
   * @memberof module:ProtectionKeyController
   * @instance
   */


  function getKeySystems() {
    return keySystems;
  }
  /**
   * Sets the prioritized list of key systems to be supported
   * by this player.
   *
   * @param {Array.<KeySystem>} newKeySystems the new prioritized
   * list of key systems
   * @memberof module:ProtectionKeyController
   * @instance
   */


  function setKeySystems(newKeySystems) {
    keySystems = newKeySystems;
  }
  /**
   * Returns the key system associated with the given key system string
   * name (i.e. 'org.w3.clearkey')
   *
   * @param {string} systemString the system string
   * @returns {KeySystem|null} the key system
   * or null if no supported key system is associated with the given key
   * system string
   * @memberof module:ProtectionKeyController
   * @instance
   */


  function getKeySystemBySystemString(systemString) {
    for (var i = 0; i < keySystems.length; i++) {
      if (keySystems[i].systemString === systemString) {
        return keySystems[i];
      }
    }

    return null;
  }
  /**
   * Determines whether the given key system is ClearKey.  This is
   * necessary because the EME spec defines ClearKey and its method
   * for providing keys to the key session; and this method has changed
   * between the various API versions.  Our EME-specific ProtectionModels
   * must know if the system is ClearKey so that it can format the keys
   * according to the particular spec version.
   *
   * @param {Object} keySystem the key
   * @returns {boolean} true if this is the ClearKey key system, false
   * otherwise
   * @memberof module:ProtectionKeyController
   * @instance
   */


  function isClearKey(keySystem) {
    return keySystem === clearkeyKeySystem || keySystem === clearkeyW3CKeySystem;
  }
  /**
   * Check equality of initData array buffers.
   *
   * @param {ArrayBuffer} initData1 - first initData
   * @param {ArrayBuffer} initData2 - second initData
   * @returns {boolean} true if the initData arrays are equal in size and
   * contents, false otherwise
   * @memberof module:ProtectionKeyController
   * @instance
   */


  function initDataEquals(initData1, initData2) {
    if (initData1.byteLength === initData2.byteLength) {
      var data1 = new Uint8Array(initData1);
      var data2 = new Uint8Array(initData2);

      for (var j = 0; j < data1.length; j++) {
        if (data1[j] !== data2[j]) {
          return false;
        }
      }

      return true;
    }

    return false;
  }
  /**
   * Returns a set of supported key systems and CENC initialization data
   * from the given array of ContentProtection elements.  Only
   * key systems that are supported by this player will be returned.
   * Key systems are returned in priority order (highest first).
   *
   * @param {Array.<Object>} cps - array of content protection elements parsed
   * from the manifest
   * @param {ProtectionData} protDataSet user specified protection data - license server url etc
   * supported by the content
   * @param {string} default session type
   * @returns {Array.<Object>} array of objects indicating which supported key
   * systems were found.  Empty array is returned if no
   * supported key systems were found
   * @memberof module:ProtectionKeyController
   * @instance
   */


  function getSupportedKeySystemsFromContentProtection(cps, protDataSet, sessionType) {
    var cp, ks, ksIdx, cpIdx;
    var supportedKS = [];

    if (cps) {
      var cencContentProtection = _CommonEncryption__WEBPACK_IMPORTED_MODULE_0__["default"].findCencContentProtection(cps);

      for (ksIdx = 0; ksIdx < keySystems.length; ++ksIdx) {
        ks = keySystems[ksIdx]; // Get protection data that applies for current key system

        var protData = _getProtDataForKeySystem(ks.systemString, protDataSet);

        for (cpIdx = 0; cpIdx < cps.length; ++cpIdx) {
          cp = cps[cpIdx];

          if (cp.schemeIdUri.toLowerCase() === ks.schemeIdURI) {
            // Look for DRM-specific ContentProtection
            var initData = ks.getInitData(cp, cencContentProtection);
            supportedKS.push({
              ks: keySystems[ksIdx],
              keyId: cp.keyId,
              initData: initData,
              protData: protData,
              cdmData: ks.getCDMData(protData ? protData.cdmData : null),
              sessionId: _getSessionId(protData, cp),
              sessionType: _getSessionType(protData, sessionType)
            });
          }
        }
      }
    }

    return supportedKS;
  }
  /**
   * Returns key systems supported by this player for the given PSSH
   * initializationData. Key systems are returned in priority order
   * (highest priority first)
   *
   * @param {ArrayBuffer} initData Concatenated PSSH data for all DRMs
   * supported by the content
   * @param {ProtectionData} protDataSet user specified protection data - license server url etc
   * supported by the content
   * @param {string} default session type
   * @returns {Array.<Object>} array of objects indicating which supported key
   * systems were found.  Empty array is returned if no
   * supported key systems were found
   * @memberof module:ProtectionKeyController
   * @instance
   */


  function getSupportedKeySystemsFromSegmentPssh(initData, protDataSet, sessionType) {
    var supportedKS = [];
    var pssh = _CommonEncryption__WEBPACK_IMPORTED_MODULE_0__["default"].parsePSSHList(initData);
    var ks, keySystemString;

    for (var ksIdx = 0; ksIdx < keySystems.length; ++ksIdx) {
      ks = keySystems[ksIdx];
      keySystemString = ks.systemString; // Get protection data that applies for current key system

      var protData = _getProtDataForKeySystem(keySystemString, protDataSet);

      if (ks.uuid in pssh) {
        supportedKS.push({
          ks: ks,
          initData: pssh[ks.uuid],
          protData: protData,
          cdmData: ks.getCDMData(protData ? protData.cdmData : null),
          sessionId: _getSessionId(protData),
          sessionType: _getSessionType(protData, sessionType)
        });
      }
    }

    return supportedKS;
  }
  /**
   * Returns the license server implementation data that should be used for this request.
   *
   * @param {KeySystem} keySystem the key system
   * associated with this license request
   * @param {ProtectionData} protData protection data to use for the
   * request
   * @param {string} [messageType="license-request"] the message type associated with this
   * request.  Supported message types can be found
   * {@link https://w3c.github.io/encrypted-media/#idl-def-MediaKeyMessageType|here}.
   * @returns {LicenseServer|null} the license server
   * implementation that should be used for this request or null if the player should not
   * pass messages of the given type to a license server
   * @memberof module:ProtectionKeyController
   * @instance
   *
   */


  function getLicenseServerModelInstance(keySystem, protData, messageType) {
    // Our default server implementations do not do anything with "license-release" or
    // "individualization-request" messages, so we just send a success event
    if (messageType === 'license-release' || messageType === 'individualization-request') {
      return null;
    }

    var licenseServerData = null;

    if (protData && protData.hasOwnProperty('drmtoday')) {
      licenseServerData = (0,_servers_DRMToday__WEBPACK_IMPORTED_MODULE_5__["default"])(context).getInstance({
        BASE64: BASE64
      });
    } else if (keySystem.systemString === _constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_9__["default"].WIDEVINE_KEYSTEM_STRING) {
      licenseServerData = (0,_servers_Widevine__WEBPACK_IMPORTED_MODULE_7__["default"])(context).getInstance();
    } else if (keySystem.systemString === _constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_9__["default"].PLAYREADY_KEYSTEM_STRING) {
      licenseServerData = (0,_servers_PlayReady__WEBPACK_IMPORTED_MODULE_6__["default"])(context).getInstance();
    } else if (keySystem.systemString === _constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_9__["default"].CLEARKEY_KEYSTEM_STRING) {
      licenseServerData = (0,_servers_ClearKey__WEBPACK_IMPORTED_MODULE_8__["default"])(context).getInstance();
    }

    return licenseServerData;
  }
  /**
   * Allows application-specific retrieval of ClearKey keys.
   *
   * @param {KeySystem} clearkeyKeySystem They exact ClearKey System to be used
   * @param {ProtectionData} protData protection data to use for the
   * request
   * @param {ArrayBuffer} message the key message from the CDM
   * @return {ClearKeyKeySet|null} the clear keys associated with
   * the request or null if no keys can be returned by this function
   * @memberof module:ProtectionKeyController
   * @instance
   */


  function processClearKeyLicenseRequest(clearkeyKeySystem, protData, message) {
    try {
      return clearkeyKeySystem.getClearKeysFromProtectionData(protData, message);
    } catch (error) {
      logger.error('Failed to retrieve clearkeys from ProtectionData');
      return null;
    }
  }

  function setProtectionData(protectionDataSet) {
    var getProtectionData = function getProtectionData(keySystemString) {
      var protData = null;

      if (protectionDataSet) {
        protData = keySystemString in protectionDataSet ? protectionDataSet[keySystemString] : null;
      }

      return protData;
    };

    for (var i = 0; i < keySystems.length; i++) {
      var keySystem = keySystems[i];

      if (keySystem.hasOwnProperty('init')) {
        keySystem.init(getProtectionData(keySystem.systemString));
      }
    }
  }

  function _getProtDataForKeySystem(systemString, protDataSet) {
    if (!protDataSet) return null;
    return systemString in protDataSet ? protDataSet[systemString] : null;
  }

  function _getSessionId(protData, cp) {
    // Get sessionId from protectionData or from manifest (ContentProtection)
    if (protData && protData.sessionId) {
      return protData.sessionId;
    } else if (cp && cp.sessionId) {
      return cp.sessionId;
    }

    return null;
  }

  function _getSessionType(protData, sessionType) {
    return protData && protData.sessionType ? protData.sessionType : sessionType;
  }

  instance = {
    initialize: initialize,
    setProtectionData: setProtectionData,
    isClearKey: isClearKey,
    initDataEquals: initDataEquals,
    getKeySystems: getKeySystems,
    setKeySystems: setKeySystems,
    getKeySystemBySystemString: getKeySystemBySystemString,
    getSupportedKeySystemsFromContentProtection: getSupportedKeySystemsFromContentProtection,
    getSupportedKeySystemsFromSegmentPssh: getSupportedKeySystemsFromSegmentPssh,
    getLicenseServerModelInstance: getLicenseServerModelInstance,
    processClearKeyLicenseRequest: processClearKeyLicenseRequest,
    setConfig: setConfig
  };
  return instance;
}

ProtectionKeyController.__dashjs_factory_name = 'ProtectionKeyController';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getSingletonFactory(ProtectionKeyController));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/protection/drm/KeySystemClearKey.js":
/*!***********************************************************!*\
  !*** ./src/streaming/protection/drm/KeySystemClearKey.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vo_KeyPair__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vo/KeyPair */ "./src/streaming/protection/vo/KeyPair.js");
/* harmony import */ var _vo_ClearKeyKeySet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/ClearKeyKeySet */ "./src/streaming/protection/vo/ClearKeyKeySet.js");
/* harmony import */ var _CommonEncryption__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CommonEncryption */ "./src/streaming/protection/CommonEncryption.js");
/* harmony import */ var _constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants/ProtectionConstants */ "./src/streaming/constants/ProtectionConstants.js");
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




var uuid = 'e2719d58-a985-b3c9-781a-b030af78d30e';
var systemString = _constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_3__["default"].CLEARKEY_KEYSTEM_STRING;
var schemeIdURI = 'urn:uuid:' + uuid;

function KeySystemClearKey(config) {
  config = config || {};
  var instance;
  var BASE64 = config.BASE64;
  /**
   * Returns desired clearkeys (as specified in the CDM message) from protection data
   *
   * @param {ProtectionData} protectionData the protection data
   * @param {ArrayBuffer} message the ClearKey CDM message
   * @returns {ClearKeyKeySet} the key set or null if none found
   * @throws {Error} if a keyID specified in the CDM message was not found in the
   * protection data
   * @memberof KeySystemClearKey
   */

  function getClearKeysFromProtectionData(protectionData, message) {
    var clearkeySet = null;

    if (protectionData) {
      // ClearKey is the only system that does not require a license server URL, so we
      // handle it here when keys are specified in protection data
      var jsonMsg = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(message)));
      var keyPairs = [];

      for (var i = 0; i < jsonMsg.kids.length; i++) {
        var clearkeyID = jsonMsg.kids[i];
        var clearkey = protectionData.clearkeys && protectionData.clearkeys.hasOwnProperty(clearkeyID) ? protectionData.clearkeys[clearkeyID] : null;

        if (!clearkey) {
          throw new Error('DRM: ClearKey keyID (' + clearkeyID + ') is not known!');
        } // KeyIDs from CDM are not base64 padded.  Keys may or may not be padded


        keyPairs.push(new _vo_KeyPair__WEBPACK_IMPORTED_MODULE_0__["default"](clearkeyID, clearkey));
      }

      clearkeySet = new _vo_ClearKeyKeySet__WEBPACK_IMPORTED_MODULE_1__["default"](keyPairs);
    }

    return clearkeySet;
  }

  function getInitData(cp, cencContentProtection) {
    try {
      var initData = _CommonEncryption__WEBPACK_IMPORTED_MODULE_2__["default"].parseInitDataFromContentProtection(cp, BASE64);

      if (!initData && cencContentProtection) {
        var cencDefaultKid = cencDefaultKidToBase64Representation(cencContentProtection['cenc:default_KID']);
        var data = {
          kids: [cencDefaultKid]
        };
        initData = new TextEncoder().encode(JSON.stringify(data));
      }

      return initData;
    } catch (e) {
      return null;
    }
  }

  function cencDefaultKidToBase64Representation(cencDefaultKid) {
    try {
      var kid = cencDefaultKid.replace(/-/g, '');
      kid = btoa(kid.match(/\w{2}/g).map(function (a) {
        return String.fromCharCode(parseInt(a, 16));
      }).join(''));
      return kid.replace(/=/g, '').replace(/\//g, '_').replace(/\+/g, '-');
    } catch (e) {
      return null;
    }
  }

  function getRequestHeadersFromMessage() {
    // Set content type to application/json by default
    return {
      'Content-Type': 'application/json'
    };
  }

  function getLicenseRequestFromMessage(message) {
    return JSON.stringify(JSON.parse(String.fromCharCode.apply(null, new Uint8Array(message))));
  }

  function getLicenseServerURLFromInitData() {
    return null;
  }

  function getCDMData() {
    return null;
  }

  instance = {
    uuid: uuid,
    schemeIdURI: schemeIdURI,
    systemString: systemString,
    getInitData: getInitData,
    getRequestHeadersFromMessage: getRequestHeadersFromMessage,
    getLicenseRequestFromMessage: getLicenseRequestFromMessage,
    getLicenseServerURLFromInitData: getLicenseServerURLFromInitData,
    getCDMData: getCDMData,
    getClearKeysFromProtectionData: getClearKeysFromProtectionData
  };
  return instance;
}

KeySystemClearKey.__dashjs_factory_name = 'KeySystemClearKey';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getSingletonFactory(KeySystemClearKey));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/protection/drm/KeySystemPlayReady.js":
/*!************************************************************!*\
  !*** ./src/streaming/protection/drm/KeySystemPlayReady.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CommonEncryption__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CommonEncryption */ "./src/streaming/protection/CommonEncryption.js");
/* harmony import */ var _constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants/ProtectionConstants */ "./src/streaming/constants/ProtectionConstants.js");
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
 * Microsoft PlayReady DRM
 *
 * @class
 * @implements KeySystem
 */


var uuid = '9a04f079-9840-4286-ab92-e65be0885f95';
var systemString = _constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_1__["default"].PLAYREADY_KEYSTEM_STRING;
var schemeIdURI = 'urn:uuid:' + uuid;
var PRCDMData = '<PlayReadyCDMData type="LicenseAcquisition"><LicenseAcquisition version="1.0" Proactive="false"><CustomData encoding="base64encoded">%CUSTOMDATA%</CustomData></LicenseAcquisition></PlayReadyCDMData>';

function KeySystemPlayReady(config) {
  config = config || {};
  var instance;
  var messageFormat = 'utf-16';
  var BASE64 = config.BASE64;
  var settings = config.settings;

  function checkConfig() {
    if (!BASE64 || !BASE64.hasOwnProperty('decodeArray') || !BASE64.hasOwnProperty('decodeArray')) {
      throw new Error('Missing config parameter(s)');
    }
  }

  function getRequestHeadersFromMessage(message) {
    var msg, xmlDoc;
    var headers = {};
    var parser = new DOMParser();

    if (settings && settings.get().streaming.protection.detectPlayreadyMessageFormat) {
      // If message format configured/defaulted to utf-16 AND number of bytes is odd, assume 'unwrapped' raw CDM message.
      if (messageFormat === 'utf-16' && message && message.byteLength % 2 === 1) {
        headers['Content-Type'] = 'text/xml; charset=utf-8';
        return headers;
      }
    }

    var dataview = messageFormat === 'utf-16' ? new Uint16Array(message) : new Uint8Array(message);
    msg = String.fromCharCode.apply(null, dataview);
    xmlDoc = parser.parseFromString(msg, 'application/xml');
    var headerNameList = xmlDoc.getElementsByTagName('name');
    var headerValueList = xmlDoc.getElementsByTagName('value');

    for (var i = 0; i < headerNameList.length; i++) {
      headers[headerNameList[i].childNodes[0].nodeValue] = headerValueList[i].childNodes[0].nodeValue;
    } // Some versions of the PlayReady CDM return 'Content' instead of 'Content-Type'.
    // this is NOT w3c conform and license servers may reject the request!
    // -> rename it to proper w3c definition!


    if (headers.hasOwnProperty('Content')) {
      headers['Content-Type'] = headers.Content;
      delete headers.Content;
    } // Set Content-Type header by default if not provided in the the CDM message (<PlayReadyKeyMessage/>)
    // or if the message contains directly the challenge itself (Ex: LG SmartTVs)


    if (!headers.hasOwnProperty('Content-Type')) {
      headers['Content-Type'] = 'text/xml; charset=utf-8';
    }

    return headers;
  }

  function getLicenseRequestFromMessage(message) {
    var licenseRequest = null;
    var parser = new DOMParser();

    if (settings && settings.get().streaming.protection.detectPlayreadyMessageFormat) {
      // If message format configured/defaulted to utf-16 AND number of bytes is odd, assume 'unwrapped' raw CDM message.
      if (messageFormat === 'utf-16' && message && message.byteLength % 2 === 1) {
        return message;
      }
    }

    var dataview = messageFormat === 'utf-16' ? new Uint16Array(message) : new Uint8Array(message);
    checkConfig();
    var msg = String.fromCharCode.apply(null, dataview);
    var xmlDoc = parser.parseFromString(msg, 'application/xml');

    if (xmlDoc.getElementsByTagName('PlayReadyKeyMessage')[0]) {
      var Challenge = xmlDoc.getElementsByTagName('Challenge')[0].childNodes[0].nodeValue;

      if (Challenge) {
        licenseRequest = BASE64.decode(Challenge);
      }
    } else {
      // The message from CDM is not a wrapped message as on IE11 and Edge,
      // thus it contains direclty the challenge itself
      // (note that the xmlDoc at this point may be unreadable since it may have been interpreted as UTF-16)
      return message;
    }

    return licenseRequest;
  }

  function getLicenseServerURLFromInitData(initData) {
    if (initData) {
      var data = new DataView(initData);
      var numRecords = data.getUint16(4, true);
      var offset = 6;
      var parser = new DOMParser();

      for (var i = 0; i < numRecords; i++) {
        // Parse the PlayReady Record header
        var recordType = data.getUint16(offset, true);
        offset += 2;
        var recordLength = data.getUint16(offset, true);
        offset += 2;

        if (recordType !== 0x0001) {
          offset += recordLength;
          continue;
        }

        var recordData = initData.slice(offset, offset + recordLength);
        var record = String.fromCharCode.apply(null, new Uint16Array(recordData));
        var xmlDoc = parser.parseFromString(record, 'application/xml'); // First try <LA_URL>

        if (xmlDoc.getElementsByTagName('LA_URL')[0]) {
          var laurl = xmlDoc.getElementsByTagName('LA_URL')[0].childNodes[0].nodeValue;

          if (laurl) {
            return laurl;
          }
        } // Optionally, try <LUI_URL>


        if (xmlDoc.getElementsByTagName('LUI_URL')[0]) {
          var luiurl = xmlDoc.getElementsByTagName('LUI_URL')[0].childNodes[0].nodeValue;

          if (luiurl) {
            return luiurl;
          }
        }
      }
    }

    return null;
  }

  function getInitData(cpData) {
    // * desc@ getInitData
    // *   generate PSSH data from PROHeader defined in MPD file
    // *   PSSH format:
    // *   size (4)
    // *   box type(PSSH) (8)
    // *   Protection SystemID (16)
    // *   protection system data size (4) - length of decoded PROHeader
    // *   decoded PROHeader data from MPD file
    var PSSHBoxType = new Uint8Array([0x70, 0x73, 0x73, 0x68, 0x00, 0x00, 0x00, 0x00]); //'PSSH' 8 bytes

    var playreadySystemID = new Uint8Array([0x9a, 0x04, 0xf0, 0x79, 0x98, 0x40, 0x42, 0x86, 0xab, 0x92, 0xe6, 0x5b, 0xe0, 0x88, 0x5f, 0x95]);
    var byteCursor = 0;
    var uint8arraydecodedPROHeader = null;
    var PROSize, PSSHSize, PSSHBoxBuffer, PSSHBox, PSSHData;
    checkConfig();

    if (!cpData) {
      return null;
    } // Handle common encryption PSSH


    if ('pssh' in cpData) {
      return _CommonEncryption__WEBPACK_IMPORTED_MODULE_0__["default"].parseInitDataFromContentProtection(cpData, BASE64);
    } // Handle native MS PlayReady ContentProtection elements


    if ('pro' in cpData) {
      uint8arraydecodedPROHeader = BASE64.decodeArray(cpData.pro.__text);
    } else if ('prheader' in cpData) {
      uint8arraydecodedPROHeader = BASE64.decodeArray(cpData.prheader.__text);
    } else {
      return null;
    }

    PROSize = uint8arraydecodedPROHeader.length;
    PSSHSize = 0x4 + PSSHBoxType.length + playreadySystemID.length + 0x4 + PROSize;
    PSSHBoxBuffer = new ArrayBuffer(PSSHSize);
    PSSHBox = new Uint8Array(PSSHBoxBuffer);
    PSSHData = new DataView(PSSHBoxBuffer);
    PSSHData.setUint32(byteCursor, PSSHSize);
    byteCursor += 0x4;
    PSSHBox.set(PSSHBoxType, byteCursor);
    byteCursor += PSSHBoxType.length;
    PSSHBox.set(playreadySystemID, byteCursor);
    byteCursor += playreadySystemID.length;
    PSSHData.setUint32(byteCursor, PROSize);
    byteCursor += 0x4;
    PSSHBox.set(uint8arraydecodedPROHeader, byteCursor);
    byteCursor += PROSize;
    return PSSHBox.buffer;
  }
  /**
   * It seems that some PlayReady implementations return their XML-based CDM
   * messages using UTF16, while others return them as UTF8.  Use this function
   * to modify the message format to expect when parsing CDM messages.
   *
   * @param {string} format the expected message format.  Either "utf-8" or "utf-16".
   * @throws {Error} Specified message format is not one of "utf8" or "utf16"
   */


  function setPlayReadyMessageFormat(format) {
    if (format !== 'utf-8' && format !== 'utf-16') {
      throw new Error('Specified message format is not one of "utf-8" or "utf-16"');
    }

    messageFormat = format;
  }
  /**
   * Get Playready Custom data
   */


  function getCDMData(_cdmData) {
    var customData, cdmData, cdmDataBytes, i;
    checkConfig();
    if (!_cdmData) return null; // Convert custom data into multibyte string

    customData = [];

    for (i = 0; i < _cdmData.length; ++i) {
      customData.push(_cdmData.charCodeAt(i));
      customData.push(0);
    }

    customData = String.fromCharCode.apply(null, customData); // Encode in Base 64 the custom data string

    customData = BASE64.encode(customData); // Initialize CDM data with Base 64 encoded custom data
    // (see https://msdn.microsoft.com/en-us/library/dn457361.aspx)

    cdmData = PRCDMData.replace('%CUSTOMDATA%', customData); // Convert CDM data into multibyte characters

    cdmDataBytes = [];

    for (i = 0; i < cdmData.length; ++i) {
      cdmDataBytes.push(cdmData.charCodeAt(i));
      cdmDataBytes.push(0);
    }

    return new Uint8Array(cdmDataBytes).buffer;
  }

  instance = {
    uuid: uuid,
    schemeIdURI: schemeIdURI,
    systemString: systemString,
    getInitData: getInitData,
    getRequestHeadersFromMessage: getRequestHeadersFromMessage,
    getLicenseRequestFromMessage: getLicenseRequestFromMessage,
    getLicenseServerURLFromInitData: getLicenseServerURLFromInitData,
    getCDMData: getCDMData,
    setPlayReadyMessageFormat: setPlayReadyMessageFormat
  };
  return instance;
}

KeySystemPlayReady.__dashjs_factory_name = 'KeySystemPlayReady';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getSingletonFactory(KeySystemPlayReady));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/protection/drm/KeySystemW3CClearKey.js":
/*!**************************************************************!*\
  !*** ./src/streaming/protection/drm/KeySystemW3CClearKey.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vo_KeyPair__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vo/KeyPair */ "./src/streaming/protection/vo/KeyPair.js");
/* harmony import */ var _vo_ClearKeyKeySet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/ClearKeyKeySet */ "./src/streaming/protection/vo/ClearKeyKeySet.js");
/* harmony import */ var _CommonEncryption__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CommonEncryption */ "./src/streaming/protection/CommonEncryption.js");
/* harmony import */ var _constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants/ProtectionConstants */ "./src/streaming/constants/ProtectionConstants.js");
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




var uuid = '1077efec-c0b2-4d02-ace3-3c1e52e2fb4b';
var systemString = _constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_3__["default"].CLEARKEY_KEYSTEM_STRING;
var schemeIdURI = 'urn:uuid:' + uuid;

function KeySystemW3CClearKey(config) {
  var instance;
  var BASE64 = config.BASE64;
  var logger = config.debug.getLogger(instance);
  /**
   * Returns desired clearkeys (as specified in the CDM message) from protection data
   *
   * @param {ProtectionDataSet} protectionData the protection data
   * @param {ArrayBuffer} message the ClearKey CDM message
   * @returns {ClearKeyKeySet} the key set or null if none found
   * @throws {Error} if a keyID specified in the CDM message was not found in the
   * protection data
   * @memberof KeySystemClearKey
   */

  function getClearKeysFromProtectionData(protectionData, message) {
    var clearkeySet = null;

    if (protectionData) {
      // ClearKey is the only system that does not require a license server URL, so we
      // handle it here when keys are specified in protection data
      var jsonMsg = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(message)));
      var keyPairs = [];

      for (var i = 0; i < jsonMsg.kids.length; i++) {
        var clearkeyID = jsonMsg.kids[i];
        var clearkey = protectionData.clearkeys && protectionData.clearkeys.hasOwnProperty(clearkeyID) ? protectionData.clearkeys[clearkeyID] : null;

        if (!clearkey) {
          throw new Error('DRM: ClearKey keyID (' + clearkeyID + ') is not known!');
        } // KeyIDs from CDM are not base64 padded.  Keys may or may not be padded


        keyPairs.push(new _vo_KeyPair__WEBPACK_IMPORTED_MODULE_0__["default"](clearkeyID, clearkey));
      }

      clearkeySet = new _vo_ClearKeyKeySet__WEBPACK_IMPORTED_MODULE_1__["default"](keyPairs);
      logger.warn('ClearKey schemeIdURI is using W3C Common PSSH systemID (1077efec-c0b2-4d02-ace3-3c1e52e2fb4b) in Content Protection. See DASH-IF IOP v4.1 section 7.6.2.4');
    }

    return clearkeySet;
  }

  function getInitData(cp) {
    return _CommonEncryption__WEBPACK_IMPORTED_MODULE_2__["default"].parseInitDataFromContentProtection(cp, BASE64);
  }

  function getRequestHeadersFromMessage() {
    return null;
  }

  function getLicenseRequestFromMessage(message) {
    return new Uint8Array(message);
  }

  function getLicenseServerURLFromInitData() {
    return null;
  }

  function getCDMData() {
    return null;
  }

  instance = {
    uuid: uuid,
    schemeIdURI: schemeIdURI,
    systemString: systemString,
    getInitData: getInitData,
    getRequestHeadersFromMessage: getRequestHeadersFromMessage,
    getLicenseRequestFromMessage: getLicenseRequestFromMessage,
    getLicenseServerURLFromInitData: getLicenseServerURLFromInitData,
    getCDMData: getCDMData,
    getClearKeysFromProtectionData: getClearKeysFromProtectionData
  };
  return instance;
}

KeySystemW3CClearKey.__dashjs_factory_name = 'KeySystemW3CClearKey';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getSingletonFactory(KeySystemW3CClearKey));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/protection/drm/KeySystemWidevine.js":
/*!***********************************************************!*\
  !*** ./src/streaming/protection/drm/KeySystemWidevine.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CommonEncryption__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CommonEncryption */ "./src/streaming/protection/CommonEncryption.js");
/* harmony import */ var _constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants/ProtectionConstants */ "./src/streaming/constants/ProtectionConstants.js");
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
 * Google Widevine DRM
 *
 * @class
 * @implements MediaPlayer.dependencies.protection.KeySystem
 */


var uuid = 'edef8ba9-79d6-4ace-a3c8-27dcd51d21ed';
var systemString = _constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_1__["default"].WIDEVINE_KEYSTEM_STRING;
var schemeIdURI = 'urn:uuid:' + uuid;

function KeySystemWidevine(config) {
  config = config || {};
  var instance;
  var BASE64 = config.BASE64;

  function getInitData(cp) {
    return _CommonEncryption__WEBPACK_IMPORTED_MODULE_0__["default"].parseInitDataFromContentProtection(cp, BASE64);
  }

  function getRequestHeadersFromMessage() {
    return null;
  }

  function getLicenseRequestFromMessage(message) {
    return new Uint8Array(message);
  }

  function getLicenseServerURLFromInitData() {
    return null;
  }

  function getCDMData() {
    return null;
  }

  instance = {
    uuid: uuid,
    schemeIdURI: schemeIdURI,
    systemString: systemString,
    getInitData: getInitData,
    getRequestHeadersFromMessage: getRequestHeadersFromMessage,
    getLicenseRequestFromMessage: getLicenseRequestFromMessage,
    getLicenseServerURLFromInitData: getLicenseServerURLFromInitData,
    getCDMData: getCDMData
  };
  return instance;
}

KeySystemWidevine.__dashjs_factory_name = 'KeySystemWidevine';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getSingletonFactory(KeySystemWidevine));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/protection/errors/ProtectionErrors.js":
/*!*************************************************************!*\
  !*** ./src/streaming/protection/errors/ProtectionErrors.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_errors_ErrorsBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/errors/ErrorsBase */ "./src/core/errors/ErrorsBase.js");
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
 */

var ProtectionErrors = /*#__PURE__*/function (_ErrorsBase) {
  _inherits(ProtectionErrors, _ErrorsBase);

  var _super = _createSuper(ProtectionErrors);

  function ProtectionErrors() {
    var _this;

    _classCallCheck(this, ProtectionErrors);

    _this = _super.call(this);
    /**
     *  Generid key Error code
     */

    _this.MEDIA_KEYERR_CODE = 100;
    /**
     *  Error code returned by keyerror api for ProtectionModel_01b
     */

    _this.MEDIA_KEYERR_UNKNOWN_CODE = 101;
    /**
     *  Error code returned by keyerror api for ProtectionModel_01b
     */

    _this.MEDIA_KEYERR_CLIENT_CODE = 102;
    /**
     *  Error code returned by keyerror api for ProtectionModel_01b
     */

    _this.MEDIA_KEYERR_SERVICE_CODE = 103;
    /**
     *  Error code returned by keyerror api for ProtectionModel_01b
     */

    _this.MEDIA_KEYERR_OUTPUT_CODE = 104;
    /**
     *  Error code returned by keyerror api for ProtectionModel_01b
     */

    _this.MEDIA_KEYERR_HARDWARECHANGE_CODE = 105;
    /**
     *  Error code returned by keyerror api for ProtectionModel_01b
     */

    _this.MEDIA_KEYERR_DOMAIN_CODE = 106;
    /**
     *  Error code returned when an error occured in keymessage event for ProtectionModel_01b
     */

    _this.MEDIA_KEY_MESSAGE_ERROR_CODE = 107;
    /**
     *  Error code returned when challenge is invalid in keymessage event (event triggered by CDM)
     */

    _this.MEDIA_KEY_MESSAGE_NO_CHALLENGE_ERROR_CODE = 108;
    /**
     *  Error code returned when License server certificate has not been successfully updated
     */

    _this.SERVER_CERTIFICATE_UPDATED_ERROR_CODE = 109;
    /**
     *  Error code returned when license validity has expired
     */

    _this.KEY_STATUS_CHANGED_EXPIRED_ERROR_CODE = 110;
    /**
     *  Error code returned when no licenser url is defined
     */

    _this.MEDIA_KEY_MESSAGE_NO_LICENSE_SERVER_URL_ERROR_CODE = 111;
    /**
     *  Error code returned when key system access is denied
     */

    _this.KEY_SYSTEM_ACCESS_DENIED_ERROR_CODE = 112;
    /**
     *  Error code returned when key session has not been successfully created
     */

    _this.KEY_SESSION_CREATED_ERROR_CODE = 113;
    /**
     *  Error code returned when license request failed after a keymessage event has been triggered
     */

    _this.MEDIA_KEY_MESSAGE_LICENSER_ERROR_CODE = 114;
    _this.MEDIA_KEYERR_UNKNOWN_MESSAGE = 'An unspecified error occurred. This value is used for errors that don\'t match any of the other codes.';
    _this.MEDIA_KEYERR_CLIENT_MESSAGE = 'The Key System could not be installed or updated.';
    _this.MEDIA_KEYERR_SERVICE_MESSAGE = 'The message passed into update indicated an error from the license service.';
    _this.MEDIA_KEYERR_OUTPUT_MESSAGE = 'There is no available output device with the required characteristics for the content protection system.';
    _this.MEDIA_KEYERR_HARDWARECHANGE_MESSAGE = 'A hardware configuration change caused a content protection error.';
    _this.MEDIA_KEYERR_DOMAIN_MESSAGE = 'An error occurred in a multi-device domain licensing configuration. The most common error is a failure to join the domain.';
    _this.MEDIA_KEY_MESSAGE_ERROR_MESSAGE = 'Multiple key sessions were creates with a user-agent that does not support sessionIDs!! Unpredictable behavior ahead!';
    _this.MEDIA_KEY_MESSAGE_NO_CHALLENGE_ERROR_MESSAGE = 'DRM: Empty key message from CDM';
    _this.SERVER_CERTIFICATE_UPDATED_ERROR_MESSAGE = 'Error updating server certificate -- ';
    _this.KEY_STATUS_CHANGED_EXPIRED_ERROR_MESSAGE = 'DRM: KeyStatusChange error! -- License has expired';
    _this.MEDIA_KEY_MESSAGE_NO_LICENSE_SERVER_URL_ERROR_MESSAGE = 'DRM: No license server URL specified!';
    _this.KEY_SYSTEM_ACCESS_DENIED_ERROR_MESSAGE = 'DRM: KeySystem Access Denied! -- ';
    _this.KEY_SESSION_CREATED_ERROR_MESSAGE = 'DRM: unable to create session! --';
    _this.MEDIA_KEY_MESSAGE_LICENSER_ERROR_MESSAGE = 'DRM: licenser error! --';
    return _this;
  }

  return ProtectionErrors;
}(_core_errors_ErrorsBase__WEBPACK_IMPORTED_MODULE_0__["default"]);

var protectionErrors = new ProtectionErrors();
/* harmony default export */ __webpack_exports__["default"] = (protectionErrors);

/***/ }),

/***/ "./src/streaming/protection/models/ProtectionModel_01b.js":
/*!****************************************************************!*\
  !*** ./src/streaming/protection/models/ProtectionModel_01b.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_ProtectionKeyController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/ProtectionKeyController */ "./src/streaming/protection/controllers/ProtectionKeyController.js");
/* harmony import */ var _vo_NeedKey__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/NeedKey */ "./src/streaming/protection/vo/NeedKey.js");
/* harmony import */ var _vo_DashJSError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../vo/DashJSError */ "./src/streaming/vo/DashJSError.js");
/* harmony import */ var _vo_KeyMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../vo/KeyMessage */ "./src/streaming/protection/vo/KeyMessage.js");
/* harmony import */ var _vo_KeySystemConfiguration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../vo/KeySystemConfiguration */ "./src/streaming/protection/vo/KeySystemConfiguration.js");
/* harmony import */ var _vo_KeySystemAccess__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../vo/KeySystemAccess */ "./src/streaming/protection/vo/KeySystemAccess.js");
/* harmony import */ var _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../errors/ProtectionErrors */ "./src/streaming/protection/errors/ProtectionErrors.js");
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
 * Initial implementation of EME
 *
 * Implemented by Google Chrome prior to v36
 *
 * @implements ProtectionModel
 * @class
 */








function ProtectionModel_01b(config) {
  config = config || {};
  var context = this.context;
  var eventBus = config.eventBus; //Need to pass in here so we can use same instance since this is optional module

  var events = config.events;
  var debug = config.debug;
  var api = config.api;
  var errHandler = config.errHandler;
  var instance, logger, videoElement, keySystem, protectionKeyController, // With this version of the EME APIs, sessionIds are not assigned to
  // sessions until the first key message is received.  We are assuming
  // that in the case of multiple sessions, key messages will be received
  // in the order that generateKeyRequest() is called.
  // Holding spot for newly-created sessions until we determine whether or
  // not the CDM supports sessionIds
  pendingSessions, // List of sessions that have been initialized.  Only the first position will
  // be used in the case that the CDM does not support sessionIds
  sessions, // Not all CDMs support the notion of sessionIds.  Without sessionIds
  // there is no way for us to differentiate between sessions, therefore
  // we must only allow a single session.  Once we receive the first key
  // message we can set this flag to determine if more sessions are allowed
  moreSessionsAllowed, // This is our main event handler for all desired HTMLMediaElement events
  // related to EME.  These events are translated into our API-independent
  // versions of the same events
  eventHandler;

  function setup() {
    logger = debug.getLogger(instance);
    videoElement = null;
    keySystem = null;
    pendingSessions = [];
    sessions = [];
    protectionKeyController = (0,_controllers_ProtectionKeyController__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance();
    eventHandler = createEventHandler();
  }

  function reset() {
    if (videoElement) {
      removeEventListeners();
    }

    for (var i = 0; i < sessions.length; i++) {
      closeKeySession(sessions[i]);
    }

    eventBus.trigger(events.TEARDOWN_COMPLETE);
  }

  function getAllInitData() {
    var retVal = [];

    for (var i = 0; i < pendingSessions.length; i++) {
      retVal.push(pendingSessions[i].initData);
    }

    for (var _i = 0; _i < sessions.length; _i++) {
      retVal.push(sessions[_i].initData);
    }

    return retVal;
  }

  function getSessions() {
    return sessions.concat(pendingSessions);
  }

  function requestKeySystemAccess(ksConfigurations) {
    return new Promise(function (resolve, reject) {
      var ve = videoElement;

      if (!ve) {
        // Must have a video element to do this capability tests
        ve = document.createElement('video');
      } // Try key systems in order, first one with supported key system configuration
      // is used


      var found = false;

      for (var ksIdx = 0; ksIdx < ksConfigurations.length; ksIdx++) {
        var systemString = ksConfigurations[ksIdx].ks.systemString;
        var configs = ksConfigurations[ksIdx].configs;
        var supportedAudio = null;
        var supportedVideo = null; // Try key system configs in order, first one with supported audio/video
        // is used

        for (var configIdx = 0; configIdx < configs.length; configIdx++) {
          //let audios = configs[configIdx].audioCapabilities;
          var videos = configs[configIdx].videoCapabilities; // Look for supported video container/codecs

          if (videos && videos.length !== 0) {
            supportedVideo = []; // Indicates that we have a requested video config

            for (var videoIdx = 0; videoIdx < videos.length; videoIdx++) {
              if (ve.canPlayType(videos[videoIdx].contentType, systemString) !== '') {
                supportedVideo.push(videos[videoIdx]);
              }
            }
          } // No supported audio or video in this configuration OR we have
          // requested audio or video configuration that is not supported


          if (!supportedAudio && !supportedVideo || supportedAudio && supportedAudio.length === 0 || supportedVideo && supportedVideo.length === 0) {
            continue;
          } // This configuration is supported


          found = true;
          var ksConfig = new _vo_KeySystemConfiguration__WEBPACK_IMPORTED_MODULE_4__["default"](supportedAudio, supportedVideo);
          var ks = protectionKeyController.getKeySystemBySystemString(systemString);
          var keySystemAccess = new _vo_KeySystemAccess__WEBPACK_IMPORTED_MODULE_5__["default"](ks, ksConfig);
          eventBus.trigger(events.KEY_SYSTEM_ACCESS_COMPLETE, {
            data: keySystemAccess
          });
          resolve({
            data: keySystemAccess
          });
          break;
        }
      }

      if (!found) {
        var errorMessage = 'Key system access denied! -- No valid audio/video content configurations detected!';
        eventBus.trigger(events.KEY_SYSTEM_ACCESS_COMPLETE, {
          error: errorMessage
        });
        reject({
          error: errorMessage
        });
      }
    });
  }

  function selectKeySystem(keySystemAccess) {
    keySystem = keySystemAccess.keySystem;
    return Promise.resolve(keySystem);
  }

  function setMediaElement(mediaElement) {
    if (videoElement === mediaElement) {
      return;
    } // Replacing the previous element


    if (videoElement) {
      removeEventListeners(); // Close any open sessions - avoids memory leak on LG webOS 2016/2017 TVs

      for (var i = 0; i < sessions.length; i++) {
        closeKeySession(sessions[i]);
      }

      sessions = [];
    }

    videoElement = mediaElement; // Only if we are not detaching from the existing element

    if (videoElement) {
      videoElement.addEventListener(api.keyerror, eventHandler);
      videoElement.addEventListener(api.needkey, eventHandler);
      videoElement.addEventListener(api.keymessage, eventHandler);
      videoElement.addEventListener(api.keyadded, eventHandler);
      eventBus.trigger(events.VIDEO_ELEMENT_SELECTED);
    }
  }

  function createKeySession(ksInfo) {
    if (!keySystem) {
      throw new Error('Can not create sessions until you have selected a key system');
    } // Determine if creating a new session is allowed


    if (moreSessionsAllowed || sessions.length === 0) {
      var newSession = {
        // Implements SessionToken
        sessionId: null,
        keyId: ksInfo.keyId,
        initData: ksInfo.initData,
        getKeyId: function getKeyId() {
          return this.keyId;
        },
        getSessionId: function getSessionId() {
          return this.sessionId;
        },
        getExpirationTime: function getExpirationTime() {
          return NaN;
        },
        getSessionType: function getSessionType() {
          return 'temporary';
        }
      };
      pendingSessions.push(newSession); // Send our request to the CDM

      videoElement[api.generateKeyRequest](keySystem.systemString, new Uint8Array(ksInfo.initData));
      return newSession;
    } else {
      throw new Error('Multiple sessions not allowed!');
    }
  }

  function updateKeySession(sessionToken, message) {
    var sessionId = sessionToken.sessionId;

    if (!protectionKeyController.isClearKey(keySystem)) {
      // Send our request to the CDM
      videoElement[api.addKey](keySystem.systemString, new Uint8Array(message), new Uint8Array(sessionToken.initData), sessionId);
    } else {
      // For clearkey, message is a ClearKeyKeySet
      for (var i = 0; i < message.keyPairs.length; i++) {
        videoElement[api.addKey](keySystem.systemString, message.keyPairs[i].key, message.keyPairs[i].keyID, sessionId);
      }
    }

    eventBus.trigger(events.KEY_SESSION_UPDATED);
  }

  function closeKeySession(sessionToken) {
    // Send our request to the CDM
    try {
      videoElement[api.cancelKeyRequest](keySystem.systemString, sessionToken.sessionId);
    } catch (error) {
      eventBus.trigger(events.KEY_SESSION_CLOSED, {
        data: null,
        error: 'Error closing session (' + sessionToken.sessionId + ') ' + error.message
      });
    }
  }

  function setServerCertificate() {
    /* Not supported */
  }

  function loadKeySession() {
    /* Not supported */
  }

  function removeKeySession() {
    /* Not supported */
  }

  function createEventHandler() {
    return {
      handleEvent: function handleEvent(event) {
        var sessionToken = null;

        switch (event.type) {
          case api.needkey:
            var initData = ArrayBuffer.isView(event.initData) ? event.initData.buffer : event.initData;
            eventBus.trigger(events.NEED_KEY, {
              key: new _vo_NeedKey__WEBPACK_IMPORTED_MODULE_1__["default"](initData, 'cenc')
            });
            break;

          case api.keyerror:
            sessionToken = findSessionByID(sessions, event.sessionId);

            if (!sessionToken) {
              sessionToken = findSessionByID(pendingSessions, event.sessionId);
            }

            if (sessionToken) {
              var code = _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_CODE;
              var msg = '';

              switch (event.errorCode.code) {
                case 1:
                  code = _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_UNKNOWN_CODE;
                  msg += 'MEDIA_KEYERR_UNKNOWN - ' + _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_UNKNOWN_MESSAGE;
                  break;

                case 2:
                  code = _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_CLIENT_CODE;
                  msg += 'MEDIA_KEYERR_CLIENT - ' + _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_CLIENT_MESSAGE;
                  break;

                case 3:
                  code = _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_SERVICE_CODE;
                  msg += 'MEDIA_KEYERR_SERVICE - ' + _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_SERVICE_MESSAGE;
                  break;

                case 4:
                  code = _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_OUTPUT_CODE;
                  msg += 'MEDIA_KEYERR_OUTPUT - ' + _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_OUTPUT_MESSAGE;
                  break;

                case 5:
                  code = _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_HARDWARECHANGE_CODE;
                  msg += 'MEDIA_KEYERR_HARDWARECHANGE - ' + _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_HARDWARECHANGE_MESSAGE;
                  break;

                case 6:
                  code = _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_DOMAIN_CODE;
                  msg += 'MEDIA_KEYERR_DOMAIN - ' + _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_DOMAIN_MESSAGE;
                  break;
              }

              msg += '  System Code = ' + event.systemCode; // TODO: Build error string based on key error

              eventBus.trigger(events.KEY_ERROR, {
                error: new _vo_DashJSError__WEBPACK_IMPORTED_MODULE_2__["default"](code, msg, sessionToken)
              });
            } else {
              logger.error('No session token found for key error');
            }

            break;

          case api.keyadded:
            sessionToken = findSessionByID(sessions, event.sessionId);

            if (!sessionToken) {
              sessionToken = findSessionByID(pendingSessions, event.sessionId);
            }

            if (sessionToken) {
              logger.debug('DRM: Key added.');
              eventBus.trigger(events.KEY_ADDED, {
                data: sessionToken
              }); //TODO not sure anything is using sessionToken? why there?
            } else {
              logger.debug('No session token found for key added');
            }

            break;

          case api.keymessage:
            // If this CDM does not support session IDs, we will be limited
            // to a single session
            moreSessionsAllowed = event.sessionId !== null && event.sessionId !== undefined; // SessionIDs supported

            if (moreSessionsAllowed) {
              // Attempt to find an uninitialized token with this sessionId
              sessionToken = findSessionByID(sessions, event.sessionId);

              if (!sessionToken && pendingSessions.length > 0) {
                // This is the first message for our latest session, so set the
                // sessionId and add it to our list
                sessionToken = pendingSessions.shift();
                sessions.push(sessionToken);
                sessionToken.sessionId = event.sessionId;
                eventBus.trigger(events.KEY_SESSION_CREATED, {
                  data: sessionToken
                });
              }
            } else if (pendingSessions.length > 0) {
              // SessionIDs not supported
              sessionToken = pendingSessions.shift();
              sessions.push(sessionToken);

              if (pendingSessions.length !== 0) {
                errHandler.error(new _vo_DashJSError__WEBPACK_IMPORTED_MODULE_2__["default"](_errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEY_MESSAGE_ERROR_CODE, _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEY_MESSAGE_ERROR_MESSAGE));
              }
            }

            if (sessionToken) {
              var message = ArrayBuffer.isView(event.message) ? event.message.buffer : event.message; // For ClearKey, the spec mandates that you pass this message to the
              // addKey method, so we always save it to the token since there is no
              // way to tell which key system is in use

              sessionToken.keyMessage = message;
              eventBus.trigger(events.INTERNAL_KEY_MESSAGE, {
                data: new _vo_KeyMessage__WEBPACK_IMPORTED_MODULE_3__["default"](sessionToken, message, event.defaultURL)
              });
            } else {
              logger.warn('No session token found for key message');
            }

            break;
        }
      }
    };
  }
  /**
   * Helper function to retrieve the stored session token based on a given
   * sessionId value
   *
   * @param {Array} sessionArray - the array of sessions to search
   * @param {*} sessionId - the sessionId to search for
   * @returns {*} the session token with the given sessionId
   */


  function findSessionByID(sessionArray, sessionId) {
    if (!sessionId || !sessionArray) {
      return null;
    } else {
      var len = sessionArray.length;

      for (var i = 0; i < len; i++) {
        if (sessionArray[i].sessionId == sessionId) {
          return sessionArray[i];
        }
      }

      return null;
    }
  }

  function removeEventListeners() {
    videoElement.removeEventListener(api.keyerror, eventHandler);
    videoElement.removeEventListener(api.needkey, eventHandler);
    videoElement.removeEventListener(api.keymessage, eventHandler);
    videoElement.removeEventListener(api.keyadded, eventHandler);
  }

  instance = {
    getAllInitData: getAllInitData,
    getSessions: getSessions,
    requestKeySystemAccess: requestKeySystemAccess,
    selectKeySystem: selectKeySystem,
    setMediaElement: setMediaElement,
    createKeySession: createKeySession,
    updateKeySession: updateKeySession,
    closeKeySession: closeKeySession,
    setServerCertificate: setServerCertificate,
    loadKeySession: loadKeySession,
    removeKeySession: removeKeySession,
    stop: reset,
    reset: reset
  };
  setup();
  return instance;
}

ProtectionModel_01b.__dashjs_factory_name = 'ProtectionModel_01b';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getClassFactory(ProtectionModel_01b));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/protection/models/ProtectionModel_21Jan2015.js":
/*!**********************************************************************!*\
  !*** ./src/streaming/protection/models/ProtectionModel_21Jan2015.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_ProtectionKeyController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/ProtectionKeyController */ "./src/streaming/protection/controllers/ProtectionKeyController.js");
/* harmony import */ var _vo_NeedKey__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/NeedKey */ "./src/streaming/protection/vo/NeedKey.js");
/* harmony import */ var _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../errors/ProtectionErrors */ "./src/streaming/protection/errors/ProtectionErrors.js");
/* harmony import */ var _vo_DashJSError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../vo/DashJSError */ "./src/streaming/vo/DashJSError.js");
/* harmony import */ var _vo_KeyMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../vo/KeyMessage */ "./src/streaming/protection/vo/KeyMessage.js");
/* harmony import */ var _vo_KeySystemAccess__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../vo/KeySystemAccess */ "./src/streaming/protection/vo/KeySystemAccess.js");
/* harmony import */ var _constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../constants/ProtectionConstants */ "./src/streaming/constants/ProtectionConstants.js");
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
 * Most recent EME implementation
 *
 * Implemented by Google Chrome v36+ (Windows, OSX, Linux)
 *
 * @implements ProtectionModel
 * @class
 */







var SYSTEM_STRING_PRIORITY = {};
SYSTEM_STRING_PRIORITY[_constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_6__["default"].PLAYREADY_KEYSTEM_STRING] = [_constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_6__["default"].PLAYREADY_KEYSTEM_STRING, _constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_6__["default"].PLAYREADY_RECOMMENDATION_KEYSTEM_STRING];
SYSTEM_STRING_PRIORITY[_constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_6__["default"].WIDEVINE_KEYSTEM_STRING] = [_constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_6__["default"].WIDEVINE_KEYSTEM_STRING];
SYSTEM_STRING_PRIORITY[_constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_6__["default"].CLEARKEY_KEYSTEM_STRING] = [_constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_6__["default"].CLEARKEY_KEYSTEM_STRING];

function ProtectionModel_21Jan2015(config) {
  config = config || {};
  var context = this.context;
  var eventBus = config.eventBus; //Need to pass in here so we can use same instance since this is optional module

  var events = config.events;
  var debug = config.debug;
  var instance, logger, keySystem, videoElement, mediaKeys, sessions, eventHandler, protectionKeyController;

  function setup() {
    logger = debug.getLogger(instance);
    keySystem = null;
    videoElement = null;
    mediaKeys = null;
    sessions = [];
    protectionKeyController = (0,_controllers_ProtectionKeyController__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance();
    eventHandler = createEventHandler();
  }

  function reset() {
    var numSessions = sessions.length;
    var session;

    if (numSessions !== 0) {
      (function () {
        // Called when we are done closing a session.  Success or fail
        var done = function done(session) {
          removeSession(session);

          if (sessions.length === 0) {
            if (videoElement) {
              videoElement.removeEventListener('encrypted', eventHandler);
              videoElement.setMediaKeys(null).then(function () {
                eventBus.trigger(events.TEARDOWN_COMPLETE);
              });
            } else {
              eventBus.trigger(events.TEARDOWN_COMPLETE);
            }
          }
        };

        for (var i = 0; i < numSessions; i++) {
          session = sessions[i];

          (function (s) {
            _closeKeySessionInternal(session);

            done(s);
          })(session);
        }
      })();
    } else {
      eventBus.trigger(events.TEARDOWN_COMPLETE);
    }
  }

  function stop() {
    // Close and remove not usable sessions
    var session;

    for (var i = 0; i < sessions.length; i++) {
      session = sessions[i];

      if (!session.getUsable()) {
        _closeKeySessionInternal(session);

        removeSession(session);
      }
    }
  }

  function getAllInitData() {
    var retVal = [];

    for (var i = 0; i < sessions.length; i++) {
      if (sessions[i].initData) {
        retVal.push(sessions[i].initData);
      }
    }

    return retVal;
  }

  function getSessions() {
    return sessions;
  }

  function requestKeySystemAccess(ksConfigurations) {
    return new Promise(function (resolve, reject) {
      _requestKeySystemAccessInternal(ksConfigurations, 0, resolve, reject);
    });
  }
  /**
   * Initializes access to a key system. Once we found a valid configuration we get a mediaKeySystemAccess object
   * @param ksConfigurations
   * @param idx
   * @param resolve
   * @param reject
   * @private
   */


  function _requestKeySystemAccessInternal(ksConfigurations, idx, resolve, reject) {
    // In case requestMediaKeySystemAccess is not available we can not proceed and dispatch an error
    if (navigator.requestMediaKeySystemAccess === undefined || typeof navigator.requestMediaKeySystemAccess !== 'function') {
      var msg = 'Insecure origins are not allowed';
      eventBus.trigger(events.KEY_SYSTEM_ACCESS_COMPLETE, {
        error: msg
      });
      reject({
        error: msg
      });
      return;
    } // If a systemStringPriority is defined by the application we use these values. Otherwise we use the default system string
    // This is useful for DRM systems such as Playready for which multiple system strings are possible for instance com.microsoft.playready and com.microsoft.playready.recommendation


    var protDataSystemStringPriority = ksConfigurations[idx].protData && ksConfigurations[idx].protData.systemStringPriority ? ksConfigurations[idx].protData.systemStringPriority : null;
    var configs = ksConfigurations[idx].configs;
    var currentKeySystem = ksConfigurations[idx].ks;
    var systemString = currentKeySystem.systemString; // Use the default values in case no values are provided by the application

    var systemStringsToApply = protDataSystemStringPriority ? protDataSystemStringPriority : SYSTEM_STRING_PRIORITY[systemString] ? SYSTEM_STRING_PRIORITY[systemString] : [systemString]; // Check all the available system strings and the available configurations for support

    _checkAccessForKeySystem(systemStringsToApply, configs).then(function (mediaKeySystemAccess) {
      var configuration = typeof mediaKeySystemAccess.getConfiguration === 'function' ? mediaKeySystemAccess.getConfiguration() : null;
      var keySystemAccess = new _vo_KeySystemAccess__WEBPACK_IMPORTED_MODULE_5__["default"](currentKeySystem, configuration);
      keySystemAccess.mksa = mediaKeySystemAccess;
      eventBus.trigger(events.KEY_SYSTEM_ACCESS_COMPLETE, {
        data: keySystemAccess
      });
      resolve({
        data: keySystemAccess
      });
    })["catch"](function (e) {
      if (idx + 1 < ksConfigurations.length) {
        _requestKeySystemAccessInternal(ksConfigurations, idx + 1, resolve, reject);
      } else {
        var errorMessage = 'Key system access denied! ';
        eventBus.trigger(events.KEY_SYSTEM_ACCESS_COMPLETE, {
          error: errorMessage + e.message
        });
        reject({
          error: errorMessage + e.message
        });
      }
    });
  }
  /**
   * For a specific key system: Iterate over the possible system strings and resolve once a valid configuration was found
   * @param {array} systemStringsToApply
   * @param {object} configs
   * @return {Promise}
   * @private
   */


  function _checkAccessForKeySystem(systemStringsToApply, configs) {
    return new Promise(function (resolve, reject) {
      _checkAccessForSystemStrings(systemStringsToApply, configs, 0, resolve, reject);
    });
  }
  /**
   * Recursively iterate over the possible system strings until a supported configuration is found or we ran out of options
   * @param {array} systemStringsToApply
   * @param {object} configs
   * @param {number} idx
   * @param {function} resolve
   * @param {function} reject
   * @private
   */


  function _checkAccessForSystemStrings(systemStringsToApply, configs, idx, resolve, reject) {
    var systemString = systemStringsToApply[idx];
    logger.debug("Requesting key system access for system string ".concat(systemString));
    navigator.requestMediaKeySystemAccess(systemString, configs).then(function (mediaKeySystemAccess) {
      mediaKeySystemAccess.selectedSystemString = systemString;
      resolve(mediaKeySystemAccess);
    })["catch"](function (e) {
      if (idx + 1 < systemStringsToApply.length) {
        _checkAccessForSystemStrings(systemStringsToApply, configs, idx + 1, resolve, reject);
      } else {
        reject(e);
      }
    });
  }
  /**
   * Selects a key system by creating the mediaKeys and adding them to the video element
   * @param keySystemAccess
   * @return {Promise<unknown>}
   */


  function selectKeySystem(keySystemAccess) {
    return new Promise(function (resolve, reject) {
      keySystemAccess.mksa.createMediaKeys().then(function (mkeys) {
        keySystem = keySystemAccess.keySystem;
        mediaKeys = mkeys;

        if (videoElement) {
          return videoElement.setMediaKeys(mediaKeys);
        } else {
          return Promise.resolve();
        }
      }).then(function () {
        resolve(keySystem);
      })["catch"](function () {
        reject({
          error: 'Error selecting keys system (' + keySystemAccess.keySystem.systemString + ')! Could not create MediaKeys -- TODO'
        });
      });
    });
  }

  function setMediaElement(mediaElement) {
    if (videoElement === mediaElement) return; // Replacing the previous element

    if (videoElement) {
      videoElement.removeEventListener('encrypted', eventHandler);

      if (videoElement.setMediaKeys) {
        videoElement.setMediaKeys(null);
      }
    }

    videoElement = mediaElement; // Only if we are not detaching from the existing element

    if (videoElement) {
      videoElement.addEventListener('encrypted', eventHandler);

      if (videoElement.setMediaKeys && mediaKeys) {
        videoElement.setMediaKeys(mediaKeys);
      }
    }
  }

  function setServerCertificate(serverCertificate) {
    if (!keySystem || !mediaKeys) {
      throw new Error('Can not set server certificate until you have selected a key system');
    }

    mediaKeys.setServerCertificate(serverCertificate).then(function () {
      logger.info('DRM: License server certificate successfully updated.');
      eventBus.trigger(events.SERVER_CERTIFICATE_UPDATED);
    })["catch"](function (error) {
      eventBus.trigger(events.SERVER_CERTIFICATE_UPDATED, {
        error: new _vo_DashJSError__WEBPACK_IMPORTED_MODULE_3__["default"](_errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_2__["default"].SERVER_CERTIFICATE_UPDATED_ERROR_CODE, _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_2__["default"].SERVER_CERTIFICATE_UPDATED_ERROR_MESSAGE + error.name)
      });
    });
  }
  /**
   * Create a key session, a session token and initialize a request by calling generateRequest
   * @param ksInfo
   */


  function createKeySession(ksInfo) {
    if (!keySystem || !mediaKeys) {
      throw new Error('Can not create sessions until you have selected a key system');
    }

    var session = mediaKeys.createSession(ksInfo.sessionType);
    var sessionToken = createSessionToken(session, ksInfo); // The "keyids" type is used for Clearkey when keys are provided directly in the protection data and a request to a license server is not needed

    var dataType = keySystem.systemString === _constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_6__["default"].CLEARKEY_KEYSTEM_STRING && (ksInfo.initData || ksInfo.protData && ksInfo.protData.clearkeys) ? _constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_6__["default"].INITIALIZATION_DATA_TYPE_KEYIDS : _constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_6__["default"].INITIALIZATION_DATA_TYPE_CENC;
    session.generateRequest(dataType, ksInfo.initData).then(function () {
      logger.debug('DRM: Session created.  SessionID = ' + sessionToken.getSessionId());
      eventBus.trigger(events.KEY_SESSION_CREATED, {
        data: sessionToken
      });
    })["catch"](function (error) {
      removeSession(sessionToken);
      eventBus.trigger(events.KEY_SESSION_CREATED, {
        data: null,
        error: new _vo_DashJSError__WEBPACK_IMPORTED_MODULE_3__["default"](_errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_2__["default"].KEY_SESSION_CREATED_ERROR_CODE, _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_2__["default"].KEY_SESSION_CREATED_ERROR_MESSAGE + 'Error generating key request -- ' + error.name)
      });
    });
  }

  function updateKeySession(sessionToken, message) {
    var session = sessionToken.session; // Send our request to the key session

    if (protectionKeyController.isClearKey(keySystem)) {
      message = message.toJWK();
    }

    session.update(message).then(function () {
      eventBus.trigger(events.KEY_SESSION_UPDATED);
    })["catch"](function (error) {
      eventBus.trigger(events.KEY_ERROR, {
        error: new _vo_DashJSError__WEBPACK_IMPORTED_MODULE_3__["default"](_errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_2__["default"].MEDIA_KEYERR_CODE, 'Error sending update() message! ' + error.name, sessionToken)
      });
    });
  }

  function loadKeySession(ksInfo) {
    if (!keySystem || !mediaKeys) {
      throw new Error('Can not load sessions until you have selected a key system');
    }

    var sessionId = ksInfo.sessionId; // Check if session Id is not already loaded or loading

    for (var i = 0; i < sessions.length; i++) {
      if (sessionId === sessions[i].sessionId) {
        logger.warn('DRM: Ignoring session ID because we have already seen it!');
        return;
      }
    }

    var session = mediaKeys.createSession(ksInfo.sessionType);
    var sessionToken = createSessionToken(session, ksInfo); // Load persisted session data into our newly created session object

    session.load(sessionId).then(function (success) {
      if (success) {
        logger.debug('DRM: Session loaded.  SessionID = ' + sessionToken.getSessionId());
        eventBus.trigger(events.KEY_SESSION_CREATED, {
          data: sessionToken
        });
      } else {
        removeSession(sessionToken);
        eventBus.trigger(events.KEY_SESSION_CREATED, {
          data: null,
          error: new _vo_DashJSError__WEBPACK_IMPORTED_MODULE_3__["default"](_errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_2__["default"].KEY_SESSION_CREATED_ERROR_CODE, _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_2__["default"].KEY_SESSION_CREATED_ERROR_MESSAGE + 'Could not load session! Invalid Session ID (' + sessionId + ')')
        });
      }
    })["catch"](function (error) {
      removeSession(sessionToken);
      eventBus.trigger(events.KEY_SESSION_CREATED, {
        data: null,
        error: new _vo_DashJSError__WEBPACK_IMPORTED_MODULE_3__["default"](_errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_2__["default"].KEY_SESSION_CREATED_ERROR_CODE, _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_2__["default"].KEY_SESSION_CREATED_ERROR_MESSAGE + 'Could not load session (' + sessionId + ')! ' + error.name)
      });
    });
  }

  function removeKeySession(sessionToken) {
    var session = sessionToken.session;
    session.remove().then(function () {
      logger.debug('DRM: Session removed.  SessionID = ' + sessionToken.getSessionId());
      eventBus.trigger(events.KEY_SESSION_REMOVED, {
        data: sessionToken.getSessionId()
      });
    }, function (error) {
      eventBus.trigger(events.KEY_SESSION_REMOVED, {
        data: null,
        error: 'Error removing session (' + sessionToken.getSessionId() + '). ' + error.name
      });
    });
  }

  function closeKeySession(sessionToken) {
    // Send our request to the key session
    _closeKeySessionInternal(sessionToken)["catch"](function (error) {
      removeSession(sessionToken);
      eventBus.trigger(events.KEY_SESSION_CLOSED, {
        data: null,
        error: 'Error closing session (' + sessionToken.getSessionId() + ') ' + error.name
      });
    });
  }

  function _closeKeySessionInternal(sessionToken) {
    if (!sessionToken || !sessionToken.session) {
      return Promise.resolve;
    }

    var session = sessionToken.session; // Remove event listeners

    session.removeEventListener('keystatuseschange', sessionToken);
    session.removeEventListener('message', sessionToken); // Send our request to the key session

    return session.close();
  } // This is our main event handler for all desired HTMLMediaElement events
  // related to EME.  These events are translated into our API-independent
  // versions of the same events


  function createEventHandler() {
    return {
      handleEvent: function handleEvent(event) {
        switch (event.type) {
          case 'encrypted':
            if (event.initData) {
              var initData = ArrayBuffer.isView(event.initData) ? event.initData.buffer : event.initData;
              eventBus.trigger(events.NEED_KEY, {
                key: new _vo_NeedKey__WEBPACK_IMPORTED_MODULE_1__["default"](initData, event.initDataType)
              });
            }

            break;
        }
      }
    };
  }

  function removeSession(token) {
    // Remove from our session list
    for (var i = 0; i < sessions.length; i++) {
      if (sessions[i] === token) {
        sessions.splice(i, 1);
        break;
      }
    }
  }

  function parseKeyStatus(args) {
    // Edge and Chrome implement different version of keystatues, param are not on same order
    var status, keyId;

    if (args && args.length > 0) {
      if (args[0]) {
        if (typeof args[0] === 'string') {
          status = args[0];
        } else {
          keyId = args[0];
        }
      }

      if (args[1]) {
        if (typeof args[1] === 'string') {
          status = args[1];
        } else {
          keyId = args[1];
        }
      }
    }

    return {
      status: status,
      keyId: keyId
    };
  } // Function to create our session token objects which manage the EME
  // MediaKeySession and session-specific event handler


  function createSessionToken(session, ksInfo) {
    var token = {
      // Implements SessionToken
      session: session,
      keyId: ksInfo.keyId,
      initData: ksInfo.initData,
      sessionId: ksInfo.sessionId,
      sessionType: ksInfo.sessionType,
      // This is our main event handler for all desired MediaKeySession events
      // These events are translated into our API-independent versions of the
      // same events
      handleEvent: function handleEvent(event) {
        switch (event.type) {
          case 'keystatuseschange':
            eventBus.trigger(events.KEY_STATUSES_CHANGED, {
              data: this
            });
            event.target.keyStatuses.forEach(function () {
              var keyStatus = parseKeyStatus(arguments);

              switch (keyStatus.status) {
                case 'expired':
                  eventBus.trigger(events.INTERNAL_KEY_STATUS_CHANGED, {
                    error: new _vo_DashJSError__WEBPACK_IMPORTED_MODULE_3__["default"](_errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_2__["default"].KEY_STATUS_CHANGED_EXPIRED_ERROR_CODE, _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_2__["default"].KEY_STATUS_CHANGED_EXPIRED_ERROR_MESSAGE)
                  });
                  break;

                default:
                  eventBus.trigger(events.INTERNAL_KEY_STATUS_CHANGED, keyStatus);
                  break;
              }
            });
            break;

          case 'message':
            var message = ArrayBuffer.isView(event.message) ? event.message.buffer : event.message;
            eventBus.trigger(events.INTERNAL_KEY_MESSAGE, {
              data: new _vo_KeyMessage__WEBPACK_IMPORTED_MODULE_4__["default"](this, message, undefined, event.messageType)
            });
            break;
        }
      },
      getKeyId: function getKeyId() {
        return this.keyId;
      },
      getSessionId: function getSessionId() {
        return session.sessionId;
      },
      getSessionType: function getSessionType() {
        return this.sessionType;
      },
      getExpirationTime: function getExpirationTime() {
        return session.expiration;
      },
      getKeyStatuses: function getKeyStatuses() {
        return session.keyStatuses;
      },
      getUsable: function getUsable() {
        var usable = false;
        session.keyStatuses.forEach(function () {
          var keyStatus = parseKeyStatus(arguments);

          if (keyStatus.status === 'usable') {
            usable = true;
          }
        });
        return usable;
      }
    }; // Add all event listeners

    session.addEventListener('keystatuseschange', token);
    session.addEventListener('message', token); // Register callback for session closed Promise

    session.closed.then(function () {
      removeSession(token);
      logger.debug('DRM: Session closed.  SessionID = ' + token.getSessionId());
      eventBus.trigger(events.KEY_SESSION_CLOSED, {
        data: token.getSessionId()
      });
    }); // Add to our session list

    sessions.push(token);
    return token;
  }

  instance = {
    getAllInitData: getAllInitData,
    getSessions: getSessions,
    requestKeySystemAccess: requestKeySystemAccess,
    selectKeySystem: selectKeySystem,
    setMediaElement: setMediaElement,
    setServerCertificate: setServerCertificate,
    createKeySession: createKeySession,
    updateKeySession: updateKeySession,
    loadKeySession: loadKeySession,
    removeKeySession: removeKeySession,
    closeKeySession: closeKeySession,
    stop: stop,
    reset: reset
  };
  setup();
  return instance;
}

ProtectionModel_21Jan2015.__dashjs_factory_name = 'ProtectionModel_21Jan2015';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getClassFactory(ProtectionModel_21Jan2015));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/protection/models/ProtectionModel_3Feb2014.js":
/*!*********************************************************************!*\
  !*** ./src/streaming/protection/models/ProtectionModel_3Feb2014.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_ProtectionKeyController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/ProtectionKeyController */ "./src/streaming/protection/controllers/ProtectionKeyController.js");
/* harmony import */ var _vo_NeedKey__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/NeedKey */ "./src/streaming/protection/vo/NeedKey.js");
/* harmony import */ var _vo_DashJSError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../vo/DashJSError */ "./src/streaming/vo/DashJSError.js");
/* harmony import */ var _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../errors/ProtectionErrors */ "./src/streaming/protection/errors/ProtectionErrors.js");
/* harmony import */ var _vo_KeyMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../vo/KeyMessage */ "./src/streaming/protection/vo/KeyMessage.js");
/* harmony import */ var _vo_KeySystemConfiguration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../vo/KeySystemConfiguration */ "./src/streaming/protection/vo/KeySystemConfiguration.js");
/* harmony import */ var _vo_KeySystemAccess__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../vo/KeySystemAccess */ "./src/streaming/protection/vo/KeySystemAccess.js");
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
 * Implementation of the EME APIs as of the 3 Feb 2014 state of the specification.
 *
 * Implemented by Internet Explorer 11 (Windows 8.1)
 *
 * @implements ProtectionModel
 * @class
 */








function ProtectionModel_3Feb2014(config) {
  config = config || {};
  var context = this.context;
  var eventBus = config.eventBus; //Need to pass in here so we can use same instance since this is optional module

  var events = config.events;
  var debug = config.debug;
  var api = config.api;
  var instance, logger, videoElement, keySystem, mediaKeys, keySystemAccess, sessions, eventHandler, protectionKeyController;

  function setup() {
    logger = debug.getLogger(instance);
    videoElement = null;
    keySystem = null;
    mediaKeys = null;
    keySystemAccess = null;
    sessions = [];
    protectionKeyController = (0,_controllers_ProtectionKeyController__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance();
    eventHandler = createEventHandler();
  }

  function reset() {
    try {
      for (var i = 0; i < sessions.length; i++) {
        closeKeySession(sessions[i]);
      }

      if (videoElement) {
        videoElement.removeEventListener(api.needkey, eventHandler);
      }

      eventBus.trigger(events.TEARDOWN_COMPLETE);
    } catch (error) {
      eventBus.trigger(events.TEARDOWN_COMPLETE, {
        error: 'Error tearing down key sessions and MediaKeys! -- ' + error.message
      });
    }
  }

  function getAllInitData() {
    var retVal = [];

    for (var i = 0; i < sessions.length; i++) {
      retVal.push(sessions[i].initData);
    }

    return retVal;
  }

  function getSessions() {
    return sessions;
  }

  function requestKeySystemAccess(ksConfigurations) {
    return new Promise(function (resolve, reject) {
      // Try key systems in order, first one with supported key system configuration
      // is used
      var found = false;

      for (var ksIdx = 0; ksIdx < ksConfigurations.length; ksIdx++) {
        var systemString = ksConfigurations[ksIdx].ks.systemString;
        var configs = ksConfigurations[ksIdx].configs;
        var supportedAudio = null;
        var supportedVideo = null; // Try key system configs in order, first one with supported audio/video
        // is used

        for (var configIdx = 0; configIdx < configs.length; configIdx++) {
          var audios = configs[configIdx].audioCapabilities;
          var videos = configs[configIdx].videoCapabilities; // Look for supported audio container/codecs

          if (audios && audios.length !== 0) {
            supportedAudio = []; // Indicates that we have a requested audio config

            for (var audioIdx = 0; audioIdx < audios.length; audioIdx++) {
              if (window[api.MediaKeys].isTypeSupported(systemString, audios[audioIdx].contentType)) {
                supportedAudio.push(audios[audioIdx]);
              }
            }
          } // Look for supported video container/codecs


          if (videos && videos.length !== 0) {
            supportedVideo = []; // Indicates that we have a requested video config

            for (var videoIdx = 0; videoIdx < videos.length; videoIdx++) {
              if (window[api.MediaKeys].isTypeSupported(systemString, videos[videoIdx].contentType)) {
                supportedVideo.push(videos[videoIdx]);
              }
            }
          } // No supported audio or video in this configuration OR we have
          // requested audio or video configuration that is not supported


          if (!supportedAudio && !supportedVideo || supportedAudio && supportedAudio.length === 0 || supportedVideo && supportedVideo.length === 0) {
            continue;
          } // This configuration is supported


          found = true;
          var ksConfig = new _vo_KeySystemConfiguration__WEBPACK_IMPORTED_MODULE_5__["default"](supportedAudio, supportedVideo);
          var ks = protectionKeyController.getKeySystemBySystemString(systemString);

          var _keySystemAccess = new _vo_KeySystemAccess__WEBPACK_IMPORTED_MODULE_6__["default"](ks, ksConfig);

          eventBus.trigger(events.KEY_SYSTEM_ACCESS_COMPLETE, {
            data: _keySystemAccess
          });
          resolve({
            data: _keySystemAccess
          });
          break;
        }
      }

      if (!found) {
        var errorMessage = 'Key system access denied! -- No valid audio/video content configurations detected!';
        eventBus.trigger(events.KEY_SYSTEM_ACCESS_COMPLETE, {
          error: errorMessage
        });
        reject({
          error: errorMessage
        });
      }
    });
  }

  function selectKeySystem(ksAccess) {
    return new Promise(function (resolve, reject) {
      try {
        mediaKeys = ksAccess.mediaKeys = new window[api.MediaKeys](ksAccess.keySystem.systemString);
        keySystem = ksAccess.keySystem;
        keySystemAccess = ksAccess;

        if (videoElement) {
          setMediaKeys();
        }

        resolve(keySystem);
      } catch (error) {
        reject({
          error: 'Error selecting keys system (' + keySystem.systemString + ')! Could not create MediaKeys -- TODO'
        });
      }
    });
  }

  function setMediaElement(mediaElement) {
    if (videoElement === mediaElement) return; // Replacing the previous element

    if (videoElement) {
      videoElement.removeEventListener(api.needkey, eventHandler);
    }

    videoElement = mediaElement; // Only if we are not detaching from the existing element

    if (videoElement) {
      videoElement.addEventListener(api.needkey, eventHandler);

      if (mediaKeys) {
        setMediaKeys();
      }
    }
  }

  function createKeySession(ksInfo) {
    if (!keySystem || !mediaKeys || !keySystemAccess) {
      throw new Error('Can not create sessions until you have selected a key system');
    } // Use the first video capability for the contentType.
    // TODO:  Not sure if there is a way to concatenate all capability data into a RFC6386-compatible format
    // If player is trying to playback Audio only stream - don't error out.


    var capabilities = null;

    if (keySystemAccess.ksConfiguration.videoCapabilities && keySystemAccess.ksConfiguration.videoCapabilities.length > 0) {
      capabilities = keySystemAccess.ksConfiguration.videoCapabilities[0];
    }

    if (capabilities === null && keySystemAccess.ksConfiguration.audioCapabilities && keySystemAccess.ksConfiguration.audioCapabilities.length > 0) {
      capabilities = keySystemAccess.ksConfiguration.audioCapabilities[0];
    }

    if (capabilities === null) {
      throw new Error('Can not create sessions for unknown content types.');
    }

    var contentType = capabilities.contentType;
    var session = mediaKeys.createSession(contentType, new Uint8Array(ksInfo.initData), ksInfo.cdmData ? new Uint8Array(ksInfo.cdmData) : null);
    var sessionToken = createSessionToken(session, ksInfo); // Add all event listeners

    session.addEventListener(api.error, sessionToken);
    session.addEventListener(api.message, sessionToken);
    session.addEventListener(api.ready, sessionToken);
    session.addEventListener(api.close, sessionToken); // Add to our session list

    sessions.push(sessionToken);
    logger.debug('DRM: Session created.  SessionID = ' + sessionToken.getSessionId());
    eventBus.trigger(events.KEY_SESSION_CREATED, {
      data: sessionToken
    });
  }

  function updateKeySession(sessionToken, message) {
    var session = sessionToken.session;

    if (!protectionKeyController.isClearKey(keySystem)) {
      // Send our request to the key session
      session.update(new Uint8Array(message));
    } else {
      // For clearkey, message is a ClearKeyKeySet
      session.update(new Uint8Array(message.toJWK()));
    }

    eventBus.trigger(events.KEY_SESSION_UPDATED);
  }
  /**
   * Close the given session and release all associated keys.  Following
   * this call, the sessionToken becomes invalid
   *
   * @param {Object} sessionToken - the session token
   */


  function closeKeySession(sessionToken) {
    var session = sessionToken.session; // Remove event listeners

    session.removeEventListener(api.error, sessionToken);
    session.removeEventListener(api.message, sessionToken);
    session.removeEventListener(api.ready, sessionToken);
    session.removeEventListener(api.close, sessionToken); // Remove from our session list

    for (var i = 0; i < sessions.length; i++) {
      if (sessions[i] === sessionToken) {
        sessions.splice(i, 1);
        break;
      }
    } // Send our request to the key session


    session[api.release]();
  }

  function setServerCertificate() {
    /* Not supported */
  }

  function loadKeySession() {
    /* Not supported */
  }

  function removeKeySession() {
    /* Not supported */
  }

  function createEventHandler() {
    return {
      handleEvent: function handleEvent(event) {
        switch (event.type) {
          case api.needkey:
            if (event.initData) {
              var initData = ArrayBuffer.isView(event.initData) ? event.initData.buffer : event.initData;
              eventBus.trigger(events.NEED_KEY, {
                key: new _vo_NeedKey__WEBPACK_IMPORTED_MODULE_1__["default"](initData, 'cenc')
              });
            }

            break;
        }
      }
    };
  } // IE11 does not let you set MediaKeys until it has entered a certain
  // readyState, so we need this logic to ensure we don't set the keys
  // too early


  function setMediaKeys() {
    var boundDoSetKeys = null;

    var doSetKeys = function doSetKeys() {
      videoElement.removeEventListener('loadedmetadata', boundDoSetKeys);
      videoElement[api.setMediaKeys](mediaKeys);
      eventBus.trigger(events.VIDEO_ELEMENT_SELECTED);
    };

    if (videoElement.readyState >= 1) {
      doSetKeys();
    } else {
      boundDoSetKeys = doSetKeys.bind(this);
      videoElement.addEventListener('loadedmetadata', boundDoSetKeys);
    }
  } // Function to create our session token objects which manage the EME
  // MediaKeySession and session-specific event handler


  function createSessionToken(keySession, ksInfo) {
    return {
      // Implements SessionToken
      session: keySession,
      keyId: ksInfo.keyId,
      initData: ksInfo.initData,
      getKeyId: function getKeyId() {
        return this.keyId;
      },
      getSessionId: function getSessionId() {
        return this.session.sessionId;
      },
      getExpirationTime: function getExpirationTime() {
        return NaN;
      },
      getSessionType: function getSessionType() {
        return 'temporary';
      },
      // This is our main event handler for all desired MediaKeySession events
      // These events are translated into our API-independent versions of the
      // same events
      handleEvent: function handleEvent(event) {
        switch (event.type) {
          case api.error:
            var errorStr = 'KeyError'; // TODO: Make better string from event

            eventBus.trigger(events.KEY_ERROR, {
              error: new _vo_DashJSError__WEBPACK_IMPORTED_MODULE_2__["default"](_errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEYERR_CODE, errorStr, this)
            });
            break;

          case api.message:
            var message = ArrayBuffer.isView(event.message) ? event.message.buffer : event.message;
            eventBus.trigger(events.INTERNAL_KEY_MESSAGE, {
              data: new _vo_KeyMessage__WEBPACK_IMPORTED_MODULE_4__["default"](this, message, event.destinationURL)
            });
            break;

          case api.ready:
            logger.debug('DRM: Key added.');
            eventBus.trigger(events.KEY_ADDED);
            break;

          case api.close:
            logger.debug('DRM: Session closed.  SessionID = ' + this.getSessionId());
            eventBus.trigger(events.KEY_SESSION_CLOSED, {
              data: this.getSessionId()
            });
            break;
        }
      }
    };
  }

  instance = {
    getAllInitData: getAllInitData,
    getSessions: getSessions,
    requestKeySystemAccess: requestKeySystemAccess,
    selectKeySystem: selectKeySystem,
    setMediaElement: setMediaElement,
    createKeySession: createKeySession,
    updateKeySession: updateKeySession,
    closeKeySession: closeKeySession,
    setServerCertificate: setServerCertificate,
    loadKeySession: loadKeySession,
    removeKeySession: removeKeySession,
    stop: reset,
    reset: reset
  };
  setup();
  return instance;
}

ProtectionModel_3Feb2014.__dashjs_factory_name = 'ProtectionModel_3Feb2014';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getClassFactory(ProtectionModel_3Feb2014));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/protection/servers/ClearKey.js":
/*!******************************************************!*\
  !*** ./src/streaming/protection/servers/ClearKey.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vo_KeyPair__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vo/KeyPair */ "./src/streaming/protection/vo/KeyPair.js");
/* harmony import */ var _vo_ClearKeyKeySet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/ClearKeyKeySet */ "./src/streaming/protection/vo/ClearKeyKeySet.js");
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
 * CableLabs ClearKey license server implementation
 *
 * For testing purposes and evaluating potential uses for ClearKey, we have developed
 * a dirt-simple API for requesting ClearKey licenses from a remote server.
 *
 * @implements LicenseServer
 * @class
 */



function ClearKey() {
  var instance;

  function getServerURLFromMessage(url
  /* message, messageType*/
  ) {
    return url;
  }

  function getHTTPMethod() {
    return 'POST';
  }

  function getResponseType() {
    return 'json';
  }

  function getLicenseMessage(serverResponse
  /*, keySystemStr, messageType*/
  ) {
    if (!serverResponse.hasOwnProperty('keys')) {
      return null;
    }

    var keyPairs = [];

    for (var i = 0; i < serverResponse.keys.length; i++) {
      var keypair = serverResponse.keys[i];
      var keyid = keypair.kid.replace(/=/g, '');
      var key = keypair.k.replace(/=/g, '');
      keyPairs.push(new _vo_KeyPair__WEBPACK_IMPORTED_MODULE_0__["default"](keyid, key));
    }

    return new _vo_ClearKeyKeySet__WEBPACK_IMPORTED_MODULE_1__["default"](keyPairs);
  }

  function getErrorResponse(serverResponse
  /*, keySystemStr, messageType*/
  ) {
    return String.fromCharCode.apply(null, new Uint8Array(serverResponse));
  }

  instance = {
    getServerURLFromMessage: getServerURLFromMessage,
    getHTTPMethod: getHTTPMethod,
    getResponseType: getResponseType,
    getLicenseMessage: getLicenseMessage,
    getErrorResponse: getErrorResponse
  };
  return instance;
}

ClearKey.__dashjs_factory_name = 'ClearKey';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getSingletonFactory(ClearKey));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/protection/servers/DRMToday.js":
/*!******************************************************!*\
  !*** ./src/streaming/protection/servers/DRMToday.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/ProtectionConstants */ "./src/streaming/constants/ProtectionConstants.js");
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
 * CastLabs DRMToday License Server implementation
 *
 * @implements LicenseServer
 * @class
 */


function DRMToday(config) {
  config = config || {};
  var BASE64 = config.BASE64;
  var keySystems = {};
  keySystems[_constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_0__["default"].WIDEVINE_KEYSTEM_STRING] = {
    responseType: 'json',
    getLicenseMessage: function getLicenseMessage(response) {
      return BASE64.decodeArray(response.license);
    },
    getErrorResponse: function getErrorResponse(response) {
      return response;
    }
  };
  keySystems[_constants_ProtectionConstants__WEBPACK_IMPORTED_MODULE_0__["default"].PLAYREADY_KEYSTEM_STRING] = {
    responseType: 'arraybuffer',
    getLicenseMessage: function getLicenseMessage(response) {
      return response;
    },
    getErrorResponse: function getErrorResponse(response) {
      return String.fromCharCode.apply(null, new Uint8Array(response));
    }
  };
  var instance;

  function checkConfig() {
    if (!BASE64 || !BASE64.hasOwnProperty('decodeArray')) {
      throw new Error('Missing config parameter(s)');
    }
  }

  function getServerURLFromMessage(url
  /*, message, messageType*/
  ) {
    return url;
  }

  function getHTTPMethod() {
    return 'POST';
  }

  function getResponseType(keySystemStr
  /*, messageType*/
  ) {
    return keySystems[keySystemStr].responseType;
  }

  function getLicenseMessage(serverResponse, keySystemStr
  /*, messageType*/
  ) {
    checkConfig();
    return keySystems[keySystemStr].getLicenseMessage(serverResponse);
  }

  function getErrorResponse(serverResponse, keySystemStr
  /*, messageType*/
  ) {
    return keySystems[keySystemStr].getErrorResponse(serverResponse);
  }

  instance = {
    getServerURLFromMessage: getServerURLFromMessage,
    getHTTPMethod: getHTTPMethod,
    getResponseType: getResponseType,
    getLicenseMessage: getLicenseMessage,
    getErrorResponse: getErrorResponse
  };
  return instance;
}

DRMToday.__dashjs_factory_name = 'DRMToday';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getSingletonFactory(DRMToday));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/protection/servers/PlayReady.js":
/*!*******************************************************!*\
  !*** ./src/streaming/protection/servers/PlayReady.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_FactoryMaker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/FactoryMaker */ "./src/core/FactoryMaker.js");
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

/* global escape: true */

/**
 * Microsoft PlayReady Test License Server
 *
 * For testing content that uses the PlayReady test server at
 *
 * @implements LicenseServer
 * @class
 * @ignore
 */

function PlayReady() {
  var instance;
  var soap = 'http://schemas.xmlsoap.org/soap/envelope/';

  function uintToString(arrayBuffer) {
    var encodedString = String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
    var decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
  }

  function parseServerResponse(serverResponse) {
    if (window.DOMParser) {
      var stringResponse = uintToString(serverResponse);
      var parser = new window.DOMParser();
      var xmlDoc = parser.parseFromString(stringResponse, 'text/xml');
      var envelope = xmlDoc ? xmlDoc.getElementsByTagNameNS(soap, 'Envelope')[0] : null;
      var body = envelope ? envelope.getElementsByTagNameNS(soap, 'Body')[0] : null;
      var fault = body ? body.getElementsByTagNameNS(soap, 'Fault')[0] : null;

      if (fault) {
        return null;
      }
    }

    return serverResponse;
  }

  function parseErrorResponse(serverResponse) {
    var faultstring = '';
    var statusCode = '';
    var message = '';
    var idStart = -1;
    var idEnd = -1;

    if (window.DOMParser) {
      var stringResponse = uintToString(serverResponse);
      var parser = new window.DOMParser();
      var xmlDoc = parser.parseFromString(stringResponse, 'text/xml');
      var envelope = xmlDoc ? xmlDoc.getElementsByTagNameNS(soap, 'Envelope')[0] : null;
      var body = envelope ? envelope.getElementsByTagNameNS(soap, 'Body')[0] : null;
      var fault = body ? body.getElementsByTagNameNS(soap, 'Fault')[0] : null;
      var detail = fault ? fault.getElementsByTagName('detail')[0] : null;
      var exception = detail ? detail.getElementsByTagName('Exception')[0] : null;
      var node = null;

      if (fault === null) {
        return stringResponse;
      }

      node = fault.getElementsByTagName('faultstring')[0].firstChild;
      faultstring = node ? node.nodeValue : null;

      if (exception !== null) {
        node = exception.getElementsByTagName('StatusCode')[0];
        statusCode = node ? node.firstChild.nodeValue : null;
        node = exception.getElementsByTagName('Message')[0];
        message = node ? node.firstChild.nodeValue : null;
        idStart = message ? message.lastIndexOf('[') + 1 : -1;
        idEnd = message ? message.indexOf(']') : -1;
        message = message ? message.substring(idStart, idEnd) : '';
      }
    }

    var errorString = "code: ".concat(statusCode, ", name: ").concat(faultstring);

    if (message) {
      errorString += ", message: ".concat(message);
    }

    return errorString;
  }

  function getServerURLFromMessage(url
  /*, message, messageType*/
  ) {
    return url;
  }

  function getHTTPMethod() {
    return 'POST';
  }

  function getResponseType() {
    return 'arraybuffer';
  }

  function getLicenseMessage(serverResponse
  /*, keySystemStr, messageType*/
  ) {
    return parseServerResponse.call(this, serverResponse);
  }

  function getErrorResponse(serverResponse
  /*, keySystemStr, messageType*/
  ) {
    return parseErrorResponse.call(this, serverResponse);
  }

  instance = {
    getServerURLFromMessage: getServerURLFromMessage,
    getHTTPMethod: getHTTPMethod,
    getResponseType: getResponseType,
    getLicenseMessage: getLicenseMessage,
    getErrorResponse: getErrorResponse
  };
  return instance;
}

PlayReady.__dashjs_factory_name = 'PlayReady';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker__WEBPACK_IMPORTED_MODULE_0__["default"].getSingletonFactory(PlayReady));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/protection/servers/Widevine.js":
/*!******************************************************!*\
  !*** ./src/streaming/protection/servers/Widevine.js ***!
  \******************************************************/
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
function Widevine() {
  var instance;

  function getServerURLFromMessage(url
  /*, message, messageType*/
  ) {
    return url;
  }

  function getHTTPMethod() {
    return 'POST';
  }

  function getResponseType() {
    return 'arraybuffer';
  }

  function getLicenseMessage(serverResponse
  /*, keySystemStr, messageType*/
  ) {
    return serverResponse;
  }

  function getErrorResponse(serverResponse
  /*, keySystemStr, messageType*/
  ) {
    return String.fromCharCode.apply(null, new Uint8Array(serverResponse));
  }

  instance = {
    getServerURLFromMessage: getServerURLFromMessage,
    getHTTPMethod: getHTTPMethod,
    getResponseType: getResponseType,
    getLicenseMessage: getLicenseMessage,
    getErrorResponse: getErrorResponse
  };
  return instance;
}

Widevine.__dashjs_factory_name = 'Widevine';
/* harmony default export */ __webpack_exports__["default"] = (dashjs.FactoryMaker.getSingletonFactory(Widevine));
/* jshint ignore:line */

/***/ }),

/***/ "./src/streaming/protection/vo/ClearKeyKeySet.js":
/*!*******************************************************!*\
  !*** ./src/streaming/protection/vo/ClearKeyKeySet.js ***!
  \*******************************************************/
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
 * @classdesc A collection of ClearKey encryption keys with an (optional) associated
 *  type
 * @ignore
 */
var ClearKeyKeySet = /*#__PURE__*/function () {
  /**
   * @param {Array.<KeyPair>} keyPairs
   * @param {string} type the type of keys in this set.  One of either 'persistent'
   * or 'temporary'.  Can also be null or undefined.
   * @class
   * @ignore
   */
  function ClearKeyKeySet(keyPairs, type) {
    _classCallCheck(this, ClearKeyKeySet);

    if (type && type !== 'persistent' && type !== 'temporary') throw new Error('Invalid ClearKey key set type!  Must be one of \'persistent\' or \'temporary\'');
    this.keyPairs = keyPairs;
    this.type = type;
  }
  /**
   * Convert this key set to its JSON Web Key (JWK) representation
   *
   * @return {ArrayBuffer} JWK object UTF-8 encoded as ArrayBuffer
   */


  _createClass(ClearKeyKeySet, [{
    key: "toJWK",
    value: function toJWK() {
      var i;
      var numKeys = this.keyPairs.length;
      var jwk = {
        keys: []
      };

      for (i = 0; i < numKeys; i++) {
        var key = {
          kty: 'oct',
          alg: 'A128KW',
          kid: this.keyPairs[i].keyID,
          k: this.keyPairs[i].key
        };
        jwk.keys.push(key);
      }

      if (this.type) {
        jwk.type = this.type;
      }

      var jwkString = JSON.stringify(jwk);
      var len = jwkString.length; // Convert JSON string to ArrayBuffer

      var buf = new ArrayBuffer(len);
      var bView = new Uint8Array(buf);

      for (i = 0; i < len; i++) {
        bView[i] = jwkString.charCodeAt(i);
      }

      return buf;
    }
  }]);

  return ClearKeyKeySet;
}();

/* harmony default export */ __webpack_exports__["default"] = (ClearKeyKeySet);

/***/ }),

/***/ "./src/streaming/protection/vo/KeyMessage.js":
/*!***************************************************!*\
  !*** ./src/streaming/protection/vo/KeyMessage.js ***!
  \***************************************************/
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
 * @classdesc EME-independent KeyMessage
 * @ignore
 */
var KeyMessage =
/**
 * @param {SessionToken} sessionToken the session
 * to which the key message is associated
 * @param {ArrayBuffer} message the key message
 * @param {string} defaultURL license acquisition URL provided by the CDM
 * @param {string} messageType Supported message types can be found
 * {@link https://w3c.github.io/encrypted-media/#idl-def-MediaKeyMessageType|here}.
 * @class
 */
function KeyMessage(sessionToken, message, defaultURL, messageType) {
  _classCallCheck(this, KeyMessage);

  this.sessionToken = sessionToken;
  this.message = message;
  this.defaultURL = defaultURL;
  this.messageType = messageType ? messageType : 'license-request';
};

/* harmony default export */ __webpack_exports__["default"] = (KeyMessage);

/***/ }),

/***/ "./src/streaming/protection/vo/KeyPair.js":
/*!************************************************!*\
  !*** ./src/streaming/protection/vo/KeyPair.js ***!
  \************************************************/
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
 * @classdesc Represents a 128-bit keyID and 128-bit encryption key
 * @ignore
 */
var KeyPair =
/**
 * @param {string} keyID 128-bit key ID, base64 encoded, with no padding
 * @param {string} key 128-bit encryption key, base64 encoded, with no padding
 * @class
 * @ignore
 */
function KeyPair(keyID, key) {
  _classCallCheck(this, KeyPair);

  this.keyID = keyID;
  this.key = key;
};

/* harmony default export */ __webpack_exports__["default"] = (KeyPair);

/***/ }),

/***/ "./src/streaming/protection/vo/KeySystemAccess.js":
/*!********************************************************!*\
  !*** ./src/streaming/protection/vo/KeySystemAccess.js ***!
  \********************************************************/
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
 * @classdesc Creates a new key system access token.  Represents a valid key system for
 * given piece of content and key system requirements.  Used to initialize license
 * acquisition operations.
 * @ignore
 */
var KeySystemAccess =
/**
 * @param {MediaPlayer.dependencies.protection.KeySystem} keySystem the key system
 * @param {KeySystemConfiguration} ksConfiguration the
 * subset of configurations passed to the key system access request that are supported
 * by this user agent
 * @class
 * @ignore
 */
function KeySystemAccess(keySystem, ksConfiguration) {
  _classCallCheck(this, KeySystemAccess);

  this.keySystem = keySystem;
  this.ksConfiguration = ksConfiguration;
};

/* harmony default export */ __webpack_exports__["default"] = (KeySystemAccess);

/***/ }),

/***/ "./src/streaming/protection/vo/KeySystemConfiguration.js":
/*!***************************************************************!*\
  !*** ./src/streaming/protection/vo/KeySystemConfiguration.js ***!
  \***************************************************************/
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
 * @classdesc Represents a set of configurations that describe the capabilities desired for
 *  support by a given CDM
 * @ignore
 */
var KeySystemConfiguration =
/**
 * @param {Array.<MediaCapability>} audioCapabilities array of
 * desired audio capabilities.  Higher preference capabilities should be placed earlier
 * in the array.
 * @param {Array.<MediaCapability>} videoCapabilities array of
 * desired video capabilities.  Higher preference capabilities should be placed earlier
 * in the array.
 * @param {string} distinctiveIdentifier desired use of distinctive identifiers.
 * One of "required", "optional", or "not-allowed"
 * @param {string} persistentState desired support for persistent storage of
 * key systems.  One of "required", "optional", or "not-allowed"
 * @param {Array.<string>} sessionTypes List of session types that must
 * be supported by the key system
 * @class
 */
function KeySystemConfiguration(audioCapabilities, videoCapabilities, distinctiveIdentifier, persistentState, sessionTypes) {
  _classCallCheck(this, KeySystemConfiguration);

  this.initDataTypes = ['cenc'];

  if (audioCapabilities && audioCapabilities.length) {
    this.audioCapabilities = audioCapabilities;
  }

  if (videoCapabilities && videoCapabilities.length) {
    this.videoCapabilities = videoCapabilities;
  }

  this.distinctiveIdentifier = distinctiveIdentifier;
  this.persistentState = persistentState;
  this.sessionTypes = sessionTypes;
};

/* harmony default export */ __webpack_exports__["default"] = (KeySystemConfiguration);

/***/ }),

/***/ "./src/streaming/protection/vo/LicenseRequest.js":
/*!*******************************************************!*\
  !*** ./src/streaming/protection/vo/LicenseRequest.js ***!
  \*******************************************************/
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
 * @classdesc Defines a license request
 * @ignore
 */
var LicenseRequest =
/**
 * Defines a license request
 *
 * @class
 */
function LicenseRequest(url, method, responseType, headers, withCredentials, messageType, sessionId, data) {
  _classCallCheck(this, LicenseRequest);

  /**
   * The license request url
   */
  this.url = url;
  /**
   * The HTTP method
   */

  this.method = method;
  /**
   * The HTTP response type
   */

  this.responseType = responseType;
  /**
   * The HTP request headers
   */

  this.headers = headers;
  /**
   * Wether request is done using credentials (cross-site cookies)
   */

  this.withCredentials = withCredentials;
  /**
   * The license request message type (see https://www.w3.org/TR/encrypted-media/#dom-mediakeymessagetype)
   */

  this.messageType = messageType;
  /**
   * The corresponding EME session ID
   */

  this.sessionId = sessionId;
  /**
   * The license request data
   */

  this.data = data;
};

/* harmony default export */ __webpack_exports__["default"] = (LicenseRequest);

/***/ }),

/***/ "./src/streaming/protection/vo/LicenseResponse.js":
/*!********************************************************!*\
  !*** ./src/streaming/protection/vo/LicenseResponse.js ***!
  \********************************************************/
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
 * @classdesc Defines a license response
 */
var LicenseResponse =
/**
 * Defines a license response
 *
 * @class
 * @ignore
 */
function LicenseResponse(url, headers, data) {
  _classCallCheck(this, LicenseResponse);

  /**
   * The url that was loaded, that can be redirected from original request url
   */
  this.url = url;
  /**
   * The HTP response headers
   */

  this.headers = headers;
  /**
   * The license response data
   */

  this.data = data;
};

/* harmony default export */ __webpack_exports__["default"] = (LicenseResponse);

/***/ }),

/***/ "./src/streaming/protection/vo/MediaCapability.js":
/*!********************************************************!*\
  !*** ./src/streaming/protection/vo/MediaCapability.js ***!
  \********************************************************/
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
 * @classdesc A media capability
 * @ignore
 */
var MediaCapability =
/**
 * @param {string} contentType MIME type and codecs (RFC6386)
 * @param {string} robustness
 * @class
 * @ignore
 */
function MediaCapability(contentType, robustness) {
  _classCallCheck(this, MediaCapability);

  this.contentType = contentType;
  this.robustness = robustness;
};

/* harmony default export */ __webpack_exports__["default"] = (MediaCapability);

/***/ }),

/***/ "./src/streaming/protection/vo/NeedKey.js":
/*!************************************************!*\
  !*** ./src/streaming/protection/vo/NeedKey.js ***!
  \************************************************/
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
 * @classdesc NeedKey
 * @ignore
 */
var NeedKey =
/**
 * @param {ArrayBuffer} initData the initialization data
 * @param {string} initDataType initialization data type
 * @class
 */
function NeedKey(initData, initDataType) {
  _classCallCheck(this, NeedKey);

  this.initData = initData;
  this.initDataType = initDataType;
};

/* harmony default export */ __webpack_exports__["default"] = (NeedKey);

/***/ }),

/***/ "./src/streaming/vo/DashJSError.js":
/*!*****************************************!*\
  !*** ./src/streaming/vo/DashJSError.js ***!
  \*****************************************/
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
var DashJSError = function DashJSError(code, message, data) {
  _classCallCheck(this, DashJSError);

  this.code = code || null;
  this.message = message || null;
  this.data = data || null;
};

/* harmony default export */ __webpack_exports__["default"] = (DashJSError);

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
/*!************************************************!*\
  !*** ./src/streaming/protection/Protection.js ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_ProtectionController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/ProtectionController */ "./src/streaming/protection/controllers/ProtectionController.js");
/* harmony import */ var _controllers_ProtectionKeyController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/ProtectionKeyController */ "./src/streaming/protection/controllers/ProtectionKeyController.js");
/* harmony import */ var _ProtectionEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProtectionEvents */ "./src/streaming/protection/ProtectionEvents.js");
/* harmony import */ var _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./errors/ProtectionErrors */ "./src/streaming/protection/errors/ProtectionErrors.js");
/* harmony import */ var _models_ProtectionModel_21Jan2015__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./models/ProtectionModel_21Jan2015 */ "./src/streaming/protection/models/ProtectionModel_21Jan2015.js");
/* harmony import */ var _models_ProtectionModel_3Feb2014__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./models/ProtectionModel_3Feb2014 */ "./src/streaming/protection/models/ProtectionModel_3Feb2014.js");
/* harmony import */ var _models_ProtectionModel_01b__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./models/ProtectionModel_01b */ "./src/streaming/protection/models/ProtectionModel_01b.js");
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







var APIS_ProtectionModel_01b = [// Un-prefixed as per spec
{
  // Video Element
  generateKeyRequest: 'generateKeyRequest',
  addKey: 'addKey',
  cancelKeyRequest: 'cancelKeyRequest',
  // Events
  needkey: 'needkey',
  keyerror: 'keyerror',
  keyadded: 'keyadded',
  keymessage: 'keymessage'
}, // Webkit-prefixed (early Chrome versions and Chrome with EME disabled in chrome://flags)
{
  // Video Element
  generateKeyRequest: 'webkitGenerateKeyRequest',
  addKey: 'webkitAddKey',
  cancelKeyRequest: 'webkitCancelKeyRequest',
  // Events
  needkey: 'webkitneedkey',
  keyerror: 'webkitkeyerror',
  keyadded: 'webkitkeyadded',
  keymessage: 'webkitkeymessage'
}];
var APIS_ProtectionModel_3Feb2014 = [// Un-prefixed as per spec
// Chrome 38-39 (and some earlier versions) with chrome://flags -- Enable Encrypted Media Extensions
{
  // Video Element
  setMediaKeys: 'setMediaKeys',
  // MediaKeys
  MediaKeys: 'MediaKeys',
  // MediaKeySession
  release: 'close',
  // Events
  needkey: 'needkey',
  error: 'keyerror',
  message: 'keymessage',
  ready: 'keyadded',
  close: 'keyclose'
}, // MS-prefixed (IE11, Windows 8.1)
{
  // Video Element
  setMediaKeys: 'msSetMediaKeys',
  // MediaKeys
  MediaKeys: 'MSMediaKeys',
  // MediaKeySession
  release: 'close',
  // Events
  needkey: 'msneedkey',
  error: 'mskeyerror',
  message: 'mskeymessage',
  ready: 'mskeyadded',
  close: 'mskeyclose'
}];

function Protection() {
  var instance;
  var context = this.context;
  /**
   * Create a ProtectionController and associated ProtectionModel for use with
   * a single piece of content.
   *
   * @param {Object} config
   * @return {ProtectionController} protection controller
   *
   */

  function createProtectionSystem(config) {
    var controller = null;
    var protectionKeyController = (0,_controllers_ProtectionKeyController__WEBPACK_IMPORTED_MODULE_1__["default"])(context).getInstance();
    protectionKeyController.setConfig({
      debug: config.debug,
      BASE64: config.BASE64,
      settings: config.settings
    });
    protectionKeyController.initialize();

    var protectionModel = _getProtectionModel(config);

    if (!controller && protectionModel) {
      //TODO add ability to set external controller if still needed at all?
      controller = (0,_controllers_ProtectionController__WEBPACK_IMPORTED_MODULE_0__["default"])(context).create({
        protectionModel: protectionModel,
        protectionKeyController: protectionKeyController,
        eventBus: config.eventBus,
        debug: config.debug,
        events: config.events,
        BASE64: config.BASE64,
        constants: config.constants,
        cmcdModel: config.cmcdModel,
        customParametersModel: config.customParametersModel,
        settings: config.settings
      });
      config.capabilities.setEncryptedMediaSupported(true);
    }

    return controller;
  }

  function _getProtectionModel(config) {
    var debug = config.debug;
    var logger = debug.getLogger(instance);
    var eventBus = config.eventBus;
    var errHandler = config.errHandler;
    var videoElement = config.videoModel ? config.videoModel.getElement() : null;

    if ((!videoElement || videoElement.onencrypted !== undefined) && (!videoElement || videoElement.mediaKeys !== undefined)) {
      logger.info('EME detected on this user agent! (ProtectionModel_21Jan2015)');
      return (0,_models_ProtectionModel_21Jan2015__WEBPACK_IMPORTED_MODULE_4__["default"])(context).create({
        debug: debug,
        eventBus: eventBus,
        events: config.events
      });
    } else if (_getAPI(videoElement, APIS_ProtectionModel_3Feb2014)) {
      logger.info('EME detected on this user agent! (ProtectionModel_3Feb2014)');
      return (0,_models_ProtectionModel_3Feb2014__WEBPACK_IMPORTED_MODULE_5__["default"])(context).create({
        debug: debug,
        eventBus: eventBus,
        events: config.events,
        api: _getAPI(videoElement, APIS_ProtectionModel_3Feb2014)
      });
    } else if (_getAPI(videoElement, APIS_ProtectionModel_01b)) {
      logger.info('EME detected on this user agent! (ProtectionModel_01b)');
      return (0,_models_ProtectionModel_01b__WEBPACK_IMPORTED_MODULE_6__["default"])(context).create({
        debug: debug,
        eventBus: eventBus,
        errHandler: errHandler,
        events: config.events,
        api: _getAPI(videoElement, APIS_ProtectionModel_01b)
      });
    } else {
      logger.warn('No supported version of EME detected on this user agent! - Attempts to play encrypted content will fail!');
      return null;
    }
  }

  function _getAPI(videoElement, apis) {
    for (var i = 0; i < apis.length; i++) {
      var api = apis[i]; // detect if api is supported by browser
      // check only first function in api -> should be fine

      if (typeof videoElement[api[Object.keys(api)[0]]] !== 'function') {
        continue;
      }

      return api;
    }

    return null;
  }

  instance = {
    createProtectionSystem: createProtectionSystem
  };
  return instance;
}

Protection.__dashjs_factory_name = 'Protection';
var factory = dashjs.FactoryMaker.getClassFactory(Protection);
/* jshint ignore:line */

factory.events = _ProtectionEvents__WEBPACK_IMPORTED_MODULE_2__["default"];
factory.errors = _errors_ProtectionErrors__WEBPACK_IMPORTED_MODULE_3__["default"];
dashjs.FactoryMaker.updateClassFactory(Protection.__dashjs_factory_name, factory);
/* jshint ignore:line */

/* harmony default export */ __webpack_exports__["default"] = (factory);
}();
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=dash.protection.debug.js.map