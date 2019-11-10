/**
  * vee-validate v2.2.11
  * (c) 2019 Abdelrahman Awad
  * @license MIT
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.VeeValidate = factory());
}(this, function () { 'use strict';

  // 

  var isTextInput = function (el) {
    return includes(['text', 'password', 'search', 'email', 'tel', 'url', 'textarea', 'number'], el.type);
  };

  var isCheckboxOrRadioInput = function (el) {
    return includes(['radio', 'checkbox'], el.type);
  };

  var isDateInput = function (el) {
    return includes(['date', 'week', 'month', 'datetime-local', 'time'], el.type);
  };

  /**
   * Gets the data attribute. the name must be kebab-case.
   */
  var getDataAttribute = function (el, name) { return el.getAttribute(("data-vv-" + name)); };

  var isNaN = function (value) {
    if ('isNaN' in Number) {
      return Number.isNaN(value);
    }

    // eslint-disable-next-line
    return typeof(value) === 'number' && value !== value;
  };

  /**
   * Checks if the values are either null or undefined.
   */
  var isNullOrUndefined = function () {
    var values = [], len = arguments.length;
    while ( len-- ) values[ len ] = arguments[ len ];

    return values.every(function (value) {
      return value === null || value === undefined;
    });
  };

  /**
   * Creates the default flags object.
   */
  var createFlags = function () { return ({
    untouched: true,
    touched: false,
    dirty: false,
    pristine: true,
    valid: null,
    invalid: null,
    validated: false,
    pending: false,
    required: false,
    changed: false
  }); };

  /**
   * Shallow object comparison.
   */
  var isEqual = function (lhs, rhs) {
    if (lhs instanceof RegExp && rhs instanceof RegExp) {
      return isEqual(lhs.source, rhs.source) && isEqual(lhs.flags, rhs.flags);
    }

    if (Array.isArray(lhs) && Array.isArray(rhs)) {
      if (lhs.length !== rhs.length) { return false; }

      for (var i = 0; i < lhs.length; i++) {
        if (!isEqual(lhs[i], rhs[i])) {
          return false;
        }
      }

      return true;
    }

    // if both are objects, compare each key recursively.
    if (isObject(lhs) && isObject(rhs)) {
      return Object.keys(lhs).every(function (key) {
        return isEqual(lhs[key], rhs[key]);
      }) && Object.keys(rhs).every(function (key) {
        return isEqual(lhs[key], rhs[key]);
      });
    }

    if (isNaN(lhs) && isNaN(rhs)) {
      return true;
    }

    return lhs === rhs;
  };

  /**
   * Determines the input field scope.
   */
  var getScope = function (el) {
    var scope = getDataAttribute(el, 'scope');
    if (isNullOrUndefined(scope)) {
      var form = getForm(el);

      if (form) {
        scope = getDataAttribute(form, 'scope');
      }
    }

    return !isNullOrUndefined(scope) ? scope : null;
  };

  /**
   * Get the closest form element.
   */
  var getForm = function (el) {
    if (isNullOrUndefined(el)) { return null; }

    if (el.tagName === 'FORM') { return el; }

    if (!isNullOrUndefined(el.form)) { return el.form; }

    return !isNullOrUndefined(el.parentNode) ? getForm(el.parentNode) : null;
  };

  /**
   * Gets the value in an object safely.
   */
  var getPath = function (path, target, def) {
    if ( def === void 0 ) def = undefined;

    if (!path || !target) { return def; }

    var value = target;
    path.split('.').every(function (prop) {
      if (prop in value) {
        value = value[prop];

        return true;
      }

      value = def;

      return false;
    });

    return value;
  };

  /**
   * Checks if path exists within an object.
   */
  var hasPath = function (path, target) {
    var obj = target;
    var isValidPath = path.split('.').reduce(function (reducer, prop) {
      if (obj == null || typeof obj !== 'object') {
        return reducer && false;
      }

      if (prop in obj) {
        obj = obj[prop];

        return reducer && true;
      }

      return reducer && false;
    }, true);

    return isValidPath;
  };

  /**
   * Parses a rule string expression.
   */
  var parseRule = function (rule) {
    var params = [];
    var name = rule.split(':')[0];

    if (includes(rule, ':')) {
      params = rule.split(':').slice(1).join(':').split(',');
    }

    return { name: name, params: params };
  };

  /**
   * Debounces a function.
   */
  var debounce = function (fn, wait, token) {
    if ( wait === void 0 ) wait = 0;
    if ( token === void 0 ) token = { cancelled: false };

    if (wait === 0) {
      return fn;
    }

    var timeout;

    return function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var later = function () {
        timeout = null;

        // check if the fn call was cancelled.
        if (!token.cancelled) { fn.apply(void 0, args); }
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (!timeout) { fn.apply(void 0, args); }
    };
  };

  /**
   * Appends a rule definition to a list of rules.
   */
  var appendRule = function (rule, rules) {
    if (!rules) {
      return normalizeRules(rule);
    }

    if (!rule) {
      return normalizeRules(rules);
    }

    if (typeof rules === 'string') {
      rules = normalizeRules(rules);
    }

    return assign({}, rules, normalizeRules(rule));
  };

  /**
   * Normalizes the given rules expression.
   */
  var normalizeRules = function (rules) {
    // if falsy value return an empty object.
    if (!rules) {
      return {};
    }

    if (isObject(rules)) {
      // $FlowFixMe
      return Object.keys(rules).reduce(function (prev, curr) {
        var params = [];
        // $FlowFixMe
        if (rules[curr] === true) {
          params = [];
        } else if (Array.isArray(rules[curr])) {
          params = rules[curr];
        } else if (isObject(rules[curr])) {
          params = rules[curr];
        } else {
          params = [rules[curr]];
        }

        // $FlowFixMe
        if (rules[curr] !== false) {
          prev[curr] = params;
        }

        return prev;
      }, {});
    }

    if (typeof rules !== 'string') {
      warn('rules must be either a string or an object.');
      return {};
    }

    return rules.split('|').reduce(function (prev, rule) {
      var parsedRule = parseRule(rule);
      if (!parsedRule.name) {
        return prev;
      }

      prev[parsedRule.name] = parsedRule.params;
      return prev;
    }, {});
  };

  /**
   * Emits a warning to the console.
   */
  var warn = function (message) {
    console.warn(("[vee-validate] " + message)); // eslint-disable-line
  };

  /**
   * Creates a branded error object.
   */
  var createError = function (message) { return new Error(("[vee-validate] " + message)); };

  /**
   * Checks if the value is an object.
   */
  var isObject = function (obj) { return obj !== null && obj && typeof obj === 'object' && ! Array.isArray(obj); };

  /**
   * Checks if a function is callable.
   */
  var isCallable = function (func) { return typeof func === 'function'; };

  /**
   * Check if element has the css class on it.
   */
  var hasClass = function (el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    }

    return !!el.className.match(new RegExp(("(\\s|^)" + className + "(\\s|$)")));
  };

  /**
   * Adds the provided css className to the element.
   */
  var addClass = function (el, className) {
    if (el.classList) {
      el.classList.add(className);
      return;
    }

    if (!hasClass(el, className)) {
      el.className += " " + className;
    }
  };

  /**
   * Remove the provided css className from the element.
   */
  var removeClass = function (el, className) {
    if (el.classList) {
      el.classList.remove(className);
      return;
    }

    if (hasClass(el, className)) {
      var reg = new RegExp(("(\\s|^)" + className + "(\\s|$)"));
      el.className = el.className.replace(reg, ' ');
    }
  };

  /**
   * Adds or removes a class name on the input depending on the status flag.
   */
  var toggleClass = function (el, className, status) {
    if (!el || !className) { return; }

    if (Array.isArray(className)) {
      className.forEach(function (item) { return toggleClass(el, item, status); });
      return;
    }

    if (status) {
      return addClass(el, className);
    }

    removeClass(el, className);
  };

  /**
   * Converts an array-like object to array, provides a simple polyfill for Array.from
   */
  var toArray = function (arrayLike) {
    if (isCallable(Array.from)) {
      return Array.from(arrayLike);
    }

    var array = [];
    var length = arrayLike.length;
    /* istanbul ignore next */
    for (var i = 0; i < length; i++) {
      array.push(arrayLike[i]);
    }

    /* istanbul ignore next */
    return array;
  };

  /**
   * Assign polyfill from the mdn.
   */
  var assign = function (target) {
    var others = [], len = arguments.length - 1;
    while ( len-- > 0 ) others[ len ] = arguments[ len + 1 ];

    /* istanbul ignore else */
    if (isCallable(Object.assign)) {
      return Object.assign.apply(Object, [ target ].concat( others ));
    }

    /* istanbul ignore next */
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    /* istanbul ignore next */
    var to = Object(target);
    /* istanbul ignore next */
    others.forEach(function (arg) {
      // Skip over if undefined or null
      if (arg != null) {
        Object.keys(arg).forEach(function (key) {
          to[key] = arg[key];
        });
      }
    });
    /* istanbul ignore next */
    return to;
  };

  var id = 0;
  var idTemplate = '{id}';

  /**
   * Generates a unique id.
   */
  var uniqId = function () {
    // handle too many uses of uniqId, although unlikely.
    if (id >= 9999) {
      id = 0;
      // shift the template.
      idTemplate = idTemplate.replace('{id}', '_{id}');
    }

    id++;
    var newId = idTemplate.replace('{id}', String(id));

    return newId;
  };

  var findIndex = function (arrayLike, predicate) {
    var array = Array.isArray(arrayLike) ? arrayLike : toArray(arrayLike);
    for (var i = 0; i < array.length; i++) {
      if (predicate(array[i])) {
        return i;
      }
    }

    return -1;
  };

  /**
   * finds the first element that satisfies the predicate callback, polyfills array.find
   */
  var find = function (arrayLike, predicate) {
    var array = Array.isArray(arrayLike) ? arrayLike : toArray(arrayLike);
    var idx = findIndex(array, predicate);

    return idx === -1 ? undefined : array[idx];
  };

  var isBuiltInComponent = function (vnode) {
    if (!vnode) {
      return false;
    }

    var tag = vnode.componentOptions.tag;

    return /^(keep-alive|transition|transition-group)$/.test(tag);
  };

  var makeDelayObject = function (events, delay, delayConfig) {
    if (typeof delay === 'number') {
      return events.reduce(function (prev, e) {
        prev[e] = delay;
        return prev;
      }, {});
    }

    return events.reduce(function (prev, e) {
      if (typeof delay === 'object' && e in delay) {
        prev[e] = delay[e];
        return prev;
      }

      if (typeof delayConfig === 'number') {
        prev[e] = delayConfig;
        return prev;
      }

      prev[e] = (delayConfig && delayConfig[e]) || 0;

      return prev;
    }, {});
  };

  var deepParseInt = function (input) {
    if (typeof input === 'number') { return input; }

    if (typeof input === 'string') { return parseInt(input); }

    var map = {};
    for (var element in input) {
      map[element] = parseInt(input[element]);
    }

    return map;
  };

  var merge = function (target, source) {
    if (! (isObject(target) && isObject(source))) {
      return target;
    }

    Object.keys(source).forEach(function (key) {
      var obj, obj$1;

      if (isObject(source[key])) {
        if (! target[key]) {
          assign(target, ( obj = {}, obj[key] = {}, obj ));
        }

        merge(target[key], source[key]);
        return;
      }

      assign(target, ( obj$1 = {}, obj$1[key] = source[key], obj$1 ));
    });

    return target;
  };

  var fillRulesFromElement = function (el, rules) {
    if (el.required) {
      rules = appendRule('required', rules);
    }

    if (isTextInput(el)) {
      if (el.type === 'email') {
        rules = appendRule(("email" + (el.multiple ? ':multiple' : '')), rules);
      }

      if (el.pattern) {
        rules = appendRule({ regex: el.pattern }, rules);
      }

      // 524288 is the max on some browsers and test environments.
      if (el.maxLength >= 0 && el.maxLength < 524288) {
        rules = appendRule(("max:" + (el.maxLength)), rules);
      }

      if (el.minLength > 0) {
        rules = appendRule(("min:" + (el.minLength)), rules);
      }

      if (el.type === 'number') {
        rules = appendRule('decimal', rules);
        if (el.min !== '') {
          rules = appendRule(("min_value:" + (el.min)), rules);
        }

        if (el.max !== '') {
          rules = appendRule(("max_value:" + (el.max)), rules);
        }
      }

      return rules;
    }

    if (isDateInput(el)) {
      var timeFormat = el.step && Number(el.step) < 60 ? 'HH:mm:ss' : 'HH:mm';

      if (el.type === 'date') {
        return appendRule('date_format:yyyy-MM-dd', rules);
      }

      if (el.type === 'datetime-local') {
        return appendRule(("date_format:yyyy-MM-ddT" + timeFormat), rules);
      }

      if (el.type === 'month') {
        return appendRule('date_format:yyyy-MM', rules);
      }

      if (el.type === 'week') {
        return appendRule('date_format:yyyy-[W]WW', rules);
      }

      if (el.type === 'time') {
        return appendRule(("date_format:" + timeFormat), rules);
      }
    }

    return rules;
  };

  var values = function (obj) {
    if (isCallable(Object.values)) {
      return Object.values(obj);
    }

    // fallback to keys()
    /* istanbul ignore next */
    return Object.keys(obj).map(function (k) { return obj[k]; });
  };

  var parseSelector = function (selector) {
    var rule = null;
    if (includes(selector, ':')) {
      rule = selector.split(':').pop();
      selector = selector.replace((":" + rule), '');
    }

    if (selector[0] === '#') {
      return {
        id: selector.slice(1),
        rule: rule,
        name: null,
        scope: null
      };
    }

    var scope = null;
    var name = selector;
    if (includes(selector, '.')) {
      var parts = selector.split('.');
      scope = parts[0];
      name = parts.slice(1).join('.');
    }

    return {
      id: null,
      scope: scope,
      name: name,
      rule: rule
    };
  };

  var includes = function (collection, item) {
    return collection.indexOf(item) !== -1;
  };

  var isEmptyArray = function (arr) {
    return Array.isArray(arr) && arr.length === 0;
  };

  var defineNonReactive = function (obj, prop, value) {
    Object.defineProperty(obj, prop, {
      configurable: false,
      writable: true,
      value: value
    });
  };

  // 

  var LOCALE = 'en';

  var Dictionary = function Dictionary (dictionary) {
    if ( dictionary === void 0 ) dictionary = {};

    this.container = {};
    this.merge(dictionary);
  };

  var prototypeAccessors = { locale: { configurable: true } };

  prototypeAccessors.locale.get = function () {
    return LOCALE;
  };

  prototypeAccessors.locale.set = function (value) {
    LOCALE = value || 'en';
  };

  Dictionary.prototype.hasLocale = function hasLocale (locale) {
    return !!this.container[locale];
  };

  Dictionary.prototype.setDateFormat = function setDateFormat (locale, format) {
    if (!this.container[locale]) {
      this.container[locale] = {};
    }

    this.container[locale].dateFormat = format;
  };

  Dictionary.prototype.getDateFormat = function getDateFormat (locale) {
    if (!this.container[locale] || !this.container[locale].dateFormat) {
      return null;
    }

    return this.container[locale].dateFormat;
  };

  Dictionary.prototype.getMessage = function getMessage (locale, key, data) {
    var message = null;
    if (!this.hasMessage(locale, key)) {
      message = this._getDefaultMessage(locale);
    } else {
      message = this.container[locale].messages[key];
    }

    return isCallable(message) ? message.apply(void 0, data) : message;
  };

  /**
   * Gets a specific message for field. falls back to the rule message.
   */
  Dictionary.prototype.getFieldMessage = function getFieldMessage (locale, field, key, data) {
    if (!this.hasLocale(locale)) {
      return this.getMessage(locale, key, data);
    }

    var dict = this.container[locale].custom && this.container[locale].custom[field];
    if (!dict || !dict[key]) {
      return this.getMessage(locale, key, data);
    }

    var message = dict[key];
    return isCallable(message) ? message.apply(void 0, data) : message;
  };

  Dictionary.prototype._getDefaultMessage = function _getDefaultMessage (locale) {
    if (this.hasMessage(locale, '_default')) {
      return this.container[locale].messages._default;
    }

    return this.container.en.messages._default;
  };

  Dictionary.prototype.getAttribute = function getAttribute (locale, key, fallback) {
      if ( fallback === void 0 ) fallback = '';

    if (!this.hasAttribute(locale, key)) {
      return fallback;
    }

    return this.container[locale].attributes[key];
  };

  Dictionary.prototype.hasMessage = function hasMessage (locale, key) {
    return !! (
      this.hasLocale(locale) &&
            this.container[locale].messages &&
            this.container[locale].messages[key]
    );
  };

  Dictionary.prototype.hasAttribute = function hasAttribute (locale, key) {
    return !! (
      this.hasLocale(locale) &&
            this.container[locale].attributes &&
            this.container[locale].attributes[key]
    );
  };

  Dictionary.prototype.merge = function merge$1 (dictionary) {
    merge(this.container, dictionary);
  };

  Dictionary.prototype.setMessage = function setMessage (locale, key, message) {
    if (! this.hasLocale(locale)) {
      this.container[locale] = {
        messages: {},
        attributes: {}
      };
    }
      
    if (!this.container[locale].messages) {
      this.container[locale].messages = {};
    }

    this.container[locale].messages[key] = message;
  };

  Dictionary.prototype.setAttribute = function setAttribute (locale, key, attribute) {
    if (! this.hasLocale(locale)) {
      this.container[locale] = {
        messages: {},
        attributes: {}
      };
    }

    this.container[locale].attributes[key] = attribute;
  };

  Object.defineProperties( Dictionary.prototype, prototypeAccessors );

  var drivers = {
    default: new Dictionary({
      en: {
        messages: {},
        attributes: {},
        custom: {}
      }
    })
  };

  var currentDriver = 'default';

  var DictionaryResolver = function DictionaryResolver () {};

  DictionaryResolver._checkDriverName = function _checkDriverName (driver) {
    if (!driver) {
      throw createError('you must provide a name to the dictionary driver');
    }
  };

  DictionaryResolver.setDriver = function setDriver (driver, implementation) {
      if ( implementation === void 0 ) implementation = null;

    this._checkDriverName(driver);
    if (implementation) {
      drivers[driver] = implementation;
    }

    currentDriver = driver;
  };

  DictionaryResolver.getDriver = function getDriver () {
    return drivers[currentDriver];
  };

  // 

  var ErrorBag = function ErrorBag (errorBag, id) {
    if ( errorBag === void 0 ) errorBag = null;
    if ( id === void 0 ) id = null;

    this.vmId = id || null;
    // make this bag a mirror of the provided one, sharing the same items reference.
    if (errorBag && errorBag instanceof ErrorBag) {
      this.items = errorBag.items;
    } else {
      this.items = [];
    }
  };

  ErrorBag.prototype[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'] = function () {
      var this$1 = this;

    var index = 0;
    return {
      next: function () {
        return { value: this$1.items[index++], done: index > this$1.items.length };
      }
    };
  };

  /**
   * Adds an error to the internal array.
   */
  ErrorBag.prototype.add = function add (error) {
      var ref;

    (ref = this.items).push.apply(
      ref, this._normalizeError(error)
    );
  };

  /**
   * Normalizes passed errors to an error array.
   */
  ErrorBag.prototype._normalizeError = function _normalizeError (error) {
      var this$1 = this;

    if (Array.isArray(error)) {
      return error.map(function (e) {
        e.scope = !isNullOrUndefined(e.scope) ? e.scope : null;
        e.vmId = !isNullOrUndefined(e.vmId) ? e.vmId : (this$1.vmId || null);

        return e;
      });
    }

    error.scope = !isNullOrUndefined(error.scope) ? error.scope : null;
    error.vmId = !isNullOrUndefined(error.vmId) ? error.vmId : (this.vmId || null);

    return [error];
  };

  /**
   * Regenrates error messages if they have a generator function.
   */
  ErrorBag.prototype.regenerate = function regenerate () {
    this.items.forEach(function (i) {
      i.msg = isCallable(i.regenerate) ? i.regenerate() : i.msg;
    });
  };

  /**
   * Updates a field error with the new field scope.
   */
  ErrorBag.prototype.update = function update (id, error) {
    var item = find(this.items, function (i) { return i.id === id; });
    if (!item) {
      return;
    }

    var idx = this.items.indexOf(item);
    this.items.splice(idx, 1);
    item.scope = error.scope;
    this.items.push(item);
  };

  /**
   * Gets all error messages from the internal array.
   */
  ErrorBag.prototype.all = function all (scope) {
      var this$1 = this;

    var filterFn = function (item) {
      var matchesScope = true;
      var matchesVM = true;
      if (!isNullOrUndefined(scope)) {
        matchesScope = item.scope === scope;
      }

      if (!isNullOrUndefined(this$1.vmId)) {
        matchesVM = item.vmId === this$1.vmId;
      }

      return matchesVM && matchesScope;
    };

    return this.items.filter(filterFn).map(function (e) { return e.msg; });
  };

  /**
   * Checks if there are any errors in the internal array.
   */
  ErrorBag.prototype.any = function any (scope) {
      var this$1 = this;

    var filterFn = function (item) {
      var matchesScope = true;
      var matchesVM = true;
      if (!isNullOrUndefined(scope)) {
        matchesScope = item.scope === scope;
      }

      if (!isNullOrUndefined(this$1.vmId)) {
        matchesVM = item.vmId === this$1.vmId;
      }

      return matchesVM && matchesScope;
    };

    return !!this.items.filter(filterFn).length;
  };

  /**
   * Removes all items from the internal array.
   */
  ErrorBag.prototype.clear = function clear (scope) {
      var this$1 = this;

    var matchesVM = isNullOrUndefined(this.vmId) ? function () { return true; } : function (i) { return i.vmId === this$1.vmId; };
    if (isNullOrUndefined(scope)) {
      scope = null;
    }

    for (var i = 0; i < this.items.length; ++i) {
      if (matchesVM(this.items[i]) && this.items[i].scope === scope) {
        this.items.splice(i, 1);
        --i;
      }
    }
  };

  /**
   * Collects errors into groups or for a specific field.
   */
  ErrorBag.prototype.collect = function collect (field, scope, map) {
      var this$1 = this;
      if ( map === void 0 ) map = true;

    var isSingleField = !isNullOrUndefined(field) && !field.includes('*');
    var groupErrors = function (items) {
      var errors = items.reduce(function (collection, error) {
        if (!isNullOrUndefined(this$1.vmId) && error.vmId !== this$1.vmId) {
          return collection;
        }

        if (!collection[error.field]) {
          collection[error.field] = [];
        }

        collection[error.field].push(map ? error.msg : error);

        return collection;
      }, {});

      // reduce the collection to be a single array.
      if (isSingleField) {
        return values(errors)[0] || [];
      }

      return errors;
    };

    if (isNullOrUndefined(field)) {
      return groupErrors(this.items);
    }

    var selector = isNullOrUndefined(scope) ? String(field) : (scope + "." + field);
    var ref = this._makeCandidateFilters(selector);
      var isPrimary = ref.isPrimary;
      var isAlt = ref.isAlt;

    var collected = this.items.reduce(function (prev, curr) {
      if (isPrimary(curr)) {
        prev.primary.push(curr);
      }

      if (isAlt(curr)) {
        prev.alt.push(curr);
      }

      return prev;
    }, { primary: [], alt: [] });

    collected = collected.primary.length ? collected.primary : collected.alt;

    return groupErrors(collected);
  };

  /**
   * Gets the internal array length.
   */
  ErrorBag.prototype.count = function count () {
      var this$1 = this;

    if (this.vmId) {
      return this.items.filter(function (e) { return e.vmId === this$1.vmId; }).length;
    }

    return this.items.length;
  };

  /**
   * Finds and fetches the first error message for the specified field id.
   */
  ErrorBag.prototype.firstById = function firstById (id) {
    var error = find(this.items, function (i) { return i.id === id; });

    return error ? error.msg : undefined;
  };

  /**
   * Gets the first error message for a specific field.
   */
  ErrorBag.prototype.first = function first (field, scope) {
      if ( scope === void 0 ) scope = null;

    var selector = isNullOrUndefined(scope) ? field : (scope + "." + field);
    var match = this._match(selector);

    return match && match.msg;
  };

  /**
   * Returns the first error rule for the specified field
   */
  ErrorBag.prototype.firstRule = function firstRule (field, scope) {
    var errors = this.collect(field, scope, false);

    return (errors.length && errors[0].rule) || undefined;
  };

  /**
   * Checks if the internal array has at least one error for the specified field.
   */
  ErrorBag.prototype.has = function has (field, scope) {
      if ( scope === void 0 ) scope = null;

    return !!this.first(field, scope);
  };

  /**
   * Gets the first error message for a specific field and a rule.
   */
  ErrorBag.prototype.firstByRule = function firstByRule (name, rule, scope) {
      if ( scope === void 0 ) scope = null;

    var error = this.collect(name, scope, false).filter(function (e) { return e.rule === rule; })[0];

    return (error && error.msg) || undefined;
  };

  /**
   * Gets the first error message for a specific field that not match the rule.
   */
  ErrorBag.prototype.firstNot = function firstNot (name, rule, scope) {
      if ( rule === void 0 ) rule = 'required';
      if ( scope === void 0 ) scope = null;

    var error = this.collect(name, scope, false).filter(function (e) { return e.rule !== rule; })[0];

    return (error && error.msg) || undefined;
  };

  /**
   * Removes errors by matching against the id or ids.
   */
  ErrorBag.prototype.removeById = function removeById (id) {
    var condition = function (item) { return item.id === id; };
    if (Array.isArray(id)) {
      condition = function (item) { return id.indexOf(item.id) !== -1; };
    }

    for (var i = 0; i < this.items.length; ++i) {
      if (condition(this.items[i])) {
        this.items.splice(i, 1);
        --i;
      }
    }
  };

  /**
   * Removes all error messages associated with a specific field.
   */
  ErrorBag.prototype.remove = function remove (field, scope, vmId) {
    if (isNullOrUndefined(field)) {
      return;
    }

    var selector = isNullOrUndefined(scope) ? String(field) : (scope + "." + field);
    var ref = this._makeCandidateFilters(selector);
      var isPrimary = ref.isPrimary;
      var isAlt = ref.isAlt;
    var matches = function (item) { return isPrimary(item) || isAlt(item); };
    var shouldRemove = function (item) {
      if (isNullOrUndefined(vmId)) { return matches(item); }

      return matches(item) && item.vmId === vmId;
    };

    for (var i = 0; i < this.items.length; ++i) {
      if (shouldRemove(this.items[i])) {
        this.items.splice(i, 1);
        --i;
      }
    }
  };

  ErrorBag.prototype._makeCandidateFilters = function _makeCandidateFilters (selector) {
      var this$1 = this;

    var matchesRule = function () { return true; };
    var matchesScope = function () { return true; };
    var matchesName = function () { return true; };
    var matchesVM = function () { return true; };

    var ref = parseSelector(selector);
      var id = ref.id;
      var rule = ref.rule;
      var scope = ref.scope;
      var name = ref.name;

    if (rule) {
      matchesRule = function (item) { return item.rule === rule; };
    }

    // match by id, can be combined with rule selection.
    if (id) {
      return {
        isPrimary: function (item) { return matchesRule(item) && (function (item) { return id === item.id; }); },
        isAlt: function () { return false; }
      };
    }

    if (isNullOrUndefined(scope)) {
      // if no scope specified, make sure the found error has no scope.
      matchesScope = function (item) { return isNullOrUndefined(item.scope); };
    } else {
      matchesScope = function (item) { return item.scope === scope; };
    }

    if (!isNullOrUndefined(name) && name !== '*') {
      matchesName = function (item) { return item.field === name; };
    }

    if (!isNullOrUndefined(this.vmId)) {
      matchesVM = function (item) { return item.vmId === this$1.vmId; };
    }

    // matches the first candidate.
    var isPrimary = function (item) {
      return matchesVM(item) && matchesName(item) && matchesRule(item) && matchesScope(item);
    };

    // matches a second candidate, which is a field with a name containing the '.' character.
    var isAlt = function (item) {
      return matchesVM(item) && matchesRule(item) && item.field === (scope + "." + name);
    };

    return {
      isPrimary: isPrimary,
      isAlt: isAlt
    };
  };

  ErrorBag.prototype._match = function _match (selector) {
    if (isNullOrUndefined(selector)) {
      return undefined;
    }

    var ref = this._makeCandidateFilters(selector);
      var isPrimary = ref.isPrimary;
      var isAlt = ref.isAlt;

    return this.items.reduce(function (prev, item, idx, arr) {
      var isLast = idx === arr.length - 1;
      if (prev.primary) {
        return isLast ? prev.primary : prev;
      }

      if (isPrimary(item)) {
        prev.primary = item;
      }

      if (isAlt(item)) {
        prev.alt = item;
      }

      // keep going.
      if (!isLast) {
        return prev;
      }

      return prev.primary || prev.alt;
    }, {});
  };

  var DEFAULT_CONFIG = {
    locale: 'en',
    delay: 0,
    errorBagName: 'errors',
    dictionary: null,
    fieldsBagName: 'fields',
    classes: false,
    classNames: null,
    events: 'input',
    inject: true,
    fastExit: true,
    aria: true,
    validity: false,
    mode: 'aggressive',
    useConstraintAttrs: true,
    i18n: null,
    i18nRootKey: 'validation'
  };

  var currentConfig = assign({}, DEFAULT_CONFIG);

  var resolveConfig = function (ctx) {
    var selfConfig = getPath('$options.$_veeValidate', ctx, {});

    return assign({}, currentConfig, selfConfig);
  };

  var getConfig = function () { return currentConfig; };

  var setConfig = function (newConf) {
    currentConfig = assign({}, currentConfig, newConf);
  };

  // VNode Utils

  // Gets the model object on the vnode.
  function findModel (vnode) {
    if (!vnode.data) {
      return null;
    }

    // Component Model
    if (vnode.data.model) {
      return vnode.data.model;
    }

    return !!(vnode.data.directives) && find(vnode.data.directives, function (d) { return d.name === 'model'; });
  }

  function extractChildren (vnode) {
    if (Array.isArray(vnode)) {
      return vnode;
    }

    if (Array.isArray(vnode.children)) {
      return vnode.children;
    }

    if (vnode.componentOptions && Array.isArray(vnode.componentOptions.children)) {
      return vnode.componentOptions.children;
    }

    return [];
  }

  function extractVNodes (vnode) {
    if (findModel(vnode)) {
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
  function findModelConfig (vnode) {
    if (!vnode.componentOptions) { return null; }

    return vnode.componentOptions.Ctor.options.model;
  }
  // Adds a listener to vnode listener object.
  function mergeVNodeListeners (obj, eventName, handler) {
    // Has a single listener.
    if (isCallable(obj[eventName])) {
      var prevHandler = obj[eventName];
      obj[eventName] = [prevHandler];
    }

    // has other listeners.
    if (Array.isArray(obj[eventName])) {
      obj[eventName].push(handler);
      return;
    }

    // no listener at all.
    if (isNullOrUndefined(obj[eventName])) {
      obj[eventName] = [handler];
    }
  }

  // Adds a listener to a native HTML vnode.
  function addNativeNodeListener (node, eventName, handler) {
    if (isNullOrUndefined(node.data.on)) {
      node.data.on = {};
    }

    mergeVNodeListeners(node.data.on, eventName, handler);
  }

  // Adds a listener to a Vue component vnode.
  function addComponentNodeListener (node, eventName, handler) {
    /* istanbul ignore next */
    if (!node.componentOptions.listeners) {
      node.componentOptions.listeners = {};
    }

    mergeVNodeListeners(node.componentOptions.listeners, eventName, handler);
  }
  function addVNodeListener (vnode, eventName, handler) {
    if (vnode.componentOptions) {
      addComponentNodeListener(vnode, eventName, handler);
      return;
    }

    addNativeNodeListener(vnode, eventName, handler);
  }
  // Determines if `change` should be used over `input` for listeners.
  function getInputEventName (vnode, model) {
    // Is a component.
    if (vnode.componentOptions) {
      var ref = findModelConfig(vnode) || { event: 'input' };
      var event = ref.event;

      return event;
    }

    // Lazy Models and select tag typically use change event
    if ((model && model.modifiers && model.modifiers.lazy) || vnode.tag === 'select') {
      return 'change';
    }

    // is a textual-type input.
    if (vnode.data.attrs && isTextInput({ type: vnode.data.attrs.type || 'text' })) {
      return 'input';
    }

    return 'change';
  }

  function normalizeSlots (slots, ctx) {
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
    }, []);
  }
  function createRenderless (h, children) {
    // Only render the first item of the node.
    if (Array.isArray(children) && children[0]) {
      return children[0];
    }

    // a single node.
    if (children) {
      return children;
    }

    // No slots, render nothing.
    return h();
  }

  /**
   * Generates the options required to construct a field.
   */
  var Resolver = function Resolver () {};

  Resolver.generate = function generate (el, binding, vnode) {
    var model = Resolver.resolveModel(binding, vnode);
    var options = resolveConfig(vnode.context);

    return {
      name: Resolver.resolveName(el, vnode),
      el: el,
      listen: !binding.modifiers.disable,
      bails: binding.modifiers.bails ? true : (binding.modifiers.continues === true ? false : undefined),
      scope: Resolver.resolveScope(el, binding, vnode),
      vm: vnode.context,
      expression: binding.value,
      component: vnode.componentInstance,
      classes: options.classes,
      classNames: options.classNames,
      getter: Resolver.resolveGetter(el, vnode, model),
      events: Resolver.resolveEvents(el, vnode) || options.events,
      model: model,
      delay: Resolver.resolveDelay(el, vnode, options),
      rules: Resolver.resolveRules(el, binding, vnode),
      immediate: !!binding.modifiers.initial || !!binding.modifiers.immediate,
      persist: !!binding.modifiers.persist,
      validity: options.validity && !vnode.componentInstance,
      aria: options.aria && !vnode.componentInstance,
      initialValue: Resolver.resolveInitialValue(vnode)
    };
  };

  Resolver.getCtorConfig = function getCtorConfig (vnode) {
    if (!vnode.componentInstance) { return null; }

    var config = getPath('componentInstance.$options.$_veeValidate', vnode);

    return config;
  };

  /**
   * Resolves the rules defined on an element.
   */
  Resolver.resolveRules = function resolveRules (el, binding, vnode) {
    var rules = '';
    if (!binding.value && (!binding || !binding.expression)) {
      rules = getDataAttribute(el, 'rules');
    }

    if (binding.value && includes(['string', 'object'], typeof binding.value.rules)) {
      rules = binding.value.rules;
    } else if (binding.value) {
      rules = binding.value;
    }

    if (vnode.componentInstance) {
      return rules;
    }

    // If validity is disabled, ignore field rules.
    var normalized = normalizeRules(rules);
    if (!getConfig().useConstraintAttrs) {
      return normalized;
    }

    return assign({}, fillRulesFromElement(el, {}), normalized);
  };

  /**
   * @param {*} vnode
   */
  Resolver.resolveInitialValue = function resolveInitialValue (vnode) {
    var model = vnode.data.model || find(vnode.data.directives, function (d) { return d.name === 'model'; });

    return model && model.value;
  };

  /**
   * Resolves the delay value.
   * @param {*} el
   * @param {*} vnode
   * @param {Object} options
   */
  Resolver.resolveDelay = function resolveDelay (el, vnode, options) {
    var delay = getDataAttribute(el, 'delay');
    var globalDelay = (options && 'delay' in options) ? options.delay : 0;

    if (!delay && vnode.componentInstance && vnode.componentInstance.$attrs) {
      delay = vnode.componentInstance.$attrs['data-vv-delay'];
    }

    if (!isObject(globalDelay)) {
      return deepParseInt(delay || globalDelay);
    }

    if (!isNullOrUndefined(delay)) {
      globalDelay.input = delay;
    }

    return deepParseInt(globalDelay);
  };

  /**
   * Resolves the events to validate in response to.
   * @param {*} el
   * @param {*} vnode
   */
  Resolver.resolveEvents = function resolveEvents (el, vnode) {
    // resolve it from the root element.
    var events = getDataAttribute(el, 'validate-on');

    // resolve from data-vv-validate-on if its a vue component.
    if (!events && vnode.componentInstance && vnode.componentInstance.$attrs) {
      events = vnode.componentInstance.$attrs['data-vv-validate-on'];
    }

    // resolve it from $_veeValidate options.
    if (!events && vnode.componentInstance) {
      var config = Resolver.getCtorConfig(vnode);
      events = config && config.events;
    }

    if (!events && getConfig().events) {
      events = getConfig().events;
    }

    // resolve the model event if its configured for custom components.
    if (events && vnode.componentInstance && includes(events, 'input')) {
      var ref = vnode.componentInstance.$options.model || { event: 'input' };
        var event = ref.event;
      // if the prop was configured but not the model.
      if (!event) {
        return events;
      }

      events = events.replace('input', event);
    }

    return events;
  };

  /**
   * Resolves the scope for the field.
   * @param {*} el
   * @param {*} binding
   */
  Resolver.resolveScope = function resolveScope (el, binding, vnode) {
      if ( vnode === void 0 ) vnode = {};

    var scope = null;
    if (vnode.componentInstance && isNullOrUndefined(scope)) {
      scope = vnode.componentInstance.$attrs && vnode.componentInstance.$attrs['data-vv-scope'];
    }

    return !isNullOrUndefined(scope) ? scope : getScope(el);
  };

  /**
   * Checks if the node directives contains a v-model or a specified arg.
   * Args take priority over models.
   *
   * @return {Object}
   */
  Resolver.resolveModel = function resolveModel (binding, vnode) {
    if (binding.arg) {
      return { expression: binding.arg };
    }

    var model = findModel(vnode);
    if (!model) {
      return null;
    }

    // https://github.com/vuejs/vue/blob/dev/src/core/util/lang.js#L26
    var watchable = !/[^\w.$]/.test(model.expression) && hasPath(model.expression, vnode.context);
    var lazy = !!(model.modifiers && model.modifiers.lazy);

    if (!watchable) {
      return { expression: null, lazy: lazy };
    }

    return { expression: model.expression, lazy: lazy };
  };

  /**
   * Resolves the field name to trigger validations.
   * @return {String} The field name.
   */
  Resolver.resolveName = function resolveName (el, vnode) {
    var name = getDataAttribute(el, 'name');

    if (!name && !vnode.componentInstance) {
      return el.name;
    }

    if (!name && vnode.componentInstance && vnode.componentInstance.$attrs) {
      name = vnode.componentInstance.$attrs['data-vv-name'] || vnode.componentInstance.$attrs['name'];
    }

    if (!name && vnode.componentInstance) {
      var config = Resolver.getCtorConfig(vnode);
      if (config && isCallable(config.name)) {
        var boundGetter = config.name.bind(vnode.componentInstance);

        return boundGetter();
      }

      return vnode.componentInstance.name;
    }

    return name;
  };

  /**
   * Returns a value getter input type.
   */
  Resolver.resolveGetter = function resolveGetter (el, vnode, model) {
    if (model && model.expression) {
      return function () {
        return getPath(model.expression, vnode.context);
      };
    }

    if (vnode.componentInstance) {
      var path = getDataAttribute(el, 'value-path') || (vnode.componentInstance.$attrs && vnode.componentInstance.$attrs['data-vv-value-path']);
      if (path) {
        return function () {
          return getPath(path, vnode.componentInstance);
        };
      }

      var config = Resolver.getCtorConfig(vnode);
      if (config && isCallable(config.value)) {
        var boundGetter = config.value.bind(vnode.componentInstance);

        return function () {
          return boundGetter();
        };
      }

      var ref = vnode.componentInstance.$options.model || { prop: 'value' };
        var prop = ref.prop;

      return function () {
        return vnode.componentInstance[prop];
      };
    }

    switch (el.type) {
    case 'checkbox': return function () {
      var els = document.querySelectorAll(("input[name=\"" + (el.name) + "\"]"));

      els = toArray(els).filter(function (el) { return el.checked; });
      if (!els.length) { return undefined; }

      return els.map(function (checkbox) { return checkbox.value; });
    };
    case 'radio': return function () {
      var els = document.querySelectorAll(("input[name=\"" + (el.name) + "\"]"));
      var elm = find(els, function (el) { return el.checked; });

      return elm && elm.value;
    };
    case 'file': return function (context) {
      return toArray(el.files);
    };
    case 'select-multiple': return function () {
      return toArray(el.options).filter(function (opt) { return opt.selected; }).map(function (opt) { return opt.value; });
    };
    default: return function () {
      return el && el.value;
    };
    }
  };

  var RULES = {};

  var RuleContainer = function RuleContainer () {};

  var staticAccessors = { rules: { configurable: true } };

  RuleContainer.add = function add (name, ref) {
      var validate = ref.validate;
      var options = ref.options;
      var paramNames = ref.paramNames;

    RULES[name] = {
      validate: validate,
      options: options,
      paramNames: paramNames
    };
  };

  staticAccessors.rules.get = function () {
    return RULES;
  };

  RuleContainer.has = function has (name) {
    return !!RULES[name];
  };

  RuleContainer.isImmediate = function isImmediate (name) {
    return !!(RULES[name] && RULES[name].options.immediate);
  };

  RuleContainer.isRequireRule = function isRequireRule (name) {
    return !!(RULES[name] && RULES[name].options.computesRequired);
  };

  RuleContainer.isTargetRule = function isTargetRule (name) {
    return !!(RULES[name] && RULES[name].options.hasTarget);
  };

  RuleContainer.remove = function remove (ruleName) {
    delete RULES[ruleName];
  };

  RuleContainer.getParamNames = function getParamNames (ruleName) {
    return RULES[ruleName] && RULES[ruleName].paramNames;
  };

  RuleContainer.getOptions = function getOptions (ruleName) {
    return RULES[ruleName] && RULES[ruleName].options;
  };

  RuleContainer.getValidatorMethod = function getValidatorMethod (ruleName) {
    return RULES[ruleName] ? RULES[ruleName].validate : null;
  };

  Object.defineProperties( RuleContainer, staticAccessors );

  // 

  var isEvent = function (evt) {
    return (typeof Event !== 'undefined' && isCallable(Event) && evt instanceof Event) || (evt && evt.srcElement);
  };

  var normalizeEvents = function (evts) {
    if (!evts) { return []; }

    return (typeof evts === 'string' ? evts.split('|') : evts);
  };

  var supportsPassive = true;

  var detectPassiveSupport = function () {
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function get () {
          supportsPassive = true;
        }
      });
      window.addEventListener('testPassive', null, opts);
      window.removeEventListener('testPassive', null, opts);
    } catch (e) {
      supportsPassive = false;
    }
    return supportsPassive;
  };

  var addEventListener = function (el, eventName, cb) {
    el.addEventListener(eventName, cb, supportsPassive ? { passive: true } : false);
  };

  // 

  var DEFAULT_OPTIONS = {
    targetOf: null,
    immediate: false,
    persist: false,
    scope: null,
    listen: true,
    name: null,
    rules: {},
    vm: null,
    classes: false,
    validity: true,
    aria: true,
    events: 'input|blur',
    delay: 0,
    classNames: {
      touched: 'touched', // the control has been blurred
      untouched: 'untouched', // the control hasn't been blurred
      valid: 'valid', // model is valid
      invalid: 'invalid', // model is invalid
      pristine: 'pristine', // control has not been interacted with
      dirty: 'dirty' // control has been interacted with
    }
  };

  var Field = function Field (options) {
    if ( options === void 0 ) options = {};

    this.id = uniqId();
    this.el = options.el;
    this.updated = false;
    this.vmId = options.vmId;
    defineNonReactive(this, 'dependencies', []);
    defineNonReactive(this, 'watchers', []);
    defineNonReactive(this, 'events', []);
    this.delay = 0;
    this.rules = {};
    this.forceRequired = false;
    this._cacheId(options);
    this.classNames = assign({}, DEFAULT_OPTIONS.classNames);
    options = assign({}, DEFAULT_OPTIONS, options);
    this._delay = !isNullOrUndefined(options.delay) ? options.delay : 0; // cache initial delay
    this.validity = options.validity;
    this.aria = options.aria;
    this.flags = options.flags || createFlags();
    defineNonReactive(this, 'vm', options.vm);
    defineNonReactive(this, 'componentInstance', options.component);
    this.ctorConfig = this.componentInstance ? getPath('$options.$_veeValidate', this.componentInstance) : undefined;
    this.update(options);
    // set initial value.
    this.initialValue = this.value;
    this.updated = false;
  };

  var prototypeAccessors$1 = { validator: { configurable: true },isRequired: { configurable: true },isDisabled: { configurable: true },alias: { configurable: true },value: { configurable: true },bails: { configurable: true },rejectsFalse: { configurable: true } };

  prototypeAccessors$1.validator.get = function () {
    if (!this.vm || !this.vm.$validator) {
      return { validate: function () { return Promise.resolve(true); } };
    }

    return this.vm.$validator;
  };

  prototypeAccessors$1.isRequired.get = function () {
    return !!this.rules.required || this.forceRequired;
  };

  prototypeAccessors$1.isDisabled.get = function () {
    return !!(this.el && this.el.disabled);
  };

  /**
   * Gets the display name (user-friendly name).
   */
  prototypeAccessors$1.alias.get = function () {
    if (this._alias) {
      return this._alias;
    }

    var alias = null;
    if (this.ctorConfig && this.ctorConfig.alias) {
      alias = isCallable(this.ctorConfig.alias) ? this.ctorConfig.alias.call(this.componentInstance) : this.ctorConfig.alias;
    }

    if (!alias && this.el) {
      alias = getDataAttribute(this.el, 'as');
    }

    if (!alias && this.componentInstance) {
      return this.componentInstance.$attrs && this.componentInstance.$attrs['data-vv-as'];
    }

    return alias;
  };

  /**
   * Gets the input value.
   */

  prototypeAccessors$1.value.get = function () {
    if (!isCallable(this.getter)) {
      return undefined;
    }

    return this.getter();
  };

  prototypeAccessors$1.bails.get = function () {
    return this._bails;
  };

  /**
   * If the field rejects false as a valid value for the required rule.
   */

  prototypeAccessors$1.rejectsFalse.get = function () {
    if (this.componentInstance && this.ctorConfig) {
      return !!this.ctorConfig.rejectsFalse;
    }

    if (!this.el) {
      return false;
    }

    return this.el.type === 'checkbox';
  };

  /**
   * Determines if the instance matches the options provided.
   */
  Field.prototype.matches = function matches (options) {
      var this$1 = this;

    if (!options) {
      return true;
    }

    if (options.id) {
      return this.id === options.id;
    }

    var matchesComponentId = isNullOrUndefined(options.vmId) ? function () { return true; } : function (id) { return id === this$1.vmId; };
    if (!matchesComponentId(options.vmId)) {
      return false;
    }

    if (options.name === undefined && options.scope === undefined) {
      return true;
    }

    if (options.scope === undefined) {
      return this.name === options.name;
    }

    if (options.name === undefined) {
      return this.scope === options.scope;
    }

    return options.name === this.name && options.scope === this.scope;
  };

  /**
   * Caches the field id.
   */
  Field.prototype._cacheId = function _cacheId (options) {
    if (this.el && !options.targetOf) {
      this.el._veeValidateId = this.id;
    }
  };

  /**
   * Keeps a reference of the most current validation run.
   */
  Field.prototype.waitFor = function waitFor (pendingPromise) {
    this._waitingFor = pendingPromise;
  };

  Field.prototype.isWaitingFor = function isWaitingFor (promise) {
    return this._waitingFor === promise;
  };

  /**
   * Updates the field with changed data.
   */
  Field.prototype.update = function update (options) {
      var this$1 = this;

    this.targetOf = options.targetOf || null;
    this.immediate = options.immediate || this.immediate || false;
    this.persist = options.persist || this.persist || false;

    // update errors scope if the field scope was changed.
    if (!isNullOrUndefined(options.scope) && options.scope !== this.scope && isCallable(this.validator.update)) {
      this.validator.update(this.id, { scope: options.scope });
    }
    this.scope = !isNullOrUndefined(options.scope) ? options.scope
      : !isNullOrUndefined(this.scope) ? this.scope : null;
    this.name = (!isNullOrUndefined(options.name) ? String(options.name) : options.name) || this.name || null;
    this.rules = options.rules !== undefined ? normalizeRules(options.rules) : this.rules;
    this._bails = options.bails !== undefined ? options.bails : this._bails;
    this.model = options.model || this.model;
    this.listen = options.listen !== undefined ? options.listen : this.listen;
    this.classes = (options.classes || this.classes || false) && !this.componentInstance;
    this.classNames = isObject(options.classNames) ? merge(this.classNames, options.classNames) : this.classNames;
    this.getter = isCallable(options.getter) ? options.getter : this.getter;
    this._alias = options.alias || this._alias;
    this.events = (options.events) ? normalizeEvents(options.events) : this.events;
    this.delay = makeDelayObject(this.events, options.delay || this.delay, this._delay);
    this.updateDependencies();
    this.addActionListeners();

    // update required flag flags
    if (options.rules !== undefined) {
      this.flags.required = this.isRequired;
    }

    if (Object.keys(options.rules || {}).length === 0 && this.updated) {
      var resetFlag = this.flags.validated;
      this.validator.validate(("#" + (this.id))).then(function () {
        this$1.flags.validated = resetFlag;
      });
    }

    // validate if it was validated before and field was updated and there was a rules mutation.
    if (this.flags.validated && options.rules !== undefined && this.updated) {
      this.validator.validate(("#" + (this.id)));
    }

    this.updated = true;
    this.addValueListeners();

    // no need to continue.
    if (!this.el) {
      return;
    }
    this.updateClasses();
    this.updateAriaAttrs();
  };

  /**
   * Resets field flags and errors.
   */
  Field.prototype.reset = function reset () {
      var this$1 = this;

    if (this._cancellationToken) {
      this._cancellationToken.cancelled = true;
      delete this._cancellationToken;
    }

    var defaults = createFlags();
    Object.keys(this.flags).filter(function (flag) { return flag !== 'required'; }).forEach(function (flag) {
      this$1.flags[flag] = defaults[flag];
    });

    // update initial value
    this.initialValue = this.value;
    this.flags.changed = false;

    this.addValueListeners();
    this.addActionListeners();
    this.updateClasses(true);
    this.updateAriaAttrs();
    this.updateCustomValidity();
  };

  /**
   * Sets the flags and their negated counterparts, and updates the classes and re-adds action listeners.
   */
  Field.prototype.setFlags = function setFlags (flags) {
      var this$1 = this;

    var negated = {
      pristine: 'dirty',
      dirty: 'pristine',
      valid: 'invalid',
      invalid: 'valid',
      touched: 'untouched',
      untouched: 'touched'
    };

    Object.keys(flags).forEach(function (flag) {
      this$1.flags[flag] = flags[flag];
      // if it has a negation and was not specified, set it as well.
      if (negated[flag] && flags[negated[flag]] === undefined) {
        this$1.flags[negated[flag]] = !flags[flag];
      }
    });

    if (
      flags.untouched !== undefined ||
      flags.touched !== undefined ||
      flags.dirty !== undefined ||
      flags.pristine !== undefined
    ) {
      this.addActionListeners();
    }
    this.updateClasses();
    this.updateAriaAttrs();
    this.updateCustomValidity();
  };

  /**
   * Determines if the field requires references to target fields.
  */
  Field.prototype.updateDependencies = function updateDependencies () {
      var this$1 = this;

    // reset dependencies.
    this.dependencies.forEach(function (d) { return d.field.destroy(); });
    this.dependencies = [];

    // we get the selectors for each field.
    var fields = Object.keys(this.rules).reduce(function (prev, r) {
      if (RuleContainer.isTargetRule(r)) {
        prev.push({ selector: this$1.rules[r][0], name: r });
      }

      return prev;
    }, []);

    if (!fields.length || !this.vm || !this.vm.$el) { return; }

    // must be contained within the same component, so we use the vm root element constrain our dom search.
    fields.forEach(function (ref$1) {
        var selector = ref$1.selector;
        var name = ref$1.name;

      var ref = this$1.vm.$refs[selector];
      var el = Array.isArray(ref) ? ref[0] : ref;
      if (!el) {
        return;
      }

      var options = {
        vm: this$1.vm,
        classes: this$1.classes,
        classNames: this$1.classNames,
        delay: this$1.delay,
        scope: this$1.scope,
        events: this$1.events.join('|'),
        immediate: this$1.immediate,
        targetOf: this$1.id
      };

      // probably a component.
      if (isCallable(el.$watch)) {
        options.component = el;
        options.el = el.$el;
        options.getter = Resolver.resolveGetter(el.$el, el.$vnode);
      } else {
        options.el = el;
        options.getter = Resolver.resolveGetter(el, {});
      }

      this$1.dependencies.push({ name: name, field: new Field(options) });
    });
  };

  /**
   * Removes listeners.
   */
  Field.prototype.unwatch = function unwatch (tag) {
      if ( tag === void 0 ) tag = null;

    if (!tag) {
      this.watchers.forEach(function (w) { return w.unwatch(); });
      this.watchers = [];
      return;
    }

    this.watchers.filter(function (w) { return tag.test(w.tag); }).forEach(function (w) { return w.unwatch(); });
    this.watchers = this.watchers.filter(function (w) { return !tag.test(w.tag); });
  };

  /**
   * Updates the element classes depending on each field flag status.
   */
  Field.prototype.updateClasses = function updateClasses (isReset) {
      var this$1 = this;
      if ( isReset === void 0 ) isReset = false;

    if (!this.classes || this.isDisabled) { return; }
    var applyClasses = function (el) {
      toggleClass(el, this$1.classNames.dirty, this$1.flags.dirty);
      toggleClass(el, this$1.classNames.pristine, this$1.flags.pristine);
      toggleClass(el, this$1.classNames.touched, this$1.flags.touched);
      toggleClass(el, this$1.classNames.untouched, this$1.flags.untouched);

      // remove valid/invalid classes on reset.
      if (isReset) {
        toggleClass(el, this$1.classNames.valid, false);
        toggleClass(el, this$1.classNames.invalid, false);
      }

      // make sure we don't set any classes if the state is undetermined.
      if (!isNullOrUndefined(this$1.flags.valid) && this$1.flags.validated) {
        toggleClass(el, this$1.classNames.valid, this$1.flags.valid);
      }

      if (!isNullOrUndefined(this$1.flags.invalid) && this$1.flags.validated) {
        toggleClass(el, this$1.classNames.invalid, this$1.flags.invalid);
      }
    };

    if (!isCheckboxOrRadioInput(this.el)) {
      applyClasses(this.el);
      return;
    }

    var els = document.querySelectorAll(("input[name=\"" + (this.el.name) + "\"]"));
    toArray(els).forEach(applyClasses);
  };

  /**
   * Adds the listeners required for automatic classes and some flags.
   */
  Field.prototype.addActionListeners = function addActionListeners () {
      var this$1 = this;

    // remove previous listeners.
    this.unwatch(/class/);

    if (!this.el) { return; }

    var onBlur = function () {
      this$1.flags.touched = true;
      this$1.flags.untouched = false;
      if (this$1.classes) {
        toggleClass(this$1.el, this$1.classNames.touched, true);
        toggleClass(this$1.el, this$1.classNames.untouched, false);
      }

      // only needed once.
      this$1.unwatch(/^class_blur$/);
    };

    var inputEvent = isTextInput(this.el) ? 'input' : 'change';
    var onInput = function () {
      this$1.flags.dirty = true;
      this$1.flags.pristine = false;
      if (this$1.classes) {
        toggleClass(this$1.el, this$1.classNames.pristine, false);
        toggleClass(this$1.el, this$1.classNames.dirty, true);
      }

      // only needed once.
      this$1.unwatch(/^class_input$/);
    };

    if (this.componentInstance && isCallable(this.componentInstance.$once)) {
      this.componentInstance.$once('input', onInput);
      this.componentInstance.$once('blur', onBlur);
      this.watchers.push({
        tag: 'class_input',
        unwatch: function () {
          this$1.componentInstance.$off('input', onInput);
        }
      });
      this.watchers.push({
        tag: 'class_blur',
        unwatch: function () {
          this$1.componentInstance.$off('blur', onBlur);
        }
      });
      return;
    }

    if (!this.el) { return; }

    addEventListener(this.el, inputEvent, onInput);
    // Checkboxes and radio buttons on Mac don't emit blur naturally, so we listen on click instead.
    var blurEvent = isCheckboxOrRadioInput(this.el) ? 'change' : 'blur';
    addEventListener(this.el, blurEvent, onBlur);
    this.watchers.push({
      tag: 'class_input',
      unwatch: function () {
        this$1.el.removeEventListener(inputEvent, onInput);
      }
    });

    this.watchers.push({
      tag: 'class_blur',
      unwatch: function () {
        this$1.el.removeEventListener(blurEvent, onBlur);
      }
    });
  };

  Field.prototype.checkValueChanged = function checkValueChanged () {
    // handle some people initialize the value to null, since text inputs have empty string value.
    if (this.initialValue === null && this.value === '' && isTextInput(this.el)) {
      return false;
    }

    return this.value !== this.initialValue;
  };

  /**
   * Determines the suitable primary event to listen for.
   */
  Field.prototype._determineInputEvent = function _determineInputEvent () {
    // if its a custom component, use the customized model event or the input event.
    if (this.componentInstance) {
      return (this.componentInstance.$options.model && this.componentInstance.$options.model.event) || 'input';
    }

    if (this.model && this.model.lazy) {
      return 'change';
    }

    if (isTextInput(this.el)) {
      return 'input';
    }

    return 'change';
  };

  /**
   * Determines the list of events to listen to.
   */
  Field.prototype._determineEventList = function _determineEventList (defaultInputEvent) {
      var this$1 = this;

    // if no event is configured, or it is a component or a text input then respect the user choice.
    if (!this.events.length || this.componentInstance || isTextInput(this.el)) {
      return [].concat( this.events ).map(function (evt) {
        if (evt === 'input' && this$1.model && this$1.model.lazy) {
          return 'change';
        }

        return evt;
      });
    }

    // force suitable event for non-text type fields.
    return this.events.map(function (e) {
      if (e === 'input') {
        return defaultInputEvent;
      }

      return e;
    });
  };

  /**
   * Adds the listeners required for validation.
   */
  Field.prototype.addValueListeners = function addValueListeners () {
      var this$1 = this;

    this.unwatch(/^input_.+/);
    if (!this.listen || !this.el) { return; }

    var token = { cancelled: false };
    var fn = this.targetOf ? function () {
      var target = this$1.validator._resolveField(("#" + (this$1.targetOf)));
      if (target && target.flags.validated) {
        this$1.validator.validate(("#" + (this$1.targetOf)));
      }
    } : function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

      // if its a DOM event, resolve the value, otherwise use the first parameter as the value.
      if (args.length === 0 || isEvent(args[0])) {
        args[0] = this$1.value;
      }

      this$1.flags.pending = true;
      this$1._cancellationToken = token;
      this$1.validator.validate(("#" + (this$1.id)), args[0]);
    };

    var inputEvent = this._determineInputEvent();
    var events = this._determineEventList(inputEvent);

    // if on input validation is requested.
    if (includes(events, inputEvent)) {
      var ctx = null;
      var expression = null;
      var watchCtxVm = false;
      // if its watchable from the context vm.
      if (this.model && this.model.expression) {
        ctx = this.vm;
        expression = this.model.expression;
        watchCtxVm = true;
      }

      // watch it from the custom component vm instead.
      if (!expression && this.componentInstance && this.componentInstance.$options.model) {
        ctx = this.componentInstance;
        expression = this.componentInstance.$options.model.prop || 'value';
      }

      if (ctx && expression) {
        var debouncedFn = debounce(fn, this.delay[inputEvent], token);
        var unwatch = ctx.$watch(expression, debouncedFn);
        this.watchers.push({
          tag: 'input_model',
          unwatch: function () {
            this$1.vm.$nextTick(function () {
              unwatch();
            });
          }
        });

        // filter out input event when we are watching from the context vm.
        if (watchCtxVm) {
          events = events.filter(function (e) { return e !== inputEvent; });
        }
      }
    }

    // Add events.
    events.forEach(function (e) {
      var debouncedFn = debounce(fn, this$1.delay[e], token);

      this$1._addComponentEventListener(e, debouncedFn);
      this$1._addHTMLEventListener(e, debouncedFn);
    });
  };

  Field.prototype._addComponentEventListener = function _addComponentEventListener (evt, validate) {
      var this$1 = this;

    if (!this.componentInstance) { return; }

    this.componentInstance.$on(evt, validate);
    this.watchers.push({
      tag: 'input_vue',
      unwatch: function () {
        this$1.componentInstance.$off(evt, validate);
      }
    });
  };

  Field.prototype._addHTMLEventListener = function _addHTMLEventListener (evt, validate) {
      var this$1 = this;

    if (!this.el || this.componentInstance) { return; }

    // listen for the current element.
    var addListener = function (el) {
      addEventListener(el, evt, validate);
      this$1.watchers.push({
        tag: 'input_native',
        unwatch: function () {
          el.removeEventListener(evt, validate);
        }
      });
    };

    addListener(this.el);
    if (!isCheckboxOrRadioInput(this.el)) {
      return;
    }

    var els = document.querySelectorAll(("input[name=\"" + (this.el.name) + "\"]"));
    toArray(els).forEach(function (el) {
      // skip if it is added by v-validate and is not the current element.
      if (el._veeValidateId && el !== this$1.el) {
        return;
      }

      addListener(el);
    });
  };

  /**
   * Updates aria attributes on the element.
   */
  Field.prototype.updateAriaAttrs = function updateAriaAttrs () {
      var this$1 = this;

    if (!this.aria || !this.el || !isCallable(this.el.setAttribute)) { return; }

    var applyAriaAttrs = function (el) {
      el.setAttribute('aria-required', this$1.isRequired ? 'true' : 'false');
      el.setAttribute('aria-invalid', this$1.flags.invalid ? 'true' : 'false');
    };

    if (!isCheckboxOrRadioInput(this.el)) {
      applyAriaAttrs(this.el);
      return;
    }

    var els = document.querySelectorAll(("input[name=\"" + (this.el.name) + "\"]"));
    toArray(els).forEach(applyAriaAttrs);
  };

  /**
   * Updates the custom validity for the field.
   */
  Field.prototype.updateCustomValidity = function updateCustomValidity () {
    if (!this.validity || !this.el || !isCallable(this.el.setCustomValidity) || !this.validator.errors) { return; }

    this.el.setCustomValidity(this.flags.valid ? '' : (this.validator.errors.firstById(this.id) || ''));
  };

  /**
   * Removes all listeners.
   */
  Field.prototype.destroy = function destroy () {
    // ignore the result of any ongoing validation.
    if (this._cancellationToken) {
      this._cancellationToken.cancelled = true;
    }

    this.unwatch();
    this.dependencies.forEach(function (d) { return d.field.destroy(); });
    this.dependencies = [];
  };

  Object.defineProperties( Field.prototype, prototypeAccessors$1 );

  // 

  var FieldBag = function FieldBag (items) {
    if ( items === void 0 ) items = [];

    this.items = items || [];
    this.itemsById = this.items.reduce(function (itemsById, item) {
      itemsById[item.id] = item;
      return itemsById;
    }, {});
  };

  var prototypeAccessors$2 = { length: { configurable: true } };

  FieldBag.prototype[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'] = function () {
      var this$1 = this;

    var index = 0;
    return {
      next: function () {
        return { value: this$1.items[index++], done: index > this$1.items.length };
      }
    };
  };

  /**
   * Gets the current items length.
   */

  prototypeAccessors$2.length.get = function () {
    return this.items.length;
  };

  /**
   * Finds the first field that matches the provided matcher object.
   */
  FieldBag.prototype.find = function find$1 (matcher) {
    return find(this.items, function (item) { return item.matches(matcher); });
  };

  /**
   * Finds the field with the given id, using a plain object as a map to link
   * ids to items faster than by looping over the array and matching.
   */
  FieldBag.prototype.findById = function findById (id) {
    return this.itemsById[id] || null;
  };

  /**
   * Filters the items down to the matched fields.
   */
  FieldBag.prototype.filter = function filter (matcher) {
    // multiple matchers to be tried.
    if (Array.isArray(matcher)) {
      return this.items.filter(function (item) { return matcher.some(function (m) { return item.matches(m); }); });
    }

    return this.items.filter(function (item) { return item.matches(matcher); });
  };

  /**
   * Maps the field items using the mapping function.
   */
  FieldBag.prototype.map = function map (mapper) {
    return this.items.map(mapper);
  };

  /**
   * Finds and removes the first field that matches the provided matcher object, returns the removed item.
   */
  FieldBag.prototype.remove = function remove (matcher) {
    var item = null;
    if (matcher instanceof Field) {
      item = matcher;
    } else {
      item = this.find(matcher);
    }

    if (!item) { return null; }

    var index = this.items.indexOf(item);
    this.items.splice(index, 1);
    delete this.itemsById[item.id];

    return item;
  };

  /**
   * Adds a field item to the list.
   */
  FieldBag.prototype.push = function push (item) {
    if (! (item instanceof Field)) {
      throw createError('FieldBag only accepts instances of Field that has an id defined.');
    }

    if (!item.id) {
      throw createError('Field id must be defined.');
    }

    if (this.findById(item.id)) {
      throw createError(("Field with id " + (item.id) + " is already added."));
    }

    this.items.push(item);
    this.itemsById[item.id] = item;
  };

  Object.defineProperties( FieldBag.prototype, prototypeAccessors$2 );

  var ScopedValidator = function ScopedValidator (base, vm) {
    this.id = vm._uid;
    this._base = base;
    this._paused = false;

    // create a mirror bag with limited component scope.
    this.errors = new ErrorBag(base.errors, this.id);
  };

  var prototypeAccessors$3 = { flags: { configurable: true },rules: { configurable: true },fields: { configurable: true },dictionary: { configurable: true },locale: { configurable: true } };

  prototypeAccessors$3.flags.get = function () {
      var this$1 = this;

    return this._base.fields.items.filter(function (f) { return f.vmId === this$1.id; }).reduce(function (acc, field) {
      if (field.scope) {
        if (!acc[("$" + (field.scope))]) {
          acc[("$" + (field.scope))] = {};
        }

        acc[("$" + (field.scope))][field.name] = field.flags;
      }

      acc[field.name] = field.flags;

      return acc;
    }, {});
  };

  prototypeAccessors$3.rules.get = function () {
    return this._base.rules;
  };

  prototypeAccessors$3.fields.get = function () {
    return new FieldBag(this._base.fields.filter({ vmId: this.id }));
  };

  prototypeAccessors$3.dictionary.get = function () {
    return this._base.dictionary;
  };

  prototypeAccessors$3.locale.get = function () {
    return this._base.locale;
  };

  prototypeAccessors$3.locale.set = function (val) {
    this._base.locale = val;
  };

  ScopedValidator.prototype.localize = function localize () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this._base).localize.apply(ref, args);
  };

  ScopedValidator.prototype.update = function update () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this._base).update.apply(ref, args);
  };

  ScopedValidator.prototype.attach = function attach (opts) {
    var attachOpts = assign({}, opts, { vmId: this.id });

    return this._base.attach(attachOpts);
  };

  ScopedValidator.prototype.pause = function pause () {
    this._paused = true;
  };

  ScopedValidator.prototype.resume = function resume () {
    this._paused = false;
  };

  ScopedValidator.prototype.remove = function remove (ruleName) {
    return this._base.remove(ruleName);
  };

  ScopedValidator.prototype.detach = function detach (name, scope) {
    return this._base.detach(name, scope, this.id);
  };

  ScopedValidator.prototype.extend = function extend () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this._base).extend.apply(ref, args);
  };

  ScopedValidator.prototype.validate = function validate (descriptor, value, opts) {
      if ( opts === void 0 ) opts = {};

    if (this._paused) { return Promise.resolve(true); }

    return this._base.validate(descriptor, value, assign({}, { vmId: this.id }, opts || {}));
  };

  ScopedValidator.prototype.verify = function verify () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this._base).verify.apply(ref, args);
  };

  ScopedValidator.prototype.validateAll = function validateAll (values, opts) {
      if ( opts === void 0 ) opts = {};

    if (this._paused) { return Promise.resolve(true); }

    return this._base.validateAll(values, assign({}, { vmId: this.id }, opts || {}));
  };

  ScopedValidator.prototype.validateScopes = function validateScopes (opts) {
      if ( opts === void 0 ) opts = {};

    if (this._paused) { return Promise.resolve(true); }

    return this._base.validateScopes(assign({}, { vmId: this.id }, opts || {}));
  };

  ScopedValidator.prototype.destroy = function destroy () {
    delete this.id;
    delete this._base;
  };

  ScopedValidator.prototype.reset = function reset (matcher) {
    return this._base.reset(Object.assign({}, matcher || {}, { vmId: this.id }));
  };

  ScopedValidator.prototype.flag = function flag () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this._base).flag.apply(ref, args.concat( [this.id] ));
  };

  ScopedValidator.prototype._resolveField = function _resolveField () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this._base)._resolveField.apply(ref, args);
  };

  Object.defineProperties( ScopedValidator.prototype, prototypeAccessors$3 );

  var VALIDATOR = null;

  var getValidator = function () {
    return VALIDATOR;
  };

  var setValidator = function (value) {
    VALIDATOR = value;

    return value;
  };

  // 

  /**
   * Checks if a parent validator instance was requested.
   */
  var requestsValidator = function (injections) {
    if (isObject(injections) && injections.$validator) {
      return true;
    }

    return false;
  };

  var mixin = {
    provide: function provide () {
      if (this.$validator && !isBuiltInComponent(this.$vnode)) {
        return {
          $validator: this.$validator
        };
      }

      return {};
    },
    beforeCreate: function beforeCreate () {
      // if built in do nothing.
      if (isBuiltInComponent(this.$vnode) || this.$options.$__veeInject === false) {
        return;
      }

      // if its a root instance set the config if it exists.
      if (!this.$parent) {
        setConfig(this.$options.$_veeValidate || {});
      }

      var options = resolveConfig(this);

      // if its a root instance, inject anyways, or if it requested a new instance.
      if (!this.$parent || (this.$options.$_veeValidate && /new/.test(this.$options.$_veeValidate.validator))) {
        this.$validator = new ScopedValidator(getValidator(), this);
      }

      var requested = requestsValidator(this.$options.inject);

      // if automatic injection is enabled and no instance was requested.
      if (! this.$validator && options.inject && !requested) {
        this.$validator = new ScopedValidator(getValidator(), this);
      }

      // don't inject errors or fieldBag as no validator was resolved.
      if (!requested && !this.$validator) {
        return;
      }

      // There is a validator but it isn't injected, mark as reactive.
      if (!requested && this.$validator) {
        var Vue = this.$options._base; // the vue constructor.
        Vue.util.defineReactive(this.$validator, 'errors', this.$validator.errors);
      }

      if (!this.$options.computed) {
        this.$options.computed = {};
      }

      this.$options.computed[options.errorBagName || 'errors'] = function errorBagGetter () {
        return this.$validator.errors;
      };
      this.$options.computed[options.fieldsBagName || 'fields'] = function fieldBagGetter () {
        return this.$validator.fields.items.reduce(function (acc, field) {
          if (field.scope) {
            if (!acc[("$" + (field.scope))]) {
              acc[("$" + (field.scope))] = {};
            }

            acc[("$" + (field.scope))][field.name] = field.flags;

            return acc;
          }

          acc[field.name] = field.flags;

          return acc;
        }, {});
      };
    },
    beforeDestroy: function beforeDestroy () {
      if (this.$validator && this._uid === this.$validator.id) {
        this.$validator.errors.clear(); // remove errors generated by this component.
      }
    }
  };

  // 

  /**
   * Finds the requested field by id from the context object.
   */
  function findField (el, context) {
    if (!context || !context.$validator) {
      return null;
    }

    return context.$validator.fields.findById(el._veeValidateId);
  }
  var directive = {
    bind: function bind (el, binding, vnode) {
      var validator = vnode.context.$validator;
      if (!validator) {

        return;
      }

      var fieldOptions = Resolver.generate(el, binding, vnode);
      validator.attach(fieldOptions);
    },
    inserted: function inserted (el, binding, vnode) {
      var field = findField(el, vnode.context);
      var scope = Resolver.resolveScope(el, binding, vnode);

      // skip if scope hasn't changed.
      if (!field || scope === field.scope) { return; }

      // only update scope.
      field.update({ scope: scope });

      // allows the field to re-evaluated once more in the update hook.
      field.updated = false;
    },
    update: function update (el, binding, vnode) {
      var field = findField(el, vnode.context);

      // make sure we don't do unneccasary work if no important change was done.
      if (!field || (field.updated && isEqual(binding.value, binding.oldValue))) { return; }
      var scope = Resolver.resolveScope(el, binding, vnode);
      var rules = Resolver.resolveRules(el, binding, vnode);

      field.update({
        scope: scope,
        rules: rules
      });
    },
    unbind: function unbind (el, binding, ref) {
      var context = ref.context;

      var field = findField(el, context);
      if (!field) { return; }

      context.$validator.detach(field);
    }
  };

  // 

  var Validator = function Validator (validations, options, pluginContainer) {
    if ( options === void 0 ) options = { fastExit: true };
    if ( pluginContainer === void 0 ) pluginContainer = null;

    this.errors = new ErrorBag();
    this.fields = new FieldBag();
    this._createFields(validations);
    this.paused = false;
    this.fastExit = !isNullOrUndefined(options && options.fastExit) ? options.fastExit : true;
    this.$vee = pluginContainer || {
      _vm: {
        $nextTick: function (cb) { return isCallable(cb) ? cb() : Promise.resolve(); },
        $emit: function () {},
        $off: function () {}
      }
    };
  };

  var prototypeAccessors$4 = { rules: { configurable: true },dictionary: { configurable: true },flags: { configurable: true },locale: { configurable: true } };
  var staticAccessors$1 = { rules: { configurable: true },dictionary: { configurable: true },locale: { configurable: true } };

  /**
   * @deprecated
   */
  staticAccessors$1.rules.get = function () {

    return RuleContainer.rules;
  };

  /**
   * @deprecated
   */
  prototypeAccessors$4.rules.get = function () {

    return RuleContainer.rules;
  };

  prototypeAccessors$4.dictionary.get = function () {
    return DictionaryResolver.getDriver();
  };

  staticAccessors$1.dictionary.get = function () {
    return DictionaryResolver.getDriver();
  };

  prototypeAccessors$4.flags.get = function () {
    return this.fields.items.reduce(function (acc, field) {
        var obj;

      if (field.scope) {
        acc[("$" + (field.scope))] = ( obj = {}, obj[field.name] = field.flags, obj );

        return acc;
      }

      acc[field.name] = field.flags;

      return acc;
    }, {});
  };

  /**
   * Getter for the current locale.
   */
  prototypeAccessors$4.locale.get = function () {
    return Validator.locale;
  };

  /**
   * Setter for the validator locale.
   */
  prototypeAccessors$4.locale.set = function (value) {
    Validator.locale = value;
  };

  staticAccessors$1.locale.get = function () {
    return DictionaryResolver.getDriver().locale;
  };

  /**
   * Setter for the validator locale.
   */
  staticAccessors$1.locale.set = function (value) {
    var hasChanged = value !== DictionaryResolver.getDriver().locale;
    DictionaryResolver.getDriver().locale = value;
    if (hasChanged && Validator.$vee && Validator.$vee._vm) {
      Validator.$vee._vm.$emit('localeChanged');
    }
  };

  /**
   * Static constructor.
   * @deprecated
   */
  Validator.create = function create (validations, options) {

    return new Validator(validations, options);
  };

  /**
   * Adds a custom validator to the list of validation rules.
   */
  Validator.extend = function extend (name, validator, options) {
      if ( options === void 0 ) options = {};

    Validator._guardExtend(name, validator);
    // rules imported from the minimal bundle
    // will have the options embedded in them
    var mergedOpts = validator.options || {};
    Validator._merge(name, {
      validator: validator,
      paramNames: (options && options.paramNames) || validator.paramNames,
      options: assign({ hasTarget: false, immediate: true }, mergedOpts, options || {})
    });
  };

  /**
   * Removes a rule from the list of validators.
   * @deprecated
   */
  Validator.remove = function remove (name) {

    RuleContainer.remove(name);
  };

  /**
   * Adds and sets the current locale for the validator.
  */
  Validator.prototype.localize = function localize (lang, dictionary) {
    Validator.localize(lang, dictionary);
  };

  /**
   * Adds and sets the current locale for the validator.
   */
  Validator.localize = function localize (lang, dictionary) {
      var obj;

    if (isObject(lang)) {
      DictionaryResolver.getDriver().merge(lang);
      return;
    }

    // merge the dictionary.
    if (dictionary) {
      var locale = lang || dictionary.name;
      dictionary = assign({}, dictionary);
      DictionaryResolver.getDriver().merge(( obj = {}, obj[locale] = dictionary, obj ));
    }

    if (lang) {
      // set the locale.
      Validator.locale = lang;
    }
  };

  /**
   * Registers a field to be validated.
   */
  Validator.prototype.attach = function attach (fieldOpts) {
      var this$1 = this;

    // We search for a field with the same name & scope, having persist enabled
    var oldFieldMatcher = { name: fieldOpts.name, scope: fieldOpts.scope, persist: true };
    var oldField = fieldOpts.persist ? this.fields.find(oldFieldMatcher) : null;

    if (oldField) {
      // We keep the flags of the old field, then we remove its instance
      fieldOpts.flags = oldField.flags;
      oldField.destroy();
      this.fields.remove(oldField);
    }

    // fixes initial value detection with v-model and select elements.
    var value = fieldOpts.initialValue;
    var field = new Field(fieldOpts);
    this.fields.push(field);

    // validate the field initially
    if (field.immediate) {
      this.$vee._vm.$nextTick(function () { return this$1.validate(("#" + (field.id)), value || field.value, { vmId: fieldOpts.vmId }); });
    } else {
      this._validate(field, value || field.value, { initial: true }).then(function (result) {
        field.flags.valid = result.valid;
        field.flags.invalid = !result.valid;
      });
    }

    return field;
  };

  /**
   * Sets the flags on a field.
   */
  Validator.prototype.flag = function flag (name, flags, uid) {
      if ( uid === void 0 ) uid = null;

    var field = this._resolveField(name, undefined, uid);
    if (!field || !flags) {
      return;
    }

    field.setFlags(flags);
  };

  /**
   * Removes a field from the validator.
   */
  Validator.prototype.detach = function detach (name, scope, uid) {
    var field = isCallable(name.destroy) ? name : this._resolveField(name, scope, uid);
    if (!field) { return; }

    // We destroy/remove the field & error instances if it's not a `persist` one
    if (!field.persist) {
      field.destroy();
      this.errors.remove(field.name, field.scope, field.vmId);
      this.fields.remove(field);
    }
  };

  /**
   * Adds a custom validator to the list of validation rules.
   */
  Validator.prototype.extend = function extend (name, validator, options) {
      if ( options === void 0 ) options = {};

    Validator.extend(name, validator, options);
  };

  Validator.prototype.reset = function reset (matcher) {
      var this$1 = this;

    // two ticks
    return this.$vee._vm.$nextTick().then(function () {
      return this$1.$vee._vm.$nextTick();
    }).then(function () {
      this$1.fields.filter(matcher).forEach(function (field) {
        field.waitFor(null);
        field.reset(); // reset field flags.
        this$1.errors.remove(field.name, field.scope, matcher && matcher.vmId);
      });
    });
  };

  /**
   * Updates a field, updating both errors and flags.
   */
  Validator.prototype.update = function update (id, ref) {
      var scope = ref.scope;

    var field = this._resolveField(("#" + id));
    if (!field) { return; }

    // remove old scope.
    this.errors.update(id, { scope: scope });
  };

  /**
   * Removes a rule from the list of validators.
   * @deprecated
   */
  Validator.prototype.remove = function remove (name) {
    Validator.remove(name);
  };

  /**
   * Validates a value against a registered field validations.
   */
  Validator.prototype.validate = function validate (fieldDescriptor, value, ref) {
      var this$1 = this;
      if ( ref === void 0 ) ref = {};
      var silent = ref.silent;
      var vmId = ref.vmId;

    if (this.paused) { return Promise.resolve(true); }

    // overload to validate all.
    if (isNullOrUndefined(fieldDescriptor)) {
      return this.validateScopes({ silent: silent, vmId: vmId });
    }

    // overload to validate scope-less fields.
    if (fieldDescriptor === '*') {
      return this.validateAll(undefined, { silent: silent, vmId: vmId });
    }

    // if scope validation was requested.
    if (/^(.+)\.\*$/.test(fieldDescriptor)) {
      var matched = fieldDescriptor.match(/^(.+)\.\*$/)[1];
      return this.validateAll(matched);
    }

    var field = this._resolveField(fieldDescriptor);
    if (!field) {
      return this._handleFieldNotFound(fieldDescriptor);
    }

    if (!silent) { field.flags.pending = true; }
    if (value === undefined) {
      value = field.value;
    }

    var validationPromise = this._validate(field, value);
    field.waitFor(validationPromise);

    return validationPromise.then(function (result) {
      if (!silent && field.isWaitingFor(validationPromise)) {
        // allow next validation to mutate the state.
        field.waitFor(null);
        this$1._handleValidationResults([result], vmId);
      }

      return result.valid;
    });
  };

  /**
   * Pauses the validator.
   */
  Validator.prototype.pause = function pause () {
    this.paused = true;

    return this;
  };

  /**
   * Resumes the validator.
   */
  Validator.prototype.resume = function resume () {
    this.paused = false;

    return this;
  };

  /**
   * Validates each value against the corresponding field validations.
   */
  Validator.prototype.validateAll = function validateAll (values, ref) {
      var this$1 = this;
      if ( ref === void 0 ) ref = {};
      var silent = ref.silent;
      var vmId = ref.vmId;

    if (this.paused) { return Promise.resolve(true); }

    var matcher = null;
    var providedValues = false;

    if (typeof values === 'string') {
      matcher = { scope: values, vmId: vmId };
    } else if (isObject(values)) {
      matcher = Object.keys(values).map(function (key) {
        return { name: key, vmId: vmId, scope: null };
      });
      providedValues = true;
    } else if (Array.isArray(values)) {
      matcher = values.map(function (key) {
        return typeof key === 'object' ? Object.assign({ vmId: vmId }, key) : { name: key, vmId: vmId };
      });
    } else {
      matcher = { scope: null, vmId: vmId };
    }

    return Promise.all(
      this.fields.filter(matcher).map(function (field) { return this$1._validate(field, providedValues ? values[field.name] : field.value); })
    ).then(function (results) {
      if (!silent) {
        this$1._handleValidationResults(results, vmId);
      }

      return results.every(function (t) { return t.valid; });
    });
  };

  /**
   * Validates all scopes.
   */
  Validator.prototype.validateScopes = function validateScopes (ref) {
      var this$1 = this;
      if ( ref === void 0 ) ref = {};
      var silent = ref.silent;
      var vmId = ref.vmId;

    if (this.paused) { return Promise.resolve(true); }

    return Promise.all(
      this.fields.filter({ vmId: vmId }).map(function (field) { return this$1._validate(field, field.value); })
    ).then(function (results) {
      if (!silent) {
        this$1._handleValidationResults(results, vmId);
      }

      return results.every(function (t) { return t.valid; });
    });
  };

  /**
   * Validates a value against the rules.
   */
  Validator.prototype.verify = function verify (value, rules, options) {
      if ( options === void 0 ) options = {};

    var field = {
      name: (options && options.name) || '{field}',
      rules: normalizeRules(rules),
      bails: getPath('bails', options, true),
      forceRequired: false,
      get isRequired () {
        return !!this.rules.required || this.forceRequired;
      }
    };

    var targetRules = Object.keys(field.rules).filter(RuleContainer.isTargetRule);
    if (targetRules.length && options && isObject(options.values)) {
      field.dependencies = targetRules.map(function (rule) {
        var ref = field.rules[rule];
          var targetKey = ref[0];

        return {
          name: rule,
          field: { value: options.values[targetKey] }
        };
      });
    }

    return this._validate(field, value).then(function (result) {
      var errors = [];
      var ruleMap = {};
      result.errors.forEach(function (e) {
        errors.push(e.msg);
        ruleMap[e.rule] = e.msg;
      });

      return {
        valid: result.valid,
        errors: errors,
        failedRules: ruleMap
      };
    });
  };

  /**
   * Perform cleanup.
   */
  Validator.prototype.destroy = function destroy () {
    this.$vee._vm.$off('localeChanged');
  };

  /**
   * Creates the fields to be validated.
   */
  Validator.prototype._createFields = function _createFields (validations) {
      var this$1 = this;

    if (!validations) { return; }

    Object.keys(validations).forEach(function (field) {
      var options = assign({}, { name: field, rules: validations[field] });
      this$1.attach(options);
    });
  };

  /**
   * Date rules need the existence of a format, so date_format must be supplied.
   */
  Validator.prototype._getDateFormat = function _getDateFormat (validations) {
    var format = null;
    if (validations.date_format && Array.isArray(validations.date_format)) {
      format = validations.date_format[0];
    }

    return format || DictionaryResolver.getDriver().getDateFormat(this.locale);
  };

  /**
   * Formats an error message for field and a rule.
   */
  Validator.prototype._formatErrorMessage = function _formatErrorMessage (field, rule, data, targetName) {
      if ( data === void 0 ) data = {};
      if ( targetName === void 0 ) targetName = null;

    var name = this._getFieldDisplayName(field);
    var params = this._getLocalizedParams(rule, targetName);

    return DictionaryResolver.getDriver().getFieldMessage(this.locale, field.name, rule.name, [name, params, data]);
  };

  /**
   * We need to convert any object param to an array format since the locales do not handle params as objects yet.
   */
  Validator.prototype._convertParamObjectToArray = function _convertParamObjectToArray (obj, ruleName) {
    if (Array.isArray(obj)) {
      return obj;
    }

    var paramNames = RuleContainer.getParamNames(ruleName);
    if (!paramNames || !isObject(obj)) {
      return obj;
    }

    return paramNames.reduce(function (prev, paramName) {
      if (paramName in obj) {
        prev.push(obj[paramName]);
      }

      return prev;
    }, []);
  };

  /**
   * Translates the parameters passed to the rule (mainly for target fields).
   */
  Validator.prototype._getLocalizedParams = function _getLocalizedParams (rule, targetName) {
      if ( targetName === void 0 ) targetName = null;

    var params = this._convertParamObjectToArray(rule.params, rule.name);
    if (rule.options.hasTarget && params && params[0]) {
      var localizedName = targetName || DictionaryResolver.getDriver().getAttribute(this.locale, params[0], params[0]);
      return [localizedName].concat(params.slice(1));
    }

    return params;
  };

  /**
   * Resolves an appropriate display name, first checking 'data-as' or the registered 'prettyName'
   */
  Validator.prototype._getFieldDisplayName = function _getFieldDisplayName (field) {
    return field.alias || DictionaryResolver.getDriver().getAttribute(this.locale, field.name, field.name);
  };

  /**
   * Converts an array of params to an object with named properties.
   * Only works if the rule is configured with a paramNames array.
   * Returns the same params if it cannot convert it.
   */
  Validator.prototype._convertParamArrayToObj = function _convertParamArrayToObj (params, ruleName) {
    var paramNames = RuleContainer.getParamNames(ruleName);
    if (!paramNames) {
      return params;
    }

    if (isObject(params)) {
      // check if the object is either a config object or a single parameter that is an object.
      var hasKeys = paramNames.some(function (name) { return Object.keys(params).indexOf(name) !== -1; });
      // if it has some of the keys, return it as is.
      if (hasKeys) {
        return params;
      }
      // otherwise wrap the object in an array.
      params = [params];
    }

    // Reduce the paramsNames to a param object.
    return params.reduce(function (prev, value, idx) {
      prev[paramNames[idx]] = value;

      return prev;
    }, {});
  };

  /**
   * Tests a single input value against a rule.
   */
  Validator.prototype._test = function _test (field, value, rule) {
      var this$1 = this;

    var validator = RuleContainer.getValidatorMethod(rule.name);
    var params = Array.isArray(rule.params) ? toArray(rule.params) : rule.params;
    if (!params) {
      params = [];
    }

    var targetName = null;
    if (!validator || typeof validator !== 'function') {
      return Promise.reject(createError(("No such validator '" + (rule.name) + "' exists.")));
    }

    // has field dependencies.
    if (rule.options.hasTarget && field.dependencies) {
      var target = find(field.dependencies, function (d) { return d.name === rule.name; });
      if (target) {
        targetName = target.field.alias;
        params = [target.field.value].concat(params.slice(1));
      }
    } else if (rule.name === 'required' && field.rejectsFalse) {
      // invalidate false if no args were specified and the field rejects false by default.
      params = params.length ? params : [true];
    }

    if (rule.options.isDate) {
      var dateFormat = this._getDateFormat(field.rules);
      if (rule.name !== 'date_format') {
        params.push(dateFormat);
      }
    }

    var result = validator(value, this._convertParamArrayToObj(params, rule.name));

    // If it is a promise.
    if (isCallable(result.then)) {
      return result.then(function (values) {
        var allValid = true;
        var data = {};
        if (Array.isArray(values)) {
          allValid = values.every(function (t) { return (isObject(t) ? t.valid : t); });
        } else { // Is a single object/boolean.
          allValid = isObject(values) ? values.valid : values;
          data = values.data;
        }

        return {
          valid: allValid,
          data: result.data,
          errors: allValid ? [] : [this$1._createFieldError(field, rule, data, targetName)]
        };
      });
    }

    if (!isObject(result)) {
      result = { valid: result, data: {} };
    }

    return {
      valid: result.valid,
      data: result.data,
      errors: result.valid ? [] : [this._createFieldError(field, rule, result.data, targetName)]
    };
  };

  /**
   * Merges a validator object into the RULES and Messages.
   */
  Validator._merge = function _merge (name, ref) {
      var validator = ref.validator;
      var options = ref.options;
      var paramNames = ref.paramNames;

    var validate = isCallable(validator) ? validator : validator.validate;
    if (validator.getMessage) {
      DictionaryResolver.getDriver().setMessage(Validator.locale, name, validator.getMessage);
    }

    RuleContainer.add(name, {
      validate: validate,
      options: options,
      paramNames: paramNames
    });
  };

  /**
   * Guards from extension violations.
   */
  Validator._guardExtend = function _guardExtend (name, validator) {
    if (isCallable(validator)) {
      return;
    }

    if (!isCallable(validator.validate)) {
      throw createError(
        ("Extension Error: The validator '" + name + "' must be a function or have a 'validate' method.")
      );
    }
  };

  /**
   * Creates a Field Error Object.
   */
  Validator.prototype._createFieldError = function _createFieldError (field, rule, data, targetName) {
      var this$1 = this;

    return {
      id: field.id,
      vmId: field.vmId,
      field: field.name,
      msg: this._formatErrorMessage(field, rule, data, targetName),
      rule: rule.name,
      scope: field.scope,
      regenerate: function () {
        return this$1._formatErrorMessage(field, rule, data, targetName);
      }
    };
  };

  /**
   * Tries different strategies to find a field.
   */
  Validator.prototype._resolveField = function _resolveField (name, scope, uid) {
    if (name[0] === '#') {
      return this.fields.findById(name.slice(1));
    }

    if (!isNullOrUndefined(scope)) {
      return this.fields.find({ name: name, scope: scope, vmId: uid });
    }

    if (includes(name, '.')) {
      var ref = name.split('.');
        var fieldScope = ref[0];
        var fieldName = ref.slice(1);
      var field = this.fields.find({ name: fieldName.join('.'), scope: fieldScope, vmId: uid });
      if (field) {
        return field;
      }
    }

    return this.fields.find({ name: name, scope: null, vmId: uid });
  };

  /**
   * Handles when a field is not found.
   */
  Validator.prototype._handleFieldNotFound = function _handleFieldNotFound (name, scope) {
    var fullName = isNullOrUndefined(scope) ? name : ("" + (!isNullOrUndefined(scope) ? scope + '.' : '') + name);

    return Promise.reject(createError(
      ("Validating a non-existent field: \"" + fullName + "\". Use \"attach()\" first.")
    ));
  };

  /**
   * Handles validation results.
   */
  Validator.prototype._handleValidationResults = function _handleValidationResults (results, vmId) {
      var this$1 = this;

    var matchers = results.map(function (result) { return ({ id: result.id }); });
    this.errors.removeById(matchers.map(function (m) { return m.id; }));
    // remove by name and scope to remove any custom errors added.
    results.forEach(function (result) {
      this$1.errors.remove(result.field, result.scope, vmId);
    });
    var allErrors = results.reduce(function (prev, curr) {
      prev.push.apply(prev, curr.errors);

      return prev;
    }, []);

    this.errors.add(allErrors);

    // handle flags.
    this.fields.filter(matchers).forEach(function (field) {
      var result = find(results, function (r) { return r.id === field.id; });
      field.setFlags({
        pending: false,
        valid: result.valid,
        validated: true
      });
    });
  };

  Validator.prototype._shouldSkip = function _shouldSkip (field, value) {
    // field is configured to run through the pipeline regardless
    if (field.bails === false) {
      return false;
    }

    // disabled fields are skipped if useConstraintAttrs is enabled in config
    if (field.isDisabled && getConfig().useConstraintAttrs) {
      return true;
    }

    // skip if the field is not required and has an empty value.
    return !field.isRequired && (isNullOrUndefined(value) || value === '' || isEmptyArray(value));
  };

  Validator.prototype._shouldBail = function _shouldBail (field) {
    // if the field was configured explicitly.
    if (field.bails !== undefined) {
      return field.bails;
    }

    return this.fastExit;
  };

  /**
   * Starts the validation process.
   */
  Validator.prototype._validate = function _validate (field, value, ref) {
      var this$1 = this;
      if ( ref === void 0 ) ref = {};
      var initial = ref.initial;

    var requireRules = Object.keys(field.rules).filter(RuleContainer.isRequireRule);

    field.forceRequired = false;
    requireRules.forEach(function (rule) {
      var ruleOptions = RuleContainer.getOptions(rule);
      var result = this$1._test(field, value, { name: rule, params: field.rules[rule], options: ruleOptions });

      if (isCallable(result.then)) { throw createError('Require rules cannot be async'); }
      if (!isObject(result)) { throw createError('Require rules has to return an object (see docs)'); }

      if (result.data.required === true) {
        field.forceRequired = true;
      }
    });

    if (this._shouldSkip(field, value)) {
      return Promise.resolve({ valid: true, id: field.id, field: field.name, scope: field.scope, errors: [] });
    }

    var promises = [];
    var errors = [];
    var isExitEarly = false;
    if (isCallable(field.checkValueChanged)) {
      field.flags.changed = field.checkValueChanged();
    }

    // use of '.some()' is to break iteration in middle by returning true
    Object.keys(field.rules).filter(function (rule) {
      if (!initial || !RuleContainer.has(rule)) { return true; }

      return RuleContainer.isImmediate(rule);
    }).some(function (rule) {
      var ruleOptions = RuleContainer.getOptions(rule);
      var result = this$1._test(field, value, { name: rule, params: field.rules[rule], options: ruleOptions });
      if (isCallable(result.then)) {
        promises.push(result);
      } else if (!result.valid && this$1._shouldBail(field)) {
        errors.push.apply(errors, result.errors);
        isExitEarly = true;
      } else {
        // promisify the result.
        promises.push(new Promise(function (resolve) { return resolve(result); }));
      }

      return isExitEarly;
    });

    if (isExitEarly) {
      return Promise.resolve({ valid: false, errors: errors, id: field.id, field: field.name, scope: field.scope });
    }

    return Promise.all(promises).then(function (results) {
      return results.reduce(function (prev, v) {
          var ref;

        if (!v.valid) {
          (ref = prev.errors).push.apply(ref, v.errors);
        }

        prev.valid = prev.valid && v.valid;

        return prev;
      }, { valid: true, errors: errors, id: field.id, field: field.name, scope: field.scope });
    });
  };

  Object.defineProperties( Validator.prototype, prototypeAccessors$4 );
  Object.defineProperties( Validator, staticAccessors$1 );

  // 

  var normalizeValue = function (value) {
    if (isObject(value)) {
      return Object.keys(value).reduce(function (prev, key) {
        prev[key] = normalizeValue(value[key]);

        return prev;
      }, {});
    }

    if (isCallable(value)) {
      return value('{0}', ['{1}', '{2}', '{3}']);
    }

    return value;
  };

  var normalizeFormat = function (locale) {
    // normalize messages
    var dictionary = {};
    if (locale.messages) {
      dictionary.messages = normalizeValue(locale.messages);
    }

    if (locale.custom) {
      dictionary.custom = normalizeValue(locale.custom);
    }

    if (locale.attributes) {
      dictionary.attributes = locale.attributes;
    }

    if (!isNullOrUndefined(locale.dateFormat)) {
      dictionary.dateFormat = locale.dateFormat;
    }

    return dictionary;
  };

  var I18nDictionary = function I18nDictionary (i18n, rootKey) {
    this.i18n = i18n;
    this.rootKey = rootKey;
  };

  var prototypeAccessors$5 = { locale: { configurable: true } };

  prototypeAccessors$5.locale.get = function () {
    return this.i18n.locale;
  };

  prototypeAccessors$5.locale.set = function (value) {
    warn('Cannot set locale from the validator when using vue-i18n, use i18n.locale setter instead');
  };

  I18nDictionary.prototype.getDateFormat = function getDateFormat (locale) {
    return this.i18n.getDateTimeFormat(locale || this.locale);
  };

  I18nDictionary.prototype.setDateFormat = function setDateFormat (locale, value) {
    this.i18n.setDateTimeFormat(locale || this.locale, value);
  };

  I18nDictionary.prototype.getMessage = function getMessage (_, key, data) {
    var path = (this.rootKey) + ".messages." + key;
    var dataOptions = data;

    if (Array.isArray(data)) {
      dataOptions = [].concat.apply([], data);
    }

    if (this.i18n.te(path)) {
      return this.i18n.t(path, dataOptions);
    }

    // fallback to the fallback message
    if (this.i18n.te(path, this.i18n.fallbackLocale)) {
      return this.i18n.t(path, this.i18n.fallbackLocale, dataOptions);
    }

    // fallback to the root message
    return this.i18n.t(((this.rootKey) + ".messages._default"), dataOptions);
  };

  I18nDictionary.prototype.getAttribute = function getAttribute (_, key, fallback) {
      if ( fallback === void 0 ) fallback = '';

    var path = (this.rootKey) + ".attributes." + key;
    if (this.i18n.te(path)) {
      return this.i18n.t(path);
    }

    return fallback;
  };

  I18nDictionary.prototype.getFieldMessage = function getFieldMessage (_, field, key, data) {
    var path = (this.rootKey) + ".custom." + field + "." + key;
    if (this.i18n.te(path)) {
      return this.i18n.t(path, data);
    }

    return this.getMessage(_, key, data);
  };

  I18nDictionary.prototype.merge = function merge$1 (dictionary) {
      var this$1 = this;

    Object.keys(dictionary).forEach(function (localeKey) {
        var obj;

      // i18n doesn't deep merge
      // first clone the existing locale (avoid mutations to locale)
      var clone = merge({}, getPath((localeKey + "." + (this$1.rootKey)), this$1.i18n.messages, {}));
      // Merge cloned locale with new one
      var locale = merge(clone, normalizeFormat(dictionary[localeKey]));
      this$1.i18n.mergeLocaleMessage(localeKey, ( obj = {}, obj[this$1.rootKey] = locale, obj ));
      if (locale.dateFormat) {
        this$1.i18n.setDateTimeFormat(localeKey, locale.dateFormat);
      }
    });
  };

  I18nDictionary.prototype.setMessage = function setMessage (locale, key, value) {
      var obj, obj$1;

    this.merge(( obj$1 = {}, obj$1[locale] = {
        messages: ( obj = {}, obj[key] = value, obj )
      }, obj$1 ));
  };

  I18nDictionary.prototype.setAttribute = function setAttribute (locale, key, value) {
      var obj, obj$1;

    this.merge(( obj$1 = {}, obj$1[locale] = {
        attributes: ( obj = {}, obj[key] = value, obj )
      }, obj$1 ));
  };

  Object.defineProperties( I18nDictionary.prototype, prototypeAccessors$5 );

  var aggressive = function () { return ({
    on: ['input']
  }); };

  var lazy = function () { return ({
    on: ['change']
  }); };

  var eager = function (ref) {
    var errors = ref.errors;

    if (errors.length) {
      return {
        on: ['input']
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

  // 

  var Vue;
  var pendingPlugins;
  var pluginInstance;

  var VeeValidate = function VeeValidate (config, _Vue) {
    this.configure(config);
    pluginInstance = this;
    if (_Vue) {
      Vue = _Vue;
    }
    this._validator = setValidator(
      new Validator(null, { fastExit: config && config.fastExit }, this)
    );
    this._initVM(this.config);
    this._initI18n(this.config);
  };

  var prototypeAccessors$6 = { i18nDriver: { configurable: true },config: { configurable: true } };
  var staticAccessors$2 = { i18nDriver: { configurable: true },config: { configurable: true } };

  VeeValidate.setI18nDriver = function setI18nDriver (driver, instance) {
    DictionaryResolver.setDriver(driver, instance);
  };

  VeeValidate.configure = function configure (cfg) {
    setConfig(cfg);
  };

  VeeValidate.setMode = function setMode (mode, implementation) {
    setConfig({ mode: mode });
    if (!implementation) {
      return;
    }

    if (!isCallable(implementation)) {
      throw new Error('A mode implementation must be a function');
    }

    modes[mode] = implementation;
  };

  VeeValidate.use = function use (plugin, options) {
      if ( options === void 0 ) options = {};

    if (!isCallable(plugin)) {
      return warn('The plugin must be a callable function');
    }

    // Don't install plugins until vee-validate is installed.
    if (!pluginInstance) {
      if (!pendingPlugins) {
        pendingPlugins = [];
      }
      pendingPlugins.push({ plugin: plugin, options: options });
      return;
    }

    plugin({ Validator: Validator, ErrorBag: ErrorBag, Rules: Validator.rules }, options);
  };
  VeeValidate.install = function install (_Vue, opts) {
    if (Vue && _Vue === Vue) {
      return;
    }

    Vue = _Vue;
    pluginInstance = new VeeValidate(opts);
    // inject the plugin container statically into the validator class
    Validator.$vee = pluginInstance;

    detectPassiveSupport();

    Vue.mixin(mixin);
    Vue.directive('validate', directive);
    if (pendingPlugins) {
      pendingPlugins.forEach(function (ref) {
          var plugin = ref.plugin;
          var options = ref.options;

        VeeValidate.use(plugin, options);
      });
      pendingPlugins = null;
    }
  };

  prototypeAccessors$6.i18nDriver.get = function () {
    return DictionaryResolver.getDriver();
  };

  staticAccessors$2.i18nDriver.get = function () {
    return DictionaryResolver.getDriver();
  };

  prototypeAccessors$6.config.get = function () {
    return getConfig();
  };

  staticAccessors$2.config.get = function () {
    return getConfig();
  };

  VeeValidate.prototype._initVM = function _initVM (config) {
      var this$1 = this;

    this._vm = new Vue({
      data: function () { return ({
        errors: this$1._validator.errors,
        fields: this$1._validator.fields
      }); }
    });
  };

  VeeValidate.prototype._initI18n = function _initI18n (config) {
      var this$1 = this;

    var dictionary = config.dictionary;
      var i18n = config.i18n;
      var i18nRootKey = config.i18nRootKey;
      var locale = config.locale;
    var onLocaleChanged = function () {
      if (dictionary) {
        this$1.i18nDriver.merge(dictionary);
      }

      this$1._validator.errors.regenerate();
    };

    // i18 is being used for localization.
    if (i18n) {
      VeeValidate.setI18nDriver('i18n', new I18nDictionary(i18n, i18nRootKey));
      i18n._vm.$watch('locale', onLocaleChanged);
    } else if (typeof window !== 'undefined') {
      this._vm.$on('localeChanged', onLocaleChanged);
    }

    if (dictionary) {
      this.i18nDriver.merge(dictionary);
    }

    if (locale && !i18n) {
      this._validator.localize(locale);
    }
  };

  VeeValidate.prototype.configure = function configure (cfg) {
    setConfig(cfg);
  };

  Object.defineProperties( VeeValidate.prototype, prototypeAccessors$6 );
  Object.defineProperties( VeeValidate, staticAccessors$2 );

  VeeValidate.mixin = mixin;
  VeeValidate.directive = directive;
  VeeValidate.Validator = Validator;
  VeeValidate.ErrorBag = ErrorBag;

  // 

  var normalize = function (fields) {
    if (Array.isArray(fields)) {
      return fields.reduce(function (prev, curr) {
        if (includes(curr, '.')) {
          prev[curr.split('.')[1]] = curr;
        } else {
          prev[curr] = curr;
        }

        return prev;
      }, {});
    }

    return fields;
  };

  // Combines two flags using either AND or OR depending on the flag type.
  var combine = function (lhs, rhs) {
    var mapper = {
      pristine: function (lhs, rhs) { return lhs && rhs; },
      dirty: function (lhs, rhs) { return lhs || rhs; },
      touched: function (lhs, rhs) { return lhs || rhs; },
      untouched: function (lhs, rhs) { return lhs && rhs; },
      valid: function (lhs, rhs) { return lhs && rhs; },
      invalid: function (lhs, rhs) { return lhs || rhs; },
      pending: function (lhs, rhs) { return lhs || rhs; },
      required: function (lhs, rhs) { return lhs || rhs; },
      validated: function (lhs, rhs) { return lhs && rhs; }
    };

    return Object.keys(mapper).reduce(function (flags, flag) {
      flags[flag] = mapper[flag](lhs[flag], rhs[flag]);

      return flags;
    }, {});
  };

  var mapScope = function (scope, deep) {
    if ( deep === void 0 ) deep = true;

    return Object.keys(scope).reduce(function (flags, field) {
      if (!flags) {
        flags = assign({}, scope[field]);
        return flags;
      }

      // scope.
      var isScope = field.indexOf('$') === 0;
      if (deep && isScope) {
        return combine(mapScope(scope[field]), flags);
      } else if (!deep && isScope) {
        return flags;
      }

      flags = combine(flags, scope[field]);

      return flags;
    }, null);
  };

  /**
   * Maps fields to computed functions.
   */
  var mapFields = function (fields) {
    if (!fields) {
      return function () {
        return mapScope(this.$validator.flags);
      };
    }

    var normalized = normalize(fields);
    return Object.keys(normalized).reduce(function (prev, curr) {
      var field = normalized[curr];
      prev[curr] = function mappedField () {
        // if field exists
        if (this.$validator.flags[field]) {
          return this.$validator.flags[field];
        }

        // scopeless fields were selected.
        if (normalized[curr] === '*') {
          return mapScope(this.$validator.flags, false);
        }

        // if it has a scope defined
        var index = field.indexOf('.');
        if (index <= 0) {
          return {};
        }

        var ref = field.split('.');
        var scope = ref[0];
        var name = ref.slice(1);

        scope = this.$validator.flags[("$" + scope)];
        name = name.join('.');

        // an entire scope was selected: scope.*
        if (name === '*' && scope) {
          return mapScope(scope);
        }

        if (scope && scope[name]) {
          return scope[name];
        }

        return {};
      };

      return prev;
    }, {});
  };

  var $validator = null;

  var PROVIDER_COUNTER = 0;

  var ValidationProvider = {
    $__veeInject: false,
    inject: {
      $_veeObserver: {
        from: '$_veeObserver',
        default: function default$1 () {
          if (!this.$vnode.context.$_veeObserver) {
            this.$vnode.context.$_veeObserver = createObserver();
          }

          return this.$vnode.context.$_veeObserver;
        }
      }
    },
    props: {
      vid: {
        type: [String, Number],
        default: function () {
          PROVIDER_COUNTER++;

          return ("_vee_" + PROVIDER_COUNTER);
        }
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
      events: {
        type: Array,
        validate: function () {

          return true;
        },
        default: function () {
          var events = getConfig().events;
          if (typeof events === 'string') {
            return events.split('|');
          }

          return events;
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
      persist: {
        type: Boolean,
        default: false
      },
      bails: {
        type: Boolean,
        default: function () { return getConfig().fastExit; }
      },
      debounce: {
        type: Number,
        default: function () { return getConfig().delay || 0; }
      },
      tag: {
        type: String,
        default: 'span'
      },
      slim: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      rules: {
        deep: true,
        handler: function handler (val, oldVal) {
          this._needsValidation = !isEqual(val, oldVal);
        }
      }
    },
    data: function () { return ({
      messages: [],
      value: undefined,
      initialized: false,
      initialValue: undefined,
      flags: createFlags(),
      failedRules: {},
      forceRequired: false,
      isDeactivated: false,
      id: null
    }); },
    computed: {
      isValid: function isValid () {
        return this.flags.valid;
      },
      fieldDeps: function fieldDeps () {
        var this$1 = this;

        var rules = normalizeRules(this.rules);

        return Object.keys(rules).filter(RuleContainer.isTargetRule).map(function (rule) {
          var depName = rules[rule][0];
          watchCrossFieldDep(this$1, depName);

          return depName;
        });
      },
      normalizedEvents: function normalizedEvents () {
        var this$1 = this;

        var ref = computeModeSetting(this);
        var on = ref.on;

        return normalizeEvents(on || this.events || []).map(function (e) {
          if (e === 'input') {
            return this$1._inputEventName;
          }

          return e;
        });
      },
      isRequired: function isRequired () {
        var rules = normalizeRules(this.rules);
        var forceRequired = this.forceRequired;

        var isRequired = rules.required || forceRequired;
        this.flags.required = isRequired;

        return isRequired;
      },
      classes: function classes () {
        var this$1 = this;

        var names = getConfig().classNames;
        return Object.keys(this.flags).reduce(function (classes, flag) {
          var className = (names && names[flag]) || flag;
          if (isNullOrUndefined(this$1.flags[flag])) {
            return classes;
          }

          if (className) {
            classes[className] = this$1.flags[flag];
          }

          return classes;
        }, {});
      }
    },
    render: function render (h) {
      var this$1 = this;

      this.registerField();
      var ctx = createValidationCtx(this);

      // Gracefully handle non-existent scoped slots.
      var slot = this.$scopedSlots.default;
      /* istanbul ignore next */
      if (!isCallable(slot)) {

        return h(this.tag, this.$slots.default);
      }

      var nodes = slot(ctx);
      // Handle single-root slot.
      extractVNodes(nodes).forEach(function (input) {
        addListeners.call(this$1, input);
      });

      return this.slim ? createRenderless(h, nodes) : h(this.tag, nodes);
    },
    beforeDestroy: function beforeDestroy () {
      // cleanup reference.
      this.$_veeObserver.unsubscribe(this);
    },
    activated: function activated () {
      this.$_veeObserver.subscribe(this);
      this.isDeactivated = false;
    },
    deactivated: function deactivated () {
      this.$_veeObserver.unsubscribe(this);
      this.isDeactivated = true;
    },
    methods: {
      setFlags: function setFlags (flags) {
        var this$1 = this;

        Object.keys(flags).forEach(function (flag) {
          this$1.flags[flag] = flags[flag];
        });
      },
      syncValue: function syncValue (e) {
        var value = normalizeValue$1(e);
        this.value = value;
        this.flags.changed = this.initialValue !== value;
      },
      reset: function reset () {
        this.messages = [];
        this._pendingValidation = null;
        this.initialValue = this.value;
        var flags = createFlags();
        this.setFlags(flags);
      },
      validate: function validate () {
        var this$1 = this;
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        if (args.length > 0) {
          this.syncValue(args[0]);
        }

        return this.validateSilent().then(function (result) {
          this$1.applyResult(result);

          return result;
        });
      },
      validateSilent: function validateSilent () {
        var this$1 = this;

        this.setFlags({ pending: true });

        return $validator.verify(this.value, this.rules, {
          name: this.name,
          values: createValuesLookup(this),
          bails: this.bails
        }).then(function (result) {
          this$1.setFlags({ pending: false });
          if (!this$1.isRequired) {
            this$1.setFlags({ valid: result.valid, invalid: !result.valid });
          }

          return result;
        });
      },
      applyResult: function applyResult (ref) {
        var errors = ref.errors;
        var failedRules = ref.failedRules;

        this.messages = errors;
        this.failedRules = assign({}, failedRules);
        this.setFlags({
          valid: !errors.length,
          changed: this.value !== this.initialValue,
          invalid: !!errors.length,
          validated: true
        });
      },
      registerField: function registerField () {
        if (!$validator) {
          $validator = getValidator() || new Validator(null, { fastExit: getConfig().fastExit });
        }

        updateRenderingContextRefs(this);
      }
    }
  };

  function createValidationCtx (ctx) {
    return {
      errors: ctx.messages,
      flags: ctx.flags,
      classes: ctx.classes,
      valid: ctx.isValid,
      failedRules: ctx.failedRules,
      reset: function () { return ctx.reset(); },
      validate: function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return ctx.validate.apply(ctx, args);
    },
      aria: {
        'aria-invalid': ctx.flags.invalid ? 'true' : 'false',
        'aria-required': ctx.isRequired ? 'true' : 'false'
      }
    };
  }

  function normalizeValue$1 (value) {
    if (isEvent(value)) {
      return value.target.type === 'file' ? toArray(value.target.files) : value.target.value;
    }

    return value;
  }

  /**
   * Determines if a provider needs to run validation.
   */
  function shouldValidate (ctx, model) {
    // when an immediate/initial validation is needed and wasn't done before.
    if (!ctx._ignoreImmediate && ctx.immediate) {
      return true;
    }

    // when the value changes for whatever reason.
    if (ctx.value !== model.value) {
      return true;
    }

    // when it needs validation due to props/cross-fields changes.
    if (ctx._needsValidation) {
      return true;
    }

    // when the initial value is undefined and the field wasn't rendered yet.
    if (!ctx.initialized && model.value === undefined) {
      return true;
    }

    return false;
  }

  function computeModeSetting (ctx) {
    var compute = isCallable(ctx.mode) ? ctx.mode : modes[ctx.mode];

    return compute({
      errors: ctx.messages,
      value: ctx.value,
      flags: ctx.flags
    });
  }

  function onRenderUpdate (model) {
    if (!this.initialized) {
      this.initialValue = model.value;
    }

    var validateNow = shouldValidate(this, model);
    this._needsValidation = false;
    this.value = model.value;
    this._ignoreImmediate = true;

    if (!validateNow) {
      return;
    }

    this.validateSilent().then(this.immediate || this.flags.validated ? this.applyResult : function (x) { return x; });
  }

  // Creates the common handlers for a validatable context.
  function createCommonHandlers (ctx) {
    var onInput = function (e) {
      ctx.syncValue(e); // track and keep the value updated.
      ctx.setFlags({ dirty: true, pristine: false });
    };

    // Blur event listener.
    var onBlur = function () {
      ctx.setFlags({ touched: true, untouched: false });
    };

    var onValidate = ctx.$veeHandler;
    var mode = computeModeSetting(ctx);

    // Handle debounce changes.
    if (!onValidate || ctx.$veeDebounce !== ctx.debounce) {
      onValidate = debounce(
        function () {
          ctx.$nextTick(function () {
            var pendingPromise = ctx.validateSilent();
            // avoids race conditions between successive validations.
            ctx._pendingValidation = pendingPromise;
            pendingPromise.then(function (result) {
              if (pendingPromise === ctx._pendingValidation) {
                ctx.applyResult(result);
                ctx._pendingValidation = null;
              }
            });
          });
        },
        mode.debounce || ctx.debounce
      );

      // Cache the handler so we don't create it each time.
      ctx.$veeHandler = onValidate;
      // cache the debounce value so we detect if it was changed.
      ctx.$veeDebounce = ctx.debounce;
    }

    return { onInput: onInput, onBlur: onBlur, onValidate: onValidate };
  }

  // Adds all plugin listeners to the vnode.
  function addListeners (node) {
    var model = findModel(node);
    // cache the input eventName.
    this._inputEventName = this._inputEventName || getInputEventName(node, model);

    onRenderUpdate.call(this, model);

    var ref = createCommonHandlers(this);
    var onInput = ref.onInput;
    var onBlur = ref.onBlur;
    var onValidate = ref.onValidate;
    addVNodeListener(node, this._inputEventName, onInput);
    addVNodeListener(node, 'blur', onBlur);

    // add the validation listeners.
    this.normalizedEvents.forEach(function (evt) {
      addVNodeListener(node, evt, onValidate);
    });

    this.initialized = true;
  }

  function createValuesLookup (ctx) {
    var providers = ctx.$_veeObserver.refs;

    return ctx.fieldDeps.reduce(function (acc, depName) {
      if (!providers[depName]) {
        return acc;
      }

      acc[depName] = providers[depName].value;

      return acc;
    }, {});
  }

  function updateRenderingContextRefs (ctx) {
    // IDs should not be nullable.
    if (isNullOrUndefined(ctx.id) && ctx.id === ctx.vid) {
      ctx.id = PROVIDER_COUNTER;
      PROVIDER_COUNTER++;
    }

    var id = ctx.id;
    var vid = ctx.vid;
    // Nothing has changed.
    if (ctx.isDeactivated || (id === vid && ctx.$_veeObserver.refs[id])) {
      return;
    }

    // vid was changed.
    if (id !== vid && ctx.$_veeObserver.refs[id] === ctx) {
      ctx.$_veeObserver.unsubscribe(ctx);
    }

    ctx.$_veeObserver.subscribe(ctx);
    ctx.id = vid;
  }

  function createObserver () {
    return {
      refs: {},
      subscribe: function subscribe (ctx) {
        this.refs[ctx.vid] = ctx;
      },
      unsubscribe: function unsubscribe (ctx) {
        delete this.refs[ctx.vid];
      }
    };
  }

  function watchCrossFieldDep (ctx, depName, withHooks) {
    if ( withHooks === void 0 ) withHooks = true;

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

  var flagMergingStrategy = {
    pristine: 'every',
    dirty: 'some',
    touched: 'some',
    untouched: 'every',
    valid: 'every',
    invalid: 'some',
    pending: 'some',
    validated: 'every'
  };

  function mergeFlags (lhs, rhs, strategy) {
    var stratName = flagMergingStrategy[strategy];

    return [lhs, rhs][stratName](function (f) { return f; });
  }

  var OBSERVER_COUNTER = 0;

  var ValidationObserver = {
    name: 'ValidationObserver',
    provide: function provide () {
      return {
        $_veeObserver: this
      };
    },
    inject: {
      $_veeObserver: {
        from: '$_veeObserver',
        default: function default$1 () {
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
      slim: {
        type: Boolean,
        default: false
      }
    },
    data: function () { return ({
      vid: ("obs_" + (OBSERVER_COUNTER++)),
      refs: {},
      observers: [],
      persistedStore: {}
    }); },
    computed: {
      ctx: function ctx () {
        var this$1 = this;

        var ctx = {
          errors: {},
          validate: function (arg) {
            var promise = this$1.validate(arg);

            return {
              then: function then (thenable) {
                promise.then(function (success) {
                  if (success && isCallable(thenable)) {
                    return Promise.resolve(thenable());
                  }

                  return Promise.resolve(success);
                });
              }
            };
          },
          reset: function () { return this$1.reset(); }
        };

        return values(this.refs).concat( Object.keys(this.persistedStore).map(function (key) {
            return {
              vid: key,
              flags: this$1.persistedStore[key].flags,
              messages: this$1.persistedStore[key].errors
            };
          }),
          this.observers ).reduce(function (acc, provider) {
          Object.keys(flagMergingStrategy).forEach(function (flag) {
            var flags = provider.flags || provider.ctx;
            if (!(flag in acc)) {
              acc[flag] = flags[flag];
              return;
            }

            acc[flag] = mergeFlags(acc[flag], flags[flag], flag);
          });

          acc.errors[provider.vid] = provider.messages || values(provider.ctx.errors).reduce(function (errs, obsErrors) {
            return errs.concat(obsErrors);
          }, []);

          return acc;
        }, ctx);
      }
    },
    created: function created () {
      if (this.$_veeObserver) {
        this.$_veeObserver.subscribe(this, 'observer');
      }
    },
    activated: function activated () {
      if (this.$_veeObserver) {
        this.$_veeObserver.subscribe(this, 'observer');
      }
    },
    deactivated: function deactivated () {
      if (this.$_veeObserver) {
        this.$_veeObserver.unsubscribe(this, 'observer');
      }
    },
    beforeDestroy: function beforeDestroy () {
      if (this.$_veeObserver) {
        this.$_veeObserver.unsubscribe(this, 'observer');
      }
    },
    render: function render (h) {
      var slots = this.$slots.default || this.$scopedSlots.default || [];
      if (isCallable(slots)) {
        slots = slots(this.ctx);
      }

      return this.slim ? createRenderless(h, slots) : h(this.tag, { on: this.$listeners, attrs: this.$attrs }, slots);
    },
    methods: {
      subscribe: function subscribe (subscriber, kind) {
        var obj;

        if ( kind === void 0 ) kind = 'provider';
        if (kind === 'observer') {
          this.observers.push(subscriber);
          return;
        }

        this.refs = Object.assign({}, this.refs, ( obj = {}, obj[subscriber.vid] = subscriber, obj ));
        if (subscriber.persist && this.persistedStore[subscriber.vid]) {
          this.restoreProviderState(subscriber);
        }
      },
      unsubscribe: function unsubscribe (ref, kind) {
        var vid = ref.vid;
        if ( kind === void 0 ) kind = 'provider';

        if (kind === 'provider') {
          this.removeProvider(vid);
        }

        var idx = findIndex(this.observers, function (o) { return o.vid === vid; });
        if (idx !== -1) {
          this.observers.splice(idx, 1);
        }
      },
      validate: function validate (ref) {
        if ( ref === void 0 ) ref = { silent: false };
        var silent = ref.silent;

        return Promise.all(values(this.refs).map(function (ref) { return ref[silent ? 'validateSilent' : 'validate']().then(function (r) { return r.valid; }); }).concat( this.observers.map(function (obs) { return obs.validate({ silent: silent }); })
        )).then(function (results) { return results.every(function (r) { return r; }); });
      },
      reset: function reset () {
        var this$1 = this;

        Object.keys(this.persistedStore).forEach(function (key) {
          this$1.$delete(this$1.persistedStore, key);
        });
        return values(this.refs).concat( this.observers).forEach(function (ref) { return ref.reset(); });
      },
      restoreProviderState: function restoreProviderState (provider) {
        var state = this.persistedStore[provider.vid];
        provider.setFlags(state.flags);
        provider.applyResult(state);
        this.$delete(this.persistedStore, provider.vid);
      },
      removeProvider: function removeProvider (vid) {
        var obj;

        var provider = this.refs[vid];
        // save it for the next time.
        if (provider && provider.persist) {

          this.persistedStore = assign({}, this.persistedStore, ( obj = {}, obj[vid] = {
              flags: provider.flags,
              errors: provider.messages,
              failedRules: provider.failedRules
            }, obj ));
        }

        this.$delete(this.refs, vid);
      },
    }
  };

  function withValidation (component, ctxToProps) {
    if ( ctxToProps === void 0 ) ctxToProps = null;

    var options = isCallable(component) ? component.options : component;
    options.$__veeInject = false;
    var hoc = {
      name: ((options.name || 'AnonymousHoc') + "WithValidation"),
      props: assign({}, ValidationProvider.props),
      data: ValidationProvider.data,
      computed: assign({}, ValidationProvider.computed),
      methods: assign({}, ValidationProvider.methods),
      $__veeInject: false,
      beforeDestroy: ValidationProvider.beforeDestroy,
      inject: ValidationProvider.inject
    };

    // Default ctx converts ctx props to component props.
    if (!ctxToProps) {
      ctxToProps = function (ctx) { return ctx; };
    }

    var eventName = (options.model && options.model.event) || 'input';

    hoc.render = function (h) {
      var obj;

      this.registerField();
      var vctx = createValidationCtx(this);
      var listeners = assign({}, this.$listeners);

      var model = findModel(this.$vnode);
      this._inputEventName = this._inputEventName || getInputEventName(this.$vnode, model);
      onRenderUpdate.call(this, model);

      var ref = createCommonHandlers(this);
      var onInput = ref.onInput;
      var onBlur = ref.onBlur;
      var onValidate = ref.onValidate;

      mergeVNodeListeners(listeners, eventName, onInput);
      mergeVNodeListeners(listeners, 'blur', onBlur);
      this.normalizedEvents.forEach(function (evt, idx) {
        mergeVNodeListeners(listeners, evt, onValidate);
      });

      // Props are any attrs not associated with ValidationProvider Plus the model prop.
      // WARNING: Accidental prop overwrite will probably happen.
      var ref$1 = findModelConfig(this.$vnode) || { prop: 'value' };
      var prop = ref$1.prop;
      var props = assign({}, this.$attrs, ( obj = {}, obj[prop] = model.value, obj ), ctxToProps(vctx));

      return h(options, {
        attrs: this.$attrs,
        props: props,
        on: listeners
      }, normalizeSlots(this.$slots, this.$vnode.context));
    };

    return hoc;
  }

  VeeValidate.version = '2.2.11';
  VeeValidate.mapFields = mapFields;
  VeeValidate.ValidationProvider = ValidationProvider;
  VeeValidate.ValidationObserver = ValidationObserver;
  VeeValidate.withValidation = withValidation;

  return VeeValidate;

}));
