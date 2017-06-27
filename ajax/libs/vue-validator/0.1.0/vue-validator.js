;(function(){

/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module._resolving && !module.exports) {
    var mod = {};
    mod.exports = {};
    mod.client = mod.component = true;
    module._resolving = true;
    module.call(this, mod.exports, require.relative(resolved), mod);
    delete module._resolving;
    module.exports = mod.exports;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("vue-validator/index.js", function(exports, require, module){
var slice = [].slice
var hasOwn = ({}).hasOwnProperty


/**
 * export(s)
 */

module.exports = function (Vue) {
  var utils = Vue.require('utils')
  var Directive = Vue.require('directive')
  var Binding = Vue.require('binding')
  var Observer = Vue.require('observer')

  var validationKey = '$validation'
  var validationPropertyName = validationKey.split('$')[1]
  var validKey = '$valid'

  Vue.filter('required', validateRequired)
  Vue.filter('pattern', validatePattern)
  Vue.filter('length', validateLength)
  Vue.filter('numeric', validateNumeric)
  Vue.filter('validator', validateCustom)

  Vue.directive('validate', {
    bind: function () {
      var compiler = this.compiler
      var $validation = compiler[validationPropertyName] || {}
      var el = this.el
      var vm = this.vm
      var observer = compiler.observer
      var validationBindings = this.validationBindings = {}

      // enable $validation
      vm[validationKey] = compiler[validationPropertyName] = $validation
      Observer.observe($validation, validationKey, compiler.observer)
      compiler.bindings[validationKey] = new Binding(compiler, validationKey)
      validationBindings[validationKey] = compiler.bindings[validationKey]

      // register validation state from v-model directive
      function registerValidation (element) {
        if (element.nodeType === 1 
          && element.tagName !== 'SCRIPT' 
          && element.hasChildNodes()) {
          slice.call(element.childNodes).forEach(function (node) {
            if (node.nodeType === 1) {
              if (node.hasChildNodes()) {
                registerValidation(node)
              } else {
                var tag = node.tagName
                if ((tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') 
                  && node.hasAttributes) {
                  var attrs = slice.call(node.attributes)
                  for (var i = 0; i < attrs.length; i++) {
                    var attr = attrs[i]
                    if (attr.name === 'v-model') {
                      var asts = Directive.parse(attr.value)
                      var key = asts[0].key
                      var filters = asts[0].filters
                      if (filters) {
                        initValidationState($validation, key, filters, compiler, validationBindings)
                        attr.value = makeFilterExpression($validation, key, filters)
                      }
                    }
                  }
                }
              }
            }
          })
        }
      }
      registerValidation(el)

      // enable $valid
      var validBinding = compiler.bindings[validKey] = new Binding(compiler, validKey)
      validationBindings[validKey] = validBinding
      Object.defineProperty(vm, validKey, {
        enumerable: true,
        configurable: true,
        get: function () {
          observer.emit('get', validKey)
          return validBinding.value
        }
      })

      // inject validation checking handle
      function updateValid () {
        var valid = true
        for (var key in $validation) {
          if ($validation[key]) {
            valid = false
            break
          }
        }
        validBinding.update(valid)
      }
      this._handleValid = function (key) {
        if (validationKey === key || validKey === key) { return }
        if (key in validationBindings) {
          updateValid()
        }
      }
      observer.on('set', this._handleValid)
    },

    unbind: function () {
      var compiler = this.compiler
      var vm = this.vm
      var observer = compiler.observer
      var $validation = compiler[validationPropertyName]
      var validationBindings = this.validationBindings
      var bindings = compiler.bindings

      // disable $valid
      observer.off(this._handleValid)
      delete this._handleValid
      delete vm[validKey]

      // release bindings
      for (var key in validationBindings) {
        var binding = bindings[key]
        if (binding) {
          binding.unbind()
          delete bindings[key]
        }
        validationBindings[key] = null
      }
      delete this.validationBindings

      // disable $validation
      Observer.unobserve($validation, validationKey, compiler.observer)
      delete compiler[validationPropertyName]
      delete vm[validationKey]
    }
  })


  function initValidationState ($validation, key, filters, compiler, validationBindings) {
    var path, bindingPath, args = []
    for (var i = 0; i < filters.length; i++) {
      var filterName = filters[i].name
      if (filterName === 'required' || filterName === 'pattern') {
        path = [key, filterName].join('.')
        bindingPath = [validationKey, key, filterName].join('.')
        makeBinding(path, bindingPath)
      } else if (filterName === 'length' || filterName === 'numeric') {
        args = parseFilterArgs(filters[i].args)
        if (filterName === 'numeric') { args.push('value') }
        for (var j = 0; j < args.length; j++) {
          path = [key, filterName, args[j]].join('.')
          bindingPath = [validationKey, key, filterName, args[j]].join('.')
          makeBinding(path, bindingPath)
        }
      } else if (filterName === 'validator') {
        path = [key, filterName, filters[i].args[0]].join('.')
        bindingPath = [validationKey, key, filterName, filters[i].args[0]].join('.')
        makeBinding(path, bindingPath)
      }
    }

    function makeBinding (path, bindingPath) {
      var binding = validationBindings[bindingPath] || new Binding(compiler, bindingPath)
      compiler.bindings[bindingPath] = validationBindings[bindingPath] = binding
      defineProperty($validation, path, binding)
    }
  }

  function parseFilterArgs (args) {
    var ret = []

    for (var i = 0; i < args.length; i++) {
      var arg = args[i], parsed = arg.split(':')
      if (parsed.length !== 2) { continue }
      ret.push(parsed[0])
    }

    return ret
  }

  function makeFilterExpression ($validation, key, filters) {
    var elements = [key]
    var ret = ''

    for (var i = 0; i < filters.length; i++) {
      var filterName = filters[i].name
      if (filters[i].args) {
        elements.push([filterName].concat(filters[i].args).concat([key]).join(' '))
      } else {
        elements.push(filterName + ' ' + key)
      }
    }

    ret = elements.join('|')
    utils.log('makeFilterExpression: ' + ret)

    return ret
  }

  function defineProperty ($validation, key, binding) {
    var observer = $validation.__emitter__

      if (!(hasOwn.call($validation, key))) {
        $validation[key] = undefined
      }

    if (observer && !(hasOwn.call(observer.values, key))) {
      Observer.convertKey($validation, key)
    }

    binding.value = $validation[key]
  }
}


/**
 * validate filters
 */

function validateRequired (val, key) {
  try {
    this.$validation[[key, 'required'].join('.')] = (val.length === 0)
  } catch (e) {
    console.error('required filter error:', e)
  }

  return val
}

function validatePattern (val) {
  try {
    var key = arguments[arguments.length - 1]
    var pattern = arguments[1].replace(/^'/, "").replace(/'$/, "")

    var match = pattern.match(/^\/(.*)\/([gim]*)$/)
    if (match) {
      var re = new RegExp(match[1], match[2])
      this.$validation[[key, 'pattern'].join('.')] = !re.test(val)
    }
  } catch (e) {
    console.error('pattern filter error:', e)
  }

  return val
}

function validateLength (val) {
  try {
    var key = arguments[arguments.length - 1]
      var minKey = [key, 'length', 'min'].join('.')
      var maxKey = [key, 'length', 'max'].join('.')
      var args = {}

    // parse length condition arguments
    for (var i = 1; i < arguments.length - 1; i++) {
      var parsed = arguments[i].split(':')
      if (parsed.length !== 2) { continue }
      if (isNaN(parsed[1])) { continue }
      args[parsed[0]] = parseInt(parsed[1])
    }

    // validate min
    if ('min' in args) {
      this.$validation[minKey] = (val.length < args['min'])
    }

    // validate max
    if ('max' in args) {
      this.$validation[maxKey] = (val.length > args['max'])
    }
  } catch (e) {
    console.error('length filter error:', e)
  }

  return val
}

function validateNumeric (val) {
  try {
    var key = arguments[arguments.length - 1]
    var minKey = [key, 'numeric', 'min'].join('.')
    var maxKey = [key, 'numeric', 'max'].join('.')
    var valueKey = [key, 'numeric', 'value'].join('.')
    var args = {}

    // parse numeric condition arguments
    for (var i = 1; i < arguments.length - 1; i++) {
      var parsed = arguments[i].split(':')
      if (parsed.length !== 2) { continue }
      if (isNaN(parsed[1])) { continue }
      args[parsed[0]] = parseInt(parsed[1])
    }

    if (isNaN(val)) {
      this.$validation[valueKey] = true
      if ('min' in args) {
        this.$validation[minKey] = false
      }
      if ('max' in args) {
        this.$validation[maxKey] = false
      }
    } else {
      this.$validation[valueKey] = false

      var value = parseInt(val)

      // validate min
      if ('min' in args) {
        this.$validation[minKey] = (value < args['min'])
      }

      // validate max
      if ('max' in args) {
        this.$validation[maxKey] = (value > args['max'])
      }
    }
  } catch (e) {
    console.error('numeric filter error:', e)
  }

  return val
}

function validateCustom (val, custom) {
  try {
    var fn = this.$options.methods[custom]
    if (typeof fn === 'function') {
      val = fn.call(this, val)
    }
  } catch (e) {
    console.error('custom filter error:', e)
  }

  return val
}

});if (typeof exports == "object") {
  module.exports = require("vue-validator");
} else if (typeof define == "function" && define.amd) {
  define([], function(){ return require("vue-validator"); });
} else {
  this["vue-validator"] = require("vue-validator");
}})();