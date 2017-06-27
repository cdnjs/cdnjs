/*!
 * angular-schema-form
 * @version 1.0.0-alpha.2
 * @date Sun, 19 Feb 2017 13:13:18 GMT
 * @link https://github.com/json-schema-form/angular-schema-form
 * @license MIT
 * Copyright (c) 2014-2017 JSON Schema Form
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = angular;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * json-schema-form-core
 * @version 1.0.0-alpha.2
 * @date Sun, 19 Feb 2017 13:06:51 GMT
 * @link https://github.com/json-schema-form/json-schema-form-core
 * @license MIT
 * Copyright (c) 2014-2017 JSON Schema Form
 */
module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_objectpath__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_objectpath___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_objectpath__);
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0_objectpath__, "parse")) __webpack_require__.d(__webpack_exports__, "parse", function() { return __WEBPACK_IMPORTED_MODULE_0_objectpath__["parse"]; });
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0_objectpath__, "stringify")) __webpack_require__.d(__webpack_exports__, "stringify", function() { return __WEBPACK_IMPORTED_MODULE_0_objectpath__["stringify"]; });
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0_objectpath__, "normalize")) __webpack_require__.d(__webpack_exports__, "normalize", function() { return __WEBPACK_IMPORTED_MODULE_0_objectpath__["normalize"]; });
/* harmony export (immutable) */ __webpack_exports__["name"] = name;




/**
 * I am a name formatter function for processing keys into names for classes or Id.
 *
 * @param  {Array<string>} key         I am the key array of a processed schema key
 * @param  {string}        separator   I am the separator between the key items and optional form name
 * @param  {string}        formName    I am an optional form name
 * @param  {boolean}       omitNumbers I determine if numeric values should be included in the output or withheld
 *
 * @return {string}                    I am the formatted key
 */
function name(key, separator) {
  var formName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var omitNumbers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (key) {
    var fieldKey = key.slice();
    var fieldSeparator = separator || '-';

    if (omitNumbers) {
      fieldKey = fieldKey.filter(function (currentKey) {
        return typeof currentKey !== 'number';
      });
    };

    return (formName.length !== 0 ? formName + fieldSeparator : '') + fieldKey.join(fieldSeparator);
  };

  return '';
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Takes a titleMap in either object or list format and returns one
/* harmony default export */ __webpack_exports__["a"] = function (titleMap, originalEnum) {
  if (!Array.isArray(titleMap)) {
    var _ret = function () {
      var canonical = [];
      if (originalEnum) {
        originalEnum.forEach(function (value) {
          canonical.push({ name: titleMap[value], value: value });
        });
      } else {
        Object.keys(titleMap).forEach(function (value) {
          canonical.push({ name: titleMap[value], value: value });
        });
      }
      return {
        v: canonical
      };
    }();

    if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
  }
  return titleMap;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11).ObjectPath;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sf_path__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__canonical_title_map__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["defaultFormDefinition"] = defaultFormDefinition;
/* harmony export (immutable) */ __webpack_exports__["stdFormObj"] = stdFormObj;
/* harmony export (immutable) */ __webpack_exports__["text"] = text;
/* harmony export (immutable) */ __webpack_exports__["number"] = number;
/* harmony export (immutable) */ __webpack_exports__["integer"] = integer;
/* harmony export (immutable) */ __webpack_exports__["checkbox"] = checkbox;
/* harmony export (immutable) */ __webpack_exports__["select"] = select;
/* harmony export (immutable) */ __webpack_exports__["checkboxes"] = checkboxes;
/* harmony export (immutable) */ __webpack_exports__["fieldset"] = fieldset;
/* harmony export (immutable) */ __webpack_exports__["array"] = array;
/* harmony export (immutable) */ __webpack_exports__["createDefaults"] = createDefaults;
/* harmony export (immutable) */ __webpack_exports__["defaultForm"] = defaultForm;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };




/* Utils */
var stripNullType = function stripNullType(type) {
  if (Array.isArray(type) && type.length === 2) {
    if (type[0] === 'null') {
      return type[1];
    };
    if (type[1] === 'null') {
      return type[0];
    };
  };
  return type;
};

// Creates an default titleMap list from an enum, i.e. a list of strings.
var enumToTitleMap = function enumToTitleMap(enm) {
  var titleMap = []; // canonical titleMap format is a list.
  enm.forEach(function (name) {
    titleMap.push({ name: name, value: name });
  });
  return titleMap;
};

/**
 * Creates a default form definition from a schema.
 */
function defaultFormDefinition(schemaTypes, name, schema, options) {
  var rules = schemaTypes[stripNullType(schema.type)];
  if (rules) {
    var def = void 0;
    // We give each rule a possibility to recurse it's children.
    var innerDefaultFormDefinition = function innerDefaultFormDefinition(childName, childSchema, childOptions) {
      return defaultFormDefinition(schemaTypes, childName, childSchema, childOptions);
    };
    for (var i = 0; i < rules.length; i++) {
      def = rules[i](name, schema, options, innerDefaultFormDefinition);

      // first handler in list that actually returns something is our handler!
      if (def) {

        // Do we have form defaults in the schema under the x-schema-form-attribute?
        if (def.schema['x-schema-form']) {
          Object.assign(def, def.schema['x-schema-form']);
        }

        return def;
      }
    }
  }
}

/**
 * Creates a form object with all common properties
 */
function stdFormObj(name, schema, options) {
  options = options || {};

  // The Object.assign used to be a angular.copy. Should work though.
  var f = options.global && options.global.formDefaults ? Object.assign({}, options.global.formDefaults) : {};
  if (options.global && options.global.supressPropertyTitles === true) {
    f.title = schema.title;
  } else {
    f.title = schema.title || name;
  }

  if (schema.description) {
    f.description = schema.description;
  }
  if (options.required === true || schema.required === true) {
    f.required = true;
  }
  if (schema.maxLength) {
    f.maxlength = schema.maxLength;
  }
  if (schema.minLength) {
    f.minlength = schema.minLength;
  }
  if (schema.readOnly || schema.readonly) {
    f.readonly = true;
  }
  if (schema.minimum) {
    f.minimum = schema.minimum + (schema.exclusiveMinimum ? 1 : 0);
  }
  if (schema.maximum) {
    f.maximum = schema.maximum - (schema.exclusiveMaximum ? 1 : 0);
  }

  // Non standard attributes (DONT USE DEPRECATED)
  // If you must set stuff like this in the schema use the x-schema-form attribute
  if (schema.validationMessage) {
    f.validationMessage = schema.validationMessage;
  }
  if (schema.enumNames) {
    f.titleMap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__canonical_title_map__["a" /* default */])(schema.enumNames, schema['enum']);
  }
  f.schema = schema;

  // Ng model options doesn't play nice with undefined, might be defined
  // globally though
  f.ngModelOptions = f.ngModelOptions || {};

  return f;
};

/*** Schema types to form type mappings, with defaults ***/
function text(name, schema, options) {
  if (stripNullType(schema.type) === 'string' && !schema['enum']) {
    var f = stdFormObj(name, schema, options);
    f.key = options.path;
    f.type = 'text';
    options.lookup[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sf_path__["stringify"])(options.path)] = f;
    return f;
  }
}

// default in json form for number and integer is a text field
// input type="number" would be more suitable don't ya think?
function number(name, schema, options) {
  if (stripNullType(schema.type) === 'number') {
    var f = stdFormObj(name, schema, options);
    f.key = options.path;
    f.type = 'number';
    options.lookup[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sf_path__["stringify"])(options.path)] = f;
    return f;
  }
}

function integer(name, schema, options) {
  if (stripNullType(schema.type) === 'integer') {
    var f = stdFormObj(name, schema, options);
    f.key = options.path;
    f.type = 'number';
    options.lookup[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sf_path__["stringify"])(options.path)] = f;
    return f;
  }
}

function checkbox(name, schema, options) {
  if (stripNullType(schema.type) === 'boolean') {
    var f = stdFormObj(name, schema, options);
    f.key = options.path;
    f.type = 'checkbox';
    options.lookup[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sf_path__["stringify"])(options.path)] = f;
    return f;
  }
}

function select(name, schema, options) {
  if (stripNullType(schema.type) === 'string' && schema['enum']) {
    var f = stdFormObj(name, schema, options);
    f.key = options.path;
    f.type = 'select';
    if (!f.titleMap) {
      f.titleMap = enumToTitleMap(schema['enum']);
    }
    options.lookup[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sf_path__["stringify"])(options.path)] = f;
    return f;
  }
}

function checkboxes(name, schema, options) {
  if (stripNullType(schema.type) === 'array' && schema.items && schema.items['enum']) {
    var f = stdFormObj(name, schema, options);
    f.key = options.path;
    f.type = 'checkboxes';
    if (!f.titleMap) {
      f.titleMap = enumToTitleMap(schema.items['enum']);
    }
    options.lookup[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sf_path__["stringify"])(options.path)] = f;
    return f;
  }
}

function fieldset(name, schema, options, defaultFormDef) {
  if (stripNullType(schema.type) === 'object') {
    var _ret = function () {
      var f = stdFormObj(name, schema, options);
      f.type = 'fieldset';
      f.key = options.path;
      f.items = [];
      options.lookup[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sf_path__["stringify"])(options.path)] = f;

      // recurse down into properties
      if (schema.properties) {
        Object.keys(schema.properties).forEach(function (key) {
          var value = schema.properties[key];
          var path = options.path.slice();
          path.push(key);
          if (options.ignore[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sf_path__["stringify"])(path)] !== true) {
            var required = schema.required && schema.required.indexOf(key) !== -1;

            var def = defaultFormDef(key, value, {
              path: path,
              required: required || false,
              lookup: options.lookup,
              ignore: options.ignore,
              global: options.global
            });
            if (def) {
              f.items.push(def);
            }
          }
        });
      }
      return {
        v: f
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }
}

function array(name, schema, options, defaultFormDef) {
  if (stripNullType(schema.type) === 'array') {
    var f = stdFormObj(name, schema, options);
    f.type = 'array';
    f.key = options.path;
    options.lookup[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sf_path__["stringify"])(options.path)] = f;

    var required = schema.required && schema.required.indexOf(options.path[options.path.length - 1]) !== -1;

    // The default is to always just create one child. This works since if the
    // schemas items declaration is of type: "object" then we get a fieldset.
    // We also follow json form notatation, adding empty brackets "[]" to
    // signify arrays.

    var arrPath = options.path.slice();
    arrPath.push('');

    f.items = [defaultFormDef(name, schema.items, {
      path: arrPath,
      required: required || false,
      lookup: options.lookup,
      ignore: options.ignore,
      global: options.global
    })];

    return f;
  }
}

function createDefaults() {
  // First sorted by schema type then a list.
  // Order has importance. First handler returning an form snippet will be used.
  return {
    string: [select, text],
    object: [fieldset],
    number: [number],
    integer: [integer],
    boolean: [checkbox],
    array: [checkboxes, array]
  };
};

/**
 * Create form defaults from schema
 */
function defaultForm(schema, defaultSchemaTypes, ignore, globalOptions) {
  var form = [];
  var lookup = {}; // Map path => form obj for fast lookup in merging
  ignore = ignore || {};
  globalOptions = globalOptions || {};
  defaultSchemaTypes = defaultSchemaTypes || createDefaults();

  if (schema.properties) {
    Object.keys(schema.properties).forEach(function (key) {
      if (ignore[key] !== true) {
        var required = schema.required && schema.required.indexOf(key) !== -1;
        var def = defaultFormDefinition(defaultSchemaTypes, key, schema.properties[key], {
          path: [key], // Path to this property in bracket notation.
          lookup: lookup, // Extra map to register with. Optimization for merger.
          ignore: ignore, // The ignore list of paths (sans root level name)
          required: required, // Is it required? (v4 json schema style)
          global: globalOptions // Global options, including form defaults
        });
        if (def) {
          form.push(def);
        }
      }
    });
  } else {
    throw new Error('Not implemented. Only type "object" allowed at root level of schema.');
  }
  return { form: form, lookup: lookup };
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_schema_defaults__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_sf_path__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_canonical_title_map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_merge__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return __WEBPACK_IMPORTED_MODULE_3__lib_merge__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_select__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "select", function() { return __WEBPACK_IMPORTED_MODULE_4__lib_select__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_resolve__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "jsonref", function() { return __WEBPACK_IMPORTED_MODULE_5__lib_resolve__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_traverse__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "traverseSchema", function() { return __WEBPACK_IMPORTED_MODULE_6__lib_traverse__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "traverseForm", function() { return __WEBPACK_IMPORTED_MODULE_6__lib_traverse__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_validate__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "validate", function() { return __WEBPACK_IMPORTED_MODULE_7__lib_validate__["a"]; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sfPath", function() { return sfPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "schemaDefaults", function() { return schemaDefaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canonicalTitleMap", function() { return canonicalTitleMap; });










var sfPath = __WEBPACK_IMPORTED_MODULE_1__lib_sf_path__;
var schemaDefaults = __WEBPACK_IMPORTED_MODULE_0__lib_schema_defaults__;
var canonicalTitleMap = __WEBPACK_IMPORTED_MODULE_2__lib_canonical_title_map__["a" /* default */];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};(function(f){if(( false?"undefined":_typeof(exports))==="object"&&typeof module!=="undefined"){module.exports=f();}else if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));}else{var g;if(typeof window!=="undefined"){g=window;}else if(typeof global!=="undefined"){g=global;}else if(typeof self!=="undefined"){g=self;}else{g=this;}g.JsonRefs=f();}})(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f;}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e);},l,l.exports,e,t,n,r);}return n[o].exports;}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++){s(r[o]);}return s;}({1:[function(require,module,exports){/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Jeremy Whitlock
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */'use strict';/**
 * Various utilities for JSON References *(http://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03)* and
 * JSON Pointers *(https://tools.ietf.org/html/rfc6901)*.
 *
 * @module JsonRefs
 */var path=require('path');var PathLoader=require('path-loader');var qs=require('querystring');var slash=require('slash');var URI=require('uri-js');var badPtrTokenRegex=/~(?:[^01]|$)/g;var remoteCache={};var remoteTypes=['relative','remote'];var remoteUriTypes=['absolute','uri'];var uriDetailsCache={};// Load promises polyfill if necessary
/* istanbul ignore if */if(typeof Promise==='undefined'){require('native-promise-only');}/* Internal Functions */// This is a very simplistic clone function that does not take into account non-JSON types.  For these types the
// original value is used as the clone.  So while it's not a complete deep clone, for the needs of this project
// this should be sufficient.
function clone(obj){var cloned;if(isType(obj,'Array')){cloned=[];obj.forEach(function(value,index){cloned[index]=clone(value);});}else if(isType(obj,'Object')){cloned={};Object.keys(obj).forEach(function(key){cloned[key]=clone(obj[key]);});}else{cloned=obj;}return cloned;}function combineQueryParams(qs1,qs2){var combined={};function mergeQueryParams(obj){Object.keys(obj).forEach(function(key){combined[key]=obj[key];});}mergeQueryParams(qs.parse(qs1||''));mergeQueryParams(qs.parse(qs2||''));return Object.keys(combined).length===0?undefined:qs.stringify(combined);}function combineURIs(u1,u2){// Convert Windows paths
if(isType(u1,'String')){u1=slash(u1);}if(isType(u2,'String')){u2=slash(u2);}var u2Details=parseURI(isType(u2,'Undefined')?'':u2);var u1Details;var combinedDetails;if(remoteUriTypes.indexOf(u2Details.reference)>-1){combinedDetails=u2Details;}else{u1Details=isType(u1,'Undefined')?undefined:parseURI(u1);if(!isType(u1Details,'Undefined')){combinedDetails=u1Details;// Join the paths
combinedDetails.path=slash(path.join(u1Details.path,u2Details.path));// Join query parameters
combinedDetails.query=combineQueryParams(u1Details.query,u2Details.query);}else{combinedDetails=u2Details;}}// Remove the fragment
combinedDetails.fragment=undefined;// For relative URIs, add back the '..' since it was removed above
return(remoteUriTypes.indexOf(combinedDetails.reference)===-1&&combinedDetails.path.indexOf('../')===0?'../':'')+URI.serialize(combinedDetails);}function findAncestors(obj,path){var ancestors=[];var node;if(path.length>0){node=obj;path.slice(0,path.length-1).forEach(function(seg){if(seg in node){node=node[seg];ancestors.push(node);}});}return ancestors;}function processSubDocument(mode,doc,subDocPath,refDetails,options,parents,parentPtrs,allRefs,indirect){var refValue;var rOptions;if(subDocPath.length>0){try{refValue=findValue(doc,subDocPath);}catch(err){// We only mark missing remote references as missing because local references can have deferred values
if(mode==='remote'){refDetails.error=err.message;refDetails.missing=true;}}}else{refValue=doc;}if(!isType(refValue,'Undefined')){refDetails.value=refValue;}if(isType(refValue,'Array')||isType(refValue,'Object')){rOptions=clone(options);if(mode==='local'){delete rOptions.subDocPath;// Traverse the dereferenced value
doc=refValue;}else{rOptions.relativeBase=path.dirname(parents[parents.length-1]);if(subDocPath.length===0){delete rOptions.subDocPath;}else{rOptions.subDocPath=subDocPath;}}return findRefsRecursive(doc,rOptions,parents,parentPtrs,allRefs,indirect);}}// Should this be its own exported API?
function findRefsRecursive(obj,options,parents,parentPtrs,allRefs,indirect){var allTasks=Promise.resolve();var parentPath=parentPtrs.length?pathFromPtr(parentPtrs[parentPtrs.length-1]):[];var refs=findRefs(obj,options);var subDocPath=options.subDocPath||[];var subDocPtr=pathToPtr(subDocPath);var ancestorPtrs=['#'];parents.forEach(function(parent,index){if(parent.charAt(0)!=='#'){ancestorPtrs.push(parentPtrs[index]);}});// Reverse the order so we search them in the proper order
ancestorPtrs.reverse();if((parents[parents.length-1]||'').charAt(0)!=='#'){allRefs.documents[pathToPtr(parentPath)]=obj;}Object.keys(refs).forEach(function(refPtr){var refDetails=refs[refPtr];var location;var parentIndex;var refFullPath;var refFullPtr;// If there are no parents, treat the reference pointer as-is.  Otherwise, the reference is a reference within a
// remote document and its sub document path prefix must be removed.
if(parents.length===0){refFullPath=parentPath.concat(pathFromPtr(refPtr));}else{refFullPath=parentPath.concat(pathFromPtr(refPtr).slice(parents.length===0?0:subDocPath.length));}refFullPtr=pathToPtr(refFullPath);// It is possible to process the same reference more than once in the event of hierarchical references so we avoid
// processing a reference if we've already done so.
if(!isType(allRefs[refFullPtr],'Undefined')){return;}// Record the reference metadata
allRefs.refs[refFullPtr]=refs[refPtr];// Do not process invalid references
if(isType(refDetails.error,'Undefined')&&refDetails.type!=='invalid'){if(remoteTypes.indexOf(refDetails.type)>-1){location=combineURIs(options.relativeBase,refDetails.uri);parentIndex=parents.indexOf(location);}else{location=refDetails.uri;parentIndex=parentPtrs.indexOf(location);}// Record ancestor paths
refDetails.ancestorPtrs=ancestorPtrs;// Record if the reference is indirect based on its parent
refDetails.indirect=indirect;// Only process non-circular references further
if(parentIndex===-1){if(remoteTypes.indexOf(refDetails.type)>-1){allTasks=allTasks.then(function(){return getRemoteDocument(location,options).then(function(doc){return processSubDocument('remote',doc,isType(refDetails.uriDetails.fragment,'Undefined')?[]:pathFromPtr(decodeURI(refDetails.uriDetails.fragment)),refDetails,options,parents.concat(location),parentPtrs.concat(refFullPtr),allRefs,indirect);}).catch(function(err){refDetails.error=err.message;refDetails.missing=true;});});}else{if(refFullPtr.indexOf(location+'/')!==0&&refFullPtr!==location&&subDocPtr.indexOf(location+'/')!==0&&subDocPtr!==location){if(location.indexOf(subDocPtr+'/')!==0){allTasks=allTasks.then(function(){return processSubDocument('local',obj,pathFromPtr(location),refDetails,options,parents.concat(location),parentPtrs.concat(refFullPtr),allRefs,indirect||location.indexOf(subDocPtr+'/')===-1&&location!==subDocPtr);});}}else{refDetails.circular=true;}}}else{// Mark seen ancestors as circular
parentPtrs.slice(parentIndex).forEach(function(parentPtr){allRefs.refs[parentPtr].circular=true;});refDetails.circular=true;}}});allTasks=allTasks.then(function(){// Identify indirect, local circular references (Issue 82)
var circulars=[];var processedRefPtrs=[];var processedRefs=[];function walkRefs(parentPtrs,parentRefs,refPtr,ref){Object.keys(allRefs.refs).forEach(function(dRefPtr){var dRefDetails=allRefs.refs[dRefPtr];// Do not process already processed references or references that are not a nested references
if(processedRefs.indexOf(ref)===-1&&processedRefPtrs.indexOf(refPtr)===-1&&circulars.indexOf(ref)===-1&&dRefPtr!==refPtr&&dRefPtr.indexOf(ref+'/')===0){if(parentRefs.indexOf(ref)>-1){parentRefs.forEach(function(parentRef){if(circulars.indexOf(ref)===-1){circulars.push(parentRef);}});}else{walkRefs(parentPtrs.concat(refPtr),parentRefs.concat(ref),dRefPtr,dRefDetails.uri);}processedRefPtrs.push(refPtr);processedRefs.push(ref);}});}Object.keys(allRefs.refs).forEach(function(refPtr){var refDetails=allRefs.refs[refPtr];// Only process local, non-circular references
if(refDetails.type==='local'&&!refDetails.circular&&circulars.indexOf(refDetails.uri)===-1){walkRefs([],[],refPtr,refDetails.uri);}});Object.keys(allRefs.refs).forEach(function(refPtr){var refDetails=allRefs.refs[refPtr];if(circulars.indexOf(refDetails.uri)>-1){refDetails.circular=true;}});}).then(function(){return allRefs;});return allTasks;}function findValue(obj,path){var value=obj;path.forEach(function(seg){seg=decodeURI(seg);if(seg in value){value=value[seg];}else{throw Error('JSON Pointer points to missing location: '+pathToPtr(path));}});return value;}function getExtraRefKeys(ref){return Object.keys(ref).filter(function(key){return key!=='$ref';});}function getRefType(refDetails){var type;// Convert the URI reference to one of our types
switch(refDetails.uriDetails.reference){case'absolute':case'uri':type='remote';break;case'same-document':type='local';break;default:type=refDetails.uriDetails.reference;}return type;}function getRemoteDocument(url,options){var cacheEntry=remoteCache[url];var allTasks=Promise.resolve();var loaderOptions=clone(options.loaderOptions||{});if(isType(cacheEntry,'Undefined')){// If there is no content processor, default to processing the raw response as JSON
if(isType(loaderOptions.processContent,'Undefined')){loaderOptions.processContent=function(res,callback){callback(undefined,JSON.parse(res.text));};}// Attempt to load the resource using path-loader
allTasks=PathLoader.load(decodeURI(url),loaderOptions);// Update the cache
allTasks=allTasks.then(function(res){remoteCache[url]={value:res};return res;}).catch(function(err){remoteCache[url]={error:err};throw err;});}else{// Return the cached version
allTasks=allTasks.then(function(){return cacheEntry.value;});}// Return a cloned version to avoid updating the cache
allTasks=allTasks.then(function(res){return clone(res);});return allTasks;}function isRefLike(obj,throwWithDetails){var refLike=true;try{if(!isType(obj,'Object')){throw new Error('obj is not an Object');}else if(!isType(obj.$ref,'String')){throw new Error('obj.$ref is not a String');}}catch(err){if(throwWithDetails){throw err;}refLike=false;}return refLike;}function isType(obj,type){// A PhantomJS bug (https://github.com/ariya/phantomjs/issues/11722) prohibits us from using the same approach for
// undefined checking that we use for other types.
if(type==='Undefined'){return typeof obj==='undefined';}else{return Object.prototype.toString.call(obj)==='[object '+type+']';}}function makeRefFilter(options){var refFilter;var validTypes;if(isType(options.filter,'Array')||isType(options.filter,'String')){validTypes=isType(options.filter,'String')?[options.filter]:options.filter;refFilter=function refFilter(refDetails){// Check the exact type or for invalid URIs, check its original type
return validTypes.indexOf(refDetails.type)>-1||validTypes.indexOf(getRefType(refDetails))>-1;};}else if(isType(options.filter,'Function')){refFilter=options.filter;}else if(isType(options.filter,'Undefined')){refFilter=function refFilter(){return true;};}return function(refDetails,path){return(refDetails.type!=='invalid'||options.includeInvalid===true)&&refFilter(refDetails,path);};}function makeSubDocPath(options){var subDocPath;if(isType(options.subDocPath,'Array')){subDocPath=options.subDocPath;}else if(isType(options.subDocPath,'String')){subDocPath=pathFromPtr(options.subDocPath);}else if(isType(options.subDocPath,'Undefined')){subDocPath=[];}return subDocPath;}function parseURI(uri){// We decode first to avoid doubly encoding
return URI.parse(encodeURI(decodeURI(uri)));}function setValue(obj,refPath,value){findValue(obj,refPath.slice(0,refPath.length-1))[decodeURI(refPath[refPath.length-1])]=value;}function walk(ancestors,node,path,fn){var processChildren=true;function walkItem(item,segment){path.push(segment);walk(ancestors,item,path,fn);path.pop();}// Call the iteratee
if(isType(fn,'Function')){processChildren=fn(ancestors,node,path);}// We do not process circular objects again
if(ancestors.indexOf(node)===-1){ancestors.push(node);if(processChildren!==false){if(isType(node,'Array')){node.forEach(function(member,index){walkItem(member,index.toString());});}else if(isType(node,'Object')){Object.keys(node).forEach(function(key){walkItem(node[key],key);});}}}ancestors.pop();}function validateOptions(options,obj){if(isType(options,'Undefined')){// Default to an empty options object
options={};}else{// Clone the options so we do not alter the ones passed in
options=clone(options);}if(!isType(options,'Object')){throw new TypeError('options must be an Object');}else if(!isType(options.filter,'Undefined')&&!isType(options.filter,'Array')&&!isType(options.filter,'Function')&&!isType(options.filter,'String')){throw new TypeError('options.filter must be an Array, a Function of a String');}else if(!isType(options.includeInvalid,'Undefined')&&!isType(options.includeInvalid,'Boolean')){throw new TypeError('options.includeInvalid must be a Boolean');}else if(!isType(options.refPreProcessor,'Undefined')&&!isType(options.refPreProcessor,'Function')){throw new TypeError('options.refPreProcessor must be a Function');}else if(!isType(options.refPostProcessor,'Undefined')&&!isType(options.refPostProcessor,'Function')){throw new TypeError('options.refPostProcessor must be a Function');}else if(!isType(options.subDocPath,'Undefined')&&!isType(options.subDocPath,'Array')&&!isPtr(options.subDocPath)){// If a pointer is provided, throw an error if it's not the proper type
throw new TypeError('options.subDocPath must be an Array of path segments or a valid JSON Pointer');}options.filter=makeRefFilter(options);// Set the subDocPath to avoid everyone else having to compute it
options.subDocPath=makeSubDocPath(options);if(!isType(obj,'Undefined')){try{findValue(obj,options.subDocPath);}catch(err){err.message=err.message.replace('JSON Pointer','options.subDocPath');throw err;}}return options;}/* Module Members *//*
 * Each of the functions below are defined as function statements and *then* exported in two steps instead of one due
 * to a bug in jsdoc (https://github.com/jsdoc2md/jsdoc-parse/issues/18) that causes our documentation to be
 * generated improperly.  The impact to the user is significant enough for us to warrant working around it until this
 * is fixed.
 *//**
 * The options used for various JsonRefs APIs.
 *
 * @typedef {object} JsonRefsOptions
 *
 * @param {string|string[]|function} [filter=function () {return true;}] - The filter to use when gathering JSON
 * References *(If this value is a single string or an array of strings, the value(s) are expected to be the `type(s)`
 * you are interested in collecting as described in {@link module:JsonRefs.getRefDetails}.  If it is a function, it is
 * expected that the function behaves like {@link module:JsonRefs~RefDetailsFilter}.)*
 * @param {boolean} [includeInvalid=false] - Whether or not to include invalid JSON Reference details *(This will make
 * it so that objects that are like JSON Reference objects, as in they are an `Object` and the have a `$ref` property,
 * but fail validation will be included.  This is very useful for when you want to know if you have invalid JSON
 * Reference definitions.  This will not mean that APIs will process invalid JSON References but the reasons as to why
 * the JSON References are invalid will be included in the returned metadata.)*
 * @param {object} [loaderOptions] - The options to pass to
 * {@link https://github.com/whitlockjc/path-loader/blob/master/docs/API.md#module_PathLoader.load|PathLoader~load}
 * @param {module:JsonRefs~RefPreProcessor} [refPreProcessor] - The callback used to pre-process a JSON Reference like
 * object *(This is called prior to validating the JSON Reference like object and getting its details)*
 * @param {module:JsonRefs~RefPostProcessor} [refPostProcessor] - The callback used to post-process the JSON Reference
 * metadata *(This is called prior filtering the references)*
 * @param {string} [options.relativeBase] - The base location to use when resolving relative references *(Only useful
 * for APIs that do remote reference resolution.  If this value is not defined,
 * {@link https://github.com/whitlockjc/path-loader|path-loader} will use `window.location.href` for the browser and
 * `process.cwd()` for Node.js.)*
 * @param {string|string[]} [options.subDocPath=[]] - The JSON Pointer or array of path segments to the sub document
 * location to search from
 *//**
 * Simple function used to filter out JSON References.
 *
 * @typedef {function} RefDetailsFilter
 *
 * @param {module:JsonRefs~UnresolvedRefDetails} refDetails - The JSON Reference details to test
 * @param {string[]} path - The path to the JSON Reference
 *
 * @returns {boolean} whether the JSON Reference should be filtered *(out)* or not
 *//**
 * Simple function used to pre-process a JSON Reference like object.
 *
 * @typedef {function} RefPreProcessor
 *
 * @param {object} obj - The JSON Reference like object
 * @param {string[]} path - The path to the JSON Reference like object
 *
 * @returns {object} the processed JSON Reference like object
 *//**
 * Simple function used to post-process a JSON Reference details.
 *
 * @typedef {function} RefPostProcessor
 *
 * @param {module:JsonRefs~UnresolvedRefDetails} refDetails - The JSON Reference details to test
 * @param {string[]} path - The path to the JSON Reference
 *
 * @returns {object} the processed JSON Reference details object
 *//**
 * Detailed information about resolved JSON References.
 *
 * @typedef {module:JsonRefs~UnresolvedRefDetails} ResolvedRefDetails
 *
 * @property {boolean} [circular] - Whether or not the JSON Reference is circular *(Will not be set if the JSON
 * Reference is not circular)*
 * @property {boolean} [missing] - Whether or not the referenced value was missing or not *(Will not be set if the
 * referenced value is not missing)*
 * @property {*} [value] - The referenced value *(Will not be set if the referenced value is missing)*
 *//**
 * The results of resolving the JSON References of an array/object.
 *
 * @typedef {object} ResolvedRefsResults
 *
 * @property {module:JsonRefs~ResolvedRefDetails} refs - An object whose keys are JSON Pointers *(fragment version)*
 * to where the JSON Reference is defined and whose values are {@link module:JsonRefs~ResolvedRefDetails}
 * @property {object} resolved - The array/object with its JSON References fully resolved
 *//**
 * An object containing the retrieved document and detailed information about its JSON References.
 *
 * @typedef {module:JsonRefs~ResolvedRefsResults} RetrievedRefsResults
 *
 * @property {object} value - The retrieved document
 *//**
 * An object containing the retrieved document, the document with its references resolved and  detailed information
 * about its JSON References.
 *
 * @typedef {object} RetrievedResolvedRefsResults
 *
 * @property {module:JsonRefs~UnresolvedRefDetails} refs - An object whose keys are JSON Pointers *(fragment version)*
 * to where the JSON Reference is defined and whose values are {@link module:JsonRefs~UnresolvedRefDetails}
 * @property {ResolvedRefsResults} - An object whose keys are JSON Pointers *(fragment version)*
 * to where the JSON Reference is defined and whose values are {@link module:JsonRefs~ResolvedRefDetails}
 * @property {object} value - The retrieved document
 *//**
 * Detailed information about unresolved JSON References.
 *
 * @typedef {object} UnresolvedRefDetails
 *
 * @property {object} def - The JSON Reference definition
 * @property {string} [error] - The error information for invalid JSON Reference definition *(Only present when the
 * JSON Reference definition is invalid or there was a problem retrieving a remote reference during resolution)*
 * @property {string} uri - The URI portion of the JSON Reference
 * @property {object} uriDetails - Detailed information about the URI as provided by
 * {@link https://github.com/garycourt/uri-js|URI.parse}.
 * @property {string} type - The JSON Reference type *(This value can be one of the following: `invalid`, `local`,
 * `relative` or `remote`.)*
 * @property {string} [warning] - The warning information *(Only present when the JSON Reference definition produces a
 * warning)*
 *//**
 * Clears the internal cache of remote documents, reference details, etc.
 *
 * @alias module:JsonRefs.clearCache
 */function clearCache(){remoteCache={};}/**
 * Takes an array of path segments and decodes the JSON Pointer tokens in them.
 *
 * @param {string[]} path - The array of path segments
 *
 * @returns {string} the array of path segments with their JSON Pointer tokens decoded
 *
 * @throws {Error} if the path is not an `Array`
 *
 * @see {@link https://tools.ietf.org/html/rfc6901#section-3}
 *
 * @alias module:JsonRefs.decodePath
 */function decodePath(path){if(!isType(path,'Array')){throw new TypeError('path must be an array');}return path.map(function(seg){if(!isType(seg,'String')){seg=JSON.stringify(seg);}return decodeURI(seg.replace(/~1/g,'/').replace(/~0/g,'~'));});}/**
 * Takes an array of path segments and encodes the special JSON Pointer characters in them.
 *
 * @param {string[]} path - The array of path segments
 *
 * @returns {string} the array of path segments with their JSON Pointer tokens encoded
 *
 * @throws {Error} if the path is not an `Array`
 *
 * @see {@link https://tools.ietf.org/html/rfc6901#section-3}
 *
 * @alias module:JsonRefs.encodePath
 */function encodePath(path){if(!isType(path,'Array')){throw new TypeError('path must be an array');}return path.map(function(seg){if(!isType(seg,'String')){seg=JSON.stringify(seg);}return seg.replace(/~/g,'~0').replace(/\//g,'~1');});}/**
 * Finds JSON References defined within the provided array/object.
 *
 * @param {array|object} obj - The structure to find JSON References within
 * @param {module:JsonRefs~JsonRefsOptions} [options] - The JsonRefs options
 *
 * @returns {object} an object whose keys are JSON Pointers *(fragment version)* to where the JSON Reference is defined
 * and whose values are {@link module:JsonRefs~UnresolvedRefDetails}.
 *
 * @throws {Error} when the input arguments fail validation or if `options.subDocPath` points to an invalid location
 *
 * @alias module:JsonRefs.findRefs
 *
 * @example
 * // Finding all valid references
 * var allRefs = JsonRefs.findRefs(obj);
 * // Finding all remote references
 * var remoteRefs = JsonRefs.findRefs(obj, {filter: ['relative', 'remote']});
 * // Finding all invalid references
 * var invalidRefs = JsonRefs.findRefs(obj, {filter: 'invalid', includeInvalid: true});
 */function findRefs(obj,options){var refs={};// Validate the provided document
if(!isType(obj,'Array')&&!isType(obj,'Object')){throw new TypeError('obj must be an Array or an Object');}// Validate options
options=validateOptions(options,obj);// Walk the document (or sub document) and find all JSON References
walk(findAncestors(obj,options.subDocPath),findValue(obj,options.subDocPath),clone(options.subDocPath),function(ancestors,node,path){var processChildren=true;var refDetails;if(isRefLike(node)){// Pre-process the node when necessary
if(!isType(options.refPreProcessor,'Undefined')){node=options.refPreProcessor(clone(node),path);}refDetails=getRefDetails(node);// Post-process the reference details
if(!isType(options.refPostProcessor,'Undefined')){refDetails=options.refPostProcessor(refDetails,path);}if(options.filter(refDetails,path)){refs[pathToPtr(path)]=refDetails;}// Whenever a JSON Reference has extra children, its children should not be processed.
//   See: http://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03#section-3
if(getExtraRefKeys(node).length>0){processChildren=false;}}return processChildren;});return refs;}/**
 * Finds JSON References defined within the document at the provided location.
 *
 * This API is identical to {@link module:JsonRefs.findRefs} except this API will retrieve a remote document and then
 * return the result of {@link module:JsonRefs.findRefs} on the retrieved document.
 *
 * @param {string} location - The location to retrieve *(Can be relative or absolute, just make sure you look at the
 * {@link module:JsonRefs~JsonRefsOptions|options documentation} to see how relative references are handled.)*
 * @param {module:JsonRefs~JsonRefsOptions} [options] - The JsonRefs options
 *
 * @returns {Promise} a promise that resolves a {@link module:JsonRefs~RetrievedRefsResults} and rejects with an
 * `Error` when the input arguments fail validation, when `options.subDocPath` points to an invalid location or when
 *  the location argument points to an unloadable resource
 *
 * @alias module:JsonRefs.findRefsAt
 *
 * @example
 * // Example that only resolves references within a sub document
 * JsonRefs.findRefsAt('http://petstore.swagger.io/v2/swagger.json', {
 *     subDocPath: '#/definitions'
 *   })
 *   .then(function (res) {
 *      // Do something with the response
 *      //
 *      // res.refs: JSON Reference locations and details
 *      // res.value: The retrieved document
 *   }, function (err) {
 *     console.log(err.stack);
 *   });
 */function findRefsAt(location,options){var allTasks=Promise.resolve();allTasks=allTasks.then(function(){// Validate the provided location
if(!isType(location,'String')){throw new TypeError('location must be a string');}// Validate options
options=validateOptions(options);// Combine the location and the optional relative base
location=combineURIs(options.relativeBase,location);return getRemoteDocument(location,options);}).then(function(res){var cacheEntry=clone(remoteCache[location]);var cOptions=clone(options);var uriDetails=parseURI(location);if(isType(cacheEntry.refs,'Undefined')){// Do not filter any references so the cache is complete
delete cOptions.filter;delete cOptions.subDocPath;cOptions.includeInvalid=true;remoteCache[location].refs=findRefs(res,cOptions);}// Add the filter options back
if(!isType(options.filter,'Undefined')){cOptions.filter=options.filter;}if(!isType(uriDetails.fragment,'Undefined')){cOptions.subDocPath=pathFromPtr(decodeURI(uriDetails.fragment));}else if(!isType(uriDetails.subDocPath,'Undefined')){cOptions.subDocPath=options.subDocPath;}// This will use the cache so don't worry about calling it twice
return{refs:findRefs(res,cOptions),value:res};});return allTasks;}/**
 * Returns detailed information about the JSON Reference.
 *
 * @param {object} obj - The JSON Reference definition
 *
 * @returns {module:JsonRefs~UnresolvedRefDetails} the detailed information
 *
 * @alias module:JsonRefs.getRefDetails
 */function getRefDetails(obj){var details={def:obj};var cacheKey;var extraKeys;var uriDetails;try{if(isRefLike(obj,true)){cacheKey=obj.$ref;uriDetails=uriDetailsCache[cacheKey];if(isType(uriDetails,'Undefined')){uriDetails=uriDetailsCache[cacheKey]=parseURI(cacheKey);}details.uri=cacheKey;details.uriDetails=uriDetails;if(isType(uriDetails.error,'Undefined')){details.type=getRefType(details);}else{details.error=details.uriDetails.error;details.type='invalid';}// Identify warning
extraKeys=getExtraRefKeys(obj);if(extraKeys.length>0){details.warning='Extra JSON Reference properties will be ignored: '+extraKeys.join(', ');}}else{details.type='invalid';}}catch(err){details.error=err.message;details.type='invalid';}return details;}/**
 * Returns whether the argument represents a JSON Pointer.
 *
 * A string is a JSON Pointer if the following are all true:
 *
 *   * The string is of type `String`
 *   * The string must be empty, `#` or start with a `/` or `#/`
 *
 * @param {string} ptr - The string to check
 * @param {boolean} [throwWithDetails=false] - Whether or not to throw an `Error` with the details as to why the value
 * provided is invalid
 *
 * @returns {boolean} the result of the check
 *
 * @throws {error} when the provided value is invalid and the `throwWithDetails` argument is `true`
 *
 * @alias module:JsonRefs.isPtr
 *
 * @see {@link https://tools.ietf.org/html/rfc6901#section-3}
 *
 * @example
 * // Separating the different ways to invoke isPtr for demonstration purposes
 * if (isPtr(str)) {
 *   // Handle a valid JSON Pointer
 * } else {
 *   // Get the reason as to why the value is not a JSON Pointer so you can fix/report it
 *   try {
 *     isPtr(str, true);
 *   } catch (err) {
 *     // The error message contains the details as to why the provided value is not a JSON Pointer
 *   }
 * }
 */function isPtr(ptr,throwWithDetails){var valid=true;var firstChar;try{if(isType(ptr,'String')){if(ptr!==''){firstChar=ptr.charAt(0);if(['#','/'].indexOf(firstChar)===-1){throw new Error('ptr must start with a / or #/');}else if(firstChar==='#'&&ptr!=='#'&&ptr.charAt(1)!=='/'){throw new Error('ptr must start with a / or #/');}else if(ptr.match(badPtrTokenRegex)){throw new Error('ptr has invalid token(s)');}}}else{throw new Error('ptr is not a String');}}catch(err){if(throwWithDetails===true){throw err;}valid=false;}return valid;}/**
 * Returns whether the argument represents a JSON Reference.
 *
 * An object is a JSON Reference only if the following are all true:
 *
 *   * The object is of type `Object`
 *   * The object has a `$ref` property
 *   * The `$ref` property is a valid URI *(We do not require 100% strict URIs and will handle unescaped special
 *     characters.)*
 *
 * @param {object} obj - The object to check
 * @param {boolean} [throwWithDetails=false] - Whether or not to throw an `Error` with the details as to why the value
 * provided is invalid
 *
 * @returns {boolean} the result of the check
 *
 * @throws {error} when the provided value is invalid and the `throwWithDetails` argument is `true`
 *
 * @alias module:JsonRefs.isRef
 *
 * @see {@link http://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03#section-3}
 *
 * @example
 * // Separating the different ways to invoke isRef for demonstration purposes
 * if (isRef(obj)) {
 *   // Handle a valid JSON Reference
 * } else {
 *   // Get the reason as to why the value is not a JSON Reference so you can fix/report it
 *   try {
 *     isRef(str, true);
 *   } catch (err) {
 *     // The error message contains the details as to why the provided value is not a JSON Reference
 *   }
 * }
 */function isRef(obj,throwWithDetails){return isRefLike(obj,throwWithDetails)&&getRefDetails(obj,throwWithDetails).type!=='invalid';}/**
 * Returns an array of path segments for the provided JSON Pointer.
 *
 * @param {string} ptr - The JSON Pointer
 *
 * @returns {string[]} the path segments
 *
 * @throws {Error} if the provided `ptr` argument is not a JSON Pointer
 *
 * @alias module:JsonRefs.pathFromPtr
 */function pathFromPtr(ptr){if(!isPtr(ptr)){throw new Error('ptr must be a JSON Pointer');}var segments=ptr.split('/');// Remove the first segment
segments.shift();return decodePath(segments);}/**
 * Returns a JSON Pointer for the provided array of path segments.
 *
 * **Note:** If a path segment in `path` is not a `String`, it will be converted to one using `JSON.stringify`.
 *
 * @param {string[]} path - The array of path segments
 * @param {boolean} [hashPrefix=true] - Whether or not create a hash-prefixed JSON Pointer
 *
 * @returns {string} the corresponding JSON Pointer
 *
 * @throws {Error} if the `path` argument is not an array
 *
 * @alias module:JsonRefs.pathToPtr
 */function pathToPtr(path,hashPrefix){if(!isType(path,'Array')){throw new Error('path must be an Array');}// Encode each segment and return
return(hashPrefix!==false?'#':'')+(path.length>0?'/':'')+encodePath(path).join('/');}/**
 * Finds JSON References defined within the provided array/object and resolves them.
 *
 * @param {array|object} obj - The structure to find JSON References within
 * @param {module:JsonRefs~JsonRefsOptions} [options] - The JsonRefs options
 *
 * @returns {Promise} a promise that resolves a {@link module:JsonRefs~ResolvedRefsResults} and rejects with an
 * `Error` when the input arguments fail validation, when `options.subDocPath` points to an invalid location or when
 *  the location argument points to an unloadable resource
 *
 * @alias module:JsonRefs.resolveRefs
 *
 * @example
 * // Example that only resolves relative and remote references
 * JsonRefs.resolveRefs(swaggerObj, {
 *     filter: ['relative', 'remote']
 *   })
 *   .then(function (res) {
 *      // Do something with the response
 *      //
 *      // res.refs: JSON Reference locations and details
 *      // res.resolved: The document with the appropriate JSON References resolved
 *   }, function (err) {
 *     console.log(err.stack);
 *   });
 */function resolveRefs(obj,options){var allTasks=Promise.resolve();allTasks=allTasks.then(function(){// Validate the provided document
if(!isType(obj,'Array')&&!isType(obj,'Object')){throw new TypeError('obj must be an Array or an Object');}// Validate options
options=validateOptions(options,obj);// Clone the input so we do not alter it
obj=clone(obj);}).then(function(){return findRefsRecursive(obj,options,[],[],{documents:{},refs:{}});}).then(function(allRefs){var deferredRefs={};var refs={};function pathSorter(p1,p2){return pathFromPtr(p1).length-pathFromPtr(p2).length;}// Resolve all references with a known value
Object.keys(allRefs.refs).sort(pathSorter).forEach(function(refPtr){var refDetails=allRefs.refs[refPtr];// Record all direct references
if(!refDetails.indirect){refs[refPtr]=refDetails;}// Delete helper property
delete refDetails.indirect;if(isType(refDetails.error,'Undefined')&&refDetails.type!=='invalid'){if(isType(refDetails.value,'Undefined')&&refDetails.circular){refDetails.value=refDetails.def;}// We defer processing all references without a value until later
if(isType(refDetails.value,'Undefined')){deferredRefs[refPtr]=refDetails;}else{if(refPtr==='#'){obj=refDetails.value;}else{setValue(obj,pathFromPtr(refPtr),refDetails.value);}// Delete helper property
delete refDetails.ancestorPtrs;}}else{// Delete helper property
delete refDetails.ancestorPtrs;}});// Resolve all deferred references
Object.keys(deferredRefs).forEach(function(refPtr){var refDetails=deferredRefs[refPtr];// Attempt to resolve the value against all if its ancestors in order
refDetails.ancestorPtrs.forEach(function(ancestorPtr,index){if(isType(refDetails.value,'Undefined')){try{refDetails.value=findValue(allRefs.documents[ancestorPtr],pathFromPtr(refDetails.uri));// Delete helper property
delete refDetails.ancestorPtrs;setValue(obj,pathFromPtr(refPtr),refDetails.value);}catch(err){if(index===refDetails.ancestorPtrs.length-1){refDetails.error=err.message;refDetails.missing=true;// Delete helper property
delete refDetails.ancestorPtrs;}}}});});return{refs:refs,resolved:obj};});return allTasks;}/**
 * Resolves JSON References defined within the document at the provided location.
 *
 * This API is identical to {@link module:JsonRefs.resolveRefs} except this API will retrieve a remote document and then
 * return the result of {@link module:JsonRefs.resolveRefs} on the retrieved document.
 *
 * @param {string} location - The location to retrieve *(Can be relative or absolute, just make sure you look at the
 * {@link module:JsonRefs~JsonRefsOptions|options documentation} to see how relative references are handled.)*
 * @param {module:JsonRefs~JsonRefsOptions} [options] - The JsonRefs options
 *
 * @returns {Promise} a promise that resolves a {@link module:JsonRefs~RetrievedResolvedRefsResults} and rejects with an
 * `Error` when the input arguments fail validation, when `options.subDocPath` points to an invalid location or when
 *  the location argument points to an unloadable resource
 *
 * @alias module:JsonRefs.resolveRefsAt
 *
 * @example
 * // Example that loads a JSON document (No options.loaderOptions.processContent required) and resolves all references
 * JsonRefs.resolveRefsAt('./swagger.json')
 *   .then(function (res) {
 *      // Do something with the response
 *      //
 *      // res.refs: JSON Reference locations and details
 *      // res.resolved: The document with the appropriate JSON References resolved
 *      // res.value: The retrieved document
 *   }, function (err) {
 *     console.log(err.stack);
 *   });
 */function resolveRefsAt(location,options){var allTasks=Promise.resolve();allTasks=allTasks.then(function(){// Validate the provided location
if(!isType(location,'String')){throw new TypeError('location must be a string');}// Validate options
options=validateOptions(options);// Combine the location and the optional relative base
location=combineURIs(options.relativeBase,location);return getRemoteDocument(location,options);}).then(function(res){var cOptions=clone(options);var uriDetails=parseURI(location);// Set the sub document path if necessary
if(!isType(uriDetails.fragment,'Undefined')){cOptions.subDocPath=pathFromPtr(decodeURI(uriDetails.fragment));}// Update the relative base based on the retrieved location
cOptions.relativeBase=path.dirname(location);return resolveRefs(res,cOptions).then(function(res2){return{refs:res2.refs,resolved:res2.resolved,value:res};});});return allTasks;}/* Export the module members */module.exports.clearCache=clearCache;module.exports.decodePath=decodePath;module.exports.encodePath=encodePath;module.exports.findRefs=findRefs;module.exports.findRefsAt=findRefsAt;module.exports.getRefDetails=getRefDetails;module.exports.isPtr=isPtr;module.exports.isRef=isRef;module.exports.pathFromPtr=pathFromPtr;module.exports.pathToPtr=pathToPtr;module.exports.resolveRefs=resolveRefs;module.exports.resolveRefsAt=resolveRefsAt;},{"native-promise-only":3,"path":4,"path-loader":5,"querystring":11,"slash":13,"uri-js":23}],2:[function(require,module,exports){/**
 * Expose `Emitter`.
 */module.exports=Emitter;/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */function Emitter(obj){if(obj)return mixin(obj);};/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */function mixin(obj){for(var key in Emitter.prototype){obj[key]=Emitter.prototype[key];}return obj;}/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */Emitter.prototype.on=Emitter.prototype.addEventListener=function(event,fn){this._callbacks=this._callbacks||{};(this._callbacks['$'+event]=this._callbacks['$'+event]||[]).push(fn);return this;};/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */Emitter.prototype.once=function(event,fn){function on(){this.off(event,on);fn.apply(this,arguments);}on.fn=fn;this.on(event,on);return this;};/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */Emitter.prototype.off=Emitter.prototype.removeListener=Emitter.prototype.removeAllListeners=Emitter.prototype.removeEventListener=function(event,fn){this._callbacks=this._callbacks||{};// all
if(0==arguments.length){this._callbacks={};return this;}// specific event
var callbacks=this._callbacks['$'+event];if(!callbacks)return this;// remove all handlers
if(1==arguments.length){delete this._callbacks['$'+event];return this;}// remove specific handler
var cb;for(var i=0;i<callbacks.length;i++){cb=callbacks[i];if(cb===fn||cb.fn===fn){callbacks.splice(i,1);break;}}return this;};/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */Emitter.prototype.emit=function(event){this._callbacks=this._callbacks||{};var args=[].slice.call(arguments,1),callbacks=this._callbacks['$'+event];if(callbacks){callbacks=callbacks.slice(0);for(var i=0,len=callbacks.length;i<len;++i){callbacks[i].apply(this,args);}}return this;};/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */Emitter.prototype.listeners=function(event){this._callbacks=this._callbacks||{};return this._callbacks['$'+event]||[];};/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */Emitter.prototype.hasListeners=function(event){return!!this.listeners(event).length;};},{}],3:[function(require,module,exports){(function(global){/*! Native Promise Only
    v0.8.1 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/(function UMD(name,context,definition){// special form of UMD for polyfilling across evironments
context[name]=context[name]||definition();if(typeof module!="undefined"&&module.exports){module.exports=context[name];}else if(typeof define=="function"&&define.amd){define(function $AMD$(){return context[name];});}})("Promise",typeof global!="undefined"?global:this,function DEF(){/*jshint validthis:true */"use strict";var builtInProp,cycle,scheduling_queue,ToString=Object.prototype.toString,timer=typeof setImmediate!="undefined"?function timer(fn){return setImmediate(fn);}:setTimeout;// dammit, IE8.
try{Object.defineProperty({},"x",{});builtInProp=function builtInProp(obj,name,val,config){return Object.defineProperty(obj,name,{value:val,writable:true,configurable:config!==false});};}catch(err){builtInProp=function builtInProp(obj,name,val){obj[name]=val;return obj;};}// Note: using a queue instead of array for efficiency
scheduling_queue=function Queue(){var first,last,item;function Item(fn,self){this.fn=fn;this.self=self;this.next=void 0;}return{add:function add(fn,self){item=new Item(fn,self);if(last){last.next=item;}else{first=item;}last=item;item=void 0;},drain:function drain(){var f=first;first=last=cycle=void 0;while(f){f.fn.call(f.self);f=f.next;}}};}();function schedule(fn,self){scheduling_queue.add(fn,self);if(!cycle){cycle=timer(scheduling_queue.drain);}}// promise duck typing
function isThenable(o){var _then,o_type=typeof o==="undefined"?"undefined":_typeof(o);if(o!=null&&(o_type=="object"||o_type=="function")){_then=o.then;}return typeof _then=="function"?_then:false;}function notify(){for(var i=0;i<this.chain.length;i++){notifyIsolated(this,this.state===1?this.chain[i].success:this.chain[i].failure,this.chain[i]);}this.chain.length=0;}// NOTE: This is a separate function to isolate
// the `try..catch` so that other code can be
// optimized better
function notifyIsolated(self,cb,chain){var ret,_then;try{if(cb===false){chain.reject(self.msg);}else{if(cb===true){ret=self.msg;}else{ret=cb.call(void 0,self.msg);}if(ret===chain.promise){chain.reject(TypeError("Promise-chain cycle"));}else if(_then=isThenable(ret)){_then.call(ret,chain.resolve,chain.reject);}else{chain.resolve(ret);}}}catch(err){chain.reject(err);}}function resolve(msg){var _then,self=this;// already triggered?
if(self.triggered){return;}self.triggered=true;// unwrap
if(self.def){self=self.def;}try{if(_then=isThenable(msg)){schedule(function(){var def_wrapper=new MakeDefWrapper(self);try{_then.call(msg,function $resolve$(){resolve.apply(def_wrapper,arguments);},function $reject$(){reject.apply(def_wrapper,arguments);});}catch(err){reject.call(def_wrapper,err);}});}else{self.msg=msg;self.state=1;if(self.chain.length>0){schedule(notify,self);}}}catch(err){reject.call(new MakeDefWrapper(self),err);}}function reject(msg){var self=this;// already triggered?
if(self.triggered){return;}self.triggered=true;// unwrap
if(self.def){self=self.def;}self.msg=msg;self.state=2;if(self.chain.length>0){schedule(notify,self);}}function iteratePromises(Constructor,arr,resolver,rejecter){for(var idx=0;idx<arr.length;idx++){(function IIFE(idx){Constructor.resolve(arr[idx]).then(function $resolver$(msg){resolver(idx,msg);},rejecter);})(idx);}}function MakeDefWrapper(self){this.def=self;this.triggered=false;}function MakeDef(self){this.promise=self;this.state=0;this.triggered=false;this.chain=[];this.msg=void 0;}function Promise(executor){if(typeof executor!="function"){throw TypeError("Not a function");}if(this.__NPO__!==0){throw TypeError("Not a promise");}// instance shadowing the inherited "brand"
// to signal an already "initialized" promise
this.__NPO__=1;var def=new MakeDef(this);this["then"]=function then(success,failure){var o={success:typeof success=="function"?success:true,failure:typeof failure=="function"?failure:false};// Note: `then(..)` itself can be borrowed to be used against
// a different promise constructor for making the chained promise,
// by substituting a different `this` binding.
o.promise=new this.constructor(function extractChain(resolve,reject){if(typeof resolve!="function"||typeof reject!="function"){throw TypeError("Not a function");}o.resolve=resolve;o.reject=reject;});def.chain.push(o);if(def.state!==0){schedule(notify,def);}return o.promise;};this["catch"]=function $catch$(failure){return this.then(void 0,failure);};try{executor.call(void 0,function publicResolve(msg){resolve.call(def,msg);},function publicReject(msg){reject.call(def,msg);});}catch(err){reject.call(def,err);}}var PromisePrototype=builtInProp({},"constructor",Promise,/*configurable=*/false);// Note: Android 4 cannot use `Object.defineProperty(..)` here
Promise.prototype=PromisePrototype;// built-in "brand" to signal an "uninitialized" promise
builtInProp(PromisePrototype,"__NPO__",0,/*configurable=*/false);builtInProp(Promise,"resolve",function Promise$resolve(msg){var Constructor=this;// spec mandated checks
// note: best "isPromise" check that's practical for now
if(msg&&(typeof msg==="undefined"?"undefined":_typeof(msg))=="object"&&msg.__NPO__===1){return msg;}return new Constructor(function executor(resolve,reject){if(typeof resolve!="function"||typeof reject!="function"){throw TypeError("Not a function");}resolve(msg);});});builtInProp(Promise,"reject",function Promise$reject(msg){return new this(function executor(resolve,reject){if(typeof resolve!="function"||typeof reject!="function"){throw TypeError("Not a function");}reject(msg);});});builtInProp(Promise,"all",function Promise$all(arr){var Constructor=this;// spec mandated checks
if(ToString.call(arr)!="[object Array]"){return Constructor.reject(TypeError("Not an array"));}if(arr.length===0){return Constructor.resolve([]);}return new Constructor(function executor(resolve,reject){if(typeof resolve!="function"||typeof reject!="function"){throw TypeError("Not a function");}var len=arr.length,msgs=Array(len),count=0;iteratePromises(Constructor,arr,function resolver(idx,msg){msgs[idx]=msg;if(++count===len){resolve(msgs);}},reject);});});builtInProp(Promise,"race",function Promise$race(arr){var Constructor=this;// spec mandated checks
if(ToString.call(arr)!="[object Array]"){return Constructor.reject(TypeError("Not an array"));}return new Constructor(function executor(resolve,reject){if(typeof resolve!="function"||typeof reject!="function"){throw TypeError("Not a function");}iteratePromises(Constructor,arr,function resolver(idx,msg){resolve(msg);},reject);});});return Promise;});}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{}],4:[function(require,module,exports){(function(process){// Copyright Joyent, Inc. and other Node contributors.
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
// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts,allowAboveRoot){// if the path tries to go above the root, `up` ends up > 0
var up=0;for(var i=parts.length-1;i>=0;i--){var last=parts[i];if(last==='.'){parts.splice(i,1);}else if(last==='..'){parts.splice(i,1);up++;}else if(up){parts.splice(i,1);up--;}}// if the path is allowed to go above the root, restore leading ..s
if(allowAboveRoot){for(;up--;up){parts.unshift('..');}}return parts;}// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;var splitPath=function splitPath(filename){return splitPathRe.exec(filename).slice(1);};// path.resolve([from ...], to)
// posix version
exports.resolve=function(){var resolvedPath='',resolvedAbsolute=false;for(var i=arguments.length-1;i>=-1&&!resolvedAbsolute;i--){var path=i>=0?arguments[i]:process.cwd();// Skip empty and invalid entries
if(typeof path!=='string'){throw new TypeError('Arguments to path.resolve must be strings');}else if(!path){continue;}resolvedPath=path+'/'+resolvedPath;resolvedAbsolute=path.charAt(0)==='/';}// At this point the path should be resolved to a full absolute path, but
// handle relative paths to be safe (might happen when process.cwd() fails)
// Normalize the path
resolvedPath=normalizeArray(filter(resolvedPath.split('/'),function(p){return!!p;}),!resolvedAbsolute).join('/');return(resolvedAbsolute?'/':'')+resolvedPath||'.';};// path.normalize(path)
// posix version
exports.normalize=function(path){var isAbsolute=exports.isAbsolute(path),trailingSlash=substr(path,-1)==='/';// Normalize the path
path=normalizeArray(filter(path.split('/'),function(p){return!!p;}),!isAbsolute).join('/');if(!path&&!isAbsolute){path='.';}if(path&&trailingSlash){path+='/';}return(isAbsolute?'/':'')+path;};// posix version
exports.isAbsolute=function(path){return path.charAt(0)==='/';};// posix version
exports.join=function(){var paths=Array.prototype.slice.call(arguments,0);return exports.normalize(filter(paths,function(p,index){if(typeof p!=='string'){throw new TypeError('Arguments to path.join must be strings');}return p;}).join('/'));};// path.relative(from, to)
// posix version
exports.relative=function(from,to){from=exports.resolve(from).substr(1);to=exports.resolve(to).substr(1);function trim(arr){var start=0;for(;start<arr.length;start++){if(arr[start]!=='')break;}var end=arr.length-1;for(;end>=0;end--){if(arr[end]!=='')break;}if(start>end)return[];return arr.slice(start,end-start+1);}var fromParts=trim(from.split('/'));var toParts=trim(to.split('/'));var length=Math.min(fromParts.length,toParts.length);var samePartsLength=length;for(var i=0;i<length;i++){if(fromParts[i]!==toParts[i]){samePartsLength=i;break;}}var outputParts=[];for(var i=samePartsLength;i<fromParts.length;i++){outputParts.push('..');}outputParts=outputParts.concat(toParts.slice(samePartsLength));return outputParts.join('/');};exports.sep='/';exports.delimiter=':';exports.dirname=function(path){var result=splitPath(path),root=result[0],dir=result[1];if(!root&&!dir){// No dirname whatsoever
return'.';}if(dir){// It has a dirname, strip trailing slash
dir=dir.substr(0,dir.length-1);}return root+dir;};exports.basename=function(path,ext){var f=splitPath(path)[2];// TODO: make this comparison case-insensitive on windows?
if(ext&&f.substr(-1*ext.length)===ext){f=f.substr(0,f.length-ext.length);}return f;};exports.extname=function(path){return splitPath(path)[3];};function filter(xs,f){if(xs.filter)return xs.filter(f);var res=[];for(var i=0;i<xs.length;i++){if(f(xs[i],i,xs))res.push(xs[i]);}return res;}// String.prototype.substr - negative index don't work in IE8
var substr='ab'.substr(-1)==='b'?function(str,start,len){return str.substr(start,len);}:function(str,start,len){if(start<0)start=str.length+start;return str.substr(start,len);};}).call(this,require('_process'));},{"_process":8}],5:[function(require,module,exports){/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Jeremy Whitlock
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */'use strict';/**
 * Utility that provides a single API for loading the content of a path/URL.
 *
 * @module PathLoader
 */var supportedLoaders={file:require('./lib/loaders/file'),http:require('./lib/loaders/http'),https:require('./lib/loaders/http')};var defaultLoader=(typeof window==="undefined"?"undefined":_typeof(window))==='object'||typeof importScripts==='function'?supportedLoaders.http:supportedLoaders.file;// Load promises polyfill if necessary
/* istanbul ignore if */if(typeof Promise==='undefined'){require('native-promise-only');}function getScheme(location){if(typeof location!=='undefined'){location=location.indexOf('://')===-1?'':location.split('://')[0];}return location;}/**
 * Callback used to provide access to altering a remote request prior to the request being made.
 *
 * @typedef {function} PrepareRequestCallback
 *
 * @param {object} req - The Superagent request object
 * @param {string} location - The location being retrieved
 * @param {function} callback - First callback
 *
 * @alias module:PathLoader~PrepareRequestCallback
 *//**
  * Callback used to provide access to processing the raw response of the request being made. *(HTTP loader only)*
  *
  * @typedef {function} ProcessResponseCallback
  *
  * @param {object} res - The Superagent response object *(For non-HTTP loaders, this object will be like the Superagent
  * object in that it will have a `text` property whose value is the raw string value being processed.  This was done
  * for consistency.)*
  * @param {function} callback - Error-first callback
  *
  * @returns {*} the result of processing the responsexs
  *
  * @alias module:PathLoader~ProcessResponseCallback
  */function getLoader(location){var scheme=getScheme(location);var loader=supportedLoaders[scheme];if(typeof loader==='undefined'){if(scheme===''){loader=defaultLoader;}else{throw new Error('Unsupported scheme: '+scheme);}}return loader;}/**
 * Loads a document at the provided location and returns a JavaScript object representation.
 *
 * @param {object} location - The location to the document
 * @param {object} [options] - The options
 * @param {string} [options.encoding='utf-8'] - The encoding to use when loading the file *(File loader only)*
 * @param {string} [options.method=get] - The HTTP method to use for the request *(HTTP loader only)*
 * @param {module:PathLoader~PrepareRequestCallback} [options.prepareRequest] - The callback used to prepare the request
 * *(HTTP loader only)*
 * @param {module:PathLoader~ProcessResponseCallback} [options.processContent] - The callback used to process the
 * response
 *
 * @returns {Promise} Always returns a promise even if there is a callback provided
 *
 * @example
 * // Example using Promises
 *
 * PathLoader
 *   .load('./package.json')
 *   .then(JSON.parse)
 *   .then(function (document) {
 *     console.log(document.name + ' (' + document.version + '): ' + document.description);
 *   }, function (err) {
 *     console.error(err.stack);
 *   });
 *
 * @example
 * // Example using options.prepareRequest to provide authentication details for a remotely secure URL
 *
 * PathLoader
 *   .load('https://api.github.com/repos/whitlockjc/path-loader', {
 *     prepareRequest: function (req, callback) {
 *       req.auth('my-username', 'my-password');
 *       callback(undefined, req);
 *     }
 *   })
 *   .then(JSON.parse)
 *   .then(function (document) {
 *     console.log(document.full_name + ': ' + document.description);
 *   }, function (err) {
 *     console.error(err.stack);
 *   });
 *
 * @example
 * // Example loading a YAML file
 *
 * PathLoader
 *   .load('/Users/not-you/projects/path-loader/.travis.yml')
 *   .then(YAML.safeLoad)
 *   .then(function (document) {
 *     console.log('path-loader uses the', document.language, 'language.');
 *   }, function (err) {
 *     console.error(err.stack);
 *   });
 *
 * @example
 * // Example loading a YAML file with options.processContent (Useful if you need information in the raw response)
 *
 * PathLoader
 *   .load('/Users/not-you/projects/path-loader/.travis.yml', {
 *     processContent: function (res, callback) {
 *       callback(YAML.safeLoad(res.text));
 *     }
 *   })
 *   .then(function (document) {
 *     console.log('path-loader uses the', document.language, 'language.');
 *   }, function (err) {
 *     console.error(err.stack);
 *   });
 */module.exports.load=function(location,options){var allTasks=Promise.resolve();// Default options to empty object
if(typeof options==='undefined'){options={};}// Validate arguments
allTasks=allTasks.then(function(){if(typeof location==='undefined'){throw new TypeError('location is required');}else if(typeof location!=='string'){throw new TypeError('location must be a string');}if(typeof options!=='undefined'){if((typeof options==="undefined"?"undefined":_typeof(options))!=='object'){throw new TypeError('options must be an object');}else if(typeof options.processContent!=='undefined'&&typeof options.processContent!=='function'){throw new TypeError('options.processContent must be a function');}}});// Load the document from the provided location and process it
allTasks=allTasks.then(function(){return new Promise(function(resolve,reject){var loader=getLoader(location);loader.load(location,options||{},function(err,document){if(err){reject(err);}else{resolve(document);}});});}).then(function(res){if(options.processContent){return new Promise(function(resolve,reject){// For consistency between file and http, always send an object with a 'text' property containing the raw
// string value being processed.
options.processContent((typeof res==="undefined"?"undefined":_typeof(res))==='object'?res:{text:res},function(err,processed){if(err){reject(err);}else{resolve(processed);}});});}else{// If there was no content processor, we will assume that for all objects that it is a Superagent response
// and will return its `text` property value.  Otherwise, we will return the raw response.
return(typeof res==="undefined"?"undefined":_typeof(res))==='object'?res.text:res;}});return allTasks;};},{"./lib/loaders/file":6,"./lib/loaders/http":7,"native-promise-only":3}],6:[function(require,module,exports){/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Jeremy Whitlock
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */'use strict';var unsupportedError=new TypeError('The \'file\' scheme is not supported in the browser');/**
 * The file loader is not supported in the browser.
 *
 * @throws {error} the file loader is not supported in the browser
 */module.exports.getBase=function(){throw unsupportedError;};/**
 * The file loader is not supported in the browser.
 */module.exports.load=function(){var fn=arguments[arguments.length-1];if(typeof fn==='function'){fn(unsupportedError);}else{throw unsupportedError;}};},{}],7:[function(require,module,exports){/* eslint-env node, browser *//*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Jeremy Whitlock
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */'use strict';var request=require('superagent');var supportedHttpMethods=['delete','get','head','patch','post','put'];/**
 * Loads a file from an http or https URL.
 *
 * @param {string} location - The document URL (If relative, location is relative to window.location.origin).
 * @param {object} options - The loader options
 * @param {string} [options.method=get] - The HTTP method to use for the request
 * @param {module:PathLoader~PrepareRequestCallback} [options.prepareRequest] - The callback used to prepare a request
 * @param {module:PathLoader~ProcessResponseCallback} [options.processContent] - The callback used to process the
 * response
 * @param {function} callback - The error-first callback
 */module.exports.load=function(location,options,callback){var realMethod=options.method?options.method.toLowerCase():'get';var err;var realRequest;function makeRequest(err,req){if(err){callback(err);}else{// buffer() is only available in Node.js
if(typeof req.buffer==='function'){req.buffer(true);}req.end(function(err2,res){if(err2){callback(err2);}else{callback(undefined,res);}});}}if(typeof options.method!=='undefined'){if(typeof options.method!=='string'){err=new TypeError('options.method must be a string');}else if(supportedHttpMethods.indexOf(options.method)===-1){err=new TypeError('options.method must be one of the following: '+supportedHttpMethods.slice(0,supportedHttpMethods.length-1).join(', ')+' or '+supportedHttpMethods[supportedHttpMethods.length-1]);}}else if(typeof options.prepareRequest!=='undefined'&&typeof options.prepareRequest!=='function'){err=new TypeError('options.prepareRequest must be a function');}if(!err){realRequest=request[realMethod==='delete'?'del':realMethod](location);if(options.prepareRequest){try{options.prepareRequest(realRequest,makeRequest);}catch(err2){callback(err2);}}else{makeRequest(undefined,realRequest);}}else{callback(err);}};},{"superagent":14}],8:[function(require,module,exports){// shim for using process in browser
var process=module.exports={};var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else{queueIndex=-1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return;}var timeout=setTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run();}}queueIndex=-1;len=queue.length;}currentQueue=null;draining=false;clearTimeout(timeout);}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){setTimeout(drainQueue,0);}};// v8 likes predictible objects
function Item(fun,array){this.fun=fun;this.array=array;}Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title='browser';process.browser=true;process.env={};process.argv=[];process.version='';// empty string to avoid regexp issues
process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return'/';};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;};},{}],9:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
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
'use strict';// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop);}module.exports=function(qs,sep,eq,options){sep=sep||'&';eq=eq||'=';var obj={};if(typeof qs!=='string'||qs.length===0){return obj;}var regexp=/\+/g;qs=qs.split(sep);var maxKeys=1000;if(options&&typeof options.maxKeys==='number'){maxKeys=options.maxKeys;}var len=qs.length;// maxKeys <= 0 means that we should not limit keys count
if(maxKeys>0&&len>maxKeys){len=maxKeys;}for(var i=0;i<len;++i){var x=qs[i].replace(regexp,'%20'),idx=x.indexOf(eq),kstr,vstr,k,v;if(idx>=0){kstr=x.substr(0,idx);vstr=x.substr(idx+1);}else{kstr=x;vstr='';}k=decodeURIComponent(kstr);v=decodeURIComponent(vstr);if(!hasOwnProperty(obj,k)){obj[k]=v;}else if(isArray(obj[k])){obj[k].push(v);}else{obj[k]=[obj[k],v];}}return obj;};var isArray=Array.isArray||function(xs){return Object.prototype.toString.call(xs)==='[object Array]';};},{}],10:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
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
'use strict';var stringifyPrimitive=function stringifyPrimitive(v){switch(typeof v==="undefined"?"undefined":_typeof(v)){case'string':return v;case'boolean':return v?'true':'false';case'number':return isFinite(v)?v:'';default:return'';}};module.exports=function(obj,sep,eq,name){sep=sep||'&';eq=eq||'=';if(obj===null){obj=undefined;}if((typeof obj==="undefined"?"undefined":_typeof(obj))==='object'){return map(objectKeys(obj),function(k){var ks=encodeURIComponent(stringifyPrimitive(k))+eq;if(isArray(obj[k])){return map(obj[k],function(v){return ks+encodeURIComponent(stringifyPrimitive(v));}).join(sep);}else{return ks+encodeURIComponent(stringifyPrimitive(obj[k]));}}).join(sep);}if(!name)return'';return encodeURIComponent(stringifyPrimitive(name))+eq+encodeURIComponent(stringifyPrimitive(obj));};var isArray=Array.isArray||function(xs){return Object.prototype.toString.call(xs)==='[object Array]';};function map(xs,f){if(xs.map)return xs.map(f);var res=[];for(var i=0;i<xs.length;i++){res.push(f(xs[i],i));}return res;}var objectKeys=Object.keys||function(obj){var res=[];for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))res.push(key);}return res;};},{}],11:[function(require,module,exports){'use strict';exports.decode=exports.parse=require('./decode');exports.encode=exports.stringify=require('./encode');},{"./decode":9,"./encode":10}],12:[function(require,module,exports){/**
 * Reduce `arr` with `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Mixed} initial
 *
 * TODO: combatible error handling?
 */module.exports=function(arr,fn,initial){var idx=0;var len=arr.length;var curr=arguments.length==3?initial:arr[idx++];while(idx<len){curr=fn.call(null,curr,arr[idx],++idx,arr);}return curr;};},{}],13:[function(require,module,exports){'use strict';module.exports=function(str){var isExtendedLengthPath=/^\\\\\?\\/.test(str);var hasNonAscii=/[^\x00-\x80]+/.test(str);if(isExtendedLengthPath||hasNonAscii){return str;}return str.replace(/\\/g,'/');};},{}],14:[function(require,module,exports){/**
 * Module dependencies.
 */var Emitter=require('emitter');var reduce=require('reduce');var requestBase=require('./request-base');var isObject=require('./is-object');/**
 * Root reference for iframes.
 */var root;if(typeof window!=='undefined'){// Browser window
root=window;}else if(typeof self!=='undefined'){// Web Worker
root=self;}else{// Other environments
root=this;}/**
 * Noop.
 */function noop(){};/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * TODO: future proof, move to compoent land
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */function isHost(obj){var str={}.toString.call(obj);switch(str){case'[object File]':case'[object Blob]':case'[object FormData]':return true;default:return false;}}/**
 * Expose `request`.
 */var request=module.exports=require('./request').bind(null,Request);/**
 * Determine XHR.
 */request.getXHR=function(){if(root.XMLHttpRequest&&(!root.location||'file:'!=root.location.protocol||!root.ActiveXObject)){return new XMLHttpRequest();}else{try{return new ActiveXObject('Microsoft.XMLHTTP');}catch(e){}try{return new ActiveXObject('Msxml2.XMLHTTP.6.0');}catch(e){}try{return new ActiveXObject('Msxml2.XMLHTTP.3.0');}catch(e){}try{return new ActiveXObject('Msxml2.XMLHTTP');}catch(e){}}return false;};/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */var trim=''.trim?function(s){return s.trim();}:function(s){return s.replace(/(^\s*|\s*$)/g,'');};/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */function serialize(obj){if(!isObject(obj))return obj;var pairs=[];for(var key in obj){if(null!=obj[key]){pushEncodedKeyValuePair(pairs,key,obj[key]);}}return pairs.join('&');}/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */function pushEncodedKeyValuePair(pairs,key,val){if(Array.isArray(val)){return val.forEach(function(v){pushEncodedKeyValuePair(pairs,key,v);});}pairs.push(encodeURIComponent(key)+'='+encodeURIComponent(val));}/**
 * Expose serialization method.
 */request.serializeObject=serialize;/**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */function parseString(str){var obj={};var pairs=str.split('&');var parts;var pair;for(var i=0,len=pairs.length;i<len;++i){pair=pairs[i];parts=pair.split('=');obj[decodeURIComponent(parts[0])]=decodeURIComponent(parts[1]);}return obj;}/**
 * Expose parser.
 */request.parseString=parseString;/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */request.types={html:'text/html',json:'application/json',xml:'application/xml',urlencoded:'application/x-www-form-urlencoded','form':'application/x-www-form-urlencoded','form-data':'application/x-www-form-urlencoded'};/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */request.serialize={'application/x-www-form-urlencoded':serialize,'application/json':JSON.stringify};/**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */request.parse={'application/x-www-form-urlencoded':parseString,'application/json':JSON.parse};/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */function parseHeader(str){var lines=str.split(/\r?\n/);var fields={};var index;var line;var field;var val;lines.pop();// trailing CRLF
for(var i=0,len=lines.length;i<len;++i){line=lines[i];index=line.indexOf(':');field=line.slice(0,index).toLowerCase();val=trim(line.slice(index+1));fields[field]=val;}return fields;}/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */function isJSON(mime){return /[\/+]json\b/.test(mime);}/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */function type(str){return str.split(/ *; */).shift();};/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */function params(str){return reduce(str.split(/ *; */),function(obj,str){var parts=str.split(/ *= */),key=parts.shift(),val=parts.shift();if(key&&val)obj[key]=val;return obj;},{});};/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */function Response(req,options){options=options||{};this.req=req;this.xhr=this.req.xhr;// responseText is accessible only if responseType is '' or 'text' and on older browsers
this.text=this.req.method!='HEAD'&&(this.xhr.responseType===''||this.xhr.responseType==='text')||typeof this.xhr.responseType==='undefined'?this.xhr.responseText:null;this.statusText=this.req.xhr.statusText;this.setStatusProperties(this.xhr.status);this.header=this.headers=parseHeader(this.xhr.getAllResponseHeaders());// getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
// getResponseHeader still works. so we get content-type even if getting
// other headers fails.
this.header['content-type']=this.xhr.getResponseHeader('content-type');this.setHeaderProperties(this.header);this.body=this.req.method!='HEAD'?this.parseBody(this.text?this.text:this.xhr.response):null;}/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */Response.prototype.get=function(field){return this.header[field.toLowerCase()];};/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */Response.prototype.setHeaderProperties=function(header){// content-type
var ct=this.header['content-type']||'';this.type=type(ct);// params
var obj=params(ct);for(var key in obj){this[key]=obj[key];}};/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */Response.prototype.parseBody=function(str){var parse=request.parse[this.type];if(!parse&&isJSON(this.type)){parse=request.parse['application/json'];}return parse&&str&&(str.length||str instanceof Object)?parse(str):null;};/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */Response.prototype.setStatusProperties=function(status){// handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
if(status===1223){status=204;}var type=status/100|0;// status / class
this.status=this.statusCode=status;this.statusType=type;// basics
this.info=1==type;this.ok=2==type;this.clientError=4==type;this.serverError=5==type;this.error=4==type||5==type?this.toError():false;// sugar
this.accepted=202==status;this.noContent=204==status;this.badRequest=400==status;this.unauthorized=401==status;this.notAcceptable=406==status;this.notFound=404==status;this.forbidden=403==status;};/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */Response.prototype.toError=function(){var req=this.req;var method=req.method;var url=req.url;var msg='cannot '+method+' '+url+' ('+this.status+')';var err=new Error(msg);err.status=this.status;err.method=method;err.url=url;return err;};/**
 * Expose `Response`.
 */request.Response=Response;/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */function Request(method,url){var self=this;this._query=this._query||[];this.method=method;this.url=url;this.header={};// preserves header name case
this._header={};// coerces header names to lowercase
this.on('end',function(){var err=null;var res=null;try{res=new Response(self);}catch(e){err=new Error('Parser is unable to parse the response');err.parse=true;err.original=e;// issue #675: return the raw response if the response parsing fails
err.rawResponse=self.xhr&&self.xhr.responseText?self.xhr.responseText:null;// issue #876: return the http status code if the response parsing fails
err.statusCode=self.xhr&&self.xhr.status?self.xhr.status:null;return self.callback(err);}self.emit('response',res);if(err){return self.callback(err,res);}if(res.status>=200&&res.status<300){return self.callback(err,res);}var new_err=new Error(res.statusText||'Unsuccessful HTTP response');new_err.original=err;new_err.response=res;new_err.status=res.status;self.callback(new_err,res);});}/**
 * Mixin `Emitter` and `requestBase`.
 */Emitter(Request.prototype);for(var key in requestBase){Request.prototype[key]=requestBase[key];}/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */Request.prototype.abort=function(){if(this.aborted)return;this.aborted=true;this.xhr.abort();this.clearTimeout();this.emit('abort');return this;};/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */Request.prototype.type=function(type){this.set('Content-Type',request.types[type]||type);return this;};/**
 * Set responseType to `val`. Presently valid responseTypes are 'blob' and 
 * 'arraybuffer'.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */Request.prototype.responseType=function(val){this._responseType=val;return this;};/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */Request.prototype.accept=function(type){this.set('Accept',request.types[type]||type);return this;};/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} pass
 * @param {Object} options with 'type' property 'auto' or 'basic' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */Request.prototype.auth=function(user,pass,options){if(!options){options={type:'basic'};}switch(options.type){case'basic':var str=btoa(user+':'+pass);this.set('Authorization','Basic '+str);break;case'auto':this.username=user;this.password=pass;break;}return this;};/**
* Add query-string `val`.
*
* Examples:
*
*   request.get('/shoes')
*     .query('size=10')
*     .query({ color: 'blue' })
*
* @param {Object|String} val
* @return {Request} for chaining
* @api public
*/Request.prototype.query=function(val){if('string'!=typeof val)val=serialize(val);if(val)this._query.push(val);return this;};/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `filename`.
 *
 * ``` js
 * request.post('/upload')
 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String} filename
 * @return {Request} for chaining
 * @api public
 */Request.prototype.attach=function(field,file,filename){this._getFormData().append(field,file,filename||file.name);return this;};Request.prototype._getFormData=function(){if(!this._formData){this._formData=new root.FormData();}return this._formData;};/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
  *      request.post('/user')
  *        .send('name=tobi')
  *        .send('species=ferret')
  *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */Request.prototype.send=function(data){var obj=isObject(data);var type=this._header['content-type'];// merge
if(obj&&isObject(this._data)){for(var key in data){this._data[key]=data[key];}}else if('string'==typeof data){if(!type)this.type('form');type=this._header['content-type'];if('application/x-www-form-urlencoded'==type){this._data=this._data?this._data+'&'+data:data;}else{this._data=(this._data||'')+data;}}else{this._data=data;}if(!obj||isHost(data))return this;if(!type)this.type('json');return this;};/**
 * @deprecated
 */Response.prototype.parse=function serialize(fn){if(root.console){console.warn("Client-side parse() method has been renamed to serialize(). This method is not compatible with superagent v2.0");}this.serialize(fn);return this;};Response.prototype.serialize=function serialize(fn){this._parser=fn;return this;};/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */Request.prototype.callback=function(err,res){var fn=this._callback;this.clearTimeout();fn(err,res);};/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */Request.prototype.crossDomainError=function(){var err=new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');err.crossDomain=true;err.status=this.status;err.method=this.method;err.url=this.url;this.callback(err);};/**
 * Invoke callback with timeout error.
 *
 * @api private
 */Request.prototype.timeoutError=function(){var timeout=this._timeout;var err=new Error('timeout of '+timeout+'ms exceeded');err.timeout=timeout;this.callback(err);};/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */Request.prototype.withCredentials=function(){this._withCredentials=true;return this;};/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */Request.prototype.end=function(fn){var self=this;var xhr=this.xhr=request.getXHR();var query=this._query.join('&');var timeout=this._timeout;var data=this._formData||this._data;// store callback
this._callback=fn||noop;// state change
xhr.onreadystatechange=function(){if(4!=xhr.readyState)return;// In IE9, reads to any property (e.g. status) off of an aborted XHR will
// result in the error "Could not complete the operation due to error c00c023f"
var status;try{status=xhr.status;}catch(e){status=0;}if(0==status){if(self.timedout)return self.timeoutError();if(self.aborted)return;return self.crossDomainError();}self.emit('end');};// progress
var handleProgress=function handleProgress(e){if(e.total>0){e.percent=e.loaded/e.total*100;}e.direction='download';self.emit('progress',e);};if(this.hasListeners('progress')){xhr.onprogress=handleProgress;}try{if(xhr.upload&&this.hasListeners('progress')){xhr.upload.onprogress=handleProgress;}}catch(e){}// Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
// Reported here:
// https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
// timeout
if(timeout&&!this._timer){this._timer=setTimeout(function(){self.timedout=true;self.abort();},timeout);}// querystring
if(query){query=request.serializeObject(query);this.url+=~this.url.indexOf('?')?'&'+query:'?'+query;}// initiate request
if(this.username&&this.password){xhr.open(this.method,this.url,true,this.username,this.password);}else{xhr.open(this.method,this.url,true);}// CORS
if(this._withCredentials)xhr.withCredentials=true;// body
if('GET'!=this.method&&'HEAD'!=this.method&&'string'!=typeof data&&!isHost(data)){// serialize stuff
var contentType=this._header['content-type'];var serialize=this._parser||request.serialize[contentType?contentType.split(';')[0]:''];if(!serialize&&isJSON(contentType))serialize=request.serialize['application/json'];if(serialize)data=serialize(data);}// set header fields
for(var field in this.header){if(null==this.header[field])continue;xhr.setRequestHeader(field,this.header[field]);}if(this._responseType){xhr.responseType=this._responseType;}// send stuff
this.emit('request',this);// IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
// We need null here if data is undefined
xhr.send(typeof data!=='undefined'?data:null);return this;};/**
 * Expose `Request`.
 */request.Request=Request;/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */request.get=function(url,data,fn){var req=request('GET',url);if('function'==typeof data)fn=data,data=null;if(data)req.query(data);if(fn)req.end(fn);return req;};/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */request.head=function(url,data,fn){var req=request('HEAD',url);if('function'==typeof data)fn=data,data=null;if(data)req.send(data);if(fn)req.end(fn);return req;};/**
 * DELETE `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Request}
 * @api public
 */function del(url,fn){var req=request('DELETE',url);if(fn)req.end(fn);return req;};request['del']=del;request['delete']=del;/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */request.patch=function(url,data,fn){var req=request('PATCH',url);if('function'==typeof data)fn=data,data=null;if(data)req.send(data);if(fn)req.end(fn);return req;};/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */request.post=function(url,data,fn){var req=request('POST',url);if('function'==typeof data)fn=data,data=null;if(data)req.send(data);if(fn)req.end(fn);return req;};/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */request.put=function(url,data,fn){var req=request('PUT',url);if('function'==typeof data)fn=data,data=null;if(data)req.send(data);if(fn)req.end(fn);return req;};},{"./is-object":15,"./request":17,"./request-base":16,"emitter":2,"reduce":12}],15:[function(require,module,exports){/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */function isObject(obj){return null!=obj&&'object'==(typeof obj==="undefined"?"undefined":_typeof(obj));}module.exports=isObject;},{}],16:[function(require,module,exports){/**
 * Module of mixed-in functions shared between node and client code
 */var isObject=require('./is-object');/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */exports.clearTimeout=function _clearTimeout(){this._timeout=0;clearTimeout(this._timer);return this;};/**
 * Force given parser
 *
 * Sets the body parser no matter type.
 *
 * @param {Function}
 * @api public
 */exports.parse=function parse(fn){this._parser=fn;return this;};/**
 * Set timeout to `ms`.
 *
 * @param {Number} ms
 * @return {Request} for chaining
 * @api public
 */exports.timeout=function timeout(ms){this._timeout=ms;return this;};/**
 * Faux promise support
 *
 * @param {Function} fulfill
 * @param {Function} reject
 * @return {Request}
 */exports.then=function then(fulfill,reject){return this.end(function(err,res){err?reject(err):fulfill(res);});};/**
 * Allow for extension
 */exports.use=function use(fn){fn(this);return this;};/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */exports.get=function(field){return this._header[field.toLowerCase()];};/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */exports.getHeader=exports.get;/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */exports.set=function(field,val){if(isObject(field)){for(var key in field){this.set(key,field[key]);}return this;}this._header[field.toLowerCase()]=val;this.header[field]=val;return this;};/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */exports.unset=function(field){delete this._header[field.toLowerCase()];delete this.header[field];return this;};/**
 * Write the field `name` and `val` for "multipart/form-data"
 * request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 * ```
 *
 * @param {String} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */exports.field=function(name,val){this._getFormData().append(name,val);return this;};},{"./is-object":15}],17:[function(require,module,exports){// The node and browser modules expose versions of this with the
// appropriate constructor function bound as first argument
/**
 * Issue a request:
 *
 * Examples:
 *
 *    request('GET', '/users').end(callback)
 *    request('/users').end(callback)
 *    request('/users', callback)
 *
 * @param {String} method
 * @param {String|Function} url or callback
 * @return {Request}
 * @api public
 */function request(RequestConstructor,method,url){// callback
if('function'==typeof url){return new RequestConstructor('GET',method).end(url);}// url first
if(2==arguments.length){return new RequestConstructor('GET',method);}return new RequestConstructor(method,url);}module.exports=request;},{}],18:[function(require,module,exports){/*! https://mths.be/punycode v1.3.2 by @mathias, modified for URI.js */var punycode=function(){/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */var punycode,/** Highest positive signed 32-bit float value */maxInt=2147483647,// aka. 0x7FFFFFFF or 2^31-1
/** Bootstring parameters */base=36,tMin=1,tMax=26,skew=38,damp=700,initialBias=72,initialN=128,// 0x80
delimiter='-',// '\x2D'
/** Regular expressions */regexPunycode=/^xn--/,regexNonASCII=/[^\x20-\x7E]/,// unprintable ASCII chars + non-ASCII chars
regexSeparators=/[\x2E\u3002\uFF0E\uFF61]/g,// RFC 3490 separators
/** Error messages */errors={'overflow':'Overflow: input needs wider integers to process','not-basic':'Illegal input >= 0x80 (not a basic code point)','invalid-input':'Invalid input'},/** Convenience shortcuts */baseMinusTMin=base-tMin,floor=Math.floor,stringFromCharCode=String.fromCharCode,/** Temporary variable */key;/*--------------------------------------------------------------------------*//**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */function error(type){throw new RangeError(errors[type]);}/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */function map(array,fn){var length=array.length;var result=[];while(length--){result[length]=fn(array[length]);}return result;}/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */function mapDomain(string,fn){var parts=string.split('@');var result='';if(parts.length>1){// In email addresses, only the domain name should be punycoded. Leave
// the local part (i.e. everything up to `@`) intact.
result=parts[0]+'@';string=parts[1];}// Avoid `split(regex)` for IE8 compatibility. See #17.
string=string.replace(regexSeparators,'\x2E');var labels=string.split('.');var encoded=map(labels,fn).join('.');return result+encoded;}/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */function ucs2decode(string){var output=[],counter=0,length=string.length,value,extra;while(counter<length){value=string.charCodeAt(counter++);if(value>=0xD800&&value<=0xDBFF&&counter<length){// high surrogate, and there is a next character
extra=string.charCodeAt(counter++);if((extra&0xFC00)==0xDC00){// low surrogate
output.push(((value&0x3FF)<<10)+(extra&0x3FF)+0x10000);}else{// unmatched surrogate; only append this code unit, in case the next
// code unit is the high surrogate of a surrogate pair
output.push(value);counter--;}}else{output.push(value);}}return output;}/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */function ucs2encode(array){return map(array,function(value){var output='';if(value>0xFFFF){value-=0x10000;output+=stringFromCharCode(value>>>10&0x3FF|0xD800);value=0xDC00|value&0x3FF;}output+=stringFromCharCode(value);return output;}).join('');}/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */function basicToDigit(codePoint){if(codePoint-48<10){return codePoint-22;}if(codePoint-65<26){return codePoint-65;}if(codePoint-97<26){return codePoint-97;}return base;}/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */function digitToBasic(digit,flag){//  0..25 map to ASCII a..z or A..Z
// 26..35 map to ASCII 0..9
return digit+22+75*(digit<26)-((flag!=0)<<5);}/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */function adapt(delta,numPoints,firstTime){var k=0;delta=firstTime?floor(delta/damp):delta>>1;delta+=floor(delta/numPoints);for(;/* no initialization */delta>baseMinusTMin*tMax>>1;k+=base){delta=floor(delta/baseMinusTMin);}return floor(k+(baseMinusTMin+1)*delta/(delta+skew));}/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */function decode(input){// Don't use UCS-2
var output=[],inputLength=input.length,out,i=0,n=initialN,bias=initialBias,basic,j,index,oldi,w,k,digit,t,/** Cached calculation results */baseMinusT;// Handle the basic code points: let `basic` be the number of input code
// points before the last delimiter, or `0` if there is none, then copy
// the first basic code points to the output.
basic=input.lastIndexOf(delimiter);if(basic<0){basic=0;}for(j=0;j<basic;++j){// if it's not a basic code point
if(input.charCodeAt(j)>=0x80){error('not-basic');}output.push(input.charCodeAt(j));}// Main decoding loop: start just after the last delimiter if any basic code
// points were copied; start at the beginning otherwise.
for(index=basic>0?basic+1:0;index<inputLength;)/* no final expression */{// `index` is the index of the next character to be consumed.
// Decode a generalized variable-length integer into `delta`,
// which gets added to `i`. The overflow checking is easier
// if we increase `i` as we go, then subtract off its starting
// value at the end to obtain `delta`.
for(oldi=i,w=1,k=base;;/* no condition */k+=base){if(index>=inputLength){error('invalid-input');}digit=basicToDigit(input.charCodeAt(index++));if(digit>=base||digit>floor((maxInt-i)/w)){error('overflow');}i+=digit*w;t=k<=bias?tMin:k>=bias+tMax?tMax:k-bias;if(digit<t){break;}baseMinusT=base-t;if(w>floor(maxInt/baseMinusT)){error('overflow');}w*=baseMinusT;}out=output.length+1;bias=adapt(i-oldi,out,oldi==0);// `i` was supposed to wrap around from `out` to `0`,
// incrementing `n` each time, so we'll fix that now:
if(floor(i/out)>maxInt-n){error('overflow');}n+=floor(i/out);i%=out;// Insert `n` at position `i` of the output
output.splice(i++,0,n);}return ucs2encode(output);}/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */function encode(input){var n,delta,handledCPCount,basicLength,bias,j,m,q,k,t,currentValue,output=[],/** `inputLength` will hold the number of code points in `input`. */inputLength,/** Cached calculation results */handledCPCountPlusOne,baseMinusT,qMinusT;// Convert the input in UCS-2 to Unicode
input=ucs2decode(input);// Cache the length
inputLength=input.length;// Initialize the state
n=initialN;delta=0;bias=initialBias;// Handle the basic code points
for(j=0;j<inputLength;++j){currentValue=input[j];if(currentValue<0x80){output.push(stringFromCharCode(currentValue));}}handledCPCount=basicLength=output.length;// `handledCPCount` is the number of code points that have been handled;
// `basicLength` is the number of basic code points.
// Finish the basic string - if it is not empty - with a delimiter
if(basicLength){output.push(delimiter);}// Main encoding loop:
while(handledCPCount<inputLength){// All non-basic code points < n have been handled already. Find the next
// larger one:
for(m=maxInt,j=0;j<inputLength;++j){currentValue=input[j];if(currentValue>=n&&currentValue<m){m=currentValue;}}// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
// but guard against overflow
handledCPCountPlusOne=handledCPCount+1;if(m-n>floor((maxInt-delta)/handledCPCountPlusOne)){error('overflow');}delta+=(m-n)*handledCPCountPlusOne;n=m;for(j=0;j<inputLength;++j){currentValue=input[j];if(currentValue<n&&++delta>maxInt){error('overflow');}if(currentValue==n){// Represent delta as a generalized variable-length integer
for(q=delta,k=base;;/* no condition */k+=base){t=k<=bias?tMin:k>=bias+tMax?tMax:k-bias;if(q<t){break;}qMinusT=q-t;baseMinusT=base-t;output.push(stringFromCharCode(digitToBasic(t+qMinusT%baseMinusT,0)));q=floor(qMinusT/baseMinusT);}output.push(stringFromCharCode(digitToBasic(q,0)));bias=adapt(delta,handledCPCountPlusOne,handledCPCount==basicLength);delta=0;++handledCPCount;}}++delta;++n;}return output.join('');}/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */function toUnicode(input){return mapDomain(input,function(string){return regexPunycode.test(string)?decode(string.slice(4).toLowerCase()):string;});}/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */function toASCII(input){return mapDomain(input,function(string){return regexNonASCII.test(string)?'xn--'+encode(string):string;});}/*--------------------------------------------------------------------------*//** Define the public API */punycode={/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */version:'1.3.2',/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */ucs2:{decode:ucs2decode,encode:ucs2encode},decode:decode,encode:encode,toASCII:toASCII,toUnicode:toUnicode};return punycode;}();if(typeof COMPILED==="undefined"&&typeof module!=="undefined")module.exports=punycode;},{}],19:[function(require,module,exports){///<reference path="commonjs.d.ts"/>
require("./schemes/http");require("./schemes/urn");require("./schemes/mailto");},{"./schemes/http":20,"./schemes/mailto":21,"./schemes/urn":22}],20:[function(require,module,exports){///<reference path="../uri.ts"/>
if(typeof COMPILED==="undefined"&&typeof URI==="undefined"&&typeof require==="function")var URI=require("../uri");URI.SCHEMES["http"]=URI.SCHEMES["https"]={domainHost:true,parse:function parse(components,options){//report missing host
if(!components.host){components.error=components.error||"HTTP URIs must have a host.";}return components;},serialize:function serialize(components,options){//normalize the default port
if(components.port===(String(components.scheme).toLowerCase()!=="https"?80:443)||components.port===""){components.port=undefined;}//normalize the empty path
if(!components.path){components.path="/";}//NOTE: We do not parse query strings for HTTP URIs
//as WWW Form Url Encoded query strings are part of the HTML4+ spec,
//and not the HTTP spec. 
return components;}};},{"../uri":23}],21:[function(require,module,exports){///<reference path="../uri.ts"/>
if(typeof COMPILED==="undefined"&&typeof URI==="undefined"&&typeof require==="function"){var URI=require("../uri"),punycode=require("../punycode");}(function(){function merge(){var sets=[];for(var _i=0;_i<arguments.length;_i++){sets[_i-0]=arguments[_i];}if(sets.length>1){sets[0]=sets[0].slice(0,-1);var xl=sets.length-1;for(var x=1;x<xl;++x){sets[x]=sets[x].slice(1,-1);}sets[xl]=sets[xl].slice(1);return sets.join('');}else{return sets[0];}}function subexp(str){return"(?:"+str+")";}var O={},isIRI=URI.IRI_SUPPORT,//RFC 3986
UNRESERVED$$="[A-Za-z0-9\\-\\.\\_\\~"+(isIRI?"\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF":"")+"]",HEXDIG$$="[0-9A-Fa-f]",PCT_ENCODED$=subexp(subexp("%[EFef]"+HEXDIG$$+"%"+HEXDIG$$+HEXDIG$$+"%"+HEXDIG$$+HEXDIG$$)+"|"+subexp("%[89A-Fa-f]"+HEXDIG$$+"%"+HEXDIG$$+HEXDIG$$)+"|"+subexp("%"+HEXDIG$$+HEXDIG$$)),//RFC 5322, except these symbols as per RFC 6068: @ : / ? # [ ] & ; = 
//ATEXT$$ = "[A-Za-z0-9\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\_\\`\\{\\|\\}\\~]",
//WSP$$ = "[\\x20\\x09]",
//OBS_QTEXT$$ = "[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]",  //(%d1-8 / %d11-12 / %d14-31 / %d127)
//QTEXT$$ = merge("[\\x21\\x23-\\x5B\\x5D-\\x7E]", OBS_QTEXT$$),  //%d33 / %d35-91 / %d93-126 / obs-qtext
//VCHAR$$ = "[\\x21-\\x7E]",
//WSP$$ = "[\\x20\\x09]",
//OBS_QP$ = subexp("\\\\" + merge("[\\x00\\x0D\\x0A]", OBS_QTEXT$$)),  //%d0 / CR / LF / obs-qtext
//FWS$ = subexp(subexp(WSP$$ + "*" + "\\x0D\\x0A") + "?" + WSP$$ + "+"),
//QUOTED_PAIR$ = subexp(subexp("\\\\" + subexp(VCHAR$$ + "|" + WSP$$)) + "|" + OBS_QP$),
//QUOTED_STRING$ = subexp('\\"' + subexp(FWS$ + "?" + QCONTENT$) + "*" + FWS$ + "?" + '\\"'),
ATEXT$$="[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]",QTEXT$$="[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]",VCHAR$$=merge(QTEXT$$,"[\\\"\\\\]"),DOT_ATOM_TEXT$=subexp(ATEXT$$+"+"+subexp("\\."+ATEXT$$+"+")+"*"),QUOTED_PAIR$=subexp("\\\\"+VCHAR$$),QCONTENT$=subexp(QTEXT$$+"|"+QUOTED_PAIR$),QUOTED_STRING$=subexp('\\"'+QCONTENT$+"*"+'\\"'),//RFC 6068
DTEXT_NO_OBS$$="[\\x21-\\x5A\\x5E-\\x7E]",SOME_DELIMS$$="[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]",QCHAR$=subexp(UNRESERVED$$+"|"+PCT_ENCODED$+"|"+SOME_DELIMS$$),DOMAIN$=subexp(DOT_ATOM_TEXT$+"|"+"\\["+DTEXT_NO_OBS$$+"*"+"\\]"),LOCAL_PART$=subexp(DOT_ATOM_TEXT$+"|"+QUOTED_STRING$),ADDR_SPEC$=subexp(LOCAL_PART$+"\\@"+DOMAIN$),TO$=subexp(ADDR_SPEC$+subexp("\\,"+ADDR_SPEC$)+"*"),HFNAME$=subexp(QCHAR$+"*"),HFVALUE$=HFNAME$,HFIELD$=subexp(HFNAME$+"\\="+HFVALUE$),HFIELDS2$=subexp(HFIELD$+subexp("\\&"+HFIELD$)+"*"),HFIELDS$=subexp("\\?"+HFIELDS2$),MAILTO_URI=URI.VALIDATE_SUPPORT&&new RegExp("^mailto\\:"+TO$+"?"+HFIELDS$+"?$"),UNRESERVED=new RegExp(UNRESERVED$$,"g"),PCT_ENCODED=new RegExp(PCT_ENCODED$,"g"),NOT_LOCAL_PART=new RegExp(merge("[^]",ATEXT$$,"[\\.]",'[\\"]',VCHAR$$),"g"),NOT_DOMAIN=new RegExp(merge("[^]",ATEXT$$,"[\\.]","[\\[]",DTEXT_NO_OBS$$,"[\\]]"),"g"),NOT_HFNAME=new RegExp(merge("[^]",UNRESERVED$$,SOME_DELIMS$$),"g"),NOT_HFVALUE=NOT_HFNAME,TO=URI.VALIDATE_SUPPORT&&new RegExp("^"+TO$+"$"),HFIELDS=URI.VALIDATE_SUPPORT&&new RegExp("^"+HFIELDS2$+"$");function toUpperCase(str){return str.toUpperCase();}function decodeUnreserved(str){var decStr=URI.pctDecChars(str);return!decStr.match(UNRESERVED)?str:decStr;}function toArray(obj){return obj!==undefined&&obj!==null?obj instanceof Array&&!obj.callee?obj:typeof obj.length!=="number"||obj.split||obj.setInterval||obj.call?[obj]:Array.prototype.slice.call(obj):[];}URI.SCHEMES["mailto"]={parse:function parse(components,options){if(URI.VALIDATE_SUPPORT&&!components.error){if(components.path&&!TO.test(components.path)){components.error="Email address is not valid";}else if(components.query&&!HFIELDS.test(components.query)){components.error="Header fields are invalid";}}var to=components.to=components.path?components.path.split(","):[];components.path=undefined;if(components.query){var unknownHeaders=false,headers={};var hfields=components.query.split("&");for(var x=0,xl=hfields.length;x<xl;++x){var hfield=hfields[x].split("=");switch(hfield[0]){case"to":var toAddrs=hfield[1].split(",");for(var x_1=0,xl_1=toAddrs.length;x_1<xl_1;++x_1){to.push(toAddrs[x_1]);}break;case"subject":components.subject=URI.unescapeComponent(hfield[1],options);break;case"body":components.body=URI.unescapeComponent(hfield[1],options);break;default:unknownHeaders=true;headers[URI.unescapeComponent(hfield[0],options)]=URI.unescapeComponent(hfield[1],options);break;}}if(unknownHeaders)components.headers=headers;}components.query=undefined;for(var x=0,xl=to.length;x<xl;++x){var addr=to[x].split("@");addr[0]=URI.unescapeComponent(addr[0]);if(typeof punycode!=="undefined"&&!options.unicodeSupport){//convert Unicode IDN -> ASCII IDN
try{addr[1]=punycode.toASCII(URI.unescapeComponent(addr[1],options).toLowerCase());}catch(e){components.error=components.error||"Email address's domain name can not be converted to ASCII via punycode: "+e;}}else{addr[1]=URI.unescapeComponent(addr[1],options).toLowerCase();}to[x]=addr.join("@");}return components;},serialize:function serialize(components,options){var to=toArray(components.to);if(to){for(var x=0,xl=to.length;x<xl;++x){var toAddr=String(to[x]);var atIdx=toAddr.lastIndexOf("@");var localPart=toAddr.slice(0,atIdx);var domain=toAddr.slice(atIdx+1);localPart=localPart.replace(PCT_ENCODED,decodeUnreserved).replace(PCT_ENCODED,toUpperCase).replace(NOT_LOCAL_PART,URI.pctEncChar);if(typeof punycode!=="undefined"){//convert IDN via punycode
try{domain=!options.iri?punycode.toASCII(URI.unescapeComponent(domain,options).toLowerCase()):punycode.toUnicode(domain);}catch(e){components.error=components.error||"Email address's domain name can not be converted to "+(!options.iri?"ASCII":"Unicode")+" via punycode: "+e;}}else{domain=domain.replace(PCT_ENCODED,decodeUnreserved).toLowerCase().replace(PCT_ENCODED,toUpperCase).replace(NOT_DOMAIN,URI.pctEncChar);}to[x]=localPart+"@"+domain;}components.path=to.join(",");}var headers=components.headers=components.headers||{};if(components.subject)headers["subject"]=components.subject;if(components.body)headers["body"]=components.body;var fields=[];for(var name_1 in headers){if(headers[name_1]!==O[name_1]){fields.push(name_1.replace(PCT_ENCODED,decodeUnreserved).replace(PCT_ENCODED,toUpperCase).replace(NOT_HFNAME,URI.pctEncChar)+"="+headers[name_1].replace(PCT_ENCODED,decodeUnreserved).replace(PCT_ENCODED,toUpperCase).replace(NOT_HFVALUE,URI.pctEncChar));}}if(fields.length){components.query=fields.join("&");}return components;}};})();},{"../punycode":18,"../uri":23}],22:[function(require,module,exports){///<reference path="../uri.ts"/>
if(typeof COMPILED==="undefined"&&typeof URI==="undefined"&&typeof require==="function")var URI=require("../uri");(function(){var pctEncChar=URI.pctEncChar,NID$="(?:[0-9A-Za-z][0-9A-Za-z\\-]{1,31})",PCT_ENCODED$="(?:\\%[0-9A-Fa-f]{2})",TRANS$$="[0-9A-Za-z\\(\\)\\+\\,\\-\\.\\:\\=\\@\\;\\$\\_\\!\\*\\'\\/\\?\\#]",NSS$="(?:(?:"+PCT_ENCODED$+"|"+TRANS$$+")+)",URN_SCHEME=new RegExp("^urn\\:("+NID$+")$"),URN_PATH=new RegExp("^("+NID$+")\\:("+NSS$+")$"),URN_PARSE=/^([^\:]+)\:(.*)/,URN_EXCLUDED=/[\x00-\x20\\\"\&\<\>\[\]\^\`\{\|\}\~\x7F-\xFF]/g,UUID=/^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;//RFC 2141
URI.SCHEMES["urn"]={parse:function parse(components,options){var matches=components.path.match(URN_PATH),scheme,schemeHandler;if(!matches){if(!options.tolerant){components.error=components.error||"URN is not strictly valid.";}matches=components.path.match(URN_PARSE);}if(matches){scheme="urn:"+matches[1].toLowerCase();schemeHandler=URI.SCHEMES[scheme];//in order to serialize properly, 
//every URN must have a serializer that calls the URN serializer 
if(!schemeHandler){//create fake scheme handler
schemeHandler=URI.SCHEMES[scheme]={parse:function parse(components,options){return components;},serialize:URI.SCHEMES["urn"].serialize};}components.scheme=scheme;components.path=matches[2];components=schemeHandler.parse(components,options);}else{components.error=components.error||"URN can not be parsed.";}return components;},serialize:function serialize(components,options){var scheme=components.scheme||options.scheme,matches;if(scheme&&scheme!=="urn"){var matches=scheme.match(URN_SCHEME);if(!matches){matches=["urn:"+scheme,scheme];}components.scheme="urn";components.path=matches[1]+":"+(components.path?components.path.replace(URN_EXCLUDED,pctEncChar):"");}return components;}};//RFC 4122
URI.SCHEMES["urn:uuid"]={parse:function parse(components,options){if(!options.tolerant&&(!components.path||!components.path.match(UUID))){components.error=components.error||"UUID is not valid.";}return components;},serialize:function serialize(components,options){//ensure UUID is valid
if(!options.tolerant&&(!components.path||!components.path.match(UUID))){//invalid UUIDs can not have this scheme
components.scheme=undefined;}else{//normalize UUID
components.path=(components.path||"").toLowerCase();}return URI.SCHEMES["urn"].serialize(components,options);}};})();},{"../uri":23}],23:[function(require,module,exports){/**
 * URI.js
 *
 * @fileoverview An RFC 3986 compliant, scheme extendable URI parsing/validating/resolving library for JavaScript.
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @version 2.0.0
 * @see http://github.com/garycourt/uri-js
 * @license URI.js v2.0.0 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js
 *//**
 * Copyright 2011 Gary Court. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 *
 *    1. Redistributions of source code must retain the above copyright notice, this list of
 *       conditions and the following disclaimer.
 *
 *    2. Redistributions in binary form must reproduce the above copyright notice, this list
 *       of conditions and the following disclaimer in the documentation and/or other materials
 *       provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY GARY COURT ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GARY COURT OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of Gary Court.
 *////<reference path="punycode.d.ts"/>
///<reference path="commonjs.d.ts"/>
/**
 * Compiler switch for indicating code is compiled
 * @define {boolean}
 */var COMPILED=false;/**
 * Compiler switch for supporting IRI URIs
 * @define {boolean}
 */var URI__IRI_SUPPORT=true;/**
 * Compiler switch for supporting URI validation
 * @define {boolean}
 */var URI__VALIDATE_SUPPORT=true;var URI=function(){function merge(){var sets=[];for(var _i=0;_i<arguments.length;_i++){sets[_i-0]=arguments[_i];}if(sets.length>1){sets[0]=sets[0].slice(0,-1);var xl=sets.length-1;for(var x=1;x<xl;++x){sets[x]=sets[x].slice(1,-1);}sets[xl]=sets[xl].slice(1);return sets.join('');}else{return sets[0];}}function subexp(str){return"(?:"+str+")";}function buildExps(isIRI){var ALPHA$$="[A-Za-z]",CR$="[\\x0D]",DIGIT$$="[0-9]",DQUOTE$$="[\\x22]",HEXDIG$$=merge(DIGIT$$,"[A-Fa-f]"),LF$$="[\\x0A]",SP$$="[\\x20]",PCT_ENCODED$=subexp(subexp("%[EFef]"+HEXDIG$$+"%"+HEXDIG$$+HEXDIG$$+"%"+HEXDIG$$+HEXDIG$$)+"|"+subexp("%[89A-Fa-f]"+HEXDIG$$+"%"+HEXDIG$$+HEXDIG$$)+"|"+subexp("%"+HEXDIG$$+HEXDIG$$)),GEN_DELIMS$$="[\\:\\/\\?\\#\\[\\]\\@]",SUB_DELIMS$$="[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",RESERVED$$=merge(GEN_DELIMS$$,SUB_DELIMS$$),UCSCHAR$$=isIRI?"[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]":"[]",IPRIVATE$$=isIRI?"[\\uE000-\\uF8FF]":"[]",UNRESERVED$$=merge(ALPHA$$,DIGIT$$,"[\\-\\.\\_\\~]",UCSCHAR$$),SCHEME$=subexp(ALPHA$$+merge(ALPHA$$,DIGIT$$,"[\\+\\-\\.]")+"*"),USERINFO$=subexp(subexp(PCT_ENCODED$+"|"+merge(UNRESERVED$$,SUB_DELIMS$$,"[\\:]"))+"*"),DEC_OCTET$=subexp(subexp("25[0-5]")+"|"+subexp("2[0-4]"+DIGIT$$)+"|"+subexp("1"+DIGIT$$+DIGIT$$)+"|"+subexp("[1-9]"+DIGIT$$)+"|"+DIGIT$$),IPV4ADDRESS$=subexp(DEC_OCTET$+"\\."+DEC_OCTET$+"\\."+DEC_OCTET$+"\\."+DEC_OCTET$),H16$=subexp(HEXDIG$$+"{1,4}"),LS32$=subexp(subexp(H16$+"\\:"+H16$)+"|"+IPV4ADDRESS$),IPV6ADDRESS$=subexp(merge(UNRESERVED$$,SUB_DELIMS$$,"[\\:]")+"+"),IPVFUTURE$=subexp("v"+HEXDIG$$+"+\\."+merge(UNRESERVED$$,SUB_DELIMS$$,"[\\:]")+"+"),IP_LITERAL$=subexp("\\["+subexp(IPV6ADDRESS$+"|"+IPVFUTURE$)+"\\]"),REG_NAME$=subexp(subexp(PCT_ENCODED$+"|"+merge(UNRESERVED$$,SUB_DELIMS$$))+"*"),HOST$=subexp(IP_LITERAL$+"|"+IPV4ADDRESS$+"(?!"+REG_NAME$+")"+"|"+REG_NAME$),PORT$=subexp(DIGIT$$+"*"),AUTHORITY$=subexp(subexp(USERINFO$+"@")+"?"+HOST$+subexp("\\:"+PORT$)+"?"),PCHAR$=subexp(PCT_ENCODED$+"|"+merge(UNRESERVED$$,SUB_DELIMS$$,"[\\:\\@]")),SEGMENT$=subexp(PCHAR$+"*"),SEGMENT_NZ$=subexp(PCHAR$+"+"),SEGMENT_NZ_NC$=subexp(subexp(PCT_ENCODED$+"|"+merge(UNRESERVED$$,SUB_DELIMS$$,"[\\@]"))+"+"),PATH_ABEMPTY$=subexp(subexp("\\/"+SEGMENT$)+"*"),PATH_ABSOLUTE$=subexp("\\/"+subexp(SEGMENT_NZ$+PATH_ABEMPTY$)+"?"),PATH_NOSCHEME$=subexp(SEGMENT_NZ_NC$+PATH_ABEMPTY$),PATH_ROOTLESS$=subexp(SEGMENT_NZ$+PATH_ABEMPTY$),PATH_EMPTY$="(?!"+PCHAR$+")",PATH$=subexp(PATH_ABEMPTY$+"|"+PATH_ABSOLUTE$+"|"+PATH_NOSCHEME$+"|"+PATH_ROOTLESS$+"|"+PATH_EMPTY$),QUERY$=subexp(subexp(PCHAR$+"|"+merge("[\\/\\?]",IPRIVATE$$))+"*"),FRAGMENT$=subexp(subexp(PCHAR$+"|[\\/\\?]")+"*"),HIER_PART$=subexp(subexp("\\/\\/"+AUTHORITY$+PATH_ABEMPTY$)+"|"+PATH_ABSOLUTE$+"|"+PATH_ROOTLESS$+"|"+PATH_EMPTY$),URI$=subexp(SCHEME$+"\\:"+HIER_PART$+subexp("\\?"+QUERY$)+"?"+subexp("\\#"+FRAGMENT$)+"?"),RELATIVE_PART$=subexp(subexp("\\/\\/"+AUTHORITY$+PATH_ABEMPTY$)+"|"+PATH_ABSOLUTE$+"|"+PATH_NOSCHEME$+"|"+PATH_EMPTY$),RELATIVE$=subexp(RELATIVE_PART$+subexp("\\?"+QUERY$)+"?"+subexp("\\#"+FRAGMENT$)+"?"),URI_REFERENCE$=subexp(URI$+"|"+RELATIVE$),ABSOLUTE_URI$=subexp(SCHEME$+"\\:"+HIER_PART$+subexp("\\?"+QUERY$)+"?"),GENERIC_REF$="^("+SCHEME$+")\\:"+subexp(subexp("\\/\\/("+subexp("("+USERINFO$+")@")+"?("+HOST$+")"+subexp("\\:("+PORT$+")")+"?)")+"?("+PATH_ABEMPTY$+"|"+PATH_ABSOLUTE$+"|"+PATH_ROOTLESS$+"|"+PATH_EMPTY$+")")+subexp("\\?("+QUERY$+")")+"?"+subexp("\\#("+FRAGMENT$+")")+"?$",RELATIVE_REF$="^(){0}"+subexp(subexp("\\/\\/("+subexp("("+USERINFO$+")@")+"?("+HOST$+")"+subexp("\\:("+PORT$+")")+"?)")+"?("+PATH_ABEMPTY$+"|"+PATH_ABSOLUTE$+"|"+PATH_NOSCHEME$+"|"+PATH_EMPTY$+")")+subexp("\\?("+QUERY$+")")+"?"+subexp("\\#("+FRAGMENT$+")")+"?$",ABSOLUTE_REF$="^("+SCHEME$+")\\:"+subexp(subexp("\\/\\/("+subexp("("+USERINFO$+")@")+"?("+HOST$+")"+subexp("\\:("+PORT$+")")+"?)")+"?("+PATH_ABEMPTY$+"|"+PATH_ABSOLUTE$+"|"+PATH_ROOTLESS$+"|"+PATH_EMPTY$+")")+subexp("\\?("+QUERY$+")")+"?$",SAMEDOC_REF$="^"+subexp("\\#("+FRAGMENT$+")")+"?$",AUTHORITY_REF$="^"+subexp("("+USERINFO$+")@")+"?("+HOST$+")"+subexp("\\:("+PORT$+")")+"?$";return{URI_REF:URI__VALIDATE_SUPPORT&&new RegExp("("+GENERIC_REF$+")|("+RELATIVE_REF$+")"),NOT_SCHEME:new RegExp(merge("[^]",ALPHA$$,DIGIT$$,"[\\+\\-\\.]"),"g"),NOT_USERINFO:new RegExp(merge("[^\\%\\:]",UNRESERVED$$,SUB_DELIMS$$),"g"),NOT_HOST:new RegExp(merge("[^\\%]",UNRESERVED$$,SUB_DELIMS$$),"g"),NOT_PATH:new RegExp(merge("[^\\%\\/\\:\\@]",UNRESERVED$$,SUB_DELIMS$$),"g"),NOT_PATH_NOSCHEME:new RegExp(merge("[^\\%\\/\\@]",UNRESERVED$$,SUB_DELIMS$$),"g"),NOT_QUERY:new RegExp(merge("[^\\%]",UNRESERVED$$,SUB_DELIMS$$,"[\\:\\@\\/\\?]",IPRIVATE$$),"g"),NOT_FRAGMENT:new RegExp(merge("[^\\%]",UNRESERVED$$,SUB_DELIMS$$,"[\\:\\@\\/\\?]"),"g"),ESCAPE:new RegExp(merge("[^]",UNRESERVED$$,SUB_DELIMS$$),"g"),UNRESERVED:new RegExp(UNRESERVED$$,"g"),OTHER_CHARS:new RegExp(merge("[^\\%]",UNRESERVED$$,RESERVED$$),"g"),PCT_ENCODED:new RegExp(PCT_ENCODED$,"g")};}var URI_PROTOCOL=buildExps(false),IRI_PROTOCOL=URI__IRI_SUPPORT?buildExps(true):undefined,URI_PARSE=/^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?([^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n)*))?/i,RDS1=/^\.\.?\//,RDS2=/^\/\.(\/|$)/,RDS3=/^\/\.\.(\/|$)/,RDS4=/^\.\.?$/,RDS5=/^\/?(?:.|\n)*?(?=\/|$)/,NO_MATCH_IS_UNDEFINED="".match(/(){0}/)[1]===undefined;function pctEncChar(chr){var c=chr.charCodeAt(0),e;if(c<16)e="%0"+c.toString(16).toUpperCase();else if(c<128)e="%"+c.toString(16).toUpperCase();else if(c<2048)e="%"+(c>>6|192).toString(16).toUpperCase()+"%"+(c&63|128).toString(16).toUpperCase();else e="%"+(c>>12|224).toString(16).toUpperCase()+"%"+(c>>6&63|128).toString(16).toUpperCase()+"%"+(c&63|128).toString(16).toUpperCase();return e;}function pctDecChars(str){var newStr="",i=0,il=str.length,c,c2,c3;while(i<il){c=parseInt(str.substr(i+1,2),16);if(c<128){newStr+=String.fromCharCode(c);i+=3;}else if(c>=194&&c<224){if(il-i>=6){c2=parseInt(str.substr(i+4,2),16);newStr+=String.fromCharCode((c&31)<<6|c2&63);}else{newStr+=str.substr(i,6);}i+=6;}else if(c>=224){if(il-i>=9){c2=parseInt(str.substr(i+4,2),16);c3=parseInt(str.substr(i+7,2),16);newStr+=String.fromCharCode((c&15)<<12|(c2&63)<<6|c3&63);}else{newStr+=str.substr(i,9);}i+=9;}else{newStr+=str.substr(i,3);i+=3;}}return newStr;}function typeOf(o){return o===undefined?"undefined":o===null?"null":Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();}function toUpperCase(str){return str.toUpperCase();}var SCHEMES={};function _normalizeComponentEncoding(components,protocol){function decodeUnreserved(str){var decStr=pctDecChars(str);return!decStr.match(protocol.UNRESERVED)?str:decStr;}if(components.scheme)components.scheme=String(components.scheme).replace(protocol.PCT_ENCODED,decodeUnreserved).toLowerCase().replace(protocol.NOT_SCHEME,"");if(components.userinfo!==undefined)components.userinfo=String(components.userinfo).replace(protocol.PCT_ENCODED,decodeUnreserved).replace(protocol.NOT_USERINFO,pctEncChar).replace(protocol.PCT_ENCODED,toUpperCase);if(components.host!==undefined)components.host=String(components.host).replace(protocol.PCT_ENCODED,decodeUnreserved).toLowerCase().replace(protocol.NOT_HOST,pctEncChar).replace(protocol.PCT_ENCODED,toUpperCase);if(components.path!==undefined)components.path=String(components.path).replace(protocol.PCT_ENCODED,decodeUnreserved).replace(components.scheme?protocol.NOT_PATH:protocol.NOT_PATH_NOSCHEME,pctEncChar).replace(protocol.PCT_ENCODED,toUpperCase);if(components.query!==undefined)components.query=String(components.query).replace(protocol.PCT_ENCODED,decodeUnreserved).replace(protocol.NOT_QUERY,pctEncChar).replace(protocol.PCT_ENCODED,toUpperCase);if(components.fragment!==undefined)components.fragment=String(components.fragment).replace(protocol.PCT_ENCODED,decodeUnreserved).replace(protocol.NOT_FRAGMENT,pctEncChar).replace(protocol.PCT_ENCODED,toUpperCase);return components;};function parse(uriString,options){if(options===void 0){options={};}var protocol=URI__IRI_SUPPORT&&options.iri!==false?IRI_PROTOCOL:URI_PROTOCOL,matches,parseError=false,components={},schemeHandler;if(options.reference==="suffix")uriString=(options.scheme?options.scheme+":":"")+"//"+uriString;if(URI__VALIDATE_SUPPORT){matches=uriString.match(protocol.URI_REF);if(matches){if(matches[1]){//generic URI
matches=matches.slice(1,10);}else{//relative URI
matches=matches.slice(10,19);}}if(!matches){parseError=true;if(!options.tolerant)components.error=components.error||"URI is not strictly valid.";matches=uriString.match(URI_PARSE);}}else{matches=uriString.match(URI_PARSE);}if(matches){if(NO_MATCH_IS_UNDEFINED){//store each component
components.scheme=matches[1];//components.authority = matches[2];
components.userinfo=matches[3];components.host=matches[4];components.port=parseInt(matches[5],10);components.path=matches[6]||"";components.query=matches[7];components.fragment=matches[8];//fix port number
if(isNaN(components.port)){components.port=matches[5];}}else{//store each component
components.scheme=matches[1]||undefined;//components.authority = (uriString.indexOf("//") !== -1 ? matches[2] : undefined);
components.userinfo=uriString.indexOf("@")!==-1?matches[3]:undefined;components.host=uriString.indexOf("//")!==-1?matches[4]:undefined;components.port=parseInt(matches[5],10);components.path=matches[6]||"";components.query=uriString.indexOf("?")!==-1?matches[7]:undefined;components.fragment=uriString.indexOf("#")!==-1?matches[8]:undefined;//fix port number
if(isNaN(components.port)){components.port=uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/)?matches[4]:undefined;}}//determine reference type
if(components.scheme===undefined&&components.userinfo===undefined&&components.host===undefined&&components.port===undefined&&!components.path&&components.query===undefined){components.reference="same-document";}else if(components.scheme===undefined){components.reference="relative";}else if(components.fragment===undefined){components.reference="absolute";}else{components.reference="uri";}//check for reference errors
if(options.reference&&options.reference!=="suffix"&&options.reference!==components.reference){components.error=components.error||"URI is not a "+options.reference+" reference.";}//find scheme handler
schemeHandler=SCHEMES[(options.scheme||components.scheme||"").toLowerCase()];//check if scheme can't handle IRIs
if(URI__IRI_SUPPORT&&typeof punycode!=="undefined"&&!options.unicodeSupport&&(!schemeHandler||!schemeHandler.unicodeSupport)){//if host component is a domain name
if(components.host&&(options.domainHost||schemeHandler&&schemeHandler.domainHost)){//convert Unicode IDN -> ASCII IDN
try{components.host=punycode.toASCII(components.host.replace(protocol.PCT_ENCODED,pctDecChars).toLowerCase());}catch(e){components.error=components.error||"Host's domain name can not be converted to ASCII via punycode: "+e;}}//convert IRI -> URI
_normalizeComponentEncoding(components,URI_PROTOCOL);}else{//normalize encodings
_normalizeComponentEncoding(components,protocol);}//perform scheme specific parsing
if(schemeHandler&&schemeHandler.parse){schemeHandler.parse(components,options);}}else{parseError=true;components.error=components.error||"URI can not be parsed.";}return components;};function _recomposeAuthority(components,options){var uriTokens=[];if(components.userinfo!==undefined){uriTokens.push(components.userinfo);uriTokens.push("@");}if(components.host!==undefined){uriTokens.push(components.host);}if(typeof components.port==="number"){uriTokens.push(":");uriTokens.push(components.port.toString(10));}return uriTokens.length?uriTokens.join(""):undefined;};function removeDotSegments(input){var output=[],s;while(input.length){if(input.match(RDS1)){input=input.replace(RDS1,"");}else if(input.match(RDS2)){input=input.replace(RDS2,"/");}else if(input.match(RDS3)){input=input.replace(RDS3,"/");output.pop();}else if(input==="."||input===".."){input="";}else{s=input.match(RDS5)[0];input=input.slice(s.length);output.push(s);}}return output.join("");};function serialize(components,options){if(options===void 0){options={};}var protocol=URI__IRI_SUPPORT&&options.iri?IRI_PROTOCOL:URI_PROTOCOL,uriTokens=[],schemeHandler,authority,s;//find scheme handler
schemeHandler=SCHEMES[(options.scheme||components.scheme||"").toLowerCase()];//perform scheme specific serialization
if(schemeHandler&&schemeHandler.serialize)schemeHandler.serialize(components,options);//if host component is a domain name
if(URI__IRI_SUPPORT&&typeof punycode!=="undefined"&&components.host&&(options.domainHost||schemeHandler&&schemeHandler.domainHost)){//convert IDN via punycode
try{components.host=!options.iri?punycode.toASCII(components.host.replace(protocol.PCT_ENCODED,pctDecChars).toLowerCase()):punycode.toUnicode(components.host);}catch(e){components.error=components.error||"Host's domain name can not be converted to "+(!options.iri?"ASCII":"Unicode")+" via punycode: "+e;}}//normalize encoding
_normalizeComponentEncoding(components,protocol);if(options.reference!=="suffix"&&components.scheme){uriTokens.push(components.scheme);uriTokens.push(":");}authority=_recomposeAuthority(components,options);if(authority!==undefined){if(options.reference!=="suffix"){uriTokens.push("//");}uriTokens.push(authority);if(components.path&&components.path.charAt(0)!=="/"){uriTokens.push("/");}}if(components.path!==undefined){s=components.path;if(!options.absolutePath&&(!schemeHandler||!schemeHandler.absolutePath)){s=removeDotSegments(s);}if(authority===undefined){s=s.replace(/^\/\//,"/%2F");//don't allow the path to start with "//"
}uriTokens.push(s);}if(components.query!==undefined){uriTokens.push("?");uriTokens.push(components.query);}if(components.fragment!==undefined){uriTokens.push("#");uriTokens.push(components.fragment);}return uriTokens.join('');//merge tokens into a string
};function resolveComponents(base,relative,options,skipNormalization){if(options===void 0){options={};}var target={};if(!skipNormalization){base=parse(serialize(base,options),options);//normalize base components
relative=parse(serialize(relative,options),options);//normalize relative components
}options=options||{};if(!options.tolerant&&relative.scheme){target.scheme=relative.scheme;//target.authority = relative.authority;
target.userinfo=relative.userinfo;target.host=relative.host;target.port=relative.port;target.path=removeDotSegments(relative.path);target.query=relative.query;}else{if(relative.userinfo!==undefined||relative.host!==undefined||relative.port!==undefined){//target.authority = relative.authority;
target.userinfo=relative.userinfo;target.host=relative.host;target.port=relative.port;target.path=removeDotSegments(relative.path);target.query=relative.query;}else{if(!relative.path){target.path=base.path;if(relative.query!==undefined){target.query=relative.query;}else{target.query=base.query;}}else{if(relative.path.charAt(0)==="/"){target.path=removeDotSegments(relative.path);}else{if((base.userinfo!==undefined||base.host!==undefined||base.port!==undefined)&&!base.path){target.path="/"+relative.path;}else if(!base.path){target.path=relative.path;}else{target.path=base.path.slice(0,base.path.lastIndexOf("/")+1)+relative.path;}target.path=removeDotSegments(target.path);}target.query=relative.query;}//target.authority = base.authority;
target.userinfo=base.userinfo;target.host=base.host;target.port=base.port;}target.scheme=base.scheme;}target.fragment=relative.fragment;return target;};function resolve(baseURI,relativeURI,options){return serialize(resolveComponents(parse(baseURI,options),parse(relativeURI,options),options,true),options);};function normalize(uri,options){if(typeof uri==="string"){uri=serialize(parse(uri,options),options);}else if(typeOf(uri)==="object"){uri=parse(serialize(uri,options),options);}return uri;};function equal(uriA,uriB,options){if(typeof uriA==="string"){uriA=serialize(parse(uriA,options),options);}else if(typeOf(uriA)==="object"){uriA=serialize(uriA,options);}if(typeof uriB==="string"){uriB=serialize(parse(uriB,options),options);}else if(typeOf(uriB)==="object"){uriB=serialize(uriB,options);}return uriA===uriB;};function escapeComponent(str,options){return str&&str.toString().replace(!URI__IRI_SUPPORT||!options||!options.iri?URI_PROTOCOL.ESCAPE:IRI_PROTOCOL.ESCAPE,pctEncChar);};function unescapeComponent(str,options){return str&&str.toString().replace(!URI__IRI_SUPPORT||!options||!options.iri?URI_PROTOCOL.PCT_ENCODED:IRI_PROTOCOL.PCT_ENCODED,pctDecChars);};return{IRI_SUPPORT:URI__IRI_SUPPORT,VALIDATE_SUPPORT:URI__VALIDATE_SUPPORT,pctEncChar:pctEncChar,pctDecChars:pctDecChars,SCHEMES:SCHEMES,parse:parse,_recomposeAuthority:_recomposeAuthority,removeDotSegments:removeDotSegments,serialize:serialize,resolveComponents:resolveComponents,resolve:resolve,normalize:normalize,equal:equal,escapeComponent:escapeComponent,unescapeComponent:unescapeComponent};}();if(!COMPILED&&typeof module!=="undefined"&&typeof require==="function"){var punycode=require("./punycode");module.exports=URI;require("./schemes");}},{"./punycode":18,"./schemes":19}]},{},[1])(1);});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sf_path__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__schema_defaults__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__canonical_title_map__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = merge;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };





// export function merge(schema, form, schemaDefaultTypes, ignore, options, readonly, asyncTemplates) {
function merge(lookup, form, ignore, options, readonly, asyncTemplates) {
  var formItems = [];
  var formItemRest = [];
  form = form || [];
  var idx = form.indexOf('*');
  options = options || {};
  var stdForm = {};

  var idxRest = form.indexOf('...');
  if ((typeof lookup === 'undefined' ? 'undefined' : _typeof(lookup)) === 'object' && lookup.hasOwnProperty('properties')) {
    readonly = readonly || lookup.readonly || lookup.readOnly;
    stdForm = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__schema_defaults__["defaultForm"])(lookup, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__schema_defaults__["createDefaults"])(), ignore, options);

    var defaultFormLookup = stdForm.lookup;

    lookup = defaultFormLookup || lookup;
    formItems = formItems.concat(stdForm.form);
  };

  if (idx !== -1) {
    form = form.slice(0, idx).concat(formItems).concat(form.slice(idx + 1));
  }

  //simple case, we have a "...", just put the formItemRest there
  if (stdForm.form && idxRest !== -1) {
    (function () {
      var formKeys = form.map(function (obj) {
        if (typeof obj === 'string') {
          return obj;
        } else if (obj.key) {
          return obj.key;
        };
      }).filter(function (element) {
        return element !== undefined;
      });

      formItemRest = formItemRest.concat(stdForm.form.map(function (obj) {
        var isInside = formKeys.indexOf(obj.key[0]) !== -1;
        if (!isInside) {
          return obj;
        };
      }).filter(function (element) {
        return element !== undefined;
      }));
    })();
  };

  if (idxRest !== -1) {
    form = form.slice(0, idxRest).concat(formItemRest).concat(form.slice(idxRest + 1));
  };

  // ok let's merge!
  // We look at the supplied form and extend it with schema standards
  return form.map(function (obj) {
    // handle the shortcut with just a name
    if (typeof obj === 'string') {
      obj = { key: obj };
    }

    if (obj.key) {
      if (typeof obj.key === 'string') {
        obj.key = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sf_path__["parse"])(obj.key);
      }
    }

    // If it has a titleMap make sure it's a list
    if (obj.titleMap) {
      obj.titleMap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__canonical_title_map__["a" /* default */])(obj.titleMap);
    }

    // extend with std form from schema.
    if (obj.key) {
      var strid = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sf_path__["stringify"])(obj.key);
      if (lookup[strid]) {
        (function () {
          var schemaDefaults = lookup[strid];
          if (schemaDefaults) {
            Object.keys(schemaDefaults).forEach(function (attr) {
              if (obj[attr] === undefined) {
                obj[attr] = schemaDefaults[attr];
              }
            });
          }
        })();
      }
    }

    // Are we inheriting readonly?
    if (readonly === true) {
      // Inheriting false is not cool.
      obj.readonly = true;
    }

    // if it's a type with items, merge 'em!
    if (obj.items) {
      obj.items = merge(lookup, obj.items, ignore, options, obj.readonly, asyncTemplates);
    }

    // if its has tabs, merge them also!
    if (obj.tabs) {
      obj.tabs.forEach(function (tab) {
        if (tab.items) {
          tab.items = merge(lookup, tab.items, ignore, options, obj.readonly, asyncTemplates);
        }
      });
    }

    // Special case: checkbox
    // Since have to ternary state we need a default
    if (obj.type === 'checkbox' && obj.schema['default'] === undefined) {
      obj.schema['default'] = false;
    };

    // Special case: template type with tempplateUrl that's needs to be loaded before rendering
    // TODO: this is not a clean solution. Maybe something cleaner can be made when $ref support
    // is introduced since we need to go async then anyway
    if (asyncTemplates && obj.type === 'template' && !obj.template && obj.templateUrl) {
      asyncTemplates.push(obj);
    }

    return obj;
  });
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_json_refs_standalone__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_json_refs_standalone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__lib_json_refs_standalone__);
/* harmony export (immutable) */ __webpack_exports__["a"] = jsonref;


function jsonref(schema, callBack) {
  var promise = new Promise(function (resolve, reject) {
    __WEBPACK_IMPORTED_MODULE_0__lib_json_refs_standalone__["resolveRefs"](schema, {
      "filter": ['relative', 'local', 'remote']
    }).then(function (res) {
      resolve(res.resolved);
    }).catch(function (err) {
      reject(new Error(err));
    });
  });

  if (typeof callBack === 'function') {
    promise.then(function (resolved) {
      callBack(null, resolved);
    }).catch(function (error) {
      callBack(error);
    });
  } else {
    return promise;
  }
};

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sf_path__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = select;


var numRe = /^\d+$/;

/**
  * @description
  * Utility method to access deep properties without
  * throwing errors when things are not defined.
  * Can also set a value in a deep structure, creating objects when missing
  * ex.
  * var foo = Select('address.contact.name',obj)
  * Select('address.contact.name',obj,'Leeroy')
  *
  * @param {string} projection A dot path to the property you want to get/set
  * @param {object} obj   (optional) The object to project on, defaults to 'this'
  * @param {Any}    valueToSet (opional)  The value to set, if parts of the path of
  *                 the projection is missing empty objects will be created.
  * @returns {Any|undefined} returns the value at the end of the projection path
  *                          or undefined if there is none.
  */
function select(projection, obj, valueToSet) {
  if (!obj) {
    obj = this;
  };

  // Support [] array syntax
  var parts = typeof projection === 'string' ? __WEBPACK_IMPORTED_MODULE_0__sf_path__["parse"](projection) : projection;

  if (typeof valueToSet !== 'undefined' && parts.length === 1) {
    // special case, just setting one variable
    obj[parts[0]] = valueToSet;

    return obj;
  };

  if (typeof valueToSet !== 'undefined' && typeof obj[parts[0]] === 'undefined') {
    // We need to look ahead to check if array is appropriate
    obj[parts[0]] = parts.length > 2 && numRe.test(parts[1]) ? [] : {};
  };

  var value = obj[parts[0]];

  for (var i = 1; i < parts.length; i++) {
    // Special case: We allow JSON Form syntax for arrays using empty brackets
    // These will of course not work here so we exit if they are found.
    if (parts[i] === '') {
      return undefined;
    };

    if (typeof valueToSet !== 'undefined') {
      if (i === parts.length - 1) {
        // last step. Let's set the value
        value[parts[i]] = valueToSet;
        return valueToSet;
      } else {
        // Make sure to create new objects on the way if they are not there.
        // We need to look ahead to check if array is appropriate
        var tmp = value[parts[i]];

        if (typeof tmp === 'undefined' || tmp === null) {
          tmp = numRe.test(parts[i + 1]) ? [] : {};
          value[parts[i]] = tmp;
        };

        value = tmp;
      };
    } else if (value) {
      // Just get nex value.
      value = value[parts[i]];
    };
  };

  return value;
};

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = traverseSchema;
/* harmony export (immutable) */ __webpack_exports__["b"] = traverseForm;
/**
 * Traverse a schema, applying a function(schema,path) on every sub schema
 * i.e. every property of an object.
 */
function traverseSchema(schema, fn, path, ignoreArrays) {
  ignoreArrays = ignoreArrays === undefined ? true : ignoreArrays;

  path = path || [];

  var traverse = function traverse(schemaObject, processorFunction, pathArray) {
    processorFunction(schemaObject, pathArray);
    if (schemaObject.properties) {
      Object.keys(schemaObject.properties).forEach(function (name) {
        var currentPath = pathArray.slice();
        currentPath.push(name);
        traverse(schemaObject.properties[name], processorFunction, currentPath);
      });
    }

    // Only support type "array" which have a schemaObject as "items".
    if (!ignoreArrays && schemaObject.items) {
      var arrPath = pathArray.slice();arrPath.push('');
      traverse(schemaObject.items, processorFunction, arrPath);
    }
  };

  traverse(schema, fn, path || []);
}

function traverseForm(form, fn) {
  fn(form);
  if (form.items) {
    form.items.forEach(function (f) {
      traverseForm(f, fn);
    });
  }

  if (form.tabs) {
    form.tabs.forEach(function (tab) {
      if (tab.items) {
        tab.items.forEach(function (f) {
          traverseForm(f, fn);
        });
      }
    });
  }
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tv4__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tv4___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tv4__);
/* harmony export (immutable) */ __webpack_exports__["a"] = validate;
/*  Common code for validating a value against its form and schema definition */


/**
 * Validate a value against its form definition and schema.
 * The value should either be of proper type or a string, some type
 * coercion is applied.
 *
 * @param {Object} form A merged form definition, i.e. one with a schema.
 * @param {Any} value the value to validate.
 * @return {Object} a tv4js result object.
 */
function validate(form, value) {
  if (!form) {
    return { valid: true };
  };

  var schema = form.schema;
  if (!schema) {
    return { valid: true };
  };

  // Input of type text and textareas will give us a viewValue of ''
  // when empty, this is a valid value in a schema and does not count as something
  // that breaks validation of 'required'. But for our own sanity an empty field should
  // not validate if it's required.
  if (value === '') {
    value = undefined;
  };

  // Numbers fields will give a null value, which also means empty field
  if (form.type === 'number' && value === null) {
    value = undefined;
  };

  // Version 4 of JSON Schema has the required property not on the
  // property itself but on the wrapping object. Since we like to test
  // only this property we wrap it in a fake object.
  var wrap = { type: 'object', 'properties': {}, required: undefined };
  var propName = form.key[form.key.length - 1];
  wrap.properties[propName] = schema;

  if (form.required) {
    wrap.required = [propName];
  };

  var valueWrap = {};
  if (!!value) {
    valueWrap[propName] = value;
  };

  return __WEBPACK_IMPORTED_MODULE_0_tv4___default.a.validateResult(valueWrap, wrap);
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

;!function(undefined) {

	var ObjectPath = {
		parse: function(str){
			if(typeof str !== 'string'){
				throw new TypeError('ObjectPath.parse must be passed a string');
			}

			var i = 0;
			var parts = [];
			var d, b, q, c;
			while (i < str.length){
				d = str.indexOf('.', i);
				b = str.indexOf('[', i);

				// we've reached the end
				if (d === -1 && b === -1){
					parts.push(str.slice(i, str.length));
					i = str.length;
				}

				// dots
				else if (b === -1 || (d !== -1 && d < b)) {
					parts.push(str.slice(i, d));
					i = d + 1;
				}

				// brackets
				else {
					if (b > i){
						parts.push(str.slice(i, b));
						i = b;
					}
					q = str.slice(b+1, b+2);
					if (q !== '"' && q !=='\'') {
						c = str.indexOf(']', b);
						if (c === -1) c = str.length;
						parts.push(str.slice(i + 1, c));
						i = (str.slice(c + 1, c + 2) === '.') ? c + 2 : c + 1;
					} else {
						c = str.indexOf(q+']', b);
						if (c === -1) c = str.length;
						while (str.slice(c - 1, c) === '\\' && b < str.length){
							b++;
							c = str.indexOf(q+']', b);
						}
						parts.push(str.slice(i + 2, c).replace(new RegExp('\\'+q,'g'), q));
						i = (str.slice(c + 2, c + 3) === '.') ? c + 3 : c + 2;
					}
				}
			}
			return parts;
		},

		// root === true : auto calculate root; must be dot-notation friendly
		// root String : the string to use as root
		stringify: function(arr, quote){

			if(!Array.isArray(arr))
				arr = [arr.toString()];

			quote = quote === '"' ? '"' : '\'';

			return arr.map(function(n){ return '[' + quote + (n.toString()).replace(new RegExp(quote, 'g'), '\\' + quote) + quote + ']'; }).join('');
		},

		normalize: function(data, quote){
			return ObjectPath.stringify(Array.isArray(data) ? data : ObjectPath.parse(data), quote);
		},

		// Angular
		registerModule: function(angular) {
			angular.module('ObjectPath', []).provider('ObjectPath', function(){
				this.parse = ObjectPath.parse;
				this.stringify = ObjectPath.stringify;
				this.normalize = ObjectPath.normalize;
				this.$get = function(){
					return ObjectPath;
				};
			});
		}
	};

	// AMD
	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return {ObjectPath: ObjectPath};
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

	// CommonJS
	else if (typeof exports === 'object') {
		exports.ObjectPath = ObjectPath;
	}

	// Browser global
	else {
		window.ObjectPath = ObjectPath;
	}
	
}();

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = tv4;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ })
/******/ ]);
//# sourceMappingURL=json-schema-form-core.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(19).setImmediate))

/***/ }),
/* 2 */
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
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_json_schema_form_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_json_schema_form_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_json_schema_form_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sf_builder_provider__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_schema_form_decorators_provider__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_schema_form_provider__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sf_error_message_provider__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sf_path_provider__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_sf_changed_directive__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_sf_field_directive__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_sf_message_directive__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_sf_array_directive__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_sf_key_directive__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_sf_schema_directive__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_schema_validate_directive__ = __webpack_require__(5);



// ./services/





// ./directives/








// Deps is sort of a problem for us, maybe in the future we will ask the user to depend
// on modules for add-ons
var deps = [];

try {
  //This throws an expection if module does not exist.
  __WEBPACK_IMPORTED_MODULE_1_angular___default.a.module('ngSanitize');
  deps.push('ngSanitize');
} catch (e) {}

try {
  //This throws an expection if module does not exist.
  __WEBPACK_IMPORTED_MODULE_1_angular___default.a.module('ui.sortable');
  deps.push('ui.sortable');
} catch (e) {}

try {
  //This throws an expection if module does not exist.
  __WEBPACK_IMPORTED_MODULE_1_angular___default.a.module('angularSpectrumColorpicker');
  deps.push('angularSpectrumColorpicker');
} catch (e) {}

__WEBPACK_IMPORTED_MODULE_1_angular___default.a.module('schemaForm', deps)

// Providers and services
.provider('sfPath', __WEBPACK_IMPORTED_MODULE_6_sf_path_provider__["a" /* default */]).provider('sfBuilder', ['sfPathProvider', __WEBPACK_IMPORTED_MODULE_2_sf_builder_provider__["a" /* default */]]).provider('schemaFormDecorators', ['$compileProvider', 'sfPathProvider', __WEBPACK_IMPORTED_MODULE_3_schema_form_decorators_provider__["a" /* default */]]).provider('sfErrorMessage', __WEBPACK_IMPORTED_MODULE_5_sf_error_message_provider__["a" /* default */]).provider('schemaForm', ['sfPathProvider', __WEBPACK_IMPORTED_MODULE_4_schema_form_provider__["a" /* default */]]).factory('sfSelect', function () {
  return __WEBPACK_IMPORTED_MODULE_0_json_schema_form_core__["select"];
}).factory('sfValidator', function () {
  return __WEBPACK_IMPORTED_MODULE_0_json_schema_form_core__["validate"];
})

// Directives
.directive('sfChanged', __WEBPACK_IMPORTED_MODULE_7_sf_changed_directive__["a" /* default */]).directive('sfField', ['$parse', '$compile', '$http', '$templateCache', '$interpolate', '$q', 'sfErrorMessage', 'sfPath', 'sfSelect', __WEBPACK_IMPORTED_MODULE_8_sf_field_directive__["a" /* default */]]).directive('sfMessage', ['$injector', 'sfErrorMessage', __WEBPACK_IMPORTED_MODULE_9_sf_message_directive__["a" /* default */]]).directive('sfNewArray', ['sfSelect', 'sfPath', 'schemaForm', __WEBPACK_IMPORTED_MODULE_10_sf_array_directive__["a" /* default */]]).directive('sfSchema', ['$compile', '$http', '$templateCache', '$q', 'schemaForm', 'schemaFormDecorators', 'sfSelect', 'sfPath', 'sfBuilder', __WEBPACK_IMPORTED_MODULE_12_sf_schema_directive__["a" /* default */]]).directive('schemaValidate', ['sfValidator', '$parse', 'sfSelect', __WEBPACK_IMPORTED_MODULE_13_schema_validate_directive__["a" /* default */]]).directive('sfKeyController', ['schemaForm', 'sfPath', __WEBPACK_IMPORTED_MODULE_11_sf_key_directive__["a" /* default */]]);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);


/* harmony default export */ __webpack_exports__["a"] = function (sfValidator, $parse, sfSelect) {
  return {
    restrict: 'A',
    scope: false,
    // We want the link function to be *after* the input directives link function so we get access
    // the parsed value, ex. a number instead of a string
    priority: 500,
    require: 'ngModel',
    link: function link(scope, element, attrs, ngModel) {
      // We need the ngModelController on several places,
      // most notably for errors.
      // So we emit it up to the decorator directive so it can put it on scope.
      scope.$emit('schemaFormPropagateNgModelController', ngModel);

      var error = null;
      var form = scope.$eval(attrs.schemaValidate);

      if (form.copyValueTo) {
        ngModel.$viewChangeListeners.push(function () {
          var paths = form.copyValueTo;
          __WEBPACK_IMPORTED_MODULE_0_angular___default.a.forEach(paths, function (path) {
            sfSelect(path, scope.model, ngModel.$modelValue);
          });
        });
      };

      // Validate against the schema.

      var validate = function validate(viewValue) {
        //Still might be undefined
        if (!form) {
          return viewValue;
        }

        // Omit TV4 validation
        if (scope.options && scope.options.tv4Validation === false) {
          return viewValue;
        }

        var result = sfValidator(form, viewValue);
        //console.log('result is', result)
        // Since we might have different tv4 errors we must clear all
        // errors that start with tv4-
        Object.keys(ngModel.$error).filter(function (k) {
          return k.indexOf('tv4-') === 0;
        }).forEach(function (k) {
          ngModel.$setValidity(k, true);
        });

        if (!result.valid) {
          // it is invalid, return undefined (no model update)
          ngModel.$setValidity('tv4-' + result.error.code, false);
          error = result.error;

          // In Angular 1.3+ return the viewValue, otherwise we inadvertenly
          // will trigger a 'parse' error.
          // we will stop the model value from updating with our own $validator
          // later.
          if (ngModel.$validators) {
            return viewValue;
          }
          // Angular 1.2 on the other hand lacks $validators and don't add a 'parse' error.
          return undefined;
        }
        return viewValue;
      };

      // Custom validators, parsers, formatters etc
      if (typeof form.ngModel === 'function') {
        form.ngModel(ngModel);
      }

      ['$parsers', '$viewChangeListeners', '$formatters'].forEach(function (attr) {
        if (form[attr] && ngModel[attr]) {
          form[attr].forEach(function (fn) {
            ngModel[attr].push(fn);
          });
        }
      });

      ['$validators', '$asyncValidators'].forEach(function (attr) {
        // Check if our version of angular has validators, i.e. 1.3+
        if (form[attr] && ngModel[attr]) {
          __WEBPACK_IMPORTED_MODULE_0_angular___default.a.forEach(form[attr], function (fn, name) {
            ngModel[attr][name] = fn;
          });
        }
      });

      // Get in last of the parses so the parsed value has the correct type.
      // We don't use $validators since we like to set different errors depending tv4 error codes
      ngModel.$parsers.push(validate);

      // But we do use one custom validator in the case of Angular 1.3 to stop the model from
      // updating if we've found an error.
      if (ngModel.$validators) {
        ngModel.$validators.schemaForm = function () {
          //console.log('validators called.')
          // Any error and we're out of here!
          return !Object.keys(ngModel.$error).some(function (e) {
            return e !== 'schemaForm';
          });
        };
      }

      var schema = form.schema;

      // A bit ugly but useful.
      scope.validateField = function (formName) {
        var noField = formName === undefined;
        // If we have specified a form name, and this model is not within
        // that form, then leave things be.
        if (!noField && ngModel.$$parentForm.$name !== formName) {
          return;
        }

        // Special case: arrays
        // TODO: Can this be generalized in a way that works consistently?
        // Just setting the viewValue isn't enough to trigger validation
        // since it's the same value. This will be better when we drop
        // 1.2 support.
        if (noField || schema && schema.type.indexOf('array') !== -1) {
          validate(ngModel.$modelValue);
        };

        // We set the viewValue to trigger parsers,
        // since modelValue might be empty and validating just that
        // might change an existing error to a "required" error message.
        if (ngModel.$setDirty) {

          // Angular 1.3+
          ngModel.$setDirty();
          ngModel.$setViewValue(ngModel.$viewValue);
          ngModel.$commitViewValue();

          // In Angular 1.3 setting undefined as a viewValue does not trigger parsers
          // so we need to do a special required check.

          // angulars checkbox directive isEmpty does not do the check we want.
          if (form.type === 'checkbox') {
            if (form.required && ngModel.$modelValue === undefined) {
              ngModel.$setValidity('tv4-302', false);
            }
          } else if (form.required && ngModel.$isEmpty(ngModel.$modelValue)) {
            ngModel.$setValidity('tv4-302', false);
          }
        } else {
          // Angular 1.2
          // In angular 1.2 setting a viewValue of undefined will trigger the parser.
          // hence required works.
          ngModel.$setViewValue(ngModel.$viewValue);
        }
      };

      var first = true;
      ngModel.$formatters.push(function (val) {
        // When a form first loads this will be called for each field.
        // we usually don't want that.
        if (ngModel.$pristine && first && (!scope.options || scope.options.validateOnRender !== true)) {
          first = false;
          return val;
        }
        validate(ngModel.$modelValue);
        return val;
      });

      // Listen to an event so we can validate the input on request
      scope.$on('schemaFormValidate', function (event, formName) {
        scope.validateField(formName);
      });

      scope.schemaError = function () {
        return error;
      };
    }
  };
};

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);


/**
 * Directive that handles the model arrays
 */
/* harmony default export */ __webpack_exports__["a"] = function (sel, sfPath, schemaForm) {
  return {
    scope: true,
    controller: ['$scope', function SFArrayController($scope) {
      this.key = $scope.form && $scope.form.key ? $scope.form.key.splice(0, -2) : [];
    }],
    link: function link(scope, element, attrs) {
      scope.min = 0;

      scope.modelArray = scope.$eval(attrs.sfNewArray);

      // We need to have a ngModel to hook into validation. It doesn't really play well with
      // arrays though so we both need to trigger validation and onChange.
      // So we watch the value as well. But watching an array can be tricky. We wan't to know
      // when it changes so we can validate,
      var watchFn = function watchFn() {
        //scope.modelArray = modelArray;
        scope.modelArray = scope.$eval(attrs.sfNewArray);
        // validateField method is exported by schema-validate
        if (scope.ngModel && scope.ngModel.$pristine && scope.firstDigest && (!scope.options || scope.options.validateOnRender !== true)) {
          return;
        } else if (scope.validateField) {
          scope.validateField();
        }
      };

      var onChangeFn = function onChangeFn() {
        if (scope.form && scope.form.onChange) {
          if (__WEBPACK_IMPORTED_MODULE_0_angular___default.a.isFunction(scope.form.onChange)) {
            scope.form.onChange(scope.modelArray, scope.form);
          } else {
            scope.evalExpr(scope.form.onChange, { 'modelValue': scope.modelArray, form: scope.form });
          }
        }
      };

      // If model is undefined make sure it gets set.
      var getOrCreateModel = function getOrCreateModel() {
        var model = scope.modelArray;
        if (!model) {
          var selection = sfPath.parse(attrs.sfNewArray);
          model = [];
          sel(selection, scope, model);
          scope.modelArray = model;
        }
        return model;
      };

      // We need the form definition to make a decision on how we should listen.
      var once = scope.$watch('form', function (form) {
        if (!form) {
          return;
        }

        // Always start with one empty form unless configured otherwise.
        // Special case: don't do it if form has a titleMap
        if (!form.titleMap && form.startEmpty !== true && (!scope.modelArray || scope.modelArray.length === 0)) {
          scope.appendToArray();
        }

        // If we have "uniqueItems" set to true, we must deep watch for changes.
        if (scope.form && scope.form.schema && scope.form.schema.uniqueItems === true) {
          scope.$watch(attrs.sfNewArray, watchFn, true);

          // We still need to trigger onChange though.
          scope.$watch([attrs.sfNewArray, attrs.sfNewArray + '.length'], onChangeFn);
        } else {
          // Otherwise we like to check if the instance of the array has changed, or if something
          // has been added/removed.
          if (scope.$watchGroup) {
            scope.$watchGroup([attrs.sfNewArray, attrs.sfNewArray + '.length'], function () {
              watchFn();
              onChangeFn();
            });
          } else {
            // Angular 1.2 support
            scope.$watch(attrs.sfNewArray, function () {
              watchFn();
              onChangeFn();
            });
            scope.$watch(attrs.sfNewArray + '.length', function () {
              watchFn();
              onChangeFn();
            });
          }
        }

        // Title Map handling
        // If form has a titleMap configured we'd like to enable looping over
        // titleMap instead of modelArray, this is used for intance in
        // checkboxes. So instead of variable number of things we like to create
        // a array value from a subset of values in the titleMap.
        // The problem here is that ng-model on a checkbox doesn't really map to
        // a list of values. This is here to fix that.
        if (form.titleMap && form.titleMap.length > 0) {
          scope.titleMapValues = [];

          // We watch the model for changes and the titleMapValues to reflect
          // the modelArray
          var updateTitleMapValues = function updateTitleMapValues(arr) {
            scope.titleMapValues = [];
            arr = arr || [];

            form.titleMap.forEach(function (item) {
              scope.titleMapValues.push(arr.indexOf(item.value) !== -1);
            });
          };
          //Catch default values
          updateTitleMapValues(scope.modelArray);

          // TODO: Refactor and see if we can get rid of this watch by piggy backing on the
          // validation watch.
          scope.$watchCollection('modelArray', updateTitleMapValues);

          //To get two way binding we also watch our titleMapValues
          scope.$watchCollection('titleMapValues', function (vals, old) {
            if (vals && vals !== old) {
              var arr = getOrCreateModel();

              form.titleMap.forEach(function (item, index) {
                var arrIndex = arr.indexOf(item.value);
                if (arrIndex === -1 && vals[index]) {
                  arr.push(item.value);
                };

                if (arrIndex !== -1 && !vals[index]) {
                  arr.splice(arrIndex, 1);
                };
              });
              // Time to validate the rebuilt array.
              // validateField method is exported by schema-validate
              if (scope.validateField) {
                scope.validateField();
              }
            }
          });
        }

        once();
      });

      scope.appendToArray = function () {
        var empty;

        // Create and set an array if needed.
        var model = getOrCreateModel();

        // Same old add empty things to the array hack :(
        if (scope.form && scope.form.schema && scope.form.schema.items) {

          var items = scope.form.schema.items;
          if (items.type && items.type.indexOf('object') !== -1) {
            empty = {};

            // Check for possible defaults
            if (!scope.options || scope.options.setSchemaDefaults !== false) {
              empty = __WEBPACK_IMPORTED_MODULE_0_angular___default.a.isDefined(items['default']) ? items['default'] : empty;

              // Check for defaults further down in the schema.
              // If the default instance sets the new array item to something falsy, i.e. null
              // then there is no need to go further down.
              if (empty) {
                schemaForm.traverseSchema(items, function (prop, path) {
                  if (__WEBPACK_IMPORTED_MODULE_0_angular___default.a.isDefined(prop['default'])) {
                    sel(path, empty, prop['default']);
                  }
                });
              }
            }
          } else if (items.type && items.type.indexOf('array') !== -1) {
            empty = [];
            if (!scope.options || scope.options.setSchemaDefaults !== false) {
              empty = items['default'] || empty;
            }
          } else {
            // No type? could still have defaults.
            if (!scope.options || scope.options.setSchemaDefaults !== false) {
              empty = items['default'] || empty;
            }
          }
        }
        model.push(empty);

        return model;
      };

      scope.deleteFromArray = function (index) {
        var model = scope.modelArray;
        if (model) {
          model.splice(index, 1);
        }
        return model;
      };

      // For backwards compatability, i.e. when a bootstrap-decorator tag is used
      // as child to the array.
      var setIndex = function setIndex(index) {
        return function (form) {
          if (form.key) {
            form.key[form.key.indexOf('')] = index;
          }
        };
      };
      var formDefCache = {};
      scope.copyWithIndex = function (index) {
        var form = scope.form;
        if (!formDefCache[index]) {

          // To be more compatible with JSON Form we support an array of items
          // in the form definition of "array" (the schema just a value).
          // for the subforms code to work this means we wrap everything in a
          // section. Unless there is just one.
          var subForm = form.items[0];
          if (form.items.length > 1) {
            subForm = {
              type: 'section',
              items: form.items.map(function (item) {
                item.ngModelOptions = form.ngModelOptions;
                if (__WEBPACK_IMPORTED_MODULE_0_angular___default.a.isUndefined(item.readonly)) {
                  item.readonly = form.readonly;
                }
                return item;
              })
            };
          }

          if (subForm) {
            var copy = __WEBPACK_IMPORTED_MODULE_0_angular___default.a.copy(subForm);
            copy.arrayIndex = index;
            schemaForm.traverseForm(copy, setIndex(index));
            formDefCache[index] = copy;
          }
        }
        return formDefCache[index];
      };
    }
  };
};

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);


/**
 * A version of ng-changed that only listens if
 * there is actually a onChange defined on the form
 *
 * Takes the form definition as argument.
 * If the form definition has a "onChange" defined as either a function or
 */
/* harmony default export */ __webpack_exports__["a"] = function () {
  return {
    require: 'ngModel',
    restrict: 'AC',
    scope: false,
    link: function link(scope, element, attrs, ctrl) {
      var form = scope.$eval(attrs.sfChanged);
      //"form" is really guaranteed to be here since the decorator directive
      //waits for it. But best be sure.
      if (form && form.onChange) {
        ctrl.$viewChangeListeners.push(function () {
          if (__WEBPACK_IMPORTED_MODULE_0_angular___default.a.isFunction(form.onChange)) {
            form.onChange(ctrl.$modelValue, form);
          } else {
            scope.evalExpr(form.onChange, {
              "modelValue": ctrl.$modelValue,
              "form": form,
              "arrayIndex": scope.$index,
              "arrayIndices": scope.arrayIndices,
              "path": scope.path,
              "$i": scope.$i,
              "$index": scope.$index
            });
          }
        });
      }
    }
  };
};

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



/* harmony default export */ __webpack_exports__["a"] = function ($parse, $compile, $http, $templateCache, $interpolate, $q, sfErrorMessage, sfPath, sfSelect) {

  var keyFormat = {
    COMPLETE: '*',
    PATH: 'string',
    INDICES: 'number'
  };

  return {
    restrict: 'AE',
    replace: false,
    transclude: false,
    scope: true,
    require: ['^sfSchema', '?^form', '?^^sfKeyController'],
    link: {
      pre: function pre(scope, element, attrs, ctrl) {
        var sfSchema = ctrl[0];
        var formCtrl = ctrl[1];
        var keyCtrl = ctrl[2];

        //The ngModelController is used in some templates and
        //is needed for error messages,
        scope.$on('schemaFormPropagateNgModelController', function (event, ngModel) {
          event.stopPropagation();
          event.preventDefault();
          scope.ngModel = ngModel;
        });

        // Fetch our form.
        scope.initialForm = Object.assign({}, sfSchema.lookup['f' + attrs.sfField]);
        scope.form = sfSchema.lookup['f' + attrs.sfField];
      },
      post: function post(scope, element, attrs, ctrl) {
        var sfSchema = ctrl[0];
        var formCtrl = ctrl[1];
        var keyCtrl = ctrl[2];

        scope.getKey = function (requiredFormat) {
          var format = requiredFormat || keyFormat.COMPLETE;
          var key = scope.parentKey ? scope.parentKey.slice(0, scope.parentKey.length - 1) : [];

          // Only calculate completeKey if not already saved to form.key
          if (scope.completeKey !== scope.form.key) {
            if (typeof scope.$index === 'number') {
              key = key.concat(scope.$index);
            };

            if (scope.form.key && scope.form.key.length) {
              if (typeof key[key.length - 1] === 'number' && scope.form.key.length >= 1) {
                var trim = scope.form.key.length - key.length;
                scope.completeKey = key.concat(scope.form.key.slice(-trim));
              } else {
                scope.completeKey = scope.form.key.slice();
              };
            };
          };

          // If there is no key then there's nothing to return
          if (!Array.isArray(scope.completeKey)) {
            return undefined;
          };

          // return the full key if not omiting any types via reduce
          if (format === keyFormat.COMPLETE) {
            return scope.completeKey;
          } else {
            // else to clearly show that data must be ommited
            return scope.completeKey.reduce(function (output, input, i) {
              if (-1 !== [format].indexOf(typeof input === 'undefined' ? 'undefined' : _typeof(input))) {
                return output.concat(input);
              }
              return output;
            }, []);
          };
        };
        // Now that getKey is defined, run it! ...if there's a key.
        if (scope.form.key) {
          scope.form.key = scope.completeKey = scope.getKey();
        };

        //Keep error prone logic from the template
        scope.showTitle = function () {
          return scope.form && scope.form.notitle !== true && scope.form.title;
        };

        //Normalise names and ids
        scope.fieldId = function (prependFormName, omitArrayIndexes) {
          var omit = omitArrayIndexes || false;
          var formName = prependFormName && formCtrl && formCtrl.$name ? formCtrl.$name : undefined;
          var key = scope.completeKey;

          if (Array.isArray(key)) {
            return sfPath.name(key, '-', formName, omit);
          } else {
            return '';
          };
        };

        scope.listToCheckboxValues = function (list) {
          var values = {};
          __WEBPACK_IMPORTED_MODULE_0_angular___default.a.forEach(list, function (v) {
            values[v] = true;
          });
          return values;
        };

        scope.checkboxValuesToList = function (values) {
          var lst = [];
          __WEBPACK_IMPORTED_MODULE_0_angular___default.a.forEach(values, function (v, k) {
            if (v) {
              lst.push(k);
            }
          });
          return lst;
        };

        scope.buttonClick = function ($event, form) {
          if (__WEBPACK_IMPORTED_MODULE_0_angular___default.a.isFunction(form.onClick)) {
            form.onClick($event, form);
          } else if (__WEBPACK_IMPORTED_MODULE_0_angular___default.a.isString(form.onClick)) {
            if (sfSchema) {
              //evaluating in scope outside of sfSchemas isolated scope
              sfSchema.evalInParentScope(form.onClick, { '$event': $event, form: form });
            } else {
              scope.$eval(form.onClick, { '$event': $event, form: form });
            }
          }
        };

        /**
         * Evaluate an expression, i.e. scope.$eval
         * but do it in sfSchemas parent scope sf-schema directive is used
         *
         * @param {string} expression
         * @param {Object} locals (optional)
         * @return {Any} the result of the expression
         */
        scope.evalExpr = function (expression, locals) {
          if (sfSchema) {
            //evaluating in scope outside of sfSchemas isolated scope
            return sfSchema.evalInParentScope(expression, locals);
          }

          return scope.$eval(expression, locals);
        };

        /**
         * Evaluate an expression, i.e. scope.$eval
         * in this decorators scope
         *
         * @param {string} expression
         * @param {Object} locals (optional)
         * @return {Any} the result of the expression
         */
        scope.evalInScope = function (expression, locals) {
          if (expression) {
            return scope.$eval(expression, locals);
          }
        };

        /**
         * Interpolate the expression.
         * Similar to `evalExpr()` and `evalInScope()`
         * but will not fail if the expression is
         * text that contains spaces.
         *
         * Use the Angular `{{ interpolation }}`
         * braces to access properties on `locals`.
         *
         * @param  {string} expression The string to interpolate.
         * @param  {Object} locals (optional) Properties that may be accessed in the
         *                         `expression` string.
         * @return {Any} The result of the expression or `undefined`.
         */
        scope.interp = function (expression, locals) {
          return expression && $interpolate(expression)(locals);
        };

        //This works since we get the ngModel from the array or the schema-validate directive.
        scope.hasSuccess = function () {
          if (!scope.ngModel) {
            return false;
          }
          if (scope.options && scope.options.pristine && scope.options.pristine.success === false) {
            return scope.ngModel.$valid && !scope.ngModel.$pristine && !scope.ngModel.$isEmpty(scope.ngModel.$modelValue);
          } else {
            return scope.ngModel.$valid && (!scope.ngModel.$pristine || !scope.ngModel.$isEmpty(scope.ngModel.$modelValue));
          }
        };

        scope.hasError = function () {
          if (!scope.ngModel) {
            return false;
          }
          if (!scope.options || !scope.options.pristine || scope.options.pristine.errors !== false) {
            // Show errors in pristine forms. The default.
            // Note that "validateOnRender" option defaults to *not* validate initial form.
            // so as a default there won't be any error anyway, but if the model is modified
            // from the outside the error will show even if the field is pristine.
            return scope.ngModel.$invalid;
          } else {
            // Don't show errors in pristine forms.
            return scope.ngModel.$invalid && !scope.ngModel.$pristine;
          }
        };

        /**
         * DEPRECATED: use sf-messages instead.
         * Error message handler
         * An error can either be a schema validation message or a angular js validtion
         * error (i.e. required)
         */
        scope.errorMessage = function (schemaError) {
          return sfErrorMessage.interpolate(schemaError && schemaError.code + '' || 'default', scope.ngModel && scope.ngModel.$modelValue || '', scope.ngModel && scope.ngModel.$viewValue || '', scope.form, scope.options && scope.options.validationMessage);
        };

        // append the field-id to the htmlClass
        scope.form.htmlClass = scope.form.htmlClass || '';
        scope.idClass = scope.fieldId(false) + ' ' + scope.fieldId(false, true);

        var form = scope.form;

        // Where there is a key there is probably a ngModel
        if (form.key) {
          // It looks better with dot notation.
          scope.$on('schemaForm.error.' + form.key.join('.'), function (event, error, validationMessage, validity, formName) {
            // validationMessage and validity are mutually exclusive
            formName = validity;
            if (validationMessage === true || validationMessage === false) {
              validity = validationMessage;
              validationMessage = undefined;
            };

            // If we have specified a form name, and this model is not within
            // that form, then leave things be.
            if (formName != undefined && scope.ngModel.$$parentForm.$name !== formName) {
              return;
            };

            if (scope.ngModel && error) {
              if (scope.ngModel.$setDirty) {
                scope.ngModel.$setDirty();
              } else {
                // FIXME: Check that this actually works on 1.2
                scope.ngModel.$dirty = true;
                scope.ngModel.$pristine = false;
              }

              // Set the new validation message if one is supplied
              // Does not work when validationMessage is just a string.
              if (validationMessage) {
                if (!form.validationMessage) {
                  form.validationMessage = {};
                }
                form.validationMessage[error] = validationMessage;
              }

              scope.ngModel.$setValidity(error, validity === true);

              if (validity === true) {
                // Re-trigger model validator, that model itself would be re-validated
                scope.ngModel.$validate();

                // Setting or removing a validity can change the field to believe its valid
                // but its not. So lets trigger its validation as well.
                scope.$broadcast('schemaFormValidate');
              }
            }
          });

          // Clean up the model when the corresponding form field is $destroy-ed.
          // Default behavior can be supplied as a globalOption, and behavior can be overridden
          // in the form definition.
          scope.$on('$destroy', function () {
            var key = scope.getKey();

            // If the entire schema form is destroyed we don't touch the model
            if (!scope.externalDestructionInProgress) {
              var destroyStrategy = form.destroyStrategy || scope.options && scope.options.destroyStrategy || 'remove';
              // No key no model, and we might have strategy 'retain'
              if (key && destroyStrategy !== 'retain') {

                // Get the object that has the property we wan't to clear.
                var obj = scope.model;
                if (key.length > 1) {
                  obj = sfSelect(key.slice(0, key.length - 1), obj);
                }

                // We can get undefined here if the form hasn't been filled out entirely
                if (obj === undefined) {
                  return;
                }

                // Type can also be a list in JSON Schema
                var type = form.schema && form.schema.type || '';

                // Empty means '',{} and [] for appropriate types and undefined for the rest
                //console.log('destroy', destroyStrategy, key, type, obj);
                if (destroyStrategy === 'empty' && type.indexOf('string') !== -1) {
                  obj[key.slice(-1)] = '';
                } else if (destroyStrategy === 'empty' && type.indexOf('object') !== -1) {
                  obj[key.slice(-1)] = {};
                } else if (destroyStrategy === 'empty' && type.indexOf('array') !== -1) {
                  obj[key.slice(-1)] = [];
                } else if (destroyStrategy === 'null') {
                  obj[key.slice(-1)] = null;
                } else {
                  delete obj[key.slice(-1)];
                }
              }
            }
          });
        }
      }
    }
  };
};

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Directive that handles keys and array indexes
 */
/* harmony default export */ __webpack_exports__["a"] = function (schemaForm, sfPath) {
  return {
    scope: true,
    require: ['?^^sfNewArray'],
    link: {
      pre: function pre(scope, element, attrs, ctrl) {
        scope.parentKey = scope.parentKey || [];

        var currentKey = sfPath.parse(attrs.sfParentKey);
        var trim = currentKey.length - scope.parentKey.length;

        if (currentKey.length > 1) currentKey = currentKey.splice(-trim);

        scope.parentKey = scope.parentKey.concat(currentKey, Number(attrs.sfIndex));
        scope.arrayIndex = Number(attrs.sfIndex);
        scope.arrayIndices = scope.arrayIndices || [];
        scope.arrayIndices = scope.arrayIndices.concat(scope.arrayIndex);
        scope.$i = scope.arrayIndices;
        scope.path = function (modelPath) {
          var i = -1;
          modelPath = modelPath.replace(/\[\]/gi, function (matched) {
            i++;
            return '[' + scope.$i[i] + ']';
          });
          return scope.evalExpr(modelPath, scope);
        };
      }
    }
  };
};;

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);


/* harmony default export */ __webpack_exports__["a"] = function ($injector, sfErrorMessage) {

  //Inject sanitizer if it exists
  var $sanitize = $injector.has('$sanitize') ? $injector.get('$sanitize') : function (html) {
    return html;
  };

  return {
    scope: false,
    restrict: 'EA',
    link: function link(scope, element, attrs) {

      var message = '';
      if (attrs.sfMessage) {

        scope.$watch(attrs.sfMessage, function (msg) {
          if (msg) {
            message = $sanitize(msg);
            update(!!scope.ngModel);
          }
        });
      }

      var currentMessage;
      // Only call html() if needed.
      var setMessage = function setMessage(msg) {
        if (msg !== currentMessage) {
          element.html(msg);
          currentMessage = msg;
        }
      };

      var update = function update(checkForErrors) {
        if (checkForErrors) {
          if (!scope.hasError()) {
            setMessage(message);
          } else {
            var errors = [];
            __WEBPACK_IMPORTED_MODULE_0_angular___default.a.forEach(scope.ngModel && scope.ngModel.$error, function (status, code) {
              if (status) {
                // if true then there is an error
                // Angular 1.3 removes properties, so we will always just have errors.
                // Angular 1.2 sets them to false.
                errors.push(code);
              }
            });

            // In Angular 1.3 we use one $validator to stop the model value from getting updated.
            // this means that we always end up with a 'schemaForm' error.
            errors = errors.filter(function (e) {
              return e !== 'schemaForm';
            });

            // We only show one error.
            // TODO: Make that optional
            var error = errors[0];

            if (error) {
              setMessage(sfErrorMessage.interpolate(error, scope.ngModel.$modelValue, scope.ngModel.$viewValue, scope.form, scope.options && scope.options.validationMessage));
            } else {
              setMessage(message);
            }
          }
        } else {
          setMessage(message);
        }
      };

      // Update once.
      update();

      var once = scope.$watch('ngModel', function (ngModel) {
        if (ngModel) {
          // We also listen to changes of the model via parsers and formatters.
          // This is since both the error message can change and given a pristine
          // option to not show errors the ngModel.$error might not have changed
          // but we're not pristine any more so we should change!
          ngModel.$parsers.push(function (val) {
            update(true);return val;
          });
          ngModel.$formatters.push(function (val) {
            update(true);return val;
          });
          once();
        }
      });

      // We watch for changes in $error
      scope.$watchCollection('ngModel.$error', function () {
        update(!!scope.ngModel);
      });
    }
  };
};

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);


/*
FIXME: real documentation
<form sf-form="form"  sf-schema="schema" sf-decorator="foobar"></form>
*/

/* harmony default export */ __webpack_exports__["a"] = function ($compile, $http, $templateCache, $q, schemaForm, schemaFormDecorators, sfSelect, sfPath, sfBuilder) {

  return {
    scope: {
      schema: '=sfSchema',
      initialForm: '=sfForm',
      model: '=sfModel',
      options: '=sfOptions'
    },
    controller: ['$scope', function ($scope) {
      this.evalInParentScope = function (expr, locals) {
        return $scope.$parent.$eval(expr, locals);
      };

      // Set up form lookup map
      var that = this;
      $scope.lookup = function (lookup) {
        if (lookup) {
          that.lookup = lookup;
        }
        return that.lookup;
      };
    }],
    replace: false,
    restrict: 'A',
    transclude: true,
    require: '?form',
    link: function link(scope, element, attrs, formCtrl, transclude) {

      //expose form controller on scope so that we don't force authors to use name on form
      scope.formCtrl = formCtrl;

      //We'd like to handle existing markup,
      //besides using it in our template we also
      //check for ng-model and add that to an ignore list
      //i.e. even if form has a definition for it or form is ["*"]
      //we don't generate it.
      var ignore = {};
      transclude(scope, function (clone) {
        clone.addClass('schema-form-ignore');
        element.prepend(clone);

        if (element[0].querySelectorAll) {
          var models = element[0].querySelectorAll('[ng-model]');
          if (models) {
            for (var i = 0; i < models.length; i++) {
              var key = models[i].getAttribute('ng-model');
              //skip first part before .
              ignore[key.substring(key.indexOf('.') + 1)] = true;
            }
          }
        }
      });

      var lastDigest = {};
      var childScope;

      // Common renderer function, can either be triggered by a watch or by an event.
      scope.resolveReferences = function (schema, form) {
        schemaForm.jsonref(schema).then(function (resolved) {
          scope.render(resolved, form);
        }).catch(function (err) {
          new Error(err);
        });
      };

      scope.render = function (schema, form) {
        //console.log("schema:", JSON.stringify(schema));
        //console.log("resolv:", JSON.stringify(resolved));
        var asyncTemplates = [];
        var merged = schemaForm.merge(schema, form, ignore, scope.options, undefined, asyncTemplates);

        if (asyncTemplates.length > 0) {
          // Pre load all async templates and put them on the form for the builder to use.
          $q.all(asyncTemplates.map(function (form) {
            return $http.get(form.templateUrl, { cache: $templateCache }).then(function (res) {
              form.template = res.data;
            });
          })).then(function () {
            scope.internalRender(schema, form, merged);
          });
        } else {
          scope.internalRender(schema, form, merged);
        };
      };

      scope.internalRender = function (schema, form, merged) {
        // Create a new form and destroy the old one.
        // Not doing keeps old form elements hanging around after
        // they have been removed from the DOM
        // https://github.com/Textalk/angular-schema-form/issues/200
        if (childScope) {
          // Destroy strategy should not be acted upon
          scope.externalDestructionInProgress = true;
          childScope.$destroy();
          scope.externalDestructionInProgress = false;
        };
        childScope = scope.$new();

        //make the form available to decorators
        childScope.schemaForm = { form: merged, schema: schema };

        //clean all but pre existing html.
        Array.prototype.forEach.call(element.children(), function (child) {
          var jchild = __WEBPACK_IMPORTED_MODULE_0_angular___default.a.element(child);
          if (false === jchild.hasClass('schema-form-ignore')) {
            jchild.remove();
          };
        });

        // Find all slots.
        var slots = {};
        var slotsFound = element[0].querySelectorAll('*[sf-insert-field]');

        for (var i = 0; i < slotsFound.length; i++) {
          slots[slotsFound[i].getAttribute('sf-insert-field')] = slotsFound[i];
        }

        // if sfUseDecorator is undefined the default decorator is used.
        var decorator = schemaFormDecorators.decorator(attrs.sfUseDecorator);
        // Use the builder to build it and append the result
        var lookup = Object.create(null);
        scope.lookup(lookup); // give the new lookup to the controller.
        element[0].appendChild(sfBuilder.build(merged, decorator, slots, lookup));

        // We need to know if we're in the first digest looping
        // I.e. just rendered the form so we know not to validate
        // empty fields.
        childScope.firstDigest = true;
        // We use a ordinary timeout since we don't need a digest after this.
        setTimeout(function () {
          childScope.firstDigest = false;
        }, 0);

        //compile only children
        $compile(element.children())(childScope);

        //ok, now that that is done let's set any defaults
        if (!scope.options || scope.options.setSchemaDefaults !== false) {
          schemaForm.traverseSchema(schema, function (prop, path) {
            if (__WEBPACK_IMPORTED_MODULE_0_angular___default.a.isDefined(prop['default'])) {
              var val = sfSelect(path, scope.model);
              if (__WEBPACK_IMPORTED_MODULE_0_angular___default.a.isUndefined(val)) {
                sfSelect(path, scope.model, prop['default']);
              }
            }
          });
        }

        scope.$emit('sf-render-finished', element);
      };

      var defaultForm = ['*'];

      //Since we are dependant on up to three
      //attributes we'll do a common watch
      scope.$watch(function () {
        var schema = scope.schema;
        var form = scope.initialForm || defaultForm;

        //The check for schema.type is to ensure that schema is not {}
        if (form && schema && schema.type && (lastDigest.form !== form || lastDigest.schema !== schema) && Object.keys(schema.properties).length > 0) {
          lastDigest.schema = schema;
          lastDigest.form = form;

          scope.resolveReferences(schema, form);
        }
      });

      // We also listen to the event schemaFormRedraw so you can manually trigger a change if
      // part of the form or schema is chnaged without it being a new instance.
      scope.$on('schemaFormRedraw', function () {
        var schema = scope.schema;
        var form = scope.initialForm ? __WEBPACK_IMPORTED_MODULE_0_angular___default.a.copy(scope.initialForm) : ['*'];
        if (schema) {
          scope.resolveReferences(schema, form);
        }
      });

      scope.$on('$destroy', function () {
        // Each field listens to the $destroy event so that it can remove any value
        // from the model if that field is removed from the form. This is the default
        // destroy strategy. But if the entire form (or at least the part we're on)
        // gets removed, like when routing away to another page, then we definetly want to
        // keep the model intact. So therefore we set a flag to tell the others it's time to just
        // let it be.
        scope.externalDestructionInProgress = true;
      });

      /**
       * Evaluate an expression, i.e. scope.$eval
       * but do it in parent scope
       *
       * @param {String} expression
       * @param {Object} locals (optional)
       * @return {Any} the result of the expression
       */
      scope.evalExpr = function (expression, locals) {
        return scope.$parent.$eval(expression, locals);
      };
    }
  };
};

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);


/* harmony default export */ __webpack_exports__["a"] = function ($compileProvider, sfPathProvider) {
  var defaultDecorator = '';
  var decorators = {};

  // Map template after decorator and type.
  var templateUrl = function templateUrl(name, form) {
    //schemaDecorator is alias for whatever is set as default
    if (name === 'sfDecorator') {
      name = defaultDecorator;
    }

    var decorator = decorators[name];
    if (decorator[form.type]) {
      return decorator[form.type].template;
    }

    //try default
    return decorator['default'].template;
  };

  /**************************************************
   * DEPRECATED                                     *
   * The new builder and sf-field is preferred, but *
   * we keep this in during a transitional period   *
   * so that add-ons that don't use the new builder *
   * works.                                         *
   **************************************************/
  //TODO: Move to a compatability extra script.
  var createDirective = function createDirective(name) {
    $compileProvider.directive(name, ['$parse', '$compile', '$http', '$templateCache', '$interpolate', '$q', 'sfErrorMessage', 'sfPath', 'sfSelect', function ($parse, $compile, $http, $templateCache, $interpolate, $q, sfErrorMessage, sfPath, sfSelect) {

      return {
        restrict: 'AE',
        replace: false,
        transclude: false,
        scope: true,
        require: ['?^sfSchema', '?^form'],
        link: function link(scope, element, attrs, ctrl) {
          var sfSchema = ctrl[0];
          var formCtrl = ctrl[1];

          //The ngModelController is used in some templates and
          //is needed for error messages,
          scope.$on('schemaFormPropagateNgModelController', function (event, ngModel) {
            event.stopPropagation();
            event.preventDefault();
            scope.ngModel = ngModel;
          });

          //Keep error prone logic from the template
          scope.showTitle = function () {
            return scope.form && scope.form.notitle !== true && scope.form.title;
          };

          //Normalise names and ids
          scope.fieldId = function (prependFormName, omitArrayIndexes) {
            var key = scope.parentKey || [];
            if (scope.form.key) {
              if (typeof key[key.length - 1] === 'number') {
                var combinedKey = key.concat(scope.form.key.slice(-1));
                var formName = prependFormName && formCtrl && formCtrl.$name ? formCtrl.$name : undefined;
                return sfPath.name(combinedKey, '-', formName, omitArrayIndexes);
              } else {
                var formName = prependFormName && formCtrl && formCtrl.$name ? formCtrl.$name : undefined;
                return sfPath.name(scope.form.key, '-', formName, omitArrayIndexes);
              }
            } else {
              return '';
            }
          };

          scope.listToCheckboxValues = function (list) {
            var values = {};
            __WEBPACK_IMPORTED_MODULE_0_angular___default.a.forEach(list, function (v) {
              values[v] = true;
            });
            return values;
          };

          scope.checkboxValuesToList = function (values) {
            var lst = [];
            __WEBPACK_IMPORTED_MODULE_0_angular___default.a.forEach(values, function (v, k) {
              if (v) {
                lst.push(k);
              }
            });
            return lst;
          };

          scope.buttonClick = function ($event, form) {
            if (__WEBPACK_IMPORTED_MODULE_0_angular___default.a.isFunction(form.onClick)) {
              form.onClick($event, form);
            } else if (__WEBPACK_IMPORTED_MODULE_0_angular___default.a.isString(form.onClick)) {
              if (sfSchema) {
                //evaluating in scope outside of sfSchemas isolated scope
                sfSchema.evalInParentScope(form.onClick, { '$event': $event, form: form });
              } else {
                scope.$eval(form.onClick, { '$event': $event, form: form });
              };
            };
          };

          /**
           * Evaluate an expression, i.e. scope.$eval
           * but do it in sfSchemas parent scope sf-schema directive is used
           *
           * @param {string} expression
           * @param {Object} locals (optional)
           * @return {Any} the result of the expression
           */
          scope.evalExpr = function (expression, locals) {
            if (sfSchema) {
              //evaluating in scope outside of sfSchemas isolated scope
              return sfSchema.evalInParentScope(expression, locals);
            }

            return scope.$eval(expression, locals);
          };

          /**
           * Evaluate an expression, i.e. scope.$eval
           * in this decorators scope
           *
           * @param {string} expression
           * @param {Object} locals (optional)
           * @return {Any} the result of the expression
           */
          scope.evalInScope = function (expression, locals) {
            if (expression) {
              return scope.$eval(expression, locals);
            }
          };

          /**
           * Interpolate the expression.
           * Similar to `evalExpr()` and `evalInScope()`
           * but will not fail if the expression is
           * text that contains spaces.
           *
           * Use the Angular `{{ interpolation }}`
           * braces to access properties on `locals`.
           *
           * @param  {string} expression The string to interpolate.
           * @param  {Object} locals (optional) Properties that may be accessed in the
           *                         `expression` string.
           * @return {Any} The result of the expression or `undefined`.
           */
          scope.interp = function (expression, locals) {
            return expression && $interpolate(expression)(locals);
          };

          //This works since we ot the ngModel from the array or the schema-validate directive.
          scope.hasSuccess = function () {
            if (!scope.ngModel) {
              return false;
            }
            if (scope.options && scope.options.pristine && scope.options.pristine.success === false) {
              return scope.ngModel.$valid && !scope.ngModel.$pristine && !scope.ngModel.$isEmpty(scope.ngModel.$modelValue);
            } else {
              return scope.ngModel.$valid && (!scope.ngModel.$pristine || !scope.ngModel.$isEmpty(scope.ngModel.$modelValue));
            }
          };

          scope.hasError = function () {
            if (!scope.ngModel) {
              return false;
            }
            return scope.ngModel.$invalid && !scope.ngModel.$pristine;
          };

          /**
           * DEPRECATED: use sf-messages instead.
           * Error message handler
           * An error can either be a schema validation message or a angular js validtion
           * error (i.e. required)
           */
          scope.errorMessage = function (schemaError) {
            return sfErrorMessage.interpolate(schemaError && schemaError.code + '' || 'default', scope.ngModel && scope.ngModel.$modelValue || '', scope.ngModel && scope.ngModel.$viewValue || '', scope.form, scope.options && scope.options.validationMessage);
          };

          // Rebind our part of the form to the scope.
          var once = scope.$watch(attrs.form, function (form) {
            if (form) {
              // Workaround for 'updateOn' error from ngModelOptions
              // see https://github.com/Textalk/angular-schema-form/issues/255
              // and https://github.com/Textalk/angular-schema-form/issues/206
              form.ngModelOptions = form.ngModelOptions || {};
              scope.form = form;

              //ok let's replace that template!
              //We do this manually since we need to bind ng-model properly and also
              //for fieldsets to recurse properly.
              var templatePromise;

              // type: "template" is a special case. It can contain a template inline or an url.
              // otherwise we find out the url to the template and load them.
              if (form.type === 'template' && form.template) {
                templatePromise = $q.when(form.template);
              } else {
                var url = form.type === 'template' ? form.templateUrl : templateUrl(name, form);
                templatePromise = $http.get(url, { cache: $templateCache }).then(function (res) {
                  return res.data;
                });
              }

              templatePromise.then(function (template) {
                if (form.key) {
                  var key = form.key ? sfPathProvider.stringify(form.key).replace(/"/g, '&quot;') : '';
                  template = template.replace(/\$\$value\$\$/g, 'model' + (key[0] !== '[' ? '.' : '') + key);
                }
                element.html(template);

                // Do we have a condition? Then we slap on an ng-if on all children,
                // but be nice to existing ng-if.
                if (form.condition) {

                  var evalExpr = 'evalExpr(form.condition,{ model: model, "arrayIndex": arrayIndex})';
                  if (form.key) {
                    evalExpr = 'evalExpr(form.condition, {' + 'model: model, "arrayIndex": arrayIndex, "modelValue": model' + sfPath.stringify(form.key) + '})';
                  }

                  __WEBPACK_IMPORTED_MODULE_0_angular___default.a.forEach(element.children(), function (child) {
                    var ngIf = child.getAttribute('ng-if');
                    child.setAttribute('ng-if', ngIf ? '(' + ngIf + ') || (' + evalExpr + ')' : evalExpr);
                  });
                }
                $compile(element.contents())(scope);
              });

              // Where there is a key there is probably a ngModel
              if (form.key) {
                // It looks better with dot notation.
                scope.$on('schemaForm.error.' + form.key.join('.'), function (event, error, validationMessage, validity, formName) {
                  // validationMessage and validity are mutually exclusive
                  formName = validity;
                  if (validationMessage === true || validationMessage === false) {
                    validity = validationMessage;
                    validationMessage = undefined;
                  };

                  // If we have specified a form name, and this model is not within
                  // that form, then leave things be.
                  if (formName != undefined && scope.ngModel.$$parentForm.$name !== formName) {
                    return;
                  };

                  // If we have specified a form name, and this model is not within
                  // that form, then leave things be.
                  if (formName != undefined && scope.ngModel.$$parentForm.$name !== formName) {
                    return;
                  }

                  if (scope.ngModel && error) {
                    if (scope.ngModel.$setDirty) {
                      scope.ngModel.$setDirty();
                    } else {
                      // FIXME: Check that this actually works on 1.2
                      scope.ngModel.$dirty = true;
                      scope.ngModel.$pristine = false;
                    };

                    // Set the new validation message if one is supplied
                    // Does not work when validationMessage is just a string.
                    if (validationMessage) {
                      if (!form.validationMessage) {
                        form.validationMessage = {};
                      }
                      form.validationMessage[error] = validationMessage;
                    }

                    scope.ngModel.$setValidity(error, validity === true);

                    if (validity === true) {
                      // Re-trigger model validator, that model itself would be re-validated
                      scope.ngModel.$validate();

                      // Setting or removing a validity can change the field to believe its valid
                      // but its not. So lets trigger its validation as well.
                      scope.$broadcast('schemaFormValidate');
                    }
                  }
                });

                // Clean up the model when the corresponding form field is $destroy-ed.
                // Default behavior can be supplied as a globalOption, and behavior can be overridden
                // in the form definition.
                scope.$on('$destroy', function () {
                  // If the entire schema form is destroyed we don't touch the model
                  if (!scope.externalDestructionInProgress) {
                    var destroyStrategy = form.destroyStrategy || scope.options && scope.options.destroyStrategy || 'remove';
                    // No key no model, and we might have strategy 'retain'
                    if (form.key && destroyStrategy !== 'retain') {

                      // Get the object that has the property we wan't to clear.
                      var obj = scope.model;
                      if (form.key.length > 1) {
                        obj = sfSelect(form.key.slice(0, form.key.length - 1), obj);
                      }

                      // We can get undefined here if the form hasn't been filled out entirely
                      if (obj === undefined) {
                        return;
                      }

                      // Type can also be a list in JSON Schema
                      var type = form.schema && form.schema.type || '';

                      // Empty means '',{} and [] for appropriate types and undefined for the rest
                      if (destroyStrategy === 'empty' && type.indexOf('string') !== -1) {
                        obj[form.key.slice(-1)] = '';
                      } else if (destroyStrategy === 'empty' && type.indexOf('object') !== -1) {
                        obj[form.key.slice(-1)] = {};
                      } else if (destroyStrategy === 'empty' && type.indexOf('array') !== -1) {
                        obj[form.key.slice(-1)] = [];
                      } else if (destroyStrategy === 'null') {
                        obj[form.key.slice(-1)] = null;
                      } else {
                        delete obj[form.key.slice(-1)];
                      }
                    }
                  }
                });
              }

              once();
            }
          });
        }
      };
    }]);
  };

  var createManualDirective = function createManualDirective(type, templateUrl, transclude) {
    transclude = __WEBPACK_IMPORTED_MODULE_0_angular___default.a.isDefined(transclude) ? transclude : false;
    $compileProvider.directive('sf' + __WEBPACK_IMPORTED_MODULE_0_angular___default.a.uppercase(type[0]) + type.substr(1), function () {
      return {
        restrict: 'EAC',
        scope: true,
        replace: true,
        transclude: transclude,
        template: '<sf-decorator form="form"></sf-decorator>',
        link: function link(scope, element, attrs) {
          var watchThis = {
            'items': 'c',
            'titleMap': 'c',
            'schema': 'c'
          };
          var form = { type: type };
          var once = true;
          __WEBPACK_IMPORTED_MODULE_0_angular___default.a.forEach(attrs, function (value, name) {
            if (name[0] !== '$' && name.indexOf('ng') !== 0 && name !== 'sfField') {

              var updateForm = function updateForm(val) {
                if (__WEBPACK_IMPORTED_MODULE_0_angular___default.a.isDefined(val) && val !== form[name]) {
                  form[name] = val;

                  //when we have type, and if specified key we apply it on scope.
                  if (once && form.type && (form.key || __WEBPACK_IMPORTED_MODULE_0_angular___default.a.isUndefined(attrs.key))) {
                    scope.form = form;
                    once = false;
                  }
                }
              };

              if (name === 'model') {
                //"model" is bound to scope under the name "model" since this is what the decorators
                //know and love.
                scope.$watch(value, function (val) {
                  if (val && scope.model !== val) {
                    scope.model = val;
                  }
                });
              } else if (watchThis[name] === 'c') {
                //watch collection
                scope.$watchCollection(value, updateForm);
              } else {
                //$observe
                attrs.$observe(name, updateForm);
              }
            }
          });
        }
      };
    });
  };

  /**
   * DEPRECATED: use defineDecorator instead.
   * Create a decorator directive and its sibling "manual" use decorators.
   * The directive can be used to create form fields or other form entities.
   * It can be used in conjunction with <schema-form> directive in which case the decorator is
   * given it's configuration via a the "form" attribute.
   *
   * ex. Basic usage
   *   <sf-decorator form="myform"></sf-decorator>
   **
   * @param {string} name directive name (CamelCased)
   * @param {Object} templates, an object that maps "type" => "templateUrl"
   */
  this.createDecorator = function (name, templates) {
    //console.warn('schemaFormDecorators.createDecorator is DEPRECATED, use defineDecorator instead.');
    decorators[name] = { '__name': name };

    __WEBPACK_IMPORTED_MODULE_0_angular___default.a.forEach(templates, function (url, type) {
      decorators[name][type] = { template: url, replace: false, builder: [] };
    });

    if (!decorators[defaultDecorator]) {
      defaultDecorator = name;
    }
    createDirective(name);
  };

  /**
   * Define a decorator. A decorator is a set of form types with templates and builder functions
   * that help set up the form.
   *
   * @param {string} name directive name (CamelCased)
   * @param {Object} fields, an object that maps "type" => `{ template, builder, replace}`.
                     attributes `builder` and `replace` are optional, and replace defaults to true.
                       `template` should be the key of the template to load and it should be pre-loaded
                     in `$templateCache`.
                       `builder` can be a function or an array of functions. They will be called in
                     the order they are supplied.
                       `replace` (DEPRECATED) is for backwards compatability. If false the builder
                     will use the "old" way of building that form field using a <sf-decorator>
                     directive.
   */
  this.defineDecorator = function (name, fields) {
    decorators[name] = { '__name': name }; // TODO: this feels like a hack, come up with a better way.

    __WEBPACK_IMPORTED_MODULE_0_angular___default.a.forEach(fields, function (field, type) {
      field.builder = field.builder || [];
      field.replace = __WEBPACK_IMPORTED_MODULE_0_angular___default.a.isDefined(field.replace) ? field.replace : true;
      decorators[name][type] = field;
    });

    if (!decorators[defaultDecorator]) {
      defaultDecorator = name;
    }
    createDirective(name);
  };

  /**
   * DEPRECATED
   * Creates a directive of a decorator
   * Usable when you want to use the decorators without using <schema-form> directive.
   * Specifically when you need to reuse styling.
   *
   * ex. createDirective('text','...')
   *  <sf-text title="foobar" model="person" key="name" schema="schema"></sf-text>
   *
   * @param {string}  type The type of the directive, resulting directive will have sf- prefixed
   * @param {string}  templateUrl
   * @param {boolean} transclude (optional) sets transclude option of directive, defaults to false.
   */
  this.createDirective = createManualDirective;

  /**
   * DEPRECATED
   * Same as createDirective, but takes an object where key is 'type' and value is 'templateUrl'
   * Useful for batching.
   *
   * @param {Object} templates
   */
  this.createDirectives = function (templates) {
    __WEBPACK_IMPORTED_MODULE_0_angular___default.a.forEach(templates, function (url, type) {
      createManualDirective(type, url);
    });
  };

  /**
   * Getter for decorator settings
   *
   * @param {string} name (optional) defaults to defaultDecorator
   * @return {Object} rules and templates { rules: [],templates: {}}
   */
  this.decorator = function (name) {
    name = name || defaultDecorator;
    return decorators[name];
  };

  /**
   * DEPRECATED use defineAddOn() instead.
   * Adds a mapping to an existing decorator.
   *
   * @param {String} name Decorator name
   * @param {String} type Form type for the mapping
   * @param {String} url  The template url
   * @param {Function} builder (optional) builder function
   * @param {boolean} replace (optional) defaults to false. Replace decorator directive with template.
   */
  this.addMapping = function (name, type, url, builder, replace) {
    if (decorators[name]) {
      decorators[name][type] = {
        template: url,
        builder: builder,
        replace: !!replace
      };
    }
  };

  /**
   * Adds an add-on to an existing decorator.
   *
   * @param {String} name Decorator name
   * @param {String} type Form type for the mapping
   * @param {String} url  The template url
   * @param {Function|Array} builder (optional) builder function(s),
   */
  this.defineAddOn = function (name, type, url, builder) {
    if (decorators[name]) {
      decorators[name][type] = {
        template: url,
        builder: builder,
        replace: true
      };
    }
  };

  //Service is just a getter for directive templates and rules
  this.$get = function () {
    return {
      decorator: function decorator(name) {
        return decorators[name] || decorators[defaultDecorator];
      },
      defaultDecorator: defaultDecorator
    };
  };

  //Create a default directive
  createDirective('sfDecorator');
};;

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_json_schema_form_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_json_schema_form_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_json_schema_form_core__);




/**
 * Schema form service.
 */
/* harmony default export */ __webpack_exports__["a"] = function () {
  var postProcessFn = function postProcessFn(form) {
    return form;
  };
  var defaults = __WEBPACK_IMPORTED_MODULE_1_json_schema_form_core__["schemaDefaults"].createDefaults();

  /**
   * Provider API
   */
  this.defaults = defaults;
  this.stdFormObj = __WEBPACK_IMPORTED_MODULE_1_json_schema_form_core__["schemaDefaults"].stdFormObj;
  this.defaultFormDefinition = __WEBPACK_IMPORTED_MODULE_1_json_schema_form_core__["schemaDefaults"].defaultFormDefinition;

  /**
   * Register a post process function.
   * This function is called with the fully merged
   * form definition (i.e. after merging with schema)
   * and whatever it returns is used as form.
   */
  this.postProcess = function (fn) {
    postProcessFn = fn;
  };

  /**
   * Append default form rule
   *
   * @param {string}   type json schema type
   * @param {Function} rule a function(propertyName,propertySchema,options) that returns a form
   *                        definition or undefined
   */
  this.appendRule = function (type, rule) {
    if (!this.defaults[type]) {
      this.defaults[type] = [];
    }
    this.defaults[type].push(rule);
  };

  /**
   * Prepend default form rule
   *
   * @param {string}   type json schema type
   * @param {Function} rule a function(propertyName,propertySchema,options) that returns a form
   *                        definition or undefined
   */
  this.prependRule = function (type, rule) {
    if (!this.defaults[type]) {
      this.defaults[type] = [];
    }
    this.defaults[type].unshift(rule);
  };

  /**
   * Utility function to create a standard form object.
   * This does *not* set the type of the form but rather all shared attributes.
   * You probably want to start your rule with creating the form with this method
   * then setting type and any other values you need.
   * @param {Object} schema
   * @param {Object} options
   * @return {Object} a form field defintion
   */
  this.createStandardForm = __WEBPACK_IMPORTED_MODULE_1_json_schema_form_core__["schemaDefaults"].stdFormObj;
  /* End Provider API */

  this.$get = function () {

    var service = {};
    var typeDefault = this.defaults;

    service.jsonref = __WEBPACK_IMPORTED_MODULE_1_json_schema_form_core__["jsonref"];

    service.merge = function (schema) {
      var form = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['*'];
      var ignore = arguments[2];
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var readonly = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var asyncTemplates = arguments[5];

      //We look at the supplied form and extend it with schema standards
      var canonical = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_json_schema_form_core__["merge"])(schema, form, ignore, options, readonly, asyncTemplates);
      return postProcessFn(canonical);
    };

    /**
     * Create form defaults from schema
     */
    service.defaults = function (schema, types, ignore, options) {
      var defaultTypes = types || typeDefault;
      return __WEBPACK_IMPORTED_MODULE_1_json_schema_form_core__["schemaDefaults"].defaultForm(schema, defaultTypes, ignore, options);
    };

    //Utility functions
    /**
     * Form defaults for schema by type
     * As a form is generated from a schema these are the definitions of each json-schema type
     */
    service.typeDefault = typeDefault;

    /**
     * Traverse a schema, applying a function(schema,path) on every sub schema
     * i.e. every property of an object.
     */
    service.traverseSchema = __WEBPACK_IMPORTED_MODULE_1_json_schema_form_core__["traverseSchema"];

    service.traverseForm = __WEBPACK_IMPORTED_MODULE_1_json_schema_form_core__["traverseForm"];

    return service;
  };
};

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// FIXME: type template (using custom builder)
/* harmony default export */ __webpack_exports__["a"] = function (sfPathProvider) {

  var SNAKE_CASE_REGEXP = /[A-Z]/g;
  var snakeCase = function snakeCase(name, separator) {
    separator = separator || '_';
    return name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
      return (pos ? separator : '') + letter.toLowerCase();
    });
  };
  var formId = 0;

  if (!("firstElementChild" in document.createDocumentFragment())) {
    Object.defineProperty(DocumentFragment.prototype, "firstElementChild", {
      get: function get() {
        for (var nodes = this.childNodes, n, i = 0, l = nodes.length; i < l; ++i) {
          if (n = nodes[i], 1 === n.nodeType) return n;
        }return null;
      }
    });
  }

  var builders = {
    sfField: function sfField(args) {
      args.fieldFrag.firstElementChild.setAttribute('sf-field', formId);

      // We use a lookup table for easy access to our form.
      args.lookup['f' + formId] = args.form;
      formId++;
    },
    ngModel: function ngModel(args) {
      if (!args.form.key) {
        return;
      }
      var key = args.form.key;

      // Redact part of the key, used in arrays
      // KISS keyRedaction is a number.
      if (args.state.keyRedaction) {
        key = key.slice(args.state.keyRedaction);
      }

      // Stringify key.
      var modelValue;
      if (!args.state.modelValue) {
        var strKey = sfPathProvider.stringify(key).replace(/"/g, '&quot;');
        modelValue = args.state.modelName || 'model';

        if (strKey) {
          // Sometimes, like with arrays directly in arrays strKey is nothing.
          modelValue += (strKey[0] !== '[' ? '.' : '') + strKey;
        }
      } else {
        // Another builder, i.e. array has overriden the modelValue
        modelValue = args.state.modelValue;
      }

      // Find all sf-field-value attributes.
      // No value means a add a ng-model.
      // sf-field-value="replaceAll", loop over attributes and replace $$value$$ in each.
      // sf-field-value="attrName", replace or set value of that attribute.
      var nodes = args.fieldFrag.querySelectorAll('[sf-field-model]');
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        var conf = n.getAttribute('sf-field-model');
        if (!conf || conf === '') {
          n.setAttribute('ng-model', modelValue);
        } else if (conf === 'replaceAll') {
          var attributes = n.attributes;
          for (var j = 0; j < attributes.length; j++) {
            if (attributes[j].value && attributes[j].value.indexOf('$$value') !== -1) {
              attributes[j].value = attributes[j].value.replace(/\$\$value\$\$/g, modelValue);
            }
          }
        } else {
          var val = n.getAttribute(conf);
          if (val && val.indexOf('$$value$$')) {
            n.setAttribute(conf, val.replace(/\$\$value\$\$/g, modelValue));
          } else {
            n.setAttribute(conf, modelValue);
          }
        }
      }
    },
    simpleTransclusion: function simpleTransclusion(args) {
      var children = args.build(args.form.items, args.path + '.items', args.state);
      args.fieldFrag.firstChild.appendChild(children);
    },

    // Patch on ngModelOptions, since it doesn't like waiting for its value.
    ngModelOptions: function ngModelOptions(args) {
      if (args.form.ngModelOptions && Object.keys(args.form.ngModelOptions).length > 0) {
        args.fieldFrag.firstChild.setAttribute('ng-model-options', JSON.stringify(args.form.ngModelOptions));
      }
    },
    transclusion: function transclusion(args) {
      var transclusions = args.fieldFrag.querySelectorAll('[sf-field-transclude]');

      if (transclusions.length) {
        for (var i = 0; i < transclusions.length; i++) {
          var n = transclusions[i];

          // The sf-transclude attribute is not a directive,
          // but has the name of what we're supposed to
          // traverse. Default to `items`
          var sub = n.getAttribute('sf-field-transclude') || 'items';
          var items = args.form[sub];

          if (items) {
            var childFrag = args.build(items, args.path + '.' + sub, args.state);
            n.appendChild(childFrag);
          }
        }
      }
    },
    condition: function condition(args) {
      var strKey = '';
      var strModel = 'undefined';
      var ngIf = '';
      // Do we have a condition? Then we slap on an ng-if on all children,
      // but be nice to existing ng-if.
      if (args.form.condition) {
        if (args.form.key) {
          strKey = sfPathProvider.stringify(args.form.key);
          strModel = 'model' + (strKey[0] === '[' ? '' : '.') + strKey;
        }

        var evalExpr = 'evalExpr(' + args.path + '.condition, { model: model, ' + '"arrayIndex": $index, ' + '"arrayIndices": arrayIndices, ' + '"path": path, ' + '"$i": $i, ' + '"$index": $index, ' + '"modelValue": ' + strModel + '})';

        var children = args.fieldFrag.children || args.fieldFrag.childNodes;

        for (var i = 0; i < children.length; i++) {
          var child = children[i];

          if (child.hasAttribute && child.hasAttribute('ng-if')) {
            ngIf = child.getAttribute('ng-if');
          };

          if (child.setAttribute) {
            child.setAttribute('ng-if', ngIf ? '(' + ngIf + ') || (' + evalExpr + ')' : evalExpr);
          };
        }
      }
    },
    array: function array(args) {
      var items = args.fieldFrag.querySelector('[schema-form-array-items]');

      if (args.form.key) {
        var arrayDepth = args.form.key.filter(function (e) {
          return e === '';
        }).length;
      }

      if (items) {
        var state = angular.copy(args.state);
        state.keyRedaction = 0;
        state.keyRedaction += args.form.key.length + 1;

        // Special case, an array with just one item in it that is not an object.
        // So then we just override the modelValue
        if (args.form.schema && args.form.schema.items && args.form.schema.items.type && args.form.schema.items.type.indexOf('object') === -1 && args.form.schema.items.type.indexOf('array') === -1) {
          var strKey = sfPathProvider.stringify(args.form.key).replace(/"/g, '&quot;') + '[$index]';
          state.modelValue = 'modelArray[$index]';
        } else {
          state.modelName = 'item';
        }

        // Flag to the builder that we're in an array.
        // This is needed for compatabiliy if a "old" add-on is used that
        // hasn't been transitioned to the new builder.
        state.arrayCompatFlag = true;

        var childFrag = args.build(args.form.items, args.path + '.items', state);
        items.appendChild(childFrag);
      }
    },
    numeric: function numeric(args) {
      var inputFrag = args.fieldFrag.querySelector('input');
      var maximum = args.form.maximum || false;
      var exclusiveMaximum = args.form.exclusiveMaximum || false;
      var minimum = args.form.minimum || false;
      var exclusiveMinimum = args.form.exclusiveMinimum || false;
      var multipleOf = args.form.multipleOf || false;
      if (inputFrag) {
        if (multipleOf !== false) {
          inputFrag.setAttribute('step', multipleOf);
        };

        if (maximum !== false) {
          if (exclusiveMaximum !== false && multipleOf !== false) {
            maximum = maximum - multipleOf;
          };
          inputFrag.setAttribute('max', maximum);
        };

        if (minimum !== false) {
          if (exclusiveMinimum !== false && multipleOf !== false) {
            minimum = minimum + multipleOf;
          };
          inputFrag.setAttribute('min', minimum);
        };
      };
    }
  };
  this.builders = builders;
  var stdBuilders = [builders.sfField, builders.ngModel, builders.ngModelOptions, builders.condition];
  this.stdBuilders = stdBuilders;

  this.$get = ['$templateCache', 'schemaFormDecorators', 'sfPath', function ($templateCache, schemaFormDecorators, sfPath) {
    var checkForSlot = function checkForSlot(form, slots) {
      // Finally append this field to the frag.
      // Check for slots
      if (form.key) {
        var slot = slots[sfPath.stringify(form.key)];
        if (slot) {
          while (slot.firstChild) {
            slot.removeChild(slot.firstChild);
          }
          return slot;
        }
      }
    };

    var _build = function _build(items, decorator, templateFn, slots, path, state, lookup) {
      state = state || {};
      state = state || {};
      lookup = lookup || Object.create(null);
      path = path || 'schemaForm.form';
      var container = document.createDocumentFragment();
      items.reduce(function (frag, f, index) {

        // Sanity check.
        if (!f.type) {
          return frag;
        }

        var field = decorator[f.type] || decorator['default'];
        if (!field.replace) {
          // Backwards compatability build
          var n = document.createElement(snakeCase(decorator.__name, '-'));
          if (state.arrayCompatFlag) {
            n.setAttribute('form', 'copyWithIndex($index)');
          } else {
            n.setAttribute('form', path + '[' + index + ']');
          }

          (checkForSlot(f, slots) || frag).appendChild(n);
        } else {
          var tmpl;

          // Reset arrayCompatFlag, it's only valid for direct children of the array.
          state.arrayCompatFlag = false;

          // TODO: Create a couple of testcases, small and large and
          //       measure optmization. A good start is probably a
          //       cache of DOM nodes for a particular template
          //       that can be cloned instead of using innerHTML
          var div = document.createElement('div');
          var template = templateFn(f, field) || templateFn(f, decorator['default']);
          div.innerHTML = template;

          // Move node to a document fragment, we don't want the div.
          tmpl = document.createDocumentFragment();
          while (div.childNodes.length > 0) {
            tmpl.appendChild(div.childNodes[0]);
          }

          // Possible builder, often a noop
          var args = {
            fieldFrag: tmpl,
            form: f,
            lookup: lookup,
            state: state,
            path: path + '[' + index + ']',

            // Recursive build fn
            build: function build(items, path, state) {
              return _build(items, decorator, templateFn, slots, path, state, lookup);
            }

          };

          // Let the form definiton override builders if it wants to.
          var builderFn = f.builder || field.builder;

          // Builders are either a function or a list of functions.
          if (typeof builderFn === 'function') {
            builderFn(args);
          } else {
            builderFn.forEach(function (fn) {
              fn(args);
            });
          }

          // Append
          (checkForSlot(f, slots) || frag).appendChild(tmpl);
        }
        return frag;
      }, container);

      return container;
    };

    return {
      /**
       * Builds a form from a canonical form definition
       */
      build: function build(form, decorator, slots, lookup) {
        return _build(form, decorator, function (form, field) {
          if (form.type === 'template') {
            return form.template;
          }
          return $templateCache.get(field.template);
        }, slots, undefined, undefined, lookup);
      },
      builder: builders,
      stdBuilders: stdBuilders,
      internalBuild: _build
    };
  }];
};

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);


/* harmony default export */ __webpack_exports__["a"] = function () {

  // The codes are tv4 error codes.
  // Not all of these can actually happen in a field, but for
  // we never know when one might pop up so it's best to cover them all.

  // TODO: Humanize these.
  var defaultMessages = {
    'default': 'Field does not validate',
    0: 'Invalid type, expected {{schema.type}}',
    1: 'No enum match for: {{viewValue}}',
    10: 'Data does not match any schemas from "anyOf"',
    11: 'Data does not match any schemas from "oneOf"',
    12: 'Data is valid against more than one schema from "oneOf"',
    13: 'Data matches schema from "not"',
    // Numeric errors
    100: 'Value is not a multiple of {{schema.multipleOf}}',
    101: '{{viewValue}} is less than the allowed minimum of {{schema.minimum}}',
    102: '{{viewValue}} is equal to the exclusive minimum {{schema.minimum}}',
    103: '{{viewValue}} is greater than the allowed maximum of {{schema.maximum}}',
    104: '{{viewValue}} is equal to the exclusive maximum {{schema.maximum}}',
    105: 'Value is not a valid number',
    // String errors
    200: 'String is too short ({{viewValue.length}} chars), minimum {{schema.minLength}}',
    201: 'String is too long ({{viewValue.length}} chars), maximum {{schema.maxLength}}',
    202: 'String does not match pattern: {{schema.pattern}}',
    // Object errors
    300: 'Too few properties defined, minimum {{schema.minProperties}}',
    301: 'Too many properties defined, maximum {{schema.maxProperties}}',
    302: 'Required',
    303: 'Additional properties not allowed',
    304: 'Dependency failed - key must exist',
    // Array errors
    400: 'Array is too short ({{value.length}}), minimum {{schema.minItems}}',
    401: 'Array is too long ({{value.length}}), maximum {{schema.maxItems}}',
    402: 'Array items are not unique',
    403: 'Additional items not allowed',
    // Format errors
    500: 'Format validation failed',
    501: 'Keyword failed: "{{title}}"',
    // Schema structure
    600: 'Circular $refs',
    // Non-standard validation options
    1000: 'Unknown property (not in schema)'
  };

  // In some cases we get hit with an angular validation error
  defaultMessages.number = defaultMessages[105];
  defaultMessages.required = defaultMessages[302];
  defaultMessages.min = defaultMessages[101];
  defaultMessages.max = defaultMessages[103];
  defaultMessages.maxlength = defaultMessages[201];
  defaultMessages.minlength = defaultMessages[200];
  defaultMessages.pattern = defaultMessages[202];

  this.setDefaultMessages = function (messages) {
    defaultMessages = messages;
  };

  this.getDefaultMessages = function () {
    return defaultMessages;
  };

  this.setDefaultMessage = function (error, msg) {
    defaultMessages[error] = msg;
  };

  this.$get = ['$interpolate', function ($interpolate) {

    var service = {};
    service.defaultMessages = defaultMessages;

    /**
     * Interpolate and return proper error for an eror code.
     * Validation message on form trumps global error messages.
     * and if the message is a function instead of a string that function will be called instead.
     *
     * @param {string} error the error code, i.e. tv4-xxx for tv4 errors, otherwise it's whats on
     *                       ngModel.$error for custom errors.
     * @param {Any} value the actual model value.
     * @param {Any} viewValue the viewValue
     * @param {Object} form a form definition object for this field
     * @param  {Object} global the global validation messages object (even though its called global
     *                         its actually just shared in one instance of sf-schema)
     * @return {string} The error message.
     */
    service.interpolate = function (error, value, viewValue, form, global) {
      global = global || {};
      var validationMessage = form.validationMessage || {};

      // Drop tv4 prefix so only the code is left.
      if (error.indexOf('tv4-') === 0) {
        error = error.substring(4);
      }

      // First find apropriate message or function
      var message = validationMessage['default'] || global['default'] || '';

      [validationMessage, global, defaultMessages].some(function (val) {
        if (__WEBPACK_IMPORTED_MODULE_0_angular___default.a.isString(val) || __WEBPACK_IMPORTED_MODULE_0_angular___default.a.isFunction(val)) {
          message = val;
          return true;
        }
        if (val && val[error]) {
          message = val[error];
          return true;
        }
      });

      var context = {
        error: error,
        value: value,
        viewValue: viewValue,
        form: form,
        schema: form.schema,
        title: form.title || form.schema && form.schema.title
      };
      if (__WEBPACK_IMPORTED_MODULE_0_angular___default.a.isFunction(message)) {
        return message(context);
      } else {
        return $interpolate(message)(context);
      }
    };

    return service;
  }];
};

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_json_schema_form_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_json_schema_form_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_json_schema_form_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// var JSONSchemaFormCore = require('../../json-schema-form-core/dist/json-schema-form-core');
// import JSONSchemaFormCore from 'json-schema-form-core';



var sfPathProviderClass = function () {
  function sfPathProviderClass() {
    _classCallCheck(this, sfPathProviderClass);

    this.name = __WEBPACK_IMPORTED_MODULE_0_json_schema_form_core__["sfPath"].name;
    this.parse = __WEBPACK_IMPORTED_MODULE_0_json_schema_form_core__["sfPath"].parse;
    this.stringify = __WEBPACK_IMPORTED_MODULE_0_json_schema_form_core__["sfPath"].stringify;
    this.normalize = __WEBPACK_IMPORTED_MODULE_0_json_schema_form_core__["sfPath"].normalize;
  }

  _createClass(sfPathProviderClass, [{
    key: '$get',
    value: function $get() {
      return __WEBPACK_IMPORTED_MODULE_0_json_schema_form_core__["sfPath"];
    }
  }]);

  return sfPathProviderClass;
}();

/* harmony default export */ __webpack_exports__["a"] = sfPathProviderClass;

/***/ }),
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(17)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(18);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(4);


/***/ })
/******/ ]);