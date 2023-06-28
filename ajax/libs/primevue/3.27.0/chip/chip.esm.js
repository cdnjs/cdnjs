import TimesCircleIcon from 'primevue/icons/timescircle';
import { openBlock, createElementBlock, normalizeClass, renderSlot, Fragment, createBlock, resolveDynamicComponent, createCommentVNode, toDisplayString } from 'vue';

var script = {
    name: 'Chip',
    emits: ['remove'],
    props: {
        label: {
            type: String,
            default: null
        },
        icon: {
            type: String,
            default: null
        },
        image: {
            type: String,
            default: null
        },
        removable: {
            type: Boolean,
            default: false
        },
        removeIcon: {
            type: String,
            default: undefined
        }
    },
    data() {
        return {
            visible: true
        };
    },
    methods: {
        onKeydown(event) {
            if (event.key === 'Enter' || event.key === 'Backspace') {
                this.close(event);
            }
        },
        close(event) {
            this.visible = false;
            this.$emit('remove', event);
        }
    },
    computed: {
        containerClass() {
            return [
                'p-chip p-component',
                {
                    'p-chip-image': this.image != null
                }
            ];
        }
    },
    components: {
        TimesCircleIcon
    }
};

const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["src"];
const _hoisted_3 = {
  key: 3,
  class: "p-chip-text"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return ($data.visible)
    ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass($options.containerClass),
        "aria-label": $props.label
      }, [
        renderSlot(_ctx.$slots, "default"),
        (!_ctx.$slots.default)
          ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              ($props.image)
                ? (openBlock(), createElementBlock("img", {
                    key: 0,
                    src: $props.image
                  }, null, 8, _hoisted_2))
                : (_ctx.$slots.icon)
                  ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.icon), {
                      key: 1,
                      class: "p-chip-icon"
                    }))
                  : ($props.icon)
                    ? (openBlock(), createElementBlock("span", {
                        key: 2,
                        class: normalizeClass(['p-chip-icon', $props.icon])
                      }, null, 2))
                    : createCommentVNode("", true),
              ($props.label)
                ? (openBlock(), createElementBlock("div", _hoisted_3, toDisplayString($props.label), 1))
                : createCommentVNode("", true)
            ], 64))
          : createCommentVNode("", true),
        ($props.removable)
          ? renderSlot(_ctx.$slots, "removeicon", {
              key: 1,
              onClick: $options.close,
              onKeydown: $options.onKeydown
            }, () => [
              (openBlock(), createBlock(resolveDynamicComponent($props.removeIcon ? 'span' : 'TimesCircleIcon'), {
                tabindex: "0",
                class: normalizeClass(['p-chip-remove-icon', $props.removeIcon]),
                onClick: $options.close,
                onKeydown: $options.onKeydown
              }, null, 40, ["class", "onClick", "onKeydown"]))
            ])
          : createCommentVNode("", true)
      ], 10, _hoisted_1))
    : createCommentVNode("", true)
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

var css_248z = "\n.p-chip {\n    display: inline-flex;\n    align-items: center;\n}\n.p-chip-text {\n    line-height: 1.5;\n}\n.p-chip-icon.pi {\n    line-height: 1.5;\n}\n.p-chip-remove-icon {\n    line-height: 1.5;\n    cursor: pointer;\n}\n.p-chip img {\n    border-radius: 50%;\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
