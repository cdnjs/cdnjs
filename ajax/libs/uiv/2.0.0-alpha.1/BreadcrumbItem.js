import { resolveComponent, openBlock, createElementBlock, normalizeClass, renderSlot, createBlock, withCtx } from "vue";
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
const _sfc_main = {
  mixins: [linkMixin],
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
};
const _hoisted_1 = ["href", "target"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
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
    ], 8, _hoisted_1))
  ], 2);
}
var BreadcrumbItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { BreadcrumbItem as default };
