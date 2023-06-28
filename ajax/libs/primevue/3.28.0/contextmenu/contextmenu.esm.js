import BaseComponent from 'primevue/basecomponent';
import Portal from 'primevue/portal';
import { ObjectUtils, DomHandler, UniqueComponentId, ZIndexUtils } from 'primevue/utils';
import AngleRightIcon from 'primevue/icons/angleright';
import Ripple from 'primevue/ripple';
import { resolveComponent, resolveDirective, openBlock, createBlock, Transition, withCtx, createElementBlock, mergeProps, Fragment, renderList, createElementVNode, withDirectives, resolveDynamicComponent, normalizeClass, createCommentVNode, toDisplayString, createVNode } from 'vue';

var script$1 = {
    name: 'ContextMenuSub',
    extends: BaseComponent,
    emits: ['item-click', 'item-mouseenter'],
    props: {
        items: {
            type: Array,
            default: null
        },
        menuId: {
            type: String,
            default: null
        },
        focusedItemId: {
            type: String,
            default: null
        },
        root: {
            type: Boolean,
            default: false
        },
        visible: {
            type: Boolean,
            default: false
        },
        level: {
            type: Number,
            default: 0
        },
        templates: {
            type: Object,
            default: null
        },
        exact: {
            type: Boolean,
            default: true
        },
        activeItemPath: {
            type: Object,
            default: null
        }
    },
    methods: {
        getItemId(processedItem) {
            return `${this.menuId}_${processedItem.key}`;
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
            this.$emit('item-click', { originalEvent: event, processedItem, isFocus: true });
        },
        onItemMouseEnter(event, processedItem) {
            this.$emit('item-mouseenter', { originalEvent: event, processedItem });
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
        onEnter() {
            this.position();
        },
        position() {
            const parentItem = this.$refs.container.parentElement;
            const containerOffset = DomHandler.getOffset(this.$refs.container.parentElement);
            const viewport = DomHandler.getViewport();
            const sublistWidth = this.$refs.container.offsetParent ? this.$refs.container.offsetWidth : DomHandler.getHiddenElementOuterWidth(this.$refs.container);
            const itemOuterWidth = DomHandler.getOuterWidth(parentItem.children[0]);

            this.$refs.container.style.top = '0px';

            if (parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - DomHandler.calculateScrollbarWidth()) {
                this.$refs.container.style.left = -1 * sublistWidth + 'px';
            } else {
                this.$refs.container.style.left = itemOuterWidth + 'px';
            }
        },
        getItemClass(processedItem) {
            return [
                'p-menuitem',
                this.getItemProp(processedItem, 'class'),
                {
                    'p-menuitem-active p-highlight': this.isItemActive(processedItem),
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
        AngleRightIcon: AngleRightIcon
    },
    directives: {
        ripple: Ripple
    }
};

const _hoisted_1 = ["id", "aria-label", "aria-disabled", "aria-expanded", "aria-haspopup", "aria-level", "aria-setsize", "aria-posinset"];
const _hoisted_2 = ["onClick", "onMouseenter"];
const _hoisted_3 = ["href", "onClick"];
const _hoisted_4 = ["href", "target"];
const _hoisted_5 = ["id"];

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _component_AngleRightIcon = resolveComponent("AngleRightIcon");
  const _component_ContextMenuSub = resolveComponent("ContextMenuSub", true);
  const _directive_ripple = resolveDirective("ripple");

  return (openBlock(), createBlock(Transition, {
    name: "p-contextmenusub",
    onEnter: $options.onEnter
  }, {
    default: withCtx(() => [
      ($props.root ? true : $props.visible)
        ? (openBlock(), createElementBlock("ul", mergeProps({
            key: 0,
            ref: "container"
          }, _ctx.ptm('menu')), [
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
                      role: "menuitem",
                      "aria-label": $options.getItemLabel(processedItem),
                      "aria-disabled": $options.isItemDisabled(processedItem) || undefined,
                      "aria-expanded": $options.isItemGroup(processedItem) ? $options.isItemActive(processedItem) : undefined,
                      "aria-haspopup": $options.isItemGroup(processedItem) && !$options.getItemProp(processedItem, 'to') ? 'menu' : undefined,
                      "aria-level": $props.level + 1,
                      "aria-setsize": $options.getAriaSetSize(),
                      "aria-posinset": $options.getAriaPosInset(index)
                    }, $options.getPTOptions(processedItem, 'menuitem')), [
                      createElementVNode("div", mergeProps({
                        class: "p-menuitem-content",
                        onClick: $event => ($options.onItemClick($event, processedItem)),
                        onMouseenter: $event => ($options.onItemMouseEnter($event, processedItem))
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
                                      ], 16, _hoisted_3)), [
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
                                    createElementVNode("span", mergeProps({ class: "p-menuitem-text" }, $options.getPTOptions(processedItem, 'label')), toDisplayString($options.getItemLabel(processedItem)), 17),
                                    ($options.getItemProp(processedItem, 'items'))
                                      ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                                          ($props.templates.submenuicon)
                                            ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.submenuicon), {
                                                key: 0,
                                                active: $options.isItemActive(processedItem),
                                                class: "p-submenu-icon"
                                              }, null, 8, ["active"]))
                                            : (openBlock(), createBlock(_component_AngleRightIcon, mergeProps({
                                                key: 1,
                                                class: "p-submenu-icon"
                                              }, $options.getPTOptions(processedItem, 'submenuicon')), null, 16))
                                        ], 64))
                                      : createCommentVNode("", true)
                                  ], 16, _hoisted_4)), [
                                    [_directive_ripple]
                                  ])
                            ], 64))
                          : (openBlock(), createBlock(resolveDynamicComponent($props.templates.item), {
                              key: 1,
                              item: processedItem.item
                            }, null, 8, ["item"]))
                      ], 16, _hoisted_2),
                      ($options.isItemVisible(processedItem) && $options.isItemGroup(processedItem))
                        ? (openBlock(), createBlock(_component_ContextMenuSub, {
                            key: 0,
                            id: $options.getItemId(processedItem) + '_list',
                            role: "menu",
                            class: "p-submenu-list",
                            menuId: $props.menuId,
                            focusedItemId: $props.focusedItemId,
                            items: processedItem.items,
                            templates: $props.templates,
                            activeItemPath: $props.activeItemPath,
                            exact: $props.exact,
                            level: $props.level + 1,
                            pt: _ctx.pt,
                            visible: $options.isItemActive(processedItem) && $options.isItemGroup(processedItem),
                            onItemClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('item-click', $event))),
                            onItemMouseenter: _cache[1] || (_cache[1] = $event => (_ctx.$emit('item-mouseenter', $event)))
                          }, null, 8, ["id", "menuId", "focusedItemId", "items", "templates", "activeItemPath", "exact", "level", "pt", "visible"]))
                        : createCommentVNode("", true)
                    ], 16, _hoisted_1))
                  : createCommentVNode("", true),
                ($options.isItemVisible(processedItem) && $options.getItemProp(processedItem, 'separator'))
                  ? (openBlock(), createElementBlock("li", mergeProps({
                      key: 1,
                      id: $options.getItemId(processedItem),
                      style: $options.getItemProp(processedItem, 'style'),
                      class: $options.getSeparatorItemClass(processedItem),
                      role: "separator"
                    }, _ctx.ptm('separator')), null, 16, _hoisted_5))
                  : createCommentVNode("", true)
              ], 64))
            }), 128))
          ], 16))
        : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["onEnter"]))
}

script$1.render = render$1;

var script = {
    name: 'ContextMenu',
    extends: BaseComponent,
    inheritAttrs: false,
    emits: ['focus', 'blur', 'show', 'hide'],
    props: {
        model: {
            type: Array,
            default: null
        },
        appendTo: {
            type: String,
            default: 'body'
        },
        autoZIndex: {
            type: Boolean,
            default: true
        },
        baseZIndex: {
            type: Number,
            default: 0
        },
        global: {
            type: Boolean,
            default: false
        },
        exact: {
            type: Boolean,
            default: true
        },
        tabindex: {
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
    target: null,
    outsideClickListener: null,
    resizeListener: null,
    documentContextMenuListener: null,
    pageX: null,
    pageY: null,
    container: null,
    list: null,
    data() {
        return {
            id: this.$attrs.id,
            focused: false,
            focusedItemInfo: { index: -1, level: 0, parentKey: '' },
            activeItemPath: [],
            visible: false,
            submenuVisible: false
        };
    },
    watch: {
        '$attrs.id': function (newValue) {
            this.id = newValue || UniqueComponentId();
        },
        activeItemPath(newPath) {
            if (ObjectUtils.isNotEmpty(newPath)) {
                this.bindOutsideClickListener();
                this.bindResizeListener();
                this.bindDocumentContextMenuListener();
            } else if (!this.visible) {
                this.unbindOutsideClickListener();
                this.unbindResizeListener();
                this.unbindDocumentContextMenuListener();
            }
        }
    },
    beforeUnmount() {
        this.unbindResizeListener();
        this.unbindOutsideClickListener();
        this.unbindDocumentContextMenuListener();

        if (this.container && this.autoZIndex) {
            ZIndexUtils.clear(this.container);
        }

        this.target = null;
        this.container = null;
    },
    mounted() {
        this.id = this.id || UniqueComponentId();

        if (this.global) {
            this.bindDocumentContextMenuListener();
        }
    },
    methods: {
        getItemProp(item, name) {
            return item ? ObjectUtils.getItemValue(item[name]) : undefined;
        },
        getItemLabel(item) {
            return this.getItemProp(item, 'label');
        },
        isItemDisabled(item) {
            return this.getItemProp(item, 'disabled');
        },
        isItemGroup(item) {
            return ObjectUtils.isNotEmpty(this.getItemProp(item, 'items'));
        },
        isItemSeparator(item) {
            return this.getItemProp(item, 'separator');
        },
        getProccessedItemLabel(processedItem) {
            return processedItem ? this.getItemLabel(processedItem.item) : undefined;
        },
        isProccessedItemGroup(processedItem) {
            return processedItem && ObjectUtils.isNotEmpty(processedItem.items);
        },
        toggle(event) {
            this.visible ? this.hide() : this.show(event);
        },
        show(event) {
            this.activeItemPath = [];
            this.focusedItemInfo = { index: -1, level: 0, parentKey: '' };
            DomHandler.focus(this.list);

            this.pageX = event.pageX;
            this.pageY = event.pageY;
            this.visible ? this.position() : (this.visible = true);

            event.stopPropagation();
            event.preventDefault();
        },
        hide() {
            this.visible = false;
            this.activeItemPath = [];
            this.focusedItemInfo = { index: -1, level: 0, parentKey: '' };
        },
        onFocus(event) {
            this.focused = true;
            this.focusedItemInfo = this.focusedItemInfo.index !== -1 ? this.focusedItemInfo : { index: -1, level: 0, parentKey: '' };
            this.$emit('focus', event);
        },
        onBlur(event) {
            this.focused = false;
            this.focusedItemInfo = { index: -1, level: 0, parentKey: '' };
            this.searchValue = '';
            this.$emit('blur', event);
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
                    this.onEscapeKey(event);
                    break;

                case 'Tab':
                    this.onTabKey(event);
                    break;

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
        onItemChange(event) {
            const { processedItem, isFocus } = event;

            if (ObjectUtils.isEmpty(processedItem)) return;

            const { index, key, level, parentKey, items } = processedItem;
            const grouped = ObjectUtils.isNotEmpty(items);
            const activeItemPath = this.activeItemPath.filter((p) => p.parentKey !== parentKey && p.parentKey !== key);

            if (grouped) {
                activeItemPath.push(processedItem);
                this.submenuVisible = true;
            }

            this.focusedItemInfo = { index, level, parentKey };
            this.activeItemPath = activeItemPath;

            isFocus && DomHandler.focus(this.list);
        },
        onItemClick(event) {
            const { processedItem } = event;
            const grouped = this.isProccessedItemGroup(processedItem);
            const selected = this.isSelected(processedItem);

            if (selected) {
                const { index, key, level, parentKey } = processedItem;

                this.activeItemPath = this.activeItemPath.filter((p) => key !== p.key && key.startsWith(p.key));
                this.focusedItemInfo = { index, level, parentKey };

                DomHandler.focus(this.list);
            } else {
                grouped ? this.onItemChange(event) : this.hide();
            }
        },
        onItemMouseEnter(event) {
            this.onItemChange(event);
        },
        onArrowDownKey(event) {
            const itemIndex = this.focusedItemInfo.index !== -1 ? this.findNextItemIndex(this.focusedItemInfo.index) : this.findFirstFocusedItemIndex();

            this.changeFocusedItemIndex(event, itemIndex);
            event.preventDefault();
        },
        onArrowUpKey(event) {
            if (event.altKey) {
                if (this.focusedItemInfo.index !== -1) {
                    const processedItem = this.visibleItems[this.focusedItemInfo.index];
                    const grouped = this.isProccessedItemGroup(processedItem);

                    !grouped && this.onItemChange({ originalEvent: event, processedItem });
                }

                this.popup && this.hide();
                event.preventDefault();
            } else {
                const itemIndex = this.focusedItemInfo.index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo.index) : this.findLastFocusedItemIndex();

                this.changeFocusedItemIndex(event, itemIndex);
                event.preventDefault();
            }
        },
        onArrowLeftKey(event) {
            const processedItem = this.visibleItems[this.focusedItemInfo.index];
            const parentItem = this.activeItemPath.find((p) => p.key === processedItem.parentKey);
            const root = ObjectUtils.isEmpty(processedItem.parent);

            if (!root) {
                this.focusedItemInfo = { index: -1, parentKey: parentItem ? parentItem.parentKey : '' };
                this.searchValue = '';
                this.onArrowDownKey(event);
            }

            this.activeItemPath = this.activeItemPath.filter((p) => p.parentKey !== this.focusedItemInfo.parentKey);

            event.preventDefault();
        },
        onArrowRightKey(event) {
            const processedItem = this.visibleItems[this.focusedItemInfo.index];
            const grouped = this.isProccessedItemGroup(processedItem);

            if (grouped) {
                this.onItemChange({ originalEvent: event, processedItem });
                this.focusedItemInfo = { index: -1, parentKey: processedItem.key };
                this.searchValue = '';
                this.onArrowDownKey(event);
            }

            event.preventDefault();
        },
        onHomeKey(event) {
            this.changeFocusedItemIndex(event, this.findFirstItemIndex());
            event.preventDefault();
        },
        onEndKey(event) {
            this.changeFocusedItemIndex(event, this.findLastItemIndex());
            event.preventDefault();
        },
        onEnterKey(event) {
            if (this.focusedItemInfo.index !== -1) {
                const element = DomHandler.findSingle(this.list, `li[id="${`${this.focusedItemId}`}"]`);
                const anchorElement = element && DomHandler.findSingle(element, '.p-menuitem-link');

                anchorElement ? anchorElement.click() : element && element.click();
                const processedItem = this.visibleItems[this.focusedItemInfo.index];
                const grouped = this.isProccessedItemGroup(processedItem);

                !grouped && (this.focusedItemInfo.index = this.findFirstFocusedItemIndex());
            }

            event.preventDefault();
        },
        onSpaceKey(event) {
            this.onEnterKey(event);
        },
        onEscapeKey(event) {
            this.hide();
            !this.popup && (this.focusedItemInfo.index = this.findFirstFocusedItemIndex());

            event.preventDefault();
        },
        onTabKey(event) {
            if (this.focusedItemInfo.index !== -1) {
                const processedItem = this.visibleItems[this.focusedItemInfo.index];
                const grouped = this.isProccessedItemGroup(processedItem);

                !grouped && this.onItemChange({ originalEvent: event, processedItem });
            }

            this.hide();
        },
        onEnter(el) {
            this.position();

            if (this.autoZIndex) {
                ZIndexUtils.set('menu', el, this.baseZIndex + this.$primevue.config.zIndex.menu);
            }
        },
        onAfterEnter() {
            this.bindOutsideClickListener();
            this.bindResizeListener();
            this.bindDocumentContextMenuListener();

            this.$emit('show');
            DomHandler.focus(this.list);
        },
        onLeave() {
            this.$emit('hide');
            this.container = null;
        },
        onAfterLeave(el) {
            if (this.autoZIndex) {
                ZIndexUtils.clear(el);
            }

            this.unbindOutsideClickListener();
            this.unbindResizeListener();
            this.unbindDocumentContextMenuListener();
        },
        position() {
            let left = this.pageX + 1;
            let top = this.pageY + 1;
            let width = this.container.offsetParent ? this.container.offsetWidth : DomHandler.getHiddenElementOuterWidth(this.container);
            let height = this.container.offsetParent ? this.container.offsetHeight : DomHandler.getHiddenElementOuterHeight(this.container);
            let viewport = DomHandler.getViewport();

            //flip
            if (left + width - document.body.scrollLeft > viewport.width) {
                left -= width;
            }

            //flip
            if (top + height - document.body.scrollTop > viewport.height) {
                top -= height;
            }

            //fit
            if (left < document.body.scrollLeft) {
                left = document.body.scrollLeft;
            }

            //fit
            if (top < document.body.scrollTop) {
                top = document.body.scrollTop;
            }

            this.container.style.left = left + 'px';
            this.container.style.top = top + 'px';
        },
        bindOutsideClickListener() {
            if (!this.outsideClickListener) {
                this.outsideClickListener = (event) => {
                    const isOutsideContainer = this.container && !this.container.contains(event.target);
                    const isOutsideTarget = this.visible ? !(this.target && (this.target === event.target || this.target.contains(event.target))) : true;

                    if (isOutsideContainer && isOutsideTarget) {
                        this.hide();
                    }
                };

                document.addEventListener('click', this.outsideClickListener);
            }
        },
        unbindOutsideClickListener() {
            if (this.outsideClickListener) {
                document.removeEventListener('click', this.outsideClickListener);
                this.outsideClickListener = null;
            }
        },
        bindResizeListener() {
            if (!this.resizeListener) {
                this.resizeListener = () => {
                    if (this.visible && !DomHandler.isTouchDevice()) {
                        this.hide();
                    }
                };

                window.addEventListener('resize', this.resizeListener);
            }
        },
        unbindResizeListener() {
            if (this.resizeListener) {
                window.removeEventListener('resize', this.resizeListener);
                this.resizeListener = null;
            }
        },
        bindDocumentContextMenuListener() {
            if (!this.documentContextMenuListener) {
                this.documentContextMenuListener = (event) => {
                    event.button !== 2 ? this.show(event) : this.hide();
                };

                document.addEventListener('contextmenu', this.documentContextMenuListener);
            }
        },
        unbindDocumentContextMenuListener() {
            if (this.documentContextMenuListener) {
                document.removeEventListener('contextmenu', this.documentContextMenuListener);
                this.documentContextMenuListener = null;
            }
        },
        isItemMatched(processedItem) {
            return this.isValidItem(processedItem) && this.getProccessedItemLabel(processedItem).toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase());
        },
        isValidItem(processedItem) {
            return !!processedItem && !this.isItemDisabled(processedItem.item) && !this.isItemSeparator(processedItem.item);
        },
        isValidSelectedItem(processedItem) {
            return this.isValidItem(processedItem) && this.isSelected(processedItem);
        },
        isSelected(processedItem) {
            return this.activeItemPath.some((p) => p.key === processedItem.key);
        },
        findFirstItemIndex() {
            return this.visibleItems.findIndex((processedItem) => this.isValidItem(processedItem));
        },
        findLastItemIndex() {
            return ObjectUtils.findLastIndex(this.visibleItems, (processedItem) => this.isValidItem(processedItem));
        },
        findNextItemIndex(index) {
            const matchedItemIndex = index < this.visibleItems.length - 1 ? this.visibleItems.slice(index + 1).findIndex((processedItem) => this.isValidItem(processedItem)) : -1;

            return matchedItemIndex > -1 ? matchedItemIndex + index + 1 : index;
        },
        findPrevItemIndex(index) {
            const matchedItemIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleItems.slice(0, index), (processedItem) => this.isValidItem(processedItem)) : -1;

            return matchedItemIndex > -1 ? matchedItemIndex : index;
        },
        findSelectedItemIndex() {
            return this.visibleItems.findIndex((processedItem) => this.isValidSelectedItem(processedItem));
        },
        findFirstFocusedItemIndex() {
            const selectedIndex = this.findSelectedItemIndex();

            return selectedIndex < 0 ? this.findFirstItemIndex() : selectedIndex;
        },
        findLastFocusedItemIndex() {
            const selectedIndex = this.findSelectedItemIndex();

            return selectedIndex < 0 ? this.findLastItemIndex() : selectedIndex;
        },
        searchItems(event, char) {
            this.searchValue = (this.searchValue || '') + char;

            let itemIndex = -1;
            let matched = false;

            if (this.focusedItemInfo.index !== -1) {
                itemIndex = this.visibleItems.slice(this.focusedItemInfo.index).findIndex((processedItem) => this.isItemMatched(processedItem));
                itemIndex = itemIndex === -1 ? this.visibleItems.slice(0, this.focusedItemInfo.index).findIndex((processedItem) => this.isItemMatched(processedItem)) : itemIndex + this.focusedItemInfo.index;
            } else {
                itemIndex = this.visibleItems.findIndex((processedItem) => this.isItemMatched(processedItem));
            }

            if (itemIndex !== -1) {
                matched = true;
            }

            if (itemIndex === -1 && this.focusedItemInfo.index === -1) {
                itemIndex = this.findFirstFocusedItemIndex();
            }

            if (itemIndex !== -1) {
                this.changeFocusedItemIndex(event, itemIndex);
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
        changeFocusedItemIndex(event, index) {
            if (this.focusedItemInfo.index !== index) {
                this.focusedItemInfo.index = index;
                this.scrollInView();
            }
        },
        scrollInView(index = -1) {
            const id = index !== -1 ? `${this.id}_${index}` : this.focusedItemId;
            const element = DomHandler.findSingle(this.list, `li[id="${id}"]`);

            if (element) {
                element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'start' });
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
        containerRef(el) {
            this.container = el;
        },
        listRef(el) {
            this.list = el ? el.$el : undefined;
        }
    },
    computed: {
        containerClass() {
            return ['p-contextmenu p-component', { 'p-input-filled': this.$primevue.config.inputStyle === 'filled', 'p-ripple-disabled': this.$primevue.config.ripple === false }];
        },
        processedItems() {
            return this.createProcessedItems(this.model || []);
        },
        visibleItems() {
            const processedItem = this.activeItemPath.find((p) => p.key === this.focusedItemInfo.parentKey);

            return processedItem ? processedItem.items : this.processedItems;
        },
        focusedItemId() {
            return this.focusedItemInfo.index !== -1 ? `${this.id}${ObjectUtils.isNotEmpty(this.focusedItemInfo.parentKey) ? '_' + this.focusedItemInfo.parentKey : ''}_${this.focusedItemInfo.index}` : null;
        }
    },
    components: {
        ContextMenuSub: script$1,
        Portal: Portal
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ContextMenuSub = resolveComponent("ContextMenuSub");
  const _component_Portal = resolveComponent("Portal");

  return (openBlock(), createBlock(_component_Portal, { appendTo: $props.appendTo }, {
    default: withCtx(() => [
      createVNode(Transition, {
        name: "p-contextmenu",
        onEnter: $options.onEnter,
        onAfterEnter: $options.onAfterEnter,
        onLeave: $options.onLeave,
        onAfterLeave: $options.onAfterLeave
      }, {
        default: withCtx(() => [
          ($data.visible)
            ? (openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                ref: $options.containerRef,
                class: $options.containerClass
              }, { ..._ctx.$attrs, ..._ctx.ptm('root') }), [
                createVNode(_component_ContextMenuSub, {
                  ref: $options.listRef,
                  id: $data.id + '_list',
                  class: "p-contextmenu-root-list",
                  role: "menubar",
                  root: true,
                  tabindex: $props.tabindex,
                  "aria-orientation": "vertical",
                  "aria-activedescendant": $data.focused ? $options.focusedItemId : undefined,
                  menuId: $data.id,
                  focusedItemId: $data.focused ? $options.focusedItemId : undefined,
                  items: $options.processedItems,
                  templates: _ctx.$slots,
                  activeItemPath: $data.activeItemPath,
                  exact: $props.exact,
                  "aria-labelledby": _ctx.ariaLabelledby,
                  "aria-label": _ctx.ariaLabel,
                  level: 0,
                  visible: $data.submenuVisible,
                  pt: _ctx.pt,
                  onFocus: $options.onFocus,
                  onBlur: $options.onBlur,
                  onKeydown: $options.onKeyDown,
                  onItemClick: $options.onItemClick,
                  onItemMouseenter: $options.onItemMouseEnter
                }, null, 8, ["id", "tabindex", "aria-activedescendant", "menuId", "focusedItemId", "items", "templates", "activeItemPath", "exact", "aria-labelledby", "aria-label", "visible", "pt", "onFocus", "onBlur", "onKeydown", "onItemClick", "onItemMouseenter"])
              ], 16))
            : createCommentVNode("", true)
        ]),
        _: 1
      }, 8, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])
    ]),
    _: 1
  }, 8, ["appendTo"]))
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

var css_248z = "\n.p-contextmenu {\n    position: absolute;\n}\n.p-contextmenu ul {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n.p-contextmenu .p-submenu-list {\n    position: absolute;\n    min-width: 100%;\n    z-index: 1;\n}\n.p-contextmenu .p-menuitem-link {\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    text-decoration: none;\n    overflow: hidden;\n    position: relative;\n}\n.p-contextmenu .p-menuitem-text {\n    line-height: 1;\n}\n.p-contextmenu .p-menuitem {\n    position: relative;\n}\n.p-contextmenu .p-menuitem-link .p-submenu-icon {\n    margin-left: auto;\n}\n.p-contextmenu-enter-from {\n    opacity: 0;\n}\n.p-contextmenu-enter-active {\n    transition: opacity 250ms;\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
