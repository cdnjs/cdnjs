'use strict';

var BaseComponent = require('primevue/basecomponent');
var BarsIcon = require('primevue/icons/bars');
var ThLargeIcon = require('primevue/icons/thlarge');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var BarsIcon__default = /*#__PURE__*/_interopDefaultLegacy(BarsIcon);
var ThLargeIcon__default = /*#__PURE__*/_interopDefaultLegacy(ThLargeIcon);

var script = {
    name: 'DataViewLayoutOptions',
    extends: BaseComponent__default["default"],
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
        BarsIcon: BarsIcon__default["default"],
        ThLargeIcon: ThLargeIcon__default["default"]
    }
};

const _hoisted_1 = ["aria-label", "aria-pressed"];
const _hoisted_2 = ["aria-label", "aria-pressed"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_BarsIcon = vue.resolveComponent("BarsIcon");
  const _component_ThLargeIcon = vue.resolveComponent("ThLargeIcon");

  return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    class: "p-dataview-layout-options p-selectbutton p-buttonset",
    role: "group"
  }, _ctx.ptm('root')), [
    vue.createElementVNode("button", vue.mergeProps({
      "aria-label": $options.listViewAriaLabel,
      class: $options.buttonListClass,
      onClick: _cache[0] || (_cache[0] = $event => ($options.changeLayout('list'))),
      type: "button",
      "aria-pressed": $data.isListButtonPressed
    }, _ctx.ptm('listButton')), [
      vue.renderSlot(_ctx.$slots, "listicon", {}, () => [
        vue.createVNode(_component_BarsIcon, vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('listIcon'))), null, 16)
      ])
    ], 16, _hoisted_1),
    vue.createElementVNode("button", vue.mergeProps({
      "aria-label": $options.gridViewAriaLabel,
      class: $options.buttonGridClass,
      onClick: _cache[1] || (_cache[1] = $event => ($options.changeLayout('grid'))),
      type: "button",
      "aria-pressed": $data.isGridButtonPressed
    }, _ctx.ptm('gridButton')), [
      vue.renderSlot(_ctx.$slots, "gridicon", {}, () => [
        vue.createVNode(_component_ThLargeIcon, vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('gridIcon'))), null, 16)
      ])
    ], 16, _hoisted_2)
  ], 16))
}

script.render = render;

module.exports = script;
