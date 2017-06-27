/*!
 * vue-validator v2.1.3 
 * (c) 2016 kazuya kawaguchi
 * Released under the MIT License.
 */
'use strict';

function plugin(Vue) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  Vue.prototype.$add = function (a, b) {
    return a + b;
  };
}

plugin.version = '2.1.3';

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

module.exports = plugin;