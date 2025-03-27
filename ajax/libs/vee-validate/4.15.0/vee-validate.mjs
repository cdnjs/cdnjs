/**
  * vee-validate v4.15.0
  * (c) 2024 Abdelrahman Awad
  * @license MIT
  */
import { getCurrentInstance, inject, warn as warn$1, computed, toValue, ref, watch, nextTick, unref, isRef, reactive, onUnmounted, onMounted, provide, onBeforeUnmount, defineComponent, toRef, resolveDynamicComponent, h, readonly, watchEffect, shallowRef } from 'vue';

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
    const vm = getCurrentInstance();
    return (vm === null || vm === void 0 ? void 0 : vm.provides[symbol]) || inject(symbol, def);
}
function warn(message) {
    warn$1(`[vee-validate]: ${message}`);
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
/**
 * Creates a throttled function that only invokes the provided function (`func`) at most once per within a given number of milliseconds
 * (`limit`)
 */
function throttle(func, limit) {
    let inThrottle;
    let lastResult;
    return function (...args) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const context = this;
        if (!inThrottle) {
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
            lastResult = func.apply(context, args);
        }
        return lastResult;
    };
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
    const baseRef = ref(klona(get()));
    watch(get, newValue => {
        if (isEqual(newValue, baseRef.value)) {
            return;
        }
        baseRef.value = klona(newValue);
    }, {
        deep: true,
    });
    watch(baseRef, newValue => {
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
    const state = path ? computed(() => form === null || form === void 0 ? void 0 : form.getPathState(toValue(path))) : undefined;
    const field = path ? undefined : inject(FieldContextKey);
    if (!field && !(state === null || state === void 0 ? void 0 : state.value)) {
        if ((process.env.NODE_ENV !== 'production')) {
            warn(`field with name ${toValue(path)} was not found`);
        }
    }
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
        const thisTick = nextTick(() => {
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
    const errors = computed(() => state.errors);
    function setState(state) {
        var _a, _b, _c;
        if ('value' in state) {
            value.value = state.value;
        }
        if ('errors' in state) {
            (_a = init.form) === null || _a === void 0 ? void 0 : _a.setFieldError(unref(path), state.errors);
        }
        if ('touched' in state) {
            (_b = init.form) === null || _b === void 0 ? void 0 : _b.setFieldTouched(unref(path), (_c = state.touched) !== null && _c !== void 0 ? _c : false);
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
    const modelRef = ref(unref(modelValue));
    function resolveInitialValue() {
        if (!form) {
            return unref(modelRef);
        }
        return getFromPath(form.initialValues.value, unref(path), unref(modelRef));
    }
    function setInitialValue(value) {
        if (!form) {
            modelRef.value = value;
            return;
        }
        form.setFieldInitialValue(unref(path), value, true);
    }
    const initialValue = computed(resolveInitialValue);
    // if no form is associated, use a regular ref.
    if (!form) {
        const value = ref(resolveInitialValue());
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
    form.stageInitialValue(unref(path), currentValue, true);
    // otherwise use a computed setter that triggers the `setFieldValue`
    const value = computed({
        get() {
            return getFromPath(form.values, unref(path));
        },
        set(newVal) {
            form.setFieldValue(unref(path), newVal, false);
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
    if (isRef(modelValue)) {
        return unref(modelValue);
    }
    if (modelValue !== undefined) {
        return modelValue;
    }
    return getFromPath(form.values, unref(path), unref(initialValue));
}
/**
 * Creates meta flags state and some associated effects with them
 */
function createFieldMeta(currentValue, initialValue, errors, schema) {
    const isRequired = computed(() => { var _a, _b, _c; return (_c = (_b = (_a = toValue(schema)) === null || _a === void 0 ? void 0 : _a.describe) === null || _b === void 0 ? void 0 : _b.call(_a).required) !== null && _c !== void 0 ? _c : false; });
    const meta = reactive({
        touched: false,
        pending: false,
        valid: true,
        required: isRequired,
        validated: !!unref(errors).length,
        initialValue: computed(() => unref(initialValue)),
        dirty: computed(() => {
            return !isEqual(unref(currentValue), unref(initialValue));
        }),
    });
    watch(errors, value => {
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
    const errors = ref([]);
    return {
        errors,
        setErrors: (messages) => {
            errors.value = normalizeErrorItem(messages);
        },
    };
}

const DEVTOOLS_FORMS = {};
const DEVTOOLS_FIELDS = {};
const INSPECTOR_ID = 'vee-validate-inspector';
const COLORS = {
    error: 0xbd4b4b,
    success: 0x06d77b,
    unknown: 0x54436b,
    white: 0xffffff,
    black: 0x000000,
    blue: 0x035397,
    purple: 0xb980f0,
    orange: 0xf5a962,
    gray: 0xbbbfca,
};
let SELECTED_NODE = null;
/**
 * Plugin API
 */
let API;
async function installDevtoolsPlugin(app) {
    if ((process.env.NODE_ENV !== 'production')) {
        if (!isClient) {
            return;
        }
        const devtools = await import('@vue/devtools-api');
        devtools.setupDevtoolsPlugin({
            id: 'vee-validate-devtools-plugin',
            label: 'VeeValidate Plugin',
            packageName: 'vee-validate',
            homepage: 'https://vee-validate.logaretm.com/v4',
            app,
            logo: 'https://vee-validate.logaretm.com/v4/logo.png',
        }, api => {
            API = api;
            api.addInspector({
                id: INSPECTOR_ID,
                icon: 'rule',
                label: 'vee-validate',
                noSelectionText: 'Select a vee-validate node to inspect',
                actions: [
                    {
                        icon: 'done_outline',
                        tooltip: 'Validate selected item',
                        action: async () => {
                            if (!SELECTED_NODE) {
                                // eslint-disable-next-line no-console
                                console.error('There is not a valid selected vee-validate node or component');
                                return;
                            }
                            if (SELECTED_NODE.type === 'field') {
                                await SELECTED_NODE.field.validate();
                                return;
                            }
                            if (SELECTED_NODE.type === 'form') {
                                await SELECTED_NODE.form.validate();
                                return;
                            }
                            if (SELECTED_NODE.type === 'pathState') {
                                await SELECTED_NODE.form.validateField(SELECTED_NODE.state.path);
                            }
                        },
                    },
                    {
                        icon: 'delete_sweep',
                        tooltip: 'Clear validation state of the selected item',
                        action: () => {
                            if (!SELECTED_NODE) {
                                // eslint-disable-next-line no-console
                                console.error('There is not a valid selected vee-validate node or component');
                                return;
                            }
                            if (SELECTED_NODE.type === 'field') {
                                SELECTED_NODE.field.resetField();
                                return;
                            }
                            if (SELECTED_NODE.type === 'form') {
                                SELECTED_NODE.form.resetForm();
                            }
                            if (SELECTED_NODE.type === 'pathState') {
                                SELECTED_NODE.form.resetField(SELECTED_NODE.state.path);
                            }
                        },
                    },
                ],
            });
            api.on.getInspectorTree(payload => {
                if (payload.inspectorId !== INSPECTOR_ID) {
                    return;
                }
                const forms = Object.values(DEVTOOLS_FORMS);
                const fields = Object.values(DEVTOOLS_FIELDS);
                payload.rootNodes = [
                    ...forms.map(mapFormForDevtoolsInspector),
                    ...fields.map(field => mapFieldForDevtoolsInspector(field)),
                ];
            });
            api.on.getInspectorState(payload => {
                if (payload.inspectorId !== INSPECTOR_ID) {
                    return;
                }
                const { form, field, state, type } = decodeNodeId(payload.nodeId);
                api.unhighlightElement();
                if (form && type === 'form') {
                    payload.state = buildFormState(form);
                    SELECTED_NODE = { type: 'form', form };
                    api.highlightElement(form._vm);
                    return;
                }
                if (state && type === 'pathState' && form) {
                    payload.state = buildFieldState(state);
                    SELECTED_NODE = { type: 'pathState', state, form };
                    return;
                }
                if (field && type === 'field') {
                    payload.state = buildFieldState({
                        errors: field.errors.value,
                        dirty: field.meta.dirty,
                        valid: field.meta.valid,
                        touched: field.meta.touched,
                        value: field.value.value,
                        initialValue: field.meta.initialValue,
                    });
                    SELECTED_NODE = { field, type: 'field' };
                    api.highlightElement(field._vm);
                    return;
                }
                SELECTED_NODE = null;
                api.unhighlightElement();
            });
        });
    }
}
const refreshInspector = throttle(() => {
    setTimeout(async () => {
        await nextTick();
        API === null || API === void 0 ? void 0 : API.sendInspectorState(INSPECTOR_ID);
        API === null || API === void 0 ? void 0 : API.sendInspectorTree(INSPECTOR_ID);
    }, 100);
}, 100);
function registerFormWithDevTools(form) {
    const vm = getCurrentInstance();
    if (!API) {
        const app = vm === null || vm === void 0 ? void 0 : vm.appContext.app;
        if (!app) {
            return;
        }
        installDevtoolsPlugin(app);
    }
    DEVTOOLS_FORMS[form.formId] = Object.assign({}, form);
    DEVTOOLS_FORMS[form.formId]._vm = vm;
    onUnmounted(() => {
        delete DEVTOOLS_FORMS[form.formId];
        refreshInspector();
    });
    refreshInspector();
}
function registerSingleFieldWithDevtools(field) {
    const vm = getCurrentInstance();
    if (!API) {
        const app = vm === null || vm === void 0 ? void 0 : vm.appContext.app;
        if (!app) {
            return;
        }
        installDevtoolsPlugin(app);
    }
    DEVTOOLS_FIELDS[field.id] = Object.assign({}, field);
    DEVTOOLS_FIELDS[field.id]._vm = vm;
    onUnmounted(() => {
        delete DEVTOOLS_FIELDS[field.id];
        refreshInspector();
    });
    refreshInspector();
}
function mapFormForDevtoolsInspector(form) {
    const { textColor, bgColor } = getValidityColors(form.meta.value.valid);
    const formTreeNodes = {};
    Object.values(form.getAllPathStates()).forEach(state => {
        setInPath(formTreeNodes, toValue(state.path), mapPathForDevtoolsInspector(state, form));
    });
    function buildFormTree(tree, path = []) {
        const key = [...path].pop();
        if ('id' in tree) {
            return Object.assign(Object.assign({}, tree), { label: key || tree.label });
        }
        if (isObject(tree)) {
            return {
                id: `${path.join('.')}`,
                label: key || '',
                children: Object.keys(tree).map(key => buildFormTree(tree[key], [...path, key])),
            };
        }
        if (Array.isArray(tree)) {
            return {
                id: `${path.join('.')}`,
                label: `${key}[]`,
                children: tree.map((c, idx) => buildFormTree(c, [...path, String(idx)])),
            };
        }
        return { id: '', label: '', children: [] };
    }
    const { children } = buildFormTree(formTreeNodes);
    return {
        id: encodeNodeId(form),
        label: form.name,
        children,
        tags: [
            {
                label: 'Form',
                textColor,
                backgroundColor: bgColor,
            },
            {
                label: `${form.getAllPathStates().length} fields`,
                textColor: COLORS.white,
                backgroundColor: COLORS.unknown,
            },
        ],
    };
}
function mapPathForDevtoolsInspector(state, form) {
    return {
        id: encodeNodeId(form, state),
        label: toValue(state.path),
        tags: getFieldNodeTags(state.multiple, state.fieldsCount, state.type, state.valid, form),
    };
}
function mapFieldForDevtoolsInspector(field, form) {
    return {
        id: encodeNodeId(form, field),
        label: unref(field.name),
        tags: getFieldNodeTags(false, 1, field.type, field.meta.valid, form),
    };
}
function getFieldNodeTags(multiple, fieldsCount, type, valid, form) {
    const { textColor, bgColor } = getValidityColors(valid);
    return [
        multiple
            ? undefined
            : {
                label: 'Field',
                textColor,
                backgroundColor: bgColor,
            },
        !form
            ? {
                label: 'Standalone',
                textColor: COLORS.black,
                backgroundColor: COLORS.gray,
            }
            : undefined,
        type === 'checkbox'
            ? {
                label: 'Checkbox',
                textColor: COLORS.white,
                backgroundColor: COLORS.blue,
            }
            : undefined,
        type === 'radio'
            ? {
                label: 'Radio',
                textColor: COLORS.white,
                backgroundColor: COLORS.purple,
            }
            : undefined,
        multiple
            ? {
                label: 'Multiple',
                textColor: COLORS.black,
                backgroundColor: COLORS.orange,
            }
            : undefined,
    ].filter(Boolean);
}
function encodeNodeId(form, stateOrField) {
    const type = stateOrField ? ('path' in stateOrField ? 'pathState' : 'field') : 'form';
    const fieldPath = stateOrField ? ('path' in stateOrField ? stateOrField === null || stateOrField === void 0 ? void 0 : stateOrField.path : toValue(stateOrField === null || stateOrField === void 0 ? void 0 : stateOrField.name)) : '';
    const idObject = { f: form === null || form === void 0 ? void 0 : form.formId, ff: (stateOrField === null || stateOrField === void 0 ? void 0 : stateOrField.id) || fieldPath, type };
    return btoa(encodeURIComponent(JSON.stringify(idObject)));
}
function decodeNodeId(nodeId) {
    try {
        const idObject = JSON.parse(decodeURIComponent(atob(nodeId)));
        const form = DEVTOOLS_FORMS[idObject.f];
        if (!form && idObject.ff) {
            const field = DEVTOOLS_FIELDS[idObject.ff];
            if (!field) {
                return {};
            }
            return {
                type: idObject.type,
                field,
            };
        }
        if (!form) {
            return {};
        }
        const state = form.getPathState(idObject.ff);
        return {
            type: idObject.type,
            form,
            state,
        };
    }
    catch (err) {
        // console.error(`Devtools: [vee-validate] Failed to parse node id ${nodeId}`);
    }
    return {};
}
function buildFieldState(state) {
    return {
        'Field state': [
            { key: 'errors', value: state.errors },
            {
                key: 'initialValue',
                value: state.initialValue,
            },
            {
                key: 'currentValue',
                value: state.value,
            },
            {
                key: 'touched',
                value: state.touched,
            },
            {
                key: 'dirty',
                value: state.dirty,
            },
            {
                key: 'valid',
                value: state.valid,
            },
        ],
    };
}
function buildFormState(form) {
    const { errorBag, meta, values, isSubmitting, isValidating, submitCount } = form;
    return {
        'Form state': [
            {
                key: 'submitCount',
                value: submitCount.value,
            },
            {
                key: 'isSubmitting',
                value: isSubmitting.value,
            },
            {
                key: 'isValidating',
                value: isValidating.value,
            },
            {
                key: 'touched',
                value: meta.value.touched,
            },
            {
                key: 'dirty',
                value: meta.value.dirty,
            },
            {
                key: 'valid',
                value: meta.value.valid,
            },
            {
                key: 'initialValues',
                value: meta.value.initialValues,
            },
            {
                key: 'currentValues',
                value: values,
            },
            {
                key: 'errors',
                value: keysOf(errorBag.value).reduce((acc, key) => {
                    var _a;
                    const message = (_a = errorBag.value[key]) === null || _a === void 0 ? void 0 : _a[0];
                    if (message) {
                        acc[key] = message;
                    }
                    return acc;
                }, {}),
            },
        ],
    };
}
/**
 * Resolves the tag color based on the form state
 */
function getValidityColors(valid) {
    return {
        bgColor: valid ? COLORS.success : COLORS.error,
        textColor: valid ? COLORS.black : COLORS.white,
    };
}

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
    const name = computed(() => normalizeFormPath(toValue(path)));
    const validator = computed(() => {
        const schema = toValue(form === null || form === void 0 ? void 0 : form.schema);
        if (schema) {
            return undefined;
        }
        const rulesValue = unref(rules);
        if (isYupValidator(rulesValue) ||
            isTypedSchema(rulesValue) ||
            isCallable(rulesValue) ||
            Array.isArray(rulesValue)) {
            return rulesValue;
        }
        return normalizeRules(rulesValue);
    });
    const isTyped = !isCallable(validator.value) && isTypedSchema(toValue(rules));
    const { id, value, initialValue, meta, setState, errors, flags } = useFieldState(name, {
        modelValue,
        form,
        bails,
        label,
        type,
        validate: validator.value ? validate$1 : undefined,
        schema: isTyped ? rules : undefined,
    });
    const errorMessage = computed(() => errors.value[0]);
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
            return (_a = results[toValue(name)]) !== null && _a !== void 0 ? _a : { valid: true, errors: [] };
        }
        if (validator.value) {
            return validate(value.value, validator.value, {
                name: toValue(name),
                label: toValue(label),
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
    onMounted(() => {
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
    const vm = getCurrentInstance();
    function setValue(newValue, shouldValidate = true) {
        value.value = vm && syncVModel ? applyModelModifiers(newValue, vm.props.modelModifiers) : newValue;
        const validateFn = shouldValidate ? validateWithStateMutation : validateValidStateOnly;
        validateFn();
    }
    function setErrors(errors) {
        setState({ errors: Array.isArray(errors) ? errors : [errors] });
    }
    const valueProxy = computed({
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
    provide(FieldContextKey, field);
    if (isRef(rules) && typeof unref(rules) !== 'function') {
        watch(rules, (value, oldValue) => {
            if (isEqual(value, oldValue)) {
                return;
            }
            meta.validated ? validateWithStateMutation() : validateValidStateOnly();
        }, {
            deep: true,
        });
    }
    if ((process.env.NODE_ENV !== 'production')) {
        field._vm = getCurrentInstance();
        watch(() => (Object.assign(Object.assign({ errors: errors.value }, meta), { value: value.value })), refreshInspector, {
            deep: true,
        });
        if (!form) {
            registerSingleFieldWithDevtools(field);
        }
    }
    // if no associated form return the field API immediately
    if (!form) {
        return field;
    }
    // associate the field with the given form
    // extract cross-field dependencies in a computed prop
    const dependencies = computed(() => {
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
    watch(dependencies, (deps, oldDeps) => {
        // Skip if no dependencies or if the field wasn't manipulated
        if (!Object.keys(deps).length) {
            return;
        }
        const shouldValidate = !isEqual(deps, oldDeps);
        if (shouldValidate) {
            meta.validated ? validateWithStateMutation() : validateValidStateOnly();
        }
    });
    onBeforeUnmount(() => {
        var _a;
        const shouldKeepValue = (_a = toValue(field.keepValueOnUnmount)) !== null && _a !== void 0 ? _a : toValue(form.keepValuesOnUnmount);
        const path = toValue(name);
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
            const valueIdx = pathState.value.findIndex(i => isEqual(i, toValue(field.checkedValue)));
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
            form.unsetPathValue(toValue(name));
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
        ? getCurrentModelValue(getCurrentInstance(), modelPropName)
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
        const checked = computed(() => {
            const currentValue = toValue(field.value);
            const checkedVal = toValue(checkedValue);
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
            const path = toValue(name);
            const pathState = form === null || form === void 0 ? void 0 : form.getPathState(path);
            const value = normalizeEventValue(e);
            let newValue = (_b = toValue(checkedValue)) !== null && _b !== void 0 ? _b : value;
            if (form && (pathState === null || pathState === void 0 ? void 0 : pathState.multiple) && pathState.type === 'checkbox') {
                newValue = resolveNextCheckboxValue(getFromPath(form.values, path) || [], newValue, undefined);
            }
            else if ((opts === null || opts === void 0 ? void 0 : opts.type) === 'checkbox') {
                newValue = resolveNextCheckboxValue(toValue(field.value), newValue, toValue(uncheckedValue));
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
    const vm = getCurrentInstance();
    /* istanbul ignore next */
    if (!vm || !prop) {
        if ((process.env.NODE_ENV !== 'production')) {
            // eslint-disable-next-line no-console
            console.warn('Failed to setup model events because `useField` was not called in setup.');
        }
        return;
    }
    const propName = typeof prop === 'string' ? prop : 'modelValue';
    const emitName = `update:${propName}`;
    // Component doesn't have a model prop setup (must be defined on the props)
    if (!(propName in vm.props)) {
        return;
    }
    watch(value, newValue => {
        if (isEqual(newValue, getCurrentModelValue(vm, propName))) {
            return;
        }
        vm.emit(emitName, newValue);
    });
    watch(() => getCurrentModelValue(vm, propName), propValue => {
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

const FieldImpl = /** #__PURE__ */ defineComponent({
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
        const rules = toRef(props, 'rules');
        const name = toRef(props, 'name');
        const label = toRef(props, 'label');
        const uncheckedValue = toRef(props, 'uncheckedValue');
        const keepValue = toRef(props, 'keepValue');
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
        const sharedProps = computed(() => {
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
        const fieldProps = computed(() => {
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
        const componentProps = computed(() => {
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
            const tag = resolveDynamicComponent(resolveTag(props, ctx));
            const children = normalizeChildren(tag, ctx, slotProps);
            if (tag) {
                return h(tag, Object.assign(Object.assign({}, ctx.attrs), fieldProps.value), children);
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
    const providedValues = Object.assign({}, toValue(givenInitial));
    const schema = unref(opts === null || opts === void 0 ? void 0 : opts.validationSchema);
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
    const isSubmitting = ref(false);
    // If the form is currently validating
    const isValidating = ref(false);
    // The number of times the user tried to submit the form
    const submitCount = ref(0);
    // field arrays managed by this form
    const fieldArrays = [];
    // a private ref for all form values
    const formValues = reactive(resolveInitialValues(opts));
    const pathStates = ref([]);
    const extraErrorsBag = ref({});
    const pathStateLookup = ref({});
    const rebuildPathLookup = debounceNextTick(() => {
        pathStateLookup.value = pathStates.value.reduce((names, state) => {
            names[normalizeFormPath(toValue(state.path))] = state;
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
    const errorBag = computed(() => {
        const pathErrors = pathStates.value.reduce((acc, state) => {
            if (state.errors.length) {
                acc[toValue(state.path)] = state.errors;
            }
            return acc;
        }, {});
        return Object.assign(Object.assign({}, extraErrorsBag.value), pathErrors);
    });
    // Gets the first error of each field
    const errors = computed(() => {
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
    const fieldNames = computed(() => {
        return pathStates.value.reduce((names, state) => {
            names[toValue(state.path)] = { name: toValue(state.path) || '', label: state.label || '' };
            return names;
        }, {});
    });
    const fieldBailsMap = computed(() => {
        return pathStates.value.reduce((map, state) => {
            var _a;
            map[toValue(state.path)] = (_a = state.bails) !== null && _a !== void 0 ? _a : true;
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
    const controlledValues = computed(() => {
        return pathStates.value.reduce((acc, state) => {
            const value = getFromPath(formValues, toValue(state.path));
            setInPath(acc, toValue(state.path), value);
            return acc;
        }, {});
    });
    const schema = opts === null || opts === void 0 ? void 0 : opts.validationSchema;
    function createPathState(path, config) {
        var _a, _b;
        const initialValue = computed(() => getFromPath(initialValues.value, toValue(path)));
        const pathStateExists = pathStateLookup.value[toValue(path)];
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
        const currentValue = computed(() => getFromPath(formValues, toValue(path)));
        const pathValue = toValue(path);
        const unsetBatchIndex = UNSET_BATCH.findIndex(_path => _path === pathValue);
        if (unsetBatchIndex !== -1) {
            UNSET_BATCH.splice(unsetBatchIndex, 1);
        }
        const isRequired = computed(() => {
            var _a, _b, _c, _d;
            const schemaValue = toValue(schema);
            if (isTypedSchema(schemaValue)) {
                return (_b = (_a = schemaValue.describe) === null || _a === void 0 ? void 0 : _a.call(schemaValue, toValue(path)).required) !== null && _b !== void 0 ? _b : false;
            }
            // Path own schema
            const configSchemaValue = toValue(config === null || config === void 0 ? void 0 : config.schema);
            if (isTypedSchema(configSchemaValue)) {
                return (_d = (_c = configSchemaValue.describe) === null || _c === void 0 ? void 0 : _c.call(configSchemaValue).required) !== null && _d !== void 0 ? _d : false;
            }
            return false;
        });
        const id = FIELD_ID_COUNTER++;
        const state = reactive({
            id,
            path,
            touched: false,
            pending: false,
            valid: true,
            validated: !!((_a = initialErrors[pathValue]) === null || _a === void 0 ? void 0 : _a.length),
            required: isRequired,
            initialValue,
            errors: shallowRef([]),
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
            dirty: computed(() => {
                return !isEqual(unref(currentValue), unref(initialValue));
            }),
        });
        pathStates.value.push(state);
        pathStateLookup.value[pathValue] = state;
        rebuildPathLookup();
        if (errors.value[pathValue] && !initialErrors[pathValue]) {
            nextTick(() => {
                validateField(pathValue, { mode: 'silent' });
            });
        }
        // Handles when a path changes
        if (isRef(path)) {
            watch(path, newPath => {
                rebuildPathLookup();
                const nextValue = klona(currentValue.value);
                pathStateLookup.value[newPath] = state;
                nextTick(() => {
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
            const path = (toValue(pathState === null || pathState === void 0 ? void 0 : pathState.path) || expectedPath);
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
        const candidates = pathStates.value.filter(state => path.startsWith(toValue(state.path)));
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
            PENDING_UNSET = nextTick(() => {
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
        nextTick(() => {
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
        nextTick(() => {
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
        validateSchema: unref(schema) ? validateSchema : undefined,
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
        const pathState = findPathState(toValue(path)) || createPathState(path);
        return computed({
            get() {
                return pathState.value;
            },
            set(value) {
                var _a;
                const pathValue = toValue(path);
                setFieldValue(pathValue, value, (_a = toValue(shouldValidate)) !== null && _a !== void 0 ? _a : false);
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
        nextTick(() => {
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
            state.touched = ((_a = resetState === null || resetState === void 0 ? void 0 : resetState.touched) === null || _a === void 0 ? void 0 : _a[toValue(state.path)]) || false;
            setFieldValue(toValue(state.path), getFromPath(newValues, toValue(state.path)), false);
            setFieldError(toValue(state.path), undefined);
        });
        (opts === null || opts === void 0 ? void 0 : opts.force) ? forceSetValues(newValues, false) : setValues(newValues, false);
        setErrors((resetState === null || resetState === void 0 ? void 0 : resetState.errors) || {});
        submitCount.value = (resetState === null || resetState === void 0 ? void 0 : resetState.submitCount) || 0;
        nextTick(() => {
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
                    key: toValue(state.path),
                    valid: true,
                    errors: [],
                    value: undefined,
                });
            }
            return state.validate(opts).then(result => {
                return {
                    key: toValue(state.path),
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
        const shouldWarn = !state && ((_a = opts === null || opts === void 0 ? void 0 : opts.warn) !== null && _a !== void 0 ? _a : true);
        if (shouldWarn) {
            if ((process.env.NODE_ENV !== 'production')) {
                warn$1(`field with path ${path} was not found`);
            }
        }
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
        const schemaValue = unref(schema);
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
    onMounted(() => {
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
    if (isRef(schema)) {
        watch(schema, () => {
            var _a;
            (_a = formCtx.validateSchema) === null || _a === void 0 ? void 0 : _a.call(formCtx, 'validated-only');
        });
    }
    // Provide injections
    provide(FormContextKey, formCtx);
    if ((process.env.NODE_ENV !== 'production')) {
        registerFormWithDevTools(formCtx);
        watch(() => (Object.assign(Object.assign({ errors: errorBag.value }, meta.value), { values: formValues, isSubmitting: isSubmitting.value, isValidating: isValidating.value, submitCount: submitCount.value })), refreshInspector, {
            deep: true,
        });
    }
    function defineField(path, config) {
        const label = isCallable(config) ? undefined : config === null || config === void 0 ? void 0 : config.label;
        const pathState = (findPathState(toValue(path)) || createPathState(path, { label }));
        const evalConfig = () => (isCallable(config) ? config(omit(pathState, PRIVATE_PATH_STATE_KEYS)) : config || {});
        function onBlur() {
            var _a;
            pathState.touched = true;
            const validateOnBlur = (_a = evalConfig().validateOnBlur) !== null && _a !== void 0 ? _a : getConfig().validateOnBlur;
            if (validateOnBlur) {
                validateField(toValue(pathState.path));
            }
        }
        function onInput() {
            var _a;
            const validateOnInput = (_a = evalConfig().validateOnInput) !== null && _a !== void 0 ? _a : getConfig().validateOnInput;
            if (validateOnInput) {
                nextTick(() => {
                    validateField(toValue(pathState.path));
                });
            }
        }
        function onChange() {
            var _a;
            const validateOnChange = (_a = evalConfig().validateOnChange) !== null && _a !== void 0 ? _a : getConfig().validateOnChange;
            if (validateOnChange) {
                nextTick(() => {
                    validateField(toValue(pathState.path));
                });
            }
        }
        const props = computed(() => {
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
            setFieldValue(toValue(path), value, false);
            props.value.onInput();
        }
        function onChange(e) {
            const value = normalizeEventValue(e);
            setFieldValue(toValue(path), value, false);
            props.value.onChange();
        }
        return computed(() => {
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
        const pathState = findPathState(toValue(path));
        function onUpdateModelValue(value) {
            model.value = value;
        }
        return computed(() => {
            const conf = isCallable(config) ? config(omit(pathState, PRIVATE_PATH_STATE_KEYS)) : config || {};
            return Object.assign({ [conf.model || 'modelValue']: model.value, [`onUpdate:${conf.model || 'modelValue'}`]: onUpdateModelValue }, props.value);
        });
    }
    const ctx = Object.assign(Object.assign({}, formCtx), { values: readonly(formValues), handleReset: () => resetForm(), submitForm });
    provide(PublicFormContextKey, ctx);
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
    const isDirty = computed(() => {
        return !isEqual(currentValues, unref(initialValues));
    });
    function calculateFlags() {
        const states = pathsState.value;
        return keysOf(MERGE_STRATEGIES).reduce((acc, flag) => {
            const mergeMethod = MERGE_STRATEGIES[flag];
            acc[flag] = states[mergeMethod](s => s[flag]);
            return acc;
        }, {});
    }
    const flags = reactive(calculateFlags());
    watchEffect(() => {
        const value = calculateFlags();
        flags.touched = value.touched;
        flags.valid = value.valid;
        flags.pending = value.pending;
    });
    return computed(() => {
        return Object.assign(Object.assign({ initialValues: unref(initialValues) }, flags), { valid: flags.valid && !keysOf(errors.value).length, dirty: isDirty.value });
    });
}
/**
 * Manages the initial values prop
 */
function useFormInitialValues(pathsState, formValues, opts) {
    const values = resolveInitialValues(opts);
    // these are the mutable initial values as the fields are mounted/unmounted
    const initialValues = ref(values);
    // these are the original initial value as provided by the user initially, they don't keep track of conditional fields
    // this is important because some conditional fields will overwrite the initial values for other fields who had the same name
    // like array fields, any push/insert operation will overwrite the initial values because they "create new fields"
    // so these are the values that the reset function should use
    // these only change when the user explicitly changes the initial values or when the user resets them with new values.
    const originalInitialValues = ref(klona(values));
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
            const newValue = getFromPath(initialValues.value, toValue(state.path));
            setInPath(formValues, toValue(state.path), klona(newValue));
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
    return inject(PublicFormContextKey);
}

const FormImpl = /** #__PURE__ */ defineComponent({
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
        const validationSchema = toRef(props, 'validationSchema');
        const keepValues = toRef(props, 'keepValues');
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
            const tag = props.as === 'form' ? props.as : !props.as ? null : resolveDynamicComponent(props.as);
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
            return h(tag, Object.assign(Object.assign(Object.assign({}, formAttrs), ctx.attrs), { onSubmit, onReset: handleFormReset }), children);
        };
    },
});
const Form = FormImpl;

function useFieldArray(arrayPath) {
    const form = injectWithSelf(FormContextKey, undefined);
    const fields = ref([]);
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
        if ((process.env.NODE_ENV !== 'production')) {
            warn('FieldArray requires being a child of `<Form/>` or `useForm` being called before it. Array fields may not work correctly');
        }
        return noOpApi;
    }
    if (!unref(arrayPath)) {
        if ((process.env.NODE_ENV !== 'production')) {
            warn('FieldArray requires a field path to be provided, did you forget to pass the `name` prop?');
        }
        return noOpApi;
    }
    const alreadyExists = form.fieldArrays.find(a => unref(a.path) === unref(arrayPath));
    if (alreadyExists) {
        return alreadyExists;
    }
    let entryCounter = 0;
    function getCurrentValues() {
        return getFromPath(form === null || form === void 0 ? void 0 : form.values, toValue(arrayPath), []) || [];
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
                    const currentValues = getFromPath(form === null || form === void 0 ? void 0 : form.values, toValue(arrayPath), []) || [];
                    const idx = fields.value.findIndex(e => e.key === key);
                    return idx === -1 ? value : currentValues[idx];
                },
                set(value) {
                    const idx = fields.value.findIndex(e => e.key === key);
                    if (idx === -1) {
                        if ((process.env.NODE_ENV !== 'production')) {
                            warn(`Attempting to update a non-existent array item`);
                        }
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
        const pathName = toValue(arrayPath);
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
        const pathName = toValue(arrayPath);
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
        const pathName = toValue(arrayPath);
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
        const pathName = toValue(arrayPath);
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
        const pathName = toValue(arrayPath);
        form.stageInitialValue(pathName, arr);
        setInPath(form.values, pathName, arr);
        initFields();
        afterMutation();
    }
    function update(idx, value) {
        const pathName = toValue(arrayPath);
        const pathValue = getFromPath(form === null || form === void 0 ? void 0 : form.values, pathName);
        if (!Array.isArray(pathValue) || pathValue.length - 1 < idx) {
            return;
        }
        setInPath(form.values, `${pathName}[${idx}]`, value);
        form === null || form === void 0 ? void 0 : form.validate({ mode: 'validated-only' });
    }
    function prepend(initialValue) {
        const value = klona(initialValue);
        const pathName = toValue(arrayPath);
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
        const pathName = toValue(arrayPath);
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
    onBeforeUnmount(() => {
        const idx = form.fieldArrays.findIndex(i => toValue(i.path) === toValue(arrayPath));
        if (idx >= 0) {
            form.fieldArrays.splice(idx, 1);
        }
    });
    // Makes sure to sync the form values with the array value if they go out of sync
    // #4153
    watch(getCurrentValues, formValues => {
        const fieldsValues = fields.value.map(f => f.value);
        // If form values are not the same as the current values then something overrode them.
        if (!isEqual(formValues, fieldsValues)) {
            initFields();
        }
    });
    return fieldArrayCtx;
}

const FieldArrayImpl = /** #__PURE__ */ defineComponent({
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

const ErrorMessageImpl = /** #__PURE__ */ defineComponent({
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
        const form = inject(FormContextKey, undefined);
        const message = computed(() => {
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
            const tag = (props.as ? resolveDynamicComponent(props.as) : props.as);
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
                return h(tag || 'span', attrs, message.value);
            }
            return h(tag, attrs, children);
        };
    },
});
const ErrorMessage = ErrorMessageImpl;

function useResetForm() {
    const form = injectWithSelf(FormContextKey);
    if (!form) {
        if ((process.env.NODE_ENV !== 'production')) {
            warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
        }
    }
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
    return computed(() => {
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
    return computed(() => {
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
    return computed(() => {
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
    if (!form) {
        if ((process.env.NODE_ENV !== 'production')) {
            warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
        }
    }
    return computed(() => {
        var _a;
        return (_a = form === null || form === void 0 ? void 0 : form.isSubmitting.value) !== null && _a !== void 0 ? _a : false;
    });
}

/**
 * If the form is validating or not
 */
function useIsValidating() {
    const form = injectWithSelf(FormContextKey);
    if (!form) {
        if ((process.env.NODE_ENV !== 'production')) {
            warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
        }
    }
    return computed(() => {
        var _a;
        return (_a = form === null || form === void 0 ? void 0 : form.isValidating.value) !== null && _a !== void 0 ? _a : false;
    });
}

/**
 * Validates a single field
 */
function useValidateField(path) {
    const form = injectWithSelf(FormContextKey);
    const field = path ? undefined : inject(FieldContextKey);
    return function validateField() {
        if (field) {
            return field.validate();
        }
        if (form && path) {
            return form === null || form === void 0 ? void 0 : form.validateField(toValue(path));
        }
        if ((process.env.NODE_ENV !== 'production')) {
            warn(`field with name ${unref(path)} was not found`);
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
    if (!form) {
        if ((process.env.NODE_ENV !== 'production')) {
            warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
        }
    }
    return computed(() => {
        var _a;
        return (_a = form === null || form === void 0 ? void 0 : form.meta.value.dirty) !== null && _a !== void 0 ? _a : false;
    });
}

/**
 * If the form is touched or not
 */
function useIsFormTouched() {
    const form = injectWithSelf(FormContextKey);
    if (!form) {
        if ((process.env.NODE_ENV !== 'production')) {
            warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
        }
    }
    return computed(() => {
        var _a;
        return (_a = form === null || form === void 0 ? void 0 : form.meta.value.touched) !== null && _a !== void 0 ? _a : false;
    });
}

/**
 * If the form has been validated and is valid
 */
function useIsFormValid() {
    const form = injectWithSelf(FormContextKey);
    if (!form) {
        if ((process.env.NODE_ENV !== 'production')) {
            warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
        }
    }
    return computed(() => {
        var _a;
        return (_a = form === null || form === void 0 ? void 0 : form.meta.value.valid) !== null && _a !== void 0 ? _a : false;
    });
}

/**
 * Validate multiple fields
 */
function useValidateForm() {
    const form = injectWithSelf(FormContextKey);
    if (!form) {
        if ((process.env.NODE_ENV !== 'production')) {
            warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
        }
    }
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
    if (!form) {
        if ((process.env.NODE_ENV !== 'production')) {
            warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
        }
    }
    return computed(() => {
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
    const field = path ? undefined : inject(FieldContextKey);
    return computed(() => {
        if (path) {
            return getFromPath(form === null || form === void 0 ? void 0 : form.values, toValue(path));
        }
        return toValue(field === null || field === void 0 ? void 0 : field.value);
    });
}

/**
 * Gives access to a form's values
 */
function useFormValues() {
    const form = injectWithSelf(FormContextKey);
    if (!form) {
        if ((process.env.NODE_ENV !== 'production')) {
            warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
        }
    }
    return computed(() => {
        return (form === null || form === void 0 ? void 0 : form.values) || {};
    });
}

/**
 * Gives access to all form errors
 */
function useFormErrors() {
    const form = injectWithSelf(FormContextKey);
    if (!form) {
        if ((process.env.NODE_ENV !== 'production')) {
            warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
        }
    }
    return computed(() => {
        return ((form === null || form === void 0 ? void 0 : form.errors.value) || {});
    });
}

/**
 * Gives access to a single field error
 */
function useFieldError(path) {
    const form = injectWithSelf(FormContextKey);
    // We don't want to use self injected context as it doesn't make sense
    const field = path ? undefined : inject(FieldContextKey);
    return computed(() => {
        if (path) {
            return form === null || form === void 0 ? void 0 : form.errors.value[toValue(path)];
        }
        return field === null || field === void 0 ? void 0 : field.errorMessage.value;
    });
}

function useSubmitForm(cb) {
    const form = injectWithSelf(FormContextKey);
    if (!form) {
        if ((process.env.NODE_ENV !== 'production')) {
            warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
        }
    }
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
    const field = path ? undefined : inject(FieldContextKey);
    return function setFieldError(message) {
        if (path && form) {
            form.setFieldError(toValue(path), message);
            return;
        }
        if (field) {
            field.setErrors(message || []);
            return;
        }
        if ((process.env.NODE_ENV !== 'production')) {
            warn(`Could not set error message since there is no form context or a field named "${toValue(path)}", did you forget to call "useField" or "useForm"?`);
        }
    };
}

/**
 * Sets a field's touched meta state
 */
function useSetFieldTouched(path) {
    const form = injectWithSelf(FormContextKey);
    // We don't want to use self injected context as it doesn't make sense
    const field = path ? undefined : inject(FieldContextKey);
    return function setFieldTouched(touched) {
        if (path && form) {
            form.setFieldTouched(toValue(path), touched);
            return;
        }
        if (field) {
            field.setTouched(touched);
            return;
        }
        if ((process.env.NODE_ENV !== 'production')) {
            warn(`Could not set touched state since there is no form context or a field named "${toValue(path)}", did you forget to call "useField" or "useForm"?`);
        }
    };
}

/**
 * Sets a field's value
 */
function useSetFieldValue(path) {
    const form = injectWithSelf(FormContextKey);
    // We don't want to use self injected context as it doesn't make sense
    const field = path ? undefined : inject(FieldContextKey);
    return function setFieldValue(value, shouldValidate = true) {
        if (path && form) {
            form.setFieldValue(toValue(path), value, shouldValidate);
            return;
        }
        if (field) {
            field.setValue(value, shouldValidate);
            return;
        }
        if ((process.env.NODE_ENV !== 'production')) {
            warn(`Could not set value since there is no form context or a field named "${toValue(path)}", did you forget to call "useField" or "useForm"?`);
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
        if ((process.env.NODE_ENV !== 'production')) {
            warn(`Could not set errors because a form was not detected, did you forget to use "useForm" in a parent component?`);
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
        if ((process.env.NODE_ENV !== 'production')) {
            warn(`Could not set touched state because a form was not detected, did you forget to use "useForm" in a parent component?`);
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
        if ((process.env.NODE_ENV !== 'production')) {
            warn(`Could not set form values because a form was not detected, did you forget to use "useForm" in a parent component?`);
        }
    }
    return setFormValues;
}

export { ErrorMessage, Field, FieldArray, FieldContextKey, Form, FormContextKey, IS_ABSENT, PublicFormContextKey, cleanupNonNestedPath, configure, defineRule, isNotNestedPath, normalizeRules, useField, useFieldArray, useFieldError, useFieldValue, useForm, useFormContext, useFormErrors, useFormValues, useIsFieldDirty, useIsFieldTouched, useIsFieldValid, useIsFormDirty, useIsFormTouched, useIsFormValid, useIsSubmitting, useIsValidating, useResetForm, useSetFieldError, useSetFieldTouched, useSetFieldValue, useSetFormErrors, useSetFormTouched, useSetFormValues, useSubmitCount, useSubmitForm, useValidateField, useValidateForm, validate, validateObjectSchema as validateObject };
