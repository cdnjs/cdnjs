this.primevue = this.primevue || {};
this.primevue.buttongroup = (function (BaseComponent, ButtonGroupStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var ButtonGroupStyle__default = /*#__PURE__*/_interopDefaultLegacy(ButtonGroupStyle);

    var script$1 = {
      name: 'BaseButtonGroup',
      "extends": BaseComponent__default["default"],
      style: ButtonGroupStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'ButtonGroup',
      "extends": script$1,
      inheritAttrs: false
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
        "class": _ctx.cx('root'),
        role: "group"
      }, _ctx.ptmi('root')), [vue.renderSlot(_ctx.$slots, "default")], 16);
    }

    script.render = render;

    return script;

})(primevue.basecomponent, primevue.buttongroup.style, Vue);
