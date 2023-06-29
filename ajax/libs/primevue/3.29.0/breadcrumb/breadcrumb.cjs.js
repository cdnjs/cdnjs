'use strict';

var BaseComponent = require('primevue/basecomponent');
var ChevronRightIcon = require('primevue/icons/chevronright');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var ChevronRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronRightIcon);

var script$1 = {
    name: 'BreadcrumbItem',
    extends: BaseComponent__default["default"],
    props: {
        item: null,
        templates: null,
        exact: null,
        index: null
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
    }
};

const _hoisted_1 = ["href", "aria-current", "onClick"];
const _hoisted_2 = ["href", "target", "aria-current"];

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = vue.resolveComponent("router-link");

  return ($options.visible())
    ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
        key: 0,
        class: $options.containerClass()
      }, _ctx.ptm('menuitem')), [
        (!$props.templates || !$props.templates.item)
          ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
              ($props.item.to)
                ? (vue.openBlock(), vue.createBlock(_component_router_link, {
                    key: 0,
                    to: $props.item.to,
                    custom: ""
                  }, {
                    default: vue.withCtx(({ navigate, href, isActive, isExactActive }) => [
                      vue.createElementVNode("a", vue.mergeProps({
                        href: href,
                        class: $options.linkClass({ isActive, isExactActive }),
                        "aria-current": $options.isCurrentUrl(),
                        onClick: $event => ($options.onClick($event, navigate))
                      }, _ctx.ptm('action')), [
                        ($props.templates.itemicon)
                          ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.itemicon), {
                              key: 0,
                              item: $props.item,
                              class: "p-menuitem-icon"
                            }, null, 8, ["item"]))
                          : ($props.item.icon)
                            ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
                                key: 1,
                                class: ['p-menuitem-icon', $props.item.icon]
                              }, _ctx.ptm('icon')), null, 16))
                            : vue.createCommentVNode("", true),
                        ($props.item.label)
                          ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
                              key: 2,
                              class: "p-menuitem-text"
                            }, _ctx.ptm('label')), vue.toDisplayString($options.label()), 17))
                          : vue.createCommentVNode("", true)
                      ], 16, _hoisted_1)
                    ]),
                    _: 1
                  }, 8, ["to"]))
                : (vue.openBlock(), vue.createElementBlock("a", vue.mergeProps({
                    key: 1,
                    href: $props.item.url || '#',
                    class: $options.linkClass(),
                    target: $props.item.target,
                    "aria-current": $options.isCurrentUrl(),
                    onClick: _cache[0] || (_cache[0] = (...args) => ($options.onClick && $options.onClick(...args)))
                  }, _ctx.ptm('action')), [
                    ($props.templates && $props.templates.itemicon)
                      ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.itemicon), {
                          key: 0,
                          item: $props.item,
                          class: "p-menuitem-icon"
                        }, null, 8, ["item"]))
                      : ($props.item.icon)
                        ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
                            key: 1,
                            class: ['p-menuitem-icon', $props.item.icon]
                          }, _ctx.ptm('icon')), null, 16))
                        : vue.createCommentVNode("", true),
                    ($props.item.label)
                      ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
                          key: 2,
                          class: "p-menuitem-text"
                        }, _ctx.ptm('label')), vue.toDisplayString($options.label()), 17))
                      : vue.createCommentVNode("", true)
                  ], 16, _hoisted_2))
            ], 64))
          : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.item), {
              key: 1,
              item: $props.item
            }, null, 8, ["item"]))
      ], 16))
    : vue.createCommentVNode("", true)
}

script$1.render = render$1;

var script = {
    name: 'Breadcrumb',
    extends: BaseComponent__default["default"],
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
        BreadcrumbItem: script$1,
        ChevronRightIcon: ChevronRightIcon__default["default"]
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_BreadcrumbItem = vue.resolveComponent("BreadcrumbItem");
  const _component_ChevronRightIcon = vue.resolveComponent("ChevronRightIcon");

  return (vue.openBlock(), vue.createElementBlock("nav", vue.mergeProps({ class: "p-breadcrumb p-component" }, _ctx.ptm('root')), [
    vue.createElementVNode("ol", vue.mergeProps({ class: "p-breadcrumb-list" }, _ctx.ptm('menu')), [
      ($props.home)
        ? (vue.openBlock(), vue.createBlock(_component_BreadcrumbItem, {
            key: 0,
            item: $props.home,
            class: "p-breadcrumb-home",
            templates: _ctx.$slots,
            exact: $props.exact,
            pt: _ctx.pt
          }, null, 8, ["item", "templates", "exact", "pt"]))
        : vue.createCommentVNode("", true),
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.model, (item, i) => {
        return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
          key: item.label
        }, [
          ($props.home || i !== 0)
            ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
                key: 0,
                class: "p-menuitem-separator"
              }, _ctx.ptm('separator')), [
                vue.renderSlot(_ctx.$slots, "separator", {}, () => [
                  vue.createVNode(_component_ChevronRightIcon, vue.mergeProps({ "aria-hidden": "true" }, _ctx.ptm('separatorIcon')), null, 16)
                ])
              ], 16))
            : vue.createCommentVNode("", true),
          vue.createVNode(_component_BreadcrumbItem, {
            item: item,
            index: i,
            templates: _ctx.$slots,
            exact: $props.exact,
            pt: _ctx.pt
          }, null, 8, ["item", "index", "templates", "exact", "pt"])
        ], 64))
      }), 128))
    ], 16)
  ], 16))
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

module.exports = script;
