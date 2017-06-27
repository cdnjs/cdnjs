(function (exports) { 'use strict';

  var focus = {
    inserted: function(el, binding) {
      if (binding.value) el.focus();
      else el.blur();
    },

    componentUpdated: function(el, binding) {
      if (binding.value) el.focus();
      else el.blur();
    },
  };

  var mixin = {
    directives: {
      focus: focus,
    },
  };

  exports.focus = focus;
  exports.mixin = mixin;

})((this.VueFocus = {}));