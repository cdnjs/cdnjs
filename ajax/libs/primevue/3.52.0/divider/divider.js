this.primevue = this.primevue || {};
this.primevue.divider = (function (BaseComponent, DividerStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var DividerStyle__default = /*#__PURE__*/_interopDefaultLegacy(DividerStyle);

    var script$1 = {
      name: 'BaseDivider',
      "extends": BaseComponent__default["default"],
      props: {
        align: {
          type: String,
          "default": null
        },
        layout: {
          type: String,
          "default": 'horizontal'
        },
        type: {
          type: String,
          "default": 'solid'
        }
      },
      style: DividerStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'Divider',
      "extends": script$1,
      inheritAttrs: false
    };

    var _hoisted_1 = ["aria-orientation"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root'),
        style: _ctx.sx('root'),
        role: "separator",
        "aria-orientation": _ctx.layout
      }, _ctx.ptmi('root')), [_ctx.$slots["default"] ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 0,
        "class": _ctx.cx('content')
      }, _ctx.ptm('content')), [vue.renderSlot(_ctx.$slots, "default")], 16)) : vue.createCommentVNode("", true)], 16, _hoisted_1);
    }

    script.render = render;

    return script;

})(primevue.basecomponent, primevue.divider.style, Vue);
