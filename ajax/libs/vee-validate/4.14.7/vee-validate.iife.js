/**
  * vee-validate v4.14.7
  * (c) 2024 Abdelrahman Awad
  * @license MIT
  */
var VeeValidate = (function (exports, vue) {
    'use strict';

    function isCallable(fn) {
        return typeof fn === 'function';
    }
    function isNullOrUndefined(value) {
        return value === null || value === undefined;
    }
    const isObject = (obj) => obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj);
    function isIndex(value) {
        return Number(value) >= 0;
    }
    function toNumber(value) {
        const n = parseFloat(value);
        return isNaN(n) ? value : n;
    }
    function isObjectLike(value) {
        return typeof value === 'object' && value !== null;
    }
    function getTag(value) {
        if (value == null) {
            return value === undefined ? '[object Undefined]' : '[object Null]';
        }
        return Object.prototype.toString.call(value);
    }
    // Reference: https://github.com/lodash/lodash/blob/master/isPlainObject.js
    function isPlainObject(value) {
        if (!isObjectLike(value) || getTag(value) !== '[object Object]') {
            return false;
        }
        if (Object.getPrototypeOf(value) === null) {
            return true;
        }
        let proto = value;
        while (Object.getPrototypeOf(proto) !== null) {
            proto = Object.getPrototypeOf(proto);
        }
        return Object.getPrototypeOf(value) === proto;
    }
    function merge(target, source) {
        Object.keys(source).forEach(key => {
            if (isPlainObject(source[key]) && isPlainObject(target[key])) {
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
    /**
     * Constructs a path with dot paths for arrays to use brackets to be compatible with vee-validate path syntax
     */
    function normalizeFormPath(path) {
        const pathArr = path.split('.');
        if (!pathArr.length) {
            return '';
        }
        let fullPath = String(pathArr[0]);
        for (let i = 1; i < pathArr.length; i++) {
            if (isIndex(pathArr[i])) {
                fullPath += `[${pathArr[i]}]`;
                continue;
            }
            fullPath += `.${pathArr[i]}`;
        }
        return fullPath;
    }

    const RULES = {};
    /**
     * Adds a custom validator to the list of validation rules.
     */
    function defineRule(id, validator) {
        // makes sure new rules are properly formatted.
        guardExtend(id, validator);
        RULES[id] = validator;
    }
    /**
     * Gets an already defined rule
     */
    function resolveRule(id) {
        return RULES[id];
    }
    /**
     * Guards from extension violations.
     */
    function guardExtend(id, validator) {
        if (isCallable(validator)) {
            return;
        }
        throw new Error(`Extension Error: The validator '${id}' must be a function.`);
    }

    function set(obj, key, val) {
    	if (typeof val.value === 'object') val.value = klona(val.value);
    	if (!val.enumerable || val.get || val.set || !val.configurable || !val.writable || key === '__proto__') {
    		Object.defineProperty(obj, key, val);
    	} else obj[key] = val.value;
    }

    function klona(x) {
    	if (typeof x !== 'object') return x;

    	var i=0, k, list, tmp, str=Object.prototype.toString.call(x);

    	if (str === '[object Object]') {
    		tmp = Object.create(x.__proto__ || null);
    	} else if (str === '[object Array]') {
    		tmp = Array(x.length);
    	} else if (str === '[object Set]') {
    		tmp = new Set;
    		x.forEach(function (val) {
    			tmp.add(klona(val));
    		});
    	} else if (str === '[object Map]') {
    		tmp = new Map;
    		x.forEach(function (val, key) {
    			tmp.set(klona(key), klona(val));
    		});
    	} else if (str === '[object Date]') {
    		tmp = new Date(+x);
    	} else if (str === '[object RegExp]') {
    		tmp = new RegExp(x.source, x.flags);
    	} else if (str === '[object DataView]') {
    		tmp = new x.constructor( klona(x.buffer) );
    	} else if (str === '[object ArrayBuffer]') {
    		tmp = x.slice(0);
    	} else if (str.slice(-6) === 'Array]') {
    		// ArrayBuffer.isView(x)
    		// ~> `new` bcuz `Buffer.slice` => ref
    		tmp = new x.constructor(x);
    	}

    	if (tmp) {
    		for (list=Object.getOwnPropertySymbols(x); i < list.length; i++) {
    			set(tmp, list[i], Object.getOwnPropertyDescriptor(x, list[i]));
    		}

    		for (i=0, list=Object.getOwnPropertyNames(x); i < list.length; i++) {
    			if (Object.hasOwnProperty.call(tmp, k=list[i]) && tmp[k] === x[k]) continue;
    			set(tmp, k, Object.getOwnPropertyDescriptor(x, k));
    		}
    	}

    	return tmp || x;
    }

    const FormContextKey = Symbol('vee-validate-form');
    const PublicFormContextKey = Symbol('vee-validate-form-context');
    const FieldContextKey = Symbol('vee-validate-field-instance');
    const IS_ABSENT = Symbol('Default empty value');

    const isClient = typeof window !== 'undefined';
    function isLocator(value) {
        return isCallable(value) && !!value.__locatorRef;
    }
    function isTypedSchema(value) {
        return !!value && isCallable(value.parse) && value.__type === 'VVTypedSchema';
    }
    function isYupValidator(value) {
        return !!value && isCallable(value.validate);
    }
    function hasCheckedAttr(type) {
        return type === 'checkbox' || type === 'radio';
    }
    function isContainerValue(value) {
        return isObject(value) || Array.isArray(value);
    }
    /**
     * True if the value is an empty object or array
     */
    function isEmptyContainer(value) {
        if (Array.isArray(value)) {
            return value.length === 0;
        }
        return isObject(value) && Object.keys(value).length === 0;
    }
    /**
     * Checks if the path opted out of nested fields using `[fieldName]` syntax
     */
    function isNotNestedPath(path) {
        return /^\[.+\]$/i.test(path);
    }
    /**
     * Checks if an element is a native HTML5 multi-select input element
     */
    function isNativeMultiSelect(el) {
        return isNativeSelect(el) && el.multiple;
    }
    /**
     * Checks if an element is a native HTML5 select input element
     */
    function isNativeSelect(el) {
        return el.tagName === 'SELECT';
    }
    /**
     * Checks if a tag name with attrs object will render a native multi-select element
     */
    function isNativeMultiSelectNode(tag, attrs) {
        // The falsy value array is the values that Vue won't add the `multiple` prop if it has one of these values
        const hasTruthyBindingValue = ![false, null, undefined, 0].includes(attrs.multiple) && !Number.isNaN(attrs.multiple);
        return tag === 'select' && 'multiple' in attrs && hasTruthyBindingValue;
    }
    /**
     * Checks if a node should have a `:value` binding or not
     *
     * These nodes should not have a value binding
     * For files, because they are not reactive
     * For multi-selects because the value binding will reset the value
     */
    function shouldHaveValueBinding(tag, attrs) {
        return !isNativeMultiSelectNode(tag, attrs) && attrs.type !== 'file' && !hasCheckedAttr(attrs.type);
    }
    function isFormSubmitEvent(evt) {
        return isEvent(evt) && evt.target && 'submit' in evt.target;
    }
    function isEvent(evt) {
        if (!evt) {
            return false;
        }
        if (typeof Event !== 'undefined' && isCallable(Event) && evt instanceof Event) {
            return true;
        }
        // this is for IE and Cypress #3161
        /* istanbul ignore next */
        if (evt && evt.srcElement) {
            return true;
        }
        return false;
    }
    function isPropPresent(obj, prop) {
        return prop in obj && obj[prop] !== IS_ABSENT;
    }
    /**
     * Compares if two values are the same borrowed from:
     * https://github.com/epoberezkin/fast-deep-equal
     * We added a case for file matching since `Object.keys` doesn't work with Files.
     *
     * NB: keys with the value undefined are ignored in the evaluation and considered equal to missing keys.
     * */
    function isEqual(a, b) {
        if (a === b)
            return true;
        if (a && b && typeof a === 'object' && typeof b === 'object') {
            if (a.constructor !== b.constructor)
                return false;
            // eslint-disable-next-line no-var
            var length, i, keys;
            if (Array.isArray(a)) {
                length = a.length;
                if (length != b.length)
                    return false;
                for (i = length; i-- !== 0;)
                    if (!isEqual(a[i], b[i]))
                        return false;
                return true;
            }
            if (a instanceof Map && b instanceof Map) {
                if (a.size !== b.size)
                    return false;
                for (i of a.entries())
                    if (!b.has(i[0]))
                        return false;
                for (i of a.entries())
                    if (!isEqual(i[1], b.get(i[0])))
                        return false;
                return true;
            }
            // We added this part for file comparison, arguably a little naive but should work for most cases.
            // #3911
            if (isFile(a) && isFile(b)) {
                if (a.size !== b.size)
                    return false;
                if (a.name !== b.name)
                    return false;
                if (a.lastModified !== b.lastModified)
                    return false;
                if (a.type !== b.type)
                    return false;
                return true;
            }
            if (a instanceof Set && b instanceof Set) {
                if (a.size !== b.size)
                    return false;
                for (i of a.entries())
                    if (!b.has(i[0]))
                        return false;
                return true;
            }
            if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
                length = a.length;
                if (length != b.length)
                    return false;
                for (i = length; i-- !== 0;)
                    if (a[i] !== b[i])
                        return false;
                return true;
            }
            if (a.constructor === RegExp)
                return a.source === b.source && a.flags === b.flags;
            if (a.valueOf !== Object.prototype.valueOf)
                return a.valueOf() === b.valueOf();
            if (a.toString !== Object.prototype.toString)
                return a.toString() === b.toString();
            keys = Object.keys(a);
            length = keys.length - countUndefinedValues(a, keys);
            if (length !== Object.keys(b).length - countUndefinedValues(b, Object.keys(b)))
                return false;
            for (i = length; i-- !== 0;) {
                if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
                    return false;
            }
            for (i = length; i-- !== 0;) {
                // eslint-disable-next-line no-var
                var key = keys[i];
                if (!isEqual(a[key], b[key]))
                    return false;
            }
            return true;
        }
        // true if both NaN, false otherwise
        return a !== a && b !== b;
    }
    function countUndefinedValues(a, keys) {
        let result = 0;
        for (let i = keys.length; i-- !== 0;) {
            // eslint-disable-next-line no-var
            var key = keys[i];
            if (a[key] === undefined)
                result++;
        }
        return result;
    }
    function isFile(a) {
        if (!isClient) {
            return false;
        }
        return a instanceof File;
    }

    function cleanupNonNestedPath(path) {
        if (isNotNestedPath(path)) {
            return path.replace(/\[|\]/gi, '');
        }
        return path;
    }
    function getFromPath(object, path, fallback) {
        if (!object) {
            return fallback;
        }
        if (isNotNestedPath(path)) {
            return object[cleanupNonNestedPath(path)];
        }
        const resolvedValue = (path || '')
            .split(/\.|\[(\d+)\]/)
            .filter(Boolean)
            .reduce((acc, propKey) => {
            if (isContainerValue(acc) && propKey in acc) {
                return acc[propKey];
            }
            return fallback;
        }, object);
        return resolvedValue;
    }
    /**
     * Sets a nested property value in a path, creates the path properties if it doesn't exist
     */
    function setInPath(object, path, value) {
        if (isNotNestedPath(path)) {
            object[cleanupNonNestedPath(path)] = value;
            return;
        }
        const keys = path.split(/\.|\[(\d+)\]/).filter(Boolean);
        let acc = object;
        for (let i = 0; i < keys.length; i++) {
            // Last key, set it
            if (i === keys.length - 1) {
                acc[keys[i]] = value;
                return;
            }
            // Key does not exist, create a container for it
            if (!(keys[i] in acc) || isNullOrUndefined(acc[keys[i]])) {
                // container can be either an object or an array depending on the next key if it exists
                acc[keys[i]] = isIndex(keys[i + 1]) ? [] : {};
            }
            acc = acc[keys[i]];
        }
    }
    function unset(object, key) {
        if (Array.isArray(object) && isIndex(key)) {
            object.splice(Number(key), 1);
            return;
        }
        if (isObject(object)) {
            delete object[key];
        }
    }
    /**
     * Removes a nested property from object
     */
    function unsetPath(object, path) {
        if (isNotNestedPath(path)) {
            delete object[cleanupNonNestedPath(path)];
            return;
        }
        const keys = path.split(/\.|\[(\d+)\]/).filter(Boolean);
        let acc = object;
        for (let i = 0; i < keys.length; i++) {
            // Last key, unset it
            if (i === keys.length - 1) {
                unset(acc, keys[i]);
                break;
            }
            // Key does not exist, exit
            if (!(keys[i] in acc) || isNullOrUndefined(acc[keys[i]])) {
                break;
            }
            acc = acc[keys[i]];
        }
        const pathValues = keys.map((_, idx) => {
            return getFromPath(object, keys.slice(0, idx).join('.'));
        });
        for (let i = pathValues.length - 1; i >= 0; i--) {
            if (!isEmptyContainer(pathValues[i])) {
                continue;
            }
            if (i === 0) {
                unset(object, keys[0]);
                continue;
            }
            unset(pathValues[i - 1], keys[i - 1]);
        }
    }
    /**
     * A typed version of Object.keys
     */
    function keysOf(record) {
        return Object.keys(record);
    }
    // Uses same component provide as its own injections
    // Due to changes in https://github.com/vuejs/vue-next/pull/2424
    function injectWithSelf(symbol, def = undefined) {
        const vm = vue.getCurrentInstance();
        return (vm === null || vm === void 0 ? void 0 : vm.provides[symbol]) || vue.inject(symbol, def);
    }
    function resolveNextCheckboxValue(currentValue, checkedValue, uncheckedValue) {
        if (Array.isArray(currentValue)) {
            const newVal = [...currentValue];
            // Use isEqual since checked object values can possibly fail the equality check #3883
            const idx = newVal.findIndex(v => isEqual(v, checkedValue));
            idx >= 0 ? newVal.splice(idx, 1) : newVal.push(checkedValue);
            return newVal;
        }
        return isEqual(currentValue, checkedValue) ? uncheckedValue : checkedValue;
    }
    function debounceAsync(inner, ms = 0) {
        let timer = null;
        let resolves = [];
        return function (...args) {
            // Run the function after a certain amount of time
            if (timer) {
                clearTimeout(timer);
            }
            // @ts-expect-error timer is a number
            timer = setTimeout(() => {
                // Get the result of the inner function, then apply it to the resolve function of
                // each promise that has been created since the last time the inner function was run
                const result = inner(...args);
                resolves.forEach(r => r(result));
                resolves = [];
            }, ms);
            return new Promise(resolve => resolves.push(resolve));
        };
    }
    function applyModelModifiers(value, modifiers) {
        if (!isObject(modifiers)) {
            return value;
        }
        if (modifiers.number) {
            return toNumber(value);
        }
        return value;
    }
    function withLatest(fn, onDone) {
        let latestRun;
        return async function runLatest(...args) {
            const pending = fn(...args);
            latestRun = pending;
            const result = await pending;
            if (pending !== latestRun) {
                return result;
            }
            latestRun = undefined;
            return onDone(result, args);
        };
    }
    function computedDeep({ get, set }) {
        const baseRef = vue.ref(klona(get()));
        vue.watch(get, newValue => {
            if (isEqual(newValue, baseRef.value)) {
                return;
            }
            baseRef.value = klona(newValue);
        }, {
            deep: true,
        });
        vue.watch(baseRef, newValue => {
            if (isEqual(newValue, get())) {
                return;
            }
            set(klona(newValue));
        }, {
            deep: true,
        });
        return baseRef;
    }
    function normalizeErrorItem(message) {
        return Array.isArray(message) ? message : message ? [message] : [];
    }
    function resolveFieldOrPathState(path) {
        const form = injectWithSelf(FormContextKey);
        const state = path ? vue.computed(() => form === null || form === void 0 ? void 0 : form.getPathState(vue.toValue(path))) : undefined;
        const field = path ? undefined : vue.inject(FieldContextKey);
        if (!field && !(state === null || state === void 0 ? void 0 : state.value)) ;
        return state || field;
    }
    function omit(obj, keys) {
        const target = {};
        for (const key in obj) {
            if (!keys.includes(key)) {
                target[key] = obj[key];
            }
        }
        return target;
    }
    function debounceNextTick(inner) {
        let lastTick = null;
        let resolves = [];
        return function (...args) {
            // Run the function after a certain amount of time
            const thisTick = vue.nextTick(() => {
                if (lastTick !== thisTick) {
                    return;
                }
                // Get the result of the inner function, then apply it to the resolve function of
                // each promise that has been created since the last time the inner function was run
                const result = inner(...args);
                resolves.forEach(r => r(result));
                resolves = [];
                lastTick = null;
            });
            lastTick = thisTick;
            return new Promise(resolve => resolves.push(resolve));
        };
    }

    function normalizeChildren(tag, context, slotProps) {
        if (!context.slots.default) {
            return context.slots.default;
        }
        if (typeof tag === 'string' || !tag) {
            return context.slots.default(slotProps());
        }
        return {
            default: () => { var _a, _b; return (_b = (_a = context.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a, slotProps()); },
        };
    }
    /**
     * Vue adds a `_value` prop at the moment on the input elements to store the REAL value on them, real values are different than the `value` attribute
     * as they do not get casted to strings unlike `el.value` which preserves user-code behavior
     */
    function getBoundValue(el) {
        if (hasValueBinding(el)) {
            return el._value;
        }
        return undefined;
    }
    /**
     * Vue adds a `_value` prop at the moment on the input elements to store the REAL value on them, real values are different than the `value` attribute
     * as they do not get casted to strings unlike `el.value` which preserves user-code behavior
     */
    function hasValueBinding(el) {
        return '_value' in el;
    }

    function parseInputValue(el) {
        if (el.type === 'number') {
            return Number.isNaN(el.valueAsNumber) ? el.value : el.valueAsNumber;
        }
        if (el.type === 'range') {
            return Number.isNaN(el.valueAsNumber) ? el.value : el.valueAsNumber;
        }
        return el.value;
    }
    function normalizeEventValue(value) {
        if (!isEvent(value)) {
            return value;
        }
        const input = value.target;
        // Vue sets the current bound value on `_value` prop
        // for checkboxes it it should fetch the value binding type as is (boolean instead of string)
        if (hasCheckedAttr(input.type) && hasValueBinding(input)) {
            return getBoundValue(input);
        }
        if (input.type === 'file' && input.files) {
            const files = Array.from(input.files);
            return input.multiple ? files : files[0];
        }
        if (isNativeMultiSelect(input)) {
            return Array.from(input.options)
                .filter(opt => opt.selected && !opt.disabled)
                .map(getBoundValue);
        }
        // makes sure we get the actual `option` bound value
        // #3440
        if (isNativeSelect(input)) {
            const selectedOption = Array.from(input.options).find(opt => opt.selected);
            return selectedOption ? getBoundValue(selectedOption) : input.value;
        }
        return parseInputValue(input);
    }

    /**
     * Normalizes the given rules expression.
     */
    function normalizeRules(rules) {
        const acc = {};
        Object.defineProperty(acc, '_$$isNormalized', {
            value: true,
            writable: false,
            enumerable: false,
            configurable: false,
        });
        if (!rules) {
            return acc;
        }
        // Object is already normalized, skip.
        if (isObject(rules) && rules._$$isNormalized) {
            return rules;
        }
        if (isObject(rules)) {
            return Object.keys(rules).reduce((prev, curr) => {
                const params = normalizeParams(rules[curr]);
                if (rules[curr] !== false) {
                    prev[curr] = buildParams(params);
                }
                return prev;
            }, acc);
        }
        /* istanbul ignore if */
        if (typeof rules !== 'string') {
            return acc;
        }
        return rules.split('|').reduce((prev, rule) => {
            const parsedRule = parseRule(rule);
            if (!parsedRule.name) {
                return prev;
            }
            prev[parsedRule.name] = buildParams(parsedRule.params);
            return prev;
        }, acc);
    }
    /**
     * Normalizes a rule param.
     */
    function normalizeParams(params) {
        if (params === true) {
            return [];
        }
        if (Array.isArray(params)) {
            return params;
        }
        if (isObject(params)) {
            return params;
        }
        return [params];
    }
    function buildParams(provided) {
        const mapValueToLocator = (value) => {
            // A target param using interpolation
            if (typeof value === 'string' && value[0] === '@') {
                return createLocator(value.slice(1));
            }
            return value;
        };
        if (Array.isArray(provided)) {
            return provided.map(mapValueToLocator);
        }
        // #3073
        if (provided instanceof RegExp) {
            return [provided];
        }
        return Object.keys(provided).reduce((prev, key) => {
            prev[key] = mapValueToLocator(provided[key]);
            return prev;
        }, {});
    }
    /**
     * Parses a rule string expression.
     */
    const parseRule = (rule) => {
        let params = [];
        const name = rule.split(':')[0];
        if (rule.includes(':')) {
            params = rule.split(':').slice(1).join(':').split(',');
        }
        return { name, params };
    };
    function createLocator(value) {
        const locator = (crossTable) => {
            var _a;
            const val = (_a = getFromPath(crossTable, value)) !== null && _a !== void 0 ? _a : crossTable[value];
            return val;
        };
        locator.__locatorRef = value;
        return locator;
    }
    function extractLocators(params) {
        if (Array.isArray(params)) {
            return params.filter(isLocator);
        }
        return keysOf(params)
            .filter(key => isLocator(params[key]))
            .map(key => params[key]);
    }

    const DEFAULT_CONFIG = {
        generateMessage: ({ field }) => `${field} is not valid.`,
        bails: true,
        validateOnBlur: true,
        validateOnChange: true,
        validateOnInput: false,
        validateOnModelUpdate: true,
    };
    let currentConfig = Object.assign({}, DEFAULT_CONFIG);
    const getConfig = () => currentConfig;
    const setConfig = (newConf) => {
        currentConfig = Object.assign(Object.assign({}, currentConfig), newConf);
    };
    const configure = setConfig;

    /**
     * Validates a value against the rules.
     */
    async function validate(value, rules, options = {}) {
        const shouldBail = options === null || options === void 0 ? void 0 : options.bails;
        const field = {
            name: (options === null || options === void 0 ? void 0 : options.name) || '{field}',
            rules,
            label: options === null || options === void 0 ? void 0 : options.label,
            bails: shouldBail !== null && shouldBail !== void 0 ? shouldBail : true,
            formData: (options === null || options === void 0 ? void 0 : options.values) || {},
        };
        const result = await _validate(field, value);
        return Object.assign(Object.assign({}, result), { valid: !result.errors.length });
    }
    /**
     * Starts the validation process.
     */
    async function _validate(field, value) {
        const rules = field.rules;
        if (isTypedSchema(rules) || isYupValidator(rules)) {
            return validateFieldWithTypedSchema(value, Object.assign(Object.assign({}, field), { rules }));
        }
        // if a generic function or chain of generic functions
        if (isCallable(rules) || Array.isArray(rules)) {
            const ctx = {
                field: field.label || field.name,
                name: field.name,
                label: field.label,
                form: field.formData,
                value,
            };
            // Normalize the pipeline
            const pipeline = Array.isArray(rules) ? rules : [rules];
            const length = pipeline.length;
            const errors = [];
            for (let i = 0; i < length; i++) {
                const rule = pipeline[i];
                const result = await rule(value, ctx);
                const isValid = typeof result !== 'string' && !Array.isArray(result) && result;
                if (isValid) {
                    continue;
                }
                if (Array.isArray(result)) {
                    errors.push(...result);
                }
                else {
                    const message = typeof result === 'string' ? result : _generateFieldError(ctx);
                    errors.push(message);
                }
                if (field.bails) {
                    return {
                        errors,
                    };
                }
            }
            return {
                errors,
            };
        }
        const normalizedContext = Object.assign(Object.assign({}, field), { rules: normalizeRules(rules) });
        const errors = [];
        const rulesKeys = Object.keys(normalizedContext.rules);
        const length = rulesKeys.length;
        for (let i = 0; i < length; i++) {
            const rule = rulesKeys[i];
            const result = await _test(normalizedContext, value, {
                name: rule,
                params: normalizedContext.rules[rule],
            });
            if (result.error) {
                errors.push(result.error);
                if (field.bails) {
                    return {
                        errors,
                    };
                }
            }
        }
        return {
            errors,
        };
    }
    function isYupError(err) {
        return !!err && err.name === 'ValidationError';
    }
    function yupToTypedSchema(yupSchema) {
        const schema = {
            __type: 'VVTypedSchema',
            async parse(values, context) {
                var _a;
                try {
                    const output = await yupSchema.validate(values, { abortEarly: false, context: (context === null || context === void 0 ? void 0 : context.formData) || {} });
                    return {
                        output,
                        errors: [],
                    };
                }
                catch (err) {
                    // Yup errors have a name prop one them.
                    // https://github.com/jquense/yup#validationerrorerrors-string--arraystring-value-any-path-string
                    if (!isYupError(err)) {
                        throw err;
                    }
                    if (!((_a = err.inner) === null || _a === void 0 ? void 0 : _a.length) && err.errors.length) {
                        return { errors: [{ path: err.path, errors: err.errors }] };
                    }
                    const errors = err.inner.reduce((acc, curr) => {
                        const path = curr.path || '';
                        if (!acc[path]) {
                            acc[path] = { errors: [], path };
                        }
                        acc[path].errors.push(...curr.errors);
                        return acc;
                    }, {});
                    return { errors: Object.values(errors) };
                }
            },
        };
        return schema;
    }
    /**
     * Handles yup validation
     */
    async function validateFieldWithTypedSchema(value, context) {
        const typedSchema = isTypedSchema(context.rules) ? context.rules : yupToTypedSchema(context.rules);
        const result = await typedSchema.parse(value, { formData: context.formData });
        const messages = [];
        for (const error of result.errors) {
            if (error.errors.length) {
                messages.push(...error.errors);
            }
        }
        return {
            value: result.value,
            errors: messages,
        };
    }
    /**
     * Tests a single input value against a rule.
     */
    async function _test(field, value, rule) {
        const validator = resolveRule(rule.name);
        if (!validator) {
            throw new Error(`No such validator '${rule.name}' exists.`);
        }
        const params = fillTargetValues(rule.params, field.formData);
        const ctx = {
            field: field.label || field.name,
            name: field.name,
            label: field.label,
            value,
            form: field.formData,
            rule: Object.assign(Object.assign({}, rule), { params }),
        };
        const result = await validator(value, params, ctx);
        if (typeof result === 'string') {
            return {
                error: result,
            };
        }
        return {
            error: result ? undefined : _generateFieldError(ctx),
        };
    }
    /**
     * Generates error messages.
     */
    function _generateFieldError(fieldCtx) {
        const message = getConfig().generateMessage;
        if (!message) {
            return 'Field is invalid';
        }
        return message(fieldCtx);
    }
    function fillTargetValues(params, crossTable) {
        const normalize = (value) => {
            if (isLocator(value)) {
                return value(crossTable);
            }
            return value;
        };
        if (Array.isArray(params)) {
            return params.map(normalize);
        }
        return Object.keys(params).reduce((acc, param) => {
            acc[param] = normalize(params[param]);
            return acc;
        }, {});
    }
    async function validateTypedSchema(schema, values) {
        const typedSchema = isTypedSchema(schema) ? schema : yupToTypedSchema(schema);
        const validationResult = await typedSchema.parse(klona(values), { formData: klona(values) });
        const results = {};
        const errors = {};
        for (const error of validationResult.errors) {
            const messages = error.errors;
            // Fixes issue with path mapping with Yup 1.0 including quotes around array indices
            const path = (error.path || '').replace(/\["(\d+)"\]/g, (_, m) => {
                return `[${m}]`;
            });
            results[path] = { valid: !messages.length, errors: messages };
            if (messages.length) {
                errors[path] = messages[0];
            }
        }
        return {
            valid: !validationResult.errors.length,
            results,
            errors,
            values: validationResult.value,
            source: 'schema',
        };
    }
    async function validateObjectSchema(schema, values, opts) {
        const paths = keysOf(schema);
        const validations = paths.map(async (path) => {
            var _a, _b, _c;
            const strings = (_a = opts === null || opts === void 0 ? void 0 : opts.names) === null || _a === void 0 ? void 0 : _a[path];
            const fieldResult = await validate(getFromPath(values, path), schema[path], {
                name: (strings === null || strings === void 0 ? void 0 : strings.name) || path,
                label: strings === null || strings === void 0 ? void 0 : strings.label,
                values: values,
                bails: (_c = (_b = opts === null || opts === void 0 ? void 0 : opts.bailsMap) === null || _b === void 0 ? void 0 : _b[path]) !== null && _c !== void 0 ? _c : true,
            });
            return Object.assign(Object.assign({}, fieldResult), { path });
        });
        let isAllValid = true;
        const validationResults = await Promise.all(validations);
        const results = {};
        const errors = {};
        for (const result of validationResults) {
            results[result.path] = {
                valid: result.valid,
                errors: result.errors,
            };
            if (!result.valid) {
                isAllValid = false;
                errors[result.path] = result.errors[0];
            }
        }
        return {
            valid: isAllValid,
            results,
            errors,
            source: 'schema',
        };
    }

    let ID_COUNTER = 0;
    function useFieldState(path, init) {
        const { value, initialValue, setInitialValue } = _useFieldValue(path, init.modelValue, init.form);
        if (!init.form) {
            const { errors, setErrors } = createFieldErrors();
            const id = ID_COUNTER >= Number.MAX_SAFE_INTEGER ? 0 : ++ID_COUNTER;
            const meta = createFieldMeta(value, initialValue, errors, init.schema);
            function setState(state) {
                var _a;
                if ('value' in state) {
                    value.value = state.value;
                }
                if ('errors' in state) {
                    setErrors(state.errors);
                }
                if ('touched' in state) {
                    meta.touched = (_a = state.touched) !== null && _a !== void 0 ? _a : meta.touched;
                }
                if ('initialValue' in state) {
                    setInitialValue(state.initialValue);
                }
            }
            return {
                id,
                path,
                value,
                initialValue,
                meta,
                flags: { pendingUnmount: { [id]: false }, pendingReset: false },
                errors,
                setState,
            };
        }
        const state = init.form.createPathState(path, {
            bails: init.bails,
            label: init.label,
            type: init.type,
            validate: init.validate,
            schema: init.schema,
        });
        const errors = vue.computed(() => state.errors);
        function setState(state) {
            var _a, _b, _c;
            if ('value' in state) {
                value.value = state.value;
            }
            if ('errors' in state) {
                (_a = init.form) === null || _a === void 0 ? void 0 : _a.setFieldError(vue.unref(path), state.errors);
            }
            if ('touched' in state) {
                (_b = init.form) === null || _b === void 0 ? void 0 : _b.setFieldTouched(vue.unref(path), (_c = state.touched) !== null && _c !== void 0 ? _c : false);
            }
            if ('initialValue' in state) {
                setInitialValue(state.initialValue);
            }
        }
        return {
            id: Array.isArray(state.id) ? state.id[state.id.length - 1] : state.id,
            path,
            value,
            errors,
            meta: state,
            initialValue,
            flags: state.__flags,
            setState,
        };
    }
    /**
     * Creates the field value and resolves the initial value
     */
    function _useFieldValue(path, modelValue, form) {
        const modelRef = vue.ref(vue.unref(modelValue));
        function resolveInitialValue() {
            if (!form) {
                return vue.unref(modelRef);
            }
            return getFromPath(form.initialValues.value, vue.unref(path), vue.unref(modelRef));
        }
        function setInitialValue(value) {
            if (!form) {
                modelRef.value = value;
                return;
            }
            form.setFieldInitialValue(vue.unref(path), value, true);
        }
        const initialValue = vue.computed(resolveInitialValue);
        // if no form is associated, use a regular ref.
        if (!form) {
            const value = vue.ref(resolveInitialValue());
            return {
                value,
                initialValue,
                setInitialValue,
            };
        }
        // to set the initial value, first check if there is a current value, if there is then use it.
        // otherwise use the configured initial value if it exists.
        // prioritize model value over form values
        // #3429
        const currentValue = resolveModelValue(modelValue, form, initialValue, path);
        form.stageInitialValue(vue.unref(path), currentValue, true);
        // otherwise use a computed setter that triggers the `setFieldValue`
        const value = vue.computed({
            get() {
                return getFromPath(form.values, vue.unref(path));
            },
            set(newVal) {
                form.setFieldValue(vue.unref(path), newVal, false);
            },
        });
        return {
            value,
            initialValue,
            setInitialValue,
        };
    }
    /*
      to set the initial value, first check if there is a current value, if there is then use it.
      otherwise use the configured initial value if it exists.
      prioritize model value over form values
      #3429
    */
    function resolveModelValue(modelValue, form, initialValue, path) {
        if (vue.isRef(modelValue)) {
            return vue.unref(modelValue);
        }
        if (modelValue !== undefined) {
            return modelValue;
        }
        return getFromPath(form.values, vue.unref(path), vue.unref(initialValue));
    }
    /**
     * Creates meta flags state and some associated effects with them
     */
    function createFieldMeta(currentValue, initialValue, errors, schema) {
        const isRequired = vue.computed(() => { var _a, _b, _c; return (_c = (_b = (_a = vue.toValue(schema)) === null || _a === void 0 ? void 0 : _a.describe) === null || _b === void 0 ? void 0 : _b.call(_a).required) !== null && _c !== void 0 ? _c : false; });
        const meta = vue.reactive({
            touched: false,
            pending: false,
            valid: true,
            required: isRequired,
            validated: !!vue.unref(errors).length,
            initialValue: vue.computed(() => vue.unref(initialValue)),
            dirty: vue.computed(() => {
                return !isEqual(vue.unref(currentValue), vue.unref(initialValue));
            }),
        });
        vue.watch(errors, value => {
            meta.valid = !value.length;
        }, {
            immediate: true,
            flush: 'sync',
        });
        return meta;
    }
    /**
     * Creates the error message state for the field state
     */
    function createFieldErrors() {
        const errors = vue.ref([]);
        return {
            errors,
            setErrors: (messages) => {
                errors.value = normalizeErrorItem(messages);
            },
        };
    }

    var __create$1 = Object.create;
    var __defProp$1 = Object.defineProperty;
    var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames$1 = Object.getOwnPropertyNames;
    var __getProtoOf$1 = Object.getPrototypeOf;
    var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
    var __esm$1 = (fn, res) => function __init() {
      return fn && (res = (0, fn[__getOwnPropNames$1(fn)[0]])(fn = 0)), res;
    };
    var __commonJS$1 = (cb, mod) => function __require() {
      return mod || (0, cb[__getOwnPropNames$1(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var __copyProps$1 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames$1(from))
          if (!__hasOwnProp$1.call(to, key) && key !== except)
            __defProp$1(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc$1(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM$1 = (mod, isNodeMode, target2) => (target2 = mod != null ? __create$1(__getProtoOf$1(mod)) : {}, __copyProps$1(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      __defProp$1(target2, "default", { value: mod, enumerable: true }) ,
      mod
    ));

    // ../../node_modules/.pnpm/tsup@8.3.0_@microsoft+api-extractor@7.43.0_@types+node@20.16.11__@swc+core@1.5.29_jiti@2.0.0__khi6fwhekjxtif3xyxfitrs5gq/node_modules/tsup/assets/esm_shims.js
    var init_esm_shims$1 = __esm$1({
      "../../node_modules/.pnpm/tsup@8.3.0_@microsoft+api-extractor@7.43.0_@types+node@20.16.11__@swc+core@1.5.29_jiti@2.0.0__khi6fwhekjxtif3xyxfitrs5gq/node_modules/tsup/assets/esm_shims.js"() {
      }
    });

    // ../../node_modules/.pnpm/rfdc@1.4.1/node_modules/rfdc/index.js
    var require_rfdc = __commonJS$1({
      "../../node_modules/.pnpm/rfdc@1.4.1/node_modules/rfdc/index.js"(exports, module) {
        init_esm_shims$1();
        module.exports = rfdc2;
        function copyBuffer(cur) {
          if (cur instanceof Buffer) {
            return Buffer.from(cur);
          }
          return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length);
        }
        function rfdc2(opts) {
          opts = opts || {};
          if (opts.circles) return rfdcCircles(opts);
          const constructorHandlers = /* @__PURE__ */ new Map();
          constructorHandlers.set(Date, (o) => new Date(o));
          constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
          constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
          if (opts.constructorHandlers) {
            for (const handler2 of opts.constructorHandlers) {
              constructorHandlers.set(handler2[0], handler2[1]);
            }
          }
          let handler = null;
          return opts.proto ? cloneProto : clone;
          function cloneArray(a, fn) {
            const keys = Object.keys(a);
            const a2 = new Array(keys.length);
            for (let i = 0; i < keys.length; i++) {
              const k = keys[i];
              const cur = a[k];
              if (typeof cur !== "object" || cur === null) {
                a2[k] = cur;
              } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
                a2[k] = handler(cur, fn);
              } else if (ArrayBuffer.isView(cur)) {
                a2[k] = copyBuffer(cur);
              } else {
                a2[k] = fn(cur);
              }
            }
            return a2;
          }
          function clone(o) {
            if (typeof o !== "object" || o === null) return o;
            if (Array.isArray(o)) return cloneArray(o, clone);
            if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
              return handler(o, clone);
            }
            const o2 = {};
            for (const k in o) {
              if (Object.hasOwnProperty.call(o, k) === false) continue;
              const cur = o[k];
              if (typeof cur !== "object" || cur === null) {
                o2[k] = cur;
              } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
                o2[k] = handler(cur, clone);
              } else if (ArrayBuffer.isView(cur)) {
                o2[k] = copyBuffer(cur);
              } else {
                o2[k] = clone(cur);
              }
            }
            return o2;
          }
          function cloneProto(o) {
            if (typeof o !== "object" || o === null) return o;
            if (Array.isArray(o)) return cloneArray(o, cloneProto);
            if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
              return handler(o, cloneProto);
            }
            const o2 = {};
            for (const k in o) {
              const cur = o[k];
              if (typeof cur !== "object" || cur === null) {
                o2[k] = cur;
              } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
                o2[k] = handler(cur, cloneProto);
              } else if (ArrayBuffer.isView(cur)) {
                o2[k] = copyBuffer(cur);
              } else {
                o2[k] = cloneProto(cur);
              }
            }
            return o2;
          }
        }
        function rfdcCircles(opts) {
          const refs = [];
          const refsNew = [];
          const constructorHandlers = /* @__PURE__ */ new Map();
          constructorHandlers.set(Date, (o) => new Date(o));
          constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
          constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
          if (opts.constructorHandlers) {
            for (const handler2 of opts.constructorHandlers) {
              constructorHandlers.set(handler2[0], handler2[1]);
            }
          }
          let handler = null;
          return opts.proto ? cloneProto : clone;
          function cloneArray(a, fn) {
            const keys = Object.keys(a);
            const a2 = new Array(keys.length);
            for (let i = 0; i < keys.length; i++) {
              const k = keys[i];
              const cur = a[k];
              if (typeof cur !== "object" || cur === null) {
                a2[k] = cur;
              } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
                a2[k] = handler(cur, fn);
              } else if (ArrayBuffer.isView(cur)) {
                a2[k] = copyBuffer(cur);
              } else {
                const index = refs.indexOf(cur);
                if (index !== -1) {
                  a2[k] = refsNew[index];
                } else {
                  a2[k] = fn(cur);
                }
              }
            }
            return a2;
          }
          function clone(o) {
            if (typeof o !== "object" || o === null) return o;
            if (Array.isArray(o)) return cloneArray(o, clone);
            if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
              return handler(o, clone);
            }
            const o2 = {};
            refs.push(o);
            refsNew.push(o2);
            for (const k in o) {
              if (Object.hasOwnProperty.call(o, k) === false) continue;
              const cur = o[k];
              if (typeof cur !== "object" || cur === null) {
                o2[k] = cur;
              } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
                o2[k] = handler(cur, clone);
              } else if (ArrayBuffer.isView(cur)) {
                o2[k] = copyBuffer(cur);
              } else {
                const i = refs.indexOf(cur);
                if (i !== -1) {
                  o2[k] = refsNew[i];
                } else {
                  o2[k] = clone(cur);
                }
              }
            }
            refs.pop();
            refsNew.pop();
            return o2;
          }
          function cloneProto(o) {
            if (typeof o !== "object" || o === null) return o;
            if (Array.isArray(o)) return cloneArray(o, cloneProto);
            if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
              return handler(o, cloneProto);
            }
            const o2 = {};
            refs.push(o);
            refsNew.push(o2);
            for (const k in o) {
              const cur = o[k];
              if (typeof cur !== "object" || cur === null) {
                o2[k] = cur;
              } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
                o2[k] = handler(cur, cloneProto);
              } else if (ArrayBuffer.isView(cur)) {
                o2[k] = copyBuffer(cur);
              } else {
                const i = refs.indexOf(cur);
                if (i !== -1) {
                  o2[k] = refsNew[i];
                } else {
                  o2[k] = cloneProto(cur);
                }
              }
            }
            refs.pop();
            refsNew.pop();
            return o2;
          }
        }
      }
    });

    // src/index.ts
    init_esm_shims$1();

    // src/constants.ts
    init_esm_shims$1();

    // src/env.ts
    init_esm_shims$1();
    var isBrowser = typeof navigator !== "undefined";
    var target = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : {};
    typeof target.chrome !== "undefined" && !!target.chrome.devtools;
    isBrowser && target.self !== target.top;
    var _a$1;
    typeof navigator !== "undefined" && ((_a$1 = navigator.userAgent) == null ? void 0 : _a$1.toLowerCase().includes("electron"));

    // src/general.ts
    init_esm_shims$1();
    var import_rfdc = __toESM$1(require_rfdc());
    var classifyRE = /(?:^|[-_/])(\w)/g;
    function toUpper(_, c) {
      return c ? c.toUpperCase() : "";
    }
    function classify(str) {
      return str && `${str}`.replace(classifyRE, toUpper);
    }
    function basename(filename, ext) {
      let normalizedFilename = filename.replace(/^[a-z]:/i, "").replace(/\\/g, "/");
      if (normalizedFilename.endsWith(`index${ext}`)) {
        normalizedFilename = normalizedFilename.replace(`/index${ext}`, ext);
      }
      const lastSlashIndex = normalizedFilename.lastIndexOf("/");
      const baseNameWithExt = normalizedFilename.substring(lastSlashIndex + 1);
      {
        const extIndex = baseNameWithExt.lastIndexOf(ext);
        return baseNameWithExt.substring(0, extIndex);
      }
    }
    var deepClone = (0, import_rfdc.default)({ circles: true });

    const DEBOUNCE_DEFAULTS = {
      trailing: true
    };
    function debounce(fn, wait = 25, options = {}) {
      options = { ...DEBOUNCE_DEFAULTS, ...options };
      if (!Number.isFinite(wait)) {
        throw new TypeError("Expected `wait` to be a finite number");
      }
      let leadingValue;
      let timeout;
      let resolveList = [];
      let currentPromise;
      let trailingArgs;
      const applyFn = (_this, args) => {
        currentPromise = _applyPromised(fn, _this, args);
        currentPromise.finally(() => {
          currentPromise = null;
          if (options.trailing && trailingArgs && !timeout) {
            const promise = applyFn(_this, trailingArgs);
            trailingArgs = null;
            return promise;
          }
        });
        return currentPromise;
      };
      return function(...args) {
        if (currentPromise) {
          if (options.trailing) {
            trailingArgs = args;
          }
          return currentPromise;
        }
        return new Promise((resolve) => {
          const shouldCallNow = !timeout && options.leading;
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            timeout = null;
            const promise = options.leading ? leadingValue : applyFn(this, args);
            for (const _resolve of resolveList) {
              _resolve(promise);
            }
            resolveList = [];
          }, wait);
          if (shouldCallNow) {
            leadingValue = applyFn(this, args);
            resolve(leadingValue);
          } else {
            resolveList.push(resolve);
          }
        });
      };
    }
    async function _applyPromised(fn, _this, args) {
      return await fn.apply(_this, args);
    }

    function flatHooks(configHooks, hooks = {}, parentName) {
      for (const key in configHooks) {
        const subHook = configHooks[key];
        const name = parentName ? `${parentName}:${key}` : key;
        if (typeof subHook === "object" && subHook !== null) {
          flatHooks(subHook, hooks, name);
        } else if (typeof subHook === "function") {
          hooks[name] = subHook;
        }
      }
      return hooks;
    }
    const defaultTask = { run: (function_) => function_() };
    const _createTask = () => defaultTask;
    const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
    function serialTaskCaller(hooks, args) {
      const name = args.shift();
      const task = createTask(name);
      return hooks.reduce(
        (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
        Promise.resolve()
      );
    }
    function parallelTaskCaller(hooks, args) {
      const name = args.shift();
      const task = createTask(name);
      return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
    }
    function callEachWith(callbacks, arg0) {
      for (const callback of [...callbacks]) {
        callback(arg0);
      }
    }

    class Hookable {
      constructor() {
        this._hooks = {};
        this._before = void 0;
        this._after = void 0;
        this._deprecatedMessages = void 0;
        this._deprecatedHooks = {};
        this.hook = this.hook.bind(this);
        this.callHook = this.callHook.bind(this);
        this.callHookWith = this.callHookWith.bind(this);
      }
      hook(name, function_, options = {}) {
        if (!name || typeof function_ !== "function") {
          return () => {
          };
        }
        const originalName = name;
        let dep;
        while (this._deprecatedHooks[name]) {
          dep = this._deprecatedHooks[name];
          name = dep.to;
        }
        if (dep && !options.allowDeprecated) {
          let message = dep.message;
          if (!message) {
            message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
          }
          if (!this._deprecatedMessages) {
            this._deprecatedMessages = /* @__PURE__ */ new Set();
          }
          if (!this._deprecatedMessages.has(message)) {
            console.warn(message);
            this._deprecatedMessages.add(message);
          }
        }
        if (!function_.name) {
          try {
            Object.defineProperty(function_, "name", {
              get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
              configurable: true
            });
          } catch {
          }
        }
        this._hooks[name] = this._hooks[name] || [];
        this._hooks[name].push(function_);
        return () => {
          if (function_) {
            this.removeHook(name, function_);
            function_ = void 0;
          }
        };
      }
      hookOnce(name, function_) {
        let _unreg;
        let _function = (...arguments_) => {
          if (typeof _unreg === "function") {
            _unreg();
          }
          _unreg = void 0;
          _function = void 0;
          return function_(...arguments_);
        };
        _unreg = this.hook(name, _function);
        return _unreg;
      }
      removeHook(name, function_) {
        if (this._hooks[name]) {
          const index = this._hooks[name].indexOf(function_);
          if (index !== -1) {
            this._hooks[name].splice(index, 1);
          }
          if (this._hooks[name].length === 0) {
            delete this._hooks[name];
          }
        }
      }
      deprecateHook(name, deprecated) {
        this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
        const _hooks = this._hooks[name] || [];
        delete this._hooks[name];
        for (const hook of _hooks) {
          this.hook(name, hook);
        }
      }
      deprecateHooks(deprecatedHooks) {
        Object.assign(this._deprecatedHooks, deprecatedHooks);
        for (const name in deprecatedHooks) {
          this.deprecateHook(name, deprecatedHooks[name]);
        }
      }
      addHooks(configHooks) {
        const hooks = flatHooks(configHooks);
        const removeFns = Object.keys(hooks).map(
          (key) => this.hook(key, hooks[key])
        );
        return () => {
          for (const unreg of removeFns.splice(0, removeFns.length)) {
            unreg();
          }
        };
      }
      removeHooks(configHooks) {
        const hooks = flatHooks(configHooks);
        for (const key in hooks) {
          this.removeHook(key, hooks[key]);
        }
      }
      removeAllHooks() {
        for (const key in this._hooks) {
          delete this._hooks[key];
        }
      }
      callHook(name, ...arguments_) {
        arguments_.unshift(name);
        return this.callHookWith(serialTaskCaller, name, ...arguments_);
      }
      callHookParallel(name, ...arguments_) {
        arguments_.unshift(name);
        return this.callHookWith(parallelTaskCaller, name, ...arguments_);
      }
      callHookWith(caller, name, ...arguments_) {
        const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
        if (this._before) {
          callEachWith(this._before, event);
        }
        const result = caller(
          name in this._hooks ? [...this._hooks[name]] : [],
          arguments_
        );
        if (result instanceof Promise) {
          return result.finally(() => {
            if (this._after && event) {
              callEachWith(this._after, event);
            }
          });
        }
        if (this._after && event) {
          callEachWith(this._after, event);
        }
        return result;
      }
      beforeEach(function_) {
        this._before = this._before || [];
        this._before.push(function_);
        return () => {
          if (this._before !== void 0) {
            const index = this._before.indexOf(function_);
            if (index !== -1) {
              this._before.splice(index, 1);
            }
          }
        };
      }
      afterEach(function_) {
        this._after = this._after || [];
        this._after.push(function_);
        return () => {
          if (this._after !== void 0) {
            const index = this._after.indexOf(function_);
            if (index !== -1) {
              this._after.splice(index, 1);
            }
          }
        };
      }
    }
    function createHooks() {
      return new Hookable();
    }

    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __esm = (fn, res) => function __init() {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    };
    var __commonJS = (cb, mod) => function __require() {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM = (mod, isNodeMode, target22) => (target22 = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      __defProp(target22, "default", { value: mod, enumerable: true }) ,
      mod
    ));

    // ../../node_modules/.pnpm/tsup@8.3.0_@microsoft+api-extractor@7.43.0_@types+node@20.16.11__@swc+core@1.5.29_jiti@2.0.0__khi6fwhekjxtif3xyxfitrs5gq/node_modules/tsup/assets/esm_shims.js
    var init_esm_shims = __esm({
      "../../node_modules/.pnpm/tsup@8.3.0_@microsoft+api-extractor@7.43.0_@types+node@20.16.11__@swc+core@1.5.29_jiti@2.0.0__khi6fwhekjxtif3xyxfitrs5gq/node_modules/tsup/assets/esm_shims.js"() {
      }
    });

    // ../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/lib/speakingurl.js
    var require_speakingurl = __commonJS({
      "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/lib/speakingurl.js"(exports, module) {
        init_esm_shims();
        (function(root) {
          var charMap = {
            // latin
            "\xC0": "A",
            "\xC1": "A",
            "\xC2": "A",
            "\xC3": "A",
            "\xC4": "Ae",
            "\xC5": "A",
            "\xC6": "AE",
            "\xC7": "C",
            "\xC8": "E",
            "\xC9": "E",
            "\xCA": "E",
            "\xCB": "E",
            "\xCC": "I",
            "\xCD": "I",
            "\xCE": "I",
            "\xCF": "I",
            "\xD0": "D",
            "\xD1": "N",
            "\xD2": "O",
            "\xD3": "O",
            "\xD4": "O",
            "\xD5": "O",
            "\xD6": "Oe",
            "\u0150": "O",
            "\xD8": "O",
            "\xD9": "U",
            "\xDA": "U",
            "\xDB": "U",
            "\xDC": "Ue",
            "\u0170": "U",
            "\xDD": "Y",
            "\xDE": "TH",
            "\xDF": "ss",
            "\xE0": "a",
            "\xE1": "a",
            "\xE2": "a",
            "\xE3": "a",
            "\xE4": "ae",
            "\xE5": "a",
            "\xE6": "ae",
            "\xE7": "c",
            "\xE8": "e",
            "\xE9": "e",
            "\xEA": "e",
            "\xEB": "e",
            "\xEC": "i",
            "\xED": "i",
            "\xEE": "i",
            "\xEF": "i",
            "\xF0": "d",
            "\xF1": "n",
            "\xF2": "o",
            "\xF3": "o",
            "\xF4": "o",
            "\xF5": "o",
            "\xF6": "oe",
            "\u0151": "o",
            "\xF8": "o",
            "\xF9": "u",
            "\xFA": "u",
            "\xFB": "u",
            "\xFC": "ue",
            "\u0171": "u",
            "\xFD": "y",
            "\xFE": "th",
            "\xFF": "y",
            "\u1E9E": "SS",
            // language specific
            // Arabic
            "\u0627": "a",
            "\u0623": "a",
            "\u0625": "i",
            "\u0622": "aa",
            "\u0624": "u",
            "\u0626": "e",
            "\u0621": "a",
            "\u0628": "b",
            "\u062A": "t",
            "\u062B": "th",
            "\u062C": "j",
            "\u062D": "h",
            "\u062E": "kh",
            "\u062F": "d",
            "\u0630": "th",
            "\u0631": "r",
            "\u0632": "z",
            "\u0633": "s",
            "\u0634": "sh",
            "\u0635": "s",
            "\u0636": "dh",
            "\u0637": "t",
            "\u0638": "z",
            "\u0639": "a",
            "\u063A": "gh",
            "\u0641": "f",
            "\u0642": "q",
            "\u0643": "k",
            "\u0644": "l",
            "\u0645": "m",
            "\u0646": "n",
            "\u0647": "h",
            "\u0648": "w",
            "\u064A": "y",
            "\u0649": "a",
            "\u0629": "h",
            "\uFEFB": "la",
            "\uFEF7": "laa",
            "\uFEF9": "lai",
            "\uFEF5": "laa",
            // Persian additional characters than Arabic
            "\u06AF": "g",
            "\u0686": "ch",
            "\u067E": "p",
            "\u0698": "zh",
            "\u06A9": "k",
            "\u06CC": "y",
            // Arabic diactrics
            "\u064E": "a",
            "\u064B": "an",
            "\u0650": "e",
            "\u064D": "en",
            "\u064F": "u",
            "\u064C": "on",
            "\u0652": "",
            // Arabic numbers
            "\u0660": "0",
            "\u0661": "1",
            "\u0662": "2",
            "\u0663": "3",
            "\u0664": "4",
            "\u0665": "5",
            "\u0666": "6",
            "\u0667": "7",
            "\u0668": "8",
            "\u0669": "9",
            // Persian numbers
            "\u06F0": "0",
            "\u06F1": "1",
            "\u06F2": "2",
            "\u06F3": "3",
            "\u06F4": "4",
            "\u06F5": "5",
            "\u06F6": "6",
            "\u06F7": "7",
            "\u06F8": "8",
            "\u06F9": "9",
            // Burmese consonants
            "\u1000": "k",
            "\u1001": "kh",
            "\u1002": "g",
            "\u1003": "ga",
            "\u1004": "ng",
            "\u1005": "s",
            "\u1006": "sa",
            "\u1007": "z",
            "\u1005\u103B": "za",
            "\u100A": "ny",
            "\u100B": "t",
            "\u100C": "ta",
            "\u100D": "d",
            "\u100E": "da",
            "\u100F": "na",
            "\u1010": "t",
            "\u1011": "ta",
            "\u1012": "d",
            "\u1013": "da",
            "\u1014": "n",
            "\u1015": "p",
            "\u1016": "pa",
            "\u1017": "b",
            "\u1018": "ba",
            "\u1019": "m",
            "\u101A": "y",
            "\u101B": "ya",
            "\u101C": "l",
            "\u101D": "w",
            "\u101E": "th",
            "\u101F": "h",
            "\u1020": "la",
            "\u1021": "a",
            // consonant character combos
            "\u103C": "y",
            "\u103B": "ya",
            "\u103D": "w",
            "\u103C\u103D": "yw",
            "\u103B\u103D": "ywa",
            "\u103E": "h",
            // independent vowels
            "\u1027": "e",
            "\u104F": "-e",
            "\u1023": "i",
            "\u1024": "-i",
            "\u1009": "u",
            "\u1026": "-u",
            "\u1029": "aw",
            "\u101E\u103C\u1031\u102C": "aw",
            "\u102A": "aw",
            // numbers
            "\u1040": "0",
            "\u1041": "1",
            "\u1042": "2",
            "\u1043": "3",
            "\u1044": "4",
            "\u1045": "5",
            "\u1046": "6",
            "\u1047": "7",
            "\u1048": "8",
            "\u1049": "9",
            // virama and tone marks which are silent in transliteration
            "\u1039": "",
            "\u1037": "",
            "\u1038": "",
            // Czech
            "\u010D": "c",
            "\u010F": "d",
            "\u011B": "e",
            "\u0148": "n",
            "\u0159": "r",
            "\u0161": "s",
            "\u0165": "t",
            "\u016F": "u",
            "\u017E": "z",
            "\u010C": "C",
            "\u010E": "D",
            "\u011A": "E",
            "\u0147": "N",
            "\u0158": "R",
            "\u0160": "S",
            "\u0164": "T",
            "\u016E": "U",
            "\u017D": "Z",
            // Dhivehi
            "\u0780": "h",
            "\u0781": "sh",
            "\u0782": "n",
            "\u0783": "r",
            "\u0784": "b",
            "\u0785": "lh",
            "\u0786": "k",
            "\u0787": "a",
            "\u0788": "v",
            "\u0789": "m",
            "\u078A": "f",
            "\u078B": "dh",
            "\u078C": "th",
            "\u078D": "l",
            "\u078E": "g",
            "\u078F": "gn",
            "\u0790": "s",
            "\u0791": "d",
            "\u0792": "z",
            "\u0793": "t",
            "\u0794": "y",
            "\u0795": "p",
            "\u0796": "j",
            "\u0797": "ch",
            "\u0798": "tt",
            "\u0799": "hh",
            "\u079A": "kh",
            "\u079B": "th",
            "\u079C": "z",
            "\u079D": "sh",
            "\u079E": "s",
            "\u079F": "d",
            "\u07A0": "t",
            "\u07A1": "z",
            "\u07A2": "a",
            "\u07A3": "gh",
            "\u07A4": "q",
            "\u07A5": "w",
            "\u07A6": "a",
            "\u07A7": "aa",
            "\u07A8": "i",
            "\u07A9": "ee",
            "\u07AA": "u",
            "\u07AB": "oo",
            "\u07AC": "e",
            "\u07AD": "ey",
            "\u07AE": "o",
            "\u07AF": "oa",
            "\u07B0": "",
            // Georgian https://en.wikipedia.org/wiki/Romanization_of_Georgian
            // National system (2002)
            "\u10D0": "a",
            "\u10D1": "b",
            "\u10D2": "g",
            "\u10D3": "d",
            "\u10D4": "e",
            "\u10D5": "v",
            "\u10D6": "z",
            "\u10D7": "t",
            "\u10D8": "i",
            "\u10D9": "k",
            "\u10DA": "l",
            "\u10DB": "m",
            "\u10DC": "n",
            "\u10DD": "o",
            "\u10DE": "p",
            "\u10DF": "zh",
            "\u10E0": "r",
            "\u10E1": "s",
            "\u10E2": "t",
            "\u10E3": "u",
            "\u10E4": "p",
            "\u10E5": "k",
            "\u10E6": "gh",
            "\u10E7": "q",
            "\u10E8": "sh",
            "\u10E9": "ch",
            "\u10EA": "ts",
            "\u10EB": "dz",
            "\u10EC": "ts",
            "\u10ED": "ch",
            "\u10EE": "kh",
            "\u10EF": "j",
            "\u10F0": "h",
            // Greek
            "\u03B1": "a",
            "\u03B2": "v",
            "\u03B3": "g",
            "\u03B4": "d",
            "\u03B5": "e",
            "\u03B6": "z",
            "\u03B7": "i",
            "\u03B8": "th",
            "\u03B9": "i",
            "\u03BA": "k",
            "\u03BB": "l",
            "\u03BC": "m",
            "\u03BD": "n",
            "\u03BE": "ks",
            "\u03BF": "o",
            "\u03C0": "p",
            "\u03C1": "r",
            "\u03C3": "s",
            "\u03C4": "t",
            "\u03C5": "y",
            "\u03C6": "f",
            "\u03C7": "x",
            "\u03C8": "ps",
            "\u03C9": "o",
            "\u03AC": "a",
            "\u03AD": "e",
            "\u03AF": "i",
            "\u03CC": "o",
            "\u03CD": "y",
            "\u03AE": "i",
            "\u03CE": "o",
            "\u03C2": "s",
            "\u03CA": "i",
            "\u03B0": "y",
            "\u03CB": "y",
            "\u0390": "i",
            "\u0391": "A",
            "\u0392": "B",
            "\u0393": "G",
            "\u0394": "D",
            "\u0395": "E",
            "\u0396": "Z",
            "\u0397": "I",
            "\u0398": "TH",
            "\u0399": "I",
            "\u039A": "K",
            "\u039B": "L",
            "\u039C": "M",
            "\u039D": "N",
            "\u039E": "KS",
            "\u039F": "O",
            "\u03A0": "P",
            "\u03A1": "R",
            "\u03A3": "S",
            "\u03A4": "T",
            "\u03A5": "Y",
            "\u03A6": "F",
            "\u03A7": "X",
            "\u03A8": "PS",
            "\u03A9": "O",
            "\u0386": "A",
            "\u0388": "E",
            "\u038A": "I",
            "\u038C": "O",
            "\u038E": "Y",
            "\u0389": "I",
            "\u038F": "O",
            "\u03AA": "I",
            "\u03AB": "Y",
            // Latvian
            "\u0101": "a",
            // 'č': 'c', // duplicate
            "\u0113": "e",
            "\u0123": "g",
            "\u012B": "i",
            "\u0137": "k",
            "\u013C": "l",
            "\u0146": "n",
            // 'š': 's', // duplicate
            "\u016B": "u",
            // 'ž': 'z', // duplicate
            "\u0100": "A",
            // 'Č': 'C', // duplicate
            "\u0112": "E",
            "\u0122": "G",
            "\u012A": "I",
            "\u0136": "k",
            "\u013B": "L",
            "\u0145": "N",
            // 'Š': 'S', // duplicate
            "\u016A": "U",
            // 'Ž': 'Z', // duplicate
            // Macedonian
            "\u040C": "Kj",
            "\u045C": "kj",
            "\u0409": "Lj",
            "\u0459": "lj",
            "\u040A": "Nj",
            "\u045A": "nj",
            "\u0422\u0441": "Ts",
            "\u0442\u0441": "ts",
            // Polish
            "\u0105": "a",
            "\u0107": "c",
            "\u0119": "e",
            "\u0142": "l",
            "\u0144": "n",
            // 'ó': 'o', // duplicate
            "\u015B": "s",
            "\u017A": "z",
            "\u017C": "z",
            "\u0104": "A",
            "\u0106": "C",
            "\u0118": "E",
            "\u0141": "L",
            "\u0143": "N",
            "\u015A": "S",
            "\u0179": "Z",
            "\u017B": "Z",
            // Ukranian
            "\u0404": "Ye",
            "\u0406": "I",
            "\u0407": "Yi",
            "\u0490": "G",
            "\u0454": "ye",
            "\u0456": "i",
            "\u0457": "yi",
            "\u0491": "g",
            // Romanian
            "\u0103": "a",
            "\u0102": "A",
            "\u0219": "s",
            "\u0218": "S",
            // 'ş': 's', // duplicate
            // 'Ş': 'S', // duplicate
            "\u021B": "t",
            "\u021A": "T",
            "\u0163": "t",
            "\u0162": "T",
            // Russian https://en.wikipedia.org/wiki/Romanization_of_Russian
            // ICAO
            "\u0430": "a",
            "\u0431": "b",
            "\u0432": "v",
            "\u0433": "g",
            "\u0434": "d",
            "\u0435": "e",
            "\u0451": "yo",
            "\u0436": "zh",
            "\u0437": "z",
            "\u0438": "i",
            "\u0439": "i",
            "\u043A": "k",
            "\u043B": "l",
            "\u043C": "m",
            "\u043D": "n",
            "\u043E": "o",
            "\u043F": "p",
            "\u0440": "r",
            "\u0441": "s",
            "\u0442": "t",
            "\u0443": "u",
            "\u0444": "f",
            "\u0445": "kh",
            "\u0446": "c",
            "\u0447": "ch",
            "\u0448": "sh",
            "\u0449": "sh",
            "\u044A": "",
            "\u044B": "y",
            "\u044C": "",
            "\u044D": "e",
            "\u044E": "yu",
            "\u044F": "ya",
            "\u0410": "A",
            "\u0411": "B",
            "\u0412": "V",
            "\u0413": "G",
            "\u0414": "D",
            "\u0415": "E",
            "\u0401": "Yo",
            "\u0416": "Zh",
            "\u0417": "Z",
            "\u0418": "I",
            "\u0419": "I",
            "\u041A": "K",
            "\u041B": "L",
            "\u041C": "M",
            "\u041D": "N",
            "\u041E": "O",
            "\u041F": "P",
            "\u0420": "R",
            "\u0421": "S",
            "\u0422": "T",
            "\u0423": "U",
            "\u0424": "F",
            "\u0425": "Kh",
            "\u0426": "C",
            "\u0427": "Ch",
            "\u0428": "Sh",
            "\u0429": "Sh",
            "\u042A": "",
            "\u042B": "Y",
            "\u042C": "",
            "\u042D": "E",
            "\u042E": "Yu",
            "\u042F": "Ya",
            // Serbian
            "\u0452": "dj",
            "\u0458": "j",
            // 'љ': 'lj',  // duplicate
            // 'њ': 'nj', // duplicate
            "\u045B": "c",
            "\u045F": "dz",
            "\u0402": "Dj",
            "\u0408": "j",
            // 'Љ': 'Lj', // duplicate
            // 'Њ': 'Nj', // duplicate
            "\u040B": "C",
            "\u040F": "Dz",
            // Slovak
            "\u013E": "l",
            "\u013A": "l",
            "\u0155": "r",
            "\u013D": "L",
            "\u0139": "L",
            "\u0154": "R",
            // Turkish
            "\u015F": "s",
            "\u015E": "S",
            "\u0131": "i",
            "\u0130": "I",
            // 'ç': 'c', // duplicate
            // 'Ç': 'C', // duplicate
            // 'ü': 'u', // duplicate, see langCharMap
            // 'Ü': 'U', // duplicate, see langCharMap
            // 'ö': 'o', // duplicate, see langCharMap
            // 'Ö': 'O', // duplicate, see langCharMap
            "\u011F": "g",
            "\u011E": "G",
            // Vietnamese
            "\u1EA3": "a",
            "\u1EA2": "A",
            "\u1EB3": "a",
            "\u1EB2": "A",
            "\u1EA9": "a",
            "\u1EA8": "A",
            "\u0111": "d",
            "\u0110": "D",
            "\u1EB9": "e",
            "\u1EB8": "E",
            "\u1EBD": "e",
            "\u1EBC": "E",
            "\u1EBB": "e",
            "\u1EBA": "E",
            "\u1EBF": "e",
            "\u1EBE": "E",
            "\u1EC1": "e",
            "\u1EC0": "E",
            "\u1EC7": "e",
            "\u1EC6": "E",
            "\u1EC5": "e",
            "\u1EC4": "E",
            "\u1EC3": "e",
            "\u1EC2": "E",
            "\u1ECF": "o",
            "\u1ECD": "o",
            "\u1ECC": "o",
            "\u1ED1": "o",
            "\u1ED0": "O",
            "\u1ED3": "o",
            "\u1ED2": "O",
            "\u1ED5": "o",
            "\u1ED4": "O",
            "\u1ED9": "o",
            "\u1ED8": "O",
            "\u1ED7": "o",
            "\u1ED6": "O",
            "\u01A1": "o",
            "\u01A0": "O",
            "\u1EDB": "o",
            "\u1EDA": "O",
            "\u1EDD": "o",
            "\u1EDC": "O",
            "\u1EE3": "o",
            "\u1EE2": "O",
            "\u1EE1": "o",
            "\u1EE0": "O",
            "\u1EDE": "o",
            "\u1EDF": "o",
            "\u1ECB": "i",
            "\u1ECA": "I",
            "\u0129": "i",
            "\u0128": "I",
            "\u1EC9": "i",
            "\u1EC8": "i",
            "\u1EE7": "u",
            "\u1EE6": "U",
            "\u1EE5": "u",
            "\u1EE4": "U",
            "\u0169": "u",
            "\u0168": "U",
            "\u01B0": "u",
            "\u01AF": "U",
            "\u1EE9": "u",
            "\u1EE8": "U",
            "\u1EEB": "u",
            "\u1EEA": "U",
            "\u1EF1": "u",
            "\u1EF0": "U",
            "\u1EEF": "u",
            "\u1EEE": "U",
            "\u1EED": "u",
            "\u1EEC": "\u01B0",
            "\u1EF7": "y",
            "\u1EF6": "y",
            "\u1EF3": "y",
            "\u1EF2": "Y",
            "\u1EF5": "y",
            "\u1EF4": "Y",
            "\u1EF9": "y",
            "\u1EF8": "Y",
            "\u1EA1": "a",
            "\u1EA0": "A",
            "\u1EA5": "a",
            "\u1EA4": "A",
            "\u1EA7": "a",
            "\u1EA6": "A",
            "\u1EAD": "a",
            "\u1EAC": "A",
            "\u1EAB": "a",
            "\u1EAA": "A",
            // 'ă': 'a', // duplicate
            // 'Ă': 'A', // duplicate
            "\u1EAF": "a",
            "\u1EAE": "A",
            "\u1EB1": "a",
            "\u1EB0": "A",
            "\u1EB7": "a",
            "\u1EB6": "A",
            "\u1EB5": "a",
            "\u1EB4": "A",
            "\u24EA": "0",
            "\u2460": "1",
            "\u2461": "2",
            "\u2462": "3",
            "\u2463": "4",
            "\u2464": "5",
            "\u2465": "6",
            "\u2466": "7",
            "\u2467": "8",
            "\u2468": "9",
            "\u2469": "10",
            "\u246A": "11",
            "\u246B": "12",
            "\u246C": "13",
            "\u246D": "14",
            "\u246E": "15",
            "\u246F": "16",
            "\u2470": "17",
            "\u2471": "18",
            "\u2472": "18",
            "\u2473": "18",
            "\u24F5": "1",
            "\u24F6": "2",
            "\u24F7": "3",
            "\u24F8": "4",
            "\u24F9": "5",
            "\u24FA": "6",
            "\u24FB": "7",
            "\u24FC": "8",
            "\u24FD": "9",
            "\u24FE": "10",
            "\u24FF": "0",
            "\u24EB": "11",
            "\u24EC": "12",
            "\u24ED": "13",
            "\u24EE": "14",
            "\u24EF": "15",
            "\u24F0": "16",
            "\u24F1": "17",
            "\u24F2": "18",
            "\u24F3": "19",
            "\u24F4": "20",
            "\u24B6": "A",
            "\u24B7": "B",
            "\u24B8": "C",
            "\u24B9": "D",
            "\u24BA": "E",
            "\u24BB": "F",
            "\u24BC": "G",
            "\u24BD": "H",
            "\u24BE": "I",
            "\u24BF": "J",
            "\u24C0": "K",
            "\u24C1": "L",
            "\u24C2": "M",
            "\u24C3": "N",
            "\u24C4": "O",
            "\u24C5": "P",
            "\u24C6": "Q",
            "\u24C7": "R",
            "\u24C8": "S",
            "\u24C9": "T",
            "\u24CA": "U",
            "\u24CB": "V",
            "\u24CC": "W",
            "\u24CD": "X",
            "\u24CE": "Y",
            "\u24CF": "Z",
            "\u24D0": "a",
            "\u24D1": "b",
            "\u24D2": "c",
            "\u24D3": "d",
            "\u24D4": "e",
            "\u24D5": "f",
            "\u24D6": "g",
            "\u24D7": "h",
            "\u24D8": "i",
            "\u24D9": "j",
            "\u24DA": "k",
            "\u24DB": "l",
            "\u24DC": "m",
            "\u24DD": "n",
            "\u24DE": "o",
            "\u24DF": "p",
            "\u24E0": "q",
            "\u24E1": "r",
            "\u24E2": "s",
            "\u24E3": "t",
            "\u24E4": "u",
            "\u24E6": "v",
            "\u24E5": "w",
            "\u24E7": "x",
            "\u24E8": "y",
            "\u24E9": "z",
            // symbols
            "\u201C": '"',
            "\u201D": '"',
            "\u2018": "'",
            "\u2019": "'",
            "\u2202": "d",
            "\u0192": "f",
            "\u2122": "(TM)",
            "\xA9": "(C)",
            "\u0153": "oe",
            "\u0152": "OE",
            "\xAE": "(R)",
            "\u2020": "+",
            "\u2120": "(SM)",
            "\u2026": "...",
            "\u02DA": "o",
            "\xBA": "o",
            "\xAA": "a",
            "\u2022": "*",
            "\u104A": ",",
            "\u104B": ".",
            // currency
            "$": "USD",
            "\u20AC": "EUR",
            "\u20A2": "BRN",
            "\u20A3": "FRF",
            "\xA3": "GBP",
            "\u20A4": "ITL",
            "\u20A6": "NGN",
            "\u20A7": "ESP",
            "\u20A9": "KRW",
            "\u20AA": "ILS",
            "\u20AB": "VND",
            "\u20AD": "LAK",
            "\u20AE": "MNT",
            "\u20AF": "GRD",
            "\u20B1": "ARS",
            "\u20B2": "PYG",
            "\u20B3": "ARA",
            "\u20B4": "UAH",
            "\u20B5": "GHS",
            "\xA2": "cent",
            "\xA5": "CNY",
            "\u5143": "CNY",
            "\u5186": "YEN",
            "\uFDFC": "IRR",
            "\u20A0": "EWE",
            "\u0E3F": "THB",
            "\u20A8": "INR",
            "\u20B9": "INR",
            "\u20B0": "PF",
            "\u20BA": "TRY",
            "\u060B": "AFN",
            "\u20BC": "AZN",
            "\u043B\u0432": "BGN",
            "\u17DB": "KHR",
            "\u20A1": "CRC",
            "\u20B8": "KZT",
            "\u0434\u0435\u043D": "MKD",
            "z\u0142": "PLN",
            "\u20BD": "RUB",
            "\u20BE": "GEL"
          };
          var lookAheadCharArray = [
            // burmese
            "\u103A",
            // Dhivehi
            "\u07B0"
          ];
          var diatricMap = {
            // Burmese
            // dependent vowels
            "\u102C": "a",
            "\u102B": "a",
            "\u1031": "e",
            "\u1032": "e",
            "\u102D": "i",
            "\u102E": "i",
            "\u102D\u102F": "o",
            "\u102F": "u",
            "\u1030": "u",
            "\u1031\u102B\u1004\u103A": "aung",
            "\u1031\u102C": "aw",
            "\u1031\u102C\u103A": "aw",
            "\u1031\u102B": "aw",
            "\u1031\u102B\u103A": "aw",
            "\u103A": "\u103A",
            // this is special case but the character will be converted to latin in the code
            "\u1000\u103A": "et",
            "\u102D\u102F\u1000\u103A": "aik",
            "\u1031\u102C\u1000\u103A": "auk",
            "\u1004\u103A": "in",
            "\u102D\u102F\u1004\u103A": "aing",
            "\u1031\u102C\u1004\u103A": "aung",
            "\u1005\u103A": "it",
            "\u100A\u103A": "i",
            "\u1010\u103A": "at",
            "\u102D\u1010\u103A": "eik",
            "\u102F\u1010\u103A": "ok",
            "\u103D\u1010\u103A": "ut",
            "\u1031\u1010\u103A": "it",
            "\u1012\u103A": "d",
            "\u102D\u102F\u1012\u103A": "ok",
            "\u102F\u1012\u103A": "ait",
            "\u1014\u103A": "an",
            "\u102C\u1014\u103A": "an",
            "\u102D\u1014\u103A": "ein",
            "\u102F\u1014\u103A": "on",
            "\u103D\u1014\u103A": "un",
            "\u1015\u103A": "at",
            "\u102D\u1015\u103A": "eik",
            "\u102F\u1015\u103A": "ok",
            "\u103D\u1015\u103A": "ut",
            "\u1014\u103A\u102F\u1015\u103A": "nub",
            "\u1019\u103A": "an",
            "\u102D\u1019\u103A": "ein",
            "\u102F\u1019\u103A": "on",
            "\u103D\u1019\u103A": "un",
            "\u101A\u103A": "e",
            "\u102D\u102F\u101C\u103A": "ol",
            "\u1009\u103A": "in",
            "\u1036": "an",
            "\u102D\u1036": "ein",
            "\u102F\u1036": "on",
            // Dhivehi
            "\u07A6\u0787\u07B0": "ah",
            "\u07A6\u0781\u07B0": "ah"
          };
          var langCharMap = {
            "en": {},
            // default language
            "az": {
              // Azerbaijani
              "\xE7": "c",
              "\u0259": "e",
              "\u011F": "g",
              "\u0131": "i",
              "\xF6": "o",
              "\u015F": "s",
              "\xFC": "u",
              "\xC7": "C",
              "\u018F": "E",
              "\u011E": "G",
              "\u0130": "I",
              "\xD6": "O",
              "\u015E": "S",
              "\xDC": "U"
            },
            "cs": {
              // Czech
              "\u010D": "c",
              "\u010F": "d",
              "\u011B": "e",
              "\u0148": "n",
              "\u0159": "r",
              "\u0161": "s",
              "\u0165": "t",
              "\u016F": "u",
              "\u017E": "z",
              "\u010C": "C",
              "\u010E": "D",
              "\u011A": "E",
              "\u0147": "N",
              "\u0158": "R",
              "\u0160": "S",
              "\u0164": "T",
              "\u016E": "U",
              "\u017D": "Z"
            },
            "fi": {
              // Finnish
              // 'å': 'a', duplicate see charMap/latin
              // 'Å': 'A', duplicate see charMap/latin
              "\xE4": "a",
              // ok
              "\xC4": "A",
              // ok
              "\xF6": "o",
              // ok
              "\xD6": "O"
              // ok
            },
            "hu": {
              // Hungarian
              "\xE4": "a",
              // ok
              "\xC4": "A",
              // ok
              // 'á': 'a', duplicate see charMap/latin
              // 'Á': 'A', duplicate see charMap/latin
              "\xF6": "o",
              // ok
              "\xD6": "O",
              // ok
              // 'ő': 'o', duplicate see charMap/latin
              // 'Ő': 'O', duplicate see charMap/latin
              "\xFC": "u",
              "\xDC": "U",
              "\u0171": "u",
              "\u0170": "U"
            },
            "lt": {
              // Lithuanian
              "\u0105": "a",
              "\u010D": "c",
              "\u0119": "e",
              "\u0117": "e",
              "\u012F": "i",
              "\u0161": "s",
              "\u0173": "u",
              "\u016B": "u",
              "\u017E": "z",
              "\u0104": "A",
              "\u010C": "C",
              "\u0118": "E",
              "\u0116": "E",
              "\u012E": "I",
              "\u0160": "S",
              "\u0172": "U",
              "\u016A": "U"
            },
            "lv": {
              // Latvian
              "\u0101": "a",
              "\u010D": "c",
              "\u0113": "e",
              "\u0123": "g",
              "\u012B": "i",
              "\u0137": "k",
              "\u013C": "l",
              "\u0146": "n",
              "\u0161": "s",
              "\u016B": "u",
              "\u017E": "z",
              "\u0100": "A",
              "\u010C": "C",
              "\u0112": "E",
              "\u0122": "G",
              "\u012A": "i",
              "\u0136": "k",
              "\u013B": "L",
              "\u0145": "N",
              "\u0160": "S",
              "\u016A": "u",
              "\u017D": "Z"
            },
            "pl": {
              // Polish
              "\u0105": "a",
              "\u0107": "c",
              "\u0119": "e",
              "\u0142": "l",
              "\u0144": "n",
              "\xF3": "o",
              "\u015B": "s",
              "\u017A": "z",
              "\u017C": "z",
              "\u0104": "A",
              "\u0106": "C",
              "\u0118": "e",
              "\u0141": "L",
              "\u0143": "N",
              "\xD3": "O",
              "\u015A": "S",
              "\u0179": "Z",
              "\u017B": "Z"
            },
            "sv": {
              // Swedish
              // 'å': 'a', duplicate see charMap/latin
              // 'Å': 'A', duplicate see charMap/latin
              "\xE4": "a",
              // ok
              "\xC4": "A",
              // ok
              "\xF6": "o",
              // ok
              "\xD6": "O"
              // ok
            },
            "sk": {
              // Slovak
              "\xE4": "a",
              "\xC4": "A"
            },
            "sr": {
              // Serbian
              "\u0459": "lj",
              "\u045A": "nj",
              "\u0409": "Lj",
              "\u040A": "Nj",
              "\u0111": "dj",
              "\u0110": "Dj"
            },
            "tr": {
              // Turkish
              "\xDC": "U",
              "\xD6": "O",
              "\xFC": "u",
              "\xF6": "o"
            }
          };
          var symbolMap = {
            "ar": {
              "\u2206": "delta",
              "\u221E": "la-nihaya",
              "\u2665": "hob",
              "&": "wa",
              "|": "aw",
              "<": "aqal-men",
              ">": "akbar-men",
              "\u2211": "majmou",
              "\xA4": "omla"
            },
            "az": {},
            "ca": {
              "\u2206": "delta",
              "\u221E": "infinit",
              "\u2665": "amor",
              "&": "i",
              "|": "o",
              "<": "menys que",
              ">": "mes que",
              "\u2211": "suma dels",
              "\xA4": "moneda"
            },
            "cs": {
              "\u2206": "delta",
              "\u221E": "nekonecno",
              "\u2665": "laska",
              "&": "a",
              "|": "nebo",
              "<": "mensi nez",
              ">": "vetsi nez",
              "\u2211": "soucet",
              "\xA4": "mena"
            },
            "de": {
              "\u2206": "delta",
              "\u221E": "unendlich",
              "\u2665": "Liebe",
              "&": "und",
              "|": "oder",
              "<": "kleiner als",
              ">": "groesser als",
              "\u2211": "Summe von",
              "\xA4": "Waehrung"
            },
            "dv": {
              "\u2206": "delta",
              "\u221E": "kolunulaa",
              "\u2665": "loabi",
              "&": "aai",
              "|": "noonee",
              "<": "ah vure kuda",
              ">": "ah vure bodu",
              "\u2211": "jumula",
              "\xA4": "faisaa"
            },
            "en": {
              "\u2206": "delta",
              "\u221E": "infinity",
              "\u2665": "love",
              "&": "and",
              "|": "or",
              "<": "less than",
              ">": "greater than",
              "\u2211": "sum",
              "\xA4": "currency"
            },
            "es": {
              "\u2206": "delta",
              "\u221E": "infinito",
              "\u2665": "amor",
              "&": "y",
              "|": "u",
              "<": "menos que",
              ">": "mas que",
              "\u2211": "suma de los",
              "\xA4": "moneda"
            },
            "fa": {
              "\u2206": "delta",
              "\u221E": "bi-nahayat",
              "\u2665": "eshgh",
              "&": "va",
              "|": "ya",
              "<": "kamtar-az",
              ">": "bishtar-az",
              "\u2211": "majmooe",
              "\xA4": "vahed"
            },
            "fi": {
              "\u2206": "delta",
              "\u221E": "aarettomyys",
              "\u2665": "rakkaus",
              "&": "ja",
              "|": "tai",
              "<": "pienempi kuin",
              ">": "suurempi kuin",
              "\u2211": "summa",
              "\xA4": "valuutta"
            },
            "fr": {
              "\u2206": "delta",
              "\u221E": "infiniment",
              "\u2665": "Amour",
              "&": "et",
              "|": "ou",
              "<": "moins que",
              ">": "superieure a",
              "\u2211": "somme des",
              "\xA4": "monnaie"
            },
            "ge": {
              "\u2206": "delta",
              "\u221E": "usasruloba",
              "\u2665": "siqvaruli",
              "&": "da",
              "|": "an",
              "<": "naklebi",
              ">": "meti",
              "\u2211": "jami",
              "\xA4": "valuta"
            },
            "gr": {},
            "hu": {
              "\u2206": "delta",
              "\u221E": "vegtelen",
              "\u2665": "szerelem",
              "&": "es",
              "|": "vagy",
              "<": "kisebb mint",
              ">": "nagyobb mint",
              "\u2211": "szumma",
              "\xA4": "penznem"
            },
            "it": {
              "\u2206": "delta",
              "\u221E": "infinito",
              "\u2665": "amore",
              "&": "e",
              "|": "o",
              "<": "minore di",
              ">": "maggiore di",
              "\u2211": "somma",
              "\xA4": "moneta"
            },
            "lt": {
              "\u2206": "delta",
              "\u221E": "begalybe",
              "\u2665": "meile",
              "&": "ir",
              "|": "ar",
              "<": "maziau nei",
              ">": "daugiau nei",
              "\u2211": "suma",
              "\xA4": "valiuta"
            },
            "lv": {
              "\u2206": "delta",
              "\u221E": "bezgaliba",
              "\u2665": "milestiba",
              "&": "un",
              "|": "vai",
              "<": "mazak neka",
              ">": "lielaks neka",
              "\u2211": "summa",
              "\xA4": "valuta"
            },
            "my": {
              "\u2206": "kwahkhyaet",
              "\u221E": "asaonasme",
              "\u2665": "akhyait",
              "&": "nhin",
              "|": "tho",
              "<": "ngethaw",
              ">": "kyithaw",
              "\u2211": "paungld",
              "\xA4": "ngwekye"
            },
            "mk": {},
            "nl": {
              "\u2206": "delta",
              "\u221E": "oneindig",
              "\u2665": "liefde",
              "&": "en",
              "|": "of",
              "<": "kleiner dan",
              ">": "groter dan",
              "\u2211": "som",
              "\xA4": "valuta"
            },
            "pl": {
              "\u2206": "delta",
              "\u221E": "nieskonczonosc",
              "\u2665": "milosc",
              "&": "i",
              "|": "lub",
              "<": "mniejsze niz",
              ">": "wieksze niz",
              "\u2211": "suma",
              "\xA4": "waluta"
            },
            "pt": {
              "\u2206": "delta",
              "\u221E": "infinito",
              "\u2665": "amor",
              "&": "e",
              "|": "ou",
              "<": "menor que",
              ">": "maior que",
              "\u2211": "soma",
              "\xA4": "moeda"
            },
            "ro": {
              "\u2206": "delta",
              "\u221E": "infinit",
              "\u2665": "dragoste",
              "&": "si",
              "|": "sau",
              "<": "mai mic ca",
              ">": "mai mare ca",
              "\u2211": "suma",
              "\xA4": "valuta"
            },
            "ru": {
              "\u2206": "delta",
              "\u221E": "beskonechno",
              "\u2665": "lubov",
              "&": "i",
              "|": "ili",
              "<": "menshe",
              ">": "bolshe",
              "\u2211": "summa",
              "\xA4": "valjuta"
            },
            "sk": {
              "\u2206": "delta",
              "\u221E": "nekonecno",
              "\u2665": "laska",
              "&": "a",
              "|": "alebo",
              "<": "menej ako",
              ">": "viac ako",
              "\u2211": "sucet",
              "\xA4": "mena"
            },
            "sr": {},
            "tr": {
              "\u2206": "delta",
              "\u221E": "sonsuzluk",
              "\u2665": "ask",
              "&": "ve",
              "|": "veya",
              "<": "kucuktur",
              ">": "buyuktur",
              "\u2211": "toplam",
              "\xA4": "para birimi"
            },
            "uk": {
              "\u2206": "delta",
              "\u221E": "bezkinechnist",
              "\u2665": "lubov",
              "&": "i",
              "|": "abo",
              "<": "menshe",
              ">": "bilshe",
              "\u2211": "suma",
              "\xA4": "valjuta"
            },
            "vn": {
              "\u2206": "delta",
              "\u221E": "vo cuc",
              "\u2665": "yeu",
              "&": "va",
              "|": "hoac",
              "<": "nho hon",
              ">": "lon hon",
              "\u2211": "tong",
              "\xA4": "tien te"
            }
          };
          var uricChars = [";", "?", ":", "@", "&", "=", "+", "$", ",", "/"].join("");
          var uricNoSlashChars = [";", "?", ":", "@", "&", "=", "+", "$", ","].join("");
          var markChars = [".", "!", "~", "*", "'", "(", ")"].join("");
          var getSlug = function getSlug2(input, opts) {
            var separator = "-";
            var result = "";
            var diatricString = "";
            var convertSymbols = true;
            var customReplacements = {};
            var maintainCase;
            var titleCase;
            var truncate;
            var uricFlag;
            var uricNoSlashFlag;
            var markFlag;
            var symbol;
            var langChar;
            var lucky;
            var i;
            var ch;
            var l;
            var lastCharWasSymbol;
            var lastCharWasDiatric;
            var allowedChars = "";
            if (typeof input !== "string") {
              return "";
            }
            if (typeof opts === "string") {
              separator = opts;
            }
            symbol = symbolMap.en;
            langChar = langCharMap.en;
            if (typeof opts === "object") {
              maintainCase = opts.maintainCase || false;
              customReplacements = opts.custom && typeof opts.custom === "object" ? opts.custom : customReplacements;
              truncate = +opts.truncate > 1 && opts.truncate || false;
              uricFlag = opts.uric || false;
              uricNoSlashFlag = opts.uricNoSlash || false;
              markFlag = opts.mark || false;
              convertSymbols = opts.symbols === false || opts.lang === false ? false : true;
              separator = opts.separator || separator;
              if (uricFlag) {
                allowedChars += uricChars;
              }
              if (uricNoSlashFlag) {
                allowedChars += uricNoSlashChars;
              }
              if (markFlag) {
                allowedChars += markChars;
              }
              symbol = opts.lang && symbolMap[opts.lang] && convertSymbols ? symbolMap[opts.lang] : convertSymbols ? symbolMap.en : {};
              langChar = opts.lang && langCharMap[opts.lang] ? langCharMap[opts.lang] : opts.lang === false || opts.lang === true ? {} : langCharMap.en;
              if (opts.titleCase && typeof opts.titleCase.length === "number" && Array.prototype.toString.call(opts.titleCase)) {
                opts.titleCase.forEach(function(v) {
                  customReplacements[v + ""] = v + "";
                });
                titleCase = true;
              } else {
                titleCase = !!opts.titleCase;
              }
              if (opts.custom && typeof opts.custom.length === "number" && Array.prototype.toString.call(opts.custom)) {
                opts.custom.forEach(function(v) {
                  customReplacements[v + ""] = v + "";
                });
              }
              Object.keys(customReplacements).forEach(function(v) {
                var r;
                if (v.length > 1) {
                  r = new RegExp("\\b" + escapeChars(v) + "\\b", "gi");
                } else {
                  r = new RegExp(escapeChars(v), "gi");
                }
                input = input.replace(r, customReplacements[v]);
              });
              for (ch in customReplacements) {
                allowedChars += ch;
              }
            }
            allowedChars += separator;
            allowedChars = escapeChars(allowedChars);
            input = input.replace(/(^\s+|\s+$)/g, "");
            lastCharWasSymbol = false;
            lastCharWasDiatric = false;
            for (i = 0, l = input.length; i < l; i++) {
              ch = input[i];
              if (isReplacedCustomChar(ch, customReplacements)) {
                lastCharWasSymbol = false;
              } else if (langChar[ch]) {
                ch = lastCharWasSymbol && langChar[ch].match(/[A-Za-z0-9]/) ? " " + langChar[ch] : langChar[ch];
                lastCharWasSymbol = false;
              } else if (ch in charMap) {
                if (i + 1 < l && lookAheadCharArray.indexOf(input[i + 1]) >= 0) {
                  diatricString += ch;
                  ch = "";
                } else if (lastCharWasDiatric === true) {
                  ch = diatricMap[diatricString] + charMap[ch];
                  diatricString = "";
                } else {
                  ch = lastCharWasSymbol && charMap[ch].match(/[A-Za-z0-9]/) ? " " + charMap[ch] : charMap[ch];
                }
                lastCharWasSymbol = false;
                lastCharWasDiatric = false;
              } else if (ch in diatricMap) {
                diatricString += ch;
                ch = "";
                if (i === l - 1) {
                  ch = diatricMap[diatricString];
                }
                lastCharWasDiatric = true;
              } else if (
                // process symbol chars
                symbol[ch] && !(uricFlag && uricChars.indexOf(ch) !== -1) && !(uricNoSlashFlag && uricNoSlashChars.indexOf(ch) !== -1)
              ) {
                ch = lastCharWasSymbol || result.substr(-1).match(/[A-Za-z0-9]/) ? separator + symbol[ch] : symbol[ch];
                ch += input[i + 1] !== void 0 && input[i + 1].match(/[A-Za-z0-9]/) ? separator : "";
                lastCharWasSymbol = true;
              } else {
                if (lastCharWasDiatric === true) {
                  ch = diatricMap[diatricString] + ch;
                  diatricString = "";
                  lastCharWasDiatric = false;
                } else if (lastCharWasSymbol && (/[A-Za-z0-9]/.test(ch) || result.substr(-1).match(/A-Za-z0-9]/))) {
                  ch = " " + ch;
                }
                lastCharWasSymbol = false;
              }
              result += ch.replace(new RegExp("[^\\w\\s" + allowedChars + "_-]", "g"), separator);
            }
            if (titleCase) {
              result = result.replace(/(\w)(\S*)/g, function(_, i2, r) {
                var j = i2.toUpperCase() + (r !== null ? r : "");
                return Object.keys(customReplacements).indexOf(j.toLowerCase()) < 0 ? j : j.toLowerCase();
              });
            }
            result = result.replace(/\s+/g, separator).replace(new RegExp("\\" + separator + "+", "g"), separator).replace(new RegExp("(^\\" + separator + "+|\\" + separator + "+$)", "g"), "");
            if (truncate && result.length > truncate) {
              lucky = result.charAt(truncate) === separator;
              result = result.slice(0, truncate);
              if (!lucky) {
                result = result.slice(0, result.lastIndexOf(separator));
              }
            }
            if (!maintainCase && !titleCase) {
              result = result.toLowerCase();
            }
            return result;
          };
          var createSlug = function createSlug2(opts) {
            return function getSlugWithConfig(input) {
              return getSlug(input, opts);
            };
          };
          var escapeChars = function escapeChars2(input) {
            return input.replace(/[-\\^$*+?.()|[\]{}\/]/g, "\\$&");
          };
          var isReplacedCustomChar = function(ch, customReplacements) {
            for (var c in customReplacements) {
              if (customReplacements[c] === ch) {
                return true;
              }
            }
          };
          if (typeof module !== "undefined" && module.exports) {
            module.exports = getSlug;
            module.exports.createSlug = createSlug;
          } else if (typeof define !== "undefined" && define.amd) {
            define([], function() {
              return getSlug;
            });
          } else {
            try {
              if (root.getSlug || root.createSlug) {
                throw "speakingurl: globals exists /(getSlug|createSlug)/";
              } else {
                root.getSlug = getSlug;
                root.createSlug = createSlug;
              }
            } catch (e) {
            }
          }
        })(exports);
      }
    });

    // ../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/index.js
    var require_speakingurl2 = __commonJS({
      "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/index.js"(exports, module) {
        init_esm_shims();
        module.exports = require_speakingurl();
      }
    });

    // src/index.ts
    init_esm_shims();

    // src/core/index.ts
    init_esm_shims();

    // src/compat/index.ts
    init_esm_shims();

    // src/ctx/index.ts
    init_esm_shims();

    // src/ctx/api.ts
    init_esm_shims();

    // src/core/component/state/editor.ts
    init_esm_shims();

    // src/shared/stub-vue.ts
    init_esm_shims();
    function isReadonly(value) {
      return !!(value && value["__v_isReadonly" /* IS_READONLY */]);
    }
    function isReactive(value) {
      if (isReadonly(value)) {
        return isReactive(value["__v_raw" /* RAW */]);
      }
      return !!(value && value["__v_isReactive" /* IS_REACTIVE */]);
    }
    function isRef(r) {
      return !!(r && r.__v_isRef === true);
    }
    function toRaw(observed) {
      const raw = observed && observed["__v_raw" /* RAW */];
      return raw ? toRaw(raw) : observed;
    }
    var Fragment = Symbol.for("v-fgt");

    // src/core/component/utils/index.ts
    init_esm_shims();
    function getComponentTypeName(options) {
      var _a25;
      const name = options.name || options._componentTag || options.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ || options.__name;
      if (name === "index" && ((_a25 = options.__file) == null ? void 0 : _a25.endsWith("index.vue"))) {
        return "";
      }
      return name;
    }
    function getComponentFileName(options) {
      const file = options.__file;
      if (file)
        return classify(basename(file, ".vue"));
    }
    function saveComponentGussedName(instance, name) {
      instance.type.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ = name;
      return name;
    }
    function getAppRecord(instance) {
      if (instance.__VUE_DEVTOOLS_NEXT_APP_RECORD__)
        return instance.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
      else if (instance.root)
        return instance.appContext.app.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
    }
    async function getComponentId(options) {
      const { app, uid, instance } = options;
      try {
        if (instance.__VUE_DEVTOOLS_NEXT_UID__)
          return instance.__VUE_DEVTOOLS_NEXT_UID__;
        const appRecord = await getAppRecord(app);
        if (!appRecord)
          return null;
        const isRoot = appRecord.rootInstance === instance;
        return `${appRecord.id}:${isRoot ? "root" : uid}`;
      } catch (e) {
      }
    }
    function isFragment(instance) {
      var _a25;
      const subTreeType = (_a25 = instance.subTree) == null ? void 0 : _a25.type;
      return subTreeType === Fragment;
    }
    function getInstanceName(instance) {
      var _a25, _b25, _c;
      const name = getComponentTypeName((instance == null ? void 0 : instance.type) || {});
      if (name)
        return name;
      if ((instance == null ? void 0 : instance.root) === instance)
        return "Root";
      for (const key in (_b25 = (_a25 = instance.parent) == null ? void 0 : _a25.type) == null ? void 0 : _b25.components) {
        if (instance.parent.type.components[key] === (instance == null ? void 0 : instance.type))
          return saveComponentGussedName(instance, key);
      }
      for (const key in (_c = instance.appContext) == null ? void 0 : _c.components) {
        if (instance.appContext.components[key] === (instance == null ? void 0 : instance.type))
          return saveComponentGussedName(instance, key);
      }
      const fileName = getComponentFileName((instance == null ? void 0 : instance.type) || {});
      if (fileName)
        return fileName;
      return "Anonymous Component";
    }
    function getComponentInstance(appRecord, instanceId) {
      instanceId = instanceId || `${appRecord.id}:root`;
      const instance = appRecord.instanceMap.get(instanceId);
      return instance || appRecord.instanceMap.get(":root");
    }

    // src/core/component/state/editor.ts
    var StateEditor = class {
      constructor() {
        this.refEditor = new RefStateEditor();
      }
      set(object, path, value, cb) {
        const sections = Array.isArray(path) ? path : path.split(".");
        while (sections.length > 1) {
          const section = sections.shift();
          if (object instanceof Map)
            object = object.get(section);
          if (object instanceof Set)
            object = Array.from(object.values())[section];
          else object = object[section];
          if (this.refEditor.isRef(object))
            object = this.refEditor.get(object);
        }
        const field = sections[0];
        const item = this.refEditor.get(object)[field];
        if (cb) {
          cb(object, field, value);
        } else {
          if (this.refEditor.isRef(item))
            this.refEditor.set(item, value);
          else object[field] = value;
        }
      }
      get(object, path) {
        const sections = Array.isArray(path) ? path : path.split(".");
        for (let i = 0; i < sections.length; i++) {
          if (object instanceof Map)
            object = object.get(sections[i]);
          else
            object = object[sections[i]];
          if (this.refEditor.isRef(object))
            object = this.refEditor.get(object);
          if (!object)
            return void 0;
        }
        return object;
      }
      has(object, path, parent = false) {
        if (typeof object === "undefined")
          return false;
        const sections = Array.isArray(path) ? path.slice() : path.split(".");
        const size = !parent ? 1 : 2;
        while (object && sections.length > size) {
          const section = sections.shift();
          object = object[section];
          if (this.refEditor.isRef(object))
            object = this.refEditor.get(object);
        }
        return object != null && Object.prototype.hasOwnProperty.call(object, sections[0]);
      }
      createDefaultSetCallback(state) {
        return (object, field, value) => {
          if (state.remove || state.newKey) {
            if (Array.isArray(object))
              object.splice(field, 1);
            else if (toRaw(object) instanceof Map)
              object.delete(field);
            else if (toRaw(object) instanceof Set)
              object.delete(Array.from(object.values())[field]);
            else Reflect.deleteProperty(object, field);
          }
          if (!state.remove) {
            const target22 = object[state.newKey || field];
            if (this.refEditor.isRef(target22))
              this.refEditor.set(target22, value);
            else if (toRaw(object) instanceof Map)
              object.set(state.newKey || field, value);
            else if (toRaw(object) instanceof Set)
              object.add(value);
            else
              object[state.newKey || field] = value;
          }
        };
      }
    };
    var RefStateEditor = class {
      set(ref, value) {
        if (isRef(ref)) {
          ref.value = value;
        } else {
          if (ref instanceof Set && Array.isArray(value)) {
            ref.clear();
            value.forEach((v) => ref.add(v));
            return;
          }
          const currentKeys = Object.keys(value);
          if (ref instanceof Map) {
            const previousKeysSet2 = new Set(ref.keys());
            currentKeys.forEach((key) => {
              ref.set(key, Reflect.get(value, key));
              previousKeysSet2.delete(key);
            });
            previousKeysSet2.forEach((key) => ref.delete(key));
            return;
          }
          const previousKeysSet = new Set(Object.keys(ref));
          currentKeys.forEach((key) => {
            Reflect.set(ref, key, Reflect.get(value, key));
            previousKeysSet.delete(key);
          });
          previousKeysSet.forEach((key) => Reflect.deleteProperty(ref, key));
        }
      }
      get(ref) {
        return isRef(ref) ? ref.value : ref;
      }
      isRef(ref) {
        return isRef(ref) || isReactive(ref);
      }
    };

    // src/core/component/tree/el.ts
    init_esm_shims();
    function getRootElementsFromComponentInstance(instance) {
      if (isFragment(instance))
        return getFragmentRootElements(instance.subTree);
      if (!instance.subTree)
        return [];
      return [instance.subTree.el];
    }
    function getFragmentRootElements(vnode) {
      if (!vnode.children)
        return [];
      const list = [];
      vnode.children.forEach((childVnode) => {
        if (childVnode.component)
          list.push(...getRootElementsFromComponentInstance(childVnode.component));
        else if (childVnode == null ? void 0 : childVnode.el)
          list.push(childVnode.el);
      });
      return list;
    }

    // src/core/component-highlighter/index.ts
    init_esm_shims();

    // src/core/component/state/bounding-rect.ts
    init_esm_shims();
    function createRect() {
      const rect = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        get width() {
          return rect.right - rect.left;
        },
        get height() {
          return rect.bottom - rect.top;
        }
      };
      return rect;
    }
    var range;
    function getTextRect(node) {
      if (!range)
        range = document.createRange();
      range.selectNode(node);
      return range.getBoundingClientRect();
    }
    function getFragmentRect(vnode) {
      const rect = createRect();
      if (!vnode.children)
        return rect;
      for (let i = 0, l = vnode.children.length; i < l; i++) {
        const childVnode = vnode.children[i];
        let childRect;
        if (childVnode.component) {
          childRect = getComponentBoundingRect(childVnode.component);
        } else if (childVnode.el) {
          const el = childVnode.el;
          if (el.nodeType === 1 || el.getBoundingClientRect)
            childRect = el.getBoundingClientRect();
          else if (el.nodeType === 3 && el.data.trim())
            childRect = getTextRect(el);
        }
        if (childRect)
          mergeRects(rect, childRect);
      }
      return rect;
    }
    function mergeRects(a, b) {
      if (!a.top || b.top < a.top)
        a.top = b.top;
      if (!a.bottom || b.bottom > a.bottom)
        a.bottom = b.bottom;
      if (!a.left || b.left < a.left)
        a.left = b.left;
      if (!a.right || b.right > a.right)
        a.right = b.right;
      return a;
    }
    var DEFAULT_RECT = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0
    };
    function getComponentBoundingRect(instance) {
      const el = instance.subTree.el;
      if (typeof window === "undefined") {
        return DEFAULT_RECT;
      }
      if (isFragment(instance))
        return getFragmentRect(instance.subTree);
      else if ((el == null ? void 0 : el.nodeType) === 1)
        return el == null ? void 0 : el.getBoundingClientRect();
      else if (instance.subTree.component)
        return getComponentBoundingRect(instance.subTree.component);
      else
        return DEFAULT_RECT;
    }

    // src/core/component-highlighter/index.ts
    var CONTAINER_ELEMENT_ID = "__vue-devtools-component-inspector__";
    var CARD_ELEMENT_ID = "__vue-devtools-component-inspector__card__";
    var COMPONENT_NAME_ELEMENT_ID = "__vue-devtools-component-inspector__name__";
    var INDICATOR_ELEMENT_ID = "__vue-devtools-component-inspector__indicator__";
    var containerStyles = {
      display: "block",
      zIndex: 2147483640,
      position: "fixed",
      backgroundColor: "#42b88325",
      border: "1px solid #42b88350",
      borderRadius: "5px",
      transition: "all 0.1s ease-in",
      pointerEvents: "none"
    };
    var cardStyles = {
      fontFamily: "Arial, Helvetica, sans-serif",
      padding: "5px 8px",
      borderRadius: "4px",
      textAlign: "left",
      position: "absolute",
      left: 0,
      color: "#e9e9e9",
      fontSize: "14px",
      fontWeight: 600,
      lineHeight: "24px",
      backgroundColor: "#42b883",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
    };
    var indicatorStyles = {
      display: "inline-block",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "12px",
      opacity: 0.7
    };
    function getContainerElement() {
      return document.getElementById(CONTAINER_ELEMENT_ID);
    }
    function getCardElement() {
      return document.getElementById(CARD_ELEMENT_ID);
    }
    function getIndicatorElement() {
      return document.getElementById(INDICATOR_ELEMENT_ID);
    }
    function getNameElement() {
      return document.getElementById(COMPONENT_NAME_ELEMENT_ID);
    }
    function getStyles(bounds) {
      return {
        left: `${Math.round(bounds.left * 100) / 100}px`,
        top: `${Math.round(bounds.top * 100) / 100}px`,
        width: `${Math.round(bounds.width * 100) / 100}px`,
        height: `${Math.round(bounds.height * 100) / 100}px`
      };
    }
    function create(options) {
      var _a25;
      const containerEl = document.createElement("div");
      containerEl.id = (_a25 = options.elementId) != null ? _a25 : CONTAINER_ELEMENT_ID;
      Object.assign(containerEl.style, {
        ...containerStyles,
        ...getStyles(options.bounds),
        ...options.style
      });
      const cardEl = document.createElement("span");
      cardEl.id = CARD_ELEMENT_ID;
      Object.assign(cardEl.style, {
        ...cardStyles,
        top: options.bounds.top < 35 ? 0 : "-35px"
      });
      const nameEl = document.createElement("span");
      nameEl.id = COMPONENT_NAME_ELEMENT_ID;
      nameEl.innerHTML = `&lt;${options.name}&gt;&nbsp;&nbsp;`;
      const indicatorEl = document.createElement("i");
      indicatorEl.id = INDICATOR_ELEMENT_ID;
      indicatorEl.innerHTML = `${Math.round(options.bounds.width * 100) / 100} x ${Math.round(options.bounds.height * 100) / 100}`;
      Object.assign(indicatorEl.style, indicatorStyles);
      cardEl.appendChild(nameEl);
      cardEl.appendChild(indicatorEl);
      containerEl.appendChild(cardEl);
      document.body.appendChild(containerEl);
      return containerEl;
    }
    function update(options) {
      const containerEl = getContainerElement();
      const cardEl = getCardElement();
      const nameEl = getNameElement();
      const indicatorEl = getIndicatorElement();
      if (containerEl) {
        Object.assign(containerEl.style, {
          ...containerStyles,
          ...getStyles(options.bounds)
        });
        Object.assign(cardEl.style, {
          top: options.bounds.top < 35 ? 0 : "-35px"
        });
        nameEl.innerHTML = `&lt;${options.name}&gt;&nbsp;&nbsp;`;
        indicatorEl.innerHTML = `${Math.round(options.bounds.width * 100) / 100} x ${Math.round(options.bounds.height * 100) / 100}`;
      }
    }
    function highlight(instance) {
      const bounds = getComponentBoundingRect(instance);
      const name = getInstanceName(instance);
      const container = getContainerElement();
      container ? update({ bounds, name }) : create({ bounds, name });
    }
    function unhighlight() {
      const el = getContainerElement();
      if (el)
        el.style.display = "none";
    }
    var inspectInstance = null;
    function inspectFn(e) {
      const target22 = e.target;
      if (target22) {
        const instance = target22.__vueParentComponent;
        if (instance) {
          inspectInstance = instance;
          const el = instance.vnode.el;
          if (el) {
            const bounds = getComponentBoundingRect(instance);
            const name = getInstanceName(instance);
            const container = getContainerElement();
            container ? update({ bounds, name }) : create({ bounds, name });
          }
        }
      }
    }
    function selectComponentFn(e, cb) {
      var _a25;
      e.preventDefault();
      e.stopPropagation();
      if (inspectInstance) {
        const app = (_a25 = activeAppRecord.value) == null ? void 0 : _a25.app;
        getComponentId({
          app,
          uid: app.uid,
          instance: inspectInstance
        }).then((id) => {
          cb(id);
        });
      }
    }
    var inspectComponentHighLighterSelectFn = null;
    function cancelInspectComponentHighLighter() {
      unhighlight();
      window.removeEventListener("mouseover", inspectFn);
      window.removeEventListener("click", inspectComponentHighLighterSelectFn, true);
      inspectComponentHighLighterSelectFn = null;
    }
    function inspectComponentHighLighter() {
      window.addEventListener("mouseover", inspectFn);
      return new Promise((resolve) => {
        function onSelect(e) {
          e.preventDefault();
          e.stopPropagation();
          selectComponentFn(e, (id) => {
            window.removeEventListener("click", onSelect, true);
            inspectComponentHighLighterSelectFn = null;
            window.removeEventListener("mouseover", inspectFn);
            const el = getContainerElement();
            if (el)
              el.style.display = "none";
            resolve(JSON.stringify({ id }));
          });
        }
        inspectComponentHighLighterSelectFn = onSelect;
        window.addEventListener("click", onSelect, true);
      });
    }
    function scrollToComponent(options) {
      const instance = getComponentInstance(activeAppRecord.value, options.id);
      if (instance) {
        const [el] = getRootElementsFromComponentInstance(instance);
        if (typeof el.scrollIntoView === "function") {
          el.scrollIntoView({
            behavior: "smooth"
          });
        } else {
          const bounds = getComponentBoundingRect(instance);
          const scrollTarget = document.createElement("div");
          const styles = {
            ...getStyles(bounds),
            position: "absolute"
          };
          Object.assign(scrollTarget.style, styles);
          document.body.appendChild(scrollTarget);
          scrollTarget.scrollIntoView({
            behavior: "smooth"
          });
          setTimeout(() => {
            document.body.removeChild(scrollTarget);
          }, 2e3);
        }
        setTimeout(() => {
          const bounds = getComponentBoundingRect(instance);
          if (bounds.width || bounds.height) {
            const name = getInstanceName(instance);
            const el2 = getContainerElement();
            el2 ? update({ ...options, name, bounds }) : create({ ...options, name, bounds });
            setTimeout(() => {
              if (el2)
                el2.style.display = "none";
            }, 1500);
          }
        }, 1200);
      }
    }

    // src/core/component-inspector/index.ts
    init_esm_shims();
    var _a, _b;
    (_b = (_a = target).__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__) != null ? _b : _a.__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__ = true;
    function waitForInspectorInit(cb) {
      let total = 0;
      const timer = setInterval(() => {
        if (target.__VUE_INSPECTOR__) {
          clearInterval(timer);
          total += 30;
          cb();
        }
        if (total >= /* 5s */
        5e3)
          clearInterval(timer);
      }, 30);
    }
    function setupInspector() {
      const inspector = target.__VUE_INSPECTOR__;
      const _openInEditor = inspector.openInEditor;
      inspector.openInEditor = async (...params) => {
        inspector.disable();
        _openInEditor(...params);
      };
    }
    function getComponentInspector() {
      return new Promise((resolve) => {
        function setup() {
          setupInspector();
          resolve(target.__VUE_INSPECTOR__);
        }
        if (!target.__VUE_INSPECTOR__) {
          waitForInspectorInit(() => {
            setup();
          });
        } else {
          setup();
        }
      });
    }

    // src/core/open-in-editor/index.ts
    init_esm_shims();

    // src/ctx/state.ts
    init_esm_shims();

    // src/core/timeline/storage.ts
    init_esm_shims();
    var TIMELINE_LAYERS_STATE_STORAGE_ID = "__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS_STATE__";
    function getTimelineLayersStateFromStorage() {
      if (!isBrowser || typeof localStorage === "undefined") {
        return {
          recordingState: false,
          mouseEventEnabled: false,
          keyboardEventEnabled: false,
          componentEventEnabled: false,
          performanceEventEnabled: false,
          selected: ""
        };
      }
      const state = localStorage.getItem(TIMELINE_LAYERS_STATE_STORAGE_ID);
      return state ? JSON.parse(state) : {
        recordingState: false,
        mouseEventEnabled: false,
        keyboardEventEnabled: false,
        componentEventEnabled: false,
        performanceEventEnabled: false,
        selected: ""
      };
    }

    // src/ctx/hook.ts
    init_esm_shims();

    // src/ctx/inspector.ts
    init_esm_shims();

    // src/ctx/timeline.ts
    init_esm_shims();
    var _a2, _b2;
    (_b2 = (_a2 = target).__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS) != null ? _b2 : _a2.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS = [];
    var devtoolsTimelineLayers = new Proxy(target.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS, {
      get(target22, prop, receiver) {
        return Reflect.get(target22, prop, receiver);
      }
    });
    function addTimelineLayer(options, descriptor) {
      devtoolsTimelineLayers.push({
        ...options,
        descriptorId: descriptor.id,
        appRecord: getAppRecord(descriptor.app)
      });
    }

    // src/ctx/inspector.ts
    var _a3, _b3;
    (_b3 = (_a3 = target).__VUE_DEVTOOLS_KIT_INSPECTOR__) != null ? _b3 : _a3.__VUE_DEVTOOLS_KIT_INSPECTOR__ = [];
    var devtoolsInspector = new Proxy(target.__VUE_DEVTOOLS_KIT_INSPECTOR__, {
      get(target22, prop, receiver) {
        return Reflect.get(target22, prop, receiver);
      }
    });
    var callInspectorUpdatedHook = debounce(() => {
      devtoolsContext.hooks.callHook("sendInspectorToClient" /* SEND_INSPECTOR_TO_CLIENT */, getActiveInspectors());
    });
    function addInspector(inspector, descriptor) {
      devtoolsInspector.push({
        options: inspector,
        descriptor,
        treeFilter: "",
        selectedNodeId: "",
        appRecord: getAppRecord(descriptor.app)
      });
      callInspectorUpdatedHook();
    }
    function getActiveInspectors() {
      return devtoolsInspector.filter((inspector) => inspector.descriptor.app === activeAppRecord.value.app).filter((inspector) => inspector.descriptor.id !== "components").map((inspector) => {
        var _a25;
        const descriptor = inspector.descriptor;
        const options = inspector.options;
        return {
          id: options.id,
          label: options.label,
          logo: descriptor.logo,
          icon: `custom-ic-baseline-${(_a25 = options == null ? void 0 : options.icon) == null ? void 0 : _a25.replace(/_/g, "-")}`,
          packageName: descriptor.packageName,
          homepage: descriptor.homepage,
          pluginId: descriptor.id
        };
      });
    }
    function getInspector(id, app) {
      return devtoolsInspector.find((inspector) => inspector.options.id === id && (app ? inspector.descriptor.app === app : true));
    }
    function createDevToolsCtxHooks() {
      const hooks2 = createHooks();
      hooks2.hook("addInspector" /* ADD_INSPECTOR */, ({ inspector, plugin }) => {
        addInspector(inspector, plugin.descriptor);
      });
      hooks2.hook("sendInspectorTree" /* SEND_INSPECTOR_TREE */, async ({ inspectorId, plugin }) => {
        var _a25;
        if (!inspectorId || !((_a25 = plugin == null ? void 0 : plugin.descriptor) == null ? void 0 : _a25.app))
          return;
        const inspector = getInspector(inspectorId, plugin.descriptor.app);
        const _payload = {
          app: plugin.descriptor.app,
          inspectorId,
          filter: (inspector == null ? void 0 : inspector.treeFilter) || "",
          rootNodes: []
        };
        await new Promise((resolve) => {
          hooks2.callHookWith(async (callbacks) => {
            await Promise.all(callbacks.map((cb) => cb(_payload)));
            resolve();
          }, "getInspectorTree" /* GET_INSPECTOR_TREE */);
        });
        hooks2.callHookWith(async (callbacks) => {
          await Promise.all(callbacks.map((cb) => cb({
            inspectorId,
            rootNodes: _payload.rootNodes
          })));
        }, "sendInspectorTreeToClient" /* SEND_INSPECTOR_TREE_TO_CLIENT */);
      });
      hooks2.hook("sendInspectorState" /* SEND_INSPECTOR_STATE */, async ({ inspectorId, plugin }) => {
        var _a25;
        if (!inspectorId || !((_a25 = plugin == null ? void 0 : plugin.descriptor) == null ? void 0 : _a25.app))
          return;
        const inspector = getInspector(inspectorId, plugin.descriptor.app);
        const _payload = {
          app: plugin.descriptor.app,
          inspectorId,
          nodeId: (inspector == null ? void 0 : inspector.selectedNodeId) || "",
          state: null
        };
        const ctx = {
          currentTab: `custom-inspector:${inspectorId}`
        };
        if (_payload.nodeId) {
          await new Promise((resolve) => {
            hooks2.callHookWith(async (callbacks) => {
              await Promise.all(callbacks.map((cb) => cb(_payload, ctx)));
              resolve();
            }, "getInspectorState" /* GET_INSPECTOR_STATE */);
          });
        }
        hooks2.callHookWith(async (callbacks) => {
          await Promise.all(callbacks.map((cb) => cb({
            inspectorId,
            nodeId: _payload.nodeId,
            state: _payload.state
          })));
        }, "sendInspectorStateToClient" /* SEND_INSPECTOR_STATE_TO_CLIENT */);
      });
      hooks2.hook("customInspectorSelectNode" /* CUSTOM_INSPECTOR_SELECT_NODE */, ({ inspectorId, nodeId, plugin }) => {
        const inspector = getInspector(inspectorId, plugin.descriptor.app);
        if (!inspector)
          return;
        inspector.selectedNodeId = nodeId;
      });
      hooks2.hook("timelineLayerAdded" /* TIMELINE_LAYER_ADDED */, ({ options, plugin }) => {
        addTimelineLayer(options, plugin.descriptor);
      });
      hooks2.hook("timelineEventAdded" /* TIMELINE_EVENT_ADDED */, ({ options, plugin }) => {
        hooks2.callHookWith(async (callbacks) => {
          await Promise.all(callbacks.map((cb) => cb(options)));
        }, "sendTimelineEventToClient" /* SEND_TIMELINE_EVENT_TO_CLIENT */);
      });
      hooks2.hook("getComponentInstances" /* GET_COMPONENT_INSTANCES */, async ({ app }) => {
        const appRecord = app.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
        if (!appRecord)
          return null;
        const appId = appRecord.id.toString();
        const instances = [...appRecord.instanceMap].filter(([key]) => key.split(":")[0] === appId).map(([, instance]) => instance);
        return instances;
      });
      hooks2.hook("getComponentBounds" /* GET_COMPONENT_BOUNDS */, async ({ instance }) => {
        const bounds = getComponentBoundingRect(instance);
        return bounds;
      });
      hooks2.hook("getComponentName" /* GET_COMPONENT_NAME */, ({ instance }) => {
        const name = getInstanceName(instance);
        return name;
      });
      hooks2.hook("componentHighlight" /* COMPONENT_HIGHLIGHT */, ({ uid }) => {
        const instance = activeAppRecord.value.instanceMap.get(uid);
        if (instance) {
          highlight(instance);
        }
      });
      hooks2.hook("componentUnhighlight" /* COMPONENT_UNHIGHLIGHT */, () => {
        unhighlight();
      });
      return hooks2;
    }

    // src/ctx/state.ts
    var _a4, _b4;
    (_b4 = (_a4 = target).__VUE_DEVTOOLS_KIT_APP_RECORDS__) != null ? _b4 : _a4.__VUE_DEVTOOLS_KIT_APP_RECORDS__ = [];
    var _a5, _b5;
    (_b5 = (_a5 = target).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__) != null ? _b5 : _a5.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = {};
    var _a6, _b6;
    (_b6 = (_a6 = target).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__) != null ? _b6 : _a6.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = "";
    var _a7, _b7;
    (_b7 = (_a7 = target).__VUE_DEVTOOLS_KIT_CUSTOM_TABS__) != null ? _b7 : _a7.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ = [];
    var _a8, _b8;
    (_b8 = (_a8 = target).__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__) != null ? _b8 : _a8.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ = [];
    var STATE_KEY = "__VUE_DEVTOOLS_KIT_GLOBAL_STATE__";
    function initStateFactory() {
      return {
        connected: false,
        clientConnected: false,
        vitePluginDetected: true,
        appRecords: [],
        activeAppRecordId: "",
        tabs: [],
        commands: [],
        highPerfModeEnabled: true,
        devtoolsClientDetected: {},
        perfUniqueGroupId: 0,
        timelineLayersState: getTimelineLayersStateFromStorage()
      };
    }
    var _a9, _b9;
    (_b9 = (_a9 = target)[STATE_KEY]) != null ? _b9 : _a9[STATE_KEY] = initStateFactory();
    var callStateUpdatedHook = debounce((state) => {
      devtoolsContext.hooks.callHook("devtoolsStateUpdated" /* DEVTOOLS_STATE_UPDATED */, { state });
    });
    debounce((state, oldState) => {
      devtoolsContext.hooks.callHook("devtoolsConnectedUpdated" /* DEVTOOLS_CONNECTED_UPDATED */, { state, oldState });
    });
    var devtoolsAppRecords = new Proxy(target.__VUE_DEVTOOLS_KIT_APP_RECORDS__, {
      get(_target, prop, receiver) {
        if (prop === "value")
          return target.__VUE_DEVTOOLS_KIT_APP_RECORDS__;
        return target.__VUE_DEVTOOLS_KIT_APP_RECORDS__[prop];
      }
    });
    var activeAppRecord = new Proxy(target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__, {
      get(_target, prop, receiver) {
        if (prop === "value")
          return target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__;
        else if (prop === "id")
          return target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__;
        return target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__[prop];
      }
    });
    function updateAllStates() {
      callStateUpdatedHook({
        ...target[STATE_KEY],
        appRecords: devtoolsAppRecords.value,
        activeAppRecordId: activeAppRecord.id,
        tabs: target.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__,
        commands: target.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__
      });
    }
    function setActiveAppRecord(app) {
      target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = app;
      updateAllStates();
    }
    function setActiveAppRecordId(id) {
      target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = id;
      updateAllStates();
    }
    var devtoolsState = new Proxy(target[STATE_KEY], {
      get(target22, property) {
        if (property === "appRecords") {
          return devtoolsAppRecords;
        } else if (property === "activeAppRecordId") {
          return activeAppRecord.id;
        } else if (property === "tabs") {
          return target.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__;
        } else if (property === "commands") {
          return target.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__;
        }
        return target[STATE_KEY][property];
      },
      deleteProperty(target22, property) {
        delete target22[property];
        return true;
      },
      set(target22, property, value) {
        ({ ...target[STATE_KEY] });
        target22[property] = value;
        target[STATE_KEY][property] = value;
        return true;
      }
    });
    function openInEditor(options = {}) {
      var _a25, _b25, _c;
      const { file, host, baseUrl = window.location.origin, line = 0, column = 0 } = options;
      if (file) {
        if (host === "chrome-extension") {
          const fileName = file.replace(/\\/g, "\\\\");
          const _baseUrl = (_b25 = (_a25 = window.VUE_DEVTOOLS_CONFIG) == null ? void 0 : _a25.openInEditorHost) != null ? _b25 : "/";
          fetch(`${_baseUrl}__open-in-editor?file=${encodeURI(file)}`).then((response) => {
            if (!response.ok) {
              const msg = `Opening component ${fileName} failed`;
              console.log(`%c${msg}`, "color:red");
            }
          });
        } else if (devtoolsState.vitePluginDetected) {
          const _baseUrl = (_c = target.__VUE_DEVTOOLS_OPEN_IN_EDITOR_BASE_URL__) != null ? _c : baseUrl;
          target.__VUE_INSPECTOR__.openInEditor(_baseUrl, file, line, column);
        }
      }
    }

    // src/core/plugin/index.ts
    init_esm_shims();

    // src/api/index.ts
    init_esm_shims();

    // src/api/v6/index.ts
    init_esm_shims();

    // src/core/plugin/plugin-settings.ts
    init_esm_shims();

    // src/ctx/plugin.ts
    init_esm_shims();
    var _a10, _b10;
    (_b10 = (_a10 = target).__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__) != null ? _b10 : _a10.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__ = [];
    var devtoolsPluginBuffer = new Proxy(target.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__, {
      get(target22, prop, receiver) {
        return Reflect.get(target22, prop, receiver);
      }
    });

    // src/core/plugin/plugin-settings.ts
    function _getSettings(settings) {
      const _settings = {};
      Object.keys(settings).forEach((key) => {
        _settings[key] = settings[key].defaultValue;
      });
      return _settings;
    }
    function getPluginLocalKey(pluginId) {
      return `__VUE_DEVTOOLS_NEXT_PLUGIN_SETTINGS__${pluginId}__`;
    }
    function getPluginSettingsOptions(pluginId) {
      var _a25, _b25, _c;
      const item = (_b25 = (_a25 = devtoolsPluginBuffer.find((item2) => {
        var _a26;
        return item2[0].id === pluginId && !!((_a26 = item2[0]) == null ? void 0 : _a26.settings);
      })) == null ? void 0 : _a25[0]) != null ? _b25 : null;
      return (_c = item == null ? void 0 : item.settings) != null ? _c : null;
    }
    function getPluginSettings(pluginId, fallbackValue) {
      var _a25, _b25, _c;
      const localKey = getPluginLocalKey(pluginId);
      if (localKey) {
        const localSettings = localStorage.getItem(localKey);
        if (localSettings) {
          return JSON.parse(localSettings);
        }
      }
      if (pluginId) {
        const item = (_b25 = (_a25 = devtoolsPluginBuffer.find((item2) => item2[0].id === pluginId)) == null ? void 0 : _a25[0]) != null ? _b25 : null;
        return _getSettings((_c = item == null ? void 0 : item.settings) != null ? _c : {});
      }
      return _getSettings(fallbackValue);
    }
    function initPluginSettings(pluginId, settings) {
      const localKey = getPluginLocalKey(pluginId);
      const localSettings = localStorage.getItem(localKey);
      if (!localSettings) {
        localStorage.setItem(localKey, JSON.stringify(_getSettings(settings)));
      }
    }
    function setPluginSettings(pluginId, key, value) {
      const localKey = getPluginLocalKey(pluginId);
      const localSettings = localStorage.getItem(localKey);
      const parsedLocalSettings = JSON.parse(localSettings || "{}");
      const updated = {
        ...parsedLocalSettings,
        [key]: value
      };
      localStorage.setItem(localKey, JSON.stringify(updated));
      devtoolsContext.hooks.callHookWith((callbacks) => {
        callbacks.forEach((cb) => cb({
          pluginId,
          key,
          oldValue: parsedLocalSettings[key],
          newValue: value,
          settings: updated
        }));
      }, "setPluginSettings" /* SET_PLUGIN_SETTINGS */);
    }

    // src/hook/index.ts
    init_esm_shims();

    // src/types/index.ts
    init_esm_shims();

    // src/types/app.ts
    init_esm_shims();

    // src/types/command.ts
    init_esm_shims();

    // src/types/component.ts
    init_esm_shims();

    // src/types/hook.ts
    init_esm_shims();

    // src/types/inspector.ts
    init_esm_shims();

    // src/types/plugin.ts
    init_esm_shims();

    // src/types/router.ts
    init_esm_shims();

    // src/types/tab.ts
    init_esm_shims();

    // src/types/timeline.ts
    init_esm_shims();

    // src/hook/index.ts
    var _a11, _b11;
    var devtoolsHooks = (_b11 = (_a11 = target).__VUE_DEVTOOLS_HOOK) != null ? _b11 : _a11.__VUE_DEVTOOLS_HOOK = createHooks();
    var on = {
      vueAppInit(fn) {
        devtoolsHooks.hook("app:init" /* APP_INIT */, fn);
      },
      vueAppUnmount(fn) {
        devtoolsHooks.hook("app:unmount" /* APP_UNMOUNT */, fn);
      },
      vueAppConnected(fn) {
        devtoolsHooks.hook("app:connected" /* APP_CONNECTED */, fn);
      },
      componentAdded(fn) {
        return devtoolsHooks.hook("component:added" /* COMPONENT_ADDED */, fn);
      },
      componentEmit(fn) {
        return devtoolsHooks.hook("component:emit" /* COMPONENT_EMIT */, fn);
      },
      componentUpdated(fn) {
        return devtoolsHooks.hook("component:updated" /* COMPONENT_UPDATED */, fn);
      },
      componentRemoved(fn) {
        return devtoolsHooks.hook("component:removed" /* COMPONENT_REMOVED */, fn);
      },
      setupDevtoolsPlugin(fn) {
        devtoolsHooks.hook("devtools-plugin:setup" /* SETUP_DEVTOOLS_PLUGIN */, fn);
      },
      perfStart(fn) {
        return devtoolsHooks.hook("perf:start" /* PERFORMANCE_START */, fn);
      },
      perfEnd(fn) {
        return devtoolsHooks.hook("perf:end" /* PERFORMANCE_END */, fn);
      }
    };
    var hook = {
      on,
      setupDevToolsPlugin(pluginDescriptor, setupFn) {
        return devtoolsHooks.callHook("devtools-plugin:setup" /* SETUP_DEVTOOLS_PLUGIN */, pluginDescriptor, setupFn);
      }
    };

    // src/api/v6/index.ts
    var DevToolsV6PluginAPI = class {
      constructor({ plugin, ctx }) {
        this.hooks = ctx.hooks;
        this.plugin = plugin;
      }
      get on() {
        return {
          // component inspector
          visitComponentTree: (handler) => {
            this.hooks.hook("visitComponentTree" /* VISIT_COMPONENT_TREE */, handler);
          },
          inspectComponent: (handler) => {
            this.hooks.hook("inspectComponent" /* INSPECT_COMPONENT */, handler);
          },
          editComponentState: (handler) => {
            this.hooks.hook("editComponentState" /* EDIT_COMPONENT_STATE */, handler);
          },
          // custom inspector
          getInspectorTree: (handler) => {
            this.hooks.hook("getInspectorTree" /* GET_INSPECTOR_TREE */, handler);
          },
          getInspectorState: (handler) => {
            this.hooks.hook("getInspectorState" /* GET_INSPECTOR_STATE */, handler);
          },
          editInspectorState: (handler) => {
            this.hooks.hook("editInspectorState" /* EDIT_INSPECTOR_STATE */, handler);
          },
          // timeline
          inspectTimelineEvent: (handler) => {
            this.hooks.hook("inspectTimelineEvent" /* INSPECT_TIMELINE_EVENT */, handler);
          },
          timelineCleared: (handler) => {
            this.hooks.hook("timelineCleared" /* TIMELINE_CLEARED */, handler);
          },
          // settings
          setPluginSettings: (handler) => {
            this.hooks.hook("setPluginSettings" /* SET_PLUGIN_SETTINGS */, handler);
          }
        };
      }
      // component inspector
      notifyComponentUpdate(instance) {
        var _a25;
        const inspector = getActiveInspectors().find((i) => i.packageName === this.plugin.descriptor.packageName);
        if (inspector == null ? void 0 : inspector.id) {
          if (instance) {
            const args = [
              instance.appContext.app,
              instance.uid,
              (_a25 = instance.parent) == null ? void 0 : _a25.uid,
              instance
            ];
            devtoolsHooks.callHook("component:updated" /* COMPONENT_UPDATED */, ...args);
          } else {
            devtoolsHooks.callHook("component:updated" /* COMPONENT_UPDATED */);
          }
          this.hooks.callHook("sendInspectorState" /* SEND_INSPECTOR_STATE */, { inspectorId: inspector.id, plugin: this.plugin });
        }
      }
      // custom inspector
      addInspector(options) {
        this.hooks.callHook("addInspector" /* ADD_INSPECTOR */, { inspector: options, plugin: this.plugin });
        if (this.plugin.descriptor.settings) {
          initPluginSettings(options.id, this.plugin.descriptor.settings);
        }
      }
      sendInspectorTree(inspectorId) {
        this.hooks.callHook("sendInspectorTree" /* SEND_INSPECTOR_TREE */, { inspectorId, plugin: this.plugin });
      }
      sendInspectorState(inspectorId) {
        this.hooks.callHook("sendInspectorState" /* SEND_INSPECTOR_STATE */, { inspectorId, plugin: this.plugin });
      }
      selectInspectorNode(inspectorId, nodeId) {
        this.hooks.callHook("customInspectorSelectNode" /* CUSTOM_INSPECTOR_SELECT_NODE */, { inspectorId, nodeId, plugin: this.plugin });
      }
      // timeline
      now() {
        return Date.now();
      }
      addTimelineLayer(options) {
        this.hooks.callHook("timelineLayerAdded" /* TIMELINE_LAYER_ADDED */, { options, plugin: this.plugin });
      }
      addTimelineEvent(options) {
        this.hooks.callHook("timelineEventAdded" /* TIMELINE_EVENT_ADDED */, { options, plugin: this.plugin });
      }
      // settings
      getSettings(pluginId) {
        return getPluginSettings(pluginId != null ? pluginId : this.plugin.descriptor.id, this.plugin.descriptor.settings);
      }
      // utilities
      getComponentInstances(app) {
        return this.hooks.callHook("getComponentInstances" /* GET_COMPONENT_INSTANCES */, { app });
      }
      getComponentBounds(instance) {
        return this.hooks.callHook("getComponentBounds" /* GET_COMPONENT_BOUNDS */, { instance });
      }
      getComponentName(instance) {
        return this.hooks.callHook("getComponentName" /* GET_COMPONENT_NAME */, { instance });
      }
      highlightElement(instance) {
        const uid = instance.__VUE_DEVTOOLS_NEXT_UID__;
        return this.hooks.callHook("componentHighlight" /* COMPONENT_HIGHLIGHT */, { uid });
      }
      unhighlightElement() {
        return this.hooks.callHook("componentUnhighlight" /* COMPONENT_UNHIGHLIGHT */);
      }
    };

    // src/api/index.ts
    var DevToolsPluginAPI = DevToolsV6PluginAPI;

    // src/core/plugin/components.ts
    init_esm_shims();

    // src/core/component/state/index.ts
    init_esm_shims();

    // src/core/component/state/process.ts
    init_esm_shims();

    // src/core/component/state/constants.ts
    init_esm_shims();
    var UNDEFINED = "__vue_devtool_undefined__";
    var INFINITY = "__vue_devtool_infinity__";
    var NEGATIVE_INFINITY = "__vue_devtool_negative_infinity__";
    var NAN = "__vue_devtool_nan__";

    // src/core/component/state/util.ts
    init_esm_shims();

    // src/core/component/state/is.ts
    init_esm_shims();

    // src/core/component/state/util.ts
    var tokenMap = {
      [UNDEFINED]: "undefined",
      [NAN]: "NaN",
      [INFINITY]: "Infinity",
      [NEGATIVE_INFINITY]: "-Infinity"
    };
    Object.entries(tokenMap).reduce((acc, [key, value]) => {
      acc[value] = key;
      return acc;
    }, {});

    // src/core/component/tree/walker.ts
    init_esm_shims();

    // src/core/component/tree/filter.ts
    init_esm_shims();

    // src/core/timeline/index.ts
    init_esm_shims();

    // src/core/timeline/perf.ts
    init_esm_shims();

    // src/core/vm/index.ts
    init_esm_shims();

    // src/core/plugin/index.ts
    var _a12, _b12;
    (_b12 = (_a12 = target).__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__) != null ? _b12 : _a12.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__ = /* @__PURE__ */ new Set();
    function callDevToolsPluginSetupFn(plugin, app) {
      const [pluginDescriptor, setupFn] = plugin;
      if (pluginDescriptor.app !== app)
        return;
      const api = new DevToolsPluginAPI({
        plugin: {
          setupFn,
          descriptor: pluginDescriptor
        },
        ctx: devtoolsContext
      });
      if (pluginDescriptor.packageName === "vuex") {
        api.on.editInspectorState((payload) => {
          api.sendInspectorState(payload.inspectorId);
        });
      }
      setupFn(api);
    }
    function registerDevToolsPlugin(app) {
      if (target.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.has(app))
        return;
      target.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.add(app);
      devtoolsPluginBuffer.forEach((plugin) => {
        callDevToolsPluginSetupFn(plugin, app);
      });
    }

    // src/core/router/index.ts
    init_esm_shims();

    // src/ctx/router.ts
    init_esm_shims();
    var ROUTER_KEY = "__VUE_DEVTOOLS_ROUTER__";
    var ROUTER_INFO_KEY = "__VUE_DEVTOOLS_ROUTER_INFO__";
    var _a13, _b13;
    (_b13 = (_a13 = target)[ROUTER_INFO_KEY]) != null ? _b13 : _a13[ROUTER_INFO_KEY] = {
      currentRoute: null,
      routes: []
    };
    var _a14, _b14;
    (_b14 = (_a14 = target)[ROUTER_KEY]) != null ? _b14 : _a14[ROUTER_KEY] = {};
    new Proxy(target[ROUTER_INFO_KEY], {
      get(target22, property) {
        return target[ROUTER_INFO_KEY][property];
      }
    });
    new Proxy(target[ROUTER_KEY], {
      get(target22, property) {
        if (property === "value") {
          return target[ROUTER_KEY];
        }
      }
    });

    // src/core/router/index.ts
    function getRoutes(router) {
      const routesMap = /* @__PURE__ */ new Map();
      return ((router == null ? void 0 : router.getRoutes()) || []).filter((i) => !routesMap.has(i.path) && routesMap.set(i.path, 1));
    }
    function filterRoutes(routes) {
      return routes.map((item) => {
        let { path, name, children, meta } = item;
        if (children == null ? void 0 : children.length)
          children = filterRoutes(children);
        return {
          path,
          name,
          children,
          meta
        };
      });
    }
    function filterCurrentRoute(route) {
      if (route) {
        const { fullPath, hash, href, path, name, matched, params, query } = route;
        return {
          fullPath,
          hash,
          href,
          path,
          name,
          params,
          query,
          matched: filterRoutes(matched)
        };
      }
      return route;
    }
    function normalizeRouterInfo(appRecord, activeAppRecord2) {
      function init() {
        var _a25;
        const router = (_a25 = appRecord.app) == null ? void 0 : _a25.config.globalProperties.$router;
        const currentRoute = filterCurrentRoute(router == null ? void 0 : router.currentRoute.value);
        const routes = filterRoutes(getRoutes(router));
        const c = console.warn;
        console.warn = () => {
        };
        target[ROUTER_INFO_KEY] = {
          currentRoute: currentRoute ? deepClone(currentRoute) : {},
          routes: deepClone(routes)
        };
        target[ROUTER_KEY] = router;
        console.warn = c;
      }
      init();
      hook.on.componentUpdated(debounce(() => {
        var _a25;
        if (((_a25 = activeAppRecord2.value) == null ? void 0 : _a25.app) !== appRecord.app)
          return;
        init();
        devtoolsContext.hooks.callHook("routerInfoUpdated" /* ROUTER_INFO_UPDATED */, { state: target[ROUTER_INFO_KEY] });
      }, 200));
    }

    // src/ctx/api.ts
    function createDevToolsApi(hooks2) {
      return {
        // get inspector tree
        async getInspectorTree(payload) {
          const _payload = {
            ...payload,
            app: activeAppRecord.value.app,
            rootNodes: []
          };
          await new Promise((resolve) => {
            hooks2.callHookWith(async (callbacks) => {
              await Promise.all(callbacks.map((cb) => cb(_payload)));
              resolve();
            }, "getInspectorTree" /* GET_INSPECTOR_TREE */);
          });
          return _payload.rootNodes;
        },
        // get inspector state
        async getInspectorState(payload) {
          const _payload = {
            ...payload,
            app: activeAppRecord.value.app,
            state: null
          };
          const ctx = {
            currentTab: `custom-inspector:${payload.inspectorId}`
          };
          await new Promise((resolve) => {
            hooks2.callHookWith(async (callbacks) => {
              await Promise.all(callbacks.map((cb) => cb(_payload, ctx)));
              resolve();
            }, "getInspectorState" /* GET_INSPECTOR_STATE */);
          });
          return _payload.state;
        },
        // edit inspector state
        editInspectorState(payload) {
          const stateEditor2 = new StateEditor();
          const _payload = {
            ...payload,
            app: activeAppRecord.value.app,
            set: (obj, path = payload.path, value = payload.state.value, cb) => {
              stateEditor2.set(obj, path, value, cb || stateEditor2.createDefaultSetCallback(payload.state));
            }
          };
          hooks2.callHookWith((callbacks) => {
            callbacks.forEach((cb) => cb(_payload));
          }, "editInspectorState" /* EDIT_INSPECTOR_STATE */);
        },
        // send inspector state
        sendInspectorState(inspectorId) {
          const inspector = getInspector(inspectorId);
          hooks2.callHook("sendInspectorState" /* SEND_INSPECTOR_STATE */, { inspectorId, plugin: {
            descriptor: inspector.descriptor,
            setupFn: () => ({})
          } });
        },
        // inspect component inspector
        inspectComponentInspector() {
          return inspectComponentHighLighter();
        },
        // cancel inspect component inspector
        cancelInspectComponentInspector() {
          return cancelInspectComponentHighLighter();
        },
        // get component render code
        getComponentRenderCode(id) {
          const instance = getComponentInstance(activeAppRecord.value, id);
          if (instance)
            return !((instance == null ? void 0 : instance.type) instanceof Function) ? instance.render.toString() : instance.type.toString();
        },
        // scroll to component
        scrollToComponent(id) {
          return scrollToComponent({ id });
        },
        // open in editor
        openInEditor,
        // get vue inspector
        getVueInspector: getComponentInspector,
        // toggle app
        toggleApp(id) {
          const appRecord = devtoolsAppRecords.value.find((record) => record.id === id);
          if (appRecord) {
            setActiveAppRecordId(id);
            setActiveAppRecord(appRecord);
            normalizeRouterInfo(appRecord, activeAppRecord);
            callInspectorUpdatedHook();
            registerDevToolsPlugin(appRecord.app);
          }
        },
        // inspect dom
        inspectDOM(instanceId) {
          const instance = getComponentInstance(activeAppRecord.value, instanceId);
          if (instance) {
            const [el] = getRootElementsFromComponentInstance(instance);
            if (el) {
              target.__VUE_DEVTOOLS_INSPECT_DOM_TARGET__ = el;
            }
          }
        },
        updatePluginSettings(pluginId, key, value) {
          setPluginSettings(pluginId, key, value);
        },
        getPluginSettings(pluginId) {
          return {
            options: getPluginSettingsOptions(pluginId),
            values: getPluginSettings(pluginId)
          };
        }
      };
    }

    // src/ctx/env.ts
    init_esm_shims();
    var _a15, _b15;
    (_b15 = (_a15 = target).__VUE_DEVTOOLS_ENV__) != null ? _b15 : _a15.__VUE_DEVTOOLS_ENV__ = {
      vitePluginDetected: false
    };

    // src/ctx/index.ts
    var hooks = createDevToolsCtxHooks();
    var _a16, _b16;
    (_b16 = (_a16 = target).__VUE_DEVTOOLS_KIT_CONTEXT__) != null ? _b16 : _a16.__VUE_DEVTOOLS_KIT_CONTEXT__ = {
      hooks,
      get state() {
        return {
          ...devtoolsState,
          activeAppRecordId: activeAppRecord.id,
          activeAppRecord: activeAppRecord.value,
          appRecords: devtoolsAppRecords.value
        };
      },
      api: createDevToolsApi(hooks)
    };
    var devtoolsContext = target.__VUE_DEVTOOLS_KIT_CONTEXT__;

    // src/core/app/index.ts
    init_esm_shims();
    __toESM(require_speakingurl2());
    var _a17, _b17;
    (_b17 = (_a17 = target).__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__) != null ? _b17 : _a17.__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__ = {
      id: 0,
      appIds: /* @__PURE__ */ new Set()
    };

    // src/core/high-perf-mode/index.ts
    init_esm_shims();
    function toggleHighPerfMode(state) {
      devtoolsState.highPerfModeEnabled = state != null ? state : !devtoolsState.highPerfModeEnabled;
    }

    // src/core/component/state/format.ts
    init_esm_shims();

    // src/core/component/state/reviver.ts
    init_esm_shims();

    // src/core/devtools-client/detected.ts
    init_esm_shims();
    function updateDevToolsClientDetected(params) {
      devtoolsState.devtoolsClientDetected = {
        ...devtoolsState.devtoolsClientDetected,
        ...params
      };
      const devtoolsClientVisible = Object.values(devtoolsState.devtoolsClientDetected).some(Boolean);
      toggleHighPerfMode(!devtoolsClientVisible);
    }
    var _a18, _b18;
    (_b18 = (_a18 = target).__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__) != null ? _b18 : _a18.__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__ = updateDevToolsClientDetected;

    // src/messaging/index.ts
    init_esm_shims();

    // src/messaging/presets/index.ts
    init_esm_shims();

    // src/messaging/presets/broadcast-channel/index.ts
    init_esm_shims();

    // ../../node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/index.js
    init_esm_shims();

    // ../../node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/class-registry.js
    init_esm_shims();

    // ../../node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/registry.js
    init_esm_shims();

    // ../../node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/double-indexed-kv.js
    init_esm_shims();
    var DoubleIndexedKV = class {
      constructor() {
        this.keyToValue = /* @__PURE__ */ new Map();
        this.valueToKey = /* @__PURE__ */ new Map();
      }
      set(key, value) {
        this.keyToValue.set(key, value);
        this.valueToKey.set(value, key);
      }
      getByKey(key) {
        return this.keyToValue.get(key);
      }
      getByValue(value) {
        return this.valueToKey.get(value);
      }
      clear() {
        this.keyToValue.clear();
        this.valueToKey.clear();
      }
    };

    // ../../node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/registry.js
    var Registry = class {
      constructor(generateIdentifier) {
        this.generateIdentifier = generateIdentifier;
        this.kv = new DoubleIndexedKV();
      }
      register(value, identifier) {
        if (this.kv.getByValue(value)) {
          return;
        }
        if (!identifier) {
          identifier = this.generateIdentifier(value);
        }
        this.kv.set(identifier, value);
      }
      clear() {
        this.kv.clear();
      }
      getIdentifier(value) {
        return this.kv.getByValue(value);
      }
      getValue(identifier) {
        return this.kv.getByKey(identifier);
      }
    };

    // ../../node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/class-registry.js
    var ClassRegistry = class extends Registry {
      constructor() {
        super((c) => c.name);
        this.classToAllowedProps = /* @__PURE__ */ new Map();
      }
      register(value, options) {
        if (typeof options === "object") {
          if (options.allowProps) {
            this.classToAllowedProps.set(value, options.allowProps);
          }
          super.register(value, options.identifier);
        } else {
          super.register(value, options);
        }
      }
      getAllowedProps(value) {
        return this.classToAllowedProps.get(value);
      }
    };

    // ../../node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/custom-transformer-registry.js
    init_esm_shims();

    // ../../node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/util.js
    init_esm_shims();
    function valuesOfObj(record) {
      if ("values" in Object) {
        return Object.values(record);
      }
      const values = [];
      for (const key in record) {
        if (record.hasOwnProperty(key)) {
          values.push(record[key]);
        }
      }
      return values;
    }
    function find(record, predicate) {
      const values = valuesOfObj(record);
      if ("find" in values) {
        return values.find(predicate);
      }
      const valuesNotNever = values;
      for (let i = 0; i < valuesNotNever.length; i++) {
        const value = valuesNotNever[i];
        if (predicate(value)) {
          return value;
        }
      }
      return void 0;
    }
    function forEach(record, run) {
      Object.entries(record).forEach(([key, value]) => run(value, key));
    }
    function includes(arr, value) {
      return arr.indexOf(value) !== -1;
    }
    function findArr(record, predicate) {
      for (let i = 0; i < record.length; i++) {
        const value = record[i];
        if (predicate(value)) {
          return value;
        }
      }
      return void 0;
    }

    // ../../node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/custom-transformer-registry.js
    var CustomTransformerRegistry = class {
      constructor() {
        this.transfomers = {};
      }
      register(transformer) {
        this.transfomers[transformer.name] = transformer;
      }
      findApplicable(v) {
        return find(this.transfomers, (transformer) => transformer.isApplicable(v));
      }
      findByName(name) {
        return this.transfomers[name];
      }
    };

    // ../../node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/plainer.js
    init_esm_shims();

    // ../../node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/is.js
    init_esm_shims();
    var getType = (payload) => Object.prototype.toString.call(payload).slice(8, -1);
    var isUndefined = (payload) => typeof payload === "undefined";
    var isNull = (payload) => payload === null;
    var isPlainObject2 = (payload) => {
      if (typeof payload !== "object" || payload === null)
        return false;
      if (payload === Object.prototype)
        return false;
      if (Object.getPrototypeOf(payload) === null)
        return true;
      return Object.getPrototypeOf(payload) === Object.prototype;
    };
    var isEmptyObject = (payload) => isPlainObject2(payload) && Object.keys(payload).length === 0;
    var isArray = (payload) => Array.isArray(payload);
    var isString = (payload) => typeof payload === "string";
    var isNumber = (payload) => typeof payload === "number" && !isNaN(payload);
    var isBoolean = (payload) => typeof payload === "boolean";
    var isRegExp = (payload) => payload instanceof RegExp;
    var isMap = (payload) => payload instanceof Map;
    var isSet = (payload) => payload instanceof Set;
    var isSymbol = (payload) => getType(payload) === "Symbol";
    var isDate = (payload) => payload instanceof Date && !isNaN(payload.valueOf());
    var isError = (payload) => payload instanceof Error;
    var isNaNValue = (payload) => typeof payload === "number" && isNaN(payload);
    var isPrimitive2 = (payload) => isBoolean(payload) || isNull(payload) || isUndefined(payload) || isNumber(payload) || isString(payload) || isSymbol(payload);
    var isBigint = (payload) => typeof payload === "bigint";
    var isInfinite = (payload) => payload === Infinity || payload === -Infinity;
    var isTypedArray = (payload) => ArrayBuffer.isView(payload) && !(payload instanceof DataView);
    var isURL = (payload) => payload instanceof URL;

    // ../../node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/pathstringifier.js
    init_esm_shims();
    var escapeKey = (key) => key.replace(/\./g, "\\.");
    var stringifyPath = (path) => path.map(String).map(escapeKey).join(".");
    var parsePath = (string) => {
      const result = [];
      let segment = "";
      for (let i = 0; i < string.length; i++) {
        let char = string.charAt(i);
        const isEscapedDot = char === "\\" && string.charAt(i + 1) === ".";
        if (isEscapedDot) {
          segment += ".";
          i++;
          continue;
        }
        const isEndOfSegment = char === ".";
        if (isEndOfSegment) {
          result.push(segment);
          segment = "";
          continue;
        }
        segment += char;
      }
      const lastSegment = segment;
      result.push(lastSegment);
      return result;
    };

    // ../../node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/transformer.js
    init_esm_shims();
    function simpleTransformation(isApplicable, annotation, transform, untransform) {
      return {
        isApplicable,
        annotation,
        transform,
        untransform
      };
    }
    var simpleRules = [
      simpleTransformation(isUndefined, "undefined", () => null, () => void 0),
      simpleTransformation(isBigint, "bigint", (v) => v.toString(), (v) => {
        if (typeof BigInt !== "undefined") {
          return BigInt(v);
        }
        console.error("Please add a BigInt polyfill.");
        return v;
      }),
      simpleTransformation(isDate, "Date", (v) => v.toISOString(), (v) => new Date(v)),
      simpleTransformation(isError, "Error", (v, superJson) => {
        const baseError = {
          name: v.name,
          message: v.message
        };
        superJson.allowedErrorProps.forEach((prop) => {
          baseError[prop] = v[prop];
        });
        return baseError;
      }, (v, superJson) => {
        const e = new Error(v.message);
        e.name = v.name;
        e.stack = v.stack;
        superJson.allowedErrorProps.forEach((prop) => {
          e[prop] = v[prop];
        });
        return e;
      }),
      simpleTransformation(isRegExp, "regexp", (v) => "" + v, (regex) => {
        const body = regex.slice(1, regex.lastIndexOf("/"));
        const flags = regex.slice(regex.lastIndexOf("/") + 1);
        return new RegExp(body, flags);
      }),
      simpleTransformation(
        isSet,
        "set",
        // (sets only exist in es6+)
        // eslint-disable-next-line es5/no-es6-methods
        (v) => [...v.values()],
        (v) => new Set(v)
      ),
      simpleTransformation(isMap, "map", (v) => [...v.entries()], (v) => new Map(v)),
      simpleTransformation((v) => isNaNValue(v) || isInfinite(v), "number", (v) => {
        if (isNaNValue(v)) {
          return "NaN";
        }
        if (v > 0) {
          return "Infinity";
        } else {
          return "-Infinity";
        }
      }, Number),
      simpleTransformation((v) => v === 0 && 1 / v === -Infinity, "number", () => {
        return "-0";
      }, Number),
      simpleTransformation(isURL, "URL", (v) => v.toString(), (v) => new URL(v))
    ];
    function compositeTransformation(isApplicable, annotation, transform, untransform) {
      return {
        isApplicable,
        annotation,
        transform,
        untransform
      };
    }
    var symbolRule = compositeTransformation((s, superJson) => {
      if (isSymbol(s)) {
        const isRegistered = !!superJson.symbolRegistry.getIdentifier(s);
        return isRegistered;
      }
      return false;
    }, (s, superJson) => {
      const identifier = superJson.symbolRegistry.getIdentifier(s);
      return ["symbol", identifier];
    }, (v) => v.description, (_, a, superJson) => {
      const value = superJson.symbolRegistry.getValue(a[1]);
      if (!value) {
        throw new Error("Trying to deserialize unknown symbol");
      }
      return value;
    });
    var constructorToName = [
      Int8Array,
      Uint8Array,
      Int16Array,
      Uint16Array,
      Int32Array,
      Uint32Array,
      Float32Array,
      Float64Array,
      Uint8ClampedArray
    ].reduce((obj, ctor) => {
      obj[ctor.name] = ctor;
      return obj;
    }, {});
    var typedArrayRule = compositeTransformation(isTypedArray, (v) => ["typed-array", v.constructor.name], (v) => [...v], (v, a) => {
      const ctor = constructorToName[a[1]];
      if (!ctor) {
        throw new Error("Trying to deserialize unknown typed array");
      }
      return new ctor(v);
    });
    function isInstanceOfRegisteredClass(potentialClass, superJson) {
      if (potentialClass == null ? void 0 : potentialClass.constructor) {
        const isRegistered = !!superJson.classRegistry.getIdentifier(potentialClass.constructor);
        return isRegistered;
      }
      return false;
    }
    var classRule = compositeTransformation(isInstanceOfRegisteredClass, (clazz, superJson) => {
      const identifier = superJson.classRegistry.getIdentifier(clazz.constructor);
      return ["class", identifier];
    }, (clazz, superJson) => {
      const allowedProps = superJson.classRegistry.getAllowedProps(clazz.constructor);
      if (!allowedProps) {
        return { ...clazz };
      }
      const result = {};
      allowedProps.forEach((prop) => {
        result[prop] = clazz[prop];
      });
      return result;
    }, (v, a, superJson) => {
      const clazz = superJson.classRegistry.getValue(a[1]);
      if (!clazz) {
        throw new Error("Trying to deserialize unknown class - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564");
      }
      return Object.assign(Object.create(clazz.prototype), v);
    });
    var customRule = compositeTransformation((value, superJson) => {
      return !!superJson.customTransformerRegistry.findApplicable(value);
    }, (value, superJson) => {
      const transformer = superJson.customTransformerRegistry.findApplicable(value);
      return ["custom", transformer.name];
    }, (value, superJson) => {
      const transformer = superJson.customTransformerRegistry.findApplicable(value);
      return transformer.serialize(value);
    }, (v, a, superJson) => {
      const transformer = superJson.customTransformerRegistry.findByName(a[1]);
      if (!transformer) {
        throw new Error("Trying to deserialize unknown custom value");
      }
      return transformer.deserialize(v);
    });
    var compositeRules = [classRule, symbolRule, customRule, typedArrayRule];
    var transformValue = (value, superJson) => {
      const applicableCompositeRule = findArr(compositeRules, (rule) => rule.isApplicable(value, superJson));
      if (applicableCompositeRule) {
        return {
          value: applicableCompositeRule.transform(value, superJson),
          type: applicableCompositeRule.annotation(value, superJson)
        };
      }
      const applicableSimpleRule = findArr(simpleRules, (rule) => rule.isApplicable(value, superJson));
      if (applicableSimpleRule) {
        return {
          value: applicableSimpleRule.transform(value, superJson),
          type: applicableSimpleRule.annotation
        };
      }
      return void 0;
    };
    var simpleRulesByAnnotation = {};
    simpleRules.forEach((rule) => {
      simpleRulesByAnnotation[rule.annotation] = rule;
    });
    var untransformValue = (json, type, superJson) => {
      if (isArray(type)) {
        switch (type[0]) {
          case "symbol":
            return symbolRule.untransform(json, type, superJson);
          case "class":
            return classRule.untransform(json, type, superJson);
          case "custom":
            return customRule.untransform(json, type, superJson);
          case "typed-array":
            return typedArrayRule.untransform(json, type, superJson);
          default:
            throw new Error("Unknown transformation: " + type);
        }
      } else {
        const transformation = simpleRulesByAnnotation[type];
        if (!transformation) {
          throw new Error("Unknown transformation: " + type);
        }
        return transformation.untransform(json, superJson);
      }
    };

    // ../../node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/accessDeep.js
    init_esm_shims();
    var getNthKey = (value, n) => {
      const keys = value.keys();
      while (n > 0) {
        keys.next();
        n--;
      }
      return keys.next().value;
    };
    function validatePath(path) {
      if (includes(path, "__proto__")) {
        throw new Error("__proto__ is not allowed as a property");
      }
      if (includes(path, "prototype")) {
        throw new Error("prototype is not allowed as a property");
      }
      if (includes(path, "constructor")) {
        throw new Error("constructor is not allowed as a property");
      }
    }
    var getDeep = (object, path) => {
      validatePath(path);
      for (let i = 0; i < path.length; i++) {
        const key = path[i];
        if (isSet(object)) {
          object = getNthKey(object, +key);
        } else if (isMap(object)) {
          const row = +key;
          const type = +path[++i] === 0 ? "key" : "value";
          const keyOfRow = getNthKey(object, row);
          switch (type) {
            case "key":
              object = keyOfRow;
              break;
            case "value":
              object = object.get(keyOfRow);
              break;
          }
        } else {
          object = object[key];
        }
      }
      return object;
    };
    var setDeep = (object, path, mapper) => {
      validatePath(path);
      if (path.length === 0) {
        return mapper(object);
      }
      let parent = object;
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (isArray(parent)) {
          const index = +key;
          parent = parent[index];
        } else if (isPlainObject2(parent)) {
          parent = parent[key];
        } else if (isSet(parent)) {
          const row = +key;
          parent = getNthKey(parent, row);
        } else if (isMap(parent)) {
          const isEnd = i === path.length - 2;
          if (isEnd) {
            break;
          }
          const row = +key;
          const type = +path[++i] === 0 ? "key" : "value";
          const keyOfRow = getNthKey(parent, row);
          switch (type) {
            case "key":
              parent = keyOfRow;
              break;
            case "value":
              parent = parent.get(keyOfRow);
              break;
          }
        }
      }
      const lastKey = path[path.length - 1];
      if (isArray(parent)) {
        parent[+lastKey] = mapper(parent[+lastKey]);
      } else if (isPlainObject2(parent)) {
        parent[lastKey] = mapper(parent[lastKey]);
      }
      if (isSet(parent)) {
        const oldValue = getNthKey(parent, +lastKey);
        const newValue = mapper(oldValue);
        if (oldValue !== newValue) {
          parent.delete(oldValue);
          parent.add(newValue);
        }
      }
      if (isMap(parent)) {
        const row = +path[path.length - 2];
        const keyToRow = getNthKey(parent, row);
        const type = +lastKey === 0 ? "key" : "value";
        switch (type) {
          case "key": {
            const newKey = mapper(keyToRow);
            parent.set(newKey, parent.get(keyToRow));
            if (newKey !== keyToRow) {
              parent.delete(keyToRow);
            }
            break;
          }
          case "value": {
            parent.set(keyToRow, mapper(parent.get(keyToRow)));
            break;
          }
        }
      }
      return object;
    };

    // ../../node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/plainer.js
    function traverse(tree, walker2, origin = []) {
      if (!tree) {
        return;
      }
      if (!isArray(tree)) {
        forEach(tree, (subtree, key) => traverse(subtree, walker2, [...origin, ...parsePath(key)]));
        return;
      }
      const [nodeValue, children] = tree;
      if (children) {
        forEach(children, (child, key) => {
          traverse(child, walker2, [...origin, ...parsePath(key)]);
        });
      }
      walker2(nodeValue, origin);
    }
    function applyValueAnnotations(plain, annotations, superJson) {
      traverse(annotations, (type, path) => {
        plain = setDeep(plain, path, (v) => untransformValue(v, type, superJson));
      });
      return plain;
    }
    function applyReferentialEqualityAnnotations(plain, annotations) {
      function apply(identicalPaths, path) {
        const object = getDeep(plain, parsePath(path));
        identicalPaths.map(parsePath).forEach((identicalObjectPath) => {
          plain = setDeep(plain, identicalObjectPath, () => object);
        });
      }
      if (isArray(annotations)) {
        const [root, other] = annotations;
        root.forEach((identicalPath) => {
          plain = setDeep(plain, parsePath(identicalPath), () => plain);
        });
        if (other) {
          forEach(other, apply);
        }
      } else {
        forEach(annotations, apply);
      }
      return plain;
    }
    var isDeep = (object, superJson) => isPlainObject2(object) || isArray(object) || isMap(object) || isSet(object) || isInstanceOfRegisteredClass(object, superJson);
    function addIdentity(object, path, identities) {
      const existingSet = identities.get(object);
      if (existingSet) {
        existingSet.push(path);
      } else {
        identities.set(object, [path]);
      }
    }
    function generateReferentialEqualityAnnotations(identitites, dedupe) {
      const result = {};
      let rootEqualityPaths = void 0;
      identitites.forEach((paths) => {
        if (paths.length <= 1) {
          return;
        }
        if (!dedupe) {
          paths = paths.map((path) => path.map(String)).sort((a, b) => a.length - b.length);
        }
        const [representativePath, ...identicalPaths] = paths;
        if (representativePath.length === 0) {
          rootEqualityPaths = identicalPaths.map(stringifyPath);
        } else {
          result[stringifyPath(representativePath)] = identicalPaths.map(stringifyPath);
        }
      });
      if (rootEqualityPaths) {
        if (isEmptyObject(result)) {
          return [rootEqualityPaths];
        } else {
          return [rootEqualityPaths, result];
        }
      } else {
        return isEmptyObject(result) ? void 0 : result;
      }
    }
    var walker = (object, identities, superJson, dedupe, path = [], objectsInThisPath = [], seenObjects = /* @__PURE__ */ new Map()) => {
      var _a25;
      const primitive = isPrimitive2(object);
      if (!primitive) {
        addIdentity(object, path, identities);
        const seen = seenObjects.get(object);
        if (seen) {
          return dedupe ? {
            transformedValue: null
          } : seen;
        }
      }
      if (!isDeep(object, superJson)) {
        const transformed2 = transformValue(object, superJson);
        const result2 = transformed2 ? {
          transformedValue: transformed2.value,
          annotations: [transformed2.type]
        } : {
          transformedValue: object
        };
        if (!primitive) {
          seenObjects.set(object, result2);
        }
        return result2;
      }
      if (includes(objectsInThisPath, object)) {
        return {
          transformedValue: null
        };
      }
      const transformationResult = transformValue(object, superJson);
      const transformed = (_a25 = transformationResult == null ? void 0 : transformationResult.value) != null ? _a25 : object;
      const transformedValue = isArray(transformed) ? [] : {};
      const innerAnnotations = {};
      forEach(transformed, (value, index) => {
        if (index === "__proto__" || index === "constructor" || index === "prototype") {
          throw new Error(`Detected property ${index}. This is a prototype pollution risk, please remove it from your object.`);
        }
        const recursiveResult = walker(value, identities, superJson, dedupe, [...path, index], [...objectsInThisPath, object], seenObjects);
        transformedValue[index] = recursiveResult.transformedValue;
        if (isArray(recursiveResult.annotations)) {
          innerAnnotations[index] = recursiveResult.annotations;
        } else if (isPlainObject2(recursiveResult.annotations)) {
          forEach(recursiveResult.annotations, (tree, key) => {
            innerAnnotations[escapeKey(index) + "." + key] = tree;
          });
        }
      });
      const result = isEmptyObject(innerAnnotations) ? {
        transformedValue,
        annotations: !!transformationResult ? [transformationResult.type] : void 0
      } : {
        transformedValue,
        annotations: !!transformationResult ? [transformationResult.type, innerAnnotations] : innerAnnotations
      };
      if (!primitive) {
        seenObjects.set(object, result);
      }
      return result;
    };

    // ../../node_modules/.pnpm/copy-anything@3.0.5/node_modules/copy-anything/dist/index.js
    init_esm_shims();

    // ../../node_modules/.pnpm/is-what@4.1.16/node_modules/is-what/dist/index.js
    init_esm_shims();
    function getType2(payload) {
      return Object.prototype.toString.call(payload).slice(8, -1);
    }
    function isArray2(payload) {
      return getType2(payload) === "Array";
    }
    function isPlainObject3(payload) {
      if (getType2(payload) !== "Object")
        return false;
      const prototype = Object.getPrototypeOf(payload);
      return !!prototype && prototype.constructor === Object && prototype === Object.prototype;
    }

    // ../../node_modules/.pnpm/copy-anything@3.0.5/node_modules/copy-anything/dist/index.js
    function assignProp(carry, key, newVal, originalObject, includeNonenumerable) {
      const propType = {}.propertyIsEnumerable.call(originalObject, key) ? "enumerable" : "nonenumerable";
      if (propType === "enumerable")
        carry[key] = newVal;
      if (includeNonenumerable && propType === "nonenumerable") {
        Object.defineProperty(carry, key, {
          value: newVal,
          enumerable: false,
          writable: true,
          configurable: true
        });
      }
    }
    function copy(target22, options = {}) {
      if (isArray2(target22)) {
        return target22.map((item) => copy(item, options));
      }
      if (!isPlainObject3(target22)) {
        return target22;
      }
      const props = Object.getOwnPropertyNames(target22);
      const symbols = Object.getOwnPropertySymbols(target22);
      return [...props, ...symbols].reduce((carry, key) => {
        if (isArray2(options.props) && !options.props.includes(key)) {
          return carry;
        }
        const val = target22[key];
        const newVal = copy(val, options);
        assignProp(carry, key, newVal, target22, options.nonenumerable);
        return carry;
      }, {});
    }

    // ../../node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/index.js
    var SuperJSON = class {
      /**
       * @param dedupeReferentialEqualities  If true, SuperJSON will make sure only one instance of referentially equal objects are serialized and the rest are replaced with `null`.
       */
      constructor({ dedupe = false } = {}) {
        this.classRegistry = new ClassRegistry();
        this.symbolRegistry = new Registry((s) => {
          var _a25;
          return (_a25 = s.description) != null ? _a25 : "";
        });
        this.customTransformerRegistry = new CustomTransformerRegistry();
        this.allowedErrorProps = [];
        this.dedupe = dedupe;
      }
      serialize(object) {
        const identities = /* @__PURE__ */ new Map();
        const output = walker(object, identities, this, this.dedupe);
        const res = {
          json: output.transformedValue
        };
        if (output.annotations) {
          res.meta = {
            ...res.meta,
            values: output.annotations
          };
        }
        const equalityAnnotations = generateReferentialEqualityAnnotations(identities, this.dedupe);
        if (equalityAnnotations) {
          res.meta = {
            ...res.meta,
            referentialEqualities: equalityAnnotations
          };
        }
        return res;
      }
      deserialize(payload) {
        const { json, meta } = payload;
        let result = copy(json);
        if (meta == null ? void 0 : meta.values) {
          result = applyValueAnnotations(result, meta.values, this);
        }
        if (meta == null ? void 0 : meta.referentialEqualities) {
          result = applyReferentialEqualityAnnotations(result, meta.referentialEqualities);
        }
        return result;
      }
      stringify(object) {
        return JSON.stringify(this.serialize(object));
      }
      parse(string) {
        return this.deserialize(JSON.parse(string));
      }
      registerClass(v, options) {
        this.classRegistry.register(v, options);
      }
      registerSymbol(v, identifier) {
        this.symbolRegistry.register(v, identifier);
      }
      registerCustom(transformer, name) {
        this.customTransformerRegistry.register({
          name,
          ...transformer
        });
      }
      allowErrorProps(...props) {
        this.allowedErrorProps.push(...props);
      }
    };
    SuperJSON.defaultInstance = new SuperJSON();
    SuperJSON.serialize = SuperJSON.defaultInstance.serialize.bind(SuperJSON.defaultInstance);
    SuperJSON.deserialize = SuperJSON.defaultInstance.deserialize.bind(SuperJSON.defaultInstance);
    SuperJSON.stringify = SuperJSON.defaultInstance.stringify.bind(SuperJSON.defaultInstance);
    SuperJSON.parse = SuperJSON.defaultInstance.parse.bind(SuperJSON.defaultInstance);
    SuperJSON.registerClass = SuperJSON.defaultInstance.registerClass.bind(SuperJSON.defaultInstance);
    SuperJSON.registerSymbol = SuperJSON.defaultInstance.registerSymbol.bind(SuperJSON.defaultInstance);
    SuperJSON.registerCustom = SuperJSON.defaultInstance.registerCustom.bind(SuperJSON.defaultInstance);
    SuperJSON.allowErrorProps = SuperJSON.defaultInstance.allowErrorProps.bind(SuperJSON.defaultInstance);

    // src/messaging/presets/broadcast-channel/context.ts
    init_esm_shims();

    // src/messaging/presets/electron/index.ts
    init_esm_shims();

    // src/messaging/presets/electron/client.ts
    init_esm_shims();

    // src/messaging/presets/electron/context.ts
    init_esm_shims();

    // src/messaging/presets/electron/proxy.ts
    init_esm_shims();

    // src/messaging/presets/electron/server.ts
    init_esm_shims();

    // src/messaging/presets/extension/index.ts
    init_esm_shims();

    // src/messaging/presets/extension/client.ts
    init_esm_shims();

    // src/messaging/presets/extension/context.ts
    init_esm_shims();

    // src/messaging/presets/extension/proxy.ts
    init_esm_shims();

    // src/messaging/presets/extension/server.ts
    init_esm_shims();

    // src/messaging/presets/iframe/index.ts
    init_esm_shims();

    // src/messaging/presets/iframe/client.ts
    init_esm_shims();

    // src/messaging/presets/iframe/context.ts
    init_esm_shims();

    // src/messaging/presets/iframe/server.ts
    init_esm_shims();

    // src/messaging/presets/vite/index.ts
    init_esm_shims();

    // src/messaging/presets/vite/client.ts
    init_esm_shims();

    // src/messaging/presets/vite/context.ts
    init_esm_shims();

    // src/messaging/presets/vite/server.ts
    init_esm_shims();

    // src/messaging/presets/ws/index.ts
    init_esm_shims();

    // src/messaging/presets/ws/client.ts
    init_esm_shims();

    // src/messaging/presets/ws/context.ts
    init_esm_shims();

    // src/messaging/presets/ws/server.ts
    init_esm_shims();

    // src/messaging/index.ts
    var _a19, _b19;
    (_b19 = (_a19 = target).__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__) != null ? _b19 : _a19.__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__ = [];
    var _a20, _b20;
    (_b20 = (_a20 = target).__VUE_DEVTOOLS_KIT_RPC_CLIENT__) != null ? _b20 : _a20.__VUE_DEVTOOLS_KIT_RPC_CLIENT__ = null;
    var _a21, _b21;
    (_b21 = (_a21 = target).__VUE_DEVTOOLS_KIT_RPC_SERVER__) != null ? _b21 : _a21.__VUE_DEVTOOLS_KIT_RPC_SERVER__ = null;
    var _a22, _b22;
    (_b22 = (_a22 = target).__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__) != null ? _b22 : _a22.__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__ = null;
    var _a23, _b23;
    (_b23 = (_a23 = target).__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__) != null ? _b23 : _a23.__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__ = null;
    var _a24, _b24;
    (_b24 = (_a24 = target).__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__) != null ? _b24 : _a24.__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__ = null;

    // src/shared/index.ts
    init_esm_shims();

    // src/shared/env.ts
    init_esm_shims();

    // src/shared/time.ts
    init_esm_shims();

    // src/shared/util.ts
    init_esm_shims();

    // src/core/component/state/replacer.ts
    init_esm_shims();

    // src/core/component/state/custom.ts
    init_esm_shims();

    // src/shared/transfer.ts
    init_esm_shims();

    /**
     * Creates a field composite.
     */
    function useField(path, rules, opts) {
        if (hasCheckedAttr(opts === null || opts === void 0 ? void 0 : opts.type)) {
            return useFieldWithChecked(path, rules, opts);
        }
        return _useField(path, rules, opts);
    }
    function _useField(path, rules, opts) {
        const { initialValue: modelValue, validateOnMount, bails, type, checkedValue, label, validateOnValueUpdate, uncheckedValue, controlled, keepValueOnUnmount, syncVModel, form: controlForm, } = normalizeOptions(opts);
        const injectedForm = controlled ? injectWithSelf(FormContextKey) : undefined;
        const form = controlForm || injectedForm;
        const name = vue.computed(() => normalizeFormPath(vue.toValue(path)));
        const validator = vue.computed(() => {
            const schema = vue.toValue(form === null || form === void 0 ? void 0 : form.schema);
            if (schema) {
                return undefined;
            }
            const rulesValue = vue.unref(rules);
            if (isYupValidator(rulesValue) ||
                isTypedSchema(rulesValue) ||
                isCallable(rulesValue) ||
                Array.isArray(rulesValue)) {
                return rulesValue;
            }
            return normalizeRules(rulesValue);
        });
        const isTyped = !isCallable(validator.value) && isTypedSchema(vue.toValue(rules));
        const { id, value, initialValue, meta, setState, errors, flags } = useFieldState(name, {
            modelValue,
            form,
            bails,
            label,
            type,
            validate: validator.value ? validate$1 : undefined,
            schema: isTyped ? rules : undefined,
        });
        const errorMessage = vue.computed(() => errors.value[0]);
        if (syncVModel) {
            useVModel({
                value,
                prop: syncVModel,
                handleChange,
                shouldValidate: () => validateOnValueUpdate && !flags.pendingReset,
            });
        }
        /**
         * Handles common onBlur meta update
         */
        const handleBlur = (evt, shouldValidate = false) => {
            meta.touched = true;
            if (shouldValidate) {
                validateWithStateMutation();
            }
        };
        async function validateCurrentValue(mode) {
            var _a, _b;
            if (form === null || form === void 0 ? void 0 : form.validateSchema) {
                const { results } = await form.validateSchema(mode);
                return (_a = results[vue.toValue(name)]) !== null && _a !== void 0 ? _a : { valid: true, errors: [] };
            }
            if (validator.value) {
                return validate(value.value, validator.value, {
                    name: vue.toValue(name),
                    label: vue.toValue(label),
                    values: (_b = form === null || form === void 0 ? void 0 : form.values) !== null && _b !== void 0 ? _b : {},
                    bails,
                });
            }
            return { valid: true, errors: [] };
        }
        const validateWithStateMutation = withLatest(async () => {
            meta.pending = true;
            meta.validated = true;
            return validateCurrentValue('validated-only');
        }, result => {
            if (flags.pendingUnmount[field.id]) {
                return result;
            }
            setState({ errors: result.errors });
            meta.pending = false;
            meta.valid = result.valid;
            return result;
        });
        const validateValidStateOnly = withLatest(async () => {
            return validateCurrentValue('silent');
        }, result => {
            meta.valid = result.valid;
            return result;
        });
        function validate$1(opts) {
            if ((opts === null || opts === void 0 ? void 0 : opts.mode) === 'silent') {
                return validateValidStateOnly();
            }
            return validateWithStateMutation();
        }
        // Common input/change event handler
        function handleChange(e, shouldValidate = true) {
            const newValue = normalizeEventValue(e);
            setValue(newValue, shouldValidate);
        }
        // Runs the initial validation
        vue.onMounted(() => {
            if (validateOnMount) {
                return validateWithStateMutation();
            }
            // validate self initially if no form was handling this
            // forms should have their own initial silent validation run to make things more efficient
            if (!form || !form.validateSchema) {
                validateValidStateOnly();
            }
        });
        function setTouched(isTouched) {
            meta.touched = isTouched;
        }
        function resetField(state) {
            var _a;
            const newValue = state && 'value' in state ? state.value : initialValue.value;
            setState({
                value: klona(newValue),
                initialValue: klona(newValue),
                touched: (_a = state === null || state === void 0 ? void 0 : state.touched) !== null && _a !== void 0 ? _a : false,
                errors: (state === null || state === void 0 ? void 0 : state.errors) || [],
            });
            meta.pending = false;
            meta.validated = false;
            validateValidStateOnly();
        }
        const vm = vue.getCurrentInstance();
        function setValue(newValue, shouldValidate = true) {
            value.value = vm && syncVModel ? applyModelModifiers(newValue, vm.props.modelModifiers) : newValue;
            const validateFn = shouldValidate ? validateWithStateMutation : validateValidStateOnly;
            validateFn();
        }
        function setErrors(errors) {
            setState({ errors: Array.isArray(errors) ? errors : [errors] });
        }
        const valueProxy = vue.computed({
            get() {
                return value.value;
            },
            set(newValue) {
                setValue(newValue, validateOnValueUpdate);
            },
        });
        const field = {
            id,
            name,
            label,
            value: valueProxy,
            meta,
            errors,
            errorMessage,
            type,
            checkedValue,
            uncheckedValue,
            bails,
            keepValueOnUnmount,
            resetField,
            handleReset: () => resetField(),
            validate: validate$1,
            handleChange,
            handleBlur,
            setState,
            setTouched,
            setErrors,
            setValue,
        };
        vue.provide(FieldContextKey, field);
        if (vue.isRef(rules) && typeof vue.unref(rules) !== 'function') {
            vue.watch(rules, (value, oldValue) => {
                if (isEqual(value, oldValue)) {
                    return;
                }
                meta.validated ? validateWithStateMutation() : validateValidStateOnly();
            }, {
                deep: true,
            });
        }
        // if no associated form return the field API immediately
        if (!form) {
            return field;
        }
        // associate the field with the given form
        // extract cross-field dependencies in a computed prop
        const dependencies = vue.computed(() => {
            const rulesVal = validator.value;
            // is falsy, a function schema or a yup schema
            if (!rulesVal ||
                isCallable(rulesVal) ||
                isYupValidator(rulesVal) ||
                isTypedSchema(rulesVal) ||
                Array.isArray(rulesVal)) {
                return {};
            }
            return Object.keys(rulesVal).reduce((acc, rule) => {
                const deps = extractLocators(rulesVal[rule])
                    .map((dep) => dep.__locatorRef)
                    .reduce((depAcc, depName) => {
                    const depValue = getFromPath(form.values, depName) || form.values[depName];
                    if (depValue !== undefined) {
                        depAcc[depName] = depValue;
                    }
                    return depAcc;
                }, {});
                Object.assign(acc, deps);
                return acc;
            }, {});
        });
        // Adds a watcher that runs the validation whenever field dependencies change
        vue.watch(dependencies, (deps, oldDeps) => {
            // Skip if no dependencies or if the field wasn't manipulated
            if (!Object.keys(deps).length) {
                return;
            }
            const shouldValidate = !isEqual(deps, oldDeps);
            if (shouldValidate) {
                meta.validated ? validateWithStateMutation() : validateValidStateOnly();
            }
        });
        vue.onBeforeUnmount(() => {
            var _a;
            const shouldKeepValue = (_a = vue.toValue(field.keepValueOnUnmount)) !== null && _a !== void 0 ? _a : vue.toValue(form.keepValuesOnUnmount);
            const path = vue.toValue(name);
            if (shouldKeepValue || !form || flags.pendingUnmount[field.id]) {
                form === null || form === void 0 ? void 0 : form.removePathState(path, id);
                return;
            }
            flags.pendingUnmount[field.id] = true;
            const pathState = form.getPathState(path);
            const matchesId = Array.isArray(pathState === null || pathState === void 0 ? void 0 : pathState.id) && (pathState === null || pathState === void 0 ? void 0 : pathState.multiple)
                ? pathState === null || pathState === void 0 ? void 0 : pathState.id.includes(field.id)
                : (pathState === null || pathState === void 0 ? void 0 : pathState.id) === field.id;
            if (!matchesId) {
                return;
            }
            if ((pathState === null || pathState === void 0 ? void 0 : pathState.multiple) && Array.isArray(pathState.value)) {
                const valueIdx = pathState.value.findIndex(i => isEqual(i, vue.toValue(field.checkedValue)));
                if (valueIdx > -1) {
                    const newVal = [...pathState.value];
                    newVal.splice(valueIdx, 1);
                    form.setFieldValue(path, newVal);
                }
                if (Array.isArray(pathState.id)) {
                    pathState.id.splice(pathState.id.indexOf(field.id), 1);
                }
            }
            else {
                form.unsetPathValue(vue.toValue(name));
            }
            form.removePathState(path, id);
        });
        return field;
    }
    /**
     * Normalizes partial field options to include the full options
     */
    function normalizeOptions(opts) {
        const defaults = () => ({
            initialValue: undefined,
            validateOnMount: false,
            bails: true,
            label: undefined,
            validateOnValueUpdate: true,
            keepValueOnUnmount: undefined,
            syncVModel: false,
            controlled: true,
        });
        const isVModelSynced = !!(opts === null || opts === void 0 ? void 0 : opts.syncVModel);
        const modelPropName = typeof (opts === null || opts === void 0 ? void 0 : opts.syncVModel) === 'string' ? opts.syncVModel : (opts === null || opts === void 0 ? void 0 : opts.modelPropName) || 'modelValue';
        const initialValue = isVModelSynced && !('initialValue' in (opts || {}))
            ? getCurrentModelValue(vue.getCurrentInstance(), modelPropName)
            : opts === null || opts === void 0 ? void 0 : opts.initialValue;
        if (!opts) {
            return Object.assign(Object.assign({}, defaults()), { initialValue });
        }
        // TODO: Deprecate this in next major release
        const checkedValue = 'valueProp' in opts ? opts.valueProp : opts.checkedValue;
        const controlled = 'standalone' in opts ? !opts.standalone : opts.controlled;
        const syncVModel = (opts === null || opts === void 0 ? void 0 : opts.modelPropName) || (opts === null || opts === void 0 ? void 0 : opts.syncVModel) || false;
        return Object.assign(Object.assign(Object.assign({}, defaults()), (opts || {})), { initialValue, controlled: controlled !== null && controlled !== void 0 ? controlled : true, checkedValue,
            syncVModel });
    }
    function useFieldWithChecked(name, rules, opts) {
        const form = !(opts === null || opts === void 0 ? void 0 : opts.standalone) ? injectWithSelf(FormContextKey) : undefined;
        const checkedValue = opts === null || opts === void 0 ? void 0 : opts.checkedValue;
        const uncheckedValue = opts === null || opts === void 0 ? void 0 : opts.uncheckedValue;
        function patchCheckedApi(field) {
            const handleChange = field.handleChange;
            const checked = vue.computed(() => {
                const currentValue = vue.toValue(field.value);
                const checkedVal = vue.toValue(checkedValue);
                return Array.isArray(currentValue)
                    ? currentValue.findIndex(v => isEqual(v, checkedVal)) >= 0
                    : isEqual(checkedVal, currentValue);
            });
            function handleCheckboxChange(e, shouldValidate = true) {
                var _a, _b;
                if (checked.value === ((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.checked)) {
                    if (shouldValidate) {
                        field.validate();
                    }
                    return;
                }
                const path = vue.toValue(name);
                const pathState = form === null || form === void 0 ? void 0 : form.getPathState(path);
                const value = normalizeEventValue(e);
                let newValue = (_b = vue.toValue(checkedValue)) !== null && _b !== void 0 ? _b : value;
                if (form && (pathState === null || pathState === void 0 ? void 0 : pathState.multiple) && pathState.type === 'checkbox') {
                    newValue = resolveNextCheckboxValue(getFromPath(form.values, path) || [], newValue, undefined);
                }
                else if ((opts === null || opts === void 0 ? void 0 : opts.type) === 'checkbox') {
                    newValue = resolveNextCheckboxValue(vue.toValue(field.value), newValue, vue.toValue(uncheckedValue));
                }
                handleChange(newValue, shouldValidate);
            }
            return Object.assign(Object.assign({}, field), { checked,
                checkedValue,
                uncheckedValue, handleChange: handleCheckboxChange });
        }
        return patchCheckedApi(_useField(name, rules, opts));
    }
    function useVModel({ prop, value, handleChange, shouldValidate }) {
        const vm = vue.getCurrentInstance();
        /* istanbul ignore next */
        if (!vm || !prop) {
            return;
        }
        const propName = typeof prop === 'string' ? prop : 'modelValue';
        const emitName = `update:${propName}`;
        // Component doesn't have a model prop setup (must be defined on the props)
        if (!(propName in vm.props)) {
            return;
        }
        vue.watch(value, newValue => {
            if (isEqual(newValue, getCurrentModelValue(vm, propName))) {
                return;
            }
            vm.emit(emitName, newValue);
        });
        vue.watch(() => getCurrentModelValue(vm, propName), propValue => {
            if (propValue === IS_ABSENT && value.value === undefined) {
                return;
            }
            const newValue = propValue === IS_ABSENT ? undefined : propValue;
            if (isEqual(newValue, value.value)) {
                return;
            }
            handleChange(newValue, shouldValidate());
        });
    }
    function getCurrentModelValue(vm, propName) {
        if (!vm) {
            return undefined;
        }
        return vm.props[propName];
    }

    const FieldImpl = /** #__PURE__ */ vue.defineComponent({
        name: 'Field',
        inheritAttrs: false,
        props: {
            as: {
                type: [String, Object],
                default: undefined,
            },
            name: {
                type: String,
                required: true,
            },
            rules: {
                type: [Object, String, Function],
                default: undefined,
            },
            validateOnMount: {
                type: Boolean,
                default: false,
            },
            validateOnBlur: {
                type: Boolean,
                default: undefined,
            },
            validateOnChange: {
                type: Boolean,
                default: undefined,
            },
            validateOnInput: {
                type: Boolean,
                default: undefined,
            },
            validateOnModelUpdate: {
                type: Boolean,
                default: undefined,
            },
            bails: {
                type: Boolean,
                default: () => getConfig().bails,
            },
            label: {
                type: String,
                default: undefined,
            },
            uncheckedValue: {
                type: null,
                default: undefined,
            },
            modelValue: {
                type: null,
                default: IS_ABSENT,
            },
            modelModifiers: {
                type: null,
                default: () => ({}),
            },
            'onUpdate:modelValue': {
                type: null,
                default: undefined,
            },
            standalone: {
                type: Boolean,
                default: false,
            },
            keepValue: {
                type: Boolean,
                default: undefined,
            },
        },
        setup(props, ctx) {
            const rules = vue.toRef(props, 'rules');
            const name = vue.toRef(props, 'name');
            const label = vue.toRef(props, 'label');
            const uncheckedValue = vue.toRef(props, 'uncheckedValue');
            const keepValue = vue.toRef(props, 'keepValue');
            const { errors, value, errorMessage, validate: validateField, handleChange, handleBlur, setTouched, resetField, handleReset, meta, checked, setErrors, setValue, } = useField(name, rules, {
                validateOnMount: props.validateOnMount,
                bails: props.bails,
                standalone: props.standalone,
                type: ctx.attrs.type,
                initialValue: resolveInitialValue(props, ctx),
                // Only for checkboxes and radio buttons
                checkedValue: ctx.attrs.value,
                uncheckedValue,
                label,
                validateOnValueUpdate: props.validateOnModelUpdate,
                keepValueOnUnmount: keepValue,
                syncVModel: true,
            });
            // If there is a v-model applied on the component we need to emit the `update:modelValue` whenever the value binding changes
            const onChangeHandler = function handleChangeWithModel(e, shouldValidate = true) {
                handleChange(e, shouldValidate);
            };
            const sharedProps = vue.computed(() => {
                const { validateOnInput, validateOnChange, validateOnBlur, validateOnModelUpdate } = resolveValidationTriggers(props);
                function baseOnBlur(e) {
                    handleBlur(e, validateOnBlur);
                    if (isCallable(ctx.attrs.onBlur)) {
                        ctx.attrs.onBlur(e);
                    }
                }
                function baseOnInput(e) {
                    onChangeHandler(e, validateOnInput);
                    if (isCallable(ctx.attrs.onInput)) {
                        ctx.attrs.onInput(e);
                    }
                }
                function baseOnChange(e) {
                    onChangeHandler(e, validateOnChange);
                    if (isCallable(ctx.attrs.onChange)) {
                        ctx.attrs.onChange(e);
                    }
                }
                const attrs = {
                    name: props.name,
                    onBlur: baseOnBlur,
                    onInput: baseOnInput,
                    onChange: baseOnChange,
                };
                attrs['onUpdate:modelValue'] = e => onChangeHandler(e, validateOnModelUpdate);
                return attrs;
            });
            const fieldProps = vue.computed(() => {
                const attrs = Object.assign({}, sharedProps.value);
                if (hasCheckedAttr(ctx.attrs.type) && checked) {
                    attrs.checked = checked.value;
                }
                const tag = resolveTag(props, ctx);
                if (shouldHaveValueBinding(tag, ctx.attrs)) {
                    attrs.value = value.value;
                }
                return attrs;
            });
            const componentProps = vue.computed(() => {
                return Object.assign(Object.assign({}, sharedProps.value), { modelValue: value.value });
            });
            function slotProps() {
                return {
                    field: fieldProps.value,
                    componentField: componentProps.value,
                    value: value.value,
                    meta,
                    errors: errors.value,
                    errorMessage: errorMessage.value,
                    validate: validateField,
                    resetField,
                    handleChange: onChangeHandler,
                    handleInput: e => onChangeHandler(e, false),
                    handleReset,
                    handleBlur: sharedProps.value.onBlur,
                    setTouched,
                    setErrors,
                    setValue,
                };
            }
            ctx.expose({
                value,
                meta,
                errors,
                errorMessage,
                setErrors,
                setTouched,
                setValue,
                reset: resetField,
                validate: validateField,
                handleChange,
            });
            return () => {
                const tag = vue.resolveDynamicComponent(resolveTag(props, ctx));
                const children = normalizeChildren(tag, ctx, slotProps);
                if (tag) {
                    return vue.h(tag, Object.assign(Object.assign({}, ctx.attrs), fieldProps.value), children);
                }
                return children;
            };
        },
    });
    function resolveTag(props, ctx) {
        let tag = props.as || '';
        if (!props.as && !ctx.slots.default) {
            tag = 'input';
        }
        return tag;
    }
    function resolveValidationTriggers(props) {
        var _a, _b, _c, _d;
        const { validateOnInput, validateOnChange, validateOnBlur, validateOnModelUpdate } = getConfig();
        return {
            validateOnInput: (_a = props.validateOnInput) !== null && _a !== void 0 ? _a : validateOnInput,
            validateOnChange: (_b = props.validateOnChange) !== null && _b !== void 0 ? _b : validateOnChange,
            validateOnBlur: (_c = props.validateOnBlur) !== null && _c !== void 0 ? _c : validateOnBlur,
            validateOnModelUpdate: (_d = props.validateOnModelUpdate) !== null && _d !== void 0 ? _d : validateOnModelUpdate,
        };
    }
    function resolveInitialValue(props, ctx) {
        // Gets the initial value either from `value` prop/attr or `v-model` binding (modelValue)
        // For checkboxes and radio buttons it will always be the model value not the `value` attribute
        if (!hasCheckedAttr(ctx.attrs.type)) {
            return isPropPresent(props, 'modelValue') ? props.modelValue : ctx.attrs.value;
        }
        return isPropPresent(props, 'modelValue') ? props.modelValue : undefined;
    }
    const Field = FieldImpl;

    let FORM_COUNTER = 0;
    const PRIVATE_PATH_STATE_KEYS = ['bails', 'fieldsCount', 'id', 'multiple', 'type', 'validate'];
    function resolveInitialValues(opts) {
        const givenInitial = (opts === null || opts === void 0 ? void 0 : opts.initialValues) || {};
        const providedValues = Object.assign({}, vue.toValue(givenInitial));
        const schema = vue.unref(opts === null || opts === void 0 ? void 0 : opts.validationSchema);
        if (schema && isTypedSchema(schema) && isCallable(schema.cast)) {
            return klona(schema.cast(providedValues) || {});
        }
        return klona(providedValues);
    }
    function useForm(opts) {
        var _a;
        const formId = FORM_COUNTER++;
        const name = (opts === null || opts === void 0 ? void 0 : opts.name) || 'Form';
        // Prevents fields from double resetting their values, which causes checkboxes to toggle their initial value
        let FIELD_ID_COUNTER = 0;
        // If the form is currently submitting
        const isSubmitting = vue.ref(false);
        // If the form is currently validating
        const isValidating = vue.ref(false);
        // The number of times the user tried to submit the form
        const submitCount = vue.ref(0);
        // field arrays managed by this form
        const fieldArrays = [];
        // a private ref for all form values
        const formValues = vue.reactive(resolveInitialValues(opts));
        const pathStates = vue.ref([]);
        const extraErrorsBag = vue.ref({});
        const pathStateLookup = vue.ref({});
        const rebuildPathLookup = debounceNextTick(() => {
            pathStateLookup.value = pathStates.value.reduce((names, state) => {
                names[normalizeFormPath(vue.toValue(state.path))] = state;
                return names;
            }, {});
        });
        /**
         * Manually sets an error message on a specific field
         */
        function setFieldError(field, message) {
            const state = findPathState(field);
            if (!state) {
                if (typeof field === 'string') {
                    extraErrorsBag.value[normalizeFormPath(field)] = normalizeErrorItem(message);
                }
                return;
            }
            // Move the error from the extras path if exists
            if (typeof field === 'string') {
                const normalizedPath = normalizeFormPath(field);
                if (extraErrorsBag.value[normalizedPath]) {
                    delete extraErrorsBag.value[normalizedPath];
                }
            }
            state.errors = normalizeErrorItem(message);
            state.valid = !state.errors.length;
        }
        /**
         * Sets errors for the fields specified in the object
         */
        function setErrors(paths) {
            keysOf(paths).forEach(path => {
                setFieldError(path, paths[path]);
            });
        }
        if (opts === null || opts === void 0 ? void 0 : opts.initialErrors) {
            setErrors(opts.initialErrors);
        }
        const errorBag = vue.computed(() => {
            const pathErrors = pathStates.value.reduce((acc, state) => {
                if (state.errors.length) {
                    acc[vue.toValue(state.path)] = state.errors;
                }
                return acc;
            }, {});
            return Object.assign(Object.assign({}, extraErrorsBag.value), pathErrors);
        });
        // Gets the first error of each field
        const errors = vue.computed(() => {
            return keysOf(errorBag.value).reduce((acc, key) => {
                const errors = errorBag.value[key];
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    acc[key] = errors[0];
                }
                return acc;
            }, {});
        });
        /**
         * Holds a computed reference to all fields names and labels
         */
        const fieldNames = vue.computed(() => {
            return pathStates.value.reduce((names, state) => {
                names[vue.toValue(state.path)] = { name: vue.toValue(state.path) || '', label: state.label || '' };
                return names;
            }, {});
        });
        const fieldBailsMap = vue.computed(() => {
            return pathStates.value.reduce((map, state) => {
                var _a;
                map[vue.toValue(state.path)] = (_a = state.bails) !== null && _a !== void 0 ? _a : true;
                return map;
            }, {});
        });
        // mutable non-reactive reference to initial errors
        // we need this to process initial errors then unset them
        const initialErrors = Object.assign({}, ((opts === null || opts === void 0 ? void 0 : opts.initialErrors) || {}));
        const keepValuesOnUnmount = (_a = opts === null || opts === void 0 ? void 0 : opts.keepValuesOnUnmount) !== null && _a !== void 0 ? _a : false;
        // initial form values
        const { initialValues, originalInitialValues, setInitialValues } = useFormInitialValues(pathStates, formValues, opts);
        // form meta aggregations
        const meta = useFormMeta(pathStates, formValues, originalInitialValues, errors);
        const controlledValues = vue.computed(() => {
            return pathStates.value.reduce((acc, state) => {
                const value = getFromPath(formValues, vue.toValue(state.path));
                setInPath(acc, vue.toValue(state.path), value);
                return acc;
            }, {});
        });
        const schema = opts === null || opts === void 0 ? void 0 : opts.validationSchema;
        function createPathState(path, config) {
            var _a, _b;
            const initialValue = vue.computed(() => getFromPath(initialValues.value, vue.toValue(path)));
            const pathStateExists = pathStateLookup.value[vue.toValue(path)];
            const isCheckboxOrRadio = (config === null || config === void 0 ? void 0 : config.type) === 'checkbox' || (config === null || config === void 0 ? void 0 : config.type) === 'radio';
            if (pathStateExists && isCheckboxOrRadio) {
                pathStateExists.multiple = true;
                const id = FIELD_ID_COUNTER++;
                if (Array.isArray(pathStateExists.id)) {
                    pathStateExists.id.push(id);
                }
                else {
                    pathStateExists.id = [pathStateExists.id, id];
                }
                pathStateExists.fieldsCount++;
                pathStateExists.__flags.pendingUnmount[id] = false;
                return pathStateExists;
            }
            const currentValue = vue.computed(() => getFromPath(formValues, vue.toValue(path)));
            const pathValue = vue.toValue(path);
            const unsetBatchIndex = UNSET_BATCH.findIndex(_path => _path === pathValue);
            if (unsetBatchIndex !== -1) {
                UNSET_BATCH.splice(unsetBatchIndex, 1);
            }
            const isRequired = vue.computed(() => {
                var _a, _b, _c, _d;
                const schemaValue = vue.toValue(schema);
                if (isTypedSchema(schemaValue)) {
                    return (_b = (_a = schemaValue.describe) === null || _a === void 0 ? void 0 : _a.call(schemaValue, vue.toValue(path)).required) !== null && _b !== void 0 ? _b : false;
                }
                // Path own schema
                const configSchemaValue = vue.toValue(config === null || config === void 0 ? void 0 : config.schema);
                if (isTypedSchema(configSchemaValue)) {
                    return (_d = (_c = configSchemaValue.describe) === null || _c === void 0 ? void 0 : _c.call(configSchemaValue).required) !== null && _d !== void 0 ? _d : false;
                }
                return false;
            });
            const id = FIELD_ID_COUNTER++;
            const state = vue.reactive({
                id,
                path,
                touched: false,
                pending: false,
                valid: true,
                validated: !!((_a = initialErrors[pathValue]) === null || _a === void 0 ? void 0 : _a.length),
                required: isRequired,
                initialValue,
                errors: vue.shallowRef([]),
                bails: (_b = config === null || config === void 0 ? void 0 : config.bails) !== null && _b !== void 0 ? _b : false,
                label: config === null || config === void 0 ? void 0 : config.label,
                type: (config === null || config === void 0 ? void 0 : config.type) || 'default',
                value: currentValue,
                multiple: false,
                __flags: {
                    pendingUnmount: { [id]: false },
                    pendingReset: false,
                },
                fieldsCount: 1,
                validate: config === null || config === void 0 ? void 0 : config.validate,
                dirty: vue.computed(() => {
                    return !isEqual(vue.unref(currentValue), vue.unref(initialValue));
                }),
            });
            pathStates.value.push(state);
            pathStateLookup.value[pathValue] = state;
            rebuildPathLookup();
            if (errors.value[pathValue] && !initialErrors[pathValue]) {
                vue.nextTick(() => {
                    validateField(pathValue, { mode: 'silent' });
                });
            }
            // Handles when a path changes
            if (vue.isRef(path)) {
                vue.watch(path, newPath => {
                    rebuildPathLookup();
                    const nextValue = klona(currentValue.value);
                    pathStateLookup.value[newPath] = state;
                    vue.nextTick(() => {
                        setInPath(formValues, newPath, nextValue);
                    });
                });
            }
            return state;
        }
        /**
         * Batches validation runs in 5ms batches
         * Must have two distinct batch queues to make sure they don't override each other settings #3783
         */
        const debouncedSilentValidation = debounceAsync(_validateSchema, 5);
        const debouncedValidation = debounceAsync(_validateSchema, 5);
        const validateSchema = withLatest(async (mode) => {
            return (await (mode === 'silent'
                ? debouncedSilentValidation()
                : debouncedValidation()));
        }, (formResult, [mode]) => {
            // fields by id lookup
            // errors fields names, we need it to also check if custom errors are updated
            const currentErrorsPaths = keysOf(formCtx.errorBag.value);
            // collect all the keys from the schema and all fields
            // this ensures we have a complete key map of all the fields
            const paths = [
                ...new Set([...keysOf(formResult.results), ...pathStates.value.map(p => p.path), ...currentErrorsPaths]),
            ].sort();
            // aggregates the paths into a single result object while applying the results on the fields
            const results = paths.reduce((validation, _path) => {
                var _a;
                const expectedPath = _path;
                const pathState = findPathState(expectedPath) || findHoistedPath(expectedPath);
                const messages = ((_a = formResult.results[expectedPath]) === null || _a === void 0 ? void 0 : _a.errors) || [];
                // This is the real path of the field, because it might've been a hoisted field
                const path = (vue.toValue(pathState === null || pathState === void 0 ? void 0 : pathState.path) || expectedPath);
                // It is possible that multiple paths are collected across loops
                // We want to merge them to avoid overriding any iteration's results
                const fieldResult = mergeValidationResults({ errors: messages, valid: !messages.length }, validation.results[path]);
                validation.results[path] = fieldResult;
                if (!fieldResult.valid) {
                    validation.errors[path] = fieldResult.errors[0];
                }
                // clean up extra errors if path state exists
                if (pathState && extraErrorsBag.value[path]) {
                    delete extraErrorsBag.value[path];
                }
                // field not rendered
                if (!pathState) {
                    setFieldError(path, messages);
                    return validation;
                }
                // always update the valid flag regardless of the mode
                pathState.valid = fieldResult.valid;
                if (mode === 'silent') {
                    return validation;
                }
                if (mode === 'validated-only' && !pathState.validated) {
                    return validation;
                }
                setFieldError(pathState, fieldResult.errors);
                return validation;
            }, {
                valid: formResult.valid,
                results: {},
                errors: {},
                source: formResult.source,
            });
            if (formResult.values) {
                results.values = formResult.values;
                results.source = formResult.source;
            }
            keysOf(results.results).forEach(path => {
                var _a;
                const pathState = findPathState(path);
                if (!pathState) {
                    return;
                }
                if (mode === 'silent') {
                    return;
                }
                if (mode === 'validated-only' && !pathState.validated) {
                    return;
                }
                setFieldError(pathState, (_a = results.results[path]) === null || _a === void 0 ? void 0 : _a.errors);
            });
            return results;
        });
        function mutateAllPathState(mutation) {
            pathStates.value.forEach(mutation);
        }
        function findPathState(path) {
            const normalizedPath = typeof path === 'string' ? normalizeFormPath(path) : path;
            const pathState = typeof normalizedPath === 'string' ? pathStateLookup.value[normalizedPath] : normalizedPath;
            return pathState;
        }
        function findHoistedPath(path) {
            const candidates = pathStates.value.filter(state => path.startsWith(vue.toValue(state.path)));
            return candidates.reduce((bestCandidate, candidate) => {
                if (!bestCandidate) {
                    return candidate;
                }
                return (candidate.path.length > bestCandidate.path.length ? candidate : bestCandidate);
            }, undefined);
        }
        let UNSET_BATCH = [];
        let PENDING_UNSET;
        function unsetPathValue(path) {
            UNSET_BATCH.push(path);
            if (!PENDING_UNSET) {
                PENDING_UNSET = vue.nextTick(() => {
                    const sortedPaths = [...UNSET_BATCH].sort().reverse();
                    sortedPaths.forEach(p => {
                        unsetPath(formValues, p);
                    });
                    UNSET_BATCH = [];
                    PENDING_UNSET = null;
                });
            }
            return PENDING_UNSET;
        }
        function makeSubmissionFactory(onlyControlled) {
            return function submitHandlerFactory(fn, onValidationError) {
                return function submissionHandler(e) {
                    if (e instanceof Event) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    // Touch all fields
                    mutateAllPathState(s => (s.touched = true));
                    isSubmitting.value = true;
                    submitCount.value++;
                    return validate()
                        .then(result => {
                        const values = klona(formValues);
                        if (result.valid && typeof fn === 'function') {
                            const controlled = klona(controlledValues.value);
                            let submittedValues = (onlyControlled ? controlled : values);
                            if (result.values) {
                                submittedValues =
                                    result.source === 'schema'
                                        ? result.values
                                        : Object.assign({}, submittedValues, result.values);
                            }
                            return fn(submittedValues, {
                                evt: e,
                                controlledValues: controlled,
                                setErrors,
                                setFieldError,
                                setTouched,
                                setFieldTouched,
                                setValues,
                                setFieldValue,
                                resetForm,
                                resetField,
                            });
                        }
                        if (!result.valid && typeof onValidationError === 'function') {
                            onValidationError({
                                values,
                                evt: e,
                                errors: result.errors,
                                results: result.results,
                            });
                        }
                    })
                        .then(returnVal => {
                        isSubmitting.value = false;
                        return returnVal;
                    }, err => {
                        isSubmitting.value = false;
                        // re-throw the err so it doesn't go silent
                        throw err;
                    });
                };
            };
        }
        const handleSubmitImpl = makeSubmissionFactory(false);
        const handleSubmit = handleSubmitImpl;
        handleSubmit.withControlled = makeSubmissionFactory(true);
        function removePathState(path, id) {
            const idx = pathStates.value.findIndex(s => {
                return s.path === path && (Array.isArray(s.id) ? s.id.includes(id) : s.id === id);
            });
            const pathState = pathStates.value[idx];
            if (idx === -1 || !pathState) {
                return;
            }
            vue.nextTick(() => {
                validateField(path, { mode: 'silent', warn: false });
            });
            if (pathState.multiple && pathState.fieldsCount) {
                pathState.fieldsCount--;
            }
            if (Array.isArray(pathState.id)) {
                const idIndex = pathState.id.indexOf(id);
                if (idIndex >= 0) {
                    pathState.id.splice(idIndex, 1);
                }
                delete pathState.__flags.pendingUnmount[id];
            }
            if (!pathState.multiple || pathState.fieldsCount <= 0) {
                pathStates.value.splice(idx, 1);
                unsetInitialValue(path);
                rebuildPathLookup();
                delete pathStateLookup.value[path];
            }
        }
        function destroyPath(path) {
            keysOf(pathStateLookup.value).forEach(key => {
                if (key.startsWith(path)) {
                    delete pathStateLookup.value[key];
                }
            });
            pathStates.value = pathStates.value.filter(s => !s.path.startsWith(path));
            vue.nextTick(() => {
                rebuildPathLookup();
            });
        }
        const formCtx = {
            name,
            formId,
            values: formValues,
            controlledValues,
            errorBag,
            errors,
            schema,
            submitCount,
            meta,
            isSubmitting,
            isValidating,
            fieldArrays,
            keepValuesOnUnmount,
            validateSchema: vue.unref(schema) ? validateSchema : undefined,
            validate,
            setFieldError,
            validateField,
            setFieldValue,
            setValues,
            setErrors,
            setFieldTouched,
            setTouched,
            resetForm,
            resetField,
            handleSubmit,
            useFieldModel,
            defineInputBinds,
            defineComponentBinds: defineComponentBinds,
            defineField,
            stageInitialValue,
            unsetInitialValue,
            setFieldInitialValue,
            createPathState,
            getPathState: findPathState,
            unsetPathValue,
            removePathState,
            initialValues: initialValues,
            getAllPathStates: () => pathStates.value,
            destroyPath,
            isFieldTouched,
            isFieldDirty,
            isFieldValid,
        };
        /**
         * Sets a single field value
         */
        function setFieldValue(field, value, shouldValidate = true) {
            const clonedValue = klona(value);
            const path = typeof field === 'string' ? field : field.path;
            const pathState = findPathState(path);
            if (!pathState) {
                createPathState(path);
            }
            setInPath(formValues, path, clonedValue);
            if (shouldValidate) {
                validateField(path);
            }
        }
        function forceSetValues(fields, shouldValidate = true) {
            // clean up old values
            keysOf(formValues).forEach(key => {
                delete formValues[key];
            });
            // set up new values
            keysOf(fields).forEach(path => {
                setFieldValue(path, fields[path], false);
            });
            if (shouldValidate) {
                validate();
            }
        }
        /**
         * Sets multiple fields values
         */
        function setValues(fields, shouldValidate = true) {
            merge(formValues, fields);
            // regenerate the arrays when the form values change
            fieldArrays.forEach(f => f && f.reset());
            if (shouldValidate) {
                validate();
            }
        }
        function createModel(path, shouldValidate) {
            const pathState = findPathState(vue.toValue(path)) || createPathState(path);
            return vue.computed({
                get() {
                    return pathState.value;
                },
                set(value) {
                    var _a;
                    const pathValue = vue.toValue(path);
                    setFieldValue(pathValue, value, (_a = vue.toValue(shouldValidate)) !== null && _a !== void 0 ? _a : false);
                },
            });
        }
        /**
         * Sets the touched meta state on a field
         */
        function setFieldTouched(field, isTouched) {
            const pathState = findPathState(field);
            if (pathState) {
                pathState.touched = isTouched;
            }
        }
        function isFieldTouched(field) {
            const pathState = findPathState(field);
            if (pathState) {
                return pathState.touched;
            }
            // Find all nested paths and consider their touched state
            return pathStates.value.filter(s => s.path.startsWith(field)).some(s => s.touched);
        }
        function isFieldDirty(field) {
            const pathState = findPathState(field);
            if (pathState) {
                return pathState.dirty;
            }
            return pathStates.value.filter(s => s.path.startsWith(field)).some(s => s.dirty);
        }
        function isFieldValid(field) {
            const pathState = findPathState(field);
            if (pathState) {
                return pathState.valid;
            }
            return pathStates.value.filter(s => s.path.startsWith(field)).every(s => s.valid);
        }
        /**
         * Sets the touched meta state on multiple fields
         */
        function setTouched(fields) {
            if (typeof fields === 'boolean') {
                mutateAllPathState(state => {
                    state.touched = fields;
                });
                return;
            }
            keysOf(fields).forEach(field => {
                setFieldTouched(field, !!fields[field]);
            });
        }
        function resetField(field, state) {
            var _a;
            const newValue = state && 'value' in state ? state.value : getFromPath(initialValues.value, field);
            const pathState = findPathState(field);
            if (pathState) {
                pathState.__flags.pendingReset = true;
            }
            setFieldInitialValue(field, klona(newValue), true);
            setFieldValue(field, newValue, false);
            setFieldTouched(field, (_a = state === null || state === void 0 ? void 0 : state.touched) !== null && _a !== void 0 ? _a : false);
            setFieldError(field, (state === null || state === void 0 ? void 0 : state.errors) || []);
            vue.nextTick(() => {
                if (pathState) {
                    pathState.__flags.pendingReset = false;
                }
            });
        }
        /**
         * Resets all fields
         */
        function resetForm(resetState, opts) {
            let newValues = klona((resetState === null || resetState === void 0 ? void 0 : resetState.values) ? resetState.values : originalInitialValues.value);
            newValues = (opts === null || opts === void 0 ? void 0 : opts.force) ? newValues : merge(originalInitialValues.value, newValues);
            newValues = isTypedSchema(schema) && isCallable(schema.cast) ? schema.cast(newValues) : newValues;
            setInitialValues(newValues, { force: opts === null || opts === void 0 ? void 0 : opts.force });
            mutateAllPathState(state => {
                var _a;
                state.__flags.pendingReset = true;
                state.validated = false;
                state.touched = ((_a = resetState === null || resetState === void 0 ? void 0 : resetState.touched) === null || _a === void 0 ? void 0 : _a[vue.toValue(state.path)]) || false;
                setFieldValue(vue.toValue(state.path), getFromPath(newValues, vue.toValue(state.path)), false);
                setFieldError(vue.toValue(state.path), undefined);
            });
            (opts === null || opts === void 0 ? void 0 : opts.force) ? forceSetValues(newValues, false) : setValues(newValues, false);
            setErrors((resetState === null || resetState === void 0 ? void 0 : resetState.errors) || {});
            submitCount.value = (resetState === null || resetState === void 0 ? void 0 : resetState.submitCount) || 0;
            vue.nextTick(() => {
                validate({ mode: 'silent' });
                mutateAllPathState(state => {
                    state.__flags.pendingReset = false;
                });
            });
        }
        async function validate(opts) {
            const mode = (opts === null || opts === void 0 ? void 0 : opts.mode) || 'force';
            if (mode === 'force') {
                mutateAllPathState(f => (f.validated = true));
            }
            if (formCtx.validateSchema) {
                return formCtx.validateSchema(mode);
            }
            isValidating.value = true;
            // No schema, each field is responsible to validate itself
            const validations = await Promise.all(pathStates.value.map(state => {
                if (!state.validate) {
                    return Promise.resolve({
                        key: vue.toValue(state.path),
                        valid: true,
                        errors: [],
                        value: undefined,
                    });
                }
                return state.validate(opts).then(result => {
                    return {
                        key: vue.toValue(state.path),
                        valid: result.valid,
                        errors: result.errors,
                        value: result.value,
                    };
                });
            }));
            isValidating.value = false;
            const results = {};
            const errors = {};
            const values = {};
            for (const validation of validations) {
                results[validation.key] = {
                    valid: validation.valid,
                    errors: validation.errors,
                };
                if (validation.value) {
                    setInPath(values, validation.key, validation.value);
                }
                if (validation.errors.length) {
                    errors[validation.key] = validation.errors[0];
                }
            }
            return {
                valid: validations.every(r => r.valid),
                results,
                errors,
                values,
                source: 'fields',
            };
        }
        async function validateField(path, opts) {
            var _a;
            const state = findPathState(path);
            if (state && (opts === null || opts === void 0 ? void 0 : opts.mode) !== 'silent') {
                state.validated = true;
            }
            if (schema) {
                const { results } = await validateSchema((opts === null || opts === void 0 ? void 0 : opts.mode) || 'validated-only');
                return results[path] || { errors: [], valid: true };
            }
            if (state === null || state === void 0 ? void 0 : state.validate) {
                return state.validate(opts);
            }
            !state && ((_a = opts === null || opts === void 0 ? void 0 : opts.warn) !== null && _a !== void 0 ? _a : true);
            return Promise.resolve({ errors: [], valid: true });
        }
        function unsetInitialValue(path) {
            unsetPath(initialValues.value, path);
        }
        /**
         * Sneaky function to set initial field values
         */
        function stageInitialValue(path, value, updateOriginal = false) {
            setFieldInitialValue(path, value);
            setInPath(formValues, path, value);
            if (updateOriginal && !(opts === null || opts === void 0 ? void 0 : opts.initialValues)) {
                setInPath(originalInitialValues.value, path, klona(value));
            }
        }
        function setFieldInitialValue(path, value, updateOriginal = false) {
            setInPath(initialValues.value, path, klona(value));
            if (updateOriginal) {
                setInPath(originalInitialValues.value, path, klona(value));
            }
        }
        async function _validateSchema() {
            const schemaValue = vue.unref(schema);
            if (!schemaValue) {
                return { valid: true, results: {}, errors: {}, source: 'none' };
            }
            isValidating.value = true;
            const formResult = isYupValidator(schemaValue) || isTypedSchema(schemaValue)
                ? await validateTypedSchema(schemaValue, formValues)
                : await validateObjectSchema(schemaValue, formValues, {
                    names: fieldNames.value,
                    bailsMap: fieldBailsMap.value,
                });
            isValidating.value = false;
            return formResult;
        }
        const submitForm = handleSubmit((_, { evt }) => {
            if (isFormSubmitEvent(evt)) {
                evt.target.submit();
            }
        });
        // Trigger initial validation
        vue.onMounted(() => {
            if (opts === null || opts === void 0 ? void 0 : opts.initialErrors) {
                setErrors(opts.initialErrors);
            }
            if (opts === null || opts === void 0 ? void 0 : opts.initialTouched) {
                setTouched(opts.initialTouched);
            }
            // if validate on mount was enabled
            if (opts === null || opts === void 0 ? void 0 : opts.validateOnMount) {
                validate();
                return;
            }
            // otherwise run initial silent validation through schema if available
            // the useField should skip their own silent validation if a yup schema is present
            if (formCtx.validateSchema) {
                formCtx.validateSchema('silent');
            }
        });
        if (vue.isRef(schema)) {
            vue.watch(schema, () => {
                var _a;
                (_a = formCtx.validateSchema) === null || _a === void 0 ? void 0 : _a.call(formCtx, 'validated-only');
            });
        }
        // Provide injections
        vue.provide(FormContextKey, formCtx);
        function defineField(path, config) {
            const label = isCallable(config) ? undefined : config === null || config === void 0 ? void 0 : config.label;
            const pathState = (findPathState(vue.toValue(path)) || createPathState(path, { label }));
            const evalConfig = () => (isCallable(config) ? config(omit(pathState, PRIVATE_PATH_STATE_KEYS)) : config || {});
            function onBlur() {
                var _a;
                pathState.touched = true;
                const validateOnBlur = (_a = evalConfig().validateOnBlur) !== null && _a !== void 0 ? _a : getConfig().validateOnBlur;
                if (validateOnBlur) {
                    validateField(vue.toValue(pathState.path));
                }
            }
            function onInput() {
                var _a;
                const validateOnInput = (_a = evalConfig().validateOnInput) !== null && _a !== void 0 ? _a : getConfig().validateOnInput;
                if (validateOnInput) {
                    vue.nextTick(() => {
                        validateField(vue.toValue(pathState.path));
                    });
                }
            }
            function onChange() {
                var _a;
                const validateOnChange = (_a = evalConfig().validateOnChange) !== null && _a !== void 0 ? _a : getConfig().validateOnChange;
                if (validateOnChange) {
                    vue.nextTick(() => {
                        validateField(vue.toValue(pathState.path));
                    });
                }
            }
            const props = vue.computed(() => {
                const base = {
                    onChange,
                    onInput,
                    onBlur,
                };
                if (isCallable(config)) {
                    return Object.assign(Object.assign({}, base), (config(omit(pathState, PRIVATE_PATH_STATE_KEYS)).props || {}));
                }
                if (config === null || config === void 0 ? void 0 : config.props) {
                    return Object.assign(Object.assign({}, base), config.props(omit(pathState, PRIVATE_PATH_STATE_KEYS)));
                }
                return base;
            });
            const model = createModel(path, () => { var _a, _b, _c; return (_c = (_a = evalConfig().validateOnModelUpdate) !== null && _a !== void 0 ? _a : (_b = getConfig()) === null || _b === void 0 ? void 0 : _b.validateOnModelUpdate) !== null && _c !== void 0 ? _c : true; });
            return [model, props];
        }
        function useFieldModel(pathOrPaths) {
            if (!Array.isArray(pathOrPaths)) {
                return createModel(pathOrPaths);
            }
            return pathOrPaths.map(p => createModel(p, true));
        }
        /**
         * @deprecated use defineField instead
         */
        function defineInputBinds(path, config) {
            const [model, props] = defineField(path, config);
            function onBlur() {
                props.value.onBlur();
            }
            function onInput(e) {
                const value = normalizeEventValue(e);
                setFieldValue(vue.toValue(path), value, false);
                props.value.onInput();
            }
            function onChange(e) {
                const value = normalizeEventValue(e);
                setFieldValue(vue.toValue(path), value, false);
                props.value.onChange();
            }
            return vue.computed(() => {
                return Object.assign(Object.assign({}, props.value), { onBlur,
                    onInput,
                    onChange, value: model.value });
            });
        }
        /**
         * @deprecated use defineField instead
         */
        function defineComponentBinds(path, config) {
            const [model, props] = defineField(path, config);
            const pathState = findPathState(vue.toValue(path));
            function onUpdateModelValue(value) {
                model.value = value;
            }
            return vue.computed(() => {
                const conf = isCallable(config) ? config(omit(pathState, PRIVATE_PATH_STATE_KEYS)) : config || {};
                return Object.assign({ [conf.model || 'modelValue']: model.value, [`onUpdate:${conf.model || 'modelValue'}`]: onUpdateModelValue }, props.value);
            });
        }
        const ctx = Object.assign(Object.assign({}, formCtx), { values: vue.readonly(formValues), handleReset: () => resetForm(), submitForm });
        vue.provide(PublicFormContextKey, ctx);
        return ctx;
    }
    /**
     * Manages form meta aggregation
     */
    function useFormMeta(pathsState, currentValues, initialValues, errors) {
        const MERGE_STRATEGIES = {
            touched: 'some',
            pending: 'some',
            valid: 'every',
        };
        const isDirty = vue.computed(() => {
            return !isEqual(currentValues, vue.unref(initialValues));
        });
        function calculateFlags() {
            const states = pathsState.value;
            return keysOf(MERGE_STRATEGIES).reduce((acc, flag) => {
                const mergeMethod = MERGE_STRATEGIES[flag];
                acc[flag] = states[mergeMethod](s => s[flag]);
                return acc;
            }, {});
        }
        const flags = vue.reactive(calculateFlags());
        vue.watchEffect(() => {
            const value = calculateFlags();
            flags.touched = value.touched;
            flags.valid = value.valid;
            flags.pending = value.pending;
        });
        return vue.computed(() => {
            return Object.assign(Object.assign({ initialValues: vue.unref(initialValues) }, flags), { valid: flags.valid && !keysOf(errors.value).length, dirty: isDirty.value });
        });
    }
    /**
     * Manages the initial values prop
     */
    function useFormInitialValues(pathsState, formValues, opts) {
        const values = resolveInitialValues(opts);
        // these are the mutable initial values as the fields are mounted/unmounted
        const initialValues = vue.ref(values);
        // these are the original initial value as provided by the user initially, they don't keep track of conditional fields
        // this is important because some conditional fields will overwrite the initial values for other fields who had the same name
        // like array fields, any push/insert operation will overwrite the initial values because they "create new fields"
        // so these are the values that the reset function should use
        // these only change when the user explicitly changes the initial values or when the user resets them with new values.
        const originalInitialValues = vue.ref(klona(values));
        function setInitialValues(values, opts) {
            if (opts === null || opts === void 0 ? void 0 : opts.force) {
                initialValues.value = klona(values);
                originalInitialValues.value = klona(values);
            }
            else {
                initialValues.value = merge(klona(initialValues.value) || {}, klona(values));
                originalInitialValues.value = merge(klona(originalInitialValues.value) || {}, klona(values));
            }
            if (!(opts === null || opts === void 0 ? void 0 : opts.updateFields)) {
                return;
            }
            // update the pristine non-touched fields
            // those are excluded because it's unlikely you want to change the form values using initial values
            // we mostly watch them for API population or newly inserted fields
            // if the user API is taking too much time before user interaction they should consider disabling or hiding their inputs until the values are ready
            pathsState.value.forEach(state => {
                const wasTouched = state.touched;
                if (wasTouched) {
                    return;
                }
                const newValue = getFromPath(initialValues.value, vue.toValue(state.path));
                setInPath(formValues, vue.toValue(state.path), klona(newValue));
            });
        }
        return {
            initialValues,
            originalInitialValues,
            setInitialValues,
        };
    }
    function mergeValidationResults(a, b) {
        if (!b) {
            return a;
        }
        return {
            valid: a.valid && b.valid,
            errors: [...a.errors, ...b.errors],
        };
    }
    function useFormContext() {
        return vue.inject(PublicFormContextKey);
    }

    const FormImpl = /** #__PURE__ */ vue.defineComponent({
        name: 'Form',
        inheritAttrs: false,
        props: {
            as: {
                type: null,
                default: 'form',
            },
            validationSchema: {
                type: Object,
                default: undefined,
            },
            initialValues: {
                type: Object,
                default: undefined,
            },
            initialErrors: {
                type: Object,
                default: undefined,
            },
            initialTouched: {
                type: Object,
                default: undefined,
            },
            validateOnMount: {
                type: Boolean,
                default: false,
            },
            onSubmit: {
                type: Function,
                default: undefined,
            },
            onInvalidSubmit: {
                type: Function,
                default: undefined,
            },
            keepValues: {
                type: Boolean,
                default: false,
            },
            name: {
                type: String,
                default: 'Form',
            },
        },
        setup(props, ctx) {
            const validationSchema = vue.toRef(props, 'validationSchema');
            const keepValues = vue.toRef(props, 'keepValues');
            const { errors, errorBag, values, meta, isSubmitting, isValidating, submitCount, controlledValues, validate, validateField, handleReset, resetForm, handleSubmit, setErrors, setFieldError, setFieldValue, setValues, setFieldTouched, setTouched, resetField, } = useForm({
                validationSchema: validationSchema.value ? validationSchema : undefined,
                initialValues: props.initialValues,
                initialErrors: props.initialErrors,
                initialTouched: props.initialTouched,
                validateOnMount: props.validateOnMount,
                keepValuesOnUnmount: keepValues,
                name: props.name,
            });
            const submitForm = handleSubmit((_, { evt }) => {
                if (isFormSubmitEvent(evt)) {
                    evt.target.submit();
                }
            }, props.onInvalidSubmit);
            const onSubmit = props.onSubmit ? handleSubmit(props.onSubmit, props.onInvalidSubmit) : submitForm;
            function handleFormReset(e) {
                if (isEvent(e)) {
                    // Prevent default form reset behavior
                    e.preventDefault();
                }
                handleReset();
                if (typeof ctx.attrs.onReset === 'function') {
                    ctx.attrs.onReset();
                }
            }
            function handleScopedSlotSubmit(evt, onSubmit) {
                const onSuccess = typeof evt === 'function' && !onSubmit ? evt : onSubmit;
                return handleSubmit(onSuccess, props.onInvalidSubmit)(evt);
            }
            function getValues() {
                return klona(values);
            }
            function getMeta() {
                return klona(meta.value);
            }
            function getErrors() {
                return klona(errors.value);
            }
            function slotProps() {
                return {
                    meta: meta.value,
                    errors: errors.value,
                    errorBag: errorBag.value,
                    values,
                    isSubmitting: isSubmitting.value,
                    isValidating: isValidating.value,
                    submitCount: submitCount.value,
                    controlledValues: controlledValues.value,
                    validate,
                    validateField,
                    handleSubmit: handleScopedSlotSubmit,
                    handleReset,
                    submitForm,
                    setErrors,
                    setFieldError,
                    setFieldValue,
                    setValues,
                    setFieldTouched,
                    setTouched,
                    resetForm,
                    resetField,
                    getValues,
                    getMeta,
                    getErrors,
                };
            }
            // expose these functions and methods as part of public API
            ctx.expose({
                setFieldError,
                setErrors,
                setFieldValue,
                setValues,
                setFieldTouched,
                setTouched,
                resetForm,
                validate,
                validateField,
                resetField,
                getValues,
                getMeta,
                getErrors,
                values,
                meta,
                errors,
            });
            return function renderForm() {
                // avoid resolving the form component as itself
                const tag = props.as === 'form' ? props.as : !props.as ? null : vue.resolveDynamicComponent(props.as);
                const children = normalizeChildren(tag, ctx, slotProps);
                if (!tag) {
                    return children;
                }
                // Attributes to add on a native `form` tag
                const formAttrs = tag === 'form'
                    ? {
                        // Disables native validation as vee-validate will handle it.
                        novalidate: true,
                    }
                    : {};
                return vue.h(tag, Object.assign(Object.assign(Object.assign({}, formAttrs), ctx.attrs), { onSubmit, onReset: handleFormReset }), children);
            };
        },
    });
    const Form = FormImpl;

    function useFieldArray(arrayPath) {
        const form = injectWithSelf(FormContextKey, undefined);
        const fields = vue.ref([]);
        const noOp = () => { };
        const noOpApi = {
            fields,
            remove: noOp,
            push: noOp,
            swap: noOp,
            insert: noOp,
            update: noOp,
            replace: noOp,
            prepend: noOp,
            move: noOp,
        };
        if (!form) {
            return noOpApi;
        }
        if (!vue.unref(arrayPath)) {
            return noOpApi;
        }
        const alreadyExists = form.fieldArrays.find(a => vue.unref(a.path) === vue.unref(arrayPath));
        if (alreadyExists) {
            return alreadyExists;
        }
        let entryCounter = 0;
        function getCurrentValues() {
            return getFromPath(form === null || form === void 0 ? void 0 : form.values, vue.toValue(arrayPath), []) || [];
        }
        function initFields() {
            const currentValues = getCurrentValues();
            if (!Array.isArray(currentValues)) {
                return;
            }
            fields.value = currentValues.map((v, idx) => createEntry(v, idx, fields.value));
            updateEntryFlags();
        }
        initFields();
        function updateEntryFlags() {
            const fieldsLength = fields.value.length;
            for (let i = 0; i < fieldsLength; i++) {
                const entry = fields.value[i];
                entry.isFirst = i === 0;
                entry.isLast = i === fieldsLength - 1;
            }
        }
        function createEntry(value, idx, currentFields) {
            // Skips the work by returning the current entry if it already exists
            // This should make the `key` prop stable and doesn't cause more re-renders than needed
            // The value is computed and should update anyways
            if (currentFields && !isNullOrUndefined(idx) && currentFields[idx]) {
                return currentFields[idx];
            }
            const key = entryCounter++;
            const entry = {
                key,
                value: computedDeep({
                    get() {
                        const currentValues = getFromPath(form === null || form === void 0 ? void 0 : form.values, vue.toValue(arrayPath), []) || [];
                        const idx = fields.value.findIndex(e => e.key === key);
                        return idx === -1 ? value : currentValues[idx];
                    },
                    set(value) {
                        const idx = fields.value.findIndex(e => e.key === key);
                        if (idx === -1) {
                            return;
                        }
                        update(idx, value);
                    },
                }), // will be auto unwrapped
                isFirst: false,
                isLast: false,
            };
            return entry;
        }
        function afterMutation() {
            updateEntryFlags();
            // Should trigger a silent validation since a field may not do that #4096
            form === null || form === void 0 ? void 0 : form.validate({ mode: 'silent' });
        }
        function remove(idx) {
            const pathName = vue.toValue(arrayPath);
            const pathValue = getFromPath(form === null || form === void 0 ? void 0 : form.values, pathName);
            if (!pathValue || !Array.isArray(pathValue)) {
                return;
            }
            const newValue = [...pathValue];
            newValue.splice(idx, 1);
            const fieldPath = pathName + `[${idx}]`;
            form.destroyPath(fieldPath);
            form.unsetInitialValue(fieldPath);
            setInPath(form.values, pathName, newValue);
            fields.value.splice(idx, 1);
            afterMutation();
        }
        function push(initialValue) {
            const value = klona(initialValue);
            const pathName = vue.toValue(arrayPath);
            const pathValue = getFromPath(form === null || form === void 0 ? void 0 : form.values, pathName);
            const normalizedPathValue = isNullOrUndefined(pathValue) ? [] : pathValue;
            if (!Array.isArray(normalizedPathValue)) {
                return;
            }
            const newValue = [...normalizedPathValue];
            newValue.push(value);
            form.stageInitialValue(pathName + `[${newValue.length - 1}]`, value);
            setInPath(form.values, pathName, newValue);
            fields.value.push(createEntry(value));
            afterMutation();
        }
        function swap(indexA, indexB) {
            const pathName = vue.toValue(arrayPath);
            const pathValue = getFromPath(form === null || form === void 0 ? void 0 : form.values, pathName);
            if (!Array.isArray(pathValue) || !(indexA in pathValue) || !(indexB in pathValue)) {
                return;
            }
            const newValue = [...pathValue];
            const newFields = [...fields.value];
            // the old switcheroo
            const temp = newValue[indexA];
            newValue[indexA] = newValue[indexB];
            newValue[indexB] = temp;
            const tempEntry = newFields[indexA];
            newFields[indexA] = newFields[indexB];
            newFields[indexB] = tempEntry;
            setInPath(form.values, pathName, newValue);
            fields.value = newFields;
            updateEntryFlags();
        }
        function insert(idx, initialValue) {
            const value = klona(initialValue);
            const pathName = vue.toValue(arrayPath);
            const pathValue = getFromPath(form === null || form === void 0 ? void 0 : form.values, pathName);
            if (!Array.isArray(pathValue) || pathValue.length < idx) {
                return;
            }
            const newValue = [...pathValue];
            const newFields = [...fields.value];
            newValue.splice(idx, 0, value);
            newFields.splice(idx, 0, createEntry(value));
            setInPath(form.values, pathName, newValue);
            fields.value = newFields;
            afterMutation();
        }
        function replace(arr) {
            const pathName = vue.toValue(arrayPath);
            form.stageInitialValue(pathName, arr);
            setInPath(form.values, pathName, arr);
            initFields();
            afterMutation();
        }
        function update(idx, value) {
            const pathName = vue.toValue(arrayPath);
            const pathValue = getFromPath(form === null || form === void 0 ? void 0 : form.values, pathName);
            if (!Array.isArray(pathValue) || pathValue.length - 1 < idx) {
                return;
            }
            setInPath(form.values, `${pathName}[${idx}]`, value);
            form === null || form === void 0 ? void 0 : form.validate({ mode: 'validated-only' });
        }
        function prepend(initialValue) {
            const value = klona(initialValue);
            const pathName = vue.toValue(arrayPath);
            const pathValue = getFromPath(form === null || form === void 0 ? void 0 : form.values, pathName);
            const normalizedPathValue = isNullOrUndefined(pathValue) ? [] : pathValue;
            if (!Array.isArray(normalizedPathValue)) {
                return;
            }
            const newValue = [value, ...normalizedPathValue];
            setInPath(form.values, pathName, newValue);
            form.stageInitialValue(pathName + `[0]`, value);
            fields.value.unshift(createEntry(value));
            afterMutation();
        }
        function move(oldIdx, newIdx) {
            const pathName = vue.toValue(arrayPath);
            const pathValue = getFromPath(form === null || form === void 0 ? void 0 : form.values, pathName);
            const newValue = isNullOrUndefined(pathValue) ? [] : [...pathValue];
            if (!Array.isArray(pathValue) || !(oldIdx in pathValue) || !(newIdx in pathValue)) {
                return;
            }
            const newFields = [...fields.value];
            const movedItem = newFields[oldIdx];
            newFields.splice(oldIdx, 1);
            newFields.splice(newIdx, 0, movedItem);
            const movedValue = newValue[oldIdx];
            newValue.splice(oldIdx, 1);
            newValue.splice(newIdx, 0, movedValue);
            setInPath(form.values, pathName, newValue);
            fields.value = newFields;
            afterMutation();
        }
        const fieldArrayCtx = {
            fields,
            remove,
            push,
            swap,
            insert,
            update,
            replace,
            prepend,
            move,
        };
        form.fieldArrays.push(Object.assign({ path: arrayPath, reset: initFields }, fieldArrayCtx));
        vue.onBeforeUnmount(() => {
            const idx = form.fieldArrays.findIndex(i => vue.toValue(i.path) === vue.toValue(arrayPath));
            if (idx >= 0) {
                form.fieldArrays.splice(idx, 1);
            }
        });
        // Makes sure to sync the form values with the array value if they go out of sync
        // #4153
        vue.watch(getCurrentValues, formValues => {
            const fieldsValues = fields.value.map(f => f.value);
            // If form values are not the same as the current values then something overrode them.
            if (!isEqual(formValues, fieldsValues)) {
                initFields();
            }
        });
        return fieldArrayCtx;
    }

    const FieldArrayImpl = /** #__PURE__ */ vue.defineComponent({
        name: 'FieldArray',
        inheritAttrs: false,
        props: {
            name: {
                type: String,
                required: true,
            },
        },
        setup(props, ctx) {
            const { push, remove, swap, insert, replace, update, prepend, move, fields } = useFieldArray(() => props.name);
            function slotProps() {
                return {
                    fields: fields.value,
                    push,
                    remove,
                    swap,
                    insert,
                    update,
                    replace,
                    prepend,
                    move,
                };
            }
            ctx.expose({
                push,
                remove,
                swap,
                insert,
                update,
                replace,
                prepend,
                move,
            });
            return () => {
                const children = normalizeChildren(undefined, ctx, slotProps);
                return children;
            };
        },
    });
    const FieldArray = FieldArrayImpl;

    const ErrorMessageImpl = /** #__PURE__ */ vue.defineComponent({
        name: 'ErrorMessage',
        props: {
            as: {
                type: String,
                default: undefined,
            },
            name: {
                type: String,
                required: true,
            },
        },
        setup(props, ctx) {
            const form = vue.inject(FormContextKey, undefined);
            const message = vue.computed(() => {
                return form === null || form === void 0 ? void 0 : form.errors.value[props.name];
            });
            function slotProps() {
                return {
                    message: message.value,
                };
            }
            return () => {
                // Renders nothing if there are no messages
                if (!message.value) {
                    return undefined;
                }
                const tag = (props.as ? vue.resolveDynamicComponent(props.as) : props.as);
                const children = normalizeChildren(tag, ctx, slotProps);
                const attrs = Object.assign({ role: 'alert' }, ctx.attrs);
                // If no tag was specified and there are children
                // render the slot as is without wrapping it
                if (!tag && (Array.isArray(children) || !children) && (children === null || children === void 0 ? void 0 : children.length)) {
                    return children;
                }
                // If no children in slot
                // render whatever specified and fallback to a <span> with the message in it's contents
                if ((Array.isArray(children) || !children) && !(children === null || children === void 0 ? void 0 : children.length)) {
                    return vue.h(tag || 'span', attrs, message.value);
                }
                return vue.h(tag, attrs, children);
            };
        },
    });
    const ErrorMessage = ErrorMessageImpl;

    function useResetForm() {
        const form = injectWithSelf(FormContextKey);
        return function resetForm(state, opts) {
            if (!form) {
                return;
            }
            return form.resetForm(state, opts);
        };
    }

    /**
     * If a field is dirty or not
     */
    function useIsFieldDirty(path) {
        const fieldOrPath = resolveFieldOrPathState(path);
        return vue.computed(() => {
            var _a, _b;
            if (!fieldOrPath) {
                return false;
            }
            return (_b = ('meta' in fieldOrPath ? fieldOrPath.meta.dirty : (_a = fieldOrPath === null || fieldOrPath === void 0 ? void 0 : fieldOrPath.value) === null || _a === void 0 ? void 0 : _a.dirty)) !== null && _b !== void 0 ? _b : false;
        });
    }

    /**
     * If a field is touched or not
     */
    function useIsFieldTouched(path) {
        const fieldOrPath = resolveFieldOrPathState(path);
        return vue.computed(() => {
            var _a, _b;
            if (!fieldOrPath) {
                return false;
            }
            return (_b = ('meta' in fieldOrPath ? fieldOrPath.meta.touched : (_a = fieldOrPath === null || fieldOrPath === void 0 ? void 0 : fieldOrPath.value) === null || _a === void 0 ? void 0 : _a.touched)) !== null && _b !== void 0 ? _b : false;
        });
    }

    /**
     * If a field is validated and is valid
     */
    function useIsFieldValid(path) {
        const fieldOrPath = resolveFieldOrPathState(path);
        return vue.computed(() => {
            var _a, _b;
            if (!fieldOrPath) {
                return false;
            }
            return (_b = ('meta' in fieldOrPath ? fieldOrPath.meta.valid : (_a = fieldOrPath === null || fieldOrPath === void 0 ? void 0 : fieldOrPath.value) === null || _a === void 0 ? void 0 : _a.valid)) !== null && _b !== void 0 ? _b : false;
        });
    }

    /**
     * If the form is submitting or not
     */
    function useIsSubmitting() {
        const form = injectWithSelf(FormContextKey);
        return vue.computed(() => {
            var _a;
            return (_a = form === null || form === void 0 ? void 0 : form.isSubmitting.value) !== null && _a !== void 0 ? _a : false;
        });
    }

    /**
     * If the form is validating or not
     */
    function useIsValidating() {
        const form = injectWithSelf(FormContextKey);
        return vue.computed(() => {
            var _a;
            return (_a = form === null || form === void 0 ? void 0 : form.isValidating.value) !== null && _a !== void 0 ? _a : false;
        });
    }

    /**
     * Validates a single field
     */
    function useValidateField(path) {
        const form = injectWithSelf(FormContextKey);
        const field = path ? undefined : vue.inject(FieldContextKey);
        return function validateField() {
            if (field) {
                return field.validate();
            }
            if (form && path) {
                return form === null || form === void 0 ? void 0 : form.validateField(vue.toValue(path));
            }
            return Promise.resolve({
                errors: [],
                valid: true,
            });
        };
    }

    /**
     * If the form is dirty or not
     */
    function useIsFormDirty() {
        const form = injectWithSelf(FormContextKey);
        return vue.computed(() => {
            var _a;
            return (_a = form === null || form === void 0 ? void 0 : form.meta.value.dirty) !== null && _a !== void 0 ? _a : false;
        });
    }

    /**
     * If the form is touched or not
     */
    function useIsFormTouched() {
        const form = injectWithSelf(FormContextKey);
        return vue.computed(() => {
            var _a;
            return (_a = form === null || form === void 0 ? void 0 : form.meta.value.touched) !== null && _a !== void 0 ? _a : false;
        });
    }

    /**
     * If the form has been validated and is valid
     */
    function useIsFormValid() {
        const form = injectWithSelf(FormContextKey);
        return vue.computed(() => {
            var _a;
            return (_a = form === null || form === void 0 ? void 0 : form.meta.value.valid) !== null && _a !== void 0 ? _a : false;
        });
    }

    /**
     * Validate multiple fields
     */
    function useValidateForm() {
        const form = injectWithSelf(FormContextKey);
        return function validateField() {
            if (!form) {
                return Promise.resolve({ results: {}, errors: {}, valid: true, source: 'none' });
            }
            return form.validate();
        };
    }

    /**
     * The number of form's submission count
     */
    function useSubmitCount() {
        const form = injectWithSelf(FormContextKey);
        return vue.computed(() => {
            var _a;
            return (_a = form === null || form === void 0 ? void 0 : form.submitCount.value) !== null && _a !== void 0 ? _a : 0;
        });
    }

    /**
     * Gives access to a field's current value
     */
    function useFieldValue(path) {
        const form = injectWithSelf(FormContextKey);
        // We don't want to use self injected context as it doesn't make sense
        const field = path ? undefined : vue.inject(FieldContextKey);
        return vue.computed(() => {
            if (path) {
                return getFromPath(form === null || form === void 0 ? void 0 : form.values, vue.toValue(path));
            }
            return vue.toValue(field === null || field === void 0 ? void 0 : field.value);
        });
    }

    /**
     * Gives access to a form's values
     */
    function useFormValues() {
        const form = injectWithSelf(FormContextKey);
        return vue.computed(() => {
            return (form === null || form === void 0 ? void 0 : form.values) || {};
        });
    }

    /**
     * Gives access to all form errors
     */
    function useFormErrors() {
        const form = injectWithSelf(FormContextKey);
        return vue.computed(() => {
            return ((form === null || form === void 0 ? void 0 : form.errors.value) || {});
        });
    }

    /**
     * Gives access to a single field error
     */
    function useFieldError(path) {
        const form = injectWithSelf(FormContextKey);
        // We don't want to use self injected context as it doesn't make sense
        const field = path ? undefined : vue.inject(FieldContextKey);
        return vue.computed(() => {
            if (path) {
                return form === null || form === void 0 ? void 0 : form.errors.value[vue.toValue(path)];
            }
            return field === null || field === void 0 ? void 0 : field.errorMessage.value;
        });
    }

    function useSubmitForm(cb) {
        const form = injectWithSelf(FormContextKey);
        const onSubmit = form ? form.handleSubmit(cb) : undefined;
        return function submitForm(e) {
            if (!onSubmit) {
                return;
            }
            return onSubmit(e);
        };
    }

    /**
     * Sets a field's error message
     */
    function useSetFieldError(path) {
        const form = injectWithSelf(FormContextKey);
        // We don't want to use self injected context as it doesn't make sense
        const field = path ? undefined : vue.inject(FieldContextKey);
        return function setFieldError(message) {
            if (path && form) {
                form.setFieldError(vue.toValue(path), message);
                return;
            }
            if (field) {
                field.setErrors(message || []);
                return;
            }
        };
    }

    /**
     * Sets a field's touched meta state
     */
    function useSetFieldTouched(path) {
        const form = injectWithSelf(FormContextKey);
        // We don't want to use self injected context as it doesn't make sense
        const field = path ? undefined : vue.inject(FieldContextKey);
        return function setFieldTouched(touched) {
            if (path && form) {
                form.setFieldTouched(vue.toValue(path), touched);
                return;
            }
            if (field) {
                field.setTouched(touched);
                return;
            }
        };
    }

    /**
     * Sets a field's value
     */
    function useSetFieldValue(path) {
        const form = injectWithSelf(FormContextKey);
        // We don't want to use self injected context as it doesn't make sense
        const field = path ? undefined : vue.inject(FieldContextKey);
        return function setFieldValue(value, shouldValidate = true) {
            if (path && form) {
                form.setFieldValue(vue.toValue(path), value, shouldValidate);
                return;
            }
            if (field) {
                field.setValue(value, shouldValidate);
                return;
            }
        };
    }

    /**
     * Sets multiple fields errors
     */
    function useSetFormErrors() {
        const form = injectWithSelf(FormContextKey);
        function setFormErrors(fields) {
            if (form) {
                form.setErrors(fields);
                return;
            }
        }
        return setFormErrors;
    }

    /**
     * Sets multiple fields touched or all fields in the form
     */
    function useSetFormTouched() {
        const form = injectWithSelf(FormContextKey);
        function setFormTouched(fields) {
            if (form) {
                form.setTouched(fields);
                return;
            }
        }
        return setFormTouched;
    }

    /**
     * Sets multiple fields values
     */
    function useSetFormValues() {
        const form = injectWithSelf(FormContextKey);
        function setFormValues(fields, shouldValidate = true) {
            if (form) {
                form.setValues(fields, shouldValidate);
                return;
            }
        }
        return setFormValues;
    }

    exports.ErrorMessage = ErrorMessage;
    exports.Field = Field;
    exports.FieldArray = FieldArray;
    exports.FieldContextKey = FieldContextKey;
    exports.Form = Form;
    exports.FormContextKey = FormContextKey;
    exports.IS_ABSENT = IS_ABSENT;
    exports.PublicFormContextKey = PublicFormContextKey;
    exports.cleanupNonNestedPath = cleanupNonNestedPath;
    exports.configure = configure;
    exports.defineRule = defineRule;
    exports.isNotNestedPath = isNotNestedPath;
    exports.normalizeRules = normalizeRules;
    exports.useField = useField;
    exports.useFieldArray = useFieldArray;
    exports.useFieldError = useFieldError;
    exports.useFieldValue = useFieldValue;
    exports.useForm = useForm;
    exports.useFormContext = useFormContext;
    exports.useFormErrors = useFormErrors;
    exports.useFormValues = useFormValues;
    exports.useIsFieldDirty = useIsFieldDirty;
    exports.useIsFieldTouched = useIsFieldTouched;
    exports.useIsFieldValid = useIsFieldValid;
    exports.useIsFormDirty = useIsFormDirty;
    exports.useIsFormTouched = useIsFormTouched;
    exports.useIsFormValid = useIsFormValid;
    exports.useIsSubmitting = useIsSubmitting;
    exports.useIsValidating = useIsValidating;
    exports.useResetForm = useResetForm;
    exports.useSetFieldError = useSetFieldError;
    exports.useSetFieldTouched = useSetFieldTouched;
    exports.useSetFieldValue = useSetFieldValue;
    exports.useSetFormErrors = useSetFormErrors;
    exports.useSetFormTouched = useSetFormTouched;
    exports.useSetFormValues = useSetFormValues;
    exports.useSubmitCount = useSubmitCount;
    exports.useSubmitForm = useSubmitForm;
    exports.useValidateField = useValidateField;
    exports.useValidateForm = useValidateForm;
    exports.validate = validate;
    exports.validateObject = validateObjectSchema;

    return exports;

})({}, Vue);
