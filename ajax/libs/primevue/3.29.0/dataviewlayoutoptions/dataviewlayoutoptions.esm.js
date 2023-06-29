import BaseComponent from 'primevue/basecomponent';
import BarsIcon from 'primevue/icons/bars';
import ThLargeIcon from 'primevue/icons/thlarge';
import { resolveComponent, openBlock, createElementBlock, mergeProps, createElementVNode, renderSlot, createVNode, normalizeProps, guardReactiveProps } from 'vue';

var script = {
    name: 'DataViewLayoutOptions',
    extends: BaseComponent,
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

const _hoisted_1 = ["aria-label", "aria-pressed"];
const _hoisted_2 = ["aria-label", "aria-pressed"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_BarsIcon = resolveComponent("BarsIcon");
  const _component_ThLargeIcon = resolveComponent("ThLargeIcon");

  return (openBlock(), createElementBlock("div", mergeProps({
    class: "p-dataview-layout-options p-selectbutton p-buttonset",
    role: "group"
  }, _ctx.ptm('root')), [
    createElementVNode("button", mergeProps({
      "aria-label": $options.listViewAriaLabel,
      class: $options.buttonListClass,
      onClick: _cache[0] || (_cache[0] = $event => ($options.changeLayout('list'))),
      type: "button",
      "aria-pressed": $data.isListButtonPressed
    }, _ctx.ptm('listButton')), [
      renderSlot(_ctx.$slots, "listicon", {}, () => [
        createVNode(_component_BarsIcon, normalizeProps(guardReactiveProps(_ctx.ptm('listIcon'))), null, 16)
      ])
    ], 16, _hoisted_1),
    createElementVNode("button", mergeProps({
      "aria-label": $options.gridViewAriaLabel,
      class: $options.buttonGridClass,
      onClick: _cache[1] || (_cache[1] = $event => ($options.changeLayout('grid'))),
      type: "button",
      "aria-pressed": $data.isGridButtonPressed
    }, _ctx.ptm('gridButton')), [
      renderSlot(_ctx.$slots, "gridicon", {}, () => [
        createVNode(_component_ThLargeIcon, normalizeProps(guardReactiveProps(_ctx.ptm('gridIcon'))), null, 16)
      ])
    ], 16, _hoisted_2)
  ], 16))
}

script.render = render;

export { script as default };
