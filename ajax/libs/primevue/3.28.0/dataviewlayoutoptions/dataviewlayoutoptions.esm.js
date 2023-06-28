import BarsIcon from 'primevue/icons/bars';
import ThLargeIcon from 'primevue/icons/thlarge';
import { resolveComponent, openBlock, createElementBlock, createElementVNode, normalizeClass, renderSlot, createVNode } from 'vue';

var script = {
    name: 'DataViewLayoutOptions',
    emits: ['update:modelValue'],
    props: {
        modelValue: String
    },
    data() {
        return {
            isListButtonPressed: false,
            isGridButtonPressed: false
        };
    },
    methods: {
        changeLayout(layout) {
            this.$emit('update:modelValue', layout);

            if (layout === 'list') {
                this.isListButtonPressed = true;
                this.isGridButtonPressed = false;
            } else if (layout === 'grid') {
                this.isGridButtonPressed = true;
                this.isListButtonPressed = false;
            }
        }
    },
    computed: {
        buttonListClass() {
            return ['p-button p-button-icon-only', { 'p-highlight': this.modelValue === 'list' }];
        },
        buttonGridClass() {
            return ['p-button p-button-icon-only', { 'p-highlight': this.modelValue === 'grid' }];
        },
        listViewAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.listView : undefined;
        },
        gridViewAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.gridView : undefined;
        }
    },
    components: {
        BarsIcon: BarsIcon,
        ThLargeIcon: ThLargeIcon
    }
};

const _hoisted_1 = {
  class: "p-dataview-layout-options p-selectbutton p-buttonset",
  role: "group"
};
const _hoisted_2 = ["aria-label", "aria-pressed"];
const _hoisted_3 = ["aria-label", "aria-pressed"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_BarsIcon = resolveComponent("BarsIcon");
  const _component_ThLargeIcon = resolveComponent("ThLargeIcon");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("button", {
      "aria-label": $options.listViewAriaLabel,
      class: normalizeClass($options.buttonListClass),
      onClick: _cache[0] || (_cache[0] = $event => ($options.changeLayout('list'))),
      type: "button",
      "aria-pressed": $data.isListButtonPressed
    }, [
      renderSlot(_ctx.$slots, "listicon", {}, () => [
        createVNode(_component_BarsIcon)
      ])
    ], 10, _hoisted_2),
    createElementVNode("button", {
      "aria-label": $options.gridViewAriaLabel,
      class: normalizeClass($options.buttonGridClass),
      onClick: _cache[1] || (_cache[1] = $event => ($options.changeLayout('grid'))),
      type: "button",
      "aria-pressed": $data.isGridButtonPressed
    }, [
      renderSlot(_ctx.$slots, "gridicon", {}, () => [
        createVNode(_component_ThLargeIcon)
      ])
    ], 10, _hoisted_3)
  ]))
}

script.render = render;

export { script as default };
