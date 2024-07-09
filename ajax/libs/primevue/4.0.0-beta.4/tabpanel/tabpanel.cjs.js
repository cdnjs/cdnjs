'use strict';

var utils = require('primevue/utils');
var vue = require('vue');
var BaseComponent = require('primevue/basecomponent');
var TabPanelStyle = require('primevue/tabpanel/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var TabPanelStyle__default = /*#__PURE__*/_interopDefaultLegacy(TabPanelStyle);

var script$1 = {
  name: 'BaseTabPanel',
  "extends": BaseComponent__default["default"],
  props: {
    // in Tabs
    value: {
      type: String,
      "default": undefined
    },
    as: {
      type: String,
      "default": 'DIV'
    },
    asChild: {
      type: Boolean,
      "default": false
    },
    // in TabView
    header: null,
    headerStyle: null,
    headerClass: null,
    headerProps: null,
    headerActionProps: null,
    contentStyle: null,
    contentClass: null,
    contentProps: null,
    disabled: Boolean
  },
  style: TabPanelStyle__default["default"],
  provide: function provide() {
    return {
      $pcTabPanel: this,
      $parentInstance: this
    };
  }
};

var script = {
  name: 'TabPanel',
  "extends": script$1,
  inheritAttrs: false,
  inject: ['$pcTabs'],
  computed: {
    active: function active() {
      var _this$$pcTabs;
      return utils.ObjectUtils.equals((_this$$pcTabs = this.$pcTabs) === null || _this$$pcTabs === void 0 ? void 0 : _this$$pcTabs.d_value, this.value);
    },
    id: function id() {
      var _this$$pcTabs2;
      return "".concat((_this$$pcTabs2 = this.$pcTabs) === null || _this$$pcTabs2 === void 0 ? void 0 : _this$$pcTabs2.id, "_tabpanel_").concat(this.value);
    },
    ariaLabelledby: function ariaLabelledby() {
      var _this$$pcTabs3;
      return "".concat((_this$$pcTabs3 = this.$pcTabs) === null || _this$$pcTabs3 === void 0 ? void 0 : _this$$pcTabs3.id, "_tab_").concat(this.value);
    },
    attrs: function attrs() {
      return vue.mergeProps(this.a11yAttrs, this.ptmi('root', this.ptParams));
    },
    a11yAttrs: function a11yAttrs() {
      var _this$$pcTabs4;
      return {
        id: this.id,
        tabindex: (_this$$pcTabs4 = this.$pcTabs) === null || _this$$pcTabs4 === void 0 ? void 0 : _this$$pcTabs4.tabindex,
        role: 'tabpanel',
        'aria-labelledby': this.ariaLabelledby,
        'data-pc-name': 'tabpanel',
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
  var _$options$$pcTabs, _$options$$pcTabs2;
  return !$options.$pcTabs ? vue.renderSlot(_ctx.$slots, "default", {
    key: 0
  }) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
    key: 1
  }, [!_ctx.asChild ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
    key: 0
  }, [((_$options$$pcTabs = $options.$pcTabs) !== null && _$options$$pcTabs !== void 0 && _$options$$pcTabs.lazy ? $options.active : true) ? vue.withDirectives((vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.as), vue.mergeProps({
    key: 0,
    "class": _ctx.cx('root')
  }, $options.attrs), {
    "default": vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "default")];
    }),
    _: 3
  }, 16, ["class"])), [[vue.vShow, (_$options$$pcTabs2 = $options.$pcTabs) !== null && _$options$$pcTabs2 !== void 0 && _$options$$pcTabs2.lazy ? true : $options.active]]) : vue.createCommentVNode("", true)], 64)) : vue.renderSlot(_ctx.$slots, "default", {
    key: 1,
    "class": vue.normalizeClass(_ctx.cx('root')),
    active: $options.active,
    a11yAttrs: $options.a11yAttrs
  })], 64));
}

script.render = render;

module.exports = script;
