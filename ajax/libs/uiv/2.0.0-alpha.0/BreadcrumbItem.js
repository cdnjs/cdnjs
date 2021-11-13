import { resolveComponent, openBlock, createElementBlock, normalizeClass, renderSlot, createBlock, withCtx } from 'vue';

var linkMixin = {
  props: {
    // <a> props
    href: String,
    target: String,
    // <router-link> props
    to: null,
    replace: {
      type: Boolean,
      default: false,
    },
    append: {
      type: Boolean,
      default: false,
    },
    exact: {
      type: Boolean,
      default: false,
    },
  },
};

var script = {
  mixins: [linkMixin],
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
};

var _hoisted_1 = ["href", "target"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = resolveComponent("router-link");

  return (openBlock(), createElementBlock("li", {
    class: normalizeClass({ active: $props.active })
  }, [
    ($props.active)
      ? renderSlot(_ctx.$slots, "default", { key: 0 })
      : (_ctx.to)
        ? (openBlock(), createBlock(_component_router_link, {
            key: 1,
            to: _ctx.to,
            replace: _ctx.replace,
            append: _ctx.append,
            exact: _ctx.exact
          }, {
            default: withCtx(function () { return [
              renderSlot(_ctx.$slots, "default")
            ]; }),
            _: 3 /* FORWARDED */
          }, 8 /* PROPS */, ["to", "replace", "append", "exact"]))
        : (openBlock(), createElementBlock("a", {
            key: 2,
            href: _ctx.href,
            target: _ctx.target
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 8 /* PROPS */, _hoisted_1))
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/breadcrumbs/BreadcrumbItem.vue";

export { script as default };
//# sourceMappingURL=BreadcrumbItem.js.map
