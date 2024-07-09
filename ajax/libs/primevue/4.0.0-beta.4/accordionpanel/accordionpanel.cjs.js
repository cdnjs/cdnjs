'use strict';

var vue = require('vue');
var AccordionPanelStyle = require('primevue/accordionpanel/style');
var BaseComponent = require('primevue/basecomponent');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var AccordionPanelStyle__default = /*#__PURE__*/_interopDefaultLegacy(AccordionPanelStyle);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var script$1 = {
  name: 'BaseAccordionPanel',
  "extends": BaseComponent__default["default"],
  props: {
    value: {
      type: String,
      "default": undefined
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    as: {
      type: String,
      "default": 'DIV'
    },
    asChild: {
      type: Boolean,
      "default": false
    }
  },
  style: AccordionPanelStyle__default["default"],
  provide: function provide() {
    return {
      $pcAccordionPanel: this,
      $parentInstance: this
    };
  }
};

var script = {
  name: 'AccordionPanel',
  "extends": script$1,
  inheritAttrs: false,
  inject: ['$pcAccordion'],
  computed: {
    active: function active() {
      return this.$pcAccordion.isItemActive(this.value);
    },
    attrs: function attrs() {
      return vue.mergeProps(this.a11yAttrs, this.ptmi('root', this.ptParams));
    },
    a11yAttrs: function a11yAttrs() {
      return {
        'data-pc-name': 'accordionpanel',
        'data-p-disabled': this.disabled,
        'data-p-active': this.active
      };
    },
    ptParams: function ptParams() {
      return {
        context: {
          active: this.active
        }
      };
    }
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return !_ctx.asChild ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.as), vue.mergeProps({
    key: 0,
    "class": _ctx.cx('root')
  }, $options.attrs), {
    "default": vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "default")];
    }),
    _: 3
  }, 16, ["class"])) : vue.renderSlot(_ctx.$slots, "default", {
    key: 1,
    "class": vue.normalizeClass(_ctx.cx('root')),
    active: $options.active,
    a11yAttrs: $options.a11yAttrs
  });
}

script.render = render;

module.exports = script;
