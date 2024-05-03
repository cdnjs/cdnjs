'use strict';

var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var TabsStyle = require('primevue/tabs/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var TabsStyle__default = /*#__PURE__*/_interopDefaultLegacy(TabsStyle);

var script$1 = {
  name: 'BaseTabs',
  "extends": BaseComponent__default["default"],
  props: {
    value: {
      type: String,
      "default": undefined
    },
    lazy: {
      type: Boolean,
      "default": false
    },
    scrollable: {
      type: Boolean,
      "default": false
    },
    showNavigators: {
      type: Boolean,
      "default": true
    },
    tabindex: {
      type: Number,
      "default": 0
    },
    selectOnFocus: {
      type: Boolean,
      "default": false
    }
  },
  style: TabsStyle__default["default"],
  provide: function provide() {
    return {
      $pcTabs: this,
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Tabs',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:value'],
  data: function data() {
    return {
      id: this.$attrs.id,
      d_value: this.value
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || utils.UniqueComponentId();
    },
    value: function value(newValue) {
      this.d_value = newValue;
    }
  },
  mounted: function mounted() {
    this.id = this.id || utils.UniqueComponentId();
  },
  methods: {
    updateValue: function updateValue(newValue) {
      if (this.d_value !== newValue) {
        this.d_value = newValue;
        this.$emit('update:value', newValue);
      }
    },
    isVertical: function isVertical() {
      return this.orientation === 'vertical';
    }
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [vue.renderSlot(_ctx.$slots, "default")], 16);
}

script.render = render;

module.exports = script;
