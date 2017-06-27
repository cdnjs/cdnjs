/*!
 * vue-validator v2.0.0-alpha.7
 * (c) 2015 kazuya kawaguchi
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  global.VueValidator = factory();
}(this, function () { 'use strict';

  var babelHelpers = {};

  babelHelpers.typeof = function (obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = (function () {
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
   */

  function trigger(el, event) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent(event, true, false);
    el.dispatchEvent(e);
  }

  /**
   * Fundamental validate functions
   */

  /**
   * required
   *
   * This function validate whether the value has been filled out.
   *
   * @param val
   * @return {Boolean}
   */

  function required(val) {
    if (Array.isArray(val)) {
      return val.length > 0;
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
   * This function validate whether the minimum length of the string.
   *
   * @param {String} val
   * @param {String|Number} min
   * @return {Boolean}
   */

  function minlength(val, min) {
    return typeof val === 'string' && isInteger(min, 10) && val.length >= parseInt(min, 10);
  }

  /**
   * maxlength
   *
   * This function validate whether the maximum length of the string.
   *
   * @param {String} val
   * @param {String|Number} max
   * @return {Boolean}
   */

  function maxlength(val, max) {
    return typeof val === 'string' && isInteger(max, 10) && val.length <= parseInt(max, 10);
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

    // register validator asset
    Vue.config._assetTypes.push('validator');

    // set global validators asset
    Vue.options.validators = validators;

    // set option merge strategy
    var strats = Vue.config.optionMergeStrategies;
    if (strats) {
      strats.validators = strats.methods;
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

  /**
   * Validation class
   */

  var Validation = (function () {
    function Validation(dir) {
      babelHelpers.classCallCheck(this, Validation);

      this.model = dir.arg;
      this.el = dir.el;
      this.dir = dir;
      this.init = dir.el.value;
      this.touched = false;
      this.dirty = false;
      this.modified = false;
      this.validators = Object.create(null);
    }

    babelHelpers.createClass(Validation, [{
      key: 'setValidation',
      value: function setValidation(name, arg, msg, fn) {
        var resolveAsset = exports$1.Vue.util.resolveAsset;

        var validator = this.validators[name];
        if (!validator) {
          validator = this.validators[name] = {};
          validator.fn = resolveAsset(this.dir.vm.$options, 'validators', name);
        }

        validator.arg = arg;
        if (msg) {
          validator.msg = msg;
        }

        if (fn) {
          validator.fn = fn;
        }
      }
    }, {
      key: 'listener',
      value: function listener(e) {
        if (e.relatedTarget && (e.relatedTarget.tagName === 'A' || e.relatedTarget.tagName === 'BUTTON')) {
          return;
        }

        if (e.type === 'blur') {
          this.touched = true;
        }

        if (!this.dirty && this.el.value !== this.init) {
          this.dirty = true;
        }

        this.modified = this.el.value !== this.init;

        this.dir.validator.validate();
      }
    }, {
      key: 'validate',
      value: function validate() {
        var _this = this;

        var extend = exports$1.Vue.util.extend;
        var ret = Object.create(null);
        var messages = Object.create(null);
        var valid = true;

        each(this.validators, function (descriptor, name) {
          var res = descriptor.fn.call(_this.dir.vm, _this.el.value, descriptor.arg);
          if (!res) {
            valid = false;
            var msg = descriptor.msg;
            if (msg) {
              messages[name] = typeof msg === 'function' ? msg() : msg;
            }
          }
          ret[name] = !res;
        }, this);

        trigger(this.el, valid ? 'valid' : 'invalid');

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
        extend(ret, props);

        return ret;
      }
    }]);
    return Validation;
  })();

  function Validate (Vue) {

    var _ = Vue.util;

    Vue.directive('validate', {
      params: ['group'],

      bind: function bind() {
        var vm = this.vm;
        var validatorName = vm.$options._validator;
        if (!validatorName) {
          // TODO: should be implemented error message
          warn('TODO: should be implemented error message');
          return;
        }

        var validator = this.validator = this.vm._validatorMaps[validatorName];
        var validation = this.validation = new Validation(this);
        validator.addValidation(validation);

        if (this.params.group) {
          validator.addGroupValidation(this.params.group, validation);
        }

        this.on('blur', _.bind(this.validation.listener, this.validation));
        this.on('input', _.bind(this.validation.listener, this.validation));
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
      },
      unbind: function unbind() {
        if (this.validator && this.validation) {
          if (this.params.group) {
            this.validator.removeGroupValidation(this.params.group, this.validation);
          }
          this.validator.removeValidation(this.validation);
          this.validator = null;
          this.validation = null;
        }
      }
    });
  }

  /**
   * Validator class
   */

  var Validator$1 = (function () {
    function Validator(name, dir, groups) {
      var _this = this;

      babelHelpers.classCallCheck(this, Validator);

      this.name = name;
      this.scope = Object.create(null);
      this._dir = dir;
      this._validations = [];
      this._groups = groups;
      this._groupValidations = Object.create(null);

      each(groups, function (group) {
        _this._groupValidations[group] = [];
      }, this);
    }

    babelHelpers.createClass(Validator, [{
      key: 'enableReactive',
      value: function enableReactive() {
        exports$1.Vue.util.defineReactive(this._dir.vm, this.name, this.scope);
        this._dir.vm._validatorMaps[this.name] = this;
      }
    }, {
      key: 'disableReactive',
      value: function disableReactive() {
        this._dir.vm._validatorMaps[this.name] = null;
        this._dir.vm[this.name] = null;
      }
    }, {
      key: 'addValidation',
      value: function addValidation(validation) {
        this._validations.push(validation);
      }
    }, {
      key: 'removeValidation',
      value: function removeValidation(validation) {
        exports$1.Vue.util.del(this.scope, validation.model);
        pull(this._validations, validation);
      }
    }, {
      key: 'addGroupValidation',
      value: function addGroupValidation(group, validation) {
        var validations = this._groupValidations[group];
        if (validations) {
          validations.push(validation);
        }
      }
    }, {
      key: 'removeGroupValidation',
      value: function removeGroupValidation(group, validation) {
        var validations = this._groupValidations[group];
        if (validations) {
          pull(validations, validation);
        }
      }
    }, {
      key: 'validate',
      value: function validate(validation) {
        var _this2 = this;

        each(this._validations, function (validation, index) {
          var res = validation.validate();
          exports$1.Vue.util.set(_this2.scope, validation.model, res);
        }, this);
      }
    }, {
      key: 'setupScope',
      value: function setupScope() {
        var _this3 = this;

        this._defineProperties(this._validations, this.scope);

        each(this._groups, function (name) {
          var validations = _this3._groupValidations[name];
          var group = Object.create(null);
          exports$1.Vue.util.set(_this3.scope, name, group);
          _this3._defineProperties(validations, group);
        }, this);
      }
    }, {
      key: '_defineProperties',
      value: function _defineProperties(validations, target) {
        var _this4 = this;

        var bind = exports$1.Vue.util.bind;

        each({
          valid: { fn: this._defineValid, arg: validations },
          invalid: { fn: this._defineInvalid, arg: target },
          touched: { fn: this._defineTouched, arg: validations },
          untouched: { fn: this._defineUntouched, arg: target },
          modified: { fn: this._defineModified, arg: validations },
          dirty: { fn: this._defineDirty, arg: validations },
          pristine: { fn: this._definePristine, arg: target },
          messages: { fn: this._defineMessages, arg: validations }
        }, function (descriptor, name) {
          Object.defineProperty(target, name, {
            enumerable: true,
            configurable: true,
            get: function get() {
              return bind(descriptor.fn, _this4)(descriptor.arg);
            }
          });
        }, this);
      }
    }, {
      key: '_walkValidations',
      value: function _walkValidations(validations, property, condition) {
        var _this5 = this;

        var hasOwn = exports$1.Vue.util.hasOwn;
        var ret = condition;

        each(validations, function (validation, index) {
          if (ret === !condition) {
            return;
          }
          if (hasOwn(_this5.scope, validation.model)) {
            var target = _this5.scope[validation.model];
            if (target && target[property] === !condition) {
              ret = !condition;
            }
          }
        }, this);

        return ret;
      }
    }, {
      key: '_defineValid',
      value: function _defineValid(validations) {
        return this._walkValidations(validations, 'valid', true);
      }
    }, {
      key: '_defineInvalid',
      value: function _defineInvalid(scope) {
        return !scope.valid;
      }
    }, {
      key: '_defineTouched',
      value: function _defineTouched(validations) {
        return this._walkValidations(validations, 'touched', false);
      }
    }, {
      key: '_defineUntouched',
      value: function _defineUntouched(scope) {
        return !scope.touched;
      }
    }, {
      key: '_defineModified',
      value: function _defineModified(validations) {
        return this._walkValidations(validations, 'modified', false);
      }
    }, {
      key: '_defineDirty',
      value: function _defineDirty(validations) {
        return this._walkValidations(validations, 'dirty', false);
      }
    }, {
      key: '_definePristine',
      value: function _definePristine(scope) {
        return !scope.dirty;
      }
    }, {
      key: '_defineMessages',
      value: function _defineMessages(validations) {
        var _this6 = this;

        var extend = exports$1.Vue.util.extend;
        var hasOwn = exports$1.Vue.util.hasOwn;
        var ret = Object.create(null);

        each(validations, function (validation, index) {
          if (hasOwn(_this6.scope, validation.model)) {
            var target = _this6.scope[validation.model];
            if (target && !empty(target['messages'])) {
              ret[validation.model] = extend(Object.create(null), target['messages']);
            }
          }
        }, this);

        return empty(ret) ? undefined : ret;
      }
    }]);
    return Validator;
  })();

  function Validator (Vue) {
    var _ = Vue.util;
    var FragmentFactory = Vue.FragmentFactory;
    var vIf = Vue.directive('if');

    Vue.elementDirective('validator', {
      params: ['name', 'groups'],

      bind: function bind() {
        if (!this.params.name) {
          // TODO: should be implemented validator:bind name params nothing error'
          warn('TODO: should be implemented validator:bind name params nothing error');
          return;
        }

        var validatorName = this.validatorName = '$' + this.params.name;
        if (!this.vm._validatorMaps) {
          // TODO: should be implemented error message'
          warn('TODO: should be implemented error message');
          return;
        }

        var groups = [];
        if (this.params.groups) {
          if (_.isArray(this.params.groups)) {
            groups = this.params.groups;
          } else if (!_.isPlainObject(this.params.groups) && typeof this.params.groups === 'string') {
            groups.push(this.params.groups);
          }
        }

        var validator = this.validator = new Validator$1(validatorName, this, groups);
        validator.enableReactive();
        validator.setupScope();

        this.anchor = _.createAnchor('vue-validator');
        _.replace(this.el, this.anchor);
        this.insert(validatorName);

        this.vm.$on('hook:compiled', function () {
          validator.validate();
        });
      },
      insert: function insert(name) {
        _.extend(this.vm.$options, { _validator: name });
        this.factory = new FragmentFactory(this.vm, this.el.innerHTML);
        vIf.insert.call(this);
      },
      unbind: function unbind() {
        vIf.unbind.call(this);

        this.validator.disableReactive();

        if (this.validatorName) {
          this.validatorName = null;
          this.validator = null;
        }
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

  plugin.version = '2.0.0-alpha.7';

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
  }

  return plugin;

}));