'use strict';

var Ripple = require('primevue/ripple');
var utils = require('primevue/utils');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

var script = {
    name: 'Panel',
    emits: ['update:collapsed', 'toggle'],
    props: {
        header: String,
        toggleable: Boolean,
        collapsed: Boolean,
        toggleButtonProps: {
            type: null,
            default: null
        }
    },
    data() {
        return {
            d_collapsed: this.collapsed
        };
    },
    watch: {
        collapsed(newValue) {
            this.d_collapsed = newValue;
        }
    },
    methods: {
        toggle(event) {
            this.d_collapsed = !this.d_collapsed;
            this.$emit('update:collapsed', this.d_collapsed);
            this.$emit('toggle', {
                originalEvent: event,
                value: this.d_collapsed
            });
        },
        onKeyDown(event) {
            if (event.code === 'Enter' || event.code === 'Space') {
                this.toggle(event);
                event.preventDefault();
            }
        }
    },
    computed: {
        ariaId() {
            return utils.UniqueComponentId();
        },
        containerClass() {
            return ['p-panel p-component', { 'p-panel-toggleable': this.toggleable }];
        },
        buttonAriaLabel() {
            return this.toggleButtonProps && this.toggleButtonProps['aria-label'] ? this.toggleButtonProps['aria-label'] : this.header;
        }
    },
    directives: {
        ripple: Ripple__default["default"]
    }
};

const _hoisted_1 = { class: "p-panel-header" };
const _hoisted_2 = ["id"];
const _hoisted_3 = { class: "p-panel-icons" };
const _hoisted_4 = ["id", "aria-label", "aria-controls", "aria-expanded"];
const _hoisted_5 = ["id", "aria-labelledby"];
const _hoisted_6 = { class: "p-panel-content" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = vue.resolveDirective("ripple");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass($options.containerClass)
  }, [
    vue.createElementVNode("div", _hoisted_1, [
      vue.renderSlot(_ctx.$slots, "header", {}, () => [
        ($props.header)
          ? (vue.openBlock(), vue.createElementBlock("span", {
              key: 0,
              id: $options.ariaId + '_header',
              class: "p-panel-title"
            }, vue.toDisplayString($props.header), 9, _hoisted_2))
          : vue.createCommentVNode("", true)
      ]),
      vue.createElementVNode("div", _hoisted_3, [
        vue.renderSlot(_ctx.$slots, "icons"),
        ($props.toggleable)
          ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
              key: 0,
              id: $options.ariaId + '_header',
              type: "button",
              role: "button",
              class: "p-panel-header-icon p-panel-toggler p-link",
              "aria-label": $options.buttonAriaLabel,
              "aria-controls": $options.ariaId + '_content',
              "aria-expanded": !$data.d_collapsed,
              onClick: _cache[0] || (_cache[0] = (...args) => ($options.toggle && $options.toggle(...args))),
              onKeydown: _cache[1] || (_cache[1] = (...args) => ($options.onKeyDown && $options.onKeyDown(...args)))
            }, $props.toggleButtonProps), [
              vue.createElementVNode("span", {
                class: vue.normalizeClass({ 'pi pi-minus': !$data.d_collapsed, 'pi pi-plus': $data.d_collapsed })
              }, null, 2)
            ], 16, _hoisted_4)), [
              [_directive_ripple]
            ])
          : vue.createCommentVNode("", true)
      ])
    ]),
    vue.createVNode(vue.Transition, { name: "p-toggleable-content" }, {
      default: vue.withCtx(() => [
        vue.withDirectives(vue.createElementVNode("div", {
          id: $options.ariaId + '_content',
          class: "p-toggleable-content",
          role: "region",
          "aria-labelledby": $options.ariaId + '_header'
        }, [
          vue.createElementVNode("div", _hoisted_6, [
            vue.renderSlot(_ctx.$slots, "default")
          ])
        ], 8, _hoisted_5), [
          [vue.vShow, !$data.d_collapsed]
        ])
      ]),
      _: 3
    })
  ], 2))
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

var css_248z = "\n.p-panel-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n.p-panel-title {\n    line-height: 1;\n}\n.p-panel-header-icon {\n    display: inline-flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    text-decoration: none;\n    overflow: hidden;\n    position: relative;\n}\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
