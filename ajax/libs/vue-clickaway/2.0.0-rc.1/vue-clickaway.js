(function (exports,Vue) { 'use strict';

  Vue = 'default' in Vue ? Vue['default'] : Vue;

  var version = '2.0.0-rc.1';

  var compatible = (/^2\./).test(Vue.version);
  if (!compatible) {
    Vue.util.warn('VueClickaway ' + version + ' only supports Vue 2.x, and does not support Vue ' + Vue.version);
  }



  // @SECTION: implementation

  var HANDLER = '_vue_clickaway_handler';

  function bind(el, binding) {
    unbind(el);

    var callback = binding.value;
    if (typeof callback !== 'function') {
      if ('development' !== 'production') {
        Vue.util.warn(
          'v-' + binding.name + '="' +
          binding.expression + '" expects a function value, ' +
          'got ' + callback
        );
      }
      return;
    }

    el[HANDLER] = function(ev) {
      // @NOTE: IE 5.0+
      // @REFERENCE: https://developer.mozilla.org/en/docs/Web/API/Node/contains
      if (!el.contains(ev.target)) {
        return callback(ev);
      }
    };

    document.documentElement.addEventListener('click', el[HANDLER], false);
  }

  function unbind(el) {
    document.documentElement.removeEventListener('click', el[HANDLER], false);
    delete el[HANDLER];
  }

  var directive = {
    bind: bind,
    update: function(el, binding) {
      if (binding.value === binding.oldValue) return;
      bind(el, binding);
    },
    unbind: unbind,
  };

  var mixin = {
    directives: { onClickaway: directive },
  };

  exports.version = version;
  exports.directive = directive;
  exports.mixin = mixin;

})((this.VueClickaway = {}),Vue);