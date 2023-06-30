this.primevue = this.primevue || {};
this.primevue.inlinemessage = (function (BaseComponent, CheckIcon, ExclamationTriangleIcon, InfoCircleIcon, TimesCircleIcon, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var CheckIcon__default = /*#__PURE__*/_interopDefaultLegacy(CheckIcon);
    var ExclamationTriangleIcon__default = /*#__PURE__*/_interopDefaultLegacy(ExclamationTriangleIcon);
    var InfoCircleIcon__default = /*#__PURE__*/_interopDefaultLegacy(InfoCircleIcon);
    var TimesCircleIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesCircleIcon);

    var script = {
        name: 'InlineMessage',
        extends: BaseComponent__default["default"],
        props: {
            severity: {
                type: String,
                default: 'error'
            },
            icon: {
                type: String,
                default: undefined
            }
        },
        timeout: null,
        data() {
            return {
                visible: true
            };
        },
        mounted() {
            if (!this.sticky) {
                setTimeout(() => {
                    this.visible = false;
                }, this.life);
            }
        },
        computed: {
            containerClass() {
                return ['p-inline-message p-component p-inline-message-' + this.severity, { 'p-inline-message-icon-only': !this.$slots.default }];
            },
            iconComponent() {
                return {
                    info: InfoCircleIcon__default["default"],
                    success: CheckIcon__default["default"],
                    warn: ExclamationTriangleIcon__default["default"],
                    error: TimesCircleIcon__default["default"]
                }[this.severity];
            }
        }
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "aria-live": "polite",
        class: $options.containerClass
      }, _ctx.ptm('root')), [
        vue.renderSlot(_ctx.$slots, "icon", {}, () => [
          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.icon ? 'span' : $options.iconComponent), vue.mergeProps({
            class: ['p-inline-message-icon', $props.icon]
          }, _ctx.ptm('icon')), null, 16, ["class"]))
        ]),
        vue.createElementVNode("span", vue.mergeProps({ class: "p-inline-message-text" }, _ctx.ptm('text')), [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createTextVNode(" ")
          ])
        ], 16)
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

    var css_248z = "\n.p-inline-message {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    vertical-align: top;\n}\n.p-inline-message-icon-only .p-inline-message-text {\n    visibility: hidden;\n    width: 0;\n}\n.p-fluid .p-inline-message {\n    display: flex;\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.basecomponent, primevue.icons.check, primevue.icons.exclamationtriangle, primevue.icons.infocircle, primevue.icons.timescircle, Vue);
