/*!
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * * Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * hash:137066ba610a3f2911c3, chunkhash:36abec87a7608356106d, name:bundle.browser, version:v3.2.0
 */
/*!
 * This bundle contains the following packages:
 * └─ @mapcreator/api (3.2.0) ── BSD 3-clause "New" or "Revised" License (http://www.opensource.org/licenses/BSD-3-Clause) ── package.json
 *    ├─ @babel/runtime (7.10.2) ── MIT License (http://www.opensource.org/licenses/MIT) ── node_modules/@babel/runtime/package.json
 *    │  └─ regenerator-runtime (0.13.5) ── MIT License (http://www.opensource.org/licenses/MIT) ── node_modules/@babel/runtime ~ regenerator-runtime/package.json
 *    ├─ case (1.6.3) ── mit or gpl 3.0 or later ── node_modules/case/package.json
 *    ├─ form-data (3.0.0) ── MIT License (http://www.opensource.org/licenses/MIT) ── node_modules/form-data/package.json
 *    │  ├─ asynckit (0.4.0) ── MIT License (http://www.opensource.org/licenses/MIT) ── node_modules/asynckit/package.json
 *    │  ├─ combined-stream (1.0.8) ── MIT License (http://www.opensource.org/licenses/MIT) ── node_modules/form-data ~ combined-stream/package.json
 *    │  │  └─ delayed-stream (1.0.0) ── MIT License (http://www.opensource.org/licenses/MIT) ── node_modules/delayed-stream/package.json
 *    │  └─ mime-types (2.1.34) ── MIT License (http://www.opensource.org/licenses/MIT) ── node_modules/mime-types/package.json
 *    │     └─ mime-db (1.51.0) ── MIT License (http://www.opensource.org/licenses/MIT) ── node_modules/mime-db/package.json
 *    ├─ json-stable-stringify (1.0.1) ── MIT License (http://www.opensource.org/licenses/MIT) ── node_modules/json-stable-stringify/package.json
 *    │  └─ jsonify (0.0.0) ── public domain ── node_modules/jsonify/package.json
 *    ├─ ky (0.21.0) ── MIT License (http://www.opensource.org/licenses/MIT) ── node_modules/ky/package.json
 *    ├─ ky-universal (0.8.1) ── MIT License (http://www.opensource.org/licenses/MIT) ── node_modules/ky-universal/package.json
 *    │  ├─ abort-controller (3.0.0) ── MIT License (http://www.opensource.org/licenses/MIT) ── node_modules/abort-controller/package.json
 *    │  │  └─ event-target-shim (5.0.1) ── MIT License (http://www.opensource.org/licenses/MIT) ── node_modules/event-target-shim/package.json
 *    │  └─ node-fetch (3.0.0-beta.7) ── MIT License (http://www.opensource.org/licenses/MIT) ── node_modules/node-fetch/package.json
 *    │     ├─ data-uri-to-buffer (3.0.1) ── MIT License (http://www.opensource.org/licenses/MIT) ── node_modules/data-uri-to-buffer/package.json
 *    │     └─ fetch-blob (2.0.1) ── MIT License (http://www.opensource.org/licenses/MIT) ── node_modules/fetch-blob/package.json
 *    └─ mitt (1.2.0) ── MIT License (http://www.opensource.org/licenses/MIT) ── node_modules/mitt/package.json
 *
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isParentOf": () => (/* binding */ isParentOf),
/* harmony export */   "getTypeName": () => (/* binding */ getTypeName),
/* harmony export */   "mix": () => (/* binding */ mix),
/* harmony export */   "hasTrait": () => (/* binding */ hasTrait)
/* harmony export */ });
/* harmony import */ var _traits_Trait__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31);
/* harmony import */ var _hash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * Tests if the parent is a parent of child
 * @param {Class|object} parent - Instance or Class
 * @param {Class|object} child - Instance or Class
 * @returns {boolean} - is parent a parent of child
 * @private
 * @example
 * class A {}
 * class B extends A {}
 * class C extends B {}
 *
 * isParentOf(A, C) // true
 * isParentOf(B, C) // true
 * isParentOf(C, C) // true
 * isParentOf(B, A) // false
 */

function isParentOf(parent, child) {
  if (parent === null || child === null) {
    return false;
  }

  parent = typeof parent === 'function' ? parent : parent.constructor;
  child = typeof child === 'function' ? child : child.constructor;

  do {
    if (child.name === parent.name) {
      return true;
    }

    child = Object.getPrototypeOf(child);
  } while (child.name !== '');

  return false;
}
/**
 * Get the name of the value type
 * @param {*} value - Any value
 * @private
 * @returns {string} - Value type name
 */

function getTypeName(value) {
  if (typeof value === 'undefined') {
    return 'undefined';
  }

  value = typeof value === 'function' ? value : value.constructor;
  return value.name;
}
/**
 * Helper class for mix
 * @see {@link mix}
 */

class Empty {}
/**
 * Copy properties from source to target
 * @param {object} target - Object for the properties to be copied to
 * @param {object} source - Object containing properties to be copied
 */


function copyProps(target, source) {
  Object.getOwnPropertyNames(source).concat(Object.getOwnPropertySymbols(source)).forEach(prop => {
    if (!prop.match(/^(?:constructor|initializer|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)) {
      Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
    }
  });
}
/**
 * Mix traits into the target class
 * @param {Class} baseClass - Target base class for the traits to be applied to
 * @param {Class<Trait>} mixins - Traits to be applied
 * @returns {Class} - Constructor with any traits applied
 * @private
 */


function mix(baseClass, ...mixins) {
  const cocktail = class _Cocktail extends (baseClass || Empty) {
    constructor(...args) {
      super(...args);
      mixins.map(mixin => mixin.prototype.initializer).filter(initializer => typeof initializer === 'function').forEach(initializer => initializer.call(this));
    }

  };

  for (const mixin of mixins) {
    if (!isParentOf(_traits_Trait__WEBPACK_IMPORTED_MODULE_0__["default"], mixin)) {
      throw new TypeError(`Expected mixin to implement Trait for ${mixin.name}`);
    }

    copyProps(cocktail.prototype, mixin.prototype);
    copyProps(cocktail, mixin);
  }

  cocktail.__mixins = mixins;
  const hash = (0,_hash__WEBPACK_IMPORTED_MODULE_1__.fnv32b)(mixins.map(x => x.name).join(','));
  Object.defineProperty(cocktail, 'name', {
    value: `Cocktail_${hash}`
  });
  return cocktail;
}
/**
 * Checks if the target has a certain trait.
 *
 * @param {Class|Object} Subject - Instance or class
 * @param {Class<Trait>} TraitClass - Trait to check for
 * @returns {boolean} - If the subject has the trait
 * @private
 */

function hasTrait(Subject, TraitClass) {
  Subject = typeof Subject === 'function' ? Subject : Subject.constructor;

  do {
    if (Array.isArray(Subject.__mixins) && Subject.__mixins.includes(TraitClass)) {
      return true;
    }

    Subject = Object.getPrototypeOf(Subject);
  } while (Subject.name !== '');

  return false;
}

/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPaginatedRange": () => (/* binding */ getPaginatedRange),
/* harmony export */   "delay": () => (/* binding */ delay),
/* harmony export */   "wrapKyCancelable": () => (/* binding */ wrapKyCancelable),
/* harmony export */   "makeCancelable": () => (/* binding */ makeCancelable),
/* harmony export */   "serializeUTCDate": () => (/* binding */ serializeUTCDate),
/* harmony export */   "clone": () => (/* binding */ clone)
/* harmony export */ });
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Get all the pages from a {@link PaginatedResourceListing} or a range
 * @param {Promise<PaginatedResourceListing>|PaginatedResourceListing} page - Promise that returns a {@link PaginatedResourceListing}
 * @param {?Number} [start=1] - Start page
 * @param {?Number} [stop] - Stop page, defaults to the page count if not filled in.
 * @returns {Promise<Array<ResourceBase>>} - multiple pages
 * @throws {ApiError} - If the api returns errors
 * @example
 * import { helpers } from "@mapcreator/api";
 *
 * const promise = api.users.list(1, 50); // 50 per page is more efficient
 *
 * helpers.getPaginatedRange(promise).then(data => {
 *    data.map(row => `[${row.id}] ${row.name}`) // We just want the names
 *        .forEach(console.log) // Log the names and ids of every user
 * })
 */
async function getPaginatedRange(page, start = 1, stop) {
  // Resolve promise if any
  if (page instanceof Promise) {
    page = await page;
  }

  const out = page.data;
  const promises = []; // Handle defaults

  start = start || page.page;
  stop = stop || page.pageCount;

  if (start === page.page) {
    start++;
  } // Get all pages


  for (let i = start; i <= stop; i++) {
    promises.push(page.get(i));
  } // Resolve


  const rows = await Promise.all(promises);
  return out.concat(...rows.map(x => x.data));
}
/**
 * Async delay
 * @private
 * @param {number} ms - milliseconds
 * @returns {Promise}
 */

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
/**
 * Wraps around ky to make it return cancelable requests
 * @param {function(*=, *=): Response} fn - ky instance
 * @returns {function(*=, *=): Response}
 * @private
 */

function wrapKyCancelable(fn) {
  return (input, options = {}) => {
    if (typeof options === 'object' && options.hasOwnProperty('signal')) {
      return fn(input, options);
    }

    const controller = new AbortController();
    const promise = fn(input, {
      signal: controller.signal,
      ...options
    });

    promise.cancel = () => controller.abort();

    return promise;
  };
}
/**
 * @typedef {Promise} CancelablePromise
 * @property {function(): void} cancel - Cancel the promise
 */

/**
 * Makes a promise cancelable by passing it a signal
 * @param {function} fn - async method
 * @returns {CancelablePromise}
 * @private
 */

function makeCancelable(fn) {
  const controller = new AbortController();
  const promise = fn(controller.signal);

  if (promise instanceof Promise) {
    promise.cancel = () => controller.abort();
  }

  return promise;
}
/**
 * Convert Date into server format
 * @param {Date} date - Target
 * @returns {String} - Formatted date
 * @private
 */

function serializeUTCDate(date) {
  if (!(date instanceof Date)) {
    throw new TypeError('Expected date to be of type Date');
  }

  const pad = num => `00${num}`.slice(-Math.max(String(num).length, 2));

  let out = [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()].map(pad).join('-');
  out += ` ${[date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()].map(pad).join(':')}`;
  return out;
}
function clone(input, clonePrivate = true) {
  const _clone = value => clone(value, clonePrivate);

  if (typeof input !== 'object' || input === null) {
    return input;
  } else if (Array.isArray(input)) {
    return input.map(_clone);
  }

  const output = {};

  for (const key of Object.keys(input)) {
    if (!clonePrivate && key.startsWith('_')) {
      continue;
    }

    output[key] = _clone(input[key]);
  }

  return output;
}

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CrudBase)
/* harmony export */ });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35);
/* harmony import */ var _ResourceBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * Base of all resource items that support Crud operations
 * @abstract
 */

class CrudBase extends _ResourceBase__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * @param {Mapcreator} api - Api instance
   * @param {Object<String, *>} data - Item data
   */
  constructor(api, data = {}) {
    super(api, data);

    if (this.constructor === CrudBase) {
      throw new _errors__WEBPACK_IMPORTED_MODULE_0__.AbstractClassError();
    }
  }
  /**
   * Build data for create operation
   * @returns {Object<String, *>} - Create data
   * @protected
   */


  _buildCreateData() {
    this._updateProperties();

    const out = {};
    const keys = [].concat(Object.keys(this._properties), Object.keys(this._baseProperties)).filter((item, pos, self) => self.indexOf(item) === pos);

    for (const key of keys) {
      out[key] = this._properties[key] || this._baseProperties[key];
    }

    delete out.id;
    return out;
  }
  /**
   * Save item. This will create a new item if `id` is unset
   * @returns {CancelablePromise<CrudBase>} - Current instance
   * @throws {ApiError} - If the api returns errors
   * @throws {ValidationError} - If the submitted data isn't valid
   */


  save() {
    return this.id ? this._update() : this._create();
  }
  /**
   * Store new item
   * @returns {CancelablePromise<CrudBase>} - Current instance
   * @throws {ApiError} - If the api returns errors
   * @throws {ValidationError} - If the submitted data isn't valid
   * @private
   */


  _create() {
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.makeCancelable)(async signal => {
      const json = this._prepareData(this._buildCreateData());

      const {
        data
      } = await this.api.ky.post(this.baseUrl, {
        json,
        signal
      }).json();
      this._properties = {};
      this._baseProperties = data;

      this._updateProperties();

      return this;
    });
  }
  /**
   * Update existing item
   * @returns {CancelablePromise<CrudBase>} - Current instance
   * @throws {ApiError} - If the api returns errors
   * @throws {ValidationError} - If the submitted data isn't valid
   * @protected
   */


  _update() {
    this._updateProperties();

    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.makeCancelable)(async signal => {
      // We'll just fake it, no need to bother the server
      // with an empty request.
      if (Object.keys(this._properties).length === 0) {
        return this;
      }

      const json = this._prepareData(this._properties);

      await this.api.ky.patch(this.url, {
        json,
        signal
      }); // Reset changes

      Object.assign(this._baseProperties, this._properties);
      this._properties = {};

      if ('updated_at' in this._baseProperties) {
        this._baseProperties['updated_at'] = new Date();
      }

      return this;
    });
  }
  /**
   * Delete item
   * @param {Boolean} [updateSelf=true] - Update current instance (set the deletedAt property)
   * @returns {CancelablePromise<CrudBase>} - Current instance
   * @throws {ApiError} - If the api returns errors
   * @throws {ValidationError} - If the submitted data isn't valid
   */


  delete(updateSelf = true) {
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.makeCancelable)(async signal => {
      await this.api.ky.delete(this.url, {
        signal
      });

      if (updateSelf) {
        this._baseProperties['deleted_at'] = new Date();
      }

      return this;
    });
  }
  /**
   * Restore item
   * @param {Boolean} [updateSelf=true] - Update current instance (unset the deletedAt property)
   * @returns {CancelablePromise<CrudBase>} - New restored instance
   * @throws {ApiError} - If the api returns errors
   * @throws {ValidationError} - If the submitted data isn't valid
   */


  restore(updateSelf = true) {
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.makeCancelable)(async signal => {
      const {
        data
      } = await this.api.ky.put(this.url, {
        signal
      }).json();
      const instance = new this.constructor(this.api, data);

      if (updateSelf) {
        this._properties = {};
        this._baseProperties = data;

        this._updateProperties();
      }

      return instance;
    });
  }
  /**
   * Prepare data to be sent to the api
   * @param {Object} data
   * @returns {Object} prepared
   * @private
   */


  _prepareData(data) {
    const output = {};

    for (const [key, value] of Object.entries(data)) {
      if (value instanceof Date) {
        output[key] = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.serializeUTCDate)(value);
      } else {
        output[key] = value;
      }
    }

    return output;
  }

}

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResourceBase)
/* harmony export */ });
/* harmony import */ var case__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var case__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(case__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _errors_AbstractError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var _Mapcreator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _proxy_SimpleResourceProxy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var _traits_Injectable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(65);
/* harmony import */ var _utils_hash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(32);
/* harmony import */ var _utils_reflection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(0);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */









function unique(input) {
  return input.filter((v, i) => input.findIndex(vv => vv === v) === i);
}
/**
 * Resource base
 * @abstract
 */


class ResourceBase extends (0,_utils_reflection__WEBPACK_IMPORTED_MODULE_6__.mix)(null, _traits_Injectable__WEBPACK_IMPORTED_MODULE_4__["default"]) {
  /**
   * @param {Mapcreator} api - Api instance
   * @param {Object<String, *>} data - Item data
   */
  constructor(api, data = {}) {
    super();

    if (this.constructor === ResourceBase) {
      throw new _errors_AbstractError__WEBPACK_IMPORTED_MODULE_1__.AbstractClassError();
    }

    this.api = api; // De-reference

    data = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_7__.clone)(data); // Normalize keys to snake_case
    // Fix data types

    for (const key of Object.keys(data)) {
      const newKey = (0,case__WEBPACK_IMPORTED_MODULE_0__.snake)(key);

      if ((0,case__WEBPACK_IMPORTED_MODULE_0__.camel)(newKey) in this) {
        delete data[key];
        continue;
      }

      data[newKey] = this._guessType(newKey, data[key]);

      if (newKey !== key) {
        delete data[key];
      }
    }

    this._baseProperties = data || {};
    this._properties = {};
    this._api = api;
    const fields = Object.keys(this._baseProperties); // Apply properties

    for (const key of fields) {
      this._applyProperty(key);
    } // Add deleted field if possible


    if (fields.includes('deleted_at')) {
      Object.defineProperty(this, 'deleted', {
        enumerable: true,
        configurable: true,
        get: () => Boolean(this.deletedAt)
      });
    }
    /* We keep track of any new fields by recording the
     * keys the object currently has. We don't need no
     * fancy-pants observers, Proxies etc.
     * snake_case only
     */


    this._knownFields = Object.keys(this).filter(x => x[0] !== '_');
  }
  /**
   * Get api instance
   * @returns {Mapcreator} - Api instance
   */


  get api() {
    return this._api;
  }
  /**
   * Set the api instance
   * @param {Mapcreator} value - Api instance
   */


  set api(value) {
    if (!(0,_utils_reflection__WEBPACK_IMPORTED_MODULE_6__.isParentOf)(_Mapcreator__WEBPACK_IMPORTED_MODULE_2__["default"], value)) {
      throw new TypeError('Expected api to be of type Mapcreator or null');
    }

    this._api = value;
  }
  /**
   * Resource path template
   * @returns {String} - Path template
   */


  static get resourcePath() {
    return `/${this.resourceName}/{id}`;
  }
  /**
   * Resource name
   * @returns {String} - Resource name
   * @abstract
   */


  static get resourceName() {
    throw new _errors_AbstractError__WEBPACK_IMPORTED_MODULE_1__.AbstractError();
  }
  /**
   * Returns the url key of the resource
   * @returns {String} - Resource key
   */


  static get resourceUrlKey() {
    return 'id';
  }
  /**
   * Protected read-only fields
   * @returns {Array<string>} - Array containing protected read-only fields
   * @protected
   */


  static get protectedFields() {
    return ['id', 'created_at', 'updated_at', 'deleted_at'];
  }
  /**
   * Returns if the resource is readonly
   * @returns {boolean} - Readonly
   */


  static get readonly() {
    return false;
  }
  /**
   * Moves new fields to this._properties and turns them into a getter/setter
   * @protected
   */


  _updateProperties() {
    // Build a list of new fields
    let fields = Object.keys(this).filter(x => x[0] !== '_').filter(x => !this._knownFields.includes(x)); // Move the pointer from this to the properties object

    for (const key of fields) {
      const newKey = (0,case__WEBPACK_IMPORTED_MODULE_0__.snake)(key);
      this._properties[newKey] = this[key];
      delete this[key];

      this._applyProperty(newKey);

      this._knownFields.push(newKey);
    } // Build a list of new BaseProperty fields


    fields = Object.keys(this._baseProperties).filter(x => !this._knownFields.includes((0,case__WEBPACK_IMPORTED_MODULE_0__.camel)(x)));

    for (const key of fields) {
      this._applyProperty(key);

      this._knownFields.push(key);
    }

    this._knownFields = unique(this._knownFields);
  }
  /**
   * Clean up instance and commit all changes locally.
   * This means that any changed fields will be marked
   * as unchanged whilst  keeping their new values. The
   * changes will not be saved.
   */


  sanitize() {
    this._updateProperties();

    Object.assign(this._baseProperties, this._properties);
    this._properties = {};
  }
  /**
   * Resets model instance to it's original state
   * @param {Array<string>|string|null} [fields=null] - Fields to reset, defaults to all fields
   */


  reset(fields = null) {
    this._updateProperties();

    if (typeof fields === 'string') {
      this.reset([fields]);
    } else if (fields === null) {
      this._properties = {}; // Delete all
    } else if (Array.isArray(fields)) {
      fields.map(String).map(case__WEBPACK_IMPORTED_MODULE_0__.snake).forEach(field => delete this._properties[field]);
    }
  }
  /**
   * Clone the object
   * @returns {ResourceBase} - Exact clone of the object
   */


  clone() {
    this._updateProperties();

    const out = new this.constructor(this.api, this._baseProperties);

    for (const key of Object.keys(this._properties)) {
      out[key] = this._properties[key];
    }

    return out;
  }
  /**
   * Refresh the resource by requesting it from the server again
   * @param {Boolean} updateSelf - Update the current instance
   * @returns {CancelablePromise<ResourceBase>} - Refreshed instance
   * @throws {ApiError} - If the api returns errors
   */


  refresh(updateSelf = true) {
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_7__.makeCancelable)(async signal => {
      const {
        data
      } = await this.api.ky.get(this.url, {
        signal
      }).json();

      if (updateSelf) {
        this._properties = {};
        this._baseProperties = data;

        this._updateProperties();
      }

      return new this.constructor(this._api, data);
    });
  }
  /**
   * Create proxy for property
   * @param {string} key - property key
   * @private
   */


  _applyProperty(key) {
    const desc = {
      enumerable: true,
      configurable: true,
      get: () => {
        if (this._properties.hasOwnProperty(key)) {
          return this._properties[key];
        }

        return this._baseProperties[key];
      }
    };

    if (!this.constructor.protectedFields.includes(key) && !this.constructor.readonly) {
      desc.set = val => {
        this._properties[key] = this._guessType(key, val);
        delete this._url; // Clears url cache
      };
    }

    const newKey = (0,case__WEBPACK_IMPORTED_MODULE_0__.camel)(key);
    Object.defineProperty(this, newKey, desc);
  }
  /**
   * Guess type based on property name
   * @param {string} name - Field name
   * @param {*} value - Field Value
   * @protected
   * @returns {*} - Original or converted value
   */


  _guessType(name, value) {
    if (name.endsWith('_at') || name.startsWith('date_')) {
      return typeof value === 'string' ? new Date(value.replace(' ', 'T')) : value;
    } else if (/(_|^)id$/.test(name) && value !== null) {
      return Number.isFinite(Number(value)) ? Number(value) : value;
    }

    return value;
  }
  /**
   * If the resource can be owned by an organisation
   * @returns {boolean} - Can be owned by an organisation
   */


  get ownable() {
    return false;
  }
  /**
   * Auto generated resource url
   * @returns {string} - Resource url
   */


  get url() {
    if (!this._url) {
      let url = `${this._api.url}${this.constructor.resourcePath}`; // Find and replace any keys

      url = url.replace(/{(\w+)}/g, (match, key) => this[(0,case__WEBPACK_IMPORTED_MODULE_0__.camel)(key)]);
      this._url = url;
    }

    return this._url;
  }
  /**
   * Auto generated Resource base url
   * @returns {string} - Resource base url
   */


  get baseUrl() {
    const basePath = this.constructor.resourcePath.match(/^(\/[^{]+\b)/)[1];
    return `${this._api.url}${basePath}`;
  }
  /**
   * List fields that contain object data
   * @returns {Array<String>} - A list of fields
   */


  get fieldNames() {
    const keys = unique([...Object.keys(this._baseProperties), ...Object.keys(this._properties)]);
    return keys.map(case__WEBPACK_IMPORTED_MODULE_0__.camel);
  }
  /**
   * String representation of the resource, similar to Python's __repr__
   * @returns {string} - Resource name and id
   */


  toString() {
    return `${this.constructor.name}(${this[this.resourceUrlKey]})`;
  }
  /**
   * Transform instance to object
   * @param {boolean} [camelCaseKeys=false] - camelCase object keys
   * @returns {{}} - Object
   */


  toObject(camelCaseKeys = false) {
    this._updateProperties();

    const out = { ...this._baseProperties,
      ...this._properties
    };

    if (camelCaseKeys) {
      for (const key of Object.keys(out)) {
        const ccKey = (0,case__WEBPACK_IMPORTED_MODULE_0__.camel)(key);

        if (key !== ccKey) {
          out[ccKey] = out[key];
          delete out[key];
        }
      }
    }

    return out;
  }
  /**
   * Macro for resource listing
   * @param {string|Class<ResourceBase>} Target - Target object
   * @param {?String} url - Target url, if null it will guess
   * @param {object} seedData - Internal use, used for seeding SimpleResourceProxy::new
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   * @protected
   */


  _proxyResourceList(Target, url = null, seedData = {}) {
    if (!url) {
      url = `${Target.resourceName.replace(/s+$/, '')}s`;
    }

    if (typeof url === 'string' && !url.startsWith('/') && !url.match(/https?:/)) {
      url = `${this.url}/${url}`;
    }

    return new _proxy_SimpleResourceProxy__WEBPACK_IMPORTED_MODULE_3__["default"](this.api, Target, url, seedData);
  }
  /**
   * Static proxy generation
   * @param {string|Class} Target - Constructor or url
   * @param {Class?} Constructor - Constructor for a resource that the results should be cast to
   * @param {Object<string, *>} seedData - Optional data to seed the resolved resources
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   * @example
   * user.static('jobs').lister();
   *
   * @example
   * class FooBar extends ResourceBase {
   *    static get resourceName() {
   *      return 'custom';
   *    }
   * }
   *
   * api.static(FooBar)
   *   .get(1)
   *   .then(console.log);
   */


  static(Target, Constructor = ResourceBase, seedData = {}) {
    let url;

    if (typeof Target === 'string') {
      url = `${this.url}/${Target}`;
      const name = Constructor.name || 'AnonymousResource';
      Target = class AnonymousResource extends Constructor {
        static get resourceName() {
          return Object.getPrototypeOf(this).resourceName || 'anonymous';
        }

        static get resourcePath() {
          return url;
        }

      };
      Object.defineProperty(Target, 'name', {
        value: `${name}_${(0,_utils_hash__WEBPACK_IMPORTED_MODULE_5__.fnv32b)(url)}`
      });
    }

    if (!(0,_utils_reflection__WEBPACK_IMPORTED_MODULE_6__.isParentOf)(ResourceBase, Target)) {
      throw new TypeError('Expected Target to be of type String or ResourceBase constructor');
    }

    return this._proxyResourceList(Target, url, seedData);
  }

}

/***/ }),
/* 4 */
/***/ (function(module) {

/*! Case - v1.6.2 - 2020-03-24
* Copyright (c) 2020 Nathan Bubna; Licensed MIT, GPL */
(function() {
    "use strict";
    var unicodes = function(s, prefix) {
        prefix = prefix || '';
        return s.replace(/(^|-)/g, '$1\\u'+prefix).replace(/,/g, '\\u'+prefix);
    },
    basicSymbols = unicodes('20-26,28-2F,3A-40,5B-60,7B-7E,A0-BF,D7,F7', '00'),
    baseLowerCase = 'a-z'+unicodes('DF-F6,F8-FF', '00'),
    baseUpperCase = 'A-Z'+unicodes('C0-D6,D8-DE', '00'),
    improperInTitle = 'A|An|And|As|At|But|By|En|For|If|In|Of|On|Or|The|To|Vs?\\.?|Via',
    regexps = function(symbols, lowers, uppers, impropers) {
        symbols = symbols || basicSymbols;
        lowers = lowers || baseLowerCase;
        uppers = uppers || baseUpperCase;
        impropers = impropers || improperInTitle;
        return {
            capitalize: new RegExp('(^|['+symbols+'])(['+lowers+'])', 'g'),
            pascal: new RegExp('(^|['+symbols+'])+(['+lowers+uppers+'])', 'g'),
            fill: new RegExp('['+symbols+']+(.|$)','g'),
            sentence: new RegExp('(^\\s*|[\\?\\!\\.]+"?\\s+"?|,\\s+")(['+lowers+'])', 'g'),
            improper: new RegExp('\\b('+impropers+')\\b', 'g'),
            relax: new RegExp('([^'+uppers+'])(['+uppers+']*)(['+uppers+'])(?=[^'+uppers+']|$)', 'g'),
            upper: new RegExp('^[^'+lowers+']+$'),
            hole: /[^\s]\s[^\s]/,
            apostrophe: /'/g,
            room: new RegExp('['+symbols+']')
        };
    },
    re = regexps(),
    _ = {
        re: re,
        unicodes: unicodes,
        regexps: regexps,
        types: [],
        up: String.prototype.toUpperCase,
        low: String.prototype.toLowerCase,
        cap: function(s) {
            return _.up.call(s.charAt(0))+s.slice(1);
        },
        decap: function(s) {
            return _.low.call(s.charAt(0))+s.slice(1);
        },
        deapostrophe: function(s) {
            return s.replace(re.apostrophe, '');
        },
        fill: function(s, fill, deapostrophe) {
            if (fill != null) {
                s = s.replace(re.fill, function(m, next) {
                    return next ? fill + next : '';
                });
            }
            if (deapostrophe) {
                s = _.deapostrophe(s);
            }
            return s;
        },
        prep: function(s, fill, pascal, upper) {
            s = s == null ? '' : s + '';// force to string
            if (!upper && re.upper.test(s)) {
                s = _.low.call(s);
            }
            if (!fill && !re.hole.test(s)) {
                var holey = _.fill(s, ' ');
                if (re.hole.test(holey)) {
                    s = holey;
                }
            }
            if (!pascal && !re.room.test(s)) {
                s = s.replace(re.relax, _.relax);
            }
            return s;
        },
        relax: function(m, before, acronym, caps) {
            return before + ' ' + (acronym ? acronym+' ' : '') + caps;
        }
    },
    Case = {
        _: _,
        of: function(s) {
            for (var i=0,m=_.types.length; i<m; i++) {
                if (Case[_.types[i]].apply(Case, arguments) === s){ return _.types[i]; }
            }
        },
        flip: function(s) {
            return s.replace(/\w/g, function(l) {
                return (l == _.up.call(l) ? _.low : _.up).call(l);
            });
        },
        random: function(s) {
            return s.replace(/\w/g, function(l) {
                return (Math.round(Math.random()) ? _.up : _.low).call(l);
            });
        },
        type: function(type, fn) {
            Case[type] = fn;
            _.types.push(type);
        }
    },
    types = {
        lower: function(s, fill, deapostrophe) {
            return _.fill(_.low.call(_.prep(s, fill)), fill, deapostrophe);
        },
        snake: function(s) {
            return Case.lower(s, '_', true);
        },
        constant: function(s) {
            return Case.upper(s, '_', true);
        },
        camel: function(s) {
            return _.decap(Case.pascal(s));
        },
        kebab: function(s) {
            return Case.lower(s, '-', true);
        },
        upper: function(s, fill, deapostrophe) {
            return _.fill(_.up.call(_.prep(s, fill, false, true)), fill, deapostrophe);
        },
        capital: function(s, fill, deapostrophe) {
            return _.fill(_.prep(s).replace(re.capitalize, function(m, border, letter) {
                return border+_.up.call(letter);
            }), fill, deapostrophe);
        },
        header: function(s) {
            return Case.capital(s, '-', true);
        },
        pascal: function(s) {
            return _.fill(_.prep(s, false, true).replace(re.pascal, function(m, border, letter) {
                return _.up.call(letter);
            }), '', true);
        },
        title: function(s) {
            return Case.capital(s).replace(re.improper, function(small, p, i, s) {
                return i > 0 && i < s.lastIndexOf(' ') ? _.low.call(small) : small;
            });
        },
        sentence: function(s, names, abbreviations) {
            s = Case.lower(s).replace(re.sentence, function(m, prelude, letter) {
                return prelude + _.up.call(letter);
            });
            if (names) {
                names.forEach(function(name) {
                    s = s.replace(new RegExp('\\b'+Case.lower(name)+'\\b', "g"), _.cap);
                });
            }
            if (abbreviations) {
                abbreviations.forEach(function(abbr) {
                    s = s.replace(new RegExp('(\\b'+Case.lower(abbr)+'\\. +)(\\w)'), function(m, abbrAndSpace, letter) {
                        return abbrAndSpace + _.low.call(letter);
                    });
                });
            }
            return s;
        }
    };

    // TODO: Remove "squish" in a future breaking release.
    types.squish = types.pascal;
    
    // Allow import default
    Case.default = Case;

    for (var type in types) {
        Case.type(type, types[type]);
    }
    // export Case (AMD, commonjs, or global)
    var define = typeof define === "function" ? define : function(){};
    define( true && module.exports ? module.exports = Case : this.Case = Case);

}).call(this);


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormData": () => (/* binding */ FormData),
/* harmony export */   "encodeQueryString": () => (/* binding */ encodeQueryString),
/* harmony export */   "wrapKyPrefixUrl": () => (/* binding */ wrapKyPrefixUrl)
/* harmony export */ });
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


function getFormData() {
  if ((0,_node__WEBPACK_IMPORTED_MODULE_0__.windowTest)('FormData')) {
    return window.FormData;
  }

  return __webpack_require__(41);
}
/**
 * @private
 */


const FormData = getFormData();
/**
 * Encodes an object to a http query string with support for recursion
 * @param {Object<string, *>} paramsObject - data to be encoded
 * @param {Array<string>} _basePrefix - Used internally for tracking recursion
 * @returns {string} - encoded http query string
 *
 * @see http://stackoverflow.com/a/39828481
 * @private
 */

function _encodeQueryString(paramsObject, _basePrefix = []) {
  return Object.keys(paramsObject).sort().map(key => {
    const prefix = _basePrefix.slice(0);

    if (typeof paramsObject[key] === 'object' && paramsObject[key] !== null) {
      prefix.push(key);
      return _encodeQueryString(paramsObject[key], prefix);
    }

    prefix.push(key);
    let out = '';
    out += encodeURIComponent(prefix.shift()); // main key

    out += prefix.map(item => `[${encodeURIComponent(item)}]`).join(''); // optional array keys

    const value = paramsObject[key];

    if (value !== null && typeof value !== 'undefined') {
      out += `=${encodeURIComponent(value)}`; // value
    }

    return out;
  }).join('&');
}
/**
 * Encodes an object to a http query string with support for recursion
 * @param {object<string, *>} paramsObject - data to be encoded
 * @returns {string} - encoded http query string
 *
 * @private
 */


function encodeQueryString(paramsObject) {
  const query = _encodeQueryString(paramsObject); // Removes any extra unused &'s.


  return query.replace(/^&*|&+(?=&)|&*$/g, '');
}
/**
 * Wraps around ky to ensure that the prefix is correctly set
 * @param {function(*=, *=): Response} fn - ky instance
 * @param {string} baseUrl - url to be prefixed
 * @returns {function(*=, *=): Response}
 * @private
 */

function wrapKyPrefixUrl(fn, baseUrl) {
  return function (input, options) {
    if (typeof input === 'string' && !/^https?:\/\//.test(input)) {
      if (!input.startsWith('/')) {
        input = `/${input}`;
      }

      input = baseUrl + input;
    }

    return fn(input, options);
  };
}

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OwnableResource)
/* harmony export */ });
/* harmony import */ var _proxy_OrganisationProxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34);
/* harmony import */ var _Trait__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * Provides a {@link ResourceBase} with functions for dealing with being ownable by an organisation
 * @mixin
 */

class OwnableResource extends _Trait__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * Get the list of associated organisations
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */
  get organisations() {
    return new _proxy_OrganisationProxy__WEBPACK_IMPORTED_MODULE_0__["default"](this.api, this);
  }
  /**
   * If the resource can be owned by an organisation
   * @returns {boolean} - Can be owned by an organisation
   */


  get ownable() {
    return true;
  }

}

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "DeletedState": () => (/* reexport */ DeletedState),
  "Enum": () => (/* reexport */ Enum["default"]),
  "JobShareVisibility": () => (/* reexport */ JobShareVisibility),
  "ResultStatus": () => (/* reexport */ ResultStatus)
});

// EXTERNAL MODULE: ./src/enums/Enum.js + 1 modules
var Enum = __webpack_require__(11);
;// CONCATENATED MODULE: ./src/enums/DeletedState.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Enum containing the possible different values for {@link RequestParameters#deleted}
 * @enum {string}
 * @property {string} ALL - Don't discriminate between deleted items and non-deleted resources
 * @property {string} BOTH - Don't discriminate between deleted items and non-deleted resources
 * @property {string} NONE - Don't return deleted resources
 * @property {string} ONLY - Only return deleted resources
 * @readonly
 */

const DeletedState = new Enum["default"]({
  ALL: 'all',
  BOTH: 'all',
  NONE: 'none',
  ONLY: 'only'
});
;// CONCATENATED MODULE: ./src/enums/ResultStatus.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Enum containing the possible different values for {@link RequestParameters#deleted}
 * @enum {string}
 * @property {string} QUEUED - Job has been queued
 * @property {string} PROCESSING - Job is processing
 * @property {string} COMPLETED - Job has been completed
 * @property {string} CANCELED - Job has been canceled
 * @property {string} FAILED - Job has failed
 * @readonly
 */

const ResultStatus = new Enum["default"](['queued', 'processing', 'completed', 'canceled', 'failed'], true);
;// CONCATENATED MODULE: ./src/enums/JobShareVisibility.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Enum containing the possible different visibilities for a {@link JobShare}
 * @enum {string}
 * @property {string} PRIVATE - Anyone outside of the organisation could open the map, the map is not visible within the organisation folder
 * @property {string} PUBLIC - Anyone who has that link can open the map
 * @property {string} ORGANISATION - This map only opens if a user is within the same organisation
 * @readonly
 */

const JobShareVisibility = new Enum["default"](['private', 'organisation', 'public'], true);
;// CONCATENATED MODULE: ./src/enums/index.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */





/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RequestParameters)
/* harmony export */ });
/* harmony import */ var case__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var case__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(case__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _utils_hash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(32);
/* harmony import */ var _utils_reflection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var _utils_requests__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */






/**
 * Used for keeping track of the request parameters
 *
 * @fires RequestParameters#change
 * @fires RequestParameters#change:page
 * @fires RequestParameters#change:perPage
 * @fires RequestParameters#change:search
 * @fires RequestParameters#change:sort
 * @fires RequestParameters#change:deleted
 * @fires RequestParameters#change:extra
 */

class RequestParameters extends events__WEBPACK_IMPORTED_MODULE_1__.EventEmitter {
  /**
   * RequestParameters constructor
   * @param {Object} object - properties
   */
  constructor(object = {}) {
    super(); // Apply defaults

    RequestParameters.keys().forEach(x => this._resolve(x)); // Apply properties

    this.apply(object);
  } // region instance
  // region instance getters

  /**
   * Get page number
   * @returns {Number} - Page number
   * @throws {TypeError}
   */


  get page() {
    return this._resolve('page');
  }
  /**
   * Get rows per page
   * @returns {Number} - Per page
   * @throws {TypeError}
   */


  get perPage() {
    return this._resolve('perPage');
  }
  /**
   * Get pagination offset
   * @returns {Number} - Offset
   * @throws {TypeError}
   */


  get offset() {
    return this._resolve('offset');
  }
  /**
   * Search query
   * @returns {Object<String, String|Array<String>>} - Query
   * @throws {TypeError}
   */


  get search() {
    return this._resolve('search');
  }
  /**
   * Get sort options
   * @returns {Array<String>} - Per page
   * @throws {TypeError}
   */


  get sort() {
    return this._resolve('sort');
  }
  /**
   * If deleted items should be shown
   * @returns {String} - Deleted items filter state
   * @see {@link DeletedState}
   */


  get deleted() {
    return this._resolve('deleted');
  }
  /**
   * Extra parameters
   * @returns {Object} - Extra parameters
   */


  get extra() {
    return this._resolve('extra');
  } // endregion instance getters
  // region instance setters

  /**
   * Page number
   * @param {Number} value - Page number
   */


  set page(value) {
    this._update('page', value);
  }
  /**
   * Rows per page
   * @param {Number} value - Per page
   */


  set perPage(value) {
    this._update('perPage', value);
  }
  /**
   * Pagination offset
   * @param {Number} value - Offset
   */


  set offset(value) {
    this._update('offset', value);
  }
  /**
   * Search query
   * @param {Object<String, String|Array<String>>} value - Search query
   */


  set search(value) {
    this._update('search', value);
  }
  /**
   * Sort query
   * @param {Array<String>} value - Sort query
   */


  set sort(value) {
    this._update('sort', value);
  }
  /**
   * Deleted items filter state
   * @param {String} value - Deleted items filter state
   * @see {@link DeletedState}
   */


  set deleted(value) {
    this._update('deleted', value);
  }
  /**
   * Extra request parameters
   * @param {Object} value - Extra request parameters
   */


  set extra(value) {
    this._update('extra', value);
  } // endregion instance setters
  // endregion instance
  // region static
  // region getters

  /**
   * Default page number
   * @returns {Number} - Page number
   */


  static get page() {
    return RequestParameters._page || 1;
  }
  /**
   * Default per page
   * @returns {Number} - Per page
   */


  static get perPage() {
    return RequestParameters._perPage || Number("12") || 12;
  }
  /**
   * Default pagination offset
   * @returns {Number} - Offset
   */


  static get offset() {
    return RequestParameters._offset || 0;
  }
  /**
   * Gets the maximum allowed value for perPage
   * Some users will have a special permission that allows them to fetch more than 50 resources at once
   * @returns {Number} - Maximum amount of resources per page
   */


  static get maxPerPage() {
    return RequestParameters._maxPerPage || 50;
  }
  /**
   * Default search query
   * @returns {Object<String, String|Array<String>>} - Search query
   */


  static get search() {
    return RequestParameters._search || {};
  }
  /**
   * Default sort query
   * @returns {Array<String>} - Sort query
   */


  static get sort() {
    return RequestParameters._sort || [];
  }
  /**
   * Default deleted items filter state
   * @returns {String|undefined} -  Deleted items filter state
   */


  static get deleted() {
    return RequestParameters._deleted || void 0;
  }
  /**
   * Default extra request parameters
   * @returns {Object} - Extra request parameters
   */


  static get extra() {
    return RequestParameters._extra || {};
  } // endregion getters
  // region setters

  /**
   * Default page number
   * @param {Number} value - Page number
   */


  static set page(value) {
    RequestParameters._page = RequestParameters._validatePage(value);
  }
  /**
   * Default per page
   * @param {Number} value - Per page
   */


  static set perPage(value) {
    RequestParameters._perPage = RequestParameters._validatePerPage(value);
  }
  /**
   * Default pagination offset
   * @param {Number} value - Offset
   */


  static set offset(value) {
    RequestParameters._offset = RequestParameters._validateOffset(value);
  }
  /**
   * Sets the maximum allowed value for perPage
   * Some users will have a special permission that allows them to fetch more than 50 resources at once
   * @param {Number} value - Maximum amount of resources per page
   */


  static set maxPerPage(value) {
    RequestParameters._maxPerPage = RequestParameters._validateMaxPerPage(value);
  }
  /**
   * Default search query
   * @param {Object<String, String|Array<String>>} value - Search query
   */


  static set search(value) {
    RequestParameters._search = RequestParameters._validateSearch(value);
  }
  /**
   * Default sort query
   * @param {Array<String>} value - Sort query
   */


  static set sort(value) {
    RequestParameters._sort = RequestParameters._validateSort(value);
  }
  /**
   * Default deleted items filter state
   * @param {String} value -  Deleted items filter state
   */


  static set deleted(value) {
    RequestParameters._deleted = RequestParameters._validateDeleted(value);
  }
  /**
   * Default extra request parameters
   * @param {Object} value - Extra request parameters
   */


  static set extra(value) {
    RequestParameters._extra = RequestParameters._validateExtra(value);
  } // endregion setters
  // endregion static
  // region validators

  /**
   * Validators should work the same as laravel's ::validate method. This means
   * this means that they will throw a TypeError or return a normalized result.
   */


  static _validatePage(value) {
    if (typeof value !== 'number') {
      throw new TypeError(`Expected page to be of type 'number' instead got '${typeof value}'`);
    }

    if (value < 0) {
      throw new TypeError('Page must be a positive number');
    }

    if (Number.isNaN(value) || !Number.isFinite(value)) {
      throw new TypeError('Page must be a real number');
    }

    if (Math.round(value) !== value) {
      throw new TypeError('Page must be a natural number');
    }

    return Math.round(value);
  }

  static _validatePerPage(value) {
    if (typeof value !== 'number') {
      throw new TypeError(`Expected per page to be of type 'Number' instead got '${(0,_utils_reflection__WEBPACK_IMPORTED_MODULE_4__.getTypeName)(value)}'`);
    }

    if (value <= 0) {
      throw new TypeError('Per page must be greater than zero');
    }

    if (Number.isNaN(value) || !Number.isFinite(value)) {
      throw new TypeError('Per page must be a real number');
    }

    if (Math.round(value) !== value) {
      throw new TypeError('Per page must be a natural number');
    } // Upper limit is 50 by default


    value = Math.min(RequestParameters.maxPerPage, value);
    return value;
  }

  static _validateOffset(value) {
    if (typeof value !== 'number') {
      throw new TypeError(`Expected offset to be of type 'Number' instead got '${(0,_utils_reflection__WEBPACK_IMPORTED_MODULE_4__.getTypeName)(value)}'`);
    }

    if (value < 0) {
      throw new TypeError('Offset must be a positive number');
    }

    if (Number.isNaN(value) || !Number.isFinite(value)) {
      throw new TypeError('Offset must be a real number');
    }

    if (Math.round(value) !== value) {
      throw new TypeError('Offset must be a natural number');
    }

    return value;
  }

  static _validateMaxPerPage(value) {
    if (typeof value !== 'number') {
      throw new TypeError(`Expected page to be of type 'Number' instead got '${(0,_utils_reflection__WEBPACK_IMPORTED_MODULE_4__.getTypeName)(value)}'`);
    }

    if (value < 1) {
      throw new TypeError('Value must be greater or equal to 1');
    }

    return value;
  }

  static _validateSearch(value) {
    if (typeof value !== 'object' || Array.isArray(value)) {
      throw new TypeError(`Expected value to be of type "Object" got "${(0,_utils_reflection__WEBPACK_IMPORTED_MODULE_4__.getTypeName)(value)}"`);
    } // Normalization macro


    const normalize = x => typeof x === 'number' ? x.toString() : x;

    for (let key of Object.keys(value)) {
      key = normalize(key);
      value[key] = normalize(value[key]);

      if (typeof key !== 'string') {
        throw new TypeError(`Expected key to be of type "String" got "${(0,_utils_reflection__WEBPACK_IMPORTED_MODULE_4__.getTypeName)(key)}"`);
      }

      if (Array.isArray(value[key])) {
        if (value[key].length > 0) {
          for (const query of value[key]) {
            if (!['string', 'number', 'boolean'].includes(typeof query) && query !== null) {
              throw new TypeError(`Expected query for "${key}" to be of type "String", "Boolean", "Number" or "null" got "${(0,_utils_reflection__WEBPACK_IMPORTED_MODULE_4__.getTypeName)(query)}"`);
            }
          }
        } else {
          // Drop empty nodes
          delete value[key];
        }
      } else if (value[key] === null) {
        delete value[key];
      } else if (!['string', 'number', 'boolean'].includes(typeof value[key]) && value[key] !== null) {
        throw new TypeError(`Expected query value to be of type "String", "Boolean", "Number", "Array" or "null" got "${(0,_utils_reflection__WEBPACK_IMPORTED_MODULE_4__.getTypeName)(value[key])}"`);
      }
    }

    return value;
  }

  static _validateSort(value) {
    if (typeof value === 'string') {
      return this._validateSort(value.split(','));
    }

    if (!(value instanceof Array)) {
      throw new TypeError(`Expected sort value to be of type "Array" got "${(0,_utils_reflection__WEBPACK_IMPORTED_MODULE_4__.getTypeName)(value)}"`);
    } // Array keys type checking


    value.filter(x => typeof x !== 'string').forEach(x => {
      throw new TypeError(`Expected sort array values to be of type "String" got "${(0,_utils_reflection__WEBPACK_IMPORTED_MODULE_4__.getTypeName)(x)}"`);
    }); // Don't do regex matching because it's something
    // we can just let the server do for us.

    return value;
  }

  static _validateDeleted(value) {
    if (typeof value === 'undefined') {
      return value;
    }

    if (typeof value !== 'string') {
      throw new TypeError(`Expected deleted to be of type "string" got "${(0,_utils_reflection__WEBPACK_IMPORTED_MODULE_4__.getTypeName)(value)}". See: DeletedState`);
    }

    value = value.toLowerCase();
    const possible = _enums__WEBPACK_IMPORTED_MODULE_2__.DeletedState.values();

    if (!possible.includes(value)) {
      throw new TypeError(`Expected deleted to be one of ${possible.join(', ')}, got ${value}`);
    }

    return value;
  }

  static _validateExtra(value) {
    if (typeof value !== 'object') {
      throw new TypeError(`Expected extra to be of type 'object', got '${(0,_utils_reflection__WEBPACK_IMPORTED_MODULE_4__.getTypeName)(value)}'`);
    }

    return value;
  } // endregion validators


  _resolve(name) {
    const _name = `_${name}`;

    if (!this[_name]) {
      // Confuse esdoc
      (this || {})[_name] = RequestParameters[name];
    }

    return this[_name];
  }

  _update(name, value, preventEvent = false) {
    const _name = `_${name}`;
    value = RequestParameters[`_validate${(0,case__WEBPACK_IMPORTED_MODULE_0__.pascal)(name)}`](value);
    (this || {})[_name] = value; // Weird syntax confuses esdoc

    if (!preventEvent) {
      /**
       * Change event.
       *
       * @event RequestParameters#change
       * @type {Array<object>}
       * @property {string} name - Parameter name
       * @property {*} value - New value
       */
      this.emit('change', [{
        name,
        value
      }]);
      this.emit(`change:${name}`, value);
    }

    return value;
  } // region utils

  /**
   * Urlencode parameters
   * @returns {string} - HTTP query
   */


  encode() {
    return (0,_utils_requests__WEBPACK_IMPORTED_MODULE_5__.encodeQueryString)(this.toParameterObject());
  }
  /**
   * Convert to object
   * @returns {Object} - Object
   */


  toObject() {
    return RequestParameters.keys().reduce((obj, key) => {
      obj[(0,case__WEBPACK_IMPORTED_MODULE_0__.snake)(key)] = this._resolve(key);
      return obj;
    }, {});
  }
  /**
   * Convert to object
   * @returns {Object} - Object
   */


  toParameterObject() {
    const data = {};
    RequestParameters.keys().forEach(key => {
      // Skip extra key
      if (key === 'extra') {
        return;
      }

      data[(0,case__WEBPACK_IMPORTED_MODULE_0__.snake)(key)] = this._resolve(key);
    }); // Fix column names for sort

    data.sort = data.sort.map(case__WEBPACK_IMPORTED_MODULE_0__.snake).map(x => x.replace(/^_/, '-')).join(',');

    if (data.offset === 0) {
      delete data.offset;
    } // Fix column names for search


    for (const key of Object.keys(data.search)) {
      const snakeKey = key.split(',').map(case__WEBPACK_IMPORTED_MODULE_0__.snake).join(',');

      if (key !== snakeKey) {
        data.search[snakeKey] = data.search[key];
        delete data.search[key];
      }
    } // Cast search values


    for (const key of Object.keys(data.search)) {
      if (typeof data.search[key] === 'boolean') {
        data.search[key] = Number(data.search[key]);
      }

      if (data.search[key] === null) {
        data.search[key] = '';
      }
    } // Overwrite using extra properties


    const extra = this._resolve('extra');

    for (const key of Object.keys(extra)) {
      data[key] = extra[key];
    }

    for (const key of Object.keys(data)) {
      if (typeof data[key] === 'undefined') {
        delete data[key];
      }
    }

    return data;
  }
  /**
   * Copy object
   * @returns {RequestParameters} - Copy
   */


  copy() {
    return new RequestParameters(this.toObject());
  }
  /**
   * Different parameters
   * @returns {Array<String>} - keys
   */


  static keys() {
    // enumeration is disabled for properties
    return ['page', 'perPage', 'offset', 'search', 'sort', 'deleted', 'extra'];
  }
  /**
   * Generates a cache token
   * @returns {string} - Cache token
   */


  token() {
    const data = this.toObject();
    delete data.page;
    delete data['per_page'];
    return (0,_utils_hash__WEBPACK_IMPORTED_MODULE_3__.hashObject)(data);
  }
  /**
   * Resets all parameters back to default
   */


  static resetDefaults() {
    for (const key of RequestParameters.keys()) {
      delete RequestParameters[`_${key}`];
    }
  }
  /**
   * Apply parameters from object
   * @param {object|RequestParameters} params - parameters
   * @returns {Object[]} - Array containing the updated values
   * @example
   * const params = new RequestParameters({perPage: 12});
   *
   * params.perPage === 12;
   *
   * params.apply({perPage: 50});
   *
   * params.perPage === 50;
   */


  apply(params) {
    if (params instanceof RequestParameters) {
      params = params.toObject();
    }

    const out = [];

    for (const key of Object.keys(params)) {
      const Key = (0,case__WEBPACK_IMPORTED_MODULE_0__.camel)(key);

      if (key[0] === '_' || !RequestParameters.keys().includes(Key)) {
        continue;
      }

      out.push({
        name: Key,
        value: this._update(Key, params[key], true)
      });
    }

    this.emit('change', out);

    for (const {
      name,
      value
    } of out) {
      this.emit(`change:${name}`, value);
    }

    return out;
  } // endregion utils


}

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isNode": () => (/* binding */ isNode),
/* harmony export */   "windowTest": () => (/* binding */ windowTest)
/* harmony export */ });
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Test if the application is running under nodejs
 * @returns {boolean} - Is the application running under node?
 * @see https://nodejs.org
 * @private
 */
function isNode() {
  try {
    return Object.prototype.toString.call(typeof process === 'undefined' ? 0 : process) === '[object process]';
  } catch (_) {
    return false;
  }
}
/**
 * Quickly check if the window contains a variable
 * @param {string} str - target variable
 * @returns {boolean} - If the window contains the variable
 * @private
 */

function windowTest(str) {
  return typeof window !== 'undefined' && typeof window[str] !== 'undefined';
}

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CrudSetItemBase)
/* harmony export */ });
/* harmony import */ var _errors_AbstractError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _CrudBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var case__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var case__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(case__WEBPACK_IMPORTED_MODULE_2__);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * Items that are part of a set
 * @abstract
 */

class CrudSetItemBase extends _CrudBase__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * @param {Mapcreator} api - Api instance
   * @param {Object<String, *>} data - Item data
   */
  constructor(api, data = {}) {
    super(api, data);

    if (this.constructor === _CrudBase__WEBPACK_IMPORTED_MODULE_1__["default"]) {
      throw new _errors_AbstractError__WEBPACK_IMPORTED_MODULE_0__.AbstractClassError();
    }
  }

  get hasParent() {
    const parentKey = (0,case__WEBPACK_IMPORTED_MODULE_2__.camel)(this.constructor.parentKey);
    return this.hasOwnProperty(parentKey);
  }
  /**
   * Get the parent id
   * @returns {number|undefined} - Parent number
   */


  get parentId() {
    if (this.hasParent) {
      const parentKey = (0,case__WEBPACK_IMPORTED_MODULE_2__.camel)(this.constructor.parentKey);
      return Number(this[parentKey]);
    }

    return void 0;
  }
  /**
   * Get the parent key
   * @returns {string} - Parent key
   */


  static get parentKey() {
    return this.resourceName.replace(/s$/, '_set_id');
  }

}

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Enum)
});

// EXTERNAL MODULE: ./node_modules/case/dist/Case.js
var Case = __webpack_require__(4);
// EXTERNAL MODULE: ./src/utils/reflection.js
var reflection = __webpack_require__(0);
;// CONCATENATED MODULE: ./src/utils/Unobservable.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Makes an object and it's children unobservable by frameworks like Vuejs
 * @protected
 */
class Unobservable {
  /**
   * Overrides the `Object.prototype.toString.call(obj)` result
   * @returns {string} - type name
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag
   */
  get [Symbol.toStringTag]() {
    // Anything can go here really as long as it's not 'Object'
    return this.constructor.name;
  }

}
;// CONCATENATED MODULE: ./src/enums/Enum.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * Base enum class
 * @example
 * const Colors = new Enum(['RED', 'BLACK', 'GREEN', 'WHITE', 'BLUE']);
 *
 * const Answers = new Enum({
 *   YES: true,
 *   NO: false,
 *   // Passing functions as values will turn them into getters
 *   // Getter results will appear in ::values
 *   MAYBE: () => Math.random() >= 0.5,
 * });
 *
 * const FontStyles = new Enum(['italic', 'bold', 'underline', 'regular'], true);
 * FontStyles.ITALIC === 'italic'
 * FontStyles.BOLD   === 'bold'
 *
 * // etc...
 */

class Enum extends Unobservable {
  /**
   * @param {Object<String, *>|Array<String>} enums - Data to build the enum from
   * @param {boolean} auto - Auto generate enum from data making assumptions about
   *                         the data, requires enums to be of type array.
   */
  constructor(enums, auto = false) {
    super();
    const isArray = Array.isArray(enums);

    if (auto && !isArray) {
      throw new TypeError(`Expected enums to be of type "Array" got "${(0,reflection.getTypeName)(enums)}"`);
    }

    if (isArray && auto) {
      for (const row of enums) {
        const key = (0,Case.constant)(row);
        Object.defineProperty(this, key, {
          enumerable: true,
          value: row
        });
      }
    } else if (isArray) {
      for (const key of enums) {
        Object.defineProperty(this, key, {
          enumerable: true,
          value: Enum._iota
        });
      }
    } else {
      for (const key of Object.keys(enums)) {
        const init = {
          enumerable: true
        };

        if (typeof enums[key] === 'function') {
          init.get = enums[key];
        } else {
          init.value = enums[key];
        }

        Object.defineProperty(this, key, init);
      }
    }

    Object.freeze(this);
  }
  /**
   * List enum keys
   * @returns {Array} - Enum keys
   */


  keys() {
    return Object.keys(this);
  }
  /**
   * List enum values
   * @returns {Array<*>} - Enum values
   */


  values() {
    return this.keys().map(key => this[key]).filter((v, i, s) => s.indexOf(v) === i);
  }

  static get _iota() {
    if (!Enum.__iota) {
      Enum.__iota = 0;
    }

    return Enum.__iota++;
  }

}

/***/ }),
/* 12 */
/***/ ((module) => {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OAuthToken)
/* harmony export */ });
/* harmony import */ var _storage_StorageManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _utils_requests__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * Oauth token container
 */

class OAuthToken {
  /**
   * @param {String} token - OAuth token
   * @param {String} [type=Bearer] - token type
   * @param {Date|Number} [expires=5 days] - expire time in seconds or Date
   * @param {Array<string>} [scopes=[]] - Any scopes
   */
  constructor(token, type = 'Bearer', expires = 432000, scopes = []) {
    this.scopes = scopes;
    this.token = token;
    this.type = type.toLowerCase().replace(/(\s|^)\w/g, x => x.toUpperCase());

    if (typeof expires === 'number') {
      const ms = expires * 1000; // Expires is in seconds

      this.expires = new Date(Date.now() + ms);
    } else if (expires instanceof Date) {
      this.expires = expires;
    } else {
      throw new TypeError('Expires not of type Date or Number');
    }
  }
  /**
   * String representation of the token, usable in the Authorization header
   * @returns {string} - String representation
   */


  toString() {
    return `${this.type} ${this.token}`;
  }
  /**
   * Get equivalent OAuth response object
   * @returns {{access_token: (String|*), token_type: String, expires_in: Number, scope: (Array.<String>|Array|*)}} - Raw response object
   */


  toResponseObject() {
    return {
      'access_token': this.token,
      'token_type': this.type.toLowerCase(),
      'expires_in': this.expires - Date.now(),
      'scope': this.scopes
    };
  }
  /**
   * Export oauth response query string
   * @returns {string} - OAuth response query
   */


  toQueryString() {
    return (0,_utils_requests__WEBPACK_IMPORTED_MODULE_1__.encodeQueryString)(this.toResponseObject());
  }
  /**
   * If the token has expired
   * @returns {Boolean} - expired
   */


  get expired() {
    return new Date() > this.expires;
  }
  /**
   * Internal storage key name
   * @returns {String} - storage name
   * @constant
   */


  static get storageName() {
    return 'api_token';
  }
  /**
   * Build instance from response object
   * @param {String|Object} data - object or JSON string
   * @returns {OAuthToken} - New OAuthToken instance
   */


  static fromResponseObject(data) {
    if (typeof data === 'string') {
      data = JSON.parse(data);
    } // Default expires = 5 days


    let expires = 432000;

    if (typeof data['exipires_in'] !== 'undefined') {
      expires = Number(data['expires_in']);
    } else if (typeof data.expires === 'string') {
      expires = new Date(data.expires);
    }

    return new OAuthToken(data['access_token'], data['token_type'], expires, data.scope || []);
  }
  /**
   * Store the token for later recovery. Token will be stored in HTTPS cookie if possible.
   * @param {String} name - db key name
   * @throws {OAuthToken#recover}
   */


  save(name = OAuthToken.storageName) {
    const data = {
      token: this.token,
      type: this.type,
      expires: this.expires.toUTCString(),
      scopes: this.scopes
    }; // Third parameter is only used when we're using cookies

    _storage_StorageManager__WEBPACK_IMPORTED_MODULE_0__["default"].secure.set(name, JSON.stringify(data), this.expires);
  }
  /**
   * Recover a token by looking through the HTTPS cookies and localStorage
   * @param {String} name - Storage key name
   * @returns {OAuthToken|null} - null if none could be recovered
   * @throws {OAuthToken#save}
   */


  static recover(name = OAuthToken.storageName) {
    const data = _storage_StorageManager__WEBPACK_IMPORTED_MODULE_0__["default"].secure.get(name);

    if (!data) {
      return null;
    }

    const obj = JSON.parse(data);
    const instance = new OAuthToken(obj.token, obj.type, new Date(obj.expires), obj.scopes || []);

    if (instance.expired) {
      return null;
    }

    return instance;
  }

}

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ SimpleResourceProxy)
});

// EXTERNAL MODULE: ./src/Mapcreator.js + 1 modules
var Mapcreator = __webpack_require__(16);
// EXTERNAL MODULE: ./src/RequestParameters.js
var RequestParameters = __webpack_require__(8);
// EXTERNAL MODULE: ./src/utils/reflection.js
var reflection = __webpack_require__(0);
// EXTERNAL MODULE: ./src/utils/helpers.js
var helpers = __webpack_require__(1);
;// CONCATENATED MODULE: ./src/PaginatedResourceListing.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */




/**
 * Proxy for accessing paginated resources
 */

class PaginatedResourceListing {
  /**
   * @param {Mapcreator} api - Instance of the api
   * @param {String} route - Resource route
   * @param {Class<ResourceBase>} Target - Wrapper target
   * @param {RequestParameters} parameters - Request parameters
   * @param {Number} pageCount - Resolved page count
   * @param {Number} rowCount - Resolved rowCount
   * @param {Array<ResourceBase>} data - Resolved data
   * @private
   */
  constructor(api, route, Target, parameters, pageCount = null, rowCount = 0, data = []) {
    if (!(0,reflection.isParentOf)(Mapcreator["default"], api)) {
      throw new TypeError('Expected api to be of type Mapcreator');
    }

    if (!(0,reflection.isParentOf)(RequestParameters["default"], parameters)) {
      parameters = new RequestParameters["default"](parameters);
    }

    this._api = api;
    this.route = route;
    this._Target = Target;
    this._parameters = parameters;
    this._pageCount = pageCount;
    this._rows = rowCount;
    this._data = data;
  }
  /**
   * Get api instance
   * @returns {Mapcreator} - Api instance
   */


  get api() {
    return this._api;
  }
  /**
   * Target route
   * @returns {String} - Url
   */


  get route() {
    return this._route;
  }
  /**
   * Override the target route
   * @param {String} value - route
   */


  set route(value) {
    if (!value.startsWith('https://') && !value.startsWith('http://')) {
      if (!value.startsWith('/')) {
        value = `/${value}`;
      }

      value = `${this._api.url}${value}`;
    }

    this._route = value;
  }
  /**
   * Target to wrap results in
   * @returns {Class<ResourceBase>} - Target constructor
   */


  get Target() {
    return this._Target;
  }
  /**
   * Request parameters
   * @returns {RequestParameters} - Request parameters
   */


  get parameters() {
    return this._parameters;
  }
  /**
   * Request parameters
   * @param {RequestParameters} value - Request parameters
   */


  set parameters(value) {
    this._parameters = value;
  }
  /**
   * Current page number
   * @returns {Number} - Current page
   */


  get page() {
    return this.parameters.page;
  }
  /**
   * Maximum amount of items per page
   * @returns {Number} - Amount of items
   */


  get perPage() {
    return this.parameters.perPage;
  }
  /**
   * Set sort direction
   * @returns {Array<String>} - Sort
   * @example
   * const sort = ['-name', 'id']
   */


  get sort() {
    return this.parameters.sort;
  }
  /**
   * Current sorting value
   * @param {Array<String>} value - Sort
   */


  set sort(value) {
    this.parameters.sort = value;
  }
  /**
   * Deleted items filter state
   * @returns {String} value - Deleted items filter state
   * @see {@link DeletedState}
   */


  get deleted() {
    return this.parameters.deleted;
  }
  /**
   * Deleted items filter state
   * @param {String} value - Deleted items filter state
   * @see {@link DeletedState}
   */


  set deleted(value) {
    this.parameters.deleted = value;
  }
  /**
   * Amount of pages available
   * @returns {Number} - Page count
   */


  get pageCount() {
    return this._pageCount;
  }
  /**
   * Page data
   * @returns {Array<ResourceBase>} - Wrapped data
   */


  get data() {
    return this._data;
  }
  /**
   * Row count
   * @returns {Number} - Row count
   */


  get rows() {
    return this._rows;
  }
  /**
   * Optional search query
   * @default {}
   * @return {Object<String, String|Array<String>>} - Query
   */


  get query() {
    return this.parameters.search;
  }
  /**
   * Optional search query
   * @param {Object<String, String|Array<String>>} value - Query
   * @throws {TypeError}
   * @default {}
   * @see {@link ResourceProxy#search}
   */


  set query(value) {
    this.parameters.search = value;
  }
  /**
   * Get target page
   * @param {Number} page - Page number
   * @param {Number} perPage - Amount of items per page (max 50)
   * @returns {CancelablePromise<PaginatedResourceListing>} - Target page
   * @throws {ApiError} - If the api returns errors
   */


  getPage(page = this.page, perPage = this.perPage) {
    const query = this.parameters.copy();
    query.page = page;
    query.perPage = perPage;
    const glue = this.route.includes('?') ? '&' : '?';
    const url = this.route + glue + query.encode();
    return (0,helpers.makeCancelable)(async signal => {
      const response = await this.api.ky.get(url, {
        signal
      });
      const {
        data
      } = await response.json();
      const rowCount = Number(response.headers.get('x-paginate-total') || data.length);
      const totalPages = Number(response.headers.get('x-paginate-pages') || 1);
      const parameters = this.parameters.copy();
      parameters.page = page;
      return new PaginatedResourceListing(this.api, this.route, this.Target, parameters, totalPages, rowCount, data.map(row => new this.Target(this.api, row)));
    });
  }
  /**
   * If there is a next page
   * @returns {boolean} - If there is a next page
   */


  get hasNext() {
    return this.page < this.pageCount;
  }
  /**
   * If there is a previous page
   * @returns {boolean} - If there is a previous page
   */


  get hasPrevious() {
    return this.page > 1;
  }
  /**
   * Used for caching pages internally
   * @returns {string} - Cache token
   * @see {@link PaginatedResourceWrapper}
   * @see {@link ResourceCache}
   */


  get cacheToken() {
    return this.parameters.token();
  }
  /**
   * Get next page
   * @returns {CancelablePromise<PaginatedResourceListing>} - Paginated resource
   * @throws {ApiError} - If the api returns errors
   */


  next() {
    return this.getPage(this.page + 1);
  }
  /**
   * Get previous page
   * @returns {CancelablePromise<PaginatedResourceListing>} - Paginated resource
   * @throws {ApiError} - If the api returns errors
   */


  previous() {
    return this.getPage(this.page - 1);
  }

}
// EXTERNAL MODULE: ./src/ResourceLister.js
var ResourceLister = __webpack_require__(77);
// EXTERNAL MODULE: ./src/resources/base/ResourceBase.js
var ResourceBase = __webpack_require__(3);
;// CONCATENATED MODULE: ./src/proxy/SimpleResourceProxy.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */





/**
 * Proxy for accessing resource. This will make sure that they
 * are properly wrapped before the promise resolves.
 * @protected
 */

class SimpleResourceProxy {
  /**
   * @param {Mapcreator} api - Instance of the api
   * @param {Class<ResourceBase>} Target - Target to wrap
   * @param {?string} [altUrl=null] - Internal use, Optional alternative url for more complex routing
   * @param {object} seedData - Internal use, used for seeding ::new
   */
  constructor(api, Target, altUrl = null, seedData = {}) {
    if (!(0,reflection.isParentOf)(ResourceBase["default"], Target)) {
      throw new TypeError('Target is not a child of ResourceBase');
    }

    if (typeof Target !== 'function') {
      throw new TypeError('Target must to be a class not an instance');
    }

    if (altUrl) {
      this.__baseUrl = altUrl;
    }

    this._api = api;
    this._Target = Target;
    this._seedData = seedData;
  }
  /**
   * Proxy target url
   * @returns {string} url
   * @example
   * api.layers.select(100).organisations.baseUrl === "https://maponline-api.dev/v1/layers/100/organisations"
   */


  get baseUrl() {
    if (!this.__baseUrl) {
      this.__baseUrl = this.new().baseUrl;
    }

    return this.__baseUrl;
  }
  /**
   * Get api instance
   * @returns {Mapcreator} - Api instance
   */


  get api() {
    return this._api;
  }
  /**
   * Target to wrap results in
   * @returns {Class<ResourceBase>} - Target constructor
   */


  get Target() {
    return this._Target;
  }
  /**
   * Build a new instance of the target
   * @param {Object<String, *>} data - Data for the object to be populated with
   * @returns {ResourceBase} - Resource with target data
   */


  new(data = {}) {
    // Merge but don't overwrite using seed data
    data = { ...this._seedData,
      ...data
    };
    return new this.Target(this._api, data);
  }
  /**
   * List target resource
   * @param {Number|Object|RequestParameters} [params] - Parameters or the page number to be requested
   * @param {Number} [params.page=1] - The page to be requested
   * @param {Number} [params.perPage=RequestParameters.perPage] - Amount of items per page. This is silently capped by the API
   * @param {String|String[]} [params.sort=''] - Amount of items per page. This is silently capped by the API
   * @param {String} [params.deleted=RequestParameters.deleted] - Show deleted resources, posible values: only, none, all
   * @param {?Object<String, String|Array<String>>} [params.search] - Search parameters
   * @returns {CancelablePromise<PaginatedResourceListing>} - paginated resource
   * @throws {ApiError} - If the api returns errors
   * @example
   * // Find layers with a name that starts with "test" and a scale_min between 1 and 10
   * // See Api documentation for search query syntax
   * const search = {
   *   name: '^:test',
   *   scale_min: ['>:1', '<:10'],
   * };
   *
   * api.layers.list({perPage: 10, search});
   */


  list(params = {}) {
    const resolver = this._buildResolver(params);

    return resolver.getPage(resolver.page);
  }
  /**
   * Get the resource lister
   *
   * @param {object|RequestParameters} parameters - parameters
   * @param {number} maxRows - Maximum amount of rows
   * @returns {ResourceLister} - Resource lister
   */


  lister(parameters = {}, maxRows = 50) {
    return new ResourceLister["default"](this.api, this.baseUrl, this.Target, parameters, maxRows, this.Target.resourceUrlKey);
  } // @todo disabled for now due to it promoting bad practices
  // /**
  //  * Get all the resources
  //  * Please note that you might hit the rate limiter if you use this method. Make sure to cache it's result.
  //  *
  //  * @param {object|RequestParameters} parameters - parameters
  //  * @returns {Promise<ResourceBase[]>} - All the resources
  //  * @throws {ApiError} - If the api returns errors
  //  */
  // async all(parameters = {}) {
  //   const page = await this.list(parameters);
  //   const promises = [];
  //
  //   for (let i = 2; i <= page.pageCount; i++) {
  //     promises.push(page.getPage(i));
  //   }
  //
  //   const results = await Promise.all(promises);
  //
  //   return results.reduce((a, v) => a.concat(v.data), [...page.data]);
  // }


  _buildResolver(params = {}) {
    const paramType = typeof params;
    const url = this.baseUrl;

    if (!['number', 'object'].includes(paramType)) {
      throw new TypeError(`Expected params to be of type number or object. Got "${paramType}"`);
    }

    if (paramType === 'number') {
      return this._buildResolver({
        page: params
      });
    }

    if (!(params instanceof RequestParameters["default"])) {
      params = new RequestParameters["default"](params);
    }

    return new PaginatedResourceListing(this._api, url, this.Target, params);
  }

}

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CrudSetBase)
/* harmony export */ });
/* harmony import */ var _errors_AbstractError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _CrudBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var case__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var case__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(case__WEBPACK_IMPORTED_MODULE_2__);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * Crud base for resource sets
 * @abstract
 */

class CrudSetBase extends _CrudBase__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * Get items associated with the set
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */
  get items() {
    const url = `${this.url}/items`;
    const data = {};
    data[this.constructor.foreignKeyName] = this.id;
    return this._proxyResourceList(this._Child, url, data);
  }
  /**
   * Child constructor
   * @returns {Class<ResourceBase>} - Child constructor
   * @abstract
   * @protected
   */


  get _Child() {
    throw new _errors_AbstractError__WEBPACK_IMPORTED_MODULE_0__.AbstractError();
  }
  /**
   * Get the foreign key name
   * @returns {string} - Foreign key name
   * @example
   * api.fontFamilies.select(1).constructor.foreignKeyName === 'fontFamilyId'
   */


  static get foreignKeyName() {
    if (!this._fk) {
      let key = this.name; // ex: FontFamily

      key = (0,case__WEBPACK_IMPORTED_MODULE_2__.camel)(key); // ex: fontFamily

      this._fk = `${key}Id`;
    }

    return this._fk;
  }

}

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Mapcreator)
});

// EXTERNAL MODULE: ./node_modules/ky-universal/browser.js + 1 modules
var browser = __webpack_require__(30);
// EXTERNAL MODULE: ./src/enums/index.js + 3 modules
var enums = __webpack_require__(7);
// EXTERNAL MODULE: ./src/oauth/DummyFlow.js
var DummyFlow = __webpack_require__(76);
// EXTERNAL MODULE: ./src/oauth/OAuth.js
var OAuth = __webpack_require__(18);
// EXTERNAL MODULE: ./src/oauth/OAuthToken.js
var OAuthToken = __webpack_require__(13);
// EXTERNAL MODULE: ./src/proxy/GeoResourceProxy.js
var GeoResourceProxy = __webpack_require__(43);
// EXTERNAL MODULE: ./src/proxy/ResourceProxy.js
var ResourceProxy = __webpack_require__(19);
// EXTERNAL MODULE: ./src/proxy/SimpleResourceProxy.js + 1 modules
var SimpleResourceProxy = __webpack_require__(14);
// EXTERNAL MODULE: ./src/resources/index.js + 10 modules
var resources = __webpack_require__(37);
// EXTERNAL MODULE: ./src/resources/base/ResourceBase.js
var ResourceBase = __webpack_require__(3);
// EXTERNAL MODULE: ./src/traits/Injectable.js
var Injectable = __webpack_require__(65);
// EXTERNAL MODULE: ./src/utils/hash.js
var hash = __webpack_require__(32);
;// CONCATENATED MODULE: ./src/utils/Logger.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Simple logger implementation
 */
class Logger {
  /**
   * Create a Logger instance
   * @param {string} [logLevel=warn] - Log level
   */
  constructor(logLevel = 'warn') {
    this.logLevel = logLevel;
  }
  /**
   * Get available log levels
   * @returns {Array<string>} - Log levels
   */


  getLogLevels() {
    return ['debug', 'info', 'warn', 'error', 'none'];
  }
  /**
   * Log a message
   * @param {string} message - Message to be logged
   * @param {string} level - Log level
   */


  log(message, level = 'info') {
    if (level === 'none') {
      return;
    }

    if (this._shouldLog(level)) {
      // eslint-disable-next-line no-console
      console[level](message);
    }
  }
  /**
   * Log a debug message
   * @param {string} message - Message to be logged
   */


  debug(message) {
    this.log(message, 'debug');
  }
  /**
   * Log an informative message
   * @param {string} message - Message to be logged
   */


  info(message) {
    this.log(message, 'info');
  }
  /**
   * Log a warning message
   * @param {string} message - Message to be logged
   */


  warn(message) {
    this.log(message, 'warn');
  }
  /**
   * Log an error message
   * @param {string} message - Message to be logged
   */


  error(message) {
    this.log(message, 'error');
  }
  /**
   * Get the current log level
   * @returns {string} - log level
   */


  get logLevel() {
    return this._logLevel;
  }
  /**
   * Set the current log level
   * @param {string} value - log level
   * @throws {Logger#getLogLevels}
   */


  set logLevel(value) {
    value = value.toLowerCase();

    if (!this.getLogLevels().includes(value)) {
      throw new TypeError(`Expected one of ${this.getLogLevels().join(', ')}. Got ${value}`);
    }

    this._logLevel = value;
  }

  _shouldLog(level) {
    const logLevels = this.getLogLevels();
    const targetLevel = logLevels.findIndex(x => x === level);
    const currentLevel = logLevels.findIndex(x => x === this.logLevel);
    return targetLevel >= currentLevel;
  }

}
// EXTERNAL MODULE: ./src/utils/reflection.js
var reflection = __webpack_require__(0);
// EXTERNAL MODULE: ./src/utils/helpers.js
var helpers = __webpack_require__(1);
// EXTERNAL MODULE: ./src/errors/ValidationError.js
var ValidationError = __webpack_require__(78);
// EXTERNAL MODULE: ./src/errors/ApiError.js
var ApiError = __webpack_require__(66);
// EXTERNAL MODULE: ./src/utils/requests.js
var requests = __webpack_require__(5);
// EXTERNAL MODULE: ./node_modules/events/events.js
var events = __webpack_require__(24);
var events_default = /*#__PURE__*/__webpack_require__.n(events);
;// CONCATENATED MODULE: ./src/Mapcreator.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



















/**
 * Base API class
 *
 * @mixes Injectable
 * @extends EventEmitter
 * @fires Mapcreator#error
 */

class Mapcreator extends (0,reflection.mix)((events_default()), Injectable["default"]) {
  /**
   * @param {OAuth|string} auth - Authentication flow
   * @param {string} host - Remote API host
   */
  constructor(auth = new DummyFlow["default"](), host = "https://api.mapcreator.io") {
    super();

    if (typeof auth === 'string') {
      const token = auth;
      auth = new DummyFlow["default"]();
      auth.token = new OAuthToken["default"](token, 'Bearer', new Date('2100-01-01T01:00:00'), ['*']);
    }

    this.auth = auth;
    this.host = host;
    this._logger = new Logger("warn");
    this.wrapKy(helpers.wrapKyCancelable);
    this.wrapKy(requests.wrapKyPrefixUrl, `${this.host}/${this.version}`);
  }
  /**
   * Get api version
   * @returns {string} - Api version
   * @constant
   */


  get version() {
    return 'v1';
  }
  /**
   * Get authentication provider instance
   * @returns {OAuth} - OAuth instance
   */


  get auth() {
    return this._auth;
  }
  /**
   * Get logger instance
   * @returns {Logger} - Logger instance
   */


  get logger() {
    return this._logger;
  }
  /**
   * Set authentication provider instance
   * @param {OAuth} value -- OAuth instance
   */


  set auth(value) {
    if (!(0,reflection.isParentOf)(OAuth["default"], value)) {
      throw new TypeError('auth must be an instance of OAuth');
    }

    this._auth = value;
  }
  /**
   * Test if the client is authenticated with the api and has a valid token
   * @returns {boolean} - If the client is authenticated with the api
   */


  get authenticated() {
    return this.auth.authenticated;
  }
  /**
   * The current host
   * @returns {string} - The current host
   */


  get host() {
    return this._host;
  }
  /**
   * The remote host
   * @param {string} value - A valid url
   */


  set host(value) {
    value = value.replace(/\/+$/, '');
    this._host = value;
    this.auth.host = value;
  }

  get url() {
    return `${this.host}/${this.version}`;
  }
  /**
   * Saves the session token so that it can be recovered at a later time. The wrapper can
   * find the token most of the time if the name parameter is left blank.
   * @param {string?} name - name of the token
   */


  saveToken(name) {
    this.auth.token.save(name);
  }
  /**
   * Authenticate with the api using the authentication method provided.
   * @returns {Promise<Mapcreator>} - Current instance
   * @throws {OAuthError}
   * @throws {ApiError} - If the api returns errors
   */


  async authenticate() {
    await this.auth.authenticate();
    return this;
  }
  /**
   * Mapcreator ky instance
   * This ky instance takes care of the API communication. It has the following responsibilities:
   *  - Send authenticated requests to the API
   *  - Transform errors returned from the API into ApiError and ValidationError if possible
   *  - Wait when the rate limiter responds with a 429 and retry later
   *  - Prefix urls with the api domain if needed
   * @returns {function}
   * @see {@link https://github.com/sindresorhus/ky}
   */


  get ky() {
    var _process$env$AXIOS_TI;

    if (this._ky) {
      return this._ky;
    }

    const hooks = {
      beforeRequest: [request => {
        if (this.authenticated) {
          request.headers.set('Authorization', this.auth.token.toString());
        }
      }],
      afterResponse: [// 429 response
      async (request, _options, response) => {
        if (response.status !== 429) {
          return response;
        }

        const resetDelay = response.headers.get('x-ratelimit-reset') * 1000 || 500;
        await (0,helpers.delay)(resetDelay);
        return this._ky(request);
      }, // transform errors
      async (request, options, response) => {
        if (response.status < 400 || response.status >= 600) {
          return response;
        }

        const data = await response.json();
        const params = {
          data,
          request,
          options,
          response
        };

        if (data.error['validation_errors']) {
          throw new ValidationError["default"](params);
        }

        const error = new ApiError["default"](params);

        if (error.type === 'AuthenticationException') {
          /**
           * Critical api errors (AuthenticationException)
           *
           * @event Mapcreator#error
           * @type {ApiError}
           */
          this.emit('error', error);
        }

        throw error;
      }]
    };
    this._ky = browser["default"].create({
      timeout: (_process$env$AXIOS_TI = "60000") !== null && _process$env$AXIOS_TI !== void 0 ? _process$env$AXIOS_TI : 60000,
      // 60 seconds
      // throwHttpErrors: false, // This is done through a custom hook
      // redirect: 'error',
      retry: 0,
      headers: {
        'Accept': 'application/json',
        'X-No-CDN-Redirect': 'true'
      },
      hooks
    });
    return this._ky;
  }

  wrapKy(wrapper, ...args) {
    this._ky = wrapper(this.ky, ...args);
    const requestMethods = ['get', 'post', 'put', 'patch', 'head', 'delete'];

    for (const method of requestMethods) {
      this._ky[method] = (input, options) => this._ky(input, { ...options,
        method
      });
    }
  }
  /**
   * Static proxy generation
   * @param {string|Class} Target - Constructor or url
   * @param {Class?} Constructor - Constructor for a resource that the results should be cast to
   * @returns {ResourceProxy} - A proxy for accessing the resource
   * @example
   * api.static('/custom/resource/path/{id}/').get(123);
   *
   * @example
   * class FooBar extends ResourceBase {
   *    static get resourceName() {
   *      return 'custom';
   *    }
   * }
   *
   * api.static(FooBar)
   *   .get(1)
   *   .then(console.log);
   *
   * api.static('/foo-bar-custom', FooBar).lister();
   */


  static(Target, Constructor = ResourceBase["default"]) {
    if (typeof Target === 'string') {
      const path = Target;
      const name = Constructor.name || 'AnonymousResource';
      Target = class AnonymousResource extends Constructor {
        static get resourceName() {
          return Object.getPrototypeOf(this).resourceName || 'anonymous';
        }

        static get resourcePath() {
          return path;
        }

      };
      Object.defineProperty(Target, 'name', {
        value: `${name}_${(0,hash.fnv32b)(path)}`
      });
    }

    if ((0,reflection.isParentOf)(ResourceBase["default"], Target)) {
      return new ResourceProxy["default"](this, Target);
    }

    throw new TypeError('Expected Target to be of type string and Constructor to be a ResourceBase constructor');
  }
  /**
   * Choropleth accessor
   * @see {@link Choropleth}
   * @returns {GeoResourceProxy<Choropleth>} - A proxy for accessing the resource
   */


  get choropleths() {
    return new GeoResourceProxy["default"](this, resources.Choropleth);
  }
  /**
   * VectorChoropleth accessor
   * @see {@link VectorChoropleth}
   * @returns {GeoResourceProxy<VectorChoropleth>} - A proxy for accessing the resource
   */


  get vectorChoropleths() {
    return new GeoResourceProxy["default"](this, resources.VectorChoropleth);
  }
  /**
   * Color accessor
   * @see {@link Color}
   * @returns {ResourceProxy<Color>} - A proxy for accessing the resource
   */


  get colors() {
    return this.static(resources.Color);
  }
  /**
   * Tag accessor
   * @see {@link Tag}
   * @returns {ResourceProxy<Tag>} - A proxy for accessing the resource
   */


  get tags() {
    return this.static(resources.Tag);
  }
  /**
   * Tag accessor
   * @see {@link TagType}
   * @returns {ResourceProxy<TagType>} - A proxy for accessing the resource
   */


  get tagTypes() {
    return this.static(resources.TagType);
  }
  /**
   * Contract accessor
   * @see {@link Contract}
   * @returns {ResourceProxy<Contract>} - A proxy for accessing the resource
   */


  get contracts() {
    return this.static(resources.Contract);
  }
  /**
   * Dimension accessor
   * @see {@link Dimension}
   * @returns {ResourceProxy<Dimension>} - A proxy for accessing the resource
   */


  get dimensions() {
    return this.static(resources.Dimension);
  }
  /**
   * Dimension set accessor
   * @see {@link DimensionSet}
   * @returns {ResourceProxy<DimensionSet>} - A proxy for accessing the resource
   */


  get dimensionSets() {
    return this.static(resources.DimensionSet);
  }
  /**
   * Faq accessor
   * @see {@link Faq}
   * @returns {ResourceProxy<Faq>} - A proxy for accessing the resource
   */


  get faqs() {
    return this.static(resources.Faq);
  }
  /**
   * Feature accessor
   * @see {@link Feature}
   * @returns {ResourceProxy<Feature>} - A proxy for accessing the resource
   */


  get features() {
    return this.static(resources.Feature);
  }
  /**
   * Featured jobs accessor
   * @see {@link Job}
   * @returns {SimpleResourceProxy<Job>} - A proxy for accessing the resource
   */


  get featuredMaps() {
    return new SimpleResourceProxy["default"](this, resources.Job, '/jobs/featured');
  }
  /**
   * Font accessor
   * @see {@link Font}
   * @returns {ResourceProxy<Font>} - A proxy for accessing the resource
   */


  get fonts() {
    return this.static(resources.Font);
  }
  /**
   * FontFamily accessor
   * @see {@link FontFamily}
   * @returns {ResourceProxy<FontFamily>} - A proxy for accessing the resource
   */


  get fontFamilies() {
    return this.static(resources.FontFamily);
  }
  /**
   * Highlight accessor
   * @see {@link Highlight}
   * @returns {GeoResourceProxy<Highlight>} - A proxy for accessing the resource
   */


  get highlights() {
    return new GeoResourceProxy["default"](this, resources.Highlight);
  }
  /**
   * VectorHighlight accessor
   * @see {@link VectorHighlight}
   * @returns {GeoResourceProxy<VectorHighlight>} - A proxy for accessing the resource
   */


  get vectorHighlights() {
    return new GeoResourceProxy["default"](this, resources.VectorHighlight);
  }
  /**
   * InsetMap accessor
   * @see {@link InsetMap}
   * @returns {GeoResourceProxy<InsetMap>} - A proxy for accessing the resource
   */


  get insetMaps() {
    return new GeoResourceProxy["default"](this, resources.InsetMap);
  }
  /**
   * Job accessor
   * @see {@link Job}
   * @returns {ResourceProxy<Job>} - A proxy for accessing the resource
   */


  get jobs() {
    return this.static(resources.Job);
  }
  /**
   * JobShare accessor
   * @see {@link JobShare}
   * @returns {ResourceProxy<JobShare>} - A proxy for accessing the resource
   */


  get jobShares() {
    return this.static(resources.JobShare);
  }
  /**
   * JobType accessor
   * @see {@link JobType}
   * @returns {ResourceProxy<JobType>} - A proxy for accessing the resource
   */


  get jobTypes() {
    return this.static(resources.JobType);
  }
  /**
   * Language accessor
   * @see {@link Language}
   * @returns {ResourceProxy<Language>} - A proxy for accessing the resource
   */


  get languages() {
    return this.static(resources.Language);
  }
  /**
   * Layer accessor
   * @see {@link Layer}
   * @returns {ResourceProxy<Layer>} - A proxy for accessing the resource
   */


  get layers() {
    return this.static(resources.Layer);
  }
  /**
   * LayerFaq accessor
   * @see {@link LayerFaq}
   * @returns {ResourceProxy<LayerFaq>} - A proxy for accessing the resource
   */


  get layerFaqs() {
    return this.static(resources.LayerFaq);
  }
  /**
   * Layer group accessor
   * @see {@link LayerGroup}
   * @returns {ResourceProxy<LayerGroup>} - A proxy for accessing the resource
   */


  get layerGroups() {
    return this.static(resources.LayerGroup);
  }
  /**
   * Mapstyle accessor
   * @see {@link Mapstyle}
   * @returns {ResourceProxy<Mapstyle>} - A proxy for accessing the resource
   */


  get mapstyles() {
    return this.static(resources.Mapstyle);
  }
  /**
   * MapstyleSet accessor
   * @see {@link MapstyleSet}
   * @returns {ResourceProxy<MapstyleSet>} - A proxy for accessing the resource
   */


  get mapstyleSets() {
    return this.static(resources.MapstyleSet);
  }
  /**
   * Notification accessor
   * @see {@link Notification}
   * @returns {ResourceProxy<Notification>} - A proxy for accessing the resource
   */


  get notifications() {
    return this.static(resources.Notification);
  }
  /**
   * Message accessor
   * @see {@link Message}
   * @returns {ResourceProxy<Message>} - A proxy for accessing the resource
   */


  get messages() {
    return this.static(resources.Message);
  }
  /**
   * Organisation accessor
   * @see {@link Organisation}
   * @returns {ResourceProxy<Organisation>} - A proxy for accessing the resource
   */


  get organisations() {
    return this.static(resources.Organisation);
  }
  /**
   * Permission accessor
   * @see {@link Permission}
   * @returns {ResourceProxy<Permission>} - A proxy for accessing the resource
   */


  get permissions() {
    return this.static(resources.Permission);
  }
  /**
   * Product tour accessor
   * @see {@link ProductTour}
   * @returns {ResourceProxy<ProductTour>} - A proxy for accessing the resource
   */


  get productTours() {
    return this.static(resources.ProductTour);
  }
  /**
   * Product tour step accessor
   * @see {@link ProductTourStep}
   * @returns {ResourceProxy<ProductTourStep>} - A proxy for accessing the resource
   */


  get productTourSteps() {
    return this.static(resources.ProductTourStep);
  }
  /**
   * Role accessor
   * @see {@link Role}
   * @returns {ResourceProxy<Role>} - A proxy for accessing the resource
   */


  get roles() {
    return this.static(resources.Role);
  }
  /**
   * Svg accessor
   * @see {@link Svg}
   * @returns {ResourceProxy<Svg>} - A proxy for accessing the resource
   */


  get svgs() {
    return this.static(resources.Svg);
  }
  /**
   * SvgSet accessor
   * @see {@link SvgSet}
   * @returns {ResourceProxy<SvgSet>} - A proxy for accessing the resource
   */


  get svgSets() {
    return this.static(resources.SvgSet);
  }
  /**
   * User accessor
   * @see {@link User}
   * @returns {ResourceProxy<User>} - A proxy for accessing the resource
   */


  get users() {
    return this.static(resources.User);
  }
  /**
   * Get SVG set types
   * @see {@link SvgSet}
   * @returns {CancelablePromise<Enum>} - Contains all the possible SVG set types
   * @throws {ApiError} - If the api returns errors
   */


  getSvgSetTypes() {
    return (0,helpers.makeCancelable)(async signal => {
      const {
        data
      } = await this.ky.get('svgs/sets/types', {
        signal
      }).json();
      return new enums.Enum(data, true);
    });
  }
  /**
   * Get font styles
   * @see {@link Font}
   * @returns {CancelablePromise<Enum>} - Contains all the possible font styles
   * @throws {ApiError} - If the api returns errors
   */


  getFontStyles() {
    return (0,helpers.makeCancelable)(async signal => {
      const {
        data
      } = await this.ky.get('fonts/styles', {
        signal
      }).json();
      return new enums.Enum(data, true);
    });
  }
  /**
   * Forget the current session
   * This will clean up any stored OAuth states stored using {@link StateContainer} and any OAuth tokens stored
   * @returns {CancelablePromise}
   * @throws {ApiError} - If the api returns errors
   */


  logout() {
    return this.auth.logout();
  }

}

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OAuthError)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);


/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * OAuth error
 */
class OAuthError extends Error {
  /**
   * OAuth error code
   * @type {String}
   */

  /**
   * OAuth error response
   * @param {String} error - OAuth error key
   * @param {String} message - OAuth error message
   */
  constructor(error, message = '') {
    super(message);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "error", void 0);

    this.error = String(error);
  }
  /**
   * Displayable error string
   * @returns {String} - error
   */


  toString() {
    let error = this.error;

    if (error.includes('_')) {
      error = error.replace('_', ' ').replace(/^./, x => x.toUpperCase());
    }

    if (this.message) {
      return `${error}: ${this.message}`;
    }

    return error;
  }

}

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OAuth)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ky_universal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);
/* harmony import */ var _errors_AbstractError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony import */ var _storage_StorageManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22);
/* harmony import */ var _OAuthToken__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _StateContainer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1);


/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */






/**
 * OAuth base class
 * @abstract
 */

class OAuth {
  /**
   * @param {String} clientId - OAuth client id
   * @param {Array<String>} scopes - A list of required scopes
   */
  constructor(clientId, scopes = ['*']) {
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "token", null);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "path", '/');

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "host", "https://api.mapcreator.io");

    if (this.constructor === OAuth) {
      throw new _errors_AbstractError__WEBPACK_IMPORTED_MODULE_2__.AbstractClassError();
    }

    this.clientId = String(clientId);
    this.scopes = scopes;

    if (this.clientId) {
      this.token = _OAuthToken__WEBPACK_IMPORTED_MODULE_4__["default"].recover();
    }
  }
  /**
   * If the current instance has a valid token
   * @returns {Boolean} - If a valid token is available
   */


  get authenticated() {
    return this.token !== null && !this.token.expired;
  }
  /**
   * Authenticate
   * @returns {Promise<OAuthToken>} - Authentication token
   * @throws {OAuthError}
   * @abstract
   */


  authenticate() {
    throw new _errors_AbstractError__WEBPACK_IMPORTED_MODULE_2__.AbstractMethodError();
  }
  /**
   * Forget the current session
   * Empty the session token store and forget the api token
   */


  forget() {
    _StateContainer__WEBPACK_IMPORTED_MODULE_5__["default"].clean();
    _storage_StorageManager__WEBPACK_IMPORTED_MODULE_3__["default"].secure.remove(_OAuthToken__WEBPACK_IMPORTED_MODULE_4__["default"].storageName);
    this.token = null;
  }
  /**
   * Invalidates the session token
   * @throws {OAuthError} - If de-authentication fails
   * @throws {ApiError} - If the api returns errors
   * @returns {CancelablePromise}
   */


  logout() {
    if (!this.token) {
      return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_6__.makeCancelable)(() => {});
    }

    const url = `${this.host}/oauth/logout`;
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_6__.makeCancelable)(async signal => {
      await ky_universal__WEBPACK_IMPORTED_MODULE_1__["default"].post(url, {
        headers: {
          Accept: 'application/json',
          Authorization: this.token.toString()
        },
        signal
      });
      this.forget();
    });
  }
  /**
   * Manually import OAuthToken, usefull for debugging
   * @param {String} token - OAuth token
   * @param {String} [type=Bearer] - token type
   * @param {Date|Number} [expires=5 days] - expire time in seconds or Date
   * @param {Array<string>} [scopes=[]] - Any scopes
   */


  importToken(token, type = 'Bearer', expires = 432000, scopes = []) {
    this.token = new _OAuthToken__WEBPACK_IMPORTED_MODULE_4__["default"](token, type, expires, scopes);
  }

}

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResourceProxy)
/* harmony export */ });
/* harmony import */ var _utils_requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _SimpleResourceProxy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * Proxy for accessing resource. This will make sure that they
 * are properly wrapped before the promise resolves.
 * @protected
 */

class ResourceProxy extends _SimpleResourceProxy__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * Parse selector
   * @param {Number|String|Object} [id=] - The resource id to be requested
   * @returns {Object} - Parsed selector
   * @private
   */
  _parseSelector(id) {
    if (id === '' || id === null) {
      return {};
    }

    switch (typeof id) {
      case 'number':
      case 'string':
        return {
          [this.Target.resourceUrlKey]: id
        };

      case 'object':
        return id;

      default:
        return {};
    }
  }
  /**
   * Get target resource
   * @param {Number|String|Object} [id=] - The resource id to be requested
   * @param {String} [deleted=null] - Determines if the resource should be shown if deleted, requires special resource permissions. Possible values: only, none, all
   * @returns {CancelablePromise<ResourceBase>} - Target resource
   * @throws {ApiError} - If the api returns errors
   */


  get(id, deleted = null) {
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.makeCancelable)(async signal => {
      const data = { ...this._seedData,
        ...this._parseSelector(id)
      };
      let url = this.new(data).url;

      if (typeof deleted === 'string') {
        const glue = url.includes('?') ? '&' : '?';
        url += glue + (0,_utils_requests__WEBPACK_IMPORTED_MODULE_0__.encodeQueryString)({
          deleted
        });
      }

      const {
        data: result
      } = await this.api.ky.get(url, {
        signal
      }).json();
      return this.new(result);
    });
  }
  /**
   * Select target resource without obtaining data
   * @param {Number|String} [id=] - Resource id
   * @returns {ResourceBase} - Empty target resource
   * @example
   * api.users.select('me').colors().then(doSomethingCool);
   */


  select(id) {
    const data = { ...this._seedData,
      ...this._parseSelector(id)
    };
    return this.new(data);
  }

}

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OwnedResourceProxy)
/* harmony export */ });
/* harmony import */ var _SimpleResourceProxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * Used for proxying resource => organisation
 */

class OwnedResourceProxy extends _SimpleResourceProxy__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * OwnedResourceProxy Constructor
   * @param {Mapcreator} api - Api instance
   * @param {ResourceBase} parent - Parent instance
   * @param {Class<ResourceBase>} Target - Target constructor
   */
  constructor(api, parent, Target) {
    const resource = Target.resourceName.replace(/s+$/, '');
    const url = `${parent.url}/${resource}s`;
    super(api, Target, url);
  }
  /**
   * Sync items to the organisation
   * @param {Array<ResourceBase>|Array<number>|ResourceBase|number} items - List of items to sync
   * @throws {TypeError}
   * @throws {ApiError} - If the api returns errors
   * @returns {CancelablePromise}
   */


  sync(items) {
    return this._modifyResourceLink(items, 'PATCH');
  }
  /**
   * Attach items to the organisation
   * @param {Array<ResourceBase>|Array<number>|ResourceBase|number} items - List of items to attach
   * @throws {TypeError}
   * @throws {ApiError} - If the api returns errors
   * @returns {CancelablePromise}
   */


  attach(items) {
    return this._modifyResourceLink(items, 'POST');
  }
  /**
   * Detach items from the organisation
   * @param {Array<ResourceBase>|Array<number>|ResourceBase|number} items - List of items to unlink
   * @throws {TypeError}
   * @throws {ApiError} - If the api returns errors
   * @returns {CancelablePromise}
   */


  detach(items) {
    return this._modifyResourceLink(items, 'DELETE');
  }
  /**
   * Attach parent resource to all organisations
   * @throws {ApiError} - If the api returns errors
   * @returns {CancelablePromise}
   */


  attachAll() {
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.makeCancelable)(async signal => {
      await this.api.ky.post(`${this.baseUrl}/all`, {
        signal
      });
    });
  }
  /**
   * Detach parent resource to all organisations
   * @throws {ApiError} - If the api returns errors
   * @returns {CancelablePromise}
   */


  detachAll() {
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.makeCancelable)(async signal => {
      await this.api.ky.delete(`${this.baseUrl}/all`, {
        signal
      });
    });
  }
  /**
   * @param {Array<ResourceBase>|Array<number>|ResourceBase|number} items - List of items to sync, attach or detach
   * @param {string} method - http method
   * @throws {ApiError} - If the api returns errors
   * @throws {TypeError}
   * @returns {CancelablePromise}
   * @private
   */


  _modifyResourceLink(items, method) {
    if (!Array.isArray(items)) {
      items = [items];
    }

    const keys = items.map(x => OwnedResourceProxy._getKeyValue(x)).map(Number).filter(x => !Number.isNaN(x));
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.makeCancelable)(async signal => {
      await this.api.ky(this.baseUrl, {
        method,
        signal,
        json: {
          keys
        }
      });
    });
  }

  static _getKeyValue(item) {
    if (['number', 'string'].includes(typeof item)) {
      return item;
    }

    const key = item.constructor.resourceUrlKey || 'id';

    if (typeof item[key] !== 'undefined') {
      return item[key];
    }

    throw new TypeError('Expected items to be of type Array<ResourceBase>, Array<number>, ResourceBase or number}');
  }

}

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractError": () => (/* binding */ AbstractError),
/* harmony export */   "AbstractClassError": () => (/* binding */ AbstractClassError),
/* harmony export */   "AbstractMethodError": () => (/* binding */ AbstractMethodError)
/* harmony export */ });
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Thrown by abstract methods and classes
 */
class AbstractError extends Error {
  /**
   * AbstractError constructor
   * @param {?String} message - Error message
   */
  constructor(message = 'Unimplemented') {
    super(message);
  }

}
/**
 * Thrown upon invocation of an abstract class
 * @example
 * class FooBar {
 *   constructor() {
 *     if (this.constructor === FooBar) {
 *       throw new AbstractClassError();
 *     }
 *   }
 * }
 */

class AbstractClassError extends AbstractError {
  constructor() {
    super('Can not make an instance of an abstract class');
  }

}
/**
 * Thrown upon invocation of an abstract method
 */

class AbstractMethodError extends AbstractError {
  constructor() {
    super('Can not call an abstract method');
  }

}

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ StorageManager)
});

// EXTERNAL MODULE: ./src/utils/StaticClass.js
var StaticClass = __webpack_require__(33);
// EXTERNAL MODULE: ./src/utils/node.js
var node = __webpack_require__(9);
// EXTERNAL MODULE: ./src/storage/DataStoreContract.js
var DataStoreContract = __webpack_require__(23);
;// CONCATENATED MODULE: ./src/storage/CookiesDriver.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @private
 * @todo fix
 */

class CookiesDriver extends DataStoreContract["default"] {
  constructor(prefix = '_m4n_') {
    super();
    this.__prefix = prefix;
  }
  /**
   * Cookie name prefix
   * @returns {String} - Prefix
   * @private
   */


  get _prefix() {
    return this.__prefix;
  }
  /**
   * @inheritDoc
   */


  static get secure() {
    return window.location.protocol === 'https:';
  }
  /**
   * @inheritDoc
   */


  static get available() {
    return !(0,node.isNode)();
  }
  /**
   * Store a value in the storage
   * @param {String} name - value name
   * @param {*} value - value
   * @param {Date|String} [expires=2050-01-01] - Expiration date
   */


  set(name, value, expires = new Date('2050-01-01')) {
    name = encodeURIComponent(this._prefix + name);
    value = encodeURIComponent(value);

    if (expires instanceof Date) {
      expires = expires.toUTCString();
    }

    let cookie = `${name}=${value}; expires=${expires}`;

    if (CookiesDriver.secure) {
      cookie += '; secure';
    }

    document.cookie = cookie;
  }
  /**
   * @inheritDoc
   */


  get(name) {
    name = this._prefix + name;
    return this._toObject()[name];
  }
  /**
   * @inheritDoc
   */


  remove(name) {
    this.set(name, '', new Date(1970));
  }
  /**
   * @inheritDoc
   */


  keys() {
    const regex = new RegExp(`^${this._prefix}`);
    return Object.keys(this._toObject()).map(x => x.replace(regex, ''));
  }
  /**
   * Extract cookies and turn them into a object
   * @returns {Object} - cookies
   * @private
   */


  _toObject() {
    const cookies = {};
    document.cookie.split(';').map(x => x.trim().split('=').map(decodeURIComponent)).filter(x => x[0].startsWith(this._prefix)).forEach(x => {
      cookies[x[0]] = x[1];
    });
    return cookies;
  }

}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(12);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);
;// CONCATENATED MODULE: ./src/storage/DummyDriver.js


/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * Used for storing data during tests
 * @private
 */

class DummyDriver extends DataStoreContract["default"] {
  /**
   * @inheritDoc
   */
  static get available() {
    return (0,node.isNode)() && "MISSING_ENV_VAR".NODE_ENV === 'test';
  }
  /**
   * If the storage is secure
   * @returns {boolean} - Secure storage
   */


  static get secure() {
    return true;
  }
  /**
   * Store a value in the storage
   * @param {String} name - value name
   * @param {*} value - value
   */


  set(name, value) {
    this.constructor._data[name] = value;
  }
  /**
   * Get a value from the store
   * @param {String} name - value name
   * @returns {*} - value
   */


  get(name) {
    return this.constructor._data[name];
  }
  /**
   * Remove a value from the store
   * @param {String} name - value name
   */


  remove(name) {
    delete this.constructor._data[name];
  }
  /**
   * Storage keys
   * @returns {Array<String>} - Stored keys
   */


  keys() {
    return Object.keys(this.constructor._data);
  }

}

defineProperty_default()(DummyDriver, "_data", {});
// EXTERNAL MODULE: ./src/storage/FileDriver.js
var FileDriver = __webpack_require__(63);
;// CONCATENATED MODULE: ./src/storage/LocalStorageDriver.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @private
 */

class LocalStorageDriver extends DataStoreContract["default"] {
  /**
   * LocalStorage name prefix
   * @returns {String} - Prefix
   * @private
   */
  static get _prefix() {
    return '_m4n_';
  }
  /**
   * @inheritDoc
   */


  static get available() {
    return !(0,node.isNode)();
  }
  /**
   * Store a value in the storage
   * @param {String} name - value name
   * @param {*} value - value
   */


  set(name, value) {
    name = LocalStorageDriver._prefix + name;
    window.localStorage.setItem(name, value);
  }
  /**
   * Get a value from the store
   * @param {String} name - value name
   */


  get(name) {
    name = LocalStorageDriver._prefix + name;
    return window.localStorage.getItem(name);
  }
  /**
   * Remove a value from the store
   * @param {String} name - value name
   */


  remove(name) {
    name = LocalStorageDriver._prefix + name;
    window.localStorage.removeItem(name);
  }
  /**
   * Storage keys
   * @returns {Array<String>} - Stored keys
   */


  keys() {
    const keys = [];
    const storage = window.localStorage;
    const prefix = LocalStorageDriver._prefix;

    for (let i = 0; i < storage.length; i++) {
      let key = storage.key(i);

      if (key.startsWith(prefix)) {
        key = key.replace(new RegExp(`^${prefix}`), '');
        keys.push(key);
      }
    }

    return keys;
  }

}
;// CONCATENATED MODULE: ./src/storage/StorageManager.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */





/**
 * @private
 */

class StorageManager extends StaticClass["default"] {
  /**
   * Available storage drivers
   * @returns {Array.<function>} - Available storage drivers
   */
  static get available() {
    return [DummyDriver, LocalStorageDriver, // CookiesDriver,
    FileDriver["default"]].filter(x => x.available);
  }
  /**
   * Get LocalStorageDriver instance
   * @returns {LocalStorageDriver} - Instance
   */


  static get localStorage() {
    return new LocalStorageDriver();
  }
  /**
   * Get CookiesDriver instance
   * @returns {CookiesDriver} - Instance
   */


  static get cookies() {
    return new CookiesDriver();
  }
  /**
   * Get FileDriver instance
   * @returns {FileDriver} - Instance
   */


  static get file() {
    return new FileDriver["default"]();
  }
  /**
   * Get DummyDriver instance
   * @returns {DummyDriver} - Instance
   */


  static get dummy() {
    return new DummyDriver();
  }
  /**
   * Returns the best available storage driver. For a secure driver use {@link StorageManager#secure}
   * @returns {DataStoreContract} - Best available storage driver
   */


  static get best() {
    return new this.available[0]();
  }
  /**
   * Returns the a secure storage driver
   * @returns {DataStoreContract} - Secure storage driver
   */


  static get secure() {
    const C = this.available.filter(x => x.secure)[0];

    if (typeof C === 'undefined') {
      return StorageManager.best;
    }

    return new C();
  }

}

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DataStoreContract)
/* harmony export */ });
/* harmony import */ var _errors_AbstractError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* eslint-disable no-unused-vars */

/**
 * @private
 */

class DataStoreContract {
  constructor() {
    if (this.constructor === DataStoreContract) {
      throw new _errors_AbstractError__WEBPACK_IMPORTED_MODULE_0__.AbstractClassError();
    }

    if (!this.constructor.available) {
      throw new Error(`${this.constructor.name} is unavailable`);
    }
  }
  /**
   * If the driver is currently available
   * @returns {boolean} - Driver availability
   */


  static get available() {
    return false;
  }
  /**
   * If the storage is secure
   * @returns {boolean} - Secure storage
   */


  static get secure() {
    return false;
  }
  /**
   * Store a value in the storage
   * @param {String} name - value name
   * @param {*} value - value
   * @abstract
   */


  set(name, value) {
    throw new _errors_AbstractError__WEBPACK_IMPORTED_MODULE_0__.AbstractMethodError();
  }
  /**
   * Get a value from the store
   * @param {String} name - value name
   * @returns {String} - value
   * @abstract
   */


  get(name) {
    throw new _errors_AbstractError__WEBPACK_IMPORTED_MODULE_0__.AbstractMethodError();
  }
  /**
   * Remove a value from the store
   * @param {String} name - value name
   * @abstract
   */


  remove(name) {
    throw new _errors_AbstractError__WEBPACK_IMPORTED_MODULE_0__.AbstractMethodError();
  }
  /**
   * Clear storage
   */


  clear() {
    this.keys().map(key => this.remove(key));
  }
  /**
   * Storage keys
   * @returns {Array<String>} - Stored keys
   * @abstract
   */


  keys() {
    throw new _errors_AbstractError__WEBPACK_IMPORTED_MODULE_0__.AbstractMethodError();
  }

}

/***/ }),
/* 24 */
/***/ ((module) => {

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



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ DownloadedResource)
});

;// CONCATENATED MODULE: ./src/utils/base64.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Base64 encode data
 *
 * @param {Buffer|ArrayBuffer} buffer - input buffer
 * @author Jon Leighton
 * @license MIT
 * @see https://gist.github.com/jonleighton/958841
 * @returns {string} - base 64 encoded data
 * @private
 */
function base64Encode(buffer) {
  let base64 = '';
  const encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const bytes = new Uint8Array(buffer);
  const byteLength = bytes.byteLength;
  const byteRemainder = byteLength % 3;
  const mainLength = byteLength - byteRemainder;
  let a, b, c, d;
  let chunk; // Main loop deals with bytes in chunks of 3

  for (let i = 0; i < mainLength; i += 3) {
    // Combine the three bytes into a single integer
    chunk = bytes[i] * 65536 | bytes[i + 1] * 256 | bytes[i + 2]; // Use bitmasks to extract 6-bit segments from the triplet

    a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18

    b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12

    c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6

    d = chunk & 63; // 63       = 2^6 - 1
    // Convert the raw binary segments to the appropriate ASCII encoding

    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
  } // Deal with the remaining bytes and padding


  if (byteRemainder === 1) {
    chunk = bytes[mainLength];
    a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2
    // Set the 4 least significant bits to zero

    b = (chunk & 3) << 4; // 3   = 2^2 - 1

    base64 += `${encodings[a] + encodings[b]}==`;
  } else if (byteRemainder === 2) {
    chunk = bytes[mainLength] * 256 | bytes[mainLength + 1];
    a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10

    b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4
    // Set the 2 least significant bits to zero

    c = (chunk & 15) << 2; // 15    = 2^4 - 1

    base64 += `${encodings[a] + encodings[b] + encodings[c]}=`;
  }

  return base64;
}
// EXTERNAL MODULE: ./src/utils/node.js
var node = __webpack_require__(9);
;// CONCATENATED MODULE: ./src/resources/base/DownloadedResource.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * Downloaded resource from the api
 */

class DownloadedResource {
  /**
   *
   * @param {ArrayBuffer|Buffer} data - Data
   * @param {string} [type=application/octet-stream] - Mime-type
   * @param {string} [fileName=Untitled] - File name
   */
  constructor(data, type = 'application/octet-stream', fileName = 'Untitled') {
    this._data = data;
    this._type = type;
    this._fileName = fileName;
  }
  /**
   * Build instance from response
   * @param {Response} response - Response
   * @returns {DownloadedResource} - Instance
   */


  static async fromResponse(response) {
    // Get data
    const data = await response.arrayBuffer(); // Find mimeType

    let mimeType;
    const contentType = response.headers.get('content-type');

    if (contentType) {
      mimeType = contentType.split(';')[0].trim();
    } // Extract file name


    let fileName;
    const contentDisposition = response.headers.get('content-disposition');

    if (contentDisposition) {
      const regex = /filename[^;=\n]*=((['"])(.*?)\2|([^;\s]*))/i;
      const matches = regex.exec(contentDisposition);

      if (matches) {
        fileName = matches[3] || matches[4];
      }
    }

    return new DownloadedResource(data, mimeType, fileName);
  }
  /**
   * In Nodejs it will return a {@link Buffer} and in the browser it will respond with a {@link ArrayBuffer}
   * @returns {ArrayBuffer|Buffer} - Resource data
   */


  get data() {
    return this._data;
  }
  /**
   * Resource mime-type
   * @return {string} - Mime-type
   */


  get type() {
    return this._type;
  }
  /**
   * Resource file name, if available
   * @return {string} - File name
   */


  get fileName() {
    return this._fileName;
  }
  /**
   * Get the size of the data
   * @return {Number} - Size in bytes
   */


  get size() {
    return this.data.length;
  }
  /**
   * Create a object url
   * The URL lifetime is tied to the document in the window on which it
   * was created. The new object URL represents the resource.
   * *Do not forget* to release the object urls once used.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
   * @see https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL#Memory_management
   * @return {string} - Object url
   */


  createObjectUrl() {
    if ((0,node.isNode)()) {
      throw new Error('Object urls are not supported by Node');
    }

    return URL.createObjectURL(this.createBlob());
  }
  /**
   * Create a blob from the resource
   * @returns {Blob}
   */


  createBlob() {
    return new Blob([this.data], {
      type: this.type
    });
  }
  /**
   * Get base64-encoded data uri
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
   * @returns {string} - Data uri
   */


  toDataUri() {
    return `data:${this.type};base64,${this.toBase64()}`;
  }
  /**
   * Base64 encode data
   * @returns {string} - Base64 encoded data
   */


  toBase64() {
    return base64Encode(this.data);
  }
  /**
   * @inheritDoc
   */


  toString() {
    return this.data.toString();
  }

}

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JobShare)
/* harmony export */ });
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _base_CrudBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


class JobShare extends _base_CrudBase__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * Unsupported method implemented due to CrudBase abstraction
   * @throws {Error}
   * @private
   */
  save() {
    throw new Error('Unsupported method JobShare::save');
  }
  /**
   * Accessor for {@link JobShareVisibility} enum
   * @returns {Enum<JobShareVisibility>} - Accessor for enum
   */


  static get visibility() {
    return _enums__WEBPACK_IMPORTED_MODULE_0__.JobShareVisibility;
  }

  static get resourcePath() {
    return '/jobs/shares/{id}';
  }

  static get resourceName() {
    return 'shares';
  }

}

/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Layer)
/* harmony export */ });
/* harmony import */ var _traits_HandlesImages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(54);
/* harmony import */ var _traits_OwnableResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _utils_reflection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var _base_CrudBase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */




/**
 * Layer
 * @extends CrudBase
 * @mixes OwnableResource
 * @mixes HandlesImages
 */

class Layer extends (0,_utils_reflection__WEBPACK_IMPORTED_MODULE_2__.mix)(_base_CrudBase__WEBPACK_IMPORTED_MODULE_3__["default"], _traits_OwnableResource__WEBPACK_IMPORTED_MODULE_1__["default"], _traits_HandlesImages__WEBPACK_IMPORTED_MODULE_0__["default"]) {
  static get resourceName() {
    return 'layers';
  }

}

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ MapstyleSet)
});

// EXTERNAL MODULE: ./src/traits/OwnableResource.js
var OwnableResource = __webpack_require__(6);
// EXTERNAL MODULE: ./src/utils/reflection.js
var reflection = __webpack_require__(0);
// EXTERNAL MODULE: ./src/resources/base/CrudSetBase.js
var CrudSetBase = __webpack_require__(15);
// EXTERNAL MODULE: ./src/resources/Mapstyle.js
var Mapstyle = __webpack_require__(70);
// EXTERNAL MODULE: ./src/proxy/ResourceProxy.js
var ResourceProxy = __webpack_require__(19);
// EXTERNAL MODULE: ./src/resources/base/CrudSetItemBase.js
var CrudSetItemBase = __webpack_require__(10);
;// CONCATENATED MODULE: ./src/resources/MapstyleSetColor.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Mapstyle set color
 * @extends CrudSetItemBase
 */

class MapstyleSetColor extends CrudSetItemBase["default"] {
  static get resourcePath() {
    return '/mapstyles/sets/{mapstyle_set_id}/colors/{id}';
  }

  static get resourceName() {
    return 'mapstyle-set-colors';
  }

  get baseUrl() {
    return `${this._api.url}/mapstyles/sets/${this.mapstyleSetId}/colors`;
  }

}
;// CONCATENATED MODULE: ./src/resources/MapstyleSet.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */






/**
 * Mapstyle set
 * @extends CrudSetBase
 * @mixes OwnableResource
 */

class MapstyleSet extends (0,reflection.mix)(CrudSetBase["default"], OwnableResource["default"]) {
  static get resourcePath() {
    return '/mapstyles/sets/{id}';
  }

  static get resourceName() {
    return 'mapstyle-sets';
  }

  get _Child() {
    return Mapstyle["default"];
  }

  get colors() {
    const data = {
      mapstyleSetId: this.id
    };
    return new ResourceProxy["default"](this.api, MapstyleSetColor, null, data);
  }

}

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Tag)
/* harmony export */ });
/* harmony import */ var _traits_OwnableResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _utils_reflection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _base_CrudSetItemBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * Tag resource
 * @extends CrudSetItemBase
 * @mixes OwnableResource
 */

class Tag extends (0,_utils_reflection__WEBPACK_IMPORTED_MODULE_1__.mix)(_base_CrudSetItemBase__WEBPACK_IMPORTED_MODULE_2__["default"], _traits_OwnableResource__WEBPACK_IMPORTED_MODULE_0__["default"]) {
  static get resourceName() {
    return 'tags';
  }

  static get parentKey() {
    return 'tag_type_id';
  }

}

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* reexport */ ky)
});

;// CONCATENATED MODULE: ./node_modules/ky/index.js
/*! MIT License © Sindre Sorhus */

const globals = {};

const getGlobal = property => {
	/* istanbul ignore next */
	if (typeof self !== 'undefined' && self && property in self) {
		return self;
	}

	/* istanbul ignore next */
	if (typeof window !== 'undefined' && window && property in window) {
		return window;
	}

	if (typeof global !== 'undefined' && global && property in global) {
		return global;
	}

	/* istanbul ignore next */
	if (typeof globalThis !== 'undefined' && globalThis) {
		return globalThis;
	}
};

const globalProperties = [
	'Headers',
	'Request',
	'Response',
	'ReadableStream',
	'fetch',
	'AbortController',
	'FormData'
];

for (const property of globalProperties) {
	Object.defineProperty(globals, property, {
		get() {
			const globalObject = getGlobal(property);
			const value = globalObject && globalObject[property];
			return typeof value === 'function' ? value.bind(globalObject) : value;
		}
	});
}

const isObject = value => value !== null && typeof value === 'object';
const supportsAbortController = typeof globals.AbortController === 'function';
const supportsStreams = typeof globals.ReadableStream === 'function';
const supportsFormData = typeof globals.FormData === 'function';

const mergeHeaders = (source1, source2) => {
	const result = new globals.Headers(source1);
	const isHeadersInstance = source2 instanceof globals.Headers;
	const source = new globals.Headers(source2);

	for (const [key, value] of source) {
		if ((isHeadersInstance && value === 'undefined') || value === undefined) {
			result.delete(key);
		} else {
			result.set(key, value);
		}
	}

	return result;
};

const deepMerge = (...sources) => {
	let returnValue = {};
	let headers = {};

	for (const source of sources) {
		if (Array.isArray(source)) {
			if (!(Array.isArray(returnValue))) {
				returnValue = [];
			}

			returnValue = [...returnValue, ...source];
		} else if (isObject(source)) {
			for (let [key, value] of Object.entries(source)) {
				if (isObject(value) && Reflect.has(returnValue, key)) {
					value = deepMerge(returnValue[key], value);
				}

				returnValue = {...returnValue, [key]: value};
			}

			if (isObject(source.headers)) {
				headers = mergeHeaders(headers, source.headers);
			}
		}

		returnValue.headers = headers;
	}

	return returnValue;
};

const requestMethods = [
	'get',
	'post',
	'put',
	'patch',
	'head',
	'delete'
];

const responseTypes = {
	json: 'application/json',
	text: 'text/*',
	formData: 'multipart/form-data',
	arrayBuffer: '*/*',
	blob: '*/*'
};

const retryMethods = [
	'get',
	'put',
	'head',
	'delete',
	'options',
	'trace'
];

const retryStatusCodes = [
	408,
	413,
	429,
	500,
	502,
	503,
	504
];

const retryAfterStatusCodes = [
	413,
	429,
	503
];

const stop = Symbol('stop');

class HTTPError extends Error {
	constructor(response) {
		// Set the message to the status text, such as Unauthorized,
		// with some fallbacks. This message should never be undefined.
		super(
			response.statusText ||
			String(
				(response.status === 0 || response.status) ?
					response.status : 'Unknown response error'
			)
		);
		this.name = 'HTTPError';
		this.response = response;
	}
}

class TimeoutError extends Error {
	constructor(request) {
		super('Request timed out');
		this.name = 'TimeoutError';
		this.request = request;
	}
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// `Promise.race()` workaround (#91)
const timeout = (request, ms, abortController) =>
	new Promise((resolve, reject) => {
		const timeoutID = setTimeout(() => {
			if (abortController) {
				abortController.abort();
			}

			reject(new TimeoutError(request));
		}, ms);

		/* eslint-disable promise/prefer-await-to-then */
		globals.fetch(request)
			.then(resolve)
			.catch(reject)
			.then(() => {
				clearTimeout(timeoutID);
			});
		/* eslint-enable promise/prefer-await-to-then */
	});

const normalizeRequestMethod = input => requestMethods.includes(input) ? input.toUpperCase() : input;

const defaultRetryOptions = {
	limit: 2,
	methods: retryMethods,
	statusCodes: retryStatusCodes,
	afterStatusCodes: retryAfterStatusCodes
};

const normalizeRetryOptions = (retry = {}) => {
	if (typeof retry === 'number') {
		return {
			...defaultRetryOptions,
			limit: retry
		};
	}

	if (retry.methods && !Array.isArray(retry.methods)) {
		throw new Error('retry.methods must be an array');
	}

	if (retry.statusCodes && !Array.isArray(retry.statusCodes)) {
		throw new Error('retry.statusCodes must be an array');
	}

	return {
		...defaultRetryOptions,
		...retry,
		afterStatusCodes: retryAfterStatusCodes
	};
};

// The maximum value of a 32bit int (see issue #117)
const maxSafeTimeout = 2147483647;

class Ky {
	constructor(input, options = {}) {
		this._retryCount = 0;
		this._input = input;
		this._options = {
			// TODO: credentials can be removed when the spec change is implemented in all browsers. Context: https://www.chromestatus.com/feature/4539473312350208
			credentials: this._input.credentials || 'same-origin',
			...options,
			headers: mergeHeaders(this._input.headers, options.headers),
			hooks: deepMerge({
				beforeRequest: [],
				beforeRetry: [],
				afterResponse: []
			}, options.hooks),
			method: normalizeRequestMethod(options.method || this._input.method),
			prefixUrl: String(options.prefixUrl || ''),
			retry: normalizeRetryOptions(options.retry),
			throwHttpErrors: options.throwHttpErrors !== false,
			timeout: typeof options.timeout === 'undefined' ? 10000 : options.timeout
		};

		if (typeof this._input !== 'string' && !(this._input instanceof URL || this._input instanceof globals.Request)) {
			throw new TypeError('`input` must be a string, URL, or Request');
		}

		if (this._options.prefixUrl && typeof this._input === 'string') {
			if (this._input.startsWith('/')) {
				throw new Error('`input` must not begin with a slash when using `prefixUrl`');
			}

			if (!this._options.prefixUrl.endsWith('/')) {
				this._options.prefixUrl += '/';
			}

			this._input = this._options.prefixUrl + this._input;
		}

		if (supportsAbortController) {
			this.abortController = new globals.AbortController();
			if (this._options.signal) {
				this._options.signal.addEventListener('abort', () => {
					this.abortController.abort();
				});
			}

			this._options.signal = this.abortController.signal;
		}

		this.request = new globals.Request(this._input, this._options);

		if (this._options.searchParams) {
			const url = new URL(this.request.url);
			url.search = new URLSearchParams(this._options.searchParams);

			// To provide correct form boundary, Content-Type header should be deleted each time when new Request instantiated from another one
			if (((supportsFormData && this._options.body instanceof globals.FormData) || this._options.body instanceof URLSearchParams) && !(this._options.headers && this._options.headers['content-type'])) {
				this.request.headers.delete('content-type');
			}

			this.request = new globals.Request(new globals.Request(url, this.request), this._options);
		}

		if (this._options.json !== undefined) {
			this._options.body = JSON.stringify(this._options.json);
			this.request.headers.set('content-type', 'application/json');
			this.request = new globals.Request(this.request, {body: this._options.body});
		}

		const fn = async () => {
			if (this._options.timeout > maxSafeTimeout) {
				throw new RangeError(`The \`timeout\` option cannot be greater than ${maxSafeTimeout}`);
			}

			await delay(1);
			let response = await this._fetch();

			for (const hook of this._options.hooks.afterResponse) {
				// eslint-disable-next-line no-await-in-loop
				const modifiedResponse = await hook(
					this.request,
					this._options,
					response.clone()
				);

				if (modifiedResponse instanceof globals.Response) {
					response = modifiedResponse;
				}
			}

			if (!response.ok && this._options.throwHttpErrors) {
				throw new HTTPError(response);
			}

			// If `onDownloadProgress` is passed, it uses the stream API internally
			/* istanbul ignore next */
			if (this._options.onDownloadProgress) {
				if (typeof this._options.onDownloadProgress !== 'function') {
					throw new TypeError('The `onDownloadProgress` option must be a function');
				}

				if (!supportsStreams) {
					throw new Error('Streams are not supported in your environment. `ReadableStream` is missing.');
				}

				return this._stream(response.clone(), this._options.onDownloadProgress);
			}

			return response;
		};

		const isRetriableMethod = this._options.retry.methods.includes(this.request.method.toLowerCase());
		const result = isRetriableMethod ? this._retry(fn) : fn();

		for (const [type, mimeType] of Object.entries(responseTypes)) {
			result[type] = async () => {
				this.request.headers.set('accept', this.request.headers.get('accept') || mimeType);
				const response = (await result).clone();
				return (type === 'json' && response.status === 204) ? '' : response[type]();
			};
		}

		return result;
	}

	_calculateRetryDelay(error) {
		this._retryCount++;

		if (this._retryCount < this._options.retry.limit && !(error instanceof TimeoutError)) {
			if (error instanceof HTTPError) {
				if (!this._options.retry.statusCodes.includes(error.response.status)) {
					return 0;
				}

				const retryAfter = error.response.headers.get('Retry-After');
				if (retryAfter && this._options.retry.afterStatusCodes.includes(error.response.status)) {
					let after = Number(retryAfter);
					if (Number.isNaN(after)) {
						after = Date.parse(retryAfter) - Date.now();
					} else {
						after *= 1000;
					}

					if (typeof this._options.retry.maxRetryAfter !== 'undefined' && after > this._options.retry.maxRetryAfter) {
						return 0;
					}

					return after;
				}

				if (error.response.status === 413) {
					return 0;
				}
			}

			const BACKOFF_FACTOR = 0.3;
			return BACKOFF_FACTOR * (2 ** (this._retryCount - 1)) * 1000;
		}

		return 0;
	}

	async _retry(fn) {
		try {
			return await fn();
		} catch (error) {
			const ms = Math.min(this._calculateRetryDelay(error), maxSafeTimeout);
			if (ms !== 0 && this._retryCount > 0) {
				await delay(ms);

				for (const hook of this._options.hooks.beforeRetry) {
					// eslint-disable-next-line no-await-in-loop
					const hookResult = await hook({
						request: this.request,
						options: this._options,
						error,
						response: error.response.clone(),
						retryCount: this._retryCount
					});

					// If `stop` is returned from the hook, the retry process is stopped
					if (hookResult === stop) {
						return;
					}
				}

				return this._retry(fn);
			}

			if (this._options.throwHttpErrors) {
				throw error;
			}
		}
	}

	async _fetch() {
		for (const hook of this._options.hooks.beforeRequest) {
			// eslint-disable-next-line no-await-in-loop
			const result = await hook(this.request, this._options);

			if (result instanceof Request) {
				this.request = result;
				break;
			}

			if (result instanceof Response) {
				return result;
			}
		}

		if (this._options.timeout === false) {
			return globals.fetch(this.request.clone());
		}

		return timeout(this.request.clone(), this._options.timeout, this.abortController);
	}

	/* istanbul ignore next */
	_stream(response, onDownloadProgress) {
		const totalBytes = Number(response.headers.get('content-length')) || 0;
		let transferredBytes = 0;

		return new globals.Response(
			new globals.ReadableStream({
				start(controller) {
					const reader = response.body.getReader();

					if (onDownloadProgress) {
						onDownloadProgress({percent: 0, transferredBytes: 0, totalBytes}, new Uint8Array());
					}

					async function read() {
						const {done, value} = await reader.read();
						if (done) {
							controller.close();
							return;
						}

						if (onDownloadProgress) {
							transferredBytes += value.byteLength;
							const percent = totalBytes === 0 ? 0 : transferredBytes / totalBytes;
							onDownloadProgress({percent, transferredBytes, totalBytes}, value);
						}

						controller.enqueue(value);
						read();
					}

					read();
				}
			})
		);
	}
}

const validateAndMerge = (...sources) => {
	for (const source of sources) {
		if ((!isObject(source) || Array.isArray(source)) && typeof source !== 'undefined') {
			throw new TypeError('The `options` argument must be an object');
		}
	}

	return deepMerge({}, ...sources);
};

const createInstance = defaults => {
	const ky = (input, options) => new Ky(input, validateAndMerge(defaults, options));

	for (const method of requestMethods) {
		ky[method] = (input, options) => new Ky(input, validateAndMerge(defaults, options, {method}));
	}

	ky.HTTPError = HTTPError;
	ky.TimeoutError = TimeoutError;
	ky.create = newDefaults => createInstance(validateAndMerge(newDefaults));
	ky.extend = newDefaults => createInstance(validateAndMerge(defaults, newDefaults));
	ky.stop = stop;

	return ky;
};

/* harmony default export */ const ky = (createInstance());

;// CONCATENATED MODULE: ./node_modules/ky-universal/browser.js



/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Trait)
/* harmony export */ });
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Trait interface
 * @interface
 * @mixin
 */
class Trait {
  /**
   * Optional initialization method
   */
  initializer() {}

}

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fnv32b": () => (/* binding */ fnv32b),
/* harmony export */   "hashObject": () => (/* binding */ hashObject)
/* harmony export */ });
/* harmony import */ var json_stable_stringify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38);
/* harmony import */ var json_stable_stringify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(json_stable_stringify__WEBPACK_IMPORTED_MODULE_0__);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const FNV1_32A_INIT = 0x811c9dc5;
/**
 * Fast hash function for non-cryptographic use
 * @param {string} str - Input to be hashed
 * @returns {string} - String representation of the hash
 * @private
 */

function fnv32b(str) {
  let hash = str.split('').map(x => x.charCodeAt(0)).reduce((sum, val) => {
    sum ^= val;
    return sum + (sum << 1) + (sum << 4) + (sum << 7) + (sum << 8) + (sum << 24);
  }, FNV1_32A_INIT); // Avalanche

  hash ^= hash << 3;
  hash += hash >> 5;
  hash ^= hash << 4;
  hash += hash >> 17;
  hash ^= hash << 25;
  hash += hash >> 6;
  return `0000000${(hash >>> 0).toString(16)}`.substr(-8);
}
/**
 * Fast object hashing for non-cryptographic use
 * @param {object} data - input data
 * @returns {string} - String reprisentation of the hash
 * @private
 */

function hashObject(data) {
  return fnv32b(json_stable_stringify__WEBPACK_IMPORTED_MODULE_0___default()(data));
}

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StaticClass)
/* harmony export */ });
/* harmony import */ var _errors_StaticClassError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(62);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Disables the constructor and throws a {@link StaticClassError} when an instance is created.
 * @protected
 */

class StaticClass {
  constructor() {
    throw new _errors_StaticClassError__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

}

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrganisationProxy)
/* harmony export */ });
/* harmony import */ var _utils_reflection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _SimpleResourceProxy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



class OrganisationProxy extends _SimpleResourceProxy__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * @param {Mapcreator} api - Instance of the api
   * @param {ResourceBase} parent - Parent instance
   */
  constructor(api, parent) {
    // Fixes dependency issue
    const Organisation = (__webpack_require__(45)["default"]);

    super(api, Organisation, `${parent.url}/organisations`, {});
    this._parent = parent;
  }
  /**
   * Returns parent instance
   * @returns {ResourceBase} - Parent instance
   */


  get parent() {
    return this._parent;
  }
  /**
   * Sync organisations to the parent resource
   * The organisations attached to the target resource will be replaced with the organisations provided in the request.
   * @param {Array<Organisation|number>} organisations - List of items to sync
   * @throws {ApiError} - If the api returns errors
   * @returns {CancelablePromise}
   */


  sync(organisations) {
    return this._modifyLink(organisations, 'PATCH', this.Target);
  }
  /**
   * Attach organisations to the parent resource
   * The provided organisations will be attached to the resource if they're not already attached
   * @param {Array<Organisation|number>} organisations - List of items to attach
   * @throws {ApiError} - If the api returns errors
   * @returns {CancelablePromise}
   */


  attach(organisations) {
    return this._modifyLink(organisations, 'POST', this.Target);
  }
  /**
   * Detach organisations from the parent resource
   * The provided organisations will be detached from the resource
   * @param {Array<Organisation|number>} organisations - List of items to detach
   * @throws {ApiError} - If the api returns errors
   * @returns {CancelablePromise}
   */


  detach(organisations) {
    return this._modifyLink(organisations, 'DELETE', this.Target);
  }
  /**
   * Attach all organisations to the parent resource
   * @throws {ApiError} - If the api returns errors
   * @returns {CancelablePromise}
   */


  attachAll() {
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.makeCancelable)(async signal => {
      await this.api.ky.post(`${this.baseUrl}/all`, {
        signal
      });
    });
  }
  /**
   * Detach all organisations from the parent resource
   * @throws {ApiError} - If the api returns errors
   * @returns {CancelablePromise}
   */


  detachAll() {
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.makeCancelable)(async signal => {
      await this.api.ky.delete(`${this.baseUrl}/all`, {
        signal
      });
    });
  }
  /**
   * Sync, attach or unlink resources
   * @param {Array<Organisation|Number>|Organisation|Number} items - List of items to sync or attach
   * @param {String} method - Http method to use
   * @param {Class<ResourceBase>} Type - Resource type
   * @param {?String} path - Optional appended resource path, will guess if null
   * @throws {ApiError} - If the api returns errors
   * @protected
   * @returns {CancelablePromise}
   */


  _modifyLink(items, method, Type, path = null) {
    if (!Array.isArray(items)) {
      items = [items];
    }

    if (!path) {
      const resource = Type.resourceName.replace(/s+$/, '');
      path = `${resource}s`;
    }

    const keys = items.map(x => typeof x === 'number' ? x : x.id).map(Number);

    const filter = x => !(0,_utils_reflection__WEBPACK_IMPORTED_MODULE_0__.isParentOf)(Type, x) && !Number.isFinite(x);

    const isValid = keys.filter(filter).length === 0;

    if (!isValid) {
      throw new TypeError(`Array must contain either Numbers (resource id) or "${Type.name}".`);
    }

    const url = `${this.parent.url}/${path}`;
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.makeCancelable)(async signal => {
      await this.api.ky(url, {
        method,
        signal,
        json: {
          keys
        }
      });
    });
  }

}

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "AbstractClassError": () => (/* reexport */ AbstractError.AbstractClassError),
  "AbstractError": () => (/* reexport */ AbstractError.AbstractError),
  "AbstractMethodError": () => (/* reexport */ AbstractError.AbstractMethodError),
  "ApiError": () => (/* reexport */ ApiError["default"]),
  "GeoError": () => (/* reexport */ GeoError["default"]),
  "NodeError": () => (/* reexport */ NodeError),
  "OAuthError": () => (/* reexport */ OAuthError["default"]),
  "StaticClassError": () => (/* reexport */ StaticClassError["default"]),
  "ValidationError": () => (/* reexport */ ValidationError["default"])
});

// EXTERNAL MODULE: ./src/errors/AbstractError.js
var AbstractError = __webpack_require__(21);
// EXTERNAL MODULE: ./src/errors/ApiError.js
var ApiError = __webpack_require__(66);
// EXTERNAL MODULE: ./src/errors/ValidationError.js
var ValidationError = __webpack_require__(78);
;// CONCATENATED MODULE: ./src/errors/NodeError.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Invoked upon nodejs specific errors
 */
class NodeError extends Error {}
// EXTERNAL MODULE: ./src/errors/OAuthError.js
var OAuthError = __webpack_require__(17);
// EXTERNAL MODULE: ./src/errors/StaticClassError.js
var StaticClassError = __webpack_require__(62);
// EXTERNAL MODULE: ./src/errors/GeoError.js
var GeoError = __webpack_require__(44);
;// CONCATENATED MODULE: ./src/errors/index.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */








/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Message)
});

// EXTERNAL MODULE: ./src/resources/base/CrudBase.js
var CrudBase = __webpack_require__(2);
// EXTERNAL MODULE: ./src/resources/base/ResourceBase.js
var ResourceBase = __webpack_require__(3);
;// CONCATENATED MODULE: ./src/resources/MessageVariant.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class MessageVariant extends ResourceBase["default"] {}
// EXTERNAL MODULE: ./src/utils/helpers.js
var helpers = __webpack_require__(1);
// EXTERNAL MODULE: ./node_modules/case/dist/Case.js
var Case = __webpack_require__(4);
;// CONCATENATED MODULE: ./src/resources/Message.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */




class Message extends CrudBase["default"] {
  static get resourceName() {
    return 'messages';
  }

  toObject(camelCaseKeys = false) {
    const superObject = super.toObject(camelCaseKeys);
    superObject.variants = superObject.variants.map(variant => {
      if (variant instanceof MessageVariant) {
        return variant.toObject(camelCaseKeys);
      }

      const caseFn = camelCaseKeys ? Case.camel : Case.snake;
      const res = {};
      const fields = Object.keys(variant);

      for (const field of fields) {
        res[caseFn(field)] = variant[field];
      }

      return res;
    });
    return superObject;
  }

  _guessType(name, value) {
    if (name === 'variants') {
      return Array.from(value).map(data => new MessageVariant(this.api, data));
    }

    return super._guessType(name, value);
  }

  _buildCreateData() {
    return this.toObject();
  }

  _update() {
    return (0,helpers.makeCancelable)(async signal => {
      const json = this.toObject();
      await this.api.ky.patch(this.url, {
        json,
        signal
      }); // Reset changes

      Object.assign(this._baseProperties, this._properties);
      this._properties = {};

      if ('updated_at' in this._baseProperties) {
        this._baseProperties['updated_at'] = new Date();
      }

      return this;
    });
  }

}

/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Choropleth": () => (/* reexport */ Choropleth),
  "Color": () => (/* reexport */ Color["default"]),
  "Contract": () => (/* reexport */ Contract["default"]),
  "Dimension": () => (/* reexport */ Dimension["default"]),
  "DimensionSet": () => (/* reexport */ DimensionSet["default"]),
  "Domain": () => (/* reexport */ Domain["default"]),
  "Faq": () => (/* reexport */ Faq),
  "Feature": () => (/* reexport */ Feature["default"]),
  "Font": () => (/* reexport */ Font["default"]),
  "FontFamily": () => (/* reexport */ FontFamily["default"]),
  "Highlight": () => (/* reexport */ Highlight),
  "InsetMap": () => (/* reexport */ InsetMap),
  "Job": () => (/* reexport */ Job["default"]),
  "JobResult": () => (/* reexport */ JobResult["default"]),
  "JobRevision": () => (/* reexport */ JobRevision["default"]),
  "JobShare": () => (/* reexport */ JobShare["default"]),
  "JobType": () => (/* reexport */ JobType["default"]),
  "Language": () => (/* reexport */ Language["default"]),
  "Layer": () => (/* reexport */ Layer["default"]),
  "LayerFaq": () => (/* reexport */ LayerFaq),
  "LayerGroup": () => (/* reexport */ LayerGroup["default"]),
  "Mapstyle": () => (/* reexport */ Mapstyle["default"]),
  "MapstyleSet": () => (/* reexport */ MapstyleSet["default"]),
  "Message": () => (/* reexport */ Message["default"]),
  "Notification": () => (/* reexport */ Notification["default"]),
  "Organisation": () => (/* reexport */ Organisation["default"]),
  "Permission": () => (/* reexport */ Permission["default"]),
  "ProductTour": () => (/* reexport */ ProductTour),
  "ProductTourStep": () => (/* reexport */ ProductTourStep),
  "Role": () => (/* reexport */ Role["default"]),
  "Svg": () => (/* reexport */ Svg["default"]),
  "SvgSet": () => (/* reexport */ SvgSet["default"]),
  "Tag": () => (/* reexport */ Tag["default"]),
  "TagType": () => (/* reexport */ TagType),
  "User": () => (/* reexport */ User["default"]),
  "VectorChoropleth": () => (/* reexport */ VectorChoropleth),
  "VectorHighlight": () => (/* reexport */ VectorHighlight),
  "base": () => (/* binding */ base)
});

// EXTERNAL MODULE: ./src/resources/base/DownloadedResource.js + 1 modules
var DownloadedResource = __webpack_require__(25);
// EXTERNAL MODULE: ./src/resources/base/ResourceBase.js
var ResourceBase = __webpack_require__(3);
// EXTERNAL MODULE: ./src/utils/helpers.js
var helpers = __webpack_require__(1);
;// CONCATENATED MODULE: ./src/resources/Choropleth.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * Choropleth resource
 */

class Choropleth extends ResourceBase["default"] {
  static get resourceName() {
    return 'choropleths';
  }
  /**
   * Get the inset map json
   * @returns {CancelablePromise<Object>} - Choropleth json
   * @throws {ApiError} - If the api returns errors
   */


  getJson() {
    return (0,helpers.makeCancelable)(signal => this.api.ky.get(`${this.url}/json`, {
      signal
    }).json());
  }
  /**
   * Download the choropleth preview
   * @returns {CancelablePromise<DownloadedResource>} - Choropleth preview
   * @throws {ApiError} - If the api returns errors
   */


  downloadPreview() {
    return (0,helpers.makeCancelable)(async signal => {
      const response = await this.api.ky.get(`${this.url}/preview`, {
        signal
      });
      return DownloadedResource["default"].fromResponse(response);
    });
  }

}
// EXTERNAL MODULE: ./src/resources/Color.js
var Color = __webpack_require__(46);
// EXTERNAL MODULE: ./src/resources/Contract.js
var Contract = __webpack_require__(67);
// EXTERNAL MODULE: ./src/resources/Dimension.js
var Dimension = __webpack_require__(48);
// EXTERNAL MODULE: ./src/resources/DimensionSet.js
var DimensionSet = __webpack_require__(47);
// EXTERNAL MODULE: ./src/resources/Domain.js
var Domain = __webpack_require__(68);
// EXTERNAL MODULE: ./src/resources/base/CrudBase.js
var CrudBase = __webpack_require__(2);
;// CONCATENATED MODULE: ./src/resources/Faq.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Faq resource
 */

class Faq extends CrudBase["default"] {
  static get resourceName() {
    return 'faqs';
  }

}
// EXTERNAL MODULE: ./src/resources/Feature.js
var Feature = __webpack_require__(49);
// EXTERNAL MODULE: ./src/resources/Font.js
var Font = __webpack_require__(51);
// EXTERNAL MODULE: ./src/resources/FontFamily.js
var FontFamily = __webpack_require__(50);
;// CONCATENATED MODULE: ./src/resources/Highlight.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class Highlight extends ResourceBase["default"] {
  static get resourceName() {
    return 'highlights';
  }

}
;// CONCATENATED MODULE: ./src/resources/InsetMap.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


class InsetMap extends ResourceBase["default"] {
  static get resourceName() {
    return 'inset-maps';
  }
  /**
   * Get the inset map json
   * @returns {CancelablePromise<Object>} - Inset map json
   * @throws {ApiError} - If the api returns errors
   */


  getJson() {
    return (0,helpers.makeCancelable)(signal => this.api.ky.get(`${this.url}/json`, {
      signal
    }).json());
  }

}
// EXTERNAL MODULE: ./src/resources/Job.js
var Job = __webpack_require__(52);
// EXTERNAL MODULE: ./src/resources/JobResult.js
var JobResult = __webpack_require__(53);
// EXTERNAL MODULE: ./src/resources/JobRevision.js
var JobRevision = __webpack_require__(69);
// EXTERNAL MODULE: ./src/resources/JobShare.js
var JobShare = __webpack_require__(26);
// EXTERNAL MODULE: ./src/resources/JobType.js
var JobType = __webpack_require__(55);
// EXTERNAL MODULE: ./src/resources/Language.js
var Language = __webpack_require__(71);
// EXTERNAL MODULE: ./src/resources/Layer.js
var Layer = __webpack_require__(27);
// EXTERNAL MODULE: ./src/resources/base/CrudSetItemBase.js
var CrudSetItemBase = __webpack_require__(10);
;// CONCATENATED MODULE: ./src/resources/LayerFaq.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2022, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * LayerFaq
 * @extends CrudSetItemBase
 */

class LayerFaq extends CrudSetItemBase["default"] {
  static get resourceName() {
    return 'layer-faqs';
  }

  static get parentKey() {
    return 'layer_group_id';
  }

}
// EXTERNAL MODULE: ./src/resources/LayerGroup.js
var LayerGroup = __webpack_require__(74);
// EXTERNAL MODULE: ./src/resources/Mapstyle.js
var Mapstyle = __webpack_require__(70);
// EXTERNAL MODULE: ./src/resources/MapstyleSet.js + 1 modules
var MapstyleSet = __webpack_require__(28);
// EXTERNAL MODULE: ./src/resources/Message.js + 1 modules
var Message = __webpack_require__(36);
// EXTERNAL MODULE: ./src/resources/Notification.js
var Notification = __webpack_require__(72);
// EXTERNAL MODULE: ./src/resources/Organisation.js
var Organisation = __webpack_require__(45);
// EXTERNAL MODULE: ./src/resources/Permission.js
var Permission = __webpack_require__(59);
// EXTERNAL MODULE: ./src/utils/reflection.js
var reflection = __webpack_require__(0);
// EXTERNAL MODULE: ./src/resources/base/CrudSetBase.js
var CrudSetBase = __webpack_require__(15);
;// CONCATENATED MODULE: ./src/resources/ProductTourStep.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @extends CrudSetItemBase
 */

class ProductTourStep extends (0,reflection.mix)(CrudSetItemBase["default"]) {
  static get resourceName() {
    return 'product-tours/steps';
  }

  static get parentKey() {
    return 'product_tour_id';
  }

}
;// CONCATENATED MODULE: ./src/resources/ProductTour.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * Mapstyle set
 * @extends CrudSetBase
 */

class ProductTour extends (0,reflection.mix)(CrudSetBase["default"]) {
  static get resourcePath() {
    return '/product-tours/{id}';
  }

  static get resourceName() {
    return 'product-tours';
  }

  get _Child() {
    return ProductTourStep;
  }

}
// EXTERNAL MODULE: ./src/resources/Role.js
var Role = __webpack_require__(73);
// EXTERNAL MODULE: ./src/resources/Svg.js
var Svg = __webpack_require__(57);
// EXTERNAL MODULE: ./src/resources/SvgSet.js
var SvgSet = __webpack_require__(56);
// EXTERNAL MODULE: ./src/resources/Tag.js
var Tag = __webpack_require__(29);
;// CONCATENATED MODULE: ./src/resources/TagType.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * TagType resource
 * @mixes CrudSetBase
 */

class TagType extends CrudBase["default"] {
  static get resourcePath() {
    return '/tags/types/{id}';
  }

  static get resourceName() {
    return 'tag-types';
  }
  /**
   * Get the list of tags that are attached to this type
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get tags() {
    return this._proxyResourceList(Tag["default"], `${this.url}/tags`);
  }

}
// EXTERNAL MODULE: ./src/resources/User.js
var User = __webpack_require__(58);
;// CONCATENATED MODULE: ./src/resources/VectorHighlight.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class VectorHighlight extends ResourceBase["default"] {
  static get resourceName() {
    return 'highlights/vector';
  }

}
;// CONCATENATED MODULE: ./src/resources/VectorChoropleth.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class VectorChoropleth extends ResourceBase["default"] {
  static get resourceName() {
    return 'choropleths/vector';
  }

}
;// CONCATENATED MODULE: ./src/resources/index.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */








































/**
 * @private
 */

const base = {
  CrudBase: CrudBase["default"],
  CrudSetBase: CrudSetBase["default"],
  ResourceBase: ResourceBase["default"]
};

/***/ }),
/* 38 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var json = typeof JSON !== 'undefined' ? JSON : __webpack_require__(61);

module.exports = function (obj, opts) {
    if (!opts) opts = {};
    if (typeof opts === 'function') opts = { cmp: opts };
    var space = opts.space || '';
    if (typeof space === 'number') space = Array(space+1).join(' ');
    var cycles = (typeof opts.cycles === 'boolean') ? opts.cycles : false;
    var replacer = opts.replacer || function(key, value) { return value; };

    var cmp = opts.cmp && (function (f) {
        return function (node) {
            return function (a, b) {
                var aobj = { key: a, value: node[a] };
                var bobj = { key: b, value: node[b] };
                return f(aobj, bobj);
            };
        };
    })(opts.cmp);

    var seen = [];
    return (function stringify (parent, key, node, level) {
        var indent = space ? ('\n' + new Array(level + 1).join(space)) : '';
        var colonSeparator = space ? ': ' : ':';

        if (node && node.toJSON && typeof node.toJSON === 'function') {
            node = node.toJSON();
        }

        node = replacer.call(parent, key, node);

        if (node === undefined) {
            return;
        }
        if (typeof node !== 'object' || node === null) {
            return json.stringify(node);
        }
        if (isArray(node)) {
            var out = [];
            for (var i = 0; i < node.length; i++) {
                var item = stringify(node, i, node[i], level+1) || json.stringify(null);
                out.push(indent + space + item);
            }
            return '[' + out.join(',') + indent + ']';
        }
        else {
            if (seen.indexOf(node) !== -1) {
                if (cycles) return json.stringify('__cycle__');
                throw new TypeError('Converting circular structure to JSON');
            }
            else seen.push(node);

            var keys = objectKeys(node).sort(cmp && cmp(node));
            var out = [];
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = stringify(node, key, node[key], level+1);

                if(!value) continue;

                var keyValue = json.stringify(key)
                    + colonSeparator
                    + value;
                ;
                out.push(indent + space + keyValue);
            }
            seen.splice(seen.indexOf(node), 1);
            return '{' + out.join(',') + indent + '}';
        }
    })({ '': obj }, '', obj, 0);
};

var isArray = Array.isArray || function (x) {
    return {}.toString.call(x) === '[object Array]';
};

var objectKeys = Object.keys || function (obj) {
    var has = Object.prototype.hasOwnProperty || function () { return true };
    var keys = [];
    for (var key in obj) {
        if (has.call(obj, key)) keys.push(key);
    }
    return keys;
};


/***/ }),
/* 39 */
/***/ ((module) => {

var at, // The index of the current character
    ch, // The current character
    escapee = {
        '"':  '"',
        '\\': '\\',
        '/':  '/',
        b:    '\b',
        f:    '\f',
        n:    '\n',
        r:    '\r',
        t:    '\t'
    },
    text,

    error = function (m) {
        // Call error when something is wrong.
        throw {
            name:    'SyntaxError',
            message: m,
            at:      at,
            text:    text
        };
    },
    
    next = function (c) {
        // If a c parameter is provided, verify that it matches the current character.
        if (c && c !== ch) {
            error("Expected '" + c + "' instead of '" + ch + "'");
        }
        
        // Get the next character. When there are no more characters,
        // return the empty string.
        
        ch = text.charAt(at);
        at += 1;
        return ch;
    },
    
    number = function () {
        // Parse a number value.
        var number,
            string = '';
        
        if (ch === '-') {
            string = '-';
            next('-');
        }
        while (ch >= '0' && ch <= '9') {
            string += ch;
            next();
        }
        if (ch === '.') {
            string += '.';
            while (next() && ch >= '0' && ch <= '9') {
                string += ch;
            }
        }
        if (ch === 'e' || ch === 'E') {
            string += ch;
            next();
            if (ch === '-' || ch === '+') {
                string += ch;
                next();
            }
            while (ch >= '0' && ch <= '9') {
                string += ch;
                next();
            }
        }
        number = +string;
        if (!isFinite(number)) {
            error("Bad number");
        } else {
            return number;
        }
    },
    
    string = function () {
        // Parse a string value.
        var hex,
            i,
            string = '',
            uffff;
        
        // When parsing for string values, we must look for " and \ characters.
        if (ch === '"') {
            while (next()) {
                if (ch === '"') {
                    next();
                    return string;
                } else if (ch === '\\') {
                    next();
                    if (ch === 'u') {
                        uffff = 0;
                        for (i = 0; i < 4; i += 1) {
                            hex = parseInt(next(), 16);
                            if (!isFinite(hex)) {
                                break;
                            }
                            uffff = uffff * 16 + hex;
                        }
                        string += String.fromCharCode(uffff);
                    } else if (typeof escapee[ch] === 'string') {
                        string += escapee[ch];
                    } else {
                        break;
                    }
                } else {
                    string += ch;
                }
            }
        }
        error("Bad string");
    },

    white = function () {

// Skip whitespace.

        while (ch && ch <= ' ') {
            next();
        }
    },

    word = function () {

// true, false, or null.

        switch (ch) {
        case 't':
            next('t');
            next('r');
            next('u');
            next('e');
            return true;
        case 'f':
            next('f');
            next('a');
            next('l');
            next('s');
            next('e');
            return false;
        case 'n':
            next('n');
            next('u');
            next('l');
            next('l');
            return null;
        }
        error("Unexpected '" + ch + "'");
    },

    value,  // Place holder for the value function.

    array = function () {

// Parse an array value.

        var array = [];

        if (ch === '[') {
            next('[');
            white();
            if (ch === ']') {
                next(']');
                return array;   // empty array
            }
            while (ch) {
                array.push(value());
                white();
                if (ch === ']') {
                    next(']');
                    return array;
                }
                next(',');
                white();
            }
        }
        error("Bad array");
    },

    object = function () {

// Parse an object value.

        var key,
            object = {};

        if (ch === '{') {
            next('{');
            white();
            if (ch === '}') {
                next('}');
                return object;   // empty object
            }
            while (ch) {
                key = string();
                white();
                next(':');
                if (Object.hasOwnProperty.call(object, key)) {
                    error('Duplicate key "' + key + '"');
                }
                object[key] = value();
                white();
                if (ch === '}') {
                    next('}');
                    return object;
                }
                next(',');
                white();
            }
        }
        error("Bad object");
    };

value = function () {

// Parse a JSON value. It could be an object, an array, a string, a number,
// or a word.

    white();
    switch (ch) {
    case '{':
        return object();
    case '[':
        return array();
    case '"':
        return string();
    case '-':
        return number();
    default:
        return ch >= '0' && ch <= '9' ? number() : word();
    }
};

// Return the json_parse function. It will have access to all of the above
// functions and variables.

module.exports = function (source, reviver) {
    var result;
    
    text = source;
    at = 0;
    ch = ' ';
    result = value();
    white();
    if (ch) {
        error("Syntax error");
    }

    // If there is a reviver function, we recursively walk the new structure,
    // passing each name/value pair to the reviver function for possible
    // transformation, starting with a temporary root object that holds the result
    // in an empty key. If there is not a reviver function, we simply return the
    // result.

    return typeof reviver === 'function' ? (function walk(holder, key) {
        var k, v, value = holder[key];
        if (value && typeof value === 'object') {
            for (k in value) {
                if (Object.prototype.hasOwnProperty.call(value, k)) {
                    v = walk(value, k);
                    if (v !== undefined) {
                        value[k] = v;
                    } else {
                        delete value[k];
                    }
                }
            }
        }
        return reviver.call(holder, key, value);
    }({'': result}, '')) : result;
};


/***/ }),
/* 40 */
/***/ ((module) => {

var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap,
    indent,
    meta = {    // table of character substitutions
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    },
    rep;

function quote(string) {
    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.
    
    escapable.lastIndex = 0;
    return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
        var c = meta[a];
        return typeof c === 'string' ? c :
            '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + string + '"';
}

function str(key, holder) {
    // Produce a string from holder[key].
    var i,          // The loop counter.
        k,          // The member key.
        v,          // The member value.
        length,
        mind = gap,
        partial,
        value = holder[key];
    
    // If the value has a toJSON method, call it to obtain a replacement value.
    if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
        value = value.toJSON(key);
    }
    
    // If we were called with a replacer function, then call the replacer to
    // obtain a replacement value.
    if (typeof rep === 'function') {
        value = rep.call(holder, key, value);
    }
    
    // What happens next depends on the value's type.
    switch (typeof value) {
        case 'string':
            return quote(value);
        
        case 'number':
            // JSON numbers must be finite. Encode non-finite numbers as null.
            return isFinite(value) ? String(value) : 'null';
        
        case 'boolean':
        case 'null':
            // If the value is a boolean or null, convert it to a string. Note:
            // typeof null does not produce 'null'. The case is included here in
            // the remote chance that this gets fixed someday.
            return String(value);
            
        case 'object':
            if (!value) return 'null';
            gap += indent;
            partial = [];
            
            // Array.isArray
            if (Object.prototype.toString.apply(value) === '[object Array]') {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }
                
                // Join all of the elements together, separated with commas, and
                // wrap them in brackets.
                v = partial.length === 0 ? '[]' : gap ?
                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                    '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }
            
            // If the replacer is an array, use it to select the members to be
            // stringified.
            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }
            else {
                // Otherwise, iterate through all of the keys in the object.
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }
            
        // Join all of the member texts together, separated with commas,
        // and wrap them in braces.

        v = partial.length === 0 ? '{}' : gap ?
            '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
            '{' + partial.join(',') + '}';
        gap = mind;
        return v;
    }
}

module.exports = function (value, replacer, space) {
    var i;
    gap = '';
    indent = '';
    
    // If the space parameter is a number, make an indent string containing that
    // many spaces.
    if (typeof space === 'number') {
        for (i = 0; i < space; i += 1) {
            indent += ' ';
        }
    }
    // If the space parameter is a string, it will be used as the indent string.
    else if (typeof space === 'string') {
        indent = space;
    }

    // If there is a replacer, it must be a function or an array.
    // Otherwise, throw an error.
    rep = replacer;
    if (replacer && typeof replacer !== 'function'
    && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
        throw new Error('JSON.stringify');
    }
    
    // Make a fake root object containing our value under the key of ''.
    // Return the result of stringifying the value.
    return str('', {'': value});
};


/***/ }),
/* 41 */
/***/ ((module) => {

/* eslint-env browser */
module.exports = typeof self == 'object' ? self.FormData : window.FormData;


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ StateContainer)
});

// EXTERNAL MODULE: ./src/storage/StorageManager.js + 3 modules
var StorageManager = __webpack_require__(22);
// EXTERNAL MODULE: ./src/utils/StaticClass.js
var StaticClass = __webpack_require__(33);
;// CONCATENATED MODULE: ./src/utils/uuid.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * UUID util class
 * @static
 * @private
 */

class Uuid extends StaticClass["default"] {
  /**
   * Generate a UUID4 string
   * @returns {string} - Uuid
   */
  static uuid4() {
    let d = new Date().getTime();

    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now(); // use high-precision timer if available
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
  }
  /**
   * Empty uuid as per spec
   * @returns {string} - Uuid
   */


  static nil() {
    return '0000000-0000-0000-0000-000000000000';
  }

}
;// CONCATENATED MODULE: ./src/oauth/StateContainer.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * State container for keeping track of OAuth states (crsf tokens)
 * @static
 * @private
 */

class StateContainer extends StaticClass["default"] {
  /**
   * LocalStorage key prefix
   * @returns {String} - prefix
   * @constant
   */
  static get prefix() {
    return 'oauth_state_';
  }
  /**
   * Generate and store a state that can be checked at a later point
   * @returns {string} - state
   */


  static generate() {
    const uuid = Uuid.uuid4();
    const key = StateContainer.prefix + uuid;
    StorageManager["default"].best.set(key, Date.now());
    return uuid;
  }
  /**
   * Validate a state
   * @param {String} state - state to validate
   * @param {Boolean} purge - remove from state db after validation
   * @returns {Boolean} - if the state is valid
   */


  static validate(state, purge = true) {
    const storage = StorageManager["default"].best;
    const key = StateContainer.prefix + state;
    const found = typeof storage.get(key) !== 'undefined';

    if (purge && found) {
      storage.remove(key);
    }

    return found;
  }
  /**
   * Remove all states from the state db
   */


  static clean() {
    const tokens = Object.keys(this.list());

    for (const token of tokens) {
      StorageManager["default"].best.remove(StateContainer.prefix + token);
    }
  }
  /**
   * Get states with their corresponding state db key
   * @returns {Object<String, String>} - List of stored states
   */


  static list() {
    const storage = StorageManager["default"].best;
    return storage.keys().filter(x => x.startsWith(StateContainer.prefix)).map(x => x.replace(StateContainer.prefix, '')).reduce((out, key) => {
      out[key] = storage.get(key);
      return out;
    }, {});
  }

}

/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GeoResourceProxy)
/* harmony export */ });
/* harmony import */ var _errors_GeoError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(44);
/* harmony import */ var _RequestParameters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _utils_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(64);
/* harmony import */ var _ResourceProxy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */





class GeoResourceProxy extends _ResourceProxy__WEBPACK_IMPORTED_MODULE_3__["default"] {
  /**
   * @param {Mapcreator} api - Instance of the api
   * @param {ResourceBase} Target - Target to wrap
   * @param {?string} [altUrl=null] - Internal use, Optional alternative url for more complex routing
   * @param {object} seedData - Internal use, used for seeding ::new
   * @param {object} options - instance options
   * @param {boolean} [options.hasForPoint=true] - If the endpoint supports for-point
   * @param {boolean} [options.hasForBoundary=true] - If the endpoint supports for-boundary
   */
  constructor(api, Target, altUrl = null, seedData = {}, {
    hasForPoint = true,
    hasForBoundary = true
  } = {}) {
    super(api, Target, altUrl, seedData);
    this._hasForPoint = hasForPoint;
    this._hasForBoundary = hasForBoundary;
  }
  /**
   * If the proxy supports for-point operations
   * @returns {boolean} - If it supports the operations
   */


  get hasForPoint() {
    return this._hasForPoint;
  }
  /**
   * If the proxy supports for-point operations
   * @returns {boolean} - If it supports the operations
   */


  get hasForBoundary() {
    return this._hasForBoundary;
  } // noinspection JSCommentMatchesSignature

  /**
   * Get an array of results for boundary
   * @param {Object} boundary - boundary to search within
   * @param {Object} boundary.topLeft - top left corner of the boundary
   * @param {Number} boundary.topLeft.lat - top left corner latitude
   * @param {Number} boundary.topLeft.lng - top left corner longitude
   * @param {Object} boundary.bottomRight - bottom right corner of the boundary
   * @param {Number} boundary.bottomRight.lat - bottom right corner latitude
   * @param {Number} boundary.bottomRight.lng - bottom right corner longitude
   * @param {Number} limit - maximum amount of results, can't be larger then RequestParameters.maxPerPage
   * @returns {CancelablePromise<ResourceBase[]>} - target resource for boundary
   * @throws {ApiError} - If the api returns errors
   * @throws TypeError
   * @throws GeoError
   */


  forBoundary({
    topLeft,
    bottomRight
  }, limit = _RequestParameters__WEBPACK_IMPORTED_MODULE_1__["default"].perPage) {
    if (!this.hasForBoundary) {
      throw new _errors_GeoError__WEBPACK_IMPORTED_MODULE_0__["default"](`${this.Target.name} does not support the operation forBoundary`);
    }

    const boundary = new _utils_geo__WEBPACK_IMPORTED_MODULE_2__.GeoBoundary(topLeft, bottomRight);

    if (limit > _RequestParameters__WEBPACK_IMPORTED_MODULE_1__["default"].maxPerPage) {
      throw new TypeError(`Invalid resource limit ${limit}, maximum allowed is ${_RequestParameters__WEBPACK_IMPORTED_MODULE_1__["default"].maxPerPage}`);
    }

    const url = `${this.new().baseUrl}/for-boundary?per_page=${limit}`;
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_4__.makeCancelable)(async signal => {
      const {
        data
      } = await this.api.ky.post(url, {
        json: {
          boundary
        },
        signal
      }).json();
      return data.map(r => this.new(r));
    });
  }
  /**
   * Get an array of results for point
   * @param {Object} point - point to search at
   * @param {Number} point.lat - top left corner latitude
   * @param {Number} point.lng - top left corner longitude
   * @param {Number} limit - maximum amount of results, can't be larger then RequestParameters.maxPerPage
   * @returns {CancelablePromise<ResourceBase[]>} - target resource for boundary
   * @throws {ApiError} - If the api returns errors
   * @throws TypeError
   * @throws GeoError
   */


  forPoint({
    lat,
    lng
  }, limit = _RequestParameters__WEBPACK_IMPORTED_MODULE_1__["default"].perPage) {
    if (!this.hasForPoint) {
      throw new _errors_GeoError__WEBPACK_IMPORTED_MODULE_0__["default"](`${this.Target.name} does not support the operation forPoint`);
    }

    const point = new _utils_geo__WEBPACK_IMPORTED_MODULE_2__.GeoPoint(lat, lng);

    if (limit > _RequestParameters__WEBPACK_IMPORTED_MODULE_1__["default"].maxPerPage) {
      throw new TypeError(`Invalid resource limit ${limit}, maximum allowed is ${_RequestParameters__WEBPACK_IMPORTED_MODULE_1__["default"].maxPerPage}`);
    }

    const url = `${this.new().baseUrl}/for-point`;
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_4__.makeCancelable)(async signal => {
      const {
        data
      } = await this.api.ky.post(url, {
        json: {
          limit,
          point
        },
        signal
      }).json();
      return data.map(r => this.new(r));
    });
  }

}

/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GeoError)
/* harmony export */ });
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Thrown when an error occurs during geo processing
 */
class GeoError extends Error {}

/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Organisation)
/* harmony export */ });
/* harmony import */ var _proxy_OwnedResourceProxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _base_CrudBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _Color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(46);
/* harmony import */ var _Contract__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(67);
/* harmony import */ var _DimensionSet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(47);
/* harmony import */ var _Domain__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(68);
/* harmony import */ var _Feature__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(49);
/* harmony import */ var _FontFamily__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(50);
/* harmony import */ var _Job__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(52);
/* harmony import */ var _JobShare__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(26);
/* harmony import */ var _JobType__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(55);
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(27);
/* harmony import */ var _MapstyleSet__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(28);
/* harmony import */ var _SvgSet__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(56);
/* harmony import */ var _Tag__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(29);
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(58);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(1);
/* harmony import */ var _utils_requests__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(5);
/* harmony import */ var _LayerGroup__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(74);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



















class Organisation extends _base_CrudBase__WEBPACK_IMPORTED_MODULE_1__["default"] {
  static get resourceName() {
    return 'organisations';
  } // Resource listing

  /**
   * Get a proxy for font families linked to the organisation
   * @returns {OwnedResourceProxy} - A proxy for accessing the resource
   */


  get fontFamilies() {
    return new _proxy_OwnedResourceProxy__WEBPACK_IMPORTED_MODULE_0__["default"](this.api, this, _FontFamily__WEBPACK_IMPORTED_MODULE_7__["default"]);
  }
  /**
   * Get a proxy for dimension sets linked to the organisation
   * @returns {OwnedResourceProxy} - A proxy for accessing the resource
   */


  get dimensionSets() {
    return new _proxy_OwnedResourceProxy__WEBPACK_IMPORTED_MODULE_0__["default"](this.api, this, _DimensionSet__WEBPACK_IMPORTED_MODULE_4__["default"]);
  }
  /**
   * Get a proxy for mapstyle sets linked to the organisation
   * @returns {OwnedResourceProxy} - A proxy for accessing the resource
   */


  get mapstyleSets() {
    return new _proxy_OwnedResourceProxy__WEBPACK_IMPORTED_MODULE_0__["default"](this.api, this, _MapstyleSet__WEBPACK_IMPORTED_MODULE_12__["default"]);
  }
  /**
   * Get a proxy for svg sets linked to the organisation
   * @returns {OwnedResourceProxy} - A proxy for accessing the resource
   */


  get svgSets() {
    return new _proxy_OwnedResourceProxy__WEBPACK_IMPORTED_MODULE_0__["default"](this.api, this, _SvgSet__WEBPACK_IMPORTED_MODULE_13__["default"]);
  }
  /**
   * Get a proxy for colors linked to the organisation
   * @returns {OwnedResourceProxy} - A proxy for accessing the resource
   */


  get colors() {
    return new _proxy_OwnedResourceProxy__WEBPACK_IMPORTED_MODULE_0__["default"](this.api, this, _Color__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }
  /**
   * Get a proxy for tags linked to the organisation
   * @returns {OwnedResourceProxy} - A proxy for accessing the resource
   */


  get tags() {
    return new _proxy_OwnedResourceProxy__WEBPACK_IMPORTED_MODULE_0__["default"](this.api, this, _Tag__WEBPACK_IMPORTED_MODULE_14__["default"]);
  }
  /**
   * Get a proxy for features linked to the organisation
   * @returns {OwnedResourceProxy} - A proxy for accessing the resource
   */


  get features() {
    return new _proxy_OwnedResourceProxy__WEBPACK_IMPORTED_MODULE_0__["default"](this.api, this, _Feature__WEBPACK_IMPORTED_MODULE_6__["default"]);
  }
  /**
   * Get a proxy for layers linked to the organisation
   * @returns {OwnedResourceProxy} - A proxy for accessing the resource
   */


  get layers() {
    return new _proxy_OwnedResourceProxy__WEBPACK_IMPORTED_MODULE_0__["default"](this.api, this, _Layer__WEBPACK_IMPORTED_MODULE_11__["default"]);
  }
  /**
   * Get a proxy for layer groups linked to the organisation
   * @returns {OwnedResourceProxy} - A proxy for accessing the resource
   */


  get layerGroups() {
    return new _proxy_OwnedResourceProxy__WEBPACK_IMPORTED_MODULE_0__["default"](this.api, this, _LayerGroup__WEBPACK_IMPORTED_MODULE_18__["default"]);
  }
  /**
   * Get a proxy for jobs linked to the organisation, also known as company maps
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get jobs() {
    return this._proxyResourceList(_Job__WEBPACK_IMPORTED_MODULE_8__["default"]);
  }
  /**
   * Get a proxy for job types linked to the organisation
   * @returns {OwnedResourceProxy} - A proxy for accessing the resource
   */


  get jobTypes() {
    return new _proxy_OwnedResourceProxy__WEBPACK_IMPORTED_MODULE_0__["default"](this.api, this, _JobType__WEBPACK_IMPORTED_MODULE_10__["default"]);
  }
  /**
   * Get a proxy for job shares linked to the organisation
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get jobShares() {
    return this._proxyResourceList(_JobShare__WEBPACK_IMPORTED_MODULE_9__["default"]);
  }
  /**
   * Get a proxy for users linked to the organisation
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get users() {
    return this._proxyResourceList(_User__WEBPACK_IMPORTED_MODULE_15__["default"]);
  }
  /**
   * Get a proxy for contracts linked to the organisation
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get contracts() {
    return this._proxyResourceList(_Contract__WEBPACK_IMPORTED_MODULE_3__["default"]);
  }
  /**
   * Get a proxy for contracts linked to the organisation
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get domains() {
    return this._proxyResourceList(_Domain__WEBPACK_IMPORTED_MODULE_5__["default"]);
  }
  /**
   * Get a tree representation of the organisation's relationships
   * @returns {CancelablePromise<Array<Organisation>>} - List of organisation root nodes. Organisations contain an extra property called "children"
   * @throws {ApiError} - If the api returns errors
   * @example
   * function printTree(nodes, prefix = '-') {
   *  for (const node of nodes) {
   *    console.log(`${prefix} ${node.name}`);
   *
   *    printTree(node.children, prefix + '-');
   *  }
   * }
   *
   * organisation.getTree().then(printTree)
   */


  getTree(deleted = null) {
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_16__.makeCancelable)(async signal => {
      let url = `${this.url}/tree`;

      if (typeof deleted === 'string') {
        const glue = url.includes('?') ? '&' : '?';
        url += glue + (0,_utils_requests__WEBPACK_IMPORTED_MODULE_17__.encodeQueryString)({
          deleted
        });
      }

      const {
        data
      } = await this.api.ky.get(url, {
        signal
      }).json();
      return data.map(root => this._parseTree(root));
    });
  }

  _parseTree(rawNode) {
    const node = new this.constructor(this._api, rawNode);
    node.children = node.children.map(child => this._parseTree(child));
    return node;
  }

}

/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Color)
/* harmony export */ });
/* harmony import */ var _base_CrudBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _traits_OwnableResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _utils_reflection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * Color resource
 * @extends CrudBase
 * @mixes OwnableResource
 */

class Color extends (0,_utils_reflection__WEBPACK_IMPORTED_MODULE_2__.mix)(_base_CrudBase__WEBPACK_IMPORTED_MODULE_0__["default"], _traits_OwnableResource__WEBPACK_IMPORTED_MODULE_1__["default"]) {
  static get resourceName() {
    return 'colors';
  }

}

/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DimensionSet)
/* harmony export */ });
/* harmony import */ var _base_CrudSetBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _Dimension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(48);
/* harmony import */ var _traits_OwnableResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _utils_reflection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */




/**
 * Dimension sets
 * @extends CrudSetBase
 * @mixes OwnableResource
 */

class DimensionSet extends (0,_utils_reflection__WEBPACK_IMPORTED_MODULE_3__.mix)(_base_CrudSetBase__WEBPACK_IMPORTED_MODULE_0__["default"], _traits_OwnableResource__WEBPACK_IMPORTED_MODULE_2__["default"]) {
  static get resourcePath() {
    return '/dimensions/sets/{id}';
  }

  static get resourceName() {
    return 'dimension-sets';
  }

  get _Child() {
    return _Dimension__WEBPACK_IMPORTED_MODULE_1__["default"];
  }

}

/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dimension)
/* harmony export */ });
/* harmony import */ var _base_CrudSetItemBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Dimension resource
 */

class Dimension extends _base_CrudSetItemBase__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static get resourceName() {
    return 'dimensions';
  }

}

/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Feature)
/* harmony export */ });
/* harmony import */ var _base_CrudBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _traits_OwnableResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _utils_reflection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * Feature
 * @extends CrudBase
 * @mixes OwnableResource
 */

class Feature extends (0,_utils_reflection__WEBPACK_IMPORTED_MODULE_2__.mix)(_base_CrudBase__WEBPACK_IMPORTED_MODULE_0__["default"], _traits_OwnableResource__WEBPACK_IMPORTED_MODULE_1__["default"]) {
  static get resourceName() {
    return 'features';
  }

}

/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FontFamily)
/* harmony export */ });
/* harmony import */ var _traits_OwnableResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _utils_reflection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _base_CrudSetBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _Font__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(51);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */




/**
 * Font family
 * @extends CrudSetBase
 * @mixes OwnableResource
 */

class FontFamily extends (0,_utils_reflection__WEBPACK_IMPORTED_MODULE_1__.mix)(_base_CrudSetBase__WEBPACK_IMPORTED_MODULE_2__["default"], _traits_OwnableResource__WEBPACK_IMPORTED_MODULE_0__["default"]) {
  static get resourcePath() {
    return '/fonts/families/{id}';
  }

  static get resourceName() {
    return 'font-families';
  }

  get _Child() {
    return _Font__WEBPACK_IMPORTED_MODULE_3__["default"];
  }

}

/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Font)
/* harmony export */ });
/* harmony import */ var _base_CrudSetItemBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class Font extends _base_CrudSetItemBase__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static get resourceName() {
    return 'fonts';
  }

  static get parentKey() {
    return 'font_family_id';
  }

}

/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Job)
/* harmony export */ });
/* harmony import */ var _proxy_ResourceProxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _base_DownloadedResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25);
/* harmony import */ var _base_CrudBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _JobResult__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(53);
/* harmony import */ var _JobRevision__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(69);
/* harmony import */ var _RequestParameters__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _utils_requests__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5);
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1);
/* harmony import */ var _JobShare__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(26);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */










class Job extends _base_CrudBase__WEBPACK_IMPORTED_MODULE_2__["default"] {
  /**
   * Get the list of associated job results
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */
  get results() {
    return this._proxyResourceList(_JobResult__WEBPACK_IMPORTED_MODULE_3__["default"], `${this.url}/results`);
  }
  /**
   * Get the list job revisions
   * @returns {ResourceProxy} - A proxy for accessing the resource
   */


  get revisions() {
    const data = {
      jobId: this.id
    };
    return new _proxy_ResourceProxy__WEBPACK_IMPORTED_MODULE_0__["default"](this.api, _JobRevision__WEBPACK_IMPORTED_MODULE_4__["default"], null, data);
  }
  /**
   * Resource name
   * @returns {String} - Resource name
   * @abstract
   */


  static get resourceName() {
    return 'jobs';
  }
  /**
   * Get the most up to date preview url
   * @returns {string} - Preview url
   */


  get previewUrl() {
    return `${this.url}/preview`;
  }
  /**
   * Get the most up to date archive url
   * @returns {string} - Last archive url
   */


  get lastArchiveUrl() {
    return `${this.url}/output`;
  }
  /**
   * Download the job preview
   * @param {String} [deleted=RequestParameters.deleted] - Determines if the resource should be shown if deleted, requires special resource permissions. Possible values: only, none, all
   * @returns {CancelablePromise<DownloadedResource>} - Job result preview
   * @throws {ApiError} - If the api returns errors
   */


  downloadPreview(deleted = _RequestParameters__WEBPACK_IMPORTED_MODULE_5__["default"].deleted || _enums__WEBPACK_IMPORTED_MODULE_7__.DeletedState.NONE) {
    const url = `${this.previewUrl}?${(0,_utils_requests__WEBPACK_IMPORTED_MODULE_6__.encodeQueryString)({
      deleted
    })}`;
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_8__.makeCancelable)(async signal => {
      const response = await this.api.ky.get(url, {
        signal
      });
      return _base_DownloadedResource__WEBPACK_IMPORTED_MODULE_1__["default"].fromResponse(response);
    });
  }
  /**
   * Get archive blob url
   * @param {String} [deleted=RequestParameters.deleted] - Determines if the resource should be shown if deleted, requires special resource permissions. Possible values: only, none, all
   * @returns {CancelablePromise<DownloadedResource>} - Job result output
   * @throws {ApiError} - If the api returns errors
   */


  downloadOutput(deleted = _RequestParameters__WEBPACK_IMPORTED_MODULE_5__["default"].deleted || _enums__WEBPACK_IMPORTED_MODULE_7__.DeletedState.NONE) {
    const url = `${this.lastArchiveUrl}?${(0,_utils_requests__WEBPACK_IMPORTED_MODULE_6__.encodeQueryString)({
      deleted
    })}`;
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_8__.makeCancelable)(async signal => {
      const response = await this.api.ky.get(url, {
        signal
      });
      return _base_DownloadedResource__WEBPACK_IMPORTED_MODULE_1__["default"].fromResponse(response);
    });
  }
  /**
   * Get the remote output url
   * @param {String} [deleted=RequestParameters.deleted] - Determines if the resource should be shown if deleted, requires special resource permissions. Possible values: only, none, all
   * @returns {CancelablePromise<string>} - The url to the output
   * @throws {ApiError} - If the api returns errors
   */


  getOutputUrl(deleted = _RequestParameters__WEBPACK_IMPORTED_MODULE_5__["default"].deleted || _enums__WEBPACK_IMPORTED_MODULE_7__.DeletedState.NONE) {
    const url = `${this.url}/output-url?${(0,_utils_requests__WEBPACK_IMPORTED_MODULE_6__.encodeQueryString)({
      deleted
    })}`;
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_8__.makeCancelable)(async signal => {
      const {
        data
      } = await this.api.ky.get(url, {
        signal
      }).json();
      return data.url;
    });
  }
  /**
   * Share the job
   * @param {String} visibility - See {@link JobShareVisibility}, either `private`, `public` or `organisation`
   * @param {String} [deleted=RequestParameters.deleted] - Determines if the resource should be shown if deleted, requires special resource permissions. Possible values: only, none, all
   * @returns {CancelablePromise<JobShare>} - Object containing share links
   * @throws {ApiError} - If the api returns errors
   */


  share(visibility = _JobShare__WEBPACK_IMPORTED_MODULE_9__["default"].visibility.PRIVATE, deleted = _RequestParameters__WEBPACK_IMPORTED_MODULE_5__["default"].deleted || _enums__WEBPACK_IMPORTED_MODULE_7__.DeletedState.NONE) {
    visibility = visibility.toLowerCase();

    if (!_JobShare__WEBPACK_IMPORTED_MODULE_9__["default"].visibility.values().includes(visibility)) {
      throw new Error(`Unknown visibility '${visibility}'`);
    }

    const url = `${this.url}/share?${(0,_utils_requests__WEBPACK_IMPORTED_MODULE_6__.encodeQueryString)({
      deleted
    })}`;
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_8__.makeCancelable)(async signal => {
      const {
        data
      } = await this.api.ky.post(url, {
        json: {
          visibility
        },
        signal
      }).json();
      return new _JobShare__WEBPACK_IMPORTED_MODULE_9__["default"](this._api, data);
    });
  }

}

/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JobResult)
/* harmony export */ });
/* harmony import */ var _base_DownloadedResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var _base_ResourceBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _RequestParameters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _utils_requests__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */






class JobResult extends _base_ResourceBase__WEBPACK_IMPORTED_MODULE_1__["default"] {
  static get resourcePath() {
    return '/jobs/{job_id}/revisions/{revision}/result';
  }

  static get resourceName() {
    return 'job-result';
  }
  /**
   * Get the related job
   * @returns {CancelablePromise<Job>} - The job related to this row
   * @throws {ApiError} - If the api returns errors
   */


  get job() {
    return this.api.jobs.get(this.jobId);
  }
  /**
   * Get the related job revision
   * @returns {CancelablePromise<JobRevision>} - The job revision related to this row
   * @throws {ApiError} - If the api returns errors
   */


  get jobRevision() {
    return this.api.jobs.select(this.jobId).revisions.get(this.id);
  }
  /**
   * Job result archive url
   * @returns {string} - Archive url
   */


  get outputUrl() {
    return `${this.url}/output`;
  }
  /**
   * Get archive blob url
   * @param {String} [deleted=RequestParameters.deleted] - Determines if the resource should be shown if deleted, requires special resource permissions. Possible values: only, none, all
   * @returns {CancelablePromise<DownloadedResource>} - Job result output
   * @throws {ApiError} - If the api returns errors
   */


  downloadOutput(deleted = _RequestParameters__WEBPACK_IMPORTED_MODULE_2__["default"].deleted || _enums__WEBPACK_IMPORTED_MODULE_4__.DeletedState.NONE) {
    const url = `${this.outputUrl}?${(0,_utils_requests__WEBPACK_IMPORTED_MODULE_3__.encodeQueryString)({
      deleted
    })}`;
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_5__.makeCancelable)(async signal => {
      const response = await this.api.ky.get(url, {
        signal
      });
      return _base_DownloadedResource__WEBPACK_IMPORTED_MODULE_0__["default"].fromResponse(response);
    });
  }
  /**
   * Get the output url url
   * @returns {string} - Output url url
   */


  get outputUrlUrl() {
    return `${this.url}/output-url`;
  }
  /**
   * Get the remote output url
   * @param {String} [deleted=RequestParameters.deleted] - Determines if the resource should be shown if deleted, requires special resource permissions. Possible values: only, none, all
   * @returns {CancelablePromise<string>} - The url to the output
   * @throws {ApiError} - If the api returns errors
   */


  getOutputUrl(deleted = _RequestParameters__WEBPACK_IMPORTED_MODULE_2__["default"].deleted || _enums__WEBPACK_IMPORTED_MODULE_4__.DeletedState.NONE) {
    const url = `${this.outputUrlUrl}?${(0,_utils_requests__WEBPACK_IMPORTED_MODULE_3__.encodeQueryString)({
      deleted
    })}`;
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_5__.makeCancelable)(async signal => {
      const {
        data
      } = await this.api.ky.get(url, {
        signal
      }).json();
      return data.url;
    });
  }
  /**
   * Job result log url
   * @returns {string} - log url
   */


  get logUrl() {
    return `${this.url}/log`;
  }
  /**
   * Download the job result log
   * @param {String} [deleted=RequestParameters.deleted] - Determines if the resource should be shown if deleted, requires special resource permissions. Possible values: only, none, all
   * @returns {CancelablePromise<DownloadedResource>} - job result log
   * @throws {ApiError} - If the api returns errors
   */


  downloadLog(deleted = _RequestParameters__WEBPACK_IMPORTED_MODULE_2__["default"].deleted || _enums__WEBPACK_IMPORTED_MODULE_4__.DeletedState.NONE) {
    const url = `${this.logUrl}?${(0,_utils_requests__WEBPACK_IMPORTED_MODULE_3__.encodeQueryString)({
      deleted
    })}`;
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_5__.makeCancelable)(async signal => {
      const response = await this.api.ky.get(url, {
        signal
      });
      return _base_DownloadedResource__WEBPACK_IMPORTED_MODULE_0__["default"].fromResponse(response);
    });
  }
  /**
   * Job result preview url, usable in an `<img>` tag
   * @returns {string} - Preview url
   */


  get previewUrl() {
    return `${this.url}/preview`;
  }
  /**
   * Download the job preview
   * @param {String} [deleted=RequestParameters.deleted] - Determines if the resource should be shown if deleted, requires special resource permissions. Possible values: only, none, all
   * @returns {CancelablePromise<DownloadedResource>} - Job result preview
   * @throws {ApiError} - If the api returns errors
   */


  downloadPreview(deleted = _RequestParameters__WEBPACK_IMPORTED_MODULE_2__["default"].deleted || _enums__WEBPACK_IMPORTED_MODULE_4__.DeletedState.NONE) {
    const url = `${this.previewUrl}?${(0,_utils_requests__WEBPACK_IMPORTED_MODULE_3__.encodeQueryString)({
      deleted
    })}`;
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_5__.makeCancelable)(async signal => {
      const response = await this.api.ky.get(url, {
        signal
      });
      return _base_DownloadedResource__WEBPACK_IMPORTED_MODULE_0__["default"].fromResponse(response);
    });
  }
  /**
   * Mark a job as dealt with
   * This method is for internal use for our support team.
   *
   * @param {boolean} [value=true] - What to set the dealt-with value to
   * @param {String} [deleted=RequestParameters.deleted] - Determines if the resource should be shown if deleted, requires special resource permissions. Possible values: only, none, all
   * @returns {CancelablePromise}
   * @throws {ApiError} - If the api returns errors
   */


  dealWith(value = true, deleted = _RequestParameters__WEBPACK_IMPORTED_MODULE_2__["default"].deleted || _enums__WEBPACK_IMPORTED_MODULE_4__.DeletedState.NONE) {
    value = Boolean(value);
    const method = value ? 'POST' : 'DELETE';
    const url = `${this.url}/deal-with?${(0,_utils_requests__WEBPACK_IMPORTED_MODULE_3__.encodeQueryString)({
      deleted
    })}`;
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_5__.makeCancelable)(async signal => {
      await this.api.ky(url, {
        method,
        signal
      });
      this.dealtWith = value;
    });
  }

}

/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ HandlesImages)
});

// EXTERNAL MODULE: ./src/traits/Trait.js
var Trait = __webpack_require__(31);
// EXTERNAL MODULE: ./src/Mapcreator.js + 1 modules
var Mapcreator = __webpack_require__(16);
// EXTERNAL MODULE: ./src/resources/base/DownloadedResource.js + 1 modules
var DownloadedResource = __webpack_require__(25);
// EXTERNAL MODULE: ./src/resources/base/ResourceBase.js
var ResourceBase = __webpack_require__(3);
// EXTERNAL MODULE: ./src/utils/reflection.js
var reflection = __webpack_require__(0);
// EXTERNAL MODULE: ./src/utils/requests.js
var requests = __webpack_require__(5);
// EXTERNAL MODULE: ./src/utils/helpers.js
var helpers = __webpack_require__(1);
;// CONCATENATED MODULE: ./src/ImageHandler.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */






/**
 * Image resource handler
 * @protected
 */

class ImageHandler {
  /**
   * @param {Mapcreator} api - Api instance
   * @param {ResourceBase} target - Instance of target item
   */
  constructor(api, target) {
    if (!(0,reflection.isParentOf)(Mapcreator["default"], api)) {
      throw new TypeError('Expected api to be of type Mapcreator');
    }

    if (!(0,reflection.isParentOf)(ResourceBase["default"], target)) {
      throw new TypeError('Expected target to be of type ResourceBase');
    }

    this._api = api;
    this._target = target;
  }
  /**
   * Get api instance
   * @returns {Mapcreator} - Api instance
   */


  get api() {
    return this._api;
  }
  /**
   * Resource url, can be used in an image tag
   * @returns {string} - Resource url
   */


  get url() {
    return `${this._target.url}/image`;
  }
  /**
   * Delete image
   * @throws {ApiError} - If the api returns errors
   * @returns {CancelablePromise}
   */


  delete() {
    // use the makeCancelable helper so we don't return the response object
    return (0,helpers.makeCancelable)(async signal => {
      await this.api.ky.delete(this.url, {
        signal
      });
    });
  }
  /**
   * Download the image
   * @returns {CancelablePromise<DownloadedResource>} - image
   * @throws {ApiError} - If the api returns errors
   * @example
   * // Browser
   * layer.imageHandler.download().then(image => {
   *   $('img').src = image.createObjectURL();
   * });
   *
   * // NodeJs
   * layer.imageHandler.download().then({fileName, data} => {
   *   fs.writeFileSync(fileName, data);
   * });
   */


  download() {
    return (0,helpers.makeCancelable)(async signal => {
      const response = await this.api.ky.get(this.url, {
        signal
      });
      return DownloadedResource["default"].fromResponse(response);
    });
  }
  /**
   * Upload new image
   * @param {ArrayBuffer|ArrayBufferView|File|Blob|Buffer} image - Image file
   * @returns {CancelablePromise}
   * @throws {ApiError} - If the api returns errors
   */


  upload(image) {
    const body = new requests.FormData();
    body.append('image', image, 'image');
    const headers = {};

    if (body.getHeaders) {
      Object.assign(headers, body.getHeaders());
    }

    return (0,helpers.makeCancelable)(async signal => {
      await this.api.ky.post(this.url, {
        headers,
        body,
        signal
      });
    });
  }

}
;// CONCATENATED MODULE: ./src/traits/HandlesImages.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * Adds the imageHandler to a resource
 *
 * @mixin
 */

class HandlesImages extends Trait["default"] {
  /**
   * Handler for item image management
   * @returns {ImageHandler} - Image handler
   */
  get imageHandler() {
    return new ImageHandler(this.api, this);
  }

}

/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JobType)
/* harmony export */ });
/* harmony import */ var _base_CrudBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _traits_OwnableResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _utils_reflection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * Job type
 * @extends CrudBase
 * @mixes OwnableResource
 */

class JobType extends (0,_utils_reflection__WEBPACK_IMPORTED_MODULE_2__.mix)(_base_CrudBase__WEBPACK_IMPORTED_MODULE_0__["default"], _traits_OwnableResource__WEBPACK_IMPORTED_MODULE_1__["default"]) {
  static get resourcePath() {
    return '/jobs/types/{id}';
  }

  static get resourceName() {
    return 'job-types';
  }

}

/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SvgSet)
/* harmony export */ });
/* harmony import */ var _traits_OwnableResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _base_CrudSetBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _Svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(57);
/* harmony import */ var _utils_reflection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */




/**
 * Svg set
 * @extends CrudSetBase
 * @mixes OwnableResource
 */

class SvgSet extends (0,_utils_reflection__WEBPACK_IMPORTED_MODULE_3__.mix)(_base_CrudSetBase__WEBPACK_IMPORTED_MODULE_1__["default"], _traits_OwnableResource__WEBPACK_IMPORTED_MODULE_0__["default"]) {
  static get resourcePath() {
    return '/svgs/sets/{id}';
  }

  static get resourceName() {
    return 'svg-sets';
  }

  get _Child() {
    return _Svg__WEBPACK_IMPORTED_MODULE_2__["default"];
  }

}

/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Svg)
/* harmony export */ });
/* harmony import */ var _base_CrudSetItemBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class Svg extends _base_CrudSetItemBase__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static get resourceName() {
    return 'svgs';
  }

}

/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ User)
/* harmony export */ });
/* harmony import */ var _proxy_OwnedResourceProxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _proxy_ResourceProxy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _base_CrudBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _Color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(46);
/* harmony import */ var _Dimension__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(48);
/* harmony import */ var _DimensionSet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(47);
/* harmony import */ var _Feature__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(49);
/* harmony import */ var _Font__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(51);
/* harmony import */ var _FontFamily__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(50);
/* harmony import */ var _Job__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(52);
/* harmony import */ var _JobShare__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(26);
/* harmony import */ var _JobType__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(55);
/* harmony import */ var _Language__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(71);
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(27);
/* harmony import */ var _Mapstyle__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(70);
/* harmony import */ var _MapstyleSet__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(28);
/* harmony import */ var _Message__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(36);
/* harmony import */ var _Notification__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(72);
/* harmony import */ var _Organisation__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(45);
/* harmony import */ var _Permission__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(59);
/* harmony import */ var _Role__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(73);
/* harmony import */ var _Svg__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(57);
/* harmony import */ var _SvgSet__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(56);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(1);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
























class User extends _base_CrudBase__WEBPACK_IMPORTED_MODULE_2__["default"] {
  static get resourceName() {
    return 'users';
  }
  /**
   * Get all known ips
   * @returns {CancelablePromise<string[]>} - List of ip addresses
   * @throws {ApiError} - If the api returns errors
   */


  ips() {
    const url = `${this.url}/ips`;
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_23__.makeCancelable)(async signal => {
      const {
        data
      } = await this.api.ky.get(url, {
        signal
      }).json();
      return data.map(row => row['ip_address']);
    });
  }
  /**
   * Get the user's organisation
   * @returns {CancelablePromise<Organisation>} - User's organisation
   * @throws {ApiError} - If the api returns errors
   */


  organisation() {
    return new _proxy_ResourceProxy__WEBPACK_IMPORTED_MODULE_1__["default"](this.api, _Organisation__WEBPACK_IMPORTED_MODULE_18__["default"]).get(this.organisationId);
  }
  /**
   * Get the user's language
   * @returns {CancelablePromise<Language>} - User's language
   * @throws {ApiError} - If the api returns errors
   */


  language() {
    return new _proxy_ResourceProxy__WEBPACK_IMPORTED_MODULE_1__["default"](this.api, _Language__WEBPACK_IMPORTED_MODULE_12__["default"]).get(this.languageCode);
  } // region Resource listing

  /**
   * Get the list notifications linked to the user
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get notifications() {
    return this._proxyResourceList(_Notification__WEBPACK_IMPORTED_MODULE_17__["default"]);
  }
  /**
   * Get a list of read/unread messages for the user
   * @returns {CancelablePromise<{read: Message[], unread: Message[]}>} - Read and unread messages
   */


  messages() {
    const url = `${this.url}/messages`;
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_23__.makeCancelable)(async signal => {
      const {
        data
      } = await this.api.ky.get(url, {
        signal
      }).json();
      return {
        read: data.read.map(o => new _Message__WEBPACK_IMPORTED_MODULE_16__["default"](this.api, o)),
        unread: data.unread.map(o => new _Message__WEBPACK_IMPORTED_MODULE_16__["default"](this.api, o))
      };
    });
  }
  /**
   * Get the list mapstyle sets linked to the user
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get mapstyleSets() {
    return this._proxyResourceList(_MapstyleSet__WEBPACK_IMPORTED_MODULE_15__["default"]);
  }
  /**
   * Get the list mapstyles linked to the user
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get mapstyles() {
    return this._proxyResourceList(_Mapstyle__WEBPACK_IMPORTED_MODULE_14__["default"]);
  }
  /**
   * Get the list dimension sets linked to the user
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get dimensionSets() {
    return this._proxyResourceList(_DimensionSet__WEBPACK_IMPORTED_MODULE_5__["default"]);
  }
  /**
   * Get the list dimensions linked to the user
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get dimensions() {
    return this._proxyResourceList(_Dimension__WEBPACK_IMPORTED_MODULE_4__["default"]);
  }
  /**
   * Get the list font families linked to the user
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get fontFamilies() {
    return this._proxyResourceList(_FontFamily__WEBPACK_IMPORTED_MODULE_8__["default"]);
  }
  /**
   * Get the list fonts linked to the user
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get fonts() {
    return this._proxyResourceList(_Font__WEBPACK_IMPORTED_MODULE_7__["default"]);
  }
  /**
   * Get the list svg sets linked to the user
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get svgSets() {
    return this._proxyResourceList(_SvgSet__WEBPACK_IMPORTED_MODULE_22__["default"]);
  }
  /**
   * Get the list svgs linked to the user
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get svgs() {
    return this._proxyResourceList(_Svg__WEBPACK_IMPORTED_MODULE_21__["default"]);
  }
  /**
   * Get the list colors linked to the user
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get colors() {
    return this._proxyResourceList(_Color__WEBPACK_IMPORTED_MODULE_3__["default"]);
  }
  /**
   * Get the list jobs linked to the user
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get jobs() {
    return this._proxyResourceList(_Job__WEBPACK_IMPORTED_MODULE_9__["default"]);
  }
  /**
   * Get the list features linked to the user
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get features() {
    return this._proxyResourceList(_Feature__WEBPACK_IMPORTED_MODULE_6__["default"]);
  }
  /**
   * Get the list layers linked to the user
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get layers() {
    return this._proxyResourceList(_Layer__WEBPACK_IMPORTED_MODULE_13__["default"]);
  }
  /**
   * Get the list job types linked to the user
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get jobTypes() {
    return this._proxyResourceList(_JobType__WEBPACK_IMPORTED_MODULE_11__["default"]);
  }
  /**
   * Get the list job shares linked to the user
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get jobShares() {
    return this._proxyResourceList(_JobShare__WEBPACK_IMPORTED_MODULE_10__["default"]);
  }
  /**
   * Get the list permissions linked to the user
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get permissions() {
    return this._proxyResourceList(_Permission__WEBPACK_IMPORTED_MODULE_19__["default"]);
  }
  /**
   * Get the list roles linked to the user
   * @returns {OwnedResourceProxy} - A proxy for accessing the resource
   */


  get roles() {
    return new _proxy_OwnedResourceProxy__WEBPACK_IMPORTED_MODULE_0__["default"](this.api, this, _Role__WEBPACK_IMPORTED_MODULE_20__["default"]);
  } // endregion


}

/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Permission)
/* harmony export */ });
/* harmony import */ var _base_ResourceBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class Permission extends _base_ResourceBase__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static get resourceName() {
    return 'permissions';
  }

}

/***/ }),
/* 60 */,
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

exports.parse = __webpack_require__(39);
exports.stringify = __webpack_require__(40);


/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StaticClassError)
/* harmony export */ });
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Thrown upon invocation of a static class
 * @see {@link StaticClass}
 */
class StaticClassError extends Error {}

/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FileDriver)
/* harmony export */ });
/* harmony import */ var _utils_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _DataStoreContract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @private
 */

class FileDriver extends _DataStoreContract__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * @param {String} path - File storage path
   * @inheritDoc
   */
  constructor(path = '.m4n') {
    super();
    this._path = path;
  }
  /**
   * File storage path
   * @returns {String} - path
   */


  get path() {
    return this._path;
  }
  /**
   * File storage path
   * @param {String} value - path
   */


  set path(value) {
    if (typeof value !== 'string') {
      throw new TypeError('Expected "path" value to be of type "string"');
    }

    this._path = value;
  }
  /**
   * @inheritDoc
   */


  static get available() {
    return (0,_utils_node__WEBPACK_IMPORTED_MODULE_0__.isNode)();
  }
  /**
   * @inheritDoc
   */


  static get secure() {
    return true;
  }
  /**
   * @inheritDoc
   */


  set(name, value) {
    const data = this._read();

    data[name] = value;

    this._write(data);
  }
  /**
   * @inheritDoc
   */


  get(name) {
    return this._read()[name];
  }
  /**
   * @inheritDoc
   */


  remove(name) {
    const data = this._read();

    delete data[name];

    this._write(data);
  }
  /**
   * @inheritDoc
   */


  clear() {
    this._write({});
  }
  /**
   * @inheritDoc
   */


  keys() {
    return Object.keys(this._read());
  }
  /**
   * Read file and parse
   * @returns {Object<String, String>} - Key, value object
   * @private
   */


  _read() {
    let data;

    try {
      data = this._fs.readFileSync(this.path).toString();
    } catch (e) {
      data = '{}';
    }

    if (!data) {
      return {};
    }

    return JSON.parse(data);
  }
  /**
   * Write data to file
   * @param {Object<String, String>} obj - Key, value object
   * @private
   */


  _write(obj) {
    const data = JSON.stringify(obj);

    const fd = this._fs.openSync(this.path, 'w');

    this._fs.writeSync(fd, data);

    this._fs.closeSync(fd);
  }
  /**
   * Get fs instance
   * @returns {fs} - fs instance
   * @private
   */


  get _fs() {
    if (!this.__fs) {
      // eslint-disable-next-line no-eval
      this.__fs = eval('require("fs")');
    }

    return this.__fs;
  }

}

/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GeoPoint": () => (/* binding */ GeoPoint),
/* harmony export */   "GeoBoundary": () => (/* binding */ GeoBoundary)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _errors_GeoError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44);


/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * A geographical point
 */

class GeoPoint {
  /**
   * Geographical point
   * @param {Number} lat - latitude
   * @param {Number} lng - longitude
   */
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }
  /**
   * Get latitude
   * @returns {Number} - latitude
   */


  get lat() {
    return this._lat;
  }
  /**
   * Set latitude
   * @param {Number} value - latitude
   */


  set lat(value) {
    value = Number(value);

    if (!Number.isFinite(value)) {
      throw new _errors_GeoError__WEBPACK_IMPORTED_MODULE_1__["default"](`Invalid latitude: ${value}`);
    }

    this._lat = Math.min(90, Math.max(-90, value));
  }
  /**
   * Get longitude
   * @returns {Number} - longitude
   */


  get lng() {
    return this._lng;
  }
  /**
   * Set longitude
   * @param {Number} value - longitude
   */


  set lng(value) {
    value = Number(value);

    if (!Number.isFinite(value)) {
      throw new _errors_GeoError__WEBPACK_IMPORTED_MODULE_1__["default"](`Invalid longitude: ${value}`);
    }

    this._lng = value;
  }
  /**
   * Get data to be JSON encoded
   * @returns {{lat: Number, lng: Number}} - data
   */


  toJSON() {
    return {
      lat: this.lat,
      lng: this.lng
    };
  }

}
/**
 * Geometric boundary
 */

class GeoBoundary {
  /**
   * Geometric boundary
   * @param {Object} topLeft - top left corner of the boundary
   * @param {Number} topLeft.lat - top left corner latitude
   * @param {Number} topLeft.lng - top left corner longitude
   * @param {Object} bottomRight - bottom right corner of the boundary
   * @param {Number} bottomRight.lat - bottom right corner latitude
   * @param {Number} bottomRight.lng - bottom right corner longitude
   */
  constructor({
    lat: lat1,
    lng: lng1
  }, {
    lat: lat2,
    lng: lng2
  }) {
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "topLeft", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "bottomRight", void 0);

    this.topLeft = new GeoPoint(lat1, lng1);
    this.bottomRight = new GeoPoint(lat2, lng2);
  }

  getCenter() {
    const lat = (this.topLeft.lat + this.bottomRight.lat) / 2;
    const lng = (this.topLeft.lng + this.bottomRight.lng) / 2;
    return new GeoPoint(lat, lng);
  }
  /**
   * Top left coordinate
   * @type {GeoPoint}
   */


}

/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Injectable)
/* harmony export */ });
/* harmony import */ var _resources_base_ResourceBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _utils_reflection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _Trait__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * Adds the possibility to inject proxies/methods
 *
 * @mixin
 */

class Injectable extends _Trait__WEBPACK_IMPORTED_MODULE_2__["default"] {
  /**
   * Inject proxies and methods during the constructor
   */
  initializer() {
    const injectable = this.constructor._injectable || {};

    for (const name of Object.keys(injectable)) {
      const {
        value,
        isProxy
      } = injectable[name];

      if (isProxy) {
        this.injectProxy(name, value);
      } else {
        this.inject(name, value);
      }
    }
  }
  /**
   * Inject a proxy property into future instances
   *
   * @param {string|object} name - Name of the property
   * @param {function?} value - Either a resource or a function that returns a proxy
   *
   * @example
   *
   * Mapcreator.injectProxy({Domain});
   *
   * // After creating new api instance
   *
   * api.domains // returns proxy
   */


  static injectProxy(name, value) {
    if (value) {
      if (typeof this._injectable === 'undefined') {
        this._injectable = {};
      }

      this._injectable[name] = {
        value,
        isProxy: true
      };
    } else {
      // Handle vue-style injections `.inject({ Foo, Bar, Baz })`
      for (const key of Object.keys(name)) {
        this.inject(key, name[key]);
      }
    }
  }
  /**
   * Inject a property into future instances
   *
   * @param {string|object} name - Name of the property
   * @param {function?} value - Any function that does not return a proxy
   *
   */


  static inject(name, value) {
    if (value) {
      if (typeof this._injectable === 'undefined') {
        this._injectable = {};
      }

      this._injectable[name] = {
        value,
        isProxy: false
      };
    } else {
      // Handle vue-style injections `.inject({ Foo, Bar, Baz })`
      for (const key of Object.keys(name)) {
        this.inject(key, name[key]);
      }
    }
  }
  /**
   * Prevent a property from being injected
   * @param {string} name - Name of the property
   */


  static uninject(name) {
    if (typeof this._injectable !== 'undefined') {
      delete this._injectable[name];
    }
  }
  /**
   * Inject a proxy
   * @param {string} name - Name of the property
   * @param {function?} value - Either a resource or a function that returns a proxy
   */


  injectProxy(name, value) {
    if (!value) {
      // Handle vue-style injections `.inject({ Foo, Bar, Baz })`
      for (const key of Object.keys(name)) {
        this.injectProxy(key, name[key]);
      }
    } else if ((0,_utils_reflection__WEBPACK_IMPORTED_MODULE_1__.isParentOf)(_resources_base_ResourceBase__WEBPACK_IMPORTED_MODULE_0__["default"], value)) {
      this._injectProxy(name, value);
    } else {
      this._inject(name, value);
    }
  }
  /**
   * Inject a property into the instance
   *
   * @param {string|object} name - Name of the property
   * @param {function?} value - Any function that does not return a proxy
   *
   */


  inject(name, value) {
    this._inject(name, value, false);
  }
  /**
   * Revert a proxy injection in instance, won't delete non-injected properties
   *
   * @param {string} name - property name
   * @throws Error when the property was not injected
   */


  uninject(name) {
    const descriptor = Object.getOwnPropertyDescriptor(this, name);
    const value = descriptor.value || descriptor.get || {};

    if (!value.injected) {
      throw new Error(`Property "${name}" was not injected, can't un-inject`);
    }

    if (value.original) {
      Object.defineProperty(this, name, value.original);
    } else {
      Object.defineProperty(this, name, {
        // eslint-disable-next-line no-undefined
        value: undefined,
        enumerable: false,
        writable: true
      });
    }
  }

  _injectProxy(name, value) {
    if (name === value.name) {
      name = `${name.replace(/^\w/, c => c.toLowerCase())}s`;
    }

    const OwnableResource = (__webpack_require__(6)["default"]);

    if ((0,_utils_reflection__WEBPACK_IMPORTED_MODULE_1__.hasTrait)(value, OwnableResource)) {
      const OwnedResourceProxy = (__webpack_require__(20)["default"]);

      this._inject(name, function () {
        return new OwnedResourceProxy(this.api, this, value);
      });
    } else if ((0,_utils_reflection__WEBPACK_IMPORTED_MODULE_1__.isParentOf)(_resources_base_ResourceBase__WEBPACK_IMPORTED_MODULE_0__["default"], value) && this._proxyResourceList) {
      // returns a SimpleResourceProxy
      this._inject(name, function () {
        return this._proxyResourceList(value);
      });
    } else {
      const ResourceProxy = (__webpack_require__(19)["default"]);

      this._inject(name, function () {
        return new ResourceProxy(this, value);
      });
    }
  }

  _inject(name, value, getter = true) {
    const func = (...args) => value.apply(this, args);

    const original = Object.getOwnPropertyDescriptor(this, name);
    func.injected = true; // Store the original property descriptor if available

    if (original) {
      func.original = original;
    }

    Object.defineProperty(this, name, {
      enumerable: false,
      configurable: true,
      [getter ? 'get' : 'value']: func
    });
  }

}

/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiError)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);


/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Errors generated by the API
 */
class ApiError extends Error {
  /**
   * Get the request options
   * @type {Object}
   */

  /**
   * Get the response
   * @type {Response}
   */

  /**
   * Get the request
   * @type {Request}
   */

  /**
   * Error type
   * @type {String}
   */

  /**
   * Http error code
   * @type {Number}
   */

  /**
   * Get the parsed stacktrace from the error
   * @returns {Array<{line: Number, file: String, code: String}>} - Stacktrace
   */

  /**
   * @param {Object} params
   * @param {Object} params.options - Request options
   * @param {Object} params.data - Response data
   * @param {Request} params.request - Request
   * @param {Response} params.response - Response
   */
  constructor({
    options,
    request,
    response,
    data
  }) {
    const {
      type,
      message,
      trace
    } = data.error;
    super(message);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "options", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "response", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "request", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "type", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "status", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "trace", void 0);

    this.options = options;
    this.response = response;
    this.request = request;
    this.type = type;
    this.trace = []; // Only available when the api is in debug mode

    if (typeof trace === 'string') {
      this._trace = ApiError._parseTrace(trace);
    }
  }
  /**
   * Returns if the error contained a stacktrace that has been parsed
   * This should only be true if the API is in debug mode.
   * @returns {boolean} - If the Error contains a stacktrace
   */


  get hasTrace() {
    return this.trace.length > 0;
  }
  /**
   * Display-able string
   * @returns {string} - Displayable error string
   */


  toString() {
    return `[${this.status}] ${this.type}: ${this.message}`;
  }

  static _parseTrace(input) {
    // https://regex101.com/r/64cAbt/1
    const regex = /^#(\d+)\s(?:(.*?)\((\d+)\)|(.*?)):\s(.*?)$/gm;
    const output = [];
    let match; // eslint-disable-next-line no-cond-assign

    while ((match = regex.exec(input)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (match.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      output.push({
        line: match[3],
        file: match[2] || match[4],
        code: match[5]
      });
    }

    return output;
  }

}

/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Contract)
/* harmony export */ });
/* harmony import */ var _base_CrudBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Contract resource
 */

class Contract extends _base_CrudBase__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static get resourceName() {
    return 'contracts';
  }

}

/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Domain)
/* harmony export */ });
/* harmony import */ var _base_CrudBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Domain resource
 */

class Domain extends _base_CrudBase__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static get resourceName() {
    return 'domains';
  }

}

/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JobRevision)
/* harmony export */ });
/* harmony import */ var _utils_reflection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _base_CrudBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _JobResult__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(53);
/* harmony import */ var _JobShare__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26);
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27);
/* harmony import */ var _RequestParameters__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _utils_requests__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5);
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */









class JobRevision extends _base_CrudBase__WEBPACK_IMPORTED_MODULE_1__["default"] {
  get baseUrl() {
    return `${this._api.url}/jobs/${this.jobId}/revisions`;
  }

  static get resourcePath() {
    return '/jobs/{job_id}/revisions/{revision}';
  }

  static get resourceName() {
    return 'job-revisions';
  }

  static get resourceUrlKey() {
    return 'revision';
  }
  /**
   * Get layers
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get layers() {
    return this._proxyResourceList(_Layer__WEBPACK_IMPORTED_MODULE_4__["default"]);
  }
  /**
   * Get the job result
   * @param {String} [deleted=RequestParameters.deleted] - Determines if the resource should be shown if deleted, requires special resource permissions. Possible values: only, none, all
   * @returns {CancelablePromise<JobResult>} - The associated job result
   * @throws {ApiError} - If the api returns errors
   */


  result(deleted = _RequestParameters__WEBPACK_IMPORTED_MODULE_5__["default"].deleted || _enums__WEBPACK_IMPORTED_MODULE_7__.DeletedState.NONE) {
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_8__.makeCancelable)(async signal => {
      const url = `${this.url}/result?${(0,_utils_requests__WEBPACK_IMPORTED_MODULE_6__.encodeQueryString)({
        deleted
      })}`;
      const {
        data
      } = await this.api.ky.get(url, {
        signal
      }).json();
      data.jobId = this.jobId;
      data.revision = this.revision;
      return new _JobResult__WEBPACK_IMPORTED_MODULE_2__["default"](this.api, data);
    });
  }
  /**
   * Get a result proxy
   *
   * @returns {JobResult} - Empty job result used for
   */


  get resultProxy() {
    const data = {
      jobId: this.jobId,
      revision: this.revision
    };
    return new _JobResult__WEBPACK_IMPORTED_MODULE_2__["default"](this.api, data);
  } // noinspection JSCheckFunctionSignatures

  /**
   * Save updated job revision
   * @param {Object} object - Map object
   * @param {Array<Layer>|Array<Number>|null} layers - Array containing all layers for this revision. If set to null the same layers will be used
   * @param {String} [deleted=RequestParameters.deleted] - Determines if the resource should be shown if deleted, requires special resource permissions. Possible values: only, none, all
   * @returns {CancelablePromise<JobRevision>} - New job revision
   * @throws {TypeError}
   * @throws {ApiError} - If the api returns errors
   */


  save(object = {}, layers = null, deleted = _RequestParameters__WEBPACK_IMPORTED_MODULE_5__["default"].deleted || _enums__WEBPACK_IMPORTED_MODULE_7__.DeletedState.NONE) {
    if (layers && layers.length > 0) {
      if ((0,_utils_reflection__WEBPACK_IMPORTED_MODULE_0__.isParentOf)(_Layer__WEBPACK_IMPORTED_MODULE_4__["default"], layers[0])) {
        layers = layers.map(layer => layer.id);
      } else if (typeof layers[0] !== 'number') {
        throw new TypeError('layers property is not of type Array<Layer>, Array<Number> or null');
      }
    }

    const json = {
      'object': JSON.stringify(object),
      'language_code': this.languageCode,
      'mapstyle_set_id': this.mapstyleSetId,
      'output': this.output
    };

    if (layers) {
      json.layers = layers;
    }

    const url = `${this.baseUrl}?${(0,_utils_requests__WEBPACK_IMPORTED_MODULE_6__.encodeQueryString)({
      deleted
    })}`;
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_8__.makeCancelable)(async signal => {
      const {
        data
      } = await this.api.ky.post(url, {
        json,
        signal
      }).json();
      return new JobRevision(this.api, data);
    });
  }
  /**
   * Get job object
   * @param {String} [deleted=RequestParameters.deleted] - Determines if the resource should be shown if deleted, requires special resource permissions. Possible values: only, none, all
   * @returns {CancelablePromise<Object>} - The map object
   * @throws {ApiError} - If the api returns errors
   */


  object(deleted = _RequestParameters__WEBPACK_IMPORTED_MODULE_5__["default"].deleted || _enums__WEBPACK_IMPORTED_MODULE_7__.DeletedState.NONE) {
    const url = `${this.url}/object?${(0,_utils_requests__WEBPACK_IMPORTED_MODULE_6__.encodeQueryString)({
      deleted
    })}`;
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_8__.makeCancelable)(async signal => {
      const {
        data
      } = await this.api.ky.get(url, {
        signal
      }).json();
      return data;
    });
  }
  /**
   * Build the revision
   * @param {String} callback - Optional callback url for when the job completes
   * @param {String} [deleted=RequestParameters.deleted] - Determines if the resource should be shown if deleted, requires special resource permissions. Possible values: only, none, all
   * @throws {ApiError} - If the api returns errors
   * @returns {CancelablePromise}
   */


  build(callback, deleted = _RequestParameters__WEBPACK_IMPORTED_MODULE_5__["default"].deleted || _enums__WEBPACK_IMPORTED_MODULE_7__.DeletedState.NONE) {
    const url = `${this.url}/build?${(0,_utils_requests__WEBPACK_IMPORTED_MODULE_6__.encodeQueryString)({
      deleted
    })}`;
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_8__.makeCancelable)(async signal => {
      await this.api.ky.post(url, {
        json: {
          callback
        },
        signal
      });
    });
  }
  /**
   * Cancels a running job
   * @param {String} [deleted=RequestParameters.deleted] - Determines if the resource should be shown if deleted, requires special resource permissions. Possible values: only, none, all
   * @returns {CancelablePromise}
   * @throws {ApiError} - If the api returns errors
   */


  cancel(deleted = _RequestParameters__WEBPACK_IMPORTED_MODULE_5__["default"].deleted || _enums__WEBPACK_IMPORTED_MODULE_7__.DeletedState.NONE) {
    const url = `${this.url}/cancel?${(0,_utils_requests__WEBPACK_IMPORTED_MODULE_6__.encodeQueryString)({
      deleted
    })}`;
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_8__.makeCancelable)(async signal => {
      await this.api.ky.post(url, {
        signal
      });
    });
  } // noinspection JSCheckFunctionSignatures

  /**
   * Clones a job revision to the user requesting it
   * @param {String} [title=null] - The new title for the job
   * @param {String} [deleted=RequestParameters.deleted] - Determines if the resource should be shown if deleted, requires special resource permissions. Possible values: only, none, all
   * @throws {ApiError} - If the api returns errors
   * @returns {CancelablePromise<JobRevision>} - The new job revision, which will be linked to a new job
   */


  clone(title = null, deleted = _RequestParameters__WEBPACK_IMPORTED_MODULE_5__["default"].deleted || _enums__WEBPACK_IMPORTED_MODULE_7__.DeletedState.NONE) {
    const url = `${this.url}/clone?${(0,_utils_requests__WEBPACK_IMPORTED_MODULE_6__.encodeQueryString)({
      deleted
    })}`;
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_8__.makeCancelable)(async signal => {
      const {
        data
      } = await this.api.ky.post(url, {
        json: {
          title
        },
        signal
      }).json();
      return new JobRevision(this.api, data);
    });
  }

}

/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mapstyle)
/* harmony export */ });
/* harmony import */ var _traits_HandlesImages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(54);
/* harmony import */ var _utils_reflection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _base_CrudSetItemBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * @extends CrudSetItemBase
 * @mixes HandlesImages
 */

class Mapstyle extends (0,_utils_reflection__WEBPACK_IMPORTED_MODULE_1__.mix)(_base_CrudSetItemBase__WEBPACK_IMPORTED_MODULE_2__["default"], _traits_HandlesImages__WEBPACK_IMPORTED_MODULE_0__["default"]) {
  static get resourceName() {
    return 'mapstyles';
  }

}

/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Language)
/* harmony export */ });
/* harmony import */ var _base_CrudBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class Language extends _base_CrudBase__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static get resourceName() {
    return 'languages';
  }

  static get resourcePath() {
    return `/${this.resourceName}/{code}`;
  }

  toString() {
    return `${this.constructor.name}(${this.code})`;
  }

  static get resourceUrlKey() {
    return 'code';
  }

}

/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Notification)
/* harmony export */ });
/* harmony import */ var _base_CrudBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class Notification extends _base_CrudBase__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static get resourceName() {
    return 'notifications';
  }

}

/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Role)
/* harmony export */ });
/* harmony import */ var _proxy_OwnedResourceProxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _base_CrudBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _Permission__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(59);
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(58);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */




class Role extends _base_CrudBase__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * Get the list permissions linked to the role
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */
  get permissions() {
    return new _proxy_OwnedResourceProxy__WEBPACK_IMPORTED_MODULE_0__["default"](this.api, this, _Permission__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }
  /**
   * Get the list users linked to the role
   * @returns {SimpleResourceProxy} - A proxy for accessing the resource
   */


  get users() {
    return new _proxy_OwnedResourceProxy__WEBPACK_IMPORTED_MODULE_0__["default"](this.api, this, _User__WEBPACK_IMPORTED_MODULE_3__["default"]);
  }

  static get resourceName() {
    return 'roles';
  }

}

/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LayerGroup)
/* harmony export */ });
/* harmony import */ var _traits_OwnableResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _utils_reflection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27);
/* harmony import */ var _base_CrudSetBase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var _proxy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(75);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */





/**
 * LayerGroup
 * @extends CrudBase
 * @mixes OwnableResource
 * @mixes HandlesImages
 */

class LayerGroup extends (0,_utils_reflection__WEBPACK_IMPORTED_MODULE_1__.mix)(_base_CrudSetBase__WEBPACK_IMPORTED_MODULE_3__["default"], _traits_OwnableResource__WEBPACK_IMPORTED_MODULE_0__["default"]) {
  static get resourceName() {
    return 'layer-groups';
  }

  get items() {
    return new _proxy__WEBPACK_IMPORTED_MODULE_4__.OwnedResourceProxy(this.api, this, this._Child);
  }

  get _Child() {
    return _Layer__WEBPACK_IMPORTED_MODULE_2__["default"];
  }

}

/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GeoResourceProxy": () => (/* reexport safe */ _GeoResourceProxy__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "OrganisationProxy": () => (/* reexport safe */ _OrganisationProxy__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "OwnedResourceProxy": () => (/* reexport safe */ _OwnedResourceProxy__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "ResourceProxy": () => (/* reexport safe */ _ResourceProxy__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "SimpleResourceProxy": () => (/* reexport safe */ _SimpleResourceProxy__WEBPACK_IMPORTED_MODULE_4__["default"])
/* harmony export */ });
/* harmony import */ var _GeoResourceProxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43);
/* harmony import */ var _OrganisationProxy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34);
/* harmony import */ var _OwnedResourceProxy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _ResourceProxy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var _SimpleResourceProxy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */






/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DummyFlow)
/* harmony export */ });
/* harmony import */ var _errors_OAuthError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _OAuth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * Dummy flow for when the token should be available in the
 * cache and no attempt at authentication should be made.
 */

class DummyFlow extends _OAuth__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * @param {String} [clientId=] - OAuth client id
   * @param {Array<String>} scopes - A list of required scopes
   */
  constructor(clientId = '', scopes = ['*']) {
    super(clientId, scopes);
  }
  /**
   * Authenticate
   * @returns {Promise<OAuthToken>} - token
   * @throws {OAuthError}
   */


  authenticate() {
    return new Promise((resolve, reject) => {
      if (this.authenticated) {
        resolve(this.token);
      } else {
        reject(new _errors_OAuthError__WEBPACK_IMPORTED_MODULE_0__["default"]('dummy_error', 'Attempted authentication using a dummy authenticator'));
      }
    });
  }

}

/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResourceLister)
/* harmony export */ });
/* harmony import */ var case__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var case__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(case__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Mapcreator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _RequestParameters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _resources_base_ResourceBase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);
/* harmony import */ var _utils_reflection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(0);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1);
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */







/**
 * Paginated resource lister
 *
 * @fires ResourceLister#update
 */

class ResourceLister extends events__WEBPACK_IMPORTED_MODULE_1__.EventEmitter {
  /**
   * ResourceLister constructor
   *
   * @param {Mapcreator} api - Api instance
   * @param {string} route - Resource url route
   * @param {Class<ResourceBase>} Resource - Resource constructor
   * @param {?RequestParameters} parameters - Request parameters
   * @param {number} [maxRows=50] - Initial max rows
   * @param {string} [key=id] - Key
   */
  constructor(api, route, Resource = _resources_base_ResourceBase__WEBPACK_IMPORTED_MODULE_4__["default"], parameters = null, maxRows = 50, key = 'id') {
    super();

    if (!(0,_utils_reflection__WEBPACK_IMPORTED_MODULE_5__.isParentOf)(_Mapcreator__WEBPACK_IMPORTED_MODULE_2__["default"], api)) {
      throw new TypeError('Expected api to be of type Mapcreator');
    }

    this._api = api;
    this._Resource = Resource;
    this._route = route || new this.Resource(api, {}).baseUrl;
    this._parameters = new _RequestParameters__WEBPACK_IMPORTED_MODULE_3__["default"](parameters || {
      perPage: _RequestParameters__WEBPACK_IMPORTED_MODULE_3__["default"].maxPerPage
    });
    this._key = (0,case__WEBPACK_IMPORTED_MODULE_0__.snake)(key);
    this._waiting = false;
    this.autoUpdate = true;
    this.maxRows = maxRows;

    this._reset();
  }
  /**
   * Get if there are more resources to fetch. It indicates if the maxRows can be increased.
   * @returns {boolean} - if more rows are available
   */


  get hasMore() {
    return typeof this.availableRows === 'undefined' || this.availableRows > this.maxRows;
  }
  /**
   * Get if the instance is waiting for data
   * @returns {boolean} - waiting for data
   */


  get waiting() {
    return this._waiting;
  }
  /**
   * Get the request parameters
   * @returns {RequestParameters} - parameters
   */


  get parameters() {
    return this._parameters;
  }
  /**
   * Set the request parameters
   *
   * If you set {@link ResourceLister#autoUpdate} to true then {@link ResourceLister#update}
   * will automatically be called when the parameters are updated.
   * @throws {ResourceLister#autoUpdate}
   * @param {RequestParameters} object - parameters
   */


  set parameters(object) {
    this.parameters.apply(object);
  }
  /**
   * Resource constructor accessor, used for building the resource instance
   * @returns {Class<ResourceBase>} - resource constructor
   */


  get Resource() {
    return this._Resource;
  }
  /**
   * Get the route (url)
   * @returns {string} - route
   */


  get route() {
    return this._route;
  }
  /**
   * Get the data
   * @returns {Array<ResourceLister.Resource>} - data
   */


  get data() {
    return this._data;
  }
  /**
   * Get the api instance
   * @returns {Mapcreator} - Api instance
   */


  get api() {
    return this._api;
  }
  /**
   * Get the row count
   *
   * @see {ResourceLister.data}
   * @returns {number} - row count
   */


  get rowCount() {
    return this.data.length;
  }
  /**
   * Get the maximum amount of rows allowed
   * @returns {number} - max rows
   */


  get maxRows() {
    return this._maxRows;
  }
  /**
   * Set the maximum amount of rows allowed
   * @param {number} value - max rows
   */


  set maxRows(value) {
    value = Number(value);

    if (Number.isNaN(value)) {
      throw new TypeError(`Expected maxRows to be numeric got ${typeof raw}`);
    }

    this._maxRows = value;

    if (this.autoUpdate) {
      // noinspection JSIgnoredPromiseFromCall
      this.update();
    }
  }
  /**
   * Get the number of rows the server has available
   * @returns {number} - number of rows
   */


  get availableRows() {
    return this._availableRows;
  }
  /**
   * Set if {@link ResourceLister#update} should be called when {@link ResourceLister#parameters} is updated
   *
   * @throws {ResourceLister#update}
   * @throws {ResourceLister#parameters}
   * @param {boolean} value - auto update
   */


  set autoUpdate(value) {
    value = Boolean(value);

    if (this.autoUpdate !== value) {
      this._autoUpdate = value;

      if (typeof this._boundUpdate === 'undefined') {
        this._boundUpdate = this.update.bind(this);
      }

      if (this.autoUpdate) {
        this.parameters.on('change', this._boundUpdate);
      } else {
        this.parameters.off('change', this._boundUpdate);
      }
    }
  }
  /**
   * Get if {@link ResourceLister#update} should be called when {@link ResourceLister#parameters} is updated
   *
   * @throws {ResourceLister#update}
   * @throws {ResourceLister#parameters}
   */


  get autoUpdate() {
    return this._autoUpdate;
  }
  /**
   * Reset the instance
   *
   * @private
   */


  _reset() {
    this._parameterToken = this.parameters.token();
    this._realData = [];
    this._data = [];
    this._keys = [];
    delete this._availableRows;
  }
  /**
   * Update the server data
   */


  async update() {
    if (this.waiting) {
      return;
    }

    this._waiting = true;

    try {
      if (this._parameterToken !== this.parameters.token()) {
        this._reset();
      }

      if (this._realData.length < this.maxRows) {
        try {
          await this._fetchMore();
        } catch (e) {
          this.autoUpdate = false;
          this.emit('error', e);
          throw e;
        }
      }

      if (this.data.length !== this.maxRows) {
        this._data = this._realData.slice(0, this.maxRows);
      }
    } finally {
      this._waiting = false;
    }
    /**
     * Update event.
     * Called when the ResourceLister has updated
     *
     * @event RequestLister#update
     */


    this.emit('update');
  }
  /**
   * Fetch more data from the server
   * @private
   * @returns {CancelablePromise}
   * @throws {ApiError} - If the api returns errors
   */


  _fetchMore() {
    const glue = this.route.includes('?') ? '&' : '?';
    const parameters = this.parameters.copy();
    parameters.offset += this.rowCount;
    const endPage = Math.ceil((this.maxRows - this.rowCount) / this.parameters.perPage);
    const promises = [];
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_6__.makeCancelable)(async signal => {
      for (; parameters.page <= endPage; parameters.page++) {
        const url = this.route + glue + parameters.encode();
        const promise = this.api.ky.get(url, {
          signal
        });
        promises.push(promise);
      }

      const responses = await Promise.all(promises);

      for (const response of responses) {
        const {
          data
        } = await response.json();
        data.forEach(row => this.push(row, false));
        this._availableRows = Number(response.headers.get('x-paginate-total')) + parameters.offset;
      }
    });
  }
  /**
   * Returns the iterable
   * @returns {Iterator} - iterator
   */


  [Symbol.iterator]() {
    return this.data[Symbol.iterator]();
  }
  /**
   * Push a row to the data collection
   *
   * This will append the row or update an existing row based on the key. If
   * autoMaxRows is set to true and maxRows only needs to be increased by one
   * for the new resource to show up it will
   * @param {ResourceLister.Resource} row - resource
   * @param {boolean} autoMaxRows - Increase maxRows if needed
   */


  push(row, autoMaxRows = true) {
    if (!(0,_utils_reflection__WEBPACK_IMPORTED_MODULE_5__.isParentOf)(this.Resource, row)) {
      row = new this.Resource(this.api, row);
    }

    const index = this._keys.findIndex(i => i === row[this._key]);

    if (index >= 0) {
      this._realData[index] = row;

      if (typeof this._data[index] !== 'undefined') {
        this._data[index] = row;
      }
    } else {
      this._realData.push(row);

      this._keys.push(row[this._key]);

      if (autoMaxRows) {
        this.maxRows++;

        this._data.push(row);
      }
    }
  }
  /**
   * Same as `this.maxRows += this.parameters.perPage`
   * @param {number} [rows=parameters.perPage] - Amount to increment maxRows with
   */


  loadMore(rows = this.parameters.perPage) {
    this.maxRows += rows;
  }

}

/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ValidationError)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ApiError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66);


/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Contains schema errors.
 * Normally thrown when a job object is invalid.
 *
 * @typedef {Object} SchemaError
 * @property {string} property - json property
 * @property {string} pointer - json pointer
 * @property {string} message - error message
 * @property {number} context -
 * @property {Object} constraint -
 * @property {Object<string, string>} constraint.params -
 * @property {string} constraint.name -
 * @see https://github.com/justinrainbow/json-schema
 * @example
 * {
 *   property: "data.meta",
 *   pointer: "/data/meta",
 *   message: "The property meta is required",
 *   constraint: {
 *     name: "required",
 *     params: {
 *       property: "meta"
 *     }
 *   },
 *   context: 1
 * }
 */

/**
 * Extension of {@link ApiError} containing an extra field for validation errors
 */

class ValidationError extends _ApiError__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * Any validation errors
   * @type {Object.<String, Array<String>>} - Object containing arrays of validation errors where the field is stored in the key
   */

  /**
   * Get the schema errors if available
   * @type {SchemaError[]} - Array containing schema errors
   * @see {@link hasSchemaErrors}
   * @example
   * [
   *   {
   *     "property": "data.meta",
   *     "pointer": "/data/meta",
   *     "message": "The property meta is required",
   *     "constraint": {
   *       "name": "required",
   *       "params": {
   *         "property": "meta"
   *       }
   *     },
   *     "context": 1
   *   },
   *    {
   *     "property": "data.paper",
   *     "pointer": "/data/paper",
   *     "message": "The property paper is required",
   *     "constraint": {
   *       "name": "required",
   *       "params": {
   *         "property": "paper"
   *       }
   *     },
   *     "context": 1
   *   },
   *    {
   *     "property": "data.scaleDefinition",
   *     "pointer": "/data/scaleDefinition",
   *     "message": "The property scaleDefinition is required",
   *     "constraint": {
   *       "name": "required",
   *       "params": {
   *         "property": "scaleDefinition"
   *       }
   *     },
   *     "context": 1
   *   }
   * ]
   */

  /**
   * @param {Object} params
   * @param {Object} params.options - Request options
   * @param {Object} params.data - Response data
   * @param {Request} params.request - Request
   * @param {Response} params.response - Response
   */
  constructor({
    options,
    request,
    response,
    data
  }) {
    super({
      options,
      request,
      response,
      data
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "validationErrors", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "schemaErrors", void 0);

    const schemaErrors = data.error['schema_errors'];
    this.validationErrors = data.error['validation_errors'];
    this.schemaErrors = Array.isArray(schemaErrors) ? schemaErrors : [];
  }
  /**
   * True if the error contains schema errors
   * @return {boolean} - Has schema errors
   */


  get hasSchemaErrors() {
    return this.schemaErrors.length > 0;
  }
  /**
   * Get validation error messages
   * @returns {Array<String>} - All validation messages
   */


  get messages() {
    const out = [];

    for (const key of Object.keys(this.validationErrors)) {
      out.push(...this.validationErrors[key]);
    }

    return out;
  }
  /**
   * @inheritDoc
   */


  toString() {
    return `There were some validation errors: ${this.messages.join(', ')}`;
  }

}

/***/ })
/******/ 	]);
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "AbstractClassError": () => (/* reexport */ AbstractError.AbstractClassError),
  "AbstractError": () => (/* reexport */ AbstractError.AbstractError),
  "AbstractMethodError": () => (/* reexport */ AbstractError.AbstractMethodError),
  "ApiError": () => (/* reexport */ ApiError["default"]),
  "DeletedState": () => (/* reexport */ enums.DeletedState),
  "DummyFlow": () => (/* reexport */ DummyFlow["default"]),
  "Enum": () => (/* reexport */ Enum["default"]),
  "ImplicitFlow": () => (/* reexport */ ImplicitFlow),
  "ImplicitFlowPopup": () => (/* reexport */ ImplicitFlowPopup),
  "Mapcreator": () => (/* reexport */ Mapcreator["default"]),
  "OAuth": () => (/* reexport */ OAuth["default"]),
  "OAuthToken": () => (/* reexport */ OAuthToken["default"]),
  "PasswordFlow": () => (/* reexport */ PasswordFlow),
  "RequestParameters": () => (/* reexport */ RequestParameters["default"]),
  "ResourceLister": () => (/* reexport */ ResourceLister["default"]),
  "ResultStatus": () => (/* reexport */ enums.ResultStatus),
  "StaticClassError": () => (/* reexport */ StaticClassError["default"]),
  "StorageManager": () => (/* reexport */ StorageManager["default"]),
  "ValidationError": () => (/* reexport */ ValidationError["default"]),
  "errors": () => (/* reexport */ errors),
  "geo": () => (/* reexport */ geo),
  "helpers": () => (/* reexport */ helpers),
  "proxies": () => (/* reexport */ proxy),
  "resources": () => (/* reexport */ resources),
  "version": () => (/* binding */ version)
});

// EXTERNAL MODULE: ./src/Mapcreator.js + 1 modules
var Mapcreator = __webpack_require__(16);
// EXTERNAL MODULE: ./src/RequestParameters.js
var RequestParameters = __webpack_require__(8);
// EXTERNAL MODULE: ./src/storage/StorageManager.js + 3 modules
var StorageManager = __webpack_require__(22);
// EXTERNAL MODULE: ./src/enums/Enum.js + 1 modules
var Enum = __webpack_require__(11);
// EXTERNAL MODULE: ./src/enums/index.js + 3 modules
var enums = __webpack_require__(7);
// EXTERNAL MODULE: ./src/oauth/OAuth.js
var OAuth = __webpack_require__(18);
// EXTERNAL MODULE: ./src/oauth/OAuthToken.js
var OAuthToken = __webpack_require__(13);
// EXTERNAL MODULE: ./src/oauth/StateContainer.js + 1 modules
var StateContainer = __webpack_require__(42);
// EXTERNAL MODULE: ./src/utils/requests.js
var requests = __webpack_require__(5);
// EXTERNAL MODULE: ./src/errors/OAuthError.js
var OAuthError = __webpack_require__(17);
// EXTERNAL MODULE: ./src/utils/node.js
var node = __webpack_require__(9);
// EXTERNAL MODULE: ./node_modules/case/dist/Case.js
var Case = __webpack_require__(4);
;// CONCATENATED MODULE: ./src/oauth/ImplicitFlow.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */







/**
 * Implicit OAuth flow using redirection
 */

class ImplicitFlow extends OAuth["default"] {
  /**
   * Implicit authentication flow
   * @param {String} clientId - OAuth client id
   * @param {String} callbackUrl - callbackUrl for obtaining the token. This should be a
   *                               page with this script on it. If left empty the current
   *                               url will be used.
   * @param {Array<String>} scopes - A list of required scopes
   * @param {Boolean} useState - use state verification
   */
  constructor(clientId, callbackUrl = '', scopes = ['*'], useState = true) {
    super(clientId, scopes);

    if ((0,node.isNode)()) {
      throw new Error(`${this.constructor.name} can't be used under nodejs`);
    }

    this.path = '/oauth/authorize';
    this.callbackUrl = callbackUrl;
    this.useState = useState;

    if (!this.callbackUrl) {
      // Drop the anchor (if any)
      this.callbackUrl = window.location.toString().split('#')[0];
    }

    this._anchorParams = ['access_token', 'token_type', 'expires_in'];

    if (this.useState) {
      this._anchorParams.push('state');
    }

    if (this._anchorContainsOAuthResponse()) {
      const anchorParams = this._getOAuthAnchorParams();

      this._cleanAnchorParams();

      if (this.useState && !StateContainer["default"].validate(anchorParams.state)) {
        throw Error('Invalid state in url');
      } else {
        this.token = OAuthToken["default"].fromResponseObject(anchorParams);
      }
    }
  }
  /**
   * @inheritDoc
   */


  authenticate() {
    return new Promise((resolve, reject) => {
      if (this.authenticated) {
        resolve(this.token);
      } else if (this._anchorContainsError()) {
        const err = this._getError();

        this._cleanAnchorParams();

        reject(err);
      } else {
        window.location = this._buildRedirectUrl();
      }
    });
  }
  /**
   * Builds the url for redirection
   * @returns {String} - Redirect url
   * @protected
   */


  _buildRedirectUrl() {
    const queryParams = {
      'client_id': this.clientId,
      'redirect_uri': this.callbackUrl,
      'response_type': 'token',
      'scope': this.scopes.join(' ')
    };

    if (this.useState) {
      queryParams.state = StateContainer["default"].generate();
    }

    return `${this.host + this.path}?${(0,requests.encodeQueryString)(queryParams)}`;
  }
  /**
   * Builds an object containing all the anchor parameters
   * @param {String} query - Url hash
   * @returns {Object<String, String>} - Anchor parameters
   * @protected
   */


  _getAnchorParams(query = window.location.hash) {
    const out = {};
    query = query.replace(/^#\/?/g, '');

    for (const raw of query.split('&')) {
      const pair = raw.split('=').map(decodeURIComponent);
      out[pair[0]] = pair[1];
    }

    return out;
  }
  /**
   * Fetch OAuth anchor params
   * @param {Object<String, String>} query - Optional override for the query to analyse, defaults to {@link ImplicitFlow#_getAnchorParams}
   * @returns {Object<String, String>} - List of OAuth anchor parameters
   * @protected
   */


  _getOAuthAnchorParams(query = this._getAnchorParams()) {
    return Object.keys(query).filter(key => this._anchorParams.includes(key)).reduce((obj, key) => {
      obj[key] = query[key];
      return obj;
    }, {});
  }
  /**
   * Remove OAuth related anchor parameters
   * @protected
   */


  _cleanAnchorParams() {
    const anchorParams = this._getAnchorParams();

    const targets = this._anchorParams; // Just in case

    targets.push('state', 'error');

    for (const key of targets) {
      // Should silently fail when key doesn't exist
      delete anchorParams[key];
    }

    window.location.hash = (0,requests.encodeQueryString)(anchorParams);
  }
  /**
   * Test if the anchor contains an OAuth response
   * @returns {Boolean} - If anchor tested positive for containing an OAuth response
   * @protected
   */


  _anchorContainsOAuthResponse() {
    const queryKeys = Object.keys(this._getOAuthAnchorParams()); // Check if all the params are in the anchor

    return this._anchorParams.reduce((output, key) => output && queryKeys.includes(key), true);
  }
  /**
   * Test if the anchor contains an OAuth error
   * @returns {Boolean} - If anchor tested positive for containing an OAuth error
   * @protected
   */


  _anchorContainsError() {
    return Boolean(this._getAnchorParams().error);
  }
  /**
   * Get and return the error in the anchor
   * @returns {OAuthError} - OAuthError object
   * @protected
   */


  _getError() {
    if (!this._anchorContainsError()) {
      throw Error('No OAuthError found in anchor');
    }

    const params = this._getAnchorParams();

    if (params.message) {
      return new OAuthError["default"](params.error, params.message);
    }

    return new OAuthError["default"](params.error, (0,Case.title)(params.error));
  }

}
;// CONCATENATED MODULE: ./src/oauth/ImplicitFlowPopup.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * Implicit OAuth flow using a pop-up.
 */

class ImplicitFlowPopup extends ImplicitFlow {
  /**
   * Implicit pop-up authentication flow
   * @param {String} clientId - OAuth client id
   * @param {String} callbackUrl - callbackUrl for obtaining the token. This should be a
   *                               page with this script on it. If left empty the current
   *                               url will be used.
   * @param {Array<String>} scopes - A list of required scopes
   * @param {Boolean} useState - use state verification
   * @param {String} windowOptions - optional window options for the pop-up window
   */
  constructor(clientId, callbackUrl = '', scopes = ['*'], useState = false, windowOptions = "width=800, height=600") {
    super(clientId, callbackUrl, scopes, useState);
    this.windowOptions = windowOptions;

    if (window.name === ImplicitFlowPopup.popupWindowName) {
      throw new Error('We\'re a flow popup');
    }
  }
  /**
   * Popup window name
   * @returns {String} - window.name of the created pop-up
   * @constant
   */


  static get popupWindowName() {
    return 'm4n_api_auth';
  }
  /**
   * @inheritDoc
   */


  authenticate() {
    if (window.name === ImplicitFlowPopup.popupWindowName) {
      return new Promise(() => {});
    } // Should be super.super.authenticate() :/


    if (this.authenticated) {
      return new Promise(resolve => {
        resolve(this.token);
      });
    }

    return new Promise((resolve, reject) => {
      const popup = window.open(this._buildRedirectUrl(), ImplicitFlowPopup.popupWindowName, this.windowOptions);
      const ticker = setInterval(() => {
        if (popup.closed) {
          reject(new OAuthError["default"]('window_closed', 'Pop-up window was closed before data could be extracted'));
        }

        let done = false;

        try {
          done = !['', 'about:blank'].includes(popup.location.href);
        } catch (e) {// Nothing
        }

        if (done) {
          clearInterval(ticker);

          const data = this._getAnchorParams(popup.location.hash);

          popup.close();

          if (data.error) {
            reject(new OAuthError["default"](data.error, data.message));
          } else {
            resolve(this.token = OAuthToken["default"].fromResponseObject(data));
          }
        }
      }, 250);
    });
  }

}
// EXTERNAL MODULE: ./node_modules/ky-universal/browser.js + 1 modules
var browser = __webpack_require__(30);
// EXTERNAL MODULE: ./src/utils/helpers.js
var helpers = __webpack_require__(1);
;// CONCATENATED MODULE: ./src/oauth/PasswordFlow.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */






/**
 * Password authentication flow
 */

class PasswordFlow extends OAuth["default"] {
  /**
   * @param {string} clientId - OAuth client id
   * @param {string} secret - OAuth secret
   * @param {string} username - Valid username (email)
   * @param {string} password - Valid password
   * @param {Array<string>} scopes - A list of required scopes
   */
  constructor(clientId, secret, username, password, scopes = ['*']) {
    super(clientId, scopes);
    this._secret = secret;
    this._username = username;
    this._password = password;
    this._path = '/oauth/token'; // Because the client requires a secret HTTPS is highly recommended

    if (!(0,node.isNode)()) {
      console.warn('Using PasswordFlow in the browser is unrecommended');

      if (window.location.protocol !== 'https:') {
        console.warn('Page was not loaded using https. You\'re most likely leaking secrets right now');
      }
    }
  }
  /**
   * it's a secret :o (client secret)
   * @returns {String} - secret
   */


  get secret() {
    return this._secret;
  }
  /**
   * Set client secret
   * @param {String} value - secret
   */


  set secret(value) {
    this._secret = value;
  }
  /**
   * Get the username for authentication
   * @returns {String} - Username (email)
   */


  get username() {
    return this._username;
  }
  /**
   * Get the username for authentication
   * @param {String} value - Username (email)
   */


  set username(value) {
    this._username = value;
  }
  /**
   * Get the password
   * @returns {String} - Password
   */


  get password() {
    return this._password;
  }
  /**
   * Set the password
   * @param {String} value - password
   */


  set password(value) {
    this._password = value;
  }
  /**
   * OAuth path
   * @returns {String} - OAuth path
   */


  get path() {
    return this._path;
  }
  /**
   * OAuth path
   * @param {String} value - OAuth path
   */


  set path(value) {
    this._path = value;
  }
  /**
   * Authenticate
   * @returns {CancelablePromise<OAuthToken>} - Response token
   * @throws {OAuthError}
   */


  authenticate() {
    const url = this.host + this.path;
    const json = {
      'grant_type': 'password',
      'client_id': this.clientId,
      'client_secret': this._secret,
      'username': this.username,
      'password': this.password,
      'scope': this.scopes.join(' ')
    };
    return (0,helpers.makeCancelable)(async signal => {
      const data = await browser["default"].post(url, {
        json,
        signal
      }).json();

      if (data.error) {
        throw new OAuthError["default"](data.error, data.message);
      }

      this.token = OAuthToken["default"].fromResponseObject(data);
      this.token.scopes = this.scopes;
      return this.token;
    });
  }

}
// EXTERNAL MODULE: ./src/oauth/DummyFlow.js
var DummyFlow = __webpack_require__(76);
// EXTERNAL MODULE: ./src/errors/ApiError.js
var ApiError = __webpack_require__(66);
// EXTERNAL MODULE: ./src/errors/AbstractError.js
var AbstractError = __webpack_require__(21);
// EXTERNAL MODULE: ./src/errors/ValidationError.js
var ValidationError = __webpack_require__(78);
// EXTERNAL MODULE: ./src/errors/StaticClassError.js
var StaticClassError = __webpack_require__(62);
// EXTERNAL MODULE: ./src/resources/index.js + 10 modules
var resources = __webpack_require__(37);
// EXTERNAL MODULE: ./src/ResourceLister.js
var ResourceLister = __webpack_require__(77);
// EXTERNAL MODULE: ./src/utils/geo.js
var geo = __webpack_require__(64);
// EXTERNAL MODULE: ./src/errors/index.js + 1 modules
var errors = __webpack_require__(35);
// EXTERNAL MODULE: ./src/proxy/index.js
var proxy = __webpack_require__(75);
;// CONCATENATED MODULE: ./src/index.js
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, Mapcreator
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
// Core


 // Enums


 // Flows






 // Exceptions




 // Resources


 // Helpers





 // Errors


 // Proxies



/**
 * Package version
 * @private
 */

const version = "v3.2.0";
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.browser.js.map