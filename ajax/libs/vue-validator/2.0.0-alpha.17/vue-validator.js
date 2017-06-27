/*!
 * vue-validator v2.0.0-alpha.17
 * (c) 2016 kazuya kawaguchi
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  global.VueValidator = factory();
}(this, function () { 'use strict';

  function babelHelpers_typeof (obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  function babelHelpers_classCallCheck (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var babelHelpers_createClass = (function () {
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
  })();

  function babelHelpers_inherits (subClass, superClass) {
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

  function babelHelpers_possibleConstructorReturn (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

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
    if (target === null) {
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
      return val.length > 0;
    } else if (typeof val === 'number' || typeof val === 'function') {
      return true;
    } else if (typeof val === 'boolean') {
      return val;
    } else if (typeof val === 'string') {
      return val.length > 0;
    } else if (val !== null && (typeof val === 'undefined' ? 'undefined' : babelHelpers_typeof(val)) === 'object') {
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

  function Validate (Vue) {

    var _ = Vue.util;
    var vIf = Vue.directive('if');
    var FragmentFactory = Vue.FragmentFactory;

    // register `v-validate` as terminal directive
    Vue.compiler.terminalDirectives.push('validate');

    /**
     * `v-validate` directive
     */

    Vue.directive('validate', {
      priority: vIf.priority + 1,
      params: ['group', 'field'],

      bind: function bind() {
        if (this.el.__vue__) {
          warn('v-validate="' + this.expression + '" cannot be ' + 'used on an instance root element.');
          return;
        }

        var validatorName = this.vm.$options._validator;
        if (!validatorName) {
          warn('v-validate need to use into validator element directive: ' + '(e.g. <validator name="validator">' + '<input type="text" v-validate:field1="[\'required\']">' + '</validator>).');
          return;
        }

        this.model = this.el.getAttribute('v-model');

        this.setupFragment();
        this.setupValidate(validatorName, this.model);
        this.listen();
      },
      update: function update(value, old) {
        if (!value) {
          return;
        }

        if (_.isPlainObject(value)) {
          this.handleObject(value);
        } else if (Array.isArray(value)) {
          this.handleArray(value);
        }

        this.validator.validate(this.validation);
      },
      unbind: function unbind() {
        this.unlisten();
        this.teardownValidate();
        this.teardownFragment();

        this.model = null;
      },
      setupValidate: function setupValidate(name, model) {
        var params = this.params;
        var validator = this.validator = this.vm._validatorMaps[name];

        this.field = _.camelize(this.arg ? this.arg : params.field);

        this.validation = validator.manageValidation(this.field, model, this.vm, this.frag.node, this._scope);

        if (params.group) {
          validator.addGroupValidation(params.group, this.field);
        }
      },
      listen: function listen() {
        var model = this.model;
        var validation = this.validation;
        var el = this.frag.node;

        this.onBlur = _.bind(validation.listener, validation);
        _.on(el, 'blur', this.onBlur);
        if ((el.type === 'checkbox' || el.type === 'radio' || el.tagName === 'SELECT') && !model) {
          this.onChange = _.bind(validation.listener, validation);
          _.on(el, 'change', this.onChange);
        } else {
          if (!model) {
            this.onInput = _.bind(validation.listener, validation);
            _.on(el, 'input', this.onInput);
          }
        }
      },
      unlisten: function unlisten() {
        var el = this.frag.node;

        if (this.onInput) {
          _.off(el, 'input', this.onInput);
          this.onInput = null;
        }

        if (this.onChange) {
          _.off(el, 'change', this.onChange);
          this.onChange = null;
        }

        if (this.onBlur) {
          _.off(el, 'blur', this.onBlur);
          this.onBlur = null;
        }
      },
      teardownValidate: function teardownValidate() {
        if (this.validator && this.validation) {
          var el = this.frag.node;

          if (this.params.group) {
            this.validator.removeGroupValidation(this.params.group, this.field);
          }

          this.validator.unmanageValidation(this.field, el);

          this.validator = null;
          this.validation = null;
          this.field = null;
        }
      },
      setupFragment: function setupFragment() {
        this.anchor = _.createAnchor('v-validate');
        _.replace(this.el, this.anchor);

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

        _.replace(this.anchor, this.el);
        this.anchor = null;
      },
      handleArray: function handleArray(value) {
        var _this = this;

        each(value, function (val) {
          _this.validation.setValidation(val);
        }, this);
      },
      handleObject: function handleObject(value) {
        var _this2 = this;

        each(value, function (val, key) {
          if (_.isPlainObject(val)) {
            if ('rule' in val) {
              var msg = 'message' in val ? val.message : null;
              _this2.validation.setValidation(key, val.rule, msg);
            }
          } else {
            _this2.validation.setValidation(key, val);
          }
        }, this);
      }
    });
  }

  /**
   * BaseValidation class
   */

  var BaseValidation = (function () {
    function BaseValidation(field, model, vm, el, scope, validator) {
      babelHelpers_classCallCheck(this, BaseValidation);

      this.field = field;
      this.touched = false;
      this.dirty = false;
      this.modified = false;

      this._modified = false;
      this._model = model;
      this._validator = validator;
      this._vm = vm;
      this._el = el;
      this._forScope = scope;
      this._init = this._getValue(el);
      this._validators = {};
    }

    babelHelpers_createClass(BaseValidation, [{
      key: 'manageElement',
      value: function manageElement(el) {
        var _this = this;

        var _ = exports$1.Vue.util;

        var scope = this._getScope();
        var model = this._model;
        if (model) {
          el.value = scope.$get(model) || '';
          this._unwatch = scope.$watch(model, _.bind(function (val, old) {
            if (val !== old) {
              _this.handleValidate(el);
            }
          }, this), { deep: true });
        }
      }
    }, {
      key: 'unmanageElement',
      value: function unmanageElement(el) {
        if (this._unwatch) {
          this._unwatch();
        }
      }
    }, {
      key: 'setValidation',
      value: function setValidation(name, arg, msg) {
        var validator = this._validators[name];
        if (!validator) {
          validator = this._validators[name] = {};
          validator.name = name;
        }

        validator.arg = arg;
        if (msg) {
          validator.msg = msg;
        }
      }
    }, {
      key: 'listener',
      value: function listener(e) {
        if (e.relatedTarget && (e.relatedTarget.tagName === 'A' || e.relatedTarget.tagName === 'BUTTON')) {
          return;
        }

        this.handleValidate(e.target, e.type);
      }
    }, {
      key: 'handleValidate',
      value: function handleValidate(el, type) {
        if (type && type === 'blur') {
          this.touched = true;
          this._fireEvent(el, 'touched');
        }

        if (!this.dirty && this._checkModified(el)) {
          this.dirty = true;
          this._fireEvent(el, 'dirty');
        }

        this.modified = this._checkModified(el);
        if (this._modified !== this.modified) {
          this._fireEvent(el, 'modified', { modified: this.modified });
          this._modified = this.modified;
        }

        this._validator.validate();
      }
    }, {
      key: 'validate',
      value: function validate() {
        var _this2 = this;

        var _ = exports$1.Vue.util;

        var results = {};
        var messages = {};
        var valid = true;

        each(this._validators, function (descriptor, name) {
          var asset = _this2._resolveValidator(name);
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

          if (validator) {
            var ret = validator.call(_this2._vm, _this2._getValue(_this2._el), descriptor.arg);
            if (!ret) {
              valid = false;
              if (msg) {
                messages[name] = typeof msg === 'function' ? msg.call(_this2._vm, _this2.field, descriptor.arg) : msg;
              }
            }
            results[name] = !ret;
          }
        }, this);

        this._fireEvent(this._el, valid ? 'valid' : 'invalid');

        var props = {
          valid: valid,
          invalid: !valid,
          touched: this.touched,
          untouched: !this.touched,
          dirty: this.dirty,
          pristine: !this.dirty,
          modified: this.modified
        };
        if (!empty(messages)) {
          props.messages = messages;
        }
        _.extend(results, props);

        return results;
      }
    }, {
      key: 'resetFlags',
      value: function resetFlags() {
        this.touched = false;
        this.dirty = false;
        this.modified = false;
        this._modified = false;
      }
    }, {
      key: 'reset',
      value: function reset() {
        this.resetFlags();
        this._init = this._getValue(this._el);
      }
    }, {
      key: '_getValue',
      value: function _getValue(el) {
        return el.value;
      }
    }, {
      key: '_getScope',
      value: function _getScope() {
        return this._forScope || this._vm;
      }
    }, {
      key: '_checkModified',
      value: function _checkModified(target) {
        return this._init !== this._getValue(target);
      }
    }, {
      key: '_fireEvent',
      value: function _fireEvent(el, type, args) {
        trigger(el, type, args);
      }
    }, {
      key: '_resolveValidator',
      value: function _resolveValidator(name) {
        var resolveAsset = exports$1.Vue.util.resolveAsset;
        return resolveAsset(this._vm.$options, 'validators', name);
      }
    }]);
    return BaseValidation;
  })();

  /**
   * SelectValidation class
   */

  var SelectValidation = (function (_BaseValidation) {
    babelHelpers_inherits(SelectValidation, _BaseValidation);

    function SelectValidation(field, model, vm, el, scope, validator) {
      babelHelpers_classCallCheck(this, SelectValidation);

      var _this = babelHelpers_possibleConstructorReturn(this, Object.getPrototypeOf(SelectValidation).call(this, field, model, vm, el, scope, validator));

      _this._multiple = _this._el.hasAttribute('multiple');
      return _this;
    }

    babelHelpers_createClass(SelectValidation, [{
      key: 'manageElement',
      value: function manageElement(el) {
        var _this2 = this;

        var _ = exports$1.Vue.util;

        var scope = this._getScope();
        var model = this._model;
        if (model) {
          var value = scope.$get(model);
          var values = !Array.isArray(value) ? [value] : value;
          this._setOption(values, el);
          this._unwatch = scope.$watch(model, _.bind(function (val, old) {
            var values1 = !Array.isArray(val) ? [val] : val;
            var values2 = !Array.isArray(old) ? [old] : old;
            if (values1.slice().sort().toString() !== values2.slice().sort().toString()) {
              _this2.handleValidate(el);
            }
          }, this));
        }
      }
    }, {
      key: 'unmanageElement',
      value: function unmanageElement(el) {
        if (this._unwatch) {
          this._unwatch();
        }
      }
    }, {
      key: 'reset',
      value: function reset() {
        this.resetFlags();
      }
    }, {
      key: '_getValue',
      value: function _getValue(el) {
        var ret = [];

        for (var i = 0, l = el.options.length; i < l; i++) {
          var option = el.options[i];
          if (!option.disabled && option.selected) {
            ret.push(option.value);
          }
        }

        return ret;
      }
    }, {
      key: '_setOption',
      value: function _setOption(values, el) {
        for (var i = 0, l = values.length; i < l; i++) {
          var value = values[i];
          for (var j = 0, m = el.options.length; j < m; j++) {
            var option = el.options[j];
            if (!option.disabled && option.value === value && (!option.hasAttribute('selected') || !option.selected)) {
              option.selected = true;
            }
          }
        }
      }
    }, {
      key: '_checkModified',
      value: function _checkModified(target) {
        var values = this._getValue(target).slice().sort();
        if (this._init.length !== values.length) {
          return true;
        } else {
          var inits = this._init.slice().sort();
          return inits.toString() !== values.toString();
        }
      }
    }]);
    return SelectValidation;
  })(BaseValidation);

  /**
   * RadioValidation class
   */

  var RadioValidation = (function (_BaseValidation) {
    babelHelpers_inherits(RadioValidation, _BaseValidation);

    function RadioValidation(field, model, vm, el, scope, validator) {
      babelHelpers_classCallCheck(this, RadioValidation);

      var _this = babelHelpers_possibleConstructorReturn(this, Object.getPrototypeOf(RadioValidation).call(this, field, model, vm, el, scope, validator));

      _this._inits = [];
      return _this;
    }

    babelHelpers_createClass(RadioValidation, [{
      key: 'manageElement',
      value: function manageElement(el) {
        var _this2 = this;

        var _ = exports$1.Vue.util;

        var item = this._addItem(el);
        var scope = this._getScope();
        var model = item.model = this._model;
        if (model) {
          var value = scope.$get(model);
          this._setChecked(value, el, item);
          item.unwatch = scope.$watch(model, _.bind(function (val, old) {
            if (val !== old) {
              _this2.handleValidate(el);
            }
          }, this));
        } else {
          this._validator.validate();
        }
      }
    }, {
      key: 'unmanageElement',
      value: function unmanageElement(el) {
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
        this._validator.validate();
      }
    }, {
      key: 'reset',
      value: function reset() {
        this.resetFlags();
        each(this._inits, function (item, index) {
          item.init = item.el.checked;
          item.value = item.el.value;
        });
      }
    }, {
      key: '_addItem',
      value: function _addItem(el) {
        var item = {
          el: el,
          init: el.checked,
          value: el.value
        };
        this._inits.push(item);
        return item;
      }
    }, {
      key: '_setChecked',
      value: function _setChecked(value, el, item) {
        if (el.value === value) {
          el.checked = true;
          this._init = el.checked;
          item.init = el.checked;
          item.value = value;
        }
      }
    }, {
      key: '_getValue',
      value: function _getValue(el) {
        var _this3 = this;

        if (!this._inits || this._inits.length === 0) {
          return el.checked;
        } else {
          var _ret = (function () {
            var vals = [];
            each(_this3._inits, function (item, index) {
              if (item.el.checked) {
                vals.push(item.el.value);
              }
            });
            return {
              v: vals
            };
          })();

          if ((typeof _ret === 'undefined' ? 'undefined' : babelHelpers_typeof(_ret)) === "object") return _ret.v;
        }
      }
    }, {
      key: '_checkModified',
      value: function _checkModified(target) {
        var _this4 = this;

        if (this._inits.length === 0) {
          return this._init !== target.checked;
        } else {
          var _ret2 = (function () {
            var modified = false;
            each(_this4._inits, function (item, index) {
              if (!modified) {
                modified = item.init !== item.el.checked;
              }
            });
            return {
              v: modified
            };
          })();

          if ((typeof _ret2 === 'undefined' ? 'undefined' : babelHelpers_typeof(_ret2)) === "object") return _ret2.v;
        }
      }
    }]);
    return RadioValidation;
  })(BaseValidation);

  /**
   * CheckboxValidation class
   */

  var CheckboxValidation = (function (_BaseValidation) {
    babelHelpers_inherits(CheckboxValidation, _BaseValidation);

    function CheckboxValidation(field, model, vm, el, scope, validator) {
      babelHelpers_classCallCheck(this, CheckboxValidation);

      var _this = babelHelpers_possibleConstructorReturn(this, Object.getPrototypeOf(CheckboxValidation).call(this, field, model, vm, el, scope, validator));

      _this._inits = [];
      return _this;
    }

    babelHelpers_createClass(CheckboxValidation, [{
      key: 'manageElement',
      value: function manageElement(el) {
        var _this2 = this;

        var _ = exports$1.Vue.util;

        var item = this._addItem(el);
        var scope = this._getScope();
        var model = item.model = this._model;
        if (model) {
          var value = scope.$get(model);
          if (Array.isArray(value)) {
            this._setChecked(value, item.el);
            item.unwatch = scope.$watch(model, _.bind(function (val, old) {
              if (val !== old) {
                _this2.handleValidate(item.el);
              }
            }, this));
          } else {
            el.checked = value || false;
            this._init = el.checked;
            item.init = el.checked;
            item.value = el.value;
            item.unwatch = scope.$watch(model, _.bind(function (val, old) {
              if (val !== old) {
                _this2.handleValidate(el);
              }
            }, this));
          }
        } else {
          this._validator.validate();
        }
      }
    }, {
      key: 'unmanageElement',
      value: function unmanageElement(el) {
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
        this._validator.validate();
      }
    }, {
      key: 'reset',
      value: function reset() {
        this.resetFlags();
        each(this._inits, function (item, index) {
          item.init = item.el.checked;
          item.value = item.el.value;
        });
      }
    }, {
      key: '_addItem',
      value: function _addItem(el) {
        var item = {
          el: el,
          init: el.checked,
          value: el.value
        };
        this._inits.push(item);
        return item;
      }
    }, {
      key: '_setChecked',
      value: function _setChecked(values, el) {
        for (var i = 0, l = values.length; i < l; i++) {
          var value = values[i];
          if (!el.disabled && el.value === value && !el.checked) {
            el.checked = true;
          }
        }
      }
    }, {
      key: '_getValue',
      value: function _getValue(el) {
        var _this3 = this;

        if (!this._inits || this._inits.length === 0) {
          return el.checked;
        } else {
          var _ret = (function () {
            var vals = [];
            each(_this3._inits, function (item, index) {
              if (item.el.checked) {
                vals.push(item.el.value);
              }
            });
            return {
              v: vals
            };
          })();

          if ((typeof _ret === 'undefined' ? 'undefined' : babelHelpers_typeof(_ret)) === "object") return _ret.v;
        }
      }
    }, {
      key: '_checkModified',
      value: function _checkModified(target) {
        var _this4 = this;

        if (this._inits.length === 0) {
          return this._init !== target.checked;
        } else {
          var _ret2 = (function () {
            var modified = false;
            each(_this4._inits, function (item, index) {
              if (!modified) {
                modified = item.init !== item.el.checked;
              }
            });
            return {
              v: modified
            };
          })();

          if ((typeof _ret2 === 'undefined' ? 'undefined' : babelHelpers_typeof(_ret2)) === "object") return _ret2.v;
        }
      }
    }]);
    return CheckboxValidation;
  })(BaseValidation);

  var eventRE = /^v-on:|^@/;

  /**
   * Validator class
   */

  var Validator$1 = (function () {
    function Validator(name, dir, groups) {
      var _this = this;

      babelHelpers_classCallCheck(this, Validator);

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

      each(groups, function (group) {
        _this._groupValidations[group] = [];
      }, this);
    }

    babelHelpers_createClass(Validator, [{
      key: 'enableReactive',
      value: function enableReactive() {
        var _this2 = this;

        exports$1.Vue.util.defineReactive(this._dir.vm, this.name, this._scope);
        this._dir.vm._validatorMaps[this.name] = this;

        this._dir.vm.$validatorReset = exports$1.Vue.util.bind(function () {
          _this2.resetValidation();
        }, this);
      }
    }, {
      key: 'disableReactive',
      value: function disableReactive() {
        this._dir.vm.$validatorReset = null;
        this._dir.vm._validatorMaps[this.name] = null;
        this._dir.vm[this.name] = null;
      }
    }, {
      key: 'registerEvents',
      value: function registerEvents() {
        var attrs = this._dir.el.attributes;
        for (var i = 0, l = attrs.length; i < l; i++) {
          var event = attrs[i].name;
          if (eventRE.test(event)) {
            event = event.replace(eventRE, '');
            this._events[this._getEventName(event)] = this._dir.vm.$eval(attrs[i].value, true);
          }
        }
      }
    }, {
      key: 'unregisterEvents',
      value: function unregisterEvents() {
        var _this3 = this;

        each(this._events, function (handler, event) {
          _this3._events[event] = null;
          delete _this3._events[event];
        }, this);
      }
    }, {
      key: 'resetValidation',
      value: function resetValidation() {
        each(this._validations, function (validation, key) {
          validation.reset();
        }, this);

        each(this._checkboxValidations, function (dataset, key) {
          dataset.validation.reset();
        }, this);

        each(this._radioValidations, function (dataset, key) {
          dataset.validation.reset();
        }, this);

        this.validate();
      }

      // TODO: should be improved performance (use cache)

    }, {
      key: 'manageValidation',
      value: function manageValidation(field, model, vm, el, scope) {
        var validation = null;

        if (el.tagName === 'SELECT') {
          validation = this._manageSelectValidation(field, model, vm, el, scope);
        } else if (el.type === 'checkbox') {
          validation = this._manageCheckboxValidation(field, model, vm, el, scope);
        } else if (el.type === 'radio') {
          validation = this._manageRadioValidation(field, model, vm, el, scope);
        } else {
          validation = this._manageBaseValidation(field, model, vm, el, scope);
        }

        return validation;
      }
    }, {
      key: 'unmanageValidation',
      value: function unmanageValidation(field, el) {
        if (el.type === 'checkbox') {
          this._unmanageCheckboxValidation(field, el);
        } else if (el.type === 'radio') {
          this._unmanageRadioValidation(field, el);
        } else if (el.tagName === 'SELECT') {
          this._unmanageSelectValidation(field, el);
        } else {
          this._unmanageBaseValidation(field, el);
        }
      }
    }, {
      key: '_manageBaseValidation',
      value: function _manageBaseValidation(field, model, vm, el, scope) {
        var validation = this._validations[field] = new BaseValidation(field, model, vm, el, scope, this);
        validation.manageElement(el);
        return validation;
      }
    }, {
      key: '_unmanageBaseValidation',
      value: function _unmanageBaseValidation(field, el) {
        var validation = this._validations[field];
        if (validation) {
          validation.unmanageElement(el);
          exports$1.Vue.delete(this._scope, field);
          this._validations[field] = null;
          delete this._validations[field];
        }
      }
    }, {
      key: '_manageCheckboxValidation',
      value: function _manageCheckboxValidation(field, model, vm, el, scope) {
        var validationSet = this._checkboxValidations[field];
        if (!validationSet) {
          var validation = new CheckboxValidation(field, model, vm, el, scope, this);
          validationSet = { validation: validation, elements: 0 };
          this._checkboxValidations[field] = validationSet;
        }

        validationSet.elements++;
        validationSet.validation.manageElement(el);
        return validationSet.validation;
      }
    }, {
      key: '_unmanageCheckboxValidation',
      value: function _unmanageCheckboxValidation(field, el) {
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
      }
    }, {
      key: '_manageRadioValidation',
      value: function _manageRadioValidation(field, model, vm, el, scope) {
        var validationSet = this._radioValidations[field];
        if (!validationSet) {
          var validation = new RadioValidation(field, model, vm, el, scope, this);
          validationSet = { validation: validation, elements: 0 };
          this._radioValidations[field] = validationSet;
        }

        validationSet.elements++;
        validationSet.validation.manageElement(el);
        return validationSet.validation;
      }
    }, {
      key: '_unmanageRadioValidation',
      value: function _unmanageRadioValidation(field, el) {
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
      }
    }, {
      key: '_manageSelectValidation',
      value: function _manageSelectValidation(field, model, vm, el, scope) {
        var validation = this._validations[field] = new SelectValidation(field, model, vm, el, scope, this);
        validation.manageElement(el);
        return validation;
      }
    }, {
      key: '_unmanageSelectValidation',
      value: function _unmanageSelectValidation(field, el) {
        var validation = this._validations[field];
        if (validation) {
          validation.unmanageElement(el);
          exports$1.Vue.delete(this._scope, field);
          this._validations[field] = null;
          delete this._validations[field];
        }
      }
    }, {
      key: 'addGroupValidation',
      value: function addGroupValidation(group, field) {
        var indexOf = exports$1.Vue.util.indexOf;

        var validation = this._validations[field] || this._checkboxValidations[field].validation || this._radioValidations[field].validation;
        var validations = this._groupValidations[group];
        if (validations) {
          if (! ~indexOf(validations, validation)) {
            validations.push(validation);
          }
        }
      }
    }, {
      key: 'removeGroupValidation',
      value: function removeGroupValidation(group, field) {
        var validation = this._validations[field] || this._checkboxValidations[field].validation || this._radioValidations[field].validation;
        var validations = this._groupValidations[group];
        if (validations) {
          pull(validations, validation);
        }
      }
    }, {
      key: 'validate',
      value: function validate(validation) {
        var _this4 = this;

        each(this._validations, function (validation, key) {
          var res = validation.validate();
          exports$1.Vue.set(_this4._scope, key, res);
        }, this);

        each(this._checkboxValidations, function (dataset, key) {
          var res = dataset.validation.validate();
          exports$1.Vue.set(_this4._scope, key, res);
        }, this);

        each(this._radioValidations, function (dataset, key) {
          var res = dataset.validation.validate();
          exports$1.Vue.set(_this4._scope, key, res);
        }, this);

        if (this._scope.touched) {
          this._fireEvent('touched');
        }

        if (this._scope.dirty) {
          this._fireEvent('dirty');
        }

        if (this._modified !== this._scope.modified) {
          this._fireEvent('modified', this._scope.modified);
          this._modified = this._scope.modified;
        }

        var valid = this._scope.valid;
        this._fireEvent(valid ? 'valid' : 'invalid');
      }
    }, {
      key: 'setupScope',
      value: function setupScope() {
        var _this5 = this;

        var bind = exports$1.Vue.util.bind;

        var validationsGetter = bind(function () {
          return _this5.validations;
        }, this);
        var scopeGetter = bind(function () {
          return _this5._scope;
        }, this);
        this._defineProperties(validationsGetter, scopeGetter);

        each(this._groups, function (name) {
          var validations = _this5._groupValidations[name];
          var group = {};
          exports$1.Vue.set(_this5._scope, name, group);
          _this5._defineProperties(function () {
            return validations;
          }, function () {
            return group;
          });
        }, this);
      }
    }, {
      key: 'waitFor',
      value: function waitFor(cb) {
        var vm = this._dir.vm;
        var method = '$activateValidator';

        this._dir.vm[method] = function () {
          cb();
          vm[method] = null;
        };
      }
    }, {
      key: '_fireEvent',
      value: function _fireEvent(type) {
        var handler = this._events[this._getEventName(type)];

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        handler && handler.apply(null, args);
      }
    }, {
      key: '_getEventName',
      value: function _getEventName(type) {
        return this.name + ':' + type;
      }
    }, {
      key: '_defineProperties',
      value: function _defineProperties(validationsGetter, targetGetter) {
        var _this6 = this;

        var bind = exports$1.Vue.util.bind;

        each({
          valid: { fn: this._defineValid, arg: validationsGetter },
          invalid: { fn: this._defineInvalid, arg: targetGetter },
          touched: { fn: this._defineTouched, arg: validationsGetter },
          untouched: { fn: this._defineUntouched, arg: targetGetter },
          modified: { fn: this._defineModified, arg: validationsGetter },
          dirty: { fn: this._defineDirty, arg: validationsGetter },
          pristine: { fn: this._definePristine, arg: targetGetter },
          messages: { fn: this._defineMessages, arg: validationsGetter }
        }, function (descriptor, name) {
          Object.defineProperty(targetGetter(), name, {
            enumerable: true,
            configurable: true,
            get: function get() {
              return bind(descriptor.fn, _this6)(descriptor.arg);
            }
          });
        }, this);
      }
    }, {
      key: '_walkValidations',
      value: function _walkValidations(validations, property, condition) {
        var _this7 = this;

        var hasOwn = exports$1.Vue.util.hasOwn;
        var ret = condition;

        each(validations, function (validation, key) {
          if (ret === !condition) {
            return;
          }
          if (hasOwn(_this7._scope, validation.field)) {
            var target = _this7._scope[validation.field];
            if (target && target[property] === !condition) {
              ret = !condition;
            }
          }
        }, this);

        return ret;
      }
    }, {
      key: '_defineValid',
      value: function _defineValid(validationsGetter) {
        return this._walkValidations(validationsGetter(), 'valid', true);
      }
    }, {
      key: '_defineInvalid',
      value: function _defineInvalid(scopeGetter) {
        return !scopeGetter().valid;
      }
    }, {
      key: '_defineTouched',
      value: function _defineTouched(validationsGetter) {
        return this._walkValidations(validationsGetter(), 'touched', false);
      }
    }, {
      key: '_defineUntouched',
      value: function _defineUntouched(scopeGetter) {
        return !scopeGetter().touched;
      }
    }, {
      key: '_defineModified',
      value: function _defineModified(validationsGetter) {
        return this._walkValidations(validationsGetter(), 'modified', false);
      }
    }, {
      key: '_defineDirty',
      value: function _defineDirty(validationsGetter) {
        return this._walkValidations(validationsGetter(), 'dirty', false);
      }
    }, {
      key: '_definePristine',
      value: function _definePristine(scopeGetter) {
        return !scopeGetter().dirty;
      }
    }, {
      key: '_defineMessages',
      value: function _defineMessages(validationsGetter) {
        var _this8 = this;

        var extend = exports$1.Vue.util.extend;
        var hasOwn = exports$1.Vue.util.hasOwn;
        var ret = {};

        each(validationsGetter(), function (validation, key) {
          if (hasOwn(_this8._scope, validation.field)) {
            var target = _this8._scope[validation.field];
            if (target && !empty(target['messages'])) {
              ret[validation.field] = extend({}, target['messages']);
            }
          }
        }, this);

        return empty(ret) ? undefined : ret;
      }
    }, {
      key: 'validations',
      get: function get() {
        var extend = exports$1.Vue.util.extend;

        var ret = {};
        extend(ret, this._validations);

        each(this._checkboxValidations, function (dataset, key) {
          ret[key] = dataset.validation;
        }, this);

        each(this._radioValidations, function (dataset, key) {
          ret[key] = dataset.validation;
        }, this);

        return ret;
      }
    }]);
    return Validator;
  })();

  function Validator (Vue) {
    var _ = Vue.util;
    var FragmentFactory = Vue.FragmentFactory;
    var vIf = Vue.directive('if');
    var bind = Vue.util.bind;
    var camelize = Vue.util.camelize;

    Vue.elementDirective('validator', {
      params: ['name', 'groups', 'lazy'],

      bind: function bind() {
        if (!this.params.name) {
          // TODO: should be implemented validator:bind name params nothing error'
          warn('TODO: should be implemented validator:bind name params nothing error');
          return;
        }

        this.validatorName = '$' + camelize(this.params.name);
        if (!this.vm._validatorMaps) {
          // TODO: should be implemented error message'
          warn('TODO: should be implemented error message');
          return;
        }

        this.setupValidator();
        this.setupFragment(this.params.lazy);
      },
      unbind: function unbind() {
        this.teardownFragment();
        this.teardownValidator();
      },
      getGroups: function getGroups() {
        var groups = [];

        if (this.params.groups) {
          if (_.isArray(this.params.groups)) {
            groups = this.params.groups;
          } else if (!_.isPlainObject(this.params.groups) && typeof this.params.groups === 'string') {
            groups.push(this.params.groups);
          }
        }

        return groups;
      },
      setupValidator: function setupValidator() {
        var validator = this.validator = new Validator$1(this.validatorName, this, this.getGroups());
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

        this.validator.waitFor(bind(function () {
          _this.anchor = _.createAnchor('vue-validator');
          _.replace(_this.el, _this.anchor);
          _.extend(_this.vm.$options, { _validator: _this.validatorName });
          _this.factory = new FragmentFactory(_this.vm, _this.el.innerHTML);
          vIf.insert.call(_this);

          _this.validator.validate();
        }, this));

        if (!lazy) {
          this.vm.$activateValidator();
        }
      },
      teardownFragment: function teardownFragment() {
        vIf.unbind.call(this);
      }
    });
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

    Override(Vue);
    Validator(Vue);
    Validate(Vue);
  }

  plugin.version = '2.0.0-alpha.17';

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
  }

  return plugin;

}));