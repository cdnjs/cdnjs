/*!
 * angular-schema-form
 * @version 1.0.0-alpha.1
 * @date Sat, 04 Feb 2017 11:08:45 GMT
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

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = angular;

/***/ },
/* 1 */
/***/ function(module, exports) {

/*!
 * json-schema-form-core
 * @version 1.0.0-alpha.1
 * @date Mon, 16 Jan 2017 13:06:10 GMT
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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_objectpath__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_objectpath___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_objectpath__);
/* harmony export (immutable) */ exports["name"] = name;
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0_objectpath__, "parse")) __webpack_require__.d(exports, "parse", function() { return __WEBPACK_IMPORTED_MODULE_0_objectpath__["parse"]; });
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0_objectpath__, "stringify")) __webpack_require__.d(exports, "stringify", function() { return __WEBPACK_IMPORTED_MODULE_0_objectpath__["stringify"]; });
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0_objectpath__, "normalize")) __webpack_require__.d(exports, "normalize", function() { return __WEBPACK_IMPORTED_MODULE_0_objectpath__["normalize"]; });




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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Takes a titleMap in either object or list format and returns one
/* harmony default export */ exports["a"] = function (titleMap, originalEnum) {
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9).ObjectPath;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sf_path__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__canonical_title_map__ = __webpack_require__(1);
/* harmony export (immutable) */ exports["defaultFormDefinition"] = defaultFormDefinition;
/* harmony export (immutable) */ exports["stdFormObj"] = stdFormObj;
/* harmony export (immutable) */ exports["text"] = text;
/* harmony export (immutable) */ exports["number"] = number;
/* harmony export (immutable) */ exports["integer"] = integer;
/* harmony export (immutable) */ exports["checkbox"] = checkbox;
/* harmony export (immutable) */ exports["select"] = select;
/* harmony export (immutable) */ exports["checkboxes"] = checkboxes;
/* harmony export (immutable) */ exports["fieldset"] = fieldset;
/* harmony export (immutable) */ exports["array"] = array;
/* harmony export (immutable) */ exports["createDefaults"] = createDefaults;
/* harmony export (immutable) */ exports["defaultForm"] = defaultForm;
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_schema_defaults__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_sf_path__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_canonical_title_map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_merge__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_select__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_traverse__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_validate__ = __webpack_require__(8);
/* harmony export (binding) */ __webpack_require__.d(exports, "sfPath", function() { return sfPath; });
/* harmony export (binding) */ __webpack_require__.d(exports, "schemaDefaults", function() { return schemaDefaults; });
/* harmony export (binding) */ __webpack_require__.d(exports, "canonicalTitleMap", function() { return canonicalTitleMap; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "merge", function() { return __WEBPACK_IMPORTED_MODULE_3__lib_merge__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "select", function() { return __WEBPACK_IMPORTED_MODULE_4__lib_select__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "traverseSchema", function() { return __WEBPACK_IMPORTED_MODULE_5__lib_traverse__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "traverseForm", function() { return __WEBPACK_IMPORTED_MODULE_5__lib_traverse__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "validate", function() { return __WEBPACK_IMPORTED_MODULE_6__lib_validate__["a"]; });









var sfPath = __WEBPACK_IMPORTED_MODULE_1__lib_sf_path__;
var schemaDefaults = __WEBPACK_IMPORTED_MODULE_0__lib_schema_defaults__;
var canonicalTitleMap = __WEBPACK_IMPORTED_MODULE_2__lib_canonical_title_map__["a" /* default */];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sf_path__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__schema_defaults__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__canonical_title_map__ = __webpack_require__(1);
/* harmony export (immutable) */ exports["a"] = merge;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };





// export function merge(schema, form, schemaDefaultTypes, ignore, options, readonly, asyncTemplates) {
function merge(lookup, form, ignore, options, readonly, asyncTemplates) {
  var formItems = [];
  form = form || [];
  var idx = form.indexOf('*');
  options = options || {};

  if ((typeof lookup === 'undefined' ? 'undefined' : _typeof(lookup)) === 'object' && lookup.hasOwnProperty('properties')) {
    readonly = readonly || lookup.readonly || lookup.readOnly;
    var stdForm = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__schema_defaults__["defaultForm"])(lookup, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__schema_defaults__["createDefaults"])(), ignore, options);
    var defaultFormLookup = stdForm.lookup;

    lookup = defaultFormLookup || lookup;
    formItems = formItems.concat(stdForm.form);
  };

  if (idx !== -1) {
    form = form.slice(0, idx).concat(formItems).concat(form.slice(idx + 1));
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sf_path__ = __webpack_require__(0);
/* harmony export (immutable) */ exports["a"] = select;


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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = traverseSchema;
/* harmony export (immutable) */ exports["b"] = traverseForm;
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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tv4__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tv4___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tv4__);
/* harmony export (immutable) */ exports["a"] = validate;
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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

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
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
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

/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = tv4;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }
/******/ ]);
//# sourceMappingURL=json-schema-form-core.js.map

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_json_schema_form_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_json_schema_form_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_json_schema_form_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sf_builder_provider__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_schema_form_decorators_provider__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_schema_form_provider__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sf_error_message_provider__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sf_path_provider__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_sf_changed_directive__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_sf_field_directive__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_sf_message_directive__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_sf_array_directive__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_sf_key_directive__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_sf_schema_directive__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_schema_validate_directive__ = __webpack_require__(4);



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
  return __WEBPACK_IMPORTED_MODULE_0_json_schema_form_core___default.a.select;
}).factory('sfValidator', function () {
  return __WEBPACK_IMPORTED_MODULE_0_json_schema_form_core___default.a.validate;
})

// Directives
.directive('sfChanged', __WEBPACK_IMPORTED_MODULE_7_sf_changed_directive__["a" /* default */]).directive('sfField', ['$parse', '$compile', '$http', '$templateCache', '$interpolate', '$q', 'sfErrorMessage', 'sfPath', 'sfSelect', __WEBPACK_IMPORTED_MODULE_8_sf_field_directive__["a" /* default */]]).directive('sfMessage', ['$injector', 'sfErrorMessage', __WEBPACK_IMPORTED_MODULE_9_sf_message_directive__["a" /* default */]]).directive('sfNewArray', ['sfSelect', 'sfPath', 'schemaForm', __WEBPACK_IMPORTED_MODULE_10_sf_array_directive__["a" /* default */]]).directive('sfSchema', ['$compile', '$http', '$templateCache', '$q', 'schemaForm', 'schemaFormDecorators', 'sfSelect', 'sfPath', 'sfBuilder', __WEBPACK_IMPORTED_MODULE_12_sf_schema_directive__["a" /* default */]]).directive('schemaValidate', ['sfValidator', '$parse', 'sfSelect', __WEBPACK_IMPORTED_MODULE_13_schema_validate_directive__["a" /* default */]]).directive('sfKeyController', ['schemaForm', 'sfPath', __WEBPACK_IMPORTED_MODULE_11_sf_key_directive__["a" /* default */]]);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);


/* harmony default export */ exports["a"] = function (sfValidator, $parse, sfSelect) {
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);


/**
 * Directive that handles the model arrays
 */
/* harmony default export */ exports["a"] = function (sel, sfPath, schemaForm) {
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

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
/* harmony default export */ exports["a"] = function () {
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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



/* harmony default export */ exports["a"] = function ($parse, $compile, $http, $templateCache, $interpolate, $q, sfErrorMessage, sfPath, sfSelect) {

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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * Directive that handles keys and array indexes
 */
/* harmony default export */ exports["a"] = function (schemaForm, sfPath) {
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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);


/* harmony default export */ exports["a"] = function ($injector, sfErrorMessage) {

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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);


/*
FIXME: real documentation
<form sf-form="form"  sf-schema="schema" sf-decorator="foobar"></form>
*/

/* harmony default export */ exports["a"] = function ($compile, $http, $templateCache, $q, schemaForm, schemaFormDecorators, sfSelect, sfPath, sfBuilder) {

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
      var render = function render(schema, form) {
        var asyncTemplates = [];
        var merged = schemaForm.merge(schema, form, ignore, scope.options, undefined, asyncTemplates);

        if (asyncTemplates.length > 0) {
          // Pre load all async templates and put them on the form for the builder to use.
          $q.all(asyncTemplates.map(function (form) {
            return $http.get(form.templateUrl, { cache: $templateCache }).then(function (res) {
              form.template = res.data;
            });
          })).then(function () {
            internalRender(schema, form, merged);
          });
        } else {
          internalRender(schema, form, merged);
        };
      };

      var internalRender = function internalRender(schema, form, merged) {
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

          render(schema, form);
        }
      });

      // We also listen to the event schemaFormRedraw so you can manually trigger a change if
      // part of the form or schema is chnaged without it being a new instance.
      scope.$on('schemaFormRedraw', function () {
        var schema = scope.schema;
        var form = scope.initialForm ? __WEBPACK_IMPORTED_MODULE_0_angular___default.a.copy(scope.initialForm) : ['*'];
        if (schema) {
          render(schema, form);
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

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);


/* harmony default export */ exports["a"] = function ($compileProvider, sfPathProvider) {
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

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_json_schema_form_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_json_schema_form_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_json_schema_form_core__);




/**
 * Schema form service.
 */
/* harmony default export */ exports["a"] = function () {
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

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// FIXME: type template (using custom builder)
/* harmony default export */ exports["a"] = function (sfPathProvider) {

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

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);


/* harmony default export */ exports["a"] = function () {

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

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

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

/* harmony default export */ exports["a"] = sfPathProviderClass;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(3);


/***/ }
/******/ ]);