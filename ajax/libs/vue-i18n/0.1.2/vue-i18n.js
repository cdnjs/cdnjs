
;(function(){

/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("vue-i18n", function (exports, module) {
/**
 * Expose internationalization plugin
 *
 * @param {Object} Vue
 * @param {Object} opts
 */

module.exports = function (Vue, opts) {
  opts = opts || {}
  var lang = opts.lang || 'en'
  var locales = opts.locales || opts.resources || {}

  Vue.t = function (key) {
    var ret = key || ''
    var locale = locales[lang]
    if (key && locale) {
      var namespaces = key.split('.')
      for (var i = 0; i < namespaces.length; i++) {
        locale = locale[namespaces[i]]
        if (!locale) {
          ret = key;
          break
        } else {
          ret = locale
        }
      }
    }
    return ret
  }

  Vue.directive('t', {
    isLiteral: true,
    bind: function () {
      if (this.el.nodeType !== 1) { return }

      this.el.textContent = Vue.t(this.expression)
    }
  })
}

});

if (typeof exports == "object") {
  module.exports = require("vue-i18n");
} else if (typeof define == "function" && define.amd) {
  define([], function(){ return require("vue-i18n"); });
} else {
  this["vue-i18n"] = require("vue-i18n");
}
})()
