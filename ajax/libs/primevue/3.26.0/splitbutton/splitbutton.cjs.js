'use strict';

var Button = require('primevue/button');
var TieredMenu = require('primevue/tieredmenu');
var utils = require('primevue/utils');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
var TieredMenu__default = /*#__PURE__*/_interopDefaultLegacy(TieredMenu);

var script = {
    name: 'SplitButton',
    emits: ['click'],
    props: {
        label: {
            type: String,
            default: null
        },
        icon: {
            type: String,
            default: null
        },
        model: {
            type: Array,
            default: null
        },
        autoZIndex: {
            type: Boolean,
            default: true
        },
        baseZIndex: {
            type: Number,
            default: 0
        },
        appendTo: {
            type: String,
            default: 'body'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        class: {
            type: null,
            default: null
        },
        style: {
            type: null,
            default: null
        },
        buttonProps: {
            type: null,
            default: null
        },
        menuButtonProps: {
            type: null,
            default: null
        },
        menuButtonIcon: {
            type: String,
            default: 'pi pi-chevron-down'
        },
        severity: {
            type: String,
            default: null
        },
        raised: {
            type: Boolean,
            default: false
        },
        rounded: {
            type: Boolean,
            default: false
        },
        text: {
            type: Boolean,
            default: false
        },
        outlined: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: null
        },
        plain: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isExpanded: false
        };
    },
    methods: {
        onDropdownButtonClick() {
            this.$refs.menu.toggle({ currentTarget: this.$el, relatedTarget: this.$refs.button.$el });
            this.isExpanded = !this.$refs.menu.visible;
        },
        onDropdownKeydown(event) {
            if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
                this.onDropdownButtonClick();
                event.preventDefault();
            }
        },
        onDefaultButtonClick(event) {
            if (this.isExpanded) {
                this.$refs.menu.hide(event);
            }

            this.$emit('click', event);
        }
    },
    computed: {
        ariaId() {
            return utils.UniqueComponentId();
        },
        containerClass() {
            return [
                'p-splitbutton p-component',
                this.class,
                {
                    [`p-button-${this.severity}`]: this.severity,
                    'p-button-raised': this.raised,
                    'p-button-rounded': this.rounded,
                    'p-button-text': this.text,
                    'p-button-outlined': this.outlined,
                    'p-button-sm': this.size === 'small',
                    'p-button-lg': this.size === 'large'
                }
            ];
        }
    },
    components: {
        PVSButton: Button__default["default"],
        PVSMenu: TieredMenu__default["default"]
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_PVSButton = vue.resolveComponent("PVSButton");
  const _component_PVSMenu = vue.resolveComponent("PVSMenu");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass($options.containerClass),
    style: vue.normalizeStyle($props.style)
  }, [
    vue.renderSlot(_ctx.$slots, "default", {}, () => [
      vue.createVNode(_component_PVSButton, vue.mergeProps({
        type: "button",
        class: "p-splitbutton-defaultbutton",
        icon: $props.icon,
        label: $props.label,
        disabled: $props.disabled,
        "aria-label": $props.label,
        onClick: $options.onDefaultButtonClick
      }, $props.buttonProps), null, 16, ["icon", "label", "disabled", "aria-label", "onClick"])
    ]),
    vue.createVNode(_component_PVSButton, vue.mergeProps({
      ref: "button",
      type: "button",
      class: "p-splitbutton-menubutton",
      icon: $props.menuButtonIcon,
      disabled: $props.disabled,
      "aria-haspopup": "true",
      "aria-expanded": $data.isExpanded,
      "aria-controls": $options.ariaId + '_overlay',
      onClick: $options.onDropdownButtonClick,
      onKeydown: $options.onDropdownKeydown
    }, $props.menuButtonProps), null, 16, ["icon", "disabled", "aria-expanded", "aria-controls", "onClick", "onKeydown"]),
    vue.createVNode(_component_PVSMenu, {
      ref: "menu",
      id: $options.ariaId + '_overlay',
      model: $props.model,
      popup: true,
      autoZIndex: $props.autoZIndex,
      baseZIndex: $props.baseZIndex,
      appendTo: $props.appendTo
    }, null, 8, ["id", "model", "autoZIndex", "baseZIndex", "appendTo"])
  ], 6))
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

var css_248z = "\n.p-splitbutton[data-v-707c8398] {\n    display: inline-flex;\n    position: relative;\n}\n.p-splitbutton .p-splitbutton-defaultbutton[data-v-707c8398],\n.p-splitbutton.p-button-rounded > .p-splitbutton-defaultbutton.p-button[data-v-707c8398],\n.p-splitbutton.p-button-outlined > .p-splitbutton-defaultbutton.p-button[data-v-707c8398] {\n    flex: 1 1 auto;\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n    border-right: 0 none;\n}\n.p-splitbutton-menubutton[data-v-707c8398],\n.p-splitbutton.p-button-rounded > .p-splitbutton-menubutton.p-button[data-v-707c8398],\n.p-splitbutton.p-button-outlined > .p-splitbutton-menubutton.p-button[data-v-707c8398] {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n}\n.p-splitbutton .p-menu[data-v-707c8398] {\n    min-width: 100%;\n}\n.p-fluid .p-splitbutton[data-v-707c8398] {\n    display: flex;\n}\n";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-707c8398";

module.exports = script;
