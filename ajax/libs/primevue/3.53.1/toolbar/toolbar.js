this.primevue = this.primevue || {};
this.primevue.toolbar = (function (BaseComponent, ToolbarStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var ToolbarStyle__default = /*#__PURE__*/_interopDefaultLegacy(ToolbarStyle);

    var script$1 = {
      name: 'BaseToolbar',
      "extends": BaseComponent__default["default"],
      props: {
        ariaLabelledby: {
          type: String,
          "default": null
        }
      },
      style: ToolbarStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'Toolbar',
      "extends": script$1,
      inheritAttrs: false
    };

    var _hoisted_1 = ["aria-labelledby"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root'),
        role: "toolbar",
        "aria-labelledby": _ctx.ariaLabelledby
      }, _ctx.ptmi('root')), [vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('start')
      }, _ctx.ptm('start')), [vue.renderSlot(_ctx.$slots, "start")], 16), vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('center')
      }, _ctx.ptm('center')), [vue.renderSlot(_ctx.$slots, "center")], 16), vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('end')
      }, _ctx.ptm('end')), [vue.renderSlot(_ctx.$slots, "end")], 16)], 16, _hoisted_1);
    }

    script.render = render;

    return script;

})(primevue.basecomponent, primevue.toolbar.style, Vue);
