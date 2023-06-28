'use strict';

var vue = require('vue');

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
    }
};

const _hoisted_1 = {
  class: "p-dataview-layout-options p-selectbutton p-buttonset",
  role: "group"
};
const _hoisted_2 = ["aria-label", "aria-pressed"];
const _hoisted_3 = /*#__PURE__*/vue.createElementVNode("i", { class: "pi pi-bars" }, null, -1);
const _hoisted_4 = [
  _hoisted_3
];
const _hoisted_5 = ["aria-label", "aria-pressed"];
const _hoisted_6 = /*#__PURE__*/vue.createElementVNode("i", { class: "pi pi-th-large" }, null, -1);
const _hoisted_7 = [
  _hoisted_6
];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
    vue.createElementVNode("button", {
      "aria-label": $options.listViewAriaLabel,
      class: vue.normalizeClass($options.buttonListClass),
      onClick: _cache[0] || (_cache[0] = $event => ($options.changeLayout('list'))),
      type: "button",
      "aria-pressed": $data.isListButtonPressed
    }, _hoisted_4, 10, _hoisted_2),
    vue.createElementVNode("button", {
      "aria-label": $options.gridViewAriaLabel,
      class: vue.normalizeClass($options.buttonGridClass),
      onClick: _cache[1] || (_cache[1] = $event => ($options.changeLayout('grid'))),
      type: "button",
      "aria-pressed": $data.isGridButtonPressed
    }, _hoisted_7, 10, _hoisted_5)
  ]))
}

script.render = render;

module.exports = script;
