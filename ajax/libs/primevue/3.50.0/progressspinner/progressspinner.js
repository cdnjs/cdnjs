this.primevue = this.primevue || {};
this.primevue.progressspinner = (function (BaseComponent, ProgressSpinnerStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var ProgressSpinnerStyle__default = /*#__PURE__*/_interopDefaultLegacy(ProgressSpinnerStyle);

    var script$1 = {
      name: 'BaseProgressSpinner',
      "extends": BaseComponent__default["default"],
      props: {
        strokeWidth: {
          type: String,
          "default": '2'
        },
        fill: {
          type: String,
          "default": 'none'
        },
        animationDuration: {
          type: String,
          "default": '2s'
        }
      },
      style: ProgressSpinnerStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'ProgressSpinner',
      "extends": script$1,
      inheritAttrs: false,
      computed: {
        svgStyle: function svgStyle() {
          return {
            'animation-duration': this.animationDuration
          };
        }
      }
    };

    var _hoisted_1 = ["fill", "stroke-width"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root'),
        role: "progressbar"
      }, _ctx.ptmi('root')), [(vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps({
        "class": _ctx.cx('spinner'),
        viewBox: "25 25 50 50",
        style: $options.svgStyle
      }, _ctx.ptm('spinner')), [vue.createElementVNode("circle", vue.mergeProps({
        "class": _ctx.cx('circle'),
        cx: "50",
        cy: "50",
        r: "20",
        fill: _ctx.fill,
        "stroke-width": _ctx.strokeWidth,
        strokeMiterlimit: "10"
      }, _ctx.ptm('circle')), null, 16, _hoisted_1)], 16))], 16);
    }

    script.render = render;

    return script;

})(primevue.basecomponent, primevue.progressspinner.style, Vue);
