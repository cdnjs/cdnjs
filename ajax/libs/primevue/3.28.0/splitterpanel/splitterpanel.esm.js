import BaseComponent from 'primevue/basecomponent';
import { openBlock, createElementBlock, mergeProps, renderSlot } from 'vue';

var script = {
    name: 'SplitterPanel',
    extends: BaseComponent,
    props: {
        size: {
            type: Number,
            default: null
        },
        minSize: {
            type: Number,
            default: null
        }
    },
    computed: {
        containerClass() {
            return ['p-splitter-panel', { 'p-splitter-panel-nested': this.isNested }];
        },
        isNested() {
            return this.$slots.default().some((child) => {
                return child.type.name === 'Splitter';
            });
        }
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", mergeProps({
    ref: "container",
    class: $options.containerClass
  }, _ctx.ptm('root')), [
    renderSlot(_ctx.$slots, "default")
  ], 16))
}

script.render = render;

export { script as default };
