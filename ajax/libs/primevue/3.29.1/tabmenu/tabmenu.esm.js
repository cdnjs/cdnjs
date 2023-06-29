import BaseComponent from 'primevue/basecomponent';
import Ripple from 'primevue/ripple';
import { DomHandler } from 'primevue/utils';
import { resolveComponent, resolveDirective, openBlock, createElementBlock, mergeProps, createElementVNode, Fragment, renderList, createBlock, withCtx, withDirectives, resolveDynamicComponent, normalizeClass, createCommentVNode, toDisplayString } from 'vue';

var script = {
    name: 'TabMenu',
    extends: BaseComponent,
    emits: ['update:activeIndex', 'tab-change'],
    props: {
        model: {
            type: Array,
            default: null
        },
        exact: {
            type: Boolean,
            default: true
        },
        activeIndex: {
            type: Number,
            default: 0
        },
        'aria-labelledby': {
            type: String,
            default: null
        },
        'aria-label': {
            type: String,
            default: null
        }
    },
    timeout: null,
    data() {
        return {
            d_activeIndex: this.activeIndex
        };
    },
    watch: {
        $route() {
            this.timeout = setTimeout(() => this.updateInkBar(), 50);
        },
        activeIndex(newValue) {
            this.d_activeIndex = newValue;
        }
    },
    mounted() {
        this.updateInkBar();
    },
    updated() {
        this.updateInkBar();
    },
    beforeUnmount() {
        clearTimeout(this.timeout);
    },
    methods: {
        getPTOptions(key, index) {
            return this.ptm(key, {
                context: {
                    order: index
                }
            });
        },
        onItemClick(event, item, index, navigate) {
            if (this.disabled(item)) {
                event.preventDefault();

                return;
            }

            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item
                });
            }

            if (item.to && navigate) {
                navigate(event);
            }

            if (index !== this.d_activeIndex) {
                this.d_activeIndex = index;
                this.$emit('update:activeIndex', this.d_activeIndex);
            }

            this.$emit('tab-change', {
                originalEvent: event,
                index: index
            });
        },
        onKeydownItem(event, index) {
            let i = index;

            let foundElement = {};
            const tabLinkRef = this.$refs.tabLink;

            switch (event.code) {
                case 'ArrowRight': {
                    foundElement = this.findNextItem(this.$refs.tab, i);
                    i = foundElement.i;

                    break;
                }

                case 'ArrowLeft': {
                    foundElement = this.findPrevItem(this.$refs.tab, i);
                    i = foundElement.i;

                    break;
                }

                case 'End': {
                    foundElement = this.findPrevItem(this.$refs.tab, this.model.length);
                    i = foundElement.i;

                    event.preventDefault();
                    break;
                }

                case 'Home': {
                    foundElement = this.findNextItem(this.$refs.tab, -1);
                    i = foundElement.i;

                    event.preventDefault();
                    break;
                }

                case 'Space':

                case 'Enter': {
                    if (event.currentTarget) {
                        event.currentTarget.click();
                    }

                    event.preventDefault();
                    break;
                }

                case 'Tab': {
                    this.setDefaultTabIndexes(tabLinkRef);

                    break;
                }
            }

            if (tabLinkRef[i] && tabLinkRef[index]) {
                tabLinkRef[index].tabIndex = '-1';
                tabLinkRef[i].tabIndex = '0';
                tabLinkRef[i].focus();
            }
        },
        findNextItem(items, index) {
            let i = index + 1;

            if (i >= items.length) {
                return { nextItem: items[items.length], i: items.length };
            }

            let nextItem = items[i];

            if (nextItem) return DomHandler.hasClass(nextItem, 'p-disabled') ? this.findNextItem(items, i) : { nextItem, i };
            else return null;
        },
        findPrevItem(items, index) {
            let i = index - 1;

            if (i < 0) {
                return { nextItem: items[0], i: 0 };
            }

            let prevItem = items[i];

            if (prevItem) return DomHandler.hasClass(prevItem, 'p-disabled') ? this.findPrevItem(items, i) : { prevItem, i };
            else return null;
        },
        getItemClass(item, index) {
            return [
                'p-tabmenuitem',
                item.class,
                {
                    'p-highlight': this.d_activeIndex === index,
                    'p-disabled': this.disabled(item)
                }
            ];
        },
        getRouteItemClass(item, isActive, isExactActive) {
            return [
                'p-tabmenuitem',
                item.class,
                {
                    'p-highlight': this.exact ? isExactActive : isActive,
                    'p-disabled': this.disabled(item)
                }
            ];
        },
        getItemIcon(item) {
            return ['p-menuitem-icon', item.icon];
        },
        visible(item) {
            return typeof item.visible === 'function' ? item.visible() : item.visible !== false;
        },
        disabled(item) {
            return typeof item.disabled === 'function' ? item.disabled() : item.disabled;
        },
        label(item) {
            return typeof item.label === 'function' ? item.label() : item.label;
        },
        setDefaultTabIndexes(tabLinkRef) {
            setTimeout(() => {
                tabLinkRef.forEach((item) => {
                    item.tabIndex = DomHandler.hasClass(item.parentElement, 'p-highlight') ? '0' : '-1';
                });
            }, 300);
        },
        setTabIndex(index) {
            return this.d_activeIndex === index ? '0' : '-1';
        },
        updateInkBar() {
            let tabs = this.$refs.nav.children;
            let inkHighlighted = false;

            for (let i = 0; i < tabs.length; i++) {
                let tab = tabs[i];

                if (DomHandler.hasClass(tab, 'p-highlight')) {
                    this.$refs.inkbar.style.width = DomHandler.getWidth(tab) + 'px';
                    this.$refs.inkbar.style.left = DomHandler.getOffset(tab).left - DomHandler.getOffset(this.$refs.nav).left + 'px';
                    inkHighlighted = true;
                }
            }

            if (!inkHighlighted) {
                this.$refs.inkbar.style.width = '0px';
                this.$refs.inkbar.style.left = '0px';
            }
        }
    },
    computed: {
        focusableItems() {
            return (this.model || []).reduce((result, item) => {
                this.visible(item) && !DomHandler.hasClass(item, 'p-disabled') && result.push(item);

                return result;
            }, []);
        }
    },
    directives: {
        ripple: Ripple
    }
};

const _hoisted_1 = ["aria-labelledby", "aria-label"];
const _hoisted_2 = ["href", "aria-label", "aria-disabled", "tabindex", "onClick", "onKeydown"];
const _hoisted_3 = ["onClick", "onKeydown"];
const _hoisted_4 = ["href", "target", "aria-label", "aria-disabled", "tabindex"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _directive_ripple = resolveDirective("ripple");

  return (openBlock(), createElementBlock("div", mergeProps({ class: "p-tabmenu p-component" }, _ctx.ptm('root')), [
    createElementVNode("ul", mergeProps({
      ref: "nav",
      class: "p-tabmenu-nav p-reset",
      role: "menubar",
      "aria-labelledby": _ctx.ariaLabelledby,
      "aria-label": _ctx.ariaLabel
    }, _ctx.ptm('menu')), [
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.focusableItems, (item, i) => {
        return (openBlock(), createElementBlock(Fragment, {
          key: $options.label(item) + '_' + i.toString()
        }, [
          (item.to && !$options.disabled(item))
            ? (openBlock(), createBlock(_component_router_link, {
                key: 0,
                to: item.to,
                custom: ""
              }, {
                default: withCtx(({ navigate, href, isActive, isExactActive }) => [
                  ($options.visible(item))
                    ? (openBlock(), createElementBlock("li", mergeProps({
                        key: 0,
                        ref_for: true,
                        ref: "tab",
                        class: $options.getRouteItemClass(item, isActive, isExactActive),
                        style: item.style,
                        role: "presentation"
                      }, $options.getPTOptions('menuitem', i)), [
                        (!_ctx.$slots.item)
                          ? withDirectives((openBlock(), createElementBlock("a", mergeProps({
                              key: 0,
                              ref_for: true,
                              ref: "tabLink",
                              role: "menuitem",
                              href: href,
                              class: "p-menuitem-link",
                              "aria-label": $options.label(item),
                              "aria-disabled": $options.disabled(item),
                              tabindex: isExactActive ? '0' : '-1',
                              onClick: $event => ($options.onItemClick($event, item, i, navigate)),
                              onKeydown: $event => ($options.onKeydownItem($event, i, navigate))
                            }, $options.getPTOptions('action', i)), [
                              (_ctx.$slots.itemicon)
                                ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.itemicon), {
                                    key: 0,
                                    item: item,
                                    class: normalizeClass($options.getItemIcon(item))
                                  }, null, 8, ["item", "class"]))
                                : (item.icon)
                                  ? (openBlock(), createElementBlock("span", mergeProps({
                                      key: 1,
                                      class: $options.getItemIcon(item)
                                    }, $options.getPTOptions('icon', i)), null, 16))
                                  : createCommentVNode("", true),
                              createElementVNode("span", mergeProps({ class: "p-menuitem-text" }, $options.getPTOptions('label', i)), toDisplayString($options.label(item)), 17)
                            ], 16, _hoisted_2)), [
                              [_directive_ripple]
                            ])
                          : (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.item), {
                              key: 1,
                              item: item,
                              index: i
                            }, null, 8, ["item", "index"]))
                      ], 16))
                    : createCommentVNode("", true)
                ]),
                _: 2
              }, 1032, ["to"]))
            : ($options.visible(item))
              ? (openBlock(), createElementBlock("li", mergeProps({
                  key: 1,
                  ref_for: true,
                  ref: "tab",
                  class: $options.getItemClass(item, i),
                  role: "presentation",
                  onClick: $event => ($options.onItemClick($event, item, i)),
                  onKeydown: $event => ($options.onKeydownItem($event, i))
                }, $options.getPTOptions('menuitem', i)), [
                  (!_ctx.$slots.item)
                    ? withDirectives((openBlock(), createElementBlock("a", mergeProps({
                        key: 0,
                        ref_for: true,
                        ref: "tabLink",
                        role: "menuitem",
                        href: item.url,
                        class: "p-menuitem-link",
                        target: item.target,
                        "aria-label": $options.label(item),
                        "aria-disabled": $options.disabled(item),
                        tabindex: $options.setTabIndex(i)
                      }, $options.getPTOptions('action', i)), [
                        (_ctx.$slots.itemicon)
                          ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.itemicon), {
                              key: 0,
                              item: item,
                              class: normalizeClass($options.getItemIcon(item))
                            }, null, 8, ["item", "class"]))
                          : (item.icon)
                            ? (openBlock(), createElementBlock("span", mergeProps({
                                key: 1,
                                class: $options.getItemIcon(item)
                              }, $options.getPTOptions('icon', i)), null, 16))
                            : createCommentVNode("", true),
                        createElementVNode("span", mergeProps({ class: "p-menuitem-text" }, $options.getPTOptions('label', i)), toDisplayString($options.label(item)), 17)
                      ], 16, _hoisted_4)), [
                        [_directive_ripple]
                      ])
                    : (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.item), {
                        key: 1,
                        item: item,
                        index: i
                      }, null, 8, ["item", "index"]))
                ], 16, _hoisted_3))
              : createCommentVNode("", true)
        ], 64))
      }), 128)),
      createElementVNode("li", mergeProps({
        ref: "inkbar",
        role: "none",
        class: "p-tabmenu-ink-bar"
      }, _ctx.ptm('inkbar')), null, 16)
    ], 16, _hoisted_1)
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

var css_248z = "\n.p-tabmenu {\n    overflow-x: auto;\n}\n.p-tabmenu-nav {\n    display: flex;\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    flex-wrap: nowrap;\n}\n.p-tabmenu-nav a {\n    cursor: pointer;\n    user-select: none;\n    display: flex;\n    align-items: center;\n    position: relative;\n    text-decoration: none;\n    text-decoration: none;\n    overflow: hidden;\n}\n.p-tabmenu-nav a:focus {\n    z-index: 1;\n}\n.p-tabmenu-nav .p-menuitem-text {\n    line-height: 1;\n}\n.p-tabmenu-ink-bar {\n    display: none;\n    z-index: 1;\n}\n.p-tabmenu::-webkit-scrollbar {\n    display: none;\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
