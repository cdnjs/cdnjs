this.primevue = this.primevue || {};
this.primevue.progressbar = (function (BaseComponent, ProgressBarStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var ProgressBarStyle__default = /*#__PURE__*/_interopDefaultLegacy(ProgressBarStyle);

    var script$1 = {
      name: 'BaseProgressBar',
      "extends": BaseComponent__default["default"],
      props: {
        value: {
          type: Number,
          "default": null
        },
        mode: {
          type: String,
          "default": 'determinate'
        },
        showValue: {
          type: Boolean,
          "default": true
        }
      },
      style: ProgressBarStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'ProgressBar',
      "extends": script$1,
      inheritAttrs: false,
      computed: {
        progressStyle: function progressStyle() {
          return {
            width: this.value + '%',
            display: 'flex'
          };
        },
        indeterminate: function indeterminate() {
          return this.mode === 'indeterminate';
        },
        determinate: function determinate() {
          return this.mode === 'determinate';
        }
      }
    };

    var _hoisted_1 = ["aria-valuenow"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        role: "progressbar",
        "class": _ctx.cx('root'),
        "aria-valuemin": "0",
        "aria-valuenow": _ctx.value,
        "aria-valuemax": "100"
      }, _ctx.ptmi('root')), [$options.determinate ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 0,
        "class": _ctx.cx('value'),
        style: $options.progressStyle
      }, _ctx.ptm('value')), [_ctx.value != null && _ctx.value !== 0 && _ctx.showValue ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 0,
        "class": _ctx.cx('label')
      }, _ctx.ptm('label')), [vue.renderSlot(_ctx.$slots, "default", {}, function () {
        return [vue.createTextVNode(vue.toDisplayString(_ctx.value + '%'), 1)];
      })], 16)) : vue.createCommentVNode("", true)], 16)) : vue.createCommentVNode("", true), $options.indeterminate ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 1,
        "class": _ctx.cx('container')
      }, _ctx.ptm('container')), [vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('value')
      }, _ctx.ptm('value')), null, 16)], 16)) : vue.createCommentVNode("", true)], 16, _hoisted_1);
    }

    script.render = render;

    return script;

})(primevue.basecomponent, primevue.progressbar.style, Vue);
