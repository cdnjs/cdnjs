this.primevue = this.primevue || {};
this.primevue.inputgroup = (function (BaseComponent, InputGroupStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var InputGroupStyle__default = /*#__PURE__*/_interopDefaultLegacy(InputGroupStyle);

    var script$1 = {
      name: 'BaseInputGroup',
      "extends": BaseComponent__default["default"],
      style: InputGroupStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'InputGroup',
      "extends": script$1,
      inheritAttrs: false
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root')
      }, _ctx.ptmi('root')), [vue.renderSlot(_ctx.$slots, "default")], 16);
    }

    script.render = render;

    return script;

})(primevue.basecomponent, primevue.inputgroup.style, Vue);
