(function (exports,vue) { 'use strict';

  var directive = {

    acceptStatement: true,
    priority: 700,

    update: function(handler) {
      if (typeof handler !== 'function') {
        if ('development' !== 'production') {
          vue.util.warn(
            this.name + '="' +
            this.expression + '" expects a function value, ' +
            'got ' + handler
          );
        }
        return;
      }

      this.reset();

      var self = this;
      var scope = this._scope || this.vm;

      this.handler = function(ev) {
        // @NOTE: IE 5.0+
        // @REFERENCE: https://developer.mozilla.org/en/docs/Web/API/Node/contains
        if (!self.el.contains(ev.target)) {
          scope.$event = ev;
          var res = handler(ev);
          scope.$event = null;
          return res;
        }
      };

      vue.util.on(document.documentElement, 'click', this.handler);
    },

    reset: function() {
      vue.util.off(document.documentElement, 'click', this.handler);
    },

    unbind: function() {
      this.reset();
    },

  };

  var mixin = {
    directives: { onClickaway: directive },
  };

  exports.directive = directive;
  exports.mixin = mixin;

})((this.VueClickaway = {}),Vue);