(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vega'), require('vega-lite')) :
    typeof define === 'function' && define.amd ? define(['vega', 'vega-lite'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.vegaEmbed = factory(global.vega, global.vegaLite));
})(this, (function (vegaImport, vegaLiteImport) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var vegaImport__namespace = /*#__PURE__*/_interopNamespace(vegaImport);
    var vegaLiteImport__namespace = /*#__PURE__*/_interopNamespace(vegaLiteImport);

    /*!
     * https://github.com/Starcounter-Jack/JSON-Patch
     * (c) 2017 Joachim Wester
     * MIT license
     */
    var __extends = undefined && undefined.__extends || function () {
      var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };

        return extendStatics(d, b);
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    function hasOwnProperty(obj, key) {
      return _hasOwnProperty.call(obj, key);
    }
    function _objectKeys(obj) {
      if (Array.isArray(obj)) {
        var keys = new Array(obj.length);

        for (var k = 0; k < keys.length; k++) {
          keys[k] = "" + k;
        }

        return keys;
      }

      if (Object.keys) {
        return Object.keys(obj);
      }

      var keys = [];

      for (var i in obj) {
        if (hasOwnProperty(obj, i)) {
          keys.push(i);
        }
      }

      return keys;
    }
    /**
    * Deeply clone the object.
    * https://jsperf.com/deep-copy-vs-json-stringify-json-parse/25 (recursiveDeepCopy)
    * @param  {any} obj value to clone
    * @return {any} cloned obj
    */

    function _deepClone(obj) {
      switch (typeof obj) {
        case "object":
          return JSON.parse(JSON.stringify(obj));
        //Faster than ES5 clone - http://jsperf.com/deep-cloning-of-objects/5

        case "undefined":
          return null;
        //this is how JSON.stringify behaves for array items

        default:
          return obj;
        //no need to clone primitives
      }
    } //3x faster than cached /^\d+$/.test(str)

    function isInteger(str) {
      var i = 0;
      var len = str.length;
      var charCode;

      while (i < len) {
        charCode = str.charCodeAt(i);

        if (charCode >= 48 && charCode <= 57) {
          i++;
          continue;
        }

        return false;
      }

      return true;
    }
    /**
    * Escapes a json pointer path
    * @param path The raw pointer
    * @return the Escaped path
    */

    function escapePathComponent(path) {
      if (path.indexOf('/') === -1 && path.indexOf('~') === -1) return path;
      return path.replace(/~/g, '~0').replace(/\//g, '~1');
    }
    /**
     * Unescapes a json pointer path
     * @param path The escaped pointer
     * @return The unescaped path
     */

    function unescapePathComponent(path) {
      return path.replace(/~1/g, '/').replace(/~0/g, '~');
    }
    /**
    * Recursively checks whether an object has any undefined values inside.
    */

    function hasUndefined(obj) {
      if (obj === undefined) {
        return true;
      }

      if (obj) {
        if (Array.isArray(obj)) {
          for (var i = 0, len = obj.length; i < len; i++) {
            if (hasUndefined(obj[i])) {
              return true;
            }
          }
        } else if (typeof obj === "object") {
          var objKeys = _objectKeys(obj);

          var objKeysLength = objKeys.length;

          for (var i = 0; i < objKeysLength; i++) {
            if (hasUndefined(obj[objKeys[i]])) {
              return true;
            }
          }
        }
      }

      return false;
    }

    function patchErrorMessageFormatter(message, args) {
      var messageParts = [message];

      for (var key in args) {
        var value = typeof args[key] === 'object' ? JSON.stringify(args[key], null, 2) : args[key]; // pretty print

        if (typeof value !== 'undefined') {
          messageParts.push(key + ": " + value);
        }
      }

      return messageParts.join('\n');
    }

    var PatchError =
    /** @class */
    function (_super) {
      __extends(PatchError, _super);

      function PatchError(message, name, index, operation, tree) {
        var _newTarget = this.constructor;

        var _this = _super.call(this, patchErrorMessageFormatter(message, {
          name: name,
          index: index,
          operation: operation,
          tree: tree
        })) || this;

        _this.name = name;
        _this.index = index;
        _this.operation = operation;
        _this.tree = tree;
        Object.setPrototypeOf(_this, _newTarget.prototype); // restore prototype chain, see https://stackoverflow.com/a/48342359

        _this.message = patchErrorMessageFormatter(message, {
          name: name,
          index: index,
          operation: operation,
          tree: tree
        });
        return _this;
      }

      return PatchError;
    }(Error);

    var JsonPatchError = PatchError;
    var deepClone = _deepClone;
    /* We use a Javascript hash to store each
     function. Each hash entry (property) uses
     the operation identifiers specified in rfc6902.
     In this way, we can map each patch operation
     to its dedicated function in efficient way.
     */

    /* The operations applicable to an object */

    var objOps = {
      add: function (obj, key, document) {
        obj[key] = this.value;
        return {
          newDocument: document
        };
      },
      remove: function (obj, key, document) {
        var removed = obj[key];
        delete obj[key];
        return {
          newDocument: document,
          removed: removed
        };
      },
      replace: function (obj, key, document) {
        var removed = obj[key];
        obj[key] = this.value;
        return {
          newDocument: document,
          removed: removed
        };
      },
      move: function (obj, key, document) {
        /* in case move target overwrites an existing value,
        return the removed value, this can be taxing performance-wise,
        and is potentially unneeded */
        var removed = getValueByPointer(document, this.path);

        if (removed) {
          removed = _deepClone(removed);
        }

        var originalValue = applyOperation(document, {
          op: "remove",
          path: this.from
        }).removed;
        applyOperation(document, {
          op: "add",
          path: this.path,
          value: originalValue
        });
        return {
          newDocument: document,
          removed: removed
        };
      },
      copy: function (obj, key, document) {
        var valueToCopy = getValueByPointer(document, this.from); // enforce copy by value so further operations don't affect source (see issue #177)

        applyOperation(document, {
          op: "add",
          path: this.path,
          value: _deepClone(valueToCopy)
        });
        return {
          newDocument: document
        };
      },
      test: function (obj, key, document) {
        return {
          newDocument: document,
          test: _areEquals(obj[key], this.value)
        };
      },
      _get: function (obj, key, document) {
        this.value = obj[key];
        return {
          newDocument: document
        };
      }
    };
    /* The operations applicable to an array. Many are the same as for the object */

    var arrOps = {
      add: function (arr, i, document) {
        if (isInteger(i)) {
          arr.splice(i, 0, this.value);
        } else {
          // array props
          arr[i] = this.value;
        } // this may be needed when using '-' in an array


        return {
          newDocument: document,
          index: i
        };
      },
      remove: function (arr, i, document) {
        var removedList = arr.splice(i, 1);
        return {
          newDocument: document,
          removed: removedList[0]
        };
      },
      replace: function (arr, i, document) {
        var removed = arr[i];
        arr[i] = this.value;
        return {
          newDocument: document,
          removed: removed
        };
      },
      move: objOps.move,
      copy: objOps.copy,
      test: objOps.test,
      _get: objOps._get
    };
    /**
     * Retrieves a value from a JSON document by a JSON pointer.
     * Returns the value.
     *
     * @param document The document to get the value from
     * @param pointer an escaped JSON pointer
     * @return The retrieved value
     */

    function getValueByPointer(document, pointer) {
      if (pointer == '') {
        return document;
      }

      var getOriginalDestination = {
        op: "_get",
        path: pointer
      };
      applyOperation(document, getOriginalDestination);
      return getOriginalDestination.value;
    }
    /**
     * Apply a single JSON Patch Operation on a JSON document.
     * Returns the {newDocument, result} of the operation.
     * It modifies the `document` and `operation` objects - it gets the values by reference.
     * If you would like to avoid touching your values, clone them:
     * `jsonpatch.applyOperation(document, jsonpatch._deepClone(operation))`.
     *
     * @param document The document to patch
     * @param operation The operation to apply
     * @param validateOperation `false` is without validation, `true` to use default jsonpatch's validation, or you can pass a `validateOperation` callback to be used for validation.
     * @param mutateDocument Whether to mutate the original document or clone it before applying
     * @param banPrototypeModifications Whether to ban modifications to `__proto__`, defaults to `true`.
     * @return `{newDocument, result}` after the operation
     */

    function applyOperation(document, operation, validateOperation, mutateDocument, banPrototypeModifications, index) {
      if (validateOperation === void 0) {
        validateOperation = false;
      }

      if (mutateDocument === void 0) {
        mutateDocument = true;
      }

      if (banPrototypeModifications === void 0) {
        banPrototypeModifications = true;
      }

      if (index === void 0) {
        index = 0;
      }

      if (validateOperation) {
        if (typeof validateOperation == 'function') {
          validateOperation(operation, 0, document, operation.path);
        } else {
          validator(operation, 0);
        }
      }
      /* ROOT OPERATIONS */


      if (operation.path === "") {
        var returnValue = {
          newDocument: document
        };

        if (operation.op === 'add') {
          returnValue.newDocument = operation.value;
          return returnValue;
        } else if (operation.op === 'replace') {
          returnValue.newDocument = operation.value;
          returnValue.removed = document; //document we removed

          return returnValue;
        } else if (operation.op === 'move' || operation.op === 'copy') {
          // it's a move or copy to root
          returnValue.newDocument = getValueByPointer(document, operation.from); // get the value by json-pointer in `from` field

          if (operation.op === 'move') {
            // report removed item
            returnValue.removed = document;
          }

          return returnValue;
        } else if (operation.op === 'test') {
          returnValue.test = _areEquals(document, operation.value);

          if (returnValue.test === false) {
            throw new JsonPatchError("Test operation failed", 'TEST_OPERATION_FAILED', index, operation, document);
          }

          returnValue.newDocument = document;
          return returnValue;
        } else if (operation.op === 'remove') {
          // a remove on root
          returnValue.removed = document;
          returnValue.newDocument = null;
          return returnValue;
        } else if (operation.op === '_get') {
          operation.value = document;
          return returnValue;
        } else {
          /* bad operation */
          if (validateOperation) {
            throw new JsonPatchError('Operation `op` property is not one of operations defined in RFC-6902', 'OPERATION_OP_INVALID', index, operation, document);
          } else {
            return returnValue;
          }
        }
      }
      /* END ROOT OPERATIONS */
      else {
        if (!mutateDocument) {
          document = _deepClone(document);
        }

        var path = operation.path || "";
        var keys = path.split('/');
        var obj = document;
        var t = 1; //skip empty element - http://jsperf.com/to-shift-or-not-to-shift

        var len = keys.length;
        var existingPathFragment = undefined;
        var key = void 0;
        var validateFunction = void 0;

        if (typeof validateOperation == 'function') {
          validateFunction = validateOperation;
        } else {
          validateFunction = validator;
        }

        while (true) {
          key = keys[t];

          if (key && key.indexOf('~') != -1) {
            key = unescapePathComponent(key);
          }

          if (banPrototypeModifications && key == '__proto__') {
            throw new TypeError('JSON-Patch: modifying `__proto__` prop is banned for security reasons, if this was on purpose, please set `banPrototypeModifications` flag false and pass it to this function. More info in fast-json-patch README');
          }

          if (validateOperation) {
            if (existingPathFragment === undefined) {
              if (obj[key] === undefined) {
                existingPathFragment = keys.slice(0, t).join('/');
              } else if (t == len - 1) {
                existingPathFragment = operation.path;
              }

              if (existingPathFragment !== undefined) {
                validateFunction(operation, 0, document, existingPathFragment);
              }
            }
          }

          t++;

          if (Array.isArray(obj)) {
            if (key === '-') {
              key = obj.length;
            } else {
              if (validateOperation && !isInteger(key)) {
                throw new JsonPatchError("Expected an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index", "OPERATION_PATH_ILLEGAL_ARRAY_INDEX", index, operation, document);
              } // only parse key when it's an integer for `arr.prop` to work
              else if (isInteger(key)) {
                key = ~~key;
              }
            }

            if (t >= len) {
              if (validateOperation && operation.op === "add" && key > obj.length) {
                throw new JsonPatchError("The specified index MUST NOT be greater than the number of elements in the array", "OPERATION_VALUE_OUT_OF_BOUNDS", index, operation, document);
              }

              var returnValue = arrOps[operation.op].call(operation, obj, key, document); // Apply patch

              if (returnValue.test === false) {
                throw new JsonPatchError("Test operation failed", 'TEST_OPERATION_FAILED', index, operation, document);
              }

              return returnValue;
            }
          } else {
            if (t >= len) {
              var returnValue = objOps[operation.op].call(operation, obj, key, document); // Apply patch

              if (returnValue.test === false) {
                throw new JsonPatchError("Test operation failed", 'TEST_OPERATION_FAILED', index, operation, document);
              }

              return returnValue;
            }
          }

          obj = obj[key]; // If we have more keys in the path, but the next value isn't a non-null object,
          // throw an OPERATION_PATH_UNRESOLVABLE error instead of iterating again.

          if (validateOperation && t < len && (!obj || typeof obj !== "object")) {
            throw new JsonPatchError('Cannot perform operation at the desired path', 'OPERATION_PATH_UNRESOLVABLE', index, operation, document);
          }
        }
      }
    }
    /**
     * Apply a full JSON Patch array on a JSON document.
     * Returns the {newDocument, result} of the patch.
     * It modifies the `document` object and `patch` - it gets the values by reference.
     * If you would like to avoid touching your values, clone them:
     * `jsonpatch.applyPatch(document, jsonpatch._deepClone(patch))`.
     *
     * @param document The document to patch
     * @param patch The patch to apply
     * @param validateOperation `false` is without validation, `true` to use default jsonpatch's validation, or you can pass a `validateOperation` callback to be used for validation.
     * @param mutateDocument Whether to mutate the original document or clone it before applying
     * @param banPrototypeModifications Whether to ban modifications to `__proto__`, defaults to `true`.
     * @return An array of `{newDocument, result}` after the patch
     */

    function applyPatch(document, patch, validateOperation, mutateDocument, banPrototypeModifications) {
      if (mutateDocument === void 0) {
        mutateDocument = true;
      }

      if (banPrototypeModifications === void 0) {
        banPrototypeModifications = true;
      }

      if (validateOperation) {
        if (!Array.isArray(patch)) {
          throw new JsonPatchError('Patch sequence must be an array', 'SEQUENCE_NOT_AN_ARRAY');
        }
      }

      if (!mutateDocument) {
        document = _deepClone(document);
      }

      var results = new Array(patch.length);

      for (var i = 0, length_1 = patch.length; i < length_1; i++) {
        // we don't need to pass mutateDocument argument because if it was true, we already deep cloned the object, we'll just pass `true`
        results[i] = applyOperation(document, patch[i], validateOperation, true, banPrototypeModifications, i);
        document = results[i].newDocument; // in case root was replaced
      }

      results.newDocument = document;
      return results;
    }
    /**
     * Apply a single JSON Patch Operation on a JSON document.
     * Returns the updated document.
     * Suitable as a reducer.
     *
     * @param document The document to patch
     * @param operation The operation to apply
     * @return The updated document
     */

    function applyReducer(document, operation, index) {
      var operationResult = applyOperation(document, operation);

      if (operationResult.test === false) {
        // failed test
        throw new JsonPatchError("Test operation failed", 'TEST_OPERATION_FAILED', index, operation, document);
      }

      return operationResult.newDocument;
    }
    /**
     * Validates a single operation. Called from `jsonpatch.validate`. Throws `JsonPatchError` in case of an error.
     * @param {object} operation - operation object (patch)
     * @param {number} index - index of operation in the sequence
     * @param {object} [document] - object where the operation is supposed to be applied
     * @param {string} [existingPathFragment] - comes along with `document`
     */

    function validator(operation, index, document, existingPathFragment) {
      if (typeof operation !== 'object' || operation === null || Array.isArray(operation)) {
        throw new JsonPatchError('Operation is not an object', 'OPERATION_NOT_AN_OBJECT', index, operation, document);
      } else if (!objOps[operation.op]) {
        throw new JsonPatchError('Operation `op` property is not one of operations defined in RFC-6902', 'OPERATION_OP_INVALID', index, operation, document);
      } else if (typeof operation.path !== 'string') {
        throw new JsonPatchError('Operation `path` property is not a string', 'OPERATION_PATH_INVALID', index, operation, document);
      } else if (operation.path.indexOf('/') !== 0 && operation.path.length > 0) {
        // paths that aren't empty string should start with "/"
        throw new JsonPatchError('Operation `path` property must start with "/"', 'OPERATION_PATH_INVALID', index, operation, document);
      } else if ((operation.op === 'move' || operation.op === 'copy') && typeof operation.from !== 'string') {
        throw new JsonPatchError('Operation `from` property is not present (applicable in `move` and `copy` operations)', 'OPERATION_FROM_REQUIRED', index, operation, document);
      } else if ((operation.op === 'add' || operation.op === 'replace' || operation.op === 'test') && operation.value === undefined) {
        throw new JsonPatchError('Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)', 'OPERATION_VALUE_REQUIRED', index, operation, document);
      } else if ((operation.op === 'add' || operation.op === 'replace' || operation.op === 'test') && hasUndefined(operation.value)) {
        throw new JsonPatchError('Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)', 'OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED', index, operation, document);
      } else if (document) {
        if (operation.op == "add") {
          var pathLen = operation.path.split("/").length;
          var existingPathLen = existingPathFragment.split("/").length;

          if (pathLen !== existingPathLen + 1 && pathLen !== existingPathLen) {
            throw new JsonPatchError('Cannot perform an `add` operation at the desired path', 'OPERATION_PATH_CANNOT_ADD', index, operation, document);
          }
        } else if (operation.op === 'replace' || operation.op === 'remove' || operation.op === '_get') {
          if (operation.path !== existingPathFragment) {
            throw new JsonPatchError('Cannot perform the operation at a path that does not exist', 'OPERATION_PATH_UNRESOLVABLE', index, operation, document);
          }
        } else if (operation.op === 'move' || operation.op === 'copy') {
          var existingValue = {
            op: "_get",
            path: operation.from,
            value: undefined
          };
          var error = validate([existingValue], document);

          if (error && error.name === 'OPERATION_PATH_UNRESOLVABLE') {
            throw new JsonPatchError('Cannot perform the operation from a path that does not exist', 'OPERATION_FROM_UNRESOLVABLE', index, operation, document);
          }
        }
      }
    }
    /**
     * Validates a sequence of operations. If `document` parameter is provided, the sequence is additionally validated against the object document.
     * If error is encountered, returns a JsonPatchError object
     * @param sequence
     * @param document
     * @returns {JsonPatchError|undefined}
     */

    function validate(sequence, document, externalValidator) {
      try {
        if (!Array.isArray(sequence)) {
          throw new JsonPatchError('Patch sequence must be an array', 'SEQUENCE_NOT_AN_ARRAY');
        }

        if (document) {
          //clone document and sequence so that we can safely try applying operations
          applyPatch(_deepClone(document), _deepClone(sequence), externalValidator || true);
        } else {
          externalValidator = externalValidator || validator;

          for (var i = 0; i < sequence.length; i++) {
            externalValidator(sequence[i], i, document, undefined);
          }
        }
      } catch (e) {
        if (e instanceof JsonPatchError) {
          return e;
        } else {
          throw e;
        }
      }
    } // based on https://github.com/epoberezkin/fast-deep-equal
    // MIT License
    // Copyright (c) 2017 Evgeny Poberezkin
    // Permission is hereby granted, free of charge, to any person obtaining a copy
    // of this software and associated documentation files (the "Software"), to deal
    // in the Software without restriction, including without limitation the rights
    // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    // copies of the Software, and to permit persons to whom the Software is
    // furnished to do so, subject to the following conditions:
    // The above copyright notice and this permission notice shall be included in all
    // copies or substantial portions of the Software.
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    // SOFTWARE.

    function _areEquals(a, b) {
      if (a === b) return true;

      if (a && b && typeof a == 'object' && typeof b == 'object') {
        var arrA = Array.isArray(a),
            arrB = Array.isArray(b),
            i,
            length,
            key;

        if (arrA && arrB) {
          length = a.length;
          if (length != b.length) return false;

          for (i = length; i-- !== 0;) if (!_areEquals(a[i], b[i])) return false;

          return true;
        }

        if (arrA != arrB) return false;
        var keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;

        for (i = length; i-- !== 0;) if (!b.hasOwnProperty(keys[i])) return false;

        for (i = length; i-- !== 0;) {
          key = keys[i];
          if (!_areEquals(a[key], b[key])) return false;
        }

        return true;
      }

      return a !== a && b !== b;
    }

    var core = /*#__PURE__*/Object.freeze({
        __proto__: null,
        JsonPatchError: JsonPatchError,
        deepClone: deepClone,
        getValueByPointer: getValueByPointer,
        applyOperation: applyOperation,
        applyPatch: applyPatch,
        applyReducer: applyReducer,
        validator: validator,
        validate: validate,
        _areEquals: _areEquals
    });

    /*!
     * https://github.com/Starcounter-Jack/JSON-Patch
     * (c) 2017 Joachim Wester
     * MIT license
     */
    var beforeDict = new WeakMap();

    var Mirror =
    /** @class */
    function () {
      function Mirror(obj) {
        this.observers = new Map();
        this.obj = obj;
      }

      return Mirror;
    }();

    var ObserverInfo =
    /** @class */
    function () {
      function ObserverInfo(callback, observer) {
        this.callback = callback;
        this.observer = observer;
      }

      return ObserverInfo;
    }();

    function getMirror(obj) {
      return beforeDict.get(obj);
    }

    function getObserverFromMirror(mirror, callback) {
      return mirror.observers.get(callback);
    }

    function removeObserverFromMirror(mirror, observer) {
      mirror.observers.delete(observer.callback);
    }
    /**
     * Detach an observer from an object
     */


    function unobserve(root, observer) {
      observer.unobserve();
    }
    /**
     * Observes changes made to an object, which can then be retrieved using generate
     */

    function observe(obj, callback) {
      var patches = [];
      var observer;
      var mirror = getMirror(obj);

      if (!mirror) {
        mirror = new Mirror(obj);
        beforeDict.set(obj, mirror);
      } else {
        var observerInfo = getObserverFromMirror(mirror, callback);
        observer = observerInfo && observerInfo.observer;
      }

      if (observer) {
        return observer;
      }

      observer = {};
      mirror.value = _deepClone(obj);

      if (callback) {
        observer.callback = callback;
        observer.next = null;

        var dirtyCheck = function () {
          generate(observer);
        };

        var fastCheck = function () {
          clearTimeout(observer.next);
          observer.next = setTimeout(dirtyCheck);
        };

        if (typeof window !== 'undefined') {
          //not Node
          window.addEventListener('mouseup', fastCheck);
          window.addEventListener('keyup', fastCheck);
          window.addEventListener('mousedown', fastCheck);
          window.addEventListener('keydown', fastCheck);
          window.addEventListener('change', fastCheck);
        }
      }

      observer.patches = patches;
      observer.object = obj;

      observer.unobserve = function () {
        generate(observer);
        clearTimeout(observer.next);
        removeObserverFromMirror(mirror, observer);

        if (typeof window !== 'undefined') {
          window.removeEventListener('mouseup', fastCheck);
          window.removeEventListener('keyup', fastCheck);
          window.removeEventListener('mousedown', fastCheck);
          window.removeEventListener('keydown', fastCheck);
          window.removeEventListener('change', fastCheck);
        }
      };

      mirror.observers.set(callback, new ObserverInfo(callback, observer));
      return observer;
    }
    /**
     * Generate an array of patches from an observer
     */

    function generate(observer, invertible) {
      if (invertible === void 0) {
        invertible = false;
      }

      var mirror = beforeDict.get(observer.object);

      _generate(mirror.value, observer.object, observer.patches, "", invertible);

      if (observer.patches.length) {
        applyPatch(mirror.value, observer.patches);
      }

      var temp = observer.patches;

      if (temp.length > 0) {
        observer.patches = [];

        if (observer.callback) {
          observer.callback(temp);
        }
      }

      return temp;
    } // Dirty check if obj is different from mirror, generate patches and update mirror

    function _generate(mirror, obj, patches, path, invertible) {
      if (obj === mirror) {
        return;
      }

      if (typeof obj.toJSON === "function") {
        obj = obj.toJSON();
      }

      var newKeys = _objectKeys(obj);

      var oldKeys = _objectKeys(mirror);
      var deleted = false; //if ever "move" operation is implemented here, make sure this test runs OK: "should not generate the same patch twice (move)"

      for (var t = oldKeys.length - 1; t >= 0; t--) {
        var key = oldKeys[t];
        var oldVal = mirror[key];

        if (hasOwnProperty(obj, key) && !(obj[key] === undefined && oldVal !== undefined && Array.isArray(obj) === false)) {
          var newVal = obj[key];

          if (typeof oldVal == "object" && oldVal != null && typeof newVal == "object" && newVal != null && Array.isArray(oldVal) === Array.isArray(newVal)) {
            _generate(oldVal, newVal, patches, path + "/" + escapePathComponent(key), invertible);
          } else {
            if (oldVal !== newVal) {

              if (invertible) {
                patches.push({
                  op: "test",
                  path: path + "/" + escapePathComponent(key),
                  value: _deepClone(oldVal)
                });
              }

              patches.push({
                op: "replace",
                path: path + "/" + escapePathComponent(key),
                value: _deepClone(newVal)
              });
            }
          }
        } else if (Array.isArray(mirror) === Array.isArray(obj)) {
          if (invertible) {
            patches.push({
              op: "test",
              path: path + "/" + escapePathComponent(key),
              value: _deepClone(oldVal)
            });
          }

          patches.push({
            op: "remove",
            path: path + "/" + escapePathComponent(key)
          });
          deleted = true; // property has been deleted
        } else {
          if (invertible) {
            patches.push({
              op: "test",
              path: path,
              value: mirror
            });
          }

          patches.push({
            op: "replace",
            path: path,
            value: obj
          });
        }
      }

      if (!deleted && newKeys.length == oldKeys.length) {
        return;
      }

      for (var t = 0; t < newKeys.length; t++) {
        var key = newKeys[t];

        if (!hasOwnProperty(mirror, key) && obj[key] !== undefined) {
          patches.push({
            op: "add",
            path: path + "/" + escapePathComponent(key),
            value: _deepClone(obj[key])
          });
        }
      }
    }
    /**
     * Create an array of patches from the differences in two objects
     */


    function compare$7(tree1, tree2, invertible) {
      if (invertible === void 0) {
        invertible = false;
      }

      var patches = [];

      _generate(tree1, tree2, patches, '', invertible);

      return patches;
    }

    var duplex = /*#__PURE__*/Object.freeze({
        __proto__: null,
        unobserve: unobserve,
        observe: observe,
        generate: generate,
        compare: compare$7
    });

    Object.assign({}, core, duplex, {
      JsonPatchError: PatchError,
      deepClone: _deepClone,
      escapePathComponent,
      unescapePathComponent
    });

    // working on the output of `JSON.stringify` we know that only valid strings
    // are present (unless the user supplied a weird `options.indent` but in
    // that case we don’t care since the output would be invalid anyway).


    var stringOrChar = /("(?:[^\\"]|\\.)*")|[:,]/g;

    var jsonStringifyPrettyCompact = function stringify(passedObj, options) {
      var indent, maxLength, replacer;
      options = options || {};
      indent = JSON.stringify([1], undefined, options.indent === undefined ? 2 : options.indent).slice(2, -3);
      maxLength = indent === "" ? Infinity : options.maxLength === undefined ? 80 : options.maxLength;
      replacer = options.replacer;
      return function _stringify(obj, currentIndent, reserved) {
        // prettier-ignore
        var end, index, items, key, keyPart, keys, length, nextIndent, prettified, start, string, value;

        if (obj && typeof obj.toJSON === "function") {
          obj = obj.toJSON();
        }

        string = JSON.stringify(obj, replacer);

        if (string === undefined) {
          return string;
        }

        length = maxLength - currentIndent.length - reserved;

        if (string.length <= length) {
          prettified = string.replace(stringOrChar, function (match, stringLiteral) {
            return stringLiteral || match + " ";
          });

          if (prettified.length <= length) {
            return prettified;
          }
        }

        if (replacer != null) {
          obj = JSON.parse(string);
          replacer = undefined;
        }

        if (typeof obj === "object" && obj !== null) {
          nextIndent = currentIndent + indent;
          items = [];
          index = 0;

          if (Array.isArray(obj)) {
            start = "[";
            end = "]";
            length = obj.length;

            for (; index < length; index++) {
              items.push(_stringify(obj[index], nextIndent, index === length - 1 ? 0 : 1) || "null");
            }
          } else {
            start = "{";
            end = "}";
            keys = Object.keys(obj);
            length = keys.length;

            for (; index < length; index++) {
              key = keys[index];
              keyPart = JSON.stringify(key) + ": ";
              value = _stringify(obj[key], nextIndent, keyPart.length + (index === length - 1 ? 0 : 1));

              if (value !== undefined) {
                items.push(keyPart + value);
              }
            }
          }

          if (items.length > 0) {
            return [start, indent + items.join(",\n" + nextIndent), end].join("\n" + currentIndent);
          }
        }

        return string;
      }(passedObj, "", 0);
    };

    var yallist = Yallist$1;
    Yallist$1.Node = Node;
    Yallist$1.create = Yallist$1;

    function Yallist$1(list) {
      var self = this;

      if (!(self instanceof Yallist$1)) {
        self = new Yallist$1();
      }

      self.tail = null;
      self.head = null;
      self.length = 0;

      if (list && typeof list.forEach === 'function') {
        list.forEach(function (item) {
          self.push(item);
        });
      } else if (arguments.length > 0) {
        for (var i = 0, l = arguments.length; i < l; i++) {
          self.push(arguments[i]);
        }
      }

      return self;
    }

    Yallist$1.prototype.removeNode = function (node) {
      if (node.list !== this) {
        throw new Error('removing node which does not belong to this list');
      }

      var next = node.next;
      var prev = node.prev;

      if (next) {
        next.prev = prev;
      }

      if (prev) {
        prev.next = next;
      }

      if (node === this.head) {
        this.head = next;
      }

      if (node === this.tail) {
        this.tail = prev;
      }

      node.list.length--;
      node.next = null;
      node.prev = null;
      node.list = null;
      return next;
    };

    Yallist$1.prototype.unshiftNode = function (node) {
      if (node === this.head) {
        return;
      }

      if (node.list) {
        node.list.removeNode(node);
      }

      var head = this.head;
      node.list = this;
      node.next = head;

      if (head) {
        head.prev = node;
      }

      this.head = node;

      if (!this.tail) {
        this.tail = node;
      }

      this.length++;
    };

    Yallist$1.prototype.pushNode = function (node) {
      if (node === this.tail) {
        return;
      }

      if (node.list) {
        node.list.removeNode(node);
      }

      var tail = this.tail;
      node.list = this;
      node.prev = tail;

      if (tail) {
        tail.next = node;
      }

      this.tail = node;

      if (!this.head) {
        this.head = node;
      }

      this.length++;
    };

    Yallist$1.prototype.push = function () {
      for (var i = 0, l = arguments.length; i < l; i++) {
        push(this, arguments[i]);
      }

      return this.length;
    };

    Yallist$1.prototype.unshift = function () {
      for (var i = 0, l = arguments.length; i < l; i++) {
        unshift(this, arguments[i]);
      }

      return this.length;
    };

    Yallist$1.prototype.pop = function () {
      if (!this.tail) {
        return undefined;
      }

      var res = this.tail.value;
      this.tail = this.tail.prev;

      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }

      this.length--;
      return res;
    };

    Yallist$1.prototype.shift = function () {
      if (!this.head) {
        return undefined;
      }

      var res = this.head.value;
      this.head = this.head.next;

      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }

      this.length--;
      return res;
    };

    Yallist$1.prototype.forEach = function (fn, thisp) {
      thisp = thisp || this;

      for (var walker = this.head, i = 0; walker !== null; i++) {
        fn.call(thisp, walker.value, i, this);
        walker = walker.next;
      }
    };

    Yallist$1.prototype.forEachReverse = function (fn, thisp) {
      thisp = thisp || this;

      for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
        fn.call(thisp, walker.value, i, this);
        walker = walker.prev;
      }
    };

    Yallist$1.prototype.get = function (n) {
      for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
        // abort out of the list early if we hit a cycle
        walker = walker.next;
      }

      if (i === n && walker !== null) {
        return walker.value;
      }
    };

    Yallist$1.prototype.getReverse = function (n) {
      for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
        // abort out of the list early if we hit a cycle
        walker = walker.prev;
      }

      if (i === n && walker !== null) {
        return walker.value;
      }
    };

    Yallist$1.prototype.map = function (fn, thisp) {
      thisp = thisp || this;
      var res = new Yallist$1();

      for (var walker = this.head; walker !== null;) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.next;
      }

      return res;
    };

    Yallist$1.prototype.mapReverse = function (fn, thisp) {
      thisp = thisp || this;
      var res = new Yallist$1();

      for (var walker = this.tail; walker !== null;) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.prev;
      }

      return res;
    };

    Yallist$1.prototype.reduce = function (fn, initial) {
      var acc;
      var walker = this.head;

      if (arguments.length > 1) {
        acc = initial;
      } else if (this.head) {
        walker = this.head.next;
        acc = this.head.value;
      } else {
        throw new TypeError('Reduce of empty list with no initial value');
      }

      for (var i = 0; walker !== null; i++) {
        acc = fn(acc, walker.value, i);
        walker = walker.next;
      }

      return acc;
    };

    Yallist$1.prototype.reduceReverse = function (fn, initial) {
      var acc;
      var walker = this.tail;

      if (arguments.length > 1) {
        acc = initial;
      } else if (this.tail) {
        walker = this.tail.prev;
        acc = this.tail.value;
      } else {
        throw new TypeError('Reduce of empty list with no initial value');
      }

      for (var i = this.length - 1; walker !== null; i--) {
        acc = fn(acc, walker.value, i);
        walker = walker.prev;
      }

      return acc;
    };

    Yallist$1.prototype.toArray = function () {
      var arr = new Array(this.length);

      for (var i = 0, walker = this.head; walker !== null; i++) {
        arr[i] = walker.value;
        walker = walker.next;
      }

      return arr;
    };

    Yallist$1.prototype.toArrayReverse = function () {
      var arr = new Array(this.length);

      for (var i = 0, walker = this.tail; walker !== null; i++) {
        arr[i] = walker.value;
        walker = walker.prev;
      }

      return arr;
    };

    Yallist$1.prototype.slice = function (from, to) {
      to = to || this.length;

      if (to < 0) {
        to += this.length;
      }

      from = from || 0;

      if (from < 0) {
        from += this.length;
      }

      var ret = new Yallist$1();

      if (to < from || to < 0) {
        return ret;
      }

      if (from < 0) {
        from = 0;
      }

      if (to > this.length) {
        to = this.length;
      }

      for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
        walker = walker.next;
      }

      for (; walker !== null && i < to; i++, walker = walker.next) {
        ret.push(walker.value);
      }

      return ret;
    };

    Yallist$1.prototype.sliceReverse = function (from, to) {
      to = to || this.length;

      if (to < 0) {
        to += this.length;
      }

      from = from || 0;

      if (from < 0) {
        from += this.length;
      }

      var ret = new Yallist$1();

      if (to < from || to < 0) {
        return ret;
      }

      if (from < 0) {
        from = 0;
      }

      if (to > this.length) {
        to = this.length;
      }

      for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
        walker = walker.prev;
      }

      for (; walker !== null && i > from; i--, walker = walker.prev) {
        ret.push(walker.value);
      }

      return ret;
    };

    Yallist$1.prototype.splice = function (start, deleteCount) {
      if (start > this.length) {
        start = this.length - 1;
      }

      if (start < 0) {
        start = this.length + start;
      }

      for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
        walker = walker.next;
      }

      var ret = [];

      for (var i = 0; walker && i < deleteCount; i++) {
        ret.push(walker.value);
        walker = this.removeNode(walker);
      }

      if (walker === null) {
        walker = this.tail;
      }

      if (walker !== this.head && walker !== this.tail) {
        walker = walker.prev;
      }

      for (var i = 0; i < (arguments.length <= 2 ? 0 : arguments.length - 2); i++) {
        walker = insert(this, walker, i + 2 < 2 || arguments.length <= i + 2 ? undefined : arguments[i + 2]);
      }

      return ret;
    };

    Yallist$1.prototype.reverse = function () {
      var head = this.head;
      var tail = this.tail;

      for (var walker = head; walker !== null; walker = walker.prev) {
        var p = walker.prev;
        walker.prev = walker.next;
        walker.next = p;
      }

      this.head = tail;
      this.tail = head;
      return this;
    };

    function insert(self, node, value) {
      var inserted = node === self.head ? new Node(value, null, node, self) : new Node(value, node, node.next, self);

      if (inserted.next === null) {
        self.tail = inserted;
      }

      if (inserted.prev === null) {
        self.head = inserted;
      }

      self.length++;
      return inserted;
    }

    function push(self, item) {
      self.tail = new Node(item, self.tail, null, self);

      if (!self.head) {
        self.head = self.tail;
      }

      self.length++;
    }

    function unshift(self, item) {
      self.head = new Node(item, null, self.head, self);

      if (!self.tail) {
        self.tail = self.head;
      }

      self.length++;
    }

    function Node(value, prev, next, list) {
      if (!(this instanceof Node)) {
        return new Node(value, prev, next, list);
      }

      this.list = list;
      this.value = value;

      if (prev) {
        prev.next = this;
        this.prev = prev;
      } else {
        this.prev = null;
      }

      if (next) {
        next.prev = this;
        this.next = next;
      } else {
        this.next = null;
      }
    }

    try {
      // add if support for Symbol.iterator is present
      require('./iterator.js')(Yallist$1);
    } catch (er) {}

    const Yallist = yallist;
    const MAX = Symbol('max');
    const LENGTH = Symbol('length');
    const LENGTH_CALCULATOR = Symbol('lengthCalculator');
    const ALLOW_STALE = Symbol('allowStale');
    const MAX_AGE = Symbol('maxAge');
    const DISPOSE = Symbol('dispose');
    const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet');
    const LRU_LIST = Symbol('lruList');
    const CACHE = Symbol('cache');
    const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet');

    const naiveLength = () => 1; // lruList is a yallist where the head is the youngest
    // item, and the tail is the oldest.  the list contains the Hit
    // objects as the entries.
    // Each Hit object has a reference to its Yallist.Node.  This
    // never changes.
    //
    // cache is a Map (or PseudoMap) that matches the keys to
    // the Yallist.Node object.


    class LRUCache {
      constructor(options) {
        if (typeof options === 'number') options = {
          max: options
        };
        if (!options) options = {};
        if (options.max && (typeof options.max !== 'number' || options.max < 0)) throw new TypeError('max must be a non-negative number'); // Kind of weird to have a default max of Infinity, but oh well.

        this[MAX] = options.max || Infinity;
        const lc = options.length || naiveLength;
        this[LENGTH_CALCULATOR] = typeof lc !== 'function' ? naiveLength : lc;
        this[ALLOW_STALE] = options.stale || false;
        if (options.maxAge && typeof options.maxAge !== 'number') throw new TypeError('maxAge must be a number');
        this[MAX_AGE] = options.maxAge || 0;
        this[DISPOSE] = options.dispose;
        this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
        this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
        this.reset();
      } // resize the cache when the max changes.


      set max(mL) {
        if (typeof mL !== 'number' || mL < 0) throw new TypeError('max must be a non-negative number');
        this[MAX] = mL || Infinity;
        trim(this);
      }

      get max() {
        return this[MAX];
      }

      set allowStale(allowStale) {
        this[ALLOW_STALE] = !!allowStale;
      }

      get allowStale() {
        return this[ALLOW_STALE];
      }

      set maxAge(mA) {
        if (typeof mA !== 'number') throw new TypeError('maxAge must be a non-negative number');
        this[MAX_AGE] = mA;
        trim(this);
      }

      get maxAge() {
        return this[MAX_AGE];
      } // resize the cache when the lengthCalculator changes.


      set lengthCalculator(lC) {
        if (typeof lC !== 'function') lC = naiveLength;

        if (lC !== this[LENGTH_CALCULATOR]) {
          this[LENGTH_CALCULATOR] = lC;
          this[LENGTH] = 0;
          this[LRU_LIST].forEach(hit => {
            hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
            this[LENGTH] += hit.length;
          });
        }

        trim(this);
      }

      get lengthCalculator() {
        return this[LENGTH_CALCULATOR];
      }

      get length() {
        return this[LENGTH];
      }

      get itemCount() {
        return this[LRU_LIST].length;
      }

      rforEach(fn, thisp) {
        thisp = thisp || this;

        for (let walker = this[LRU_LIST].tail; walker !== null;) {
          const prev = walker.prev;
          forEachStep(this, fn, walker, thisp);
          walker = prev;
        }
      }

      forEach(fn, thisp) {
        thisp = thisp || this;

        for (let walker = this[LRU_LIST].head; walker !== null;) {
          const next = walker.next;
          forEachStep(this, fn, walker, thisp);
          walker = next;
        }
      }

      keys() {
        return this[LRU_LIST].toArray().map(k => k.key);
      }

      values() {
        return this[LRU_LIST].toArray().map(k => k.value);
      }

      reset() {
        if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
          this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value));
        }

        this[CACHE] = new Map(); // hash of items by key

        this[LRU_LIST] = new Yallist(); // list of items in order of use recency

        this[LENGTH] = 0; // length of items in the list
      }

      dump() {
        return this[LRU_LIST].map(hit => isStale(this, hit) ? false : {
          k: hit.key,
          v: hit.value,
          e: hit.now + (hit.maxAge || 0)
        }).toArray().filter(h => h);
      }

      dumpLru() {
        return this[LRU_LIST];
      }

      set(key, value, maxAge) {
        maxAge = maxAge || this[MAX_AGE];
        if (maxAge && typeof maxAge !== 'number') throw new TypeError('maxAge must be a number');
        const now = maxAge ? Date.now() : 0;
        const len = this[LENGTH_CALCULATOR](value, key);

        if (this[CACHE].has(key)) {
          if (len > this[MAX]) {
            del(this, this[CACHE].get(key));
            return false;
          }

          const node = this[CACHE].get(key);
          const item = node.value; // dispose of the old one before overwriting
          // split out into 2 ifs for better coverage tracking

          if (this[DISPOSE]) {
            if (!this[NO_DISPOSE_ON_SET]) this[DISPOSE](key, item.value);
          }

          item.now = now;
          item.maxAge = maxAge;
          item.value = value;
          this[LENGTH] += len - item.length;
          item.length = len;
          this.get(key);
          trim(this);
          return true;
        }

        const hit = new Entry(key, value, len, now, maxAge); // oversized objects fall out of cache automatically.

        if (hit.length > this[MAX]) {
          if (this[DISPOSE]) this[DISPOSE](key, value);
          return false;
        }

        this[LENGTH] += hit.length;
        this[LRU_LIST].unshift(hit);
        this[CACHE].set(key, this[LRU_LIST].head);
        trim(this);
        return true;
      }

      has(key) {
        if (!this[CACHE].has(key)) return false;
        const hit = this[CACHE].get(key).value;
        return !isStale(this, hit);
      }

      get(key) {
        return get(this, key, true);
      }

      peek(key) {
        return get(this, key, false);
      }

      pop() {
        const node = this[LRU_LIST].tail;
        if (!node) return null;
        del(this, node);
        return node.value;
      }

      del(key) {
        del(this, this[CACHE].get(key));
      }

      load(arr) {
        // reset the cache
        this.reset();
        const now = Date.now(); // A previous serialized cache has the most recent items first

        for (let l = arr.length - 1; l >= 0; l--) {
          const hit = arr[l];
          const expiresAt = hit.e || 0;
          if (expiresAt === 0) // the item was created without expiration in a non aged cache
            this.set(hit.k, hit.v);else {
            const maxAge = expiresAt - now; // dont add already expired items

            if (maxAge > 0) {
              this.set(hit.k, hit.v, maxAge);
            }
          }
        }
      }

      prune() {
        this[CACHE].forEach((value, key) => get(this, key, false));
      }

    }

    const get = (self, key, doUse) => {
      const node = self[CACHE].get(key);

      if (node) {
        const hit = node.value;

        if (isStale(self, hit)) {
          del(self, node);
          if (!self[ALLOW_STALE]) return undefined;
        } else {
          if (doUse) {
            if (self[UPDATE_AGE_ON_GET]) node.value.now = Date.now();
            self[LRU_LIST].unshiftNode(node);
          }
        }

        return hit.value;
      }
    };

    const isStale = (self, hit) => {
      if (!hit || !hit.maxAge && !self[MAX_AGE]) return false;
      const diff = Date.now() - hit.now;
      return hit.maxAge ? diff > hit.maxAge : self[MAX_AGE] && diff > self[MAX_AGE];
    };

    const trim = self => {
      if (self[LENGTH] > self[MAX]) {
        for (let walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null;) {
          // We know that we're about to delete this one, and also
          // what the next least recently used key will be, so just
          // go ahead and set it now.
          const prev = walker.prev;
          del(self, walker);
          walker = prev;
        }
      }
    };

    const del = (self, node) => {
      if (node) {
        const hit = node.value;
        if (self[DISPOSE]) self[DISPOSE](hit.key, hit.value);
        self[LENGTH] -= hit.length;
        self[CACHE].delete(hit.key);
        self[LRU_LIST].removeNode(node);
      }
    };

    class Entry {
      constructor(key, value, length, now, maxAge) {
        this.key = key;
        this.value = value;
        this.length = length;
        this.now = now;
        this.maxAge = maxAge || 0;
      }

    }

    const forEachStep = (self, fn, node, thisp) => {
      let hit = node.value;

      if (isStale(self, hit)) {
        del(self, node);
        if (!self[ALLOW_STALE]) hit = undefined;
      }

      if (hit) fn.call(thisp, hit.value, hit.key, self);
    };

    var lruCache = LRUCache;

    // obj with keys in a consistent order.

    const opts = ['includePrerelease', 'loose', 'rtl'];

    const parseOptions$3 = options => !options ? {} : typeof options !== 'object' ? {
      loose: true
    } : opts.filter(k => options[k]).reduce((options, k) => {
      options[k] = true;
      return options;
    }, {});

    var parseOptions_1 = parseOptions$3;

    var re$3 = {exports: {}};

    // Not necessarily the package version of this code.

    const SEMVER_SPEC_VERSION = '2.0.0';
    const MAX_LENGTH$1 = 256;
    const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER ||
    /* istanbul ignore next */
    9007199254740991; // Max safe segment length for coercion.

    const MAX_SAFE_COMPONENT_LENGTH = 16;
    var constants = {
      SEMVER_SPEC_VERSION,
      MAX_LENGTH: MAX_LENGTH$1,
      MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
      MAX_SAFE_COMPONENT_LENGTH
    };

    const debug$3 = typeof process === 'object' && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return console.error('SEMVER', ...args);
    } : () => {};
    var debug_1 = debug$3;

    (function (module, exports) {
      const {
        MAX_SAFE_COMPONENT_LENGTH
      } = constants;
      const debug = debug_1;
      exports = module.exports = {}; // The actual regexps go on exports.re

      const re = exports.re = [];
      const src = exports.src = [];
      const t = exports.t = {};
      let R = 0;

      const createToken = (name, value, isGlobal) => {
        const index = R++;
        debug(index, value);
        t[name] = index;
        src[index] = value;
        re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
      }; // The following Regular Expressions can be used for tokenizing,
      // validating, and parsing SemVer version strings.
      // ## Numeric Identifier
      // A single `0`, or a non-zero digit followed by zero or more digits.


      createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
      createToken('NUMERICIDENTIFIERLOOSE', '[0-9]+'); // ## Non-numeric Identifier
      // Zero or more digits, followed by a letter or hyphen, and then zero or
      // more letters, digits, or hyphens.

      createToken('NONNUMERICIDENTIFIER', '\\d*[a-zA-Z-][a-zA-Z0-9-]*'); // ## Main Version
      // Three dot-separated numeric identifiers.

      createToken('MAINVERSION', "(".concat(src[t.NUMERICIDENTIFIER], ")\\.") + "(".concat(src[t.NUMERICIDENTIFIER], ")\\.") + "(".concat(src[t.NUMERICIDENTIFIER], ")"));
      createToken('MAINVERSIONLOOSE', "(".concat(src[t.NUMERICIDENTIFIERLOOSE], ")\\.") + "(".concat(src[t.NUMERICIDENTIFIERLOOSE], ")\\.") + "(".concat(src[t.NUMERICIDENTIFIERLOOSE], ")")); // ## Pre-release Version Identifier
      // A numeric identifier, or a non-numeric identifier.

      createToken('PRERELEASEIDENTIFIER', "(?:".concat(src[t.NUMERICIDENTIFIER], "|").concat(src[t.NONNUMERICIDENTIFIER], ")"));
      createToken('PRERELEASEIDENTIFIERLOOSE', "(?:".concat(src[t.NUMERICIDENTIFIERLOOSE], "|").concat(src[t.NONNUMERICIDENTIFIER], ")")); // ## Pre-release Version
      // Hyphen, followed by one or more dot-separated pre-release version
      // identifiers.

      createToken('PRERELEASE', "(?:-(".concat(src[t.PRERELEASEIDENTIFIER], "(?:\\.").concat(src[t.PRERELEASEIDENTIFIER], ")*))"));
      createToken('PRERELEASELOOSE', "(?:-?(".concat(src[t.PRERELEASEIDENTIFIERLOOSE], "(?:\\.").concat(src[t.PRERELEASEIDENTIFIERLOOSE], ")*))")); // ## Build Metadata Identifier
      // Any combination of digits, letters, or hyphens.

      createToken('BUILDIDENTIFIER', '[0-9A-Za-z-]+'); // ## Build Metadata
      // Plus sign, followed by one or more period-separated build metadata
      // identifiers.

      createToken('BUILD', "(?:\\+(".concat(src[t.BUILDIDENTIFIER], "(?:\\.").concat(src[t.BUILDIDENTIFIER], ")*))")); // ## Full Version String
      // A main version, followed optionally by a pre-release version and
      // build metadata.
      // Note that the only major, minor, patch, and pre-release sections of
      // the version string are capturing groups.  The build metadata is not a
      // capturing group, because it should not ever be used in version
      // comparison.

      createToken('FULLPLAIN', "v?".concat(src[t.MAINVERSION]).concat(src[t.PRERELEASE], "?").concat(src[t.BUILD], "?"));
      createToken('FULL', "^".concat(src[t.FULLPLAIN], "$")); // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
      // also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
      // common in the npm registry.

      createToken('LOOSEPLAIN', "[v=\\s]*".concat(src[t.MAINVERSIONLOOSE]).concat(src[t.PRERELEASELOOSE], "?").concat(src[t.BUILD], "?"));
      createToken('LOOSE', "^".concat(src[t.LOOSEPLAIN], "$"));
      createToken('GTLT', '((?:<|>)?=?)'); // Something like "2.*" or "1.2.x".
      // Note that "x.x" is a valid xRange identifer, meaning "any version"
      // Only the first item is strictly required.

      createToken('XRANGEIDENTIFIERLOOSE', "".concat(src[t.NUMERICIDENTIFIERLOOSE], "|x|X|\\*"));
      createToken('XRANGEIDENTIFIER', "".concat(src[t.NUMERICIDENTIFIER], "|x|X|\\*"));
      createToken('XRANGEPLAIN', "[v=\\s]*(".concat(src[t.XRANGEIDENTIFIER], ")") + "(?:\\.(".concat(src[t.XRANGEIDENTIFIER], ")") + "(?:\\.(".concat(src[t.XRANGEIDENTIFIER], ")") + "(?:".concat(src[t.PRERELEASE], ")?").concat(src[t.BUILD], "?") + ")?)?");
      createToken('XRANGEPLAINLOOSE', "[v=\\s]*(".concat(src[t.XRANGEIDENTIFIERLOOSE], ")") + "(?:\\.(".concat(src[t.XRANGEIDENTIFIERLOOSE], ")") + "(?:\\.(".concat(src[t.XRANGEIDENTIFIERLOOSE], ")") + "(?:".concat(src[t.PRERELEASELOOSE], ")?").concat(src[t.BUILD], "?") + ")?)?");
      createToken('XRANGE', "^".concat(src[t.GTLT], "\\s*").concat(src[t.XRANGEPLAIN], "$"));
      createToken('XRANGELOOSE', "^".concat(src[t.GTLT], "\\s*").concat(src[t.XRANGEPLAINLOOSE], "$")); // Coercion.
      // Extract anything that could conceivably be a part of a valid semver

      createToken('COERCE', "".concat('(^|[^\\d])' + '(\\d{1,').concat(MAX_SAFE_COMPONENT_LENGTH, "})") + "(?:\\.(\\d{1,".concat(MAX_SAFE_COMPONENT_LENGTH, "}))?") + "(?:\\.(\\d{1,".concat(MAX_SAFE_COMPONENT_LENGTH, "}))?") + "(?:$|[^\\d])");
      createToken('COERCERTL', src[t.COERCE], true); // Tilde ranges.
      // Meaning is "reasonably at or greater than"

      createToken('LONETILDE', '(?:~>?)');
      createToken('TILDETRIM', "(\\s*)".concat(src[t.LONETILDE], "\\s+"), true);
      exports.tildeTrimReplace = '$1~';
      createToken('TILDE', "^".concat(src[t.LONETILDE]).concat(src[t.XRANGEPLAIN], "$"));
      createToken('TILDELOOSE', "^".concat(src[t.LONETILDE]).concat(src[t.XRANGEPLAINLOOSE], "$")); // Caret ranges.
      // Meaning is "at least and backwards compatible with"

      createToken('LONECARET', '(?:\\^)');
      createToken('CARETTRIM', "(\\s*)".concat(src[t.LONECARET], "\\s+"), true);
      exports.caretTrimReplace = '$1^';
      createToken('CARET', "^".concat(src[t.LONECARET]).concat(src[t.XRANGEPLAIN], "$"));
      createToken('CARETLOOSE', "^".concat(src[t.LONECARET]).concat(src[t.XRANGEPLAINLOOSE], "$")); // A simple gt/lt/eq thing, or just "" to indicate "any version"

      createToken('COMPARATORLOOSE', "^".concat(src[t.GTLT], "\\s*(").concat(src[t.LOOSEPLAIN], ")$|^$"));
      createToken('COMPARATOR', "^".concat(src[t.GTLT], "\\s*(").concat(src[t.FULLPLAIN], ")$|^$")); // An expression to strip any whitespace between the gtlt and the thing
      // it modifies, so that `> 1.2.3` ==> `>1.2.3`

      createToken('COMPARATORTRIM', "(\\s*)".concat(src[t.GTLT], "\\s*(").concat(src[t.LOOSEPLAIN], "|").concat(src[t.XRANGEPLAIN], ")"), true);
      exports.comparatorTrimReplace = '$1$2$3'; // Something like `1.2.3 - 1.2.4`
      // Note that these all use the loose form, because they'll be
      // checked against either the strict or loose comparator form
      // later.

      createToken('HYPHENRANGE', "^\\s*(".concat(src[t.XRANGEPLAIN], ")") + "\\s+-\\s+" + "(".concat(src[t.XRANGEPLAIN], ")") + "\\s*$");
      createToken('HYPHENRANGELOOSE', "^\\s*(".concat(src[t.XRANGEPLAINLOOSE], ")") + "\\s+-\\s+" + "(".concat(src[t.XRANGEPLAINLOOSE], ")") + "\\s*$"); // Star ranges basically just allow anything at all.

      createToken('STAR', '(<|>)?=?\\s*\\*'); // >=0.0.0 is like a star

      createToken('GTE0', '^\\s*>=\\s*0\.0\.0\\s*$');
      createToken('GTE0PRE', '^\\s*>=\\s*0\.0\.0-0\\s*$');
    })(re$3, re$3.exports);

    const numeric = /^[0-9]+$/;

    const compareIdentifiers$1 = (a, b) => {
      const anum = numeric.test(a);
      const bnum = numeric.test(b);

      if (anum && bnum) {
        a = +a;
        b = +b;
      }

      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };

    const rcompareIdentifiers = (a, b) => compareIdentifiers$1(b, a);

    var identifiers = {
      compareIdentifiers: compareIdentifiers$1,
      rcompareIdentifiers
    };

    const debug$2 = debug_1;
    const {
      MAX_LENGTH,
      MAX_SAFE_INTEGER
    } = constants;
    const {
      re: re$2,
      t: t$2
    } = re$3.exports;
    const parseOptions$2 = parseOptions_1;
    const {
      compareIdentifiers
    } = identifiers;

    class SemVer$3 {
      constructor(version, options) {
        options = parseOptions$2(options);

        if (version instanceof SemVer$3) {
          if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
            return version;
          } else {
            version = version.version;
          }
        } else if (typeof version !== 'string') {
          throw new TypeError("Invalid Version: ".concat(version));
        }

        if (version.length > MAX_LENGTH) {
          throw new TypeError("version is longer than ".concat(MAX_LENGTH, " characters"));
        }

        debug$2('SemVer', version, options);
        this.options = options;
        this.loose = !!options.loose; // this isn't actually relevant for versions, but keep it so that we
        // don't run into trouble passing this.options around.

        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re$2[t$2.LOOSE] : re$2[t$2.FULL]);

        if (!m) {
          throw new TypeError("Invalid Version: ".concat(version));
        }

        this.raw = version; // these are actually numbers

        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];

        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError('Invalid major version');
        }

        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError('Invalid minor version');
        }

        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError('Invalid patch version');
        } // numberify any prerelease numeric ids


        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split('.').map(id => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;

              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }

            return id;
          });
        }

        this.build = m[5] ? m[5].split('.') : [];
        this.format();
      }

      format() {
        this.version = "".concat(this.major, ".").concat(this.minor, ".").concat(this.patch);

        if (this.prerelease.length) {
          this.version += "-".concat(this.prerelease.join('.'));
        }

        return this.version;
      }

      toString() {
        return this.version;
      }

      compare(other) {
        debug$2('SemVer.compare', this.version, this.options, other);

        if (!(other instanceof SemVer$3)) {
          if (typeof other === 'string' && other === this.version) {
            return 0;
          }

          other = new SemVer$3(other, this.options);
        }

        if (other.version === this.version) {
          return 0;
        }

        return this.compareMain(other) || this.comparePre(other);
      }

      compareMain(other) {
        if (!(other instanceof SemVer$3)) {
          other = new SemVer$3(other, this.options);
        }

        return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
      }

      comparePre(other) {
        if (!(other instanceof SemVer$3)) {
          other = new SemVer$3(other, this.options);
        } // NOT having a prerelease is > having one


        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }

        let i = 0;

        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug$2('prerelease compare', i, a, b);

          if (a === undefined && b === undefined) {
            return 0;
          } else if (b === undefined) {
            return 1;
          } else if (a === undefined) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }

      compareBuild(other) {
        if (!(other instanceof SemVer$3)) {
          other = new SemVer$3(other, this.options);
        }

        let i = 0;

        do {
          const a = this.build[i];
          const b = other.build[i];
          debug$2('prerelease compare', i, a, b);

          if (a === undefined && b === undefined) {
            return 0;
          } else if (b === undefined) {
            return 1;
          } else if (a === undefined) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      } // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.


      inc(release, identifier) {
        switch (release) {
          case 'premajor':
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc('pre', identifier);
            break;

          case 'preminor':
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc('pre', identifier);
            break;

          case 'prepatch':
            // If this is already a prerelease, it will bump to the next version
            // drop any prereleases that might already exist, since they are not
            // relevant at this point.
            this.prerelease.length = 0;
            this.inc('patch', identifier);
            this.inc('pre', identifier);
            break;
          // If the input is a non-prerelease version, this acts the same as
          // prepatch.

          case 'prerelease':
            if (this.prerelease.length === 0) {
              this.inc('patch', identifier);
            }

            this.inc('pre', identifier);
            break;

          case 'major':
            // If this is a pre-major version, bump up to the same major version.
            // Otherwise increment major.
            // 1.0.0-5 bumps to 1.0.0
            // 1.1.0 bumps to 2.0.0
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }

            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;

          case 'minor':
            // If this is a pre-minor version, bump up to the same minor version.
            // Otherwise increment minor.
            // 1.2.0-5 bumps to 1.2.0
            // 1.2.1 bumps to 1.3.0
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }

            this.patch = 0;
            this.prerelease = [];
            break;

          case 'patch':
            // If this is not a pre-release version, it will increment the patch.
            // If it is a pre-release it will bump up to the same patch version.
            // 1.2.0-5 patches to 1.2.0
            // 1.2.0 patches to 1.2.1
            if (this.prerelease.length === 0) {
              this.patch++;
            }

            this.prerelease = [];
            break;
          // This probably shouldn't be used publicly.
          // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.

          case 'pre':
            if (this.prerelease.length === 0) {
              this.prerelease = [0];
            } else {
              let i = this.prerelease.length;

              while (--i >= 0) {
                if (typeof this.prerelease[i] === 'number') {
                  this.prerelease[i]++;
                  i = -2;
                }
              }

              if (i === -1) {
                // didn't increment anything
                this.prerelease.push(0);
              }
            }

            if (identifier) {
              // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
              // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
              if (this.prerelease[0] === identifier) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = [identifier, 0];
                }
              } else {
                this.prerelease = [identifier, 0];
              }
            }

            break;

          default:
            throw new Error("invalid increment argument: ".concat(release));
        }

        this.format();
        this.raw = this.version;
        return this;
      }

    }

    var semver = SemVer$3;

    const SemVer$2 = semver;

    const compare$6 = (a, b, loose) => new SemVer$2(a, loose).compare(new SemVer$2(b, loose));

    var compare_1 = compare$6;

    const compare$5 = compare_1;

    const eq$1 = (a, b, loose) => compare$5(a, b, loose) === 0;

    var eq_1 = eq$1;

    const compare$4 = compare_1;

    const neq$1 = (a, b, loose) => compare$4(a, b, loose) !== 0;

    var neq_1 = neq$1;

    const compare$3 = compare_1;

    const gt$1 = (a, b, loose) => compare$3(a, b, loose) > 0;

    var gt_1 = gt$1;

    const compare$2 = compare_1;

    const gte$1 = (a, b, loose) => compare$2(a, b, loose) >= 0;

    var gte_1 = gte$1;

    const compare$1 = compare_1;

    const lt$1 = (a, b, loose) => compare$1(a, b, loose) < 0;

    var lt_1 = lt$1;

    const compare = compare_1;

    const lte$1 = (a, b, loose) => compare(a, b, loose) <= 0;

    var lte_1 = lte$1;

    const eq = eq_1;
    const neq = neq_1;
    const gt = gt_1;
    const gte = gte_1;
    const lt = lt_1;
    const lte = lte_1;

    const cmp$1 = (a, op, b, loose) => {
      switch (op) {
        case '===':
          if (typeof a === 'object') a = a.version;
          if (typeof b === 'object') b = b.version;
          return a === b;

        case '!==':
          if (typeof a === 'object') a = a.version;
          if (typeof b === 'object') b = b.version;
          return a !== b;

        case '':
        case '=':
        case '==':
          return eq(a, b, loose);

        case '!=':
          return neq(a, b, loose);

        case '>':
          return gt(a, b, loose);

        case '>=':
          return gte(a, b, loose);

        case '<':
          return lt(a, b, loose);

        case '<=':
          return lte(a, b, loose);

        default:
          throw new TypeError("Invalid operator: ".concat(op));
      }
    };

    var cmp_1 = cmp$1;

    const ANY = Symbol('SemVer ANY'); // hoisted class for cyclic dependency

    class Comparator$1 {
      static get ANY() {
        return ANY;
      }

      constructor(comp, options) {
        options = parseOptions$1(options);

        if (comp instanceof Comparator$1) {
          if (comp.loose === !!options.loose) {
            return comp;
          } else {
            comp = comp.value;
          }
        }

        debug$1('comparator', comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);

        if (this.semver === ANY) {
          this.value = '';
        } else {
          this.value = this.operator + this.semver.version;
        }

        debug$1('comp', this);
      }

      parse(comp) {
        const r = this.options.loose ? re$1[t$1.COMPARATORLOOSE] : re$1[t$1.COMPARATOR];
        const m = comp.match(r);

        if (!m) {
          throw new TypeError("Invalid comparator: ".concat(comp));
        }

        this.operator = m[1] !== undefined ? m[1] : '';

        if (this.operator === '=') {
          this.operator = '';
        } // if it literally is just '>' or '' then allow anything.


        if (!m[2]) {
          this.semver = ANY;
        } else {
          this.semver = new SemVer$1(m[2], this.options.loose);
        }
      }

      toString() {
        return this.value;
      }

      test(version) {
        debug$1('Comparator.test', version, this.options.loose);

        if (this.semver === ANY || version === ANY) {
          return true;
        }

        if (typeof version === 'string') {
          try {
            version = new SemVer$1(version, this.options);
          } catch (er) {
            return false;
          }
        }

        return cmp(version, this.operator, this.semver, this.options);
      }

      intersects(comp, options) {
        if (!(comp instanceof Comparator$1)) {
          throw new TypeError('a Comparator is required');
        }

        if (!options || typeof options !== 'object') {
          options = {
            loose: !!options,
            includePrerelease: false
          };
        }

        if (this.operator === '') {
          if (this.value === '') {
            return true;
          }

          return new Range$2(comp.value, options).test(this.value);
        } else if (comp.operator === '') {
          if (comp.value === '') {
            return true;
          }

          return new Range$2(this.value, options).test(comp.semver);
        }

        const sameDirectionIncreasing = (this.operator === '>=' || this.operator === '>') && (comp.operator === '>=' || comp.operator === '>');
        const sameDirectionDecreasing = (this.operator === '<=' || this.operator === '<') && (comp.operator === '<=' || comp.operator === '<');
        const sameSemVer = this.semver.version === comp.semver.version;
        const differentDirectionsInclusive = (this.operator === '>=' || this.operator === '<=') && (comp.operator === '>=' || comp.operator === '<=');
        const oppositeDirectionsLessThan = cmp(this.semver, '<', comp.semver, options) && (this.operator === '>=' || this.operator === '>') && (comp.operator === '<=' || comp.operator === '<');
        const oppositeDirectionsGreaterThan = cmp(this.semver, '>', comp.semver, options) && (this.operator === '<=' || this.operator === '<') && (comp.operator === '>=' || comp.operator === '>');
        return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
      }

    }

    var comparator = Comparator$1;
    const parseOptions$1 = parseOptions_1;
    const {
      re: re$1,
      t: t$1
    } = re$3.exports;
    const cmp = cmp_1;
    const debug$1 = debug_1;
    const SemVer$1 = semver;
    const Range$2 = range;

    class Range$1 {
      constructor(range, options) {
        options = parseOptions(options);

        if (range instanceof Range$1) {
          if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
            return range;
          } else {
            return new Range$1(range.raw, options);
          }
        }

        if (range instanceof Comparator) {
          // just put it in the set and return
          this.raw = range.value;
          this.set = [[range]];
          this.format();
          return this;
        }

        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease; // First, split based on boolean or ||

        this.raw = range;
        this.set = range.split(/\s*\|\|\s*/) // map the range to a 2d array of comparators
        .map(range => this.parseRange(range.trim())) // throw out any comparator lists that are empty
        // this generally means that it was not a valid range, which is allowed
        // in loose mode, but will still throw if the WHOLE range is invalid.
        .filter(c => c.length);

        if (!this.set.length) {
          throw new TypeError("Invalid SemVer Range: ".concat(range));
        } // if we have any that are not the null set, throw out null sets.


        if (this.set.length > 1) {
          // keep the first one, in case they're all null sets
          const first = this.set[0];
          this.set = this.set.filter(c => !isNullSet(c[0]));
          if (this.set.length === 0) this.set = [first];else if (this.set.length > 1) {
            // if we have any that are *, then the range is just *
            for (const c of this.set) {
              if (c.length === 1 && isAny(c[0])) {
                this.set = [c];
                break;
              }
            }
          }
        }

        this.format();
      }

      format() {
        this.range = this.set.map(comps => {
          return comps.join(' ').trim();
        }).join('||').trim();
        return this.range;
      }

      toString() {
        return this.range;
      }

      parseRange(range) {
        range = range.trim(); // memoize range parsing for performance.
        // this is a very hot path, and fully deterministic.

        const memoOpts = Object.keys(this.options).join(',');
        const memoKey = "parseRange:".concat(memoOpts, ":").concat(range);
        const cached = cache.get(memoKey);
        if (cached) return cached;
        const loose = this.options.loose; // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`

        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug('hyphen replace', range); // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`

        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug('comparator trim', range, re[t.COMPARATORTRIM]); // `~ 1.2.3` => `~1.2.3`

        range = range.replace(re[t.TILDETRIM], tildeTrimReplace); // `^ 1.2.3` => `^1.2.3`

        range = range.replace(re[t.CARETTRIM], caretTrimReplace); // normalize spaces

        range = range.split(/\s+/).join(' '); // At this point, the range is completely trimmed and
        // ready to be split into comparators.

        const compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const rangeList = range.split(' ').map(comp => parseComparator(comp, this.options)).join(' ').split(/\s+/) // >=0.0.0 is equivalent to *
        .map(comp => replaceGTE0(comp, this.options)) // in loose mode, throw out any that are not valid comparators
        .filter(this.options.loose ? comp => !!comp.match(compRe) : () => true).map(comp => new Comparator(comp, this.options)); // if any comparators are the null set, then replace with JUST null set
        // if more than one comparator, remove any * comparators
        // also, don't include the same comparator more than once

        rangeList.length;
        const rangeMap = new Map();

        for (const comp of rangeList) {
          if (isNullSet(comp)) return [comp];
          rangeMap.set(comp.value, comp);
        }

        if (rangeMap.size > 1 && rangeMap.has('')) rangeMap.delete('');
        const result = [...rangeMap.values()];
        cache.set(memoKey, result);
        return result;
      }

      intersects(range, options) {
        if (!(range instanceof Range$1)) {
          throw new TypeError('a Range is required');
        }

        return this.set.some(thisComparators => {
          return isSatisfiable(thisComparators, options) && range.set.some(rangeComparators => {
            return isSatisfiable(rangeComparators, options) && thisComparators.every(thisComparator => {
              return rangeComparators.every(rangeComparator => {
                return thisComparator.intersects(rangeComparator, options);
              });
            });
          });
        });
      } // if ANY of the sets match ALL of its comparators, then pass


      test(version) {
        if (!version) {
          return false;
        }

        if (typeof version === 'string') {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }

        for (let i = 0; i < this.set.length; i++) {
          if (testSet(this.set[i], version, this.options)) {
            return true;
          }
        }

        return false;
      }

    }

    var range = Range$1;
    const LRU = lruCache;
    const cache = new LRU({
      max: 1000
    });
    const parseOptions = parseOptions_1;
    const Comparator = comparator;
    const debug = debug_1;
    const SemVer = semver;
    const {
      re,
      t,
      comparatorTrimReplace,
      tildeTrimReplace,
      caretTrimReplace
    } = re$3.exports;

    const isNullSet = c => c.value === '<0.0.0-0';

    const isAny = c => c.value === ''; // take a set of comparators and determine whether there
    // exists a version which can satisfy it


    const isSatisfiable = (comparators, options) => {
      let result = true;
      const remainingComparators = comparators.slice();
      let testComparator = remainingComparators.pop();

      while (result && remainingComparators.length) {
        result = remainingComparators.every(otherComparator => {
          return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
      }

      return result;
    }; // comprised of xranges, tildes, stars, and gtlt's at this point.
    // already replaced the hyphen ranges
    // turn into a set of JUST comparators.


    const parseComparator = (comp, options) => {
      debug('comp', comp, options);
      comp = replaceCarets(comp, options);
      debug('caret', comp);
      comp = replaceTildes(comp, options);
      debug('tildes', comp);
      comp = replaceXRanges(comp, options);
      debug('xrange', comp);
      comp = replaceStars(comp, options);
      debug('stars', comp);
      return comp;
    };

    const isX = id => !id || id.toLowerCase() === 'x' || id === '*'; // ~, ~> --> * (any, kinda silly)
    // ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
    // ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
    // ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
    // ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
    // ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0


    const replaceTildes = (comp, options) => comp.trim().split(/\s+/).map(comp => {
      return replaceTilde(comp, options);
    }).join(' ');

    const replaceTilde = (comp, options) => {
      const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      return comp.replace(r, (_, M, m, p, pr) => {
        debug('tilde', comp, _, M, m, p, pr);
        let ret;

        if (isX(M)) {
          ret = '';
        } else if (isX(m)) {
          ret = ">=".concat(M, ".0.0 <").concat(+M + 1, ".0.0-0");
        } else if (isX(p)) {
          // ~1.2 == >=1.2.0 <1.3.0-0
          ret = ">=".concat(M, ".").concat(m, ".0 <").concat(M, ".").concat(+m + 1, ".0-0");
        } else if (pr) {
          debug('replaceTilde pr', pr);
          ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(M, ".").concat(+m + 1, ".0-0");
        } else {
          // ~1.2.3 == >=1.2.3 <1.3.0-0
          ret = ">=".concat(M, ".").concat(m, ".").concat(p, " <").concat(M, ".").concat(+m + 1, ".0-0");
        }

        debug('tilde return', ret);
        return ret;
      });
    }; // ^ --> * (any, kinda silly)
    // ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
    // ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
    // ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
    // ^1.2.3 --> >=1.2.3 <2.0.0-0
    // ^1.2.0 --> >=1.2.0 <2.0.0-0


    const replaceCarets = (comp, options) => comp.trim().split(/\s+/).map(comp => {
      return replaceCaret(comp, options);
    }).join(' ');

    const replaceCaret = (comp, options) => {
      debug('caret', comp, options);
      const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
      const z = options.includePrerelease ? '-0' : '';
      return comp.replace(r, (_, M, m, p, pr) => {
        debug('caret', comp, _, M, m, p, pr);
        let ret;

        if (isX(M)) {
          ret = '';
        } else if (isX(m)) {
          ret = ">=".concat(M, ".0.0").concat(z, " <").concat(+M + 1, ".0.0-0");
        } else if (isX(p)) {
          if (M === '0') {
            ret = ">=".concat(M, ".").concat(m, ".0").concat(z, " <").concat(M, ".").concat(+m + 1, ".0-0");
          } else {
            ret = ">=".concat(M, ".").concat(m, ".0").concat(z, " <").concat(+M + 1, ".0.0-0");
          }
        } else if (pr) {
          debug('replaceCaret pr', pr);

          if (M === '0') {
            if (m === '0') {
              ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(M, ".").concat(m, ".").concat(+p + 1, "-0");
            } else {
              ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(M, ".").concat(+m + 1, ".0-0");
            }
          } else {
            ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(+M + 1, ".0.0-0");
          }
        } else {
          debug('no pr');

          if (M === '0') {
            if (m === '0') {
              ret = ">=".concat(M, ".").concat(m, ".").concat(p).concat(z, " <").concat(M, ".").concat(m, ".").concat(+p + 1, "-0");
            } else {
              ret = ">=".concat(M, ".").concat(m, ".").concat(p).concat(z, " <").concat(M, ".").concat(+m + 1, ".0-0");
            }
          } else {
            ret = ">=".concat(M, ".").concat(m, ".").concat(p, " <").concat(+M + 1, ".0.0-0");
          }
        }

        debug('caret return', ret);
        return ret;
      });
    };

    const replaceXRanges = (comp, options) => {
      debug('replaceXRanges', comp, options);
      return comp.split(/\s+/).map(comp => {
        return replaceXRange(comp, options);
      }).join(' ');
    };

    const replaceXRange = (comp, options) => {
      comp = comp.trim();
      const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        debug('xRange', comp, ret, gtlt, M, m, p, pr);
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;

        if (gtlt === '=' && anyX) {
          gtlt = '';
        } // if we're including prereleases in the match, then we need
        // to fix this to -0, the lowest possible prerelease value


        pr = options.includePrerelease ? '-0' : '';

        if (xM) {
          if (gtlt === '>' || gtlt === '<') {
            // nothing is allowed
            ret = '<0.0.0-0';
          } else {
            // nothing is forbidden
            ret = '*';
          }
        } else if (gtlt && anyX) {
          // we know patch is an x, because we have any x at all.
          // replace X with 0
          if (xm) {
            m = 0;
          }

          p = 0;

          if (gtlt === '>') {
            // >1 => >=2.0.0
            // >1.2 => >=1.3.0
            gtlt = '>=';

            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === '<=') {
            // <=0.7.x is actually <0.8.0, since any 0.7.x should
            // pass.  Similarly, <=7.x is actually <8.0.0, etc.
            gtlt = '<';

            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }

          if (gtlt === '<') pr = '-0';
          ret = "".concat(gtlt + M, ".").concat(m, ".").concat(p).concat(pr);
        } else if (xm) {
          ret = ">=".concat(M, ".0.0").concat(pr, " <").concat(+M + 1, ".0.0-0");
        } else if (xp) {
          ret = ">=".concat(M, ".").concat(m, ".0").concat(pr, " <").concat(M, ".").concat(+m + 1, ".0-0");
        }

        debug('xRange return', ret);
        return ret;
      });
    }; // Because * is AND-ed with everything else in the comparator,
    // and '' means "any version", just remove the *s entirely.


    const replaceStars = (comp, options) => {
      debug('replaceStars', comp, options); // Looseness is ignored here.  star is always as loose as it gets!

      return comp.trim().replace(re[t.STAR], '');
    };

    const replaceGTE0 = (comp, options) => {
      debug('replaceGTE0', comp, options);
      return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '');
    }; // This function is passed to string.replace(re[t.HYPHENRANGE])
    // M, m, patch, prerelease, build
    // 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
    // 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
    // 1.2 - 3.4 => >=1.2.0 <3.5.0-0


    const hyphenReplace = incPr => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) => {
      if (isX(fM)) {
        from = '';
      } else if (isX(fm)) {
        from = ">=".concat(fM, ".0.0").concat(incPr ? '-0' : '');
      } else if (isX(fp)) {
        from = ">=".concat(fM, ".").concat(fm, ".0").concat(incPr ? '-0' : '');
      } else if (fpr) {
        from = ">=".concat(from);
      } else {
        from = ">=".concat(from).concat(incPr ? '-0' : '');
      }

      if (isX(tM)) {
        to = '';
      } else if (isX(tm)) {
        to = "<".concat(+tM + 1, ".0.0-0");
      } else if (isX(tp)) {
        to = "<".concat(tM, ".").concat(+tm + 1, ".0-0");
      } else if (tpr) {
        to = "<=".concat(tM, ".").concat(tm, ".").concat(tp, "-").concat(tpr);
      } else if (incPr) {
        to = "<".concat(tM, ".").concat(tm, ".").concat(+tp + 1, "-0");
      } else {
        to = "<=".concat(to);
      }

      return "".concat(from, " ").concat(to).trim();
    };

    const testSet = (set, version, options) => {
      for (let i = 0; i < set.length; i++) {
        if (!set[i].test(version)) {
          return false;
        }
      }

      if (version.prerelease.length && !options.includePrerelease) {
        // Find the set of versions that are allowed to have prereleases
        // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
        // That should allow `1.2.3-pr.2` to pass.
        // However, `1.2.4-alpha.notready` should NOT be allowed,
        // even though it's within the range set by the comparators.
        for (let i = 0; i < set.length; i++) {
          debug(set[i].semver);

          if (set[i].semver === Comparator.ANY) {
            continue;
          }

          if (set[i].semver.prerelease.length > 0) {
            const allowed = set[i].semver;

            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        } // Version has a -pre, but it's not one of the ones we like.


        return false;
      }

      return true;
    };

    const Range = range;

    const satisfies = (version, range, options) => {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }

      return range.test(version);
    };

    var satisfies_1 = satisfies;

    function adjustSpatial(item, encode, swap) {
      let t;

      if (encode.x2) {
        if (encode.x) {
          if (swap && item.x > item.x2) {
            t = item.x;
            item.x = item.x2;
            item.x2 = t;
          }

          item.width = item.x2 - item.x;
        } else {
          item.x = item.x2 - (item.width || 0);
        }
      }

      if (encode.xc) {
        item.x = item.xc - (item.width || 0) / 2;
      }

      if (encode.y2) {
        if (encode.y) {
          if (swap && item.y > item.y2) {
            t = item.y;
            item.y = item.y2;
            item.y2 = t;
          }

          item.height = item.y2 - item.y;
        } else {
          item.y = item.y2 - (item.height || 0);
        }
      }

      if (encode.yc) {
        item.y = item.yc - (item.height || 0) / 2;
      }
    }

    var Constants = {
      NaN: NaN,
      E: Math.E,
      LN2: Math.LN2,
      LN10: Math.LN10,
      LOG2E: Math.LOG2E,
      LOG10E: Math.LOG10E,
      PI: Math.PI,
      SQRT1_2: Math.SQRT1_2,
      SQRT2: Math.SQRT2,
      MIN_VALUE: Number.MIN_VALUE,
      MAX_VALUE: Number.MAX_VALUE
    };
    var Ops = {
      '*': (a, b) => a * b,
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '/': (a, b) => a / b,
      '%': (a, b) => a % b,
      '>': (a, b) => a > b,
      '<': (a, b) => a < b,
      '<=': (a, b) => a <= b,
      '>=': (a, b) => a >= b,
      '==': (a, b) => a == b,
      '!=': (a, b) => a != b,
      '===': (a, b) => a === b,
      '!==': (a, b) => a !== b,
      '&': (a, b) => a & b,
      '|': (a, b) => a | b,
      '^': (a, b) => a ^ b,
      '<<': (a, b) => a << b,
      '>>': (a, b) => a >> b,
      '>>>': (a, b) => a >>> b
    };
    var Unary = {
      '+': a => +a,
      '-': a => -a,
      '~': a => ~a,
      '!': a => !a
    };
    const slice = Array.prototype.slice;

    const apply = (m, args, cast) => {
      const obj = cast ? cast(args[0]) : args[0];
      return obj[m].apply(obj, slice.call(args, 1));
    };

    const datetime = (y, m, d, H, M, S, ms) => new Date(y, m || 0, d != null ? d : 1, H || 0, M || 0, S || 0, ms || 0);

    var Functions = {
      // math functions
      isNaN: Number.isNaN,
      isFinite: Number.isFinite,
      abs: Math.abs,
      acos: Math.acos,
      asin: Math.asin,
      atan: Math.atan,
      atan2: Math.atan2,
      ceil: Math.ceil,
      cos: Math.cos,
      exp: Math.exp,
      floor: Math.floor,
      log: Math.log,
      max: Math.max,
      min: Math.min,
      pow: Math.pow,
      random: Math.random,
      round: Math.round,
      sin: Math.sin,
      sqrt: Math.sqrt,
      tan: Math.tan,
      clamp: (a, b, c) => Math.max(b, Math.min(c, a)),
      // date functions
      now: Date.now,
      utc: Date.UTC,
      datetime: datetime,
      date: d => new Date(d).getDate(),
      day: d => new Date(d).getDay(),
      year: d => new Date(d).getFullYear(),
      month: d => new Date(d).getMonth(),
      hours: d => new Date(d).getHours(),
      minutes: d => new Date(d).getMinutes(),
      seconds: d => new Date(d).getSeconds(),
      milliseconds: d => new Date(d).getMilliseconds(),
      time: d => new Date(d).getTime(),
      timezoneoffset: d => new Date(d).getTimezoneOffset(),
      utcdate: d => new Date(d).getUTCDate(),
      utcday: d => new Date(d).getUTCDay(),
      utcyear: d => new Date(d).getUTCFullYear(),
      utcmonth: d => new Date(d).getUTCMonth(),
      utchours: d => new Date(d).getUTCHours(),
      utcminutes: d => new Date(d).getUTCMinutes(),
      utcseconds: d => new Date(d).getUTCSeconds(),
      utcmilliseconds: d => new Date(d).getUTCMilliseconds(),
      // sequence functions
      length: x => x.length,
      join: function () {
        return apply('join', arguments);
      },
      indexof: function () {
        return apply('indexOf', arguments);
      },
      lastindexof: function () {
        return apply('lastIndexOf', arguments);
      },
      slice: function () {
        return apply('slice', arguments);
      },
      reverse: x => x.slice().reverse(),
      // string functions
      parseFloat: parseFloat,
      parseInt: parseInt,
      upper: x => String(x).toUpperCase(),
      lower: x => String(x).toLowerCase(),
      substring: function () {
        return apply('substring', arguments, String);
      },
      split: function () {
        return apply('split', arguments, String);
      },
      replace: function () {
        return apply('replace', arguments, String);
      },
      trim: x => String(x).trim(),
      // regexp functions
      regexp: RegExp,
      test: (r, t) => RegExp(r).test(t)
    };
    const EventFunctions = ['view', 'item', 'group', 'xy', 'x', 'y'];
    const Visitors = {
      Literal: ($, n) => n.value,
      Identifier: ($, n) => {
        const id = n.name;
        return $.memberDepth > 0 ? id : id === 'datum' ? $.datum : id === 'event' ? $.event : id === 'item' ? $.item : Constants[id] || $.params['$' + id];
      },
      MemberExpression: ($, n) => {
        const d = !n.computed,
              o = $(n.object);
        if (d) $.memberDepth += 1;
        const p = $(n.property);
        if (d) $.memberDepth -= 1;
        return o[p];
      },
      CallExpression: ($, n) => {
        const args = n.arguments;
        let name = n.callee.name; // handle special internal functions used by encoders
        // re-route to corresponding standard function

        if (name.startsWith('_')) {
          name = name.slice(1);
        } // special case "if" due to conditional evaluation of branches


        return name === 'if' ? $(args[0]) ? $(args[1]) : $(args[2]) : ($.fn[name] || Functions[name]).apply($.fn, args.map($));
      },
      ArrayExpression: ($, n) => n.elements.map($),
      BinaryExpression: ($, n) => Ops[n.operator]($(n.left), $(n.right)),
      UnaryExpression: ($, n) => Unary[n.operator]($(n.argument)),
      ConditionalExpression: ($, n) => $(n.test) ? $(n.consequent) : $(n.alternate),
      LogicalExpression: ($, n) => n.operator === '&&' ? $(n.left) && $(n.right) : $(n.left) || $(n.right),
      ObjectExpression: ($, n) => n.properties.reduce((o, p) => {
        $.memberDepth += 1;
        const k = $(p.key);
        $.memberDepth -= 1;
        o[k] = $(p.value);
        return o;
      }, {})
    };

    function interpret(ast, fn, params, datum, event, item) {
      const $ = n => Visitors[n.type]($, n);

      $.memberDepth = 0;
      $.fn = Object.create(fn);
      $.params = params;
      $.datum = datum;
      $.event = event;
      $.item = item; // route event functions to annotated vega event context

      EventFunctions.forEach(f => $.fn[f] = function () {
        return event.vega[f](...arguments);
      });
      return $(ast);
    }

    var expression = {
      /**
       * Parse an expression used to update an operator value.
       */
      operator(ctx, expr) {
        const ast = expr.ast,
              fn = ctx.functions;
        return _ => interpret(ast, fn, _);
      },

      /**
       * Parse an expression provided as an operator parameter value.
       */
      parameter(ctx, expr) {
        const ast = expr.ast,
              fn = ctx.functions;
        return (datum, _) => interpret(ast, fn, _, datum);
      },

      /**
       * Parse an expression applied to an event stream.
       */
      event(ctx, expr) {
        const ast = expr.ast,
              fn = ctx.functions;
        return event => interpret(ast, fn, undefined, undefined, event);
      },

      /**
       * Parse an expression used to handle an event-driven operator update.
       */
      handler(ctx, expr) {
        const ast = expr.ast,
              fn = ctx.functions;
        return (_, event) => {
          const datum = event.item && event.item.datum;
          return interpret(ast, fn, _, datum, event);
        };
      },

      /**
       * Parse an expression that performs visual encoding.
       */
      encode(ctx, encode) {
        const {
          marktype,
          channels
        } = encode,
              fn = ctx.functions,
              swap = marktype === 'group' || marktype === 'image' || marktype === 'rect';
        return (item, _) => {
          const datum = item.datum;
          let m = 0,
              v;

          for (const name in channels) {
            v = interpret(channels[name].ast, fn, _, datum, undefined, item);

            if (item[name] !== v) {
              item[name] = v;
              m = 1;
            }
          }

          if (marktype !== 'rule') {
            adjustSpatial(item, channels, swap);
          }

          return m;
        };
      }

    };

    function e(e) {
      const [n, r] = /schema\/([\w-]+)\/([\w\.\-]+)\.json$/g.exec(e).slice(1, 3);
      return {
        library: n,
        version: r
      };
    }

    var name$1 = "vega-themes";
    var version$2 = "2.10.0";
    var description$1 = "Themes for stylized Vega and Vega-Lite visualizations.";
    var keywords$1 = ["vega", "vega-lite", "themes", "style"];
    var license$1 = "BSD-3-Clause";
    var author$1 = {
      name: "UW Interactive Data Lab",
      url: "https://idl.cs.washington.edu"
    };
    var contributors$1 = [{
      name: "Emily Gu",
      url: "https://github.com/emilygu"
    }, {
      name: "Arvind Satyanarayan",
      url: "http://arvindsatya.com"
    }, {
      name: "Jeffrey Heer",
      url: "https://idl.cs.washington.edu"
    }, {
      name: "Dominik Moritz",
      url: "https://www.domoritz.de"
    }];
    var main$1 = "build/vega-themes.js";
    var module$1 = "build/vega-themes.module.js";
    var unpkg$1 = "build/vega-themes.min.js";
    var jsdelivr$1 = "build/vega-themes.min.js";
    var types$1 = "build/vega-themes.module.d.ts";
    var repository$1 = {
      type: "git",
      url: "https://github.com/vega/vega-themes.git"
    };
    var files$1 = ["src", "build"];
    var scripts$1 = {
      prebuild: "yarn clean",
      build: "rollup -c",
      clean: "rimraf build && rimraf examples/build",
      "copy:data": "rsync -r node_modules/vega-datasets/data/* examples/data",
      "copy:build": "rsync -r build/* examples/build",
      "deploy:gh": "yarn build && mkdir -p examples/build && rsync -r build/* examples/build && gh-pages -d examples",
      prepublishOnly: "yarn clean && yarn build",
      preversion: "yarn lint",
      serve: "browser-sync start -s -f build examples --serveStatic examples",
      start: "yarn build && concurrently --kill-others -n Server,Rollup 'yarn serve' 'rollup -c -w'",
      prepare: "beemo create-config",
      eslintbase: "beemo eslint .",
      format: "yarn eslintbase --fix",
      lint: "yarn eslintbase"
    };
    var devDependencies$1 = {
      "@rollup/plugin-json": "^4.1.0",
      "@rollup/plugin-node-resolve": "^11.2.0",
      "@wessberg/rollup-plugin-ts": "^1.3.8",
      "browser-sync": "^2.26.14",
      concurrently: "^6.0.0",
      "gh-pages": "^3.1.0",
      rollup: "^2.39.1",
      "rollup-plugin-bundle-size": "^1.0.3",
      "rollup-plugin-terser": "^7.0.2",
      typescript: "^4.2.2",
      vega: "^5.19.1",
      "vega-lite": "^5.0.0",
      "vega-lite-dev-config": "^0.16.1"
    };
    var peerDependencies$1 = {
      vega: "*",
      "vega-lite": "*"
    };
    var pkg$1 = {
      name: name$1,
      version: version$2,
      description: description$1,
      keywords: keywords$1,
      license: license$1,
      author: author$1,
      contributors: contributors$1,
      main: main$1,
      module: module$1,
      unpkg: unpkg$1,
      jsdelivr: jsdelivr$1,
      types: types$1,
      repository: repository$1,
      files: files$1,
      scripts: scripts$1,
      devDependencies: devDependencies$1,
      peerDependencies: peerDependencies$1
    };
    const lightColor = '#fff';
    const medColor = '#888';
    const darkTheme = {
      background: '#333',
      title: {
        color: lightColor,
        subtitleColor: lightColor
      },
      style: {
        'guide-label': {
          fill: lightColor
        },
        'guide-title': {
          fill: lightColor
        }
      },
      axis: {
        domainColor: lightColor,
        gridColor: medColor,
        tickColor: lightColor
      }
    };
    const markColor = '#4572a7';
    const excelTheme = {
      background: '#fff',
      arc: {
        fill: markColor
      },
      area: {
        fill: markColor
      },
      line: {
        stroke: markColor,
        strokeWidth: 2
      },
      path: {
        stroke: markColor
      },
      rect: {
        fill: markColor
      },
      shape: {
        stroke: markColor
      },
      symbol: {
        fill: markColor,
        strokeWidth: 1.5,
        size: 50
      },
      axis: {
        bandPosition: 0.5,
        grid: true,
        gridColor: '#000000',
        gridOpacity: 1,
        gridWidth: 0.5,
        labelPadding: 10,
        tickSize: 5,
        tickWidth: 0.5
      },
      axisBand: {
        grid: false,
        tickExtra: true
      },
      legend: {
        labelBaseline: 'middle',
        labelFontSize: 11,
        symbolSize: 50,
        symbolType: 'square'
      },
      range: {
        category: ['#4572a7', '#aa4643', '#8aa453', '#71598e', '#4598ae', '#d98445', '#94aace', '#d09393', '#b9cc98', '#a99cbc']
      }
    };
    const markColor$1 = '#30a2da';
    const axisColor = '#cbcbcb';
    const guideLabelColor = '#999';
    const guideTitleColor = '#333';
    const backgroundColor = '#f0f0f0';
    const blackTitle = '#333';
    const fiveThirtyEightTheme = {
      arc: {
        fill: markColor$1
      },
      area: {
        fill: markColor$1
      },
      axis: {
        domainColor: axisColor,
        grid: true,
        gridColor: axisColor,
        gridWidth: 1,
        labelColor: guideLabelColor,
        labelFontSize: 10,
        titleColor: guideTitleColor,
        tickColor: axisColor,
        tickSize: 10,
        titleFontSize: 14,
        titlePadding: 10,
        labelPadding: 4
      },
      axisBand: {
        grid: false
      },
      background: backgroundColor,
      group: {
        fill: backgroundColor
      },
      legend: {
        labelColor: blackTitle,
        labelFontSize: 11,
        padding: 1,
        symbolSize: 30,
        symbolType: 'square',
        titleColor: blackTitle,
        titleFontSize: 14,
        titlePadding: 10
      },
      line: {
        stroke: markColor$1,
        strokeWidth: 2
      },
      path: {
        stroke: markColor$1,
        strokeWidth: 0.5
      },
      rect: {
        fill: markColor$1
      },
      range: {
        category: ['#30a2da', '#fc4f30', '#e5ae38', '#6d904f', '#8b8b8b', '#b96db8', '#ff9e27', '#56cc60', '#52d2ca', '#52689e', '#545454', '#9fe4f8'],
        diverging: ['#cc0020', '#e77866', '#f6e7e1', '#d6e8ed', '#91bfd9', '#1d78b5'],
        heatmap: ['#d6e8ed', '#cee0e5', '#91bfd9', '#549cc6', '#1d78b5']
      },
      point: {
        filled: true,
        shape: 'circle'
      },
      shape: {
        stroke: markColor$1
      },
      bar: {
        binSpacing: 2,
        fill: markColor$1,
        stroke: null
      },
      title: {
        anchor: 'start',
        fontSize: 24,
        fontWeight: 600,
        offset: 20
      }
    };
    const markColor$2 = '#000';
    const ggplot2Theme = {
      group: {
        fill: '#e5e5e5'
      },
      arc: {
        fill: markColor$2
      },
      area: {
        fill: markColor$2
      },
      line: {
        stroke: markColor$2
      },
      path: {
        stroke: markColor$2
      },
      rect: {
        fill: markColor$2
      },
      shape: {
        stroke: markColor$2
      },
      symbol: {
        fill: markColor$2,
        size: 40
      },
      axis: {
        domain: false,
        grid: true,
        gridColor: '#FFFFFF',
        gridOpacity: 1,
        labelColor: '#7F7F7F',
        labelPadding: 4,
        tickColor: '#7F7F7F',
        tickSize: 5.67,
        titleFontSize: 16,
        titleFontWeight: 'normal'
      },
      legend: {
        labelBaseline: 'middle',
        labelFontSize: 11,
        symbolSize: 40
      },
      range: {
        category: ['#000000', '#7F7F7F', '#1A1A1A', '#999999', '#333333', '#B0B0B0', '#4D4D4D', '#C9C9C9', '#666666', '#DCDCDC']
      }
    };
    const headlineFontSize = 22;
    const headlineFontWeight = 'normal';
    const labelFont = 'Benton Gothic, sans-serif';
    const labelFontSize = 11.5;
    const labelFontWeight = 'normal';
    const markColor$3 = '#82c6df'; // const markHighlight = '#006d8f';
    // const markDemocrat = '#5789b8';
    // const markRepublican = '#d94f54';

    const titleFont = 'Benton Gothic Bold, sans-serif';
    const titleFontWeight = 'normal';
    const titleFontSize = 13;
    const colorSchemes = {
      'category-6': ['#ec8431', '#829eb1', '#c89d29', '#3580b1', '#adc839', '#ab7fb4'],
      'fire-7': ['#fbf2c7', '#f9e39c', '#f8d36e', '#f4bb6a', '#e68a4f', '#d15a40', '#ab4232'],
      'fireandice-6': ['#e68a4f', '#f4bb6a', '#f9e39c', '#dadfe2', '#a6b7c6', '#849eae'],
      'ice-7': ['#edefee', '#dadfe2', '#c4ccd2', '#a6b7c6', '#849eae', '#607785', '#47525d']
    };
    const latimesTheme = {
      background: '#ffffff',
      title: {
        anchor: 'start',
        color: '#000000',
        font: titleFont,
        fontSize: headlineFontSize,
        fontWeight: headlineFontWeight
      },
      arc: {
        fill: markColor$3
      },
      area: {
        fill: markColor$3
      },
      line: {
        stroke: markColor$3,
        strokeWidth: 2
      },
      path: {
        stroke: markColor$3
      },
      rect: {
        fill: markColor$3
      },
      shape: {
        stroke: markColor$3
      },
      symbol: {
        fill: markColor$3,
        size: 30
      },
      axis: {
        labelFont,
        labelFontSize,
        labelFontWeight,
        titleFont,
        titleFontSize,
        titleFontWeight
      },
      axisX: {
        labelAngle: 0,
        labelPadding: 4,
        tickSize: 3
      },
      axisY: {
        labelBaseline: 'middle',
        maxExtent: 45,
        minExtent: 45,
        tickSize: 2,
        titleAlign: 'left',
        titleAngle: 0,
        titleX: -45,
        titleY: -11
      },
      legend: {
        labelFont,
        labelFontSize,
        symbolType: 'square',
        titleFont,
        titleFontSize,
        titleFontWeight
      },
      range: {
        category: colorSchemes['category-6'],
        diverging: colorSchemes['fireandice-6'],
        heatmap: colorSchemes['fire-7'],
        ordinal: colorSchemes['fire-7'],
        ramp: colorSchemes['fire-7']
      }
    };
    const markColor$4 = '#ab5787';
    const axisColor$1 = '#979797';
    const quartzTheme = {
      background: '#f9f9f9',
      arc: {
        fill: markColor$4
      },
      area: {
        fill: markColor$4
      },
      line: {
        stroke: markColor$4
      },
      path: {
        stroke: markColor$4
      },
      rect: {
        fill: markColor$4
      },
      shape: {
        stroke: markColor$4
      },
      symbol: {
        fill: markColor$4,
        size: 30
      },
      axis: {
        domainColor: axisColor$1,
        domainWidth: 0.5,
        gridWidth: 0.2,
        labelColor: axisColor$1,
        tickColor: axisColor$1,
        tickWidth: 0.2,
        titleColor: axisColor$1
      },
      axisBand: {
        grid: false
      },
      axisX: {
        grid: true,
        tickSize: 10
      },
      axisY: {
        domain: false,
        grid: true,
        tickSize: 0
      },
      legend: {
        labelFontSize: 11,
        padding: 1,
        symbolSize: 30,
        symbolType: 'square'
      },
      range: {
        category: ['#ab5787', '#51b2e5', '#703c5c', '#168dd9', '#d190b6', '#00609f', '#d365ba', '#154866', '#666666', '#c4c4c4']
      }
    };
    const markColor$5 = '#3e5c69';
    const voxTheme = {
      background: '#fff',
      arc: {
        fill: markColor$5
      },
      area: {
        fill: markColor$5
      },
      line: {
        stroke: markColor$5
      },
      path: {
        stroke: markColor$5
      },
      rect: {
        fill: markColor$5
      },
      shape: {
        stroke: markColor$5
      },
      symbol: {
        fill: markColor$5
      },
      axis: {
        domainWidth: 0.5,
        grid: true,
        labelPadding: 2,
        tickSize: 5,
        tickWidth: 0.5,
        titleFontWeight: 'normal'
      },
      axisBand: {
        grid: false
      },
      axisX: {
        gridWidth: 0.2
      },
      axisY: {
        gridDash: [3],
        gridWidth: 0.4
      },
      legend: {
        labelFontSize: 11,
        padding: 1,
        symbolType: 'square'
      },
      range: {
        category: ['#3e5c69', '#6793a6', '#182429', '#0570b0', '#3690c0', '#74a9cf', '#a6bddb', '#e2ddf2']
      }
    };
    const markColor$6 = '#1696d2';
    const axisColor$2 = '#000000';
    const backgroundColor$1 = '#FFFFFF';
    const font = 'Lato';
    const labelFont$1 = 'Lato';
    const sourceFont = 'Lato';
    const gridColor = '#DEDDDD';
    const titleFontSize$1 = 18;
    const colorSchemes$1 = {
      'main-colors': ['#1696d2', '#d2d2d2', '#000000', '#fdbf11', '#ec008b', '#55b748', '#5c5859', '#db2b27'],
      'shades-blue': ['#CFE8F3', '#A2D4EC', '#73BFE2', '#46ABDB', '#1696D2', '#12719E', '#0A4C6A', '#062635'],
      'shades-gray': ['#F5F5F5', '#ECECEC', '#E3E3E3', '#DCDBDB', '#D2D2D2', '#9D9D9D', '#696969', '#353535'],
      'shades-yellow': ['#FFF2CF', '#FCE39E', '#FDD870', '#FCCB41', '#FDBF11', '#E88E2D', '#CA5800', '#843215'],
      'shades-magenta': ['#F5CBDF', '#EB99C2', '#E46AA7', '#E54096', '#EC008B', '#AF1F6B', '#761548', '#351123'],
      'shades-green': ['#DCEDD9', '#BCDEB4', '#98CF90', '#78C26D', '#55B748', '#408941', '#2C5C2D', '#1A2E19'],
      'shades-black': ['#D5D5D4', '#ADABAC', '#848081', '#5C5859', '#332D2F', '#262223', '#1A1717', '#0E0C0D'],
      'shades-red': ['#F8D5D4', '#F1AAA9', '#E9807D', '#E25552', '#DB2B27', '#A4201D', '#6E1614', '#370B0A'],
      'one-group': ['#1696d2', '#000000'],
      'two-groups-cat-1': ['#1696d2', '#000000'],
      'two-groups-cat-2': ['#1696d2', '#fdbf11'],
      'two-groups-cat-3': ['#1696d2', '#db2b27'],
      'two-groups-seq': ['#a2d4ec', '#1696d2'],
      'three-groups-cat': ['#1696d2', '#fdbf11', '#000000'],
      'three-groups-seq': ['#a2d4ec', '#1696d2', '#0a4c6a'],
      'four-groups-cat-1': ['#000000', '#d2d2d2', '#fdbf11', '#1696d2'],
      'four-groups-cat-2': ['#1696d2', '#ec0008b', '#fdbf11', '#5c5859'],
      'four-groups-seq': ['#cfe8f3', '#73bf42', '#1696d2', '#0a4c6a'],
      'five-groups-cat-1': ['#1696d2', '#fdbf11', '#d2d2d2', '#ec008b', '#000000'],
      'five-groups-cat-2': ['#1696d2', '#0a4c6a', '#d2d2d2', '#fdbf11', '#332d2f'],
      'five-groups-seq': ['#cfe8f3', '#73bf42', '#1696d2', '#0a4c6a', '#000000'],
      'six-groups-cat-1': ['#1696d2', '#ec008b', '#fdbf11', '#000000', '#d2d2d2', '#55b748'],
      'six-groups-cat-2': ['#1696d2', '#d2d2d2', '#ec008b', '#fdbf11', '#332d2f', '#0a4c6a'],
      'six-groups-seq': ['#cfe8f3', '#a2d4ec', '#73bfe2', '#46abdb', '#1696d2', '#12719e'],
      'diverging-colors': ['#ca5800', '#fdbf11', '#fdd870', '#fff2cf', '#cfe8f3', '#73bfe2', '#1696d2', '#0a4c6a']
    };
    const urbanInstituteTheme = {
      background: backgroundColor$1,
      title: {
        anchor: 'start',
        fontSize: titleFontSize$1,
        font: font
      },
      axisX: {
        domain: true,
        domainColor: axisColor$2,
        domainWidth: 1,
        grid: false,
        labelFontSize: 12,
        labelFont: labelFont$1,
        labelAngle: 0,
        tickColor: axisColor$2,
        tickSize: 5,
        titleFontSize: 12,
        titlePadding: 10,
        titleFont: font
      },
      axisY: {
        domain: false,
        domainWidth: 1,
        grid: true,
        gridColor: gridColor,
        gridWidth: 1,
        labelFontSize: 12,
        labelFont: labelFont$1,
        labelPadding: 8,
        ticks: false,
        titleFontSize: 12,
        titlePadding: 10,
        titleFont: font,
        titleAngle: 0,
        titleY: -10,
        titleX: 18
      },
      legend: {
        labelFontSize: 12,
        labelFont: labelFont$1,
        symbolSize: 100,
        titleFontSize: 12,
        titlePadding: 10,
        titleFont: font,
        orient: 'right',
        offset: 10
      },
      view: {
        stroke: 'transparent'
      },
      range: {
        category: colorSchemes$1['six-groups-cat-1'],
        diverging: colorSchemes$1['diverging-colors'],
        heatmap: colorSchemes$1['diverging-colors'],
        ordinal: colorSchemes$1['six-groups-seq'],
        ramp: colorSchemes$1['shades-blue']
      },
      area: {
        fill: markColor$6
      },
      rect: {
        fill: markColor$6
      },
      line: {
        color: markColor$6,
        stroke: markColor$6,
        strokeWidth: 5
      },
      trail: {
        color: markColor$6,
        stroke: markColor$6,
        strokeWidth: 0,
        size: 1
      },
      path: {
        stroke: markColor$6,
        strokeWidth: 0.5
      },
      point: {
        filled: true
      },
      text: {
        font: sourceFont,
        color: markColor$6,
        fontSize: 11,
        align: 'center',
        fontWeight: 400,
        size: 11
      },
      style: {
        bar: {
          fill: markColor$6,
          stroke: null
        }
      },
      arc: {
        fill: markColor$6
      },
      shape: {
        stroke: markColor$6
      },
      symbol: {
        fill: markColor$6,
        size: 30
      }
    };
    /**
     * Copyright 2020 Google LLC.
     *
     * Use of this source code is governed by a BSD-style
     * license that can be found in the LICENSE file or at
     * https://developers.google.com/open-source/licenses/bsd
     */

    const markColor$7 = '#3366CC';
    const gridColor$1 = '#ccc';
    const defaultFont = 'Arial, sans-serif';
    const googlechartsTheme = {
      arc: {
        fill: markColor$7
      },
      area: {
        fill: markColor$7
      },
      path: {
        stroke: markColor$7
      },
      rect: {
        fill: markColor$7
      },
      shape: {
        stroke: markColor$7
      },
      symbol: {
        stroke: markColor$7
      },
      circle: {
        fill: markColor$7
      },
      background: '#fff',
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      },
      style: {
        'guide-label': {
          font: defaultFont,
          fontSize: 12
        },
        'guide-title': {
          font: defaultFont,
          fontSize: 12
        },
        'group-title': {
          font: defaultFont,
          fontSize: 12
        }
      },
      title: {
        font: defaultFont,
        fontSize: 14,
        fontWeight: 'bold',
        dy: -3,
        anchor: 'start'
      },
      axis: {
        gridColor: gridColor$1,
        tickColor: gridColor$1,
        domain: false,
        grid: true
      },
      range: {
        category: ['#4285F4', '#DB4437', '#F4B400', '#0F9D58', '#AB47BC', '#00ACC1', '#FF7043', '#9E9D24', '#5C6BC0', '#F06292', '#00796B', '#C2185B'],
        heatmap: ['#c6dafc', '#5e97f6', '#2a56c6']
      }
    };
    const version$1$1 = pkg$1.version;

    var themes = /*#__PURE__*/Object.freeze({
        __proto__: null,
        dark: darkTheme,
        excel: excelTheme,
        fivethirtyeight: fiveThirtyEightTheme,
        ggplot2: ggplot2Theme,
        googlecharts: googlechartsTheme,
        latimes: latimesTheme,
        quartz: quartzTheme,
        urbaninstitute: urbanInstituteTheme,
        version: version$1$1,
        vox: voxTheme
    });

    function accessor(fn, fields, name) {
      fn.fields = fields || [];
      fn.fname = name;
      return fn;
    }

    function getter(path) {
      return path.length === 1 ? get1(path[0]) : getN(path);
    }

    const get1 = field => function (obj) {
      return obj[field];
    };

    const getN = path => {
      const len = path.length;
      return function (obj) {
        for (let i = 0; i < len; ++i) {
          obj = obj[path[i]];
        }

        return obj;
      };
    };

    function error(message) {
      throw Error(message);
    }

    function splitAccessPath(p) {
      const path = [],
            n = p.length;
      let q = null,
          b = 0,
          s = '',
          i,
          j,
          c;
      p = p + '';

      function push() {
        path.push(s + p.substring(i, j));
        s = '';
        i = j + 1;
      }

      for (i = j = 0; j < n; ++j) {
        c = p[j];

        if (c === '\\') {
          s += p.substring(i, j);
          s += p.substring(++j, ++j);
          i = j;
        } else if (c === q) {
          push();
          q = null;
          b = -1;
        } else if (q) {
          continue;
        } else if (i === b && c === '"') {
          i = j + 1;
          q = c;
        } else if (i === b && c === "'") {
          i = j + 1;
          q = c;
        } else if (c === '.' && !b) {
          if (j > i) {
            push();
          } else {
            i = j + 1;
          }
        } else if (c === '[') {
          if (j > i) push();
          b = i = j + 1;
        } else if (c === ']') {
          if (!b) error('Access path missing open bracket: ' + p);
          if (b > 0) push();
          b = 0;
          i = j + 1;
        }
      }

      if (b) error('Access path missing closing bracket: ' + p);
      if (q) error('Access path missing closing quote: ' + p);

      if (j > i) {
        j++;
        push();
      }

      return path;
    }

    function field(field, name, opt) {
      const path = splitAccessPath(field);
      field = path.length === 1 ? path[0] : field;
      return accessor((opt && opt.get || getter)(path), [field], name || field);
    }

    field('id');
    accessor(_ => _, [], 'identity');
    accessor(() => 0, [], 'zero');
    accessor(() => 1, [], 'one');
    accessor(() => true, [], 'true');
    accessor(() => false, [], 'false');

    var isArray = Array.isArray;

    function isObject(_) {
      return _ === Object(_);
    }

    function isString(_) {
      return typeof _ === 'string';
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __rest(s, e) {
      var t = {};

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

      if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
      return t;
    }
    /**
     * Format the value to be shown in the tooltip.
     *
     * @param value The value to show in the tooltip.
     * @param valueToHtml Function to convert a single cell value to an HTML string
     */


    function formatValue(value, valueToHtml, maxDepth) {
      if (isArray(value)) {
        return "[".concat(value.map(v => valueToHtml(isString(v) ? v : stringify(v, maxDepth))).join(', '), "]");
      }

      if (isObject(value)) {
        let content = '';

        const _a = value,
              {
          title,
          image
        } = _a,
              rest = __rest(_a, ["title", "image"]);

        if (title) {
          content += "<h2>".concat(valueToHtml(title), "</h2>");
        }

        if (image) {
          content += "<img src=\"".concat(valueToHtml(image), "\">");
        }

        const keys = Object.keys(rest);

        if (keys.length > 0) {
          content += '<table>';

          for (const key of keys) {
            let val = rest[key]; // ignore undefined properties

            if (val === undefined) {
              continue;
            }

            if (isObject(val)) {
              val = stringify(val, maxDepth);
            }

            content += "<tr><td class=\"key\">".concat(valueToHtml(key), ":</td><td class=\"value\">").concat(valueToHtml(val), "</td></tr>");
          }

          content += "</table>";
        }

        return content || '{}'; // show empty object if there are no properties
      }

      return valueToHtml(value);
    }

    function replacer(maxDepth) {
      const stack = [];
      return function (key, value) {
        if (typeof value !== 'object' || value === null) {
          return value;
        }

        const pos = stack.indexOf(this) + 1;
        stack.length = pos;

        if (stack.length > maxDepth) {
          return '[Object]';
        }

        if (stack.indexOf(value) >= 0) {
          return '[Circular]';
        }

        stack.push(value);
        return value;
      };
    }
    /**
     * Stringify any JS object to valid JSON
     */


    function stringify(obj, maxDepth) {
      return JSON.stringify(obj, replacer(maxDepth));
    } // generated with build-style.sh


    var defaultStyle = "#vg-tooltip-element {\n  visibility: hidden;\n  padding: 8px;\n  position: fixed;\n  z-index: 1000;\n  font-family: sans-serif;\n  font-size: 11px;\n  border-radius: 3px;\n  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);\n  /* The default theme is the light theme. */\n  background-color: rgba(255, 255, 255, 0.95);\n  border: 1px solid #d9d9d9;\n  color: black; }\n  #vg-tooltip-element.visible {\n    visibility: visible; }\n  #vg-tooltip-element h2 {\n    margin-top: 0;\n    margin-bottom: 10px;\n    font-size: 13px; }\n  #vg-tooltip-element img {\n    max-width: 200px;\n    max-height: 200px; }\n  #vg-tooltip-element table {\n    border-spacing: 0; }\n    #vg-tooltip-element table tr {\n      border: none; }\n      #vg-tooltip-element table tr td {\n        overflow: hidden;\n        text-overflow: ellipsis;\n        padding-top: 2px;\n        padding-bottom: 2px; }\n        #vg-tooltip-element table tr td.key {\n          color: #808080;\n          max-width: 150px;\n          text-align: right;\n          padding-right: 4px; }\n        #vg-tooltip-element table tr td.value {\n          display: block;\n          max-width: 300px;\n          max-height: 7em;\n          text-align: left; }\n  #vg-tooltip-element.dark-theme {\n    background-color: rgba(32, 32, 32, 0.9);\n    border: 1px solid #f5f5f5;\n    color: white; }\n    #vg-tooltip-element.dark-theme td.key {\n      color: #bfbfbf; }\n";
    const EL_ID = 'vg-tooltip-element';
    const DEFAULT_OPTIONS = {
      /**
       * X offset.
       */
      offsetX: 10,

      /**
       * Y offset.
       */
      offsetY: 10,

      /**
       * ID of the tooltip element.
       */
      id: EL_ID,

      /**
       * ID of the tooltip CSS style.
       */
      styleId: 'vega-tooltip-style',

      /**
       * The name of the theme. You can use the CSS class called [THEME]-theme to style the tooltips.
       *
       * There are two predefined themes: "light" (default) and "dark".
       */
      theme: 'light',

      /**
       * Do not use the default styles provided by Vega Tooltip. If you enable this option, you need to use your own styles. It is not necessary to disable the default style when using a custom theme.
       */
      disableDefaultStyle: false,

      /**
       * HTML sanitizer function that removes dangerous HTML to prevent XSS.
       *
       * This should be a function from string to string. You may replace it with a formatter such as a markdown formatter.
       */
      sanitize: escapeHTML,

      /**
       * The maximum recursion depth when printing objects in the tooltip.
       */
      maxDepth: 2,

      /**
       * A function to customize the rendered HTML of the tooltip.
       * @param value A value string, or object of value strings keyed by field
       * @param sanitize The `sanitize` function from `options.sanitize`
       * @returns {string} The returned string will become the `innerHTML` of the tooltip element
       */
      formatTooltip: formatValue
    };
    /**
     * Escape special HTML characters.
     *
     * @param value A value to convert to string and HTML-escape.
     */

    function escapeHTML(value) {
      return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;');
    }

    function createDefaultStyle(id) {
      // Just in case this id comes from a user, ensure these is no security issues
      if (!/^[A-Za-z]+[-:.\w]*$/.test(id)) {
        throw new Error('Invalid HTML ID');
      }

      return defaultStyle.toString().replace(EL_ID, id);
    }
    /**
     * Position the tooltip
     *
     * @param event The mouse event.
     * @param tooltipBox
     * @param offsetX Horizontal offset.
     * @param offsetY Vertical offset.
     */


    function calculatePosition(event, tooltipBox, offsetX, offsetY) {
      let x = event.clientX + offsetX;

      if (x + tooltipBox.width > window.innerWidth) {
        x = +event.clientX - offsetX - tooltipBox.width;
      }

      let y = event.clientY + offsetY;

      if (y + tooltipBox.height > window.innerHeight) {
        y = +event.clientY - offsetY - tooltipBox.height;
      }

      return {
        x,
        y
      };
    }
    /**
     * The tooltip handler class.
     */


    class Handler {
      /**
       * Create the tooltip handler and initialize the element and style.
       *
       * @param options Tooltip Options
       */
      constructor(options) {
        this.options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
        const elementId = this.options.id;
        this.el = null; // bind this to call

        this.call = this.tooltipHandler.bind(this); // prepend a default stylesheet for tooltips to the head

        if (!this.options.disableDefaultStyle && !document.getElementById(this.options.styleId)) {
          const style = document.createElement('style');
          style.setAttribute('id', this.options.styleId);
          style.innerHTML = createDefaultStyle(elementId);
          const head = document.head;

          if (head.childNodes.length > 0) {
            head.insertBefore(style, head.childNodes[0]);
          } else {
            head.appendChild(style);
          }
        }
      }
      /**
       * The tooltip handler function.
       */


      tooltipHandler(handler, event, item, value) {
        // console.log(handler, event, item, value);
        var _a; // append a div element that we use as a tooltip unless it already exists


        this.el = document.getElementById(this.options.id);

        if (!this.el) {
          this.el = document.createElement('div');
          this.el.setAttribute('id', this.options.id);
          this.el.classList.add('vg-tooltip');
          document.body.appendChild(this.el);
        }

        const tooltipContainer = (_a = document.fullscreenElement) !== null && _a !== void 0 ? _a : document.body;
        tooltipContainer.appendChild(this.el); // hide tooltip for null, undefined, or empty string values

        if (value == null || value === '') {
          this.el.classList.remove('visible', "".concat(this.options.theme, "-theme"));
          return;
        } // set the tooltip content


        this.el.innerHTML = this.options.formatTooltip(value, this.options.sanitize, this.options.maxDepth); // make the tooltip visible

        this.el.classList.add('visible', "".concat(this.options.theme, "-theme"));
        const {
          x,
          y
        } = calculatePosition(event, this.el.getBoundingClientRect(), this.options.offsetX, this.options.offsetY);
        this.el.setAttribute('style', "top: ".concat(y, "px; left: ").concat(x, "px"));
      }

    }

    /**
     * Open editor url in a new window, and pass a message.
     */
    function post (window, url, data) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const editor = window.open(url);
      const wait = 10000;
      const step = 250;
      const {
        origin
      } = new URL(url); // eslint-disable-next-line no-bitwise

      let count = ~~(wait / step);

      function listen(evt) {
        if (evt.source === editor) {
          count = 0;
          window.removeEventListener('message', listen, false);
        }
      }

      window.addEventListener('message', listen, false); // send message
      // periodically resend until ack received or timeout

      function send() {
        if (count <= 0) {
          return;
        }

        editor.postMessage(data, origin);
        setTimeout(send, step);
        count -= 1;
      }

      setTimeout(send, step);
    }

    // generated with build-style.sh
    var embedStyle = ".vega-embed {\n  position: relative;\n  display: inline-block;\n  box-sizing: border-box;\n}\n.vega-embed.has-actions {\n  padding-right: 38px;\n}\n.vega-embed details:not([open]) > :not(summary) {\n  display: none !important;\n}\n.vega-embed summary {\n  list-style: none;\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 6px;\n  z-index: 1000;\n  background: white;\n  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);\n  color: #1b1e23;\n  border: 1px solid #aaa;\n  border-radius: 999px;\n  opacity: 0.2;\n  transition: opacity 0.4s ease-in;\n  outline: none;\n  cursor: pointer;\n  line-height: 0px;\n}\n.vega-embed summary::-webkit-details-marker {\n  display: none;\n}\n.vega-embed summary:active {\n  box-shadow: #aaa 0px 0px 0px 1px inset;\n}\n.vega-embed summary svg {\n  width: 14px;\n  height: 14px;\n}\n.vega-embed details[open] summary {\n  opacity: 0.7;\n}\n.vega-embed:hover summary, .vega-embed:focus summary {\n  opacity: 1 !important;\n  transition: opacity 0.2s ease;\n}\n.vega-embed .vega-actions {\n  position: absolute;\n  z-index: 1001;\n  top: 35px;\n  right: -9px;\n  display: flex;\n  flex-direction: column;\n  padding-bottom: 8px;\n  padding-top: 8px;\n  border-radius: 4px;\n  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);\n  border: 1px solid #d9d9d9;\n  background: white;\n  animation-duration: 0.15s;\n  animation-name: scale-in;\n  animation-timing-function: cubic-bezier(0.2, 0, 0.13, 1.5);\n  text-align: left;\n}\n.vega-embed .vega-actions a {\n  padding: 8px 16px;\n  font-family: sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  white-space: nowrap;\n  color: #434a56;\n  text-decoration: none;\n}\n.vega-embed .vega-actions a:hover {\n  background-color: #f7f7f9;\n  color: black;\n}\n.vega-embed .vega-actions::before, .vega-embed .vega-actions::after {\n  content: \"\";\n  display: inline-block;\n  position: absolute;\n}\n.vega-embed .vega-actions::before {\n  left: auto;\n  right: 14px;\n  top: -16px;\n  border: 8px solid #0000;\n  border-bottom-color: #d9d9d9;\n}\n.vega-embed .vega-actions::after {\n  left: auto;\n  right: 15px;\n  top: -14px;\n  border: 7px solid #0000;\n  border-bottom-color: #fff;\n}\n.vega-embed .chart-wrapper.fit-x {\n  width: 100%;\n}\n.vega-embed .chart-wrapper.fit-y {\n  height: 100%;\n}\n\n.vega-embed-wrapper {\n  max-width: 100%;\n  overflow: auto;\n  padding-right: 14px;\n}\n\n@keyframes scale-in {\n  from {\n    opacity: 0;\n    transform: scale(0.6);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n";

    if (!String.prototype.startsWith) {
      // eslint-disable-next-line no-extend-native,func-names
      String.prototype.startsWith = function (search, pos) {
        return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
      };
    }

    function isURL(s) {
      return s.startsWith('http://') || s.startsWith('https://') || s.startsWith('//');
    }
    function mergeDeep(dest) {
      for (var _len = arguments.length, src = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        src[_key - 1] = arguments[_key];
      }

      for (const s of src) {
        deepMerge_(dest, s);
      }

      return dest;
    }

    function deepMerge_(dest, src) {
      for (const property of Object.keys(src)) {
        vegaImport.writeConfig(dest, property, src[property], true);
      }
    }

    var name = "vega-embed";
    var version$1 = "6.20.2";
    var description = "Publish Vega visualizations as embedded web components.";
    var keywords = ["vega", "data", "visualization", "component", "embed"];
    var repository = {
      type: "git",
      url: "http://github.com/vega/vega-embed.git"
    };
    var author = {
      name: "UW Interactive Data Lab",
      url: "http://idl.cs.washington.edu"
    };
    var contributors = [{
      name: "Dominik Moritz",
      url: "https://www.domoritz.de"
    }];
    var bugs = {
      url: "https://github.com/vega/vega-embed/issues"
    };
    var homepage = "https://github.com/vega/vega-embed#readme";
    var license = "BSD-3-Clause";
    var main = "build/vega-embed.js";
    var module = "build/vega-embed.module.js";
    var unpkg = "build/vega-embed.min.js";
    var jsdelivr = "build/vega-embed.min.js";
    var types = "build/vega-embed.module.d.ts";
    var files = ["src", "build", "build-es5"];
    var devDependencies = {
      "@auto-it/conventional-commits": "^10.32.2",
      "@auto-it/first-time-contributor": "^10.32.2",
      "@rollup/plugin-commonjs": "21.0.1",
      "@rollup/plugin-json": "^4.1.0",
      "@rollup/plugin-node-resolve": "^13.0.6",
      "@types/semver": "^7.3.9",
      "rollup-plugin-ts": "^1.4.7",
      auto: "^10.32.2",
      "browser-sync": "^2.27.7",
      concurrently: "^6.4.0",
      "del-cli": "^4.0.1",
      "jest-canvas-mock": "^2.3.1",
      sass: "^1.43.4",
      "rollup-plugin-bundle-size": "^1.0.3",
      "rollup-plugin-terser": "^7.0.2",
      rollup: "2.60.0",
      typescript: "^4.4.4",
      "vega-lite-dev-config": "^0.20.0",
      "vega-lite": "^5.0.0",
      vega: "^5.21.0"
    };
    var peerDependencies = {
      vega: "^5.20.2",
      "vega-lite": "*"
    };
    var dependencies = {
      "fast-json-patch": "^3.1.0",
      "json-stringify-pretty-compact": "^3.0.0",
      semver: "^7.3.5",
      tslib: "^2.3.1",
      "vega-interpreter": "^1.0.4",
      "vega-schema-url-parser": "^2.2.0",
      "vega-themes": "^2.10.0",
      "vega-tooltip": "^0.27.0"
    };
    var scripts = {
      prebuild: "yarn clean && yarn build:style",
      build: "rollup -c",
      "build:style": "./build-style.sh",
      clean: "del-cli build build-es5 src/style.ts",
      prepublishOnly: "yarn clean && yarn build",
      preversion: "yarn lint && yarn test",
      serve: "browser-sync start --directory -s -f build *.html",
      start: "yarn build && concurrently --kill-others -n Server,Rollup 'yarn serve' 'rollup -c -w'",
      pretest: "yarn build:style",
      test: "beemo jest --stdio stream",
      "test:inspect": "node --inspect-brk ./node_modules/.bin/jest --runInBand",
      prepare: "beemo create-config",
      prettierbase: "beemo prettier '*.{css,scss,html}'",
      eslintbase: "beemo eslint .",
      format: "yarn eslintbase --fix && yarn prettierbase --write",
      lint: "yarn eslintbase && yarn prettierbase --check",
      release: "auto shipit"
    };
    var pkg = {
      name: name,
      version: version$1,
      description: description,
      keywords: keywords,
      repository: repository,
      author: author,
      contributors: contributors,
      bugs: bugs,
      homepage: homepage,
      license: license,
      main: main,
      module: module,
      unpkg: unpkg,
      jsdelivr: jsdelivr,
      types: types,
      files: files,
      devDependencies: devDependencies,
      peerDependencies: peerDependencies,
      dependencies: dependencies,
      scripts: scripts
    };

    var _w$vl;
    const version = pkg.version;
    const vega = vegaImport__namespace;
    let vegaLite = vegaLiteImport__namespace; // For backwards compatibility with Vega-Lite before v4.

    const w = typeof window !== 'undefined' ? window : undefined;

    if (vegaLite === undefined && w !== null && w !== void 0 && (_w$vl = w.vl) !== null && _w$vl !== void 0 && _w$vl.compile) {
      vegaLite = w.vl;
    }

    const DEFAULT_ACTIONS = {
      export: {
        svg: true,
        png: true
      },
      source: true,
      compiled: true,
      editor: true
    };
    const I18N = {
      CLICK_TO_VIEW_ACTIONS: 'Click to view actions',
      COMPILED_ACTION: 'View Compiled Vega',
      EDITOR_ACTION: 'Open in Vega Editor',
      PNG_ACTION: 'Save as PNG',
      SOURCE_ACTION: 'View Source',
      SVG_ACTION: 'Save as SVG'
    };
    const NAMES = {
      vega: 'Vega',
      'vega-lite': 'Vega-Lite'
    };
    const VERSION = {
      vega: vega.version,
      'vega-lite': vegaLite ? vegaLite.version : 'not available'
    };
    const PREPROCESSOR = {
      vega: vgSpec => vgSpec,
      'vega-lite': (vlSpec, config) => vegaLite.compile(vlSpec, {
        config: config
      }).spec
    };
    const SVG_CIRCLES = "\n<svg viewBox=\"0 0 16 16\" fill=\"currentColor\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <circle r=\"2\" cy=\"8\" cx=\"2\"></circle>\n  <circle r=\"2\" cy=\"8\" cx=\"8\"></circle>\n  <circle r=\"2\" cy=\"8\" cx=\"14\"></circle>\n</svg>";
    const CHART_WRAPPER_CLASS = 'chart-wrapper';

    function isTooltipHandler(h) {
      return typeof h === 'function';
    }

    function viewSource(source, sourceHeader, sourceFooter, mode) {
      const header = "<html><head>".concat(sourceHeader, "</head><body><pre><code class=\"json\">");
      const footer = "</code></pre>".concat(sourceFooter, "</body></html>"); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

      const win = window.open('');
      win.document.write(header + source + footer);
      win.document.title = "".concat(NAMES[mode], " JSON Source");
    }
    /**
     * Try to guess the type of spec.
     *
     * @param spec Vega or Vega-Lite spec.
     */


    function guessMode(spec, providedMode) {
      // Decide mode
      if (spec.$schema) {
        const parsed = e(spec.$schema);

        if (providedMode && providedMode !== parsed.library) {
          var _NAMES$providedMode;

          console.warn("The given visualization spec is written in ".concat(NAMES[parsed.library], ", but mode argument sets ").concat((_NAMES$providedMode = NAMES[providedMode]) !== null && _NAMES$providedMode !== void 0 ? _NAMES$providedMode : providedMode, "."));
        }

        const mode = parsed.library;

        if (!satisfies_1(VERSION[mode], "^".concat(parsed.version.slice(1)))) {
          console.warn("The input spec uses ".concat(NAMES[mode], " ").concat(parsed.version, ", but the current version of ").concat(NAMES[mode], " is v").concat(VERSION[mode], "."));
        }

        return mode;
      } // try to guess from the provided spec


      if ('mark' in spec || 'encoding' in spec || 'layer' in spec || 'hconcat' in spec || 'vconcat' in spec || 'facet' in spec || 'repeat' in spec) {
        return 'vega-lite';
      }

      if ('marks' in spec || 'signals' in spec || 'scales' in spec || 'axes' in spec) {
        return 'vega';
      }

      return providedMode !== null && providedMode !== void 0 ? providedMode : 'vega';
    }

    function isLoader(o) {
      return !!(o && 'load' in o);
    }

    function createLoader(opts) {
      return isLoader(opts) ? opts : vega.loader(opts);
    }

    function embedOptionsFromUsermeta(parsedSpec) {
      var _ref;

      return (_ref = parsedSpec.usermeta && parsedSpec.usermeta.embedOptions) !== null && _ref !== void 0 ? _ref : {};
    }
    /**
     * Embed a Vega visualization component in a web page. This function returns a promise.
     *
     * @param el        DOM element in which to place component (DOM node or CSS selector).
     * @param spec      String : A URL string from which to load the Vega specification.
     *                  Object : The Vega/Vega-Lite specification as a parsed JSON object.
     * @param opts       A JavaScript object containing options for embedding.
     */


    async function embed(el, spec) {
      var _parsedOpts$config, _usermetaOpts$config;

      let opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      let parsedSpec;
      let loader;

      if (vegaImport.isString(spec)) {
        loader = createLoader(opts.loader);
        parsedSpec = JSON.parse(await loader.load(spec));
      } else {
        parsedSpec = spec;
      }

      const usermetaLoader = embedOptionsFromUsermeta(parsedSpec).loader; // either create the loader for the first time or create a new loader if the spec has new loader options

      if (!loader || usermetaLoader) {
        var _opts$loader;

        loader = createLoader((_opts$loader = opts.loader) !== null && _opts$loader !== void 0 ? _opts$loader : usermetaLoader);
      }

      const usermetaOpts = await loadOpts(embedOptionsFromUsermeta(parsedSpec), loader);
      const parsedOpts = await loadOpts(opts, loader);
      const mergedOpts = { ...mergeDeep(parsedOpts, usermetaOpts),
        config: vegaImport.mergeConfig((_parsedOpts$config = parsedOpts.config) !== null && _parsedOpts$config !== void 0 ? _parsedOpts$config : {}, (_usermetaOpts$config = usermetaOpts.config) !== null && _usermetaOpts$config !== void 0 ? _usermetaOpts$config : {})
      };
      return await _embed(el, parsedSpec, mergedOpts, loader);
    }

    async function loadOpts(opt, loader) {
      var _opt$config;

      const config = vegaImport.isString(opt.config) ? JSON.parse(await loader.load(opt.config)) : (_opt$config = opt.config) !== null && _opt$config !== void 0 ? _opt$config : {};
      const patch = vegaImport.isString(opt.patch) ? JSON.parse(await loader.load(opt.patch)) : opt.patch;
      return { ...opt,
        ...(patch ? {
          patch
        } : {}),
        ...(config ? {
          config
        } : {})
      };
    }

    function getRoot(el) {
      var _document$head;

      const possibleRoot = el.getRootNode ? el.getRootNode() : document;
      return possibleRoot instanceof ShadowRoot ? {
        root: possibleRoot,
        rootContainer: possibleRoot
      } : {
        root: document,
        rootContainer: (_document$head = document.head) !== null && _document$head !== void 0 ? _document$head : document.body
      };
    }

    async function _embed(el, spec) {
      var _opts$config, _opts$actions, _opts$renderer, _opts$logLevel, _opts$downloadFileNam, _ref2, _vega$expressionInter;

      let opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      let loader = arguments.length > 3 ? arguments[3] : undefined;
      const config = opts.theme ? vegaImport.mergeConfig(themes[opts.theme], (_opts$config = opts.config) !== null && _opts$config !== void 0 ? _opts$config : {}) : opts.config;
      const actions = vegaImport.isBoolean(opts.actions) ? opts.actions : mergeDeep({}, DEFAULT_ACTIONS, (_opts$actions = opts.actions) !== null && _opts$actions !== void 0 ? _opts$actions : {});
      const i18n = { ...I18N,
        ...opts.i18n
      };
      const renderer = (_opts$renderer = opts.renderer) !== null && _opts$renderer !== void 0 ? _opts$renderer : 'canvas';
      const logLevel = (_opts$logLevel = opts.logLevel) !== null && _opts$logLevel !== void 0 ? _opts$logLevel : vega.Warn;
      const downloadFileName = (_opts$downloadFileNam = opts.downloadFileName) !== null && _opts$downloadFileNam !== void 0 ? _opts$downloadFileNam : 'visualization';
      const element = typeof el === 'string' ? document.querySelector(el) : el;

      if (!element) {
        throw new Error("".concat(el, " does not exist"));
      }

      if (opts.defaultStyle !== false) {
        // Add a default stylesheet to the head of the document.
        const ID = 'vega-embed-style';
        const {
          root,
          rootContainer
        } = getRoot(element);

        if (!root.getElementById(ID)) {
          const style = document.createElement('style');
          style.id = ID;
          style.innerText = opts.defaultStyle === undefined || opts.defaultStyle === true ? (embedStyle ).toString() : opts.defaultStyle;
          rootContainer.appendChild(style);
        }
      }

      const mode = guessMode(spec, opts.mode);
      let vgSpec = PREPROCESSOR[mode](spec, config);

      if (mode === 'vega-lite') {
        if (vgSpec.$schema) {
          const parsed = e(vgSpec.$schema);

          if (!satisfies_1(VERSION.vega, "^".concat(parsed.version.slice(1)))) {
            console.warn("The compiled spec uses Vega ".concat(parsed.version, ", but current version is v").concat(VERSION.vega, "."));
          }
        }
      }

      element.classList.add('vega-embed');

      if (actions) {
        element.classList.add('has-actions');
      }

      element.innerHTML = ''; // clear container

      let container = element;

      if (actions) {
        const chartWrapper = document.createElement('div');
        chartWrapper.classList.add(CHART_WRAPPER_CLASS);
        element.appendChild(chartWrapper);
        container = chartWrapper;
      }

      const patch = opts.patch;

      if (patch) {
        vgSpec = patch instanceof Function ? patch(vgSpec) : applyPatch(vgSpec, patch, true, false).newDocument;
      } // Set locale. Note that this is a global setting.


      if (opts.formatLocale) {
        vega.formatLocale(opts.formatLocale);
      }

      if (opts.timeFormatLocale) {
        vega.timeFormatLocale(opts.timeFormatLocale);
      }

      const {
        ast
      } = opts; // Do not apply the config to Vega when we have already applied it to Vega-Lite.
      // This call may throw an Error if parsing fails.

      const runtime = vega.parse(vgSpec, mode === 'vega-lite' ? {} : config, {
        ast
      });
      const view = new (opts.viewClass || vega.View)(runtime, {
        loader,
        logLevel,
        renderer,
        ...(ast ? {
          expr: (_ref2 = (_vega$expressionInter = vega.expressionInterpreter) !== null && _vega$expressionInter !== void 0 ? _vega$expressionInter : opts.expr) !== null && _ref2 !== void 0 ? _ref2 : expression
        } : {})
      });
      view.addSignalListener('autosize', (_, autosize) => {
        const {
          type
        } = autosize;

        if (type == 'fit-x') {
          container.classList.add('fit-x');
          container.classList.remove('fit-y');
        } else if (type == 'fit-y') {
          container.classList.remove('fit-x');
          container.classList.add('fit-y');
        } else if (type == 'fit') {
          container.classList.add('fit-x', 'fit-y');
        } else {
          container.classList.remove('fit-x', 'fit-y');
        }
      });

      if (opts.tooltip !== false) {
        const handler = isTooltipHandler(opts.tooltip) ? opts.tooltip : // user provided boolean true or tooltip options
        new Handler(opts.tooltip === true ? {} : opts.tooltip).call;
        view.tooltip(handler);
      }

      let {
        hover
      } = opts;

      if (hover === undefined) {
        hover = mode === 'vega';
      }

      if (hover) {
        const {
          hoverSet,
          updateSet
        } = typeof hover === 'boolean' ? {} : hover;
        view.hover(hoverSet, updateSet);
      }

      if (opts) {
        if (opts.width != null) {
          view.width(opts.width);
        }

        if (opts.height != null) {
          view.height(opts.height);
        }

        if (opts.padding != null) {
          view.padding(opts.padding);
        }
      }

      await view.initialize(container, opts.bind).runAsync();
      let documentClickHandler;

      if (actions !== false) {
        let wrapper = element;

        if (opts.defaultStyle !== false) {
          const details = document.createElement('details');
          details.title = i18n.CLICK_TO_VIEW_ACTIONS;
          element.append(details);
          wrapper = details;
          const summary = document.createElement('summary');
          summary.innerHTML = SVG_CIRCLES;
          details.append(summary);

          documentClickHandler = ev => {
            if (!details.contains(ev.target)) {
              details.removeAttribute('open');
            }
          };

          document.addEventListener('click', documentClickHandler);
        }

        const ctrl = document.createElement('div');
        wrapper.append(ctrl);
        ctrl.classList.add('vega-actions'); // add 'Export' action

        if (actions === true || actions.export !== false) {
          for (const ext of ['svg', 'png']) {
            if (actions === true || actions.export === true || actions.export[ext]) {
              const i18nExportAction = i18n["".concat(ext.toUpperCase(), "_ACTION")];
              const exportLink = document.createElement('a');
              exportLink.text = i18nExportAction;
              exportLink.href = '#';
              exportLink.target = '_blank';
              exportLink.download = "".concat(downloadFileName, ".").concat(ext); // add link on mousedown so that it's correct when the click happens

              exportLink.addEventListener('mousedown', async function (e) {
                e.preventDefault();
                const url = await view.toImageURL(ext, opts.scaleFactor);
                this.href = url;
              });
              ctrl.append(exportLink);
            }
          }
        } // add 'View Source' action


        if (actions === true || actions.source !== false) {
          const viewSourceLink = document.createElement('a');
          viewSourceLink.text = i18n.SOURCE_ACTION;
          viewSourceLink.href = '#';
          viewSourceLink.addEventListener('click', function (e) {
            var _opts$sourceHeader, _opts$sourceFooter;

            viewSource(jsonStringifyPrettyCompact(spec), (_opts$sourceHeader = opts.sourceHeader) !== null && _opts$sourceHeader !== void 0 ? _opts$sourceHeader : '', (_opts$sourceFooter = opts.sourceFooter) !== null && _opts$sourceFooter !== void 0 ? _opts$sourceFooter : '', mode);
            e.preventDefault();
          });
          ctrl.append(viewSourceLink);
        } // add 'View Compiled' action


        if (mode === 'vega-lite' && (actions === true || actions.compiled !== false)) {
          const compileLink = document.createElement('a');
          compileLink.text = i18n.COMPILED_ACTION;
          compileLink.href = '#';
          compileLink.addEventListener('click', function (e) {
            var _opts$sourceHeader2, _opts$sourceFooter2;

            viewSource(jsonStringifyPrettyCompact(vgSpec), (_opts$sourceHeader2 = opts.sourceHeader) !== null && _opts$sourceHeader2 !== void 0 ? _opts$sourceHeader2 : '', (_opts$sourceFooter2 = opts.sourceFooter) !== null && _opts$sourceFooter2 !== void 0 ? _opts$sourceFooter2 : '', 'vega');
            e.preventDefault();
          });
          ctrl.append(compileLink);
        } // add 'Open in Vega Editor' action


        if (actions === true || actions.editor !== false) {
          var _opts$editorUrl;

          const editorUrl = (_opts$editorUrl = opts.editorUrl) !== null && _opts$editorUrl !== void 0 ? _opts$editorUrl : 'https://vega.github.io/editor/';
          const editorLink = document.createElement('a');
          editorLink.text = i18n.EDITOR_ACTION;
          editorLink.href = '#';
          editorLink.addEventListener('click', function (e) {
            post(window, editorUrl, {
              config: config,
              mode,
              renderer,
              spec: jsonStringifyPrettyCompact(spec)
            });
            e.preventDefault();
          });
          ctrl.append(editorLink);
        }
      }

      function finalize() {
        if (documentClickHandler) {
          document.removeEventListener('click', documentClickHandler);
        }

        view.finalize();
      }

      return {
        view,
        spec,
        vgSpec,
        finalize
      };
    }

    /**
     * Create a promise to an HTML Div element with an embedded Vega-Lite or Vega visualization.
     * The element has a value property with the view. By default all actions except for the editor action are disabled.
     *
     * The main use case is in [Observable](https://observablehq.com/).
     */

    async function container (spec) {
      var _opt$actions;

      let opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const wrapper = document.createElement('div');
      wrapper.classList.add('vega-embed-wrapper');
      const div = document.createElement('div');
      wrapper.appendChild(div);
      const actions = opt.actions === true || opt.actions === false ? opt.actions : {
        export: true,
        source: false,
        compiled: true,
        editor: true,
        ...((_opt$actions = opt.actions) !== null && _opt$actions !== void 0 ? _opt$actions : {})
      };
      const result = await embed(div, spec, {
        actions,
        ...(opt !== null && opt !== void 0 ? opt : {})
      });
      wrapper.value = result.view;
      return wrapper;
    }

    /**
     * Returns true if the object is an HTML element.
     */

    function isElement(obj) {
      return obj instanceof HTMLElement;
    }

    const wrapper = function () {
      if (arguments.length > 1 && (vegaImport.isString(arguments.length <= 0 ? undefined : arguments[0]) && !isURL(arguments.length <= 0 ? undefined : arguments[0]) || isElement(arguments.length <= 0 ? undefined : arguments[0]) || arguments.length === 3)) {
        return embed(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]);
      }

      return container(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
    };

    wrapper.vegaLite = vegaLite;
    wrapper.vl = vegaLite; // backwards compatibility

    wrapper.container = container;
    wrapper.embed = embed;
    wrapper.vega = vega;
    wrapper.default = embed;
    wrapper.version = version;

    return wrapper;

}));
//# sourceMappingURL=vega-embed.js.map
