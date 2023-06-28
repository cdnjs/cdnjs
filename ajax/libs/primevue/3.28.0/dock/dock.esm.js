import BaseComponent from 'primevue/basecomponent';
import Ripple from 'primevue/ripple';
import Tooltip from 'primevue/tooltip';
import { UniqueComponentId, ObjectUtils, DomHandler } from 'primevue/utils';
import { resolveComponent, resolveDirective, openBlock, createElementBlock, mergeProps, createElementVNode, Fragment, renderList, createBlock, withCtx, withDirectives, resolveDynamicComponent, createVNode } from 'vue';

var script$1 = {
    name: 'DockSub',
    extends: BaseComponent,
    emits: ['focus', 'blur'],
    props: {
        position: {
            type: String,
            default: 'bottom'
        },
        model: {
            type: Array,
            default: null
        },
        templates: {
            type: null,
            default: null
        },
        exact: {
            type: Boolean,
            default: true
        },
        tooltipOptions: null,
        menuId: {
            type: String,
            default: null
        },
        tabindex: {
            type: Number,
            default: 0
        },
        'aria-label': {
            type: String,
            default: null
        },
        'aria-labelledby': {
            type: String,
            default: null
        }
    },
    data() {
        return {
            id: this.menuId,
            currentIndex: -3,
            focused: false,
            focusedOptionIndex: -1
        };
    },
    watch: {
        menuId(newValue) {
            this.id = newValue || UniqueComponentId();
        }
    },
    mounted() {
        this.id = this.id || UniqueComponentId();
    },
    methods: {
        getItemId(index) {
            return `${this.id}_${index}`;
        },
        getItemProp(processedItem, name) {
            return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name]) : undefined;
        },
        getPTOptions(id, key) {
            return this.ptm(key, {
                context: {
                    active: this.isItemActive(id)
                }
            });
        },
        isSameMenuItem(event) {
            return event.currentTarget && (event.currentTarget.isSameNode(event.target) || event.currentTarget.isSameNode(event.target.closest('.p-menuitem')));
        },
        isItemActive(id) {
            return id === this.focusedOptionIndex;
        },
        onListMouseLeave() {
            this.currentIndex = -3;
        },
        onItemMouseEnter(index) {
            this.currentIndex = index;
        },
        onItemActionClick(event, navigate) {
            navigate && navigate(event);
        },
        onItemClick(event, processedItem) {
            if (this.isSameMenuItem(event)) {
                const command = this.getItemProp(processedItem, 'command');

                command && command({ originalEvent: event, item: processedItem.item });
            }
        },
        onListFocus(event) {
            this.focused = true;
            this.changeFocusedOptionIndex(0);
            this.$emit('focus', event);
        },
        onListBlur(event) {
            this.focused = false;
            this.focusedOptionIndex = -1;
            this.$emit('blur', event);
        },
        onListKeyDown(event) {
            switch (event.code) {
                case 'ArrowDown': {
                    if (this.position === 'left' || this.position === 'right') this.onArrowDownKey();
                    event.preventDefault();
                    break;
                }

                case 'ArrowUp': {
                    if (this.position === 'left' || this.position === 'right') this.onArrowUpKey();
                    event.preventDefault();
                    break;
                }

                case 'ArrowRight': {
                    if (this.position === 'top' || this.position === 'bottom') this.onArrowDownKey();
                    event.preventDefault();
                    break;
                }

                case 'ArrowLeft': {
                    if (this.position === 'top' || this.position === 'bottom') this.onArrowUpKey();
                    event.preventDefault();
                    break;
                }

                case 'Home': {
                    this.onHomeKey();
                    event.preventDefault();
                    break;
                }

                case 'End': {
                    this.onEndKey();
                    event.preventDefault();
                    break;
                }

                case 'Enter':

                case 'Space': {
                    this.onSpaceKey(event);
                    event.preventDefault();
                    break;
                }
            }
        },
        onArrowDownKey() {
            const optionIndex = this.findNextOptionIndex(this.focusedOptionIndex);

            this.changeFocusedOptionIndex(optionIndex);
        },
        onArrowUpKey() {
            const optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex);

            this.changeFocusedOptionIndex(optionIndex);
        },
        onHomeKey() {
            this.changeFocusedOptionIndex(0);
        },
        onEndKey() {
            this.changeFocusedOptionIndex(DomHandler.find(this.$refs.list, 'li.p-dock-item:not(.p-disabled)').length - 1);
        },
        onSpaceKey() {
            const element = DomHandler.findSingle(this.$refs.list, `li[id="${`${this.focusedOptionIndex}`}"]`);
            const anchorElement = element && DomHandler.findSingle(element, '.p-dock-link');

            anchorElement ? anchorElement.click() : element && element.click();
        },
        findNextOptionIndex(index) {
            const menuitems = DomHandler.find(this.$refs.list, 'li.p-dock-item:not(.p-disabled)');
            const matchedOptionIndex = [...menuitems].findIndex((link) => link.id === index);

            return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
        },
        findPrevOptionIndex(index) {
            const menuitems = DomHandler.find(this.$refs.list, 'li.p-dock-item:not(.p-disabled)');
            const matchedOptionIndex = [...menuitems].findIndex((link) => link.id === index);

            return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
        },
        changeFocusedOptionIndex(index) {
            const menuitems = DomHandler.find(this.$refs.list, 'li.p-dock-item:not(.p-disabled)');

            let order = index >= menuitems.length ? menuitems.length - 1 : index < 0 ? 0 : index;

            this.focusedOptionIndex = menuitems[order].getAttribute('id');
        },
        itemClass(item, index, id) {
            return [
                'p-dock-item',
                {
                    'p-focus': this.isItemActive(id),
                    'p-disabled': this.disabled(item),
                    'p-dock-item-second-prev': this.currentIndex - 2 === index,
                    'p-dock-item-prev': this.currentIndex - 1 === index,
                    'p-dock-item-current': this.currentIndex === index,
                    'p-dock-item-next': this.currentIndex + 1 === index,
                    'p-dock-item-second-next': this.currentIndex + 2 === index
                }
            ];
        },
        linkClass(routerProps) {
            return [
                'p-dock-link',
                {
                    'router-link-active': routerProps && routerProps.isActive,
                    'router-link-active-exact': this.exact && routerProps && routerProps.isExactActive
                }
            ];
        },
        disabled(item) {
            return typeof item.disabled === 'function' ? item.disabled() : item.disabled;
        }
    },
    computed: {
        focusedOptionId() {
            return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
        }
    },
    directives: {
        ripple: Ripple,
        tooltip: Tooltip
    }
};

const _hoisted_1 = ["id", "aria-orientation", "aria-activedescendant", "tabindex", "aria-label", "aria-labelledby"];
const _hoisted_2 = ["id", "aria-label", "aria-disabled", "onClick", "onMouseenter"];
const _hoisted_3 = ["href", "target", "onClick"];
const _hoisted_4 = ["href", "target"];

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _directive_ripple = resolveDirective("ripple");
  const _directive_tooltip = resolveDirective("tooltip");

  return (openBlock(), createElementBlock("div", mergeProps({ class: "p-dock-list-container" }, _ctx.ptm('container')), [
    createElementVNode("ul", mergeProps({
      ref: "list",
      id: $data.id,
      class: "p-dock-list",
      role: "menu",
      "aria-orientation": $props.position === 'bottom' || $props.position === 'top' ? 'horizontal' : 'vertical',
      "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
      tabindex: $props.tabindex,
      "aria-label": _ctx.ariaLabel,
      "aria-labelledby": _ctx.ariaLabelledby,
      onFocus: _cache[0] || (_cache[0] = (...args) => ($options.onListFocus && $options.onListFocus(...args))),
      onBlur: _cache[1] || (_cache[1] = (...args) => ($options.onListBlur && $options.onListBlur(...args))),
      onKeydown: _cache[2] || (_cache[2] = (...args) => ($options.onListKeyDown && $options.onListKeyDown(...args))),
      onMouseleave: _cache[3] || (_cache[3] = (...args) => ($options.onListMouseLeave && $options.onListMouseLeave(...args)))
    }, _ctx.ptm('menu')), [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.model, (processedItem, index) => {
        return (openBlock(), createElementBlock("li", mergeProps({
          key: index,
          id: $options.getItemId(index),
          class: $options.itemClass(processedItem, index, $options.getItemId(index)),
          role: "menuitem",
          "aria-label": processedItem.label,
          "aria-disabled": $options.disabled(processedItem),
          onClick: $event => ($options.onItemClick($event, processedItem)),
          onMouseenter: $event => ($options.onItemMouseEnter(index))
        }, $options.getPTOptions($options.getItemId(index), 'menuitem')), [
          createElementVNode("div", mergeProps({ class: "p-menuitem-content" }, $options.getPTOptions($options.getItemId(index), 'content')), [
            (!$props.templates['item'])
              ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  (processedItem.to && !$options.disabled(processedItem))
                    ? (openBlock(), createBlock(_component_router_link, {
                        key: 0,
                        to: processedItem.to,
                        custom: ""
                      }, {
                        default: withCtx(({ navigate, href, isActive, isExactActive }) => [
                          withDirectives((openBlock(), createElementBlock("a", mergeProps({
                            href: href,
                            class: $options.linkClass({ isActive, isExactActive }),
                            target: processedItem.target,
                            tabindex: "-1",
                            "aria-hidden": "true",
                            onClick: $event => ($options.onItemActionClick($event, processedItem, navigate))
                          }, $options.getPTOptions($options.getItemId(index), 'action')), [
                            (!$props.templates['icon'])
                              ? withDirectives((openBlock(), createElementBlock("span", mergeProps({
                                  key: 0,
                                  class: ['p-dock-icon', processedItem.icon]
                                }, $options.getPTOptions($options.getItemId(index), 'icon')), null, 16)), [
                                  [_directive_ripple]
                                ])
                              : (openBlock(), createBlock(resolveDynamicComponent($props.templates['icon']), {
                                  key: 1,
                                  item: processedItem
                                }, null, 8, ["item"]))
                          ], 16, _hoisted_3)), [
                            [_directive_tooltip, { value: processedItem.label, disabled: !$props.tooltipOptions }, $props.tooltipOptions]
                          ])
                        ]),
                        _: 2
                      }, 1032, ["to"]))
                    : withDirectives((openBlock(), createElementBlock("a", mergeProps({
                        key: 1,
                        href: processedItem.url,
                        class: $options.linkClass(),
                        target: processedItem.target,
                        tabindex: "-1",
                        "aria-hidden": "true"
                      }, $options.getPTOptions($options.getItemId(index), 'action')), [
                        (!$props.templates['icon'])
                          ? withDirectives((openBlock(), createElementBlock("span", mergeProps({
                              key: 0,
                              class: ['p-dock-icon', processedItem.icon]
                            }, $options.getPTOptions($options.getItemId(index), 'icon')), null, 16)), [
                              [_directive_ripple]
                            ])
                          : (openBlock(), createBlock(resolveDynamicComponent($props.templates['icon']), {
                              key: 1,
                              item: processedItem
                            }, null, 8, ["item"]))
                      ], 16, _hoisted_4)), [
                        [_directive_tooltip, { value: processedItem.label, disabled: !$props.tooltipOptions }, $props.tooltipOptions]
                      ])
                ], 64))
              : (openBlock(), createBlock(resolveDynamicComponent($props.templates['item']), {
                  key: 1,
                  item: processedItem,
                  index: index
                }, null, 8, ["item", "index"]))
          ], 16)
        ], 16, _hoisted_2))
      }), 128))
    ], 16, _hoisted_1)
  ], 16))
}

script$1.render = render$1;

var script = {
    name: 'Dock',
    extends: BaseComponent,
    props: {
        position: {
            type: String,
            default: 'bottom'
        },
        model: null,
        class: null,
        style: null,
        tooltipOptions: null,
        exact: {
            type: Boolean,
            default: true
        },
        menuId: {
            type: String,
            default: null
        },
        tabindex: {
            type: Number,
            default: 0
        },
        'aria-label': {
            type: String,
            default: null
        },
        'aria-labelledby': {
            type: String,
            default: null
        }
    },
    computed: {
        containerClass() {
            return ['p-dock p-component', `p-dock-${this.position}`, this.class];
        }
    },
    components: {
        DockSub: script$1
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DockSub = resolveComponent("DockSub");

  return (openBlock(), createElementBlock("div", mergeProps({
    class: $options.containerClass,
    style: $props.style
  }, _ctx.ptm('root')), [
    createVNode(_component_DockSub, {
      model: $props.model,
      templates: _ctx.$slots,
      exact: $props.exact,
      tooltipOptions: $props.tooltipOptions,
      position: $props.position,
      menuId: $props.menuId,
      "aria-label": _ctx.ariaLabel,
      "aria-labelledby": _ctx.ariaLabelledby,
      tabindex: $props.tabindex,
      pt: _ctx.pt
    }, null, 8, ["model", "templates", "exact", "tooltipOptions", "position", "menuId", "aria-label", "aria-labelledby", "tabindex", "pt"])
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

var css_248z = "\n.p-dock {\n    position: absolute;\n    z-index: 1;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    pointer-events: none;\n}\n.p-dock-list-container {\n    display: flex;\n    pointer-events: auto;\n}\n.p-dock-list {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n.p-dock-item {\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n    will-change: transform;\n}\n.p-dock-link {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    position: relative;\n    overflow: hidden;\n    cursor: default;\n}\n.p-dock-item-second-prev,\n.p-dock-item-second-next {\n    transform: scale(1.2);\n}\n.p-dock-item-prev,\n.p-dock-item-next {\n    transform: scale(1.4);\n}\n.p-dock-item-current {\n    transform: scale(1.6);\n    z-index: 1;\n}\n\n/* Position */\n/* top */\n.p-dock-top {\n    left: 0;\n    top: 0;\n    width: 100%;\n}\n.p-dock-top .p-dock-item {\n    transform-origin: center top;\n}\n\n/* bottom */\n.p-dock-bottom {\n    left: 0;\n    bottom: 0;\n    width: 100%;\n}\n.p-dock-bottom .p-dock-item {\n    transform-origin: center bottom;\n}\n\n/* right */\n.p-dock-right {\n    right: 0;\n    top: 0;\n    height: 100%;\n}\n.p-dock-right .p-dock-item {\n    transform-origin: center right;\n}\n.p-dock-right .p-dock-list {\n    flex-direction: column;\n}\n\n/* left */\n.p-dock-left {\n    left: 0;\n    top: 0;\n    height: 100%;\n}\n.p-dock-left .p-dock-item {\n    transform-origin: center left;\n}\n.p-dock-left .p-dock-list {\n    flex-direction: column;\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
