import { resolveComponent, openBlock, createElementBlock, normalizeClass, renderSlot, createBlock, withCtx, Fragment, renderList, createTextVNode, toDisplayString } from 'vue';

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

var script$1 = {
  mixins: [linkMixin],
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
};

var _hoisted_1$1 = ["href", "target"];

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
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
          ], 8 /* PROPS */, _hoisted_1$1))
  ], 2 /* CLASS */))
}

script$1.render = render$1;
script$1.__file = "src/components/breadcrumbs/BreadcrumbItem.vue";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill

function hasOwnProperty(o, k) {
  return Object.prototype.hasOwnProperty.call(o, k)
}

var script = {
  functional: true,
  components: { BreadcrumbItem: script$1 },
  props: {
    items: { type: Array, default: function () { return []; } },
  },
  methods: {
    hasOwnProperty: hasOwnProperty,
  },
};

var _hoisted_1 = { class: "breadcrumb" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_BreadcrumbItem = resolveComponent("BreadcrumbItem");

  return (openBlock(), createElementBlock("ol", _hoisted_1, [
    renderSlot(_ctx.$slots, "default"),
    (openBlock(true), createElementBlock(Fragment, null, renderList($props.items, function (item, index) {
      return (openBlock(), createBlock(_component_BreadcrumbItem, {
        key: $options.hasOwnProperty(item, 'key') ? item.key : index,
        active: 
        $options.hasOwnProperty(item, 'active')
          ? item.active
          : index === $props.items.length - 1
      ,
        href: item.href,
        to: item.to,
        replace: item.replace,
        append: item.append,
        exact: item.exact
      }, {
        default: withCtx(function () { return [
          createTextVNode(toDisplayString(item.text), 1 /* TEXT */)
        ]; }),
        _: 2 /* DYNAMIC */
      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["active", "href", "to", "replace", "append", "exact"]))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}

script.render = render;
script.__file = "src/components/breadcrumbs/Breadcrumbs.vue";

export { script as default };
//# sourceMappingURL=Breadcrumbs.js.map
