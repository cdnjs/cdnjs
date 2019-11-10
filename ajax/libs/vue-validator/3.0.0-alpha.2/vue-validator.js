/*!
 * vue-validator v3.0.0-alpha.1 
 * (c) 2016 kazuya kawaguchi
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueValidator = factory());
}(this, (function () { 'use strict';

/*  */

var inBrowser =
  typeof window !== 'undefined' &&
  Object.prototype.toString.call(window) !== '[object Object]';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;

var MODEL_NOTIFY_EVENT = '__VUE_VALIDATOR_MODEL_NOTIFY_EVENT__';

function warn (msg, err) {
  if (window.console) {
    console.warn('[vue-validator] ' + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}

function looseEqual (a, b) {
  return a === b || (
    isObject(a) && isObject(b)
      ? JSON.stringify(a) === JSON.stringify(b)
      : false
  )
}

function getClass (el) {
  var classname = el.className;
  if (typeof classname === 'object') {
    classname = classname.baseVal || '';
  }
  return classname
}

function setClass (el, cls) {
  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
    el.className = cls;
  } else {
    el.setAttribute('class', cls);
  }
}

function addClass (el, cls) {
  if (el.classList) {
    el.classList.add(cls);
  } else {
    var cur = ' ' + getClass(el) + ' ';
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      setClass(el, (cur + cls).trim());
    }
  }
}

function removeClass (el, cls) {
  if (el.classList) {
    el.classList.remove(cls);
  } else {
    var cur = ' ' + getClass(el) + ' ';
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    setClass(el, cur.trim());
  }
  if (!el.className) {
    el.removeAttribute('class');
  }
}

function toggleClasses (el, key, fn) {
  if (!el) { return }

  key = key.trim();
  if (key.indexOf(' ') === -1) {
    fn(el, key);
    return
  }

  var keys = key.split(/\s+/);
  for (var i = 0, l = keys.length; i < l; i++) {
    fn(el, keys[i]);
  }
}

function triggerEvent (el, event, fn) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(event, true, true);
  fn && fn(e);
  el.dispatchEvent(e);
}

// TODO: should be defined strict type
function mapValidation (results) {
  var res = {};

  normalizeMap(results).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedValidation () {
      var validation = this.$validation;
      if (!this._isMounted) {
        return null
      }
      var paths = val.split('.');
      var first = paths.shift();
      if (first !== '$validation') {
        warn(("unknown validation result path: " + val));
        return null
      }
      var path;
      var value = validation;
      do {
        path = paths.shift();
        value = value[path];
      } while (paths.length > 0)
      return value
    };
  });

  return res
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

// TODO: should be defined strict type
function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/*  */

// validator configrations
var validator = {
  classes: {}
};

var Config = function (Vue) {
  // define Vue.config.validator configration
  // $FlowFixMe: https://github.com/facebook/flow/issues/285
  Object.defineProperty(Vue.config, 'validator', {
    enumerable: true,
    configurable: true,
    get: function () { return validator },
    set: function (val) { validator = val; }
  });
};

/*  */
/**
 * build-in validators
 */

/**
 * required
 * This function validate whether the value has been filled out.
 */
function required (val) {
  if (Array.isArray(val)) {
    if (val.length !== 0) {
      var valid = true;
      for (var i = 0, l = val.length; i < l; i++) {
        valid = required(val[i]);
        if (!valid) {
          break
        }
      }
      return valid
    } else {
      return false
    }
  } else if (typeof val === 'number' || typeof val === 'function') {
    return true
  } else if (typeof val === 'boolean') {
    return val
  } else if (typeof val === 'string') {
    return val.length > 0
  } else if (val !== null && typeof val === 'object') {
    return Object.keys(val).length > 0
  } else if (val === null || val === undefined) {
    return false
  } else {
    return false
  }
}

/**
 * pattern
 * This function validate whether the value matches the regex pattern
 */
function pattern (val, pat) {
  if (typeof pat !== 'string') { return false }

  var match = pat.match(new RegExp('^/(.*?)/([gimy]*)$'));
  if (!match) { return false }

  return new RegExp(match[1], match[2]).test(val)
}

/**
 * minlength
 * This function validate whether the minimum length.
 */
function minlength (val, min) {
  if (typeof val === 'string') {
    return isInteger(min, 10) && val.length >= parseInt(min, 10)
  } else if (Array.isArray(val)) {
    return val.length >= parseInt(min, 10)
  } else {
    return false
  }
}

/**
 * maxlength
 * This function validate whether the maximum length.
 */
function maxlength (val, max) {
  if (typeof val === 'string') {
    return isInteger(max, 10) && val.length <= parseInt(max, 10)
  } else if (Array.isArray(val)) {
    return val.length <= parseInt(max, 10)
  } else {
    return false
  }
}

/**
 * min
 * This function validate whether the minimum value of the numberable value.
 */
function min (val, arg) {
  return !isNaN(+(val)) && !isNaN(+(arg)) && (+(val) >= +(arg))
}

/**
 * max
 * This function validate whether the maximum value of the numberable value.
 */
function max (val, arg) {
  return !isNaN(+(val)) && !isNaN(+(arg)) && (+(val) <= +(arg))
}

/**
 * isInteger
 * This function check whether the value of the string is integer.
 */
function isInteger (val) {
  return /^(-?[1-9]\d*|0)$/.test(val)
}


var validators = Object.freeze({
	required: required,
	pattern: pattern,
	minlength: minlength,
	maxlength: maxlength,
	min: min,
	max: max
});

/*  */
var Asset = function (Vue) {
  var ref = Vue.util;
  var extend = ref.extend;

  // set global validators asset
  var assets = Object.create(null);
  extend(assets, validators);
  Vue.options.validators = assets;

  // set option merge strategy
  var strats = Vue.config.optionMergeStrategies;
  if (strats) {
    strats.validators = function (parent, child) {
      if (!child) { return parent }
      if (!parent) { return child }
      var ret = Object.create(null);
      extend(ret, parent);
      var key;
      for (key in child) {
        ret[key] = child[key];
      }
      return ret
    };
  }

  /**
   * Register or retrieve a global validator definition.
   */
  function validator (
    id,
    def
  ) {
    if (def === undefined) {
      return Vue.options['validators'][id]
    } else {
      Vue.options['validators'][id] = def;
      if (def === null) {
        delete Vue.options['validators']['id'];
      }
    }
  }
  Vue['validator'] = validator;
};

/*  */

var Group = function (Vue) {
  var ref = Vue.util;
  var extend = ref.extend;

  return {
    data: function data () {
      return {
        valid: true,
        dirty: false,
        touched: false,
        modified: false,
        results: {}
      }
    },
    computed: {
      invalid: function invalid () { return !this.valid },
      pristine: function pristine () { return !this.dirty },
      untouched: function untouched () { return !this.touched },
      result: function result () {
        var ret = {
          valid: this.valid,
          invalid: this.invalid,
          dirty: this.dirty,
          pristine: this.pristine,
          touched: this.touched,
          untouched: this.untouched,
          modified: this.modified
        };
        var results = this.results;
        this._validityKeys.forEach(function (key) {
          ret[key] = results[key];
          if (ret[key].errors) {
            var errors = ret.errors || [];
            ret[key].errors.forEach(function (error) {
              errors.push(error);
            });
            ret.errors = errors;
          }
        });
        return ret
      }
    },
    watch: {
      results: function results (val, old) {
        var keys = this._validityKeys;
        var results = this.results;
        this.valid = this.checkResults(keys, results, 'valid', true);
        this.dirty = this.checkResults(keys, results, 'dirty', false);
        this.touched = this.checkResults(keys, results, 'touched', false);
        this.modified = this.checkResults(keys, results, 'modified', false);
      }
    },
    created: function created () {
      this._validities = Object.create(null);
      this._validityWatchers = Object.create(null);
      this._validityKeys = [];
      this._committing = false;
    },
    destroyed: function destroyed () {
      var this$1 = this;

      this._validityKeys.forEach(function (key) {
        this$1._validityWatchers[key]();
        delete this$1._validityWatchers[key];
        delete this$1._validities[key];
      });
      delete this._validityWatchers;
      delete this._validities;
      delete this._validityKeys;
    },
    methods: {
      register: function register (name, validity) {
        var this$1 = this;

        this._validities[name] = validity;
        this._validityKeys = Object.keys(this._validities);
        this.setResults(name, {});
        this.withCommit(function () {
          this$1._validityWatchers[name] = validity.$watch('result', function (val, old) {
            this$1.setResults(name, val);
          }, { deep: true, immediate: true });
        });
      },
      unregister: function unregister (name) {
        var this$1 = this;

        this._validityWatchers[name]();
        delete this._validityWatchers[name];
        delete this._validities[name];
        this._validityKeys = Object.keys(this._validities);
        this.withCommit(function () {
          this$1.resetResults(name);
        });
      },
      isRegistered: function isRegistered (name) {
        return name in this._validities
      },
      getValidityKeys: function getValidityKeys () {
        return this._validityKeys
      },
      checkResults: function checkResults (
        keys,
        results,
        prop,
        checking
      ) {
        var ret = checking;
        for (var i = 0; i < keys.length; i++) {
          var result = results[keys[i]];
          if (result[prop] !== checking) {
            ret = !checking;
            break
          }
        }
        return ret
      },
      setResults: function setResults (name, val) {
        var this$1 = this;

        var newVal = {};
        this._validityKeys.forEach(function (key) {
          newVal[key] = extend({}, this$1.results[key]);
        });
        newVal[name] = extend({}, val);
        this.results = newVal;
      },
      resetResults: function resetResults (ignore) {
        var this$1 = this;

        var newVal = {};
        this._validityKeys.forEach(function (key) {
          if (ignore && ignore !== key) {
            newVal[key] = extend({}, this$1.results[key]);
          }
        });
        this.results = newVal;
      },
      withCommit: function withCommit (fn) {
        var committing = this._committing;
        this._committing = true;
        fn();
        this._committing = committing;
      }
    }
  }
};

/*  */
var ValidationClass = function (Vue) {
  var ValidityGroup = Group(Vue);

  var Validation = function Validation (options) {
    if ( options === void 0 ) options = {};

    this._result = {};
    this._host = options.host;
    this._named = Object.create(null);
    this._group = Object.create(null);
    this._validities = Object.create(null);
    this._beginDestroy = false;
    Vue.util.defineReactive(this._host, '$validation', this._result);
  };

  Validation.prototype.register = function register (
    field,
    validity,
    options
  ) {
      if ( options === void 0 ) options = {};

    // NOTE: lazy setup (in constructor, occured callstack recursive errors ...)
    if (!this._validityManager) {
      this._validityManager = new Vue(ValidityGroup);
      this._watchValidityResult();
    }

    if (this._validities[field]) {
      // TODO: should be output console.error
      return
    }
    this._validities[field] = validity;

    var named = options.named;
      var group = options.group;
    var groupValidity = group
      ? this._getValidityGroup('group', group) || this._registerValidityGroup('group', group)
      : null;
    var namedValidity = named
      ? this._getValidityGroup('named', named) || this._registerValidityGroup('named', named)
      : null;
    if (named && group && namedValidity && groupValidity) {
      groupValidity.register(field, validity);
      !namedValidity.isRegistered(group) && namedValidity.register(group, groupValidity);
      !this._validityManager.isRegistered(named) && this._validityManager.register(named, namedValidity);
    } else if (namedValidity) {
      namedValidity.register(field, validity);
      !this._validityManager.isRegistered(named) && this._validityManager.register(named, namedValidity);
    } else if (groupValidity) {
      groupValidity.register(field, validity);
      !this._validityManager.isRegistered(group) && this._validityManager.register(group, groupValidity);
    } else {
      this._validityManager.register(field, validity);
    }
  };

  Validation.prototype.unregister = function unregister (
    field,
    options
  ) {
      if ( options === void 0 ) options = {};

    if (!this._validityManager) {
      // TODO: should be output error
      return
    }

    if (!this._validities[field]) {
      // TODO: should be output error
      return
    }
    delete this._validities[field];

    var named = options.named;
      var group = options.group;
    var groupValidity = group ? this._getValidityGroup('group', group) : null;
    var namedValidity = named ? this._getValidityGroup('named', named) : null;
    if (named && group && namedValidity && groupValidity) {
      groupValidity.unregister(field);
      namedValidity.isRegistered(group) && namedValidity.unregister(group);
      this._validityManager.isRegistered(named) && this._validityManager.unregister(named);
    } else if (namedValidity) {
      namedValidity.unregister(field);
      this._validityManager.isRegistered(named) && this._validityManager.unregister(named);
    } else if (groupValidity) {
      groupValidity.unregister(field);
      this._validityManager.isRegistered(group) && this._validityManager.unregister(group);
    } else {
      this._validityManager.unregister(field);
    }

    group && this._unregisterValidityGroup('group', group);
    named && this._unregisterValidityGroup('named', named);
  };

  Validation.prototype.destroy = function destroy () {
      var this$1 = this;

    var validityKeys = Object.keys(this._validities);
    var namedKeys = Object.keys(this._named);
    var groupKeys = Object.keys(this._group);

    // unregister validity
    validityKeys.forEach(function (validityKey) {
      groupKeys.forEach(function (groupKey) {
        var group = this$1._getValidityGroup('group', groupKey);
        if (group && group.isRegistered(groupKey)) {
          group.unregister(validityKey);
        }
      });
      namedKeys.forEach(function (namedKey) {
        var named = this$1._getValidityGroup('named', namedKey);
        if (named && named.isRegistered(validityKey)) {
          named.unregister(validityKey);
        }
      });
      if (this$1._validityManager.isRegistered(validityKey)) {
        this$1._validityManager.unregister(validityKey);
      }
      delete this$1._validities[validityKey];
    });

    // unregister grouped validity
    groupKeys.forEach(function (groupKey) {
      namedKeys.forEach(function (namedKey) {
        var named = this$1._getValidityGroup('named', namedKey);
        if (named && named.isRegistered(groupKey)) {
          named.unregister(groupKey);
        }
      });
      if (this$1._validityManager.isRegistered(groupKey)) {
        this$1._validityManager.unregister(groupKey);
      }
      this$1._unregisterValidityGroup('group', groupKey);
    });

    // unregister named validity
    namedKeys.forEach(function (namedKey) {
      if (this$1._validityManager.isRegistered(namedKey)) {
        this$1._validityManager.unregister(namedKey);
      }
      this$1._unregisterValidityGroup('named', namedKey);
    });

    this._beginDestroy = true;
  };

  Validation.prototype._getValidityGroup = function _getValidityGroup (type, name) {
    return type === 'named' ? this._named[name] : this._group[name]
  };

  Validation.prototype._registerValidityGroup = function _registerValidityGroup (type, name) {
    var groups = type === 'named' ? this._named : this._group;
    groups[name] = new Vue(ValidityGroup);
    return groups[name]
  };

  Validation.prototype._unregisterValidityGroup = function _unregisterValidityGroup (type, name) {
    var groups = type === 'named' ? this._named : this._group;
    if (!groups[name]) {
      // TODO: should be warn
      return
    }

    groups[name].$destroy();
    delete groups[name];
  };

  Validation.prototype._watchValidityResult = function _watchValidityResult () {
      var this$1 = this;

    this._watcher = this._validityManager.$watch('results', function (val, old) {
      Vue.set(this$1._host, '$validation', val);
      if (this$1._beginDestroy) {
        this$1._destroyValidityMananger();
      }
    }, { deep: true });
  };

  Validation.prototype._unwatchValidityResult = function _unwatchValidityResult () {
    this._watcher();
    delete this._watcher;
  };

  Validation.prototype._destroyValidityMananger = function _destroyValidityMananger () {
    this._unwatchValidityResult();
    this._validityManager.$destroy();
    this._validityManager = null;
  };

  return Validation
};

/*  */

var Mixin = function (Vue) {
  var Validation = ValidationClass(Vue);

  return {
    beforeCreate: function beforeCreate () {
      this._validation = new Validation({ host: this });
    }
  }
};

/*  */

var baseProps = {
  field: {
    type: String,
    required: true
  },
  validators: {
    type: [String, Array, Object],
    required: true
  },
  group: {
    type: String
  },
  multiple: {
    type: Boolean
  },
  classes: {
    type: Object,
    default: function () {
      return {}
    }
  }
};

var DEFAULT_CLASSES = {
  valid: 'valid',
  invalid: 'invalid',
  touched: 'touched',
  untouched: 'untouched',
  pristine: 'pristine',
  dirty: 'dirty',
  modified: 'modified'
};

/*  */
var States = function (Vue) {
  var ref = Vue.util;
  var extend = ref.extend;

  var props = extend({
    child: {
      type: Object,
      required: true
    }
  }, baseProps);

  function data () {
    var validators = nomalizeValidators(this.validators);
    return {
      results: getInitialResults(validators),
      valid: true,
      dirty: false,
      touched: false,
      modified: false,
      progresses: getInitialProgresses(validators)
    }
  }

  return {
    props: props,
    data: data
  }
};

function nomalizeValidators (target) {
  var validators;
  if (typeof target === 'string') {
    validators = [target];
  } else if (Array.isArray(target)) {
    validators = target;
  } else {
    validators = Object.keys(target);
  }
  return validators
}

function getInitialResults (validators) {
  var results = {};
  validators.forEach(function (validator) {
    results[validator] = undefined;
  });
  return results
}

function getInitialProgresses (validators) {
  var progresses = {};
  validators.forEach(function (validator) {
    progresses[validator] = '';
  });
  return progresses
}

/*  */

var Computed = function (Vue) {
  function invalid () {
    return !this.valid
  }

  function pristine () {
    return !this.dirty
  }

  function untouched () {
    return !this.touched
  }

  function result () {
    var this$1 = this;

    var ret = {
      valid: this.valid,
      invalid: this.invalid,
      dirty: this.dirty,
      pristine: this.pristine,
      touched: this.touched,
      untouched: this.untouched,
      modified: this.modified
    };

    var keys = this._keysCached(this._uid.toString(), this.results);
    keys.forEach(function (validator) {
      var result = getValidatorResult(validator, this$1.results[validator]);
      if (result === false) { // success
        ret[validator] = false;
      } else { // failed
        var error = { field: this$1.field, validator: validator };
        if (typeof result === 'string') {
          error.message = result;
        }
        if (!ret.errors) {
          ret.errors = [];
        }
        if (Array.isArray(ret.errors)) {
          ret.errors.push(error);
        }
        ret[validator] = result;
      }
    });

    return ret
  }

  return {
    invalid: invalid,
    pristine: pristine,
    untouched: untouched,
    result: result
  }
};

function getValidatorResult (
  validator,
  result
) {
  if (typeof result === 'boolean' && !result) {
    return true
  }

  if (typeof result === 'string' && result) {
    return result
  }

  return false
}

/*  */

var Render = function (Vue) {
  return {
    render: function render (h) {
      this._interceptEvents(this.child, this.multiple);
      return this.child
    }
  }
};

/*  */
function addEventInfo (e) {
  e[MODEL_NOTIFY_EVENT] = 'DOM';
}

function modelValueEqual (vnode) {
  var directives = (vnode.data && vnode.data.directives) || [];
  var directive = directives.find(function (dir) {
    return dir.name === 'model'
  });
  return (!directive || directive.oldValue === undefined)
    ? null
    : looseEqual(directive.value, directive.oldValue)
}

/*  */
var SingleElement = function SingleElement (vm, vnode) {
  this._vm = vm;
  this._vnode = vnode;
  this.initValue = this.getValue();
  this.attachValidity();
};

var prototypeAccessors = { _isBuiltIn: {},_isComponent: {} };

prototypeAccessors._isBuiltIn.get = function () {
  var vnode = this._vnode;
  return !vnode.child &&
    !vnode.componentOptions &&
    vnode.tag
};

prototypeAccessors._isComponent.get = function () {
  var vnode = this._vnode;
  return vnode.child &&
    vnode.componentOptions &&
    vnode.tag.match(/vue-component/)
};

SingleElement.prototype.attachValidity = function attachValidity () {
  this._vm.$el.$validity = this._vm;
};

SingleElement.prototype.getValue = function getValue () {
  if (this._isBuiltIn) {
    var el = this._vm.$el;
    if (el.tagName === 'SELECT') {
      return getSelectValue(el)
    } else {
      if (el.type === 'checkbox') {
        return el.checked
      } else {
        return el.value
      }
    }
  } else if (this._isComponent) {
    return this._vnode.child.value
  } else {
    // TODO: should be warn !!
    return ''
  }
};

SingleElement.prototype.checkModified = function checkModified () {
  if (this._isBuiltIn) {
    var el = this._vm.$el;
    if (el.tagName === 'SELECT') {
      return !looseEqual(this.initValue, getSelectValue(el))
    } else {
      if (el.type === 'checkbox') {
        return !looseEqual(this.initValue, el.checked)
      } else {
        return !looseEqual(this.initValue, el.value)
      }
    }
  } else if (this._isComponent) {
    return !looseEqual(this.initValue, this._vnode.child.value)
  } else {
    // TODO: should be warn !!
    return false
  }
};

SingleElement.prototype.listenToucheableEvent = function listenToucheableEvent () {
  this._vm.$el.addEventListener('focusout', this._vm.willUpdateTouched);
};

SingleElement.prototype.unlistenToucheableEvent = function unlistenToucheableEvent () {
  this._vm.$el.removeEventListener('focusout', this._vm.willUpdateTouched);
};

SingleElement.prototype.listenInputableEvent = function listenInputableEvent () {
  var vm = this._vm;
  if (this._isBuiltIn) {
    var el = vm.$el;
    if (el.tagName === 'SELECT') {
      el.addEventListener('change', vm.handleInputable);
    } else {
      if (el.type === 'checkbox') {
        el.addEventListener('change', vm.handleInputable);
      } else {
        el.addEventListener('input', vm.handleInputable);
      }
    }
  } else if (this._isComponent) {
    this._unwatchInputable = this._vnode.child.$watch('value', vm.watchInputable);
  } else {
    // TODO: should be warn !!
  }
};

SingleElement.prototype.unlistenInputableEvent = function unlistenInputableEvent () {
  var vm = this._vm;
  if (this._isBuiltIn) {
    var el = vm.$el;
    if (el.tagName === 'SELECT') {
      el.removeEventListener('change', vm.handleInputable);
    } else {
      if (el.type === 'checkbox') {
        el.removeEventListener('change', vm.handleInputable);
      } else {
        el.removeEventListener('input', vm.handleInputable);
      }
    }
  } else if (this._isComponent) {
    if (this._unwatchInputable) {
      this._unwatchInputable();
      this._unwatchInputable = undefined;
      delete this._unwatchInputable;
    }
  } else {
    // TODO: should be warn !!
  }
};

SingleElement.prototype.fireInputableEvent = function fireInputableEvent () {
  if (this._isBuiltIn) {
    var el = this._vm.$el;
    if (el.tagName === 'SELECT') {
      triggerEvent(el, 'change', addEventInfo);
    } else {
      if (el.type === 'checkbox') {
        triggerEvent(el, 'change', addEventInfo);
      } else {
        triggerEvent(el, 'input', addEventInfo);
      }
    }
  } else if (this._isComponent) {
    var args = { value: this.getValue() };
    args[MODEL_NOTIFY_EVENT] = 'COMPONENT';
    this._vnode.child.$emit('input', args);
  } else {
    // TODO: should be warn !!
  }
};

SingleElement.prototype.modelValueEqual = function modelValueEqual$1 (vnode) {
  return modelValueEqual(vnode)
};

Object.defineProperties( SingleElement.prototype, prototypeAccessors );

function getSelectValue (el) {
  var value = [];
  for (var i = 0, l = el.options.length; i < l; i++) {
    var option = el.options[i];
    if (!option.disabled && option.selected) {
      value.push(option.value);
    }
  }
  return value
}

/*  */
var MultiElement = function MultiElement (vm) {
  // TODO: should be checked whether included radio or checkbox
  this._vm = vm;
  this.initValue = this.getValue();
  this.attachValidity();
};

MultiElement.prototype.attachValidity = function attachValidity () {
    var this$1 = this;

  this._vm.$el.$validity = this._vm;
  this._eachItems(function (item) {
    item.$validity = this$1._vm;
  });
};

MultiElement.prototype.getValue = function getValue () {
  return this._getCheckedValue()
};

MultiElement.prototype.checkModified = function checkModified () {
  return !looseEqual(this.initValue, this._getCheckedValue())
};

MultiElement.prototype.listenToucheableEvent = function listenToucheableEvent () {
    var this$1 = this;

  this._eachItems(function (item) {
    item.addEventListener('focusout', this$1._vm.willUpdateTouched);
  });
};

MultiElement.prototype.unlistenToucheableEvent = function unlistenToucheableEvent () {
    var this$1 = this;

  this._eachItems(function (item) {
    item.removeEventListener('focusout', this$1._vm.willUpdateTouched);
  });
};

MultiElement.prototype.listenInputableEvent = function listenInputableEvent () {
    var this$1 = this;

  this._eachItems(function (item) {
    item.addEventListener('change', this$1._vm.handleInputable);
  });
};

MultiElement.prototype.unlistenInputableEvent = function unlistenInputableEvent () {
    var this$1 = this;

  this._eachItems(function (item) {
    item.removeEventListener('change', this$1._vm.handleInputable);
  });
};

MultiElement.prototype.fireInputableEvent = function fireInputableEvent () {
  this._eachItems(function (item) {
    triggerEvent(item, 'change', addEventInfo);
  });
};

MultiElement.prototype.modelValueEqual = function modelValueEqual$1 (vnode) {
  var ret = null;
  var children = (this._vm.child && this._vm.child.children) || [];
  for (var i = 0; i < children.length; i++) {
    var maybeEqual = modelValueEqual(children[i]);
    if (!maybeEqual) {
      ret = maybeEqual;
      break
    }
  }
  return ret
};

MultiElement.prototype._getCheckedValue = function _getCheckedValue () {
  var value = [];
  this._eachItems(function (item) {
    if (!item.disabled && item.checked) {
      value.push(item.value);
    }
  });
  return value
};

MultiElement.prototype._getItems = function _getItems () {
  return this._vm.$el.querySelectorAll('input[type="checkbox"], input[type="radio"]')
};

MultiElement.prototype._eachItems = function _eachItems (cb) {
  var items = this._getItems();
  for (var i = 0; i < items.length; i++) {
    cb(items[i]);
  }
};

/*  */

/*  */
var Lifecycles = function (Vue) {
  function created () {
    this._elementable = null;

    this._keysCached = memoize(function (results) {
      return Object.keys(results)
    });

    // for event control flags
    this._modified = false;

    // for v-model integration flag
    this._modelIntegrationMode = 'NONE';

    // watch validation raw results
    this._watchValidationRawResults();

    var validation = this.$options.propsData ? this.$options.propsData.validation : null;
    if (validation) {
      var instance = validation.instance;
      var name = validation.name;
      var group = this.group;
      instance.register(this.field, this, { named: name, group: group });
    }
  }

  function destroyed () {
    var validation = this.$options.propsData ? this.$options.propsData.validation : null;
    if (validation) {
      var instance = validation.instance;
      var name = validation.name;
      var group = this.group;
      instance.unregister(this.field, this, { named: name, group: group });
    }

    this._unwatchValidationRawResults();

    this._elementable.unlistenInputableEvent();
    this._elementable.unlistenToucheableEvent();
    this._elementable = null;
  }

  function mounted () {
    this._elementable = createValidityElement(this);
    this._elementable.listenToucheableEvent();
    this._elementable.listenInputableEvent();

    toggleClasses(this.$el, this.classes.untouched, addClass);
    toggleClasses(this.$el, this.classes.pristine, addClass);
  }

  function updated () {
    if (this._modelIntegrationMode === 'MODEL_AND_USER') {
      var maybeChangeModel = this._elementable.modelValueEqual(this._vnode);
      if (!this._applyWithUserHandler && maybeChangeModel !== null && !maybeChangeModel) {
        this._elementable.fireInputableEvent();
      }
      delete this._applyWithUserHandler;
    } else if (this._modelIntegrationMode === 'MODEL') {
      var maybeChangeModel$1 = this._elementable.modelValueEqual(this._vnode);
      if (maybeChangeModel$1 !== null && !maybeChangeModel$1) {
        this._elementable.fireInputableEvent();
      }
    }
  }

  return {
    created: created,
    destroyed: destroyed,
    mounted: mounted,
    updated: updated
  }
};

function memoize (fn) {
  var cache = Object.create(null);
  return function memoizeFn (id) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    var hit = cache[id];
    return hit || (cache[id] = fn.apply(void 0, args))
  }
}

function createValidityElement (vm) {
  var vnode = vm._vnode;
  return !vm.multiple
    ? new SingleElement(vm, vnode)
    : new MultiElement(vm)
}

/*  */
var Event = function (Vue) {
  var ref = Vue.util;
  var toArray = ref.toArray;

  function _fireEvent (type) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    (ref = this).$emit.apply(ref, [ type ].concat( args ));
    var ref;
  }

  function _interceptEvents (child, multiple) {
    var this$1 = this;

    (multiple ? (child.children || []) : [child]).forEach(function (child) { this$1._wrapEvent(child); });
  }

  function _wrapEvent (child) {
    var this$1 = this;

    var ret = {};
    if (!child.tag || !child.data) { return ret }

    var dir = getModelDirective(child);
    if (!dir) { return ret }

    var ref = getEventSources(child);
    var type = ref.type;
    var orgListeners = ref.orgListeners;
    var listeners = ref.listeners;
    var modelHandler = Array.isArray(orgListeners) ? orgListeners[0] : orgListeners;
    var userHandler = Array.isArray(orgListeners) ? orgListeners[1] : null;

    var integrationMode = this._modelIntegrationMode;
    if (modelHandler && userHandler) {
      integrationMode = this._modelIntegrationMode = 'MODEL_AND_USER';
    } else if (modelHandler && !userHandler) {
      integrationMode = this._modelIntegrationMode = 'MODEL';
    }

    var modelApplyer = function (args) {
      return function (applicable) {
        if (userHandler) {
          this$1._applyWithUserHandler = true;
        }
        if (applicable === undefined || applicable === true) {
          modelHandler.apply(child.context, args);
        }
      }
    };

    var modifier = (dir.modifiers || {}).validity;

    var validity = this;
    listeners[type] = function () {
      var args = toArray(arguments, 0);
      if (integrationMode === 'MODEL_AND_USER') {
        var event = args[0];
        if (event[MODEL_NOTIFY_EVENT] === 'DOM') {
          delete event[MODEL_NOTIFY_EVENT];
          userHandler && userHandler.apply(child.context, args);
          return
        } else if (event[MODEL_NOTIFY_EVENT] === 'COMPONENT') {
          var value = event.value;
          args[0] = value;
          userHandler && userHandler.apply(child.context, args);
          return
        }

        if (modifier) {
          var fn = validity._applyer = modelApplyer(args);
          args.push(fn);
          userHandler && userHandler.apply(child.context, args);
        } else {
          userHandler && userHandler.apply(child.context, args);
          modelHandler.apply(child.context, args);
        }
      } else if (integrationMode === 'MODEL') {
        if (modifier) {
          validity._applyer = modelApplyer(args);
        } else {
          modelHandler.apply(child.context, args);
        }
      }
    };

    ret.dir = dir;
    return ret
  }

  function pass (applicable) {
    // TODO: should be implementsed error cases
    if (this._modelIntegrationMode !== 'NONE' && this._applyer) {
      this._applyer(applicable);
    }
  }

  return {
    _fireEvent: _fireEvent,
    _interceptEvents: _interceptEvents,
    _wrapEvent: _wrapEvent,
    pass: pass
  }
};

function getModelDirective (child) {
  return ((child.data && child.data.directives) || []).find(function (dir) { return dir.name === 'model' })
}

function getEventSources (child) {
  var sources = {};
  var listeners = sources.listeners = child.componentOptions
      ? child.componentOptions.listeners
      : (child.data && child.data.on);
  sources.type =
    (child.tag === 'input' && (child.data && child.data.attrs && child.data.attrs.type) === 'text') ||
    (child.tag && child.tag.match(/vue-component/))
      ? 'input'
      : 'change';
  if (listeners) {
    sources.orgListeners = listeners[sources.type];
  }
  return sources
}

/*  */
var State = function (Vue) {
  function getValue (options) {
    return this._elementable.getValue()
  }

  function checkModified () {
    return this._elementable.checkModified()
  }

  function willUpdateTouched (options) {
    if (!this.touched) {
      this.touched = true;
      toggleClasses(this.$el, this.classes.touched, addClass);
      toggleClasses(this.$el, this.classes.untouched, removeClass);
      this._fireEvent('touched');
    }
  }

  function willUpdateDirty () {
    if (!this.dirty && this.checkModified()) {
      this.dirty = true;
      toggleClasses(this.$el, this.classes.dirty, addClass);
      toggleClasses(this.$el, this.classes.pristine, removeClass);
      this._fireEvent('dirty');
    }
  }

  function willUpdateModified () {
    var modified = this.modified = this.checkModified();
    if (this._modified !== modified) {
      this._modified = modified;
      toggleClasses(this.$el, this.classes.modified, modified ? addClass : removeClass);
      this._fireEvent('modified', modified);
    }
  }

  function handleInputable (e) {
    this.willUpdateDirty();
    this.willUpdateModified();
  }

  function watchInputable (val) {
    this.willUpdateDirty();
    this.willUpdateModified();
  }

  function reset () {
    var this$1 = this;

    this._unwatchValidationRawResults();
    var keys = this._keysCached(this._uid.toString(), this.results);
    for (var i = 0; i < keys.length; i++) {
      this$1.results[keys[i]] = undefined;
      this$1.progresses[keys[i]] = '';
    }
    toggleClasses(this.$el, this.classes.valid, removeClass);
    toggleClasses(this.$el, this.classes.invalid, removeClass);
    toggleClasses(this.$el, this.classes.touched, removeClass);
    toggleClasses(this.$el, this.classes.untouched, addClass);
    toggleClasses(this.$el, this.classes.dirty, removeClass);
    toggleClasses(this.$el, this.classes.pristine, addClass);
    toggleClasses(this.$el, this.classes.modified, removeClass);
    this.valid = true;
    this.dirty = false;
    this.touched = false;
    this.modified = false;
    this._modified = false;
    this._watchValidationRawResults();
  }

  function _watchValidationRawResults () {
    var this$1 = this;

    this._unwatch = this.$watch('results', function (val) {
      var valid = true;
      var keys = this$1._keysCached(this$1._uid.toString(), this$1.results);
      for (var i = 0; i < keys.length; i++) {
        var result = this$1.results[keys[i]];
        if (typeof result === 'boolean' && !result) {
          valid = false;
          break
        }
        if (typeof result === 'string' && result) {
          valid = false;
          break
        }
      }
      this$1.valid = valid;

      if (valid) {
        toggleClasses(this$1.$el, this$1.classes.valid, addClass);
        toggleClasses(this$1.$el, this$1.classes.invalid, removeClass);
      } else {
        toggleClasses(this$1.$el, this$1.classes.valid, removeClass);
        toggleClasses(this$1.$el, this$1.classes.invalid, addClass);
      }

      this$1._fireEvent(valid ? 'valid' : 'invalid');
    }, { deep: true });
  }

  function _unwatchValidationRawResults () {
    this._unwatch();
    this._unwatch = undefined;
    delete this._unwatch;
  }

  return {
    getValue: getValue,
    checkModified: checkModified,
    willUpdateTouched: willUpdateTouched,
    willUpdateDirty: willUpdateDirty,
    willUpdateModified: willUpdateModified,
    handleInputable: handleInputable,
    watchInputable: watchInputable,
    reset: reset,
    _watchValidationRawResults: _watchValidationRawResults,
    _unwatchValidationRawResults: _unwatchValidationRawResults
  }
};

/*  */

/**
 * Forgiving check for a promise
 */
function isPromise (p) {
  return p && typeof p.then === 'function'
}

var Validate = function (Vue) {
  var ref = Vue.util;
  var isPlainObject = ref.isPlainObject;
  var resolveAsset = ref.resolveAsset;

  function _resolveValidator (name) {
    var options = (this.child && this.child.context)
      ? this.child.context.$options
      : this.$options;
    return resolveAsset(options, 'validators', name)
  }

  function _getValidateDescriptor (
    validator,
    field,
    value
  ) {
    var asset = this._resolveValidator(validator);
    if (!asset) {
      // TODO: should be warned
      return null
    }

    var fn = null;
    var rule = null;
    var msg = null;
    if (isPlainObject(asset)) {
      if (asset.check && typeof asset.check === 'function') {
        fn = asset.check;
      }
      if (asset.message) {
        msg = asset.message;
      }
    } else if (typeof asset === 'function') {
      fn = asset;
    } else {
      // TODO: should be warned
      return null
    }

    if (!fn) {
      // TODO: should be warned
      return null
    }

    if (isPlainObject(this.validators)) {
      if (isPlainObject(this.validators[validator])) {
        if (this.validators[validator].rule) {
          rule = this.validators[validator].rule;
        }
        if (this.validators[validator].message) {
          msg = this.validators[validator].message;
        }
      } else {
        rule = this.validators[validator];
      }
    }

    var descriptor = { fn: fn, value: value, field: field };
    if (rule) {
      descriptor.rule = rule;
    }
    if (msg) {
      descriptor.msg = msg;
    }

    return descriptor
  }

  function _resolveMessage (
    field,
    msg,
    override
  ) {
    if (override) { return override }
    return msg
      ? typeof msg === 'function'
        ? msg(field)
        : msg
      : undefined
  }

  function _invokeValidator (
    ref,
    cb
  ) {
    var this$1 = this;
    var fn = ref.fn;
    var value = ref.value;
    var field = ref.field;
    var rule = ref.rule;
    var msg = ref.msg;

    var future = fn.call(this.child.context, value, rule);
    if (typeof future === 'function') { // function
      future(function () { // resolve
        cb(true);
      }, function (err) { // reject
        cb(false, this$1._resolveMessage(field, msg, err));
      });
    } else if (isPromise(future)) { // promise
      future.then(function () { // resolve
        cb(true);
      }, function (err) { // reject
        cb(false, this$1._resolveMessage(field, msg, err));
      }).catch(function (err) {
        cb(false, this$1._resolveMessage(field, msg, err.message));
      });
    } else { // sync
      cb(future, future === false ? this._resolveMessage(field, msg) : undefined);
    }
  }

  function _validate (validator, value, cb) {
    var this$1 = this;

    var descriptor = this._getValidateDescriptor(validator, this.field, value);
    if (descriptor) {
      if (this.progresses[validator]) { return false }
      this.progresses[validator] = 'running';
      this.$nextTick(function () {
        this$1._invokeValidator(descriptor, function (ret, msg) {
          this$1.progresses[validator] = '';
          this$1.results[validator] = msg || ret;
          if (cb) {
            this$1.$nextTick(function () {
              cb.call(this$1, null, ret, msg);
            });
          } else {
            var e = { result: ret };
            if (msg) {
              e['msg'] = msg;
            }
            this$1._fireEvent('validate', validator, e);
          }
        });
      });
    } else {
      // TODO:
      var err = new Error();
      cb ? cb.call(this, err) : this._fireEvent('validate', validator, err);
    }
    return true
  }

  // TODO: should be re-design of API
  function validate () {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var validators;
    var value;
    var cb;
    var ret = true;

    if (args.length === 3) {
      validators = [args[0]];
      value = args[1];
      cb = args[2];
    } else if (args.length === 2) {
      if (isPlainObject(args[0])) {
        validators = [args[0].validator];
        value = args[0].value || this.getValue();
        cb = args[1];
      } else {
        validators = this._keysCached(this._uid.toString(), this.results);
        value = args[0];
        cb = args[1];
      }
    } else if (args.length === 1) {
      validators = this._keysCached(this._uid.toString(), this.results);
      value = this.getValue();
      cb = args[0];
    } else {
      validators = this._keysCached(this._uid.toString(), this.results);
      value = this.getValue();
      cb = null;
    }

    if (args.length === 3 || (args.length === 2 && isPlainObject(args[0]))) {
      ret = this._validate(validators[0], value, cb);
    } else {
      validators.forEach(function (validator) {
        ret = this$1._validate(validator, value, cb);
      });
    }

    return ret
  }

  return {
    _resolveValidator: _resolveValidator,
    _getValidateDescriptor: _getValidateDescriptor,
    _resolveMessage: _resolveMessage,
    _invokeValidator: _invokeValidator,
    _validate: _validate,
    validate: validate
  }
};

/*  */

var Methods = function (Vue) {
  var ref = Vue.util;
  var extend = ref.extend;

  var methods = {};
  extend(methods, Event(Vue));
  extend(methods, State(Vue));
  extend(methods, Validate(Vue));

  return methods
};

/*  */

var ValidityControl = function (Vue) {
  var ref = Vue.util;
  var extend = ref.extend;

  var ref$1 = States(Vue);
  var props = ref$1.props;
  var data = ref$1.data;
  var computed = Computed(Vue);
  var lifecycles = Lifecycles(Vue);
  var ref$2 = Render(Vue);
  var render = ref$2.render;
  var methods = Methods(Vue);

  var validity = {
    props: props,
    data: data,
    render: render,
    computed: computed,
    methods: methods
  };
  extend(validity, lifecycles);

  return validity
};

/*  */
var Validity = function (Vue) {
  var ref = Vue.util;
  var extend = ref.extend;

  return {
    functional: true,
    props: baseProps,
    render: function render (
      h,
      ref
    ) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;

      return children.map(function (child) {
        if (!child.tag) { return child }
        var newData = extend({}, data);
        newData.props = extend({}, props);
        // TODO: should be refactored
        newData.props.classes = extend(extend(extend({}, DEFAULT_CLASSES), Vue.config.validator.classes), newData.props.classes);
        newData.props.child = child;
        return h('validity-control', newData)
      })
    }
  }
};

/*  */
var ValidityGroup = function (Vue) {
  var ref = Vue.util;
  var extend = ref.extend;

  var props = extend({
    tag: {
      type: String,
      default: 'fieldset'
    }
  }, baseProps);

  return {
    functional: true,
    props: props,
    render: function render (
      h,
      ref
    ) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;

      var child = h(props.tag, children);
      var newData = extend({}, data);
      newData.props = extend({}, props);
      // TODO: should be refactored
      newData.props.classes = extend(extend(extend({}, DEFAULT_CLASSES), Vue.config.validator.classes), newData.props.classes);
      newData.props.child = child;
      newData.props.multiple = true;
      return h('validity-control', newData)
    }
  }
};

/*  */

var Validation = function (Vue) {
  var ref = Vue.util;
  var extend = ref.extend;

  return {
    functional: true,
    props: {
      name: {
        type: String
      },
      tag: {
        type: String,
        default: 'form'
      }
    },
    render: function render (
      h,
      ref
    ) {
      var props = ref.props;
      var data = ref.data;
      var parent = ref.parent;
      var children = ref.children;
      var slots = ref.slots;

      if (!parent._validation) {
        // TODO: should be warned
        return children
      }
      var tag = props.tag || 'form';
      walkChildren(parent._validation, props.name, children);
      var newData = extend({ attrs: {}}, data);
      if (tag === 'form') {
        newData.attrs.novalidate = true;
      }
      return h(tag, newData, children)
    }
  }
};

function walkChildren (validation, name, children) {
  children.forEach(function (child) {
    if (child &&
        child.componentOptions &&
        child.componentOptions.propsData && child.componentOptions.tag === 'validity-control') {
      child.componentOptions.propsData.validation = {
        instance: validation,
        name: name
      };
    }
    child.children && walkChildren(validation, name, child.children);
  });
}

/*  */
var Component = function (Vue) {
  return {
    'validity-control': ValidityControl(Vue),
    'validity': Validity(Vue),
    'validity-group': ValidityGroup(Vue),
    'validation': Validation(Vue)
  }
};

/*  */
var installed = false;

function plugin (Vue, options) {
  if ( options === void 0 ) options = {};

  if (installed) {
    warn('already installed.');
    return
  }

  Config(Vue);
  Asset(Vue);
  installMixin(Vue);
  installComponent(Vue);
  installed = true;
}

function installMixin (Vue) {
  Vue.mixin(Mixin(Vue));
}

function installComponent (Vue) {
  var components = Component(Vue);
  Object.keys(components).forEach(function (id) {
    Vue.component(id, components[id]);
  });
}

plugin.mapValidation = mapValidation; // for standalone
plugin.version = '3.0.0-alpha.1';

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

var index = {
  install: plugin,
  mapValidation: mapValidation
};

return index;

})));
