import { resolveComponent, openBlock, createElementBlock, normalizeClass, Fragment, createBlock, withCtx, createElementVNode, createCommentVNode, toDisplayString, resolveDynamicComponent, renderList, createVNode } from 'vue';

var script$1 = {
    name: 'BreadcrumbItem',
    props: {
        item: null,
        template: null,
        exact: null
    },
    methods: {
        onClick(event, navigate) {
            if (this.item.command) {
                this.item.command({
                    originalEvent: event,
                    item: this.item
                });
            }

            if (this.item.to && navigate) {
                navigate(event);
            }
        },
        containerClass() {
            return ['p-menuitem', { 'p-disabled': this.disabled() }, this.item.class];
        },
        linkClass(routerProps) {
            return [
                'p-menuitem-link',
                {
                    'router-link-active': routerProps && routerProps.isActive,
                    'router-link-active-exact': this.exact && routerProps && routerProps.isExactActive
                }
            ];
        },
        visible() {
            return typeof this.item.visible === 'function' ? this.item.visible() : this.item.visible !== false;
        },
        disabled() {
            return typeof this.item.disabled === 'function' ? this.item.disabled() : this.item.disabled;
        },
        label() {
            return typeof this.item.label === 'function' ? this.item.label() : this.item.label;
        },
        isCurrentUrl() {
            const { to, url } = this.item;
            let lastPath = this.$router ? this.$router.currentRoute.path : '';

            return to === lastPath || url === lastPath ? 'page' : undefined;
        }
    },
    computed: {
        iconClass() {
            return ['p-menuitem-icon', this.item.icon];
        }
    }
};

const _hoisted_1$1 = ["href", "aria-current", "onClick"];
const _hoisted_2$1 = {
  key: 1,
  class: "p-menuitem-text"
};
const _hoisted_3$1 = ["href", "target", "aria-current"];
const _hoisted_4$1 = {
  key: 1,
  class: "p-menuitem-text"
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");

  return ($options.visible())
    ? (openBlock(), createElementBlock("li", {
        key: 0,
        class: normalizeClass($options.containerClass())
      }, [
        (!$props.template)
          ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              ($props.item.to)
                ? (openBlock(), createBlock(_component_router_link, {
                    key: 0,
                    to: $props.item.to,
                    custom: ""
                  }, {
                    default: withCtx(({ navigate, href, isActive, isExactActive }) => [
                      createElementVNode("a", {
                        href: href,
                        class: normalizeClass($options.linkClass({ isActive, isExactActive })),
                        "aria-current": $options.isCurrentUrl(),
                        onClick: $event => ($options.onClick($event, navigate))
                      }, [
                        ($props.item.icon)
                          ? (openBlock(), createElementBlock("span", {
                              key: 0,
                              class: normalizeClass($options.iconClass)
                            }, null, 2))
                          : createCommentVNode("", true),
                        ($props.item.label)
                          ? (openBlock(), createElementBlock("span", _hoisted_2$1, toDisplayString($options.label()), 1))
                          : createCommentVNode("", true)
                      ], 10, _hoisted_1$1)
                    ]),
                    _: 1
                  }, 8, ["to"]))
                : (openBlock(), createElementBlock("a", {
                    key: 1,
                    href: $props.item.url || '#',
                    class: normalizeClass($options.linkClass()),
                    target: $props.item.target,
                    "aria-current": $options.isCurrentUrl(),
                    onClick: _cache[0] || (_cache[0] = (...args) => ($options.onClick && $options.onClick(...args)))
                  }, [
                    ($props.item.icon)
                      ? (openBlock(), createElementBlock("span", {
                          key: 0,
                          class: normalizeClass($options.iconClass)
                        }, null, 2))
                      : createCommentVNode("", true),
                    ($props.item.label)
                      ? (openBlock(), createElementBlock("span", _hoisted_4$1, toDisplayString($options.label()), 1))
                      : createCommentVNode("", true)
                  ], 10, _hoisted_3$1))
            ], 64))
          : (openBlock(), createBlock(resolveDynamicComponent($props.template), {
              key: 1,
              item: $props.item
            }, null, 8, ["item"]))
      ], 2))
    : createCommentVNode("", true)
}

script$1.render = render$1;

var script = {
    name: 'Breadcrumb',
    props: {
        model: {
            type: Array,
            default: null
        },
        home: {
            type: null,
            default: null
        },
        exact: {
            type: Boolean,
            default: true
        }
    },
    components: {
        BreadcrumbItem: script$1
    }
};

const _hoisted_1 = { class: "p-breadcrumb p-component" };
const _hoisted_2 = { class: "p-breadcrumb-list" };
const _hoisted_3 = {
  key: 0,
  class: "p-menuitem-separator"
};
const _hoisted_4 = /*#__PURE__*/createElementVNode("span", {
  class: "pi pi-chevron-right",
  "aria-hidden": "true"
}, null, -1);
const _hoisted_5 = [
  _hoisted_4
];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_BreadcrumbItem = resolveComponent("BreadcrumbItem");

  return (openBlock(), createElementBlock("nav", _hoisted_1, [
    createElementVNode("ol", _hoisted_2, [
      ($props.home)
        ? (openBlock(), createBlock(_component_BreadcrumbItem, {
            key: 0,
            item: $props.home,
            class: "p-breadcrumb-home",
            template: _ctx.$slots.item,
            exact: $props.exact
          }, null, 8, ["item", "template", "exact"]))
        : createCommentVNode("", true),
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.model, (item, i) => {
        return (openBlock(), createElementBlock(Fragment, {
          key: item.label
        }, [
          ($props.home || i !== 0)
            ? (openBlock(), createElementBlock("li", _hoisted_3, _hoisted_5))
            : createCommentVNode("", true),
          createVNode(_component_BreadcrumbItem, {
            item: item,
            template: _ctx.$slots.item,
            exact: $props.exact
          }, null, 8, ["item", "template", "exact"])
        ], 64))
      }), 128))
    ])
  ]))
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n.p-breadcrumb {\n    overflow-x: auto;\n}\n.p-breadcrumb .p-breadcrumb-list {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    display: flex;\n    align-items: center;\n    flex-wrap: nowrap;\n}\n.p-breadcrumb .p-menuitem-text {\n    line-height: 1;\n}\n.p-breadcrumb .p-menuitem-link {\n    text-decoration: none;\n    display: flex;\n    align-items: center;\n}\n.p-breadcrumb .p-menuitem-separator {\n    display: flex;\n    align-items: center;\n}\n.p-breadcrumb::-webkit-scrollbar {\n    display: none;\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
