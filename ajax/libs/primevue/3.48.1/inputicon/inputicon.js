this.primevue = this.primevue || {};
this.primevue.inputicon = (function (BaseComponent, InputIconStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var InputIconStyle__default = /*#__PURE__*/_interopDefaultLegacy(InputIconStyle);

    var script$1 = {
      name: 'BaseInputIcon',
      "extends": BaseComponent__default["default"],
      style: InputIconStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'InputIcon',
      "extends": script$1
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.renderSlot(_ctx.$slots, "default");
    }

    script.render = render;

    return script;

})(primevue.basecomponent, InputIconStyle, Vue);
