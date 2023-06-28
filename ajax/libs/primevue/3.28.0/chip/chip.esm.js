import BaseComponent from 'primevue/basecomponent';
import TimesCircleIcon from 'primevue/icons/timescircle';
import { openBlock, createElementBlock, mergeProps, renderSlot, createBlock, resolveDynamicComponent, createCommentVNode, toDisplayString } from 'vue';

var script = {
    name: 'Chip',
    extends: BaseComponent,
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

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return ($data.visible)
    ? (openBlock(), createElementBlock("div", mergeProps({
        key: 0,
        class: $options.containerClass,
        "aria-label": $props.label
      }, _ctx.ptm('root')), [
        renderSlot(_ctx.$slots, "default", {}, () => [
          ($props.image)
            ? (openBlock(), createElementBlock("img", mergeProps({
                key: 0,
                src: $props.image
              }, _ctx.ptm('image')), null, 16, _hoisted_2))
            : (_ctx.$slots.icon)
              ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.icon), mergeProps({
                  key: 1,
                  class: "p-chip-icon"
                }, _ctx.ptm('icon')), null, 16))
              : ($props.icon)
                ? (openBlock(), createElementBlock("span", mergeProps({
                    key: 2,
                    class: ['p-chip-icon', $props.icon]
                  }, _ctx.ptm('icon')), null, 16))
                : createCommentVNode("", true),
          ($props.label)
            ? (openBlock(), createElementBlock("div", mergeProps({
                key: 3,
                class: "p-chip-text"
              }, _ctx.ptm('label')), toDisplayString($props.label), 17))
            : createCommentVNode("", true)
        ]),
        ($props.removable)
          ? renderSlot(_ctx.$slots, "removeicon", {
              key: 0,
              onClick: $options.close,
              onKeydown: $options.onKeydown
            }, () => [
              (openBlock(), createBlock(resolveDynamicComponent($props.removeIcon ? 'span' : 'TimesCircleIcon'), mergeProps({
                tabindex: "0",
                class: ['p-chip-remove-icon', $props.removeIcon],
                onClick: $options.close,
                onKeydown: $options.onKeydown
              }, _ctx.ptm('removeIcon')), null, 16, ["class", "onClick", "onKeydown"]))
            ])
          : createCommentVNode("", true)
      ], 16, _hoisted_1))
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
