import BaseComponent from 'primevue/basecomponent';
import CheckIcon from 'primevue/icons/check';
import ExclamationTriangleIcon from 'primevue/icons/exclamationtriangle';
import InfoCircleIcon from 'primevue/icons/infocircle';
import TimesIcon from 'primevue/icons/times';
import TimesCircleIcon from 'primevue/icons/timescircle';
import Ripple from 'primevue/ripple';
import { resolveComponent, resolveDirective, openBlock, createBlock, Transition, withCtx, withDirectives, createElementVNode, mergeProps, renderSlot, resolveDynamicComponent, createElementBlock, createCommentVNode, vShow } from 'vue';

var script = {
    name: 'Message',
    extends: BaseComponent,
    emits: ['close'],
    props: {
        severity: {
            type: String,
            default: 'info'
        },
        closable: {
            type: Boolean,
            default: true
        },
        sticky: {
            type: Boolean,
            default: true
        },
        life: {
            type: Number,
            default: 3000
        },
        icon: {
            type: String,
            default: undefined
        },
        closeIcon: {
            type: String,
            default: undefined
        },
        closeButtonProps: {
            type: null,
            default: null
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
            this.closeAfterDelay();
        }
    },
    methods: {
        close(event) {
            this.visible = false;
            this.$emit('close', event);
        },
        closeAfterDelay() {
            setTimeout(() => {
                this.visible = false;
            }, this.life);
        }
    },
    computed: {
        containerClass() {
            return 'p-message p-component p-message-' + this.severity;
        },
        iconComponent() {
            return {
                info: InfoCircleIcon,
                success: CheckIcon,
                warn: ExclamationTriangleIcon,
                error: TimesCircleIcon
            }[this.severity];
        },
        closeAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
        }
    },
    directives: {
        ripple: Ripple
    },
    components: {
        TimesIcon,
        InfoCircleIcon,
        CheckIcon,
        ExclamationTriangleIcon,
        TimesCircleIcon
    }
};

const _hoisted_1 = ["aria-label"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TimesIcon = resolveComponent("TimesIcon");
  const _directive_ripple = resolveDirective("ripple");

  return (openBlock(), createBlock(Transition, {
    name: "p-message",
    appear: ""
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("div", mergeProps({
        class: $options.containerClass,
        role: "alert",
        "aria-live": "assertive",
        "aria-atomic": "true"
      }, _ctx.ptm('root')), [
        createElementVNode("div", mergeProps({ class: "p-message-wrapper" }, _ctx.ptm('wrapper')), [
          renderSlot(_ctx.$slots, "messageicon", { class: "p-message-icon" }, () => [
            (openBlock(), createBlock(resolveDynamicComponent($props.icon ? 'span' : $options.iconComponent), mergeProps({
              class: ['p-message-icon', $props.icon]
            }, _ctx.ptm('icon')), null, 16, ["class"]))
          ]),
          createElementVNode("div", mergeProps({ class: "p-message-text" }, _ctx.ptm('text')), [
            renderSlot(_ctx.$slots, "default")
          ], 16),
          ($props.closable)
            ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
                key: 0,
                class: "p-message-close p-link",
                "aria-label": $options.closeAriaLabel,
                type: "button",
                onClick: _cache[0] || (_cache[0] = $event => ($options.close($event)))
              }, { ...$props.closeButtonProps, ..._ctx.ptm('button') }), [
                renderSlot(_ctx.$slots, "closeicon", { class: "p-message-close-icon" }, () => [
                  ($props.closeIcon)
                    ? (openBlock(), createElementBlock("i", mergeProps({
                        key: 0,
                        class: ['p-message-close-icon', $props.closeIcon]
                      }, _ctx.ptm('buttonIcon')), null, 16))
                    : (openBlock(), createBlock(_component_TimesIcon, mergeProps({
                        key: 1,
                        class: "p-message-close-icon"
                      }, _ctx.ptm('buttonIcon')), null, 16))
                ])
              ], 16, _hoisted_1)), [
                [_directive_ripple]
              ])
            : createCommentVNode("", true)
        ], 16)
      ], 16), [
        [vShow, $data.visible]
      ])
    ]),
    _: 3
  }))
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

var css_248z = "\n.p-message-wrapper {\n    display: flex;\n    align-items: center;\n}\n.p-message-close {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n.p-message-close.p-link {\n    margin-left: auto;\n    overflow: hidden;\n    position: relative;\n}\n.p-message-enter-from {\n    opacity: 0;\n}\n.p-message-enter-active {\n    transition: opacity 0.3s;\n}\n.p-message.p-message-leave-from {\n    max-height: 1000px;\n}\n.p-message.p-message-leave-to {\n    max-height: 0;\n    opacity: 0;\n    margin: 0 !important;\n}\n.p-message-leave-active {\n    overflow: hidden;\n    transition: max-height 0.3s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin 0.15s;\n}\n.p-message-leave-active .p-message-close {\n    display: none;\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
