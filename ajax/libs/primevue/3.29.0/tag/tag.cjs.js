'use strict';

var BaseComponent = require('primevue/basecomponent');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var script = {
    name: 'Tag',
    extends: BaseComponent__default["default"],
    props: {
        value: null,
        severity: null,
        rounded: Boolean,
        icon: String
    },
    computed: {
        containerClass() {
            return [
                'p-tag p-component',
                {
                    'p-tag-info': this.severity === 'info',
                    'p-tag-success': this.severity === 'success',
                    'p-tag-warning': this.severity === 'warning',
                    'p-tag-danger': this.severity === 'danger',
                    'p-tag-rounded': this.rounded
                }
            ];
        },
        iconClass() {
            return ['p-tag-icon', this.icon];
        }
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({ class: $options.containerClass }, _ctx.ptm('root')), [
    (_ctx.$slots.icon)
      ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.icon), vue.mergeProps({
          key: 0,
          class: "p-tag-icon"
        }, _ctx.ptm('icon')), null, 16))
      : ($props.icon)
        ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
            key: 1,
            class: $options.iconClass
          }, _ctx.ptm('icon')), null, 16))
        : vue.createCommentVNode("", true),
    vue.renderSlot(_ctx.$slots, "default", {}, () => [
      vue.createElementVNode("span", vue.mergeProps({ class: "p-tag-value" }, _ctx.ptm('value')), vue.toDisplayString($props.value), 17)
    ])
  ], 16))
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n.p-tag {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n}\n.p-tag-icon,\n.p-tag-value,\n.p-tag-icon.pi {\n    line-height: 1.5;\n}\n.p-tag.p-tag-rounded {\n    border-radius: 10rem;\n}\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
