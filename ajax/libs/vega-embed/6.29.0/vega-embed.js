(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vega'), require('vega-lite')) :
    typeof define === 'function' && define.amd ? define(['vega', 'vega-lite'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.vegaEmbed = factory(global.vega, global.vegaLite));
})(this, (function (vegaImport, vegaLiteImport) { 'use strict';

    function _interopNamespaceDefault(e) {
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
        n.default = e;
        return Object.freeze(n);
    }

    var vegaImport__namespace = /*#__PURE__*/_interopNamespaceDefault(vegaImport);
    var vegaLiteImport__namespace = /*#__PURE__*/_interopNamespaceDefault(vegaLiteImport);

    /*!
     * https://github.com/Starcounter-Jack/JSON-Patch
     * (c) 2017-2022 Joachim Wester
     * MIT licensed
     */
    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    function hasOwnProperty(obj, key) {
        return _hasOwnProperty.call(obj, key);
    }
    function _objectKeys(obj) {
        if (Array.isArray(obj)) {
            var keys_1 = new Array(obj.length);
            for (var k = 0; k < keys_1.length; k++) {
                keys_1[k] = "" + k;
            }
            return keys_1;
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
                return JSON.parse(JSON.stringify(obj)); //Faster than ES5 clone - http://jsperf.com/deep-cloning-of-objects/5
            case "undefined":
                return null; //this is how JSON.stringify behaves for array items
            default:
                return obj; //no need to clone primitives
        }
    }
    //3x faster than cached /^\d+$/.test(str)
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
        if (path.indexOf('/') === -1 && path.indexOf('~') === -1)
            return path;
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
                for (var i_1 = 0, len = obj.length; i_1 < len; i_1++) {
                    if (hasUndefined(obj[i_1])) {
                        return true;
                    }
                }
            }
            else if (typeof obj === "object") {
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
    var PatchError = /** @class */ (function (_super) {
        __extends(PatchError, _super);
        function PatchError(message, name, index, operation, tree) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, patchErrorMessageFormatter(message, { name: name, index: index, operation: operation, tree: tree })) || this;
            _this.name = name;
            _this.index = index;
            _this.operation = operation;
            _this.tree = tree;
            Object.setPrototypeOf(_this, _newTarget.prototype); // restore prototype chain, see https://stackoverflow.com/a/48342359
            _this.message = patchErrorMessageFormatter(message, { name: name, index: index, operation: operation, tree: tree });
            return _this;
        }
        return PatchError;
    }(Error));

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
            return { newDocument: document };
        },
        remove: function (obj, key, document) {
            var removed = obj[key];
            delete obj[key];
            return { newDocument: document, removed: removed };
        },
        replace: function (obj, key, document) {
            var removed = obj[key];
            obj[key] = this.value;
            return { newDocument: document, removed: removed };
        },
        move: function (obj, key, document) {
            /* in case move target overwrites an existing value,
            return the removed value, this can be taxing performance-wise,
            and is potentially unneeded */
            var removed = getValueByPointer(document, this.path);
            if (removed) {
                removed = _deepClone(removed);
            }
            var originalValue = applyOperation(document, { op: "remove", path: this.from }).removed;
            applyOperation(document, { op: "add", path: this.path, value: originalValue });
            return { newDocument: document, removed: removed };
        },
        copy: function (obj, key, document) {
            var valueToCopy = getValueByPointer(document, this.from);
            // enforce copy by value so further operations don't affect source (see issue #177)
            applyOperation(document, { op: "add", path: this.path, value: _deepClone(valueToCopy) });
            return { newDocument: document };
        },
        test: function (obj, key, document) {
            return { newDocument: document, test: _areEquals(obj[key], this.value) };
        },
        _get: function (obj, key, document) {
            this.value = obj[key];
            return { newDocument: document };
        }
    };
    /* The operations applicable to an array. Many are the same as for the object */
    var arrOps = {
        add: function (arr, i, document) {
            if (isInteger(i)) {
                arr.splice(i, 0, this.value);
            }
            else { // array props
                arr[i] = this.value;
            }
            // this may be needed when using '-' in an array
            return { newDocument: document, index: i };
        },
        remove: function (arr, i, document) {
            var removedList = arr.splice(i, 1);
            return { newDocument: document, removed: removedList[0] };
        },
        replace: function (arr, i, document) {
            var removed = arr[i];
            arr[i] = this.value;
            return { newDocument: document, removed: removed };
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
        var getOriginalDestination = { op: "_get", path: pointer };
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
        if (validateOperation === void 0) { validateOperation = false; }
        if (mutateDocument === void 0) { mutateDocument = true; }
        if (banPrototypeModifications === void 0) { banPrototypeModifications = true; }
        if (index === void 0) { index = 0; }
        if (validateOperation) {
            if (typeof validateOperation == 'function') {
                validateOperation(operation, 0, document, operation.path);
            }
            else {
                validator(operation, 0);
            }
        }
        /* ROOT OPERATIONS */
        if (operation.path === "") {
            var returnValue = { newDocument: document };
            if (operation.op === 'add') {
                returnValue.newDocument = operation.value;
                return returnValue;
            }
            else if (operation.op === 'replace') {
                returnValue.newDocument = operation.value;
                returnValue.removed = document; //document we removed
                return returnValue;
            }
            else if (operation.op === 'move' || operation.op === 'copy') { // it's a move or copy to root
                returnValue.newDocument = getValueByPointer(document, operation.from); // get the value by json-pointer in `from` field
                if (operation.op === 'move') { // report removed item
                    returnValue.removed = document;
                }
                return returnValue;
            }
            else if (operation.op === 'test') {
                returnValue.test = _areEquals(document, operation.value);
                if (returnValue.test === false) {
                    throw new JsonPatchError("Test operation failed", 'TEST_OPERATION_FAILED', index, operation, document);
                }
                returnValue.newDocument = document;
                return returnValue;
            }
            else if (operation.op === 'remove') { // a remove on root
                returnValue.removed = document;
                returnValue.newDocument = null;
                return returnValue;
            }
            else if (operation.op === '_get') {
                operation.value = document;
                return returnValue;
            }
            else { /* bad operation */
                if (validateOperation) {
                    throw new JsonPatchError('Operation `op` property is not one of operations defined in RFC-6902', 'OPERATION_OP_INVALID', index, operation, document);
                }
                else {
                    return returnValue;
                }
            }
        } /* END ROOT OPERATIONS */
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
            }
            else {
                validateFunction = validator;
            }
            while (true) {
                key = keys[t];
                if (key && key.indexOf('~') != -1) {
                    key = unescapePathComponent(key);
                }
                if (banPrototypeModifications &&
                    (key == '__proto__' ||
                        (key == 'prototype' && t > 0 && keys[t - 1] == 'constructor'))) {
                    throw new TypeError('JSON-Patch: modifying `__proto__` or `constructor/prototype` prop is banned for security reasons, if this was on purpose, please set `banPrototypeModifications` flag false and pass it to this function. More info in fast-json-patch README');
                }
                if (validateOperation) {
                    if (existingPathFragment === undefined) {
                        if (obj[key] === undefined) {
                            existingPathFragment = keys.slice(0, t).join('/');
                        }
                        else if (t == len - 1) {
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
                    }
                    else {
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
                }
                else {
                    if (t >= len) {
                        var returnValue = objOps[operation.op].call(operation, obj, key, document); // Apply patch
                        if (returnValue.test === false) {
                            throw new JsonPatchError("Test operation failed", 'TEST_OPERATION_FAILED', index, operation, document);
                        }
                        return returnValue;
                    }
                }
                obj = obj[key];
                // If we have more keys in the path, but the next value isn't a non-null object,
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
        if (mutateDocument === void 0) { mutateDocument = true; }
        if (banPrototypeModifications === void 0) { banPrototypeModifications = true; }
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
        if (operationResult.test === false) { // failed test
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
        }
        else if (!objOps[operation.op]) {
            throw new JsonPatchError('Operation `op` property is not one of operations defined in RFC-6902', 'OPERATION_OP_INVALID', index, operation, document);
        }
        else if (typeof operation.path !== 'string') {
            throw new JsonPatchError('Operation `path` property is not a string', 'OPERATION_PATH_INVALID', index, operation, document);
        }
        else if (operation.path.indexOf('/') !== 0 && operation.path.length > 0) {
            // paths that aren't empty string should start with "/"
            throw new JsonPatchError('Operation `path` property must start with "/"', 'OPERATION_PATH_INVALID', index, operation, document);
        }
        else if ((operation.op === 'move' || operation.op === 'copy') && typeof operation.from !== 'string') {
            throw new JsonPatchError('Operation `from` property is not present (applicable in `move` and `copy` operations)', 'OPERATION_FROM_REQUIRED', index, operation, document);
        }
        else if ((operation.op === 'add' || operation.op === 'replace' || operation.op === 'test') && operation.value === undefined) {
            throw new JsonPatchError('Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)', 'OPERATION_VALUE_REQUIRED', index, operation, document);
        }
        else if ((operation.op === 'add' || operation.op === 'replace' || operation.op === 'test') && hasUndefined(operation.value)) {
            throw new JsonPatchError('Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)', 'OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED', index, operation, document);
        }
        else if (document) {
            if (operation.op == "add") {
                var pathLen = operation.path.split("/").length;
                var existingPathLen = existingPathFragment.split("/").length;
                if (pathLen !== existingPathLen + 1 && pathLen !== existingPathLen) {
                    throw new JsonPatchError('Cannot perform an `add` operation at the desired path', 'OPERATION_PATH_CANNOT_ADD', index, operation, document);
                }
            }
            else if (operation.op === 'replace' || operation.op === 'remove' || operation.op === '_get') {
                if (operation.path !== existingPathFragment) {
                    throw new JsonPatchError('Cannot perform the operation at a path that does not exist', 'OPERATION_PATH_UNRESOLVABLE', index, operation, document);
                }
            }
            else if (operation.op === 'move' || operation.op === 'copy') {
                var existingValue = { op: "_get", path: operation.from, value: undefined };
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
            }
            else {
                externalValidator = externalValidator || validator;
                for (var i = 0; i < sequence.length; i++) {
                    externalValidator(sequence[i], i, document, undefined);
                }
            }
        }
        catch (e) {
            if (e instanceof JsonPatchError) {
                return e;
            }
            else {
                throw e;
            }
        }
    }
    // based on https://github.com/epoberezkin/fast-deep-equal
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
        if (a === b)
            return true;
        if (a && b && typeof a == 'object' && typeof b == 'object') {
            var arrA = Array.isArray(a), arrB = Array.isArray(b), i, length, key;
            if (arrA && arrB) {
                length = a.length;
                if (length != b.length)
                    return false;
                for (i = length; i-- !== 0;)
                    if (!_areEquals(a[i], b[i]))
                        return false;
                return true;
            }
            if (arrA != arrB)
                return false;
            var keys = Object.keys(a);
            length = keys.length;
            if (length !== Object.keys(b).length)
                return false;
            for (i = length; i-- !== 0;)
                if (!b.hasOwnProperty(keys[i]))
                    return false;
            for (i = length; i-- !== 0;) {
                key = keys[i];
                if (!_areEquals(a[key], b[key]))
                    return false;
            }
            return true;
        }
        return a !== a && b !== b;
    }

    var core = /*#__PURE__*/Object.freeze({
        __proto__: null,
        JsonPatchError: JsonPatchError,
        _areEquals: _areEquals,
        applyOperation: applyOperation,
        applyPatch: applyPatch,
        applyReducer: applyReducer,
        deepClone: deepClone,
        getValueByPointer: getValueByPointer,
        validate: validate,
        validator: validator
    });

    /*!
     * https://github.com/Starcounter-Jack/JSON-Patch
     * (c) 2017-2021 Joachim Wester
     * MIT license
     */
    var beforeDict = new WeakMap();
    var Mirror = /** @class */ (function () {
        function Mirror(obj) {
            this.observers = new Map();
            this.obj = obj;
        }
        return Mirror;
    }());
    var ObserverInfo = /** @class */ (function () {
        function ObserverInfo(callback, observer) {
            this.callback = callback;
            this.observer = observer;
        }
        return ObserverInfo;
    }());
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
        }
        else {
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
            if (typeof window !== 'undefined') { //not Node
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
        if (invertible === void 0) { invertible = false; }
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
    }
    // Dirty check if obj is different from mirror, generate patches and update mirror
    function _generate(mirror, obj, patches, path, invertible) {
        if (obj === mirror) {
            return;
        }
        if (typeof obj.toJSON === "function") {
            obj = obj.toJSON();
        }
        var newKeys = _objectKeys(obj);
        var oldKeys = _objectKeys(mirror);
        var deleted = false;
        //if ever "move" operation is implemented here, make sure this test runs OK: "should not generate the same patch twice (move)"
        for (var t = oldKeys.length - 1; t >= 0; t--) {
            var key = oldKeys[t];
            var oldVal = mirror[key];
            if (hasOwnProperty(obj, key) && !(obj[key] === undefined && oldVal !== undefined && Array.isArray(obj) === false)) {
                var newVal = obj[key];
                if (typeof oldVal == "object" && oldVal != null && typeof newVal == "object" && newVal != null && Array.isArray(oldVal) === Array.isArray(newVal)) {
                    _generate(oldVal, newVal, patches, path + "/" + escapePathComponent(key), invertible);
                }
                else {
                    if (oldVal !== newVal) {
                        if (invertible) {
                            patches.push({ op: "test", path: path + "/" + escapePathComponent(key), value: _deepClone(oldVal) });
                        }
                        patches.push({ op: "replace", path: path + "/" + escapePathComponent(key), value: _deepClone(newVal) });
                    }
                }
            }
            else if (Array.isArray(mirror) === Array.isArray(obj)) {
                if (invertible) {
                    patches.push({ op: "test", path: path + "/" + escapePathComponent(key), value: _deepClone(oldVal) });
                }
                patches.push({ op: "remove", path: path + "/" + escapePathComponent(key) });
                deleted = true; // property has been deleted
            }
            else {
                if (invertible) {
                    patches.push({ op: "test", path: path, value: mirror });
                }
                patches.push({ op: "replace", path: path, value: obj });
            }
        }
        if (!deleted && newKeys.length == oldKeys.length) {
            return;
        }
        for (var t = 0; t < newKeys.length; t++) {
            var key = newKeys[t];
            if (!hasOwnProperty(mirror, key) && obj[key] !== undefined) {
                patches.push({ op: "add", path: path + "/" + escapePathComponent(key), value: _deepClone(obj[key]) });
            }
        }
    }
    /**
     * Create an array of patches from the differences in two objects
     */
    function compare(tree1, tree2, invertible) {
        if (invertible === void 0) { invertible = false; }
        var patches = [];
        _generate(tree1, tree2, patches, '', invertible);
        return patches;
    }

    var duplex = /*#__PURE__*/Object.freeze({
        __proto__: null,
        compare: compare,
        generate: generate,
        observe: observe,
        unobserve: unobserve
    });

    Object.assign({}, core, duplex, {
        JsonPatchError: PatchError,
        deepClone: _deepClone,
        escapePathComponent,
        unescapePathComponent
    });

    // Note: This regex matches even invalid JSON strings, but since we’re
    // working on the output of `JSON.stringify` we know that only valid strings
    // are present (unless the user supplied a weird `options.indent` but in
    // that case we don’t care since the output would be invalid anyway).
    const stringOrChar = /("(?:[^\\"]|\\.)*")|[:,]/g;

    function stringify$1(passedObj, options = {}) {
      const indent = JSON.stringify(
        [1],
        undefined,
        options.indent === undefined ? 2 : options.indent
      ).slice(2, -3);

      const maxLength =
        indent === ""
          ? Infinity
          : options.maxLength === undefined
          ? 80
          : options.maxLength;

      let { replacer } = options;

      return (function _stringify(obj, currentIndent, reserved) {
        if (obj && typeof obj.toJSON === "function") {
          obj = obj.toJSON();
        }

        const string = JSON.stringify(obj, replacer);

        if (string === undefined) {
          return string;
        }

        const length = maxLength - currentIndent.length - reserved;

        if (string.length <= length) {
          const prettified = string.replace(
            stringOrChar,
            (match, stringLiteral) => {
              return stringLiteral || `${match} `;
            }
          );
          if (prettified.length <= length) {
            return prettified;
          }
        }

        if (replacer != null) {
          obj = JSON.parse(string);
          replacer = undefined;
        }

        if (typeof obj === "object" && obj !== null) {
          const nextIndent = currentIndent + indent;
          const items = [];
          let index = 0;
          let start;
          let end;

          if (Array.isArray(obj)) {
            start = "[";
            end = "]";
            const { length } = obj;
            for (; index < length; index++) {
              items.push(
                _stringify(obj[index], nextIndent, index === length - 1 ? 0 : 1) ||
                  "null"
              );
            }
          } else {
            start = "{";
            end = "}";
            const keys = Object.keys(obj);
            const { length } = keys;
            for (; index < length; index++) {
              const key = keys[index];
              const keyPart = `${JSON.stringify(key)}: `;
              const value = _stringify(
                obj[key],
                nextIndent,
                keyPart.length + (index === length - 1 ? 0 : 1)
              );
              if (value !== undefined) {
                items.push(keyPart + value);
              }
            }
          }

          if (items.length > 0) {
            return [start, indent + items.join(`,\n${nextIndent}`), end].join(
              `\n${currentIndent}`
            );
          }
        }

        return string;
      })(passedObj, "", 0);
    }

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    var lrucache;
    var hasRequiredLrucache;

    function requireLrucache () {
    	if (hasRequiredLrucache) return lrucache;
    	hasRequiredLrucache = 1;
    	class LRUCache {
    	  constructor () {
    	    this.max = 1000;
    	    this.map = new Map();
    	  }

    	  get (key) {
    	    const value = this.map.get(key);
    	    if (value === undefined) {
    	      return undefined
    	    } else {
    	      // Remove the key from the map and add it to the end
    	      this.map.delete(key);
    	      this.map.set(key, value);
    	      return value
    	    }
    	  }

    	  delete (key) {
    	    return this.map.delete(key)
    	  }

    	  set (key, value) {
    	    const deleted = this.delete(key);

    	    if (!deleted && value !== undefined) {
    	      // If cache is full, delete the least recently used item
    	      if (this.map.size >= this.max) {
    	        const firstKey = this.map.keys().next().value;
    	        this.delete(firstKey);
    	      }

    	      this.map.set(key, value);
    	    }

    	    return this
    	  }
    	}

    	lrucache = LRUCache;
    	return lrucache;
    }

    var parseOptions_1;
    var hasRequiredParseOptions;

    function requireParseOptions () {
    	if (hasRequiredParseOptions) return parseOptions_1;
    	hasRequiredParseOptions = 1;
    	// parse out just the options we care about
    	const looseOption = Object.freeze({ loose: true });
    	const emptyOpts = Object.freeze({ });
    	const parseOptions = options => {
    	  if (!options) {
    	    return emptyOpts
    	  }

    	  if (typeof options !== 'object') {
    	    return looseOption
    	  }

    	  return options
    	};
    	parseOptions_1 = parseOptions;
    	return parseOptions_1;
    }

    var re = {exports: {}};

    var constants;
    var hasRequiredConstants;

    function requireConstants () {
    	if (hasRequiredConstants) return constants;
    	hasRequiredConstants = 1;
    	// Note: this is the semver.org version of the spec that it implements
    	// Not necessarily the package version of this code.
    	const SEMVER_SPEC_VERSION = '2.0.0';

    	const MAX_LENGTH = 256;
    	const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
    	/* istanbul ignore next */ 9007199254740991;

    	// Max safe segment length for coercion.
    	const MAX_SAFE_COMPONENT_LENGTH = 16;

    	// Max safe length for a build identifier. The max length minus 6 characters for
    	// the shortest version with a build 0.0.0+BUILD.
    	const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;

    	const RELEASE_TYPES = [
    	  'major',
    	  'premajor',
    	  'minor',
    	  'preminor',
    	  'patch',
    	  'prepatch',
    	  'prerelease',
    	];

    	constants = {
    	  MAX_LENGTH,
    	  MAX_SAFE_COMPONENT_LENGTH,
    	  MAX_SAFE_BUILD_LENGTH,
    	  MAX_SAFE_INTEGER,
    	  RELEASE_TYPES,
    	  SEMVER_SPEC_VERSION,
    	  FLAG_INCLUDE_PRERELEASE: 0b001,
    	  FLAG_LOOSE: 0b010,
    	};
    	return constants;
    }

    var debug_1;
    var hasRequiredDebug;

    function requireDebug () {
    	if (hasRequiredDebug) return debug_1;
    	hasRequiredDebug = 1;
    	const debug = (
    	  typeof process === 'object' &&
    	  process.env &&
    	  process.env.NODE_DEBUG &&
    	  /\bsemver\b/i.test(process.env.NODE_DEBUG)
    	) ? (...args) => console.error('SEMVER', ...args)
    	  : () => {};

    	debug_1 = debug;
    	return debug_1;
    }

    var hasRequiredRe;

    function requireRe () {
    	if (hasRequiredRe) return re.exports;
    	hasRequiredRe = 1;
    	(function (module, exports) {
    		const {
    		  MAX_SAFE_COMPONENT_LENGTH,
    		  MAX_SAFE_BUILD_LENGTH,
    		  MAX_LENGTH,
    		} = requireConstants();
    		const debug = requireDebug();
    		exports = module.exports = {};

    		// The actual regexps go on exports.re
    		const re = exports.re = [];
    		const safeRe = exports.safeRe = [];
    		const src = exports.src = [];
    		const t = exports.t = {};
    		let R = 0;

    		const LETTERDASHNUMBER = '[a-zA-Z0-9-]';

    		// Replace some greedy regex tokens to prevent regex dos issues. These regex are
    		// used internally via the safeRe object since all inputs in this library get
    		// normalized first to trim and collapse all extra whitespace. The original
    		// regexes are exported for userland consumption and lower level usage. A
    		// future breaking change could export the safer regex only with a note that
    		// all input should have extra whitespace removed.
    		const safeRegexReplacements = [
    		  ['\\s', 1],
    		  ['\\d', MAX_LENGTH],
    		  [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH],
    		];

    		const makeSafeRegex = (value) => {
    		  for (const [token, max] of safeRegexReplacements) {
    		    value = value
    		      .split(`${token}*`).join(`${token}{0,${max}}`)
    		      .split(`${token}+`).join(`${token}{1,${max}}`);
    		  }
    		  return value
    		};

    		const createToken = (name, value, isGlobal) => {
    		  const safe = makeSafeRegex(value);
    		  const index = R++;
    		  debug(name, index, value);
    		  t[name] = index;
    		  src[index] = value;
    		  re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
    		  safeRe[index] = new RegExp(safe, isGlobal ? 'g' : undefined);
    		};

    		// The following Regular Expressions can be used for tokenizing,
    		// validating, and parsing SemVer version strings.

    		// ## Numeric Identifier
    		// A single `0`, or a non-zero digit followed by zero or more digits.

    		createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
    		createToken('NUMERICIDENTIFIERLOOSE', '\\d+');

    		// ## Non-numeric Identifier
    		// Zero or more digits, followed by a letter or hyphen, and then zero or
    		// more letters, digits, or hyphens.

    		createToken('NONNUMERICIDENTIFIER', `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);

    		// ## Main Version
    		// Three dot-separated numeric identifiers.

    		createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` +
    		                   `(${src[t.NUMERICIDENTIFIER]})\\.` +
    		                   `(${src[t.NUMERICIDENTIFIER]})`);

    		createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
    		                        `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
    		                        `(${src[t.NUMERICIDENTIFIERLOOSE]})`);

    		// ## Pre-release Version Identifier
    		// A numeric identifier, or a non-numeric identifier.

    		createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NUMERICIDENTIFIER]
		}|${src[t.NONNUMERICIDENTIFIER]})`);

    		createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NUMERICIDENTIFIERLOOSE]
		}|${src[t.NONNUMERICIDENTIFIER]})`);

    		// ## Pre-release Version
    		// Hyphen, followed by one or more dot-separated pre-release version
    		// identifiers.

    		createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]
		}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);

    		createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]
		}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);

    		// ## Build Metadata Identifier
    		// Any combination of digits, letters, or hyphens.

    		createToken('BUILDIDENTIFIER', `${LETTERDASHNUMBER}+`);

    		// ## Build Metadata
    		// Plus sign, followed by one or more period-separated build metadata
    		// identifiers.

    		createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]
		}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);

    		// ## Full Version String
    		// A main version, followed optionally by a pre-release version and
    		// build metadata.

    		// Note that the only major, minor, patch, and pre-release sections of
    		// the version string are capturing groups.  The build metadata is not a
    		// capturing group, because it should not ever be used in version
    		// comparison.

    		createToken('FULLPLAIN', `v?${src[t.MAINVERSION]
		}${src[t.PRERELEASE]}?${
		  src[t.BUILD]}?`);

    		createToken('FULL', `^${src[t.FULLPLAIN]}$`);

    		// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
    		// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
    		// common in the npm registry.
    		createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]
		}${src[t.PRERELEASELOOSE]}?${
		  src[t.BUILD]}?`);

    		createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`);

    		createToken('GTLT', '((?:<|>)?=?)');

    		// Something like "2.*" or "1.2.x".
    		// Note that "x.x" is a valid xRange identifer, meaning "any version"
    		// Only the first item is strictly required.
    		createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    		createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);

    		createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` +
    		                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
    		                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
    		                   `(?:${src[t.PRERELEASE]})?${
		                     src[t.BUILD]}?` +
    		                   `)?)?`);

    		createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` +
    		                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
    		                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
    		                        `(?:${src[t.PRERELEASELOOSE]})?${
		                          src[t.BUILD]}?` +
    		                        `)?)?`);

    		createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    		createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);

    		// Coercion.
    		// Extract anything that could conceivably be a part of a valid semver
    		createToken('COERCEPLAIN', `${'(^|[^\\d])' +
		              '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` +
    		              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
    		              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    		createToken('COERCE', `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
    		createToken('COERCEFULL', src[t.COERCEPLAIN] +
    		              `(?:${src[t.PRERELEASE]})?` +
    		              `(?:${src[t.BUILD]})?` +
    		              `(?:$|[^\\d])`);
    		createToken('COERCERTL', src[t.COERCE], true);
    		createToken('COERCERTLFULL', src[t.COERCEFULL], true);

    		// Tilde ranges.
    		// Meaning is "reasonably at or greater than"
    		createToken('LONETILDE', '(?:~>?)');

    		createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    		exports.tildeTrimReplace = '$1~';

    		createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    		createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);

    		// Caret ranges.
    		// Meaning is "at least and backwards compatible with"
    		createToken('LONECARET', '(?:\\^)');

    		createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true);
    		exports.caretTrimReplace = '$1^';

    		createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    		createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);

    		// A simple gt/lt/eq thing, or just "" to indicate "any version"
    		createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    		createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);

    		// An expression to strip any whitespace between the gtlt and the thing
    		// it modifies, so that `> 1.2.3` ==> `>1.2.3`
    		createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]
		}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    		exports.comparatorTrimReplace = '$1$2$3';

    		// Something like `1.2.3 - 1.2.4`
    		// Note that these all use the loose form, because they'll be
    		// checked against either the strict or loose comparator form
    		// later.
    		createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` +
    		                   `\\s+-\\s+` +
    		                   `(${src[t.XRANGEPLAIN]})` +
    		                   `\\s*$`);

    		createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` +
    		                        `\\s+-\\s+` +
    		                        `(${src[t.XRANGEPLAINLOOSE]})` +
    		                        `\\s*$`);

    		// Star ranges basically just allow anything at all.
    		createToken('STAR', '(<|>)?=?\\s*\\*');
    		// >=0.0.0 is like a star
    		createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$');
    		createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$'); 
    	} (re, re.exports));
    	return re.exports;
    }

    var identifiers;
    var hasRequiredIdentifiers;

    function requireIdentifiers () {
    	if (hasRequiredIdentifiers) return identifiers;
    	hasRequiredIdentifiers = 1;
    	const numeric = /^[0-9]+$/;
    	const compareIdentifiers = (a, b) => {
    	  const anum = numeric.test(a);
    	  const bnum = numeric.test(b);

    	  if (anum && bnum) {
    	    a = +a;
    	    b = +b;
    	  }

    	  return a === b ? 0
    	    : (anum && !bnum) ? -1
    	    : (bnum && !anum) ? 1
    	    : a < b ? -1
    	    : 1
    	};

    	const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);

    	identifiers = {
    	  compareIdentifiers,
    	  rcompareIdentifiers,
    	};
    	return identifiers;
    }

    var semver;
    var hasRequiredSemver;

    function requireSemver () {
    	if (hasRequiredSemver) return semver;
    	hasRequiredSemver = 1;
    	const debug = requireDebug();
    	const { MAX_LENGTH, MAX_SAFE_INTEGER } = requireConstants();
    	const { safeRe: re, t } = requireRe();

    	const parseOptions = requireParseOptions();
    	const { compareIdentifiers } = requireIdentifiers();
    	class SemVer {
    	  constructor (version, options) {
    	    options = parseOptions(options);

    	    if (version instanceof SemVer) {
    	      if (version.loose === !!options.loose &&
    	          version.includePrerelease === !!options.includePrerelease) {
    	        return version
    	      } else {
    	        version = version.version;
    	      }
    	    } else if (typeof version !== 'string') {
    	      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`)
    	    }

    	    if (version.length > MAX_LENGTH) {
    	      throw new TypeError(
    	        `version is longer than ${MAX_LENGTH} characters`
    	      )
    	    }

    	    debug('SemVer', version, options);
    	    this.options = options;
    	    this.loose = !!options.loose;
    	    // this isn't actually relevant for versions, but keep it so that we
    	    // don't run into trouble passing this.options around.
    	    this.includePrerelease = !!options.includePrerelease;

    	    const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);

    	    if (!m) {
    	      throw new TypeError(`Invalid Version: ${version}`)
    	    }

    	    this.raw = version;

    	    // these are actually numbers
    	    this.major = +m[1];
    	    this.minor = +m[2];
    	    this.patch = +m[3];

    	    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
    	      throw new TypeError('Invalid major version')
    	    }

    	    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
    	      throw new TypeError('Invalid minor version')
    	    }

    	    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
    	      throw new TypeError('Invalid patch version')
    	    }

    	    // numberify any prerelease numeric ids
    	    if (!m[4]) {
    	      this.prerelease = [];
    	    } else {
    	      this.prerelease = m[4].split('.').map((id) => {
    	        if (/^[0-9]+$/.test(id)) {
    	          const num = +id;
    	          if (num >= 0 && num < MAX_SAFE_INTEGER) {
    	            return num
    	          }
    	        }
    	        return id
    	      });
    	    }

    	    this.build = m[5] ? m[5].split('.') : [];
    	    this.format();
    	  }

    	  format () {
    	    this.version = `${this.major}.${this.minor}.${this.patch}`;
    	    if (this.prerelease.length) {
    	      this.version += `-${this.prerelease.join('.')}`;
    	    }
    	    return this.version
    	  }

    	  toString () {
    	    return this.version
    	  }

    	  compare (other) {
    	    debug('SemVer.compare', this.version, this.options, other);
    	    if (!(other instanceof SemVer)) {
    	      if (typeof other === 'string' && other === this.version) {
    	        return 0
    	      }
    	      other = new SemVer(other, this.options);
    	    }

    	    if (other.version === this.version) {
    	      return 0
    	    }

    	    return this.compareMain(other) || this.comparePre(other)
    	  }

    	  compareMain (other) {
    	    if (!(other instanceof SemVer)) {
    	      other = new SemVer(other, this.options);
    	    }

    	    return (
    	      compareIdentifiers(this.major, other.major) ||
    	      compareIdentifiers(this.minor, other.minor) ||
    	      compareIdentifiers(this.patch, other.patch)
    	    )
    	  }

    	  comparePre (other) {
    	    if (!(other instanceof SemVer)) {
    	      other = new SemVer(other, this.options);
    	    }

    	    // NOT having a prerelease is > having one
    	    if (this.prerelease.length && !other.prerelease.length) {
    	      return -1
    	    } else if (!this.prerelease.length && other.prerelease.length) {
    	      return 1
    	    } else if (!this.prerelease.length && !other.prerelease.length) {
    	      return 0
    	    }

    	    let i = 0;
    	    do {
    	      const a = this.prerelease[i];
    	      const b = other.prerelease[i];
    	      debug('prerelease compare', i, a, b);
    	      if (a === undefined && b === undefined) {
    	        return 0
    	      } else if (b === undefined) {
    	        return 1
    	      } else if (a === undefined) {
    	        return -1
    	      } else if (a === b) {
    	        continue
    	      } else {
    	        return compareIdentifiers(a, b)
    	      }
    	    } while (++i)
    	  }

    	  compareBuild (other) {
    	    if (!(other instanceof SemVer)) {
    	      other = new SemVer(other, this.options);
    	    }

    	    let i = 0;
    	    do {
    	      const a = this.build[i];
    	      const b = other.build[i];
    	      debug('build compare', i, a, b);
    	      if (a === undefined && b === undefined) {
    	        return 0
    	      } else if (b === undefined) {
    	        return 1
    	      } else if (a === undefined) {
    	        return -1
    	      } else if (a === b) {
    	        continue
    	      } else {
    	        return compareIdentifiers(a, b)
    	      }
    	    } while (++i)
    	  }

    	  // preminor will bump the version up to the next minor release, and immediately
    	  // down to pre-release. premajor and prepatch work the same way.
    	  inc (release, identifier, identifierBase) {
    	    switch (release) {
    	      case 'premajor':
    	        this.prerelease.length = 0;
    	        this.patch = 0;
    	        this.minor = 0;
    	        this.major++;
    	        this.inc('pre', identifier, identifierBase);
    	        break
    	      case 'preminor':
    	        this.prerelease.length = 0;
    	        this.patch = 0;
    	        this.minor++;
    	        this.inc('pre', identifier, identifierBase);
    	        break
    	      case 'prepatch':
    	        // If this is already a prerelease, it will bump to the next version
    	        // drop any prereleases that might already exist, since they are not
    	        // relevant at this point.
    	        this.prerelease.length = 0;
    	        this.inc('patch', identifier, identifierBase);
    	        this.inc('pre', identifier, identifierBase);
    	        break
    	      // If the input is a non-prerelease version, this acts the same as
    	      // prepatch.
    	      case 'prerelease':
    	        if (this.prerelease.length === 0) {
    	          this.inc('patch', identifier, identifierBase);
    	        }
    	        this.inc('pre', identifier, identifierBase);
    	        break

    	      case 'major':
    	        // If this is a pre-major version, bump up to the same major version.
    	        // Otherwise increment major.
    	        // 1.0.0-5 bumps to 1.0.0
    	        // 1.1.0 bumps to 2.0.0
    	        if (
    	          this.minor !== 0 ||
    	          this.patch !== 0 ||
    	          this.prerelease.length === 0
    	        ) {
    	          this.major++;
    	        }
    	        this.minor = 0;
    	        this.patch = 0;
    	        this.prerelease = [];
    	        break
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
    	        break
    	      case 'patch':
    	        // If this is not a pre-release version, it will increment the patch.
    	        // If it is a pre-release it will bump up to the same patch version.
    	        // 1.2.0-5 patches to 1.2.0
    	        // 1.2.0 patches to 1.2.1
    	        if (this.prerelease.length === 0) {
    	          this.patch++;
    	        }
    	        this.prerelease = [];
    	        break
    	      // This probably shouldn't be used publicly.
    	      // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
    	      case 'pre': {
    	        const base = Number(identifierBase) ? 1 : 0;

    	        if (!identifier && identifierBase === false) {
    	          throw new Error('invalid increment argument: identifier is empty')
    	        }

    	        if (this.prerelease.length === 0) {
    	          this.prerelease = [base];
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
    	            if (identifier === this.prerelease.join('.') && identifierBase === false) {
    	              throw new Error('invalid increment argument: identifier already exists')
    	            }
    	            this.prerelease.push(base);
    	          }
    	        }
    	        if (identifier) {
    	          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
    	          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
    	          let prerelease = [identifier, base];
    	          if (identifierBase === false) {
    	            prerelease = [identifier];
    	          }
    	          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
    	            if (isNaN(this.prerelease[1])) {
    	              this.prerelease = prerelease;
    	            }
    	          } else {
    	            this.prerelease = prerelease;
    	          }
    	        }
    	        break
    	      }
    	      default:
    	        throw new Error(`invalid increment argument: ${release}`)
    	    }
    	    this.raw = this.format();
    	    if (this.build.length) {
    	      this.raw += `+${this.build.join('.')}`;
    	    }
    	    return this
    	  }
    	}

    	semver = SemVer;
    	return semver;
    }

    var compare_1;
    var hasRequiredCompare;

    function requireCompare () {
    	if (hasRequiredCompare) return compare_1;
    	hasRequiredCompare = 1;
    	const SemVer = requireSemver();
    	const compare = (a, b, loose) =>
    	  new SemVer(a, loose).compare(new SemVer(b, loose));

    	compare_1 = compare;
    	return compare_1;
    }

    var eq_1;
    var hasRequiredEq;

    function requireEq () {
    	if (hasRequiredEq) return eq_1;
    	hasRequiredEq = 1;
    	const compare = requireCompare();
    	const eq = (a, b, loose) => compare(a, b, loose) === 0;
    	eq_1 = eq;
    	return eq_1;
    }

    var neq_1;
    var hasRequiredNeq;

    function requireNeq () {
    	if (hasRequiredNeq) return neq_1;
    	hasRequiredNeq = 1;
    	const compare = requireCompare();
    	const neq = (a, b, loose) => compare(a, b, loose) !== 0;
    	neq_1 = neq;
    	return neq_1;
    }

    var gt_1;
    var hasRequiredGt;

    function requireGt () {
    	if (hasRequiredGt) return gt_1;
    	hasRequiredGt = 1;
    	const compare = requireCompare();
    	const gt = (a, b, loose) => compare(a, b, loose) > 0;
    	gt_1 = gt;
    	return gt_1;
    }

    var gte_1;
    var hasRequiredGte;

    function requireGte () {
    	if (hasRequiredGte) return gte_1;
    	hasRequiredGte = 1;
    	const compare = requireCompare();
    	const gte = (a, b, loose) => compare(a, b, loose) >= 0;
    	gte_1 = gte;
    	return gte_1;
    }

    var lt_1;
    var hasRequiredLt;

    function requireLt () {
    	if (hasRequiredLt) return lt_1;
    	hasRequiredLt = 1;
    	const compare = requireCompare();
    	const lt = (a, b, loose) => compare(a, b, loose) < 0;
    	lt_1 = lt;
    	return lt_1;
    }

    var lte_1;
    var hasRequiredLte;

    function requireLte () {
    	if (hasRequiredLte) return lte_1;
    	hasRequiredLte = 1;
    	const compare = requireCompare();
    	const lte = (a, b, loose) => compare(a, b, loose) <= 0;
    	lte_1 = lte;
    	return lte_1;
    }

    var cmp_1;
    var hasRequiredCmp;

    function requireCmp () {
    	if (hasRequiredCmp) return cmp_1;
    	hasRequiredCmp = 1;
    	const eq = requireEq();
    	const neq = requireNeq();
    	const gt = requireGt();
    	const gte = requireGte();
    	const lt = requireLt();
    	const lte = requireLte();

    	const cmp = (a, op, b, loose) => {
    	  switch (op) {
    	    case '===':
    	      if (typeof a === 'object') {
    	        a = a.version;
    	      }
    	      if (typeof b === 'object') {
    	        b = b.version;
    	      }
    	      return a === b

    	    case '!==':
    	      if (typeof a === 'object') {
    	        a = a.version;
    	      }
    	      if (typeof b === 'object') {
    	        b = b.version;
    	      }
    	      return a !== b

    	    case '':
    	    case '=':
    	    case '==':
    	      return eq(a, b, loose)

    	    case '!=':
    	      return neq(a, b, loose)

    	    case '>':
    	      return gt(a, b, loose)

    	    case '>=':
    	      return gte(a, b, loose)

    	    case '<':
    	      return lt(a, b, loose)

    	    case '<=':
    	      return lte(a, b, loose)

    	    default:
    	      throw new TypeError(`Invalid operator: ${op}`)
    	  }
    	};
    	cmp_1 = cmp;
    	return cmp_1;
    }

    var comparator;
    var hasRequiredComparator;

    function requireComparator () {
    	if (hasRequiredComparator) return comparator;
    	hasRequiredComparator = 1;
    	const ANY = Symbol('SemVer ANY');
    	// hoisted class for cyclic dependency
    	class Comparator {
    	  static get ANY () {
    	    return ANY
    	  }

    	  constructor (comp, options) {
    	    options = parseOptions(options);

    	    if (comp instanceof Comparator) {
    	      if (comp.loose === !!options.loose) {
    	        return comp
    	      } else {
    	        comp = comp.value;
    	      }
    	    }

    	    comp = comp.trim().split(/\s+/).join(' ');
    	    debug('comparator', comp, options);
    	    this.options = options;
    	    this.loose = !!options.loose;
    	    this.parse(comp);

    	    if (this.semver === ANY) {
    	      this.value = '';
    	    } else {
    	      this.value = this.operator + this.semver.version;
    	    }

    	    debug('comp', this);
    	  }

    	  parse (comp) {
    	    const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
    	    const m = comp.match(r);

    	    if (!m) {
    	      throw new TypeError(`Invalid comparator: ${comp}`)
    	    }

    	    this.operator = m[1] !== undefined ? m[1] : '';
    	    if (this.operator === '=') {
    	      this.operator = '';
    	    }

    	    // if it literally is just '>' or '' then allow anything.
    	    if (!m[2]) {
    	      this.semver = ANY;
    	    } else {
    	      this.semver = new SemVer(m[2], this.options.loose);
    	    }
    	  }

    	  toString () {
    	    return this.value
    	  }

    	  test (version) {
    	    debug('Comparator.test', version, this.options.loose);

    	    if (this.semver === ANY || version === ANY) {
    	      return true
    	    }

    	    if (typeof version === 'string') {
    	      try {
    	        version = new SemVer(version, this.options);
    	      } catch (er) {
    	        return false
    	      }
    	    }

    	    return cmp(version, this.operator, this.semver, this.options)
    	  }

    	  intersects (comp, options) {
    	    if (!(comp instanceof Comparator)) {
    	      throw new TypeError('a Comparator is required')
    	    }

    	    if (this.operator === '') {
    	      if (this.value === '') {
    	        return true
    	      }
    	      return new Range(comp.value, options).test(this.value)
    	    } else if (comp.operator === '') {
    	      if (comp.value === '') {
    	        return true
    	      }
    	      return new Range(this.value, options).test(comp.semver)
    	    }

    	    options = parseOptions(options);

    	    // Special cases where nothing can possibly be lower
    	    if (options.includePrerelease &&
    	      (this.value === '<0.0.0-0' || comp.value === '<0.0.0-0')) {
    	      return false
    	    }
    	    if (!options.includePrerelease &&
    	      (this.value.startsWith('<0.0.0') || comp.value.startsWith('<0.0.0'))) {
    	      return false
    	    }

    	    // Same direction increasing (> or >=)
    	    if (this.operator.startsWith('>') && comp.operator.startsWith('>')) {
    	      return true
    	    }
    	    // Same direction decreasing (< or <=)
    	    if (this.operator.startsWith('<') && comp.operator.startsWith('<')) {
    	      return true
    	    }
    	    // same SemVer and both sides are inclusive (<= or >=)
    	    if (
    	      (this.semver.version === comp.semver.version) &&
    	      this.operator.includes('=') && comp.operator.includes('=')) {
    	      return true
    	    }
    	    // opposite directions less than
    	    if (cmp(this.semver, '<', comp.semver, options) &&
    	      this.operator.startsWith('>') && comp.operator.startsWith('<')) {
    	      return true
    	    }
    	    // opposite directions greater than
    	    if (cmp(this.semver, '>', comp.semver, options) &&
    	      this.operator.startsWith('<') && comp.operator.startsWith('>')) {
    	      return true
    	    }
    	    return false
    	  }
    	}

    	comparator = Comparator;

    	const parseOptions = requireParseOptions();
    	const { safeRe: re, t } = requireRe();
    	const cmp = requireCmp();
    	const debug = requireDebug();
    	const SemVer = requireSemver();
    	const Range = requireRange();
    	return comparator;
    }

    var range;
    var hasRequiredRange;

    function requireRange () {
    	if (hasRequiredRange) return range;
    	hasRequiredRange = 1;
    	const SPACE_CHARACTERS = /\s+/g;

    	// hoisted class for cyclic dependency
    	class Range {
    	  constructor (range, options) {
    	    options = parseOptions(options);

    	    if (range instanceof Range) {
    	      if (
    	        range.loose === !!options.loose &&
    	        range.includePrerelease === !!options.includePrerelease
    	      ) {
    	        return range
    	      } else {
    	        return new Range(range.raw, options)
    	      }
    	    }

    	    if (range instanceof Comparator) {
    	      // just put it in the set and return
    	      this.raw = range.value;
    	      this.set = [[range]];
    	      this.formatted = undefined;
    	      return this
    	    }

    	    this.options = options;
    	    this.loose = !!options.loose;
    	    this.includePrerelease = !!options.includePrerelease;

    	    // First reduce all whitespace as much as possible so we do not have to rely
    	    // on potentially slow regexes like \s*. This is then stored and used for
    	    // future error messages as well.
    	    this.raw = range.trim().replace(SPACE_CHARACTERS, ' ');

    	    // First, split on ||
    	    this.set = this.raw
    	      .split('||')
    	      // map the range to a 2d array of comparators
    	      .map(r => this.parseRange(r.trim()))
    	      // throw out any comparator lists that are empty
    	      // this generally means that it was not a valid range, which is allowed
    	      // in loose mode, but will still throw if the WHOLE range is invalid.
    	      .filter(c => c.length);

    	    if (!this.set.length) {
    	      throw new TypeError(`Invalid SemVer Range: ${this.raw}`)
    	    }

    	    // if we have any that are not the null set, throw out null sets.
    	    if (this.set.length > 1) {
    	      // keep the first one, in case they're all null sets
    	      const first = this.set[0];
    	      this.set = this.set.filter(c => !isNullSet(c[0]));
    	      if (this.set.length === 0) {
    	        this.set = [first];
    	      } else if (this.set.length > 1) {
    	        // if we have any that are *, then the range is just *
    	        for (const c of this.set) {
    	          if (c.length === 1 && isAny(c[0])) {
    	            this.set = [c];
    	            break
    	          }
    	        }
    	      }
    	    }

    	    this.formatted = undefined;
    	  }

    	  get range () {
    	    if (this.formatted === undefined) {
    	      this.formatted = '';
    	      for (let i = 0; i < this.set.length; i++) {
    	        if (i > 0) {
    	          this.formatted += '||';
    	        }
    	        const comps = this.set[i];
    	        for (let k = 0; k < comps.length; k++) {
    	          if (k > 0) {
    	            this.formatted += ' ';
    	          }
    	          this.formatted += comps[k].toString().trim();
    	        }
    	      }
    	    }
    	    return this.formatted
    	  }

    	  format () {
    	    return this.range
    	  }

    	  toString () {
    	    return this.range
    	  }

    	  parseRange (range) {
    	    // memoize range parsing for performance.
    	    // this is a very hot path, and fully deterministic.
    	    const memoOpts =
    	      (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) |
    	      (this.options.loose && FLAG_LOOSE);
    	    const memoKey = memoOpts + ':' + range;
    	    const cached = cache.get(memoKey);
    	    if (cached) {
    	      return cached
    	    }

    	    const loose = this.options.loose;
    	    // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
    	    const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
    	    range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
    	    debug('hyphen replace', range);

    	    // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
    	    range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
    	    debug('comparator trim', range);

    	    // `~ 1.2.3` => `~1.2.3`
    	    range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
    	    debug('tilde trim', range);

    	    // `^ 1.2.3` => `^1.2.3`
    	    range = range.replace(re[t.CARETTRIM], caretTrimReplace);
    	    debug('caret trim', range);

    	    // At this point, the range is completely trimmed and
    	    // ready to be split into comparators.

    	    let rangeList = range
    	      .split(' ')
    	      .map(comp => parseComparator(comp, this.options))
    	      .join(' ')
    	      .split(/\s+/)
    	      // >=0.0.0 is equivalent to *
    	      .map(comp => replaceGTE0(comp, this.options));

    	    if (loose) {
    	      // in loose mode, throw out any that are not valid comparators
    	      rangeList = rangeList.filter(comp => {
    	        debug('loose invalid filter', comp, this.options);
    	        return !!comp.match(re[t.COMPARATORLOOSE])
    	      });
    	    }
    	    debug('range list', rangeList);

    	    // if any comparators are the null set, then replace with JUST null set
    	    // if more than one comparator, remove any * comparators
    	    // also, don't include the same comparator more than once
    	    const rangeMap = new Map();
    	    const comparators = rangeList.map(comp => new Comparator(comp, this.options));
    	    for (const comp of comparators) {
    	      if (isNullSet(comp)) {
    	        return [comp]
    	      }
    	      rangeMap.set(comp.value, comp);
    	    }
    	    if (rangeMap.size > 1 && rangeMap.has('')) {
    	      rangeMap.delete('');
    	    }

    	    const result = [...rangeMap.values()];
    	    cache.set(memoKey, result);
    	    return result
    	  }

    	  intersects (range, options) {
    	    if (!(range instanceof Range)) {
    	      throw new TypeError('a Range is required')
    	    }

    	    return this.set.some((thisComparators) => {
    	      return (
    	        isSatisfiable(thisComparators, options) &&
    	        range.set.some((rangeComparators) => {
    	          return (
    	            isSatisfiable(rangeComparators, options) &&
    	            thisComparators.every((thisComparator) => {
    	              return rangeComparators.every((rangeComparator) => {
    	                return thisComparator.intersects(rangeComparator, options)
    	              })
    	            })
    	          )
    	        })
    	      )
    	    })
    	  }

    	  // if ANY of the sets match ALL of its comparators, then pass
    	  test (version) {
    	    if (!version) {
    	      return false
    	    }

    	    if (typeof version === 'string') {
    	      try {
    	        version = new SemVer(version, this.options);
    	      } catch (er) {
    	        return false
    	      }
    	    }

    	    for (let i = 0; i < this.set.length; i++) {
    	      if (testSet(this.set[i], version, this.options)) {
    	        return true
    	      }
    	    }
    	    return false
    	  }
    	}

    	range = Range;

    	const LRU = requireLrucache();
    	const cache = new LRU();

    	const parseOptions = requireParseOptions();
    	const Comparator = requireComparator();
    	const debug = requireDebug();
    	const SemVer = requireSemver();
    	const {
    	  safeRe: re,
    	  t,
    	  comparatorTrimReplace,
    	  tildeTrimReplace,
    	  caretTrimReplace,
    	} = requireRe();
    	const { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = requireConstants();

    	const isNullSet = c => c.value === '<0.0.0-0';
    	const isAny = c => c.value === '';

    	// take a set of comparators and determine whether there
    	// exists a version which can satisfy it
    	const isSatisfiable = (comparators, options) => {
    	  let result = true;
    	  const remainingComparators = comparators.slice();
    	  let testComparator = remainingComparators.pop();

    	  while (result && remainingComparators.length) {
    	    result = remainingComparators.every((otherComparator) => {
    	      return testComparator.intersects(otherComparator, options)
    	    });

    	    testComparator = remainingComparators.pop();
    	  }

    	  return result
    	};

    	// comprised of xranges, tildes, stars, and gtlt's at this point.
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
    	  return comp
    	};

    	const isX = id => !id || id.toLowerCase() === 'x' || id === '*';

    	// ~, ~> --> * (any, kinda silly)
    	// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
    	// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
    	// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
    	// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
    	// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
    	// ~0.0.1 --> >=0.0.1 <0.1.0-0
    	const replaceTildes = (comp, options) => {
    	  return comp
    	    .trim()
    	    .split(/\s+/)
    	    .map((c) => replaceTilde(c, options))
    	    .join(' ')
    	};

    	const replaceTilde = (comp, options) => {
    	  const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
    	  return comp.replace(r, (_, M, m, p, pr) => {
    	    debug('tilde', comp, _, M, m, p, pr);
    	    let ret;

    	    if (isX(M)) {
    	      ret = '';
    	    } else if (isX(m)) {
    	      ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
    	    } else if (isX(p)) {
    	      // ~1.2 == >=1.2.0 <1.3.0-0
    	      ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
    	    } else if (pr) {
    	      debug('replaceTilde pr', pr);
    	      ret = `>=${M}.${m}.${p}-${pr
	      } <${M}.${+m + 1}.0-0`;
    	    } else {
    	      // ~1.2.3 == >=1.2.3 <1.3.0-0
    	      ret = `>=${M}.${m}.${p
	      } <${M}.${+m + 1}.0-0`;
    	    }

    	    debug('tilde return', ret);
    	    return ret
    	  })
    	};

    	// ^ --> * (any, kinda silly)
    	// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
    	// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
    	// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
    	// ^1.2.3 --> >=1.2.3 <2.0.0-0
    	// ^1.2.0 --> >=1.2.0 <2.0.0-0
    	// ^0.0.1 --> >=0.0.1 <0.0.2-0
    	// ^0.1.0 --> >=0.1.0 <0.2.0-0
    	const replaceCarets = (comp, options) => {
    	  return comp
    	    .trim()
    	    .split(/\s+/)
    	    .map((c) => replaceCaret(c, options))
    	    .join(' ')
    	};

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
    	      ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
    	    } else if (isX(p)) {
    	      if (M === '0') {
    	        ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
    	      } else {
    	        ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
    	      }
    	    } else if (pr) {
    	      debug('replaceCaret pr', pr);
    	      if (M === '0') {
    	        if (m === '0') {
    	          ret = `>=${M}.${m}.${p}-${pr
	          } <${M}.${m}.${+p + 1}-0`;
    	        } else {
    	          ret = `>=${M}.${m}.${p}-${pr
	          } <${M}.${+m + 1}.0-0`;
    	        }
    	      } else {
    	        ret = `>=${M}.${m}.${p}-${pr
	        } <${+M + 1}.0.0-0`;
    	      }
    	    } else {
    	      debug('no pr');
    	      if (M === '0') {
    	        if (m === '0') {
    	          ret = `>=${M}.${m}.${p
	          }${z} <${M}.${m}.${+p + 1}-0`;
    	        } else {
    	          ret = `>=${M}.${m}.${p
	          }${z} <${M}.${+m + 1}.0-0`;
    	        }
    	      } else {
    	        ret = `>=${M}.${m}.${p
	        } <${+M + 1}.0.0-0`;
    	      }
    	    }

    	    debug('caret return', ret);
    	    return ret
    	  })
    	};

    	const replaceXRanges = (comp, options) => {
    	  debug('replaceXRanges', comp, options);
    	  return comp
    	    .split(/\s+/)
    	    .map((c) => replaceXRange(c, options))
    	    .join(' ')
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
    	    }

    	    // if we're including prereleases in the match, then we need
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

    	      if (gtlt === '<') {
    	        pr = '-0';
    	      }

    	      ret = `${gtlt + M}.${m}.${p}${pr}`;
    	    } else if (xm) {
    	      ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
    	    } else if (xp) {
    	      ret = `>=${M}.${m}.0${pr
	      } <${M}.${+m + 1}.0-0`;
    	    }

    	    debug('xRange return', ret);

    	    return ret
    	  })
    	};

    	// Because * is AND-ed with everything else in the comparator,
    	// and '' means "any version", just remove the *s entirely.
    	const replaceStars = (comp, options) => {
    	  debug('replaceStars', comp, options);
    	  // Looseness is ignored here.  star is always as loose as it gets!
    	  return comp
    	    .trim()
    	    .replace(re[t.STAR], '')
    	};

    	const replaceGTE0 = (comp, options) => {
    	  debug('replaceGTE0', comp, options);
    	  return comp
    	    .trim()
    	    .replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '')
    	};

    	// This function is passed to string.replace(re[t.HYPHENRANGE])
    	// M, m, patch, prerelease, build
    	// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
    	// 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
    	// 1.2 - 3.4 => >=1.2.0 <3.5.0-0
    	// TODO build?
    	const hyphenReplace = incPr => ($0,
    	  from, fM, fm, fp, fpr, fb,
    	  to, tM, tm, tp, tpr) => {
    	  if (isX(fM)) {
    	    from = '';
    	  } else if (isX(fm)) {
    	    from = `>=${fM}.0.0${incPr ? '-0' : ''}`;
    	  } else if (isX(fp)) {
    	    from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`;
    	  } else if (fpr) {
    	    from = `>=${from}`;
    	  } else {
    	    from = `>=${from}${incPr ? '-0' : ''}`;
    	  }

    	  if (isX(tM)) {
    	    to = '';
    	  } else if (isX(tm)) {
    	    to = `<${+tM + 1}.0.0-0`;
    	  } else if (isX(tp)) {
    	    to = `<${tM}.${+tm + 1}.0-0`;
    	  } else if (tpr) {
    	    to = `<=${tM}.${tm}.${tp}-${tpr}`;
    	  } else if (incPr) {
    	    to = `<${tM}.${tm}.${+tp + 1}-0`;
    	  } else {
    	    to = `<=${to}`;
    	  }

    	  return `${from} ${to}`.trim()
    	};

    	const testSet = (set, version, options) => {
    	  for (let i = 0; i < set.length; i++) {
    	    if (!set[i].test(version)) {
    	      return false
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
    	        continue
    	      }

    	      if (set[i].semver.prerelease.length > 0) {
    	        const allowed = set[i].semver;
    	        if (allowed.major === version.major &&
    	            allowed.minor === version.minor &&
    	            allowed.patch === version.patch) {
    	          return true
    	        }
    	      }
    	    }

    	    // Version has a -pre, but it's not one of the ones we like.
    	    return false
    	  }

    	  return true
    	};
    	return range;
    }

    var satisfies_1;
    var hasRequiredSatisfies;

    function requireSatisfies () {
    	if (hasRequiredSatisfies) return satisfies_1;
    	hasRequiredSatisfies = 1;
    	const Range = requireRange();
    	const satisfies = (version, range, options) => {
    	  try {
    	    range = new Range(range, options);
    	  } catch (er) {
    	    return false
    	  }
    	  return range.test(version)
    	};
    	satisfies_1 = satisfies;
    	return satisfies_1;
    }

    var satisfiesExports = requireSatisfies();
    var satisfies = /*@__PURE__*/getDefaultExportFromCjs(satisfiesExports);

    function adjustSpatial (item, encode, swap) {
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
    const DisallowedMethods = new Set([Function, eval, setTimeout, setInterval]);
    if (typeof setImmediate === 'function') DisallowedMethods.add(setImmediate);
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
        if (DisallowedMethods.has(o[p])) {
          // eslint-disable-next-line no-console
          console.error(`Prevented interpretation of member "${p}" which could lead to insecure code execution`);
          return;
        }
        return o[p];
      },
      CallExpression: ($, n) => {
        const args = n.arguments;
        let name = n.callee.name;

        // handle special internal functions used by encoders
        // re-route to corresponding standard function
        if (name.startsWith('_')) {
          name = name.slice(1);
        }

        // special case "if" due to conditional evaluation of branches
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
        if (DisallowedMethods.has($(p.value))) {
          // eslint-disable-next-line no-console
          console.error(`Prevented interpretation of property "${k}" which could lead to insecure code execution`);
        } else {
          o[k] = $(p.value);
        }
        return o;
      }, {})
    };
    function interpret (ast, fn, params, datum, event, item) {
      const $ = n => Visitors[n.type]($, n);
      $.memberDepth = 0;
      $.fn = Object.create(fn);
      $.params = params;
      $.datum = datum;
      $.event = event;
      $.item = item;

      // route event functions to annotated vega event context
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

    function e(e){const[n,r]=/schema\/([\w-]+)\/([\w\.\-]+)\.json$/g.exec(e).slice(1,3);return {library:n,version:r}}

    var name$1 = "vega-themes";
    var version$1$1 = "2.15.0";
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
      preversion: "yarn lint",
      serve: "browser-sync start -s -f build examples --serveStatic examples",
      start: "yarn build && concurrently --kill-others -n Server,Rollup 'yarn serve' 'rollup -c -w'",
      format: "eslint . --fix",
      lint: "eslint .",
      release: "release-it"
    };
    var devDependencies$1 = {
      "@babel/core": "^7.24.6",
      "@babel/plugin-transform-runtime": "^7.24.6",
      "@babel/preset-env": "^7.24.6",
      "@babel/preset-typescript": "^7.24.6",
      "@release-it/conventional-changelog": "^8.0.1",
      "@rollup/plugin-json": "^6.1.0",
      "@rollup/plugin-node-resolve": "^15.2.3",
      "@rollup/plugin-terser": "^0.4.4",
      "@typescript-eslint/eslint-plugin": "^7.11.0",
      "@typescript-eslint/parser": "^7.11.0",
      "browser-sync": "^3.0.2",
      concurrently: "^8.2.2",
      eslint: "^8.45.0",
      "eslint-config-prettier": "^9.1.0",
      "eslint-plugin-prettier": "^5.1.3",
      "gh-pages": "^6.1.1",
      prettier: "^3.2.5",
      "release-it": "^17.3.0",
      rollup: "^4.18.0",
      "rollup-plugin-bundle-size": "^1.0.3",
      "rollup-plugin-ts": "^3.4.5",
      typescript: "^5.4.5",
      vega: "^5.25.0",
      "vega-lite": "^5.9.3"
    };
    var peerDependencies$1 = {
      vega: "*",
      "vega-lite": "*"
    };
    var dependencies$1 = {};
    var pkg$1 = {
      name: name$1,
      version: version$1$1,
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
      peerDependencies: peerDependencies$1,
      dependencies: dependencies$1
    };

    const lightColor = '#fff';
    const medColor = '#888';
    const darkTheme = {
      background: '#333',
      view: {
        stroke: medColor
      },
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

    const markColor$7 = '#4572a7';
    const excelTheme = {
      background: '#fff',
      arc: {
        fill: markColor$7
      },
      area: {
        fill: markColor$7
      },
      line: {
        stroke: markColor$7,
        strokeWidth: 2
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
        fill: markColor$7,
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

    const markColor$6 = '#30a2da';
    const axisColor$2 = '#cbcbcb';
    const guideLabelColor = '#999';
    const guideTitleColor = '#333';
    const backgroundColor$2 = '#f0f0f0';
    const blackTitle = '#333';
    const fiveThirtyEightTheme = {
      arc: {
        fill: markColor$6
      },
      area: {
        fill: markColor$6
      },
      axis: {
        domainColor: axisColor$2,
        grid: true,
        gridColor: axisColor$2,
        gridWidth: 1,
        labelColor: guideLabelColor,
        labelFontSize: 10,
        titleColor: guideTitleColor,
        tickColor: axisColor$2,
        tickSize: 10,
        titleFontSize: 14,
        titlePadding: 10,
        labelPadding: 4
      },
      axisBand: {
        grid: false
      },
      background: backgroundColor$2,
      group: {
        fill: backgroundColor$2
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
        stroke: markColor$6,
        strokeWidth: 2
      },
      path: {
        stroke: markColor$6,
        strokeWidth: 0.5
      },
      rect: {
        fill: markColor$6
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
        stroke: markColor$6
      },
      bar: {
        binSpacing: 2,
        fill: markColor$6,
        stroke: null
      },
      title: {
        anchor: 'start',
        fontSize: 24,
        fontWeight: 600,
        offset: 20
      }
    };

    const markColor$5 = '#000';
    const ggplot2Theme = {
      group: {
        fill: '#e5e5e5'
      },
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
        fill: markColor$5,
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
    const labelFont$1 = 'Benton Gothic, sans-serif';
    const labelFontSize = 11.5;
    const labelFontWeight = 'normal';
    const markColor$4 = '#82c6df';
    // const markHighlight = '#006d8f';
    // const markDemocrat = '#5789b8';
    // const markRepublican = '#d94f54';
    const titleFont = 'Benton Gothic Bold, sans-serif';
    const titleFontWeight = 'normal';
    const titleFontSize$1 = 13;
    const colorSchemes$1 = {
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
        fill: markColor$4
      },
      area: {
        fill: markColor$4
      },
      line: {
        stroke: markColor$4,
        strokeWidth: 2
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
        labelFont: labelFont$1,
        labelFontSize,
        labelFontWeight,
        titleFont,
        titleFontSize: titleFontSize$1,
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
        labelFont: labelFont$1,
        labelFontSize,
        symbolType: 'square',
        titleFont,
        titleFontSize: titleFontSize$1,
        titleFontWeight
      },
      range: {
        category: colorSchemes$1['category-6'],
        diverging: colorSchemes$1['fireandice-6'],
        heatmap: colorSchemes$1['fire-7'],
        ordinal: colorSchemes$1['fire-7'],
        ramp: colorSchemes$1['fire-7']
      }
    };

    const markColor$3 = '#ab5787';
    const axisColor$1 = '#979797';
    const quartzTheme = {
      background: '#f9f9f9',
      arc: {
        fill: markColor$3
      },
      area: {
        fill: markColor$3
      },
      line: {
        stroke: markColor$3
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

    const markColor$2 = '#3e5c69';
    const voxTheme = {
      background: '#fff',
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
        fill: markColor$2
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

    const markColor$1 = '#1696d2';
    const axisColor = '#000000';
    const backgroundColor$1 = '#FFFFFF';
    const font = 'Lato';
    const labelFont = 'Lato';
    const sourceFont = 'Lato';
    const gridColor$1 = '#DEDDDD';
    const titleFontSize = 18;
    const colorSchemes = {
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
        fontSize: titleFontSize,
        font: font
      },
      axisX: {
        domain: true,
        domainColor: axisColor,
        domainWidth: 1,
        grid: false,
        labelFontSize: 12,
        labelFont: labelFont,
        labelAngle: 0,
        tickColor: axisColor,
        tickSize: 5,
        titleFontSize: 12,
        titlePadding: 10,
        titleFont: font
      },
      axisY: {
        domain: false,
        domainWidth: 1,
        grid: true,
        gridColor: gridColor$1,
        gridWidth: 1,
        labelFontSize: 12,
        labelFont: labelFont,
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
        labelFont: labelFont,
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
        category: colorSchemes['six-groups-cat-1'],
        diverging: colorSchemes['diverging-colors'],
        heatmap: colorSchemes['diverging-colors'],
        ordinal: colorSchemes['six-groups-seq'],
        ramp: colorSchemes['shades-blue']
      },
      area: {
        fill: markColor$1
      },
      rect: {
        fill: markColor$1
      },
      line: {
        color: markColor$1,
        stroke: markColor$1,
        strokeWidth: 5
      },
      trail: {
        color: markColor$1,
        stroke: markColor$1,
        strokeWidth: 0,
        size: 1
      },
      path: {
        stroke: markColor$1,
        strokeWidth: 0.5
      },
      point: {
        filled: true
      },
      text: {
        font: sourceFont,
        color: markColor$1,
        fontSize: 11,
        align: 'center',
        fontWeight: 400,
        size: 11
      },
      style: {
        bar: {
          fill: markColor$1,
          stroke: null
        }
      },
      arc: {
        fill: markColor$1
      },
      shape: {
        stroke: markColor$1
      },
      symbol: {
        fill: markColor$1,
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

    const markColor = '#3366CC';
    const gridColor = '#ccc';
    const defaultFont$1 = 'Arial, sans-serif';
    const googlechartsTheme = {
      arc: {
        fill: markColor
      },
      area: {
        fill: markColor
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
        stroke: markColor
      },
      circle: {
        fill: markColor
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
          font: defaultFont$1,
          fontSize: 12
        },
        'guide-title': {
          font: defaultFont$1,
          fontSize: 12
        },
        'group-title': {
          font: defaultFont$1,
          fontSize: 12
        }
      },
      title: {
        font: defaultFont$1,
        fontSize: 14,
        fontWeight: 'bold',
        dy: -3,
        anchor: 'start'
      },
      axis: {
        gridColor: gridColor,
        tickColor: gridColor,
        domain: false,
        grid: true
      },
      range: {
        category: ['#4285F4', '#DB4437', '#F4B400', '#0F9D58', '#AB47BC', '#00ACC1', '#FF7043', '#9E9D24', '#5C6BC0', '#F06292', '#00796B', '#C2185B'],
        heatmap: ['#c6dafc', '#5e97f6', '#2a56c6']
      }
    };

    const ptToPx = value => value * (1 / 3 + 1);
    const fontSmallPx = ptToPx(9);
    const legendFontPx = ptToPx(10);
    const fontLargePx = ptToPx(12);
    const fontStandard = 'Segoe UI';
    const fontTitle = 'wf_standard-font, helvetica, arial, sans-serif';
    const firstLevelElementColor = '#252423';
    const secondLevelElementColor = '#605E5C';
    const backgroundColor = 'transparent';
    const backgroundSecondaryColor = '#C8C6C4';
    const paletteColor1 = '#118DFF';
    const paletteColor2 = '#12239E';
    const paletteColor3 = '#E66C37';
    const paletteColor4 = '#6B007B';
    const paletteColor5 = '#E044A7';
    const paletteColor6 = '#744EC2';
    const paletteColor7 = '#D9B300';
    const paletteColor8 = '#D64550';
    const divergentColorMax = paletteColor1;
    const divergentColorMin = '#DEEFFF';
    const divergentPalette = [divergentColorMin, divergentColorMax];
    const ordinalPalette = [divergentColorMin, '#c7e4ff', '#b0d9ff', '#9aceff', '#83c3ff', '#6cb9ff', '#55aeff', '#3fa3ff', '#2898ff', divergentColorMax];
    const powerbiTheme = {
      view: {
        stroke: backgroundColor
      },
      background: backgroundColor,
      font: fontStandard,
      header: {
        titleFont: fontTitle,
        titleFontSize: fontLargePx,
        titleColor: firstLevelElementColor,
        labelFont: fontStandard,
        labelFontSize: legendFontPx,
        labelColor: secondLevelElementColor
      },
      axis: {
        ticks: false,
        grid: false,
        domain: false,
        labelColor: secondLevelElementColor,
        labelFontSize: fontSmallPx,
        titleFont: fontTitle,
        titleColor: firstLevelElementColor,
        titleFontSize: fontLargePx,
        titleFontWeight: 'normal'
      },
      axisQuantitative: {
        tickCount: 3,
        grid: true,
        gridColor: backgroundSecondaryColor,
        gridDash: [1, 5],
        labelFlush: false
      },
      axisBand: {
        tickExtra: true
      },
      axisX: {
        labelPadding: 5
      },
      axisY: {
        labelPadding: 10
      },
      bar: {
        fill: paletteColor1
      },
      line: {
        stroke: paletteColor1,
        strokeWidth: 3,
        strokeCap: 'round',
        strokeJoin: 'round'
      },
      text: {
        font: fontStandard,
        fontSize: fontSmallPx,
        fill: secondLevelElementColor
      },
      arc: {
        fill: paletteColor1
      },
      area: {
        fill: paletteColor1,
        line: true,
        opacity: 0.6
      },
      path: {
        stroke: paletteColor1
      },
      rect: {
        fill: paletteColor1
      },
      point: {
        fill: paletteColor1,
        filled: true,
        size: 75
      },
      shape: {
        stroke: paletteColor1
      },
      symbol: {
        fill: paletteColor1,
        strokeWidth: 1.5,
        size: 50
      },
      legend: {
        titleFont: fontStandard,
        titleFontWeight: 'bold',
        titleColor: secondLevelElementColor,
        labelFont: fontStandard,
        labelFontSize: legendFontPx,
        labelColor: secondLevelElementColor,
        symbolType: 'circle',
        symbolSize: 75
      },
      range: {
        category: [paletteColor1, paletteColor2, paletteColor3, paletteColor4, paletteColor5, paletteColor6, paletteColor7, paletteColor8],
        diverging: divergentPalette,
        heatmap: divergentPalette,
        ordinal: ordinalPalette
      }
    };

    const defaultFont = 'IBM Plex Sans,system-ui,-apple-system,BlinkMacSystemFont,".sfnstext-regular",sans-serif';
    const condensedFont = 'IBM Plex Sans Condensed, system-ui, -apple-system, BlinkMacSystemFont, ".SFNSText-Regular", sans-serif';
    const fontWeight = 400;
    const TOKENS = {
      textPrimary: {
        g90: '#f4f4f4',
        g100: '#f4f4f4',
        white: '#161616',
        g10: '#161616'
      },
      textSecondary: {
        g90: '#c6c6c6',
        g100: '#c6c6c6',
        white: '#525252',
        g10: '#525252'
      },
      // layer
      layerAccent01: {
        white: '#e0e0e0',
        g10: '#e0e0e0',
        g90: '#525252',
        g100: '#393939'
      },
      // grid
      gridBg: {
        white: '#ffffff',
        g10: '#ffffff',
        g90: '#161616',
        g100: '#161616'
      }
    };
    const darkCategories = ['#8a3ffc', '#33b1ff', '#007d79', '#ff7eb6', '#fa4d56', '#fff1f1', '#6fdc8c', '#4589ff', '#d12771', '#d2a106', '#08bdba', '#bae6ff', '#ba4e00', '#d4bbff'];
    const lightCategories = ['#6929c4', '#1192e8', '#005d5d', '#9f1853', '#fa4d56', '#570408', '#198038', '#002d9c', '#ee538b', '#b28600', '#009d9a', '#012749', '#8a3800', '#a56eff'];
    function genCarbonConfig({
      theme,
      background
    }) {
      const type = ['white', 'g10'].includes(theme) ? 'light' : 'dark';
      const viewbg = TOKENS.gridBg[theme];
      const titleColor = TOKENS.textPrimary[theme];
      const textColor = TOKENS.textSecondary[theme];
      const category = type === 'dark' ? darkCategories : lightCategories;
      const markColor = type === 'dark' ? '#d4bbff' : '#6929c4';
      return {
        background,
        arc: {
          fill: markColor
        },
        area: {
          fill: markColor
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
          stroke: markColor
        },
        circle: {
          fill: markColor
        },
        view: {
          fill: viewbg,
          stroke: viewbg
        },
        group: {
          fill: viewbg
        },
        title: {
          color: titleColor,
          anchor: 'start',
          dy: -15,
          fontSize: 16,
          font: defaultFont,
          fontWeight: 600
        },
        axis: {
          // Axis labels
          labelColor: textColor,
          labelFontSize: 12,
          labelFont: condensedFont,
          labelFontWeight: fontWeight,
          // Axis titles
          titleColor: titleColor,
          titleFontWeight: 600,
          titleFontSize: 12,
          // MISC
          grid: true,
          gridColor: TOKENS.layerAccent01[theme],
          labelAngle: 0
        },
        axisX: {
          titlePadding: 10
        },
        axisY: {
          titlePadding: 2.5
        },
        style: {
          'guide-label': {
            font: defaultFont,
            fill: textColor,
            fontWeight: fontWeight
          },
          'guide-title': {
            font: defaultFont,
            fill: textColor,
            fontWeight: fontWeight
          }
        },
        range: {
          category,
          diverging: ['#750e13', '#a2191f', '#da1e28', '#fa4d56', '#ff8389', '#ffb3b8', '#ffd7d9', '#fff1f1', '#e5f6ff', '#bae6ff', '#82cfff', '#33b1ff', '#1192e8', '#0072c3', '#00539a', '#003a6d'],
          heatmap: ['#f6f2ff', '#e8daff', '#d4bbff', '#be95ff', '#a56eff', '#8a3ffc', '#6929c4', '#491d8b', '#31135e', '#1c0f30']
        }
      };
    }

    const carbonwhite = genCarbonConfig({
      theme: 'white',
      background: '#ffffff'
    });

    const carbong10 = genCarbonConfig({
      theme: 'g10',
      background: '#f4f4f4'
    });

    const carbong90 = genCarbonConfig({
      theme: 'g90',
      background: '#262626'
    });

    const carbong100 = genCarbonConfig({
      theme: 'g100',
      background: '#161616'
    });

    const version$2 = pkg$1.version;

    var themes = /*#__PURE__*/Object.freeze({
        __proto__: null,
        carbong10: carbong10,
        carbong100: carbong100,
        carbong90: carbong90,
        carbonwhite: carbonwhite,
        dark: darkTheme,
        excel: excelTheme,
        fivethirtyeight: fiveThirtyEightTheme,
        ggplot2: ggplot2Theme,
        googlecharts: googlechartsTheme,
        latimes: latimesTheme,
        powerbi: powerbiTheme,
        quartz: quartzTheme,
        urbaninstitute: urbanInstituteTheme,
        version: version$2,
        vox: voxTheme
    });

    function accessor (fn, fields, name) {
      fn.fields = fields || [];
      fn.fname = name;
      return fn;
    }

    function getter (path) {
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

    function error (message) {
      throw Error(message);
    }

    function splitAccessPath (p) {
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
          s += p.substring(i, j++);
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

    function field (field, name, opt) {
      const path = splitAccessPath(field);
      field = path.length === 1 ? path[0] : field;
      return accessor((getter)(path), [field], field);
    }

    field('id');
    accessor(_ => _, [], 'identity');
    accessor(() => 0, [], 'zero');
    accessor(() => 1, [], 'one');
    accessor(() => true, [], 'true');
    accessor(() => false, [], 'false');

    var isArray = Array.isArray;

    function isObject (_) {
      return _ === Object(_);
    }

    function isString (_) {
      return typeof _ === 'string';
    }

    /**
     * Format the value to be shown in the tooltip.
     *
     * @param value The value to show in the tooltip.
     * @param valueToHtml Function to convert a single cell value to an HTML string
     */
    function formatValue(value, valueToHtml, maxDepth, baseURL) {
        if (isArray(value)) {
            return `[${value.map((v) => valueToHtml(isString(v) ? v : stringify(v, maxDepth))).join(', ')}]`;
        }
        if (isObject(value)) {
            let content = '';
            const { title, image, ...rest } = value;
            if (title) {
                content += `<h2>${valueToHtml(title)}</h2>`;
            }
            if (image) {
                content += `<img src="${new URL(valueToHtml(image), baseURL || location.href).href}">`;
            }
            const keys = Object.keys(rest);
            if (keys.length > 0) {
                content += '<table>';
                for (const key of keys) {
                    let val = rest[key];
                    // ignore undefined properties
                    if (val === undefined) {
                        continue;
                    }
                    if (isObject(val)) {
                        val = stringify(val, maxDepth);
                    }
                    content += `<tr><td class="key">${valueToHtml(key)}</td><td class="value">${valueToHtml(val)}</td></tr>`;
                }
                content += `</table>`;
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
    }

    // generated with build-style.sh
    var defaultStyle = `#vg-tooltip-element {
  visibility: hidden;
  padding: 8px;
  position: fixed;
  z-index: 1000;
  font-family: sans-serif;
  font-size: 11px;
  border-radius: 3px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  /* The default theme is the light theme. */
  background-color: rgba(255, 255, 255, 0.95);
  border: 1px solid #d9d9d9;
  color: black;
}
#vg-tooltip-element.visible {
  visibility: visible;
}
#vg-tooltip-element h2 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 13px;
}
#vg-tooltip-element table {
  border-spacing: 0;
}
#vg-tooltip-element table tr {
  border: none;
}
#vg-tooltip-element table tr td {
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 2px;
  padding-bottom: 2px;
}
#vg-tooltip-element table tr td.key {
  color: #808080;
  max-width: 150px;
  text-align: right;
  padding-right: 4px;
}
#vg-tooltip-element table tr td.value {
  display: block;
  max-width: 300px;
  max-height: 7em;
  text-align: left;
}
#vg-tooltip-element.dark-theme {
  background-color: rgba(32, 32, 32, 0.9);
  border: 1px solid #f5f5f5;
  color: white;
}
#vg-tooltip-element.dark-theme td.key {
  color: #bfbfbf;
}
`;

    const EL_ID = 'vg-tooltip-element';
    const DEFAULT_OPTIONS = {
        offsetX: 10,
        offsetY: 10,
        id: EL_ID,
        styleId: 'vega-tooltip-style',
        theme: 'light',
        disableDefaultStyle: false,
        sanitize: escapeHTML,
        maxDepth: 2,
        formatTooltip: formatValue,
        baseURL: '',
        anchor: 'cursor',
        position: ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
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
     * @param options Tooltip handler options.
     */
    function calculatePositionRelativeToCursor(event, tooltipBox, { offsetX, offsetY }) {
        // the possible positions for the tooltip
        const positions = getPositions({ x1: event.clientX, x2: event.clientX, y1: event.clientY, y2: event.clientY }, tooltipBox, offsetX, offsetY);
        // order of positions to try
        const postionArr = ['bottom-right', 'bottom-left', 'top-right', 'top-left'];
        // test positions till a valid one is found
        for (const p of postionArr) {
            if (tooltipIsInViewport(positions[p], tooltipBox)) {
                return positions[p];
            }
        }
        // default to top-left if a valid position is not found
        // this is legacy behavior
        return positions['top-left'];
    }
    /**
     * Calculates the position of the tooltip relative to the mark.
     * @param handler The handler instance.
     * @param event The mouse event.
     * @param item The item that the tooltip is being shown for.
     * @param tooltipBox Client rect of the tooltip element.
     * @param options Tooltip handler options.
     * @returns
     */
    function calculatePositionRelativeToMark(handler, event, item, tooltipBox, options) {
        const { position, offsetX, offsetY } = options;
        const containerBox = handler._el.getBoundingClientRect();
        const origin = handler._origin;
        // bounds of the mark relative to the viewport
        const markBounds = getMarkBounds(containerBox, origin, item);
        // the possible positions for the tooltip
        const positions = getPositions(markBounds, tooltipBox, offsetX, offsetY);
        // positions to test
        const positionArr = Array.isArray(position) ? position : [position];
        // test positions till a valid one is found
        for (const p of positionArr) {
            // verify that the tooltip is in the view and the mouse is not where the tooltip would be
            if (tooltipIsInViewport(positions[p], tooltipBox) && !mouseIsOnTooltip(event, positions[p], tooltipBox)) {
                return positions[p];
            }
        }
        // default to cursor position if a valid position is not found
        return calculatePositionRelativeToCursor(event, tooltipBox, options);
    }
    // Calculates the bounds of the mark relative to the viewport.
    function getMarkBounds(containerBox, origin, item) {
        // if this is a voronoi mark, we want to use the bounds of the point that voronoi cell represents
        const markBounds = item.isVoronoi ? item.datum.bounds : item.bounds;
        let left = containerBox.left + origin[0] + markBounds.x1;
        let top = containerBox.top + origin[1] + markBounds.y1;
        // traverse mark groups, summing their offsets to get the total offset
        // item bounds are relative to their group so if there are multiple nested groups we need to add them all
        let parentItem = item;
        while (parentItem.mark.group) {
            parentItem = parentItem.mark.group;
            left += parentItem.x ?? 0;
            top += parentItem.y ?? 0;
        }
        const markWidth = markBounds.x2 - markBounds.x1;
        const markHeight = markBounds.y2 - markBounds.y1;
        return {
            x1: left,
            x2: left + markWidth,
            y1: top,
            y2: top + markHeight,
        };
    }
    // Calculates the tooltip xy for each possible position.
    function getPositions(markBounds, tooltipBox, offsetX, offsetY) {
        const xc = (markBounds.x1 + markBounds.x2) / 2;
        const yc = (markBounds.y1 + markBounds.y2) / 2;
        // x positions
        const left = markBounds.x1 - tooltipBox.width - offsetX;
        const center = xc - tooltipBox.width / 2;
        const right = markBounds.x2 + offsetX;
        // y positions
        const top = markBounds.y1 - tooltipBox.height - offsetY;
        const middle = yc - tooltipBox.height / 2;
        const bottom = markBounds.y2 + offsetY;
        const positions = {
            top: { x: center, y: top },
            bottom: { x: center, y: bottom },
            left: { x: left, y: middle },
            right: { x: right, y: middle },
            'top-left': { x: left, y: top },
            'top-right': { x: right, y: top },
            'bottom-left': { x: left, y: bottom },
            'bottom-right': { x: right, y: bottom },
        };
        return positions;
    }
    // Checks if the tooltip would be in the viewport at the given position
    function tooltipIsInViewport(position, tooltipBox) {
        return (position.x >= 0 &&
            position.y >= 0 &&
            position.x + tooltipBox.width <= window.innerWidth &&
            position.y + tooltipBox.height <= window.innerHeight);
    }
    // Checks if the mouse is within the tooltip area
    function mouseIsOnTooltip(event, position, tooltipBox) {
        return (event.clientX >= position.x &&
            event.clientX <= position.x + tooltipBox.width &&
            event.clientY >= position.y &&
            event.clientY <= position.y + tooltipBox.height);
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
            this.options = { ...DEFAULT_OPTIONS, ...options };
            const elementId = this.options.id;
            this.el = null;
            // bind this to call
            this.call = this.tooltipHandler.bind(this);
            // prepend a default stylesheet for tooltips to the head
            if (!this.options.disableDefaultStyle && !document.getElementById(this.options.styleId)) {
                const style = document.createElement('style');
                style.setAttribute('id', this.options.styleId);
                style.innerHTML = createDefaultStyle(elementId);
                const head = document.head;
                if (head.childNodes.length > 0) {
                    head.insertBefore(style, head.childNodes[0]);
                }
                else {
                    head.appendChild(style);
                }
            }
        }
        /**
         * The tooltip handler function.
         */
        tooltipHandler(handler, event, item, value) {
            // append a div element that we use as a tooltip unless it already exists
            this.el = document.getElementById(this.options.id);
            if (!this.el) {
                this.el = document.createElement('div');
                this.el.setAttribute('id', this.options.id);
                this.el.classList.add('vg-tooltip');
                const tooltipContainer = document.fullscreenElement ?? document.body;
                tooltipContainer.appendChild(this.el);
            }
            // hide tooltip for null, undefined, or empty string values
            if (value == null || value === '') {
                this.el.classList.remove('visible', `${this.options.theme}-theme`);
                return;
            }
            // set the tooltip content
            this.el.innerHTML = this.options.formatTooltip(value, this.options.sanitize, this.options.maxDepth, this.options.baseURL);
            // make the tooltip visible
            this.el.classList.add('visible', `${this.options.theme}-theme`);
            const { x, y } = this.options.anchor === 'mark'
                ? calculatePositionRelativeToMark(handler, event, item, this.el.getBoundingClientRect(), this.options)
                : calculatePositionRelativeToCursor(event, this.el.getBoundingClientRect(), this.options);
            this.el.style.top = `${y}px`;
            this.el.style.left = `${x}px`;
        }
    }

    /**
     * Open editor url in a new window, and pass a message.
     */
    function post (window, url, data) {
        const editor = window.open(url);
        const wait = 10000;
        const step = 250;
        const { origin } = new URL(url);
        let count = ~~(wait / step);
        function listen(evt) {
            if (evt.source === editor) {
                count = 0;
                window.removeEventListener('message', listen, false);
            }
        }
        window.addEventListener('message', listen, false);
        // send message
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
    var embedStyle = `.vega-embed {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
}
.vega-embed.has-actions {
  padding-right: 38px;
}
.vega-embed details:not([open]) > :not(summary) {
  display: none !important;
}
.vega-embed summary {
  list-style: none;
  position: absolute;
  top: 0;
  right: 0;
  padding: 6px;
  z-index: 1000;
  background: white;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  color: #1b1e23;
  border: 1px solid #aaa;
  border-radius: 999px;
  opacity: 0.2;
  transition: opacity 0.4s ease-in;
  cursor: pointer;
  line-height: 0px;
}
.vega-embed summary::-webkit-details-marker {
  display: none;
}
.vega-embed summary:active {
  box-shadow: #aaa 0px 0px 0px 1px inset;
}
.vega-embed summary svg {
  width: 14px;
  height: 14px;
}
.vega-embed details[open] summary {
  opacity: 0.7;
}
.vega-embed:hover summary, .vega-embed:focus-within summary {
  opacity: 1 !important;
  transition: opacity 0.2s ease;
}
.vega-embed .vega-actions {
  position: absolute;
  z-index: 1001;
  top: 35px;
  right: -9px;
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;
  padding-top: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #d9d9d9;
  background: white;
  animation-duration: 0.15s;
  animation-name: scale-in;
  animation-timing-function: cubic-bezier(0.2, 0, 0.13, 1.5);
  text-align: left;
}
.vega-embed .vega-actions a {
  padding: 8px 16px;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  color: #434a56;
  text-decoration: none;
}
.vega-embed .vega-actions a:hover, .vega-embed .vega-actions a:focus {
  background-color: #f7f7f9;
  color: black;
}
.vega-embed .vega-actions::before, .vega-embed .vega-actions::after {
  content: "";
  display: inline-block;
  position: absolute;
}
.vega-embed .vega-actions::before {
  left: auto;
  right: 14px;
  top: -16px;
  border: 8px solid rgba(0, 0, 0, 0);
  border-bottom-color: #d9d9d9;
}
.vega-embed .vega-actions::after {
  left: auto;
  right: 15px;
  top: -14px;
  border: 7px solid rgba(0, 0, 0, 0);
  border-bottom-color: #fff;
}
.vega-embed .chart-wrapper.fit-x {
  width: 100%;
}
.vega-embed .chart-wrapper.fit-y {
  height: 100%;
}

.vega-embed-wrapper {
  max-width: 100%;
  overflow: auto;
  padding-right: 14px;
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
`;

    function isURL(s) {
        return s.startsWith('http://') || s.startsWith('https://') || s.startsWith('//');
    }
    function mergeDeep(dest, ...src) {
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
    var version$1 = "6.29.0";
    var description = "Publish Vega visualizations as embedded web components.";
    var keywords = [
    	"vega",
    	"data",
    	"visualization",
    	"component",
    	"embed"
    ];
    var repository = {
    	type: "git",
    	url: "http://github.com/vega/vega-embed.git"
    };
    var author = {
    	name: "UW Interactive Data Lab",
    	url: "http://idl.cs.washington.edu"
    };
    var contributors = [
    	{
    		name: "Dominik Moritz",
    		url: "https://www.domoritz.de"
    	}
    ];
    var bugs = {
    	url: "https://github.com/vega/vega-embed/issues"
    };
    var homepage = "https://github.com/vega/vega-embed#readme";
    var license = "BSD-3-Clause";
    var main = "build/vega-embed.js";
    var module = "build/vega-embed.module.js";
    var unpkg = "build/vega-embed.min.js";
    var jsdelivr = "build/vega-embed.min.js";
    var types = "build/src/embed.d.ts";
    var files = [
    	"src",
    	"build"
    ];
    var exports$1 = {
    	".": {
    		"import": {
    			types: "./build/src/embed.d.ts",
    			"default": "./build/vega-embed.module.js"
    		},
    		require: {
    			"default": "./build/vega-embed.js"
    		}
    	}
    };
    var devDependencies = {
    	"@babel/core": "^7.26.0",
    	"@babel/eslint-parser": "^7.25.9",
    	"@babel/plugin-syntax-dynamic-import": "^7.8.3",
    	"@babel/plugin-transform-runtime": "^7.25.9",
    	"@babel/preset-env": "^7.26.0",
    	"@babel/preset-typescript": "^7.26.0",
    	"@release-it/conventional-changelog": "^9.0.3",
    	"@rollup/plugin-commonjs": "28.0.1",
    	"@rollup/plugin-json": "^6.1.0",
    	"@rollup/plugin-node-resolve": "^15.3.0",
    	"@rollup/plugin-terser": "^0.4.4",
    	"@rollup/plugin-typescript": "^12.1.1",
    	"@types/semver": "^7.5.8",
    	"@typescript-eslint/parser": "^8.15.0",
    	"@vitest/coverage-istanbul": "^2.1.5",
    	"browser-sync": "^3.0.3",
    	concurrently: "^9.1.0",
    	"del-cli": "^6.0.0",
    	"eslint-config-prettier": "^9.1.0",
    	"eslint-plugin-prettier": "^5.2.1",
    	"eslint-plugin-vitest": "^0.5.4",
    	eslint: "^9.15.0",
    	jsdom: "^25.0.1",
    	"postinstall-postinstall": "^2.1.0",
    	prettier: "^3.3.3",
    	"release-it": "^17.10.0",
    	"rollup-plugin-bundle-size": "^1.0.3",
    	rollup: "4.27.3",
    	sass: "^1.81.0",
    	"typescript-eslint": "^8.15.0",
    	typescript: "^5.6.3",
    	"vega-lite": "^5.21.0",
    	vega: "^5.30.0",
    	"vitest-canvas-mock": "^0.3.3",
    	vitest: "^2.1.5"
    };
    var peerDependencies = {
    	vega: "^5.21.0",
    	"vega-lite": "*"
    };
    var dependencies = {
    	"fast-json-patch": "^3.1.1",
    	"json-stringify-pretty-compact": "^4.0.0",
    	semver: "^7.6.3",
    	tslib: "^2.8.1",
    	"vega-interpreter": "^1.0.5",
    	"vega-schema-url-parser": "^2.2.0",
    	"vega-themes": "^2.15.0",
    	"vega-tooltip": "^0.35.2"
    };
    var scripts = {
    	prebuild: "npm run clean && npm run build:style",
    	build: "rollup -c",
    	"build:style": "./build-style.sh",
    	clean: "del-cli build src/style.ts",
    	prepublishOnly: "npm run clean && npm run build",
    	preversion: "npm run lint && npm run test",
    	serve: "browser-sync start --directory -s -f build *.html",
    	start: "npm run build && concurrently --kill-others -n Server,Rollup 'npm run serve' 'rollup -c -w'",
    	pretest: "npm run build:style",
    	test: "vitest run",
    	prettierbase: "prettier '*.{css,scss,html}'",
    	format: "eslint . --fix && npm run prettierbase -- --write",
    	lint: "eslint . && npm run prettierbase -- --check",
    	release: "release-it"
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
    	exports: exports$1,
    	devDependencies: devDependencies,
    	peerDependencies: peerDependencies,
    	dependencies: dependencies,
    	scripts: scripts
    };

    const version = pkg.version;
    const vega = vegaImport__namespace;
    let vegaLite = vegaLiteImport__namespace;
    // For backwards compatibility with Vega-Lite before v4.
    const w = (typeof window !== 'undefined' ? window : undefined);
    if (vegaLite === undefined && w?.vl?.compile) {
        vegaLite = w.vl;
    }
    const DEFAULT_ACTIONS = { export: { svg: true, png: true }, source: true, compiled: true, editor: true };
    const I18N = {
        CLICK_TO_VIEW_ACTIONS: 'Click to view actions',
        COMPILED_ACTION: 'View Compiled Vega',
        EDITOR_ACTION: 'Open in Vega Editor',
        PNG_ACTION: 'Save as PNG',
        SOURCE_ACTION: 'View Source',
        SVG_ACTION: 'Save as SVG',
    };
    const NAMES = {
        vega: 'Vega',
        'vega-lite': 'Vega-Lite',
    };
    const VERSION = {
        vega: vega.version,
        'vega-lite': vegaLite ? vegaLite.version : 'not available',
    };
    const PREPROCESSOR = {
        vega: (vgSpec) => vgSpec,
        'vega-lite': (vlSpec, config) => vegaLite.compile(vlSpec, { config: config }).spec,
    };
    const SVG_CIRCLES = `
<svg viewBox="0 0 16 16" fill="currentColor" stroke="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
  <circle r="2" cy="8" cx="2"></circle>
  <circle r="2" cy="8" cx="8"></circle>
  <circle r="2" cy="8" cx="14"></circle>
</svg>`;
    const CHART_WRAPPER_CLASS = 'chart-wrapper';
    function isTooltipHandler(h) {
        return typeof h === 'function';
    }
    function viewSource(source, sourceHeader, sourceFooter, mode) {
        const header = `<html><head>${sourceHeader}</head><body><pre><code class="json">`;
        const footer = `</code></pre>${sourceFooter}</body></html>`;
        const win = window.open('');
        win.document.write(header + source + footer);
        win.document.title = `${NAMES[mode]} JSON Source`;
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
                console.warn(`The given visualization spec is written in ${NAMES[parsed.library]}, but mode argument sets ${NAMES[providedMode] ?? providedMode}.`);
            }
            const mode = parsed.library;
            if (!satisfies(VERSION[mode], `^${parsed.version.slice(1)}`)) {
                console.warn(`The input spec uses ${NAMES[mode]} ${parsed.version}, but the current version of ${NAMES[mode]} is v${VERSION[mode]}.`);
            }
            return mode;
        }
        // try to guess from the provided spec
        if ('mark' in spec ||
            'encoding' in spec ||
            'layer' in spec ||
            'hconcat' in spec ||
            'vconcat' in spec ||
            'facet' in spec ||
            'repeat' in spec) {
            return 'vega-lite';
        }
        if ('marks' in spec || 'signals' in spec || 'scales' in spec || 'axes' in spec) {
            return 'vega';
        }
        return providedMode ?? 'vega';
    }
    function isLoader(o) {
        return !!(o && 'load' in o);
    }
    function createLoader(opts) {
        return isLoader(opts) ? opts : vega.loader(opts);
    }
    function embedOptionsFromUsermeta(parsedSpec) {
        const opts = parsedSpec.usermeta?.embedOptions ?? {};
        if (vegaImport.isString(opts.defaultStyle)) {
            // we don't allow styles set via usermeta since it would allow injection of logic (we set the style via innerHTML)
            opts.defaultStyle = false;
        }
        return opts;
    }
    /**
     * Embed a Vega visualization component in a web page. This function returns a promise.
     *
     * @param el        DOM element in which to place component (DOM node or CSS selector).
     * @param spec      String : A URL string from which to load the Vega specification.
     *                  Object : The Vega/Vega-Lite specification as a parsed JSON object.
     * @param opts       A JavaScript object containing options for embedding.
     */
    async function embed(el, spec, opts = {}) {
        let parsedSpec;
        let loader;
        if (vegaImport.isString(spec)) {
            loader = createLoader(opts.loader);
            parsedSpec = JSON.parse(await loader.load(spec));
        }
        else {
            parsedSpec = spec;
        }
        const loadedEmbedOptions = embedOptionsFromUsermeta(parsedSpec);
        const usermetaLoader = loadedEmbedOptions.loader;
        // either create the loader for the first time or create a new loader if the spec has new loader options
        if (!loader || usermetaLoader) {
            loader = createLoader(opts.loader ?? usermetaLoader);
        }
        const usermetaOpts = await loadOpts(loadedEmbedOptions, loader);
        const parsedOpts = await loadOpts(opts, loader);
        const mergedOpts = {
            ...mergeDeep(parsedOpts, usermetaOpts),
            config: vegaImport.mergeConfig(parsedOpts.config ?? {}, usermetaOpts.config ?? {}),
        };
        return await _embed(el, parsedSpec, mergedOpts, loader);
    }
    async function loadOpts(opt, loader) {
        const config = vegaImport.isString(opt.config) ? JSON.parse(await loader.load(opt.config)) : (opt.config ?? {});
        const patch = vegaImport.isString(opt.patch) ? JSON.parse(await loader.load(opt.patch)) : opt.patch;
        return {
            ...opt,
            ...(patch ? { patch } : {}),
            ...(config ? { config } : {}),
        };
    }
    function getRoot(el) {
        const possibleRoot = el.getRootNode ? el.getRootNode() : document;
        return possibleRoot instanceof ShadowRoot
            ? { root: possibleRoot, rootContainer: possibleRoot }
            : { root: document, rootContainer: document.head ?? document.body };
    }
    async function _embed(el, spec, opts = {}, loader) {
        const config = opts.theme ? vegaImport.mergeConfig(themes[opts.theme], opts.config ?? {}) : opts.config;
        const actions = vegaImport.isBoolean(opts.actions) ? opts.actions : mergeDeep({}, DEFAULT_ACTIONS, opts.actions ?? {});
        const i18n = { ...I18N, ...opts.i18n };
        const renderer = opts.renderer ?? 'canvas';
        const logLevel = opts.logLevel ?? vega.Warn;
        const downloadFileName = opts.downloadFileName ?? 'visualization';
        const element = typeof el === 'string' ? document.querySelector(el) : el;
        if (!element) {
            throw new Error(`${el} does not exist`);
        }
        if (opts.defaultStyle !== false) {
            const ID = 'vega-embed-style';
            const { root, rootContainer } = getRoot(element);
            if (!root.getElementById(ID)) {
                const style = document.createElement('style');
                style.id = ID;
                style.innerHTML =
                    opts.defaultStyle === undefined || opts.defaultStyle === true
                        ? (embedStyle).toString()
                        : opts.defaultStyle;
                rootContainer.appendChild(style);
            }
        }
        const mode = guessMode(spec, opts.mode);
        let vgSpec = PREPROCESSOR[mode](spec, config);
        if (mode === 'vega-lite') {
            if (vgSpec.$schema) {
                const parsed = e(vgSpec.$schema);
                if (!satisfies(VERSION.vega, `^${parsed.version.slice(1)}`)) {
                    console.warn(`The compiled spec uses Vega ${parsed.version}, but current version is v${VERSION.vega}.`);
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
        }
        // Set locale. Note that this is a global setting.
        if (opts.formatLocale) {
            vega.formatLocale(opts.formatLocale);
        }
        if (opts.timeFormatLocale) {
            vega.timeFormatLocale(opts.timeFormatLocale);
        }
        // Set custom expression functions
        if (opts.expressionFunctions) {
            for (const name in opts.expressionFunctions) {
                const expressionFunction = opts.expressionFunctions[name];
                if ('fn' in expressionFunction) {
                    vega.expressionFunction(name, expressionFunction.fn, expressionFunction['visitor']);
                }
                else if (expressionFunction instanceof Function) {
                    vega.expressionFunction(name, expressionFunction);
                }
            }
        }
        const { ast } = opts;
        // Do not apply the config to Vega when we have already applied it to Vega-Lite.
        // This call may throw an Error if parsing fails.
        const runtime = vega.parse(vgSpec, mode === 'vega-lite' ? {} : config, { ast });
        const view = new (opts.viewClass || vega.View)(runtime, {
            loader,
            logLevel,
            renderer,
            ...(ast ? { expr: vega.expressionInterpreter ?? opts.expr ?? expression } : {}),
        });
        view.addSignalListener('autosize', (_, autosize) => {
            const { type } = autosize;
            if (type == 'fit-x') {
                container.classList.add('fit-x');
                container.classList.remove('fit-y');
            }
            else if (type == 'fit-y') {
                container.classList.remove('fit-x');
                container.classList.add('fit-y');
            }
            else if (type == 'fit') {
                container.classList.add('fit-x', 'fit-y');
            }
            else {
                container.classList.remove('fit-x', 'fit-y');
            }
        });
        if (opts.tooltip !== false) {
            const { loader: loader_, tooltip } = opts;
            const baseURL = loader_ && !isLoader(loader_) ? loader_?.baseURL : undefined;
            const handler = isTooltipHandler(tooltip)
                ? tooltip
                : // user provided boolean true or tooltip options
                    new Handler({ baseURL, ...(tooltip === true ? {} : tooltip) }).call;
            view.tooltip(handler);
        }
        let { hover } = opts;
        if (hover === undefined) {
            hover = mode === 'vega';
        }
        if (hover) {
            const { hoverSet, updateSet } = (typeof hover === 'boolean' ? {} : hover);
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
            if (opts.defaultStyle !== false || opts.forceActionsMenu) {
                const details = document.createElement('details');
                details.title = i18n.CLICK_TO_VIEW_ACTIONS;
                element.append(details);
                wrapper = details;
                const summary = document.createElement('summary');
                summary.innerHTML = SVG_CIRCLES;
                details.append(summary);
                documentClickHandler = (ev) => {
                    if (!details.contains(ev.target)) {
                        details.removeAttribute('open');
                    }
                };
                document.addEventListener('click', documentClickHandler);
            }
            const ctrl = document.createElement('div');
            wrapper.append(ctrl);
            ctrl.classList.add('vega-actions');
            // add 'Export' action
            if (actions === true || actions.export !== false) {
                for (const ext of ['svg', 'png']) {
                    if (actions === true || actions.export === true || actions.export[ext]) {
                        const i18nExportAction = i18n[`${ext.toUpperCase()}_ACTION`];
                        const exportLink = document.createElement('a');
                        const scaleFactor = vegaImport.isObject(opts.scaleFactor) ? opts.scaleFactor[ext] : opts.scaleFactor;
                        exportLink.text = i18nExportAction;
                        exportLink.href = '#';
                        exportLink.target = '_blank';
                        exportLink.download = `${downloadFileName}.${ext}`;
                        // add link on mousedown so that it's correct when the click happens
                        exportLink.addEventListener('mousedown', async function (e) {
                            e.preventDefault();
                            const url = await view.toImageURL(ext, scaleFactor);
                            this.href = url;
                        });
                        ctrl.append(exportLink);
                    }
                }
            }
            // add 'View Source' action
            if (actions === true || actions.source !== false) {
                const viewSourceLink = document.createElement('a');
                viewSourceLink.text = i18n.SOURCE_ACTION;
                viewSourceLink.href = '#';
                viewSourceLink.addEventListener('click', function (e) {
                    viewSource(stringify$1(spec), opts.sourceHeader ?? '', opts.sourceFooter ?? '', mode);
                    e.preventDefault();
                });
                ctrl.append(viewSourceLink);
            }
            // add 'View Compiled' action
            if (mode === 'vega-lite' && (actions === true || actions.compiled !== false)) {
                const compileLink = document.createElement('a');
                compileLink.text = i18n.COMPILED_ACTION;
                compileLink.href = '#';
                compileLink.addEventListener('click', function (e) {
                    viewSource(stringify$1(vgSpec), opts.sourceHeader ?? '', opts.sourceFooter ?? '', 'vega');
                    e.preventDefault();
                });
                ctrl.append(compileLink);
            }
            // add 'Open in Vega Editor' action
            if (actions === true || actions.editor !== false) {
                const editorUrl = opts.editorUrl ?? 'https://vega.github.io/editor/';
                const editorLink = document.createElement('a');
                editorLink.text = i18n.EDITOR_ACTION;
                editorLink.href = '#';
                editorLink.addEventListener('click', function (e) {
                    post(window, editorUrl, {
                        config: config,
                        mode: patch ? 'vega' : mode,
                        renderer,
                        spec: stringify$1(patch ? vgSpec : spec),
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
        return { view, spec, vgSpec, finalize, embedOptions: opts };
    }

    /**
     * Create a promise to an HTML Div element with an embedded Vega-Lite or Vega visualization.
     * The element has a value property with the view. By default all actions except for the editor action are disabled.
     *
     * The main use case is in [Observable](https://observablehq.com/).
     */
    async function container (spec, opt = {}) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('vega-embed-wrapper');
        const div = document.createElement('div');
        wrapper.appendChild(div);
        const actions = opt.actions === true || opt.actions === false
            ? opt.actions
            : { export: true, source: false, compiled: true, editor: true, ...opt.actions };
        const result = await embed(div, spec, {
            actions,
            ...opt,
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
    const wrapper = (...args) => {
        if (args.length > 1 && ((vegaImport.isString(args[0]) && !isURL(args[0])) || isElement(args[0]) || args.length === 3)) {
            return embed(args[0], args[1], args[2]);
        }
        return container(args[0], args[1]);
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
