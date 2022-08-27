/**
  * vee-validate v4.6.7
  * (c) 2022 Abdelrahman Awad
  * @license MIT
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VeeValidate = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

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

  const FormContextKey = Symbol('vee-validate-form');
  const FieldContextKey = Symbol('vee-validate-field-instance');
  const IS_ABSENT = Symbol('Default empty value');

  function isLocator(value) {
      return isCallable(value) && !!value.__locatorRef;
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

  // do not edit .js files directly - edit src/index.jst



  var fastDeepEqual = function equal(a, b) {
    if (a === b) return true;

    if (a && b && typeof a == 'object' && typeof b == 'object') {
      if (a.constructor !== b.constructor) return false;

      var length, i, keys;
      if (Array.isArray(a)) {
        length = a.length;
        if (length != b.length) return false;
        for (i = length; i-- !== 0;)
          if (!equal(a[i], b[i])) return false;
        return true;
      }



      if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
      if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
      if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) return false;

      for (i = length; i-- !== 0;)
        if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

      for (i = length; i-- !== 0;) {
        var key = keys[i];

        if (!equal(a[key], b[key])) return false;
      }

      return true;
    }

    // true if both NaN, false otherwise
    return a!==a && b!==b;
  };

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
  function warn(message) {
      vue.warn(`[vee-validate]: ${message}`);
  }
  /**
   * Ensures we deal with a singular field value
   */
  function normalizeField(field) {
      if (Array.isArray(field)) {
          return field[0];
      }
      return field;
  }
  function resolveNextCheckboxValue(currentValue, checkedValue, uncheckedValue) {
      if (Array.isArray(currentValue)) {
          const newVal = [...currentValue];
          // Use isEqual since checked object values can possibly fail the equality check #3883
          const idx = newVal.findIndex(v => fastDeepEqual(v, checkedValue));
          idx >= 0 ? newVal.splice(idx, 1) : newVal.push(checkedValue);
          return newVal;
      }
      return fastDeepEqual(currentValue, checkedValue) ? uncheckedValue : checkedValue;
  }
  function debounceAsync(inner, ms = 0) {
      let timer = null;
      let resolves = [];
      return function (...args) {
          // Run the function after a certain amount of time
          if (timer) {
              window.clearTimeout(timer);
          }
          timer = window.setTimeout(() => {
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
          onDone(result, args);
          return result;
      };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normalizeChildren = (tag, context, slotProps) => {
      if (!context.slots.default) {
          return context.slots.default;
      }
      if (typeof tag === 'string' || !tag) {
          return context.slots.default(slotProps());
      }
      return {
          default: () => { var _a, _b; return (_b = (_a = context.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a, slotProps()); },
      };
  };
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
      return input.value;
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
          const val = getFromPath(crossTable, value) || crossTable[value];
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
          bails: shouldBail !== null && shouldBail !== void 0 ? shouldBail : true,
          formData: (options === null || options === void 0 ? void 0 : options.values) || {},
      };
      const result = await _validate(field, value);
      const errors = result.errors;
      return {
          errors,
          valid: !errors.length,
      };
  }
  /**
   * Starts the validation process.
   */
  async function _validate(field, value) {
      if (isYupValidator(field.rules)) {
          return validateFieldWithYup(value, field.rules, { bails: field.bails });
      }
      // if a generic function or chain of generic functions
      if (isCallable(field.rules) || Array.isArray(field.rules)) {
          const ctx = {
              field: field.name,
              form: field.formData,
              value: value,
          };
          // Normalize the pipeline
          const pipeline = Array.isArray(field.rules) ? field.rules : [field.rules];
          const length = pipeline.length;
          const errors = [];
          for (let i = 0; i < length; i++) {
              const rule = pipeline[i];
              const result = await rule(value, ctx);
              const isValid = typeof result !== 'string' && result;
              if (isValid) {
                  continue;
              }
              const message = typeof result === 'string' ? result : _generateFieldError(ctx);
              errors.push(message);
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
      const normalizedContext = Object.assign(Object.assign({}, field), { rules: normalizeRules(field.rules) });
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
  /**
   * Handles yup validation
   */
  async function validateFieldWithYup(value, validator, opts) {
      var _a;
      const errors = await validator
          .validate(value, {
          abortEarly: (_a = opts.bails) !== null && _a !== void 0 ? _a : true,
      })
          .then(() => [])
          .catch((err) => {
          // Yup errors have a name prop one them.
          // https://github.com/jquense/yup#validationerrorerrors-string--arraystring-value-any-path-string
          if (err.name === 'ValidationError') {
              return err.errors;
          }
          // re-throw the error so we don't hide it
          throw err;
      });
      return {
          errors,
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
          field: field.name,
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
  async function validateYupSchema(schema, values) {
      const errorObjects = await schema
          .validate(values, { abortEarly: false })
          .then(() => [])
          .catch((err) => {
          // Yup errors have a name prop one them.
          // https://github.com/jquense/yup#validationerrorerrors-string--arraystring-value-any-path-string
          if (err.name !== 'ValidationError') {
              throw err;
          }
          // list of aggregated errors
          return err.inner || [];
      });
      const results = {};
      const errors = {};
      for (const error of errorObjects) {
          const messages = error.errors;
          results[error.path] = { valid: !messages.length, errors: messages };
          if (messages.length) {
              errors[error.path] = messages[0];
          }
      }
      return {
          valid: !errorObjects.length,
          results,
          errors,
      };
  }
  async function validateObjectSchema(schema, values, opts) {
      const paths = keysOf(schema);
      const validations = paths.map(async (path) => {
          var _a, _b, _c;
          const fieldResult = await validate(getFromPath(values, path), schema[path], {
              name: ((_a = opts === null || opts === void 0 ? void 0 : opts.names) === null || _a === void 0 ? void 0 : _a[path]) || path,
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
      };
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

  var es6 = function equal(a, b) {
    if (a === b) return true;

    if (a && b && typeof a == 'object' && typeof b == 'object') {
      if (a.constructor !== b.constructor) return false;

      var length, i, keys;
      if (Array.isArray(a)) {
        length = a.length;
        if (length != b.length) return false;
        for (i = length; i-- !== 0;)
          if (!equal(a[i], b[i])) return false;
        return true;
      }


      if ((a instanceof Map) && (b instanceof Map)) {
        if (a.size !== b.size) return false;
        for (i of a.entries())
          if (!b.has(i[0])) return false;
        for (i of a.entries())
          if (!equal(i[1], b.get(i[0]))) return false;
        return true;
      }

      if ((a instanceof Set) && (b instanceof Set)) {
        if (a.size !== b.size) return false;
        for (i of a.entries())
          if (!b.has(i[0])) return false;
        return true;
      }

      if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
        length = a.length;
        if (length != b.length) return false;
        for (i = length; i-- !== 0;)
          if (a[i] !== b[i]) return false;
        return true;
      }


      if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
      if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
      if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) return false;

      for (i = length; i-- !== 0;)
        if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

      for (i = length; i-- !== 0;) {
        var key = keys[i];

        if (!equal(a[key], b[key])) return false;
      }

      return true;
    }

    // true if both NaN, false otherwise
    return a!==a && b!==b;
  };

  let ID_COUNTER = 0;
  function useFieldState(path, init) {
      const { value, initialValue, setInitialValue } = _useFieldValue(path, init.modelValue, !init.standalone);
      const { errorMessage, errors, setErrors } = _useFieldErrors(path, !init.standalone);
      const meta = _useFieldMeta(value, initialValue, errors);
      const id = ID_COUNTER >= Number.MAX_SAFE_INTEGER ? 0 : ++ID_COUNTER;
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
          errors,
          errorMessage,
          setState,
      };
  }
  /**
   * Creates the field value and resolves the initial value
   */
  function _useFieldValue(path, modelValue, shouldInjectForm = true) {
      const form = shouldInjectForm === true ? injectWithSelf(FormContextKey, undefined) : undefined;
      const modelRef = vue.ref(vue.unref(modelValue));
      function resolveInitialValue() {
          if (!form) {
              return vue.unref(modelRef);
          }
          return getFromPath(form.meta.value.initialValues, vue.unref(path), vue.unref(modelRef));
      }
      function setInitialValue(value) {
          if (!form) {
              modelRef.value = value;
              return;
          }
          form.stageInitialValue(vue.unref(path), value, true);
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
      const currentValue = modelValue ? vue.unref(modelValue) : getFromPath(form.values, vue.unref(path), vue.unref(initialValue));
      form.stageInitialValue(vue.unref(path), currentValue, true);
      // otherwise use a computed setter that triggers the `setFieldValue`
      const value = vue.computed({
          get() {
              return getFromPath(form.values, vue.unref(path));
          },
          set(newVal) {
              form.setFieldValue(vue.unref(path), newVal);
          },
      });
      return {
          value,
          initialValue,
          setInitialValue,
      };
  }
  /**
   * Creates meta flags state and some associated effects with them
   */
  function _useFieldMeta(currentValue, initialValue, errors) {
      const meta = vue.reactive({
          touched: false,
          pending: false,
          valid: true,
          validated: !!vue.unref(errors).length,
          initialValue: vue.computed(() => vue.unref(initialValue)),
          dirty: vue.computed(() => {
              return !es6(vue.unref(currentValue), vue.unref(initialValue));
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
  function _useFieldErrors(path, shouldInjectForm) {
      const form = shouldInjectForm ? injectWithSelf(FormContextKey, undefined) : undefined;
      function normalizeErrors(messages) {
          if (!messages) {
              return [];
          }
          return Array.isArray(messages) ? messages : [messages];
      }
      if (!form) {
          const errors = vue.ref([]);
          return {
              errors,
              errorMessage: vue.computed(() => errors.value[0]),
              setErrors: (messages) => {
                  errors.value = normalizeErrors(messages);
              },
          };
      }
      const errors = vue.computed(() => form.errorBag.value[vue.unref(path)] || []);
      return {
          errors,
          errorMessage: vue.computed(() => errors.value[0]),
          setErrors: (messages) => {
              form.setFieldErrorBag(vue.unref(path), normalizeErrors(messages));
          },
      };
  }

  /**
   * Creates a field composite.
   */
  function useField(name, rules, opts) {
      if (hasCheckedAttr(opts === null || opts === void 0 ? void 0 : opts.type)) {
          return useCheckboxField(name, rules, opts);
      }
      return _useField(name, rules, opts);
  }
  function _useField(name, rules, opts) {
      const { initialValue: modelValue, validateOnMount, bails, type, checkedValue, label, validateOnValueUpdate, uncheckedValue, standalone, keepValueOnUnmount, modelPropName, syncVModel, } = normalizeOptions(vue.unref(name), opts);
      const form = !standalone ? injectWithSelf(FormContextKey) : undefined;
      // a flag indicating if the field is about to be removed/unmounted.
      let markedForRemoval = false;
      const { id, value, initialValue, meta, setState, errors, errorMessage } = useFieldState(name, {
          modelValue,
          standalone,
      });
      if (syncVModel) {
          useVModel({ value, prop: modelPropName, handleChange });
      }
      /**
       * Handles common onBlur meta update
       */
      const handleBlur = () => {
          meta.touched = true;
      };
      const normalizedRules = vue.computed(() => {
          let rulesValue = vue.unref(rules);
          const schema = vue.unref(form === null || form === void 0 ? void 0 : form.schema);
          if (schema && !isYupValidator(schema)) {
              rulesValue = extractRuleFromSchema(schema, vue.unref(name)) || rulesValue;
          }
          if (isYupValidator(rulesValue) || isCallable(rulesValue) || Array.isArray(rulesValue)) {
              return rulesValue;
          }
          return normalizeRules(rulesValue);
      });
      async function validateCurrentValue(mode) {
          var _a, _b;
          if (form === null || form === void 0 ? void 0 : form.validateSchema) {
              return (_a = (await form.validateSchema(mode)).results[vue.unref(name)]) !== null && _a !== void 0 ? _a : { valid: true, errors: [] };
          }
          return validate(value.value, normalizedRules.value, {
              name: vue.unref(label) || vue.unref(name),
              values: (_b = form === null || form === void 0 ? void 0 : form.values) !== null && _b !== void 0 ? _b : {},
              bails,
          });
      }
      const validateWithStateMutation = withLatest(async () => {
          meta.pending = true;
          meta.validated = true;
          return validateCurrentValue('validated-only');
      }, result => {
          if (markedForRemoval) {
              result.valid = true;
              result.errors = [];
          }
          setState({ errors: result.errors });
          meta.pending = false;
          return result;
      });
      const validateValidStateOnly = withLatest(async () => {
          return validateCurrentValue('silent');
      }, result => {
          if (markedForRemoval) {
              result.valid = true;
          }
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
          value.value = newValue;
          if (!validateOnValueUpdate && shouldValidate) {
              validateWithStateMutation();
          }
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
      let unwatchValue;
      function watchValue() {
          unwatchValue = vue.watch(value, (val, oldVal) => {
              if (es6(val, oldVal)) {
                  return;
              }
              const validateFn = validateOnValueUpdate ? validateWithStateMutation : validateValidStateOnly;
              validateFn();
          }, {
              deep: true,
          });
      }
      watchValue();
      function resetField(state) {
          var _a;
          unwatchValue === null || unwatchValue === void 0 ? void 0 : unwatchValue();
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
          // need to watch at next tick to avoid triggering the value watcher
          vue.nextTick(() => {
              watchValue();
          });
      }
      function setValue(newValue) {
          value.value = newValue;
      }
      function setErrors(errors) {
          setState({ errors: Array.isArray(errors) ? errors : [errors] });
      }
      const field = {
          id,
          name,
          label,
          value,
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
              if (es6(value, oldValue)) {
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
      form.register(field);
      vue.onBeforeUnmount(() => {
          markedForRemoval = true;
          form.unregister(field);
      });
      // extract cross-field dependencies in a computed prop
      const dependencies = vue.computed(() => {
          const rulesVal = normalizedRules.value;
          // is falsy, a function schema or a yup schema
          if (!rulesVal || isCallable(rulesVal) || isYupValidator(rulesVal) || Array.isArray(rulesVal)) {
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
          const shouldValidate = !es6(deps, oldDeps);
          if (shouldValidate) {
              meta.validated ? validateWithStateMutation() : validateValidStateOnly();
          }
      });
      return field;
  }
  /**
   * Normalizes partial field options to include the full options
   */
  function normalizeOptions(name, opts) {
      const defaults = () => ({
          initialValue: undefined,
          validateOnMount: false,
          bails: true,
          rules: '',
          label: name,
          validateOnValueUpdate: true,
          standalone: false,
          keepValueOnUnmount: undefined,
          modelPropName: 'modelValue',
          syncVModel: true,
      });
      if (!opts) {
          return defaults();
      }
      // TODO: Deprecate this in next major release
      const checkedValue = 'valueProp' in opts ? opts.valueProp : opts.checkedValue;
      return Object.assign(Object.assign(Object.assign({}, defaults()), (opts || {})), { checkedValue });
  }
  /**
   * Extracts the validation rules from a schema
   */
  function extractRuleFromSchema(schema, fieldName) {
      // no schema at all
      if (!schema) {
          return undefined;
      }
      // there is a key on the schema object for this field
      return schema[fieldName];
  }
  function useCheckboxField(name, rules, opts) {
      const form = !(opts === null || opts === void 0 ? void 0 : opts.standalone) ? injectWithSelf(FormContextKey) : undefined;
      const checkedValue = opts === null || opts === void 0 ? void 0 : opts.checkedValue;
      const uncheckedValue = opts === null || opts === void 0 ? void 0 : opts.uncheckedValue;
      function patchCheckboxApi(field) {
          const handleChange = field.handleChange;
          const checked = vue.computed(() => {
              const currentValue = vue.unref(field.value);
              const checkedVal = vue.unref(checkedValue);
              return Array.isArray(currentValue)
                  ? currentValue.findIndex(v => es6(v, checkedVal)) >= 0
                  : es6(checkedVal, currentValue);
          });
          function handleCheckboxChange(e, shouldValidate = true) {
              var _a;
              if (checked.value === ((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.checked)) {
                  return;
              }
              let newValue = normalizeEventValue(e);
              // Single checkbox field without a form to toggle it's value
              if (!form) {
                  newValue = resolveNextCheckboxValue(vue.unref(field.value), vue.unref(checkedValue), vue.unref(uncheckedValue));
              }
              handleChange(newValue, shouldValidate);
          }
          return Object.assign(Object.assign({}, field), { checked,
              checkedValue,
              uncheckedValue, handleChange: handleCheckboxChange });
      }
      return patchCheckboxApi(_useField(name, rules, opts));
  }
  function useVModel({ prop, value, handleChange }) {
      const vm = vue.getCurrentInstance();
      /* istanbul ignore next */
      if (!vm) {
          return;
      }
      const propName = prop || 'modelValue';
      const emitName = `update:${propName}`;
      // Component doesn't have a model prop setup (must be defined on the props)
      if (!(propName in vm.props)) {
          return;
      }
      vue.watch(value, newValue => {
          if (es6(newValue, getCurrentModelValue(vm, propName))) {
              return;
          }
          vm.emit(emitName, newValue);
      });
      vue.watch(() => getCurrentModelValue(vm, propName), propValue => {
          if (propValue === IS_ABSENT && value.value === undefined) {
              return;
          }
          const newValue = propValue === IS_ABSENT ? undefined : propValue;
          if (es6(newValue, applyModelModifiers(value.value, vm.props.modelModifiers))) {
              return;
          }
          handleChange(newValue);
      });
  }
  function getCurrentModelValue(vm, propName) {
      return vm.props[propName];
  }

  const FieldImpl = vue.defineComponent({
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
          const { errors, value, errorMessage, validate: validateField, handleChange, handleBlur, setTouched, resetField, handleReset, meta, checked, setErrors, } = useField(name, rules, {
              validateOnMount: props.validateOnMount,
              bails: props.bails,
              standalone: props.standalone,
              type: ctx.attrs.type,
              initialValue: resolveInitialValue(props, ctx),
              // Only for checkboxes and radio buttons
              checkedValue: ctx.attrs.value,
              uncheckedValue,
              label,
              validateOnValueUpdate: false,
              keepValueOnUnmount: keepValue,
          });
          // If there is a v-model applied on the component we need to emit the `update:modelValue` whenever the value binding changes
          const onChangeHandler = function handleChangeWithModel(e, shouldValidate = true) {
              handleChange(e, shouldValidate);
              ctx.emit('update:modelValue', value.value);
          };
          const handleInput = (e) => {
              if (!hasCheckedAttr(ctx.attrs.type)) {
                  value.value = normalizeEventValue(e);
              }
          };
          const onInputHandler = function handleInputWithModel(e) {
              handleInput(e);
              ctx.emit('update:modelValue', value.value);
          };
          const fieldProps = vue.computed(() => {
              const { validateOnInput, validateOnChange, validateOnBlur, validateOnModelUpdate } = resolveValidationTriggers(props);
              const baseOnBlur = [handleBlur, ctx.attrs.onBlur, validateOnBlur ? validateField : undefined].filter(Boolean);
              const baseOnInput = [(e) => onChangeHandler(e, validateOnInput), ctx.attrs.onInput].filter(Boolean);
              const baseOnChange = [(e) => onChangeHandler(e, validateOnChange), ctx.attrs.onChange].filter(Boolean);
              const attrs = {
                  name: props.name,
                  onBlur: baseOnBlur,
                  onInput: baseOnInput,
                  onChange: baseOnChange,
              };
              attrs['onUpdate:modelValue'] = e => onChangeHandler(e, validateOnModelUpdate);
              if (hasCheckedAttr(ctx.attrs.type) && checked) {
                  attrs.checked = checked.value;
              }
              const tag = resolveTag(props, ctx);
              if (shouldHaveValueBinding(tag, ctx.attrs)) {
                  attrs.value = value.value;
              }
              return attrs;
          });
          function slotProps() {
              return {
                  field: fieldProps.value,
                  value: value.value,
                  meta,
                  errors: errors.value,
                  errorMessage: errorMessage.value,
                  validate: validateField,
                  resetField,
                  handleChange: onChangeHandler,
                  handleInput: onInputHandler,
                  handleReset,
                  handleBlur,
                  setTouched,
                  setErrors,
              };
          }
          ctx.expose({
              setErrors,
              setTouched,
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
  function useForm(opts) {
      var _a;
      const formId = FORM_COUNTER++;
      // Prevents fields from double resetting their values, which causes checkboxes to toggle their initial value
      // TODO: This won't be needed if we centralize all the state inside the `form` for form inputs
      let RESET_LOCK = false;
      // A lookup containing fields or field groups
      const fieldsByPath = vue.ref({});
      // If the form is currently submitting
      const isSubmitting = vue.ref(false);
      // The number of times the user tried to submit the form
      const submitCount = vue.ref(0);
      // field arrays managed by this form
      const fieldArrays = [];
      // a private ref for all form values
      const formValues = vue.reactive(klona(vue.unref(opts === null || opts === void 0 ? void 0 : opts.initialValues) || {}));
      // the source of errors for the form fields
      const { errorBag, setErrorBag, setFieldErrorBag } = useErrorBag(opts === null || opts === void 0 ? void 0 : opts.initialErrors);
      // Gets the first error of each field
      const errors = vue.computed(() => {
          return keysOf(errorBag.value).reduce((acc, key) => {
              const bag = errorBag.value[key];
              if (bag && bag.length) {
                  acc[key] = bag[0];
              }
              return acc;
          }, {});
      });
      function getFirstFieldAtPath(path) {
          const fieldOrGroup = fieldsByPath.value[path];
          return Array.isArray(fieldOrGroup) ? fieldOrGroup[0] : fieldOrGroup;
      }
      function fieldExists(path) {
          return !!fieldsByPath.value[path];
      }
      /**
       * Holds a computed reference to all fields names and labels
       */
      const fieldNames = vue.computed(() => {
          return keysOf(fieldsByPath.value).reduce((names, path) => {
              const field = getFirstFieldAtPath(path);
              if (field) {
                  names[path] = vue.unref(field.label || field.name) || '';
              }
              return names;
          }, {});
      });
      const fieldBailsMap = vue.computed(() => {
          return keysOf(fieldsByPath.value).reduce((map, path) => {
              var _a;
              const field = getFirstFieldAtPath(path);
              if (field) {
                  map[path] = (_a = field.bails) !== null && _a !== void 0 ? _a : true;
              }
              return map;
          }, {});
      });
      // mutable non-reactive reference to initial errors
      // we need this to process initial errors then unset them
      const initialErrors = Object.assign({}, ((opts === null || opts === void 0 ? void 0 : opts.initialErrors) || {}));
      const keepValuesOnUnmount = (_a = opts === null || opts === void 0 ? void 0 : opts.keepValuesOnUnmount) !== null && _a !== void 0 ? _a : false;
      // initial form values
      const { initialValues, originalInitialValues, setInitialValues } = useFormInitialValues(fieldsByPath, formValues, opts === null || opts === void 0 ? void 0 : opts.initialValues);
      // form meta aggregations
      const meta = useFormMeta(fieldsByPath, formValues, originalInitialValues, errors);
      const schema = opts === null || opts === void 0 ? void 0 : opts.validationSchema;
      /**
       * Batches validation runs in 5ms batches
       * Must have two distinct batch queues to make sure they don't override each other settings #3783
       */
      const debouncedSilentValidation = debounceAsync(_validateSchema, 5);
      const debouncedValidation = debounceAsync(_validateSchema, 5);
      const validateSchema = withLatest(async (mode) => {
          return (await mode) === 'silent' ? debouncedSilentValidation() : debouncedValidation();
      }, (formResult, [mode]) => {
          // fields by id lookup
          const fieldsById = formCtx.fieldsByPath.value || {};
          // errors fields names, we need it to also check if custom errors are updated
          const currentErrorsPaths = keysOf(formCtx.errorBag.value);
          // collect all the keys from the schema and all fields
          // this ensures we have a complete keymap of all the fields
          const paths = [
              ...new Set([...keysOf(formResult.results), ...keysOf(fieldsById), ...currentErrorsPaths]),
          ];
          // aggregates the paths into a single result object while applying the results on the fields
          return paths.reduce((validation, path) => {
              const field = fieldsById[path];
              const messages = (formResult.results[path] || { errors: [] }).errors;
              const fieldResult = {
                  errors: messages,
                  valid: !messages.length,
              };
              validation.results[path] = fieldResult;
              if (!fieldResult.valid) {
                  validation.errors[path] = fieldResult.errors[0];
              }
              // field not rendered
              if (!field) {
                  setFieldError(path, messages);
                  return validation;
              }
              // always update the valid flag regardless of the mode
              applyFieldMutation(field, f => (f.meta.valid = fieldResult.valid));
              if (mode === 'silent') {
                  return validation;
              }
              const wasValidated = Array.isArray(field) ? field.some(f => f.meta.validated) : field.meta.validated;
              if (mode === 'validated-only' && !wasValidated) {
                  return validation;
              }
              applyFieldMutation(field, f => f.setState({ errors: fieldResult.errors }));
              return validation;
          }, { valid: formResult.valid, results: {}, errors: {} });
      });
      const formCtx = {
          formId,
          fieldsByPath,
          values: formValues,
          errorBag,
          errors,
          schema,
          submitCount,
          meta,
          isSubmitting,
          fieldArrays,
          keepValuesOnUnmount,
          validateSchema: vue.unref(schema) ? validateSchema : undefined,
          validate,
          register: registerField,
          unregister: unregisterField,
          setFieldErrorBag,
          validateField,
          setFieldValue,
          setValues,
          setErrors,
          setFieldError,
          setFieldTouched,
          setTouched,
          resetForm,
          handleSubmit,
          stageInitialValue,
          unsetInitialValue,
          setFieldInitialValue,
          useFieldModel,
      };
      function isFieldGroup(fieldOrGroup) {
          return Array.isArray(fieldOrGroup);
      }
      function applyFieldMutation(fieldOrGroup, mutation) {
          if (Array.isArray(fieldOrGroup)) {
              return fieldOrGroup.forEach(mutation);
          }
          return mutation(fieldOrGroup);
      }
      function mutateAllFields(mutation) {
          Object.values(fieldsByPath.value).forEach(field => {
              if (!field) {
                  return;
              }
              // avoid resetting the field values, because they should've been reset already.
              applyFieldMutation(field, mutation);
          });
      }
      /**
       * Manually sets an error message on a specific field
       */
      function setFieldError(field, message) {
          setFieldErrorBag(field, message);
      }
      /**
       * Sets errors for the fields specified in the object
       */
      function setErrors(fields) {
          setErrorBag(fields);
      }
      /**
       * Sets a single field value
       */
      function setFieldValue(field, value, { force } = { force: false }) {
          var _a;
          const fieldInstance = fieldsByPath.value[field];
          const clonedValue = klona(value);
          // field wasn't found, create a virtual field as a placeholder
          if (!fieldInstance) {
              setInPath(formValues, field, clonedValue);
              return;
          }
          if (isFieldGroup(fieldInstance) && ((_a = fieldInstance[0]) === null || _a === void 0 ? void 0 : _a.type) === 'checkbox' && !Array.isArray(value)) {
              // Multiple checkboxes, and only one of them got updated
              const newValue = klona(resolveNextCheckboxValue(getFromPath(formValues, field) || [], value, undefined));
              setInPath(formValues, field, newValue);
              return;
          }
          let newValue = value;
          // Single Checkbox: toggles the field value unless the field is being reset then force it
          if (!isFieldGroup(fieldInstance) && fieldInstance.type === 'checkbox' && !force && !RESET_LOCK) {
              newValue = klona(resolveNextCheckboxValue(getFromPath(formValues, field), value, vue.unref(fieldInstance.uncheckedValue)));
          }
          setInPath(formValues, field, newValue);
      }
      /**
       * Sets multiple fields values
       */
      function setValues(fields) {
          // clean up old values
          keysOf(formValues).forEach(key => {
              delete formValues[key];
          });
          // set up new values
          keysOf(fields).forEach(path => {
              setFieldValue(path, fields[path]);
          });
          // regenerate the arrays when the form values change
          fieldArrays.forEach(f => f && f.reset());
      }
      function createModel(path) {
          const { value } = _useFieldValue(path);
          vue.watch(value, () => {
              if (!fieldExists(vue.unref(path))) {
                  validate({ mode: 'validated-only' });
              }
          }, {
              deep: true,
          });
          return value;
      }
      function useFieldModel(path) {
          if (!Array.isArray(path)) {
              return createModel(path);
          }
          return path.map(createModel);
      }
      /**
       * Sets the touched meta state on a field
       */
      function setFieldTouched(field, isTouched) {
          const fieldInstance = fieldsByPath.value[field];
          if (fieldInstance) {
              applyFieldMutation(fieldInstance, f => f.setTouched(isTouched));
          }
      }
      /**
       * Sets the touched meta state on multiple fields
       */
      function setTouched(fields) {
          keysOf(fields).forEach(field => {
              setFieldTouched(field, !!fields[field]);
          });
      }
      /**
       * Resets all fields
       */
      function resetForm(state) {
          RESET_LOCK = true;
          // set initial values if provided
          if (state === null || state === void 0 ? void 0 : state.values) {
              setInitialValues(state.values);
              setValues(state === null || state === void 0 ? void 0 : state.values);
          }
          else {
              // clean up the initial values back to the original
              setInitialValues(originalInitialValues.value);
              // otherwise clean the current values
              setValues(originalInitialValues.value);
          }
          // avoid resetting the field values, because they should've been reset already.
          mutateAllFields(f => f.resetField());
          if (state === null || state === void 0 ? void 0 : state.touched) {
              setTouched(state.touched);
          }
          setErrors((state === null || state === void 0 ? void 0 : state.errors) || {});
          submitCount.value = (state === null || state === void 0 ? void 0 : state.submitCount) || 0;
          vue.nextTick(() => {
              RESET_LOCK = false;
          });
      }
      function insertFieldAtPath(field, path) {
          const rawField = vue.markRaw(field);
          const fieldPath = path;
          // first field at that path
          if (!fieldsByPath.value[fieldPath]) {
              fieldsByPath.value[fieldPath] = rawField;
              return;
          }
          const fieldAtPath = fieldsByPath.value[fieldPath];
          if (fieldAtPath && !Array.isArray(fieldAtPath)) {
              fieldsByPath.value[fieldPath] = [fieldAtPath];
          }
          // add the new array to that path
          fieldsByPath.value[fieldPath] = [...fieldsByPath.value[fieldPath], rawField];
      }
      function removeFieldFromPath(field, path) {
          const fieldPath = path;
          const fieldAtPath = fieldsByPath.value[fieldPath];
          if (!fieldAtPath) {
              return;
          }
          // same field at path
          if (!isFieldGroup(fieldAtPath) && field.id === fieldAtPath.id) {
              delete fieldsByPath.value[fieldPath];
              return;
          }
          if (isFieldGroup(fieldAtPath)) {
              const idx = fieldAtPath.findIndex(f => f.id === field.id);
              if (idx === -1) {
                  return;
              }
              fieldAtPath.splice(idx, 1);
              if (!fieldAtPath.length) {
                  delete fieldsByPath.value[fieldPath];
              }
          }
      }
      function registerField(field) {
          const fieldPath = vue.unref(field.name);
          insertFieldAtPath(field, fieldPath);
          if (vue.isRef(field.name)) {
              // ensures when a field's name was already taken that it preserves its same value
              // necessary for fields generated by loops
              vue.watch(field.name, async (newPath, oldPath) => {
                  // cache the value
                  await vue.nextTick();
                  removeFieldFromPath(field, oldPath);
                  insertFieldAtPath(field, newPath);
                  // re-validate if either path had errors before
                  if (errors.value[oldPath] || errors.value[newPath]) {
                      // clear up both paths errors
                      setFieldError(oldPath, undefined);
                      validateField(newPath);
                  }
                  // clean up the old path if no other field is sharing that name
                  // #3325
                  await vue.nextTick();
                  if (!fieldExists(oldPath)) {
                      unsetPath(formValues, oldPath);
                  }
              });
          }
          // if field already had errors (initial errors) that's not user-set, validate it again to ensure state is correct
          // the difference being that `initialErrors` will contain the error message while other errors (pre-validated schema) won't have them as initial errors
          // #3342
          const initialErrorMessage = vue.unref(field.errorMessage);
          if (initialErrorMessage && (initialErrors === null || initialErrors === void 0 ? void 0 : initialErrors[fieldPath]) !== initialErrorMessage) {
              validateField(fieldPath);
          }
          // marks the initial error as "consumed" so it won't be matched later with same non-initial error
          delete initialErrors[fieldPath];
      }
      function unregisterField(field) {
          const fieldName = vue.unref(field.name);
          const fieldInstance = fieldsByPath.value[fieldName];
          const isGroup = !!fieldInstance && isFieldGroup(fieldInstance);
          removeFieldFromPath(field, fieldName);
          // clears a field error on unmounted
          // we wait till next tick to make sure if the field is completely removed and doesn't have any siblings like checkboxes
          vue.nextTick(() => {
              var _a;
              const shouldKeepValue = (_a = vue.unref(field.keepValueOnUnmount)) !== null && _a !== void 0 ? _a : vue.unref(keepValuesOnUnmount);
              const currentGroupValue = getFromPath(formValues, fieldName);
              // The boolean here is we check if the field still belongs to the same control group with that name
              // if another group claimed the name, we should avoid handling it since it is no longer the same group
              // this happens with `v-for` over some checkboxes and field arrays.
              // also if the group no longer exist we can assume this group was the last one that controlled it
              const isSameGroup = isGroup && (fieldInstance === fieldsByPath.value[fieldName] || !fieldsByPath.value[fieldName]);
              // group field that still has a dangling value, the field may exist or not after it was removed.
              // This used to be handled in the useField composable but the form has better context on when it should/not happen.
              // if it does belong to it that means the group still exists
              // #3844
              if (isSameGroup && Array.isArray(currentGroupValue) && !shouldKeepValue) {
                  const valueIdx = currentGroupValue.findIndex(i => es6(i, vue.unref(field.checkedValue)));
                  if (valueIdx > -1) {
                      const newVal = [...currentGroupValue];
                      newVal.splice(valueIdx, 1);
                      setFieldValue(fieldName, newVal, { force: true });
                  }
              }
              // Field was removed entirely, we should unset its path
              // #3384
              if (!fieldExists(fieldName)) {
                  setFieldError(fieldName, undefined);
                  // Checks if the field was configured to be unset during unmount or not
                  // Checks both the form-level config and field-level one
                  // Field has the priority if it is set, otherwise it goes to the form settings
                  if (shouldKeepValue) {
                      return;
                  }
                  if (isGroup && !isEmptyContainer(getFromPath(formValues, fieldName))) {
                      return;
                  }
                  unsetPath(formValues, fieldName);
              }
          });
      }
      async function validate(opts) {
          mutateAllFields(f => (f.meta.validated = true));
          if (formCtx.validateSchema) {
              return formCtx.validateSchema((opts === null || opts === void 0 ? void 0 : opts.mode) || 'force');
          }
          // No schema, each field is responsible to validate itself
          const validations = await Promise.all(Object.values(fieldsByPath.value).map(field => {
              const fieldInstance = Array.isArray(field) ? field[0] : field;
              if (!fieldInstance) {
                  return Promise.resolve({ key: '', valid: true, errors: [] });
              }
              return fieldInstance.validate(opts).then((result) => {
                  return {
                      key: vue.unref(fieldInstance.name),
                      valid: result.valid,
                      errors: result.errors,
                  };
              });
          }));
          const results = {};
          const errors = {};
          for (const validation of validations) {
              results[validation.key] = {
                  valid: validation.valid,
                  errors: validation.errors,
              };
              if (validation.errors.length) {
                  errors[validation.key] = validation.errors[0];
              }
          }
          return {
              valid: validations.every(r => r.valid),
              results,
              errors,
          };
      }
      async function validateField(field) {
          const fieldInstance = fieldsByPath.value[field];
          if (!fieldInstance) {
              vue.warn(`field with name ${field} was not found`);
              return Promise.resolve({ errors: [], valid: true });
          }
          if (Array.isArray(fieldInstance)) {
              return fieldInstance.map(f => f.validate())[0];
          }
          return fieldInstance.validate();
      }
      function handleSubmit(fn, onValidationError) {
          return function submissionHandler(e) {
              if (e instanceof Event) {
                  e.preventDefault();
                  e.stopPropagation();
              }
              // Touch all fields
              setTouched(keysOf(fieldsByPath.value).reduce((acc, field) => {
                  acc[field] = true;
                  return acc;
              }, {}));
              isSubmitting.value = true;
              submitCount.value++;
              return validate()
                  .then(result => {
                  if (result.valid && typeof fn === 'function') {
                      return fn(klona(formValues), {
                          evt: e,
                          setErrors,
                          setFieldError,
                          setTouched,
                          setFieldTouched,
                          setValues,
                          setFieldValue,
                          resetForm,
                      });
                  }
                  if (!result.valid && typeof onValidationError === 'function') {
                      onValidationError({
                          values: klona(formValues),
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
      }
      function setFieldInitialValue(path, value) {
          setInPath(initialValues.value, path, klona(value));
      }
      function unsetInitialValue(path) {
          unsetPath(initialValues.value, path);
      }
      /**
       * Sneaky function to set initial field values
       */
      function stageInitialValue(path, value, updateOriginal = false) {
          setInPath(formValues, path, value);
          setFieldInitialValue(path, value);
          if (updateOriginal && !(opts === null || opts === void 0 ? void 0 : opts.initialValues)) {
              setInPath(originalInitialValues.value, path, klona(value));
          }
      }
      async function _validateSchema() {
          const schemaValue = vue.unref(schema);
          if (!schemaValue) {
              return { valid: true, results: {}, errors: {} };
          }
          const formResult = isYupValidator(schemaValue)
              ? await validateYupSchema(schemaValue, formValues)
              : await validateObjectSchema(schemaValue, formValues, {
                  names: fieldNames.value,
                  bailsMap: fieldBailsMap.value,
              });
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
      return {
          errors,
          meta,
          values: formValues,
          isSubmitting,
          submitCount,
          validate,
          validateField,
          handleReset: () => resetForm(),
          resetForm,
          handleSubmit,
          submitForm,
          setFieldError,
          setErrors,
          setFieldValue,
          setValues,
          setFieldTouched,
          setTouched,
          useFieldModel,
      };
  }
  /**
   * Manages form meta aggregation
   */
  function useFormMeta(fieldsByPath, currentValues, initialValues, errors) {
      const MERGE_STRATEGIES = {
          touched: 'some',
          pending: 'some',
          valid: 'every',
      };
      const isDirty = vue.computed(() => {
          return !es6(currentValues, vue.unref(initialValues));
      });
      function calculateFlags() {
          const fields = Object.values(fieldsByPath.value).flat(1).filter(Boolean);
          return keysOf(MERGE_STRATEGIES).reduce((acc, flag) => {
              const mergeMethod = MERGE_STRATEGIES[flag];
              acc[flag] = fields[mergeMethod](field => field.meta[flag]);
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
  function useFormInitialValues(fields, formValues, providedValues) {
      // these are the mutable initial values as the fields are mounted/unmounted
      const initialValues = vue.ref(klona(vue.unref(providedValues)) || {});
      // these are the original initial value as provided by the user initially, they don't keep track of conditional fields
      // this is important because some conditional fields will overwrite the initial values for other fields who had the same name
      // like array fields, any push/insert operation will overwrite the initial values because they "create new fields"
      // so these are the values that the reset function should use
      // these only change when the user explicitly chanegs the initial values or when the user resets them with new values.
      const originalInitialValues = vue.ref(klona(vue.unref(providedValues)) || {});
      function setInitialValues(values, updateFields = false) {
          initialValues.value = klona(values);
          originalInitialValues.value = klona(values);
          if (!updateFields) {
              return;
          }
          // update the pristine non-touched fields
          // those are excluded because it's unlikely you want to change the form values using initial values
          // we mostly watch them for API population or newly inserted fields
          // if the user API is taking too much time before user interaction they should consider disabling or hiding their inputs until the values are ready
          keysOf(fields.value).forEach(fieldPath => {
              const field = fields.value[fieldPath];
              const wasTouched = Array.isArray(field) ? field.some(f => f.meta.touched) : field === null || field === void 0 ? void 0 : field.meta.touched;
              if (!field || wasTouched) {
                  return;
              }
              const newValue = getFromPath(initialValues.value, fieldPath);
              setInPath(formValues, fieldPath, klona(newValue));
          });
      }
      if (vue.isRef(providedValues)) {
          vue.watch(providedValues, value => {
              setInitialValues(value, true);
          }, {
              deep: true,
          });
      }
      return {
          initialValues,
          originalInitialValues,
          setInitialValues,
      };
  }
  function useErrorBag(initialErrors) {
      const errorBag = vue.ref({});
      function normalizeErrorItem(message) {
          return Array.isArray(message) ? message : message ? [message] : [];
      }
      /**
       * Manually sets an error message on a specific field
       */
      function setFieldErrorBag(field, message) {
          if (!message) {
              delete errorBag.value[field];
              return;
          }
          errorBag.value[field] = normalizeErrorItem(message);
      }
      /**
       * Sets errors for the fields specified in the object
       */
      function setErrorBag(fields) {
          errorBag.value = keysOf(fields).reduce((acc, key) => {
              const message = fields[key];
              if (message) {
                  acc[key] = normalizeErrorItem(message);
              }
              return acc;
          }, {});
      }
      if (initialErrors) {
          setErrorBag(initialErrors);
      }
      return {
          errorBag,
          setErrorBag,
          setFieldErrorBag,
      };
  }

  const FormImpl = vue.defineComponent({
      name: 'Form',
      inheritAttrs: false,
      props: {
          as: {
              type: String,
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
      },
      setup(props, ctx) {
          const initialValues = vue.toRef(props, 'initialValues');
          const validationSchema = vue.toRef(props, 'validationSchema');
          const keepValues = vue.toRef(props, 'keepValues');
          const { errors, values, meta, isSubmitting, submitCount, validate, validateField, handleReset, resetForm, handleSubmit, setErrors, setFieldError, setFieldValue, setValues, setFieldTouched, setTouched, } = useForm({
              validationSchema: validationSchema.value ? validationSchema : undefined,
              initialValues,
              initialErrors: props.initialErrors,
              initialTouched: props.initialTouched,
              validateOnMount: props.validateOnMount,
              keepValuesOnUnmount: keepValues,
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
          function slotProps() {
              return {
                  meta: meta.value,
                  errors: errors.value,
                  values: values,
                  isSubmitting: isSubmitting.value,
                  submitCount: submitCount.value,
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
          });
          return function renderForm() {
              // avoid resolving the form component as itself
              const tag = props.as === 'form' ? props.as : vue.resolveDynamicComponent(props.as);
              const children = normalizeChildren(tag, ctx, slotProps);
              if (!props.as) {
                  return children;
              }
              // Attributes to add on a native `form` tag
              const formAttrs = props.as === 'form'
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
      // eslint-disable-next-line @typescript-eslint/no-empty-function
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
          warn('FieldArray requires being a child of `<Form/>` or `useForm` being called before it. Array fields may not work correctly');
          return noOpApi;
      }
      if (!vue.unref(arrayPath)) {
          warn('FieldArray requires a field path to be provided, did you forget to pass the `name` prop?');
          return noOpApi;
      }
      const alreadyExists = form.fieldArrays.find(a => vue.unref(a.path) === vue.unref(arrayPath));
      if (alreadyExists) {
          return alreadyExists;
      }
      let entryCounter = 0;
      function initFields() {
          const currentValues = getFromPath(form === null || form === void 0 ? void 0 : form.values, vue.unref(arrayPath), []) || [];
          fields.value = currentValues.map(createEntry);
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
      function createEntry(value) {
          const key = entryCounter++;
          const entry = {
              key,
              value: vue.computed({
                  get() {
                      const currentValues = getFromPath(form === null || form === void 0 ? void 0 : form.values, vue.unref(arrayPath), []) || [];
                      const idx = fields.value.findIndex(e => e.key === key);
                      return idx === -1 ? value : currentValues[idx];
                  },
                  set(value) {
                      const idx = fields.value.findIndex(e => e.key === key);
                      if (idx === -1) {
                          warn(`Attempting to update a non-existent array item`);
                          return;
                      }
                      update(idx, value);
                  },
              }),
              isFirst: false,
              isLast: false,
          };
          return entry;
      }
      function remove(idx) {
          const pathName = vue.unref(arrayPath);
          const pathValue = getFromPath(form === null || form === void 0 ? void 0 : form.values, pathName);
          if (!pathValue || !Array.isArray(pathValue)) {
              return;
          }
          const newValue = [...pathValue];
          newValue.splice(idx, 1);
          form === null || form === void 0 ? void 0 : form.unsetInitialValue(pathName + `[${idx}]`);
          form === null || form === void 0 ? void 0 : form.setFieldValue(pathName, newValue);
          fields.value.splice(idx, 1);
          updateEntryFlags();
      }
      function push(value) {
          const pathName = vue.unref(arrayPath);
          const pathValue = getFromPath(form === null || form === void 0 ? void 0 : form.values, pathName);
          const normalizedPathValue = isNullOrUndefined(pathValue) ? [] : pathValue;
          if (!Array.isArray(normalizedPathValue)) {
              return;
          }
          const newValue = [...normalizedPathValue];
          newValue.push(value);
          form === null || form === void 0 ? void 0 : form.stageInitialValue(pathName + `[${newValue.length - 1}]`, value);
          form === null || form === void 0 ? void 0 : form.setFieldValue(pathName, newValue);
          fields.value.push(createEntry(value));
          updateEntryFlags();
      }
      function swap(indexA, indexB) {
          const pathName = vue.unref(arrayPath);
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
          form === null || form === void 0 ? void 0 : form.setFieldValue(pathName, newValue);
          fields.value = newFields;
          updateEntryFlags();
      }
      function insert(idx, value) {
          const pathName = vue.unref(arrayPath);
          const pathValue = getFromPath(form === null || form === void 0 ? void 0 : form.values, pathName);
          if (!Array.isArray(pathValue) || pathValue.length < idx) {
              return;
          }
          const newValue = [...pathValue];
          const newFields = [...fields.value];
          newValue.splice(idx, 0, value);
          newFields.splice(idx, 0, createEntry(value));
          form === null || form === void 0 ? void 0 : form.setFieldValue(pathName, newValue);
          fields.value = newFields;
          updateEntryFlags();
      }
      function replace(arr) {
          const pathName = vue.unref(arrayPath);
          form === null || form === void 0 ? void 0 : form.setFieldValue(pathName, arr);
          initFields();
      }
      function update(idx, value) {
          const pathName = vue.unref(arrayPath);
          const pathValue = getFromPath(form === null || form === void 0 ? void 0 : form.values, pathName);
          if (!Array.isArray(pathValue) || pathValue.length - 1 < idx) {
              return;
          }
          form === null || form === void 0 ? void 0 : form.setFieldValue(`${pathName}[${idx}]`, value);
      }
      function prepend(value) {
          const pathName = vue.unref(arrayPath);
          const pathValue = getFromPath(form === null || form === void 0 ? void 0 : form.values, pathName);
          const normalizedPathValue = isNullOrUndefined(pathValue) ? [] : pathValue;
          if (!Array.isArray(normalizedPathValue)) {
              return;
          }
          const newValue = [value, ...normalizedPathValue];
          form === null || form === void 0 ? void 0 : form.stageInitialValue(pathName + `[${newValue.length - 1}]`, value);
          form === null || form === void 0 ? void 0 : form.setFieldValue(pathName, newValue);
          fields.value.unshift(createEntry(value));
          updateEntryFlags();
      }
      function move(oldIdx, newIdx) {
          const pathName = vue.unref(arrayPath);
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
          form === null || form === void 0 ? void 0 : form.setFieldValue(pathName, newValue);
          fields.value = newFields;
          updateEntryFlags();
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
          const idx = form.fieldArrays.findIndex(i => vue.unref(i.path) === vue.unref(arrayPath));
          if (idx >= 0) {
              form.fieldArrays.splice(idx, 1);
          }
      });
      return fieldArrayCtx;
  }

  const FieldArrayImpl = vue.defineComponent({
      name: 'FieldArray',
      inheritAttrs: false,
      props: {
          name: {
              type: String,
              required: true,
          },
      },
      setup(props, ctx) {
          const { push, remove, swap, insert, replace, update, prepend, move, fields } = useFieldArray(vue.toRef(props, 'name'));
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

  const ErrorMessageImpl = vue.defineComponent({
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
      if (!form) {
          warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
      }
      return function resetForm(state) {
          if (!form) {
              return;
          }
          return form.resetForm(state);
      };
  }

  /**
   * If a field is dirty or not
   */
  function useIsFieldDirty(path) {
      const form = injectWithSelf(FormContextKey);
      let field = path ? undefined : vue.inject(FieldContextKey);
      return vue.computed(() => {
          if (path) {
              field = normalizeField(form === null || form === void 0 ? void 0 : form.fieldsByPath.value[vue.unref(path)]);
          }
          if (!field) {
              warn(`field with name ${vue.unref(path)} was not found`);
              return false;
          }
          return field.meta.dirty;
      });
  }

  /**
   * If a field is touched or not
   */
  function useIsFieldTouched(path) {
      const form = injectWithSelf(FormContextKey);
      let field = path ? undefined : vue.inject(FieldContextKey);
      return vue.computed(() => {
          if (path) {
              field = normalizeField(form === null || form === void 0 ? void 0 : form.fieldsByPath.value[vue.unref(path)]);
          }
          if (!field) {
              warn(`field with name ${vue.unref(path)} was not found`);
              return false;
          }
          return field.meta.touched;
      });
  }

  /**
   * If a field is validated and is valid
   */
  function useIsFieldValid(path) {
      const form = injectWithSelf(FormContextKey);
      let field = path ? undefined : vue.inject(FieldContextKey);
      return vue.computed(() => {
          if (path) {
              field = normalizeField(form === null || form === void 0 ? void 0 : form.fieldsByPath.value[vue.unref(path)]);
          }
          if (!field) {
              warn(`field with name ${vue.unref(path)} was not found`);
              return false;
          }
          return field.meta.valid;
      });
  }

  /**
   * If the form is submitting or not
   */
  function useIsSubmitting() {
      const form = injectWithSelf(FormContextKey);
      if (!form) {
          warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
      }
      return vue.computed(() => {
          var _a;
          return (_a = form === null || form === void 0 ? void 0 : form.isSubmitting.value) !== null && _a !== void 0 ? _a : false;
      });
  }

  /**
   * Validates a single field
   */
  function useValidateField(path) {
      const form = injectWithSelf(FormContextKey);
      let field = path ? undefined : vue.inject(FieldContextKey);
      return function validateField() {
          if (path) {
              field = normalizeField(form === null || form === void 0 ? void 0 : form.fieldsByPath.value[vue.unref(path)]);
          }
          if (!field) {
              warn(`field with name ${vue.unref(path)} was not found`);
              return Promise.resolve({
                  errors: [],
                  valid: true,
              });
          }
          return field.validate();
      };
  }

  /**
   * If the form is dirty or not
   */
  function useIsFormDirty() {
      const form = injectWithSelf(FormContextKey);
      if (!form) {
          warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
      }
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
      if (!form) {
          warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
      }
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
      if (!form) {
          warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
      }
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
      if (!form) {
          warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
      }
      return function validateField() {
          if (!form) {
              return Promise.resolve({ results: {}, errors: {}, valid: true });
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
          warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
      }
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
              return getFromPath(form === null || form === void 0 ? void 0 : form.values, vue.unref(path));
          }
          return vue.unref(field === null || field === void 0 ? void 0 : field.value);
      });
  }

  /**
   * Gives access to a form's values
   */
  function useFormValues() {
      const form = injectWithSelf(FormContextKey);
      if (!form) {
          warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
      }
      return vue.computed(() => {
          return (form === null || form === void 0 ? void 0 : form.values) || {};
      });
  }

  /**
   * Gives access to all form errors
   */
  function useFormErrors() {
      const form = injectWithSelf(FormContextKey);
      if (!form) {
          warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
      }
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
              return form === null || form === void 0 ? void 0 : form.errors.value[vue.unref(path)];
          }
          return field === null || field === void 0 ? void 0 : field.errorMessage.value;
      });
  }

  function useSubmitForm(cb) {
      const form = injectWithSelf(FormContextKey);
      if (!form) {
          warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
      }
      const onSubmit = form ? form.handleSubmit(cb) : undefined;
      return function submitForm(e) {
          if (!onSubmit) {
              return;
          }
          return onSubmit(e);
      };
  }

  exports.ErrorMessage = ErrorMessage;
  exports.Field = Field;
  exports.FieldArray = FieldArray;
  exports.FieldContextKey = FieldContextKey;
  exports.Form = Form;
  exports.FormContextKey = FormContextKey;
  exports.IS_ABSENT = IS_ABSENT;
  exports.configure = configure;
  exports.defineRule = defineRule;
  exports.useField = useField;
  exports.useFieldArray = useFieldArray;
  exports.useFieldError = useFieldError;
  exports.useFieldValue = useFieldValue;
  exports.useForm = useForm;
  exports.useFormErrors = useFormErrors;
  exports.useFormValues = useFormValues;
  exports.useIsFieldDirty = useIsFieldDirty;
  exports.useIsFieldTouched = useIsFieldTouched;
  exports.useIsFieldValid = useIsFieldValid;
  exports.useIsFormDirty = useIsFormDirty;
  exports.useIsFormTouched = useIsFormTouched;
  exports.useIsFormValid = useIsFormValid;
  exports.useIsSubmitting = useIsSubmitting;
  exports.useResetForm = useResetForm;
  exports.useSubmitCount = useSubmitCount;
  exports.useSubmitForm = useSubmitForm;
  exports.useValidateField = useValidateField;
  exports.useValidateForm = useValidateForm;
  exports.validate = validate;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
