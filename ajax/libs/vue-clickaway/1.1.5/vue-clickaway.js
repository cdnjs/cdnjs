(function (exports,Vue) { 'use strict';

  Vue = 'default' in Vue ? Vue['default'] : Vue;

  var version = '1.1.5';

  var compatible = (/^1\./).test(Vue.version);
  if (!compatible) {
    Vue.util.warn('VueClickaway ' + version + ' only supports Vue 1.x, and does not support Vue ' + Vue.version);
  }

  var directive = {

    acceptStatement: true,
    priority: 700,

    update: function(handler) {
      if (typeof handler !== 'function') {
        if ('development' !== 'production') {
          Vue.util.warn(
            this.name + '="' +
            this.expression + '" expects a function value, ' +
            'got ' + handler
          );
        }
        return;
      }

      this.reset();

      var el = this.el;
      var scope = this._scope || this.vm;

      this.handler = function(ev) {
        // @NOTE: IE 5.0+
        // @REFERENCE: https://developer.mozilla.org/en/docs/Web/API/Node/contains
        if (!el.contains(ev.target)) {
          scope.$event = ev;
          var res = handler(ev);
          scope.$event = null;
          return res;
        }
      };

      Vue.util.on(document.documentElement, 'click', this.handler);
    },

    reset: function() {
      Vue.util.off(document.documentElement, 'click', this.handler);
    },

    unbind: function() {
      this.reset();
    },

  };

  var mixin = {
    directives: { onClickaway: directive },
  };

  exports.version = version;
  exports.directive = directive;
  exports.mixin = mixin;

})((this.VueClickaway = {}),Vue);