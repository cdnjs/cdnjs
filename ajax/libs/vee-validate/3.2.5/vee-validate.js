/**
  * vee-validate v3.2.5
  * (c) 2020 Abdelrahman Awad
  * @license MIT
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = global || self, factory(global.VeeValidate = {}, global.Vue));
}(this, (function (exports, Vue) { 'use strict';

    Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

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

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    function isNaN(value) {
        // NaN is the one value that does not equal itself.
        // eslint-disable-next-line
        return value !== value;
    }
    function isNullOrUndefined(value) {
        return value === null || value === undefined;
    }
    function isEmptyArray(arr) {
        return Array.isArray(arr) && arr.length === 0;
    }
    var isObject = function (obj) {
        return obj !== null && obj && typeof obj === 'object' && !Array.isArray(obj);
    };
    /**
     * Shallow object comparison.
     */
    function isEqual(lhs, rhs) {
        if (lhs instanceof RegExp && rhs instanceof RegExp) {
            return isEqual(lhs.source, rhs.source) && isEqual(lhs.flags, rhs.flags);
        }
        if (Array.isArray(lhs) && Array.isArray(rhs)) {
            if (lhs.length !== rhs.length)
                return false;
            for (var i = 0; i < lhs.length; i++) {
                if (!isEqual(lhs[i], rhs[i])) {
                    return false;
                }
            }
            return true;
        }
        // if both are objects, compare each key recursively.
        if (isObject(lhs) && isObject(rhs)) {
            return (Object.keys(lhs).every(function (key) {
                return isEqual(lhs[key], rhs[key]);
            }) &&
                Object.keys(rhs).every(function (key) {
                    return isEqual(lhs[key], rhs[key]);
                }));
        }
        if (isNaN(lhs) && isNaN(rhs)) {
            return true;
        }
        return lhs === rhs;
    }
    // Checks if a given value is not an empty string or null or undefined.
    function isSpecified(val) {
        if (val === '') {
            return false;
        }
        return !isNullOrUndefined(val);
    }
    function isCallable(fn) {
        return typeof fn === 'function';
    }
    function isLocator(value) {
        return isCallable(value) && !!value.__locatorRef;
    }

    function findIndex(arrayLike, predicate) {
        var array = Array.isArray(arrayLike) ? arrayLike : toArray(arrayLike);
        if (isCallable(array.findIndex)) {
            return array.findIndex(predicate);
        }
        /* istanbul ignore next */
        for (var i = 0; i < array.length; i++) {
            if (predicate(array[i], i)) {
                return i;
            }
        }
        /* istanbul ignore next */
        return -1;
    }
    /**
     * finds the first element that satisfies the predicate callback, polyfills array.find
     */
    function find(arrayLike, predicate) {
        var array = Array.isArray(arrayLike) ? arrayLike : toArray(arrayLike);
        var idx = findIndex(array, predicate);
        return idx === -1 ? undefined : array[idx];
    }
    function includes(collection, item) {
        return collection.indexOf(item) !== -1;
    }
    /**
     * Converts an array-like object to array, provides a simple polyfill for Array.from
     */
    function toArray(arrayLike) {
        if (isCallable(Array.from)) {
            return Array.from(arrayLike);
        }
        /* istanbul ignore next */
        return _copyArray(arrayLike);
    }
    /* istanbul ignore next */
    function _copyArray(arrayLike) {
        var array = [];
        var length = arrayLike.length;
        for (var i = 0; i < length; i++) {
            array.push(arrayLike[i]);
        }
        return array;
    }
    function values(obj) {
        if (isCallable(Object.values)) {
            return Object.values(obj);
        }
        // fallback to keys()
        /* istanbul ignore next */
        return Object.keys(obj).map(function (k) { return obj[k]; });
    }
    function merge(target, source) {
        Object.keys(source).forEach(function (key) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    target[key] = {};
                }
                merge(target[key], source[key]);
                return;
            }
            target[key] = source[key];
        });
        return target;
    }

    function createFlags() {
        return {
            untouched: true,
            touched: false,
            dirty: false,
            pristine: true,
            valid: false,
            invalid: false,
            validated: false,
            pending: false,
            required: false,
            changed: false,
            passed: false,
            failed: false
        };
    }

    function identity(x) {
        return x;
    }
    function debounce(fn, wait, token) {
        if (wait === void 0) { wait = 0; }
        if (token === void 0) { token = { cancelled: false }; }
        if (wait === 0) {
            return fn;
        }
        var timeout;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var later = function () {
                timeout = undefined;
                // check if the fn call was cancelled.
                if (!token.cancelled)
                    fn.apply(void 0, args);
            };
            // because we might want to use Node.js setTimout for SSR.
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Emits a warning to the console
     */
    function warn(message) {
        console.warn("[vee-validate] " + message);
    }
    /**
     * Replaces placeholder values in a string with their actual values
     */
    function interpolate(template, values) {
        return template.replace(/{([^}]+)}/g, function (_, p) {
            return p in values ? values[p] : "{" + p + "}";
        });
    }

    var RULES = {};
    function normalizeSchema(schema) {
        var _a;
        if ((_a = schema.params) === null || _a === void 0 ? void 0 : _a.length) {
            schema.params = schema.params.map(function (param) {
                if (typeof param === 'string') {
                    return { name: param };
                }
                return param;
            });
        }
        return schema;
    }
    var RuleContainer = /** @class */ (function () {
        function RuleContainer() {
        }
        RuleContainer.extend = function (name, schema) {
            // if rule already exists, overwrite it.
            var rule = normalizeSchema(schema);
            if (RULES[name]) {
                RULES[name] = merge(RULES[name], schema);
                return;
            }
            RULES[name] = __assign({ lazy: false, computesRequired: false }, rule);
        };
        RuleContainer.isLazy = function (name) {
            var _a;
            return !!((_a = RULES[name]) === null || _a === void 0 ? void 0 : _a.lazy);
        };
        RuleContainer.isRequireRule = function (name) {
            var _a;
            return !!((_a = RULES[name]) === null || _a === void 0 ? void 0 : _a.computesRequired);
        };
        RuleContainer.getRuleDefinition = function (ruleName) {
            return RULES[ruleName];
        };
        return RuleContainer;
    }());
    /**
     * Adds a custom validator to the list of validation rules.
     */
    function extend(name, schema) {
        // makes sure new rules are properly formatted.
        guardExtend(name, schema);
        // Full schema object.
        if (typeof schema === 'object') {
            RuleContainer.extend(name, schema);
            return;
        }
        RuleContainer.extend(name, {
            validate: schema
        });
    }
    /**
     * Guards from extension violations.
     */
    function guardExtend(name, validator) {
        if (isCallable(validator)) {
            return;
        }
        if (isCallable(validator.validate)) {
            return;
        }
        if (RuleContainer.getRuleDefinition(name)) {
            return;
        }
        throw new Error("Extension Error: The validator '" + name + "' must be a function or have a 'validate' method.");
    }

    var DEFAULT_CONFIG = {
        defaultMessage: "{_field_} is not valid.",
        skipOptional: true,
        classes: {
            touched: 'touched',
            untouched: 'untouched',
            valid: 'valid',
            invalid: 'invalid',
            pristine: 'pristine',
            dirty: 'dirty' // control has been interacted with
        },
        bails: true,
        mode: 'aggressive',
        useConstraintAttrs: true
    };
    var currentConfig = __assign({}, DEFAULT_CONFIG);
    var getConfig = function () { return currentConfig; };
    var setConfig = function (newConf) {
        currentConfig = __assign(__assign({}, currentConfig), newConf);
    };
    var configure = function (cfg) {
        setConfig(cfg);
    };

    /**
     * Normalizes the given rules expression.
     */
    function normalizeRules(rules) {
        // if falsy value return an empty object.
        var acc = {};
        Object.defineProperty(acc, '_$$isNormalized', {
            value: true,
            writable: false,
            enumerable: false,
            configurable: false
        });
        if (!rules) {
            return acc;
        }
        // Object is already normalized, skip.
        if (isObject(rules) && rules._$$isNormalized) {
            return rules;
        }
        if (isObject(rules)) {
            return Object.keys(rules).reduce(function (prev, curr) {
                var params = [];
                if (rules[curr] === true) {
                    params = [];
                }
                else if (Array.isArray(rules[curr])) {
                    params = rules[curr];
                }
                else if (isObject(rules[curr])) {
                    params = rules[curr];
                }
                else {
                    params = [rules[curr]];
                }
                if (rules[curr] !== false) {
                    prev[curr] = buildParams(curr, params);
                }
                return prev;
            }, acc);
        }
        /* istanbul ignore if */
        if (typeof rules !== 'string') {
            warn('rules must be either a string or an object.');
            return acc;
        }
        return rules.split('|').reduce(function (prev, rule) {
            var parsedRule = parseRule(rule);
            if (!parsedRule.name) {
                return prev;
            }
            prev[parsedRule.name] = buildParams(parsedRule.name, parsedRule.params);
            return prev;
        }, acc);
    }
    function buildParams(ruleName, provided) {
        var ruleSchema = RuleContainer.getRuleDefinition(ruleName);
        if (!ruleSchema) {
            return provided;
        }
        var params = {};
        if (!ruleSchema.params && !Array.isArray(provided)) {
            throw new Error('You provided an object params to a rule that has no defined schema.');
        }
        // Rule probably uses an array for their args, keep it as is.
        if (Array.isArray(provided) && !ruleSchema.params) {
            return provided;
        }
        var definedParams;
        // collect the params schema.
        if (!ruleSchema.params || (ruleSchema.params.length < provided.length && Array.isArray(provided))) {
            var lastDefinedParam_1;
            // collect any additional parameters in the last item.
            definedParams = provided.map(function (_, idx) {
                var _a;
                var param = (_a = ruleSchema.params) === null || _a === void 0 ? void 0 : _a[idx];
                lastDefinedParam_1 = param || lastDefinedParam_1;
                if (!param) {
                    param = lastDefinedParam_1;
                }
                return param;
            });
        }
        else {
            definedParams = ruleSchema.params;
        }
        // Match the provided array length with a temporary schema.
        for (var i = 0; i < definedParams.length; i++) {
            var options = definedParams[i];
            var value = options.default;
            // if the provided is an array, map element value.
            if (Array.isArray(provided)) {
                if (i in provided) {
                    value = provided[i];
                }
            }
            else {
                // If the param exists in the provided object.
                if (options.name in provided) {
                    value = provided[options.name];
                    // if the provided is the first param value.
                }
                else if (definedParams.length === 1) {
                    value = provided;
                }
            }
            // if the param is a target, resolve the target value.
            if (options.isTarget) {
                value = createLocator(value, options.cast);
            }
            // A target param using interpolation
            if (typeof value === 'string' && value[0] === '@') {
                value = createLocator(value.slice(1), options.cast);
            }
            // If there is a transformer defined.
            if (!isLocator(value) && options.cast) {
                value = options.cast(value);
            }
            // already been set, probably multiple values.
            if (params[options.name]) {
                params[options.name] = Array.isArray(params[options.name]) ? params[options.name] : [params[options.name]];
                params[options.name].push(value);
            }
            else {
                // set the value.
                params[options.name] = value;
            }
        }
        return params;
    }
    /**
     * Parses a rule string expression.
     */
    var parseRule = function (rule) {
        var params = [];
        var name = rule.split(':')[0];
        if (includes(rule, ':')) {
            params = rule
                .split(':')
                .slice(1)
                .join(':')
                .split(',');
        }
        return { name: name, params: params };
    };
    function createLocator(value, castFn) {
        var locator = function (crossTable) {
            var val = crossTable[value];
            return castFn ? castFn(val) : val;
        };
        locator.__locatorRef = value;
        return locator;
    }
    function extractLocators(params) {
        if (Array.isArray(params)) {
            return params.filter(isLocator);
        }
        return Object.keys(params)
            .filter(function (key) { return isLocator(params[key]); })
            .map(function (key) { return params[key]; });
    }

    /**
     * Validates a value against the rules.
     */
    function validate(value, rules, options) {
        if (options === void 0) { options = {}; }
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var shouldBail, skipIfEmpty, field, result, errors, failedRules, regenerateMap;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        shouldBail = (_a = options) === null || _a === void 0 ? void 0 : _a.bails;
                        skipIfEmpty = (_b = options) === null || _b === void 0 ? void 0 : _b.skipIfEmpty;
                        field = {
                            name: ((_c = options) === null || _c === void 0 ? void 0 : _c.name) || '{field}',
                            rules: normalizeRules(rules),
                            bails: (shouldBail !== null && shouldBail !== void 0 ? shouldBail : true),
                            skipIfEmpty: (skipIfEmpty !== null && skipIfEmpty !== void 0 ? skipIfEmpty : true),
                            forceRequired: false,
                            crossTable: ((_d = options) === null || _d === void 0 ? void 0 : _d.values) || {},
                            names: ((_e = options) === null || _e === void 0 ? void 0 : _e.names) || {},
                            customMessages: ((_f = options) === null || _f === void 0 ? void 0 : _f.customMessages) || {}
                        };
                        return [4 /*yield*/, _validate(field, value, options)];
                    case 1:
                        result = _g.sent();
                        errors = [];
                        failedRules = {};
                        regenerateMap = {};
                        result.errors.forEach(function (e) {
                            var msg = e.msg();
                            errors.push(msg);
                            failedRules[e.rule] = msg;
                            regenerateMap[e.rule] = e.msg;
                        });
                        return [2 /*return*/, {
                                valid: result.valid,
                                errors: errors,
                                failedRules: failedRules,
                                regenerateMap: regenerateMap
                            }];
                }
            });
        });
    }
    /**
     * Starts the validation process.
     */
    function _validate(field, value, _a) {
        var _b = (_a === void 0 ? {} : _a).isInitial, isInitial = _b === void 0 ? false : _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, shouldSkip, errors, rules, length, i, rule, result;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, _shouldSkip(field, value)];
                    case 1:
                        _c = _d.sent(), shouldSkip = _c.shouldSkip, errors = _c.errors;
                        if (shouldSkip) {
                            return [2 /*return*/, {
                                    valid: !errors.length,
                                    errors: errors
                                }];
                        }
                        rules = Object.keys(field.rules).filter(function (rule) { return !RuleContainer.isRequireRule(rule); });
                        length = rules.length;
                        i = 0;
                        _d.label = 2;
                    case 2:
                        if (!(i < length)) return [3 /*break*/, 5];
                        if (isInitial && RuleContainer.isLazy(rules[i])) {
                            return [3 /*break*/, 4];
                        }
                        rule = rules[i];
                        return [4 /*yield*/, _test(field, value, {
                                name: rule,
                                params: field.rules[rule]
                            })];
                    case 3:
                        result = _d.sent();
                        if (!result.valid && result.error) {
                            errors.push(result.error);
                            if (field.bails) {
                                return [2 /*return*/, {
                                        valid: false,
                                        errors: errors
                                    }];
                            }
                        }
                        _d.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, {
                            valid: !errors.length,
                            errors: errors
                        }];
                }
            });
        });
    }
    function _shouldSkip(field, value) {
        return __awaiter(this, void 0, void 0, function () {
            var requireRules, length, errors, isEmpty, isEmptyAndOptional, isRequired, i, rule, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requireRules = Object.keys(field.rules).filter(RuleContainer.isRequireRule);
                        length = requireRules.length;
                        errors = [];
                        isEmpty = isNullOrUndefined(value) || value === '' || isEmptyArray(value);
                        isEmptyAndOptional = isEmpty && field.skipIfEmpty;
                        isRequired = false;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < length)) return [3 /*break*/, 4];
                        rule = requireRules[i];
                        return [4 /*yield*/, _test(field, value, {
                                name: rule,
                                params: field.rules[rule]
                            })];
                    case 2:
                        result = _a.sent();
                        if (!isObject(result)) {
                            throw new Error('Require rules has to return an object (see docs)');
                        }
                        if (result.required) {
                            isRequired = true;
                        }
                        if (!result.valid && result.error) {
                            errors.push(result.error);
                            // Exit early as the field is required and failed validation.
                            if (field.bails) {
                                return [2 /*return*/, {
                                        shouldSkip: true,
                                        errors: errors
                                    }];
                            }
                        }
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (isEmpty && !isRequired && !field.skipIfEmpty) {
                            return [2 /*return*/, {
                                    shouldSkip: false,
                                    errors: errors
                                }];
                        }
                        // field is configured to run through the pipeline regardless
                        if (!field.bails && !isEmptyAndOptional) {
                            return [2 /*return*/, {
                                    shouldSkip: false,
                                    errors: errors
                                }];
                        }
                        // skip if the field is not required and has an empty value.
                        return [2 /*return*/, {
                                shouldSkip: !isRequired && isEmpty,
                                errors: errors
                            }];
                }
            });
        });
    }
    /**
     * Tests a single input value against a rule.
     */
    function _test(field, value, rule) {
        return __awaiter(this, void 0, void 0, function () {
            var ruleSchema, normalizedValue, params, result, values_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ruleSchema = RuleContainer.getRuleDefinition(rule.name);
                        if (!ruleSchema || !ruleSchema.validate) {
                            throw new Error("No such validator '" + rule.name + "' exists.");
                        }
                        normalizedValue = ruleSchema.castValue ? ruleSchema.castValue(value) : value;
                        params = fillTargetValues(rule.params, field.crossTable);
                        return [4 /*yield*/, ruleSchema.validate(normalizedValue, params)];
                    case 1:
                        result = _a.sent();
                        if (typeof result === 'string') {
                            values_1 = __assign(__assign({}, (params || {})), { _field_: field.name, _value_: value, _rule_: rule.name });
                            return [2 /*return*/, {
                                    valid: false,
                                    error: { rule: rule.name, msg: function () { return interpolate(result, values_1); } }
                                }];
                        }
                        if (!isObject(result)) {
                            result = { valid: result };
                        }
                        return [2 /*return*/, {
                                valid: result.valid,
                                required: result.required,
                                error: result.valid ? undefined : _generateFieldError(field, value, ruleSchema, rule.name, params)
                            }];
                }
            });
        });
    }
    /**
     * Generates error messages.
     */
    function _generateFieldError(field, value, ruleSchema, ruleName, params) {
        var _a;
        var message = (_a = field.customMessages[ruleName], (_a !== null && _a !== void 0 ? _a : ruleSchema.message));
        var ruleTargets = _getRuleTargets(field, ruleSchema, ruleName);
        var _b = _getUserTargets(field, ruleSchema, ruleName, message), userTargets = _b.userTargets, userMessage = _b.userMessage;
        var values = __assign(__assign(__assign(__assign({}, (params || {})), { _field_: field.name, _value_: value, _rule_: ruleName }), ruleTargets), userTargets);
        return {
            msg: function () { return _normalizeMessage(userMessage || getConfig().defaultMessage, field.name, values); },
            rule: ruleName
        };
    }
    function _getRuleTargets(field, ruleSchema, ruleName) {
        var params = ruleSchema.params;
        if (!params) {
            return {};
        }
        var numTargets = params.filter(function (param) { return param.isTarget; }).length;
        if (numTargets <= 0) {
            return {};
        }
        var names = {};
        var ruleConfig = field.rules[ruleName];
        if (!Array.isArray(ruleConfig) && isObject(ruleConfig)) {
            ruleConfig = params.map(function (param) {
                return ruleConfig[param.name];
            });
        }
        for (var index = 0; index < params.length; index++) {
            var param = params[index];
            var key = ruleConfig[index];
            if (!isLocator(key)) {
                continue;
            }
            key = key.__locatorRef;
            var name_1 = field.names[key] || key;
            names[param.name] = name_1;
            names["_" + param.name + "_"] = field.crossTable[key];
        }
        return names;
    }
    function _getUserTargets(field, ruleSchema, ruleName, userMessage) {
        var userTargets = {};
        var rules = field.rules[ruleName];
        var params = ruleSchema.params || [];
        // early return if no rules
        if (!rules) {
            return {};
        }
        // check all rules to convert targets
        Object.keys(rules).forEach(function (key, index) {
            // get the rule
            var rule = rules[key];
            if (!isLocator(rule)) {
                return {};
            }
            // get associated parameter
            var param = params[index];
            if (!param) {
                return {};
            }
            // grab the name of the target
            var name = rule.__locatorRef;
            userTargets[param.name] = field.names[name] || name;
            userTargets["_" + param.name + "_"] = field.crossTable[name];
        });
        return {
            userTargets: userTargets,
            userMessage: userMessage
        };
    }
    function _normalizeMessage(template, field, values) {
        if (typeof template === 'function') {
            return template(field, values);
        }
        return interpolate(template, __assign(__assign({}, values), { _field_: field }));
    }
    function fillTargetValues(params, crossTable) {
        if (Array.isArray(params)) {
            return params;
        }
        var values = {};
        var normalize = function (value) {
            if (isLocator(value)) {
                return value(crossTable);
            }
            return value;
        };
        Object.keys(params).forEach(function (param) {
            values[param] = normalize(params[param]);
        });
        return values;
    }

    var aggressive = function () { return ({
        on: ['input', 'blur']
    }); };
    var lazy = function () { return ({
        on: ['change']
    }); };
    var eager = function (_a) {
        var errors = _a.errors;
        if (errors.length) {
            return {
                on: ['input', 'change']
            };
        }
        return {
            on: ['change', 'blur']
        };
    };
    var passive = function () { return ({
        on: []
    }); };
    var modes = {
        aggressive: aggressive,
        eager: eager,
        passive: passive,
        lazy: lazy
    };
    var setInteractionMode = function (mode, implementation) {
        setConfig({ mode: mode });
        if (!implementation) {
            return;
        }
        if (!isCallable(implementation)) {
            throw new Error('A mode implementation must be a function');
        }
        modes[mode] = implementation;
    };

    var EVENT_BUS = new Vue();
    function localeChanged() {
        EVENT_BUS.$emit('change:locale');
    }

    var Dictionary = /** @class */ (function () {
        function Dictionary(locale, dictionary) {
            this.container = {};
            this.locale = locale;
            this.merge(dictionary);
        }
        Dictionary.prototype.resolve = function (field, rule, values) {
            return this.format(this.locale, field, rule, values);
        };
        Dictionary.prototype.format = function (locale, field, rule, values) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            var message;
            // find if specific message for that field was specified.
            message = ((_c = (_b = (_a = this.container[locale]) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b[field]) === null || _c === void 0 ? void 0 : _c[rule]) || ((_e = (_d = this.container[locale]) === null || _d === void 0 ? void 0 : _d.messages) === null || _e === void 0 ? void 0 : _e[rule]);
            if (!message) {
                message = '{field} is not valid';
            }
            field = (_h = (_g = (_f = this.container[locale]) === null || _f === void 0 ? void 0 : _f.names) === null || _g === void 0 ? void 0 : _g[field], (_h !== null && _h !== void 0 ? _h : field));
            return isCallable(message) ? message(field, values) : interpolate(message, __assign(__assign({}, values), { _field_: field }));
        };
        Dictionary.prototype.merge = function (dictionary) {
            merge(this.container, dictionary);
        };
        Dictionary.prototype.hasRule = function (name) {
            var _a, _b;
            return !!((_b = (_a = this.container[this.locale]) === null || _a === void 0 ? void 0 : _a.messages) === null || _b === void 0 ? void 0 : _b[name]);
        };
        return Dictionary;
    }());
    var DICTIONARY;
    function localize(locale, dictionary) {
        var _a;
        if (!DICTIONARY) {
            DICTIONARY = new Dictionary('en', {});
            setConfig({
                defaultMessage: function (field, values) {
                    var _a;
                    return DICTIONARY.resolve(field, (_a = values) === null || _a === void 0 ? void 0 : _a._rule_, values || {});
                }
            });
        }
        if (typeof locale === 'string') {
            DICTIONARY.locale = locale;
            if (dictionary) {
                DICTIONARY.merge((_a = {}, _a[locale] = dictionary, _a));
            }
            localeChanged();
            return;
        }
        DICTIONARY.merge(locale);
    }

    var isEvent = function (evt) {
        if (!evt) {
            return false;
        }
        if (typeof Event !== 'undefined' && isCallable(Event) && evt instanceof Event) {
            return true;
        }
        // this is for IE
        /* istanbul ignore next */
        if (evt && evt.srcElement) {
            return true;
        }
        return false;
    };
    function normalizeEventValue(value) {
        var _a, _b;
        if (!isEvent(value)) {
            return value;
        }
        var input = value.target;
        if (input.type === 'file' && input.files) {
            return toArray(input.files);
        }
        // If the input has a `v-model.number` modifier applied.
        if ((_a = input._vModifiers) === null || _a === void 0 ? void 0 : _a.number) {
            // as per the spec the v-model.number uses parseFloat
            var valueAsNumber = parseFloat(input.value);
            if (isNaN(valueAsNumber)) {
                return input.value;
            }
            return valueAsNumber;
        }
        if ((_b = input._vModifiers) === null || _b === void 0 ? void 0 : _b.trim) {
            var trimmedValue = typeof input.value === 'string' ? input.value.trim() : input.value;
            return trimmedValue;
        }
        return input.value;
    }

    var isTextInput = function (vnode) {
        var _a, _b;
        var attrs = ((_a = vnode.data) === null || _a === void 0 ? void 0 : _a.attrs) || vnode.elm;
        // it will fallback to being a text input per browsers spec.
        if (vnode.tag === 'input' && (!attrs || !attrs.type)) {
            return true;
        }
        if (vnode.tag === 'textarea') {
            return true;
        }
        return includes(['text', 'password', 'search', 'email', 'tel', 'url', 'number'], (_b = attrs) === null || _b === void 0 ? void 0 : _b.type);
    };
    // export const isCheckboxOrRadioInput = (vnode: VNode): boolean => {
    //   const attrs = (vnode.data && vnode.data.attrs) || vnode.elm;
    //   return includes(['radio', 'checkbox'], attrs && attrs.type);
    // };
    // Gets the model object on the vnode.
    function findModel(vnode) {
        if (!vnode.data) {
            return undefined;
        }
        // Component Model
        // THIS IS NOT TYPED IN OFFICIAL VUE TYPINGS
        // eslint-disable-next-line
        var nonStandardVNodeData = vnode.data;
        if ('model' in nonStandardVNodeData) {
            return nonStandardVNodeData.model;
        }
        if (!vnode.data.directives) {
            return undefined;
        }
        return find(vnode.data.directives, function (d) { return d.name === 'model'; });
    }
    function findValue(vnode) {
        var _a, _b, _c;
        var model = findModel(vnode);
        if (model) {
            return { value: model.value };
        }
        var config = findModelConfig(vnode);
        var prop = ((_a = config) === null || _a === void 0 ? void 0 : _a.prop) || 'value';
        if (((_b = vnode.componentOptions) === null || _b === void 0 ? void 0 : _b.propsData) && prop in vnode.componentOptions.propsData) {
            var propsDataWithValue = vnode.componentOptions.propsData;
            return { value: propsDataWithValue[prop] };
        }
        if (((_c = vnode.data) === null || _c === void 0 ? void 0 : _c.domProps) && 'value' in vnode.data.domProps) {
            return { value: vnode.data.domProps.value };
        }
        return undefined;
    }
    function extractChildren(vnode) {
        if (Array.isArray(vnode)) {
            return vnode;
        }
        if (Array.isArray(vnode.children)) {
            return vnode.children;
        }
        /* istanbul ignore next */
        if (vnode.componentOptions && Array.isArray(vnode.componentOptions.children)) {
            return vnode.componentOptions.children;
        }
        return [];
    }
    function extractVNodes(vnode) {
        if (!Array.isArray(vnode) && findValue(vnode) !== undefined) {
            return [vnode];
        }
        var children = extractChildren(vnode);
        return children.reduce(function (nodes, node) {
            var candidates = extractVNodes(node);
            if (candidates.length) {
                nodes.push.apply(nodes, candidates);
            }
            return nodes;
        }, []);
    }
    // Resolves v-model config if exists.
    function findModelConfig(vnode) {
        /* istanbul ignore next */
        if (!vnode.componentOptions)
            return null;
        // This is also not typed in the standard Vue TS.
        return vnode.componentOptions.Ctor.options.model;
    }
    // Adds a listener to vnode listener object.
    function mergeVNodeListeners(obj, eventName, handler) {
        // no listener at all.
        if (isNullOrUndefined(obj[eventName])) {
            obj[eventName] = [handler];
            return;
        }
        // Is an invoker.
        if (isCallable(obj[eventName]) && obj[eventName].fns) {
            var invoker = obj[eventName];
            invoker.fns = Array.isArray(invoker.fns) ? invoker.fns : [invoker.fns];
            if (!includes(invoker.fns, handler)) {
                invoker.fns.push(handler);
            }
            return;
        }
        if (isCallable(obj[eventName])) {
            var prev = obj[eventName];
            obj[eventName] = [prev];
        }
        if (Array.isArray(obj[eventName]) && !includes(obj[eventName], handler)) {
            obj[eventName].push(handler);
        }
    }
    // Adds a listener to a native HTML vnode.
    function addNativeNodeListener(node, eventName, handler) {
        /* istanbul ignore next */
        if (!node.data) {
            node.data = {};
        }
        if (isNullOrUndefined(node.data.on)) {
            node.data.on = {};
        }
        mergeVNodeListeners(node.data.on, eventName, handler);
    }
    // Adds a listener to a Vue component vnode.
    function addComponentNodeListener(node, eventName, handler) {
        /* istanbul ignore next */
        if (!node.componentOptions) {
            return;
        }
        /* istanbul ignore next */
        if (!node.componentOptions.listeners) {
            node.componentOptions.listeners = {};
        }
        mergeVNodeListeners(node.componentOptions.listeners, eventName, handler);
    }
    function addVNodeListener(vnode, eventName, handler) {
        if (vnode.componentOptions) {
            addComponentNodeListener(vnode, eventName, handler);
            return;
        }
        addNativeNodeListener(vnode, eventName, handler);
    }
    // Determines if `change` should be used over `input` for listeners.
    function getInputEventName(vnode, model) {
        var _a, _b;
        // Is a component.
        if (vnode.componentOptions) {
            var event_1 = (findModelConfig(vnode) || { event: 'input' }).event;
            return event_1;
        }
        // Lazy Models typically use change event
        if ((_b = (_a = model) === null || _a === void 0 ? void 0 : _a.modifiers) === null || _b === void 0 ? void 0 : _b.lazy) {
            return 'change';
        }
        // is a textual-type input.
        if (isTextInput(vnode)) {
            return 'input';
        }
        return 'change';
    }
    function isHTMLNode(node) {
        return includes(['input', 'select', 'textarea'], node.tag);
    }
    // TODO: Type this one properly.
    function normalizeSlots(slots, ctx) {
        var acc = [];
        return Object.keys(slots).reduce(function (arr, key) {
            slots[key].forEach(function (vnode) {
                if (!vnode.context) {
                    slots[key].context = ctx;
                    if (!vnode.data) {
                        vnode.data = {};
                    }
                    vnode.data.slot = key;
                }
            });
            return arr.concat(slots[key]);
        }, acc);
    }
    function resolveTextualRules(vnode) {
        var _a;
        var attrs = (_a = vnode.data) === null || _a === void 0 ? void 0 : _a.attrs;
        var rules = {};
        if (!attrs)
            return rules;
        if (attrs.type === 'email' && RuleContainer.getRuleDefinition('email')) {
            rules.email = ['multiple' in attrs];
        }
        if (attrs.pattern && RuleContainer.getRuleDefinition('regex')) {
            rules.regex = attrs.pattern;
        }
        if (attrs.maxlength >= 0 && RuleContainer.getRuleDefinition('max')) {
            rules.max = attrs.maxlength;
        }
        if (attrs.minlength >= 0 && RuleContainer.getRuleDefinition('min')) {
            rules.min = attrs.minlength;
        }
        if (attrs.type === 'number') {
            if (isSpecified(attrs.min) && RuleContainer.getRuleDefinition('min_value')) {
                rules.min_value = Number(attrs.min);
            }
            if (isSpecified(attrs.max) && RuleContainer.getRuleDefinition('max_value')) {
                rules.max_value = Number(attrs.max);
            }
        }
        return rules;
    }
    function resolveRules(vnode) {
        var _a;
        var htmlTags = ['input', 'select', 'textarea'];
        var attrs = (_a = vnode.data) === null || _a === void 0 ? void 0 : _a.attrs;
        if (!includes(htmlTags, vnode.tag) || !attrs) {
            return {};
        }
        var rules = {};
        if ('required' in attrs && attrs.required !== false && RuleContainer.getRuleDefinition('required')) {
            rules.required = attrs.type === 'checkbox' ? [true] : true;
        }
        if (isTextInput(vnode)) {
            return normalizeRules(__assign(__assign({}, rules), resolveTextualRules(vnode)));
        }
        return normalizeRules(rules);
    }
    function normalizeChildren(context, slotProps) {
        if (context.$scopedSlots.default) {
            return context.$scopedSlots.default(slotProps) || [];
        }
        return context.$slots.default || [];
    }

    /**
     * Determines if a provider needs to run validation.
     */
    function shouldValidate(ctx, value) {
        // when an immediate/initial validation is needed and wasn't done before.
        if (!ctx._ignoreImmediate && ctx.immediate) {
            return true;
        }
        // when the value changes for whatever reason.
        if (ctx.value !== value && ctx.normalizedEvents.length) {
            return true;
        }
        // when it needs validation due to props/cross-fields changes.
        if (ctx._needsValidation) {
            return true;
        }
        // when the initial value is undefined and the field wasn't rendered yet.
        if (!ctx.initialized && value === undefined) {
            return true;
        }
        return false;
    }
    function createValidationCtx(ctx) {
        return __assign(__assign({}, ctx.flags), { errors: ctx.errors, classes: ctx.classes, failedRules: ctx.failedRules, reset: function () { return ctx.reset(); }, validate: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return ctx.validate.apply(ctx, args);
            }, ariaInput: {
                'aria-invalid': ctx.flags.invalid ? 'true' : 'false',
                'aria-required': ctx.isRequired ? 'true' : 'false',
                'aria-errormessage': "vee_" + ctx.id
            }, ariaMsg: {
                id: "vee_" + ctx.id,
                'aria-live': ctx.errors.length ? 'assertive' : 'off'
            } });
    }
    function onRenderUpdate(vm, value) {
        if (!vm.initialized) {
            vm.initialValue = value;
        }
        var validateNow = shouldValidate(vm, value);
        vm._needsValidation = false;
        vm.value = value;
        vm._ignoreImmediate = true;
        if (!validateNow) {
            return;
        }
        var validate = function () {
            if (vm.immediate || vm.flags.validated) {
                return triggerThreadSafeValidation(vm);
            }
            vm.validateSilent();
        };
        if (vm.initialized) {
            validate();
            return;
        }
        vm.$once('hook:mounted', function () { return validate(); });
    }
    function computeModeSetting(ctx) {
        var compute = (isCallable(ctx.mode) ? ctx.mode : modes[ctx.mode]);
        return compute(ctx);
    }
    function triggerThreadSafeValidation(vm) {
        var pendingPromise = vm.validateSilent();
        // avoids race conditions between successive validations.
        vm._pendingValidation = pendingPromise;
        return pendingPromise.then(function (result) {
            if (pendingPromise === vm._pendingValidation) {
                vm.applyResult(result);
                vm._pendingValidation = undefined;
            }
            return result;
        });
    }
    // Creates the common handlers for a validatable context.
    function createCommonHandlers(vm) {
        if (!vm.$veeOnInput) {
            vm.$veeOnInput = function (e) {
                vm.syncValue(e); // track and keep the value updated.
                vm.setFlags({ dirty: true, pristine: false });
            };
        }
        var onInput = vm.$veeOnInput;
        if (!vm.$veeOnBlur) {
            vm.$veeOnBlur = function () {
                vm.setFlags({ touched: true, untouched: false });
            };
        }
        // Blur event listener.
        var onBlur = vm.$veeOnBlur;
        var onValidate = vm.$veeHandler;
        var mode = computeModeSetting(vm);
        // Handle debounce changes.
        if (!onValidate || vm.$veeDebounce !== vm.debounce) {
            onValidate = debounce(function () {
                vm.$nextTick(function () {
                    if (!vm._pendingReset) {
                        triggerThreadSafeValidation(vm);
                    }
                    vm._pendingReset = false;
                });
            }, mode.debounce || vm.debounce);
            // Cache the handler so we don't create it each time.
            vm.$veeHandler = onValidate;
            // cache the debounce value so we detect if it was changed.
            vm.$veeDebounce = vm.debounce;
        }
        return { onInput: onInput, onBlur: onBlur, onValidate: onValidate };
    }
    // Adds all plugin listeners to the vnode.
    function addListeners(vm, node) {
        var _a;
        var value = findValue(node);
        // cache the input eventName.
        vm._inputEventName = vm._inputEventName || getInputEventName(node, findModel(node));
        onRenderUpdate(vm, (_a = value) === null || _a === void 0 ? void 0 : _a.value);
        var _b = createCommonHandlers(vm), onInput = _b.onInput, onBlur = _b.onBlur, onValidate = _b.onValidate;
        addVNodeListener(node, vm._inputEventName, onInput);
        addVNodeListener(node, 'blur', onBlur);
        // add the validation listeners.
        vm.normalizedEvents.forEach(function (evt) {
            addVNodeListener(node, evt, onValidate);
        });
        vm.initialized = true;
    }

    var PROVIDER_COUNTER = 0;
    function data() {
        var errors = [];
        var fieldName = '';
        var defaultValues = {
            errors: errors,
            value: undefined,
            initialized: false,
            initialValue: undefined,
            flags: createFlags(),
            failedRules: {},
            isActive: true,
            fieldName: fieldName,
            id: ''
        };
        return defaultValues;
    }
    var ValidationProvider = Vue.extend({
        inject: {
            $_veeObserver: {
                from: '$_veeObserver',
                default: function () {
                    if (!this.$vnode.context.$_veeObserver) {
                        this.$vnode.context.$_veeObserver = createObserver();
                    }
                    return this.$vnode.context.$_veeObserver;
                }
            }
        },
        props: {
            vid: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: null
            },
            mode: {
                type: [String, Function],
                default: function () {
                    return getConfig().mode;
                }
            },
            rules: {
                type: [Object, String],
                default: null
            },
            immediate: {
                type: Boolean,
                default: false
            },
            bails: {
                type: Boolean,
                default: function () { return getConfig().bails; }
            },
            skipIfEmpty: {
                type: Boolean,
                default: function () { return getConfig().skipOptional; }
            },
            debounce: {
                type: Number,
                default: 0
            },
            tag: {
                type: String,
                default: 'span'
            },
            slim: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            customMessages: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        watch: {
            rules: {
                deep: true,
                handler: function (val, oldVal) {
                    this._needsValidation = !isEqual(val, oldVal);
                }
            }
        },
        data: data,
        computed: {
            fieldDeps: function () {
                var _this = this;
                return Object.keys(this.normalizedRules).reduce(function (acc, rule) {
                    var deps = extractLocators(_this.normalizedRules[rule]).map(function (dep) { return dep.__locatorRef; });
                    acc.push.apply(acc, deps);
                    deps.forEach(function (depName) {
                        watchCrossFieldDep(_this, depName);
                    });
                    return acc;
                }, []);
            },
            normalizedEvents: function () {
                var _this = this;
                var on = computeModeSetting(this).on;
                return (on || []).map(function (e) {
                    if (e === 'input') {
                        return _this._inputEventName;
                    }
                    return e;
                });
            },
            isRequired: function () {
                var rules = __assign(__assign({}, this._resolvedRules), this.normalizedRules);
                var isRequired = Object.keys(rules).some(RuleContainer.isRequireRule);
                this.flags.required = !!isRequired;
                return isRequired;
            },
            classes: function () {
                var names = getConfig().classes;
                return computeClassObj(names, this.flags);
            },
            normalizedRules: function () {
                return normalizeRules(this.rules);
            }
        },
        mounted: function () {
            var _this = this;
            var onLocaleChanged = function () {
                if (!_this.flags.validated) {
                    return;
                }
                var regenerateMap = _this._regenerateMap;
                if (regenerateMap) {
                    var errors_1 = [];
                    var failedRules_1 = {};
                    Object.keys(regenerateMap).forEach(function (rule) {
                        var msg = regenerateMap[rule]();
                        errors_1.push(msg);
                        failedRules_1[rule] = msg;
                    });
                    _this.applyResult({ errors: errors_1, failedRules: failedRules_1, regenerateMap: regenerateMap });
                    return;
                }
                _this.validate();
            };
            EVENT_BUS.$on('change:locale', onLocaleChanged);
            this.$on('hook:beforeDestroy', function () {
                EVENT_BUS.$off('change:locale', onLocaleChanged);
            });
        },
        render: function (h) {
            var _this = this;
            this.registerField();
            var ctx = createValidationCtx(this);
            var children = normalizeChildren(this, ctx);
            // Handle single-root slot.
            extractVNodes(children).forEach(function (input) {
                var _a, _b, _c, _d;
                // resolved rules are not reactive because it has a new reference each time.
                // causing infinite render-loops.
                // So we are comparing them manually to decide if we need to validate or not.
                var resolved = getConfig().useConstraintAttrs ? resolveRules(input) : {};
                if (!isEqual(_this._resolvedRules, resolved)) {
                    _this._needsValidation = true;
                }
                if (isHTMLNode(input)) {
                    _this.fieldName = ((_b = (_a = input.data) === null || _a === void 0 ? void 0 : _a.attrs) === null || _b === void 0 ? void 0 : _b.name) || ((_d = (_c = input.data) === null || _c === void 0 ? void 0 : _c.attrs) === null || _d === void 0 ? void 0 : _d.id);
                }
                _this._resolvedRules = resolved;
                addListeners(_this, input);
            });
            return this.slim && children.length <= 1 ? children[0] : h(this.tag, children);
        },
        beforeDestroy: function () {
            // cleanup reference.
            this.$_veeObserver.unobserve(this.id);
        },
        activated: function () {
            this.isActive = true;
        },
        deactivated: function () {
            this.isActive = false;
        },
        methods: {
            setFlags: function (flags) {
                var _this = this;
                Object.keys(flags).forEach(function (flag) {
                    _this.flags[flag] = flags[flag];
                });
            },
            syncValue: function (v) {
                var value = normalizeEventValue(v);
                this.value = value;
                this.flags.changed = this.initialValue !== value;
            },
            reset: function () {
                var _this = this;
                this.errors = [];
                this.initialValue = this.value;
                var flags = createFlags();
                flags.required = this.isRequired;
                this.setFlags(flags);
                this.failedRules = {};
                this.validateSilent();
                this._pendingValidation = undefined;
                this._pendingReset = true;
                setTimeout(function () {
                    _this._pendingReset = false;
                }, this.debounce);
            },
            validate: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (args.length > 0) {
                            this.syncValue(args[0]);
                        }
                        return [2 /*return*/, triggerThreadSafeValidation(this)];
                    });
                });
            },
            validateSilent: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var rules, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.setFlags({ pending: true });
                                rules = __assign(__assign({}, this._resolvedRules), this.normalizedRules);
                                Object.defineProperty(rules, '_$$isNormalized', {
                                    value: true,
                                    writable: false,
                                    enumerable: false,
                                    configurable: false
                                });
                                return [4 /*yield*/, validate(this.value, rules, __assign(__assign({ name: this.name || this.fieldName }, createLookup(this)), { bails: this.bails, skipIfEmpty: this.skipIfEmpty, isInitial: !this.initialized, customMessages: this.customMessages }))];
                            case 1:
                                result = _a.sent();
                                this.setFlags({
                                    pending: false,
                                    valid: result.valid,
                                    invalid: !result.valid
                                });
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
            setErrors: function (errors) {
                this.applyResult({ errors: errors, failedRules: {} });
            },
            applyResult: function (_a) {
                var errors = _a.errors, failedRules = _a.failedRules, regenerateMap = _a.regenerateMap;
                this.errors = errors;
                this._regenerateMap = regenerateMap;
                this.failedRules = __assign({}, (failedRules || {}));
                this.setFlags({
                    valid: !errors.length,
                    passed: !errors.length,
                    invalid: !!errors.length,
                    failed: !!errors.length,
                    validated: true,
                    changed: this.value !== this.initialValue
                });
            },
            registerField: function () {
                updateRenderingContextRefs(this);
            }
        }
    });
    function computeClassObj(names, flags) {
        var acc = {};
        var keys = Object.keys(flags);
        var length = keys.length;
        var _loop_1 = function (i) {
            var flag = keys[i];
            var className = (names && names[flag]) || flag;
            var value = flags[flag];
            if (isNullOrUndefined(value)) {
                return "continue";
            }
            if ((flag === 'valid' || flag === 'invalid') && !flags.validated) {
                return "continue";
            }
            if (typeof className === 'string') {
                acc[className] = value;
            }
            else if (Array.isArray(className)) {
                className.forEach(function (cls) {
                    acc[cls] = value;
                });
            }
        };
        for (var i = 0; i < length; i++) {
            _loop_1(i);
        }
        return acc;
    }
    function createLookup(vm) {
        var providers = vm.$_veeObserver.refs;
        var reduced = {
            names: {},
            values: {}
        };
        return vm.fieldDeps.reduce(function (acc, depName) {
            if (!providers[depName]) {
                return acc;
            }
            acc.values[depName] = providers[depName].value;
            acc.names[depName] = providers[depName].name;
            return acc;
        }, reduced);
    }
    function extractId(vm) {
        if (vm.vid) {
            return vm.vid;
        }
        if (vm.name) {
            return vm.name;
        }
        if (vm.id) {
            return vm.id;
        }
        if (vm.fieldName) {
            return vm.fieldName;
        }
        PROVIDER_COUNTER++;
        return "_vee_" + PROVIDER_COUNTER;
    }
    function updateRenderingContextRefs(vm) {
        var providedId = extractId(vm);
        var id = vm.id;
        // Nothing has changed.
        if (!vm.isActive || (id === providedId && vm.$_veeObserver.refs[id])) {
            return;
        }
        // vid was changed.
        if (id !== providedId && vm.$_veeObserver.refs[id] === vm) {
            vm.$_veeObserver.unobserve(id);
        }
        vm.id = providedId;
        vm.$_veeObserver.observe(vm);
    }
    function createObserver() {
        return {
            refs: {},
            observe: function (vm) {
                this.refs[vm.id] = vm;
            },
            unobserve: function (id) {
                delete this.refs[id];
            }
        };
    }
    function watchCrossFieldDep(ctx, depName, withHooks) {
        if (withHooks === void 0) { withHooks = true; }
        var providers = ctx.$_veeObserver.refs;
        if (!ctx._veeWatchers) {
            ctx._veeWatchers = {};
        }
        if (!providers[depName] && withHooks) {
            return ctx.$once('hook:mounted', function () {
                watchCrossFieldDep(ctx, depName, false);
            });
        }
        if (!isCallable(ctx._veeWatchers[depName]) && providers[depName]) {
            ctx._veeWatchers[depName] = providers[depName].$watch('value', function () {
                if (ctx.flags.validated) {
                    ctx._needsValidation = true;
                    ctx.validate();
                }
            });
        }
    }

    var FLAGS_STRATEGIES = [
        ['pristine', 'every'],
        ['dirty', 'some'],
        ['touched', 'some'],
        ['untouched', 'every'],
        ['valid', 'every'],
        ['invalid', 'some'],
        ['pending', 'some'],
        ['validated', 'every'],
        ['changed', 'some'],
        ['passed', 'every'],
        ['failed', 'some']
    ];
    var OBSERVER_COUNTER = 0;
    function data$1() {
        var refs = {};
        var errors = {};
        var flags = createObserverFlags();
        var fields = {};
        // FIXME: Not sure of this one can be typed, circular type reference.
        var observers = [];
        return {
            id: '',
            refs: refs,
            observers: observers,
            errors: errors,
            flags: flags,
            fields: fields
        };
    }
    function provideSelf() {
        return {
            $_veeObserver: this
        };
    }
    var ValidationObserver = Vue.extend({
        name: 'ValidationObserver',
        provide: provideSelf,
        inject: {
            $_veeObserver: {
                from: '$_veeObserver',
                default: function () {
                    if (!this.$vnode.context.$_veeObserver) {
                        return null;
                    }
                    return this.$vnode.context.$_veeObserver;
                }
            }
        },
        props: {
            tag: {
                type: String,
                default: 'span'
            },
            vid: {
                type: String,
                default: function () {
                    return "obs_" + OBSERVER_COUNTER++;
                }
            },
            slim: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data: data$1,
        created: function () {
            var _this = this;
            this.id = this.vid;
            register(this);
            var onChange = debounce(function (_a) {
                var errors = _a.errors, flags = _a.flags, fields = _a.fields;
                _this.errors = errors;
                _this.flags = flags;
                _this.fields = fields;
            }, 16);
            this.$watch(computeObserverState, onChange);
        },
        activated: function () {
            register(this);
        },
        deactivated: function () {
            unregister(this);
        },
        beforeDestroy: function () {
            unregister(this);
        },
        render: function (h) {
            var children = normalizeChildren(this, prepareSlotProps(this));
            return this.slim && children.length <= 1 ? children[0] : h(this.tag, { on: this.$listeners }, children);
        },
        methods: {
            observe: function (subscriber, kind) {
                var _a;
                if (kind === void 0) { kind = 'provider'; }
                if (kind === 'observer') {
                    this.observers.push(subscriber);
                    return;
                }
                this.refs = __assign(__assign({}, this.refs), (_a = {}, _a[subscriber.id] = subscriber, _a));
            },
            unobserve: function (id, kind) {
                if (kind === void 0) { kind = 'provider'; }
                if (kind === 'provider') {
                    var provider = this.refs[id];
                    if (!provider) {
                        return;
                    }
                    this.$delete(this.refs, id);
                    return;
                }
                var idx = findIndex(this.observers, function (o) { return o.id === id; });
                if (idx !== -1) {
                    this.observers.splice(idx, 1);
                }
            },
            validate: function (_a) {
                var _b = (_a === void 0 ? {} : _a).silent, silent = _b === void 0 ? false : _b;
                return __awaiter(this, void 0, void 0, function () {
                    var results;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, Promise.all(__spreadArrays(values(this.refs)
                                    .filter(function (r) { return !r.disabled; })
                                    .map(function (ref) { return ref[silent ? 'validateSilent' : 'validate']().then(function (r) { return r.valid; }); }), this.observers.filter(function (o) { return !o.disabled; }).map(function (obs) { return obs.validate({ silent: silent }); })))];
                            case 1:
                                results = _c.sent();
                                return [2 /*return*/, results.every(function (r) { return r; })];
                        }
                    });
                });
            },
            handleSubmit: function (cb) {
                return __awaiter(this, void 0, void 0, function () {
                    var isValid;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.validate()];
                            case 1:
                                isValid = _a.sent();
                                if (!isValid || !cb) {
                                    return [2 /*return*/];
                                }
                                return [2 /*return*/, cb()];
                        }
                    });
                });
            },
            reset: function () {
                return __spreadArrays(values(this.refs), this.observers).forEach(function (ref) { return ref.reset(); });
            },
            setErrors: function (errors) {
                var _this = this;
                Object.keys(errors).forEach(function (key) {
                    var provider = _this.refs[key];
                    if (!provider)
                        return;
                    var errorArr = errors[key] || [];
                    errorArr = typeof errorArr === 'string' ? [errorArr] : errorArr;
                    provider.setErrors(errorArr);
                });
                this.observers.forEach(function (observer) {
                    observer.setErrors(errors);
                });
            }
        }
    });
    function unregister(vm) {
        if (vm.$_veeObserver) {
            vm.$_veeObserver.unobserve(vm.id, 'observer');
        }
    }
    function register(vm) {
        if (vm.$_veeObserver) {
            vm.$_veeObserver.observe(vm, 'observer');
        }
    }
    function prepareSlotProps(vm) {
        return __assign(__assign({}, vm.flags), { errors: vm.errors, fields: vm.fields, validate: vm.validate, passes: vm.handleSubmit, handleSubmit: vm.handleSubmit, reset: vm.reset });
    }
    // Creates a modified version of validation flags
    function createObserverFlags() {
        return __assign(__assign({}, createFlags()), { valid: true, invalid: false });
    }
    function computeObserverState() {
        var vms = __spreadArrays(values(this.refs), this.observers);
        var errors = {};
        var flags = createObserverFlags();
        var fields = {};
        var length = vms.length;
        for (var i = 0; i < length; i++) {
            var vm = vms[i];
            // validation provider
            if (Array.isArray(vm.errors)) {
                errors[vm.id] = vm.errors;
                fields[vm.id] = __assign({ id: vm.id, name: vm.name, failedRules: vm.failedRules }, vm.flags);
                continue;
            }
            // Nested observer, merge errors and fields
            errors = __assign(__assign({}, errors), vm.errors);
            fields = __assign(__assign({}, fields), vm.fields);
        }
        FLAGS_STRATEGIES.forEach(function (_a) {
            var flag = _a[0], method = _a[1];
            flags[flag] = vms[method](function (vm) { return vm.flags[flag]; });
        });
        return { errors: errors, flags: flags, fields: fields };
    }

    function withValidation(component, mapProps) {
        if (mapProps === void 0) { mapProps = identity; }
        var _a, _b;
        var options = 'options' in component ? component.options : component;
        var providerOpts = ValidationProvider.options;
        var hoc = {
            name: (options.name || 'AnonymousHoc') + "WithValidation",
            props: __assign({}, providerOpts.props),
            data: providerOpts.data,
            computed: __assign({}, providerOpts.computed),
            methods: __assign({}, providerOpts.methods),
            beforeDestroy: providerOpts.beforeDestroy,
            inject: providerOpts.inject
        };
        var eventName = ((_b = (_a = options) === null || _a === void 0 ? void 0 : _a.model) === null || _b === void 0 ? void 0 : _b.event) || 'input';
        hoc.render = function (h) {
            var _a;
            var _b, _c;
            this.registerField();
            var vctx = createValidationCtx(this);
            var listeners = __assign({}, this.$listeners);
            var model = findModel(this.$vnode);
            this._inputEventName = this._inputEventName || getInputEventName(this.$vnode, model);
            var value = findValue(this.$vnode);
            onRenderUpdate(this, (_b = value) === null || _b === void 0 ? void 0 : _b.value);
            var _d = createCommonHandlers(this), onInput = _d.onInput, onBlur = _d.onBlur, onValidate = _d.onValidate;
            mergeVNodeListeners(listeners, eventName, onInput);
            mergeVNodeListeners(listeners, 'blur', onBlur);
            this.normalizedEvents.forEach(function (evt) {
                mergeVNodeListeners(listeners, evt, onValidate);
            });
            // Props are any attrs not associated with ValidationProvider Plus the model prop.
            // WARNING: Accidental prop overwrite will probably happen.
            var prop = (findModelConfig(this.$vnode) || { prop: 'value' }).prop;
            var props = __assign(__assign(__assign({}, this.$attrs), (_a = {}, _a[prop] = (_c = model) === null || _c === void 0 ? void 0 : _c.value, _a)), mapProps(vctx));
            return h(options, {
                attrs: this.$attrs,
                props: props,
                on: listeners
            }, normalizeSlots(this.$slots, this.$vnode.context));
        };
        return hoc;
    }

    var version = '3.2.5';

    exports.ValidationObserver = ValidationObserver;
    exports.ValidationProvider = ValidationProvider;
    exports.configure = configure;
    exports.extend = extend;
    exports.localeChanged = localeChanged;
    exports.localize = localize;
    exports.normalizeRules = normalizeRules;
    exports.setInteractionMode = setInteractionMode;
    exports.validate = validate;
    exports.version = version;
    exports.withValidation = withValidation;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
