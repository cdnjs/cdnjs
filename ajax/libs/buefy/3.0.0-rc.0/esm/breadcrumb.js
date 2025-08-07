import { defineComponent, createElementBlock, openBlock, normalizeClass, createElementVNode, renderSlot, mergeProps, createBlock, resolveDynamicComponent, normalizeProps, guardReactiveProps, withCtx } from 'vue';
import { c as config } from './config-CKuo-p6e.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';
import { C as CompatFallthroughMixin } from './CompatFallthroughMixin-C8LPuwDr.js';
import { a as registerComponent } from './plugins-B172kuKE.js';

var _sfc_main$1 = defineComponent({
  name: "BBreadcrumb",
  props: {
    align: {
      type: String,
      default: () => {
        return config.defaultBreadcrumbAlign;
      }
    },
    separator: {
      type: String,
      default: () => {
        return config.defaultBreadcrumbSeparator;
      }
    },
    size: {
      type: String,
      default: () => {
        return config.defaultBreadcrumbSize;
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
  return openBlock(), createElementBlock(
    "nav",
    {
      class: normalizeClass(_ctx.breadcrumbClasses)
    },
    [
      createElementVNode("ul", null, [
        renderSlot(_ctx.$slots, "default")
      ])
    ],
    2
    /* CLASS */
  );
}
var Breadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

var _sfc_main = defineComponent({
  name: "BBreadcrumbItem",
  mixins: [CompatFallthroughMixin],
  props: {
    tag: {
      type: [String, Object],
      default: () => {
        return config.defaultBreadcrumbTag;
      }
    },
    active: Boolean
  }
});

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "li",
    mergeProps({
      class: { "is-active": _ctx.active }
    }, _ctx.rootAttrs),
    [
      (openBlock(), createBlock(
        resolveDynamicComponent(_ctx.tag),
        normalizeProps(guardReactiveProps(_ctx.fallthroughAttrs)),
        {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
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
var BreadcrumbItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    registerComponent(Vue, Breadcrumb);
    registerComponent(Vue, BreadcrumbItem);
  }
};

export { Breadcrumb as BBreadcrumb, BreadcrumbItem as BBreadcrumbItem, Plugin as default };
