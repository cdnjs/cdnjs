import BaseComponent from 'primevue/basecomponent';
import ChevronDownIcon from 'primevue/icons/chevrondown';
import ChevronRightIcon from 'primevue/icons/chevronright';
import { ObjectUtils, DomHandler, UniqueComponentId } from 'primevue/utils';
import Ripple from 'primevue/ripple';
import { resolveComponent, resolveDirective, openBlock, createElementBlock, mergeProps, Fragment, renderList, createElementVNode, createBlock, withCtx, withDirectives, resolveDynamicComponent, normalizeClass, createCommentVNode, toDisplayString, createVNode, Transition, vShow, renderSlot } from 'vue';

var script$2 = {
    name: 'PanelMenuSub',
    extends: BaseComponent,
    emits: ['item-toggle'],
    props: {
        panelId: {
            type: String,
            default: null
        },
        focusedItemId: {
            type: String,
            default: null
        },
        items: {
            type: Array,
            default: null
        },
        level: {
            type: Number,
            default: 0
        },
        templates: {
            type: Object,
            default: null
        },
        activeItemPath: {
            type: Object,
            default: null
        },
        exact: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        getItemId(processedItem) {
            return `${this.panelId}_${processedItem.key}`;
        },
        getItemKey(processedItem) {
            return this.getItemId(processedItem);
        },
        getItemProp(processedItem, name, params) {
            return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
        },
        getItemLabel(processedItem) {
            return this.getItemProp(processedItem, 'label');
        },
        getPTOptions(processedItem, key) {
            return this.ptm(key, {
                context: {
                    active: this.isItemActive(processedItem),
                    focused: this.isItemFocused(processedItem)
                }
            });
        },
        isItemActive(processedItem) {
            return this.activeItemPath.some((path) => path.key === processedItem.key);
        },
        isItemVisible(processedItem) {
            return this.getItemProp(processedItem, 'visible') !== false;
        },
        isItemDisabled(processedItem) {
            return this.getItemProp(processedItem, 'disabled');
        },
        isItemFocused(processedItem) {
            return this.focusedItemId === this.getItemId(processedItem);
        },
        isItemGroup(processedItem) {
            return ObjectUtils.isNotEmpty(processedItem.items);
        },
        onItemClick(event, processedItem) {
            this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
            this.$emit('item-toggle', { processedItem, expanded: !this.isItemActive(processedItem) });
        },
        onItemToggle(event) {
            this.$emit('item-toggle', event);
        },
        onItemActionClick(event, navigate) {
            navigate && navigate(event);
        },
        getAriaSetSize() {
            return this.items.filter((processedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator')).length;
        },
        getAriaPosInset(index) {
            return index - this.items.slice(0, index).filter((processedItem) => this.isItemVisible(processedItem) && this.getItemProp(processedItem, 'separator')).length + 1;
        },
        getItemClass(processedItem) {
            return [
                'p-menuitem',
                this.getItemProp(processedItem, 'class'),
                {
                    'p-focus': this.isItemFocused(processedItem),
                    'p-disabled': this.isItemDisabled(processedItem)
                }
            ];
        },
        getItemActionClass(processedItem, routerProps) {
            return [
                'p-menuitem-link',
                {
                    'router-link-active': routerProps && routerProps.isActive,
                    'router-link-active-exact': this.exact && routerProps && routerProps.isExactActive
                }
            ];
        },
        getItemIconClass(processedItem) {
            return ['p-menuitem-icon', this.getItemProp(processedItem, 'icon')];
        },
        getSeparatorItemClass(processedItem) {
            return ['p-menuitem-separator', this.getItemProp(processedItem, 'class')];
        }
    },
    components: {
        ChevronRightIcon: ChevronRightIcon,
        ChevronDownIcon: ChevronDownIcon
    },
    directives: {
        ripple: Ripple
    }
};

const _hoisted_1$1 = ["id", "aria-label", "aria-expanded", "aria-level", "aria-setsize", "aria-posinset"];
const _hoisted_2$1 = ["onClick"];
const _hoisted_3$1 = ["href", "onClick"];
const _hoisted_4$1 = ["href", "target"];

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _component_PanelMenuSub = resolveComponent("PanelMenuSub", true);
  const _directive_ripple = resolveDirective("ripple");

  return (openBlock(), createElementBlock("ul", mergeProps({ class: "p-submenu-list" }, _ctx.ptm('menu')), [
    (openBlock(true), createElementBlock(Fragment, null, renderList($props.items, (processedItem, index) => {
      return (openBlock(), createElementBlock(Fragment, {
        key: $options.getItemKey(processedItem)
      }, [
        ($options.isItemVisible(processedItem) && !$options.getItemProp(processedItem, 'separator'))
          ? (openBlock(), createElementBlock("li", mergeProps({
              key: 0,
              id: $options.getItemId(processedItem),
              style: $options.getItemProp(processedItem, 'style'),
              class: $options.getItemClass(processedItem),
              role: "treeitem",
              "aria-label": $options.getItemLabel(processedItem),
              "aria-expanded": $options.isItemGroup(processedItem) ? $options.isItemActive(processedItem) : undefined,
              "aria-level": $props.level + 1,
              "aria-setsize": $options.getAriaSetSize(),
              "aria-posinset": $options.getAriaPosInset(index)
            }, $options.getPTOptions(processedItem, 'menuitem')), [
              createElementVNode("div", mergeProps({
                class: "p-menuitem-content",
                onClick: $event => ($options.onItemClick($event, processedItem))
              }, $options.getPTOptions(processedItem, 'content')), [
                (!$props.templates.item)
                  ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                      ($options.getItemProp(processedItem, 'to') && !$options.isItemDisabled(processedItem))
                        ? (openBlock(), createBlock(_component_router_link, {
                            key: 0,
                            to: $options.getItemProp(processedItem, 'to'),
                            custom: ""
                          }, {
                            default: withCtx(({ navigate, href, isActive, isExactActive }) => [
                              withDirectives((openBlock(), createElementBlock("a", mergeProps({
                                href: href,
                                class: $options.getItemActionClass(processedItem, { isActive, isExactActive }),
                                tabindex: "-1",
                                "aria-hidden": "true",
                                onClick: $event => ($options.onItemActionClick($event, navigate))
                              }, $options.getPTOptions(processedItem, 'action')), [
                                ($props.templates.itemicon)
                                  ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.itemicon), {
                                      key: 0,
                                      item: processedItem.item,
                                      class: normalizeClass($options.getItemIconClass(processedItem))
                                    }, null, 8, ["item", "class"]))
                                  : ($options.getItemProp(processedItem, 'icon'))
                                    ? (openBlock(), createElementBlock("span", mergeProps({
                                        key: 1,
                                        class: $options.getItemIconClass(processedItem)
                                      }, $options.getPTOptions(processedItem, 'icon')), null, 16))
                                    : createCommentVNode("", true),
                                createElementVNode("span", mergeProps({ class: "p-menuitem-text" }, $options.getPTOptions(processedItem, 'label')), toDisplayString($options.getItemLabel(processedItem)), 17)
                              ], 16, _hoisted_3$1)), [
                                [_directive_ripple]
                              ])
                            ]),
                            _: 2
                          }, 1032, ["to"]))
                        : withDirectives((openBlock(), createElementBlock("a", mergeProps({
                            key: 1,
                            href: $options.getItemProp(processedItem, 'url'),
                            class: $options.getItemActionClass(processedItem),
                            target: $options.getItemProp(processedItem, 'target'),
                            tabindex: "-1",
                            "aria-hidden": "true"
                          }, $options.getPTOptions(processedItem, 'action')), [
                            ($options.isItemGroup(processedItem))
                              ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                  ($props.templates.submenuicon)
                                    ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.submenuicon), mergeProps({
                                        key: 0,
                                        class: "p-submenu-icon",
                                        active: $options.isItemActive(processedItem)
                                      }, $options.getPTOptions(processedItem, 'submenuIcon')), null, 16, ["active"]))
                                    : (openBlock(), createBlock(resolveDynamicComponent($options.isItemActive(processedItem) ? 'ChevronDownIcon' : 'ChevronRightIcon'), mergeProps({
                                        key: 1,
                                        class: "p-submenu-icon"
                                      }, $options.getPTOptions(processedItem, 'submenuIcon')), null, 16))
                                ], 64))
                              : createCommentVNode("", true),
                            ($props.templates.itemicon)
                              ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.itemicon), {
                                  key: 1,
                                  item: processedItem.item,
                                  class: normalizeClass($options.getItemIconClass(processedItem))
                                }, null, 8, ["item", "class"]))
                              : ($options.getItemProp(processedItem, 'icon'))
                                ? (openBlock(), createElementBlock("span", mergeProps({
                                    key: 2,
                                    class: $options.getItemIconClass(processedItem)
                                  }, $options.getPTOptions(processedItem, 'icon')), null, 16))
                                : createCommentVNode("", true),
                            createElementVNode("span", mergeProps({ class: "p-menuitem-text" }, $options.getPTOptions(processedItem, 'label')), toDisplayString($options.getItemLabel(processedItem)), 17)
                          ], 16, _hoisted_4$1)), [
                            [_directive_ripple]
                          ])
                    ], 64))
                  : (openBlock(), createBlock(resolveDynamicComponent($props.templates.item), {
                      key: 1,
                      item: processedItem.item
                    }, null, 8, ["item"]))
              ], 16, _hoisted_2$1),
              createVNode(Transition, { name: "p-toggleable-content" }, {
                default: withCtx(() => [
                  withDirectives(createElementVNode("div", mergeProps({ class: "p-toggleable-content" }, _ctx.ptm('toggleableContent')), [
                    ($options.isItemVisible(processedItem) && $options.isItemGroup(processedItem))
                      ? (openBlock(), createBlock(_component_PanelMenuSub, {
                          key: 0,
                          id: $options.getItemId(processedItem) + '_list',
                          role: "group",
                          panelId: $props.panelId,
                          focusedItemId: $props.focusedItemId,
                          items: processedItem.items,
                          level: $props.level + 1,
                          templates: $props.templates,
                          activeItemPath: $props.activeItemPath,
                          exact: $props.exact,
                          onItemToggle: $options.onItemToggle,
                          pt: _ctx.pt
                        }, null, 8, ["id", "panelId", "focusedItemId", "items", "level", "templates", "activeItemPath", "exact", "onItemToggle", "pt"]))
                      : createCommentVNode("", true)
                  ], 16), [
                    [vShow, $options.isItemActive(processedItem)]
                  ])
                ]),
                _: 2
              }, 1024)
            ], 16, _hoisted_1$1))
          : createCommentVNode("", true),
        ($options.isItemVisible(processedItem) && $options.getItemProp(processedItem, 'separator'))
          ? (openBlock(), createElementBlock("li", mergeProps({
              key: 1,
              style: $options.getItemProp(processedItem, 'style'),
              class: $options.getSeparatorItemClass(processedItem),
              role: "separator"
            }, _ctx.ptm('separator')), null, 16))
          : createCommentVNode("", true)
      ], 64))
    }), 128))
  ], 16))
}

script$2.render = render$2;

var script$1 = {
    name: 'PanelMenuList',
    extends: BaseComponent,
    emits: ['item-toggle', 'header-focus'],
    props: {
        panelId: {
            type: String,
            default: null
        },
        items: {
            type: Array,
            default: null
        },
        templates: {
            type: Object,
            default: null
        },
        expandedKeys: {
            type: Object,
            default: null
        },
        exact: {
            type: Boolean,
            default: true
        }
    },
    searchTimeout: null,
    searchValue: null,
    data() {
        return {
            focused: false,
            focusedItem: null,
            activeItemPath: []
        };
    },
    watch: {
        expandedKeys(newValue) {
            this.autoUpdateActiveItemPath(newValue);
        }
    },
    mounted() {
        this.autoUpdateActiveItemPath(this.expandedKeys);
    },
    methods: {
        getItemProp(processedItem, name) {
            return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name]) : undefined;
        },
        getItemLabel(processedItem) {
            return this.getItemProp(processedItem, 'label');
        },
        isItemVisible(processedItem) {
            return this.getItemProp(processedItem, 'visible') !== false;
        },
        isItemDisabled(processedItem) {
            return this.getItemProp(processedItem, 'disabled');
        },
        isItemActive(processedItem) {
            return this.activeItemPath.some((path) => path.key === processedItem.parentKey);
        },
        isItemGroup(processedItem) {
            return ObjectUtils.isNotEmpty(processedItem.items);
        },
        onFocus(event) {
            this.focused = true;
            this.focusedItem = this.focusedItem || (this.isElementInPanel(event, event.relatedTarget) ? this.findFirstItem() : this.findLastItem());
        },
        onBlur() {
            this.focused = false;
            this.focusedItem = null;
            this.searchValue = '';
        },
        onKeyDown(event) {
            const metaKey = event.metaKey || event.ctrlKey;

            switch (event.code) {
                case 'ArrowDown':
                    this.onArrowDownKey(event);
                    break;

                case 'ArrowUp':
                    this.onArrowUpKey(event);
                    break;

                case 'ArrowLeft':
                    this.onArrowLeftKey(event);
                    break;

                case 'ArrowRight':
                    this.onArrowRightKey(event);
                    break;

                case 'Home':
                    this.onHomeKey(event);
                    break;

                case 'End':
                    this.onEndKey(event);
                    break;

                case 'Space':
                    this.onSpaceKey(event);
                    break;

                case 'Enter':
                    this.onEnterKey(event);
                    break;

                case 'Escape':
                case 'Tab':
                case 'PageDown':
                case 'PageUp':
                case 'Backspace':
                case 'ShiftLeft':
                case 'ShiftRight':
                    //NOOP
                    break;

                default:
                    if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
                        this.searchItems(event, event.key);
                    }

                    break;
            }
        },
        onArrowDownKey(event) {
            const processedItem = ObjectUtils.isNotEmpty(this.focusedItem) ? this.findNextItem(this.focusedItem) : this.findFirstItem();

            this.changeFocusedItem({ originalEvent: event, processedItem, focusOnNext: true });
            event.preventDefault();
        },
        onArrowUpKey(event) {
            const processedItem = ObjectUtils.isNotEmpty(this.focusedItem) ? this.findPrevItem(this.focusedItem) : this.findLastItem();

            this.changeFocusedItem({ originalEvent: event, processedItem, selfCheck: true });
            event.preventDefault();
        },
        onArrowLeftKey(event) {
            if (ObjectUtils.isNotEmpty(this.focusedItem)) {
                const matched = this.activeItemPath.some((p) => p.key === this.focusedItem.key);

                if (matched) {
                    this.activeItemPath = this.activeItemPath.filter((p) => p.key !== this.focusedItem.key);
                } else {
                    this.focusedItem = ObjectUtils.isNotEmpty(this.focusedItem.parent) ? this.focusedItem.parent : this.focusedItem;
                }

                event.preventDefault();
            }
        },
        onArrowRightKey(event) {
            if (ObjectUtils.isNotEmpty(this.focusedItem)) {
                const grouped = this.isItemGroup(this.focusedItem);

                if (grouped) {
                    const matched = this.activeItemPath.some((p) => p.key === this.focusedItem.key);

                    if (matched) {
                        this.onArrowDownKey(event);
                    } else {
                        this.activeItemPath = this.activeItemPath.filter((p) => p.parentKey !== this.focusedItem.parentKey);
                        this.activeItemPath.push(this.focusedItem);
                    }
                }

                event.preventDefault();
            }
        },
        onHomeKey(event) {
            this.changeFocusedItem({ originalEvent: event, processedItem: this.findFirstItem(), allowHeaderFocus: false });
            event.preventDefault();
        },
        onEndKey(event) {
            this.changeFocusedItem({ originalEvent: event, processedItem: this.findLastItem(), focusOnNext: true, allowHeaderFocus: false });
            event.preventDefault();
        },
        onEnterKey(event) {
            if (ObjectUtils.isNotEmpty(this.focusedItem)) {
                const element = DomHandler.findSingle(this.$el, `li[id="${`${this.focusedItemId}`}"]`);
                const anchorElement = element && (DomHandler.findSingle(element, '.p-menuitem-link') || DomHandler.findSingle(element, 'a,button'));

                anchorElement ? anchorElement.click() : element && element.click();
            }

            event.preventDefault();
        },
        onSpaceKey(event) {
            this.onEnterKey(event);
        },
        onItemToggle(event) {
            const { processedItem, expanded } = event;

            if (this.expandedKeys) {
                this.$emit('item-toggle', { item: processedItem.item, expanded });
            } else {
                this.activeItemPath = this.activeItemPath.filter((p) => p.parentKey !== processedItem.parentKey);
                expanded && this.activeItemPath.push(processedItem);
            }

            this.focusedItem = processedItem;
            DomHandler.focus(this.$el);
        },
        isElementInPanel(event, element) {
            const panel = event.currentTarget.closest('.p-panelmenu-panel');

            return panel && panel.contains(element);
        },
        isItemMatched(processedItem) {
            return this.isValidItem(processedItem) && this.getItemLabel(processedItem).toLocaleLowerCase(this.searchLocale).startsWith(this.searchValue.toLocaleLowerCase(this.searchLocale));
        },
        isVisibleItem(processedItem) {
            return !!processedItem && (processedItem.level === 0 || this.isItemActive(processedItem)) && this.isItemVisible(processedItem);
        },
        isValidItem(processedItem) {
            return !!processedItem && !this.isItemDisabled(processedItem);
        },
        findFirstItem() {
            return this.visibleItems.find((processedItem) => this.isValidItem(processedItem));
        },
        findLastItem() {
            return ObjectUtils.findLast(this.visibleItems, (processedItem) => this.isValidItem(processedItem));
        },
        findNextItem(processedItem) {
            const index = this.visibleItems.findIndex((item) => item.key === processedItem.key);
            const matchedItem = index < this.visibleItems.length - 1 ? this.visibleItems.slice(index + 1).find((pItem) => this.isValidItem(pItem)) : undefined;

            return matchedItem || processedItem;
        },
        findPrevItem(processedItem) {
            const index = this.visibleItems.findIndex((item) => item.key === processedItem.key);
            const matchedItem = index > 0 ? ObjectUtils.findLast(this.visibleItems.slice(0, index), (pItem) => this.isValidItem(pItem)) : undefined;

            return matchedItem || processedItem;
        },
        searchItems(event, char) {
            this.searchValue = (this.searchValue || '') + char;

            let matchedItem = null;
            let matched = false;

            if (ObjectUtils.isNotEmpty(this.focusedItem)) {
                const focusedItemIndex = this.visibleItems.findIndex((processedItem) => processedItem.key === this.focusedItem.key);

                matchedItem = this.visibleItems.slice(focusedItemIndex).find((processedItem) => this.isItemMatched(processedItem));
                matchedItem = ObjectUtils.isEmpty(matchedItem) ? this.visibleItems.slice(0, focusedItemIndex).find((processedItem) => this.isItemMatched(processedItem)) : matchedItem;
            } else {
                matchedItem = this.visibleItems.find((processedItem) => this.isItemMatched(processedItem));
            }

            if (ObjectUtils.isNotEmpty(matchedItem)) {
                matched = true;
            }

            if (ObjectUtils.isEmpty(matchedItem) && ObjectUtils.isEmpty(this.focusedItem)) {
                matchedItem = this.findFirstItem();
            }

            if (ObjectUtils.isNotEmpty(matchedItem)) {
                this.changeFocusedItem({
                    originalEvent: event,
                    processedItem: matchedItem,
                    allowHeaderFocus: false
                });
            }

            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }

            this.searchTimeout = setTimeout(() => {
                this.searchValue = '';
                this.searchTimeout = null;
            }, 500);

            return matched;
        },
        changeFocusedItem(event) {
            const { originalEvent, processedItem, focusOnNext, selfCheck, allowHeaderFocus = true } = event;

            if (ObjectUtils.isNotEmpty(this.focusedItem) && this.focusedItem.key !== processedItem.key) {
                this.focusedItem = processedItem;
                this.scrollInView();
            } else if (allowHeaderFocus) {
                this.$emit('header-focus', { originalEvent, focusOnNext, selfCheck });
            }
        },
        scrollInView() {
            const element = DomHandler.findSingle(this.$el, `li[id="${`${this.focusedItemId}`}"]`);

            if (element) {
                element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'start' });
            }
        },
        autoUpdateActiveItemPath(expandedKeys) {
            this.activeItemPath = Object.entries(expandedKeys || {}).reduce((acc, [key, val]) => {
                if (val) {
                    const processedItem = this.findProcessedItemByItemKey(key);

                    processedItem && acc.push(processedItem);
                }

                return acc;
            }, []);
        },
        findProcessedItemByItemKey(key, processedItems, level = 0) {
            processedItems = processedItems || (level === 0 && this.processedItems);

            if (!processedItems) return null;

            for (let i = 0; i < processedItems.length; i++) {
                const processedItem = processedItems[i];

                if (this.getItemProp(processedItem, 'key') === key) return processedItem;

                const matchedItem = this.findProcessedItemByItemKey(key, processedItem.items, level + 1);

                if (matchedItem) return matchedItem;
            }
        },
        createProcessedItems(items, level = 0, parent = {}, parentKey = '') {
            const processedItems = [];

            items &&
                items.forEach((item, index) => {
                    const key = (parentKey !== '' ? parentKey + '_' : '') + index;
                    const newItem = {
                        item,
                        index,
                        level,
                        key,
                        parent,
                        parentKey
                    };

                    newItem['items'] = this.createProcessedItems(item.items, level + 1, newItem, key);
                    processedItems.push(newItem);
                });

            return processedItems;
        },
        flatItems(processedItems, processedFlattenItems = []) {
            processedItems &&
                processedItems.forEach((processedItem) => {
                    if (this.isVisibleItem(processedItem)) {
                        processedFlattenItems.push(processedItem);
                        this.flatItems(processedItem.items, processedFlattenItems);
                    }
                });

            return processedFlattenItems;
        }
    },
    computed: {
        processedItems() {
            return this.createProcessedItems(this.items || []);
        },
        visibleItems() {
            return this.flatItems(this.processedItems);
        },
        focusedItemId() {
            return ObjectUtils.isNotEmpty(this.focusedItem) ? `${this.panelId}_${this.focusedItem.key}` : null;
        }
    },
    components: {
        PanelMenuSub: script$2
    }
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_PanelMenuSub = resolveComponent("PanelMenuSub");

  return (openBlock(), createBlock(_component_PanelMenuSub, {
    id: $props.panelId + '_list',
    class: "p-panelmenu-root-list",
    role: "tree",
    tabindex: -1,
    "aria-activedescendant": $data.focused ? $options.focusedItemId : undefined,
    panelId: $props.panelId,
    focusedItemId: $data.focused ? $options.focusedItemId : undefined,
    items: $options.processedItems,
    templates: $props.templates,
    activeItemPath: $data.activeItemPath,
    exact: $props.exact,
    onFocus: $options.onFocus,
    onBlur: $options.onBlur,
    onKeydown: $options.onKeyDown,
    onItemToggle: $options.onItemToggle,
    pt: _ctx.pt
  }, null, 8, ["id", "aria-activedescendant", "panelId", "focusedItemId", "items", "templates", "activeItemPath", "exact", "onFocus", "onBlur", "onKeydown", "onItemToggle", "pt"]))
}

script$1.render = render$1;

var script = {
    name: 'PanelMenu',
    extends: BaseComponent,
    emits: ['update:expandedKeys', 'panel-open', 'panel-close'],
    props: {
        model: {
            type: Array,
            default: null
        },
        expandedKeys: {
            type: Object,
            default: null
        },
        exact: {
            type: Boolean,
            default: true
        },
        tabindex: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            id: this.$attrs.id,
            activeItem: null
        };
    },
    watch: {
        '$attrs.id': function (newValue) {
            this.id = newValue || UniqueComponentId();
        }
    },
    mounted() {
        this.id = this.id || UniqueComponentId();
    },
    methods: {
        getItemProp(item, name) {
            return item ? ObjectUtils.getItemValue(item[name]) : undefined;
        },
        getItemLabel(item) {
            return this.getItemProp(item, 'label');
        },
        getPTOptions(item, key) {
            return this.ptm(key, {
                options: {
                    active: this.isItemActive(item),
                    focused: this.isItemFocused(item)
                }
            });
        },
        isItemActive(item) {
            return this.expandedKeys ? this.expandedKeys[this.getItemProp(item, 'key')] : ObjectUtils.equals(item, this.activeItem);
        },
        isItemVisible(item) {
            return this.getItemProp(item, 'visible') !== false;
        },
        isItemDisabled(item) {
            return this.getItemProp(item, 'disabled');
        },
        isItemFocused(item) {
            return ObjectUtils.equals(item, this.activeItem);
        },
        getPanelId(index) {
            return `${this.id}_${index}`;
        },
        getPanelKey(index) {
            return this.getPanelId(index);
        },
        getHeaderId(index) {
            return `${this.getPanelId(index)}_header`;
        },
        getContentId(index) {
            return `${this.getPanelId(index)}_content`;
        },
        onHeaderClick(event, item) {
            if (this.isItemDisabled(item)) {
                event.preventDefault();

                return;
            }

            if (item.command) {
                item.command({ originalEvent: event, item });
            }

            this.changeActiveItem(event, item);
            DomHandler.focus(event.currentTarget);
        },
        onHeaderKeyDown(event, item) {
            switch (event.code) {
                case 'ArrowDown':
                    this.onHeaderArrowDownKey(event);
                    break;

                case 'ArrowUp':
                    this.onHeaderArrowUpKey(event);
                    break;

                case 'Home':
                    this.onHeaderHomeKey(event);
                    break;

                case 'End':
                    this.onHeaderEndKey(event);
                    break;

                case 'Enter':
                case 'Space':
                    this.onHeaderEnterKey(event, item);
                    break;
            }
        },
        onHeaderArrowDownKey(event) {
            const rootList = DomHandler.hasClass(event.currentTarget, 'p-highlight') ? DomHandler.findSingle(event.currentTarget.nextElementSibling, '.p-panelmenu-root-list') : null;

            rootList ? DomHandler.focus(rootList) : this.updateFocusedHeader({ originalEvent: event, focusOnNext: true });
            event.preventDefault();
        },
        onHeaderArrowUpKey(event) {
            const prevHeader = this.findPrevHeader(event.currentTarget.parentElement) || this.findLastHeader();
            const rootList = DomHandler.hasClass(prevHeader, 'p-highlight') ? DomHandler.findSingle(prevHeader.nextElementSibling, '.p-panelmenu-root-list') : null;

            rootList ? DomHandler.focus(rootList) : this.updateFocusedHeader({ originalEvent: event, focusOnNext: false });
            event.preventDefault();
        },
        onHeaderHomeKey(event) {
            this.changeFocusedHeader(event, this.findFirstHeader());
            event.preventDefault();
        },
        onHeaderEndKey(event) {
            this.changeFocusedHeader(event, this.findLastHeader());
            event.preventDefault();
        },
        onHeaderEnterKey(event, item) {
            const headerAction = DomHandler.findSingle(event.currentTarget, '.p-panelmenu-header-action');

            headerAction ? headerAction.click() : this.onHeaderClick(event, item);
            event.preventDefault();
        },
        onHeaderActionClick(event, navigate) {
            navigate && navigate(event);
        },
        findNextHeader(panelElement, selfCheck = false) {
            const nextPanelElement = selfCheck ? panelElement : panelElement.nextElementSibling;
            const headerElement = DomHandler.findSingle(nextPanelElement, '.p-panelmenu-header');

            return headerElement ? (DomHandler.hasClass(headerElement, 'p-disabled') ? this.findNextHeader(headerElement.parentElement) : headerElement) : null;
        },
        findPrevHeader(panelElement, selfCheck = false) {
            const prevPanelElement = selfCheck ? panelElement : panelElement.previousElementSibling;
            const headerElement = DomHandler.findSingle(prevPanelElement, '.p-panelmenu-header');

            return headerElement ? (DomHandler.hasClass(headerElement, 'p-disabled') ? this.findPrevHeader(headerElement.parentElement) : headerElement) : null;
        },
        findFirstHeader() {
            return this.findNextHeader(this.$el.firstElementChild, true);
        },
        findLastHeader() {
            return this.findPrevHeader(this.$el.lastElementChild, true);
        },
        updateFocusedHeader(event) {
            const { originalEvent, focusOnNext, selfCheck } = event;
            const panelElement = originalEvent.currentTarget.closest('.p-panelmenu-panel');
            const header = selfCheck ? DomHandler.findSingle(panelElement, '.p-panelmenu-header') : focusOnNext ? this.findNextHeader(panelElement) : this.findPrevHeader(panelElement);

            header ? this.changeFocusedHeader(originalEvent, header) : focusOnNext ? this.onHeaderHomeKey(originalEvent) : this.onHeaderEndKey(originalEvent);
        },
        changeActiveItem(event, item, selfActive = false) {
            if (!this.isItemDisabled(item)) {
                const active = this.isItemActive(item);
                const eventName = !active ? 'panel-open' : 'panel-close';

                this.activeItem = selfActive ? item : this.activeItem && ObjectUtils.equals(item, this.activeItem) ? null : item;
                this.changeExpandedKeys({ item, expanded: !active });
                this.$emit(eventName, { originalEvent: event, item });
            }
        },
        changeExpandedKeys({ item, expanded = false }) {
            if (this.expandedKeys) {
                let _keys = { ...this.expandedKeys };

                if (expanded) _keys[item.key] = true;
                else delete _keys[item.key];

                this.$emit('update:expandedKeys', _keys);
            }
        },
        changeFocusedHeader(event, element) {
            element && DomHandler.focus(element);
        },
        getPanelClass(item) {
            return ['p-panelmenu-panel', this.getItemProp(item, 'class')];
        },
        getHeaderClass(item) {
            return [
                'p-panelmenu-header',
                this.getItemProp(item, 'headerClass'),
                {
                    'p-highlight': this.isItemActive(item),
                    'p-disabled': this.isItemDisabled(item)
                }
            ];
        },
        getHeaderActionClass(item, routerProps) {
            return [
                'p-panelmenu-header-action',
                {
                    'router-link-active': routerProps && routerProps.isActive,
                    'router-link-active-exact': this.exact && routerProps && routerProps.isExactActive
                }
            ];
        },
        getHeaderIconClass(item) {
            return ['p-menuitem-icon', this.getItemProp(item, 'icon')];
        }
    },
    components: {
        PanelMenuList: script$1,
        ChevronRightIcon: ChevronRightIcon,
        ChevronDownIcon: ChevronDownIcon
    }
};

const _hoisted_1 = ["id"];
const _hoisted_2 = ["id", "tabindex", "aria-label", "aria-expanded", "aria-controls", "aria-disabled", "onClick", "onKeydown"];
const _hoisted_3 = ["href", "onClick"];
const _hoisted_4 = ["href"];
const _hoisted_5 = ["id", "aria-labelledby"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _component_PanelMenuList = resolveComponent("PanelMenuList");

  return (openBlock(), createElementBlock("div", mergeProps({
    id: $data.id,
    class: "p-panelmenu p-component"
  }, _ctx.ptm('root')), [
    (openBlock(true), createElementBlock(Fragment, null, renderList($props.model, (item, index) => {
      return (openBlock(), createElementBlock(Fragment, {
        key: $options.getPanelKey(index)
      }, [
        ($options.isItemVisible(item))
          ? (openBlock(), createElementBlock("div", mergeProps({
              key: 0,
              style: $options.getItemProp(item, 'style'),
              class: $options.getPanelClass(item)
            }, _ctx.ptm('panel')), [
              createElementVNode("div", mergeProps({
                id: $options.getHeaderId(index),
                class: $options.getHeaderClass(item),
                tabindex: $options.isItemDisabled(item) ? -1 : $props.tabindex,
                role: "button",
                "aria-label": $options.getItemLabel(item),
                "aria-expanded": $options.isItemActive(item),
                "aria-controls": $options.getContentId(index),
                "aria-disabled": $options.isItemDisabled(item),
                onClick: $event => ($options.onHeaderClick($event, item)),
                onKeydown: $event => ($options.onHeaderKeyDown($event, item))
              }, $options.getPTOptions(item, 'header')), [
                createElementVNode("div", mergeProps({ class: "p-panelmenu-header-content" }, $options.getPTOptions(item, 'headerContent')), [
                  (!_ctx.$slots.item)
                    ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                        ($options.getItemProp(item, 'to') && !$options.isItemDisabled(item))
                          ? (openBlock(), createBlock(_component_router_link, {
                              key: 0,
                              to: $options.getItemProp(item, 'to'),
                              custom: ""
                            }, {
                              default: withCtx(({ navigate, href, isActive, isExactActive }) => [
                                createElementVNode("a", mergeProps({
                                  href: href,
                                  class: $options.getHeaderActionClass(item, { isActive, isExactActive }),
                                  tabindex: -1,
                                  onClick: $event => ($options.onHeaderActionClick($event, navigate))
                                }, $options.getPTOptions(item, 'headerAction')), [
                                  (_ctx.$slots.headericon)
                                    ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.headericon), {
                                        key: 0,
                                        item: item,
                                        class: normalizeClass($options.getHeaderIconClass(item))
                                      }, null, 8, ["item", "class"]))
                                    : ($options.getItemProp(item, 'icon'))
                                      ? (openBlock(), createElementBlock("span", mergeProps({
                                          key: 1,
                                          class: $options.getHeaderIconClass(item)
                                        }, $options.getPTOptions(item, 'headerIcon')), null, 16))
                                      : createCommentVNode("", true),
                                  createElementVNode("span", mergeProps({ class: "p-menuitem-text" }, $options.getPTOptions(item, 'headerLabel')), toDisplayString($options.getItemLabel(item)), 17)
                                ], 16, _hoisted_3)
                              ]),
                              _: 2
                            }, 1032, ["to"]))
                          : (openBlock(), createElementBlock("a", mergeProps({
                              key: 1,
                              href: $options.getItemProp(item, 'url'),
                              class: $options.getHeaderActionClass(item),
                              tabindex: -1
                            }, $options.getPTOptions(item, 'headerAction')), [
                              ($options.getItemProp(item, 'items'))
                                ? renderSlot(_ctx.$slots, "submenuicon", {
                                    key: 0,
                                    active: $options.isItemActive(item)
                                  }, () => [
                                    (openBlock(), createBlock(resolveDynamicComponent($options.isItemActive(item) ? 'ChevronDownIcon' : 'ChevronRightIcon'), mergeProps({ class: "p-submenu-icon" }, $options.getPTOptions(item, 'submenuIcon')), null, 16))
                                  ])
                                : createCommentVNode("", true),
                              (_ctx.$slots.headericon)
                                ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.headericon), {
                                    key: 1,
                                    item: item,
                                    class: normalizeClass($options.getHeaderIconClass(item))
                                  }, null, 8, ["item", "class"]))
                                : ($options.getItemProp(item, 'icon'))
                                  ? (openBlock(), createElementBlock("span", mergeProps({
                                      key: 2,
                                      class: $options.getHeaderIconClass(item)
                                    }, $options.getPTOptions(item, 'headerIcon')), null, 16))
                                  : createCommentVNode("", true),
                              createElementVNode("span", mergeProps({ class: "p-menuitem-text" }, $options.getPTOptions(item, 'headerLabel')), toDisplayString($options.getItemLabel(item)), 17)
                            ], 16, _hoisted_4))
                      ], 64))
                    : (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.item), {
                        key: 1,
                        item: item
                      }, null, 8, ["item"]))
                ], 16)
              ], 16, _hoisted_2),
              createVNode(Transition, { name: "p-toggleable-content" }, {
                default: withCtx(() => [
                  withDirectives(createElementVNode("div", mergeProps({
                    id: $options.getContentId(index),
                    class: "p-toggleable-content",
                    role: "region",
                    "aria-labelledby": $options.getHeaderId(index)
                  }, _ctx.ptm('toggleableContent')), [
                    ($options.getItemProp(item, 'items'))
                      ? (openBlock(), createElementBlock("div", mergeProps({
                          key: 0,
                          class: "p-panelmenu-content"
                        }, _ctx.ptm('menuContent')), [
                          createVNode(_component_PanelMenuList, {
                            panelId: $options.getPanelId(index),
                            items: $options.getItemProp(item, 'items'),
                            templates: _ctx.$slots,
                            expandedKeys: $props.expandedKeys,
                            onItemToggle: $options.changeExpandedKeys,
                            onHeaderFocus: $options.updateFocusedHeader,
                            exact: $props.exact,
                            pt: _ctx.pt
                          }, null, 8, ["panelId", "items", "templates", "expandedKeys", "onItemToggle", "onHeaderFocus", "exact", "pt"])
                        ], 16))
                      : createCommentVNode("", true)
                  ], 16, _hoisted_5), [
                    [vShow, $options.isItemActive(item)]
                  ])
                ]),
                _: 2
              }, 1024)
            ], 16))
          : createCommentVNode("", true)
      ], 64))
    }), 128))
  ], 16, _hoisted_1))
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

var css_248z = "\n.p-panelmenu .p-panelmenu-header-action {\n    display: flex;\n    align-items: center;\n    user-select: none;\n    cursor: pointer;\n    position: relative;\n    text-decoration: none;\n}\n.p-panelmenu .p-panelmenu-header-action:focus {\n    z-index: 1;\n}\n.p-panelmenu .p-submenu-list {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n.p-panelmenu .p-menuitem-link {\n    display: flex;\n    align-items: center;\n    user-select: none;\n    cursor: pointer;\n    text-decoration: none;\n    position: relative;\n    overflow: hidden;\n}\n.p-panelmenu .p-menuitem-text {\n    line-height: 1;\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
