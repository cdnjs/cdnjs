/*!
 * vue-validator v2.0.0-alpha.10
 * (c) 2016 kazuya kawaguchi
 * Released under the MIT License.
 */
'use strict';

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
 * attr
 *
 * @param {Element} el
 * @param {String} name
 * @return {String|null}
 */

function attr(el, name) {
  return el ? el.getAttribute(name) : null;
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

  // register validator asset
  Vue.config._assetTypes.push('validator');

  // set global validators asset
  var assets = Object.create(null);
  Vue.util.extend(assets, validators);
  Vue.options.validators = assets;

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

function Validate (Vue) {

  var _ = Vue.util;
  var vModel = Vue.directive('model');

  Vue.directive('validate', {
    priority: vModel.priority + 1,
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

      var field = this.field = _.camelize(this.arg);
      var validation = this.validation = validator.manageValidation(field, vm, this.el);

      if (this.params.group) {
        validator.addGroupValidation(this.params.group, this.field);
      }

      var model = attr(this.el, 'v-model');
      this.on('blur', _.bind(validation.listener, validation));
      if ((this.el.type === 'checkbox' || this.el.type === 'radio' || this.el.tagName === 'SELECT') && !model) {
        this.on('change', _.bind(validation.listener, validation));
      } else {
        if (!model) {
          this.on('input', _.bind(validation.listener, validation));
        }
      }
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
          this.validator.removeGroupValidation(this.params.group, this.field);
        }

        this.validator.unmanageValidation(this.field, this.el);
        this.validator = null;
        this.validation = null;
      }
    }
  });
}

/**
 * BaseValidation class
 */

var BaseValidation = (function () {
  function BaseValidation(field, vm, el, validator) {
    babelHelpers_classCallCheck(this, BaseValidation);

    this.field = field;
    this.touched = false;
    this.dirty = false;
    this.modified = false;

    this._validator = validator;
    this._vm = vm;
    this._el = el;
    this._init = this._getValue(el);
    this._value = el.value;
    this._validators = {};
  }

  babelHelpers_createClass(BaseValidation, [{
    key: '_getValue',
    value: function _getValue(el) {
      return el.value;
    }
  }, {
    key: 'manageElement',
    value: function manageElement(el) {
      var _this = this;

      var _ = exports$1.Vue.util;

      var model = attr(el, 'v-model');
      if (model) {
        el.value = this._vm.$get(model);
        this._unwatch = this._vm.$watch(model, _.bind(function (val, old) {
          if (val !== old) {
            el.value = val;
            _this.handleValidate(el);
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
      }

      if (!this.dirty && this._checkModified(el)) {
        this.dirty = true;
      }

      this.modified = this._checkModified(el);

      this._validator.validate();
    }
  }, {
    key: '_checkModified',
    value: function _checkModified(target) {
      return this._init !== this._getValue(target);
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

      this._fireEvent(this._el, valid);

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
    key: '_fireEvent',
    value: function _fireEvent(el, valid) {
      trigger(el, valid ? 'valid' : 'invalid');
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

  function SelectValidation(field, vm, el, validator) {
    babelHelpers_classCallCheck(this, SelectValidation);

    var _this = babelHelpers_possibleConstructorReturn(this, Object.getPrototypeOf(SelectValidation).call(this, field, vm, el, validator));

    _this._multiple = _this._el.hasAttribute('multiple');
    return _this;
  }

  babelHelpers_createClass(SelectValidation, [{
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
    key: 'manageElement',
    value: function manageElement(el) {
      var _this2 = this;

      var _ = exports$1.Vue.util;

      var model = attr(el, 'v-model');
      if (model) {
        var value = this._vm.$get(model);
        var values = !Array.isArray(value) ? [value] : value;
        this._setOption(values, el);
        this._unwatch = this._vm.$watch(model, _.bind(function (val, old) {
          var values1 = !Array.isArray(val) ? [val] : val;
          var values2 = !Array.isArray(old) ? [old] : old;
          if (values1.slice().sort().toString() !== values2.slice().sort().toString()) {
            _this2._setOption(values1, el);
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

  function RadioValidation(field, vm, el, validator) {
    babelHelpers_classCallCheck(this, RadioValidation);

    var _this = babelHelpers_possibleConstructorReturn(this, Object.getPrototypeOf(RadioValidation).call(this, field, vm, el, validator));

    _this._inits = [];
    return _this;
  }

  babelHelpers_createClass(RadioValidation, [{
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
    key: 'manageElement',
    value: function manageElement(el) {
      var _this2 = this;

      var _ = exports$1.Vue.util;

      var item = this._addItem(el);
      var model = item.model = attr(el, 'v-model');
      if (model) {
        var value = this._vm.$get(model);
        this._setChecked(value, el, item);
        item.unwatch = this._vm.$watch(model, _.bind(function (val, old) {
          if (val !== old) {
            if (el.value === val) {
              el.checked = val;
            }
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

  function CheckboxValidation(field, vm, el, validator) {
    babelHelpers_classCallCheck(this, CheckboxValidation);

    var _this = babelHelpers_possibleConstructorReturn(this, Object.getPrototypeOf(CheckboxValidation).call(this, field, vm, el, validator));

    _this._inits = [];
    return _this;
  }

  babelHelpers_createClass(CheckboxValidation, [{
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
    key: 'manageElement',
    value: function manageElement(el) {
      var _this2 = this;

      var _ = exports$1.Vue.util;

      var item = this._addItem(el);
      var model = item.model = attr(el, 'v-model');
      if (model) {
        var value = this._vm.$get(model);
        if (Array.isArray(value)) {
          this._setChecked(value, item.el);
          item.unwatch = this._vm.$watch(model, _.bind(function (val, old) {
            if (val !== old) {
              _this2._setChecked(val, item.el);
              _this2.handleValidate(item.el);
            }
          }, this));
        } else {
          el.checked = value;
          this._init = el.checked;
          item.init = el.checked;
          item.value = el.value;
          item.unwatch = this._vm.$watch(model, _.bind(function (val, old) {
            if (val !== old) {
              el.checked = val;
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

    each(groups, function (group) {
      _this._groupValidations[group] = [];
    }, this);
  }

  babelHelpers_createClass(Validator, [{
    key: 'enableReactive',
    value: function enableReactive() {
      exports$1.Vue.util.defineReactive(this._dir.vm, this.name, this._scope);
      this._dir.vm._validatorMaps[this.name] = this;
    }
  }, {
    key: 'disableReactive',
    value: function disableReactive() {
      this._dir.vm._validatorMaps[this.name] = null;
      this._dir.vm[this.name] = null;
    }

    // TODO: should be improved performance (use cache)

  }, {
    key: 'manageValidation',
    value: function manageValidation(field, vm, el) {
      var validation = null;

      if (el.tagName === 'SELECT') {
        validation = this._manageSelectValidation(field, vm, el);
      } else if (el.type === 'checkbox') {
        validation = this._manageCheckboxValidation(field, vm, el);
      } else if (el.type === 'radio') {
        validation = this._manageRadioValidation(field, vm, el);
      } else {
        validation = this._manageBaseValidation(field, vm, el);
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
    value: function _manageBaseValidation(field, vm, el) {
      var validation = this._validations[field] = new BaseValidation(field, vm, el, this);
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
      }
    }
  }, {
    key: '_manageCheckboxValidation',
    value: function _manageCheckboxValidation(field, vm, el) {
      var validationSet = this._checkboxValidations[field];
      if (!validationSet) {
        var validation = new CheckboxValidation(field, vm, el, this);
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
        }
      }
    }
  }, {
    key: '_manageRadioValidation',
    value: function _manageRadioValidation(field, vm, el) {
      var validationSet = this._radioValidations[field];
      if (!validationSet) {
        var validation = new RadioValidation(field, vm, el, this);
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
        }
      }
    }
  }, {
    key: '_manageSelectValidation',
    value: function _manageSelectValidation(field, vm, el) {
      var validation = this._validations[field] = new SelectValidation(field, vm, el, this);
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
      var _this2 = this;

      each(this._validations, function (validation, key) {
        var res = validation.validate();
        exports$1.Vue.set(_this2._scope, key, res);
      }, this);

      each(this._checkboxValidations, function (dataset, key) {
        var res = dataset.validation.validate();
        exports$1.Vue.set(_this2._scope, key, res);
      }, this);

      each(this._radioValidations, function (dataset, key) {
        var res = dataset.validation.validate();
        exports$1.Vue.set(_this2._scope, key, res);
      }, this);
    }
  }, {
    key: 'setupScope',
    value: function setupScope() {
      var _this3 = this;

      var bind = exports$1.Vue.util.bind;

      var validationsGetter = bind(function () {
        return _this3.validations;
      }, this);
      var scopeGetter = bind(function () {
        return _this3._scope;
      }, this);
      this._defineProperties(validationsGetter, scopeGetter);

      each(this._groups, function (name) {
        var validations = _this3._groupValidations[name];
        var group = {};
        exports$1.Vue.set(_this3._scope, name, group);
        _this3._defineProperties(function () {
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
    key: '_defineProperties',
    value: function _defineProperties(validationsGetter, targetGetter) {
      var _this4 = this;

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

      each(validations, function (validation, key) {
        if (ret === !condition) {
          return;
        }
        if (hasOwn(_this5._scope, validation.field)) {
          var target = _this5._scope[validation.field];
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
      var _this6 = this;

      var extend = exports$1.Vue.util.extend;
      var hasOwn = exports$1.Vue.util.hasOwn;
      var ret = {};

      each(validationsGetter(), function (validation, key) {
        if (hasOwn(_this6._scope, validation.field)) {
          var target = _this6._scope[validation.field];
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
  var _bind = Vue.util.bind;
  var camelize = Vue.util.camelize;

  Vue.elementDirective('validator', {
    params: ['name', 'groups', 'lazy'],

    bind: function bind() {
      var _this = this;

      if (!this.params.name) {
        // TODO: should be implemented validator:bind name params nothing error'
        warn('TODO: should be implemented validator:bind name params nothing error');
        return;
      }

      var validatorName = this.validatorName = '$' + camelize(this.params.name);
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

      validator.waitFor(_bind(function () {
        _this.render(validator, validatorName);
        validator.validate();
      }, this));

      if (!this.params.lazy) {
        this.vm.$activateValidator();
      }
    },
    render: function render(validator, validatorName) {
      this.anchor = _.createAnchor('vue-validator');
      _.replace(this.el, this.anchor);
      this.insert(validatorName);
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

plugin.version = '2.0.0-alpha.10';

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

module.exports = plugin;