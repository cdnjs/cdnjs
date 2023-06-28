import CheckIcon from 'primevue/icons/check';
import ExclamationTriangleIcon from 'primevue/icons/exclamationtriangle';
import InfoCircleIcon from 'primevue/icons/infocircle';
import TimesCircleIcon from 'primevue/icons/timescircle';
import { openBlock, createElementBlock, normalizeClass, renderSlot, createBlock, resolveDynamicComponent, createElementVNode, createTextVNode } from 'vue';

var script = {
    name: 'InlineMessage',
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
                info: InfoCircleIcon,
                success: CheckIcon,
                warn: ExclamationTriangleIcon,
                error: TimesCircleIcon
            }[this.severity];
        }
    }
};

const _hoisted_1 = { class: "p-inline-message-text" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    "aria-live": "polite",
    class: normalizeClass($options.containerClass)
  }, [
    renderSlot(_ctx.$slots, "icon", {}, () => [
      (openBlock(), createBlock(resolveDynamicComponent($props.icon ? 'span' : $options.iconComponent), {
        class: normalizeClass(['p-inline-message-icon', $props.icon])
      }, null, 8, ["class"]))
    ]),
    createElementVNode("span", _hoisted_1, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(" ")
      ])
    ])
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

var css_248z = "\n.p-inline-message {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    vertical-align: top;\n}\n.p-inline-message-icon-only .p-inline-message-text {\n    visibility: hidden;\n    width: 0;\n}\n.p-fluid .p-inline-message {\n    display: flex;\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
