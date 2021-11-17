import { resolveComponent, openBlock, createElementBlock, normalizeClass, renderSlot, createBlock, withCtx, Fragment, renderList, createTextVNode, toDisplayString } from "vue";
var linkMixin = {
  props: {
    href: String,
    target: String,
    to: null,
    replace: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
    },
    exact: {
      type: Boolean,
      default: false
    }
  }
};
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main$1 = {
  mixins: [linkMixin],
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
};
const _hoisted_1$1 = ["href", "target"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("li", {
    class: normalizeClass({ active: $props.active })
  }, [
    $props.active ? renderSlot(_ctx.$slots, "default", { key: 0 }) : _ctx.to ? (openBlock(), createBlock(_component_router_link, {
      key: 1,
      to: _ctx.to,
      replace: _ctx.replace,
      append: _ctx.append,
      exact: _ctx.exact
    }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
    }, 8, ["to", "replace", "append", "exact"])) : (openBlock(), createElementBlock("a", {
      key: 2,
      href: _ctx.href,
      target: _ctx.target
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 8, _hoisted_1$1))
  ], 2);
}
var BreadcrumbItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
function hasOwnProperty(o, k) {
  return Object.prototype.hasOwnProperty.call(o, k);
}
const _sfc_main = {
  functional: true,
  components: { BreadcrumbItem },
  props: {
    items: { type: Array, default: () => [] }
  },
  methods: {
    hasOwnProperty
  }
};
const _hoisted_1 = { class: "breadcrumb" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_BreadcrumbItem = resolveComponent("BreadcrumbItem");
  return openBlock(), createElementBlock("ol", _hoisted_1, [
    renderSlot(_ctx.$slots, "default"),
    (openBlock(true), createElementBlock(Fragment, null, renderList($props.items, (item, index) => {
      return openBlock(), createBlock(_component_BreadcrumbItem, {
        key: $options.hasOwnProperty(item, "key") ? item.key : index,
        active: $options.hasOwnProperty(item, "active") ? item.active : index === $props.items.length - 1,
        href: item.href,
        to: item.to,
        replace: item.replace,
        append: item.append,
        exact: item.exact
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(item.text), 1)
        ]),
        _: 2
      }, 1032, ["active", "href", "to", "replace", "append", "exact"]);
    }), 128))
  ]);
}
var Breadcrumbs = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Breadcrumbs as default };
