this.primevue = this.primevue || {};
this.primevue.progressbar = (function (BaseComponent, usestyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var styles = "\n.p-progressbar {\n    position: relative;\n    overflow: hidden;\n}\n\n.p-progressbar-determinate .p-progressbar-value {\n    height: 100%;\n    width: 0%;\n    position: absolute;\n    display: none;\n    border: 0 none;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n}\n\n.p-progressbar-determinate .p-progressbar-label {\n    display: inline-flex;\n}\n\n.p-progressbar-determinate .p-progressbar-value-animate {\n    transition: width 1s ease-in-out;\n}\n\n.p-progressbar-indeterminate .p-progressbar-value::before {\n    content: '';\n    position: absolute;\n    background-color: inherit;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    will-change: left, right;\n    -webkit-animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n    animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n}\n\n.p-progressbar-indeterminate .p-progressbar-value::after {\n    content: '';\n    position: absolute;\n    background-color: inherit;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    will-change: left, right;\n    -webkit-animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;\n    animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;\n    -webkit-animation-delay: 1.15s;\n    animation-delay: 1.15s;\n}\n\n@-webkit-keyframes p-progressbar-indeterminate-anim {\n    0% {\n        left: -35%;\n        right: 100%;\n    }\n    60% {\n        left: 100%;\n        right: -90%;\n    }\n    100% {\n        left: 100%;\n        right: -90%;\n    }\n}\n@keyframes p-progressbar-indeterminate-anim {\n    0% {\n        left: -35%;\n        right: 100%;\n    }\n    60% {\n        left: 100%;\n        right: -90%;\n    }\n    100% {\n        left: 100%;\n        right: -90%;\n    }\n}\n\n@-webkit-keyframes p-progressbar-indeterminate-anim-short {\n    0% {\n        left: -200%;\n        right: 100%;\n    }\n    60% {\n        left: 107%;\n        right: -8%;\n    }\n    100% {\n        left: 107%;\n        right: -8%;\n    }\n}\n@keyframes p-progressbar-indeterminate-anim-short {\n    0% {\n        left: -200%;\n        right: 100%;\n    }\n    60% {\n        left: 107%;\n        right: -8%;\n    }\n    100% {\n        left: 107%;\n        right: -8%;\n    }\n}\n";
    var classes = {
      root: function root(_ref) {
        var instance = _ref.instance;
        return ['p-progressbar p-component', {
          'p-progressbar-determinate': instance.determinate,
          'p-progressbar-indeterminate': instance.indeterminate
        }];
      },
      container: 'p-progressbar-indeterminate-container',
      value: 'p-progressbar-value p-progressbar-value-animate',
      label: 'p-progressbar-label'
    };
    var _useStyle = usestyle.useStyle(styles, {
        name: 'progressbar',
        manual: true
      }),
      loadStyle = _useStyle.load;
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
      css: {
        classes: classes,
        loadStyle: loadStyle
      },
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'ProgressBar',
      "extends": script$1,
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
      }, _ctx.ptm('root')), [$options.determinate ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
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

})(primevue.basecomponent, primevue.usestyle, Vue);
