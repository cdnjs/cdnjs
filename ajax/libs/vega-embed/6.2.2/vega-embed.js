(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vega'), require('vega-lite')) :
    typeof define === 'function' && define.amd ? define(['vega', 'vega-lite'], factory) :
    (global = global || self, global.vegaEmbed = factory(global.vega, global.vegaLite));
}(this, (function (vegaImport, vegaLiteImport) { 'use strict';

    var name = "vega-embed";
    var version = "6.2.2";
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
    var license = "BSD-3-Clause";
    var main = "build/vega-embed.js";
    var module = "build/src/embed.js";
    var unpkg = "build/vega-embed.min.js";
    var jsdelivr = "build/vega-embed.min.js";
    var types = "build/src/embed.d.ts";
    var devDependencies = {
    	"@rollup/plugin-commonjs": "11.0.1",
    	"@rollup/plugin-json": "^4.0.1",
    	"@rollup/plugin-node-resolve": "^7.0.0",
    	"@types/jest": "^24.9.0",
    	"@types/json-stable-stringify": "^1.0.32",
    	"@types/semver": "^6.2.0",
    	"browser-sync": "^2.26.7",
    	concurrently: "^5.0.2",
    	jest: "^24.9.0",
    	"jest-canvas-mock": "^2.2.0",
    	"node-sass": "^4.13.1",
    	rollup: "^1.29.1",
    	terser: "^4.6.3",
    	"ts-jest": "^24.3.0",
    	typescript: "~3.7.5",
    	vega: "^5.9.0",
    	"vega-lite": "^4.0.0",
    	"vega-lite-dev-config": "^0.3.1"
    };
    var peerDependencies = {
    	vega: "^5.8.0",
    	"vega-lite": "*"
    };
    var dependencies = {
    	"fast-json-patch": "^3.0.0-1",
    	"json-stringify-pretty-compact": "^2.0.0",
    	semver: "^6.3.0",
    	"vega-schema-url-parser": "^1.1.0",
    	"vega-themes": "^2.6.0",
    	"vega-tooltip": "^0.20.0"
    };
    var scripts = {
    	"tsc:src": "tsc -p tsconfig.src.json",
    	prebuild: "yarn build:style && yarn tsc:src",
    	build: "rollup -c",
    	"build:style": "./build-style.sh",
    	clean: "rm -rf build && rm -f src/style.ts && mkdir build",
    	postbuild: "terser build/vega-embed.js -cm > build/vega-embed.min.js",
    	prepublishOnly: "yarn clean && yarn build",
    	preversion: "yarn lint && yarn test",
    	serve: "browser-sync start --directory -s -f build *.html",
    	start: "yarn build && concurrently --kill-others -n Server,Typescript,Rollup 'yarn serve' 'yarn tsc:src -w' 'rollup -c -w'",
    	pretest: "yarn build:style",
    	test: "jest",
    	"test:inspect": "node --inspect-brk ./node_modules/.bin/jest --runInBand",
    	prepare: "beemo create-config",
    	prettierbase: "beemo prettier '*.{css,html}'",
    	eslintbase: "beemo eslint '{src,test}/**/*.ts'",
    	format: "yarn eslintbase --fix && yarn prettierbase --write",
    	lint: "yarn eslintbase && yarn prettierbase --check"
    };
    var beemo = {
    	module: "vega-lite-dev-config",
    	drivers: [
    		"prettier",
    		"eslint"
    	],
    	prettier: {
    		ignore: [
    			"src/style.ts",
    			"README.md"
    		]
    	}
    };
    var jest = {
    	testURL: "http://localhost/",
    	setupFiles: [
    		"jest-canvas-mock"
    	],
    	transform: {
    		"^.+\\.tsx?$": "ts-jest"
    	},
    	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    	moduleFileExtensions: [
    		"ts",
    		"tsx",
    		"js",
    		"jsx",
    		"json",
    		"node"
    	],
    	testPathIgnorePatterns: [
    		"node_modules",
    		"<rootDir>/build",
    		"src"
    	]
    };
    var pkg = {
    	name: name,
    	version: version,
    	description: description,
    	keywords: keywords,
    	repository: repository,
    	author: author,
    	contributors: contributors,
    	license: license,
    	main: main,
    	module: module,
    	unpkg: unpkg,
    	jsdelivr: jsdelivr,
    	types: types,
    	devDependencies: devDependencies,
    	peerDependencies: peerDependencies,
    	dependencies: dependencies,
    	scripts: scripts,
    	beemo: beemo,
    	jest: jest
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    /*!
     * https://github.com/Starcounter-Jack/JSON-Patch
     * (c) 2017 Joachim Wester
     * MIT license
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
                for (var i = 0, len = obj.length; i < len; i++) {
                    if (hasUndefined(obj[i])) {
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
                if (banPrototypeModifications && key == '__proto__') {
                    throw new TypeError('JSON-Patch: modifying `__proto__` prop is banned for security reasons, if this was on purpose, please set `banPrototypeModifications` flag false and pass it to this function. More info in fast-json-patch README');
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
                    if (key && key.indexOf('~') != -1) {
                        key = unescapePathComponent(key);
                    }
                    if (t >= len) {
                        var returnValue = objOps[operation.op].call(operation, obj, key, document); // Apply patch
                        if (returnValue.test === false) {
                            throw new JsonPatchError("Test operation failed", 'TEST_OPERATION_FAILED', index, operation, document);
                        }
                        return returnValue;
                    }
                }
                obj = obj[key];
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
                if (typeof oldVal == "object" && oldVal != null && typeof newVal == "object" && newVal != null) {
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
        unobserve: unobserve,
        observe: observe,
        generate: generate,
        compare: compare
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
    var stringOrChar = /("(?:[^\\"]|\\.)*")|[:,]/g;

    var jsonStringifyPrettyCompact = function stringify(passedObj, options) {
      var indent, maxLength, replacer;

      options = options || {};
      indent = JSON.stringify(
        [1],
        undefined,
        options.indent === undefined ? 2 : options.indent
      ).slice(2, -3);
      maxLength =
        indent === ""
          ? Infinity
          : options.maxLength === undefined
          ? 80
          : options.maxLength;
      replacer = options.replacer;

      return (function _stringify(obj, currentIndent, reserved) {
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
          prettified = string.replace(stringOrChar, function(match, stringLiteral) {
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
              items.push(
                _stringify(obj[index], nextIndent, index === length - 1 ? 0 : 1) ||
                  "null"
              );
            }
          } else {
            start = "{";
            end = "}";
            keys = Object.keys(obj);
            length = keys.length;
            for (; index < length; index++) {
              key = keys[index];
              keyPart = JSON.stringify(key) + ": ";
              value = _stringify(
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
            return [start, indent + items.join(",\n" + nextIndent), end].join(
              "\n" + currentIndent
            );
          }
        }

        return string;
      })(passedObj, "", 0);
    };

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var semver = createCommonjsModule(function (module, exports) {
    exports = module.exports = SemVer;

    var debug;
    /* istanbul ignore next */
    if (typeof process === 'object' &&
        process.env &&
        process.env.NODE_DEBUG &&
        /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
      debug = function () {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift('SEMVER');
        console.log.apply(console, args);
      };
    } else {
      debug = function () {};
    }

    // Note: this is the semver.org version of the spec that it implements
    // Not necessarily the package version of this code.
    exports.SEMVER_SPEC_VERSION = '2.0.0';

    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
      /* istanbul ignore next */ 9007199254740991;

    // Max safe segment length for coercion.
    var MAX_SAFE_COMPONENT_LENGTH = 16;

    // The actual regexps go on exports.re
    var re = exports.re = [];
    var src = exports.src = [];
    var t = exports.tokens = {};
    var R = 0;

    function tok (n) {
      t[n] = R++;
    }

    // The following Regular Expressions can be used for tokenizing,
    // validating, and parsing SemVer version strings.

    // ## Numeric Identifier
    // A single `0`, or a non-zero digit followed by zero or more digits.

    tok('NUMERICIDENTIFIER');
    src[t.NUMERICIDENTIFIER] = '0|[1-9]\\d*';
    tok('NUMERICIDENTIFIERLOOSE');
    src[t.NUMERICIDENTIFIERLOOSE] = '[0-9]+';

    // ## Non-numeric Identifier
    // Zero or more digits, followed by a letter or hyphen, and then zero or
    // more letters, digits, or hyphens.

    tok('NONNUMERICIDENTIFIER');
    src[t.NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';

    // ## Main Version
    // Three dot-separated numeric identifiers.

    tok('MAINVERSION');
    src[t.MAINVERSION] = '(' + src[t.NUMERICIDENTIFIER] + ')\\.' +
                       '(' + src[t.NUMERICIDENTIFIER] + ')\\.' +
                       '(' + src[t.NUMERICIDENTIFIER] + ')';

    tok('MAINVERSIONLOOSE');
    src[t.MAINVERSIONLOOSE] = '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' +
                            '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' +
                            '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')';

    // ## Pre-release Version Identifier
    // A numeric identifier, or a non-numeric identifier.

    tok('PRERELEASEIDENTIFIER');
    src[t.PRERELEASEIDENTIFIER] = '(?:' + src[t.NUMERICIDENTIFIER] +
                                '|' + src[t.NONNUMERICIDENTIFIER] + ')';

    tok('PRERELEASEIDENTIFIERLOOSE');
    src[t.PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[t.NUMERICIDENTIFIERLOOSE] +
                                     '|' + src[t.NONNUMERICIDENTIFIER] + ')';

    // ## Pre-release Version
    // Hyphen, followed by one or more dot-separated pre-release version
    // identifiers.

    tok('PRERELEASE');
    src[t.PRERELEASE] = '(?:-(' + src[t.PRERELEASEIDENTIFIER] +
                      '(?:\\.' + src[t.PRERELEASEIDENTIFIER] + ')*))';

    tok('PRERELEASELOOSE');
    src[t.PRERELEASELOOSE] = '(?:-?(' + src[t.PRERELEASEIDENTIFIERLOOSE] +
                           '(?:\\.' + src[t.PRERELEASEIDENTIFIERLOOSE] + ')*))';

    // ## Build Metadata Identifier
    // Any combination of digits, letters, or hyphens.

    tok('BUILDIDENTIFIER');
    src[t.BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

    // ## Build Metadata
    // Plus sign, followed by one or more period-separated build metadata
    // identifiers.

    tok('BUILD');
    src[t.BUILD] = '(?:\\+(' + src[t.BUILDIDENTIFIER] +
                 '(?:\\.' + src[t.BUILDIDENTIFIER] + ')*))';

    // ## Full Version String
    // A main version, followed optionally by a pre-release version and
    // build metadata.

    // Note that the only major, minor, patch, and pre-release sections of
    // the version string are capturing groups.  The build metadata is not a
    // capturing group, because it should not ever be used in version
    // comparison.

    tok('FULL');
    tok('FULLPLAIN');
    src[t.FULLPLAIN] = 'v?' + src[t.MAINVERSION] +
                      src[t.PRERELEASE] + '?' +
                      src[t.BUILD] + '?';

    src[t.FULL] = '^' + src[t.FULLPLAIN] + '$';

    // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
    // also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
    // common in the npm registry.
    tok('LOOSEPLAIN');
    src[t.LOOSEPLAIN] = '[v=\\s]*' + src[t.MAINVERSIONLOOSE] +
                      src[t.PRERELEASELOOSE] + '?' +
                      src[t.BUILD] + '?';

    tok('LOOSE');
    src[t.LOOSE] = '^' + src[t.LOOSEPLAIN] + '$';

    tok('GTLT');
    src[t.GTLT] = '((?:<|>)?=?)';

    // Something like "2.*" or "1.2.x".
    // Note that "x.x" is a valid xRange identifer, meaning "any version"
    // Only the first item is strictly required.
    tok('XRANGEIDENTIFIERLOOSE');
    src[t.XRANGEIDENTIFIERLOOSE] = src[t.NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
    tok('XRANGEIDENTIFIER');
    src[t.XRANGEIDENTIFIER] = src[t.NUMERICIDENTIFIER] + '|x|X|\\*';

    tok('XRANGEPLAIN');
    src[t.XRANGEPLAIN] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIER] + ')' +
                       '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' +
                       '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' +
                       '(?:' + src[t.PRERELEASE] + ')?' +
                       src[t.BUILD] + '?' +
                       ')?)?';

    tok('XRANGEPLAINLOOSE');
    src[t.XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                            '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                            '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                            '(?:' + src[t.PRERELEASELOOSE] + ')?' +
                            src[t.BUILD] + '?' +
                            ')?)?';

    tok('XRANGE');
    src[t.XRANGE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAIN] + '$';
    tok('XRANGELOOSE');
    src[t.XRANGELOOSE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAINLOOSE] + '$';

    // Coercion.
    // Extract anything that could conceivably be a part of a valid semver
    tok('COERCE');
    src[t.COERCE] = '(^|[^\\d])' +
                  '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
                  '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
                  '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
                  '(?:$|[^\\d])';
    tok('COERCERTL');
    re[t.COERCERTL] = new RegExp(src[t.COERCE], 'g');

    // Tilde ranges.
    // Meaning is "reasonably at or greater than"
    tok('LONETILDE');
    src[t.LONETILDE] = '(?:~>?)';

    tok('TILDETRIM');
    src[t.TILDETRIM] = '(\\s*)' + src[t.LONETILDE] + '\\s+';
    re[t.TILDETRIM] = new RegExp(src[t.TILDETRIM], 'g');
    var tildeTrimReplace = '$1~';

    tok('TILDE');
    src[t.TILDE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAIN] + '$';
    tok('TILDELOOSE');
    src[t.TILDELOOSE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAINLOOSE] + '$';

    // Caret ranges.
    // Meaning is "at least and backwards compatible with"
    tok('LONECARET');
    src[t.LONECARET] = '(?:\\^)';

    tok('CARETTRIM');
    src[t.CARETTRIM] = '(\\s*)' + src[t.LONECARET] + '\\s+';
    re[t.CARETTRIM] = new RegExp(src[t.CARETTRIM], 'g');
    var caretTrimReplace = '$1^';

    tok('CARET');
    src[t.CARET] = '^' + src[t.LONECARET] + src[t.XRANGEPLAIN] + '$';
    tok('CARETLOOSE');
    src[t.CARETLOOSE] = '^' + src[t.LONECARET] + src[t.XRANGEPLAINLOOSE] + '$';

    // A simple gt/lt/eq thing, or just "" to indicate "any version"
    tok('COMPARATORLOOSE');
    src[t.COMPARATORLOOSE] = '^' + src[t.GTLT] + '\\s*(' + src[t.LOOSEPLAIN] + ')$|^$';
    tok('COMPARATOR');
    src[t.COMPARATOR] = '^' + src[t.GTLT] + '\\s*(' + src[t.FULLPLAIN] + ')$|^$';

    // An expression to strip any whitespace between the gtlt and the thing
    // it modifies, so that `> 1.2.3` ==> `>1.2.3`
    tok('COMPARATORTRIM');
    src[t.COMPARATORTRIM] = '(\\s*)' + src[t.GTLT] +
                          '\\s*(' + src[t.LOOSEPLAIN] + '|' + src[t.XRANGEPLAIN] + ')';

    // this one has to use the /g flag
    re[t.COMPARATORTRIM] = new RegExp(src[t.COMPARATORTRIM], 'g');
    var comparatorTrimReplace = '$1$2$3';

    // Something like `1.2.3 - 1.2.4`
    // Note that these all use the loose form, because they'll be
    // checked against either the strict or loose comparator form
    // later.
    tok('HYPHENRANGE');
    src[t.HYPHENRANGE] = '^\\s*(' + src[t.XRANGEPLAIN] + ')' +
                       '\\s+-\\s+' +
                       '(' + src[t.XRANGEPLAIN] + ')' +
                       '\\s*$';

    tok('HYPHENRANGELOOSE');
    src[t.HYPHENRANGELOOSE] = '^\\s*(' + src[t.XRANGEPLAINLOOSE] + ')' +
                            '\\s+-\\s+' +
                            '(' + src[t.XRANGEPLAINLOOSE] + ')' +
                            '\\s*$';

    // Star ranges basically just allow anything at all.
    tok('STAR');
    src[t.STAR] = '(<|>)?=?\\s*\\*';

    // Compile to actual regexp objects.
    // All are flag-free, unless they were created above with a flag.
    for (var i = 0; i < R; i++) {
      debug(i, src[i]);
      if (!re[i]) {
        re[i] = new RegExp(src[i]);
      }
    }

    exports.parse = parse;
    function parse (version, options) {
      if (!options || typeof options !== 'object') {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }

      if (version instanceof SemVer) {
        return version
      }

      if (typeof version !== 'string') {
        return null
      }

      if (version.length > MAX_LENGTH) {
        return null
      }

      var r = options.loose ? re[t.LOOSE] : re[t.FULL];
      if (!r.test(version)) {
        return null
      }

      try {
        return new SemVer(version, options)
      } catch (er) {
        return null
      }
    }

    exports.valid = valid;
    function valid (version, options) {
      var v = parse(version, options);
      return v ? v.version : null
    }

    exports.clean = clean;
    function clean (version, options) {
      var s = parse(version.trim().replace(/^[=v]+/, ''), options);
      return s ? s.version : null
    }

    exports.SemVer = SemVer;

    function SemVer (version, options) {
      if (!options || typeof options !== 'object') {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (version instanceof SemVer) {
        if (version.loose === options.loose) {
          return version
        } else {
          version = version.version;
        }
      } else if (typeof version !== 'string') {
        throw new TypeError('Invalid Version: ' + version)
      }

      if (version.length > MAX_LENGTH) {
        throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
      }

      if (!(this instanceof SemVer)) {
        return new SemVer(version, options)
      }

      debug('SemVer', version, options);
      this.options = options;
      this.loose = !!options.loose;

      var m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);

      if (!m) {
        throw new TypeError('Invalid Version: ' + version)
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
        this.prerelease = m[4].split('.').map(function (id) {
          if (/^[0-9]+$/.test(id)) {
            var num = +id;
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

    SemVer.prototype.format = function () {
      this.version = this.major + '.' + this.minor + '.' + this.patch;
      if (this.prerelease.length) {
        this.version += '-' + this.prerelease.join('.');
      }
      return this.version
    };

    SemVer.prototype.toString = function () {
      return this.version
    };

    SemVer.prototype.compare = function (other) {
      debug('SemVer.compare', this.version, this.options, other);
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }

      return this.compareMain(other) || this.comparePre(other)
    };

    SemVer.prototype.compareMain = function (other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }

      return compareIdentifiers(this.major, other.major) ||
             compareIdentifiers(this.minor, other.minor) ||
             compareIdentifiers(this.patch, other.patch)
    };

    SemVer.prototype.comparePre = function (other) {
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

      var i = 0;
      do {
        var a = this.prerelease[i];
        var b = other.prerelease[i];
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
    };

    SemVer.prototype.compareBuild = function (other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }

      var i = 0;
      do {
        var a = this.build[i];
        var b = other.build[i];
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
    };

    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    SemVer.prototype.inc = function (release, identifier) {
      switch (release) {
        case 'premajor':
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc('pre', identifier);
          break
        case 'preminor':
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc('pre', identifier);
          break
        case 'prepatch':
          // If this is already a prerelease, it will bump to the next version
          // drop any prereleases that might already exist, since they are not
          // relevant at this point.
          this.prerelease.length = 0;
          this.inc('patch', identifier);
          this.inc('pre', identifier);
          break
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case 'prerelease':
          if (this.prerelease.length === 0) {
            this.inc('patch', identifier);
          }
          this.inc('pre', identifier);
          break

        case 'major':
          // If this is a pre-major version, bump up to the same major version.
          // Otherwise increment major.
          // 1.0.0-5 bumps to 1.0.0
          // 1.1.0 bumps to 2.0.0
          if (this.minor !== 0 ||
              this.patch !== 0 ||
              this.prerelease.length === 0) {
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
        // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
        case 'pre':
          if (this.prerelease.length === 0) {
            this.prerelease = [0];
          } else {
            var i = this.prerelease.length;
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
          break

        default:
          throw new Error('invalid increment argument: ' + release)
      }
      this.format();
      this.raw = this.version;
      return this
    };

    exports.inc = inc;
    function inc (version, release, loose, identifier) {
      if (typeof (loose) === 'string') {
        identifier = loose;
        loose = undefined;
      }

      try {
        return new SemVer(version, loose).inc(release, identifier).version
      } catch (er) {
        return null
      }
    }

    exports.diff = diff;
    function diff (version1, version2) {
      if (eq(version1, version2)) {
        return null
      } else {
        var v1 = parse(version1);
        var v2 = parse(version2);
        var prefix = '';
        if (v1.prerelease.length || v2.prerelease.length) {
          prefix = 'pre';
          var defaultResult = 'prerelease';
        }
        for (var key in v1) {
          if (key === 'major' || key === 'minor' || key === 'patch') {
            if (v1[key] !== v2[key]) {
              return prefix + key
            }
          }
        }
        return defaultResult // may be undefined
      }
    }

    exports.compareIdentifiers = compareIdentifiers;

    var numeric = /^[0-9]+$/;
    function compareIdentifiers (a, b) {
      var anum = numeric.test(a);
      var bnum = numeric.test(b);

      if (anum && bnum) {
        a = +a;
        b = +b;
      }

      return a === b ? 0
        : (anum && !bnum) ? -1
        : (bnum && !anum) ? 1
        : a < b ? -1
        : 1
    }

    exports.rcompareIdentifiers = rcompareIdentifiers;
    function rcompareIdentifiers (a, b) {
      return compareIdentifiers(b, a)
    }

    exports.major = major;
    function major (a, loose) {
      return new SemVer(a, loose).major
    }

    exports.minor = minor;
    function minor (a, loose) {
      return new SemVer(a, loose).minor
    }

    exports.patch = patch;
    function patch (a, loose) {
      return new SemVer(a, loose).patch
    }

    exports.compare = compare;
    function compare (a, b, loose) {
      return new SemVer(a, loose).compare(new SemVer(b, loose))
    }

    exports.compareLoose = compareLoose;
    function compareLoose (a, b) {
      return compare(a, b, true)
    }

    exports.compareBuild = compareBuild;
    function compareBuild (a, b, loose) {
      var versionA = new SemVer(a, loose);
      var versionB = new SemVer(b, loose);
      return versionA.compare(versionB) || versionA.compareBuild(versionB)
    }

    exports.rcompare = rcompare;
    function rcompare (a, b, loose) {
      return compare(b, a, loose)
    }

    exports.sort = sort;
    function sort (list, loose) {
      return list.sort(function (a, b) {
        return exports.compareBuild(a, b, loose)
      })
    }

    exports.rsort = rsort;
    function rsort (list, loose) {
      return list.sort(function (a, b) {
        return exports.compareBuild(b, a, loose)
      })
    }

    exports.gt = gt;
    function gt (a, b, loose) {
      return compare(a, b, loose) > 0
    }

    exports.lt = lt;
    function lt (a, b, loose) {
      return compare(a, b, loose) < 0
    }

    exports.eq = eq;
    function eq (a, b, loose) {
      return compare(a, b, loose) === 0
    }

    exports.neq = neq;
    function neq (a, b, loose) {
      return compare(a, b, loose) !== 0
    }

    exports.gte = gte;
    function gte (a, b, loose) {
      return compare(a, b, loose) >= 0
    }

    exports.lte = lte;
    function lte (a, b, loose) {
      return compare(a, b, loose) <= 0
    }

    exports.cmp = cmp;
    function cmp (a, op, b, loose) {
      switch (op) {
        case '===':
          if (typeof a === 'object')
            a = a.version;
          if (typeof b === 'object')
            b = b.version;
          return a === b

        case '!==':
          if (typeof a === 'object')
            a = a.version;
          if (typeof b === 'object')
            b = b.version;
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
          throw new TypeError('Invalid operator: ' + op)
      }
    }

    exports.Comparator = Comparator;
    function Comparator (comp, options) {
      if (!options || typeof options !== 'object') {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }

      if (comp instanceof Comparator) {
        if (comp.loose === !!options.loose) {
          return comp
        } else {
          comp = comp.value;
        }
      }

      if (!(this instanceof Comparator)) {
        return new Comparator(comp, options)
      }

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

    var ANY = {};
    Comparator.prototype.parse = function (comp) {
      var r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
      var m = comp.match(r);

      if (!m) {
        throw new TypeError('Invalid comparator: ' + comp)
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
    };

    Comparator.prototype.toString = function () {
      return this.value
    };

    Comparator.prototype.test = function (version) {
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
    };

    Comparator.prototype.intersects = function (comp, options) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError('a Comparator is required')
      }

      if (!options || typeof options !== 'object') {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }

      var rangeTmp;

      if (this.operator === '') {
        if (this.value === '') {
          return true
        }
        rangeTmp = new Range(comp.value, options);
        return satisfies(this.value, rangeTmp, options)
      } else if (comp.operator === '') {
        if (comp.value === '') {
          return true
        }
        rangeTmp = new Range(this.value, options);
        return satisfies(comp.semver, rangeTmp, options)
      }

      var sameDirectionIncreasing =
        (this.operator === '>=' || this.operator === '>') &&
        (comp.operator === '>=' || comp.operator === '>');
      var sameDirectionDecreasing =
        (this.operator === '<=' || this.operator === '<') &&
        (comp.operator === '<=' || comp.operator === '<');
      var sameSemVer = this.semver.version === comp.semver.version;
      var differentDirectionsInclusive =
        (this.operator === '>=' || this.operator === '<=') &&
        (comp.operator === '>=' || comp.operator === '<=');
      var oppositeDirectionsLessThan =
        cmp(this.semver, '<', comp.semver, options) &&
        ((this.operator === '>=' || this.operator === '>') &&
        (comp.operator === '<=' || comp.operator === '<'));
      var oppositeDirectionsGreaterThan =
        cmp(this.semver, '>', comp.semver, options) &&
        ((this.operator === '<=' || this.operator === '<') &&
        (comp.operator === '>=' || comp.operator === '>'));

      return sameDirectionIncreasing || sameDirectionDecreasing ||
        (sameSemVer && differentDirectionsInclusive) ||
        oppositeDirectionsLessThan || oppositeDirectionsGreaterThan
    };

    exports.Range = Range;
    function Range (range, options) {
      if (!options || typeof options !== 'object') {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }

      if (range instanceof Range) {
        if (range.loose === !!options.loose &&
            range.includePrerelease === !!options.includePrerelease) {
          return range
        } else {
          return new Range(range.raw, options)
        }
      }

      if (range instanceof Comparator) {
        return new Range(range.value, options)
      }

      if (!(this instanceof Range)) {
        return new Range(range, options)
      }

      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;

      // First, split based on boolean or ||
      this.raw = range;
      this.set = range.split(/\s*\|\|\s*/).map(function (range) {
        return this.parseRange(range.trim())
      }, this).filter(function (c) {
        // throw out any that are not relevant for whatever reason
        return c.length
      });

      if (!this.set.length) {
        throw new TypeError('Invalid SemVer Range: ' + range)
      }

      this.format();
    }

    Range.prototype.format = function () {
      this.range = this.set.map(function (comps) {
        return comps.join(' ').trim()
      }).join('||').trim();
      return this.range
    };

    Range.prototype.toString = function () {
      return this.range
    };

    Range.prototype.parseRange = function (range) {
      var loose = this.options.loose;
      range = range.trim();
      // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
      var hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
      range = range.replace(hr, hyphenReplace);
      debug('hyphen replace', range);
      // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
      range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
      debug('comparator trim', range, re[t.COMPARATORTRIM]);

      // `~ 1.2.3` => `~1.2.3`
      range = range.replace(re[t.TILDETRIM], tildeTrimReplace);

      // `^ 1.2.3` => `^1.2.3`
      range = range.replace(re[t.CARETTRIM], caretTrimReplace);

      // normalize spaces
      range = range.split(/\s+/).join(' ');

      // At this point, the range is completely trimmed and
      // ready to be split into comparators.

      var compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
      var set = range.split(' ').map(function (comp) {
        return parseComparator(comp, this.options)
      }, this).join(' ').split(/\s+/);
      if (this.options.loose) {
        // in loose mode, throw out any that are not valid comparators
        set = set.filter(function (comp) {
          return !!comp.match(compRe)
        });
      }
      set = set.map(function (comp) {
        return new Comparator(comp, this.options)
      }, this);

      return set
    };

    Range.prototype.intersects = function (range, options) {
      if (!(range instanceof Range)) {
        throw new TypeError('a Range is required')
      }

      return this.set.some(function (thisComparators) {
        return (
          isSatisfiable(thisComparators, options) &&
          range.set.some(function (rangeComparators) {
            return (
              isSatisfiable(rangeComparators, options) &&
              thisComparators.every(function (thisComparator) {
                return rangeComparators.every(function (rangeComparator) {
                  return thisComparator.intersects(rangeComparator, options)
                })
              })
            )
          })
        )
      })
    };

    // take a set of comparators and determine whether there
    // exists a version which can satisfy it
    function isSatisfiable (comparators, options) {
      var result = true;
      var remainingComparators = comparators.slice();
      var testComparator = remainingComparators.pop();

      while (result && remainingComparators.length) {
        result = remainingComparators.every(function (otherComparator) {
          return testComparator.intersects(otherComparator, options)
        });

        testComparator = remainingComparators.pop();
      }

      return result
    }

    // Mostly just for testing and legacy API reasons
    exports.toComparators = toComparators;
    function toComparators (range, options) {
      return new Range(range, options).set.map(function (comp) {
        return comp.map(function (c) {
          return c.value
        }).join(' ').trim().split(' ')
      })
    }

    // comprised of xranges, tildes, stars, and gtlt's at this point.
    // already replaced the hyphen ranges
    // turn into a set of JUST comparators.
    function parseComparator (comp, options) {
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
    }

    function isX (id) {
      return !id || id.toLowerCase() === 'x' || id === '*'
    }

    // ~, ~> --> * (any, kinda silly)
    // ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
    // ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
    // ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
    // ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
    // ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
    function replaceTildes (comp, options) {
      return comp.trim().split(/\s+/).map(function (comp) {
        return replaceTilde(comp, options)
      }).join(' ')
    }

    function replaceTilde (comp, options) {
      var r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      return comp.replace(r, function (_, M, m, p, pr) {
        debug('tilde', comp, _, M, m, p, pr);
        var ret;

        if (isX(M)) {
          ret = '';
        } else if (isX(m)) {
          ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
        } else if (isX(p)) {
          // ~1.2 == >=1.2.0 <1.3.0
          ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
        } else if (pr) {
          debug('replaceTilde pr', pr);
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + (+m + 1) + '.0';
        } else {
          // ~1.2.3 == >=1.2.3 <1.3.0
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0';
        }

        debug('tilde return', ret);
        return ret
      })
    }

    // ^ --> * (any, kinda silly)
    // ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
    // ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
    // ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
    // ^1.2.3 --> >=1.2.3 <2.0.0
    // ^1.2.0 --> >=1.2.0 <2.0.0
    function replaceCarets (comp, options) {
      return comp.trim().split(/\s+/).map(function (comp) {
        return replaceCaret(comp, options)
      }).join(' ')
    }

    function replaceCaret (comp, options) {
      debug('caret', comp, options);
      var r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
      return comp.replace(r, function (_, M, m, p, pr) {
        debug('caret', comp, _, M, m, p, pr);
        var ret;

        if (isX(M)) {
          ret = '';
        } else if (isX(m)) {
          ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
        } else if (isX(p)) {
          if (M === '0') {
            ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
          } else {
            ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
          }
        } else if (pr) {
          debug('replaceCaret pr', pr);
          if (M === '0') {
            if (m === '0') {
              ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                    ' <' + M + '.' + m + '.' + (+p + 1);
            } else {
              ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                    ' <' + M + '.' + (+m + 1) + '.0';
            }
          } else {
            ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                  ' <' + (+M + 1) + '.0.0';
          }
        } else {
          debug('no pr');
          if (M === '0') {
            if (m === '0') {
              ret = '>=' + M + '.' + m + '.' + p +
                    ' <' + M + '.' + m + '.' + (+p + 1);
            } else {
              ret = '>=' + M + '.' + m + '.' + p +
                    ' <' + M + '.' + (+m + 1) + '.0';
            }
          } else {
            ret = '>=' + M + '.' + m + '.' + p +
                  ' <' + (+M + 1) + '.0.0';
          }
        }

        debug('caret return', ret);
        return ret
      })
    }

    function replaceXRanges (comp, options) {
      debug('replaceXRanges', comp, options);
      return comp.split(/\s+/).map(function (comp) {
        return replaceXRange(comp, options)
      }).join(' ')
    }

    function replaceXRange (comp, options) {
      comp = comp.trim();
      var r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
        debug('xRange', comp, ret, gtlt, M, m, p, pr);
        var xM = isX(M);
        var xm = xM || isX(m);
        var xp = xm || isX(p);
        var anyX = xp;

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
            // >1.2.3 => >= 1.2.4
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

          ret = gtlt + M + '.' + m + '.' + p + pr;
        } else if (xm) {
          ret = '>=' + M + '.0.0' + pr + ' <' + (+M + 1) + '.0.0' + pr;
        } else if (xp) {
          ret = '>=' + M + '.' + m + '.0' + pr +
            ' <' + M + '.' + (+m + 1) + '.0' + pr;
        }

        debug('xRange return', ret);

        return ret
      })
    }

    // Because * is AND-ed with everything else in the comparator,
    // and '' means "any version", just remove the *s entirely.
    function replaceStars (comp, options) {
      debug('replaceStars', comp, options);
      // Looseness is ignored here.  star is always as loose as it gets!
      return comp.trim().replace(re[t.STAR], '')
    }

    // This function is passed to string.replace(re[t.HYPHENRANGE])
    // M, m, patch, prerelease, build
    // 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
    // 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
    // 1.2 - 3.4 => >=1.2.0 <3.5.0
    function hyphenReplace ($0,
      from, fM, fm, fp, fpr, fb,
      to, tM, tm, tp, tpr, tb) {
      if (isX(fM)) {
        from = '';
      } else if (isX(fm)) {
        from = '>=' + fM + '.0.0';
      } else if (isX(fp)) {
        from = '>=' + fM + '.' + fm + '.0';
      } else {
        from = '>=' + from;
      }

      if (isX(tM)) {
        to = '';
      } else if (isX(tm)) {
        to = '<' + (+tM + 1) + '.0.0';
      } else if (isX(tp)) {
        to = '<' + tM + '.' + (+tm + 1) + '.0';
      } else if (tpr) {
        to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
      } else {
        to = '<=' + to;
      }

      return (from + ' ' + to).trim()
    }

    // if ANY of the sets match ALL of its comparators, then pass
    Range.prototype.test = function (version) {
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

      for (var i = 0; i < this.set.length; i++) {
        if (testSet(this.set[i], version, this.options)) {
          return true
        }
      }
      return false
    };

    function testSet (set, version, options) {
      for (var i = 0; i < set.length; i++) {
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
        for (i = 0; i < set.length; i++) {
          debug(set[i].semver);
          if (set[i].semver === ANY) {
            continue
          }

          if (set[i].semver.prerelease.length > 0) {
            var allowed = set[i].semver;
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
    }

    exports.satisfies = satisfies;
    function satisfies (version, range, options) {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false
      }
      return range.test(version)
    }

    exports.maxSatisfying = maxSatisfying;
    function maxSatisfying (versions, range, options) {
      var max = null;
      var maxSV = null;
      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null
      }
      versions.forEach(function (v) {
        if (rangeObj.test(v)) {
          // satisfies(v, range, options)
          if (!max || maxSV.compare(v) === -1) {
            // compare(max, v, true)
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max
    }

    exports.minSatisfying = minSatisfying;
    function minSatisfying (versions, range, options) {
      var min = null;
      var minSV = null;
      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null
      }
      versions.forEach(function (v) {
        if (rangeObj.test(v)) {
          // satisfies(v, range, options)
          if (!min || minSV.compare(v) === 1) {
            // compare(min, v, true)
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min
    }

    exports.minVersion = minVersion;
    function minVersion (range, loose) {
      range = new Range(range, loose);

      var minver = new SemVer('0.0.0');
      if (range.test(minver)) {
        return minver
      }

      minver = new SemVer('0.0.0-0');
      if (range.test(minver)) {
        return minver
      }

      minver = null;
      for (var i = 0; i < range.set.length; ++i) {
        var comparators = range.set[i];

        comparators.forEach(function (comparator) {
          // Clone to avoid manipulating the comparator's semver object.
          var compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case '>':
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
              /* fallthrough */
            case '':
            case '>=':
              if (!minver || gt(minver, compver)) {
                minver = compver;
              }
              break
            case '<':
            case '<=':
              /* Ignore maximum versions */
              break
            /* istanbul ignore next */
            default:
              throw new Error('Unexpected operation: ' + comparator.operator)
          }
        });
      }

      if (minver && range.test(minver)) {
        return minver
      }

      return null
    }

    exports.validRange = validRange;
    function validRange (range, options) {
      try {
        // Return '*' instead of '' so that truthiness works.
        // This will throw if it's invalid anyway
        return new Range(range, options).range || '*'
      } catch (er) {
        return null
      }
    }

    // Determine if version is less than all the versions possible in the range
    exports.ltr = ltr;
    function ltr (version, range, options) {
      return outside(version, range, '<', options)
    }

    // Determine if version is greater than all the versions possible in the range.
    exports.gtr = gtr;
    function gtr (version, range, options) {
      return outside(version, range, '>', options)
    }

    exports.outside = outside;
    function outside (version, range, hilo, options) {
      version = new SemVer(version, options);
      range = new Range(range, options);

      var gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case '>':
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = '>';
          ecomp = '>=';
          break
        case '<':
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = '<';
          ecomp = '<=';
          break
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"')
      }

      // If it satisifes the range it is not outside
      if (satisfies(version, range, options)) {
        return false
      }

      // From now on, variable terms are as if we're in "gtr" mode.
      // but note that everything is flipped for the "ltr" function.

      for (var i = 0; i < range.set.length; ++i) {
        var comparators = range.set[i];

        var high = null;
        var low = null;

        comparators.forEach(function (comparator) {
          if (comparator.semver === ANY) {
            comparator = new Comparator('>=0.0.0');
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });

        // If the edge version comparator has a operator then our version
        // isn't outside it
        if (high.operator === comp || high.operator === ecomp) {
          return false
        }

        // If the lowest version comparator has an operator and our version
        // is less than it then it isn't higher than the range
        if ((!low.operator || low.operator === comp) &&
            ltefn(version, low.semver)) {
          return false
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false
        }
      }
      return true
    }

    exports.prerelease = prerelease;
    function prerelease (version, options) {
      var parsed = parse(version, options);
      return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
    }

    exports.intersects = intersects;
    function intersects (r1, r2, options) {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2)
    }

    exports.coerce = coerce;
    function coerce (version, options) {
      if (version instanceof SemVer) {
        return version
      }

      if (typeof version === 'number') {
        version = String(version);
      }

      if (typeof version !== 'string') {
        return null
      }

      options = options || {};

      var match = null;
      if (!options.rtl) {
        match = version.match(re[t.COERCE]);
      } else {
        // Find the right-most coercible string that does not share
        // a terminus with a more left-ward coercible string.
        // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
        //
        // Walk through the string checking with a /g regexp
        // Manually set the index so as to pick up overlapping matches.
        // Stop when we get a match that ends at the string end, since no
        // coercible string can be more right-ward without the same terminus.
        var next;
        while ((next = re[t.COERCERTL].exec(version)) &&
          (!match || match.index + match[0].length !== version.length)
        ) {
          if (!match ||
              next.index + next[0].length !== match.index + match[0].length) {
            match = next;
          }
          re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
        }
        // leave it in a clean state
        re[t.COERCERTL].lastIndex = -1;
      }

      if (match === null) {
        return null
      }

      return parse(match[2] +
        '.' + (match[3] || '0') +
        '.' + (match[4] || '0'), options)
    }
    });
    var semver_1 = semver.SEMVER_SPEC_VERSION;
    var semver_2 = semver.re;
    var semver_3 = semver.src;
    var semver_4 = semver.tokens;
    var semver_5 = semver.parse;
    var semver_6 = semver.valid;
    var semver_7 = semver.clean;
    var semver_8 = semver.SemVer;
    var semver_9 = semver.inc;
    var semver_10 = semver.diff;
    var semver_11 = semver.compareIdentifiers;
    var semver_12 = semver.rcompareIdentifiers;
    var semver_13 = semver.major;
    var semver_14 = semver.minor;
    var semver_15 = semver.patch;
    var semver_16 = semver.compare;
    var semver_17 = semver.compareLoose;
    var semver_18 = semver.compareBuild;
    var semver_19 = semver.rcompare;
    var semver_20 = semver.sort;
    var semver_21 = semver.rsort;
    var semver_22 = semver.gt;
    var semver_23 = semver.lt;
    var semver_24 = semver.eq;
    var semver_25 = semver.neq;
    var semver_26 = semver.gte;
    var semver_27 = semver.lte;
    var semver_28 = semver.cmp;
    var semver_29 = semver.Comparator;
    var semver_30 = semver.Range;
    var semver_31 = semver.toComparators;
    var semver_32 = semver.satisfies;
    var semver_33 = semver.maxSatisfying;
    var semver_34 = semver.minSatisfying;
    var semver_35 = semver.minVersion;
    var semver_36 = semver.validRange;
    var semver_37 = semver.ltr;
    var semver_38 = semver.gtr;
    var semver_39 = semver.outside;
    var semver_40 = semver.prerelease;
    var semver_41 = semver.intersects;
    var semver_42 = semver.coerce;

    var vegaSchemaUrlParser = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Parse a vega schema url into library and version.
     */
    function default_1(url) {
        var regex = /\/schema\/([\w-]+)\/([\w\.\-]+)\.json$/g;
        var _a = regex.exec(url).slice(1, 3), library = _a[0], version = _a[1];
        return { library: library, version: version };
    }
    exports.default = default_1;

    });

    var schemaParser = unwrapExports(vegaSchemaUrlParser);

    var name$1 = "vega-themes";
    var version$1 = "2.6.0";
    var description$1 = "Themes for stylized Vega and Vega-Lite visualizations.";
    var keywords$1 = [
    	"vega",
    	"vega-lite",
    	"themes",
    	"style"
    ];
    var license$1 = "BSD-3-Clause";
    var author$1 = {
    	name: "UW Interactive Data Lab",
    	url: "https://idl.cs.washington.edu"
    };
    var contributors$1 = [
    	{
    		name: "Emily Gu",
    		url: "https://github.com/emilygu"
    	},
    	{
    		name: "Arvind Satyanarayan",
    		url: "http://arvindsatya.com"
    	},
    	{
    		name: "Jeffrey Heer",
    		url: "http://idl.cs.washington.edu"
    	},
    	{
    		name: "Dominik Moritz",
    		url: "https://www.domoritz.de"
    	}
    ];
    var main$1 = "build/vega-themes.js";
    var module$1 = "build/src/index.js";
    var unpkg$1 = "build/vega-themes.min.js";
    var jsdelivr$1 = "build/vega-themes.min.js";
    var typings = "build/src/index.d.ts";
    var repository$1 = {
    	type: "git",
    	url: "https://github.com/vega/vega-themes.git"
    };
    var scripts$1 = {
    	prepare: "beemo create-config --silent",
    	clean: "rm -rf build examples/build",
    	prettierbase: "beemo prettier 'examples/*.{html,scss,css}'",
    	eslintbase: "beemo eslint 'src/**/*.ts'",
    	format: "yarn eslintbase --fix && yarn prettierbase --write",
    	lint: "yarn eslintbase && yarn prettierbase --check",
    	prebuild: "mkdir -p build",
    	build: "tsc && rollup -c",
    	postbuild: "terser build/vega-themes.js -cm > build/vega-themes.min.js",
    	"deploy:gh": "yarn build && mkdir -p examples/build && rsync -r build/* examples/build && gh-pages -d examples",
    	prepublishOnly: "yarn clean && yarn build",
    	preversion: "yarn lint",
    	serve: "browser-sync start -s -f build examples --serveStatic examples",
    	start: "yarn build && concurrently --kill-others -n Server,Typescript,Rollup 'yarn serve' 'tsc -w' 'rollup -c -w'"
    };
    var devDependencies$1 = {
    	"browser-sync": "^2.26.7",
    	concurrently: "^5.0.0",
    	"gh-pages": "^2.1.1",
    	rollup: "^1.27.8",
    	"rollup-plugin-json": "^4.0.0",
    	terser: "^4.4.2",
    	typescript: "~3.7.3",
    	vega: "^5.9.0",
    	"vega-lite": "^4.0.0",
    	"vega-lite-dev-config": "^0.3.1"
    };
    var peerDependencies$1 = {
    	vega: "*",
    	"vega-lite": "*"
    };
    var beemo$1 = {
    	module: "vega-lite-dev-config",
    	drivers: [
    		"prettier",
    		"eslint"
    	]
    };
    var pkg$1 = {
    	name: name$1,
    	version: version$1,
    	description: description$1,
    	keywords: keywords$1,
    	license: license$1,
    	author: author$1,
    	contributors: contributors$1,
    	main: main$1,
    	module: module$1,
    	unpkg: unpkg$1,
    	jsdelivr: jsdelivr$1,
    	typings: typings,
    	repository: repository$1,
    	scripts: scripts$1,
    	devDependencies: devDependencies$1,
    	peerDependencies: peerDependencies$1,
    	beemo: beemo$1
    };

    const lightColor = '#fff';
    const medColor = '#888';
    const darkTheme = {
        background: '#333',
        title: { color: lightColor },
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
        arc: { fill: markColor },
        area: { fill: markColor },
        line: { stroke: markColor, strokeWidth: 2 },
        path: { stroke: markColor },
        rect: { fill: markColor },
        shape: { stroke: markColor },
        symbol: { fill: markColor, strokeWidth: 1.5, size: 50 },
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
            category: [
                '#4572a7',
                '#aa4643',
                '#8aa453',
                '#71598e',
                '#4598ae',
                '#d98445',
                '#94aace',
                '#d09393',
                '#b9cc98',
                '#a99cbc'
            ]
        }
    };

    const markColor$1 = '#30a2da';
    const axisColor = '#cbcbcb';
    const guideLabelColor = '#999';
    const guideTitleColor = '#333';
    const backgroundColor = '#f0f0f0';
    const blackTitle = '#333';
    const fiveThirtyEightTheme = {
        arc: { fill: markColor$1 },
        area: { fill: markColor$1 },
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
        path: { stroke: markColor$1, strokeWidth: 0.5 },
        rect: { fill: markColor$1 },
        range: {
            category: [
                '#30a2da',
                '#fc4f30',
                '#e5ae38',
                '#6d904f',
                '#8b8b8b',
                '#b96db8',
                '#ff9e27',
                '#56cc60',
                '#52d2ca',
                '#52689e',
                '#545454',
                '#9fe4f8'
            ],
            diverging: ['#cc0020', '#e77866', '#f6e7e1', '#d6e8ed', '#91bfd9', '#1d78b5'],
            heatmap: ['#d6e8ed', '#cee0e5', '#91bfd9', '#549cc6', '#1d78b5']
        },
        point: {
            filled: true,
            shape: 'circle'
        },
        shape: { stroke: markColor$1 },
        style: {
            bar: {
                binSpacing: 2,
                fill: markColor$1,
                stroke: null
            }
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
        arc: { fill: markColor$2 },
        area: { fill: markColor$2 },
        line: { stroke: markColor$2 },
        path: { stroke: markColor$2 },
        rect: { fill: markColor$2 },
        shape: { stroke: markColor$2 },
        symbol: { fill: markColor$2, size: 40 },
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
            category: [
                '#000000',
                '#7F7F7F',
                '#1A1A1A',
                '#999999',
                '#333333',
                '#B0B0B0',
                '#4D4D4D',
                '#C9C9C9',
                '#666666',
                '#DCDCDC'
            ]
        }
    };

    const headlineFontSize = 22;
    const headlineFontWeight = 'normal';
    const labelFont = 'Benton Gothic, sans-serif';
    const labelFontSize = 11.5;
    const labelFontWeight = 'normal';
    const markColor$3 = '#82c6df';
    // const markHighlight = '#006d8f';
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
        arc: { fill: markColor$3 },
        area: { fill: markColor$3 },
        line: { stroke: markColor$3, strokeWidth: 2 },
        path: { stroke: markColor$3 },
        rect: { fill: markColor$3 },
        shape: { stroke: markColor$3 },
        symbol: { fill: markColor$3, size: 30 },
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
        arc: { fill: markColor$4 },
        area: { fill: markColor$4 },
        line: { stroke: markColor$4 },
        path: { stroke: markColor$4 },
        rect: { fill: markColor$4 },
        shape: { stroke: markColor$4 },
        symbol: { fill: markColor$4, size: 30 },
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
            category: [
                '#ab5787',
                '#51b2e5',
                '#703c5c',
                '#168dd9',
                '#d190b6',
                '#00609f',
                '#d365ba',
                '#154866',
                '#666666',
                '#c4c4c4'
            ]
        }
    };

    const markColor$5 = '#3e5c69';
    const voxTheme = {
        background: '#fff',
        arc: { fill: markColor$5 },
        area: { fill: markColor$5 },
        line: { stroke: markColor$5 },
        path: { stroke: markColor$5 },
        rect: { fill: markColor$5 },
        shape: { stroke: markColor$5 },
        symbol: { fill: markColor$5 },
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
        arc: { fill: markColor$6 },
        shape: { stroke: markColor$6 },
        symbol: { fill: markColor$6, size: 30 }
    };

    const version$2 = pkg$1.version;

    var themes = /*#__PURE__*/Object.freeze({
        __proto__: null,
        version: version$2,
        dark: darkTheme,
        excel: excelTheme,
        fivethirtyeight: fiveThirtyEightTheme,
        ggplot2: ggplot2Theme,
        latimes: latimesTheme,
        quartz: quartzTheme,
        vox: voxTheme,
        urbaninstitute: urbanInstituteTheme
    });

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
  color: black; }
  #vg-tooltip-element.visible {
    visibility: visible; }
  #vg-tooltip-element h2 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 13px; }
  #vg-tooltip-element table {
    border-spacing: 0; }
    #vg-tooltip-element table tr {
      border: none; }
      #vg-tooltip-element table tr td {
        overflow: hidden;
        text-overflow: ellipsis;
        padding-top: 2px;
        padding-bottom: 2px; }
        #vg-tooltip-element table tr td.key {
          color: #808080;
          max-width: 150px;
          text-align: right;
          padding-right: 4px; }
        #vg-tooltip-element table tr td.value {
          display: block;
          max-width: 300px;
          max-height: 7em;
          text-align: left; }
  #vg-tooltip-element.dark-theme {
    background-color: rgba(32, 32, 32, 0.9);
    border: 1px solid #f5f5f5;
    color: white; }
    #vg-tooltip-element.dark-theme td.key {
      color: #bfbfbf; }
`;

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
        maxDepth: 2
    };
    /**
     * Escape special HTML characters.
     *
     * @param value A value to convert to string and HTML-escape.
     */
    function escapeHTML(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;');
    }
    function createDefaultStyle(id) {
        // Just in case this id comes from a user, ensure these is no security issues
        if (!/^[A-Za-z]+[-:.\w]*$/.test(id)) {
            throw new Error('Invalid HTML ID');
        }
        return defaultStyle.toString().replace(EL_ID, id);
    }

    function accessor(fn, fields, name) {
      fn.fields = fields || [];
      fn.fname = name;
      return fn;
    }

    function error(message) {
      throw Error(message);
    }

    function splitAccessPath(p) {
      var path = [],
          q = null,
          b = 0,
          n = p.length,
          s = '',
          i, j, c;

      p = p + '';

      function push() {
        path.push(s + p.substring(i, j));
        s = '';
        i = j + 1;
      }

      for (i=j=0; j<n; ++j) {
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

    var isArray = Array.isArray;

    function isObject(_) {
      return _ === Object(_);
    }

    function isString(_) {
      return typeof _ === 'string';
    }

    function $(x) {
      return isArray(x) ? '[' + x.map($) + ']'
        : isObject(x) || isString(x) ?
          // Output valid JSON and JS source strings.
          // See http://timelessrepo.com/json-isnt-a-javascript-subset
          JSON.stringify(x).replace('\u2028','\\u2028').replace('\u2029', '\\u2029')
        : x;
    }

    function field(field, name) {
      var path = splitAccessPath(field),
          code = 'return _[' + path.map($).join('][') + '];';

      return accessor(
        Function('_', code),
        [(field = path.length===1 ? path[0] : field)],
        name || field
      );
    }

    var empty = [];

    var id = field('id');

    var identity = accessor(function(_) { return _; }, empty, 'identity');

    var zero = accessor(function() { return 0; }, empty, 'zero');

    var one = accessor(function() { return 1; }, empty, 'one');

    var truthy = accessor(function() { return true; }, empty, 'true');

    var falsy = accessor(function() { return false; }, empty, 'false');

    function mergeConfig(...configs) {
      return configs.reduce((out, source) => {
        for (var key in source) {
          if (key === 'signals') {
            // for signals, we merge the signals arrays
            // source signals take precedence over
            // existing signals with the same name
            out.signals = mergeNamed(out.signals, source.signals);
          } else {
            // otherwise, merge objects subject to recursion constraints
            // for legend block, recurse for the layout entry only
            // for style block, recurse for all properties
            // otherwise, no recursion: objects overwrite, no merging
            var r = key === 'legend' ? {'layout': 1}
              : key === 'style' ? true
              : null;
            writeConfig(out, key, source[key], r);
          }
        }
        return out;
      }, {});
    }

    function writeConfig(output, key, value, recurse) {
      var k, o;
      if (isObject(value) && !isArray(value)) {
        o = isObject(output[key]) ? output[key] : (output[key] = {});
        for (k in value) {
          if (recurse && (recurse === true || recurse[k])) {
            writeConfig(o, k, value[k]);
          } else {
            o[k] = value[k];
          }
        }
      } else {
        output[key] = value;
      }
    }

    function mergeNamed(a, b) {
      if (a == null) return b;

      const map = {}, out = [];

      function add(_) {
        if (!map[_.name]) {
          map[_.name] = 1;
          out.push(_);
        }
      }

      b.forEach(add);
      a.forEach(add);
      return out;
    }

    function isBoolean(_) {
      return typeof _ === 'boolean';
    }

    var __rest = (undefined && undefined.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };
    /**
     * Format the value to be shown in the toolip.
     *
     * @param value The value to show in the tooltip.
     * @param valueToHtml Function to convert a single cell value to an HTML string
     */
    function formatValue(value, valueToHtml, maxDepth) {
        if (isArray(value)) {
            return `[${value.map(v => valueToHtml(isString(v) ? v : stringify(v, maxDepth))).join(', ')}]`;
        }
        if (isObject(value)) {
            let content = '';
            const _a = value, { title } = _a, rest = __rest(_a, ["title"]);
            if (title) {
                content += `<h2>${valueToHtml(title)}</h2>`;
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
                    content += `<tr><td class="key">${valueToHtml(key)}:</td><td class="value">${valueToHtml(val)}</td></tr>`;
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
        return { x, y };
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
            // append a div element that we use as a tooltip unless it already exists
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.el = document.getElementById(elementId);
            if (!this.el) {
                this.el = document.createElement('div');
                this.el.setAttribute('id', elementId);
                this.el.classList.add('vg-tooltip');
                document.body.appendChild(this.el);
            }
        }
        /**
         * The tooltip handler function.
         */
        tooltipHandler(handler, event, item, value) {
            // console.log(handler, event, item, value);
            // hide tooltip for null, undefined, or empty string values
            if (value == null || value === '') {
                this.el.classList.remove('visible', `${this.options.theme}-theme`);
                return;
            }
            // set the tooltip content
            this.el.innerHTML = formatValue(value, this.options.sanitize, this.options.maxDepth);
            // make the tooltip visible
            this.el.classList.add('visible', `${this.options.theme}-theme`);
            const { x, y } = calculatePosition(event, this.el.getBoundingClientRect(), this.options.offsetX, this.options.offsetY);
            this.el.setAttribute('style', `top: ${y}px; left: ${x}px`);
        }
    }

    /**
     * Open editor url in a new window, and pass a message.
     */
    function post (window, url, data) {
        const editor = window.open(url);
        const wait = 10000;
        const step = 250;
        // eslint-disable-next-line no-bitwise
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
            editor.postMessage(data, '*');
            setTimeout(send, step);
            count -= 1;
        }
        setTimeout(send, step);
    }

    // generated with build-style.sh
    var embedStyle = `.vega-embed {
  position: relative;
  display: inline-block; }
  .vega-embed.has-actions {
    padding-right: 38px; }
  .vega-embed details:not([open]) > :not(summary) {
    display: none !important; }
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
    outline: none;
    cursor: pointer;
    line-height: 0px; }
    .vega-embed summary::-webkit-details-marker {
      display: none; }
    .vega-embed summary:active {
      box-shadow: #aaa 0px 0px 0px 1px inset; }
    .vega-embed summary svg {
      width: 14px;
      height: 14px; }
  .vega-embed details[open] summary {
    opacity: 0.7; }
  .vega-embed:hover summary,
  .vega-embed:focus summary {
    opacity: 1 !important;
    transition: opacity 0.2s ease; }
  .vega-embed .vega-actions {
    position: absolute;
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
    animation-timing-function: cubic-bezier(0.2, 0, 0.13, 1.5); }
    .vega-embed .vega-actions a {
      padding: 8px 16px;
      font-family: sans-serif;
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      color: #434a56;
      text-decoration: none; }
      .vega-embed .vega-actions a:hover {
        background-color: #f7f7f9;
        color: black; }
    .vega-embed .vega-actions::before, .vega-embed .vega-actions::after {
      content: "";
      display: inline-block;
      position: absolute; }
    .vega-embed .vega-actions::before {
      left: auto;
      right: 14px;
      top: -16px;
      border: 8px solid #0000;
      border-bottom-color: #d9d9d9; }
    .vega-embed .vega-actions::after {
      left: auto;
      right: 15px;
      top: -14px;
      border: 7px solid #0000;
      border-bottom-color: #fff; }

.vega-embed-wrapper {
  max-width: 100%;
  overflow: scroll;
  padding-right: 14px; }

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.6); }
  to {
    opacity: 1;
    transform: scale(1); } }
`;

    // polyfill for IE
    if (!String.prototype.startsWith) {
        // eslint-disable-next-line no-extend-native,func-names
        String.prototype.startsWith = function (search, pos) {
            return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
        };
    }
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

    var _a, _b;
    const vega = vegaImport;
    let vegaLite = vegaLiteImport;
    // For backwards compatibility with Vega-Lite before v4.
    const w = (typeof window !== 'undefined' ? window : undefined);
    if (vegaLite === undefined && ((_b = (_a = w) === null || _a === void 0 ? void 0 : _a['vl']) === null || _b === void 0 ? void 0 : _b.compile)) {
        vegaLite = w['vl'];
    }
    const DEFAULT_ACTIONS = { export: { svg: true, png: true }, source: true, compiled: true, editor: true };
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
        vega: (vgSpec) => vgSpec,
        'vega-lite': (vlSpec, config) => vegaLite.compile(vlSpec, { config: config }).spec
    };
    const SVG_CIRCLES = `
<svg viewBox="0 0 16 16" fill="currentColor" stroke="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
  <circle r="2" cy="8" cx="2"></circle>
  <circle r="2" cy="8" cx="8"></circle>
  <circle r="2" cy="8" cx="14"></circle>
</svg>`;
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
        var _a;
        // Decide mode
        if (spec.$schema) {
            const parsed = schemaParser(spec.$schema);
            if (providedMode && providedMode !== parsed.library) {
                console.warn(`The given visualization spec is written in ${NAMES[parsed.library]}, but mode argument sets ${_a = NAMES[providedMode], (_a !== null && _a !== void 0 ? _a : providedMode)}.`);
            }
            const mode = parsed.library;
            if (!semver_32(VERSION[mode], `^${parsed.version.slice(1)}`)) {
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
        return (providedMode !== null && providedMode !== void 0 ? providedMode : 'vega');
    }
    function isLoader(o) {
        return !!(o && 'load' in o);
    }
    /**
     * Embed a Vega visualization component in a web page. This function returns a promise.
     *
     * @param el        DOM element in which to place component (DOM node or CSS selector).
     * @param spec      String : A URL string from which to load the Vega specification.
     *                  Object : The Vega/Vega-Lite specification as a parsed JSON object.
     * @param opts       A JavaScript object containing options for embedding.
     */
    function embed(el, spec, opts = {}) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const loader = isLoader(opts.loader) ? opts.loader : vega.loader(opts.loader);
            // load spec, config, and patch that are references by URLs
            const parsedSpec = isString(spec) ? JSON.parse(yield loader.load(spec)) : spec;
            const usermetaOpts = yield loadOpts((_a = (parsedSpec.usermeta && parsedSpec.usermeta['embedOptions']), (_a !== null && _a !== void 0 ? _a : {})), loader);
            const parsedOpts = yield loadOpts(opts, loader);
            const mergedOpts = Object.assign(Object.assign({}, mergeDeep(parsedOpts, usermetaOpts)), { config: mergeConfig((_b = parsedOpts.config, (_b !== null && _b !== void 0 ? _b : {})), (_c = usermetaOpts.config, (_c !== null && _c !== void 0 ? _c : {}))) });
            return yield _embed(el, parsedSpec, mergedOpts, loader);
        });
    }
    function loadOpts(opt, loader) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const config = isString(opt.config) ? JSON.parse(yield loader.load(opt.config)) : (_a = opt.config, (_a !== null && _a !== void 0 ? _a : {}));
            const patch = isString(opt.patch) ? JSON.parse(yield loader.load(opt.patch)) : opt.patch;
            return Object.assign(Object.assign(Object.assign({}, opt), (patch ? { patch } : {})), (config ? { config } : {}));
        });
    }
    function _embed(el, spec, opts = {}, loader) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            const config = opts.theme ? mergeConfig(themes[opts.theme], (_a = opts.config, (_a !== null && _a !== void 0 ? _a : {}))) : opts.config;
            const actions = isBoolean(opts.actions) ? opts.actions : mergeDeep({}, DEFAULT_ACTIONS, (_b = opts.actions, (_b !== null && _b !== void 0 ? _b : {})));
            const i18n = Object.assign(Object.assign({}, I18N), opts.i18n);
            const renderer = (_c = opts.renderer, (_c !== null && _c !== void 0 ? _c : 'canvas'));
            const logLevel = (_d = opts.logLevel, (_d !== null && _d !== void 0 ? _d : vega.Warn));
            const downloadFileName = (_e = opts.downloadFileName, (_e !== null && _e !== void 0 ? _e : 'visualization'));
            if (opts.defaultStyle !== false) {
                // Add a default stylesheet to the head of the document.
                const ID = 'vega-embed-style';
                if (!document.getElementById(ID)) {
                    const style = document.createElement('style');
                    style.id = ID;
                    style.innerText =
                        opts.defaultStyle === undefined || opts.defaultStyle === true
                            ? (( embedStyle )).toString()
                            : opts.defaultStyle;
                    document.head.appendChild(style);
                }
            }
            const mode = guessMode(spec, opts.mode);
            let vgSpec = PREPROCESSOR[mode](spec, config);
            if (mode === 'vega-lite') {
                if (vgSpec.$schema) {
                    const parsed = schemaParser(vgSpec.$schema);
                    if (!semver_32(VERSION.vega, `^${parsed.version.slice(1)}`)) {
                        console.warn(`The compiled spec uses Vega ${parsed.version}, but current version is v${VERSION.vega}.`);
                    }
                }
            }
            const div = typeof el === 'string' ? document.querySelector(el) : el;
            if (!div) {
                throw Error(`${el} does not exist`);
            }
            div.classList.add('vega-embed');
            if (actions) {
                div.classList.add('has-actions');
            }
            div.innerHTML = ''; // clear container
            const patch = opts.patch;
            if (patch) {
                if (patch instanceof Function) {
                    vgSpec = patch(vgSpec);
                }
                else {
                    vgSpec = applyPatch(vgSpec, patch, true, false).newDocument;
                }
            }
            // Set locale. Note that this is a global setting.
            if (opts.formatLocale) {
                vega.formatLocale(opts.formatLocale);
            }
            if (opts.timeFormatLocale) {
                vega.timeFormatLocale(opts.timeFormatLocale);
            }
            // Do not apply the config to Vega when we have already applied it to Vega-Lite.
            // This call may throw an Error if parsing fails.
            const runtime = vega.parse(vgSpec, mode === 'vega-lite' ? {} : config);
            const view = new vega.View(runtime, {
                loader,
                logLevel,
                renderer
            });
            if (opts.tooltip !== false) {
                let handler;
                if (isTooltipHandler(opts.tooltip)) {
                    handler = opts.tooltip;
                }
                else {
                    // user provided boolean true or tooltip options
                    handler = new Handler(opts.tooltip === true ? {} : opts.tooltip).call;
                }
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
                if (opts.width) {
                    view.width(opts.width);
                }
                if (opts.height) {
                    view.height(opts.height);
                }
                if (opts.padding) {
                    view.padding(opts.padding);
                }
            }
            yield view.initialize(el).runAsync();
            let documentClickHandler;
            if (actions !== false) {
                let wrapper = div;
                if (opts.defaultStyle !== false) {
                    const details = document.createElement('details');
                    details.title = i18n.CLICK_TO_VIEW_ACTIONS;
                    div.append(details);
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
                            exportLink.text = i18nExportAction;
                            exportLink.href = '#';
                            exportLink.target = '_blank';
                            exportLink.download = `${downloadFileName}.${ext}`;
                            exportLink.addEventListener('mousedown', function (e) {
                                return __awaiter(this, void 0, void 0, function* () {
                                    e.preventDefault();
                                    const url = yield view.toImageURL(ext, opts.scaleFactor);
                                    this.href = url;
                                });
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
                    viewSourceLink.addEventListener('mousedown', function (e) {
                        var _a, _b;
                        viewSource(jsonStringifyPrettyCompact(spec), (_a = opts.sourceHeader, (_a !== null && _a !== void 0 ? _a : '')), (_b = opts.sourceFooter, (_b !== null && _b !== void 0 ? _b : '')), mode);
                        e.preventDefault();
                    });
                    ctrl.append(viewSourceLink);
                }
                // add 'View Compiled' action
                if (mode === 'vega-lite' && (actions === true || actions.compiled !== false)) {
                    const compileLink = document.createElement('a');
                    compileLink.text = i18n.COMPILED_ACTION;
                    compileLink.href = '#';
                    compileLink.addEventListener('mousedown', function (e) {
                        var _a, _b;
                        viewSource(jsonStringifyPrettyCompact(vgSpec), (_a = opts.sourceHeader, (_a !== null && _a !== void 0 ? _a : '')), (_b = opts.sourceFooter, (_b !== null && _b !== void 0 ? _b : '')), 'vega');
                        e.preventDefault();
                    });
                    ctrl.append(compileLink);
                }
                // add 'Open in Vega Editor' action
                if (actions === true || actions.editor !== false) {
                    const editorUrl = (_f = opts.editorUrl, (_f !== null && _f !== void 0 ? _f : 'https://vega.github.io/editor/'));
                    const editorLink = document.createElement('a');
                    editorLink.text = i18n.EDITOR_ACTION;
                    editorLink.href = '#';
                    editorLink.addEventListener('mousedown', function (e) {
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
            return { view, spec, vgSpec, finalize };
        });
    }

    /**
     * Create a promise to an HTML Div element with an embedded Vega-Lite or Vega visualization.
     * The element has a value property with the view. By default all actions except for the editor action are disabled.
     *
     * The main use case is in [Observable](https://observablehq.com/).
     */
    function container (spec, opt = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const wrapper = document.createElement('div');
            wrapper.classList.add('vega-embed-wrapper');
            const div = document.createElement('div');
            wrapper.appendChild(div);
            const actions = opt.actions === true || opt.actions === false
                ? opt.actions
                : Object.assign({ export: true, source: false, compiled: true, editor: true }, (_a = opt.actions, (_a !== null && _a !== void 0 ? _a : {})));
            const result = yield embed(div, spec, Object.assign({ actions }, ((opt !== null && opt !== void 0 ? opt : {}))));
            wrapper.value = result.view;
            return wrapper;
        });
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
    wrapper.vl = vegaLite; // backwards compatbility
    wrapper.container = container;
    wrapper.embed = embed;
    wrapper.vega = vega;
    wrapper.default = embed;
    wrapper.version = pkg.version;

    return wrapper;

})));
//# sourceMappingURL=vega-embed.js.map
