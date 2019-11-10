/*!
 * vue-validator v2.1.6
 * (c) 2016 kazuya kawaguchi
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueValidator = factory());
}(this, function () { 'use strict';

  var babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  babelHelpers;
  /**
   * Utilties
   */

  // export default for holding the Vue reference
  var exports$1 = {};
  /**
   * warn
   *
   * @param {String} msg
   * @param {Error} [err]
   *
   */

  function warn(msg, err) {
    if (window.console) {
      console.warn('[vue-validator] ' + msg);
      if (err) {
        console.warn(err.stack);
      }
    }
  }

  /**
   * empty
   *
   * @param {Array|Object} target
   * @return {Boolean}
   */

  function empty(target) {
    if (target === null || target === undefined) {
      return true;
    }

    if (Array.isArray(target)) {
      if (target.length > 0) {
        return false;
      }
      if (target.length === 0) {
        return true;
      }
    } else if (exports$1.Vue.util.isPlainObject(target)) {
      for (var key in target) {
        if (exports$1.Vue.util.hasOwn(target, key)) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * each
   *
   * @param {Array|Object} target
   * @param {Function} iterator
   * @param {Object} [context]
   */

  function each(target, iterator, context) {
    if (Array.isArray(target)) {
      for (var i = 0; i < target.length; i++) {
        iterator.call(context || target[i], target[i], i);
      }
    } else if (exports$1.Vue.util.isPlainObject(target)) {
      var hasOwn = exports$1.Vue.util.hasOwn;
      for (var key in target) {
        if (hasOwn(target, key)) {
          iterator.call(context || target[key], target[key], key);
        }
      }
    }
  }

  /**
   * pull
   *
   * @param {Array} arr
   * @param {Object} item
   * @return {Object|null}
   */

  function pull(arr, item) {
    var index = exports$1.Vue.util.indexOf(arr, item);
    return ~index ? arr.splice(index, 1) : null;
  }

  /**
   * trigger
   *
   * @param {Element} el
   * @param {String} event
   * @param {Object} [args]
   */

  function trigger(el, event, args) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent(event, true, false);

    if (args) {
      for (var prop in args) {
        e[prop] = args[prop];
      }
    }

    // Due to Firefox bug, events fired on disabled
    // non-attached form controls can throw errors
    try {
      el.dispatchEvent(e);
    } catch (e) {}
  }

  /**
   * Forgiving check for a promise
   *
   * @param {Object} p
   * @return {Boolean}
   */

  function isPromise(p) {
    return p && typeof p.then === 'function';
  }

  /**
   * Togging classes
   *
   * @param {Element} el
   * @param {String} key
   * @param {Function} fn
   */

  function toggleClasses(el, key, fn) {
    key = key.trim();
    if (key.indexOf(' ') === -1) {
      fn(el, key);
      return;
    }

    var keys = key.split(/\s+/);
    for (var i = 0, l = keys.length; i < l; i++) {
      fn(el, keys[i]);
    }
  }

  /**
   * Fundamental validate functions
   */

  /**
   * required
   *
   * This function validate whether the value has been filled out.
   *
   * @param {*} val
   * @return {Boolean}
   */

  function required(val) {
    if (Array.isArray(val)) {
      if (val.length !== 0) {
        var valid = true;
        for (var i = 0, l = val.length; i < l; i++) {
          valid = required(val[i]);
          if (!valid) {
            break;
          }
        }
        return valid;
      } else {
        return false;
      }
    } else if (typeof val === 'number' || typeof val === 'function') {
      return true;
    } else if (typeof val === 'boolean') {
      return val;
    } else if (typeof val === 'string') {
      return val.length > 0;
    } else if (val !== null && (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) === 'object') {
      return Object.keys(val).length > 0;
    } else if (val === null || val === undefined) {
      return false;
    }
  }

  /**
   * pattern
   *
   * This function validate whether the value matches the regex pattern
   *
   * @param val
   * @param {String} pat
   * @return {Boolean}
   */

  function pattern(val, pat) {
    if (typeof pat !== 'string') {
      return false;
    }

    var match = pat.match(new RegExp('^/(.*?)/([gimy]*)$'));
    if (!match) {
      return false;
    }

    return new RegExp(match[1], match[2]).test(val);
  }

  /**
   * minlength
   *
   * This function validate whether the minimum length.
   *
   * @param {String|Array} val
   * @param {String|Number} min
   * @return {Boolean}
   */

  function minlength(val, min) {
    if (typeof val === 'string') {
      return isInteger(min, 10) && val.length >= parseInt(min, 10);
    } else if (Array.isArray(val)) {
      return val.length >= parseInt(min, 10);
    } else {
      return false;
    }
  }

  /**
   * maxlength
   *
   * This function validate whether the maximum length.
   *
   * @param {String|Array} val
   * @param {String|Number} max
   * @return {Boolean}
   */

  function maxlength(val, max) {
    if (typeof val === 'string') {
      return isInteger(max, 10) && val.length <= parseInt(max, 10);
    } else if (Array.isArray(val)) {
      return val.length <= parseInt(max, 10);
    } else {
      return false;
    }
  }

  /**
   * min
   *
   * This function validate whether the minimum value of the numberable value.
   *
   * @param {*} val
   * @param {*} arg minimum
   * @return {Boolean}
   */

  function min(val, arg) {
    return !isNaN(+val) && !isNaN(+arg) && +val >= +arg;
  }

  /**
   * max
   *
   * This function validate whether the maximum value of the numberable value.
   *
   * @param {*} val
   * @param {*} arg maximum
   * @return {Boolean}
   */

  function max(val, arg) {
    return !isNaN(+val) && !isNaN(+arg) && +val <= +arg;
  }

  /**
   * isInteger
   *
   * This function check whether the value of the string is integer.
   *
   * @param {String} val
   * @return {Boolean}
   * @private
   */

  function isInteger(val) {
    return (/^(-?[1-9]\d*|0)$/.test(val)
    );
  }

var validators = Object.freeze({
    required: required,
    pattern: pattern,
    minlength: minlength,
    maxlength: maxlength,
    min: min,
    max: max
  });

  function Asset (Vue) {
    var extend = Vue.util.extend;

    // set global validators asset
    var assets = Object.create(null);
    extend(assets, validators);
    Vue.options.validators = assets;

    // set option merge strategy
    var strats = Vue.config.optionMergeStrategies;
    if (strats) {
      strats.validators = function (parent, child) {
        if (!child) {
          return parent;
        }
        if (!parent) {
          return child;
        }
        var ret = Object.create(null);
        extend(ret, parent);
        for (var key in child) {
          ret[key] = child[key];
        }
        return ret;
      };
    }

    /**
     * Register or retrieve a global validator definition.
     *
     * @param {String} id
     * @param {Function} definition
     */

    Vue.validator = function (id, definition) {
      if (!definition) {
        return Vue.options['validators'][id];
      } else {
        Vue.options['validators'][id] = definition;
      }
    };
  }

  function Override (Vue) {
    // override _init
    var init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if (!this._validatorMaps) {
        this._validatorMaps = Object.create(null);
      }
      init.call(this, options);
    };

    // override _destroy
    var destroy = Vue.prototype._destroy;
    Vue.prototype._destroy = function () {
      destroy.apply(this, arguments);
      this._validatorMaps = null;
    };
  }

  var VALIDATE_UPDATE = '__vue-validator-validate-update__';
  var PRIORITY_VALIDATE = 4096;
  var PRIORITY_VALIDATE_CLASS = 32;
  var REGEX_FILTER = /[^|]\|[^|]/;
  var REGEX_VALIDATE_DIRECTIVE = /^v-validate(?:$|:(.*)$)/;
  var REGEX_EVENT = /^v-on:|^@/;

  var classId = 0; // ID for validation class


  function ValidateClass (Vue) {
    var vIf = Vue.directive('if');
    var FragmentFactory = Vue.FragmentFactory;
    var _Vue$util = Vue.util;
    var toArray = _Vue$util.toArray;
    var replace = _Vue$util.replace;
    var createAnchor = _Vue$util.createAnchor;

    /**
     * `v-validate-class` directive
     */

    Vue.directive('validate-class', {
      terminal: true,
      priority: vIf.priority + PRIORITY_VALIDATE_CLASS,

      bind: function bind() {
        var _this = this;

        var id = String(classId++);
        this.setClassIds(this.el, id);

        this.vm.$on(VALIDATE_UPDATE, this.cb = function (classIds, validation, results) {
          if (classIds.indexOf(id) > -1) {
            validation.updateClasses(results, _this.frag.node);
          }
        });

        this.setupFragment();
      },
      unbind: function unbind() {
        this.vm.$off(VALIDATE_UPDATE, this.cb);
        this.teardownFragment();
      },
      setClassIds: function setClassIds(el, id) {
        var childNodes = toArray(el.childNodes);
        for (var i = 0, l = childNodes.length; i < l; i++) {
          var element = childNodes[i];
          if (element.nodeType === 1) {
            var hasAttrs = element.hasAttributes();
            var attrs = hasAttrs && toArray(element.attributes);
            for (var k = 0, _l = attrs.length; k < _l; k++) {
              var attr = attrs[k];
              if (attr.name.match(REGEX_VALIDATE_DIRECTIVE)) {
                var existingId = element.getAttribute(VALIDATE_UPDATE);
                var value = existingId ? existingId + ',' + id : id;
                element.setAttribute(VALIDATE_UPDATE, value);
              }
            }
          }

          if (element.hasChildNodes()) {
            this.setClassIds(element, id);
          }
        }
      },
      setupFragment: function setupFragment() {
        this.anchor = createAnchor('v-validate-class');
        replace(this.el, this.anchor);

        this.factory = new FragmentFactory(this.vm, this.el);
        this.frag = this.factory.create(this._host, this._scope, this._frag);
        this.frag.before(this.anchor);
      },
      teardownFragment: function teardownFragment() {
        if (this.frag) {
          this.frag.remove();
          this.frag = null;
          this.factory = null;
        }

        replace(this.anchor, this.el);
        this.anchor = null;
      }
    });
  }

  function Validate (Vue) {
    var FragmentFactory = Vue.FragmentFactory;
    var parseDirective = Vue.parsers.directive.parseDirective;
    var _Vue$util = Vue.util;
    var inBrowser = _Vue$util.inBrowser;
    var bind = _Vue$util.bind;
    var on = _Vue$util.on;
    var off = _Vue$util.off;
    var createAnchor = _Vue$util.createAnchor;
    var replace = _Vue$util.replace;
    var camelize = _Vue$util.camelize;
    var isPlainObject = _Vue$util.isPlainObject;

    // Test for IE10/11 textarea placeholder clone bug

    function checkTextareaCloneBug() {
      if (inBrowser) {
        var t = document.createElement('textarea');
        t.placeholder = 't';
        return t.cloneNode(true).value === 't';
      } else {
        return false;
      }
    }
    var hasTextareaCloneBug = checkTextareaCloneBug();

    /**
     * `v-validate` directive
     */

    Vue.directive('validate', {
      deep: true,
      terminal: true,
      priority: PRIORITY_VALIDATE,
      params: ['group', 'field', 'detect-blur', 'detect-change', 'initial', 'classes'],

      paramWatchers: {
        detectBlur: function detectBlur(val, old) {
          if (this._invalid) {
            return;
          }
          this.validation.detectBlur = this.isDetectBlur(val);
          this.validator.validate(this.field);
        },
        detectChange: function detectChange(val, old) {
          if (this._invalid) {
            return;
          }
          this.validation.detectChange = this.isDetectChange(val);
          this.validator.validate(this.field);
        }
      },

      bind: function bind() {
        var el = this.el;

        if ('development' !== 'production' && el.__vue__) {
          warn('v-validate="' + this.expression + '" cannot be used on an instance root element.');
          this._invalid = true;
          return;
        }

        if ('development' !== 'production' && (el.hasAttribute('v-if') || el.hasAttribute('v-for'))) {
          warn('v-validate cannot be used `v-if` or `v-for` build-in terminal directive ' + 'on an element. these is wrapped with `<template>` or other tags: ' + '(e.g. <validator name="validator">' + '<template v-if="hidden">' + '<input type="text" v-validate:field1="[\'required\']">' + '</template>' + '</validator>).');
          this._invalid = true;
          return;
        }

        if ('development' !== 'production' && !(this.arg || this.params.field)) {
          warn('you need specify field name for v-validate directive.');
          this._invalid = true;
          return;
        }

        var validatorName = this.vm.$options._validator;
        if ('development' !== 'production' && !validatorName) {
          warn('you need to wrap the elements to be validated in a <validator> element: ' + '(e.g. <validator name="validator">' + '<input type="text" v-validate:field1="[\'required\']">' + '</validator>).');
          this._invalid = true;
          return;
        }

        var raw = el.getAttribute('v-model');

        var _parseModelRaw = this.parseModelRaw(raw);

        var model = _parseModelRaw.model;
        var filters = _parseModelRaw.filters;

        this.model = model;

        this.setupFragment();
        this.setupValidate(validatorName, model, filters);
        this.listen();
      },
      update: function update(value, old) {
        if (!value || this._invalid) {
          return;
        }

        if (isPlainObject(value) || old && isPlainObject(old)) {
          this.handleObject(value, old);
        } else if (Array.isArray(value) || old && Array.isArray(old)) {
          this.handleArray(value, old);
        }

        var options = { field: this.field, noopable: this._initialNoopValidation };
        if (this.frag) {
          options.el = this.frag.node;
        }
        this.validator.validate(options);

        if (this._initialNoopValidation) {
          this._initialNoopValidation = null;
        }
      },
      unbind: function unbind() {
        if (this._invalid) {
          return;
        }

        this.unlisten();
        this.teardownValidate();
        this.teardownFragment();

        this.model = null;
      },
      parseModelRaw: function parseModelRaw(raw) {
        if (REGEX_FILTER.test(raw)) {
          var parsed = parseDirective(raw);
          return { model: parsed.expression, filters: parsed.filters };
        } else {
          return { model: raw };
        }
      },
      setupValidate: function setupValidate(name, model, filters) {
        var params = this.params;
        var validator = this.validator = this.vm._validatorMaps[name];

        this.field = camelize(this.arg ? this.arg : params.field);

        this.validation = validator.manageValidation(this.field, model, this.vm, this.getElementFrom(this.frag), this._scope, filters, params.initial, this.isDetectBlur(params.detectBlur), this.isDetectChange(params.detectChange));

        isPlainObject(params.classes) && this.validation.setValidationClasses(params.classes);

        params.group && validator.addGroupValidation(params.group, this.field);

        this._initialNoopValidation = this.isInitialNoopValidation(params.initial);
      },
      listen: function listen() {
        var model = this.model;
        var validation = this.validation;
        var el = this.getElementFrom(this.frag);

        this.onBlur = bind(validation.listener, validation);
        on(el, 'blur', this.onBlur);
        if ((el.type === 'radio' || el.tagName === 'SELECT') && !model) {
          this.onChange = bind(validation.listener, validation);
          on(el, 'change', this.onChange);
        } else if (el.type === 'checkbox') {
          if (!model) {
            this.onChange = bind(validation.listener, validation);
            on(el, 'change', this.onChange);
          } else {
            this.onClick = bind(validation.listener, validation);
            on(el, 'click', this.onClick);
          }
        } else {
          if (!model) {
            this.onInput = bind(validation.listener, validation);
            on(el, 'input', this.onInput);
          }
        }
      },
      unlisten: function unlisten() {
        var el = this.getElementFrom(this.frag);

        if (this.onInput) {
          off(el, 'input', this.onInput);
          this.onInput = null;
        }

        if (this.onClick) {
          off(el, 'click', this.onClick);
          this.onClick = null;
        }

        if (this.onChange) {
          off(el, 'change', this.onChange);
          this.onChange = null;
        }

        if (this.onBlur) {
          off(el, 'blur', this.onBlur);
          this.onBlur = null;
        }
      },
      teardownValidate: function teardownValidate() {
        if (this.validator && this.validation) {
          var el = this.getElementFrom(this.frag);

          this.params.group && this.validator.removeGroupValidation(this.params.group, this.field);

          this.validator.unmanageValidation(this.field, el);

          this.validator = null;
          this.validation = null;
          this.field = null;
        }
      },
      setupFragment: function setupFragment() {
        this.anchor = createAnchor('v-validate');
        replace(this.el, this.anchor);

        this.factory = new FragmentFactory(this.vm, this.shimNode(this.el));
        this.frag = this.factory.create(this._host, this._scope, this._frag);
        this.frag.before(this.anchor);
      },
      teardownFragment: function teardownFragment() {
        if (this.frag) {
          this.frag.remove();
          this.frag = null;
          this.factory = null;
        }

        replace(this.anchor, this.el);
        this.anchor = null;
      },
      handleArray: function handleArray(value, old) {
        var _this = this;

        old && this.validation.resetValidation();

        each(value, function (val) {
          _this.validation.setValidation(val);
        });
      },
      handleObject: function handleObject(value, old) {
        var _this2 = this;

        old && this.validation.resetValidation();

        each(value, function (val, key) {
          if (isPlainObject(val)) {
            if ('rule' in val) {
              var msg = 'message' in val ? val.message : null;
              var initial = 'initial' in val ? val.initial : null;
              _this2.validation.setValidation(key, val.rule, msg, initial);
            }
          } else {
            _this2.validation.setValidation(key, val);
          }
        });
      },
      isDetectBlur: function isDetectBlur(detectBlur) {
        return detectBlur === undefined || detectBlur === 'on' || detectBlur === true;
      },
      isDetectChange: function isDetectChange(detectChange) {
        return detectChange === undefined || detectChange === 'on' || detectChange === true;
      },
      isInitialNoopValidation: function isInitialNoopValidation(initial) {
        return initial === 'off' || initial === false;
      },
      shimNode: function shimNode(node) {
        var ret = node;
        if (hasTextareaCloneBug) {
          if (node.tagName === 'TEXTAREA') {
            ret = node.cloneNode(true);
            ret.value = node.value;
            var i = ret.childNodes.length;
            while (i--) {
              ret.removeChild(ret.childNodes[i]);
            }
          }
        }
        return ret;
      },
      getElementFrom: function getElementFrom(frag) {
        return frag.single ? frag.node : frag.node.nextSibling;
      }
    });
  }

  /**
   * BaseValidation class
   */

  var BaseValidation = function () {
    function BaseValidation(field, model, vm, el, scope, validator, filters, detectBlur, detectChange) {
      babelHelpers.classCallCheck(this, BaseValidation);

      this.field = field;
      this.touched = false;
      this.dirty = false;
      this.modified = false;

      this._modified = false;
      this._model = model;
      this._filters = filters;
      this._validator = validator;
      this._vm = vm;
      this._el = el;
      this._forScope = scope;
      this._init = this._getValue(el);
      this._validators = {};
      this._detectBlur = detectBlur;
      this._detectChange = detectChange;
      this._classes = {};
    }

    BaseValidation.prototype.manageElement = function manageElement(el, initial) {
      var _this = this;

      var scope = this._getScope();
      var model = this._model;

      this._initial = initial;

      var classIds = el.getAttribute(VALIDATE_UPDATE);
      if (classIds) {
        el.removeAttribute(VALIDATE_UPDATE);
        this._classIds = classIds.split(',');
      }

      if (model) {
        el.value = this._evalModel(model, this._filters);
        this._unwatch = scope.$watch(model, function (val, old) {
          if (val !== old) {
            if (_this.guardValidate(el, 'input')) {
              return;
            }

            _this.handleValidate(el, { noopable: _this._initial });
            if (_this._initial) {
              _this._initial = null;
            }
          }
        }, { deep: true });
      }
    };

    BaseValidation.prototype.unmanageElement = function unmanageElement(el) {
      this._unwatch && this._unwatch();
    };

    BaseValidation.prototype.resetValidation = function resetValidation() {
      var _this2 = this;

      var keys = Object.keys(this._validators);
      each(keys, function (key, index) {
        _this2._validators[key] = null;
        delete _this2._validators[key];
      });
    };

    BaseValidation.prototype.setValidation = function setValidation(name, arg, msg, initial) {
      var validator = this._validators[name];
      if (!validator) {
        validator = this._validators[name] = {};
        validator.name = name;
      }

      validator.arg = arg;
      if (msg) {
        validator.msg = msg;
      }

      if (initial) {
        validator.initial = initial;
        validator._isNoopable = true;
      }
    };

    BaseValidation.prototype.setValidationClasses = function setValidationClasses(classes) {
      var _this3 = this;

      each(classes, function (value, key) {
        _this3._classes[key] = value;
      });
    };

    BaseValidation.prototype.willUpdateFlags = function willUpdateFlags() {
      var touched = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      touched && this.willUpdateTouched(this._el, 'blur');
      this.willUpdateDirty(this._el);
      this.willUpdateModified(this._el);
    };

    BaseValidation.prototype.willUpdateTouched = function willUpdateTouched(el, type) {
      if (type && type === 'blur') {
        this.touched = true;
        this._fireEvent(el, 'touched');
      }
    };

    BaseValidation.prototype.willUpdateDirty = function willUpdateDirty(el) {
      if (!this.dirty && this._checkModified(el)) {
        this.dirty = true;
        this._fireEvent(el, 'dirty');
      }
    };

    BaseValidation.prototype.willUpdateModified = function willUpdateModified(el) {
      this.modified = this._checkModified(el);
      if (this._modified !== this.modified) {
        this._fireEvent(el, 'modified', { modified: this.modified });
        this._modified = this.modified;
      }
    };

    BaseValidation.prototype.listener = function listener(e) {
      if (this.guardValidate(e.target, e.type)) {
        return;
      }

      this.handleValidate(e.target, { type: e.type });
    };

    BaseValidation.prototype.handleValidate = function handleValidate(el) {
      var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var _ref$type = _ref.type;
      var type = _ref$type === undefined ? null : _ref$type;
      var _ref$noopable = _ref.noopable;
      var noopable = _ref$noopable === undefined ? false : _ref$noopable;

      this.willUpdateTouched(el, type);
      this.willUpdateDirty(el);
      this.willUpdateModified(el);

      this._validator.validate({ field: this.field, el: el, noopable: noopable });
    };

    BaseValidation.prototype.validate = function validate(cb) {
      var _this4 = this;

      var noopable = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      var el = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      var _ = exports$1.Vue.util;

      var results = {};
      var errors = [];
      var valid = true;

      this._runValidators(function (descriptor, name, done) {
        var asset = _this4._resolveValidator(name);
        var validator = null;
        var msg = null;

        if (_.isPlainObject(asset)) {
          if (asset.check && typeof asset.check === 'function') {
            validator = asset.check;
          }
          if (asset.message) {
            msg = asset.message;
          }
        } else if (typeof asset === 'function') {
          validator = asset;
        }

        if (descriptor.msg) {
          msg = descriptor.msg;
        }

        if (noopable) {
          results[name] = false;
          return done();
        }

        if (descriptor._isNoopable) {
          results[name] = false;
          descriptor._isNoopable = null;
          return done();
        }

        if (validator) {
          var value = _this4._getValue(_this4._el);
          _this4._invokeValidator(_this4._vm, validator, value, descriptor.arg, function (ret, err) {
            if (!ret) {
              valid = false;
              if (err) {
                // async error message
                errors.push({ validator: name, message: err });
                results[name] = err;
              } else if (msg) {
                var error = { validator: name };
                error.message = typeof msg === 'function' ? msg.call(_this4._vm, _this4.field, descriptor.arg) : msg;
                errors.push(error);
                results[name] = error.message;
              } else {
                results[name] = !ret;
              }
            } else {
              results[name] = !ret;
            }

            done();
          });
        } else {
          done();
        }
      }, function () {
        // finished
        _this4._fireEvent(_this4._el, valid ? 'valid' : 'invalid');

        var props = {
          valid: valid,
          invalid: !valid,
          touched: _this4.touched,
          untouched: !_this4.touched,
          dirty: _this4.dirty,
          pristine: !_this4.dirty,
          modified: _this4.modified
        };
        if (!empty(errors)) {
          props.errors = errors;
        }
        _.extend(results, props);

        _this4.willUpdateClasses(results, el);

        cb(results);
      });
    };

    BaseValidation.prototype.resetFlags = function resetFlags() {
      this.touched = false;
      this.dirty = false;
      this.modified = false;
      this._modified = false;
    };

    BaseValidation.prototype.reset = function reset() {
      each(this._validators, function (descriptor, key) {
        if (descriptor.initial && !descriptor._isNoopable) {
          descriptor._isNoopable = true;
        }
      });
      this.resetFlags();
      this._init = this._getValue(this._el);
    };

    BaseValidation.prototype.willUpdateClasses = function willUpdateClasses(results) {
      var _this5 = this;

      var el = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      if (this._checkClassIds(el)) {
        (function () {
          var classIds = _this5._getClassIds(el);
          _this5.vm.$nextTick(function () {
            _this5.vm.$emit(VALIDATE_UPDATE, classIds, _this5, results);
          });
        })();
      } else {
        this.updateClasses(results);
      }
    };

    BaseValidation.prototype.updateClasses = function updateClasses(results) {
      var el = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      this._updateClasses(el || this._el, results);
    };

    BaseValidation.prototype.guardValidate = function guardValidate(el, type) {
      if (type && type === 'blur' && !this.detectBlur) {
        return true;
      }

      if (type && type === 'input' && !this.detectChange) {
        return true;
      }

      if (type && type === 'change' && !this.detectChange) {
        return true;
      }

      if (type && type === 'click' && !this.detectChange) {
        return true;
      }

      return false;
    };

    BaseValidation.prototype._getValue = function _getValue(el) {
      return el.value;
    };

    BaseValidation.prototype._getScope = function _getScope() {
      return this._forScope || this._vm;
    };

    BaseValidation.prototype._getClassIds = function _getClassIds(el) {
      return this._classIds;
    };

    BaseValidation.prototype._checkModified = function _checkModified(target) {
      return this._init !== this._getValue(target);
    };

    BaseValidation.prototype._checkClassIds = function _checkClassIds(el) {
      return this._getClassIds(el);
    };

    BaseValidation.prototype._fireEvent = function _fireEvent(el, type, args) {
      trigger(el, type, args);
    };

    BaseValidation.prototype._evalModel = function _evalModel(model, filters) {
      var scope = this._getScope();

      var val = null;
      if (filters) {
        val = scope.$get(model);
        return filters ? this._applyFilters(val, null, filters) : val;
      } else {
        val = scope.$get(model);
        return val === undefined || val === null ? '' : val;
      }
    };

    BaseValidation.prototype._updateClasses = function _updateClasses(el, results) {
      this._toggleValid(el, results.valid);
      this._toggleTouched(el, results.touched);
      this._togglePristine(el, results.pristine);
      this._toggleModfied(el, results.modified);
    };

    BaseValidation.prototype._toggleValid = function _toggleValid(el, valid) {
      var _util$Vue$util = exports$1.Vue.util;
      var addClass = _util$Vue$util.addClass;
      var removeClass = _util$Vue$util.removeClass;

      var validClass = this._classes.valid || 'valid';
      var invalidClass = this._classes.invalid || 'invalid';

      if (valid) {
        toggleClasses(el, validClass, addClass);
        toggleClasses(el, invalidClass, removeClass);
      } else {
        toggleClasses(el, validClass, removeClass);
        toggleClasses(el, invalidClass, addClass);
      }
    };

    BaseValidation.prototype._toggleTouched = function _toggleTouched(el, touched) {
      var _util$Vue$util2 = exports$1.Vue.util;
      var addClass = _util$Vue$util2.addClass;
      var removeClass = _util$Vue$util2.removeClass;

      var touchedClass = this._classes.touched || 'touched';
      var untouchedClass = this._classes.untouched || 'untouched';

      if (touched) {
        toggleClasses(el, touchedClass, addClass);
        toggleClasses(el, untouchedClass, removeClass);
      } else {
        toggleClasses(el, touchedClass, removeClass);
        toggleClasses(el, untouchedClass, addClass);
      }
    };

    BaseValidation.prototype._togglePristine = function _togglePristine(el, pristine) {
      var _util$Vue$util3 = exports$1.Vue.util;
      var addClass = _util$Vue$util3.addClass;
      var removeClass = _util$Vue$util3.removeClass;

      var pristineClass = this._classes.pristine || 'pristine';
      var dirtyClass = this._classes.dirty || 'dirty';

      if (pristine) {
        toggleClasses(el, pristineClass, addClass);
        toggleClasses(el, dirtyClass, removeClass);
      } else {
        toggleClasses(el, pristineClass, removeClass);
        toggleClasses(el, dirtyClass, addClass);
      }
    };

    BaseValidation.prototype._toggleModfied = function _toggleModfied(el, modified) {
      var _util$Vue$util4 = exports$1.Vue.util;
      var addClass = _util$Vue$util4.addClass;
      var removeClass = _util$Vue$util4.removeClass;

      var modifiedClass = this._classes.modified || 'modified';

      if (modified) {
        toggleClasses(el, modifiedClass, addClass);
      } else {
        toggleClasses(el, modifiedClass, removeClass);
      }
    };

    BaseValidation.prototype._applyFilters = function _applyFilters(value, oldValue, filters, write) {
      var resolveAsset = exports$1.Vue.util.resolveAsset;
      var scope = this._getScope();

      var filter = void 0,
          fn = void 0,
          args = void 0,
          arg = void 0,
          offset = void 0,
          i = void 0,
          l = void 0,
          j = void 0,
          k = void 0;
      for (i = 0, l = filters.length; i < l; i++) {
        filter = filters[i];
        fn = resolveAsset(this._vm.$options, 'filters', filter.name);
        if (!fn) {
          continue;
        }

        fn = write ? fn.write : fn.read || fn;
        if (typeof fn !== 'function') {
          continue;
        }

        args = write ? [value, oldValue] : [value];
        offset = write ? 2 : 1;
        if (filter.args) {
          for (j = 0, k = filter.args.length; j < k; j++) {
            arg = filter.args[j];
            args[j + offset] = arg.dynamic ? scope.$get(arg.value) : arg.value;
          }
        }

        value = fn.apply(this._vm, args);
      }

      return value;
    };

    BaseValidation.prototype._runValidators = function _runValidators(fn, cb) {
      var validators = this._validators;
      var length = Object.keys(validators).length;

      var count = 0;
      each(validators, function (descriptor, name) {
        fn(descriptor, name, function () {
          ++count;
          count >= length && cb();
        });
      });
    };

    BaseValidation.prototype._invokeValidator = function _invokeValidator(vm, validator, val, arg, cb) {
      var future = validator.call(this, val, arg);
      if (typeof future === 'function') {
        // function 
        future(function () {
          // resolve
          cb(true);
        }, function (msg) {
          // reject
          cb(false, msg);
        });
      } else if (isPromise(future)) {
        // promise
        future.then(function () {
          // resolve
          cb(true);
        }, function (msg) {
          // reject
          cb(false, msg);
        }).catch(function (err) {
          cb(false, err.message);
        });
      } else {
        // sync
        cb(future);
      }
    };

    BaseValidation.prototype._resolveValidator = function _resolveValidator(name) {
      var resolveAsset = exports$1.Vue.util.resolveAsset;
      return resolveAsset(this._vm.$options, 'validators', name);
    };

    babelHelpers.createClass(BaseValidation, [{
      key: 'vm',
      get: function get() {
        return this._vm;
      }
    }, {
      key: 'el',
      get: function get() {
        return this._el;
      }
    }, {
      key: 'detectChange',
      get: function get() {
        return this._detectChange;
      },
      set: function set(val) {
        this._detectChange = val;
      }
    }, {
      key: 'detectBlur',
      get: function get() {
        return this._detectBlur;
      },
      set: function set(val) {
        this._detectBlur = val;
      }
    }]);
    return BaseValidation;
  }();

  /**
   * CheckboxValidation class
   */

  var CheckboxValidation = function (_BaseValidation) {
    babelHelpers.inherits(CheckboxValidation, _BaseValidation);

    function CheckboxValidation(field, model, vm, el, scope, validator, filters, detectBlur, detectChange) {
      babelHelpers.classCallCheck(this, CheckboxValidation);

      var _this = babelHelpers.possibleConstructorReturn(this, _BaseValidation.call(this, field, model, vm, el, scope, validator, filters, detectBlur, detectChange));

      _this._inits = [];
      return _this;
    }

    CheckboxValidation.prototype.manageElement = function manageElement(el, initial) {
      var _this2 = this;

      var scope = this._getScope();
      var item = this._addItem(el, initial);

      var model = item.model = this._model;
      if (model) {
        var value = this._evalModel(model, this._filters);
        if (Array.isArray(value)) {
          this._setChecked(value, item.el);
          item.unwatch = scope.$watch(model, function (val, old) {
            if (val !== old) {
              if (_this2.guardValidate(item.el, 'change')) {
                return;
              }

              _this2.handleValidate(item.el, { noopable: item.initial });
              if (item.initial) {
                item.initial = null;
              }
            }
          });
        } else {
          el.checked = value || false;
          this._init = el.checked;
          item.init = el.checked;
          item.value = el.value;
          item.unwatch = scope.$watch(model, function (val, old) {
            if (val !== old) {
              if (_this2.guardValidate(el, 'change')) {
                return;
              }

              _this2.handleValidate(el, { noopable: item.initial });
              if (item.initial) {
                item.initial = null;
              }
            }
          });
        }
      } else {
        var options = { field: this.field, noopable: initial };
        if (this._checkClassIds(el)) {
          options.el = el;
        }
        this._validator.validate(options);
      }
    };

    CheckboxValidation.prototype.unmanageElement = function unmanageElement(el) {
      var found = -1;
      each(this._inits, function (item, index) {
        if (item.el === el) {
          found = index;
          if (item.unwatch && item.model) {
            item.unwatch();
            item.unwatch = null;
            item.model = null;
          }
        }
      });
      if (found === -1) {
        return;
      }

      this._inits.splice(found, 1);
      this._validator.validate({ field: this.field });
    };

    CheckboxValidation.prototype.willUpdateFlags = function willUpdateFlags() {
      var _this3 = this;

      var touched = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      each(this._inits, function (item, index) {
        touched && _this3.willUpdateTouched(item.el, 'blur');
        _this3.willUpdateDirty(item.el);
        _this3.willUpdateModified(item.el);
      });
    };

    CheckboxValidation.prototype.reset = function reset() {
      this.resetFlags();
      each(this._inits, function (item, index) {
        item.init = item.el.checked;
        item.value = item.el.value;
      });
    };

    CheckboxValidation.prototype.updateClasses = function updateClasses(results) {
      var _this4 = this;

      var el = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      if (el) {
        // for another element
        this._updateClasses(el, results);
      } else {
        each(this._inits, function (item, index) {
          _this4._updateClasses(item.el, results);
        });
      }
    };

    CheckboxValidation.prototype._addItem = function _addItem(el, initial) {
      var item = {
        el: el,
        init: el.checked,
        value: el.value,
        initial: initial
      };

      var classIds = el.getAttribute(VALIDATE_UPDATE);
      if (classIds) {
        el.removeAttribute(VALIDATE_UPDATE);
        item.classIds = classIds.split(',');
      }

      this._inits.push(item);
      return item;
    };

    CheckboxValidation.prototype._setChecked = function _setChecked(values, el) {
      for (var i = 0, l = values.length; i < l; i++) {
        var value = values[i];
        if (!el.disabled && el.value === value && !el.checked) {
          el.checked = true;
        }
      }
    };

    CheckboxValidation.prototype._getValue = function _getValue(el) {
      var _this5 = this;

      if (!this._inits || this._inits.length === 0) {
        return el.checked;
      } else {
        var _ret = function () {
          var vals = [];
          each(_this5._inits, function (item, index) {
            item.el.checked && vals.push(item.el.value);
          });
          return {
            v: vals
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret)) === "object") return _ret.v;
      }
    };

    CheckboxValidation.prototype._getClassIds = function _getClassIds(el) {
      var classIds = void 0;
      each(this._inits, function (item, index) {
        if (item.el === el) {
          classIds = item.classIds;
        }
      });
      return classIds;
    };

    CheckboxValidation.prototype._checkModified = function _checkModified(target) {
      var _this6 = this;

      if (this._inits.length === 0) {
        return this._init !== target.checked;
      } else {
        var _ret2 = function () {
          var modified = false;
          each(_this6._inits, function (item, index) {
            if (!modified) {
              modified = item.init !== item.el.checked;
            }
          });
          return {
            v: modified
          };
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret2)) === "object") return _ret2.v;
      }
    };

    return CheckboxValidation;
  }(BaseValidation);

  /**
   * RadioValidation class
   */

  var RadioValidation = function (_BaseValidation) {
    babelHelpers.inherits(RadioValidation, _BaseValidation);

    function RadioValidation(field, model, vm, el, scope, validator, filters, detectBlur, detectChange) {
      babelHelpers.classCallCheck(this, RadioValidation);

      var _this = babelHelpers.possibleConstructorReturn(this, _BaseValidation.call(this, field, model, vm, el, scope, validator, filters, detectBlur, detectChange));

      _this._inits = [];
      return _this;
    }

    RadioValidation.prototype.manageElement = function manageElement(el, initial) {
      var _this2 = this;

      var scope = this._getScope();
      var item = this._addItem(el, initial);

      var model = item.model = this._model;
      if (model) {
        var value = this._evalModel(model, this._filters);
        this._setChecked(value, el, item);
        item.unwatch = scope.$watch(model, function (val, old) {
          if (val !== old) {
            if (_this2.guardValidate(item.el, 'change')) {
              return;
            }

            _this2.handleValidate(el, { noopable: item.initial });
            if (item.initial) {
              item.initial = null;
            }
          }
        });
      } else {
        var options = { field: this.field, noopable: initial };
        if (this._checkClassIds(el)) {
          options.el = el;
        }
        this._validator.validate(options);
      }
    };

    RadioValidation.prototype.unmanageElement = function unmanageElement(el) {
      var found = -1;
      each(this._inits, function (item, index) {
        if (item.el === el) {
          found = index;
        }
      });
      if (found === -1) {
        return;
      }

      this._inits.splice(found, 1);
      this._validator.validate({ field: this.field });
    };

    RadioValidation.prototype.willUpdateFlags = function willUpdateFlags() {
      var _this3 = this;

      var touched = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      each(this._inits, function (item, index) {
        touched && _this3.willUpdateTouched(item.el, 'blur');
        _this3.willUpdateDirty(item.el);
        _this3.willUpdateModified(item.el);
      });
    };

    RadioValidation.prototype.reset = function reset() {
      this.resetFlags();
      each(this._inits, function (item, index) {
        item.init = item.el.checked;
        item.value = item.el.value;
      });
    };

    RadioValidation.prototype.updateClasses = function updateClasses(results) {
      var _this4 = this;

      var el = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      if (el) {
        // for another element
        this._updateClasses(el, results);
      } else {
        each(this._inits, function (item, index) {
          _this4._updateClasses(item.el, results);
        });
      }
    };

    RadioValidation.prototype._addItem = function _addItem(el, initial) {
      var item = {
        el: el,
        init: el.checked,
        value: el.value,
        initial: initial
      };

      var classIds = el.getAttribute(VALIDATE_UPDATE);
      if (classIds) {
        el.removeAttribute(VALIDATE_UPDATE);
        item.classIds = classIds.split(',');
      }

      this._inits.push(item);
      return item;
    };

    RadioValidation.prototype._setChecked = function _setChecked(value, el, item) {
      if (el.value === value) {
        el.checked = true;
        this._init = el.checked;
        item.init = el.checked;
        item.value = value;
      }
    };

    RadioValidation.prototype._getValue = function _getValue(el) {
      var _this5 = this;

      if (!this._inits || this._inits.length === 0) {
        return el.checked;
      } else {
        var _ret = function () {
          var vals = [];
          each(_this5._inits, function (item, index) {
            item.el.checked && vals.push(item.el.value);
          });
          return {
            v: vals
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret)) === "object") return _ret.v;
      }
    };

    RadioValidation.prototype._getClassIds = function _getClassIds(el) {
      var classIds = void 0;
      each(this._inits, function (item, index) {
        if (item.el === el) {
          classIds = item.classIds;
        }
      });
      return classIds;
    };

    RadioValidation.prototype._checkModified = function _checkModified(target) {
      var _this6 = this;

      if (this._inits.length === 0) {
        return this._init !== target.checked;
      } else {
        var _ret2 = function () {
          var modified = false;
          each(_this6._inits, function (item, index) {
            if (!modified) {
              modified = item.init !== item.el.checked;
            }
          });
          return {
            v: modified
          };
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret2)) === "object") return _ret2.v;
      }
    };

    return RadioValidation;
  }(BaseValidation);

  /**
   * SelectValidation class
   */

  var SelectValidation = function (_BaseValidation) {
    babelHelpers.inherits(SelectValidation, _BaseValidation);

    function SelectValidation(field, model, vm, el, scope, validator, filters, detectBlur, detectChange) {
      babelHelpers.classCallCheck(this, SelectValidation);

      var _this = babelHelpers.possibleConstructorReturn(this, _BaseValidation.call(this, field, model, vm, el, scope, validator, filters, detectBlur, detectChange));

      _this._multiple = _this._el.hasAttribute('multiple');
      return _this;
    }

    SelectValidation.prototype.manageElement = function manageElement(el, initial) {
      var _this2 = this;

      var scope = this._getScope();
      var model = this._model;

      this._initial = initial;

      var classIds = el.getAttribute(VALIDATE_UPDATE);
      if (classIds) {
        el.removeAttribute(VALIDATE_UPDATE);
        this._classIds = classIds.split(',');
      }

      if (model) {
        var value = this._evalModel(model, this._filters);
        var values = !Array.isArray(value) ? [value] : value;
        this._setOption(values, el);
        this._unwatch = scope.$watch(model, function (val, old) {
          var values1 = !Array.isArray(val) ? [val] : val;
          var values2 = !Array.isArray(old) ? [old] : old;
          if (values1.slice().sort().toString() !== values2.slice().sort().toString()) {
            if (_this2.guardValidate(el, 'change')) {
              return;
            }

            _this2.handleValidate(el, { noopable: _this2._initial });
            if (_this2._initial) {
              _this2._initial = null;
            }
          }
        });
      }
    };

    SelectValidation.prototype.unmanageElement = function unmanageElement(el) {
      this._unwatch && this._unwatch();
    };

    SelectValidation.prototype.reset = function reset() {
      this.resetFlags();
    };

    SelectValidation.prototype._getValue = function _getValue(el) {
      var ret = [];

      for (var i = 0, l = el.options.length; i < l; i++) {
        var option = el.options[i];
        if (!option.disabled && option.selected) {
          ret.push(option.value);
        }
      }

      return ret;
    };

    SelectValidation.prototype._setOption = function _setOption(values, el) {
      for (var i = 0, l = values.length; i < l; i++) {
        var value = values[i];
        for (var j = 0, m = el.options.length; j < m; j++) {
          var option = el.options[j];
          if (!option.disabled && option.value === value && (!option.hasAttribute('selected') || !option.selected)) {
            option.selected = true;
          }
        }
      }
    };

    SelectValidation.prototype._checkModified = function _checkModified(target) {
      var values = this._getValue(target).slice().sort();
      if (this._init.length !== values.length) {
        return true;
      } else {
        var inits = this._init.slice().sort();
        return inits.toString() !== values.toString();
      }
    };

    return SelectValidation;
  }(BaseValidation);

  /**
   * Validator class
   */

  var Validator$1 = function () {
    function Validator(name, dir, groups, classes) {
      var _this = this;

      babelHelpers.classCallCheck(this, Validator);

      this.name = name;

      this._scope = {};
      this._dir = dir;
      this._validations = {};
      this._checkboxValidations = {};
      this._radioValidations = {};
      this._groups = groups;
      this._groupValidations = {};
      this._events = {};
      this._modified = false;
      this._classes = classes;

      each(groups, function (group) {
        _this._groupValidations[group] = [];
      });
    }

    Validator.prototype.enableReactive = function enableReactive() {
      var vm = this._dir.vm;

      // define the validation scope
      exports$1.Vue.util.defineReactive(vm, this.name, this._scope);
      vm._validatorMaps[this.name] = this;

      // define the validation resetting meta method to vue instance
      this._defineResetValidation();

      // define the validate manually meta method to vue instance
      this._defineValidate();

      // define manually the validation errors
      this._defineSetValidationErrors();
    };

    Validator.prototype.disableReactive = function disableReactive() {
      var vm = this._dir.vm;
      vm.$setValidationErrors = null;
      delete vm['$setValidationErrors'];
      vm.$validate = null;
      delete vm['$validate'];
      vm.$validatorReset = null;
      delete vm['$validatorReset'];
      vm._validatorMaps[this.name] = null;
      delete vm._validatorMaps[this.name];
      vm[this.name] = null;
      delete vm[this.name];
    };

    Validator.prototype.registerEvents = function registerEvents() {
      var isSimplePath = exports$1.Vue.parsers.expression.isSimplePath;

      var attrs = this._dir.el.attributes;
      for (var i = 0, l = attrs.length; i < l; i++) {
        var event = attrs[i].name;
        if (REGEX_EVENT.test(event)) {
          var value = attrs[i].value;
          if (isSimplePath(value)) {
            value += '.apply(this, $arguments)';
          }
          event = event.replace(REGEX_EVENT, '');
          this._events[this._getEventName(event)] = this._dir.vm.$eval(value, true);
        }
      }
    };

    Validator.prototype.unregisterEvents = function unregisterEvents() {
      var _this2 = this;

      each(this._events, function (handler, event) {
        _this2._events[event] = null;
        delete _this2._events[event];
      });
    };

    Validator.prototype.manageValidation = function manageValidation(field, model, vm, el, scope, filters, initial, detectBlur, detectChange) {
      var validation = null;

      if (el.tagName === 'SELECT') {
        validation = this._manageSelectValidation(field, model, vm, el, scope, filters, initial, detectBlur, detectChange);
      } else if (el.type === 'checkbox') {
        validation = this._manageCheckboxValidation(field, model, vm, el, scope, filters, initial, detectBlur, detectChange);
      } else if (el.type === 'radio') {
        validation = this._manageRadioValidation(field, model, vm, el, scope, filters, initial, detectBlur, detectChange);
      } else {
        validation = this._manageBaseValidation(field, model, vm, el, scope, filters, initial, detectBlur, detectChange);
      }

      validation.setValidationClasses(this._classes);

      return validation;
    };

    Validator.prototype.unmanageValidation = function unmanageValidation(field, el) {
      if (el.type === 'checkbox') {
        this._unmanageCheckboxValidation(field, el);
      } else if (el.type === 'radio') {
        this._unmanageRadioValidation(field, el);
      } else if (el.tagName === 'SELECT') {
        this._unmanageSelectValidation(field, el);
      } else {
        this._unmanageBaseValidation(field, el);
      }
    };

    Validator.prototype.addGroupValidation = function addGroupValidation(group, field) {
      var indexOf = exports$1.Vue.util.indexOf;

      var validation = this._getValidationFrom(field);
      var validations = this._groupValidations[group];

      validations && !~indexOf(validations, validation) && validations.push(validation);
    };

    Validator.prototype.removeGroupValidation = function removeGroupValidation(group, field) {
      var validation = this._getValidationFrom(field);
      var validations = this._groupValidations[group];

      validations && pull(validations, validation);
    };

    Validator.prototype.validate = function validate() {
      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _ref$el = _ref.el;
      var el = _ref$el === undefined ? null : _ref$el;
      var _ref$field = _ref.field;
      var field = _ref$field === undefined ? null : _ref$field;
      var _ref$touched = _ref.touched;
      var touched = _ref$touched === undefined ? false : _ref$touched;
      var _ref$noopable = _ref.noopable;
      var noopable = _ref$noopable === undefined ? false : _ref$noopable;
      var _ref$cb = _ref.cb;
      var cb = _ref$cb === undefined ? null : _ref$cb;

      if (!field) {
        // all
        each(this.validations, function (validation, key) {
          validation.willUpdateFlags(touched);
        });
        this._validates(cb);
      } else {
        // each field
        this._validate(field, touched, noopable, el, cb);
      }
    };

    Validator.prototype.setupScope = function setupScope() {
      var _this3 = this;

      this._defineProperties(function () {
        return _this3.validations;
      }, function () {
        return _this3._scope;
      });

      each(this._groups, function (name) {
        var validations = _this3._groupValidations[name];
        var group = {};
        exports$1.Vue.set(_this3._scope, name, group);
        _this3._defineProperties(function () {
          return validations;
        }, function () {
          return group;
        });
      });
    };

    Validator.prototype.waitFor = function waitFor(cb) {
      var method = '$activateValidator';
      var vm = this._dir.vm;

      vm[method] = function () {
        cb();
        vm[method] = null;
      };
    };

    Validator.prototype._defineResetValidation = function _defineResetValidation() {
      var _this4 = this;

      this._dir.vm.$resetValidation = function (cb) {
        _this4._resetValidation(cb);
      };
    };

    Validator.prototype._defineValidate = function _defineValidate() {
      var _this5 = this;

      this._dir.vm.$validate = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var field = null;
        var touched = false;
        var cb = null;

        each(args, function (arg, index) {
          if (typeof arg === 'string') {
            field = arg;
          } else if (typeof arg === 'boolean') {
            touched = arg;
          } else if (typeof arg === 'function') {
            cb = arg;
          }
        });

        _this5.validate({ field: field, touched: touched, cb: cb });
      };
    };

    Validator.prototype._defineSetValidationErrors = function _defineSetValidationErrors() {
      var _this6 = this;

      this._dir.vm.$setValidationErrors = function (errors) {
        _this6._setValidationErrors(errors);
      };
    };

    Validator.prototype._validate = function _validate(field) {
      var touched = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      var noopable = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      var _this7 = this;

      var el = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
      var cb = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];

      var scope = this._scope;

      var validation = this._getValidationFrom(field);
      if (validation) {
        validation.willUpdateFlags(touched);
        validation.validate(function (results) {
          exports$1.Vue.set(scope, field, results);
          _this7._fireEvents();
          cb && cb();
        }, noopable, el);
      }
    };

    Validator.prototype._validates = function _validates(cb) {
      var _this8 = this;

      var scope = this._scope;

      this._runValidates(function (validation, key, done) {
        validation.validate(function (results) {
          exports$1.Vue.set(scope, key, results);
          done();
        });
      }, function () {
        // finished
        _this8._fireEvents();
        cb && cb();
      });
    };

    Validator.prototype._getValidationFrom = function _getValidationFrom(field) {
      return this._validations[field] || this._checkboxValidations[field] && this._checkboxValidations[field].validation || this._radioValidations[field] && this._radioValidations[field].validation;
    };

    Validator.prototype._resetValidation = function _resetValidation(cb) {
      each(this.validations, function (validation, key) {
        validation.reset();
      });
      this._validates(cb);
    };

    Validator.prototype._setValidationErrors = function _setValidationErrors(errors) {
      var _this9 = this;

      var extend = exports$1.Vue.util.extend;

      // make tempolaly errors

      var temp = {};
      each(errors, function (error, index) {
        if (!temp[error.field]) {
          temp[error.field] = [];
        }
        temp[error.field].push(error);
      });

      // set errors
      each(temp, function (values, field) {
        var results = _this9._scope[field];
        var newResults = {};

        each(values, function (error) {
          if (error.validator) {
            results[error.validator] = error.message;
          }
        });

        results.valid = false;
        results.invalid = true;
        results.errors = values;
        extend(newResults, results);

        var validation = _this9._getValidationFrom(field);
        validation.willUpdateClasses(newResults, validation.el);

        exports$1.Vue.set(_this9._scope, field, newResults);
      });
    };

    Validator.prototype._manageBaseValidation = function _manageBaseValidation(field, model, vm, el, scope, filters, initial, detectBlur, detectChange) {
      var validation = this._validations[field] = new BaseValidation(field, model, vm, el, scope, this, filters, detectBlur, detectChange);
      validation.manageElement(el, initial);
      return validation;
    };

    Validator.prototype._unmanageBaseValidation = function _unmanageBaseValidation(field, el) {
      var validation = this._validations[field];
      if (validation) {
        validation.unmanageElement(el);
        exports$1.Vue.delete(this._scope, field);
        this._validations[field] = null;
        delete this._validations[field];
      }
    };

    Validator.prototype._manageCheckboxValidation = function _manageCheckboxValidation(field, model, vm, el, scope, filters, initial, detectBlur, detectChange) {
      var validationSet = this._checkboxValidations[field];
      if (!validationSet) {
        var validation = new CheckboxValidation(field, model, vm, el, scope, this, filters, detectBlur, detectChange);
        validationSet = { validation: validation, elements: 0 };
        this._checkboxValidations[field] = validationSet;
      }

      validationSet.elements++;
      validationSet.validation.manageElement(el, initial);
      return validationSet.validation;
    };

    Validator.prototype._unmanageCheckboxValidation = function _unmanageCheckboxValidation(field, el) {
      var validationSet = this._checkboxValidations[field];
      if (validationSet) {
        validationSet.elements--;
        validationSet.validation.unmanageElement(el);
        if (validationSet.elements === 0) {
          exports$1.Vue.delete(this._scope, field);
          this._checkboxValidations[field] = null;
          delete this._checkboxValidations[field];
        }
      }
    };

    Validator.prototype._manageRadioValidation = function _manageRadioValidation(field, model, vm, el, scope, filters, initial, detectBlur, detectChange) {
      var validationSet = this._radioValidations[field];
      if (!validationSet) {
        var validation = new RadioValidation(field, model, vm, el, scope, this, filters, detectBlur, detectChange);
        validationSet = { validation: validation, elements: 0 };
        this._radioValidations[field] = validationSet;
      }

      validationSet.elements++;
      validationSet.validation.manageElement(el, initial);
      return validationSet.validation;
    };

    Validator.prototype._unmanageRadioValidation = function _unmanageRadioValidation(field, el) {
      var validationSet = this._radioValidations[field];
      if (validationSet) {
        validationSet.elements--;
        validationSet.validation.unmanageElement(el);
        if (validationSet.elements === 0) {
          exports$1.Vue.delete(this._scope, field);
          this._radioValidations[field] = null;
          delete this._radioValidations[field];
        }
      }
    };

    Validator.prototype._manageSelectValidation = function _manageSelectValidation(field, model, vm, el, scope, filters, initial, detectBlur, detectChange) {
      var validation = this._validations[field] = new SelectValidation(field, model, vm, el, scope, this, filters, detectBlur, detectChange);
      validation.manageElement(el, initial);
      return validation;
    };

    Validator.prototype._unmanageSelectValidation = function _unmanageSelectValidation(field, el) {
      var validation = this._validations[field];
      if (validation) {
        validation.unmanageElement(el);
        exports$1.Vue.delete(this._scope, field);
        this._validations[field] = null;
        delete this._validations[field];
      }
    };

    Validator.prototype._fireEvent = function _fireEvent(type) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var handler = this._events[this._getEventName(type)];
      handler && this._dir.vm.$nextTick(function () {
        handler.apply(null, args);
      });
    };

    Validator.prototype._fireEvents = function _fireEvents() {
      var scope = this._scope;

      scope.touched && this._fireEvent('touched');
      scope.dirty && this._fireEvent('dirty');

      if (this._modified !== scope.modified) {
        this._fireEvent('modified', scope.modified);
        this._modified = scope.modified;
      }

      var valid = scope.valid;
      this._fireEvent(valid ? 'valid' : 'invalid');
    };

    Validator.prototype._getEventName = function _getEventName(type) {
      return this.name + ':' + type;
    };

    Validator.prototype._defineProperties = function _defineProperties(validationsGetter, targetGetter) {
      var _this10 = this;

      var bind = exports$1.Vue.util.bind;

      each({
        valid: { fn: this._defineValid, arg: validationsGetter },
        invalid: { fn: this._defineInvalid, arg: targetGetter },
        touched: { fn: this._defineTouched, arg: validationsGetter },
        untouched: { fn: this._defineUntouched, arg: targetGetter },
        modified: { fn: this._defineModified, arg: validationsGetter },
        dirty: { fn: this._defineDirty, arg: validationsGetter },
        pristine: { fn: this._definePristine, arg: targetGetter },
        errors: { fn: this._defineErrors, arg: validationsGetter }
      }, function (descriptor, name) {
        Object.defineProperty(targetGetter(), name, {
          enumerable: true,
          configurable: true,
          get: function get() {
            return bind(descriptor.fn, _this10)(descriptor.arg);
          }
        });
      });
    };

    Validator.prototype._runValidates = function _runValidates(fn, cb) {
      var length = Object.keys(this.validations).length;

      var count = 0;
      each(this.validations, function (validation, key) {
        fn(validation, key, function () {
          ++count;
          count >= length && cb();
        });
      });
    };

    Validator.prototype._walkValidations = function _walkValidations(validations, property, condition) {
      var _this11 = this;

      var hasOwn = exports$1.Vue.util.hasOwn;
      var ret = condition;

      each(validations, function (validation, key) {
        if (ret === !condition) {
          return;
        }
        if (hasOwn(_this11._scope, validation.field)) {
          var target = _this11._scope[validation.field];
          if (target && target[property] === !condition) {
            ret = !condition;
          }
        }
      });

      return ret;
    };

    Validator.prototype._defineValid = function _defineValid(validationsGetter) {
      return this._walkValidations(validationsGetter(), 'valid', true);
    };

    Validator.prototype._defineInvalid = function _defineInvalid(scopeGetter) {
      return !scopeGetter().valid;
    };

    Validator.prototype._defineTouched = function _defineTouched(validationsGetter) {
      return this._walkValidations(validationsGetter(), 'touched', false);
    };

    Validator.prototype._defineUntouched = function _defineUntouched(scopeGetter) {
      return !scopeGetter().touched;
    };

    Validator.prototype._defineModified = function _defineModified(validationsGetter) {
      return this._walkValidations(validationsGetter(), 'modified', false);
    };

    Validator.prototype._defineDirty = function _defineDirty(validationsGetter) {
      return this._walkValidations(validationsGetter(), 'dirty', false);
    };

    Validator.prototype._definePristine = function _definePristine(scopeGetter) {
      return !scopeGetter().dirty;
    };

    Validator.prototype._defineErrors = function _defineErrors(validationsGetter) {
      var _this12 = this;

      var hasOwn = exports$1.Vue.util.hasOwn;
      var isPlainObject = exports$1.Vue.util.isPlainObject;
      var errors = [];

      each(validationsGetter(), function (validation, key) {
        if (hasOwn(_this12._scope, validation.field)) {
          var target = _this12._scope[validation.field];
          if (target && !empty(target.errors)) {
            each(target.errors, function (err, index) {
              var error = { field: validation.field };
              if (isPlainObject(err)) {
                if (err.validator) {
                  error.validator = err.validator;
                }
                error.message = err.message;
              } else if (typeof err === 'string') {
                error.message = err;
              }
              errors.push(error);
            });
          }
        }
      });

      return empty(errors) ? undefined : errors.sort(function (a, b) {
        return a.field < b.field ? -1 : 1;
      });
    };

    babelHelpers.createClass(Validator, [{
      key: 'validations',
      get: function get() {
        var extend = exports$1.Vue.util.extend;

        var ret = {};
        extend(ret, this._validations);

        each(this._checkboxValidations, function (dataset, key) {
          ret[key] = dataset.validation;
        });

        each(this._radioValidations, function (dataset, key) {
          ret[key] = dataset.validation;
        });

        return ret;
      }
    }]);
    return Validator;
  }();

  function Validator (Vue) {
    var FragmentFactory = Vue.FragmentFactory;
    var vIf = Vue.directive('if');
    var _Vue$util = Vue.util;
    var isArray = _Vue$util.isArray;
    var isPlainObject = _Vue$util.isPlainObject;
    var createAnchor = _Vue$util.createAnchor;
    var replace = _Vue$util.replace;
    var extend = _Vue$util.extend;
    var camelize = _Vue$util.camelize;

    /**
     * `validator` element directive
     */

    Vue.elementDirective('validator', {
      params: ['name', 'groups', 'lazy', 'classes'],

      bind: function bind() {
        var params = this.params;

        if ('development' !== 'production' && !params.name) {
          warn('validator element requires a \'name\' attribute: ' + '(e.g. <validator name="validator1">...</validator>)');
          return;
        }

        this.validatorName = '$' + camelize(params.name);
        if (!this.vm._validatorMaps) {
          throw new Error('Invalid validator management error');
        }

        var classes = {};
        if (isPlainObject(this.params.classes)) {
          classes = this.params.classes;
        }

        this.setupValidator(classes);
        this.setupFragment(params.lazy);
      },
      unbind: function unbind() {
        this.teardownFragment();
        this.teardownValidator();
      },
      getGroups: function getGroups() {
        var params = this.params;
        var groups = [];

        if (params.groups) {
          if (isArray(params.groups)) {
            groups = params.groups;
          } else if (!isPlainObject(params.groups) && typeof params.groups === 'string') {
            groups.push(params.groups);
          }
        }

        return groups;
      },
      setupValidator: function setupValidator(classes) {
        var validator = this.validator = new Validator$1(this.validatorName, this, this.getGroups(), classes);
        validator.enableReactive();
        validator.setupScope();
        validator.registerEvents();
      },
      teardownValidator: function teardownValidator() {
        this.validator.unregisterEvents();
        this.validator.disableReactive();

        if (this.validatorName) {
          this.validatorName = null;
          this.validator = null;
        }
      },
      setupFragment: function setupFragment(lazy) {
        var _this = this;

        var vm = this.vm;

        this.validator.waitFor(function () {
          _this.anchor = createAnchor('vue-validator');
          replace(_this.el, _this.anchor);
          extend(vm.$options, { _validator: _this.validatorName });
          _this.factory = new FragmentFactory(vm, _this.el.innerHTML);
          vIf.insert.call(_this);
        });

        !lazy && vm.$activateValidator();
      },
      teardownFragment: function teardownFragment() {
        vIf.unbind.call(this);
      }
    });
  }

  function ValidatorError (Vue) {
    /**
     * ValidatorError component
     */

    var error = {
      name: 'validator-error',

      props: {
        field: {
          type: String,
          required: true
        },
        validator: {
          type: String
        },
        message: {
          type: String,
          required: true
        },
        partial: {
          type: String,
          default: 'validator-error-default'
        }
      },

      template: '<div><partial :name="partial"></partial></div>',

      partials: {}
    };

    // only use ValidatorError component
    error.partials['validator-error-default'] = '<p>{{field}}: {{message}}</p>';

    return error;
  }

  function Errors (Vue) {
    var _ = Vue.util;
    var error = ValidatorError(Vue); // import ValidatorError component

    /**
     * ValidatorErrors component
     */

    var errors = {
      name: 'validator-errors',

      props: {
        validation: {
          type: Object,
          required: true
        },
        group: {
          type: String,
          default: null
        },
        field: {
          type: String,
          default: null
        },
        component: {
          type: String,
          default: 'validator-error'
        }
      },

      computed: {
        errors: function errors() {
          var _this = this;

          if (this.group !== null) {
            return this.validation[this.group].errors;
          } else if (this.field !== null) {
            var target = this.validation[this.field];
            if (!target.errors) {
              return;
            }

            return target.errors.map(function (error) {
              var err = { field: _this.field };
              if (_.isPlainObject(error)) {
                if (error.validator) {
                  err.validator = error.validator;
                }
                err.message = error.message;
              } else if (typeof error === 'string') {
                err.message = error;
              }
              return err;
            });
          } else {
            return this.validation.errors;
          }
        }
      },

      template: '<template v-for="error in errors">' + '<component :is="component" :partial="partial" :field="error.field" :validator="error.validator" :message="error.message">' + '</component>' + '</template>',

      components: {}
    };

    // define 'partial' prop
    errors.props['partial'] = error.props['partial'];

    // only use ValidatorErrors component
    errors.components[error.name] = error;

    // install ValidatorErrors component
    Vue.component(errors.name, errors);

    return errors;
  }

  /**
   * plugin
   *
   * @param {Function} Vue
   * @param {Object} options
   */

  function plugin(Vue) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (plugin.installed) {
      warn('already installed.');
      return;
    }

    exports$1.Vue = Vue;
    Asset(Vue);
    Errors(Vue);

    Override(Vue);
    Validator(Vue);
    ValidateClass(Vue);
    Validate(Vue);
  }

  plugin.version = '2.1.6';

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
  }

  return plugin;

}));