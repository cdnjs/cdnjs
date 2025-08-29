'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var config = require('./config-DR826Ki2.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');
var CompatFallthroughMixin = require('./CompatFallthroughMixin-hhK0Gkhr.js');
var plugins = require('./plugins-DbyYGVpp.js');

var _sfc_main$1 = vue.defineComponent({
  name: "BBreadcrumb",
  props: {
    align: {
      type: String,
      default: () => {
        return config.config.defaultBreadcrumbAlign;
      }
    },
    separator: {
      type: String,
      default: () => {
        return config.config.defaultBreadcrumbSeparator;
      }
    },
    size: {
      type: String,
      default: () => {
        return config.config.defaultBreadcrumbSize;
      }
    }
  },
  computed: {
    breadcrumbClasses() {
      return ["breadcrumb", this.align, this.separator, this.size];
    }
  }
});

function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock(
    "nav",
    {
      class: vue.normalizeClass(_ctx.breadcrumbClasses)
    },
    [
      vue.createElementVNode("ul", null, [
        vue.renderSlot(_ctx.$slots, "default")
      ])
    ],
    2
    /* CLASS */
  );
}
var Breadcrumb = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

var _sfc_main = vue.defineComponent({
  name: "BBreadcrumbItem",
  mixins: [CompatFallthroughMixin.CompatFallthroughMixin],
  props: {
    tag: {
      type: [String, Object],
      default: () => {
        return config.config.defaultBreadcrumbTag;
      }
    },
    active: Boolean
  }
});

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock(
    "li",
    vue.mergeProps({
      class: { "is-active": _ctx.active }
    }, _ctx.rootAttrs),
    [
      (vue.openBlock(), vue.createBlock(
        vue.resolveDynamicComponent(_ctx.tag),
        vue.normalizeProps(vue.guardReactiveProps(_ctx.fallthroughAttrs)),
        {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
          /* FORWARDED */
        },
        16
        /* FULL_PROPS */
      ))
    ],
    16
    /* FULL_PROPS */
  );
}
var BreadcrumbItem = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Breadcrumb);
    plugins.registerComponent(Vue, BreadcrumbItem);
  }
};

exports.BBreadcrumb = Breadcrumb;
exports.BBreadcrumbItem = BreadcrumbItem;
exports.default = Plugin;
