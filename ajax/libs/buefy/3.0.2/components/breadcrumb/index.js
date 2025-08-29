/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Breadcrumb = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    let config = {
      defaultCompatFallthrough: true,
      defaultBreadcrumbTag: "a",
      defaultBreadcrumbAlign: "is-left",
      defaultBreadcrumbSeparator: "",
      defaultBreadcrumbSize: "is-medium"};

    var _sfc_main$1 = vue.defineComponent({
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

    var _export_sfc = (sfc, props) => {
      const target = sfc.__vccOpts || sfc;
      for (const [key, val] of props) {
        target[key] = val;
      }
      return target;
    };

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
    var Breadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

    var __getOwnPropSymbols = Object.getOwnPropertySymbols;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __propIsEnum = Object.prototype.propertyIsEnumerable;
    var __objRest = (source, exclude) => {
      var target = {};
      for (var prop in source)
        if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
          target[prop] = source[prop];
      if (source != null && __getOwnPropSymbols)
        for (var prop of __getOwnPropSymbols(source)) {
          if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
            target[prop] = source[prop];
        }
      return target;
    };
    var CompatFallthroughMixin = vue.defineComponent({
      inheritAttrs: false,
      props: {
        compatFallthrough: {
          type: Boolean,
          default: () => config.defaultCompatFallthrough
        }
      },
      computed: {
        rootAttrs() {
          return this.compatFallthrough ? {
            class: this.$attrs.class,
            style: this.$attrs.style,
            id: this.$attrs.id
          } : {};
        },
        fallthroughAttrs() {
          if (this.compatFallthrough) {
            const _a = this.$attrs, { style: _1, class: _2, id: _3 } = _a, rest = __objRest(_a, ["style", "class", "id"]);
            return rest;
          } else {
            return this.$attrs;
          }
        }
      }
    });

    var _sfc_main = vue.defineComponent({
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
    var BreadcrumbItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

    const registerComponent = (Vue, component, name) => {
      const componentName = component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };

    const Plugin = {
      install(Vue) {
        registerComponent(Vue, Breadcrumb);
        registerComponent(Vue, BreadcrumbItem);
      }
    };

    exports.BBreadcrumb = Breadcrumb;
    exports.BBreadcrumbItem = BreadcrumbItem;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
